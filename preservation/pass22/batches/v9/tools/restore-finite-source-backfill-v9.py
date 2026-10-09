"""Actually restore every named file. All complete source files >=16MiB use explicitly scoped SHM.

Execute after approved finite V9 snapshot/pack, with write grant to the exact SHM root.
Streaming validates archives, segments, complete regular files and single links.
Only verified generated files are removed; no producer/CAS/archive file changes.
"""
from pathlib import Path
import argparse,datetime,hashlib,json,os,shutil,stat,zipfile

OWNER=Path('/tmp/cqc-pass22-source-preservation-v9');META=OWNER/'metadata';PACK=OWNER/'lossless-delta-v1'
LEONE='532c4e4436616d1627b99ac29117717636143efe4bf7e0fa2c0e3cab1dbebf97'
SHM=Path('/dev/shm/cqc-source-v9-regular-restoration');TMP=OWNER/'regular-restoration-scratch'
CHUNK=1048576;RESERVE=33554432;SHM_THRESHOLD=16777216
NOW=lambda:datetime.datetime.now(datetime.timezone.utc).isoformat()
SHA=lambda b:hashlib.sha256(b).hexdigest()
GIT=lambda b:hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()
def hashes(path):
 n=path.stat().st_size;s=hashlib.sha256();g=hashlib.sha1(b'blob '+str(n).encode()+b'\0');got=0
 with path.open('rb') as f:
  while b:=f.read(CHUNK):s.update(b);g.update(b);got+=len(b)
 return got,s.hexdigest(),g.hexdigest()
def save(path,d):
 raw=(json.dumps(d,ensure_ascii=False,separators=(',',':'))+'\n').encode();assert not path.exists()
 with path.open('xb') as f:f.write(raw)
 return {'path':str(path),'bytes':len(raw),'sha256':SHA(raw),'gitBlobSHA1':GIT(raw)}
def execute():
 started=NOW();ib=(PACK/'LOSSLESS_INCREMENTAL_SOURCE_INDEX_ACTUAL_V1.json').read_bytes();index=json.loads(ib)
 sb=(META/index['sourceSnapshotFile']).read_bytes();snapshot=json.loads(sb);mb=(META/index['fullMapFile']).read_bytes();mapping=json.loads(mb)
 assert SHA(sb)==index['sourceSnapshotSHA256']==mapping['sourceSnapshotSHA256'] and SHA(mb)==index['fullMapSHA256']
 assert index['parent']==snapshot['parent']=='19de20433d90e2cba7165a9b9b185521c4e32419'
 goPin=snapshot['finalRootGO'];gb=Path(goPin['path']).read_bytes();assert SHA(gb)==goPin['sha256'] and json.loads(gb)['capturePackRegularRestoreAndNonforceSourcePublicationAuthorized'] is True
 assert mapping['pathCount']==len(mapping['rows'])==len(snapshot['rows'])==index['originalPathCount']
 assert [(r['localPath'],r['sha256'],r['bytes']) for r in mapping['rows']]==[(r['localPath'],r['sha256'],r['bytes']) for r in snapshot['rows']]
 # mkdir and all SHM operations occur in the same explicitly granted exec namespace.
 SHM.mkdir(mode=0o700,exist_ok=True);assert SHM.is_dir() and not SHM.is_symlink() and stat.S_IMODE(SHM.stat().st_mode)==0o700
 assert not any(SHM.iterdir()),'Do not overwrite an earlier scratch/session'
 TMP.mkdir(mode=0o700,exist_ok=True);assert not TMP.is_symlink() and not any(TMP.iterdir())
 archives={};archiveChecks=[];checks=[];wholeProof=None;largeProofs={};total=peakTMP=peakSHM=0
 try:
  pins=index['priorArchives']+index['deltaArchives'];assert len(index['priorArchives'])==124
  for n,pin in enumerate(pins,1):
   path=PACK/pin['file'] if pin in index['deltaArchives'] else Path(pin['localArchivePath'])
   assert not path.is_symlink() and path.is_file();before=path.stat();got,s,g=hashes(path);after=path.stat()
   assert (got,s,g)==(pin['bytes'],pin['sha256'],pin['gitBlobSHA1'])
   assert (before.st_dev,before.st_ino,before.st_size,before.st_mtime_ns)==(after.st_dev,after.st_ino,after.st_size,after.st_mtime_ns)
   z=zipfile.ZipFile(path);assert z.testzip() is None;archives[pin['repositoryPath']]=(z,pin)
   archiveChecks.append({'repositoryPath':pin['repositoryPath'],'sha256':s,'gitBlobSHA1':g,'bytes':got,'allZIPCRCVerified':True})
   if n%10==0 or n==len(pins):print(json.dumps({'stage':'all-archives-SHA-Git-every-entry-CRC','done':n,'total':len(pins)}),flush=True)
  for n,row in enumerate(mapping['rows'],1):
   relative=Path(row['localPath'].lstrip('/'));assert not relative.is_absolute() and all(x not in ['','.','..'] for x in relative.parts)
   root=SHM if row['bytes']>=SHM_THRESHOLD else TMP
   if row['sha256']==LEONE:assert row['bytes']==171494132 and root==SHM
   else:assert row['bytes']<=200000000
   if root==TMP:assert row['bytes']<SHM_THRESHOLD
   assert shutil.disk_usage(root).free>row['bytes']+RESERVE
   target=root/relative;assert not target.exists() and not target.is_symlink()
   for parent in target.parents:
    if parent==root:break
    assert not parent.is_symlink()
   target.parent.mkdir(parents=True,exist_ok=True)
   parts=row['archive'].get('segments',[row['archive']]);assert sum(x['bytes'] for x in parts)==row['bytes']
   whole=hashlib.sha256();wholegit=hashlib.sha1(b'blob '+str(row['bytes']).encode()+b'\0');written=0
   with target.open('xb') as dst:
    for pointer in parts:
     z,pin=archives[pointer['repositoryArchivePath']]
     assert pin['sha256']==pointer['archiveSHA256'] and pin['gitBlobSHA1']==pointer['archiveGitBlobSHA1']
     info=z.getinfo(pointer['entry']);assert info.filename=='objects/'+pointer['sha256'] and info.file_size==pointer['bytes']
     sh=hashlib.sha256();gh=hashlib.sha1(b'blob '+str(pointer['bytes']).encode()+b'\0');got=0
     with z.open(pointer['entry']) as src:
      while b:=src.read(CHUNK):dst.write(b);sh.update(b);gh.update(b);whole.update(b);wholegit.update(b);got+=len(b);written+=len(b)
     assert (got,sh.hexdigest(),gh.hexdigest())==(pointer['bytes'],pointer['sha256'],pointer['gitBlobSHA1'])
    dst.flush();os.fsync(dst.fileno())
   assert (written,whole.hexdigest(),wholegit.hexdigest())==(row['bytes'],row['sha256'],row['gitBlobSHA1'])
   before=target.lstat();assert stat.S_ISREG(before.st_mode) and before.st_nlink==1 and before.st_size==row['bytes']
   got,s,g=hashes(target);after=target.lstat()
   assert (got,s,g)==(row['bytes'],row['sha256'],row['gitBlobSHA1'])
   assert (before.st_dev,before.st_ino,before.st_size,before.st_mtime_ns,before.st_nlink)==(after.st_dev,after.st_ino,after.st_size,after.st_mtime_ns,after.st_nlink)
   check={'localPath':row['localPath'],'sha256':s,'gitBlobSHA1':g,'bytes':got,'regularFileRestoredAndReadBack':True,'singleLinkVerified':True,'inode':after.st_ino,'device':after.st_dev,'actualRestoredPath':str(target),'ZIPEntryCRCVerified':True,'versionScope':row['versionScope']}
   checks.append(check);total+=got
   if root==SHM:
    peakSHM=max(peakSHM,got)
    if row['sha256']==LEONE and wholeProof is None:wholeProof=save(META/'LEONE_COMPLETE_REGULAR_SHM_READBACK_BEFORE_CLEANUP_ACTUAL_V1.json',{'status':'passed-complete171494132B-single-link-regular-readback-nine-existing-chunks','at':NOW(),'check':check,'segments':len(parts),'sourceSnapshotSHA256':SHA(sb),'indexSHA256':SHA(ib),'proofWrittenBeforeScratchDeletion':True})
    if row['sha256'] not in largeProofs:
     largeProofs[row['sha256']]=save(META/('SHM_COMPLETE_REGULAR_READBACK_'+row['sha256']+'.json'),{'status':'passed-complete-source-single-link-regular-SHA-Git-CRC-readback','at':NOW(),'check':check,'segments':len(parts),'sourceSnapshotSHA256':SHA(sb),'indexSHA256':SHA(ib),'proofWrittenBeforeScratchDeletion':True})
   else:peakTMP=max(peakTMP,got)
   # This exact generated file is removed only after its regular readback proof.
   target.unlink()
   for parent in target.parents:
    if parent==root:break
    parent.rmdir()
   if n%500==0 or n==len(mapping['rows']):print(json.dumps({'stage':'every-original-name-regular-singlelink-restored-readback','paths':n,'total':len(mapping['rows']),'maxTMPFileBytes':peakTMP,'maxSHMWholeBytes':peakSHM}),flush=True)
 finally:
  for z,_ in archives.values():z.close()
 assert not any(TMP.iterdir()) and not any(SHM.iterdir())
 report={'schema':'cqc.pass22.incremental-source-regular-restore-qa/2','status':'passed-every-original-path-regular-byte-and-CRC-restoration','startedAt':started,'finishedAt':NOW(),'sourceSnapshotSHA256':SHA(sb),'fullMapSHA256':SHA(mb),'indexSHA256':SHA(ib),'archiveCount':len(archiveChecks),'archiveChecks':archiveChecks,'regularRestoredPathCount':len(checks),'allOriginalPathNamesVerified':True,'allRestoredPathBytesSHA256AndGitSHA1Verified':True,'allRestoredFilesActuallyRegularSingleLink':True,'allZIPEntriesCRCVerified':True,'verifyOnly':True,'verifyOnlyQualification':'Every original name was materialized under a scratch root as a complete regular single-link file, independently read back and SHA/Git/CRC checked. Files were generated one at a time and removed only after their checks. Complete files >=16MiB used exact scoped SHM; this includes the171494132B historical whole rebuilt from nine reused chunks and the finite large JS catalogue. No chunk was misrepresented as a substitute complete original file. A concurrent multi-GB checkout was not created.','maxMaterializedFileBytes':max(peakTMP,peakSHM),'maxTMPRegularFileBytes':peakTMP,'maxSHMRegularFileBytes':peakSHM,'cumulativeRestoredBytes':total,'sourceReadInterval':index['sourceInterval'],'futureSourceVersionsCovered':False,'literalArtworkStatusesNotReclassified':True,'sourceCASArchiveProducerBytesUnchanged':True,'closedTMPAndSHMScratchEmpty':True,'wholeSHMReadbackBeforeCleanupProof':wholeProof,'largeSHMReadbackBeforeCleanupProofs':list(largeProofs.values()),'checks':checks}
 pin=save(META/'REGULAR_RESTORATION_EVERY_PATH_QA_ACTUAL_V1.json',report)
 print(json.dumps({'status':report['status'],'paths':len(checks),'archives':len(archiveChecks),'peakTMP':peakTMP,'peakSHM':peakSHM,'scratchRootsEmpty':True,'pin':pin}),flush=True)

if __name__=='__main__':
 p=argparse.ArgumentParser(description=__doc__);p.add_argument('--verify-only',action='store_true');a=p.parse_args();assert a.verify_only;execute()
