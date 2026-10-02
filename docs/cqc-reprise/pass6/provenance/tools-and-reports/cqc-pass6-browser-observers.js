(()=>{
if(window.__p6Installed)return true;window.__p6Installed=true;
window.__p6Draws=[];window.__p6Projectiles=[];window.__p6Traps=[];window.__p6Barriers=[];window.__p6FinisherDraws=[];
const sprite=window.CQC_COMBAT_SPRITES,draw=sprite.draw;
sprite.draw=function(...args){const c=args[0],old=c.drawImage;let crop=null,ok;
 c.drawImage=function(img,...r){const t=c.getTransform();crop={file:img.src.slice(img.src.indexOf('assets/')),source:r.slice(0,4),destination:r.slice(4),matrix:[t.a,t.b,t.c,t.d,t.e,t.f]};return old.call(this,img,...r)};
 try{ok=draw(...args)}finally{c.drawImage=old}
 window.__p6Draws.push({uid:args[1]?.uid,actorCanvas:[args[2],args[3]],face:args[4],scale:args[5],pose:args[6],ok,crop});return ok;
};
const art=window.CQC_PASS6_PROP_ART;if(!art)throw Error('PASS6 prop renderer absent');
for(const [method,output]of [['drawProjectile','__p6Projectiles'],['drawTrap','__p6Traps'],['drawBarrier','__p6Barriers']]){
 const original=art[method];if(typeof original!=='function')throw Error('PASS6 hook absent '+method);
 art[method]=function(c,q,z){const t=c.getTransform(),old=c.drawImage;let natives=[],ok;
  c.drawImage=function(img,...r){natives.push({file:img.src.slice(img.src.indexOf('assets/')),source:r.slice(0,4),destination:r.slice(4),matrix:[c.getTransform().a,c.getTransform().b,c.getTransform().c,c.getTransform().d,c.getTransform().e,c.getTransform().f]});return old.call(this,img,...r)};
  try{ok=original(c,q,z)}finally{c.drawImage=old}
  window[output].push({id:q.id,uid:q.f?.uid,owner:q.owner,source:q.def?.id,center:[t.e,t.f],natives,ok});return ok;
 };
}
{
 const original=art.drawFinisher;if(typeof original!=='function')throw Error('PASS6 authored finisher hook absent');
 art.drawFinisher=function(c,scene){const oldImage=c.drawImage,oldArc=c.arc,oldRect=c.fillRect,oldStrokeRect=c.strokeRect;let natives=[],arcs=[],rects=[],strokeRects=[],ok;
  c.drawImage=function(img,...r){natives.push({file:img.src.slice(img.src.indexOf('assets/')),source:r.slice(0,4),destination:r.slice(4),matrix:[c.getTransform().a,c.getTransform().b,c.getTransform().c,c.getTransform().d,c.getTransform().e,c.getTransform().f]});return oldImage.call(this,img,...r)};
  c.arc=function(...r){arcs.push(r);return oldArc.call(this,...r)};c.fillRect=function(...r){rects.push(r);return oldRect.call(this,...r)};c.strokeRect=function(...r){strokeRects.push(r);return oldStrokeRect.call(this,...r)};
  try{ok=original(c,scene)}finally{c.drawImage=oldImage;c.arc=oldArc;c.fillRect=oldRect;c.strokeRect=oldStrokeRect}
  window.__p6FinisherDraws.push({uid:scene?.uid,phase:scene?.phase,finisherSlot:scene?.fin?.slot,natives,arcs,rects,strokeRects,ok});return ok;
 };
}
window.__p6Step=(s,n=1,inputB=null)=>{const a=window.__CQC055Versus;for(let i=0;i<n;i++)a.engine.step(s,[a.engine.empty(),inputB||a.engine.empty()]);return s;};
window.__p6Start=(uid,face,p2='core__snake',stage='shadow_heliport')=>{
 const a=window.__CQC055Versus;a.startExternal({p1:uid,p2,stage,mode:'training',dummy:'idle',autoheal:false,freeResource:false,rounds:1,seconds:99,finishers:'off',source:'pass6-browser-qa'});
 a.pause(true);a.resetDojo();document.querySelector('#pause43').classList.add('hidden');const s=a.getState();
 s.options.freeMeter=false;s.options.freeResource=false;s.options.autoheal=false;s.a.x=face===1?300:980;s.b.x=face===1?980:300;
 s.a.face=face;s.b.face=-face;s.a.vx=s.a.vy=s.a.kx=0;s.a.meter=100;s.a.cool=0;s.a.cooldowns={};if(uid==='core__fury')s.a.r=0;return s;
};
window.__p6Idle=(uid,face)=>{
 const s=window.__p6Start(uid,face),a=window.__CQC055Versus;window.__p6Draws=[];a.draw();
 const d=window.__p6Draws.find(x=>x.uid===uid),e=window.CQC_COMBAT_SPRITE_CATALOG.entries[uid],group=(face===e.facing?e.actions:e.oppositeActions).idle;
 if(!d?.ok||!d.crop||d.face!==face||d.pose.moveSlot||d.crop.matrix[0]<=0)throw Error('Native independent idle failure '+JSON.stringify(d));
 const f=group.frames.find(f=>f.file===d.crop.file&&JSON.stringify(f.rect)===JSON.stringify(d.crop.source));if(!f)throw Error('Idle source rect missing');
 return{uid,face,viewport:innerWidth,sourceFile:f.file,sourceSHA:f.sha256,sourceRect:f.rect,pivot:f.pivot,canvasMatrix:d.crop.matrix,nativeImageUsed:true};
};
window.__p6Origin=(uid,face,slot)=>{
 const api=window.__CQC055Versus,s=window.__p6Start(uid,face),m=s.a.f.combat.moves[slot],kind=slot==='super'&&uid!=='core__fury'?'charge':'shoot',mark=window.CQC_PASS6_NATIVE_ORIGINS?.[uid]?.[kind]?.[face===1?'right':'left'];
 if(!mark)throw Error('Reviewed native mark absent '+[uid,kind,face]);
 const beforeResource=s.a.r,beforeMeter=s.a.meter;if(!api.engine.start(s,s.a,slot))throw Error('Origin move refused');const afterStart={resource:s.a.r,meter:s.a.meter};window.__p6Step(s,m.startup);
 const q=s.projectiles.find(q=>!q.delay&&!q.dead);if(!q)throw Error('Actual first-active projectile absent');
 const immutable=JSON.stringify(q);window.__p6Draws=[];window.__p6Projectiles=[];api.draw();
 const d=window.__p6Draws.find(d=>d.uid===uid),render=window.__p6Projectiles.find(p=>p.id===q.id);if(!d?.ok||!d.crop||!render)throw Error('Native body/projectile Canvas draw absent');
 const e=window.CQC_COMBAT_SPRITE_CATALOG.entries[uid],frame=(face===e.facing?e.actions:e.oppositeActions)[mark.action].frames[mark.frame];
 if(d.crop.file!==mark.file||frame.sha256!==mark.sha256||JSON.stringify(d.crop.source)!==JSON.stringify(frame.rect)||d.pose.attackPhase!=='active')throw Error('First active native source mark mismatch');
 const [sx,sy,sw,sh]=d.crop.source,[dx,dy,dw,dh]=d.crop.destination,[a,b,c,dd,tx,ty]=d.crop.matrix,
 lx=dx+(mark.point[0]-sx)*dw/sw,ly=dy+(mark.point[1]-sy)*dh/sh,origin=[a*lx+c*ly+tx,b*lx+dd*ly+ty],zoom=d.scale/1.12,
 expected=[origin[0]+face*(m.speed||15)*zoom,origin[1]+(m.vy||0)*zoom],residual=Math.hypot(render.center[0]-expected[0],render.center[1]-expected[1]);
 if(residual>.01)throw Error('Source matrix/projectile residual '+JSON.stringify({uid,face,slot,residual,expected,actual:render.center}));
 const propId={core__pain:'pain-hornets',core__fear:'fear-bolts',core__fury:'fury-flames'}[uid],prop=propId?window.CQC_PASS6_PROP_CATALOG?.[propId]:null;
 if(propId&&(!render.ok||!prop||render.natives.length!==1||render.natives[0].file!==prop.file))throw Error('Actual native prop source absent '+propId);
 if(!propId&&render.ok)throw Error('The End inherited other incarnation prop');
 if(JSON.stringify(q)!==immutable)throw Error('Native art mutated projectile physics');
 if(d.crop.matrix[0]<=0)throw Error('Runtime mirrored independent atlas');
 return{uid,face,slot,group:kind,viewport:innerWidth,sourceSHA:frame.sha256,sourceFile:frame.file,sourceRect:frame.rect,sourcePoint:mark.point,destination:d.crop.destination,canvasMatrix:d.crop.matrix,nativeOriginCanvas:origin,actualProjectileCanvas:render.center,pixelResidual:residual,nativeProp:render.natives,propSHA:prop?.sha256,beforeResource,beforeMeter,afterStart,projectileCount:s.projectiles.length,physicsOrigin:m.projectileOrigin[face],q:JSON.parse(immutable)};
};
window.__p6Contact=(uid,face,slot,crouch)=>{
 const a=window.__CQC055Versus,s=window.__p6Start(uid,face),m=s.a.f.combat.moves[slot];if(uid==='core__fury')s.b.x=face===1?570:710;
 const input={...a.engine.empty(),down:crouch},life=s.b.life;window.__p6Step(s,1,input);s.a.face=face;if(!a.engine.start(s,s.a,slot))throw Error('Contact start refused');
 let frames=0,seen=false,first=null;while(frames<m.startup+(m.life||130)+8){window.__p6Step(s,1,input);frames++;const q=s.projectiles.find(q=>!q.delay);seen||=!!q;if(q&&!first)first={x:q.x,y:q.y,vx:q.vx,vy:q.vy,box:a.engine.box(s.b)};if(s.b.life<life)break;}
 const hit=s.b.life<life;if(!seen)throw Error('No real projectile observed during contact');if(!crouch&&!hit)throw Error('Standing target missed '+JSON.stringify({uid,face,slot,first}));
 a.draw();return{uid,face,slot,crouch,viewport:innerWidth,hit,frames,damage:life-s.b.life,first,finalTargetBox:a.engine.box(s.b),status:JSON.parse(JSON.stringify(s.b.statuses))};
};
window.__p6PainBarrier=(face)=>{
 const a=window.__CQC055Versus,s=window.__p6Start('core__pain',face);s.b.x=s.a.x+face*160;s.b.face=-face;const m=s.a.f.combat.moves.specialDown;
 if(!a.engine.start(s,s.a,'specialDown'))throw Error('Pain barrier refused');window.__p6Step(s,m.startup);
 if(s.a.buffs.barrier?.hits!==2)throw Error('Expected bounded two-hit original swarm barrier');const immutable=JSON.stringify(s.a.buffs);window.__p6Barriers=[];a.draw();const rendered=window.__p6Barriers.find(r=>r.uid==='core__pain');
 if(!rendered?.ok||rendered.natives.length!==4||rendered.natives.some(r=>r.file!==window.CQC_PASS6_PROP_CATALOG['pain-hornets'].file)||JSON.stringify(s.a.buffs)!==immutable)throw Error('Pain native barrier draw missing or changes buffs');
 window.__p6Step(s,m.active+m.recovery);const life=s.a.life,shot=s.b.f.combat.moves.special,rows=[];
 for(let i=0;i<3;i++){
  if(!a.engine.start(s,s.b,'special'))throw Error('Real enemy MK22 refused '+i);let damageBefore=s.a.life,seen=false;
  for(let k=0;k<shot.startup+shot.active+shot.recovery+2;k++){window.__p6Step(s);seen||=s.projectiles.some(q=>q.owner===1&&!q.delay);}
  rows.push({index:i,seen,life:s.a.life,damage:damageBefore-s.a.life,barrier:s.a.buffs.barrier?{...s.a.buffs.barrier}:null});
 }
 if(rows.some(r=>!r.seen)||rows[0].damage!==0||rows[0].barrier?.hits!==1||rows[1].damage!==0||rows[1].barrier!==null||rows[2].damage<=0||s.a.life>=life)throw Error('Real two-block barrier behavior '+JSON.stringify(rows));
 return{face,viewport:innerWidth,nativeBarrier:rendered,originalBuff:JSON.parse(immutable),actualEnemyProjectiles:rows};
};
window.__p6FearCloak=()=>{
 const a=window.__CQC055Versus,s=window.__p6Start('core__fear',1);s.b.x=460;const before=a.engine.box(s.a),m=s.a.f.combat.moves.specialBack;
 if(!a.engine.start(s,s.a,'specialBack'))throw Error('Fear cloak refused');window.__p6Step(s,m.startup);const after=a.engine.box(s.a);
 if(!s.a.buffs.cloak||JSON.stringify(before)!==JSON.stringify(after))throw Error('Cloak changes human collision');a.draw();const life=s.a.life;window.__p6Step(s,m.active+m.recovery);
 if(!a.engine.start(s,s.b,'special'))throw Error('Enemy cloak collision shot refused');let seen=false,frames=0;
 while(frames++<80&&s.a.life===life){window.__p6Step(s);seen||=s.projectiles.some(q=>q.owner===1&&!q.delay);}
 if(!seen||s.a.life>=life||s.a.buffs.cloak)throw Error('Cloaked human is invulnerable or hit does not reveal');return{viewport:innerWidth,collisionBefore:before,collisionCloaked:after,actualProjectileHit:true,damage:life-s.a.life,revealed:!s.a.buffs.cloak,frames};
};
window.__p6EndAmmo=()=>{
 const a=window.__CQC055Versus,s=window.__p6Start('core__end',1);if(s.a.f.combat.resource.max!==5||s.a.r!==5)throw Error('Mosin reserve not five');
 const superMove=s.a.f.combat.moves.super;if(superMove.tag!=='precision'||superMove.cost!==1||superMove.meter!==50)throw Error('The End retains free railgun');
 const rows=[];for(const slot of ['super','special','special','special','special']){
  const m=s.a.f.combat.moves[slot],before={r:s.a.r,m:s.a.meter};if(!a.engine.start(s,s.a,slot))throw Error('Finite Mosin shot refused '+rows.length);const after={r:s.a.r,m:s.a.meter};window.__p6Step(s,m.startup);if(!s.projectiles.some(q=>q.def.id==='core__end::'+slot))throw Error('Actual Mosin projectile missing');window.__p6Step(s,m.active+m.recovery+1);rows.push({slot,before,after});
 }
 if(s.a.r!==0||rows[0].after.m!==50||a.engine.start(s,s.a,'special'))throw Error('Empty Mosin still fires');s.a.meter=100;
 if(a.engine.start(s,s.a,'super'))throw Error('Empty Mosin super still fires');
 const reload=s.a.f.combat.moves.utility;if(!a.engine.start(s,s.a,'utility'))throw Error('Empty Mosin reload refused');window.__p6Step(s,reload.startup-1);const pre=s.a.r;if(pre!==0)throw Error('Ammo restored before reload activation');window.__p6Step(s,1);if(s.a.r!==5)throw Error('Reload does not restore five on actual activation');
 return{viewport:innerWidth,resource:s.a.f.combat.resource,shots:rows,emptySpecialRefused:true,emptySuperRefused:true,reloadBeforeActivation:pre,reloadAtActivation:s.a.r,superTag:superMove.tag,superCost:superMove.cost,superMeter:superMove.meter};
};
window.__p6EndReloadInterrupted=()=>{
 const a=window.__CQC055Versus,s=window.__p6Start('core__end',1),m=s.a.f.combat.moves.utility;s.a.r=0;s.b.x=460;s.b.face=-1;
 if(!a.engine.start(s,s.a,'utility'))throw Error('Interruption fixture reload refused');window.__p6Step(s,5);
 if(!a.engine.start(s,s.b,'special'))throw Error('Enemy actual MK22 reload interruption refused');const life=s.a.life;let seen=false,hitAt=null;
 for(let i=0;i<m.startup+m.active+m.recovery+10;i++){window.__p6Step(s);seen||=s.projectiles.some(q=>q.owner===1&&!q.delay);if(s.a.life<life&&hitAt===null)hitAt=s.frame;}
 if(!seen||hitAt===null||s.a.r!==0||s.events.some(e=>e.type==='activate'&&e.actor===0&&e.slot==='utility'))throw Error('Interrupted Mosin reload restored ammunition '+JSON.stringify({seen,hitAt,reserve:s.a.r}));
 return{viewport:innerWidth,enemyActualProjectileObserved:seen,hitFrame:hitAt,damage:life-s.a.life,reserveAfterInterruptedReload:s.a.r,activationEvents:s.events.filter(e=>e.type==='activate'),startup:m.startup};
};
window.__p6FuryTrap=(face)=>{
 const a=window.__CQC055Versus,s=window.__p6Start('core__fury',face),m=s.a.f.combat.moves.specialDown;const ids=[];let render=null;
 for(let i=0;i<2;i++){
  if(!a.engine.start(s,s.a,'specialDown'))throw Error('Fury nappe refused');window.__p6Step(s,m.startup);const t=s.traps.find(t=>t.owner===0),before=JSON.stringify(t);if(s.traps.filter(t=>t.owner===0&&!t.dead).length!==1||!t)throw Error('Fury exceeds one live nappe');ids.push(t.id);
  window.__p6Traps=[];a.draw();render=window.__p6Traps.find(d=>d.id===t.id);if(!render?.ok||render.natives.length!==1||render.natives[0].file!==window.CQC_PASS6_PROP_CATALOG['fury-flames'].file||before!==JSON.stringify(t))throw Error('Native Fury trap mutates physics or not drawn');
  const r=render.natives[0].destination;if(Math.abs(r[1]+r[3])>1e-9)throw Error('Nappe source should rest on transformed ground');window.__p6Step(s,m.active+m.recovery+1);
 }
 if(ids[0]===ids[1])throw Error('Second nappe did not replace first');s.a.r=90;const before=s.a.r;if(a.engine.start(s,s.a,'special'))throw Error('Fury heat limit ignored');const u=s.a.f.combat.moves.utility;if(!a.engine.start(s,s.a,'utility'))throw Error('Fury cooling refused');window.__p6Step(s,u.startup-1);if(s.a.r!==before)throw Error('Cooling occurred before utility activation');window.__p6Step(s,1);if(s.a.r!==before-u.restore)throw Error('Cooling resource restoration mismatch');
 return{face,viewport:innerWidth,placedIds:ids,liveNappes:s.traps.filter(t=>!t.dead).length,maxNappes:m.maxTraps,actualNativeTrap:render,heatAttempt90Cost27Refused:true,beforeCooling:before,afterCooling:s.a.r,restore:u.restore};
};
window.__p6EquipmentMetadata=()=>{
 const fighters=window.__CQC055Versus.fighters,duck=fighters.find(f=>f.uid==='core__dirtyduck'),red=fighters.find(f=>f.uid==='core__redblaster_mg2'),fear=fighters.find(f=>f.uid==='core__fear'),pain=fighters.find(f=>f.uid==='core__pain');
 if(!duck||/faucon/i.test(duck.combat.role)||Object.values(duck.combat.moves).some(m=>m.tag==='hawk'))throw Error('Dirty Duck inherits Slasher Hawk');
 const rm=red?.combat.moves;if(!rm||red.combat.weapon!=='grenade'||rm.special.projectileOverride!=='grenade'||rm.specialForward.kind!=='projectile'||rm.specialDown.tag!=='snare'||rm.specialDown.damage!==0||Object.values(rm).some(m=>m.kind==='detonate'||m.tag==='ballistic')||rm.super.cost!==3)throw Error('Red Blaster retains Fatman identity');
 if(!/Little Joe/.test(fear.combat.moves.special.name)||!/William Tell/.test(fear.combat.moves.super.name)||JSON.stringify(fear.combat.moves.special.projectileOrigin)===JSON.stringify(fear.combat.moves.super.projectileOrigin))throw Error('The Fear bows origins identical');
 if(/Bullet Bee/.test(pain.combat.moves.specialForward.name)||pain.visual.weapon==='psychic')throw Error('Masked Pain claims oral phase-two attack/psychic equipment');
 return{viewport:innerWidth,duck:{role:duck.combat.role,tags:Object.values(duck.combat.moves).map(m=>m.tag)},red:{role:red.combat.role,resource:red.combat.resource,moves:rm},fear:{littleJoe:fear.combat.moves.special.name,williamTell:fear.combat.moves.super.name,littleOrigin:fear.combat.moves.special.projectileOrigin,williamOrigin:fear.combat.moves.super.projectileOrigin},pain:{scope:pain.combat.scope,forwardName:pain.combat.moves.specialForward.name,weapon:pain.visual.weapon}};
};
window.__p6RedGrenades=(face,slot)=>{
 const a=window.__CQC055Versus,s=window.__p6Start('core__redblaster_mg2',face),m=s.a.f.combat.moves[slot],r=s.a.r;if(!a.engine.start(s,s.a,slot))throw Error('Red grenade refused');if(s.a.r!==r-m.cost)throw Error('Red grenade finite reserve not paid');window.__p6Step(s,m.startup);const qs=s.projectiles;if(qs.length!==(m.count||1)||qs.some(q=>q.def.projectileOverride!=='grenade'||q.def.tag!=='explosive'||!q.def.gravity||!q.def.fuse))throw Error('Actual Red projectile not grenades');const immutable=JSON.stringify(qs);window.__p6Projectiles=[];a.draw();const visible=qs.filter(q=>!q.delay),draws=window.__p6Projectiles.filter(d=>visible.some(q=>q.id===d.id));
 const prop=window.CQC_PASS6_PROP_CATALOG['redblaster-grenades'];if(prop&&draws.some(d=>!d.ok||d.natives[0]?.file!==prop.file))throw Error('Red native grenade not drawn');if(JSON.stringify(qs)!==immutable)throw Error('Red grenade art mutates physics');
 return{face,slot,viewport:innerWidth,beforeReserve:r,afterReserve:s.a.r,projectileCount:qs.length,nativePropExpected:!!prop,actualDraws:draws,propSHA:prop?.sha256,projectiles:JSON.parse(immutable)};
};
window.__p6RedReserveWire=(face)=>{
 const a=window.__CQC055Versus,s=window.__p6Start('core__redblaster_mg2',face),superMove=s.a.f.combat.moves.super;
 s.a.r=2;s.a.meter=100;if(a.engine.start(s,s.a,'super')||s.a.r!==2||s.a.meter!==100)throw Error('Red three-grenade burst allows two or charges failed start');
 s.a.r=3;s.a.meter=50;if(!a.engine.start(s,s.a,'super')||s.a.r!==0||s.a.meter!==0)throw Error('Red burst does not consume three and fifty');
 window.__p6Step(s,superMove.startup);const burst=s.projectiles.map(q=>({id:q.id,delay:q.delay,tag:q.def.tag,override:q.def.projectileOverride}));if(burst.length!==3)throw Error('Red burst not three actual grenades');
 const wireState=window.__p6Start('core__redblaster_mg2',face),m=wireState.a.f.combat.moves.specialDown;wireState.b.x=wireState.a.x+face*110;const life=wireState.b.life;
 if(!a.engine.start(wireState,wireState.a,'specialDown'))throw Error('Red wire refused');let triggered=null;
 for(let i=0;i<m.startup+m.arm+30;i++){window.__p6Step(wireState);if(wireState.events.some(e=>e.type==='trapTrigger')){triggered={frame:wireState.frame,status:{...wireState.b.statuses.slow},life:wireState.b.life};break;}}
 if(!triggered||triggered.life!==life||!triggered.status||!(triggered.status.t>0&&triggered.status.t<=140)||wireState.events.some(e=>e.type==='explosion'))throw Error('Red wire behaves as damaging remote C4 '+JSON.stringify(triggered));
 window.__p6Step(wireState,160);if(wireState.b.statuses.slow||wireState.b.life!==life)throw Error('Red wire damage or slow unbounded');
 return{face,viewport:innerWidth,twoGrenadesRefused:true,threeGrenadesFiftyMeterPaid:true,burst,wire:triggered,wireFinalLife:wireState.b.life,wireSlowExpired:!wireState.b.statuses.slow,wireDamage:life-wireState.b.life,wireExplosionEvents:wireState.events.filter(e=>e.type==='explosion')};
};
window.__p6RedWireLowGuard=(face)=>{
 const a=window.__CQC055Versus,s=window.__p6Start('core__redblaster_mg2',face),m=s.a.f.combat.moves.specialDown;s.b.x=s.a.x+face*110;s.b.face=-face;
 const life=s.b.life,input={...a.engine.empty(),down:true,guard:true};if(!a.engine.start(s,s.a,'specialDown'))throw Error('Red low-guard wire refused');let triggered=null;
 for(let i=0;i<m.startup+m.arm+30;i++){window.__p6Step(s,1,input);if(s.events.some(e=>e.type==='trapTrigger')){triggered={frame:s.frame,life:s.b.life,crouch:s.b.crouch,blocking:s.b.block,slow:s.b.statuses.slow||null,damageEvents:s.events.filter(e=>e.type==='damage')};break;}}
 if(!triggered||!triggered.crouch||life-triggered.life!==1||triggered.damageEvents.length!==1||triggered.damageEvents[0].blocked!==true||s.events.some(e=>e.type==='explosion')||triggered.slow?.t>140)throw Error('Historical minimum low-guard chip or bounded wire mismatch '+JSON.stringify(triggered));
 return{face,viewport:innerWidth,configuredWireDamage:m.damage,actualLowGuardChip:life-triggered.life,actualUnblockedWireDamage:0,triggered,explosionEvents:s.events.filter(e=>e.type==='explosion'),limitation:'Historical engine keeps a nonlethal minimum 1 HP guard chip for the low-guard frontal collision; unblocked wire has 0 HP damage. No explosive detonation; unblocked slow is bounded at 140 frames.'};
};
window.__p6FinishersCatalogue=()=>{
 const a=window.__CQC055Versus,profiles=a.finishers.profiles,counts={};for(const p of Object.values(profiles))counts[p.family]=(counts[p.family]||0)+1;
 if(JSON.stringify(Object.entries(counts).sort())!==JSON.stringify(Object.entries(a.finishers.familyCounts).sort()))throw Error('Runtime finisher family totals stale');
 const results=[];
 for(const uid of ['core__pain','core__redblaster_mg2']){
  const s=window.__p6Start(uid,1);document.querySelector('#finishFight46').click();const profile=profiles[uid],visible={name:document.querySelector('#finishFighter46').textContent,basis:document.querySelector('#finishBasis46').textContent,rows:[...document.querySelectorAll('#finishList46 .finish-row46')].map(e=>e.innerText)};
  if(profile.finishers.length!==4||visible.rows.length!==4)throw Error('Four finisher choices absent');
  for(const fin of profile.finishers){const namedMoves=JSON.stringify({name:fin.name,sourceMoves:fin.sourceMoves});
   if(uid==='core__pain'&&(fin.family==='psychic'||fin.phases.some(p=>['lift','orbit','psychic'].includes(p))||/Bullet\s*Bee|Tommy Gun/i.test(namedMoves)||fin.description.includes('La cible est immobilisée par une force mentale')))throw Error('Masked Pain finisher inherits telekinesis/oral phase two');
   if(uid==='core__redblaster_mg2'&&(fin.phases.some(p=>['plant','detonate','retreat'].includes(p))||/C4|charges retard|Déclencher les charges/i.test(namedMoves)||fin.description.includes('Une charge visible est placée, l’attaquant se replie')))throw Error('Red finisher retains remote C4');
   if(!visible.rows.some(t=>t.includes(fin.name)&&t.includes(fin.description)))throw Error('Runtime finisher text not visible in modal');
  }
  document.querySelector('#finishClose46').click();results.push({uid,profile,visible});
 }
 return{viewport:innerWidth,actualFourChoiceModals:results,runtimeFamilyCounts:counts};
};
window.__p6FinishersScene=async(uid,index,stopAfterIndex=null)=>{
 const a=window.__CQC055Versus,profile=a.finishers.profiles[uid],fin=profile.finishers[index];
 a.startExternal({p1:uid,p2:'core__snake',stage:'shadow_heliport',mode:'local',rounds:1,seconds:99,finishers:'stylized',source:'pass6-finisher-browser-qa'});a.pause(true);document.querySelector('#pause43').classList.add('hidden');
 const s=a.getState();s.phase='fight';s.a.ai=s.b.ai=false;a.draw();s.b.life=0;
 for(let i=0;i<100&&!a.diagnostics().finishWindow;i++){a.pause(false);a.advance(1000/60);a.pause(true);document.querySelector('#pause43').classList.add('hidden');}
 if(!a.diagnostics().finishWindow||s.winner!==0)throw Error('Real round-end finisher window not triggered by KO fixture');
 const button=document.querySelector('#finishOptions46 [data-fin="'+index+'"]');if(!button||!button.innerText.includes(fin.name))throw Error('Actual finisher prompt choice missing');button.click();
 if(!a.diagnostics().finishScene)throw Error('Actual finisher button failed to start scene');
 const phases=[];let elapsed=0;
 for(let i=0;i<fin.phases.length;i++){
  const target=fin.duration*(i+.5)/fin.phases.length;a.pause(false);a.advance((target-elapsed)*1000/60);a.pause(true);document.querySelector('#pause43').classList.add('hidden');elapsed=target;window.__p6Draws=[];window.__p6FinisherDraws=[];
  await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
  const phase=document.querySelector('#finisherPhase46').textContent.toLowerCase(),victim=window.__p6Draws.find(d=>d.uid==='core__snake'),winner=window.__p6Draws.find(d=>d.uid===uid);
  if(phase!==fin.phases[i]||!victim||!winner||victim.actorCanvas[1]<568)throw Error('Actual finisher phase or victim ground position invalid '+JSON.stringify({uid,expected:fin.phases[i],phase,victim,winner}));
  if(uid==='core__pain'&&!winner.ok)throw Error('Masked Pain native body unavailable in actual finisher');
  const effect=window.__p6FinisherDraws.find(d=>d.uid===uid&&d.phase===phase);if(!effect?.ok)throw Error('Actual reviewed finisher effects hook absent '+phase);
  if(uid==='core__pain'&&['volley','impact'].includes(phase)&&(effect.natives.length!==4||effect.natives.some(d=>d.file!==window.CQC_PASS6_PROP_CATALOG['pain-hornets'].file)))throw Error('Actual Pain cinematic native hornet sources absent');
  if(uid==='core__redblaster_mg2'&&((phase==='arc'&&(effect.natives.length||effect.rects.length!==2||effect.strokeRects.length!==1))||(phase==='blast'&&effect.arcs.length!==1)))throw Error('Red authored finisher grenade arc/delayed blast absent');
  phases.push({phase,winner,victim,effect,visibleName:document.querySelector('#finisherName46').textContent,visibleDescription:document.querySelector('#finisherDesc46').textContent});
  if(stopAfterIndex===i)break;
 }
 if(phases.some(p=>p.visibleName!==fin.name||p.visibleDescription!==fin.description))throw Error('Actual cinematic caption stale');
 return{uid,index,viewport:innerWidth,fixture:'Zero-life opponent triggers actual engine roundEnd and matchEnd then existing finisher prompt; scene is rendered by production RAF loop.',actualChoiceName:fin.name,phases};
};
return true;
})()
