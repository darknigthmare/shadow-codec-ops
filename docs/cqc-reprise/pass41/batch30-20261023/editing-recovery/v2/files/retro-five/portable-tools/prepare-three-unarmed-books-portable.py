# Public editable variant: consumes logical native PNG aliases from the declared art tree.
# Original generated output lookup IDs are deliberately absent; all PNG bytes remain pinned by the source inventory.
"""Pin native source bytes and explicitly own the physically inspected body components.
No PNG pixels are edited. Every alpha>16 connected component must have exactly one owner.
The literal main component IDs below were read from inspected source inventory, never nearest-assigned.
"""
from pathlib import Path
from PIL import Image
from scipy.ndimage import label, find_objects
import numpy as np
import hashlib,json,shutil
base=Path('@PROJECT_ROOT@');out=base/'retro-five'
jobs={
 'roster50__mei_mgs1': [('right','right-v1.png',[1,4,2,3,10,8,9,11,18,19,17,16,23,24,27,26]),('left','left-v1.png',[1,4,2,3,14,11,12,16,24,27,22,21,31,32,36,33])],
 'roster50__nastasha_mgs1': [('right','right-v1.png',[1,4,3,2,12,10,11,13,18,19,17,16,23,24,26,25]),('left','left-v1.png',[1,4,2,3,32,24,26,35,45,46,44,43,50,51,58,53])],
 'roster50__emma_mgs2': [('right','right-v1.png',[1,2,3,5,13,11,12,14,25,26,24,23,30,31,35,33]),('left','left-v1.png',[1,2,4,3,8,6,7,9,16,18,15,14,21,22,24,23])]
}
report=[]
for uid,pages in jobs.items():
 b={'schema':'cqc.p40.explicit-source-ownership-candidate/1','uid':uid,'id':'retro-msx','label':'Rétro','approved':False,'sources':[],'limitations':['32 independently drawn native retro figures; no filter, pixel reduction or mirrored reuse.','Identity clothing anchored to exact-era visible retail art; unseen action surfaces remain CQC 2D interpretation.','Role11 radio gesture/role12 recovery are explicitly unarmed action adaptations; no invented firearm.','Geometry ownership does not approve anatomy, fidelity, axes, source points, framing, phase semantics or runtime readiness.']}
 for side,n,mainids in pages:
  src=base/'art'/uid/'retro-msx'/n;raw=src.read_bytes();im=Image.open(src);ls,_=label(np.asarray(im.getchannel('A'))>16,np.ones((3,3),dtype=np.int8));regions=find_objects(ls);sizes={i:int((ls[r]==i).sum())for i,r in enumerate(regions,1)if r};assert len(mainids)==len(set(mainids))==16;assert {k for k,v in sizes.items()if v>100}==set(mainids)
  components={i:[r[1].start,r[0].start,r[1].stop,r[0].stop]for i,r in enumerate(regions,1)if r}
  # The alpha singleton fragments physically sit on/inside their same-body bounding box.
  # Only containment in exactly ONE explicit body rectangle expanded by3px is accepted.
  ownership={k:[k]for k in mainids};unresolved=[]
  for cid,(x0,y0,x1,y1)in components.items():
   if cid in ownership:continue
   owners=[k for k in mainids if components[k][0]-3<=x0 and components[k][1]-3<=y0 and components[k][2]+3>=x1 and components[k][3]+3>=y1]
   if uid=='roster50__emma_mgs2' and side=='right' and cid==32:
    # Explicit physical review: this isolated brown hair pixel belongs to role12 topknot, not role8 foot.
    assert [x0,y0,x1,y1]==[204,1005,205,1006] and owners==[25,30];owners=[30]
   if len(owners)!=1:unresolved.append({'componentID':cid,'bounds':[x0,y0,x1,y1],'candidateOwners':owners,'size':sizes[cid]});continue
   ownership[owners[0]].append(cid)
  if unresolved:raise SystemExit(json.dumps({'uid':uid,'side':side,'unresolved':unresolved}))
  p=base/'art'/uid/'retro-msx'/f'{side}-v1.png';p.parent.mkdir(parents=True,exist_ok=True)
  if p.exists():assert p.read_bytes()==raw
  else:shutil.copyfile(src,p)
  b['sources'].append({'path':str(p),'bytes':len(raw),'sha256':hashlib.sha256(raw).hexdigest(),'dimensions':list(im.size),'poses':[{'name':f'{side}-role-{role:02d}','side':side,'semanticPoseIndex':role,'componentIDs':ownership[cid],'candidateUsage':'proposed','holdReasons':[]}for role,cid in enumerate(mainids)]})
 f=out/uid/'OWNERSHIP_BOOK_CANDIDATE_V1.json';f.parent.mkdir(parents=True,exist_ok=True);encoded=json.dumps(b,indent=2)+'\n'
 if f.exists():assert f.read_text()==encoded
 else:f.write_text(encoded)
 report.append({'uid':uid,'book':str(f),'sha256':hashlib.sha256(f.read_bytes()).hexdigest(),'sourceCount':len(b['sources']),'physicalRoles':32,'approved':False,'runtimeAdmitted':False})
(out/'THREE_UNARMED_SOURCEBOOKS_CANDIDATE_ACTUAL_V1.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report,indent=2))
