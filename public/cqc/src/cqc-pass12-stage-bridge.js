/* Reviewed stage planes shared by CQC engines. Does not change actors, collisions or saves. */
(function (root, factory) {
  'use strict';
  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root && root.document) {
    root.CQC_PASS12_STAGE_NATIVE_EXTENSION?.configureRenderer();
    root.CQC_PASS12_STAGE_BRIDGE = api.createAdapter();
  }
})(typeof globalThis === 'object' ? globalThis : this, function (root) {
  'use strict';
  const CORE_ALIASES = Object.freeze({
    'mgs3-rokovoj-bereg-champ-de-fleurs': 'flower_field',
    'mgs3-sokrovenno-foret': 'sokrovenno',
    'mgs1-shadow-moses-heliport': 'shadow_heliport',
    'mgs2-tanker-pont-exterieur': 'tanker_deck',
    'mgs2-big-shell-heliport': 'big_shell',
    'mgs2-arsenal-gear-interieur': 'arsenal_corridor',
    'mgs4-outer-haven-sommet': 'outer_haven',
    'mgs4-moyen-orient-rue': 'middle_east',
    'pw-mother-base-zeke': 'mother_base',
    'tpp-mother-base-diamond-dogs': 'mother_base_platform',
    'tpp-okb-zero': 'okb_zero',
    'mg1-outer-heaven-hangar-tx-55': 'outer_heaven',
    'mg1-outer-heaven-cellule-tx55': 'outer_heaven',
    'mg2-zanzibar-hangar-metal-gear-d': 'zanzibar',
    'mgr-pakistan-debris-excelsus': 'pakistan_wreck',
    'mgr-world-marshal-toit': 'world_marshal',
    'vr-grille-vr-duel': 'vr_grid'
  });
  const EPISODE_ALIASES = Object.freeze({vr_grid: 'vr_grid', gz_camp: 'camp_omega'});
  const safeID = value => typeof value === 'string' && /^[a-z0-9_-]+$/.test(value);
  const finite = value => typeof value === 'number' && Number.isFinite(value);
  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

  function createAdapter(dependencies = {}) {
    const catalog = dependencies.catalog || root.CQC_STAGE_LAYER_DATA || {stages: []};
    const renderer = dependencies.renderer || root.CQC_STAGE_LAYERS;
    const byID = new Map((catalog.stages || []).map(stage => [stage.id, stage]));
    const coreAliases = {...CORE_ALIASES};
    const episodeAliases = {...EPISODE_ALIASES};
    // New aliases originate only from approved stages and explicitly reviewed target IDs.
    for (const stage of catalog.stages || []) {
      if (!stage.approved || stage.review?.status !== 'accepted_closest') continue;
      for (const id of stage.targetCoreIDs || []) if (safeID(id)) coreAliases[id] = stage.id;
      for (const id of stage.targetEpisodeIDs || []) if (safeID(id)) episodeAliases[id] = stage.id;
    }
    const frames = new WeakMap();
    const decorated = new WeakSet();
    const counters = {coreBackground: 0, coreForeground: 0, episodeBackground: 0, episodeForeground: 0};
    const clock = dependencies.clock || (() => (root.performance?.now?.() || 0) / 1000);
    const reduced = dependencies.reducedMotion || (() => {
      if (root.matchMedia?.('(prefers-reduced-motion: reduce)').matches ||
          root.document?.documentElement?.classList.contains('cqc-reduced-motion') ||
          root.document?.body?.classList.contains('reduced-motion')) return true;
      try {
        if (JSON.parse(root.localStorage?.getItem('cqc-versus.profile.v1') || '{}')?.presentation?.reducedMotion === true) return true;
        const profile = root.localStorage?.getItem('cqc-v044-profile');
        const settings = JSON.parse(profile || '{}')?.settings;
        return settings?.motion === false || settings?.reducedMotion === true;
      } catch (_) { return false; }
    });
    let pendingLaunch = null;
    let coreBank = null;

    function loadingUI() {
      if (dependencies.loadingUI) return dependencies.loadingUI;
      const doc = root.document;
      if (!doc?.createElement) return {show(){}, error(){}, hide(){}};
      let overlay, message, retryButton, cancelButton;
      const ensure = () => {
        if (overlay) return;
        overlay = doc.createElement('div');
        overlay.id = 'cqc-stage-loading'; overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true'); overlay.setAttribute('aria-label', 'Chargement du décor');
        overlay.style.cssText = 'position:fixed;inset:0;z-index:10000;display:flex;align-items:center;justify-content:center;background:#03080ef5;color:#e8eef3;font:16px system-ui,sans-serif';
        const panel = doc.createElement('div'); panel.style.cssText = 'width:min(90vw,420px);text-align:center;padding:32px';
        message = doc.createElement('p'); message.setAttribute('aria-live', 'polite');
        retryButton = doc.createElement('button'); retryButton.textContent = 'RÉESSAYER';
        cancelButton = doc.createElement('button'); cancelButton.textContent = 'ANNULER';
        for (const button of [retryButton, cancelButton]) button.style.cssText = 'padding:12px 18px;margin:8px;border:1px solid #657a88;background:#122637;color:#edf5f8;font:inherit;cursor:pointer';
        panel.append(message, retryButton, cancelButton); overlay.append(panel);
      };
      return {
        show(cancel) { ensure(); message.textContent = 'Chargement du décor…'; retryButton.hidden = true;
          cancelButton.onclick = cancel; if (!overlay.isConnected) doc.body.append(overlay); cancelButton.focus(); },
        error(retry, cancel) { ensure(); message.textContent = 'Le décor n’a pas pu être chargé.';
          retryButton.hidden = false; retryButton.onclick = retry; cancelButton.onclick = cancel; retryButton.focus(); },
        hide() { overlay?.remove(); }
      };
    }
    const ui = loadingUI();

    function resolve(id, surface) {
      const mapped = (surface === 'core' ? coreAliases : episodeAliases)[id];
      const stage = byID.get(mapped);
      return stage?.approved && stage.review?.status === 'accepted_closest' ? mapped : null;
    }
    function coreGround(id) {
      const hint = byID.get(resolve(id, 'core'))?.renderHints?.coreGroundY;
      return finite(hint) && hint >= 568 && hint <= 620 ? hint : 578;
    }
    function preload(id, surface = 'core', options = {}) {
      const mapped = resolve(id, surface);
      return mapped && renderer ? renderer.preload(mapped, options) : Promise.resolve(false);
    }
    function deferLaunch(id, surface, resume, key) {
      const mapped = resolve(id, surface);
      if (!mapped || !renderer || renderer.status(mapped).state === 'ready') return false;
      if (pendingLaunch?.surface === surface && pendingLaunch.key === key) return true;
      if (pendingLaunch) pendingLaunch.cancelled = true;
      const request = {id, surface, mapped, resume, key, cancelled: false};
      pendingLaunch = request;
      const cancel = () => { request.cancelled = true; if (pendingLaunch === request) pendingLaunch = null; ui.hide(); };
      const load = async retry => {
        ui.show(cancel);
        let loaded = false;
        try { loaded = await preload(id, surface, {retry}); } catch (_) { /* The retry state stays visible. */ }
        if (request.cancelled || pendingLaunch !== request) return;
        if (!loaded || renderer.status(mapped).state !== 'ready') { ui.error(() => load(true), cancel); return; }
        pendingLaunch = null; ui.hide(); request.resume();
      };
      load(false);
      return true;
    }
    function deferCoreLaunch(options, resume, presentation = {}) {
      // Core resolves its authoritative boss stage before creating a match. Do not rewrite saved options.
      const stageID = safeID(presentation.stageID) ? presentation.stageID : options?.stage;
      try {
        const imported = coreBank?.status?.();
        if (Array.isArray(imported) && imported.some(stage => stage.id === stageID)) {
          if (pendingLaunch) { pendingLaunch.cancelled = true; pendingLaunch = null; ui.hide(); }
          return false;
        }
      } catch (_) { /* A missing local override falls back to the reviewed native loader. */ }
      return deferLaunch(stageID, 'core', () => resume(options), JSON.stringify([stageID, options]));
    }
    function deferEpisodeLaunch(id, stageID, resume) {
      return deferLaunch(stageID, 'episode', () => resume(id), id);
    }
    function background(ctx, id, surface, ground, options) {
      const mapped = resolve(id, surface);
      if (!mapped || !renderer) { frames.delete(ctx); return false; }
      ctx.save();
      if (byID.get(mapped)?.renderHints?.imageSmoothingEnabled === false) ctx.imageSmoothingEnabled = false;
      ctx.translate(0, ground - 568);
      const drawn = renderer.drawBackground(ctx, mapped, options);
      ctx.restore();
      if (drawn) {
        frames.set(ctx, {mapped, sourceID: id, surface, ground, options});
        counters[surface + 'Background']++;
      } else frames.delete(ctx);
      return drawn;
    }
    function foreground(ctx, id, surface) {
      const frame = frames.get(ctx);
      if (!frame || frame.surface !== surface || frame.sourceID !== id || frame.mapped !== resolve(id, surface)) return false;
      // Reuse the exact background options; wall-clock changes cannot split a frame's registration.
      ctx.save();
      if (byID.get(frame.mapped)?.renderHints?.imageSmoothingEnabled === false) ctx.imageSmoothingEnabled = false;
      // Clip reviewed REX foreground below the fight lane; native alpha residues remain byte-exact.
      const clipY = byID.get(frame.mapped)?.renderHints?.foregroundClipY;
      if (surface === 'core' && finite(clipY) && clipY >= 609 && clipY < 720) {
        ctx.beginPath(); ctx.rect(0, clipY, 1280, 720 - clipY); ctx.clip();
      }
      ctx.translate(0, frame.ground - 568);
      const drawn = renderer.drawForeground(ctx, frame.mapped, frame.options);
      ctx.restore();
      frames.delete(ctx);
      if (drawn) counters[surface + 'Foreground']++;
      return drawn;
    }
    function decorateCoreBank(bank) {
      if (!bank || typeof bank.draw !== 'function' || decorated.has(bank)) return bank;
      coreBank = bank;
      const originalDraw = bank.draw;
      bank.draw = function (ctx, id, camera, front = false, presentation = {}) {
        // Existing explicitly imported local art remains the user's chosen override.
        if (originalDraw.apply(this, arguments)) { frames.delete(ctx); return true; }
        if (front) return foreground(ctx, id, 'core');
        const options = {
          camera: finite(camera?.x) ? clamp(camera.x - 800, -220, 220) : 0,
          zoom: finite(camera?.zoom) ? camera.zoom : 1,
          // REX passes engine-frame time; pause cannot advance its light independently.
          time: finite(presentation.time) ? presentation.time : clock(),
          motion: presentation.reducedMotion !== true && presentation.motion !== false && !reduced(),
          preview: presentation.preview === true,
          allowAmbientLuminance: presentation.preview !== true && presentation.allowAmbientLuminance !== false
        };
        return background(ctx, id, 'core', coreGround(id), options);
      };
      decorated.add(bank);
      if (root.document?.addEventListener) {
        root.document.addEventListener('change', event => {
          if (event.target?.id === 'stage-select' || event.target?.id === 'competition-stage') preload(event.target.value, 'core');
        });
        root.document.addEventListener('DOMContentLoaded', () => {
          const select = root.document.getElementById?.('stage-select');
          if (select?.value) preload(select.value, 'core');
        }, {once: true});
      }
      return bank;
    }
    function episodeBackground(ctx, state, preview = false) {
      const id = state?.stage?.id || state?.op?.stage;
      // Episode actors use an absolute 1280px lane, with no translated world camera.
      // Keep their stable floor underfoot; depth comes from the independently registered planes.
      const options = {camera: 0, zoom: 1, time: (state?.frame || 0) / 60,
        motion: !preview && !reduced(), preview: !!preview};
      return background(ctx, id, 'episode', 596, options);
    }
    function episodeForeground(ctx, state) {
      return foreground(ctx, state?.stage?.id || state?.op?.stage, 'episode');
    }
    function appendVersusStages(stages) {
      if (!Array.isArray(stages)) return 0;
      const seen = new Set(stages.map(stage => stage.id));
      let count = 0;
      for (const stage of catalog.stages || []) {
        const definition = stage.legacyVisualDefinition;
        if (!stage.approved || stage.review?.status !== 'accepted_closest' || !definition ||
            definition.id !== stage.id || seen.has(stage.id)) continue;
        stages.push(JSON.parse(JSON.stringify(definition)));
        seen.add(stage.id); count++;
      }
      return count;
    }
    function status(id, surface = 'core') {
      const mapped = resolve(id, surface);
      return {surface, sourceID: id, mapped, ground: surface === 'core' ? coreGround(id) : 596,
        native: mapped && renderer ? renderer.status(mapped) : null};
    }
    return {decorateCoreBank, episodeBackground, episodeForeground, appendVersusStages, deferCoreLaunch, deferEpisodeLaunch,
      preload, resolve, status, diagnostics: () => ({...counters}),
      aliases: {core: Object.freeze({...coreAliases}), episode: Object.freeze({...episodeAliases})}};
  }
  return {createAdapter, CORE_ALIASES, EPISODE_ALIASES};
});
