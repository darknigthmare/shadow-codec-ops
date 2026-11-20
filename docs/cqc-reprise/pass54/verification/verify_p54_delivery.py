#!/usr/bin/env python3
"""Independent P54 read-only source/runtime verification. Final mode requires Root freeze and actual browser evidence."""
from pathlib import Path
import argparse, collections, concurrent.futures, datetime, hashlib, json, math, os, struct, subprocess, sys, zipfile, zlib, xml.etree.ElementTree as ET
from PIL import Image

ROOT=Path('/tmp/cqc-p54-20261120'); BASE_COMMIT='04221faf7933b4a33cf63e3859533639f010723e'
BASE=ROOT/'verification/baseline'; V=ROOT/'verification'
OLD_XLSX=Path('/workspace/cqc-static-20261113/livraison-finale/CQC_SUIVI_P52_POSES_UNIQUES_20261114_PUBLIC_V1.xlsx')
NEW_UIDS={'p54__hi_tech_mgs2','p54__pequod_tpp'}
GUARD_REQUEST='2ad07afa-f04b-4f06-838f-ec4720c63e3e'


def sha(data):return hashlib.sha256(data).hexdigest()
def git_oid(data):return hashlib.sha1(b'blob '+str(len(data)).encode()+b'\0'+data).hexdigest()
def read_exact(path):
 p=Path(path)
 with os.fdopen(os.open(p,os.O_RDONLY|os.O_NOATIME|os.O_NOFOLLOW),'rb')as f:
  before=os.fstat(f.fileno());data=f.read();after=os.fstat(f.fileno())
 assert before==after and p.stat()==before,'File changed during read: '+str(p)
 return data

def hash_file(path):
 p=Path(path);h=hashlib.sha256();g=hashlib.sha1();size=p.stat().st_size;g.update(b'blob '+str(size).encode()+b'\0')
 with os.fdopen(os.open(p,os.O_RDONLY|os.O_NOATIME|os.O_NOFOLLOW),'rb')as f:
  before=os.fstat(f.fileno())
  while b:=f.read(1024*1024):h.update(b);g.update(b)
  after=os.fstat(f.fileno())
 assert before==after and p.stat()==before,'File changed during hash: '+str(p)
 return {'sha256':h.hexdigest(),'gitBlobOID':g.hexdigest(),'bytes':size,'stat':[before.st_ino,before.st_size,before.st_mtime_ns,before.st_ctime_ns]}


def check_png(row):
 p=Path(row['path']);raw=read_exact(p);assert raw[:8]==b'\x89PNG\r\n\x1a\n','Wrong PNG magic';assert sha(raw)==row['SHA256'],'Source SHA differs'
 width,height=struct.unpack('>II',raw[16:24]);assert [width,height]==[row['width'],row['height']],'Dimensions differ'
 offset=8;chunks=0
 while offset<len(raw):
  assert offset+12<=len(raw),'Truncated PNG chunk';size=struct.unpack('>I',raw[offset:offset+4])[0];assert offset+size+12<=len(raw),'Truncated PNG payload'
  assert zlib.crc32(raw[offset+4:offset+size+8])&0xffffffff==struct.unpack('>I',raw[offset+size+8:offset+size+12])[0],'PNG CRC differs';offset+=size+12;chunks+=1
 assert offset==len(raw)
 with Image.open(p)as im:
  assert im.size==(width,height);im.load();rgba=im.convert('RGBA');alpha=rgba.getchannel('A');strong=alpha.point(lambda n:255 if n>16 else 0);bb=strong.getbbox();assert bb,'Empty strong-alpha source'
  x,y,w,h=row['sourceRect'];assert all(isinstance(n,(int,float))and math.isfinite(n)for n in [x,y,w,h]);assert x>=0 and y>=0 and w>0 and h>0 and x+w<=width and y+h<=height,'Invalid Source rect'
  assert bb[0]>=x and bb[1]>=y and bb[2]<=x+w and bb[3]<=y+h,'Strong-alpha source clipped by selected frame'
  assert 0<bb[0] and 0<bb[1] and bb[2]<width and bb[3]<height,'Strong-alpha silhouette touches raw canvas edge; full body needs review'
  ax,fy=row['anchorX'],row['footY'];assert all(isinstance(n,(int,float))and math.isfinite(n)for n in [ax,fy]);assert x<=ax<=x+w and y<=fy<=y+h,'Support point outside source frame'
  body=row.get('bodyBounds')or[x,y,w,h];assert len(body)==4 and body[2]>0 and body[3]>0
  # Contain without stretching; wide machines/long weapons may be width limited.
  scale=min(300/body[3],144/max(ax-bb[0],bb[2]-ax,1));projected=[160+(bb[0]-ax)*scale,340+(bb[1]-fy)*scale,160+(bb[2]-ax)*scale,340+(bb[3]-fy)*scale]
  assert projected[0]>=0 and projected[2]<=320 and projected[1]>=0 and projected[3]<=360,'Preview geometry would clip strong alpha'
  corners=[alpha.getpixel(q)for q in [(0,0),(width-1,0),(0,height-1),(width-1,height-1)]]
 return {'id':row['id'],'uid':row['uid'],'path':str(p),'sha256':sha(raw),'gitBlobOID':git_oid(raw),'bytes':len(raw),'width':width,'height':height,'pngCRCChunks':chunks,'decoded':True,'sourceRect':row['sourceRect'],'strongBoundsXYXY':list(bb),'cornerAlpha':corners,'previewContainScale':scale,'projectedBounds320x360':projected,'sourcePixelsModified':False}


def main():
 ap=argparse.ArgumentParser(description=__doc__);ap.add_argument('--mode',choices=['provisional','final'],default='provisional');ap.add_argument('--root',type=Path,default=ROOT);ap.add_argument('--workers',type=int,choices=range(1,5),default=3);ap.add_argument('--allowlist',type=Path);ap.add_argument('--freeze',type=Path);ap.add_argument('--browser-report',type=Path);ap.add_argument('--workbook',type=Path);args=ap.parse_args()
 root=args.root;project=root/'project';runtime=project/'public/cqc';out=root/'verification';out.mkdir(exist_ok=True);errors=[];pending=[];warnings=[];inputs={};stats={};metrics={}
 def fail(reason,**detail):errors.append(dict(reason=reason,**detail))
 def check(ok,reason,**detail):
  if not ok:fail(reason,**detail)
 def late(ok,reason,**detail):
  if not ok:(fail if args.mode=='final'else lambda r,**d:pending.append(dict(reason=r,**d)))(reason,**detail)
 def load(path):
  path=Path(path);raw=read_exact(path);inputs[str(path)]=sha(raw);return json.loads(raw)
 def optional(path):return load(path)if path and path.is_file()else None
 def guarded(fn,reason,default=None):
  try:return fn()
  except Exception as exc:fail(reason,error=str(exc));return default
 inventory_path=root/'reporting/P54_NORMALIZED_SOURCE_INVENTORY_PRIVATE_V1.json';inventory=load(inventory_path);rows=inventory['rows'];selected_by_id={r['id']:r for r in rows};counts=collections.Counter(r['kind']for r in rows)
 check(len(selected_by_id)==len(rows),'Duplicate selected pose ID');check(len({r['SHA256']for r in rows})==len(rows),'One PNG silently counted as multiple selected drawings')
 late(len(rows)==21 and counts['costume']==19 and counts['character']==2,'Final selected target is21 rows=19costumes+2character bodies',rows=len(rows),counts=dict(counts))
 late(inventory.get('state')=='ROOT_FROZEN_SOURCE_INVENTORY','Source inventory is not Root-frozen')
 check(not any(r['id']=='OC-002'for r in rows),'Guarded OC002 has selected source');check(all(r.get('newAnimations')==0 and r.get('runtimeAdmittedByArtist')is False for r in rows),'Source artwork masquerades as animation/runtime admission');check(inventory['counts'].get('newGanderArt')==0,'Gander reused PNGs counted as new artwork')
 if args.freeze:
  freeze=load(args.freeze);late(freeze.get('state')=='ROOT_APPROVED_FROZEN_COUNTS','Freeze state incorrect');check(set(freeze.get('approvedSourceSHA256',[]))=={r['SHA256']for r in rows},'Selected Source hashes differ from Root freeze')
 else:freeze=None;late(False,'Final mode requires --freeze Root tracking contract')
 base_manifest=load(BASE/'P52_MANIFEST_PRIVATE_V1.json');base_uids={e['uid']for e in base_manifest['entries']};check(len(base_uids)==382,'P52 baseline UID cardinality differs');new_uids={r['uid']for r in rows if r['kind']=='character'};check(new_uids==NEW_UIDS and not new_uids&base_uids,'Source character IDs collide with baseline or differ from two qualified additions');check(all(r['uid']in base_uids for r in rows if r['kind']=='costume'),'Costume assigned to unknown or cross-incarnation UID')
 proofs=load(BASE/'BASELINE_INPUT_PROOFS_PRIVATE_V1.json')['rows'];p52proof=next(q for q in proofs if q['gitPath']=='docs/cqc-reprise/pass52/static-poses/catalogue/manifest.json');index_row=subprocess.check_output(['git','ls-files','--stage','--',p52proof['gitPath']],cwd=project).decode().strip();check(bool(index_row)and index_row.split()[1]==p52proof['gitBlobOID'],'Current Git index no longer preserves baseline P52 source catalogue')
 current_p52=project/p52proof['gitPath']
 if current_p52.is_file():check(sha(read_exact(current_p52))==p52proof['sha256'],'Current materialized P52 source catalogue changed')
 registry=load(out/'P54_EXACT_GENERATION_GUARD_REGISTRY_PRIVATE_V1.json');actual_old=[{'uid':e['uid'],'costumeId':e['costumeId'],'family':e['family'],'guard':e['generationGuard'],'oldSourcePresent':bool(e.get('source'))}for e in base_manifest['entries']if e.get('generationGuard')];check(actual_old==registry['inheritedP52Scopes'] and len(actual_old)==12,'Frozen P52 guard payloads changed')
 p53guard=load(project/'docs/cqc-reprise/pass53/animation-studies/generation-guard.json');check(p53guard==registry['inheritedP53WalkCorrectionScope'],'P53 refused walk-correction guard changed');newguard=load(root/'production/costumes-a/oc-002-generation-guard.json');check(newguard==registry['newOC002ActualInputRefusal'],'OC002 guard changed');check(newguard.get('requestID')==GUARD_REQUEST and newguard.get('newPNGs')==0 and newguard.get('retryAttempts')==0 and newguard.get('retryAllowed')is False,'OC002 refused request lacks exact no-retry record')
 forbidden={(r['uid'],r['costumeId'])for r in actual_old};scope_matches=[]
 for row in rows:
  # canonical costume IDs and generic invented family IDs retain separate identity.
  target_id=row.get('costumeId',row.get('costumeID',row.get('family')))
  if (row['uid'],target_id)in forbidden:scope_matches.append({'id':row['id'],'uid':row['uid'],'target':target_id})
  check(not(row['uid']==p53guard['uid']and row.get('action')==p53guard['action']),'Rejected P53 walk action is newly produced')
 check(not scope_matches,'Selected Source targets inherited guarded scope',matches=scope_matches)
 # Inspect every produced proposal, including archived/held alternatives, so a
 # refused scope cannot hide merely by being omitted from the selected gallery.
 produced_guard_matches=[];produced_proposals=[]
 for artifact in sorted((root/'production').rglob('*ARTIFACT_PROPOSAL*.json')):
  document=load(artifact)
  if not isinstance(document,dict)or not isinstance(document.get('rawPNG'),dict):continue
  source=document['rawPNG'];slots=document.get('slots')or[document]
  for slot in slots:
   uid=slot.get('uid',document.get('uid'));costume=slot.get('costumeId',slot.get('costumeID',document.get('costumeId',document.get('costumeID',document.get('family')))))
   produced_proposals.append({'path':str(artifact),'uid':uid,'costumeId':costume,'sha256':source.get('sha256')})
   if (uid,costume)in forbidden or document.get('id')=='OC-002':produced_guard_matches.append(produced_proposals[-1])
   if uid==p53guard['uid']and document.get('action',slot.get('action'))==p53guard['action']:produced_guard_matches.append(produced_proposals[-1])
 check(not produced_guard_matches,'Produced/held proposal targets a frozen guard',matches=produced_guard_matches)
 check(not list((root/'production').rglob('oc-002*raw*.png')),'OC002 refused target nevertheless has a raw PNG')
 # Evidence-limited attempt audit: inspect structured current generation contracts,
 # not prose mentions of excluded guards, and never claim visibility into absent logs.
 attempts=[]
 for f in sorted((root/'production').rglob('*guard*.json')):
  if f.name=='oc-002-generation-guard.json':continue
  d=load(f)
  if isinstance(d,dict)and d.get('kind','').startswith('image-generation-'):attempts.append({'path':str(f),'kind':d['kind'],'requestID':d.get('requestID',d.get('requestId'))})
 check(not attempts,'Additional actual generation guard must be reconciled explicitly',records=attempts)
 briefs=load(BASE/'P53_OC20_BRIEFS_PRIVATE_V1.json')['entries'];brief_ids={r['id']for r in briefs};check(brief_ids=={'OC-%03d'%i for i in range(1,21)},'Historical20OC briefs differ')
 selected_oc={r['id']for r in rows if r['kind']=='costume'};late(selected_oc==brief_ids-{'OC-002'},'Not all19 unguarded OC briefs have selected Source',pendingIDs=sorted(brief_ids-selected_oc-{'OC-002'}))
 dispositions=[{'id':ident,'state':'selected_new_static_source'if ident in selected_oc else'actual_input_refusal_no_png'if ident=='OC-002'else'pending_source','uid':next(x['uid']for x in briefs if x['id']==ident)}for ident in sorted(brief_ids)]
 v2path=root/'production/costumes-b/OC-010_ARTIFACT_PROPOSAL_PRIVATE_V2.json';v2=optional(v2path);held_check=None
 if v2:
  held=v2.get('supersedesHeldVersion1',{});oldhash=held.get('sourceSHA256');current=selected_by_id.get('OC-010');check(held.get('held')is True and current and current['SHA256']==v2['rawPNG']['sha256'] and current['SHA256']!=oldhash,'OC010 held worn exoskeleton incorrectly selected');held_check={'oldSHA256':oldhash,'selectedSHA256':current['SHA256']if current else None,'heldNotSelected':bool(current and current['SHA256']!=oldhash)}
 else:late(False,'OC010 v2 machine-only contract absent')
 source_checks=[]
 with concurrent.futures.ThreadPoolExecutor(max_workers=args.workers)as pool:
  tasks=[(row,pool.submit(check_png,row))for row in rows]
  for row,task in tasks:
   try:source_checks.append(task.result())
   except Exception as exc:fail('Selected PNG source integrity/frame check failed',id=row['id'],error=str(exc))
 ledger=load(root/'publication/SOURCE_COMMITS_PRIVATE_V1.json');ledger_by_hash=collections.defaultdict(list)
 for r in ledger['rows']:ledger_by_hash[r['sha256']].append(r)
 raw_ledger_checks=[]
 for receipt in ledger['rows']:
  try:
   p=Path(receipt['preservedPath']);actual=hash_file(p)
   check(receipt.get('rawBytesReadBackExact')is True and actual['sha256']==receipt['sha256']and actual['gitBlobOID']==receipt['gitBlobOID']and actual['bytes']==receipt['bytes'],'Source ledger preserved bytes or immutable Git object mismatch',path=str(p))
   check(receipt['gitPath'].startswith('docs/cqc-reprise/pass54/raw-source-generations/'),'Raw Source Git path escapes owned P54 preservation prefix',path=receipt['gitPath'])
   raw_ledger_checks.append({'path':str(p),'sha256':actual['sha256'],'gitBlobOID':actual['gitBlobOID'],'bytes':actual['bytes'],'commit':receipt['commit']})
  except Exception as exc:fail('Preserved raw source in Git ledger unreadable',path=receipt.get('preservedPath'),error=str(exc))
 source_ledger_checks=[]
 for row in source_checks:
  options=ledger_by_hash.get(row['sha256'],[]);good=[r for r in options if r.get('rawBytesReadBackExact')and r['gitBlobOID']==row['gitBlobOID']and r['bytes']==row['bytes']]
  check(bool(good),'Selected raw PNG lacks exact immutable Git source receipt',id=row['id'],sha256=row['sha256'])
  if good:source_ledger_checks.append({'id':row['id'],'sha256':row['sha256'],'gitBlobOID':row['gitBlobOID'],'commit':good[0]['commit'],'gitPath':good[0]['gitPath'],'exactRawReadback':True})
 if held_check:check(bool(ledger_by_hash.get(held_check['oldSHA256'])),'Superseded OC010 v1 raw not preserved in source ledger')
 for row in rows:
  pp=Path(row['proposalPath']);proposal=load(pp);check(inputs[str(pp)]==row['proposalSHA256'],'Selected proposal pin stale',id=row['id']);check(proposal.get('newAnimations',0)==0,'Source proposal unexpectedly advertises new animation',id=row['id'])
 baseline_runtime=load(BASE/'P53_RUNTIME_MANIFEST_PRIVATE_V1.json');runtime_path=runtime/'runtime-manifest.json';manifest=load(runtime_path);base_rows={r['path']:r for r in baseline_runtime['files']};current_rows={r['path']:r for r in manifest['files']};check(len(current_rows)==len(manifest['files']),'Duplicate runtime manifest path');check(manifest['totalBytes']==sum(r['bytes']for r in manifest['files']),'Runtime byte sum mismatch')
 for key in ['schema','entry','storage','exclusions','externalReferences']:check(manifest.get(key)==baseline_runtime.get(key),'Historical runtime manifest policy changed',key=key)
 check(set(base_rows)<=set(current_rows),'Historical runtime manifest rows removed',missing=sorted(set(base_rows)-set(current_rows)))
 allow=optional(args.allowlist);allowed=set((allow or{}).get('paths',[]));late(bool(allow and allow.get('rootApproved')is True),'Final requires explicit Root-approved historical runtime HTML/JS allowlist')
 changes=[];unlisted=[]
 for path,old in base_rows.items():
  now=current_rows.get(path)
  if now and now!=old:
   changes.append(path);check(Path(path).suffix.lower()in ['.js','.html','.mjs','.css'],'Old runtime asset overwritten',path=path)
   if path not in allowed:unlisted.append(path)
 late(not unlisted,'Changed historical runtime rows absent from Root allowlist',paths=unlisted)
 runtime_checks=[]
 def runtime_one(item):
  path,row=item;rel=Path(path);assert not rel.is_absolute()and'..'not in rel.parts,'Unsafe runtime path';p=runtime/rel;actual=hash_file(p);return {'path':path,**actual,'expectedSHA256':row['sha256'],'expectedBytes':row['bytes']}
 with concurrent.futures.ThreadPoolExecutor(max_workers=args.workers)as pool:
  tasks=[(path,pool.submit(runtime_one,(path,row)))for path,row in current_rows.items()]
  for path,task in tasks:
   try:
    r=task.result();stats[str(runtime/path)]=r['stat'];runtime_checks.append(r)
    if r['sha256']!=r['expectedSHA256']or r['bytes']!=r['expectedBytes']:late(False,'Current runtime file disagrees with manifest (regenerate after freeze)',path=path)
   except Exception as exc:fail('Runtime file missing/unreadable or changing',path=path,error=str(exc))
 actual_by_path={r['path']:r for r in runtime_checks}
 for path,old in base_rows.items():
  if path not in actual_by_path:continue
  if path in allowed and Path(path).suffix.lower()in ['.js','.html','.mjs','.css']:continue
  actual=actual_by_path[path]
  if actual['sha256']!=old['sha256']or actual['bytes']!=old['bytes']:
   if Path(path).suffix.lower()in ['.png','.webp','.jpg','.jpeg','.gif','.gz']:fail('Historical runtime binary changed',path=path)
   else:late(False,'Historical runtime file changed outside explicit allowlist',path=path)
 # Immutable Git-tree metadata provides exact old image identity without
 # downloading every historical documentation PNG into this sparse checkout.
 tree_raw=subprocess.check_output(['git','ls-tree','-r','-z',BASE_COMMIT],cwd=project);baseline_blobs={}
 for rec in tree_raw.split(b'\0'):
  if not rec:continue
  header,path=rec.split(b'\t',1);mode,kind,oid=header.decode().split()
  if kind=='blob':baseline_blobs[path.decode()]=oid
 baseline_image_oids={oid for path,oid in baseline_blobs.items()if Path(path).suffix.lower()in ['.png','.webp','.jpg','.jpeg','.gif']}
 new_image_origins=[]
 for path in sorted(set(current_rows)-set(base_rows)):
  if Path(path).suffix.lower()not in ['.png','.webp','.jpg','.jpeg','.gif']or path not in actual_by_path:continue
  actual=actual_by_path[path];generated=actual['sha256']in ledger_by_hash;reused=actual['gitBlobOID']in baseline_image_oids
  check(generated or reused,'New runtime image lacks exact new-generation receipt or identical baseline Git image',path=path,sha256=actual['sha256'])
  new_image_origins.append({'path':path,'sha256':actual['sha256'],'gitBlobOID':actual['gitBlobOID'],'origin':'exact-new-generated-source'if generated else'exact-byte-reuse-from-baseline','newArtwork':generated and not reused})
 gander_path=project/'docs/cqc-reprise/pass53/gander-parts/gander-parts.json';gander=load(gander_path);gander_rel=gander_path.relative_to(project).as_posix();check(git_oid(read_exact(gander_path))==baseline_blobs[gander_rel],'Inherited Gander contract changed')
 gander_files=[appearance['file']for rig in gander['rigs'].values()for appearance in rig['appearances']];check(len(gander_files)==43 and len(set(gander_files))==43,'Gander43 reused appearances differ');gander_reuse=[]
 for name in gander_files:
  p=gander_path.parent/name
  try:
   actual=hash_file(p);rel=p.relative_to(project).as_posix();check(actual['gitBlobOID']==baseline_blobs.get(rel),'Gander existing source bytes changed',path=rel);gander_reuse.append({'path':rel,'sha256':actual['sha256'],'gitBlobOID':actual['gitBlobOID'],'newArtwork':False})
  except Exception as exc:fail('Existing Gander part absent/unreadable',path=str(p),error=str(exc))
 # Stream tracked files against immutable tree OIDs instead of git diff.
 # git diff can SIGBUS on an incompletely materialized historical pack; tree and
 # index reads need no old blob payload. This also detects edits under sparse
 # flags that git diff may intentionally omit.
 index_raw=subprocess.check_output(['git','ls-files','--stage','-z'],cwd=project);index_entries={}
 for rec in index_raw.split(b'\0'):
  if not rec:continue
  header,path=rec.split(b'\t',1);mode,oid,stage=header.decode().split();check(stage=='0','Unmerged Git index entry',path=path.decode());index_entries[path.decode()]=oid
 sparse_raw=subprocess.check_output(['git','ls-files','-v','-z'],cwd=project);sparse_paths={rec[2:].decode()for rec in sparse_raw.split(b'\0')if rec and rec[:1].upper()==b'S'}
 changed_tracked=[];deleted_tracked=[];sparse_preserved=[];tracked_materialized_checks=0
 for name,baseline_oid in baseline_blobs.items():
  path=project/name
  if name not in index_entries:deleted_tracked.append(name);continue
  if not path.exists():
   if name in sparse_paths:
    check(index_entries[name]==baseline_oid,'Unmaterialized historical Git-index pointer changed',path=name);sparse_preserved.append(name);continue
   deleted_tracked.append(name);continue
  try:
   if path.is_symlink():
    target=os.readlink(path).encode();current_oid=git_oid(target)
   elif name.startswith('public/cqc/')and name.removeprefix('public/cqc/')in actual_by_path:
    current_oid=actual_by_path[name.removeprefix('public/cqc/')]['gitBlobOID']
   else:
    observed=hash_file(path);current_oid=observed['gitBlobOID'];stats[str(path)]=observed['stat']
   tracked_materialized_checks+=1
   if current_oid!=baseline_oid or index_entries[name]!=baseline_oid:changed_tracked.append(name)
  except Exception as exc:fail('Tracked baseline file could not be streamed',path=name,error=str(exc))
 check(not deleted_tracked,'Historical tracked file removed',paths=deleted_tracked)
 # Root explicitly authorized exactly a new local test target and insertion
 # into the existing QA chain. Prove that narrow package delta, not a wildcard.
 package_old=load(BASE/'P53_PACKAGE_PRIVATE_V1.json');package_now=load(project/'package.json');old_scripts=package_old.get('scripts',{});new_scripts=package_now.get('scripts',{});expected_scripts=dict(old_scripts);expected_scripts['cqc:p54:check']='node --test scripts/test-cqc-p54-machine-parts.mjs scripts/test-cqc-p54-mode-scenes.mjs scripts/test-cqc-p54-stages.mjs scripts/test-cqc-p54-boss-scenes.mjs';expected_scripts['qa']=old_scripts['qa'].replace('npm run cqc:check','npm run cqc:check && npm run cqc:p54:check',1)
 package_scope_ok=({k:v for k,v in package_old.items()if k!='scripts'}=={k:v for k,v in package_now.items()if k!='scripts'}and new_scripts==expected_scripts)
 check(package_scope_ok,'package.json differs beyond Root-approved P54 QA target/chain insertion');check(git_oid(read_exact(BASE/'P53_PACKAGE_PRIVATE_V1.json'))==baseline_blobs['package.json'],'Package baseline does not match immutable Git tree')
 package_change_proof={'rootAuthorizedScope':'Only add cqc:p54:check for four owned Node tests and insert it after cqc:check in existing QA chain; Root message recorded in task.','narrowDeltaVerified':package_scope_ok,'baselineSHA256':inputs[str(BASE/'P53_PACKAGE_PRIVATE_V1.json')],'currentSHA256':inputs[str(project/'package.json')],'newTestCommand':new_scripts.get('cqc:p54:check'),'oldQA':old_scripts.get('qa'),'newQA':new_scripts.get('qa')}
 unexpected_changes=[]
 for name in changed_tracked:
  if name=='public/cqc/runtime-manifest.json' or name=='package.json' and package_scope_ok:continue
  if name.startswith('public/cqc/')and name.removeprefix('public/cqc/')in allowed and Path(name).suffix.lower()in ['.js','.html','.mjs','.css']:continue
  unexpected_changes.append(name)
 late(not unexpected_changes,'Tracked baseline file changes lack explicit Root runtime allowlist',paths=unexpected_changes)
 # Check graph endpoints and reachability without changing sync/check policy.
 graph=collections.defaultdict(set);seen_refs=set()
 for ref in manifest['references']:
  key=(ref['from'],ref['to']);check(key not in seen_refs,'Duplicate runtime dependency',reference=key);seen_refs.add(key);check(key[0]in current_rows and key[1]in current_rows,'Dependency has missing checksummed endpoint',reference=key);graph[key[0]].add(key[1])
 reachable={manifest['entry']};queue=list(reachable)
 for node in queue:
  for target in graph[node]:
   if target not in reachable:reachable.add(target);queue.append(target)
 check(reachable==set(current_rows),'Runtime manifest contains unreachable rows',unreachable=sorted(set(current_rows)-reachable))
 # Current changed code may have unregistered new assets while provisional; final
 # requires the canonical conservative verifier, not a new discovery implementation.
 if args.mode=='final':
  proc=subprocess.run(['node','scripts/sync-cqc-runtime.mjs','--verify'],cwd=project,capture_output=True,text=True);(out/'P54_CANONICAL_RUNTIME_CHECK_FINAL.log').write_text(proc.stdout+proc.stderr);check(proc.returncode==0,'Canonical cqc:check failed',returncode=proc.returncode,tail=(proc.stdout+proc.stderr)[-3000:])
 else:pending.append({'reason':'Canonical full cqc:check deferred to final freeze run'})
 workbook=args.workbook or root/'reporting/CQC_SUIVI_P54_SOURCES_ET_RACCORDS_20261120_PUBLIC_V1.xlsx';excel=None
 if workbook.is_file():
  raw=read_exact(workbook);inputs[str(workbook)]=sha(raw)
  with zipfile.ZipFile(OLD_XLSX)as before,zipfile.ZipFile(workbook)as after:
   old_sheets=[n for n in before.namelist()if n.startswith('xl/worksheets/sheet')and n.endswith('.xml')];new_sheets=[n for n in after.namelist()if n.startswith('xl/worksheets/sheet')and n.endswith('.xml')];check(len(old_sheets)==67 and len(new_sheets)==70,'Workbook sheet cardinality differs');check(all(after.read(n)==before.read(n)for n in old_sheets),'Historical worksheet XML changed');excel={'path':str(workbook),'sha256':sha(raw),'oldSheets':len(old_sheets),'totalSheets':len(new_sheets),'oldWorksheetXMLsExact':all(after.read(n)==before.read(n)for n in old_sheets)}
  with zipfile.ZipFile(OLD_XLSX)as before,zipfile.ZipFile(workbook)as after:
   mutable={'xl/workbook.xml','xl/_rels/workbook.xml.rels','[Content_Types].xml'};kept=[n for n in before.namelist()if n not in mutable];check(all(n in after.namelist()and after.read(n)==before.read(n)for n in kept),'Historical unchanged workbook ZIP member changed');namespace='http://schemas.openxmlformats.org/spreadsheetml/2006/main';old_book=ET.fromstring(before.read('xl/workbook.xml'));new_book=ET.fromstring(after.read('xl/workbook.xml'));old_names=[e.attrib for e in old_book.find('{'+namespace+'}sheets')];new_names=[e.attrib for e in new_book.find('{'+namespace+'}sheets')];check(new_names[:67]==old_names,'Historical workbook sheet ordering/identity changed')
   source_sheet=next(e for e in new_book.find('{'+namespace+'}sheets')if e.attrib['name']=='P54_sources');rid=source_sheet.attrib['{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id'];relationships=ET.fromstring(after.read('xl/_rels/workbook.xml.rels'));target=next(e.attrib['Target']for e in relationships if e.attrib['Id']==rid);target=target.lstrip('/')if target.startswith('/')else'xl/'+target;source_xml=ET.fromstring(after.read(target));actual_source_rows=[]
   for row in source_xml.find('{'+namespace+'}sheetData'):
    if row.attrib['r']=='1':continue
    values={''.join(ch for ch in cell.attrib['r']if ch.isalpha()):''.join(cell.itertext())for cell in row};actual_source_rows.append(values)
   actual_pairs=[(v.get('A'),v.get('J'))for v in actual_source_rows];expected_sources=rows+inventory.get('heldRows',[]);expected_pairs={(r['id'],r['SHA256'])for r in expected_sources};check(set(actual_pairs)==expected_pairs and len(actual_pairs)==len(expected_pairs),'Workbook Source versions differ from selected+held inventory');by_pair={(v.get('A'),v.get('J')):v for v in actual_source_rows}
   for row in rows:
    ident=row['id'];v=by_pair.get((ident,row['SHA256']),{});check(bool(v),'Workbook selected source SHA missing',id=ident);check(v.get('S')=='Non'and v.get('T','').startswith('Non'),'Workbook falsely admits source as new animation/playable costume',id=ident);check('antérieure'not in v.get('H','').lower()and'écartée'not in v.get('H','').lower(),'Selected source marked historical',id=ident);check(v.get('I')==row.get('immutableURL')and v.get('I','').startswith('https://raw.githubusercontent.com/darknigthmare/shadow-codec-ops/'),'Workbook selected Source link is not its immutable Git source',id=ident)
   for row in inventory.get('heldRows',[]):
    ident=row['id'];v=by_pair.get((ident,row['SHA256']),{});check(any(term in v.get('H','').lower()for term in ['antérieure','écartée','held','conservé']),'Held source is not visibly historical/excluded',id=ident);check(v.get('S')=='Non'and v.get('T','').startswith('Non'),'Held source falsely admitted',id=ident);check(v.get('I')==row.get('immutableURL'),'Held historical Source immutable link differs',id=ident)
   excel.update(unchangedOriginalZIPMembers=len(kept),unchangedOriginalZIPMembersExact=True,sourceRowsMatched=len(rows),heldSourceRowsChecked=len(inventory.get('heldRows',[])),totalSourceSheetRows=len(actual_source_rows),oldSheetOrderingExact=True)
 else:late(False,'Final workbook not present',path=str(workbook))
 browser=optional(args.browser_report);browser_binding=None
 if browser:
  late(browser.get('status')in ['PASS','PASS_FINAL'],'Browser evidence is not PASS');late(browser.get('inventorySHA256')==inputs[str(inventory_path)],'Browser report is not bound to current selected Source inventory');late(browser.get('runtimeManifestSHA256')==inputs[str(runtime_path)],'Browser report is not bound to current runtime manifest');late(browser.get('sourceLoadErrors')==0,'Browser Source load errors are absent or nonzero');late(browser.get('horizontalOverflow')is False,'Browser overflow result missing or failing');late(browser.get('uncaughtBrowserExceptions')in [[],0],'Browser exception evidence missing or failing');late(isinstance(browser.get('cases'),list)and len(browser['cases'])>0,'Actual browser case list absent');browser_binding={'path':str(args.browser_report),'cases':len(browser.get('cases',[])),'inventorySHA256':browser.get('inventorySHA256'),'runtimeManifestSHA256':browser.get('runtimeManifestSHA256')}
 else:late(False,'Final mode requires --browser-report actual browser proof')
 changed_inputs=[]
 for path,digest in inputs.items():
  try:
   if sha(read_exact(path))!=digest:changed_inputs.append(path)
  except Exception as exc:changed_inputs.append(path+': '+str(exc))
 for path,stat in stats.items():
  try:
   q=Path(path).stat()
   if [q.st_ino,q.st_size,q.st_mtime_ns,q.st_ctime_ns]!=stat:changed_inputs.append(path)
  except Exception as exc:changed_inputs.append(path+': '+str(exc))
 stable=not changed_inputs
 if not stable:fail('Inputs changed during verification; rerun required',paths=changed_inputs)
 metrics.update(selectedPoses=len(rows),selectedCostumes=counts['costume'],selectedCharacterSources=counts['character'],selectedUniquePNGs=len({r['SHA256']for r in rows}),PNGsSHA256CRCDecoded=len(source_checks),selectedRawLedgerMatches=len(source_ledger_checks),baseRosterUIDs=len(base_uids),newSourceCharacterUIDs=sorted(new_uids),baselineRosterUIDsRemoved=0,frozenP52Scopes=12,frozenP53Scopes=1,newOC002RefusalScopes=1,totalGuardScopes=14,guardedSelectedSources=len(scope_matches),originalConceptBriefs=20,originalConceptSources=len(selected_oc),runtimeFiles=len(current_rows),baselineRuntimeRows=len(base_rows),runtimeFilesReadAndHashed=len(runtime_checks),historicalRuntimeRowsRemoved=len(set(base_rows)-set(current_rows)),historicalRuntimeRowsChanged=changes,newRuntimeRows=len(set(current_rows)-set(base_rows)),newGanderDrawings=0,GanderReusedPNGsVerified=len(gander_reuse),allPreservedRawPNGPathsVerified=len(raw_ledger_checks),newRuntimeImagesWithQualifiedOrigin=len(new_image_origins),producedGuardedSources=len(produced_guard_matches),newAnimations=0,sourceInventoryRuntimeAdmissions=0)
 status='FAIL'if errors else'PASS_FINAL'if args.mode=='final'else'PASS_PROVISIONAL_PENDING_GATES'if pending else'PASS_PROVISIONAL'
 report={'schema':'cqc.p54.independent-delivery-verification/1','atUTC':datetime.datetime.now(datetime.timezone.utc).isoformat(),'mode':args.mode,'status':status,'baseCommit':BASE_COMMIT,'verifierScriptSHA256':sha(read_exact(Path(__file__))),'inventorySHA256':inputs[str(inventory_path)],'runtimeManifestSHA256':inputs[str(runtime_path)],'inputSnapshotStable':stable,'metrics':metrics,'OC20Dispositions':dispositions,'OC010HeldVersionCheck':held_check,'sourcePNGChecks':source_checks,'generatedSourceLedgerChecks':source_ledger_checks,'allPreservedRawLedgerChecks':raw_ledger_checks,'newRuntimeImageOriginChecks':new_image_origins,'Gander43ByteReuseChecks':gander_reuse,'allProducedProposalGuardChecks':produced_proposals,'trackedBaselinePathsChanged':changed_tracked,'rootApprovedPackageScriptChangeProof':package_change_proof,'trackedBaselinePreservation':{'method':'Immutable baseline Git tree plus current index/sparse flags and streamed materialized-file Git blob hashes; avoids historical-pack payload mmap.','materializedPathsChecked':tracked_materialized_checks,'unmaterializedSparseIndexPointersVerified':len(sparse_preserved),'removedPaths':deleted_tracked},'runtimeSHA256Checks':runtime_checks,'sourceInputSHA256':inputs,'browserEvidence':browser_binding,'workbookEvidence':excel,'generationGuardEvidence':{'registrySHA256':inputs[str(out/'P54_EXACT_GENERATION_GUARD_REGISTRY_PRIVATE_V1.json')],'selectedScopeMatches':scope_matches,'allProducedScopeMatches':produced_guard_matches,'newActualRefusalRequestID':GUARD_REQUEST,'artifactSetScope':'Selected current normalized sources, their actual pinned proposals, and current production guard records; does not assert observation of unrecorded external tool calls.'},'pendingGates':pending,'warnings':warnings,'errorCount':len(errors),'errors':errors,'sourcePixelsModified':False,'runtimeFilesModifiedByVerifier':0,'newImageGenerationAttemptsByVerifier':0}
 target=out/f'P54_FULL_VERIFICATION_{args.mode.upper()}_PRIVATE_V1.json';target.write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
 aggregate={k:report[k]for k in ['schema','atUTC','mode','status','baseCommit','inventorySHA256','runtimeManifestSHA256','inputSnapshotStable','metrics','OC010HeldVersionCheck','browserEvidence','workbookEvidence','errorCount','errors','pendingGates']};aggregate['detailReportSHA256']=sha(target.read_bytes());aggregate['scopeQualification']='Source art presence, machine/stage integration and playable admission remain separate. Fidelity is not certified pixel-perfect.'
 public=out/('P54_FINAL_VERIFICATION_PUBLIC_V1.json'if args.mode=='final'else'P54_PROVISIONAL_VERIFICATION_PUBLIC_V1.json');public.write_text(json.dumps(aggregate,ensure_ascii=False,indent=2)+'\n');print(json.dumps({'status':status,'errors':len(errors),'pendingGates':len(pending),'stable':stable,'metrics':metrics,'detail':str(target),'public':str(public)}));return bool(errors)

if __name__=='__main__':
 try:sys.exit(main())
 except Exception as exc:
  print(json.dumps({'status':'VERIFIER_ERROR_NO_PASS','error':str(exc)}));raise
