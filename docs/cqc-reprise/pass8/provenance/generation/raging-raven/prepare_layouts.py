from pathlib import Path
from PIL import Image
import json,numpy as np
B=Path(__file__).parent
selected={'armor':{'a-right':'A_RIGHT_01','a-left':'A_LEFT_01','b-right':'B_RIGHT_01','b-left':'B_LEFT_01','c-right':'C_RIGHT_03','c-left':'C_LEFT_01'},'beauty':{'a-right':'A_RIGHT_01','a-left':'A_LEFT_01','b-right':'B_RIGHT_01','b-left':'B_LEFT_01','c-right':'C_RIGHT_01','c-left':'C_LEFT_01'}}
for kind,rows in selected.items():
 ground={};heights={};preview={'selected':{},'layouts':{},'scale':{}}
 for key,name in rows.items():
  p=B/kind/'native-attempts'/(name+'.png');d=json.loads((B/kind/'inspections'/(name+'.components.json')).read_text());a=np.array(Image.open(p))[:,:,3];ground[key]={}
  for c in d['cells']:
   x0,y0,x1,y1=c['bbox'];band=a[max(y0,y1-12):y1,x0:x1];ys,xs=np.where(band>80);gx=float(np.median(xs))+x0 if len(xs) else (x0+x1)/2
   gy=y1-1;ground[key][str(c['index'])]=[round(gx,3),gy]
   l,t,w,h=c['frame']['rect'];c['frame']['pivot']=[(gx-l)/w,(gy-t)/h]
   c['pivotBasis']='Median actual alpha>80 boot/body-contact pixels in final12 source rows; body ground excludes broad upper wings. No source pixel edits.'
  # Upright idle/neutral bodies provide the constant per-sheet scale; folded wings
  # are above shoulders and do not create an erroneous wide alpha-centroid pivot.
  indices=[0,1] if key.startswith('a') else [0,1,2] if key.startswith('b') else [8]
  heights[key]=round(sum(d['cells'][i]['bbox'][3]-d['cells'][i]['bbox'][1] for i in indices)/len(indices),3)
  for c in d['cells']:c['artistic_review']='producer-physically-viewed-native-source; completeCanvas physical review pending'
  (B/kind/'layouts'/(key+'.json')).write_text(json.dumps(d,indent=2)+'\n')
  preview['selected'][key]=name;preview['layouts'][key]=d;preview['scale'][key]=heights[key]
 (B/kind/'BODY_GROUND_PIVOTS.json').write_text(json.dumps({'schema':'cqc.pass8.observed-body-pivots/1','standingSourceHeights':heights,'observedBodyPivots':ground,'method':'Read-only measured alpha body/boot ground; upright source height per sheet. Neutral c8 (9th pose) chosen to exclude high opened-wing tips. New2D canvas geometry, not certified original in-game centimetres.'},indent=2)+'\n')
 (B/kind/'preview-data.json').write_text(json.dumps(preview)+'\n')
 html=Path('/workspace/cqc-pass7-generation/raven/preview.html').read_text().replace('Raven PASS7 native Canvas review','Raging '+kind+' PASS8 native Canvas review')
 html=html.replace('220/data.scale[key]','200/data.scale[key]')
 (B/kind/'preview.html').write_text(html)
print(json.dumps({'selected':selected},indent=2))
