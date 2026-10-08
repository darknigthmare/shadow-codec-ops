#!/usr/bin/env python3
"""Generic read-only atlas geometry for individually generated original costumes.
Never changes PNG pixels and never marks a candidate as reviewed automatically.
"""
import argparse,copy,datetime,hashlib,json,math,os
from pathlib import Path
import numpy as np
from PIL import Image
from scipy import ndimage
from scipy.optimize import linear_sum_assignment
from scipy.spatial import ConvexHull
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def write_new(path,obj):
 if path.exists() or path.is_symlink():raise FileExistsError(path)
 path.parent.mkdir(parents=True,exist_ok=True)
 pending=path.with_name(path.name+'.pending')
 with pending.open('x',encoding='utf-8')as f:
  f.write(json.dumps(obj,ensure_ascii=False,indent=2)+'\n');f.flush();os.fsync(f.fileno())
 pending.rename(path);os.chmod(path,0o400)
def source_frames(entry):
 result={}
 for group in [entry['actions'],entry['oppositeActions']]:
  for action in group.values():
   for f in action['frames']:result.setdefault(f['file'],{}).setdefault(tuple(f['rect']),f)
 return result
def analyse(path):
 with Image.open(path)as im:
  if im.mode!='RGBA':raise ValueError('RGBA native source required: '+str(path))
  size=im.size;alpha=np.array(im.getchannel('A'))
 labels,_=ndimage.label(alpha>=16);bodies=[]
 for index,bounds in enumerate(ndimage.find_objects(labels),1):
  if bounds is None:continue
  count=int((labels[bounds]==index).sum())
  if count<1000:continue
  y,x=bounds;bodies.append({'component':index,'alpha16Pixels':count,'rect':[x.start,y.start,x.stop-x.start,y.stop-y.start]})
 return size,labels,bodies
def main():
 ap=argparse.ArgumentParser();ap.add_argument('--root',required=True);ap.add_argument('--source-root',default='/tmp/cqc-pass18-runtime')
 ap.add_argument('--entry',required=True);ap.add_argument('--design',required=True);ap.add_argument('--run-label',required=True)
 ap.add_argument('--allow-incomplete',action='store_true');args=ap.parse_args()
 root=Path(args.root);source_root=Path(args.source_root);entry_path=Path(args.entry);design_path=Path(args.design)
 entry=json.loads(entry_path.read_text());design=json.loads(design_path.read_text());uid=entry['uid'];family=design['family']
 if family not in ['cyborg','survive','metalgear','tuxedo']:raise ValueError('Original families only; style/canonical adaptations use separate provenance workflows.')
 if design['sourceUID']!=uid or design.get('canonicalAppearanceAttested')is not False or design.get('originalDesign')is not True:raise ValueError('Explicit original noncanonical design required.')
 if not entry.get('oppositeActions')or entry.get('mirror')is True:raise ValueError('Both independent source directions required.')
 files=source_frames(entry);replacements=design.get('sourceAtlasReplacements',{});leafs=[replacements.get(file,Path(file).name) for file in files]
 if any(Path(leaf).name!=leaf or not leaf.endswith('.png')for leaf in leafs):raise ValueError('Safe explicit native PNG leaf filenames required.')
 if len(leafs)!=len(set(leafs)):raise ValueError('Colliding leaf filenames need explicit target mapping.')
 generation=root/'generation'/uid/family
 missing=[leaf for leaf in leafs if not (generation/leaf).is_file()]
 if missing and not args.allow_incomplete:raise FileNotFoundError('Missing full native action atlas files: '+', '.join(missing))
 mappings={};proofs=[];heights={}
 for file,source in files.items():
  old=list(source.values());native=generation/replacements.get(file,Path(file).name)
  if not native.is_file():continue
  source_png=source_root/file
  with Image.open(source_png)as im:old_size=im.size
  size,labels,bodies=analyse(native)
  # Count intentionally fails on unrelated extra figures/disconnected major anatomy; manual source review/retry is required.
  if len(bodies)!=len(old):raise ValueError('Expected '+str(len(old))+' disjoint native body poses, got '+str(len(bodies))+': '+str(native))
  costs=np.zeros((len(old),len(bodies)))
  for i,frame in enumerate(old):
   x,y,w,h=frame['rect'];cx=(x+w/2)/old_size[0];cy=(y+h/2)/old_size[1]
   for j,body in enumerate(bodies):
    bx,by,bw,bh=body['rect'];costs[i,j]=math.hypot(cx-(bx+bw/2)/size[0],cy-(by+bh/2)/size[1])
  rows,columns=linear_sum_assignment(costs)
  if len(rows)!=len(old)or float(costs[rows,columns].max())>.08:raise ValueError('Unreviewed pose layout drift: '+str(native))
  runtime_file='assets/combat-costumes-pass19/'+uid+'/'+family+'/'+native.name;native_sha=sha(native);poses=[]
  for i,j in zip(rows,columns):
   source_frame=old[int(i)];body=bodies[int(j)];x,y,w,h=body['rect']
   rect=[max(0,x-2),max(0,y-2),min(size[0],x+w+2)-max(0,x-2),min(size[1],y+h+2)-max(0,y-2)]
   ox,oy,ow,oh=source_frame['rect'];anchor_x=x+w/2+(ow*source_frame['pivot'][0]-ow/2)*size[0]/old_size[0];anchor_y=min(size[1]-1,y+h-1)
   pivot=[round(min(1,max(0,(anchor_x-rect[0])/rect[2])),8),round((anchor_y-rect[1])/rect[3],8)]
   ys,xs=np.nonzero(labels==body['component']);points=np.column_stack((xs,ys));hull=ConvexHull(points);polygon=[]
   for vx,vy in points[hull.vertices]:
    dx=vx-(x+w/2);dy=vy-(y+h/2);distance=max(1,math.hypot(dx,dy))
    vx=min(rect[0]+rect[2],max(rect[0],vx+2*dx/distance));vy=min(rect[1]+rect[3],max(rect[1],vy+2*dy/distance))
    polygon.append([round((vx-rect[0])/rect[2],7),round((vy-rect[1])/rect[3],7)])
   replacement={'file':runtime_file,'sha256':native_sha,'rect':rect,'pivot':pivot,'clipPolygon':polygon}
   mappings[(file,tuple(source_frame['rect']))]=replacement
   poses.append({'physicalPoseIndex':int(i),'sourceRect':source_frame['rect'],'nativeRect':rect,'pivot':pivot,
    'alpha16Pixels':body['alpha16Pixels'],'sourceCentreAssignmentDistance':float(costs[i,j])})
  old_height=entry.get('sourceFrameHeights',{}).get(file,entry.get('baseFrameHeight',old[0]['rect'][3]))
  heights[runtime_file]=old_height*size[1]/old_size[1]
  proofs.append({'sourceFile':file,'sourcePNG':str(source_png),'sourceSHA256':sha(source_png),'nativePNG':str(native),
    'nativeRuntimeFile':runtime_file,'nativeSHA256':native_sha,'nativeBytes':native.stat().st_size,
    'sourceDimensions':list(old_size),'nativeDimensions':list(size),'physicalPoseCount':len(poses),'poses':poses})
 report={'schema':'cqc.pass19.original-costume-native-geometry/2','uid':uid,'family':family,
 'createdAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'sourceEntrySHA256':sha(entry_path),'designSHA256':sha(design_path),
 'complete':not missing,'missingAtlases':missing,'sourceUniquePhysicalFrames':sum(len(v)for v in files.values()),
 'measuredUniquePhysicalFrames':sum(a['physicalPoseCount']for a in proofs),'pngPixelsTransformed':False,'atlases':proofs,
 'runtimeCostumeRegistered':False,'geometryScope':'Read-only alpha16 main bodies, source-normalized assignment, body-relative translated anatomical pivots and vector convex-hull clipping. Floating effects/equipment require physical source review; geometry does not certify canonical appearance, match action timing, physics or weapon origins.'}
 write_new(root/'reviews'/('geometry-'+uid+'-'+family+'-'+args.run_label+'.json'),report)
 if missing:print(json.dumps({'geometryOnly':True,'missingAtlases':missing}));return
 sprite=copy.deepcopy(entry);sprite['incarnation']=design['incarnation'];sprite['renderStyle']='painted'
 sprite['sourceFrameHeights']=heights;sprite['costumeConcept']={'schema':'cqc.costume-design/1','sourceUID':uid,'family':family,'originalDesign':True,'canonicalAppearanceAttested':False}
 if design.get('designedPhysicalHeightMetres')is not None:sprite['costumeConcept']['designedPhysicalHeightMetres']=design['designedPhysicalHeightMetres']
 for key in ['actions','oppositeActions']:
  for action in sprite[key].values():action['frames']=[copy.deepcopy(mappings[(f['file'],tuple(f['rect']))])for f in action['frames']]
 sources=[{'url':s['url'],'scope':'Source incarnation identity appearance only; this costume is an original design, not a released canonical costume.'}for s in entry['review'].get('sources',[])]
 checks={k:False for k in ['identity','costume','equipment','anatomicalSides','singleFigure','transparentBackground']}
 sprite['review']={'status':'pending-physical-review','reviewer':'pass19-authored-wardrobe','reviewedAt':None,
  'sourceKind':'original-character','sources':sources,'checks':checks,'limits':[
   'Original costume design has no attested released canonical appearance; absolute canonical 1:1 is not claimed.',
   'Native imagegen output bytes are preserved unchanged. Read-only source geometry is not pixel editing.',
   'All physical pose keys, original UID/actionMap/phaseMap remain inherited; this is not original-game animation extraction.',
   'A manual review and actual Canvas readiness/routing check must finish before runtime registration.',
  ]+entry['review'].get('limits',[])}
 option={'id':family,'label':design['label'],'sprite':sprite,
 'provenance':{'kind':'original-character-costume','sourceUID':uid,'originalDesign':True,'canonicalAppearanceAttested':False,'sources':sources},
 'assetReview':{'status':'pending','independentArt':True,'reviewer':'pass19-authored-wardrobe','reviewedAt':None}}
 write_new(root/('costume-'+uid+'-'+family+'-candidate-'+args.run_label+'.json'),option)
 print(json.dumps({'uid':uid,'family':family,'candidateOnly':True,'physicalPoseCount':report['measuredUniquePhysicalFrames'],'runtimeRegistered':False}))
if __name__=='__main__':main()

