"""Publish only the qualified delta to the preservation branch, never force a ref."""
from pathlib import Path
import argparse,concurrent.futures,importlib.util,json,sys
sys.dont_write_bytecode=True
ROOT=Path(__file__).parent
PACK=Path('/tmp/cqc-pass21-source-preservation-v6/lossless-delta-v1')
PREFIX='preservation/pass21/batches/v6/'
PARENT='c899ea1bb7e0b061af533237bc507be8fd60a696'
PRIOR='2893f95c9ddfb2299e5677a0d6e60d7f99ce7b42'
spec=importlib.util.spec_from_file_location('transport','/workspace/cqc-pass20/preservation/preservation_common_v1.py');t=importlib.util.module_from_spec(spec);spec.loader.exec_module(t)
def prepare():
 indexPath=PACK/'LOSSLESS_INCREMENTAL_SOURCE_INDEX_ACTUAL_V1.json';index=json.loads(indexPath.read_bytes());snapshotPath=ROOT/'SOURCE_SNAPSHOT_ACTUAL_V1.json';snapshot=json.loads(snapshotPath.read_bytes());qaPath=ROOT/'REGULAR_RESTORATION_EVERY_PATH_QA_ACTUAL_V1.json';qa=json.loads(qaPath.read_bytes())
 assert index['parent']==PARENT and index['priorTree']==PRIOR and t.SHA(snapshotPath.read_bytes())==index['sourceSnapshotSHA256']
 assert qa['status']=='passed-every-original-path-regular-byte-and-CRC-restoration' and qa['regularRestoredPathCount']==index['originalPathCount']==len(snapshot['rows']) and qa['archiveCount']==105+len(index['deltaArchives']) and qa['indexSHA256']==t.SHA(indexPath.read_bytes()) and qa['futureSourceVersionsCovered'] is False
 prior=t.api('GET','git/trees/'+PRIOR+'?recursive=1');assert prior['sha']==PRIOR and not prior.get('truncated')
 base={r['path']:r['sha'] for r in prior['tree'] if r['type']=='blob'};assert len(base)==3496 and t.tree_sha(base)==PRIOR and all(r['mode']=='100644' for r in prior['tree'] if r['type']=='blob')
 entries=[(PACK/a['file'],a['repositoryPath']) for a in index['deltaArchives']]
 entries.append((indexPath,PREFIX+'lossless-delta-v1/'+indexPath.name))
 metadata=['SOURCE_SNAPSHOT_ACTUAL_V1.json','FULL_SNAPSHOT_ARCHIVE_MAP_ACTUAL_V1.json','REGULAR_RESTORATION_EVERY_PATH_QA_ACTUAL_V1.json','PRIOR_FULL_REGULAR_TREE_BASELINE_ACTUAL_V1.json','README.md']
 tools=['preserve-native-source-incremental-v6.py','pack-native-source-incremental-v6.py','restore_incremental_native_sources.py','publish-native-source-incremental-v6.py']
 entries.extend((ROOT/name,PREFIX+'metadata/'+name) for name in metadata)
 entries.extend((ROOT/name,PREFIX+'tools/'+name) for name in tools)
 additions={};objects={};pins=[]
 for path,name in entries:
  assert path.is_file() and not path.is_symlink();raw=path.read_bytes();sha=t.SHA(raw);oid=t.GIT(raw)
  if path.suffix=='.zip':
   pin=next(a for a in index['deltaArchives'] if a['file']==path.name);assert len(raw)==pin['bytes'] and sha==pin['sha256'] and oid==pin['gitBlobSHA1'] and len(raw)<=22_000_000
  row={'sha256':sha,'gitBlobSHA1':oid,'bytes':len(raw),'snapshotPath':str(path)};objects[oid]=row;additions[name]=oid;pins.append({'repositoryPath':name,**row})
 assert len(additions)==len(index['deltaArchives'])+10 and not set(base)&set(additions)
 expected={**base,**additions};tree=t.tree_sha(expected)
 plan={'schema':'cqc.pass21.incremental-source-publication-plan/1','parent':PARENT,'priorTree':PRIOR,'preservedPriorRegularPaths':3496,'newRegularPaths':len(additions),'expectedFullRegularPathCount':len(expected),'expectedTree':tree,'indexSHA256':t.SHA(indexPath.read_bytes()),'snapshotSHA256':t.SHA(snapshotPath.read_bytes()),'sourceReadInterval':index['sourceInterval'],'sourcePaths':index['originalPathCount'],'newUniqueSourceBlobs':index['newUniqueBlobCount'],'newArchiveCount':len(index['deltaArchives']),'newArchiveBytes':index['newArchiveBytes'],'oldArchivesRepacked':0,'additions':pins,'noProducerMutations':True,'futureVersionsCovered':False,'sourceArtworkStatusesNotReclassified':True,'force':False}
 t.save(ROOT/'PUBLICATION_PLAN_ACTUAL_V1.json',plan)
 return plan,base,additions,objects,expected
def publish(limit):
 plan,base,additions,objects,expected=prepare();tree=plan['expectedTree'];preparedPath=ROOT/'PREPARED_COMMIT_ACTUAL_V1.json';finalPath=ROOT/'PUBLICATION_ACTUAL_V1.json';ledger=ROOT/'packed-v6-blob-proofs'
 if finalPath.exists():
  final=json.loads(finalPath.read_bytes());assert t.branch()==final['commit'] and final['tree']==tree;t.verify_tree(tree,expected);print(json.dumps({'stage':'already-published-full-tree-verified','commit':final['commit']}),flush=True);return
 prepared=json.loads(preparedPath.read_bytes()) if preparedPath.exists() else None
 head=t.branch();assert head==PARENT or prepared and head==prepared['commit'],'Preservation ref advanced unexpectedly; no force or overwrite permitted'
 pending=[r for r in objects.values() if not (ledger/(r['sha256']+'.json')).exists()];batch=pending[:limit]
 with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
  for n,result in enumerate(pool.map(lambda r:t.blob_proof(r,ledger),batch),1):
   print(json.dumps({'stage':'remote-delta-blob-exact-POST-GET-verified','done':len(objects)-len(pending)+n,'total':len(objects),'bytes':result['bytes'],'method':result['method']}),flush=True)
 if len(batch)<len(pending):print(json.dumps({'stage':'bounded-publish-batch-complete','remaining':len(pending)-len(batch),'sourceRefUnchanged':True}),flush=True);return
 proofs=[t.blob_proof(r,ledger) for r in objects.values()]
 if not prepared:
  assert t.branch()==PARENT
  result=t.api('POST','git/trees',{'base_tree':PRIOR,'tree':[{'path':path,'mode':'100644','type':'blob','sha':oid} for path,oid in sorted(additions.items())]});assert result['sha']==tree;t.verify_tree(tree,expected)
  result=t.api('POST','git/commits',{'tree':tree,'parents':[PARENT],'message':'Preserve PASS21 source delta and literal statuses with exact restoration — batch6'});assert result['tree']['sha']==tree and [p['sha'] for p in result['parents']]==[PARENT]
  prepared={'commit':result['sha'],'tree':tree,'parent':PARENT,'indexSHA256':plan['indexSHA256'],'sourceSnapshotSHA256':plan['snapshotSHA256']};t.save(preparedPath,prepared)
 assert prepared['tree']==tree and prepared['indexSHA256']==plan['indexSHA256']
 commit=t.api('GET','git/commits/'+prepared['commit']);assert commit['tree']['sha']==tree and [p['sha'] for p in commit['parents']]==[PARENT]
 head=t.branch();assert head in [PARENT,prepared['commit']]
 if head==PARENT:t.api('PATCH','git/refs/heads/'+t.BRANCH,{'sha':prepared['commit'],'force':False})
 assert t.branch()==prepared['commit'];count=t.verify_tree(tree,expected);assert count==len(expected) and all(expected[p]==sha for p,sha in base.items())
 methods={}
 for proof in proofs:methods[proof['method']]=methods.get(proof['method'],0)+1
 final={'schema':'cqc.pass21.incremental-source-github-publication/1','status':'published-every-new-blob-byte-and-full-tree-verified',**prepared,'branch':t.BRANCH,'repository':t.REPOSITORY,'regularTreeFiles':count,'all3496PriorPathsAndObjectIDsUnchanged':True,'newRegularPaths':len(additions),'newDeltaArchiveCount':plan['newArchiveCount'],'newDeltaArchiveBytes':plan['newArchiveBytes'],'newUniqueSourceBlobs':plan['newUniqueSourceBlobs'],'fullRestorableSourcePaths':plan['sourcePaths'],'remoteBlobProofCount':len(proofs),'remoteBlobMethods':methods,'everyNewRemoteBlobByteSHA256AndGitSHA1Verified':True,'fullRemoteTreeGETVerified':True,'oldZIPsRepacked':0,'force':False,'sourceReadInterval':plan['sourceReadInterval'],'restorationQAFile':'REGULAR_RESTORATION_EVERY_PATH_QA_ACTUAL_V1.json','restorationQASHA256':t.SHA((ROOT/'REGULAR_RESTORATION_EVERY_PATH_QA_ACTUAL_V1.json').read_bytes()),'snapshotDoesNotCoverFutureVersions':True,'producerSourcesAndUserArchivesNotChanged':True,'artworkStatusesNotReclassified':True,'publishedAt':t.now()}
 t.save(finalPath,final);print(json.dumps({'stage':'source-delta-published-nonforce','commit':final['commit'],'tree':tree,'sourcePaths':plan['sourcePaths'],'regularGitPaths':count,'oldPathsPreserved':3496}),flush=True)
if __name__=='__main__':
 p=argparse.ArgumentParser(description=__doc__);p.add_argument('--prepare',action='store_true');p.add_argument('--execute',action='store_true');p.add_argument('--max-blobs',type=int,default=4);args=p.parse_args()
 if args.prepare:
  plan,*_=prepare();print(json.dumps({'stage':'incremental-publication-plan-ready','newRegularPaths':plan['newRegularPaths'],'expectedTree':plan['expectedTree']}),flush=True)
 if args.execute:publish(args.max_blobs)
