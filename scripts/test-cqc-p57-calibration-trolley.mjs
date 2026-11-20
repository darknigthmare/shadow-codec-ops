import test from 'node:test';
import assert from 'node:assert/strict';
import {drawCalibrator, getCalibratorBounds} from '../public/cqc/originals/rook/calibration-trolley.js';

test('stationary receiver and ground contacts never follow aim, hit, recoil or animation', () => {
  for (const direction of [-1, 1]) for (const frame of [0, 17, 120, 1000]) {
    const value = getCalibratorBounds({x: 944, floor: 568, direction, frame, aim: .6, hit: 1, recoil: 1, motion: .8});
    assert.deepEqual(value.anchor, {x: 944, y: 568});
    assert.deepEqual(value.target, {x: 944 + direction * 8, y: 484});
    assert.ok(value.target.x - 340 <= 620);
    assert.equal(value.contactBounds.bottom, 568);
    assert.ok(value.contacts.filter(contact => !contact.far).every(contact => contact.y === 568));
    assert.ok(value.contacts.filter(contact => contact.far).every(contact => contact.y === 562));
    assert.ok(value.target.x >= value.targetRect.left && value.target.x <= value.targetRect.right);
  }
});

test('arm, recoil and independent wheels animate without moving the chassis', () => {
  const rest = getCalibratorBounds({x: 944, floor: 568, frame: 30});
  const aimed = getCalibratorBounds({x: 944, floor: 568, frame: 30, aim: .5});
  const recoil = getCalibratorBounds({x: 944, floor: 568, frame: 30, recoil: 1});
  const rolling = getCalibratorBounds({x: 944, floor: 568, frame: 30, motion: .4});
  assert.notDeepEqual(rest.emitter, aimed.emitter); assert.notDeepEqual(rest.emitter, recoil.emitter);
  assert.deepEqual(rest.target, rolling.target); assert.notDeepEqual(rest.wheelPhases, rolling.wheelPhases);
  assert.equal(new Set(rest.wheelPhases).size, 4);
  assert.ok(Object.isFrozen(rest) && Object.isFrozen(rest.target));
});

test('draw and contact query agree, preserve the caller Canvas stack and contain emitter extremes', () => {
  let depth = 0;
  const ctx = new Proxy({}, {get: (_, name) => name === 'save' ? () => { depth++; }
    : name === 'restore' ? () => { depth--; } : () => {}, set: () => true});
  for (const direction of [-1, 1]) for (const aim of [-.4, 0, .65]) {
    const options = {x: 944, floor: 568, frame: 17, direction, aim, hit: 1, recoil: .7};
    const value = drawCalibrator(ctx, options);
    assert.deepEqual(value, getCalibratorBounds(options)); assert.equal(depth, 0);
    for (const p of [value.emitter, ...Object.values(value.joints), ...value.contacts]) {
      assert.ok(p.x >= value.bounds.left && p.x <= value.bounds.right);
      assert.ok(p.y >= value.bounds.top && p.y <= value.bounds.bottom);
    }
  }
});
