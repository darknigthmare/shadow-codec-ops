import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const R='/workspace/cqc-game-working/cqc-versus-v056';
const S='/workspace/shadow-codec-recovered';
const OUT='/workspace/cqc-pass8-independent-gameplay-review';
const run=path.join(OUT,process.argv[2]||'verified-run-02');
assert.ok(!fs.existsSync(run),'Each review must retain its own fresh evidence directory');
fs.mkdirSync(run,{recursive:true});
const read=p=>fs.readFileSync(p,'utf8');
const json=p=>JSON.parse(read(p));
const copy=v=>JSON.parse(JSON.stringify(v));
const sha=v=>crypto.createHash('sha256').update(v).digest('hex');
const records=[],sourceFiles=[];
const snapshot=(absolute,name)=>{
  const bytes=fs.readFileSync(absolute),target=path.join(run,name);
  fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,bytes);
  sourceFiles.push({path:absolute,snapshot:target,sha256:sha(bytes),bytes:bytes.length});return bytes.toString();
};
const helper=snapshot(R+'/src/cqc-pass8-combat-fidelity.js','source/helper.js');
const engine=snapshot(R+'/src/cqc-pass8-combat-engine.js','source/engine.js');
const oldHelper=snapshot(R+'/preparation/reprise-pass8-provenance/source-drafts/cqc-pass8-combat-fidelity.before-support-trace-and-stationary-recovery-9e8201c3b24e.js','source/retained-before-fixes.js');
const p4=snapshot(R+'/src/cqc-pass4-combat-fidelity.js','source/pass4.js');
const p7=snapshot(R+'/src/cqc-pass7-combat-fidelity.js','source/pass7.js');
const originScript=snapshot(R+'/src/cqc-pass8-native-origins.js','source/native-origins-at-review.js');
const rosterFile=OUT+'/initial-snapshot/data/unified-roster-v053.json';
const finishersFile=OUT+'/initial-snapshot/data/finishers-v053.json';
const roster=json(rosterFile).fighters,rawFinishers=json(finishersFile);
sourceFiles.push({path:rosterFile,sha256:sha(fs.readFileSync(rosterFile))},{path:finishersFile,sha256:sha(fs.readFileSync(finishersFile))});
const catalog=json(R+'/data/combat-sprite-catalog-v1.json');
const ctx=(h=helper)=>{
  const c=vm.createContext({});for(const src of [p4,p7,h,engine])vm.runInContext(src,c);
  return{context:c,F:c.CQC_PASS8_COMBAT_FIDELITY,E:c.CQCCombat048Pass8};
};
const current=ctx(),before=ctx(oldHelper);
const scoped=new Set(current.F.reviewedUIDs),support=['roster50__sunny_mgs4','roster50__sunny_mgr','archive__paz','npc53__paz_gz'];
const scopedCatalog={entries:Object.fromEntries(Object.entries(catalog.entries).filter(([uid])=>scoped.has(uid)))};
fs.writeFileSync(path.join(run,'source/scoped-catalog-at-review.json'),JSON.stringify(scopedCatalog,null,2)+'\n');
sourceFiles.push({path:R+'/data/combat-sprite-catalog-v1.json',scope:'Only thirteen reviewed entries captured; integration still ongoing',scopedSha256:sha(JSON.stringify(scopedCatalog))});
function apply(system){const f=copy(roster);system.F.apply(f,scopedCatalog,{});return f;}
const fighters=apply(current),prior=apply(before);
const get=(uid,arr=fighters)=>copy(arr.find(f=>f.uid===uid));
const check=(name,fn)=>{try{const evidence=fn();records.push({name,status:'passed',evidence});}catch(e){records.push({name,status:'failed',error:e.message});}};
const idle=E=>[E.empty(),E.empty()];
function observe(system,uid,variant,arr){
  const E=system.E,s=E.create(get(uid,arr),get('core__snake',arr),{training:true});
  s.a.x=380;s.b.x=variant==='out-of-range'?850:610;
  if(variant==='cloaked')s.b.buffs.cloak={t:1000,hits:1};
  for(let i=0;i<4;i++){const inputs=idle(E);inputs[1].right=true;E.step(s,inputs);}
  assert.equal(E.start(s,s.a,'specialDown'),true);
  const startup=s.a.attack.def.startup;
  for(let i=0;i<startup+1;i++){
    if(variant==='cloak-during-startup'&&i===2)s.b.buffs.cloak={t:1000,hits:1};
    E.step(s,idle(E));
  }
  return{state:s,event:s.events.find(e=>e.type==='observe'),miss:s.events.find(e=>e.type==='observeMiss')};
}
check('Preserved draft reproduces unavailable observations and travelling recovery',()=>{
  const findings=[];
  for(const uid of support){
    const o=observe(before,uid,'visible',prior);assert.ok(o.miss);assert.equal(o.event,undefined);
    const E=before.E,s=E.create(get(uid,prior),get('core__snake',prior),{training:true});s.a.meter=100;s.a.r=30;
    const x=s.a.x;assert.equal(E.start(s,s.a,'super'),true);const d=s.a.attack.def;
    for(let i=0;i<d.startup+d.active+d.recovery;i++)E.step(s,idle(E));
    assert.equal(s.a.x-x,21);findings.push({uid,observation:'observeMiss despite visible opponent',superRecoveryTravelPixels:s.a.x-x});
  }
  return{fixedFindings:findings,retainedDraftSHA256:sha(oldHelper)};
});
for(const uid of support){
  for(const variant of ['visible','cloaked','out-of-range','cloak-during-startup'])check(uid+' observation '+variant,()=>{
    const {state:s,event,miss}=observe(current,uid,variant,fighters);
    if(variant==='visible'){
      assert.ok(event);assert.equal(miss,undefined);assert.ok(s.b.statuses.marked);
      assert.equal(event.sample.frame,event.frame-1);assert.equal(event.sample.x,s.b.x);
      assert.ok(Math.abs(event.sample.x-s.a.x)<=380);
    }else{assert.ok(miss);assert.equal(event,undefined);assert.equal(s.b.statuses.marked,undefined);}
    assert.equal(s.projectiles.length,0);assert.equal(s.traps.length,0);assert.equal(s.b.life,10000);
    return{observed:!!event,missed:!!miss,sourceFrame:event?.sample.frame,activationFrame:event?.frame,opponentLife:s.b.life};
  });
  for(const slot of ['special','super','utility'])check(uid+' stationary interruptible reserve recovery '+slot,()=>{
    const E=current.E,s=E.create(get(uid),get('core__snake'),{training:true});s.a.r=30;s.a.meter=100;s.a.life=8700;s.a.gray=600;
    const x=s.a.x,y=s.a.y,life=s.a.life;assert.equal(E.start(s,s.a,slot),true);const d=s.a.attack.def,paid=30-(d.cost||0);
    assert.equal(d.travel,undefined);assert.equal(d.lowProfile,undefined);
    for(let i=0;i<d.startup+d.active+d.recovery;i++)E.step(s,idle(E));
    assert.equal(s.a.x,x);assert.equal(s.a.y,y);assert.equal(s.a.life,life);assert.equal(s.b.life,10000);
    assert.equal(s.metrics.recover,1);assert.ok(s.a.r>=Math.min(100,paid+d.restore));assert.ok(s.a.r<=100);
    assert.equal(s.projectiles.length,0);assert.equal(s.traps.length,0);
    const interrupted=E.create(get(uid),get('core__snake'),{training:true});interrupted.a.r=30;interrupted.a.meter=100;
    assert.equal(E.start(interrupted,interrupted.a,slot),true);E.step(interrupted,idle(E));
    E.damage(interrupted,interrupted.b,interrupted.a,{kind:'melee',level:'mid',tag:'strike',damage:300,slot:'fixture'},{forced:true});
    for(let i=0;i<d.startup+2;i++)E.step(interrupted,idle(E));
    assert.equal(interrupted.metrics.recover,undefined);assert.equal(interrupted.a.attack,null);
    return{travelPixels:0,reserveAfterRecovery:s.a.r,lifeUnchanged:life,restorationInterrupted:true};
  });
}
check('Thirteen corrections preserve the other 341 full profiles and raw roster',()=>{
  for(let i=0;i<fighters.length;i++)if(!scoped.has(fighters[i].uid))assert.deepEqual(fighters[i],roster[i]);
  assert.equal(fighters.length,354);assert.equal(354-scoped.size,341);
  assert.equal(sha(fs.readFileSync(R+'/data/unified-roster-v053.json')),sha(fs.readFileSync(rosterFile)));
  for(const uid of support){const f=get(uid);assert.equal(f.combat.weapon,'none');assert.equal(f.combat.evidence,'simulation');
    for(const m of Object.values(f.combat.moves)){assert.ok(!['projectile','trap','heal'].includes(m.kind));assert.equal(m.projectileOrigin,undefined);}
    for(const slot of ['special','specialDown','specialForward','specialBack','super','utility'])assert.equal(f.combat.moves[slot].damage,0);
  }
  for(const uid of ['archive__laughing_beauty','archive__raging_beauty','archive__crying_beauty','archive__screaming_beauty']){
    const f=get(uid);assert.equal(f.combat.weapon,'fists');assert.equal(f.visual.holster,false);
    for(const m of Object.values(f.combat.moves))assert.ok(!['projectile','trap'].includes(m.kind));
  }
  return{reviewedUIDs:[...scoped],unrelatedProfilesPreserved:341,rawRosterSHA256:sha(fs.readFileSync(rosterFile))};
});
function projectileFixture(uid,height,crouch=false,old=false){
  const E=current.E,attacker=get('core__snake'),defender=get(uid);attacker.power=1;
  attacker.combat.moves.special={id:'fixture',slot:'special',name:'Independent geometry fixture',kind:'projectile',tag:'ballistic',level:'mid',damage:333,startup:1,active:1,recovery:1,speed:32,life:25,height,cost:0,meter:0};
  if(old)delete defender.combat.cqcPass8Hurtbox;
  const s=E.create(attacker,defender,{training:true});s.a.x=450;s.b.x=650;
  E.start(s,s.a,'special');for(let i=0;i<10;i++){const inputs=idle(E);inputs[1].down=crouch;E.step(s,inputs);}return s;
}
function airborneMeleeFixture(uid){
  const E=current.E,attacker=get('core__snake');attacker.power=1;
  attacker.combat.moves.heavy={id:'fixture',slot:'heavy',name:'Independent airborne geometry fixture',kind:'melee',tag:'strike',level:'mid',damage:444,startup:1,active:3,recovery:1,reach:220,cost:0,meter:0};
  const s=E.create(attacker,get(uid),{training:true});s.a.x=450;s.b.x=650;s.a.y=E.FLOOR-155;s.a.onGround=false;
  E.start(s,s.a,'heavy');for(let i=0;i<5;i++)E.step(s,idle(E));return s;
}
for(const uid of ['roster50__sunny_mgs4','roster50__sunny_mgr'])check(uid+' actual swept-projectile and airborne-melee child collision',()=>{
  const E=current.E,s=E.create(get(uid),get('core__snake'),{training:true}),b=E.box(s.a),expected=scopedCatalog.entries[uid]?.displayHeight||(uid.endsWith('mgs4')?150:175);
  assert.equal(b.h,expected);assert.equal(b.w,uid.endsWith('mgs4')?52:62);
  s.a.crouch=true;assert.equal(E.box(s.a).h,expected*.53);
  assert.equal(projectileFixture(uid,200).b.life,10000);assert.equal(projectileFixture('core__snake',200).b.life,9667);
  assert.equal(projectileFixture(uid,110).b.life,9667);assert.equal(projectileFixture(uid,110,true).b.life,10000);
  assert.equal(airborneMeleeFixture(uid).b.life,10000);assert.equal(airborneMeleeFixture('core__snake').b.life,9556);
  return{height:expected,width:b.w,crouchedHeight:expected*.53,highProjectileMissesChild:true,sameProjectileHitsAdult:true,lowProjectileHitsStandingChild:true,crouchAvoidsAboveHeadProjectile:true,airborneHighMeleeMissesChild:true};
});
check('52 scoped finishers retain inputs and duration with explicit adaptation provenance',()=>{
  const fin=copy(rawFinishers),ids=['id','slot','commandP1','commandP2','duration'];assert.equal(current.F.applyFinishers(fin,fighters).length,13);
  let changed=0,unrelated=0;
  for(const [uid,p]of Object.entries(fin.profiles)){
    if(!scoped.has(uid)){assert.deepEqual(p,rawFinishers.profiles[uid]);unrelated++;continue;}
    const original=rawFinishers.profiles[uid];
    p.finishers.forEach((f,i)=>{
      changed++;for(const k of ids)assert.deepEqual(f[k],original.finishers[i][k]);assert.equal(f.canonical,false);assert.equal(f.evidence,support.includes(uid)?'simulation':'adaptation');
      assert.equal(f.sourceMoves.length,1);assert.equal(f.loreBasis,get(uid).combat.scope);
      for(const [phaseIndex,phase]of f.phases.entries()){
        const pose=current.F.finisherPose(uid,f,phase,{ko:true,hit:true,guard:true},(phaseIndex+.5)/f.phases.length);
        assert.equal(pose.ko,false);assert.equal(pose.hit,false);assert.equal(pose.guard,false);assert.ok(pose.animationActive);assert.ok(get(uid).combat.moves[pose.moveSlot]);
        if(support.includes(uid))assert.equal(pose.attack,false);
      }
      const base={untouched:true};assert.deepEqual(current.F.finisherPose(uid,{...f,id:'wrong-uid::finisher'},f.phases[0],base,0),base);
    });
  }
  assert.equal(changed,52);assert.equal(unrelated,341);
  const counts=Object.values(fin.profiles).reduce((o,p)=>(o[p.family]=(o[p.family]||0)+1,o),{});assert.deepEqual(copy(fin.familyCounts),counts);
  assert.equal(sha(fs.readFileSync(R+'/data/finishers-v053.json')),sha(fs.readFileSync(finishersFile)));
  return{scopedFinishers:changed,unrelatedProfilesPreserved:unrelated,idsInputsDurationsRetained:true,allCanonicalFalse:true,rawFinishersSHA256:sha(fs.readFileSync(finishersFile))};
});
const html=read(R+'/modules/unified-versus-v055.html'),shadowHtml=read(S+'/public/cqc/modules/unified-versus-v055.html');
const historical=h=>[...h.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]).find(s=>s.includes('root.CQCCombat046=api;'));
check('Historical engine and embedded raw catalogs preserved in both applications',()=>{
  const r=historical(html),s=historical(shadowHtml),expected='197acd7da230bf479a68d37ff409801c0d4390d001a98b4c1451075be55d2d51';
  assert.equal(sha(r),expected);assert.equal(sha(s),expected);assert.equal(r,s);
  const fightersLiteral=h=>h.match(/const FIGHTERS=(\[[^\n]*?\]);/)[1];
  const finLiteral=h=>h.match(/globalThis\.CQC_FINISHERS_053\s*=\s*({[^\n]*?});\s*<\/script>/)[1];
  assert.equal(fightersLiteral(html),fightersLiteral(shadowHtml));assert.equal(finLiteral(html),finLiteral(shadowHtml));
  const oldBody=r.trim().replace('root.CQCCombat046=api;root.CQCCombat045=api;','root.CQCCombat048Pass8=api;');
  const removeComment=engine.slice(engine.indexOf('\n')+1).trim();
  assert.equal(removeComment.replace("function box(p){const reviewed=root.CQC_PASS8_COMBAT_FIDELITY?.hurtbox(p);if(reviewed)return reviewed;\n ","function box(p){"),oldBody);
  assert.ok(html.includes('const Combat=window.CQCCombat048Pass8||window.CQCCombat046||window.CQCCombat045;window.CQC_PASS7_COMBAT_FIDELITY?.attachEngine(Combat)'));
  assert.ok(html.includes('window.CQC_PASS8_COMBAT_FIDELITY?.hasSourceFinisher(winner.f.uid)'));
  assert.ok(html.includes('window.CQC_PASS8_COMBAT_FIDELITY?.cloakAlpha(p.f.uid)??'));
  return{historicalInlineEngineSHA256:expected,fullEmbeddedProfilesEqualAcrossApps:true,fullEmbeddedFinishersEqualAcrossApps:true,separateEngineOnlySunnyBoxHookAndExport:true};
});
// Test origin validation against physically reviewed, unchanged native Raven sheets.
// These local entries exercise the guards without claiming pending application import is finished.
const rav='/workspace/cqc-pass8-generation/raging-raven/armor';
const delivery=json(rav+'/FINAL_DELIVERY.json'),sourceMarks=json(rav+'/SOURCE_COMBAT_ORIGINS.json');
const entry={uid:delivery.uid,facing:1,mirror:false,displayHeight:delivery.displayHeight,phaseMap:delivery.phaseMap,sourceFrameHeights:{},actions:{},oppositeActions:{}};
for(const file of delivery.sourceFiles){
  const layout=json(file.layout);for(const c of layout.cells)assert.equal(c.frame.sha256,file.sha256);
  assert.equal(sha(fs.readFileSync(file.source)),file.sha256);
  for(const [action,d]of Object.entries(delivery.actionLayout))if(d.sheet+'-'+(file.facing===1?'right':'left')===file.key){
    const frames=d.indices.map(index=>layout.cells.find(c=>c.index===index).frame);
    (file.facing===1?entry.actions:entry.oppositeActions)[action]={frames};
    for(const frame of frames)entry.sourceFrameHeights[frame.file]=file.uprightSourceHeight;
  }
}
let originGuardCases=0;
for(const action of ['shoot','deploy','charge'])check('Raven '+action+' measured first-active muzzle and rejection guards',()=>{
  const marks={};
  for(const [side,face]of [['right',1],['left',-1]]){
    const mark=sourceMarks.marks[side][action],frame=(face===1?entry.actions:entry.oppositeActions)[action].frames[mark.frame];
    marks[side]={...mark,rect:frame.rect,pivot:frame.pivot,sourceFrameHeight:entry.sourceFrameHeights[frame.file],engineBodyScale:1.12,physicallyViewed:true,sourcePixelAlpha:mark.pointRGBA[3],pointKind:'native-visible-firearm-muzzle'};
  }
  const valid=current.F.origins(entry,marks,action);assert.ok(valid);
  for(const [side,face]of [['right',1],['left',-1]]){
    const m=marks[side],scale=entry.displayHeight/m.sourceFrameHeight*1.12,[x,y,w,h]=m.rect,px=x+w*m.pivot[0],py=y+h*m.pivot[1];
    assert.equal(valid[face].forward,(m.point[0]-px)*face*scale);assert.equal(valid[face].height,(py-m.point[1])*scale);
  }
  const mutations={
    wrongSHA:m=>m.sha256='0'.repeat(64),wrongFile:m=>m.file='invented.png',nonActiveFrame:m=>m.frame=0,
    wrongAction:m=>m.action='low',wrongRect:m=>m.rect=[0,0,1,1],wrongPivot:m=>m.pivot=[.5,.5],
    unviewed:m=>m.physicallyViewed=false,transparentPixel:m=>m.sourcePixelAlpha=0,wrongSourceHeight:m=>m.sourceFrameHeight++,
    wrongScale:m=>m.engineBodyScale=1,handInsteadOfMuzzle:m=>m.pointKind='native-visible-unarmed-contact',
    outsideSourceRect:m=>m.point=[0,0],nonFinite:m=>m.point=[NaN,m.point[1]],outOfRangeForward:m=>m.point=[50000,m.point[1]]};
  for(const side of ['right','left'])for(const [name,mutate]of Object.entries(mutations)){
    const bad=copy(marks);mutate(bad[side]);assert.equal(current.F.origins(entry,bad,action),null,name+' '+side);originGuardCases++;
  }
  const mirrored=copy(entry);mirrored.mirror=true;assert.equal(current.F.origins(mirrored,marks,action),null);originGuardCases++;
  return{sourceGroup:action,validOrigins:copy(valid),rejectedMutations:29,sourceSHA256:{right:marks.right.sha256,left:marks.left.sha256},pendingRuntimeImportNotCertified:true};
});
check('Raven action-map integration recommendation is supported by actual source groups',()=>{
  assert.deepEqual(delivery.actionLayout.deploy.indices,[5,6,7]);assert.deepEqual(delivery.actionLayout.low.indices,[6,7,8]);
  const armored=get('core__raging_raven');assert.equal(armored.combat.moves.specialDown.kind,'projectile');assert.equal(armored.combat.moves.specialForward.kind,'mobility');
  return{originalDeliverySpecialDown:delivery.actionMap.specialDown,sourceLowGroup:'B leg sweep/kick',correctLauncherGroup:'C deploy 5/6/7',requiredRuntimeActionMap:{specialDown:'deploy',specialForward:'jump',specialBack:'walk'},rootInformed:true,originalDeliveryPreserved:true};
});
// Record exact reviewed helper hashes, not changing art/catalog totals.
const result={schema:'cqc.pass8.independent-source-gameplay-review/1',status:records.every(r=>r.status==='passed')?'passed':'failed',
  sourceFiles,records,checks:records.length,passed:records.filter(r=>r.status==='passed').length,originGuardRejections:originGuardCases,
  fixedFindings:['Visible-trace observations had no sampler because passive.observeMovement was absent.','Inherited super travel displaced reserve recovery by 21 pixels.'],
  remainingIntegration:['Raven runtime action-map override must bind kneeling launcher to specialDown and jet pose to specialForward.','Thirteen imported source origins and final catalogs still require root integration checks.'],
  limitations:['No final native-art catalog count, deployment or publication asserted.','Source equipment categories are original-evidenced; attacks, command timing, damage, resources and finisher choreography are versus adaptations.','closest_supported target 1:1, absolute1to1Certified false.'],
  sourceAfterRun:{helperSHA256:sha(fs.readFileSync(R+'/src/cqc-pass8-combat-fidelity.js')),engineSHA256:sha(fs.readFileSync(R+'/src/cqc-pass8-combat-engine.js'))},
  writableScope:OUT,appMutatedByReviewer:false,nativePNGsMutatedByReviewer:false};
fs.writeFileSync(path.join(run,'INDEPENDENT_GAMEPLAY_REVIEW.json'),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({status:result.status,checks:result.checks,passed:result.passed,failures:records.filter(r=>r.status==='failed'),report:path.join(run,'INDEPENDENT_GAMEPLAY_REVIEW.json')}));
process.exitCode=result.status==='passed'?0:1;
