import os,json,time,hashlib,base64,subprocess,pathlib,datetime,zlib,struct
T=pathlib.Path('/tmp/cqc-p54-20261120');P=T/'publication';G=pathlib.Path('/workspace/generated_images');R='darknigthmare/shadow-codec-ops';B='codex/cqc-p54-completion-20261120';BASE='04221faf7933b4a33cf63e3859533639f010723e';PREFIX='docs/cqc-reprise/pass54/raw-source-generations/';RAW=T/'preserved-raw';RAW.mkdir(exist_ok=True)
def save(path,obj):
 t=path.with_suffix('.tmp');t.write_text(json.dumps(obj,ensure_ascii=False,indent=2)+'\n');t.replace(path)
def api(ep,data=None,method=None):
 cmd=['gh','api','repos/'+R+'/'+ep]
 if data is not None:cmd+=['--method',method or'POST','--input','-']
 elif method:cmd+=['--method',method]
 for k in range(3):
  r=subprocess.run(cmd,input=json.dumps(data).encode()if data is not None else None,stdout=subprocess.PIPE,stderr=subprocess.PIPE,timeout=120)
  if r.returncode:raise RuntimeError(r.stderr.decode()[:700])
  try:return json.loads(r.stdout)
  except json.JSONDecodeError:
   if data is not None or k==2:raise
   time.sleep(.3)
def read(p):
 with os.fdopen(os.open(p,os.O_RDONLY|os.O_NOATIME|os.O_NOFOLLOW),'rb')as f:
  st=os.fstat(f.fileno());b=f.read();assert os.fstat(f.fileno())==st
 return b

def png(b):
 assert b[:8]==b'\x89PNG\r\n\x1a\n';pos=8;end=False
 while pos<len(b):
  n=struct.unpack('>I',b[pos:pos+4])[0];kind=b[pos+4:pos+8];body=b[pos+8:pos+8+n];crc=struct.unpack('>I',b[pos+8+n:pos+12+n])[0];assert zlib.crc32(kind+body)&0xffffffff==crc
  pos+=n+12
  if kind==b'IEND':end=True;break
 assert end and pos==len(b)

def main():
 baseline=P/'GENERATOR_BASELINE_PRIVATE_V1.json'
 if not baseline.exists():save(baseline,{'names':[p.name for p in G.iterdir()]})
 old=set(json.loads(baseline.read_text())['names']);cur=P/'CURRENT_HEAD_PRIVATE_V1.json'
 if not cur.exists():
  head=api('git/ref/heads/codex/cqc-p53-production-20261118')['object']['sha'];assert head==BASE
  existing=subprocess.run(['gh','api','repos/'+R+'/git/ref/heads/'+B],capture_output=True)
  if existing.returncode:api('git/refs',{'ref':'refs/heads/'+B,'sha':BASE})
  else:assert json.loads(existing.stdout)['object']['sha']==BASE
  c=api('git/commits/'+BASE);save(cur,{'commit':BASE,'tree':c['tree']['sha']})
 ledger=P/'SOURCE_COMMITS_PRIVATE_V1.json';rows=json.loads(ledger.read_text())['rows']if ledger.exists()else[];done={r['generatedPath']for r in rows};lockfd=os.open(P/'SOURCE_WRITER_ACTIVE',os.O_CREAT|os.O_EXCL|os.O_WRONLY,0o600);os.write(lockfd,str(os.getpid()).encode());os.close(lockfd)
 try:
  while True:
   candidates=[p for p in G.glob('exec-*.png')if p.name not in old and str(p)not in done and p.is_file()and not p.is_symlink()and time.time()-p.stat().st_mtime>=3]
   for path in candidates:
    try:b=read(path);png(b)
    except (AssertionError,struct.error):continue
    sha=hashlib.sha256(b).hexdigest();oid=hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest();dest=RAW/path.name
    if dest.exists():assert read(dest)==b
    else:dest.write_bytes(b)
    made=api('git/blobs',{'encoding':'base64','content':base64.b64encode(b).decode()});assert made['sha']==oid
    got=api('git/blobs/'+oid);assert base64.b64decode(got['content'])==b
    head=json.loads(cur.read_text());assert api('git/ref/heads/'+B)['object']['sha']==head['commit']
    tree=api('git/trees',{'base_tree':head['tree'],'tree':[{'path':PREFIX+path.name,'type':'blob','mode':'100644','sha':oid}]})
    c=api('git/commits',{'tree':tree['sha'],'parents':[head['commit']],'message':'art(cqc): preserve exact P54 raw source '+path.stem+' [skip ci]'})
    save(P/'PRE_REF_ATTEMPT_PRIVATE_V1.json',{'parent':head['commit'],'commit':c['sha'],'tree':tree['sha']})
    api('git/refs/heads/'+B,{'sha':c['sha'],'force':False},'PATCH');assert api('git/ref/heads/'+B)['object']['sha']==c['sha'];save(cur,{'commit':c['sha'],'tree':tree['sha']})
    record={'generatedPath':str(path),'preservedPath':str(dest),'bytes':len(b),'sha256':sha,'gitBlobOID':oid,'gitPath':PREFIX+path.name,'commit':c['sha'],'rawBytesReadBackExact':True};rows.append(record);save(ledger,{'rows':rows});done.add(str(path))
    assert read(path)==b and read(dest)==b
    link=path.with_name(path.name+'.p54-preserved');os.symlink(dest,link);os.replace(link,path)
    print(json.dumps({'preserved':path.name,'commit':c['sha'],'bytes':len(b)}),flush=True)
   save(P/'WATCH_STATUS_PRIVATE_V1.json',{'atUTC':datetime.datetime.now(datetime.timezone.utc).isoformat(),'rawSources':len(rows),'pending':len(candidates),'stopped':(P/'STOP_SOURCE_WRITER').exists()})
   if(P/'STOP_SOURCE_WRITER').exists()and not candidates:break
   time.sleep(3)
 finally:(P/'SOURCE_WRITER_ACTIVE').unlink(missing_ok=True)
main()
