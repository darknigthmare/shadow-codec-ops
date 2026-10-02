const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const R=path.resolve(__dirname,'..'),raw=JSON.parse(fs.readFileSync(path.join(R,'data/unified-roster-v053.json'))).fighters;
const previous=require('../src/cqc-pass4-combat-fidelity.js'),pass6=require('../src/cqc-pass6-combat-fidelity.js');
const catalog=JSON.parse(fs.readFileSync(path.join(R,'data/combat-sprite-catalog-v1.json'))),anchors=JSON.parse(fs.readFileSync(path.join(R,'preparation/combat-sprites-pass6/SOURCE_COMBAT_ORIGINS.json'))).entries;
const fighters=structuredClone(raw);pass6.apply(fighters,catalog,anchors);
const fighter=(uid,list=fighters)=>list.find(f=>f.uid===uid);
const html=fs.readFileSync(path.join(R,'modules/unified-versus-v055.html'),'utf8'),engine=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]).find(s=>s.includes('function makeActor(')&&s.includes('root.CQCCombat046=api'));
const box={};vm.createContext(box);vm.runInContext(engine,box);const E=box.CQCCombat046;
const fresh=(uid,face=1,enemy='core__snake')=>{const s=E.create(fighter(uid),fighter(enemy),{skipIntro:true});s.a.x=face===1?300:980;s.b.x=face===1?1120:160;s.a.face=face;s.b.face=-face;s.a.meter=100;return s;};
const tick=(s,n,input)=>{for(let i=0;i<n&&!s.finished;i++)E.step(s,[E.empty(),input||E.empty()]);};
test('six exact reviewed identities change while all other 348 historical profiles remain intact',()=>{
 assert.equal(raw.length,354);assert.deepEqual(fighters.map(f=>f.uid),raw.map(f=>f.uid));
 for(let i=0;i<raw.length;i++)if(!pass6.reviewedUIDs.includes(raw[i].uid))assert.deepEqual(fighters[i],raw[i]);
 for(const uid of ['roster51__pain_delta','roster51__fear_delta','roster51__end_delta','roster51__fury_delta']){assert(fighter(uid));assert.deepEqual(fighter(uid),fighter(uid,raw));}
 assert.deepEqual(fighter('core__fatman'),fighter('core__fatman',raw));
});
test('four Cobra corrections retain original move preparation, recovery, damage and finite limits',()=>{
 for(const uid of Object.keys(pass6.slots)){
  const a=fighter(uid,raw).combat,b=fighter(uid).combat;assert.deepEqual(b.resource,a.resource);
  for(const slot of Object.keys(a.moves))for(const key of ['kind','startup','active','recovery','damage','reach','level','meter','cooldown','speed','life','vy','gravity','count','interval','fuse','radius','travel','duration','arm','maxTraps','hp','launchSelf','heal'])assert.deepEqual(b.moves[slot][key],a.moves[slot][key],uid+' '+slot+' '+key);
 }
});
test('The End has a conventional tranquilizing Mosin and cannot spend a super with no ammunition',()=>{
 const s=fresh('core__end');s.a.r=0;assert.equal(E.start(s,s.a,'super'),false);assert.equal(s.a.meter,100);
 const m=s.a.f.combat.moves.super;assert.equal(m.tag,'precision');assert.equal(m.status,'drowsy');assert.equal(m.cost,1);assert.equal(m.meter,50);
});
test('a real Mosin super consumes one of five rounds and fifty meter',()=>{
 const s=fresh('core__end');assert.equal(s.a.r,5);assert(E.start(s,s.a,'super'));assert.equal(s.a.r,4);assert.equal(s.a.meter,50);tick(s,55);assert.equal(s.projectiles.length,1);assert.equal(s.projectiles[0].def.tag,'precision');
});
test('Mosin reserve stays empty until reload activation and an interrupted reload restores nothing',()=>{
 const s=fresh('core__end');s.a.r=0;assert(E.start(s,s.a,'utility'));tick(s,53);assert.equal(s.a.r,0);tick(s,1);assert.equal(s.a.r,5);
 const interrupted=fresh('core__end');interrupted.a.r=0;assert(E.start(interrupted,interrupted.a,'utility'));tick(interrupted,30);interrupted.a.attack=null;tick(interrupted,90);assert.equal(interrupted.a.r,0);
});
test('the masked Pain uses a hand-controlled accelerated swarm without a second-phase mouth attack',()=>{
 const c=fighter('core__pain').combat;assert.match(c.moves.specialForward.name,/Essaim rapide/);assert.doesNotMatch(c.moves.specialForward.name,/Bullet Bee/);assert.equal(c.weapon,'swarm');assert.doesNotMatch(c.moves.specialForward.counterplay,/carreau/);
 const a=c.moves.special.projectileOrigin,b=c.moves.specialForward.projectileOrigin;assert.deepEqual(a,b);
});
test('Pain swarms retain four and six distinct delayed projectiles and bounded poison',()=>{
 for(const [slot,count]of [['special',4],['super',6]]){const s=fresh('core__pain');assert(E.start(s,s.a,slot));tick(s,s.a.f.combat.moves[slot].startup);assert.equal(s.projectiles.length,count);assert(s.projectiles.every(q=>q.def.tag==='swarm'));}
 const s=fresh('core__pain');assert(E.start(s,s.a,'specialForward'));assert.equal(s.a.r,77);tick(s,25);assert.equal(s.projectiles[0].def.status,'poison');assert.equal(s.projectiles[0].def.duration,180);
});
test('Pain hornet protection remains two hits and expires within the authored duration',()=>{
 const s=fresh('core__pain');assert(E.start(s,s.a,'specialDown'));assert.equal(s.a.r,76);tick(s,18);assert.equal(s.a.buffs.barrier.hits,2);assert(s.a.buffs.barrier.t<=110);tick(s,110);assert.equal(s.a.buffs.barrier,undefined);
});
test('Fear normal and super use distinct native crossbow action frames and origins',()=>{
 const e=catalog.entries.core__fear;
 assert.notEqual(e.actionMap.special,e.actionMap.super);
 for(const side of ['right','left']){const a=anchors.core__fear.shoot[side],b=anchors.core__fear.charge[side];assert.notEqual(a.action,b.action);assert.notDeepEqual(a.point,b.point);}
 const s=fresh('core__fear');assert(E.start(s,s.a,'special'));tick(s,s.a.f.combat.moves.special.startup);assert.equal(s.projectiles[0].def.tag,'bolt');
});
test('Fear camouflage retains a visible collision body and breaks on an offensive start',()=>{
 const s=fresh('core__fear');const before=JSON.stringify(E.box(s.a));assert(E.start(s,s.a,'specialBack'));tick(s,s.a.f.combat.moves.specialBack.startup);assert(s.a.buffs.cloak);assert.equal(JSON.stringify(E.box(s.a)),before);
 tick(s,50);assert(E.start(s,s.a,'special'));assert.equal(s.a.buffs.cloak,undefined);
});
test('Fury fires from a flamethrower with heat limits and a finite ground-fire zone',()=>{
 const s=fresh('core__fury');assert.equal(s.a.r,0);s.a.r=95;assert.equal(E.start(s,s.a,'special'),false);s.a.r=0;assert(E.start(s,s.a,'special'));assert.equal(s.a.r,27);tick(s,24);assert.equal(s.projectiles.length,3);
 const zone=fresh('core__fury');assert(E.start(zone,zone.a,'specialDown'));tick(zone,33);assert.equal(zone.traps.length,1);assert.equal(zone.traps[0].def.maxTraps,1);assert.equal(zone.traps[0].def.tag,'fire');tick(zone,150);assert.equal(zone.traps.length,0);
});
test('Dirty Duck role no longer claims Slasher Hawk equipment while every move stays identical',()=>{
 const a=fighter('core__dirtyduck',raw).combat,b=fighter('core__dirtyduck').combat;assert.doesNotMatch(b.role,/faucon/i);assert.deepEqual(b.moves,a.moves);assert.deepEqual(b.resource,a.resource);
});
test('Red Blaster has finite grenades and immobilizing wires rather than Fatman pistol and remote charges',()=>{
 const c=fighter('core__redblaster_mg2').combat;assert.doesNotMatch(c.role,/rollers|pistolet/i);assert.equal(c.resource.label,'GRENADES');
 for(const slot of ['special','specialForward','super']){assert.equal(c.moves[slot].kind,'projectile');assert.equal(c.moves[slot].tag,'explosive');assert.equal(c.moves[slot].projectileOverride,'grenade');assert(c.moves[slot].fuse>0);}
 const s=fresh('core__redblaster_mg2');s.a.r=2;assert.equal(E.start(s,s.a,'super'),false);assert.equal(s.a.meter,100);s.a.r=3;assert(E.start(s,s.a,'super'));assert.equal(s.a.r,0);assert.equal(s.a.meter,50);tick(s,35);assert.equal(s.projectiles.length,3);assert(s.projectiles.every(q=>q.kind==='grenade'));assert.equal(s.traps.length,0);
});
test('a Red Blaster wire triggers once without an explosion or damage and slows movement briefly',()=>{
 const s=fresh('core__redblaster_mg2'),life=s.b.life;assert(E.start(s,s.a,'specialDown'));tick(s,30);const t=s.traps[0];assert(t);assert.equal(t.def.tag,'snare');assert.equal(t.def.damage,0);
 s.b.x=t.x;tick(s,50);assert.equal(s.b.life,life);assert.equal(s.traps.length,0);assert(s.b.statuses.slow.t<=140);assert(s.b.statuses.slow.t>0);assert(!s.events.some(e=>e.type==='explosion'));
});
test('Red wire keeps the historical one-point guard chip as an explicit Versus limitation',()=>{
 const s=fresh('core__redblaster_mg2'),life=s.b.life;assert(E.start(s,s.a,'specialDown'));tick(s,30);s.b.x=s.traps[0].x;
 tick(s,50,{...E.empty(),guard:true,down:true});assert.equal(s.b.life,life-1);assert.equal(s.traps.length,0);assert(!s.events.some(e=>e.type==='explosion'));assert(s.events.some(e=>e.type==='block'&&e.damage===1));
});
test('every launch origin is guarded by the actual source crop SHA for both native sides',()=>{
 for(const [uid,groups]of Object.entries(pass6.slots))for(const [kind,slots]of Object.entries(groups)){
  const measured=previous.origins(catalog.entries[uid],anchors[uid]?.[kind]);assert(measured?.[1]&&measured?.[-1],uid+' '+kind);
  for(const slot of slots)assert.deepEqual(fighter(uid).combat.moves[slot].projectileOrigin,measured);
  const bad=structuredClone(anchors[uid][kind]);bad.left.sha256='0'.repeat(64);assert.equal(previous.origins(catalog.entries[uid],bad),null);
 }
});
test('the actual engine first activation follows every native muzzle or command hand',()=>{
 for(const [uid,groups]of Object.entries(pass6.slots))for(const slots of Object.values(groups))for(const slot of slots)for(const face of [1,-1]){
  const s=fresh(uid,face),m=s.a.f.combat.moves[slot];assert(E.start(s,s.a,slot));tick(s,m.startup);const q=s.projectiles.find(q=>q.delay===0);assert(q);
  const origin=m.projectileOrigin[face];assert(Math.abs(q.x-(s.a.x+face*(origin.forward+(m.speed||15))))<.00001);assert(Math.abs(q.y-(s.a.y-origin.height+(m.vy||0)))<.00001);
 }
});
test('finishers correct only the six reviewed profiles while all commands and durations stay intact',()=>{
 const original=JSON.parse(fs.readFileSync(path.join(R,'data/finishers-v053.json'))),patched=structuredClone(original);pass6.applyFinishers(patched,fighters);
 for(const [uid,profile]of Object.entries(original.profiles)){
  if(!pass6.reviewedUIDs.includes(uid))assert.deepEqual(patched.profiles[uid],profile);
  else for(let i=0;i<profile.finishers.length;i++)for(const key of ['id','duration','slot','commandP1','commandP2','tone','canonical'])assert.deepEqual(patched.profiles[uid].finishers[i][key],profile.finishers[i][key]);
 }
 assert.equal(Object.values(patched.familyCounts).reduce((a,b)=>a+b,0),354);assert.equal(patched.finisherCount,1416);
});
test('masked Pain finisher choreography uses native hand poses without mental levitation or oral Bullet Bee',()=>{
 const f=JSON.parse(fs.readFileSync(path.join(R,'data/finishers-v053.json')));pass6.applyFinishers(f,fighters);
 for(const fin of f.profiles.core__pain.finishers){assert.doesNotMatch(fin.name,/Bullet Bee|Hornet Tomb/i);assert(fin.phases.every(p=>!['lift','orbit','psychic'].includes(p)));assert(fin.sourceMoves.every(n=>!/Bullet Bee/.test(n)));for(const phase of fin.phases){const pose=pass6.finisherPose('core__pain',fin,phase,{},.4);assert(pose.animationActive);assert.equal(pose.hit,false);assert(fighter('core__pain').combat.moves[pose.moveSlot]);}}
});
test('Red Blaster finishers show grenade arcs and nonexplosive wires without remote charges',()=>{
 const f=JSON.parse(fs.readFileSync(path.join(R,'data/finishers-v053.json')));pass6.applyFinishers(f,fighters);
 for(const fin of f.profiles.core__redblaster_mg2.finishers){assert.doesNotMatch(fin.name,/charge|déclencher/i);assert(fin.phases.every(p=>!['plant','retreat','trigger'].includes(p)));assert(fin.sourceMoves.every(n=>!/charge|C4|déclencher/i.test(n)));}
 assert.deepEqual(f.profiles.core__redblaster_mg2.finishers.find(f=>f.slot==='down').phases,['bait','lock','confirm','pose']);
});
test('production connects source finishers and bypasses inherited generic mental or blast effects',()=>{
 assert(html.includes('applyFinishers(FIN46,FIGHTERS)'));assert(html.includes('finisherPose(winner.f.uid,sc.fin,phase,aPose,t)'));
 for(const phases of ["['crosscut','shot','volley','arc'","['blast','inferno'","['orbit','psychic'"])assert(html.includes('if(!nativeFinish&&'+phases));
});
