import { SIGNAL_DURATIONS } from './signal-effects.js';

export const SIGNAL_RANGES = Object.freeze({
  'telemetry-pulse': 620,
  'calibration-ping': 305,
});

const PLAYER_LEFT = 75;
const PLAYER_RIGHT = 1080;
const SIGNAL_LEFT = 24;
const SIGNAL_RIGHT = 1256;
const WALK_SPEED = 300;
const RECOVERY_SECONDS = 0.18;
const FLASH_SECONDS = 0.38;

export function createTraining() {
  return {
    x: 310,
    y: 568,
    face: 1,
    signal: null,
    cooldown: 0,
    hits: 0,
    result: 'ready',
    flash: 0,
    nextSeed: 1,
  };
}

export function getSignalOrigin(state) {
  return { x: state.x + state.face * 30, y: state.y - 122 };
}

export function launchSignal(state, kind, target) {
  if (state.signal || state.cooldown > 0 || !Object.hasOwn(SIGNAL_RANGES, kind)) return state;
  if (!Number.isFinite(target?.x) || !Number.isFinite(target?.y)) return state;

  const origin = getSignalOrigin(state);
  const range = SIGNAL_RANGES[kind];
  const dx = target.x - origin.x;
  const dy = target.y - origin.y;
  const distance = Math.hypot(dx, dy);
  const facing = (target.x - state.x) * state.face >= 0;
  const impact = facing && distance <= range;
  let endpoint = { x: target.x, y: target.y };
  let miss = null;

  if (!impact) {
    miss = facing ? 'out-of-range' : 'wrong-direction';
    const towardX = facing ? dx : Math.abs(dx) * state.face;
    const edgeDistance = towardX < 0 ? origin.x - SIGNAL_LEFT : SIGNAL_RIGHT - origin.x;
    const scale = Math.min(1, range / distance, edgeDistance / Math.abs(towardX));
    endpoint = { x: origin.x + towardX * scale, y: origin.y + dy * scale };
  }

  return {
    ...state,
    signal: {
      kind,
      origin,
      target: endpoint,
      age: 0,
      seed: state.nextSeed,
      impact,
      miss,
    },
    cooldown: SIGNAL_DURATIONS[kind].total + RECOVERY_SECONDS,
    result: 'in-flight',
    nextSeed: state.nextSeed + 1,
  };
}

export function stepTraining(state, seconds, move = 0) {
  if (!Number.isFinite(seconds) || seconds <= 0) return state;

  const direction = Number.isFinite(move) ? Math.sign(move) : 0;
  const x = Math.max(PLAYER_LEFT, Math.min(PLAYER_RIGHT, state.x + direction * WALK_SPEED * seconds));
  let { signal, hits, result } = state;
  let flash = Math.max(0, state.flash - seconds);

  if (signal) {
    const { contactStart, total } = SIGNAL_DURATIONS[signal.kind];
    const age = signal.age + seconds;
    if (result === 'in-flight' && age >= contactStart) {
      if (signal.impact) {
        hits += 1;
        result = 'hit';
        flash = Math.max(0, FLASH_SECONDS - (age - contactStart));
      } else {
        result = signal.miss;
      }
    }
    signal = age < total ? { ...signal, age } : null;
  }

  return {
    ...state,
    x,
    face: direction || state.face,
    signal,
    cooldown: Math.max(0, state.cooldown - seconds),
    hits,
    result,
    flash,
  };
}
