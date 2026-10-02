/* PASS7 browser-only observers. No production source is changed by this harness. */
(()=>{
if(window.__p7Installed)return true;
const API=window.__CQC055Versus,HELPER=window.CQC_PASS7_COMBAT_FIDELITY;
if(!API?.engine||!HELPER||!window.CQC_PASS7_NATIVE_ORIGINS)throw Error('Final PASS7 runtime hooks absent');
window.__p7Installed=true;window.__p7Draws=[];window.__p7ProjectileDraws=[];window.__p7CloudDraws=[];window.__p7FinisherEffects=[];
const boundedPush=(a,v)=>{a.push(v);if(a.length>1000)a.splice(0,a.length-1000)};
const sprite=window.CQC_COMBAT_SPRITES,originalDraw=sprite.draw;
sprite.draw=function(...args){const c=args[0],old=c.drawImage;let crop=null,ok;
 c.drawImage=function(img,...r){const t=c.getTransform();crop={file:img.src.slice(img.src.indexOf('assets/')),source:r.slice(0,4),destination:r.slice(4),matrix:[t.a,t.b,t.c,t.d,t.e,t.f],alpha:c.globalAlpha};return old.call(this,img,...r)};
 try{ok=originalDraw(...args)}finally{c.drawImage=old}
 boundedPush(window.__p7Draws,{uid:args[1]?.uid,actorCanvas:[args[2],args[3]],face:args[4],scale:args[5],pose:args[6],ok,crop});return ok;
};
// This production hook sees every visible projectile before its native/fallback rendering.
const projectileArt=window.CQC_PASS4_PROJECTILE_ART,oldProjectileDraw=projectileArt?.draw;
if(!oldProjectileDraw)throw Error('Historical projectile draw hook absent');
projectileArt.draw=function(c,q,z){const t=c.getTransform();boundedPush(window.__p7ProjectileDraws,{id:q.id,uid:q.uid||q.f?.uid,owner:q.owner,kind:q.kind,slot:q.def?.slot,center:[t.e,t.f],zoom:z,x:q.x,y:q.y});return oldProjectileDraw(c,q,z)};
const oldCloudDraw=HELPER.drawChaff;
HELPER.drawChaff=function(c,s,...args){const oldArc=c.arc,oldRect=c.fillRect,arcs=[],rects=[];let ok;
 c.arc=function(...r){arcs.push(r);return oldArc.call(this,...r)};c.fillRect=function(...r){rects.push(r);return oldRect.call(this,...r)};
 try{ok=oldCloudDraw(c,s,...args)}finally{c.arc=oldArc;c.fillRect=oldRect}
 boundedPush(window.__p7CloudDraws,{ok,fieldCount:s.pass7Chaff?.fields.length||0,arcs,rects});return ok;
};
const oldFinisherDraw=HELPER.drawFinisher;if(!oldFinisherDraw)throw Error('Final PASS7 source-aware finisher draw hook absent');
HELPER.drawFinisher=function(c,scene){const oldArc=c.arc,oldRect=c.fillRect,oldMove=c.moveTo,oldLine=c.lineTo,arcs=[],rects=[],moves=[],lines=[];let ok;
 c.arc=function(...r){arcs.push(r);return oldArc.call(this,...r)};c.fillRect=function(...r){rects.push(r);return oldRect.call(this,...r)};c.moveTo=function(...r){moves.push(r);return oldMove.call(this,...r)};c.lineTo=function(...r){lines.push(r);return oldLine.call(this,...r)};
 try{ok=oldFinisherDraw(c,scene)}finally{c.arc=oldArc;c.fillRect=oldRect;c.moveTo=oldMove;c.lineTo=oldLine}
 boundedPush(window.__p7FinisherEffects,{ok,uid:scene?.uid,phase:scene?.phase,finisherSlot:scene?.fin?.slot,arcs,rects,moves,lines});return ok;
};
window.__p7Step=(s,n=1,inputA=null,inputB=null)=>{for(let i=0;i<n;i++)API.engine.step(s,[inputA||API.engine.empty(),inputB||API.engine.empty()]);return s};
window.__p7Start=(uid,face=1,p2='core__snake',stage='shadow_heliport')=>{
 API.startExternal({p1:uid,p2,stage,mode:'training',dummy:'idle',autoheal:false,freeResource:false,rounds:1,seconds:99,finishers:'off',source:'pass7-browser-qa'});
 API.pause(true);API.resetDojo();document.querySelector('#pause43').classList.add('hidden');const s=API.getState();
 s.options.freeMeter=false;s.options.freeResource=false;s.options.autoheal=false;s.a.x=face===1?300:980;s.b.x=face===1?980:300;s.a.face=face;s.b.face=-face;
 for(const p of[s.a,s.b]){p.ai=false;p.vx=p.vy=p.kx=0;p.meter=100;p.cool=0;p.cooldowns={}}
 if(uid==='core__raven')s.a.r=0;return s;
};
window.__p7Idle=(uid,face)=>{
 const s=window.__p7Start(uid,face);window.__p7Draws=[];API.draw();const d=window.__p7Draws.find(x=>x.uid===uid),e=window.CQC_COMBAT_SPRITE_CATALOG.entries[uid],group=(face===e.facing?e.actions:e.oppositeActions).idle;
 if(!d?.ok||!d.crop||d.face!==face||d.crop.matrix[0]<=0)throw Error('Independent native idle absent '+uid);
 const f=group.frames.find(f=>f.file===d.crop.file&&JSON.stringify(f.rect)===JSON.stringify(d.crop.source));if(!f)throw Error('Native idle source crop mismatch '+uid);
 return{uid,face,viewport:innerWidth,nativeImageUsed:true,sourceFile:f.file,sourceSHA:f.sha256,sourceRect:f.rect,pivot:f.pivot,canvasMatrix:d.crop.matrix};
};
window.__p7Phase=(uid,face,slot,phase)=>{
 const s=window.__p7Start(uid,face),m=s.a.f.combat.moves[slot],e=window.CQC_COMBAT_SPRITE_CATALOG.entries[uid];
 if(!API.engine.start(s,s.a,slot))throw Error('Native phase action refused '+[uid,face,slot,phase]);
 const frames=phase==='startup'?Math.max(1,m.startup-1):phase==='active'?m.startup:m.startup+m.active;
 window.__p7Step(s,frames);window.__p7Draws=[];API.draw();const d=window.__p7Draws.find(x=>x.uid===uid),action=e.actionMap?.[slot],group=(face===e.facing?e.actions:e.oppositeActions)[action];
 if(!d?.ok||!d.crop||d.crop.matrix[0]<=0||!group||d.pose.moveSlot!==slot||d.pose.attackPhase!==phase)throw Error('Native action phase mismatch '+JSON.stringify({uid,face,slot,phase,d,action}));
 const frame=group.frames.find(f=>f.file===d.crop.file&&JSON.stringify(f.rect)===JSON.stringify(d.crop.source));if(!frame)throw Error('Native phase crop not in source catalog');
 return{uid,face,slot,phase,frames,action,sourceFile:frame.file,sourceSHA:frame.sha256,sourceRect:frame.rect,pivot:frame.pivot,canvasMatrix:d.crop.matrix};
};
window.__p7Origin=(uid,face,slot)=>{
 const s=window.__p7Start(uid,face),m=s.a.f.combat.moves[slot],action=HELPER.slots[uid]&&Object.keys(HELPER.slots[uid]).find(a=>HELPER.slots[uid][a].includes(slot)),mark=window.CQC_PASS7_NATIVE_ORIGINS[uid]?.[action]?.[face===1?'right':'left'];
 if(!mark)throw Error('Frozen native origin absent '+[uid,face,slot,action]);
 const before={resource:s.a.r,meter:s.a.meter};if(!API.engine.start(s,s.a,slot))throw Error('Origin action refused');const afterStart={resource:s.a.r,meter:s.a.meter};window.__p7Step(s,m.startup);
 const q=(m.kind==='chaff'?HELPER.chaffProjectiles(s):s.projectiles).find(q=>!q.delay&&!q.dead);if(!q)throw Error('Real first-active projectile absent');
 const immutable=JSON.stringify(q);window.__p7Draws=[];window.__p7ProjectileDraws=[];API.draw();const d=window.__p7Draws.find(d=>d.uid===uid),render=window.__p7ProjectileDraws.find(p=>p.id===q.id);
 if(!d?.ok||!d.crop||!render)throw Error('Body/projectile actual Canvas draw absent');
 const e=window.CQC_COMBAT_SPRITE_CATALOG.entries[uid],frame=(face===e.facing?e.actions:e.oppositeActions)[mark.action].frames[mark.frame];
 if(d.crop.file!==mark.file||frame.sha256!==mark.sha256||JSON.stringify(d.crop.source)!==JSON.stringify(frame.rect)||d.pose.attackPhase!=='active'||d.crop.matrix[0]<=0)throw Error('First-active native source/SHA mismatch');
 const[sx,sy,sw,sh]=d.crop.source,[dx,dy,dw,dh]=d.crop.destination,[a,b,c,dd,tx,ty]=d.crop.matrix,lx=dx+(mark.point[0]-sx)*dw/sw,ly=dy+(mark.point[1]-sy)*dh/sh;
 const origin=[a*lx+c*ly+tx,b*lx+dd*ly+ty],zoom=d.scale/1.12,expected=[origin[0]+q.vx*zoom,origin[1]+(m.vy||0)*zoom],residual=Math.hypot(render.center[0]-expected[0],render.center[1]-expected[1]);
 if(residual>.01)throw Error('Native launch origin Canvas residual '+JSON.stringify({uid,face,slot,origin,expected,actual:render.center,residual}));
 if(JSON.stringify(q)!==immutable)throw Error('Drawing mutated real projectile physics');
 return{uid,face,slot,action,viewport:innerWidth,sourceFile:frame.file,sourceSHA:frame.sha256,sourceRect:frame.rect,sourcePoint:mark.point,nativeOriginCanvas:origin,actualProjectileCanvas:render.center,pixelResidual:residual,before,afterStart,projectileCount:m.kind==='chaff'?HELPER.chaffProjectiles(s).length:s.projectiles.length,q:JSON.parse(immutable)};
};
window.__p7Contact=(uid,face,slot,crouch)=>{
 const s=window.__p7Start(uid,face),m=s.a.f.combat.moves[slot],input={...API.engine.empty(),down:crouch};s.b.x=s.a.x+face*320;const life=s.b.life;
 window.__p7Step(s,1,null,input);s.a.face=face;if(!API.engine.start(s,s.a,slot))throw Error('Contact action refused');let frames=0,seen=false,first=null;
 while(frames<m.startup+(m.life||130)+8){window.__p7Step(s,1,null,input);frames++;const q=s.projectiles.find(q=>!q.delay);seen||=!!q;if(q&&!first)first={x:q.x,y:q.y,vx:q.vx,vy:q.vy,box:API.engine.box(s.b)};if(s.b.life<life)break}
 if(!seen||!crouch&&s.b.life===life)throw Error('Actual standing projectile missed '+JSON.stringify({uid,face,slot,crouch,first}));API.draw();
 return{uid,face,slot,crouch,frames,hit:s.b.life<life,damage:life-s.b.life,first,finalBox:API.engine.box(s.b),statuses:JSON.parse(JSON.stringify(s.b.statuses))};
};
window.__p7RavenHeat=()=>{
 const denied=window.__p7Start('core__raven');denied.a.r=53;const refusal=API.engine.start(denied,denied.a,'super');if(refusal||denied.a.r!==53||denied.a.meter!==100)throw Error('Raven heat ceiling did not refuse complete salvo');
 const s=window.__p7Start('core__raven');s.a.r=52;if(!API.engine.start(s,s.a,'super')||s.a.r!==100||s.a.meter!==50)throw Error('Raven eight-shot budget not paid');window.__p7Step(s,s.a.f.combat.moves.super.startup);
 if(s.projectiles.length!==8||s.projectiles.some(q=>q.def.tag!=='ballistic')||s.a.r!==100)throw Error('Raven full salvo count/heat not bounded');const firingHeat=s.a.r;
 window.__p7Step(s,180);if(!(s.a.r<firingHeat&&s.a.r>=0))throw Error('Raven does not cool after recovery');return{refusedAt53:true,acceptedAt52:true,fullCost:48,meterCost:50,projectiles:8,firingHeat,heatAfterCooling:s.a.r};
};
window.__p7QuietAmmo=()=>{
 const rows=[];for(const slot of['special','specialDown','super']){
  const no=window.__p7Start('core__quiet');no.a.r=0;if(API.engine.start(no,no.a,slot)||no.a.r!==0||no.a.meter!==100)throw Error('Quiet empty reserve fired '+slot);
  const s=window.__p7Start('core__quiet');s.a.r=1;if(!API.engine.start(s,s.a,slot)||s.a.r!==0||s.a.meter!==(slot==='super'?50:100))throw Error('Quiet real cartridge/meter not paid '+slot);
  window.__p7Step(s,s.a.f.combat.moves[slot].startup);if(s.projectiles.length!==1||s.projectiles[0].def.tag!=='precision'||s.projectiles[0].kind==='rail')throw Error('Quiet unsupported rail/mental projectile');rows.push({slot,emptyRefused:true,lastRoundConsumed:true,tag:s.projectiles[0].def.tag,meter:s.a.meter});
 }
 const reload=window.__p7Start('core__quiet');reload.a.r=0;const startup=reload.a.f.combat.moves.utility.startup;if(!API.engine.start(reload,reload.a,'utility'))throw Error('Quiet reload refused');window.__p7Step(reload,startup-1);if(reload.a.r!==0)throw Error('Quiet reload restored ammunition before completion');window.__p7Step(reload,1);if(reload.a.r!==5)throw Error('Quiet reserve not exactly five');window.__p7Step(reload,90);if(reload.a.r!==5)throw Error('Quiet reserve unbounded');
 return{shots:rows,reloadStartup:startup,reserve:5,noPrematureReload:true};
};
window.__p7QuietInterruptedReload=(face)=>{
 const s=window.__p7Start('core__quiet',face);s.a.r=0;s.b.x=s.a.x+face*140;s.b.face=-face;const m=s.a.f.combat.moves.utility;
 if(!API.engine.start(s,s.a,'utility')||!API.engine.start(s,s.b,'special'))throw Error('Quiet real interruption setup refused');const life=s.a.life;let interrupted=null;
 for(let i=0;i<m.startup;i++){window.__p7Step(s);if(s.a.life<life&&!s.a.attack){interrupted={frame:s.frame,resource:s.a.r,damage:life-s.a.life};break}}
 if(!interrupted||interrupted.frame>=m.startup)throw Error('Enemy projectile did not interrupt Quiet before reload');window.__p7Step(s,m.startup+90);if(s.a.r!==0||s.events.some(e=>e.type==='reload'&&e.actor===0))throw Error('Interrupted Quiet reload granted cartridges');API.draw();
 return{face,actualProjectileInterruption:interrupted,finalAmmo:s.a.r,reloadEvents:s.events.filter(e=>e.type==='reload')};
};
window.__p7QuietMovement=()=>{
 const s=window.__p7Start('core__quiet'),x=s.a.x;if(!API.engine.start(s,s.a,'specialBack'))throw Error('Quiet movement refused');window.__p7Step(s,s.a.f.combat.moves.specialBack.startup);
 if(s.a.x===x||Math.abs(s.a.x-x)>210||s.a.x<65||s.a.x>1215||s.projectiles.length||s.fx.some(e=>e.tag==='psychic')||!s.fx.some(e=>e.kind==='ring'&&e.tag==='movement'))throw Error('Quiet movement scope not bounded/source-neutral');
 return{beforeX:x,afterX:s.a.x,projectiles:s.projectiles.length,neutralMovementRing:true};
};
window.__p7OldCloak=(face)=>{
 const s=window.__p7Start('core__old_snake',face),m=s.a.f.combat.moves.specialBack,body=JSON.stringify(API.engine.box(s.a));if(!API.engine.start(s,s.a,'specialBack'))throw Error('OctoCamo state refused');window.__p7Step(s,m.startup);
 window.__p7Draws=[];API.draw();const d=window.__p7Draws.find(d=>d.uid==='core__old_snake');if(!s.a.buffs.cloak||HELPER.cloakAlpha(s.a.f.uid)!==1||d?.crop?.alpha!==1||JSON.stringify(API.engine.box(s.a))!==body)throw Error('OctoCamo became transparent or lost collision');
 window.__p7Step(s,m.active+m.recovery+1);if(!API.engine.start(s,s.a,'special')||s.a.buffs.cloak)throw Error('Offensive Mk2 action did not reveal Old Snake');
 const contact=window.__p7Start('core__old_snake',face);if(!API.engine.start(contact,contact.a,'specialBack'))throw Error('Contact cloak setup refused');window.__p7Step(contact,m.startup);contact.b.x=contact.a.x+face*140;contact.b.face=-face;const life=contact.a.life;
 if(!API.engine.start(contact,contact.b,'special'))throw Error('Real cloak collision projectile refused');window.__p7Step(contact,65);if(contact.a.life===life||contact.a.buffs.cloak)throw Error('Opaque cloaked Old Snake escaped actual projectile collision');
 return{face,actualDrawAlpha:d.crop.alpha,collisionBodyStable:true,offensiveActionReveals:true,actualEnemyDamage:life-contact.a.life,incomingImpactReveals:true};
};
window.__p7Chaff=(face,enemy='core__snake',guarding=false)=>{
 const s=window.__p7Start('core__old_snake',face,enemy),m=s.a.f.combat.moves.specialDown,input=guarding?{...API.engine.empty(),guard:true,down:true}:null;
 if(!API.engine.start(s,s.a,'specialDown'))throw Error('Chaff throw refused');window.__p7Step(s,m.startup+60,null,input);const q=HELPER.chaffProjectiles(s)[0];if(!q||q.age!==61)throw Error('Real Chaff grenade not present immediately before fuse');
 s.b.x=q.x+q.vx;s.b.y=568;s.b.face=-face;const life=s.b.life,guard=s.b.guard;window.__p7Step(s,1,null,input);const field=s.pass7Chaff?.fields[0];if(!field||field.life>120)throw Error('Real visible Chaff fuse did not disperse');
 window.__p7CloudDraws=[];API.draw();const draw=window.__p7CloudDraws.find(d=>d.ok&&d.fieldCount);if(!draw?.arcs.length||draw.rects.length!==18)throw Error('Chaff cloud not drawn by production Canvas hook');
 const mechanical=!!(s.b.f.combat.passive.machine||s.b.f.visual?.kind==='machine');
 if(s.b.life!==life||s.b.hit||s.b.blockstun||s.b.statuses.marked||s.events.some(e=>['explosion','damage','block','emp'].includes(e.type)))throw Error('Chaff injured/marked/guard-chipped a target');
 const electronics=s.events.filter(e=>e.type==='chaffElectronics');if(mechanical){if(s.b.statuses.pass7Chaff?.t!==90||electronics.length!==1||Math.abs(electronics[0].resourceBefore-electronics[0].resourceAfter)!==10)throw Error('Machine Chaff scope/resource budget invalid');}
 else if(s.b.statuses.pass7Chaff||electronics.length)throw Error('Human was treated as electronic equipment');
 const initial={life:s.b.life,guard:s.b.guard,status:JSON.parse(JSON.stringify(s.b.statuses)),electronics,field:{x:field.x,y:field.y,radius:field.radius,life:field.life},actualCanvasDraw:draw};
 if(mechanical){
  const r=s.b.r,meter=s.b.meter;if(API.engine.start(s,s.b,'specialDown')||s.b.r!==r||s.b.meter!==meter)throw Error('Guided machine fire not denied without payment');
  window.__p7Step(s,1,null,{...API.engine.empty(),slot:'specialDown'});if(s.b.attack)throw Error('Guided machine ordinary input bypassed Chaff');
  const x=s.b.x;window.__p7Step(s,10,null,{...API.engine.empty(),guard:true,right:face===1,left:face===-1});if(s.b.x===x||!s.b.block||s.b.life!==life)throw Error('Chaff disabled ordinary guard/mobility');
  if(!API.engine.start(s,s.b,'light'))throw Error('Chaff disabled basic machine melee');window.__p7Step(s,91);if(s.b.statuses.pass7Chaff||s.events.filter(e=>e.type==='chaffElectronics').length!==1)throw Error('Chaff sensor duration renewed/unbounded');
  if(!API.engine.start(s,s.b,'specialDown'))throw Error('Expired Chaff still denies guided fire');window.__p7Step(s,30);
 }else{
  window.__p7Step(s,30,null,input);if(s.b.life!==life||s.b.guard<guard)throw Error('Chaff damaged human guard');const ammo=s.b.r;if(!API.engine.start(s,s.b,'special')||s.b.r!==ammo-s.b.f.combat.moves.special.cost)throw Error('Chaff disabled ordinary human rifle');
  window.__p7Step(s,100);
 }
 if(s.pass7Chaff?.fields.length)throw Error('Chaff cloud lifetime unbounded');const end={life:s.b.life,status:JSON.parse(JSON.stringify(s.b.statuses)),fieldCount:s.pass7Chaff?.fields.length||0};API.engine.reset(s);if(s.pass7Chaff||s.b.statuses.pass7Chaff)throw Error('Round reset retained Chaff');
 return{face,enemy,guarding,mechanical,noHumanDamageOrGuardChip:true,initial,end,roundResetClearsState:true};
};
window.__p7ChaffInterrupted=(face)=>{
 const denied=window.__p7Start('core__old_snake',face);denied.a.r=1;if(API.engine.start(denied,denied.a,'specialDown')||denied.a.r!==1)throw Error('Chaff requires two actual consumables');
 const s=window.__p7Start('core__old_snake',face);s.b.x=s.a.x+face*140;s.b.face=-face;const initial=s.a.r;
 if(!API.engine.start(s,s.a,'specialDown')||!API.engine.start(s,s.b,'special'))throw Error('Chaff interruption setup refused');window.__p7Step(s,90);
 if(s.a.life===10000||s.a.r!==initial-2||HELPER.chaffProjectiles(s).length||s.pass7Chaff?.fields.length||s.events.some(e=>e.type==='chaffDispersed'))throw Error('Hit before Chaff activation created a grenade/cloud');
 return{face,oneConsumableRefused:true,twoConsumablesSpent:true,actualEnemyDamage:10000-s.a.life,grenades:HELPER.chaffProjectiles(s).length,clouds:s.pass7Chaff?.fields.length||0};
};
window.__p7SkullSimulation=(face,slot)=>{
 const s=window.__p7Start('archive__skull_face',face);s.b.x=s.a.x+face*140;const m=s.a.f.combat.moves[slot],life=s.b.life;
 if(s.a.f.visual.weapon!=='fists'||s.a.f.combat.weapon!=='fists'||s.a.f.combat.resource.kind!=='stamina'||Object.values(s.a.f.combat.moves).some(m=>m.kind==='projectile'))throw Error('Unsupported Skull Face personal firearm');
 if(!API.engine.start(s,s.a,slot))throw Error('Declared unarmed simulation refused');const paid={resource:s.a.r,meter:s.a.meter};window.__p7Step(s,m.startup);
 if(slot==='special'&&(!s.b.statuses.marked||s.b.life!==life))throw Error('Command designation is not bounded non-damaging mark');
 if(slot==='specialDown'&&(s.a.buffs.armor?.hits!==1||s.a.buffs.armor?.t>90))throw Error('Command brace not one-hit/finite');
 if(slot==='specialForward'||slot==='super')window.__p7Step(s,m.active);
 if((slot==='specialForward'||slot==='super')&&s.b.life===life)throw Error('Unarmed Skull simulation made no real melee contact');
 if(slot==='super'&&(paid.resource!==70||paid.meter!==50))throw Error('Skull CQC super effort/meter not paid');
 if(s.projectiles.length||HELPER.chaffProjectiles(s).length||s.events.some(e=>['projectile','explosion','reload'].includes(e.type))||s.fx.some(e=>['psychic','rail','fire','swarm'].includes(e.tag)))throw Error('Skull Face simulation produced phantom weapon or mental power');
 window.__p7Draws=[];API.draw();const d=window.__p7Draws.find(d=>d.uid==='archive__skull_face');if(!d?.ok||d.crop.matrix[0]<=0)throw Error('Unarmed simulation did not draw independent native body');
 return{face,slot,kind:m.kind,paid,actualDamage:life-s.b.life,nativeDraw:d,noProjectiles:true,status:JSON.parse(JSON.stringify(s.b.statuses)),armor:s.a.buffs.armor||null,declaredScope:s.a.f.combat.scope};
};
window.__p7SkullBrace=(face)=>{
 const baseline=window.__p7Start('archive__skull_face',face);baseline.b.x=baseline.a.x+face*100;baseline.b.face=-face;if(!API.engine.start(baseline,baseline.b,'heavy'))throw Error('Skull baseline incoming melee refused');const firstLife=baseline.a.life;window.__p7Step(baseline,60);const ordinaryDamage=firstLife-baseline.a.life;if(ordinaryDamage<=0)throw Error('Baseline heavy made no human contact');
 const s=window.__p7Start('archive__skull_face',face);s.b.x=s.a.x+face*100;s.b.face=-face;const m=s.a.f.combat.moves.specialDown;if(!API.engine.start(s,s.a,'specialDown'))throw Error('Skull brace refused');window.__p7Step(s,m.startup);if(s.a.buffs.armor?.hits!==1)throw Error('Skull brace grants multiple armor hits');
 const life=s.a.life;if(!API.engine.start(s,s.b,'heavy'))throw Error('Skull braced incoming melee refused');window.__p7Step(s,60);const reducedDamage=life-s.a.life;if(!(reducedDamage>0&&reducedDamage<ordinaryDamage)||s.a.buffs.armor||s.events.filter(e=>e.type==='armor'&&e.actor===0).length!==1)throw Error('Skull brace did not absorb exactly one real strike');
 const after=s.a.life;if(!API.engine.start(s,s.b,'heavy'))throw Error('Second incoming melee refused');window.__p7Step(s,60);const nextDamage=after-s.a.life;if(nextDamage!==ordinaryDamage||s.events.filter(e=>e.type==='armor'&&e.actor===0).length!==1)throw Error('Skull brace protected more than one actual strike');
 if(s.projectiles.length||s.events.some(e=>['projectile','explosion'].includes(e.type)))throw Error('Skull brace created phantom weapon');API.draw();return{face,ordinaryDamage,reducedDamage,nextDamage,actualAbsorbedStrikes:1,armorExpired:true,noProjectiles:true};
};
window.__p7FinishersCatalogue=()=>{
 const rows=[];for(const uid of HELPER.reviewedUIDs){
  const base=window.__p7BaselineFinishers?.[uid],p=API.finishers.profiles[uid];if(!base||p.finishers.length!==4)throw Error('Frozen four-choice finisher baseline absent');window.__p7Start(uid);document.querySelector('#finishFight46').click();const visible=[...document.querySelectorAll('#finishList46 .finish-row46')].map(e=>e.innerText);
  for(let i=0;i<4;i++){const a=base.finishers[i],f=p.finishers[i];for(const key of['id','duration','slot','commandP1','commandP2'])if(JSON.stringify(f[key])!==JSON.stringify(a[key]))throw Error('Historical finisher identity changed '+[uid,i,key]);
   if(f.canonical!==false||uid==='archive__skull_face'&&f.evidence!=='simulation'||!visible.some(t=>t.includes(f.name)&&t.includes(f.description)))throw Error('Adapted finisher scope/text not visible');
   if(f.family==='psychic'||f.phases.some(p=>['lift','orbit','psychic'].includes(p)))throw Error('Original incarnation finisher claims unsupported mental power');
  }
  document.querySelector('#finishClose46').click();rows.push({uid,profile:p,visible});
 }
 return{identitiesCommandsDurationsPreserved:16,actualFourChoiceModals:rows};
};
window.__p7FinisherScene=async(uid,index)=>{
 const profile=API.finishers.profiles[uid],fin=profile.finishers[index];API.startExternal({p1:uid,p2:'core__snake',stage:'shadow_heliport',mode:'local',rounds:1,seconds:99,finishers:'stylized',source:'pass7-finisher-browser-qa'});API.pause(true);document.querySelector('#pause43').classList.add('hidden');const s=API.getState();s.phase='fight';s.a.ai=s.b.ai=false;API.draw();s.b.life=0;
 for(let i=0;i<100&&!API.diagnostics().finishWindow;i++){API.pause(false);API.advance(1000/60);API.pause(true);document.querySelector('#pause43').classList.add('hidden')}
 if(!API.diagnostics().finishWindow||s.winner!==0)throw Error('Actual round-end finisher prompt absent');const button=document.querySelector('#finishOptions46 [data-fin="'+index+'"]');if(!button||!button.innerText.includes(fin.name))throw Error('Actual finisher choice absent');button.click();if(!API.diagnostics().finishScene)throw Error('Real finisher scene did not start');
 const phases=[];let elapsed=0;for(let i=0;i<fin.phases.length;i++){
  const target=fin.duration*(i+.5)/fin.phases.length;API.pause(false);API.advance((target-elapsed)*1000/60);API.pause(true);document.querySelector('#pause43').classList.add('hidden');elapsed=target;window.__p7Draws=[];window.__p7FinisherEffects=[];await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
  const phase=document.querySelector('#finisherPhase46').textContent.toLowerCase(),winner=window.__p7Draws.find(d=>d.uid===uid),victim=window.__p7Draws.find(d=>d.uid==='core__snake');
  if(phase!==fin.phases[i]||!winner?.ok||!winner.crop||!victim||winner.crop.matrix[0]<=0||victim.actorCanvas[1]<568||!winner.pose.finisherUid)throw Error('Actual source-bound finisher phase/native pose/grounded victim missing '+JSON.stringify({uid,index,phase,winner,victim}));
  if(document.querySelector('#finisherName46').textContent!==fin.name||document.querySelector('#finisherDesc46').textContent!==fin.description)throw Error('Finisher visible caption stale');
  const effect=window.__p7FinisherEffects.find(e=>e.uid===uid&&e.phase===phase);if(!effect?.ok||effect.arcs.length)throw Error('Source-aware neutral finisher did not bypass generic mental aura');
  if(uid==='archive__skull_face'&&(effect.rects.length||effect.moves.length||effect.lines.length))throw Error('Unarmed Skull Face finisher generated invented gun or mental effect');
  phases.push({phase,winner,victim,effect,visibleName:fin.name,visibleDescription:fin.description});
 }
 return{uid,index,viewport:innerWidth,fixture:'Zero-life target triggers production engine KO and the real finisher button; production RAF draws every phase.',phases};
};
return true;
})()
