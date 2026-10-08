"""Freeze a bounded incremental snapshot; never modify producer or old archives."""
from pathlib import Path
import argparse, hashlib, importlib.util, json, os, re, shutil, sys, time, datetime
sys.dont_write_bytecode=True
ROOT=Path(__file__).parent
CAS=ROOT/'cas'
OLD=Path('/tmp/cqc-pass21-source-archive-relocation/batch2/lossless-v2')
OLD_SNAPSHOT=Path('/workspace/cqc-pass21/batches/v2/preservation/SOURCE_SNAPSHOT_ACTUAL_V1.json')
PARENT='3136014fc5933c228de13234dbd1b2002c3b0c42'
PRIOR_TREE='5f9c33cfaffc51369d9e581f769ea803332ab148'
PREFIX='preservation/pass21/batches/v3/'
ROOT_NAMES=['cqc-pass21','cqc-pass21-preview','cqc-pass21-policy','cqc-pass21-retro','cqc-pass21-retro-b','cqc-pass21-retro-c','cqc-pass21-tuxedo','cqc-pass21-tuxedo-b','cqc-pass21-tuxedo-c','cqc-pass21-nextgen','cqc-pass21-cyborg']
EXCLUDED={'.git','.vercel','.aws','.codex','.agents','node_modules','__pycache__','dist','profile','profiles','native-source-cas','relocated-immutable-cas','generated-archives-lossless','application','publication','blob-proofs','packed-v2-blob-proofs','packed-v3-blob-proofs'}
SECRET=[re.compile(rb'-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----'),re.compile(rb'github_pat_[A-Za-z0-9_]{50,}'),re.compile(rb'gh[pousr]_[A-Za-z0-9_]{36,}'),re.compile(rb'AKIA[0-9A-Z]{16}')]
TOOL_IMAGE=re.compile(r'/workspace/generated_images/exec-[0-9a-f-]{36}\.png')
SHA=lambda b:hashlib.sha256(b).hexdigest()
GIT=lambda b:hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()
now=lambda:datetime.datetime.now(datetime.timezone.utc).isoformat()
TEXT={'.json','.jsonl','.mjs','.js','.py','.txt','.md','.log','.html','.patch'}
def save(path,obj):
 raw=(json.dumps(obj,ensure_ascii=False,indent=2)+'\n').encode();path=Path(path);path.parent.mkdir(parents=True,exist_ok=True)
 if path.exists():assert path.read_bytes()==raw,'Immutable task output differs: '+str(path)
 else:path.write_bytes(raw);path.chmod(0o400)
 return SHA(raw)
def blocked(path):
 low=path.name.lower()
 return low.startswith(('.env','auth','credentials')) or path.suffix.lower() in {'.sqlite','.db','.cookie','.zip','.raw-zip-segment','.tsbuildinfo'} or path.suffix=='.log' and ('actual' not in low or any(x in low for x in ['chrome','browser','server']))
def read_stable(path):
 for attempt in range(4):
  start=now();before=path.stat();raw=path.read_bytes();after=path.stat()
  key=lambda s:(s.st_dev,s.st_ino,s.st_size,s.st_mtime_ns)
  if key(before)==key(after) and len(raw)==after.st_size:return raw,{'readStartedAt':start,'readFinishedAt':now(),'device':after.st_dev,'inode':after.st_ino,'size':after.st_size,'mtimeNS':after.st_mtime_ns,'stableReadAttempts':attempt+1}
  time.sleep(.1)
 raise RuntimeError('Producer file changed throughout bounded read: '+str(path))
def freeze():
 assert not (ROOT/'SOURCE_SNAPSHOT_ACTUAL_V1.json').exists()
 started=now();oldBytes=OLD_SNAPSHOT.read_bytes();oldSnapshot=json.loads(oldBytes);oldIndexBytes=(OLD/'LOSSLESS_SOURCE_INDEX_ACTUAL_V1.json').read_bytes();oldIndex=json.loads(oldIndexBytes)
 assert SHA(oldBytes)==oldIndex['sourceSnapshotSHA256'] and len(oldSnapshot['rows'])==4072 and len(oldSnapshot['uniqueBlobs'])==3846 and len(oldIndex['archives'])==58
 oldWhere={}
 for archive in oldIndex['archives']:
  for obj in archive['objects']:
   assert obj['sha256'] not in oldWhere
   oldWhere[obj['sha256']]={'tier':'prior-batch2','repositoryArchivePath':'preservation/pass21/batches/v2/lossless-v2/'+archive['file'],'archiveFile':archive['file'],'archiveSHA256':archive['sha256'],'archiveGitBlobSHA1':archive['gitBlobSHA1'],'entry':obj['entry'],'sha256':obj['sha256'],'gitBlobSHA1':obj['gitBlobSHA1'],'bytes':obj['bytes']}
 assert len(oldWhere)==3846
 previousByPath={r['localPath']:r for r in oldSnapshot['rows']};assert len(previousByPath)==4072
 candidates=set();excluded=[]
 for name in ROOT_NAMES:
  directory=Path('/workspace')/name
  if not directory.is_dir():continue
  for base,dirs,names in os.walk(directory,followlinks=False):
   dirs[:]=[n for n in dirs if n not in EXCLUDED and not n.startswith('application-') and not any(s in n.lower() for s in ['chrome-profile','chromium-profile','profile-','cache-','owned-','root-owned']) and not (Path(base)/n).is_relative_to(ROOT)]
   for name in sorted(names):
    path=Path(base)/name
    if blocked(path):excluded.append({'path':str(path),'reason':'credentials-profile-cache-or-historic-archive-excluded'});continue
    if not path.is_file():continue
    resolved=path.resolve()
    if any(part in {'.aws','.codex','.agents','.git','.vercel','profiles','profile'} for part in resolved.parts):excluded.append({'path':str(path),'reason':'resolved-sensitive-operational-path-excluded'});continue
    candidates.add(path)
 # Discover exact producer-declared tool originals without scanning all image outputs.
 images=set()
 for path in sorted(candidates):
  if path.suffix.lower() in TEXT:
   raw,_=read_stable(path);images.update(Path(x) for x in TOOL_IMAGE.findall(raw.decode('utf-8',errors='replace')))
 candidates.update(p for p in images if p.is_file())
 nativeInodes={(p.stat().st_dev,p.stat().st_ino) for p in images if p.is_file()}
 CAS.mkdir(exist_ok=True)
 rows=[];unique={};quality=[];copyBytes=0;hardlinks=0;oldReuse=0
 for i,path in enumerate(sorted(candidates),1):
  raw,stat=read_stable(path);assert len(raw)<100*1024*1024,'Unsupported source blob size'
  if path.suffix.lower() in TEXT:assert not any(pattern.search(raw) for pattern in SECRET),'Credential pattern found; no content emitted.'
  sha=SHA(raw);oid=GIT(raw);storage=oldWhere.get(sha)
  if storage:
   assert storage['bytes']==len(raw) and storage['gitBlobSHA1']==oid;oldReuse+=1;cas=None
  else:
   cas=CAS/sha
   if cas.exists():assert cas.is_file() and not cas.is_symlink() and cas.read_bytes()==raw
   elif path.suffix.lower()=='.png' and (stat['device'],stat['inode']) in nativeInodes:
    try:os.link(path.resolve(),cas);hardlinks+=1
    except OSError:
     assert shutil.disk_usage(ROOT).free>len(raw)+64*1024*1024;cas.write_bytes(raw);cas.chmod(0o400);copyBytes+=len(raw)
   else:
    assert shutil.disk_usage(ROOT).free>len(raw)+64*1024*1024;cas.write_bytes(raw);cas.chmod(0o400);copyBytes+=len(raw)
   assert cas.is_file() and not cas.is_symlink() and SHA(cas.read_bytes())==sha
   storage={'tier':'new-cas','sha256':sha,'gitBlobSHA1':oid,'bytes':len(raw),'snapshotPath':str(cas)}
  previous=previousByPath.get(str(path));row={'localPath':str(path),'sha256':sha,'gitBlobSHA1':oid,'bytes':len(raw),'versionScope':'current-stable-read','sourceRead':stat,'storage':storage}
  if previous:row['priorVersionSHA256']=previous['sha256'];row['sameAsPriorVersion']=sha==previous['sha256']
  if path.suffix.lower()=='.json':
   try:value=json.loads(raw)
   except (ValueError,UnicodeDecodeError):value=None
   if isinstance(value,dict) and isinstance(value.get('status'),str):
    q={'localPath':str(path),'sha256':sha,'literalTopLevelStatus':value['status'],'notReclassified':True,'versionScope':'current-stable-read'};quality.append(q);row['literalTopLevelStatus']=value['status']
  rows.append(row);unique[sha]=storage
  if i%500==0:print(json.dumps({'stage':'incremental-freeze-reading','pathsRead':i,'candidatePaths':len(candidates),'newUniqueBlobs':sum(s['tier']=='new-cas' for s in unique.values()),'copiedBytes':copyBytes}),flush=True)
 currentPaths={r['localPath'] for r in rows};priorOnly=0
 priorStatuses={r['path']:r for r in oldSnapshot.get('sourceQualityQualifications',[])}
 for oldRow in oldSnapshot['rows']:
  if oldRow['localPath'] in currentPaths:continue
  storage=oldWhere[oldRow['sha256']];row={'localPath':oldRow['localPath'],'sha256':oldRow['sha256'],'gitBlobSHA1':oldRow['gitBlobSHA1'],'bytes':oldRow['bytes'],'versionScope':'prior-only-preserved-not-attested-current','storage':storage}
  status=priorStatuses.get(oldRow['localPath'])
  if status and status['sha256AtScan']==oldRow['sha256']:
   row['literalTopLevelStatus']=status['literalStatusAtScan'];quality.append({'localPath':oldRow['localPath'],'sha256':oldRow['sha256'],'literalTopLevelStatus':status['literalStatusAtScan'],'versionScope':row['versionScope'],'notReclassified':True})
  rows.append(row);unique[oldRow['sha256']]=storage;priorOnly+=1
 rows.sort(key=lambda r:r['localPath']);assert len(rows)==len({r['localPath'] for r in rows}) and all(r['localPath'] in {x['localPath'] for x in rows} for r in oldSnapshot['rows'])
 snapshot={'schema':'cqc.pass21.incremental-native-source-exact-snapshot/1','status':'exact-byte-incremental-snapshot-frozen','parent':PARENT,'priorTree':PRIOR_TREE,'priorRegularGitPaths':3419,'pathPrefix':PREFIX,'roots':ROOT_NAMES,'snapshotReadStartedAt':started,'snapshotReadFinishedAt':now(),'priorSnapshot':{'path':str(OLD_SNAPSHOT),'sha256':SHA(oldBytes),'originalPathCount':4072,'uniqueBlobCount':3846,'indexPath':str(OLD/'LOSSLESS_SOURCE_INDEX_ACTUAL_V1.json'),'indexSHA256':SHA(oldIndexBytes),'archiveCount':58},'rows':rows,'uniqueBlobs':list(unique.values()),'sourceQualityQualifications':quality,'topLevelStatusesAreOverviewOnly':True,'exactDeclaredToolImages':list(map(str,sorted(images))),'excludedFiles':excluded,'currentReadPathCount':len(candidates),'priorOnlyRetainedPathCount':priorOnly,'reusedOldArchiveCurrentPathCount':oldReuse,'newCASUniqueBlobCount':sum(s['tier']=='new-cas' for s in unique.values()),'newCASBytes':sum(s['bytes'] for s in unique.values() if s['tier']=='new-cas'),'newCASCopiedBytes':copyBytes,'newCASNativePGHardlinks':hardlinks,'noProducerByteOrMtimeMutations':True,'noSourceEvictions':True,'oldArchivesNotRepacked':True,'statusesNotReclassified':True,'snapshotIsReadIntervalNotAtomicGlobalPause':True,'coversVersionsReadAtSnapshotOnly':True,'doesNotCertifyArtworkCompletion':True}
 save(ROOT/'SOURCE_SNAPSHOT_ACTUAL_V1.json',snapshot)
 print(json.dumps({'stage':'incremental-native-source-frozen','fullPaths':len(rows),'currentPaths':len(candidates),'priorOnlyPaths':priorOnly,'newUniqueBlobs':snapshot['newCASUniqueBlobCount'],'newUniqueBytes':snapshot['newCASBytes'],'copiedBytes':copyBytes,'nativePGHardlinks':hardlinks,'workspaceFree':shutil.disk_usage(ROOT).free}),flush=True)
if __name__=='__main__':
 p=argparse.ArgumentParser(description=__doc__);p.add_argument('--freeze',action='store_true');args=p.parse_args()
 if args.freeze:freeze()
