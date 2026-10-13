/* Peace Walker native articulation. Authored 2D motion, original PNG bytes.
 * Closed Chrysalis disks stay closed; quadrupedal PW never becomes its biped.
 * The engine still owns health, damage groups, timing and physical dimensions.
 */
(function (root) {
  'use strict';
  const VERSION = 1, DEG = Math.PI / 180;
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
      for (const id of ['near_rear_exhaust_pair','far_rear_exhaust_pair','deck_sensor']) parent(id,'rear_chassis');
      parent('front_hood','shoulder_frame'); parent('ai_mount','shoulder_frame');
      for (const side of ['near','far']) {
        parent(side+'_electrical_gun','shoulder_frame');
        binding(get(side+'_shoulder_hinge'),'rotation','pw29Pupa'+side+'Suspension');
        binding(get(side+'_electrical_gun'),'rotation','pw29PupaGunAim');
        binding(get(side+'_electrical_gun'),'x','pw29PupaGunRecoil',1);
      }
    } else if (machine.id === 'chrysalis_pw_psp2010') {
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
  let preparedLegs=null;
  function apply(catalog) {
    if(catalog?.schema!=='cqc.machine-parts/1'||!Array.isArray(catalog.machines)||!root.CQC_MACHINE_PARTS?.pose) throw Error('PW native catalogue/renderer unavailable');
    const next=clone(catalog),changes=[];
    for(const machine of next.machines) if(ids.includes(machine.id)) {
      if(machine.pass29PWArticulation?.version!==VERSION) prepareMachine(machine,root.CQC_MACHINE_PARTS);
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
  function presentationPose(id,pose,state=null) {
    if(!ids.includes(id)||!pose||typeof pose!=='object')return pose;
    const channels={...(pose.channels||{})},flags=pose.flags||{};
    const value=key=>finite(channels[key])?channels[key]:0;
    const defeated=pose.defeated===true||flags.pwDefeated===true;
    const move=/walk|dash|run/.test(pose.action||'')||Math.abs(value('nearSwing'))+Math.abs(value('farSwing'))>0;
    const phase=(finite(pose.frame)?pose.frame:0)*.12, wave=Math.sin(phase);
    const recoil=finite(channels.weaponRecoil)?clamp(-channels.weaponRecoil/7,0,1):clamp(value('pwCannonRecoil'),0,1);
    const weaponAim=clamp(value('weaponAim'),-12,12);
    if(id==='pupa_pw_psp2010') {
      channels.pw29PupanearSuspension=!defeated&&move?wave*1.75:0;
      channels.pw29PupafarSuspension=!defeated&&move?-wave*1.5:0;
      channels.pw29PupaGunAim=weaponAim;
      channels.pw29PupaGunRecoil=recoil*2;
    } else if(id==='chrysalis_pw_psp2010') {
      const tilt=pose.reducedMotion||defeated?0:clamp(value('airTilt'),-4,4);
      channels.pw29ChrysalisleftHinge=tilt*.35;
      channels.pw29ChrysalisrightHinge=-tilt*.3;
      channels.pw29ChrysalisTailHinge=tilt*.2;
      channels.pw29RailRecoil=recoil*3;
    } else if(id==='cocoon_pw_psp2010') {
      channels.pw29CannonElevation=weaponAim*.35;
      channels.pw29GantryUpper=weaponAim*.4;
      channels.pw29GantryFore=weaponAim*.25;
      channels.pw29GantryLevel=-weaponAim*.65;
      channels.pw29GantryRecoil=recoil*2.5;
      channels.pw29DeckRecoil=recoil*2;
    } else if(id==='peacewalker_pw_psp2010'&&preparedLegs) {
      for(const [limb,leg]of Object.entries(preparedLegs)) {
        const far=limb.endsWith('far'),diagonal=(limb==='front_near'||limb==='rear_far')?1:-1;
        const disabled=flags['part'+(far?1:0)+'Destroyed']===true||defeated;
        const gait=move&&!pose.reducedMotion&&!disabled?wave*diagonal:0;
        const bridgeLift=value(far?'farLift':'nearLift');
        const stomp=limb.startsWith('front_')&&!disabled?(finite(channels[far?'farLift':'nearLift'])?clamp(bridgeLift,0,30):!far?clamp(value('pwStomp'),0,1)*30:0):0;
        const lift=move?Math.max(0,gait)*9:stomp;
        const solved=solveLeg(leg,gait*5,lift);
        channels['pw29_'+limb+'Upper']=disabled?0:solved.upper;
        channels['pw29_'+limb+'Lower']=disabled?0:solved.lower;
        channels['pw29_'+limb+'Level']=disabled?0:solved.level;
      }
    }
    return {...pose,channels};
  }
  root.CQC_PASS29_PW_ARTICULATION=Object.freeze({version:VERSION,ids,apply,presentationPose,solveLeg,limits});
})(globalThis);
