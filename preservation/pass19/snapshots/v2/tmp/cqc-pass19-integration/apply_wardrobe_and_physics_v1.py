import pathlib,json,hashlib,os,tempfile
A=pathlib.Path('/tmp/cqc-pass19-application/public/cqc');I=pathlib.Path('/tmp/cqc-pass19-integration');L=pathlib.Path('/tmp/cqc-pass19-costume-library');Q=pathlib.Path('/workspace/cqc-pass19-canonical-runtime-qa/guarded-plans-v1');sha=lambda b:hashlib.sha256(b).hexdigest();pending={};baselines={};steps=[]
def source(path):
 if path not in pending:
  pending[path]=path.read_bytes();baselines[path]=pending[path]
 return pending[path]
def apply(row,style,label):
 rel=row.get('relative',row.get('path'));p=A/rel;cur=source(p);pin=row.get('inputSHA256',row.get('expectedSHA256'));original=baselines[p];assert sha(original)==pin,(rel,sha(original),pin)
 operations=row.get('changes',row.get('replacements'));s=cur.decode();reference=original.decode()
 for op in operations:
  old=op.get('old',op.get('before'));new=op.get('new',op.get('after'));assert s.count(old)==op['count'],(label,rel,old,s.count(old));s=s.replace(old,new);assert reference.count(old)==op['count'];reference=reference.replace(old,new)
 expected=row.get('outputSHA256IfExactInputs',row.get('resultSHA256'));assert sha(reference.encode())==expected
 # When another reviewed plan touched the same file, require independent patches commute byte-for-byte.
 if cur!=original:
  prior=next(x for x in steps if x['path']==rel)['operations'];reverse=reference
  for op in prior:
   old=op.get('old',op.get('before'));new=op.get('new',op.get('after'));assert reverse.count(old)==op['count'];reverse=reverse.replace(old,new)
  assert reverse==s,'Reviewed disjoint plans must commute'
 pending[p]=s.encode();steps.append({'plan':label,'path':rel,'originalInputSHA256':pin,'actualInputSHA256':sha(cur),'outputSHA256':sha(pending[p]),'explicitRebase':cur!=original,'operations':operations})
plans=[(Q/'POSE_HIT_AND_SOCKET_FRAME_GUARDED_PLAN_V1.json','b0f8289f6abaa398140dd0b4ff2faca5a925d3af290838179c66918fe31a3dfc'),(Q/'BOX_SIMULATION_UNITS_GUARDED_PLAN_V2.json','6f39050e38f97a4cf228102306bf79b4cd9cfae327b9b3ce9ea28a526b09c616'),(L/'NATIVE_WARDROBE_LAUNCH_PRECONDITION_PLAN_V2.json','b328c1c2bd3710b4219de7069f47346e07e2328f02ab73068170c5021a3a9469')]
for path,pin in plans:
 raw=path.read_bytes();assert sha(raw)==pin
 for row in json.loads(raw)['files']:apply(row,'files',path.name)
p=L/'NATIVE_ACTION_SEMANTICS_PRECONDITION_PLAN_V1.json';raw=p.read_bytes();assert sha(raw)=='ef79bf9beb3dd0f6e0b509b84deae0671180cc79d33a30b96de0715e72fee6ae';apply(json.loads(raw)['renderer'],'renderer',p.name)
libs=[('cqc-pass19-native-wardrobe-index.js',L/'packaged-nextgen-native-published-v1/cqc-pass19-native-wardrobe-index.js','9fed7ae32f181f5ca8310e9cea665d56b4c36df9fb003a718ce2144db3ad1b98'),('cqc-pass19-native-wardrobe-library.js',L/'cqc-pass19-native-wardrobe-library.js','3d77379466fe29e51dac9aaf419ff1c1d0ada61760a29f1589ed583dcacc26a2'),('cqc-pass19-native-wardrobe-static-compat.js',L/'cqc-pass19-native-wardrobe-static-compat.js','99432425497987ee14faad975debc9ebb3e6f466eb8015c1ce118084ed670974'),('cqc-pass19-native-wardrobe-ui.js',L/'cqc-pass19-native-wardrobe-ui.js','77ee8847eee7bca3559b00a2dca1b9f4c670793defb8144e950886211b35cc73'),('cqc-pass19-native-wardrobe-binding.js',L/'cqc-pass19-native-wardrobe-binding.js','3afd8147bff6ee1e6eada9b7389daa510b4e3f806dab463409b6668cde518858'),('cqc-pass19-native-wardrobe-launch.js',L/'cqc-pass19-native-wardrobe-launch.js','54cae110fca9f509d04cb0d1b5fb218cd649d0b7910724eacecb8bccbf4aab32')]
for name,p,pin in libs:
 raw=p.read_bytes();assert sha(raw)==pin;dest=A/'src'/name;assert not dest.exists();pending[dest]=raw
for name,after in [('unified-versus-v055.html','cqc-pass19-native-origins.js'),('core-v032.html','cqc-pass17-core-costumes.js')]:
 p=A/'modules'/name;s=pending[p].decode();marker='<script src="../src/'+after+'"></script>';assert s.count(marker)==1;tags='\n'+'\n'.join('<script src="../src/'+name+'"></script>' for name,_,_ in libs);pending[p]=s.replace(marker,marker+tags).encode()
rows=[]
for p,raw in pending.items():
 if p in baselines:assert p.read_bytes()==baselines[p]
 p.parent.mkdir(parents=True,exist_ok=True);fd,tmp=tempfile.mkstemp(dir=p.parent)
 with os.fdopen(fd,'wb')as f:f.write(raw)
 os.replace(tmp,p);rows.append({'path':str(p.relative_to(A)),'previousSHA256':sha(baselines[p]) if p in baselines else None,'sha256':sha(raw),'bytes':len(raw)})
r={'schema':'cqc.pass19.wardrobe-physics-atomic-integration/1','status':'applied-awaiting-combined-browser-qa','files':rows,'guardedPlanSteps':steps,'assetCommit':'9e6ebfd2e8c1c2a3b38055d55cfa83d78f276e48','disjointPlansRebasedOnlyAfterByteExactCommutativityCheck':True,'sourcePixelsChanged':False}
p=I/'WARDROBE_AND_PHYSICS_ATOMIC_ACTUAL_V1.json';p.write_text(json.dumps(r,indent=2));print(json.dumps({'receipt':str(p),'sha256':sha(p.read_bytes()),'files':rows}))
