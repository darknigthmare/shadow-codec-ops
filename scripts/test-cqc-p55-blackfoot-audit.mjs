import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {createHash, webcrypto} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import test from 'node:test';

const project = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const directory = path.join(project, 'public/cqc/atelier/p55-blackfoot');
const read = name => fs.readFileSync(path.join(directory, name));
const hash = bytes => createHash('sha256').update(new Uint8Array(bytes)).digest('hex');
const map = JSON.parse(read('PARTS_CANDIDATE_ACTUAL_V1.json'));
const clone = value => JSON.parse(JSON.stringify(value));
const point = (matrix, native) => [matrix[0] * native[0] + matrix[2] * native[1] + matrix[4], matrix[1] * native[0] + matrix[3] * native[1] + matrix[5]];
const close = (a, b) => assert(Math.abs(a - b) < 1e-9, `${a} differs from ${b}`);

function setup() {
  const context = vm.createContext({console, URL, TextDecoder, Blob, crypto: webcrypto});
  for (const file of ['blackfoot-isolated-controller-landing-v3.js', 'hangar-controller.js']) vm.runInContext(read(file).toString(), context, {filename: file});
  return {context, controller: context.CQC_P41_BLACKFOOT_ISOLATED, api: context.CQC_P55_BLACKFOOT_HANGAR};
}
function fixtureOptions(overrides = {}) {
  return {resolveURL: file => file, sha256: async bytes => hash(bytes),
    fetch: async file => {
      const bytes = read(file);
      return {ok: true, arrayBuffer: async () => bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength)};
    }, decode: async bytes => {
      const data = Buffer.from(bytes);
      return {width: data.readUInt32BE(16), height: data.readUInt32BE(20), close() { this.closed = true; }};
    }, ...overrides};
}
function recorder() {
  const calls = {save: 0, restore: 0, clip: 0, draw: 0, matrices: []};
  return {calls, context: {save() { calls.save++; }, restore() { calls.restore++; },
    transform(...matrix) { calls.matrices.push(matrix); }, beginPath() {}, moveTo() {}, lineTo() {}, closePath() {},
    clip() { calls.clip++; }, drawImage() { calls.draw++; }}};
}

test('P41 controller, 11-piece map and atlas are exact reused sources', () => {
  const {api} = setup();
  assert.equal(map.pieces.length, 11);
  for (const pin of api.sources) {
    const bytes = read(pin.file);
    assert.equal(bytes.length, pin.bytes); assert.equal(hash(bytes), pin.sha256);
  }
});
test('historical controller preserves right-only hold and unknown metric/destruction status', () => {
  const {controller} = setup(), rig = controller.create(map), status = rig.status();
  assert.equal(status.admitted, false); assert.deepEqual(Array.from(status.faces), ['right']);
  assert.equal(status.officialDimensionsKnown, false); assert.equal(status.destructionImplemented, false);
  assert.equal(rig.sample({facing: 'left'}), null);
  assert.throws(() => rig.sample({scale: -1}), /Explicit finite owner/);
});
test('432 geometry samples retain all seven mounted joints and actual gun axis', () => {
  const {controller} = setup(), rig = controller.create(map); let samples = 0, attachments = 0;
  for (const frame of [0, 1, 2, 3, 4, 6, 9, 120]) for (const position of [[0, 0], [630, 390], [1000, 500]])
    for (const pitchDegrees of [-4, 0, 4]) for (const aimDegrees of [-12, 0, 12]) for (const scale of [0.8, 1.8]) {
      const pose = rig.sample({frame, position, pitchDegrees, aimDegrees, scale});
      const body = pose.parts.find(part => part.id === 'fuselage');
      assert.equal(pose.parts.length, 8);
      for (const part of pose.parts.filter(part => part.spec.bodySocketNativeXY)) {
        const socket = point(body.matrix, part.spec.bodySocketNativeXY), pivot = point(part.matrix, part.spec.nativePivot);
        close(socket[0], pivot[0]); close(socket[1], pivot[1]); attachments++;
      }
      const gun = pose.parts.find(part => part.id === 'minigun');
      const base = point(gun.matrix, gun.spec.axisNative.base), tip = point(gun.matrix, gun.spec.axisNative.tip);
      close(tip[0], pose.muzzle.x); close(tip[1], pose.muzzle.y);
      const length = Math.hypot(tip[0] - base[0], tip[1] - base[1]);
      close((tip[0] - base[0]) / length, pose.muzzle.axis[0]); close((tip[1] - base[1]) / length, pose.muzzle.axis[1]);
      samples++;
    }
  assert.equal(samples, 432); assert.equal(attachments, 3024);
});
test('world translation moves body, parts and muzzle together without a player/camera dependency', () => {
  const {controller} = setup(), rig = controller.create(map);
  const first = rig.sample({position: [100, 200], frame: 6, pitchDegrees: 3, aimDegrees: -7});
  const moved = rig.sample({position: [420, 160], frame: 6, pitchDegrees: 3, aimDegrees: -7});
  for (const part of first.parts) {
    const other = moved.parts.find(row => row.id === part.id);
    close(other.matrix[4] - part.matrix[4], 320); close(other.matrix[5] - part.matrix[5], -40);
  }
  close(moved.muzzle.x - first.muzzle.x, 320); close(moved.muzzle.y - first.muzzle.y, -40);
  const again = rig.sample({position: [100, 200], frame: 6, pitchDegrees: 3, aimDegrees: -7, playerX: 1510, cameraX: -9000});
  assert.equal(JSON.stringify(again), JSON.stringify(first));
});
test('four admitted main-rotor phases cycle while the single tail-rotor projection remains rigid', () => {
  const {controller} = setup(), rig = controller.create(map);
  const poses = [0, 3, 6, 9].map(frame => rig.sample({frame}));
  assert.deepEqual(poses.map(pose => pose.mainRotorPhase), [0, 1, 2, 3]);
  assert.equal(new Set(poses.map(pose => JSON.stringify(pose.parts.find(part => part.id === 'tail_rotor').matrix))).size, 1);
  assert.equal(rig.sample({frame: 99, reducedMotion: true}).mainRotorPhase, 0);
  assert.equal(rig.sample({frame: 99, defeated: true}).muzzle, null);
});
test('existing corrected wheel mount geometry stays on the actual painted underside sockets', () => {
  const {controller} = setup(), pose = controller.create(map).sample({});
  for (const [id, socket, scale] of [['near_wheel', [487, 329], 0.18], ['far_wheel', [405, 321], 0.16], ['tail_wheel', [170, 248], 0.18]]) {
    const part = pose.parts.find(part => part.id === id);
    assert.deepEqual(Array.from(part.spec.bodySocketNativeXY), socket); assert.equal(part.spec.imageScale, scale);
  }
});
test('draw uses every actual part matrix and native clip without rewriting the pixels', () => {
  const {controller} = setup(), rig = controller.create(map), pose = rig.sample({frame: 6, pitchDegrees: 3, aimDegrees: 9});
  const recorded = recorder(); assert.equal(rig.draw(recorded.context, {}, pose), true);
  assert.equal(recorded.calls.draw, 8); assert.equal(recorded.calls.clip, 8); assert.equal(recorded.calls.save, 8); assert.equal(recorded.calls.restore, 8);
  assert.deepEqual(recorded.calls.matrices, Array.from(pose.parts, part => Array.from(part.matrix)));
});
test('hangar verifies all three exact sources and decoded dimensions before any draw', async () => {
  const {api} = setup(), requests = [], options = fixtureOptions();
  const session = api.create({...options, fetch: async (...args) => { requests.push(args[0]); return options.fetch(...args); }});
  assert.equal(session.sample({}), null); assert.equal(session.draw(recorder().context, {}), null);
  await session.load(); assert.equal(requests.length, 3); assert.equal(session.status().pins.length, 3);
  assert.equal(session.status().admitted, false); assert.equal(session.status().globalCatalogueModified, false);
});
test('hangar fixes the owner position and refuses left-facing substitution', async () => {
  const {api} = setup(), session = api.create(fixtureOptions()); await session.load();
  const first = session.sample({frame: 9, aimDegrees: 9}), again = session.sample({frame: 9, aimDegrees: 9, playerX: 1510, cameraX: -9999, position: [0, 0], scale: 10});
  assert.equal(JSON.stringify(first), JSON.stringify(again)); assert.equal(session.sample({facing: 'left'}), null);
});
test('a missing source leaves no partial drawing and a clean retry succeeds', async () => {
  const {api} = setup(), options = fixtureOptions(); let failed = true;
  const session = api.create({...options, fetch: async (file, request) => failed && file.endsWith('.png') ? {ok: false, status: 503} : options.fetch(file, request)});
  await assert.rejects(session.load(), /HTTP 503/);
  assert.equal(session.status().state, 'error'); assert.equal(session.sample({}), null);
  const recorded = recorder(); assert.equal(session.draw(recorded.context, {}), null); assert.equal(recorded.calls.draw, 0);
  failed = false; await session.load({reload: true}); assert.equal(session.status().state, 'ready');
});
test('tampered source pins, bad decoded images and aborted attempts cannot become ready', async () => {
  const {api} = setup(), options = fixtureOptions();
  await assert.rejects(api.create({...options, sha256: async () => '0'.repeat(64)}).load(), /source bytes differ/);
  const wrongImage = api.create({...options, decode: async () => ({width: 1, height: 1})});
  await assert.rejects(wrongImage.load(), /decoded atlas dimensions differ/); assert.equal(wrongImage.status().state, 'error');
  const controller = new AbortController(); controller.abort();
  const cancelled = api.create(options); await assert.rejects(cancelled.load({signal: controller.signal}), /aborted/);
  assert.equal(cancelled.sample({}), null);
});
test('an initially unavailable script can be supplied only after successful source verification', async () => {
  const {api, controller} = setup(), context = vm.createContext({URL, TextDecoder, Blob});
  vm.runInContext(read('hangar-controller.js').toString(), context);
  let verified = 0;
  const options = fixtureOptions({ensureController: async () => { assert.equal(verified, 3); return controller; }, sha256: async bytes => { verified++; return hash(bytes); }});
  const session = context.CQC_P55_BLACKFOOT_HANGAR.create(options); await session.load(); assert.equal(session.status().state, 'ready');
  assert.equal(api.admitted, false);
});
test('source data and the P54 Gander implementation remain unchanged', () => {
  const {controller} = setup(), before = JSON.stringify(map), rig = controller.create(map);
  for (let frame = 0; frame < 200; frame++) rig.sample({frame, aimDegrees: frame % 25 - 12});
  assert.equal(JSON.stringify(map), before);
  const gander = fs.readFileSync(path.join(project, 'public/cqc/src/cqc-p54-machine-parts.js'));
  assert.equal(hash(gander), '2014aafc93ed5655cd46dd0858f0041f01d8fad24efaa3e9063f57e50cb3f6c6');
});
