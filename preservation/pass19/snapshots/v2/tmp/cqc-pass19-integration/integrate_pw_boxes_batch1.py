from pathlib import Path
import json,hashlib,os,tempfile
APP=Path('/tmp/cqc-pass19-application');CQC=APP/'public/cqc';SRC=CQC/'src';OUT=Path('/tmp/cqc-pass19-integration');root=Path('/tmp/cqc-pass19-pw-box-generation/candidates/batch-0001');p=root/'APPROVED_NATIVE_PW_BOX_PROGRESS_V1.json'
assert hashlib.sha256(p.read_bytes()).hexdigest()=='4251b9dc1528ffdd7c32773e30ad7882eb6f33b4f7b9be74c8547f792bba6acb'
x=json.load(open(p));rows=[]
def sha(b):return hashlib.sha256(b).hexdigest()
def write(p,b):
 old=p.read_bytes() if p.exists() else None;fd,t=tempfile.mkstemp(dir=p.parent)
 with os.fdopen(fd,'wb')as f:f.write(b)
 os.replace(t,p);rows.append({'path':str(p.relative_to(APP)),'sourceSHA256':sha(old)if old else None,'outputSHA256':sha(b),'bytes':len(b)})
cat=Path(x['candidateCatalog']['path']);b=cat.read_bytes();assert sha(b)==x['candidateCatalog']['sha256'];write(SRC/cat.name,b)
for item in x['items']:
 for pin,rel in zip(item['sourcePins'],item['files']):
  s=Path(pin['source']);assert sha(s.read_bytes())==pin['sha256'];target=CQC/rel;target.parent.mkdir(parents=True,exist_ok=True)
  if target.exists():assert sha(target.read_bytes())==pin['sha256']
  else:os.link(s,target)
  rows.append({'path':str(target.relative_to(APP)),'outputSHA256':pin['sha256'],'bytes':pin['bytes'],'operation':'new-immutable-native-art-link'})
for html in ['unified-versus-v055.html','core-v032.html']:
 p=CQC/'modules'/html;s=p.read_text();a='<script src="../src/cqc-pass19-survive-sprite-catalog-v2.js"></script>';assert s.count(a)==1;s=s.replace(a,a+'\n<script src="../src/cqc-pass19-pw-box-sprite-catalog.js"></script>');write(p,s.encode())
write(SRC/'cqc-pass19-combat-additions.js',(OUT/'cqc-pass19-combat-additions.js').read_bytes())
receipt={'schema':'cqc.pass19.pw-box-native-integration/1','status':'applied-awaiting-browser-match-qa','addedUIDs':x['approvedNativeUIDs'],'physicalPoses':x['approvedPhysicalPoses'],'files':rows,'humanOperatorsRemainBiological':True,'baselinePixelsChanged':False}
p=OUT/'PW_BOXES_NATIVE_ATOMIC_INTEGRATION_ACTUAL_V1.json'
with p.open('x') as f:json.dump(receipt,f,indent=2,ensure_ascii=False)
print(json.dumps({'receipt':str(p),'sha256':sha(p.read_bytes()),'uids':receipt['addedUIDs']}))
