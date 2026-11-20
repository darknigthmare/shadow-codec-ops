/* Original Méridien exercise: propagation benches and relay cabinets under glass. */
(() => {
  'use strict';
  const previous = window.CQC_SERVICE_YARD;
  if (!previous || window.CQC_P58_RELAY_GLASSHOUSE) return;
  const W = 1280, H = 720, FLOOR = 568;
  const stage = Object.freeze({id: 'p58_meridien_relay_glasshouse',
    name: 'MÉRIDIEN · SERRE DES RELAIS', ep: 'CQC · STATION MÉRIDIEN',
    family: 'jardin', weather: 'abri tempéré', sky: ['#8fa79a', '#b8bea4', '#526e62'],
    props: ['vallée-et-verrière', 'tables-de-culture', 'irrigation-de-rive'], original: true});
  const owns = value => value?.id === stage.id;
  const number = (v, fallback) => Number.isFinite(Number(v)) ? Number(v) : fallback;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  function geometry(options = {}) {
    const reduced = typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const motion = options.motion !== false && !reduced;
    const camera = motion ? clamp(number(options.camera, 0), -220, 220) : 0;
    return {camera, zoom: clamp(number(options.zoom, 1), .76, 1.15),
      time: motion ? number(options.time, 0) : 0, motion, floor: FLOOR,
      planes: [{id: 'vallée-verrière', depth: .10, offsetX: -camera * .10},
        {id: 'culture-relais', depth: .33, offsetX: -camera * .33},
        {id: 'irrigation', depth: .70, offsetX: -camera * .70, clipTop: 642}]};
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
  function oval(c, x, y, rx, ry, color) {
    c.beginPath(); c.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2); c.fillStyle = color; c.fill();
  }
  function glassPoint(u, v) {
    const back = [u * 890, 35 + u * 27], front = [-240 + u * 1340, 187 + u * 38];
    return [back[0] + (front[0] - back[0]) * v, back[1] + (front[1] - back[1]) * v];
  }
  function distant(c) {
    const sky = c.createLinearGradient(0, 0, 0, 530);
    sky.addColorStop(0, '#829c91'); sky.addColorStop(.6, '#bdc4a7'); sky.addColorStop(1, '#d2c6a0');
    c.fillStyle = sky; c.fillRect(-340, -180, 1960, 1040);
    oval(c, 1190, 214, 51, 51, '#e3d8af80');
    polygon(c, '#92a58f', [-340, 401, -170, 320, 80, 361, 248, 299, 441, 371, 630, 314,
      841, 366, 1057, 292, 1260, 362, 1445, 321, 1620, 369, 1620, 720, -340, 720]);
    polygon(c, '#6f8b79', [-340, 459, -153, 394, 53, 438, 270, 363, 449, 427, 650, 377,
      832, 437, 1050, 356, 1250, 425, 1475, 370, 1620, 424, 1620, 720, -340, 720]);
    polygon(c, '#4b705f', [-340, 514, -80, 455, 117, 488, 314, 424, 519, 480, 741, 425,
      950, 482, 1160, 413, 1370, 466, 1620, 441, 1620, 720, -340, 720]);
    line(c, '#afbc9b', 6, [610, 441, 666, 459, 594, 482, 647, 509, 610, 544]);
    for (let i = 0; i < 24; i++) {
      const x = -180 + i * 73, y = 458 + i * 23 % 42;
      polygon(c, '#426455', [x - 12, y + 34, x, y, x + 13, y + 34]);
    }
    // Each pane, beam and supporting post belongs to this same rigid depth plane.
    for (let a = 0; a < 8; a++) for (let b = 0; b < 3; b++) {
      const points = [glassPoint(a / 8, b / 3), glassPoint((a + 1) / 8, b / 3),
        glassPoint((a + 1) / 8, (b + 1) / 3), glassPoint(a / 8, (b + 1) / 3)].flat();
      polygon(c, (a + b) % 3 ? '#d8e3ca32' : '#729b8d45', points);
    }
    for (let n = 0; n <= 8; n++) line(c, '#3c5d54', 5, [...glassPoint(n / 8, 0), ...glassPoint(n / 8, 1)]);
    for (let n = 0; n <= 3; n++) line(c, '#557669', 5, [...glassPoint(0, n / 3), ...glassPoint(1, n / 3)]);
    for (const u of [.24, .64, 1]) {
      const [x, y] = glassPoint(u, 1);
      line(c, '#2c5148', 9, [x, y, x, 533]);
      line(c, '#a1b39c', 2, [x - 2, y, x - 2, 531]);
      const brace = u === 1 ? -61 : 61;
      line(c, '#466a5a', 3, [x, y + 57, x + brace, y + brace * 38 / 1340]);
      c.fillStyle = '#496752'; c.fillRect(x - 19, 524, 38, 14);
    }
    line(c, '#426756', 7, [-260, 468, 1520, 468]);
    for (let x = -220; x < 1540; x += 141) line(c, '#57755e', 4, [x, 468, x, 539]);
  }
  function plant(c, x, y, size, time, seed) {
    // Plant roots never bob: only each leaf rotates gently around its petiole.
    const tip = y - size;
    line(c, '#345d37', 3, [x, y, x + 2, tip]);
    for (let n = 0; n < 5; n++) {
      const yy = tip + n * size * .16, side = n % 2 ? -1 : 1;
      const angle = side * .42 + Math.sin(time * .58 + seed + n * .7) * .055;
      c.save(); c.translate(x + 1, yy); c.rotate(angle);
      polygon(c, n % 2 ? '#557745' : '#7e9258', [0, 0, side * 13, -14, side * 32, -11,
        side * 24, 2, side * 10, 6]);
      line(c, '#a0ab6e', .8, [0, 0, side * 24, -7]); c.restore();
    }
  }
  function bench(c, x, width, time, seed) {
    const top = 458;
    c.fillStyle = '#2a4a40'; c.fillRect(x + 5, top + 15, 9, 66); c.fillRect(x + width - 14, top + 15, 9, 66);
    polygon(c, '#879678', [x - 12, top - 12, x + width - 8, top - 12, x + width + 9, top + 10, x, top + 10]);
    c.fillStyle = '#6c7760'; c.fillRect(x, top + 10, width + 9, 26);
    c.fillStyle = '#273f2e'; c.fillRect(x + 3, top - 7, width - 1, 17);
    line(c, '#acaa7a', 2, [x, top + 10, x + width + 9, top + 10]);
    for (let n = 0; n < 5; n++) plant(c, x + 18 + n * (width - 32) / 4, top + 4,
      52 + (n * 17 + seed) % 47, time, seed + n);
    line(c, '#273e32', 4, [x + 3, top + 44, x + width, top + 44]);
    for (let n = 0; n < 5; n++) { c.fillStyle = '#b4b491'; c.fillRect(x + 13 + n * 36, top + 20, 9, 2); }
  }
  function middle(c, time) {
    polygon(c, '#687f69', [-320, 491, 1600, 491, 1700, 548, -420, 548]);
    for (let x = -300; x < 1650; x += 116) line(c, '#45654e', 1, [640 + (x - 640) * .85, 491, x, 548]);
    line(c, '#9aa88a', 2, [-320, 491, 1600, 491]);
    bench(c, 104, 214, time, 11); bench(c, 343, 170, time, 31);
    bench(c, 790, 198, time, 17); bench(c, 1033, 180, time, 44);
    // Relay cabinets are deliberately integrated into horticultural equipment.
    c.fillStyle = '#28483e'; c.fillRect(556, 354, 167, 170);
    c.fillStyle = '#6a8169'; c.fillRect(560, 358, 159, 161);
    line(c, '#a8b295', 2, [561, 358, 719, 358, 719, 519]);
    c.fillStyle = '#223f36'; c.fillRect(576, 378, 128, 32);
    c.fillStyle = '#dac997'; c.font = '11px monospace'; c.textAlign = 'center'; c.fillText('RELAIS / CULTURE', 640, 398);
    for (let n = 0; n < 5; n++) {
      c.fillStyle = '#253e33'; c.fillRect(576, 428 + n * 13, 90, 3);
      oval(c, 688, 429 + n * 13, 3, 3, '#d9b967');
    }
    line(c, '#394f38', 6, [558, 518, 558, 537, 499, 537]);
    line(c, '#a1a275', 2, [558, 520, 558, 537, 499, 537]);
    for (let x = -260; x < 1600; x += 119) line(c, '#3b5a45', 4, [x, 507, x, 548]);
    line(c, '#98a283', 4, [-320, 507, 1600, 507]);
  }
  function lane(c) {
    // Fixed existing fight datum; drawing this stage never changes collision.
    const slab = c.createLinearGradient(0, FLOOR, 0, 642);
    slab.addColorStop(0, '#a8ad8c'); slab.addColorStop(.1, '#7c896d'); slab.addColorStop(1, '#3b5a49');
    c.fillStyle = slab; c.fillRect(0, FLOOR, W, 74);
    line(c, '#d5c997', 3, [0, FLOOR + 1, W, FLOOR + 1]);
    line(c, '#2e4d3c', 4, [0, 612, W, 612]);
    for (let x = 0; x < W; x += 128) {
      line(c, '#60765a', 1, [x, 573, x + 17, 610]);
      c.fillStyle = '#254336'; c.fillRect(x + 29, 623, 68, 7);
      c.fillStyle = '#adb28d'; c.fillRect(x + 14, 623, 3, 3); c.fillRect(x + 111, 623, 3, 3);
    }
    for (let x = 31; x < W; x += 54) line(c, '#b5b58b', 2, [x, 580, x + 18, 580]);
  }
  function irrigation(c, time) {
    const channel = c.createLinearGradient(0, 620, 0, 760);
    channel.addColorStop(0, '#435b43'); channel.addColorStop(1, '#152f29');
    c.fillStyle = channel; c.fillRect(-320, 620, 1920, 160);
    for (let x = -280; x < 1600; x += 157) line(c, '#668066', 1, [x, 645, x, 760]);
    line(c, '#203b30', 17, [-320, 669, 1600, 669]);
    line(c, '#91a27a', 2, [-320, 662, 1600, 662]);
    for (let x = -240; x < 1600; x += 183) {
      c.fillStyle = '#a1a47c'; c.fillRect(x, 657, 8, 25);
      line(c, '#1c3a2f', 4, [x + 65, 677, x + 65, 691]);
      const phase = ((time * .22 + x * .013) % 1 + 1) % 1;
      oval(c, x + 65, 696 + phase * 25, 1.8, 2.8, '#a2c4a6');
    }
    line(c, '#789475', 2, [-320, 738, 1600, 738]);
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
    if (!owns(value)) return previous.drawBackground(c, value, options);
    const frame = geometry(options); c.save();
    try { plane(c, frame, 0, () => distant(c)); plane(c, frame, 1, () => middle(c, frame.time)); lane(c); }
    finally { c.restore(); }
    return true;
  }
  function drawForeground(c, value, options = {}) {
    if (!owns(value)) return previous.drawForeground(c, value, options);
    const frame = geometry(options); c.save();
    try { c.beginPath(); c.rect(0, 642, W, H - 642); c.clip(); plane(c, frame, 2, () => irrigation(c, frame.time)); }
    finally { c.restore(); }
    return true;
  }
  const status = value => owns(value) ? {state: 'ready', authored: true, approved: false,
    original: true, procedural: true, planes: 3, weatherType: stage.weather} : previous.status(value);
  window.CQC_SERVICE_YARD = {...previous, stages: [...previous.stages, stage],
    owns: value => owns(value) || previous.owns(value), status,
    preload: (value, options = {}) => owns(value) ? Promise.resolve(true) : previous.preload(value, options),
    drawBackground, drawForeground};
  window.CQC_P58_RELAY_GLASSHOUSE = {stages: [stage], geometry, width: W, height: H, floor: FLOOR};
})();
