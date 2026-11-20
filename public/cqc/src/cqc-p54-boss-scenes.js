/* Edition-specific authored scenery for the fixed Arsenal encounter view. */
(() => {
  'use strict';
  const previous = window.CQC_PASS27_ARSENAL_NATIVE_SCENES;
  const renderer = window.CQC_SERVICE_YARD;
  if (!previous || !renderer || window.CQC_P54_BOSS_SCENES) return;
  const ids = {m1tank: 'p54_mgs1_tank_canyon', hind_d: 'p54_mgs1_hind_tower_b', ray_mgR: 'p54_mgr_r00_africa_avenue'};
  const frames = new WeakMap();
  const own = def => renderer.stages.find(stage => stage.id === ids[def?.id]);
  let pending = null, notice;
  const diagnostics = {backgrounds: 0, foregrounds: 0, loading: 0, last: null};
  function message(text) {
    if (!notice && text) {
      notice = document.createElement('div');
      notice.id = 'cqc-p54-scene-status';
      notice.setAttribute('role', 'status');
      notice.style.cssText = 'position:fixed;bottom:18px;left:20px;padding:10px 14px;background:#101e18;color:#e4ddbf;border:1px solid #637362;z-index:500';
      document.body.append(notice);
    }
    if (notice) { notice.textContent = text; notice.hidden = !text; }
  }
  function reduced() {
    try { return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || JSON.parse(localStorage.getItem('cqc-v044-profile') || '{}').settings?.motion === false; }
    catch { return false; }
  }
  const ready = def => own(def) ? renderer.status(own(def)).state === 'ready' : previous.ready(def);
  const preload = (def, options = {}) => own(def) ? renderer.preload(own(def), options) : previous.preload(def, options);
  function cancelPending() {
    if (pending) pending.cancelled = true;
    pending = null; message(''); previous.cancelPending();
  }
  function deferLaunch(def, mode, resume) {
    if (!own(def)) return previous.deferLaunch(def, mode, resume);
    if (ready(def)) return false;
    if (pending && pending.id === def.id && pending.mode === mode) return true;
    cancelPending();
    const request = {id: def.id, mode, cancelled: false};
    pending = request; message('Transmission du terrain…');
    preload(def, {retry: true}).then(ok => {
      if (request.cancelled || pending !== request) return;
      pending = null;
      if (!ok) { message('Décor indisponible. Relancez pour réessayer.'); return; }
      message(''); resume(def.id, mode);
    }).catch(() => { if (!request.cancelled && pending === request) { pending = null; message('Décor indisponible. Relancez pour réessayer.'); } });
    return true;
  }
  function drawBackground(ctx, state) {
    frames.delete(ctx);
    const stage = own(state?.def);
    if (!stage) return previous.drawBackground(ctx, state);
    ctx.save(); ctx.fillStyle = '#0b1722'; ctx.fillRect(0, 0, 1280, 720); ctx.restore();
    if (!ready(state.def)) {
      diagnostics.loading++;
      if (ctx.canvas?.dataset) ctx.canvas.dataset.nativeSceneState = 'loading';
      if ((ctx.canvas?.width || 0) >= 640) preload(state.def).catch(() => {});
      return true;
    }
    // Position, aim and camera never derive from player.x here.
    const options = {camera: 0, zoom: 1, time: (state.tick || 0) / 60, motion: !reduced()};
    ctx.save(); ctx.translate(0, 30);
    let drawn;
    try { drawn = renderer.drawBackground(ctx, stage, options); }
    finally { ctx.restore(); }
    if (!drawn) return true;
    frames.set(ctx, {id: state.def.id, stage, options});
    diagnostics.backgrounds++;
    diagnostics.last = {machineID: state.def.id, stageID: stage.id, camera: 0, groundY: 598, translationY: 30, authored: true};
    if (ctx.canvas?.dataset) Object.assign(ctx.canvas.dataset, {nativeSceneState: 'ready', stageId: stage.id, stageGroundY: '598'});
    return true;
  }
  function drawForeground(ctx, state) {
    const stage = own(state?.def);
    if (!stage) return previous.drawForeground(ctx, state);
    const frame = frames.get(ctx);
    if (!frame || frame.id !== state.def.id) return false;
    frames.delete(ctx); ctx.save(); ctx.translate(0, 30);
    let drawn;
    try { drawn = renderer.drawForeground(ctx, frame.stage, frame.options); }
    finally { ctx.restore(); }
    if (drawn) diagnostics.foregrounds++;
    return drawn;
  }
  const api = {
    ...previous, ready, preload, cancelPending, deferLaunch, drawBackground, drawForeground,
    caption: def => own(def) ? 'SIMULATION — ' + own(def).name : previous.caption(def),
    bindings: () => previous.bindings().map(binding => {
      const stage = own(binding);
      return stage ? {...binding, stageID: stage.id, name: stage.name, authored: true, simulation: true} : binding;
    }),
    diagnostics: () => ({...previous.diagnostics(), p54: {...diagnostics, last: diagnostics.last && {...diagnostics.last}}})
  };
  window.CQC_P54_BOSS_SCENES = api;
  window.CQC_PASS27_ARSENAL_NATIVE_SCENES = api;
})();
