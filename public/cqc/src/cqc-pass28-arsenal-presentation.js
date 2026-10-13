/* Arsenal presentation and projectile travel use pure world geometry.
 * Native decoding, camera zoom, HP, locks and saves never change that geometry.
 */
(function(root,factory){
 'use strict';const api=factory(root);
 if(typeof module==='object'&&module.exports)module.exports=api;
 root.CQC_PASS28_ARSENAL_PRESENTATION=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(root){
 'use strict';const FLOOR=598,VIEW_WIDTH=1280;
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
  const bounds=value.bounds,left=Math.min(bounds.left,p.x-56),right=Math.max(bounds.right,p.x+56);
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
