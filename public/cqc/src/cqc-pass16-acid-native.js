/* Native Ac!d machine presentation. Decoding precedes the original start function. */
(function(root){
  'use strict';
  const IDS=Object.freeze({kodoque:'kodoque_acid_psp2004',chaioth:'chaioth_acid2_psp2005'});
  let registry=null,definitions=null,error=null,pending=null,serial=0,panel=null,returnFocus=null;
  const loads=new Map();
  try{definitions=root.CQC_MACHINE_PARTS.normalizeCatalog(root.CQC_MACHINE_PARTS_CATALOG);if(definitions.size!==64)throw Error('Le registre partagé des machines est incomplet');registry=root.CQC_MACHINE_PARTS.create(root.CQC_MACHINE_PARTS_CATALOG,root.CQC_PASS18_MACHINE_RENDERER_OPTIONS||{});}catch(e){error=String(e?.message||e);}
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
  const identity=Object.freeze([1,0,0,1,0,0]);
  // Pure reads: simulation time belongs to AC!D. Render, lock-on and collision
  // consume the same source-part transforms; getters never advance the servo.
  function eventFor(state,spec={}){
    const events=state?.machineEvents||[],specific=Number.isFinite(spec.machineEventFrame)?events.find(e=>e.startedFrame===spec.machineEventFrame):null;
    return specific||events.find(e=>e.age>=e.warn&&e.age<e.warn+e.active)||events.filter(e=>e.age<e.warn).at(-1)||events.at(-1)||null;
  }
  function supportPose(state,key,base,event){
    if(key!=='chaioth'||event?.kind!=='stomp'||event.warn<=0)return base;
    const progress=Math.max(0,Math.min(1,event.age/event.warn)),ease=t=>t*t*(3-2*t),
      lift=progress<.65?ease(progress/.65)*26:26*(1-ease((progress-.65)/.35));
    if(lift<1e-8)return base;
    const side=event.sources?.[0]===1?'far':'near',machine=definitions.get(IDS[key]),
      shin=machine.parts.find(p=>p.id===side+'_shin'),foot=machine.parts.find(p=>p.id===side+'_foot');
    const u=shin.offset,v=foot.offset,a=Math.hypot(...u),b=Math.hypot(...v),target=[u[0]+v[0],u[1]+v[1]+lift],
      distance=Math.hypot(...target),clamp=n=>Math.max(-1,Math.min(1,n)),
      bend=Math.acos(clamp((distance*distance-a*a-b*b)/(2*a*b))),
      upper=(Math.atan2(target[1],target[0])-Math.atan2(b*Math.sin(bend),a+b*Math.cos(bend))-Math.atan2(u[1],u[0]))*180/Math.PI,
      lower=(bend-(Math.atan2(v[1],v[0])-Math.atan2(u[1],u[0])))*180/Math.PI;
    // Fixed source lengths, one support stays planted. Decorative channels are
    // absent from this AC!D pose; this mechanical telegraph survives reduced motion.
    return {...base,reducedMotion:false,channels:{...base.channels,[side+'Swing']:upper,[side+'Knee']:lower,[side+'Foot']:-upper-lower},acidMechanicalStomp:{side,lift}};
  }
  function pose(state,key,spec={}){
    key=state?.boss||key;const id=IDS[key],adapter=root.CQC_PASS16_MACHINE_POSE?.acidPose(state,key);if(!id||!adapter)return null;
    const event=eventFor(state,spec),base=supportPose(state,key,adapter,event),bridge=root.CQC_PASS18_MACHINES,presentationState=state?{...state,events:state.machineEvents||[]}:state;
    if(!event||!bridge?.mechanicalAimPose)return root.CQC_PASS28_RIG_SETUP?.presentationPose(id,base,presentationState)||base;
    const selected={...event,...spec,kind:spec.kind||event.kind,sources:spec.sources||event.sources};
    const current=bridge.mechanicalAimPose(id,base,presentationState,identity,selected);
    if(key==='kodoque'){
      // Two separate source sockets solve their own angle to the locked target.
      const near=bridge.mechanicalAimPose(id,base,presentationState,identity,{...selected,sources:[0]}),far=bridge.mechanicalAimPose(id,base,presentationState,identity,{...selected,sources:[1]});
      const channels={...current.channels};for(const [label,value] of [['Near',near],['Far',far]])for(const name of ['Aim','RecoilX','RecoilY'])channels['pass32Kodoque'+label+name]=value.channels['pass32Kodoque'+label+name];
      return {...current,channels};
    }
    return current;
  }
  function sourcePoint(state,key,descriptor,spec={}){
    key=state?.boss||key;const machine=definitions?.get(IDS[key]),current=pose(state,key,spec);if(!machine||!current||!descriptor)return null;
    return root.CQC_PASS28_MACHINE_GEOMETRY?.sourcePoint(machine,root.CQC_MACHINE_PARTS,current,descriptor)||null;
  }
  function target(state,key,index=state?.target||0,phase=state?.phase||1){
    key=state?.boss||key;const descriptors=root.CQC_PASS28_RIG_SETUP?.targetParts?.()?.[key];
    const slot=phase===1?index%2:key==='kodoque'?2:index===1?2:3;
    return sourcePoint(state,key,descriptors?.[slot]);
  }
  function weaponVector(state,key,spec={}){
    key=state?.boss||key;const id=IDS[key],current=pose(state,key,spec);if(!id||!current)return null;
    const kind=spec.kind||eventFor(state,spec)?.kind||'shot';
    return root.CQC_PASS18_MACHINES?.mechanicalWeaponVector(id,current,identity,{...spec,kind})||null;
  }
  function beam(state,key,hazard){
    const v=weaponVector(state,key,{...hazard.nativeWeapon,machineEventFrame:hazard.machineEventFrame});
    if(!v?.axisVisible||!Number.isFinite(v.angle))return null;
    return {from:{x:v.x,y:v.y},to:{x:v.x+Math.cos(v.angle)*1400,y:v.y+Math.sin(v.angle)*1400},radius:hazard.radius||8,part:v.part,angle:v.angle};
  }
  function rayHitsRect(ray,rect){
    if(!ray||![rect.x,rect.y,rect.w,rect.h].every(Number.isFinite))return false;
    const dx=ray.to.x-ray.from.x,dy=ray.to.y-ray.from.y,pad=Math.max(0,ray.radius||0);let low=0,high=1;
    for(const [start,delta,min,max] of [[ray.from.x,dx,rect.x-pad,rect.x+rect.w+pad],[ray.from.y,dy,rect.y-pad,rect.y+rect.h+pad]]){
      if(Math.abs(delta)<1e-10){if(start<min||start>max)return false;continue}
      let a=(min-start)/delta,b=(max-start)/delta;if(a>b)[a,b]=[b,a];low=Math.max(low,a);high=Math.min(high,b);if(low>high)return false;
    }return high>=0&&low<=1;
  }
  function geometry(state,key){
    key=state?.boss||key;const current=pose(state,key),machine=definitions?.get(IDS[key]);if(!current||!machine)return null;
    return {schema:'cqc.pass34.acid-native-geometry/1',machineID:IDS[key],catalogCount:definitions.size,frame:current.frame,
      targets:[0,1].map(index=>target(state,key,index,state?.phase||1)),
      weapon:weaponVector(state,key,{kind:state?.attackKind==='rail'?'rail':state?.attackKind==='laser'?'beam':'shot'}),
      parts:[...root.CQC_MACHINE_PARTS.pose(machine,current)].map(([part,p])=>({part,matrix:p.matrix.slice(),visible:p.visible,opacity:p.opacity})),
      absolute1to1Certified:false};
  }
  function draw(context,state,key,repaint){
    key=state?.boss||key;if(!IDS[key])return false;
    if(ready(key)){
      const adapter=pose(state,key);
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
  root.CQC_PASS16_ACID_ART=Object.freeze({deferStart,cancel,draw,ready,pose,sourcePoint,target,weaponVector,beam,rayHitsRect,geometry,
    status:()=>({error,catalogCount:definitions?.size||0,pending:pending?{key:pending.key,ticket:pending.ticket}:null,machines:Object.entries(IDS).map(([key,id])=>({key,...(registry?.status(id)||{id,state:'error',error})}))})});
})(globalThis);
