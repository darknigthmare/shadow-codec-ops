(function(root){
 'use strict';
 const finite=(n,d=0)=>Number.isFinite(n)?n:d,clamp=n=>Math.max(0,Math.min(1,n));
 const actionMap={idle:'idle',stand:'idle',guard:'guard',block:'guard',walk:'walk',run:'walk',dash:'walk',light:'strike',attack:'strike',heavy:'kick',shoot:'fire',special:'special',super:'special',hurt:'hurt',hit:'hurt',dead:'collapse',defeated:'collapse',finisher:'special'};
 function pose(uid,description={}){
  const t=finite(description.frame,finite(description.actionTime,finite(description.time)*60)),raw=description.action||(description.ko||description.defeated?'dead':description.hit?'hurt':description.guard?'guard':description.walk?'walk':description.animationActive||description.attack?(description.moveKind==='projectile'?'shoot':description.moveSlot==='heavy'||description.moveSlot==='low'?'heavy':/^special|super/.test(description.moveSlot||'')?'special':'light'):'idle'),kind=actionMap[raw]||(/attack|slash/.test(raw)?'strike':'idle'),move=kind==='walk',phase=clamp(finite(description.phaseProgress,.5)),pulse=Math.sin(phase*Math.PI),wave=Math.sin(t*.115),coat=uid.includes('trenchcoat'),humanoid=coat||uid.includes('humanoid'),flags={...(description.flags||{})};
  const channels={idleBreath:Math.sin(t*.035),cameraSweep:Math.sin(t*.025)*3,collapse:kind==='collapse'?clamp(finite(description.collapseProgress,description.ko||description.defeated?1:phase)):0,weaponAim:finite(description.weaponAim),weaponRecoil:/fire|special/.test(kind)?-pulse*6:0};
  for(const pfx of ['near','far']){
   const sign=pfx==='near'?1:-1;
   channels[pfx+'Swing']=move?wave*14*sign:0;
   channels[pfx+'Knee']=move?Math.max(0,-wave*sign)*22:0;
   channels[pfx+'Foot']=move?-channels[pfx+'Swing']-channels[pfx+'Knee']:0;
   channels[pfx+'Lift']=move?Math.max(0,wave*sign)*6:0;
   channels[pfx+'ArmSwing']=move?-wave*13*sign:0;
   channels[pfx+'ArmBend']=0;
  }
  if(kind==='guard'){
   channels.nearArmSwing=-32;channels.nearArmBend=-34;channels.farArmSwing=18;channels.farArmBend=-32;channels.nearKnee=7;channels.farKnee=7;
  }
  if(kind==='strike'||kind==='special'){
   if(humanoid){channels.nearArmSwing=pulse*-66;channels.nearArmBend=pulse*25;channels.farArmSwing=pulse*15;channels.farArmBend=pulse*-15;}
   else{channels.nearSwing=pulse*-16;channels.nearKnee=pulse*19;channels.nearFoot=pulse*-9;channels.weaponRecoil=-pulse*4;}
  }
  if(kind==='kick'){channels.nearSwing=pulse*-34;channels.nearKnee=pulse*48;channels.nearFoot=pulse*-14;channels.nearLift=pulse*7;if(humanoid){channels.nearArmSwing=pulse*10;channels.farArmSwing=pulse*-14;}}
  if(kind==='hurt'){channels.nearSwing=pulse*6;channels.farSwing=pulse*-6;channels.nearKnee=pulse*18;channels.farKnee=pulse*18;channels.nearArmSwing=pulse*17;channels.farArmSwing=pulse*-17;}
  if(coat&&description.coatOpened===true)flags.coatOpened=true;
  Object.assign(channels,description.channels||{});
  return{id:uid,origin:description.origin||[0,0],frame:t,reducedMotion:description.reducedMotion===true,flags,channels};
 }
 root.CQC_PASS19_GEKKO_POSES={schema:'cqc.pass19-gekko-poses/1',actionMap,pose};
})(globalThis);
