/* P43 exact Sam costume only: focus is preparation, not a sword strike. */
(function(root){'use strict';
 const rows=/* REVIEWED_VISUAL_OVERRIDES */null,same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);let selections=0,lastSelection=null;
 function selectFrame(entry,pose={}){
  if(pose.ko||pose.hit||pose.getup||!(pose.animationActive||pose.attack))return null;
  const row=rows.find(r=>r.uid===entry?.uid&&r.slot===pose.moveSlot&&r.kind===pose.moveKind&&r.artAuditSHA256===entry.review?.artAuditSHA256);if(!row)return null;
  if(row.uid!=='core__sam'||row.id!=='mgr-breathing-mask-closed'||row.slot!=='specialForward'||row.kind!=='buff'||row.action!=='charge'||!same(row.roles,[9,9,1]))throw Error('P43 visual override outside its finite reviewed source plan');
  if(entry.review?.status!=='approved'||!entry.review.reviewer?.startsWith('Root')||entry.mirror!==false||entry.fallbackMissingActions!==false||entry.pass40Revision!=='native-batch40-v2')throw Error('P43 Sam focus lost reviewed native source');
  const action=entry.actions?.charge,indices=entry.phaseMap?.charge?.[pose.attackPhase];if(!action||!indices?.length)throw Error('P43 Sam focus lacks physical phase');
  const p=Math.max(0,Math.min(1,Number.isFinite(pose.phaseProgress)?pose.phaseProgress:0)),index=indices[Math.min(indices.length-1,Math.floor(p*indices.length))],frame=action.frames[index];
  if(action.frames.length!==3||action.frames.some((f,i)=>f.physicalPoseIndex!==row.roles[i])||!frame.file.startsWith('assets/combat-costumes-pass43/'+row.uid+'/'+row.id+'/'))throw Error('P43 Sam focus source changed');
  selections++;lastSelection={uid:row.uid,id:row.id,slot:row.slot,kind:row.kind,action:'charge',phase:pose.attackPhase,index,physicalPoseIndex:frame.physicalPoseIndex,sourceFile:frame.file,sourceSHA256:frame.sha256,sourceRect:[...frame.rect],sourcePivot:[...frame.pivot]};return{frame,requested:'charge',action:'charge',index,phase:pose.attackPhase,presentation:'reviewed-pass43-sam-focus-source-frame'};
 }
 function install(){const prior=root.CQC_PASS40_VS_DELAYED_BURSTS;if(prior?.selectFrame?.pass43VisualSource===selectFrame)return true;const wrapped=function(...args){return selectFrame(...args)||prior?.selectFrame?.apply(prior,args)||null;};wrapped.pass43VisualSource=selectFrame;root.CQC_PASS40_VS_DELAYED_BURSTS={...prior,selectFrame:wrapped};return true;}
 root.CQC_PASS43_NATIVE_VISUAL_ACTIONS=Object.freeze({selectFrame,install,diagnostics:()=>({scope:rows.map(r=>r.uid+':'+r.id),selections,lastSelection:lastSelection?{...lastSelection}:null,gameplayChanged:false})});install();
})(globalThis);
