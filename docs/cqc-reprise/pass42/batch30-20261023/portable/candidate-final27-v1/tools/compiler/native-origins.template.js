/* Reviewed P42 points are authoritative only for their exact selected source frame. */
(function(root){'use strict';
 const bindings=/* REVIEWED_BINDINGS */null;
 const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b),finite=Number.isFinite;
 const byKey=new Map(bindings.map(b=>[b.uid+':'+b.id,b]));
 function owns(p){return byKey.has(p?.f?.uid+':'+p?.f?.costume);}
 function point(p,move,options={},stageActive=false){
  const binding=byKey.get(p?.f?.uid+':'+p?.f?.costume);if(!binding||move?.kind!=='projectile')return null;
  const sprites=root.CQC_COMBAT_SPRITES,entry=sprites?.getEntry?.(p.f.uid,p.f);
  if(entry?.pass40Revision!==binding.revision||entry.review?.artAuditSHA256!==binding.artAuditSHA256||entry.mirror!==false)return null;
  const face=p.face===-1?-1:1,side=face===-1?'left':'right',actions=face===entry.facing?entry.actions:entry.oppositeActions;if(!actions)return null;
  const live=root.CQC_PASS19_VERSUS_SPATIAL?.poseFor?.(p,finite(options.frame)?options.frame:0)||{};
  const slot=p.attack?.name||move.slot;
  const selected=sprites.selectFrame({...entry,actions},{...live,moveSlot:slot,moveKind:move.kind,moveTag:move.tag,animationActive:true,attack:true,attackPhase:stageActive?'active':live.attackPhase||'active',phaseProgress:stageActive?0:finite(live.phaseProgress)?live.phaseProgress:0});
  const frame=selected?.frame;if(!frame)return null;
  const anchor=binding.anchors.find(a=>a.side===side&&a.slot===slot&&a.tag===move.tag&&a.action===selected.action&&a.file===frame.file&&a.sourceSHA256===frame.sha256&&same(a.rect,frame.rect)&&same(a.pivot,frame.pivot));if(!anchor)return null;
  const heightReference=entry.sourceFrameHeights?.[frame.file],scale=entry.displayHeight/heightReference;
  if(!finite(scale)||scale<=0)return null;
  const forward=(anchor.nativeXY[0]-frame.rect[0]-frame.pivot[0]*frame.rect[2])*scale*face;
  const height=(frame.rect[1]+frame.pivot[1]*frame.rect[3]-anchor.nativeXY[1])*scale;
  if(!finite(forward)||!finite(height)||Math.abs(forward)>2000||height<=0||height>2000)return null;
  return{forward,height,sourceFile:frame.file,sourceSHA256:frame.sha256,sourceRect:[...frame.rect],sourcePivot:[...frame.pivot],sourceNativeXY:[...anchor.nativeXY],sourceSocket:anchor.socket,selectedAction:selected.action,selectedFrameIndex:selected.index,reviewKind:'guarded-selected-native-costume-socket',evidence:'reviewed-pass42-native-source-point',worldScaleApplied:false};
 }
 // Pure native source lookup: no engine actor, animation phase, or Versus profile query.
 function sourcePoint(uid,costume,side,slot,tag){
  if(!['right','left'].includes(side))return null;
  const binding=byKey.get(uid+':'+costume);if(!binding)return null;
  const entry=root.CQC_COMBAT_SPRITES?.getEntry?.(uid,{uid,costume});
  if(binding.revision!=='native-batch40-v2'||entry?.pass40Revision!==binding.revision||entry.review?.artAuditSHA256!==binding.artAuditSHA256||entry.review?.status!=='approved'||typeof entry.review.reviewer!=='string'||!entry.review.reviewer.startsWith('Root')||!/^[a-f0-9]{64}$/.test(binding.artAuditSHA256||'')||entry.mirror!==false||entry.fallbackMissingActions!==false)return null;
  const matches=binding.anchors.filter(a=>a.side===side&&a.slot===slot&&a.tag===tag);if(!matches.length)return null;if(matches.length!==1)throw Error('Ambiguous reviewed native source point');
  const anchor=matches[0],face=side==='right'?1:-1,actions=face===entry.facing?entry.actions:entry.oppositeActions;
  const index=actions?.[anchor.action]?.frames?.findIndex(frame=>frame.file===anchor.file&&frame.sha256===anchor.sourceSHA256&&same(frame.rect,anchor.rect)&&same(frame.pivot,anchor.pivot));
  if(!Number.isInteger(index)||index<0)throw Error('Reviewed socket source is absent from its native action');
  return{sourceFile:anchor.file,sourceSHA256:anchor.sourceSHA256,sourceRect:[...anchor.rect],sourcePivot:[...anchor.pivot],sourceNativeXY:[...anchor.nativeXY],sourceSocket:anchor.socket,selectedAction:anchor.action,selectedFrameIndex:index,reviewKind:'guarded-selected-native-costume-socket',evidence:'reviewed-pass42-native-source-point',worldScaleApplied:false,sourceAuthorityMethod:'pure-source-point'};
 }
 function projectile(p,move,options={}){return point(p,move,options,false);}
 function install(){const origins=root.CQC_PASS19_NATIVE_ORIGINS;if(!origins||typeof origins.projectile!=='function')return false;const fingerprint=JSON.stringify(bindings);if(origins.projectile.pass42BindingFingerprint===fingerprint)return true;const prior=origins.projectile.pass42BaseOrigin||origins.projectile;const wrapped=function(p,move,options={}){if(owns(p)&&move?.kind==='projectile'){const result=point(p,move,options,false);if(result)return result;const live=root.CQC_PASS19_VERSUS_SPATIAL?.poseFor?.(p,finite(options.frame)?options.frame:0)||{};if(live.attackPhase!=='active'){const staged=point(p,move,options,true);if(staged)return{...staged,evidence:'reviewed-pass42-inactive-phase-active-point',sourcePhase:live.attackPhase||'inactive',visualActiveFrameProxy:true};}throw Error('Le point de tir natif P42 sélectionné ne correspond pas à sa source vérifiée.');}return prior.call(origins,p,move,options);};wrapped.pass42ReviewedOrigins=true;wrapped.pass42BindingFingerprint=fingerprint;wrapped.pass42BaseOrigin=prior;origins.projectile=wrapped;return true;}
 root.CQC_PASS42_NATIVE_ORIGINS={version:'pass42-reviewed-native-origins/1',owns,projectile,sourcePoint,install};install();
})(globalThis);
