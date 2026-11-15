/* Scoped Support operation adapter: the R00 sword never falls through to the generic pistol. */
(function(root){
  'use strict';
  const UID='pass40__raiden_r00',states=new WeakMap();
  let live=null,bridge=null,wrappedSupport=null,attacks=0,hits=0,draws=0,launchEpoch=0,launchReady=0,launchErrors=0;
  const owns=state=>state?.lead?.uid===UID;
  function record(state){let value=states.get(state);if(!value){value={attack:null,lastTick:-1,face:1};states.set(state,value);}return value;}
  function selected(state){return bridge?.selectedLead?.(state.lead)||state.lead;}
  function nativeReady(state,face){
    const fighter=selected(state),sprites=root.CQC_COMBAT_SPRITES;
    if(!root.CQC_PASS40_R00_NATIVE?.admitted()||!fighter||fighter.uid!==UID||
      (fighter.costume&&fighter.costume!=='original')||sprites.getEntry(UID,fighter)!==root.CQC_PASS40_R00_SOURCE.entry)return false;
    sprites.preload(UID,{action:'blade',face});
    return sprites.status(UID,{action:'blade',face}).ready===true;
  }
  function pose(state,attack){
    const age=state.frame-attack.start,phase=age<attack.startup?'startup':age<attack.startup+attack.active?'active':'recovery';
    const progress=phase==='startup'?age/attack.startup:phase==='active'?(age-attack.startup)/attack.active:
      (age-attack.startup-attack.active)/attack.recovery;
    return {entityKey:state.hero,time:state.frame/60,moveSlot:'light',moveKind:'melee',moveTag:'blade',
      attack:true,animationActive:true,attackPhase:phase,phaseProgress:Math.max(0,Math.min(1,progress)),attackTime:age/60};
  }
  function requestShot(state,keys){
    if(!owns(state))return false;
    live=state;install();const value=record(state),h=state.hero;
    if(keys?.has?.('ArrowLeft'))value.face=-1;else if(keys?.has?.('ArrowRight'))value.face=1;
    // Consume the request even when source loading, cooldown or a wrong costume prevents a cut.
    if(!h||state.ended||h.life<=0||h.cool>0||value.attack||!nativeReady(state,value.face))return true;
    const move=root.CQC_PASS40_R00_NATIVE.profile().combat.moves.light;
    h.cool=move.startup+move.active+move.recovery;
    value.attack={start:state.frame,face:value.face,startup:move.startup,active:move.active,
      recovery:move.recovery,total:h.cool,damage:move.damage,hitTargets:new WeakSet()};attacks++;
    return true;
  }
  function update(state){
    if(!owns(state))return false;
    live=state;install();const value=record(state);if(value.lastTick===state.frame)return true;value.lastTick=state.frame;
    const attack=value.attack,h=state.hero;if(!attack||!h)return true;
    const age=state.frame-attack.start;
    if(state.ended||h.life<=0||h.inv>18||age>=attack.total){value.attack=null;return true;}
    if(age<attack.startup||age>=attack.startup+attack.active)return true;
    // This is an authored Support contact volume, not an extracted3D sword collision.
    const zone={x:attack.face===1?h.x:h.x-160,y:h.y-180,w:160,h:155};
    for(const enemy of state.enemies||[]){
      if(enemy.life<=0||attack.hitTargets.has(enemy))continue;
      const box={x:enemy.x-25,y:enemy.y-120,w:50,h:120};
      if(zone.x>=box.x+box.w||zone.x+zone.w<=box.x||zone.y>=box.y+box.h||zone.y+zone.h<=box.y)continue;
      enemy.life-=attack.damage;enemy.flash=8;attack.hitTargets.add(enemy);hits++;
    }
    return true;
  }
  function launchUI(text,busy=false){
    const document=root.document,button=document?.getElementById?.('briefStart');
    if(button){button.disabled=busy;button.setAttribute('aria-busy',String(busy));}
    if(!document?.createElement)return;
    let message=document.getElementById('supportR00Loading');
    if(!message){message=document.createElement('p');message.id='supportR00Loading';message.setAttribute('role','status');
      message.style.cssText='font-size:12px;color:#aab6c2;min-height:1.5em';document.getElementById('briefText')?.after(message);}
    message.textContent=text;message.hidden=!text;
  }
  function installLaunchGate(current){
    if(typeof current.deferLaunch!=='function'||typeof current.cancelPending!=='function')return;
    const previousDefer=current.deferLaunch,previousCancel=current.cancelPending;
    current.cancelPending=function(){launchEpoch++;launchUI('',false);return previousCancel.apply(this,arguments);};
    current.deferLaunch=function(operation,lead,resume){
      if(lead?.uid!==UID)return previousDefer.apply(this,arguments);
      const epoch=++launchEpoch,actual=current.resetLead?.(lead)||lead,sprites=root.CQC_COMBAT_SPRITES;
      // Source-ready actors still use the original stage/enemy gate without extra delay.
      if(root.CQC_PASS40_R00_NATIVE?.admitted()&&sprites?.status(UID,actual).ready)
        return previousDefer.apply(this,arguments);
      const ready=()=>{
        if(epoch!==launchEpoch)return;
        launchUI('Liaison du combattant…',true);
        // Load both native directions and every physical action before accepting the first J.
        Promise.resolve(sprites?.whenReady?.(UID,{...actual,retry:true})).then(loaded=>{
          if(epoch!==launchEpoch)return;
          if(!loaded||!root.CQC_PASS40_R00_NATIVE?.admitted()||!sprites.status(UID,actual).ready){
            launchErrors++;launchUI('Liaison indisponible. Relancez pour réessayer.',false);return;}
          launchReady++;launchUI('',false);resume();
        },()=>{if(epoch===launchEpoch){launchErrors++;launchUI('Liaison indisponible. Relancez pour réessayer.',false);}});
      };
      const waiting=previousDefer.call(this,operation,lead,ready);
      if(!waiting)ready();
      return true;
    };
  }
  function install(){
    const current=root.CQC_SUPPORT_NATIVE_ACTORS;
    if(current?.drawLead&&current!==bridge){
      bridge=current;installLaunchGate(current);const previous=current.drawLead;
      current.drawLead=function(context,fighter,x,y,face,scale,normalPose={}){
        const state=live;
        if(fighter?.uid!==UID||!owns(state)||context?.canvas?.id!=='gameCanvas'||state.hero?.x!==x||state.hero?.y!==y)
          return previous.apply(this,arguments);
        const attack=record(state).attack;
        if(!attack||normalPose.hit||state.hero.life<=0)return previous.apply(this,arguments);
        const actual=selected(state),entry=root.CQC_COMBAT_SPRITES?.getEntry(UID,actual);
        if(entry!==root.CQC_PASS40_R00_SOURCE?.entry)return false;
        const physical=root.CQC_PASS19_WORLD_SCALE?.height?.(actual,{originalPixels:entry.displayHeight});
        const h=physical?.pixels||entry.displayHeight,maximum=Math.max(24,Math.min(context.canvas.height*.84,y-context.canvas.height*.08));
        const adjusted=h>0?Math.min(scale,maximum/h):scale;
        const drawn=root.CQC_COMBAT_SPRITES.draw(context,actual,x,y,attack.face,adjusted,pose(state,attack))===true;
        if(drawn)draws++;return drawn;
      };
    }
    const support=root.CQC_PASS39_RAPTOR_SUPPORT;
    if(support&&!wrappedSupport&&typeof support.requestShot==='function'&&typeof support.update==='function'){
      const wrapped=Object.freeze({...support,
        requestShot:function(state,keys){return owns(state)?requestShot(state,keys):support.requestShot.apply(support,arguments);},
        update:function(state){return owns(state)?update(state):support.update.apply(support,arguments);}});
      root.CQC_PASS39_RAPTOR_SUPPORT=wrapped;wrappedSupport=wrapped;
    }
    return !!wrappedSupport;
  }
  if(root.CQC_PASS40_R00_SUPPORT)throw Error('Duplicate R00 Support adapter');
  root.CQC_PASS40_R00_SUPPORT=Object.freeze({uid:UID,requestShot,update,install,
    diagnostics:()=>({uid:UID,attacks,hits,draws,launchReady,launchErrors,ammoCost:0,projectilesEmitted:0,
      scope:'R00 Support only; authored sword-contact volume and native CQC phases, no firearm or FC.'})});
  install();
})(globalThis);
