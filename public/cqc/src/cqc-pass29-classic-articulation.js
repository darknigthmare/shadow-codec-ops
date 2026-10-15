/* Native source partitions for the classic Metal Gear rigs.
 * PNG bytes, identities, health pools and engine clocks remain unchanged.
 * These mechanical movements are source-led 2D adaptations, not extracted animation.
 */
(function (root) {
  'use strict';
  const clone = value => JSON.parse(JSON.stringify(value));
  const finite = value => typeof value === 'number' && Number.isFinite(value);
  const clamp = (value, low, high) => Math.max(low, Math.min(high, value));
  const DEG = Math.PI / 180;
  const ids = Object.freeze(['mgd_mg2_msx2', 'tx55_mg1_msx1987', 'gander_ghost_gbc2000',
    'raxa_mpo_psp2006', 'zeke_pw_psp2010', 'icbmg_mpo_psp2006']);
  const limits = Object.freeze([
    'Mechanical motions and concealed sockets are authored 2D interpretations of the admitted source camera; absolute 1:1 is not certified.',
    'Gander keeps its current drawn body/leg proportions and rail perspectives. New original-edition art is still required to correct their underlying projection.',
    'The Gander lower plate is a mechanical armor plate, not an organic jaw. Its source open/closed variants remain independent; the small hinge/recoil is an interpreted mechanism.',
    'The TX-55 sabotage encounter remains stationary. Walking articulation only reads an explicit existing walk/run/dash action or lift channels outside that encounter.',
    'RAXA keeps its four-support takeoff and destruction clocks. Existing Core IK is retained; this helper only supplies missing presentation joint inputs.',
    'BIC has no independently admitted launch clamps. The later Pass30 standard ZEKE dorsal bank is retained; no launch-cap interior, new pixels, targets or health pools are manufactured.',
    'Pass34 binds classic recoil to the last emitted shot of the existing active window; recovery only damps that impulse. Rigid MG D equipment has no independent organic breathing displacement.',
    'Partitioned clips cover the original native source region at rest. Canvas clip antialiasing can affect the shared seam by a subpixel; identical RGBA is not asserted.'
  ]);
  const partitions = [];
  function part(machine, id) {
    const result = machine.parts.find(value => value.id === id);
    if (!result) throw Error('Classic native joint unavailable: ' + machine.id + '/' + id);
    return result;
  }
  function bind(value, property, channel, factor = 1, cosmetic = false) {
    value.channels = value.channels || {};
    value.channels[property] = (value.channels[property] || []).filter(row => row.channel !== channel);
    value.channels[property].push({channel, factor, ...(cosmetic ? {cosmetic: true} : {})});
  }
  function rectanglePolygon(rect) {
    const [x,y,w,h] = rect;
    return [[x,y],[x+w,y],[x+w,y+h],[x,y+h]];
  }
  // A cut follows a visible plate seam from the top to one side of the source rect.
  // Both contours contain the very same seam vertices: no resampling or new pixels.
  function cornerPartition(rect, seam, corner) {
    const [x,y,w,h] = rect, right = x+w, bottom = y+h;
    if (corner === 'upper-left') return {
      fixed: [[x,y], ...clone(seam)],
      moving: [...clone(seam), [x,bottom], [right,bottom], [right,y]]
    };
    if (corner === 'upper-right') return {
      fixed: [[right,y], ...clone(seam)],
      moving: [[x,y], ...clone(seam), [right,bottom], [x,bottom]]
    };
    throw Error('Unknown native corner partition');
  }
  function splitHip(machine, partID, capID, seam, corner, edits) {
    const value = part(machine, partID);
    if (value.sourceClipPolygonNativeXY || value.variants?.length) throw Error('Hip source projection differs from reviewed atlas');
    const before = clone(value), clips = cornerPartition(value.rect, seam, corner);
    value.sourceClipPolygonNativeXY = clips.moving;
    const cap = {...clone(before), id: capID, z: (before.z || 0) + .001,
      sourceClipPolygonNativeXY: clips.fixed};
    // The bearing belongs to the chassis socket; only the surrounding thigh rotates.
    // Retain an existing opacity/damage binding without rotating the socket itself.
    cap.channels = before.channels?.opacity ? {opacity: clone(before.channels.opacity)} : {};
    machine.parts.push(cap);
    const row = {machine: machine.id, part: partID, newPart: capID, kind: 'fixed-bearing-and-mobile-thigh',
      source: value.source, rect: clone(value.rect), pivot: clone(value.pivot),
      seamNativeXY: clone(seam), sourcePixelsChanged: false, sourceRegionPartition: true};
    edits.push(row); partitions.push({...row, moving: clips.moving, fixed: clips.fixed});
  }
  function clipX(polygon, x, keepLeft) {
    const result = [], inside = point => keepLeft ? point[0] <= x : point[0] >= x;
    for (let index = 0; index < polygon.length; index++) {
      const a = polygon[(index + polygon.length - 1) % polygon.length], b = polygon[index];
      const ia = inside(a), ib = inside(b);
      if (ia !== ib) {
        const t = (x-a[0])/(b[0]-a[0]);
        result.push([x, a[1] + (b[1]-a[1])*t]);
      }
      if (ib) result.push(clone(b));
    }
    if (result.length < 3 || result.length > 64) throw Error('Native rail partition leaves valid source contour');
    return result;
  }
  function splitRail(machine, id, cutX, hingeNative, edits) {
    const receiver = part(machine, id), before = clone(receiver);
    if (receiver.variants?.length || receiver.textureRotation || receiver.rotation) throw Error('Gander native rail camera differs');
    const outline = receiver.sourceClipPolygonNativeXY || rectanglePolygon(receiver.rect);
    receiver.sourceClipPolygonNativeXY = clipX(outline, cutX, true);
    const pivot = [hingeNative[0]-receiver.rect[0], hingeNative[1]-receiver.rect[1]];
    const barrel = {...clone(before), id: id + '_barrel', parent: receiver.id, pivot,
      offset: [(pivot[0]-before.pivot[0])*before.imageScale,
        -(pivot[1]-before.pivot[1])*before.imageScale], rotation: 0,
      z: (before.z || 0)+.001, sourceClipPolygonNativeXY: clipX(outline, cutX, false), channels: {}};
    delete barrel.detachment;
    bind(barrel, 'x', 'classicGanderRailRecoil', .45, true);
    machine.parts.push(barrel);
    const row = {machine: machine.id, part: id, newPart: barrel.id, kind: 'receiver-and-native-barrel',
      source: receiver.source, rect: clone(receiver.rect), cutNativeX: cutX, hingeNativeXY: clone(hingeNative),
      sourcePixelsChanged: false, sourceRegionPartition: true};
    edits.push(row); partitions.push({...row, beforeContour: clone(outline),
      moving: clone(barrel.sourceClipPolygonNativeXY), fixed: clone(receiver.sourceClipPolygonNativeXY)});
  }
  function jawClips(rect, seam) {
    const [x,y,w,h] = rect;
    return {upper: [[x,y],[x+w,y],...clone(seam).reverse()],
      lower: [...clone(seam),[x+w,y+h],[x,y+h]]};
  }
  function splitLowerPlate(machine, edits) {
    const head = part(machine, 'jaw'), before = clone(head);
    if (head.rect.join(',') !== '833,41,238,189' || before.variants?.length !== 1
      || before.variants[0].when !== 'ganderMouthOpen') throw Error('Gander native head source differs');
    const closed = jawClips(before.rect, [[833,157],[866,161],[889,174],[941,190],
      [964,190],[1013,171],[1042,161],[1071,157]]);
    const opened = jawClips(before.variants[0].rect, [[1197,161],[1230,169],[1259,186],
      [1300,199],[1340,199],[1391,186],[1424,169],[1456,161]]);
    head.sourceClipPolygonNativeXY = closed.upper;
    head.variants[0].sourceClipPolygonNativeXY = opened.upper;
    const pivot = [33,126], openPivot = [33,125], scale = before.imageScale;
    const offset = [(pivot[0]-before.pivot[0])*scale,-(pivot[1]-before.pivot[1])*scale];
    const openedOffset = [(openPivot[0]-before.variants[0].pivot[0])*before.variants[0].imageScale,
      -(openPivot[1]-before.variants[0].pivot[1])*before.variants[0].imageScale];
    const plate = {...clone(before), id: 'jaw_lower_plate', parent: head.id, offset,
      pivot, z: (before.z || 0)+.001, sourceClipPolygonNativeXY: closed.lower, channels: {},
      variants: [{...clone(before.variants[0]), pivot: openPivot, sourceClipPolygonNativeXY: opened.lower}]};
    delete plate.detachment;
    bind(plate, 'x', 'classicGanderJawSeatX'); bind(plate, 'y', 'classicGanderJawSeatY');
    bind(plate, 'rotation', 'classicGanderJawHinge');
    machine.parts.push(plate);
    machine.pass29GanderJawSeatDelta = [openedOffset[0]-offset[0], openedOffset[1]-offset[1]];
    edits.push({machine: machine.id, part: 'jaw', newPart: plate.id,
      kind: 'native-mechanical-lower-plate', source: head.source, rect: clone(head.rect),
      variantRects: head.variants.map(value => clone(value.rect)), pivotNativeXY: [866,167],
      variantPivotNativeXY: [1230,160], sourcePixelsChanged: false, sourceRegionPartition: true,
      qualification: 'Mechanical armor mechanism interpreted from native open/closed adapted art; no original animation or organic anatomy claimed'});
    partitions.push({machine: machine.id, part: 'jaw', newPart: plate.id, source: head.source,
      rect: clone(before.rect), fixed: closed.upper, moving: closed.lower,
      variant: {rect: clone(before.variants[0].rect), fixed: opened.upper, moving: opened.lower}});
  }
  function attach(machine, id, parentID, edits) {
    const value = part(machine,id), parent = part(machine,parentID);
    if (value.parent === parentID) return;
    if (value.parent !== parent.parent || parent.rotation || parent.textureRotation) throw Error('Classic native equipment parent differs');
    const previous = clone(value.offset);
    value.parent = parentID; value.offset = [previous[0]-parent.offset[0],previous[1]-parent.offset[1]];
    edits.push({part: id, kind: 'rigid-equipment-follows-native-mount', parent: parentID,
      previousOffset: previous, offset: clone(value.offset)});
  }
  function apply(catalog) {
    if (catalog?.schema !== 'cqc.machine-parts/1' || !Array.isArray(catalog.machines)) throw Error('Classic native source catalogue unavailable');
    const adapted = clone(catalog), changes = []; partitions.length = 0;
    for (const machine of adapted.machines) {
      if (!ids.includes(machine.id) || machine.pass29ClassicArticulation) continue;
      const sourcesBefore = JSON.stringify(machine.sources), beforeIDs = machine.parts.map(value => value.id), edits = [];
      if (machine.id === 'gander_ghost_gbc2000') {
        splitHip(machine, 'near_thigh', 'near_hip_bearing', [[178,242],[176,264],[169,284],
          [171,307],[158,330],[138,345],[87,352]], 'upper-left', edits);
        splitHip(machine, 'far_thigh', 'far_hip_bearing', [[1298,242],[1305,259],[1302,287],
          [1288,310],[1267,321],[1263,333],[1220,341]], 'upper-left', edits);
        splitRail(machine, 'near_rail', 868, [868,562], edits);
        splitRail(machine, 'far_rail', 1288, [1288,564], edits);
        splitLowerPlate(machine, edits);
      }
      if (machine.id === 'mgd_mg2_msx2') {
        splitHip(machine, 'near_proximal_composite', 'near_hip_bearing', [[650,161],[626,239],
          [619,271],[606,310],[615,345],[639,370],[644,405],[672,431],[709,445],
          [730,464],[808,464]], 'upper-right', edits);
        splitHip(machine, 'far_proximal_composite', 'far_hip_bearing', [[1396,160],[1378,234],
          [1358,275],[1356,308],[1376,344],[1400,369],[1410,409],[1437,435],
          [1472,454],[1515,452],[1551,459],[1640,460]], 'upper-right', edits);
        for (const side of ['near','far']) {
          const lower=part(machine,side+'_lower_leg'), label=side[0].toUpperCase()+side.slice(1), removed=[];
          for (const axis of ['x','y']) {
            const names=[side+'LegDisabled','mgd'+label+'Fold'+axis.toUpperCase()];
            for (const row of lower.channels?.[axis] || []) if (names.includes(row.channel)) removed.push({axis,...clone(row)});
            if (lower.channels?.[axis]) {
              lower.channels[axis]=lower.channels[axis].filter(row=>!names.includes(row.channel));
              if (!lower.channels[axis].length) delete lower.channels[axis];
            }
          }
          edits.push({part:lower.id,kind:'retain-knee-socket-during-damage-and-collapse',removedTranslationBindings:removed,
            damageRotationAndEngineFlagsRetained:true,qualification:'A limb with no declared fracture stays connected at its knee instead of sliding away'});
        }
        // The rigid hull and its bolted equipment share the machine anchor. A
        // cosmetic breath on only the hull opens the mechanical seams at idle.
        const hull=part(machine,'body_hull'),breath=(hull.channels?.y || []).filter(row=>row.channel==='idleBreath');
        if (hull.channels?.y) {
          hull.channels.y=hull.channels.y.filter(row=>row.channel!=='idleBreath');
          if (!hull.channels.y.length) delete hull.channels.y;
        }
        edits.push({part:hull.id,kind:'rigid-chassis-retains-mounted-equipment-seams',
          removedCosmeticTranslationBindings:clone(breath),neutralGeometryUnchanged:true});
        attach(machine, 'three_tube_rotary_gun', 'body_hull', edits);
        const gun=part(machine,'three_tube_rotary_gun'),before=clone(gun),outline=gun.sourceClipPolygonNativeXY || rectanglePolygon(gun.rect),socket=[1000,431];
        gun.sourceClipPolygonNativeXY=clipX(outline,1000,false);
        // The receiver holds the aim bearing; only the three tubes telescope under recoil.
        gun.channels={rotation:[{channel:'classicGunAim',factor:1}]};
        const barrel={...clone(before),id:'three_tube_barrels_native',parent:gun.id,
          pivot:[socket[0]-before.rect[0],socket[1]-before.rect[1]],
          offset:[(socket[0]-before.rect[0]-before.pivot[0])*before.imageScale,
            -(socket[1]-before.rect[1]-before.pivot[1])*before.imageScale],
          sourceClipPolygonNativeXY:clipX(outline,1000,true),z:(before.z || 0)+.001,
          channels:{x:[{channel:'classicMgdRecoilX',factor:1}],y:[{channel:'classicMgdRecoilY',factor:1}]}};
        delete barrel.detachment;machine.parts.push(barrel);
        edits.push({kind:'fixed-aim-receiver-and-recoiling-native-triple-tubes',part:gun.id,
          added:[barrel.id],seamNativeX:1000,sourcePixelsChanged:false});
        partitions.push({machine:machine.id,part:gun.id,newPart:barrel.id,source:before.source,
          rect:clone(before.rect),fixed:clone(gun.sourceClipPolygonNativeXY),moving:clone(barrel.sourceClipPolygonNativeXY)});
      }
      if (machine.id === 'tx55_mg1_msx1987' || machine.id === 'zeke_pw_psp2010') {
        for (const side of ['near','far']) for (const [piece,suffix] of [['thigh','Upper'],['shin','Lower'],['foot','Foot']]) {
          bind(part(machine,side+'_'+piece), 'rotation', 'classic'+side[0].toUpperCase()+side.slice(1)+suffix);
        }
        edits.push({kind: 'source-length-two-link-leg-inputs', parts: ['near_thigh','near_shin','near_foot','far_thigh','far_shin','far_foot'],
          originalSourceAndSocketsRetained: true});
      }
      if (machine.id === 'zeke_pw_psp2010') {
        attach(machine,'railgun_receiver','railgun_cradle',edits);
        attach(machine,'radome','radar_stem',edits);
        bind(part(machine,'railgun_cradle'),'rotation','classicGunAim',1);
        bind(part(machine,'railgun_barrel'),'x','classicZekeRecoilX');
        bind(part(machine,'railgun_barrel'),'y','classicZekeRecoilY');
      }
      if (machine.id === 'raxa_mpo_psp2006') edits.push({kind:'existing-native-four-support-chain-retained',
        missingPresentationInputsSuppliedOnly:true, originalCoreIKRetained:true});
      if (machine.id === 'icbmg_mpo_psp2006') edits.push({kind:'existing-native-ballistic-chain-retained',
        qualification:'The admitted ballistic missile has no independently drawn clamps or walking limbs; its six native parts remain intact'});
      if (JSON.stringify(machine.sources) !== sourcesBefore || beforeIDs.some(id=>!machine.parts.some(value=>value.id===id)))
        throw Error('Classic native sources or existing IDs changed');
      machine.pass29ClassicArticulation = true;
      changes.push({id: machine.id, edits, beforeParts: beforeIDs.length, afterParts: machine.parts.length,
        preservedPartIDs: beforeIDs, sourcePins: clone(machine.sources), sourcePixelsChanged: false,
        simulationMutation: false, absolute1to1Certified: false});
    }
    root.CQC_MACHINE_PARTS?.normalizeCatalog(adapted);
    return {catalog: adapted, changes, limits: limits.slice(), partitions: clone(partitions)};
  }
  function solve(first, second, dx, lift) {
    if (Math.abs(dx)+Math.abs(lift) < .00000001) return {upper:0,lower:0,foot:0};
    const a = Math.hypot(...first), b = Math.hypot(...second), target = [first[0]+second[0]+dx,first[1]+second[1]+lift];
    // At extension keep the sole height; bound stride rather than stretching either link.
    const maxX=Math.sqrt(Math.max(0,(a+b-1e-8)**2-target[1]**2));
    target[0]=clamp(target[0],-maxX,maxX);
    const distance = Math.max(.000001,Math.hypot(...target)), direction = Math.atan2(target[1],target[0]);
    const spread = Math.acos(clamp((a*a+distance*distance-b*b)/(2*a*distance),-1,1));
    const normalize = value => ((value+180)%360+360)%360-180;
    const candidates = [direction+spread,direction-spread].map(angle=> {
      const secondAngle = Math.atan2(target[1]-a*Math.sin(angle),target[0]-a*Math.cos(angle));
      const upper = normalize(angle/DEG-Math.atan2(first[1],first[0])/DEG);
      const lower = normalize(secondAngle/DEG-Math.atan2(second[1],second[0])/DEG-upper);
      return {upper,lower,foot:-upper-lower};
    });
    candidates.sort((left,right)=>Math.abs(left.upper)+Math.abs(left.lower)-Math.abs(right.upper)-Math.abs(right.lower));
    return candidates[0];
  }
  function rotate(vector, degrees) {
    const angle = degrees*DEG, c=Math.cos(angle), s=Math.sin(angle);
    return [vector[0]*c-vector[1]*s,vector[0]*s+vector[1]*c];
  }
  const geometry = Object.freeze({
    tx55_mg1_msx1987: {near:[[-15.66,-95.12],[-8.1,-100.17]],far:[[-17.11,-97.15],[-9.99,-95.85]]},
    zeke_pw_psp2010: {near:[[-51.75,-93.84],[-71.92,-91.14]],far:[[-35.7,-85.4],[-117.585,-130.845]]}
  });
  function phase(state) {
    const events=(state?.events || []).filter(e=>['beam','rail','gun','volley','shot','gatling','cannon','fire'].includes(e.kind));
    const attack=state?.boss?.attack;
    if(attack && ['beam','rail','gun','volley','shot','gatling','cannon','fire'].includes(attack.kind))events.push({...attack,age:attack.t,warn:attack.windup});
    let impulse=0;
    for(const e of events){if(!finite(e.age)||!finite(e.warn)||e.age<e.warn)continue;
      if(finite(e.active)&&e.active<=0)continue;
      const age=e.age-e.warn,cadence=e.kind==='gun'?7:0;
      // A gun emits only during the engine's active interval. Its final shot
      // may settle through recovery, but the cadence must not restart there.
      const lastActive=finite(e.active)?Math.max(0,Math.ceil(e.active)-1):age;
      const lastShot=cadence?Math.floor(Math.min(age,lastActive)/cadence)*cadence:0;
      impulse=Math.max(impulse,Math.exp(-(age-lastShot)/2.8));}
    return {impulse,hasClock:events.length>0};
  }
  function presentationPose(id, pose, state=null) {
    if (!pose || !ids.includes(id)) return pose;
    const result = {...pose, channels:{...(pose.channels || {})}, flags:{...(pose.flags || {})}}, c = result.channels;
    const moving = /walk|run|dash/.test(pose.action || ''), defeated = pose.defeated === true || pose.ko === true
      || /^(dead|ko|defeated|destroyed)$/.test(pose.action || '') || state?.boss?.defeated===true || state?.boss?.destroyed===true
      || result.flags.mgdDestroyed===true || result.flags.tx55Defeated===true || result.flags.tx55Absent===true
      || result.flags.ganderDefeated===true || result.flags.zekeDefeated===true || result.flags.raxaDefeated===true;
    // Later source-completion helpers use this common presentation flag too.
    if (defeated) result.defeated = true;
    const attackPhase=phase(state),explicit=finite(c.weaponRecoilImpulse),kind=pose.motionEvent?.kind || state?.boss?.attack?.kind,
      nativeGun=!(id==='zeke_pw_psp2010' && kind && !['rail','beam'].includes(kind))
        && !(id==='mgd_mg2_msx2' && state?.boss?.id==='mgd' && kind && kind!=='gun'),
      firing=nativeGun && (!pose.motionEvent || ['beam','rail','gun','volley','shot','gatling','cannon','fire'].includes(pose.motionEvent.kind));
    // ZEKE's dorsal missiles and MG D's Core missile salvo do not kick the
    // mechanically independent railgun / triple-barrel receiver.
    c.classicGunRecoil = defeated||!firing?0:explicit || attackPhase.hasClock ? -7*clamp(explicit?c.weaponRecoilImpulse:attackPhase.impulse,0,1)
      : clamp(finite(c.weaponRecoil)?c.weaponRecoil:finite(c.mgdGunRecoil)?-Math.abs(c.mgdGunRecoil):0,-7,0);
    // The root gives clockwise source-axis deltas; mechanical rig rotation uses the opposite sign.
    c.classicGunAim = defeated?0:finite(c.weaponAimDegrees)?-clamp(c.weaponAimDegrees,-28,28):clamp(finite(c.weaponAim)?c.weaponAim:0,-8,8);
    const localRecoil=(prefix,axis,factor)=>{const length=Math.hypot(...axis),recoil=c.classicGunRecoil*factor;
      c[prefix+'X']=recoil*axis[0]/length;c[prefix+'Y']=-recoil*axis[1]/length;};
    localRecoil('classicMgdRecoil',[-351,22],.3);localRecoil('classicZekeRecoil',[-484,-2],.4);
    // Pass30 Gander reconstructs this rig afterwards; preserve the real shot impulse for that helper.
    if(id==='gander_ghost_gbc2000' && (explicit || attackPhase.hasClock)) c.weaponRecoil=c.classicGunRecoil;
    if (id === 'mgd_mg2_msx2' && !finite(c.strideLift)) {
      // Keep Core's existing stride clock; other modes supply the generic leg lift.
      for (const [side,first,second,upper,lower] of [
        ['near',[-24.44,-81.545],[45.57,-110.98],0,-46],
        ['far',[-19.975,-77.785],[42.3,-111.6],28,-46]
      ]) {
        const label=side[0].toUpperCase()+side.slice(1), disabled=defeated||result.flags[side+'LegDisabled']===true;
        const lift=disabled?0:clamp(finite(c[side+'Lift'])?c[side+'Lift']:0,0,24);
        const dx=disabled||!moving?0:clamp(finite(c[side+'Swing'])?c[side+'Swing']*.5:0,-6,6);
        if (Math.abs(dx)+Math.abs(lift)<.00000001) {
          for (const suffix of ['Upper','Lower','Foot']) {
            const key='mgd'+label+'Stride'+suffix;
            if (!finite(c[key])) c[key]=0;
          }
          continue;
        }
        const joint=solve(rotate(first,upper),rotate(second,upper+lower),dx,lift);
        c['mgd'+label+'StrideUpper']=joint.upper;c['mgd'+label+'StrideLower']=joint.lower;c['mgd'+label+'StrideFoot']=joint.foot;
      }
    }
    if (geometry[id]) for (const side of ['near','far']) {
      const label = side[0].toUpperCase()+side.slice(1), vector = geometry[id][side];
      const stationarySabotage = id==='tx55_mg1_msx1987' && (state?.boss?.id==='tx55' || !moving);
      const lift = defeated || stationarySabotage ? 0 : clamp(finite(c[side+'Lift'])?c[side+'Lift']:0,0,24);
      const dx = defeated || stationarySabotage || !moving ? 0 : clamp(finite(c[side+'Swing'])?c[side+'Swing']*.5:0,-6,6);
      const joint = solve(vector[0],vector[1],dx,lift);
      c['classic'+label+'Upper'] = joint.upper; c['classic'+label+'Lower'] = joint.lower; c['classic'+label+'Foot'] = joint.foot;
    }
    if (id === 'gander_ghost_gbc2000') {
      const open = result.flags.ganderMouthOpen === true;
      // Open source uses its own hinge/pivot. Seat compensation reproduces it at zero hinge.
      c.classicGanderJawSeatX = open ? -3.7 : 0; c.classicGanderJawSeatY = open ? 4.05 : 0;
      c.classicGanderJawHinge = defeated ? 0 : open ? clamp(-c.classicGunRecoil*.35,-4,4)
        : -clamp(finite(c.jawOpen)?c.jawOpen:0,0,1)*4;
      c.classicGanderRailRecoil = defeated ? 0 : c.classicGunRecoil;
    }
    if (id === 'raxa_mpo_psp2006') {
      const specs = [ ['P1','near',[23.2,-62.8],[-30.24,-119.28]], ['P2','far',[28.2,-71.44],[-28.5,-86.7]],
        ['P3','near',[-43.71,-66.27],[31.62,-81.53]], ['P4','far',[27.95,-51.6],[8.6,-113.95]] ];
      for (const [label,side,first,second] of specs) {
        if (finite(c['raxa'+label+'Upper'])) continue;
        const lift = defeated ? 0 : clamp(finite(c[side+'Lift'])?c[side+'Lift']:0,0,24);
        const dx = defeated || !moving ? 0 : clamp(finite(c[side+'Swing'])?c[side+'Swing']*.5:0,-6,6);
        const joint = solve(first,second,dx,lift);
        c['raxa'+label+'Upper']=joint.upper;c['raxa'+label+'Lower']=joint.lower;c['raxa'+label+'FootLevel']=joint.foot;
      }
    }
    return result;
  }
  const axis=(part,baseNativeXY,tipNativeXY,kinds,jointPart=part)=>Object.freeze({byAttackKind:Object.freeze(Object.fromEntries(kinds.map(kind=>[kind,Object.freeze({part,jointPart,
    baseNativeXY:Object.freeze(baseNativeXY.slice()),tipNativeXY:Object.freeze(tipNativeXY.slice()),channel:'weaponAimDegrees',minDegrees:-28,maxDegrees:28})])))});
  const aimAxes=Object.freeze({mgd_mg2_msx2:axis('three_tube_barrels_native',[1000,431],[649,453],['gun','shot','volley','gatling'],'three_tube_rotary_gun'),
    zeke_pw_psp2010:axis('railgun_barrel',[1149,537],[665,535],['rail','beam'],'railgun_cradle')});
  const weaponPoints = Object.freeze({mgd:{part:'three_tube_barrels_native',sourceNativeXY:[649,453]},gander: {part:'near_rail_barrel',sourceNativeXY:[1131,614]}});
  const sourcePoints = Object.freeze({mgd_mg2_msx2:{ballistic:{part:'three_tube_barrels_native',nativeXY:[649,453],kind:'native triple-tube near muzzle'}},gander_ghost_gbc2000: {ballistic: {
    part:'near_rail_barrel',nativeXY:[1131,614],kind:'native rail barrel mouth'}}});
  root.CQC_PASS29_CLASSIC_ARTICULATION = Object.freeze({apply,presentationPose,ids,limits,weaponPoints,sourcePoints,aimAxes,
    audit: Object.freeze({schema:'cqc.pass29.classic-native-articulation/1',sourcePixelsChanged:false,
      simulationMutation:false,absolute1to1Certified:false, ids})});
})(globalThis);
