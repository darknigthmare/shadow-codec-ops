"""Collect seven explicit PASS20 roots and approved exact-file exceptions into persistent exact-byte CAS.

Default scan writes a draft, never publishes. Freeze requires Root's exact receipt.
Source PNGs and rejected records remain unchanged. GitHub calls are GET only.
"""
from pathlib import Path
import argparse, base64, copy, json, re, stat, sys, os
sys.dont_write_bytecode=True
from preservation_common_v1 import *
OLD=Path('/workspace/cqc-pass19-preservation-inventory')
AUTHORIZED_ROOTS=[Path('/workspace')/q for q in ['cqc-pass20','cqc-pass20-incarnation-policy','cqc-pass20-preview','cqc-pass20-retro','cqc-pass20-mecha','cqc-pass20-new-roster','cqc-pass20-box-anatomy']]
APP=Path('/tmp/cqc-pass19-application')
EXCLUDED_COMPONENTS={'.git','.vercel','.aws','.codex','.agents','node_modules','__pycache__'}
METADATA=['PASS20_SOURCE_INVENTORY_FROZEN_V1.json','PASS20_IMMUTABLE_SOURCE_SNAPSHOT_ACTUAL_V1.json','PASS20_PRESERVATION_PLAN_FOR_ROOT_REVIEW_V1.json','ROOT_PASS20_SOURCE_FREEZE_RECEIPT_V1.json','ROOT_EXACT_PASS20_PRESERVATION_APPROVAL_RECEIPT_V1.json','SOURCE_PRESERVATION_PASS20_README_V1.md']
TOOL_RE=re.compile(r'/workspace/generated_images/exec-[0-9a-f-]{36}\.png')
SOURCES_FROZEN=False
SECRET_RE=[re.compile(rb'-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----'),re.compile(rb'github_pat_[A-Za-z0-9_]{50,}'),re.compile(rb'gh[pousr]_[A-Za-z0-9_]{36,}'),re.compile(rb'AKIA[0-9A-Z]{16}')]
def allowed_root_file(path):
 return any(path.is_relative_to(root) and path!=root for root in AUTHORIZED_ROOTS)
def excluded(path):
 if any(part in EXCLUDED_COMPONENTS or part.lower().startswith(('chrome-profile','chromium-profile','profile-','cache-','cqa'))for part in path.parts):return 'profile-auth-cache-or-generated-code-directory'
 if path.name in METADATA or path.name.startswith(('DRAFT_', 'PRESERVATION_PREVIOUS_', 'PRESERVATION_PUBLICATION_', 'PRESERVATION_VERIFICATION_'))or path.is_relative_to(ROOT/'publication'):return 'preservation-control-or-after-freeze-receipt'
 if path.suffix=='.log' and ('CHROME'in path.name.upper()or'BROWSER'in path.name.upper()or'SERVER'in path.name.upper()or'ACTUAL'not in path.name.upper()):return 'operational-or-unbounded-log'
 if path.name.startswith(('.env','auth','credentials'))or path.suffix in ['.sqlite','.db','.cookie']:return 'auth-environment-or-profile-state'
 return None
def snapshot_bytes(raw,source):
 digest=SHA(raw);physical=source.resolve();assert physical.is_file()and not physical.is_symlink()
 for existing in [TMP_CAS/digest,CAS/digest]:
  if existing.exists():
   assert existing.is_file()and not existing.is_symlink()and existing.read_bytes()==raw
   return {'sha256':digest,'gitBlobSHA1':GIT(raw),'bytes':len(raw),'snapshotPath':str(existing)}
 # Root has frozen source bytes. Keep exact regular bytes on their existing
 # filesystem by hardlink without changing source permissions or duplicating
 # the disk allocation; subsequent verification still hashes every CAS file.
 destination=TMP_CAS if str(physical).startswith('/tmp/')else CAS
 p=destination/digest;p.parent.mkdir(parents=True,exist_ok=True)
 if not SOURCES_FROZEN and source.suffix.lower()in ['.jsonl','.log']:
  p.write_bytes(raw);p.chmod(0o400)
 else:
  try:os.link(physical,p)
  except OSError:
   if p.exists():assert p.is_file()and not p.is_symlink()and p.read_bytes()==raw
   else:p.write_bytes(raw);p.chmod(0o400)
 assert p.is_file()and not p.is_symlink()and p.read_bytes()==raw
 return {'sha256':digest,'gitBlobSHA1':GIT(raw),'bytes':len(raw),'snapshotPath':str(p)}
def derive_previous():
 specs=[('PASS19_PRESERVATION_BRANCH_PLAN_FOR_ROOT_REVIEW_V2.json','snapshotBlobs','preservation/pass19/metadata/', ['PASS19_RAW_SOURCE_INVENTORY_V1.json','PASS19_IMMUTABLE_SNAPSHOT_ACTUAL_V2.json','PASS19_PRESERVATION_BRANCH_PLAN_FOR_ROOT_REVIEW_V2.json','ROOT_EXACT_PLAN_PUBLICATION_REVIEW_RECEIPT_V1.json','SOURCE_PRESERVATION_README_V1.md']),('PASS19_PRESERVATION_APPEND_PLAN_FOR_ROOT_REVIEW_V2.json','sourceBlobs','preservation/pass19/snapshots/v2/metadata/',['PASS19_RAW_SOURCE_INVENTORY_V2.json','PASS19_IMMUTABLE_APPEND_SNAPSHOT_ACTUAL_V2.json','PASS19_PRESERVATION_APPEND_PLAN_FOR_ROOT_REVIEW_V2.json','ROOT_EXACT_APPEND_PLAN_PUBLICATION_REVIEW_RECEIPT_V2.json','SOURCE_PRESERVATION_APPEND_README_V2.md']),('PASS19_PRESERVATION_FINAL_APPEND_PLAN_FOR_ROOT_REVIEW_V3.json','sourceBlobs','preservation/pass19/snapshots/v3/metadata/',['PASS19_FINAL_SOURCE_INVENTORY_V3.json','PASS19_IMMUTABLE_FINAL_APPEND_SNAPSHOT_ACTUAL_V3.json','PASS19_PRESERVATION_FINAL_APPEND_PLAN_FOR_ROOT_REVIEW_V3.json','ROOT_FINAL_APPEND_SOURCES_FREEZE_RECEIPT_V3.json','ROOT_EXACT_FINAL_APPEND_PLAN_PUBLICATION_REVIEW_RECEIPT_V3.json','SOURCE_PRESERVATION_FINAL_APPEND_README_V3.md'])]
 files={};source_content={};pins=[]
 for name,key,prefix,names in specs:
  p=OLD/name;raw=p.read_bytes();plan=json.loads(raw);pins.append({'path':str(p),'sha256':SHA(raw)})
  q=Path(plan['snapshotReceiptPath']);raw=q.read_bytes();assert SHA(raw)==plan['snapshotReceiptSHA256'];snapshot=json.loads(raw);pins.append({'path':str(q),'sha256':SHA(raw)})
  for row in snapshot[key]:
   source_content[row['sha256']]={'bytes':row['bytes'],'gitBlobSHA1':row['gitBlobSHA1']}
   for mapping in row['allPathMappings']:assert mapping['repositoryPath']not in files;files[mapping['repositoryPath']]=row['gitBlobSHA1']
  for meta in names:
   q=OLD/meta;raw=q.read_bytes();files[prefix+meta]=GIT(raw);pins.append({'path':str(q),'sha256':SHA(raw)})
 assert len(files)==2977 and tree_sha(files)=='4a38780ba2d04c745f5b672a2aeab9413f0996ed' and len(source_content)==1478
 return{'expectedHead':PARENT,'expectedTree':'4a38780ba2d04c745f5b672a2aeab9413f0996ed','expectedFiles':files,'sourceContent':source_content,'independentlyDerivedFromPriorSnapshots':True,'priorEvidencePins':pins}
def main():
 parser=argparse.ArgumentParser();parser.add_argument('--verify-previous-remote',action='store_true');parser.add_argument('--freeze',action='store_true');args=parser.parse_args()
 global SOURCES_FROZEN;SOURCES_FROZEN=args.freeze
 prior=derive_previous()
 if args.verify_previous_remote:
  assert branch()==PARENT;commit=api('GET','git/commits/'+PARENT);assert commit['tree']['sha']==prior['expectedTree'];verify_tree(prior['expectedTree'],prior['expectedFiles']);save(ROOT/'PRESERVATION_PREVIOUS_REMOTE_REF_ACTUAL_V1.json',{'schema':'cqc.pass20.previous-preservation-read-only/1','status':'passed','repository':REPOSITORY,'branch':BRANCH,'commit':PARENT,'tree':prior['expectedTree'],'regularFiles':2977,'allPriorPathsAndModesVerified':True,'noRemoteMutations':True,'checkedAt':now()})
 paths=[];excluded_rows=[];report_docs={};quality=[];known_tools={}
 for root in AUTHORIZED_ROOTS:
  assert root.is_dir()
  for p in sorted(root.rglob('*')):
   if not p.is_file():continue
   why=excluded(p)
   if why:excluded_rows.append({'path':str(p),'reason':why});continue
   paths.append(p)
   if p.suffix=='.json':
    try:d=json.loads(p.read_bytes())
    except (ValueError,UnicodeDecodeError):continue
    report_docs[p]=d
    if isinstance(d,dict)and isinstance(d.get('status'),str):quality.append({'path':str(p),'sha256':SHA(p.read_bytes()),'sourceStatus':d['status'],'statusBytesPreservedWithoutReclassification':True})
    # Only exact tool paths explicitly present in bounded local documents;
    # never traverse the global generated_images directory.
    def strings(value):
     if isinstance(value,str):yield value
     elif isinstance(value,dict):
      for x in value.values():yield from strings(x)
     elif isinstance(value,list):
      for x in value:yield from strings(x)
    for value in strings(d):
     if value.startswith('data:'):continue
     for match in TOOL_RE.findall(value):known_tools.setdefault(Path(match),set()).add(str(p))
 release=ROOT.parent/'integration/LOCAL_RELEASE_COMMIT_ACTUAL_V1.json'
 exact_app=[]
 if release.exists():
  commit=json.loads(release.read_bytes());assert commit['status']=='passed'and commit['deletedPaths']==[]
  for record in commit['changes']:
   if not record['path'].startswith('public/cqc/'):continue
   p=APP/record['path'];assert p.is_file()and not p.is_symlink()and record['mode']=='100644'
   assert p.suffix in ['.js','.html','.json','.css','.png','.jpg','.jpeg','.webp','.svg'] and GIT(p.read_bytes())==record['sha']
   paths.append(p);exact_app.append({'path':str(p),'gitBlobSHA1':record['sha'],'authorizingReleaseReceipt':str(release),'authorizingReleaseReceiptSHA256':SHA(release.read_bytes())})
 for path in known_tools:assert path.is_file(), 'Explicitly referenced native source absent: '+str(path)
 paths+=list(known_tools);paths=sorted(set(paths));rows=[];secret_findings=[]
 def append(path,raw,repository_path=None,virtual=None):
  pin={'sha256':SHA(raw),'gitBlobSHA1':GIT(raw),'bytes':len(raw),'snapshotPath':None}if virtual else snapshot_bytes(raw,path);record={'localPath':str(path),'repositoryPath':repository_path or PREFIX+str(path).lstrip('/'),**pin,'storedRemoteMode':'100644'}
  if virtual:record['virtualHistoricalReconstruction']=virtual;record['virtualRawJSONReconstruction']=virtual['frozenMaterializationRecipe']
  elif path.is_symlink():
   resolved=path.resolve();assert str(resolved).startswith('/tmp/cqc-pass19-application/public/cqc/assets/')or allowed_root_file(resolved)
   record['sourceAliasQualification']={'originalPathIsSymlink':True,'resolvedRegularPhysicalPath':str(resolved),'resolvedBytesMatchAliasSHA256':True,'remotePreservationStoresRegularExactBytes':True,'sourceAliasNotModifiedByPreservation':True}
  if path in known_tools:record['exactGeneratedSourceReferenceReports']=sorted(known_tools[path])
  if path.suffix in ['.json','.jsonl','.py','.js','.mjs','.cjs','.md','.txt','.html','.css','.log']:
   for index,pattern in enumerate(SECRET_RE):
    for match in pattern.finditer(raw):secret_findings.append({'path':str(path),'rule':index,'byteOffset':match.start(),'matchedBytesSHA256':SHA(match.group())})
  rows.append(record)
 for path in paths:append(path,path.read_bytes())
 rawbox=Path('/workspace/cqc-pass20-box-anatomy/provenance/IMAGE_GENERATION_REQUESTS_ACTUAL_V1.json');box=json.loads(rawbox.read_bytes())
 if 'rawResultContentDeduplication'in box:
  recipe=box['rawResultContentDeduplication'];reconstructed=copy.deepcopy(box);del reconstructed['rawResultContentDeduplication']
  for request in reconstructed['requests']:
   pin=request.pop('imageResultContentDeduplication');native=Path(pin['nativeImagePath']).read_bytes();assert SHA(native)==pin['sha256']and len(native)==pin['bytes']
   old=request['result'];request['result']={key:(pin['uriPrefix']+base64.b64encode(native).decode()if key=='image_url'else old[key])for key in pin['originalResultKeyOrder']}
  raw=(json.dumps(reconstructed,indent=2,ensure_ascii=True)+'\n').encode();assert SHA(raw)==recipe['priorRawJSONSHA256']and len(raw)==recipe['priorRawJSONBytes']
  actual_by_path={row['localPath']:row for row in rows};current=actual_by_path[str(rawbox)];nativepins=[]
  for request in box['requests']:
   p=request['imageResultContentDeduplication'];frozen=actual_by_path[p['nativeImagePath']];assert frozen['sha256']==p['sha256']and frozen['bytes']==p['bytes'];nativepins.append({k:frozen[k]for k in ['sha256','bytes','snapshotPath']})
  materialization={'schema':'cqc.exact-lossless-native-image-request-JSON/1','recipeSnapshotPath':current['snapshotPath'],'recipeSHA256':current['sha256'],'sourcePNGPins':nativepins,'expectedOriginalSHA256':recipe['priorRawJSONSHA256'],'expectedOriginalBytes':recipe['priorRawJSONBytes'],'rawJSONReconstructedOnlyInProcessMemory':True,'allInputsUsePersistentFrozenCAS':True}
  append(rawbox,raw,PREFIX+str(rawbox).lstrip('/')+'.before-result-dedup-original.json',{'sourceCurrentRecipePath':str(rawbox),'recipeSHA256':SHA(rawbox.read_bytes()),'priorOriginalSHA256':recipe['priorRawJSONSHA256'],'priorOriginalBytes':recipe['priorRawJSONBytes'],'reconstructionExactSHA256Verified':True,'originalJSONKeyOrderAndEncodingVerified':True,'virtualHistoricalVersionOnlyCurrentCondensedSourceUnchanged':True,'frozenMaterializationRecipe':materialization})
 grouped={}
 for row in rows:
  blob=grouped.setdefault(row['sha256'],{k:row[k]for k in ['sha256','gitBlobSHA1','bytes','snapshotPath']});blob.setdefault('allPathMappings',[]).append({k:v for k,v in row.items()if k not in ['sha256','gitBlobSHA1','bytes','snapshotPath']})
  if row.get('virtualRawJSONReconstruction'):blob['virtualRawJSONReconstruction']=row['virtualRawJSONReconstruction']
 new=[row for row in grouped.values()if row['sha256']not in prior['sourceContent']]
 inventory={'schema':'cqc.pass20.whitelisted-source-inventory/1','status':'frozen-whitelisted-source-bytes'if args.freeze else'draft-source-scan-not-final-freeze','authorizedRoots':list(map(str,AUTHORIZED_ROOTS)),'exactGeneratedSourcePaths':list(map(str,sorted(known_tools))),'exactAPPAllowlistFromFrozenLocalRelease':exact_app,'sourcePathMappings':rows,'uniqueSourceBlobCount':len(grouped),'newUniqueSourceBlobCount':len(new),'newUniqueSourceBytes':sum(row['bytes']for row in new),'excludedPaths':excluded_rows,'literalSecretFindings':secret_findings,'sourceQualityQualifications':quality,'snapshotVerifiesBytesAndPathsOnly':True,'qualifiedFailedAndSupersededReportsRetainOriginalBytes':True,'noLocalEvictions':True,'noAPPOrRMutations':True}
 assert not secret_findings,'Literal credential format found; do not print/publish content'
 snapshot={'schema':'cqc.pass20.immutable-source-snapshot/1','status':'ready-for-root-exact-plan-review'if args.freeze else'draft-persistent-CAS-prefill','sourceBlobs':sorted(grouped.values(),key=lambda row:row['sha256']),'sourcePathMappingCount':len(rows),'sourceUniqueBytes':sum(row['bytes']for row in grouped.values()),'sourceQualityQualifications':quality,'persistentCASDirectories':[str(CAS),str(TMP_CAS)],'allCASBytesSHA256GitSHA1SizeVerified':True,'virtualBoxOriginalExactBytesReconstructableFromPersistentCAS':True,'noLocalSourceEvictions':True}
 if not args.freeze:
  for name,value in [('DRAFT_SOURCE_INVENTORY_V2.json',inventory),('DRAFT_IMMUTABLE_SOURCE_SNAPSHOT_V2.json',snapshot),('DRAFT_PREVIOUS_PRESERVATION_DERIVED_MAP_V2.json',prior)]:p=ROOT/name;p.parent.mkdir(exist_ok=True);p.write_text(json.dumps(value,ensure_ascii=False,indent=2)+'\n')
  print(json.dumps({'status':'draft-prepared-persistent-storage','sourcePaths':len(rows),'uniqueBlobs':len(grouped),'newBytes':inventory['newUniqueSourceBytes'],'exactToolPaths':len(known_tools),'APPReleaseAvailable':release.exists(),'CASDirectories':[str(CAS),str(TMP_CAS)],'raw35MBFileDuplicated':False,'remoteMutations':False}));return
 freeze_path=ROOT/'ROOT_PASS20_SOURCE_FREEZE_RECEIPT_V1.json';freeze=json.loads(freeze_path.read_bytes());assert freeze['reviewedBy']=='/root'and freeze['expectedPreservationParent']==PARENT and freeze['finalSourcesFrozen']is True
 assert release.exists() and exact_app
 indexed={(r['localPath'],r['sha256'])for r in rows}
 for pin in freeze['finalArtifacts']:assert (pin['path'],pin['sha256'])in indexed,'Final Root artifact not in frozen source inventory'
 save(ROOT/METADATA[0],inventory);save(ROOT/METADATA[1],snapshot)
 prior_path=ROOT/'PRESERVATION_PREVIOUS_DERIVED_MAP_ACTUAL_V1.json';save(prior_path,prior)
 readme=('PASS20 original sources and exact failed/superseded evidence are preserved unchanged.\n\nThis snapshot certifies bytes, paths and immutable source version retention, not art perfection or universal gameplay PASS. It appends regular files to '+BRANCH+' at parent '+PARENT+'; all previous2977 paths stay identical.\n\nGenerated source aliases are resolved byte-for-byte into regular immutable CAS files. Their local aliases are preserved untouched. The previous35,519,420-byte Box generation-request JSON is reconstructed with exact SHA256 from the current explicit reversible dedup recipe plus all12 original PNG files; the condensed current JSON and exact reconstructed original are stored as separate qualified versions. No prompts or rejected image bytes are omitted.\n\nOnly seven explicit PASS20 roots, individually reported imagegen paths and the exact changed public/CQC file allowlist from the frozen release receipt are scanned. User browser profiles, caches, credential/environment files and operational logs are excluded. Future publication receipts and later added files are outside this snapshot.\n')
 (ROOT/METADATA[5]).write_text(readme)
 code_names=['preservation_common_v1.py','prepare_preservation_v1.py','publish_preservation_v1.py','verify_preservation_v1.py']
 plan={'schema':'cqc.pass20.exact-source-preservation-plan/1','repository':REPOSITORY,'branch':BRANCH,'expectedParent':PARENT,'versionedPathPrefix':PREFIX,'metadataPathPrefix':PREFIX+'metadata/','metadataNames':METADATA,'metadataFiles':6,'authorizedRoots':list(map(str,AUTHORIZED_ROOTS)),'exactGeneratedSourcePaths':inventory['exactGeneratedSourcePaths'],'exactAPPAllowlistFromFrozenLocalRelease':exact_app,'newVersionedSourcePathMappings':len(rows),'sourceUniqueBlobsToVerify':len(grouped),'newUniqueSourceBlobs':len(new),'newUniqueSourceBytes':inventory['newUniqueSourceBytes'],'expectedFinalRegularTreeFiles':2977+len(rows)+6,'sourceSHA256s':sorted(grouped),'inventoryPath':str(ROOT/METADATA[0]),'inventorySHA256':SHA((ROOT/METADATA[0]).read_bytes()),'snapshotReceiptPath':str(ROOT/METADATA[1]),'snapshotReceiptSHA256':SHA((ROOT/METADATA[1]).read_bytes()),'rootSourceFreezeReceiptPath':str(freeze_path),'rootSourceFreezeReceiptSHA256':SHA(freeze_path.read_bytes()),'priorDerivedMapPath':str(prior_path),'priorDerivedMapSHA256':SHA(prior_path.read_bytes()),'codePins':[{'path':str(ROOT/name),'sha256':SHA((ROOT/name).read_bytes())}for name in code_names],'fixedMetadataPins':[{'name':METADATA[i],'sha256':SHA((ROOT/METADATA[i]).read_bytes())}for i in [0,1,3,5]],'oneCommitBatch':True,'rootExactPlanApprovalRequiredBeforePOST':True,'noLocalEvictions':True,'noAPPOrRFilesChanged':True,'allPrior2977PathsUnchangedRequired':True,'sourceQualityQualifications':quality,'preservationVerifiesBytesAndPathsOnly':True,'doesNotConvertFailedOrQualifiedReportsToGenericPASS':True,'snapshotDoesNotClaimFutureAdditions':True}
 save(ROOT/METADATA[2],plan);print(json.dumps({'status':'ready-for-root-exact-plan-review','planPath':str(ROOT/METADATA[2]),'planSHA256':SHA((ROOT/METADATA[2]).read_bytes()),'sourcePaths':len(rows),'sourceBlobs':len(grouped),'newBytes':inventory['newUniqueSourceBytes'],'regularFinalFiles':plan['expectedFinalRegularTreeFiles'],'noRemotePOST':True}))
if __name__=='__main__':main()
