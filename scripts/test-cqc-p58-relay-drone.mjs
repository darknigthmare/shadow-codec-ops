import test from 'node:test';
import assert from 'node:assert/strict';
import {drawRelayDrone, getRelayDroneGeometry} from '../public/cqc/originals/rook/relay-drone.js';

test('receiver pin is caller-owned and unchanged by phase, signal, facing or reduced motion', () => {
  for (const direction of [-1, 1]) for (const phase of [0, .3, 3, 100]) for (const reducedMotion of [false, true]) {
    const geometry = getRelayDroneGeometry({x: 930, y: 340, phase, direction, signal: .8, reducedMotion});
    assert.deepEqual(geometry.target, {x: 930, y: 340});
    assert.equal(geometry.fixedScale, 1);
    assert.ok(Object.isFrozen(geometry) && Object.isFrozen(geometry.target));
    assert.deepEqual(geometry.pivots.fuselage, geometry.target);
    assert.equal(geometry.fans.length, 2);
  }
});

test('fans articulate independently while reduced motion is steady without suppressing trajectory', () => {
  const options = {x: 930, y: 340};
  const first = getRelayDroneGeometry({...options, phase: 0});
  const second = getRelayDroneGeometry({...options, phase: 1});
  assert.notEqual(second.fans[0].bladeAngle, second.fans[1].bladeAngle);
  assert.notDeepEqual(first.fans[0].center, second.fans[0].center);
  assert.deepEqual(getRelayDroneGeometry({...options, phase: 0, reducedMotion: true}),
    getRelayDroneGeometry({...options, phase: 7, reducedMotion: true}));
  const moved = getRelayDroneGeometry({x: 970, y: 360, phase: 7, reducedMotion: true});
  assert.deepEqual(moved.target, {x: 970, y: 360});
});

test('draw/query geometry agree, preserve Canvas state and contain articulated duct bounds', () => {
  let depth = 0;
  const ctx = new Proxy({}, {get: (_, name) => name === 'save' ? () => { depth++; }
    : name === 'restore' ? () => { depth--; } : name === 'globalAlpha' ? 1 : () => {}, set: () => true});
  for (const direction of [-1, 1]) for (const phase of [0, 1, 3]) {
    const options = {x: 300, y: 220, phase, direction, signal: 1};
    const geometry = drawRelayDrone(ctx, options);
    assert.deepEqual(geometry, getRelayDroneGeometry(options)); assert.equal(depth, 0);
    for (const fan of geometry.fans) {
      assert.ok(fan.bounds.left >= geometry.bounds.left && fan.bounds.right <= geometry.bounds.right);
      assert.ok(fan.bounds.top >= geometry.bounds.top && fan.bounds.bottom <= geometry.bounds.bottom);
    }
  }
});
