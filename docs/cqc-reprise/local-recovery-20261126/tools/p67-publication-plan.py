from pathlib import Path
import subprocess,json,hashlib,os
ROOT=Path('/mnt/data/cqc-p66/shadow-codec-ops')
GIT=Path('/workspace/scratch/7d4d5e1f4fd4/shadow-codec-git')
BASE='5d7c6c5187f3906ad1ead53706e83674750f1c34'
raw=subprocess.check_output(['git','ls-tree','-rz',BASE],cwd=GIT,env={**os.environ,'GIT_NO_LAZY_FETCH':'1'})
tree={}
for line in raw.split(b'\0'):
 if not line:continue
 head,p=line.split(b'\t',1);mode,typ,sha=head.decode().split();tree[p.decode()]={'mode':mode,'type':typ,'sha':sha}
allowed_changed={'docs/cqc-bible/README.md','docs/cqc-bible/ASSOCIATIONS.md','docs/cqc-bible/COMBAT.md','docs/cqc-bible/FICHES_ET_VALIDATION.md','public/cqc/data/cqc-p63-source-atlas.json','public/cqc/runtime-manifest.json','public/cqc/src/cqc-p63-source-atlas.js','public/cqc/modules/source-atlas-v063.html'}
allowed_new={'docs/cqc-bible/CONTINUATION_P67.md','docs/cqc-bible/asset-associations-p67.json','scripts/audit-cqc-p67-coverage.py','scripts/audit-cqc-p67-after.py','scripts/check-cqc-p67.mjs','scripts/extend-cqc-p67-runtime.mjs','scripts/qa-cqc-p67-browser.mjs','scripts/test-cqc-p67-source-atlas.mjs'}
prefixes=['docs/cqc-reprise/pass67/','public/cqc/assets/p67/']
planned=[];unexpected=[]
for p in ROOT.rglob('*'):
 if not p.is_file() or p.is_symlink() or any(x.startswith('.') or x=='__pycache__' for x in p.relative_to(ROOT).parts):continue
 rel=p.relative_to(ROOT).as_posix();b=p.read_bytes();sha=hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()
 if rel in tree and tree[rel]['sha']==sha:continue
 ok=(rel in allowed_changed) if rel in tree else (rel in allowed_new or any(rel.startswith(x) for x in prefixes))
 row={'path':rel,'bytes':len(b),'sha':sha,'sha256':hashlib.sha256(b).hexdigest(),'change':'modified' if rel in tree else 'added','oldSha':tree.get(rel,{}).get('sha')}
 (planned if ok else unexpected).append(row)
assert all(x['path'] in tree for x in unexpected),unexpected
changed={x['path'] for x in planned if x['change']=='modified'}
assert changed==allowed_changed,(changed,allowed_changed)
plan={'schema':'cqc.p67.publication-plan.v1','repository':'darknigthmare/shadow-codec-ops','baseCommit':BASE,'baseTree':'e97da5adf44a6602a0dbc77d72d53f6a9edc34f0','baseTreeEntries':len(tree),'counts':{'added':sum(x['change']=='added' for x in planned),'modified':len(changed),'deleted':0,'files':len(planned),'bytes':sum(x['bytes'] for x in planned)},'files':sorted(planned,key=lambda x:x['path']),'unrelatedLocalDifferencesExcludedAndLeftUntouched':unexpected,'scopeNote':'Only the eight named P67 owners and new P67 files are published; all other remote files inherit the exact P66 tree. Out-of-scope local snapshots are neither written nor uploaded.'}
Path('/mnt/data/cqc-p66/p67-publication-plan.json').write_text(json.dumps(plan,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(plan['counts']))
print('Modified:',sorted(changed))
