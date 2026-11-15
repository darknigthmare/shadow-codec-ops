/* Core uses its actual move and drawing scale; native sockets retain the P41 source authority. */
(function(root){'use strict';
 const finite=Number.isFinite,same=(a,b)=>JSON.stringify(a)===JSON.stringify(b),cache=new WeakMap();
 const scope=new Map([["core__snake:mgs3-camo-festival",{"uid":"core__snake","id":"mgs3-camo-festival","metadataSHA256":"90e758b961c3426d99d9f0534f4f9f29292ae07be7e4c6a7d0395fa25880295c","artAuditSHA256":"02a42fafd4b45f1d2c17725625d73f0ce4108af975952515464de5fa52cee77e"}],["core__snake:mgs3-camo-swamp",{"uid":"core__snake","id":"mgs3-camo-swamp","metadataSHA256":"b04e84842df1b589768d8c2cd59a8d3cc54586697331b8c4e593f2b0b359b454","artAuditSHA256":"253c36fcce3515146e20528956cfd648710d27c0e241a568d2db595e29e6b751"}],["core__snake:mgs3-camo-anubis",{"uid":"core__snake","id":"mgs3-camo-anubis","metadataSHA256":"806030a173f32173ce1884bd353ca258830c688e1a48eea76fbba0a49d0c34f8","artAuditSHA256":"5687e5ae3846d9fd525a552770e30c2d6f95c86cb80f935231a1cd11eb152062"}],["core__snake:mgs3-camo-rainbow",{"uid":"core__snake","id":"mgs3-camo-rainbow","metadataSHA256":"f4a7bbec2ce76f42d24bf8ec50a0d6f94a6bc48970ff1f6167149610ba908fd3","artAuditSHA256":"a1bd1cc2065de663021c1f91143957a25cf7daf7a0eee2e940c0e6c3cb9382c5"}],["core__snake:mgs3-camo-animals",{"uid":"core__snake","id":"mgs3-camo-animals","metadataSHA256":"0942a906aabcaceb7473306780d0e643ad2029aa6be3a263a85be2301d2d68e8","artAuditSHA256":"9e749d83e43672e023cca5effc3a873eeafefd631f8386c271307d9c5d233a34"}],["core__snake:mgs3-camo-st-valentine",{"uid":"core__snake","id":"mgs3-camo-st-valentine","metadataSHA256":"eda8372ad90025e152be41651f041954b77557459d7d0eb42ff7d383f5544834","artAuditSHA256":"20c3264eff976a39623b5fa7e3f52e3c019a3880d77b80ac38f499c3bfdfae15"}],["core__snake:mgs3-camo-dododo",{"uid":"core__snake","id":"mgs3-camo-dododo","metadataSHA256":"0d2606a4934618e4a4ed1df66e6613a1958394f07e13c32dc209c6ee886aa477","artAuditSHA256":"1a1b145b22cab016afb80c6e2d57e966af9914d93c752021223789b49f4a1200"}],["core__snake:mgs3-camo-banana",{"uid":"core__snake","id":"mgs3-camo-banana","metadataSHA256":"501b9497cf4919c0ab5cc1234db59723d8838f30a4744d13f47133585f919293","artAuditSHA256":"4c63a34b06d10769a3fcfb02b8a9d56adf98ba575ad4249735d475a0af8f1ec3"}],["core__snake:mgs3-camo-fly",{"uid":"core__snake","id":"mgs3-camo-fly","metadataSHA256":"518fba0cd67cb682233aaeeaec1b676cb7261722133d1c8c25c2371ac090a654","artAuditSHA256":"b988f6367e52a33fe518ba87965935f1644566a394d5d68b336cd45bc7c83115"}],["core__snake:mgs3-camo-dpm",{"uid":"core__snake","id":"mgs3-camo-dpm","metadataSHA256":"040649478091c460bddf20ccf802bbc0922b58d74e01725927f0e7d6c4fc7ec9","artAuditSHA256":"edebfa446e1cbd9fc4bc9bae634383c90485c5d00d83d7834c99f11c7e115a11"}]]);
 const actualProjectileContract={"moveName":"grenade","move":{"startup":21,"active":1,"recovery":31,"damage":1170,"reach":0,"level":"mid","stun":23,"blockstun":12,"push":16,"rank":4,"resourceCost":1,"projectile":{"speed":7,"vy":8,"range":1100,"size":8,"kind":"grenade","fuse":62}}};
 const projectileTags={bullet:'ballistic',tranq:'tranq',grenade:'explosive',debris:'debris'};
 function owned(actor){
  if(!actor?.id||!actor.costume||actor.costume==='original')return null;
  const uid='core__'+actor.id;const spec=scope.get(uid+':'+actor.costume);if(!spec)return null;const fighter={uid,costume:actor.costume},sprites=root.CQC_COMBAT_SPRITES,entry=sprites?.getEntry?.(uid,fighter);
  if(entry?.pass40Revision!=='native-batch40-v2')throw Error('P41 Core selected native body is not ready');
  if(entry.mirror!==false||entry.fallbackMissingActions!==false
    ||entry.review?.status!=='approved'||typeof entry.review.reviewer!=='string'||!entry.review.reviewer.startsWith('Root')
    ||!/^[a-f0-9]{64}$/.test(entry.review.artAuditSHA256||''))throw Error('Core P41 selected metadata lost its reviewed native contract');
  const descriptor=root.CQC_NATIVE_WARDROBE_INDEX?.entries?.find(d=>d.uid===uid&&d.id===actor.costume);
  if(descriptor?.metadata?.sha256!==spec.metadataSHA256||descriptor?.review?.artAuditSHA256!==spec.artAuditSHA256||descriptor?.review?.artAuditSHA256!==entry.review.artAuditSHA256
    ||root.CQC_PASS41_NATIVE_ORIGINS?.owns?.({f: fighter})!==true)throw Error('Core P41 selected metadata no longer matches its pinned source authority');
  return{uid,fighter,entry,sprites};
 }
 function authority(record,slot,tag,face){
  let points=cache.get(record.entry);if(!points){points=new Map();cache.set(record.entry,points);}
  const key=slot+':'+tag+':'+face;if(points.has(key))return points.get(key);
  const side=face===-1?'left':'right';
  if(!record.entry.pass40Attachments?.some(a=>a.side===side&&a.slot===slot&&a.tag===tag)){points.set(key,null);return null;}
  const sdk=root.CQC_PASS41_NATIVE_ORIGINS;if(typeof sdk.sourcePoint!=='function')throw Error('Core native origin requires the reviewed pure source-point SDK');
  const point=sdk.sourcePoint(record.uid,record.fighter.costume,side,slot,tag);
  if(!point||point.evidence!=='reviewed-pass41-native-source-point')throw Error('Core native source authority changed or rejected its declared point');
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
  if(move?.projectile){if(actor.id!=='snake'||actor.attack?.name!==actualProjectileContract.moveName||!same(move,actualProjectileContract.move))throw Error('P41 Core projectile lost its exact existing move contract');const tag=projectileTags[kind];if(!tag||!actualSlot)return null;return authority(record,actualSlot,tag,actor.facing===-1?-1:1)?.selectedAction||null;}
  if(move?.utility){if(/reload|cylinder/i.test(move.utility))return 'reload';if(move.utility==='nanoHarden')return 'optic';if(['legacyCharge','acCycle','acReplan','acGuard','acDecoy'].includes(move.utility))return 'recover';if(move.utility==='ghostRoll')return 'roll';return null;}
  if(move?.level==='throw')return 'throw';if(move?.blade)return 'blade';if(move?.level==='low')return 'low';if(finite(move?.damage)&&move.damage>0)return 'punch';return null;
 }
 function poseFor(actor,move,pose={}){
  const record=owned(actor);if(!record||!move||pose.ko||pose.hit||pose.getup)return null;
  const action=sourceAction(record,actor,move,pose);if(!action||!record.entry.actions[action])return null;
  const actualSlot=slotFor(actor,pose,move),pairs=Object.entries(record.entry.actionMap||{}),alias=pairs.find(([slot,mapped])=>slot===actualSlot&&mapped===action)||pairs.find(([_slot,mapped])=>mapped===action);
  if(!alias)return null;
  return{...pose,moveSlot:alias[0],pass41CoreActualSlot:actualSlot,pass41CoreVisualAction:action};
 }
 function projectilePoint(actor,move,pose={}){
  const record=owned(actor);if(!record||!move?.projectile)return null;
  const tag=reviewedCoreSelection(record,actor,move,pose)?.nativeProjectileTag||projectileTags[move.projectile.kind],slot=slotFor(actor,pose,move),face=actor.facing===-1?-1:1;
  if(!tag||!slot)throw Error('P41 Core projectile has no reviewed slot');
  const point=authority(record,slot,tag,face);if(!point)throw Error('P41 Core projectile lost its reviewed native point');
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
  return{x,y,sourceFile:frame.file,sourceSHA256:frame.sha256,sourceRect:[...frame.rect],sourcePivot:[...frame.pivot],sourceNativeXY:[...point.sourceNativeXY],sourceSocket:point.sourceSocket,selectedAction:selected.action,selectedFrameIndex:selected.index,actualCoreSlot:slot,actualCoreMove:actor.attack?.name,actualCoreProjectileKind:move.projectile.kind,coreDisplayHeight:height,nativeSourceScale:scale,sourceScaleAppliedOnce:true,coordinateSpace:'core-world-positive-up',evidence:'reviewed-pass41-core-selected-source-point'};
 }
 function coverage(actor,move,pose={}){const record=owned(actor);if(!record)return{owned:false,supported:false,reason:'outside-reviewed-p40-costume'};const action=sourceAction(record,actor,move,pose),visual=action&&poseFor(actor,move,pose);return{owned:true,supported:!!visual,actualCoreSlot:slotFor(actor,pose,move),actualCoreMove:actor.attack?.name,actualCoreProjectileKind:move?.projectile?.kind||null,action:action||null,reason:visual?'reviewed-existing-source-action':'core-move-needs-separately-reviewed-source-art-or-action'};}
 root.CQC_PASS41_CORE_NATIVE_ORIGINS={version:'pass41-core-native-origins/1',owns:actor=>!!owned(actor),poseFor,projectilePoint,coverage};
 // The historical host calls this interface. Only exact P41 keys are intercepted.
 const prior=root.CQC_PASS40_CORE_NATIVE_ORIGINS;if(!prior?.owns||!prior?.poseFor||!prior?.projectilePoint)throw Error('Original Core origin interface absent');
 const isP41=actor=>scope.has('core__'+actor?.id+':'+actor?.costume);
 root.CQC_PASS40_CORE_NATIVE_ORIGINS={...prior,
  owns:function(actor){return isP41(actor)?!!owned(actor):prior.owns.apply(prior,arguments);},
  poseFor:function(actor){return isP41(actor)?poseFor.apply(null,arguments):prior.poseFor.apply(prior,arguments);},
  projectilePoint:function(actor){return isP41(actor)?projectilePoint.apply(null,arguments):prior.projectilePoint.apply(prior,arguments);},
  coverage:function(actor){return isP41(actor)?coverage.apply(null,arguments):prior.coverage.apply(prior,arguments);}};
 root.CQC_PASS41_CORE_NATIVE_ORIGINS.scope=Object.freeze([...scope.values()].map(v=>Object.freeze({...v})));
})(globalThis);
