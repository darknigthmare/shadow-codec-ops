# Read-only native pixel evidence and JSON/socket metadata. Never writes raster data.
from pathlib import Path
from PIL import Image
import json,hashlib,collections,math
r=Path('/tmp/cqc-pass19-survive-generation');uid='pass19__frostbite_survive';sides={};catalog=json.loads((r/'candidates/combat-sprite-catalog-pass19-survive-v5.json').read_text())['entries'][uid]
def inside(x,y,poly):
 result=False
 for a,b in zip(poly,poly[1:]+poly[:1]):
  if (a[1]>y)!=(b[1]>y) and x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0]:result=not result
 return result
for side in ['right','left']:
 source=r/'generation'/uid/(side+'-v1.png');sha=hashlib.sha256(source.read_bytes()).hexdigest();im=Image.open(source).convert('RGBA');pix=im.load();layout=json.loads((source.parent/(side+'-native-layout-v1.json')).read_text());actions=catalog['actions' if side=='right' else 'oppositeActions'];sides[side]={}
 for idx in [5,11,10]:
  p=layout['poses'][idx];x,y,w,h=p['rect'];poly=p['clipPolygon'];eligible=set()
  for yy in range(y,y+h):
   for xx in range(x,x+w):
    rr,gg,bb,aa=pix[xx,yy]
    if aa>=192 and rr>120 and rr>gg+40 and rr>bb+40 and inside((xx+.5-x)/w,(yy+.5-y)/h,poly):eligible.add((xx,yy))
  groups=[]
  while eligible:
   at=eligible.pop();q=[at];pts=[at]
   while q:
    xx,yy=q.pop()
    for nxt in [(xx-1,yy),(xx+1,yy),(xx,yy-1),(xx,yy+1)]:
     if nxt in eligible:eligible.remove(nxt);q.append(nxt);pts.append(nxt)
   if len(pts)>8:groups.append(pts)
  # Join colour fragments within one tiny red crystal, using natural source proximity only.
  merged=[]
  for pts in sorted(groups,key=len,reverse=True):
   cx=sum(a for a,b in pts)/len(pts);cy=sum(b for a,b in pts)/len(pts)
   near=next((g for g in merged if math.hypot(cx-sum(a for a,b in g)/len(g),cy-sum(b for a,b in g)/len(g))<14),None)
   if near is None:merged.append(pts)
   else:near.extend(pts)
  merged.sort(key=lambda g:(max(a for a,b in g) if side=='right' else -min(a for a,b in g)),reverse=True);organs=[]
  for n,pts in enumerate(merged):
   edge=max(a for a,b in pts) if side=='right' else min(a for a,b in pts);edgepts=[v for v in pts if abs(v[0]-edge)<2];middle=sum(b for a,b in edgepts)/len(edgepts);point=min(edgepts,key=lambda p:abs(p[1]-middle));point=[point[0]+.5,point[1]+.5];organs.append({'id':'visible-red-tip-'+str(n+1),'nativePixelPoint':point,'frameFraction':[round((point[0]-x)/w,6),round((point[1]-y)/h,6)],'visibleRedPixels':len(pts),'alphaAtNativeTip':pix[int(point[0]),int(point[1])][3]})
  print(side,idx,[(len(g),(min(a for a,b in g),min(b for a,b in g),max(a for a,b in g),max(b for a,b in g))) for g in merged]);assert 1<=len(organs)<=4,(side,idx,len(organs));assert organs[0]['alphaAtNativeTip']>=192
  phase='startup' if idx==5 else 'active' if idx==11 else 'recovery';frame=actions['shoot']['frames'][{'startup':0,'active':1,'recovery':2}[phase]]
  assert frame['rect']==p['rect'] and frame['sha256']==sha
  sides[side][str(idx)]={'side':side,'physicalPoseIndex':idx,'phase':phase,'attachmentKind':'organic-red-crystal-tip','rect':p['rect'],'pivot':p['pivot'],'sourceSHA256':sha,'source':str(source),'file':frame['file'],'nativePixelPoint':organs[0]['nativePixelPoint'],'frameFraction':organs[0]['frameFraction'],'organs':organs,'observedVisibleRedTips':len(organs),'emitRecommended':idx==11,'recommendedWorldDirection':[1 if side=='right' else -1,0],'geometryMethod':'Read-only native RGBA red-crystal colour components inside reviewed alpha192 body contour; actual visible tip pixel picked on facing edge. Native point/frame/SHA guarded against frozen V5 shoot selection.','absoluteCanonicalAttachmentCertified':False,'qualification':'These are visible2D native sprite organs, not extracted original game model sockets. A folded/occluded third tip is not invented on startup/recovery frames; active frame exposes3.'}
record={'schema':'cqc.pass19.native-creature-attachments/1','uid':uid,'sourcePixelsTransformed':False,'attachmentKind':'organic-red-crystal-tip','absoluteCanonicalAttachmentCertified':False,'qualification':'Frostbite has no human gun or normal mouth. Projectile origin comes from visible red crystalline tentacle organs, with3 red organs physically seen on active pose11. Only phase active emits. Authored2D CQC sockets and horizontal gameplay direction; original source game attachment matrices/timing are not certified.','sides':sides}
p=r/'qa/frostbite-native-organ-anchors-WORKING.json';p.write_text(json.dumps(record,ensure_ascii=False,indent=2));mort=json.loads((r/'candidates/mortar-native-cannon-anchors-v1.json').read_text());allrecords={'schema':'cqc.pass19.native-creature-attachments/1','entries':{mort['uid']:mort,uid:record}};code='/* Immutable PASS19 organic2D native organs, Mortar + Frostbite. PNG pixels unchanged. */\n(function(root){\'use strict\';const addition='+json.dumps(allrecords,separators=(',',':'))+';const base=root.CQC_PASS19_CREATURE_ATTACHMENTS||{schema:addition.schema,entries:{}};root.CQC_PASS19_CREATURE_ATTACHMENTS={schema:addition.schema,entries:{...base.entries,...addition.entries}};})(globalThis);\n';p=r/'qa/cqc-pass19-survive-organ-anchors-WORKING.js';p.write_text(code);print(json.dumps({'path':str(p),'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'frostbite':{side:{idx:{'point':v['nativePixelPoint'],'fraction':v['frameFraction'],'visibleOrgans':v['observedVisibleRedTips']} for idx,v in rows.items()} for side,rows in sides.items()}}))
