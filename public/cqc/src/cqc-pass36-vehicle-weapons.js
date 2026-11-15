/* PASS36: admitted ballistic weapons for the original MGS1 M1 / MGS2 Harrier.
 * The owner still schedules attacks, ages events, moves bullets and resolves damage.
 * No laser, missile launcher, new health pool, timer or independent clock is added.
 */
(function(root){'use strict';
 const finite=Number.isFinite,clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
 const limits=Object.freeze([
  'Original-edition references establish M1 tank cannon / machine gun and Harrier underside gun pod. These 2D animations and burst timings remain CQC adaptations, not extracted original animations or a 1:1 certificate.',
  'Harrier uses only the left visible GAU-12 gun pod from its untouched native atlas. Missile rails and their uncertain wing joints are not admitted by this helper.',
  'Legacy beam slots become one ballistic round with the same 720 damage budget and original warning/active/recovery values. Legacy Harrier volleys become three 520-damage rounds, three owner frames apart within the existing recovery; their scheduler and total 1560 budget are unchanged.',
  'The M1 cannon keeps its existing mechanical elevation limits. Harrier cannon aim is fixed to the pod / aircraft pose. Projectiles continue from the release snapshot; no later retargeting or ghost source is used.'
 ]);
 function supported(s){return s?.def?.id==='m1tank'||s?.def?.id==='harrier';}
 function patterns(s,legacy=null){
  if(s?.def?.id==='m1tank')return [{kind:'stomp',sources:[0]},{kind:'stomp',sources:[1]},{kind:'shot',sources:[2],legacyKind:'beam',vehicleWeapon:'m1-cannon'}];
  if(s?.def?.id==='harrier')return [{kind:'volley',sources:[0],legacyKind:'volley',vehicleWeapon:'harrier-cannon'},{kind:'shot',sources:[0],legacyKind:'beam',vehicleWeapon:'harrier-cannon'},{kind:'volley',sources:[0],legacyKind:'volley',vehicleWeapon:'harrier-cannon'}];
  return legacy;
 }
 function handles(s,e){return supported(s)&&e&&['beam','shot','volley'].includes(e.kind)&&(!e.vehicleWeapon||['m1-cannon','harrier-cannon'].includes(e.vehicleWeapon));}
 function vector(s,e){const v=root.CQC_PASS18_MACHINES?.arsenalWeaponVector?.(s,e);return v&&v.axisNative&&v.axisVisible!==false&&[v.x,v.y,v.angle].every(finite)?v:null;}
 function prepareEvent(s,e){
  if(!handles(s,e))return e;
  const inherited=e.legacyKind||e.kind,beam=inherited==='beam',volley=inherited==='volley';
  e.vehicleWeapon=s.def.id==='m1tank'?'m1-cannon':'harrier-cannon';e.legacyKind=inherited;
  if(e.kind==='beam')e.kind='shot';
  // Explicit overrides of the former beam retain its pre-existing defaults too.
  e.warn=finite(e.warn)?e.warn:(volley?40:55);e.active=finite(e.active)?e.active:(volley?1:18);e.recovery=finite(e.recovery)?e.recovery:18;
  e.damageBudget=volley?1560:720;e.ballisticShots=volley?3:1;e.ballisticCadenceFrames=3;e.ballisticSpeed=s.def.id==='m1tank'?18:volley?9:18;
  e.aimTarget=[clamp(s.player.x,120,1150),s.player.y-(beam?82:80)];
  const source=vector(s,e);if(source){e.from={x:source.x,y:source.y};e.nativeSourcePart=source.part;e.nativeWeaponAxis=true;}
  const from=e.from||{x:0,y:0};e.aimDistance=Math.hypot(e.aimTarget[0]-from.x,e.aimTarget[1]-from.y);e.aimAngle=Math.atan2(e.aimTarget[1]-from.y,e.aimTarget[0]-from.x);
  e.ballisticReleased=0;e.ballisticSourceQualification='sample actual final rendered rig pose; no synthetic marker fallback';return e;
 }
 function stepEvent(s,e,travelFrames=null){
  if(!e?.vehicleWeapon||!handles(s,e))return false;
  const source=vector(s,e);if(source){e.from={x:source.x,y:source.y};e.nativeSourcePart=source.part;e.nativeWeaponAxis=true;const d=e.aimDistance||1;e.x=source.x+Math.cos(source.angle)*d;e.y=source.y+Math.sin(source.angle)*d;}
  const phase=e.age-e.warn,shots=e.ballisticShots||1,cadence=e.ballisticCadenceFrames||3;
  // The engine increments age once. The release schedule uses that same owner age.
  // Re-reading geometry at a paused frame never enters this mutation hook.
  if(phase>=0&&phase%cadence===0&&phase/cadence<shots&&e.ballisticReleased===phase/cadence){
   if(source){const speed=e.ballisticSpeed||18,d=e.aimDistance||1,travel=typeof travelFrames==='function'?travelFrames(d,speed,160):Math.max(160,Math.ceil(d/speed)+30);
    s.bullets.push({owner:'enemy',x:source.x,y:source.y,px:source.x,py:source.y,vx:Math.cos(source.angle)*speed,vy:Math.sin(source.angle)*speed,t:travel,damage:e.damageBudget/shots,kind:s.def.id==='m1tank'?'shell':'bullet',sources:[...e.sources],revision:e.revision,nativeSourcePart:source.part,nativeWeaponAxis:true,vehicleWeapon:e.vehicleWeapon,releaseTick:s.tick});
    e.lastBallisticReleaseAge=e.age;e.lastBallisticSource={x:source.x,y:source.y,angle:source.angle,part:source.part};
   }
   e.ballisticReleased++; // A missing source suppresses fire, never emits a ghost shot.
  }
  return true;
 }
 function drawEvent(c,e,s,camera={zoom:1}){
  if(!e?.vehicleWeapon||!handles(s,e))return false;
  const age=e.age-e.warn,zoom=finite(camera.zoom)&&camera.zoom>0?camera.zoom:1;
  c.save();try{
   if(age<0&&e.from&&[e.from.x,e.from.y,e.x,e.y].every(finite)){
    c.setLineDash([12,8]);c.lineWidth=Math.max(1,1.5/zoom);c.strokeStyle='#d9b380';c.beginPath();c.moveTo(e.from.x,e.from.y);c.lineTo(e.x,e.y);c.stroke();
   }
   // Local muzzle flash replaces the former full-length damaging laser band.
   // Use the exact release snapshot, so a moving aircraft never drags the flash.
   const d=e.age-e.lastBallisticReleaseAge,q=e.lastBallisticSource;
   if(q&&d>=0&&d<3){const length=(s.def.id==='m1tank'?18:10)/zoom,width=(s.def.id==='m1tank'?6:3)/zoom;c.translate(q.x,q.y);c.rotate(q.angle);c.fillStyle=d===0?'#fff0b8':'#edac58';c.beginPath();c.moveTo(0,-width*.45);c.lineTo(length,0);c.lineTo(0,width*.45);c.closePath();c.fill();}
  }finally{c.restore();}return true;
 }
 const api=Object.freeze({schema:'cqc.pass36.vehicle-weapons/1',patterns,prepareEvent,stepEvent,drawEvent,limits,audit:Object.freeze({sourcePNGBytesChanged:false,schedulerChanged:false,healthPoolsChanged:false,damageBudgetsPreserved:true,absolute1to1Certified:false})});
 root.CQC_PASS36_VEHICLE_WEAPONS=api;if(typeof module==='object'&&module.exports)module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
