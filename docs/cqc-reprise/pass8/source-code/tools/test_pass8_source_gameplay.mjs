import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const parse=p=>JSON.parse(read(p));
const copy=x=>JSON.parse(JSON.stringify(x));
const html=read('modules/unified-versus-v055.html');
const historical=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]).find(s=>s.includes('root.CQCCombat046=api;'));
assert.equal(crypto.createHash('sha256').update(historical).digest('hex'),'197acd7da230bf479a68d37ff409801c0d4390d001a98b4c1451075be55d2d51');
const profileSource=parse('data/unified-roster-v053.json').fighters;
const catalog=parse('data/combat-sprite-catalog-v1.json');
const context=vm.createContext({});
vm.runInContext(read('src/cqc-pass8-combat-fidelity.js'),context);
const fidelity=context.CQC_PASS8_COMBAT_FIDELITY,fighters=copy(profileSource);
assert.equal(fidelity.apply(fighters,catalog,{}).length,13);
const scoped=new Set(fidelity.reviewedUIDs);
for(let i=0;i<fighters.length;i++)if(!scoped.has(fighters[i].uid))assert.deepEqual(fighters[i],profileSource[i]);
assert.deepEqual(parse('data/unified-roster-v053.json').fighters,profileSource);
const fighter=uid=>fighters.find(f=>f.uid===uid);
const support=['roster50__sunny_mgs4','roster50__sunny_mgr','archive__paz','npc53__paz_gz'];
for(const uid of support){
  const f=fighter(uid);assert.equal(f.combat.weapon,'none');assert.equal(f.combat.evidence,'simulation');
  assert.equal(f.visual.holster,false);assert.equal(f.visual.aura,null);
  for(const [slot,m]of Object.entries(f.combat.moves)){
    assert.ok(!['projectile','trap','heal'].includes(m.kind),uid+' has invented equipment effect in '+slot);
    assert.ok(!['electric','psychic','doll','ballistic','explosive','rail'].includes(m.tag));
    assert.equal(m.status,undefined);assert.equal(m.projectileOrigin,undefined);
  }
  for(const slot of ['special','specialDown','specialForward','specialBack','super','utility'])assert.equal(f.combat.moves[slot].damage,0);
}
for(const uid of ['archive__laughing_beauty','archive__raging_beauty','archive__crying_beauty','archive__screaming_beauty']){
  const f=fighter(uid);assert.equal(f.combat.weapon,'fists');assert.equal(f.visual.back,null);
  assert.equal(f.visual.pouches,0);assert.equal(f.visual.holster,false);assert.equal(f.visual.aura,null);
  for(const m of Object.values(f.combat.moves))assert.ok(!['projectile','trap'].includes(m.kind));
  assert.equal(f.combat.moves.special.level,'throw');
}
assert.equal(fighter('core__crying_wolf').visual.kind,'quadruped');
assert.equal(fighter('core__crying_wolf').combat.moves.special.tag,'rail');
assert.equal(fighter('core__crying_wolf').combat.moves.special.kind,'projectile');
assert.equal(fighter('core__raging_raven').combat.moves.special.tag,'explosive');
assert.equal(fighter('core__laughing_octopus').combat.moves.specialDown.kind,'mobility');
assert.equal(fidelity.cloakAlpha('core__laughing_octopus'),1);
for(const m of Object.values(fighter('core__screaming_mantis').combat.moves))assert.ok(!['projectile','trap'].includes(m.kind));
const eva=fighter('core__eva_mgs3');
assert.equal(eva.visual.rightHolster,'anatomical-right-thigh');
assert.equal(eva.combat.moves.specialDown.lowProfile,true);
assert.equal(eva.combat.moves.specialDown.fuse,undefined);
assert.equal(eva.combat.moves.super.cost,6);assert.equal(eva.combat.moves.super.count,6);
assert.equal(fighter('npc53__paz_gz').visual.body,'adult');

vm.runInContext(historical,context);
vm.runInContext(read('src/cqc-pass8-combat-engine.js'),context);
const original=context.CQCCombat046,current=context.CQCCombat048Pass8;
assert.notEqual(original,current);
const pairs=[['core__snake','core__raiden_mgs2'],['core__old_snake','core__quiet'],['core__raven','core__solid'],
  ['core__laughing_octopus','archive__laughing_beauty'],['core__raging_raven','archive__raging_beauty'],
  ['core__crying_wolf','archive__crying_beauty'],['core__screaming_mantis','archive__screaming_beauty'],
  ['core__eva_mgs3','archive__paz'],['npc53__paz_gz','core__meryl_mgs1']];
const records=[];
for(const [a,b]of pairs)for(const seed of [7,991,987654321]){
  const options={training:true,seed,rounds:1},before=original.create(copy(fighter(a)),copy(fighter(b)),options),after=current.create(copy(fighter(a)),copy(fighter(b)),options);
  for(let frame=0;frame<240;frame++){
    const inputs=[original.empty(),original.empty()];
    inputs[0].right=frame%100<25;inputs[1].left=frame%100<25;
    inputs[1].guard=frame%80>=40;inputs[1].down=frame%110>=80;
    if(frame%45===0)inputs[0].slot=['light','special','specialDown','heavy','utility','super'][Math.floor(frame/45)%6];
    original.step(before,copy(inputs));current.step(after,copy(inputs));
    assert.equal(JSON.stringify(after),JSON.stringify(before),'Unrelated collision/engine behavior changed: '+a+' / '+b+' seed '+seed+' frame '+frame);
  }
  records.push({a,b,seed,frames:240,statesExactlyEqual:true});
}
for(const uid of ['roster50__sunny_mgs4','roster50__sunny_mgr']){
  const s=current.create(copy(fighter(uid)),copy(fighter('core__snake')),{training:true});
  const normal=current.box(s.a);assert.equal(normal.h,s.a.f.combat.cqcPass8Hurtbox.height);assert.ok(normal.h<230);assert.ok(normal.w<78);
  s.a.crouch=true;assert.equal(current.box(s.a).h,normal.h*.53);s.a.crouch=false;
  s.a.meter=100;s.a.r=0;assert.equal(current.start(s,s.a,'super'),true);
  const move=s.a.f.combat.moves.super;
  for(let frame=0;frame<=move.startup;frame++)current.step(s,[current.empty(),current.empty()]);
  assert.equal(s.projectiles.length,0);assert.equal(s.traps.length,0);assert.equal(s.b.life,s.b.max);assert.ok(s.a.r>0);
}
const report={schema:'cqc.pass8.source-gameplay-regression/1',status:'passed',scope:'Thirteen incarnation corrections; actual engine behavior and historical non-Sunny parity',
  rawProfilesUnchanged:true,historicalInlineEngineUnchanged:true,correctedUIDs:[...scoped],unrelatedFightersUnchanged:341,
  nonSunnyParityMatches:records.length,nonSunnyParityFrames:records.length*240,records,
  sunnyActualEngineHurtboxesVerified:true,sunnySupportSuperNoOpponentDamage:true,sourceFidelity:'closest_supported',absolute1to1Certified:false};
const target=process.argv[2];if(target){assert.ok(!fs.existsSync(target),'Use a fresh evidence path');fs.writeFileSync(target,JSON.stringify(report,null,2)+'\n');}
console.log(JSON.stringify({...report,records:undefined}));
