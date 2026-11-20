from pathlib import Path
import os,json,hashlib,datetime,subprocess,tarfile,io,gzip,base64
T=Path('/tmp/cqc-p54-20261120');root=T/'project';pub=T/'publication'
space={};exec((pub/'source_watcher.py').read_text().split('def main():')[0],space);api=space['api']
rows={}
def take(p,label):
 try:
  before=p.stat();b=p.read_bytes();assert p.stat()==before
  if p.suffix=='.json':json.loads(b)
  if len(b)>16*1024*1024:return
  rows[label]=b
 except (FileNotFoundError,json.JSONDecodeError,AssertionError):return
for folder in ['production','audits','qa','publication']:
 for p in (T/folder).rglob('*'):
  if p.is_file() and p.suffix in ['.json','.js','.mjs','.py','.md','.txt'] and '__pycache__' not in p.parts:
   take(p,p.relative_to(T).as_posix())
paths=subprocess.check_output(['git','diff','--name-only'],cwd=root,text=True).splitlines()+subprocess.check_output(['git','ls-files','--others','--exclude-standard'],cwd=root,text=True).splitlines()
for name in paths:
 p=root/name
 if p.suffix in ['.js','.mjs','.json','.html','.css','.md','.py']:take(p,'project/'+name)
manifest={'atUTC':datetime.datetime.now(datetime.timezone.utc).isoformat(),'scope':'Recovery checkpoint of source contracts and implementation in progress; not final runtime validation or admission. Raw PNGs have separate immutable Git commits.','files':[{'path':p,'bytes':len(b),'sha256':hashlib.sha256(b).hexdigest()}for p,b in sorted(rows.items())]}
rows['CHECKPOINT_MANIFEST_PRIVATE_V1.json']=json.dumps(manifest,ensure_ascii=False,indent=2).encode();stamp=datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%SZ');archive=T/'checkpoints'/('P54_SOURCE_CHECKPOINT_'+stamp+'.tar.gz')
with archive.open('xb')as f:
 with gzip.GzipFile(fileobj=f,mode='wb',filename='',mtime=0)as gz:
  with tarfile.open(fileobj=gz,mode='w|')as a:
   for p,b in sorted(rows.items()):info=tarfile.TarInfo(p);info.size=len(b);info.mode=0o600;a.addfile(info,io.BytesIO(b))
with tarfile.open(archive,'r:gz')as a:
 assert all(a.extractfile(p).read()==b for p,b in rows.items())
b=archive.read_bytes();oid=hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest();made=api('git/blobs',{'encoding':'base64','content':base64.b64encode(b).decode()});assert made['sha']==oid
assert base64.b64decode(api('git/blobs/'+oid)['content'])==b
branch='codex/cqc-p54-recovery-checkpoint-20261120';r=subprocess.run(['gh','api','repos/darknigthmare/shadow-codec-ops/git/ref/heads/'+branch],capture_output=True)
if r.returncode:
 parent=json.loads((pub/'CURRENT_HEAD_PRIVATE_V1.json').read_text())['commit'];api('git/refs',{'ref':'refs/heads/'+branch,'sha':parent})
else:parent=json.loads(r.stdout)['object']['sha']
base=api('git/commits/'+parent)['tree']['sha'];path='docs/cqc-reprise/pass54/checkpoints/'+archive.name
tr=api('git/trees',{'base_tree':base,'tree':[{'path':path,'mode':'100644','type':'blob','sha':oid}]});commit=api('git/commits',{'parents':[parent],'tree':tr['sha'],'message':'chore(cqc): retain P54 source and integration recovery checkpoint [skip ci]'})
assert api('git/ref/heads/'+branch)['object']['sha']==parent
api('git/refs/heads/'+branch,{'sha':commit['sha'],'force':False},'PATCH');assert api('git/ref/heads/'+branch)['object']['sha']==commit['sha']
receipt={'branch':branch,'commit':commit['sha'],'archive':str(archive),'gitPath':path,'gitBlobOID':oid,'sha256':hashlib.sha256(b).hexdigest(),'bytes':len(b),'filesReadBackExact':len(rows),'rawPNGModified':False,'runtimeValidation':'IN_PROGRESS'}
(pub/'LATEST_RECOVERY_CHECKPOINT_PRIVATE_V1.json').write_text(json.dumps(receipt,indent=2)+'\n');print(json.dumps(receipt))
