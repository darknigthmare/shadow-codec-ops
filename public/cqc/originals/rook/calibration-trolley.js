/* MULET · Banc d’étalonnage. Original Station Méridien Canvas instrument.
 * Coordinates are world pixels. Aim is radians above the local forward axis;
 * direction=1 faces right, -1 faces left. The owner alone moves x/floor.
 * hit and optional recoil are 0..1 envelopes; motion is signed wheel activity.
 */
const clamp = (value, low, high) => Math.max(low, Math.min(high, value));
const finite = (value, fallback = 0) => Number.isFinite(value) ? value : fallback;
const point = (x, y) => Object.freeze({x, y});
const wheels = Object.freeze([
  {x: -84, y: -22, radius: 16, far: true, phase: .8},
  {x: 68, y: -22, radius: 16, far: true, phase: 1.6},
  {x: -76, y: -20, radius: 20, far: false, phase: 0},
  {x: 82, y: -20, radius: 20, far: false, phase: .5}
]);
function rotate(x, y, angle) {
  return {x: x * Math.cos(angle) - y * Math.sin(angle), y: x * Math.sin(angle) + y * Math.cos(angle)};
}
function rectangle(left, top, right, bottom) {
  return Object.freeze({left, top, right, bottom, width: right - left, height: bottom - top});
}
function geometry(options = {}) {
  const x = finite(options.x), floor = finite(options.floor), frame = finite(options.frame);
  const direction = options.direction === -1 ? -1 : 1;
  const aim = clamp(finite(options.aim), -.4, .65), hit = clamp(finite(options.hit), 0, 1);
  const recoil = clamp(finite(options.recoil), 0, 1), motion = clamp(finite(options.motion), -1, 1);
  const sway = hit * Math.sin(frame * .61) * .045;
  const mast = rotate(0, -65, sway), shoulder = {x: 26 + mast.x, y: -103 + mast.y};
  const upperAngle = -aim * .45 + sway, foreAngle = -aim + sway * .3;
  const upper = rotate(54, 0, upperAngle), elbow = {x: shoulder.x + upper.x, y: shoulder.y + upper.y};
  const fore = rotate(43, 0, foreAngle), wrist = {x: elbow.x + fore.x, y: elbow.y + fore.y};
  const slide = rotate(16 - recoil * 7, 0, foreAngle), emitter = {x: wrist.x + slide.x, y: wrist.y + slide.y};
  const tipOffset = rotate(23, 0, foreAngle), tip = {x: emitter.x + tipOffset.x, y: emitter.y + tipOffset.y};
  const world = value => point(x + value.x * direction, floor + value.y);
  const target = world({x: 8, y: -84});
  const samples = [{x: -131, y: -129}, {x: 131, y: 9}];
  for (const p of [shoulder, elbow, wrist]) for (const dx of [-14, 14]) for (const dy of [-23, 15]) samples.push({x: p.x + dx, y: p.y + dy});
  for (const dx of [-14, 31]) for (const dy of [-16, 16]) {
    const p = rotate(dx, dy, foreAngle); samples.push({x: emitter.x + p.x, y: emitter.y + p.y});
  }
  const worldSamples = samples.map(world), xs = worldSamples.map(p => p.x), ys = worldSamples.map(p => p.y);
  const contacts = wheels.map(wheel => Object.freeze({x: x + wheel.x * direction,
    y: floor + wheel.y + wheel.radius, radius: wheel.radius, far: wheel.far}));
  const near = contacts.filter(contact => !contact.far);
  const layout = Object.freeze({anchor: point(x, floor), direction,
    bounds: rectangle(Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)),
    target, targetRect: rectangle(target.x - 23, target.y - 23, target.x + 23, target.y + 23),
    contactBounds: rectangle(Math.min(...near.map(p => p.x)) - 5, floor - 2, Math.max(...near.map(p => p.x)) + 5, floor),
    contacts: Object.freeze(contacts), emitter: world(tip),
    joints: Object.freeze({mast: world({x: 26, y: -103}), shoulder: world(shoulder), elbow: world(elbow), wrist: world(wrist)}),
    wheelPhases: Object.freeze(wheels.map(wheel => frame * motion * .018 * 20 / wheel.radius + wheel.phase))});
  return {layout, frame, direction, hit, recoil, sway, shoulder, elbow, wrist, emitter, foreAngle};
}

export function getCalibratorBounds(options = {}) { return geometry(options).layout; }

function path(ctx, vertices, fill, stroke = '#182c2e', width = 2) {
  ctx.beginPath(); vertices.forEach(([x, y], index) => index ? ctx.lineTo(x, y) : ctx.moveTo(x, y));
  ctx.closePath(); ctx.fillStyle = fill; ctx.fill();
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = width; ctx.stroke(); }
}
function box(ctx, x, y, width, height, radius, fill, stroke) {
  ctx.beginPath(); ctx.roundRect(x, y, width, height, radius); ctx.fillStyle = fill; ctx.fill();
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 2; ctx.stroke(); }
}
function disk(ctx, x, y, radius, fill, stroke, lineWidth = 2) {
  ctx.beginPath(); ctx.arc(x, y, radius, 0, Math.PI * 2); ctx.fillStyle = fill; ctx.fill();
  if (stroke) { ctx.lineWidth = lineWidth; ctx.strokeStyle = stroke; ctx.stroke(); }
}
function link(ctx, a, b, width, color) {
  ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
  ctx.strokeStyle = '#182c2e'; ctx.lineWidth = width + 5; ctx.lineCap = 'round'; ctx.stroke();
  ctx.strokeStyle = color; ctx.lineWidth = width; ctx.stroke();
}
function wheel(ctx, part, angle) {
  ctx.save(); ctx.translate(part.x, part.y);
  disk(ctx, 0, 0, part.radius, '#172326');
  disk(ctx, 0, 0, part.radius - 3, part.far ? '#394748' : '#5f7472', '#0e1b1e', 1);
  ctx.rotate(angle);
  for (let index = 0; index < 6; index++) {
    ctx.rotate(Math.PI / 3); ctx.strokeStyle = part.far ? '#738783' : '#b2c0b4'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(5, 0); ctx.lineTo(part.radius - 6, 0); ctx.stroke();
  }
  disk(ctx, 0, 0, 5, '#d0b774', '#172326', 1); ctx.restore();
}

export function drawCalibrator(ctx, options = {}) {
  const pose = geometry(options), {layout, direction, hit, shoulder, elbow, wrist, emitter, foreAngle} = pose;
  ctx.save();
  try {
    ctx.translate(layout.anchor.x, layout.anchor.y); ctx.scale(direction, 1);
    // Floor registration is fixed to the chassis, never to the person nearby.
    ctx.fillStyle = '#101e2040'; ctx.beginPath(); ctx.ellipse(0, 1, 118, 5, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#8bc5b58c'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(-12, 6); ctx.lineTo(12, 6); ctx.moveTo(0, 2); ctx.lineTo(0, 8); ctx.stroke();
    wheels.forEach((part, index) => { if (part.far) wheel(ctx, part, layout.wheelPhases[index]); });
    // Asymmetric deck, rear instrument case and replaceable corner bumpers.
    path(ctx, [[-111, -86], [-77, -103], [107, -95], [126, -75], [91, -59], [-114, -64]], '#c4c7ad');
    path(ctx, [[-114, -64], [91, -59], [126, -75], [120, -40], [82, -27], [-108, -35]], '#426762');
    path(ctx, [[-114, -64], [-77, -80], [126, -75], [91, -59]], '#698a7e', '#263e3b', 1);
    box(ctx, -101, -120, 66, 39, 6, '#344e50', '#182c2e');
    box(ctx, -91, -113, 46, 21, 3, '#172e34', '#7d9388');
    ctx.fillStyle = '#9ccbbb'; ctx.fillRect(-85, -107, 9, 3); ctx.fillRect(-72, -107, 20, 3); ctx.fillRect(-85, -100, 33, 2);
    box(ctx, -125, -62, 20, 26, 5, '#c49656', '#182c2e');
    box(ctx, 106, -67, 23, 28, 5, '#c49656', '#182c2e');
    for (const x of [-117, 114]) { ctx.fillStyle = '#253a3a'; ctx.fillRect(x, -58, 6, 14); }
    for (const x of [-66, 69]) link(ctx, {x, y: -42}, {x: x + 7, y: -19}, 6, '#bbc4ae');
    wheels.forEach((part, index) => { if (!part.far) wheel(ctx, part, layout.wheelPhases[index]); });
    // A raised calibration receiver: fixed, easy to register, with no weapon motif.
    box(ctx, -19, -112, 54, 54, 7, '#e2debd', '#253d3b');
    disk(ctx, 8, -84, 21, '#243e40', '#a6b5a1', 1);
    disk(ctx, 8, -84, 15, hit > .05 ? '#d6ad62' : '#8ecdbc');
    disk(ctx, 8, -84, 8, '#e9e5cc');
    ctx.fillStyle = '#315c59'; ctx.fillRect(6, -94, 4, 20); ctx.fillRect(-2, -86, 20, 4);
    if (hit > 0) { ctx.globalAlpha = hit * .8; disk(ctx, 8, -84, 24, '#f0d99940', '#f1d38c', 2); ctx.globalAlpha = 1; }
    // Mast and two links articulate independently; chassis and support do not drift.
    link(ctx, {x: 26, y: -103}, shoulder, 11, '#bfc8b1');
    ctx.strokeStyle = '#395450'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(20, -106); ctx.bezierCurveTo(-3, -147, elbow.x - 14, elbow.y + 16, wrist.x, wrist.y + 8); ctx.stroke();
    link(ctx, shoulder, elbow, 12, '#698c7f'); link(ctx, elbow, wrist, 9, '#d0bc80');
    disk(ctx, shoulder.x, shoulder.y, 12, '#344f4f', '#b8c5ae');
    disk(ctx, shoulder.x, shoulder.y, 4, '#c8ae66'); disk(ctx, elbow.x, elbow.y, 8, '#273f40', '#9cb1a0');
    disk(ctx, wrist.x, wrist.y, 6, '#273f40', '#e1cc91', 1);
    ctx.save(); ctx.translate(emitter.x, emitter.y); ctx.rotate(foreAngle);
    box(ctx, -12, -13, 37, 26, 7, '#c6a566', '#203a3b');
    ctx.fillStyle = '#526e68'; ctx.fillRect(-6, -8, 3, 16); ctx.fillRect(0, -8, 3, 16);
    ctx.beginPath(); ctx.ellipse(24, 0, 5, 11, 0, 0, Math.PI * 2); ctx.fillStyle = '#91d8c8'; ctx.fill(); ctx.strokeStyle = '#203a3b'; ctx.lineWidth = 2; ctx.stroke();
    ctx.strokeStyle = '#e5eccb'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(23, -6); ctx.lineTo(23, 6); ctx.stroke(); ctx.restore();
    const beacon = {x: shoulder.x, y: shoulder.y - 17};
    disk(ctx, beacon.x, beacon.y, 4, hit > .05 ? '#e7b568' : '#9acdb1', '#263e3c', 1);
    // Readable text remains upright when the articulated assembly faces left.
    ctx.save(); ctx.translate(-43, -47); ctx.scale(direction, 1); ctx.fillStyle = '#e5e6ca';
    ctx.font = '700 9px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('MULET', 0, 0); ctx.restore();
  } finally { ctx.restore(); }
  return layout;
}
