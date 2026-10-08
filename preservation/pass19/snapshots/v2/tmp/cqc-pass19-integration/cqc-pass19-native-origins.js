/* Native 2D attachment sockets. Source-local; spatial adapter scales once. */
(function(root){'use strict';
 const equal=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 function projectile(p,m){
  if(!p?.f||!m)return null;
  const entry=root.CQC_COMBAT_SPRITES?.getEntry(p.f.uid,p.f);
  const evidence=root.CQC_PASS19_CREATURE_ATTACHMENTS?.entries?.[p.f.uid]||root.CQC_PASS19_BOX_ATTACHMENTS?.entries?.[p.f.uid];
  if(!entry||!evidence)return null;
  const side=p.face===-1?'left':'right',actions=p.face===entry.facing?entry.actions:entry.oppositeActions;
  if(!actions)return null;
  const directional={...entry,actions};
  const selected=root.CQC_COMBAT_SPRITES.selectFrame(directional,{moveSlot:m.slot,moveKind:m.kind,moveTag:m.tag,attack:true,animationActive:true,attackPhase:'active',phaseProgress:0,actionTime:0,time:0});
  const frame=selected?.frame;if(!frame)return null;
  const anchor=Object.values(evidence.sides?.[side]||{}).find(a=>a.file===frame.file&&a.sourceSHA256===frame.sha256&&equal(a.rect,frame.rect)&&equal(a.pivot,frame.pivot));
  if(!anchor)return null;
  const fraction=anchor.frameFraction;if(!Array.isArray(fraction)||fraction.length!==2||fraction.some(v=>!Number.isFinite(v)||v<0||v>1))return null;
  const factor=entry.displayHeight/(entry.sourceFrameHeights?.[frame.file]||entry.baseFrameHeight||frame.rect[3]);
  const forward=(fraction[0]-frame.pivot[0])*frame.rect[2]*factor*p.face;
  const height=(frame.pivot[1]-fraction[1])*frame.rect[3]*factor;
  if(forward<0||height<=0||forward>1000||height>1000)return null;
  return{forward,height,sourceFile:frame.file,sourceSHA256:frame.sha256,sourceRect:[...frame.rect],reviewKind:'reviewed-native-2d-attachment',worldScaleApplied:false};
 }
 root.CQC_PASS19_NATIVE_ORIGINS={version:'pass19-native-2d-origins/1',projectile};
})(globalThis);
