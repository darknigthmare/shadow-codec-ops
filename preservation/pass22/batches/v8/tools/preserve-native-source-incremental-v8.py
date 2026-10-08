"""Future SourceV8 exact-byte capture. No operation without final Root GO/pins.

This proposal is not executed by its author before Root review. --check-guards
only validates a completed, nominative configuration. --freeze additionally
requires absent snapshot and complete budget. No archives/network/runtime writes.
"""
from pathlib import Path
import argparse,datetime,hashlib,importlib.util,json,os,re,shutil,stat,zlib

PREP=Path('/tmp/cqc-pass22-source-preservation-v8-readonly')
OWNER=Path('/tmp/cqc-pass22-source-preservation-v8')
META=OWNER/'metadata';PNG_CAS=OWNER/'native-png-cas';TEXT_CAS=OWNER/'text-cas'
COPY_CAS=Path('/workspace/cqc-source-v8-text-cas')
LARGE_COPY_CAS=OWNER/'large-copy-cas';LARGE_COPY_THRESHOLD=8*1024*1024
PRIOR=Path('/tmp/cqc-pass21-source-preservation-v7/metadata/SOURCE_SNAPSHOT_ACTUAL_V1.json')
PARENT='909bf4d7987354671fdbb01bbf17046fa902bcac'
TREE='e3b94cad1ecce4e9b623b6a1d8cc5279e1d9cede'
PREFIX='preservation/pass22/batches/v8/'
INDEXES=[Path('/tmp/cqc-pass21-source-archive-relocation/batch2/lossless-v2/LOSSLESS_SOURCE_INDEX_ACTUAL_V1.json')]+[Path(f'/tmp/cqc-pass21-source-preservation-v{n}/lossless-delta-v1/LOSSLESS_INCREMENTAL_SOURCE_INDEX_ACTUAL_V1.json') for n in range(3,8)]
EXCLUDED={'.git','.aws','.codex','.agents','.vercel','node_modules','__pycache__','dist','profile','profiles','cas','native-png-cas','text-cas','native-source-cas','sealed-proof-cas','relocated-immutable-cas','generated-archives-lossless','application','blob-proofs'}
TEXT={'.json','.jsonl','.py','.js','.mjs','.html','.md','.txt','.patch','.log'}
TOOL=re.compile(r'/workspace/generated_images/exec-[0-9a-f-]{36}\.png')
SHA=lambda b:hashlib.sha256(b).hexdigest()
GIT=lambda b:hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()
NOW=lambda:datetime.datetime.now(datetime.timezone.utc).isoformat()
spec=importlib.util.spec_from_file_location('logguard',PREP/'sealed-log-exceptions-readonly-v1.py')
logguard=importlib.util.module_from_spec(spec);spec.loader.exec_module(logguard)

def stable(path):
 started=NOW();path=Path(path);b=path.lstat();resolved=path.resolve(strict=True);rb=resolved.stat()
 assert stat.S_ISREG(resolved.stat().st_mode)
 assert not any(x.lower() in {'.git','.aws','.codex','.agents','.vercel','profiles','profile'} for x in resolved.parts)
 raw=path.read_bytes();a=path.lstat()
 assert (b.st_dev,b.st_ino,b.st_size,b.st_mode,b.st_mtime_ns)==(a.st_dev,a.st_ino,a.st_size,a.st_mode,a.st_mtime_ns)
 r=resolved.stat();assert len(raw)==r.st_size and (rb.st_dev,rb.st_ino,rb.st_mode,rb.st_size,rb.st_mtime_ns)==(r.st_dev,r.st_ino,r.st_mode,r.st_size,r.st_mtime_ns)
 if path.suffix.lower() in TEXT:assert not any(x.search(raw) for x in logguard.SECRET_PATTERNS),'Credential pattern excluded; no content emitted'
 return raw,{'readStartedAt':started,'readFinishedAt':NOW(),'device':r.st_dev,'inode':r.st_ino,'mode':stat.S_IMODE(r.st_mode),'size':r.st_size,'mtimeNS':r.st_mtime_ns,'declaredOriginalAlias':path.is_symlink(),'resolvedRegularSource':str(resolved),'stableReadAttempts':1}

def save(path,doc):
 assert not path.exists() and not path.is_symlink()
 path.parent.mkdir(parents=True,exist_ok=True)
 raw=(json.dumps(doc,indent=2,ensure_ascii=False)+'\n').encode()
 with path.open('xb') as f:f.write(raw)
 return {'path':str(path),'bytes':len(raw),'sha256':SHA(raw),'gitBlobSHA1':GIT(raw)}

def historical():
 where={};archives=[];indexpins=[]
 for n,path in enumerate(INDEXES,2):
  raw,_=stable(path);d=json.loads(raw);indexpins.append({'path':str(path),'sha256':SHA(raw)})
  for a in d['archives' if n==2 else 'deltaArchives']:
   repository=a.get('repositoryPath','preservation/pass21/batches/v2/lossless-v2/'+a['file'])
   archives.append({**{k:a[k] for k in ['file','bytes','sha256','gitBlobSHA1']},'repositoryPath':repository,'localArchivePath':str(path.parent/a['file'])})
   if n<4:
    for o in a['objects']:
     point={'tier':f'prior-batch{n}','repositoryArchivePath':repository,'archiveFile':a['file'],'archiveSHA256':a['sha256'],'archiveGitBlobSHA1':a['gitBlobSHA1'],**{k:o[k] for k in ['entry','sha256','gitBlobSHA1','bytes']}}
     if o['sha256'] in where:assert where[o['sha256']]['bytes']==o['bytes']
     else:where[o['sha256']]=point
  if n>=4:
   assert not set(where)&set(d['newObjectLocations']);where.update(d['newObjectLocations'])
 assert len(where)==6438 and len(archives)==111
 assert len(where['532c4e4436616d1627b99ac29117717636143efe4bf7e0fa2c0e3cab1dbebf97']['segments'])==9
 return where,archives,indexpins

def validate(config_path,go_path,go_sha):
 c_raw,_=stable(config_path);config=json.loads(c_raw)
 g_raw,_=stable(go_path);go=json.loads(g_raw)
 assert SHA(g_raw)==go_sha and go.get('status')=='approved'
 assert go['sourceParent']==config['sourceParent']==PARENT
 assert go['executionConfigurationSHA256']==SHA(c_raw)
 assert go['capturePackRegularRestoreAndNonforceSourcePublicationAuthorized'] is True
 assert config['privateByteCopyCASRoot']==go['privateByteCopyCASRootApprovedForThisCapture']==str(COPY_CAS)
 assert config['privateLargeByteCopyCASRoot']==go['privateLargeByteCopyCASRootApprovedForThisCapture']==str(LARGE_COPY_CAS)
 assert config['largeByteCopyThreshold']==go['largeByteCopyThresholdApprovedForThisCapture']==LARGE_COPY_THRESHOLD
 assert config['sevenApprovedMetadataCASRoot']==str(TEXT_CAS) and config['fortyApprovedPNGCASRoot']==str(PNG_CAS)
 assert config['priorTree']==TREE and config['oldGitRegularPaths']==3522
 assert config['oldNamedPaths']==7386 and config['oldArchiveCount']==111
 assert config['protectedRefs']['source']==PARENT
 assert config['protectedRefs']['release']=='ea63848c77eedb366273ccefcdff001c67f9fd09'
 assert config['protectedRefs']['minimal']=='103a7ba6fd14634be1d8c14b4bdc7d4a2c513cf1'
 for p in config['requiredClosedProofPins']+config['requiredSourcePins']:
  raw,_=stable(p['path']);assert len(raw)==p['bytes'] and SHA(raw)==p['sha256']
 assert config['closedProducerAndQAProfilesConfirmed'] is True
 assert config['activeHEADAlignmentPassed'] is True
 assert config['runtimeSource92PinsAndSixCurrentDocsVerified'] is True
 lograw,_=stable(config['logManifestPin']['path']);assert SHA(lograw)==config['logManifestPin']['sha256']
 logs=logguard.validate_manifest(json.loads(lograw),go['explicitSealPins'],go['explicitSealedLogPins'])
 # Hardlink whitelists are storage authorizations only, never generalized.
 for pin in config['approvedMetadataHardlinks']:
  raw,s=stable(pin['path']);assert not Path(pin['path']).is_symlink()
  assert len(raw)==pin['bytes'] and SHA(raw)==pin['sha256']
  assert s['mode']==pin['mode']==0o400 and all(s[k]==pin[k] for k in ['device','inode','mtimeNS'])
 assert len(config['approvedMetadataHardlinks'])==7
 for pin in config['approvedExistingPNGCASEntries']:
  raw,s=stable(pin['casPath']);assert not Path(pin['casPath']).is_symlink()
  assert len(raw)==pin['bytes'] and SHA(raw)==pin['sha256'] and GIT(raw)==pin['gitBlobSHA1']
  assert s['device']==TEXT_CAS.parent.stat().st_dev
 return config,go,logs,{'path':str(go_path),'bytes':len(g_raw),'sha256':go_sha}

def collect(config,logs):
 raw,_=stable(PRIOR);old=json.loads(raw);assert len(old['rows'])==7386
 candidates={Path(p['localPath']) for p in old['rows'] if Path(p['localPath']).is_file() and (p['localPath'] in logs or not logguard.generic_blocked(p['localPath']))}
 for root in config['boundedSourceRoots']:
  directory=Path(root);assert directory.is_dir()
  assert str(directory) not in ['/tmp','/workspace','/workspace/generated_images']
  for base,dirs,names in os.walk(directory,followlinks=False):
   dirs[:]=[n for n in dirs if n not in EXCLUDED and not n.startswith('application-') and not any(x in n.lower() for x in ['chrome-profile','chromium-profile','profile-','cache-','owned-chrome-'])]
   for name in names:
    path=Path(base)/name
    if not path.is_file() or (str(path) not in logs and logguard.generic_blocked(path)):continue
    if path.suffix.lower() not in TEXT|{'.png'}:continue
    candidates.add(path)
 candidates.update(Path(p) for p in config['singleExactInputs'])
 candidates.update(Path(p['path']) for p in config['requiredSourcePins'])
 candidates.update(Path(p) for p in logs)
 images=set()
 for path in tuple(candidates):
  if path.suffix.lower() in TEXT:
   raw,_=stable(path);images.update(TOOL.findall(raw.decode('utf8',errors='replace')))
 assert all(Path(p).is_file() for p in images);candidates.update(Path(p) for p in images)
 return old,candidates,images

def execute(config,go,logs,go_pin,freeze):
 started=NOW();old,candidates,images=collect(config,logs);where,archives,indexpins=historical()
 metadata={p['path']:p for p in config['approvedMetadataHardlinks']}
 metadataBySHA={p['sha256']:p for p in metadata.values()};assert len(metadataBySHA)==7
 existingPNG={p['sha256']:p for p in config['approvedExistingPNGCASEntries']}
 previous={r['localPath']:r for r in old['rows']};rows=[];new={};statuses=[]
 for n,path in enumerate(sorted(candidates),1):
  raw,read=stable(path);sha=SHA(raw);oid=GIT(raw)
  row={'localPath':str(path),'sha256':sha,'gitBlobSHA1':oid,'bytes':len(raw),'versionScope':'current-stable-read','sourceRead':read}
  if str(path) in previous:row.update(priorVersionSHA256=previous[str(path)]['sha256'],sameAsPriorVersion=sha==previous[str(path)]['sha256'])
  if sha in where:
   assert where[sha]['bytes']==len(raw) and where[sha]['gitBlobSHA1']==oid;row['storage']=where[sha]
  else:
   target=Path(existingPNG[sha]['casPath']) if sha in existingPNG else (TEXT_CAS if sha in metadataBySHA else LARGE_COPY_CAS if len(raw)>=LARGE_COPY_THRESHOLD else COPY_CAS)/sha
   row['storage']={'tier':'new-cas','sha256':sha,'gitBlobSHA1':oid,'bytes':len(raw),'snapshotPath':str(target)}
   new.setdefault(sha,row)
  if path.suffix.lower()=='.json':
   try:value=json.loads(raw)
   except (ValueError,UnicodeDecodeError):value=None
   if isinstance(value,dict) and isinstance(value.get('status'),str):row['literalTopLevelStatus']=value['status'];statuses.append({k:row[k] for k in ['localPath','sha256','versionScope','literalTopLevelStatus']})
  rows.append(row)
  if n%800==0:print(json.dumps({'stage':'stable-inventory','read':n,'total':len(candidates),'newUnique':len(new)}),flush=True)
 compressed=0;copies=0;largeCopies=0
 for sha,row in new.items():
  raw,_=stable(row['localPath']);assert SHA(raw)==sha
  compressed+=len(zlib.compress(raw,6))+2048
  if sha not in existingPNG and sha not in metadataBySHA:
   copies+=len(raw)
   if len(raw)>=LARGE_COPY_THRESHOLD:largeCopies+=len(raw)
 allowance=32*1024*1024;metadataAllowance=40*1024*1024;reserve=32*1024*1024
 bound=largeCopies+compressed+allowance+metadataAllowance+reserve
 workspaceReserve=32*1024*1024;workspaceGitAllowance=8*1024*1024;workspaceBound=(copies-largeCopies)+workspaceReserve+workspaceGitAllowance
 budget={'newUniqueBlobs':len(new),'newUniqueBytes':sum(x['bytes'] for x in new.values()),'privateWorkspaceByteCopyCASBytes':copies-largeCopies,'privateLargeTMPByteCopyCASBytes':largeCopies,'largeByteCopyThreshold':LARGE_COPY_THRESHOLD,'privateLargeTMPByteCopyCASRoot':str(LARGE_COPY_CAS),'tmpMetadataCASByteCopyBytes':0,'privateWorkspaceByteCopyCASRoot':str(COPY_CAS),'sevenExactMetadataHardlinkCASRoot':str(TEXT_CAS),'fortyApprovedPNGCASEntriesStayTMP':True,'workspaceReserve':workspaceReserve,'workspaceGitAllowance':workspaceGitAllowance,'conservativeWorkspaceRequirement':workspaceBound,'measuredDeflateBytesWithConservativeOverhead':compressed,'tmpScratchAllowance':allowance,'scopedSHMWholeBytes':171494132,'minimumReserve':reserve,'fullMetadataAllowance':metadataAllowance,'conservativeTmpRequirement':bound,'tmpFree':shutil.disk_usage('/tmp').free,'workspaceFree':shutil.disk_usage('/workspace').free,'archiveHardCapBytes':22000000}
 assert budget['tmpFree']>bound,'Preserve originals; refresh storage plan, no unsafe cleanup'
 assert budget['workspaceFree']>workspaceBound,'Workspace exact-byte copy budget insufficient; no unsafe cleanup'
 if not freeze:
  print(json.dumps({'status':'guards-and-readonly-full-inventory-budget-passed','budget':budget,'currentCandidatePaths':len(candidates)}));return
 assert not (META/'SOURCE_SNAPSHOT_ACTUAL_V1.json').exists(),'Never refreeze an existing snapshot'
 TEXT_CAS.mkdir(parents=True,exist_ok=True);META.mkdir(parents=True,exist_ok=True);COPY_CAS.mkdir(parents=True,exist_ok=True);LARGE_COPY_CAS.mkdir(parents=True,exist_ok=True)
 copied=linked=reused=0
 for sha,row in new.items():
  source=Path(metadataBySHA[sha]['path']) if sha in metadataBySHA else Path(row['localPath']);target=Path(row['storage']['snapshotPath']);raw,s=stable(source)
  assert SHA(raw)==sha and GIT(raw)==row['gitBlobSHA1'] and len(raw)==row['bytes']
  if target.exists():
   assert not target.is_symlink() and target.is_file() and SHA(target.read_bytes())==sha;reused+=1;continue
  if sha in metadataBySHA:
   pin=metadataBySHA[sha];assert str(source)==pin['path'] and target.parent==TEXT_CAS;assert source.lstat().st_nlink>=1 and not source.is_symlink()
   assert s['mode']==pin['mode']==0o400 and all(s[k]==pin[k] for k in ['device','inode','mtimeNS']) and SHA(raw)==pin['sha256']
   assert s['device']==target.parent.stat().st_dev
   before=source.stat();os.link(source,target);after=source.stat();dest=target.stat()
   assert (before.st_dev,before.st_ino,before.st_mode,before.st_size,before.st_mtime_ns)==(after.st_dev,after.st_ino,after.st_mode,after.st_size,after.st_mtime_ns)
   assert after.st_nlink==before.st_nlink+1 and dest.st_ino==after.st_ino;linked+=1
  else:
   assert target.parent==(LARGE_COPY_CAS if len(raw)>=LARGE_COPY_THRESHOLD else COPY_CAS),'Only whitelisted metadata may share source inodes; all other new CAS use deterministic private byte copies'
   with target.open('xb') as h:h.write(raw)
   copied+=len(raw)
  # No chmod anywhere: exact whitelisted inode modes preserved; private copies regular.
  assert not target.is_symlink() and target.is_file() and SHA(target.read_bytes())==sha
 current={r['localPath'] for r in rows};retained=0
 for oldrow in old['rows']:
  if oldrow['localPath'] in current:continue
  row={k:oldrow[k] for k in ['localPath','sha256','gitBlobSHA1','bytes']};row.update(versionScope='prior-only-preserved-not-attested-current',storage=where[oldrow['sha256']])
  if 'literalTopLevelStatus' in oldrow:row['literalTopLevelStatus']=oldrow['literalTopLevelStatus']
  rows.append(row);retained+=1
 rows.sort(key=lambda r:r['localPath']);assert len(rows)==len({r['localPath'] for r in rows}) and set(previous).issubset({r['localPath'] for r in rows})
 snapshot={'schema':'cqc.pass22.incremental-native-source-exact-snapshot/2','status':'exact-byte-incremental-snapshot-frozen','parent':PARENT,'priorTree':TREE,'priorRegularGitPaths':3522,'pathPrefix':PREFIX,'roots':old['roots'],'incrementalBoundedSourceRoots':config['boundedSourceRoots'],'snapshotReadStartedAt':started,'snapshotReadFinishedAt':NOW(),
  'priorSnapshot':{'path':str(PRIOR),'sha256':SHA(PRIOR.read_bytes()),'originalPathCount':7386,'archiveCount':111},'priorIndexPins':indexpins,'priorArchives':archives,'rows':rows,'uniqueBlobs':list({r['sha256']:r['storage'] for r in rows}.values()),'sourceQualityQualifications':statuses,'exactDeclaredToolImages':sorted(images),'currentReadPathCount':len(candidates),'priorOnlyRetainedPathCount':retained,'newCASUniqueBlobCount':len(new),'newCASBytes':sum(r['bytes'] for r in new.values()),'newCASCopiedBytes':copied,'newCASMetadataHardlinks':linked,'newCASApprovedExistingPNGReused':reused,'storageBudgetAtInventory':budget,'privateWorkspaceByteCopyCASRoot':str(COPY_CAS),'privateLargeTMPByteCopyCASRoot':str(LARGE_COPY_CAS),'largeByteCopyThreshold':LARGE_COPY_THRESHOLD,'sevenExactMetadataCASRoot':str(TEXT_CAS),'fortyApprovedPNGCASEntriesRemainTMP':True,'finalRootGO':go_pin,'applicationCommitReportedByRoot':config['protectedRefs']['release'],'applicationCommitIsSeparateFromSourceBranchParent':True,'all6438HistoricalWholeSourceObjectsAvailableForReuse':True,'V4WholeSourceLocations1200AndLeoneNineSegmentsReused':True,'twoHistoricalObjectsAbsentFromPriorCurrentMapRemainInPriorArchives':True,'oldArchivesNotRepacked':True,'noProducerByteOrMtimeMutations':True,'noSourceEvictions':True,'statusesNotReclassified':True,'snapshotIsReadIntervalNotAtomicGlobalPause':True,'coversVersionsReadAtSnapshotOnly':True,'doesNotCertifyArtworkCompletion':True}
 pin=save(META/'SOURCE_SNAPSHOT_ACTUAL_V1.json',snapshot)
 print(json.dumps({'stage':'source-frozen','paths':len(rows),'currentPaths':len(candidates),'newUnique':len(new),'copiedBytes':copied,'metadataLinks':linked,'approvedExistingPNGReused':reused,'pin':pin,'budget':budget}),flush=True)

if __name__=='__main__':
 a=argparse.ArgumentParser(description=__doc__);a.add_argument('--configuration',required=True);a.add_argument('--root-go',required=True);a.add_argument('--root-go-sha256',required=True);a.add_argument('--check-guards',action='store_true');a.add_argument('--freeze',action='store_true');a.add_argument('--budget',action='store_true');args=a.parse_args()
 assert args.check_guards or args.freeze or args.budget
 c,g,logs,gpin=validate(Path(args.configuration),Path(args.root_go),args.root_go_sha256)
 if args.freeze or args.budget:execute(c,g,logs,gpin,args.freeze)
 else:print(json.dumps({'status':'final-root-go-and-exact-pins-guards-passed-no-cut','sealedLogs':len(logs)}))
