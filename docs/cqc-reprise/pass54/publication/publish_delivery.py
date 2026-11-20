from pathlib import Path
import os,json,hashlib,base64,subprocess,time,datetime,concurrent.futures,tarfile,io,gzip
T=Path('/tmp/cqc-p54-20261120');P=T/'publication';ROOT=T/'project';REPO='darknigthmare/shadow-codec-ops';BRANCH='codex/cqc-p54-completion-20261120';PREFIX='docs/cqc-reprise/pass54/';BASE='04221faf7933b4a33cf63e3859533639f010723e'
def read(p):
 with os.fdopen(os.open(p,os.O_RDONLY|os.O_NOATIME|os.O_NOFOLLOW),'rb')as f:
  st=os.fstat(f.fileno());b=f.read();assert os.fstat(f.fileno())==st
 return b
def sha(p):return hashlib.sha256(read(p)).hexdigest()
def load(p):return json.loads(read(p))
def save(p,obj):
 q=p.with_suffix(p.suffix+'.tmp');q.write_text(json.dumps(obj,ensure_ascii=False,indent=2)+'\n');q.replace(p)
def api(ep,data=None,method=None):
 args=['gh','api','repos/'+REPO+'/'+ep]
 if data is not None:args+=['--method',method or'POST','--input','-']
 elif method:args+=['--method',method]
 for n in range(3):
  r=subprocess.run(args,input=json.dumps(data).encode()if data is not None else None,stdout=subprocess.PIPE,stderr=subprocess.PIPE,timeout=150)
  try:
   if r.returncode:raise RuntimeError(r.stderr.decode()[:800])
   return json.loads(r.stdout)
  except (RuntimeError,json.JSONDecodeError)as e:
   if data is not None or n==2 or not('unexpected end'in str(e)or isinstance(e,json.JSONDecodeError)):raise
   print('RETRY_READ',ep,flush=True);time.sleep(.3)
def stage():
 final=load(T/'verification/P54_FINAL_VERIFICATION_PUBLIC_V1.json');assert final['status']=='PASS_FINAL'
 assert not(P/'SOURCE_WRITER_ACTIVE').exists();watch=load(P/'WATCH_STATUS_PRIVATE_V1.json');assert watch['stopped']and watch['pending']==0 and watch['rawSources']==28
 cursor=load(P/'CURRENT_HEAD_PRIVATE_V1.json');assert api('git/ref/heads/'+BRANCH)['object']['sha']==cursor['commit']
 assert api('git/ref/heads/codex/cqc-p53-production-20261118')['object']['sha']==BASE,'P53 advanced; reconcile before publishing'
 before=api('git/trees/'+cursor['tree']+'?recursive=1');assert not before.get('truncated');save(P/'PRE_FINAL_FULL_TREE_PRIVATE_V1.json',before)
 base_tree=api('git/commits/'+BASE)['tree']['sha'];baseline=api('git/trees/'+base_tree+'?recursive=1');assert not baseline.get('truncated');save(P/'P53_BASE_FULL_TREE_PRIVATE_V1.json',baseline)
 prior={r['path']:r['sha']for r in before['tree']if r['type']=='blob'};old={r['path']:r['sha']for r in baseline['tree']if r['type']=='blob'}
 assert all(prior.get(p)==oid for p,oid in old.items()),'Raw preservation branch altered baseline'
 for r in load(P/'SOURCE_COMMITS_PRIVATE_V1.json')['rows']:assert prior[r['gitPath']]==r['gitBlobOID']
 selected={}
 def add(source,target):
  source=Path(source);assert source.is_file()and not source.is_symlink();assert '..'not in Path(target).parts
  assert target.startswith(('public/cqc/','scripts/','docs/cqc-reprise/pass54/'))or target=='package.json'
  if target in selected:assert selected[target]==source
  selected[target]=source
 manifest=load(ROOT/'public/cqc/runtime-manifest.json');oldman=load(T/'verification/P53_RUNTIME_MANIFEST_SNAPSHOT_PRIVATE_V1.json');oldrows={r['path']:r for r in oldman['files']};allow=set(load(T/'verification/ROOT_APPROVED_RUNTIME_CHANGES_PRIVATE_V1.json')['paths'])
 for row in manifest['files']:
  if row['path']not in oldrows or row['path']in allow:add(ROOT/'public/cqc'/row['path'],'public/cqc/'+row['path'])
 add(ROOT/'public/cqc/runtime-manifest.json','public/cqc/runtime-manifest.json');add(ROOT/'package.json','package.json')
 for path in sorted((ROOT/'scripts').glob('*cqc-p54*.mjs')):add(path,'scripts/'+path.name)
 for folder in ['production','audits','qa','reporting','verification','delivery','storage']:
  for path in sorted((T/folder).rglob('*')):
   if not path.is_file()or path.is_symlink():continue
   rel=path.relative_to(T);suffix=path.suffix.lower()
   if any(part in ['__pycache__','vendor','node_modules','fixtures','fixture']for part in rel.parts):continue
   if 'references'in rel.parts and suffix not in ['.png','.jpg','.jpeg','.webp']:continue
   if suffix=='.log' and folder in ['production','qa']:continue
   if suffix not in ['.json','.py','.js','.mjs','.css','.html','.md','.csv','.txt','.png','.jpg','.jpeg','.webp','.xlsx','.log']:continue
   if path.stat().st_size>24*1024*1024:continue
   if suffix=='.xlsx'and path.name!='CQC_SUIVI_P54_SOURCES_ET_RACCORDS_20261120_PUBLIC_V1.xlsx':continue
   if folder=='delivery':target=PREFIX+path.name
   elif suffix=='.xlsx':target=PREFIX+path.name
   else:target=PREFIX+rel.as_posix()
   add(path,target)
 for path in sorted((T/'checkpoints').glob('*.tar.gz')):add(path,PREFIX+'checkpoints/'+path.name)
 for name in ['LINT.log','TESTS_FINAL.log','P54_FOCUSED_TESTS_FINAL.log','PWA_CHECK.log','MANIFEST_FINAL.log']:
  add(T/name,PREFIX+'verification/logs/'+name)
 for name in ['SOURCE_COMMITS_PRIVATE_V1.json','WATCH_STATUS_PRIVATE_V1.json','LATEST_RECOVERY_CHECKPOINT_PRIVATE_V1.json','source_watcher.py','checkpoint.py','publish_delivery.py','build_gallery.py','image_slot.py']:
  add(P/name,PREFIX+'publication/'+name)
 # A compact complete authored-source checkpoint complements individual files.
 owned=[]
 for target,path in sorted(selected.items()):
  if path.suffix.lower()in ['.json','.py','.js','.mjs','.css','.html','.md','.csv','.txt','.log']:
   b=read(path);owned.append((target,b))
 archive=T/'delivery/P54_COMPLETE_AUTHORED_METADATA_20261120_PRIVATE_V1.tar.gz'
 with archive.open('wb')as f:
  with gzip.GzipFile(fileobj=f,filename='',mtime=0,mode='wb')as gz:
   with tarfile.open(fileobj=gz,mode='w|')as a:
    for target,b in owned:
     info=tarfile.TarInfo(target);info.size=len(b);info.mode=0o600;a.addfile(info,io.BytesIO(b))
 with tarfile.open(archive,'r:gz')as a:assert all(a.extractfile(n).read()==b for n,b in owned)
 add(archive,PREFIX+archive.name)
 save(P/'AUTHORED_SNAPSHOT_READBACK_PRIVATE_V1.json',{'path':str(archive),'sha256':sha(archive),'bytes':archive.stat().st_size,'filesReadBackExact':len(owned)})
 add(P/'AUTHORED_SNAPSHOT_READBACK_PRIVATE_V1.json',PREFIX+'publication/AUTHORED_SNAPSHOT_READBACK_PRIVATE_V1.json')
 known=set(prior.values());inputs={};proofs=[];entries={}
 receipts=P/'blob-receipts';receipts.mkdir(exist_ok=True)
 def pin(item):
  target,path=item;b=read(path);h=hashlib.sha256(b).hexdigest();oid=hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest();receipt=receipts/(h+'.json');assert len(b)<30*1024*1024
  if oid in known:kind='immutable parent tree'
  elif receipt.exists():assert load(receipt)['gitBlobOID']==oid;kind='exact prior readback'
  else:
   created=api('git/blobs',{'encoding':'base64','content':base64.b64encode(b).decode()});assert created['sha']==oid
   got=api('git/blobs/'+oid);assert base64.b64decode(got['content'])==b
   save(receipt,{'source':str(path),'sha256':h,'gitBlobOID':oid,'bytes':len(b),'exactReadback':True});kind='created and exact readback'
  return target,{'source':str(path),'sha256':h,'gitBlobOID':oid,'bytes':len(b),'proof':kind}
 with concurrent.futures.ThreadPoolExecutor(max_workers=4)as pool:
  for n,(target,row)in enumerate(pool.map(pin,selected.items()),1):
   entries[target]=row['gitBlobOID'];inputs[row['source']]=row['sha256'];proofs.append(dict(row,gitPath=target))
   if n%20==0:print('PINNED',n,len(selected),flush=True)
 for p,h in inputs.items():assert sha(Path(p))==h,'Changed during preparation: '+p
 allowed={'public/cqc/'+x for x in allow}|{'public/cqc/runtime-manifest.json','package.json'}
 assert all(target not in old or target in allowed or entries[target]==old[target]for target in entries),'Unexpected historical path mutation'
 plan={'schema':'cqc.p54.final-publication-plan/1','branch':BRANCH,'parent':cursor,'selectedEntries':len(entries),'inputs':inputs,'entries':entries,'proofs':proofs,'allowedHistoricalChanges':sorted(allowed)};save(P/'FINAL_PUBLICATION_PLAN_PRIVATE_V1.json',plan)
 return plan,before,baseline

def commit(plan,before,baseline):
 head=plan['parent'];assert api('git/ref/heads/'+BRANCH)['object']['sha']==head['commit'];assert load(P/'CURRENT_HEAD_PRIVATE_V1.json')==head
 for p,h in plan['inputs'].items():assert sha(Path(p))==h,'Input changed: '+p
 dirs={r['path']:r['sha']for r in before['tree']if r['type']=='tree'};dirs['']=before['sha'];trie={}
 for path,oid in sorted(plan['entries'].items()):
  node=trie;parts=path.split('/')
  for part in parts[:-1]:node=node.setdefault(part,{})
  node[parts[-1]]=oid
 chunks=[]
 def directory(node,path):
  children=[]
  for name,value in sorted(node.items()):
   if isinstance(value,dict):children.append({'path':name,'mode':'040000','type':'tree','sha':directory(value,path+'/'+name if path else name)})
   else:children.append({'path':name,'mode':'100644','type':'blob','sha':value})
  base=dirs.get(path)
  for start in range(0,len(children),48):
   payload={'tree':children[start:start+48]}
   if base:payload['base_tree']=base
   base=api('git/trees',payload)['sha'];chunks.append({'directory':path,'count':len(payload['tree']),'tree':base});print('TREE',path,start+len(payload['tree']),len(children),flush=True)
  return base
 tree=directory(trie,'');after=api('git/trees/'+tree+'?recursive=1');assert not after.get('truncated');save(P/'CANDIDATE_FINAL_FULL_TREE_PRIVATE_V1.json',after)
 old={r['path']:r['sha']for r in before['tree']if r['type']=='blob'};actual={r['path']:r['sha']for r in after['tree']if r['type']=='blob'}
 assert set(old)<=set(actual),'An existing file was removed'
 assert all(actual[p]==oid for p,oid in plan['entries'].items())
 changed=[p for p,oid in actual.items()if p in old and old[p]!=oid];assert set(changed)<=set(plan['allowedHistoricalChanges'])
 for r in load(P/'SOURCE_COMMITS_PRIVATE_V1.json')['rows']:assert actual[r['gitPath']]==r['gitBlobOID']
 for p,h in plan['inputs'].items():assert sha(Path(p))==h,'Input changed: '+p
 assert api('git/ref/heads/'+BRANCH)['object']['sha']==head['commit']
 made=api('git/commits',{'tree':tree,'parents':[head['commit']],'message':'feat(cqc): complete P54 costumes, boss scenes and separated Gander\n\nNineteen original costume poses and two new character sources, four authored stages, fixed boss-scene bindings, reused Gander parts, free-mode links and a seventy-sheet tracking workbook. Preserve previous assets and generation guards.'})
 save(P/'FINAL_PRE_REF_ATTEMPT_PRIVATE_V1.json',{'parent':head,'commit':made['sha'],'tree':tree})
 assert api('git/ref/heads/'+BRANCH)['object']['sha']==head['commit']
 api('git/refs/heads/'+BRANCH,{'sha':made['sha'],'force':False},'PATCH');assert api('git/ref/heads/'+BRANCH)['object']['sha']==made['sha']
 receipt={'schema':'cqc.p54.final-git-delivery/1','atUTC':datetime.datetime.now(datetime.timezone.utc).isoformat(),'branch':BRANCH,'parent':head['commit'],'commit':made['sha'],'tree':tree,'selectedEntries':len(plan['entries']),'preservedPreviousBlobPaths':len(old),'removedPaths':0,'changedHistoricalPaths':changed,'rawSourcesPreservedExact':28,'sourceWriterStopped':True,'finalVerification':'PASS_FINAL','treeChunks':chunks}
 save(P/'FINAL_GIT_DELIVERY_PRIVATE_V1.json',receipt);save(P/'CURRENT_HEAD_PRIVATE_V1.json',{'commit':made['sha'],'tree':tree});save(P/'FINAL_FULL_TREE_PRIVATE_V1.json',after)
 print(json.dumps({k:v for k,v in receipt.items()if k!='treeChunks'}),flush=True)

if __name__=='__main__':
 plan,before,baseline=stage();commit(plan,before,baseline)
