/* Proposed Support-only Skull hand-release and debris. Fresh mode/code review required. */
(function(root){
 'use strict';
 if(!/(^|\/)modules\/support-network-v053\.html$/.test(root.location?.pathname||''))return;
 const mode=root.CQC_PASS40_SUPPORT_SKULL_MODE;
 if(typeof mode?.owns!=='function'||typeof root.CQC_PASS40_NATIVE_ORIGINS?.sourcePoint!=='function'||!/^[a-f0-9]{64}$/.test(mode.modeReviewSHA256||''))throw Error('Reviewed Support Skull source mode is required');
 const states=new WeakMap(),ownedShots=new WeakMap(),same=(a,b)=>JSON.stringify(a)===JSON.stringify(b),finite=Number.isFinite;
 let bridge=null,router=null,live=null,requests=0,emissions=0,draws=0,blocked=0,lastEmission=null;
 function configuration(state){const fighter=bridge?.selectedLead?.(state?.lead);return fighter?.uid==='core__skull_armor'&&fighter.costume==='retro-msx'?{fighter,slot:'special',tag:'debris'}:null;}
 function record(state){let value=states.get(state);if(!value){value={pending:null,attack:null,lastTick:-1};states.set(state,value);}return value;}
 function pose(state,config){return{entityKey:state.hero,time:state.frame/60,moveSlot:config.slot,moveKind:'projectile',moveTag:'debris',attack:true,animationActive:true,attackPhase:'active',phaseProgress:0,attackTime:0,actionTime:0};}
 function source(state,config){
  if(!mode.owns(config.fighter))return null;
  const sprites=root.CQC_COMBAT_SPRITES,entry=sprites?.getEntry?.(config.fighter.uid,config.fighter);
  const anchor=root.CQC_PASS40_NATIVE_ORIGINS.sourcePoint(config.fighter.uid,config.fighter.costume,'right','special','debris');
  if(!entry||!anchor||entry.supportModeVariant?.engine!=='support'||entry.supportModeVariant.selectionJobSHA256!==mode.selectionJobSHA256||typeof bridge?.leadScale!=='function')return null;
  const actions=entry.facing===1?entry.actions:entry.oppositeActions;if(!actions)return null;
  const selected=sprites.selectFrame({...entry,actions},pose(state,config)),frame=selected?.frame;
  if(!frame||frame.physicalPoseIndex!==11||selected.action!=='deploy'||selected.action!==anchor.selectedAction||selected.index!==anchor.selectedFrameIndex||anchor.sourceSocket!=='hand-release'||frame.file!==anchor.sourceFile||frame.sha256!==anchor.sourceSHA256||!same(frame.rect,anchor.sourceRect)||!same(frame.pivot,anchor.sourcePivot))return null;
  if(sprites.status(config.fighter.uid,{...config.fighter,face:1,action:'deploy'}).ready!==true)return null;
  return{entry,anchor};
 }
 function project(state,config,native,context,scale){
  const {entry,anchor}=native,height=entry.sourceFrameHeights?.[anchor.sourceFile],adjusted=bridge.leadScale(config.fighter,context,state.hero.y,scale),ratio=root.CQC_PASS19_WORLD_SCALE?.height?.(config.fighter)?.ratio;
  const factor=entry.displayHeight/height*adjusted*ratio,rect=anchor.sourceRect,pivot=anchor.sourcePivot;if(!finite(factor)||factor<=0)return null;
  const x=state.hero.x+(anchor.sourceNativeXY[0]-rect[0]-pivot[0]*rect[2])*factor,y=state.hero.y+(anchor.sourceNativeXY[1]-rect[1]-pivot[1]*rect[3])*factor;
  return finite(x)&&finite(y)?{x,y,adjusted}:null;
 }
 function requestShot(state){
  const config=configuration(state);if(!config)return false;live=state;const h=state.hero,value=record(state);if(!h||h.cool>0||h.ammo<=0)return true;requests++;
  const native=source(state,config),canvas=root.document?.getElementById?.('gameCanvas');
  if(!native||!canvas||!project(state,config,native,{canvas},root.CQC_SUPPORT_NATIVE_ACTOR_FACTORY?.SCALE)){blocked++;return true;}
  h.ammo--;h.cool=10;value.pending={config,native,damage:h.power>0?360:260};value.attack={config,firstDraw:true};return true;
 }
 function update(state){
  const config=configuration(state);if(!config)return false;live=state;const value=record(state);if(value.lastTick===state.frame)return true;value.lastTick=state.frame;
  if(!mode.owns(config.fighter)){value.pending=null;value.attack=null;blocked++;return true;}
  const pending=value.pending;value.pending=null;if(pending){
   const canvas=root.document?.getElementById?.('gameCanvas'),at=canvas&&project(state,pending.config,pending.native,{canvas},root.CQC_SUPPORT_NATIVE_ACTOR_FACTORY?.SCALE);if(!at)throw Error('Reviewed Support debris projection unavailable');
   const shot={x:at.x,y:at.y,vx:17,damage:pending.damage};ownedShots.set(shot,{state,bornFrame:state.frame});state.shots.push(shot);emissions++;
   lastEmission={uid:config.fighter.uid,costume:config.fighter.costume,frame:state.frame,x:at.x,y:at.y,face:1,vx:17,damage:shot.damage,action:'deploy',physicalPoseIndex:11,socket:'hand-release',sourceFile:pending.native.anchor.sourceFile,sourceSHA256:pending.native.anchor.sourceSHA256,sourceNativeXY:[...pending.native.anchor.sourceNativeXY]};
  }
  if(state.hero.cool<=0)value.attack=null;return true;
 }
 function hitTest(shot,enemy,operation){
  if(!ownedShots.has(shot))return null;const target=bridge?.resolveEnemy?.(operation,enemy?.kind);if(!target?.uid||target.simulation)return null;
  const fighter={uid:target.uid},entry=root.CQC_COMBAT_SPRITES?.getEntry?.(target.uid,fighter),actions=entry?.facing===-1?entry.actions:entry?.oppositeActions,frame=actions?.idle?.frames?.[0],height=entry?.sourceFrameHeights?.[frame?.file]||entry?.baseFrameHeight;
  const ratio=root.CQC_PASS19_WORLD_SCALE?.height?.(fighter,{originalPixels:entry?.displayHeight})?.ratio,factor=entry?.displayHeight/height*ratio*root.CQC_SUPPORT_NATIVE_ACTOR_FACTORY?.SCALE;
  if(!frame||!finite(factor)||factor<=0||!finite(enemy?.x)||!finite(enemy?.y))return null;
  const ys=frame.clipPolygon?.length?frame.clipPolygon.map(p=>p[1]):[0,1];if(ys.some(y=>!finite(y)||y<0||y>1))return null;
  const top=enemy.y+(Math.min(...ys)-frame.pivot[1])*frame.rect[3]*factor,bottom=enemy.y+(Math.max(...ys)-frame.pivot[1])*frame.rect[3]*factor;
  return shot.x>enemy.x-35&&shot.x<enemy.x+35&&shot.y>top&&shot.y<bottom;
 }
 function drawShot(context,shot){
  const owned=ownedShots.get(shot);if(!owned)return false;
  // The existing Core debris polygon, at a qualified Support presentation scale.
  // Only this adapter's projectile objects use it; this is not a firearm tracer.
  const outline=[[-22,-18],[10,-27],[27,-8],[14,23],[-20,20]],facet=[[-22,-18],[10,-27],[7,6],[-20,20]];
  context.save();context.translate(shot.x,shot.y);context.rotate(Math.max(0,owned.state.frame-owned.bornFrame)*.05);context.scale(.55,.55);
  context.beginPath();outline.forEach((p,i)=>i?context.lineTo(...p):context.moveTo(...p));context.closePath();context.fillStyle='#988fa4';context.fill();context.strokeStyle='#988fa4';context.lineWidth=3;context.stroke();
  context.beginPath();facet.forEach((p,i)=>i?context.lineTo(...p):context.moveTo(...p));context.closePath();context.fillStyle='#c7bdcf';context.fill();context.restore();return true;
 }
 function install(){
  const current=root.CQC_SUPPORT_NATIVE_ACTORS;if(current?.drawLead&&current!==bridge){
   if(typeof current.leadScale!=='function')throw Error('Shared reviewed Support leadScale is required');bridge=current;const prior=current.drawLead;
   current.drawLead=function(context,fighter,x,y,face,scale,normalPose={}){
    const state=live,config=state&&configuration(state),attack=state&&record(state).attack;
    if(!config||!attack||fighter!==state.lead||context?.canvas?.id!=='gameCanvas'||state.hero.x!==x||state.hero.y!==y||state.hero.life<=0||normalPose.hit&&!attack.firstDraw)return prior.apply(this,arguments);
    const native=source(state,attack.config),at=native&&project(state,attack.config,native,context,scale);if(!at)return false;
    const drawn=root.CQC_COMBAT_SPRITES.draw(context,attack.config.fighter,x,y,1,at.adjusted,pose(state,attack.config))===true;if(drawn){draws++;attack.firstDraw=false;}return drawn;
   };
  }
  const prior=root.CQC_PASS39_RAPTOR_SUPPORT;if(prior&&!router&&typeof prior.requestShot==='function'&&typeof prior.update==='function'){
   router=Object.freeze({...prior,requestShot:function(state,keys){return configuration(state)?requestShot(state):prior.requestShot.apply(prior,arguments);},update:function(state){return configuration(state)?update(state):prior.update.apply(prior,arguments);},drawShot:function(context,shot){return drawShot(context,shot)||prior.drawShot?.apply(prior,arguments)||false;}});root.CQC_PASS39_RAPTOR_SUPPORT=router;
  }
  return!!router;
 }
 if(root.CQC_PASS40_SUPPORT_SKULL_DEBRIS)throw Error('Duplicate Support Skull adapter');
 root.CQC_PASS40_SUPPORT_SKULL_DEBRIS=Object.freeze({install,requestShot,update,drawShot,hitTest,diagnostics:()=>({scopeVersion:'pass40-support-skull-debris/1',requests,emissions,draws,blocked,scope:['core__skull_armor:retro-msx'],ammoCost:1,cooldown:10,vx:17,projectileKind:'debris',sourceSocket:'hand-release',lastEmission:lastEmission?{...lastEmission,sourceNativeXY:[...lastEmission.sourceNativeXY]}:null})});install();
})(globalThis);
