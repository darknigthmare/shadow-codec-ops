/* Core uses its actual move and drawing scale; native sockets retain the P44 source authority. */
(function(root){'use strict';
 const finite=Number.isFinite,same=(a,b)=>JSON.stringify(a)===JSON.stringify(b),cache=new WeakMap();
 const scope=new Map([["core__venom:cyborg",{"uid":"core__venom","id":"cyborg","metadataSHA256":"c254f71aab7e40b2690fcb032e047b4ff798e6a7af400a5276145fa7744914dd","artAuditSHA256":"f10c8f361c44dff8d1562b0a2fc2a133517baccaf70cdc87aefcba3f5ab684b8"}]]);
 const coreContracts={"core__venom":{"lane":"A","uid":"core__venom","id":"venom","targetFamily":"cyborg","fighter":{"id":"venom","name":"VENOM SNAKE","subtitle":"THE PHANTOM PAIN / DIAMOND DOGS","era":"mgsv","speed":4.55,"color":"#bd8e65","drive":"Bras bionique / Rocket Arm","special":"bionicStun","secondary":"rocketArm","backSpecial":"armCharge","resource":{"name":"BRAS","max":100,"start":100,"regen":0.08},"archetype":"CQC / NEUTRALISATION / BRAS GUID\u00c9","tip":"D : d\u00e9charge bionique rapproch\u00e9e, 20 BRAS, 0 d\u00e9g\u00e2t de vie et 2 200 vigilance. Bas + D : Rocket Arm, 40 BRAS ; un trajet aller puis retour sans deuxi\u00e8me touche. Ces deux techniques et la Super attendent le retour du bras. Arri\u00e8re + D recharge 55 BRAS \u00e0 la 73e image de simulation, si non interrompu. Adaptation versus, pas un pilotage libre du projectile.","rival":"quiet","stage":"tpp-mother-base-diamond-dogs"},"slots":{"light":{"moveName":"light","move":{"startup":5,"active":3,"recovery":12,"damage":360,"reach":113,"level":"mid","stun":23,"blockstun":12,"push":16,"rank":1}},"medium":{"moveName":"medium","move":{"startup":10,"active":4,"recovery":17,"damage":625,"reach":153,"level":"mid","stun":29,"blockstun":17,"push":24,"rank":2}},"heavy":{"moveName":"heavy","move":{"startup":19,"active":5,"recovery":25,"damage":995,"reach":199,"level":"mid","stun":35,"blockstun":21,"push":45,"rank":3}},"low":{"moveName":"sweep","move":{"startup":14,"active":5,"recovery":25,"damage":800,"reach":165,"level":"low","stun":38,"blockstun":12,"push":52,"rank":3}},"throw":{"moveName":"throw","move":{"startup":6,"active":2,"recovery":28,"damage":1290,"reach":88,"level":"throw","stun":45,"blockstun":12,"push":115,"rank":4}},"special":{"moveName":"bionicStun","move":{"startup":18,"active":5,"recovery":34,"damage":0,"reach":145,"level":"mid","stun":33,"blockstun":12,"push":35,"rank":4,"needsArm":true,"resourceCost":20,"vigilanceDamage":2200,"electric":true}},"specialDown":{"moveName":"rocketArm","move":{"startup":29,"active":1,"recovery":34,"damage":1060,"reach":0,"level":"mid","stun":23,"blockstun":12,"push":16,"rank":4,"needsArm":true,"resourceCost":40,"projectile":{"speed":14,"range":780,"size":16,"height":136,"kind":"rocketArm","deflectable":false,"breakable":true}}},"specialBack":{"moveName":"armCharge","move":{"startup":1,"active":1,"recovery":70,"damage":0,"reach":0,"level":"mid","stun":23,"blockstun":12,"push":16,"rank":0,"utility":"armCharge"}},"specialForward":{"moveName":"bionicStun","move":{"startup":18,"active":5,"recovery":34,"damage":0,"reach":145,"level":"mid","stun":33,"blockstun":12,"push":35,"rank":4,"needsArm":true,"resourceCost":20,"vigilanceDamage":2200,"electric":true},"aliasOf":"special","qualification":"The current moveName source has no distinct forward-special branch. Forward+D resolves the ordinary standing special; this is a source-derived alias, not a new attack."},"super":{"moveName":"super","move":{"startup":18,"active":6,"recovery":42,"damage":2400,"reach":186,"level":"mid","stun":48,"blockstun":12,"push":120,"rank":5,"cost":50,"launch":8,"needsArm":true,"travel":3,"travelActiveOnly":true}}},"derivation":"Full95 data roster, source-ordered Object.assign expansions, MOVES[name]+FIGHTER_MOVES[id][name] for ordinary getMove. Literal-only data interpretation; dynamic branches are separately qualified."}},coreBindings=new Map([]);
 let poseRequests=0,emissions=0,lastPose=null,lastEmission=null;
 const projectileTags={bullet:'ballistic',tranq:'tranq',grenade:'explosive',debris:'debris'};
 function owned(actor){
  if(!actor?.id||!actor.costume||actor.costume==='original')return null;
  const uid='core__'+actor.id;const spec=scope.get(uid+':'+actor.costume);if(!spec)return null;const fighter={uid,costume:actor.costume},sprites=root.CQC_COMBAT_SPRITES,entry=sprites?.getEntry?.(uid,fighter);
  if(entry?.pass40Revision!=='native-batch40-v2')throw Error('P44 Core selected native body is not ready');
  if(entry.mirror!==false||entry.fallbackMissingActions!==false
    ||entry.review?.status!=='approved'||typeof entry.review.reviewer!=='string'||!entry.review.reviewer.startsWith('Root')
    ||!/^[a-f0-9]{64}$/.test(entry.review.artAuditSHA256||''))throw Error('Core P44 selected metadata lost its reviewed native contract');
  const descriptor=root.CQC_NATIVE_WARDROBE_INDEX?.entries?.find(d=>d.uid===uid&&d.id===actor.costume);
  if(descriptor?.metadata?.sha256!==spec.metadataSHA256||descriptor?.review?.artAuditSHA256!==spec.artAuditSHA256||descriptor?.review?.artAuditSHA256!==entry.review.artAuditSHA256
    ||root.CQC_PASS44_NATIVE_ORIGINS?.owns?.({f: fighter})!==true)throw Error('Core P44 selected metadata no longer matches its pinned source authority');
  return{uid,fighter,entry,sprites};
 }
 function authority(record,slot,tag,face){
  let points=cache.get(record.entry);if(!points){points=new Map();cache.set(record.entry,points);}
  const key=slot+':'+tag+':'+face;if(points.has(key))return points.get(key);
  const side=face===-1?'left':'right';
  if(!record.entry.pass40Attachments?.some(a=>a.side===side&&a.slot===slot&&a.tag===tag)){points.set(key,null);return null;}
  const sdk=root.CQC_PASS44_NATIVE_ORIGINS;if(typeof sdk.sourcePoint!=='function')throw Error('Core native origin requires the reviewed pure source-point SDK');
  const point=sdk.sourcePoint(record.uid,record.fighter.costume,side,slot,tag);
  if(!point||point.evidence!=='reviewed-pass44-native-source-point')throw Error('Core native source authority changed or rejected its declared point');
  points.set(key,point||null);return point||null;
 }
 // Identical Core slot ownership order to P16 slotFor; never use its later visual alias.
 function slotFor(actor,pose,move){
  const name=actor.attack?.name;if(name===actor.special)return 'special';if(name===actor.secondary)return 'specialDown';
  if(name===actor.backSpecial)return 'specialBack';if(name===actor.forwardSpecial)return 'specialForward';if(name==='super')return 'super';
  if(['throw','cqcLock'].includes(name)||move?.level==='throw')return 'throw';if(['sweep','low'].includes(name)||move?.level==='low')return 'low';
  if(['light','airLight'].includes(name))return 'light';if(['medium','heavy','airHeavy','launcher','rush'].includes(name))return 'heavy';return null;
 }
 function reviewedCoreSelection(record,actor,move,pose){
  const captured=coreContracts[record.uid],variants=actor.stance==='gun'?captured?.stanceVariants?.gun:null,allSlots={...captured?.slots,...Object.fromEntries(Object.entries(variants||{}).filter(([,v])=>v.moveName&&v.move))},candidates=Object.entries(allSlots).filter(([,c])=>c.moveName===actor.attack?.name&&same(c.move,move));
  if(move.projectile&&!candidates.length)throw Error('P44 Core projectile differs from its exact captured current move');
  const slot=candidates[0]?.[0]||slotFor(actor,pose,move),utility=move.utility;let action=null;
  if(move.projectile){const binding=coreBindings.get(record.uid+':'+actor.costume+':'+slot);if(!binding)throw Error('P44 Core projectile lacks reviewed exact source binding');return{actualSlot:slot,action:authority(record,binding.sourceSlot,binding.tag,actor.facing===-1?-1:1)?.selectedAction,nativeProjectileTag:binding.tag};}
  if(move.parry||utility==='bladeParry')action='guard';
  else if(['ripper','focus','reactiveShield'].includes(utility))action='deploy';
  else if(utility==='armCharge'&&record.uid==='core__venom')action='guard';else if(['weaponSwitch','teleport'].includes(utility))action='recover';
  else if(/reload|cylinder/i.test(utility||''))action='reload';
  else if(record.uid==='core__snake_pw'&&utility)action='guard';
  else if(move.level==='throw'||move.commandGrab===true||typeof move.grapple==='string')action='throw';else if(move.blade)action='blade';else if(move.level==='low')action='low';else if(finite(move.damage)&&move.damage>0)action='punch';
  return action?{actualSlot:slot,action}:null;
 }
 function sourceAction(record,actor,move,pose){
  const actualSlot=slotFor(actor,pose,move),kind=move?.projectile?.kind;
  if(move?.pass44BionicContact===true&&root.CQC_PASS44_VENOM_NATIVE_CONTACT?.owns?.(actor))return 'heavy';
  const reviewed=reviewedCoreSelection(record,actor,move,pose);if(reviewed)return reviewed.action;
  if(move?.projectile)throw Error('P44 projectile bypassed its exact captured binding');
  if(move?.utility){if(/reload|cylinder/i.test(move.utility))return 'reload';if(move.utility==='nanoHarden')return 'optic';if(['legacyCharge','acCycle','acReplan','acGuard','acDecoy'].includes(move.utility))return 'recover';if(move.utility==='ghostRoll')return 'roll';return null;}
  if(move?.level==='throw')return 'throw';if(move?.blade)return 'blade';if(move?.level==='low')return 'low';if(finite(move?.damage)&&move.damage>0)return 'punch';return null;
 }
 function poseFor(actor,move,pose={}){
  const record=owned(actor);if(!record||!move||pose.ko||pose.hit||pose.getup)return null;
  const action=sourceAction(record,actor,move,pose);if(!action||!record.entry.actions[action])return null;
  const actualSlot=reviewedCoreSelection(record,actor,move,pose)?.actualSlot||slotFor(actor,pose,move),pairs=Object.entries(record.entry.actionMap||{}),alias=pairs.find(([slot,mapped])=>slot===actualSlot&&mapped===action)||pairs.find(([_slot,mapped])=>mapped===action);
  const guardRecovery=record.uid==='core__venom'&&move.utility==='armCharge'&&action==='guard';if(!alias&&!guardRecovery)throw Error('P44 Core reviewed physical action lacks an allowed actionMap alias');
  const visual={...pose,...(guardRecovery?{attack:false,animationActive:false,guard:true,moveSlot:undefined}:{moveSlot:alias[0]}),pass44CoreActualSlot:actualSlot,pass44CoreVisualAction:action},groups=actor.facing===-1?record.entry.oppositeActions:record.entry.actions,chosen=record.sprites.selectFrame({...record.entry,actions:groups},visual),f=chosen?.frame;poseRequests++;if(f)lastPose={uid:record.uid,costume:actor.costume,face:actor.facing===-1?-1:1,frame:root.CQC?.match?.frame,actualMove:actor.attack?.name,actualSlot,phase:pose.attackPhase,selectedAction:chosen.action,physicalPoseIndex:f.physicalPoseIndex,sourceFile:f.file,sourceSHA256:f.sha256,sourceRect:[...f.rect],sourcePivot:[...f.pivot],qualification:'Source selected for actual Core adapter request; not an independent successful draw callback.'};return visual;
 }
 function projectilePoint(actor,move,pose={}){
  const record=owned(actor);if(!record||!move?.projectile)return null;
  const reviewed=reviewedCoreSelection(record,actor,move,pose),tag=reviewed?.nativeProjectileTag||projectileTags[move.projectile.kind],slot=reviewed?.actualSlot||slotFor(actor,pose,move),face=actor.facing===-1?-1:1;
  if(!tag||!slot)throw Error('P44 Core projectile has no reviewed slot');
  const point=authority(record,slot,tag,face);if(!point)throw Error('P44 Core projectile lost its reviewed native point');
  const visual=poseFor(actor,move,pose)||pose,actions=face===record.entry.facing?record.entry.actions:record.entry.oppositeActions;
  const selected=record.sprites.selectFrame({...record.entry,actions},visual),frame=selected?.frame;
  if(!frame||selected.action!==point.selectedAction||frame.file!==point.sourceFile||frame.sha256!==point.sourceSHA256
    ||!same(frame.rect,point.sourceRect)||!same(frame.pivot,point.sourcePivot))throw Error('Core native emission does not match its actual selected source frame');
  const worldHeight=root.CQC_PASS19_WORLD_SCALE?.displayHeightFor?.(record.uid,actor.costume,'core',record.entry);
  const height=finite(worldHeight)&&worldHeight>0?worldHeight:record.entry.coreDisplayHeight||root.CQC_COMBAT_SPRITE_CATALOG?.entries?.[record.uid]?.coreDisplayHeight||record.entry.displayHeight;
  const nativeHeight=record.entry.sourceFrameHeights?.[frame.file]||record.entry.baseFrameHeight||frame.rect[3],scale=height/nativeHeight;
  const x=actor.x+(point.sourceNativeXY[0]-frame.rect[0]-frame.pivot[0]*frame.rect[2])*scale;
  const y=actor.y+(frame.rect[1]+frame.pivot[1]*frame.rect[3]-point.sourceNativeXY[1])*scale;
  if(!finite(scale)||scale<=0||!finite(x)||!finite(y))throw Error('Core native scale or actor coordinate invalid');
  emissions++;lastEmission={uid:record.uid,costume:actor.costume,face,frame:root.CQC?.match?.frame,move:actor.attack?.name,x,y,sourceFile:frame.file,sourceSHA256:frame.sha256,sourceRect:[...frame.rect],sourcePivot:[...frame.pivot],sourceNativeXY:[...point.sourceNativeXY],physicalPoseIndex:frame.physicalPoseIndex};
  return{x,y,sourceFile:frame.file,sourceSHA256:frame.sha256,sourceRect:[...frame.rect],sourcePivot:[...frame.pivot],sourceNativeXY:[...point.sourceNativeXY],sourceSocket:point.sourceSocket,selectedAction:selected.action,selectedFrameIndex:selected.index,actualCoreSlot:slot,actualCoreMove:actor.attack?.name,actualCoreProjectileKind:move.projectile.kind,coreDisplayHeight:height,nativeSourceScale:scale,sourceScaleAppliedOnce:true,coordinateSpace:'core-world-positive-up',evidence:'reviewed-pass44-core-selected-source-point'};
 }
 function coverage(actor,move,pose={}){const record=owned(actor);if(!record)return{owned:false,supported:false,reason:'outside-reviewed-p40-costume'};const action=sourceAction(record,actor,move,pose),visual=action&&poseFor(actor,move,pose);return{owned:true,supported:!!visual,actualCoreSlot:reviewedCoreSelection(record,actor,move,pose)?.actualSlot||slotFor(actor,pose,move),actualCoreMove:actor.attack?.name,actualCoreProjectileKind:move?.projectile?.kind||null,action:action||null,reason:visual?'reviewed-existing-source-action':'core-move-needs-separately-reviewed-source-art-or-action'};}
 root.CQC_PASS44_CORE_NATIVE_ORIGINS={version:'pass44-core-native-origins/1',owns:actor=>!!owned(actor),poseFor,projectilePoint,coverage,diagnostics:()=>({scope:[...scope.keys()],poseRequests,emissions,lastPose:lastPose?{...lastPose}:null,lastEmission:lastEmission?{...lastEmission}:null})};
 // The historical host calls this interface. Only exact P44 keys are intercepted.
 const prior=root.CQC_PASS40_CORE_NATIVE_ORIGINS;if(!prior?.owns||!prior?.poseFor||!prior?.projectilePoint)throw Error('Original Core origin interface absent');
 const isP44=actor=>scope.has('core__'+actor?.id+':'+actor?.costume);
 root.CQC_PASS40_CORE_NATIVE_ORIGINS={...prior,
  owns:function(actor){return isP44(actor)?!!owned(actor):prior.owns.apply(prior,arguments);},
  poseFor:function(actor){return isP44(actor)?poseFor.apply(null,arguments):prior.poseFor.apply(prior,arguments);},
  projectilePoint:function(actor){return isP44(actor)?projectilePoint.apply(null,arguments):prior.projectilePoint.apply(prior,arguments);},
  coverage:function(actor){return isP44(actor)?coverage.apply(null,arguments):prior.coverage.apply(prior,arguments);}};
 root.CQC_PASS44_CORE_NATIVE_ORIGINS.scope=Object.freeze([...scope.values()].map(v=>Object.freeze({...v})));
})(globalThis);
