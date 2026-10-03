#!/usr/bin/env python3
"""Read only closed named deliveries; pin an explicit portable phase-one plan.
Never creates ZIPs, GO, or snapshots of an open producer/project.
"""
import hashlib, importlib.util, json, subprocess, zipfile, zlib
from pathlib import Path
from datetime import datetime, timezone
HERE=Path(__file__).parent
s=importlib.util.spec_from_file_location('archive',HERE/'archive_pass14_lossless_v3.py'); A=importlib.util.module_from_spec(s);s.loader.exec_module(A)
REPO=Path('/workspace/shadow-codec-recovered'); COMMIT='1556221aeb9c1b6e3c4ccbbdb4d4339c351dbd12'
PUBLISHED=REPO/'docs/cqc-reprise/pass13/lossless'
D_INDEX=Path('/workspace/cqc-future-machine-preservation-v1/metal-gear-d/native-parts-lossless-v1/actual-01/LOSSLESS_RECONSTRUCTION_INDEX.json')
S_INDEX=Path('/workspace/cqc-future-stage-preservation-v1/rex-hangar/CANDIDATE_PRESERVATION_MANIFEST.json')
D_OLD=Path('/tmp/cqc-next-metal-gear-d-native-parts-preparation-v1'); S_OLD=Path('/tmp/cqc-next-mgs1-rex-hangar/preparation')
DELIVERIES=[
 ('D-native',Path('/tmp/cqc-pass14-mgd-native'),'CLOSED_NATIVE_DELIVERY_V1.json'),
 ('D-rig-V2-with-observed-V1',Path('/tmp/cqc-pass14-mgd-rig'),'CLOSED_RIG_CANDIDATE_DELIVERY_V2.json'),
 ('REX-stage-V2',Path('/tmp/cqc-pass14-rex-stage'),'REX_STAGE_DELIVERY_V2.json'),
 ('TX-native',Path('/tmp/cqc-pass14-tx55-native'),'DELIVERY_CLOSED.json'),
 ('D-synthetic-V1-rejection',Path('/tmp/cqc-pass14-browser-proofs/mgd-synthetic-01'),'CLOSED_SYNTHETIC_PHYSICAL_REVIEW_V1.json'),
 ('D-synthetic-V2',Path('/tmp/cqc-pass14-browser-proofs/mgd-synthetic-02'),'CLOSED_SYNTHETIC_PHYSICAL_REVIEW_V2.json'),
 ('REX-stage-synthetic',Path('/tmp/cqc-pass14-browser-proofs/rex-stage-synthetic-01'),'CLOSED_SYNTHETIC_STAGE_PHYSICAL_REVIEW_V1.json')]
rows={};aliases=[];toolaliases=[];checks=[];closures=[];oldchecks=[];historical=[];data_cache={}
def pin(p):
 p=Path(p); b=A.file_bytes(p); data_cache[str(p)]=b
 return {'path':str(p),'bytes':len(b),'sha256':A.sha(b)}
def expect(p,d,label):
 got=pin(p)
 assert got['sha256']==d['sha256'] and ('bytes' not in d or got['bytes']==d['bytes']), (label,str(p),got,d)
 checks.append({'label':label,**got,'verified':True});return got

def add(p,role,expected=None):
 p=Path(p)
 assert p.is_file() and not p.is_symlink(),str(p)
 got=expect(p,expected,role) if expected else pin(p)
 rows[str(p)]={**got,'producerState':'closed','role':role};return got

def read(p):return json.loads(Path(p).read_text())
for label,root,name in DELIVERIES:
 closure=read(root/name)
 assert closure.get('closed') is True or (closure.get('status')=='closed-immutable-input-delivered' and closure.get('subsequentEditsAllowed') is False),label
 closurepin=pin(root/name);closures.append({'label':label,**closurepin,'closed':True})
 before=len(rows)
 for p in sorted(root.rglob('*')):
  if p.is_symlink():
   target=p.resolve(strict=True);b=A.file_bytes(target)
   aliases.append({'sourcePath':str(p),'linkTargetLiteral':str(p.readlink()),'targetSourcePath':str(target),'bytes':len(b),'sha256':A.sha(b),'producerState':'closed'})
  elif p.is_file():add(p,label)
 declared=closure.get('files_before_closure',closure.get('files',closure.get('filePins',[])))
 if label=='TX-native':declared=read(root/'metadata/FILE_INVENTORY.json')['files']
 for d in declared:
  if d.get('kind')=='symlink' or d.get('symlink') is True:continue
  p=d.get('path') or d.get('relativePath') or d.get('file')
  if p and 'sha256' in d:
   p=Path(p); p=p if p.is_absolute() else root/p
   expect(p,d,'producer-declared-pin:'+label)
 closures[-1]['regularFileCount']=len(rows)-before
 closures[-1]['regularBytes']=sum(v['bytes'] for p,v in rows.items() if Path(p).is_relative_to(root))
# Only explicit historical members necessary for D authoring/rig plus closed audit.
dold=read(D_INDEX); assert dold['actualRun'] and dold['closed']
dlookup={o['sha256']:o for o in dold['objects']}
dlogical={r['sourcePath']:r for r in dold['logicalSources']}
old_doc_names=['IMAGEGEN_NATIVE_ALL_ATTEMPTS_RECEIPT_V1.json','SOURCE_INPUT_RECEIPT_V1.json','SOURCE_CLOSED_ANATOMY_PLAN_V1.json','METAL_GEAR_D_NATIVE_PREPARATION_DELIVERY_V1.json','METAL_GEAR_D_NATIVE_PARTS_CANDIDATE_OBSERVATIONS_V1.json','METAL_GEAR_D_NATIVE_PREPARATION_V1.md','INDEPENDENT_PARTS_AUDIT_V1.json','INDEPENDENT_PARTS_AUDIT_V1.md','ANATOMY_REVIEW_AMENDMENT_V3.json','STRICT_SEGMENTATION_REVIEW_CLOSE_V1.json','BODY_ALPHA_OUTLYING_STRIPS_READONLY_V1.json','POD_AXIS_AMENDMENT_V1.json']
old_attempts=read(D_OLD/'IMAGEGEN_NATIVE_ALL_ATTEMPTS_RECEIPT_V1.json')['attempts']
for attempt in old_attempts:
 for name in [attempt['local_file'],attempt['prompt_file']]+attempt.get('referenced_image_identities',[]):
  if name.startswith('exec-'):continue # tool aliases below map exact bytes, never duplicate PNG
  p=D_OLD/name
  row=dlogical[str(p)]; add(p,'portable-D-existing-closed-member',{'sha256':row['objectSHA256'],'bytes':row['bytes']})
for name in old_doc_names:
 p=D_OLD/name;row=dlogical[str(p)];add(p,'portable-D-linked-closed-anatomy-and-native-metadata',{'sha256':row['objectSHA256'],'bytes':row['bytes']})
# Selected old stage four are already in new closed producer; carry original three rejects and prompts by exact manifest paths.
sold=read(S_INDEX);assert sold['closed']
slogical={r['source']['path']:r['source'] for r in sold['logicalFiles']};slookup={o['sha256']:o for o in sold['objects']}
for name in ['generations/master-01.png','generations/back-01.png','generations/architecture-01.png','prepare_candidate.py','REX_REFERENCE_FILE_MAPPINGS.json','REX_NATIVE_COPY_CHECKS_01.json']:
 p=S_OLD/name;add(p,'portable-REX-existing-rejected-native-or-authoring-metadata',slogical[str(p)])
# Verify old immutable archive members actually used, independent of disk source.
needed_d=set(v['sha256'] for v in rows.values())&set(dlookup)
needed_s=set(v['sha256'] for v in rows.values())&set(slookup)
for digest in sorted(needed_d):
 o=dlookup[digest];loc={k:o[k] for k in ['archivePath','archiveMember','bytes','sha256']}; b,crc=A.read_member(loc)
 assert b==next(data_cache[p] for p,v in rows.items() if v['sha256']==digest)
 oldchecks.append({'kind':'D-existing-closed-member','objectSHA256':digest,'bytes':len(b),'members':[{**loc,'crc32':f'{crc:08x}'}],'sourceEqual':True})
for digest in sorted(needed_s):
 o=slookup[digest];members=[];pieces=[]
 for frag in sorted(o['fragments'],key=lambda x:x['offset']):
  loc={'archivePath':str(S_INDEX.parent/frag['zipPart']),'archiveMember':frag['entry'],'bytes':frag['bytes'],'sha256':frag['sha256'],'offset':frag['offset']}
  b,crc=A.read_member(loc);pieces.append(b);members.append({**loc,'crc32':f'{crc:08x}'})
 b=b''.join(pieces);assert len(b)==o['bytes'] and A.sha(b)==digest
 assert b==next(data_cache[p] for p,v in rows.items() if v['sha256']==digest)
 oldchecks.append({'kind':'REX-existing-closed-member','objectSHA256':digest,'bytes':len(b),'members':members,'sourceEqual':True})
# Native tool aliases physically verified, without traversal of generated_images.
new_d=read(Path('/tmp/cqc-pass14-mgd-native/IMAGEGEN_ALL_THREE_NATIVE_ATTEMPTS_RECEIPT_V1.json'))['attempts']
for base,attempts in [(D_OLD,old_attempts),(Path('/tmp/cqc-pass14-mgd-native'),new_d)]:
 for attempt in attempts:
  local=Path(attempt['local_file']);local=local if local.is_absolute() else base/local
  a=expect(attempt['native_tool_path'],attempt,'native-tool-original:D')
  assert data_cache[a['path']]==data_cache[str(local)]
  toolaliases.append({**a,'preservedSourcePath':str(local),'byteIdentical':True})
for request in read('/tmp/cqc-pass14-tx55-native/metadata/generation-requests-native-results.json')['requests']:
 local=Path(request['preservedFile']);local=local if local.is_absolute() else Path('/tmp/cqc-pass14-tx55-native')/local
 a=expect(request['outputToolPath'],{'sha256':request['outputSha256'],'bytes':request['outputBytes']},'native-tool-original:TX')
 assert data_cache[a['path']]==data_cache[str(local)];toolaliases.append({**a,'preservedSourcePath':str(local),'byteIdentical':True})
 prompt=Path('/tmp/cqc-pass14-tx55-native')/request['promptFile'];expect(prompt,{'sha256':request['promptSha256']},'TX-transmitted-prompt')
for r in sold['logicalFiles']:
 p=r['source']['path'];digest=r['objectSHA256']
 if p.startswith('/workspace/generated_images/') and digest in needed_s:
  a=expect(p,r['source'],'native-tool-original:REX');local=next(p for p,v in rows.items() if v['sha256']==digest)
  assert data_cache[a['path']]==data_cache[local];toolaliases.append({**a,'preservedSourcePath':local,'byteIdentical':True})
# Validate exact browser bindings against final closed producer, including V1 rejection sources.
for label,root,name in DELIVERIES:
 if 'synthetic' not in label:continue
 report=read(root/'SYNTHETIC_PREVIEW_BROWSER_V1.json');assert report['actualRun'] and report['closed'] and not report['actualCombat']
 producer=Path('/tmp/cqc-pass14-rex-stage') if label.startswith('REX') else Path('/tmp/cqc-pass14-mgd-rig')
 for rel,d in report['sourceBindings'].items():expect(producer/rel,d,'synthetic-browser-source-binding:'+label)
# Confirm repository bytes match the published commit for every reusable ZIP/index.
tree=subprocess.check_output(['git','ls-tree','-r',COMMIT,'--','docs/cqc-reprise/pass13/lossless'],cwd=REPO,text=True)
gitrows={line.split('\t',1)[1]:line.split()[2] for line in tree.splitlines()}
publishedpins=[]
for rel,blob in gitrows.items():
 p=REPO/rel;b=A.file_bytes(p)
 assert hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==blob,rel
 if p.suffix=='.zip' or p.name.startswith('LOSSLESS_RECONSTRUCTION_INDEX'):
  publishedpins.append({'repositoryPath':rel,'bytes':len(b),'sha256':A.sha(b),'publishedGitBlobSHA1':blob,'publishedCommit':COMMIT})
public_objects={}
for name in ['LOSSLESS_RECONSTRUCTION_INDEX.json','LOSSLESS_RECONSTRUCTION_INDEX_V2.json','LOSSLESS_RECONSTRUCTION_INDEX_V3.json']:
 idx=read(PUBLISHED/name);assert idx['actualRun'] and idx['closed']
 for o in idx['objects']:
  if o['sha256'] in public_objects:continue
  zip_path=PUBLISHED/o['archivePart'];rel=str(zip_path.relative_to(REPO));assert rel in gitrows
  public_objects[o['sha256']]={'sha256':o['sha256'],'bytes':o['bytes'],'archivePath':str(zip_path),'archiveMember':o['archiveMember'],'archiveRepositoryPath':rel}
unique={v['sha256']:{'sha256':v['sha256'],'bytes':v['bytes']} for v in rows.values()};reused=[]
for digest in sorted(set(unique)&set(public_objects)):
 loc=public_objects[digest];b,crc=A.read_member(loc)
 assert b==next(data_cache[p] for p,v in rows.items() if v['sha256']==digest)
 reused.append({**loc,'crc32':f'{crc:08x}','sourceBytesEqual':True})
# Historical Core pins describe the prior engine, never assert equality with newly integrated R.
for d in read('/tmp/cqc-pass14-mgd-rig/OLD_SOURCE_PINS.json'):
 loc=public_objects.get(d['sha256'])
 if loc:
  b,crc=A.read_member(loc);assert len(b)==d['bytes'];historical.append({**d,'currentProductionEqualityAsserted':False,'recoverableFromPublishedGit':True,'location':{**loc,'crc32':f'{crc:08x}'}})
 else:
  rel='public/cqc/'+str(Path(d['path']).relative_to('/workspace/cqc-game-working/cqc-versus-v056'))
  b=subprocess.check_output(['git','show',COMMIT+':'+rel],cwd=REPO)
  assert len(b)==d['bytes'] and A.sha(b)==d['sha256']
  target=HERE/'historical-published-baseline'/Path(rel).relative_to('public/cqc');target.parent.mkdir(parents=True,exist_ok=True)
  if target.exists():assert target.read_bytes()==b
  else:target.write_bytes(b)
  add(target,'four-explicit-published-historical-base-files-no-live-production-snapshot',d)
  historical.append({**d,'currentProductionEqualityAsserted':False,'recoverableFromPublishedGit':True,'publishedCommit':COMMIT,'publishedRepositoryPath':rel,'preservedHistoricalCopy':str(target)})
# Validate symlink byte identities and require every alias target included in explicit rows.
for alias in aliases:
 assert alias['targetSourcePath'] in rows and rows[alias['targetSourcePath']]['sha256']==alias['sha256'],alias
# Preserve previous closed quality audit (named files only; no subroot traversal).
for name in ['QUALITY_PREPARATION_DELIVERY_V1.json','QUALITY_CANON_READONLY_AUDIT_V1.md','QUALITY_CANON_READONLY_AUDIT_V1.json','READONLY_SOURCE_OBSERVATION_V1.json','RUNTIME_AND_PRESERVATION_WHITELIST_GUIDANCE_V1.json','PRIOR_CLOSED_MEMBER_VERIFICATION_V1.json','archive_pass14_lossless.py','archive_selftest.py','ARCHIVER_ACTUAL_SYNTHETIC_VERIFICATION_V1.json','ARCHIVER_USAGE.md','QUALITY_CANON_STAGE_ADDENDUM_V2.md','QUALITY_STAGE_ADDENDUM_DELIVERY_V2.json']:
 add(HERE.parent/name,'closed-quality-readonly-audit-and-tool-preparation')
# New scripts are closed only after this plan passes; pin current exact bytes in the explicit spec.
for name in ['archive_pass14_lossless_v3.py','archive_selftest_v3.py','ARCHIVER_ACTUAL_SYNTHETIC_VERIFICATION_V3.json','prepare_closed_archive_plan_v3.py']:
 add(HERE/name,'closed-phase-one-archiver-tool-and-real-synthetic-proof')
unique={v['sha256']:{'sha256':v['sha256'],'bytes':v['bytes']} for v in rows.values()}
reused_digests={v['sha256'] for v in reused};new=[v for k,v in unique.items() if k not in reused_digests];bins=A.pack_objects(new)
prior_path=HERE/'PORTABLE_PUBLISHED_PASS13_REUSE_INDEX_V3.json'
A.dump(prior_path,{'schema':'cqc.pass14.normalized-published-pass13-reuse/1','actualRun':True,'closed':True,'publishedCommit':COMMIT,'publishedPins':publishedpins,'objects':reused,'priorArchivesUnmodified':True,'selectedMembersActuallyCRCBytesSHAAndEqualityVerified':True})
roots=sorted({str(root) for _,root,_ in DELIVERIES}|{str(D_OLD),str(S_OLD),str(HERE.parent)})
spec={'schema':'cqc.pass14.closed-lossless-source-spec/1','closed':True,'phase':'phase-one-closed-producers-and-synthetic-evidence','maximumLogicalInputBytes':128*1024*1024,'allowedRoots':roots,'priorIndexes':[str(prior_path)],'files':sorted(rows.values(),key=lambda r:r['path']),'logicalSymlinkAliases':aliases,'externalNativeToolAliases':toolaliases,'sourceClosureEvidence':closures,'historicalSourceReferences':historical,'portableRepositoryArchiveBase':'docs/cqc-reprise/pass14/lossless','archivePrefix':'pass14-phase1-lossless','forbiddenOpenProducers':['/tmp/cqc-pass14-tx55-rig','/tmp/cqc-pass14-browser-proofs parent','Root actual QA/runtime snapshots until explicit closure'],'noProjectOrDependencySnapshot':True}
assert sum(v['bytes'] for v in rows.values())<=128*1024*1024
A.dump(HERE/'CLOSED_SOURCE_SPEC_PHASE1_V3.json',spec)
plan={'schema':'cqc.pass14.closed-archive-plan/3','actualArchivesCreated':False,'createdUTC':datetime.now(timezone.utc).isoformat(),'closedSourceSpec':pin(HERE/'CLOSED_SOURCE_SPEC_PHASE1_V3.json'),'portablePriorIndex':pin(prior_path),'closures':closures,'counts':{'logicalFiles':len(rows),'logicalBytes':sum(v['bytes'] for v in rows.values()),'uniqueObjects':len(unique),'uniqueBytes':sum(v['bytes'] for v in unique.values()),'publishedReusedObjects':len(reused),'publishedReusedBytes':sum(v['bytes'] for v in reused),'newObjects':len(new),'newObjectBytes':sum(v['bytes'] for v in new),'newVolumes':len(bins),'minimumVolumesLowerBound':A.minimum_volumes(new),'predictedExactStoredZIPBytes':sum(v['exactZIPBytes'] for v in bins),'symlinkAliases':len(aliases),'nativeToolAliases':len(toolaliases),'oldFutureMembersActuallyRead':len(oldchecks),'historicalProductionPinsRecoverable':len(historical)},'newVolumePlan':bins,'volumeLimitBytes':A.LIMIT,'globalInputCeilingBytes':128*1024*1024,'publishedZIPs':publishedpins,'futureArchivePortability':'No external future ZIP required: needed old D/REX objects become new stored chunks unless their SHA exists in published docs13. No entire old archive copied/recompressed.','outputAfterRootGO':'/tmp/cqc-pass14-production-preservation-v1/phase1-actual-01','phase2':'Only after Root closes TX rig, local actual browser evidence and Root posttests; create a NEW index/volume extension reusing phase1/docs13.','publicPostPublication':'Separate later extension after public verification closure; no new runtime publication implied.','producerPinsChecked':checks,'oldFutureArchiveMembersVerified':oldchecks,'historicalSourceReferences':historical,'qualityPreparationImmutable':True,'noOpenRootProducerFreeze':True,'GOAlreadyGranted':False}
A.dump(HERE/'CLOSED_ARCHIVE_PLAN_PHASE1_V3.json',plan)
print(json.dumps(plan['counts'],indent=2))
