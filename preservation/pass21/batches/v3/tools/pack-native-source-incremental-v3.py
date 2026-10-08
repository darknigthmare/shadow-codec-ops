"""Pack only new unique blobs, retain exact references to all previous archives."""
from pathlib import Path
import argparse,hashlib,json,shutil,zipfile,datetime
ROOT=Path(__file__).parent
PACK=Path('/tmp/cqc-pass21-source-preservation-v3/lossless-delta-v1')
PREFIX='preservation/pass21/batches/v3/'
OLD=Path('/tmp/cqc-pass21-source-archive-relocation/batch2/lossless-v2')
SHA=lambda b:hashlib.sha256(b).hexdigest()
GIT=lambda b:hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()
def save(p,o):
 b=(json.dumps(o,ensure_ascii=False,indent=2)+'\n').encode();p.parent.mkdir(parents=True,exist_ok=True)
 if p.exists():assert p.read_bytes()==b
 else:p.write_bytes(b);p.chmod(0o400)
 return SHA(b)
def pack():
 snapshotFile=ROOT/'SOURCE_SNAPSHOT_ACTUAL_V1.json';raw=snapshotFile.read_bytes();snap=json.loads(raw)
 assert snap['noProducerByteOrMtimeMutations'] and snap['oldArchivesNotRepacked']
 oldIndexFile=OLD/'LOSSLESS_SOURCE_INDEX_ACTUAL_V1.json';oldRaw=oldIndexFile.read_bytes();oldIndex=json.loads(oldRaw);assert SHA(oldRaw)==snap['priorSnapshot']['indexSHA256']
 prior=json.loads((ROOT/'PRIOR_FULL_REGULAR_TREE_BASELINE_ACTUAL_V1.json').read_bytes());priorPaths={r['path']:r['sha'] for r in prior['tree'] if r['type']=='blob'}
 assert len(priorPaths)==3419 and prior['sha']==snap['priorTree']
 assert priorPaths['preservation/pass21/batches/v2/lossless-v2/LOSSLESS_SOURCE_INDEX_ACTUAL_V1.json']==GIT(oldRaw)
 oldSnapshot=Path(snap['priorSnapshot']['path']).read_bytes();assert priorPaths['preservation/pass21/batches/v2/metadata/SOURCE_SNAPSHOT_ACTUAL_V1.json']==GIT(oldSnapshot)
 for archive in oldIndex['archives']:assert priorPaths['preservation/pass21/batches/v2/lossless-v2/'+archive['file']]==archive['gitBlobSHA1']
 new=sorted((r for r in snap['uniqueBlobs'] if r['tier']=='new-cas'),key=lambda r:r['sha256'])
 assert len(new)==snap['newCASUniqueBlobCount'] and all(r['bytes']<=23*1024*1024 for r in new),'Oversize unique blob requires an explicit lossless segmentation recipe'
 assert shutil.disk_usage('/tmp').free>sum(r['bytes'] for r in new)+128*1024*1024,'Insufficient bounded archive budget'
 PACK.mkdir(parents=True,exist_ok=True);groups=[];group=[];size=0
 for row in new:
  if group and size+row['bytes']>23*1024*1024:groups.append(group);group=[];size=0
  group.append(row);size+=row['bytes']
 if group:groups.append(group)
 archives=[];newWhere={}
 for n,rows in enumerate(groups,1):
  target=PACK/f'source-delta-part-{n:04d}.zip';assert not target.exists()
  with zipfile.ZipFile(target,'x',compression=zipfile.ZIP_DEFLATED,compresslevel=6) as z:
   for row in rows:
    b=Path(row['snapshotPath']).read_bytes();assert len(b)==row['bytes'] and SHA(b)==row['sha256'] and GIT(b)==row['gitBlobSHA1']
    info=zipfile.ZipInfo('objects/'+row['sha256']);info.date_time=(2026,10,8,0,0,0);info.compress_type=zipfile.ZIP_DEFLATED;info.external_attr=0o100644<<16;z.writestr(info,b,compresslevel=6)
  assert target.stat().st_size<=24*1024*1024
  with zipfile.ZipFile(target) as z:
   assert z.testzip() is None and len(z.infolist())==len(rows)
   for row in rows:assert z.read('objects/'+row['sha256'])==Path(row['snapshotPath']).read_bytes()
  b=target.read_bytes();target.chmod(0o400)
  archive={'file':target.name,'repositoryPath':PREFIX+'lossless-delta-v1/'+target.name,'bytes':len(b),'sha256':SHA(b),'gitBlobSHA1':GIT(b),'objectCount':len(rows),'uncompressedObjectBytes':sum(r['bytes'] for r in rows),'objects':[{'entry':'objects/'+r['sha256'],**{k:r[k] for k in ['sha256','gitBlobSHA1','bytes']}} for r in rows]};archives.append(archive)
  for row in rows:newWhere[row['sha256']]={'tier':'delta-v3','repositoryArchivePath':archive['repositoryPath'],'archiveFile':archive['file'],'archiveSHA256':archive['sha256'],'archiveGitBlobSHA1':archive['gitBlobSHA1'],'entry':'objects/'+row['sha256'],'sha256':row['sha256'],'gitBlobSHA1':row['gitBlobSHA1'],'bytes':row['bytes']}
  print(json.dumps({'stage':'new-unique-lossless-delta-roundtrip','part':n,'parts':len(groups),'objects':len(rows),'archiveBytes':len(b)}),flush=True)
 mapping=[]
 for row in snap['rows']:
  stored=newWhere[row['sha256']] if row['storage']['tier']=='new-cas' else row['storage']
  assert row['bytes']==stored['bytes'] and row['gitBlobSHA1']==stored['gitBlobSHA1']
  item={k:row[k] for k in ['localPath','sha256','gitBlobSHA1','bytes','versionScope']};item['archive']=stored
  for key in ['literalTopLevelStatus','priorVersionSHA256','sameAsPriorVersion','sourceRead']:
   if key in row:item[key]=row[key]
  mapping.append(item)
 mapFile=ROOT/'FULL_SNAPSHOT_ARCHIVE_MAP_ACTUAL_V1.json';mapSHA=save(mapFile,{'schema':'cqc.pass21.full-source-archive-map/1','status':'portable-exact-byte-map','sourceSnapshotSHA256':SHA(raw),'priorSourceIndexSHA256':SHA(oldRaw),'sourceReadStartedAt':snap['snapshotReadStartedAt'],'sourceReadFinishedAt':snap['snapshotReadFinishedAt'],'rows':mapping,'pathCount':len(mapping),'allOriginalPathNamesPreserved':True,'currentVersusPriorOnlyVersionScopeExplicit':True,'futureVersionsCovered':False})
 index={'schema':'cqc.pass21.incremental-lossless-source-index/1','status':'passed-new-object-byte-roundtrip','sourceSnapshotFile':'SOURCE_SNAPSHOT_ACTUAL_V1.json','sourceSnapshotSHA256':SHA(raw),'sourceSnapshotRepositoryPath':PREFIX+'metadata/SOURCE_SNAPSHOT_ACTUAL_V1.json','fullMapFile':mapFile.name,'fullMapSHA256':mapSHA,'fullMapRepositoryPath':PREFIX+'metadata/'+mapFile.name,'parent':snap['parent'],'priorTree':snap['priorTree'],'priorSourceIndex':{'repositoryPath':'preservation/pass21/batches/v2/lossless-v2/LOSSLESS_SOURCE_INDEX_ACTUAL_V1.json','sha256':SHA(oldRaw),'gitBlobSHA1':GIT(oldRaw)},'priorArchives':[dict(file=a['file'],repositoryPath='preservation/pass21/batches/v2/lossless-v2/'+a['file'],bytes=a['bytes'],sha256=a['sha256'],gitBlobSHA1=a['gitBlobSHA1']) for a in oldIndex['archives']],'deltaArchives':archives,'newUniqueBlobCount':len(new),'newUniqueBytes':sum(r['bytes'] for r in new),'newArchiveBytes':sum(a['bytes'] for a in archives),'originalPathCount':len(mapping),'currentReadPathCount':snap['currentReadPathCount'],'priorOnlyRetainedPathCount':snap['priorOnlyRetainedPathCount'],'oldArchiveCount':58,'oldArchivesNotRepacked':True,'prior3419GitPathsUnchanged':True,'allNewZIPCRCAndObjectBytesVerified':True,'fullRegularRestorationQAPending':True,'sourceStatusesNotReclassified':True,'sourceCandidatesNotPromotedToRuntime':True,'sourceInterval':{'start':snap['snapshotReadStartedAt'],'finish':snap['snapshotReadFinishedAt']}}
 save(PACK/'LOSSLESS_INCREMENTAL_SOURCE_INDEX_ACTUAL_V1.json',index)
 print(json.dumps({'stage':'incremental-portable-archive-map-ready','deltaArchives':len(archives),'newArchiveBytes':index['newArchiveBytes'],'fullPathCount':len(mapping),'oldArchivesRepacked':0,'tmpFree':shutil.disk_usage('/tmp').free}),flush=True)
if __name__=='__main__':
 p=argparse.ArgumentParser(description=__doc__);p.add_argument('--pack',action='store_true');args=p.parse_args()
 if args.pack:pack()
