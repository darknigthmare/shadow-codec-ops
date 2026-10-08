"""Independent GET-only PASS20 verification; derives maps from snapshots, not publisher state."""
from pathlib import Path
import argparse,base64,datetime,hashlib,json,subprocess,time
ROOT=Path('/workspace/cqc-pass20/preservation');OLD=Path('/workspace/cqc-pass19-preservation-inventory')
REPO='darknigthmare/shadow-codec-ops';BRANCH='cqc-pass19-source-preservation';PARENT='0acd4536927412efd67a020a98cca131fa86c51e'
PREFIX='preservation/pass20/snapshots/v1/'
SHA=lambda raw:hashlib.sha256(raw).hexdigest()
BLOB=lambda raw:hashlib.sha1(b'blob '+str(len(raw)).encode()+b'\0'+raw).hexdigest()
def checked(path,pin=None):
 raw=Path(path).read_bytes()
 if pin:assert SHA(raw)==pin,'Pinned verification input changed: '+str(path)
 return json.loads(raw),raw
def get(path):
 assert path.startswith(('git/ref/heads/','git/commits/','git/trees/','git/blobs/'))
 for attempt in range(3):
  try:r=subprocess.run(['gh','api','--method','GET','repos/'+REPO+'/'+path,'-H','Accept: application/vnd.github+json','-H','X-GitHub-Api-Version: 2022-11-28'],capture_output=True,text=True,timeout=45)
  except subprocess.TimeoutExpired:r=None
  if r is not None and r.returncode==0:return json.loads(r.stdout)
  if attempt==2:raise RuntimeError('Read-only verification GET failed: '+path+'; raw response not emitted')
  time.sleep(5*(attempt+1))
def deterministic_tree(files):
 nested={}
 for path,digest in files.items():
  assert not path.startswith('/')and all(q not in ['', '.', '..']for q in path.split('/'))
  parent=nested
  for name in path.split('/')[:-1]:parent=parent.setdefault(name,{})
  leaf=path.split('/')[-1];assert leaf not in parent;parent[leaf]=digest
 def encode(node):
  rows=[]
  for name,value in node.items():
   directory=isinstance(value,dict);digest=encode(value)if directory else value;n=name.encode('utf-8')
   rows.append((n+(b'/'if directory else b''),(b'40000'if directory else b'100644')+b' '+n+b'\0'+bytes.fromhex(digest)))
  raw=b''.join(row[1]for row in sorted(rows));return hashlib.sha1(b'tree '+str(len(raw)).encode()+b'\0'+raw).hexdigest()
 return encode(nested)
def previous_map():
 specifications=[('PASS19_PRESERVATION_BRANCH_PLAN_FOR_ROOT_REVIEW_V2.json','d4328e015952ff3c3a42911dd9dc4effd75187cdba446b63a8fa2acfc8dd148e','snapshotBlobs','preservation/pass19/metadata/',['PASS19_RAW_SOURCE_INVENTORY_V1.json','PASS19_IMMUTABLE_SNAPSHOT_ACTUAL_V2.json','PASS19_PRESERVATION_BRANCH_PLAN_FOR_ROOT_REVIEW_V2.json','ROOT_EXACT_PLAN_PUBLICATION_REVIEW_RECEIPT_V1.json','SOURCE_PRESERVATION_README_V1.md']),('PASS19_PRESERVATION_APPEND_PLAN_FOR_ROOT_REVIEW_V2.json','49c5332fe9d71f9b9abd567b998c05e946f80f79c8191dcac56f5574b853dcdf','sourceBlobs','preservation/pass19/snapshots/v2/metadata/',['PASS19_RAW_SOURCE_INVENTORY_V2.json','PASS19_IMMUTABLE_APPEND_SNAPSHOT_ACTUAL_V2.json','PASS19_PRESERVATION_APPEND_PLAN_FOR_ROOT_REVIEW_V2.json','ROOT_EXACT_APPEND_PLAN_PUBLICATION_REVIEW_RECEIPT_V2.json','SOURCE_PRESERVATION_APPEND_README_V2.md']),('PASS19_PRESERVATION_FINAL_APPEND_PLAN_FOR_ROOT_REVIEW_V3.json','3c31f483f25b8401061d65bfb4cd4e7bd64fdb86b7bef30a44b5b8f6fbd2ae84','sourceBlobs','preservation/pass19/snapshots/v3/metadata/',['PASS19_FINAL_SOURCE_INVENTORY_V3.json','PASS19_IMMUTABLE_FINAL_APPEND_SNAPSHOT_ACTUAL_V3.json','PASS19_PRESERVATION_FINAL_APPEND_PLAN_FOR_ROOT_REVIEW_V3.json','ROOT_FINAL_APPEND_SOURCES_FREEZE_RECEIPT_V3.json','ROOT_EXACT_FINAL_APPEND_PLAN_PUBLICATION_REVIEW_RECEIPT_V3.json','SOURCE_PRESERVATION_FINAL_APPEND_README_V3.md'])]
 files={};source_content={}
 for name,pin,key,prefix,metadata in specifications:
  plan,_=checked(OLD/name,pin);snapshot,_=checked(plan['snapshotReceiptPath'],plan['snapshotReceiptSHA256'])
  for row in snapshot[key]:
   source_content[row['sha256']]={'bytes':row['bytes'],'gitBlobSHA1':row['gitBlobSHA1']}
   for mapping in row['allPathMappings']:assert mapping['repositoryPath']not in files;files[mapping['repositoryPath']]=row['gitBlobSHA1']
  for name in metadata:
   raw=(OLD/name).read_bytes();assert prefix+name not in files;files[prefix+name]=BLOB(raw)
 assert len(files)==2977 and len(source_content)==1478 and deterministic_tree(files)=='4a38780ba2d04c745f5b672a2aeab9413f0996ed'
 return files,source_content
def independent_source_bytes(row):
 recipe=row.get('virtualRawJSONReconstruction')
 if not recipe:
  p=Path(row['snapshotPath']);assert not p.is_symlink()and any(p.is_relative_to(root)for root in [Path('/workspace/cqc-pass20-preservation-cas'),Path('/tmp/cqc-pass20-preservation-cas')]);return p.read_bytes()
 raw=Path(recipe['recipeSnapshotPath']).read_bytes();assert SHA(raw)==recipe['recipeSHA256'];document=json.loads(raw);del document['rawResultContentDeduplication'];pins={pin['sha256']:pin for pin in recipe['sourcePNGPins']}
 for request in document['requests']:
  original=request.pop('imageResultContentDeduplication');pin=pins[original['sha256']];native=Path(pin['snapshotPath']).read_bytes();assert SHA(native)==original['sha256']==pin['sha256']and len(native)==original['bytes']==pin['bytes'];prior=request['result'];request['result']={key:original['uriPrefix']+base64.b64encode(native).decode()if key=='image_url'else prior[key]for key in original['originalResultKeyOrder']}
 result=(json.dumps(document,indent=2,ensure_ascii=True)+'\n').encode();assert SHA(result)==recipe['expectedOriginalSHA256']==row['sha256']and len(result)==recipe['expectedOriginalBytes']==row['bytes'];return result
def main():
 parser=argparse.ArgumentParser();parser.add_argument('--verify-remote-after-publication',action='store_true');args=parser.parse_args()
 if not args.verify_remote_after_publication:print(json.dumps({'status':'independent-verifier-ready','remoteCalls':False}));return
 published,pubraw=checked(ROOT/'publication/PRESERVATION_PUBLISHED_ACTUAL_V1.json');assert published['status']=='published-byte-verified-complete-tree-verified'and published['repository']==REPO and published['branch']==BRANCH and published['expectedParent']==PARENT and published['force']is False
 plan,planraw=checked(ROOT/'PASS20_PRESERVATION_PLAN_FOR_ROOT_REVIEW_V1.json',published['planSHA256']);snapshot,snapraw=checked(plan['snapshotReceiptPath'],plan['snapshotReceiptSHA256']);inventory,invraw=checked(plan['inventoryPath'],plan['inventorySHA256']);approval,appraw=checked(ROOT/'ROOT_EXACT_PASS20_PRESERVATION_APPROVAL_RECEIPT_V1.json',published['rootApprovalReceiptSHA256']);freeze,_=checked(plan['rootSourceFreezeReceiptPath'],plan['rootSourceFreezeReceiptSHA256'])
 assert approval['reviewedBy']=='/root'and approval['reviewedExactPlanSHA256']==SHA(planraw)and approval['expectedParent']==PARENT and approval['branch']==BRANCH and approval['force']is False
 assert freeze['reviewedBy']=='/root'and freeze['finalSourcesFrozen']and freeze['expectedPreservationParent']==PARENT
 assert inventory['status']=='frozen-whitelisted-source-bytes'and not inventory['literalSecretFindings']and snapshot['status']=='ready-for-root-exact-plan-review'
 previous,old_content=previous_map();expected=dict(previous);source_content=dict(old_content);source_rows={};transport_pins=[]
 for row in snapshot['sourceBlobs']:
  raw=independent_source_bytes(row);assert SHA(raw)==row['sha256']and BLOB(raw)==row['gitBlobSHA1']and len(raw)==row['bytes']
  source_content[row['sha256']]={'bytes':row['bytes'],'gitBlobSHA1':row['gitBlobSHA1']}
  for mapping in row['allPathMappings']:
   path=mapping['repositoryPath'];assert path.startswith(PREFIX)and path not in expected and mapping['storedRemoteMode']=='100644';expected[path]=row['gitBlobSHA1'];source_rows[path]=(row['sha256'],row['gitBlobSHA1'],row['bytes'])
  proof,pr=checked(ROOT/'publication/blob-proofs'/str(row['sha256']+'.json'));assert proof['remoteExactBytesVerified']and proof['sha256']==row['sha256']and proof['gitBlobSHA1']==row['gitBlobSHA1']and proof['bytes']==row['bytes'];transport_pins.append({'path':str(ROOT/'publication/blob-proofs'/str(row['sha256']+'.json')),'sha256':SHA(pr)})
 inventoried={row['repositoryPath']:(row['sha256'],row['gitBlobSHA1'],row['bytes'])for row in inventory['sourcePathMappings']};assert source_rows==inventoried
 assert len(source_rows)==plan['newVersionedSourcePathMappings']and len(snapshot['sourceBlobs'])==plan['sourceUniqueBlobsToVerify']
 new=[v for digest,v in source_content.items()if digest not in old_content];assert len(new)==plan['newUniqueSourceBlobs']and sum(row['bytes']for row in new)==plan['newUniqueSourceBytes']
 metadata=[]
 for name in plan['metadataNames']:
  raw=(ROOT/name).read_bytes();digest=BLOB(raw);path=plan['metadataPathPrefix']+name;assert path not in expected;expected[path]=digest
  actual=get('git/blobs/'+digest);exact=base64.b64decode(actual['content']);assert exact==raw and actual['sha']==digest and SHA(exact)==SHA(raw)
  metadata.append({'name':name,'repositoryPath':path,'sha256':SHA(raw),'gitBlobSHA1':digest,'bytes':len(raw),'freshRemoteGETExactBytesVerified':True})
 assert len(metadata)==6 and len(expected)==plan['expectedFinalRegularTreeFiles']
 head=get('git/ref/heads/'+BRANCH)['object']['sha'];assert head==published['commit'];commit=get('git/commits/'+head);assert commit['tree']['sha']==published['tree']and [row['sha']for row in commit['parents']]==[PARENT]
 tree=get('git/trees/'+published['tree']+'?recursive=1');assert not tree.get('truncated')and tree['sha']==published['tree'];assert all(row['type']in ['blob','tree']and row['mode']==('100644'if row['type']=='blob'else'040000')for row in tree['tree']);actual={row['path']:row['sha']for row in tree['tree']if row['type']=='blob'};assert actual==expected and deterministic_tree(expected)==published['tree']
 assert all(actual[path]==digest for path,digest in previous.items())and len(previous)==2977
 assert plan['sourceQualityQualifications']==inventory['sourceQualityQualifications']==snapshot['sourceQualityQualifications']==published['sourceQualityQualifications']
 priorproof,priorraw=checked(OLD/'github-source-publication-final-append-v3/INDEPENDENT_FINAL_PRESERVATION_VERIFICATION_ACTUAL_V3.json','1f964b055c356955cbddc58fd5a6708f486f8261c456210001ac24b42a8e06ed');assert priorproof['status']=='verified-preservation-bytes-and-paths'and priorproof['commit']==PARENT
 result={'schema':'cqc.pass20.independent-source-preservation-verification/1','status':'verified-immutable-source-bytes-and-complete-paths','repository':REPO,'branch':BRANCH,'commit':head,'tree':published['tree'],'expectedParent':PARENT,'planSHA256':SHA(planraw),'snapshotSHA256':SHA(snapraw),'inventorySHA256':SHA(invraw),'approvalSHA256':SHA(appraw),'publicationReceiptSHA256':SHA(pubraw),'expectedMapDerivedFromPriorAndNewSnapshotsNotPublisherState':True,'allNewSourceCASBytesMatchSHA256GitSHA1AndSize':True,'allNewSourceTransportExactByteProofsMatched':True,'virtualBox35MBOriginalIndependentlyReconstructedFromPersistentCAS':True,'allSixMetadataFreshRemoteGETVerified':True,'allPrevious2977PathsUnchanged':True,'fullRemoteTreePathsModesAndDeterministicSHA1Verified':True,'newSourcePathMappings':len(source_rows),'sourceBlobsInNewSnapshot':len(snapshot['sourceBlobs']),'newUniqueSourceBlobs':len(new),'newUniqueSourceBytes':sum(row['bytes']for row in new),'cumulativeUniqueSourceBlobs':len(source_content),'cumulativeUniqueSourceBytes':sum(row['bytes']for row in source_content.values()),'totalRegularTreeFiles':len(expected),'sourceTransportProofs':transport_pins,'metadata':metadata,'oldSourceByteVerificationInheritedFromPinnedIndependentPASS19Receipt':SHA(priorraw),'qualification':'Prior immutable Git blobs retain the exact unchanged2977-path tree and inherited PASS19 byte proofs. New source bytes are independently checked against persistent CAS and exact remote transport proofs; the35MB Box JSON is reconstructed byte-exactly in process memory from its frozen persistent recipe and12 PNG inputs. Six metadata blobs are fetched afresh. This certifies preservation, not universal art/gameplay quality.','sourceQualityQualifications':inventory['sourceQualityQualifications'],'noRemoteMutations':True,'noSourceOrAPPOrRMutations':True,'noLocalEvictions':True,'checkedAt':datetime.datetime.now(datetime.timezone.utc).isoformat()}
 out=ROOT/'publication/PRESERVATION_INDEPENDENT_VERIFICATION_ACTUAL_V1.json';raw=(json.dumps(result,ensure_ascii=False,indent=2)+'\n').encode()
 if out.exists():assert out.read_bytes()==raw
 else:out.write_bytes(raw);out.chmod(0o400)
 print(json.dumps({'status':result['status'],'commit':head,'files':len(expected),'proof':str(out),'sha256':SHA(raw)}))
if __name__=='__main__':main()
