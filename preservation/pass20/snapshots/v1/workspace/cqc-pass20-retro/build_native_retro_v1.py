"""Read-only PNG measurements and native runtime metadata; never re-encode source art."""
import os, json, hashlib, datetime, runpy
from pathlib import Path
import numpy as np
from PIL import Image
from scipy import ndimage

ROOT=Path('/workspace/cqc-pass20-retro')
APP=Path('/tmp/cqc-pass19-application/public/cqc')
NOW=datetime.datetime.now(datetime.timezone.utc).isoformat()
FUNCTIONS=runpy.run_path('/workspace/cqc-pass19-tuxedo-history/preserved-evidence/refine_native_component_contours_v4.py')
outer_contour=FUNCTIONS['outer_contour']; inside_nonzero=FUNCTIONS['inside_nonzero']
specs=[
 ('core__meryl_mgs1','Meryl · Shadow Moses', 'exec-57b31ea5-4819-413b-bdff-74682c2618ed.png','exec-725b6f37-276c-4ffd-92f5-945b0bfec616.png'),
 ('core__solid','Solid Snake · Shadow Moses','exec-771160fa-add7-4ea5-8d76-989af58363f9.png','exec-72549f07-94ea-4379-89bc-69f98c6afde4.png'),
 ('core__raiden_mgs4','Raiden · Guns of the Patriots','exec-c6d386c7-d790-45bb-8d9b-a36f77a216c2.png','exec-9a4ca2a8-d2d9-4acd-b346-ab0e098f040e.png'),
 ('core__venom','Venom Snake · The Phantom Pain','exec-fcf35e9a-bc87-4262-8cd6-514e41c8a349.png','exec-eeafbd82-0e4b-4ded-a57c-a1d883d188c7.png'),
]
s=(APP/'src/cqc-sprite-catalog.js').read_text(); original=json.loads(s[s.index('= ')+2:].rstrip(';\n'))['entries']
poses=['idle-a','idle-b','walk-a','walk-b','guard','crouch','punch-or-thrust','low-kick','jump','shoot-or-cut-a','shoot-or-cut-b','reload-or-blade-ready','hit','recover-kneeling','ko','grapple']
additions=[]; assets=[]; geometry=[]
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def action(frames, indices, fps=8, loop=False):return {'fps':fps,'loop':loop,'frames':[frames[n] for n in indices]}
def measure(uid,side,source):
 p=Path('/workspace/generated_images')/source; before=sha(p); im=Image.open(p); rgba=np.asarray(im); labels,n=ndimage.label(rgba[:,:,3]>=16)
 counts=np.bincount(labels.ravel()); ids=[i for i in np.where(counts>2000)[0] if i]
 assert len(ids)==16,(source,len(ids))
 bounds=[]
 for i in ids:
  y,x=np.nonzero(labels==i);bounds.append({'id':int(i),'x':int(x.min()),'y':int(y.min()),'w':int(x.max()-x.min()+1),'h':int(y.max()-y.min()+1),'cx':float(x.mean()),'cy':float(y.mean())})
 # Generators produce uneven grid margins. Native component ordering is grouped
 # by four horizontal rows, then x centre; all individual crops are measured.
 bounds=sorted(bounds,key=lambda q:q['cy']);ordered=[]
 for row in range(4):ordered.extend(sorted(bounds[4*row:4*row+4],key=lambda q:q['cx']))
 file=f'assets/combat-costumes-pass20/{uid}/retro-msx/{side}-v1.png'
 dest=APP/file;dest.parent.mkdir(parents=True,exist_ok=True)
 if dest.exists():assert sha(dest)==before
 else:
  try:os.link(p,dest)
  except OSError:dest.write_bytes(p.read_bytes())
 assert sha(dest)==before
 frames=[]; rows=[]
 for idx,b in enumerate(ordered):
  x,y,w,h=b['x'],b['y'],b['w'],b['h'];region=labels[y:y+h,x:x+w];mask=region==b['id'];fy,fx=np.nonzero((region!=0)&(region!=b['id'])); foreign_points=np.column_stack((fx+.5,fy+.5))
  for epsilon in [1.,.75,.5,.35,.25,0]:
   contour=outer_contour(mask,epsilon);foreign=int(inside_nonzero(contour,foreign_points).sum())
   if foreign==0:break
  assert foreign==0
  polygon=[[round(px/w,7),round(py/h,7)]for px,py in contour]
  # Lower torso/pelvis median, not the overall atlas-cell centre or extended hand.
  py,px=np.nonzero(mask[int(h*.47):max(int(h*.65),int(h*.47)+1)])
  rootx=float(np.median(px)+.5) if len(px) else w*.5
  pivot=[round(min(1,max(0,rootx/w)),8),1.0]
  frame={'file':file,'sha256':before,'rect':[x,y,w,h],'pivot':pivot,'clipPolygon':polygon}
  frames.append(frame);rows.append({'physicalPoseIndex':idx,'pose':poses[idx],'componentID':b['id'],'rect':[x,y,w,h],'pivot':pivot,'alpha16Pixels':int(mask.sum()),'foreignAlpha16InsideClip':foreign,'clipVertices':len(polygon),'simplificationTolerance':epsilon})
 height=(ordered[0]['h']+ordered[1]['h'])/2
 assert sha(p)==before==sha(dest)
 a=rgba[:,:,3];rgb=rgba[:,:,:3][a>=240]
 assets.append({'uid':uid,'side':side,'source':str(p),'destinationRelativeToCQC':file,'sha256':before,'bytes':p.stat().st_size,'width':im.width,'height':im.height,'sourceStandingHeight':height,'physicalPoseCount':16,'physicalPNGByteIdentityPreserved':True})
 geometry.append({'uid':uid,'side':side,'file':file,'sourceSHA256':before,'sourceStandingHeight':height,'poses':rows,'opaqueColorCount':len(np.unique(rgb,axis=0)),'alphaValueCount':len(np.unique(a)),'hardware16ColorPaletteCertified':False})
 return frames,file,height
for uid,label,r,l in specs:
 groups={}; heights={}
 for side,src in [('right',r),('left',l)]:
  f,file,height=measure(uid,side,src);heights[file]=height;sword=uid=='core__raiden_mgs4'
  groups[side]={
   'idle':action(f,[0,1],4,True),'walk':action(f,[2,3],8,True),'guard':action(f,[4],0,True),
   'crouch':action(f,[5],0,True),'punch':action(f,[0,6,0],9),'heavy':action(f,[4,10,4] if sword else [0,6,0],8),
   'low':action(f,[5,7,5],8),'jump':action(f,[8],0,True),
   'shoot':action(f,[9,9] if uid=='core__meryl_mgs1' and side=='right' else [9,10],10),
   'reload':action(f,[11],0),'hit':action(f,[12],0),'recover':action(f,[13],0),'ko':action(f,[14],0),
   'throw':action(f,[0,15,0],8),'deploy':action(f,[5,11,5],8),'attack':action(f,[0,6,0],9),
   'blade':action(f,[4,9,10,4],8) if sword else action(f,[0,6,0],8),
   'roll':action(f,[8,13],6),'charge':action(f,[4],0,True),'optic':action(f,[4],0,True),
  }
 base=original[uid];sources=[{'url':x['url'],'scope':'Exact original incarnation identity/clothing context; freshly illustrated MSX-inspired rendering is an original adaptation.'}for x in base['review']['sources'] if x.get('url','').startswith('https://')][:4]
 limits=[
  'New native low-resolution sprite drawings in a MSX2-inspired style. No image downsampling, pixel-removal filter, procedural pixelArt shader or reuse of an original actor PNG is involved.',
  'This style reinterpretation is original art, not a costume shipped by the publisher and not a 1:1 extraction of an original MSX game sprite. The character stays in the exact original listed incarnation.',
  'Square pixel clusters and reduced material shading are visible in the actual drawings. Generator output retains antialias fringe and more than sixteen native RGB colors; actual MSX palette/hardware restrictions are not certified.',
  'Sixteen physical poses per anatomical facing, all inspected. Native two-facing PNG bytes are immutable. Read-only alpha16 vector contours exclude neighboring figures without editing source pixels.',
  'Limited combat keys share sixteen authored body poses; grenade, grappling and exceptional move equipment keyframes are not all separately drawn. Engine move timing, damage, projectiles, identity and scale are unchanged.',
  'Source standing height is measured from the two native idle figures per direction and kept fixed across poses. Feet/pelvis pivots are measured per figure; this is not original animation motion capture.',
 ]
 if uid=='core__meryl_mgs1':limits.append('Right cell10 contains an authored muzzle flash and is retained physically but deliberately unused in runtime; its shooting action repeats the clean aim cell9 to avoid doubling gameplay VFX.')
 if uid=='core__venom':limits.append('Final original Steam capture supports anatomical RIGHT eyepatch and horn and anatomical LEFT red forearm. Three-quarter views simplify distant eye visibility; no later cyborg or alternative Snake incarnation is substituted.')
 sprite={'uid':uid,'name':base['name'],'game':base['game'],'incarnation':base.get('incarnation',label),'coverage':'action-frames','displayHeight':base['displayHeight'],'baseFrameHeight':heights[next(iter(heights))],'sourceFrameHeights':heights,'facing':1,'mirror':False,'fallbackMissingActions':True,'renderStyle':'pixel','actionMap':base['actionMap'],'phaseMap':{k:{'startup':[0],'active':[1],'recovery':[2]}for k in ['punch','heavy','low','throw','deploy','attack']},'actions':groups['right'],'oppositeActions':groups['left'],'costumeConcept':{'schema':'cqc.costume-design/1','sourceUID':uid,'family':'retro','originalDesign':True,'canonicalAppearanceAttested':False},'review':{'status':'approved','reviewer':'pass20-native-retro/128-physical-pose-and-original-incarnation-reference-review','reviewedAt':NOW,'sourceKind':'original-character','sources':sources,'checks':{k:True for k in ['identity','costume','equipment','anatomicalSides','singleFigure','transparentBackground']},'limits':limits}}
 option={'id':'retro-msx','family':'retro','label':'Archives · MSX','sprite':sprite,'provenance':{'kind':'style-reinterpretation','sourceUID':uid,'originalDesign':True,'canonicalAppearanceAttested':False,'sources':sources,'qualification':'Fresh independent pixel-cluster character art of this precise incarnation. No age change, body substitution or derived pixel shader.'},'assetReview':{'status':'verified','independentArt':True,'reviewer':'pass20-native-retro/physical-native-art-and-read-only-source-geometry','reviewedAt':NOW,'physicalPoseCount':32,'mappedPhysicalPoseCount':31 if uid=='core__meryl_mgs1' else 32,'allDirectionsReviewed':True,'nativePNGByteIdentityPreserved':True,'sameIncarnationUID':True,'hardwarePaletteCertified':False},'validationScope':'Physically inspected native illustrations and bounded renderer metadata; actual match integration verified separately.'}
 additions.append({'uid':uid,'option':option})
out=APP/'src/cqc-pass20-native-retro-costumes.js'
# One physical frame table per atlas. Reuse metadata references between actions,
# rather than serializing every contour once for each action that uses it.
compact=[]
for addition in additions:
 option=addition['option'];sprite=option['sprite'];routes={};frames={}
 for group in ['actions','oppositeActions']:
  frames[group]=[];routes[group]={};indices={}
  for name,act in sprite[group].items():
   route=[]
   for frame in act['frames']:
    key=json.dumps(frame['rect'])
    if key not in indices:indices[key]=len(frames[group]);frames[group].append(frame)
    route.append(indices[key])
   routes[group][name]={'fps':act['fps'],'loop':act['loop'],'indices':route}
  del sprite[group]
 compact.append({'uid':addition['uid'],'option':option,'frames':frames,'routes':routes})
source="/* Newly drawn native MSX-inspired costume bodies; immutable source PNGs, exact incarnation UIDs. */\n(function(root){'use strict';const data="+json.dumps(compact,ensure_ascii=False,separators=(',',':'))+";const additions=data.map(({uid,option,frames,routes})=>{for(const group of ['actions','oppositeActions'])option.sprite[group]=Object.fromEntries(Object.entries(routes[group]).map(([name,route])=>[name,{fps:route.fps,loop:route.loop,frames:route.indices.map(index=>frames[group][index])}]));return{uid,option};});if(!root.CQC_PASS19_COSTUMES?.registerBatch)throw Error('Native costume registration system must load first');root.CQC_PASS20_NATIVE_RETRO_REGISTRATION=root.CQC_PASS19_COSTUMES.registerBatch(additions);})(globalThis);\n"
if out.exists():
 prior=ROOT/'prior-source/cqc-pass20-native-retro-costumes-expanded-v1.js';prior.parent.mkdir(exist_ok=True)
 if not prior.exists():
  try:os.link(out,prior)
  except OSError:prior.write_bytes(out.read_bytes())
 tmp=out.with_suffix('.js.native-retro-tmp');tmp.write_text(source);os.replace(tmp,out)
else:out.write_text(source)
proof={'schema':'cqc.pass20.native-retro-original-art/1','status':'physical-art-and-native-geometry-verified; actual-browser-integration-pending','createdAt':NOW,'nativeCostumes':4,'nativePNGFiles':8,'physicalFigureCount':128,'mappedFigureCount':127,'allSourcePNGBytesUnchanged':True,'assets':assets,'geometry':geometry,'module':{'path':str(out),'destinationRelativeToCQC':str(out.relative_to(APP)),'sha256':sha(out),'bytes':out.stat().st_size},'rejectedSources':[{'source':'/workspace/generated_images/exec-9750fe83-f88c-4ee0-ba8d-2b604b178121.png','sha256':sha(Path('/workspace/generated_images/exec-9750fe83-f88c-4ee0-ba8d-2b604b178121.png')),'reason':'Raiden first attempt retained rejected: overly textured/paint-like figure construction, insufficient simple native pixel clusters.'}]}
(ROOT/'NATIVE_RETRO_ART_AND_GEOMETRY_ACTUAL_V2.json').write_text(json.dumps(proof,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'module':str(out),'moduleSHA256':sha(out),'moduleBytes':out.stat().st_size,'assets':len(assets),'nativeBytes':sum(a['bytes']for a in assets),'physicalFigures':128,'mappedFigures':127,'proof':str(ROOT/'NATIVE_RETRO_ART_AND_GEOMETRY_ACTUAL_V2.json')}))
