/* Core uses its actual move and drawing scale; native sockets retain the P40 source authority. */
(function(root){'use strict';
 const finite=Number.isFinite,same=(a,b)=>JSON.stringify(a)===JSON.stringify(b),cache=new WeakMap();
 const projectileTags={bullet:'ballistic',tranq:'tranq',grenade:'explosive'};
 function owned(actor){
  if(!actor?.id||!actor.costume||actor.costume==='original')return null;
  const uid='core__'+actor.id,fighter={uid,costume:actor.costume},sprites=root.CQC_COMBAT_SPRITES,entry=sprites?.getEntry?.(uid,fighter);
  if(entry?.pass40Revision!=='native-batch40-v2')return null;
  if(entry.mirror!==false||entry.fallbackMissingActions!==false
    ||entry.review?.status!=='approved'||typeof entry.review.reviewer!=='string'||!entry.review.reviewer.startsWith('Root')
    ||!/^[a-f0-9]{64}$/.test(entry.review.artAuditSHA256||''))throw Error('Core P40 selected metadata lost its reviewed native contract');
  const descriptor=root.CQC_NATIVE_WARDROBE_INDEX?.entries?.find(d=>d.uid===uid&&d.id===actor.costume);
  if(descriptor?.review?.artAuditSHA256!==entry.review.artAuditSHA256
    ||root.CQC_PASS40_NATIVE_ORIGINS?.owns?.({f: fighter})!==true)throw Error('Core P40 selected metadata no longer matches its pinned source authority');
  return{uid,fighter,entry,sprites};
 }
 function authority(record,slot,tag,face){
  let points=cache.get(record.entry);if(!points){points=new Map();cache.set(record.entry,points);}
  const key=slot+':'+tag+':'+face;if(points.has(key))return points.get(key);
  const side=face===-1?'left':'right';
  if(!record.entry.pass40Attachments?.some(a=>a.side===side&&a.slot===slot&&a.tag===tag)){points.set(key,null);return null;}
  const sdk=root.CQC_PASS40_NATIVE_ORIGINS;if(typeof sdk.sourcePoint!=='function')throw Error('Core native origin requires the reviewed pure source-point SDK');
  const point=sdk.sourcePoint(record.uid,record.fighter.costume,side,slot,tag);
  if(!point||point.evidence!=='reviewed-pass40-native-source-point')throw Error('Core native source authority changed or rejected its declared point');
  points.set(key,point||null);return point||null;
 }
 // Identical Core slot ownership order to P16 slotFor; never use its later visual alias.
 function slotFor(actor,pose,move){
  const name=actor.attack?.name;if(name===actor.special)return 'special';if(name===actor.secondary)return 'specialDown';
  if(name===actor.backSpecial)return 'specialBack';if(name===actor.forwardSpecial)return 'specialForward';if(name==='super')return 'super';
  if(['throw','cqcLock'].includes(name)||move?.level==='throw')return 'throw';if(['sweep','low'].includes(name)||move?.level==='low')return 'low';
  if(['light','airLight'].includes(name))return 'light';if(['medium','heavy','airHeavy','launcher','rush'].includes(name))return 'heavy';return null;
 }
 function sourceAction(record,actor,move,pose){
  const actualSlot=slotFor(actor,pose,move),kind=move?.projectile?.kind;
  if(move?.projectile){const tag=projectileTags[kind];if(!tag||!actualSlot)return null;return authority(record,actualSlot,tag,actor.facing===-1?-1:1)?.selectedAction||null;}
  if(move?.utility){if(/reload|cylinder/i.test(move.utility))return 'reload';if(move.utility==='nanoHarden')return 'optic';if(['legacyCharge','acCycle','acReplan','acGuard','acDecoy'].includes(move.utility))return 'recover';if(move.utility==='ghostRoll')return 'roll';return null;}
  if(move?.level==='throw')return 'throw';if(move?.blade)return 'blade';if(move?.level==='low')return 'low';if(finite(move?.damage)&&move.damage>0)return 'punch';return null;
 }
 function poseFor(actor,move,pose={}){
  const record=owned(actor);if(!record||!move||pose.ko||pose.hit||pose.getup)return null;
  const action=sourceAction(record,actor,move,pose);if(!action||!record.entry.actions[action])return null;
  const actualSlot=slotFor(actor,pose,move),pairs=Object.entries(record.entry.actionMap||{}),alias=pairs.find(([slot,mapped])=>slot===actualSlot&&mapped===action)||pairs.find(([_slot,mapped])=>mapped===action);
  if(!alias)return null;
  return{...pose,moveSlot:alias[0],pass40CoreActualSlot:actualSlot,pass40CoreVisualAction:action};
 }
 function projectilePoint(actor,move,pose={}){
  const record=owned(actor);if(!record||!move?.projectile)return null;
  const tag=projectileTags[move.projectile.kind],slot=slotFor(actor,pose,move),face=actor.facing===-1?-1:1;
  if(!tag||!slot)return null;
  const point=authority(record,slot,tag,face);if(!point)return null;
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
  return{x,y,sourceFile:frame.file,sourceSHA256:frame.sha256,sourceRect:[...frame.rect],sourcePivot:[...frame.pivot],sourceNativeXY:[...point.sourceNativeXY],sourceSocket:point.sourceSocket,selectedAction:selected.action,selectedFrameIndex:selected.index,actualCoreSlot:slot,actualCoreMove:actor.attack?.name,actualCoreProjectileKind:move.projectile.kind,coreDisplayHeight:height,nativeSourceScale:scale,sourceScaleAppliedOnce:true,coordinateSpace:'core-world-positive-up',evidence:'reviewed-pass40-core-selected-source-point'};
 }
 function coverage(actor,move,pose={}){const record=owned(actor);if(!record)return{owned:false,supported:false,reason:'outside-reviewed-p40-costume'};const action=sourceAction(record,actor,move,pose),visual=action&&poseFor(actor,move,pose);return{owned:true,supported:!!visual,actualCoreSlot:slotFor(actor,pose,move),actualCoreMove:actor.attack?.name,actualCoreProjectileKind:move?.projectile?.kind||null,action:action||null,reason:visual?'reviewed-existing-source-action':'core-move-needs-separately-reviewed-source-art-or-action'};}
 root.CQC_PASS40_CORE_NATIVE_ORIGINS={version:'pass40-core-native-origins/1',owns:actor=>!!owned(actor),poseFor,projectilePoint,coverage};
})(globalThis);
