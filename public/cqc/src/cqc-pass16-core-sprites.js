/* Core uses the twenty PASS16 native fighters through the existing decoded sprite loader. */
(function(root,factory){
  'use strict';
  const api=factory(root);
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.CQC_PASS16_CORE_SPRITES=api;
})(globalThis,function(root){
  'use strict';
  const portraits=new WeakMap();
  let serial=0,pending=null,dialog=null,focusBefore=null;
  const finite=(value,fallback=0)=>Number.isFinite(value)?value:fallback;
  const clamp=value=>Math.max(0,Math.min(1,value));
  const loader=()=>root.CQC_COMBAT_SPRITES;
  function uidFor(id){
    const uid='core__'+id,list=root.CQC_PASS16_SPRITE_UIDS;
    return Array.isArray(list)&&list.includes(uid)?uid:null;
  }
  function metadata(uid){return root.CQC_COMBAT_SPRITE_CATALOG?.entries?.[uid]||null;}
  function imported(id,hooks){return hooks?.manualImported?.(id)===true;}
  function eligible(id,hooks){return !imported(id,hooks)&&uidFor(id);}
  function ready(uid,options={}){return loader()?.has(uid)===true&&loader()?.status(uid,options)?.ready===true;}
  function slotFor(f,move){
    const name=f.attack?.name;
    if(name===f.special)return 'special';
    if(name===f.secondary)return 'specialDown';
    if(name===f.backSpecial)return 'specialBack';
    if(name===f.forwardSpecial)return 'specialForward';
    if(name==='super')return 'super';
    if(['throw','cqcLock'].includes(name)||move?.level==='throw')return 'throw';
    if(['sweep','low'].includes(name)||move?.level==='low')return 'low';
    if(['light','airLight'].includes(name))return 'light';
    if(['medium','heavy','airHeavy','launcher','rush'].includes(name))return 'heavy';
    return null;
  }
  function matchingSlot(entry,action){return Object.keys(entry?.actionMap||{}).find(key=>entry.actionMap[key]===action)||null;}
  function attackPhase(t,move){
    const startup=Math.max(0,finite(move?.startup)),active=Math.max(0,finite(move?.active)),recovery=Math.max(0,finite(move?.recovery));
    if(t<startup)return {attackPhase:'startup',phaseProgress:clamp(t/Math.max(1,startup))};
    if(t<startup+active)return {attackPhase:'active',phaseProgress:clamp((t-startup)/Math.max(1,active))};
    return {attackPhase:'recovery',phaseProgress:clamp((t-startup-active)/Math.max(1,recovery))};
  }
  function poseFor(f,t,state={},hooks={}){
    const uid=uidFor(f.id),entry=metadata(uid),key=f.animKey||'idle',attack=f.attack;
    const move=attack?hooks.getMove?.(f,attack.name):null,clock=Math.max(0,finite(f.animFrame));
    const pose={time:Math.max(0,finite(t)),actionTime:clock/60,entityKey:'core-pass16:'+f.id+':'+finite(f.slot),
      ko:['down','defeat','sleep'].includes(key)||f.health<=0||f.vigilance<=0,
      hit:['hurt','hurtLow','launched','grabbed','thrown'].includes(key)||finite(f.hitstun)>0,
      jump:['jumpRise','jumpFall'].includes(key),guard:!!(f.blocking||f.blockstun)||['guard','guardLow'].includes(key),
      crouch:!!f.crouch||key==='crouch',walk:['walkForward','walkBackward','dash'].includes(key)};
    if(state.grapple){
      const g=state.grapple;
      if(f.slot===g.owner){
        pose.ko=false;pose.hit=false;pose.attack=true;pose.animationActive=true;pose.moveSlot='throw';pose.actionTime=finite(g.t)/60;
        pose.attackPhase=g.t<8?'startup':g.t<g.impact?'active':'recovery';
        pose.phaseProgress=pose.attackPhase==='startup'?clamp(g.t/8):pose.attackPhase==='active'?clamp((g.t-8)/Math.max(1,g.impact-8)):clamp((g.t-g.impact)/Math.max(1,(g.duration||g.impact+28)-g.impact));
      }else if(f.slot===g.target){pose.ko=g.t>=g.impact;pose.hit=!pose.ko;}
      return pose;
    }
    if(attack&&!pose.ko&&!pose.hit){
      pose.attack=true;pose.animationActive=true;pose.moveSlot=slotFor(f,move);pose.actionTime=Math.max(0,finite(attack.t))/60;
      Object.assign(pose,attackPhase(Math.max(0,finite(attack.t)),move));
      // Card decks and reload commands resolve their actual existing move, rather than a guessed slot.
      let action=null;
      if(move?.acidCard){action=move.projectile?(/grenade|mine|smoke/i.test(move.projectile.kind||'')?'deploy':'shoot'):move.level==='low'?'low':move.level==='throw'?'throw':move.blade?'blade':move.utility?'recover':'punch';}
      else if(/reload|cylinder/i.test(move?.utility||''))action='reload';
      else if(move?.utility==='legacyCharge')action='recover';
      else if(!pose.moveSlot&&move?.projectile)action=/grenade|mine/i.test(move.projectile.kind||'')?'deploy':'shoot';
      if(action)pose.moveSlot=matchingSlot(entry,action)||pose.moveSlot;
    }
    return pose;
  }
  function drawActor(c,f,t,state={},hooks={}){
    const uid=eligible(f.id,hooks);if(!uid)return false;
    const pose=poseFor(f,t,state,hooks),face=f.facing===-1?-1:1;
    c.save();
    try{
      if(f.cloak>0)c.globalAlpha*=.42;
      const hovering=f.id==='cunningham',floatY=hovering?-34+Math.sin(finite(t)*3)*3:0;
      if(hovering){c.translate(f.hitstun?-8:0,floatY);hooks.accessory?.(c,f,t,'under');}
      const nativeHeight=finite(metadata(uid)?.displayHeight,265);
      loader()?.draw(c,{uid},0,0,face,265/(nativeHeight>0?nativeHeight:265),pose);
      if(hovering)hooks.accessory?.(c,f,t,'over');
    }finally{c.restore();}
    // Decoded readiness is required before launch. A mapped native fighter never flashes a procedural fallback.
    return true;
  }
  function cancelPortrait(target){const token=portraits.get(target);if(token)token.cancelled=true;portraits.delete(target);}
  function portraitMessage(target,message){
    const c=target.getContext('2d');c.clearRect(0,0,target.width,target.height);c.save();c.fillStyle='#101f22';c.fillRect(0,0,target.width,target.height);c.fillStyle='#d7cc95';c.font='11px Arial,sans-serif';c.textAlign='center';c.fillText(message,target.width/2,target.height/2);c.restore();
  }
  function drawPortrait(target,id,hooks={}){
    const uid=eligible(id,hooks);if(!uid)return false;
    cancelPortrait(target);
    const token={uid,cancelled:false,number:++serial};portraits.set(target,token);
    const options={action:'idle',face:1};
    function paint(){
      if(token.cancelled||portraits.get(target)!==token)return false;
      const c=target.getContext('2d');c.clearRect(0,0,target.width,target.height);
      if(id==='cunningham'&&hooks.portraitAccessory){
        // Include the full original platform beneath the independently authored body.
        c.save();c.translate(target.width/2,target.height-24);c.scale(.48,.48);hooks.portraitAccessory(c,id,'under');loader()?.draw(c,{uid},0,0,1,265/(finite(metadata(uid)?.displayHeight,265)||265),{actionTime:0,time:0,entityKey:'core-pass16-portrait:'+token.number});hooks.portraitAccessory(c,id,'over');c.restore();
      }else loader()?.drawFitted(c,{uid},{x:0,y:0,width:target.width,height:target.height,padding:5},1,{actionTime:0,time:0,entityKey:'core-pass16-portrait:'+token.number});
      return true;
    }
    if(ready(uid,options)){paint();return true;}
    portraitMessage(target,'Liaison tactique…');
    Promise.resolve(loader()?.whenReady(uid,options)??false).then(ok=>{
      if(token.cancelled||portraits.get(target)!==token)return;
      if(ok===true&&ready(uid,options))paint();else portraitMessage(target,'Dossier inaccessible.');
    }).catch(()=>{if(!token.cancelled&&portraits.get(target)===token)portraitMessage(target,'Dossier inaccessible.');});
    return true;
  }
  function ensureDialog(){
    if(dialog||!root.document)return dialog;
    const d=root.document.createElement('div');d.hidden=true;d.className='cqc-pass16-link';d.setAttribute('role','dialog');d.setAttribute('aria-modal','true');d.setAttribute('aria-labelledby','cqc-pass16-link-message');
    d.style.cssText='position:fixed;inset:0;z-index:9990;display:grid;place-items:center;background:#061013e8;padding:24px';
    const box=root.document.createElement('div');box.style.cssText='width:min(420px,100%);background:#102327;border:1px solid #849684;padding:24px;color:#ecebdc';
    const message=root.document.createElement('p');message.id='cqc-pass16-link-message';message.setAttribute('role','status');message.setAttribute('aria-live','polite');
    const retry=root.document.createElement('button');retry.type='button';retry.textContent='Réessayer';retry.hidden=true;retry.style.marginRight='12px';
    const cancel=root.document.createElement('button');cancel.type='button';cancel.textContent='Annuler';
    retry.addEventListener('click',()=>{if(pending)beginReadiness(pending,true);});cancel.addEventListener('click',()=>cancelPendingLaunch());
    d.addEventListener('keydown',event=>{
      event.stopPropagation();
      if(event.key==='Escape'){event.preventDefault();cancelPendingLaunch();}
      if(event.key==='Tab'){
        const buttons=retry.hidden?[cancel]:[retry,cancel],first=buttons[0],last=buttons[buttons.length-1];
        if(!buttons.includes(root.document.activeElement)){event.preventDefault();(event.shiftKey?last:first).focus();}
        else if(event.shiftKey&&root.document.activeElement===first){event.preventDefault();last.focus();}
        else if(!event.shiftKey&&root.document.activeElement===last){event.preventDefault();first.focus();}
      }
    });box.append(message,retry,cancel);d.append(box);root.document.body.append(d);dialog={node:d,message,retry,cancel};return dialog;
  }
  function showDialog(error=false){const d=ensureDialog();if(!d)return;d.node.hidden=false;d.node.style.display='grid';d.message.textContent=error?'Dossier inaccessible. Réessayez.':'Liaison tactique…';d.retry.hidden=!error;(error?d.retry:d.cancel).focus();}
  function hideDialog(restore=false){if(dialog){dialog.node.hidden=true;dialog.node.style.display='none';}if(restore&&focusBefore?.isConnected)focusBefore.focus?.();focusBefore=null;}
  function cancelPendingLaunch(){if(pending)pending.cancelled=true;pending=null;++serial;hideDialog(true);}
  function launchUIDs(options,hooks={}){
    const ids=hooks.actorIDs?.(options)||[options.player,options.opponent];
    return [...new Set(ids.map(id=>eligible(id,hooks)).filter(Boolean))];
  }
  async function beginReadiness(ticket,retry=false){
    if(ticket.cancelled||pending!==ticket)return;
    ticket.attempt++;const attempt=ticket.attempt;showDialog(false);
    let results;
    try{results=await Promise.all(ticket.uids.map(uid=>loader()?.whenReady(uid,retry?{retry:true}: {})??Promise.resolve(false)));}
    catch{results=[];}
    if(ticket.cancelled||pending!==ticket||attempt!==ticket.attempt)return;
    if(results.length===ticket.uids.length&&results.every(ok=>ok===true)&&ticket.uids.every(uid=>ready(uid))){
      const resume=ticket.resume,options=ticket.options;pending=null;hideDialog(false);resume(options);
    }else showDialog(true);
  }
  function deferCoreLaunch(options,resume,hooks={}){
    const uids=launchUIDs(options,hooks),key=JSON.stringify(options);
    if(pending){if(pending.key===key)return true;cancelPendingLaunch();}
    if(!uids.length||uids.every(uid=>ready(uid)))return false;
    focusBefore=root.document?.activeElement||null;
    const ticket={number:++serial,key,uids,options:{...options},resume,cancelled:false,attempt:0};pending=ticket;beginReadiness(ticket,false);return true;
  }
  function cancelOnNewIntent(options){if(pending&&pending.key!==JSON.stringify(options))cancelPendingLaunch();}
  root.addEventListener?.('pagehide',cancelPendingLaunch);
  root.document?.addEventListener('change',event=>{if(pending&&['SELECT','INPUT'].includes(event.target?.tagName))cancelPendingLaunch();},true);
  return {version:'pass16-core-sprites/1',uidFor,poseFor,drawActor,drawFighter:drawActor,cancelPortrait,drawPortrait,deferCoreLaunch,cancelPendingLaunch,cancelOnNewIntent,launchUIDs,pendingState:()=>pending?{uids:[...pending.uids],attempt:pending.attempt}:null};
});
