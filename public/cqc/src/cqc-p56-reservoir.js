/* Original CQC exercise: a water-reclamation chamber, drawn in three planes. */
(() => {
  'use strict';
  const previous = window.CQC_SERVICE_YARD;
  if (!previous || window.CQC_P56_RESERVOIR) return;
  const W = 1280, H = 720, FLOOR = 568;
  const stage = Object.freeze({
    id: 'p56_reservoir_valve_station', name: 'RÉSERVOIR · STATION DES VANNES',
    ep: 'CQC · EXERCICE', family: 'industriel', weather: 'intérieur',
    sky: ['#789d98', '#294b4c', '#12292e'],
    props: ['chambre-béton', 'pompes-de-reprise', 'bassin-inférieur'],
    original: true
  });
  const owns = value => value?.id === stage.id;
  const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));
  const number = (n, fallback) => Number.isFinite(Number(n)) ? Number(n) : fallback;
  function geometry(options = {}) {
    const reduced = typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const motion = options.motion !== false && !reduced;
    const camera = motion ? clamp(number(options.camera, 0), -220, 220) : 0;
    return {camera, zoom: clamp(number(options.zoom, 1), .76, 1.15),
      time: motion ? number(options.time, 0) : 0, motion, floor: FLOOR,
      planes: [{id: 'chambre', depth: .12, offsetX: -camera * .12},
        {id: 'machines', depth: .34, offsetX: -camera * .34},
        {id: 'bassin', depth: .70, offsetX: -camera * .70, clipTop: 642}]};
  }
  function line(c, color, width, points) {
    c.strokeStyle = color; c.lineWidth = width; c.beginPath();
    c.moveTo(points[0], points[1]);
    for (let n = 2; n < points.length; n += 2) c.lineTo(points[n], points[n + 1]);
    c.stroke();
  }
  function ellipse(c, x, y, rx, ry, fill, stroke, width = 1) {
    c.beginPath(); c.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
    if (fill) { c.fillStyle = fill; c.fill(); }
    if (stroke) { c.strokeStyle = stroke; c.lineWidth = width; c.stroke(); }
  }
  function bolt(c, x, y) {
    ellipse(c, x, y, 2.4, 2.4, '#a7b5ae');
    line(c, '#3e5555', 1, [x - 1.4, y, x + 1.4, y]);
  }
  function far(c) {
    const wall = c.createLinearGradient(0, 0, 0, FLOOR);
    wall.addColorStop(0, '#0c2028'); wall.addColorStop(.5, '#355456'); wall.addColorStop(1, '#263c40');
    c.fillStyle = wall; c.fillRect(-260, -160, W + 520, H + 320);
    for (let x = -160; x < 1500; x += 188) {
      c.fillStyle = '#263f44'; c.fillRect(x, 102, 164, 394);
      line(c, '#53716f', 2, [x, 102, x + 164, 102, x + 164, 497]);
      line(c, '#192f36', 2, [x, 300, x + 164, 300]);
      for (let y = 128; y < 480; y += 126) {
        bolt(c, x + 12, y); bolt(c, x + 150, y);
      }
    }
    for (let x = -220; x < 1520; x += 330) {
      c.fillStyle = '#162c34'; c.fillRect(x, 0, 30, 540);
      c.fillStyle = '#466365'; c.fillRect(x + 26, 0, 4, 540);
      c.fillStyle = '#0b1d26'; c.fillRect(x - 3, 78, 36, 18);
    }
    // Upper clerestory and non-emissive lower panes share one vanishing line.
    for (let x = -120; x < 1440; x += 208) {
      const glass = c.createLinearGradient(x, 23, x, 118);
      glass.addColorStop(0, '#77938f'); glass.addColorStop(1, '#29474c');
      c.fillStyle = '#0e252d'; c.fillRect(x - 5, 18, 175, 104);
      c.fillStyle = glass; c.fillRect(x, 23, 165, 94);
      for (let p = 1; p < 4; p++) line(c, '#16343b', 4, [x + p * 41, 23, x + p * 41, 117]);
    }
    line(c, '#172f36', 24, [-250, 149, 1540, 149]);
    line(c, '#66827d', 3, [-250, 137, 1540, 137]);
    for (let x = -140; x < 1500; x += 116) {
      line(c, '#1c343b', 2, [x, 154, x, 183, x + 32, 215]);
    }
    // Moisture marks are deterministic, not per-frame noise.
    for (let i = 0; i < 42; i++) {
      const x = (i * 173 + 39) % 1480 - 100, y = 168 + (i * 97) % 270;
      line(c, i % 2 ? '#2c484a' : '#3b5958', 1, [x, y, x - 2, y + 23 + i % 43]);
    }
  }
  function pump(c, x, radius, angle) {
    const y = 364;
    // Housings, flange bolts and rotor all use the same fixed local centre.
    c.fillStyle = '#172f33'; c.fillRect(x - 62, 392, 124, 93);
    c.fillStyle = '#5a6a61'; c.fillRect(x - 72, 470, 144, 18);
    ellipse(c, x, y, radius + 13, radius + 13, '#233b3c', '#6f8c85', 8);
    ellipse(c, x, y, radius + 1, radius + 1, '#102b32', '#a1b2a2', 3);
    c.save(); c.translate(x, y); c.rotate(angle);
    for (let n = 0; n < 6; n++) {
      c.save(); c.rotate(n * Math.PI / 3);
      c.beginPath(); c.moveTo(12, -7); c.lineTo(radius - 9, -24);
      c.lineTo(radius - 6, -5); c.lineTo(17, 10); c.closePath();
      c.fillStyle = '#628b83'; c.fill();
      line(c, '#98b6a6', 1, [18, -6, radius - 12, -18]); c.restore();
    }
    c.restore();
    ellipse(c, x, y, 20, 20, '#7e9890', '#142f35', 4);
    ellipse(c, x, y, 7, 7, '#263e40');
    for (let n = 0; n < 12; n++) {
      const a = n * Math.PI / 6;
      bolt(c, x + Math.cos(a) * (radius + 14), y + Math.sin(a) * (radius + 14));
    }
    // Fixed protective cross-bars remain still over the rotating blades.
    for (const dy of [-34, 0, 34]) line(c, '#375855', 3, [x - radius + 8, y + dy, x + radius - 8, y + dy]);
    c.fillStyle = '#799686'; c.fillRect(x - 29, 437, 58, 6);
  }
  function middle(c, time) {
    // Cable trough and receding service floor stay behind the fighting surface.
    c.fillStyle = '#1a3339'; c.fillRect(-260, 488, 1800, 80);
    c.beginPath(); c.moveTo(-260, 488); c.lineTo(1540, 488);
    c.lineTo(1440, 540); c.lineTo(-160, 540); c.closePath(); c.fillStyle = '#405853'; c.fill();
    for (let x = -200; x < 1500; x += 106) line(c, '#253e40', 1, [640 + (x - 640) * .91, 488, x, 540]);
    line(c, '#1b3c42', 30, [-200, 225, 1520, 225]);
    line(c, '#678a80', 3, [-200, 211, 1520, 211]);
    for (const x of [205, 1075]) {
      line(c, '#132c33', 34, [x, 225, x, 283]);
      line(c, '#6d9185', 3, [x - 16, 228, x - 16, 278]);
      for (const y of [245, 272]) { c.fillStyle = '#516f65'; c.fillRect(x - 23, y, 46, 8); }
      pump(c, x, 77, time * .19 * (x < 640 ? 1 : -1));
    }
    // Central valve cabinet is original functional scenery, not a lore object.
    c.fillStyle = '#1a3438'; c.fillRect(531, 273, 218, 214);
    c.fillStyle = '#4d6b63'; c.fillRect(535, 277, 210, 206);
    line(c, '#7a9686', 2, [537, 278, 744, 278, 744, 483]);
    c.fillStyle = '#162d33'; c.fillRect(555, 300, 170, 56);
    c.fillStyle = '#c3cdb2'; c.font = '12px monospace'; c.textAlign = 'center'; c.fillText('REPRISE / VANNES', 640, 322);
    line(c, '#73b8a3', 2, [570, 341, 590, 341, 598, 334, 607, 347, 620, 339, 710, 339]);
    for (const x of [584, 696]) {
      ellipse(c, x, 401, 27, 27, '#25443f', '#b2a978', 5);
      for (let a = 0; a < 3; a++) line(c, '#b2a978', 3, [x, 401, x + Math.cos(a * Math.PI * 2 / 3) * 23, 401 + Math.sin(a * Math.PI * 2 / 3) * 23]);
      ellipse(c, x, 401, 6, 6, '#b8ae7d');
    }
    for (let x = -180; x < 1500; x += 88) {
      line(c, '#182e33', 5, [x, 458, x, 535]);
      line(c, '#72877b', 2, [x + 2, 459, x + 2, 534]);
    }
    line(c, '#59786d', 5, [-250, 458, 1530, 458]);
    line(c, '#293f40', 3, [-250, 492, 1530, 492]);
  }
  function lane(c) {
    // This drawing registers to the existing 568 world ground; no physics data.
    const deck = c.createLinearGradient(0, FLOOR, 0, 620);
    deck.addColorStop(0, '#6f7c70'); deck.addColorStop(.12, '#495b54'); deck.addColorStop(1, '#253e3f');
    c.fillStyle = deck; c.fillRect(0, FLOOR, W, 74);
    line(c, '#9da88c', 3, [0, FLOOR + 1, W, FLOOR + 1]);
    line(c, '#162e32', 4, [0, 612, W, 612]);
    for (let x = 0; x < W; x += 128) {
      line(c, '#304c49', 1, [x, FLOOR + 5, x + 18, 610]);
      bolt(c, x + 20, 625); bolt(c, x + 108, 625);
      c.fillStyle = '#182f34'; c.fillRect(x + 32, 622, 64, 7);
    }
    for (let x = 22; x < W; x += 36) {
      line(c, '#89917a', 2, [x, FLOOR + 8, x + 14, FLOOR + 8]);
    }
  }
  function near(c, frame) {
    const water = c.createLinearGradient(0, 642, 0, H);
    water.addColorStop(0, '#143d42'); water.addColorStop(.23, '#21716d'); water.addColorStop(1, '#0e333c');
    c.fillStyle = water; c.fillRect(-280, 620, W + 560, 140);
    for (let n = 0; n < 21; n++) {
      const x = (n * 197 + 28) % 1570 - 150 + Math.sin(frame.time * .45 + n) * 7;
      const y = 649 + (n * 23) % 70;
      line(c, n % 3 ? '#3b8b7e' : '#73b1a1', n % 3 ? 1 : 2, [x, y, x + 25 + n % 6 * 9, y]);
    }
    // Only short end frames appear in front, below the playable lane.
    for (const x of [-65, 1303]) {
      c.fillStyle = '#0c252e'; c.fillRect(x, 643, 40, 100);
      line(c, '#4d746b', 3, [x + 35, 643, x + 35, H]);
    }
    for (let n = 0; n < 6; n++) {
      const x = 92 + n * 211, phase = ((frame.time * .38 + n * .217) % 1 + 1) % 1;
      const y = 647 + phase * 43;
      line(c, '#76aaa0', 1, [x, y, x, y + 3]);
    }
  }
  function inPlane(c, frame, n, draw) {
    c.save();
    try {
      c.translate(W / 2 + frame.planes[n].offsetX, FLOOR);
      const scale = n === 0 ? Math.max(1, frame.zoom) : frame.zoom;
      c.scale(scale, scale); c.translate(-W / 2, -FLOOR); draw();
    } finally { c.restore(); }
  }
  function drawBackground(c, value, options = {}) {
    if (!owns(value)) return previous.drawBackground(c, value, options);
    const frame = geometry(options); c.save();
    try { inPlane(c, frame, 0, () => far(c)); inPlane(c, frame, 1, () => middle(c, frame.time)); lane(c); }
    finally { c.restore(); }
    return true;
  }
  function drawForeground(c, value, options = {}) {
    if (!owns(value)) return previous.drawForeground(c, value, options);
    const frame = geometry(options); c.save();
    try {
      c.beginPath(); c.rect(0, 642, W, H - 642); c.clip();
      // The water plane cannot expose an uncovered edge when zooming out.
      const waterFrame = {...frame, zoom: Math.max(1, frame.zoom)};
      inPlane(c, waterFrame, 2, () => near(c, frame));
    } finally { c.restore(); }
    return true;
  }
  const status = value => owns(value) ? {state: 'ready', authored: true, approved: false,
    original: true, procedural: true, planes: 3, weatherType: stage.weather} : previous.status(value);
  const api = {...previous, stages: [...previous.stages, stage],
    owns: value => owns(value) || previous.owns(value), status,
    preload: (value, options = {}) => owns(value) ? Promise.resolve(true) : previous.preload(value, options),
    drawBackground, drawForeground};
  window.CQC_P56_RESERVOIR = {stages: [stage], geometry, width: W, height: H, floor: FLOOR};
  window.CQC_SERVICE_YARD = api;
})();
