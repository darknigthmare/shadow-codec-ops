#!/usr/bin/env node
/** Execute every VEILBREAK command in the actual CQC engine; no renderer or mock combat. */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';

const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const contentPath=path.join(ROOT,'public/cqc/data/veilbreak-content.json');
const enginePath=path.join(ROOT,'public/cqc/src/cqc-pass8-combat-engine.js');
const data=JSON.parse(fs.readFileSync(contentPath,'utf8'));
const engineSource=fs.readFileSync(enginePath,'utf8');
const context=vm.createContext({console});
vm.runInContext(engineSource,context,{filename:enginePath});
const Engine=context.CQCCombat048Pass8;
assert(Engine?.create&&Engine?.start&&Engine?.step,'Actual CQC engine failed to initialize');
const clone=x=>JSON.parse(JSON.stringify(x));
const hash=x=>crypto.createHash('sha256').update(typeof x==='string'?x:JSON.stringify(x)).digest('hex');
const profiles=[...data.fighters,...data.enemies,...data.bosses];
const slots=['light','heavy','low','throw','special','specialDown','specialForward','specialBack','utility','super'];
const empty=()=>Engine.empty();
const baseline=data.fighters.find(f=>f.id==='vb_latch');
const checks=[];
const failures=[];
let simulatedFrames=0;
let finiteStateChecks=0;

function finiteState(state,label){
  finiteStateChecks++;
  for(const actor of [state.a,state.b]){
    for(const key of ['x','y','vx','vy','life','max','gray','meter','guard','r','hit','blockstun','cool','drowsy'])
      assert(Number.isFinite(actor[key]),`${label}: ${actor.f.id}.${key} is not finite`);
    assert(actor.life>=0&&actor.life<=10000,`${label}: life outside engine bounds`);
    assert(actor.r>=-1e-8&&actor.r<=actor.f.combat.resource.max+1e-8,`${label}: resource outside bounds`);
    assert(actor.meter>=0&&actor.meter<=100,`${label}: meter outside bounds`);
  }
  for(const q of state.projectiles)for(const key of ['x','y','vx','vy','life','age'])
    assert(Number.isFinite(q[key]),`${label}: projectile ${key} is not finite`);
  for(const t of state.traps)for(const key of ['x','y','life','age','hp'])
    assert(Number.isFinite(t[key]),`${label}: trap ${key} is not finite`);
}
function tick(state,a=empty(),b=empty(),label='simulation'){
  Engine.step(state,[a,b]);simulatedFrames++;finiteState(state,label);
}
function stepMany(state,n,label){for(let i=0;i<n;i++)tick(state,empty(),empty(),label);}
function metric(state,key){return state.metrics[key]||0;}

assert.equal(data.fighters.length,10);
assert.equal(data.stages.length,20);
assert.equal(data.enemies.length,20);
assert.equal(data.bosses.length,20);
assert.equal(data.campaign.encounters.length,40);
assert.equal(new Set(profiles.map(f=>f.id)).size,50);
const known=new Set([...profiles,...data.stages,...data.props,...data.projectiles,...data.vfx].map(x=>x.id));

for(const profile of profiles){
  assert.deepEqual(Object.keys(profile.combat.moves).sort(),[...slots].sort(),profile.id+' slots');
  assert.equal(profile.uid,'oc__'+profile.id);
  assert.equal(profile.source,'ORIGINAL');
  assert.equal(profile.canonical,false);
  for(const slot of slots){
    const label=profile.id+'::'+slot;
    try{
      const p=clone(profile),opponent=clone(baseline);
      opponent.uid='test__target';opponent.id='test_target';
      const state=Engine.create(p,opponent,{training:true,skipIntro:true,seed:149271,freeMeter:false,freeResource:false});
      const actor=state.a,target=state.b,move=p.combat.moves[slot];
      actor.x=360;target.x=move.kind==='mobility'?850:move.kind==='projectile'?640:move.kind==='observe'?590:430;
      actor.face=1;target.face=-1;
      actor.meter=100;
      actor.r=['heat','cost'].includes(p.combat.resource.kind)?0:p.combat.resource.max;
      if(move.asset_id)assert(known.has(move.asset_id),label+' unresolved independent asset');
      if(move.kind==='heal'){actor.life=9000;actor.gray=700;actor.regenUsed=0;}
      if(move.kind==='reload')actor.r=0;
      if(move.kind==='recover')actor.r=['heat','cost'].includes(p.combat.resource.kind)?80:10;
      if(move.kind==='trap')target.x=actor.x+Math.min(move.reach||70,150);
      if(move.kind==='recallTrap'){
        target.x=850;
        assert(Engine.start(state,actor,'special'),label+' could not set up real personal trap');
        stepMany(state,p.combat.moves.special.startup+p.combat.moves.special.active+p.combat.moves.special.recovery+2,label+' setup');
        assert.equal(state.traps.filter(t=>t.owner===actor.slot).length,1,label+' setup did not create one real trap');
        actor.r=p.combat.resource.max;
      }
      // Observe must sample a visible committed state, not invented future inputs.
      if(move.kind==='observe')tick(state,empty(),empty(),label+' visible trace');
      const before={resource:actor.r,meter:actor.meter,life:actor.life,x:actor.x,starts:actor.stats.starts,activations:actor.stats.activations,damage:actor.stats.damage,healed:actor.stats.healed,parries:actor.stats.parries};
      assert(Engine.start(state,actor,slot),label+' start was denied with valid context/resources');
      const sign=['heat','cost'].includes(p.combat.resource.kind)?1:-1;
      assert(Math.abs(actor.r-(before.resource+sign*move.cost))<1e-8,label+' resource cost was not paid exactly once');
      assert.equal(actor.meter,before.meter-move.meter,label+' meter cost');
      const until=Math.max(move.startup+move.active+move.recovery+10,move.startup+(move.arm||0)+12,move.startup+(move.fuse||0)+(move.interval||0)*(move.count||1)+12,move.startup+(move.life||0)+15);
      let effect=false,armedOpponent=false;
      const strikeTick=Math.max(0,move.startup+Math.floor(move.active/2)-opponent.combat.moves.light.startup);
      for(let i=0;i<until;i++){
        let targetInput=empty();
        if(move.kind==='parry'&&!armedOpponent&&i>=strikeTick){targetInput.slot='light';armedOpponent=true;}
        // Hold a real target at the emitted grenade's detonation point. This verifies
        // explosion collision at its physical position, not its AI target prediction.
        if(move.kind==='projectile'&&move.fuse){
          const q=state.projectiles.find(q=>!q.dead&&q.owner===actor.slot&&q.delay<=0);
          if(q&&q.age>=move.fuse-2)target.x=Math.max(80,Math.min(1200,q.x+q.vx));
        }
        tick(state,empty(),targetInput,label);
        if(move.kind==='buff')effect ||= Boolean(actor.buffs[move.buff])||metric(state,'buff:'+move.buff)>0;
        else if(move.kind==='heal')effect ||= actor.stats.healed>before.healed;
        else if(move.kind==='recover')effect ||= ['heat','cost'].includes(p.combat.resource.kind)?actor.r<before.resource:actor.r>before.resource;
        else if(move.kind==='reload')effect ||= actor.r===p.combat.resource.max;
        else if(move.kind==='observe')effect ||= metric(state,'observe')>0;
        else if(move.kind==='recallTrap')effect ||= state.traps.filter(t=>t.owner===actor.slot&&!t.dead).length===0&&metric(state,'trapRecall')>0;
        else if(move.kind==='mobility')effect ||= Math.abs(actor.x-before.x)>1;
        else if(move.kind==='parry')effect ||= actor.stats.parries>before.parries;
        else effect ||= actor.stats.damage>before.damage;
      }
      assert.equal(actor.stats.starts-before.starts,1,label+' started more than once');
      assert.equal(actor.stats.activations-before.activations,1,label+' never activated exactly once');
      assert(effect,label+' activated but did not produce its contextual engine effect');
      assert.equal(actor.attack,null,label+' did not finish or cancel its attack');
      checks.push({id:label,kind:move.kind,status:'passed',frames:until,resourcePaid:move.cost,meterPaid:move.meter,effect:'observed_in_actual_engine'});
    }catch(error){failures.push({id:label,message:error.message});}
  }
}

function cpuFight(index){
  const a=clone(profiles[index]),b=clone(profiles[(index+17)%profiles.length]);
  const state=Engine.create(a,b,{training:true,skipIntro:true,seed:99173+index,freeMeter:false,freeResource:false});
  state.a.meter=100;state.b.meter=100;
  const milestones=[];
  for(let frame=0;frame<720;frame++){
    const ia=Engine.cpu(state,state.a,state.b),ib=Engine.cpu(state,state.b,state.a);
    tick(state,ia,ib,'CPU deterministic '+a.id+'/'+b.id);
    if(frame%60===59)milestones.push({frame:state.frame,seed:state.seed,a:[state.a.x,state.a.y,state.a.life,state.a.r,state.a.meter,state.a.stats],b:[state.b.x,state.b.y,state.b.life,state.b.r,state.b.meter,state.b.stats],metrics:clone(state.metrics),projectiles:state.projectiles.map(q=>[q.owner,q.x,q.y,q.vx,q.vy,q.age,q.life]),traps:state.traps.map(t=>[t.owner,t.x,t.age,t.hp])});
  }
  return hash(milestones);
}
const replayChecks=[];
for(let i=0;i<profiles.length;i++){
  try{const a=cpuFight(i),b=cpuFight(i);assert.equal(a,b,'same seed/input policy diverged');replayChecks.push({id:profiles[i].id,status:'passed',sha256:a,framesPerRun:720});}
  catch(error){failures.push({id:profiles[i].id+'::determinism',message:error.message});}
}

const report={
  schemaVersion:1,status:failures.length?'failed':'passed',
  scope:'500 contextual commands in actual CQCCombat048Pass8 engine plus 50 repeated deterministic CPU match simulations',
  engineSource:'public/cqc/src/cqc-pass8-combat-engine.js',engineSourceSha256:hash(engineSource),
  combatDataSha256:hash(profiles.map(({id,uid,power,speed,reach,visual,combat})=>({id,uid,power,speed,reach,visual,combat}))),
  counts:{profiles:profiles.length,commandsExpected:500,commandsPassed:checks.length,deterministicPairsExpected:50,deterministicPairsPassed:replayChecks.length,simulatedFrames,finiteStateChecks,failures:failures.length},
  commands:checks,deterministicPairs:replayChecks,failures,
  limitations:['Not a rendered-browser test','Does not certify visual lore fidelity or finished animation','Does not certify balance','Campaign save flow, tag adapter and boss phase switching require their own integration tests','CPU simulation here intentionally exercises core engine without stationary/jump constraints from the client adapter']
};
const reportAt=process.argv.indexOf('--report');
if(reportAt>=0){
  assert(process.argv[reportAt+1],'--report requires a path');
  const dest=path.resolve(ROOT,process.argv[reportAt+1]);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,JSON.stringify(report,null,2)+'\n');
}
console.log(JSON.stringify({status:report.status,...report.counts,failures},null,2));
if(failures.length)process.exitCode=1;
