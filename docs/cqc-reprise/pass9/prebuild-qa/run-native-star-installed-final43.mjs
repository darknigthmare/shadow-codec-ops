import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const BASE='/workspace/cqc-pass9-gameplay-qa-preparation';
const STAR='/workspace/cqc-pass9-black-star-generation';
const R='/workspace/cqc-game-working/cqc-versus-v056';
const label=process.argv[2];assert.match(label||'',/^[a-z0-9][a-z0-9_-]*$/);
const OUT=path.join('/workspace/cqc-pass9-final-qa','runs',label);assert.ok(!fs.existsSync(OUT));fs.mkdirSync(OUT,{recursive:true});
const copy=v=>JSON.parse(JSON.stringify(v)),sha=v=>crypto.createHash('sha256').update(v).digest('hex'),pins={},records=[];
function seal(p){const b=fs.readFileSync(p),s=fs.statSync(p);pins[p]={sha256:sha(b),bytes:b.length,ino:s.ino,mode:s.mode,nlink:s.nlink,mtimeMs:s.mtimeMs};return b;}
const rendererFile=R+'/src/cqc-pass9-projectile-art.js',renderer=seal(rendererFile).toString();
const catalogueFile=R+'/src/cqc-pass9-projectile-catalog.js',catalogueJS=seal(catalogueFile).toString();
const atlasContext=vm.createContext({});atlasContext.window=atlasContext;vm.runInContext(catalogueJS,atlasContext);
const atlas=copy(atlasContext.CQC_PASS9_PROJECTILE_CATALOG);
const nativeFile=R+'/'+atlas.file,png=seal(nativeFile);
const freezeFile='/workspace/cqc-pass9-final-qa/actual43-source-freeze.json';
const freezeBytes=seal(freezeFile);assert.equal(sha(freezeBytes),'dea09b3b8870c5c7d3eb6f6fbe88c9540a0852422d7f255c30d6d51546687052');
const freeze=JSON.parse(freezeBytes);assert.equal(freeze.entryCount,43);assert.equal(freeze.status,'frozen');
const frozenByPath=new Map(freeze.files.map(p=>[p.path,p]));
function frozenText(file){const b=seal(file);assert.equal(sha(b),frozenByPath.get(file).sha256);return b.toString();}

assert.equal(sha(png),'29722b7fd8fe23d6c2929e9c54c4b9e8a35c48d451ab955b8325ae8cd8d3e0dc');assert.equal(sha(png),atlas.sha256);
assert.equal(png.subarray(0,8).toString('hex'),'89504e470d0a1a0a');assert.equal(png.readUInt32BE(16),atlas.width);assert.equal(png.readUInt32BE(20),atlas.height);
const engineText=seal(R+'/src/cqc-pass8-combat-engine.js').toString();assert.equal(sha(engineText),'fd6c8d85333887a60056f1ab11e92abb63250c07de1664a6d832c1c679f34a8f');
// Fully installed actual43 sources, original actual354 FIGHTERS and actual adapter stack.
const moduleText=frozenText(R+'/modules/unified-versus-v055.html');
function literal(text,token){const start=text.indexOf(token)+token.length;assert.ok(start>=token.length);let depth=0,str=false,esc=false;
  for(let i=start;i<text.length;i++){const c=text[i];if(str){if(esc)esc=false;else if(c==='\\')esc=true;else if(c==='"')str=false;continue;}
    if(c==='"')str=true;else if(c==='['||c==='{')depth++;else if(c===']'||c==='}'){if(--depth===0)return JSON.parse(text.slice(start,i+1));}}throw Error('Incomplete actual FIGHTERS');}
const profiles=literal(moduleText,'const FIGHTERS=');assert.equal(profiles.length,354);
const actualCatalog=JSON.parse(frozenText(R+'/data/combat-sprite-catalog-v1.json'));assert.equal(Object.keys(actualCatalog.entries).length,43);
const hydrate=vm.createContext({CQC_COMBAT_SPRITE_CATALOG:actualCatalog});hydrate.window=hydrate;
for(const name of ['cqc-canonical-combat-reprise.js','cqc-pass3-combat-fidelity.js',...Array.from({length:6},(_,i)=>i+4).flatMap(n=>['cqc-pass'+n+'-native-origins.js','cqc-pass'+n+'-combat-fidelity.js'])])vm.runInContext(frozenText(R+'/src/'+name),hydrate,{filename:name});
hydrate.CQC_CANONICAL_COMBAT_REPRISE.apply(profiles);for(let n=3;n<=9;n++)hydrate['CQC_PASS'+n+'_COMBAT_FIDELITY'].apply(profiles);
assert.ok(moduleText.includes('c.translate(x,y);if(window.CQC_PASS9_PROJECTILE_ART?.drawProjectile(c,q,zoom,[s.a,s.b][q.owner])){c.restore();continue;}c.rotate(Math.atan2(q.vy,q.vx));'),'Actual module native dispatch must precede parent velocity rotation');

const black=profiles.find(f=>f.uid==='core__ninja_mg2'),opponent=copy(profiles.find(f=>f.uid==='core__jungle_evil'));
const context=vm.createContext({});vm.runInContext(engineText,context);vm.runInContext(catalogueJS,context);vm.runInContext(renderer,context);
const E=context.CQCCombat048Pass8,api=context.CQC_PASS9_PROJECTILE_ART;
function check(name,fn){try{records.push({name,status:'passed',evidence:fn()??null});}catch(e){records.push({name,status:'failed',error:e.message});}}
const canvas=()=>{const c={calls:[]};for(const name of ['save','restore','rotate','beginPath','moveTo','lineTo','closePath','fill','stroke','drawImage'])c[name]=(...args)=>c.calls.push({name,args:args.map(a=>typeof a==='object'?'image-metadata-test-double':a)});return c;};
class NativeMetadataImage{set src(s){this.naturalWidth=atlas.width;this.naturalHeight=atlas.height;this.onload();}}
function state(face,slot='special'){
  const s=E.create(copy(black),copy(opponent),{training:true,seed:45});s.a.x=face===1?200:1080;s.b.x=s.a.x+face*700;s.a.face=face;s.b.face=-face;s.a.meter=100;
  assert.equal(E.start(s,s.a,slot),true);for(let i=0;i<s.a.f.combat.moves[slot].startup;i++)E.step(s,[E.empty(),E.empty()]);return s;
}
for(const face of [1,-1])for(const slot of ['special','super'])check('Eight native poses from genuine engine ages '+slot+'/'+face,()=>{
  const s=state(face,slot),art=api.createRenderer({catalog:atlas,Image:NativeMetadataImage}),rows=[];
  assert.equal(art.diagnostics().status,'native-ready');
  for(let tick=0;tick<24;tick++){
    const q=s.projectiles.find(q=>q.owner===0&&q.delay===0);assert.ok(q);const prior=copy(q),ownerPrior=copy(s.a),expected=Math.floor(q.age/3)%8,frame=atlas.frames[expected],c=canvas();
    assert.equal(art.drawProjectile(c,q,1,s.a),true);assert.deepEqual(copy(q),prior);assert.deepEqual(copy(s.a),ownerPrior);assert.equal(c.calls.filter(x=>x.name==='rotate').length,0,'Native frames must not receive a second Canvas spin');
    const draws=c.calls.filter(x=>x.name==='drawImage');assert.equal(draws.length,1);const args=draws[0].args;assert.deepEqual(args.slice(1,5),frame.rect);
    const scale=18/219,[x,y,w,h]=frame.rect;assert.deepEqual(args.slice(5),[-w*scale*frame.pivot[0],-h*scale*frame.pivot[1],w*scale,h*scale]);
    const observed=copy(art.diagnostics().recentNativeSelections.at(-1));assert.equal(observed.age,q.age);assert.equal(observed.projectileId,q.id);assert.equal(observed.ownerSlot,q.owner);assert.equal(observed.ownerUID,black.uid);assert.equal(observed.sourceFrameIndex,expected);assert.equal(observed.sourceSHA256,atlas.sha256);
    rows.push({actualEngineAge:q.age,frame:expected,projectileId:q.id,sourceRect:frame.rect,sourcePivot:frame.pivot});E.step(s,[E.empty(),E.empty()]);
  }
  assert.deepEqual(copy(art.diagnostics().nativeSelectedFrames8),[0,1,2,3,4,5,6,7]);assert.equal(art.diagnostics().fallbackDraws,0);
  return{actualEngineAgesUsed:true,nativePNGDimensionsVerifiedFromBytes:true,imageLoadingUsesExplicitMetadataTestDouble:true,imageDecodedInBrowser:false,commonSourcePixelScale:18/219,secondNativeCanvasRotation:false,poses:rows};
});
check('Every foreign actor and mismatched object is rejected without any draw or state write',()=>{
  const s=state(1),q=s.projectiles[0],art=api.createRenderer({catalog:atlas,Image:NativeMetadataImage});
  const cases=[['ownerUID',null],['ownerSlot',null],['ownerNumber',p=>p.owner=1],['kind',p=>p.kind='ballistic'],['tag',p=>p.def.tag='ballistic'],['moveID',p=>p.def.id='core__ninja_mg2::heavy'],['dead',p=>p.dead=true],['delay',p=>p.delay=5],['age',p=>p.age=NaN],['position',p=>p.x=Infinity],['id',p=>p.id=0]];
  for(const [label,change]of cases){const p=copy(q),owner=copy(s.a);if(change)change(p);if(label==='ownerUID')owner.f.uid='core__snake';if(label==='ownerSlot')owner.slot=1;const c=canvas();assert.equal(art.drawProjectile(c,p,1,owner),false,label);assert.equal(c.calls.length,0);}
  for(const zoom of [0,-1,5,NaN,Infinity]){const c=canvas();assert.equal(art.drawProjectile(c,q,zoom,s.a),false);assert.equal(c.calls.length,0);}
  for(const p of s.projectiles.filter(p=>p.delay>0)){const c=canvas();assert.equal(art.drawProjectile(c,p,1,s.a),false);assert.equal(c.calls.length,0);}
  return{exactObjectOwnerAndKindsRequired:true,rejectedObjectVariations:cases.length,invalidZooms:5};
});
check('Incorrect native dimensions, loading or missing Image use qualified Canvas fallback with no native drawImage',()=>{
  const s=state(1),q=s.projectiles[0];class WrongImage{set src(s){this.naturalWidth=atlas.width-1;this.naturalHeight=atlas.height;this.onload();}}class LoadingImage{set src(s){}}
  for(const ImageType of [WrongImage,LoadingImage,undefined]){const art=api.createRenderer({catalog:atlas,Image:ImageType}),c=canvas();assert.notEqual(art.diagnostics().status,'native-ready');assert.equal(art.drawProjectile(c,q,1,s.a),true);assert.equal(c.calls.filter(x=>x.name==='drawImage').length,0);assert.equal(c.calls.filter(x=>x.name==='rotate').length,1);assert.equal(art.diagnostics().fallbackDraws,1);assert.equal(art.diagnostics().nativeDraws,0);}
  return{nativeBeforeReady:false,fallbackQualified:true};
});
check('Wrong source shape/pivot/common scale/timing identities reject the native atlas',()=>{
  const changes={frameCount:a=>a.frames.pop(),rect:a=>a.frames[0].rect=[0,0,2000,2000],pivot:a=>a.frames[0].pivot=[1.5,.5],scale:a=>a.sourceScaleReferenceWidth=218,timing:a=>a.poseTicks=1,uid:a=>a.uid='core__snake',path:a=>a.file='../outside.png',hash:a=>a.sha256='not-a-source-hash',falseCertification:a=>a.absolute1to1Certified=true};
  for(const [label,change]of Object.entries(changes)){const a=copy(atlas);change(a);assert.throws(()=>api.createRenderer({catalog:a,Image:NativeMetadataImage}),label);}return{rejectedAtlases:Object.keys(changes).length};
});
check('Generated PNG, producer layout and script bytes remain untouched',()=>{
  for(const [file,p]of Object.entries(pins)){const s=fs.statSync(file),current={sha256:sha(fs.readFileSync(file)),bytes:s.size,ino:s.ino,mode:s.mode,nlink:s.nlink,mtimeMs:s.mtimeMs};assert.deepEqual(current,p,file);}return{sourcePins:Object.keys(pins).length,nativeImageEdited:false};
});
const result={schema:'cqc.pass9.actual-installed-native-star-real-engine-renderer-proof/1',sourceScope:'actual43-installed-catalogue-and-354-real-FIGHTERS-hydrated-by-actual-installed-adapters',sourceFreezeSHA256:sha(freezeBytes),actualNativeDispatchBeforeParentRotate:true,status:records.every(r=>r.status==='passed')?'passed':'failed',records,checks:records.length,passed:records.filter(r=>r.status==='passed').length,sourcePins:pins,handlerSHA256:sha(renderer),catalogueSHA256:sha(catalogueJS),nativeSHA256:atlas.sha256,nativePoses:8,enginePoseTiming:3,sourcePixelScale:18/219,actualProjectileAgesFromEngine:true,applicationWritten:false,nativeImageEdited:false,imageLoadingUsesTestDouble:true,nativeImageDecodedInBrowser:false,browserReviewed:false,absolute1to1Certified:false,limitations:['Eight generated source rotations and their exact source pixels are preserved.','Pose cadence, projectile display size and four-point shape are qualified Versus interpretations.','The native drawImage branch runs on actual engine projectile objects with an Image metadata test double; real browser image decoding and actual production dispatch remain separate required evidence.']};
fs.writeFileSync(OUT+'/NATIVE_STAR_RENDERER_PROOF.json',JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify({status:result.status,checks:result.checks,passed:result.passed,handlerSHA256:result.handlerSHA256,failures:records.filter(r=>r.status==='failed'),report:OUT+'/NATIVE_STAR_RENDERER_PROOF.json'}));process.exitCode=result.status==='passed'?0:1;
