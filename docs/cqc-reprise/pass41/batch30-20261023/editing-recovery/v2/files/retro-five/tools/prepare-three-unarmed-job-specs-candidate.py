"""Prepare exact-era source specs and32manual visually proposed body-centre x coordinates.
No art approval or runtime mutation. The coordinates are proposals for Root physical review.
"""
from pathlib import Path
import json,hashlib
base=Path('@PROJECT_ROOT@');own=base/'retro-five'
rows={
 'roster50__mei_mgs1':{'ref':'ch04_body.jpg','url':'https://www.konami.com/mg/archive/mgs/character/images/ch04_body.jpg','incarnation':'Mei Ling — original MGS1 Shadow Moses support incarnation, lavender-gray blazer/skirt, high black bun.','axes':{'right':[158,468,804,1136,158,492,800,1115,166,462,805,1160,148,430,800,1142],'left':[173,470,747,1050,180,464,762,1098,168,480,790,1084,178,466,760,1080]}},
 'roster50__nastasha_mgs1':{'ref':'ch05_body.jpg','url':'https://www.konami.com/mg/archive/mgs/character/images/ch05_body.jpg','incarnation':'Nastasha Romanenko — original MGS1 support incarnation; blonde bob, charcoal-gray trouser suit.','axes':{'right':[150,558,954,1387,151,551,946,1358,177,551,1003,1366,160,535,985,1380],'left':[194,550,884,1252,189,551,906,1270,190,553,921,1268,200,538,882,1265]}},
 'roster50__emma_mgs2':{'ref':'emma_j.jpg','url':'https://www.metalgearsolid.be/images/emma_j.jpg','incarnation':'Emma Emmerich — original MGS2 Big Shell scientist, pink/black raglan shirt, black shorts, pink high-top shoes and tied brown hair with red chopsticks.','axes':{'right':[162,485,803,1120,163,474,793,1126,173,491,824,1146,156,450,810,1130],'left':[150,468,797,1143,186,486,809,1113,199,510,813,1120,183,490,797,1140]}}
}
report=[]
for uid,item in rows.items():
 d=own/uid;ref=own/'references'/item['ref'];b=ref.read_bytes()
 spec={'uid':uid,'id':'retro-msx','label':'Rétro','family':'retro','geometryPath':str(d/'GEOMETRY_CANDIDATE_V1.json.gz'),'ownershipBookPath':str(d/'OWNERSHIP_BOOK_CANDIDATE_V1.json'),'output':str(base/'integration'/'retro-five'/uid/'job-proposal-v1'),'provenance':{'kind':'style-reinterpretation','sourceUID':uid,'sourceSpriteUID':uid,'originalDesign':True,'canonicalAppearanceAttested':False,'incarnation':item['incarnation'],'sources':[{'url':item['url'],'sha256':hashlib.sha256(b).hexdigest(),'scope':'Physically inspected exact-era original character art; identity, visible costume and palette. Newly drawn native retro CQC adaptation, not original retail sprite recovery or certification of unseen surfaces.'}]},'calibrationPoses':{str(base/'art'/uid/'retro-msx'/f'{side}-v1.png'):{side:f'{side}-role-00'}for side in ['right','left']},'anchors':[]}
 axes={'schema':'cqc.pass41.manual-body-axis-proposals/1','approved':False,'axes':item['axes'],'qualification':'Artist manually supplied source body/pelvis centre x proposals after inspecting the generated drawings. These are 2D framing choices requiring Root exact-job visual review; not anatomical measurements, inferred foot contacts or art approval.'}
 for name,value in [('SOURCE_SELECTION_SPEC_CANDIDATE_V1.json',spec),('MANUAL_AXIS_CHOICES_CANDIDATE_V1.json',axes)]:
  p=d/name;assert not p.exists();p.write_text(json.dumps(value,indent=2)+'\n')
 report.append({'uid':uid,'spec':str(d/'SOURCE_SELECTION_SPEC_CANDIDATE_V1.json'),'axes':str(d/'MANUAL_AXIS_CHOICES_CANDIDATE_V1.json'),'approved':False})
p=own/'THREE_UNARMED_JOB_SPECS_CANDIDATE_ACTUAL_V1.json';p.write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report,indent=2))
