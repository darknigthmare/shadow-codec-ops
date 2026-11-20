import { TRACE_DURATION } from './relay-signal.js';

export const REQUIRED_RELAYS = 3;
const FLOOR = 568;
const MAX_RANGE = 620;
export const TRACE_RECEIVE_RADIUS = 32;
const PATROL_PERIOD = 4.8;

export function createRelayCourse() {
  return { x: 348, face: 1, time: 0, trace: null, hits: 0, result: 'ready', seed: 1 };
}

export function relayTargetAt(time) {
  const angle = 2 * Math.PI * (time % PATROL_PERIOD) / PATROL_PERIOD;
  return { x: 927 + 108 * Math.sin(angle), y: 459 + 24 * Math.cos(angle) };
}

function originFor(state) {
  return { x: state.x + state.face * 30, y: FLOOR - 122 };
}

function distance(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }

export function relayWindow(state) {
  const target = relayTargetAt(state.time);
  if ((target.x - state.x) * state.face <= 0) return 'wrong-direction';
  if (distance(originFor(state), target) > MAX_RANGE) return 'out-of-range';
  const atContact = relayTargetAt(state.time + TRACE_DURATION.contactStart);
  return distance(target, atContact) <= TRACE_RECEIVE_RADIUS ? 'open' : 'moving';
}

export function launchRelay(state) {
  if (state.trace || state.hits >= REQUIRED_RELAYS) return state;
  const window = relayWindow(state);
  if (window === 'wrong-direction' || window === 'out-of-range') return { ...state, result: window };
  return {
    ...state,
    result: 'in-flight',
    trace: { origin: originFor(state), target: relayTargetAt(state.time), launched: state.time, seed: state.seed, impact: null },
    seed: state.seed + 1
  };
}

export function stepRelay(state, seconds, move = 0) {
  if (!Number.isFinite(seconds) || seconds <= 0) return state;
  const direction = Number.isFinite(move) ? Math.sign(move) : 0;
  const time = state.time + seconds;
  const x = Math.min(755, Math.max(75, state.x + 300 * seconds * direction));
  let { trace, hits, result } = state;
  if (trace) {
    const contactTime = trace.launched + TRACE_DURATION.contactStart;
    if (trace.impact === null && time >= contactTime) {
      const received = distance(trace.target, relayTargetAt(contactTime)) <= TRACE_RECEIVE_RADIUS;
      if (received) hits += 1;
      result = hits >= REQUIRED_RELAYS ? 'complete' : received ? 'hit' : 'miss';
      trace = { ...trace, impact: received ? 'hit' : 'miss' };
    }
    if (time >= trace.launched + TRACE_DURATION.total) trace = null;
  }
  return { ...state, x, face: direction || state.face, time, trace, hits, result };
}
