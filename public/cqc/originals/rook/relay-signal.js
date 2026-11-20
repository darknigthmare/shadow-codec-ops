/** Original station-communication trace. No input, collision, target acquisition or clock. */
export const TRACE_DURATION = Object.freeze({launch: .12, travel: .40, contactStart: .52, contact: .30, total: .82});
const INK = Object.freeze({ice: '#a6e1ed', lilac: '#d9c0ec', core: '#edf5e8', dark: '#31596a', miss: '#8c9cae'});
const clamp = value => Math.max(0, Math.min(1, value));
function snapshot(value, name) {
  if (!value || !Number.isFinite(value.x) || !Number.isFinite(value.y)) throw new TypeError(`${name} requires finite x and y`);
  return {x: value.x, y: value.y};
}
function seeded(seed, index) {
  let value = (seed ^ Math.imul(index + 1, 0x27d4eb2d)) >>> 0;
  value = Math.imul(value ^ value >>> 15, 0x85ebca6b) >>> 0;
  return ((value ^ value >>> 13) >>> 0) / 0x100000000;
}

/** The caller supplies launch-time endpoint snapshots; impact is solely a caller decision. */
export function sampleTrace(options = {}) {
  const origin = snapshot(options.origin, 'origin'), target = snapshot(options.target, 'target');
  const age = options.age ?? 0, rawSeed = options.seed ?? 0;
  if (!Number.isFinite(age) || !Number.isFinite(rawSeed)) throw new TypeError('age and seed must be finite');
  if (options.impact !== undefined && !['hit', 'miss'].includes(options.impact)) throw new RangeError('impact must be hit or miss');
  const impact = options.impact ?? 'miss', reducedMotion = options.reducedMotion === true, seed = Math.trunc(rawSeed) >>> 0;
  const dx = target.x - origin.x, dy = target.y - origin.y, distance = Math.hypot(dx, dy);
  if (!Number.isFinite(distance)) throw new RangeError('trace endpoints exceed the drawing range');
  const direction = distance > 1e-8 ? {x: dx / distance, y: dy / distance} : {x: 1, y: 0};
  const normal = {x: -direction.y, y: direction.x}, angle = Math.atan2(direction.y, direction.x), timing = TRACE_DURATION;
  let phase, phaseProgress;
  if (age < 0) { phase = 'waiting'; phaseProgress = 0; }
  else if (age < timing.launch) { phase = 'launch'; phaseProgress = age / timing.launch; }
  else if (age < timing.contactStart) { phase = 'travel'; phaseProgress = (age - timing.launch) / timing.travel; }
  else if (age < timing.total) { phase = 'contact'; phaseProgress = (age - timing.contactStart) / timing.contact; }
  else { phase = 'done'; phaseProgress = 1; }
  phaseProgress = clamp(phaseProgress);
  const travelProgress = phase === 'done' || phase === 'contact' ? 1 : phase === 'travel' ? clamp((age - timing.launch) / timing.travel) : 0;
  // Exact endpoint values matter to callers comparing the visual and simulation contact frame.
  const position = travelProgress === 1 ? {...target} : travelProgress === 0 ? {...origin} : {x: origin.x + dx * travelProgress, y: origin.y + dy * travelProgress};
  const active = phase !== 'waiting' && phase !== 'done', primitives = [];
  const local = (x, y) => ({x: position.x + direction.x * x + normal.x * y, y: position.y + direction.y * x + normal.y * y});
  const arc = (x, y, radius, start, end, color, width = 1.5, alpha = 1) => primitives.push({type: 'arc', center: local(x, y), radius, start: start + angle, end: end + angle, color, width, alpha});
  const dot = (x, y, radius, color, alpha = 1, filled = true) => primitives.push({type: 'dot', center: local(x, y), radius, color, width: 1.2, alpha, filled});
  const segment = (x1, y1, x2, y2, color, width = 1.5, alpha = 1) => primitives.push({type: 'segment', points: [local(x1, y1), local(x2, y2)], color, width, alpha});
  function pairedArcs(radius, alpha, spread = .24) {
    arc(0, -2, radius, Math.PI + spread, Math.PI * 2 - spread, INK.ice, 1.7, alpha);
    arc(0, 2, radius, spread, Math.PI - spread, INK.lilac, 1.7, alpha);
  }
  if (phase === 'launch') {
    const radius = reducedMotion ? 12 : 6 + phaseProgress * 9;
    pairedArcs(radius, .9, .44);
    dot(0, 0, 2, INK.core);
    if (!reducedMotion) {
      arc(0, -2, radius + 4, Math.PI + .8, Math.PI * 2 - .8, INK.ice, 3, .14);
      arc(0, 2, radius + 4, .8, Math.PI - .8, INK.lilac, 3, .14);
    }
  } else if (phase === 'travel') {
    if (!reducedMotion) {
      for (let i = 0; i < 7; i++) {
        const lag = 12 + i * 10, offset = (i % 2 ? -1 : 1) * (2 + seeded(seed, i) * 2);
        dot(-lag, offset, i < 3 ? 1.4 : 1, i % 2 ? INK.lilac : INK.ice, .72 - i * .08);
      }
    }
    pairedArcs(8, .92, .34);
    dot(0, 0, 2.2, INK.core);
    segment(-3, 0, 3, 0, INK.dark, 1);
  } else if (phase === 'contact') {
    const fade = reducedMotion ? 1 : 1 - phaseProgress * .65;
    const radius = reducedMotion ? 16 : 11 + phaseProgress * 12;
    if (impact === 'hit') {
      pairedArcs(radius, fade, .12);
      dot(0, 0, 2.5, INK.core, fade);
      segment(-6, 0, -3, 0, INK.ice, 1.5, fade);
      segment(3, 0, 6, 0, INK.lilac, 1.5, fade);
      if (!reducedMotion) {
        arc(0, -2, radius + 4, Math.PI + .6, Math.PI * 2 - .6, INK.ice, 3, .13 * fade);
        arc(0, 2, radius + 4, .6, Math.PI - .6, INK.lilac, 3, .13 * fade);
      }
    } else {
      arc(0, -5, radius, Math.PI + .65, Math.PI * 2 - .65, INK.miss, 1.3, fade);
      arc(0, 5, radius, .65, Math.PI - .65, INK.miss, 1.3, fade);
      dot(0, 0, 2, INK.miss, fade, false);
      segment(-3, 6, 3, 6, INK.miss, 1, fade);
    }
  }
  return {kind: 'relay-trace', phase, phaseProgress, active, age, position, direction, distance, travelProgress, impact, reducedMotion, contactStart: timing.contactStart, total: timing.total, primitives};
}

/** Renders only sampled geometry, preserving the caller's Canvas styling and transform. */
export function drawTrace(context, options = {}) {
  const sample = sampleTrace(options);
  if (!sample.active) return sample;
  context.save();
  try {
    const inheritedAlpha = Number.isFinite(context.globalAlpha) ? context.globalAlpha : 1;
    context.globalCompositeOperation = 'source-over'; context.lineCap = 'round'; context.lineJoin = 'round';
    for (const p of sample.primitives) {
      context.globalAlpha = inheritedAlpha * p.alpha; context.lineWidth = p.width; context.strokeStyle = p.color; context.fillStyle = p.color;
      context.beginPath();
      if (p.type === 'segment') { context.moveTo(p.points[0].x, p.points[0].y); context.lineTo(p.points[1].x, p.points[1].y); }
      else context.arc(p.center.x, p.center.y, p.radius, p.type === 'dot' ? 0 : p.start, p.type === 'dot' ? Math.PI * 2 : p.end);
      if (p.type === 'dot' && p.filled) context.fill();
      else context.stroke();
    }
  } finally { context.restore(); }
  return sample;
}
