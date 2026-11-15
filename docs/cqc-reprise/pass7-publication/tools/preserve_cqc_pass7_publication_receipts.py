#!/usr/bin/env python3
"""Plan, then copy only reviewed public PASS7 publication evidence into a new folder.

Default mode is strictly read-only. Execution requires the root's final receipt SHA
and explicit --root-confirmed-final-receipt. No Git, API, network or subprocess is
used. Private CLI directories, credential files, environment files and log files
are never discovered, opened or copied. Only eight named GitHub public proofs and
the real PASS7 Vercel receipt's pinned public JSON and six reviewed browser images
are eligible. Receipt-pinned helper scripts are recorded as excluded without reads.
"""
from __future__ import annotations
import argparse
from datetime import datetime, timezone
import hashlib
import json
import os
from pathlib import Path, PurePosixPath
import re
import sys

WORKSPACE=Path('/workspace')
GITHUB=WORKSPACE/'github-pass7-publication'
VERCEL=WORKSPACE/'vercel-pass7-publication'
TARGET=WORKSPACE/'shadow-codec-recovered/docs/cqc-reprise/pass7-publication'
RECEIPT=VERCEL/'PUBLICATION_RECEIPT.json'
GAMEPLAY_COMMIT='a739238479c0eb7e14fd6b4a35cb7da77338b575'
GAMEPLAY_TREE='fbe384a8f953dd7395b5e795c9248eb67deaedc7'
PREVIOUS_COMMIT='310bf32069fa0a42fe1815a6ffe8f831f6d3bede'
RUNTIME_SHA256='74f3609fc8e00b31b3ff98855f90a1cc54b2481b04adb3db93f2120c7334d3a5'
GITHUB_FILES=(
 'publication-plan.json','publication-results.json','local-import-results.json',
 'remote-tree-verification.json','qa-facts.snapshot.json','created-commit.json',
 'commit-request.json','remote-commit.raw',
)
SHA256=re.compile(r'^[0-9a-f]{64}$')
UNSAFE_PART=re.compile(r'(^|[-_.])(auth|oauth|credentials?|secrets?|tokens?|cli|config|env)([-_.]|$)',re.I)
SENSITIVE_KEYS={'authorization','proxyauthorization','accesstoken','refreshtoken','idtoken','clientsecret','password','privatekey','secretkey','apikey','token','verceltoken','gh_token','github_token','env','envs','environmentvariables'}
ENV_KEYS={'env','envs','environmentvariables'}
KNOWN_REDACTION_PLACEHOLDERS={'[REDACTED]','[redacted]','<redacted>','<REDACTED>','REDACTED'}
PUBLIC_JSON_MAX_BYTES=50*1024*1024

def sha(raw: bytes)->str:
 return hashlib.sha256(raw).hexdigest()

def fail(message: str):
 raise ValueError(message)

def checked_public_path(path: Path, base: Path, *, raw_commit=False)->Path:
 """Reject unsafe paths before opening any file; do not traverse directories."""
 if not path.is_absolute() or '..' in path.parts:fail('Proof path must be explicit and canonical')
 try:relative=path.relative_to(base)
 except ValueError:fail('Proof is outside its allowed public evidence folder')
 if not relative.parts:fail('A specific public proof file is required')
 if any(part.startswith('.') or UNSAFE_PART.search(part) for part in relative.parts):fail('Credential/config/environment-related path refused')
 if raw_commit:
  if path!=GITHUB/'remote-commit.raw':fail('Only the named public raw Git commit is allowed')
 elif path.suffix.lower() not in {'.json','.png','.jpg','.jpeg','.webp'}:
  fail('Only public JSON and browser image proofs are eligible; logs are excluded')
 if not path.is_file():fail('Expected public proof file is absent: '+str(path))
 if path.resolve()!=path:fail('Symlinks or redirected public proof paths are refused')
 if path.suffix.lower()=='.json' and path.stat().st_size>PUBLIC_JSON_MAX_BYTES:fail('Public JSON proof exceeds the bounded file size')
 return path

def check_no_secret_payload(value, path: Path, *, allow_env_shape_classification=False):
 """Do not print values. Guard only already explicitly eligible public JSON."""
 if isinstance(value,dict):
  for key,item in value.items():
   compact=re.sub(r'[^a-z0-9_]','',str(key).lower())
   if compact in SENSITIVE_KEYS and item not in (None,'',[],{}):
    is_known=isinstance(item,str) and item in KNOWN_REDACTION_PLACEHOLDERS
    if not is_known and not (allow_env_shape_classification and compact in ENV_KEYS):fail('Sensitive payload field refused in public proof: '+str(path))
   check_no_secret_payload(item,path,allow_env_shape_classification=allow_env_shape_classification)
 elif isinstance(value,list):
  for item in value:check_no_secret_payload(item,path,allow_env_shape_classification=allow_env_shape_classification)
 elif isinstance(value,str):
  if re.search(r'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|\b(?:ghp_|gho_|github_pat_)[A-Za-z0-9_]{20,}|Bearer\s+[A-Za-z0-9_.-]{20,}',value):
   fail('Credential-shaped value refused in public proof: '+str(path))

def load_public_json(path: Path, base: Path, *, allow_env_shape_classification=False):
 checked_public_path(path,base)
 raw=path.read_bytes()
 try:value=json.loads(raw)
 except (UnicodeDecodeError,json.JSONDecodeError):fail('Public JSON proof is malformed: '+str(path))
 check_no_secret_payload(value,path,allow_env_shape_classification=allow_env_shape_classification)
 return value,raw

def env_field_shapes(value):
 """Report paths/types/lengths/placeholders only; never include a field value."""
 result=[]
 def visit(item,location=''):
  if isinstance(item,dict):
   for key,child in item.items():
    compact=re.sub(r'[^a-z0-9_]','',str(key).lower())
    if compact in ENV_KEYS and child not in (None,'',[],{}):
     result.append({'fieldPath':location+'/'+str(key),'type':type(child).__name__,
                    'length':len(child)if isinstance(child,(str,list,dict))else None,
                    'isKnownRedactionPlaceholder':isinstance(child,str)and child in KNOWN_REDACTION_PLACEHOLDERS,
                    'valuePrintedOrCopied':False})
    visit(child,location+'/'+str(key))
  elif isinstance(item,list):
   for index,child in enumerate(item):visit(child,location+'/'+str(index))
 visit(value)
 return result


def row(path: Path, base: Path, bucket: str, *, expected=None, raw_commit=False):
 checked_public_path(path,base,raw_commit=raw_commit)
 if path.suffix.lower()=='.json':_,raw=load_public_json(path,base)
 else:raw=path.read_bytes()
 result={'source':str(path),'target':str(PurePosixPath(bucket)/path.relative_to(base).as_posix()),'bytes':len(raw),'sha256':sha(raw),'copyKind':'byte-exact-public-proof'}
 if expected is not None:
  if ('bytes' in expected and expected['bytes']!=len(raw)) or expected.get('sha256')!=result['sha256']:fail('Final receipt public proof pin mismatch: '+str(path))
 return result

def require(value,expected,message):
 if value!=expected:fail(message)

def verify_github():
 values={};files=[]
 for name in GITHUB_FILES:
  p=GITHUB/name
  if name.endswith('.json'):values[name],_=load_public_json(p,GITHUB)
  files.append(row(p,GITHUB,'github',raw_commit=name=='remote-commit.raw'))
 plan=values['publication-plan.json'];published=values['publication-results.json'];local=values['local-import-results.json'];tree=values['remote-tree-verification.json'];facts=values['qa-facts.snapshot.json'];created=values['created-commit.json'];request=values['commit-request.json']
 require(published['status'],'published','GitHub publication is not final')
 require(published['commit'],GAMEPLAY_COMMIT,'GitHub receipt commit differs from reviewed gameplay commit')
 require(published['localSourceCommit'],GAMEPLAY_COMMIT,'GitHub local source commit differs')
 require(published['sourceTreeByteExact'],GAMEPLAY_TREE,'GitHub source tree differs')
 require(published['remoteParentPreserved'],PREVIOUS_COMMIT,'GitHub historical parent differs')
 require(published['force'],False,'Forced Git publication is outside this evidence contract')
 require(published['deletedPaths'],[],'Historical path deletion recorded in GitHub publication')
 require(local['status'],'passed','Local exact-commit import is not verified')
 require(local['remoteCommit'],GAMEPLAY_COMMIT,'Local import commit differs')
 require(local['sourceTreeByteExact'],GAMEPLAY_TREE,'Local import tree differs')
 require(local['worktreeContentChanges'],0,'Local import modified game content')
 require(tree['status'],'passed','Remote source tree is not verified')
 require(tree['treeSHA'],GAMEPLAY_TREE,'Remote tree pin differs')
 require(tree['localTreeSHA'],GAMEPLAY_TREE,'Remote/local source trees differ')
 require(tree['oldPathsRemoved'],0,'Remote tree reports historical paths removed')
 require(facts['confirmedByRoot'],True,'Root did not confirm final GitHub QA facts')
 require(facts['status'],'passed','GitHub QA snapshot is not passed')
 require(facts['sourceState'],'frozen','GitHub source was not frozen')
 require(facts['localCommit'],GAMEPLAY_COMMIT,'GitHub QA snapshot commit differs')
 require(facts['localTree'],GAMEPLAY_TREE,'GitHub QA snapshot tree differs')
 require(facts['publicationParent'],PREVIOUS_COMMIT,'GitHub QA historical parent differs')
 require(plan['localCommit'],GAMEPLAY_COMMIT,'GitHub plan commit differs')
 require(plan['localTree'],GAMEPLAY_TREE,'GitHub plan tree differs')
 require(created['commit'],GAMEPLAY_COMMIT,'Created Git commit differs')
 require(created['tree'],GAMEPLAY_TREE,'Created Git tree differs')
 require(created['parent'],PREVIOUS_COMMIT,'Created Git parent differs')
 require(request['tree'],GAMEPLAY_TREE,'Git commit request tree differs')
 require(request['parents'],[PREVIOUS_COMMIT],'Git commit request parent differs')
 raw=(GITHUB/'remote-commit.raw').read_bytes()
 require(hashlib.sha1(b'commit '+str(len(raw)).encode()+b'\0'+raw).hexdigest(),GAMEPLAY_COMMIT,'Raw public Git commit is not the published object')
 require(sha(raw),created['rawCommitSHA256'],'Raw Git commit SHA256 pin differs')
 require(sha((GITHUB/'qa-facts.snapshot.json').read_bytes()),published['qaFactsSHA256'],'GitHub final QA snapshot SHA differs')
 return files

def make_plan():
 github=verify_github()
 result={'schema':'cqc.pass7.publication-receipt-preservation-plan/1','mode':'read-only-plan','target':str(TARGET),'gameplayCommit':GAMEPLAY_COMMIT,'gameplayTree':GAMEPLAY_TREE,'historicalParent':PREVIOUS_COMMIT,'expectedRuntimeManifestSHA256':RUNTIME_SHA256,'toolSHA256':sha(Path(__file__).read_bytes()),'githubFiles':len(github),'files':github,'readyToCopy':False,'blockingReasons':[],'scope':['Only exact named public GitHub proofs and final receipt-pinned public Vercel JSON/browser captures.','No auth/config/environment files, private CLI directory discovery, raw log files, Git commands, network requests or source game writes.','All approved copies retain exact bytes; a new target folder is required, with no overwrite.']}
 if TARGET.exists():result['blockingReasons'].append('Destination folder already exists; overwrite is forbidden')
 if not RECEIPT.is_file():
  result['blockingReasons'].append('Final PASS7 PUBLICATION_RECEIPT.json is not yet available')
  return result
 receipt,raw=load_public_json(RECEIPT,VERCEL)
 require(receipt.get('schema'),'vercel-pass7-publication-receipt/v1','Only the actual final PASS7 public receipt schema is supported')
 require(receipt.get('status'),'production-ready-verified','Vercel publication is not final and verified')
 require(receipt.get('commit'),GAMEPLAY_COMMIT,'Vercel source commit differs')
 require(receipt.get('tree'),GAMEPLAY_TREE,'Vercel source tree differs')
 require(receipt.get('readyState'),'READY','Vercel production is not ready')
 require(receipt.get('readySubstate'),'PROMOTED','Vercel production is not promoted')
 require(receipt.get('aliasError'),None,'Vercel production alias has an error')
 require(receipt.get('productionTargetReadbackMatchesCommit'),True,'Production source commit readback is not verified')
 require(receipt.get('queuedOrBuildingDeploymentsAfterQA'),0,'Another production deployment is pending after QA')
 require(receipt.get('noProtectionOrGithubMainChanges'),True,'Unexpected protection or GitHub main change')
 require(receipt.get('runtime',{}).get('manifestSHA256'),RUNTIME_SHA256,'Vercel runtime manifest differs')
 require(receipt.get('http',{}).get('passed'),True,'Vercel HTTP verification is not passed')
 require(receipt.get('http',{}).get('failedChecks'),0,'Vercel HTTP verification has failures')
 require(receipt.get('browser',{}).get('passed'),True,'Vercel browser verification is not passed')
 require(receipt.get('browser',{}).get('pageErrors'),0,'Vercel browser verification has page errors')
 require(receipt.get('browser',{}).get('consoleMessages'),0,'Vercel browser verification has console errors or messages')
 sources=receipt.get('sourcesAndProofs');screenshots=receipt.get('physicallyReviewedScreenshots')
 if not isinstance(sources,dict) or not 1<=len(sources)<=512:fail('Final PASS7 sourcesAndProofs object is required')
 if not isinstance(screenshots,list) or not 1<=len(screenshots)<=128:fail('Final PASS7 reviewed screenshot pins are required')
 result['receiptSHA256']=sha(raw);result['vercelDeploymentId']=receipt.get('deploymentId');result['productionUrl']=receipt.get('productionURL');result['standaloneUrl']=receipt.get('standaloneURL');result['embeddedUrl']=receipt.get('embeddedURL')
 result['files'].append(row(RECEIPT,VERCEL,'vercel'))
 proofs=[];excluded=[];excluded_env=[]
 allowed_excluded_scripts={'verify-deployed-browser.py','verify-deployed-http.py','vercel-api.py'}
 def receipt_relative(name):
  if not isinstance(name,str):fail('Final public proof name is malformed')
  relative=PurePosixPath(name)
  if relative.is_absolute() or '..' in relative.parts or not relative.parts:fail('Final receipt proof names must be canonical relative public paths')
  if any(part.startswith('.') or UNSAFE_PART.search(part) for part in relative.parts):fail('Credential/config/environment-related receipt proof refused before opening')
  return VERCEL/relative.as_posix()
 for name,pin in sources.items():
  path=receipt_relative(name)
  if not isinstance(pin,dict) or not SHA256.fullmatch(str(pin.get('sha256',''))) or not isinstance(pin.get('bytes'),int):fail('Final source proof pin is malformed')
  if name in allowed_excluded_scripts:
   excluded.append({'receiptPath':name,'declaredSha256':pin['sha256'],'declaredBytes':pin['bytes'],'opened':False,'copied':False,'reason':'Executable helper is outside the requested public JSON/image receipt copy scope; API authentication helper and scripts are not read.'})
   continue
  if path.suffix.lower()!='.json':fail('Unexpected non-JSON source proof; no private or raw log file is opened')
  public_value,public_raw=load_public_json(path,VERCEL,allow_env_shape_classification=True)
  require(sha(public_raw),pin['sha256'],'Final source proof SHA differs before classification');require(len(public_raw),pin['bytes'],'Final source proof bytes differ before classification')
  shapes=env_field_shapes(public_value)
  if any(not shape['isKnownRedactionPlaceholder']for shape in shapes):
   excluded_env.append({'receiptPath':name,'sha256':pin['sha256'],'bytes':pin['bytes'],'fieldShapes':shapes,'copied':False,'reason':'Whole original JSON excluded from the public subset because nonempty opaque env fields are not exact known redaction placeholders. Original file and final receipt pins remain unchanged; no env value is printed or copied.'})
   continue
  proofs.append({'path':str(path),**pin})
 for screenshot in screenshots:
  if not isinstance(screenshot,dict) or not SHA256.fullmatch(str(screenshot.get('sha256',''))):fail('Final reviewed browser screenshot pin is malformed')
  require(screenshot.get('physicallyViewed'),True,'Screenshot does not carry the final receipt physical-view attestation')
  path=receipt_relative(screenshot.get('path'))
  if path.suffix.lower()not in {'.png','.jpg','.jpeg','.webp'}:fail('Reviewed browser proof must be an image')
  proofs.append({'path':str(path),'sha256':screenshot['sha256'],'physicallyReviewed':True})
 result['excludedPinnedScriptsNeverOpened']=excluded
 result['excludedOpaqueEnvJsonProofs']=excluded_env
 result['publicSubsetOnly']=True
 seen=set();runtime_found=False
 for proof in proofs:
  path=Path(proof['path'])
  if path in seen or path==RECEIPT:fail('Duplicate final public proof path')
  seen.add(path);candidate=row(path,VERCEL,'vercel',expected=proof)
  if path==VERCEL/'expected-runtime-manifest.json':
   require(candidate['sha256'],RUNTIME_SHA256,'Published runtime manifest does not match reviewed gameplay source')
   runtime_found=True
  if proof.get('physicallyReviewed') is not None:candidate['physicallyReviewed']=proof['physicallyReviewed']
  result['files'].append(candidate)
 if not runtime_found:fail('Final receipt does not pin the exact expected runtime manifest')
 targets=[r['target']for r in result['files']]
 if len(set(targets))!=len(targets):fail('Public proof target collision')
 result['vercelPinnedFiles']=len(proofs);result['totalFiles']=len(result['files']);result['totalBytes']=sum(r['bytes']for r in result['files']);result['readyToCopy']=not result['blockingReasons']
 return result

def execute(args,plan):
 if not args.root_confirmed_final_receipt:fail('Root confirmation of the reviewed final receipt is required for execute')
 if not args.receipt_sha256 or not SHA256.fullmatch(args.receipt_sha256):fail('The root-reviewed final receipt SHA256 must be supplied for execute')
 if not plan['readyToCopy']:fail('Public evidence plan is not ready; no files written')
 require(args.receipt_sha256,plan['receiptSHA256'],'Root-reviewed final receipt SHA differs; no files written')
 if not TARGET.parent.is_dir():fail('Existing repository evidence parent folder is required')
 if TARGET.exists():fail('Destination collision; existing evidence is never overwritten')
 # Fresh revalidation before any mutation prevents copying a changed receipt set.
 require(make_plan(),plan,'Public proof inputs changed since the validated copy plan')
 # mkdir is the atomic no-overwrite claim; a concurrent destination blocks here.
 staging=TARGET
 staging.mkdir(exist_ok=False);copied=[]
 try:
  for item in plan['files']:
   source=Path(item['source']);target=staging/item['target'];target.parent.mkdir(parents=True,exist_ok=True)
   raw=source.read_bytes();require(len(raw),item['bytes'],'Public proof byte count changed');require(sha(raw),item['sha256'],'Public proof SHA changed')
   if args.hardlink_frozen_png and source.suffix.lower()=='.png':
    os.link(source,target);kind='immutable-final-receipt-pinned-PNG-hardlink'
   else:
    with target.open('xb')as handle:handle.write(raw)
    kind='exact-byte-copy'
   require(sha(target.read_bytes()),item['sha256'],'Copied public proof SHA differs')
   copied.append({**item,'copyKind':kind})
  manifest={'schema':'cqc.pass7.publication-receipt-preservation/1','createdAt':datetime.now(timezone.utc).isoformat(),'status':'public-proof-copies-byte-exact','gameplayCommit':GAMEPLAY_COMMIT,'gameplayTree':GAMEPLAY_TREE,'historicalParent':PREVIOUS_COMMIT,'runtimeManifestSHA256':RUNTIME_SHA256,'receiptSHA256':plan['receiptSHA256'],'toolSHA256':plan['toolSHA256'],'files':copied,'totalFiles':len(copied),'totalBytes':sum(r['bytes']for r in copied),'gitStageCommitPushOrDeployPerformed':False,'gameRuntimeSourceChanged':False,'privateConfigurationDiscoveredOrCopied':False,'publicSubsetOnly':True,'excludedPinnedScriptsNeverOpened':plan['excludedPinnedScriptsNeverOpened'],'excludedOpaqueEnvJsonProofs':plan['excludedOpaqueEnvJsonProofs']}
  with (staging/'PRESERVATION_MANIFEST.json').open('x')as handle:json.dump(manifest,handle,ensure_ascii=False,indent=2);handle.write('\n')
  readme=f"""# Publication CQC et Shadow — preuves PASS7

Ces reçus décrivent le commit de jeu `{GAMEPLAY_COMMIT}`, publié sur GitHub puis vérifié en production Vercel. Le manifeste runtime conservé est `{RUNTIME_SHA256}`.

Ce dossier est un sous-ensemble public des preuves : les huit preuves GitHub, les JSON publics admissibles épinglés et les captures attestées dans le reçu Vercel sont copiés exactement. Les trois scripts épinglés sont exclus sans lecture. Les JSON contenant des champs env opaques non vides sont entièrement exclus ; seuls leurs chemins, SHA, tailles et formes de champs restent consignés, sans valeurs. Les originaux et le reçu final restent inchangés. Le manifeste local indique leurs chemins source, tailles et SHA256. Les configurations privées, fichiers d’environnement, jetons et journaux bruts sont exclus.

Ce dossier conserve les reçus après publication. Son ajout ultérieur dans Git peut produire un autre commit de documentation ; le commit de jeu et le runtime visés par ces reçus restent ceux indiqués ci-dessus. L’outil de conservation ne stage, commit, pousse ni déploie rien.
"""
  with (staging/'README_FR.md').open('x')as handle:handle.write(readme)
 except Exception:
  # Keep the unique incomplete folder for inspection instead of deleting evidence.
  print(json.dumps({'status':'incomplete-new-copy-folder-retained','staging':str(staging)}),file=sys.stderr)
  raise
 return {'schema':manifest['schema'],'status':'copied-publication-proofs','target':str(TARGET),'gameplayCommit':GAMEPLAY_COMMIT,'runtimeManifestSHA256':RUNTIME_SHA256,'receiptSHA256':plan['receiptSHA256'],'copiedFiles':len(copied),'copiedBytes':manifest['totalBytes'],'manifestSHA256':sha((TARGET/'PRESERVATION_MANIFEST.json').read_bytes()),'gitStageCommitPushOrDeployPerformed':False,'gameRuntimeSourceChanged':False}

def main():
 parser=argparse.ArgumentParser(description=__doc__)
 parser.add_argument('--execute',action='store_true',help='Copy only after root has physically reviewed final production proof and given GO.')
 parser.add_argument('--root-confirmed-final-receipt',action='store_true')
 parser.add_argument('--receipt-sha256')
 parser.add_argument('--hardlink-frozen-png',action='store_true',help='Optional exact immutable receipt-pinned PNG hardlinks; default copies bytes.')
 args=parser.parse_args()
 try:
  plan=make_plan();result=execute(args,plan)if args.execute else plan
  print(json.dumps(result,ensure_ascii=False,indent=2));return 0
 except Exception as error:
  print(json.dumps({'status':'refused-no-source-game-mutation','error':type(error).__name__+': '+str(error)},ensure_ascii=False),file=sys.stderr);return 2

if __name__=='__main__':raise SystemExit(main())
