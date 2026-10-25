from collections import defaultdict
import numpy as np

def polygon_for_mask(mask):
 ys,xs=np.nonzero(mask);edges=set()
 for x,y in zip(xs.tolist(),ys.tolist()):
  if y==0 or not mask[y-1,x]:edges.add(((x,y),(x+1,y)))
  if x+1==mask.shape[1] or not mask[y,x+1]:edges.add(((x+1,y),(x+1,y+1)))
  if y+1==mask.shape[0] or not mask[y+1,x]:edges.add(((x+1,y+1),(x,y+1)))
  if x==0 or not mask[y,x-1]:edges.add(((x,y+1),(x,y)))
 outgoing=defaultdict(set)
 for a,b in edges:outgoing[a].add(b)
 loops=[]
 while edges:
  a,b=min(edges);start=a;points=[a];previous=a;current=b;edges.remove((a,b));outgoing[a].remove(b)
  while current!=start:
   points.append(current);candidates=[p for p in outgoing[current] if (current,p) in edges]
   if not candidates:raise RuntimeError('Open contour')
   dx,dy=current[0]-previous[0],current[1]-previous[1]
   def turn(point):
    vx,vy=point[0]-current[0],point[1]-current[1];cross=dx*vy-dy*vx;dot=dx*vx+dy*vy
    return { (1,0):0,(0,1):1,(-1,0):2,(0,-1):3}.get((cross,dot),4)
   following=min(candidates,key=turn);edges.remove((current,following));outgoing[current].remove(following);previous,current=current,following
  # Remove strictly collinear grid points only; preserve every native contour turn.
  trimmed=[]
  for i,point in enumerate(points):
   before,after=points[i-1],points[(i+1)%len(points)]
   if (point[0]-before[0])*(after[1]-point[1])!=(point[1]-before[1])*(after[0]-point[0]):trimmed.append(point)
  if len(trimmed)>=3:loops.append(trimmed)
 loops.sort(key=lambda loop:abs(sum(loop[i][0]*loop[(i+1)%len(loop)][1]-loop[(i+1)%len(loop)][0]*loop[i][1] for i in range(len(loop)))),reverse=True)
 anchor=loops[0][0];compound=[]
 for loop in loops:
  compound.extend([anchor,loop[0],*loop[1:],loop[0],anchor])
 return compound,len(loops)

def contained_mask(polygon,shape):
 result=np.zeros(shape,dtype=bool);xcentres=np.arange(shape[1])+.5
 for y in range(shape[0]):
  py=y+.5;diff=np.zeros(shape[1]+1,dtype=np.int32)
  for i,(x0,y0) in enumerate(polygon):
   x1,y1=polygon[(i+1)%len(polygon)]
   if y0<=py<y1:delta=1
   elif y1<=py<y0:delta=-1
   else:continue
   ix=x0+(py-y0)*(x1-x0)/(y1-y0);at=np.searchsorted(xcentres,ix,side='right');diff[at]+=delta
  result[y]=np.cumsum(diff[:-1])!=0
 return result

