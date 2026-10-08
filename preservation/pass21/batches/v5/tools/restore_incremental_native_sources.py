"""Restore original regular files; verify-only uses one bounded scratch file at a time."""
from pathlib import Path
import argparse,hashlib,json,os,shutil,zipfile,datetime
SHA=lambda b:hashlib.sha256(b).hexdigest()
GIT=lambda b:hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()
p=argparse.ArgumentParser(description=__doc__)
p.add_argument('--repository-root',type=Path)
p.add_argument('--delta-archive-dir',type=Path,default=Path(__file__).resolve().parent)
p.add_argument('--prior-archive-dir',type=Path)
p.add_argument('--metadata-dir',type=Path)
p.add_argument('--restore-to',type=Path,required=True)
p.add_argument('--verify-only',action='store_true')
p.add_argument('--report',type=Path)
args=p.parse_args();delta=args.delta_archive_dir.resolve();out=args.restore_to.resolve();repo=args.repository_root.resolve() if args.repository_root else None
indexBytes=(delta/'LOSSLESS_INCREMENTAL_SOURCE_INDEX_ACTUAL_V1.json').read_bytes();index=json.loads(indexBytes)
def repository_file(path):
 if not repo:raise ValueError('A repository root or explicit local source directories are required')
 candidate=repo/path;assert candidate.resolve().is_relative_to(repo);return candidate
metadata=args.metadata_dir.resolve() if args.metadata_dir else repository_file(index['sourceSnapshotRepositoryPath']).parent
snapshotBytes=(metadata/index['sourceSnapshotFile']).read_bytes();assert SHA(snapshotBytes)==index['sourceSnapshotSHA256'];snapshot=json.loads(snapshotBytes)
mapBytes=(metadata/index['fullMapFile']).read_bytes();assert SHA(mapBytes)==index['fullMapSHA256'];mapping=json.loads(mapBytes)
assert mapping['sourceSnapshotSHA256']==SHA(snapshotBytes) and mapping['pathCount']==index['originalPathCount']==len(snapshot['rows'])
assert [(r['localPath'],r['sha256'],r['bytes']) for r in mapping['rows']]==[(r['localPath'],r['sha256'],r['bytes']) for r in snapshot['rows']]
started=datetime.datetime.now(datetime.timezone.utc).isoformat();archives={};archiveChecks=[]
for pin in index['priorArchives']+index['deltaArchives']:
 if pin in index['deltaArchives']:path=delta/pin['file']
 elif args.prior_archive_dir:path=args.prior_archive_dir/pin['file']
 elif not repo and 'localArchivePath' in pin:path=Path(pin['localArchivePath'])
 else:path=repository_file(pin['repositoryPath'])
 assert path.is_file() and not path.is_symlink();raw=path.read_bytes();assert len(raw)==pin['bytes'] and SHA(raw)==pin['sha256'] and GIT(raw)==pin['gitBlobSHA1'];del raw
 z=zipfile.ZipFile(path);assert z.testzip() is None;archives[pin['repositoryPath']]=(path,z,pin)
 archiveChecks.append({'repositoryPath':pin['repositoryPath'],'sha256':pin['sha256'],'bytes':pin['bytes'],'allZIPCRCVerified':True})
 print(json.dumps({'stage':'archive-pins-and-every-entry-CRC-verified','archive':len(archiveChecks),'total':len(index['priorArchives'])+len(index['deltaArchives'])}),flush=True)
checks=[];maxMaterializedBytes=0;totalBytes=0
try:
 for n,row in enumerate(mapping['rows'],1):
  relative=Path(row['localPath'].lstrip('/'));assert not relative.is_absolute() and all(x not in ['', '.', '..'] for x in relative.parts)
  target=out/relative;assert target.resolve().is_relative_to(out) and not target.is_symlink()
  for parent in target.parents:
   if parent==out:break
   assert not parent.is_symlink()
  pointers=row['archive'].get('segments',[row['archive']])
  for pointer in pointers:
   path,z,pin=archives[pointer['repositoryArchivePath']];assert pin['sha256']==pointer['archiveSHA256'] and pin['gitBlobSHA1']==pointer['archiveGitBlobSHA1']
   info=z.getinfo(pointer['entry']);assert info.filename=='objects/'+pointer['sha256'] and info.file_size==pointer['bytes']
  assert sum(pointer['bytes'] for pointer in pointers)==row['bytes']
  assert shutil.disk_usage(out if out.exists() else out.parent).free>row['bytes']+16*1024*1024
  target.parent.mkdir(parents=True,exist_ok=True)
  if target.exists():assert target.is_file() and not args.verify_only,'Refusing to overwrite existing verify-only file';existing=target.read_bytes();assert len(existing)==row['bytes'] and SHA(existing)==row['sha256'] and GIT(existing)==row['gitBlobSHA1']
  else:
   with target.open('xb') as dest:
    for pointer in pointers:
     _,z,_=archives[pointer['repositoryArchivePath']]
     with z.open(pointer['entry']) as source:
      content=source.read();assert SHA(content)==pointer['sha256'] and GIT(content)==pointer['gitBlobSHA1'] and len(content)==pointer['bytes'];dest.write(content)
  assert target.is_file() and not target.is_symlink() and target.stat().st_nlink==1
  raw=target.read_bytes();assert len(raw)==row['bytes'] and SHA(raw)==row['sha256'] and GIT(raw)==row['gitBlobSHA1'];del raw
  totalBytes+=row['bytes'];maxMaterializedBytes=max(maxMaterializedBytes,row['bytes']);checks.append({'localPath':row['localPath'],'sha256':row['sha256'],'bytes':row['bytes'],'regularFileRestoredAndReadBack':True,'ZIPEntryCRCVerified':True,'versionScope':row['versionScope']})
  if args.verify_only:target.unlink()
  if n%500==0:print(json.dumps({'stage':'regular-original-path-restored-and-byte-verified','paths':n,'total':len(mapping['rows']),'scratchPeakFileBytes':maxMaterializedBytes}),flush=True)
finally:
 for _,z,_ in archives.values():z.close()
report={'schema':'cqc.pass21.incremental-source-regular-restore-qa/1','status':'passed-every-original-path-regular-byte-and-CRC-restoration','startedAt':started,'finishedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'sourceSnapshotSHA256':SHA(snapshotBytes),'fullMapSHA256':SHA(mapBytes),'indexSHA256':SHA(indexBytes),'archiveCount':len(archiveChecks),'archiveChecks':archiveChecks,'regularRestoredPathCount':len(checks),'allOriginalPathNamesVerified':True,'allRestoredPathBytesSHA256AndGitSHA1Verified':True,'allZIPEntriesCRCVerified':True,'verifyOnly':args.verify_only,'verifyOnlyQualification':'Each original relative path was materialized as a regular single-link file, read back and byte/hash/CRC checked, then only that generated scratch file removed. A full multi-GB concurrent checkout was not created.' if args.verify_only else 'Regular source files remain under restore-to.','maxMaterializedFileBytes':maxMaterializedBytes,'cumulativeRestoredBytes':totalBytes,'sourceReadInterval':index['sourceInterval'],'futureSourceVersionsCovered':False,'literalArtworkStatusesNotReclassified':True,'checks':checks}
if args.report:
 b=(json.dumps(report,ensure_ascii=False,indent=2)+'\n').encode();assert not args.report.exists();args.report.parent.mkdir(parents=True,exist_ok=True);args.report.write_bytes(b);args.report.chmod(0o400)
print(json.dumps({'status':report['status'],'paths':len(checks),'archives':len(archiveChecks),'maxMaterializedFileBytes':maxMaterializedBytes,'verifyOnly':args.verify_only}),flush=True)
