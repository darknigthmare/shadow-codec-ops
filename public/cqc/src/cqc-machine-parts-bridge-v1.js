/* Core native machine presentation and cold-load gate; never writes combat state or saves. */
(function(root,factory){
  'use strict';
  const api=factory(root);
  if(typeof module==='object'&&module.exports)module.exports=api;
  if(root?.document)root.CQC_MACHINE_PARTS_BRIDGE=api.createBridge();
})(typeof globalThis!=='undefined'?globalThis:this,function(root){
  'use strict';
  const IDS=Object.freeze({rex:'rex_mgs1_ps1',ray:'ray_mgs2_arsenal'});
  const HERO=Object.freeze({rex:'solid',ray:'raiden_mgs2'});
  const clone=(value)=>JSON.parse(JSON.stringify(value));
  function resolveEncounter(options){
    if(!options||!['boss','chronicle'].includes(options.mode)||options.objective||options.relay)return null;
    const id=options.encounter||(options.mode==='boss'?options.bossId:null);
    if(!Object.hasOwn(IDS,id))return null;
    // Direct boss selection carries bossId and is normalized by createMatch.
    // Chronicle/replay encounters already carry their fixed protagonist/opponent.
    if(options.mode==='chronicle'&&(options.player!==HERO[id]||options.opponent!==id))return null;
    return id;
  }
  function defaultReduced(){
    if(root.matchMedia?.('(prefers-reduced-motion: reduce)').matches||root.document?.documentElement?.classList.contains('cqc-reduced-motion')||root.document?.body?.classList.contains('reduced-motion'))return true;
    try{
      if(JSON.parse(root.localStorage?.getItem('cqc-versus.profile.v1')||'{}')?.presentation?.reducedMotion===true)return true;
      const old=JSON.parse(root.localStorage?.getItem('cqc-v044-profile')||'{}')?.settings;
      return old?.motion===false||old?.reducedMotion===true;
    }catch(_){return false;}
  }
  function createBridge(dependencies={}){
    const catalog=dependencies.catalog||root.CQC_MACHINE_PARTS_CATALOG;
    const factory=dependencies.factory||root.CQC_MACHINE_PARTS;
    const reduced=dependencies.reducedMotion||defaultReduced;
    const loads=new Map(),portraits=new WeakMap();
    let registry=dependencies.registry||null,machines=null,initError=null,pendingLaunch=null,serial=0;
    try{
      if(!registry){if(!factory?.create||!catalog)throw Error('Catalogue des pièces indisponible');registry=factory.create(catalog,dependencies.rendererOptions||{});}
      if(factory?.normalizeCatalog&&catalog)machines=factory.normalizeCatalog(catalog);
    }catch(error){initError=String(error?.message||error);}
    function loadingUI(){
      if(dependencies.loadingUI)return dependencies.loadingUI;
      const doc=root.document;
      if(!doc?.createElement)return{show(){},error(){},hide(){}};
      let overlay,message,retry,cancel,previousFocus;
      function ensure(){
        if(overlay)return;
        overlay=doc.createElement('div');overlay.id='cqc-machine-parts-loading';overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');overlay.setAttribute('aria-label','Chargement des pièces de la machine');
        overlay.style.cssText='position:fixed;inset:0;z-index:10001;display:flex;align-items:center;justify-content:center;background:#040b10f5;color:#e9efdd;font:16px system-ui,sans-serif';
        const panel=doc.createElement('div');panel.style.cssText='width:min(90vw,440px);padding:30px;text-align:center';
        message=doc.createElement('p');message.setAttribute('aria-live','polite');retry=doc.createElement('button');retry.textContent='RÉESSAYER';cancel=doc.createElement('button');cancel.textContent='ANNULER';
        for(const button of [retry,cancel])button.style.cssText='padding:12px 18px;margin:8px;background:#142630;color:#eff3dd;border:1px solid #79918b;font:inherit;cursor:pointer';
        panel.append(message,retry,cancel);overlay.append(panel);
        overlay.addEventListener('keydown',event=>{
          if(event.key==='Escape'){event.preventDefault();cancel.click();}
          if(event.key==='Tab'){const buttons=retry.hidden?[cancel]:[retry,cancel];const i=buttons.indexOf(doc.activeElement);event.preventDefault();buttons[(i+(event.shiftKey?-1:1)+buttons.length)%buttons.length].focus();}
        });
      }
      return{
        show(onCancel){ensure();if(!overlay.isConnected){previousFocus=doc.activeElement;doc.body.append(overlay);}message.textContent='Chargement des pièces articulées…';retry.hidden=true;retry.onclick=null;cancel.onclick=onCancel;cancel.focus();},
        error(onRetry,onCancel){ensure();message.textContent='Les pièces de la machine n’ont pas pu être chargées.';retry.hidden=false;retry.onclick=onRetry;cancel.onclick=onCancel;retry.focus();},
        hide(){overlay?.remove();if(previousFocus?.isConnected)previousFocus.focus();previousFocus=null;}
      };
    }
    const ui=loadingUI();
    function nativeStatus(id){
      if(initError||!registry)return{id,state:'error',error:initError||'Renderer indisponible',pins:[]};
      try{return registry.status(id);}catch(error){return{id,state:'error',error:String(error?.message||error),pins:[]};}
    }
    function ready(id){return!!registry?.ready(id)&&!initError;}
    function ensure(id,{retry=false}={}){
      if(ready(id))return Promise.resolve(nativeStatus(id));
      if(loads.has(id)&&!retry)return loads.get(id).promise;
      if(initError||!registry)return Promise.reject(Error(initError||'Renderer indisponible'));
      if(retry&&loads.has(id)){loads.get(id).controller.abort();loads.delete(id);}
      const controller=new AbortController(),record={controller,promise:null};
      record.promise=registry.load(id,{signal:controller.signal,reload:retry}).finally(()=>{if(loads.get(id)===record)loads.delete(id);});
      // A preview may request a load without a launch awaiting it. Its failure is a stable placeholder.
      record.promise.catch(()=>{});loads.set(id,record);return record.promise;
    }
    function cancelPendingLaunch(){
      const request=pendingLaunch;if(!request)return false;
      request.cancelled=true;pendingLaunch=null;
      const load=loads.get(request.mapped);if(load){load.controller.abort();loads.delete(request.mapped);}
      ui.hide();return true;
    }
    function deferCoreLaunch(options,resume){
      const encounter=resolveEncounter(options),mapped=encounter?IDS[encounter]:null;
      const key=mapped?JSON.stringify(options):null;
      if(pendingLaunch&&(!mapped||pendingLaunch.key!==key))cancelPendingLaunch();
      if(!mapped||ready(mapped)){if(pendingLaunch)cancelPendingLaunch();return false;}
      if(pendingLaunch?.key===key)return true;
      const request={mapped,key,options:clone(options),resume,cancelled:false,ticket:++serial};pendingLaunch=request;
      const cancel=()=>{if(pendingLaunch===request)cancelPendingLaunch();};
      async function attempt(retry){
        if(request.cancelled||pendingLaunch!==request)return;
        ui.show(cancel);
        try{await ensure(mapped,{retry});}
        catch(_){if(!request.cancelled&&pendingLaunch===request)ui.error(()=>attempt(true),cancel);return;}
        if(request.cancelled||pendingLaunch!==request)return;
        if(!ready(mapped)){ui.error(()=>attempt(true),cancel);return;}
        pendingLaunch=null;ui.hide();request.resume(request.options);
      }
      attempt(false);return true;
    }
    function placeholder(ctx,state,portrait=false){
      const id=state?.boss?.id,status=nativeStatus(IDS[id]);
      ctx.save();
      try{
        const x=portrait?0:970,y=portrait?0:-410,w=portrait?ctx.canvas.width:530,h=portrait?ctx.canvas.height:370;
        ctx.fillStyle='#0b202bd9';ctx.fillRect(x,y,w,h);ctx.strokeStyle='#6f8b80';ctx.lineWidth=portrait?1:2;ctx.strokeRect(x+2,y+2,w-4,h-4);
        ctx.fillStyle='#d1dfca';ctx.font=(portrait?'10':'16')+'px system-ui,sans-serif';ctx.textAlign='center';
        const failed=status.state==='error'||status.attemptState==='error';ctx.fillText(failed?'PIÈCES NON CHARGÉES':'CHARGEMENT DES PIÈCES…',x+w/2,y+h/2);ctx.fillText(id==='rex'?'METAL GEAR REX':'METAL GEAR RAY',x+w/2,y+h/2+(portrait?18:27));
      }finally{ctx.restore();}
    }
    function drawNative(ctx,state,options={}){
      const encounter=state?.boss?.id;
      if(!Object.hasOwn(IDS,encounter)||options.expectedBoss&&options.expectedBoss!==encounter)return false;
      const mapped=IDS[encounter],motion=options.reducedMotion===true||reduced();
      if(ready(mapped))return registry.drawCore(ctx,state,{...options,id:mapped,reducedMotion:motion});
      const status=nativeStatus(mapped);
      if(status.state!=='error'&&status.attemptState!=='error')ensure(mapped).catch(()=>{});
      placeholder(ctx,state,options.portrait===true);return true;
    }
    function cancelPortrait(canvas){portraits.set(canvas,(portraits.get(canvas)||0)+1);}
    function bounds(state,options={}){
      const encounter=state?.boss?.id,mapped=IDS[encounter],machine=machines?.get(mapped);
      if(!machine||!factory?.corePose||!factory?.pose)return{left:940,top:-480,width:650,height:490};
      const adapter=factory.corePose(state,{...options,id:mapped,reducedMotion:true}),poses=factory.pose(machine,adapter);
      let left=Infinity,top=Infinity,right=-Infinity,bottom=-Infinity;
      for(const p of poses.values()){
        if(!p.visible||p.opacity<=0)continue;
        const source=machine.sources.get(p.source),r=p.rect||[0,0,source.width,source.height],scale=p.imageScale;
        const x=-p.pivot[0]*scale,y=-p.pivot[1]*scale,w=r[2]*scale,h=r[3]*scale,m=p.matrix;
        for(const [cx,cy]of[[x,y],[x+w,y],[x+w,y+h],[x,y+h]]){const px=m[0]*cx+m[2]*cy+m[4],py=m[1]*cx+m[3]*cy+m[5];left=Math.min(left,px);right=Math.max(right,px);top=Math.min(top,py);bottom=Math.max(bottom,py);}
      }
      return Number.isFinite(left)&&right>left&&bottom>top?{left,top,width:right-left,height:bottom-top}:{left:940,top:-480,width:650,height:490};
    }
    function drawPortrait(target,state,repaint){
      const encounter=state?.boss?.id;if(!Object.hasOwn(IDS,encounter))return false;
      const mapped=IDS[encounter],ctx=target.getContext('2d'),ticket=(portraits.get(target)||0)+1;portraits.set(target,ticket);
      if(ready(mapped)){
        const b=bounds(state),scale=Math.min((target.width-12)/b.width,(target.height-12)/b.height);
        ctx.save();try{ctx.translate((target.width-b.width*scale)/2,(target.height-b.height*scale)/2);ctx.scale(scale,scale);ctx.translate(-b.left,-b.top);drawNative(ctx,state,{reducedMotion:true,preview:true,expectedBoss:encounter});}finally{ctx.restore();}
      }else{
        placeholder(ctx,state,true);
        const status=nativeStatus(mapped);
        if(status.state!=='error'&&status.attemptState!=='error')ensure(mapped).then(()=>{if(portraits.get(target)===ticket&&typeof repaint==='function')repaint();},()=>{});
      }
      return true;
    }
    function status(){
      return{schema:'cqc.machine-parts-bridge-status/1',initializationError:initError,pending:pendingLaunch?{encounter:Object.keys(IDS).find(key=>IDS[key]===pendingLaunch.mapped),ticket:pendingLaunch.ticket}:null,machines:Object.values(IDS).map(nativeStatus)};
    }
    if(!dependencies.disableLifecycleListeners){
      root.document?.addEventListener('change',event=>{if(['boss-select','opponent','stage-select','chapter','difficulty','profile-file'].includes(event.target?.id))cancelPendingLaunch();});
      root.addEventListener?.('storage',event=>{if(event.key==='cqc-versus.profile.v1')cancelPendingLaunch();});
      root.addEventListener?.('pagehide',cancelPendingLaunch);
    }
    return{deferCoreLaunch,cancelPendingLaunch,drawNative,drawPortrait,cancelPortrait,resolveEncounter,status,ready:encounter=>ready(IDS[encounter]||encounter)};
  }
  return{createBridge,resolveEncounter,ids:IDS};
});
