/* Peace Walker's upright first battle: independent source and encounter.
 * Original quadrupedal source, saves, HP pools and routes remain intact.
 * Source-led authored 2D motion and CQC encounter; no original animation extraction.
 */
(function(root){'use strict';
 const ID='peacewalker_biped_pw_psp2010',ENCOUNTER='peacewalker_biped',K=.4,DEG=Math.PI/180;
 const clone=v=>JSON.parse(JSON.stringify(v)),finite=v=>typeof v==='number'&&Number.isFinite(v),clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
 const SOURCE={"id":"pw_biped_pass31","file":"assets/machines-pass31/peacewalker/peace-walker-biped-first-battle.png","bytes":1895225,"sha256":"0a57aec4e04411ad7e619f03af9e32bb916fe5aa2c0243dc3cec006af99b2c47","width":1536,"height":1024};
 const REGIONS={"near_foot":[[775.1234567,965.2345678],[0.1234567,965.2345678],[0.1234567,1024.0],[775.1234567,1024.0]],"far_foot":[[1182.1234567,962.2345678],[1158.1234567,887.2345678],[1077.1234567,857.2345678],[988.1234567,874.2345678],[988.1234567,958.2345678],[775.1234567,958.2345678],[775.1234567,965.2345678],[775.1234567,1024.0],[1182.1234567,1024.0]],"near_knee_bearing":[[487.3397507,662.28172976],[485.04204099,656.7345678],[481.38691267,651.97111183],[476.6234567,648.31598351],[471.07629474,646.0182738],[465.1234567,645.2345678],[459.17061866,646.0182738],[453.6234567,648.31598351],[448.86000073,651.97111183],[445.20487241,656.7345678],[442.9071627,662.28172976],[442.1234567,668.2345678],[442.9071627,674.18740584],[445.20487241,679.7345678],[448.86000073,684.49802377],[453.6234567,688.15315209],[459.17061866,690.4508618],[465.1234567,691.2345678],[471.07629474,690.4508618],[476.6234567,688.15315209],[481.38691267,684.49802377],[485.04204099,679.7345678],[487.3397507,674.18740584],[488.1234567,668.2345678]],"far_knee_bearing":[[950.30567653,792.02291072],[947.90806639,786.2345678],[944.09401945,781.26400505],[939.1234567,777.44995811],[933.33511378,775.05234797],[927.1234567,774.2345678],[920.91179962,775.05234797],[915.1234567,777.44995811],[910.15289395,781.26400505],[906.33884701,786.2345678],[903.94123687,792.02291072],[903.1234567,798.2345678],[903.94123687,804.44622488],[906.33884701,810.2345678],[910.15289395,815.20513055],[915.1234567,819.01917749],[920.91179962,821.41678763],[927.1234567,822.2345678],[933.33511378,821.41678763],[939.1234567,819.01917749],[944.09401945,815.20513055],[947.90806639,810.2345678],[950.30567653,804.44622488],[951.1234567,798.2345678]],"near_shin":[[430.1234567,668.2345678],[0.1234567,668.2345678],[0.1234567,965.2345678],[558.1234567,965.2345678],[552.1234567,763.2345678],[526.1234567,696.2345678],[482.20929726,683.4262713],[481.38691267,684.49802377],[476.6234567,688.15315209],[471.07629474,690.4508618],[465.1234567,691.2345678],[459.17061866,690.4508618],[453.6234567,688.15315209],[448.86000073,684.49802377],[445.20487241,679.7345678],[442.9071627,674.18740584],[442.60264045,671.87432973]],"far_shin_0":[[978.1234567,753.2345678],[927.1234567,755.2345678],[775.1234567,798.2345678],[775.1234567,798.3580245],[903.13971008,798.3580245],[903.1234567,798.2345678],[903.94123687,792.02291072],[906.33884701,786.2345678],[910.15289395,781.26400505],[915.1234567,777.44995811],[920.91179962,775.05234797],[927.1234567,774.2345678],[933.33511378,775.05234797],[939.1234567,777.44995811],[944.09401945,781.26400505],[947.90806639,786.2345678],[950.30567653,792.02291072],[951.1234567,798.2345678],[951.10720332,798.3580245],[1536.0,798.3580245],[1536.0,798.2345678],[995.1234567,798.2345678]],"far_shin_1":[[775.1234567,958.2345678],[988.1234567,958.2345678],[988.1234567,874.2345678],[1077.1234567,857.2345678],[1158.1234567,887.2345678],[1182.1234567,962.2345678],[1182.1234567,1024.0],[1536.0,1024.0],[1536.0,798.3580245],[951.10720332,798.3580245],[950.30567653,804.44622488],[947.90806639,810.2345678],[944.09401945,815.20513055],[939.1234567,819.01917749],[933.33511378,821.41678763],[927.1234567,822.2345678],[920.91179962,821.41678763],[915.1234567,819.01917749],[910.15289395,815.20513055],[906.33884701,810.2345678],[903.94123687,804.44622488],[903.13971008,798.3580245],[775.1234567,798.3580245]],"ai_pod":[[305.1234567,492.2345678],[331.1234567,515.2345678],[489.1234567,509.2345678],[492.1234567,424.2345678],[305.1234567,427.2345678]],"near_launch_container":[[0.1234567,278.2345678],[373.1234567,278.2345678],[500.1234567,309.2345678],[753.1234567,247.2345678],[842.1234567,215.2345678],[863.1234567,0.2345678],[0.1234567,0.2345678]],"far_launch_container":[[967.1234567,265.2345678],[1064.1234567,285.2345678],[1118.1234567,343.2345678],[1464.1234567,232.2345678],[1480.1234567,151.2345678],[1370.1234567,30.2345678],[1040.1234567,93.2345678],[844.53478509,190.54715811],[843.8175228,197.89055775]],"sensor_sphere":[[502.1234567,419.2345678],[508.82705382,307.10167048],[500.1234567,309.2345678],[373.1234567,278.2345678],[0.1234567,278.2345678],[0.1234567,440.2345678],[305.1234567,442.0774681],[305.1234567,427.2345678],[492.1234567,424.2345678],[492.1034567,424.80123447]],"aft_flame_barrel":[[648.1234567,634.2345678],[666.1234567,634.2345678],[710.1234567,619.2345678],[709.1234567,579.2345678],[648.1234567,592.2345678]],"fore_flame_barrel":[[728.1234567,621.2345678],[738.1234567,644.2345678],[770.1234567,644.2345678],[770.1234567,605.2345678],[732.1234567,594.2345678]],"flamethrower_mount_0":[[776.1234567,570.2345678],[645.1234567,570.2345678],[645.1234567,606.8580245],[648.1234567,606.8580245],[648.1234567,592.2345678],[709.1234567,579.2345678],[709.81404312,606.8580245],[730.25331497,606.8580245],[732.1234567,594.2345678],[770.1234567,605.2345678],[770.1234567,606.8580245],[776.1234567,606.8580245]],"flamethrower_mount_1":[[776.1234567,645.2345678],[776.1234567,606.8580245],[770.1234567,606.8580245],[770.1234567,644.2345678],[738.1234567,644.2345678],[728.1234567,621.2345678],[730.25331497,606.8580245],[709.81404312,606.8580245],[710.1234567,619.2345678],[666.1234567,634.2345678],[648.1234567,634.2345678],[648.1234567,606.8580245],[645.1234567,606.8580245],[645.1234567,645.2345678]],"near_thigh":[[630.1234567,463.2345678],[502.54383887,412.20272067],[502.1234567,419.2345678],[492.1034567,424.80123447],[489.1234567,509.2345678],[442.56494233,511.00261265],[463.1234567,555.2345678],[417.1234567,663.2345678],[422.51819354,668.2345678],[430.1234567,668.2345678],[442.60264045,671.87432973],[442.1234567,668.2345678],[442.9071627,662.28172976],[445.20487241,656.7345678],[448.86000073,651.97111183],[453.6234567,648.31598351],[459.17061866,646.0182738],[465.1234567,645.2345678],[471.07629474,646.0182738],[476.6234567,648.31598351],[481.38691267,651.97111183],[485.04204099,656.7345678],[487.3397507,662.28172976],[488.1234567,668.2345678],[487.3397507,674.18740584],[485.04204099,679.7345678],[482.20929726,683.4262713],[526.1234567,696.2345678],[527.52886211,699.85618942],[565.1234567,636.2345678],[645.1234567,575.76945152],[645.1234567,570.2345678],[650.92901226,570.2345678]],"far_thigh":[[1065.1234567,691.2345678],[980.1234567,561.2345678],[792.1234567,507.2345678],[775.1234567,677.2345678],[819.83937217,785.58467066],[927.1234567,755.2345678],[978.1234567,753.2345678]],"folded_front_near":[[808.1234567,487.2345678],[866.1234567,457.2345678],[893.1234567,257.2345678],[647.70679003,273.06790113],[552.65451949,296.36134293],[556.1234567,408.2345678],[603.55719164,452.60806178],[630.1234567,463.2345678],[630.98316087,467.65590352]],"folded_front_far":[[976.1234567,331.2345678],[951.1234567,484.2345678],[1022.1234567,508.2345678],[1093.1234567,548.2345678],[1191.1234567,474.2345678],[1184.1234567,331.2345678],[1155.52886211,331.2345678],[1118.1234567,343.2345678],[1106.95104291,331.2345678]],"hull_panel_00":[[775.1234567,958.2345678],[775.1234567,798.2345678],[819.83937217,785.58467066],[775.1234567,677.2345678],[792.1234567,507.2345678],[980.1234567,561.2345678],[1065.1234567,691.2345678],[978.1234567,753.2345678],[995.1234567,798.2345678],[1536.0,798.2345678],[1536.0,0.0],[0.0,0.0],[0.0,1024.0],[0.1234567,1024.0],[0.1234567,965.2345678],[0.1234567,668.2345678],[422.51819354,668.2345678],[417.1234567,663.2345678],[463.1234567,555.2345678],[442.56494233,511.00261265],[331.1234567,515.2345678],[305.1234567,492.2345678],[305.1234567,442.0774681],[0.1234567,440.2345678],[0.1234567,278.2345678],[0.1234567,235.2345678],[0.1234567,0.2345678],[863.1234567,0.2345678],[844.53478509,190.54715811],[1040.1234567,93.2345678],[1370.1234567,30.2345678],[1480.1234567,151.2345678],[1464.1234567,232.2345678],[1155.52886211,331.2345678],[1184.1234567,331.2345678],[1191.1234567,474.2345678],[1093.1234567,548.2345678],[1022.1234567,508.2345678],[951.1234567,484.2345678],[976.1234567,331.2345678],[1106.95104291,331.2345678],[1064.1234567,285.2345678],[967.1234567,265.2345678],[843.8175228,197.89055775],[842.1234567,215.2345678],[753.1234567,247.2345678],[647.70679003,273.06790113],[893.1234567,257.2345678],[866.1234567,457.2345678],[808.1234567,487.2345678],[630.98316087,467.65590352],[650.92901226,570.2345678],[776.1234567,570.2345678],[776.1234567,645.2345678],[645.1234567,645.2345678],[645.1234567,575.76945152],[565.1234567,636.2345678],[527.52886211,699.85618942],[552.1234567,763.2345678],[558.1234567,965.2345678],[775.1234567,965.2345678]],"hull_panel_01":[[502.54383887,412.20272067],[603.55719164,452.60806178],[556.1234567,408.2345678],[552.65451949,296.36134293],[508.82705382,307.10167048]]},PARENTS={"near_foot":"near_shin","far_foot":"far_shin","near_knee_bearing":"near_thigh","far_knee_bearing":"far_thigh","near_shin":"near_thigh","far_shin_0":"far_thigh","far_shin_1":"far_thigh","ai_pod":"hull_anchor","near_launch_container":"hull_anchor","far_launch_container":"hull_anchor","sensor_sphere":"hull_anchor","aft_flame_barrel":"flamethrower_mount","fore_flame_barrel":"flamethrower_mount","flamethrower_mount_0":"hull_anchor","flamethrower_mount_1":"hull_anchor","near_thigh":"hull_anchor","far_thigh":"hull_anchor","folded_front_near":"hull_anchor","folded_front_far":"hull_anchor","hull_panel_00":"hull_anchor","hull_panel_01":"hull_anchor"},SOCKETS={"near_foot":[435,962],"far_foot":[1040,911],"near_knee_bearing":[465,668],"far_knee_bearing":[927,798],"near_shin":[465,668],"far_shin_0":[927,798],"far_shin_1":[927,798],"ai_pod":[420,467],"near_launch_container":[612,236],"far_launch_container":[1110,282],"sensor_sphere":[436,389],"aft_flame_barrel":[706,601],"fore_flame_barrel":[733,607],"flamethrower_mount_0":[723,590],"flamethrower_mount_1":[723,590],"near_thigh":[505,450],"far_thigh":[812,555],"folded_front_near":[741,333],"folded_front_far":[1074,392],"hull_panel_00":[760,450],"hull_panel_01":[760,450]};
 const ANCHORS={machine_anchor:[760,1007],hull_anchor:[760,450],far_shin:[927,798],flamethrower_mount:[723,590]};
 const ALL={...ANCHORS,...SOCKETS},PARENT={hull_anchor:'machine_anchor',far_shin:'far_thigh',flamethrower_mount:'hull_anchor',...PARENTS};
 const limits=Object.freeze([
  'The upright biped is a separate first-battle dossier, not a transformation during the final quadrupedal nuclear launch.',
  'Reference-led generated RGBA reconstruction from original concept/CG and licensed model views; no extracted model or absolute1:1 certification.',
  'Visible sphere is labelled CAPTEUR and visible cylinder POD IA. Exact Reptile/Mammal allocation of the visible cylinder is not asserted from this camera.',
  'One coherent three-quarter source camera; rear placement and hidden joint seams are interpreted. Independent reverse camera remains absent.',
  'The 25m bipedal height is a secondary citation. Source perspective, tiny details and human-scale projection remain best-effort adaptations.',
  'Native source pixel centers are partitioned without loss/duplication. Canvas anti-aliasing on animated clipping boundaries is measured independently.',
  'Only native aft flamethrower and planted support stomp are admitted to this encounter. Precise S-mine/missile launch ports and howl remain to implement with source references.',
  'First-battle pursuit into quadrupedal form, Coldman helicopter and the full original mission geography/cinematic remain pending. No fabricated transition is triggered.',
  'Folded front limbs remain rigid source-visible assemblies; their concealed linkage surfaces are not separately reconstructed.',
  'Small hidden-joint seam wedges remain interpreted in bent support poses; no volumetric continuity of concealed surfaces is certified.',
  'Knee disable and supported crouch are authored CQC presentation responses. No unsupported limb dismemberment or new biological AI claim is introduced.'
 ]);
 const binding=(channel,factor=1)=>[{channel,factor}];
 function makeMachine(){
  const nodes=[...Object.keys(ANCHORS),...Object.keys(REGIONS)],parts=[];
  for(const id of nodes){
   const socket=ALL[id],parent=PARENT[id],parentSocket=parent?ALL[parent]:ANCHORS.machine_anchor;
   if(!socket||parent&&!parentSocket)throw Error('PW biped native attachment absent: '+id);
   const part={id,source:SOURCE.id,rect:REGIONS[id]?[0,0,1536,1024]:[0,0,1,1],pivot:REGIONS[id]?socket.slice():[0,0],
    imageScale:REGIONS[id]?K:1,offset:parent?[(socket[0]-parentSocket[0])*K,(parentSocket[1]-socket[1])*K]:[0,0],
    z:!REGIONS[id]?0:id.startsWith('far_')?15:id==='folded_front_near'?45:id.startsWith('near_')?40:30,channels:{}};
   if(parent)part.parent=parent;
   if(REGIONS[id])part.sourceClipPolygonNativeXY=clone(REGIONS[id]);
   parts.push(part);
  }
  const part=id=>parts.find(p=>p.id===id);
  part('hull_anchor').channels={x:binding('pw31BodyShift'),y:binding('pw31BodyLift')};
  part('near_thigh').channels={rotation:binding('pw31NearUpper')};
  part('near_shin').channels={rotation:binding('pw31NearLower')};
  part('near_foot').channels={rotation:binding('pw31NearFootLevel')};
  part('near_knee_bearing').channels={rotation:binding('pw31NearLower',.5)};
  part('far_thigh').channels={rotation:binding('pw31FarUpper')};
  part('far_shin').channels={rotation:binding('pw31FarLower')};
  part('far_foot').channels={rotation:binding('pw31FarFootLevel')};
  part('far_knee_bearing').channels={rotation:binding('pw31FarLower',.5)};
  part('aft_flame_barrel').channels={rotation:binding('pw31AftFlameAim')};
  return {id:ID,edition:'Peace Walker — first battle upright biped, original PSP2010 / authored2D',origin:[0,0],scale:[1,1],
   sources:[clone(SOURCE)],parts,presentationKind:'heavy_biped',sourceQualification:limits[1],
   documentaryQualifications:limits.slice(),pass31PeaceWalkerBiped:{version:2,encounter:ENCOUNTER,sourceCamera:'native three-quarter view, orange forebody right and sphere/pod aft left',
    sourcePixelCenters:480537,nativeCoverageLoss:0,nativeCoverageDuplication:0,visibleRegions:Object.keys(REGIONS).length,compatibilityAnchors:Object.keys(ANCHORS).length,
    reusedQuadrupedalSource:false,authoredTransition:false,absolute1to1Certified:false}};
 }
 function apply(catalog){
  if(catalog?.schema!=='cqc.machine-parts/1'||!Array.isArray(catalog.machines))throw Error('PW biped source catalogue unavailable');
  const next=clone(catalog),present=next.machines.find(m=>m.id===ID);
  if(present&&!present.pass31PeaceWalkerBiped)throw Error('PW biped ID belongs to unreviewed source');
  if(!present)next.machines.push(makeMachine());
  else if(present.pass31PeaceWalkerBiped.version<2)next.machines[next.machines.indexOf(present)]=makeMachine();
  root.CQC_MACHINE_PARTS?.normalizeCatalog(next);
  return {catalog:next,changes:present?[]:[{id:ID,kind:'separate-first-battle-biped',parts:makeMachine().parts.length,originalRigIDsRetained:true,
   sourcePixelsChanged:false,newSourceArt:true,newEncounter:true,simulationMutation:false,absolute1to1Certified:false}],limits:limits.slice()};
 }
 function solve(first,second,dx,lift){
  if(Math.abs(dx)+Math.abs(lift)<1e-9)return {upper:0,lower:0,foot:0,target:[first[0]+second[0],first[1]+second[1]]};
  const a=Math.hypot(...first),b=Math.hypot(...second),target=[first[0]+second[0]+dx,first[1]+second[1]+lift],max=a+b-1e-8;
  const maxX=Math.sqrt(Math.max(0,max*max-target[1]*target[1]));target[0]=clamp(target[0],-maxX,maxX);
  const d=Math.max(1e-8,Math.hypot(...target)),direction=Math.atan2(target[1],target[0]),spread=Math.acos(clamp((a*a+d*d-b*b)/(2*a*d),-1,1));
  const norm=v=>((v+180)%360+360)%360-180;
  const rows=[direction+spread,direction-spread].map(angle=>{const secondAngle=Math.atan2(target[1]-a*Math.sin(angle),target[0]-a*Math.cos(angle));
   const upper=norm(angle/DEG-Math.atan2(first[1],first[0])/DEG),lower=norm(secondAngle/DEG-Math.atan2(second[1],second[0])/DEG-upper);
   return {upper,lower,foot:-upper-lower,target:target.slice()};});
  rows.sort((l,r)=>Math.abs(l.upper)+Math.abs(l.lower)-Math.abs(r.upper)-Math.abs(r.lower));return rows[0];
 }
 const LEGS=Object.freeze({Near:[[-16,-87.2],[-12,-117.6]],Far:[[46,-97.2],[45.2,-45.2]]});
 const smooth=q=>{q=clamp(q,0,1);return q*q*(3-2*q);};
 function eventPhase(event){
  const age=Math.max(0,event.age||0),warn=Math.max(1,event.warn||1),active=Math.max(1,event.active||1),recovery=Math.max(1,event.recovery||18);
  const firing=age>=warn&&age<warn+active,after=clamp((age-warn-active)/recovery,0,1);
  return {charge:age<warn?smooth(age/warn):firing?1:1-smooth(after),
   impulse:age>=warn?Math.sin(Math.min(1,(age-warn)/2)*Math.PI/2)*Math.exp(-(age-warn)/7):0,
   release:age<warn?1:1-smooth(clamp((age-warn)/Math.min(18,active),0,1)),firing};
 }
 // 66% support leaves both soles on the floor during a third of the cycle.
 // Feet slide backwards relative to a moving chassis, then lift only on swing.
 function gait(frame,side){
  const q=((frame/128+(side==='Far'?.5:0))%1+1)%1,support=.66;
  if(q<support)return {dx:3.5-7*q/support,lift:0,support:true};
  const swing=(q-support)/(1-support);
  return {dx:-3.5+7*smooth(swing),lift:Math.sin(swing*Math.PI)**2*10,support:false};
 }
 function presentationPose(id,pose,state=null){
  if(id!==ID||!pose||typeof pose!=='object')return pose;
  const result={...pose,channels:{...(pose.channels||{})},flags:{...(pose.flags||{})}},c=result.channels,t=finite(pose.frame)?pose.frame:0;
  const flags=result.flags,defeated=pose.defeated===true||pose.ko===true;
  const events=(state?.events||[]).filter(e=>e.age<e.warn+e.active+(e.recovery||18)&&(!e.sources||e.sources.every(index=>flags['part'+index+'Destroyed']!==true)));
  const stomp=events.find(e=>e.kind==='stomp'&&e.sources?.some(index=>flags['part'+index+'Destroyed']!==true));
  const flame=events.find(e=>e.kind==='flame'),stompPhase=stomp?eventPhase(stomp):null,flamePhase=flame?eventPhase(flame):null;
  const disabled=flags.part0Destroyed||flags.part1Destroyed||defeated;
  const damageAge=Math.max(finite(c.destroy0Frames)?c.destroy0Frames:0,finite(c.destroy1Frames)?c.destroy1Frames:0);
  const damageTimed=finite(c.destroy0Frames)||finite(c.destroy1Frames),damageProgress=defeated?1:damageTimed?smooth(damageAge/20):1;
  const damagedDrop=disabled?-12*damageProgress:0;
  const walk=!defeated&&!disabled&&(/walk|run|dash/.test(pose.action||'')||pose.walk===true)&&!pose.reducedMotion&&!stomp&&!flame;
  const weightShift=stomp&&!disabled?(stomp.sources.includes(0)?2.4:-2.4)*stompPhase.charge:0;
  // Body compression is solved back through both support chains. It never lifts
  // the stationary sole or changes the far-foot depth of the native camera.
  const bodyLift=damagedDrop+(stompPhase?-1.8*stompPhase.charge-2.2*stompPhase.impulse:0)
   +(flamePhase?-1.15*flamePhase.charge-.65*flamePhase.impulse:0)+(walk?-.9*Math.sin(t*Math.PI/64)**2:0);
  const damageShift=((flags.part0Destroyed?1.6:0)-(flags.part1Destroyed?1.6:0))*damageProgress;
  const bodyShift=weightShift+(flamePhase?.impulse||0)*.75+damageShift;
  c.pw31BodyLift=bodyLift;c.pw31BodyShift=bodyShift;
  for(const [side,leg]of Object.entries(LEGS)){
   const index=side==='Near'?0:1,legDisabled=flags['part'+index+'Destroyed']===true||defeated;
   const moving=walk?gait(t,side):{dx:0,lift:0,support:true};
   let lift=moving.lift;
   if(stomp&&!legDisabled&&stomp.sources.includes(index)&&stomp.age<stomp.warn){
    const q=clamp(stomp.age/Math.max(1,stomp.warn),0,1);
    // Load the other sole, raise, then accelerate the foot into the actual
    // danger-frame contact. No sinusoidal second lift during active damage.
    lift=12*smooth(q/.68)*(1-smooth((q-.72)/.28));
   }
   const solved=solve(leg[0],leg[1],moving.dx-bodyShift,lift-bodyLift);
   c['pw31'+side+'Upper']=solved.upper;c['pw31'+side+'Lower']=solved.lower;c['pw31'+side+'FootLevel']=solved.foot;
  }
  const nativeAngle=Math.atan2(615-601,671-706);
  const desired=flame?(finite(pose.machineAim?.angle)?pose.machineAim.angle:finite(flame.aimAngle)?flame.aimAngle:flame.from?Math.atan2(flame.y-flame.from.y,flame.x-flame.from.x):nativeAngle):nativeAngle;
  const aim=clamp(-(desired-nativeAngle)/DEG,-8,65);
  // The lock is a world direction. During windup only the servo approaches it;
  // active fire holds it exactly; recovery returns smoothly to the source pose.
  c.pw31AftFlameAim=flame?aim*(flame.age<flame.warn?smooth(flame.age/Math.max(1,flame.warn)*1.6):flamePhase.charge):0;
  return result;
 }
 const aimAxes=Object.freeze({[ID]:{flame:{part:'aft_flame_barrel',baseNativeXY:[706,601],tipNativeXY:[671,615],minDegrees:-8,maxDegrees:65,channel:'pw31AftFlameAim'}}});
 const targetParts=Object.freeze({[ENCOUNTER]:[{part:'near_knee_bearing',point:[465,668]},{part:'far_knee_bearing',point:[927,798]},{part:'ai_pod',point:[405,464]}]});
 const weaponPoints=Object.freeze({[ENCOUNTER]:{part:'aft_flame_barrel',point:[671,615],byAttackKind:{
  flame:{part:'aft_flame_barrel',point:[671,615]},stomp:{part:'near_foot',point:[451,1006]}}}});
 const sourcePoints=Object.freeze({[ID]:{aftFlame:{part:'aft_flame_barrel',nativeXY:[671,615]},nearSole:{part:'near_foot',nativeXY:[451,1006]},
  aiPodContact:{part:'ai_pod',nativeXY:[405,464]},nearKnee:{part:'near_knee_bearing',nativeXY:[465,668]},farKnee:{part:'far_knee_bearing',nativeXY:[927,798]}}});
 const arsenalMappings=Object.freeze({[ENCOUNTER]:ID}),stateMappings=Object.freeze({[ID]:{kind:'heavy_biped',displayHeight:555,nativeSourceCameraFacing:'right',damageTargets:{0:'near_knee_bearing',1:'far_knee_bearing',2:'ai_pod'}}});
 const dimensions=Object.freeze({[ID]:{heightM:25,configuration:'bipedal',evidence:'secondary citation; exact original metric projection not independently measured',url:'https://metalgear.fandom.com/wiki/Peace_Walker_(Basilisk)',absolute1to1Certified:false}});
 root.CQC_PASS31_PW_BIPED=Object.freeze({version:2,id:ID,encounter:ENCOUNTER,apply,presentationPose,solve,gait,eventPhase,aimAxes,sourcePoints,targetParts,weaponPoints,
  arsenalMappings,stateMappings,dimensions,limits,source:clone(SOURCE),nativeSockets:clone(ALL),nativeParents:clone(PARENT)});
})(globalThis);
