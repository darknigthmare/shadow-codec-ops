"""Measure unchanged PASS9 native source pixels; write only producer metadata."""
from pathlib import Path
from PIL import Image
from scipy import ndimage
import numpy as np
import datetime,hashlib,json,os,sys,copy,shutil

sys.dont_write_bytecode=True
BASE=Path(__file__).resolve().parents[1]
assert BASE==Path('/workspace/cqc-pass9-generation/red-blaster')
sys.path.insert(0,'/workspace/cqc-game-working/cqc-versus-v056/tools')
from inspect_combat_sprite_sheet import inspect_components
from prepare_combat_sprite import validate_entry
UID='core__redblaster_mg2';NOW=datetime.datetime.now(datetime.timezone.utc).isoformat()
SELECTED={'a-right':'A_RIGHT_01','a-left':'A_LEFT_02','b-right':'B_RIGHT_01','b-left':'B_LEFT_01','c-right':'C_RIGHT_01','c-left':'C_LEFT_01'}
def sha(path):return hashlib.sha256(Path(path).read_bytes()).hexdigest()
def write(relative,data):
 path=BASE/relative;assert path.resolve().is_relative_to(BASE)
 raw=(json.dumps(data,ensure_ascii=False,indent=2,default=str)+'\n').encode()
 if path.exists():
  if path.read_bytes()==raw:return
  backup=path.with_name(path.stem+'.previous-'+sha(path)[:12]+path.suffix)
  if not backup.exists():backup.write_bytes(path.read_bytes())
 path.parent.mkdir(parents=True,exist_ok=True);path.write_bytes(raw)
contract=json.loads((BASE/'SOURCE_AND_ACTION_CONTRACT.json').read_text())
references=[]
for r in contract['references']:
 path=Path(r['file']);assert sha(path)==r['sha256']==sha(r['source'])and path.stat().st_size==r['bytes']
 references.append({**r,'sourceKind':'official-game-reference'if path.name.startswith('manual-')else'original-game-capture','viewed':True,'physicallyViewed':True,'qualifiedEvidence':contract['localizationQualification']})
layout={
 'idle':{'sheet':'a','indices':[0,1],'fps':4,'loop':True},'walk':{'sheet':'a','indices':[2,3,4,5],'fps':8,'loop':True},
 'guard':{'sheet':'a','indices':[6,7],'fps':4,'loop':True},'crouch':{'sheet':'a','indices':[8,9],'fps':4,'loop':True},'jump':{'sheet':'a','indices':[10,11],'fps':5,'loop':False},
 'punch':{'sheet':'b','indices':[0,1,2],'fps':10,'loop':False},'heavy':{'sheet':'b','indices':[3,4,5],'fps':9,'loop':False},'low':{'sheet':'b','indices':[6,7,8],'fps':9,'loop':False},
 'hit':{'sheet':'b','indices':[9],'fps':0,'loop':False},'ko':{'sheet':'b','indices':[10,11],'fps':4,'loop':False},
 'shoot':{'sheet':'c','indices':[0,1,2],'fps':9,'loop':False},'deploy':{'sheet':'c','indices':[3,4,5],'fps':8,'loop':False},'throw':{'sheet':'c','indices':[6,7,8],'fps':8,'loop':False},'recover':{'sheet':'c','indices':[9,10,11],'fps':5,'loop':False}}
action_map={'light':'punch','heavy':'heavy','low':'low','throw':'throw','special':'shoot','specialDown':'deploy','specialForward':'shoot','specialBack':'walk','super':'shoot','utility':'recover'}
phase_map={a:{'startup':[0],'active':[1],'recovery':[2]}for a in ['punch','heavy','low','shoot','deploy','throw','recover']}
phase_map['guard']={'startup':[0],'active':[1],'recovery':[0]}
observed=copy.deepcopy(contract['poseSemantics'])
observed['B'][11]='Complete lying KO: right side-turned/prone with head right; left prone/side-turned with head left. Both full bodies complete.'
observed['C'][4]='Low reaching hand with a short white segment attached near the hand. Wire-placement versus interpretation; straight shape can resemble a stylized blade, no certain knife/handle/guard/device model certified.'
observed['C'][7]='Empty-hand forward arm extension/follow-through in authored throw group; reads as an extended strike-like motion, not certified original CQC throwing animation.'
limits=[
 'Target original1990 MSX2 palette and silhouette wherever resolved; closest_supported newly authored native art. No absolute1:1, extraction, upscaling, certified exact face or original sprite topology claimed.',
 contract['localizationQualification'],contract['manualLoreQualification'],contract['weaponInterpretation'],
 'Original tiny sprite/game captures support compact green body and limbs, dark outlines, ochre extremities. Specific short dark/green/ochre head blocks, small green shade/fold differences, simple waist line, boots and full sleeves are readability interpretations, not certified original hair/headwear, garment seam or hidden asymmetry.',
 'No red-uniform inference from Red Blaster name, Running Man grey chest stripe, flamethrower, pistol, invented launcher model, Fatman rollers/bomber suit, C4 vest or player HUD equipment. A/B carry no weapon; C uses restrained grenade and wire interpretations only.',
 'Grenades and crossed immobilizing gallery wires are source supported. Exact grenade launcher model and original throwing/placement animations are unresolved; a small hand grenade touching the active source hand and low placement gesture are qualified Versus adaptations.',
 'C frame4 white segment is short and connected near the low hand. Its very straight stylized shape is visually ambiguous with a blade; no handle/guard/named knife or device is established. It is not proof of enemy knife lore, weapon model, original wire geometry or stage-wire implementation.',
 'All normals, guard/crouch/jump, hit/KO, CQC throw, hand-grenade release, wire placement, phase timing, collision and balance are bounded Versus adaptations. C throw7 reads as arm-extension follow-through rather than a certified original CQC throw. Final C9-11 are planted recovery poses, not running.',
 'Both B11 figures are completely lying defeated adults; right is prone/side-turned with head right and left prone/side-turned with head left. No unobserved precise fall motion is certified.',
 'All seven attempts remain byte-identical tool PNGs. First A_LEFT_01 was rejected for bare forearms inconsistent with full-sleeve RIGHT; A_LEFT_02 was corrected through image_gen only, retaining independently authored LEFT poses. No native PNG was mirrored, recoloured, resized, cleaned or alpha edited. Rejected art is never deleted or repurposed as OC.',
 'Native PNGs are RGBA with alpha0..254 and transparent regions; raw RGB behind alpha0/very low-alpha may show dark coloured glow in viewers. Complete major alpha>=8 components are retained with5px padding; actual body support/pelvis geometry uses alpha>80. Minor disconnected low-alpha speckles are not anatomy claims.',
 'Every unchanged atlas has its own measured fixed upright source height. Upright C reference indices2/10/11 exclude elevated grenade/low-wire preparation. displayHeight225 is a relative Versus recommendation, not canonical centimetres. All72 pivots remain at measured body/support positions rather than prop centroids.',
 'Generation-time contract a8dfffcff88297b0733f5c00d0fe6d109050b0aafe972d5ac8bbde8686360356 had a wrong university transcription corrected to Lumumba after Japanese-page review. The exact previous contract and metadata are retained. Prompts contained no university biography; images unchanged.',
 'Producer approval covers six unchanged native source atlases and72 observed pose crops/metadata only. No catalog import, runtime helper change, Git write or deployment. Actual browser Canvas/contact/collision and1280/390 viewport review remain root integration work.']
review={'uid':UID,'status':'approved','reviewer':'bb_crying_wolf / native producer physical inspection','reviewedAt':NOW,'sourceKind':'original-game-capture','fidelityStatus':'closest_supported','absolute1to1Certified':False,'checks':{k:True for k in ['identity','costume','equipment','anatomicalSides','singleFigure','transparentBackground']},'sources':references,'limits':limits,'approvalScope':'Six native source atlases and72 qualified authored Versus poses only; browser/runtime integration pending.'}
write('OBSERVED_POSE_CONTRACT.json',{'schema':'cqc.pass9.red-blaster-observed-poses/1','uid':UID,'sourceContractFile':str(BASE/'SOURCE_AND_ACTION_CONTRACT.json'),'sourceContractSHA256':sha(BASE/'SOURCE_AND_ACTION_CONTRACT.json'),'poseSemantics':observed,'canonicalMotionCertified':False,'technicalAliases':{'shoot':'small hand-grenade release adaptation, no gun','deploy':'low white-wire placement adaptation, no explosive trap model','throw':'unarmed arm-extension follow-through adaptation'},'preparedOriginalPromptsRetained':True})
files=[];physical=[];body_digests=[]
for key,name in SELECTED.items():
 src=BASE/'native-attempts'/(name+'.png');target=BASE/'sources'/(name+'.png')
 if target.exists():assert sha(target)==sha(src)
 else:os.link(src,target)
 meta=json.loads((BASE/'metadata'/(name+'.result-summary.json')).read_text());assert sha(src)==sha(target)==sha(meta['nativeOriginal'])==meta['sha256']
 asset=f'assets/combat-sprites/{UID}/{key}-v1.png';doc=inspect_components(target,4,3,asset)
 with Image.open(target)as im:alpha=np.array(im.getchannel('A'));rgba=np.array(im);assert im.mode=='RGBA'and im.size==(1536,1024)and alpha.min()==0
 labels8,_=ndimage.label(alpha>=8);counts8=np.bincount(labels8.ravel());large8=set(int(i)for i in np.where(counts8[1:]>=1000)[0]+1);assert len(large8)==12
 matched=set()
 for cell in doc['cells']:
  bx,by,bx1,by1=cell['bbox'];local=np.bincount(labels8[by:by1,bx:bx1].ravel());local[0]=0;component=int(local.argmax());assert component in large8 and component not in matched;matched.add(component)
  yy,xx=np.where(labels8==component);box=[int(xx.min()),int(yy.min()),int(xx.max()+1),int(yy.max()+1)];x0,y0,x1,y1=box
  left,top,right,bottom=max(0,x0-5),max(0,y0-5),min(1536,x1+5),min(1024,y1+5)
  old=cell['frame'];ox,oy,ow,oh=old['rect'];pivot=[ox+old['pivot'][0]*ow,oy+old['pivot'][1]*oh]
  foreign=sum(int(np.count_nonzero(labels8[top:bottom,left:right]==other))for other in large8 if other!=component);assert foreign==0,'Native crop touches neighbor complete body'
  cell['frame']={**old,'rect':[left,top,right-left,bottom-top],'pivot':[(pivot[0]-left)/(right-left),(pivot[1]-top)/(bottom-top)]};assert 'clipPolygon'not in cell['frame']
  opaque=rgba[by:by1,bx:bx1].copy();opaque[opaque[:,:,3]<=80]=0;digest=hashlib.sha256(opaque.tobytes()).hexdigest();body_digests.append(digest)
  cell.update({'component8':component,'pixelsAlpha8':int(counts8[component]),'bboxAlpha8':box,'foreign_body_alpha8_pixels_in_rect':foreign,'observedBodyPivotFullSheet':pivot,'pivotMeasurement':'x alpha>80 body pelvis band48%-65%; y actual lowest alpha>80 body support exclusive bound, no prop centroid or canonical scale claim.','poseMeaning':observed[key[0].upper()][cell['index']],'bodyAlpha80SHA256':digest,'artistic_review':'producer-physically-observed-complete-original-era-green-ochre-qualified-versus-pose'})
 assert matched==large8
 doc.update({'frame_layout':'full-alpha8-native-body-bounds-padded5-support-pivot-alpha80-no-image-modification','alphaGroupingThreshold':8,'supportMeasurementThreshold':80,'foreign_body_frames':[],'producerPhysicalViewedAt':NOW,'warning':'Producer native-source review only; actual browser Canvas review pending.'})
 write('layouts/'+key+'.json',doc)
 standing=[0,1]if key.startswith('a-')else[0,2,3,5]if key.startswith('b-')else[2,10,11];heights=[doc['cells'][i]['bbox'][3]-doc['cells'][i]['bbox'][1]for i in standing];height=sum(heights)/len(heights)
 files.append({'key':key,'file':asset,'source':str(target),'nativeOriginal':meta['nativeOriginal'],'sha256':sha(target),'bytes':target.stat().st_size,'width':1536,'height':1024,'columns':4,'rows':3,'poseCount':12,'facing':1 if key.endswith('right')else-1,'mirror':False,'independentlyGenerated':True,'generationKind':'imagegen-fresh-left-facing-sleeve-correction'if name=='A_LEFT_02'else'imagegen-fresh-independent-atlas','layout':str(BASE/'layouts'/(key+'.json')),'layoutSHA256':sha(BASE/'layouts'/(key+'.json')),'standingReferencePoseIndices':standing,'standingReferenceSourceHeights':heights,'standingSourceHeight':height,'observedBodyHeights':[c['bbox'][3]-c['bbox'][1]for c in doc['cells']],'canvasContourFrames':[],'alphaGroupingThreshold':8,'sourcePixelsEdited':False})
 physical.append({'key':key,'sha256':sha(target),'physicallyViewed':True,'viewedAt':NOW,'completeBodyAndHeldPropsInAll12Poses':True,'observedFacing':'RIGHT'if key.endswith('right')else'LEFT','greenOchrePaletteCompactBody':True,'noUnsupportedNamedHardware':True,'fullyLyingKOComplete':True if key.startswith('b-')else None,'stationaryRecovery9to11':True if key.startswith('c-')else None,'opaqueMajorComponents':12,'fullAlpha8MajorComponents':12,'standingSourceHeight':height,'standingReferencePoseIndices':standing,'standingReferenceSourceHeights':heights,'noForeignMajorBodyPixelsInCrops':True,'exactFaceHeadwearCanonicalCertified':False})
assert len(body_digests)==len(set(body_digests))==72,'72 byte-distinct native body crops required'
marks={'right':{},'left':{}};points={'right':{'shoot':[702,169],'deploy':[267,615]},'left':{'shoot':[471,145],'deploy':[163,618]}}
for side in ['right','left']:
 row=next(r for r in files if r['key']=='c-'+side);cells=json.loads(Path(row['layout']).read_text())['cells']
 for action,point in points[side].items():
  pose=layout[action]['indices'][phase_map[action]['active'][0]];cell=cells[pose];x,y,w,h=cell['frame']['rect'];pivot=cell['observedBodyPivotFullSheet']
  with Image.open(row['source'])as im:pixel=list(im.getpixel(tuple(point)))
  assert pixel[3]>80 and x<=point[0]<x+w and y<=point[1]<y+h
  marks[side][action]={'action':action,'frame':1,'actionFrame':1,'sourcePoseIndex':pose,'file':row['file'],'source':row['source'],'nativeOriginal':row['nativeOriginal'],'sha256':row['sha256'],'point':point,'pointRGBA':pixel,'sourceFrameRect':cell['frame']['rect'],'bodyPivotFullSheet':pivot,'standingSourceHeight':row['standingSourceHeight'],'proposedDisplayHeight':225,'heightAboveGroundAtProposedDisplayScale':round((pivot[1]-point[1])*225/row['standingSourceHeight'],4),'kind':'qualified-native-hand-grenade-release'if action=='shoot'else'qualified-native-low-hand-wire-placement','canLaunchProjectile':action=='shoot','canonicalWeaponModelCertified':False,'note':'Actual independently measured alpha>80 visible hand pixel on first active authored source pose. Grenade/wire category supported; exact model/hand animation and Versus phase timing not canonical certified.'}
write('SOURCE_COMBAT_ORIGINS.json',{'schema':'cqc.pass9.native-source-combat-marks/1','uid':UID,'coordinateSystem':'Full-sheet native x/y, no resize/flip; frame local to action, sourcePoseIndex zero-based.','slotSourceGroups':{'special':'shoot','specialDown':'deploy','specialForward':'shoot','super':'shoot'},'marks':marks,'nonBallistic':False,'canonicalWeapon':'grenades and crossed immobilizing wires, exact hardware unknown','canonicalFirearmModel':None,'noGunMuzzle':True,'qualifiedVersusHandInterpretation':True})
attempts=[]
for path in sorted((BASE/'native-attempts').glob('*.png')):
 meta=json.loads((BASE/'metadata'/(path.stem+'.result-summary.json')).read_text());assert sha(path)==meta['sha256']==sha(meta['nativeOriginal'])
 attempts.append({'key':path.stem,'source':str(path),'nativeOriginal':meta['nativeOriginal'],'sha256':sha(path),'bytes':path.stat().st_size,'status':'approved-final'if path.stem in SELECTED.values()else'rejected-sleeve-costume-mismatch-retained','argsFile':meta['argsFile'],'argsSHA256':meta['argsSHA256'],'generationTimeSourceContractSHA256':meta['sourceContractSHA256'],'retainedUnchanged':True,'repurposedAsOC':False})
write('NATIVE_PNG_INDEX.json',{'uid':UID,'attempts':attempts,'nativeImages':len(attempts),'approvedSheets':6,'approvedPoses':72,'rejectedNativeImages':1,'nativePixelEdits':0,'generatedOtherOCs':0})
write('CANONICAL_REVIEW.json',review)
write('PRODUCER_PHYSICAL_REVIEW.json',{'schema':'cqc.pass9.red-blaster-producer-physical-review/1','uid':UID,'status':'approved_closest_supported','reviewer':'bb_crying_wolf','reviewedAt':NOW,'sources':physical,'observedCompletePoses':72,'uniqueAlpha80BodyCrops':72,'canonicalReviewSHA256':sha(BASE/'CANONICAL_REVIEW.json'),'limits':limits,'browserCanvasReviewPerformed':False,'runtimeImported':False})
delivery={'schema':'cqc.native-combat-delivery/1','uid':UID,'name':'RED BLASTER','game':'Metal Gear2: Solid Snake (1990), original MSX2 visual incarnation','incarnation':'Original-era compact green-clad MSX2 grenadier; LP English localization and sprite extraction provenance unverified.','selectedCostume':contract['selectedCostume'],'basis':'Six physically observed original references including Japanese manual42, tiny green sprite and gallery/wire captures. Grenades/wires supported; hand animations and all normal attacks are qualified Versus adaptations.','displayHeight':225,'coverage':'action-frames','facing':1,'mirror':False,'sourceFiles':files,'actionLayout':layout,'actionMap':action_map,'phaseMap':phase_map,'review':review,'nativeSourceCombatOrigins':str(BASE/'SOURCE_COMBAT_ORIGINS.json'),'sourceContractFile':str(BASE/'SOURCE_AND_ACTION_CONTRACT.json'),'sourceContractSHA256':sha(BASE/'SOURCE_AND_ACTION_CONTRACT.json'),'observedPoseContract':str(BASE/'OBSERVED_POSE_CONTRACT.json'),'limits':limits,'nonBallistic':False,'canonicalWeapon':'grenades/wires, exact launcher and hardware unknown','runtimeImported':False,'browserCanvasReviewPerformed':False}
write('FINAL_DELIVERY.json',delivery)
# Pure runtime-shape validation; no assemble/import/apply/PNG writes.
entry={'uid':UID,'name':delivery['name'],'game':delivery['game'],'incarnation':delivery['incarnation'],'coverage':'action-frames','displayHeight':225,'baseFrameHeight':350,'sourceFrameHeights':{r['file']:r['standingSourceHeight']for r in files},'facing':1,'mirror':False,'fallbackMissingActions':True,'actionMap':action_map,'phaseMap':copy.deepcopy(phase_map),'actions':{},'oppositeActions':{},'review':review}
for side,target in [('right','actions'),('left','oppositeActions')]:
 for action,spec in layout.items():
  row=next(r for r in files if r['key']==spec['sheet']+'-'+side);cells=json.loads(Path(row['layout']).read_text())['cells']
  entry[target][action]={'fps':spec['fps'],'loop':spec['loop'],'frames':[copy.deepcopy(cells[i]['frame'])for i in spec['indices']]}
 entry[target]['attack']=copy.deepcopy(entry[target]['punch'])
entry['phaseMap']['attack']=copy.deepcopy(entry['phaseMap']['punch'])
source_rows=[{'file':r['file'],'source':r['source']}for r in files]
physical_check=validate_entry(entry,source_rows,{UID})
write('PRODUCER_VALIDATION_REVIEW.json',{'schema':'cqc.pass9.red-blaster-producer-validation/1','entry':entry,'sourceFiles':source_rows,'physical':physical_check,'independentAlpha80BodyHashes':body_digests,'poseCount':72,'imagePixelsEdited':False,'catalogImported':False,'scope':'Pure validate_entry on producer metadata; browser/helper/runtime integration not performed.'})
print(json.dumps({'delivery':str(BASE/'FINAL_DELIVERY.json'),'sha256':sha(BASE/'FINAL_DELIVERY.json'),'sheets':6,'poses':72,'uniqueAlpha80Bodies':len(set(body_digests)),'standingSourceHeights':{r['key']:r['standingSourceHeight']for r in files},'actualHandOrigins':points,'freeBytes':shutil.disk_usage('/workspace').free,'runtimeImported':False},indent=2))
