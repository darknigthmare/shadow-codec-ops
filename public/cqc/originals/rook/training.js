import {drawSignal} from './signal-effects.js';
import {drawCalibrator, getCalibratorBounds} from './calibration-trolley.js';
import {createTraining, stepTraining, launchSignal} from './training-rules.js';

const canvas = document.getElementById('calibration-canvas');
const context = canvas.getContext('2d');
const status = document.getElementById('training-status');
const outfit = document.getElementById('rook-outfit');
const pulse = document.getElementById('send-pulse');
const marker = document.getElementById('send-marker');
const reduce = document.getElementById('reduced-motion');
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
const renderer = window.CQC_SERVICE_YARD;
const stage = renderer?.stages.find(item => item.id === 'p57_meridien_beacon_yard');
const cart = {x: 944, floor: 568, direction: -1};
const wardrobe = {
  terrain: {url: 'rook-terrain.png', body: [326, 5, 542, 1236], contact: [581.5, 1241]},
  orage: {url: 'rook-orage.png', body: [327, 0, 541, 1241], contact: [582, 1241]}
};
const decoded = new Map();
const keys = new Set();
const touchDirections = new Map();
const dispatched = new Set();

let state = createTraining();
let costume = 'terrain', image = null, outfitRequest = 0;
let attempt = '', elapsed = 0, lastTimestamp = null, ready = false;

function loadCostume(name) {
  if (!decoded.has(name)) {
    const pending = (async () => {
      const asset = new Image();
      asset.src = wardrobe[name].url;
      await asset.decode();
      const [x, y, width, height] = wardrobe[name].body;
      if (x + width > asset.naturalWidth || y + height > asset.naturalHeight) throw Error('Cadre de tenue invalide.');
      return asset;
    })();
    decoded.set(name, pending);
    pending.catch(() => { if (decoded.get(name) === pending) decoded.delete(name); });
  }
  return decoded.get(name);
}

function message(text) {
  if (status.textContent !== text) status.textContent = text;
}

function reflectState() {
  const disabled = !ready || state.signal !== null || state.cooldown > 0;
  pulse.disabled = disabled;
  marker.disabled = disabled;
  canvas.dataset.result = state.result;
  canvas.dataset.delivered = String(dispatched.size);
  if (attempt) return;
  if (state.result === 'in-flight') message('Signal en route…');
  else if (state.result === 'wrong-direction') message('Oriente-toi vers le récepteur.');
  else if (state.result === 'out-of-range') message('Hors de portée. Approche-toi de MULET.');
  else if (dispatched.size === 2) message('Étalonnage terminé. Les deux signaux ont été reçus.');
  else if (state.result === 'hit') message('Signal reçu. Teste maintenant l’autre commande.');
  else message('MULET est prêt. Envoie la première impulsion.');
}

function renderRook() {
  const current = wardrobe[costume];
  const [sx, sy, sw, sh] = current.body;
  const [footX, footY] = current.contact;
  const scale = 171 / (footY - sy);
  context.save();
  context.translate(state.x, state.y);
  context.scale(state.face, 1);
  context.imageSmoothingEnabled = false;
  context.drawImage(image, sx, sy, sw, sh, (sx - footX) * scale, (sy - footY) * scale, sw * scale, sh * scale);
  context.restore();
}

function advance(seconds, direction) {
  const active = state.signal;
  const hits = state.hits;
  state = stepTraining(state, seconds, direction);
  if (active && state.hits > hits) dispatched.add(active.kind);
}

function draw(timestamp) {
  let dt = lastTimestamp === null ? 0 : Math.min((timestamp - lastTimestamp) / 1000, .08);
  lastTimestamp = timestamp;
  if (document.hidden) dt = 0;
  elapsed += dt;
  const reducedMotion = reduce.checked || motionPreference.matches;
  const direction = Number(keys.has('ArrowRight') || [...touchDirections.values()].includes(1))
    - Number(keys.has('ArrowLeft') || [...touchDirections.values()].includes(-1));
  advance(dt, direction);
  const drawOptions = {time: elapsed, camera: (state.x - 540) * .58, zoom: 1, motion: !reducedMotion};
  renderer.drawBackground(context, stage, drawOptions);
  drawCalibrator(context, {...cart, frame: reducedMotion ? 0 : elapsed * 60, aim: 0, hit: reducedMotion ? 0 : state.flash * 2, motion: 0});
  renderRook();
  if (state.signal) drawSignal(context, state.signal.kind, {...state.signal, reducedMotion, impact: state.signal.impact ? 'hit' : 'miss'});
  renderer.drawForeground(context, stage, drawOptions);
  reflectState();
  requestAnimationFrame(draw);
}

function send(kind) {
  if (!ready) return;
  const target = getCalibratorBounds(cart).target;
  state = launchSignal(state, kind, target);
  reflectState();
}

function clearDirections() { keys.clear(); touchDirections.clear(); }
function bindMove(id, direction) {
  const button = document.getElementById(id);
  button.addEventListener('pointerdown', event => {
    if (event.button !== 0) return;
    touchDirections.set(event.pointerId, direction);
    button.setPointerCapture(event.pointerId);
  });
  for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) {
    button.addEventListener(type, event => touchDirections.delete(event.pointerId));
  }
  button.addEventListener('click', event => {
    if (event.detail === 0 && ready) advance(.12, direction);
  });
}

bindMove('move-left', -1);
bindMove('move-right', 1);
canvas.addEventListener('keydown', event => {
  if (event.code === 'ArrowLeft' || event.code === 'ArrowRight') {
    event.preventDefault();
    keys.add(event.code);
  } else if (!event.repeat && (event.code === 'KeyJ' || event.code === 'KeyK')) {
    event.preventDefault();
    send(event.code === 'KeyJ' ? 'telemetry-pulse' : 'calibration-ping');
  }
});
window.addEventListener('keyup', event => keys.delete(event.code));
canvas.addEventListener('blur', clearDirections);
window.addEventListener('blur', clearDirections);
document.addEventListener('visibilitychange', clearDirections);

pulse.onclick = () => send('telemetry-pulse');
marker.onclick = () => send('calibration-ping');
document.getElementById('reset-training').onclick = () => {
  state = createTraining();
  dispatched.clear();
  clearDirections();
  reflectState();
};

outfit.addEventListener('change', async () => {
  const requested = outfit.value;
  const ticket = ++outfitRequest;
  attempt = 'pending';
  message('Chargement de la tenue…');
  try {
    const next = await loadCostume(requested);
    if (ticket !== outfitRequest) return;
    costume = requested;
    image = next;
    canvas.dataset.outfit = costume;
    attempt = '';
    reflectState();
  } catch {
    if (ticket !== outfitRequest) return;
    outfit.value = costume;
    attempt = 'failed';
    message('Tenue indisponible. La tenue précédente reste affichée.');
  }
});

reflectState();
try {
  if (!stage || !context) throw Error('Cour indisponible.');
  image = await loadCostume(costume);
  ready = true;
  canvas.dataset.outfit = costume;
  requestAnimationFrame(draw);
} catch {
  message('Cour indisponible. Recharge la page pour réessayer.');
}
