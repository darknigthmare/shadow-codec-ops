"""Read-only exact redundant-vertex preflight, no raster/geometry/job writes.

Only adjacent identical XY or axis-aligned strictly collinear between vertices
are removed, to stability. No epsilon, tolerance, rounding or quantization.
Both masks use the pinned original native_geometry.contained_mask unchanged.
"""
from pathlib import Path
import json,hashlib,gzip,os,sys,io,importlib.util,time,datetime
sys.dont_write_bytecode=True
import numpy as np
from PIL import Image
from scipy.ndimage import label
ROOT=Path('/workspace/cqc-p43-resume-20261025');HELPER=Path('/workspace/cqc-pass40-resume-20261022/tools/recovered-p39/integration/native_geometry.py')
def read(p):
 with os.fdopen(os.open(p,os.O_RDONLY|os.O_NOATIME),'rb')as f:return f.read()
def pin(p):
 b=read(p);return {'path':str(p),'bytes':len(b),'sha256':hashlib.sha256(b).hexdigest()}
assert pin(HELPER)['sha256']=='93b8d1d382bb84ba3dca9f927928cabb6660cb36c0a395d1c7fffe9c99a2561b'
sp=importlib.util.spec_from_file_location('strict_original_geometry',HELPER);geometry=importlib.util.module_from_spec(sp);sp.loader.exec_module(geometry)
def simplify(points):
 p=[list(v)for v in points];rounds=0;duplicates=collinear=0
 while True:
  previous=len(p);q=[]
  for v in p:
   if q and q[-1]==v:duplicates+=1
   else:q.append(v)
  if len(q)>1 and q[0]==q[-1]:q.pop();duplicates+=1
  p=q;remove=[]
  for i,b in enumerate(p):
   a,c=p[i-1],p[(i+1)%len(p)]
   vertical=a[0]==b[0]==c[0]and min(a[1],c[1])<=b[1]<=max(a[1],c[1]);horizontal=a[1]==b[1]==c[1]and min(a[0],c[0])<=b[0]<=max(a[0],c[0])
   if vertical or horizontal:remove.append(i)
  if remove:
   ids=set(remove);p=[v for i,v in enumerate(p)if i not in ids];collinear+=len(remove)
  rounds+=1;assert len(p)>=3
  if len(p)==previous:break
 assert simplify_once_stable(p)
 return p,{'passes':rounds,'adjacentIdenticalRemoved':duplicates,'axisAlignedBetweenRemoved':collinear}
def simplify_once_stable(p):
 if any(p[i]==p[i-1]for i in range(len(p))):return False
 for i,b in enumerate(p):
  a,c=p[i-1],p[(i+1)%len(p)]
  if(a[0]==b[0]==c[0]and min(a[1],c[1])<=b[1]<=max(a[1],c[1]))or(a[1]==b[1]==c[1]and min(a[0],c[0])<=b[0]<=max(a[0],c[0])):return False
 return True
def main():
 jp=Path(sys.argv[1]);out=Path(sys.argv[2]);assert out.is_relative_to(ROOT)and not out.exists();jpin=pin(jp);job=json.loads(read(jp));gp=job['geometry'];bp=job['ownershipBook'];assert pin(gp['path'])==gp and pin(bp['path'])==bp;g=json.loads(gzip.decompress(read(gp['path'])));assert g['ownershipBookSHA256']==bp['sha256'];sources={s['path']:s for s in g['sources']};cache={};rows=[];oldVertices=newVertices=0;start=time.monotonic()
 for side in ['right','left']:
  for role,m in enumerate(job['roles'][side]):
   asset=next(a for a in job['assets']if a['key']==m['asset']);source=sources[asset['path']];p=next(p for p in source['poses']if p['name']==m['pose']);assert p['candidateUsage']=='mapped-semantic-role'and p['side']==side and p['semanticPoseIndex']==role
   if source['path']not in cache:
    raw=read(source['path']);assert len(raw)==source['bytes']and hashlib.sha256(raw).hexdigest()==source['sha256'];im=Image.open(io.BytesIO(raw));alpha=np.array(im.getchannel('A'));labels,_=label(alpha>16,np.ones((3,3),dtype=np.int8));cache[source['path']]=(labels,pin(source['path']))
   labels,sourcePin=cache[source['path']];x,y,w,h=p['rect'];own=np.isin(labels[y:y+h,x:x+w],p['componentIDs']);foreign=(labels[y:y+h,x:x+w]>0)&~own;old=p['clipPolygon'];new,algorithm=simplify(old);oldNative=[[px*w,py*h]for px,py in old];newNative=[[px*w,py*h]for px,py in new]
   oldmask=geometry.contained_mask(oldNative,(h,w));newmask=geometry.contained_mask(newNative,(h,w));diff=int(np.count_nonzero(oldmask!=newmask));lostOld=int(np.count_nonzero(own&~oldmask));lostNew=int(np.count_nonzero(own&~newmask));foreignOld=int(np.count_nonzero(foreign&oldmask));foreignNew=int(np.count_nonzero(foreign&newmask));assert diff==lostOld==lostNew==foreignOld==foreignNew==0,(side,role,diff,lostOld,lostNew,foreignOld,foreignNew);assert int(own.sum())==p['ownAlphaAbove16Pixels'];assert p['ownPixelsLost']==p['foreignPixelsKept']==0
   maskSHA=hashlib.sha256(oldmask.tobytes()).hexdigest();assert hashlib.sha256(newmask.tobytes()).hexdigest()==maskSHA;oldVertices+=len(old);newVertices+=len(new);rows.append({'side':side,'roleIndex':role,'pose':p['name'],'sourceSHA256':source['sha256'],'rect':p['rect'],'originalVertices':len(old),'strictSimplifiedVertices':len(new),'originalPolygonSHA256':hashlib.sha256(json.dumps(old,separators=(',',':')).encode()).hexdigest(),'strictSimplifiedPolygonSHA256':hashlib.sha256(json.dumps(new,separators=(',',':')).encode()).hexdigest(),'maskComparedNativePixels':w*h,'oldAndNewContainedMaskSHA256':maskSHA,'containedMaskDifferentPixels':diff,'ownedAlphaAbove16Pixels':int(own.sum()),'oldOwnPixelsLost':lostOld,'newOwnPixelsLost':lostNew,'oldForeignPixelsKept':foreignOld,'newForeignPixelsKept':foreignNew,'originalOwnershipProofUnchanged':True,'algorithm':algorithm})
 assert len(rows)==32 and pin(jp)==jpin and pin(gp['path'])==gp and pin(bp['path'])==bp
 for path,(_labels,sourcePin)in cache.items():assert pin(path)==sourcePin
 report={'schema':'cqc.p43.strict-redundant-clip-vertex-mask-preflight/1','status':'PASS_PREFLIGHT_ONLY','uid':job['uid'],'id':job['id'],'atUTC':datetime.datetime.now(datetime.timezone.utc).isoformat(),'sourceJob':jpin,'sourceGeometry':gp,'sourceOwnershipBook':bp,'originalContainedMaskHelper':pin(HELPER),'algorithmScope':'Remove adjacent XY strict-equality including closure; then B only for exact axis-aligned A/B/C with B between A/C inclusive. Repeat to stability; no epsilon/tolerance, rounding, quantization, diagonal or area simplification. Existing normalized vertex values unchanged, native masks reconstructed by exact original rect width/height multiplication.','mappedPhysicalRolesChecked':32,'sourceOriginalPNGCount':len(cache),'originalVertices':oldVertices,'strictSimplifiedVertices':newVertices,'removedVertices':oldVertices-newVertices,'allComparedNativePixels':sum(r['maskComparedNativePixels']for r in rows),'differentContainedMaskPixels':0,'ownAlpha16Lost':0,'foreignAlpha16Intrusion':0,'sourcePNGs':list(v[1]for v in cache.values()),'rows':rows,'elapsedSeconds':round(time.monotonic()-start,3),'sourcePNGJobOrGeometryMutations':0,'simplifiedGeometryWritten':False,'rootArtApprovalOrAdmissionCreated':False,'qualification':'This independently proves raster/ownership equivalence for a proposed compiler-only redundant-vertex optimization. It does not approve source art, change thresholds, loosen geometry, or admit the resulting metadata. Exact compiler patch/gain and Root review remain separate.'};out.parent.mkdir(parents=True,exist_ok=True);out.write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n');print(json.dumps(pin(out)),flush=True)
if __name__=='__main__':main()
