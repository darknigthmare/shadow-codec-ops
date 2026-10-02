"""PLAN ONLY: exact single-link PNG copies in two closed backups.

Reuse proven O_NOFOLLOW/full-project/Git definitions. Never link/replace here.
"""
from pathlib import Path
import os, stat, json, hashlib, time, shutil, gzip, collections
P=Path(__file__).parent; W=Path('/workspace'); R=W/'cqc-game-working/cqc-versus-v056'; S=W/'shadow-codec-recovered'
BASE=W/'cqc-pass8-webp-storage-plan/build_plan.py'
BASE_SHA='dcc79cce5402f8a4dd3654a051fb2846720de0dcb2b2ee8a000506f235cd12e5'
raw=BASE.read_bytes();assert hashlib.sha256(raw).hexdigest()==BASE_SHA
ns={'__file__':str(BASE)};exec(compile(raw.decode().split('P.mkdir(parents=True,exist_ok=True)')[0],str(BASE),'exec'),ns)
rec=ns['rec'];fingerprint=ns['fingerprint'];real_ancestors=ns['real_ancestors'];git_snapshot=ns['git_snapshot']
START=time.time()
STATIC=('bytes','allocatedBytes','device','inode','permissionsOctal','uid','gid','mtimeNs')
ARCHIVE_STATIC=(*STATIC,'nlink','ctimeNs')
RUNTIME_RECEIPT=W/'cqc-pass8-storage-tools/root-runtime-evidence/receipt-56ab47df-96b8-488f-9b87-c68f7d375289.json'
BUILD_RECEIPT=W/'cqc-pass8-storage-tools/root-build-evidence/receipt-1956f5fd-15ea-4b3c-88f6-11666cf95ed4.json'
PINS=W/'cqc-pass8-storage-tools/runtime-pins-root-rev3.json'
PINS_SHA='79b8290d0cbeff0f02f8b5cdd8de68772c75c6e1356bb1d19dfc8dc129a56d06'
PREVIOUS_PINS=W/'cqc-pass8-webp-storage-plan/execution/FROZEN_PINS_POST_VERIFICATION.json'
ARCHIVE_STATS=W/'cqc-pass8-storage-plan/SCAN_FILE_STATS.json'
ARCHIVE_STATS_SHA='ae17ebb580e39af62c3b8d560f68bc8eefa23440087d90a91ec7f3b50d54b990'

def sha(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()
def ref(p):return {'path':str(p),'bytes':Path(p).stat().st_size,'sha256':sha(p),'compression':'gzip'if str(p).endswith('.gz')else None}
def write(name,data,compressed=False):
 p=P/name;payload=(json.dumps(data,ensure_ascii=False,separators=(',',':'))+'\n').encode()if compressed else (json.dumps(data,ensure_ascii=False,indent=2)+'\n').encode()
 if compressed:payload=gzip.compress(payload,compresslevel=6,mtime=0)
 with p.open('xb')as f:f.write(payload)
 return ref(p)
def tree(root):
 real_ancestors(root);assert root.is_dir()and not root.is_symlink();rows=[]
 for base,dirs,names in os.walk(root,followlinks=False):
  for name in dirs:
   if Path(base,name).is_symlink():raise RuntimeError('Symlink closed backup directory')
  dirs[:]=sorted(dirs)
  for name in sorted(names):
   p=Path(base,name);real_ancestors(p);rows.append(fingerprint(p))
 return {'root':str(root),'files':sorted(rows,key=lambda x:x['path']),'fileCount':len(rows)}

P.mkdir(parents=True,exist_ok=True)
runtime=json.loads(RUNTIME_RECEIPT.read_text());build=json.loads(BUILD_RECEIPT.read_text())
assert runtime['status']=='passed'and build['status']=='passed'
ROOTS=[Path(runtime['promotion']['backup']),Path(build['promotion']['backup'])/'cqc']
assert ROOTS[0]==W/'cqc-pass8-storage-tools/root-runtime-backups/cqc-088abffa-7dad-4e93-9331-89bea636b7a8'
assert ROOTS[1].is_relative_to(W/'cqc-pass8-storage-tools/root-build-backups')and ROOTS[1].name=='cqc'
assert all(not x.is_relative_to(R)and not x.is_relative_to(S)for x in ROOTS)
assert sha(PINS)==PINS_SHA
allpins=json.loads(PINS.read_text());assert allpins['confirmedByRoot']is True and allpins['sourceState']=='frozen'and allpins['sourceRoot']==str(R)
pngpins={r['path']:r for r in allpins['files']if r['format']=='png'};assert len(pngpins)==433
git_before=git_snapshot();source=ns['snapshot']();source_ref=write('FULL_R_S_BEFORE.json.gz',source,True)
closed=[tree(root)for root in ROOTS];closed_ref=write('CLOSED_BACKUPS_BEFORE.json.gz',{'trees':closed},True)
by_source={r['path']:r for r in source['files']};candidates=[];skips=[]
for root,inventory in zip(ROOTS,closed):
 for t in inventory['files']:
  p=Path(t['path'])
  if p.suffix.lower()!='.png':continue
  rel=p.relative_to(root).as_posix()
  if rel not in pngpins:raise RuntimeError('Unexpected non-pinned PNG in closed CQC backup: '+rel)
  if t['nlink']!=1:skips.append({'target':str(p),'reason':'already-shared-no-reclamation-claimed','nlink':t['nlink']});continue
  donor=by_source[str(R/rel)];pin=pngpins[rel]
  if donor['bytes']!=pin['bytes']or donor['sha256']!=pin['sha256']:raise RuntimeError('R frozen PNG pin drift: '+rel)
  if any(t[k]!=donor[k]for k in ['sha256','bytes','device','permissionsOctal','uid','gid']):raise RuntimeError('Backup/source byte or metadata mismatch: '+rel)
  for f in [p,R/rel]:
   with f.open('rb')as stream:
    if stream.read(8)!=b'\x89PNG\r\n\x1a\n':raise RuntimeError('PNG signature mismatch')
  candidates.append({**t,'relativeRuntimePath':rel,'donorPath':donor['path']})
groups=collections.defaultdict(list)
for row in candidates:groups[(row['sha256'],row['bytes'],row['device'],row['permissionsOctal'],row['uid'],row['gid'])].append(row)
proposed=[];snapshots=[];reclaim=0
for identity,rows in sorted(groups.items()):
 donor=by_source[rows[0]['donorPath']];keeper=P/'immutable-keepers'/f"{donor['sha256']}-{donor['device']}-{donor['uid']}-{donor['gid']}-{donor['permissionsOctal'][2:]}.png"
 assert not keeper.exists()
 snapshots.append({'source':donor['path'],'keeper':str(keeper),'sourceBefore':donor,'operation':'create-new-frozen-snapshot-hardlink','newImagePayloadBytes':0,'pathDeletes':0})
 ops=[]
 for row in rows:
  reclaim+=row['allocatedBytes'];ops.append({'keeper':str(keeper),'donor':donor['path'],'target':row['path'],'sha256':row['sha256'],'bytes':row['bytes'],'before':row,'keeperBeforeSnapshot':donor,'operation':'atomic-byte-preserving-hardlink-replacement','expectedAfterPermissionsOctal':donor['permissionsOctal'],'expectedAfterMtimeNs':donor['mtimeNs'],'historicalPathsDeleted':0,'imageContentWrites':0})
 proposed.append({'sha256':donor['sha256'],'bytes':donor['bytes'],'device':donor['device'],'permissionsOctal':donor['permissionsOctal'],'uid':donor['uid'],'gid':donor['gid'],'donor':donor,'keeperSnapshot':str(keeper),'sourceMatchedRuntimePaths':[row['relativeRuntimePath']for row in rows],'targetPathCount':len(rows),'targetDistinctInodes':len(rows),'allTargetInodeLinksFoundAndSelected':True,'allocatedBytesReclaimable':sum(row['allocatedBytes']for row in rows),'operations':ops})
assert len(proposed)==6 and len(candidates)==12 and reclaim==36143104
previous=json.loads(PREVIOUS_PINS.read_text());assert previous['assertions']==1130 and previous['failures']==0
assert sha(ARCHIVE_STATS)==ARCHIVE_STATS_SHA
old_stats={r['path']:r for r in json.loads(ARCHIVE_STATS.read_text())['files']};checks=[]
for expected in previous['checks']:
 p=Path(expected['path']);real_ancestors(p);current=rec(p,os.lstat(p))
 if p.suffix.lower()in ['.zip','.z01','.z02']:
  prior=old_stats[str(p)]
  if any(current[k]!=prior[k]for k in ARCHIVE_STATIC):raise RuntimeError('Closed archive stat seal drift: '+str(p))
  if current['bytes']!=expected['expectedBytes']:raise RuntimeError('Archive byte length drift')
  checks.append({**expected,'verificationMethod':'closed-full-SHA-proof-plus-unchanged-full-stat-seal-no-archive-reread','sealedStaticMetadata':current})
 else:
  actual=fingerprint(p)
  if actual['sha256']!=expected['expectedSha256']or actual['bytes']!=expected['expectedBytes']:raise RuntimeError('Frozen historical/native/source pin drift: '+str(p))
  checks.append({**expected,'verificationMethod':'current-full-SHA','sealedStaticMetadata':current})
checks_ref=write('FROZEN_BASELINE_AND_REV3_PIN_CHECKS.json.gz',{'assertions':len(checks),'failures':0,'checks':checks,'priorClosedProof':ref(PREVIOUS_PINS),'archiveStatSource':ref(ARCHIVE_STATS),'archivesNotReread':sum(c['verificationMethod'].startswith('closed-')for c in checks)},True)
git_after=git_snapshot();assert git_before==git_after
git_ref=write('GIT_BEFORE.json.gz',git_before,True)
keeper_ref=write('KEEPER_SNAPSHOT_LINK_PLAN.json',{'mutationPerformed':False,'newImagePayloadBytes':0,'snapshots':snapshots})
raster_ref=write('FROZEN_R_EXACT_PNG_PINS.json',{'schema':'cqc.pass8.immutable-png-pins/1','sourceRoot':str(R),'sourceState':'frozen','confirmedByRoot':True,'files':[{k:r[k]for k in ['path','bytes','sha256','immutable']}for r in pngpins.values()if str(R/r['path'])in {g['donor']['path']for g in proposed}]})
plan={'schema':'cqc.pass8.closed-backup-png-hardlink-review-plan/1','status':'read-only-plan-ready-awaiting-root-GO','createdAtUnix':time.time(),'roots':{'R':str(R),'S':str(S),'targets':[str(x)for x in ROOTS]},'mutationPerformed':False,'planScript':ref(__file__),'provenDefinitions':ref(BASE),'fullBeforeSnapshot':source_ref,'closedBackupsBeforeSnapshot':closed_ref,'gitBefore':git_ref,'frozenBaselinePinChecks':checks_ref,'frozenRPngPins':raster_ref,'keeperSnapshotPlan':keeper_ref,'frozenRuntimeRasterPins':ref(PINS),'closedReceiptAuthority':[ref(RUNTIME_RECEIPT),ref(BUILD_RECEIPT)],'rules':{'onlyClosedBackupTargets':True,'onlyExplicitFrozenPngSinglelinkCopies':True,'sourceCodeJSONJSNeverHardlinked':True,'sameBytesDevicePermissionsOwnerRequired':True,'allTargetLinksFoundAndSelected':True,'O_NOFOLLOWHashAndIdentityChecksRequired':True,'futureInPlaceImageWritersForbidden':True,'snapshotKeeperPreferred':True,'targetMtimesAdoptKeeperMtime':True,'inodeCtimeLinkCountsExpectedToChange':True,'modeUidGidBytesAllPathsPreserved':True,'noHistoricalPathDeleted':True,'currentSpublicOrDistNotTargets':True},'space':{'freeBytesAtPlan':shutil.disk_usage(W).free,'allocatedBytesReclaimable':reclaim,'allocatedReclaimMiB':reclaim/1048576,'targetPayloadBytes':sum(r['bytes']for r in candidates),'targetDistinctInodes':12,'targetPaths':12,'contentMetadataGroups':6,'newKeeperLinks':6,'newImageCopies':0,'newImagePayloadBytes':0,'sourcePinPaths':6,'executionEvidenceBudgetBytes':6*1024*1024,'budgetQualifier':'Compressed full byte/stat snapshots retain every row; estimate excludes unrelated allocations. Actual filesystem free delta must be measured.'},'groups':proposed,'skipped':skips,'rootExecutionRequirements':['Root GO for exact plan SHA before any snapshot link or target replacement.','Revalidate full current R/S, closed backups, Git and 1130 baseline pin conditions before action. Archives use already closed full SHA with exact full stat seals, never are rewritten or re-read.','Only these twelve single-link PNG entries may change inode/mtime/ctime/nlink. Every path, byte, permissions and owner survives. Donor and its existing aliases may gain nlink/ctime only.','Use the proven O_NOFOLLOW immediate SHA/fstat/lstat, fsynced append-only journal, fresh keeper snapshot hardlinks and temporary target-parent links, os.replace atomically, fsync directory.','Postcheck full R/S and both complete closed backup inventories, allowing only declared metadata dynamics; source/Git bytes remain identical.','No images/text/JSON/JS content writes, chmod, arbitrary deletions, silent resumes or scope expansion.']}
plan_ref=write('CLOSED_BACKUP_PNG_HARDLINK_REVIEW_PLAN.json',plan)
summary={'status':plan['status'],'plan':plan_ref,'fullR_SFiles':source['fileCount'],'closedBackupFiles':sum(t['fileCount']for t in closed),'frozenPinChecks':1130,'archiveStatSeals':26,'oldPngPaths':710,'alreadySharedSkipped':len(skips),'operations':12,'keepers':6,'space':plan['space'],'elapsedSeconds':time.time()-START,'candidateMutationPerformed':False}
write('PLAN_SUMMARY.json',summary);print(json.dumps(summary,indent=2),flush=True)
