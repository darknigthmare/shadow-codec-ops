/* Native Ac!d machine presentation. Decoding precedes the original start function. */
(function(root){
  'use strict';
  const IDS=Object.freeze({kodoque:'kodoque_acid_psp2004',chaioth:'chaioth_acid2_psp2005'});
  let registry=null,error=null,pending=null,serial=0,panel=null,returnFocus=null;
  const loads=new Map();
  try{registry=root.CQC_MACHINE_PARTS.create(root.CQC_MACHINE_PARTS_CATALOG);}catch(e){error=String(e?.message||e);}
  const ready=key=>!!registry?.ready(IDS[key]);
  function ensure(key,retry=false){
    if(!IDS[key])return Promise.reject(Error('Machine inconnue'));
    if(ready(key))return Promise.resolve(registry.status(IDS[key]));
    if(loads.has(key)&&!retry)return loads.get(key).promise;
    if(!registry||error)return Promise.reject(Error(error||'Pièces indisponibles'));
    if(retry&&loads.has(key)){loads.get(key).controller.abort();loads.delete(key);}
    const controller=new AbortController(),record={controller,promise:null};
    record.promise=registry.load(IDS[key],{signal:controller.signal,reload:retry}).finally(()=>{if(loads.get(key)===record)loads.delete(key);});
    record.promise.catch(()=>{});loads.set(key,record);return record.promise;
  }
  function hide(){panel?.remove();panel=null;if(returnFocus?.isConnected)returnFocus.focus();returnFocus=null;}
  function cancel(){if(!pending)return false;pending.cancelled=true;pending=null;serial++;hide();return true;}
  function show(request,failed=false){
    if(!panel){
      returnFocus=root.document.activeElement;
      panel=root.document.createElement('div');panel.id='cqc-acid-native-loading';
      panel.setAttribute('role','dialog');panel.setAttribute('aria-modal','true');panel.setAttribute('aria-label','Préparation de la machine');
      panel.style.cssText='position:fixed;inset:0;z-index:2147483500;display:grid;place-items:center;background:#040b10f5;color:#edf4d7;font:16px system-ui,sans-serif';
      root.document.body.append(panel);
    }
    panel.replaceChildren();
    const box=root.document.createElement('div');box.style.cssText='max-width:420px;padding:28px;text-align:center';
    const text=root.document.createElement('p');text.setAttribute('aria-live','polite');text.textContent=failed?'Les pièces de la machine n’ont pas pu être chargées.':'Préparation de la machine…';box.append(text);
    function button(label,callback){const b=root.document.createElement('button');b.type='button';b.textContent=label;b.style.cssText='padding:12px 18px;margin:6px;border:1px solid #9fc8ac;background:#112b24;color:#eef4d7;font:inherit';b.onclick=callback;box.append(b);return b;}
    if(failed)button('RÉESSAYER',()=>attempt(request,true));
    const dismiss=button('ANNULER',cancel);panel.append(box);dismiss.focus();
    panel.onkeydown=event=>{
      if(event.key==='Escape'){event.preventDefault();cancel();}
      if(event.key==='Tab'){const buttons=[...panel.querySelectorAll('button')],index=buttons.indexOf(root.document.activeElement);event.preventDefault();buttons[(index+(event.shiftKey?-1:1)+buttons.length)%buttons.length].focus();}
    };
  }
  async function attempt(request,retry=false){
    if(request.cancelled||pending!==request)return;
    show(request);
    try{await ensure(request.key,retry);}catch(_){if(pending===request&&!request.cancelled)show(request,true);return;}
    if(pending!==request||request.cancelled)return;
    if(!ready(request.key)){show(request,true);return;}
    pending=null;hide();request.resume();
  }
  function deferStart(key,resume,selection={}){
    if(!IDS[key])return false;
    const selectionKey=JSON.stringify({key,...selection});
    if(pending&&pending.selectionKey!==selectionKey)cancel();
    if(ready(key)){if(pending)cancel();return false;}
    if(pending)return true;
    pending={key,resume,selectionKey,cancelled:false,ticket:++serial};attempt(pending);return true;
  }
  function draw(context,state,key,repaint){
    key=state?.boss||key;if(!IDS[key])return false;
    if(ready(key)){
      const adapter=root.CQC_PASS16_MACHINE_POSE?.acidPose(state,key);
      return adapter?registry.draw(context,IDS[key],adapter):false;
    }
    context.save();
    try{
      context.fillStyle='#0b202bd9';context.fillRect(835,170,415,410);
      context.fillStyle='#d1dfca';context.font='16px system-ui,sans-serif';context.textAlign='center';
      const failed=error||registry?.status(IDS[key]).attemptState==='error';
      context.fillText(failed?'PIÈCES NON CHARGÉES':'PRÉPARATION DE LA MACHINE…',1042,370);
    }finally{context.restore();}
    const first=!loads.has(key);
    if(first&&!error&&registry?.status(IDS[key]).attemptState!=='error')ensure(key).then(()=>{if(typeof repaint==='function')repaint();},()=>{});
    return true;
  }
  root.document?.addEventListener('click',event=>{if(event.target?.closest?.('[data-acid31-boss],[data-acid31-mode],#acid31-close,#acid31-menu,#acid31-pause-menu'))cancel();},true);
  root.document?.addEventListener('change',event=>{if(event.target?.id==='acid31-difficulty')cancel();},true);
  root.addEventListener?.('pagehide',cancel);
  root.CQC_PASS16_ACID_ART=Object.freeze({deferStart,cancel,draw,ready,
    status:()=>({error,pending:pending?{key:pending.key,ticket:pending.ticket}:null,machines:Object.entries(IDS).map(([key,id])=>({key,...(registry?.status(id)||{id,state:'error',error})}))})});
})(globalThis);
