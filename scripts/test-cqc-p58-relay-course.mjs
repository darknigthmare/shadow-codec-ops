import assert from 'node:assert/strict';
import test from 'node:test';
import {createRelayCourse, launchRelay, relayTargetAt, relayWindow, stepRelay} from '../public/cqc/originals/rook/relay-course.js';
import {TRACE_DURATION} from '../public/cqc/originals/rook/relay-signal.js';

test('a drone leaving the captured position during flight does not count as received', () => {
  const state = createRelayCourse();
  assert.equal(relayWindow(state), 'moving');
  const launched = launchRelay(state);
  assert.deepEqual(launched.trace.target, {x: 927, y: 483});
  assert.notDeepEqual(relayTargetAt(.5), launched.trace.target);
  const contact = stepRelay(launched, TRACE_DURATION.contactStart);
  assert.equal(contact.result, 'miss');
  assert.equal(contact.hits, 0);
  assert.deepEqual(contact.trace.target, launched.trace.target);
});

test('contact is evaluated at the scheduled arrival even if one frame skips the whole trace', () => {
  const nearTurn = {...createRelayCourse(), x: 550, time: .95};
  assert.equal(relayWindow(nearTurn), 'open');
  const launched = launchRelay(nearTurn);
  const before = stepRelay(launched, TRACE_DURATION.contactStart - .02);
  assert.equal(before.hits, 0);
  const settled = stepRelay(before, .7);
  assert.equal(settled.result, 'hit');
  assert.equal(settled.hits, 1);
  assert.equal(settled.trace, null);
  assert.equal(stepRelay(settled, 1).hits, 1);
});

test('range and facing remain enforced without consuming a trace', () => {
  const distant = {...createRelayCourse(), time: 1.2};
  assert.equal(launchRelay(distant).result, 'out-of-range');
  assert.equal(launchRelay(distant).trace, null);
  const turned = {...createRelayCourse(), face: -1};
  assert.equal(launchRelay(turned).result, 'wrong-direction');
  assert.equal(launchRelay(turned).trace, null);
});

test('the third contact completes the exercise and further launches remain locked', () => {
  const ready = {...createRelayCourse(), x: 550, time: .95, hits: 2};
  const last = stepRelay(launchRelay(ready), TRACE_DURATION.total + .1);
  assert.equal(last.result, 'complete');
  assert.equal(last.hits, 3);
  assert.strictEqual(launchRelay(last), last);
});
