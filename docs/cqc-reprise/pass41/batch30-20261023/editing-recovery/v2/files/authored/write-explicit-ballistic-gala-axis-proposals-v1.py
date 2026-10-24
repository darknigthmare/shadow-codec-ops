"""Persist explicit approximate visual body axes; no foot-derived inference."""
from pathlib import Path
import hashlib,json,gzip
R=Path('@PROJECT_ROOT@')
AXES={
 'roster50__campbell_mg2':{
  'right':[150,465,810,340,140,450,790,1090,135,910,750,930,340,455,780,1120],
  'left':[165,475,790,365,185,490,780,1110,205,1060,815,1040,360,495,805,1130]},
 'roster50__campbell_mgs1':{
  'right':[175,545,920,360,160,550,890,1250,175,1010,835,1030,355,535,880,1260],
  'left':[155,480,790,390,185,470,790,1140,205,1095,815,1110,370,425,780,1130]},
 'archive__holly_white':{
  'right':[145,450,795,365,145,480,780,1120,145,1050,775,1000,350,470,805,1125],
  'left':[150,480,780,355,160,470,790,1140,210,1100,825,1050,360,455,810,1130]},
 'roster50__campbell_mgs4':{
  'right':[330,490,815,320,145,490,800,1140,845,905,795,965,330,480,810,865],
  'left':[150,445,780,355,165,480,790,1130,200,970,830,960,350,435,805,1110]},
 'roster50__meiling_mgs4':{
  'right':[140,495,815,350,145,470,800,1150,150,1010,815,1000,330,510,825,1160],
  'left':[340,460,910,375,175,460,780,1150,205,1070,840,1050,375,425,800,1140]}}
out=[]
for uid,axes in AXES.items():
 d=R/'art'/uid/'tuxedo';sp=d/'selected-body-roles-candidate-v1.json';sel=json.loads(sp.read_text());g=json.loads(gzip.decompress((d/'geometry-frozen-v1.json.gz').read_bytes()));poses={p['name']:(s,p)for s in g['sources']for p in s['poses']};rows=[]
 for side in ['right','left']:
  for role,x in enumerate(axes[side]):
   name=sel['selected'][side][str(role)];s,p=poses[name];rect=p['rect'];assert rect[0]<=x<=rect[0]+rect[2],(uid,side,role,x,rect)
   rows.append({'side':side,'role':role,'pose':name,'sourceSHA256':s['sha256'],'sourcePath':s['path'],'rect':rect,'nativeXProposal':x,'qualification':'Approximate manual visual pelvis/central body projection after viewing this unmodified source. Not foot mean, bbox-centre algorithm, anatomical certificate or Root approval. Cane/grenade/weapon extension must not determine body centre.','sourceCoordinateUncertaintyPixels':20,'approved':False})
 q=d/'manual-body-axis-proposals-candidate-v1.json';raw=(json.dumps({'schema':'cqc.p41.manual-body-axis-proposals/1','uid':uid,'id':'tuxedo','approved':False,'runtimeAdmitted':False,'axes':axes,'selectionSHA256':hashlib.sha256(sp.read_bytes()).hexdigest(),'qualification':'32 explicit approximate manual visual body-framing coordinates; native sheets physically viewed, no foot-contact inference. ±20 source px review tolerance, not measurement precision. Root must review exact final job. Weapon origins, period kit adaptation, walk anatomical phase and source body density remain separate checks.','rows':rows},ensure_ascii=False,indent=2)+'\n').encode()
 if q.exists():assert q.read_bytes()==raw
 else:q.write_bytes(raw)
 out.append({'uid':uid,'path':str(q),'bytes':len(raw),'sha256':hashlib.sha256(raw).hexdigest()})
q=R/'authored/FIVE_BALLISTIC_EXPLICIT_AXES_CANDIDATE_V1.json';q.write_text(json.dumps(out,indent=2)+'\n');print(json.dumps(out))
