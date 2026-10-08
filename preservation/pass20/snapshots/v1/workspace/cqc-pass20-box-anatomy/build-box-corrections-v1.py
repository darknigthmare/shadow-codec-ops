"""Read-only native alpha geometry; source PNG pixels are never changed."""
from pathlib import Path
from PIL import Image
from scipy import ndimage
import numpy as np
import json, hashlib, copy

ROOT=Path('/workspace/cqc-pass20-box-anatomy')
APP=Path('/tmp/cqc-pass19-application/public/cqc')
OLD=Path('/tmp/cqc-pass19-pw-box-generation/generation')
NAMES={
 'right-movement':'exec-b0cd2ddb-8a7b-4c6a-8b07-3215a77f5856.png',
 'left-movement':'exec-ac4e25cd-0754-44a2-b41b-191c02e4f522.png',
 'right-combat':'exec-0940586a-8d6c-4048-a3fd-dc6f3c2a30ea.png',
 'left-combat':'exec-4d964a44-430a-42db-9b52-914fc11efc5d.png',
 'right-cannon':'exec-47571d14-54e6-41f8-b525-f365da71697f.png',
 'left-cannon':'exec-f4df2f7e-d73e-4566-9239-96a6e7235428.png',
 'right-recovery':'exec-c4940882-ca17-48a9-ad5a-3b6a8840f888.png',
 'left-recovery':'exec-2ab25419-072b-454d-ac78-6dea3307c8ae.png',
}
REJECTS={
 'initial-right-three-boots':'exec-38d83950-0635-4c4a-a7fa-d6ecb563e016.png',
 'initial-left-three-boots':'exec-a78b5de5-49ac-42cb-8552-5956b412a47a.png',
 'second-right-mixed-faces-three-boots':'exec-c23cc13a-48cb-4594-a2ee-6f013a60f844.png',
 'third-right-noncanonical-body-and-incomplete-four-boot-count':'exec-dd82cece-bbc5-4aef-8e57-25680ad77950.png',
}
PARTS=['movement','combat','cannon','recovery']
UIDS=['pass19__box_tank_pw','pass19__box_tank_stun_pw','pass19__box_tank_smoke_pw']
STAMP='2026-10-08'
def sha(data):return hashlib.sha256(data).hexdigest()
def metadata(p):
 data=p.read_bytes()
 return {'path':str(p),'bytes':len(data),'sha256':sha(data)}

baseline_path=APP/'src/cqc-pass19-pw-box-sprite-catalog.js'
baseline_text=baseline_path.read_text()
baseline=json.loads(baseline_text.split('const addition=',1)[1].split(';const base=',1)[0])
pages=[];poses={'right':{},'left':{}};heights={};selected_files=[]
for key,name in NAMES.items():
 side,part=key.split('-');source=Path('/workspace/generated_images')/name
 data=source.read_bytes();im=Image.open(source)
 assert im.mode=='RGBA'
 alpha=np.array(im.getchannel('A'));labels,count=ndimage.label(alpha>=16)
 counts=np.bincount(labels.ravel());component_ids=np.flatnonzero(counts>1000);component_ids=component_ids[component_ids!=0]
 assert len(component_ids)==4,(key,len(component_ids))
 native=[]
 for label in component_ids:
  ys,xs=np.where(labels==label);lo_x,lo_y,hi_x,hi_y=map(int,(xs.min(),ys.min(),xs.max(),ys.max()))
  cx,cy=(lo_x+hi_x)/2,(lo_y+hi_y)/2
  cell=min(1,int(cy/(im.height/2)))*2+min(1,int(cx/(im.width/2)))
  physical=PARTS.index(part)*4+cell
  assert physical not in poses[side]
  x=max(0,lo_x-2);y=max(0,lo_y-2);right=min(im.width,hi_x+3);bottom=min(im.height,hi_y+3)
  rect=[x,y,right-x,bottom-y]
  # Center the actor under the cardboard hull, independently of which boot is lowest.
  middle=(ys>=lo_y+round((hi_y-lo_y)*.45))&(ys<=lo_y+round((hi_y-lo_y)*.60))
  hull_x=xs[middle];ground_x=(int(hull_x.min())+int(hull_x.max()))/2
  ground_y=hi_y+1
  pivot=[round((ground_x-x)/rect[2],6),round((ground_y-y)/rect[3],6)]
  file=f'assets/combat-sprites-pass20-boxes/box-tank-pw/{side}-{part}-v1.png'
  frame={'file':file,'sha256':sha(data),'rect':rect,'pivot':pivot,
   'previewStatureBounds':{'left':lo_x-x,'top':lo_y-y,'right':hi_x+1-x,'bottom':hi_y+1-y}}
  # A component can extend slightly beyond the imagined grid but cannot contain another fighter.
  others=(labels[y:bottom,x:right]!=0)&(labels[y:bottom,x:right]!=label)&(alpha[y:bottom,x:right]>=16)
  other_large=[int(z)for z in np.unique(labels[y:bottom,x:right][others]) if counts[int(z)]>1000]
  assert not other_large,(key,physical,'another body enters source rectangle',other_large)
  poses[side][physical]=frame
  native.append({'physicalPoseIndex':physical,'cellIndex':cell,'frame':frame,'nativeComponentBounds':[lo_x,lo_y,hi_x,hi_y],
   'alphaPixelsAtLeast16':int(counts[label]),'bootCountPhysicallyReviewed':4,'operatorCount':2,
   'reviewStatus':'approved-four-distinct-human-boots-two-pairs','sourcePixelsChanged':False})
 native.sort(key=lambda v:v['physicalPoseIndex'])
 # Upright reference within each authored page; crouched/recoil pose can stay shorter naturally.
 reference_index=PARTS.index(part)*4+(1 if part=='combat' else 3 if part=='cannon' else 0)
 stature=poses[side][reference_index]['previewStatureBounds']
 heights[file]=stature['bottom']-stature['top']
 page={'side':side,'part':part,'source':str(source),'file':file,'sha256':sha(data),'bytes':len(data),
  'dimensions':list(im.size),'referencePhysicalPoseIndex':reference_index,'sourceFrameHeight':heights[file],
  'poseCount':4,'poses':native,'physicalPixelsTransformed':False}
 pages.append(page);selected_files.append({'source':str(source),'runtimePath':file,'sha256':sha(data),'bytes':len(data)})

entries={}
for uid in UIDS:
 entry=copy.deepcopy(baseline['entries'][uid]);original_fields={k:copy.deepcopy(entry[k])for k in ['actionMap','phaseMap','displayHeight','equipmentAdaptation','operatorCount']}
 for side,field in [('right','actions'),('left','oppositeActions')]:
  old_layout=json.loads((OLD/uid/(side+'-native-layout-v1.json')).read_text())
  old_frames={tuple(p['rect']):index for index,p in enumerate(old_layout['poses'])}
  for action in entry[field].values():
   action['frames']=[copy.deepcopy(poses[side][old_frames[tuple(frame['rect'])]])for frame in action['frames']]
 entry['baseFrameHeight']=heights[poses['right'][0]['file']]
 entry['sourceFrameHeights']=copy.deepcopy(heights)
 entry['pass20AnatomyCorrection']={'twoHiddenBiologicalOperators':True,'distinctHumanBootCount':4,
  'nativeFacingsIndependentlyAuthored':True,'sharedCanonicalFamilyExteriorAcrossAmmunition':True,
  'newPhysicalPoseCount':32,'mappedFamilyPoseCount':96,'sourcePNGsNeverRewritten':True}
 review=entry['review'];review.update({'status':'approved','reviewer':'pass20-pw-box-four-human-boots-physical-source-review','reviewedAt':STAMP})
 review['limits']=[line for line in review['limits']if not line.startswith('Sixteen actual authored')]
 review['limits'] += [
  'Pass20: sixteen authored poses per direction, thirty-two physical poses shared across three canonical ammunition loads (ninety-six equipment pose mappings).',
  'All thirty-two selected new native figures were physically inspected with four separate human boots arranged as two hidden operators. Four rejected generated atlases are retained and are not used at runtime.',
  'Canonical exterior family recreated as original hand-painted sprites from original-game reference. Absolute pixel-for-pixel reproduction and official metric size are not certified.',
  'Action groups reuse the sixteen native keyposes per direction. Combat profiles, equipment identities, ammunition and original scale settings are unchanged.',
 ]
 assert all(entry[k]==v for k,v in original_fields.items())
 entries[uid]=entry

anchors={}
for uid in UIDS:
 sides={}
 for side in ['right','left']:
  frame=entries[uid]['actions' if side=='right' else 'oppositeActions']['shoot']['frames'][1]
  page=next(p for p in pages if p['file']==frame['file'])
  alpha=np.array(Image.open(page['source']).getchannel('A'))
  x,y,w,h=frame['rect'];upper=alpha[y:y+max(1,round(h*.32)),x:x+w]
  yy,xx=np.where(upper>=200);tip=int(xx.max()if side=='right'else xx.min())
  near=xx>=tip-2 if side=='right'else xx<=tip+2
  point=[x+tip+.5,y+(int(yy[near].min())+int(yy[near].max()))/2+.5]
  item={'uid':uid,'side':side,'action':'shoot','actionFrameIndex':1,'physicalPoseIndex':11,
   'file':frame['file'],'sha256':frame['sha256'],'sourceSHA256':frame['sha256'],'source':page['source'],
   'rect':frame['rect'],'pivot':frame['pivot'],'sourcePixel':point,
   'frameFraction':[round((point[0]-x)/w,8),round((point[1]-y)/h,8)],
   'measurement':{'threshold':200,'searchUpperFrameFraction':.32,'endcapSliceColumns':3,
    'sourceLocalTipColumn':tip,'tipCapAlphaSpanY':[int(yy[near].min()),int(yy[near].max())]},
   'physicallyReviewed':True,'reviewer':'pass20-pw-box-cannon-native-source-endcap-review',
   'scope':'Visible square cannon endpoint measured from selected native recoil pose; unchanged PNG bytes.'}
  sides[side]={'11':item}
 anchors[uid]={'sides':sides}

(ROOT/'runtime/src').mkdir(parents=True,exist_ok=True)
def output_js(name,prefix,data,suffix):
 p=ROOT/'runtime/src'/name;p.write_text(prefix+json.dumps(data,separators=(',',':'))+suffix);return metadata(p)
module=output_js('cqc-pass20-pw-box-corrections.js',
 "/* Two hidden Peace Walker operators, four native boots. Prior atlases preserved. */\n(function(root){'use strict';const replacements=",
 {'schema':'cqc.combat-sprites/1','entries':entries},
 ";const base=root.CQC_COMBAT_SPRITE_CATALOG;if(!base?.entries)throw Error('PW box correction requires base catalog');for(const uid of Object.keys(replacements.entries))if(!base.entries[uid])throw Error('Missing original PW equipment '+uid);root.CQC_COMBAT_SPRITE_CATALOG={...base,entries:{...base.entries,...replacements.entries}};root.CQC_PASS20_BOX_CORRECTIONS=Object.freeze({version:'pass20-native-pw-box-anatomy/1',uids:Object.freeze(Object.keys(replacements.entries)),newPhysicalPoses:32,equipmentPoseMappings:96});})(globalThis);\n")
anchor_module=output_js('cqc-pass20-box-cannon-anchors.js',
 "/* Pass20 four-boot box sprites: guarded native square cannon attachment points. */\n(function(root){'use strict';const replacements=",
 anchors,
 ";const base=root.CQC_PASS19_BOX_ATTACHMENTS||{schema:'cqc.pass19.native-box-attachments/1',entries:{}};root.CQC_PASS19_BOX_ATTACHMENTS={...base,entries:{...base.entries,...replacements}};root.CQC_PASS20_BOX_ATTACHMENTS=Object.freeze({version:'pass20-box-native-source-points/1',uids:Object.freeze(Object.keys(replacements))});})(globalThis);\n")

baseline_sources=[]
for p in sorted((APP/'assets/combat-sprites-pass19-boxes').glob('*/*.png')):
 uid=p.parent.name
 baseline_sources.append({**metadata(p),'uid':uid,'side':p.stem.split('-')[0],
  'physicalPosesInspected':16,'selectedRuntimeOriginalPreserved':True,
  'anatomyReview':('superseded-three-visible-boot-silhouette; two-operator-count-not-readable'if uid in UIDS else 'one-hidden-human-operator-two-legs; retained')})
source=Path('/tmp/cqc-pass19-pw-box-generation/references/box-tank-pw-presscapture.jpg')
proof={'schema':'cqc.pass20.native-pw-box-anatomy-review/1','status':'source-approved-awaiting-root-integration-and-actual-match-QA',
 'reviewedAt':STAMP,'scope':{'baselineAtlasesInspected':16,'baselinePhysicalPosesInspected':256,
  'simpleBoxPhysicalPosesRetained':160,'tankMappedEquipmentPosesCorrected':96,
  'newAtlases':8,'newUniquePhysicalPoses':32,'runtimePNGBytes':sum(p['bytes']for p in pages),
  'sharedExteriorEquipmentUIDs':UIDS,'allSelectedPhysicalBootCounts':4,'allSelectedOperatorCounts':2},
 'canonicalSource':{**metadata(source),'url':'https://cdn.mos.cms.futurecdn.net/57c1d74c5659a03dd7d7fb5dac7b06f3.jpg',
  'classification':'original-game-press-capture','physicallyViewed':True,
  'operatorCountTextSources':['https://metalgear.fandom.com/wiki/Peace_Walker_weapons_and_equipment','https://wikiwiki.jp/walker/%E8%A3%85%E5%82%99%E5%93%81'],
  'qualification':'Reference shows canonical cardboard hull; two hidden operator/four-leg identity is also retained from documented equipment source. Human CQC actions remain original playable adaptation.'},
 'baselineCatalog':metadata(baseline_path),'baselineSources':baseline_sources,'selectedPages':pages,
 'selectedFilesForRootInstallation':selected_files,'modules':[module,anchor_module],
 'cannonAnchors':anchors,'rejectedGeneratedSources':[{'reason':reason,**metadata(Path('/workspace/generated_images')/name),'runtimeSelected':False,'sourceRetained':True}for reason,name in REJECTS.items()],
 'sourcePixelsChanged':False,'originalSourceFilesDeleted':False,'baseCatalogFileChanged':False,
 'gameplayProfilesChanged':False,'heightSettingsChanged':False,'nativeFacingRasterMirrored':False,
 'limitations':['Source review is limited to eight Peace Walker equipment bodies and their native keyposes, not every franchise sprite.',
  'New sources are source-approved; final app loading, live match rendering and projectile socket alignment need root integration QA.',
  'Ammunition loads share the same exterior family. No uninspected official STN/SMK-specific alternate texture or insignia is invented.']}
out=ROOT/'PW_BOXES_FOUR_BOOTS_SOURCE_REVIEW_ACTUAL_V1.json';out.write_text(json.dumps(proof,indent=2))
print(json.dumps({'proof':metadata(out),'module':module,'anchorModule':anchor_module,'runtimeImageBytes':proof['scope']['runtimePNGBytes'],'selectedPoses':32},indent=2))
