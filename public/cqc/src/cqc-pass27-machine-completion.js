/* Arsenal-only native part and weapon presentation.
 * Existing source pixels, HP, target coordinates, timelines and saves are retained.
 * Detachment paths and timings are CQC adaptations, not extracted game animation.
 */
(function (root) {
  'use strict';
  const clone = value => JSON.parse(JSON.stringify(value));
  const corrections = Object.freeze({
    hind_d_mgs1_ps1_1998: {
      targets: ['ROTOR', 'MOTEUR', 'COCKPIT'],
      remap: {main_rotor: 0, tail_rotor: 0, canopy: 2, near_wheel: 2, far_wheel: 2}
    },
    dwalker_mgsv2015: {
      targets: ['JAMBE G', 'JAMBE D', 'ARME', 'AI CORE'],
      remap: {gun: 2, sensor: 3}
    },
    walker_gear_mgsv2015: {
      targets: ['JAMBE G', 'JAMBE D', 'CORE'],
      remap: {gun: 2}
    },
    raxa_mpo_psp2006: {
      targets: ['APPUI 1', 'APPUI 2', 'APPUI 3', 'APPUI 4', 'NOYAU'],
      append: {p1_upper: 0, p1_shin: 0, p1_foot: 0,
        p2_upper: 1, p2_shin: 1, p2_foot: 1,
        p3_upper: 2, p3_shin: 2, p3_foot: 2,
        p4_upper: 3, p4_shin: 3, p4_foot: 3}
    },
    pupa_pw_psp2010: {
      targets: ['ÉLECTRODE G', 'ÉLECTRODE D', 'MÉMOIRE'],
      append: {near_electrical_gun: 0, far_electrical_gun: 1, ai_pod: 2}
    },
    peacewalker_pw_psp2010: {
      targets: ['JAMBE G', 'JAMBE D', 'POD MAMMAL'],
      append: {front_near_upper: 0, front_near_shin: 0, front_near_foot: 0,
        rear_near_upper: 0, rear_near_shin: 0, rear_near_foot: 0,
        front_far_upper: 1, front_far_shin: 1, front_far_foot: 1,
        rear_far_upper: 1, rear_far_shin: 1, rear_far_foot: 1, mammal_head: 2}
    },
    cocoon_pw_psp2010: {
      targets: ['PLAQUE 1', 'PLAQUE 2', 'PLAQUE 3', 'PLAQUE 4', 'POD AI'],
      append: {near_armor_panel: 0, far_armor_panel: 1, ai_pod: 4},
      limits: 'Only the two independently drawn armor panels are detached; no other plate is manufactured.'
    },
    zeke_pw_psp2010: {
      targets: ['RAILGUN', 'MISSILES', 'CŒUR AI'],
      keepJets: true,
      limits: 'The target MISSILES is not the jet pack. No independent missile pod source exists in this rig.'
    }
  });
  const arsenalToRig = Object.freeze({hind_d: 'hind_d_mgs1_ps1_1998',
    dwalker: 'dwalker_mgsv2015', walker_column: 'walker_gear_mgsv2015',
    raxa: 'raxa_mpo_psp2006', pupa: 'pupa_pw_psp2010',
    peacewalker: 'peacewalker_pw_psp2010', cocoon: 'cocoon_pw_psp2010',
    zeke: 'zeke_pw_psp2010'});
  const beamEffects = Object.freeze({
    raymass: 'water-cannon', ray_mgR: 'fire-projectile', rex: 'red-laser',
    zeke: 'heavy-rail', battle_gear: 'heavy-rail', gander: 'heavy-rail',
    chrysalis: 'heavy-rail', chaioth: 'heavy-rail',
    pupa: 'volgin-lightning', mk2: 'electrical-contact', mk3: 'emp-pulse'
  });
  const missingCandidates = Object.freeze([
    'pass19__watcher_survive', 'pass19__grabber_survive',
    'pass19__detonator_survive', 'pass19__lord_of_dust_survive',
    'pass19__gekko_grenade_mgs4', 'pass19__gekko_carrier_mgs4',
    'pass19__rescue_box_pw', 'pass19__fenrir_mgr', 'pass19__raptor_mgr',
    'pass19__vodomjerka_mgr', 'pass19__hammerhead_mgr'
  ]);
  let installed = false, installationError = null, registration = null;
  const counts = {machineDraws: 0, correctedBeamDraws: 0, volleyMuzzles: 0};

  function buildCatalog(catalog, parts) {
    if (!catalog || !parts?.normalizeCatalog || !parts?.pose) throw Error('Native machine sources unavailable');
    const before = parts.normalizeCatalog(catalog), adapted = clone(catalog), changed = [];
    for (const machine of adapted.machines) {
      const spec = corrections[machine.id];
      if (!spec) continue;
      const definition = before.get(machine.id);
      const poses = parts.pose(definition, {origin: [0, 0], channels: {}, flags: {}, reducedMotion: true});
      const edits = [];
      for (const [partID, target] of Object.entries(spec.remap || {})) {
        const part = machine.parts.find(value => value.id === partID);
        if (!part?.detachment) throw Error('Missing existing native detachment: ' + machine.id + '/' + partID);
        part.detachment.when = 'part' + target + 'Destroyed';
        part.detachment.clock = 'destroy' + target + 'Frames';
        edits.push({part: partID, target, kind: 'corrected-existing-target'});
      }
      for (const [partID, target] of Object.entries(spec.append || {})) {
        const part = machine.parts.find(value => value.id === partID), pose = poses.get(partID);
        if (!part || !pose || part.detachment) throw Error('Invalid independent native part: ' + machine.id + '/' + partID);
        const direction = pose.matrix[4] < 0 ? -1 : 1;
        const flag = 'part' + target + 'Destroyed';
        // Renderer matrices use Canvas y-down; native detachment anchors use y-up.
        part.detachment = {when: flag, clock: 'destroy' + target + 'Frames',
          anchor: [pose.matrix[4] / definition.scale[0], -pose.matrix[5] / definition.scale[1]], duration: 90,
          vx: direction * .8, vy: 1.8, gravity: .1, spin: direction * 1.2, fade: 24};
        const inheritedRotation = Math.atan2(pose.matrix[1], pose.matrix[0]) * 180 / Math.PI + (part.rotation || 0);
        if (Math.abs(inheritedRotation) > .000001) {
          // Retain a child's source orientation when its parent no longer supplies a transform.
          part.variants = [...(part.variants || []), {when: flag,
            textureRotation: (part.textureRotation || 0) + inheritedRotation}];
        }
        edits.push({part: partID, target, kind: 'existing-native-part-detachment', source: part.source});
      }
      if (spec.keepJets) {
        for (const partID of ['jet_casing', 'jet_nozzles']) {
          const part = machine.parts.find(value => value.id === partID);
          if (!part?.hideWhen?.includes('zekeJetDisabled')) throw Error('ZEKE native jet source contract differs');
          part.hideWhen = part.hideWhen.filter(flag => flag !== 'zekeJetDisabled');
          edits.push({part: partID, kind: 'retained-unrelated-equipment'});
        }
      }
      changed.push({id: machine.id, sourceParts: machine.parts.length, edits,
        sourcePNGFiles: machine.sources.map(source => source.file)});
    }
    if (changed.length !== Object.keys(corrections).length) throw Error('A reviewed machine rig is absent');
    parts.normalizeCatalog(adapted);
    return {catalog: adapted, changed};
  }

  function compatibleState(state) {
    const rig = arsenalToRig[state?.def?.id], spec = corrections[rig];
    if (!spec) return true;
    return Array.isArray(state.def.parts) && state.def.parts.length === spec.targets.length
      && state.def.parts.every((part, index) => part.name === spec.targets[index])
      && Array.isArray(state.hp) && state.hp.length === spec.targets.length;
  }

  function presentationPose(id, pose) {
    if (!pose || id !== 'peacewalker_pw_psp2010') return pose;
    const channels = {...pose.channels};
    // The bridge supplies a 0..30 lift in pixels; the native joint expects a 0..1 phase.
    if (Number.isFinite(channels.pwStomp)) channels.pwStomp = Math.max(0, Math.min(1, channels.pwStomp / 30));
    return {...pose, channels};
  }

  function options() {
    return {noFlash: true, reducedMotion: root.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches === true};
  }
  function createVFX(base, renderer, catalog) {
    if (!base?.event || !renderer?.drawAt || !renderer?.drawBeam) throw Error('Native Arsenal VFX unavailable');
    for (const effect of Object.values(beamEffects)) {
      if (!catalog?.effects?.[effect]) throw Error('Reviewed native effect missing: ' + effect);
    }
    if (!catalog?.effects?.['muzzle-flash']) throw Error('Reviewed native muzzle missing');
    function event(context, eventValue, state) {
      const event = eventValue;
      if (!event || !Number.isFinite(event.age) || !Number.isFinite(event.warn)
        || !Number.isFinite(event.active) || event.active <= 0
        || event.age < event.warn || event.age >= event.warn + event.active) return false;
      const age = event.age - event.warn;
      if (event.kind === 'volley') {
        if (!Number.isFinite(event.from?.x) || !Number.isFinite(event.from?.y)) return false;
        // The simulation already launches three real missiles. Do not draw an extra continuous laser.
        const result = renderer.drawAt(context, 'muzzle-flash', event.from.x, event.from.y, age, 1, options()) === true;
        if (result) counts.volleyMuzzles++;
        return result;
      }
      const effect = event.kind === 'beam' ? beamEffects[state?.def?.id] : null;
      if (!effect) return base.event(context, event, state);
      if (![event.from?.x, event.from?.y, event.x, event.y].every(Number.isFinite)) return false;
      const result = renderer.drawBeam(context, event.from, {x: event.x, y: event.y}, effect, age,
        {...options(), width: 10}) === true;
      if (result) counts.correctedBeamDraws++;
      return result;
    }
    return {...base, event, pass27NativeCompletion: true,
      sourceLimits: base.sourceLimits + ' Native per-machine weapon families; the Arsenal attack remains its authored simulation.'};
  }

  function install() {
    if (installed) return true;
    const parts = root.CQC_MACHINE_PARTS, factory = root.CQC_PASS18_MACHINE_BRIDGE_FACTORY;
    const previous = root.CQC_PASS18_MACHINES, oldVFX = root.CQC_PASS18_ARSENAL_VFX;
    let candidate = null;
    try {
      if (!parts?.create || !factory?.createBridge || !previous?.drawArsenal) throw Error('Native Arsenal bootstrap order differs');
      const prepared = buildCatalog(root.CQC_MACHINE_PARTS_CATALOG, parts);
      const registry = parts.create(prepared.catalog, root.CQC_PASS18_MACHINE_RENDERER_OPTIONS || {});
      const nativeDraw = registry.draw.bind(registry);
      registry.draw = (context, id, pose) => nativeDraw(context, id, presentationPose(id, pose));
      candidate = factory.createBridge({catalog: prepared.catalog, registry});
      if (candidate.status().initializationError) throw Error(candidate.status().initializationError);
      const nextVFX = createVFX(oldVFX, root.CQC_PASS18_VFX, root.CQC_PASS18_VFX_CATALOG);
      const draw = candidate.drawArsenal.bind(candidate);
      candidate.drawArsenal = (context, state, preview = false) => {
        if (!compatibleState(state)) return previous.drawArsenal(context, state, preview);
        const result = draw(context, state, preview);
        if (result) counts.machineDraws++;
        return result;
      };
      registration = prepared.changed;
      root.CQC_PASS18_MACHINES = candidate;
      root.CQC_PASS18_ARSENAL_VFX = nextVFX;
      installed = true;
      installationError = null;
      // Before Arsenal mounts no source has been requested from the predecessor.
      // Retain it as the guarded compatibility fallback if an old authored target layout differs.
      return true;
    } catch (error) {
      candidate?.dispose();
      installationError = String(error?.message || error);
      return false;
    }
  }
  root.CQC_PASS27_MACHINE_COMPLETION = Object.freeze({install, buildCatalog, compatibleState,
    presentationPose, createVFX, corrections, beamEffects,
    status: () => ({schema: 'cqc.pass27.native-machine-completion/1', installed, installationError,
      machines: registration ? clone(registration) : [], counts: {...counts},
      newPlayableUIDs: [], missingNativeCandidates: [...missingCandidates],
      sourcePixelsChanged: false, simulationChanged: false, absolute1to1Certified: false,
      limits: ['Chrysalis has three drawn fan ducts; four generic rotor targets require an authored target-label correction.',
        'The existing Arsenal MGS1 bulldozer still lacks a native MGS1 source; the MG1/MSX drawing is not evidence for that edition.',
        'Only parts already present in a source rig can detach. No humanoid details or new physical dimensions are added.']})});
  install();
})(globalThis);
