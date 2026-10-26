from pathlib import Path
import json,hashlib,math,io,os,sys
from PIL import Image
def read(p):
 with os.fdopen(os.open(p,os.O_RDONLY|os.O_NOATIME),'rb')as f:return f.read()
j=json.loads(read(sys.argv[1]));count=0
for a in j['assets']:
 c=a['calibration']
 if c['method']!='same-page-body-landmarks':continue
 raw=read(a['path']);assert hashlib.sha256(raw).hexdigest()==a['sha256'] and len(raw)==a['bytes']
 with Image.open(io.BytesIO(raw))as image:
  im=image.convert('RGBA')
  for name in ['headNativeXY','heelNativeXY']:
   x,y=c[name];assert 0<=x<im.width and 0<=y<im.height;assert im.getpixel((math.floor(x),math.floor(y)))[3]>16;count+=1
weaponPoints=0;assets={a['key']:a for a in j['assets']}
for anchor in j.get('anchors',[]):
 role=j['roles'][anchor['side']][anchor['roleIndex']];a=assets[role['asset']];raw=read(a['path']);assert hashlib.sha256(raw).hexdigest()==a['sha256'] and len(raw)==a['bytes']
 with Image.open(io.BytesIO(raw))as image:
  im=image.convert('RGBA')
  for name in ['nativeXY','rearNativeXY']:
   if name not in anchor:continue
   x,y=anchor[name];assert 0<=x<im.width and 0<=y<im.height;assert im.getpixel((math.floor(x),math.floor(y)))[3]>16;weaponPoints+=1
print(json.dumps({'status':'PASS','weaponPoints':weaponPoints,'bodyPointAlphaThreshold':16,'points':count,'sourceMutations':False,'qualification':'Point ownership/identity and body interpretation still require exact current Root review.'}))
