/* Source-preserving articulated modern Metal Gear limbs.
 * Native source clips isolate the RAY MGR ankles; movement is an authored 2D
 * presentation using existing pose channels, never a second combat clock.
 */
(function (root) {
  'use strict';
  const clone = value => JSON.parse(JSON.stringify(value));
  const finite = value => typeof value === 'number' && Number.isFinite(value);
  const clamp = (value, low, high) => Math.max(low, Math.min(high, value));
  const DEG = Math.PI / 180;
  const specifications = Object.freeze({
    rex_mgs1_ps1: {near: ['near_upper_leg', 'near_lower_leg', 'near_foot'], far: ['far_upper_leg', 'far_lower_leg', 'far_foot']},
    ray_mgs2_arsenal: {near: ['nearThigh', 'nearShin', 'nearFoot'], far: ['farThigh', 'farShin', 'farFoot']},
    ray_unmanned_mgr2013: {near: ['near_upper', 'near_lower', 'near_foot'], far: ['far_upper', 'far_lower', 'far_foot']},
    sahelanthropus_mgsv2015: {near: ['near_thigh', 'near_shin', 'near_foot'], far: ['far_thigh', 'far_shin', 'far_foot']},
    grad_mgr2013: {near: ['near_upper', 'near_lower', 'near_foot'], far: ['far_upper', 'far_lower', 'far_foot']}
  });
  const geometry = new Map(), definitions = new Map();
  const profiles = Object.freeze({
    rex_mgs1_ps1: {root: 'pelvis_anchor', stride: 8, lift: 9, compression: 3.5},
    ray_mgs2_arsenal: {root: 'torso', stride: 11, lift: 11, compression: 3},
    ray_unmanned_mgr2013: {root: 'hull', stride: 12, lift: 11, compression: 3},
    sahelanthropus_mgsv2015: {root: 'anchor', stride: 14, lift: 14, compression: 4},
    grad_mgr2013: {root: 'hull', stride: 8, lift: 8, compression: 2.5}
  });
  // These axes are measured on admitted native sprites. They describe the
  // visible 2D bore/emitter, not an extracted original game's 3D weapon socket.
  const axis = (part, jointPart, baseNativeXY, tipNativeXY, minDegrees, maxDegrees) => Object.freeze({
    part, jointPart, baseNativeXY, tipNativeXY, minDegrees, maxDegrees,
    channel: 'pass32ModernAim', qualification: 'admitted native sprite weapon axis; source-led 2D articulation, original 3D bore not certified'});
  const nativeAxes = Object.freeze({
    rex_mgs1_ps1: axis('railgun', 'railgun', [610,310], [58,230], -42, 48),
    ray_mgs2_arsenal: axis('mouthInterior', 'head', [650,762], [110,805], -38, 40),
    ray_unmanned_mgr2013: axis('lower_jaw', 'upper_head', [793,193], [756,198], -35, 38),
    sahelanthropus_mgsv2015: axis('railgun_barrel', 'railgun_receiver', [1430,739], [1032,742], -45, 50),
    grad_mgr2013: axis('cannon', 'cannon', [1390,154], [1175,199], -32, 40)
  });
  const aimAxes = Object.freeze(Object.fromEntries(Object.entries(nativeAxes).map(([id, value]) => [id,
    Object.freeze({byAttackKind: Object.freeze(id.startsWith('ray_') ? {beam:value, plasma:value} : {beam:value, shot:value, volley:value, cannon:value})})])));
  const limits = Object.freeze([
    'Native source pixels and admitted projections are retained. This 2D articulation is not extracted original animation or a certified absolute 1:1 reconstruction.',
    'RAY MGR clawed feet now pivot separately at the observed ankles. Their individual toes remain rigid because concealed toe sockets and independent back surfaces are not drawn.',
    'REX MGS1 remains its own incarnation; this helper does not create or relabel an MGS4 REX.',
    'Source support depth, uniform scale, target/HP pools and destruction clocks are retained; the main GRAD cannon now uses its actual drawn heavy barrel, while its former machine-gun region remains separately attached.',
    'New aiming is limited to admitted source-native weapon axes. Mechanical angular limits are source-led presentation limits, not extracted canonical joint specifications.',
    'Aim and attack-phase motion remain active with reduced motion enabled because they communicate attacks; idle scanning and decorative gait are suppressed.',
    'Hidden surfaces behind moving RAY MGR ankle seams are absent from the source. Neutral Canvas edge antialias can differ along the split; source-space pixels are unchanged.',
    'Stride shortens horizontally at a fully extended native knee to preserve the source support plane; joint lengths are never stretched.'
  ]);
  function part(machine, id) {
    const result = machine.parts.find(value => value.id === id);
    if (!result) throw Error('Modern native articulation missing: ' + machine.id + '/' + id);
    return result;
  }
  // Clip a source-native polygon at the observed ankle line. Complementary
  // halves share one edge; every original pixel stays in the neutral silhouette.
  function halfPlane(polygon, cutY, below) {
    const result = [];
    for (let index = 0; index < polygon.length; index++) {
      const a = polygon[index], b = polygon[(index + 1) % polygon.length];
      const insideA = below ? a[1] >= cutY : a[1] <= cutY;
      const insideB = below ? b[1] >= cutY : b[1] <= cutY;
      if (insideA) result.push(a.slice());
      if (insideA !== insideB) {
        const t = (cutY - a[1]) / (b[1] - a[1]);
        result.push([a[0] + (b[0] - a[0]) * t, cutY]);
      }
    }
    if (result.length < 3 || result.length > 64) throw Error('Unusable native ankle partition');
    return result;
  }
  function bind(value, channel, cosmetic = true) {
    value.channels = value.channels || {};
    value.channels.rotation = (value.channels.rotation || []).filter(row => row.channel !== channel);
    value.channels.rotation.push({channel, factor: 1, cosmetic});
  }
  function translate(value, property, channel, factor = 1) {
    value.channels = value.channels || {};
    value.channels[property] = (value.channels[property] || []).filter(row => row.channel !== channel);
    value.channels[property].push({channel, factor});
  }
  function ankle(machine, side, sourceNativeXY, cutY) {
    const lower = part(machine, side + '_lower'), foot = part(machine, side + '_foot');
    const native = clone(lower), polygon = native.sourceClipPolygonNativeXY;
    if (!polygon || native.variants?.length) throw Error('RAY MGR native ankle cannot be isolated');
    const relative = [sourceNativeXY[0] - native.rect[0], sourceNativeXY[1] - native.rect[1]];
    lower.sourceClipPolygonNativeXY = halfPlane(polygon, cutY, false);
    Object.assign(foot, {source: native.source, rect: native.rect.slice(), pivot: relative,
      imageScale: native.imageScale, opacity: 1, textureRotation: native.textureRotation || 0,
      rotation: 0, parent: lower.id, z: native.z + .1,
      offset: [(relative[0] - native.pivot[0]) * native.imageScale,
        -(relative[1] - native.pivot[1]) * native.imageScale],
      sourceClipPolygonNativeXY: halfPlane(polygon, cutY, true)});
    // Existing logical foot destruction uses the leg's real HP flag and clock.
    // Only its physical source anchor changes; no additional damage pool exists.
    if (native.detachment) foot.detachment = clone(native.detachment);
    return {part: foot.id, splitFrom: lower.id, source: native.source,
      sourceNativeXY: sourceNativeXY.slice(), cutY, nativePixelEditing: false,
      reason: 'Independent clawed foot rotates around the source ankle instead of rotating rigidly with the tibia'};
  }
  function remember(machine) {
    const spec = specifications[machine.id], legs = {};
    for (const side of ['near', 'far']) {
      const [upperID, lowerID, footID] = spec[side];
      const upper = part(machine, upperID), lower = part(machine, lowerID), foot = part(machine, footID);
      legs[side] = {first: lower.offset.slice(), second: foot.offset.slice(),
        upperRotation: upper.rotation || 0, lowerRotation: lower.rotation || 0,
        upperChannels: clone(upper.channels?.rotation || []).filter(row => !row.channel.startsWith('pass29Modern')),
        lowerChannels: clone(lower.channels?.rotation || []).filter(row => !row.channel.startsWith('pass29Modern'))};
    }
    geometry.set(machine.id, legs);
    definitions.set(machine.id, root.CQC_MACHINE_PARTS.normalizeCatalog({schema:'cqc.machine-parts/1', machines:[machine]}).get(machine.id));
  }
  function apply(catalog) {
    if (catalog?.schema !== 'cqc.machine-parts/1' || !Array.isArray(catalog.machines)) throw Error('Modern source catalogue unavailable');
    const adapted = clone(catalog), changes = [];
    for (const machine of adapted.machines) {
      if (!specifications[machine.id]) continue;
      if (machine.pass29ModernArticulation === true) { remember(machine); continue; }
      const sourcePins = JSON.stringify(machine.sources), edits = [];
      if (machine.id === 'grad_mgr2013') {
        const cannon = part(machine, 'cannon'), machinegun = clone(cannon);
        machinegun.id = 'machinegun_module'; machinegun.offset = [15,67];
        machinegun.z = cannon.z + .1;
        machinegun.channels = {x:[{channel:'pass32ModernMGRecoil',factor:1}]};
        machine.parts.push(machinegun);
        Object.assign(cannon, {rect:[1145,24,378,246], pivot:[293,130],
          sourceClipPolygonNativeXY:[[1145,24],[1523,24],[1523,270],[1145,270]]});
        for (const side of ['near','far']) for (const segment of ['upper','lower','foot']) {
          const support=part(machine,side+'_'+segment); delete support.detachment;
          if (support.channels?.rotation) support.channels.rotation=support.channels.rotation.filter(row=>row.channel!==side+'Damage');
        }
        delete cannon.channels.x;
        cannon.channels.rotation = (cannon.channels.rotation || []).filter(row => row.channel !== 'weaponAim');
        edits.push({parts:['cannon','machinegun_module'], reason:'The source-native heavy barrel is the cannon; the original small machine-gun module remains a separate body-mounted weapon. Original atlas bytes are unchanged.'});
      }
      const bodyRoot = part(machine, profiles[machine.id].root);
      // A sinusoidal translation of the complete rigid creature makes its feet
      // slide through the support plane. Suspension compression is compensated
      // below by both constant-length chains instead.
      if (bodyRoot.channels?.y) bodyRoot.channels.y = bodyRoot.channels.y.filter(row => row.channel !== 'idleBreath');
      translate(bodyRoot, 'y', 'pass32ModernCompression', -1);
      const sensorID=machine.id==='rex_mgs1_ps1'?'radome':machine.id==='sahelanthropus_mgsv2015'?'radar_plate':machine.id==='grad_mgr2013'?'head':null;
      if (sensorID) bind(part(machine,sensorID),'pass32ModernSensorScan');
      const weaponAxis = nativeAxes[machine.id], weaponJoint = part(machine, weaponAxis.jointPart);
      bind(weaponJoint, weaponAxis.channel, false);
      if (!machine.id.startsWith('ray_')) {
        translate(weaponJoint, 'x', 'pass32ModernRecoilX');
        translate(weaponJoint, 'y', 'pass32ModernRecoilY');
      }
      if (machine.id === 'ray_unmanned_mgr2013') {
        // Preserve the neutral pixels while moving the upper head pivot to its
        // observed rear circular hinge. The lower jaw follows that head hinge.
        const head = part(machine,'upper_head'), jaw = part(machine,'lower_jaw');
        const nextPivot = [293,58], dx = (nextPivot[0]-head.pivot[0])*head.imageScale,
          dy = -(nextPivot[1]-head.pivot[1])*head.imageScale;
        head.offset = [head.offset[0]+dx,head.offset[1]+dy]; head.pivot = nextPivot;
        jaw.offset = [jaw.offset[0]-head.offset[0],jaw.offset[1]-head.offset[1]];
        jaw.parent = head.id;
        edits.push({parts:['upper_head','lower_jaw'],reason:'Tracking turns the head at its observed rear hinge; the mouth remains attached and opens around its separate hinge. Neutral native placement is preserved.'});
        edits.push(ankle(machine, 'near', [1173, 577], 577));
        edits.push(ankle(machine, 'far', [1093, 905], 905));
      }
      for (const side of ['near', 'far']) {
        const chain = specifications[machine.id][side];
        for (const [index, id] of chain.entries()) {
          const value = part(machine, id);
          // Replace the old generic rotating whole-leg gait with source-length
          // ankle targeting. Damage/stagger/stomp bindings remain independent.
          if (value.channels?.rotation) value.channels.rotation = value.channels.rotation.filter(row =>
            ![side + 'Swing', side + 'Knee', side + 'Foot'].includes(row.channel));
          bind(value, 'pass29Modern' + (side === 'near' ? 'Near' : 'Far') + ['Upper', 'Lower', 'Foot'][index], false);
        }
        edits.push({parts: chain.slice(), reason: 'Source-length hip/knee/ankle chain receives support-preserving locomotion; source hip and knee sockets remain attached'});
      }
      if (machine.id === 'sahelanthropus_mgsv2015') {
        for (const side of ['near', 'far']) for (const segment of ['upper_arm', 'forearm', 'hand'])
          bind(part(machine, side + '_' + segment), 'pass29Modern' + (side === 'near' ? 'Near' : 'Far') + {upper_arm: 'Shoulder', forearm: 'Elbow', hand: 'Wrist'}[segment], false);
        edits.push({parts: ['near_upper_arm', 'near_forearm', 'near_hand', 'far_upper_arm', 'far_forearm', 'far_hand'],
          reason: 'Existing independent native upper arm, forearm and wrist receive a small opposing gait; authored whip channel is retained'});
      }
      if (!root.CQC_MACHINE_PARTS?.normalizeCatalog || !root.CQC_MACHINE_PARTS?.pose) throw Error('Modern native renderer unavailable');
      const definition = root.CQC_MACHINE_PARTS.normalizeCatalog({schema: adapted.schema, machines: [machine]}).get(machine.id);
      const poses = root.CQC_MACHINE_PARTS.pose(definition, {origin: [0, 0], channels: {}, flags: {}, reducedMotion: true});
      for (const value of machine.parts) if (value.detachment) {
        const pose = poses.get(value.id);
        value.detachment.anchor = [pose.matrix[4] / definition.scale[0], -pose.matrix[5] / definition.scale[1]];
      }
      if (JSON.stringify(machine.sources) !== sourcePins) throw Error('Modern native source pins changed');
      machine.pass29ModernArticulation = true;
      remember(machine);
      changes.push({id: machine.id, edits, sourcePixelsChanged: false, simulationMutation: false,
        nativeSourceSHA256: machine.sources.map(value => value.sha256)});
    }
    return {catalog: adapted, changes, limits: [...limits]};
  }
  function rotate(vector, degrees) {
    const angle = degrees * DEG, c = Math.cos(angle), s = Math.sin(angle);
    return [vector[0] * c - vector[1] * s, vector[0] * s + vector[1] * c];
  }
  const normalizeAngle = value => ((value + 180) % 360 + 360) % 360 - 180;
  function solve(first, second, upper, lower, shift, lift) {
    const a = rotate(first, upper), b = rotate(second, upper + lower);
    const target = [a[0] + b[0] + shift, a[1] + b[1] + lift];
    const la = Math.hypot(...first), lb = Math.hypot(...second);
    if (la < .001 || lb < .001 || Math.hypot(...target) < .001) return {upper: 0, lower: 0, foot: 0};
    const maximum = la + lb - .000001, minimum = Math.abs(la - lb) + .000001;
    // At a nearly extended knee, shorten horizontal stride before reaching
    // radially: radial clamping would push a planted native foot underground.
    const reached = [target[0], clamp(target[1], -maximum, maximum)];
    const outerX = Math.sqrt(Math.max(0, maximum * maximum - reached[1] * reached[1]));
    reached[0] = clamp(reached[0], -outerX, outerX);
    if (Math.hypot(...reached) < minimum) {
      const innerX = Math.sqrt(Math.max(0, minimum * minimum - reached[1] * reached[1]));
      reached[0] = (target[0] < 0 || target[0] === 0 && a[0] + b[0] < 0 ? -1 : 1) * innerX;
    }
    const reachable = Math.hypot(...reached), direction = Math.atan2(reached[1], reached[0]);
    const spread = Math.acos(clamp((la * la + reachable * reachable - lb * lb) / (2 * la * reachable), -1, 1));
    const candidates = [direction + spread, direction - spread].map(angle => {
      const secondAngle = Math.atan2(reached[1] - la * Math.sin(angle), reached[0] - la * Math.cos(angle));
      const upperDelta = normalizeAngle(angle / DEG - Math.atan2(first[1], first[0]) / DEG - upper);
      const lowerDelta = normalizeAngle(secondAngle / DEG - Math.atan2(second[1], second[0]) / DEG - upper - upperDelta - lower);
      return {upper: upperDelta, lower: lowerDelta, foot: -upperDelta - lowerDelta};
    });
    candidates.sort((a, b) => Math.abs(a.upper) + Math.abs(a.lower) - Math.abs(b.upper) - Math.abs(b.lower));
    return candidates[0];
  }
  function contribution(rows, channels, reduced) {
    return rows.reduce((sum, row) => sum + (reduced && row.cosmetic ? 0 : (finite(channels[row.channel]) ? channels[row.channel] : 0) * row.factor), 0);
  }
  const value = input => finite(input) ? input : 0;
  function eventPhase(state) {
    let chosen = null;
    for (const event of state?.events || []) {
      const age=value(event.age), warn=Math.max(0,value(event.warn)), active=Math.max(1,value(event.active));
      if (age<0 || age>=warn+active) continue;
      const phase = age<warn ? 'windup' : 'active', progress = phase==='windup' ? age/Math.max(1,warn) : (age-warn)/active;
      const row = {event,phase,progress,windup:phase==='windup'?Math.sin(progress*Math.PI*.5):0,
        impact:phase==='active'?Math.sin(progress*Math.PI):0};
      if (!chosen || row.phase==='active' && chosen.phase!=='active') chosen=row;
    }
    return chosen;
  }
  function sourcePoint(definition, poses, partID, nativeXY) {
    const sourcePart=definition.parts.find(row=>row.id===partID), posed=poses.get(partID), r=posed.rect;
    const a=(nativeXY[0]-r[0]-posed.pivot[0])*posed.imageScale,
      b=(nativeXY[1]-r[1]-posed.pivot[1])*posed.imageScale,
      angle=value(posed.textureRotation)*DEG, x=a*Math.cos(angle)-b*Math.sin(angle), y=a*Math.sin(angle)+b*Math.cos(angle), m=posed.matrix;
    return [m[0]*x+m[2]*y+m[4], m[1]*x+m[3]*y+m[5]];
  }
  function aimAtSource(id,result,state) {
    const descriptor=nativeAxes[id], definition=definitions.get(id), c=result.channels;
    let aim=result.machineAim||state?.machineAim, target=aim?.targetRig;
    if (!Array.isArray(target) || target.length!==2 || !target.every(finite)) return;
    const poses=root.CQC_MACHINE_PARTS.pose(definition,{...result,channels:{...c,pass32ModernAim:0,
      pass32ModernRecoilX:0,pass32ModernRecoilY:0}}),
      base=sourcePoint(definition,poses,descriptor.part,descriptor.baseNativeXY),
      tip=sourcePoint(definition,poses,descriptor.part,descriptor.tipNativeXY),
      joint=poses.get(descriptor.jointPart).matrix, pivot=[joint[4],joint[5]],
      axis=[tip[0]-base[0],tip[1]-base[1]], length=Math.hypot(...axis);
    if (length<.001 || Math.hypot(target[0]-pivot[0],target[1]-pivot[1])<.001) return;
    const theta=Math.atan2(axis[1],axis[0]), unit=[axis[0]/length,axis[1]/length],
      normal=[-unit[1],unit[0]], offset=[base[0]-pivot[0],base[1]-pivot[1]],
      sideways=offset[0]*normal[0]+offset[1]*normal[1], distance=Math.hypot(target[0]-pivot[0],target[1]-pivot[1]),
      targetAngle=Math.atan2(target[1]-pivot[1],target[0]-pivot[0]),
      desired=normalizeAngle((theta-(targetAngle-Math.asin(clamp(sideways/distance,-1,1))))/DEG);
    c.pass32ModernAim=clamp(desired,descriptor.minDegrees,descriptor.maxDegrees);
    result.machineAimSolution={part:descriptor.part,channel:descriptor.channel,
      requestedDegrees:desired,actualDegrees:c.pass32ModernAim,limited:Math.abs(desired-c.pass32ModernAim)>1e-7,
      locked:aim.locked===true,qualification:descriptor.qualification};
  }
  function presentationPose(id, pose, state = null) {
    const legs = geometry.get(id);
    if (!pose || !legs) return pose;
    const result = {...pose, flags: {...pose.flags}, channels: {...pose.channels}};
    const channels = result.channels, profile=profiles[id], event=eventPhase(state),
      dead=result.defeated===true || result.action==='dead', walking=/walk|dash|run/.test(result.action||''),
      attacking=/shoot|attack|heavy|light|special|super|slash/.test(result.action||'') || result.attacking===true,
      attackProgress=clamp(value(result.phaseProgress),0,1),
      windup=event?.windup || (attacking ? Math.sin(Math.min(1,attackProgress*3)*Math.PI*.5)*(attackProgress<.35?1:0) : 0),
      impact=event?.impact || (attacking ? Math.sin(clamp((attackProgress-.35)/.65,0,1)*Math.PI) : 0),
      strideWave=clamp(value(channels.nearSwing)/12,-1,1);
    const compression=dead?0:profile.compression*windup+profile.compression*.35*impact+
      (!result.reducedMotion&&walking ? Math.abs(strideWave)*1.5 : 0);
    channels.pass32ModernCompression=compression;
    channels.pass32ModernSensorScan=dead||result.reducedMotion||event||attacking?0:Math.sin(value(result.frame)*.019)*1.5;
    // Existing source-independent idle root breathing is replaced by subtle
    // sensor scanning. It does not move the support feet or change dimensions.
    if (id==='rex_mgs1_ps1') channels.idleBreath=0;
    channels.pass32ModernAim=0; channels.pass32ModernRecoilX=0; channels.pass32ModernRecoilY=0;
    for (const side of ['near', 'far']) {
      const title = side === 'near' ? 'Near' : 'Far', leg = legs[side];
      const wave = clamp(value(channels[side + 'Swing']) / 12, -1, 1);
      const disabled = dead || (id!=='grad_mgr2013' && result.flags['part' + (side === 'near' ? 0 : 1) + 'Destroyed'] === true);
      const originalLift=Math.max(0,value(channels[side+'Lift']));
      const attackLift=event && /stomp|leg-stomp/.test(event.event.kind||event.event.id||'') &&
        (event.event.sources||[event.event.side||0]).some(index=>(index%2===0?'near':'far')===side);
      // The foot returns to its support plane at the first dangerous frame.
      // It rises during the tell and descends before warn expires, rather than
      // levitating while the simulation already applies stomp damage.
      const stompLift=attackLift&&event.phase==='windup'?Math.sin(event.progress*Math.PI)*18:0;
      if (id==='rex_mgs1_ps1'&&side==='near'&&attackLift) {
        channels.rexNearStompUpper=0; channels.rexNearStompLower=0; channels.rexNearStompFoot=0;
        channels.stompLift=0;
      }
      const lift = disabled ? 0 : (result.reducedMotion && !attackLift ? 0 : (attackLift ? stompLift : Math.min(originalLift,profile.lift)));
      const shift = disabled || result.reducedMotion ? 0 : wave * profile.stride;
      // REX's established source-length stomp already raises its near ankle.
      // Retain that native chain; suspension correction is additional, never
      // a duplicate full-leg translation or another stomp clock.
      const effectiveLift = id === 'rex_mgs1_ps1' && side === 'near' && !finite(channels.stompLift) ? 0 : lift;
      const upper = leg.upperRotation + contribution(leg.upperChannels, channels, result.reducedMotion);
      const lower = leg.lowerRotation + contribution(leg.lowerChannels, channels, result.reducedMotion);
      const compensate=disabled?0:compression;
      const joint = shift === 0 && effectiveLift+compensate === 0 ? {upper: 0, lower: 0, foot: 0}
        : solve(leg.first, leg.second, upper, lower, shift, effectiveLift+compensate);
      for (const segment of ['Upper', 'Lower', 'Foot']) channels['pass29Modern' + title + segment] = joint[segment.toLowerCase()];
      if (id === 'sahelanthropus_mgsv2015') {
        const shoulder = disabled ? 0 : (!result.reducedMotion ? -wave * 4 : 0) - windup*6;
        const elbow = disabled ? 0 : (!result.reducedMotion ? Math.abs(wave) * 2 : 0)+windup*4;
        channels['pass29Modern' + title + 'Shoulder'] = shoulder;
        channels['pass29Modern' + title + 'Elbow'] = elbow;
        channels['pass29Modern' + title + 'Wrist'] = -shoulder - elbow;
      }
    }
    if (!dead) aimAtSource(id,result,state);
    // Recoil retracts into the mount along the actual aimed native bore; an
    // always-negative X channel would push these left-pointing guns forward.
    const recoil=dead?0:clamp(Math.max(0,-value(channels.weaponRecoil),impact*4),0,7);
    if (!id.startsWith('ray_') && recoil>0) {
      const descriptor=nativeAxes[id],definition=definitions.get(id),
        poses=root.CQC_MACHINE_PARTS.pose(definition,result),
        base=sourcePoint(definition,poses,descriptor.part,descriptor.baseNativeXY),
        tip=sourcePoint(definition,poses,descriptor.part,descriptor.tipNativeXY),
        joint=definition.parts.find(row=>row.id===descriptor.jointPart),
        parent=joint.parent?poses.get(joint.parent).matrix:[1,0,0,1,0,0],
        len=Math.hypot(tip[0]-base[0],tip[1]-base[1]),
        x=-(tip[0]-base[0])/len*recoil,y=-(tip[1]-base[1])/len*recoil;
      channels.pass32ModernRecoilX=parent[0]*x+parent[1]*y;
      channels.pass32ModernRecoilY=-(parent[2]*x+parent[3]*y);
    }
    channels.pass32ModernMGRecoil=id==='grad_mgr2013'?recoil*.5:0;
    return result;
  }
  root.CQC_PASS29_MODERN_ARTICULATION = Object.freeze({apply, presentationPose, limits, aimAxes,
    audit: Object.freeze({schema: 'cqc.pass32.modern-native-motion/1', ids: Object.keys(specifications),
      sourcePixelsChanged: false, simulationMutation: false, absolute1to1Certified: false})});
})(typeof globalThis !== 'undefined' ? globalThis : this);
