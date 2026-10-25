"""Read unmodified PNG alpha components. This is evidence, never an art approval.

No nearest-neighbour attribution or raster changes are performed. Disconnected
equipment and effects must be explicitly assigned after physical inspection.
"""
import argparse, hashlib, json, struct
from pathlib import Path
import numpy as np
from PIL import Image
from scipy.ndimage import label, find_objects

parser=argparse.ArgumentParser(description=__doc__)
parser.add_argument('source',type=Path)
parser.add_argument('--output',type=Path,required=True)
parser.add_argument('--threshold',type=int,default=16)
args=parser.parse_args()
path=args.source
if path.is_symlink() or not path.is_file():raise SystemExit('A regular native source is required')
raw=path.read_bytes()
if raw[:8]!=b'\x89PNG\r\n\x1a\n':raise SystemExit('PNG signature absent')
if not 0<=args.threshold<=254:raise SystemExit('Invalid alpha threshold')
with Image.open(path) as im:
 if im.mode!='RGBA':raise SystemExit('Native transparent RGBA PNG required; no conversion is made')
 width,height=im.size;alpha=np.asarray(im.getchannel('A'));labels,n=label(alpha>args.threshold,np.ones((3,3),dtype=np.int8))
 components=[]
 for component_id,region in enumerate(find_objects(labels),1):
  if region is None:continue
  yy,xx=region;mask=labels[region]==component_id;pixels=int(mask.sum());x,y=int(xx.start),int(yy.start);w,h=int(xx.stop-x),int(yy.stop-y)
  components.append({'id':component_id,'pixels':pixels,'bounds':[x,y,w,h],'opaqueCanvasEdgePixels':int(((labels[0]==component_id).sum()+(labels[-1]==component_id).sum()+(labels[:,0]==component_id).sum()+(labels[:,-1]==component_id).sum()))})
 report={'schema':'cqc.p40.native-alpha-inspection/1','source':str(path.resolve()),'bytes':len(raw),'sha256':hashlib.sha256(raw).hexdigest(),'width':width,'height':height,'alphaThreshold':args.threshold,'rasterModified':False,'sourceArtApproved':False,'runtimeAdmitted':False,'components':components,'largeComponents':sorted([c for c in components if c['pixels']>=1000],key=lambda c:(c['bounds'][1]+c['bounds'][3]/2,c['bounds'][0])),'limits':['Component counts do not prove anatomical completeness, correct facing, identity, equipment, or independently drawn action phases.','No small fragment belongs to an actor until an explicit physically reviewed ownership book assigns it.']}
args.output.parent.mkdir(parents=True,exist_ok=True);encoded=(json.dumps(report,indent=2)+'\n').encode();args.output.write_bytes(encoded)
if path.read_bytes()!=raw:raise SystemExit('Source changed during read')
print(json.dumps({'output':str(args.output),'bytes':len(encoded),'sha256':hashlib.sha256(encoded).hexdigest(),'components':len(components),'largeComponents':len(report['largeComponents']),'opaqueCanvasEdgePixels':sum(c['opaqueCanvasEdgePixels']for c in components),'sourceUnchanged':True}))
