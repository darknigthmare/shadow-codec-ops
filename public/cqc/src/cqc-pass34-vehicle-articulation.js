/* PASS34: source-led rigid sockets, axial weapons and projected vehicle joints.
 * Source PNGs, engine clocks, edition IDs, HP and metric scales remain unchanged.
 * Native mounts use complementary source masks; no flat track or horizontal rotor
 * atlas is spun like a screen-plane wheel. See limits for unavailable viewpoints.
 */
(function(root){'use strict';
  const ids=Object.freeze(['hind_d_mgs1_ps1_1998','harrier_mgs2_ps2_2001',
    'm1_mgs1_ps1_1998','bulldozer_mg1_msx1987','virgil_at9_survive2018',
    'cunningham_hover_platform_mpo2006','pass19__hammerhead_mgr','pass19__hammerhead_mgr_right']);
  const clone=v=>JSON.parse(JSON.stringify(v)),finite=v=>typeof v==='number'&&Number.isFinite(v),
    value=v=>finite(v)?v:0,clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),DEG=Math.PI/180;
  const limits=Object.freeze([
    'Source-led projected 2D articulation; original game animations and 3D models are not extracted. Absolute 1:1 is not certified.',
    'Hind and M1 historical source rectangles selected armor/engine panels as rocket pods or machine gun; corrected regions now use the actual visible equipment from the same untouched atlases.',
    'Hind and Hammerhead horizontal rotors use their admitted native perspective phases. No horizontal rotor is rotated in the screen plane; the Hind tail rotor alone rotates in its visible vertical plane.',
    'M1 cannon and Hammerhead barrels recoil along their actual projected source axes beneath fixed/aiming receivers. Turret azimuth and hidden breech volumes are not fabricated from flat textures.',
    'Harrier native nozzles and complete movable tailplanes use visible sockets. No unseparated wing flap or hidden fan is manufactured.',
    'M1 and bulldozer complete track silhouettes remain rigid. Independently authored tread/wheel phases are still required for authentic track circulation.',
    'Bulldozer blade modules remain rigid projected hydraulic assemblies; hidden linkage is not certified. Its historical roof ID selected a misplaced actuator; the ID now owns the complementary visible upper casing pixels of the original hull. This rigid source partition is not a newly invented independent canonical moving roof; the original actuator remains in the untouched atlas and historical catalogs.',
    'Virgil casing, pedestal and lamp remain a rigid terminal; an unsupported flat swing of its cylindrical doors is not used.',
    'Cunningham remains the admitted frontal platform. Its opposite/rear projection and unverified propulsion are not invented.',
    'New separation pieces retain existing damage groups through attached snapshots; no additional HP pool, attack clock or projectile is introduced.'
  ]);
  let definitions=new Map();
  function part(m,id){const p=m.parts.find(p=>p.id===id);if(!p)throw Error('PASS34 vehicle part unavailable: '+m.id+'/'+id);return p;}
  function bind(p,property,channel,factor=1,cosmetic=false){p.channels||={};p.channels[property]=(p.channels[property]||[]).filter(r=>r.channel!==channel);p.channels[property].push({channel,factor,...(cosmetic?{cosmetic:true}:{})});}
  function remove(p,channel){for(const k of Object.keys(p.channels||{})){p.channels[k]=p.channels[k].filter(r=>r.channel!==channel);if(!p.channels[k].length)delete p.channels[k];}}
  function position(m,p){let x=0,y=0,n=0;while(p){if((p.rotation||0)||++n>m.parts.length)throw Error('PASS34 needs unrotated acyclic native basis');x+=p.offset[0];y+=p.offset[1];p=p.parent?part(m,p.parent):null;}return[x,y];}
  function attach(m,id,parent,edits){const p=part(m,id);if(p.parent===parent)return;const before=clone(p),a=position(m,p),b=position(m,part(m,parent));p.parent=parent;p.offset=[a[0]-b[0],a[1]-b[1]];edits.push({kind:'rigid-native-socket-parent',part:id,parent,before,after:clone(p),neutralPreserved:true});}
  function hinge(m,id,xy,edits){const p=part(m,id),before=clone(p),next=[xy[0]-p.rect[0],xy[1]-p.rect[1]],s=p.imageScale||1,old=p.pivot;
    if(p.textureRotation)throw Error('PASS34 explicit rotated native hinge basis needed');p.offset=[p.offset[0]+(next[0]-old[0])*s,p.offset[1]-(next[1]-old[1])*s];p.pivot=next;
    edits.push({kind:'source-visible-bearing',part:id,nativeXY:xy,before,after:clone(p),neutralPreserved:true});}
  function replaceSurface(m,id,rect,width,edits){const p=part(m,id),before=clone(p);p.rect=rect.slice();p.pivot=[rect[2]/2,rect[3]/2];p.imageScale=width/rect[2];delete p.sourceClipPolygonNativeXY;
    edits.push({kind:'corrected-native-equipment-identity',part:id,before,after:clone(p),samePNG:true,displayedWidthPreserved:true,neutralProjectionIntentionallyCorrected:true});}
  function mask(p){if(p.sourceClipPolygonNativeXY)return clone(p.sourceClipPolygonNativeXY);const[x,y,w,h]=p.rect;return[[x,y],[x+w,y],[x+w,y+h],[x,y+h]];}
  function half(points,a,b,positive){const d=p=>(b[0]-a[0])*(p[1]-a[1])-(b[1]-a[1])*(p[0]-a[0]),inside=p=>positive?d(p)>=-1e-9:d(p)<=1e-9,out=[];
    for(let i=0;i<points.length;i++){const p=points[i],q=points[(i+1)%points.length],pi=inside(p),qi=inside(q);if(pi)out.push(p.slice());if(pi!==qi){const dp=d(p),dq=d(q),t=dp/(dp-dq);out.push([p[0]+(q[0]-p[0])*t,p[1]+(q[1]-p[1])*t]);}}return out;}
  function barrel(m,id,receiverID,a,b,barrelPositive,rotationChannel,recoilPrefix,edits){const p=part(m,id),before=clone(p),poly=mask(p),tube=half(poly,a,b,barrelPositive),seat=half(poly,a,b,!barrelPositive);
    if(tube.length<3||seat.length<3||m.parts.some(p=>p.id===receiverID))throw Error('PASS34 invalid complementary receiver partition: '+id);
    const receiver={...clone(before),id:receiverID,z:(before.z||0)-.001,sourceClipPolygonNativeXY:seat,channels:{}};
    p.parent=receiverID;p.offset=[0,0];p.sourceClipPolygonNativeXY=tube;p.channels={};bind(receiver,'rotation',rotationChannel);bind(p,'x',recoilPrefix+'X');bind(p,'y',recoilPrefix+'Y');m.parts.push(receiver);
    edits.push({kind:'complementary-native-barrel-receiver',part:id,addedPart:receiverID,line:[a,b],before,after:clone(p),receiver:clone(receiver),neutralPreserved:true});}
  function anchors(m){const api=root.CQC_MACHINE_PARTS;if(!api?.normalizeCatalog||!api?.pose)return;const d=api.normalizeCatalog({schema:'cqc.machine-parts/1',machines:[m]}).get(m.id),ps=api.pose(d,{origin:[0,0],channels:{},flags:{}});for(const p of m.parts)if(p.detachment){const a=ps.get(p.id).matrix;p.detachment.anchor=[a[4]/d.scale[0],-a[5]/d.scale[1]];}}
  function apply(catalog){if(catalog?.schema!=='cqc.machine-parts/1'||!Array.isArray(catalog.machines))throw Error('PASS34 vehicle catalog unavailable');const next=clone(catalog),changes=[];
    for(const m of next.machines){if(!ids.includes(m.id)||m.pass34VehicleArticulation===true)continue;const oldSources=JSON.stringify(m.sources),oldIDs=m.parts.map(p=>p.id),edits=[];
      if(m.id==='hind_d_mgs1_ps1_1998'){
        replaceSurface(m,'near_rockets',[74,580,251,162],112,edits);replaceSurface(m,'far_rockets',[473,579,245,176],96,edits);
        hinge(m,'near_rockets',[224,605],edits);hinge(m,'far_rockets',[540,600],edits);
        attach(m,'near_rockets','near_stubwing',edits);attach(m,'far_rockets','far_stubwing',edits);attach(m,'tail_rotor','tail_boom',edits);
        bind(part(m,'fuselage'),'rotation','airTilt',1,true);bind(part(m,'fuselage'),'y','pass34HindHover',1,true);
        // These are real upper gear bearings, not the former wheel-centre pivots.
        hinge(m,'near_wheel',[905,831],edits);hinge(m,'far_wheel',[1246,797],edits);
        bind(part(m,'near_wheel'),'rotation','pass34HindGearNear');bind(part(m,'far_wheel'),'rotation','pass34HindGearFar');
      }else if(m.id==='harrier_mgs2_ps2_2001'){
        for(const[id,xy]of [['near_nozzle',[575,603]],['far_nozzle',[948,601]],['near_tailplane',[493,417]],['far_tailplane',[814,414]]])hinge(m,id,xy,edits);
        for(const id of ['near_nozzle','far_nozzle'])bind(part(m,id),'rotation','pass34HarrierVector',1);
        for(const id of ['near_tailplane','far_tailplane'])bind(part(m,id),'rotation','pass34HarrierTail',1,true);
      }else if(m.id==='m1_mgs1_ps1_1998'){
        replaceSurface(m,'machine_gun',[559,747,294,155],102,edits);hinge(m,'machine_gun',[779,815],edits);
        attach(m,'cannon','turret',edits);attach(m,'machine_gun','turret',edits);hinge(m,'cannon',[1034,211],edits);
        barrel(m,'cannon','cannon_mantlet_native',[1025,170],[1025,275],true,'pass34M1Aim','pass34M1Recoil',edits);
        barrel(m,'machine_gun','machine_gun_pedestal_native',[559,815],[853,815],false,'pass34M1MachineGunAim','pass34M1MachineGunRecoil',edits);
        // The fixed pintle is not a swinging gun barrel. Only the upper native gun elevates.
        part(m,'machine_gun_pedestal_native').channels={};bind(part(m,'machine_gun'),'rotation','pass34M1MachineGunAim');
        bind(part(m,'hull'),'x','pass34M1BodyRecoil');bind(part(m,'hull'),'y','pass34M1Suspension');
        for(const id of ['near_track','far_track']){bind(part(m,id),'x','pass34M1BodyRecoil',-1);bind(part(m,id),'y','pass34M1Suspension',-1);}
      }else if(m.id.startsWith('pass19__hammerhead_mgr')){
        const right=m.id.endsWith('_right'),gun=part(m,'gun');remove(gun,'hammerheadGunAim');remove(gun,'hammerheadGunRecoil');
        // A receiver keeps the existing native gun pivot and projectile source pin.
        barrel(m,'gun','gun_receiver_native',right?[1018,571]:[1085,541],right?[1018,714]:[1085,688],!right,'pass34HammerheadAim','pass34HammerheadRecoil',edits);
      }else if(m.id==='cunningham_hover_platform_mpo2006'){
        hinge(m,'near_weapon',[726,809],edits);hinge(m,'far_weapon',[879,1062],edits);
        bind(part(m,'near_weapon'),'rotation','pass34CunninghamNearAim');bind(part(m,'far_weapon'),'rotation','pass34CunninghamFarAim');
      }else if(m.id==='bulldozer_mg1_msx1987'){
        edits.push({kind:'source-rigid-linkage-retained',part:'blade',reason:'Composite source includes cylinder and links; no independent phase admits a coherent real actuator movement.'});
        const hull=part(m,'hull'),roof=part(m,'roof'),before=clone(hull),oldRoof=clone(roof),poly=mask(hull),a=[hull.rect[0],175],b=[hull.rect[0]+hull.rect[2],175],upper=half(poly,a,b,false),lower=half(poly,a,b,true);
        if(upper.length<3||lower.length<3)throw Error('PASS34 bulldozer upper casing partition empty');
        hull.sourceClipPolygonNativeXY=lower;Object.assign(roof,{source:hull.source,rect:clone(hull.rect),pivot:clone(hull.pivot),offset:[0,0],parent:'hull',imageScale:hull.imageScale,rotation:hull.rotation||0,textureRotation:hull.textureRotation||0,z:(hull.z||0)+.001,channels:{},sourceClipPolygonNativeXY:upper});
        edits.push({kind:'complementary-native-source-identity-repair',part:'hull',addedPart:'roof',line:[a,b],before,after:clone(hull),receiver:clone(roof),reusedHistoricalPartID:true,oldMisidentifiedPart:oldRoof,neutralPreservedRelativeToHullSource:true,removedMisplacedHydraulicActuatorFromRoof:true,sourceArtRemainsInUntouchedPNG:true});
      }else if(m.id==='virgil_at9_survive2018')edits.push({kind:'source-rigid-terminal-retained',reason:'No admitted cylindrical door or scan rotation phases; casing and mounted optic stay physically attached.'});
      anchors(m);if(JSON.stringify(m.sources)!==oldSources||oldIDs.some(id=>!m.parts.some(p=>p.id===id)))throw Error('PASS34 historical material lost');m.pass34VehicleArticulation=true;
      m.documentaryQualifications=[...(m.documentaryQualifications||[]),...limits];changes.push({id:m.id,edits,retainedPartIDs:oldIDs,addedPartIDs:m.parts.filter(p=>!oldIDs.includes(p.id)).map(p=>p.id),sourcePNGBytesChanged:false,HPOrTimingsChanged:false});
    }
    if(root.CQC_MACHINE_PARTS?.normalizeCatalog)definitions=root.CQC_MACHINE_PARTS.normalizeCatalog(next);return{catalog:next,changes,limits:[...limits]};
  }
  const nativeAxes={
    m1_mgs1_ps1_1998:{part:'cannon',jointPart:'cannon_mantlet_native',baseNativeXY:[1013,223],tipNativeXY:[767,258],channel:'pass34M1Aim',minDegrees:-12,maxDegrees:18},
    pass19__hammerhead_mgr:{part:'gun',jointPart:'gun_receiver_native',baseNativeXY:[1072,612],tipNativeXY:[800,670],channel:'pass34HammerheadAim',minDegrees:-18,maxDegrees:18},
    pass19__hammerhead_mgr_right:{part:'gun',jointPart:'gun_receiver_native',baseNativeXY:[1033,659],tipNativeXY:[1246,700],channel:'pass34HammerheadAim',minDegrees:-18,maxDegrees:18}
  };
  const aimAxes=Object.freeze(Object.fromEntries(Object.entries(nativeAxes).map(([id,axis])=>[id,{byAttackKind:Object.fromEntries(['gun','shot','volley','gatling','cannon','fire'].map(kind=>[kind,{...clone(axis),channel:'weaponAimDegrees'}]))}])));
  const sourcePoints=Object.freeze({m1_mgs1_ps1_1998:{ballistic:{part:'cannon',nativeXY:[767,258],kind:'actual native M1 cannon mouth'},machineGun:{part:'machine_gun',nativeXY:[568,769],kind:'actual native M1 roof machine-gun muzzle'}},
    hind_d_mgs1_ps1_1998:{missile:{part:'near_rockets',nativeXY:[103,680],kind:'actual native Hind near rocket-tube mouth'},missileFar:{part:'far_rockets',nativeXY:[666,682],kind:'actual native Hind far rocket-tube mouth'}},
    pass19__hammerhead_mgr:{ballistic:{part:'gun',nativeXY:[800,670],kind:'actual native Hammerhead undernose gun mouth'}},pass19__hammerhead_mgr_right:{ballistic:{part:'gun',nativeXY:[1246,700],kind:'actual native Hammerhead undernose gun mouth'}}});
  const weaponPoints=Object.freeze({m1tank:{part:'cannon',sourceNativeXY:[767,258]}});
  function point(p,xy){const x=(xy[0]-p.rect[0]-p.pivot[0])*p.imageScale,y=(xy[1]-p.rect[1]-p.pivot[1])*p.imageScale,a=(p.textureRotation||0)*DEG,c=Math.cos(a),s=Math.sin(a),u=x*c-y*s,v=x*s+y*c,m=p.matrix;return[m[0]*u+m[2]*v+m[4],m[1]*u+m[3]*v+m[5]];}
  function solveAim(id,p,state){const axis=nativeAxes[id],d=definitions.get(id),aim=p.machineAim||state?.machineAim,target=aim?.targetRig;if(!axis||!d||!root.CQC_MACHINE_PARTS?.pose||!Array.isArray(target)||target.length!==2||!target.every(finite))return;
    const zero={...p,channels:{...p.channels,[axis.channel]:0,pass34M1RecoilX:0,pass34M1RecoilY:0,pass34HammerheadRecoilX:0,pass34HammerheadRecoilY:0}},ps=root.CQC_MACHINE_PARTS.pose(d,zero),base=point(ps.get(axis.part),axis.baseNativeXY),tip=point(ps.get(axis.part),axis.tipNativeXY),joint=ps.get(axis.jointPart).matrix,pivot=[joint[4],joint[5]],dx=tip[0]-base[0],dy=tip[1]-base[1],length=Math.hypot(dx,dy),distance=Math.hypot(target[0]-pivot[0],target[1]-pivot[1]);if(length<1e-9||distance<1e-9)return;
    const theta=Math.atan2(dy,dx),sideways=(-(base[0]-pivot[0])*dy+(base[1]-pivot[1])*dx)/length,desired=theta-(Math.atan2(target[1]-pivot[1],target[0]-pivot[0])-Math.asin(clamp(sideways/distance,-1,1))),degrees=Math.atan2(Math.sin(desired),Math.cos(desired))/DEG,actual=clamp(degrees,axis.minDegrees,axis.maxDegrees);
    p.channels[axis.channel]=actual;p.machineAimSolution={part:axis.part,channel:axis.channel,requestedDegrees:degrees,actualDegrees:actual,limited:Math.abs(actual-degrees)>1e-7,locked:aim.locked===true,qualification:'source-axis projected mount, authored servo; hidden 3D pose unavailable'};
  }
  function recoil(c,prefix,axis,amount){const n=Math.hypot(...axis);c[prefix+'X']=-amount*axis[0]/n;c[prefix+'Y']=amount*axis[1]/n;}
  function presentationPose(id,p,state=null){if(!p||!ids.includes(id))return p;const result={...p,channels:{...(p.channels||{})},flags:{...(p.flags||{})}},c=result.channels,dead=p.defeated===true||/^(dead|ko)$/.test(p.action||''),reduced=p.reducedMotion===true,frame=finite(p.frame)?p.frame:finite(p.time)?p.time*60:0,
    attacking=p.attacking===true||p.attack===true||/shoot|attack|heavy|light|special|super|slash/.test(p.action||''),firing=!p.motionEvent||/^(beam|rail|gun|volley|shot|gatling|cannon|fire)$/.test(p.motionEvent.kind),impulse=dead||!firing?0:finite(c.weaponRecoilImpulse)?clamp(c.weaponRecoilImpulse,0,1):attacking?Math.max(0,Math.sin(clamp(finite(p.phaseProgress)?p.phaseProgress:.5,0,1)*Math.PI)):0;
    if(id==='hind_d_mgs1_ps1_1998'){c.pass34HindHover=reduced||dead?0:Math.sin(frame*.035)*1.5;const gear=finite(p.landingProgress)?clamp(p.landingProgress,0,1):0;c.pass34HindGearNear=gear*3;c.pass34HindGearFar=-gear*2;}
    else if(id==='harrier_mgs2_ps2_2001'){const vector=finite(p.nozzleVectorDegrees)?clamp(p.nozzleVectorDegrees,-75,12):/walk|dash|run/.test(p.action||'')?-12:0;c.pass34HarrierVector=dead?0:vector;c.pass34HarrierTail=reduced||dead?0:-clamp(value(c.airTilt),-5,5)*.45;}
    else if(id==='m1_mgs1_ps1_1998'){c.pass34M1Aim=dead?0:finite(c.weaponAimDegrees)?-clamp(c.weaponAimDegrees,-18,12):clamp(value(c.weaponAim),-12,18);c.pass34M1MachineGunAim=dead?0:clamp(value(p.machineGunAimDegrees),-20,20);
      c.pass34M1BodyRecoil=impulse*1.2;c.pass34M1Suspension=-impulse*.75;recoil(c,'pass34M1Recoil',[-246,35],impulse*5);recoil(c,'pass34M1MachineGunRecoil',[-211,-46],impulse*.55);
      const a=-c.pass34M1MachineGunAim*DEG,x=c.pass34M1MachineGunRecoilX,y=-c.pass34M1MachineGunRecoilY;c.pass34M1MachineGunRecoilX=x*Math.cos(a)-y*Math.sin(a);c.pass34M1MachineGunRecoilY=-(x*Math.sin(a)+y*Math.cos(a));}
    else if(id.startsWith('pass19__hammerhead_mgr')){c.pass34HammerheadAim=dead?0:finite(c.weaponAimDegrees)?-clamp(c.weaponAimDegrees,-18,18):clamp(value(c.hammerheadGunAim),-18,18);const right=id.endsWith('_right');recoil(c,'pass34HammerheadRecoil',right?[213,41]:[-272,58],impulse*3);}
    else if(id==='cunningham_hover_platform_mpo2006'){c.pass34CunninghamNearAim=dead?0:clamp(value(p.nearWeaponAimDegrees ?? c.weaponAim),-12,12);c.pass34CunninghamFarAim=dead?0:clamp(value(p.farWeaponAimDegrees ?? c.weaponAim),-12,12);}
    if(!dead)solveAim(id,result,state);result.pass34VehicleArticulation={machineID:id,pureClock:true,sourcePNGBytesChanged:false,simulationMutation:false};return result;
  }
  const api=Object.freeze({schema:'cqc.pass34.vehicle-articulation/1',apply,presentationPose,ids,limits,sourcePoints,aimAxes,weaponPoints,audit:Object.freeze({absolute1to1Certified:false,sourcePNGBytesChanged:false,simulationMutation:false})});root.CQC_PASS34_VEHICLE_ARTICULATION=api;if(typeof module==='object'&&module.exports)module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
