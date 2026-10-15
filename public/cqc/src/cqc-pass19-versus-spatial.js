/* One feet-anchored spatial contract for the active Versus engine and camera.
 * Source artwork, move definitions, damage, velocities and frame timings are retained.
 * Reviewed Hammerhead, Khamsin and Gekko incarnations use native projected body envelopes; others retain
 * their historical gameplay inset. These are not certified anatomical hulls.
 */
(function(root){'use strict';
 const finite=(n,d=0)=>Number.isFinite(n)?n:d,clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
 const engineContract='pass19-feet-spatial-v1',rendererContract='pass19-world-camera-v1';
 const gunAnchors={gekko_mgs4_ps3_2008:{file:'assets/machines-pass18/gekko-mgs4-parts-v1.png',sha256:'9555ff8a1dff9d04c1e475837648732efd6f56df50588a802ce8d022b7d8b3b7',rect:[939,88,284,164],pivot:[142,82],point:[949,100]},gekko_mgs4_right:{file:'assets/machines-pass18/gekko-mgs4-right-parts-reject-v1.png',sha256:'92dbc1e7031ddfad32d0a9e3cf0120f896957309388eb0dcd71f0ff7c629fb3e',rect:[917,95,319,212],pivot:[159.5,106],point:[1226,106]}};
 let engine=null,rendererReady=false;
 function ratio(p){const n=root.CQC_PASS19_WORLD_SCALE?.simulationRatio(p?.f||p);return Number.isFinite(n)&&n>0?n:1;}
 function transformBox(p,b){if(!b)return b;const r=ratio(p);return{...b,x:p.x+(b.x-p.x)*r,y:p.y+(b.y-p.y)*r,w:b.w*r,h:b.h*r};}
 function bodyY(p,height){return p.y-height*ratio(p);}
 function bodyPoint(p,forward,height){return{x:p.x+(p.face||1)*forward*ratio(p),y:bodyY(p,height)};}
 function poseFor(p,frame=0){const a=p.attack,m=a?.def,active=a&&a.t>=m.startup&&a.t<m.startup+m.active,windup=a&&a.t<m.startup;return{time:frame/60,frame,machineMotion:root.CQC_PASS18_MACHINES?.motionContext?.(p,1.12),machineAim:root.CQC_PASS19_NATIVE_AIM?.solve?.(p,m,{frame})?.machineAim,jump:p.y<567,walk:Math.abs(p.vx||0)>.5||m?.kind==='mobility',crouch:!!(p.crouch||m?.lowProfile),guard:!!(p.block||m?.kind==='parry'),attack:!!(active||windup&&a.t>m.startup*.6),animationActive:!!a,attackPhase:a?(a.t<m.startup?'startup':a.t<m.startup+m.active?'active':'recovery'):null,phaseProgress:a?clamp(a.t<m.startup?a.t/m.startup:a.t<m.startup+m.active?(a.t-m.startup)/m.active:(a.t-m.startup-m.active)/m.recovery,0,1):0,moveSlot:a?.name,moveKind:m?.kind,moveTag:m?.tag,attackTime:a?a.t/60:0,ko:p.life<=0,hit:p.hit>0,hitTime:(frame-finite(p.lastHit))/60,weaponAim:root.CQC_PASS19_NATIVE_AIM?.weaponAim(p,m,{frame})??0};}
 function selectedSource(p,frame=0){const sprites=root.CQC_COMBAT_SPRITES,entry=sprites?.getEntry(p?.f?.uid,p?.f||{});if(!entry)return null;const face=p.face||1,directional=face!==entry.facing&&entry.oppositeActions?{...entry,actions:entry.oppositeActions}:entry;try{return{entry,frame:sprites.selectFrame(directional,poseFor(p,frame)).frame};}catch(_){return null;}}
 function reviewedOrigin(p,m){const point=root.CQC_PASS18_VISUAL_MUZZLES?.origins?.[p?.f?.uid]?.[p.face||1],selected=selectedSource(p);if(!point||!selected||!p.attack)return null;const f=selected.frame;if(f.file!==point.file||f.sha256!==point.sha256||JSON.stringify(f.rect)!==JSON.stringify(point.rect))return null;const r=root.CQC_PASS19_WORLD_SCALE?.height(p.f).ratio||1;return{forward:point.forward*1.12*r,height:point.height*1.12*r,evidence:'selected-source-pixel',sourceFile:point.file};}
 function legacyMachineOrigin(p,m){if(m.tag!=='ballistic')return null;const id=root.CQC_PASS18_MACHINES?.physical?.(p.f,p.face||1),anchor=gunAnchors[id],parts=root.CQC_MACHINE_PARTS,w=root.CQC_PASS19_WORLD_SCALE;if(!anchor||!parts||!w)return null;const machine=parts.normalizeCatalog(root.CQC_MACHINE_PARTS_CATALOG).get(id),part=machine?.parts.find(part=>part.id==='gun'),source=part&&machine.sources.get(part.source),b=w.neutralBounds(id);if(!part||!b||source?.file!==anchor.file||source.sha256!==anchor.sha256||JSON.stringify(part.rect)!==JSON.stringify(anchor.rect)||JSON.stringify(part.pivot)!==JSON.stringify(anchor.pivot))return null;const pose=parts.pose(machine,{origin:[0,0],channels:{weaponAim:0},flags:{},reducedMotion:true}).get('gun');if(!pose?.visible)return null;const localX=(anchor.point[0]-part.rect[0]-part.pivot[0])*pose.imageScale,localY=(anchor.point[1]-part.rect[1]-part.pivot[1])*pose.imageScale,t=pose.matrix,x=t[0]*localX+t[2]*localY+t[4],y=t[1]*localX+t[3]*localY+t[5],scale=w.height(p.f).pixels*1.12/b.height;return{forward:(p.face||1)*(x-b.left-b.width/2)*scale,height:(b.top+b.height-y)*scale,evidence:'guarded-native-machine-gun-source-pixel',sourceFile:source.file,sourceSHA256:source.sha256,coordinateSpace:'world',sourceScaleAppliedOnce:true};}
 const nativeRigs=new WeakMap();
 function machineSource(p,m,options={}){
  if(!p?.f||!m||m.kind!=='projectile'||p.f.costume&&p.f.costume!=='original'&&!root.CQC_PASS19_MACHINE_PIXEL_STYLE?.selected?.(p.f))return null;
  const bridge=root.CQC_PASS18_MACHINES,id=bridge?.physical?.(p.f,p.face||1),aim=root.CQC_PASS19_NATIVE_AIM,
   slot=m.tag==='rocket'?'missile':m.tag==='rail'?'rail':['ballistic','precision'].includes(m.tag)?'ballistic':null;
  if(!id||!slot)return null;
  const admitted=aim?.finalAxis?.(id,slot),descriptor=admitted?.descriptor||aim?.sourceDescriptor?.(id,slot)||root.CQC_PASS28_RIG_SETUP?.descriptor?.(id,slot)||root.CQC_PASS19_MACHINE_SOURCE_POINTS?.descriptor?.(id,slot),parts=root.CQC_MACHINE_PARTS,points=root.CQC_PASS19_MACHINE_SOURCE_POINTS,catalog=root.CQC_MACHINE_PARTS_CATALOG,w=root.CQC_PASS19_WORLD_SCALE;
  if(!descriptor||!parts||!points||!catalog||!w)return legacyMachineOrigin(p,m);
  let rigs=nativeRigs.get(catalog);if(!rigs){rigs=parts.normalizeCatalog(catalog);nativeRigs.set(catalog,rigs);}const machine=rigs.get(id),b=bridge.bounds?.(id);if(!machine||!b||!bridge.inspectPlayablePose)return null;
  const state=root.CQC_PASS18_MACHINE_DATA?.states?.[id],height=state?.displayHeight>0?state.displayHeight:state?.kind==='heavy_biped'?420:state?.kind==='small_biped'?155:state?.kind==='radial'?133:state?.kind==='pod'?222:state?.kind==='authored_vr'?250:288,
   ratio=w.height(p.f,{originalPixels:height}).ratio,context=bridge.motionContext?.(p,1.12),scale=context?.nativeWorldScale||height*ratio*1.12/b.height,
   description={...poseFor(p,finite(options.frame)),...(options.pose||{}),machineMotion:context||options.pose?.machineMotion},
   posed=bridge.inspectPlayablePose(p.f,p.face||1,1.12*ratio,description),point=posed&&points.resolve(parts,machine,posed,descriptor);
  if(!point?.visible||!point.pinsVerified)return null;
  const legacy=aim?.axes?.[id],tailXY=admitted?.baseNativeXY||(legacy&&JSON.stringify(legacy.pin)===JSON.stringify(descriptor.pin)?legacy.tail:null),
   tail=tailXY&&points.resolve(parts,machine,posed,{...descriptor,nativeXY:tailXY});
  if(tail?.visible&&(point.x-tail.x)*(p.face||1)<=0)return{unsupportedFacing:true,machine:id,reason:'independent-opposite-source-axis-unavailable'};
  return{forward:(p.face||1)*(point.x-b.left-b.width/2)*scale,height:(b.top+b.height-point.y)*scale,
   evidence:'guarded-final-shared-machine-source-pixel',sourceFile:point.sourceFile,sourceSHA256:point.sourceSHA256,
   sourcePart:point.part,sourceNativeXY:point.nativeXY,coordinateSpace:'world',sourceScaleAppliedOnce:true,
   finalSharedPose:true,nativeWorldScale:scale,machineMotion:description.machineMotion};
 }
 function machineOrigin(p,m,options={}){const value=machineSource(p,m,options);return value&&!value.unsupportedFacing?value:null;}
 function projectileOrigin(p,m,baseBody,options={}){const nativeMachine=machineSource(p,m,options);if(nativeMachine&&!nativeMachine.unsupportedFacing)return nativeMachine;const hooked=nativeMachine?.unsupportedFacing?null:root.CQC_PASS19_NATIVE_ORIGINS?.projectile?.(p,m,options);if(hooked&&Number.isFinite(hooked.forward)&&Number.isFinite(hooked.height)&&hooked.height>=0){const sourceRatio=root.CQC_PASS19_WORLD_SCALE?.height(p.f).ratio||1;return{...hooked,forward:hooked.forward*1.12*sourceRatio,height:hooked.height*1.12*sourceRatio,evidence:hooked.evidence||'guarded-source-display-anchor',coordinateSpace:'world',sourceScaleAppliedOnce:true};}const reviewed=reviewedOrigin(p,m);if(reviewed)return reviewed;const o=m.projectileOrigin?.[p.face||1],native=o&&Number.isFinite(o.forward)&&o.forward>=0&&o.forward<=220&&Number.isFinite(o.height)&&o.height>0&&o.height<=330,r=ratio(p);return{forward:(native?o.forward:52)*r,height:(native?o.height:m.height||Math.min(145,finite(baseBody?.h,230)*.75))*r,evidence:native?'authored-origin-scaled':'historical-origin-scaled'};}
 function projectilePoint(p,m,baseBody,options={}){const o=projectileOrigin(p,m,baseBody,options);return{x:p.x+(p.face||1)*o.forward,y:p.y-o.height,origin:o};}
 function machineBounds(p,multiplier=1.12){if(root.CQC_PASS19_MACHINE_COSTUME_ROUTING?.native?.(p.f)===true)return null;const machine=root.CQC_PASS18_MACHINES?.physical?.(p.f,p.face||1),b=machine&&root.CQC_PASS18_MACHINES.bounds(machine),h=(root.CQC_PASS19_WORLD_SCALE?.height(p.f).pixels||288)*multiplier;if(!b)return null;const scale=h/b.height;return{left:p.x-b.width*scale/2,right:p.x+b.width*scale/2,top:p.y-h,bottom:p.y,machine};}
 function frameBounds(p,frame=0,multiplier=1.12){const w=root.CQC_PASS19_WORLD_SCALE,machine=machineBounds(p,multiplier);if(machine)return machine;
  const source=selectedSource(p,frame);if(source){const{entry,frame:f}=source,k=(w?.height(p.f).pixels||entry.displayHeight)*multiplier/(entry.sourceFrameHeights?.[f.file]||entry.baseFrameHeight||f.rect[3]),width=f.rect[2]*k,height=f.rect[3]*k,mirror=(p.face!==entry.facing&&!entry.oppositeActions);const a=-f.pivot[0]*width,b=(1-f.pivot[0])*width;return{left:p.x+(mirror?-b:a),right:p.x+(mirror?-a:b),top:p.y-f.pivot[1]*height,bottom:p.y+(1-f.pivot[1])*height};}
  const b=w?.worldBounds(p.f,{x:p.x,y:p.y},p.face||1);return b?{left:p.x+(b.left-p.x)*multiplier,right:p.x+(b.right-p.x)*multiplier,top:p.y+(b.top-p.y)*multiplier,bottom:p.y+(b.bottom-p.y)*multiplier}:{left:p.x-90,right:p.x+90,top:p.y-260,bottom:p.y};}

 // A stable arena is chosen from both source facings before the round starts.
 // Native silhouettes place launch/camera; damage uses the selected body contract.
 function machineEnvelope(p){const left=machineBounds({...p,x:0,face:-1}),right=machineBounds({...p,x:0,face:1});return left&&right?{width:Math.max(left.right-left.left,right.right-right.left),height:Math.max(left.bottom-left.top,right.bottom-right.top)}:null;}

 // Reviewed authored silhouettes/contact attacks disagree with their inherited
 // gameplay boxes. Native hull, pelvis, legs and feet supply projected body AABBs;
 // Gekko guns, optics and missile pods stay out, as do rotors, wings and axes.
 // The prior Hammerhead contract retains its short mounted gun assembly.
 const bodyParts={pass19__hammerhead_mgr:['fuselage','near_engine','far_engine','gun','near_wheel','far_wheel','rear_wheel'],pass19__hammerhead_mgr_right:['fuselage','near_engine','far_engine','gun','near_wheel','far_wheel','rear_wheel'],khamsin_mgr2013_left:['hull','pelvis','near_upper','near_lower','near_foot','far_upper','far_lower','far_foot'],khamsin_mgr2013_right:['hull','pelvis','near_upper','near_lower','near_foot','far_upper','far_lower','far_foot'],gekko_mgs4_ps3_2008:['hull','pelvis','near_upper','near_lower','near_foot','far_upper','far_lower','far_foot'],gekko_mgs4_right:['hull','pelvis','near_upper','near_lower','near_foot_other','far_upper','far_lower','far_foot'],pass19__gekko_missile_mgs4:['hull','pelvis','near_upper','near_lower','near_foot','far_upper','far_lower','far_foot'],pass19__gekko_missile_mgs4_right:['hull','pelvis','near_upper','near_lower','near_foot','far_upper','far_lower','far_foot'],pass19__gekko_mgr:['hull','pelvis','near_upper','near_lower','near_foot','far_upper','far_lower','far_foot'],pass19__gekko_mgr_right:['hull','pelvis','near_upper','near_lower','near_foot','far_upper','far_lower','far_foot']},bodyCache=new Map();
 function mechanicalBody(p){if(root.CQC_PASS19_MACHINE_COSTUME_ROUTING?.native?.(p.f)===true)return null;const id=root.CQC_PASS18_MACHINES?.physical?.(p.f,p.face||1),names=bodyParts[id],parts=root.CQC_MACHINE_PARTS,geometry=root.CQC_PASS28_MACHINE_GEOMETRY;if(!names||!parts||!geometry)return null;let local=bodyCache.get(id);if(!local){const machine=parts.normalizeCatalog(root.CQC_MACHINE_PARTS_CATALOG).get(id);if(!machine)return null;const selected={...machine,paintOrder:machine.paintOrder.filter(part=>names.includes(part.id))};local=geometry.bounds(selected,parts);if(!local)return null;bodyCache.set(id,local);}const base=root.CQC_PASS18_MACHINES.bounds(id),scale=root.CQC_PASS19_WORLD_SCALE.height(p.f).pixels*1.12/base.height,x=p.x-scale*(base.left+base.width/2),y=p.y-scale*base.bottom;return{x:x+local.left*scale,y:y+local.top*scale,w:local.width*scale,h:local.height*scale,source:'native-rigid-body-envelope',machine:id};}
 function contactBox(p,b){const native=mechanicalBody(p);return native?{x:native.x,y:native.y,w:native.w,h:native.h}:b;}
 function contactAttack(p,b){const native=mechanicalBody(p);if(!native||p.attack?.def.kind!=='melee')return b;const edge=(p.face||1)>0?native.x+native.w:native.x;return{...b,x:edge+((p.face||1)>0?0:-b.w)};}
 function bodyDistance(p,o){const a=mechanicalBody(p),b=mechanicalBody(o);if(!a&&!b)return Math.abs(o.x-p.x)/ratio(p);const direction=o.x>=p.x?1:-1,from=a?(direction>0?a.x+a.w:a.x):p.x,to=b?(direction>0?b.x:b.x+b.w):o.x;return Math.max(0,(to-from)*direction)/ratio(p);}
 function extended(s){return s?.spatialArena?.extended===true;}
 function arena(s){return s?.spatialArena||{left:65,right:1215,extended:false};}
 function actorLimits(s,p){const area=arena(s);if(!extended(s))return{left:65,right:1215};const envelope=machineEnvelope(p),b=envelope?{left:-envelope.width/2,right:envelope.width/2}:frameBounds({...p,x:0},0);return{left:area.left-Math.min(0,b.left),right:area.right-Math.max(0,b.right)};}
 function clampActor(s,p,x){const range=actorLimits(s,p);return clamp(x,range.left,range.right);}
 function placeRound(s){
  const env=[machineEnvelope(s.a),machineEnvelope(s.b)];if(!env.some(e=>e&&(e.width>450||e.height>400))){delete s.spatialArena;return s;}
  const footprints=[s.a,s.b].map((p,i)=>env[i]?{left:-env[i].width/2,right:env[i].width/2}:frameBounds({...p,x:0},0));
  const margin=120,clearance=300,width=Math.max(1150,footprints.reduce((n,b)=>n+b.right-b.left,0)+2*margin+clearance),area={left:640-width/2,right:640+width/2,extended:true,source:'native-facing-envelope',clearance};s.spatialArena=area;
  const a=frameBounds({...s.a,x:0},0),b=frameBounds({...s.b,x:0},0),distance=Math.max(520,a.right-b.left+clearance),centerOffset=(a.left+distance+b.right)/2;
  s.a.x=clampActor(s,s.a,640-centerOffset);s.b.x=clampActor(s,s.b,640+distance-centerOffset);return s;
 }
 function pushActors(s,box){
  const a=s.a,b=s.b,vertical=110*Math.max(ratio(a),ratio(b));if(Math.abs(a.y-b.y)>=vertical)return;
  const nativeA=mechanicalBody(a),nativeB=mechanicalBody(b),ordered=a.x<=b.x?[a,b]:[b,a],leftBox=box(ordered[0]),rightBox=box(ordered[1]),overlapWidth=leftBox.x+leftBox.w-rightBox.x,minGap=(box(a).w+box(b).w)*(extended(s)?.5:.30),gap=Math.abs(a.x-b.x);if(nativeA||nativeB){if(overlapWidth<=0)return;}else if(gap>=minGap)return;
  if(!extended(s)){const dir=a.x<=b.x?-1:1,shift=(minGap-gap)/2;a.x=clamp(a.x+dir*shift,65,1215);b.x=clamp(b.x-dir*shift,65,1215);return;}
  const left=a.x<=b.x?a:b,right=left===a?b:a,needed=nativeA||nativeB?overlapWidth:minGap-gap,limitsLeft=actorLimits(s,left),limitsRight=actorLimits(s,right),moveLeft=Math.min(needed/2,left.x-limitsLeft.left),moveRight=Math.min(needed-moveLeft,limitsRight.right-right.x),extraLeft=Math.min(needed-moveLeft-moveRight,left.x-moveLeft-limitsLeft.left);
  left.x-=moveLeft+extraLeft;right.x+=moveRight;
 }
 function worldCeiling(s){let y=-140;for(const p of [s.a,s.b])y=Math.min(y,frameBounds(p,s.frame).top-160,bodyY(p,330)-160);return y;}
 const giantArenaCameras=new WeakMap();
 function camera(s,requested=1,cam=0,options={}){
  if(extended(s)){
   const floor=568,top=finite(options.top,112),bottom=finite(options.bottom,696),padding=22,multiplier=finite(options.spriteMultiplier,1.12),area=s.spatialArena;
   const key=[top,bottom,multiplier].join('/');let views=giantArenaCameras.get(area);if(!views){views=new Map();giantArenaCameras.set(area,views);}
   let view=views.get(key);
   if(!view){
    const center=(area.left+area.right)/2,bounds=[s.a,s.b].map(p=>frameBounds({...p,y:floor},0,multiplier));
    let zoom=Math.min(1,(1280-padding*2)/Math.max(1,area.right-area.left));
    for(const b of bounds){if(b.top<floor)zoom=Math.min(zoom,(floor-top)/Math.max(1,floor-b.top));if(b.bottom>floor)zoom=Math.min(zoom,(bottom-floor)/Math.max(1,b.bottom-floor));}
    view=Object.freeze({cam:center-640,zoom:clamp(zoom,.001,1),worldCenter:center,worldFloor:floor,
     cameraPolicy:'fixed-giant-arena',worldFrame:Object.freeze({left:area.left,right:area.right,top:Math.min(...bounds.map(b=>b.top)),bottom:Math.max(...bounds.map(b=>b.bottom))})});views.set(key,view);
   }
   const center=view.worldCenter,zoom=view.zoom;return{...view,worldFrame:{...view.worldFrame},toX:x=>640+(x-center)*zoom,toY:y=>floor+(y-floor)*zoom};
  }
const floor=568,top=finite(options.top,112),bottom=finite(options.bottom,696),padding=22,multiplier=finite(options.spriteMultiplier,1.12),bounds=[s.a,s.b].map(p=>frameBounds(p,s.frame,multiplier)),center=extended(s)?(Math.min(...bounds.map(b=>b.left))+Math.max(...bounds.map(b=>b.right)))/2:640+cam;cam=center-640;let zoom=finite(requested,1);for(const b of bounds){if(b.top<floor)zoom=Math.min(zoom,(floor-top)/Math.max(1,floor-b.top));if(b.bottom>floor)zoom=Math.min(zoom,(bottom-floor)/Math.max(1,b.bottom-floor));const span=Math.max(Math.abs(b.left-center),Math.abs(b.right-center));zoom=Math.min(zoom,(640-padding)/Math.max(1,span));}zoom=clamp(zoom,.001,requested);return{cam,zoom,toX:x=>640+(x-center)*zoom,toY:y=>floor+(y-floor)*zoom,worldCenter:center,worldFloor:floor};}
 function activate(){if(engine?.spatialContract!==engineContract||!rendererReady||!root.CQC_PASS19_WORLD_SCALE)return false;root.CQC_PASS19_SPATIAL_SCALE_READY=true;root.CQC_PASS19_WORLD_SCALE.install();return true;}
 function registerEngine(value){engine=value;activate();return value;}
 function registerRenderer(contract){rendererReady=contract===rendererContract;return activate();}
 function status(){return{engineContract:engine?.spatialContract||null,rendererContract:rendererReady?rendererContract:null,ready:root.CQC_PASS19_SPATIAL_SCALE_READY===true,hurtboxes:'Reviewed Hammerhead/Khamsin/Gekko rigid native body envelopes; other historical gameplay insets scaled around the feet. Not an anatomical pixel hull.',versusArena:'Stable facing envelopes for large machines; sizes and move values preserved.',bossCore:'Historical boss framing retained until bespoke weak-point paths are transformed.'};}
 root.CQC_PASS19_VERSUS_SPATIAL={engineContract,rendererContract,ratio,transformBox,bodyY,bodyPoint,poseFor,selectedSource,reviewedOrigin,machineOrigin,machineSource,projectileOrigin,projectilePoint,mechanicalBody,contactBox,contactAttack,bodyDistance,machineBounds,frameBounds,machineEnvelope,arena,actorLimits,clampActor,placeRound,pushActors,worldCeiling,camera,registerEngine,registerRenderer,status};
 if(typeof module==='object'&&module.exports)module.exports=root.CQC_PASS19_VERSUS_SPATIAL;
})(globalThis);
