/* Peace Walker native articulation. Authored 2D motion, original PNG bytes.
 * Closed Chrysalis disks stay closed; quadrupedal PW never becomes its biped.
 * The engine still owns health, damage groups, timing and physical dimensions.
 */
(function (root) {
  'use strict';
  const VERSION = 3, DEG = Math.PI / 180;
  const clone = value => JSON.parse(JSON.stringify(value));
  const finite = value => typeof value === 'number' && Number.isFinite(value);
  const clamp = (value, lo, hi) => Math.max(lo, Math.min(hi, value));
  const ids = Object.freeze(['pupa_pw_psp2010', 'chrysalis_pw_psp2010',
    'cocoon_pw_psp2010', 'peacewalker_pw_psp2010']);
  const limits = Object.freeze([
    'Motion is a source-led CQC adaptation, not animation extracted from Peace Walker.',
    'Chrysalis keeps the original closed-disc source. Hidden rotor blades and additional camera facings are not invented.',
    'Pupa and Cocoon track belts have no independent native tread phases; their complete track housings never spin as wheels.',
    'The four PW legs retain the quadrupedal source. No bipedal conversion, missile-bay interior or extra damage group is authored.'
  ]);
  const multiply = (a, b) => [a[0]*b[0]+a[2]*b[1], a[1]*b[0]+a[3]*b[1],
    a[0]*b[2]+a[2]*b[3], a[1]*b[2]+a[3]*b[3],
    a[0]*b[4]+a[2]*b[5]+a[4], a[1]*b[4]+a[3]*b[5]+a[5]];
  function inverse(m) {
    const d = m[0]*m[3]-m[1]*m[2];
    return [m[3]/d,-m[1]/d,-m[2]/d,m[0]/d,
      (m[2]*m[5]-m[3]*m[4])/d,(m[1]*m[4]-m[0]*m[5])/d];
  }
  const rotate = (v, angle) => [v[0]*Math.cos(angle)-v[1]*Math.sin(angle),
    v[0]*Math.sin(angle)+v[1]*Math.cos(angle)];
  function binding(part, property, channel, factor = 1, cosmetic = false) {
    part.channels = {...(part.channels || {})};
    part.channels[property] = [...(part.channels[property] || []).filter(row => row.channel !== channel),
      {channel, factor, ...(cosmetic ? {cosmetic: true} : {})}];
  }
  function prepareMachine(machine, renderer) {
    const normalized = renderer.normalizeCatalog({schema: 'cqc.machine-parts/1', machines: [machine]}).get(machine.id);
    const poses = renderer.pose(normalized, {origin: [0,0], channels: {}, flags: {}, reducedMotion: true});
    const desired = new Map(machine.parts.map(part => [part.id, poses.get(part.id).matrix.slice()]));
    const changes = [], original = clone(machine.parts), byID = new Map(machine.parts.map(part => [part.id, part]));
    const get = id => {const part = byID.get(id); if (!part) throw Error('PW native joint unavailable: '+machine.id+'/'+id); return part;};
    function parent(id, to) {
      const part = get(id); get(to);
      if (part.parent !== to) changes.push({part:id,kind:'native-parent-chain',from:part.parent || null,to});
      part.parent = to;
    }
    function pivot(id, nativeXY) {
      const part = get(id), previous = part.pivot.slice();
      const next = [nativeXY[0]-part.rect[0],nativeXY[1]-part.rect[1]];
      const delta = [(next[0]-previous[0])*part.imageScale,(next[1]-previous[1])*part.imageScale];
      const r = (part.textureRotation || 0)*DEG, rotated = rotate(delta,r), matrix = desired.get(id);
      matrix[4] += matrix[0]*rotated[0]+matrix[2]*rotated[1];
      matrix[5] += matrix[1]*rotated[0]+matrix[3]*rotated[1];
      part.pivot = next;
      changes.push({part:id,kind:'visible-native-joint-pivot',nativeXY,previousPivot:previous,pivot:next});
    }
    function splitBarrel(id, xCut, yCut, nativePivot) {
      const body = get(id);
      if (body.variants?.length || body.sourceClipPolygonNativeXY || body.detachment) throw Error('Unreviewed native barrel partition: '+id);
      const [x,y,w,h] = body.rect;
      body.sourceClipPolygonNativeXY = [[xCut,y],[x+w,y],[x+w,y+h],[x,y+h],[x,yCut],[xCut,yCut]];
      const barrel = {...clone(body),id:id+'_barrel',parent:id,offset:[0,0],z:body.z-.01,
        channels:{},sourceClipPolygonNativeXY:[[x,y],[xCut,y],[xCut,yCut],[x,yCut]]};
      // Parent and child initially use the same source origin: exact native partition.
      desired.set(barrel.id,desired.get(id).slice());
      machine.parts.push(barrel);byID.set(barrel.id,barrel);
      pivot(barrel.id,nativePivot);
      binding(barrel,'x','pw29DeckRecoil',1);
      changes.push({part:id,child:barrel.id,kind:'complementary-native-barrel-partition',
        source:body.source,rect:body.rect.slice(),cut:[xCut,yCut],newDamageGroup:false});
    }
    if (machine.id === 'pupa_pw_psp2010') {
      binding(get('shoulder_frame'),'y','pw32PupaBodyCompression');
      binding(get('rear_chassis'),'y','pw32PupaRearCompression');
      for (const side of ['near','far'])binding(get(side+'_shoulder_hinge'),'y','pw32PupaSupportCompensation');
      for (const id of ['near_rear_exhaust_pair','far_rear_exhaust_pair','deck_sensor']) parent(id,'rear_chassis');
      parent('front_hood','shoulder_frame'); parent('ai_mount','shoulder_frame');
      for (const side of ['near','far']) {
        parent(side+'_electrical_gun','shoulder_frame');
        binding(get(side+'_shoulder_hinge'),'rotation','pw29Pupa'+side+'Suspension');
        binding(get(side+'_electrical_gun'),'rotation','pw29PupaGunAim');
        binding(get(side+'_electrical_gun'),'x','pw29PupaGunRecoil',1);
      }
    } else if (machine.id === 'chrysalis_pw_psp2010') {
      binding(get('hull'),'x','pw32ChrysalisSurge');binding(get('hull'),'y','pw32ChrysalisLift');
      binding(get('railgun_cradle'),'rotation','pw32ChrysalisRailAim');
      for (const id of ['upper_bracket','left_fan_pylon','right_fan_pylon','tail_arm','radar_mount','railgun_cradle']) parent(id,'hull');
      parent('ai_pod','upper_bracket');parent('radar_dish','radar_mount');parent('railgun','railgun_cradle');
      for (const side of ['left','right']) {
        parent(side+'_fan_duct',side+'_fan_pylon');
        pivot(side+'_fan_pylon',side==='left'?[1480,216]:[819,612]);
        binding(get(side+'_fan_pylon'),'rotation','pw29Chrysalis'+side+'Hinge',1,true);
      }
      parent('tail_fan_duct','tail_arm');pivot('tail_arm',[1388,584]);
      binding(get('tail_arm'),'rotation','pw29ChrysalisTailHinge',1,true);
      binding(get('railgun'),'x','pw29RailRecoil',1);
    } else if (machine.id === 'cocoon_pw_psp2010') {
      binding(get('main_hull'),'y','pw32CocoonCompression');
      for (const id of ['upper_tower','ai_coupler','main_cannon_turret','near_deck_turret1',
        'near_deck_turret2','far_deck_turret','near_armor_panel','far_armor_panel','upper_deck_hatch','deck_vent_box']) parent(id,'main_hull');
      parent('main_cannon_barrel','main_cannon_turret');
      pivot('main_cannon_turret',[1063,551]);
      pivot('gantry_upper',[83,641]);pivot('gantry_fore',[474,647]);
      binding(get('main_cannon_turret'),'rotation','pw29CannonElevation');
      binding(get('gantry_upper'),'rotation','pw29GantryUpper');
      binding(get('gantry_fore'),'rotation','pw29GantryFore');
      binding(get('gantry_barrel'),'rotation','pw29GantryLevel');
      binding(get('gantry_barrel'),'x','pw29GantryRecoil',1);
      splitBarrel('near_deck_turret1',1179,700,[1176,688]);
      splitBarrel('near_deck_turret2',1406,700,[1404,688]);
      splitBarrel('far_deck_turret',165,916,[162,892]);
    } else if (machine.id === 'peacewalker_pw_psp2010') {
      binding(get('hull'),'x','pw32PWBodyShift');binding(get('hull'),'y','pw32PWBodyCompression');
      parent('neck_mount','hull');parent('mammal_head','neck_mount');parent('launcher_backpack','hull');
      // Native cylindrical hip/ankle centres, not the centre of an armor rectangle or sole.
      const native = {
        front_near_upper:[175,368],front_far_upper:[501,370],rear_near_upper:[858,379],rear_far_upper:[1234,369],
        front_near_foot:[156,898],front_far_foot:[565,898],rear_near_foot:[929,900],rear_far_foot:[1321,907]
      };
      for (const [id,point] of Object.entries(native)) pivot(id,point);
      for (const limb of ['front_near','front_far','rear_near','rear_far']) {
        for (const [suffix,channel] of [['upper','Upper'],['shin','Lower'],['foot','Level']]) {
          const part = get(limb+'_'+suffix);
          part.channels = {...(part.channels || {}),rotation:(part.channels?.rotation || []).filter(row => !/^pwStomp(?:Near|Far)(?:Upper|Lower|Level)$/.test(row.channel))};
          binding(part,'rotation','pw29_'+limb+channel);
        }
      }
    }
    // Rebase all children once after the new pivots/parents. Every native neutral
    // point keeps exactly the previous world projection, scale and paint order.
    const base=[machine.scale?.[0]||1,0,0,machine.scale?.[1]||1,0,0];
    for (const part of machine.parts) {
      const relative = multiply(inverse(part.parent ? desired.get(part.parent) : base),desired.get(part.id));
      part.offset = [relative[4],-relative[5]];
      const rotation = -Math.atan2(relative[1],relative[0])/DEG;
      if (Math.abs(rotation-(part.rotation || 0))>1e-9) part.rotation=rotation;
      if (part.detachment) part.detachment.anchor=[desired.get(part.id)[4]/base[0],-desired.get(part.id)[5]/base[3]];
    }
    let legs=null;
    if (machine.id === 'peacewalker_pw_psp2010') {
      legs={};
      for(const limb of ['front_near','front_far','rear_near','rear_far']) {
        const upper=get(limb+'_upper'),lower=get(limb+'_shin'),foot=get(limb+'_foot');
        legs[limb]={upperVector:lower.offset.slice(),lowerVector:foot.offset.slice(),
          upperRotation:upper.rotation||0,lowerRotation:lower.rotation||0,footRotation:foot.rotation||0};
      }
    }
    machine.pass29PWArticulation={version:VERSION,changes,legs,
      sourcePixelsChanged:false,neutralSourceProjectionPreserved:true};
    return {changes,original};
  }
  function upgradeMotionBindings(machine) {
    const get=id=>machine.parts.find(part=>part.id===id);
    if(machine.id==='pupa_pw_psp2010') {
      binding(get('shoulder_frame'),'y','pw32PupaBodyCompression');
      binding(get('rear_chassis'),'y','pw32PupaRearCompression');
      for(const side of ['near','far'])binding(get(side+'_shoulder_hinge'),'y','pw32PupaSupportCompensation');
    } else if(machine.id==='chrysalis_pw_psp2010') {
      binding(get('hull'),'x','pw32ChrysalisSurge');binding(get('hull'),'y','pw32ChrysalisLift');
      binding(get('railgun_cradle'),'rotation','pw32ChrysalisRailAim');
      binding(get('railgun'),'y','pw32ChrysalisRailRecoilY');
    } else if(machine.id==='cocoon_pw_psp2010') {
      binding(get('main_hull'),'y','pw32CocoonCompression');
      const barrel=get('main_cannon_barrel');
      barrel.channels.x=(barrel.channels.x||[]).filter(row=>row.channel!=='pwCannonRecoil');
      binding(barrel,'x','pw32CocoonRecoilX');binding(barrel,'y','pw32CocoonRecoilY');
      binding(barrel,'rotation','pw32CocoonBarrelElevation');
    }
    else if(machine.id==='peacewalker_pw_psp2010') {
      binding(get('hull'),'x','pw32PWBodyShift');binding(get('hull'),'y','pw32PWBodyCompression');
    }
    machine.pass29PWArticulation.version=VERSION;
  }
  let preparedLegs=null;
  function apply(catalog) {
    if(catalog?.schema!=='cqc.machine-parts/1'||!Array.isArray(catalog.machines)||!root.CQC_MACHINE_PARTS?.pose) throw Error('PW native catalogue/renderer unavailable');
    const next=clone(catalog),changes=[];
    for(const machine of next.machines) if(ids.includes(machine.id)) {
      if(!machine.pass29PWArticulation)prepareMachine(machine,root.CQC_MACHINE_PARTS);
      upgradeMotionBindings(machine);
      if(machine.id==='peacewalker_pw_psp2010')preparedLegs=clone(machine.pass29PWArticulation.legs);
      changes.push({id:machine.id,parts:machine.parts.length,edits:clone(machine.pass29PWArticulation.changes)});
    }
    root.CQC_MACHINE_PARTS.normalizeCatalog(next);
    return {catalog:next,changes,limits:limits.slice()};
  }
  function solveLeg(leg,stride,lift) {
    const u=rotate(leg.upperVector,leg.upperRotation*DEG);
    const l=rotate(leg.lowerVector,(leg.upperRotation+leg.lowerRotation)*DEG);
    const a=Math.hypot(...u),b=Math.hypot(...l),neutral=[u[0]+l[0],u[1]+l[1]];
    let target=[neutral[0]+stride,neutral[1]+lift],distance=Math.hypot(...target);
    const reach=clamp(distance,Math.abs(a-b)+1e-6,a+b-1e-6);
    if(distance>0&&reach!==distance)target=target.map(value=>value*reach/distance);
    distance=reach;
    const bend=Math.sign(u[0]*l[1]-u[1]*l[0])||-1;
    const first=Math.atan2(target[1],target[0])-bend*Math.acos(clamp((a*a+distance*distance-b*b)/(2*a*distance),-1,1));
    const knee=[Math.cos(first)*a,Math.sin(first)*a],second=Math.atan2(target[1]-knee[1],target[0]-knee[0]);
    const upper=(first-Math.atan2(u[1],u[0]))/DEG;
    const lower=(second-Math.atan2(l[1],l[0]))/DEG-upper;
    return {upper,lower,level:-upper-lower,target};
  }
  const smooth=q=>{q=clamp(q,0,1);return q*q*(3-2*q);};
  function eventEnvelope(event) {
    const age=Math.max(0,event.age||0),warn=Math.max(1,event.warn||1),active=Math.max(1,event.active||1),recovery=Math.max(1,event.recovery||18);
    const firing=age>=warn&&age<warn+active;
    const load=age<warn?smooth(age/warn):firing?1:1-smooth((age-warn-active)/recovery);
    const kick=age>=warn?Math.sin(Math.min(1,(age-warn)/2)*Math.PI/2)*Math.exp(-(age-warn)/7):0;
    return {load,kick,firing};
  }
  // Slow wave gait: one raised foot, three support feet. This is an authored
  // mechanical adaptation, not the faster diagonal sinusoid used previously.
  function quadrupedGait(frame,limb,motion=null) {
    const order={front_near:0,rear_far:.25,front_far:.5,rear_near:.75},support=.78,
      distanceDriven=finite(motion?.travelX),direction=motion?.direction===-1?-1:1,
      cycleDistance=8/support,cycle=distanceDriven?direction*motion.travelX/cycleDistance:frame/176,
      q=((cycle+order[limb])%1+1)%1;
    if(q<support)return {stride:direction*(4-cycleDistance*q),lift:0,support:true,phase:q,cycleDistance,distanceDriven};
    const swing=(q-support)/(1-support),blend=swing**3*(10+swing*(-15+6*swing)),
      tangent=-cycleDistance*(1-support);
    return {stride:direction*(-4+8*blend+tangent*swing*(1-swing)*(1-2*swing)),
      lift:Math.sin(Math.PI*swing)**2*11,support:false,phase:q,cycleDistance,distanceDriven};
  }
  const chrysalisAxis=Object.freeze({part:'railgun',jointPart:'railgun_cradle',baseNativeXY:[1158,829],tipNativeXY:[531,937],minDegrees:-18,maxDegrees:55,channel:'pw32ChrysalisRailAim'});
  const cocoonAxis=Object.freeze({part:'main_cannon_barrel',fixedPivot:true,baseNativeXY:[1436,478],tipNativeXY:[1216,397],minDegrees:-20,maxDegrees:68,channel:'pw32CocoonBarrelElevation'});
  const aimAxes=Object.freeze({chrysalis_pw_psp2010:{byAttackKind:{beam:chrysalisAxis}},cocoon_pw_psp2010:{byAttackKind:{beam:cocoonAxis}}});
  const weaponPoints=Object.freeze({chrysalis:{byAttackKind:{beam:{part:'railgun',point:[531,937]}}},cocoon:{byAttackKind:{beam:{part:'main_cannon_barrel',point:[1216,397]}}}});
  function servoAim(pose,axis,event,collapseTilt) {
    if(pose.machineAim?.kind!=='beam'||!finite(pose.machineAim.angle))return null;
    const sourceAngle=Math.atan2(axis.tipNativeXY[1]-axis.baseNativeXY[1],axis.tipNativeXY[0]-axis.baseNativeXY[0])-collapseTilt*DEG;
    const delta=Math.atan2(Math.sin(pose.machineAim.angle-sourceAngle),Math.cos(pose.machineAim.angle-sourceAngle))/DEG;
    const aim=clamp(-delta,axis.minDegrees,axis.maxDegrees);
    const envelope=event?eventEnvelope(event):null;
    return aim*(event?(event.age<event.warn?smooth(event.age/Math.max(1,event.warn)*1.6):envelope.load):1);
  }
  function presentationPose(id,pose,state=null) {
    if(!ids.includes(id)||!pose||typeof pose!=='object')return pose;
    const channels={...(pose.channels||{})},flags=pose.flags||{},motion=pose.machineMotion||state?.machineMotion,realTravel=finite(motion?.travelX),supportRows=[];
    const value=key=>finite(channels[key])?channels[key]:0;
    const defeated=pose.defeated===true||pose.ko===true||/^(dead|ko|defeated|destroyed)$/.test(pose.action||'')
      ||flags.pwDefeated===true||state?.boss?.defeated===true;
    const move=pose.walk===true||/walk|dash|run/.test(pose.action||'')||(!pose.action&&Math.abs(value('nearSwing'))+Math.abs(value('farSwing'))>0);
    const frame=finite(pose.frame)?pose.frame:0,phase=frame*.045,wave=Math.sin(phase);
    const events=(state?.events||[]).filter(e=>e.age<e.warn+e.active+(e.recovery||18)&&(!e.sources||e.sources.every(i=>flags['part'+i+'Destroyed']!==true)));
    const event=events.find(e=>['beam','shot','volley','sweep'].includes(e.kind));
    const envelope=event?eventEnvelope(event):null;
    // All secondary pistons and cosmetic mounts consume the same defeat gate;
    // stopping only the main barrel leaves Cocoon's other guns firing after KO.
    const load=defeated?0:envelope?.load||clamp(value('weaponBrace'),0,1);
    const recoil=defeated?0:envelope?.kick||clamp(value('weaponRecoilImpulse'),0,1)||clamp(-value('weaponRecoil')/7,0,1);
    const weaponKind=pose.motionEvent?.kind||event?.kind||state?.boss?.attack?.kind;
    const weaponAim=defeated?0:clamp(value('weaponAim'),-14,14);
    if(defeated)for(const key of ['weaponAim','weaponAimDegrees','weaponAimDegreesNear','weaponAimDegreesFar'])channels[key]=0;
    if(id==='pupa_pw_psp2010') {
      const compression=defeated?0:-load*1.8-recoil*.9;
      channels.pw32PupaBodyCompression=compression;
      channels.pw32PupaSupportCompensation=-compression;
      channels.pw32PupaRearCompression=defeated?0:-load*.45-recoil*.3;
      channels.pw29PupanearSuspension=!defeated&&move?wave*1.4:0;
      channels.pw29PupafarSuspension=!defeated&&move?-wave*1.15:0;
      channels.pw29PupaGunAim=weaponAim;
      channels.pw29PupaGunRecoil=defeated?0:recoil*1.2;
    } else if(id==='chrysalis_pw_psp2010') {
      const tilt=pose.reducedMotion||defeated?0:clamp(value('airTilt')+(move?wave*1.2:0),-4,4);
      channels.pw32ChrysalisSurge=defeated?0:load*1.5+recoil*1.6;
      channels.pw32ChrysalisLift=defeated?0:-load*.9-recoil*.75;
      channels.pw29ChrysalisleftHinge=tilt*.35+load*.8;
      channels.pw29ChrysalisrightHinge=-tilt*.3-load*.65;
      channels.pw29ChrysalisTailHinge=tilt*.2-load*.45;
      channels.pw32ChrysalisRailAim=defeated?0:servoAim(pose,chrysalisAxis,event,value('pwCollapseTilt'))??weaponAim;
      const railAngle=Math.atan2(108,-627);
      // The railgun does not telescope when an independent missile/gun event
      // fires. Unknown legacy direct recoil keeps its existing interpretation.
      const railRecoil=weaponKind&&!['beam','rail'].includes(weaponKind)?0:recoil;
      channels.pw29RailRecoil=-Math.cos(railAngle)*railRecoil*2.2;
      channels.pw32ChrysalisRailRecoilY=Math.sin(railAngle)*railRecoil*2.2;
    } else if(id==='cocoon_pw_psp2010') {
      channels.pw32CocoonCompression=defeated?0:-load*.7-recoil*1.6;
      channels.pw29CannonElevation=0;
      channels.pw32CocoonBarrelElevation=defeated?0:servoAim(pose,cocoonAxis,event,value('pwCollapseTilt'))??weaponAim*.35;
      const cannonAngle=Math.atan2(-81,-220)-channels.pw32CocoonBarrelElevation*DEG;
      channels.pw32CocoonRecoilX=defeated?0:-Math.cos(cannonAngle)*recoil*3.6;
      channels.pw32CocoonRecoilY=defeated?0:Math.sin(cannonAngle)*recoil*3.6;
      channels.pw29GantryUpper=weaponAim*.4;
      channels.pw29GantryFore=weaponAim*.25;
      channels.pw29GantryLevel=-weaponAim*.65;
      channels.pw29GantryRecoil=recoil*1.5;
      channels.pw29DeckRecoil=recoil*.8;
      // This legacy multiplier is 8. Feed a positive bounded piston impulse;
      // passing the bridge's negative seven previously extended it by 56 px.
      channels.pwCannonRecoil=recoil*.45;
    } else if(id==='peacewalker_pw_psp2010'&&preparedLegs) {
      const stomp=events.find(e=>e.kind==='stomp');
      const stompEnvelope=stomp?eventEnvelope(stomp):null;
      const broken=flags.part0Destroyed===true||flags.part1Destroyed===true;
      const damageTimed=finite(channels.destroy0Frames)||finite(channels.destroy1Frames),damageAge=Math.max(value('destroy0Frames'),value('destroy1Frames'));
      const damageProgress=damageTimed?smooth(damageAge/20):1;
      const bodyCompression=defeated?0:(broken?-4*damageProgress:0)-(stompEnvelope?.load||0)*1.7-(stompEnvelope?.kick||0)*1.8;
      const bodyShift=stomp&&!defeated?(stomp.sources.includes(0)?1.8:-1.8)*stompEnvelope.load:0;
      channels.pw32PWBodyCompression=bodyCompression;channels.pw32PWBodyShift=bodyShift;
      for(const [limb,leg]of Object.entries(preparedLegs)) {
        const far=limb.endsWith('far'),index=far?1:0;
        const disabled=flags['part'+index+'Destroyed']===true||defeated;
        const gait=move&&(!pose.reducedMotion||realTravel)&&!disabled&&!stomp?quadrupedGait(frame,limb,motion):{stride:0,lift:0,support:true};
        let lift=gait.lift;
        if(stomp&&limb.startsWith('front_')&&!disabled&&stomp.sources.includes(index)&&stomp.age<stomp.warn){
          const q=clamp(stomp.age/Math.max(1,stomp.warn),0,1);
          lift=13*smooth(q/.68)*(1-smooth((q-.72)/.28));
        } else if(!stomp&&!move&&limb.startsWith('front_')&&!disabled)lift=clamp(value(far?'farLift':'nearLift'),0,30);
        const solved=solveLeg(leg,gait.stride-bodyShift,lift-bodyCompression);
        supportRows.push({limb,...gait,lift,support:!disabled&&lift===0,disabled});
        channels['pw29_'+limb+'Upper']=solved.upper;
        channels['pw29_'+limb+'Lower']=solved.lower;
        channels['pw29_'+limb+'Level']=solved.level;
      }
    }
    return {...pose,...(defeated?{defeated:true}:{}),channels,...(id==='peacewalker_pw_psp2010'?{pw35MotionSupport:{mode:realTravel?'explicit-native-root-distance':'nominal-frame-presentation',realTravel,worldContactQualified:realTravel&&move&&!defeated&&supportRows.every(row=>!row.disabled),travelX:realTravel?motion.travelX:null,walking:move&&!defeated&&(!pose.reducedMotion||realTravel),legs:supportRows}}:{})};
  }
  root.CQC_PASS29_PW_ARTICULATION=Object.freeze({version:VERSION,ids,apply,presentationPose,solveLeg,quadrupedGait,eventEnvelope,aimAxes,weaponPoints,limits});
})(globalThis);
