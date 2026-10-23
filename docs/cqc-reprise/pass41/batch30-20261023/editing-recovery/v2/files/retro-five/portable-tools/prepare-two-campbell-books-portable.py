# Public editable variant: consumes logical native PNG aliases from the declared art tree.
# Original generated output lookup IDs are deliberately absent; all PNG bytes remain pinned by the source inventory.
"""Prepare unapproved same-era native retro sources; no PNG edits, mirrors, or inherited approval."""
from pathlib import Path
from PIL import Image
from scipy.ndimage import label, find_objects
import numpy as np
import hashlib,json,shutil
base=Path('@PROJECT_ROOT@');out=base/'retro-five'
# Explicit row-major native body component IDs physically inspected before these associations.
jobs={
 'roster50__campbell_mg2':[
 ('right','right-main-v1.png','right-main-v1.png',[1,2,3,4,17,14,15,23,35,38,34,33,47,50,58,51],list(range(16)),[9,11,12]),
 ('left','left-main-v1.png','left-main-v1.png',[1,4,2,3,23,20,21,25,32,34,30,28,47,48,51,49],list(range(16)),[9,11,12]),
 ('right','right-weapon-v1.png','right-weapon-v1.png',[1,2,3,4],[9,11,12,None],[]),
 ('left','left-weapon-v1.png','left-weapon-v1.png',[1,2,13,12],[9,11,12,None],[])],
 'roster50__campbell_mgs1':[
 ('right','right-main-v1.png','right-main-v1.png',[3,7,4,5,17,14,15,16,24,22,25,23,38,39,45,43],list(range(16)),[0,1,2,3]),
 ('right','right-idle-walk-v2.png','right-idle-walk-v2.png',[1,2,6,7],[0,1,2,3],[]),
 ('left','left-main-v4.png','left-main-v4.png',[1,4,2,3,15,12,13,16,30,28,29,31,44,45,52,50],list(range(16)),[])]}
report=[]
for uid,pages in jobs.items():
 b={'schema':'cqc.p40.explicit-source-ownership-candidate/1','uid':uid,'id':'retro-msx','label':'Rétro','approved':False,'sources':[],'limitations':['Complete independently drawn native retro reinterpretation of same historical identity; no pixel filtering or mirrored reuse.','Same-era weapons added solely as original CQC gameplay adaptation to preserve inherited combat profile; no canonical Campbell weapon ownership claim.','Exact retail pixel fidelity, unseen body surfaces and all mode integration are not certified.','MGS1 current right firing art is an unsuppressed SOCOM interpretation while left has suppressor/LAM; requires Root equipment decision or source correction before admission.','No source framing, body axes, native weapon points, anatomy or actual combat approval is conferred.']}
 for side,logical,n,mainids,roles,held in pages:
  src=base/'art'/uid/'retro-msx'/n;raw=src.read_bytes();im=Image.open(src);ls,_=label(np.asarray(im.getchannel('A'))>16,np.ones((3,3),dtype=np.int8));regions=find_objects(ls);sizes={i:int((ls[r]==i).sum())for i,r in enumerate(regions,1)if r};assert len(mainids)==len(set(mainids))==len(roles);assert {k for k,v in sizes.items()if v>100}==set(mainids)
  c={i:[r[1].start,r[0].start,r[1].stop,r[0].stop]for i,r in enumerate(regions,1)if r};ownership={k:[k]for k in mainids};unresolved=[]
  for cid,(x0,y0,x1,y1)in c.items():
   if cid in ownership:continue
   owners=[k for k in mainids if c[k][0]-3<=x0 and c[k][1]-3<=y0 and c[k][2]+3>=x1 and c[k][3]+3>=y1]
   if len(owners)!=1:unresolved.append({'componentID':cid,'bounds':[x0,y0,x1,y1],'candidateOwners':owners,'size':sizes[cid]});continue
   ownership[owners[0]].append(cid)
  if unresolved:raise SystemExit(json.dumps({'uid':uid,'side':side,'logical':logical,'unresolved':unresolved}))
  p=base/'art'/uid/'retro-msx'/logical;p.parent.mkdir(parents=True,exist_ok=True)
  if p.exists():assert p.read_bytes()==raw
  else:shutil.copyfile(src,p)
  poses=[]
  for order,(cid,role)in enumerate(zip(mainids,roles)):
   name=f'{side}-role-{role:02d}' if role is not None else f'{side}-neutral-calibration'
   usage='proposed';reasons=[];semantic=role
   if role in held:
    semantic=None;usage='held-unmapped';reasons=['Replaced by a separately drawn matching action source; retain original pixels unmodified.']
    if role==0:usage='calibration-only';reasons=[]
   elif role is None:usage='calibration-only'
   poses.append({'name':name,'side':side,'semanticPoseIndex':semantic,'componentIDs':ownership[cid],'candidateUsage':usage,'holdReasons':reasons})
  b['sources'].append({'path':str(p),'bytes':len(raw),'sha256':hashlib.sha256(raw).hexdigest(),'dimensions':list(im.size),'poses':poses})
 d=out/uid;d.mkdir(exist_ok=True);f=d/'OWNERSHIP_BOOK_CANDIDATE_V1.json';encoded=json.dumps(b,indent=2)+'\n';assert not f.exists();f.write_text(encoded);report.append({'uid':uid,'book':str(f),'sha256':hashlib.sha256(f.read_bytes()).hexdigest(),'physicalDrawings':sum(len(s['poses'])for s in b['sources']),'selectedRoles':sum(1 for s in b['sources']for p in s['poses']if isinstance(p['semanticPoseIndex'],int)),'approved':False})
(out/'TWO_CAMPBELL_SOURCEBOOKS_CANDIDATE_ACTUAL_V1.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report,indent=2))
