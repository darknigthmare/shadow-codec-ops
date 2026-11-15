"""Measure explicitly owned native PNG pixels; output remains unapproved evidence.

The ownership book must enumerate every alpha component. No component is silently
dropped or assigned by a nearest-neighbour heuristic. Only JSON geometry is made.
"""
import argparse, gzip, hashlib, importlib.util, json, sys
from pathlib import Path
sys.dont_write_bytecode=True
import numpy as np
from PIL import Image
from scipy.ndimage import label, find_objects

module_path=Path(__file__).parent/'recovered-p39/integration/native_geometry.py'
if hashlib.sha256(module_path.read_bytes()).hexdigest()!='93b8d1d382bb84ba3dca9f927928cabb6660cb36c0a395d1c7fffe9c99a2561b':raise SystemExit('Restored geometry helper differs')
spec=importlib.util.spec_from_file_location('p39_native_geometry',module_path)
geometry=importlib.util.module_from_spec(spec);spec.loader.exec_module(geometry)
parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('book',type=Path);parser.add_argument('--output',type=Path,required=True);args=parser.parse_args()
raw_book=args.book.read_bytes();book=json.loads(raw_book)
if book.get('schema')!='cqc.p40.explicit-source-ownership-candidate/1' or book.get('approved') is not False:raise SystemExit('An explicitly unapproved ownership book is required')
results=[]
for source in book['sources']:
 path=Path(source['path'])
 if path.is_symlink() or not path.is_file():raise SystemExit('Regular source required')
 raw=path.read_bytes()
 if len(raw)!=source['bytes'] or hashlib.sha256(raw).hexdigest()!=source['sha256']:raise SystemExit('Source pin mismatch')
 with Image.open(path) as image:
  if image.mode!='RGBA' or list(image.size)!=source['dimensions']:raise SystemExit('Native RGBA/dimensions mismatch')
  alpha=np.asarray(image.getchannel('A'));labels,_=label(alpha>16,np.ones((3,3),dtype=np.int8));component_ids={i for i,region in enumerate(find_objects(labels),1)if region is not None}
  owners={};pose_results=[]
  for pose in source['poses']:
   ids=pose['componentIDs']
   if not ids or len(ids)!=len(set(ids)) or any(i not in component_ids or i in owners for i in ids):raise SystemExit('Missing, repeated, or conflicting component ownership')
   for component_id in ids:owners[component_id]=pose['name']
  if set(owners)!=component_ids:raise SystemExit('Every opaque component must be explicitly owned')
  for pose in source['poses']:
   mask=np.isin(labels,pose['componentIDs']);ys,xs=np.nonzero(mask)
   if not len(xs):raise SystemExit('Empty pose')
   x0=max(0,int(xs.min())-2);x1=min(image.width,int(xs.max())+3);y0=max(0,int(ys.min())-2);y1=min(image.height,int(ys.max())+3)
   local=mask[y0:y1,x0:x1];polygon,loop_count=geometry.polygon_for_mask(local)
   normalized=[[round(x/(x1-x0),9),round(y/(y1-y0),9)]for x,y in polygon]
   restored=[[x*(x1-x0),y*(y1-y0)]for x,y in normalized];kept=geometry.contained_mask(restored,local.shape)
   own_lost=int((local&~kept).sum());foreign=int(((labels[y0:y1,x0:x1]>0)&~local&kept).sum())
   if own_lost or foreign:raise SystemExit('Rounded contour ownership coverage failed')
   edge=int(mask[0].sum()+mask[-1].sum()+mask[:,0].sum()+mask[:,-1].sum())
   ground=int(ys.max())+1;bottom_x=xs[ys>=ground-max(3,min(8,round((ys.max()-ys.min()+1)*.02)))];contact=float(np.mean(bottom_x))+.5
   pose_results.append({**pose,'rect':[x0,y0,x1-x0,y1-y0],'nativeAlphaBounds':[int(xs.min()),int(ys.min()),int(xs.max()-xs.min()+1),int(ys.max()-ys.min()+1)],'clipPolygon':normalized,'contourLoops':loop_count,'ownAlphaAbove16Pixels':int(mask.sum()),'ownPixelsLost':own_lost,'foreignPixelsKept':foreign,'opaqueCanvasEdgePixels':edge,'sourcePNGUnchanged':True,'candidateGroundY':ground,'candidateContactX':contact,'candidatePivot':[(contact-x0)/(x1-x0),(ground-y0)/(y1-y0)],'framingApproved':False})
  results.append({'path':str(path),'bytes':len(raw),'sha256':source['sha256'],'dimensions':list(image.size),'poses':pose_results,'allOpaqueComponentsExplicitlyAssigned':True})
 if path.read_bytes()!=raw:raise SystemExit('Source changed during read')
report={'schema':'cqc.p40.native-source-geometry-candidate/1','ownershipBookSHA256':hashlib.sha256(raw_book).hexdigest(),'approved':False,'runtimeAdmitted':False,'sourcePNGMutations':False,'canvasNonzeroPixelCentreCoverageChecked':True,'sources':results,'limits':['Exact component isolation does not approve anatomy, costume identity, action fidelity, framing, native weapon points, or actual game loading.','Candidate contact points and native height calibrations require physical review. Held drawings must never be registered by a runtime compiler.']}
encoded=(json.dumps(report,separators=(',',':'))+'\n').encode();args.output.parent.mkdir(parents=True,exist_ok=True)
if args.output.suffix=='.gz':
 with args.output.open('wb') as f:
  with gzip.GzipFile(filename='',fileobj=f,mode='wb',mtime=0) as gz:gz.write(encoded)
else:args.output.write_bytes(encoded)
print(json.dumps({'output':str(args.output),'storedBytes':args.output.stat().st_size,'storedSHA256':hashlib.sha256(args.output.read_bytes()).hexdigest(),'decodedBytes':len(encoded),'decodedSHA256':hashlib.sha256(encoded).hexdigest(),'sources':len(results),'ownedDrawings':sum(len(s['poses'])for s in results),'runtimeAdmitted':False}))
