from pathlib import Path
import json,csv,hashlib,re,collections,datetime

OUT=Path('/tmp/cqc-pass16-backlog-update')
OLD=Path('/tmp/cqc-next-missing-priority-v1')
R=Path('/workspace/cqc-game-working/cqc-versus-v056')
ROOT=Path('/workspace/cqc-pass16-integration/candidate')
pins={}
def read(path):
    path=Path(path);data=path.read_bytes()
    pins[str(path)]={'file':str(path),'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest()}
    return data.decode('utf-8')
def load(path):return json.loads(read(path))
def dump(name,data):
    (OUT/name).write_text(json.dumps(data,indent=2,ensure_ascii=False))
def write_csv(name,rows):
    with (OUT/name).open('w',newline='',encoding='utf-8') as f:
        w=csv.DictWriter(f,fieldnames=list(rows[0]));w.writeheader();w.writerows(rows)
def read_csv(path):return list(csv.DictReader(read(path).splitlines()))

previous=load(OLD/'CURRENT_REQUESTED_COVERAGE_AND_PRIORITIES_V1.json')
previous_missing=read_csv(OLD/'FIGHTERS_WITHOUT_NATIVE_CURRENT_V1.csv')
stages=read_csv(OLD/'CORE_STAGE_STATUS_CURRENT_V1.csv')
read(OLD/'PRIORITES_MANQUANTES_FR.md')
load(OLD/'CLOSED_NEXT_MISSING_PRIORITY_DELIVERY_V1.json')
base=load(R/'data/combat-sprite-catalog-v1.json')
roster=load(R/'data/unified-roster-v053.json')['fighters']
supplement_text=read(ROOT/'cqc-pass16-sprite-catalog.js')
addition=json.JSONDecoder().raw_decode(supplement_text.split('const addition=',1)[1])[0]
assert len(base['entries'])==53 and len(addition['entries'])==20
assert not (set(base['entries'])&set(addition['entries']))
assert all(e['review']['status']=='approved' for e in addition['entries'].values())
native={**base['entries'],**addition['entries']}
known={f['uid'] for f in roster}
assert len(roster)==len(known)==354
assert 'oc__parallaxe' not in known and 'oc__parallaxe' in native
assert set(base['entries'])-known=={'oc__parallaxe'}
assert set(addition['entries'])<=known
assert sum(f['source']=='CORE' for f in roster)==95
assert len(previous_missing)==302
assert {r['uid'] for r in previous_missing}==known-set(base['entries'])
missing=[r for r in previous_missing if r['uid'] not in addition['entries']]
assert len(missing)==282 and {r['uid'] for r in missing}==known-set(native)
write_csv('FIGHTERS_WITHOUT_NATIVE_POST_PASS16_V1.csv',missing)

next20=[
    ('core__raiden','A-MGR','Revengeance cyborg incarnation, distinguish MGS4/prologue body'),
    ('core__sam','A-MGR','Original Revengeance Murasama/sheathe and anatomical arm details'),
    ('core__mistral','A-MGR','Original multi-arm pole-arm topology and body asymmetry'),
    ('core__monsoon','A-MGR','Original segmented body/sai; specify actual separation states'),
    ('core__sundowner','A-MGR','Original shield-panel hinges/blades; separate parts if needed'),
    ('core__armstrong','A-MGR','Original body/costume and nanomachine phases from direct refs'),
    ('core__khamsin','A-MGR','Original Blade Wolf DLC exosuit/axe; retain articulated machine anatomy'),
    ('core__snake_mg1','B-MG1','Original MSX2 1987 player sprite/manual; expanded side view qualified'),
    ('core__shotmaker','B-MG1','Original MSX2 Shotmaker/Shoot Gunner; no MGS outfit substitution'),
    ('core__machinegun_kid','B-MG1','Original MSX2 Machinegun Kid sprite/weapon source'),
    ('core__dirtyduck','B-MG1','Original MSX2 Dirty Duck/Coward Duck; boomerangs and hostages are separate game work'),
    ('core__bigboss_mg1','B-MG1','Original MSX2 final commander; distinguish MGS3/PW/MG2'),
    ('core__snake_mg2','C-MG2','Original MSX2 1990 player/portrait; do not alias MG1 Snake'),
    ('core__fox_mg2','C-MG2','Original MSX2 unarmed minefield duel; not Gray Fox cyborg'),
    ('core__bigboss_mg2','C-MG2','Original MSX2 final incarnation; fire/spray fight not a new firearm invention'),
    ('core__night_fright','C-MG2','Original Night Sight/Night Fright MSX2 refs before choosing visible silhouette'),
    ('core__hawk','D-GB-ACID2','Original Ghost Babel Slasher Hawk/hawk gear; GBC side-view expansion qualified'),
    ('core__owl','D-GB-ACID2','Original Ghost Babel Marionette Owl; dolls remain distinct required props'),
    ('core__pyro','D-GB-ACID2','Original Ghost Babel Pyro Bison/flame equipment, not MG1 Fire Trooper'),
    ('core__snake_acid2','D-GB-ACID2','Original Ac!d2 Snake incarnation; preserve separate already-native Ac!d1 Snake')]
lookup={f['uid']:f for f in roster};assert len(next20)==20
assert len({u for u,g,q in next20})==20 and all(u in known-set(native) for u,g,q in next20)
nextrows=[{'order':i,'parallelGroup':g,'uid':u,'name':lookup[u]['name'],'episode':lookup[u]['ep'],'status':'proposed-next-batch-not-generated','canonicalReferenceRequirement':q,'deliveryRequirement':'Distinct native facings;13 action groups mapped to actual reviewed poses; byte-identical originals/rejects retained; Root browser QA before promotion'} for i,(u,g,q) in enumerate(next20,1)]
write_csv('NEXT_20_FIGHTERS_PROPOSED_V1.csv',nextrows)

candidate_snake_root=Path('/tmp/cqc-next-big-boss-mgs3-injured-v1')
candidate_stage_root=Path('/tmp/cqc-next-gander-stage-v1')
snake=load(candidate_snake_root/'CLOSED_NATIVE_MGS3_INJURED_CANDIDATE_DELIVERY_V1.json')
snake_notes=read(candidate_snake_root/'LIVRAISON_FR.md')
snake_review=load(candidate_snake_root/'reviews/REJECT_QUALIFICATIONS_AND_FINAL_PHYSICAL_REVIEW_V1.json')
gander=load(candidate_stage_root/'CLOSED_NATIVE_GANDER_STAGE_CANDIDATE_DELIVERY_V1.json')
gander_notes=read(candidate_stage_root/'README_GANDER_STAGE_CANDIDATE.md')
load(candidate_stage_root/'GANDER_STAGE_CANDIDATE_PLAN_V3.json')
assert snake['selectedAtlasCount']==6 and snake['uniqueNativePoses']==72 and snake['published'] is False
assert gander['selectedNativePNGCount']==3 and gander['fullRoom1To1Certified'] is False
assert snake['uid'] not in native
candidate_rows=[
 {'id':snake['uid'],'kind':'fighter-variant','selectedNativeFiles':6,'status':'closed-candidate-not-integrated','root':str(candidate_snake_root),'nextAction':'Preserve pre-injury core__snake; review6 sheets and original PS2 eye-side refs; wire distinct variant selector/gallery/moves/save identity, then actual two-direction combat QA','qualification':snake['qualification']},
 {'id':'ghost-galuade-cellule-gander','kind':'stage','selectedNativeFiles':3,'status':'closed-partial-top-down-candidate-not-integrated','root':str(candidate_stage_root),'nextAction':'Review native overlay; decide projection before runtime alias; preserve same displacement for all three ground layers; specify any separate side-view adaptation','qualification':'Partial top-left sector only; whole room/2.5D correspondence/parallax depths/animation not source authenticated; no1:1 certificate'}]
write_csv('PRESERVED_UNINTEGRATED_CANDIDATES_V1.csv',candidate_rows)

priority_stage_ids=[
 'ghost-galuade-cellule-gander','mgs4-laboratoire-naomi','mgs4-tour-europe-est','mgs4-shadow-moses-ruines','mgs4-outer-haven-salle-mantis',
 'pw-pupa-operation','pw-chrysalis-operation','pw-cocoon-operation','pw-peace-walker-operation','mgs3-pont-shagohod','tpp-afghanistan-sahelanthropus-canyon',
 'acid-lobito-island-laboratoire','acid2-saintlogic-laboratoire','mgr-abkhazie-installation-industrielle','mgr-world-marshal-esplanade','mgr-badlands-duel-sam','mgr-abkhazie-carriere-khamsin']
stage_lookup={r['id']:r for r in stages};assert len(stages)==len(stage_lookup)==113
assert all(i in stage_lookup for i in priority_stage_ids)
stage_counts=dict(collections.Counter(r['status'] for r in stages))
assert stage_counts=={'native-reviewed-planes':25,'procedural-Canvas-scene':76,'absent-playable-template':12}
stage_rows=[]
for r in stages:
 priority=0 if r['id']==priority_stage_ids[0] else 1 if r['id'] in priority_stage_ids[1:13] else 2 if r['id'] in priority_stage_ids[13:] else 3 if r['status']=='absent-playable-template' else 4 if r['status']!='native-reviewed-planes' else 9
 status='native-reviewed-planes' if r['status']=='native-reviewed-planes' else r['status']
 candidate=str(candidate_stage_root) if r['id']=='ghost-galuade-cellule-gander' else ''
 stage_rows.append({**r,'priority':priority,'preservedCandidateRoot':candidate,'nextAction':'Preserve existing native alias; no new stage claimed' if priority==9 else 'Review existing partial top-down3 plans and projection before promotion' if candidate else 'Author playable template + source-authenticated plans' if status=='absent-playable-template' else 'Replace procedural presentation with original-edition referenced native plans; adapt camera/parallax explicitly'})
write_csv('CORE_STAGE_STATUS_POST_PASS16_V1.csv',stage_rows)
write_csv('PRIORITY_STAGES_NEXT_V1.csv',sorted([r for r in stage_rows if r['priority']<=3],key=lambda r:(r['priority'],priority_stage_ids.index(r['id']) if r['id'] in priority_stage_ids else 100,r['id'])))

core_machine_text=read(ROOT/'cqc-machine-parts-bridge-v1.js')
acid_machine_text=read(ROOT/'cqc-pass16-acid-native.js')
def ids(text):
    block=re.search(r'const IDS=Object.freeze\(\{(.*?)\}\);',text,re.S).group(1)
    return dict(re.findall(r"([a-z0-9_]+):'([^']+)'",block))
core_machines=ids(core_machine_text);acid_machines=ids(acid_machine_text)
assert len(core_machines)==14 and len(acid_machines)==2
machines=[{'encounter':k,'nativeEditionID':v,'scope':'Core','status':'native-separated-parts-mapped-in-PASS16-source','priority':9,'qualification':'Presentation coverage; source-fidelity limits and actual fight QA remain edition-specific, not full original campaign'} for k,v in core_machines.items()]
machines+=[{'encounter':k,'nativeEditionID':v,'scope':'Independent Ac!d','status':'native-separated-parts-mapped-in-PASS16-source','priority':9,'qualification':'Independent grid module lifecycle/loading must be browser checked; not a Core encounter or complete Ac!d campaign'} for k,v in acid_machines.items()]
machines+=[{'encounter':k,'nativeEditionID':'','scope':scope,'status':'still-procedural-next-work','priority':1 if k=='harrier' else 2,'qualification':q} for k,scope,q in [
 ('harrier','Core','Original MGS2 aircraft, not a Metal Gear; inspect flight/damage state references'),
 ('ray_mgr','Independent Revengeance','MGR unmanned RAY edition; existing MGS2 Arsenal RAY is not a substitute'),
 ('grad_mgr','Independent Revengeance','Original GRAD armor/shield/articulation; preserve edition-specific topology'),
 ('excelsus_mgr','Independent Revengeance','Original EXCELSUS multipart limbs/blades and damage phases; not a recolored REX/RAY')]]
write_csv('MACHINE_PRESENTATION_AND_NEXT_WORK_V1.csv',machines)

menu_rows=[
 {'priority':1,'surface':'Sélection des personnages','currentEvidence':'PASS16 asks diegetic categories; final UI/browser ownership remains Root','nextWork':'Verify universe/faction dossiers, character name and incarnation readability, large portraits, keyboard/focus/touch behavior','qualification':'No new broken button established by this inventory'},
 {'priority':1,'surface':'Ac!d machines loading/return','currentEvidence':'PASS16 source has native loader/lifecycle hooks','nextWork':'Actual loading/retry/abort/return-focus QA for Kodoque and Chaioth in standalone and embedded tabs','qualification':'Source hook is not a passed browser session'},
 {'priority':1,'surface':'Chargement des sprites','currentEvidence':'53 preserved plus20approved native entries; actor bridge20 new Core IDs','nextWork':'Check cold-load without procedural fallback flash, transparent failure/retry state and direction switching','qualification':'No image-readiness simulation or new QA claimed here'},
 {'priority':2,'surface':'Huit illustrations de menus','currentEvidence':'arcade boss continue extras options story training versus exist in previous source audit','nextWork':'Audit cropping/aspect on desktop/mobile and consider dossier-specific art after source reference review','qualification':'Existing eight images are preserved; no claim that eight menu images are missing'},
 {'priority':2,'surface':'Chroniques et Legacy Lab','currentEvidence':'Previous V2 route corrections/protagonist guard and adapted campaign handlers retained','nextWork':'Specify chapter availability/progression/save-resume and real campaign scope; validate valid/invalid entry routes','qualification':'Adapted dossiers and simulations do not constitute complete original campaigns'},
 {'priority':2,'surface':'273 récits /1638 scènes','currentEvidence':'Current composed-scene backlog and key-identical CSVs attested by previous immutable inventory','nextWork':'Plan original-edition references and new full-scene paintings by mission; preserve every current key','qualification':'Historical282/1692 CSV revisions remain archived;1638 composition records are not1638 newly painted native scenes'}]
write_csv('MENU_CHRONICLES_NEXT_WORK_V1.csv',menu_rows)

qualifications=[{'uid':u,'name':e.get('name'),'game':e.get('game'),'incarnation':e.get('incarnation'),'coverage':e.get('coverage'),'fallbackMissingActions':e.get('fallbackMissingActions'),'catalogueSource':'base-preserved53' if u in base['entries'] else 'Root-approved-PASS16-addition20','review':e['review']} for u,e in native.items()]
dump('NATIVE_CHARACTER_QUALIFICATIONS_POST_PASS16_V1.json',{'scope':'Exact inherited73 catalogue review records, read as documentary attestations; no new physical review claimed by this inventory','characters':qualifications,'unintegratedSnakeMGS3':{'receipt':pins[str(candidate_snake_root/'CLOSED_NATIVE_MGS3_INJURED_CANDIDATE_DELIVERY_V1.json')],'notesVerbatim':snake_notes,'finalPhysicalReview':snake_review},'unintegratedGanderStage':{'receipt':pins[str(candidate_stage_root/'CLOSED_NATIVE_GANDER_STAGE_CANDIDATE_DELIVERY_V1.json')],'notesVerbatim':gander_notes,'partialMap':gander['qualifiedPartialMap'],'fullRoom1To1Certified':False,'nativeAnimation':gander['nativeAnimation'],'canonicalParallaxDepths':gander['canonicalParallaxDepths'],'remaining':gander['remaining']}})

summary={'baseRosterWithoutOC':354,'rosterIncludingOC':355,'CoreRoster':95,'baseNativeCombatEntries':53,'newNativeCombatEntries':20,'postPass16NativeCombatEntries':73,'nativeCoreCatalogueEntries':sum(u.startswith('core__') for u in native),'newCoreActorsBridgedInPASS16':20,'missingWithoutOC':282,'missingIncludingOC':282,'previousMissingIncludingOC':302,'separatedMachinesBefore':6,'separatedMachinesAfter':16,'CoreMachineMappings':14,'independentAcidMachineMappings':2,'nativeStageCataloguesUnchanged':40,'CoreStages':113,'CoreStageCountsUnchanged':stage_counts,'menuImagesPreserved':8,'unintegratedCandidateSnakeAtlases':6,'unintegratedCandidateSnakeKeyPoses':72,'unintegratedCandidateGanderStagePlans':3}
assert summary['nativeCoreCatalogueEntries']==62
report={'schema':'cqc.post-pass16.backlog-inventory/1','createdAtUTC':datetime.datetime.now(datetime.timezone.utc).isoformat(),'scope':'Read-only catalogue/source inventory after approved20fighters+10machine addition; no runtime/Git/browser/image generation or publication mutation','summary':summary,'newApprovedNativeUIDs':list(addition['entries']),'remainingUIDs':[r['uid'] for r in missing],'proposedNext20UIDs':[r['uid'] for r in nextrows],'preservedCandidates':candidate_rows,'stageCoverageQualification':'25 aliases to native plans among113 Core places.40 native stage catalogues do not mean40 complete original playable maps.76 procedural scenes +12 missing playable templates remain unchanged. Gander3-plan candidate is not counted.','CoreCoverageQualification':'95 is the roster size.62 Core UID have catalogue-native entries, while this PASS16 bridge attaches the20 new Core UID only; no claim that all95 actors use native runtime art.','machineCoverageQualification':'16 distinct separated-part native presentations in source,14 Core+2 independent Ac!d. Real encounter victory/loading/damage QA and campaigns are separate. Harrier and MGR RAY/GRAD/EXCELSUS remain future work; list is scoped to these identified engines, not exhaustive across the franchise.','campaignQualification':'Existing adapted31-title routes/duel dossiers,273 story compositions/1638 scene records, and historical282/1692 CSVs are distinct from complete canon campaigns or native painted scenes.','fidelityQualification':'Closest-supported original-incarnation authored2D is the objective; preserve canonical source references, anatomy/equipment/edition boundaries and all rejections. No absolute1:1 certificate or whole-map/campaign completion claim.','evidenceQualification':'Counts and statuses are computed from the pinned catalogues and previous closed stage inventory. Sprite physical reviews/fidelity limits are inherited documentary evidence, not new visual review or current browser certification. Root source integration remains distinct from Git/Vercel publication.','inputPins':list(pins.values()),'preservation':'Only /tmp/cqc-pass16-backlog-update is written. All old roots, R/S, tool originals and Git/browser remain untouched.'}
dump('POST_PASS16_INVENTORY_AND_PRIORITIES_V1.json',report)
dump('ACTUAL_BACKLOG_COUNT_AND_ID_RECONCILIATION_V1.json',{'pass':True,'baseline302CSVEquals354RosterMinus52CanonicalNative':True,'supplement20UIDsAllNewKnownAndApproved':True,'postPass16Missing282EqualsRosterMinus72CanonicalNative':True,'includingOC355Minus73Equals282':True,'next20DistinctAndStillMissing':True,'Core95NotAllNative':True,'CoreNewBridgeScope20':True,'stageCountsUnchanged113':True,'machines14CorePlus2Acid':True,'unintegratedCandidatesExcludedFromCounts':True,'sourceReadsPinned':len(pins),'nativeImagesGeneratedOrEdited':False,'runtimeOrGitBrowserWrites':False})
print(json.dumps({'summary':summary,'inputsPinned':len(pins),'outputsWritten':len(list(OUT.glob('*'))),'pass':True}))
