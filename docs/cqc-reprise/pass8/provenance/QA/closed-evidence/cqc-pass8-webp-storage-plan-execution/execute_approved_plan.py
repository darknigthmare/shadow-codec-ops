"""Root-approved WebP adaptation of the proven closed-PNG executor.

Only frozen rasters are linked. Journal every operation; preserve every path.
"""
from pathlib import Path
import os, stat, json, hashlib, time, shutil, uuid, traceback, sys

OUT=Path(__file__).parent
P=OUT.parent
APPROVED='4ee3719a92931017a324772197f4a40e48289a4a5fcffc89ca5cec1f03533efb'
PLAN=P/'WEBP_HARDLINK_REVIEW_PLAN.json'
if sys.argv[1:]!=['--approved-plan-sha',APPROVED]:
 raise RuntimeError('Exact root-approved plan SHA argument required')
raw=PLAN.read_bytes()
if hashlib.sha256(raw).hexdigest()!=APPROVED:raise RuntimeError('Approved plan SHA drift')
plan=json.loads(raw)
script=Path(plan['planScript']['path']);script_raw=script.read_bytes()
if hashlib.sha256(script_raw).hexdigest()!=plan['planScript']['sha256']:raise RuntimeError('Read-only planner definitions SHA drift')
# Reuse the reviewed O_NOFOLLOW full snapshot, SHA/stat and Git guards.
ns={'__file__':str(script)}
exec(compile(script_raw.decode().split('P.mkdir(parents=True,exist_ok=True)')[0],str(script),'exec'),ns)
rec=ns['rec'];fingerprint=ns['fingerprint'];real_ancestors=ns['real_ancestors'];git_snapshot=ns['git_snapshot']
STATIC=('bytes','allocatedBytes','device','inode','permissionsOctal','uid','gid','mtimeNs')
OUT.mkdir(exist_ok=True)
if (OUT/'PROGRESS.jsonl').exists():raise RuntimeError('Existing journal; no silent resume or overwrite')
journal=(OUT/'PROGRESS.jsonl').open('x',encoding='utf-8')
started=time.time();completed=[];created=[];dynamic={}

def emit(event,**kw):
 journal.write(json.dumps({'timeUnix':time.time(),'event':event,**kw},ensure_ascii=False)+'\n')
 journal.flush();os.fsync(journal.fileno())
def write(name,value):
 with (OUT/name).open('x',encoding='utf-8')as f:
  json.dump(value,f,ensure_ascii=False,indent=2);f.write('\n');f.flush();os.fsync(f.fileno())
def checked_document(ref):
 data=Path(ref['path']).read_bytes()
 if hashlib.sha256(data).hexdigest()!=ref['sha256'] or len(data)!=ref['bytes']:raise RuntimeError('Plan evidence drift: '+ref['path'])
 return json.loads(data)
def full_snapshot():
 ns['HASH_CACHE']={};ns['EXCLUDED']=[]
 return ns['snapshot']()
def fsync_parent(path):
 fd=os.open(Path(path).parent,os.O_RDONLY|os.O_DIRECTORY)
 try:os.fsync(fd)
 finally:os.close(fd)
def digest_fd(fd):
 os.lseek(fd,0,os.SEEK_SET);h=hashlib.sha256()
 while True:
  block=os.read(fd,8*1024*1024)
  if not block:break
  h.update(block)
 return h.hexdigest()
def immediate(path,fd,expected,sha):
 real_ancestors(path)
 before=rec(path,os.fstat(fd));digest=digest_fd(fd)
 if before!=rec(path,os.fstat(fd)) or before!=rec(path,os.lstat(path)):raise RuntimeError('Immediate SHA/stat identity drift: '+str(path))
 if any(before[k]!=expected[k]for k in STATIC):raise RuntimeError('Immediate immutable metadata drift: '+str(path))
 evolving=dynamic[(before['device'],before['inode'])]
 if any(before[k]!=evolving[k]for k in ('nlink','ctimeNs')):raise RuntimeError('Unexpected evolving inode metadata drift: '+str(path))
 if digest!=sha:raise RuntimeError('Immediate SHA drift: '+str(path))
 return {**before,'sha256':digest}
def update_dynamic(row):
 dynamic[(row['device'],row['inode'])]={k:row[k]for k in ('nlink','ctimeNs')}
def verify_pins(checks):
 rows=[]
 for expected in checks:
  actual=fingerprint(expected['path'])
  if actual['sha256']!=expected['expectedSha256'] or actual['bytes']!=expected['expectedBytes']:raise RuntimeError('Frozen pin drift: '+expected['path'])
  rows.append({**expected,'actualSha256':actual['sha256'],'actualBytes':actual['bytes'],'passed':True})
 return rows

try:
 groups=plan['groups'];operations=[op for g in groups for op in g['operations']]
 assert len(groups)==488 and len(operations)==976 and not plan['skipped']
 assert plan['space']['allocatedBytesReclaimable']==379871232 and plan['space']['newImageCopies']==0
 targets={op['target']:op for op in operations};assert len(targets)==976
 donors={g['donor']['path']:g['donor']for g in groups};assert len(donors)==488
 keeper_paths={g['keeperSnapshot']for g in groups};assert len(keeper_paths)==488
 target_roots=[Path(x)for x in plan['roots']['targets']]
 for op in operations:
  t=Path(op['target']);k=Path(op['keeper']);d=Path(op['donor'])
  assert t.suffix=='.webp' and k.suffix=='.webp' and d.suffix=='.webp'
  assert any(t.is_relative_to(root)for root in target_roots)
  assert k.parent==P/'immutable-keepers' and k.name.startswith(op['sha256']+'-')
  assert d.is_relative_to(ns['R']/'assets')or d.is_relative_to(ns['R']/'originals')
  assert op['before']['nlink']==1 and op['operation']=='atomic-byte-preserving-hardlink-replacement'
  assert all(op['before'][key]==op['keeperBeforeSnapshot'][key]for key in ('sha256','bytes','device','permissionsOctal','uid','gid'))
  for path in (t,k,d):real_ancestors(path)
 planned_before=checked_document(plan['fullBeforeSnapshot']);planned_git=checked_document(plan['gitBefore'])
 pin_doc=checked_document(plan['frozenBaselinePinChecks']);checks=pin_doc['checks'];assert len(checks)==1130
 raster_doc=checked_document(plan['frozenRWebpPins']);assert len(raster_doc['files'])==488
 checked_document(plan['keeperSnapshotPlan'])
 free_before=shutil.disk_usage('/workspace').free
 emit('authorized-plan-verified',planSha256=APPROVED,operations=976,keepers=488,freeBytesBefore=free_before,args=sys.argv[1:])
 git_before=git_snapshot()
 if git_before!=planned_git:raise RuntimeError('Git HEAD/status drift from approved plan')
 write('GIT_BEFORE.json',git_before)
 source_before=full_snapshot()
 if source_before['files']!=planned_before['files']:raise RuntimeError('Full R/S byte/stat/path drift from approved plan')
 write('FULL_R_S_BEFORE.json',source_before)
 for row in source_before['files']:update_dynamic(row)
 pre_pins=verify_pins(checks);write('FROZEN_PINS_BEFORE.json',{'assertions':len(pre_pins),'failures':0,'checks':pre_pins})
 for row in raster_doc['files']:
  actual=fingerprint(ns['R']/row['path'])
  if actual['sha256']!=row['sha256']or actual['bytes']!=row['bytes']or row['format']!='webp':raise RuntimeError('Explicit frozen R WebP pin drift')
 emit('all-preflight-guards-passed',fullFiles=len(source_before['files']),frozenPins=1130,explicitRWebpPins=488)
 print(json.dumps({'phase':'preflight-passed','files':len(source_before['files']),'pins':1130}),flush=True)
 keeper_dir=P/'immutable-keepers'
 if keeper_dir.exists():raise RuntimeError('Keeper directory already exists; do not resume silently')
 keeper_dir.mkdir();fsync_parent(keeper_dir)
 # Add only new snapshot directory entries to already frozen exact R inodes.
 for index,g in enumerate(groups,1):
  donor=g['donor'];path=donor['path'];keeper=g['keeperSnapshot'];real_ancestors(keeper)
  if Path(keeper).exists():raise RuntimeError('Keeper path collision')
  fd=os.open(path,os.O_RDONLY|os.O_NOFOLLOW)
  try:
   before=immediate(path,fd,donor,g['sha256'])
   emit('keeper-snapshot-start',index=index,donor=path,keeper=keeper,before=before)
   os.link(path,keeper,follow_symlinks=False);fsync_parent(keeper)
   after=rec(path,os.fstat(fd));linked=rec(keeper,os.lstat(keeper))
   if any(after[k]!=before[k]for k in STATIC)or after['nlink']!=before['nlink']+1 or linked['inode']!=after['inode']or linked['device']!=after['device']:raise RuntimeError('Keeper snapshot identity/link-count drift')
   update_dynamic(after)
   actual=fingerprint(keeper)
   if actual['sha256']!=g['sha256']or actual['bytes']!=g['bytes']:raise RuntimeError('Keeper snapshot SHA drift')
   created.append({'index':index,'donor':path,'keeper':keeper,'after':actual})
   emit('keeper-snapshot-complete',**created[-1])
  finally:os.close(fd)
 for group_index,g in enumerate(groups,1):
  for op in g['operations']:
   keeper=op['keeper'];target=op['target'];expected_k=op['keeperBeforeSnapshot'];expected_t=op['before']
   kfd=os.open(keeper,os.O_RDONLY|os.O_NOFOLLOW);tfd=os.open(target,os.O_RDONLY|os.O_NOFOLLOW)
   tmp=None
   try:
    kb=immediate(keeper,kfd,expected_k,op['sha256']);tb=immediate(target,tfd,expected_t,op['sha256'])
    emit('operation-start',index=len(completed)+1,group=group_index,keeper=keeper,target=target,immediateBefore=[kb,tb])
    tmp=Path(target).parent/('.cqc-frozen-webp-'+uuid.uuid4().hex+'.tmp')
    os.link(keeper,tmp,follow_symlinks=False)
    linked=rec(tmp,os.lstat(tmp))
    if (linked['device'],linked['inode'])!=(kb['device'],kb['inode'])or linked['nlink']!=kb['nlink']+1:raise RuntimeError('Temporary keeper link mismatch')
    if rec(target,os.lstat(target))!={k:v for k,v in tb.items()if k!='sha256'}:raise RuntimeError('Target drift immediately before replace')
    os.replace(tmp,target);tmp=None;fsync_parent(target)
    ka=rec(keeper,os.fstat(kfd));old=rec(target,os.fstat(tfd))
    if ka['nlink']!=kb['nlink']+1 or old['nlink']!=tb['nlink']-1:raise RuntimeError('Unexpected replacement link-count drift')
    update_dynamic(ka);update_dynamic(old)
    actual=fingerprint(target)
    if actual['sha256']!=op['sha256']or (actual['device'],actual['inode'])!=(ka['device'],ka['inode']):raise RuntimeError('Postreplacement SHA/inode mismatch')
    row={'index':len(completed)+1,'group':group_index,'keeper':keeper,'target':target,'after':actual}
    completed.append(row);emit('operation-complete',**row)
   finally:os.close(tfd);os.close(kfd)
   if len(completed)%100==0:print(json.dumps({'completed':len(completed),'of':976}),flush=True)
 write('KEEPER_SNAPSHOTS_POST.json',{'assertions':488,'failures':0,'checks':created})
 post_targets=[]
 for op in operations:
  actual=fingerprint(op['target']);keeper=fingerprint(op['keeper'])
  if actual['sha256']!=op['sha256']or actual['bytes']!=op['bytes']or (actual['device'],actual['inode'])!=(keeper['device'],keeper['inode']):raise RuntimeError('Final target SHA/inode mismatch')
  post_targets.append(actual)
 write('TARGETS_POST_VERIFICATION.json',{'assertions':976,'failures':0,'checks':post_targets})
 post_pins=verify_pins(checks);write('FROZEN_PINS_POST_VERIFICATION.json',{'assertions':1130,'failures':0,'checks':post_pins})
 source_after=full_snapshot();write('FULL_R_S_AFTER.json',source_after)
 before_by_path={r['path']:r for r in source_before['files']};after_by_path={r['path']:r for r in source_after['files']}
 if before_by_path.keys()!=after_by_path.keys():raise RuntimeError('Full R/S path set changed')
 for path,before in before_by_path.items():
  after=after_by_path[path]
  if path in targets:
   op=targets[path];donor=op['keeperBeforeSnapshot']
   for key in ('bytes','sha256','permissionsOctal','uid','gid'):
    if after[key]!=before[key]:raise RuntimeError('Target byte/perms/owner changed: '+path)
   if any(after[key]!=donor[key]for key in STATIC):raise RuntimeError('Target metadata differs from pinned donor: '+path)
  else:
   if any(after[key]!=before[key]for key in (*STATIC,'sha256')):raise RuntimeError('Unplanned source/historical identity drift: '+path)
  expected_dynamic=dynamic[(after['device'],after['inode'])]
  if any(after[key]!=expected_dynamic[key]for key in ('nlink','ctimeNs')):raise RuntimeError('Unexpected post-execution inode metadata drift: '+path)
 git_after=git_snapshot();write('GIT_AFTER.json',git_after)
 if git_before!=git_after:raise RuntimeError('Git HEAD/status changed')
 free_after=shutil.disk_usage('/workspace').free
 result={'schema':'cqc.pass8.webp-storage-hardlink-execution/1','status':'completed','approvedPlanSha256':APPROVED,'operationsCompleted':len(completed),'keeperSnapshotsCreated':len(created),'contentGroups':488,'targetShaChecks':976,'frozenPinChecks':1130,'failures':0,'fullR_SFilesChecked':len(source_after['files']),'sourcesBeforeAfterBytePermissionOwnerIdentical':True,'unplannedFileIdentityChanges':0,'gitHEADStatusTextUnchanged':True,'historicalPathDeletionCount':0,'imageContentWrites':0,'mutableSourceWrites':0,'newImagePayloadBytes':0,'allocatedBytesReclaimed':379871232,'freeBytesBefore':free_before,'freeBytesAfter':free_after,'measuredFreeBytesChange':free_after-free_before,'spaceMeasurementQualifier':'Includes proof metadata and concurrent unrelated allocations on the shared overlay.','targetMtimePolicy':'Target mtime adopts frozen donor; inode/ctime/nlink changes match journal exactly.','elapsedSeconds':round(time.time()-started,2)}
 emit('completed',**result);write('EXECUTION_RESULT.json',result)
 print(json.dumps(result,ensure_ascii=False,indent=2),flush=True)
except BaseException as error:
 failure={'status':'stopped-on-drift-or-error','approvedPlanSha256':APPROVED,'operationsCompleted':len(completed),'keeperSnapshotsCreated':len(created),'errorType':type(error).__name__,'error':str(error),'elapsedSeconds':round(time.time()-started,2)}
 emit('STOP',**failure);write('STOP.json',failure);print(json.dumps(failure),flush=True)
 raise
finally:journal.close()
