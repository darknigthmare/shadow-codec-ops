"""Bounded GitHub object IO and deterministic tree encoding. No credential reads."""
from pathlib import Path
import base64, datetime, hashlib, json, subprocess, threading, time
REPOSITORY='darknigthmare/shadow-codec-ops'
BRANCH='cqc-pass19-source-preservation'
PARENT='0acd4536927412efd67a020a98cca131fa86c51e'
ROOT=Path('/workspace/cqc-pass20/preservation')
CAS=Path('/workspace/cqc-pass20-preservation-cas')
TMP_CAS=Path('/tmp/cqc-pass20-preservation-cas')
PREFIX='preservation/pass20/snapshots/v1/'
SHA=lambda raw:hashlib.sha256(raw).hexdigest()
GIT=lambda raw:hashlib.sha1(b'blob '+str(len(raw)).encode()+b'\0'+raw).hexdigest()
_mutation_lock=threading.Lock();_last_mutation=[0.]
def now():return datetime.datetime.now(datetime.timezone.utc).isoformat()
def save(path,value):
 raw=(json.dumps(value,ensure_ascii=False,indent=2)+'\n').encode();path=Path(path);path.parent.mkdir(parents=True,exist_ok=True)
 if path.exists():assert path.read_bytes()==raw,'Immutable receipt differs: '+str(path)
 else:path.write_bytes(raw);path.chmod(0o400)
 return SHA(raw)
def api(method,path,data=None):
 assert method in ['GET','POST','PATCH'] and path.startswith(('git/ref/heads/','git/refs/heads/','git/commits','git/trees','git/blobs'))
 if method=='PATCH':assert path=='git/refs/heads/'+BRANCH and data.get('force') is False
 if method in ['POST','PATCH']:
  with _mutation_lock:
   delay=max(0,1.25-(time.monotonic()-_last_mutation[0]))
   if delay:time.sleep(delay)
   _last_mutation[0]=time.monotonic()
 args=['gh','api','--method',method,'repos/'+REPOSITORY+'/'+path,'-H','Accept: application/vnd.github+json','-H','X-GitHub-Api-Version: 2022-11-28']
 if data is not None:args+=['--input','-']
 for attempt in range(3):
  try:r=subprocess.run(args,input=json.dumps(data)if data is not None else None,text=True,capture_output=True,timeout=45)
  except subprocess.TimeoutExpired:r=None
  if r is not None and r.returncode==0:return json.loads(r.stdout)
  error=''if r is None else r.stderr+r.stdout
  if 'HTTP 404' in error:raise RuntimeError('HTTP 404 '+path)
  if attempt==2 or not(r is None or any(q in error.lower()for q in ['http 502','http 503','http 504','http 429','rate limit'])):raise RuntimeError('GitHub '+method+' failed for '+path+'; response deliberately not emitted')
  time.sleep(5*(attempt+1))
def branch():return api('GET','git/ref/heads/'+BRANCH)['object']['sha']
def tree_sha(paths):
 root={}
 for path,digest in sorted(paths.items()):
  assert not path.startswith('/') and all(q not in ['', '.', '..']for q in path.split('/'))
  node=root;parts=path.split('/')
  for part in parts[:-1]:node=node.setdefault(part,{})
  assert parts[-1]not in node;node[parts[-1]]=digest
 def encode(node):
  entries=[]
  for name,value in node.items():
   directory=isinstance(value,dict);digest=encode(value)if directory else value;rawname=name.encode()
   entries.append((rawname+(b'/'if directory else b''),(b'40000'if directory else b'100644')+b' '+rawname+b'\0'+bytes.fromhex(digest)))
  raw=b''.join(payload for _,payload in sorted(entries));return hashlib.sha1(b'tree '+str(len(raw)).encode()+b'\0'+raw).hexdigest()
 return encode(root)
def verify_tree(sha,expected):
 actual=api('GET','git/trees/'+sha+'?recursive=1');assert actual['sha']==sha and not actual.get('truncated')
 assert all(q['type']in ['tree','blob'] and q['mode']==('100644'if q['type']=='blob'else'040000')for q in actual['tree'])
 files={q['path']:q['sha']for q in actual['tree']if q['type']=='blob'}
 assert files==expected and tree_sha(files)==sha
 return len(files)
def source_bytes(row):
 recipe=row.get('virtualRawJSONReconstruction')
 if not recipe:return Path(row['snapshotPath']).read_bytes()
 raw=Path(recipe['recipeSnapshotPath']).read_bytes();assert SHA(raw)==recipe['recipeSHA256'];document=json.loads(raw);del document['rawResultContentDeduplication']
 sources={pin['sha256']:pin for pin in recipe['sourcePNGPins']}
 for request in document['requests']:
  pin=request.pop('imageResultContentDeduplication');frozen=sources[pin['sha256']];native=Path(frozen['snapshotPath']).read_bytes();assert SHA(native)==pin['sha256']==frozen['sha256']and len(native)==pin['bytes']==frozen['bytes']
  old=request['result'];request['result']={key:(pin['uriPrefix']+base64.b64encode(native).decode()if key=='image_url'else old[key])for key in pin['originalResultKeyOrder']}
 result=(json.dumps(document,indent=2,ensure_ascii=True)+'\n').encode();assert SHA(result)==row['sha256']==recipe['expectedOriginalSHA256']and len(result)==row['bytes']==recipe['expectedOriginalBytes'];return result
def blob_proof(row,proof_dir):
 raw=source_bytes(row);assert len(raw)==row['bytes'] and SHA(raw)==row['sha256'] and GIT(raw)==row['gitBlobSHA1']
 path=Path(proof_dir)/(row['sha256']+'.json')
 if path.exists():
  proof=json.loads(path.read_text());assert proof['sha256']==row['sha256']and proof['gitBlobSHA1']==row['gitBlobSHA1']and proof['bytes']==len(raw)and proof['remoteExactBytesVerified'];return proof
 created=False
 try:actual=api('GET','git/blobs/'+row['gitBlobSHA1'])
 except RuntimeError as e:
  if not str(e).startswith('HTTP 404 '):raise
  actual=api('POST','git/blobs',{'encoding':'base64','content':base64.b64encode(raw).decode()});assert actual['sha']==row['gitBlobSHA1'];created=True
  actual=api('GET','git/blobs/'+row['gitBlobSHA1'])
 exact=base64.b64decode(actual['content']);assert exact==raw and SHA(exact)==row['sha256'] and GIT(exact)==actual['sha']==row['gitBlobSHA1']
 proof={'schema':'cqc.pass20.preserved-source-blob-proof/1','sha256':row['sha256'],'gitBlobSHA1':row['gitBlobSHA1'],'bytes':len(raw),'remoteExactBytesVerified':True,'method':'POST-then-GET-exact-bytes'if created else'GET-existing-exact-bytes','checkedAt':now()};save(path,proof);return proof
