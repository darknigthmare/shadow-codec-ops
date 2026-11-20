/* Original Station Méridien exercise: weather instruments above a quiet city. */
(() => {
  'use strict';
  const previous = window.CQC_SERVICE_YARD;
  if (!previous || window.CQC_P57_BEACON_YARD) return;
  const W = 1280, H = 720, FLOOR = 568;
  const stage = Object.freeze({id: 'p57_meridien_beacon_yard',
    name: 'MÉRIDIEN · COUR DES BALISES', ep: 'CQC · STATION MÉRIDIEN',
    family: 'urbain', weather: 'brise du soir', sky: ['#253d58', '#8e8984', '#d5ad87'],
    props: ['horizon-des-collines', 'mâts-météorologiques', 'rive-de-terrasse'], original: true});
  const own = value => value?.id === stage.id;
  const finite = (value, fallback) => Number.isFinite(Number(value)) ? Number(value) : fallback;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  function geometry(options = {}) {
    const reduced = typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const motion = options.motion !== false && !reduced;
    const camera = motion ? clamp(finite(options.camera, 0), -220, 220) : 0;
    return {camera, zoom: clamp(finite(options.zoom, 1), .76, 1.15),
      time: motion ? finite(options.time, 0) : 0, motion, floor: FLOOR,
      planes: [{id: 'horizon', depth: .10, offsetX: -camera * .10},
        {id: 'terrasses', depth: .33, offsetX: -camera * .33},
        {id: 'rive', depth: .70, offsetX: -camera * .70, clipTop: 642}]};
  }
  function line(c, color, width, p) {
    c.beginPath(); c.moveTo(p[0], p[1]);
    for (let i = 2; i < p.length; i += 2) c.lineTo(p[i], p[i + 1]);
    c.strokeStyle = color; c.lineWidth = width; c.stroke();
  }
  function polygon(c, color, p) {
    c.beginPath(); c.moveTo(p[0], p[1]);
    for (let i = 2; i < p.length; i += 2) c.lineTo(p[i], p[i + 1]);
    c.closePath(); c.fillStyle = color; c.fill();
  }
  function ellipse(c, x, y, rx, ry, color) {
    c.beginPath(); c.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2); c.fillStyle = color; c.fill();
  }
  function distant(c, time) {
    const sky = c.createLinearGradient(0, -60, 0, 550);
    sky.addColorStop(0, '#20374e'); sky.addColorStop(.55, '#81858b'); sky.addColorStop(1, '#d7ad85');
    c.fillStyle = sky; c.fillRect(-340, -180, 1960, 1040);
    ellipse(c, 929, 254, 36, 36, '#dfbc91');
    // A finite, slow drift keeps complete cloud groups inside the overscan.
    const drift = ((time * 1.4) % 2250 + 2250) % 2250;
    for (let n = 0; n < 8; n++) {
      const x = ((n * 317 + drift + 180) % 2250) - 420, y = 111 + (n * 71) % 184;
      ellipse(c, x, y, 105 + n % 3 * 31, 14, '#b2acaa45');
      ellipse(c, x + 51, y - 10, 64, 16, '#c2b9b040');
    }
    polygon(c, '#747c84', [-340, 431, -140, 373, 13, 405, 189, 345, 350, 395, 522, 339,
      700, 391, 865, 352, 1035, 408, 1214, 359, 1430, 405, 1620, 375, 1620, 720, -340, 720]);
    polygon(c, '#596c78', [-340, 489, -83, 412, 83, 456, 272, 400, 447, 454, 650, 401,
      825, 450, 1039, 410, 1251, 454, 1470, 417, 1620, 468, 1620, 720, -340, 720]);
    for (let n = 0; n < 28; n++) {
      const x = -240 + n * 65, y = 435 + (n * 37) % 59, w = 32 + n % 4 * 8;
      c.fillStyle = n % 2 ? '#425d69' : '#4c6470'; c.fillRect(x, y, w, 140);
      c.fillStyle = '#8c92905c'; c.fillRect(x, y, w, 3);
      for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) {
        if ((n + i + j) % 3) { c.fillStyle = '#d0b68c80'; c.fillRect(x + 7 + i * 9, y + 15 + j * 18, 3, 5); }
      }
    }
  }
  function beacon(c, x, y) {
    c.fillStyle = '#384c55'; c.fillRect(x - 7, y + 7, 14, 19);
    ellipse(c, x, y, 15, 8, '#c9986040');
    c.fillStyle = '#d5ad67'; c.fillRect(x - 6, y - 6, 12, 13);
    c.fillStyle = '#f7d895'; c.fillRect(x - 4, y - 4, 3, 9);
    line(c, '#263e49', 3, [x - 10, y + 8, x + 10, y + 8]);
  }
  function mast(c, x, top, time, direction) {
    // Guy wires, cross-arms and instrument rotor share fixed mechanical mounts.
    line(c, '#4a626d', 2, [x - 109, 518, x, top + 48, x + 114, 518]);
    line(c, '#172e3c', 8, [x, 520, x, top]);
    line(c, '#b2b9b0', 2, [x - 2, 518, x - 2, top]);
    line(c, '#536d77', 5, [x - 27, top + 72, x + 45, top + 72]);
    c.fillStyle = '#a3afa6'; c.fillRect(x + 22, top + 64, 21, 17);
    for (let y = top + 100; y < 497; y += 36) line(c, '#849694', 2, [x - 9, y, x + 9, y]);
    const angle = time * .43 * direction;
    for (let n = 0; n < 3; n++) {
      const a = angle + n * Math.PI * 2 / 3, px = x + Math.cos(a) * 28, py = top + Math.sin(a) * 8;
      line(c, '#a5b5b0', 2, [x, top, px, py]);
      ellipse(c, px, py, 7, 4, '#ced0bb');
      ellipse(c, px + 2, py, 3, 3, '#415d68');
    }
    ellipse(c, x, top, 5, 5, '#d3ceaf');
    c.fillStyle = '#2b444f'; c.fillRect(x - 18, 510, 36, 15);
    beacon(c, x + 42, 496);
  }
  function terraces(c, time) {
    polygon(c, '#68747a', [-260, 476, 1530, 476, 1640, 548, -360, 548]);
    for (let x = -250; x < 1550; x += 126) line(c, '#465c66', 1, [640 + (x - 640) * .86, 476, x, 548]);
    line(c, '#92968d', 2, [-260, 476, 1530, 476]);
    for (const [x, w] of [[309, 158], [828, 176]]) {
      polygon(c, '#76848a', [x, 438, x + w, 438, x + w + 26, 461, x - 24, 461]);
      c.fillStyle = '#354e5c'; c.fillRect(x - 24, 461, w + 50, 55);
      for (let a = 0; a < 7; a++) line(c, '#1e394b', 3, [x + 14 + a * 19, 473, x + 14 + a * 19, 500]);
      line(c, '#c8b17c', 2, [x - 19, 462, x + w + 18, 462]);
    }
    // Two distinct original weather masts frame a clear central fighting area.
    mast(c, 147, 239, time, 1); mast(c, 1114, 167, time, -1);
    c.beginPath(); c.moveTo(147, 287); c.quadraticCurveTo(635, 374, 1114, 215);
    c.strokeStyle = '#263d4b'; c.lineWidth = 2; c.stroke();
    c.fillStyle = '#2c4553'; c.fillRect(556, 430, 168, 86);
    c.fillStyle = '#6f8386'; c.fillRect(560, 433, 160, 78);
    c.fillStyle = '#1b3747'; c.fillRect(578, 448, 124, 30);
    c.fillStyle = '#e4d4ae'; c.textAlign = 'center'; c.font = '11px monospace'; c.fillText('MERIDIEN / METEO', 640, 467);
    for (const x of [589, 610, 631, 652, 673, 694]) ellipse(c, x, 494, 3, 3, '#dbba79');
    for (let x = -250; x < 1550; x += 103) {
      line(c, '#263e4d', 4, [x, 487, x, 544]);
      line(c, '#a2a89b', 1, [x + 2, 487, x + 2, 544]);
    }
    line(c, '#9b9f91', 4, [-300, 487, 1570, 487]);
    line(c, '#3b5360', 2, [-300, 520, 1570, 520]);
  }
  function lane(c) {
    // The physical world floor is unchanged, including under pan and zoom.
    const surface = c.createLinearGradient(0, FLOOR, 0, 642);
    surface.addColorStop(0, '#a0a08d'); surface.addColorStop(.09, '#626f73'); surface.addColorStop(1, '#354b59');
    c.fillStyle = surface; c.fillRect(0, FLOOR, W, 74);
    line(c, '#e0c791', 3, [0, FLOOR + 1, W, FLOOR + 1]);
    line(c, '#263e4c', 4, [0, 612, W, 612]);
    for (let x = 0; x < W; x += 128) {
      line(c, '#485d67', 1, [x, FLOOR + 5, x + 14, 610]);
      c.fillStyle = '#1a3343'; c.fillRect(x + 25, 623, 76, 8);
      c.fillStyle = '#9ca99f'; c.fillRect(x + 12, 623, 3, 3); c.fillRect(x + 113, 623, 3, 3);
    }
    for (let x = 38; x < W; x += 62) line(c, '#cbc09b', 2, [x, 580, x + 22, 580]);
  }
  function edge(c) {
    const concrete = c.createLinearGradient(0, 620, 0, H + 30);
    concrete.addColorStop(0, '#2c4656'); concrete.addColorStop(1, '#142c3f');
    c.fillStyle = concrete; c.fillRect(-300, 620, W + 600, 150);
    for (let x = -270; x < 1550; x += 152) {
      line(c, '#5b727c', 1, [x, 647, x, 750]);
      line(c, '#102b3d', 7, [x + 25, 686, x + 126, 686]);
      line(c, '#718487', 1, [x + 25, 682, x + 126, 682]);
    }
    line(c, '#8b948b', 5, [-300, 650, 1580, 650]);
    line(c, '#0d2437', 10, [-300, 713, 1580, 713]);
  }
  function plane(c, frame, n, draw) {
    c.save();
    try {
      c.translate(W / 2 + frame.planes[n].offsetX, FLOOR);
      const scale = n === 1 ? frame.zoom : Math.max(1, frame.zoom);
      c.scale(scale, scale); c.translate(-W / 2, -FLOOR); draw();
    } finally { c.restore(); }
  }
  function drawBackground(c, value, options = {}) {
    if (!own(value)) return previous.drawBackground(c, value, options);
    const frame = geometry(options); c.save();
    try { plane(c, frame, 0, () => distant(c, frame.time)); plane(c, frame, 1, () => terraces(c, frame.time)); lane(c); }
    finally { c.restore(); }
    return true;
  }
  function drawForeground(c, value, options = {}) {
    if (!own(value)) return previous.drawForeground(c, value, options);
    const frame = geometry(options); c.save();
    try { c.beginPath(); c.rect(0, 642, W, H - 642); c.clip(); plane(c, frame, 2, () => edge(c)); }
    finally { c.restore(); }
    return true;
  }
  const status = value => own(value) ? {state: 'ready', authored: true, approved: false,
    original: true, procedural: true, planes: 3, weatherType: stage.weather} : previous.status(value);
  window.CQC_SERVICE_YARD = {...previous, stages: [...previous.stages, stage],
    owns: value => own(value) || previous.owns(value), status,
    preload: (value, options = {}) => own(value) ? Promise.resolve(true) : previous.preload(value, options),
    drawBackground, drawForeground};
  window.CQC_P57_BEACON_YARD = {stages: [stage], geometry, width: W, height: H, floor: FLOOR};
})();
