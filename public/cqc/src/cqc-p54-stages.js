/* Separate scenery planes. The fight surface stays fixed in world space. */
(() => {
  'use strict';
  const previous = window.CQC_SERVICE_YARD;
  if (!previous || window.CQC_P54_STAGES) return;
  const base = document.currentScript.src;
  const W = 1280, H = 720, FLOOR = 568;
  const paths = {
    sea: '../assets/p54-oil-fence/oil-fence-sunset-background.png',
    pontoon: '../assets/p54-oil-fence/oil-fence-pontoon.png',
    pylon: '../assets/p54-oil-fence/oil-fence-steeple-pylon.png',
    canyon: '../assets/p54-boss-stages/mgs1-canyon-background.png',
    tower: '../assets/p54-boss-stages/mgs1-tower-b-rooftop-background.png',
    africa: '../assets/p54-boss-stages/mgr-r00-africa-avenue-background.png'
  };
  const scenes = [{
    id: 'p54_mgs2_oil_fence_hd', name: 'BIG SHELL · OIL FENCE',
    ep: 'MGS2 · SONS OF LIBERTY', family: 'maritime',
    weather: 'coucher de soleil', sky: ['#edb35b', '#a36832', '#302d23'],
    background: 'sea', foot: .82,
    props: [
      {file: 'pylon', rect: [188, 48, 1162, 937], x: 132, y: 592, h: 298, depth: .30},
      // The source surface is seven pixels below this rectangle's top.
      // y - (112 - 7) / 112 * 96 = 568, independently of zoom and pan.
      {file: 'pontoon', rect: [40, 306, 2094, 112], x: 640, y: 658, h: 96, depth: 0}
    ]
  }, {
    id: 'p54_mgs1_tank_canyon', name: 'SHADOW MOSES · CANYON',
    ep: 'MGS1 · SHADOW MOSES', family: 'arctique', weather: 'nuit polaire',
    sky: ['#91c1ce', '#365d6e', '#132d3d'], background: 'canyon', foot: .82, props: []
  }, {
    id: 'p54_mgs1_hind_tower_b', name: 'SHADOW MOSES · TOUR DE COMMUNICATION B',
    ep: 'MGS1 · SHADOW MOSES', family: 'arctique', weather: 'neige',
    sky: ['#8fa8b0', '#263b4a', '#101b2b'], background: 'tower', foot: .82, props: []
  }, {
    id: 'p54_mgr_r00_africa_avenue', name: 'AFRIQUE · AVENUE DU CONVOI',
    ep: 'REVENGEANCE · R-00', family: 'urbain', weather: 'poussière',
    sky: ['#b7c4ca', '#786c56', '#393a39'], background: 'africa', foot: .82, props: []
  }];
  const byId = new Map(scenes.map(scene => [scene.id, scene]));
  const images = new Map(), inflight = new Map();
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  function geometry(scene, options = {}) {
    const camera = options.motion === false ? 0 : clamp(Number(options.camera) || 0, -220, 220);
    const zoom = clamp(Number(options.zoom) || 1, .76, 1.15);
    return {camera, zoom, props: scene.props.map(prop => {
      const h = prop.h * zoom;
      return {...prop, h, w: h * prop.rect[2] / prop.rect[3],
        x: W / 2 + (prop.x - W / 2 - camera * prop.depth) * zoom,
        y: FLOOR + (prop.y - FLOOR) * zoom};
    })};
  }
  const files = scene => [scene.background, ...scene.props.map(prop => prop.file)];
  function load(file, retry) {
    const old = images.get(file);
    if (old && (old.state !== 'error' || !retry)) return old.promise;
    const image = new Image(), entry = {image, state: 'loading'};
    images.set(file, entry);
    entry.promise = new Promise(resolve => {
      image.onload = () => { entry.state = image.naturalWidth && image.naturalHeight ? 'ready' : 'error'; resolve(entry.state === 'ready'); };
      image.onerror = () => { entry.state = 'error'; resolve(false); };
      image.src = new URL(paths[file], base).href;
    });
    return entry.promise;
  }
  function status(stage) {
    const scene = byId.get(stage?.id);
    if (!scene) return previous.status(stage);
    const states = files(scene).map(file => images.get(file)?.state);
    return {state: states.includes('error') ? 'error' : states.every(s => s === 'ready') ? 'ready' :
      states.some(Boolean) ? 'loading' : 'unloaded', authored: true, approved: false,
      weatherType: scene.weather};
  }
  function preload(stage, options = {}) {
    const scene = byId.get(stage?.id);
    if (!scene) return previous.preload(stage, options);
    if (inflight.has(scene.id)) return inflight.get(scene.id);
    const job = Promise.all(files(scene).map(file => load(file, !!options.retry)))
      .then(loaded => loaded.every(Boolean))
      .finally(() => { if (inflight.get(scene.id) === job) inflight.delete(scene.id); });
    inflight.set(scene.id, job);
    return job;
  }
  function drawBackground(ctx, stage, options = {}) {
    const scene = byId.get(stage?.id);
    if (!scene) return previous.drawBackground(ctx, stage, options);
    if (status(stage).state !== 'ready') return false;
    const {camera, zoom, props} = geometry(scene, options);
    const image = images.get(scene.background).image;
    const scale = Math.max((W + 64) / image.naturalWidth,
      FLOOR / (image.naturalHeight * scene.foot),
      (H - FLOOR) / (image.naturalHeight * (1 - scene.foot))) * Math.max(1, zoom);
    const w = image.naturalWidth * scale, h = image.naturalHeight * scale;
    ctx.save();
    try {
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(image, (W - w) / 2 - camera * .12, FLOOR - scene.foot * h, w, h);
      // A faint reflection belongs to the water; the pontoon never bobs.
      if (scene.background === 'sea' && options.motion !== false && Number.isFinite(options.time)) {
        ctx.save();
        ctx.globalAlpha = .055;
        ctx.strokeStyle = '#f8d48a';
        ctx.lineWidth = 1;
        for (let n = 0; n < 7; n++) {
          const y = 484 + n * 23, x = 810 + Math.sin(options.time * .65 + n) * 9 - camera * .12;
          ctx.beginPath(); ctx.moveTo(x - 28 - n * 4, y); ctx.lineTo(x + 28 + n * 4, y); ctx.stroke();
        }
        ctx.restore();
      }
      for (const prop of props) {
        ctx.drawImage(images.get(prop.file).image, ...prop.rect, prop.x - prop.w / 2,
          prop.y - prop.h, prop.w, prop.h);
      }
    } finally { ctx.restore(); }
    return true;
  }
  const stages = scenes.map(({background, foot, props, ...stage}) => ({...stage, props: props.map(prop => prop.file)}));
  const api = {
    stages: [...previous.stages, ...stages],
    owns: stage => byId.has(stage?.id) || previous.owns(stage), status, preload, drawBackground,
    drawForeground: (ctx, stage, options = {}) => byId.has(stage?.id) ? status(stage).state === 'ready' : previous.drawForeground(ctx, stage, options)
  };
  window.CQC_P54_STAGES = {stages, geometry: (id, options) => byId.has(id) ? geometry(byId.get(id), options) : null};
  window.CQC_SERVICE_YARD = api;
})();
