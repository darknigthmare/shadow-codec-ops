"""Finite additive backfill. No walk, re-freeze, implicit suffix or source link.

Only the Root-approved 156 pinned regular names are read at this interval.
All 8521 prior names retain their exact archival bytes, not a current attestation.
Read-only --inspect is preparation; execution requires exact config/Root GO.
"""
from pathlib import Path
import argparse,datetime,hashlib,importlib.util,json,os,shutil,stat,sys,zlib
sys.dont_write_bytecode=True
OWNER=Path('/tmp/cqc-pass22-source-preservation-v9');META=OWNER/'metadata'
COPY=Path('/workspace/cqc-source-v9-private-copy-cas');LARGE=OWNER/'large-private-copy-cas';THRESHOLD=3*1024*1024
PRIOR=Path('/tmp/cqc-pass22-source-preservation-v8/metadata/SOURCE_SNAPSHOT_ACTUAL_V1.json')
V8INDEX=Path('/tmp/cqc-pass22-source-preservation-v8/lossless-delta-v1/LOSSLESS_INCREMENTAL_SOURCE_INDEX_ACTUAL_V1.json')
PARENT='19de20433d90e2cba7165a9b9b185521c4e32419';TREE='55edda7cd03d06d3816c5975ac5ee7a5c092414c'
PREFIX='preservation/pass22/batches/v9/'
SHA=lambda b:hashlib.sha256(b).hexdigest();GIT=lambda b:hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()
NOW=lambda:datetime.datetime.now(datetime.timezone.utc).isoformat()
def encode(d):return (json.dumps(d,ensure_ascii=False,separators=(',',':'))+'\n').encode()
def save(path,d):
 raw=encode(d);assert not path.exists() and not path.is_symlink();path.parent.mkdir(parents=True,exist_ok=True)
 with path.open('xb') as f:f.write(raw)
 return {'path':str(path),'bytes':len(raw),'sha256':SHA(raw),'gitBlobSHA1':GIT(raw)}
def stable(path,pin=None):
 path=Path(path);b=path.lstat();assert stat.S_ISREG(b.st_mode) and not path.is_symlink()
 assert not any(x in {'.git','.aws','.codex','.agents','.vercel','__pycache__'} for x in path.parts)
 start=NOW();raw=path.read_bytes();a=path.lstat()
 assert (b.st_dev,b.st_ino,b.st_mode,b.st_size,b.st_mtime_ns,b.st_nlink)==(a.st_dev,a.st_ino,a.st_mode,a.st_size,a.st_mtime_ns,a.st_nlink)
 if pin:assert (len(raw),SHA(raw),GIT(raw))==(pin['bytes'],pin['sha256'],pin['gitBlobSHA1'])
 return raw,{'readStartedAt':start,'readFinishedAt':NOW(),'device':a.st_dev,'inode':a.st_ino,'mode':stat.S_IMODE(a.st_mode),'size':a.st_size,'mtimeNS':a.st_mtime_ns,'nlink':a.st_nlink,'resolvedRegularSource':str(path),'stableReadAttempts':1}
def history():
 raw,_=stable(PRIOR);old=json.loads(raw);assert len(old['rows'])==8521
 assert SHA(raw)=='6bc97d3b3c6ffabd5afea974829e8b55f161f04db854b3b10931c1bd84b30282'
 paths=[Path(p['path']) for p in old['priorIndexPins']]+[V8INDEX];where={};archives=[];pins=[]
 for n,path in enumerate(paths,2):
  b,_=stable(path);d=json.loads(b);expected=old['priorIndexPins'][n-2]['sha256'] if n<8 else '24efe77f8510fdfd42dac9cb89e57a389c390edb1d8f57c391bca59487cad6c2'
  assert SHA(b)==expected;pins.append({'path':str(path),'sha256':SHA(b),'bytes':len(b)})
  for a in d['archives' if n==2 else 'deltaArchives']:
   rep=a.get('repositoryPath','preservation/pass21/batches/v2/lossless-v2/'+a['file'])
   archives.append({**{k:a[k] for k in ['file','bytes','sha256','gitBlobSHA1']},'repositoryPath':rep,'localArchivePath':str(path.parent/a['file'])})
   if n<4:
    for o in a['objects']:
     point={'tier':f'prior-batch{n}','repositoryArchivePath':rep,'archiveFile':a['file'],'archiveSHA256':a['sha256'],'archiveGitBlobSHA1':a['gitBlobSHA1'],**{k:o[k] for k in ['entry','sha256','gitBlobSHA1','bytes']}}
     if o['sha256'] in where:assert where[o['sha256']]['bytes']==o['bytes']
     else:where[o['sha256']]=point
  if n>=4:assert not set(where)&set(d['newObjectLocations']);where.update(d['newObjectLocations'])
 assert len(where)==7317 and len(archives)==124
 assert len(where['532c4e4436616d1627b99ac29117717636143efe4bf7e0fa2c0e3cab1dbebf97']['segments'])==9
 return old,where,archives,pins
def inventory(manifest_path):
 start=NOW();mraw,_=stable(manifest_path);manifest=json.loads(mraw);pins=manifest['pins']
 assert len(pins)==len({p['path'] for p in pins})==156
 assert sum(Path(p['path']).suffix=='.js' for p in pins)==138 and sum(Path(p['path']).suffix=='.jpg' for p in pins)==18
 assert manifest['sourceV8ParentCommitForFutureBackfill']==PARENT and manifest['sourceV8ParentTreeForFutureBackfill']==TREE
 old,where,archives,indexpins=history();previous={r['localPath']:r for r in old['rows']}
 assert not set(previous)&{p['path'] for p in pins};rows=[];new={};compressed=0
 for p in pins:
  raw,read=stable(p['path'],p);sha=SHA(raw);oid=GIT(raw)
  row={'localPath':p['path'],'sha256':sha,'gitBlobSHA1':oid,'bytes':len(raw),'versionScope':'finite-v9-backfill-current-stable-read','sourceRead':read,'literalDeclarationStatus':p['literalTopLevelSourceStatus'],'finiteManifestRole':p['role']}
  if sha in where:assert (where[sha]['bytes'],where[sha]['gitBlobSHA1'])==(len(raw),oid);row['storage']=where[sha]
  else:
   target=(LARGE if len(raw)>=THRESHOLD else COPY)/sha
   row['storage']={'tier':'new-cas','sha256':sha,'gitBlobSHA1':oid,'bytes':len(raw),'snapshotPath':str(target)}
   if sha not in new:new[sha]=row;compressed+=len(zlib.compress(raw,6))+2048
  rows.append(row)
 # Prior detailed read metadata remains losslessly in the pinned V8 snapshot.
 # It is not repeated as a current source read or rewritten in place.
 for r in old['rows']:
  item={k:r[k] for k in ['localPath','sha256','gitBlobSHA1','bytes']};item.update(storage=where[r['sha256']],versionScope='prior-v8-retained-without-current-source-read')
  if 'literalTopLevelStatus' in r:item['literalTopLevelStatus']=r['literalTopLevelStatus']
  rows.append(item)
 rows.sort(key=lambda r:r['localPath']);assert len(rows)==8677 and len({r['localPath'] for r in rows})==8677
 large=sum(r['bytes'] for r in new.values() if r['bytes']>=THRESHOLD);small=sum(r['bytes'] for r in new.values())-large
 # Compact newly generated JSON preserves exact fields/strings; V8 remains intact.
 metaAllowance=26*1024*1024;tmpScratch=16*1024*1024;reserve=32*1024*1024;workspaceGit=8*1024*1024
 budget={'newUniqueBlobs':len(new),'newUniqueBytes':sum(r['bytes'] for r in new.values()),'reusedFiniteNames':sum(r['storage']['tier']!='new-cas' for r in rows if r['versionScope'].startswith('finite-')),'privateWorkspaceByteCopyCASBytes':small,'privateLargeTMPByteCopyCASBytes':large,'measuredDeflateBytesWithConservativeOverhead':compressed+4096,'fullMetadataAllowance':metaAllowance,'tmpScratchAllowance':tmpScratch,'minimumReserve':reserve,'workspaceGitAllowance':workspaceGit,'conservativeTmpRequirement':large+compressed+4096+metaAllowance+tmpScratch+reserve,'conservativeWorkspaceRequirement':small+reserve+workspaceGit,'tmpFree':shutil.disk_usage('/tmp').free,'workspaceFree':shutil.disk_usage('/workspace').free,'scopedSHMWholeBytes':171494132,'scopedSHMThresholdBytes':16*1024*1024,'archiveHardCapBytes':22000000,'metadataEncoding':'compact-JSON-lossless-fields-not-source-rewrite'}
 snapshot={'schema':'cqc.pass22.finite-source-backfill-snapshot/1','status':'exact-byte-finite-additive-backfill-frozen','parent':PARENT,'priorTree':TREE,'priorRegularGitPaths':3547,'pathPrefix':PREFIX,'roots':old['roots'],'incrementalBoundedSourceRoots':old.get('incrementalBoundedSourceRoots',[]),'finiteSourceBackfillManifest':{'path':str(manifest_path),'bytes':len(mraw),'sha256':SHA(mraw),'gitBlobSHA1':GIT(mraw)},'finiteSourceBackfillCount':156,'snapshotReadStartedAt':start,'snapshotReadFinishedAt':NOW(),'priorSnapshot':{'path':str(PRIOR),'sha256':SHA(PRIOR.read_bytes()),'originalPathCount':8521,'archiveCount':124},'priorIndexPins':indexpins,'priorArchives':archives,'rows':rows,'uniqueBlobs':[r['storage'] for r in new.values()],'uniqueBlobsScope':'new-CAS-only; all historical pointers retained in rows and pinned indices','historicalWholeSourceObjectCount':7317,'exactDeclaredToolImages':old['exactDeclaredToolImages'],'currentReadPathCount':156,'priorOnlyRetainedPathCount':8521,'newCASUniqueBlobCount':len(new),'newCASBytes':sum(r['bytes'] for r in new.values()),'storageBudgetAtInventory':budget,'oldArchivesNotRepacked':True,'noProducerByteOrMtimeMutations':True,'noSourceEvictions':True,'statusesNotReclassified':True,'backfillRepairsOmissionsInPublishedV8WithoutRewritingV8':True,'derivedPYCIntentionallyExcluded':manifest['derivedPYCIntentionallyExcluded'],'optionalPass23Excluded':True,'coversVersionsReadAtSnapshotOnly':True,'doesNotCertifyArtworkCompletion':True,'historicalV8DetailedReadMetadataRetainedAtPriorSnapshot':True}
 # Real serialization sizes of prospective snapshot/map plus prior QA provide a conservative bound.
 maprows=[]
 for r in rows:
  x={k:r[k] for k in ['localPath','sha256','gitBlobSHA1','bytes','versionScope']};x['archive']=r['storage']
  for k in ['literalTopLevelStatus','sourceRead','literalDeclarationStatus','finiteManifestRole']:
   if k in r:x[k]=r[k]
  maprows.append(x)
 q=json.loads((PRIOR.parent/'REGULAR_RESTORATION_EVERY_PATH_QA_ACTUAL_V1.json').read_bytes())
 estimated=len(encode(snapshot))+len(encode({'rows':maprows}))+len(encode(q))+1600000+len(mraw)+500000
 budget['estimatedCompactSnapshotMapQAAndBaselineBytes']=estimated
 assert estimated<metaAllowance,'Metadata allowance must cover actual prospective compact structures plus new proofs'
 return snapshot,new,budget,manifest
def configuration(config_path,go_path,go_sha):
 raw,_=stable(config_path);c=json.loads(raw);gb,_=stable(go_path);g=json.loads(gb)
 assert SHA(gb)==go_sha and g['status']=='approved' and g['executionConfigurationSHA256']==SHA(raw)
 assert g['capturePackRegularRestoreAndNonforceSourcePublicationAuthorized'] is True and g['sourceParent']==c['sourceParent']==PARENT
 assert c['priorTree']==TREE and c['oldNamedPaths']==8521 and c['oldArchiveCount']==124 and c['oldGitRegularPaths']==3547
 assert c['finiteSourceManifestPin']['sha256']==SHA(Path(c['finiteSourceManifestPin']['path']).read_bytes())
 assert c['privateByteCopyCASRoot']==g['privateByteCopyCASRootApprovedForThisCapture']==str(COPY)
 assert c['privateLargeByteCopyCASRoot']==g['privateLargeByteCopyCASRootApprovedForThisCapture']==str(LARGE)
 assert c['largeByteCopyThreshold']==g['largeByteCopyThresholdApprovedForThisCapture']==THRESHOLD
 assert c['regularRestorationSHMRoot']==g['regularRestorationSHMRootApprovedForThisCapture']=='/dev/shm/cqc-source-v9-regular-restoration'
 assert c['regularRestorationSHMThresholdBytes']==g['regularRestorationSHMThresholdBytesApprovedForThisCapture']==16*1024*1024
 assert c['optionalPass23Excluded'] is True and c['noBroadRootCapture'] is True
 for pin in c['requiredClosedProofPins']:
  b,_=stable(pin['path']);assert SHA(b)==pin['sha256'] and len(b)==pin['bytes']
 for pin in c['helpersReviewedAndRehashed']:
  b,_=stable(pin['path']);assert SHA(b)==pin['sha256'] and len(b)==pin['bytes']
 spec=importlib.util.spec_from_file_location('finite_transport','/workspace/cqc-pass20/preservation/preservation_common_v1.py');t=importlib.util.module_from_spec(spec);spec.loader.exec_module(t)
 assert t.branch()==PARENT
 for name,expected in [('main',c['protectedRefs']['main']),('reprise/2026-10-02',c['protectedRefs']['release'])]:assert t.api('GET','git/ref/heads/'+name)['object']['sha']==expected
 import subprocess
 tag=c['protectedRefs']['minimalTag'];assert tag.startswith('cqc-runtime-') and '/' not in tag
 response=subprocess.run(['gh','api','repos/'+t.REPOSITORY+'/git/ref/tags/'+tag],capture_output=True,text=True,timeout=45)
 assert response.returncode==0,'Protected tag GET failed; no response or credential emitted'
 tagResult=json.loads(response.stdout);assert tagResult['object']['type']=='commit' and tagResult['object']['sha']==c['protectedRefs']['minimal']
 commit=t.api('GET','git/commits/'+PARENT);assert commit['tree']['sha']==TREE
 baseline=t.api('GET','git/trees/'+TREE+'?recursive=1');assert baseline['sha']==TREE and not baseline.get('truncated')
 files={r['path']:r['sha'] for r in baseline['tree'] if r['type']=='blob'};assert len(files)==3547 and t.tree_sha(files)==TREE and all(r['mode']=='100644' for r in baseline['tree'] if r['type']=='blob')
 return c,g,{'path':str(go_path),'bytes':len(gb),'sha256':go_sha},baseline
def run(args):
 if args.inspect:
  _,_,b,_=inventory(args.manifest);print(json.dumps({'status':'read-only-finite-preflight-not-captured','prospectiveNames':8677,'budget':b}));return
 c,g,gpin,baseline=configuration(args.configuration,args.root_go,args.root_go_sha256)
 if args.check_guards and not(args.budget or args.freeze):
  _,_,_,_=inventory(c['finiteSourceManifestPin']['path']);print(json.dumps({'status':'approved-finite-156-pin-guards-passed-no-cut'}));return
 snap,new,b,m=inventory(c['finiteSourceManifestPin']['path'])
 assert b['tmpFree']>b['conservativeTmpRequirement'],'TMP budget FAIL before CUT; retain sources and prepare revised placement'
 assert b['workspaceFree']>b['conservativeWorkspaceRequirement'],'Workspace budget FAIL before CUT; retain all sources'
 if not args.freeze:print(json.dumps({'status':'guards-and-finite-budget-passed-no-cut','budget':b}));return
 assert not(META/'SOURCE_SNAPSHOT_ACTUAL_V1.json').exists(),'Never refreeze an existing snapshot'
 COPY.mkdir(parents=True,exist_ok=True);LARGE.mkdir(parents=True,exist_ok=True);META.mkdir(parents=True,exist_ok=True)
 save(META/'PRIOR_FULL_REGULAR_TREE_BASELINE_ACTUAL_V1.json',baseline)
 entries=[(Path(args.configuration),'EXECUTION_CONFIGURATION_ACTUAL_V1.json'),(Path(c['finiteSourceManifestPin']['path']),'FINITE_BACKFILL_SOURCE_PIN_MANIFEST_ACTUAL_V1.json')]+[(Path(pin['path']),Path(pin['path']).name) for pin in c['helpersReviewedAndRehashed']]
 for src,name in entries:
  raw,_=stable(src);target=META/name;assert not target.exists()
  with target.open('xb') as f:f.write(raw)
 readme='Finite Source V9 backfill of 138 protected JavaScript names and 18 declared JPG names omitted by the bounded V8 selection. Published V8, all prior source versions and all124 historical ZIPs remain unchanged. The derived .pyc and all pass23 sources are excluded. Preservation does not promote artwork or revise literal failures/holds. New archive cap22,000,000B applies only to new ZIPs. Every named version is restored as a complete regular single-link file and independently read back before scratch removal. Complete files>=16MiB use explicitly scoped SHM; this includes the historical171,494,132B Leone source from nine existing chunks.\n'
 with (META/'README.md').open('xb') as f:f.write(readme.encode())
 for r in new.values():
  raw,read=stable(r['localPath'],r);dst=Path(r['storage']['snapshotPath']);assert not dst.exists() and not dst.is_symlink()
  with dst.open('xb') as f:f.write(raw)
  assert stat.S_ISREG(dst.lstat().st_mode) and dst.stat().st_nlink==1 and SHA(dst.read_bytes())==r['sha256']
 snap['finalRootGO']=gpin;snap['storageBudgetAtInventory']=b;snap['snapshotReadFinishedAt']=NOW()
 save(META/'SOURCE_SNAPSHOT_ACTUAL_V1.json',snap)
 print(json.dumps({'stage':'finite-source-backfill-frozen','paths':len(snap['rows']),'currentReadPaths':156,'newUnique':len(new),'copiedBytes':sum(r['bytes'] for r in new.values()),'budget':b}),flush=True)
if __name__=='__main__':
 p=argparse.ArgumentParser(description=__doc__);p.add_argument('--inspect',action='store_true');p.add_argument('--manifest');p.add_argument('--configuration');p.add_argument('--root-go');p.add_argument('--root-go-sha256');p.add_argument('--check-guards',action='store_true');p.add_argument('--budget',action='store_true');p.add_argument('--freeze',action='store_true');run(p.parse_args())
