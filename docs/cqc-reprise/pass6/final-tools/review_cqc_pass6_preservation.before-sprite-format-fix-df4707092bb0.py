#!/usr/bin/env python3
"""Independent read-only PASS6 source preservation review.
Default only prints the review plan. --execute requires root-confirmed frozen facts.
Writes a new external JSON report only; no production, archive, Git or old-report edits.
Every ZIP is streamed to EOF for CRC. Source SHA, native evidence and actual fresh QA
logs are checked, rather than trusting successful-looking summaries or prior counts.
"""
from __future__ import annotations
import argparse, copy, hashlib, importlib.util, json, math, posixpath, re, struct, subprocess, traceback, zipfile
from collections import defaultdict, deque
from datetime import datetime, timezone
from pathlib import Path, PurePosixPath
from PIL import Image
W=Path('/workspace');R=W/'cqc-game-working/cqc-versus-v056';S=W/'shadow-codec-recovered'
BASE=W/'CQC_Versus_Legacy_v0.56_REPRISE_PASS5_2026-10-01.zip'
BASE_SHA='b6615f5fef9252ade6296b88d92cc25023905b06c7f7451ffa37fce0465138c8'
OLD_SHADOW=W/'SHADOW_CODEC_OPS_CQC_REPRISE_PASS5_2026-10-01.zip'
OLD_SHADOW_SHA='563c4863405540cb6bc2335f37553a1dc3dfd222febcdccd3ec16c5fa202ef8f'
PINS=W/'cqc-pass6-previous-deliveries-frozen.json'
PINS_SHA='dfbb85e3f3d7f6e56fa81d916c94ecd1c7b197b32dfb64bfca0102a236845934'
ARTIST_DELIVERY_SHA={
 'pain':'ec9485b91b4a4c45fda119cad5f9f84b0c3ae1fe56edb067536c5925a4f3a7ef',
 'fear':'d4bf3111f4df37a90a406a3c2c5917df69afad6b8f32b1ec0c595cb202e16676',
 'end':'5ad2d7e506faec446b6ede8169c10d252f391b48f2c49a9f029cd100a454bdab',
 'fury':'572769cfa6a5ad3a3c21db5d2d2b078a6071e8e7f82aa926231baaa2b7b31913'}
NARRATIVE_DELIVERY_SHA='11202e4fb37cdc109c1f86404e197722de1b3364544071dde008499185766fcc'
BASELINES=[
('cqc-original-v056-files.json',1322,'c073d1c51a42f0508d4ab5291d0483019be5cd1eec07e6a4c513ba9ef0117512'),
('cqc-delivered-pass2-baseline-files.json',4576,'12c4825ea85f1954e123459730084740fd9a5a402f46f6c272cf7e8a3bc90190'),
('cqc-pass2-baseline-files.json',4617,'4f8d7df1a657edda7ef236a2cfd366534946008308182bad0cb48a27c72e96c8'),
('cqc-delivered-pass3-baseline-files.json',5972,'9641befa9ffa0f37c2279487fa91562b3b1052cff4d33d711c835d3066076d46'),
('cqc-delivered-pass4-baseline-files.json',7850,'88f294418baf46d7269c08324c433a615fdeadf924d35814221e64e4bbc67244'),
('cqc-delivered-pass5-baseline-files.json',9079,'31251f4751b162334ca1d064025ac23876b4afffe9f55782410ff8128e2fbc67')]
NEW_UIDS={'core__pain','core__fear','core__end','core__fury'}
NEW_STORIES={'core__runner_mg2','core__redblaster_mg2'}
MOVE_SLOTS={'light','heavy','low','throw','special','specialDown','specialForward','specialBack','super','utility'}
CEILINGS={'lobito','saintlogic','saintlogic_security'}
OUT=W/'cqc-pass6-preservation-review.json'
TEXT={'.html','.js','.css','.json'};EXT=TEXT|{'.png','.webp','.jpg','.jpeg','.gif','.svg','.ogg','.mp3','.wav','.woff','.woff2'}
EXCLUDED={'docs','tests','tools','preparation','recovery','references','history'}
LITERAL=re.compile(r'''["'`]([^"'`\r\n<>]{1,800}\.(?:html|js|css|json|webp|png|jpe?g|gif|svg|ogg|mp3|wav|woff2?)(?:\?[^"'`\r\n<>]*)?)["'`]''',re.I)
checks=[];failures=[];measures={};actual={};by_sha=defaultdict(list)
def sha(raw):return hashlib.sha256(raw).hexdigest()
def file_sha(path):
 h=hashlib.sha256()
 with Path(path).open('rb') as f:
  for b in iter(lambda:f.read(8*1024*1024),b''):h.update(b)
 return h.hexdigest()
def js(path):return json.loads(Path(path).read_bytes())
def check(name,ok,**detail):
 row={'name':name,'passed':bool(ok),**detail};checks.append(row)
 if not ok:failures.append(row)
 return bool(ok)
def norm(value):return sha(json.dumps(value,ensure_ascii=False,sort_keys=True,separators=(',',':')).encode())
def all_frames(entry):
 for facing in ['actions','oppositeActions']:
  for action in entry.get(facing,{}).values():yield from action.get('frames',[])
def strip_visuals(value):
 d=copy.deepcopy(value)
 for story in d['stories'].values():
  for phase in ['intro','outro']:
   for card in story[phase]:card.pop('visual',None)
 for key in ['counts','illustrationUpdate','visualMethod']:d.pop(key,None)
 return d
def assignment(raw,name):
 text=raw.decode();matches=list(re.finditer(r'window\.'+re.escape(name)+r'\s*=\s*',text))
 if len(matches)!=1:raise ValueError('Non-unique assignment '+name)
 return json.JSONDecoder().raw_decode(text[matches[0].end():])[0]
def safe_path(value):
 p=PurePosixPath(value);return bool(value) and not p.is_absolute() and '..' not in p.parts and '\\' not in value and value==p.as_posix()
def live_index():
 found={}
 for f in sorted(R.rglob('*')):
  if f.is_file():
   rel=f.relative_to(R).as_posix();found[rel]={'bytes':f.stat().st_size,'sha256':file_sha(f),'symlink':f.is_symlink()}
 return found
def zip_json(z,rel,prefix='cqc-versus-v056/'):return json.loads(z.read(prefix+rel))
def same_record(rel,digest,size=None):
 row=actual.get(rel,{})
 return row.get('sha256')==digest and (size is None or row.get('bytes')==size)
def preserved_paths(digest):return by_sha.get(digest,[])
def exact_external_preserved(path,prefixes=('preparation/','docs/','recovery/')):
 f=Path(path)
 if not f.is_file():return False,[]
 digest=file_sha(f);paths=[p for p in preserved_paths(digest) if p.startswith(prefixes)]
 return bool(paths),paths

def verify_pins_and_crc():
 rows=js(PINS).get('files',[]);check('46_unique_previous_delivery_pins',len(rows)==46 and len({r['path'] for r in rows})==46 and file_sha(PINS)==PINS_SHA,files=len(rows),pinSha256=file_sha(PINS))
 check('frozen_pass5_cqc_and_shadow_archive_identities', {Path(r['path']).name:r['sha256'] for r in rows}.get(BASE.name)==BASE_SHA and {Path(r['path']).name:r['sha256'] for r in rows}.get(OLD_SHADOW.name)==OLD_SHADOW_SHA)
 output=[]
 for e in rows:
  print('Checking immutable delivery: '+Path(e['path']).name,flush=True)
  f=Path(e['path']);exists=f.is_file();digest=file_sha(f) if exists else None;size=f.stat().st_size if exists else None
  crc={'zip':f.suffix.lower()=='.zip','membersRead':0,'errors':[]}
  if exists and crc['zip']:
   try:
    with zipfile.ZipFile(f) as z:
     names=z.namelist()
     if len(names)!=len(set(names)):crc['errors'].append('Duplicate ZIP member names')
     for info in z.infolist():
      try:
       with z.open(info) as h:
        for b in iter(lambda:h.read(8*1024*1024),b''):pass
       crc['membersRead']+=1
      except Exception as error:crc['errors'].append({'member':info.filename,'error':repr(error)})
   except Exception as error:crc['errors'].append(repr(error))
  row={'path':str(f),'bytes':size,'sha256':digest,**crc,'matchesPin':exists and size==e['bytes'] and digest==e['sha256']};output.append(row)
  check('immutable_archive_or_sidecar:'+f.name,row['matchesPin'] and not crc['errors'],**row)
 measures['previousDeliveries']=output
 return rows

def verify_histories():
 recovery=defaultdict(list)
 for p,row in actual.items():
  if p.startswith('recovery/'):recovery[row['sha256']].append(p)
 results=[]
 for name,count,digest in BASELINES:
  f=W/name;rows=js(f);check('frozen_inventory_identity:'+name,len(rows)==count and file_sha(f)==digest,files=len(rows),sha256=file_sha(f))
  missing=[];changed=[]
  for old in rows:
   p=old['path']
   if p not in actual:missing.append(p);continue
   if actual[p]['sha256']!=old['sha256'] or actual[p]['bytes']!=old['bytes']:
    copies=[b for b in recovery[old['sha256']] if actual[b]['bytes']==old['bytes']]
    changed.append({'path':p,'previousSha256':old['sha256'],'currentSha256':actual[p]['sha256'],'oldBytes':old['bytes'],'exactRecovery':copies})
  check('all_old_paths_present_and_changed_bytes_recovered:'+name,not missing and all(c['exactRecovery'] for c in changed),missing=missing,changedFiles=len(changed),unrecovered=[c for c in changed if not c['exactRecovery']])
  results.append({'inventory':name,'count':len(rows),'missing':missing,'changedWithExactRecovery':changed})
 measures['sixHistoricalBaselines']=results

def verify_native_sets(old):
 frozen=js(R/'recovery/pass6-before-native-sprite-integration/FROZEN_PASS5_SPRITES.json');before=zip_json(old,'data/combat-sprite-catalog-v1.json')['entries'];after=js(R/'data/combat-sprite-catalog-v1.json')['entries']
 check('frozen_integrator_snapshot_matches_immutable_pass5_18_entries',len(before)==18 and frozen['existingEntries']==before and frozen['entryCount']==18 and frozen['nativePNGCount']==108)
 check('all_old_18_entry_objects_exact_and_four_new_exact_UIDs',all(after.get(u)==e for u,e in before.items()) and set(after)==set(before)|NEW_UIDS,oldUIDs=sorted(before),newUIDs=sorted(set(after)-set(before)))
 oldfiles={f['file'] for e in before.values() for f in all_frames(e)};oldbad=[]
 for p in oldfiles:
  if not same_record(p,sha(old.read('cqc-versus-v056/'+p))):oldbad.append(p)
 check('108_old_native_source_pngs_byte_exact',len(oldfiles)==108 and not oldbad,pngs=len(oldfiles),errors=oldbad)
 snapshotbad=[]
 for row in frozen['files']:
  if not same_record(row['backup'],row['sha256'],row['bytes']):snapshotbad.append(row['backup'])
  if row['path'] not in {'data/combat-sprite-catalog-v1.json','src/cqc-sprite-catalog.js'} and not same_record(row['path'],row['sha256'],row['bytes']):snapshotbad.append(row['path'])
 check('frozen_renderer_importer_inspector_and_prior_helpers_preserved',not snapshotbad,errors=snapshotbad)
 selected=[];frames_bad=[];all_files=set();all_poses=set();delivery_bad=[]
 for uid,e in after.items():
  files=set();poses=set()
  for f in all_frames(e):
   p=f['file'];files.add(p);poses.add((p,tuple(f['rect'])))
   ok=same_record(p,f['sha256']) and safe_path(p)
   if ok:
    with (R/p).open('rb') as h:header=h.read(24)
    width,height=struct.unpack('>II',header[16:24]);x,y,w,h=f['rect']
    ok=header[:8]==b'\x89PNG\r\n\x1a\n' and all(isinstance(v,(int,float)) and math.isfinite(v) for v in [x,y,w,h,*f['pivot']]) and x>=0 and y>=0 and w>0 and h>0 and x+w<=width and y+h<=height and all(0<=v<=1 for v in f['pivot'])
   if not ok:frames_bad.append({'uid':uid,'file':p,'rect':f['rect']})
  all_files.update(files);all_poses.update(poses)
  check('six_independent_native_pngs_72_poses:'+uid,len(files)==6 and len(poses)==72 and e.get('mirror') is False and bool(e.get('actions')) and bool(e.get('oppositeActions')),nativePNG=len(files),distinctSourcePoseRects=len(poses))
  check('ten_actual_move_slot_native_mappings:'+uid,set(e.get('actionMap',{}))==MOVE_SLOTS and all(v in e['actions'] and v in e['oppositeActions'] for v in e['actionMap'].values()))
  if uid in NEW_UIDS:
   folder=uid.split('__')[1];deliverypath=W/'cqc-pass6-generation'/folder/'FINAL_DELIVERY.json';delivery=js(deliverypath)
   check('immutable_artist_handoff_identity:'+uid,file_sha(deliverypath)==ARTIST_DELIVERY_SHA[folder],sha256=file_sha(deliverypath))
   runtime_files={f['file']:f['sha256'] for f in all_frames(e)}
   expected={'assets/combat-sprites/'+uid+'/'+r['key']+'-v1.png':r['sha256'] for r in delivery['sourceFiles']}
   if runtime_files!=expected or e['actionMap']!=delivery['actionMap'] or e['displayHeight']!=delivery['displayHeight'] or delivery.get('mirror') is not False:delivery_bad.append(uid)
   for group,phases in delivery['phaseMap'].items():
    if e.get('phaseMap',{}).get(group)!=phases:delivery_bad.append(uid+':'+group)
   for row in delivery['sourceFiles']:
    valid=all(Path(row[k]).is_file() and file_sha(row[k])==row['sha256'] for k in ['source','nativeOriginal']) and same_record('assets/combat-sprites/'+uid+'/'+row['key']+'-v1.png',row['sha256'])
    selected.append({'uid':uid,'sheet':row['key'],'sha256':row['sha256'],'byteExact':valid})
 check('new_24_pngs_byte_exact_immutable_native_originals',len(selected)==24 and len({r['sha256'] for r in selected})==24 and all(r['byteExact'] for r in selected),sheets=selected)
 check('new_immutable_action_maps_and_phases_match_imports',not delivery_bad,errors=delivery_bad)
 check('all_native_frame_sources_sha_rects_and_pivots_valid',not frames_bad,errors=frames_bad)
 check('native_counts_measured_22_132_1584',len(after)==22 and len(all_files)==132 and len(all_poses)==1584,sets=len(after),pngs=len(all_files),distinctSourcePoseRects=len(all_poses))
 measures['nativeSets']={'sets':len(after),'pngs':len(all_files),'distinctSourcePoseRects':len(all_poses),'oldObjects':len(before),'newUIDs':sorted(NEW_UIDS)}
 return after

def verify_artist_and_native_preservation(old,facts):
 directories=[W/'cqc-pass6-generation'/n for n in ['pain','fear','end','fury']]+[W/'cqc-pass6-narrative-art',W/'cqc-pass6-stage-ceilings']
 directories += [Path(p) for p in facts.get('additionalArtistDirectories',[])]
 artist=[];bad=[];videos=[]
 for directory in directories:
  if not directory.is_dir():bad.append({'directory':str(directory),'error':'Missing artist directory'});continue
  for f in sorted(directory.rglob('*')):
   if not f.is_file():continue
   if f.suffix.lower() in {'.mp4','.mkv','.webm'}:
    videos.append({'source':str(f),'sha256':file_sha(f),'retainedLocally':True});continue
   ok,paths=exact_external_preserved(f,('preparation/reprise-pass6-provenance/','recovery/','docs/reprise-qa/pass6/'))
   row={'source':str(f),'sha256':file_sha(f),'bytes':f.stat().st_size,'retainedByteExactPaths':paths};artist.append(row)
   if not ok or f.is_symlink():bad.append(row)
 check('all_artist_files_prompts_references_attempts_rejections_preserved_byte_exact',bool(artist) and not bad,files=len(artist),errors=bad)
 generated=[];genbad=[]
 for f in sorted((W/'generated_images').glob('*.png')):
  digest=file_sha(f);paths=preserved_paths(digest);row={'nativeFilename':f.name,'bytes':f.stat().st_size,'sha256':digest,'retainedByteExactPaths':paths};generated.append(row)
  if not paths:genbad.append(row)
 report=js(R/'preparation/ALL_NATIVE_GENERATION_PRESERVATION.json');declared={r['nativeFilename']:r for r in report['files']};olddeclared={r['nativeFilename']:r for r in zip_json(old,'preparation/ALL_NATIVE_GENERATION_PRESERVATION.json')['files']};seen={r['nativeFilename']:r for r in generated}
 declbad=[]
 for n,r in declared.items():
  current=seen.get(n,{})
  if current.get('sha256')!=r.get('sha256') or current.get('bytes')!=r.get('bytes') or r.get('pixelsEdited') is not False or not same_record(r.get('preservedFile',''),r.get('sha256'),r.get('bytes')):declbad.append(n)
 check('all_generated_native_pngs_preserved_and_manifest_current',bool(generated) and not genbad and not declbad and len(declared)==len(report['files'])==len(seen) and set(declared)==set(seen),actualNativeFiles=len(generated),missing=genbad,declarationErrors=declbad)
 check('all_444_pass5_native_generation_filenames_and_bytes_preserved',len(olddeclared)==444 and all(n in declared and all(declared[n].get(k)==r.get(k) for k in ['sha256','bytes','pixelsEdited']) for n,r in olddeclared.items()),oldNativeFiles=len(olddeclared))
 measures['artistPreservation']={'files':len(artist),'sourceFiles':artist,'nativeGenerations':generated,'oldNativeFiles':len(olddeclared),'locallyRetainedVideos':videos}

def verify_narratives(old):
 before=zip_json(old,'data/chronicles-v056.json');after=js(R/'data/chronicles-v056.json');bc=zip_json(old,'data/plate-catalog-illustrated-v056.json');catalog=js(R/'data/plate-catalog-illustrated-v056.json')
 check('all_narrative_identity_text_lore_camera_prop_routes_exact',strip_visuals(before)==strip_visuals(after),oldNormalizedSha256=norm(strip_visuals(before)),newNormalizedSha256=norm(strip_visuals(after)))
 stories=after['stories'];routes=sum(len(s['route']) for s in stories.values());paras=sum(len([p for p in re.split(r'\n\s*\n',c['text']) if p.strip()]) for s in stories.values() for phase in ['intro','outro'] for c in s[phase])
 check('354_stories_2832_routes_4248_paragraphs_measured',len(stories)==354 and routes==2832 and paras==4248,stories=len(stories),routeEntries=routes,paragraphs=paras)
 targets={f'{u}:{phase}:{i}' for u in NEW_STORIES for phase in ['intro','outro'] for i in range(3)};changed=set()
 for u,s in stories.items():
  for phase in ['intro','outro']:
   for i,c in enumerate(s[phase]):
    if c.get('visual')!=before['stories'][u][phase][i].get('visual'):changed.add(f'{u}:{phase}:{i}')
 check('only_12_requested_mg2_visual_fields_changed',changed==targets,sceneKeys=sorted(changed))
 manifestpath=W/'cqc-pass6-narrative-art/APPROVED_NARRATIVE_MANIFEST.json';manifest=js(manifestpath);ids={r['id'] for r in manifest['assets']};check('immutable_narrative_handoff_identity',file_sha(manifestpath)==NARRATIVE_DELIVERY_SHA,sha256=file_sha(manifestpath));check('474_previous_paintings_catalog_objects_exact_plus_12_new',all(catalog.get(k)==v for k,v in bc.items()) and set(catalog)-set(bc)==ids and len(ids)==12 and sum(bool(v.get('fullScene')) for v in bc.values())==474)
 oldart={v['file'] for v in bc.values()};changedold=[p for p in oldart if not same_record(p,sha(old.read('cqc-versus-v056/'+p)))];check('all_old_painting_image_bytes_exact',not changedold,checkedImages=len(oldart),errors=changedold)
 bad=[]
 for row in manifest['assets']:
  p='assets/illustrations-v056/originals/'+row['id']+'.png';source=Path(row['sourcePath']);artist=W/'cqc-pass6-narrative-art'/row['file'];native=source.is_file() and artist.is_file() and file_sha(source)==file_sha(artist)==row['sha256'] and same_record(p,row['sha256'])
  if not native:bad.append(row['sceneKey'])
 check('12_new_narrative_native_originals_byte_exact',len(manifest['assets'])==12 and not bad,errors=bad)
 uses=0;complete=0;partial=0
 for s in stories.values():
  n=sum(bool(c['visual'].get('fullScene') and catalog[c['visual']['set']].get('fullScene')) for ph in ['intro','outro'] for c in s[ph]);uses+=n;complete+=n==6;partial+=0<n<6
 coverage={'fullSceneUses':uses,'fullSceneCatalogPaintings':sum(bool(v.get('fullScene')) for v in catalog.values()),'fullyPaintedStories':complete,'partiallyPaintedStories':partial,'remainingSceneCards':2124-uses,'remainingStories':len(stories)-complete}
 check('coverage_measured_486_paintings_81_complete_273_remaining',coverage=={'fullSceneUses':486,'fullSceneCatalogPaintings':486,'fullyPaintedStories':81,'partiallyPaintedStories':0,'remainingSceneCards':1638,'remainingStories':273},measured=coverage)
 check('embedded_narrative_and_plate_json_match_live_source',assignment((R/'src/chronicles-data-v056.js').read_bytes(),'CQC55_DATA')==after and assignment((R/'src/chronicles-plate-data-v056.js').read_bytes(),'CQC56_PLATE_CATALOG')==catalog)
 portrait='data/portrait-atlas-v056.json';check('portrait_mapping_unchanged_from_pass5',zip_json(old,portrait)==js(R/portrait))
 measures['narratives']=coverage

def verify_stages(old):
 before=zip_json(old,'data/stage-layer-catalog-reprise.json');after=js(R/'data/stage-layer-catalog-reprise.json');bs={s['id']:s for s in before['stages']};now={s['id']:s for s in after['stages']}
 planes={l['file']:l for s in bs.values() for l in s['layers']};refs={r['file']:r for s in bs.values() for r in s['references']};bad=[]
 for p,row in {**planes,**refs}.items():
  if not same_record(p,row['sha256']) or sha(old.read('cqc-versus-v056/'+p))!=row['sha256']:bad.append(p)
 check('all_123_old_stage_png_paths_119_contents_and_57_refs_exact',len(planes)==123 and len({p['sha256'] for p in planes.values()})==119 and len(refs)==57 and not bad,stagePNGPaths=len(planes),uniquePNGContents=len({p['sha256'] for p in planes.values()}),references=len(refs),errors=bad)
 unchanged=[u for u in bs if u not in CEILINGS];modified={u for u in bs if bs[u]!=now.get(u)}
 check('30_stage_ids_and_27_unrelated_stage_objects_exact',set(now)==set(bs) and len(now)==30 and all(now[u]==bs[u] for u in unchanged) and modified<=CEILINGS,modifiedUIDs=sorted(modified),unrelatedStages=len(unchanged))
 currentplanes=[l for s in now.values() for l in s['layers']];currentbad=[l['file'] for l in currentplanes if not same_record(l['file'],l['sha256'])]
 check('all_current_stage_layers_match_actual_native_source_bytes',not currentbad,planes=len(currentplanes),errors=currentbad)
 oldpaths=set(planes);add=[l for l in currentplanes if l['file'] not in oldpaths];generated={file_sha(p) for p in (W/'generated_images').glob('*.png')}
 check('new_roof_planes_only_3_source_backed_stage_UIDs_and_native_pngs',len(add)==3 and len({l['file'] for l in currentplanes})==126 and len({l['sha256'] for l in currentplanes})==122 and all(l['sha256'] in generated for l in add) and {s['id'] for s in now.values() if any(l['file'] not in oldpaths for l in s['layers'])}==CEILINGS,newLayerFiles=[l['file'] for l in add])
 oldlayerbad=[];newlayerbad=[]
 for uid in CEILINGS:
  fresh=[l for l in now[uid]['layers'] if l['file'] not in oldpaths]
  remaining=[l for l in now[uid]['layers'] if l['file'] in oldpaths]
  if remaining!=bs[uid]['layers']:oldlayerbad.append(uid)
  if len(fresh)!=1:newlayerbad.append({'uid':uid,'reason':'Expected one new ceiling'});continue
  layer=fresh[0];rect=layer.get('rect',{});width=layer.get('width',0);height=layer.get('height',0)
  if not width or not height or not math.isclose(rect.get('width',0)/rect.get('height',1),width/height,rel_tol=1e-12):newlayerbad.append({'uid':uid,'reason':'Native aspect ratio changed'})
  if layer.get('id')!='ceiling-extension' or layer.get('parallax')!=0 or layer.get('phase')!='background' or layer.get('role')!='architecture' or layer.get('transparent') is not False:newlayerbad.append({'uid':uid,'reason':'Unexpected ceiling role/position'})
  native=W/'cqc-pass6-stage-ceilings'/uid/'CEILING_01_NATIVE.png'
  if not native.is_file() or file_sha(native)!=layer['sha256']:newlayerbad.append({'uid':uid,'reason':'Native stage donor differs'})
  with Image.open(R/layer['file']) as im:
   if im.size!=(width,height):newlayerbad.append({'uid':uid,'reason':'Native stage dimensions differ'})
  # At zoom .78 the old opaque sky starts 70.36px below the top. The
  # new background must cover that opening and the complete horizontal canvas.
  for zoom in [.78,1.08]:
   for camera in [-220,0,220]:
    # Existing renderer multiplies camera shift by layer parallax (zero here).
    x0=640+(rect['x']-640-camera*layer['parallax'])*zoom;y0=568+(rect['y']-568)*zoom
    x1=x0+rect['width']*zoom;y1=y0+rect['height']*zoom
    if not(x0<=0 and x1>=1280 and y0<=0 and y1>=70.36):newlayerbad.append({'uid':uid,'reason':'Camera/zoom roof coverage','zoom':zoom,'camera':camera,'canvasRect':[x0,y0,x1,y1]})
  margin=now[uid].get('review',{}).get('pass6CameraMargin',{})
  if 'awaiting' in str(margin.get('status','')) or not margin.get('status'):newlayerbad.append({'uid':uid,'reason':'Physical roof review not finalized'})
 check('all_123_previous_layer_records_exact_order_preserved',not oldlayerbad,errors=oldlayerbad)
 check('three_ceiling_native_aspect_geometry_and_final_review_valid',not newlayerbad,errors=newlayerbad)
 check('stage_embedded_catalog_matches_live_json',assignment((R/'src/cqc-stage-layer-data.js').read_bytes(),'CQC_STAGE_LAYER_DATA')==after)
 animated=[];camera=[]
 for s in now.values():
  w=s.get('weather',{});active=(w.get('type','none')!='none' and w.get('enabled') is not False) or any(l.get('motion') for l in s['layers']);(animated if active else camera).append(s['id'])
 check('27_ambient_animated_and_3_camera_only_stages_preserved',len(animated)==27 and set(camera)=={'outer_heaven','zanzibar','arsenal_corridor'},animated=len(animated),cameraOnly=camera)
 measures['stages']={'stages':len(now),'oldPNGPaths':len(planes),'oldUniquePNGContents':len({l['sha256'] for l in planes.values()}),'oldReferences':len(refs),'currentLayerCount':len(currentplanes),'newRoofLayers':add,'changedUIDs':sorted(modified),'ambientAnimated':len(animated),'cameraOnly':camera}

def verify_gameplay_preservation(old):
 scripts=lambda raw:re.findall(r'<script(?:\s[^>]*)?>([\s\S]*?)</script>',raw.decode(),re.I)
 engine=lambda raw:next(s for s in scripts(raw) if 'function spawn(' in s and 'function destroyObjects(' in s)
 before=old.read('cqc-versus-v056/modules/unified-versus-v055.html');after=(R/'modules/unified-versus-v055.html').read_bytes()
 a=engine(before);b=engine(after)
 check('full_inline_simulation_engine_exact_from_immutable_pass5',a==b and sha(b.encode())=='197acd7da230bf479a68d37ff409801c0d4390d001a98b4c1451075be55d2d51',engineSha256=sha(b.encode()))
 prior=['data/finishers-v046.json','data/finishers-v050.json','data/finishers-v051.json','data/finishers-v053.json','src/cqc-pass5-native-origins.js','src/cqc-pass5-combat-fidelity.js','src/cqc-pass5-prop-data.js','src/cqc-pass5-prop-art.js','src/cqc-sprite-renderer.js']
 errors=[p for p in prior if not same_record(p,sha(old.read('cqc-versus-v056/'+p)))]
 check('historical_finisher_json_and_pass5_helpers_unchanged',not errors,paths=prior,errors=errors)
 catalog=js(R/'data/combat-prop-catalog-pass6.json');props_bad=[]
 expected={'pain-hornets':'ae797ac1319a863e584c0b8911b940cd97cf40a51e606bbbbc9e3e74b169c26f','fear-bolts':'f9ec9b95a257944d9ba365aaa131506f3ba3ff6f431d9b3b77a5a8fc098a22fc','fury-flames':'43cacfaa191d615362ad8f0a3db809722a64135cd4036d233fcb176b693670ef'}
 for key,digest in expected.items():
  row=catalog.get(key,{})
  if row.get('sha256')!=digest or not same_record(row.get('file',''),digest):props_bad.append(key)
 check('three_native_prop_atlases_exact_approved_bytes',set(catalog)==set(expected) and not props_bad,errors=props_bad)
 check('prop_embedded_catalog_matches_live_json',assignment((R/'src/cqc-pass6-prop-data.js').read_bytes(),'CQC_PASS6_PROP_CATALOG')==catalog)
 helperpaths=['src/cqc-pass6-native-origins.js','src/cqc-pass6-combat-fidelity.js','src/cqc-pass6-prop-data.js','src/cqc-pass6-prop-art.js']
 check('four_pass6_helpers_reachable_from_live_versus_html',all(('../'+p).encode() in after for p in helperpaths),helpers=helperpaths)
 measures['gameplay']={'engineSha256':sha(b.encode()),'historicalHelpersAndFinisherJSON':prior,'newHelperSha256':{p:actual[p]['sha256'] for p in helperpaths},'nativePropAtlases':len(catalog)}

def verify_runtime_graph(facts):
 root=S/'public/cqc';mp=root/'runtime-manifest.json';d=js(mp);rows=d['files'];table={r['path']:r for r in rows};bad=[];transformations=[]
 for row in rows:
  p=row['path'];target=root/p
  if not safe_path(p) or p.split('/')[0] in EXCLUDED or not target.is_file() or target.is_symlink():bad.append({'path':p,'reason':'Unsafe/missing runtime file'});continue
  raw=target.read_bytes()
  if len(raw)!=row['bytes'] or sha(raw)!=row['sha256']:bad.append({'path':p,'reason':'Runtime payload differs from manifest'})
  if p not in actual:bad.append({'path':p,'reason':'No standalone source counterpart'});continue
  if row.get('transformation'):
   transformations.append({'path':p,'transformation':row['transformation']})
   if actual[p]['sha256']!=row.get('sourceSha256'):bad.append({'path':p,'reason':'Transformed source SHA differs'})
   if p=='index.html':
    source=(R/p).read_text();expected=re.sub(r'''\.toLowerCase\(\)\.includes\((['"])cqc\1\)''',".toLowerCase().startsWith('cqc')",source).encode()
    if raw!=expected or row['transformation']!='cqc-save-namespace':bad.append({'path':p,'reason':'Unexpected namespace transformation'})
   elif p=='modules/atelier-v056.html':
    with zipfile.ZipFile(OLD_SHADOW) as old:
     if raw!=old.read('shadow-codec-ops/public/cqc/'+p):bad.append({'path':p,'reason':'Web workshop differs from frozen known template'})
    if row['transformation']!='web-only-workshop':bad.append({'path':p,'reason':'Unexpected workshop transformation'})
   else:bad.append({'path':p,'reason':'Unexpected runtime transformation'})
  elif row['sha256']!=actual[p]['sha256'] or row['bytes']!=actual[p]['bytes']:bad.append({'path':p,'reason':'Standalone/runtime source mismatch'})
 check('standalone_and_shadow_all_runtime_payload_bytes_verified',len(table)==len(rows) and not bad and sum(r['bytes'] for r in rows)==d['totalBytes'],runtimeFiles=len(rows),runtimeBytes=d['totalBytes'],errors=bad)
 check('only_two_frozen_known_runtime_transformations',sorted(transformations,key=lambda r:r['path'])==[{'path':'index.html','transformation':'cqc-save-namespace'},{'path':'modules/atelier-v056.html','transformation':'web-only-workshop'}],transformations=transformations)
 edges=d.get('references',[]);edge_bad=[e for e in edges if e['from'] not in table or e['to'] not in table]
 seen={'index.html'};changed=True
 while changed:
  found=seen|{e['to'] for e in edges if e['from'] in seen};changed=found!=seen;seen=found
 check('runtime_reference_graph_closed_and_all_payload_reachable',not edge_bad and set(table)==seen,edges=len(edges),unreachable=sorted(set(table)-seen),errors=edge_bad)
 claimed=facts.get('runtimeManifestSha256') or facts.get('runtimeManifestSHA256')
 check('runtime_manifest_matches_root_frozen_identity',bool(claimed) and file_sha(mp)==claimed,actualSha256=file_sha(mp),frozenSha256=claimed)
 measures['runtime']={'manifest':str(mp),'manifestSha256':file_sha(mp),'files':len(rows),'bytes':d['totalBytes'],'referenceEdges':len(edges),'transformations':transformations}

QA_DEFAULTS={
 'core':W/'cqc-pass6-core-qa.json',
 'sprites':R/'preparation/combat-sprites-pass6/FINAL_PASS6_SPRITE_RUNTIME_VERIFICATION.json',
 'standaloneBrowser':W/'cqc-pass6-gameplay-browser-final/verification.json',
 'shadowBrowser':W/'shadow-cqc-pass6-browser-qa/browser-results-pass6.json',
 'shadowNpm':W/'shadow-cqc-pass6-final-npm-qa.json',
 'gameplayPhysical':W/'cqc-pass6-gameplay-browser-physical-review.json',
 'narratives':W/'cqc-pass6-narrative-qa.json',
 'ceilings':W/'cqc-pass6-native-ceiling-physical-review.json',
 'combat':W/'cqc-pass6-combat-source-review.json'}

def qa_paths(facts):
 declared=facts.get('qaPaths',{})
 aliases={'core':'coreQA','sprites':'spriteQA','standaloneBrowser':'standaloneBrowserQA','shadowBrowser':'shadowBrowserQA','shadowNpm':'shadowNpmQA','gameplayPhysical':'gameplayPhysicalQA','narratives':'narrativeQA','ceilings':'ceilingQA','combat':'combatQA'}
 out={}
 for key,default in QA_DEFAULTS.items():
  value=declared.get(key,facts.get(aliases[key],str(default)))
  if isinstance(value,str):value={'path':value}
  out[key]=value
 if 'ceilingsFinal' in declared:
  value=declared['ceilingsFinal'];out['ceilingsFinal']={'path':value} if isinstance(value,str) else value
 return out

def verify_source_pin_rows(name,rows,root):
 bad=[]
 if isinstance(rows,dict):rows=[{'path':k,'sha256':v} for k,v in rows.items()]
 for row in rows:
  p=Path(row['path']);p=p if p.is_absolute() else root/p
  if not p.is_file() or file_sha(p)!=row['sha256'] or ('bytes' in row and p.stat().st_size!=row['bytes']):bad.append(str(p))
 check(name,bool(rows) and not bad,pinnedFiles=len(rows),errors=bad)

def verify_final_qa(facts):
 reports={};paths=qa_paths(facts);summary={}
 for key,row in paths.items():
  p=Path(row['path']);exists=p.is_file();check('fresh_required_qa_report_exists:'+key,exists,path=str(p))
  if not exists:continue
  d=js(p);reports[key]=d;status=d.get('status');passed=status=='passed' or (key=='core' and d.get('passedAllChecks') is True)
  if key in ['ceilings','ceilingsFinal']:passed=status=='accepted_closest' and d.get('failures')==0
  if key=='combat':passed=status=='accepted_closest_supported' and all(r.get('status')=='accepted' for r in d.get('findings',[])) and len(d.get('findings',[]))==6
  check('fresh_required_qa_report_passed:'+key,passed,status=status,passedAllChecks=d.get('passedAllChecks'))
  digest=file_sha(p)
  if row.get('sha256'):check('root_frozen_qa_report_identity:'+key,digest==row['sha256'],actualSha256=digest,expectedSha256=row['sha256'])
  if key!='sprites':
   retained,locations=exact_external_preserved(p)
   check('fresh_qa_report_byte_exact_source_copy:'+key,retained,paths=locations)
  summary[key]={'path':str(p),'sha256':digest,'status':status}
  for pinfield in ['sourceInputsSHA256','productionInputSHA','sourceInputsSha256','inputShaAfter']:
   if d.get(pinfield):verify_source_pin_rows('qa_current_source_pins:'+key+':'+pinfield,d[pinfield],R)
 core=reports.get('core')
 if core:
  suites=core['suites'];invalid=[];total=0;passed=0
  for row in suites:
   p=Path(row['test']);total+=row['tests'];passed+=row['passed']
   if not p.is_file() or file_sha(p)!=row['testSourceSha256'] or row['exitCode']!=0 or row.get('failed',0)!=0 or row.get('timedOut') or row.get('suiteSucceeded') is not True:invalid.append(row['test'])
   for key,digest in [('stdoutLog','stdoutSha256'),('stderrLog','stderrSha256')]:
    log=Path(row[key])
    if not log.is_file() or file_sha(log)!=row[digest]:invalid.append(str(log))
  check('sixteen_distinct_fresh_core_suites_actual_logs_pass',len(suites)>=16 and len({r['test'] for r in suites})==len(suites) and total==passed and total>=1195 and not invalid,suites=len(suites),tests=total,passed=passed,errors=invalid)
  check('seven_old_reports_restored_and_source_stable_during_core',core.get('allHistoricalReportsRestoredByteExact') is True and core.get('inputsUnchangedDuringRun') is True and core.get('inputShaBefore')==core.get('inputShaAfter'))
  restorations=core.get('reportRestoration',[])
  check('seven_historical_report_restoration_records_present',len(restorations)==7 and all(row.get('restoredByteExact') is True for row in restorations))
  for row in restorations:
   p=row.get('file',row.get('path'));digest=row.get('sha256',row.get('beforeSha256'))
   check('historical_report_restoration_still_current:'+str(p),bool(p) and bool(digest) and Path(p).is_file() and file_sha(p)==digest)
  summary['core']['tests']=total;summary['core']['suites']=len(suites)
 sprites=reports.get('sprites')
 if sprites:
  counts=sprites.get('testResults',{});browser=sprites.get('standaloneActualBrowser',{});uids=sprites.get('perUID',[])
  check('fresh_sprite_migration_renderer_importer_contour_tests_39',counts.get('totalPassed')==39 and counts.get('nodePassed')==29 and counts.get('pythonImporterPassed')==8 and counts.get('pythonBodyContourPassed')==2,actual=counts)
  logbad=[]
  for field in ['nodeReport','pythonImporterReport','pythonContourReport']:
   value=counts.get(field);p=Path(value) if value else None
   if p is not None and not p.is_absolute():p=Path(paths['sprites']['path']).parent/p
   if p is None or not p.is_file():logbad.append(str(p))
   elif not ('29' in p.read_text(errors='replace') if field=='nodeReport' else 'OK' in p.read_text(errors='replace')):logbad.append(str(p))
  check('fresh_sprite_tool_result_logs_present',not logbad,errors=logbad)
  check('four_uid_native_browser_actual_phase_coverage_and_physical_review',len(uids)==4 and {u['uid'] for u in uids}==NEW_UIDS and all(u.get('status')=='passed' and u.get('browserConsoleErrors')==0 and u.get('physicallyViewedAllSixCanvasContactSheets') is True and u.get('verifiedEntrySha256')==norm(js(R/'data/combat-sprite-catalog-v1.json')['entries'][u['uid']]) for u in uids) and browser.get('actualTechniqueStartsAndPhaseSamples')==480 and browser.get('nativeCanvasContactSheets')==24 and browser.get('nativeCanvasPoseObservations')==288 and browser.get('physicalAllTwentyFourCanvasSheetsViewed') is True,summary=browser)
  for row in uids:
   digest=row.get('verificationSha256');check('per_uid_browser_evidence_retained:'+row['uid'],bool(digest) and bool(preserved_paths(digest)),verificationSha256=digest)
 for key in ['standaloneBrowser','shadowBrowser']:
  d=reports.get(key)
  if not d:continue
  observed=d.get('observed',{});commands=d.get('commands',[]);check('fresh_actual_browser_commands_all_succeeded:'+key,bool(commands) and all(c.get('exit')==0 and c.get('result',{}).get('success') is True for c in commands),commands=len(commands))
  check('fresh_browser_has_36_origins_and_32_contacts_each_mount:'+key,observed.get('sourceOrigins')==36 and observed.get('actualContactCases')==32 and observed.get('PainBarrierCases')==4 and observed.get('FuryTrapHeatCases')==4 and observed.get('EndAmmoCases')==2 and observed.get('FearCloakCases')==2 and observed.get('RedGrenadeCases')==12,observed=observed)
  consoleerrors=[m for m in (d.get('console') or {}).get('messages',[]) if m.get('type')=='error']
  check('fresh_actual_browser_errors_empty_and_owned_server_cleanup:'+key,not (d.get('pageErrors') or {}).get('errors') and not consoleerrors and all(d.get('cleanup',{}).values()),cleanup=d.get('cleanup'),consoleErrors=consoleerrors)
  folder=Path(paths[key]['path']).parent
  if key=='standaloneBrowser':
   before=folder/'source-inputs-before.json';after=folder/'source-inputs-after.json'
   check('standalone_browser_source_pins_equal',before.is_file() and after.is_file() and js(before)==js(after))
   if after.is_file():verify_source_pin_rows('standalone_browser_pins_match_frozen_source',js(after),R)
  else:
   graph=d.get('assetPreflight',{});check('shadow_browser_current_graph_identity',graph.get('manifestSHA256')==measures['runtime']['manifestSha256'] and graph.get('runtimeFiles')==measures['runtime']['files'] and graph.get('runtimeBytes')==measures['runtime']['bytes'] and graph.get('allCopiedBytesVerified') is True,graph=graph)
  summary[key]['observed']=observed
 npm=reports.get('shadowNpm')
 if npm:
  log=Path(npm['log']);text=log.read_text(errors='replace') if log.is_file() else '';plain=re.sub(r'\x1b\[[0-?]*[ -/]*[@-~]','',text)
  tests=re.search(r'(?<!File)Tests\s+(\d+) passed\s*\((\d+)\)',plain);files=re.search(r'Test Files\s+(\d+) passed\s*\((\d+)\)',plain)
  counts=npm['testCounts'];countok=tests is not None and files is not None and int(tests.group(1))==int(tests.group(2))==counts['passedTests']==counts['totalTests'] and int(files.group(1))==int(files.group(2))==counts['passedFiles']==counts['totalFiles']
  check('actual_shadow_npm_fresh_log_exit_counts_and_all_required_steps',npm.get('freshRun') is True and npm.get('oldQAResultsReused') is False and npm.get('exitCode')==0 and log.is_file() and file_sha(log)==npm.get('logSHA256') and countok and all(npm.get('stepsObserved',{}).values()),counts=counts,log=str(log))
  check('shadow_npm_matches_current_runtime_frozen_payload',npm['runtime'].get('manifestSHA256')==measures['runtime']['manifestSha256'] and npm['runtime'].get('inputPayloadSHA256StableDuringQA') is True)
  summary['shadowNpm']['tests']=counts['passedTests'];summary['shadowNpm']['testFiles']=counts['passedFiles']
 narrative=reports.get('narratives')
 if narrative:check('independent_narrative_source_review_zero_failures',narrative.get('failureCount')==0 and not narrative.get('failures') and len(narrative.get('checks',[]))>=743,checks=len(narrative.get('checks',[])))
 physical=reports.get('gameplayPhysical')
 if physical:
  screenshots=physical.get('screenshotsPhysicallyInspected',[]);bad=[]
  for row in screenshots:
   p=Path(row['path'])
   if row.get('physicallyInspected') is not True or not p.is_file() or file_sha(p)!=row.get('sha256') or not preserved_paths(row.get('sha256')):bad.append(row)
  check('gameplay_native_props_and_clear_finisher_13_physical_captures_preserved',len(screenshots)==13 and not bad and physical.get('noProductionFilesChanged') is True,errors=bad)
  browserreports=physical.get('reports',[]);bad=[]
  for row in browserreports:
   p=Path(row['path']);d=js(p) if p.is_file() else {}
   if not p.is_file() or file_sha(p)!=row.get('sha256') or d.get('status')!='passed' or len(d.get('checks',[]))!=row.get('checks') or not preserved_paths(row.get('sha256')):bad.append(row)
  check('final_and_clear_supplement_gameplay_reports_exact_physical_review_inputs',len(browserreports)==3 and not bad and sum(row['checks'] for row in browserreports)==382,errors=bad)
 ceilings=reports.get('ceilings')
 if ceilings:
  catalog=js(R/'data/stage-layer-catalog-reprise.json');stage={s['id']:s for s in catalog['stages']};rows=ceilings.get('additions',[])
  ceilingchecks=ceilings.get('checks',[])
  check('independent_ceiling_physical_review_18_captures_at_least_268_checks',ceilings.get('checkCount')==len(ceilingchecks) and len(ceilingchecks)>=268 and all(r.get('passed') is True for r in ceilingchecks) and ceilings.get('physicalCaptureCount')==18 and len(ceilings.get('physicallyViewedCaptures',[]))==18 and ceilings.get('physicalReferenceCount')==5 and ceilings.get('absolute1to1Certified') is False and ceilings.get('rejectedCandidateApproved') is False,checks=len(ceilingchecks))
  check('independently_reviewed_ceiling_layer_objects_match_final_source',len(rows)==3 and {r['uid'] for r in rows}==CEILINGS and all(r['layer'] in stage[r['uid']]['layers'] and r['source']['sha256']==r['layer']['sha256'] for r in rows))
  for field in ['catalogAtReview','baselineCatalog','captureRun']:
   row=ceilings.get(field,{});p=Path(row.get('path',''));digest=row.get('sha256');current=p.is_file() and file_sha(p)==digest
   # Root adds the final acceptance note only after physical review. The exact
   # reviewed earlier catalog must survive in recovery when that note changes.
   if field=='catalogAtReview':current=current or bool(preserved_paths(digest))
   check('independent_ceiling_review_input_evidence_retained:'+field,current,sha256=digest,path=str(p))
 combat=reports.get('combat')
 if combat:
  verify_source_pin_rows('combat_independent_review_production_inputs_current',combat.get('reviewedProductionFiles',[]),R)
  verify_source_pin_rows('combat_raw_historical_catalog_inputs_current',combat.get('rawHistoricalCatalogs',[]),R)
  engine=combat.get('inlinePhysicsEngine',{});check('combat_independent_review_engine_same_immutable_bytes',engine.get('pass5ByteExact') is True and engine.get('sha256')==measures['gameplay']['engineSha256'])
  hooks=combat.get('finisherHooks',{});check('combat_corrected_finishers_source_hooks_and_fallbacks_reviewed',hooks.get('applyAfterCanonicalViper') is True and hooks.get('attackerNativePoseHook') is True and hooks.get('threeGenericFxBranchesGuarded')==3 and hooks.get('nonTargetFallbackRetained') is True)
  row=combat.get('meaningfulRuntimeMetadataQa',{});p=Path(row.get('path',''));d=js(p) if p.is_file() else {}
  check('independent_827_assertion_finisher_metadata_qa_current_and_passed',p.is_file() and file_sha(p)==row.get('sha256') and row.get('status')=='passed' and row.get('assertions')==827 and row.get('unchangedOtherProfiles')==348 and row.get('idempotenceVerified') is True and row.get('all24RemainCanonicalFalseAdaptation') is True)
  retained,locations=exact_external_preserved(p);check('independent_finisher_qa_bytes_preserved_in_source',retained,paths=locations)
  for field in ['sourceInputsSHA256','reviewedProductionFiles']:
   if d.get(field):verify_source_pin_rows('independent_finisher_qa_current_inputs:'+field,d[field],R)
 finalceilings=reports.get('ceilingsFinal')
 if finalceilings:
  finalchecks=finalceilings.get('checks',[]);linked=finalceilings.get('originalPhysicalReview',{});original=summary.get('ceilings',{})
  check('final_ceiling_metadata_review_242_checks_link_original_physical_review',finalceilings.get('metadataChangesOnlySincePhysicalReview') is True and finalceilings.get('checkCount')==len(finalchecks)==242 and all(r.get('passed') is True for r in finalchecks) and linked.get('sha256')==original.get('sha256') and linked.get('checks')==268 and linked.get('failures')==0 and finalceilings.get('absolute1to1Certified') is False)
  verify_source_pin_rows('final_ceiling_catalog_and_embedded_data_pins_current',[finalceilings['finalCatalog'],finalceilings['finalEmbeddedData']],R)
  digest=finalceilings.get('reconstructedPreviousCatalogSHA256')
  check('exact_physically_reviewed_pre_metadata_stage_catalog_preserved',digest==(ceilings or {}).get('catalogAtReview',{}).get('sha256') and bool(preserved_paths(digest)),sha256=digest,paths=preserved_paths(digest))
  stage={s['id']:s for s in js(R/'data/stage-layer-catalog-reprise.json')['stages']};rows=finalceilings.get('finalizedMetadata',[])
  check('final_ceiling_acceptance_metadata_matches_actual_source',len(rows)==3 and {r['uid'] for r in rows}==CEILINGS and all(r['metadata']==stage[r['uid']]['review']['pass6CameraMargin'] for r in rows))
 measures['freshFinalQA']=summary

def main():
 global actual,OUT
 parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('--execute',action='store_true');parser.add_argument('--facts',type=Path,default=W/'cqc-pass6-final-source-review-facts.json');parser.add_argument('--output',type=Path,default=OUT);args=parser.parse_args()
 if not args.execute:
  print(json.dumps({'status':'plan_only','needsRootFinalPreservationReadySignal':True,'facts':str(args.facts),'output':str(args.output),'historicalBaselines':[{ 'file':n,'files':c,'sha256':h}for n,c,h in BASELINES],'previousDeliveryPins':46,'requiredQAKinds':list(QA_DEFAULTS),'productionMutations':False},ensure_ascii=False,indent=2));return
 if not args.facts.is_file():raise RuntimeError('Final root-confirmed facts missing; no final review may run')
 facts=js(args.facts)
 if facts.get('confirmedByRoot') is not True or facts.get('sourceState')!='frozen':raise RuntimeError('Root must confirm frozen source before final preservation review')
 OUT=args.output
 if OUT.exists():raise FileExistsError('Preserve previous review evidence; use a fresh --output path')
 started=datetime.now(timezone.utc).isoformat();error=None
 try:
  print('Indexing frozen standalone source and byte-exact recovery evidence.',flush=True);actual=live_index()
  for p,row in actual.items():by_sha[row['sha256']].append(p)
  check('standalone_source_contains_no_symbolic_links',not [p for p,r in actual.items() if r['symlink']])
  verify_pins_and_crc();verify_histories()
  with zipfile.ZipFile(BASE) as old:
   verify_native_sets(old);verify_artist_and_native_preservation(old,facts);verify_narratives(old);verify_stages(old);verify_gameplay_preservation(old)
  verify_runtime_graph(facts);verify_final_qa(facts)
  print('Checking reviewed sources remain byte exact.',flush=True)
  after=live_index();changed=sorted(p for p in set(actual)|set(after) if actual.get(p)!=after.get(p))
  check('all_source_bytes_and_paths_stable_during_independent_review',not changed,changed=changed)
 except Exception as exc:
  error=traceback.format_exc();check('review_completed_without_exception',False,error=repr(exc));print(error,flush=True)
 report={'schema':'cqc.pass6.independent-source-preservation-review/1','status':'failed'if failures else'passed','reviewer':'pass6_preservation_review','startedAt':started,'finishedAt':datetime.now(timezone.utc).isoformat(),'readOnlyProductionAndArchives':True,'productionMutations':False,'rootFrozenFacts':str(args.facts),'rootFrozenFactsSha256':file_sha(args.facts),'script':str(Path(__file__).resolve()),'scriptSha256':file_sha(__file__),'assertionCount':len(checks),'failureCount':len(failures),'failures':failures,'exception':error,'measures':measures,'assertions':checks,'limits':['Source-byte preservation and fresh result identity; no absolute original PS2/MSX2/PSP pixel, geometry or animation fidelity certificate.','Source gameplay runtime is verified in both mounts; historical/production evidence remains in the standalone source instead of the deployed runtime.','Large source reference videos are retained locally with SHA identities; URL/title/frame provenance is preserved separately.','No PASS6 full ZIP package or GitHub publication claim is made by this source review.']}
 with OUT.open('x') as stream:stream.write(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
 print(json.dumps({'status':report['status'],'output':str(OUT),'sha256':file_sha(OUT),'assertions':len(checks),'failures':len(failures),'productionMutations':False},ensure_ascii=False,indent=2),flush=True)
 if failures:raise SystemExit(1)

if __name__=='__main__':main()
