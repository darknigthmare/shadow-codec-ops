import pathlib,hashlib,json,os,sys
from PIL import Image
P=pathlib.Path(__file__).parent
form,name,original=sys.argv[1:];src=pathlib.Path(original);root=P/form;dst=root/'native-attempts'/f'{name}.png'
if not dst.exists():os.link(src,dst)
else:assert dst.read_bytes()==src.read_bytes()
im=Image.open(src);meta={'nativeOriginal':str(src),'source':str(dst),'sha256':hashlib.sha256(src.read_bytes()).hexdigest(),'bytes':src.stat().st_size,'dimensions':list(im.size),'mode':im.mode,'args':str(root/'prompts'/f'{name}.args.json'),'status':'pending_physical_review','pixelsModified':False,'nativeCopyHardlinked':True};(root/'metadata'/f'{name}.result-summary.json').write_text(json.dumps(meta,indent=2)+'\n');print(json.dumps({'name':name,'sha256':meta['sha256'],'bytes':meta['bytes']}))
