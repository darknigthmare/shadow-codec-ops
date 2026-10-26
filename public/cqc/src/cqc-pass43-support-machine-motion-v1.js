/* Support's admitted machine rigs consume their real simulation owner's travel.
 * Existing PNGs, joint geometry, engine state and source cameras remain unchanged.
 */
(function (root) {
  'use strict';
  const UIDS = Object.freeze([
    'archive__dwalker', 'archive__walker_gear',
    'completion__mk2_mgs4', 'completion__mk3_mgs4', 'completion__gekko_mgs4',
    'pass19__gekko_missile_mgs4', 'pass19__gekko_suicide_mgs4', 'pass19__gekko_mgr',
    'pass19__dwarf_gekko_trenchcoat_mgs4', 'pass19__dwarf_gekko_humanoid_mgr'
  ]);
  const owned = new Set(UIDS), samples = new WeakMap(), actorCopies = new WeakMap();
  const latest = new Map();
  const finite = Number.isFinite;
  let installed = false, active = null, calls = 0;
  function ensureTrenchcoatHeightRecord() {
    const uid = 'pass19__dwarf_gekko_trenchcoat_mgs4';
    const world = root.CQC_PASS19_WORLD_SCALE;
    // Support appends the reviewed roster without running roster-native.install.
    // Reuse that installer's one qualified record; retain any existing record.
    if (world?.records?.has?.(uid) !== false || typeof world.configure !== 'function') return;
    const registry = root.CQC_PASS19_ROSTER_ADDITIONS?.registry;
    const ref = registry?.candidates?.find(value => value.uid === uid);
    if (!finite(ref?.worldHeightMeters) || ref.worldHeightMeters <= 0 || !Array.isArray(ref.referenceIds)) return;
    const sources = ref.referenceIds.map(id => registry.references?.[id]?.url).filter(value => typeof value === 'string' && /^https:\/\//.test(value));
    if (!sources.length || typeof ref.heightQualification !== 'string') return;
    world.configure({[uid]: {metres: ref.worldHeightMeters,
      evidence: 'estimated-source-incarnation-display', sources,
      scope: ref.heightQualification, absoluteHeightCertified: false}});
  }
  function originalDisplayHeight(physical) {
    // Match the existing bridge's current displayGeometry/drawPlayable framing.
    const state = root.CQC_PASS18_MACHINE_DATA?.states?.[physical], kind = state?.kind;
    return state?.displayHeight > 0 ? state.displayHeight
      : kind === 'heavy_biped' ? 420 : kind === 'small_biped' ? 155
      : kind === 'radial' ? 133 : kind === 'pod' ? 222 : kind === 'authored_vr' ? 250 : 288;
  }
  function presentationCorrection(fighter, face, pose) {
    if ((fighter?.uid !== 'pass19__dwarf_gekko_trenchcoat_mgs4' && fighter?.uid !== 'completion__gekko_mgs4')
      || (fighter.costume && fighter.costume !== 'original')) return 1;
    if (fighter.uid === 'pass19__dwarf_gekko_trenchcoat_mgs4') ensureTrenchcoatHeightRecord();
    if (root.CQC_PASS19_SPATIAL_SCALE_READY === true || pose?.worldScaleApplied === true) return 1;
    const physical = root.CQC_PASS18_MACHINES.physical(fighter, face);
    const height = originalDisplayHeight(physical);
    if (!finite(height) || height <= 0) return 1;
    const measured = root.CQC_PASS19_WORLD_SCALE?.height?.(fighter, {originalPixels: height});
    return finite(measured?.ratio) && measured.ratio > 0 ? measured.ratio : 1;
  }
  function sample(owner, frame) {
    if (!owner || typeof owner !== 'object' || !finite(owner.x) || !finite(frame) || frame < 0) return null;
    const previous = samples.get(owner);
    if (previous && previous.frame === frame && previous.x === owner.x) return previous;
    const deltaFrames = previous && frame > previous.frame ? frame - previous.frame : 0;
    const velocityX = deltaFrames ? (owner.x - previous.x) / deltaFrames : finite(owner.vx) ? owner.vx : 0;
    const value = {frame, x: owner.x, velocityX, measured: deltaFrames > 0};
    samples.set(owner, value);
    return value;
  }
  function actorFor(owner, fighter) {
    let byUID = actorCopies.get(owner);
    if (!byUID) { byUID = new Map(); actorCopies.set(owner, byUID); }
    let actor = byUID.get(fighter.uid);
    if (!actor) { actor = {...fighter}; byUID.set(fighter.uid, actor); }
    return actor;
  }
  function install() {
    if (installed) return true;
    const support = root.CQC_SUPPORT_NATIVE_ACTORS, machines = root.CQC_PASS18_MACHINES;
    if (!support?.drawLead || !machines?.drawPlayable || !machines?.motionContext) return false;
    const drawLead = support.drawLead.bind(support), drawPlayable = machines.drawPlayable.bind(machines);
    support.drawLead = function (ctx, fighter, x, y, face, scale, pose = {}) {
      const previous = active, owner = pose.supportActor;
      const motion = owned.has(fighter?.uid) && (!fighter.costume || fighter.costume === 'original')
        ? sample(owner, pose.supportFrame) : null;
      active = motion ? {ctx, owner, uid: fighter.uid, ...motion} : null;
      try { return drawLead(ctx, fighter, x, y, face, scale, pose); }
      finally { active = previous; }
    };
    machines.drawPlayable = function (ctx, fighter, x, y, face, scale, pose = {}) {
      const context = active;
      const correction = presentationCorrection(fighter, face, pose);
      const renderScale = correction === 1 ? scale : scale * correction;
      if (!context || context.ctx !== ctx || context.uid !== fighter?.uid
        || (fighter.costume && fighter.costume !== 'original')) {
        return drawPlayable(ctx, fighter, x, y, face, renderScale, pose);
      }
      const actor = actorFor(context.owner, fighter);
      actor.x = context.x; actor.vx = context.velocityX; actor.face = face;
      // motionContext expects the physical draw scale, before any camera transform.
      // It already applies source-height/world-height conversion internally, even
      // when Support has not enabled the common spatial draw wrapper. Keep the
      // original scale here; passing renderScale would apply this ratio twice.
      const motion = machines.motionContext({f: actor, x: actor.x, vx: actor.vx, face}, scale);
      if (!motion || !finite(motion.travelX) || !finite(motion.nativeWorldScale) || motion.nativeWorldScale <= 0) {
        return drawPlayable(ctx, fighter, x, y, face, renderScale, pose);
      }
      const moving = Math.abs(context.velocityX) > 1e-9;
      const locomotion = /^(walk|run|dash|idle)$/.test(pose.action || 'idle');
      const action = locomotion ? moving ? Math.abs(context.velocityX) > 7.5 ? 'dash' : 'walk' : 'idle' : pose.action;
      const resolved = {...pose, frame: context.frame, time: context.frame / 60,
        action, walk: locomotion ? moving : pose.walk,
        machineMotion: {...motion, velocityX: context.velocityX, source: 'support-simulation-owner'}};
      calls++;
      latest.set(fighter.uid, {uid: fighter.uid, frame: context.frame, worldX: context.x,
        velocityX: context.velocityX, measured: context.measured, action,
        facing: face, drawScale: scale, renderScale, presentationCorrection: correction, nativeWorldScale: motion.nativeWorldScale,
        travelX: motion.travelX, renderedX: x, renderedY: y, stableOwner: true,
        cameraCoordinatesUsedForTravel: false, sourcePixelsChanged: false});
      return drawPlayable(ctx, actor, x, y, face, renderScale, resolved);
    };
    installed = true;
    return true;
  }
  root.CQC_PASS43_SUPPORT_MACHINE_MOTION = Object.freeze({
    version: 'cqc.pass43.support-machine-owner-motion/1', install, uids: UIDS,
    diagnostics: () => ({installed, calls, entries: [...latest.values()].map(value => ({...value})),
      engineStateMutated: false, sourcePixelsChanged: false,
      qualification: 'Real owner travel supplied to existing source-led gait; no original-game animation or hidden geometry certification.'})
  });
  install();
})(globalThis);
