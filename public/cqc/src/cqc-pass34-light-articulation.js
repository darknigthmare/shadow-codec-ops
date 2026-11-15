/* Native light-machine articulation: fixed bearings, rigid links and source-native bores.
 * Original PNG bytes, opposite native cameras, health and engine clocks stay authoritative.
 */
(function(root){'use strict';
 const clone=v=>JSON.parse(JSON.stringify(v)),DEG=Math.PI/180,finite=Number.isFinite,
 clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),value=v=>finite(v)?v:0,wrap=v=>((v+180)%360+360)%360-180,
 mod=(v,n)=>(v%n+n)%n;
 const ids=Object.freeze(['gekko_mgs4_ps3_2008','gekko_mgs4_right','dwalker_mgsv2015','dwalker_mgsv_right','walker_gear_mgsv2015','walker_gear_mgsv_right','battle_gear_mgsv2015','pass19__gekko_suicide_mgs4','pass19__gekko_missile_mgs4','pass19__gekko_mgr','pass19__gekko_suicide_mgs4_right','pass19__gekko_missile_mgs4_right','pass19__gekko_mgr_right']);
 const limits=Object.freeze([
  'Native source cameras and independent opposite-view art are preserved. Source-led 2D rigging is not extracted original-game animation or certified absolute 1:1.',
  'An explicit machineMotion.travelX in native rig units locks stance to actual root displacement. Callers without displacement receive an engine-frame analytic treadmill presentation, not certified world-ground contact.',
  'Visible mechanical hip bearings are separated by complementary native source clips for D-Walker and Walker Gear. Concealed backing surfaces, actuator interiors and the missing Gekko camera are not invented.',
  'D-Walker left formerly sampled its pilot seat as its gun. The corrected actual gatling comes from the existing unchanged atlas; the seat source remains admitted in that atlas.',
  'Gekko organic muscles and toes remain rigid source regions; no fake mechanical knee cap, independent toe surface or humanoid arm is invented.',
  'Existing native neutral framing and source transforms are preserved except corrected D-Walker left weapon identity and Battle Gear false-foot identity. Existing target flags, HP, destruction clocks and uniform scales stay intact.',
  'Battle Gear upper and lower joints previously used generic crop percentages: source-native hip bearings and distal fork axes now register the lower trunnions without stretching textures. The rear-near trunnion is partly occluded, so its projected axis remains a source-led 2D registration, not an extracted 3D certificate. Locomotion lowers the hull before IK to keep the admitted links and sole contacts reachable.',
  'Battle Gear historical feet sampled a turret ring, armor panels and exposed chassis. Each admitted lower already contains its real sole: complementary native source partitions now share one rigid lower-leg transform. No ankle joint or hidden surface is invented. Terminal IK uses the visible native sole contact; sole debris inherits its lower-leg damage group, clock, trajectory and fade.',
  'Independent missile-pod legacy aim/recoil channels are preserved; their native sockets remain distinct from the newly articulated gun. Weapon angular limits, reaction and strides are authored presentation limits. The suicide Gekko gains no fabricated muzzle; the Battle Gear rail only articulates its admitted barrel.',
  'Reduced motion suppresses idle and analytic decorative gait. Real-displacement locomotion, aiming, recoil and signalled stomp/kick remain readable; pause reads the frozen engine frame and displacement without any wall-clock update.'
 ]);
 const pivots=Object.freeze({
  dwalker_mgsv2015:{near_upper:[263,374],near_lower:[589,368],near_foot:[836,440],far_upper:[263,684],far_lower:[468,685],far_foot:[842,798]},
  dwalker_mgsv_right:{near_upper:[132,440],near_lower:[474,456],near_foot:[885,569],far_upper:[130,793],far_lower:[509,783],far_foot:[914,900]},
  walker_gear_mgsv2015:{near_upper:[218,364],near_lower:[489,348],near_foot:[831,475],far_upper:[225,660],far_lower:[499,643],far_foot:[831,807]},
  walker_gear_mgsv_right:{near_upper:[284,420],near_lower:[553,425],near_foot:[1006,602],far_upper:[284,765],far_lower:[563,760],far_foot:[1005,926]}
 });
 const cuts=Object.freeze({dwalker_mgsv2015:{near:400,far:715},dwalker_mgsv_right:{near:473,far:824},walker_gear_mgsv2015:{near:386,far:683},walker_gear_mgsv_right:{near:447,far:791}});
 const axis=(part,jointPart,baseNativeXY,tipNativeXY,minDegrees=-28,maxDegrees=32)=>Object.freeze({part,jointPart,baseNativeXY,tipNativeXY,minDegrees,maxDegrees,channel:'pass34LightAim',qualification:'visible native 2D bore, not extracted original 3D socket'});
 const nativeAxes=Object.freeze({
  gekko_mgs4_ps3_2008:axis('gun','gun',[1072,129],[953,99]),gekko_mgs4_right:axis('gun','gun',[1095,133],[1222,104]),
  dwalker_mgsv2015:axis('gun_barrel_pass34','gun',[166,1059],[47,1041]),dwalker_mgsv_right:axis('gun_barrel_pass34','gun',[1010,219],[1117,220]),
  walker_gear_mgsv2015:axis('gun_barrel_pass34','gun',[168,1048],[47,1060]),walker_gear_mgsv_right:axis('gun_barrel_pass34','gun',[1300,216],[1410,220]),
  battle_gear_mgsv2015:axis('railgun_barrel_pass34','railgun',[985,157],[751,218],-22,28),
  pass19__gekko_missile_mgs4:axis('machinegun','machinegun',[1061,118],[955,88]),pass19__gekko_mgr:axis('machinegun','machinegun',[1061,119],[920,86]),
  pass19__gekko_missile_mgs4_right:axis('machinegun','machinegun',[1121,100],[1230,69]),pass19__gekko_mgr_right:axis('machinegun','machinegun',[1198,101],[1370,83])
 });
 const weaponPivots=Object.freeze({gekko_mgs4_ps3_2008:[1116,197],gekko_mgs4_right:[1028,232],dwalker_mgsv2015:[304,1087],dwalker_mgsv_right:[858,247],walker_gear_mgsv2015:[292,1068],walker_gear_mgsv_right:[1133,232],battle_gear_mgsv2015:[1064,169],pass19__gekko_missile_mgs4:[1163,205],pass19__gekko_mgr:[1163,217],pass19__gekko_missile_mgs4_right:[1030,229],pass19__gekko_mgr_right:[1124,216]});
 const aimAxes=Object.freeze(Object.fromEntries(Object.entries(nativeAxes).map(([id,a])=>[id,Object.freeze({byAttackKind:Object.freeze(id==='battle_gear_mgsv2015'?{shot:a,beam:a,rail:a}:{shot:a,gun:a,gatling:a,volley:a})})])));
 const sourcePoints=Object.freeze(Object.fromEntries(Object.entries(nativeAxes).map(([id,a])=>[id,Object.freeze({primary:Object.freeze({part:a.part,nativeXY:a.tipNativeXY}),[id==='battle_gear_mgsv2015'?'rail':'ballistic']:Object.freeze({part:a.part,nativeXY:a.tipNativeXY})})])));
 const weaponPoints=Object.freeze(Object.fromEntries([['gekko','gekko_mgs4_ps3_2008'],['dwalker','dwalker_mgsv2015'],['walker_column','walker_gear_mgsv2015'],['battle_gear','battle_gear_mgsv2015']].map(([name,id])=>[name,Object.freeze({part:nativeAxes[id].part,point:nativeAxes[id].tipNativeXY})])));
 const definitions=new Map(),chains=new Map(),part=id=>id==='gekko_mgs4_right'?'near_foot_other':'near_foot';
 function get(m,id){const p=m.parts.find(p=>p.id===id);if(!p)throw Error('Light native part unavailable: '+m.id+'/'+id);return p;}
 function binding(p,key,channel,factor=1){p.channels={...(p.channels||{})};p.channels[key]=[...(p.channels[key]||[]).filter(b=>b.channel!==channel),{channel,factor}];}
 function remove(p,names){for(const [key,rows]of Object.entries(p.channels||{})){const kept=rows.filter(b=>!names.includes(b.channel));if(kept.length)p.channels[key]=kept;else delete p.channels[key];}}
 const transform=(m,p)=>[m[0]*p[0]+m[2]*p[1]+m[4],m[1]*p[0]+m[3]*p[1]+m[5]];
 function inverse(m,p){const x=p[0]-m[4],y=p[1]-m[5],d=m[0]*m[3]-m[1]*m[2];return[(m[3]*x-m[2]*y)/d,(-m[1]*x+m[0]*y)/d];}
 function normalize(m){return root.CQC_MACHINE_PARTS.normalizeCatalog({schema:'cqc.machine-parts/1',machines:[m]}).get(m.id);}
 function sourceXY(pos,xy){const a=(xy[0]-pos.rect[0]-pos.pivot[0])*pos.imageScale,b=(xy[1]-pos.rect[1]-pos.pivot[1])*pos.imageScale,t=value(pos.textureRotation)*DEG;return transform(pos.matrix,[a*Math.cos(t)-b*Math.sin(t),a*Math.sin(t)+b*Math.cos(t)]);}
 function rebase(m,points,edits){
  if(!points||!Object.keys(points).length)return;
  const definition=normalize(m),poses=root.CQC_MACHINE_PARTS.pose(definition,{origin:[0,0],channels:{},flags:{}}),desired=new Map([...poses].map(([id,p])=>[id,p.matrix.slice()]));
  for(const [id,xy]of Object.entries(points)){const p=get(m,id),old=poses.get(id),q=sourceXY(old,xy),d=desired.get(id);d[4]=q[0];d[5]=q[1];p.pivot=[xy[0]-p.rect[0],xy[1]-p.rect[1]];edits.push({part:id,kind:'visible-native-bearing',nativeXY:xy,neutralTexturePreserved:true});}
  const base=[definition.scale[0],0,0,definition.scale[1],0,0];
  for(const p of m.parts){const parent=p.parent?desired.get(p.parent):base,q=inverse(parent,[desired.get(p.id)[4],desired.get(p.id)[5]]);p.offset=[q[0],-q[1]];}
 }
 function halfPlane(poly,cut,axisIndex,above){const r=[];for(let i=0;i<poly.length;i++){const a=poly[i],b=poly[(i+1)%poly.length],ia=above?a[axisIndex]<=cut:a[axisIndex]>=cut,ib=above?b[axisIndex]<=cut:b[axisIndex]>=cut;if(ia)r.push(a.slice());if(ia!==ib){const t=(cut-a[axisIndex])/(b[axisIndex]-a[axisIndex]);r.push([a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t]);}}if(r.length<3||r.length>64)throw Error('Invalid complementary native light clip');return r;}
 function polygon(p){const[x,y,w,h]=p.rect;return p.sourceClipPolygonNativeXY||[[x,y],[x+w,y],[x+w,y+h],[x,y+h]];}
 function splitHip(m,side,cut,edits){const p=get(m,side+'_upper'),whole=clone(p),poly=polygon(p),cap={...whole,id:side+'_hip_bearing_pass34',z:p.z+.001,channels:{},sourceClipPolygonNativeXY:halfPlane(poly,cut,1,true)};p.sourceClipPolygonNativeXY=halfPlane(poly,cut,1,false);m.parts.push(cap);edits.push({parts:[p.id,cap.id],kind:'fixed-bearing-mobile-thigh',cutNativeY:cut,sourceRegionPartition:true,sourcePixelsChanged:false});}
 function splitBarrel(m,id,cut,keepLeft,edits){const p=get(m,id),whole=clone(p),poly=polygon(p),barrel={...whole,id:id+'_barrel_pass34',parent:id,offset:[0,0],rotation:0,z:p.z+.001,channels:{},sourceClipPolygonNativeXY:halfPlane(poly,cut,0,keepLeft)};delete barrel.detachment;p.sourceClipPolygonNativeXY=halfPlane(poly,cut,0,!keepLeft);m.parts.push(barrel);edits.push({parts:[p.id,barrel.id],kind:'complementary-native-receiver-barrel',cutNativeX:cut,sourceRegionPartition:true,newDamageGroup:false});}
 // Contact lies on the lowest admitted alpha>=16 sole boundary in each unchanged lower source.
 // This is a rigid source partition, not an invented independently rotating ankle.
 const battleSoles=Object.freeze({front_near:{cutY:550,contact:[419.5,610]},front_far:{cutY:560,contact:[1045.5,619]},rear_near:{cutY:920,contact:[423.5,967]},rear_far:{cutY:927,contact:[1047.5,975]}});
 const battleSockets=Object.freeze({front_near:{hip:[315,352],fork:[110,553],knee:[575,392]},front_far:{hip:[903,353],fork:[694,559],knee:[1170,399]},rear_near:{hip:[329,683],fork:[124,901],knee:[570,739]},rear_far:{hip:[960,692],fork:[699,904],knee:[1175,728]}});
 function alignBattleSockets(m,edits){if(m.id!=='battle_gear_mgsv2015'||m.pass35BattleGearSockets===true)return;const points={};
  for(const [key,socket]of Object.entries(battleSockets)){points[key+'_upper']=socket.hip;points[key+'_lower']=socket.knee;}
  // Rebasing retains the original upper-leg texture and its visible hull mount.
  rebase(m,points,edits);
  for(const [key,socket]of Object.entries(battleSockets)){const upper=get(m,key+'_upper'),lower=get(m,key+'_lower'),before=clone(lower);
   if(value(upper.textureRotation)!==0)throw Error('Battle Gear fork requires admitted native source basis');
   lower.offset=[(socket.fork[0]-socket.hip[0])*upper.imageScale,-(socket.fork[1]-socket.hip[1])*upper.imageScale];
   edits.push({part:lower.id,parent:upper.id,kind:'native-lower-bearing-seated-in-visible-distal-fork',hipNativeXY:clone(socket.hip),parentForkNativeXY:clone(socket.fork),childBearingNativeXY:clone(socket.knee),before,after:clone(lower),sourceImageScalePreserved:true,qualification:key==='rear_near'?'Projected trunnion axis partly occluded by the admitted cover; no hidden bearing texture invented.':'Visible native bearing and fork axis; authored 2D source registration, not extracted 3D.'});
  }m.pass35BattleGearSockets=true;
 }
 function splitBattleSoles(m,edits){if(m.id!=='battle_gear_mgsv2015'||m.pass35BattleGearSoles===true)return;
  for(const [key,sole]of Object.entries(battleSoles)){const lower=get(m,key+'_lower'),foot=get(m,key+'_foot'),before=clone(foot),whole=polygon(lower),point=sole.contact;
   if(value(lower.textureRotation)!==0||value(lower.rotation)!==0)throw Error('Battle Gear sole requires its admitted unrotated native source basis');
   const offset=[(point[0]-lower.rect[0]-lower.pivot[0])*lower.imageScale,-(point[1]-lower.rect[1]-lower.pivot[1])*lower.imageScale];
   Object.assign(foot,{source:lower.source,rect:clone(lower.rect),pivot:[point[0]-lower.rect[0],point[1]-lower.rect[1]],offset,parent:lower.id,imageScale:lower.imageScale,rotation:0,textureRotation:0,z:lower.z+.001,channels:{},sourceClipPolygonNativeXY:halfPlane(whole,sole.cutY,1,false)});
   // One rigid lower-leg debris transform keeps the complementary pieces joined.
   // The same existing near/far flag and clock remain authoritative on the parent.
   delete foot.detachment;lower.sourceClipPolygonNativeXY=halfPlane(whole,sole.cutY,1,true);
   edits.push({part:foot.id,parent:lower.id,kind:'correct-native-sole-not-turret-or-chassis',before,after:clone(foot),cutNativeY:sole.cutY,contactNativeXY:clone(point),complementaryOriginalLowerPolygon:clone(whole),rigidLowerTransform:true,independentAnkleInvented:false,damageGroupInherited:clone(lower.detachment||null),sourcePNGBytesChanged:false});
  }m.pass35BattleGearSoles=true;
 }
 function remember(m){const keys=m.id==='battle_gear_mgsv2015'?['front_near','front_far','rear_near','rear_far']:['near','far'],legs=[];for(const key of keys){const footID=key==='near'?part(m.id):key+'_foot';legs.push({key,upper:key+'_upper',lower:key+'_lower',foot:footID});}chains.set(m.id,legs);definitions.set(m.id,normalize(m));}
 function apply(catalog){if(catalog?.schema!=='cqc.machine-parts/1'||!Array.isArray(catalog.machines)||!root.CQC_MACHINE_PARTS?.pose)throw Error('Light articulation source catalog unavailable');const next=clone(catalog),changes=[];for(const m of next.machines){if(!ids.includes(m.id))continue;if(m.pass34LightArticulation){remember(m);continue;}const sources=JSON.stringify(m.sources),edits=[];
   if(m.id==='dwalker_mgsv2015'){const gun=get(m,'gun');Object.assign(gun,{rect:[20,989,395,239],pivot:[284,98],imageScale:140/395});delete gun.sourceClipPolygonNativeXY;edits.push({part:'gun',kind:'correct-actual-gatling-not-pilot-seat',nativeRect:gun.rect,sourcePixelsChanged:false});}
   const a=nativeAxes[m.id];rebase(m,{...(pivots[m.id]||{}),...(a?{[a.jointPart]:weaponPivots[m.id]}:{})},edits);alignBattleSockets(m,edits);splitBattleSoles(m,edits);
   if(cuts[m.id])for(const [side,cut]of Object.entries(cuts[m.id]))splitHip(m,side,cut,edits);
   if(m.id.startsWith('dwalker_'))splitBarrel(m,'gun',m.id.endsWith('right')?995:176,!m.id.endsWith('right'),edits);
   if(m.id.startsWith('walker_gear_'))splitBarrel(m,'gun',m.id.endsWith('right')?1290:176,!m.id.endsWith('right'),edits);
   if(m.id==='battle_gear_mgsv2015')splitBarrel(m,'railgun',1012,true,edits);
   const hull=get(m,'hull');remove(hull,['idleBreath','bodyRoll']);binding(hull,'y','pass34LightCompression',-1);
   const keys=m.id==='battle_gear_mgsv2015'?['front_near','front_far','rear_near','rear_far']:['near','far'];
   for(const key of keys){for(const [i,segment]of ['upper','lower','foot'].entries()){const id=segment==='foot'&&key==='near'?part(m.id):key+'_'+segment,p=get(m,id);remove(p,[key+'Swing',key+'Knee',key+'Foot',key+'Lift']);if(m.id!=='battle_gear_mgsv2015'||segment!=='foot')binding(p,'rotation','pass34Light_'+key+'_'+segment);}}
   if(a){const overridden=new Set([a.part,a.jointPart,...(m.id==='battle_gear_mgsv2015'?['turret']:[])]);for(const p of m.parts)if(overridden.has(p.id))remove(p,['weaponAim','weaponAimDegrees','weaponRecoil']);binding(get(m,a.jointPart),'rotation',a.channel);binding(get(m,a.part),'x','pass34LightRecoilX');binding(get(m,a.part),'y','pass34LightRecoilY');}
   const d=normalize(m),neutral=root.CQC_MACHINE_PARTS.pose(d,{origin:[0,0],channels:{},flags:{}});for(const p of m.parts)if(p.detachment){const t=neutral.get(p.id).matrix;p.detachment.anchor=[t[4]/d.scale[0],-t[5]/d.scale[1]];}
   if(JSON.stringify(m.sources)!==sources)throw Error('Light source pins changed');m.pass34LightArticulation=true;remember(m);changes.push({id:m.id,edits,parts:m.parts.length,sourcePixelsChanged:false,simulationMutation:false});
  }return{catalog:next,changes,limits:[...limits]};}
 function rotations(p,c){return value(p.rotation)+(p.channels.rotation||[]).reduce((n,b)=>n+value(c[b.channel])*b.factor,0);}
 function solve(first,second,target,reference){const a=Math.hypot(...first),b=Math.hypot(...second),requested=Math.hypot(...target),distance=clamp(requested,Math.abs(a-b)+1e-7,a+b-1e-7),q=[target[0]*distance/(requested||1),target[1]*distance/(requested||1)],base=Math.atan2(q[1],q[0]),spread=Math.acos(clamp((a*a+distance*distance-b*b)/(2*a*distance),-1,1)),solutions=[base+spread,base-spread].map(t=>{const end=[a*Math.cos(t),a*Math.sin(t)],other=Math.atan2(q[1]-end[1],q[0]-end[0]),upper=wrap((Math.atan2(first[1],first[0])-t)/DEG),lower=wrap((Math.atan2(second[1],second[0])-other)/DEG-upper);return{upper,lower,error:Math.abs(wrap(upper-reference[0]))+Math.abs(wrap(lower-reference[1]))};});return{...solutions.sort((a,b)=>a.error-b.error)[0],clamped:Math.abs(requested-distance)>1e-5,requestedDistance:requested,actualDistance:distance};}
 function gait(travel,phaseOffset,stride,lift){const duty=.64,cycle=2*stride/duty,phase=mod(travel/cycle+phaseOffset,1);if(phase<=duty)return{phase,stance:true,shift:cycle*(duty*.5-phase),lift:0,cycle};const t=(phase-duty)/(1-duty),smooth=t*t*(3-2*t);return{phase,stance:false,shift:-stride+2*stride*smooth,lift:Math.sin(Math.PI*t)*lift,cycle};}
 function aim(def,result,state,a){if(!a)return;const request=result.machineAim||state?.machineAim,kind=request?.kind||result.motionEvent?.kind;if(kind&&!aimAxes[def.id]?.byAttackKind?.[kind])return;const c=result.channels,target=request?.targetRig;if(Array.isArray(target)&&target.length===2&&target.every(finite)){const poses=root.CQC_MACHINE_PARTS.pose(def,result),base=sourceXY(poses.get(a.part),a.baseNativeXY),tip=sourceXY(poses.get(a.part),a.tipNativeXY),joint=poses.get(a.jointPart).matrix,pivot=[joint[4],joint[5]],u=[tip[0]-base[0],tip[1]-base[1]],length=Math.hypot(...u),distance=Math.hypot(target[0]-pivot[0],target[1]-pivot[1]);if(length>1e-6&&distance>1e-6){const theta=Math.atan2(u[1],u[0]),normal=[-u[1]/length,u[0]/length],offset=[base[0]-pivot[0],base[1]-pivot[1]],side=offset[0]*normal[0]+offset[1]*normal[1],wanted=wrap((theta-Math.atan2(target[1]-pivot[1],target[0]-pivot[0])+Math.asin(clamp(side/distance,-1,1)))/DEG);c.pass34LightAim=clamp(wanted,a.minDegrees,a.maxDegrees);result.machineAimSolution={part:a.part,channel:a.channel,requestedDegrees:wanted,actualDegrees:c.pass34LightAim,limited:Math.abs(wanted-c.pass34LightAim)>1e-6,sourceNativeAxis:true};}}
  const recoil=clamp(Math.max(value(c.weaponRecoilImpulse)*2.4,-value(c.weaponRecoil)*.4),0,2.4);if(recoil<=0)return;const poses=root.CQC_MACHINE_PARTS.pose(def,result),base=sourceXY(poses.get(a.part),a.baseNativeXY),tip=sourceXY(poses.get(a.part),a.tipNativeXY),p=def.parts.find(p=>p.id===a.part),parent=p.parent?poses.get(p.parent).matrix:[def.scale[0],0,0,def.scale[1],0,0],length=Math.hypot(tip[0]-base[0],tip[1]-base[1]),x=-(tip[0]-base[0])/length*recoil,y=-(tip[1]-base[1])/length*recoil,d=parent[0]*parent[3]-parent[1]*parent[2];c.pass34LightRecoilX=(parent[3]*x-parent[2]*y)/d;c.pass34LightRecoilY=-(-parent[1]*x+parent[0]*y)/d;
 }
 function presentationPose(id,p,state=null){const def=definitions.get(id),legs=chains.get(id);if(!def||!p)return p;const result={...p,channels:{...(p.channels||{})},flags:{...(p.flags||{})}},c=result.channels,dead=p.defeated===true||p.ko===true||/^(dead|collapse|ko)$/.test(p.action||'')||value(c.collapse)>0,walking=!dead&&(/walk|dash|run/.test(p.action||'')||p.walk===true),motion=p.machineMotion||state?.machineMotion,realTravel=finite(motion?.travelX),activeWalking=walking&&(!p.reducedMotion||realTravel),stride=id==='battle_gear_mgsv2015'?6:8,lift=id.includes('gekko')?10:7,travel=realTravel?motion.travelX:value(p.frame)*.38,attacking=!dead&&(p.attacking===true||/attack|shoot|heavy|light|special|super/.test(p.action||'')),progress=clamp(value(p.phaseProgress),0,1),brace=dead?0:clamp(value(c.weaponBrace)||(attacking?Math.sin(progress*Math.PI):0),0,1);
  c.pass34LightCompression=0;c.pass34LightAim=0;c.pass34LightRecoilX=0;c.pass34LightRecoilY=0;
  for(const leg of legs)for(const segment of ['upper','lower','foot'])c['pass34Light_'+leg.key+'_'+segment]=0;
  const neutral=root.CQC_MACHINE_PARTS.pose(def,result),compression=dead?0:(activeWalking?(id==='battle_gear_mgsv2015'?12:3):0)+brace*2.4;c.pass34LightCompression=compression;const current=root.CQC_MACHINE_PARTS.pose(def,result),diagnostics=[];
  for(const [index,leg]of legs.entries()){const disabled=dead||result.flags['part'+(/far/.test(leg.key)?1:0)+'Destroyed']===true||value(c[leg.key+'Damage'])>0;if(disabled)continue;const offset=legs.length===4?{front_near:0,rear_far:0,front_far:.5,rear_near:.5}[leg.key]:index*.5,g=activeWalking?gait(travel,offset,stride,lift):{phase:0,stance:true,shift:0,lift:0},event=result.motionEvent,stomp=event&&/stomp|step|kick/.test(event.kind||event.id||'')&&(event.sources||[0]).some(i=>(i%2?'far':'near')===(/far/.test(leg.key)?'far':'near')),eventLift=stomp&&result.motionPhase==='windup'?Math.sin(clamp(value(event.age)/Math.max(1,value(event.warn)),0,1)*Math.PI)*16:0,
    kick=id.includes('gekko')&&leg.key==='near'&&attacking&&/heavy|light|kick|attack/.test(p.action||'')&&!/shot|gun|gatling|beam|volley|rail/.test(event?.kind||'')?Math.sin(progress*Math.PI):0,
    foot=neutral.get(leg.foot).matrix,target=[foot[4]+g.shift+kick*13,foot[5]-g.lift-eventLift-kick*18],upper=def.parts.find(p=>p.id===leg.upper),lower=def.parts.find(p=>p.id===leg.lower),end=def.parts.find(p=>p.id===leg.foot),parent=upper.parent?current.get(upper.parent).matrix:[def.scale[0],0,0,def.scale[1],0,0],q=inverse(parent,target),joint=[upper.offset[0],-upper.offset[1]],v1=[lower.offset[0],-lower.offset[1]],v2=[end.offset[0],-end.offset[1]],baseUpper=rotations(upper,c),baseLower=rotations(lower,c),delta=solve(v1,v2,[q[0]-joint[0],q[1]-joint[1]],[baseUpper,baseLower]),u=wrap(delta.upper-baseUpper),l=wrap(delta.lower-baseLower);
   if(activeWalking||compression||eventLift||kick){c['pass34Light_'+leg.key+'_upper']=u;c['pass34Light_'+leg.key+'_lower']=l;c['pass34Light_'+leg.key+'_foot']=id==='battle_gear_mgsv2015'?0:-u-l;}
   diagnostics.push({key:leg.key,phase:g.phase,stance:g.stance,travelSource:realTravel?'actual-native-displacement':'engine-frame-analytic',targetRig:target,clamped:delta.clamped,requestedDistance:delta.requestedDistance,actualDistance:delta.actualDistance,sourceLengthUpper:Math.hypot(...v1),sourceLengthLower:Math.hypot(...v2),...(id==='battle_gear_mgsv2015'?{terminalMode:'rigid-native-sole-contact',contactNativeXY:clone(battleSoles[leg.key].contact),independentAnkleInvented:false}:{})});
  }
  if(!dead)aim(def,result,state,nativeAxes[id]);result.pass34LightMotion={schema:'cqc.pass34.light-rigid-contact/1',id,realTravel,travelX:realTravel?travel:null,walking:activeWalking,compression,legs:diagnostics};return result;
 }
 root.CQC_PASS34_LIGHT_ARTICULATION=Object.freeze({schema:'cqc.pass34.light-native-articulation/1',apply,presentationPose,ids,limits,aimAxes,sourcePoints,weaponPoints,gait,solve,geometry:()=>Object.fromEntries([...definitions].map(([id,d])=>[id,{parts:d.parts.length,legs:clone(chains.get(id)),pivots:pivots[id]||null,...(id==='battle_gear_mgsv2015'?{sourceSockets:clone(battleSockets),soleMode:'rigid-native-lower',locomotionCompression:12}:{})}])),audit:Object.freeze({sourcePixelsChanged:false,simulationMutation:false,absolute1to1Certified:false})});
 if(typeof module==='object'&&module.exports)module.exports=root.CQC_PASS34_LIGHT_ARTICULATION;
})(globalThis);
