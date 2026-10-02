"""Read-only exact-byte hardlink plan. Never mutates a candidate source path."""
from pathlib import Path
import os, stat, json, hashlib, time, collections, shutil
P=Path(__file__).parent;W=Path('/workspace');R=W/'cqc-game-working/cqc-versus-v056'
DENY={'.git','node_modules','.aws','.codex','.agents','.ssh','.config','.cache','__pycache__','dist','auth','credentials','secrets','vercel-auth'}
def sha(p):
 h=hashlib.sha256()
 with Path(p).open('rb')as f:
  for b in iter(lambda:f.read(8*1024*1024),b''):h.update(b)
 return h.hexdigest()
def record(p,s=None):
 s=s or p.lstat()
 return {'path':str(p),'bytes':s.st_size,'allocatedBytes':s.st_blocks*512,'device':s.st_dev,'inode':s.st_ino,'nlink':s.st_nlink,'permissionsOctal':oct(stat.S_IMODE(s.st_mode)),'uid':s.st_uid,'gid':s.st_gid,'mtimeNs':s.st_mtime_ns,'ctimeNs':s.st_ctime_ns}
def allowed_path(p):
 rel=p.relative_to(W)
 return not any(part in DENY or 'pass8' in part.lower() or 'pass-8'in part.lower() for part in rel.parts) and not p.is_symlink()
facts_path=W/'cqc-pass8-frozen-baseline-facts.json';facts=json.loads(facts_path.read_text());native_pin=facts['previousNativeGenerationInventory'];native_path=Path(native_pin['path'])
assert sha(native_path)==native_pin['sha256']
native=json.loads(native_path.read_text());assert len(native['files'])==536
started=time.time();all_files=[];inode_paths=collections.defaultdict(list)
for base,dirs,names in os.walk(W,followlinks=False):
 dirs[:]=[n for n in dirs if n not in DENY and 'pass8'not in n.lower() and 'pass-8'not in n.lower() and not Path(base,n).is_symlink()]
 for name in names:
  p=Path(base,name)
  if not allowed_path(p):continue
  try:s=p.lstat()
  except FileNotFoundError:continue
  if stat.S_ISREG(s.st_mode):
   rec=record(p,s);all_files.append(rec);inode_paths[(s.st_dev,s.st_ino)].append(str(p))
hash_cache={};seed_by_sha={};pin_checks=[]
def hashed(p):
 s=Path(p).lstat();k=(s.st_dev,s.st_ino,s.st_size,s.st_mtime_ns,s.st_ctime_ns)
 if k not in hash_cache:hash_cache[k]=sha(p)
 return hash_cache[k]
def seed(p,digest,size,kind):
 p=Path(p);r=record(p);actual=hashed(p);v=r['bytes']==size and actual==digest
 pin_checks.append({'path':str(p),'expectedSha256':digest,'actualSha256':actual,'expectedBytes':size,'actualBytes':r['bytes'],'passed':v,'kind':kind})
 assert v, str(p)+' frozen pin mismatch'
 row=seed_by_sha.setdefault(digest,{'sha256':digest,'bytes':size,'kinds':[],'seedPaths':[]});row['kinds']=sorted(set(row['kinds']+[kind]));row['seedPaths'].append(str(p))
for row in facts['previousArchiveAndSidecars']:
 seed(row['path'],row['sha256'],row['bytes'],'historical-archive' if Path(row['path']).suffix.lower()in ['.zip','.z01','.z02'] else'historical-pinned-sidecar')
for row in native['files']:
 seed(W/'generated_images'/row['nativeFilename'],row['sha256'],row['bytes'],'previous536-native-png')
 seed(R/row['preservedFile'],row['sha256'],row['bytes'],'previous536-native-png')
# Every PASS7 browser/publication generation is already closed. Seed only PNGs;
# no mutable source, JSON/config, JS/HTML, auth or active PASS8 output can be selected.
closed_prefixes=['/workspace/cqc-pass7-native-browser','/workspace/cqc-pass7-gameplay-browser','/workspace/cqc-pass7-browser-final-before','/workspace/shadow-cqc-pass7-browser','/workspace/vercel-pass7-publication','/workspace/vercel-pass7-publication-from-git']
closed_seeds=0
for rec in all_files:
 p=Path(rec['path'])
 if p.suffix.lower()=='.png' and any(str(p).startswith(prefix)for prefix in closed_prefixes):
  digest=hashed(p);seed(p,digest,rec['bytes'],'closed-pass7-qa-png');closed_seeds+=1
sizes={row['bytes']for row in seed_by_sha.values()};groups=collections.defaultdict(list);scanned_candidates=0
for rec in all_files:
 p=Path(rec['path']);suffix=p.suffix.lower()
 if rec['bytes']not in sizes:continue
 if suffix not in ['.png','.zip','.z01','.z02']:continue
 # New generated images must never be inferred frozen from name or bytes.
 if p.parent==W/'generated_images' and str(p)not in {x for row in seed_by_sha.values()for x in row['seedPaths']}:continue
 scanned_candidates+=1;digest=hashed(p)
 if digest not in seed_by_sha:continue
 seed_row=seed_by_sha[digest]
 if suffix=='.png'and not any('png'in k for k in seed_row['kinds']):continue
 if suffix!='.png'and 'historical-archive'not in seed_row['kinds']:continue
 rec={**rec,'sha256':digest,'allKnownWorkspacePathsForInode':sorted(inode_paths[(rec['device'],rec['inode'])])};groups[digest].append(rec)
proposed=[];skipped=[];estimated=0;replacement_count=0
for digest,rows in sorted(groups.items()):
 # Separate by device, permissions and owner; byte-identical files with different
 # inode metadata must not be silently joined, since hardlinks share those values.
 strata=collections.defaultdict(list)
 for r in rows:strata[(r['device'],r['permissionsOctal'],r['uid'],r['gid'])].append(r)
 for stratum,part in strata.items():
  inodes=collections.defaultdict(list)
  for r in part:inodes[r['inode']].append(r)
  if len(inodes)<2:continue
  # Prefer an original immutable native path or pinned historical archive.
  keeper_rows=sorted(part,key=lambda r:(r['path']not in seed_by_sha[digest]['seedPaths'],not r['path'].startswith('/workspace/generated_images/'),-r['nlink'],r['path']))
  keeper=keeper_rows[0];operations=[];reclaim=0;skips=[]
  for inode,members in sorted(inodes.items()):
   if inode==keeper['inode']:continue
   known=inode_paths[(members[0]['device'],inode)];selected=[r['path']for r in members]
   all_links_found=len(known)==members[0]['nlink']
   all_links_selected=set(known)==set(selected)
   if not(all_links_found and all_links_selected):
    skips.append({'inode':inode,'nlink':members[0]['nlink'],'knownLinkCount':len(known),'selectedLinkCount':len(selected),'reason':'Cannot prove all hardlinks are inside selected immutable candidate paths; no reclamation claimed.'});continue
   reclaim+=members[0]['allocatedBytes']
   operations.extend({'keeper':keeper['path'],'target':r['path'],'sha256':digest,'bytes':r['bytes'],'before':r,'keeperBefore':keeper,'operation':'atomic-byte-preserving-hardlink-replacement','pathsRemoved':0,'imagePixelsEdited':False}for r in members)
  if reclaim and operations:
   proposed.append({'sha256':digest,'bytes':seed_by_sha[digest]['bytes'],'immutableKinds':seed_by_sha[digest]['kinds'],'keeper':keeper,'selectedPathCount':len(part),'distinctInodesBefore':len(inodes),'allocatedBytesReclaimableAfterAllSelectedLinksReplaced':reclaim,'operations':operations,'skippedInodes':skips});estimated+=reclaim;replacement_count+=len(operations)
  if skips:skipped.append({'sha256':digest,'skipped':skips})
out={'schema':'cqc.pass8.storage-hardlink-review-plan/1','status':'read-only-plan-ready-for-root-review','createdAtUnix':time.time(),'sourceRoot':'/workspace','mutationPerformed':False,'candidateDeletionPerformed':False,'candidateReplacementPerformed':False,'planScript':{'path':str(Path(__file__)),'sha256':sha(Path(__file__))},'baselineFacts':{'path':str(facts_path),'sha256':sha(facts_path)},'frozenNativeInventory':native_pin,'rules':{'nativeAllowListCount':536,'historicalArchiveSidecarPins':46,'closedPass7QAPngSeeds':closed_seeds,'activePass8OutputsExcluded':True,'mutableRuntimeCodeAndConfigForbidden':True,'onlyArchivesAndPngOperationsAllowed':True,'symlinksExcluded':True,'excludedDirectoryNames':sorted(DENY),'fullSha256ReadPerDistinctStableInode':True,'sameByteSizeDevicePermissionsOwnerRequired':True,'reclamationClaimedOnlyIfAllLinksFoundAndSelected':True,'originalNativePixelsNeverEdited':True,'noHistoricalPathsDeleted':True,'noSourceFilesMutated':True},'scan':{'regularFileCount':len(all_files),'immutableCandidateCount':scanned_candidates,'distinctContentSeedCount':len(seed_by_sha),'fullHashReadInodes':len(hash_cache),'elapsedSeconds':round(time.time()-started,2)},'frozenPinVerification':{'assertions':len(pin_checks),'failures':sum(not x['passed']for x in pin_checks),'checks':pin_checks},'space':{'freeBytesAtPlan':shutil.disk_usage(W).free,'estimatedAllocatedBytesReclaimable':estimated,'estimatedReclaimMiB':round(estimated/1024**2,2),'plannedHardlinkReplacements':replacement_count,'contentGroupsWithReclaimableCopies':len(proposed)},'groups':proposed,'skipped':skipped,'rootExecutionRequirements':['Re-read plan SHA and every source/target hash/stat immediately before action; reject any drift, permission/device difference or excluded active source.','Keep original source path; create temporary hardlink in target parent and replace target atomically, preserving every original pathname and exact bytes.','Full SHA256 post-verification of every selected path, archive/native pins, and source-code/Git status guards owned by root.','Allocated blocks estimates may differ from actual free-space change on overlay filesystems; measure before/after.','Do not execute this plan automatically; independent root review required.']}
(P/'HARDLINK_REVIEW_PLAN.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
(P/'SCAN_FILE_STATS.json').write_text(json.dumps({'files':all_files,'excludedActivePass8AndPrivateDirectories':True},indent=2)+'\n')
print(json.dumps({'status':out['status'],'scan':out['scan'],'pins':out['frozenPinVerification']['assertions'],'pinFailures':out['frozenPinVerification']['failures'],'space':out['space'],'planSha256':sha(P/'HARDLINK_REVIEW_PLAN.json')},indent=2))
