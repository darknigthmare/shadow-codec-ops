from pathlib import Path
import os,stat,hashlib,json,datetime
w=Path('/workspace');g=w/'generated_images'
def readhash(p):
 with os.fdopen(os.open(p,os.O_RDONLY|os.O_NOATIME|os.O_NOFOLLOW),'rb')as f:
  before=os.fstat(f.fileno());h=hashlib.sha256()
  while b:=f.read(1024*1024):h.update(b)
  assert os.fstat(f.fileno())==before
 return h.hexdigest()
files=[p for p in g.iterdir()if not p.is_symlink()and p.is_file()and p.stat().st_nlink==1 and p.name.startswith('exec-')and p.suffix=='.png'];sizes={p.stat().st_size for p in files};generated={}
for p in files:generated.setdefault((p.stat().st_size,readhash(p)),[]).append(p)
rows=[];saved=0;seen=set()
for root,dirs,names in os.walk(w,followlinks=False):
 dirs[:]=[d for d in dirs if d not in ['generated_images','.git','node_modules','.agents','.codex','.aws']]
 for name in names:
  if not name.endswith('.png'):continue
  p=Path(root)/name
  try:s=p.lstat()
  except OSError:continue
  if not stat.S_ISREG(s.st_mode)or s.st_size not in sizes or(s.st_dev,s.st_ino)in seen:continue
  seen.add((s.st_dev,s.st_ino));key=(s.st_size,readhash(p));matches=generated.pop(key,[])
  for old in matches:
   assert old.stat().st_nlink==1 and readhash(old)==key[1]
   temp=old.with_name(old.name+'.p54-exact-link');os.link(p,temp)
   assert readhash(temp)==key[1]
   os.replace(temp,old)
   assert readhash(old)==key[1] and old.stat().st_ino==p.stat().st_ino
   saved+=s.st_size;rows.append({'generatedPath':str(old),'identicalExistingSource':str(p),'bytes':s.st_size,'sha256':key[1],'sourcePixelsChanged':False,'oldPathPreserved':True})
  if saved>=150*1024*1024:break
 if saved>=150*1024*1024:break
r={'atUTC':datetime.datetime.now(datetime.timezone.utc).isoformat(),'method':'Exact identical regular tool-output PNG deduplication into existing workspace source inode; all paths and source bytes preserved. No archive, generated version or project asset removed.','rows':rows,'bytesFreed':saved}
Path('/tmp/cqc-p54-20261120/storage/EXACT_GENERATOR_DUPLICATE_RETENTION_PRIVATE_V1.json').write_text(json.dumps(r,indent=2)+'\n');print(json.dumps({'pairs':len(rows),'bytesFreed':saved}))
