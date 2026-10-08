"""Publish only the verified terminal text follow-up, preserving the complete release."""
if not __debug__: raise SystemExit('Guards require normal Python.')
from pathlib import Path
import argparse,base64,hashlib,importlib.util,json
APP=Path('/tmp/cqc-pass19-application')
OUT=Path('/workspace/cqc-pass19-pwa-diegetic/github');OUT.mkdir(exist_ok=True)
PARENT='4cf0e71d9c7486ef63745e5f270c88da2847c18e';COMMIT='ecc1061ff7986ddc3a08370f7df61dae31e0149b'
MAIN='9a37e0ca975021df2eb6db7fd28fe4dcd9a2550c';BRANCH='reprise/2026-10-02'
spec=importlib.util.spec_from_file_location('trusted_transport','/workspace/cqc-pass9-publication-preparation/publish_verified_shadow_cqc_pass9.py')
t=importlib.util.module_from_spec(spec);spec.loader.exec_module(t);t.SOURCE=APP;t.PARENT=PARENT
a=argparse.ArgumentParser(description=__doc__);a.add_argument('--execute',action='store_true');args=a.parse_args()
assert t.git_text('rev-parse','HEAD')==COMMIT
assert t.git_text('rev-parse','HEAD^')==PARENT
assert not t.git('status','--porcelain=v1','-uno').strip()
base,new=t.local_files(PARENT),t.local_files(COMMIT)
assert set(base)<=set(new)
changes=[new[p] for p in sorted(new) if new[p]!=base.get(p)]
allowed={'src/systems/pwaEngine.ts','src/components/common/PwaRuntimeBanner.tsx','src/components/settings/PwaSettingsPanel.tsx','docs/cqc-reprise/pass19/PWA_TERMINAL_FOLLOWUP_FR.md','docs/cqc-reprise/pass19/PWA_DIEGETIC_ATOMIC_CHANGE_ACTUAL_V1.json'}
assert {r['path'] for r in changes}==allowed
assert all(base[n]==new[n] for n in base if n.startswith('public/'))
proof=json.loads((OUT.parent/'BUILD_ACTUAL_V1.json').read_bytes())
assert proof['status']=='passed' and proof['tsc']['actualExit']==proof['vite']['actualExit']==proof['pwa']['actualExit']==0
assert proof['runtimeManifestUnchanged']
manifest=hashlib.sha256((APP/'public/cqc/runtime-manifest.json').read_bytes()).hexdigest()
assert manifest==proof['runtimeManifestSHA256']=='71f78c94af131f40f40dddf150a65e6cd80394c3c1e9a1c0473837f714a45560'
atomic=json.loads((OUT.parent/'PWA_DIEGETIC_ATOMIC_CHANGE_ACTUAL_V1.json').read_bytes())
for r in atomic['files']:assert hashlib.sha256((APP/r['path']).read_bytes()).hexdigest()==r['afterSHA256']
raws={}
for r in changes:
 p=APP/r['path'];assert p.is_file() and not p.is_symlink() and r['mode']=='100644'
 b=p.read_bytes();assert t.object_sha('blob',b)==r['sha'];raws[r['sha']]=(r['path'],b)
tree=t.git_text('rev-parse','HEAD^{tree}');payload,_=t.commit_request(COMMIT,tree)
plan={'schema':'cqc.pass19.pwa-terminal-github-publication/1','status':'verified','parent':PARENT,'commit':COMMIT,'tree':tree,'changes':changes,'force':False,'deletedPaths':[],'publicTreeUnchanged':True,'runtimeManifestSHA256':manifest,'mainUnchanged':MAIN,'buildProofSHA256':hashlib.sha256((OUT.parent/'BUILD_ACTUAL_V1.json').read_bytes()).hexdigest()}
t.save_exact(OUT/'PUBLICATION_PLAN_ACTUAL_V1.json',plan)
print(json.dumps({'stage':'preflight-passed','changes':len(changes),'execute':args.execute}),flush=True)
if not args.execute:raise SystemExit(0)
assert t.api('GET','git/ref/heads/'+BRANCH)['object']['sha']==PARENT
assert t.api('GET','git/ref/heads/main')['object']['sha']==MAIN
ledger=[]
for oid,(name,b) in raws.items():
 response=t.api('POST','git/blobs',{'content':base64.b64encode(b).decode(),'encoding':'base64'})
 assert response['sha']==oid
 observed=t.api('GET','git/blobs/'+oid)
 assert base64.b64decode(observed['content'])==b
 ledger.append({'path':name,'gitBlobSHA1':oid,'bytes':len(b),'sha256':hashlib.sha256(b).hexdigest(),'remoteByteVerified':True})
t.save_exact(OUT/'BLOBS_VERIFIED_ACTUAL_V1.json',ledger)
parenttree=t.git_text('rev-parse',PARENT+'^{tree}')
assert t.api('POST','git/trees',{'base_tree':parenttree,'tree':changes})['sha']==tree
observed=t.api('GET','git/trees/'+tree+'?recursive=1')
assert not observed.get('truncated')
rows={r['path']:{k:r[k] for k in ('path','mode','type','sha')} for r in observed['tree'] if r['type']!='tree'}
assert rows==new
t.save_exact(OUT/'COMMIT_REQUEST_ACTUAL_V1.json',payload)
response=t.api('POST','git/commits',payload)
assert response['sha']==COMMIT
t.verify_remote_commit(response,COMMIT,tree,payload)
t.save_exact(OUT/'CREATED_COMMIT_ACTUAL_V1.json',response)
assert t.api('GET','git/ref/heads/'+BRANCH)['object']['sha']==PARENT
t.api('PATCH','git/refs/heads/'+BRANCH,{'sha':COMMIT,'force':False})
assert t.api('GET','git/ref/heads/'+BRANCH)['object']['sha']==COMMIT
assert t.api('GET','git/ref/heads/main')['object']['sha']==MAIN
result={**plan,'status':'published','verifiedBlobs':len(ledger),'preservedParentPaths':len(base),'newCompletePaths':len(new),'commitURL':'https://github.com/darknigthmare/shadow-codec-ops/commit/'+COMMIT}
t.save_exact(OUT/'PUBLICATION_RESULT_ACTUAL_V1.json',result)
print(json.dumps({'status':'published','commit':COMMIT,'tree':tree,'paths':len(new),'verifiedBlobs':len(ledger)}),flush=True)
