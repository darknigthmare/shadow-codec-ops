#!/usr/bin/env python3
"""Read-only native costume geometry. Writes catalogue/evidence only; never changes PNG bytes."""
import argparse, copy, datetime, hashlib, json, math, os
from pathlib import Path
import numpy as np
from PIL import Image
from scipy import ndimage
from scipy.optimize import linear_sum_assignment
from scipy.spatial import ConvexHull

ROOT=Path('/tmp/cqc-pass19-authored-wardrobe')
BASE=Path('/tmp/cqc-pass18-runtime')
ALLOWED_LABELS=('a-right-v1','b-right-v1','c-right-v1','a-left-v1','b-left-v1','c-left-v1')
FAMILY_DESCRIPTIONS={
 'cyborg':'Original bespoke cyborg: navy tactical torso, blue-grey shoulder shells, dark muscle bundles, articulated actuators and calf pistons, reinforced boots; human face and navy bandana retained.',
}
def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()
def atomic_new(path,data):
 if path.exists() or path.is_symlink(): raise FileExistsError(path)
 path.parent.mkdir(parents=True,exist_ok=True)
 pending=path.with_name(path.name+'.pending')
 if pending.exists(): raise FileExistsError(pending)
 with pending.open('x',encoding='utf-8') as out:
  out.write(json.dumps(data,ensure_ascii=False,indent=2)+'\n');out.flush();os.fsync(out.fileno())
 pending.rename(path);os.chmod(path,0o400)
def unique_source_frames(entry,label):
 key='actions' if 'right' in label else 'oppositeActions'
 path='assets/combat-sprites/core__solid/'+label+'.png'
 frames={}
 for action in entry[key].values():
  for frame in action['frames']:
   if frame['file']==path: frames.setdefault(tuple(frame['rect']),frame)
 return sorted(frames.values(),key=lambda f:(f['rect'][1]//400,f['rect'][0]))
def components(path):
 with Image.open(path) as im:
  if im.mode!='RGBA': raise ValueError('Native RGBA required: '+str(path))
  size=im.size;alpha=np.array(im.getchannel('A'))
 labels,count=ndimage.label(alpha>=16)
 records=[]
 for index,bounds in enumerate(ndimage.find_objects(labels),1):
  if bounds is None: continue
  mask=labels[bounds]==index;pixels=int(mask.sum())
  if pixels<1000: continue
  y,x=bounds
  records.append({'label':index,'pixels':pixels,'rect':[x.start,y.start,x.stop-x.start,y.stop-y.start]})
 return size,alpha,labels,records
def main():
 parser=argparse.ArgumentParser()
 parser.add_argument('--family',default='cyborg',choices=list(FAMILY_DESCRIPTIONS))
 parser.add_argument('--run-label',required=True)
 parser.add_argument('--allow-incomplete',action='store_true',help='Geometry evidence only; never registers incomplete costume.')
 args=parser.parse_args()
 source=ROOT/'reviews/solid-original-entry-v1.json';entry=json.loads(source.read_text())
 target=ROOT/'generation/core__solid'/args.family
 missing=[label for label in ALLOWED_LABELS if not (target/(label+'.png')).is_file()]
 if missing and not args.allow_incomplete: raise FileNotFoundError('Cannot register incomplete costume: '+', '.join(missing))
 mappings={};proofs=[];fixed_heights={}
 for label in ALLOWED_LABELS:
  path=target/(label+'.png')
  if not path.is_file(): continue
  source_path=BASE/'assets/combat-sprites/core__solid'/(label+'.png')
  with Image.open(source_path) as im: source_dimensions=im.size
  size,alpha,labels,bodies=components(path)
  old=unique_source_frames(entry,label)
  if len(bodies)!=12 or len(old)!=12: raise ValueError('Exactly 12 disjoint native body poses required: '+label)
  # Assignment by source-normalized body centres allows small generative subpixel/edge variation.
  costs=np.zeros((12,12))
  for i,frame in enumerate(old):
   x,y,w,h=frame['rect'];cx=(x+w/2)/source_dimensions[0];cy=(y+h/2)/source_dimensions[1]
   for j,body in enumerate(bodies):
    bx,by,bw,bh=body['rect'];costs[i,j]=math.hypot(cx-(bx+bw/2)/size[0],cy-(by+bh/2)/size[1])
  rows,columns=linear_sum_assignment(costs)
  if len(rows)!=12 or float(costs[rows,columns].max())>.08: raise ValueError('Source pose assignment drifted: '+label)
  file='assets/combat-costumes-pass19/core__solid/'+args.family+'/'+label+'.png'
  png_sha=sha(path);poses=[]
  for i,j in zip(rows,columns):
   old_frame=old[int(i)];body=bodies[int(j)]
   x,y,w,h=body['rect']
   # Padding retains native soft silhouette edges. The vector hull excludes neighboring cell artwork.
   rect=[max(0,x-2),max(0,y-2),min(size[0],x+w+2)-max(0,x-2),min(size[1],y+h+2)-max(0,y-2)]
   ox,oy,ow,oh=old_frame['rect']
   anatomical_x=(ox+ow*old_frame['pivot'][0])*size[0]/source_dimensions[0]
   anchor_y=min(size[1]-1,y+h-1)
   pivot=[round(min(1,max(0,(anatomical_x-rect[0])/rect[2])),8),round((anchor_y-rect[1])/rect[3],8)]
   ys,xs=np.nonzero(labels==body['label'])
   points=np.column_stack((xs,ys))
   hull=ConvexHull(points);polygon=[]
   for vx,vy in points[hull.vertices]:
    # Hull enlarged radially by 2 pixels keeps anti-aliased edge, capped within source rectangle.
    cx=x+w/2;cy=y+h/2;dx=vx-cx;dy=vy-cy;length=max(1,math.hypot(dx,dy))
    vx=min(rect[0]+rect[2],max(rect[0],vx+2*dx/length));vy=min(rect[1]+rect[3],max(rect[1],vy+2*dy/length))
    polygon.append([round((vx-rect[0])/rect[2],7),round((vy-rect[1])/rect[3],7)])
   replacement={'file':file,'sha256':png_sha,'rect':rect,'pivot':pivot,'clipPolygon':polygon}
   mappings[(old_frame['file'],tuple(old_frame['rect']))]=replacement
   poses.append({'physicalPoseIndex':int(i),'sourceRect':old_frame['rect'],'nativeRect':rect,'pivot':pivot,
    'component':body['label'],'alpha16Pixels':body['pixels'],'sourceCentreAssignmentDistance':float(costs[i,j]),
    'sourceDimensions':list(source_dimensions),'nativeDimensions':list(size)})
  old_height=entry.get('sourceFrameHeights',{}).get('assets/combat-sprites/core__solid/'+label+'.png',entry.get('baseFrameHeight',360))
  fixed_heights[file]=old_height*size[1]/source_dimensions[1]
  proofs.append({'label':label,'path':str(path),'bytes':path.stat().st_size,'sha256':png_sha,
   'dimensions':list(size),'nativePhysicalPoses':12,'sourcePNG':str(source_path),'sourceSHA256':sha(source_path),
   'sourcePixelsTransformed':False,'geometryMethod':'Read-only alpha16 components; source-normalized assignment; vector convex hull clip',
   'qualification':'Main-body geometry only; floating muzzle flashes are not certified by this main-component hull. All weapon and flash frames require explicit physical visual review.',
   'poses':poses})
 report={'schema':'cqc.pass19.original-costume-geometry/1','uid':'core__solid','family':args.family,
 'createdAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'originalEntrySHA256':sha(source),
 'complete':not missing,'missingAtlases':missing,'nativePhysicalPoses':12*len(proofs),'pngPixelsTransformed':False,
 'runtimeCostumeRegistered':False,'atlases':proofs}
 atomic_new(ROOT/'reviews'/('geometry-'+args.family+'-'+args.run_label+'.json'),report)
 if missing: print(json.dumps({'geometryOnly':True,'missingAtlases':missing,'nativePoses':12*len(proofs)}));return
 costume=copy.deepcopy(entry)
 costume['incarnation']=FAMILY_DESCRIPTIONS[args.family]+' Original fan game costume, not a canonical released game incarnation.'
 costume['renderStyle']='painted';costume['sourceFrameHeights']=fixed_heights
 costume['costumeConcept']={'schema':'cqc.costume-design/1','sourceUID':'core__solid','family':args.family,
 'originalDesign':True,'canonicalAppearanceAttested':False}
 for key in ['actions','oppositeActions']:
  for action in costume[key].values():
   action['frames']=[copy.deepcopy(mappings[(frame['file'],tuple(frame['rect']))]) for frame in action['frames']]
 identity_sources=[{'url':s['url'],'scope':'Base Solid Snake MGS1 identity only; mechanical costume is an original design.'} for s in entry['review']['sources']]
 costume['review']={'status':'pending-physical-review','reviewer':'pass19-authored-wardrobe','reviewedAt':None,
 'sourceKind':'original-character','sources':identity_sources,'checks':{k:False for k in ['identity','costume','equipment','anatomicalSides','singleFigure','transparentBackground']},
 'limits':['This original cyborg costume has no canonical released appearance; absolute canonical 1:1 cannot be claimed.',
 'Native source atlases remain byte-exact imagegen outputs. Read-only vector geometry does not alter pixels.',
 'All source native actions, phase maps, body scale and fighter UID are inherited; this is not an original-game animation export.',
 'Geometry does not substitute for physical review of every direction, full body, gun handedness and floating weapon effects.']}
 option={'id':args.family,'label':'Cyborg','sprite':costume,
 'provenance':{'kind':'original-character-costume','sourceUID':'core__solid','originalDesign':True,
 'canonicalAppearanceAttested':False,'sources':identity_sources},
 'assetReview':{'status':'pending','independentArt':True,'reviewer':'pass19-authored-wardrobe','reviewedAt':None}}
 atomic_new(ROOT/('costume-'+args.family+'-candidate-'+args.run_label+'.json'),option)
 print(json.dumps({'candidateOnly':True,'nativePhysicalPoses':report['nativePhysicalPoses'],'runtimeRegistered':False}))
if __name__=='__main__': main()

