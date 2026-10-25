/* Isolated right-facing Blackfoot geometry. Not admitted to any game or global rig catalogue. */
(function(root,factory){'use strict';const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.CQC_P41_BLACKFOOT_ISOLATED=api;})(globalThis,function(){'use strict';
 const UID='pass41__uth66_blackfoot_mgsv',PIN='e5e0dd36ea1b9ac6885f77be8566581885103c1c19e406c4e6c7f3c1e325b3fb';
 const finite=Number.isFinite,clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),DEG=Math.PI/180;
 const point=(m,p)=>[m[0]*p[0]+m[2]*p[1]+m[4],m[1]*p[0]+m[3]*p[1]+m[5]];
 function matrix(pivot,position,angle,scale){const c=Math.cos(angle)*scale,s=Math.sin(angle)*scale;return[c,s,-s,c,position[0]-c*pivot[0]+s*pivot[1],position[1]-s*pivot[0]-c*pivot[1]];}
 function create(data){
  if(data?.schema!=='cqc.p41.blackfoot-isolated-parts/1'||data.uid!==UID||data.admitted!==false||data.facing!=='right'||data.source?.sha256!==PIN||data.source.width!==1536||data.source.height!==1024||data.pieces?.length!==11)throw Error('Exact isolated Blackfoot source map required');
  const pieces=new Map();for(const p of data.pieces){if(pieces.has(p.id)||!Array.isArray(p.rect)||p.rect.length!==4||!p.rect.every(finite)||!p.nativePivot?.every(finite)||!finite(p.imageScale)||p.imageScale<=0||!Array.isArray(p.sourceClipPolygonNativeXY)||p.sourceClipPolygonNativeXY.length<3||p.pivotAlpha<=32)throw Error('Invalid measured native part '+p.id);const owned=JSON.parse(JSON.stringify(p));if(owned.id==='tail_wheel'){owned.bodySocketNativeXY=[170,248];owned.bodySocketAlpha=248;owned.candidateSocketReview='p41-tailwheel-native-underside-170-248';}if(owned.id==='near_wheel'){owned.bodySocketNativeXY=[487,329];owned.bodySocketAlpha=251;owned.imageScale=.18;owned.candidateSocketReview='p41-near-wheel-painted-underbelly-lug';}if(owned.id==='far_wheel'){owned.bodySocketNativeXY=[405,321];owned.bodySocketAlpha=252;owned.imageScale=.16;owned.candidateSocketReview='p41-far-wheel-painted-underbelly-ledge';}pieces.set(p.id,owned);}
  for(const id of ['fuselage','main_rotor_a','main_rotor_b','main_rotor_c','main_rotor_d','tail_rotor','near_wheel','far_wheel','tail_wheel','minigun','rocket_pods'])if(!pieces.has(id))throw Error('Missing source piece '+id);
  function sample(options={}){
   const facing=options.facing??'right';if(facing!=='right')return null;
   const position=options.position??[0,0],scale=options.scale??1,frame=options.frame??0;
   if(!Array.isArray(position)||position.length!==2||!position.every(finite)||!finite(scale)||scale<=0||!finite(frame)||frame<0)throw Error('Explicit finite owner position, scale and frame required');
   const pitch=clamp(finite(options.pitchDegrees)?options.pitchDegrees:0,-4,4)*DEG,
    amplitude=clamp(finite(options.hoverAmplitude)?options.hoverAmplitude:0,0,2),hover=options.defeated?0:Math.sin(frame*.035)*amplitude,
    anchor=[position[0],position[1]+hover*scale],body=pieces.get('fuselage'),bodyMatrix=matrix(body.nativePivot,anchor,pitch,body.imageScale*scale),
    phase=options.reducedMotion||options.defeated?0:Math.floor(frame/3)%4,rotorID=['main_rotor_a','main_rotor_b','main_rotor_c','main_rotor_d'][phase],drawn=[],attachments=[];
   for(const spec of pieces.values()){
    if(spec.id.startsWith('main_rotor_')&&spec.id!==rotorID)continue;
    const socket=spec.bodySocketNativeXY?point(bodyMatrix,spec.bodySocketNativeXY):anchor,
     aim=spec.id==='minigun'&&!options.defeated?clamp(finite(options.aimDegrees)?options.aimDegrees:0,-12,12)*DEG:0,
     m=spec.id==='fuselage'?bodyMatrix:matrix(spec.nativePivot,socket,pitch+aim,spec.imageScale*scale),pivot=point(m,spec.nativePivot);
    if(spec.bodySocketNativeXY)attachments.push({part:spec.id,socket:socket.slice(),pivot,error:Math.hypot(pivot[0]-socket[0],pivot[1]-socket[1]),sourcePivotAlpha:spec.pivotAlpha,sourceSocketAlpha:spec.bodySocketAlpha});
    drawn.push({id:spec.id,spec,matrix:m,anchor:pivot});
   }
   drawn.sort((a,b)=>a.spec.z-b.spec.z);
   const gun=drawn.find(p=>p.id==='minigun'),base=point(gun.matrix,gun.spec.axisNative.base),tip=point(gun.matrix,gun.spec.axisNative.tip),axis=[tip[0]-base[0],tip[1]-base[1]],length=Math.hypot(...axis);
   let left=Infinity,top=Infinity,right=-Infinity,bottom=-Infinity;for(const part of drawn)for(const native of part.spec.sourceClipPolygonNativeXY){const [x,y]=point(part.matrix,native);left=Math.min(left,x);right=Math.max(right,x);top=Math.min(top,y);bottom=Math.max(bottom,y);}
   return{uid:UID,facing,frame,authoritativePosition:position.slice(),parts:drawn,attachments,mainRotorPhase:phase,tailRotorMode:'single-source-static',bounds:{left,top,right,bottom,width:right-left,height:bottom-top},muzzle:options.defeated?null:{x:tip[0],y:tip[1],base:{x:base[0],y:base[1]},tip:{x:tip[0],y:tip[1]},axis:[axis[0]/length,axis[1]/length],angle:Math.atan2(axis[1],axis[0]),part:'minigun',sourceNativeXY:gun.spec.axisNative.tip.slice()},admitted:false,sourcePixelsChanged:false,globalCatalogChanged:false};
  }
  function draw(ctx,image,pose){if(!ctx||!image||!pose||pose.uid!==UID||pose.facing!=='right')return false;for(const part of pose.parts){ctx.save();try{ctx.transform(...part.matrix);ctx.beginPath();part.spec.sourceClipPolygonNativeXY.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();ctx.clip();const r=part.spec.rect;ctx.drawImage(image,...r,...r);}finally{ctx.restore();}}return true;}
  return Object.freeze({sample,draw,status:()=>({uid:UID,admitted:false,faces:['right'],sourceSHA256:PIN,sourcePixelsChanged:false,globalCatalogChanged:false,physicsChanged:false,destructionImplemented:false,officialDimensionsKnown:false,limits:data.limits.slice()})});
 }
 return Object.freeze({schema:'cqc.p41.blackfoot-isolated-controller/1',create,point});
});
