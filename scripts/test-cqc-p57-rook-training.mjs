import assert from 'node:assert/strict';
import test from 'node:test';
import { SIGNAL_DURATIONS } from '../public/cqc/originals/rook/signal-effects.js';
import {
  SIGNAL_RANGES,
  createTraining,
  getSignalOrigin,
  launchSignal,
  stepTraining,
} from '../public/cqc/originals/rook/training-rules.js';

const pulse = 'telemetry-pulse';
const ping = 'calibration-ping';
const receiver = { x: 950, y: 480 };

test('the spawn pulse scores once at contact and retains its launch coordinates', () => {
  const initial = createTraining();
  const target = { ...receiver };
  const launched = launchSignal(initial, pulse, target);
  const { contactStart, total } = SIGNAL_DURATIONS[pulse];

  assert.equal(initial.signal, null);
  assert.deepEqual(launched.signal.origin, getSignalOrigin(initial));
  assert.equal(launched.signal.impact, true);
  assert.equal(launched.result, 'in-flight');
  target.x = 100;

  const traveling = stepTraining(launched, contactStart / 2, -1);
  assert.equal(traveling.hits, 0);
  assert.equal(traveling.face, -1);
  assert.ok(traveling.x < initial.x);
  assert.deepEqual(traveling.signal.origin, launched.signal.origin);
  assert.deepEqual(traveling.signal.target, receiver);

  const arrived = stepTraining(traveling, contactStart / 2);
  assert.equal(arrived.hits, 1);
  assert.equal(arrived.result, 'hit');
  assert.ok(arrived.flash > 0);

  const finished = stepTraining(arrived, total + 1);
  assert.equal(finished.signal, null);
  assert.equal(finished.hits, 1);
  assert.equal(finished.flash, 0);
  assert.equal(finished.result, 'hit');
});

test('an out-of-range ping ends short and a nearby ping reaches the receiver', () => {
  const initial = createTraining();
  const launched = launchSignal(initial, ping, receiver);
  const { origin, target, impact, seed } = launched.signal;
  const { total } = SIGNAL_DURATIONS[ping];

  assert.equal(impact, false);
  assert.ok(target.x < receiver.x);
  assert.ok(Math.abs(Math.hypot(target.x - origin.x, target.y - origin.y) - SIGNAL_RANGES[ping]) < 1e-8);

  const moved = stepTraining(launched, 1.4, 1);
  const ready = stepTraining(moved, total + 1);
  assert.equal(ready.result, 'out-of-range');
  assert.equal(ready.hits, 0);
  assert.equal(ready.flash, 0);

  const aimed = launchSignal(ready, ping, receiver);
  assert.equal(aimed.signal.seed, seed + 1);
  assert.equal(aimed.signal.impact, true);
  assert.deepEqual(aimed.signal.target, receiver);

  const arrived = stepTraining(aimed, total + 1);
  assert.equal(arrived.result, 'hit');
  assert.equal(arrived.hits, 1);
});

test('facing the opposite direction launches away from the receiver', () => {
  const nearby = stepTraining(createTraining(), 1.4, 1);
  const facingAway = stepTraining(nearby, 0.01, -1);
  const launched = launchSignal(facingAway, ping, receiver);

  assert.equal(launched.signal.impact, false);
  assert.ok(launched.signal.target.x < launched.signal.origin.x);
  const arrived = stepTraining(launched, SIGNAL_DURATIONS[ping].contactStart);
  assert.equal(arrived.result, 'wrong-direction');
  assert.equal(arrived.hits, 0);

  const leftFacing = stepTraining(createTraining(), 2, -1);
  const edgeLaunch = launchSignal(leftFacing, pulse, receiver);
  assert.ok(edgeLaunch.signal.target.x < edgeLaunch.signal.origin.x);
  assert.ok(edgeLaunch.signal.target.x > 0);
});

test('signals can reach a receiver at their range limit in either direction', () => {
  const rightFacing = createTraining();
  const leftFacing = stepTraining(rightFacing, 0.01, -1);

  for (const state of [rightFacing, leftFacing]) {
    const origin = getSignalOrigin(state);
    const range = state.face * SIGNAL_RANGES[ping];
    const target = { x: origin.x + range, y: origin.y };
    assert.equal(launchSignal(state, ping, target).signal.impact, true);
    target.x += state.face * 0.001;
    assert.equal(launchSignal(state, ping, target).signal.impact, false);
  }
});

test('launch guards preserve state in flight, in recovery, and for invalid requests', () => {
  const initial = createTraining();
  assert.equal(launchSignal(initial, 'toString', receiver), initial);
  assert.equal(launchSignal(initial, pulse, { x: NaN, y: 480 }), initial);

  const launched = launchSignal(initial, pulse, receiver);
  assert.equal(launchSignal(launched, ping, receiver), launched);
  const recovering = stepTraining(launched, SIGNAL_DURATIONS[pulse].total);
  assert.equal(recovering.signal, null);
  assert.equal(recovering.hits, 1);
  assert.ok(recovering.cooldown > 0);
  assert.equal(launchSignal(recovering, ping, receiver), recovering);

  const ready = stepTraining(recovering, 0.2);
  assert.equal(ready.cooldown, 0);
  assert.ok(launchSignal(ready, ping, receiver).signal);
});

test('movement respects the lane and idle preserves the last direction', () => {
  const initial = createTraining();
  const left = stepTraining(initial, 100, -1);
  const right = stepTraining(left, 100, 1);

  assert.equal(left.x, 75);
  assert.equal(left.face, -1);
  assert.equal(stepTraining(left, 1).face, -1);
  assert.equal(right.x, 1080);
  assert.equal(right.face, 1);
  assert.equal(right.y, initial.y);
  assert.equal(stepTraining(right, 0, -1), right);
  assert.equal(stepTraining(right, Infinity, -1), right);
});
