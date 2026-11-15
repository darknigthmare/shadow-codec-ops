/* Source-measured Peace Walker / Portable Ops presentation corrections.
 * Original PNG, logical targets, health, encounter clocks and saves remain intact.
 * The reviewed source camera is retained; no independent reverse view is fabricated.
 */
(function (root) {
  'use strict';
  const clone = value => JSON.parse(JSON.stringify(value));
  const DEG = Math.PI / 180;
  const clamp = (value, low, high) => Math.max(low, Math.min(high, value));
  const finite = value => typeof value === 'number' && Number.isFinite(value);
  const ids = Object.freeze([
    'icbmg_mpo_psp2006', 'raxa_mpo_psp2006', 'zeke_pw_psp2010',
    'pupa_pw_psp2010', 'peacewalker_pw_psp2010', 'chrysalis_pw_psp2010',
    'cocoon_pw_psp2010', 'cunningham_hover_platform_mpo2006',
    'reptile_pod_pw2010', 'avian_pod_pw2010', 'arthropod_pod_pw2010', 'mammal_pod_pw2010'
  ]);
  // Full-atlas coordinates, not a second normalized PNG or a hypothetical component.
  const cocoonSocket = Object.freeze({parent: 'ai_coupler', parentPoint: [663, 338],
    child: 'ai_pod', childPoint: [462, 548]});
  const targetParts = Object.freeze({
    raxa: [{part: 'p1_shin'}, {part: 'p2_shin'}, {part: 'p3_shin'}, {part: 'p4_shin'}, {part: 'body'}],
    bic: [null, null, null, {part: 'guidance_crown_composite'}],
    pupa: [{part: 'near_electrical_gun'}, {part: 'far_electrical_gun'}, {part: 'ai_pod'}],
    chrysalis: [{part: 'left_fan_duct'}, {part: 'right_fan_duct'}, {part: 'tail_fan_duct'},
      {part: 'radar_dish'}, {part: 'ai_pod'}],
    cocoon: [{part: 'near_armor_panel'}, {part: 'far_armor_panel'},
      {part: 'main_hull', point: [258, 179]}, {part: 'upper_tower', point: [713, 173]}, {part: 'ai_pod'}],
    peacewalker: [{part: 'front_near_shin'}, {part: 'front_far_shin'}, {part: 'mammal_head'}],
    zeke: [{part: 'railgun_receiver'}, null, {part: 'ai_head'}]
  });
  const dimensions = Object.freeze({
    pupa_pw_psp2010: {heightM: 9.4, lengthM: 25.5, widthM: 10.1, url: 'https://metalgear.fandom.com/wiki/Pupa'},
    chrysalis_pw_psp2010: {heightM: 15.9, lengthM: 44, widthM: 35.1, url: 'https://metalgear.fandom.com/wiki/Chrysalis'},
    cocoon_pw_psp2010: {heightM: 23, lengthM: 41.1, widthM: 25.6,
      heightEvidence: 'primary published Konami weapons-history chart; H:23.0m directly observed',
      evidence: 'Primary height; length and width remain secondary-source citations',
      heightSource: 'https://www.konami.com/mg/mgs5/tpp/jp/evolution/_img/his_pic02_zoom.jpg',
      heightSourceSHA256: 'dc09917d09f220cbc8d3e5028687c37fd0768f6e8b3d51ec48bac607531a4540',
      heightSourceRead: true, previousSecondaryHeightM: 24.3,
      secondaryDimensions: ['lengthM','widthM'], url: 'https://metalgear.fandom.com/wiki/Cocoon'},
    peacewalker_pw_psp2010: {heightM: 16.5, lengthM: 28, widthRangeM: [18.3, 20],
      configuration: 'quadrupedal', excludedBipedalHeightM: 25,
      url: 'https://metalgear.fandom.com/wiki/Peace_Walker_(Basilisk)'}
  });
  const limits = Object.freeze([
    'Pupa, Chrysalis and quadrupedal Peace Walker dimensions remain secondary-source citations. Cocoon height23m is directly read from the original Konami weapons-history chart; its length/width remain secondary. No unread primary art-book page is claimed.',
    'BIC launch clamps and ZEKE missile pods have no independent source component. Their authored logical targets are preserved and have no fabricated PNG socket.',
    'Cocoon plates 3 and 4 use visible integrated hull/tower armor. Only its two already independent panels can detach separately.',
    'Closed Chrysalis fan ducts remain housings. Rotating a complete duct would incorrectly spin its pylon and housing; no hidden rotor texture is invented.',
    'Cunningham remains the reviewed frontal platform. Its unexplored rear propulsion and a mirrored reverse view are not certified.',
    'The new two-link stomp is an authored presentation adaptation driven by existing lift/phase values, not an animation extracted from Peace Walker.'
  ]);
  function atlasPoint(part, point) {
    if (!part?.rect || !part.pivot || !finite(part.imageScale)) throw Error('Missing measured native part');
    return [(point[0] - part.rect[0] - part.pivot[0]) * part.imageScale,
      -(point[1] - part.rect[1] - part.pivot[1]) * part.imageScale];
  }
  function apply(catalog) {
    if (catalog?.schema !== 'cqc.machine-parts/1' || !Array.isArray(catalog.machines)) throw Error('PW source catalogue unavailable');
    const next = clone(catalog), byID = new Map(next.machines.map(machine => [machine.id, machine]));
    const changes = [];
    const cocoon = byID.get('cocoon_pw_psp2010');
    if (cocoon) {
    const coupler = cocoon.parts.find(part => part.id === cocoonSocket.parent);
    const pod = cocoon.parts.find(part => part.id === cocoonSocket.child);
    if (pod?.parent !== coupler?.id || coupler?.rotation || pod?.rotation || coupler?.textureRotation || pod?.textureRotation)
      throw Error('Cocoon socket projection differs from reviewed source');
    const parentSocket = atlasPoint(coupler, cocoonSocket.parentPoint);
    const childSocket = atlasPoint(pod, cocoonSocket.childPoint);
    const previousOffset = pod.offset.slice();
    pod.offset = parentSocket.map((value, index) => value - childSocket[index]);
    if (pod.detachment?.anchor) {
      // Pass27 had measured the old neutral pivot. Keep its target and flight clock.
      pod.detachment.anchor = pod.detachment.anchor.map((value, index) => value + pod.offset[index] - previousOffset[index]);
    }
    changes.push({id: cocoon.id, part: pod.id, kind: 'source-measured-seat-alignment',
      previousOffset, offset: pod.offset.slice(), sockets: clone(cocoonSocket),
      qualification: 'Original concept places the cylindrical pod on the front coupler; native socket points were inspected on both source parts.'});
    }
    const walker = byID.get('peacewalker_pw_psp2010');
    if (walker) for (const [side, suffix, channel] of [
      ['near', 'upper', 'Upper'], ['near', 'shin', 'Lower'], ['near', 'foot', 'Level'],
      ['far', 'upper', 'Upper'], ['far', 'shin', 'Lower'], ['far', 'foot', 'Level']
    ]) {
      const part = walker.parts.find(value => value.id === 'front_' + side + '_' + suffix);
      if (!part) throw Error('PW measured front joint unavailable');
      const previous = clone(part.channels || {});
      const rows = (part.channels?.rotation || []).filter(row => row.channel !== 'pwStomp');
      part.channels = {...(part.channels || {}), rotation: [...rows,
        {channel: 'pwStomp' + (side === 'near' ? 'Near' : 'Far') + channel, factor: 1}]};
      changes.push({id: walker.id, part: part.id, kind: 'measured-two-link-lift', previousChannels: previous,
        channels: clone(part.channels), source: part.source,
        qualification: 'Retains the existing hip/knee/ankle link vectors and texture perspective; the planted foot stays level.'});
    }
    return {catalog: next, changes, limits: limits.slice()};
  }
  // Solve against the exact reviewed hierarchy offsets. At zero lift all deltas are zero.
  function frontLeg(upper, lower, lift) {
    const target = [upper[0] + lower[0], upper[1] + lower[1] + lift];
    const a = Math.hypot(...upper), b = Math.hypot(...lower), distance = Math.max(.000001, Math.hypot(...target));
    const first = Math.atan2(target[1], target[0])
      + Math.acos(clamp((a * a + distance * distance - b * b) / (2 * a * distance), -1, 1));
    const knee = [Math.cos(first) * a, Math.sin(first) * a];
    const second = Math.atan2(target[1] - knee[1], target[0] - knee[0]);
    const upperDelta = (first - Math.atan2(upper[1], upper[0])) / DEG;
    const lowerDelta = (second - Math.atan2(lower[1], lower[0])) / DEG - upperDelta;
    return {upper: upperDelta, lower: lowerDelta, level: -upperDelta - lowerDelta};
  }
  function presentationPose(id, pose) {
    if (id !== 'peacewalker_pw_psp2010' || !pose || typeof pose !== 'object') return pose;
    const channels = {...(pose.channels || {})}, flags = pose.flags || {};
    for (const [side, upper, lower, disabled] of [
      ['Near', [-7, -75], [-62, -107], 'part0Destroyed'],
      ['Far', [67, -32], [-61, -142], 'part1Destroyed']
    ]) {
      const bridgeLift = channels[side.toLowerCase() + 'Lift'];
      const phase = side === 'Near' && finite(channels.pwStomp) ? clamp(channels.pwStomp, 0, 1) : 0;
      const lift = flags[disabled] === true ? 0 : finite(bridgeLift) ? clamp(bridgeLift, 0, 30) : phase * 30;
      const rotations = frontLeg(upper, lower, lift);
      channels['pwStomp' + side + 'Upper'] = rotations.upper;
      channels['pwStomp' + side + 'Lower'] = rotations.lower;
      channels['pwStomp' + side + 'Level'] = rotations.level;
    }
    return {...pose, channels};
  }
  function audit(catalog) {
    const prepared = apply(catalog);
    return {schema: 'cqc.pass28.pw-mpo-rig-audit/1', absolute1to1Certified: false,
      simulationMutation: false, sourcePixelsChanged: false, changes: prepared.changes,
      machines: prepared.catalog.machines.filter(machine => ids.includes(machine.id)).map(machine => ({
        id: machine.id, parts: machine.parts.length, sourcePins: clone(machine.sources),
        result: prepared.changes.some(change => change.id === machine.id) ? 'measured-correction' : 'no-additional-defect-observed-in-reviewed-camera',
        canonicalDimensions: dimensions[machine.id] ? {...clone(dimensions[machine.id]), evidence: dimensions[machine.id].evidence || 'secondary citation; primary page not independently read'} : null
      })), targetParts: clone(targetParts), limits: limits.slice()};
  }
  root.CQC_PASS28_PW_RIG_FIXES = Object.freeze({apply, audit, presentationPose, targetParts,
    dimensions, ids, cocoonSocket, limits});
})(globalThis);
