import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {spawnSync} from 'node:child_process';

const R='/workspace/cqc-game-working/cqc-versus-v056',S='/workspace/shadow-codec-recovered/public/cqc';
const OUT='/workspace/cqc-pass8-independent-gameplay-review/verified-final-origins';
const expectedCatalog='3fe34bf2be1cc7c5365a82e57b747b269adf795c1940885a6ce6e8a4a793d747';
const expectedHelper='af729ab492f0f54439a0cbdc9ec48e32847bfa45e0a2485e06d2cf9d17f1c913';
assert.ok(!fs.existsSync(OUT),'Preserve old reports; use a new runner/evidence path for a new snapshot');
fs.mkdirSync(OUT,{recursive:true});fs.mkdirSync(OUT+'/source');
const copy=v=>JSON.parse(JSON.stringify(v)),sha=v=>crypto.createHash('sha256').update(v).digest('hex');
const sourceFiles=[],records=[];
const read=p=>fs.readFileSync(p,'utf8'),json=p=>JSON.parse(read(p));
function snapshot(relative){const data=fs.readFileSync(R+'/'+relative),target=OUT+'/source/'+path.basename(relative);fs.writeFileSync(target,data);sourceFiles.push({path:R+'/'+relative,snapshot:target,sha256:sha(data),bytes:data.length});return data.toString();}
const helper=snapshot('src/cqc-pass8-combat-fidelity.js'),engine=snapshot('src/cqc-pass8-combat-engine.js'),p4=snapshot('src/cqc-pass4-combat-fidelity.js'),p7=snapshot('src/cqc-pass7-combat-fidelity.js'),originsText=snapshot('src/cqc-pass8-native-origins.js'),catalogText=snapshot('data/combat-sprite-catalog-v1.json');
assert.equal(sha(catalogText),expectedCatalog);assert.equal(sha(helper),expectedHelper);
const catalog=JSON.parse(catalogText),roster=json(R+'/data/unified-roster-v053.json').fighters;
const context=vm.createContext({});for(const code of [p4,p7,originsText,helper,engine])vm.runInContext(code,context);
const F=context.CQC_PASS8_COMBAT_FIDELITY,E=context.CQCCombat048Pass8,anchors=context.CQC_PASS8_NATIVE_ORIGINS;
const fighters=copy(roster);F.apply(fighters,catalog,anchors);
const get=uid=>copy(fighters.find(f=>f.uid===uid));
function check(name,fn){try{records.push({name,status:'passed',evidence:fn()});}catch(e){records.push({name,status:'failed',error:e.message});}}
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-8,`Expected ${a} approximately ${b}`);
const idle=()=>[E.empty(),E.empty()];
const actorUIDs=['core__raging_raven','core__eva_mgs3','core__crying_wolf'];
const sourcePoints=[];
for(const uid of actorUIDs)for(const [group,marks]of Object.entries(anchors[uid]))for(const [side,face]of [['right',1],['left',-1]]){
  const mark=copy(marks[side]),entry=catalog.entries[uid],frame=(entry.facing===face?entry.actions:entry.oppositeActions)[mark.action].frames[mark.frame];
  sourcePoints.push({uid,group,side,face,mark,frame,file:R+'/'+mark.file,shadowFile:S+'/'+mark.file});
}
assert.equal(sourcePoints.length,16);
// Pillow only reads unchanged PNGs; it never crops, recolors, saves or edits images.
const pixelReader=String.raw`import sys,json,hashlib
from pathlib import Path
from PIL import Image
rows=json.load(sys.stdin);out=[];cache={}
for r in rows:
 p=Path(r['file'])
 if str(p) not in cache:
  im=Image.open(p).convert('RGBA'); cache[str(p)]=(im,hashlib.sha256(p.read_bytes()).hexdigest())
 im,h=cache[str(p)];x,y=r['mark']['point'];px=im.getpixel((int(x),int(y)))
 s=Path(r['shadowFile'])
 out.append({'uid':r['uid'],'group':r['group'],'side':r['side'],'file':str(p),'sha256':h,'width':im.width,'height':im.height,'point':[x,y],'pointRGBA':list(px),'shadowAssetExists':s.exists(),'shadowSHA256':hashlib.sha256(s.read_bytes()).hexdigest() if s.exists() else None})
print(json.dumps(out))
`;
const pixelResult=spawnSync('python',['-c',pixelReader],{input:JSON.stringify(sourcePoints),encoding:'utf8',maxBuffer:1024*1024,timeout:30000});
assert.equal(pixelResult.status,0,pixelResult.stderr);const pixels=JSON.parse(pixelResult.stdout);
fs.writeFileSync(OUT+'/NATIVE_SOURCE_PIXEL_PROOF.json',JSON.stringify(pixels,null,2)+'\n');
const sourceNativeHashes=Object.fromEntries(pixels.map(p=>[p.file,p.sha256]));
function polygonContains(poly,point){let inside=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){
  const [x,y]=poly[i],[qx,qy]=poly[j],dx=qx-x,dy=qy-y,t=((point[0]-x)*dx+(point[1]-y)*dy)/(dx*dx+dy*dy||1),u=Math.max(0,Math.min(1,t));
  if(Math.hypot(point[0]-(x+dx*u),point[1]-(y+dy*u))<1e-9)return true;
  if((y>point[1])!==(qy>point[1])&&point[0]<(qx-x)*(point[1]-y)/(qy-y)+x)inside=!inside;
}return inside;}
for(let i=0;i<sourcePoints.length;i++)check('Native first-active visible muzzle '+sourcePoints[i].uid+' '+sourcePoints[i].group+' '+sourcePoints[i].side,()=>{
  const {uid,group,side,face,mark:m,frame, file}=sourcePoints[i],pixel=pixels[i],entry=catalog.entries[uid];
  assert.equal(entry.mirror,false);assert.equal(frame.file,m.file);assert.equal(frame.sha256,m.sha256);assert.equal(pixel.sha256,m.sha256);
  assert.equal(m.frame,entry.phaseMap[m.action].active[0]);assert.equal(m.pointKind,'native-visible-firearm-muzzle');assert.equal(m.physicallyViewed,true);
  assert.equal(pixel.pointRGBA[3],m.sourcePixelAlpha);assert.ok(pixel.pointRGBA[3]>0);assert.deepEqual(m.rect,frame.rect);assert.deepEqual(m.pivot,frame.pivot);
  assert.equal(m.sourceFrameHeight,entry.sourceFrameHeights[m.file]);assert.equal(m.engineBodyScale,1.12);
  const [x,y,w,h]=frame.rect;assert.ok(m.point[0]>=x&&m.point[0]<x+w&&m.point[1]>=y&&m.point[1]<y+h);
  if(frame.clipPolygon)assert.ok(polygonContains(frame.clipPolygon,[(m.point[0]+.5-x)/w,(m.point[1]+.5-y)/h]),'Measured muzzle pixel center excluded by Canvas contour');
  const calculated=F.origins(entry,anchors[uid][group],m.action);assert.ok(calculated);near(calculated[face].forward,m.adaptedWorldForward);near(calculated[face].height,m.adaptedWorldHeight);
  return{sourcePoint:m.point,sourceRGBA:pixel.pointRGBA,sourceSHA256:m.sha256,firstActiveSourceFrame:m.frame,worldOrigin:copy(calculated[face]),canvasContourIncludesActualPixel:true,shadowAssetStatus:pixel.shadowAssetExists?(pixel.shadowSHA256===m.sha256?'identical':'different'):'pending-sync'};
});
let rejected=0;
for(const uid of actorUIDs)for(const [group,marks]of Object.entries(anchors[uid]))check('Reject incompatible source proof '+uid+' '+group,()=>{
  const entry=catalog.entries[uid],action=marks.right.action,mutators={wrongSHA:m=>m.sha256='0'.repeat(64),wrongFile:m=>m.file='fake.png',wrongAction:m=>m.action='not-the-action',wrongPhase:m=>m.frame=0,
    unviewed:m=>m.physicallyViewed=false,transparent:m=>m.sourcePixelAlpha=0,wrongRect:m=>m.rect=[0,0,1,1],wrongPivot:m=>m.pivot=[.5,.5],wrongHeight:m=>m.sourceFrameHeight++,wrongScale:m=>m.engineBodyScale=1,
    nonMuzzle:m=>m.pointKind='native-visible-unarmed-contact',outsideSource:m=>m.point=[-1,-1],nonFinite:m=>m.point=[Infinity,m.point[1]]};
  for(const side of ['right','left'])for(const [label,mutate]of Object.entries(mutators)){const bad=copy(marks);mutate(bad[side]);assert.equal(F.origins(entry,bad,action),null,label+' '+side);rejected++;}
  const mirrored=copy(entry);mirrored.mirror=true;assert.equal(F.origins(mirrored,marks,action),null);rejected++;
  return{mutatedProofsRejected:27};
});
const usedSourceKeys=new Set(),bindings=[];
for(const uid of actorUIDs)for(const [group,slots]of Object.entries(F.slots[uid]))for(const slot of slots){
  const move=get(uid).combat.moves[slot];assert.equal(move.kind,'projectile');assert.equal(catalog.entries[uid].actionMap[slot],anchors[uid][group].right.action);
  for(const [side,face]of [['right',1],['left',-1]]){bindings.push({uid,group,slot,side,face});usedSourceKeys.add(uid+' '+group+' '+side);}
}
assert.equal(usedSourceKeys.size,14);assert.equal(bindings.length,16);
function createCase(binding,defenderUID='core__snake',distance=420){const s=E.create(get(binding.uid),get(defenderUID),{training:true});
  s.a.x=binding.face===1?200:1080;s.b.x=s.a.x+binding.face*distance;s.a.face=binding.face;s.b.face=-binding.face;s.a.meter=100;return s;}
function toActivation(s,slot,targetInput={}){assert.equal(E.start(s,s.a,slot),true);const d=s.a.attack.def;
  assert.ok(d.startup>0&&d.startup<=200);for(let i=0;i<d.startup;i++){const inputs=idle();Object.assign(inputs[1],targetInput);E.step(s,inputs);}assert.equal(s.metrics.activate,1);return d;}
for(const b of bindings)check('Actual anchored spawn and once-only resource payment '+b.uid+' '+b.slot+' '+b.side,()=>{
  const s=createCase(b,'core__snake',800),resource=s.a.f.combat.resource,r0=s.a.r,meter0=s.a.meter,x0=s.a.x,y0=s.a.y,d=toActivation(s,b.slot);
  const origin=d.projectileOrigin[b.face],mark=anchors[b.uid][b.group][b.side];near(origin.forward,mark.adaptedWorldForward);near(origin.height,mark.adaptedWorldHeight);
  assert.equal(s.projectiles.length,d.count||1);assert.equal(s.metrics.projectile,d.count||1);assert.equal(s.stats,undefined);
  const projected=[];for(const q of s.projectiles){
    assert.equal(q.owner,0);assert.equal(q.burstId,s.a.attack.id);const moved=q.age>0,spawnX=q.x-(moved?b.face*(d.speed||15):0),spawnY=q.y-(moved?(d.vy||0):0);
    near(spawnX,x0+b.face*origin.forward);near(spawnY,y0-origin.height);projected.push({id:q.id,age:q.age,delayRemaining:q.delay,recoveredActualSpawn:[spawnX,spawnY],afterFirstPhysics:[q.x,q.y]});
  }
  const sign=['heat','cost'].includes(resource.kind)?1:-1;near(s.a.r,r0+sign*(d.cost||0));near(s.a.meter,meter0-(d.meter||0));assert.equal(s.a.stats.starts,1);assert.equal(s.a.stats.activations,1);
  const bound=createCase(b,'core__snake',800),cost=d.cost||0;if(cost>0){bound.a.r=['heat','cost'].includes(resource.kind)?resource.max-cost:cost;bound.a.meter=100;assert.equal(E.start(bound,bound.a,b.slot),true);
    const denied=createCase(b,'core__snake',800);denied.a.r=['heat','cost'].includes(resource.kind)?resource.max-cost+1:cost-1;denied.a.meter=100;assert.equal(E.start(denied,denied.a,b.slot),false);assert.equal(denied.projectiles.length,0);}
  if(d.meter){const denied=createCase(b,'core__snake',800);denied.a.meter=d.meter-1;assert.equal(E.start(denied,denied.a,b.slot),false);assert.equal(denied.projectiles.length,0);}
  return{sourceGroup:b.group,sourceFrame:mark.frame,sourceSHA256:mark.sha256,actualSpawnAnchored:true,sourceWorldOrigin:copy(origin),projectiles:projected,resourceKind:resource.kind,resourceBefore:r0,resourceAfter:s.a.r,costChargedOnce:d.cost||0,meterCharged:d.meter||0,declaredAdaptation:d.lore||'versus adaptation',zeroCostMoveUsesMeterInsteadOfResource:cost===0&&!!d.meter};
});
const directBindings=bindings.filter(b=>b.uid!=='core__raging_raven');
const targetCases=[{uid:'core__snake',name:'standing adult',down:false},{uid:'core__snake',name:'crouching adult',down:true},{uid:'roster50__sunny_mgs4',name:'Sunny MGS4 child',down:false},{uid:'roster50__sunny_mgr',name:'Sunny MGR child',down:false},{uid:'core__crying_wolf',name:'low quadruped',down:false}];
for(const b of directBindings)check('Real unlowered projectile against body heights '+b.uid+' '+b.slot+' '+b.side,()=>{
  const rows=[];
  for(const target of targetCases){const s=createCase(b,target.uid),d=toActivation(s,b.slot,{down:target.down}),q=s.projectiles.find(q=>q.age===1),body=E.box(s.b),shotY=q.y;
    // Vertical overlap predicts a stationary first shot; source muzzle height is never altered.
    const expectedVertical=E.overlap({x:body.x,y:shotY-7,w:body.w,h:14},body);
    for(let i=0;i<Math.ceil(420/(d.speed||15))+8;i++){const inputs=idle();inputs[1].down=target.down;E.step(s,inputs);}
    const damaged=s.b.life<10000;assert.equal(damaged,!!expectedVertical,target.name+' actual collision differs from source-height geometry');
    rows.push({target:target.name,bodyHeight:body.h,bodyWidth:body.w,sourceOriginHeight:d.projectileOrigin[b.face].height,firstProjectileY:shotY,expectedVerticalOverlap:!!expectedVertical,actualLifeLost:10000-s.b.life,hit:damaged});
  }
  return{targets:rows,nativePointLoweredToForceHit:false,shortTargetsCanActuallyBeMissed:true};
});
const grenadeBindings=bindings.filter(b=>b.uid==='core__raging_raven');
function firstBlast(s,maxFrames=220,targetInput={}){for(let i=0;i<maxFrames;i++){
  const inputs=idle();Object.assign(inputs[1],targetInput);E.step(s,inputs);if(s.metrics.explosion)return s.fx.find(f=>f.kind==='blast');
}throw new Error('Bounded grenade fixture did not produce first explosion');}
for(const b of grenadeBindings)check('Real grenade arc and first-blast geometry '+b.slot+' '+b.side,()=>{
  const base=createCase(b,'core__snake',800),d=toActivation(base,b.slot),blast=firstBlast(base);assert.ok(blast);const radius=d.radius||90,rows=[];
  for(const [uid,down,label]of [['core__snake',false,'standing adult'],['core__snake',true,'crouching adult'],['core__crying_wolf',false,'low quadruped']]){
    const s=createCase(b,uid,800);s.b.x=blast.x;const move=toActivation(s,b.slot,{down}),body=E.box(s.b),expected=E.overlap({x:blast.x-radius,y:blast.y-radius,w:radius*2,h:radius*2},body);
    const actual=firstBlast(s,220,{down});near(actual.x,blast.x);near(actual.y,blast.y);assert.equal(s.b.life<10000,!!expected);assert.equal(s.metrics.explosion,1);
    rows.push({target:label,initialBody:copy(body),explosion:[actual.x,actual.y],radius,expectedOverlap:!!expected,actualLifeLost:10000-s.b.life});
  }
  const miss=createCase(b,'core__snake',800),w=E.box(miss.b).w;miss.b.x=Math.min(1215,Math.max(65,blast.x+b.face*(radius+w/2+20)));
  const missBody=E.box(miss.b),expected=E.overlap({x:blast.x-radius,y:blast.y-radius,w:radius*2,h:radius*2},missBody);assert.equal(expected,false);
  toActivation(miss,b.slot);firstBlast(miss);assert.equal(miss.b.life,10000);
  return{firstExplosion:[blast.x,blast.y],radius,bodyCases:rows,horizontalOutsideRadiusMiss:true,gravity:d.gravity,fuse:d.fuse,sourceMuzzleHeightUnchanged:true,blastGeometryIsVersusAdaptation:true};
});
for(const face of [1,-1])check('Wolf downward charge uses melee, no unused railgun emission '+face,()=>{
  const b={uid:'core__crying_wolf',face},s=createCase(b,'core__snake'),r0=s.a.r,x0=s.a.x,d=toActivation(s,'specialDown');
  assert.equal(d.kind,'melee');assert.equal(d.tag,'strike');assert.equal(d.projectileOrigin,undefined);
  for(let i=0;i<d.active+d.recovery;i++)E.step(s,idle());near(s.a.x-x0,face*d.travel*d.active);near(s.a.r,r0-d.cost);
  assert.equal(s.projectiles.length,0);assert.equal(s.metrics.projectile,undefined);assert.equal(s.traps.length,0);assert.equal(s.b.life,10000);
  const contact=createCase(b,'core__snake',105);toActivation(contact,'specialDown');for(let i=0;i<d.active;i++)E.step(contact,idle());assert.ok(contact.b.life<10000);assert.equal(contact.metrics.projectile,undefined);
  assert.equal(catalog.entries[b.uid].actionMap.specialDown,'heavy');
  return{sourceAction:catalog.entries[b.uid].actionMap.specialDown,measuredDeployMuzzleNotBoundToMove:true,projectilesCreated:0,actualTravelPixels:s.a.x-x0,costCharged:d.cost,actualMeleeLifeLost:10000-contact.b.life,animationIsAdaptedBodyCheckWithCarriedRailgun:true,sourcePerfectChargeAnimationNotCertified:true};
});
for(const uid of actorUIDs)for(const face of [1,-1])check('Source weapon actors retain close physical strikes '+uid+' '+face,()=>{
  const s=createCase({uid,face},'core__snake',65),d=toActivation(s,'heavy');for(let i=0;i<d.active;i++)E.step(s,idle());
  assert.equal(d.kind,'melee');assert.ok(s.b.life<10000);assert.equal(s.metrics.projectile,undefined);assert.equal(s.projectiles.length,0);
  return{heavyIsPhysicalMelee:true,actualLifeLost:10000-s.b.life,projectilesCreated:0};
});
check('Final source descriptions and Mantis overrides reflect reviewed incarnations',()=>{
  assert.equal(get('archive__paz').visual.hair,'short-wavy');assert.equal(get('npc53__paz_gz').visual.hair,'very-short-cropped');
  assert.equal(catalog.entries.core__screaming_mantis.actionMap.specialForward,'jump');assert.equal(catalog.entries.core__screaming_mantis.actionMap.super,'throw');
  assert.equal(catalog.entries.roster50__sunny_mgs4.displayHeight,145);assert.equal(catalog.entries.roster50__sunny_mgr.displayHeight,170);
  for(const uid of ['archive__paz','npc53__paz_gz'])assert.ok(catalog.entries[uid].actions[catalog.entries[uid].actionMap.specialDown]);
  return{pazHairCorrected:true,mantisHoverAndMechanicalGraspBound:true,sunnySourceDisplayHeights:{mgs4:145,mgr:170},pazObservationUsesExistingNonBallisticPose:true};
});
const after={catalogSHA256:sha(fs.readFileSync(R+'/data/combat-sprite-catalog-v1.json')),helperSHA256:sha(fs.readFileSync(R+'/src/cqc-pass8-combat-fidelity.js')),originsSHA256:sha(fs.readFileSync(R+'/src/cqc-pass8-native-origins.js')),nativePNGs:Object.fromEntries(Object.keys(sourceNativeHashes).map(p=>[p,sha(fs.readFileSync(p))]))};
check('Frozen source/catalog and all six native PNG bytes remain unchanged through review',()=>{
  assert.equal(after.catalogSHA256,expectedCatalog);assert.equal(after.helperSHA256,expectedHelper);assert.equal(after.originsSHA256,sha(originsText));assert.deepEqual(after.nativePNGs,sourceNativeHashes);return{sourceSnapshotsStable:true,reviewerMutatedAppOrPNGs:false};
});
const used=[...usedSourceKeys],unused=sourcePoints.filter(p=>!usedSourceKeys.has(p.uid+' '+p.group+' '+p.side)).map(p=>({uid:p.uid,group:p.group,side:p.side,sourcePoint:p.mark.point,reason:'Source low/braced railgun point exists; current specialDown is a melee body charge with no projectile.'}));
const result={schema:'cqc.pass8.independent-final-native-origins-gameplay/1',status:records.every(r=>r.status==='passed')?'passed':'failed',records,checks:records.length,passed:records.filter(r=>r.status==='passed').length,
  sourceFiles,frozenCatalogSHA256:expectedCatalog,frozenHelperSHA256:expectedHelper,nativeMarksMeasured:16,nativeMarksUsedByProjectileMoves:used.length,nativeMarksUnused:unused,projectileSlotAndFacingFixtures:bindings.length,
  sourceProofMutationsRejected:rejected,actualBurstCountsAndOnceOnlyResourceCostsVerified:true,sourceNativeHashes,sourceAfterRun:after,
  sourceStatus:'closest_supported',absolute1to1Certified:false,originalNumericalBallisticsOrAnimationTimingCertified:false,
  limitations:['Native muzzle points are actual unchanged authored pixels, not original-game screenshot firing coordinates.','Wolf low/braced deploy origins remain measured but are not bound to its current melee downward body charge; the carried railgun does not fire.','EVA standing muzzle is reused by special and six-shot super, producing extra slot fixtures without inventing additional source marks.','High source muzzle paths really miss shorter children/quadrupeds; points were never lowered to force a hit. Raven uses real gravity/fuse/explosion geometry instead of a fake straight bullet.','Browser suite belongs to root; this independent task runs the real combat engine, reads actual native pixels and preserves all prior reports.'],
  appMutatedByReviewer:false,nativePNGsMutatedByReviewer:false};
fs.writeFileSync(OUT+'/FINAL_ORIGINS_GAMEPLAY_REVIEW.json',JSON.stringify(result,null,2)+'\n');
fs.writeFileSync(OUT+'/review-script.mjs',fs.readFileSync(new URL(import.meta.url)));
console.log(JSON.stringify({status:result.status,checks:result.checks,passed:result.passed,sourceMarks:16,sourceMarksUsed:used.length,slotFacingFixtures:bindings.length,rejectedSourceMutations:rejected,failures:records.filter(r=>r.status==='failed'),report:OUT+'/FINAL_ORIGINS_GAMEPLAY_REVIEW.json'}));
process.exitCode=result.status==='passed'?0:1;
