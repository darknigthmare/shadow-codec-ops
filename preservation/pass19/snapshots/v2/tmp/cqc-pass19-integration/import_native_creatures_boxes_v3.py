import pathlib,json,hashlib,os,tempfile
APP=pathlib.Path('/tmp/cqc-pass19-application');CQC=APP/'public/cqc';SRC=CQC/'src';I=pathlib.Path('/tmp/cqc-pass19-integration'); sha=lambda b:hashlib.sha256(b).hexdigest(); rows=[]
def write(p,b):
 old=p.read_bytes() if p.exists() else None;fd,t=tempfile.mkstemp(dir=p.parent)
 with os.fdopen(fd,'wb')as f:f.write(b)
 os.replace(t,p);rows.append({'path':str(p.relative_to(APP)),'inputSHA256':sha(old) if old else None,'outputSHA256':sha(b),'bytes':len(b)})
for hand,pin in [('/tmp/cqc-pass19-survive-generation/NATIVE_SURVIVE_HANDOFF_V3.json',None),('/tmp/cqc-pass19-pw-box-generation/candidates/batch-0002/APPROVED_NATIVE_PW_BOX_PROGRESS_V1.json','bebf7084eabe39d80c8d99124ae630d745f104a5b580ad9f88fed8baf884fbd3')]:
 p=pathlib.Path(hand);h=json.loads(p.read_bytes());assert not pin or sha(p.read_bytes())==pin
 cat=h['candidateCatalog'];b=pathlib.Path(cat['path']).read_bytes();assert sha(b)==cat['sha256'] and len(b)==cat['bytes'];write(SRC/pathlib.Path(cat['path']).name,b)
 for item in h['items']:
  pins=item['sourcePins'];pins=[pins[x] for x in ['right','left']] if isinstance(pins,dict) else pins
  for p,rel in zip(pins,item['files']):
   source=pathlib.Path(p['source']);b=source.read_bytes();assert sha(b)==p['sha256'] and len(b)==p['bytes'];dest=CQC/rel;dest.parent.mkdir(parents=True,exist_ok=True)
   if dest.exists():assert sha(dest.read_bytes())==p['sha256']
   else:os.link(source,dest)
   rows.append({'path':str(dest.relative_to(APP)),'outputSHA256':p['sha256'],'bytes':len(b),'operation':'immutable-native-art-link'})
for html in ['core-v032.html','unified-versus-v055.html']:
 p=CQC/'modules'/html;s=p.read_text();old='cqc-pass19-survive-sprite-catalog-v2.js';assert s.count(old)+s.count('cqc-pass19-survive-sprite-catalog-v3.js')==1;s=s.replace(old,'cqc-pass19-survive-sprite-catalog-v3.js');write(p,s.encode())
p=SRC/'cqc-pass19-combat-additions.js';s=p.read_text();old="f.archetype='heavy';f.speed=.69;f.power=1.19;f.visual.body='heavy';";assert s.count(old)==1;s=s if 'c.simulationBody={width:210,height:480,crouchHeight:285};' in s else s.replace(old,old+"\n    c.simulationBody={width:210,height:480,crouchHeight:285};");write(p,s.encode())
p=SRC/'cqc-pass19-box-cannon-anchors.js';s=p.read_text();a=s.index('={')+1;d,end=json.JSONDecoder().raw_decode(s[a:]);anchor=pathlib.Path('/tmp/cqc-pass19-pw-box-generation/candidates/BOX_CANNON_SOURCE_ANCHORS_pass19__box_tank_smoke_pw-pass19__box_tank_stun_pw_V1.json');b=anchor.read_bytes();assert sha(b)=='cfeb0339c78b17d263398b5a9ef8bec5ce222299081ed75691ab0b5c14b8cd1f'
for x in json.loads(b)['items']:
 x['sourceSHA256']=x['sha256'];d['entries'].setdefault(x['uid'],{'sides':{}})['sides'].setdefault(x['side'],{})[str(x['physicalPoseIndex'])]=x
write(p,('/* Reviewed native cardboard cannon attachments. */\n(function(root){root.CQC_PASS19_BOX_ATTACHMENTS='+json.dumps(d,separators=(',',':'))+';})(globalThis);\n').encode())
receipt={'schema':'cqc.pass19.additional-native-integration/3','status':'applied-awaiting-new-mechanics-qa','files':rows,'surviveUIDs':5,'pwBoxUIDs':8,'physicalPoses':416,'nativeDirections':26,'qualification':'Only visible referenced bodies produced; giant height is display estimate, not official. Smoke gameplay requires separate integration before release. Existing art preserved.'}
p=I/'NATIVE_CREATURES_BOXES_ADDITIONAL_ATOMIC_ACTUAL_V3.json'
with p.open('x')as f:json.dump(receipt,f,ensure_ascii=False,indent=2)
print(json.dumps({'receipt':str(p),'sha256':sha(p.read_bytes()),'files':len(rows)}))
