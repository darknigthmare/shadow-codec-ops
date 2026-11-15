/* Pure presentation adapters; all battle decisions remain in the original engines. */
(function(root){
 'use strict';
 const reduced=()=>root.matchMedia?.('(prefers-reduced-motion: reduce)').matches===true;
 root.CQC_PASS16_MACHINE_POSE=Object.freeze({
  corePose:(state,options={})=>root.CQC_PASS16_MACHINE_POSE_A?.corePose(state,options)||root.CQC_PASS16_MACHINE_POSE_B?.corePose(state,options)||null,
  acidPose:(state,key)=>{
   const options={boss:key,reducedMotion:reduced()};
   const result=root.CQC_PASS16_MACHINE_POSE_A?.acidPose(state,options)||root.CQC_PASS16_MACHINE_POSE_B?.acidPose(state,options)||null;
   if(result&&Number.isFinite(state?.startedAt)&&Number.isFinite(state?.t))result.frame=Math.max(0,(state.startedAt-state.t)*60);
   return result;
  }
 });
})(globalThis);
