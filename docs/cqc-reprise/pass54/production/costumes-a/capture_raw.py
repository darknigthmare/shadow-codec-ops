from pathlib import Path
import shutil,json,hashlib,datetime,sys
from PIL import Image
p=Path(__file__).parent;ident,slug,source=sys.argv[1:];s=Path(source);t=p/(ident.lower()+'-'+slug+'-right-raw-v1.png')
if not t.exists():shutil.copyfile(s,t)
b=t.read_bytes();im=Image.open(t);assert im.format=='PNG';a=im.getchannel('A');bb=a.point(lambda x:255 if x>16 else 0).getbbox();assert bb is not None
r={'schema':'cqc.p54.original-costume-generation-receipt/1','id':ident,'sourceGeneratedPath':str(s),'rawPNG':str(t),'bytes':len(b),'sha256':hashlib.sha256(b).hexdigest(),'atUTC':datetime.datetime.now(datetime.timezone.utc).isoformat(),'tool':'image_gen.imagegen','rawPixelsUnchanged':True,'width':im.width,'height':im.height,'alphaExtrema':a.getextrema(),'strongAlphaBoundsXYXY':list(bb),'cornerAlpha':[a.getpixel(x)for x in [(0,0),(im.width-1,0),(0,im.height-1),(im.width-1,im.height-1)]],'physicallyViewedGenerated':True,'isOfficial':False,'newAnimationCount':0,'runtimeAdmission':False}
(p/(ident.lower()+'-generation-receipt.json')).write_text(json.dumps(r,indent=2)+'\n');print(json.dumps(r))
