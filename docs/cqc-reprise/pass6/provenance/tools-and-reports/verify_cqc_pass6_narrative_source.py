#!/usr/bin/env python3
"""Read-only independent verification of PASS6 scene integration against frozen PASS5."""
import copy, hashlib, json, re, struct, zipfile
from pathlib import Path
ROOT=Path('/workspace/cqc-game-working/cqc-versus-v056')
ARCHIVE=Path('/workspace/CQC_Versus_Legacy_v0.56_REPRISE_PASS5_2026-10-01.zip')
MANIFEST=Path('/workspace/cqc-pass6-narrative-art/APPROVED_NARRATIVE_MANIFEST.json')
OUT=Path('/workspace/cqc-pass6-narrative-qa.json')
REPORT=Path('/workspace/cqc-pass6-narrative-qa.md')
PREFIX='cqc-versus-v056/'
BATCH='reprise-pass6-mg2-msx2-narratives-2026-10-02'
BACKUP=ROOT/'recovery/pre-reprise'/BATCH
files={'data':'data/chronicles-v056.json','catalog':'data/plate-catalog-illustrated-v056.json','mapping':'data/scene-art-map-illustrated-v056.json','art':'data/illustration-assets-v056.json','backlog':'data/illustration-backlog-v056.json','progress':'data/illustration-progress-v056.json'}
def digest(b):return hashlib.sha256(b).hexdigest()
def hashfile(p):
 h=hashlib.sha256()
 with Path(p).open('rb')as f:
  for b in iter(lambda:f.read(1024*1024),b''):h.update(b)
 return h.hexdigest()
def normalized(d):return digest(json.dumps(d,ensure_ascii=False,sort_keys=True,separators=(',',':')).encode())
def comparable_review(review):
 r=copy.deepcopy(review)
 for s in r.get('sources',[]):s.pop('path',None)
 return r
def reference_hash(path):
 p=Path(path);p=p if p.is_absolute()else ROOT/p
 return hashfile(p)if p.is_file()else None
checks=[];errors=[]
def check(name,result,**detail):
 checks.append({'name':name,'pass':bool(result),**detail})
 if not result:errors.append(name)
def load(p):return json.loads(Path(p).read_text())
def strip_scene_visuals(d):
 x=copy.deepcopy(d)
 for s in x['stories'].values():
  for phase in ['intro','outro']:
   for card in s[phase]:card.pop('visual',None)
 for k in ['counts','illustrationUpdate','visualMethod']:x.pop(k,None)
 return x
def extract_json_assignment(source,name,prefix_pattern):
 matches=list(re.finditer(prefix_pattern+re.escape(name)+r'\s*=\s*',source))
 if len(matches)!=1:raise ValueError('Unexpected assignment count for '+name+':'+str(len(matches)))
 return json.JSONDecoder().raw_decode(source[matches[0].end():])[0]
manifest=load(MANIFEST);targets={a['sceneKey']for a in manifest['assets']};targetuids={a['uid']for a in manifest['assets']}
with zipfile.ZipFile(ARCHIVE)as z:
 old={k:json.loads(z.read(PREFIX+p))for k,p in files.items()}
 new={k:load(ROOT/p)for k,p in files.items()}
 byteproof=[]
 for k,p in files.items():
  baseline=z.read(PREFIX+p);bp=BACKUP/p
  if bp.is_file():byteproof.append({'file':p,'baselineSha256':digest(baseline),'backupSha256':hashfile(bp),'same':baseline==bp.read_bytes()})
 check('preimport_backup_matches_frozen_pass5_bytes',len(byteproof)==len(files)and all(x['same']for x in byteproof),files=byteproof)
 check('exactly_12_target_scenes_and_two_stories',len(targets)==12 and targetuids=={'core__runner_mg2','core__redblaster_mg2'},sceneKeys=sorted(targets))
 check('all_354_story_uids_and_fighter_ids_preserved',len(new['data']['stories'])==354 and set(old['data']['stories'])==set(new['data']['stories'])and old['data']['fighters']==new['data']['fighters'],stories=len(new['data']['stories']),fighters=len(new['data']['fighters']))
 oldroutes={uid:s['route']for uid,s in old['data']['stories'].items()}
 newroutes={uid:s['route']for uid,s in new['data']['stories'].items()}
 check('all_2832_routes_identical',oldroutes==newroutes and sum(map(len,newroutes.values()))==2832,routes=sum(map(len,newroutes.values())),sha256=normalized(newroutes))
 oldnarrative=strip_scene_visuals(old['data']);newnarrative=strip_scene_visuals(new['data'])
 check('all_text_props_titles_cameras_places_lore_and_structures_identical',oldnarrative==newnarrative,baselineNarrativeSha256=normalized(oldnarrative),currentNarrativeSha256=normalized(newnarrative))
 changed_visuals=[]
 for uid,os in old['data']['stories'].items():
  ns=new['data']['stories'][uid]
  for phase in ['intro','outro']:
   check('six_cards_preserved:'+uid+':'+phase,len(os[phase])==len(ns[phase])==3)
   for i,(oc,nc)in enumerate(zip(os[phase],ns[phase])):
    if oc['visual']!=nc['visual']:changed_visuals.append(f'{uid}:{phase}:{i}')
 check('only_12_authorized_visual_fields_changed',set(changed_visuals)==targets,changedSceneKeys=sorted(changed_visuals))
 check('mapping_keys_2124_preserved',set(old['mapping'])==set(new['mapping'])and len(new['mapping'])==2124,count=len(new['mapping']))
 check('mapping_only_12_authorized_values_changed',{k for k in old['mapping']if old['mapping'][k]!=new['mapping'][k]}==targets)
 check('all_old_catalog_entries_identical',all(new['catalog'].get(k)==v for k,v in old['catalog'].items()),oldEntries=len(old['catalog']),newEntries=len(new['catalog']))
 check('exactly_12_new_catalog_entries',set(new['catalog'])-set(old['catalog'])=={a['id']for a in manifest['assets']})
 check('all_old_art_records_identical',new['art']['assets'][:len(old['art']['assets'])]==old['art']['assets'],oldRecords=len(old['art']['assets']),newRecords=len(new['art']['assets']),oldFullSceneRecords=sum(bool(a['fullScene'])for a in old['art']['assets']))
 old_asset_paths={a[k]for a in old['art']['assets']for k in ['file','original']if a.get(k)}
 old_asset_paths|={d['file']for d in old['catalog'].values()}
 image_checks=[]
 historically_absent_originals=[]
 for p in sorted(old_asset_paths):
  path=ROOT/p
  if PREFIX+p not in z.namelist():
   historically_absent_originals.append({'file':p,'absentInFrozenPass2':True,'existsCurrently':path.is_file(),'reason':'Legacy original PNG pointer was already absent before PASS6; no new loss, runtime WebP preserved separately.'})
   continue
  expected=digest(z.read(PREFIX+p));got=hashfile(path)if path.is_file()else None
  image_checks.append({'file':p,'sha256':expected,'same':got==expected})
 check('all_old_474_runtime_paintings_and_available_original_bytes_preserved',all(r['same']for r in image_checks),checkedFiles=len(image_checks),oldPaintedSceneUses=old['data']['counts']['fullSceneUses'],details=image_checks)
 check('unrecovered_legacy_original_pngs_explicitly_distinguished',all('/originals/'in r['file']for r in historically_absent_originals),historicallyAbsentCount=len(historically_absent_originals),details=historically_absent_originals)
 saved_external_checks=[]
 for a in old['art']['assets']:
  for r in a.get('canonicalReview',{}).get('sources',[]):
   path=Path(r['path']);path=path if path.is_absolute()else ROOT/path
   same=path.is_file()and hashfile(path)==r['sha256'];saved_external_checks.append({'path':str(path),'sha256':r['sha256'],'same':same})
 check('old_canonical_review_sources_match_saved_sha',all(x['same']for x in saved_external_checks),checkedReferences=len(saved_external_checks),details=saved_external_checks)
 reference_candidates=[]
 for name in z.namelist():
  if not name.startswith(PREFIX)or name.endswith('/'):continue
  p=name[len(PREFIX):]
  if ('/references/'in p or '/cqc-stage-canonical-references/'in p or '/cqc-canonical-references/'in p or p.startswith('preparation/reprise-pass3-provenance/next-two/')or p.startswith('assets/portraits-v056/')):
   reference_candidates.append(p)
 reference_checks=[]
 for p in sorted(reference_candidates):
  path=ROOT/p;expected=digest(z.read(PREFIX+p));got=hashfile(path)if path.is_file()else None
  reference_checks.append({'file':p,'sha256':expected,'same':got==expected})
 check('frozen_pass5_reference_and_portrait_bytes_preserved',all(x['same']for x in reference_checks),checkedFiles=len(reference_checks),details=reference_checks)
 native_checks=[]
 for a in manifest['assets']:
  runtime=ROOT/'assets/illustrations-v056/originals'/f'{a["id"]}.png';native=Path(a['sourcePath']);delivered=Path(a['file']);delivered=delivered if delivered.is_absolute()else MANIFEST.parent/delivered
  b=runtime.read_bytes()if runtime.is_file()else b'';dims=struct.unpack('>II',b[16:24])if b[:8]==b'\x89PNG\r\n\x1a\n'else(None,None)
  same=bool(b)and digest(b)==a['sha256']and hashfile(native)==a['sha256']and hashfile(delivered)==a['sha256']and dims==(a['width'],a['height'])
  reg=next((r for r in new['art']['assets']if r['id']==a['id']),None)
  reviewed=bool(reg)and comparable_review(reg['canonicalReview'])==comparable_review(a['canonicalReview'])and reg['prompt']==a['prompt']
  if reviewed:
   reviewed=[reference_hash(p)for p in reg['referencePaths']]==[reference_hash(p)for p in a['referencePaths']]and all(reference_hash(r['path'])==r['sha256']for r in reg['canonicalReview']['sources'])
  native_checks.append({'sceneKey':a['sceneKey'],'file':str(runtime.relative_to(ROOT)),'sha256':a['sha256'],'nativeByteMatch':same,'reviewAndPromptMatch':reviewed,'dimensions':dims})
 check('all_12_native_pngs_hash_dimensions_and_reviews_match',all(r['nativeByteMatch']and r['reviewAndPromptMatch']for r in native_checks),details=native_checks)
 before_keys={r['sceneKey']for r in old['backlog']['scenes']};after_keys={r['sceneKey']for r in new['backlog']['scenes']}
 check('backlog_only_12_keys_removed',before_keys-after_keys==targets and not(after_keys-before_keys),before=len(before_keys),after=len(after_keys),removed=sorted(before_keys-after_keys))
 check('remaining_backlog_scene_rows_identical',new['backlog']['scenes']==[r for r in old['backlog']['scenes']if r['sceneKey']not in targets])
 check('remaining_backlog_story_rows_identical',new['backlog']['stories']==[r for r in old['backlog']['stories']if r['uid']not in targetuids],before=len(old['backlog']['stories']),after=len(new['backlog']['stories']))
 actual_full=[];complete=0;partial=0
 for uid,s in new['data']['stories'].items():
  n=0
  for phase in ['intro','outro']:
   for i,c in enumerate(s[phase]):
    v=c['visual'];definition=new['catalog'][v['set']]
    if v.get('fullScene')and definition.get('fullScene'):
     actual_full.append(f'{uid}:{phase}:{i}');n+=1
  complete+=n==6;partial+=0<n<6
 measured={'fullSceneUses':len(actual_full),'fullyPaintedStories':complete,'partiallyPaintedStories':partial,'composedScenes':2124-len(actual_full),'remainingStories':354-complete,'fullSceneCatalogPaintings':sum(bool(v.get('fullScene'))for v in new['catalog'].values())}
 check('coverage_computed_independently_matches_reports',measured=={'fullSceneUses':486,'fullyPaintedStories':81,'partiallyPaintedStories':0,'composedScenes':1638,'remainingStories':273,'fullSceneCatalogPaintings':486},actual=measured)
 for field in ['fullSceneUses','fullyPaintedStories','partiallyPaintedStories','composedScenes']:
  check('chronicles_count_consistent:'+field,new['data']['counts'][field]==measured[field])
 check('backlog_counts_consistent',new['backlog']['counts']['scenesToPaint']==measured['composedScenes']and new['backlog']['counts']['storiesStillIncomplete']==measured['remainingStories']and new['backlog']['counts']['currentFullScenePaintings']==measured['fullSceneCatalogPaintings'])
 progress_keys=set(new['progress']['remainingSceneKeys'])
 check('progress_pending_keys_exact',progress_keys==after_keys)
 queue=[json.loads(l)for l in (ROOT/'preparation/illustration-backlog-v056/GENERATION_QUEUE_1692.jsonl').read_text().splitlines()if l.strip()]
 check('generation_queue_rows_exact',queue==new['backlog']['scenes'])
 next_batch=load(ROOT/'preparation/illustration-backlog-v056/NEXT_BATCH_168.json')
 check('next_batch_is_current_first_168',next_batch['scenes']==new['backlog']['scenes'][:168])
 for field,path,var in [('data','src/chronicles-data-v056.js','CQC55_DATA'),('catalog','src/chronicles-plate-data-v056.js','CQC56_PLATE_CATALOG')]:
  val=extract_json_assignment((ROOT/path).read_text(),var,r'window\.')
  check('embedded_js_matches:'+field,val==new[field])
 album=(ROOT/'docs/ALBUM_LOCAL_354_RECITS_v0.56.html').read_text()
 for field,var in [('data','CQC55_DATA'),('catalog','CQC56_PLATE_CATALOG')]:
  val=extract_json_assignment(album,var,r'(?:window\.)?')
  check('embedded_album_matches:'+field,val==new[field])
 backloghtml=(ROOT/'docs/BACKLOG_ILLUSTRATIONS_v0.56.html').read_text()
 embedded_backlog=extract_json_assignment(backloghtml,'DATA',r'const\s+')
 check('embedded_backlog_html_matches',embedded_backlog==new['backlog']['scenes'])
 for path in ['docs/SCENES_1692_A_PEINDRE_v0.56.csv','docs/RECITS_282_A_PEINDRE_v0.56.csv']:
  check('historical_csv_unchanged:'+path,(ROOT/path).read_bytes()==z.read(PREFIX+path))
 result={'schema':'cqc.pass6.narrative-independent-qa/1','reviewer':'pass6_narrative_art','date':'2026-10-02','readOnly':True,'baselineArchive':str(ARCHIVE),'baselineMembersVerified':byteproof,'newManifest':str(MANIFEST),'approvedSceneKeys':sorted(targets),'measuredCoverage':measured,'checks':checks,'historicallyAbsentLegacyNativePngPointers':historically_absent_originals,'failureCount':len(errors),'failures':errors,'status':'passed'if not errors else'failed','scopeLimit':'Source/bytes/identity/coverage verification only. No new browser captures or gameplay balancing certification from this report. Separate artist reviews establish closest supported visual fidelity, not absolute 1:1. Legacy original PNG pointers absent before PASS6 remain unrecovered, distinct from preserved runtime WebP paintings.'}
 OUT.write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
 REPORT.write_text('Contrôle indépendant après import PASS6 : '+result['status'].upper()+'.\n\n'
  +'Base figée : ZIP PASS5, comparé aux sauvegardes exactes précédant l’import.\n\n'
  +'354 récits, 2 832 routes et tous textes, titres, lieux, accessoires, caméras, identités et lore restent identiques. Seuls les 12 champs visual autorisés, leurs mappings et les compteurs/indices de couverture ont changé.\n\n'
  +f'Couverture observée : {len(actual_full)} tableaux utilisés, {complete} récits entièrement peints, {measured["composedScenes"]} scènes encore composées, {measured["remainingStories"]} récits incomplets.\n\n'
  +f'Préservation : {len(image_checks)} fichiers des tableaux/catalogues antérieurs comparés octet/SHA au ZIP ; {len(reference_checks)} fichiers de références/portraits historiques comparés ; {len(saved_external_checks)} sources des revues anciennes vérifiées. Douze nouveaux PNG natifs correspondent aux fichiers générés, aux livraisons et aux SHA des manifests.\n\n'
  +f'Limite historique : {len(historically_absent_originals)} pointeurs PNG original étaient déjà absents du ZIP PASS5 et ne sont pas récupérés par PASS6 ; les WebP runtime correspondants sont conservés. Aucun natif historique absent n’est présenté comme récupéré.\n\n'
  +'Backlog : exactement les 12 clés demandées retirées ; autres entrées conservées. Queue, prochain lot, JS et album embarqués cohérents ; CSV historiques inchangés.\n\n'
  +f'Échecs : {len(errors)}. Détails dans cqc-pass6-narrative-qa.json.\n\n'
  +'Portée : audit source et préservation, pas une nouvelle vérification navigateur ni une certification 1:1 absolue.\n')
 print(json.dumps({'status':result['status'],'checks':len(checks),'failures':errors,'coverage':measured,'oldImageFilesChecked':len(image_checks),'oldReferenceFilesChecked':len(reference_checks),'oldCanonicalReferenceRecordsChecked':len(saved_external_checks),'report':str(OUT)},indent=2))
 if errors:raise SystemExit(1)
