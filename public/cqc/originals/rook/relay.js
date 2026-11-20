import { drawRelayDrone } from './relay-drone.js';
import { drawTrace } from './relay-signal.js';
import { REQUIRED_RELAYS, TRACE_RECEIVE_RADIUS, createRelayCourse, launchRelay, relayTargetAt, relayWindow, stepRelay } from './relay-course.js';

const canvas = document.getElementById('relay-canvas');
const context = canvas.getContext('2d');
const send = document.getElementById('send-trace');
const status = document.getElementById('training-status');
const progress = document.getElementById('relay-progress');
const reducer = document.getElementById('relay-reduce');
const preference = matchMedia('(prefers-reduced-motion: reduce)');
const renderer = window.CQC_SERVICE_YARD;
const stage = renderer?.stages.find(item => item.id === 'p58_meridien_relay_glasshouse');
const rook = new Image();
const heldKeys = new Set();
const heldPointers = new Map();
let state = createRelayCourse();
let previousTimestamp = null;
let ready = false;

const messages = {
  ready: 'Guette le voyant du récepteur.',
  'in-flight': 'Traceur en route…',
  hit: 'Relais reçu.',
  miss: 'Luciole a quitté la zone. Attends le prochain passage au vert.',
  'wrong-direction': 'Tourne-toi vers Luciole.',
  'out-of-range': 'Hors de portée. Approche-toi de Luciole.',
  complete: 'Relais établi. Les trois traceurs ont été reçus.'
};

function setText(element, text) {
  if (element.textContent !== text) element.textContent = text;
}

function renderRook() {
  const scale = 171 / 1236;
  context.save();
  context.translate(state.x, 568);
  context.scale(state.face, 1);
  context.imageSmoothingEnabled = false;
  context.drawImage(rook, 326, 5, 542, 1236, (326 - 581.5) * scale, -171, 542 * scale, 171);
  context.restore();
}

function renderReceiver(target, windowOpen) {
  drawRelayDrone(context, { ...target, phase: state.time, direction: -1, signal: windowOpen ? 1 : 0,
    reducedMotion: reducer.checked || preference.matches });
  if (!windowOpen) return;
  context.save();
  context.strokeStyle = '#bcecb4';
  context.lineWidth = 2;
  context.beginPath();
  context.arc(target.x, target.y, TRACE_RECEIVE_RADIUS, 0, 2 * Math.PI);
  context.stroke();
  context.restore();
}

function reflect() {
  canvas.dataset.result = state.result;
  canvas.dataset.hits = String(state.hits);
  send.disabled = !ready || state.trace !== null || state.hits >= REQUIRED_RELAYS;
  setText(progress, `Signaux reçus ${state.hits} / ${REQUIRED_RELAYS}`);
  setText(status, messages[state.result]);
}

function draw(timestamp) {
  const elapsed = previousTimestamp === null || document.hidden ? 0 : Math.min(.08, (timestamp - previousTimestamp) / 1000);
  previousTimestamp = timestamp;
  const movement = Number(heldKeys.has('ArrowRight') || [...heldPointers.values()].includes(1))
    - Number(heldKeys.has('ArrowLeft') || [...heldPointers.values()].includes(-1));
  state = stepRelay(state, elapsed, movement);
  const reducedMotion = reducer.checked || preference.matches;
  const options = { time: state.time, camera: (state.x - 540) * .58, zoom: 1, motion: !reducedMotion };
  const target = relayTargetAt(state.time);
  const opportunity = relayWindow(state);
  canvas.dataset.window = opportunity;
  renderer.drawBackground(context, stage, options);
  renderReceiver(target, opportunity === 'open' && state.hits < REQUIRED_RELAYS);
  renderRook();
  if (state.trace) drawTrace(context, { ...state.trace, age: state.time - state.trace.launched,
    impact: state.trace.impact || 'miss', reducedMotion });
  renderer.drawForeground(context, stage, options);
  reflect();
  requestAnimationFrame(draw);
}

function fire() {
  if (!ready) return;
  state = launchRelay(state);
  reflect();
}

function clearInput() { heldKeys.clear(); heldPointers.clear(); }

function bindMovement(id, direction) {
  const button = document.getElementById(id);
  button.addEventListener('pointerdown', event => {
    if (event.button !== 0) return;
    heldPointers.set(event.pointerId, direction);
    button.setPointerCapture(event.pointerId);
  });
  for (const event of ['pointerup', 'pointercancel', 'lostpointercapture']) {
    button.addEventListener(event, pointer => heldPointers.delete(pointer.pointerId));
  }
  button.addEventListener('click', event => {
    if (!event.detail && ready) state = stepRelay(state, .12, direction);
  });
}

bindMovement('relay-left', -1);
bindMovement('relay-right', 1);
canvas.addEventListener('keydown', event => {
  if (event.code === 'ArrowLeft' || event.code === 'ArrowRight') {
    event.preventDefault();
    heldKeys.add(event.code);
  } else if (event.code === 'KeyJ' && !event.repeat) {
    event.preventDefault();
    fire();
  }
});
window.addEventListener('keyup', event => heldKeys.delete(event.code));
canvas.addEventListener('blur', () => heldKeys.clear());
window.addEventListener('blur', clearInput);
document.addEventListener('visibilitychange', clearInput);
send.onclick = fire;
document.getElementById('restart-relay').onclick = () => {
  if (!ready) return;
  state = createRelayCourse();
  clearInput();
  reflect();
};

try {
  if (!stage || !context) throw Error('La serre est indisponible.');
  rook.src = 'rook-terrain.png';
  await rook.decode();
  if (rook.naturalWidth < 868 || rook.naturalHeight < 1241) throw Error('La planche de Rook est incomplète.');
  ready = true;
  requestAnimationFrame(draw);
} catch {
  setText(status, 'La serre est indisponible. Recharge la page pour réessayer.');
}
