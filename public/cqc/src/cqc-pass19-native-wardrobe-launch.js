/* Private launch preparation; replay requests do not alter either player's wardrobe. */
(function(root,factory){'use strict';const api=factory(root);if(typeof module==='object'&&module.exports)module.exports=api;root.CQC_NATIVE_WARDROBE_LAUNCH=api;})(globalThis,function(root){
  'use strict';
  let pending=null,serial=0,dialog=null,previousFocus=null;
  const library=()=>root.CQC_NATIVE_WARDROBE;
  function known(uid,id){return id!=='original'&&library()?.known(uid,id)===true;}
  function fighterFor(fighter,slot,costume){
    if(fighter&&typeof costume==='string'&&known(fighter.uid,costume))return{...fighter,costume};
    return root.CQC_COSTUMES_PASS17?.fighterFor(fighter,slot,costume)||fighter;
  }
  function cancel(){
    const ticket=pending;pending=null;++serial;
    if(ticket){ticket.cancelled=true;ticket.controller.abort();library()?.cancelPreparation(ticket.owner);}
    if(dialog){dialog.node.hidden=true;dialog.node.style.display='none';}
    if(previousFocus?.isConnected)previousFocus.focus?.();previousFocus=null;
  }
  function modal(){
    if(dialog||!root.document)return dialog;
    const doc=root.document,node=doc.createElement('div'),panel=doc.createElement('div'),text=doc.createElement('p'),retry=doc.createElement('button'),back=doc.createElement('button');
    node.hidden=true;node.style.cssText='position:fixed;inset:0;z-index:9992;display:none;place-items:center;background:#061013ed;padding:24px';
    node.setAttribute('role','dialog');node.setAttribute('aria-modal','true');node.setAttribute('aria-label','Liaison du vestiaire');
    panel.style.cssText='max-width:420px;background:#102327;color:#ecebdc;border:1px solid #849684;padding:24px';text.setAttribute('role','status');text.setAttribute('aria-live','polite');
    retry.type=back.type='button';retry.textContent='Réessayer';retry.hidden=true;back.textContent='Annuler';
    retry.addEventListener('click',()=>{if(pending)load(pending,true);});back.addEventListener('click',cancel);
    node.addEventListener('keydown',event=>{event.stopPropagation();if(event.key==='Escape'){event.preventDefault();cancel();}else if(event.key==='Tab'){event.preventDefault();const buttons=retry.hidden?[back]:[retry,back],i=buttons.indexOf(doc.activeElement);buttons[(i+(event.shiftKey?-1:1)+buttons.length)%buttons.length].focus();}});
    panel.append(text,retry,back);node.append(panel);doc.body.append(node);dialog={node,text,retry,back};return dialog;
  }
  async function load(ticket,retry=false){
    if(ticket!==pending||ticket.cancelled)return;
    const attempt=++ticket.attempt,d=modal();if(d){d.node.hidden=false;d.node.style.display='grid';d.text.textContent='Liaison des combattants…';d.retry.hidden=true;d.back.focus();}
    let result;try{result=await library().prepareSlots(ticket.fighters,{owner:ticket.owner,signal:ticket.controller.signal,retry});}catch(error){result={ready:false,error:String(error.message||error)};}
    if(ticket!==pending||ticket.cancelled||attempt!==ticket.attempt)return;
    if(result.ready){pending=null;if(d){d.node.hidden=true;d.node.style.display='none';}previousFocus=null;ticket.resume(ticket.options);}
    else if(d){d.text.textContent='Liaison indisponible. Réessayez.';d.retry.hidden=false;d.retry.focus();}
    return result;
  }
  function deferCoreLaunch(options,resume){
    const fighters=[options.player,options.opponent].map((id,slot)=>({uid:'core__'+id,costume:options.costumes?.[slot]||'original'}));
    const key=JSON.stringify(options);if(pending&&pending.key!==key)cancel();
    const waiting=fighters.some(f=>known(f.uid,f.costume)&&!library().state(f.uid,f.costume).ready);
    if(!waiting)return false;
    if(pending)return true;
    root.CQC_PASS17_CORE_COSTUMES?.cancelPendingLaunch?.();
    previousFocus=root.document?.activeElement||null;
    const ticket={number:++serial,key,owner:'core-native-wardrobe-launch',fighters,options:{...options,costumes:[...(options.costumes||['original','original'])]},resume,controller:new AbortController(),attempt:0,cancelled:false};
    pending=ticket;load(ticket);return true;
  }
  function installCancelHook(){const old=root.CQC_PASS17_CORE_COSTUMES;if(!old||old.nativeWardrobeCancelInstalled)return;const previous=old.cancelPendingLaunch;old.cancelPendingLaunch=function(){cancel();return previous?.apply(this,arguments);};old.nativeWardrobeCancelInstalled=true;}
  installCancelHook();root.addEventListener?.('pagehide',cancel);
  return{version:'native-wardrobe-launch/1',fighterFor,known,deferCoreLaunch,cancelPendingLaunch:cancel,installCancelHook,pending:()=>pending?{number:pending.number,fighters:pending.fighters.map(f=>({...f})),attempt:pending.attempt}:null};
});
