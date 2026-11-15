"""Import three source-reviewed native prop atlases without raster modification."""
from pathlib import Path
import json,hashlib,shutil
import numpy as np
from PIL import Image
R=Path('/workspace/cqc-game-working/cqc-versus-v056')
W=Path('/workspace')
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def portable(v):
 if isinstance(v,dict):return {k:portable(x)for k,x in v.items()}
 if isinstance(v,list):return [portable(x)for x in v]
 if isinstance(v,str)and v.startswith('/workspace/cqc-pass6-generation/'):
  return 'preparation/reprise-pass6-provenance/generation/'+v[len('/workspace/cqc-pass6-generation/'):]
 return v
catalog={};proof=[]
for key,folder,metaName,width,trapWidth in [('pain-hornets','pain','NATIVE_HORNET_PROP_ATLAS.json',48,48),('fear-bolts','fear','BOLT_NATIVE_GEOMETRY.json',34,34),('fury-flames','fury','FIRE_JETS_DELIVERY.json',96,120)]:
 meta=json.loads((W/'cqc-pass6-generation'/folder/metaName).read_text());src=Path(meta['source']);assert sha(src)==meta['sha256']
 native=Path(meta['nativeOriginal']);assert native.read_bytes()==src.read_bytes()
 im=Image.open(src);assert im.mode=='RGBA';w,h=im.size;a=np.array(im)[:,:,3]
 rows=meta.get('props',meta.get('selectedViews',meta.get('views')));assert len(rows)==3
 props=[];covered=np.zeros(a.shape,dtype=bool)
 for i,row in enumerate(rows):
  rect=row.get('rect',row.get('frame',{}).get('rect'));x,y,pw,ph=rect
  assert min(x,y)>=0 and min(pw,ph)>0 and x+pw<=w and y+ph<=h
  covered[y:y+ph,x:x+pw]=True
  props.append({'id':row.get('id','native-view-'+str(i+1)),'rect':rect,'displayWidth':width,'trapWidth':trapWidth})
 outside=int(((a>=48)&~covered).sum());edge=int((a[0]>=48).sum()+(a[-1]>=48).sum()+(a[:,0]>=48).sum()+(a[:,-1]>=48).sum())
 assert outside==0 and edge==0,(key,outside,edge)
 target=R/'assets/combat-props'/meta['uid']/(key+'-native-pass6.png');target.parent.mkdir(parents=True,exist_ok=True)
 if target.exists():assert sha(target)==sha(src)
 else:shutil.copyfile(src,target)
 delivery=json.loads((W/'cqc-pass6-generation'/folder/'FINAL_DELIVERY.json').read_text())
 refs=meta.get('sourceReferences',delivery.get('review',{}).get('sources',[]))
 catalog[key]={'uid':meta['uid'],'file':target.relative_to(R).as_posix(),'sha256':sha(src),'bytes':src.stat().st_size,'width':w,'height':h,'props':props,'sources':portable(refs),'limits':meta['limits'],'fidelityStatus':'closest_supported','absolute1to1Certified':False}
 proof.append({'id':key,'nativeOriginal':str(native),'source':str(src),'file':target.relative_to(R).as_posix(),'sha256':sha(src),'dimensions':[w,h],'nativeBytesUnmodified':True,'opaqueAlpha48OutsideCrops':outside,'opaqueAlpha48AtCanvasEdges':edge,'sourcePhysicallyReviewed':True,'props':props})
for target,text in [(R/'data/combat-prop-catalog-pass6.json',json.dumps(catalog,ensure_ascii=False,indent=2)+'\n'),(R/'src/cqc-pass6-prop-data.js','/* Byte-exact native MGS3 props; crops select Canvas source pixels only. */\nwindow.CQC_PASS6_PROP_CATALOG = '+json.dumps(catalog,ensure_ascii=False,separators=(',',':'))+';\n'),(W/'cqc-pass6-native-prop-import.json',json.dumps({'schema':'cqc.pass6.native-prop-import/1','status':'passed','atlases':3,'views':9,'props':proof},ensure_ascii=False,indent=2)+'\n')]:
 with target.open('x')as handle:handle.write(text)
print(json.dumps({'status':'passed','nativeAtlases':3,'sourceViews':9,'opaqueOutsideCrops':0,'nativeBytesUnmodified':True}))
