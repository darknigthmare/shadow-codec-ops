const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const R=path.resolve(__dirname,'..'),raw=JSON.parse(fs.readFileSync(path.join(R,'data/unified-roster-v053.json'))).fighters;
const pass7=require('../src/cqc-pass7-combat-fidelity.js'),previous=require('../src/cqc-pass4-combat-fidelity.js');
global.CQC_PASS4_COMBAT_FIDELITY=previous;
const initialRaw=structuredClone(raw),fighters=structuredClone(raw);pass7.apply(fighters);
const fighter=(uid,list=fighters)=>list.find(f=>f.uid===uid);
const html=fs.readFileSync(path.join(R,'modules/unified-versus-v055.html'),'utf8'),engine=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]).find(s=>s.includes('function makeActor(')&&s.includes('root.CQCCombat046=api'));
function freshEngine(attached=true){const box={};vm.createContext(box);vm.runInContext(engine,box);return attached?pass7.attachEngine(box.CQCCombat046):box.CQCCombat046;}
const E=freshEngine();
const fresh=(uid,face=1,enemy='core__snake')=>{const s=E.create(fighter(uid),fighter(enemy),{skipIntro:true});s.a.x=face===1?300:980;s.b.x=face===1?1100:180;s.a.face=face;s.b.face=-face;s.a.meter=100;return s;};
const tick=(s,n,inputA,inputB)=>{for(let i=0;i<n&&!s.finished;i++)E.step(s,[inputA||E.empty(),inputB||E.empty()]);};
function chaffAtFuse(enemy='core__snake',face=1,inputB){
 const s=fresh('core__old_snake',face,enemy);assert(E.start(s,s.a,'specialDown'));tick(s,24+60,null,inputB);
 const q=pass7.chaffProjectiles(s)[0];assert(q&&q.age===61);s.b.x=q.x+q.vx;s.b.y=568;s.b.face=-face;
 tick(s,1,null,inputB);assert.equal(s.pass7Chaff.fields.length,1);return s;
}
test('four exact incarnations change while all 350 other profiles and the input data remain intact',()=>{
 assert.equal(raw.length,354);assert.deepEqual(fighters.map(f=>f.uid),raw.map(f=>f.uid));
 for(let i=0;i<raw.length;i++)if(!pass7.reviewedUIDs.includes(raw[i].uid))assert.deepEqual(fighters[i],raw[i]);
 for(const uid of ['roster51__raven_tts','archive__old_snake_touch','npc53__old_snake_mpo_plus','npc53__skull_face_gz'])assert.deepEqual(fighter(uid),fighter(uid,raw));
 assert.deepEqual(raw,initialRaw);
});
test('the historical inline physics engine retains its pinned bytes',()=>{
 assert.equal(crypto.createHash('sha256').update(engine).digest('hex'),'197acd7da230bf479a68d37ff409801c0d4390d001a98b4c1451075be55d2d51');
});
test('Quiet cannot fire a super at empty reserve and spends a real conventional round',()=>{
 const s=fresh('core__quiet');s.a.r=0;assert.equal(E.start(s,s.a,'super'),false);assert.equal(s.a.meter,100);s.a.r=1;assert(E.start(s,s.a,'super'));assert.equal(s.a.r,0);assert.equal(s.a.meter,50);
 tick(s,s.a.f.combat.moves.super.startup);assert.equal(s.projectiles.length,1);assert.equal(s.projectiles[0].def.tag,'precision');assert.notEqual(s.projectiles[0].kind,'rail');
});
test('Quiet conventional precision shots make real contact from both facing directions',()=>{
 for(const face of [1,-1]){
  const s=fresh('core__quiet',face);s.b.x=s.a.x+face*320;const life=s.b.life;assert(E.start(s,s.a,'super'));tick(s,90);
  assert(s.b.life<life);assert(s.events.some(e=>e.type==='damage'&&e.tag==='precision'));assert(!s.events.some(e=>e.type==='damage'&&e.tag==='rail'));
 }
});
test('Quiet low native rifle action uses the same conventional ammunition without an unproven tranquilizer',()=>{
 const s=fresh('core__quiet');s.b.x=620;assert(E.start(s,s.a,'specialDown'));assert.equal(s.a.r,4);tick(s,65);
 assert(s.b.life<10000);assert.equal(s.b.drowsy,0);assert(!s.b.statuses.drowsy);assert(!s.events.some(e=>e.type==='drowsy'));
});
test('Quiet reload is finite and an interrupted preparation restores no cartridges',()=>{
 const s=fresh('core__quiet');s.a.r=0;assert(E.start(s,s.a,'utility'));tick(s,53);assert.equal(s.a.r,0);tick(s,1);assert.equal(s.a.r,5);
 const interrupted=fresh('core__quiet');interrupted.a.r=0;assert(E.start(interrupted,interrupted.a,'utility'));tick(interrupted,30);interrupted.a.attack=null;tick(interrupted,90);assert.equal(interrupted.a.r,0);
});
test('Quiet movement has a bounded real reposition and no psychic projectile or coloured psychic ring',()=>{
 const s=fresh('core__quiet');assert(E.start(s,s.a,'specialBack'));tick(s,s.a.f.combat.moves.specialBack.startup);
 assert.equal(s.a.x,90);assert.equal(s.projectiles.length,0);assert.equal(s.a.f.combat.moves.specialBack.tag,'movement');
 assert(!s.fx.some(e=>e.tag==='psychic'));assert(s.fx.some(e=>e.kind==='ring'&&e.tag==='movement'));assert(s.a.x>=65);
});
test('Quiet metadata retains the observed left black sleeve/glove and anatomical right thigh holster',()=>{
 const v=fighter('core__quiet').visual;assert.equal(v.holster,true);assert.equal(v.gloves,true);assert.equal(v.collar,'open');
 assert.equal(v.leftSleeve,'black-long-sleeve-and-glove');assert.equal(v.rightGlove,'olive-short-glove');assert.equal(v.rightHolster,'anatomical-right-thigh');
});
test('Raven pays heat for all eight super projectiles and refuses the same salvo above the ceiling',()=>{
 const denied=fresh('core__raven');denied.a.r=53;assert.equal(E.start(denied,denied.a,'super'),false);assert.equal(denied.a.r,53);assert.equal(denied.a.meter,100);
 const s=fresh('core__raven');s.a.r=52;assert(E.start(s,s.a,'super'));assert.equal(s.a.r,100);assert.equal(s.a.meter,50);tick(s,35);assert.equal(s.projectiles.length,8);assert(s.projectiles.every(q=>q.def.tag==='ballistic'));assert.equal(s.a.r,100);
});
test('the unsupported Skull Face personal firearm is replaced by visibly declared unarmed bonus simulation',()=>{
 const f=fighter('archive__skull_face');assert.equal(f.visual.face,'scarred-human');assert.equal(f.visual.insignia,null);assert.equal(f.visual.weapon,'fists');assert.equal(f.combat.resource.kind,'stamina');
 assert(Object.values(f.combat.moves).every(m=>m.kind!=='projectile'));assert.equal(f.combat.moves.special.kind,'mark');assert.equal(f.combat.moves.super.kind,'melee');
 const s=fresh(f.uid);s.b.x=440;assert(E.start(s,s.a,'super'));assert.equal(s.a.r,70);assert.equal(s.a.meter,50);tick(s,55);assert(s.b.life<10000);assert.equal(s.projectiles.length,0);
 assert(!s.events.some(e=>['projectile','explosion','reload'].includes(e.type)));
});
test('Chaff still requires two real consumables and may be interrupted before activation',()=>{
 const s=fresh('core__old_snake');s.a.r=1;assert.equal(E.start(s,s.a,'specialDown'),false);assert.equal(s.a.r,1);
 s.a.r=2;assert(E.start(s,s.a,'specialDown'));assert.equal(s.a.r,0);tick(s,15);s.a.attack=null;tick(s,80);
 assert.equal(pass7.chaffProjectiles(s).length,0);assert(!s.pass7Chaff);assert(!s.events.some(e=>e.type==='chaffDispersed'));
});
test('Chaff fuse makes a non-explosive cloud with no human damage, mark, hit stun or guard chip',()=>{
 for(const face of [1,-1])for(const guarding of [false,true]){
  const s=chaffAtFuse('core__snake',face,guarding?{...E.empty(),guard:true,down:true}:null),life=s.b.life,guard=s.b.guard;
  assert.equal(life,10000);assert(!s.b.statuses.pass7Chaff);assert(!s.b.statuses.marked);assert.equal(s.b.hit,0);assert.equal(s.b.blockstun,0);
  tick(s,30,null,guarding?{...E.empty(),guard:true,down:true}:null);assert.equal(s.b.life,life);assert(s.b.guard>=guard);
  assert(!s.events.some(e=>['explosion','damage','block','emp','chaffElectronics'].includes(e.type)));
 }
});
test('a compatible machine loses a bounded sensor budget once and can guard or move normally',()=>{
 const s=chaffAtFuse('archive__dwalker');assert(s.b.statuses.pass7Chaff);assert.equal(s.b.statuses.pass7Chaff.t,90);
 const events=s.events.filter(e=>e.type==='chaffElectronics');assert.equal(events.length,1);assert.equal(events[0].resourceBefore-events[0].resourceAfter,10);
 const r=s.b.r,life=s.b.life,x=s.b.x;tick(s,10,null,{...E.empty(),guard:true,right:true});assert.equal(s.b.life,life);assert(s.b.x>x);assert(s.b.block);assert(s.b.r>=r);assert.equal(s.events.filter(e=>e.type==='chaffElectronics').length,1);
 assert.equal(s.a.statuses.pass7Chaff,undefined);assert(!s.events.some(e=>e.type==='emp'));
});
test('machine guided fire is actually denied through public starts and ordinary inputs while melee remains usable',()=>{
 const s=chaffAtFuse('archive__dwalker'),resource=s.b.r,meter=s.b.meter;
 assert.equal(E.start(s,s.b,'specialDown'),false);assert.equal(s.b.r,resource);assert.equal(s.b.meter,meter);
 tick(s,1,null,{...E.empty(),slot:'specialDown'});assert.equal(s.b.attack,null);assert(s.b.feedback.includes('BROUILLÉS'));
 assert(E.start(s,s.b,'light'));assert.equal(s.b.attack.name,'light');assert.equal(s.b.life,10000);
});
test('the same cloud does not disable ordinary human rifle inputs or take human ammunition',()=>{
 const s=chaffAtFuse('core__snake'),ammo=s.b.r;assert(!s.b.statuses.pass7Chaff);assert(E.start(s,s.b,'special'));assert.equal(s.b.r,ammo-s.b.f.combat.moves.special.cost);
});
test('electronic disruption and cloud expire without endlessly renewing the same target',()=>{
 const s=chaffAtFuse('archive__dwalker');tick(s,91);assert.equal(s.b.statuses.pass7Chaff,undefined);assert.equal(s.events.filter(e=>e.type==='chaffElectronics').length,1);
 assert(E.start(s,s.b,'specialDown'));tick(s,30);assert.equal(s.pass7Chaff.fields.length,0);
});
test('round reset clears chaff projectiles, fields and target state',()=>{
 const s=chaffAtFuse('archive__dwalker');assert(s.pass7Chaff.fields.length);E.reset(s);assert.equal(s.pass7Chaff,undefined);assert.equal(s.b.statuses.pass7Chaff,undefined);
});
test('Old Snake OctoCamo stays opaque, keeps its collision body and breaks on an offensive action',()=>{
 const s=fresh('core__old_snake'),body=JSON.stringify(E.box(s.a));assert(E.start(s,s.a,'specialBack'));tick(s,27);assert(s.a.buffs.cloak);assert.equal(pass7.cloakAlpha(s.a.f.uid),1);assert.equal(JSON.stringify(E.box(s.a)),body);
 tick(s,28);assert(E.start(s,s.a,'special'));assert.equal(s.a.buffs.cloak,undefined);assert.equal(pass7.cloakAlpha('core__fear'),.36);
});
test('unrelated matchups remain byte-identical to the historical engine for actual multi-action play',()=>{
 const original=freshEngine(false),wrapped=freshEngine(),a=original.create(fighter('core__snake'),fighter('core__ocelot'),{skipIntro:true,seed:123}),b=wrapped.create(fighter('core__snake'),fighter('core__ocelot'),{skipIntro:true,seed:123});
 const slots=['special','utility','heavy','specialBack','light','super'];
 for(let n=0;n<420;n++){
  const i=[{...original.empty(),right:n%120<20,guard:n%100>70,slot:n%60===0?slots[Math.floor(n/60)%slots.length]:null},{...original.empty(),left:n%110<18,down:n%70>40,slot:n%73===0?'special':null}];
  original.step(a,i);wrapped.step(b,i);assert.equal(JSON.stringify(b),JSON.stringify(a),'frame '+n);
 }
});
test('only sixteen reviewed finishers change, preserving IDs, commands and durations',()=>{
 const original=JSON.parse(fs.readFileSync(path.join(R,'data/finishers-v053.json'))),patched=structuredClone(original);pass7.applyFinishers(patched,fighters);
 for(const [uid,p]of Object.entries(original.profiles))if(!pass7.reviewedUIDs.includes(uid))assert.deepEqual(patched.profiles[uid],p);else{
  for(let i=0;i<p.finishers.length;i++){
   const a=p.finishers[i],b=patched.profiles[uid].finishers[i];for(const key of ['id','duration','slot','commandP1','commandP2'])assert.deepEqual(b[key],a[key]);assert.equal(b.canonical,false);
   for(const phase of b.phases){const pose=pass7.finisherPose(uid,b,phase,{},.45);assert(pose.animationActive);assert(fighter(uid).combat.moves[pose.moveSlot]);assert.equal(pose.hit,false);}
  }
 }
 assert.equal(Object.values(patched.familyCounts).reduce((a,b)=>a+b,0),354);
 assert(!patched.profiles.core__quiet.finishers.some(f=>/Fulton|rail/i.test(f.name)));
 assert(patched.profiles.archive__skull_face.finishers.every(f=>f.evidence==='simulation'));
});
test('source finisher drawing produces no phantom Skull weapon and never mutates gameplay state',()=>{
 const fins=JSON.parse(fs.readFileSync(path.join(R,'data/finishers-v053.json')));pass7.applyFinishers(fins,fighters);
 const operations=[],c={save(){},restore(){},beginPath(){},translate(){},rotate(){},stroke(){},moveTo(...args){operations.push(['moveTo',...args]);},lineTo(...args){operations.push(['lineTo',...args]);},fillRect(...args){operations.push(['fillRect',...args]);},strokeRect(...args){operations.push(['strokeRect',...args]);}};
 for(const uid of pass7.reviewedUIDs)for(const fin of fins.profiles[uid].finishers)for(const phase of fin.phases){
  const s=fresh(uid),before=JSON.stringify(s),count=operations.length,index=fin.phases.indexOf(phase),scene={uid,fin,phase,t:(index+.5)/fin.phases.length,ax:400,vx:850,vy:568,dir:1};
  assert.equal(pass7.drawFinisher(c,scene),true);assert.equal(JSON.stringify(s),before);if(uid==='archive__skull_face')assert.equal(operations.length,count);
 }
 assert(operations.some(x=>x[0]==='strokeRect'));assert(operations.some(x=>x[0]==='lineTo'));
 assert.equal(pass7.drawFinisher(c,{uid:'core__snake'}),false);
 assert.equal(pass7.drawChaffProjectile(c,{def:{id:'core__snake::specialDown',kind:'projectile',tag:'explosive'}},1),false);
 const q={age:15,def:{id:'core__old_snake::specialDown',kind:'chaff',tag:'chaff'}};const before=JSON.stringify(q);
 assert.equal(pass7.drawChaffProjectile(c,q,1),true);assert.equal(JSON.stringify(q),before);assert.equal(pass7.drawChaffProjectile(c,q,0),false);
});

const nativeCatalog=JSON.parse(fs.readFileSync(path.join(R,'data/combat-sprite-catalog-v1.json'))),
 nativeOrigins=JSON.parse(fs.readFileSync(path.join(R,'preparation/combat-sprites-pass7/SOURCE_COMBAT_ORIGINS.json'))).entries,
 renderer=require('../src/cqc-sprite-renderer.js'),sha=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
function nativeFighters(){const list=structuredClone(raw);pass7.apply(list,nativeCatalog,nativeOrigins);return list;}
const near=(actual,expected,note)=>assert(Math.abs(actual-expected)<1e-7,`${note}: ${actual} != ${expected}`);

test('the final native-origin contract contains sixteen launch landmarks and no invented Skull Face muzzle',()=>{
 assert.equal(Object.values(nativeOrigins).reduce((n,groups)=>n+Object.keys(groups).length*2,0),16);
 assert.deepEqual(nativeOrigins.archive__skull_face,{});
 for(const [uid,groups]of Object.entries(pass7.slots)){
  assert.deepEqual(Object.keys(nativeOrigins[uid]).sort(),Object.keys(groups).sort());
  const entry=nativeCatalog.entries[uid];assert(renderer.validateEntry(uid,entry));assert.equal(entry.mirror,false);
  for(const [group,slots]of Object.entries(groups)){
   const action=entry.actionMap[slots[0]],origins=pass7.origins(entry,nativeOrigins[uid][group],action);assert(origins,uid+' '+group);
   for(const side of ['right','left']){
    const mark=nativeOrigins[uid][group][side];assert.equal(sha(fs.readFileSync(path.join(R,mark.file))),mark.sha256);
    assert.equal(mark.frame,entry.phaseMap[action].active[0]);assert(mark.sourcePixelAlpha>0);
   }
  }
 }
});

test('source-bound launch rejects altered sheet hashes, phase frames, crop geometry and unreviewed points',()=>{
 const entry=nativeCatalog.entries.core__old_snake,marks=nativeOrigins.core__old_snake.shoot;
 assert(pass7.origins(entry,marks,'shoot'));
 const invalid=[
  x=>x.right.sha256='0'.repeat(64),x=>x.right.file='assets/combat-sprites/core__quiet/c-right-v1.png',
  x=>x.right.frame=0,x=>x.right.action='charge',x=>x.right.rect[0]+=1,x=>x.right.pivot[0]+=.01,
  x=>x.right.sourceFrameHeight+=1,x=>x.right.engineBodyScale=1.23,x=>x.right.point[0]=x.right.rect[0]-1,
  x=>x.right.point[1]=x.right.rect[1]+x.right.rect[3],x=>x.right.sourcePixelAlpha=0,
  x=>x.right.physicallyViewed=false,x=>delete x.left
 ];
 for(const change of invalid){const damaged=structuredClone(marks);change(damaged);assert.equal(pass7.origins(entry,damaged,'shoot'),null);}
 assert.equal(pass7.origins(entry,marks,'charge'),null);
 const wrongPhase=structuredClone(entry);wrongPhase.phaseMap.shoot.active=[0];assert.equal(pass7.origins(wrongPhase,marks,'shoot'),null);
 const mirrored=structuredClone(entry);mirrored.mirror=true;assert.equal(pass7.origins(mirrored,marks,'shoot'),null);
 const brokenAnchors=structuredClone(nativeOrigins);brokenAnchors.core__old_snake.shoot.right.sha256='0'.repeat(64);
 const list=structuredClone(raw);pass7.apply(list,nativeCatalog,brokenAnchors);
 assert.equal(fighter('core__old_snake',list).combat.moves.special.projectileOrigin,undefined);
 assert(fighter('core__old_snake',list).combat.moves.specialDown.projectileOrigin);
});

for(const [uid,groups]of Object.entries(pass7.slots))for(const [group,slots]of Object.entries(groups))for(const face of [1,-1]){
 test(`${uid} ${slots[0]} first real activation starts at its ${face===1?'right':'left'} reviewed native landmark`,()=>{
  const list=nativeFighters(),f=fighter(uid,list),slot=slots[0],m=f.combat.moves[slot],entry=nativeCatalog.entries[uid],
   action=entry.actionMap[slot],mark=nativeOrigins[uid][group][face===1?'right':'left'],
   directional=face===entry.facing?entry:{...entry,actions:entry.oppositeActions};
  const selected=renderer.selectFrame(directional,{moveSlot:slot,animationActive:true,attackPhase:'active',phaseProgress:0});
  assert.equal(selected.action,mark.action);assert.equal(selected.index,mark.frame);assert.equal(selected.frame.sha256,mark.sha256);
  const s=E.create(f,fighter('core__snake',list),{skipIntro:true});s.a.x=face===1?180:1100;s.b.x=face===1?1150:130;s.a.face=face;s.b.face=-face;s.a.meter=100;
  assert(E.start(s,s.a,slot));tick(s,m.startup-1);
  assert.equal(s.projectiles.length,0);assert.equal(pass7.chaffProjectiles(s).length,0);
  tick(s,1);assert(s.a.attack.activated);assert.equal(s.a.attack.t,m.startup);
  const emitted=m.kind==='chaff'?pass7.chaffProjectiles(s):s.projectiles,q=emitted.find(q=>!q.delay&&!q.dead);assert(q);
  assert.equal(q.owner,s.a.slot);assert.equal(q.def.id,m.id);assert.equal(q.kind,m.kind==='chaff'?'chaff':m.tag);
  const [x,y,w,h]=selected.frame.rect,[px,py]=selected.frame.pivot,k=entry.displayHeight/entry.sourceFrameHeights[mark.file]*1.12,
   originX=s.a.x+(mark.point[0]-x-w*px)*k,originY=s.a.y+(mark.point[1]-y-h*py)*k;
  near(q.x,originX+face*m.speed,'first step x from physically reviewed source');
  near(q.y,originY+(m.vy||0),'first step y from physically reviewed source');
  if(uid==='core__raven')assert.equal(emitted.length,m.count);
  if(uid==='core__old_snake'&&slot==='specialDown')assert.equal(s.projectiles.length,0);
 });
}

test('Skull Face retains only empty-handed simulation labels and never receives a ballistic origin',()=>{
 const f=fighter('archive__skull_face',nativeFighters());
 for(const m of Object.values(f.combat.moves))assert.equal(m.projectileOrigin,undefined);
 assert(!/Crosse|pistolet|grenade|Fulton/.test(Object.values(f.combat.moves).map(m=>m.name).join(' ')));
 assert.equal(f.combat.moves.specialForward.name,'CQC du commandement — simulation');
});

test('final native gun heights resolve real standing and crouching contacts, including the observed Quiet low-shot asymmetry',()=>{
 const list=nativeFighters();let matchups=0;
 for(const [uid,groups]of Object.entries(pass7.slots))for(const slots of Object.values(groups))for(const face of [1,-1])for(const crouching of [false,true]){
  const f=fighter(uid,list),slot=slots[0],m=f.combat.moves[slot];if(m.kind!=='projectile')continue;
  const s=E.create(f,fighter('core__snake',list),{skipIntro:true});s.a.x=face===1?180:1100;s.b.x=s.a.x+face*450;s.a.face=face;s.b.face=-face;s.a.meter=100;
  assert(E.start(s,s.a,slot));tick(s,m.startup+90,null,crouching?{...E.empty(),down:true}:null);
  const expected=!crouching||uid==='core__raven'&&slot==='specialForward'||uid==='core__quiet'&&slot==='specialDown'&&face===-1;
  assert.equal(s.b.life<10000,expected,`${uid} ${slot} ${face} ${crouching?'crouch':'standing'}`);
  assert.equal(s.events.some(e=>e.type==='damage'),expected);matchups++;
 }
 assert.equal(matchups,28);
});

test('source finisher muzzle and hand traces use the actual 1.23 actor scale without applying the gameplay 1.12 twice',()=>{
 const list=nativeFighters(),fins=JSON.parse(fs.readFileSync(path.join(R,'data/finishers-v053.json')));pass7.applyFinishers(fins,list);
 for(const uid of ['core__raven','core__quiet','core__old_snake'])for(const dir of [1,-1]){
  const isChaff=uid==='core__old_snake',fin=fins.profiles[uid].finishers.find(f=>f.slot===(isChaff?'down':'neutral')),
   phase=isChaff?'deploy':uid==='core__quiet'?'shot':'volley',i=fin.phases.indexOf(phase),t=i/fin.phases.length,
   slot=isChaff?'specialDown':'super',o=fighter(uid,list).combat.moves[slot].projectileOrigin[dir],operations=[];
  const c={save(){},restore(){},beginPath(){},rotate(){},stroke(){},fillRect(){},strokeRect(){},translate(...a){operations.push(['translate',...a]);},moveTo(...a){operations.push(['moveTo',...a]);},lineTo(){}};
  assert(pass7.drawFinisher(c,{uid,fin,phase,t,ax:400,vx:850,vy:568,dir}));
  const start=operations.find(a=>a[0]===(isChaff?'translate':'moveTo'));assert(start);
  near(start[1],400+dir*o.forward*1.23/1.12-(isChaff?0:dir*9),'finisher source x');
  near(start[2],568-o.height*1.23/1.12,'finisher source y');
 }
});
