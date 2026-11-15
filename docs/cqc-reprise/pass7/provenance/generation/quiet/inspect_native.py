from pathlib import Path
from PIL import Image
from scipy import ndimage
import numpy as np,json,hashlib,shutil,sys
b=Path(__file__).parent;name=sys.argv[1];p=Path(sys.argv[2]);dst=b/'native-attempts'/(name+'.png')
if not dst.exists():shutil.copyfile(p,dst)
assert p.read_bytes()==dst.read_bytes()
im=Image.open(p);a=np.asarray(im.getchannel('A'));lab,n=ndimage.label(a>80);sl=ndimage.find_objects(lab);rows=[]
for i,s in enumerate(sl):
 if s and (lab[s]==i+1).sum()>1000:rows.append({'component':i+1,'pixels':int((lab[s]==i+1).sum()),'rect':[s[1].start,s[0].start,s[1].stop-s[1].start,s[0].stop-s[0].start]})
d={'file':str(dst),'nativeOriginal':str(p),'width':im.width,'height':im.height,'mode':im.mode,'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'bytes':p.stat().st_size,'components':rows,'opaqueEdgePixels':int((a[0]>80).sum()+(a[-1]>80).sum()+(a[:,0]>80).sum()+(a[:,-1]>80).sum()),'alphaExtrema':list(im.getchannel('A').getextrema())};(b/'inspections'/(name+'.components.json')).write_text(json.dumps(d,indent=2));(b/'metadata'/(name+'.result-summary.json')).write_text(json.dumps({k:v for k,v in d.items() if k!='components'},indent=2));print(json.dumps({'name':name,'dimensions':[im.width,im.height],'mode':im.mode,'bodyComponents':len(rows),'opaqueEdgePixels':d['opaqueEdgePixels'],'sha256':d['sha256']}))
