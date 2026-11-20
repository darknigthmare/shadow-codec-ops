/* Independent scenery planes share a single source camera and a fixed ground. */
(() => {
  'use strict';
  const previous = window.CQC_SERVICE_YARD;
  if (!previous || window.CQC_P55_STAGE_PLANES) return;
  const base = document.currentScript.src;
  const manifestURL = new URL('../assets/p55-stage-planes/manifest.json', base).href;
  const owned = new Set(['p54_mgs1_tank_canyon', 'p54_mgs1_hind_tower_b', 'p54_mgr_r00_africa_avenue']);
  const scenes = new Map(), images = new Map(), inflight = new Map();
  let manifestJob, manifestState = 'unloaded';
  const W = 1280, H = 720, FLOOR = 568;
  const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, Number(n) || 0));
  const own = stage => owned.has(stage?.id);
  function manifest(retry) {
    if (!manifestJob || (retry && manifestState === 'error')) {
      manifestState = 'loading';
      const job = fetch(manifestURL).then(response => {
        if (!response.ok) throw Error('Scenery manifest unavailable');
        return response.json();
      }).then(data => {
        if (!Array.isArray(data.scenes) || data.scenes.length !== owned.size) throw Error('Incomplete scenery manifest');
        const next = new Map();
        for (const scene of data.scenes) {
          if (!owned.has(scene.id) || next.has(scene.id) || !Array.isArray(scene.planes) || scene.planes.length !== 2 ||
              !(scene.width > 0 && scene.height > 0 && scene.foot > 0 && scene.foot < 1)) throw Error('Invalid scenery contract');
          next.set(scene.id, scene);
        }
        scenes.clear(); for (const [id, scene] of next) scenes.set(id, scene);
        manifestState = 'ready';
        return true;
      }).catch(() => { manifestState = 'error'; return false; });
      manifestJob = job;
    }
    return manifestJob;
  }
  function load(file, retry) {
    const old = images.get(file);
    if (old && (old.state !== 'error' || !retry)) return old.promise;
    const image = new Image(), entry = {image, state: 'loading'};
    images.set(file, entry);
    entry.promise = new Promise(resolve => {
      image.onload = () => { entry.state = image.naturalWidth && image.naturalHeight ? 'ready' : 'error'; resolve(entry.state === 'ready'); };
      image.onerror = () => { entry.state = 'error'; resolve(false); };
      image.src = new URL(file, manifestURL).href;
    });
    return entry.promise;
  }
  const files = scene => [scene.background, ...scene.planes.map(plane => plane.file)];
  function status(stage) {
    if (!own(stage)) return previous.status(stage);
    const scene = scenes.get(stage.id), states = scene ? files(scene).map(file => images.get(file)?.state) : [];
    return {state: !scene ? manifestState : states.includes('error') ? 'error' :
      states.every(state => state === 'ready') ? 'ready' : states.some(Boolean) ? 'loading' : 'unloaded',
    authored: true, approved: false, planes: 3, weatherType: stage.weather};
  }
  function preload(stage, options = {}) {
    if (!own(stage)) return previous.preload(stage, options);
    if (inflight.has(stage.id)) return inflight.get(stage.id);
    const job = manifest(!!options.retry).then(ok => ok && scenes.has(stage.id) ?
      Promise.all(files(scenes.get(stage.id)).map(file => load(file, !!options.retry))).then(loaded => loaded.every(Boolean)) : false)
      .finally(() => { if (inflight.get(stage.id) === job) inflight.delete(stage.id); });
    inflight.set(stage.id, job); return job;
  }
  function geometry(id, options = {}) {
    const scene = scenes.get(id); if (!scene) return null;
    const camera = options.motion === false ? 0 : clamp(options.camera, -220, 220);
    const zoom = clamp(options.zoom === undefined ? 1 : options.zoom, .76, 1.15);
    const scale = Math.max((W + 64) / scene.width, FLOOR / (scene.height * scene.foot),
      (H - FLOOR) / (scene.height * (1 - scene.foot))) * Math.max(1, zoom);
    const left = (W - scene.width * scale) / 2, top = FLOOR - scene.height * scene.foot * scale;
    return {camera, zoom, background: [left - camera * .12, top, scene.width * scale, scene.height * scale],
      planes: scene.planes.map(plane => ({...plane, destination: [left + plane.placement[0] * scale - camera * plane.depth,
        top + plane.placement[1] * scale, plane.placement[2] * scale, plane.placement[3] * scale]}))};
  }
  function draw(ctx, stage, options, foreground) {
    if (!own(stage)) return previous[foreground ? 'drawForeground' : 'drawBackground'](ctx, stage, options);
    if (status(stage).state !== 'ready') return false;
    const scene = scenes.get(stage.id), frame = geometry(stage.id, options);
    ctx.save();
    try {
      ctx.imageSmoothingEnabled = true;
      if (!foreground) ctx.drawImage(images.get(scene.background).image, ...frame.background);
      for (const plane of frame.planes) if ((plane.phase === 'foreground') === foreground) {
        ctx.save();
        try {
          // Near-ground scenery cannot put a faint extraction fringe over the actors.
          if (plane.clipBelowFloor) { ctx.beginPath(); ctx.rect(0, FLOOR, W, H - FLOOR); ctx.clip(); }
          ctx.drawImage(images.get(plane.file).image, ...plane.sourceRect, ...plane.destination);
        } finally { ctx.restore(); }
      }
    } finally { ctx.restore(); }
    return true;
  }
  const api = {...previous, owns: stage => own(stage) || previous.owns(stage), status, preload,
    drawBackground: (ctx, stage, options = {}) => draw(ctx, stage, options, false),
    drawForeground: (ctx, stage, options = {}) => draw(ctx, stage, options, true)};
  window.CQC_P55_STAGE_PLANES = {geometry, ids: [...owned]};
  window.CQC_SERVICE_YARD = api;
})();
