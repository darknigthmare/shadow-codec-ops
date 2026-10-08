from pathlib import Path
import json,hashlib,shutil
base=Path('/tmp/cqc-pass19-gekko-generation');old=base/'integration-candidate';new=base/'integration-candidate-v3';shutil.copytree(old/'src',new/'src',dirs_exist_ok=True)
s=(old/'src/cqc-pass19-gekko-catalog.js').read_text();a=s.index('root.CQC_PASS19_GEKKO_CATALOG=')+len('root.CQC_PASS19_GEKKO_CATALOG=');b=s.index(';root.CQC_PASS19_GEKKO_DATA=');cat=json.loads(s[a:b]);rigs={r['id']:r for r in cat['machines']}
seeds={'pass19__gekko_missile_mgs4':{'missile':{'part':'paired_missile_pod','nativeXY':[72,1068],'kind':'upper missile-tube mouth'},'missileLower':{'part':'paired_missile_pod','nativeXY':[68,1158],'kind':'lower missile-tube mouth'},'ballistic':{'part':'machinegun','nativeXY':[953,89],'kind':'machinegun barrel mouth'}},'pass19__gekko_mgr':{'ballistic':{'part':'machinegun','nativeXY':[918,90],'kind':'machinegun barrel mouth'}}}
for id,slots in seeds.items():
 rig=rigs[id]
 for slot,p in slots.items():
  part=next(row for row in rig['parts'] if row['id']==p['part']);source=next(row for row in rig['sources'] if row['id']==part['source']);p['pin']={'machine':id,'part':p['part'],'source':source,'rect':part['rect'],'pivot':part['pivot'],'imageScale':part['imageScale']}
body='''/* Source-pixel points with independently pinned PNG and native part geometry. No engine writes. */
(function(root){'use strict';
 const points=SEEDS;
 const equal=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 function sourceMatches(source,pin){return!!source&&['id','file','sha256','width','height','bytes'].every(key=>source[key]===pin[key]);}
 function geometryMatches(part,pin){return!!part&&part.id===pin.part&&part.source===pin.source.id&&equal(part.rect,pin.rect)&&equal(part.pivot,pin.pivot)&&part.imageScale===pin.imageScale;}
 function validateCatalog(catalog){const machines=catalog?.machines;if(!Array.isArray(machines))return false;return Object.entries(points).every(([id,slots])=>{const rig=machines.find(m=>m.id===id);return!!rig&&Object.values(slots).every(point=>geometryMatches(rig.parts.find(p=>p.id===point.part),point.pin)&&sourceMatches(rig.sources.find(s=>s.id===point.pin.source.id),point.pin.source));});}
 if(!validateCatalog(root.CQC_PASS19_GEKKO_CATALOG))throw Error('Native source-point pins differ from registered Gekko sources or geometry');
 function freeze(value){if(value&&typeof value==='object'){Object.values(value).forEach(freeze);Object.freeze(value);}return value;}freeze(points);
 function descriptor(id,slot){const p=points[id]?.[slot];return p?JSON.parse(JSON.stringify(p)):null;}
 function resolve(parts,machine,description,point){
  if(!machine||!point?.pin||machine.id!==point.pin.machine)return null;
  const pin=point.pin,part=machine.parts.find(p=>p.id===point.part),source=machine.sources.get(pin.source.id);if(!geometryMatches(part,pin)||!sourceMatches(source,pin.source))return null;
  const pose=parts.pose(machine,description).get(part.id),r=pose?.rect,xy=point.nativeXY;
  if(!pose||!r||pose.source!==pin.source.id||!equal(r,pin.rect)||!equal(pose.pivot,pin.pivot)||pose.imageScale!==pin.imageScale||!Array.isArray(xy)||xy.length!==2||!xy.every(Number.isFinite)||xy[0]<r[0]||xy[1]<r[1]||xy[0]>=r[0]+r[2]||xy[1]>=r[1]+r[3])return null;
  const x=(xy[0]-r[0]-pose.pivot[0])*pose.imageScale,y=(xy[1]-r[1]-pose.pivot[1])*pose.imageScale,m=pose.matrix;
  return{part:part.id,source:pose.source,nativeXY:[...xy],x:m[0]*x+m[2]*y+m[4],y:m[1]*x+m[3]*y+m[5],visible:pose.visible&&pose.opacity>0,opacity:pose.opacity,sourceSHA256:source.sha256,sourceFile:source.file,pinsVerified:true,kind:point.kind};
 }
 root.CQC_PASS19_MACHINE_SOURCE_POINTS=Object.freeze({schema:'cqc.pass19.native-source-points/2',points,descriptor,resolve,validateCatalog});
 if(typeof module==='object'&&module.exports)module.exports=root.CQC_PASS19_MACHINE_SOURCE_POINTS;
})(globalThis);
'''.replace('SEEDS',json.dumps(seeds,separators=(',',':')))
p=new/'src/cqc-pass19-machine-source-points.js';p.write_text(body)
plan=json.loads((old/'GUARDED_APP_INTEGRATION_PLAN_V2.json').read_text());plan['schema']='cqc.pass19.guarded-native-gekko-integration/3'
for row in [plan['bridgeReplacement'],*plan['additionFiles']]:
 row['candidate']=str(new/'src'/Path(row['candidate']).name);row['candidateSHA256']=hashlib.sha256(Path(row['candidate']).read_bytes()).hexdigest()
plan['sourcePointAPI']['pinGuards']=['physical rig ID','part ID','native source ID','native source path','PNG SHA256','native width/height/bytes','rect','pivot','uniform imageScale','active pose source/rect/pivot/imageScale']
(new/'GUARDED_APP_INTEGRATION_PLAN_V3.json').write_text(json.dumps(plan,indent=2)+'\n')
shutil.copy2(p,base/'runtime/integration-src'/p.name)
# source-marker fixture must load the pinned native catalog first.
p=base/'runtime/source-anchor-review.html';s=p.read_text();s=s.replace('<script src="integration-src/cqc-pass19-machine-source-points.js">','<script src="integration-src/cqc-pass19-gekko-catalog.js"></script><script src="integration-src/cqc-pass19-machine-source-points.js">');p.write_text(s)
print(json.dumps({'pinnedModuleSHA256':hashlib.sha256(body.encode()).hexdigest(),'plan':str(new/'GUARDED_APP_INTEGRATION_PLAN_V3.json')}))
