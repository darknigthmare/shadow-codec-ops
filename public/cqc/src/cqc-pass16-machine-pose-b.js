/* Five-machine PASS16 read-only pose proposal; not a gameplay engine. */
(function(root){
  'use strict';
  const IDS=Object.freeze({pupa:'pupa_pw_psp2010',chrysalis:'chrysalis_pw_psp2010',cocoon:'cocoon_pw_psp2010',peace_walker:'peacewalker_pw_psp2010'});
  const finite=(v)=>typeof v==='number'&&Number.isFinite(v);
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  function corePose(state,options={}){
    const r=state?.boss,id=IDS[r?.id];if(!id)return null;
    const frame=finite(state.frame)?state.frame:finite(state.tick)?state.tick:0;
    const reducedMotion=options.reducedMotion===true,cosmetic=reducedMotion?0:Math.sin(frame*.045);
    const attack=r.attack,active=!!attack&&attack.t>=attack.windup&&attack.t<attack.windup+attack.active;
    const stomp=r.id==='peace_walker'&&r.radar>0&&attack?.kind==='stomp'?Math.sin(clamp(attack.t/(attack.windup+attack.active),0,1)*Math.PI):0;
    return{id:options.id||id,origin:options.origin||[finite(r.x)?r.x:1150,finite(r.y)?r.y:0],frame,reducedMotion,
      flags:{pwDefeated:r.defeated===true,pwModuleDisabled:r.id!=='pupa'&&r.radar<=0,pwPodEntered:r.inPod===true,pwRecovery:r.phase==='recovery',pwLaunchWarning:attack?.kind==='launch',pwRailWarning:attack?.kind==='rail'&&attack.t<attack.windup,...(options.flags||{})},
      channels:{pwIdle:cosmetic,pwActiveWeapon:active?1:0,pwStomp:stomp,pwCannonRecoil:active&&attack.kind==='cannon'?1:0,pwPodEntry:r.inPod===true?1:0,pwModuleDamage:r.id==='chrysalis'?clamp(1-(finite(r.radar)?r.radar:1600)/1600,0,1):r.id==='cocoon'||r.id==='peace_walker'?clamp(1-(finite(r.radar)?r.radar:2400)/2400,0,1):0,pwCollapseTilt:r.defeated===true?-1.4323944878:0,...(options.channels||{})}};
  }
  function acidPose(state,options={}){
    if(state?.boss!=='chaioth')return null;
    return{id:options.id||'chaioth_acid2_psp2005',origin:options.origin||[1010,-590],frame:finite(options.frame)?options.frame:0,reducedMotion:options.reducedMotion===true,
      flags:{chaiothNearJointDisabled:state.parts?.[0]<=0,chaiothFarJointDisabled:state.parts?.[1]<=0,chaiothCoreExposed:state.phase>=2,chaiothOverload:state.overload===true,chaiothRailWarning:state.attackKind==='rail'&&state.attackStage==='warn',chaiothDefeated:finite(state.body)&&state.body<=0,...(options.flags||{})},
      channels:{chaiothNearJointDamage:clamp(1-(finite(state.parts?.[0])?state.parts[0]:2400)/(finite(state.partsMax?.[0])&&state.partsMax[0]>0?state.partsMax[0]:2400),0,1),chaiothFarJointDamage:clamp(1-(finite(state.parts?.[1])?state.parts[1]:2400)/(finite(state.partsMax?.[1])&&state.partsMax[1]>0?state.partsMax[1]:2400),0,1),...(options.channels||{})}};
  }
  const api={ids:IDS,corePose,acidPose};if(typeof module==='object'&&module.exports)module.exports=api;
  else root.CQC_PASS16_MACHINE_POSE_B=api;
})(typeof globalThis!=='undefined'?globalThis:this);
