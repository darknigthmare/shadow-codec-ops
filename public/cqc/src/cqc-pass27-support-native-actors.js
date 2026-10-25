/* Existing native bodies for Support exercises. Simulation, collision and save data stay in the module. */
(function(root,factory){
 'use strict';const api=factory(root);
 if(typeof module==='object'&&module.exports)module.exports=api;
 root.CQC_SUPPORT_NATIVE_ACTOR_FACTORY=api;
 root.CQC_SUPPORT_NATIVE_ACTORS=api.createBridge();
})(typeof globalThis==='object'?globalThis:this,function(root){
 'use strict';
 const GROUND=590,SCALE=.9;
 const OPERATIONS=Object.freeze({
  shadow_relay:{titleID:'mgs1',uid:'completion44__genome_soldier_44',label:'GENOME SOLDIER'},
  big_shell_ai:{titleID:'mgs2',uid:'completion44__gurlukovich_merc_44',label:'GURLUKOVICH — BIG SHELL'},
  snake_science:{titleID:'mgs3',uid:'completion44__gru_heavy_44',label:'GRU — EXERCICE CQC'},
  camp_omega:{titleID:'gz',uid:'completion44__xof_trooper_44',label:'XOF — EXERCICE TACTIQUE'},
  xof_marks:{titleID:'gz',uid:'completion44__xof_trooper_44',label:'XOF — EXERCICE TACTIQUE'},
  mother_medical:{titleID:'tpp',label:'CIBLES DE SIMULATION'},
  cipher_tapes:{titleID:'tpp',label:'CIBLES DE SIMULATION'},
  patriots_core:{titleID:'mgs4',uid:'archive__haven_trooper',label:'HAVEN TROOPER / FROG'},
  ai_pods:{titleID:'pw',uid:'completion44__msf_soldier_44',label:'MSF — OPPOSITION D’ENTRAÎNEMENT',training:true},
  san_hieronymo:{titleID:'mpo',uid:'completion44__fox_trooper_mpo_44',label:'FOX — PORTABLE OPS'},
  acid_lobito:{titleID:'acid',label:'CIBLES DE SIMULATION'},
  acid2_ego:{titleID:'acid2',uid:'completion44__saintlogic_guard_44',label:'SAINTLOGIC — ARCHIVE DE CONCEPTION',concept:true},
  mobile_gaudi:{titleID:'mobile',label:'CIBLES DE SIMULATION'},
  dite_survivors:{titleID:'survive',uid:'pass19__wanderer_survive',label:'WANDERER — DITE',creature:true},
  portable_guests:{titleID:'mpo_plus',label:'CIBLES DE SIMULATION'},
  prototype_archive:{titleID:'mgs2',uid:'completion44__tengu_soldier_44',label:'TENGU — ARSENAL GEAR'}
 });
 function createBridge(dependencies={}){
  const sprites=dependencies.sprites||root.CQC_COMBAT_SPRITES,machines=dependencies.machines||root.CQC_PASS18_MACHINES;
  const stages=dependencies.stages||root.CQC_SUPPORT_STAGES,stageRenderer=dependencies.stageRenderer||root.CQC_STAGE_LAYERS;
  const document=dependencies.document||root.document,storage=dependencies.storage||root.localStorage;
  const wardrobe=dependencies.wardrobe||root.CQC_NATIVE_WARDROBE;
  const choices=dependencies.choices||root.CQC_COSTUMES_PASS17;
  const redraws=new WeakMap(),leadCache=new WeakMap(),enemyAnimations=new WeakMap();
  const diagnostics={nativeEnemyDraws:0,nativeLeadDraws:0,simulationEnemyDraws:0,loadingDraws:0,launchWaits:0,launchErrors:0,launchReady:0,lastEnemy:null,lastLead:null};
  let pending=null,message,previewEpoch=0;
  function resolveEnemy(operation,kind='soldier'){
   const spec=OPERATIONS[operation?.id],valid=spec&&spec.titleID===operation.titleId;
   return {operationID:operation?.id||'',titleID:operation?.titleId||'',uid:valid?spec.uid||null:null,
    label:valid?spec.label:'CIBLES DE SIMULATION',simulation:!valid||!spec.uid,kind,
    training:valid&&spec.training===true,concept:valid&&spec.concept===true,creature:valid&&spec.creature===true,
    noCanonClaim:true,groundY:GROUND,scale:SCALE};
  }
  function selectedLead(fighter){
   if(!fighter?.uid)return fighter;
   if(leadCache.has(fighter))return leadCache.get(fighter);
   let costume=fighter.costume||choices?.chosen?.(0,fighter.uid)||'original';
   // Reuse the existing pinned preference journal. Preparation never calls select or writes it.
   try{
    const saved=JSON.parse(storage?.getItem('cqc-native-wardrobe-journal-v1')||'null');
    const preference=saved?.schema==='cqc.native-wardrobe-journal/1'?saved.slots?.[0]?.[fighter.uid]:null;
    const descriptor=root.CQC_NATIVE_WARDROBE_INDEX?.entries?.find(value=>value.uid===fighter.uid&&value.id===preference?.id);
    if(preference&&wardrobe?.known?.(fighter.uid,preference.id)&&(!preference.metadataSHA256||preference.metadataSHA256===descriptor?.metadata?.sha256||root.CQC_PASS40_SUPPORT_SKULL_MODE?.acceptsJournal?.(fighter,preference,descriptor)===true))costume=preference.id;
   }catch{ /* An unreadable journal remains untouched. */ }
   const selected={...fighter};if(costume==='original')delete selected.costume;else selected.costume=costume;
   leadCache.set(fighter,selected);return selected;
  }
  function resetLead(fighter){if(fighter)leadCache.delete(fighter);return selectedLead(fighter);}
  function originalMachine(fighter){return (!fighter?.costume||fighter.costume==='original')&&machines?.hasComposite?.(fighter)===true;}
  function machineCostume(fighter){return root.CQC_PASS21_MACHINE_COSTUME_RUNTIME?.has?.(fighter)===true;}
  function entry(fighter){return sprites?.getEntry?.(fighter?.uid,fighter)||null;}
  function poseForAction(fighter,action,time=0,entityKey='support-lead'){
   const value=entry(fighter),pose={time,entityKey};
   if(action==='hit'&&value?.actions?.hit)pose.hit=true;
   else if(action==='walk'&&value?.actions?.walk)pose.walk=true;
   else if(action==='jump'&&value?.actions?.jump)pose.jump=true;
   else if(action==='shoot'||action==='punch'){
    const slot=Object.entries(value?.actionMap||{}).find(([,mapped])=>mapped===action)?.[0];
    if(slot&&value?.actions?.[action])Object.assign(pose,{moveSlot:slot,attack:true,animationActive:true});
   }
   const actual=sprites?.actionName?.(pose,value)||'idle';
   return {...pose,action:actual};
  }
  function requests(operation,lead,{preview=false,face=1}={}){
   lead=selectedLead(lead);const values=[];
   if(lead?.uid){
    if(originalMachine(lead)||machineCostume(lead))for(const direction of preview?[face]:[1,-1])values.push({fighter:lead,machine:true,face:direction});
    else if(sprites?.has?.(lead.uid,lead)){
     for(const direction of preview?[face]:[1,-1])for(const action of preview?['idle']:['idle','walk','jump','shoot','hit']){
      const actual=poseForAction(lead,action).action;
      if(!values.some(value=>value.fighter.uid===lead.uid&&value.face===direction&&value.action===actual))values.push({fighter:lead,face:direction,action:actual});
     }
    }else values.push({fighter:lead,missing:true,face});
   }
   if(!preview){
    const enemy=resolveEnemy(operation);
    if(enemy.uid){const fighter={uid:enemy.uid};for(const action of ['walk','hit',enemy.creature?'punch':'shoot'])values.push({fighter,face:-1,action:poseForAction(fighter,action).action});}
   }
   return values;
  }
  function readyRequests(values){return values.length>0&&values.every(value=>{
   if(value.missing)return false;
   if(value.machine){if(machineCostume(value.fighter))return root.CQC_PASS21_MACHINE_COSTUME_RUNTIME?.ready?.(value.fighter,value.face)===true;
    if(value.fighter.uid==='core__cunningham')return machines.ready(value.fighter.uid);
    return machines.ready(machines.physical(value.fighter,value.face));}
   return sprites.status(value.fighter.uid,{...value.fighter,action:value.action,face:value.face}).ready===true;
  });}
  function stageReady(operation){const record=stages?.resolveOperation?.(operation),status=record&&stageRenderer?.status?.(record.stageId);return status?.approved===true&&status.state==='ready'&&!(status.errors||[]).length;}
  function isReady(operation,lead){return stageReady(operation)&&readyRequests(requests(operation,lead));}
  async function prepareLead(lead,options={}){
   lead=selectedLead(lead);
   if(lead?.costume&&wardrobe?.known?.(lead.uid,lead.costume))await wardrobe.ensure(lead.uid,lead.costume,{retry:options.retry===true,publish:true});
   return lead;
  }
  async function preload(operation,lead,options={}){
   lead=await prepareLead(lead,options);
   if(options.isCurrent&&!options.isCurrent())return false;
   const values=requests(operation,lead,options),actors=[...new Map(values.map(value=>[value.fighter.uid+':'+(value.fighter.costume||'original'),value.fighter])).values()];
   sprites?.retainFighters?.(actors);wardrobe?.setActiveFighters?.(actors);
   const loaded=await Promise.all(values.map(value=>value.missing?false:value.machine?
    (machineCostume(value.fighter)?root.CQC_PASS21_MACHINE_COSTUME_RUNTIME.whenReady(value.fighter,options):machines.whenReadyComposite(value.fighter.uid,{face:value.face,retry:options.retry===true})):
    sprites.whenReady(value.fighter.uid,{...value.fighter,action:value.action,face:value.face,retry:options.retry===true})));
   return loaded.every(Boolean)&&readyRequests(values);
  }
  function loadingUI(text,busy=false){
   if(dependencies.loadingUI)return dependencies.loadingUI(text,busy);
   const button=document?.getElementById?.('briefStart');if(button){button.disabled=busy;button.setAttribute('aria-busy',String(busy));}
   if(!document?.createElement)return;
   message=document.getElementById('supportStageLoading')||message;
   if(!message){message=document.createElement('p');message.id='supportStageLoading';message.setAttribute('role','status');message.style.cssText='font-size:12px;color:#aab6c2;min-height:1.5em';document.getElementById('briefText')?.after(message);}
   message.textContent=text;message.hidden=!text;
  }
  function cancelPending(){if(pending)pending.cancelled=true;pending=null;previewEpoch++;loadingUI('',false);}
  function deferLaunch(operation,lead,resume){
   lead=resetLead(lead);if(isReady(operation,lead)){cancelPending();return false;}
   cancelPending();diagnostics.launchWaits++;const request={operationID:operation?.id,cancelled:false};pending=request;
   loadingUI('Chargement du décor et de l’escouade…',true);
   Promise.all([stages.preload(operation,{retry:true}),preload(operation,lead,{retry:true,isCurrent:()=>pending===request&&!request.cancelled})]).then(values=>{
    if(request.cancelled||pending!==request)return;
    if(!values.every(Boolean)||!isReady(operation,lead)){pending=null;diagnostics.launchErrors++;loadingUI('Liaison indisponible. Relancez pour réessayer.',false);return;}
    pending=null;diagnostics.launchReady++;loadingUI('',false);resume();
   }).catch(()=>{if(!request.cancelled&&pending===request){pending=null;diagnostics.launchErrors++;loadingUI('Liaison indisponible. Relancez pour réessayer.',false);}});
   return true;
  }
  function simulationTarget(ctx,x,y,kind,flash=false){
   ctx.save();ctx.translate(x,y);ctx.strokeStyle=flash?'#f2f6ed':kind==='heavy'?'#d9b66a':'#77adaf';ctx.lineWidth=2;
   ctx.fillStyle='#0c233144';ctx.fillRect(-28,-154,56,154);ctx.strokeRect(-28,-154,56,154);
   ctx.beginPath();ctx.moveTo(-28,-154);ctx.lineTo(28,0);ctx.moveTo(28,-154);ctx.lineTo(-28,0);ctx.stroke();
   ctx.beginPath();ctx.arc(0,-82,22,0,Math.PI*2);ctx.moveTo(-37,-82);ctx.lineTo(37,-82);ctx.moveTo(0,-116);ctx.lineTo(0,-48);ctx.stroke();
   ctx.font='700 10px ui-monospace';ctx.textAlign='center';ctx.fillStyle=ctx.strokeStyle;ctx.fillText(kind==='heavy'?'CIBLE RENFORCÉE':'CIBLE VR',0,-168);ctx.restore();
  }
  function drawEnemy(ctx,operation,enemy,frame=0){
   const record=resolveEnemy(operation,enemy.kind);
   if(record.simulation){simulationTarget(ctx,enemy.x,enemy.y,enemy.kind,enemy.flash>0);diagnostics.simulationEnemyDraws++;return true;}
   const fighter={uid:record.uid},maximum=enemy.kind==='heavy'?100:70,previous=enemyAnimations.get(enemy);
   // Read the original cooldown reset; spawning and support-induced delays are not attacks.
   const attackFrame=previous&&previous.cool<=3&&enemy.cool>=maximum-2&&enemy.cool<=maximum?frame:previous?.attackFrame??-Infinity;
   enemyAnimations.set(enemy,{cool:enemy.cool,attackFrame});
   const action=enemy.flash>0?'hit':frame-attackFrame<7?(record.creature?'punch':'shoot'):'walk';
   const pose=poseForAction(fighter,action,frame/60,enemy),options={action:pose.action,face:-1};
   if(!sprites.status(fighter.uid,options).ready){diagnostics.loadingDraws++;return false;}
   const drawn=sprites.draw(ctx,fighter,enemy.x,enemy.y,-1,SCALE,pose);
   if(drawn){diagnostics.nativeEnemyDraws++;diagnostics.lastEnemy={...record,action:pose.action,face:-1,frame,canvasID:ctx.canvas?.id||'',y:enemy.y};}
   return drawn;
  }
  function leadScale(fighter,ctx,y,scale){
   const value=entry(fighter),physical=machines?.physical?.(fighter,1),rawHeight=originalMachine(fighter)?root.CQC_PASS18_MACHINE_DATA?.states?.[physical]?.displayHeight:value?.displayHeight;
   const world=root.CQC_PASS19_WORLD_SCALE?.height?.(fighter,{originalPixels:rawHeight})?.pixels;
   // Box catalog display heights are retained metres. A preserved-framing fallback is
   // still truthy but does not convert them; use the same qualified reference estimate.
   let adjusted=scale;if((!world||world<5)&&rawHeight>0&&rawHeight<5&&fighter.pass19Reference?.worldHeightMeters>0)adjusted*=fighter.pass19Reference.worldHeightMeters*(root.CQC_PASS19_WORLD_SCALE?.pixelsPerMetre||220/1.82)/rawHeight;
   const height=world||rawHeight,maximum=Math.max(24,Math.min((ctx.canvas?.height||720)*.84,y-(ctx.canvas?.height||720)*.08));
   return height>0?Math.min(adjusted,maximum/height):adjusted;
  }
  function drawLead(ctx,fighter,x,y,face=1,scale=SCALE,pose={}){
   fighter=selectedLead(fighter);const action=pose.hit?'hit':pose.jump?'jump':pose.shoot?'shoot':pose.walk?'walk':'idle';
   const selectedPose=poseForAction(fighter,action,pose.time||0,'support-lead');
   const values=requests(null,fighter,{preview:true,face});if(!readyRequests(values)){diagnostics.loadingDraws++;return false;}
   if(!originalMachine(fighter)&&!machineCostume(fighter)&&!sprites.status(fighter.uid,{...fighter,action:selectedPose.action,face}).ready){diagnostics.loadingDraws++;return false;}
   const adjusted=leadScale(fighter,ctx,y,scale);
   const drawn=machineCostume(fighter)?root.CQC_PASS21_MACHINE_COSTUME_RUNTIME.drawPlayable(ctx,fighter,x,y,face,adjusted,selectedPose):
    originalMachine(fighter)?machines.drawPlayable(ctx,fighter,x,y,face,adjusted,selectedPose):sprites.draw(ctx,fighter,x,y,face,adjusted,selectedPose);
   if(drawn){diagnostics.nativeLeadDraws++;diagnostics.lastLead={uid:fighter.uid,costume:fighter.costume||'original',action:selectedPose.action,face,frame:(pose.time||0)*60,canvasID:ctx.canvas?.id||'',x,y,scale:adjusted,groundY:GROUND};}
   return drawn;
  }
  function drawLeadPreview(ctx,fighter,x,y,face=1,scale=SCALE,pose={},redraw){
   if(drawLead(ctx,fighter,x,y,face,scale,pose))return true;
   const canvas=ctx.canvas,identity=fighter.uid+':'+(selectedLead(fighter)?.costume||'original')+':'+face+':'+(pose.previewKey||'')+':'+previewEpoch;
   if(redraws.get(canvas)?.identity!==identity){const request={identity,epoch:previewEpoch};redraws.set(canvas,request);const current=()=>redraws.get(canvas)===request&&request.epoch===previewEpoch&&canvas?.isConnected!==false;preload(null,fighter,{preview:true,face,isCurrent:current}).then(loaded=>{if(loaded&&current()){redraws.delete(canvas);redraw?.();}},()=>{});}
   ctx.save();ctx.font='700 13px ui-monospace';ctx.fillStyle='#aab6c2';ctx.textAlign='center';ctx.fillText('LIAISON DU COMBATTANT…',x,y-100);ctx.restore();return false;
  }
  function drawContact(ctx,support,x,y){
   // These are remote contacts. A Codec relay card never implies a physical combatant on stage.
   ctx.save();ctx.translate(x,y);ctx.fillStyle='#07151fe8';ctx.fillRect(-112,-105,224,88);ctx.strokeStyle=support.color||'#7aafbd';ctx.lineWidth=2;ctx.strokeRect(-112,-105,224,88);
   ctx.textAlign='center';ctx.fillStyle='#9facba';ctx.font='700 10px ui-monospace';ctx.fillText('LIAISON DISTANTE',0,-86);ctx.fillStyle='#eef1eb';ctx.font='800 11px ui-monospace';ctx.fillText(support.name,0,-61,204);ctx.fillStyle=support.color||'#7aafbd';ctx.fillText(support.classLabel,0,-36);ctx.restore();
  }
  function caption(operation){return resolveEnemy(operation).label;}
  function operationBindings(){return Object.keys(OPERATIONS).map(id=>resolveEnemy({id,titleId:OPERATIONS[id].titleID}));}
  return {version:'cqc-support-existing-native-actors/1',resolveEnemy,selectedLead,resetLead,requests,preload,isReady,deferLaunch,cancelPending,drawEnemy,leadScale,drawLead,drawLeadPreview,drawContact,caption,operationBindings,
   diagnostics:()=>({...diagnostics,lastEnemy:diagnostics.lastEnemy?{...diagnostics.lastEnemy}:null,lastLead:diagnostics.lastLead?{...diagnostics.lastLead}:null})};
 }
 return {createBridge,OPERATIONS,GROUND,SCALE};
});
