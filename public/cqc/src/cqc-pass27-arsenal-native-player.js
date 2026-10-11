/* Arsenal pilots: edition-scoped admitted PNGs, read-only animation and decoded launch gate. */
(function(root,factory){
  'use strict';
  const api=factory(root);
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.CQC_PASS27_ARSENAL_NATIVE_PLAYER=api;
  api.install();
})(globalThis,function(root){
  'use strict';
  const editions=Object.freeze({
    'METAL GEAR|SOLID SNAKE':'core__snake_mg1',
    'METAL GEAR 2|SOLID SNAKE':'core__snake_mg2',
    'MGS1|SOLID SNAKE':'core__solid',
    'MGS2|SOLID SNAKE':'core__snake_mgs2',
    'MGS2|RAIDEN':'core__raiden_mgs2',
    'MGS3|NAKED SNAKE':'core__snake',
    'PORTABLE OPS|NAKED SNAKE':'core__snake_mpo',
    'PEACE WALKER|BIG BOSS':'core__snake_pw',
    'GROUND ZEROES|BIG BOSS':'core__snake_gz',
    'GHOST BABEL|SOLID SNAKE':'core__snake_gb',
    'MGSV|VENOM SNAKE':'core__venom',
    'REVENGEANCE|RAIDEN':'core__raiden',
    'AC!D|SNAKE':'core__snake_acid',
    'AC!D 2|SNAKE':'core__snake_acid2',
    'MGS4|OLD SNAKE':'core__old_snake'
  });
  const contracts=Object.freeze({
    tx55:'METAL GEAR|SOLID SNAKE',metalgeard:'METAL GEAR 2|SOLID SNAKE',
    rex:'MGS1|SOLID SNAKE',harrier:'MGS2|RAIDEN',raymass:'MGS2|RAIDEN',
    shagohod:'MGS3|NAKED SNAKE',raxa:'PORTABLE OPS|NAKED SNAKE',bic:'PORTABLE OPS|NAKED SNAKE',
    pupa:'PEACE WALKER|BIG BOSS',chrysalis:'PEACE WALKER|BIG BOSS',cocoon:'PEACE WALKER|BIG BOSS',
    peacewalker:'PEACE WALKER|BIG BOSS',zeke:'PEACE WALKER|BIG BOSS',gander:'GHOST BABEL|SOLID SNAKE',
    sahel:'MGSV|VENOM SNAKE',ray_mgR:'REVENGEANCE|RAIDEN',grad:'REVENGEANCE|RAIDEN',excelsus:'REVENGEANCE|RAIDEN',
    kodoque:'AC!D|SNAKE',chaioth:'AC!D 2|SNAKE',arsenal_gear:'MGS2|RAIDEN',outer_haven:'MGS4|OLD SNAKE',
    battle_gear:'MGSV|VENOM SNAKE',dwalker:'MGSV|VENOM SNAKE',walker_column:'MGSV|VENOM SNAKE',
    mk2:'MGS4|OLD SNAKE',mk3:'MGS4|OLD SNAKE',gekko:'MGS4|OLD SNAKE',dwarf_swarm:'MGS4|OLD SNAKE',
    hind_d:'MGS1|SOLID SNAKE',m1tank:'MGS1|SOLID SNAKE',bulldozer:'METAL GEAR|SOLID SNAKE'
  });
  // Physical records are edition-scoped; unsupported incarnations retain the 1.8 m comparison reference.
  const statureHeightRecords=Object.freeze({
    core__snake_mg2:Object.freeze({metres:1.78,evidence:'official-primary-directly-observed',sources:Object.freeze(['https://www.konami.com/mg/archive/mg2/chara.html']),scope:'Solid Snake MG2 only; Konami profile178cm, source pose and boots remain visual approximations.'}),
    core__solid:Object.freeze({metres:1.82,evidence:'official-primary-directly-observed',sources:Object.freeze(['https://www.konami.com/mg/archive/mgs/character/ch01.html','https://www.konami.com/mg/archive/mgs/character/images/ch01_status.gif']),scope:'Solid Snake MGS1 only; original Konami status GIF182cm.'}),
    core__snake_pw:Object.freeze({metres:1.88,evidence:'secondary-community-transcription-of-official-profile',sources:Object.freeze(['https://mgcvt.com/character/c74']),scope:'Big Boss Peace Walker only; existing secondary188cm citation, current fetch403. Never applied to other Big Boss eras.'}),
    core__old_snake:Object.freeze({metres:1.80,evidence:'secondary-community-transcription-of-in-game-profile',sources:Object.freeze(['https://mgcvt.com/character/c55']),scope:'Old Snake MGS4 only; secondary transcription of ACT1 MkII DATA PROFILE180cm.'})
  });
  const poseActions=['idle','walk','guard','hit','ko','shoot','reload','jump','blade','parry'];
  const clocks=new WeakMap(),metrics={drawn:0,pendingDraws:0,unsupportedDraws:0,gateRequests:0,gateFailures:0,byUID:{},byAction:{},calibratedDraws:0,fallbackDraws:0,calibrationByUID:{}};
  let installed=false,rejected=[],pending=null,dialog=null,serial=0,focusBefore=null;
  const finite=(value,fallback=0)=>Number.isFinite(value)?value:fallback;
  const loader=()=>root.CQC_COMBAT_SPRITES;
  function resolve(def){
    if(!def||typeof def.ep!=='string'||typeof def.hero!=='string')return null;
    const key=def.ep+'|'+def.hero;
    if(contracts[def.id]&&contracts[def.id]!==key)return null;
    const uid=editions[key];
    return uid&&root.CQC_PASS27_ARSENAL_PLAYER_CATALOG?.entries?.[uid]?uid:null;
  }
  function install(){
    if(installed)return status();
    const raw=root.CQC_PASS27_ARSENAL_PLAYER_CATALOG,renderer=loader();
    if(!raw||!renderer?.configure||!renderer?.validateEntry)return status();
    const entries={};
    for(const [uid,entry] of Object.entries(raw.entries||{})){
      // Private routing keys expose already reviewed actions to the existing renderer.
      // Raw catalogue, UIDs, geometry, source sheets, pivots and physical actor remain unchanged.
      const actionMap={...entry.actionMap};
      for(const action of poseActions)if(entry.actions?.[action])actionMap['arsenal_'+action]=action;
      const routed={...entry,actionMap};
      if(renderer.validateEntry(uid,routed))entries[uid]=routed;else rejected.push(uid);
    }
    const result=renderer.configure({schema:'cqc.combat-sprites/1',entries});
    rejected=[...new Set([...rejected,...result.rejected])];
    installed=result.accepted===Object.keys(editions).length&&rejected.length===0;
    return status();
  }
  function requirements(def){
    const uid=resolve(def),entry=uid&&loader()?.getEntry(uid);
    if(!entry)return [];
    const possible=poseActions.filter(action=>entry.actions[action]&&
      (!['blade'].includes(action)||def.weapon==='blade')&&
      (action!=='shoot'||def.weapon!=='blade'));
    return possible.flatMap(action=>[1,-1].map(face=>({uid,action,face})));
  }
  function ready(def){const list=requirements(def);return installed&&list.length>0&&list.every(item=>loader()?.status(item.uid,item)?.ready===true);}
  function sources(def){
    const files=new Map(),entry=loader()?.getEntry(resolve(def));
    for(const item of requirements(def)){
      const directions=item.face===entry.facing?entry.actions:entry.oppositeActions;
      for(const frame of directions?.[item.action]?.frames||[])files.set(frame.file,{file:frame.file,sha256:frame.sha256});
    }
    return [...files.values()];
  }
  function poseFor(s){
    const uid=resolve(s?.def),entry=uid&&loader()?.getEntry(uid),p=s?.player;
    if(!entry||!p)return null;
    const tick=finite(s.tick),time=tick/60,shots=finite(s.stats?.shots);
    let clock=clocks.get(s);
    if(!clock||tick<clock.tick){clock={tick,x:finite(p.x),shots,walk:false,shotAt:shots>0&&finite(p.cd)>0?tick-(finite(p.cd)>18?48-finite(p.cd):18-finite(p.cd)):-Infinity,action:'idle',actionAt:tick,key:'arsenal-native-pilot:'+ ++serial};clocks.set(s,clock);}
    if(tick>clock.tick){clock.walk=Math.abs(finite(p.x)-clock.x)>.1;clock.x=finite(p.x);clock.tick=tick;}
    if(shots>clock.shots){clock.shotAt=tick;clock.shots=shots;}
    const playerHit=s.fx?.some(effect=>effect.kind==='player'&&finite(effect.t)>0)===true;
    let desired=p.hp<=0?'ko':playerHit?'hit':finite(p.parry)>0?'parry':finite(p.reload)>0?'reload':
      tick-clock.shotAt<18?(s.def.weapon==='blade'?'blade':'shoot'):
      finite(p.vy)!==0?'jump':clock.walk||finite(p.dash)>0?'walk':'idle';
    // A missing dedicated pose remains the same native operator. No guessed edition or CSS body.
    const action=entry.actions[desired]?desired:desired==='parry'&&entry.actions.guard?'guard':'idle';
    if(action!==clock.action){clock.action=action;clock.actionAt=tick;}
    const pose={time,actionTime:Math.max(0,tick-clock.actionAt)/60,entityKey:clock.key,
      ko:action==='ko',hit:action==='hit',jump:action==='jump',walk:action==='walk',guard:action==='guard'};
    if(!['idle','ko','hit','jump','walk','guard'].includes(action)){
      pose.attack=true;pose.animationActive=true;pose.moveSlot='arsenal_'+action;
    }
    return{uid,entry,pose,action,desired,face:p.face===-1?-1:1};
  }
  function statureCalibration(uid,entry,face){
    // Measure decoded native idle once in the renderer; apply its uniform factor to every pose.
    const record=statureHeightRecords[uid]||null,uprightArenaUnits=200*(record?.metres||1.8)/1.8;
    const evidence={uprightArenaUnits,referenceMetres:1.8,referenceArenaUnits:200,
      heightMetres:record?.metres??null,heightEvidence:record?.evidence||'historical-unattested-incarnation-comparison-reference',
      heightSources:record?[...record.sources]:[],heightScope:record?.scope||'No incarnation-specific height source; retain200 arena units for the1.8m comparison reference.',
      canonicalHeightRecordCertified:record?.evidence==='official-primary-directly-observed',canonicalBodyHeightCertified:false};
    let geometry=null;
    try{geometry=loader()?.previewGeometry?.({uid,costume:'original'},{x:0,y:0,width:500,height:500,padding:0},face);}catch(_){/* Geometry unavailable: explicit qualified framing fallback below. */}
    if(geometry&&['scale','standingHeight','x','bodyX','y','floor'].every(key=>Number.isFinite(geometry[key]))&&geometry.scale>0&&geometry.standingHeight>0){
      const scale=uprightArenaUnits*geometry.scale/geometry.standingHeight,relative=scale/geometry.scale;
      return{scale,xOffset:(geometry.x-geometry.bodyX)*relative,yOffset:(geometry.y-geometry.floor)*relative,
        ...evidence,calibrated:true,measurement:geometry.measurement||'decoded-native-preview-geometry'};
    }
    return{scale:uprightArenaUnits/entry.displayHeight,xOffset:0,yOffset:0,...evidence,
      calibrated:false,measurement:'qualified-displayHeight-fallback-no-native-preview-geometry'};
  }
  function draw(c,s){
    const selected=poseFor(s),p=s?.player;
    if(!installed||!selected||!c){metrics.unsupportedDraws++;return false;}
    const {uid,entry,pose,face,action}=selected;
    const calibration=statureCalibration(uid,entry,face),scale=calibration.scale;
    metrics.calibrationByUID[uid]||={};metrics.calibrationByUID[uid][face===1?'right':'left']={...calibration};
    if(calibration.calibrated)metrics.calibratedDraws++;else metrics.fallbackDraws++;
    const painted=loader().draw(c,{uid,costume:'original'},finite(p.x)+calibration.xOffset,finite(p.y)+calibration.yOffset,face,scale,pose);
    if(painted){metrics.drawn++;metrics.byUID[uid]=(metrics.byUID[uid]||0)+1;metrics.byAction[action]=(metrics.byAction[action]||0)+1;}
    else metrics.pendingDraws++;
    // The caller never paints a procedural actor while the same native image decodes.
    return true;
  }
  function hideDialog(){
    if(dialog){dialog.remove();dialog=null;}
    if(focusBefore?.isConnected)focusBefore.focus();focusBefore=null;
  }
  function cancelPendingLaunch(){if(pending)pending.cancelled=true;pending=null;hideDialog();}
  function showDialog(token,failed=false){
    if(!root.document?.body)return;
    if(!dialog){
      focusBefore=root.document.activeElement;
      dialog=root.document.createElement('div');dialog.setAttribute('role','dialog');dialog.setAttribute('aria-modal','true');dialog.setAttribute('aria-label','Transmission de l’opérateur');
      dialog.style.cssText='position:fixed;inset:0;z-index:10000;display:grid;place-items:center;background:#030e15e8;color:#e7dcc0;font:14px system-ui';
      const box=root.document.createElement('div');box.style.cssText='width:min(420px,88vw);padding:28px;background:#0b1b24;border:1px solid #789486;';
      const heading=root.document.createElement('h2');heading.textContent='Transmission';heading.style.margin='0 0 14px';
      const note=root.document.createElement('p');note.dataset.pilotNote='';note.setAttribute('aria-live','polite');
      const retry=root.document.createElement('button');retry.textContent='Réessayer';retry.dataset.pilotRetry='';retry.style.cssText='padding:10px 16px;margin-right:10px;';
      const cancel=root.document.createElement('button');cancel.textContent='Retour';cancel.dataset.pilotCancel='';cancel.style.cssText='padding:10px 16px;';
      retry.onclick=()=>{if(pending===token)loadToken(token,true);};cancel.onclick=cancelPendingLaunch;
      box.append(heading,note,retry,cancel);dialog.append(box);root.document.body.append(dialog);cancel.focus();
      dialog.addEventListener('keydown',event=>{
        if(event.key==='Escape'){event.preventDefault();cancelPendingLaunch();}
        if(event.key==='Tab'){const buttons=[...dialog.querySelectorAll('button')].filter(button=>!button.hidden);if(!buttons.length)return;const i=buttons.indexOf(root.document.activeElement);event.preventDefault();buttons[(i+(event.shiftKey?-1:1)+buttons.length)%buttons.length].focus();}
      });
    }
    dialog.querySelector('[data-pilot-note]').textContent=failed?'La transmission est interrompue. Réessayer ou revenir à la sélection.':'Préparation de l’opérateur.';
    dialog.querySelector('[data-pilot-retry]').hidden=!failed;
  }
  async function loadToken(token,retry=false){
    if(token.cancelled||pending!==token)return;
    showDialog(token,false);
    const list=requirements(token.def);
    if(!installed||!list.length){token.error='Exact native edition unavailable';metrics.gateFailures++;showDialog(token,true);return;}
    loader().retainFighters([{uid:resolve(token.def),costume:'original'}]);
    let success=false;
    try{const values=await Promise.all(list.map(item=>loader().whenReady(item.uid,{...item,retry})));success=values.every(Boolean)&&ready(token.def);}catch(error){token.error=String(error?.message||error);}
    if(token.cancelled||pending!==token)return;
    if(!success){metrics.gateFailures++;showDialog(token,true);return;}
    pending=null;hideDialog();token.resume();
  }
  function deferLaunch(def,resume,mode='combat'){
    if(ready(def)){loader().retainFighters([{uid:resolve(def),costume:'original'}]);return false;}
    const key=String(def?.id)+':'+mode;
    if(pending?.key===key&&!pending.cancelled)return true;
    cancelPendingLaunch();
    const token={key,def,resume:typeof resume==='function'?resume:()=>{},cancelled:false};pending=token;metrics.gateRequests++;loadToken(token);
    return true;
  }
  function coverage(data){
    return(data?.machines||[]).map(def=>{
      const uid=resolve(def),entry=uid&&loader()?.getEntry(uid);
      return{id:def.id,ep:def.ep,hero:def.hero,uid,admitted:!!entry,ready:ready(def),sources:sources(def),
        missingPoses:poseActions.filter(action=>!entry?.actions?.[action]&&
          (action!=='blade'||def.weapon==='blade')&&(action!=='shoot'||def.weapon!=='blade')),
        uprightPresentationPixels:200*(statureHeightRecords[uid]?.metres||1.8)/1.8,
        heightEvidence:statureHeightRecords[uid]?.evidence||'historical-unattested-incarnation-comparison-reference',canonicalBodyHeightCertified:false};
    });
  }
  function status(){return{installed,rejected:[...rejected],pending:pending?{key:pending.key,cancelled:pending.cancelled,error:pending.error||null}:null,
    metrics:JSON.parse(JSON.stringify(metrics)),statureHeightRecords:JSON.parse(JSON.stringify(statureHeightRecords)),humanComparisonReference:{metres:1.8,arenaUnits:200},catalogUIDs:Object.keys(root.CQC_PASS27_ARSENAL_PLAYER_CATALOG?.entries||{}),
    physicalActorChanged:false,sourcePixelsChanged:false,rawCatalogueChanged:false};}
  root.addEventListener?.('pagehide',cancelPendingLaunch);
  return{install,resolve,requirements,sources,ready,poseFor,statureCalibration,draw,deferLaunch,cancelPendingLaunch,coverage,status,editionUIDs:editions,machineContracts:contracts};
});
