from pathlib import Path
from PIL import Image
import json,shutil,hashlib,sys
p=Path(__file__).parent
for job,source in zip(sys.argv[1::2],sys.argv[2::2]):
 src=Path(source);dst=p/'native-source'/src.name
 if dst.exists():assert dst.read_bytes()==src.read_bytes()
 else:shutil.copyfile(src,dst)
 with Image.open(src) as im:w,h=im.size
 r={'job':job,'sourcePath':str(src),'preservedPath':str(dst),'sha256':hashlib.sha256(src.read_bytes()).hexdigest(),'bytes':src.stat().st_size,'width':w,'height':h,'argsPath':str(p/'jobs'/(job+'.args.json')),'nativeBytesPreserved':True,'tool':'image_gen__imagegen'}
 out=p/'jobs'/(job+'.result.json')
 if out.exists():
  old=json.loads(out.read_text());assert old['sha256']==r['sha256']
 out.write_text(json.dumps(r,ensure_ascii=False,indent=2))
 print(json.dumps(r))
