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
    sahelanthropus_mgsv2015: {near: ['near_thigh', 'near_shin', 'near_foot'], far: ['far_thigh', 'far_shin', 'far_foot']}
  });
  const geometry = new Map();
  const limits = Object.freeze([
    'Native source pixels and admitted projections are retained. This 2D articulation is not extracted original animation or a certified absolute 1:1 reconstruction.',
    'RAY MGR clawed feet now pivot separately at the observed ankles. Their individual toes remain rigid because concealed toe sockets and independent back surfaces are not drawn.',
    'REX MGS1 remains its own incarnation; this helper does not create or relabel an MGS4 REX.',
    'The original source support planes, uniform scale, target/HP pools, weapon origins and existing destruction clocks are preserved. Unverified canonical dimensions are not manufactured.',
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
  function bind(value, channel) {
    value.channels = value.channels || {};
    value.channels.rotation = (value.channels.rotation || []).filter(row => row.channel !== channel);
    value.channels.rotation.push({channel, factor: 1, cosmetic: true});
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
  }
  function apply(catalog) {
    if (catalog?.schema !== 'cqc.machine-parts/1' || !Array.isArray(catalog.machines)) throw Error('Modern source catalogue unavailable');
    const adapted = clone(catalog), changes = [];
    for (const machine of adapted.machines) {
      if (!specifications[machine.id]) continue;
      if (machine.pass29ModernArticulation === true) { remember(machine); continue; }
      const sourcePins = JSON.stringify(machine.sources), edits = [];
      if (machine.id === 'ray_unmanned_mgr2013') {
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
          bind(value, 'pass29Modern' + (side === 'near' ? 'Near' : 'Far') + ['Upper', 'Lower', 'Foot'][index]);
        }
        edits.push({parts: chain.slice(), reason: 'Source-length hip/knee/ankle chain receives support-preserving locomotion; source hip and knee sockets remain attached'});
      }
      if (machine.id === 'sahelanthropus_mgsv2015') {
        for (const side of ['near', 'far']) for (const segment of ['upper_arm', 'forearm', 'hand'])
          bind(part(machine, side + '_' + segment), 'pass29Modern' + (side === 'near' ? 'Near' : 'Far') + {upper_arm: 'Shoulder', forearm: 'Elbow', hand: 'Wrist'}[segment]);
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
  function presentationPose(id, pose) {
    const legs = geometry.get(id);
    if (!pose || !legs) return pose;
    const result = {...pose, flags: {...pose.flags}, channels: {...pose.channels}};
    const channels = result.channels;
    for (const side of ['near', 'far']) {
      const title = side === 'near' ? 'Near' : 'Far', leg = legs[side];
      const wave = clamp(finite(channels[side + 'Swing']) ? channels[side + 'Swing'] / 12 : 0, -1, 1);
      const disabled = result.defeated === true || result.flags['part' + (side === 'near' ? 0 : 1) + 'Destroyed'] === true;
      const lift = disabled || result.reducedMotion ? 0 : clamp(finite(channels[side + 'Lift']) ? channels[side + 'Lift'] : 0, 0, 16);
      const shift = disabled || result.reducedMotion ? 0 : wave * 8;
      // Pass28 REX's near-foot stomp already consumes nearLift when no explicit
      // stompLift exists. Avoid applying the same engine lift twice.
      const effectiveLift = id === 'rex_mgs1_ps1' && side === 'near' && !finite(channels.stompLift) ? 0 : lift;
      const upper = leg.upperRotation + contribution(leg.upperChannels, channels, result.reducedMotion);
      const lower = leg.lowerRotation + contribution(leg.lowerChannels, channels, result.reducedMotion);
      const joint = shift === 0 && effectiveLift === 0 ? {upper: 0, lower: 0, foot: 0}
        : solve(leg.first, leg.second, upper, lower, shift, effectiveLift);
      for (const segment of ['Upper', 'Lower', 'Foot']) channels['pass29Modern' + title + segment] = joint[segment.toLowerCase()];
      if (id === 'sahelanthropus_mgsv2015') {
        const shoulder = disabled || result.reducedMotion ? 0 : -wave * 4;
        const elbow = disabled || result.reducedMotion ? 0 : Math.abs(wave) * 2;
        channels['pass29Modern' + title + 'Shoulder'] = shoulder;
        channels['pass29Modern' + title + 'Elbow'] = elbow;
        channels['pass29Modern' + title + 'Wrist'] = -shoulder - elbow;
      }
    }
    return result;
  }
  root.CQC_PASS29_MODERN_ARTICULATION = Object.freeze({apply, presentationPose, limits,
    audit: Object.freeze({schema: 'cqc.pass29.modern-native-articulation/1', ids: Object.keys(specifications),
      sourcePixelsChanged: false, simulationMutation: false, absolute1to1Certified: false})});
})(typeof globalThis !== 'undefined' ? globalThis : this);
