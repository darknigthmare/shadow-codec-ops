from pathlib import Path
import os, json, hashlib, sys
from PIL import Image
form,name,native=sys.argv[1:]
b=Path(__file__).parent/form; p=Path(native); dst=b/'native-attempts'/(name+'.png')
if not dst.exists(): os.link(p,dst)
assert p.read_bytes()==dst.read_bytes()
with Image.open(p) as im:
 a=im.getchannel('A'); hist=a.histogram();edge=sum(sum(v>80 for v in a.crop(box).get_flattened_data()) for box in [(0,0,a.width,1),(0,a.height-1,a.width,a.height),(0,0,1,a.height),(a.width-1,0,a.width,a.height)])
 d={'source':str(dst),'nativeOriginal':str(p),'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'bytes':p.stat().st_size,'dimensions':list(a.size),'transparentPixels':hist[0],'alphaExtrema':list(a.getextrema()),'opaqueEdgePixels':edge,'nativeBytesUnchanged':True,'rasterEdits':False}
(b/'metadata'/(name+'.result-summary.json')).write_text(json.dumps(d,indent=2)+'\n')
sys.path.insert(0,'/workspace/cqc-game-working/cqc-versus-v056/tools')
from inspect_combat_sprite_sheet import inspect_components
key=name.split('_')[0].lower()+'-'+name.split('_')[1].lower();uid='core__crying_wolf' if form=='armor' else 'archive__crying_beauty'
l=inspect_components(dst,4,3,'assets/combat-sprites/'+uid+'/'+key+'-v1.png')
(b/'inspections'/(name+'.components.json')).write_text(json.dumps(l,indent=2)+'\n')
print(json.dumps({'name':name,'sha256':d['sha256'],'bytes':d['bytes'],'size':d['dimensions'],'edge':edge,'components':len(l['cells']),'bounds':[x['bbox'] for x in l['cells']],'foreign':l['foreign_body_frames']}))
