/* LUCIOLE · Original Station Méridien greenhouse courier.
 * x/y are the caller-owned receiver pin, in world pixels. phase is a continuous
 * animation phase in radians; no trajectory or player position is inferred here.
 * signal (0..1) adds a soft steady ring. reducedMotion freezes articulation only.
 */
const finite = value => Number.isFinite(value) ? value : 0;
const clamp = value => Math.max(0, Math.min(1, finite(value)));
const pin = (x, y) => Object.freeze({x, y});
const turn = (p, angle) => ({x: p.x * Math.cos(angle) - p.y * Math.sin(angle), y: p.x * Math.sin(angle) + p.y * Math.cos(angle)});
const rect = (left, top, right, bottom) => Object.freeze({left, top, right, bottom, width: right - left, height: bottom - top});

function assembly(options = {}) {
  const x = finite(options.x), y = finite(options.y), phase = finite(options.phase);
  const direction = options.direction === -1 ? -1 : 1, signal = clamp(options.signal);
  const reduced = options.reducedMotion === true;
  const bodyAngle = reduced ? 0 : Math.sin(phase * .55) * .018;
  const localFans = [
    {id: 'port', pivot: {x: -34, y: -25}, reach: {x: -38, y: -12},
      angle: reduced ? 0 : Math.sin(phase * .8) * .075, bladeAngle: reduced ? 0 : phase * 9},
    {id: 'starboard', pivot: {x: 34, y: -25}, reach: {x: 38, y: -10},
      angle: reduced ? 0 : Math.cos(phase * 1.1 + .4) * .07, bladeAngle: reduced ? 1.1 : phase * 7.3 + 1.1}
  ].map(fan => {
    const reach = turn(fan.reach, fan.angle);
    return {...fan, center: {x: fan.pivot.x + reach.x, y: fan.pivot.y + reach.y}};
  });
  const world = p => { const rotated = turn(p, bodyAngle); return pin(x + rotated.x * direction, y + rotated.y); };
  const samples = [];
  for (const sx of [-46, 46]) for (const sy of [-51, 68]) samples.push(world({x: sx, y: sy}));
  const fans = localFans.map(fan => {
    const corners = [];
    for (const dx of [-33, 33]) for (const dy of [-19, 23]) {
      const offset = turn({x: dx, y: dy}, fan.angle);
      const corner = world({x: fan.center.x + offset.x, y: fan.center.y + offset.y});
      samples.push(corner); corners.push(corner);
    }
    return Object.freeze({id: fan.id, center: world(fan.center), pivot: world(fan.pivot),
      angle: (bodyAngle + fan.angle) * direction, bladeAngle: fan.bladeAngle,
      bounds: rect(Math.min(...corners.map(p => p.x)), Math.min(...corners.map(p => p.y)),
        Math.max(...corners.map(p => p.x)), Math.max(...corners.map(p => p.y)))});
  });
  const target = pin(x, y);
  const geometry = Object.freeze({target, targetRadius: 14,
    targetRect: rect(x - 16, y - 16, x + 16, y + 16), fixedScale: 1, direction,
    bounds: rect(Math.min(...samples.map(p => p.x)), Math.min(...samples.map(p => p.y)),
      Math.max(...samples.map(p => p.x)), Math.max(...samples.map(p => p.y))),
    fans: Object.freeze(fans), pivots: Object.freeze({fuselage: target, port: fans[0].pivot, starboard: fans[1].pivot})});
  return {geometry, localFans, direction, bodyAngle, signal};
}

export function getRelayDroneGeometry(options = {}) { return assembly(options).geometry; }

function disk(ctx, x, y, radius, fill, stroke) {
  ctx.beginPath(); ctx.arc(x, y, radius, 0, Math.PI * 2); ctx.fillStyle = fill; ctx.fill();
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 1.5; ctx.stroke(); }
}
function ellipse(ctx, x, y, rx, ry, fill, stroke) {
  ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2); ctx.fillStyle = fill; ctx.fill();
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 2; ctx.stroke(); }
}
function box(ctx, x, y, width, height, radius, fill, stroke) {
  ctx.beginPath(); ctx.roundRect(x, y, width, height, radius); ctx.fillStyle = fill; ctx.fill();
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 1.5; ctx.stroke(); }
}
function link(ctx, from, to, width, color) {
  ctx.beginPath(); ctx.moveTo(from.x, from.y); ctx.lineTo(to.x, to.y); ctx.lineCap = 'round';
  ctx.lineWidth = width + 3; ctx.strokeStyle = '#203d3e'; ctx.stroke();
  ctx.lineWidth = width; ctx.strokeStyle = color; ctx.stroke();
}
function drawFan(ctx, fan) {
  ctx.save(); ctx.translate(fan.center.x, fan.center.y); ctx.rotate(fan.angle);
  // The rotor spins inside a fixed foreshortened duct plane, not as a flat disc.
  ellipse(ctx, 0, 8, 31, 13, '#456c65', '#203d3e');
  box(ctx, -31, -3, 62, 11, 2, '#597c70');
  ellipse(ctx, 0, -3, 31, 14, '#c1c9a5', '#203d3e');
  ellipse(ctx, 0, -3, 23, 9.5, '#172e31', '#819f86');
  ctx.save(); ctx.translate(0, -3); ctx.scale(1, .38); ctx.rotate(fan.bladeAngle);
  for (let blade = 0; blade < 3; blade++) {
    ctx.rotate(Math.PI * 2 / 3); box(ctx, 4, -3, 17, 6, 3, '#83b9a3');
  }
  ctx.restore(); ellipse(ctx, 0, -3, 5, 2.6, '#d6bb77', '#203d3e');
  ctx.strokeStyle = '#e4dfb8'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(-28, 3); ctx.lineTo(-28, 10); ctx.moveTo(28, 3); ctx.lineTo(28, 10); ctx.stroke();
  ctx.restore();
}

export function drawRelayDrone(ctx, options = {}) {
  const pose = assembly(options), {geometry, direction, bodyAngle, signal, localFans} = pose;
  ctx.save();
  try {
    ctx.translate(geometry.target.x, geometry.target.y); ctx.scale(direction, 1); ctx.rotate(bodyAngle);
    // Twin suspension hinges and a restrained rear cable loop.
    for (const fan of localFans) {
      ctx.strokeStyle = '#7b9f88'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(fan.pivot.x, fan.pivot.y + 6);
      ctx.bezierCurveTo(fan.pivot.x, -9, fan.center.x, -15, fan.center.x, fan.center.y + 9); ctx.stroke();
      link(ctx, fan.pivot, fan.center, 7, '#b0bd9b');
      disk(ctx, fan.pivot.x, fan.pivot.y, 6, '#365c58', '#a7bea0');
    }
    localFans.forEach(fan => drawFan(ctx, fan));
    // Suspended seedling/sample capsule: service panels, soft bumpers and crate.
    link(ctx, {x: -21, y: -27}, {x: -21, y: 44}, 4, '#d0bb7c');
    link(ctx, {x: 21, y: -27}, {x: 21, y: 44}, 4, '#d0bb7c');
    box(ctx, -38, -24, 76, 62, 18, '#d5d5b5', '#203d3e');
    box(ctx, -34, 8, 68, 28, 12, '#658a76');
    box(ctx, -43, 7, 10, 20, 4, '#294e4c'); box(ctx, 33, 7, 10, 20, 4, '#294e4c');
    ctx.strokeStyle = '#25484a'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(-7, -25); ctx.quadraticCurveTo(-14, -48, 5, -45); ctx.lineTo(8, -31); ctx.stroke();
    disk(ctx, 5, -45, 3, '#c6cf9e', '#25484a');
    for (const x of [-28, -23, 23, 28]) { ctx.fillStyle = '#456b62'; ctx.fillRect(x, -11, 2, 10); }
    box(ctx, -24, 39, 48, 22, 6, '#597b68', '#203d3e');
    box(ctx, -18, 44, 36, 13, 3, '#9baa7f');
    ctx.strokeStyle = '#d6cb95'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(-10, 40); ctx.lineTo(-10, 61); ctx.moveTo(10, 40); ctx.lineTo(10, 61); ctx.stroke();
    // Receiver center is exactly local (0,0), even when the capsule pivots.
    box(ctx, -19, -19, 38, 38, 10, '#f0e8c4', '#607f6b');
    disk(ctx, 0, 0, 14, '#294e4f', '#a0c3a9');
    disk(ctx, 0, 0, 9, '#9fd6bd');
    ctx.strokeStyle = '#315d55'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(-5, 4); ctx.quadraticCurveTo(-6, -6, 6, -6); ctx.quadraticCurveTo(7, 4, -5, 4); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-4, 4); ctx.lineTo(4, -4); ctx.stroke();
    if (signal > 0) {
      ctx.save();
      ctx.globalAlpha *= signal * .45;
      ctx.beginPath(); ctx.arc(0, 0, 18 + signal * 4, 0, Math.PI * 2);
      ctx.strokeStyle = '#d6e6ac'; ctx.lineWidth = 3; ctx.stroke();
      ctx.restore();
    }
    ctx.save(); ctx.translate(0, 29); ctx.rotate(-bodyAngle); ctx.scale(direction, 1);
    ctx.fillStyle = '#e9e8c9'; ctx.font = '700 7px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('LUCIOLE', 0, 0); ctx.restore();
  } finally { ctx.restore(); }
  return geometry;
}
