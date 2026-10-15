/* Dedicated Liquid Ocelot RAY, MGS4 PS3 2008 archive opponent.
 * Native left-facing camera only. Original files and the 64 historical rigs are
 * untouched. Combat HP, damage, cadence, projectile ownership and clocks remain
 * in the archive controller; this private renderer never advances them.
 */
(function(root){
 'use strict';
 const ID='ray_mgs4_ps3_2008',DEG=Math.PI/180;
 const clone=v=>JSON.parse(JSON.stringify(v));
 const finite=v=>typeof v==='number'&&Number.isFinite(v);
 const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
 const approach=(v,target,step)=>v+clamp(target-v,-step,step);
 const normalize=r=>Math.atan2(Math.sin(r),Math.cos(r));
 const BASE_URL=root.document?.currentScript?.src?new URL('../',root.document.currentScript.src).href:undefined;
 const SOURCE_LAYOUT={"schema":"cqc.pass33.ray-mgs4-source/1","source":{"id":"ray_mgs4_pass33_native_left","file":"assets/combat-machines-pass33/ray-mgs4/native-left-v1.png","sha256":"0d9aebc6e3800e772b8fe02b1f9c96b060f22a64a967f0891a2b5fb3af40250a","bytes":2090812,"width":1536,"height":1024},"sourceUniformScale":0.4,"sourceCameraFacing":"left","sockets":{"anchor":[760,996],"body_anchor":[680,500],"torso":[680,500],"head":[650,448],"lower_jaw":[569,479],"near_wing":[749,378],"far_wing":[500,361],"near_upper_leg":[565,685],"near_lower_leg":[610,728],"near_foot":[282,937],"far_upper_leg":[821,580],"far_lower_leg":[1193,692],"far_foot":[1388,930]},"regions":{"far_wing":[[0.0,490.0],[354.0,490.0],[365.0,464.0],[360.0,431.0],[379.0,405.0],[409.0,377.0],[442.0,352.0],[474.0,341.0],[499.0,337.0],[515.0,325.0],[515.0,0.0],[0.0,0.0]],"near_wing":[[1536.0,0.0],[746.0,0.0],[746.0,335.0],[727.0,346.0],[721.0,375.0],[726.0,398.0],[745.0,420.0],[772.0,441.0],[790.0,457.0],[820.0,465.0],[850.0,456.0],[900.0,438.0],[930.0,424.0],[960.0,414.0],[1000.0,398.0],[1050.0,390.0],[1100.0,360.0],[1200.0,320.0],[1300.0,270.0],[1400.0,200.0],[1536.0,210.0]],"head":[[499.0,337.0],[474.0,341.0],[442.0,352.0],[409.0,377.0],[379.0,405.0],[360.0,431.0],[365.0,464.0],[354.0,490.0],[350.0,490.0],[370.0,521.0],[405.0,548.0],[427.0,551.0],[427.0,569.0],[420.0,612.0],[416.0,640.0],[426.0,656.0],[439.0,652.0],[447.0,631.0],[449.0,577.0],[452.0,553.0],[485.0,531.0],[520.0,499.0],[545.0,469.0],[562.0,432.0],[568.0,398.0],[579.0,367.0],[580.0,325.0],[515.0,325.0]],"lower_jaw":[[562.0,432.0],[545.0,469.0],[520.0,499.0],[485.0,531.0],[452.0,553.0],[449.0,577.0],[447.0,631.0],[439.0,652.0],[426.0,656.0],[416.0,640.0],[420.0,612.0],[427.0,569.0],[427.0,551.0],[405.0,548.0],[370.0,521.0],[350.0,490.0],[0.0,490.0],[0.0,757.0],[400.0,757.0],[427.0,742.0],[451.0,717.0],[498.0,684.0],[538.0,658.0],[570.0,635.0],[589.0,600.0],[617.0,554.0],[627.0,510.0],[623.0,475.0],[599.0,437.0],[576.0,416.0],[568.0,398.0]],"far_foot":[[1536.0,1024.0],[1536.0,919.0],[1421.0,919.0],[1394.0,914.0],[1375.0,914.0],[1358.0,907.0],[1280.0,910.0],[1280.0,1024.0]],"near_foot":[[0.0,1024.0],[375.0,1024.0],[375.0,941.0],[318.0,941.0],[297.0,923.0],[274.0,916.0],[254.0,919.0],[0.0,919.0]],"far_lower_leg":[[1280.0,1024.0],[1280.0,910.0],[1358.0,907.0],[1375.0,914.0],[1394.0,914.0],[1421.0,919.0],[1536.0,919.0],[1536.0,662.0],[1230.0,662.0],[1205.0,649.0],[1193.0,660.0],[1189.0,679.0],[1174.0,704.0],[1144.0,733.0],[1080.0,780.0],[820.0,1024.0]],"near_lower_leg":[[0.0,919.0],[254.0,919.0],[274.0,916.0],[297.0,923.0],[318.0,941.0],[375.0,941.0],[375.0,1024.0],[820.0,1024.0],[820.0,780.0],[735.0,780.0],[650.0,745.0],[630.0,719.0],[612.0,705.0],[591.0,710.0],[580.0,736.0],[558.0,753.0],[466.0,789.0],[354.0,810.0],[0.0,810.0]],"far_upper_leg":[[1000.0,398.0],[960.0,414.0],[930.0,424.0],[900.0,438.0],[850.0,456.0],[820.0,465.0],[790.0,457.0],[782.80927835,450.60824742],[783.0,459.0],[791.0,503.0],[779.0,551.0],[788.0,590.0],[790.0,622.0],[768.0,645.0],[745.0,695.0],[735.0,780.0],[820.0,780.0],[820.0,1024.0],[1080.0,780.0],[1144.0,733.0],[1174.0,704.0],[1189.0,679.0],[1193.0,660.0],[1205.0,649.0],[1230.0,662.0],[1536.0,662.0],[1536.0,210.0],[1400.0,200.0],[1300.0,270.0],[1200.0,320.0],[1100.0,360.0],[1050.0,390.0]],"near_upper_leg":[[538.0,658.0],[498.0,684.0],[451.0,717.0],[427.0,742.0],[400.0,757.0],[0.0,757.0],[0.0,810.0],[354.0,810.0],[466.0,789.0],[558.0,753.0],[580.0,736.0],[591.0,710.0],[612.0,705.0],[630.0,719.0],[650.0,745.0],[735.0,780.0],[714.0,740.0],[678.0,703.0],[653.0,663.0],[610.0,634.0],[570.0,635.0]],"torso":[[745.0,420.0],[726.0,398.0],[721.0,375.0],[727.0,346.0],[746.0,335.0],[746.0,0.0],[515.0,0.0],[515.0,325.0],[580.0,325.0],[579.0,367.0],[568.0,398.0],[576.0,416.0],[599.0,437.0],[623.0,475.0],[627.0,510.0],[617.0,554.0],[589.0,600.0],[570.0,635.0],[610.0,634.0],[653.0,663.0],[678.0,703.0],[714.0,740.0],[735.0,780.0],[745.0,695.0],[768.0,645.0],[790.0,622.0],[788.0,590.0],[779.0,551.0],[791.0,503.0],[783.0,459.0],[782.80927835,450.60824742],[772.0,441.0]]},"paintOrder":["anchor","body_anchor","far_foot","far_lower_leg","far_upper_leg","far_wing","torso","near_wing","head","lower_jaw","near_upper_leg","near_lower_leg","near_foot"],"jawOpenDegrees":-8,"alphaBounds":{"far_wing":[28,227,506,480],"near_wing":[721,26,1516,464],"head":[358,325,580,656],"lower_jaw":[224,399,627,757],"far_foot":[1318,907,1501,1006],"near_foot":[166,916,362,999],"far_lower_leg":[1105,649,1446,919],"near_lower_leg":[235,705,641,941],"far_upper_leg":[766,408,1273,762],"near_upper_leg":[339,634,644,810],"torso":[536,279,791,648]},"bodyParts":["torso","head","lower_jaw","near_upper_leg","near_lower_leg","near_foot","far_upper_leg","far_lower_leg","far_foot"],"points":{"near_contact":{"part":"near_foot","nativeXY":[253,994],"alpha":250,"insideMeasuredClip":true},"far_contact":{"part":"far_foot","nativeXY":[1390,994],"alpha":251,"insideMeasuredClip":true},"cockpit":{"part":"head","nativeXY":[463,455],"alpha":253,"insideMeasuredClip":true}},"weapons":{"water":{"part":"head","nativeXY":[429,620],"axisTailNativeXY":[441,617],"channel":"rayHeadPitch","motionKey":"headPitch","limits":[-22,22],"alpha":253,"insideMeasuredClip":true}},"references":["https://w0.peakpx.com/wallpaper/328/474/HD-wallpaper-metal-gear-ray-from-mgs4-guns-of-the-patriots-liquid-ocelot-metal-gear-ray.jpg","https://www.metalgearsolid.be/histoire_metal_gear_solid_4_50.html"],"review":{"absolute1to1Certified":false,"referenceLedGenerated":true,"nativeFacing":"left","mirrored":false,"sourcePixelsEdited":false,"alphaThreshold":16,"pixelCentersExactlyOnce":true,"rasterSourceHardwareProvenanceNotCertified":true,"waterAxisQualification":"Visible open-mouth emitter interior anchor; optical axis authored from the native projected mouth geometry, not an extracted original nozzle bore."}};
 const NECK_SUPPORT={"source":{"id":"ray_mgs4_pass33_neck_internal","file":"assets/combat-machines-pass33/ray-mgs4/neck-underlay-v1.png","sha256":"d740417b4c258ca04cea2e763465c3ffe3ebd52ff97a5c3a20cb7dd17e7d0f5e","bytes":2033795,"width":1536,"height":1024},"part":{"id":"neck_internal_support","parent":"torso","source":"ray_mgs4_pass33_neck_internal","rect":[0,0,1536,1024],"pivot":[1153,350],"offset":[-12.0,20.8],"imageScale":0.09797776607097375,"rotation":0,"textureRotation":-41.909042931316556,"z":5.9,"sourceClipPolygonNativeXY":[[464.68575503,291.76545239],[217.70407793,536.38328217],[218.07875462,811.00908893],[588.52232348,978.92093113],[1254.26007397,726.1454229],[1382.82433706,430.10188789],[971.10191206,33.13821944]],"documentaryQualification":"Reference-led generated internal RAY collar, hydraulic struts and vented shroud. Hidden volume is interpreted for this 2D source camera, uniformly fit beneath original armor, not original extracted hardware. No HP target or destructible flag."},"alphaBounds":[218,122,1334,881],"sourceFit":{"startNativeXY":[1153,350],"endNativeXY":[400,700],"targetPrimaryNativeXY":[[650,448],[570,635]],"uniformRatio":0.24494441517743434,"rotationDegrees":-41.909042931316556,"boundedTargetPrimaryNativeXY":[[565,420],[705,425],[730,500],[650,655],[555,685],[510,635],[515,550]]},"originalPNGPreserved":true,"sourcePixelsEdited":false,"alpha16PixelsInsideAdmittedClip":530913,"alpha16PixelsOutsideAdmittedClipNotPainted":131996,"qualification":"New internal mechanical source is a reconstruction of hidden volume. Its atlas remains byte-exact; runtime vector clipping bounds the collar/hydraulic volume beneath original armor. No pixel cache, color fill, distorted surface or mirrored source."};
 const PARENTS={body_anchor:'anchor',torso:'body_anchor',head:'torso',lower_jaw:'head',near_wing:'torso',far_wing:'torso',near_upper_leg:'body_anchor',near_lower_leg:'near_upper_leg',near_foot:'near_lower_leg',far_upper_leg:'body_anchor',far_lower_leg:'far_upper_leg',far_foot:'far_lower_leg'};
 const LIMITS=Object.freeze([
  'Dedicated reference-led generated MGS4 Liquid Ocelot RAY, native left-facing camera. No MGS2 or Revengeance raster is substituted and no camera mirroring is admitted.',
  'A 2D articulated reconstruction is not an extracted original 3D model. Hidden surfaces, extreme rotations and absolute 1:1 fidelity are not certified.',
  'Source sockets and polygon cuts are measured on the admitted native camera. Engine-owned planted contacts use fixed-length inverse kinematics; authored timing is a CQC gameplay adaptation.',
  'Hydraulic water cutter direction follows the actual head nozzle. It is not the Revengeance plasma cannon. Missile and wing-gun surfaces are source anchors; no unsupported cap-opening or hidden ejection frames are invented.',
  'A separate collar, hydraulic strut and shroud source sits beneath the primary armor, uniformly fit to the head bearing and lower neck. This interpreted internal volume supports bounded head pitch; its clipped source is never a painted gap cover or a stretched surface.',
  'Archive encounter dimensions are presentation framing. No canonical metre-to-pixel height certification or new destructible HP pool is introduced.'
 ]);
 let preparedCache=null;
 function layout(){if(!SOURCE_LAYOUT)throw Error('MGS4 RAY source admission is pending');return SOURCE_LAYOUT;}
 function binding(channel){return[{channel,factor:1}];}
 function definition(){
  const q=layout(),K=q.sourceUniformScale,m={id:ID,edition:'Metal Gear RAY — Liquid Ocelot, MGS4 Guns of the Patriots PS3 2008 Shadow Moses',origin:[0,0],scale:[1,1],sources:[clone(q.source),clone(NECK_SUPPORT.source)],parts:[],pass33RayMgs4Native:true,documentaryQualifications:LIMITS.slice()};
  for(const [id,pivot]of Object.entries(q.sockets)){
   const parent=PARENTS[id],previous=parent?q.sockets[parent]:q.sockets.anchor,region=q.regions[id];
   const p={id,source:q.source.id,rect:region?[0,0,q.source.width,q.source.height]:[0,0,1,1],pivot:region?pivot.slice():[0,0],offset:parent?[(pivot[0]-previous[0])*K,(previous[1]-pivot[1])*K]:[0,0],imageScale:region?K:1,z:q.paintOrder.indexOf(id),rotation:0,channels:{}};
   if(parent)p.parent=parent;if(region)p.sourceClipPolygonNativeXY=clone(region);
   if(id==='body_anchor')p.channels={x:binding('rayBodyShift'),y:binding('rayBodyDrop'),rotation:binding('rayBodyLean')};
   if(id==='head')p.channels={rotation:binding('rayHeadPitch')};
   if(id==='lower_jaw')p.channels={rotation:binding('rayJawOpen')};
   if(id.endsWith('_wing'))p.channels={rotation:binding(id==='near_wing'?'rayNearWing':'rayFarWing')};
   for(const side of ['near','far']){const title=side==='near'?'Near':'Far';if(id===side+'_upper_leg')p.channels={rotation:binding('ray'+title+'Upper')};if(id===side+'_lower_leg')p.channels={rotation:binding('ray'+title+'Lower')};if(id===side+'_foot')p.channels={rotation:binding('ray'+title+'Foot')};}
   m.parts.push(p);
  }
  m.parts.push(clone(NECK_SUPPORT.part));
  return m;
 }
 function prepared(options={}){
  if(preparedCache)return preparedCache;
  const parts=root.CQC_MACHINE_PARTS;if(!parts)return null;
  const q=layout(),catalog={schema:'cqc.machine-parts/1',machines:[definition()]},machine=parts.normalizeCatalog(catalog).get(ID);
  const registry=parts.create(catalog,{baseURL:BASE_URL,...options});
  return preparedCache={parts,machine,registry,source:q.source,layout:q};
 }
 async function whenReady(options={}){const a=prepared();if(!a)return false;try{await a.registry.load(ID,{reload:options.retry===true});return a.registry.ready(ID);}catch{return false;}}
 function ready(){return preparedCache?.registry.ready(ID)===true;}
 function status(){try{return prepared()?.registry.status(ID)||{id:ID,state:'missing',error:'Native renderer is unavailable'};}catch(error){return{id:ID,state:'error',error:String(error.message||error)};}}
 function dispose(){preparedCache?.registry.dispose();}
 function vectors(side){const q=layout(),s=q.sockets,K=q.sourceUniformScale,a=s[side+'_upper_leg'],b=s[side+'_lower_leg'],c=s[side+'_foot'];return[[K*(b[0]-a[0]),K*(a[1]-b[1])],[K*(c[0]-b[0]),K*(b[1]-c[1])]];}
 function solve(first,second,target){
  if(Math.hypot(target[0]-first[0]-second[0],target[1]-first[1]-second[1])<1e-10)return{upper:0,lower:0,foot:0,target:target.slice(),reachable:true};
  const a=Math.hypot(...first),b=Math.hypot(...second),raw=Math.hypot(...target),distance=clamp(raw,Math.abs(a-b)+1e-8,a+b-1e-8),t=raw>1e-8?target.map(v=>v*distance/raw):[distance,0],direction=Math.atan2(t[1],t[0]),spread=Math.acos(clamp((a*a+distance*distance-b*b)/(2*a*distance),-1,1));
  const candidates=[direction-spread,direction+spread].map(angle=>{const secondAngle=Math.atan2(t[1]-a*Math.sin(angle),t[0]-a*Math.cos(angle)),upper=normalize(angle-Math.atan2(first[1],first[0]))/DEG,lower=normalize(secondAngle-Math.atan2(second[1],second[0])-upper*DEG)/DEG;return{upper,lower,foot:-upper-lower,target:t,reachable:Math.abs(distance-raw)<1e-6};});
  candidates.sort((a,b)=>Math.abs(a.upper)+Math.abs(a.lower)-Math.abs(b.upper)-Math.abs(b.lower));return candidates[0];
 }
 function presentationPose(pose={}){
  const q=layout(),s=q.sockets,K=q.sourceUniformScale,m=pose.rayMotion||{},dead=pose.defeated===true,channels={...(pose.channels||{})};
  const drop=clamp(finite(m.bodyDrop)?m.bodyDrop:0,0,10),lean=clamp(finite(m.bodyLean)?m.bodyLean:0,-3,3),shift=clamp(finite(m.bodyShift)?m.bodyShift:0,-4,4),angle=lean*DEG,cos=Math.cos(angle),sin=Math.sin(angle);
  channels.rayBodyDrop=-drop;channels.rayBodyLean=lean;channels.rayBodyShift=shift;
  channels.rayHeadPitch=clamp(finite(m.headPitch)?m.headPitch:0,...q.weapons.water.limits);channels.rayJawOpen=clamp(finite(m.jawOpen)?m.jawOpen:0,0,1)*q.jawOpenDegrees;
  channels.rayNearWing=clamp(finite(m.nearWing)?m.nearWing:0,-8,8);channels.rayFarWing=clamp(finite(m.farWing)?m.farWing:0,-8,8);
  for(const side of ['near','far']){
   const h=s[side+'_upper_leg'],base=s.body_anchor,hip=[K*(h[0]-base[0]),K*(base[1]-h[1])],v=vectors(side),foot=m.feet?.[side],dx=clamp(finite(foot?.dx)?foot.dx:0,-18,18),lift=clamp(finite(foot?.lift)?foot.lift:0,0,10),goal=[hip[0]+v[0][0]+v[1][0]+dx-shift,hip[1]+v[0][1]+v[1][1]+lift+drop],local=[cos*goal[0]+sin*goal[1]-hip[0],-sin*goal[0]+cos*goal[1]-hip[1]],joint=solve(v[0],v[1],local),title=side==='near'?'Near':'Far';
   channels['ray'+title+'Upper']=joint.upper;channels['ray'+title+'Lower']=joint.lower;channels['ray'+title+'Foot']=joint.foot-lean;
  }
  return{...pose,reducedMotion:pose.reducedMotion===true||!!root.matchMedia?.('(prefers-reduced-motion: reduce)').matches||root.document?.documentElement?.classList.contains('cqc-reduced-motion')===true||root.document?.body?.classList.contains('reduced-motion')===true,origin:[0,0],flags:{...(pose.flags||{}),rayMgs4Native:true,rayDefeated:dead},channels};
 }
 function transformedPoint(p,nativeXY,partID){
  if(!p||!p.visible)return null;
  const nx=(nativeXY[0]-p.pivot[0])*p.imageScale,ny=(nativeXY[1]-p.pivot[1])*p.imageScale,angle=(p.textureRotation||0)*DEG,c=Math.cos(angle),s=Math.sin(angle),x=c*nx-s*ny,y=s*nx+c*ny,m=p.matrix;
  return{x:m[0]*x+m[2]*y+m[4],y:m[1]*x+m[3]*y+m[5],part:partID,nativeXY:nativeXY.slice()};
 }
 function nativePoint(partID,nativeXY,pose={}){const a=prepared();return a?transformedPoint(a.parts.pose(a.machine,presentationPose(pose)).get(partID),nativeXY,partID):null;}
 function worldPoint(actor,point){return point?{...point,x:actor.x+point.x*actor.scale,y:actor.y+point.y*actor.scale}:null;}
 function point(actor,pose,slot){const q=layout(),entry=q.points[slot]||q.weapons[slot];return entry?{...worldPoint(actor,nativePoint(entry.part,entry.nativeXY,pose)),alphaMeasured:finite(entry.alpha)&&entry.alpha>=16,sourceAlpha:finite(entry.alpha)?entry.alpha:null}:null;}
 function weaponVector(actor,pose,slot){const w=layout().weapons[slot];if(!w)return null;const tip=worldPoint(actor,nativePoint(w.part,w.nativeXY,pose)),base=worldPoint(actor,nativePoint(w.part,w.axisTailNativeXY,pose));if(!tip||!base)return null;const angle=Math.atan2(tip.y-base.y,tip.x-base.x);return{...tip,tip:{...tip},base,angle,direction:{x:Math.cos(angle),y:Math.sin(angle)},sourceNativeXY:w.nativeXY.slice(),slot,alphaMeasured:finite(w.alpha)&&w.alpha>=16,sourceAlpha:finite(w.alpha)?w.alpha:null,absolute1to1Certified:false};}
 function bounds(actor,pose={},selected){
  const q=layout(),a=prepared();if(!a)return null;const transforms=a.parts.pose(a.machine,presentationPose(pose)),names=selected||[...Object.keys(q.regions),NECK_SUPPORT.part.id];let left=Infinity,top=Infinity,right=-Infinity,bottom=-Infinity;
  for(const id of names){const box=q.alphaBounds[id]||(id===NECK_SUPPORT.part.id?NECK_SUPPORT.alphaBounds:null);if(!box)continue;for(const xy of [[box[0],box[1]],[box[2],box[1]],[box[2],box[3]],[box[0],box[3]]]){const p=worldPoint(actor,transformedPoint(transforms.get(id),xy,id));if(!p)continue;left=Math.min(left,p.x);right=Math.max(right,p.x);top=Math.min(top,p.y);bottom=Math.max(bottom,p.y);}}
  return right>left&&bottom>top?{x:left,y:top,w:right-left,h:bottom-top,left,top,right,bottom}:null;
 }
 function body(actor,pose){return bounds(actor,pose,layout().bodyParts);}
 function draw(context,actor,pose={}){const a=prepared();if(!a?.registry.ready(ID))return false;context.save();try{context.translate(actor.x,actor.y);context.scale(actor.scale,actor.scale);return a.registry.draw(context,ID,presentationPose(pose));}finally{context.restore();}}
 function neutralFoot(side){const q=layout(),s=q.sockets,K=q.sourceUniformScale;return(q.points[side+'_contact'].nativeXY[0]-s.anchor[0])*K;}
 function createMotion(actor){return{bodyDrop:0,bodyLean:0,bodyShift:0,headPitch:0,nearWing:0,farWing:0,jawOpen:0,recoil:0,impact:0,velocity:0,nextFoot:'near',feet:Object.fromEntries(['near','far'].map(side=>[side,{dx:0,lift:0,worldX:actor.x/actor.scale+neutralFoot(side),swing:null}]))};}
 /* Mutates only the supplied engine-owned motion object. Call once per engine
  * update. All rendering/geometry/aim APIs above are pure with respect to it. */
 function advanceMotion(motion,input){
  const actor=input.actor,m=motion,rx=actor.x/actor.scale,velocity=finite(input.velocity)?input.velocity:0,old=m.velocity,moving=Math.abs(velocity)>.005,dir=Math.sign(velocity)||-1,contacts=[];
  m.velocity=velocity;m.recoil=Math.max(0,(m.recoil||0)-.12);m.impact=Math.max(0,(m.impact||0)-.06);
  for(const side of ['near','far']){const foot=m.feet[side],s=foot.swing;if(s){s.age++;const t=clamp(s.age/s.duration,0,1),ease=t*t*(3-2*t);if(s.age<s.duration-3)s.targetX=rx+neutralFoot(side)+(moving?dir*4:0)+velocity/actor.scale*(s.duration-s.age);foot.worldX=s.startX+(s.targetX-s.startX)*ease;foot.lift=Math.sin(Math.PI*t)*7;if(t===1){foot.lift=0;foot.swing=null;contacts.push(side);}}foot.dx=foot.worldX-rx-neutralFoot(side);}
  if(!m.feet.near.swing&&!m.feet.far.swing){const needs=side=>moving?Math.abs(m.feet[side].dx)>3:Math.abs(m.feet[side].dx)>.15,side=needs(m.nextFoot)?m.nextFoot:needs(m.nextFoot==='near'?'far':'near')?(m.nextFoot==='near'?'far':'near'):null;if(side){const foot=m.feet[side],duration=12;foot.swing={age:0,duration,startX:foot.worldX,targetX:rx+neutralFoot(side)+(moving?dir*4:0)+velocity/actor.scale*duration};m.nextFoot=side==='near'?'far':'near';}}
  const loaded=moving||Object.values(m.feet).some(f=>f.swing||Math.abs(f.dx)>.15);m.bodyDrop=approach(m.bodyDrop,input.brace?5:loaded?4:input.attack?2:0,.28);m.bodyLean=clamp(-(velocity-old)*2.4+m.impact*.4,-.8,.8);m.bodyShift=-(m.recoil||0)*1.6-(m.impact||0)*.7;
  return{contacts,planted:['near','far'].filter(side=>!m.feet[side].swing)};
 }
 /* Exact hinge/offset ray solution: the target lies on the rotated native bore
  * when it is inside its mechanical arc. Unreachable or rear targets are
  * honestly clamped rather than bending the emitted projectile off the gun. */
 function aim(actor,pose,target,slot='water'){
  const a=prepared(),q=layout(),w=q.weapons[slot];if(!a||!w||!w.channel)return null;
  const motion={...(pose?.rayMotion||{}),[w.motionKey]:0},neutral={...pose,rayMotion:motion},state=presentationPose(neutral),transforms=a.parts.pose(a.machine,state),joint=transforms.get(w.part),tip=weaponVector(actor,neutral,slot);if(!joint||!tip)return null;
  const hinge=worldPoint(actor,{x:joint.matrix[4],y:joint.matrix[5]}),targetVector={x:target.x-hinge.x,y:target.y-hinge.y},length=Math.hypot(targetVector.x,targetVector.y),axis={x:Math.cos(tip.angle),y:Math.sin(tip.angle)},origin={x:tip.x-hinge.x,y:tip.y-hinge.y},cross=axis.x*origin.y-axis.y*origin.x;
  if(length<1e-8)return{degrees:0,clamped:true,reachable:false,part:w.part};
  const correction=Math.asin(clamp(cross/length,-1,1)),desired=normalize(Math.atan2(targetVector.y,targetVector.x)-tip.angle-correction),degrees=clamp(-desired/DEG,w.limits[0],w.limits[1]),candidate={...pose,rayMotion:{...(pose?.rayMotion||{}),[w.motionKey]:degrees}},line=weaponVector(actor,candidate,slot),dx=target.x-line.x,dy=target.y-line.y,forward=dx*line.direction.x+dy*line.direction.y,miss=Math.abs(dx*line.direction.y-dy*line.direction.x);
  return{degrees,channel:w.channel,motionKey:w.motionKey,part:w.part,clamped:Math.abs(degrees+desired/DEG)>1e-7,reachable:forward>=0&&miss<1e-5,forward,targetMiss:miss,vector:line};
 }
 /* Pure admissible root travel for the feet which are still bearing weight.
  * A 1.25 rig-unit reach reserve admits the next bounded body load/lean.
  * The controller clamps its proposed actor.x to this interval BEFORE advancing
  * motion. An engine teleport should call createMotion instead. */
 function motionLimits(actor,motion){
  const q=layout(),K=q.sourceUniformScale,s=q.sockets,m=motion,drop=clamp(finite(m.bodyDrop)?m.bodyDrop:0,0,10),lean=clamp(finite(m.bodyLean)?m.bodyLean:0,-3,3)*DEG,shift=clamp(finite(m.bodyShift)?m.bodyShift:0,-4,4),cos=Math.cos(lean),sin=Math.sin(lean);let left=-Infinity,right=Infinity;
  const supports=[];
  for(const side of ['near','far']){
   const foot=m.feet?.[side];if(!foot||foot.swing)continue;
   const h=s[side+'_upper_leg'],base=s.body_anchor,hip=[K*(h[0]-base[0]),K*(base[1]-h[1])],v=vectors(side),a=Math.hypot(...v[0]),b=Math.hypot(...v[1]),max=a+b-1.25,min=Math.abs(a-b)+1.25,rotatedHip=[cos*hip[0]-sin*hip[1],sin*hip[0]+cos*hip[1]],A=hip[0]+v[0][0]+v[1][0]+foot.worldX-neutralFoot(side)-shift-rotatedHip[0],B=hip[1]+v[0][1]+v[1][1]+drop-rotatedHip[1],span=Math.sqrt(Math.max(0,max*max-B*B));let lo=A-span,hi=A+span;
   if(Math.abs(B)<min){const gap=Math.sqrt(Math.max(0,min*min-B*B));if(v[0][0]+v[1][0]<0)lo=Math.max(lo,A+gap);else hi=Math.min(hi,A-gap);}
   left=Math.max(left,lo*actor.scale);right=Math.min(right,hi*actor.scale);supports.push({side,left:lo*actor.scale,right:hi*actor.scale});
  }
  // Native IK is deliberately bounded to ±18 source units, so the allowable
  // engine travel also respects this authored camera's admitted ankle range.
  for(const side of ['near','far']){const foot=m.feet?.[side];if(!foot||foot.swing)continue;left=Math.max(left,(foot.worldX-neutralFoot(side)-18)*actor.scale);right=Math.min(right,(foot.worldX-neutralFoot(side)+18)*actor.scale);}
  return{left,right,supports,x:clamp(actor.x,left,right),clamped:actor.x<left||actor.x>right};
 }
 function diagnostics(actor,pose={}){const m=pose.rayMotion||{};return{id:ID,status:status(),bounds:bounds(actor,pose),body:body(actor,pose),feet:Object.fromEntries(['near','far'].map(side=>[side,point(actor,pose,side+'_contact')])),weapons:Object.fromEntries(Object.keys(layout().weapons).map(slot=>[slot,weaponVector(actor,pose,slot)])),planted:['near','far'].filter(side=>!m.feet?.[side]?.swing),nativeFacing:'left',mirrored:false,absolute1to1Certified:false};}
 const API=Object.freeze({schema:'cqc.pass33.ray-mgs4-native/1',id:ID,definition,prepared,whenReady,ready,status,dispose,presentationPose,draw,point,nativePoint,weaponVector,bounds,body,createMotion,advanceMotion,motionLimits,aim,diagnostics,limits:LIMITS,sourceLayout:SOURCE_LAYOUT,innerSupport:NECK_SUPPORT,solveTwoBone:solve});
 root.addEventListener?.('pagehide',dispose);
 root.CQC_PASS33_RAY_MGS4=API;if(typeof module==='object'&&module.exports)module.exports=API;
})(globalThis);
