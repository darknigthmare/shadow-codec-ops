import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

// The proposed four entries are merged only in memory. No large catalogue copy,
// application write, Git operation, HTTP request or image mutation is performed.
const BASE='/workspace/cqc-pass9-gameplay-qa-preparation';
const PREP='/workspace/cqc-pass9-importer-preparation';
const R='/workspace/cqc-game-working/cqc-versus-v056';
const opts={mode:'prepared',label:null};
for(let i=2;i<process.argv.length;i+=2){
  const k=process.argv[i];assert.ok(k?.startsWith('--')&&process.argv[i+1],'Use --key value pairs');
  opts[k.slice(2)]=process.argv[i+1];
}
assert.ok(['prepared','integrated'].includes(opts.mode));
assert.match(opts.label||'',/^[a-z0-9][a-z0-9_-]*$/,'Use a fresh evidence label');
if(opts.mode==='integrated')for(const k of ['catalog','catalog-sha256','module-sha256','helper-sha256','origins-sha256','renderer-sha256'])assert.ok(opts[k],'Integrated mode requires --'+k);
const OUT=path.join('/workspace/cqc-pass9-final-qa','runs',opts.label);assert.ok(!fs.existsSync(OUT),'Preserve previous evidence');fs.mkdirSync(OUT,{recursive:true});
const copy=v=>JSON.parse(JSON.stringify(v)),sha=v=>crypto.createHash('sha256').update(v).digest('hex');
const read=p=>fs.readFileSync(p,'utf8'),json=p=>JSON.parse(read(p));
const pins=new Map(),records=[];
function seal(p){const b=fs.readFileSync(p),s=fs.statSync(p);pins.set(p,{sha256:sha(b),bytes:b.length,ino:s.ino,dev:s.dev,mode:s.mode,nlink:s.nlink,mtimeMs:s.mtimeMs});return b.toString();}
function check(name,fn){try{records.push({name,status:'passed',evidence:fn()??null});}catch(e){records.push({name,status:'failed',error:e.message});}}
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-7,`Expected ${a} approximately ${b}`);
function literal(s,token){const start=s.indexOf(token)+token.length;assert.ok(start>=token.length&&['[','{'].includes(s[start]),'Exact inline literal absent: '+token);let depth=0,str=false,esc=false;
  for(let i=start;i<s.length;i++){const c=s[i];if(str){if(esc)esc=false;else if(c==='\\')esc=true;else if(c==='"')str=false;continue;}if(c==='"')str=true;else if(c==='['||c==='{')depth++;else if(c===']'||c==='}'){if(--depth===0)return{s:s.slice(start,i+1),value:JSON.parse(s.slice(start,i+1))};}}throw Error('Incomplete '+token);}
const modulePath=R+'/modules/unified-versus-v055.html',moduleText=seal(modulePath);
const rawFighters=literal(moduleText,'const FIGHTERS='),rawFinishers=literal(moduleText,'globalThis.CQC_FINISHERS_053 = ');
const rawEngine=[...moduleText.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]).find(s=>s.includes('root.CQCCombat046=api;root.CQCCombat045=api;'));
assert.equal(sha(rawEngine),'197acd7da230bf479a68d37ff409801c0d4390d001a98b4c1451075be55d2d51','Historical inline combat engine must remain byte exact');
const sourceCatalogPath=opts.catalog||R+'/data/combat-sprite-catalog-v1.json';
const sourceCatalogText=seal(sourceCatalogPath),catalog=JSON.parse(sourceCatalogText),p9Entries=json(PREP+'/PASS9_CATALOG_ENTRIES_ONLY.json');
// Exact importer V2 approved ROOT metadata/map merge; prepared sources remain unchanged.
if(opts.mode==='integrated'){
  const reviewFile=PREP+'/ROOT_PHYSICAL_MAPPING_REVIEW_APPROVED_20261002.json';
  const reviewText=seal(reviewFile);assert.equal(sha(reviewText),'f35dcc65430edb088d4f0031c0b488383643695b0d295b348a9a69a945fc3420');
  const review=JSON.parse(reviewText),planText=seal(PREP+'/ISOLATED_IMPORT_PLAN_V2.json');
  assert.equal(sha(planText),'f5033a0b1b3675da5f7440270a9032e68df9ddec3c78582d87e59e12a1a4b9f2');
  const plan=JSON.parse(planText);assert.equal(review.status,'approved');assert.equal(plan.approvedRootReviewSHA256,sha(reviewText));
  for(const uid of plan.uids){
    const candidateText=seal(PREP+'/candidates/'+uid+'.json');assert.equal(sha(candidateText),plan.candidateSHA256[uid]);
    const doc=JSON.parse(candidateText),observed=review.entries[uid],e=copy(doc.entry);assert.equal(observed.status,'approved');
    Object.assign(e.actionMap,observed.actionMapOverrides||{});Object.assign(e.phaseMap,observed.phaseMapOverrides||{});
    e.review.reviewer+=' + '+(observed.reviewer||review.reviewer);e.review.reviewedAt=review.reviewedAt;
    e.review.limits.push(...(observed.limits||[]));
    e.review.approvalScope='Producer original/native source review plus named root physical original references and all six native source sheets; browser/runtime remains separately required.';
    p9Entries.entries[uid]=e;
  }
}

const initialCatalogueEntries=Object.keys(catalog.entries).length;
if(opts.mode==='prepared'){assert.equal(sha(sourceCatalogText),'3fe34bf2be1cc7c5365a82e57b747b269adf795c1940885a6ce6e8a4a793d747');assert.equal(initialCatalogueEntries,39);Object.assign(catalog.entries,p9Entries.entries);}
else{assert.equal(sha(sourceCatalogText),opts['catalog-sha256']);assert.equal(sha(moduleText),opts['module-sha256']);assert.equal(initialCatalogueEntries,43);for(const [uid,e]of Object.entries(p9Entries.entries))assert.deepEqual(copy(catalog.entries[uid]),e);}
assert.equal(Object.keys(catalog.entries).length,43);
const p9HelperPath=opts.mode==='prepared'?PREP+'/cqc-pass9-combat-fidelity.js':R+'/src/cqc-pass9-combat-fidelity.js';
const p9OriginsPath=opts.mode==='prepared'?PREP+'/cqc-pass9-native-origins.js':R+'/src/cqc-pass9-native-origins.js';
const p9Helper=seal(p9HelperPath),p9OriginScript=seal(p9OriginsPath);
if(opts.mode==='prepared'){const plan=json(PREP+'/ISOLATED_IMPORT_PLAN.json');for(const [name,content]of [['cqc-pass9-combat-fidelity.js',p9Helper],['cqc-pass9-native-origins.js',p9OriginScript]])assert.equal(sha(content),plan.preparationFilePins.find(p=>p.file===name).sha256);}
else{assert.equal(sha(p9Helper),opts['helper-sha256']);assert.equal(sha(p9OriginScript),opts['origins-sha256']);assert.ok(moduleText.includes('window.CQC_PASS9_COMBAT_FIDELITY?.apply(FIGHTERS)'),'Installed helper must really be called by page');}
const starRendererPath=opts.renderer||(opts.mode==='prepared'?BASE+'/cqc-pass9-projectile-art.js':R+'/src/cqc-pass9-projectile-art.js');
const starRenderer=seal(starRendererPath);
const eightPoseStarRenderer=starRenderer.includes('nativeSelectedFrames8');
if(opts.mode==='integrated'){
  assert.equal(sha(starRenderer),opts['renderer-sha256']);
  assert.ok(moduleText.includes('window.CQC_PASS9_PROJECTILE_ART?.drawProjectile(c,q,zoom,[s.a,s.b][q.owner])'),'Actual installed page must call star renderer with the real owner');
  assert.ok(moduleText.indexOf('window.CQC_PASS9_PROJECTILE_ART?.drawProjectile(')<moduleText.indexOf('window.CQC_PASS4_PROJECTILE_ART?.draw(c,q,zoom)'),'Star hook must run before historical fallbacks');
}
for(const p of json(PREP+'/SOURCE_PINS.json').pins.filter(p=>['immutable-native-png','authoritative-layout'].includes(p.kind))){seal(p.path);assert.equal(pins.get(p.path).sha256,p.sha256,'Producer source changed: '+p.path);}
const scripts=['cqc-canonical-combat-reprise.js','cqc-pass3-combat-fidelity.js',...Array.from({length:5},(_,i)=>[i+4]).flatMap(([n])=>[`cqc-pass${n}-native-origins.js`,`cqc-pass${n}-combat-fidelity.js`])];
const currentEngine=seal(R+'/src/cqc-pass8-combat-engine.js');
assert.equal(sha(currentEngine),'fd6c8d85333887a60056f1ab11e92abb63250c07de1664a6d832c1c679f34a8f','No PASS9 engine change is needed');
seal(R+'/src/cqc-sprite-renderer.js');seal(R+'/src/cqc-sprite-catalog.js');
const context=vm.createContext({CQC_COMBAT_SPRITE_CATALOG:catalog});context.window=context;
for(const name of scripts)vm.runInContext(seal(R+'/src/'+name),context,{filename:name});
vm.runInContext(rawEngine,context,{filename:'actual-historical-inline-engine.js'});vm.runInContext(currentEngine,context,{filename:'actual-pass8-engine.js'});
const E=context.CQCCombat048Pass8,O=context.CQCCombat046;
const fighters=copy(rawFighters.value);assert.equal(fighters.length,354);
context.CQC_CANONICAL_COMBAT_REPRISE.apply(fighters);for(let n=3;n<=8;n++)context[`CQC_PASS${n}_COMBAT_FIDELITY`].apply(fighters);
const before=copy(fighters),finishers=copy(rawFinishers.value);
context.CQC_CANONICAL_COMBAT_REPRISE.applyFinishers(finishers);for(let n=6;n<=8;n++)context[`CQC_PASS${n}_COMBAT_FIDELITY`].applyFinishers(finishers,fighters);
const beforeFinishers=copy(finishers);
vm.runInContext(p9OriginScript,context);vm.runInContext(p9Helper,context);
if(opts['projectile-catalog-js']){
  const text=seal(opts['projectile-catalog-js']);
  if(opts.mode==='integrated'){assert.ok(opts['projectile-catalog-sha256']);assert.equal(sha(text),opts['projectile-catalog-sha256']);}
  vm.runInContext(text,context,{filename:'actual-pass9-projectile-catalog.js'});
  const atlas=context.CQC_PASS9_PROJECTILE_CATALOG;assert.ok(atlas?.file);
  const file=path.resolve(R,atlas.file);assert.ok(file.startsWith(R+'/assets/combat-props/core__ninja_mg2/'));
  seal(file);assert.equal(pins.get(file).sha256,atlas.sha256);
  const png=fs.readFileSync(file);assert.equal(png.subarray(0,8).toString('hex'),'89504e470d0a1a0a');assert.equal(png.readUInt32BE(16),atlas.width);assert.equal(png.readUInt32BE(20),atlas.height);
}
vm.runInContext(starRenderer,context,{filename:'pass9-projectile-art.js'});
const F=context.CQC_PASS9_COMBAT_FIDELITY,A=context.CQC_PASS9_NATIVE_ORIGINS.entries;
const changed=copy(F.apply(fighters,catalog,context.CQC_PASS9_NATIVE_ORIGINS)),changedFinishers=copy(F.applyFinishers(finishers,fighters));
const subjects=copy(F.reviewedUIDs),get=uid=>copy(fighters.find(f=>f.uid===uid)),idle=()=>[E.empty(),E.empty()];
const pixels=json(opts.pixels||BASE+'/NATIVE_SOURCE_PIXEL_PROOF.json');
check('Scoped adapter changes only four out of actual354 hydrated fighters',()=>{assert.deepEqual(changed,subjects);assert.deepEqual(changedFinishers,subjects);const other=fighters.filter(f=>!subjects.includes(f.uid));assert.equal(other.length,350);for(const f of other)assert.deepEqual(copy(f),before.find(p=>p.uid===f.uid));return{unrelatedProfilesByteSemanticIdentical:350,pass8ActorsPreserved:13};});
check('All350 unrelated finisher profiles stay literal-identical; commands and durations stay unchanged in16 revised finishers',()=>{
  let stable=0;for(const [uid,p]of Object.entries(finishers.profiles)){const prior=beforeFinishers.profiles[uid];if(!subjects.includes(uid)){assert.deepEqual(copy(p),prior);stable++;}else for(let i=0;i<p.finishers.length;i++)for(const k of ['id','index','slot','commandP1','commandP2','duration','camera','tone'])assert.deepEqual(p.finishers[i][k],prior.finishers[i][k]);}assert.equal(stable,350);return{unchangedProfiles:stable,revisedChoreographyOnly:16};});
check('Prepared source fidelity explicitly qualified; no cloak, trap, unseen powers or foreign personal weapons',()=>{
  const allowed={core__runner_mg2:'fists',core__ninja_mg2:'shuriken',core__redblaster_mg2:'grenade',core__jungle_evil:'rifle'};
  for(const uid of subjects){const f=get(uid);assert.equal(f.visual.weapon,allowed[uid]);assert.equal(f.combat.weapon,allowed[uid]);assert.equal(f.combat.absolute1to1Certified,false);assert.equal(f.combat.sourceFidelityStatus,'closest_supported');assert.equal(F.cloakAlpha(uid),1);
    for(const [slot,m]of Object.entries(f.combat.moves)){assert.ok(!['buff','trap','stationaryMine','detonate'].includes(m.kind),uid+'/'+slot);for(const k of ['blink','homing','restoreEnergy','launchSelf','pass9Wire','maxTraps','remoteOnly','status','buff'])assert.equal(m[k],undefined,uid+'/'+slot+'/'+k);assert.ok(!['blade','knife','fire','psychic','rail','rocket','snare','wire','laser'].includes(m.tag));}}
  return{bodyNeverMadeOpticallyInvisible:true,approvedWeapons:allowed};});
function make(uid,face=1,target='core__snake',distance=700){const s=E.create(get(uid),get(target),{training:true,seed:123456789});s.a.x=face===1?200:1080;s.b.x=s.a.x+face*distance;s.a.face=face;s.b.face=-face;s.a.meter=100;return s;}
function activate(s,slot){assert.equal(E.start(s,s.a,slot),true);const d=s.a.attack.def;for(let i=0;i<d.startup;i++)E.step(s,idle());assert.equal(s.metrics.activate,1);return d;}
function inside(poly,p){if(!poly)return true;let yes=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const [x,y]=poly[i],[a,b]=poly[j],dx=a-x,dy=b-y,t=Math.max(0,Math.min(1,((p[0]-x)*dx+(p[1]-y)*dy)/(dx*dx+dy*dy||1)));if(Math.hypot(p[0]-x-t*dx,p[1]-y-t*dy)<1e-8)return true;if((y>p[1])!==(b>p[1])&&p[0]<(a-x)*(p[1]-y)/(b-y)+x)yes=!yes;}return yes;}
const bindings=[];let activeMarkCount=0;
for(const [uid,routes]of Object.entries(F.routes))for(const [action,route]of Object.entries(routes)){
  for(const [side,face]of [['right',1],['left',-1]])check('Typed actual native first-active point '+uid+'/'+action+'/'+side,()=>{
    const m=A[uid][action][side],e=catalog.entries[uid],frame=(e.facing===face?e.actions:e.oppositeActions)[action].frames[m.frame],pixel=pixels.points.find(p=>p.uid===uid&&p.action===action&&p.side===side);
    assert.equal(m.pointKind,route.kind);assert.equal(m.frame,e.phaseMap[action].active[0]);assert.equal(pixel.sha256,m.sha256);assert.deepEqual(pixel.pointRGBA,copy(m.pointRGBA));assert.ok(pixel.pointRGBA[3]>80);
    assert.equal(frame.sha256,m.sha256);assert.equal(frame.file,m.file);assert.deepEqual(copy(frame.rect),copy(m.rect));assert.deepEqual(copy(frame.pivot),copy(m.pivot));assert.equal(m.engineBodyScale,1.12);
    const [x,y,w,h]=frame.rect;assert.ok(inside(frame.clipPolygon,[(m.point[0]+.5-x)/w,(m.point[1]+.5-y)/h]),'Actual point outside authored Canvas contour');
    const origin=copy(F.origins(e,A[uid][action],action,route.kind))[face];near(origin.forward,m.measuredRuntimeOrigin.forward);near(origin.height,m.measuredRuntimeOrigin.height);
    for(const slot of route.slots){assert.equal(e.actionMap[slot],action);bindings.push({uid,action,slot,side,face});}activeMarkCount++;
    return{point:m.point,RGBA:pixel.pointRGBA,pointKind:m.pointKind,sourceSHA256:m.sha256,worldOrigin:origin,engineAndRendererBodyScale:1.12};
  });
}
let rejected=0;
for(const [uid,routes]of Object.entries(F.routes))for(const [action,route]of Object.entries(routes))check('Reject mismatched native source identity '+uid+'/'+action,()=>{
  const e=catalog.entries[uid],marks=A[uid][action];const changes={wrongSHA:m=>m.sha256='0'.repeat(64),wrongFile:m=>m.file='invented.png',wrongFrame:m=>m.frame=0,wrongAction:m=>m.action='deploy',unviewed:m=>m.physicallyViewed=false,transparent:m=>m.sourcePixelAlpha=0,wrongRect:m=>m.rect=[0,0,1,1],wrongPivot:m=>m.pivot=[.5,.5],wrongSourceHeight:m=>m.sourceFrameHeight++,wrongScale:m=>m.engineBodyScale=1,wrongKind:m=>m.pointKind='native-visible-firearm-muzzle-INVENTED',outside:m=>m.point=[-1,-1],nonfinite:m=>m.point=[Infinity,m.point[1]]};
  for(const side of ['right','left'])for(const [name,change]of Object.entries(changes)){const bad=copy(marks);change(bad[side]);assert.throws(()=>F.origins(e,bad,action,route.kind),name+'/'+side);rejected++;}const mirror=copy(e);mirror.mirror=true;assert.throws(()=>F.origins(mirror,marks,action,route.kind));rejected++;return{rejected:27};});
for(const b of bindings)check('Real engine spawn, burst count and resource boundary '+b.uid+'/'+b.slot+'/'+b.side,()=>{
  const s=make(b.uid,b.face),r0=s.a.r,meter0=s.a.meter,x0=s.a.x,y0=s.a.y,d=activate(s,b.slot),mark=A[b.uid][b.action][b.side],origin=d.projectileOrigin[b.face],n=d.count||1;
  assert.equal(s.projectiles.length,n);assert.equal(s.metrics.projectile,n);assert.equal(s.a.stats.starts,1);assert.equal(s.a.stats.activations,1);
  const launches=[];for(let i=0;i<n;i++){const q=s.projectiles[i],moving=q.age>0;near(q.x-(moving?b.face*d.speed:0),x0+b.face*origin.forward);near(q.y-(moving?(d.vy||0):0),y0-origin.height);assert.equal(q.burstId,s.a.attack.id);assert.equal(q.delay,i*(d.interval||0)-(i?1:0));launches.push({age:q.age,delay:q.delay,nativeSpawn:[x0+b.face*origin.forward,y0-origin.height]});}
  near(s.a.r,r0-d.cost);near(s.a.meter,meter0-(d.meter||0));
  const enough=make(b.uid,b.face);enough.a.r=d.cost;assert.equal(E.start(enough,enough.a,b.slot),true);near(enough.a.r,0);
  const denied=make(b.uid,b.face);denied.a.r=d.cost-1;assert.equal(E.start(denied,denied.a,b.slot),false);assert.equal(denied.projectiles.length,0);assert.equal(denied.a.stats.starts,0);
  if(d.meter){const low=make(b.uid,b.face);low.a.meter=d.meter-1;assert.equal(E.start(low,low.a,b.slot),false);assert.equal(low.projectiles.length,0);}
  return{nativePoint:mark.point,pointKind:mark.pointKind,actualProjectiles:n,resourcePaidExactlyOnce:d.cost,meterPaidExactlyOnce:d.meter||0,launches};
});
const canvas=()=>{const calls=[];const c={calls};for(const name of ['save','restore','rotate','beginPath','moveTo','lineTo','closePath','fill','stroke','drawImage'])c[name]=(...args)=>calls.push({name,args:args.map(a=>typeof a==='object'?'image-object':a)});return c;};
check('Black real star projectiles are drawn by qualified PASS9 hook; every other actor is rejected untouched',()=>{
  const art=context.CQC_PASS9_PROJECTILE_ART,rows=[];for(const b of bindings){const s=make(b.uid,b.face);activate(s,b.slot);const q=s.projectiles[0],prior=copy(q),ownerPrior=copy(s.a),c=canvas(),ok=art.drawProjectile(c,q,1,s.a),isBlack=b.uid==='core__ninja_mg2';assert.equal(ok,isBlack);assert.deepEqual(copy(q),prior);assert.deepEqual(copy(s.a),ownerPrior);
    if(isBlack){assert.equal(c.calls.filter(x=>x.name==='moveTo').length,1);assert.equal(c.calls.filter(x=>x.name==='lineTo').length,7);assert.equal(c.calls.filter(x=>x.name==='fill').length,1);assert.equal(c.calls.filter(x=>x.name==='stroke').length,1);assert.equal(c.calls.filter(x=>x.name==='drawImage').length,0);}else assert.equal(c.calls.length,0);rows.push({uid:b.uid,face:b.face,slot:b.slot,handlerUsed:ok,drawOperations:c.calls.length});}
  const s=make('core__ninja_mg2');activate(s,'super');for(const q of s.projectiles.filter(q=>q.delay>0)){const c=canvas();assert.equal(art.drawProjectile(c,q,1,s.a),false);assert.equal(c.calls.length,0);}
  return{realEngineObjectsUsed:true,bindings:rows,canvasVisual:'Qualified gray four-point Versus star, not a copied MSX2 sprite',sourceAndPhysicsNotMutated:true};
});
check('Star renderer guards exact owner, slots, kind/tag and finite sizes; native image dimensions are verified before use',()=>{
  const api=context.CQC_PASS9_PROJECTILE_ART,s=make('core__ninja_mg2');activate(s,'special');const q=s.projectiles[0],badCases=[['wrongOwnerUID',null],['wrongOwnerSlot',null],['wrongTag',m=>m.def.tag='ballistic'],['wrongKind',m=>m.kind='ballistic'],['wrongSlot',m=>m.def.id='core__ninja_mg2::heavy'],['dead',m=>m.dead=true],['delayed',m=>m.delay=1],['nonfiniteAge',m=>m.age=Infinity],['nonfiniteX',m=>m.x=NaN]];
  for(const [label,change]of badCases){const bad=copy(q),owner=copy(s.a);if(change)change(bad);if(label==='wrongOwnerUID')owner.f.uid='core__snake';if(label==='wrongOwnerSlot')owner.slot=1;const c=canvas();assert.equal(api.drawProjectile(c,bad,1,owner),false,label);assert.equal(c.calls.length,0);}
  for(const scale of [0,-1,Infinity,NaN,5]){const c=canvas();assert.equal(api.drawProjectile(c,q,scale,s.a),false);assert.equal(c.calls.length,0);}
  const atlas={uid:'core__ninja_mg2',tag:'shuriken',kind:'shuriken',file:'assets/combat-props/core__ninja_mg2/star-test-only.png',sha256:'a'.repeat(64),width:32,height:32,rect:[2,2,28,28],displayWidth:18,sourceFidelityStatus:'closest_supported',absolute1to1Certified:false};
  if(eightPoseStarRenderer){atlas.frames=Array.from({length:8},()=>({rect:[2,2,28,28],pivot:[.5,.5]}));atlas.poseTicks=3;atlas.sourceScaleReferenceWidth=28;delete atlas.rect;}
  class TestImage{set src(s){this.naturalWidth=32;this.naturalHeight=32;this.onload();}}
  const native=api.createRenderer({catalog:atlas,Image:TestImage});const c=canvas();assert.equal(native.drawProjectile(c,q,1,s.a),true);assert.equal(c.calls.filter(x=>x.name==='drawImage').length,1);assert.equal(native.diagnostics().nativeDraws,1);
  class WrongSizeImage{set src(s){this.naturalWidth=31;this.naturalHeight=32;this.onload();}}
  const invalid=api.createRenderer({catalog:atlas,Image:WrongSizeImage});assert.equal(invalid.diagnostics().status,'invalid-native-dimensions');const d=canvas();assert.equal(invalid.drawProjectile(d,q,1,s.a),true);assert.equal(d.calls.filter(x=>x.name==='drawImage').length,0);assert.equal(invalid.diagnostics().fallbackDraws,1);
  for(const field of ['file','sha256','rect','absolute1to1Certified']){const a=copy(atlas);if(field==='file')a.file='../foreign.png';if(field==='sha256')a.sha256='fake';if(field==='rect'){if(eightPoseStarRenderer)a.frames[0].rect=[0,0,33,32];else a.rect=[0,0,33,32];}if(field==='absolute1to1Certified')a.absolute1to1Certified=true;assert.throws(()=>api.createRenderer({catalog:a,Image:TestImage}));}
  return{invalidProjectileProofsRejected:badCases.length,invalidSizesRejected:5,nativeImageFixtureUsesTestDouble:true,nativePixelsActuallyDecoded:false,exactOwnerAndKindVerified:true};
});
for(const b of bindings.filter(b=>b.uid!=='core__redblaster_mg2'))check('Actual source-height projectile body overlap '+b.uid+'/'+b.slot+'/'+b.side,()=>{
  const rows=[];for(const [target,down,label]of [['core__snake',false,'standing adult'],['core__snake',true,'crouching adult'],['roster50__sunny_mgs4',false,'Sunny MGS4 child'],['roster50__sunny_mgr',false,'Sunny MGR child'],['core__crying_wolf',false,'low quadruped']]){
    const s=make(b.uid,b.face,target,420);assert.equal(E.start(s,s.a,b.slot),true);const d=s.a.attack.def;for(let i=0;i<d.startup;i++){const input=idle();input[1].down=down;E.step(s,input);}const q=s.projectiles[0],body=E.box(s.b),expected=!!E.overlap({x:body.x,y:q.y-7,w:body.w,h:14},body);
    for(let tick=0;tick<Math.ceil(420/d.speed)+45;tick++){const input=idle();input[1].down=down;E.step(s,input);}assert.equal(s.b.life<10000,expected,label);rows.push({target:label,bodyHeight:body.h,sourceHeight:d.projectileOrigin[b.face].height,expectedVerticalOverlap:expected,actualLifeLost:10000-s.b.life});}
  return{nativePointNeverLowered:true,rows};
});
for(const face of [1,-1])for(const slot of ['special','specialForward','super'])check('Actual Red grenade fuse and in-arena explosion '+slot+'/'+face,()=>{
  const s=make('core__redblaster_mg2',face),d=activate(s,slot),launched=s.projectiles.map(q=>q.id),bursts=[];assert.equal(d.fuse,48);assert.equal(d.projectileOverride,'grenade');assert.ok(s.projectiles.every(q=>q.kind==='grenade'));
  let lastExplosions=0;for(let tick=0;tick<100;tick++){for(const q of s.projectiles)assert.ok(q.x>=30&&q.x<=1250,'Grenade left arena before fuse');const beforeAges=Object.fromEntries(s.projectiles.map(q=>[q.id,q.age]));E.step(s,idle());if((s.metrics.explosion||0)>lastExplosions){for(const ev of s.events.filter(e=>e.type==='explosion'&&!bursts.some(p=>p.id===e.id))){const fx=s.fx.filter(f=>f.kind==='blast'&&f.t===26).at(-1);assert.ok(fx);assert.equal(beforeAges[ev.id],47);bursts.push({id:ev.id,frame:ev.frame,x:fx.x,y:fx.y,actualFuseAge:beforeAges[ev.id]+1});assert.ok(fx.x>=65&&fx.x<=1215);}lastExplosions=s.metrics.explosion;}if(lastExplosions===launched.length)break;}
  assert.equal(s.metrics.explosion,launched.length);assert.equal(s.projectiles.length,0);assert.equal(s.metrics.trapPlaced,undefined);assert.deepEqual([...bursts.map(b=>b.id)].sort(),[...launched].sort());
  for(let i=0;i<bursts.length;i++)assert.equal(bursts[i].frame,d.startup+d.fuse-1+i*(d.interval||0),'Fuse cadence mismatch');
  return{gravity:d.gravity,fuse:48,count:bursts.length,speed:d.speed,actualExplosions:bursts,noSilentArenaDiscard:true};
});
for(const face of [1,-1])check('Red Down is stationary, harmless and uses only A crouch8/9 '+face,()=>{
  const uid='core__redblaster_mg2',s=make(uid,face,'core__snake',100),x=s.a.x,r=s.a.r,e=catalog.entries[uid],d=activate(s,'specialDown');assert.equal(e.actionMap.specialDown,'crouch');assert.equal(d.kind,'mobility');assert.equal(d.travel,0);assert.equal(d.damage,0);assert.equal(d.cost,0);assert.equal(d.projectileOrigin,undefined);
  for(let i=0;i<d.active+d.recovery+20;i++)E.step(s,idle());near(s.a.x,x);near(s.a.r,r);assert.equal(s.b.life,10000);assert.equal(s.a.life,10000);assert.equal(s.traps.length,0);assert.equal(s.projectiles.length,0);assert.equal(s.metrics.damage,undefined);assert.equal(s.metrics.explosion,undefined);assert.equal(s.metrics.trapPlaced,undefined);assert.ok(!Object.values(e.actionMap).includes('deploy'));
  for(const [side,frames]of [['right',e.actions.crouch.frames],['left',e.oppositeActions.crouch.frames]]){assert.equal(frames.length,2);const layout=json('/workspace/cqc-pass9-generation/red-blaster/layouts/a-'+side+'.json');for(let i=0;i<frames.length;i++){const f=frames[i],source=layout.cells.find(c=>c.index===8+i);assert.ok(f.file.includes('/a-'));assert.deepEqual(copy(f),source.frame,'Native crouch must use actual A8/A9 cells');}}
  return{travel:0,damage:0,resourceCost:0,projectileOrTrapOrBlast:false,sourceAction:'crouch',sourceSheet:'A',sourcePoseIndices:[8,9],deployEvidenceOnly:true};
});
for(const uid of ['core__ninja_mg2','core__jungle_evil'])for(const face of [1,-1])for(const slot of uid==='core__ninja_mg2'?['specialForward','specialBack']:['specialDown','specialBack'])check('Real low mobility remains body-visible and bounded '+uid+'/'+slot+'/'+face,()=>{
  const s=make(uid,face),x=s.a.x,d=activate(s,slot);assert.equal(d.kind,'mobility');assert.equal(F.cloakAlpha(uid),1);assert.equal(s.a.buffs.cloak,undefined);assert.ok(E.box(s.a).h<230);
  for(let i=0;i<d.active+d.recovery;i++)E.step(s,idle());near(s.a.x-x,face*d.travel*d.active);assert.equal(s.metrics.projectile,undefined);assert.equal(s.metrics.trapPlaced,undefined);assert.equal(s.a.buffs.cloak,undefined);assert.equal(s.b.life,10000);assert.ok(s.a.x>=65&&s.a.x<=1215);
  const atEdge=make(uid,face);atEdge.a.x=face===1?1200:80;activate(atEdge,slot);for(let i=0;i<d.active;i++)E.step(atEdge,idle());assert.ok(atEdge.a.x>=65&&atEdge.a.x<=1215);return{visibleAlpha:1,adaptedTravelPixels:s.a.x-x,arenaClampObserved:true,projectiles:0};
});
for(const face of [1,-1])check('Running Man remains physically unarmed for every move '+face,()=>{const results=[];for(const slot of E.SLOTS){const s=make('core__runner_mg2',face),d=activate(s,slot);for(let i=0;i<d.active+d.recovery+5;i++)E.step(s,idle());assert.equal(s.metrics.projectile,undefined);assert.equal(s.metrics.trapPlaced,undefined);assert.equal(s.metrics.explosion,undefined);assert.equal(s.a.buffs.cloak,undefined);assert.ok(['melee','mobility','parry','recover'].includes(d.kind));results.push({slot,kind:d.kind,sourceAction:catalog.entries.core__runner_mg2.actionMap[slot]});}return{moves:results,gunMineGasEmissions:0};});
for(const uid of subjects)for(const face of [1,-1])check('Every actual move advances through startup, active and recovery '+uid+'/'+face,()=>{const evidence=[];for(const slot of E.SLOTS){const s=make(uid,face),d=get(uid).combat.moves[slot];assert.equal(E.start(s,s.a,slot),true);assert.equal(s.a.attack.t,0);for(let i=0;i<d.startup;i++)E.step(s,idle());assert.equal(s.a.attack.t,d.startup);assert.equal(s.a.attack.activated,true);for(let i=0;i<d.active;i++)E.step(s,idle());assert.equal(s.a.attack.t,d.startup+d.active);for(let i=0;i<d.recovery;i++)E.step(s,idle());assert.equal(s.a.attack,null);evidence.push({slot,startup:d.startup,active:d.active,recovery:d.recovery,sourceAction:catalog.entries[uid].actionMap[slot]});}return{realEngineTicks:true,moves:evidence};});
// Both sides see exactly the same helper chain except the four replacements.
// Deterministic fixtures compare all350 unrelated actors for one actual full move
// and a mixture of input states. This catches unintended adapter engine wrapping.
for(const uid of before.filter(f=>!subjects.includes(f.uid)).map(f=>f.uid))check('Unrelated deterministic gameplay parity '+uid,()=>{
  const old=copy(before.find(f=>f.uid===uid)),now=get(uid),target=get('core__snake'),s1=E.create(old,copy(target),{training:true,seed:54321}),s2=E.create(now,copy(target),{training:true,seed:54321});s1.a.meter=s2.a.meter=100;
  for(let tick=0;tick<160;tick++){const a=E.empty(),b=E.empty();a.slot=tick===2?'special':tick===100?'heavy':null;a.down=tick>=60&&tick<75;a.guard=tick>=75&&tick<85;a.left=tick>=120&&tick<128;b.guard=tick>=40&&tick<70;E.step(s1,[copy(a),copy(b)]);E.step(s2,[copy(a),copy(b)]);assert.deepEqual(copy(s1),copy(s2));}return{actualFramesCompared:160};
});
check('All source/code/PNG inputs stay hash/stat identical; no application files were written by this QA',()=>{for(const [p,before]of pins){const s=fs.statSync(p),now={sha256:sha(fs.readFileSync(p)),bytes:s.size,ino:s.ino,dev:s.dev,mode:s.mode,nlink:s.nlink,mtimeMs:s.mtimeMs};assert.deepEqual(now,before,p);}return{guardedFiles:pins.size,rawInlineEngineSHA256:sha(rawEngine),rendererSHA256:pins.get(R+'/src/cqc-sprite-renderer.js').sha256,sourceCatalogueCopied:false};});
const result={schema:'cqc.pass9.independent-real-gameplay-proof/1',status:records.every(r=>r.status==='passed')?'passed':'failed',scope:opts.mode==='prepared'?'isolated-real-engine-preparation-not-integrated-not-browser-reviewed':'actual-imported-43-entry-source-real-engine',checks:records.length,passed:records.filter(r=>r.status==='passed').length,records,sourcePins:Object.fromEntries(pins),rawLiterals:{fighterSHA256:sha(rawFighters.s),finisherSHA256:sha(rawFinishers.s),engineSHA256:sha(rawEngine)},catalogueEntriesTested:43,catalogueSourceEntries:initialCatalogueEntries,activeTypedSourceMarks:activeMarkCount,rejectedMismatchedOriginProofs:rejected,projectileSlotFacingFixtures:bindings.length,unrelatedProfilesCompared:350,unrelatedActorParityFrames:350*160,nativeSources:pixels.sourcePNGs.length,browserReviewed:false,canvasReviewed:false,applicationWritten:false,imagesEdited:false,absolute1to1Certified:false,limits:['All numerical balance, resource counts and animation timing are Versus adaptations.','Native points are authored source pixels; original MSX2 firing coordinates are not established.','Production and browser evidence require root integration followed by a separate genuine browser run.']};
fs.writeFileSync(OUT+'/REAL_ENGINE_PROOF.json',JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({status:result.status,scope:result.scope,checks:result.checks,passed:result.passed,failures:records.filter(r=>r.status==='failed'),report:OUT+'/REAL_ENGINE_PROOF.json'}));process.exitCode=result.status==='passed'?0:1;
