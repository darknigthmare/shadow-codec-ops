"""Commit the bounded terminal-language follow-up; preserve historical tree IDs."""
from pathlib import Path
import subprocess,os,hashlib,json,datetime
app=Path('/tmp/cqc-pass19-application');o=Path('/workspace/cqc-pass19-pwa-diegetic');env=dict(os.environ,GIT_OBJECT_DIRECTORY='/workspace/cqc-pass19-git-object-store')
def git(*args):return subprocess.check_output(['git',*args],cwd=app,env=env)
def files(rev):
 result={}
 for row in git('ls-tree','-rz',rev).split(b'\0'):
  if not row:continue
  meta,path=row.split(b'\t',1);mode,kind,oid=meta.decode().split();result[path.decode()]={'path':path.decode(),'mode':mode,'type':kind,'sha':oid}
 return result
parent='4cf0e71d9c7486ef63745e5f270c88da2847c18e'
assert git('rev-parse','HEAD').decode().strip()==parent
allowed={'src/systems/pwaEngine.ts','src/components/common/PwaRuntimeBanner.tsx','src/components/settings/PwaSettingsPanel.tsx','docs/cqc-reprise/pass19/PWA_TERMINAL_FOLLOWUP_FR.md','docs/cqc-reprise/pass19/PWA_DIEGETIC_ATOMIC_CHANGE_ACTUAL_V1.json'}
assert set(git('diff','--cached','--name-only').decode().splitlines())==allowed
assert not git('diff','--name-only','--',*sorted(allowed)).strip()
base=files(parent);tree=git('write-tree','--missing-ok').decode().strip();new=files(tree)
assert set(base)<=set(new)
changes=[new[n] for n in new if new[n]!=base.get(n)]
assert {r['path'] for r in changes}==allowed
assert all(base[n]==new[n] for n in base if n.startswith('public/'))
for r in changes:
 b=(app/r['path']).read_bytes()
 oid=hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()
 assert oid==r['sha'] and git('cat-file','blob',oid)==b
missing=[];oids=sorted({r['sha'] for r in new.values()})
batch=subprocess.check_output(['git','cat-file','--batch-check=%(objectname) %(objecttype)'],input=('\n'.join(oids)+'\n').encode(),cwd=app,env=env)
for line in batch.decode().splitlines():
 oid,kind=line.split()
 if kind=='missing':missing.append(oid)
assert set(missing)<={r['sha'] for r in base.values()}
message=o/'LOCAL_COMMIT_MESSAGE_V1.txt'
message.write_text('Use French terminal messages for install and offline notifications\n\nReplace visible PWA implementation labels with terminal language while preserving installation, offline access and update actions. Keep all CQC assets and gameplay byte-identical.\n')
commit=git('commit-tree',tree,'-p',parent,'-F',str(message)).decode().strip()
git('update-ref','refs/heads/reprise/2026-10-02',commit,parent)
assert not git('status','--porcelain=v1','-uno').strip()
proof={'schema':'cqc.pass19.pwa-terminal-local-commit/1','status':'passed','parent':parent,'commit':commit,'tree':tree,'changes':changes,'deletedPaths':[],'historicalMissingObjects':len(missing),'allMissingObjectsUnchangedParent':True,'publicTreeUnchanged':True,'gameplayTestsReusedAtIdenticalPublicBytes':True,'checkedAt':datetime.datetime.now(datetime.timezone.utc).isoformat()}
(o/'LOCAL_RELEASE_COMMIT_ACTUAL_V1.json').write_text(json.dumps(proof,indent=2)+'\n')
print(json.dumps({'status':'passed','commit':commit,'tree':tree,'changedFiles':len(changes),'missingOldObjects':len(missing)}))
