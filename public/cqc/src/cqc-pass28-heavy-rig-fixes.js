/* Source-measured heavy-machine attachment corrections.
 * Native PNG bytes, encounter identities, target counts and combat state are retained.
 * Joint motion is an authored 2D presentation, not an extracted original animation.
 */
(function (root) {
  'use strict';
  const clone = value => JSON.parse(JSON.stringify(value));
  const finite = value => typeof value === 'number' && Number.isFinite(value);
  const clamp = (value, low, high) => Math.max(low, Math.min(high, value));
  const DEG = Math.PI / 180;
  const ids = Object.freeze([
    'rex_mgs1_ps1', 'ray_mgs2_arsenal', 'mgd_mg2_msx2', 'tx55_mg1_msx1987',
    'gander_ghost_gbc2000', 'shagohod_mgs3_ps2_2004', 'sahelanthropus_mgsv2015',
    'kodoque_acid_psp2004', 'chaioth_acid2_psp2005', 'ray_unmanned_mgr2013',
    'excelsus_mgr2013', 'arsenal_gear_mgs2_ps2_2001', 'outer_haven_mgs4_ps3_2008'
  ]);
  const limits = Object.freeze([
    'Absolute 1:1 is not certified. Unseen sockets and motions are source-led 2D reconstructions.',
    'No distinct MGS4 REX source rig exists in the current admitted catalogue; MGS1 REX is not relabelled as MGS4.',
    'RAY MGR lower-leg source includes its clawed foot. Its old separate foot ID is retained as an invisible joint, avoiding duplicate legs or manufactured pixels.',
    'EXCELSUS has six drawn support chains but the existing encounter has four support HP pools. Two middle supports share the existing adjacent pools; no fifth or sixth HP pool is invented.',
    'The Shagohod source rear underside still resembles tread units rather than the original air-cushion skirt. A faithful replacement requires new native art.',
    'The Arsenal Gear source projection is incomplete; its mechanical panels are retained without a claim that every original exterior section exists.',
    'Exact canonical metric dimensions are unknown here except Metal Gear D: 8.5 m high, 7.9 m long, 5.76 m wide, Konami Japanese MSX2 RC767 manual page 52.'
  ]);
  function part(machine, id) {
    const result = machine.parts.find(value => value.id === id);
    if (!result) throw Error('Reviewed native heavy-rig part missing: ' + machine.id + '/' + id);
    return result;
  }
  function addChannel(value, property, channel, factor = 1, cosmetic = false) {
    value.channels = value.channels || {};
    value.channels[property] = (value.channels[property] || []).filter(row => row.channel !== channel);
    value.channels[property].push({channel, factor, ...(cosmetic ? {cosmetic: true} : {})});
  }
  function removeChannel(value, property, channel) {
    if (!value.channels?.[property]) return;
    value.channels[property] = value.channels[property].filter(row => row.channel !== channel);
    if (!value.channels[property].length) delete value.channels[property];
  }
  function apply(catalog) {
    if (!catalog || catalog.schema !== 'cqc.machine-parts/1' || !Array.isArray(catalog.machines)) {
      throw Error('Native heavy-rig catalogue unavailable');
    }
    const adapted = clone(catalog), changes = [];
    for (const machine of adapted.machines) {
      if (!ids.includes(machine.id) || machine.pass28HeavyRigFixed === true) continue;
      const beforeSources = JSON.stringify(machine.sources), edits = [];
      const edit = (id, values, reason) => {
        const value = part(machine, id), before = clone(value);
        Object.assign(value, clone(values));
        edits.push({part: id, reason, before, after: clone(value)});
        return value;
      };
      const attach = (id, parentID) => {
        const value = part(machine, id), parent = part(machine, parentID);
        if (value.parent === parentID) return;
        if (value.parent) throw Error('Ambiguous existing heavy-rig parent: ' + machine.id + '/' + id);
        edit(id, {parent: parentID, offset: [value.offset[0] - parent.offset[0],
          value.offset[1] - parent.offset[1]]}, 'Rigid equipment follows its actual hull rather than an independent root');
      };
      switch (machine.id) {
      case 'rex_mgs1_ps1': {
        const upper = part(machine, 'near_upper_leg'), lower = part(machine, 'near_lower_leg');
        removeChannel(upper, 'y', 'stompLift');
        addChannel(upper, 'rotation', 'rexNearStompUpper');
        addChannel(lower, 'rotation', 'rexNearStompLower');
        addChannel(part(machine, 'near_foot'), 'rotation', 'rexNearStompFoot');
        edits.push({part: 'near_upper_leg', reason: 'Stomp flexes the measured knee chain while the hip stays attached; no full-thigh translation'});
        break;
      }
      case 'mgd_mg2_msx2': {
        for (const side of ['near', 'far']) {
          removeChannel(part(machine, side + '_hip_anchor'), 'y', 'strideLift');
          const title = side === 'near' ? 'Near' : 'Far';
          addChannel(part(machine, side + '_proximal_composite'), 'rotation', 'mgd' + title + 'StrideUpper');
          addChannel(part(machine, side + '_lower_leg'), 'rotation', 'mgd' + title + 'StrideLower');
          addChannel(part(machine, side + '_foot'), 'rotation', 'mgd' + title + 'StrideFoot');
        }
        edits.push({part: 'near_hip_anchor', reason: 'Original stride lift no longer pulls both complete legs out of the hull; source-length inverse kinematics retains both sockets'});
        break;
      }
      case 'ray_unmanned_mgr2013': {
        const nativeRegions = Object.fromEntries(machine.parts.map(value => [value.id, clone(value)]));
        // The atlas originally assigned the wing images to the upper/lower legs and
        // the real tibia/claw images to the wing IDs. Correct anatomy using actual pixels.
        edit('near_upper', {rect: [719,321,286,306], pivot: [239,89],
          offset: [-68,267], imageScale: .52, z: 45}, 'Native near thigh replaces the incorrectly assigned wing');
        edit('near_lower', {rect: [1050,322,187,323], pivot: [165,45],
          offset: [-7.28,-91.52], imageScale: .50, z: 46}, 'Native near tibia and claws attach at the observed thigh terminal socket');
        edit('near_foot', {rect: [0,0,1,1], pivot: [0,0], offset: [0,0],
          imageScale: 1, opacity: 0}, 'The foot is already drawn inside the native tibia module; retain its logical ID without drawing a second limb');
        edit('far_upper', {rect: [705,638,279,317], pivot: [58,104],
          offset: [87,274], imageScale: .46, z: 12}, 'Native far thigh replaces the incorrectly assigned wing');
        edit('far_lower', {rect: [995,640,221,338], pivot: [32,42],
          offset: [80.96,-71.76], imageScale: .45, z: 13}, 'Native far tibia and claws follow the observed far knee');
        edit('far_foot', {rect: [0,0,1,1], pivot: [0,0], offset: [0,0],
          imageScale: 1, opacity: 0}, 'Far claws remain inside their native module; no duplicated foot texture');
        edit('near_wing', {rect: [15,333,433,292], pivot: [335,145],
          offset: [-79,352], imageScale: .95, z: 48}, 'The visible near arm uses the actual wing source and its circular hull socket; the long wing is not shrunk into the head silhouette');
        edit('far_wing', {rect: [14,651,416,295], pivot: [288,143],
          offset: [119,405], imageScale: .78, z: 11}, 'The far wing uses its independent source and smaller projection');
        // Keep the existing source-region clip with its native pixels, not with
        // the former, wrongly named limb. Otherwise old wing polygons clip away a thigh.
        for (const [destination, source] of Object.entries({near_upper: 'near_foot',
          near_lower: 'near_wing', far_upper: 'far_foot', far_lower: 'far_wing',
          near_wing: 'near_upper', far_wing: 'far_upper'})) {
          const value = part(machine, destination), polygon = nativeRegions[source].sourceClipPolygonNativeXY;
          if (polygon) value.sourceClipPolygonNativeXY = clone(polygon);
          else delete value.sourceClipPolygonNativeXY;
        }
        delete part(machine, 'near_foot').sourceClipPolygonNativeXY;
        delete part(machine, 'far_foot').sourceClipPolygonNativeXY;
        for (const id of ['near_upper', 'far_upper', 'upper_head', 'lower_jaw',
          'tail', 'near_wing', 'far_wing']) attach(id, 'hull');
        // A floating centre pivot caused the jaw to orbit rather than hinge at the rear.
        edit('lower_jaw', {pivot: [285,103], offset: [-38,9]}, 'Rear jaw hinge stays at the head/hull seam throughout aperture motion');
        removeChannel(part(machine, 'lower_jaw'), 'y', 'jawOpen');
        addChannel(part(machine, 'near_wing'), 'rotation', 'nearBladeSwing');
        addChannel(part(machine, 'far_wing'), 'rotation', 'farBladeSwing');
        for (const side of ['near', 'far']) {
          removeChannel(part(machine, side + '_upper'), 'y', side + 'Lift');
          // Leg HP pools describe the genuine legs after the atlas correction.
          // Their old wing detachment was an artefact of the swapped source regions.
          const wing = part(machine, side + '_wing');
          delete wing.detachment;
          edits.push({part: wing.id, reason: 'Destroying a leg does not detach the anatomically independent wing; existing leg HP flags and leg detachments are retained'});
        }
        break;
      }
      case 'excelsus_mgr2013': {
        // Coordinates name visible cylindrical mounts and knees in each independent source region.
        const sockets = {
          front_near: {upper: [137,30], knee: [39,239], lower: [203,38]},
          front_far: {upper: [164,35], knee: [46,240], lower: [141,36]},
          middle_near: {upper: [151,39], knee: [38,233], lower: [178,32]},
          middle_far: {upper: [154,40], knee: [46,244], lower: [157,35]},
          rear_near: {upper: [113,35], knee: [25,233], lower: [111,37]},
          rear_far: {upper: [54,35], knee: [122,227], lower: [24,37]}
        };
        for (const [prefix, geometry] of Object.entries(sockets)) {
          const upper = part(machine, prefix + '_upper'), lower = part(machine, prefix + '_shin_claw_module');
          const perspective = prefix.endsWith('far') ? .85 : 1;
          const scale = upper.imageScale * perspective;
          edit(upper.id, {pivot: geometry.upper, imageScale: scale}, 'Upper pivot is the actual mount; rear/far chains keep their smaller perspective');
          edit(lower.id, {pivot: geometry.lower, imageScale: lower.imageScale * perspective,
            offset: [(geometry.knee[0] - geometry.upper[0]) * scale,
              -(geometry.knee[1] - geometry.upper[1]) * scale]}, 'Tibia attaches to the native knee instead of an unrelated vertical offset');
          removeChannel(upper, 'y', prefix + 'Lift');
          attach(upper.id, 'hull');
        }
        edit('near_sword_arm', {pivot: [130,45]}, 'Near arm rotates at its cylindrical shoulder mount');
        edit('near_blade', {pivot: [355,95], offset: [-39.702,-78.529]}, 'Near blade wrist is the observed lower arm joint, avoiding a floating blade');
        edit('far_sword_arm', {pivot: [145,34]}, 'Far shoulder retains its independent native arm source');
        edit('far_blade', {pivot: [403,84], offset: [-39.702,-86.408]}, 'Far blade follows the source wrist instead of a 130-pixel detached offset');
        for (const id of ['core', 'near_sword_arm', 'far_sword_arm']) attach(id, 'hull');
        break;
      }
      case 'gander_ghost_gbc2000': {
        // Both source-measured hips must follow the same folding body. The old
        // independent -77 hip translation disagreed with the actual -85 body drop.
        for (const side of ['near', 'far']) {
          const hip = part(machine, side + '_hip'), body = part(machine, 'body_anchor');
          removeChannel(hip, 'y', 'ganderFold');
          edit(hip.id, {parent: 'body_anchor', offset: [hip.offset[0] - body.offset[0],
            hip.offset[1] - body.offset[1]]}, 'Hip remains physically attached to folding body; neutral native position retained');
        }
        edits.push({part: 'near_hip', reason: 'Shared pure pose supplies measured folding chains; source-length knee flexion compensates the actual 85-pixel body descent'});
        break;
      }
      case 'sahelanthropus_mgsv2015':
        for (const side of ['near', 'far']) {
          addChannel(part(machine, side + '_thigh'), 'rotation', side + 'Swing', 1, true);
          addChannel(part(machine, side + '_shin'), 'rotation', side + 'Knee', 1, true);
          addChannel(part(machine, side + '_foot'), 'rotation', side + 'Foot', 1, true);
        }
        edits.push({part: 'near_thigh', reason: 'Native connected knee chain receives explicit walking channels instead of sliding a rigid full body'});
        break;
      case 'kodoque_acid_psp2004':
        for (const side of ['near', 'far']) {
          addChannel(part(machine, side + '_thigh'), 'rotation', side + 'Swing', 1, true);
          addChannel(part(machine, side + '_shin'), 'rotation', side + 'Knee', 1, true);
          addChannel(part(machine, side + '_foot'), 'rotation', side + 'Foot', 1, true);
        }
        edits.push({part: 'near_thigh', reason: 'Existing genuine leg modules now articulate at retained sockets; independent emitter shoulders remain intact'});
        break;
      case 'chaioth_acid2_psp2005':
        for (const side of ['near', 'far']) {
          addChannel(part(machine, side + '_thigh'), 'rotation', side + 'Swing', 1, true);
          addChannel(part(machine, side + '_shin'), 'rotation', side + 'Knee', 1, true);
          addChannel(part(machine, side + '_foot'), 'rotation', side + 'Foot', 1, true);
        }
        edits.push({part: 'central_frame', reason: 'Native yellow mechanical chains retain both sockets and receive explicit gait; no perspective mirroring'});
        break;
      case 'arsenal_gear_mgs2_ps2_2001':
        for (const id of ['near_shoulder', 'far_shoulder', 'aft_hull', 'mast',
          'keel', 'near_panel', 'far_panel', 'hatch']) attach(id, 'central_hull');
        break;
      case 'outer_haven_mgs4_ps3_2008':
        for (const id of ['prow', 'aft_hull', 'keel', 'near_hydroplane',
          'far_hydroplane', 'tail_fin', 'tower', 'missile_hatch']) attach(id, 'mid_hull');
        break;
      default:
        // TX-55 and the independently authored RAY MGS2 neutral joints are retained.
        // Shagohod screws are not spun as flat wheels: their true axial motion needs native frames.
        break;
      }
      // Parentless detachments become children after attachment fixes. Their declared
      // root anchor must still resolve from actual catalogue geometry, never guessed targets.
      if (root.CQC_MACHINE_PARTS?.normalizeCatalog && root.CQC_MACHINE_PARTS?.pose) {
        // This temporary anchor is never returned or drawn. Normalization requires
        // a root anchor even though all destruction flags are false for measurement.
        for (const value of machine.parts) if (value.parent && value.detachment && !value.detachment.anchor) {
          value.detachment.anchor = [0,0];
        }
        const definition = root.CQC_MACHINE_PARTS.normalizeCatalog({schema: adapted.schema, machines: [machine]}).get(machine.id);
        const poses = root.CQC_MACHINE_PARTS.pose(definition, {origin: [0,0], channels: {}, flags: {}, reducedMotion: true});
        for (const value of machine.parts) if (value.detachment) {
          const pose = poses.get(value.id);
          value.detachment.anchor = [pose.matrix[4] / definition.scale[0], -pose.matrix[5] / definition.scale[1]];
        }
      } else if (edits.some(value => value.after?.parent && value.after?.detachment && !value.after.detachment.anchor)) {
        throw Error('Native heavy-rig renderer must be loaded before attachment review');
      }
      if (JSON.stringify(machine.sources) !== beforeSources) throw Error('Native heavy-rig sources unexpectedly changed');
      machine.pass28HeavyRigFixed = true;
      changes.push({id: machine.id, edits, status: edits.length ? 'source-led-correction' : 'observed-native-neutral-retained',
        nativeSourceSHA256: machine.sources.map(source => source.sha256), sourcePixelsChanged: false});
    }
    return {catalog: adapted, changes, limits: [...limits]};
  }
  function rotate(vector, degrees) {
    const angle = degrees * DEG, c = Math.cos(angle), s = Math.sin(angle);
    return [vector[0] * c - vector[1] * s, vector[0] * s + vector[1] * c];
  }
  // Return the two source-length joint angles for a target with a stable hip.
  function solveChain(first, second, firstRotation, secondRotation, lift) {
    const a = rotate(first, firstRotation), b = rotate(second, firstRotation + secondRotation);
    const target = [a[0] + b[0], a[1] + b[1] + lift];
    const aLength = Math.hypot(...first), bLength = Math.hypot(...second), distance = Math.max(.000001, Math.hypot(...target));
    const direction = Math.atan2(target[1], target[0]);
    const spread = Math.acos(clamp((aLength * aLength + distance * distance - bLength * bLength) / (2 * aLength * distance), -1, 1));
    // Choose the branch closest to the native neutral posture instead of forcing the same knee bend on every leg.
    const candidates = [direction + spread, direction - spread].map(angle => {
      const lower = Math.atan2(target[1] - aLength * Math.sin(angle), target[0] - aLength * Math.cos(angle));
      const upperDegrees = angle / DEG - Math.atan2(first[1], first[0]) / DEG;
      const lowerDegrees = lower / DEG - Math.atan2(second[1], second[0]) / DEG - upperDegrees;
      const normalize = value => ((value + 180) % 360 + 360) % 360 - 180;
      return {upper: normalize(upperDegrees - firstRotation), lower: normalize(lowerDegrees - secondRotation)};
    });
    candidates.sort((left, right) => Math.abs(left.upper) + Math.abs(left.lower) - Math.abs(right.upper) - Math.abs(right.lower));
    return {...candidates[0], foot: -candidates[0].upper - candidates[0].lower};
  }
  function presentationPose(id, pose, state = null) {
    if (!pose || !ids.includes(id)) return pose;
    const result = {...pose, flags: {...pose.flags}, channels: {...pose.channels}}, channels = result.channels;
    if (id === 'rex_mgs1_ps1') {
      const lift = clamp(finite(channels.stompLift) ? channels.stompLift : finite(channels.nearLift) ? channels.nearLift : 0, 0, 75);
      const joint = solveChain([-61.6,-74.76], [-22.68,-98.28], 0, 15, lift);
      channels.rexNearStompUpper = joint.upper; channels.rexNearStompLower = joint.lower; channels.rexNearStompFoot = joint.foot;
    }
    if (id === 'mgd_mg2_msx2') {
      const lift = clamp(finite(channels.strideLift) ? channels.strideLift : 0, 0, 95);
      for (const leg of [
        {label: 'Near', first: [-24.44,-81.545], second: [45.57,-110.98], upper: 0, lower: -46},
        {label: 'Far', first: [-19.975,-77.785], second: [42.3,-111.6], upper: 28, lower: -46}
      ]) {
        const joint = solveChain(leg.first, leg.second, leg.upper, leg.lower, lift);
        channels['mgd' + leg.label + 'StrideUpper'] = joint.upper;
        channels['mgd' + leg.label + 'StrideLower'] = joint.lower;
        channels['mgd' + leg.label + 'StrideFoot'] = joint.foot;
      }
    }
    if (id === 'gander_ghost_gbc2000') {
      const fold = clamp(finite(channels.ganderFold) ? channels.ganderFold : 0, 0, 1);
      for (const leg of [
        {label: 'Near', first: [80,-84], second: [-25,-119], upper: -30},
        {label: 'Far', first: [70.7,-88.2], second: [54.6,-102.9], upper: -35}
      ]) {
        const lift = finite(channels['gander' + leg.label + 'Lift']) ? channels['gander' + leg.label + 'Lift']
          : finite(channels[leg.label === 'Near' ? 'nearLift' : 'farLift']) ? channels[leg.label === 'Near' ? 'nearLift' : 'farLift'] : 0;
        const joint = solveChain(leg.first, leg.second, leg.upper, 0, lift + 85 * fold);
        channels['gander' + leg.label + 'Upper'] = joint.upper;
        channels['gander' + leg.label + 'Lower'] = joint.lower;
        channels['gander' + leg.label + 'FootLevel'] = joint.foot;
      }
    }
    // EXCELSUS uses six named support chains, not the generic near/far biped channels.
    if (id === 'excelsus_mgr2013' && Array.isArray(state?.events)) {
      for (const event of state.events) if (event.kind === 'stomp' && finite(event.age) && finite(event.warn)
        && finite(event.active) && event.active > 0 && event.age >= event.warn && event.age < event.warn + event.active) {
        const wave = Math.sin(clamp((event.age - event.warn) / event.active, 0, 1) * Math.PI);
        const mapping = [['front_near'], ['front_far'], ['rear_near','middle_near'], ['rear_far','middle_far']];
        for (const index of event.sources || []) for (const prefix of mapping[index] || []) {
          channels[prefix + 'Swing'] = wave * 10;
          channels[prefix + 'Knee'] = -wave * 10;
        }
      }
    }
    return result;
  }
  // Native source points are absolute pixels inside their unchanged atlas crops.
  // Each array follows the existing Arsenal def.parts order; no HP pool is added.
  const targetParts = Object.freeze({
    tx55: [{part: 'near_shin'}, {part: 'far_shin'}, {part: 'cockpit'}],
    metalgeard: [{part: 'near_proximal_composite'}, {part: 'far_proximal_composite'}, {part: 'body_hull'}],
    rex: [{part: 'radome'}, {part: 'cockpit_interior'}],
    raymass: [{part: 'nearThigh'}, {part: 'head'}],
    shagohod: [{part: 'near_screw'}, {part: 'far_screw'}, {part: 'near_booster'}, {part: 'cockpit_roof'}],
    gander: [{part: 'near_thigh'}, {part: 'far_thigh'}, {part: 'near_rail'}, {part: 'jaw'}],
    sahel: [{part: 'near_shin'}, {part: 'far_shin'}, {part: 'radar_plate'}, {part: 'head'}],
    ray_mgR: [{part: 'near_upper'}, {part: 'far_upper'}, {part: 'upper_head'}],
    excelsus: [{part: 'front_near_upper'}, {part: 'front_far_upper'},
      {part: 'rear_near_upper'}, {part: 'rear_far_upper'}, {part: 'near_blade'},
      {part: 'far_blade'}, {part: 'core'}],
    kodoque: [{part: 'near_emitter'}, {part: 'far_emitter'}, {part: 'reactor'}],
    chaioth: [{part: 'near_thigh'}, {part: 'far_thigh'}, {part: 'railgun_receiver'}, {part: 'central_frame'}],
    arsenal_gear: [{part: 'near_panel'}, {part: 'mast'}, {part: 'far_panel'}, {part: 'central_hull'}],
    outer_haven: [{part: 'near_hydroplane'}, {part: 'tower'}, {part: 'tail_fin'}, {part: 'mid_hull'}]
  });
  const weaponPoints = Object.freeze({
    rex: {part: 'railgun', sourceNativeXY: [58,230]},
    metalgeard: {part: 'three_tube_rotary_gun', sourceNativeXY: [640,454]},
    raymass: {part: 'mouthInterior', sourceNativeXY: [110,805]},
    gander: {part: 'near_rail', sourceNativeXY: [1131,614]},
    shagohod: {part: 'gun_turret', sourceNativeXY: [1162,702]},
    sahel: {part: 'railgun_barrel', sourceNativeXY: [1032,742]},
    ray_mgR: {part: 'lower_jaw', sourceNativeXY: [756,198]},
    chaioth: {part: 'railgun_receiver', sourceNativeXY: [103,998]}
  });
  const audit = Object.freeze({schema: 'cqc.pass28.heavy-native-rig-review/1', ids,
    sourcePixelsChanged: false, simulationMutation: false, absolute1to1Certified: false,
    canonicalDimensions: {mgd_mg2_msx2: {heightM: 8.5, lengthM: 7.9, widthM: 5.76,
      source: 'https://archive.org/download/MetalGear2SolidSnake1990KonamiJPRC767/page/n51.jpg',
      printedPage: 52, sha256: '100b2f624d5fe19d10e0bb6485d99280b267419c2b3ca361830c49514a3b23b9'}},
    limits});
  root.CQC_PASS28_HEAVY_RIG_FIXES = Object.freeze({apply, audit, presentationPose, targetParts, weaponPoints});
})(typeof globalThis !== 'undefined' ? globalThis : this);
