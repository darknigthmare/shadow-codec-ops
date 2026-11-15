/* RAY Arsenal pilot: edition-scoped R-00 native costume and decoded launch gate. */
(function(root,factory){'use strict';const api=factory(root);if(typeof module==='object'&&module.exports)module.exports=api;root.CQC_PASS31_R00_COSTUME_LINK=api;})(globalThis,function(root){
 'use strict';
 const UID='core__raiden',COSTUME='mgr_r00_standard';
 const linked=new WeakSet(),physicalAliases=Object.freeze({jump:'walk-A',hit:'guard',reload:'crouch-recovery'});
 const metrics={drawn:0,pendingDraws:0,gateRequests:0,gateFailures:0,byAction:{},last:null};
 let installed=false,pending=null,dialog=null,focusBefore=null,original=null;
 const renderer=()=>root.CQC_COMBAT_SPRITES;
 const fighter=()=>({uid:UID,costume:COSTUME});
 function owns(def){return def?.id==='ray_mgR'&&def.ep==='REVENGEANCE'&&def.hero==='RAIDEN'&&def.weapon==='blade';}
 function entry(){return renderer()?.getEntry(UID,{costume:COSTUME})||null;}
 function requirements(def){
  if(!owns(def))return original?.requirements(def)||[];
  const value=entry();if(!value)return[];
  return['idle','walk','guard','hit','ko','jump','blade','parry','recover'].filter(action=>value.actions?.[action]).flatMap(action=>[1,-1].map(face=>({uid:UID,costume:COSTUME,action,face})));
 }
 function ready(def){
  if(!owns(def))return original?.ready(def)||false;
  const list=requirements(def);return installed&&list.length>0&&list.every(item=>renderer()?.status(UID,item)?.ready===true);
 }
 function sources(def){
  if(!owns(def))return original?.sources(def)||[];
  const value=entry(),files=new Map();if(!value)return[];
  for(const item of requirements(def)){
   const groups=item.face===value.facing?value.actions:value.oppositeActions;
   for(const frame of groups?.[item.action]?.frames||[])files.set(frame.file,{file:frame.file,sha256:frame.sha256});
  }
  return[...files.values()];
 }
 function poseFor(state){
  if(!owns(state?.def))return original?.poseFor(state)||null;
  // Reuse the original weak-clock, movement, HP, reload, parry and shot detection.
  const selected=original?.poseFor(state),value=entry();if(!selected||!value)return null;
  const action=selected.action==='reload'?'recover':value.actions[selected.action]?selected.action:'idle';
  const pose={...selected.pose};
  if(selected.action==='reload'){pose.attack=true;pose.animationActive=true;pose.moveSlot='arsenal_recover';}
  return{...selected,entry:value,action,pose,costume:COSTUME,physicalPoseAlias:physicalAliases[selected.desired]||null};
 }
 function calibration(face){return root.CQC_PASS31_RAIDEN_R00?.calibration(fighter(),face,200)||null;}
 function draw(context,state){
  if(!owns(state?.def))return original?.draw(context,state)||false;
  const selected=poseFor(state),cal=selected&&calibration(selected.face),player=state?.player;
  if(!installed||!selected||!cal||!context||!player){metrics.pendingDraws++;return true;}
  const x=Number.isFinite(player.x)?player.x:0,y=Number.isFinite(player.y)?player.y:0;
  const painted=renderer().draw(context,fighter(),x+cal.xOffset,y+cal.yOffset,selected.face,cal.scale,selected.pose);
  if(painted){metrics.drawn++;metrics.byAction[selected.action]=(metrics.byAction[selected.action]||0)+1;metrics.last={costume:COSTUME,action:selected.action,desired:selected.desired,physicalPoseAlias:selected.physicalPoseAlias,face:selected.face,scale:cal.scale,uprightArenaUnits:200};}
  else metrics.pendingDraws++;
  // Correct native body stays absent while decoding, never replaced with the black body.
  return true;
 }
 function hideDialog(){if(dialog){dialog.remove();dialog=null;}if(focusBefore?.isConnected)focusBefore.focus();focusBefore=null;}
 function cancelOwn(){if(pending)pending.cancelled=true;pending=null;hideDialog();}
 function cancelPendingLaunch(){cancelOwn();original?.cancelPendingLaunch();}
 function showDialog(token,failed=false){
  if(!root.document?.body)return;
  if(!dialog){
   focusBefore=root.document.activeElement;dialog=root.document.createElement('div');dialog.setAttribute('role','dialog');dialog.setAttribute('aria-modal','true');dialog.setAttribute('aria-label','Transmission de Raiden');
   dialog.style.cssText='position:fixed;inset:0;z-index:10000;display:grid;place-items:center;background:#030e15e8;color:#e7dcc0;font:14px system-ui';
   const box=root.document.createElement('div');box.style.cssText='width:min(420px,88vw);padding:28px;background:#0b1b24;border:1px solid #789486';
   const heading=root.document.createElement('h2');heading.textContent='Transmission';heading.style.margin='0 0 14px';
   const note=root.document.createElement('p');note.dataset.pilotNote='';note.setAttribute('aria-live','polite');
   const retry=root.document.createElement('button');retry.textContent='Réessayer';retry.dataset.pilotRetry='';retry.style.cssText='padding:10px 16px;margin-right:10px';
   const cancel=root.document.createElement('button');cancel.textContent='Retour';cancel.dataset.pilotCancel='';cancel.style.cssText='padding:10px 16px';
   retry.onclick=()=>{if(pending===token)loadToken(token,true);};cancel.onclick=cancelPendingLaunch;
   box.append(heading,note,retry,cancel);dialog.append(box);root.document.body.append(dialog);cancel.focus();
   dialog.addEventListener('keydown',event=>{
    if(event.key==='Escape'){event.preventDefault();cancelPendingLaunch();}
    if(event.key==='Tab'){const buttons=[...dialog.querySelectorAll('button')].filter(button=>!button.hidden);if(!buttons.length)return;const index=buttons.indexOf(root.document.activeElement);event.preventDefault();buttons[(index+(event.shiftKey?-1:1)+buttons.length)%buttons.length].focus();}
   });
  }
  dialog.querySelector('[data-pilot-note]').textContent=failed?'La transmission est interrompue. Réessayer ou revenir à la sélection.':'Préparation de Raiden · Corps standard.';
  dialog.querySelector('[data-pilot-retry]').hidden=!failed;
 }
 async function loadToken(token,retry=false){
  if(token.cancelled||pending!==token)return;showDialog(token,false);
  const list=requirements(token.def);
  if(!installed||!list.length){token.error='Native R-00 costume unavailable';metrics.gateFailures++;showDialog(token,true);return;}
  renderer().retainFighters([fighter()]);let success=false;
  try{const values=await Promise.all(list.map(item=>renderer().whenReady(UID,{...item,retry})));success=values.every(Boolean)&&ready(token.def);}catch(error){token.error=String(error?.message||error);}
  if(token.cancelled||pending!==token)return;
  if(!success){metrics.gateFailures++;showDialog(token,true);return;}
  pending=null;hideDialog();token.resume();
 }
 function deferLaunch(def,resume,mode='combat'){
  if(!owns(def)){cancelOwn();return original?.deferLaunch(def,resume,mode)||false;}
  if(ready(def)){renderer().retainFighters([fighter()]);return false;}
  const key=String(def.id)+':'+mode+':'+COSTUME;
  if(pending?.key===key&&!pending.cancelled)return true;
  cancelPendingLaunch();const token={key,def,resume:typeof resume==='function'?resume:()=>{},cancelled:false};pending=token;metrics.gateRequests++;loadToken(token);return true;
 }
 function coverage(data){
  return(original?.coverage(data)||[]).map(value=>{
   const def=data?.machines?.find(item=>item.id===value.id);if(!owns(def))return value;
   return{...value,costume:COSTUME,incarnation:entry()?.incarnation||null,admitted:!!entry(),ready:ready(def),sources:sources(def),missingNativePhysicalPoses:Object.keys(physicalAliases),physicalPoseAliases:{...physicalAliases},nativePhysicalPoseCount:16,uprightPresentationPixels:200,canonicalBodyHeightCertified:false};
  });
 }
 function status(){return{...original?.status(),r00:{installed,uid:UID,costume:COSTUME,pending:pending?{key:pending.key,cancelled:pending.cancelled,error:pending.error||null}:null,metrics:JSON.parse(JSON.stringify(metrics)),physicalPoseAliases:{...physicalAliases},physicalActorChanged:false,sourcePixelsChanged:false,otherIncarnationsChanged:false}};}
 function install(){
  const pilot=root.CQC_PASS27_ARSENAL_NATIVE_PLAYER;
  if(pilot&&linked.has(pilot))return status();
  if(!pilot||!renderer()?.getEntry)return{installed:false,reason:'native-player-unavailable'};
  if(!entry())root.CQC_PASS31_RAIDEN_R00?.install();
  if(!entry())return{installed:false,reason:'r00-costume-unavailable'};
  original={};for(const name of ['requirements','ready','sources','poseFor','draw','cancelPendingLaunch','deferLaunch','coverage','status'])original[name]=pilot[name].bind(pilot);
  for(const[name,value]of Object.entries({requirements,ready,sources,poseFor,draw,cancelPendingLaunch,deferLaunch,coverage,status}))pilot[name]=value;
  linked.add(pilot);installed=true;return status();
 }
 root.addEventListener?.('pagehide',cancelPendingLaunch);
 return{version:'31.1',uid:UID,costume:COSTUME,owns,requirements,ready,sources,poseFor,draw,calibration,deferLaunch,cancelPendingLaunch,coverage,status,install};
});
