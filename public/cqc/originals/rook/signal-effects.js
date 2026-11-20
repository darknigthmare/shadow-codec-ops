/** Original Meridian survey graphics. Sampling has no input, collision or clock state. */
export const SIGNAL_KINDS = Object.freeze(['telemetry-pulse', 'calibration-ping']);
export const SIGNAL_DURATIONS = Object.freeze({
  'telemetry-pulse': Object.freeze({launch: .10, travel: .32, contact: .22, contactStart: .42, total: .64}),
  'calibration-ping': Object.freeze({launch: .14, travel: .46, contact: .30, contactStart: .60, total: .90})
});
const PALETTES = Object.freeze({
  'telemetry-pulse': Object.freeze({bright: '#b6f3db', main: '#64cbb7', dark: '#174d49', miss: '#74958d'}),
  'calibration-ping': Object.freeze({bright: '#ffe0a2', main: '#dfa767', dark: '#655066', miss: '#baa6cc'})
});
const clamp01 = value => Math.max(0, Math.min(1, value));
function point(value, name) {
  if (!value || !Number.isFinite(value.x) || !Number.isFinite(value.y)) throw new TypeError(`${name} requires finite x and y`);
  return {x: value.x, y: value.y};
}
function seedUnit(seed, index) {
  let value = (seed ^ Math.imul(index + 1, 0x45d9f3b)) >>> 0;
  value = Math.imul(value ^ value >>> 16, 0x45d9f3b) >>> 0;
  return ((value ^ value >>> 16) >>> 0) / 0x100000000;
}

/** age is in seconds; origin/target are launch-time snapshots in caller canvas pixels. */
export function sampleSignal(kind, options = {}) {
  if (!SIGNAL_KINDS.includes(kind)) throw new RangeError(`Unknown survey signal: ${kind}`);
  const origin = point(options.origin, 'origin'), target = point(options.target, 'target');
  const age = options.age ?? 0, seedValue = options.seed ?? 0;
  if (!Number.isFinite(age) || !Number.isFinite(seedValue)) throw new TypeError('age and seed must be finite');
  if (options.impact !== undefined && !['hit', 'miss'].includes(options.impact)) throw new RangeError('impact must be hit or miss');
  const seed = Math.trunc(seedValue) >>> 0, reducedMotion = options.reducedMotion === true;
  const impact = options.impact ?? 'miss', timing = SIGNAL_DURATIONS[kind], palette = PALETTES[kind];
  const dx = target.x - origin.x, dy = target.y - origin.y, distance = Math.hypot(dx, dy);
  if (!Number.isFinite(distance)) throw new RangeError('signal endpoints exceed the drawing range');
  const direction = distance > 1e-8 ? {x: dx / distance, y: dy / distance} : {x: 1, y: 0};
  const normal = {x: -direction.y, y: direction.x};
  let phase, phaseProgress;
  if (age < 0) { phase = 'waiting'; phaseProgress = 0; }
  else if (age < timing.launch) { phase = 'launch'; phaseProgress = age / timing.launch; }
  else if (age < timing.contactStart) { phase = 'travel'; phaseProgress = (age - timing.launch) / timing.travel; }
  else if (age < timing.total) { phase = 'contact'; phaseProgress = (age - timing.contactStart) / timing.contact; }
  else { phase = 'done'; phaseProgress = 1; }
  phaseProgress = clamp01(phaseProgress);
  const travelProgress = phase === 'contact' || phase === 'done' ? 1 : phase === 'launch' || phase === 'waiting' ? 0 : clamp01((age - timing.launch) / timing.travel);
  const position = {x: origin.x + dx * travelProgress, y: origin.y + dy * travelProgress};
  const active = phase !== 'waiting' && phase !== 'done';
  const primitives = [];
  const local = (x, y) => ({x: position.x + direction.x * x + normal.x * y, y: position.y + direction.y * x + normal.y * y});
  const path = (points, stroke, width = 2, alpha = 1, close = false, fill = null) => primitives.push({type: 'path', points: points.map(([x, y]) => local(x, y)), stroke, width, alpha, close, fill});
  const circle = (x, y, radius, stroke, width = 2, alpha = 1, fill = null) => primitives.push({type: 'circle', center: local(x, y), radius, stroke, width, alpha, fill});
  const line = (x1, y1, x2, y2, stroke, width = 2, alpha = 1) => path([[x1, y1], [x2, y2]], stroke, width, alpha);
  if (phase === 'launch') {
    const size = reducedMotion ? 12 : 5 + phaseProgress * 12;
    if (kind === 'telemetry-pulse') {
      circle(0, 0, size, palette.main, 1.5, .8);
      for (const sign of [-1, 1]) { line(-size - 6, sign * 4, -size, sign * 4, palette.bright); line(sign * 4, -size - 6, sign * 4, -size, palette.bright); }
      line(-3, 0, 3, 0, palette.bright, 3);
    } else {
      path([[-size, -size / 2], [-size, size / 2], [0, size / 2]], palette.main);
      path([[0, -size / 2], [size, -size / 2], [size, size / 2]], palette.bright);
      line(-4, 0, 4, 0, palette.main, 2);
    }
  } else if (phase === 'travel') {
    if (kind === 'telemetry-pulse') {
      if (!reducedMotion) {
        line(-80, 0, -10, 0, palette.dark, 1.5, .65);
        for (let i = 0; i < 6; i++) {
          const tail = 13 + i * 12, half = 2.5 + seedUnit(seed, i) * 3;
          line(-tail, -half, -tail, half, palette.main, i % 2 ? 1 : 2, .85 - i * .10);
        }
      }
      path([[-8, -4], [3, -4], [9, 0], [3, 4], [-8, 4], [-4, 0]], palette.bright, 1.8, 1, true, palette.dark);
      line(-1, -2, -1, 2, palette.main);
    } else {
      if (!reducedMotion) {
        for (let i = 0; i < 4; i++) circle(-17 - i * 12, (i % 2 ? 1 : -1) * 3, 1.3, palette.miss, 1, .70 - i * .13, palette.miss);
      }
      path([[-10, -8], [-2, 0], [-10, 8]], palette.main, 2.5);
      path([[1, -8], [9, 0], [1, 8]], palette.bright, 2.5);
      line(-4, 0, 4, 0, palette.miss, 1.5);
    }
  } else if (phase === 'contact') {
    const fade = reducedMotion ? 1 : 1 - phaseProgress * .75;
    const size = reducedMotion ? 17 : 10 + phaseProgress * 17;
    const color = impact === 'hit' ? palette.bright : palette.miss;
    if (kind === 'telemetry-pulse') {
      if (impact === 'hit') {
        circle(0, 0, size, palette.main, 1.7, fade);
        circle(0, 0, 3, color, 1.5, fade, palette.dark);
        for (const sign of [-1, 1]) { line(sign * 8, -5, sign * 8, 5, color, 2, fade); line(sign * 13, -3, sign * 13, 3, palette.main, 1, fade); }
      } else {
        path([[-size, -7], [-size, 7], [-size + 5, 7]], color, 1.5, fade);
        path([[size, 7], [size, -7], [size - 5, -7]], color, 1.5, fade);
        line(-3, 0, 3, 0, color, 1.5, fade);
      }
    } else {
      for (const sx of [-1, 1]) for (const sy of [-1, 1]) path([[sx * (size - 6), sy * size], [sx * size, sy * size], [sx * size, sy * (size - 6)]], color, 2, fade);
      if (impact === 'hit') {
        path([[0, -5], [5, 0], [0, 5], [-5, 0]], palette.main, 1.5, fade, true, palette.dark);
        line(-size + 6, 0, -7, 0, palette.main, 1, fade); line(7, 0, size - 6, 0, palette.main, 1, fade);
      } else {
        line(-4, -4, 4, 4, color, 1.3, fade); line(4, -4, -4, 4, color, 1.3, fade);
      }
    }
  }
  return {kind, phase, phaseProgress, active, age, impact, reducedMotion, position, direction, distance, travelProgress, contactStart: timing.contactStart, total: timing.total, primitives};
}

/** Draws only supplied signal geometry. Returns the same sample for caller diagnostics. */
export function drawSignal(ctx, kind, options = {}) {
  const sample = sampleSignal(kind, options);
  if (!sample.active) return sample;
  ctx.save();
  try {
    const inheritedAlpha = Number.isFinite(ctx.globalAlpha) ? ctx.globalAlpha : 1;
    ctx.globalCompositeOperation = 'source-over'; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    for (const primitive of sample.primitives) {
      ctx.globalAlpha = inheritedAlpha * primitive.alpha; ctx.lineWidth = primitive.width; ctx.strokeStyle = primitive.stroke;
      ctx.beginPath();
      if (primitive.type === 'circle') ctx.arc(primitive.center.x, primitive.center.y, primitive.radius, 0, Math.PI * 2);
      else {
        primitive.points.forEach((p, index) => index ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y));
        if (primitive.close) ctx.closePath();
      }
      if (primitive.fill) { ctx.fillStyle = primitive.fill; ctx.fill(); }
      ctx.stroke();
    }
  } finally { ctx.restore(); }
  return sample;
}
