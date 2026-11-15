"""Persist explicit visual framing choices after viewing unmodified native art.

These coordinates are deliberately approximate, unapproved 2D framing proposals;
they are not medical/anatomical measurements or inferred from foot contacts.
"""
from pathlib import Path
import hashlib,json,gzip
R=Path('@PROJECT_ROOT@')
AXES={
 'roster50__mei_mgs1':{
  'right':[360,555,860,955,195,550,865,1200,190,530,850,1205,360,535,880,900],
  'left':[350,475,780,940,170,470,780,1120,195,505,820,1100,340,450,805,990]},
 'roster50__nastasha_mgs1':{
  'right':[340,495,815,925,165,490,805,1135,165,450,795,1120,340,500,805,900],
  'left':[320,455,775,970,155,455,790,1140,190,490,815,1110,340,420,820,990]},
 'roster50__rose_mgs2':{
  'right':[350,535,890,930,185,535,865,1225,165,530,865,1200,370,530,870,900],
  'left':[340,465,790,930,175,465,790,1140,215,500,830,1120,380,420,775,950]},
 'roster50__otacon_mgs4':{
  'right':[320,490,845,950,150,480,805,1145,175,495,820,1135,330,520,850,900],
  'left':[325,465,785,900,170,470,780,1150,195,480,815,1110,355,440,810,970]}}
out=[]
for uid,axes in AXES.items():
 d=R/'art'/uid/'tuxedo';sp=d/'selected-body-roles-candidate-v1.json';sel=json.loads(sp.read_text());g=json.loads(gzip.decompress((d/'geometry-frozen-v1.json.gz').read_bytes()));poses={p['name']:(s,p)for s in g['sources']for p in s['poses']};rows=[]
 for side in ['right','left']:
  for role,x in enumerate(axes[side]):
   name=sel['selected'][side][str(role)];s,p=poses[name];rect=p['rect'];assert rect[0]<=x<=rect[0]+rect[2]
   rows.append({'side':side,'role':role,'pose':name,'sourceSHA256':s['sha256'],'sourcePath':s['path'],'rect':rect,'nativeXProposal':x,'qualification':'Approximate manual visual choice of pelvis/central body projection on the physically viewed unmodified native sheet. Not foot mean, bbox-centre algorithm, anatomical certificate or Root approval. Grounded/airborne/KO postures need actual renderer counterreview.','sourceCoordinateUncertaintyPixels':20,'approved':False})
 q=d/'manual-body-axis-proposals-candidate-v1.json';raw=(json.dumps({'schema':'cqc.p41.manual-body-axis-proposals/1','uid':uid,'id':'tuxedo','approved':False,'runtimeAdmitted':False,'axes':axes,'selectionSHA256':hashlib.sha256(sp.read_bytes()).hexdigest(),'qualification':'32 explicit approximate manual visual body-framing coordinates. All relevant native sheets physically viewed; no foot-contact inference. ±20 source px stated as review tolerance, not measurement precision. Root must review exact final job; source body density and action-map semantics remain separate.','rows':rows},ensure_ascii=False,indent=2)+'\n').encode()
 if q.exists():assert q.read_bytes()==raw
 else:q.write_bytes(raw)
 out.append({'uid':uid,'path':str(q),'bytes':len(raw),'sha256':hashlib.sha256(raw).hexdigest()})
q=R/'authored/FOUR_PURE_EXPLICIT_AXES_CANDIDATE_V1.json';q.write_text(json.dumps(out,indent=2)+'\n');print(json.dumps(out))
