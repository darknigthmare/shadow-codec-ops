/* Arsenal presentation and projectile travel use pure world geometry.
 * Native decoding, camera zoom, HP, locks and saves never change that geometry.
 */
(function(root,factory){
 'use strict';const api=factory(root);
 if(typeof module==='object'&&module.exports)module.exports=api;
 root.CQC_PASS28_ARSENAL_PRESENTATION=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(root){
 'use strict';const FLOOR=598,VIEW_WIDTH=1280;
 const encounterCameras=new WeakMap();
 // Some large authored studies still use small historical presentation bounds.
 // Classify those dedicated encounters explicitly instead of mistaking a tank
 // or an entire Metal Gear for a small support robot.
 const GIANT_ENCOUNTERS=new Set(['tx55','metalgeard','rex','harrier','raymass','shagohod','raxa','bic','pupa','chrysalis','cocoon','peacewalker','zeke','gander','sahel','ray_mgR','grad','excelsus','kodoque','chaioth','arsenal_gear','outer_haven','battle_gear','dwalker','walker_column','gekko','hind_d','m1tank','bulldozer']);
 const finite=Number.isFinite;
 function validBounds(value){
  if(!value||![value.left,value.top,value.right,value.bottom].every(finite)||value.right<=value.left||value.bottom<=value.top)return null;
  return {left:value.left,top:value.top,right:value.right,bottom:value.bottom,width:value.right-value.left,height:value.bottom-value.top};
 }
 function geometry(state){
  const value=root.CQC_PASS18_MACHINES?.arsenalGeometry?.(state);
  const bounds=validBounds(value?.bounds);return bounds?{...value,bounds}:null;
 }
 function camera(state,options={}){
  const value=geometry(state),p=state?.player;
  if(!value||!p||![p.x,p.y].every(finite))return {zoom:1,centerX:640,tx:0,ty:0,floorY:FLOOR,geometry:null};
  const bounds=value.bounds;
  if(GIANT_ENCOUNTERS.has(state?.def?.id)||bounds.width>450||bounds.height>400){
   // The simulation keeps x in [58,1220], with a 56px human half-envelope.
   // vy=-13/gravity=.72 gives a maximum 124px jump above the 212px silhouette.
   // Fit that complete lane plus the initial neutral boss, then keep the view.
   const key=[options.preview===true,options.hudVisible!==false].join('/');
   let owner=encounterCameras.get(state);
   if(!owner||owner.boss!==state.boss||owner.machine!==value.machineId){owner={boss:state.boss,machine:value.machineId,views:new Map()};encounterCameras.set(state,owner);}
   let view=owner.views.get(key);
   if(!view){
    const left=Math.min(bounds.left,2),right=Math.max(bounds.right,1276),top=Math.min(bounds.top,FLOOR-212-124);
    const topPadding=options.preview?28:options.hudVisible===false?36:144;
    const viewLeft=!options.preview&&options.hudVisible!==false?332:56,viewRight=!options.preview&&options.hudVisible!==false?1240:VIEW_WIDTH-56;
    const zoom=Math.min(1,(viewRight-viewLeft)/Math.max(1,right-left),(FLOOR-topPadding)/Math.max(1,FLOOR-top));
    const centerX=(left+right)/2;
    view=Object.freeze({zoom,centerX,tx:(viewLeft+viewRight)/2-centerX*zoom,ty:FLOOR*(1-zoom),floorY:FLOOR,
     cameraPolicy:'fixed-encounter-world',worldFrame:Object.freeze({left,right,top,bottom:FLOOR})});owner.views.set(key,view);
   }
   return {...view,worldFrame:{...view.worldFrame},geometry:value};
  }
  const left=Math.min(bounds.left,p.x-56),right=Math.max(bounds.right,p.x+56);
  const top=Math.min(bounds.top,p.y-212),topPadding=options.preview?28:options.hudVisible===false?36:144;
  const viewLeft=!options.preview&&options.hudVisible!==false?332:56,viewRight=!options.preview&&options.hudVisible!==false?1240:VIEW_WIDTH-56;
  const spanY=Math.max(1,FLOOR-top),zoom=Math.min(1,(viewRight-viewLeft)/Math.max(1,right-left),(FLOOR-topPadding)/spanY);
  const centerX=(left+right)/2;
  return {zoom,centerX,tx:(viewLeft+viewRight)/2-centerX*zoom,ty:FLOOR*(1-zoom),floorY:FLOOR,geometry:value};
 }
 function project(point,view){return {x:point.x*view.zoom+view.tx,y:point.y*view.zoom+view.ty};}
 function targetPoint(state,index){
  const point=root.CQC_PASS18_MACHINES?.arsenalTargetPoint?.(state,index);
  return point&&[point.x,point.y,point.r].every(finite)&&point.r>0 ? {x:point.x,y:point.y,r:point.r} : null;
 }
 function travelFrames(distance,speed,minimum){
  return finite(distance)&&finite(speed)&&speed>0 ? Math.max(minimum,Math.ceil(Math.max(0,distance)/speed)+32) : minimum;
 }
 function projectileBounds(state){
  const value=geometry(state);if(!value)return {left:-150,top:-150,right:1450,bottom:900};
  const p=state.player||{},bounds=value.bounds;
  return {left:Math.min(-150,bounds.left,finite(p.x)?p.x:300)-256,
   top:Math.min(-150,bounds.top,finite(p.y)?p.y-212:386)-256,
   right:Math.max(1450,bounds.right,finite(p.x)?p.x:300)+256,
   bottom:Math.max(900,bounds.bottom,finite(p.y)?p.y:FLOOR)+256};
 }
 return Object.freeze({version:'cqc-pass28-arsenal-presentation/1',FLOOR,geometry,camera,project,targetPoint,travelFrames,projectileBounds});
});
