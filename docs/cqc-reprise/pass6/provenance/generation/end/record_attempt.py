from pathlib import Path
import sys, json, shutil, hashlib
import numpy as np
from PIL import Image
from scipy.ndimage import label, find_objects
p=Path('/workspace/cqc-pass6-generation/end');key=sys.argv[1];native=Path(sys.argv[2]);f=p/'native-attempts'/(key+'.png')
if f.exists() and f.read_bytes()!=native.read_bytes(): raise SystemExit('never overwrite attempt')
shutil.copy2(native,f);im=Image.open(f);a=np.asarray(im)[:,:,3] if im.mode=='RGBA' else np.full((im.height,im.width),255,dtype=np.uint8)
ls,count=label(a>=48,structure=np.ones((3,3)));areas=np.bincount(ls.ravel());obj=find_objects(ls);rows=[]
for i,b in enumerate(obj,1):
 if areas[i]>500:
  y,x=b;rows.append({'component':i,'area':int(areas[i]),'x':x.start,'y':y.start,'width':x.stop-x.start,'height':y.stop-y.start})
rows.sort(key=lambda r:(round((r['y']+r['height']/2)/(im.height/3)-.5),r['x']))
d={'key':key,'source':str(f),'nativeOriginal':str(native),'sha256':hashlib.sha256(f.read_bytes()).hexdigest(),'bytes':f.stat().st_size,'width':im.width,'height':im.height,'mode':im.mode,'columns':4,'rows':3,'poseCount':12,'mirror':False,'majorComponentCount':len(rows),'majorComponents':rows,'alpha48OuterEdgePixels':{'top':int((a[0]>=48).sum()),'bottom':int((a[-1]>=48).sum()),'left':int((a[:,0]>=48).sum()),'right':int((a[:,-1]>=48).sum())},'alpha255Pixels':int((a==255).sum()),'alpha0Pixels':int((a==0).sum()),'nativeBytesUnchanged':f.read_bytes()==native.read_bytes()}
(p/'metadata'/(key+'.json')).write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n');print(json.dumps(d,ensure_ascii=False))
