/* Authored Versus arenas and independently positioned scenery. */
(() => {
  'use strict';
  const scriptUrl = document.currentScript.src;
  // Explicit filenames also keep these dependencies visible to the runtime manifest.
  const assetPaths = {
    'power-yard': '../assets/p53-service-yard/power-yard.png',
    'switchgear-hall': '../assets/p53-service-yard/switchgear-hall.png',
    'signals-room': '../assets/p53-service-yard/signals-room.png',
    'armoire': '../assets/p53-service-yard/armoire.png',
    'touret': '../assets/p53-service-yard/touret.png',
    'barriere': '../assets/p53-service-yard/barriere.png',
    'diable': '../assets/p53-service-yard/diable.png',
    'mallette': '../assets/p53-service-yard/mallette.png',
    'magnetophone': '../assets/p53-service-yard/magnetophone.png',
    'casque': '../assets/p53-service-yard/casque.png',
    'combine': '../assets/p53-service-yard/combine.png',
    'strut-c-mess': '../assets/p53-service-yard/strut-c-mess.png',
    'strut-c-serving-cart': '../assets/p53-service-yard/strut-c-serving-cart.png',
    'strut-c-bench': '../assets/p53-service-yard/strut-c-bench.png',
    'strut-f-warehouse': '../assets/p53-service-yard/strut-f-warehouse.png',
    'strut-f-storage-crate': '../assets/p53-service-yard/strut-f-storage-crate.png',
    'strut-f-railing': '../assets/p53-service-yard/strut-f-railing.png',
    'strut-f-pallet-jack': '../assets/p53-service-yard/strut-f-pallet-jack.png',
    'strut-f-service-lamp': '../assets/p53-service-yard/strut-f-service-lamp.png'
  };
  const width = 1280, height = 720, floor = 568;
  const rooms = [
    {
      id: 'p53_null_power_yard', name: 'SOUS-STATION · COUR EXTÉRIEURE',
      background: 'power-yard', foot: 0.83, weather: 'temps couvert',
      props: [
        {file: 'armoire', x: 994, y: 520, h: 175, depth: 0.28},
        {file: 'touret', x: 173, y: 545, h: 80, depth: 0.45},
        {file: 'barriere', x: -2, y: 675, h: 99, depth: 0.73, front: true}
      ]
    },
    {
      id: 'p53_null_switchgear_hall', name: 'SOUS-STATION · SALLE DES COMMANDES',
      background: 'switchgear-hall', foot: 0.83, weather: 'intérieur',
      props: [
        {file: 'diable', x: 1140, y: 533, h: 106, depth: 0.36},
        {file: 'mallette', x: 211, y: 545, h: 46, depth: 0.48},
        {file: 'touret', x: 1273, y: 708, h: 114, depth: 0.78, front: true}
      ]
    },
    {
      id: 'p53_null_signals_room', name: 'SOUS-STATION · SALLE D’ÉCOUTE',
      background: 'signals-room', foot: 0.80, weather: 'intérieur',
      props: [
        {file: 'magnetophone', tabletop: [155, 520], sourceHeight: 77},
        {file: 'casque', tabletop: [300, 521], sourceHeight: 41},
        {file: 'combine', tabletop: [1432, 520], sourceHeight: 57},
        {file: 'touret', x: 22, y: 703, h: 85, depth: 0.72, front: true}
      ]
    },
    {
      id: 'p53_big_shell_strut_c_dining', name: 'BIG SHELL · STRUT C · SALLE À MANGER',
      ep: 'MGS2 · SONS OF LIBERTY', background: 'strut-c-mess', foot: 0.82, weather: 'intérieur',
      props: [
        {file: 'strut-c-serving-cart', x: 125, y: 519, h: 95, depth: 0.18},
        {file: 'strut-c-bench', x: 936, y: 544, h: 90, depth: 0.32},
        {file: 'strut-c-bench', x: -46, y: 715, h: 148, depth: 0.84, front: true}
      ]
    },
    {
      id: 'p53_big_shell_strut_f_warehouse', name: 'BIG SHELL · STRUT F · ENTREPÔT',
      ep: 'MGS2 · SONS OF LIBERTY', background: 'strut-f-warehouse', foot: 0.81, weather: 'intérieur',
      props: [
        {file: 'strut-f-pallet-jack', sourceRect: [176, 13, 1421, 854], x: 170, y: 548, h: 90, depth: 0.28},
        {file: 'strut-f-service-lamp', sourceRect: [300, 68, 623, 1191], x: 1236, y: 536, h: 116, depth: 0.20},
        {file: 'strut-f-storage-crate', sourceRect: [120, 267, 1531, 428], x: 1110, y: 544, h: 62, depth: 0.25},
        {file: 'strut-f-railing', sourceRect: [84, 80, 2002, 561], x: 100, y: 714, h: 122, depth: 0.78, front: true},
        {file: 'strut-f-railing', sourceRect: [84, 80, 2002, 561], x: 1180, y: 714, h: 122, depth: 0.78, front: true}
      ]
    }
  ];
  const byId = new Map(rooms.map(room => [room.id, room]));
  const images = new Map();
  const pending = new Map();
  const stages = rooms.map(room => ({
    id: room.id, name: room.name, ep: room.ep || 'PORTABLE OPS · SIMULATION CQC',
    family: 'industriel', sky: ['#58625b', '#34423d', '#18211e'],
    weather: room.weather, props: room.props.map(prop => prop.file)
  }));
  function imageNames(room) {
    return [room.background, ...room.props.map(prop => prop.file)];
  }
  function load(file, retry) {
    const previous = images.get(file);
    if (previous && (previous.state !== 'error' || !retry)) return previous.promise;
    const image = new Image();
    const item = {image, state: 'loading'};
    images.set(file, item);
    item.promise = new Promise(resolve => {
      const finish = ok => {
        item.state = ok ? 'ready' : 'error';
        resolve(ok);
      };
      image.onload = () => finish(image.naturalWidth > 0 && image.naturalHeight > 0);
      image.onerror = () => finish(false);
      image.src = new URL(assetPaths[file], scriptUrl).href;
    });
    return item.promise;
  }
  function status(stage) {
    const room = byId.get(stage?.id);
    if (!room) return {state: 'unknown'};
    const states = imageNames(room).map(file => images.get(file)?.state);
    const state = states.includes('error') ? 'error' : states.every(s => s === 'ready') ? 'ready' :
      states.some(Boolean) ? 'loading' : 'unloaded';
    return {state, authored: true, approved: false, weatherType: stage.weather};
  }
  function preload(stage, options = {}) {
    const room = byId.get(stage?.id);
    if (!room) return Promise.resolve(false);
    if (pending.has(room.id)) return pending.get(room.id);
    // Cache only in-flight work. A shared prop may have recovered in another
    // room, so a completed failure must not prevent this room from starting.
    const job = Promise.all(imageNames(room).map(file => load(file, !!options.retry)))
      .then(items => items.every(Boolean))
      .finally(() => { if (pending.get(room.id) === job) pending.delete(room.id); });
    pending.set(room.id, job);
    return job;
  }
  function draw(ctx, stage, options, front) {
    const room = byId.get(stage?.id);
    if (!room || status(stage).state !== 'ready') return false;
    const camera = options.motion === false ? 0 : Math.min(220, Math.max(-220, options.camera || 0));
    const zoom = Math.min(1.15, Math.max(0.76, options.zoom || 1));
    ctx.save();
    ctx.imageSmoothingEnabled = false;
    if (!front) {
      const img = images.get(room.background).image;
      // Cover both margins at maximum pan. Keep the combat floor registration as the camera zooms.
      const scale = Math.max((width + 64) / img.naturalWidth, floor / (img.naturalHeight * room.foot),
        (height - floor) / (img.naturalHeight * (1 - room.foot))) * Math.max(1, zoom);
      const w = img.naturalWidth * scale, h = img.naturalHeight * scale;
      const left = (width - w) / 2 - camera * 0.12;
      const top = floor - room.foot * h;
      ctx.drawImage(img, left, top, w, h);
      for (const prop of room.props.filter(item => item.tabletop)) {
        const item = images.get(prop.file).image;
        const propH = prop.sourceHeight * scale;
        const propW = propH * item.naturalWidth / item.naturalHeight;
        const [x, y] = prop.tabletop;
        ctx.drawImage(item, left + x * scale - propW / 2, top + y * scale - propH, propW, propH);
      }
    }
    for (const prop of room.props) {
      if (prop.tabletop || !!prop.front !== front) continue;
      const img = images.get(prop.file).image;
      const source = prop.sourceRect;
      const ratio = source ? source[2] / source[3] : img.naturalWidth / img.naturalHeight;
      const h = prop.h * zoom, w = h * ratio;
      const x = width / 2 + (prop.x - width / 2 - camera * prop.depth) * zoom;
      const y = floor + (prop.y - floor) * zoom;
      // Trim transparent padding only while drawing; source PNG bytes stay intact.
      if (source) ctx.drawImage(img, ...source, x - w / 2, y - h, w, h);
      else ctx.drawImage(img, x - w / 2, y - h, w, h);
    }
    ctx.restore();
    return true;
  }
  window.CQC_SERVICE_YARD = {
    stages, owns: stage => byId.has(stage?.id), status, preload,
    drawBackground: (ctx, stage, options = {}) => draw(ctx, stage, options, false),
    drawForeground: (ctx, stage, options = {}) => draw(ctx, stage, options, true)
  };
})();
