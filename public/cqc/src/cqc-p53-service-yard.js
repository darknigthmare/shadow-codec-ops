/* Playable, authored Portable Ops simulations. Original backgrounds and movable props. */
(() => {
  'use strict';
  const root = new URL('../assets/p53-service-yard/', document.currentScript.src);
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
    }
  ];
  const byId = new Map(rooms.map(room => [room.id, room]));
  const images = new Map();
  const pending = new Map();
  const stages = rooms.map(room => ({
    id: room.id, name: room.name, ep: 'PORTABLE OPS · SIMULATION CQC',
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
      image.src = new URL(file + '.png', root).href;
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
    if (!options.retry && pending.has(room.id)) return pending.get(room.id);
    const job = Promise.all(imageNames(room).map(file => load(file, !!options.retry))).then(items => items.every(Boolean));
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
      const h = prop.h * zoom, w = h * img.naturalWidth / img.naturalHeight;
      const x = width / 2 + (prop.x - width / 2 - camera * prop.depth) * zoom;
      const y = floor + (prop.y - floor) * zoom;
      ctx.drawImage(img, x - w / 2, y - h, w, h);
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
