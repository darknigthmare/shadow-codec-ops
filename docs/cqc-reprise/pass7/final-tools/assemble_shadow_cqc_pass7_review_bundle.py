#!/usr/bin/env python3
"""Build a byte-exact PASS7 review bundle; default mode is a read-only plan.

Requires root-frozen final QA inputs even for planning. Only --execute may write
docs/cqc-reprise/pass7. It never edits public assets, earlier review bundles,
historical archives, Git refs or credentials. Immutable PNGs may be hardlinked.
"""
from __future__ import annotations
import argparse
import hashlib
import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import tempfile

W=Path('/workspace')
R=W/'cqc-game-working/cqc-versus-v056'
S=W/'shadow-codec-recovered'
D=S/'docs/cqc-reprise/pass7'
PREFIX=D.relative_to(S).as_posix()
SHA256=re.compile(r'^[0-9a-f]{64}$')
EXCLUDED_PARTS={'node_modules','__pycache__','.git','.vercel','.aws','.codex','.agents','dist','coverage','.cache','credentials','credential','secrets','tokens','cli-config'}
EXCLUDED_NAMES={'auth.json','credentials.json','token.json','tokens.json','.netrc','.npmrc','id_rsa','id_ed25519','config.json'}
SCHEMAS={'cqc.github.pass7-review-bundle-inputs/1','cqc.github.pass7-qa-facts/1'}

README='''# CQC PASS7 source and review bundle

The standalone CQC game and the CQC tab in Shadow Codec Ops share the separately verified `public/cqc/` runtime. This folder preserves PASS7 source-generation arguments, unchanged native image sheets, original-game references, rejected attempts, producer and integration reviews, native frame geometry, source-pixel combat origins, meaningful tests, QA evidence and the source changes that produced that runtime.

`source-code` contains exact standalone source bytes before the documented runtime HTML transformation. `before-source-integration` retains the preceding PASS6 bytes. `sprite-review` records frame mappings, source-bound origin marks and native sprite checks. `provenance` includes all preserved producer attempts and original references, including attempts that were rejected. Keeping an attempt does not approve it or create an OC.

`qa` includes the root-pinned final reports and any explicitly frozen browser evidence. Root report names and their SHA256 values are recorded in `QA_INPUT_FACTS.json`; final report hashes are rechecked before and after bundling. Preliminary and failed evidence remain separate from passing final reports. `previous-vercel-publication` proves the preceding PASS6 production deployment, and does not claim that PASS7 was already deployed.

The complete historical standalone source remains in the immutable archives and their pinned manifests. This evidence bundle is not a replacement for those full archives. No archive, historical source path, previous review bundle, public asset, Git branch or commit is deleted or rewritten by the bundler. PNG pixel bytes are unchanged; immutable PNG hardlinks may reduce local disk duplication while retaining all paths. Non-PNG files are copied independently.

Original incarnations and supported equipment are reviewed as `closest_supported`, with limits and Versus adaptations recorded explicitly. Absolute 1:1 fidelity is not certified by preserving files or passing technical checks. Runtime and browser validation must be assessed using the actual pinned final QA reports.
'''

def require(ok,message):
    if not ok:raise ValueError(message)

def raw_sha(raw):return hashlib.sha256(raw).hexdigest()

def sha(path):
    h=hashlib.sha256()
    with path.open('rb') as f:
        for chunk in iter(lambda:f.read(1024*1024),b''):h.update(chunk)
    return h.hexdigest()

def safe_file(path):
    path=Path(path)
    require(path.is_absolute() and path.is_relative_to(W),'Source outside authorized workspace: '+str(path))
    require(not any(part in EXCLUDED_PARTS for part in path.parts),'Excluded generated/private path: '+str(path))
    require(path.name not in EXCLUDED_NAMES and not path.name.startswith('.env') and path.suffix.lower() not in {'.zip','.z01','.z02','.7z','.rar','.tar','.gz','.pem','.key'},'Excluded environment/auth/archive file: '+str(path))
    require(path.is_file() and not path.is_symlink(),'Regular non-symlink source required: '+str(path))
    require(path.resolve()==path,'Source parent symlink is forbidden: '+str(path))
    return path

def safe_target(relative):
    relative=Path(relative)
    require(not relative.is_absolute() and '..' not in relative.parts and relative.parts,'Unsafe bundle target: '+str(relative))
    target=D/relative
    require(target.is_relative_to(D),'Target escaped PASS7 bundle')
    for parent in [target,*target.parents]:
        if parent==S.parent:break
        require(not parent.is_symlink(),'Target path contains symlink: '+str(parent))
    return target

def allowed_tree_files(folder):
    require(folder.is_dir() and not folder.is_symlink(),'Missing regular evidence tree: '+str(folder))
    for path in sorted(folder.rglob('*')):
        relative=path.relative_to(folder)
        if any(part in EXCLUDED_PARTS for part in relative.parts):continue
        if path.is_file():yield safe_file(path)
        elif path.is_symlink():raise ValueError('Evidence symlink forbidden: '+str(path))

def read_inputs(path):
    path=safe_file(path);raw=path.read_bytes();facts=json.loads(raw)
    require(facts.get('schema') in SCHEMAS,'Wrong root QA bundle-input schema')
    require(facts.get('confirmedByRoot') is True and facts.get('status')=='passed' and facts.get('sourceState')=='frozen','Root must freeze and confirm final PASS7 QA before planning or execution')
    reports=facts.get('reports');require(isinstance(reports,list) and reports,'Final root-pinned reports are mandatory')
    names=set()
    for row in reports:
        require(isinstance(row,dict) and row.get('name') and row['name'] not in names and row.get('status')=='passed','Repeated or unconfirmed final QA report')
        names.add(row['name']);p=safe_file(row.get('path',''));expected=row.get('sha256','')
        require(SHA256.fullmatch(expected) and sha(p)==expected,'Final QA report hash changed: '+str(p))
        observed=json.loads(p.read_text());field=row.get('actualStatusField','status')
        actual=observed.get(field)
        require(actual not in {'failed','error','pending','rejected','in_progress','blocked'},'Negative/pending report cannot be a passing final QA proof: '+str(p))
        if 'actualReportStatus' in row:
            require(actual==row['actualReportStatus'],'Final report actual status disagrees with root facts: '+str(p))
        else:
            require(actual in {'passed','passedAllChecks','accepted_closest','accepted_closest_supported','approved'},'Unknown final report status needs explicit root actualReportStatus: '+str(p))
        for field in ['failures','failureCount','failedChecks','failed','failCount']:
            count=observed.get(field)
            if isinstance(count,(int,float,list,dict)):
                require(count==0 if isinstance(count,(int,float)) else not count,'Final report has nonzero failures: '+str(p))
    for row in facts.get('extraFiles',[]):
        p=safe_file(row.get('path',''));require(SHA256.fullmatch(row.get('sha256','')) and sha(p)==row['sha256'],'Extra evidence hash changed: '+str(p))
    return facts,raw

def add(mapping,source,relative,category):
    source=safe_file(source);target=safe_target(relative);digest=sha(source)
    require(not source.is_relative_to(D),'Bundle cannot recursively include itself')
    require(source.stat().st_size<100_000_000,'GitHub source blob exceeds100MB: '+str(source))
    immutable_png=(source.suffix.lower()=='.png' and not source.is_relative_to(R/'recovery/pass7-before-core-qa'))
    row={'file':target.relative_to(S).as_posix(),'bundleRelativePath':target.relative_to(D).as_posix(),'source':str(source),'bytes':source.stat().st_size,'sha256':digest,'category':category,'storagePolicy':'immutable-png-hardlink-or-byte-copy' if immutable_png else 'independent-byte-copy'}
    previous=mapping.get(row['file'])
    require(previous is None or (previous['sha256']==digest and previous['bytes']==row['bytes']),'Two source files collide at bundle target: '+row['file'])
    if previous is None:mapping[row['file']]=row

def add_tree(mapping,folder,label,category):
    for path in allowed_tree_files(folder):add(mapping,path,Path(label)/path.relative_to(folder),category)

def pinned_prior_vercel(mapping):
    receipt=safe_file(W/'vercel-pass6-publication/PUBLICATION_RECEIPT.json');data=json.loads(receipt.read_text())
    require(data.get('schema')=='mgs-cqc-pass6-vercel-publication/v1' and data.get('status')=='published_production_verified' and data.get('expectedCommit')==data.get('actualCommit')=='310bf32069fa0a42fe1815a6ffe8f831f6d3bede','PASS6 Vercel receipt does not prove the preceding published commit')
    add(mapping,receipt,Path('previous-vercel-publication')/receipt.name,'preceding-vercel-publication')
    base=W/'vercel-pass6-publication'
    for row in data.get('pinnedProofs',[]):
        path=safe_file(row['path']);require(path.is_relative_to(base),'Prior Vercel receipt references an external path')
        require(sha(path)==row['sha256'] and path.stat().st_size==row['bytes'],'Prior Vercel proof changed: '+str(path))
        add(mapping,path,Path('previous-vercel-publication')/path.relative_to(base),'preceding-vercel-proof')

def plan(qa_path):
    facts,raw=read_inputs(qa_path);mapping={}
    for folder,label,category in [('preparation/combat-sprites-pass7','sprite-review','sprite-integration-review'),('preparation/reprise-pass7-provenance','provenance','frozen-generation-and-reference-provenance'),('recovery/pass7-before-source-integration','before-source-integration','unchanged-previous-source-bytes')]:
        add_tree(mapping,R/folder,label,category)
    add_tree(mapping,R/'recovery/pass7-before-core-qa','before-core-qa','independent-byte-copies-of-restored-historical-report-backups')
    qa_tree=R/'docs/reprise-qa/pass7'
    if qa_tree.is_dir():add_tree(mapping,qa_tree,'qa/standalone-source-reports','source-qa')
    baseline_path=safe_file(W/'cqc-delivered-pass6-baseline-files.json');frozen=json.loads((W/'cqc-pass7-frozen-baseline-facts.json').read_text())
    require(sha(baseline_path)==frozen['baselineSha256'],'PASS6 baseline file changed')
    baseline=json.loads(baseline_path.read_text());require(isinstance(baseline,list),'Unexpected baseline manifest layout')
    previous={row['path']:row for row in baseline}
    for folder in ['src','data','tools','tests']:
        for path in allowed_tree_files(R/folder):
            relative=path.relative_to(R).as_posix();old=previous.get(relative)
            if old is None or path.stat().st_size!=old['bytes'] or sha(path)!=old['sha256']:
                add(mapping,path,Path('source-code')/relative,'new-or-changed-source-code')
    add(mapping,R/'modules/unified-versus-v055.html','source-code/modules/unified-versus-v055.html','standalone-source-html-before-runtime-transformation')
    add(mapping,R/'preparation/ALL_NATIVE_GENERATION_PRESERVATION.json','source-code/preparation/ALL_NATIVE_GENERATION_PRESERVATION.json','all-native-generation-inventory')
    for path in sorted((R/'recovery').glob('*PASS7*')):
        if path.is_file():add(mapping,path,Path('source-code')/path.relative_to(R),'pass7-preservation-proof')
    for pattern in ['*pass7*.py','*pass7*.js']:
        for path in sorted(W.glob(pattern)):
            if path.is_file():add(mapping,path,Path('final-tools')/path.name,'root-qa-preservation-publication-tools')
    for name in ['cqc-delivered-pass6-baseline-files.json','cqc-pass7-frozen-baseline-facts.json','cqc-pass7-frozen-pass6-native-routing.json','cqc-pass7-disk-preservation-plan.json','cqc-pass7-disk-preservation.json','cqc-pass7-provenance-and-native-preservation-verification.json','cqc-pass7-publication-tool-preparation.json','cqc-pass7-origin-assembly-initial-failure.json']:
        add(mapping,W/name,Path('baseline-and-preservation')/name,'baseline-disk-and-provenance-proof')
    for name in ['cqc-pass7-review-bundle-tool-preparation.json','cqc-pass7-review-bundle-tool-preparation.log']:
        if (W/name).is_file():add(mapping,W/name,Path('final-tools')/name,'bundle-tool-guard-checks')
    for pattern in ['*pass7*.json','*pass7*.md','*pass7*.log','*PASS7*.json','*PASS7*.md']:
        for path in sorted(W.glob(pattern)):
            if not path.is_file() or path==qa_path:continue
            if path.name.startswith(('cqc-pass7-review-bundle-plan','cqc-pass7-review-bundle-execution','cqc-pass7-github-qa-facts')):continue
            add(mapping,path,Path('qa/root-reports-and-retained-attempts')/path.name,'root-report-or-retained-attempt-not-inferred-as-passing')
    add(mapping,qa_path,'QA_INPUT_FACTS.json','root-frozen-final-qa-inputs')
    for row in facts['reports']:
        path=Path(row['path']);slug=re.sub(r'[^A-Za-z0-9_.-]+','-',row['name']).strip('-');require(slug,'Empty safe report name')
        add(mapping,path,Path('qa/final-reports')/slug/path.name,'root-pinned-final-qa-report')
    for row in facts.get('extraFiles',[]):
        path=Path(row['path']);relative=row.get('bundleRelativePath') or 'qa/extra-evidence/'+path.name
        add(mapping,path,relative,'root-pinned-extra-evidence')
    for row in facts.get('evidenceTrees',[]):
        require(isinstance(row,dict) and row.get('path'),'Evidence tree requires an explicit root-approved path')
        folder=Path(row['path']);require(folder.is_absolute() and folder.is_relative_to(W) and folder!=W,'Unsafe evidence tree root')
        label=row.get('bundleRelativePath') or 'qa/browser-evidence/'+folder.name
        add_tree(mapping,folder,label,'root-frozen-browser-evidence')
    pinned_prior_vercel(mapping)
    rows=[mapping[name] for name in sorted(mapping)]
    for row in rows:
        target=S/row['file']
        if target.exists():require(target.is_file() and not target.is_symlink() and sha(target)==row['sha256'],'Existing bundle path differs; overwrite refused: '+str(target))
    readme_bytes=README.encode();readme_row={'file':PREFIX+'/README.md','bundleRelativePath':'README.md','source':None,'bytes':len(readme_bytes),'sha256':raw_sha(readme_bytes),'category':'bundle-scope-and-limitations','storagePolicy':'generated-stable-text'}
    rows.append(readme_row)
    readme_path=safe_target('README.md')
    if readme_path.exists():require(readme_path.read_bytes()==readme_bytes,'Existing PASS7 README differs; overwrite refused')
    manifest={'schema':'cqc.github.pass7-review-bundle/1','root':PREFIX,'rootFactsSHA256':raw_sha(raw),'sourceRoot':str(R),'files':rows,'fileCount':len(rows),'totalBytes':sum(r['bytes'] for r in rows),'byteExact':True,'nativeImageBytesUntouched':True,'completeHistoricalArchiveReplacement':False,'absolute1to1Certified':False,'precedingPublishedCommit':'310bf32069fa0a42fe1815a6ffe8f831f6d3bede','publicAssetMutations':False,'historicalBundleMutations':False,'hardlinkPolicy':'Only root-frozen immutable PNGs; non-PNG bytes are copied independently. Every source and destination SHA is verified.'}
    return manifest,raw,readme_bytes

def encode(value):return (json.dumps(value,ensure_ascii=False,indent=2)+'\n').encode()

def write_exact(path,raw):
    if path.exists():require(path.is_file() and not path.is_symlink() and path.read_bytes()==raw,'Existing bytes differ; overwrite refused: '+str(path));return
    path.parent.mkdir(parents=True,exist_ok=True)
    with path.open('xb') as handle:handle.write(raw)

def outside_git_diff():
    result=subprocess.run(['git','diff','--binary','--no-ext-diff','HEAD','--','.',':(exclude)'+PREFIX],cwd=S,capture_output=True,check=True)
    status=subprocess.run(['git','status','--porcelain=v1','-z','--untracked-files=all'],cwd=S,capture_output=True,check=True)
    names=[]
    for entry in status.stdout.split(b'\0'):
        if not entry:continue
        text=entry.decode('utf-8');name=text[3:]
        if name==PREFIX or name.startswith(PREFIX+'/'):continue
        names.append(text)
    return {'outsideTrackedDiffSHA256':raw_sha(result.stdout),'outsideStatusRows':names}

def execute(manifest,qa_path,qa_raw,readme_bytes):
    before=outside_git_diff();linked=copied=reused=0
    require(read_inputs(qa_path)[1]==qa_raw,'Root QA facts changed before bundling')
    manifest_raw=encode(manifest);manifest_path=safe_target('BUNDLE_MANIFEST.json')
    if manifest_path.exists():require(manifest_path.read_bytes()==manifest_raw,'Existing frozen bundle manifest differs; overwrite refused')
    for row in manifest['files']:
        target=safe_target(row['bundleRelativePath'])
        if row['source'] is None:write_exact(target,readme_bytes);continue
        source=safe_file(row['source']);require(source.stat().st_size==row['bytes'] and sha(source)==row['sha256'],'Frozen source changed before copy: '+str(source))
        target.parent.mkdir(parents=True,exist_ok=True)
        if target.exists():require(sha(target)==row['sha256'],'Bundle collision: '+str(target));reused+=1
        elif row['storagePolicy']=='immutable-png-hardlink-or-byte-copy' and source.stat().st_dev==target.parent.stat().st_dev:
            os.link(source,target);linked+=1
        else:
            # Exclusive creation never overwrites an existing historical file.
            with source.open('rb') as src,target.open('xb') as dst:shutil.copyfileobj(src,dst)
            copied+=1
        require(target.stat().st_size==row['bytes'] and sha(target)==row['sha256'],'Bundle byte preservation failed: '+str(target))
    require(read_inputs(qa_path)[1]==qa_raw,'Root QA facts changed during bundling')
    for row in manifest['files']:
        if row['source'] is not None:require(sha(Path(row['source']))==row['sha256'],'Frozen source changed during bundling: '+row['source'])
        require(sha(S/row['file'])==row['sha256'],'Final bundle file differs: '+row['file'])
    after=outside_git_diff();require(after==before,'Git diff/status outside PASS7 review bundle changed during execution')
    write_exact(manifest_path,manifest_raw)
    return {'status':'byte-exact-bundle-created','root':str(D),'manifestSHA256':sha(manifest_path),'filesExcludingManifest':manifest['fileCount'],'filesIncludingManifest':manifest['fileCount']+1,'payloadBytes':manifest['totalBytes'],'hardlinkedImmutablePNG':linked,'independentlyCopiedFiles':copied,'existingIdenticalFilesReused':reused,'outsideGitDiffUnchanged':True,'sourceBytesUntouched':True,'publicAssetMutations':0,'historicalPathOverwrites':0,'completeHistoricalArchiveReplacement':False}

def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--qa-facts',type=Path,required=True)
    parser.add_argument('--execute',action='store_true')
    parser.add_argument('--plan-out',type=Path,help='Optional exact plan JSON outside the Git review bundle; planning remains source/repository read-only.')
    args=parser.parse_args()
    manifest,raw,readme=plan(args.qa_facts)
    if args.plan_out:
        require(args.plan_out.is_absolute() and args.plan_out.is_relative_to(W) and not args.plan_out.is_relative_to(S) and not args.plan_out.is_relative_to(R),'Plan output must stay outside source and Git repository')
        write_exact(args.plan_out,encode(manifest))
    if args.execute:result=execute(manifest,args.qa_facts,raw,readme)
    else:result={'status':'read-only-plan','root':str(D),'filesExcludingManifest':manifest['fileCount'],'payloadBytes':manifest['totalBytes'],'pngFiles':sum(r['storagePolicy']=='immutable-png-hardlink-or-byte-copy' for r in manifest['files']),'rootFactsSHA256':manifest['rootFactsSHA256'],'proposedManifestSHA256':raw_sha(encode(manifest)),'repositoryWrites':0,'publicAssetMutations':0,'completeHistoricalArchiveReplacement':False}
    print(json.dumps(result,ensure_ascii=False,indent=2))

if __name__=='__main__':main()
