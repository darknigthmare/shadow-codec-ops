/* Compiler template: only physically reviewed source points may be inserted. */
(function(root){'use strict';
 const bindings=/* P40_REVIEWED_SOURCE_BINDINGS */null;
 if(!Array.isArray(bindings)||bindings.length!==1)throw Error('P40 source-point review has not been compiled');
 const finite=Number.isFinite,same=(a,b)=>JSON.stringify(a)===JSON.stringify(b),hash=s=>typeof s==='string'&&/^[a-f0-9]{64}$/.test(s);
 const accepted=new Map();
 for(const binding of bindings){
  if(binding.uid!=='core__snake'||binding.id!=='mgs3-camo-soviet-woodland'||!hash(binding.artAuditSHA256)||binding.revision!=='pass40-soviet-woodland-native-v1'||!Array.isArray(binding.anchors)||binding.anchors.length!==4)throw Error('Unreviewed P40 source binding');
  if(accepted.has(binding.uid+':'+binding.id))throw Error('Repeated P40 source binding');
  const slots=new Set();
  for(const a of binding.anchors){
   const expected=a.slot==='special'?{action:'shoot',tag:'tranq',socket:'mk22-suppressor-muzzle'}:a.slot==='specialDown'?{action:'deploy',tag:'explosive',socket:'grenade-release-hand'}:null;
   if(!expected||!['left','right'].includes(a.side)||a.action!==expected.action||a.tag!==expected.tag||a.socket!==expected.socket||!hash(a.sourceSHA256)||typeof a.file!=='string'||!/^assets\/[a-zA-Z0-9_./-]+\.png$/.test(a.file)||a.file.split('/').some(s=>s==='..'||s==='.')||!Array.isArray(a.rect)||a.rect.length!==4||!a.rect.every(finite)||a.rect[0]<0||a.rect[1]<0||a.rect[2]<=0||a.rect[3]<=0||!Array.isArray(a.pivot)||a.pivot.length!==2||a.pivot.some(n=>!finite(n)||n<0||n>1)||!Array.isArray(a.nativeXY)||a.nativeXY.length!==2||!a.nativeXY.every(finite))throw Error('Invalid P40 source point');
   if(a.nativeXY[0]<a.rect[0]||a.nativeXY[0]>a.rect[0]+a.rect[2]||a.nativeXY[1]<a.rect[1]||a.nativeXY[1]>a.rect[1]+a.rect[3])throw Error('P40 point outside its native frame');
   const key=a.side+':'+a.slot;if(slots.has(key))throw Error('Repeated P40 point');slots.add(key);
  }
  accepted.set(binding.uid+':'+binding.id,binding);
 }
 function projectile(p,move,options={}){
  const binding=accepted.get(p?.f?.uid+':'+p?.f?.costume);if(!binding||move?.kind!=='projectile')return null;
  const sprites=root.CQC_COMBAT_SPRITES,entry=sprites?.getEntry?.(p.f.uid,p.f);
  if(entry?.pass40Revision!==binding.revision||entry.review?.artAuditSHA256!==binding.artAuditSHA256||entry.mirror!==false)return null;
  const face=p.face===-1?-1:1,side=face===-1?'left':'right',actions=face===entry.facing?entry.actions:entry.oppositeActions;
  if(!actions)return null;
  const live=root.CQC_PASS19_VERSUS_SPATIAL?.poseFor?.(p,finite(options.frame)?options.frame:0)||{};
  const slot=p.attack?.name||move.slot||'special';
  const selected=sprites.selectFrame({...entry,actions},{...live,moveSlot:slot,moveKind:move.kind,moveTag:move.tag,animationActive:true,attack:true,attackPhase:live.attackPhase||'active',phaseProgress:finite(live.phaseProgress)?live.phaseProgress:0});
  const frame=selected?.frame;if(!frame)return null;
  const anchor=binding.anchors.find(a=>a.side===side&&a.slot===slot&&a.tag===move.tag&&a.action===selected.action&&a.file===frame.file&&a.sourceSHA256===frame.sha256&&same(a.rect,frame.rect)&&same(a.pivot,frame.pivot));
  if(!anchor)return null;
  const sourceHeight=entry.sourceFrameHeights?.[frame.file];
  if(!finite(sourceHeight)||sourceHeight<=0||!finite(entry.displayHeight)||entry.displayHeight<=0)return null;
  const scale=entry.displayHeight/sourceHeight;
  const x=anchor.nativeXY[0]-(frame.rect[0]+frame.pivot[0]*frame.rect[2]);
  const y=(frame.rect[1]+frame.pivot[1]*frame.rect[3])-anchor.nativeXY[1];
  const forward=x*scale*face,height=y*scale;
  if(!finite(forward)||!finite(height)||Math.abs(forward)>2000||height<=0||height>2000)return null;
  return{forward,height,sourceFile:frame.file,sourceSHA256:frame.sha256,sourceRect:[...frame.rect],sourcePivot:[...frame.pivot],sourceNativeXY:[...anchor.nativeXY],sourceSocket:anchor.socket,selectedAction:selected.action,selectedFrameIndex:selected.index,reviewKind:'guarded-selected-native-costume-socket',evidence:'reviewed-pass40-canonical-source-point',worldScaleApplied:false};
 }
 function install(){
  const origins=root.CQC_PASS19_NATIVE_ORIGINS;if(!origins||typeof origins.projectile!=='function')return false;
  if(origins.projectile.pass40CanonicalSourcePoints===true)return true;
  const prior=origins.projectile;
  const wrapped=function(p,move,options={}){return projectile(p,move,options)||prior.call(origins,p,move,options);};
  wrapped.pass40CanonicalSourcePoints=true;origins.projectile=wrapped;return true;
 }
 root.CQC_PASS40_CANONICAL_ORIGINS={version:'pass40-canonical-source-origins/1',projectile,install};install();
})(globalThis);
