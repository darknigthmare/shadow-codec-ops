/* Native scenery for authored Support simulations; actors, objectives and saves remain in the original module. */
(function(root,factory){
 'use strict';const api=factory(root);
 if(typeof module==='object'&&module.exports)module.exports=api;
 root.CQC_SUPPORT_STAGE_FACTORY=api;
 root.CQC_SUPPORT_STAGES=api.createBridge();
})(typeof globalThis==='object'?globalThis:this,function(root){
 'use strict';
 const GROUND=590,OFFSET=22;
 const OPERATIONS=Object.freeze({
  shadow_relay:{titleID:'mgs1',stageID:'shadow_heliport'},
  big_shell_ai:{titleID:'mgs2',stageID:'big_shell'},
  snake_science:{titleID:'mgs3',stageID:'groznyj'},
  camp_omega:{titleID:'gz',stageID:'camp_omega'},
  xof_marks:{titleID:'gz',stageID:'camp_omega'},
  mother_medical:{titleID:'tpp',stageID:'mother_base_platform'},
  cipher_tapes:{titleID:'tpp',stageID:'okb_zero'},
  patriots_core:{titleID:'mgs4',stageID:'outer_haven'},
  ai_pods:{titleID:'pw',stageID:'mother_base'},
  san_hieronymo:{titleID:'mpo',stageID:'san_hieronymo'},
  acid_lobito:{titleID:'acid',stageID:'lobito'},
  acid2_ego:{titleID:'acid2',stageID:'saintlogic'},
  mobile_gaudi:{titleID:'mobile',stageID:'p27_mobile_warehouse'},
  dite_survivors:{titleID:'survive',stageID:'dite'},
  portable_guests:{titleID:'mpo_plus',stageID:'p27_mpo_plus_industrial'},
  prototype_archive:{titleID:'mgs2',stageID:'arsenal_corridor'}
 });
 function createBridge(dependencies={}){
  const registry=dependencies.registry||root.CQC_STAGE_REGISTRY;
  const renderer=dependencies.renderer||root.CQC_STAGE_LAYERS;
  const document=dependencies.document||root.document;
  const reduced=dependencies.reducedMotion||(()=>{
   if(root.matchMedia?.('(prefers-reduced-motion: reduce)').matches)return true;
   try{const settings=JSON.parse(root.localStorage?.getItem('cqc-v044-profile')||'{}').settings;return settings?.motion===false||settings?.reducedMotion===true;}catch{return false;}
  });
  const bindings=new Map(),frames=new WeakMap(),redraws=new WeakMap();
  const diagnostics={backgrounds:0,foregrounds:0,loadingPreviews:0,launchWaits:0,launchErrors:0,launchReady:0,lastBackground:null,lastForeground:null};
  for(const [operationID,spec] of Object.entries(OPERATIONS)){
   const resolved=registry?.resolve(spec.stageID,{titleID:spec.titleID,allowVR:spec.simulation===true});
   if(resolved)bindings.set(operationID,{operationID,titleID:spec.titleID,stageId:resolved.id,
    label:spec.simulation?'SIMULATION — GRILLE VR':resolved.name,simulation:spec.simulation===true,
    noCanonClaim:true,groundY:GROUND,translationY:OFFSET,incarnation:resolved.native.incarnation});
  }
  let pending=null,message;
  function resolveOperation(operation){
   const record=bindings.get(operation?.id);
   return record&&operation.titleId===record.titleID?{...record}:null;
  }
  function ready(record){
   const status=record&&renderer?.status(record.stageId);
   return status?.approved===true&&status.state==='ready'&&!(status.errors||[]).length;
  }
  function preload(operation,options={}){
   const record=resolveOperation(operation);
   return record&&renderer?renderer.preload(record.stageId,options):Promise.resolve(false);
  }
  function loadingUI(text,busy=false){
   if(dependencies.loadingUI)return dependencies.loadingUI(text,busy);
   const button=document?.getElementById?.('briefStart');if(button){button.disabled=busy;button.setAttribute('aria-busy',String(busy));}
   if(!document?.createElement)return;
   if(!message){message=document.createElement('p');message.id='supportStageLoading';message.setAttribute('role','status');message.style.cssText='font-size:12px;color:#aab6c2;min-height:1.5em';document.getElementById('briefText')?.after(message);}
   message.textContent=text;message.hidden=!text;
  }
  function cancelPending(){if(pending)pending.cancelled=true;pending=null;loadingUI('',false);}
  function deferLaunch(operation,resume){
   const record=resolveOperation(operation);
   if(ready(record)){cancelPending();return false;}
   cancelPending();diagnostics.launchWaits++;
   const request={operationID:operation?.id,cancelled:false};pending=request;
   loadingUI('Chargement du décor…',true);
   preload(operation,{retry:true}).then(loaded=>{
    if(request.cancelled||pending!==request)return;
    if(!loaded||!ready(record)){pending=null;diagnostics.launchErrors++;loadingUI('Décor indisponible. Relancez pour réessayer.',false);return;}
    pending=null;diagnostics.launchReady++;loadingUI('',false);resume();
   }).catch(()=>{if(!request.cancelled&&pending===request){pending=null;diagnostics.launchErrors++;loadingUI('Décor indisponible. Relancez pour réessayer.',false);}});
   return true;
  }
  function drawLoading(ctx,record){
   ctx.save();ctx.fillStyle='#0b1722';ctx.fillRect(0,0,1280,720);ctx.fillStyle='#aab6c2';ctx.font='700 18px ui-monospace';ctx.textAlign='center';ctx.fillText('CHARGEMENT DU DÉCOR…',640,360);ctx.restore();
   if(ctx.canvas?.dataset){ctx.canvas.dataset.stageArtState='loading';ctx.canvas.dataset.stageId=record?.stageId||'';}
   diagnostics.loadingPreviews++;
  }
  function drawBackground(ctx,operation,frame=0,options={}){
   const record=resolveOperation(operation);frames.delete(ctx);
   if(!record||!ready(record)){
    drawLoading(ctx,record);
    if(record&&typeof options.redraw==='function'){
     const canvas=ctx.canvas,previous=redraws.get(canvas);
     if(previous?.operationID!==operation.id){
      const request={operationID:operation.id};redraws.set(canvas,request);
      preload(operation).then(loaded=>{if(loaded&&redraws.get(canvas)===request&&canvas?.isConnected!==false){redraws.delete(canvas);options.redraw();}}).catch(()=>{});
     }
    }else if(record)preload(operation).catch(()=>{});
    return false;
   }
   if(ctx.canvas)redraws.delete(ctx.canvas);
   const value={camera:0,zoom:1,time:Number.isFinite(frame)?frame/60:0,motion:!reduced(),preview:options.preview===true};
   // Fill the translated top strip explicitly; native plane origin remains registered at y=568+22.
   ctx.save();ctx.fillStyle='#0b1722';ctx.fillRect(0,0,1280,OFFSET);ctx.translate(0,OFFSET);
   const drawn=renderer.drawBackground(ctx,record.stageId,value);ctx.restore();
   if(!drawn){drawLoading(ctx,record);return false;}
   const snapshot={operationID:operation.id,stageID:record.stageId,canvasID:ctx.canvas?.id||'',groundY:GROUND,translationY:OFFSET,frame,time:value.time,preview:value.preview,reducedMotion:!value.motion};
   frames.set(ctx,{operationID:operation.id,record,value,snapshot});diagnostics.backgrounds++;diagnostics.lastBackground=snapshot;
   if(ctx.canvas?.dataset){ctx.canvas.dataset.stageId=record.stageId;ctx.canvas.dataset.stageArtState='ready';ctx.canvas.dataset.stageGroundY=String(GROUND);ctx.canvas.dataset.stageTranslationY=String(OFFSET);ctx.canvas.dataset.stageSimulation=String(record.simulation);}
   return true;
  }
  function drawForeground(ctx,operation){
   const marker=frames.get(ctx);if(!marker||marker.operationID!==operation?.id)return false;
   frames.delete(ctx);ctx.save();ctx.translate(0,OFFSET);
   const drawn=renderer.drawForeground(ctx,marker.record.stageId,marker.value);ctx.restore();
   if(drawn){diagnostics.foregrounds++;diagnostics.lastForeground={...marker.snapshot};}
   return drawn;
  }
  function caption(operation){const record=resolveOperation(operation);return record?record.label+(record.simulation?'':' · SIMULATION TACTIQUE'):'';}
  return {version:'cqc-support-existing-native-stage-binding/1',resolveOperation,preload,deferLaunch,cancelPending,drawBackground,drawForeground,caption,
   diagnostics:()=>({...diagnostics,lastBackground:diagnostics.lastBackground?{...diagnostics.lastBackground}:null,lastForeground:diagnostics.lastForeground?{...diagnostics.lastForeground}:null}),
   operationBindings:()=>[...bindings.values()].map(value=>({...value}))};
 }
 return {createBridge,OPERATIONS,GROUND,OFFSET};
});
