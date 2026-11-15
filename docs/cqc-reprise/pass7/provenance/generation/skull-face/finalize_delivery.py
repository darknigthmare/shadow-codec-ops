#!/usr/bin/env python3
"""Describe physically reviewed native art without modifying any raster pixels."""
from pathlib import Path
from PIL import Image
from scipy import ndimage
import importlib.util
import numpy as np
import hashlib, json, shutil, statistics

P=Path(__file__).parent
UID='archive__skull_face'
CHOSEN={'a-right':'A_RIGHT_01','a-left':'A_LEFT_02','b-right':'B_RIGHT_01','b-left':'B_LEFT_01','c-right':'C_RIGHT_01','c-left':'C_LEFT_04'}
inspector_path=Path('/workspace/cqc-game-working/cqc-versus-v056/tools/inspect_combat_sprite_sheet.py')
spec=importlib.util.spec_from_file_location('preserved_native_inspector',inspector_path)
inspector=importlib.util.module_from_spec(spec);spec.loader.exec_module(inspector)
def sha(p): return hashlib.sha256(Path(p).read_bytes()).hexdigest()
def write(n,d): (P/n).write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n')
checks=[]
def check(label,v):
    checks.append({'assertion':label,'passed':bool(v)})
    assert v,label

files=[];layouts={};geo={};alpha=[]
for key,name in CHOSEN.items():
    native=P/'native-attempts'/f'{name}.png';meta=json.loads((P/'metadata'/f'{name}.result-summary.json').read_text())
    source=P/'sources'/f'{name}.png'
    if source.exists():assert sha(source)==sha(native),key+' source collision guard'
    else:shutil.copyfile(native,source)
    digest=sha(source);check(key+' untouched generated source',digest==sha(meta['nativeOriginal'])==sha(native))
    im=Image.open(source);a=np.asarray(im.getchannel('A'));h,w=a.shape
    check(key+' native RGBA',im.mode=='RGBA' and im.format=='PNG')
    check(key+' transparent alpha',a.min()==0 and np.count_nonzero(a==0)>100000)
    labels,_=ndimage.label(a>=8);counts=np.bincount(labels.ravel());components=[int(i) for i,z in enumerate(counts) if i and z>=400]
    check(key+' twelve isolated body components',len(components)==12)
    edges=[int((x>=48).sum()) for x in [a[0],a[-1],a[:,0],a[:,-1]]]
    check(key+' no opaque pixels on outer edges',not any(edges))
    records=[]
    for comp in components:
        yy,xx=np.where(labels==comp);cx=float(xx.mean());cy=float(yy.mean())
        records.append({'component':comp,'index':int(cy/(h/3))*4+int(cx/(w/4)), 'bbox':[int(xx.min()),int(yy.min()),int(xx.max())+1,int(yy.max())+1], 'pixels':len(xx)})
    records.sort(key=lambda x:x['index'])
    check(key+' complete row major grid', [x['index'] for x in records]==list(range(12)))
    asset=f'assets/combat-sprites/{UID}/{key}-v1.png'
    layout=inspector.inspect_components(source,4,3,asset);cells=layout['cells']
    labels80,_=ndimage.label(a>80)
    for cell in cells:
        i=cell['index'];frame=cell['frame'];rx,ry,rw,rh=frame['rect'];pivot=frame['pivot']
        check(key+f' cell{i} positive observed frame bounds',rw>0 and rh>0 and all(0<=z<=1 for z in pivot))
        if cell['foreign_body_opaque_pixels_in_rect']:
            polygon=np.asarray(frame['clipPolygon'])*[rw,rh]
            local=labels80[ry:ry+rh,rx:rx+rw]
            yy,xx=np.where((local!=0)&(local!=cell['component']))
            inside=np.zeros(len(xx),dtype=bool)
            for j in range(len(polygon)):
                x1,y1=polygon[j-1];x2,y2=polygon[j]
                if y1==y2:continue
                crossing=((y1>yy)!=(y2>yy))&(xx<(x2-x1)*(yy-y1)/(y2-y1)+x1)
                inside^=crossing
            check(key+f' cell{i} actual concave Canvas contour excludes neighbouring body pixels',not np.any(inside))
        else:check(key+f' cell{i} native rectangle has no neighbouring opaque body pixels',True)
        cell['artistic_review']='physically-viewed complete single TPP human body and requested independent facing; original preserved generic inspector emits concave Canvas contour where close atlas rows overlap padded rectangles. PNG bytes unchanged.'
    write(f'layouts/{key}.json',layout);layouts[key]=str(P/'layouts'/f'{key}.json')
    upright=[0,1] if key.startswith('a') else ([0,2] if key.startswith('b') else [2,11])
    heights=[cells[i]['bbox'][3]-cells[i]['bbox'][1] for i in upright]
    geo[key]={'recommendStandingSourceHeight':statistics.median(heights),'nativeUprightHeights':heights,'observedUprightIndices':upright,'measuredLayouts':layouts[key],'basis':'Actual native hat-to-boot upright body height, excluding lowered poses. Crouch/jump/KO use same positive sheet scale and never stretch to standing height.'}
    files.append({'key':key,'source':str(source),'nativeOriginal':meta['nativeOriginal'],'sha256':digest,'bytes':source.stat().st_size,'width':w,'height':h,'columns':4,'rows':3,'poseCount':12,'facing':1 if key.endswith('right') else -1,'mirror':False})
    alpha.append({'key':key,'sha256':digest,'dimensions':[w,h],'alphaExtrema':[int(a.min()),int(a.max())],'alphaZeroPixels':int((a==0).sum()),'opaqueEdgePixels48':edges,'separatedComponents8':len(components),'fullNativeSheetPhysicallyViewed':True,'all12FiguresRequestedFacingPhysicallyViewed':True,'status':'passed','nativeSourcePixelEdits':False})
    meta['status']='accepted_closest_supported_after_producer_physical_review';write(f'metadata/{name}.result-summary.json',meta)

video='https://archive.org/download/PS4_Longplay_051_Metal_Gear_Solid_V_The_Phantom_Pain/PS4_Longplay_051_Metal_Gear_Solid_V_The_Phantom_Pain_Part_5.mp4'
roles={6900:'Original TPP face under black fedora, domino mask, burn scars, formal collar/tie; dialogue only.',6920:'Original bald severely scarred living human head while hat is briefly removed, domino mask, dark waistcoat/shirt/tie, black full gloves. Hatless phase excluded from selected sprites.',7000:'Original reverse thigh-length coat split and attached hems, relaxed walking; no invented backpack.',7050:'Original rear complete standing silhouette, full dark riding/western boots, trouser cut and coat length.',7090:'Original full frontal body: source tailored coat/waistcoat, gold left-breast crest, grey-beige shirt/tie, black full gloves, loose trousers tucked into tall western boots with diagonal shaft detail. Small partly occluded item by right thigh does not establish weapon model.',7110:'Original full front body with raised open gloved hand while speaking; grounded restrained command gesture, original boot/toe/heel and source silhouette. No firearm firing.',7350:'Original seated source hand gesture and black gloves, coat/collar/mask/fedora; source for adapted designation motion, not a psychic or shooting power.',7700:'Original restrained gloved hand/forearm gesture and formal upper clothing, single subdued chest crest; no personal ballistic firing proof.'}
refs=[]
psn=P/'references/skull-face-psn.jpg';refs.append({'file':str(psn),'url':'https://image.api.playstation.com/cdn/UP0101/CUSA01140_00/doKmjR2srvfPW1dnp4l1sGKKvF7ub9bP.png','sourceKind':'official-game-reference','sha256':sha(psn),'bytes':psn.stat().st_size,'viewed':True,'scope':'Official PlayStation original TPP head/shoulders portrait. Living heavily scarred human face/neck, separate black domino mask, black fedora, formal jacket/shirt/tie; no weapon or full lower body.'})
for sec,role in roles.items():
    f=P/'references'/f'ps4-tpp-part5-{sec}s.jpg';im=Image.open(f)
    refs.append({'file':str(f),'url':video,'sourceKind':'original-game-capture','sha256':sha(f),'bytes':f.stat().st_size,'width':im.width,'height':im.height,'timeSeconds':sec,'viewed':True,'scope':role,'captureMethod':'ffmpeg remote seek, single native-resolution1920x1080 decoded frame encoded JPEG q2; no resize, recolor, crop, pixel paint or complete movie download. Exact tool arguments and stderr preserved.','platformEvidence':'Archive uploader WorldofLongplays labels the2017 recording PS4 TPP. Console hardware/framebuffer and fine material values are not independently certified.'})

limits=[
 'Target remains1:1 source-specific original2015 TPP. These newly painted2D poses are closest_supported adaptations of original3D references, never extracted source animation, absolute pixel/model/material identity or absolute1:1 certification.',
 'Selected costume is original TPP scarred living HUMAN face, domino mask, fedora, thigh-length formal coat/waistcoat, beige-grey collar and dark tie, full black gloves, loose trousers tucked into tall black western boots. No literal skeleton, undead skull, parasite-soldier armor, flaming Volgin attributes or Diamond Dogs diamond.',
 'Dark source cutscene lighting partly occludes seams, reverse details and precise boot leather/sole stitching. Source gold XOF chest crest and scar relief remain interpreted at sprite scale; exact crest lettering, badge pixel placement, scar topology, finger count in occlusion and material response are not certified1:1. C LEFT final preserves distinctive scar lines but fine relief is softer than high-resolution official portrait.',
 'Original full body sources show a partly obscured item by anatomical right thigh; they do NOT establish its precise firearm model or personal shooting use. IMFDB TPP www/apex/http all returned403 and no full verified weapon capture was recovered. Neither absence of every weapon in canon nor a generic pistol, Mare’s Leg or personal volley is certified. Selected empty-handed dialogue-derived posture conservatively omits unresolved holstered detail. No firearm/grenade is invented in any native pose.',
 'All normal strikes, bounded jump, guard, crouch, physical grab, hit/KO and stamina recovery are authored versus adaptations. Source dialogue supports grounded human gestures, not an actual canonical duel, magic marking power, ballistic finger muzzle or supernatural shield. Gameplay/profile consistency and explicit simulation wording remain independent integrator responsibilities.',
 'C shoot is only the existing sprite action key for non-ballistic designation0..2; deploy3..5 is guarded posture without deployed ordnance; throw6..8 is authored physical CQC control; recover9..11 restores composure/effort and never loads a firearm. Super may use throw/heavy for explicitly authored melee. Hand marks are gesture landmarks, not ballistic origins.',
 'Both facings independently generated; no mirrored raster or runtime body reflection. Twelve figures per selected sheet physically inspected. A LEFT1 rejected mixed directions; C LEFT1 rejected extra tiny lapel mark, C LEFT2 edit did not clearly remove it and softened scars; C LEFT3 fixed lapel policy but cell6 facedRIGHT; C LEFT4 final corrects that sole direction through image_gen. All ten generated native PNGs, exact prompts and rejected originals preserved, no extra OC.',
 'Pillow/NumPy/SciPy inspect alpha/hash/components and describe Canvas rectangles/pivots only, no pixels edited. Native sub-alpha8 fringes and RGB remain untouched. Fixed source upright height prevents crouch/KO stretching; actual hitboxes/camera/mobile/phase validation belongs to integrator.'
]
review={'status':'approved','reviewer':'pass7_skull_face_native / producer source and complete72-pose physical review','reviewedAt':'2026-10-02','sourceKind':'original-game-capture','checks':{k:True for k in ['identity','costume','equipment','anatomicalSides','singleFigure','transparentBackground']},'fidelityStatus':'closest_supported','absolute1to1Certified':False,'sources':refs,'limits':limits,'approvalScope':'Source-specific unarmed TPP appearance and72 authored human action poses; approved costume/boots/gloves/fedora/domino face in selected source scope, not unresolved firearm or full runtime integration.'}
write('CANONICAL_REVIEW.json',review)
write('CANONICAL_REFERENCE_MANIFEST.json',{'uid':UID,'sources':refs,'selectedOriginalFrames':len(roles),'fullMoviesDownloaded':0,'referenceBudgetBytes':sum(f.stat().st_size for f in (P/'references').rglob('*') if f.is_file()),'negativeSearchRetained':['archive thumbnail timeline scans','off-target initial frame probes','IMFDB403','Fandom402','Bing results about unrelated human skulls'],'noUnverifiedWebSearchResultPromotedToSource':True})
write('NATIVE_ALPHA_REVIEW.json',{'schema':'cqc.pass7.native-alpha-review/1','uid':UID,'sheets':alpha,'acceptedNativeSheets':6,'authoredPoseCount':72,'nativeGenerationAttempts':10,'rejectedAttempts':['A_LEFT_01','C_LEFT_01','C_LEFT_02','C_LEFT_03'],'pixelEditsOutsideImageGen':False})

action_layout={'idle':{'sheet':'a','indices':[0,1],'fps':4,'loop':True},'walk':{'sheet':'a','indices':[2,3,4,5],'fps':9,'loop':True},'guard':{'sheet':'a','indices':[6,7],'fps':5,'loop':True},'crouch':{'sheet':'a','indices':[8,9],'fps':4,'loop':True},'jump':{'sheet':'a','indices':[10,11],'fps':6,'loop':False},'punch':{'sheet':'b','indices':[0,1,2],'fps':12,'loop':False},'heavy':{'sheet':'b','indices':[3,4,5],'fps':10,'loop':False},'low':{'sheet':'b','indices':[6,7,8],'fps':10,'loop':False},'hit':{'sheet':'b','indices':[9],'fps':0,'loop':False},'ko':{'sheet':'b','indices':[10,11],'fps':6,'loop':False},'shoot':{'sheet':'c','indices':[0,1,2],'fps':10,'loop':False},'deploy':{'sheet':'c','indices':[3,4,5],'fps':8,'loop':False},'throw':{'sheet':'c','indices':[6,7,8],'fps':10,'loop':False},'recover':{'sheet':'c','indices':[9,10,11],'fps':5,'loop':False}}
phase={k:{'startup':[0],'active':[1],'recovery':[2]} for k in ['punch','heavy','low','shoot','deploy','throw','recover']};phase['guard']={'startup':[0],'active':[1],'recovery':[0]};phase['jump']={'startup':[0],'active':[0],'recovery':[1]}
slots={'light':'punch','heavy':'heavy','low':'low','throw':'throw','special':'shoot','specialDown':'deploy','specialForward':'throw','specialBack':'walk','super':'throw','utility':'recover'}
marks={'schema':'cqc.pass7.native-source-gesture-marks/1','uid':UID,'coordinateSystem':'Native full-sheet x,y unscaled/unreflected. Points are visible gloved index tips on active designation pose, never muzzle or ballistic origin.','marks':{}}
for side,key,point in [('right','c-right',[751,75]),('left','c-left',[420,78])]:
    f=next(x for x in files if x['key']==key);im=Image.open(f['source']);rgba=list(im.getpixel(tuple(point)));check(side+' designation native landmark alpha',rgba[3]>=48)
    marks['marks'][side]={'designation':{'action':'shoot','frame':1,'sourcePoseIndex':1,'file':f'assets/combat-sprites/{UID}/{key}-v1.png','source':f['source'],'sha256':f['sha256'],'point':point,'pointRGBA':rgba,'note':'Authored empty-glove index-finger designation landmark. Original dialogue shows hand gestures. No weapon, no emission, no projectile or psychic-canonical ability.'}}
write('SOURCE_COMBAT_ORIGINS.json',marks)
contract={'uid':UID,'incarnation':'Original MGSV The Phantom Pain2015, source episode30 dialogue-derived costume','sourceFiles':refs,'selectedEquipment':'Empty-handed formal pose with original fedora/domino mask/gloves/western boots; firearm unresolved and excluded from selected art','actionMap':slots,'actionLayout':action_layout,'phaseMap':phase,'limits':limits,'sourceProfileSnapshotSha256':sha(P/'PROFILE_SNAPSHOT.json'),'sourceFinisherSnapshotSha256':sha(P/'FINISHER_PROFILE_SNAPSHOT.json'),'productionMutation':False}
write('SOURCE_AND_ACTION_CONTRACT.json',contract)
delivery={'schema':'cqc.native-combat-delivery/1','uid':UID,'name':'SKULL FACE','game':'Metal Gear Solid V: The Phantom Pain (2015)','incarnation':'Original2015 TPP Skull Face, living scarred human, formal dark coat/waistcoat/fedora/domino mask and western boots, empty-handed source posture','selectedCostume':'original-tpp-skull-face-dialogue-formal-costume','basis':'Apparence originale TPP vérifiée ; désignation/garde/CQC de simulation versus explicitement adaptés, aucun duel canonique, pouvoir surnaturel, pistolet ou grenade inventé. Arme portée partiellement masquée non certifiée.','displayHeight':230,'coverage':'action-frames','facing':1,'mirror':False,'sourceFiles':files,'actionLayout':action_layout,'actionMap':slots,'phaseMap':phase,'review':review,'counts':{'selectedNativePngSheets':6,'totalPoseCells':72,'poseCellsPerSheet':12,'facings':2,'nativeGenerationAttempts':10,'rejectedNativeAttempts':4,'selectedWeaponPropAtlases':0},'sourceGeometry':geo,'layouts':layouts,'sourceCombatOrigins':str(P/'SOURCE_COMBAT_ORIGINS.json'),'sourceContract':str(P/'SOURCE_AND_ACTION_CONTRACT.json'),'nativeAlphaReview':str(P/'NATIVE_ALPHA_REVIEW.json'),'limits':limits,'requiresGameplayContract':'New pass7 command-designation mark/brief guard/CQC effort simulation must supersede old generic pistol/grenade profile; do not attach finger landmarks to old ballistic shots. Runtime/phase verification root-owned.'}
write('FINAL_DELIVERY.json',delivery)
reference_inventory=[]
selected={r['file'] for r in refs}
for f in sorted((P/'references').rglob('*')):
    if f.is_file():reference_inventory.append({'file':str(f),'bytes':f.stat().st_size,'sha256':sha(f),'canonicalSelected':str(f) in selected,'note':'Unselected raw timeline/search frames retained as negative provenance only, not source support.'})
write('REFERENCE_PRESERVATION_INDEX.json',{'uid':UID,'files':reference_inventory,'completeMovieDownloads':0})
write('DELIVERY_VERIFICATION.json',{'uid':UID,'status':'passed','assertions':len(checks),'failures':0,'checks':checks,'acceptedNativeSheets':6,'authoredPoses':72,'independentFacings':True,'untouchedNativeOriginalBytes':True,'limitations':limits,'producerPhysicalReviewCompleted':True,'runtimeVerified':False})
inventory=[{'path':str(f.relative_to(P)),'bytes':f.stat().st_size,'sha256':sha(f)} for f in sorted(P.rglob('*')) if f.is_file() and f.name!='FILE_SHA256_MANIFEST.json']
write('FILE_SHA256_MANIFEST.json',{'uid':UID,'files':inventory,'fileCount':len(inventory),'frozenAfterProducerReview':True})
print(json.dumps({'status':'producer-reviewed-ready-for-independent-integration','uid':UID,'sheets':6,'poses':72,'assertions':len(checks),'failures':0,'deliverySha256':sha(P/'FINAL_DELIVERY.json'),'referenceBytes':sum(x['bytes'] for x in reference_inventory),'sourceHeights':{k:v['recommendStandingSourceHeight'] for k,v in geo.items()}},indent=2))
