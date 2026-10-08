import pathlib,json,hashlib,os,tempfile
A=pathlib.Path('/tmp/cqc-pass19-application/public/cqc');I=pathlib.Path('/tmp/cqc-pass19-integration');T=pathlib.Path('/tmp/cqc-pass19-tuxedo-generation');W=pathlib.Path('/tmp/cqc-pass19-authored-wardrobe');sha=lambda b:hashlib.sha256(b).hexdigest();rows=[];pending={}
def store(p,raw):
 assert p not in pending
 if p.exists():assert p.read_bytes()==raw;return
 pending[p]=raw
p=T/'TUXEDO_FOUR_NATIVE_DELIVERY_MANIFEST_V1.json';b=p.read_bytes();assert sha(b)=='f08c3f1ebf12d8b28e82e76d70f0d9af1c4892cb47c927419cf7bbe1559f75e5';t=json.loads(b)
for pin in t['assets']:
 p=pathlib.Path(pin['sourcePath']);b=p.read_bytes();assert sha(b)==pin['sha256'] and len(b)==pin['bytes'];store(A/pin['destinationRelativeToCQC'],b)
m=t['module'];b=pathlib.Path(m['path']).read_bytes();assert sha(b)==m['sha256'];store(A/m['destinationRelativeToCQC'],b)
p=W/'TRIO_NATIVE_COMPLETE_DELIVERY_V1.json';b=p.read_bytes();assert sha(b)=='067a71445412bcfa3ff1d6b0d9ce8bb5d916d2d3c06e2cf4ac7907c9993f54a4';batch=json.loads(b);extra=[]
for item in batch['individualCostumes']:
 p=pathlib.Path(item['delivery']);b=p.read_bytes();assert sha(b)==item['deliverySHA256'];d=json.loads(b);p=pathlib.Path(item['option']['source']);b=p.read_bytes();assert sha(b)==item['option']['sha256'];extra.append({'uid':item['uid'],'option':json.loads(b)})
 for a in d['artifacts']:
  b=pathlib.Path(a['source']).read_bytes();assert len(b)==a['bytes'] and sha(b)==a['sha256'];store(A/a['destinationRelativeToCQC'],b)
p=A/'src/cqc-pass19-original-costumes.js';old=p.read_bytes();s=old.decode();start=s.index('const additions=')+len('const additions=');add,end=json.JSONDecoder().raw_decode(s[start:]);assert len(add)==4;assert not {x['uid']+':'+x['option']['id'] for x in add}&{x['uid']+':'+x['option']['id'] for x in extra};add.extend(extra);pending[p]=(s[:start]+json.dumps(add,ensure_ascii=False,separators=(',',':'))+s[start+end:]).encode()
for name in ['core-v032.html','unified-versus-v055.html']:
 p=A/'modules'/name;old=p.read_bytes();s=old.decode();marker='<script src="../src/cqc-pass19-original-costumes.js"></script>';assert s.count(marker)==1;pending[p]=s.replace(marker,marker+'\n<script src="../src/cqc-pass19-native-tuxedo-costumes.js"></script>').encode()
for p,b in pending.items():
 previous=p.read_bytes() if p.exists() else None;p.parent.mkdir(parents=True,exist_ok=True);fd,tmp=tempfile.mkstemp(dir=p.parent)
 with os.fdopen(fd,'wb') as f:f.write(b)
 os.replace(tmp,p);rows.append({'path':str(p.relative_to(A)),'previousSHA256':sha(previous) if previous else None,'sha256':sha(b),'bytes':len(b)})
r={'schema':'cqc.pass19.seven-new-native-costumes-integration/1','status':'applied-awaiting-actual-matches','approvedNativeCostumesAdded':7,'tuxedoCostumes':4,'trioCostumes':3,'physicalPoses':294,'sourcePixelsChanged':False,'newNativePNGs':22,'files':rows}
p=I/'TUXEDO_TRIO_ATOMIC_ACTUAL_V1.json'
with p.open('x')as f:json.dump(r,f,indent=2)
print(json.dumps({'receipt':str(p),'sha256':sha(p.read_bytes()),'files':len(rows)}))
