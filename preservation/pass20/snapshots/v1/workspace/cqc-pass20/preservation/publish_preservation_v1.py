"""Append only the exact Root-approved PASS20 source plan; guarded force=false ref."""
from pathlib import Path
import argparse, concurrent.futures, json, sys
sys.dont_write_bytecode=True
from preservation_common_v1 import *
PLAN=ROOT/'PASS20_PRESERVATION_PLAN_FOR_ROOT_REVIEW_V1.json'
APPROVAL=ROOT/'ROOT_EXACT_PASS20_PRESERVATION_APPROVAL_RECEIPT_V1.json'
OUT=ROOT/'publication'
def preflight():
 plan=json.loads(PLAN.read_bytes());plan_sha=SHA(PLAN.read_bytes())
 assert plan['schema']=='cqc.pass20.exact-source-preservation-plan/1'
 assert plan['repository']==REPOSITORY and plan['branch']==BRANCH and plan['expectedParent']==PARENT
 assert plan['versionedPathPrefix']==PREFIX and plan['metadataPathPrefix']==PREFIX+'metadata/'
 assert plan['rootExactPlanApprovalRequiredBeforePOST']and plan['noLocalEvictions']and plan['noAPPOrRFilesChanged']and plan['oneCommitBatch']
 for pin in plan['codePins']:assert SHA(Path(pin['path']).read_bytes())==pin['sha256']
 for pin in plan['fixedMetadataPins']:assert SHA((ROOT/pin['name']).read_bytes())==pin['sha256']
 for pathkey,shakey in [('inventoryPath','inventorySHA256'),('snapshotReceiptPath','snapshotReceiptSHA256'),('rootSourceFreezeReceiptPath','rootSourceFreezeReceiptSHA256'),('priorDerivedMapPath','priorDerivedMapSHA256')]:assert SHA(Path(plan[pathkey]).read_bytes())==plan[shakey]
 inventory=json.loads(Path(plan['inventoryPath']).read_bytes());snapshot=json.loads(Path(plan['snapshotReceiptPath']).read_bytes());freeze=json.loads(Path(plan['rootSourceFreezeReceiptPath']).read_bytes());previous=json.loads(Path(plan['priorDerivedMapPath']).read_bytes())
 assert inventory['status']=='frozen-whitelisted-source-bytes'and not inventory['literalSecretFindings']
 assert snapshot['status']=='ready-for-root-exact-plan-review'and snapshot['sourceQualityQualifications']==inventory['sourceQualityQualifications']==plan['sourceQualityQualifications']
 assert freeze['reviewedBy']=='/root'and freeze['finalSourcesFrozen']and freeze['expectedPreservationParent']==PARENT
 assert previous['expectedHead']==PARENT and len(previous['expectedFiles'])==2977 and tree_sha(previous['expectedFiles'])==previous['expectedTree']=='4a38780ba2d04c745f5b672a2aeab9413f0996ed'
 authorized_roots=[str(Path('/workspace')/name)for name in ['cqc-pass20','cqc-pass20-incarnation-policy','cqc-pass20-preview','cqc-pass20-retro','cqc-pass20-mecha','cqc-pass20-new-roster','cqc-pass20-box-anatomy']]
 assert plan['authorizedRoots']==inventory['authorizedRoots']==authorized_roots
 assert plan['exactGeneratedSourcePaths']==inventory['exactGeneratedSourcePaths']and plan['exactAPPAllowlistFromFrozenLocalRelease']==inventory['exactAPPAllowlistFromFrozenLocalRelease']
 roots=list(map(Path,authorized_roots));exact=set(plan['exactGeneratedSourcePaths'])|{row['path']for row in plan['exactAPPAllowlistFromFrozenLocalRelease']}
 expected_rows={row['repositoryPath']:(row['sha256'],row['gitBlobSHA1'],row['bytes'])for row in inventory['sourcePathMappings']}
 assert len(expected_rows)==len(inventory['sourcePathMappings'])==plan['newVersionedSourcePathMappings']
 rows=snapshot['sourceBlobs'];assert len(rows)==plan['sourceUniqueBlobsToVerify']and sorted(row['sha256']for row in rows)==plan['sourceSHA256s']
 actual_rows={}
 for row in rows:
  if not row.get('virtualRawJSONReconstruction'):
   path=Path(row['snapshotPath']);assert (path.is_relative_to(CAS)or path.is_relative_to(TMP_CAS))and path.is_file()and not path.is_symlink()
  raw=source_bytes(row);assert SHA(raw)==row['sha256']and GIT(raw)==row['gitBlobSHA1']and len(raw)==row['bytes']
  for mapping in row['allPathMappings']:
   p=Path(mapping['localPath']);assert str(p)in exact or any(p.is_relative_to(root)and p!=root for root in roots)
   repo=mapping['repositoryPath'];assert repo.startswith(PREFIX)and repo not in actual_rows and mapping['storedRemoteMode']=='100644'
   actual_rows[repo]=(row['sha256'],row['gitBlobSHA1'],row['bytes'])
 assert actual_rows==expected_rows
 assert sum(row['bytes']for row in rows)==snapshot['sourceUniqueBytes']
 new=[row for row in rows if row['sha256']not in previous['sourceContent']]
 assert len(new)==plan['newUniqueSourceBlobs']==inventory['newUniqueSourceBlobCount']
 assert sum(row['bytes']for row in new)==plan['newUniqueSourceBytes']==inventory['newUniqueSourceBytes']
 assert len(rows)==inventory['uniqueSourceBlobCount']and len(expected_rows)==snapshot['sourcePathMappingCount']
 assert plan['expectedFinalRegularTreeFiles']==2977+len(expected_rows)+6
 assert all((pin['path'],pin['sha256'])in {(row['localPath'],row['sha256'])for row in inventory['sourcePathMappings']}for pin in freeze['finalArtifacts'])
 assert len(plan['metadataNames'])==plan['metadataFiles']==6
 assert set(plan['metadataNames'])=={'PASS20_SOURCE_INVENTORY_FROZEN_V1.json','PASS20_IMMUTABLE_SOURCE_SNAPSHOT_ACTUAL_V1.json','PASS20_PRESERVATION_PLAN_FOR_ROOT_REVIEW_V1.json','ROOT_PASS20_SOURCE_FREEZE_RECEIPT_V1.json','ROOT_EXACT_PASS20_PRESERVATION_APPROVAL_RECEIPT_V1.json','SOURCE_PRESERVATION_PASS20_README_V1.md'}
 return plan,plan_sha,previous,rows
def main():
 parser=argparse.ArgumentParser();parser.add_argument('--execute',action='store_true');parser.add_argument('--blob-batch-limit',type=int,default=8);args=parser.parse_args();assert args.blob_batch_limit>=0;plan,plan_sha,previous,rows=preflight()
 if not args.execute:print(json.dumps({'status':'local-plan-preflight-passed','planSHA256':plan_sha,'sourceBlobs':len(rows),'sourcePaths':plan['newVersionedSourcePathMappings'],'expectedParent':PARENT,'noNetworkCalls':True}));return
 approval=json.loads(APPROVAL.read_bytes());assert approval['reviewedBy']=='/root'and approval['reviewedExactPlanSHA256']==plan_sha and approval['expectedParent']==PARENT and approval['branch']==BRANCH and approval['authorizesOnlyDedicatedPreservationBranch']and approval['noLocalEvictions']and approval['force']is False
 assert approval['approvedSourceMappings']==plan['newVersionedSourcePathMappings']and approval['approvedNewUniqueBlobs']==plan['newUniqueSourceBlobs']and approval['approvedNewUniqueBytes']==plan['newUniqueSourceBytes']and approval['expectedFinalRegularTreeFiles']==plan['expectedFinalRegularTreeFiles']
 OUT.mkdir(exist_ok=True);metadata=[]
 for name in plan['metadataNames']:
  raw=(ROOT/name).read_bytes();metadata.append({'sha256':SHA(raw),'gitBlobSHA1':GIT(raw),'bytes':len(raw),'snapshotPath':str(ROOT/name),'allPathMappings':[{'repositoryPath':plan['metadataPathPrefix']+name}]})
 selected=rows+metadata;fresh={mapping['repositoryPath']:row['gitBlobSHA1']for row in selected for mapping in row['allPathMappings']}
 assert not set(fresh)&set(previous['expectedFiles']);expected={**previous['expectedFiles'],**fresh};assert len(expected)==plan['expectedFinalRegularTreeFiles'];expected_tree=tree_sha(expected)
 prepared_path=OUT/'PRESERVATION_PREPARED_COMMIT_ACTUAL_V1.json';published_path=OUT/'PRESERVATION_PUBLISHED_ACTUAL_V1.json'
 def verify_commit(commit):
  actual=api('GET','git/commits/'+commit);assert actual['tree']['sha']==expected_tree and [row['sha']for row in actual['parents']]==[PARENT];verify_tree(expected_tree,expected)
 if published_path.exists():
  published=json.loads(published_path.read_bytes());assert published['planSHA256']==plan_sha and branch()==published['commit'];verify_commit(published['commit']);print(json.dumps({'status':'already-published-verified','commit':published['commit']}));return
 prepared=json.loads(prepared_path.read_bytes())if prepared_path.exists()else None
 assert branch()==PARENT or prepared and branch()==prepared['commit'],'Unexpected preservation head; stop without ref change'
 prior=api('GET','git/commits/'+PARENT);assert prior['tree']['sha']==previous['expectedTree'];verify_tree(previous['expectedTree'],previous['expectedFiles'])
 proof_dir=OUT/'blob-proofs';pending=[]
 for row in selected:
  if (proof_dir/(row['sha256']+'.json')).exists():blob_proof(row,proof_dir)
  else:pending.append(row)
 batch=pending[:args.blob_batch_limit]if args.blob_batch_limit else pending
 with concurrent.futures.ThreadPoolExecutor(max_workers=4)as pool:
  for i,proof in enumerate(pool.map(lambda row:blob_proof(row,proof_dir),batch),1):
   print(json.dumps({'stage':'exact-remote-source-blobs-verified','done':len(selected)-len(pending)+i,'total':len(selected)}),flush=True)
 if len(batch)<len(pending):
  print(json.dumps({'status':'approved-blob-batch-verified-resume-in-fresh-exec','remainingBlobs':len(pending)-len(batch),'planSHA256':plan_sha,'branchRefNotChangedByThisBatch':True,'noLocalSourceEvictions':True}),flush=True);return
 if prepared:
  assert prepared['planSHA256']==plan_sha and prepared['snapshotReceiptSHA256']==plan['snapshotReceiptSHA256']and prepared['expectedParent']==PARENT and prepared['expectedFinalFiles']==expected;verify_commit(prepared['commit'])
 else:
  current=previous['expectedTree'];partial=dict(previous['expectedFiles']);items=sorted(fresh.items())
  for offset in range(0,len(items),150):
   assert branch()==PARENT;chunk=items[offset:offset+150];tree=api('POST','git/trees',{'base_tree':current,'tree':[{'path':path,'mode':'100644','type':'blob','sha':digest}for path,digest in chunk]});partial.update(chunk);verify_tree(tree['sha'],partial);current=tree['sha']
  assert current==expected_tree and branch()==PARENT
  commit=api('POST','git/commits',{'message':'Preserve PASS20 independent art, source attempts and qualified verification — snapshot V1','tree':expected_tree,'parents':[PARENT]});verify_commit(commit['sha'])
  prepared={'schema':'cqc.pass20.source-preservation-prepared-commit/1','planSHA256':plan_sha,'snapshotReceiptSHA256':plan['snapshotReceiptSHA256'],'expectedParent':PARENT,'commit':commit['sha'],'tree':expected_tree,'expectedFinalFiles':expected,'refNotAdvancedYet':True,'force':False,'checkedAt':now()};save(prepared_path,prepared)
 head=branch()
 if head==PARENT:api('PATCH','git/refs/heads/'+BRANCH,{'sha':prepared['commit'],'force':False})
 else:assert head==prepared['commit'],'Ref advanced unexpectedly; do not reset'
 assert branch()==prepared['commit'];verify_commit(prepared['commit'])
 published={'schema':'cqc.pass20.source-preservation-publication/1','status':'published-byte-verified-complete-tree-verified','repository':REPOSITORY,'branch':BRANCH,'commit':prepared['commit'],'tree':expected_tree,'expectedParent':PARENT,'planSHA256':plan_sha,'inventorySHA256':plan['inventorySHA256'],'snapshotReceiptSHA256':plan['snapshotReceiptSHA256'],'rootApprovalReceiptSHA256':SHA(APPROVAL.read_bytes()),'rootSourceFreezeReceiptSHA256':plan['rootSourceFreezeReceiptSHA256'],'sourcePathMappings':plan['newVersionedSourcePathMappings'],'sourceUniqueBlobsVerified':len(rows),'newUniqueSourceBlobs':plan['newUniqueSourceBlobs'],'newUniqueSourceBytes':plan['newUniqueSourceBytes'],'totalRegularTreeFiles':len(expected),'metadataFiles':6,'allPrevious2977PathsUnchanged':True,'allCurrentSourceAndMetadataBytesSHA256GitSHA1SizeVerified':True,'allFileModes':'100644','deterministicCompleteTreeSHA1Verified':True,'force':False,'preparedReceiptWrittenBeforeRefUpdate':True,'noOtherBranchRefsChangedByThisPublisher':True,'noDirectVercelActionsByThisPublisher':True,'GitHubWebhookPreviewSideEffectsNotAssessedHere':True,'noLocalSourceEvictions':True,'noAPPOrRFilesChanged':True,'sourceQualityQualifications':plan['sourceQualityQualifications'],'preservationVerifiesBytesAndPathsOnly':True,'qualifiedAndFailedReportsNotConvertedToGenericPASS':True,'snapshotDoesNotClaimFutureAdditions':True,'checkedAt':now()};save(published_path,published);print(json.dumps({'status':published['status'],'commit':published['commit'],'tree':expected_tree,'files':len(expected)}))
if __name__=='__main__':main()
