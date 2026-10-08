# Read-only native PNG alpha geometry. Never writes raster pixels or resized/cropped imagery.
import os,sys,pathlib,zlib,struct,json,hashlib,math,collections,array,concurrent.futures
ROOT=pathlib.Path(os.environ.get('CQC_PASS18_CHARACTER_ROOT','/tmp/cqc-pass18-characters'))
def native_read(p):
 fd=os.open(p,os.O_RDONLY|os.O_NOATIME)
 with os.fdopen(fd,'rb')as f:return f.read()
def decode(p):
 data=native_read(p);assert data[:8]==b'\x89PNG\r\n\x1a\n';pos=8;chunks=[]
 while pos<len(data):
  n=struct.unpack('>I',data[pos:pos+4])[0];k=data[pos+4:pos+8];v=data[pos+8:pos+8+n];pos+=12+n
  if k==b'IHDR':w,h,bits,ct,co,fi,it=struct.unpack('>IIBBBBB',v)
  if k==b'IDAT':chunks.append(v)
 assert bits==8 and ct==6 and it==0,(bits,ct,it)
 raw=zlib.decompress(b''.join(chunks));stride=w*4;prev=bytearray(stride);off=0;alpha=bytearray(w*h)
 for y in range(h):
  t=raw[off];cur=bytearray(raw[off+1:off+1+stride]);off+=stride+1
  for x in range(stride):
   a=cur[x-4]if x>=4 else 0;b=prev[x];c=prev[x-4]if x>=4 else 0
   if t==1:cur[x]=(cur[x]+a)&255
   elif t==2:cur[x]=(cur[x]+b)&255
   elif t==3:cur[x]=(cur[x]+((a+b)//2))&255
   elif t==4:
    z=a+b-c;pa=abs(z-a);pb=abs(z-b);pc=abs(z-c);z=a if pa<=pb and pa<=pc else b if pb<=pc else c;cur[x]=(cur[x]+z)&255
   else:assert t==0
  alpha[y*w:(y+1)*w]=cur[3::4];prev=cur
 return data,w,h,alpha

def distance(p,a,b):
 dx=b[0]-a[0];dy=b[1]-a[1]
 if not dx and not dy:return math.hypot(p[0]-a[0],p[1]-a[1])
 t=max(0,min(1,((p[0]-a[0])*dx+(p[1]-a[1])*dy)/(dx*dx+dy*dy)))
 return math.hypot(p[0]-a[0]-t*dx,p[1]-a[1]-t*dy)
def rdp(ps,e=1.0):
 if len(ps)<3:return ps
 ds=[distance(p,ps[0],ps[-1])for p in ps[1:-1]];m=max(ds);i=ds.index(m)+1
 if m<=e:return[ps[0],ps[-1]]
 return rdp(ps[:i+1],e)[:-1]+rdp(ps[i:],e)
def area(ps):return abs(sum(a[0]*b[1]-b[0]*a[1]for a,b in zip(ps,ps[1:]+ps[:1])))/2

def analyse(uid,side,source_name_override=None,target_name_override=None):
 spec=json.loads((ROOT/'approved-identities-v1.json').read_text()).get(uid,{}); sourceName=source_name_override or spec.get('selectedSources',{}).get(side,side+'-v1.png');assert pathlib.Path(sourceName).name==sourceName;assert target_name_override is None or pathlib.Path(target_name_override).name==target_name_override;p=ROOT/'generation'/uid/sourceName;data,w,h,alpha=decode(p);alphaThreshold=int(spec.get('nativeGeometryAlphaThreshold',16));assert 1<=alphaThreshold<=254;labels=array.array('I',[0])*(w*h);components=[];label=0
 for i,a in enumerate(alpha):
  if a<alphaThreshold or labels[i]:continue
  label+=1;labels[i]=label;q=[i];pts=[];minx=maxx=i%w;miny=maxy=i//w
  while q:
   z=q.pop();pts.append(z);x=z%w;y=z//w;minx=min(minx,x);maxx=max(maxx,x);miny=min(miny,y);maxy=max(maxy,y)
   for v in [z-1 if x else -1,z+1 if x<w-1 else -1,z-w if y else -1,z+w if y<h-1 else -1]:
    if v>=0 and alpha[v]>=alphaThreshold and not labels[v]:labels[v]=label;q.append(v)
  if len(pts)>1000:components.append({'label':label,'pts':pts,'bbox':[minx,miny,maxx,maxy],'pixels':len(pts)})
 assert len(components)==16,(str(p),'Expected16nonoverlappingfullbodyconnectedcomponents',[(c['pixels'],c['bbox'])for c in components])
 poses={};warnings=[]
 for c in components:
  loX,loY,hiX,hiY=c['bbox'];cx=(loX+hiX)/2;cy=(loY+hiY)/2;col=min(3,int(cx/(w/4)));row=min(3,int(cy/(h/4)));idx=row*4+col
  assert idx not in poses,(str(p),'two posecomponentsassignedsamecell',idx)
  edges={};lab=c['label']
  for z in c['pts']:
   x=z%w;y=z//w
   if y==0 or labels[z-w]!=lab:edges.setdefault((x,y),[]).append((x+1,y))
   if x==w-1 or labels[z+1]!=lab:edges.setdefault((x+1,y),[]).append((x+1,y+1))
   if y==h-1 or labels[z+w]!=lab:edges.setdefault((x+1,y+1),[]).append((x,y+1))
   if x==0 or labels[z-1]!=lab:edges.setdefault((x,y+1),[]).append((x,y))
  loops=[]
  while edges:
   start=min(edges);cur=start;loop=[start]
   for step in range(100000):
    if cur not in edges:break
    ends=edges[cur];nxt=ends.pop()
    if not ends:del edges[cur]
    cur=nxt;loop.append(cur)
    if cur==start:break
   if len(loop)>3:loops.append(loop[:-1])
  poly=max(loops,key=area);middle=len(poly)//2;poly=rdp(poly[:middle+1])[:-1]+rdp(poly[middle:]+[poly[0]])[:-1]
  x=max(0,loX-2);y=max(0,loY-2);right=min(w,hiX+3);bottom=min(h,hiY+3);rect=[x,y,right-x,bottom-y]
  # The source silhouette itself determines a floor origin; compact KO keeps center at the floor.
  floor=[z%w for z in c['pts']if z//w>=hiY-5];groundX=(min(floor)+max(floor))/2;groundY=hiY+1
  pivot=[round(max(0,min(1,(groundX-x)/rect[2])),6),round(max(0,min(1,(groundY-y)/rect[3])),6)]
  inflated=[]
  for j,(a,b) in enumerate(poly):
   prev=poly[j-1];nxt=poly[(j+1)%len(poly)];dx1=a-prev[0];dy1=b-prev[1];dx2=nxt[0]-a;dy2=nxt[1]-b;l1=math.hypot(dx1,dy1) or 1;l2=math.hypot(dx2,dy2) or 1;nx1=dy1/l1;ny1=-dx1/l1;nx2=dy2/l2;ny2=-dx2/l2;den=max(.35,1+nx1*nx2+ny1*ny2);ox=max(-1.75,min(1.75,1.2*(nx1+nx2)/den));oy=max(-1.75,min(1.75,1.2*(ny1+ny2)/den));inflated.append((a+ox,b+oy))
  norm=[[round(max(0,min(1,(a-x)/rect[2])),6),round(max(0,min(1,(b-y)/rect[3])),6)]for a,b in inflated]
  frame={'rect':rect,'pivot':pivot,'clipPolygon':norm,'alphaComponentPixels':c['pixels'],'physicalPoseIndex':idx}
  poses[idx]=frame
  if loX==0 or loY==0 or hiX==w-1 or hiY==h-1:warnings.append({'pose':idx,'kind':'native-component-touching-source-edge','bbox':c['bbox']})
 assert set(poses)==set(range(16))
 # Vector isolation only where another physical pose can appear within this source rectangle.
 for idx,frame in poses.items():
  x,y,rw,rh=frame['rect']; overlaps=[]
  for other,op in poses.items():
   if idx==other:continue
   a,b,c,d=op['rect']
   if x<a+c and a<x+rw and y<b+d and b<y+rh:overlaps.append(other)
  frame['sourceRectangleOverlapPoses']=overlaps
  if not overlaps and not spec.get('alwaysNativeSilhouetteClip',False):del frame['clipPolygon']
 out={'schema':'cqc.pass18.native-pose-layout/1','uid':uid,'side':side,'source':str(p),'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest(),'dimensions':[w,h],'physicalPoseCount':16,'sourcePixelsTransformed':False,'geometryKind':f'read-only-alpha{alphaThreshold}-component-vector-contours; source PNG bytes unchanged, low-alpha artifacts excluded by Canvas vector clipping','sourceFrameHeight':poses[0]['rect'][3],'poses':[poses[i]for i in range(16)],'warnings':warnings}
 target=p.with_name(target_name_override or side+'-native-layout-v1.json');target.write_text(json.dumps(out,indent=2));return {'uid':uid,'side':side,'warnings':warnings,'polygonVertices':sum(len(p.get('clipPolygon',[]))for p in out['poses']),'sourceFrameHeight':out['sourceFrameHeight']}
if __name__=='__main__':
 ids=list(json.loads((ROOT/'approved-identities-v1.json').read_text())) if len(sys.argv)==1 else sys.argv[1:];jobs=[(uid,side)for uid in ids for side in ['right','left']]
 for uid,side in jobs:
  print(json.dumps(analyse(uid,side)),flush=True)
