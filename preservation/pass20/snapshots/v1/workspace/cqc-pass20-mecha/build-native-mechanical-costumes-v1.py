import hashlib, json, os, shutil
from pathlib import Path
from datetime import datetime, timezone
import numpy as np
import contourpy
from scipy import ndimage
from PIL import Image

APP=Path('/tmp/cqc-pass19-application/public/cqc')
OUT=Path('/workspace/cqc-pass20-mecha')
OUT.mkdir(parents=True,exist_ok=True)
at=datetime.now(timezone.utc).isoformat()
SHEETS={
 'snake': {'uid':'core__solid','name':'SOLID SNAKE — MGS1','game':'Metal Gear Solid 1998','id':'metalgear','family':'metalgear','height':3.4,'display':220,'bodyHeights':{'right':236,'left':238},'sources':{'right':'exec-8de6fa02-3f69-4f1b-bfa0-9b7ac9f70b87.png','left':'exec-4dbdc1d3-fe28-404e-809f-c8055630335e.png'},'url':'https://www.creativeuncut.com/gallery-02/mgs-solid-snake.html','design':'Original unmanned navy/slate armored vehicle hull on two reverse-jointed mechanical legs; cyan sensor strip, rigid twin rear antenna panels, chassis-mounted cannon and missile bay. No human anatomy or fabric.'},
 'ocelot': {'uid':'core__ocelot_mgs1','name':'REVOLVER OCELOT — MGS1','game':'Metal Gear Solid 1998','id':'metalgear','family':'metalgear','height':3.2,'display':220,'bodyHeights':{'right':245,'left':246},'sources':{'right':'exec-382170b9-2340-4a91-8f53-f719a479e70f.png','left':'exec-a8abf5d0-54dc-41eb-bfff-7dade2af298f.png'},'url':'https://www.creativeuncut.com/gallery-02/mgs-revolver-ocelot.html','design':'Original unmanned ochre/maroon weapons-platform hull, amber optics, a six-chamber mounted revolver turret, rigid rudder panels and exactly two reverse-jointed hydraulic legs. No human anatomy, hair, face, hands, coat, clothing or boots.'},
 'double-tripod': {'uid':'pass19__dwarf_gekko_humanoid_mgr','name':'DOUBLE TRIPOD — MGR','game':'Metal Gear Rising: Revengeance 2013','id':'trenchcoat','family':'alternate','height':1.55,'display':450,'bodyHeights':{'right':263,'left':266},'bodyTops':{'right':44,'left':52},'sources':{'right':'exec-bfe772ee-7aa5-42ff-8457-1ced024f08fb.png','left':'exec-8ab5536f-fb71-45c7-95c0-ffba2baf5f10.png'},'url':'https://metalgear.fandom.com/wiki/Humanoid_Dwarf_Gekko','design':'User-requested original brown trenchcoat/fedora adaptation over the TWO connected spherical Dwarf Gekko of the MGR Double Tripod. Two upper arm chains, two lower arm-leg chains, inner vertical connector and stowed sixth appendage. This is not the separate three-unit MGS4 trenchcoat identity and not an attested released MGR costume.'}
}
sources=[]; additions=[]; nativeAnchors=[]; geometry=[]
def simplify_path(points,epsilon=.7):
 if len(points)<3:return points
 a,b=points[0],points[-1];delta=b-a;length=np.linalg.norm(delta)
 distances=np.abs(np.cross(delta,points-a))/length if length else np.linalg.norm(points-a,axis=1)
 index=int(np.argmax(distances))
 if distances[index]<=epsilon:return points[[0,-1]]
 return np.concatenate((simplify_path(points[:index+1],epsilon)[:-1],simplify_path(points[index:],epsilon)))
for key,spec in SHEETS.items():
 framesBySide={};sourceHeights={}
 for side,filename in spec['sources'].items():
  original=Path('/workspace/generated_images')/filename
  blob=original.read_bytes();sha=hashlib.sha256(blob).hexdigest();im=Image.open(original);rgba=np.asarray(im);alpha=rgba[:,:,3]
  labels,count=ndimage.label(alpha>32);sizes=np.bincount(labels.ravel());ids=np.argsort(sizes[1:])[-16:]+1;objects=ndimage.find_objects(labels)
  records=[]
  for lab in ids:
   sy,sx=objects[lab-1];records.append((lab,sx,sy,(sx.start+sx.stop)/2,(sy.start+sy.stop)/2))
  records.sort(key=lambda r:(int(r[4]//(im.height/4)),r[3]))
  assert len(records)==16
  relative=f'assets/combat-costumes-pass20/{spec["uid"]}/{spec["id"]}/{side}-mechanical-v1.png'
  target=APP/relative;target.parent.mkdir(parents=True,exist_ok=True)
  if target.exists():assert target.read_bytes()==blob
  else:
   try:os.link(original,target)
   except OSError as error:
    if error.errno!=18:raise
    shutil.copy2(original,target)
  sourceHeights[relative]=spec['bodyHeights'][side]
  native=[]
  for idx,(lab,sx,sy,cx,cy) in enumerate(records):
   x,y,w,h=sx.start,sy.start,sx.stop-sx.start,sy.stop-sy.start
   mask=np.asarray(labels[sy,sx]==lab,dtype=np.uint8)*255
   contours=contourpy.contour_generator(z=np.pad(mask,1)).lines(127.5)
   contour=max(contours,key=lambda p:abs(np.sum(p[:-1,0]*p[1:,1]-p[1:,0]*p[:-1,1])))
   contour=simplify_path(contour-.5)[:-1]
   ground=np.argwhere(mask[max(0,h-14):,:]>0)
   px=float((ground[:,1].min()+ground[:,1].max()+1)/2/w) if len(ground) else .5
   frame={'file':relative,'sha256':sha,'rect':[x,y,w,h],'pivot':[round(px,8),1],'clipPolygon':[[round(float(a)/w,7),round(float(b)/h,7)]for a,b in contour]}
   if idx==0:
    top=(spec.get('bodyTops',{}).get(side,y)-y)
    frame['previewStatureBounds']={'left':0,'top':top,'right':w,'bottom':h}
   native.append(frame)
   geometry.append({'uid':spec['uid'],'costume':spec['id'],'side':side,'cell':idx+1,'rect':frame['rect'],'pivot':frame['pivot'],'sourceSHA256':sha,'nativeConnectedBodyPixels':int(sizes[lab]),'contourPoints':len(contour),'boundsDerivation':'Read-only connected alpha component, threshold32; native PNG bytes retained. Runtime vector silhouette isolates adjacent atlas bodies.','registered':not(key=='ocelot'and side=='left'and idx==1)})
  framesBySide[side]=native
  sources.append({'uid':spec['uid'],'costume':spec['id'],'side':side,'originalPath':str(original),'runtimeFile':relative,'sha256':sha,'bytes':len(blob),'width':im.width,'height':im.height,'alphaMin':int(alpha.min()),'alphaMax':int(alpha.max()),'zeroAlphaPixels':int(np.sum(alpha==0)),'physicalFigures':16,'sourceStandingBodyHeightPixels':spec['bodyHeights'][side]})
  # Exact drawn attachment point at the native active firing-cell muzzle. It is
  # the extremal barrel tip, not an authored human hand or generic height.
  if spec['family']=='metalgear':
   for cell in [6,7,12]:
    lab,sx,sy,_,_=records[cell];mask=labels[sy,sx]==lab;ys,xs=np.where(mask)
    edge=int(xs.max() if side=='right' else xs.min());tipRows=ys[np.abs(xs-edge)<=1]
    mx=sx.start+edge+.5;my=sy.start+float(np.median(tipRows))+.5
    f=native[cell];rect=f['rect'];fraction=[round((mx-rect[0])/rect[2],9),round((my-rect[1])/rect[3],9)]
    nativeAnchors.append({'uid':spec['uid'],'costume':spec['id'],'side':side,'cell':cell+1,'file':relative,'sourceSHA256':sha,'rect':rect,'pivot':f['pivot'],'nativeXY':[mx,my],'frameFraction':fraction,'socket':'chassis-mounted-cannon-muzzle','method':'Read actual active source component barrel extremum; median endpoint alpha pixels. Pose/file/SHA/rect/pivot exact match required.'})
   # Deployed projectile fires through the exposed launch/feed bay, a distinct
   # independently inspected native socket. Rear-facing offsets are signed.
   cell=10;f=native[cell];r=f['rect']
   if key=='snake':mx,my=(887,554) if side=='right'else(1030,555)
   else:mx,my=(978,659)if side=='right'else(829,657)
   nativeAnchors.append({'uid':spec['uid'],'costume':spec['id'],'side':side,'cell':cell+1,'file':relative,'sourceSHA256':sha,'rect':r,'pivot':f['pivot'],'nativeXY':[mx,my],'frameFraction':[round((mx-r[0])/r[2],9),round((my-r[1])/r[3],9)],'socket':'exposed-chassis-launch-feed-bay','method':'Manual read of visible source bay aperture at native pixels; no generic human attachment.'})
 def actions(side):
  f=framesBySide[side]
  indices={'idle':[0,12],'walk':[2,3],'guard':[4,12],'crouch':[5],'jump':[15],'attack':[6,7,12],'punch':[6,7,12],'heavy':[6,9,12],'low':[5,8,5],'throw':[4,9,12],'deploy':[4,10,12],'shoot':[6,7,12],'reload':[10,12],'optic':[6 if key=='ocelot'and side=='left'else 1,11],'recover':[15,0],'blade':[6,9,12],'roll':[5,15,0],'charge':[6],'parry':[4],'hit':[13],'ko':[14]}
  if key=='double-tripod':
   # Both low attacks use the actually forward-facing mechanical foot; the
   # sweeping arm posture belongs to the non-offensive inspection/taunt group.
   indices.update({'low':[5,9,5],'heavy':[6,7,12],'throw':[4,7,12],'blade':[6,7,12],'optic':[1,8,11]})
  return{k:{'fps':6 if k in ['idle','guard'] else 10 if k=='walk' else 12 if len(v)>1 else 0,'loop':k in ['idle','walk','guard'],'frames':[f[i]for i in v]}for k,v in indices.items()}
 amap={'light':'punch','heavy':'heavy','low':'low','throw':'throw','special':'shoot','specialDown':'deploy','specialForward':'punch','specialBack':'roll','super':'shoot','utility':'reload'}
 phases={k:{'startup':[0],'active':[1],'recovery':[2]}for k in ['attack','punch','heavy','low','throw','deploy','shoot','blade','roll']}
 limit=['This is an original user-authorized costume design, not an attested released canonical costume.','Original imagegen PNG bytes are retained unchanged; geometry and clipping do not rewrite source pixels.','Sixteen physical figures per direction, shared by explicit action groups; no 72-pose or original-game animation-extraction claim.','Independent opposite-camera native art, never mirrored pixels.','Whole-frame mechanical forms are not yet articulated or per-part destructible assemblies.','Attachment sockets qualify authored simulation to the actual source artwork, without claiming original-game moves or damage.']
 if key=='ocelot':limit.append('LEFT source cell2 elevated turret aims to the wrong side, preserved but excluded from every registered action. Exactly31 of32 physical figures mapped. Telescopic turret is retracted in idle and extended for the active firing pose.')
 if key=='double-tripod':limit += ['Exactly two stacked MGR Dwarf Gekko; this costume does not route to or duplicate the separate three-unit MGS4 coat identity.','1.55m is the pre-existing estimated body height, not an official certificate. Standing-body source height excludes the added fedora; outer alpha height can exceed body stature.','Under-garment appendages cannot be visually certified in all closed-coat poses; the open-coat pose exposes the two-sphere vertical connection.']
 sprite={'uid':spec['uid'],'name':spec['name'],'game':spec['game'],'incarnation':spec['design'],'coverage':'action-frames','displayHeight':spec['display'],'baseFrameHeight':spec['bodyHeights']['right'],'sourceFrameHeights':sourceHeights,'facing':1,'mirror':False,'fallbackMissingActions':True,'renderStyle':'painted','actions':actions('right'),'oppositeActions':actions('left'),'actionMap':amap,'phaseMap':phases,'review':{'status':'approved','reviewer':'pass20-native-mechanical-costumes-source-review','reviewedAt':at,'sourceKind':'original-character','sources':[{'url':spec['url'],'scope':'Identity/color/body reference only. Original costume is not a released canonical costume.'}],'checks':{k:True for k in ['identity','costume','equipment','anatomicalSides','singleFigure','transparentBackground']},'limits':limit},'costumeConcept':{'schema':'cqc.costume-design/1','sourceUID':spec['uid'],'family':spec['family'],'originalDesign':True,'canonicalAppearanceAttested':False,'designedPhysicalHeightMetres':spec['height'],'anatomy':'two-sphere-connected-dwarf-drones'if key=='double-tripod'else'nonhuman-unmanned-biped-vehicle-chassis'},'pass20Revision':'native-mechanical-v1'}
 option={'id':spec['id'],'label':'Manteau'if key=='double-tripod'else'Metal Gear','family':spec['family'],'sprite':sprite,'provenance':{'kind':'original-character-costume','sourceUID':spec['uid'],'originalDesign':True,'canonicalAppearanceAttested':False,'sources':[{'url':spec['url'],'scope':'Incarnation appearance/code reference only; user-requested original costume.'}]},'assetReview':{'status':'verified','independentArt':True,'reviewer':'pass20-native-mechanical-costumes-source-review','reviewedAt':at,'physicalPoseCount':32,'mappedPhysicalPoseCount':31 if key=='ocelot'else 32,'allDirectionsReviewed':True},'physicalExtent':{'metres':spec['height'],'evidence':'Original designed machine form; deliberate estimate, not canonical stature'if key!='double-tripod'else'estimated-source-incarnation-display','sources':[]if key!='double-tripod'else[spec['url']],'scope':'Original chassis stature retained from PASS19.'if key!='double-tripod'else'Existing1.55m MGR Double Tripod body estimate preserved; added fedora is an accessory, not a body resize.','absoluteHeightCertified':False}}
 additions.append({'uid':spec['uid'],'option':option})
payload=json.dumps(additions,ensure_ascii=False,separators=(',',':'))
script='''/* Native nonhuman chassis repairs and original two-unit Double Tripod disguise. */
(function(root){'use strict';
 const additions=PAYLOAD;
 const clone=x=>JSON.parse(JSON.stringify(x));
 function install(){
  const foundation=root.CQC_PASS19_COSTUMES,renderer=root.CQC_COMBAT_SPRITES,old=root.CQC_COMBAT_COSTUME_CATALOG;
  if(!foundation||!renderer||!old)return{accepted:0,pending:true,reason:'costume-runtime-not-ready'};
  const available=additions.filter(a=>root.CQC_PASS19_COSTUME_REQUEST_DATA?.entries?.[a.uid]||old.entries?.[a.uid]),pendingUIDs=additions.filter(a=>!available.includes(a)).map(a=>a.uid);
  if(!available.length)return{accepted:0,pending:true,pendingUIDs,reason:'available-roster-not-ready'};
  if(available.every(a=>foundation.optionFor(a.uid,a.option.id)?.sprite?.pass20Revision==='native-mechanical-v1'))return{accepted:0,alreadyInstalled:true,pendingUIDs};
  const filtered={...old,entries:{...old.entries}};
  for(const a of available){const row=old.entries[a.uid]||{default:'original',options:[{id:'original',label:'Tenue d’origine'}]},previous=row.options.find(o=>o.id===a.option.id);if(previous&&previous.sprite?.pass20Revision!=='native-mechanical-v1'&&!previous.sprite?.actions?.idle?.frames?.[0]?.file?.includes('/combat-costumes-pass19/'))throw Error('Existing alternative outside guarded PASS19 repair: '+a.uid+':'+a.option.id);filtered.entries[a.uid]={...row,options:row.options.filter(o=>o.id!==a.option.id)};}
  root.CQC_COMBAT_COSTUME_CATALOG=filtered;
  try{for(const a of available)foundation.validateOption(a.uid,a.option);}finally{root.CQC_COMBAT_COSTUME_CATALOG=old;}
  const entries={...filtered.entries};for(const a of available)entries[a.uid]={...entries[a.uid],options:[...entries[a.uid].options,clone(a.option)]};
  const candidate={...old,entries};let result;
  try{result=renderer.configureCostumes(candidate);if(result.rejected.length)throw Error('Mechanical costume transaction rejected: '+JSON.stringify(result.rejected));}catch(error){renderer.configureCostumes(old);throw error;}
  root.CQC_COMBAT_COSTUME_CATALOG=candidate;
  for(const a of available){root.CQC_PASS19_COSTUME_HEIGHTS||={};root.CQC_PASS19_COSTUME_HEIGHTS[a.uid]={...(root.CQC_PASS19_COSTUME_HEIGHTS[a.uid]||{}),[a.option.id]:clone(a.option.physicalExtent)};}
  foundation.installChoices();api.result={accepted:available.length,rejected:[],pendingUIDs,preservedOriginalUIDs:available.map(a=>a.uid),physicalFigures:available.reduce((n,a)=>n+a.option.assetReview.physicalPoseCount,0),mappedPhysicalFigures:available.reduce((n,a)=>n+a.option.assetReview.mappedPhysicalPoseCount,0)};return api.result;
 }
 const api=root.CQC_PASS20_MECHANICAL_COSTUMES={version:'pass20-mechanical-costumes/1',additions,install,scope:'Original chassis replacements preserve costume IDs and source archives. Trenchcoat belongs only to the same two-unit MGR incarnation, original design; canonical wardrobe remains open.'};
 api.result=install();
})(globalThis);
'''.replace('PAYLOAD',payload)
(APP/'src/cqc-pass20-mechanical-costumes.js').write_text(script)
(OUT/'MECHANICAL_NATIVE_SOURCES_ACTUAL_V1.json').write_text(json.dumps({'schema':'cqc.pass20.native-mechanical-sources/1','at':at,'sourcePixelsEdited':False,'sources':sources,'runtimeUniqueBytes':sum(r['bytes']for r in sources),'physicalFigures':96,'mappedPhysicalFigures':95,'excludedPhysicalCells':[{'uid':'core__ocelot_mgs1','side':'left','cell':2,'reason':'Elevated turret points wrong direction; original bytes retained but not registered.'}],'heightLimits':'Mechas preserve original design heights3.4/3.2m; Double Tripod body estimate1.55m retained; no absolute canonical certification.'},indent=2,ensure_ascii=False))
(OUT/'MECHANICAL_NATIVE_FRAME_GEOMETRY_ACTUAL_V1.json').write_text(json.dumps({'schema':'cqc.pass20.native-mechanical-frame-geometry/1','frames':geometry,'spritePixelsEdited':False},indent=2))
(OUT/'MECHANICAL_NATIVE_ATTACHMENT_SOCKETS_ACTUAL_V1.json').write_text(json.dumps({'schema':'cqc.pass20.native-costume-sockets/1','anchors':nativeAnchors,'sourceSpace':'native-pixels; display-scale only, world scale is applied once by existing spatial adapter'},indent=2))
(OUT/'MECHANICAL_ADDITIONS_SOURCE_ACTUAL_V1.json').write_text(json.dumps(additions,ensure_ascii=False,separators=(',',':')))
print(json.dumps({'sources':len(sources),'physicalFigures':96,'mapped':95,'bytes':sum(r['bytes']for r in sources),'moduleBytes':len(script.encode()),'anchors':len(nativeAnchors),'runtimeModule':str(APP/'src/cqc-pass20-mechanical-costumes.js')}))
