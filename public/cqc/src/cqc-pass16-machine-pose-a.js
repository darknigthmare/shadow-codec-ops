/* PASS16 machine A: pure presentation adapters. The game owns all combat clocks and HP. */
(function(root){
 'use strict';
 const finite=(n)=>typeof n==='number'&&Number.isFinite(n);
 const value=(n,fallback=0)=>finite(n)?n:fallback;
 const clamp=(n,lo,hi)=>Math.max(lo,Math.min(hi,n));
 const RAD_TO_DEG=180/Math.PI;
 function corePose(state,options={}){
  const r=state?.boss;if(!r)return null;
  const a=r.attack,frame=value(state.frame,value(state.tick)),flags={},channels={};let id,origin;
  if(r.id==='gander'){
   id='gander_ghost_gbc2000';origin=[1160,0];
   const fold=r.phase===2?(r.transition?1-clamp(value(r.transition),0,135)/135:1):0;
   channels.ganderFold=fold;channels.ganderCollapseDrop=r.defeated===true?-(120-clamp(value(r.collapse),0,120))*.18:0;
   for(const side of ['near','far']){
    let lift=0;
    if(r.phase===1&&a?.kind==='stomp'&&a.leg===side){const age=value(a.t)-value(a.windup);if(age>=-34&&age<0)lift=Math.sin((age+34)/34*Math.PI/2)*112;else if(age>=0&&age<12)lift=112*(1-age/12);}
    channels['gander'+(side==='near'?'Near':'Far')+'Lift']=lift;
    flags['gander'+(side==='near'?'Near':'Far')+'LegDisabled']=value(r.legs?.[side],2400)<=0;
   }
   // Source-measured two-link presentation IK: retain actual stomp support heights.
   const rotate=(v,d)=>{const q=d*Math.PI/180,c=Math.cos(q),sn=Math.sin(q);return[c*v[0]-sn*v[1],sn*v[0]+c*v[1]];};
   for(const leg of [
    {label:'Near',u:[80,-84],v:[-25,-119],upper:-30},
    {label:'Far',u:[70.7,-88.2],v:[54.6,-102.9],upper:-35}
   ]){
    const u=rotate(leg.u,leg.upper),v=rotate(leg.v,leg.upper),lift=channels['gander'+leg.label+'Lift'];
    const target=[u[0]+v[0],u[1]+v[1]+lift+28*fold+77*fold];
    const aLen=Math.hypot(...leg.u),bLen=Math.hypot(...leg.v),distance=Math.max(.001,Math.hypot(...target));
    const upperAngle=Math.atan2(target[1],target[0])+Math.acos(clamp((aLen*aLen+distance*distance-bLen*bLen)/(2*aLen*distance),-1,1));
    const lowerAngle=Math.atan2(target[1]-aLen*Math.sin(upperAngle),target[0]-aLen*Math.cos(upperAngle));
    const upper=upperAngle*RAD_TO_DEG-Math.atan2(leg.u[1],leg.u[0])*RAD_TO_DEG;
    const lower=lowerAngle*RAD_TO_DEG-Math.atan2(leg.v[1],leg.v[0])*RAD_TO_DEG-upper;
    channels['gander'+leg.label+'Upper']=upper-leg.upper;
    channels['gander'+leg.label+'Lower']=lower;
    channels['gander'+leg.label+'FootLevel']=-(upper-leg.upper)-lower;
   }
   const open=(key)=>r.phase===2&&!r.transition&&!r.collapse&&value(r.modules?.[key])>0&&a?.kind===key&&value(a.t)>=18&&value(a.t)<value(a.windup)+value(a.active)+value(a.recovery)-10;
   flags.ganderMouthOpen=open('fire');flags.ganderMissilesOpen=open('missiles');flags.ganderCannonOpen=open('cannon');
   flags.ganderPhase2=r.phase===2;flags.ganderDefeated=r.defeated===true;
  }else if(r.id==='zeke'){
   id='zeke_pw_psp2010';origin=[1240,0];
   channels.zekeLift=a?.kind==='leap'&&value(a.t)>=value(a.windup)&&value(a.t)<value(a.windup)+value(a.active)&&value(a.active)>0?Math.sin((value(a.t)-value(a.windup))/value(a.active)*Math.PI)*145:0;
   channels.zekeDefeatDrop=r.defeated===true?-85:0;channels.zekeDefeatTilt=r.defeated===true?-.09*RAD_TO_DEG:0;
   flags.zekeRailDisabled=value(r.rail,2400)<=0;flags.zekeJetDisabled=value(r.jet,1600)<=0;flags.zekeDefeated=r.defeated===true;
  }else if(r.id==='shagohod'){
   id='shagohod_mgs3_ps2_2004';origin=[value(r.x,1190),0];
   channels.shagohodRearOpacityDelta=r.phase===1?0:-.58;
   channels.shagohodDefeatDrop=r.defeated===true?-65:0;channels.shagohodDefeatTilt=r.defeated===true?.04*RAD_TO_DEG:0;
   flags.shagohodPhase2=r.phase===2;flags.shagohodEngineDisabled=value(r.engine,5600)<=0;flags.shagohodDefeated=r.defeated===true;
  }else if(r.id==='sahelanthropus'){
   id='sahelanthropus_mgsv2015';origin=[value(r.x,1210),value(r.y)];
   const elapsed=r.defeated===true?145-clamp(value(r.collapse),0,145):0;
   channels.sahelCollapseDrop=-elapsed*.72;channels.sahelCollapseTilt=elapsed*.0014*RAD_TO_DEG;
   channels.sahelWhipArm=a?.kind==='whip'&&value(a.t)>=value(a.windup)&&value(a.t)<value(a.windup)+value(a.active)?1:0;
   flags.sahelPhaseRed=r.phase===2;flags.sahelLeftTankDisabled=value(r.tanks?.left,1600)<=0;flags.sahelRightTankDisabled=value(r.tanks?.right,1600)<=0;flags.sahelDefeated=r.defeated===true;
  }else return null;
  return {id:options.id||id,origin:options.origin||origin,frame,reducedMotion:options.reducedMotion===true,flags:{...flags,...(options.flags||{})},channels:{...channels,...(options.channels||{})}};
 }
 function acidPose(state,options={}){
  const boss=state?.boss||options.boss;if(boss!=='kodoque')return null;
  const parts=state?.parts||[];
  return {id:options.id||'kodoque_acid_psp2004',origin:options.origin||[1012,-590],frame:value(state?.frame),reducedMotion:options.reducedMotion===true,
   flags:{kodoquePhase2:state?.phase===2,kodoqueNearEmitterDisabled:finite(parts[0])&&parts[0]<=0,kodoqueFarEmitterDisabled:finite(parts[1])&&parts[1]<=0,...(options.flags||{})},
   channels:{kodoqueNearEmitterOpacityDelta:finite(parts[0])&&parts[0]<=0?-.55:0,kodoqueFarEmitterOpacityDelta:finite(parts[1])&&parts[1]<=0?-.55:0,...(options.channels||{})}};
 }
 const api={corePose,acidPose,version:'pass16-machine-a/2'};
 if(typeof module==='object'&&module.exports)module.exports=api;else root.CQC_PASS16_MACHINE_POSE_A=api;
})(typeof globalThis!=='undefined'?globalThis:this);
