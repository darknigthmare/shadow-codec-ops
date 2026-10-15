/* The projectile starts at the selected native costume's reviewed source socket. */
(function(root){'use strict';
 const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 const finite=Number.isFinite;
 function projectile(p,move,options={}){
  if(!p?.f||!move||!p.f.costume||p.f.costume==='original')return null;
  const sprites=root.CQC_COMBAT_SPRITES,entry=sprites?.getEntry?.(p.f.uid,p.f);
  if(!/^native-(?:retro|nextgen|tuxedo|cyborg-mgr)-v1$/.test(entry?.pass21Revision||'')||!Array.isArray(entry.pass21Attachments))return null;
  const face=p.face===-1?-1:1,side=face===-1?'left':'right';
  const actions=face===entry.facing?entry.actions:entry.oppositeActions;if(!actions)return null;
  const live=root.CQC_PASS19_VERSUS_SPATIAL?.poseFor?.(p,finite(options.frame)?options.frame:0)||{};
  const pose={...live,moveSlot:p.attack?.name||move.slot||'special',moveKind:move.kind,moveTag:move.tag,
   animationActive:true,attack:true,attackPhase:live.attackPhase||'active',phaseProgress:finite(live.phaseProgress)?live.phaseProgress:0};
  const selected=sprites.selectFrame({...entry,actions},pose),frame=selected?.frame;if(!frame)return null;
  const anchor=entry.pass21Attachments.find(a=>a.side===side&&a.file===frame.file&&a.sourceSHA256===frame.sha256&&same(a.rect,frame.rect)&&same(a.pivot,frame.pivot)
   &&(!a.action||a.action===selected.action)&&(!a.moveKinds||Array.isArray(a.moveKinds)&&a.moveKinds.includes(move.kind)));
  if(!anchor||typeof anchor.socket!=='string'||!anchor.socket.trim())return null;
  const fraction=anchor.frameFraction,xy=anchor.nativeXY;
  if(!Array.isArray(fraction)||fraction.length!==2||fraction.some(v=>!finite(v)||v<0||v>1)||!Array.isArray(xy)||xy.length!==2||xy.some(v=>!finite(v)))return null;
  if(Math.abs(xy[0]-(frame.rect[0]+fraction[0]*frame.rect[2]))>.05||Math.abs(xy[1]-(frame.rect[1]+fraction[1]*frame.rect[3]))>.05)return null;
  const k=entry.displayHeight/(entry.sourceFrameHeights?.[frame.file]||entry.baseFrameHeight||frame.rect[3]);
  const forward=(fraction[0]-frame.pivot[0])*frame.rect[2]*k*face,height=(frame.pivot[1]-fraction[1])*frame.rect[3]*k;
  if(!finite(k)||k<=0||!finite(forward)||!finite(height)||Math.abs(forward)>2000||height<=0||height>2000)return null;
  return{forward,height,sourceFile:frame.file,sourceSHA256:frame.sha256,sourceRect:[...frame.rect],sourcePivot:[...frame.pivot],
   sourceNativeXY:[...xy],sourceSocket:anchor.socket,selectedAction:selected.action,selectedFrameIndex:selected.index,
   reviewKind:'guarded-selected-native-costume-socket',evidence:'reviewed-pass21-source-pixel-socket',worldScaleApplied:false};
 }
 function install(){
  const old=root.CQC_PASS19_NATIVE_ORIGINS;if(!old||typeof old.projectile!=='function')return false;
  if(old.projectile.pass21NativeSockets===true)return true;
  const prior=old.projectile,wrapped=function(p,move,options={}){return projectile(p,move,options)||prior.call(old,p,move,options);};
  wrapped.pass21NativeSockets=true;old.projectile=wrapped;return true;
 }
 root.CQC_PASS21_NATIVE_COSTUME_ORIGINS={version:'pass21-native-costume-origins/1',projectile,install};install();
})(globalThis);
