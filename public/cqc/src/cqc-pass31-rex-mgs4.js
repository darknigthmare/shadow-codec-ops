/* Metal Gear REX, MGS4 Shadow Moses piloted battle-damaged incarnation.
 * One new coherent source camera, never substituted for the MGS1 rig.
 * This pure presentation helper owns no combat state, HP, clocks or saves.
 */
(function(root){
 'use strict';
 const ID='rex_mgs4_ps3_2008',K=.4,DEG=Math.PI/180;
 const clone=value=>JSON.parse(JSON.stringify(value));
 const finite=value=>typeof value==='number'&&Number.isFinite(value);
 const clamp=(value,a,b)=>Math.max(a,Math.min(b,value));
 const SOURCE={"id":"rex_mgs4_pass31_camera","file":"assets/machines-pass31/rex-mgs4/rex-mgs4-native-three-quarter.png","bytes":1991019,"width":1536,"height":1024,"sha256":"80faad20dbff293b2d6e80f2f29ef2f8fe4e653b10ab54ac528e36fb6a68e341"},INNER_SOURCE={id:"rex_mgs4_pass31_inner",file:"assets/machines-pass31/rex-mgs4/rex-mgs4-inner-legs.png",bytes:1746960,width:1536,height:1024,sha256:"727c24d33823379b334a693a38bd0881a650c598f8ecc3cdd252f670387b24bd"},REGIONS={"near_upper_leg":[[0,610],[386,610],[409,608],[412.45385658,607.44738295],[412,604],[412.74963182,598.30598101],[414.94744112,593],[418.44365081,588.44365081],[423,584.94744112],[428.30598101,582.74963182],[434,582],[439.69401899,582.74963182],[445,584.94744112],[449.55634919,588.44365081],[453.05255888,593],[455.25036818,598.30598101],[456,604],[455.25036818,609.69401899],[453.05255888,615],[450.82692466,617.90050298],[480,642],[542,664],[585,651],[620,635],[657,600],[710,600],[712.5,600],[708,570],[687,490],[663,435],[610,413],[559,333],[466,304],[410,255],[0,255]],"near_lower_leg":[[0,799.66507177],[408,786],[443,798],[477,819],[527,823],[553,837],[700,858],[713,858],[713,603.33333333],[712.5,600],[710,600],[657,600],[620,635],[585,651],[542,664],[480,642],[450.82692466,617.90050298],[449.55634919,619.55634919],[445,623.05255888],[439.69401899,625.25036818],[434,626],[428.30598101,625.25036818],[423,623.05255888],[418.44365081,619.55634919],[414.94744112,615],[412.74963182,609.69401899],[412.45385658,607.44738295],[409,608],[386,610],[0,610]],"near_heel":[[0,799.66507177],[0,1024],[562.82524272,1024],[560,927],[555,876],[559,850],[559,837.85714286],[553,837],[527,823],[477,819],[443,798],[408,786]],"near_front_claw":[[562.82524272,1024],[713,1024],[713,858],[700,858],[559,837.85714286],[559,850],[555,876],[560,927]],"far_upper_leg":[[1536,700],[1080,700],[965,645],[901,621],[835,613],[746,637],[720,650],[713,603.33333333],[713,761.48653846],[1030,756],[1093,740],[1120.54495847,745.86062946],[1120.68148347,744.8236191],[1122.67949192,740],[1125.85786438,735.85786438],[1130,732.67949192],[1134.8236191,730.68148347],[1140,730],[1145.1763809,730.68148347],[1150,732.67949192],[1154.14213562,735.85786438],[1157.32050808,740],[1159.31851653,744.8236191],[1160,750],[1159.60295719,753.01583957],[1166,754],[1236,794],[1536,794]],"far_lower_leg":[[1536,794],[1236,794],[1166,754],[1159.60295719,753.01583957],[1159.31851653,755.1763809],[1157.32050808,760],[1154.14213562,764.14213562],[1150,767.32050808],[1145.1763809,769.31851653],[1140,770],[1134.8236191,769.31851653],[1130,767.32050808],[1125.85786438,764.14213562],[1122.67949192,760],[1120.68148347,755.1763809],[1120,750],[1120.54495847,745.86062946],[1093,740],[1030,756],[713,761.48653846],[713,824.56956522],[1140,819],[1190,805],[1220,817.1],[1260,821],[1536,821]],"far_heel":[[713,1024],[1258.5483871,1024],[1230,906],[1237,844],[1250,822],[1250,820.025],[1220,817.1],[1190,805],[1140,819],[713,824.56956522]],"far_front_claw":[[1258.5483871,1024],[1536,1024],[1536,821],[1260,821],[1250,820.025],[1250,822],[1237,844],[1230,906]],"broken_radome":[[1536,234],[1536,0],[990,0],[990,105],[956,146],[960,208],[1110,234]],"head_shell":[[1536,405],[1536,234],[1110,234],[960,208],[956,146],[990,105],[990,0],[812,0],[812,169],[880,230],[904,284],[900.0007678,363.98464407],[901,364],[964,365],[1005,399],[1095,405]],"open_cockpit_jaw":[[1536,700],[1536,405],[1095,405],[1005,399],[964,365],[901,364],[900.0007678,363.98464407],[900,364],[860,414],[850,486],[835,515],[862,572],[840.23639896,613.63471503],[901,621],[965,645],[1080,700]],"dorsal_frame":[[812,0],[0,0],[0,211.472103],[456,233],[518,256],[619,197],[681,164],[761,166],[812,167.8]],"central_hull":[[0,211.472103],[0,255],[410,255],[466,304],[559,333],[610,413],[663,435],[687,490],[708,570],[720,650],[746,637],[835,613],[840.23639896,613.63471503],[862,572],[835,515],[850,486],[860,414],[900,364],[904,284],[880,230],[812,169],[812,167.8],[761,166],[681,164],[619,197],[518,256],[456,233]],"near_knee_bearing":[[456,604],[455.25036818,598.30598101],[453.05255888,593],[449.55634919,588.44365081],[445,584.94744112],[439.69401899,582.74963182],[434,582],[428.30598101,582.74963182],[423,584.94744112],[418.44365081,588.44365081],[414.94744112,593],[412.74963182,598.30598101],[412,604],[412.74963182,609.69401899],[414.94744112,615],[418.44365081,619.55634919],[423,623.05255888],[428.30598101,625.25036818],[434,626],[439.69401899,625.25036818],[445,623.05255888],[449.55634919,619.55634919],[453.05255888,615],[455.25036818,609.69401899]],"far_knee_bearing":[[1160,750],[1159.31851653,744.8236191],[1157.32050808,740],[1154.14213562,735.85786438],[1150,732.67949192],[1145.1763809,730.68148347],[1140,730],[1134.8236191,730.68148347],[1130,732.67949192],[1125.85786438,735.85786438],[1122.67949192,740],[1120.68148347,744.8236191],[1120,750],[1120.68148347,755.1763809],[1122.67949192,760],[1125.85786438,764.14213562],[1130,767.32050808],[1134.8236191,769.31851653],[1140,770],[1145.1763809,769.31851653],[1150,767.32050808],[1154.14213562,764.14213562],[1157.32050808,760],[1159.31851653,755.1763809]]},SOCKETS={"anchor":[750,985],"body_anchor":[750,340],"central_hull":[750,340],"dorsal_frame":[686,176],"head_shell":[902,362],"open_cockpit_jaw":[904,412],"broken_radome":[998,122],"near_upper_leg":[443,337],"near_lower_leg":[434,604],"near_knee_bearing":[434,604],"near_heel":[477,819],"near_front_claw":[583,859],"far_upper_leg":[942,655],"far_lower_leg":[1140,750],"far_knee_bearing":[1140,750],"far_heel":[1212,813],"far_front_claw":[1266,838]},PARENTS={"body_anchor":"anchor","central_hull":"body_anchor","dorsal_frame":"central_hull","head_shell":"central_hull","open_cockpit_jaw":"central_hull","broken_radome":"dorsal_frame","near_upper_leg":"body_anchor","near_lower_leg":"near_upper_leg","near_knee_bearing":"near_upper_leg","near_heel":"near_lower_leg","near_front_claw":"near_heel","far_upper_leg":"body_anchor","far_lower_leg":"far_upper_leg","far_knee_bearing":"far_upper_leg","far_heel":"far_lower_leg","far_front_claw":"far_heel"};
 const INNER_FITS=Object.freeze({near_inner_upper:{start:[470,175],end:[547,518],startPart:'near_upper_leg',endPart:'near_lower_leg'},near_inner_lower:{start:[547,518],end:[478,819],startPart:'near_lower_leg',endPart:'near_heel'},far_inner_upper:{start:[804,263],end:[994,558],startPart:'far_upper_leg',endPart:'far_lower_leg'},far_inner_lower:{start:[994,558],end:[1195,818],startPart:'far_lower_leg',endPart:'far_heel'}});
 const refs=Object.freeze([
  {url:'https://www.flickr.com/photos/playstationblog/albums/72157605269016774/',kind:'primary Sony PlayStationBlog MGS4 Konami Gamers Night screenshots; MSG4 Old Rex'},
  {url:'https://live.staticflickr.com/2198/2526323170_7b60fc8366_h.jpg',sha256:'17aecf5a9d5a09c8449b588ef07b920c51542ce94afb2bcabd72826b23b608be',kind:'official PS3 2008 in-game damaged REX: open pilot cockpit and shattered radome'},
  {url:'https://www.metalgearinformer.com/metal-gear-rex-partially-destroyed-mgs4-version-by-kotobukiya-pictures-and-details/',kind:'licensed Kotobukiya MGS4 partially-destroyed model camera/visible articulation references, relayed secondarily'},
  {url:'https://www.metalgearinformer.com/wp-content/uploads/2016/06/Metal-Gear-Rex-Kotobukiya-3.jpg',sha256:'b56f7e892dc134b47ddb5d80f4d2c12924fde3c56139a3b7353472b72c0de416',kind:'native right-facing three-quarter source projection; absent railgun, open cockpit and exposed damaged dish'},
  {url:'https://www.metalgearinformer.com/wp-content/uploads/2016/06/Metal-Gear-Rex-Kotobukiya-8.jpg',sha256:'e68039cfccb050035e7df235d2a4fc1053137d4e6fcfa17a11ee0f4bb1a09dbc',kind:'front cockpit and native separated claw/support detail'}
 ]);
 const limits=Object.freeze([
  'New reference-led generated 2D reconstruction of the MGS4 piloted damaged incarnation. Original extracted geometry, animation or absolute 1:1 is not certified.',
  'Only this right-facing native three-quarter camera is admitted. Opposite camera is not faked by mirroring, MGS1 source reuse or renaming.',
  'The nuclear railgun is absent and the radome is already broken in this incarnation. There is no railgun descriptor, intact-dish variant or staged MGS1 boss damage transition.',
  'The cockpit is already open with Old Snake visible. No unsupported opening/closing variant, camera-side interior or unsupported articulated hatch is invented.',
  'Native regions follow visible hardware boundaries. Gait/foot/claw movements and socket-fitted internal volumes are authored 2D presentation adaptations. Large extreme poses and the full original 3D hidden skeleton remain unadmitted.',
  'Canon-guided internal hydraulic/axle volumes are uniformly fitted between the source armor joints. Their hidden surfaces and 2D projection remain interpreted. Walk/defeat compressions are bounded; full 3D stepping and extreme knee folds remain unadmitted. No new destructible part flags, engine targets, health pools, combat timing or save migration are added. The REX vs RAY existing encounter can consume the new pilot without creating a fighter UID.',
  'Missile launch surfaces on the dorsal machinery and the visible machinegun/laser surfaces are source anchors. Original missile cap-opening/ejection frames are not included.',
  'Complete native pixel-center coverage is measured separately. Canvas clipping antialiases seams; exact assembled RGBA equivalence is not assumed.',
  'The original nominal REX dimension can remain a reference but this damaged posed incarnation has no newly measured canonical metric height.'
 ]);
 function binding(channel,factor=1,cosmetic=false){return[{channel,factor,...(cosmetic?{cosmetic:true}:{})}];}
 function definition(){
  const machine={id:ID,edition:'Metal Gear REX — MGS4 Guns of the Patriots, PS3 2008, piloted battle-damaged Shadow Moses incarnation',origin:[0,0],scale:[1,1],sources:[clone(SOURCE),clone(INNER_SOURCE)],parts:[],pass31RexMgs4Native:true,documentaryQualifications:limits.slice()};
  for(const [id,pivot]of Object.entries(SOCKETS)){
   const parent=PARENTS[id],parentSocket=parent?SOCKETS[parent]:SOCKETS.anchor;
   const part={id,source:SOURCE.id,rect:REGIONS[id]?[0,0,1536,1024]:[0,0,1,1],pivot:REGIONS[id]?pivot.slice():[0,0],imageScale:REGIONS[id]?K:1,offset:parent?[(pivot[0]-parentSocket[0])*K,(parentSocket[1]-pivot[1])*K]:[0,0],z:30,rotation:0,channels:{}};
   if(parent)part.parent=parent;
   if(REGIONS[id])part.sourceClipPolygonNativeXY=clone(REGIONS[id]);
   if(id.startsWith('far_'))part.z=10;if(id.startsWith('near_'))part.z=50;
   if(id.endsWith('knee_bearing'))part.z+=.05;
   if(id==='broken_radome')part.z=25;if(id==='head_shell')part.z=40;if(id==='open_cockpit_jaw')part.z=42;
   machine.parts.push(part);
  }
  const part=id=>machine.parts.find(value=>value.id===id);
  part('body_anchor').channels={y:binding('pass31RexBodyDrop')};
  for(const side of ['near','far']){
   const title=side[0].toUpperCase()+side.slice(1);
   part(side+'_upper_leg').channels={rotation:binding('pass31Rex'+title+'Upper')};
   part(side+'_lower_leg').channels={rotation:binding('pass31Rex'+title+'Lower')};
   part(side+'_heel').channels={rotation:binding('pass31Rex'+title+'FootLevel')};
   part(side+'_front_claw').channels={rotation:binding('pass31Rex'+title+'Claw',1,true)};
   part(side+'_knee_bearing').channels={rotation:binding('pass31Rex'+title+'Lower',.5)};
  }

  const innerBones=[
   {id:'near_inner_upper',parent:'near_upper_leg',sourceStart:[470,175],sourceEnd:[547,518],targetStart:SOCKETS.near_upper_leg,targetEnd:SOCKETS.near_lower_leg,clip:[[410,144],[521,128],[597,349],[618,469],[587,538],[490,538],[421,345]],z:49},
   {id:'near_inner_lower',parent:'near_lower_leg',sourceStart:[547,518],sourceEnd:[478,819],targetStart:SOCKETS.near_lower_leg,targetEnd:SOCKETS.near_heel,clip:[[490,538],[615,538],[574,672],[548,744],[531,847],[409,847],[420,675]],z:49},
   {id:'far_inner_upper',parent:'far_upper_leg',sourceStart:[804,263],sourceEnd:[994,558],targetStart:SOCKETS.far_upper_leg,targetEnd:SOCKETS.far_lower_leg,clip:[[747,214],[879,214],[1053,540],[1038,586],[955,586],[855,456],[713,341]],z:9},
   {id:'far_inner_lower',parent:'far_lower_leg',sourceStart:[994,558],sourceEnd:[1195,818],targetStart:SOCKETS.far_lower_leg,targetEnd:SOCKETS.far_heel,clip:[[955,586],[1056,586],[1122,667],[1280,860],[1175,867],[1080,770],[930,622]],z:9}
  ];
  for(const spec of innerBones){
   const from=[spec.sourceEnd[0]-spec.sourceStart[0],spec.sourceEnd[1]-spec.sourceStart[1]],to=[spec.targetEnd[0]-spec.targetStart[0],spec.targetEnd[1]-spec.targetStart[1]],angle=(Math.atan2(to[1],to[0])-Math.atan2(from[1],from[0]))/DEG;
   machine.parts.push({id:spec.id,parent:spec.parent,source:INNER_SOURCE.id,rect:[0,0,1536,1024],pivot:spec.sourceStart.slice(),offset:[0,0],z:spec.z,rotation:0,imageScale:K*Math.hypot(...to)/Math.hypot(...from),textureRotation:angle,sourceClipPolygonNativeXY:clone(spec.clip),documentaryQualification:'Canon-guided generated internal REX strut and hydraulic volume, uniformly socket-fitted beneath original native armor. Hidden-camera projection is interpreted, no original extracted skeleton certification.'});
  }
  return machine;
 }
 function apply(catalog){
  if(catalog?.schema!=='cqc.machine-parts/1'||!Array.isArray(catalog.machines))throw Error('MGS4 REX needs a native machine catalog');
  const next=clone(catalog),existing=next.machines.find(value=>value.id===ID),machine=definition();
  if(existing){if(JSON.stringify(existing)!==JSON.stringify(machine))throw Error('MGS4 REX incarnation conflicts with the admitted definition');return {catalog:next,changes:[],limits:limits.slice()};}
  next.machines.push(machine);root.CQC_MACHINE_PARTS?.normalizeCatalog(next);
  return {catalog:next,changes:[{id:ID,addedMachine:true,addedParts:machine.parts.map(value=>value.id),newSources:[clone(SOURCE),clone(INNER_SOURCE)],existingMachinesUnchanged:true,sourceCamera:'native right-facing three-quarter MGS4 damaged source',simulationMutation:false,absolute1to1Certified:false}],limits:limits.slice()};
 }
 function solve(first,second,dx,lift){
  if(Math.abs(dx)+Math.abs(lift)<1e-10)return{upper:0,lower:0,foot:0,dx:0,lift:0};
  const a=Math.hypot(...first),b=Math.hypot(...second),target=[first[0]+second[0]+dx,first[1]+second[1]+lift],max=a+b-1e-8;
  if(Math.hypot(...target)>max){const allowedX=Math.sqrt(Math.max(0,max*max-target[1]*target[1]));target[0]=clamp(target[0],-allowedX,allowedX);}
  const realDistance=Math.max(1e-8,Math.hypot(...target)),direction=Math.atan2(target[1],target[0]),spread=Math.acos(clamp((a*a+realDistance*realDistance-b*b)/(2*a*realDistance),-1,1));
  const norm=value=>((value+180)%360+360)%360-180;
  const candidates=[direction+spread,direction-spread].map(angle=>{const secondAngle=Math.atan2(target[1]-a*Math.sin(angle),target[0]-a*Math.cos(angle));const upper=norm(angle/DEG-Math.atan2(first[1],first[0])/DEG),lower=norm(secondAngle/DEG-Math.atan2(second[1],second[0])/DEG-upper);return{upper,lower,foot:-upper-lower,dx:target[0]-first[0]-second[0],lift};});
  candidates.sort((l,r)=>Math.abs(l.upper)+Math.abs(l.lower)-Math.abs(r.upper)-Math.abs(r.lower));return candidates[0];
 }
 const LEGS=Object.freeze(Object.fromEntries(['near','far'].map(side=>{const a=SOCKETS[side+'_upper_leg'],b=SOCKETS[side+'_lower_leg'],c=SOCKETS[side+'_heel'];return[side,[[K*(b[0]-a[0]),K*(a[1]-b[1])],[K*(c[0]-b[0]),K*(b[1]-c[1])]]];})));
 function presentationPose(id,pose){
  if(id!==ID||!pose)return pose;
  const result={...pose,flags:{...(pose.flags||{})},channels:{...(pose.channels||{})}},c=result.channels;
  const dead=pose.defeated===true||pose.ko===true||/^(dead|ko)$/.test(pose.action||'');
  const movement=!dead&&(pose.walk===true||/walk|run|dash/.test(pose.action||''));
  const drop=dead?clamp(finite(pose.defeatFrames)?pose.defeatFrames/90:finite(c.rexCollapse)?c.rexCollapse/27:1,0,1)*3:pose.crouch===true||pose.guard===true?1:0;
  c.pass31RexBodyDrop=-drop;
  for(const side of ['near','far']){
   const title=side[0].toUpperCase()+side.slice(1),explicitLift=c[side+'Lift'],explicitSwing=c[side+'Swing'];
   const lift=dead?0:clamp(finite(explicitLift)?explicitLift*(side==='near'?.25:.085):0,0,side==='near'?6:2),dx=movement?clamp(finite(explicitSwing)?explicitSwing*(side==='near'?.16:.03):0,side==='near'?-2:-.5,side==='near'?2:.5):0;
   const joint=solve(LEGS[side][0],LEGS[side][1],dx,lift+drop);
   c['pass31Rex'+title+'Upper']=joint.upper;c['pass31Rex'+title+'Lower']=joint.lower;c['pass31Rex'+title+'FootLevel']=joint.foot;
   c['pass31Rex'+title+'Claw']=!dead&&!pose.reducedMotion&&lift>0?Math.min(1.2,lift*.25):0;
  }
  result.flags.pass31RexDamaged=true;result.flags.pass31RexCockpitOpen=true;
  return result;
 }
 const sourcePoints=Object.freeze({[ID]:Object.freeze({
  ballistic:Object.freeze({part:'central_hull',nativeXY:[783,298],kind:'native visible side machinegun muzzle surface'}),
  laser:Object.freeze({part:'open_cockpit_jaw',nativeXY:[1102,513],kind:'native visible lower front emitter surface; 2D marker, original 3D emitter bore unextracted'}),
  missile:Object.freeze({part:'dorsal_frame',nativeXY:[415,80],kind:'native visible dorsal launcher cap surface'}),
  cockpit:Object.freeze({part:'open_cockpit_jaw',nativeXY:[958,456],kind:'open pilot cockpit seat surface'})
 })});
 const weaponPoints=Object.freeze({[ID]:Object.freeze({part:'central_hull',sourceNativeXY:[783,298],byAttackKind:Object.freeze({
  laser:Object.freeze({part:'open_cockpit_jaw',sourceNativeXY:[1102,513]}),missile:Object.freeze({part:'dorsal_frame',sourceNativeXY:[415,80]})
 })})});
 const stateMappings=Object.freeze({[ID]:Object.freeze({kind:'heavy_biped',displayHeight:420,nativeSourceCameraFacing:'right',framingQualification:'Historical 2D presentation framing, no canonical metric height measurement'})});
 root.CQC_PASS31_REX_MGS4=Object.freeze({stateMappings,schema:'cqc.pass31.rex-mgs4-native/1',ids:Object.freeze([ID]),apply,presentationPose,sourcePoints,weaponPoints,limits,refs,definition,geometry:Object.freeze({sockets:SOCKETS,legVectors:LEGS,sourceUniformScale:K,visibleRegions:REGIONS,innerSourceBoneFits:INNER_FITS}),audit:Object.freeze({sourceCameraFacing:'right',railgunPresent:false,radomeIntact:false,cockpitOpen:true,simulationMutation:false,absolute1to1Certified:false})});
 if(typeof module==='object'&&module.exports)module.exports=root.CQC_PASS31_REX_MGS4;
})(globalThis);
