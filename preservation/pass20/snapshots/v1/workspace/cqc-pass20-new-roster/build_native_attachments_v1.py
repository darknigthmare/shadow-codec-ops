"""Source-pixel sockets only. No PNG edits or generic human muzzle substitutes."""
from pathlib import Path
import json,hashlib
WORK=Path('/workspace/cqc-pass20-new-roster');APP=Path('/tmp/cqc-pass19-application/public/cqc')
sources={
 'pass19__mastiff_mgr':{'right':(13,[608,957]),'left':(13,[451,879])},
 'pass19__slider_mgr':{'right':(9,[947,647]),'left':(9,[457,620])}}
rows={}
for uid,sides in sources.items():
 rows[uid]={'uid':uid,'schema':'cqc.pass20.native-ug-attachment/1','sourcePixelsTransformed':False,'absoluteCanonicalAttachmentCertified':False,'qualification':'Reviewed endpoints of the visible native shoulder grenade tube or wing missile tip in the active native firing painting. Coordinates are source-local 2D gameplay sockets; neither original 3D model sockets nor certified canonical ballistics are claimed.','sides':{}}
 for side,(index,point) in sides.items():
  layout=json.loads((WORK/'generation'/uid/(side+'-native-layout-v1.json')).read_text());raw=layout['poses'][index]
  rect=raw['rect'];pivot=raw['pivot'][:]
  if uid.endswith('slider_mgr'):
   center=698 if side=='right' else 588;pivot[0]=round((center-rect[0])/rect[2],6)
  fraction=[round((point[0]-rect[0])/rect[2],6),round((point[1]-rect[1])/rect[3],6)]
  assert all(0<=v<=1 for v in fraction)
  rows[uid]['sides'].setdefault(side,{})[str(index)]={'side':side,'physicalPoseIndex':index,'file':f'assets/combat-sprites-pass20-roster/{uid}/{side}-v1.png','sourceSHA256':layout['sha256'],'nativePixelPoint':point,'frameFraction':fraction,'rect':rect,'pivot':pivot,'attachmentKind':'wing-missile-tip' if uid.endswith('slider_mgr') else 'shoulder-grenade-tube','recommendedWorldDirection':[1 if side=='right' else -1,0],'absoluteCanonicalAttachmentCertified':False}
report={'schema':'cqc.pass20.native-ug-attachments/1','entries':rows}
text='/* Reviewed native Mastiff and Slider projectile endpoints. PNG bytes stay intact. */\n(function(root){\'use strict\';root.CQC_PASS20_ATTACHMENTS='+json.dumps(report,separators=(',',':'))+';})(globalThis);\n'
target=APP/'src/cqc-pass20-roster-anchors.js';assert not target.exists();target.write_text(text)
(WORK/'NATIVE_UG_ATTACHMENTS_SOURCE_PINS_V1.json').write_text(json.dumps(report,indent=2))
print(str(target),hashlib.sha256(target.read_bytes()).hexdigest())
