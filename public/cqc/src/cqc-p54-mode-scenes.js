/* Authored exercise scenery across Core and the existing Versus host frames.
 * This adapter never admits scenery to the reviewed campaign registry. */
(function (root, factory) {
  'use strict';
  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.CQC_P54_MODE_SCENES_FACTORY = api;
  root.CQC_P54_MODE_SCENES = api.createAdapter();
})(typeof globalThis === 'object' ? globalThis : this, function (root) {
  'use strict';
  const safeID = value => typeof value === 'string' && /^[a-z0-9_-]+$/.test(value);
  const finite = value => typeof value === 'number' && Number.isFinite(value);
  const normalize = value => String(value || '').trim().toUpperCase();
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const coreEpisode = episode => {
    const title = normalize(episode);
    for (const [id, pattern] of [['mgs1', /\bMGS1\b/], ['mgs2', /\bMGS2\b/],
      ['mgs3', /\bMGS3\b/], ['mgs4', /\bMGS4\b/], ['pw', /PEACE WALKER/],
      ['mpo', /PORTABLE OPS/], ['gz', /GROUND ZEROES/], ['tpp', /PHANTOM PAIN/],
      ['mgr', /REVENGEANCE/]]) if (pattern.test(title)) return id;
    return 'vr';
  };

  function createAdapter(dependencies = {}) {
    const clock = dependencies.clock || (() => (root.performance?.now?.() || 0) / 1000);
    const document = dependencies.document || root.document;
    const service = host => dependencies.service ? dependencies.service(host) : host?.CQC_SERVICE_YARD;
    const frames = new WeakMap(), previews = new WeakMap(), previewFrames = new WeakMap(), decorated = new WeakSet();
    let pendingLaunch = null, coreBank = null;

    function stages(host = root) {
      const renderer = service(host);
      return (renderer?.stages || []).filter(stage => safeID(stage?.id) &&
        typeof stage.name === 'string' && stage.name.trim() && renderer.owns?.(stage));
    }
    function resolve(value, host = root) {
      const query = typeof value === 'string' ? value : value?.id;
      const list = stages(host);
      const exact = list.find(stage => stage.id === query);
      if (exact) return exact;
      const matching = list.filter(stage => normalize(stage.name) === normalize(query));
      return matching.length === 1 ? matching[0] : null;
    }
    function appendStages(list, host = root) {
      if (!Array.isArray(list)) return 0;
      const seen = new Set(list.map(stage => stage.id));
      let count = 0;
      for (const stage of stages(host)) {
        if (seen.has(stage.id)) continue;
        list.push({...stage, authoredSimulation: true});
        seen.add(stage.id); count++;
      }
      return count;
    }
    function appendCoreStages(list) {
      if (!Array.isArray(list)) return 0;
      const seen = new Set(list.map(stage => stage.id));
      let count = 0;
      for (const stage of stages()) {
        if (seen.has(stage.id)) continue;
        list.push({id: stage.id, name: stage.name + ' · EXERCICE',
          episodeId: coreEpisode(stage.ep),
          template: 'authored-exercise', theme: 'industrial',
          status: 'playable-authored-simulation', artStatus: 'authored-review-pending',
          sourceStatus: 'Original 2D exercise composition; not a certified original-game scene.',
          authoredSimulation: true, approved: false,
          notes: 'Terrain d’exercice libre. Les itinéraires des opérations conservent leurs propres décors.'});
        seen.add(stage.id); count++;
      }
      return count;
    }
    function preload(value, host = root, options = {}) {
      const stage = resolve(value, host);
      return stage ? service(host).preload(stage, options) : Promise.resolve(false);
    }
    function status(value, host = root) {
      const stage = resolve(value, host);
      return stage ? service(host).status(stage) : {state: 'unknown'};
    }
    function placeholder(ctx, failed) {
      ctx.fillStyle = '#081712'; ctx.fillRect(0, 0, 1280, 720);
      ctx.fillStyle = '#b7c5ae'; ctx.font = '700 24px ui-monospace';
      ctx.textAlign = 'center';
      ctx.fillText(failed ? 'Décor indisponible' : 'Chargement du décor…', 640, 110);
    }
    function renderPreview(canvas, value, host = root, options = {}) {
      const stage = resolve(value, host);
      if (!stage) { previews.delete(canvas); previewFrames.delete(canvas); return false; }
      if (previews.get(canvas)?.id !== stage.id) previews.delete(canvas);
      const renderer = service(host), current = renderer.status(stage);
      const ctx = canvas.getContext('2d');
      const drawOptions = {time: options.time ?? clock(), camera: 0, zoom: 1, motion: false, preview: true};
      ctx.save();
      try {
        ctx.setTransform(canvas.width / 1280, 0, 0, canvas.height / 720, 0, 0);
        ctx.clearRect(0, 0, 1280, 720);
        if (!renderer.drawBackground(ctx, stage, drawOptions)) placeholder(ctx, current.state === 'error');
        if (options.foreground && current.state === 'ready') renderer.drawForeground(ctx, stage, drawOptions);
      } finally { ctx.restore(); }
      if (current.state === 'ready') previewFrames.set(canvas, {id: stage.id, host, options: drawOptions});
      else previewFrames.delete(canvas);
      if (canvas.dataset) canvas.dataset.stageArtState = current.state;
      if (current.state === 'ready' || current.state === 'error') { previews.delete(canvas); return true; }
      if (previews.get(canvas)?.id !== stage.id) {
        const token = {id: stage.id}; previews.set(canvas, token);
        renderer.preload(stage).then(() => {
          if (previews.get(canvas) !== token || canvas.isConnected === false) return;
          previews.delete(canvas); options.onReady?.();
        }).catch(() => {
          if (previews.get(canvas) !== token || canvas.isConnected === false) return;
          previews.delete(canvas); options.onReady?.();
        });
      }
      return true;
    }
    function renderPreviewForeground(canvas, value, host = root) {
      const stage = resolve(value, host), renderer = service(host), frame = previewFrames.get(canvas);
      if (!stage || renderer.status(stage).state !== 'ready' || frame?.id !== stage.id || frame.host !== host) return false;
      const ctx = canvas.getContext('2d'); ctx.save();
      try {
        ctx.setTransform(canvas.width / 1280, 0, 0, canvas.height / 720, 0, 0);
        return renderer.drawForeground(ctx, stage, frame.options);
      } finally { ctx.restore(); }
    }
    function decorateCoreBank(bank) {
      if (!bank || typeof bank.draw !== 'function' || decorated.has(bank)) return bank;
      coreBank = bank;
      const originalDraw = bank.draw;
      bank.draw = function (ctx, value, camera, front = false, presentation = {}) {
        const stage = resolve(value);
        if (!stage) { frames.delete(ctx); return originalDraw.apply(this, arguments); }
        // Keep explicitly imported local layers as the user's authoritative override.
        if (originalDraw.apply(this, arguments)) { frames.delete(ctx); return true; }
        const renderer = service(root);
        if (front) {
          const frame = frames.get(ctx); frames.delete(ctx);
          if (!frame || frame.id !== stage.id) return false;
          ctx.save(); ctx.translate(0, 10);
          try { return renderer.drawForeground(ctx, stage, frame.options); }
          finally { ctx.restore(); }
        }
        const options = {camera: finite(camera?.x) ? clamp(camera.x - 800, -220, 220) : 0,
          zoom: finite(camera?.zoom) ? camera.zoom : 1,
          time: finite(presentation.time) ? presentation.time : clock(),
          motion: presentation.reducedMotion !== true && presentation.motion !== false,
          preview: presentation.preview === true};
        ctx.save();
        ctx.fillStyle = '#081712'; ctx.fillRect(0, 0, 1280, 720);
        ctx.translate(0, 10);
        let ready;
        try {
          ready = renderer.drawBackground(ctx, stage, options);
          if (!ready) placeholder(ctx, renderer.status(stage).state === 'error');
        } finally { ctx.restore(); }
        if (ready) frames.set(ctx, {id: stage.id, options});
        else {
          frames.delete(ctx);
          if (!['error', 'loading'].includes(renderer.status(stage).state)) renderer.preload(stage).catch(() => {});
        }
        return true;
      };
      decorated.add(bank); return bank;
    }
    // Parent modes keep late child messages from affecting a newer launch.
    function createLaunchSequence(prefix = 'mode') {
      let serial = 0, current = null;
      return {
        begin() { current = `${prefix}-${Date.now().toString(36)}-${++serial}`; return current; },
        current: () => current,
        accepts: message => current !== null && message?.requestId === current,
        clear() { const previous = current; current = null; return previous; }
      };
    }
    function presentEmbeddedLoadError(overlay, host, message) {
      const engine = host?.__CQC055Versus || host?.__CQC053Versus;
      const childHasRecovery = engine?.getLoadingState?.()?.status === 'failed';
      // The child owns the visible retry/cancel dialog. A parent cover blocks it.
      overlay.classList.toggle('hidden', childHasRecovery);
      if (!childHasRecovery) overlay.textContent = 'Liaison interrompue : ' + String(message || 'Le combat ne peut pas démarrer.');
      return childHasRecovery;
    }
    function loadingUI() {
      if (dependencies.loadingUI) return dependencies.loadingUI;
      let overlay, message, retry, cancel;
      function ensure() {
        if (overlay || !document?.createElement) return;
        overlay = document.createElement('div'); overlay.id = 'cqc-exercise-stage-loading';
        overlay.setAttribute('role', 'dialog'); overlay.setAttribute('aria-modal', 'true');
        overlay.setAttribute('aria-label', 'Chargement du décor');
        overlay.style.cssText = 'position:fixed;inset:0;z-index:10000;display:grid;place-items:center;background:#03080ef5;color:#e8eef3;font:16px system-ui';
        const panel = document.createElement('div'); panel.style.cssText = 'padding:32px;text-align:center';
        message = document.createElement('p'); message.setAttribute('aria-live', 'polite');
        retry = document.createElement('button'); retry.textContent = 'RÉESSAYER';
        cancel = document.createElement('button'); cancel.textContent = 'ANNULER';
        for (const button of [retry, cancel]) button.style.cssText = 'padding:12px 18px;margin:8px;border:1px solid #657a88;background:#122637;color:#edf5f8;font:inherit;cursor:pointer';
        panel.append(message, retry, cancel); overlay.append(panel);
      }
      return {
        show(onCancel) { ensure(); if (!overlay) return; message.textContent = 'Chargement du décor…';
          retry.hidden = true; cancel.onclick = onCancel; if (!overlay.isConnected) document.body.append(overlay); cancel.focus(); },
        error(onRetry, onCancel) { ensure(); if (!overlay) return; message.textContent = 'Le décor n’a pas pu être chargé.';
          retry.hidden = false; retry.onclick = onRetry; cancel.onclick = onCancel; retry.focus(); },
        hide() { overlay?.remove(); }
      };
    }
    const ui = loadingUI();
    function deferCoreLaunch(options, resume, presentation = {}) {
      const stage = resolve(presentation.stageID || options?.stage);
      const imported = stage && coreBank?.status?.().some(row => row.id === stage.id);
      if (!stage || imported || status(stage).state === 'ready') {
        if (pendingLaunch) { pendingLaunch.cancelled = true; pendingLaunch = null; ui.hide(); }
        return false;
      }
      const key = JSON.stringify([stage.id, options]);
      if (pendingLaunch?.key === key) return true;
      if (pendingLaunch) pendingLaunch.cancelled = true;
      const request = {key, cancelled: false}; pendingLaunch = request;
      const cancel = () => { request.cancelled = true; if (pendingLaunch === request) pendingLaunch = null; ui.hide(); };
      const load = async retry => {
        ui.show(cancel);
        let ready = false;
        try { ready = await preload(stage, root, {retry}); } catch (_) { /* Keep retry and cancel visible. */ }
        if (request.cancelled || pendingLaunch !== request) return;
        if (!ready || status(stage).state !== 'ready') { ui.error(() => load(true), cancel); return; }
        pendingLaunch = null; ui.hide(); resume(options);
      };
      load(false); return true;
    }
    return {version: 'cqc-authored-mode-scenes/1', stages, resolve, appendStages, appendCoreStages,
      preload, status, renderPreview, renderPreviewForeground, decorateCoreBank, deferCoreLaunch,
      createLaunchSequence, presentEmbeddedLoadError};
  }
  return {createAdapter};
});
