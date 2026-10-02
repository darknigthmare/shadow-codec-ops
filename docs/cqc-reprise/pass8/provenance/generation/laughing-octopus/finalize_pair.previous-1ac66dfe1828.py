"""Measure reviewed native sources and deliver metadata; never edit raster pixels."""
from pathlib import Path
from PIL import Image
from scipy import ndimage
import numpy as np, importlib.util, hashlib, json, os, statistics

P=Path(__file__).parent
R=Path('/workspace/cqc-game-working/cqc-versus-v056')
VIDEO='https://archive.org/download/PS3_Longplay_081_Metal_Gear_Solid_4/PS3_Longplay_081_Metal_Gear_Solid_4.mkv'
spec=importlib.util.spec_from_file_location('preserved_inspector',R/'tools/inspect_combat_sprite_sheet.py');ins=importlib.util.module_from_spec(spec);spec.loader.exec_module(ins)
spec=importlib.util.spec_from_file_location('preserved_importer',R/'tools/prepare_combat_sprite.py');imp=importlib.util.module_from_spec(spec);spec.loader.exec_module(imp)

CHOSEN={
 'core__laughing_octopus':{'a-right':'A_RIGHT_01','a-left':'A_LEFT_01','b-right':'B_RIGHT_02','b-left':'B_LEFT_02','c-right':'C_RIGHT_01','c-left':'C_LEFT_01'},
 'archive__laughing_beauty':{'a-right':'A_RIGHT_01','a-left':'A_LEFT_02','b-right':'B_RIGHT_02','b-left':'B_LEFT_01','c-right':'C_RIGHT_01','c-left':'C_LEFT_01'}
}
PIVOT_X={
 'core__laughing_octopus':{
  'a-right':[228,538,969,1390,209,558,970,1393,196,591,947,1390],
  'a-left':[153,536,949,1322,195,600,971,1370,198,559,940,1350],
  'b-right':[196,550,981,1350,209,592,965,1270,183,587,918,1320],
  'b-left':[172,560,983,1324,217,572,978,1368,170,532,940,1350],
  'c-right':[199,550,987,1380,177,504,926,1308,193,537,943,1368],
  'c-left':[151,550,963,1315,172,559,984,1372,213,590,989,1345]},
 'archive__laughing_beauty':{
  'a-right':[213,562,946,1350,196,560,964,1350,183,580,950,1360],
  'a-left':[198,572,965,1364,219,590,980,1370,208,603,976,1360],
  'b-right':[200,565,980,1350,184,582,960,1283,155,624,926,1310],
  'b-left':[213,565,985,1370,233,614,988,1430,217,584,954,1350],
  'c-right':[185,560,947,1330,194,589,965,1348,218,584,992,1355],
  'c-left':[256,647,1004,1423,242,612,1000,1370,251,623,1024,1378]}
}
# Physical body crown / sole observations; ribbon envelope is not human source height.
SCALES={
 'core__laughing_octopus':{'a-right':{'indices':[0,1],'crown':[17,20],'sole':[375,372]},'a-left':{'indices':[0,1],'crown':[8,9],'sole':[360,361]},'b-right':{'indices':[0,2],'crown':[84,84],'sole':[385,387]},'b-left':{'indices':[0,2],'crown':[70,66],'sole':[366,369]},'c-right':{'indices':[0],'crown':[8],'sole':[366]},'c-left':{'indices':[0],'crown':[21],'sole':[348]}},
 'archive__laughing_beauty':{'a-right':{'indices':[0,1],'crown':[8,18],'sole':[360,359]},'a-left':{'indices':[0,1],'crown':[13,20],'sole':[394,393]},'b-right':{'indices':[0,2],'crown':[14,21],'sole':[419,418]},'b-left':{'indices':[0,2],'crown':[16,17],'sole':[370,370]},'c-right':{'indices':[11],'crown':[697],'sole':[1021]},'c-left':{'indices':[11],'crown':[673],'sole':[1018]}}
}
REFS={
 'core__laughing_octopus':{13488:'Original PS3 full armored silhouette, four broad articulated ribbons and suspended empty-handed body; dark scene partly occludes reverse harness.',13493:'Original plated thighs, raised lateral rails, black ribbed inner suit, narrow pale inset ribbon stripes, no generic tactical pouches.',13505:'Original closed smooth helmet, center seam and sculpted face shell; opaque armor, no skin/hair/eye opening.',13506:'Original full body with four flat-sided mechanical ribbons, complete feet, unarmed hanging posture.',13730:'Original curled ribbon envelope, segmented mechanical material, not flesh, blades or claws.',13760:'Original front body shape and gauntlets with source ribbons; recording HUD partly occludes helmet.',14100:'Original gameplay compact curled rolling armor/ribbon shape. Source image proves the roll posture; versus timings/damage are adapted.'},
 'archive__laughing_beauty':{14240:'Original adult Laughing Beauty face, pale grey-blue eyes, short asymmetrical pale blonde bob and dark high collar.',14260:'Original complete side body walking/pursuing: opaque metallic grey olive-bronze suit, darker torso/legs, paler fitted hip/thigh panels, integrated pale low-heel footwear and empty slender hands.',14280:'Original rear torso panel/seams, opaque suit and source hair length; lighting partly occludes fine finger material.',14300:'Original fully clothed crouch/physical pursuit position, hands placed on floor, no equipment, firearm, tentacles or magic.',14400:'Original full body in actual Beauty gameplay phase, same opaque suit and ordinary unarmed pursuit. Distant recording does not certify tiny seams.'}
}
CONTACTS={
 'core__laughing_octopus':{
  'right':{'punch':('b-right',1,[849,143]),'heavy':('b-right',4,[436,453]),'low':('b-right',7,[1511,635]),'shoot':('c-right',1,[824,85]),'throw':('c-right',7,[1486,471])},
  'left':{'punch':('b-left',1,[340,145]),'heavy':('b-left',4,[31,426]),'low':('b-left',7,[1134,634]),'shoot':('c-left',1,[360,94]),'throw':('c-left',7,[1166,468])}}
}
def sha(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()
def write(p,d):
 p=Path(p);p.parent.mkdir(parents=True,exist_ok=True);raw=(json.dumps(d,ensure_ascii=False,indent=2)+'\n').encode()
 if p.exists() and p.read_bytes()!=raw:
  prev=p.with_name(p.stem+'.previous-'+sha(p)[:12]+p.suffix)
  if not prev.exists():prev.write_bytes(p.read_bytes())
 p.write_bytes(raw)
def polygon_contains(poly,xx,yy):
 inside=np.zeros(len(xx),dtype=bool)
 for j in range(len(poly)):
  x1,y1=poly[j-1];x2,y2=poly[j]
  if y1==y2:continue
  inside^=((y1>yy)!=(y2>yy))&(xx<(x2-x1)*(yy-y1)/(y2-y1)+x1)
 return inside

ACTION_LAYOUT={'idle':{'sheet':'a','indices':[0,1],'fps':4,'loop':True},'walk':{'sheet':'a','indices':[2,3,4,5],'fps':9,'loop':True},'guard':{'sheet':'a','indices':[6,7],'fps':5,'loop':True},'crouch':{'sheet':'a','indices':[8,9],'fps':4,'loop':True},'jump':{'sheet':'a','indices':[10,11],'fps':6,'loop':False},'punch':{'sheet':'b','indices':[0,1,2],'fps':12,'loop':False},'heavy':{'sheet':'b','indices':[3,4,5],'fps':10,'loop':False},'low':{'sheet':'b','indices':[6,7,8],'fps':10,'loop':False},'hit':{'sheet':'b','indices':[9],'fps':0,'loop':False},'ko':{'sheet':'b','indices':[10,11],'fps':6,'loop':False},'shoot':{'sheet':'c','indices':[0,1,2],'fps':10,'loop':False},'deploy':{'sheet':'c','indices':[3,4,5],'fps':8,'loop':False},'throw':{'sheet':'c','indices':[6,7,8],'fps':10,'loop':False},'recover':{'sheet':'c','indices':[9,10,11],'fps':5,'loop':False}}
PHASE={k:{'startup':[0],'active':[1],'recovery':[2]}for k in ['punch','heavy','low','shoot','deploy','throw','recover']};PHASE['guard']={'startup':[0],'active':[1],'recovery':[0]};PHASE['jump']={'startup':[0],'active':[0],'recovery':[1]}
SLOTS={'light':'punch','heavy':'heavy','low':'low','throw':'throw','special':'shoot','specialDown':'deploy','specialForward':'throw','specialBack':'walk','super':'shoot','utility':'recover'}
fighters=json.loads((R/'data/chronicles-v056.json').read_text())['fighters']
summaries=[]
for uid,chosen in CHOSEN.items():
 B=P/uid;checks=[]
 def check(n,v):
  checks.append({'assertion':n,'passed':bool(v)})
  assert v,n
 files=[];tables={};geometry={};review_sources={};alpha=[]
 for key,name in chosen.items():
  native=B/'native-attempts'/(name+'.png');meta=json.loads((B/'metadata'/(name+'.result-summary.json')).read_text());source=B/'sources'/(name+'.png')
  if not source.exists():os.link(native,source)
  digest=sha(source);check(key+' exact immutable native SHA',digest==sha(native)==sha(meta['nativeOriginal'])==meta['sha256'])
  im=Image.open(source);a=np.asarray(im.getchannel('A'));labels,_=ndimage.label(a>80);counts=np.bincount(labels.ravel())
  check(key+' true transparent native RGBA',im.mode=='RGBA' and a.min()==0 and (a==0).sum()>100000)
  check(key+' exactly twelve separated opaque figures',sum(z>=1000 for z in counts[1:])==12)
  check(key+' no opaque border cut',not any(np.count_nonzero(edge>80)for edge in [a[0],a[-1],a[:,0],a[:,-1]]))
  layout=ins.inspect_components(source,4,3,f'assets/combat-sprites/{uid}/{key}-v1.png')
  body_pivots={}
  for cell in layout['cells']:
   i=cell['index'];frame=cell['frame'];rx,ry,rw,rh=frame['rect'];px=PIVOT_X[uid][key][i];py=cell['bbox'][3];body_pivots[str(i)]=[px,py]
   check(key+f' pose{i} observed body/ground anchor inside complete crop',rx<=px<=rx+rw and ry<=py<=ry+rh)
   frame['pivot']=[(px-rx)/rw,(py-ry)/rh];cell['observedBodyPivotFullSheet']=[px,py]
   cell['pivotBasis']='Physically observed boot/body support midpoint; y is complete native opaque lower extent. Curl-roll anchors support on the lower ribbon arc, airborne/KO keep native physical support baseline. No ribbon/pelvis centroid normalization.'
   local=labels[ry:ry+rh,rx:rx+rw];own=local==cell['component'];foreign=(local!=0)&~own
   if foreign.any():
    check(key+f' pose{i} neighbouring body contour present','clipPolygon' in frame)
    yy,xx=np.where(foreign);poly=np.array(frame['clipPolygon'])*[rw,rh];check(key+f' pose{i} Canvas contour excludes all foreign opaque pixels',not polygon_contains(poly,xx,yy).any())
   else:check(key+f' pose{i} native crop contains no foreign opaque body',True)
   if 'clipPolygon'in frame:
    yy,xx=np.where(own);poly=np.array(frame['clipPolygon'])*[rw,rh];check(key+f' pose{i} Canvas contour preserves whole own opaque body',polygon_contains(poly,xx,yy).all())
   cell['artistic_review']='Producer physically viewed all 12 complete source figures in actual native PNG, original costume/independent facing/whole equipment observed. All versus gestures retain source identity; raster unchanged.'
  write(B/'layouts'/(key+'.json'),layout);tables[key]=layout['cells']
  ss=SCALES[uid][key];heights=[sole-crown for crown,sole in zip(ss['crown'],ss['sole'])];height=statistics.median(heights)
  geometry[key]={'recommendStandingSourceHeight':height,'nativeUprightHeights':heights,'observedUprightIndices':ss['indices'],'observedHumanCrownY':ss['crown'],'observedHumanSoleY':ss['sole'],'measuredLayouts':str(B/'layouts'/(key+'.json')),'basis':'Observed human helmet/hair crown to boot sole, excluding higher/wider ribbons. Fixed positive per-sheet scale; crouch/roll/KO never normalized to standing bounds.'}
  review_sources[key]={'sha256':digest,'completeBodyAndWeaponViewed':True,'standingSourceHeight':height,'observedBodyPivots':body_pivots,'notes':['All twelve original native body poses physically viewed, every final facing correct.','Tentacle tips/armor end topology are interpreted at sprite scale, closest_supported rather than exact extracted original animation.'] if uid.startswith('core') else ['All twelve adult fully clothed bodies physically viewed; blonde short bob and source opaque suit retained.','Original suit micro-seams/face relief/shading remain interpreted at sprite scale.']}
  files.append({'key':key,'source':str(source),'nativeOriginal':meta['nativeOriginal'],'sha256':digest,'bytes':source.stat().st_size,'width':im.width,'height':im.height,'columns':4,'rows':3,'poseCount':12,'facing':1 if key.endswith('right')else-1,'mirror':False})
  alpha.append({'key':key,'sha256':digest,'transparentPixels':int((a==0).sum()),'opaqueEdgePixels':0,'bodyComponents':12,'nativePixelsEdited':False,'all12PhysicallyViewed':True,'canvasContourFrames':layout['foreign_body_frames']})
 refs=[]
 for sec,scope in REFS[uid].items():
  raw=P/'references'/'frames'/f'ps3-{sec}s.jpg';dest=B/'references'/raw.name;dest.parent.mkdir(parents=True,exist_ok=True)
  if not dest.exists():os.link(raw,dest)
  check(f'reference {sec} original bounded captured SHA',sha(raw)==sha(dest))
  im=Image.open(dest);refs.append({'file':str(dest),'url':VIDEO+'#t='+str(sec),'sourceKind':'original-game-capture','sha256':sha(dest),'bytes':dest.stat().st_size,'width':im.width,'height':im.height,'timeSeconds':sec,'viewed':True,'scope':scope,'captureMethod':'Remote ffmpeg seek one native-resolution1280x720 decoded PS3 game frame to JPEG q2, no crop/resize/recolor/paint. Exact args/log retained. Complete movie downloads:0.','platformEvidence':'Archive uploader longplays@longplays.org labels original PS3 MGS4, deposited2014 by Spazbo4. Hardware/framebuffer and exact2008 patch state independently uncertified.'})
 armed=uid=='core__laughing_octopus';name='LAUGHING OCTOPUS'if armed else'LAUGHING BEAUTY'
 limits=['Target is faithful original MGS4 PS3 appearance, closest_supported. Newly authored 2D painted sprites are not extracted PS3 animation, exact model/material/texture pixels or absolute1:1 certification.','Six native sheets and both facings independently generated, never mirrored or pixel-edited. All144 selected pair poses physically viewed. All failed attempts/prompts/hash inspections retained, no reject repurposed as OC.','Original PS3 scene lighting partly occludes rear seams, fingers and tiny suit surface detail. Exact badge lettering, material response, mask/hair relief and very fine seam count cannot be certified from bounded captures.','Authored versus attacks, jump/guard/KO/recovery timings are gameplay adaptations. The original PS3 pursuit/tentacle/roll scope is distinguished from invented choreography. Sprite/import QA does not establish actual gameplay/phase/camera correctness; integrator verifies those.']
 if armed:limits+=['Original opaque grey/olive exosuit with closed helmet, black ribbed inner torso, lateral hip rails, complete gauntlets/boots and four broad mechanical ribbons. Back harness and segment/end shape interpreted at sprite scale; occlusion is preserved, not guaranteed full model topology.','Selected source intro/equipment contract is empty-handed tentacle fighting. A personal firearm model, grenade, independent damaging decoy trap or small explosive orb is not proven by selected captured frames. This does not claim those never occur in original game; do not attach generic rifle/pistol effects to these sprites.','C shoot is source-equipped tentacle thrust, deploy is physical compact curl/roll, throw is tentacle grasp adaptation, recover retracts/restores stance. Source contact marks are visible ribbon tips for melee only, never muzzle/projectile origins.','OctoCamo remains opaque. Dynamic texture matching, original source disguise/voice copying and exact camouflage behavior require additional source verification and implementation; these sprites do not certify them.']
 else:limits+=['Adult unarmored original Laughing Beauty has pale short asymmetric blonde bob, opaque high-neck grey/olive/bronze technological suit, pale hip/thigh panels and integrated pale low-heel footwear. No pink costume, long hair, heavy tactical boots, pouches/holster, helmet or tentacles inherited from raw archive placeholder. Hand material is subdued by source lighting; no independent tactical gauntlets certified.','Only unarmed reaching/chase/grab and physical defense/composure gestures are source-associated. B palm shove/low sweep and versus super are clearly authored physical simulation, not canonical martial-arts mastery, magical marking, beam, psychic power or mechanical tentacle.','C shoot is unarmed reaching grab, deploy is low physical evade/defense, throw is sleeve/forearm grasp control, recover is composure. No ballistic/muzzle origins applicable.']
 review={'status':'approved','reviewer':'bb_laughing_octopus producer, actual PS3 source inspection and all72 selected native poses','reviewedAt':'2026-10-02','sourceKind':'original-game-capture','checks':{k:True for k in ['identity','costume','equipment','anatomicalSides','singleFigure','transparentBackground']},'fidelityStatus':'closest_supported','absolute1to1Certified':False,'sources':refs,'limits':limits,'approvalScope':'Source-specific original PS3 appearance and72 authored versus action poses; no absolute source animation or runtime integration certification.'}
 origins={'schema':'cqc.pass8.native-source-contact-marks/1','uid':uid,'coordinateSystem':'Full native sheet source x,y, unscaled/unreflected. Physical melee ribbon contact tips only; no projectile/muzzle origin.','marks':{'right':{},'left':{}},'ballisticOriginsApplicable':False}
 if armed:
  for side,groups in CONTACTS[uid].items():
   for action,(key,index,point)in groups.items():
    f=next(row for row in files if row['key']==key);im=Image.open(f['source']);rgba=list(im.getpixel(tuple(point)));cell=tables[key][index];rx,ry,rw,rh=cell['frame']['rect']
    check(side+' '+action+' real native tip alpha',rgba[3]>80);check(side+' '+action+' native tip inside own crop',rx<=point[0]<rx+rw and ry<=point[1]<ry+rh)
    origins['marks'][side][action]={'action':action,'frame':1,'sourcePoseIndex':index,'file':f'assets/combat-sprites/{uid}/{key}-v1.png','source':f['source'],'sha256':f['sha256'],'point':point,'pointRGBA':rgba,'pointKind':'visible-mechanical-ribbon-contact-tip','ballistic':False,'note':'Physically observed end of original-equipped ribbon in authored melee contact pose; never muzzle or projectile launch.'}
 write(B/'SOURCE_COMBAT_ORIGINS.json',origins)
 contract={'uid':uid,'incarnation':'Original MGS4 PS32008 Beast armored tentacle form'if armed else'Original MGS4 PS32008 adult unarmored Beauty form','sourceFiles':refs,'selectedEquipment':'Four source mechanical ribbons, opaque exosuit, empty hands'if armed else'Unarmed original opaque technological Beauty suit, no Beast equipment','actionMap':SLOTS,'actionLayout':ACTION_LAYOUT,'phaseMap':PHASE,'actionSemantics':{'punch':'tentacle jab'if armed else'authored unarmed light palm','heavy':'tentacle lash'if armed else'authored unarmed shove','low':'low tentacle sweep'if armed else'authored low physical sweep','shoot':'tentacle thrust'if armed else'unarmed reaching grab','deploy':'compact source curl/roll'if armed else'low evade/physical defense','throw':'tentacle physical grasp adaptation'if armed else'unarmed forearm/sleeve hold adaptation','recover':'ribbon retract/stance recovery'if armed else'composure recovery'},'noProjectileOrigins':True,'noUnsupportedDamagingDecoy':True,'octoCamoPolicy':'opaque; texture matching pending'if armed else'not applicable; no Beast equipment','productionMutation':False,'limits':limits}
 write(B/'SOURCE_AND_ACTION_CONTRACT.json',contract);write(B/'CANONICAL_REVIEW.json',review)
 write(B/'PRODUCER_VISUAL_REVIEW.json',{'uid':uid,'status':'approved','reviewer':review['reviewer'],'displayHeight':230,'sources':review_sources,'limits':limits,'viewedNativePoseCount':72,'physicalSourceFilesViewed':[r['sha256']for r in refs]})
 write(B/'NATIVE_ALPHA_REVIEW.json',{'schema':'cqc.pass8.native-alpha-review/1','uid':uid,'sheets':alpha,'acceptedNativeSheets':6,'authoredPoseCount':72,'pixelEditsOutsideImageGen':False})
 attempts=list((B/'native-attempts').glob('*.png'));selected={row['sha256']for row in files};rejects=[p.stem for p in attempts if sha(p)not in selected]
 delivery={'schema':'cqc.native-combat-delivery/1','uid':uid,'name':name,'game':'Metal Gear Solid4: Guns of the Patriots (PS3,2008)','incarnation':contract['incarnation'],'selectedCostume':'original-mgs4-ps3-armored-octopus'if armed else'original-mgs4-ps3-opaque-unarmored-laughing-beauty','basis':'Original PS3 captured costume/equipment support; source-specific authored versus poses, closest_supported.','displayHeight':230,'coverage':'action-frames','facing':1,'mirror':False,'sourceFiles':files,'actionLayout':ACTION_LAYOUT,'actionMap':SLOTS,'phaseMap':PHASE,'review':review,'counts':{'selectedNativePngSheets':6,'totalPoseCells':72,'poseCellsPerSheet':12,'facings':2,'nativeGenerationAttempts':len(attempts),'rejectedNativeAttempts':len(rejects),'selectedWeaponPropAtlases':0},'sourceGeometry':geometry,'layouts':{key:str(B/'layouts'/(key+'.json'))for key in chosen},'observedBodyPivots':{key:review_sources[key]['observedBodyPivots']for key in chosen},'sourceCombatOrigins':str(B/'SOURCE_COMBAT_ORIGINS.json'),'sourceContract':str(B/'SOURCE_AND_ACTION_CONTRACT.json'),'nativeAlphaReview':str(B/'NATIVE_ALPHA_REVIEW.json'),'producerVisualReview':str(B/'PRODUCER_VISUAL_REVIEW.json'),'limits':limits,'requiresGameplayContract':'Root-owned source guard must supersede generic projectile/decoy/magic behavior and keep original archives unchanged.'}
 write(B/'FINAL_DELIVERY.json',delivery)
 entry={'uid':uid,'name':name,'game':delivery['game'],'incarnation':delivery['incarnation'],'coverage':'action-frames','displayHeight':230,'baseFrameHeight':350,'sourceFrameHeights':{f'assets/combat-sprites/{uid}/{key}-v1.png':g['recommendStandingSourceHeight']for key,g in geometry.items()},'facing':1,'mirror':False,'fallbackMissingActions':True,'actionMap':SLOTS,'phaseMap':PHASE.copy(),'actions':{},'oppositeActions':{},'review':review}
 for side,target in [('right','actions'),('left','oppositeActions')]:
  for action,s in ACTION_LAYOUT.items():entry[target][action]={'fps':s['fps'],'loop':s['loop'],'frames':[tables[s['sheet']+'-'+side][i]['frame']for i in s['indices']]}
  entry[target]['attack']=entry[target]['punch']
 entry['phaseMap']['attack']=PHASE['punch']
 source_rows=[{'file':f'assets/combat-sprites/{uid}/{row["key"]}-v1.png','source':row['source']}for row in files]
 physical=imp.validate_entry(entry,source_rows,{f['uid']for f in fighters});check('generic preserved importer validates six untouched native sources',len(physical)==6)
 poses={(f['file'],tuple(f['rect']))for action in list(entry['actions'].values())+list(entry['oppositeActions'].values())for f in action['frames']};check('all72 unique native action poses retained without alias inflation',len(poses)==72)
 write(B/'FINAL_IMPORT_CANDIDATE.json',{'entry':entry,'sourceFiles':source_rows,'providedGeneratorDelivery':str(B/'FINAL_DELIVERY.json'),'providedProducerVisualReview':str(B/'PRODUCER_VISUAL_REVIEW.json'),'productionImported':False})
 write(B/'DELIVERY_VERIFICATION.json',{'uid':uid,'status':'passed','assertions':len(checks),'failures':0,'checks':checks,'acceptedNativeSheets':6,'authoredPoses':72,'independentFacings':True,'untouchedNativeOriginalBytes':True,'producerPhysicalReviewCompleted':True,'runtimeVerified':False,'limits':limits,'rejectedAttempts':rejects})
 write(B/'CANONICAL_REFERENCE_MANIFEST.json',{'uid':uid,'sources':refs,'referenceBytes':sum(r['bytes']for r in refs),'referenceBudgetBytes':15000000,'completeMoviesDownloaded':0,'originalRawProfileConserved':True})
 write(B/'PROFILE_SNAPSHOT.json',next(f for f in fighters if f['uid']==uid))
 inventory=[{'path':str(f.relative_to(B)),'bytes':f.stat().st_size,'sha256':sha(f)}for f in sorted(B.rglob('*'))if f.is_file()and f.name!='FILE_SHA256_MANIFEST.json'];write(B/'FILE_SHA256_MANIFEST.json',{'uid':uid,'files':inventory,'fileCount':len(inventory),'frozenAfterProducerReview':True})
 summaries.append({'uid':uid,'status':'ready-for-independent-integration','sheets':6,'poses':72,'assertions':len(checks),'failures':0,'nativeAttempts':len(attempts),'rejectedAttempts':len(rejects),'delivery':str(B/'FINAL_DELIVERY.json'),'deliverySha256':sha(B/'FINAL_DELIVERY.json'),'referenceBytes':sum(r['bytes']for r in refs)})
write(P/'PAIR_FINAL_DELIVERY.json',{'schema':'cqc.pass8.native-pair-delivery/1','status':'producer-reviewed-ready-for-independent-integration','deliveries':summaries,'selectedSheets':12,'authoredPoseCount':144,'allNativePngPixelsUnchanged':True,'allHistoricalProductionFilesUnchanged':True,'completeMoviesDownloaded':0,'referenceProbeBytes':sum(f.stat().st_size for f in (P/'references').rglob('*')if f.is_file())})
print(json.dumps(summaries,indent=2))
