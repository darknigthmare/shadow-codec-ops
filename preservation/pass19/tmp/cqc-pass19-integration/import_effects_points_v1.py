import pathlib,json,hashlib,os,tempfile
APP=pathlib.Path('/tmp/cqc-pass19-application');SRC=APP/'public/cqc/src';I=pathlib.Path('/tmp/cqc-pass19-integration');sha=lambda b:hashlib.sha256(b).hexdigest();rows=[]
def write(p,b):
 old=p.read_bytes() if p.exists() else None;fd,t=tempfile.mkstemp(dir=p.parent)
 with os.fdopen(fd,'wb')as f:f.write(b)
 os.replace(t,p);rows.append({'path':str(p.relative_to(APP)),'inputSHA256':sha(old)if old else None,'outputSHA256':sha(b),'bytes':len(b)})
p=pathlib.Path('/tmp/cqc-pass19-new-effects/NEW_EFFECTS_DELIVERY_V1.json');assert sha(p.read_bytes())=='b316d8aeb1307249e8fe87e97aa63a63b9a9d86e161788ad7fc3754764ba53f4';j=json.loads(p.read_bytes());names=['cqc-pass19-smoke-mechanics.js','cqc-pass19-new-vfx-catalog.js','cqc-pass19-new-vfx-routes.js']
for row in j['files']:
 if row['name'] not in names:continue
 b=(p.parent/row['name']).read_bytes();assert sha(b)==row['sha256'] and len(b)==row['bytes'];write(SRC/row['name'],b)
p=SRC/'cqc-pass19-machine-source-points.js';assert sha(p.read_bytes())=='d429d8dd496a7f9d10f09ab96647bcc1aa1e32f7a1506c533d65d3cd86d58d67';b=pathlib.Path('/tmp/cqc-pass19-gekko-generation/integration-candidate-v3/src/cqc-pass19-machine-source-points.js').read_bytes();assert sha(b)=='27e8a93ffa81378e4819952cb67861a2d7fc11ccb187133b5e93741b266f9727';write(p,b)
for html in ['unified-versus-v055.html','core-v032.html']:
 p=APP/'public/cqc/modules'/html;s=p.read_text()
 def rep(a,b):
  global s
  assert s.count(a)==1,(html,a[:70]);s=s.replace(a,b)
 rep('<script src="../src/cqc-pass18-vfx-bridge.js"></script>','<script src="../src/cqc-pass19-new-vfx-catalog.js"></script>\n<script src="../src/cqc-pass18-vfx-bridge.js"></script>\n<script src="../src/cqc-pass19-smoke-mechanics.js"></script>\n<script src="../src/cqc-pass19-new-vfx-routes.js"></script>')
 if html.startswith('unified'):rep('window.CQC_PASS19_ROSTER_NATIVE.install(FIGHTERS);','window.CQC_PASS19_ROSTER_NATIVE.install(FIGHTERS);\nwindow.CQC_PASS19_NEW_EFFECTS.registerFighters(FIGHTERS);')
 write(p,s.encode())
# The engine uses optional hooks at runtime, so the smoke module need only load before its first step.
assert sha((SRC/'cqc-pass8-combat-engine.js').read_bytes())=='b68e4d66e2c99fbc1b26e557557c8e4a51e16de1c2b165c6e3cf33d79b96cd27'
r={'schema':'cqc.pass19.actual-native-effects-integrated/1','status':'applied-awaiting-combined-qa','files':rows,'nativeSourcePNGChanges':0,'physicalVFXFramesAdded':0,'aliasesUseExistingNativeFamilies':True,'smokeHasBoundedNonDamagingCover':True,'spatialPhysicsMathChanged':False}
p=I/'NATIVE_SMOKE_EFFECTS_AND_PINNED_SOURCE_POINTS_ATOMIC_ACTUAL_V1.json'
with p.open('x')as f:json.dump(r,f,ensure_ascii=False,indent=2)
print(json.dumps({'receipt':str(p),'sha256':sha(p.read_bytes())}))
