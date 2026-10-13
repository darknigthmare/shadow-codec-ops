/* Six approved native Original fighters and their private Next Gen costumes share Versus rendering. */
(function(root,factory){'use strict';const api=factory(root);if(typeof module==='object'&&module.exports)module.exports=api;root.CQC_PASS17_CORE_COSTUMES=api;})(globalThis,function(root){
  'use strict';
  const loader=()=>root.CQC_COMBAT_SPRITES, choices=()=>root.CQC_COSTUMES_PASS17;
  const legacyOriginals=new Set(['core__snake','core__viper','core__runner_mg2','core__ninja_mg2','core__redblaster_mg2','core__jungle_evil','npc53__elsie_frances_acid']);
  const portraits=new WeakMap();let pending=null,dialog=null,serial=0,previousFocus=null;
  function uidFor(id){const uid='core__'+id;return root.CQC_COMBAT_COSTUME_CATALOG?.entries?.[uid]?uid:null;}
  function costumed(actor){const uid=uidFor(actor?.id);return uid?{uid,costume:choices()?.normalize(uid,actor.costume)||'original'}:null;}
  function applyActors(state){
    if(!Array.isArray(state?.fighters)||!Array.isArray(state.options?.costumes))return state;
    for(let slot=0;slot<state.fighters.length;slot++){
      const actor=state.fighters[slot],uid=uidFor(actor.id);
      // This actor is already a private engine copy; global ROSTER records never change.
      const costume=uid?choices()?.normalize(uid,state.options?.costumes?.[slot]||'original'):'original';
      if(costume&&costume!=='original')actor.costume=costume;else delete actor.costume;
    }
    return state;
  }
  function drawActor(c,actor,time,state={},hooks={}){
    const fighter=costumed(actor);if(!fighter||fighter.costume==='original'&&!legacyOriginals.has(fighter.uid))return false;
    const entry=loader()?.getEntry(fighter.uid,fighter);if(!entry)return false;
    const pose=root.CQC_PASS16_CORE_SPRITES?.poseFor(actor,time,state,hooks)||{time};
    const move=actor.attack?hooks.getMove?.(actor,actor.attack.name):null;
    if(move?.utility&&/reload|cylinder/i.test(move.utility))pose.moveSlot=Object.keys(entry.actionMap).find(key=>entry.actionMap[key]==='reload')||pose.moveSlot;
    if(!pose.entityKey)pose.entityKey='core-pass17-costume:'+actor.id+':'+actor.slot;
    const worldHeight=root.CQC_PASS19_WORLD_SCALE?.displayHeightFor?.(fighter.uid,fighter.costume,'core',entry);
    const height=Number.isFinite(worldHeight)&&worldHeight>0?worldHeight:entry.coreDisplayHeight||root.CQC_COMBAT_SPRITE_CATALOG?.entries?.[fighter.uid]?.coreDisplayHeight||entry.displayHeight;
    const drawPose=Number.isFinite(worldHeight)&&worldHeight>0?{...pose,worldScaleApplied:true}:pose;
    c.save();try{if(actor.cloak>0)c.globalAlpha*=.42;loader()?.draw(c,fighter,0,0,actor.facing===-1?-1:1,height/entry.displayHeight,drawPose);}finally{c.restore();}
    // Launch waits for both decoded sheets. A mapped native costume never flashes procedural fallback.
    return true;
  }
  function cancelPortrait(target){const ticket=portraits.get(target);if(ticket)ticket.cancelled=true;portraits.delete(target);}
  function drawPortrait(target,id,slot=0,override){
    const uid=uidFor(id),costume=uid&&(override===undefined?(choices()?.chosen(slot,uid)||'original'):(choices()?.normalize(uid,override)||'original'));if(!uid||costume==='original'&&!legacyOriginals.has(uid))return false;
    cancelPortrait(target);const ticket={number:++serial,cancelled:false};portraits.set(target,ticket);
    const options={costume,action:'idle',face:1};
    function paint(){if(ticket.cancelled||portraits.get(target)!==ticket)return;const c=target.getContext('2d');c.clearRect(0,0,target.width,target.height);loader()?.drawFitted(c,{uid,costume},{x:0,y:0,width:target.width,height:target.height,padding:5},1,{time:0,actionTime:0,entityKey:'core-pass17-costume-portrait:'+ticket.number});}
    if(loader()?.status(uid,options)?.ready){paint();return true;}
    target.getContext('2d').clearRect(0,0,target.width,target.height);
    Promise.resolve(loader()?.whenReady(uid,options)??false).then(ok=>{if(ok)paint();}).catch(()=>{});
    return true;
  }
  function cancelPendingLaunch(){
    if(pending)pending.cancelled=true;pending=null;++serial;
    if(dialog){dialog.node.hidden=true;dialog.node.style.display='none';}
    const visible=node=>node?.isConnected&&node.getClientRects?.().length!==0&&(!node.closest?.('dialog')||node.closest('dialog').open);
    const target=visible(previousFocus)?previousFocus:root.document?.getElementById?.('start');
    if(visible(target))target.focus?.();previousFocus=null;
  }
  function ensureDialog(){
    if(dialog||!root.document)return dialog;const doc=root.document;
    const node=doc.createElement('div');node.hidden=true;node.setAttribute('role','dialog');node.setAttribute('aria-modal','true');node.setAttribute('aria-label','Liaison des combattants');
    node.style.cssText='position:fixed;inset:0;z-index:9991;background:#061013eb;display:none;place-items:center;padding:24px';
    const panel=doc.createElement('div');panel.style.cssText='max-width:420px;background:#102327;border:1px solid #849684;padding:24px;color:#ecebdc';
    const text=doc.createElement('p');text.setAttribute('role','status');text.setAttribute('aria-live','polite');
    const retry=doc.createElement('button');retry.type='button';retry.textContent='Réessayer';retry.hidden=true;
    const cancel=doc.createElement('button');cancel.type='button';cancel.textContent='Annuler';
    retry.addEventListener('click',()=>{if(pending)loadTicket(pending,true);});cancel.addEventListener('click',cancelPendingLaunch);
    node.addEventListener('keydown',event=>{event.stopPropagation();if(event.key==='Escape'){event.preventDefault();cancelPendingLaunch();}if(event.key==='Tab'){const buttons=retry.hidden?[cancel]:[retry,cancel],index=buttons.indexOf(doc.activeElement);event.preventDefault();buttons[(index+(event.shiftKey?-1:1)+buttons.length)%buttons.length].focus();}});
    panel.append(text,retry,cancel);node.append(panel);doc.body.append(node);dialog={node,text,retry,cancel};return dialog;
  }
  async function loadTicket(ticket,retry=false){
    if(ticket.cancelled||pending!==ticket)return;const attempt=++ticket.attempt,d=ensureDialog();
    if(d){d.node.hidden=false;d.node.style.display='grid';d.text.textContent='Liaison des combattants…';d.retry.hidden=true;d.cancel.focus();}
    let results;try{results=await Promise.all(ticket.jobs.map(job=>loader()?.whenReady(job.uid,{costume:job.costume,retry})??false));}catch{results=[];}
    if(ticket.cancelled||pending!==ticket||attempt!==ticket.attempt)return;
    if(results.length===ticket.jobs.length&&results.every(Boolean)&&ticket.jobs.every(job=>loader()?.status(job.uid,{costume:job.costume})?.ready)){
      const resume=ticket.resume,options=ticket.options;pending=null;if(d){d.node.hidden=true;d.node.style.display='none';}previousFocus=null;resume(options);
    }else if(d){d.text.textContent='Liaison indisponible. Réessayez.';d.retry.hidden=false;d.retry.focus();}
  }
  function deferCoreLaunch(options,resume){
    const ids=[options.player,options.opponent],jobs=[];
    ids.forEach((id,slot)=>{const uid=uidFor(id),costume=choices()?.normalize(uid,options.costumes?.[slot])||'original';if(uid&&loader()?.has(uid,{costume}))jobs.push({uid,slot,costume});});
    loader()?.retainFighters(ids.map((id,slot)=>({uid:'core__'+id,costume:choices()?.normalize('core__'+id,options.costumes?.[slot])||'original'})));
    const key=JSON.stringify(options);if(pending&&pending.key!==key)cancelPendingLaunch();
    if(!jobs.length||jobs.every(job=>loader()?.status(job.uid,{costume:job.costume})?.ready))return false;
    if(pending)return true;previousFocus=root.document?.activeElement||null;
    const ticket={number:++serial,key,jobs,resume,options:{...options,...(Array.isArray(options.costumes)?{costumes:[...options.costumes]}:{})},attempt:0,cancelled:false};pending=ticket;loadTicket(ticket,false);return true;
  }
  root.addEventListener?.('pagehide',cancelPendingLaunch);
  return {version:'pass17-core-costumes/2',uidFor,applyActors,drawActor,drawFighter:drawActor,cancelPortrait,drawPortrait,deferCoreLaunch,cancelPendingLaunch};
});
