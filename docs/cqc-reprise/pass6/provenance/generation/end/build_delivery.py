from pathlib import Path
import sys,json,hashlib,shutil,csv,statistics
from PIL import Image
import numpy as np
P=Path('/workspace/cqc-pass6-generation/end');R=Path('/workspace/cqc-game-working/cqc-versus-v056')
sys.path.insert(0,str(R/'tools'))
from inspect_combat_sprite_sheet import inspect_components
sha=lambda p:hashlib.sha256(Path(p).read_bytes()).hexdigest()
def write(p,d):p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n')
selected={'a-right':'A_RIGHT_01','a-left':'A_LEFT_03_FRESH_LEFT','b-right':'B_RIGHT_01','b-left':'B_LEFT_02_FRESH_LEFT','c-right':'C_RIGHT_01','c-left':'C_LEFT_02_FRESH_LEFT'}
standing={'a-right':[0,1],'a-left':[0,1],'b-right':[0,2],'b-left':[0,2],'c-right':[0,1,2,6],'c-left':[0,1,2,6]}
files=[];geo={};layouts={};alphareview=[]
for key,n in selected.items():
 d=json.loads((P/'metadata'/(n+'.json')).read_text()); assert d['majorComponentCount']==12 and not any(d['alpha48OuterEdgePixels'].values())
 dest=P/'sources'/(n+'.png');shutil.copy2(d['source'],dest);assert sha(dest)==d['sha256']==sha(d['nativeOriginal'])
 files.append({'key':key,'source':str(dest),'nativeOriginal':d['nativeOriginal'],'sha256':d['sha256'],'bytes':d['bytes'],'width':d['width'],'height':d['height'],'columns':4,'rows':3,'poseCount':12,'facing':1 if key.endswith('right') else -1,'mirror':False})
 l=inspect_components(dest,4,3,'assets/combat-sprites/core__end/'+key+'-v1.png');write(P/'layouts'/(key+'.json'),l);layouts[key]=str(P/'layouts'/(key+'.json'))
 h=[d['majorComponents'][i]['height'] for i in standing[key]]
 geo[key]={'recommendStandingSourceHeight':statistics.median(h),'nativeUprightHeights':h,'observedUprightIndices':standing[key],'measuredLayouts':layouts[key],'basis':'Actual physically viewed complete upright source bounds. Fixed per-PNG standing scale; seated/reload/crouch/KO keep physical short posture and are never stretched to the upright height. Whole rifle may shift alpha centroid; independent integrator observes body/ground pivots.'}
 alphareview.append({'key':key,'nativeOriginal':d['nativeOriginal'],'sha256':d['sha256'],'mode':d['mode'],'dimensions':[d['width'],d['height']],'alpha0Pixels':d['alpha0Pixels'],'majorComponents':12,'opaqueOuterEdges':d['alpha48OuterEdgePixels'],'physicallyViewedAllTwelvePoses':True,'bodyAndEquipmentComplete':True,'sameNativeBytes':True})
refs=[
('konami-end.gif','https://www.konami.com/mg/archive/mgs3/english/pic/chara_end_pic.gif','official-game-model',None,'Official original PS2 full-body model: broad elderly silhouette, bald painted scalp, dark blue headphones, white beard, olive/tan flat-leaf ghillie, bare hands, brown ankle boots, original wood-stock scoped Mosin and green parrot on anatomical LEFT shoulder.'),
('art-0009.jpg','https://www.metalgearsolid.be/images/mgs3_art_0009.jpg','official-art-reference',None,'Original Shinkawa monochrome concept art reproduced by external archive. Elderly face, beard, leaf camouflage, bag and long rifle; monochrome alone does not establish palette.'),
('mosin-inventory.jpg','https://www.metalgearsolid.be/images/mosin.jpg','original-game-reference',None,'Original MGS3 Mosin Nagant inventory silhouette reproduced by external archive and explicitly labelled in preserved mgs3-inventory.html. Conventional scoped wood-stock bolt rifle; no railgun/PSG1/bayonet.'),
('ps2-longplay-16800s.png',None,'original-game-capture',16800,'Original Snake Eater PS2 cutscene close hand and brown rifle stock/trigger guard: bare aged firing hand, conventional wood-stock rifle.'),
('ps2-longplay-16815s.png',None,'original-game-capture',16815,'Original PS2 frontal high angle confirms painted bald scalp under headphone band, stocky ghillie body and parrot on anatomical LEFT shoulder.'),
('ps2-longplay-16840s.png',None,'original-game-capture',16840,'Original PS2 near firing view: right trigger hand and left support on original wood-stock scoped rifle. Original face/headphone/white beard/leaf suit. Warm optic highlight is scene sunlight, never an energy-weapon source.'),
('ps2-longplay-18835s.png',None,'original-game-capture',18835,'Original PS2 death/rest scene: elderly face, beard, ghillie and physically perched green parrot. Bounded versus breathing/recovery pose is authored, not this original skeletal animation.')]
refrows=[];url='https://archive.org/download/PS2_Longplay-001-Metal_Gear_Solid_3-Snake_Eater/PS2_Longplay-001-Metal_Gear_Solid_3-Snake_Eater.mp4'
for fn,u,kind,t,note in refs:
 f=P/'references'/fn;im=Image.open(f);row={'file':str(f),'url':u or url,'sha256':sha(f),'bytes':f.stat().st_size,'sourceKind':kind,'dimensions':[im.width,im.height],'viewed':True,'scope':note}
 if t is not None:row.update(timeSeconds=t,captureMethod='ffmpeg remote seek, native decoded PNG at requested timestamp, no resize/recolor/edit and no full video downloaded',archiveItem='PS2_Longplay-001-Metal_Gear_Solid_3-Snake_Eater')
 refrows.append(row)
write(P/'CANONICAL_REFERENCE_MANIFEST.json',{'uid':'core__end','incarnation':'Metal Gear Solid 3: Snake Eater (2004), original PlayStation 2','references':refrows,'failedOfficialPathsPreserved':'OFFICIAL_SOURCE_DOWNLOADS.json: HTTP 200 HTML paths the_end/theend/END are excluded from visual reference proof. Only chara_end_pic.gif is an actual official image.','nonTargetCapturesPreserved':['16400','16700','16805','17600','18800','18820','20800','21600','22500'],'absolute1to1Certified':False})
actions={
'idle':('a',[0,1],4,True),'walk':('a',[2,3,4,5],9,True),'guard':('a',[6,7],5,True),'crouch':('a',[8,9],4,True),'jump':('a',[10,11],6,False),
'punch':('b',[0,1,2],12,False),'heavy':('b',[3,4,5],10,False),'low':('b',[6,7,8],10,False),'hit':('b',[9],0,False),'ko':('b',[10,11],6,False),
'shoot':('c',[0,1,2],10,False),'charge':('c',[3,4,5],8,False),'optic':('c',[6],0,False),'recover':('c',[7,8],5,False),'reload':('c',[9,10,11],8,False)}
layout={k:{'sheet':s,'indices':i,'fps':f,'loop':l} for k,(s,i,f,l) in actions.items()}
phase={k:{'startup':[0],'active':[1],'recovery':[2]} for k in ['punch','heavy','low','shoot','charge','reload']};phase.update({'optic':{'startup':[0],'active':[0],'recovery':[0]},'recover':{'startup':[0],'active':[1],'recovery':[1]},'crouch':{'startup':[0],'active':[1],'recovery':[1]},'jump':{'startup':[0],'active':[0],'recovery':[1]}})
# Native muzzle front pixel physically identified from the full source sheets, then alpha/RGBA sampled unchanged.
origins={'uid':'core__end','units':'full native PNG pixels','groups':[],'rendererPivotAndScaleOwner':'pass6_sprite_integrator','measuredPhysically':True,'noNativePixelEdits':True}
for action,slot,index,rpoint,lpoint in [('shoot','special',1,[737,84],[375,92]),('charge','super',4,[392,484],[17,478])]:
 points={}
 for face,key,point in [('right','c-right',rpoint),('left','c-left',lpoint)]:
  row=next(x for x in files if x['key']==key);rgba=list(Image.open(row['source']).getpixel(tuple(point)));assert rgba[3]>=48
  points[face]={'action':action,'frame':1,'sourceSheetKey':key,'sourcePoseIndex':index,'file':row['source'],'sha256':row['sha256'],'point':point,'rgba':rgba,'description':'Physically viewed opaque original Mosin front muzzle centre, first active action frame 1. One conventional original rifle; no railgun/energy interpretation. Integrator independently verifies source crop/pivot and anchor.'}
 origins['groups'].append({'group':action,'slots':[slot],'points':points})
write(P/'SOURCE_COMBAT_ORIGINS.json',origins)
limits=[
'Closest supported illustrated adaptation of The End from original Metal Gear Solid 3: Snake Eater (2004) PS2; no absolute pixel, model, material, skeleton or animation 1:1 certification. Original official color model and native original PS2 captures were physically viewed and are preserved unchanged.',
'Original flat leaf-flap ghillie, bald painted scalp, blue headset, white beard, bare hands, broad elderly shape, green parrot and original scoped Mosin only. No Delta, HD remake, modern sniper uniform, PSG1, railgun, magic aura or bayonet accepted.',
'Parrot stays on intended anatomical LEFT shoulder in both independently generated views, never becomes a second disconnected body component. Exact hidden vest/bag strap stitching, boot laces and the count of leaf flaps remain unresolved in low-resolution original evidence and are restrained authored interpretation.',
'Original PS2 firing image confirms right trigger / left supporting hands. Independent versus views intend the same rig. Finger anatomy, obscured far arms and headset-touch hand during tracking/reload rest cannot be certified 1:1 or exclusive canonical handedness.',
'All 72 body poses are authored bounded fighting-game adaptations, not ripped original animation. Normal rifle checks/shoves, low boot sweep, grapple alias, short jump, tracking, cloak, rest and reload remain Versus adaptations. No opponent or detached effect is baked into body sheets.',
'Both shoot and charge use the same original scoped wooden Mosin. Source muzzle is separately measured on C source global index 1 and 4 at first active action frame 1 for both independent facings. Root owns exact-UID gameplay correction from inherited rail tag to conventional finite-ammo shot; producer never changed profiles or engine.',
'Body scale stays fixed per native PNG at physically observed standing height, including seated reload/rest/crouch/KO. Rifles can shift alpha-centroid; independent integrator measures actual body/ground pivots and runtime crop scaling. No PNG raster resize, mirroring, recolor, alpha edit, cut-and-paste or external conditioning was performed.',
'Every selected native PNG has exactly twelve large alpha-connected complete figures and no alpha >= 48 outer boundary pixels. Tiny antialias particles and stored RGB under transparent pixels are left native; runtime Canvas metadata crops/contours only.',
'Rejected native attempts are preserved byte-for-byte: A LEFT 01 and 02 retained right-pointing rifles in some left-view cells; B LEFT 01 had mixed faces/directions; C LEFT 01 kept several right-facing or wrong-direction cells. Final A LEFT 03, B LEFT 02 and C LEFT 02 were regenerated independently from original model/captures, and all shooting faces/origins now point LEFT.',
'Producer approval covers selected source-specific art and native alpha evidence. It is not a replacement for independent importer, mobile, phase, muzzle-origin, projectile-resource or final Shadow integration verification.'
]
review={'status':'approved','reviewer':'pass6_end_native','reviewedAt':'2026-10-02','fidelityStatus':'closest_supported','sourceKind':'original-game-capture','checks':{k:True for k in ['identity','costume','equipment','anatomicalSides','singleFigure','transparentBackground']},'sources':refrows,'limits':limits,'absolute1to1Certified':False,'approvalScope':'Six physically viewed native source PNGs, all 72 isolated body poses, source-specific original PS2 closest-supported design. Independent integrator/live-game QA still required.'}
profile=json.loads((R/'data/unified-roster-v053.json').read_text());f=next(x for x in profile['fighters'] if x['uid']=='core__end');write(P/'AUTHORITATIVE_PROFILE_READ_ONLY.json',{'source':str(R/'data/unified-roster-v053.json'),'sourceSha256':sha(R/'data/unified-roster-v053.json'),'fighter':f,'producerDidNotModify':True})
write(P/'NATIVE_ALPHA_REVIEW.json',{'uid':'core__end','selected':alphareview,'counts':{'selectedSheets':6,'poseCells':72,'attemptSheets':10},'noRasterEdits':True,'physicalInspection':'All selected full native sheets physically viewed; individual complete silhouettes followed in row-major order with source original identity/costume/weapon references. Standing heights observed separately from short poses.'})
contract={'uid':'core__end','selectedIncarnation':'Metal Gear Solid 3: Snake Eater (2004), original PlayStation 2','selectedCostume':'Original Sokrovenno Cobra Unit leaf-ghillie sniper','selectedNative':selected,'actionLayout':layout,'actionMap':{'light':'punch','heavy':'heavy','low':'low','throw':'heavy','special':'shoot','specialDown':'optic','specialForward':'crouch','specialBack':'recover','super':'charge','utility':'reload'},'phaseMap':phase,'sourceGeometry':geo,'equipment':'One original scoped wood-stock Mosin-Nagant tranquillisant; parrot on intended anatomical LEFT shoulder, bare hands and blue headset','fidelityStatus':'closest_supported','absolute1to1Certified':False,'limitations':limits}
write(P/'SOURCE_AND_ACTION_CONTRACT.json',contract)
write(P/'PHYSICAL_REVIEW.json',{'uid':'core__end','status':'approved','reviewer':'pass6_end_native','date':'2026-10-02','physicallyViewedSelectedSheets':selected,'poseCount':72,'sourceReferenceSha256':{Path(r['file']).name:r['sha256'] for r in refrows},'checks':review['checks'],'limits':limits,'nativeSourceBytesPreserved':True,'absolute1to1Certified':False})
delivery={'schema':'cqc.native-combat-delivery/1','uid':'core__end','name':'THE END','game':'Metal Gear Solid 3: Snake Eater (2004), original PlayStation 2','incarnation':'Original 2004 PS2 The End — Sokrovenno Cobra Unit leaf-ghillie sniper','selectedCostume':'original-sokrovenno-leaf-ghillie','basis':'Mosin-Nagant tranquillisant original, pistage et repos photosynthétique bornés ; poses adaptées au mode Versus.','displayHeight':230,'coverage':'action-frames','facing':1,'mirror':False,'sourceFiles':files,'actionLayout':layout,'actionMap':contract['actionMap'],'phaseMap':phase,'review':review,'counts':{'selectedNativePngSheets':6,'totalPoseCells':72,'poseCellsPerSheet':12,'facings':2,'nativeBodyGenerationAttempts':10},'sourceGeometry':geo,'layouts':layouts,'sourceCombatOrigins':str(P/'SOURCE_COMBAT_ORIGINS.json'),'sourceContract':str(P/'SOURCE_AND_ACTION_CONTRACT.json'),'nativeAlphaReview':str(P/'NATIVE_ALPHA_REVIEW.json'),'provenancePolicy':'All native generated sources, rejected attempts, original refs, prompts and tool args/results retained unchanged. Producer does not write production.'}
write(P/'FINAL_DELIVERY.json',delivery)
with (P/'POSES_72.csv').open('w',newline='') as h:
 w=csv.writer(h);w.writerow(['sourceSheetKey','sourceSha256','facing','index','actions','physicallyViewed','completeFigure'])
 for row in files:
  for i in range(12):
   w.writerow([row['key'],row['sha256'],row['facing'],i,'|'.join(k for k,a in layout.items() if row['key'].startswith(a['sheet']+'-') and i in a['indices']),True,True])
print(json.dumps({'delivery':str(P/'FINAL_DELIVERY.json'),'deliverySha256':sha(P/'FINAL_DELIVERY.json'),'selectedSheets':6,'poseCells':72,'attemptSheets':10,'origins':4,'sourceGeometry':geo},indent=2))
