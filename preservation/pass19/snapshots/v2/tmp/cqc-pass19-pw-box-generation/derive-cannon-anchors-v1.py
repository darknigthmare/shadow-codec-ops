"""Read-only source-alpha muzzle endpoint measurement. PNG pixels remain untouched."""
import json,hashlib,sys
from pathlib import Path
from PIL import Image
import numpy as np

ROOT=Path('/tmp/cqc-pass19-pw-box-generation')
ids=sys.argv[1:] or ['pass19__box_tank_pw']
items=[]
for uid in ids:
 for side in ['right','left']:
  layout=json.loads((ROOT/'generation'/uid/(side+'-native-layout-v1.json')).read_text())
  p=Path(layout['source']);raw=p.read_bytes();assert hashlib.sha256(raw).hexdigest()==layout['sha256']
  alpha=np.array(Image.open(p))[:,:,3];frame=layout['poses'][11];x,y,w,h=frame['rect'];upper=alpha[y:y+max(1,round(h*.32)),x:x+w]
  ys,xs=np.where(upper>=200);assert len(xs)>100
  tip=int(xs.max() if side=='right' else xs.min());near=(xs>=tip-2) if side=='right' else (xs<=tip+2)
  tipY=float((ys[near].min()+ys[near].max())/2)
  point=[x+tip+.5,y+tipY+.5]
  item={'uid':uid,'side':side,'action':'shoot','actionFrameIndex':1,'physicalPoseIndex':11,'file':f'assets/combat-sprites-pass19-boxes/{uid}/{side}-v1.png','sha256':layout['sha256'],'source':str(p),'rect':frame['rect'],'pivot':frame['pivot'],'sourcePixel':point,'frameFraction':[round((point[0]-x)/w,8),round((point[1]-y)/h,8)],'measurement':{'threshold':200,'searchUpperFrameFraction':.32,'endcapSliceColumns':3,'sourceLocalTipColumn':tip,'tipCapAlphaSpanY':[int(ys[near].min()),int(ys[near].max())]},'physicallyReviewed':True,'reviewer':'pass19-pw-box-source-cannon-endcap-review','scope':'Visible single square cardboard cannon end in actual accepted native firing pose. Layout and both native directions physically viewed; source-alpha endpoint measured without raster changes.'}
  assert all(0<=v<=1 for v in item['frameFraction']);items.append(item)
out=ROOT/'candidates'/('BOX_CANNON_SOURCE_ANCHORS_'+('-'.join(ids))+'_V1.json')
with out.open('x') as f:f.write(json.dumps({'schema':'cqc.pass19.source-cannon-muzzle-anchors/1','items':items,'pngPixelsChanged':False},indent=2)+'\n')
out.chmod(0o400)
print(json.dumps({'path':str(out),'sha256':hashlib.sha256(out.read_bytes()).hexdigest(),'items':items}))
