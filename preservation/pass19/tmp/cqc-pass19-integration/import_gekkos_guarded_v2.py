import pathlib,json,hashlib,os,tempfile
APP=pathlib.Path('/tmp/cqc-pass19-application');SRC=APP/'public/cqc/src';I=pathlib.Path('/tmp/cqc-pass19-integration');sha=lambda b:hashlib.sha256(b).hexdigest();p=pathlib.Path('/tmp/cqc-pass19-gekko-generation/integration-candidate/GUARDED_APP_INTEGRATION_PLAN_V2.json');j=json.loads(p.read_bytes());prepared=[];rows=[]
for r in [j['bridgeReplacement']]+j['additionFiles']+j['nativeSources']:
 dest=pathlib.Path(r['destination']);assert dest.is_relative_to(APP);source=pathlib.Path(r['candidate']);b=source.read_bytes();assert sha(b)==r['candidateSHA256'];before=r.get('expectedBeforeSHA256');assert (sha(dest.read_bytes()) if dest.exists() else None)==before;prepared.append((r,dest,source,b))
r=j['existingRendererGuard'];assert sha(pathlib.Path(r['path']).read_bytes())==r['sha256'];assert not j['rendererReplacementNeeded']
def write(p,b):
 old=p.read_bytes() if p.exists() else None;fd,tmp=tempfile.mkstemp(dir=p.parent)
 with os.fdopen(fd,'wb')as f:f.write(b)
 os.replace(tmp,p);rows.append({'path':str(p.relative_to(APP)),'inputSHA256':sha(old) if old else None,'outputSHA256':sha(b),'bytes':len(b)})
for r,dest,source,b in prepared:
 dest.parent.mkdir(parents=True,exist_ok=True)
 if dest.suffix=='.png':os.link(source,dest);rows.append({'path':str(dest.relative_to(APP)),'sha256':sha(b),'bytes':len(b),'operation':'immutable-source-link'})
 else:write(dest,b)
for html in ['core-v032.html','unified-versus-v055.html']:
 p=APP/'public/cqc/modules'/html;s=p.read_text();old='<script src="../src/cqc-pass18-machine-bridge.js"></script>';assert s.count(old)==1;prefix='\n'.join('<script src="../src/'+n+'"></script>' for n in ['cqc-pass19-gekko-catalog.js','cqc-pass19-gekko-poses.js','cqc-pass19-machine-source-points.js','cqc-pass19-gekko-install.js']);s=s.replace(old,prefix+'\n'+old);write(p,s.encode())
p=SRC/'cqc-pass19-world-scale.js';old=p.read_bytes();assert sha(old)=='280694aed8f72ef58e036e1e7a7979e8c102d3193847dc8e22737d79c3d7bc8e';s=old.decode();a="function historicalMachineHeight(id){const k=root.CQC_PASS18_MACHINE_DATA?.states?.[id]?.kind;";b="function historicalMachineHeight(id){const state=root.CQC_PASS18_MACHINE_DATA?.states?.[id];if(Number.isFinite(state?.displayHeight)&&state.displayHeight>0)return state.displayHeight;const k=state?.kind;";assert s.count(a)==1;s=s.replace(a,b);write(p,s.encode())
p=SRC/'cqc-pass19-combat-additions.js';s=p.read_text();a="resource('energy','ÉNERGIE',100,.10);";assert s.count(a)==1;s=s.replace(a,a+"\n   c.simulationBody={width:r.kit==='dwarf'?145:205,height:450,crouchHeight:r.kit==='dwarf'?285:360};")
a="}else if(r.uid.includes('trenchcoat')){";assert s.count(a)==1;s=s.replace(a,"}else if(r.uid==='pass19__gekko_mgr'){\n    put('specialForward',{name:'Rafale du Gekko',kind:'projectile',tag:'ballistic',startup:24,active:1,recovery:33,damage:210,cost:18,count:3,interval:5,speed:19,life:58,height:315,travel:0});\n   "+a);write(p,s.encode())
p=SRC/'cqc-pass19-native-origins.js';s=p.read_text();a="  if(!entry||!evidence)return null;";assert s.count(a)==1;s=s.replace(a,"  if(!entry){const slot=m.tag==='rocket'?'missile':m.tag==='ballistic'?'ballistic':null;if(!slot||p.f.costume&&p.f.costume!=='original'&&!root.CQC_PASS19_MACHINE_PIXEL_STYLE?.selected(p.f))return null;const pose=root.CQC_PASS19_VERSUS_SPATIAL?.poseFor(p,0)||{};const point=root.CQC_PASS18_MACHINES?.playableSourcePoint?.(p.f.uid,slot,0,0,p.face,1,pose);if(!point||!point.visible||!Number.isFinite(point.x)||!Number.isFinite(point.y))return null;return{forward:point.x*p.face,height:-point.y,sourceSHA256:point.sourceSHA256,reviewKind:'guarded-native-rig-source-point',worldScaleApplied:false,facingQualification:point.facingQualification};}\n  if(!evidence)return null;");write(p,s.encode())
receipt={'schema':'cqc.pass19.native-gekkos-integrated/2','status':'applied-awaiting-combined-match-qa','planSHA256':sha(pathlib.Path('/tmp/cqc-pass19-gekko-generation/integration-candidate/GUARDED_APP_INTEGRATION_PLAN_V2.json').read_bytes()),'files':rows,'rigs':5,'parts':67,'nativePNGFiles':7,'physicalDisplayHeight450BeforeWorldScaling':True,'independentReverseSources':False,'qualification':'Source-led rigs accepted after anatomical correction. Independent opposite-facing native artwork is being generated; temporary projection is explicitly not a certified1:1 reverse face. Old bodies/code/rigs remain preserved.'}
p=I/'GEKKO_GUARDED_NATIVE_ATOMIC_ACTUAL_V2.json'
with p.open('x')as f:json.dump(receipt,f,ensure_ascii=False,indent=2)
print(json.dumps({'receipt':str(p),'sha256':sha(p.read_bytes()),'files':len(rows)}))
