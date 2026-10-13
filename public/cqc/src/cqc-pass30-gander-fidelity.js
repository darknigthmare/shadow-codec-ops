/* Gander: new source-camera reconstruction from Konami's Ghost Babel concept.
 * Original atlases and every encounter identity remain available. No HP pool or
 * combat clock is changed. Native visible regions share one coherent projection.
 */
(function(root){
 'use strict';
 const ID='gander_ghost_gbc2000', K=.4, DEG=Math.PI/180;
 const clone=v=>JSON.parse(JSON.stringify(v));
 const finite=v=>typeof v==='number'&&Number.isFinite(v);
 const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
 const SOURCES=[{"id":"gander_pass30","file":"assets/machines-pass30/gander/gander-native-three-quarter.png","sha256":"433712ceaa769523e0b6585a6112fbda6a52ae37d86793422d3c5f10ae895bd2","bytes":1524803,"width":1536,"height":1024},{"id":"gander_pass30_open","file":"assets/machines-pass30/gander/gander-native-faceplate-open.png","sha256":"307c1342587a694fa598b23c52c38efe008846d1f01dbe1754cb1c6745bd84ab","bytes":1543671,"width":1536,"height":1024}];
 const REGIONS={"near_foot":[[0.0,953.0],[0.0,1024.0],[510.0,1024.0],[510.0,953.0]],"near_shin":[[0.0,953.0],[510.0,953.0],[510.0,649.0],[399.0,649.0],[398.26984066,656.41343224],[396.10742224,663.54197043],[392.59584527,670.11166885],[387.87005769,675.87005769],[382.11166885,680.59584527],[375.54197043,684.10742224],[368.41343224,686.26984066],[361.0,687.0],[353.58656776,686.26984066],[346.45802957,684.10742224],[339.88833115,680.59584527],[334.12994231,675.87005769],[329.40415473,670.11166885],[325.89257776,663.54197043],[323.73015934,656.41343224],[323.0,649.0],[0.0,649.0]],"near_pod":[[0.0,649.0],[323.0,649.0],[323.73015934,641.58656776],[325.89257776,634.45802957],[329.40415473,627.88833115],[333.0,623.50678101],[333.0,360.0],[0.0,360.0]],"near_thigh":[[510.0,579.40740741],[459.0,558.0],[455.26830237,490.82944267],[449.97674841,490.30827009],[443.22339643,488.25966317],[436.99947161,484.93290604],[431.54415588,480.45584412],[427.06709396,475.00052839],[423.74033683,468.77660357],[421.69172991,462.02325159],[421.0,455.0],[421.69172991,447.97674841],[423.74033683,441.22339643],[427.06709396,434.99947161],[431.54415588,429.54415588],[436.99947161,425.06709396],[443.22339643,421.74033683],[449.97674841,419.69172991],[451.30891793,419.56052266],[448.0,360.0],[434.0,360.0],[333.0,360.0],[333.0,623.50678101],[334.12994231,622.12994231],[339.88833115,617.40415473],[346.45802957,613.89257776],[353.58656776,611.73015934],[361.0,611.0],[368.41343224,611.73015934],[375.54197043,613.89257776],[382.11166885,617.40415473],[387.87005769,622.12994231],[392.59584527,627.88833115],[396.10742224,634.45802957],[398.26984066,641.58656776],[399.0,649.0],[434.0,649.0],[510.0,649.0]],"far_foot":[[510.0,1024.0],[1536.0,1024.0],[1536.0,960.0],[510.0,960.0]],"far_shin":[[1536.0,700.0],[706.0,700.0],[705.34669953,706.63307095],[703.41190411,713.0112367],[700.26996682,718.88938792],[696.04163056,724.04163056],[690.88938792,728.26996682],[685.0112367,731.41190411],[678.63307095,733.34669953],[672.0,734.0],[665.36692905,733.34669953],[658.9887633,731.41190411],[653.11061208,728.26996682],[647.95836944,724.04163056],[643.73003318,718.88938792],[640.58809589,713.0112367],[638.65330047,706.63307095],[638.0,700.0],[510.0,700.0],[510.0,960.0],[1536.0,960.0]],"far_pod":[[1536.0,700.0],[1536.0,398.0],[770.0,398.0],[733.0,398.0],[733.0,700.0]],"far_thigh":[[510.0,579.40740741],[510.0,700.0],[638.0,700.0],[638.65330047,693.36692905],[640.58809589,686.9887633],[643.73003318,681.11061208],[647.95836944,675.95836944],[653.11061208,671.73003318],[658.9887633,668.58809589],[665.36692905,666.65330047],[672.0,666.0],[678.63307095,666.65330047],[685.0112367,668.58809589],[690.88938792,671.73003318],[696.04163056,675.95836944],[700.26996682,681.11061208],[703.41190411,686.9887633],[705.34669953,693.36692905],[706.0,700.0],[733.0,700.0],[733.0,445.0],[733.0,398.0],[654.0,398.0],[654.0,432.19698281],[659.02325159,432.69172991],[665.77660357,434.74033683],[672.00052839,438.06709396],[677.45584412,442.54415588],[681.93290604,447.99947161],[685.25966317,454.22339643],[687.30827009,460.97674841],[688.0,468.0],[687.30827009,475.02325159],[685.25966317,481.77660357],[681.93290604,488.00052839],[677.45584412,493.45584412],[672.00052839,497.93290604],[665.77660357,501.25966317],[659.02325159,503.30827009],[654.0,503.80301719],[654.0,560.0],[540.0,592.0]],"jaw":[[340.0,0.0],[0.0,0.0],[0.0,165.39215686],[245.0,175.0],[302.0,165.0],[315.0,128.0],[340.0,80.0]],"jaw_lower_plate":[[0.0,165.39215686],[0.0,360.0],[315.0,360.0],[315.0,205.0],[302.0,165.0],[245.0,175.0]],"backpack":[[1536.0,398.0],[1536.0,241.0],[809.76923077,241.0],[811.0,245.0],[811.0,398.0]],"near_rail":[[975.0,155.0],[963.0,155.0],[741.0877193,154.0877193],[777.0,190.0],[807.0,232.0],[809.76923077,241.0],[975.0,241.0]],"near_rail_barrel":[[1536.0,241.0],[1536.0,155.0],[975.0,155.0],[975.0,241.0]],"far_rail":[[975.0,0.0],[690.0,0.0],[690.0,103.0],[741.0877193,154.0877193],[963.0,155.0],[975.0,155.0]],"far_rail_barrel":[[1536.0,155.0],[1536.0,0.0],[975.0,0.0],[975.0,155.0]],"carapace":[[690.0,0.0],[340.0,0.0],[340.0,80.0],[315.0,128.0],[302.0,165.0],[315.0,205.0],[315.0,260.0],[811.0,260.0],[811.0,245.0],[807.0,232.0],[777.0,190.0],[690.0,103.0]],"near_front_turret":[[315.0,260.0],[315.0,360.0],[445.0,360.0],[445.0,260.0]],"pelvis":[[451.30891793,419.56052266],[457.0,419.0],[464.02325159,419.69172991],[470.77660357,421.74033683],[477.00052839,425.06709396],[482.45584412,429.54415588],[486.93290604,434.99947161],[490.25966317,441.22339643],[492.30827009,447.97674841],[493.0,455.0],[492.30827009,462.02325159],[490.25966317,468.77660357],[486.93290604,475.00052839],[482.45584412,480.45584412],[477.00052839,484.93290604],[470.77660357,488.25966317],[464.02325159,490.30827009],[457.0,491.0],[455.26830237,490.82944267],[459.0,558.0],[540.0,592.0],[654.0,560.0],[654.0,503.80301719],[652.0,504.0],[644.97674841,503.30827009],[638.22339643,501.25966317],[631.99947161,497.93290604],[626.54415588,493.45584412],[622.06709396,488.00052839],[618.74033683,481.77660357],[616.69172991,475.02325159],[616.0,468.0],[616.69172991,460.97674841],[618.74033683,454.22339643],[622.06709396,447.99947161],[626.54415588,442.54415588],[631.99947161,438.06709396],[638.22339643,434.74033683],[644.97674841,432.69172991],[652.0,432.0],[654.0,432.19698281],[654.0,398.0],[654.0,260.0],[445.0,260.0],[445.0,360.0],[448.0,360.0]],"far_front_turret":[[654.0,398.0],[770.0,398.0],[811.0,398.0],[811.0,260.0],[654.0,260.0]],"near_hip_bearing":[[493.0,455.0],[492.30827009,447.97674841],[490.25966317,441.22339643],[486.93290604,434.99947161],[482.45584412,429.54415588],[477.00052839,425.06709396],[470.77660357,421.74033683],[464.02325159,419.69172991],[457.0,419.0],[449.97674841,419.69172991],[443.22339643,421.74033683],[436.99947161,425.06709396],[431.54415588,429.54415588],[427.06709396,434.99947161],[423.74033683,441.22339643],[421.69172991,447.97674841],[421.0,455.0],[421.69172991,462.02325159],[423.74033683,468.77660357],[427.06709396,475.00052839],[431.54415588,480.45584412],[436.99947161,484.93290604],[443.22339643,488.25966317],[449.97674841,490.30827009],[457.0,491.0],[464.02325159,490.30827009],[470.77660357,488.25966317],[477.00052839,484.93290604],[482.45584412,480.45584412],[486.93290604,475.00052839],[490.25966317,468.77660357],[492.30827009,462.02325159]],"near_knee_bearing":[[399.0,649.0],[398.26984066,641.58656776],[396.10742224,634.45802957],[392.59584527,627.88833115],[387.87005769,622.12994231],[382.11166885,617.40415473],[375.54197043,613.89257776],[368.41343224,611.73015934],[361.0,611.0],[353.58656776,611.73015934],[346.45802957,613.89257776],[339.88833115,617.40415473],[334.12994231,622.12994231],[329.40415473,627.88833115],[325.89257776,634.45802957],[323.73015934,641.58656776],[323.0,649.0],[323.73015934,656.41343224],[325.89257776,663.54197043],[329.40415473,670.11166885],[334.12994231,675.87005769],[339.88833115,680.59584527],[346.45802957,684.10742224],[353.58656776,686.26984066],[361.0,687.0],[368.41343224,686.26984066],[375.54197043,684.10742224],[382.11166885,680.59584527],[387.87005769,675.87005769],[392.59584527,670.11166885],[396.10742224,663.54197043],[398.26984066,656.41343224]],"far_hip_bearing":[[688.0,468.0],[687.30827009,460.97674841],[685.25966317,454.22339643],[681.93290604,447.99947161],[677.45584412,442.54415588],[672.00052839,438.06709396],[665.77660357,434.74033683],[659.02325159,432.69172991],[652.0,432.0],[644.97674841,432.69172991],[638.22339643,434.74033683],[631.99947161,438.06709396],[626.54415588,442.54415588],[622.06709396,447.99947161],[618.74033683,454.22339643],[616.69172991,460.97674841],[616.0,468.0],[616.69172991,475.02325159],[618.74033683,481.77660357],[622.06709396,488.00052839],[626.54415588,493.45584412],[631.99947161,497.93290604],[638.22339643,501.25966317],[644.97674841,503.30827009],[652.0,504.0],[659.02325159,503.30827009],[665.77660357,501.25966317],[672.00052839,497.93290604],[677.45584412,493.45584412],[681.93290604,488.00052839],[685.25966317,481.77660357],[687.30827009,475.02325159]],"far_knee_bearing":[[706.0,700.0],[705.34669953,693.36692905],[703.41190411,686.9887633],[700.26996682,681.11061208],[696.04163056,675.95836944],[690.88938792,671.73003318],[685.0112367,668.58809589],[678.63307095,666.65330047],[672.0,666.0],[665.36692905,666.65330047],[658.9887633,668.58809589],[653.11061208,671.73003318],[647.95836944,675.95836944],[643.73003318,681.11061208],[640.58809589,686.9887633],[638.65330047,693.36692905],[638.0,700.0],[638.65330047,706.63307095],[640.58809589,713.0112367],[643.73003318,718.88938792],[647.95836944,724.04163056],[653.11061208,728.26996682],[658.9887633,731.41190411],[665.36692905,733.34669953],[672.0,734.0],[678.63307095,733.34669953],[685.0112367,731.41190411],[690.88938792,728.26996682],[696.04163056,724.04163056],[700.26996682,718.88938792],[703.41190411,713.0112367],[705.34669953,706.63307095]]};
 const SOCKETS={anchor:[500,992],body_anchor:[500,167],carapace:[500,167],pelvis:[556,424],jaw:[282,148],jaw_lower_plate:[282,169],
 near_hip:[457,455],near_thigh:[457,455],near_hip_bearing:[457,455],near_knee_bearing:[361,649],near_shin:[361,649],near_foot:[300,953],near_pod:[319,422],
 far_hip:[652,468],far_thigh:[652,468],far_hip_bearing:[652,468],far_knee_bearing:[672,700],far_shin:[672,700],far_foot:[666,960],far_pod:[749,470],
 near_rail:[833,188],near_rail_barrel:[975,181],far_rail:[818,128],far_rail_barrel:[975,136],
 near_front_turret:[399,298],far_front_turret:[701,320],backpack:[848,266]};
 const PARENTS={body_anchor:'anchor',carapace:'body_anchor',pelvis:'body_anchor',jaw:'body_anchor',jaw_lower_plate:'jaw',
 near_hip:'body_anchor',near_thigh:'near_hip',near_hip_bearing:'near_hip',near_knee_bearing:'near_thigh',near_shin:'near_thigh',near_foot:'near_shin',near_pod:'near_thigh',
 far_hip:'body_anchor',far_thigh:'far_hip',far_hip_bearing:'far_hip',far_knee_bearing:'far_thigh',far_shin:'far_thigh',far_foot:'far_shin',far_pod:'far_thigh',
 near_rail:'carapace',near_rail_barrel:'near_rail',far_rail:'carapace',far_rail_barrel:'far_rail',
 near_front_turret:'carapace',far_front_turret:'carapace',backpack:'carapace'};
 const LIMITS=Object.freeze([
  'New art is a faithful best-effort redraw of the official Konami three-quarter concept. It is not an original extracted frame; absolute 1:1 is not certified.',
  'One admitted source camera is available. Opposite-camera art is not manufactured by mirroring or by renaming another edition.',
  'Visible native regions are cut along mechanical boundaries. Hidden joint surfaces and movements remain authored 2D adaptations; no 3D volumetric certification is claimed.',
  'The open faceplate uses an independently generated local appearance. Its small source variation is not an extracted original animation.',
  'The visible cylindrical leg pods retain encounter flags, but no unsupported new open-door pixels or original third battle phase are invented.',
  'All original atlases, part IDs, engine HP pools, phase rules, saves and clocks are retained. Canonical metric dimensions for Gander remain unknown.',
  'Canvas clips can antialias shared seams. Native pixel-center coverage is exact; exact assembled RGBA is measured separately rather than asserted.'
 ]);
 function binding(channel,factor=1,cosmetic=false){return [{channel,factor,...(cosmetic?{cosmetic:true}:{})}];}
 function apply(catalog){
  if(catalog?.schema!=='cqc.machine-parts/1'||!Array.isArray(catalog.machines))throw Error('Gander source catalogue unavailable');
  const adapted=clone(catalog),machine=adapted.machines.find(m=>m.id===ID),changes=[];
  if(!machine||machine.pass30GanderFidelity)return {catalog:adapted,changes,limits:LIMITS.slice()};
  if(machine.pass29ClassicArticulation!==true)throw Error('Gander fidelity must follow the admitted Pass29 classic articulation');
  const oldIDs=machine.parts.map(p=>p.id),oldSources=clone(machine.sources);
  if(oldIDs.length!==25||oldIDs.some(id=>!SOCKETS[id]))throw Error('Gander admitted identities changed');
  for(const source of SOURCES){if(machine.sources.some(s=>s.id===source.id))throw Error('Gander source already allocated');machine.sources.push(clone(source));}
  for(const side of ['near','far'])machine.parts.push({id:side+'_knee_bearing',z:side==='near'?56.01:16.01});
  for(const part of machine.parts){
   const socket=SOCKETS[part.id],parentID=PARENTS[part.id],parent=parentID?SOCKETS[parentID]:SOCKETS.anchor;
   part.source='gander_pass30';part.rect=[0,0,1536,1024];part.pivot=socket.slice();part.imageScale=K;part.rotation=0;part.textureRotation=0;
   part.offset=parentID?[(socket[0]-parent[0])*K,(parent[1]-socket[1])*K]:[0,0];
   if(parentID)part.parent=parentID;else delete part.parent;
   delete part.scale;delete part.showWhen;delete part.hideWhen;delete part.detachment;delete part.sourceClipPolygonNativeXY;
   part.channels={};part.variants=[];
   if(REGIONS[part.id]){part.sourceClipPolygonNativeXY=clone(REGIONS[part.id]);part.opacity=1;}
   else {part.rect=[0,0,1,1];part.pivot=[0,0];part.imageScale=1;part.opacity=0;}
   // Invisible compatibility anchors must not hide their genuinely visible children.
   if(!REGIONS[part.id])part.opacity=1;
  }
  const find=id=>machine.parts.find(p=>p.id===id);
  find('anchor').channels={y:binding('ganderCollapseDrop')};find('body_anchor').channels={y:[...binding('ganderFold',-85),...binding('pass32GanderBraceSeat',-1)]};
  for(const side of ['near','far']){
   const title=side[0].toUpperCase()+side.slice(1);
   find(side+'_thigh').channels={rotation:binding('gander'+title+'Upper')};
   find(side+'_shin').channels={rotation:binding('gander'+title+'Lower')};
   find(side+'_foot').channels={rotation:binding('gander'+title+'FootLevel')};
   find(side+'_knee_bearing').channels={rotation:binding('gander'+title+'Lower',.5)};
   find(side+'_rail').channels={rotation:binding('pass32Gander'+title+'RailAim')};
   find(side+'_rail_barrel').channels={x:binding('pass32Gander'+title+'RailRecoilX'),y:binding('pass32Gander'+title+'RailRecoilY')};
   find(side+'_front_turret').channels={rotation:binding('pass30GanderTurretAim')};
  }
  const lower=find('jaw_lower_plate');lower.channels={rotation:binding('pass30GanderFaceplateHinge')};
  lower.variants=[{when:'ganderMouthOpen',source:'gander_pass30_open',rect:lower.rect.slice(),pivot:lower.pivot.slice(),imageScale:K,sourceClipPolygonNativeXY:clone(lower.sourceClipPolygonNativeXY)}];
  machine.pass30GanderFidelity=true;
  machine.documentaryQualifications=(machine.documentaryQualifications||[]).filter(v=>!v.includes('Reconstructed frontal perspective'));
  machine.documentaryQualifications.push(...LIMITS);
  if(oldIDs.join('|')!==machine.parts.slice(0,oldIDs.length).map(p=>p.id).join('|')||JSON.stringify(machine.sources.slice(0,oldSources.length))!==JSON.stringify(oldSources))throw Error('Gander original identities/sources changed');
  root.CQC_MACHINE_PARTS?.normalizeCatalog(adapted);
  changes.push({id:ID,beforeParts:oldIDs.length,afterParts:machine.parts.length,preservedPartIDs:oldIDs,originalSources:oldSources,newSources:clone(SOURCES),
   sourceCamera:'official Konami Ghost Babel three-quarter concept, preserved as one coherent generated reconstruction',visibleRegions:23,sourceUniformScale:K,
   sourcePixelsRewritten:false,newSourceArt:true,simulationMutation:false,absolute1to1Certified:false});
  return {catalog:adapted,changes,limits:LIMITS.slice()};
 }
 function solve(first,second,dx,lift){
  if(Math.abs(dx)+Math.abs(lift)<1e-10)return {upper:0,lower:0,foot:0,dx:0,lift:0};
  const a=Math.hypot(...first),b=Math.hypot(...second),target=[first[0]+second[0]+dx,first[1]+second[1]+lift];
  // Preserve the requested sole height, restricting horizontal stride at full extension.
  const max=a+b-1e-8,maxX=Math.sqrt(Math.max(0,max*max-target[1]*target[1]));target[0]=clamp(target[0],-maxX,maxX);
  const distance=Math.max(1e-8,Math.hypot(...target)),direction=Math.atan2(target[1],target[0]);
  const spread=Math.acos(clamp((a*a+distance*distance-b*b)/(2*a*distance),-1,1));
  const norm=v=>((v+180)%360+360)%360-180;
  const candidates=[direction+spread,direction-spread].map(angle=>{
   const secondAngle=Math.atan2(target[1]-a*Math.sin(angle),target[0]-a*Math.cos(angle));
   const upper=norm(angle/DEG-Math.atan2(first[1],first[0])/DEG),lower=norm(secondAngle/DEG-Math.atan2(second[1],second[0])/DEG-upper);
   return {upper,lower,foot:-upper-lower,dx:target[0]-first[0]-second[0],lift};
  });
  candidates.sort((l,r)=>Math.abs(l.upper)+Math.abs(l.lower)-Math.abs(r.upper)-Math.abs(r.lower));return candidates[0];
 }
 const LEGS=Object.freeze({near:[[-38.4,-77.6],[-24.4,-121.6]],far:[[8,-92.8],[-2.4,-104]]});
 function presentationPose(id,pose){
  if(id!==ID||!pose)return pose;
  const result={...pose,channels:{...(pose.channels||{})},flags:{...(pose.flags||{})}},c=result.channels;
  const action=typeof pose.action==='string'?pose.action:'',moveSlot=typeof pose.moveSlot==='string'?pose.moveSlot:'';
  const defeated=pose.defeated===true||pose.ko===true||/^(dead|ko)$/.test(action);
  const activeAttack=pose.attacking===true||pose.attack===true||(pose.animationActive===true&&moveSlot.length>0)
   ||/shoot|attack|heavy|light|special|super|slash|shock/.test(action);
  const fold=clamp(finite(c.ganderFold)?c.ganderFold:0,0,1),moving=!defeated&&!activeAttack&&(pose.walk===true||/walk|run|dash/.test(action));
  if(defeated)result.defeated=true;
  const firing=!pose.motionEvent || ['beam','rail','gun','volley','shot','gatling','cannon','fire'].includes(pose.motionEvent.kind);
  const impulse=defeated||!firing?0:clamp(finite(c.weaponRecoilImpulse)?c.weaponRecoilImpulse:-(finite(c.weaponRecoil)?c.weaponRecoil:finite(c.classicGanderRailRecoil)?c.classicGanderRailRecoil:0)/7,0,1);
  const seat=defeated?0:clamp(finite(c.weaponBrace)?c.weaponBrace:0,0,1)*1.2+impulse*.75;
  c.pass32GanderBraceSeat=seat;
  for(const side of ['near','far']){
   const title=side[0].toUpperCase()+side.slice(1),explicit=c['gander'+title+'Lift'];
   const lift=(defeated?0:clamp(finite(explicit)?explicit:finite(c[side+'Lift'])?c[side+'Lift']:0,0,75))+85*fold+seat;
   const dx=moving?clamp(finite(c[side+'Swing'])?c[side+'Swing']*.3:0,-4,4):0;
   const joint=solve(LEGS[side][0],LEGS[side][1],dx,lift);
   c['gander'+title+'Upper']=joint.upper;c['gander'+title+'Lower']=joint.lower;c['gander'+title+'FootLevel']=joint.foot;
  }
  c.pass30GanderRailRecoil=defeated?0:-7*impulse;
  c.pass30GanderRailAim=defeated?0:finite(c.weaponAimDegrees)?-clamp(c.weaponAimDegrees,-22,22):clamp(finite(c.weaponAim)?c.weaponAim:0,-6,6);
  for(const side of ['near','far']){
   const title=side[0].toUpperCase()+side.slice(1),key='weaponAimDegrees'+title;
   c['pass32Gander'+title+'RailAim']=defeated?0:finite(c[key])?-clamp(c[key],-22,22):c.pass30GanderRailAim;
   const axis=side==='near'?[510,-7]:[510,-1],length=Math.hypot(...axis),recoil=c.pass30GanderRailRecoil*.45;
   c['pass32Gander'+title+'RailRecoilX']=recoil*axis[0]/length;
   c['pass32Gander'+title+'RailRecoilY']=-recoil*axis[1]/length;
  }
  c.pass30GanderTurretAim=clamp(finite(c.weaponAim)?c.weaponAim:0,-3,3);
  c.pass30GanderFaceplateHinge=result.flags.ganderMouthOpen===true?0:-clamp(finite(c.jawOpen)?c.jawOpen:0,0,1)*2;
  return result;
 }
 const nearAxis=Object.freeze({part:'near_rail_barrel',jointPart:'near_rail',baseNativeXY:Object.freeze([975,181]),tipNativeXY:Object.freeze([1485,174]),
   channel:'weaponAimDegreesNear',minDegrees:-22,maxDegrees:22}),
  farAxis=Object.freeze({part:'far_rail_barrel',jointPart:'far_rail',baseNativeXY:Object.freeze([975,136]),tipNativeXY:Object.freeze([1485,135]),
   channel:'weaponAimDegreesFar',minDegrees:-22,maxDegrees:22});
 const aimAxes=Object.freeze({[ID]:Object.freeze({byAttackKind:Object.freeze({beam:nearAxis,rail:nearAxis,cannon:nearAxis,volley:nearAxis,shot:nearAxis}),
   bySourceIndex:Object.freeze({2:nearAxis,3:farAxis})})});
 const sourcePoints=Object.freeze({gander_ghost_gbc2000:{ballistic:{part:'near_rail_barrel',nativeXY:[1485,174],kind:'native near rail tip'},
  ballisticFar:{part:'far_rail_barrel',nativeXY:[1485,135],kind:'native far rail tip'}}});
 const weaponPoints=Object.freeze({gander:{part:'near_rail_barrel',sourceNativeXY:[1485,174]}});
 root.CQC_PASS30_GANDER_FIDELITY=Object.freeze({apply,presentationPose,sourcePoints,weaponPoints,aimAxes,ids:Object.freeze([ID]),limits:LIMITS,
  audit:Object.freeze({schema:'cqc.pass30.gander-source-fidelity/1',newSourceArt:true,originalSourcePixelsChanged:false,simulationMutation:false,absolute1to1Certified:false}),
  geometry:Object.freeze({sockets:SOCKETS,legVectors:LEGS,sourceUniformScale:K,visibleRegions:REGIONS})});
})(globalThis);
