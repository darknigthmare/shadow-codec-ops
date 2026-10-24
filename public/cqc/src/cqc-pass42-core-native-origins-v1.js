/* Core uses its actual move and drawing scale; native sockets retain the P42 source authority. */
(function(root){'use strict';
 const finite=Number.isFinite,same=(a,b)=>JSON.stringify(a)===JSON.stringify(b),cache=new WeakMap();
 const scope=new Map([["core__snake:mgs3-camo-leaf",{"uid":"core__snake","id":"mgs3-camo-leaf","metadataSHA256":"f965d131845191c88158f373c48530ea44e83d71e7047035e5e072730419e2cb","artAuditSHA256":"00c43d7897c1c829ab56aa31253a6be54699329adc21ba5289ca554d5f002192"}],["core__snake:mgs3-camo-splitter",{"uid":"core__snake","id":"mgs3-camo-splitter","metadataSHA256":"1c18c01dea60dfcb8692995ea3dadb666740ae873ed62243037ff310f675e16d","artAuditSHA256":"f48d750655fd057d26b2dbc6837c3abd86ef8f5c9bdc754603dede58889f8f6b"}],["core__snake:mgs3-camo-black",{"uid":"core__snake","id":"mgs3-camo-black","metadataSHA256":"0b33da465687e623f50a227f106c4da6680141a272f23b5c37dc36f83fcba4fb","artAuditSHA256":"1fff52c3e63809c3e58f7e48a40af02d9f22f3cac4793f3f9ec7473f43c4073c"}],["core__snake:mgs3-camo-squares",{"uid":"core__snake","id":"mgs3-camo-squares","metadataSHA256":"3ace83f23bb6ed4df285d1a48a5154461cf7242facbc323d8ee2c3f85685133e","artAuditSHA256":"756d23bb0dd670f8495b2068846aa7e64c78c9bc69e37e95629b16406ea7ee7f"}],["core__snake:mgs3-camo-water",{"uid":"core__snake","id":"mgs3-camo-water","metadataSHA256":"a680b6a6eff12af25899f6b72f81d53ab38b0a2a12acc2658a08806697c3e799","artAuditSHA256":"98dc9c1e1cdc7a6edd619359e6b0b68ef2c7f8fb98331472b582083c150e1c68"}],["core__snake:mgs3-camo-desert-tiger",{"uid":"core__snake","id":"mgs3-camo-desert-tiger","metadataSHA256":"bb26c6599013fc856f9dc2cbe716e9faa11dc9fa13a120eda1e42d11223ae639","artAuditSHA256":"793b60c198faa59a18ce70e0d8fa008623843deda4cf52dc1695568f11cc6038"}],["core__snake:mgs3-camo-chocolate-chip",{"uid":"core__snake","id":"mgs3-camo-chocolate-chip","metadataSHA256":"d2a3cb49b17829fe013ee1c871368583520b6adcd074da7a27a79a4e9772e0a7","artAuditSHA256":"db3280d0ec7b2b60e4bb488f72b2cdd0ddeb382e5734b4f8b2c5dc8da5560787"}],["core__snake:mgs3-camo-raindrop",{"uid":"core__snake","id":"mgs3-camo-raindrop","metadataSHA256":"13449f87a430ac59738f6b8b2b39b2751a63ea744c72f2004c24f7010adb315d","artAuditSHA256":"3272b752f888028fbc3d01e78bca5c993be28ea1c82d3f8d8553b2d2201e99f7"}],["core__snake:mgs3-camo-tree-bark",{"uid":"core__snake","id":"mgs3-camo-tree-bark","metadataSHA256":"183e8c2b193cb762f4be2d57ff7a66ef8fe734aeb7da2bd13c38be4914afd72a","artAuditSHA256":"5e23118f52b491b8c61458b5790ff56e06e9c956125735041b85df8b0038f5fa"}]]);
 const actualProjectileContract={"moveName":"grenade","move":{"startup":21,"active":1,"recovery":31,"damage":1170,"reach":0,"level":"mid","stun":23,"blockstun":12,"push":16,"rank":4,"resourceCost":1,"projectile":{"speed":7,"vy":8,"range":1100,"size":8,"kind":"grenade","fuse":62}}};
 const projectileTags={bullet:'ballistic',tranq:'tranq',grenade:'explosive',debris:'debris'};
 function owned(actor){
  if(!actor?.id||!actor.costume||actor.costume==='original')return null;
  const uid='core__'+actor.id;const spec=scope.get(uid+':'+actor.costume);if(!spec)return null;const fighter={uid,costume:actor.costume},sprites=root.CQC_COMBAT_SPRITES,entry=sprites?.getEntry?.(uid,fighter);
  if(entry?.pass40Revision!=='native-batch40-v2')throw Error('P42 Core selected native body is not ready');
  if(entry.mirror!==false||entry.fallbackMissingActions!==false
    ||entry.review?.status!=='approved'||typeof entry.review.reviewer!=='string'||!entry.review.reviewer.startsWith('Root')
    ||!/^[a-f0-9]{64}$/.test(entry.review.artAuditSHA256||''))throw Error('Core P42 selected metadata lost its reviewed native contract');
  const descriptor=root.CQC_NATIVE_WARDROBE_INDEX?.entries?.find(d=>d.uid===uid&&d.id===actor.costume);
  if(descriptor?.metadata?.sha256!==spec.metadataSHA256||descriptor?.review?.artAuditSHA256!==spec.artAuditSHA256||descriptor?.review?.artAuditSHA256!==entry.review.artAuditSHA256
    ||root.CQC_PASS42_NATIVE_ORIGINS?.owns?.({f: fighter})!==true)throw Error('Core P42 selected metadata no longer matches its pinned source authority');
  return{uid,fighter,entry,sprites};
 }
 function authority(record,slot,tag,face){
  let points=cache.get(record.entry);if(!points){points=new Map();cache.set(record.entry,points);}
  const key=slot+':'+tag+':'+face;if(points.has(key))return points.get(key);
  const side=face===-1?'left':'right';
  if(!record.entry.pass40Attachments?.some(a=>a.side===side&&a.slot===slot&&a.tag===tag)){points.set(key,null);return null;}
  const sdk=root.CQC_PASS42_NATIVE_ORIGINS;if(typeof sdk.sourcePoint!=='function')throw Error('Core native origin requires the reviewed pure source-point SDK');
  const point=sdk.sourcePoint(record.uid,record.fighter.costume,side,slot,tag);
  if(!point||point.evidence!=='reviewed-pass42-native-source-point')throw Error('Core native source authority changed or rejected its declared point');
  points.set(key,point||null);return point||null;
 }
 // Identical Core slot ownership order to P16 slotFor; never use its later visual alias.
 function slotFor(actor,pose,move){
  const name=actor.attack?.name;if(name===actor.special)return 'special';if(name===actor.secondary)return 'specialDown';
  if(name===actor.backSpecial)return 'specialBack';if(name===actor.forwardSpecial)return 'specialForward';if(name==='super')return 'super';
  if(['throw','cqcLock'].includes(name)||move?.level==='throw')return 'throw';if(['sweep','low'].includes(name)||move?.level==='low')return 'low';
  if(['light','airLight'].includes(name))return 'light';if(['medium','heavy','airHeavy','launcher','rush'].includes(name))return 'heavy';return null;
 }
 function reviewedCoreSelection(){return null;}
 function sourceAction(record,actor,move,pose){
  const actualSlot=slotFor(actor,pose,move),kind=move?.projectile?.kind;
  const reviewed=reviewedCoreSelection(record,actor,move,pose);if(reviewed)return reviewed.action;
  if(move?.projectile){if(actor.id!=='snake'||actor.attack?.name!==actualProjectileContract.moveName||!same(move,actualProjectileContract.move))throw Error('P42 Core projectile lost its exact existing move contract');const tag=projectileTags[kind];if(!tag||!actualSlot)return null;return authority(record,actualSlot,tag,actor.facing===-1?-1:1)?.selectedAction||null;}
  if(move?.utility){if(/reload|cylinder/i.test(move.utility))return 'reload';if(move.utility==='nanoHarden')return 'optic';if(['legacyCharge','acCycle','acReplan','acGuard','acDecoy'].includes(move.utility))return 'recover';if(move.utility==='ghostRoll')return 'roll';return null;}
  if(move?.level==='throw')return 'throw';if(move?.blade)return 'blade';if(move?.level==='low')return 'low';if(finite(move?.damage)&&move.damage>0)return 'punch';return null;
 }
 function poseFor(actor,move,pose={}){
  const record=owned(actor);if(!record||!move||pose.ko||pose.hit||pose.getup)return null;
  const action=sourceAction(record,actor,move,pose);if(!action||!record.entry.actions[action])return null;
  const actualSlot=slotFor(actor,pose,move),pairs=Object.entries(record.entry.actionMap||{}),alias=pairs.find(([slot,mapped])=>slot===actualSlot&&mapped===action)||pairs.find(([_slot,mapped])=>mapped===action);
  if(!alias)return null;
  return{...pose,moveSlot:alias[0],pass42CoreActualSlot:actualSlot,pass42CoreVisualAction:action};
 }
 function projectilePoint(actor,move,pose={}){
  const record=owned(actor);if(!record||!move?.projectile)return null;
  const tag=reviewedCoreSelection(record,actor,move,pose)?.nativeProjectileTag||projectileTags[move.projectile.kind],slot=slotFor(actor,pose,move),face=actor.facing===-1?-1:1;
  if(!tag||!slot)throw Error('P42 Core projectile has no reviewed slot');
  const point=authority(record,slot,tag,face);if(!point)throw Error('P42 Core projectile lost its reviewed native point');
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
  return{x,y,sourceFile:frame.file,sourceSHA256:frame.sha256,sourceRect:[...frame.rect],sourcePivot:[...frame.pivot],sourceNativeXY:[...point.sourceNativeXY],sourceSocket:point.sourceSocket,selectedAction:selected.action,selectedFrameIndex:selected.index,actualCoreSlot:slot,actualCoreMove:actor.attack?.name,actualCoreProjectileKind:move.projectile.kind,coreDisplayHeight:height,nativeSourceScale:scale,sourceScaleAppliedOnce:true,coordinateSpace:'core-world-positive-up',evidence:'reviewed-pass42-core-selected-source-point'};
 }
 function coverage(actor,move,pose={}){const record=owned(actor);if(!record)return{owned:false,supported:false,reason:'outside-reviewed-p40-costume'};const action=sourceAction(record,actor,move,pose),visual=action&&poseFor(actor,move,pose);return{owned:true,supported:!!visual,actualCoreSlot:slotFor(actor,pose,move),actualCoreMove:actor.attack?.name,actualCoreProjectileKind:move?.projectile?.kind||null,action:action||null,reason:visual?'reviewed-existing-source-action':'core-move-needs-separately-reviewed-source-art-or-action'};}
 root.CQC_PASS42_CORE_NATIVE_ORIGINS={version:'pass42-core-native-origins/1',owns:actor=>!!owned(actor),poseFor,projectilePoint,coverage};
 // The historical host calls this interface. Only exact P42 keys are intercepted.
 const prior=root.CQC_PASS40_CORE_NATIVE_ORIGINS;if(!prior?.owns||!prior?.poseFor||!prior?.projectilePoint)throw Error('Original Core origin interface absent');
 const isP42=actor=>scope.has('core__'+actor?.id+':'+actor?.costume);
 root.CQC_PASS40_CORE_NATIVE_ORIGINS={...prior,
  owns:function(actor){return isP42(actor)?!!owned(actor):prior.owns.apply(prior,arguments);},
  poseFor:function(actor){return isP42(actor)?poseFor.apply(null,arguments):prior.poseFor.apply(prior,arguments);},
  projectilePoint:function(actor){return isP42(actor)?projectilePoint.apply(null,arguments):prior.projectilePoint.apply(prior,arguments);},
  coverage:function(actor){return isP42(actor)?coverage.apply(null,arguments):prior.coverage.apply(prior,arguments);}};
 root.CQC_PASS42_CORE_NATIVE_ORIGINS.scope=Object.freeze([...scope.values()].map(v=>Object.freeze({...v})));
})(globalThis);
