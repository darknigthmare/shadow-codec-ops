from pathlib import Path
from PIL import Image
import os,json,hashlib,importlib.util
B=Path(__file__).parent
s=importlib.util.spec_from_file_location('inspector','/workspace/cqc-game-working/cqc-versus-v056/tools/inspect_combat_sprite_sheet.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
for ledger in B.glob('recent_native_results*.json'):
 for r in json.loads(ledger.read_text()):
  p=Path(r['path']);q=B/r['kind']/'native-attempts'/(r['id']+'.png')
  if not q.exists():os.link(p,q)
  im=Image.open(p);alpha=im.getchannel('A');edge=sum(x>80 for x in list(alpha.crop((0,0,im.width,1)).getdata())+list(alpha.crop((0,im.height-1,im.width,im.height)).getdata())+list(alpha.crop((0,0,1,im.height)).getdata())+list(alpha.crop((im.width-1,0,im.width,im.height)).getdata()))
  summary={'file':str(q),'nativeOriginal':str(p),'width':im.width,'height':im.height,'mode':im.mode,'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'bytes':p.stat().st_size,'pixelEdit':False,'opaqueEdgePixels':edge,'alphaExtrema':list(alpha.getextrema()),'output_hint':r['output_hint']};sp=B/r['kind']/'metadata'/(r['id']+'.result-summary.json')
  if not sp.exists():sp.write_text(json.dumps(summary,indent=2)+'\n')
for kind,uid in [('armor','core__raging_raven'),('beauty','archive__raging_beauty')]:
 for p in sorted((B/kind/'native-attempts').glob('*.png')):
  output=B/kind/'inspections'/(p.stem+'.components.json')
  if output.exists():continue
  asset='assets/combat-sprites/'+uid+'/'+p.stem[:1].lower()+'-'+p.stem.split('_')[1].lower()+'-v1.png'
  try:
   d=m.inspect_components(p,4,3,asset);output.write_text(json.dumps(d,indent=2)+'\n');print(kind,p.stem,len(d['cells']),'foreign',d['foreign_body_frames'])
  except Exception as e:print(kind,p.stem,'FAILED',str(e))
print('diskFreeBytes',__import__('shutil').disk_usage(B).free)
