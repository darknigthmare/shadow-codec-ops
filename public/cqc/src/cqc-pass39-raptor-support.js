/* Support-only native Raptor adapter. Source-painted bore, fixed axis, authored CQC timing.
 * No global projectile/hero rules are changed; all non-Raptor bridge calls delegate.
 */
(function(root){'use strict';
 const UID='pass19__raptor_mgr',OWNER='pass39-raptor-support',STARTUP=29,ACTIVE=2,RECOVERY=37,TOTAL=STARTUP+ACTIVE+RECOVERY,SPEED=10;
 const CLAW=Object.freeze({startup:12,active:4,recovery:22,range:180,top:180,bottom:50,damage:410});
 const states=new WeakMap(),owned=new WeakSet(),equal=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 let liveState=null,bridge=null,previousDraw=null,shotsEmitted=0,shotsDrawn=0,posesDrawn=0,meleeHits=0,lastEmission=null,lastDraw=null,lastMelee=null;
 const isRaptor=state=>state?.lead?.uid===UID;
 function record(state){let value=states.get(state);if(!value){value={attack:null,lastTick:-1,render:null};states.set(state,value);}return value;}
 function selected(state){return bridge?.selectedLead?.(state.lead)||state.lead;}
 function entryFor(fighter){return root.CQC_COMBAT_SPRITES?.getEntry(UID,fighter);}
 function reviewed(fighter){
  const native=root.CQC_PASS39_RAPTOR_NATIVE,entry=entryFor(fighter);
  return native?.admitted?.()===true&&entry?.uid===UID&&(!fighter.costume||fighter.costume==='original')?entry:null;
 }
 function poseFor(state,attack,forceFire=false){
  const age=state.frame-attack.startFrame,startup=attack.startup,active=attack.active,recovery=attack.recovery,phase=forceFire||age>=startup&&age<startup+active?'active':age<startup?'startup':'recovery';
  const progress=phase==='startup'?age/startup:phase==='active'?Math.max(0,(age-startup)/active):Math.max(0,(age-startup-active)/recovery);
  return{time:state.frame/60,entityKey:state.hero,moveSlot:attack.kind==='claw'?'light':'special',moveKind:attack.kind==='claw'?'melee':'projectile',moveTag:attack.kind==='claw'?'blade':'rocket',attack:true,animationActive:true,attackPhase:phase,phaseProgress:Math.min(1,progress),attackTime:age/60,actionTime:age/60};
 }
 function sourceSample(state,attack,render,pose){
  const fighter=selected(state),entry=reviewed(fighter),sprites=root.CQC_COMBAT_SPRITES;
  if(!entry||!render||![-1,1].includes(attack.face))return null;
  const side=attack.face===1?'right':'left',pin=root.CQC_PASS39_RAPTOR_NATIVE.attachments.sides[side][11];
  const directional=attack.face===entry.facing?entry.actions:entry.oppositeActions;
  const frame=directional&&sprites.selectFrame({...entry,actions:directional},pose)?.frame;
  if(!frame||frame.nativePoseIndex!==11||frame.file!==pin.file||frame.sha256!==pin.sourceSHA256||!equal(frame.rect,pin.rect)||!equal(frame.pivot,pin.pivot))return null;
  if(!sprites.status(UID,{...fighter,action:'deploy',face:attack.face}).ready)return null;
  const physical=root.CQC_PASS19_WORLD_SCALE?.height?.(fighter,{originalPixels:entry.displayHeight});
  const height=physical?.pixels||entry.displayHeight,ratio=physical?.ratio||1,canvasHeight=render.canvas.height||720;
  const maximum=Math.max(24,Math.min(canvasHeight*.84,state.hero.y-canvasHeight*.08));
  const adjusted=height>0?Math.min(render.scale,maximum/height):render.scale;
  const sourceHeight=entry.sourceFrameHeights?.[frame.file]||entry.baseFrameHeight||frame.rect[3];
  const factor=entry.displayHeight/sourceHeight*adjusted*ratio;
  if(!(factor>0)||!Number.isFinite(factor))return null;
  const local=point=>({x:state.hero.x+(point[0]-frame.rect[0]-frame.pivot[0]*frame.rect[2])*factor,y:state.hero.y+(point[1]-frame.rect[1]-frame.pivot[1]*frame.rect[3])*factor});
  const mouth=local(pin.nativePixelPoint),rear=local(pin.nativeRearAxisPoint),dx=mouth.x-rear.x,dy=mouth.y-rear.y,length=Math.hypot(dx,dy);
  if(!(length>0)||dx*attack.face<=0)return null;
  return{fighter,entry,frame,pin,adjusted,ratio,factor,mouth,rear,direction:{x:dx/length,y:dy/length}};
 }
 function clawZone(state,face){const h=state.hero;return{x:face===1?h.x:h.x-CLAW.range,y:h.y-CLAW.top,w:CLAW.range,h:CLAW.top-CLAW.bottom};}
 function clawContact(state,face,enemy){
  if(!(enemy?.life>0))return false;
  const zone=clawZone(state,face),box={x:enemy.x-35,y:enemy.y-160,w:70,h:160};
  return zone.x<box.x+box.w&&zone.x+zone.w>box.x&&zone.y<box.y+box.h&&zone.y+zone.h>box.y;
 }
 function requestShot(state,keys){
  if(!isRaptor(state))return false;
  liveState=state;install();
  const value=record(state),h=state.hero,face=keys?.has?.('ArrowLeft')?-1:1;
  if(value.attack&&state.frame-value.attack.startFrame>=value.attack.total)value.attack=null;
  // Suppress the generic pistol path even while a native source is unavailable.
  if(!h||state.ended||h.life<=0||h.cool>0||value.attack||!reviewed(selected(state)))return true;
  const kind=state.enemies.some(enemy=>clawContact(state,face,enemy))?'claw':'missile';
  if(kind==='missile'&&h.ammo<=0)return true;
  const timing=kind==='claw'?CLAW:{startup:STARTUP,active:ACTIVE,recovery:RECOVERY};
  const total=timing.startup+timing.active+timing.recovery;
  if(kind==='missile')h.ammo--;
  h.cool=total;
  value.attack={kind,startup:timing.startup,active:timing.active,recovery:timing.recovery,total,startFrame:state.frame,face,emitted:false,paintedFire:false,cancelled:false,hitTargets:new WeakSet()};
  return true;
 }
 function update(state){
  if(!isRaptor(state))return false;
  liveState=state;install();const value=record(state);
  if(value.lastTick===state.frame)return true;
  value.lastTick=state.frame;
  const h=state.hero,attack=value.attack;
  if(attack){
   const age=state.frame-attack.startFrame;
   if(state.ended||h.life<=0||h.inv>18){attack.cancelled=true;value.attack=null;}
   else if(age>=attack.total)value.attack=null;
   else if(attack.kind==='claw'&&age>=attack.startup&&age<attack.startup+attack.active){
    for(const enemy of state.enemies)if(!attack.hitTargets.has(enemy)&&clawContact(state,attack.face,enemy)){
     const damage=h.power>0?Math.round(CLAW.damage*360/260):CLAW.damage;
     enemy.life-=damage;enemy.flash=8;attack.hitTargets.add(enemy);meleeHits++;
     lastMelee={frame:state.frame,face:attack.face,damage,enemyX:enemy.x,enemyY:enemy.y,remainingLife:enemy.life,zone:clawZone(state,attack.face),physicalPoseIndex:6};
    }
   }
   else if(attack.kind==='missile'&&age===attack.startup&&!attack.emitted){
    const sample=sourceSample(state,attack,value.render,poseFor(state,attack));
    // A rejected source never falls back to an arbitrary body-relative muzzle.
    if(sample){
     const q={x:sample.mouth.x,y:sample.mouth.y,vx:sample.direction.x*SPEED,vy:sample.direction.y*SPEED,damage:h.power>0?Math.round(760*360/260):760,
      owner:OWNER,age:0,life:100,sourcePoseIndex:11,sourceFile:sample.frame.file,sourceSHA256:sample.frame.sha256,
      sourceRect:[...sample.frame.rect],sourcePivot:[...sample.frame.pivot],sourceMouth:[...sample.pin.nativePixelPoint],sourceRear:[...sample.pin.nativeRearAxisPoint]};
     owned.add(q);state.shots.push(q);attack.emitted=true;shotsEmitted++;
     lastEmission={frame:state.frame,face:attack.face,x:q.x,y:q.y,vx:q.vx,vy:q.vy,speed:Math.hypot(q.vx,q.vy),poseIndex:11,sourceFile:q.sourceFile,sourceSHA256:q.sourceSHA256,sourceRect:q.sourceRect,sourcePivot:q.sourcePivot,ratio:sample.ratio,adjustedScale:sample.adjusted,sourceFactor:sample.factor};
    }
   }
  }
  // The host advances X and resolves collisions once. This hook adds only native Y.
  for(const q of state.shots)if(owned.has(q)){
   q.y+=q.vy;q.age++;q.life--;
   if(q.life<=0||q.x< -64||q.x>1364||q.y< -64||q.y>784)q.hit=true;
  }
  return true;
 }
 function drawShot(ctx,q){
  if(!owned.has(q))return false;
  if(q.hit)return true;
  ctx.save();
  try{
   ctx.translate(q.x,q.y);ctx.rotate(Math.atan2(q.vy,q.vx));
   ctx.fillStyle='#b9c3b7';ctx.strokeStyle='#172223';ctx.lineWidth=1.2;
   ctx.beginPath();ctx.moveTo(10,0);ctx.lineTo(5,-3);ctx.lineTo(-10,-3);ctx.lineTo(-10,3);ctx.lineTo(5,3);ctx.closePath();ctx.fill();ctx.stroke();
   ctx.fillStyle='#596b61';ctx.beginPath();ctx.moveTo(-6,-2);ctx.lineTo(-12,-6);ctx.lineTo(-10,0);ctx.lineTo(-12,6);ctx.lineTo(-6,2);ctx.closePath();ctx.fill();
   ctx.fillStyle='#ffc66a';ctx.beginPath();ctx.moveTo(-10,-2);ctx.lineTo(-19-(q.age%3)*2,0);ctx.lineTo(-10,2);ctx.closePath();ctx.fill();
  }finally{ctx.restore();}
  shotsDrawn++;return true;
 }
 function install(){
  const current=root.CQC_SUPPORT_NATIVE_ACTORS;
  if(!current?.drawLead||current===bridge)return !!bridge;
  bridge=current;previousDraw=current.drawLead;
  current.drawLead=function(ctx,fighter,x,y,face,scale,pose={}){
   const state=liveState;
   if(fighter?.uid!==UID||!isRaptor(state)||ctx?.canvas?.id!=='gameCanvas'||state.hero.x!==x||state.hero.y!==y)return previousDraw.apply(this,arguments);
   const value=record(state);value.render={canvas:ctx.canvas,scale};
   const attack=value.attack;
   if(!attack||attack.cancelled||pose.hit||state.hero.life<=0)return previousDraw.apply(this,arguments);
   const entry=reviewed(selected(state));if(!entry)return false;
   const age=state.frame-attack.startFrame;
   if(age<0||age>=attack.total)return previousDraw.apply(this,arguments);
   // Preserve the existing active pose for one paint if a RAF batch skips its two ticks.
   const deferFire=attack.emitted&&!attack.paintedFire&&age>=attack.startup;
   const nativePose=poseFor(state,attack,deferFire),fighterSelected=selected(state);
   const physical=root.CQC_PASS19_WORLD_SCALE?.height?.(fighterSelected,{originalPixels:entry.displayHeight});
   const height=physical?.pixels||entry.displayHeight,canvasHeight=ctx.canvas.height||720;
   const maximum=Math.max(24,Math.min(canvasHeight*.84,y-canvasHeight*.08));
   const adjusted=height>0?Math.min(scale,maximum/height):scale;
   const drawn=root.CQC_COMBAT_SPRITES.draw(ctx,fighterSelected,x,y,attack.face,adjusted,nativePose)===true;
   if(drawn){posesDrawn++;if(nativePose.attackPhase==='active')attack.paintedFire=true;
    lastDraw={frame:state.frame,face:attack.face,phase:nativePose.attackPhase,kind:attack.kind,scale:adjusted,deferredActive:deferFire&&age>=attack.startup+attack.active};}
   return drawn;
  };
  return true;
 }
 function diagnostics(){return{schema:'cqc.pass39.raptor-support/1',uid:UID,installed:!!bridge,startup:STARTUP,active:ACTIVE,recovery:RECOVERY,speed:SPEED,shotsEmitted,shotsDrawn,posesDrawn,meleeHits,lastEmission,lastDraw,lastMelee,claw:{...CLAW,ammoCost:0,hitPolicy:'once per enemy per attack; authored swept forearm-contact volume'},
  scope:'Support operation only; generated/adapted native whole poses and authored CQC timings. Nearby ground targets receive the forearm-claw sweep (not projectile aim); distant missiles preserve the painted dorsal bore and may pass above ground humans.',targetTracking:false,sourcePixelsEdited:false};}
 if(root.CQC_PASS39_RAPTOR_SUPPORT)throw Error('Duplicate native Raptor Support adapter');
 root.CQC_PASS39_RAPTOR_SUPPORT=Object.freeze({uid:UID,requestShot,update,drawShot,install,diagnostics});install();
})(globalThis);
