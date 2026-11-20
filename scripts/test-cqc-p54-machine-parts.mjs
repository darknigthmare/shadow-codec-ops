import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {createHash, webcrypto} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import test from 'node:test';

const project = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const base = path.join(project, 'public/cqc');
const source = name => fs.readFileSync(path.join(base, 'src', name), 'utf8');
const contract = JSON.parse(fs.readFileSync(path.join(base, 'assets/p54-gander-parts/manifest.json')));
const hash = bytes => createHash('sha256').update(new Uint8Array(bytes)).digest('hex');
const clone = value => JSON.parse(JSON.stringify(value));
const ID = 'gander_ghost_gbc2000';

function setup() {
  const context = vm.createContext({console, URL, TextDecoder, Blob, crypto: webcrypto});
  context.window = context;
  const run = name => vm.runInContext(source(name), context, {filename: name});
  run('cqc-machine-parts-renderer-v1.js');
  run('cqc-machine-parts-catalog-v1.js');
  run('cqc-pass16-machine-catalog.js');
  const raw = clone(context.CQC_MACHINE_PARTS_CATALOG.machines.find(machine => machine.id === ID));
  let catalog = {schema: 'cqc.machine-parts/1', machines: [raw]};
  run('cqc-pass28-heavy-rig-fixes.js');
  catalog = context.CQC_PASS28_HEAVY_RIG_FIXES.apply(catalog).catalog;
  run('cqc-pass29-classic-articulation.js');
  catalog = context.CQC_PASS29_CLASSIC_ARTICULATION.apply(catalog).catalog;
  run('cqc-pass30-gander-fidelity.js');
  catalog = context.CQC_PASS30_GANDER_FIDELITY.apply(catalog).catalog;
  run('cqc-pass16-machine-pose-a.js');
  run('cqc-pass16-machine-pose-b.js');
  run('cqc-pass16-machine-pose.js');
  run('cqc-pass28-machine-geometry.js');
  run('cqc-p54-machine-parts.js');
  const factory = context.CQC_MACHINE_PARTS;
  return {context, factory, api: context.CQC_P54_MACHINE_PARTS, catalog, raw,
    machine: factory.normalizeCatalog(catalog).get(ID)};
}
function fixtureOptions(overrides = {}) {
  return {resolveURL: file => file, sha256: async bytes => hash(bytes),
    fetch: async file => {
      const bytes = fs.readFileSync(path.join(base, file));
      return {ok: true, arrayBuffer: async () => bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength)};
    },
    decode: async (bytes, pin) => {
      const png = Buffer.from(bytes);
      return {width: png.readUInt32BE(16), height: png.readUInt32BE(20), id: pin.file, close() { this.closed = true; }};
    }, ...overrides};
}
function recorder() {
  const draws = [], stack = [], context = {globalAlpha: 1,
    save() { stack.push(this.globalAlpha); }, restore() { this.globalAlpha = stack.pop(); },
    transform(...matrix) { this.matrix = matrix; }, rotate(rotation) { this.rotation = rotation; },
    drawImage(image, ...args) { draws.push({id: image.id, args, matrix: this.matrix.slice(), alpha: this.globalAlpha}); }};
  return {context, draws};
}
function world(geometry, pose, native) { return geometry.point(pose, pose.rect, native); }
function almost(a, b, message) { assert(Math.abs(a - b) < 1e-8, `${message}: ${a} != ${b}`); }

test('43 exact exported PNG pins remain bound to the three original atlas hashes', () => {
  assert.equal(contract.records.length, 43);
  assert.equal(contract.records.filter(row => row.representation === 'pass16').length, 19);
  assert.equal(contract.records.filter(row => row.representation === 'pass30').length, 24);
  for (const row of contract.records) {
    const bytes = fs.readFileSync(path.join(project, row.path));
    assert.equal(bytes.length, row.bytes);
    assert.equal(hash(bytes), row.sha256);
    assert.equal(createHash('sha1').update(Buffer.concat([Buffer.from(`blob ${bytes.length}\0`), bytes])).digest('hex'), row.gitBlobOID);
    assert.equal(row.sourceSHA256, contract.originalSources[row.source].sha256);
  }
});
test('both historical and current source-camera contracts validate without adding joints', () => {
  const {api, factory, raw, machine} = setup();
  assert.equal(api.validateContract(contract, machine).length, 24);
  const historical = factory.normalizeCatalog({schema: 'cqc.machine-parts/1', machines: [raw]}).get(ID);
  assert.equal(api.validateContract(contract, historical).length, 19);
  assert.equal(machine.parts.length, 27);
});
test('changed joint parent, source, clipping or pivot is rejected before drawing', () => {
  const {api, machine} = setup();
  for (const [key, value] of [['parent', 'anchor'], ['sourceSHA256', '0'.repeat(64)], ['pivotXY', [0, 0]], ['sourceClipPolygonNativeXY', null]]) {
    const changed = clone(contract), row = changed.records.find(row => row.representation === 'pass30' && row.part === 'carapace');
    row[key] = value;
    assert.throws(() => api.validateContract(changed, machine), /native rig differs/);
  }
});
test('current camera loads only its 24 individual PNGs and pins the manifest', async () => {
  const {api, factory, machine} = setup(), fetched = [];
  const options = fixtureOptions(), painter = api.createPainter(machine, factory, {...options, fetch: async (...args) => { fetched.push(args[0]); return options.fetch(...args); }});
  assert.equal(painter.ready(), false);
  await painter.load();
  assert.equal(painter.ready(), true);
  assert.equal(painter.status().pins.length, 24);
  assert.equal(fetched.length, 25);
  assert(fetched.every(file => file.includes('/pass30/') || file.endsWith('/manifest.json')));
  assert(!fetched.some(file => /machines-pass30|machine-parts-pass16/.test(file)));
});
test('neutral and open-jaw draws preserve source placement and all existing matrices', async () => {
  const {api, factory, machine} = setup();
  const painter = api.createPainter(machine, factory, fixtureOptions()); await painter.load();
  for (const flags of [{}, {ganderMouthOpen: true}]) {
    const state = {origin: [1160, 0], channels: {}, flags}, poses = factory.pose(machine, state), recorded = recorder();
    assert.equal(painter.draw(recorded.context, state), true);
    assert.equal(recorded.draws.length, 23);
    for (const draw of recorded.draws) {
      const row = contract.records.find(row => row.file === draw.id), pose = poses.get(row.part);
      assert.deepEqual(draw.matrix, Array.from(pose.matrix));
      const [dx, dy, width, height] = draw.args.slice(4), r = row.sourceRectXYWH;
      almost(dx, (r[0] - pose.rect[0] - pose.pivot[0]) * pose.imageScale, row.part);
      almost(dy, (r[1] - pose.rect[1] - pose.pivot[1]) * pose.imageScale, row.part);
      almost(width, r[2] * pose.imageScale, row.part);
      almost(height, r[3] * pose.imageScale, row.part);
    }
    assert(recorded.draws.some(draw => draw.id.endsWith(flags.ganderMouthOpen ? 'jaw_lower_plate-open.png' : 'jaw_lower_plate.png')));
  }
});
test('muzzles share the independent native-world geometry at aim, recoil, fold and stomp extremes', () => {
  const {api, factory, machine, context} = setup(), painter = api.createPainter(machine, factory, fixtureOptions());
  let checked = 0;
  for (const aim of [-22, 0, 22]) for (const fold of [0, 0.5, 1]) for (const recoil of [0, 0.5, 1]) for (const lift of [0, 35, 75]) {
    const state = context.CQC_PASS30_GANDER_FIDELITY.presentationPose(ID, {origin: [1160, 0], flags: {}, channels: {
      weaponAimDegreesNear: aim, weaponAimDegreesFar: -aim, weaponRecoilImpulse: recoil, ganderFold: fold,
      ganderNearLift: lift, ganderFarLift: 0}});
    const poses = factory.pose(machine, state);
    for (const [part, native] of [['near_rail_barrel', [1485, 174]], ['far_rail_barrel', [1485, 135]]]) {
      const actual = painter.sourcePoint(part, native, state), expected = world(context.CQC_PASS28_MACHINE_GEOMETRY, poses.get(part), native);
      almost(actual.x, expected.x, `${part} x`); almost(actual.y, expected.y, `${part} y`); checked++;
    }
  }
  assert.equal(checked, 162);
});
test('rail and leg children stay on their actual articulated parent under motion', () => {
  const {factory, machine, context} = setup();
  for (const lift of [0, 30, 75]) for (const aim of [-22, 0, 22]) {
    const state = context.CQC_PASS30_GANDER_FIDELITY.presentationPose(ID, {channels: {ganderNearLift: lift, weaponAimDegrees: aim}, flags: {}});
    const poses = factory.pose(machine, state);
    for (const id of ['near_thigh', 'near_shin', 'near_foot', 'near_rail_barrel', 'far_rail_barrel']) {
      const part = machine.parts.find(part => part.id === id), own = poses.get(id), parent = poses.get(part.parent);
      const dx = part.offset[0] + (part.channels.x || []).reduce((sum, row) => sum + (state.channels[row.channel] || 0) * row.factor, 0);
      const dy = part.offset[1] + (part.channels.y || []).reduce((sum, row) => sum + (state.channels[row.channel] || 0) * row.factor, 0);
      const m = parent.matrix;
      almost(own.matrix[4], m[0] * dx - m[2] * dy + m[4], `${id} attached x`);
      almost(own.matrix[5], m[1] * dx - m[3] * dy + m[5], `${id} attached y`);
    }
  }
});
test('player position does not move the boss or emitted native muzzle', () => {
  const {api, factory, machine, context} = setup(), painter = api.createPainter(machine, factory, fixtureOptions());
  const points = [90, 800, 1510].map(x => {
    const state = {frame: 120, player: {x, y: 0}, boss: {id: 'gander', phase: 1, x: 1160, legs: {near: 2400, far: 2400}}};
    const raw = factory.corePose(state, {id: ID});
    const adapted = context.CQC_PASS30_GANDER_FIDELITY.presentationPose(ID, raw);
    return painter.sourcePoint('near_rail_barrel', [1485, 174], adapted);
  });
  assert.deepEqual(points[0], points[1]); assert.deepEqual(points[1], points[2]);
});
test('a failed piece never produces a partial rig and can be retried', async () => {
  const {api, factory, machine} = setup(), options = fixtureOptions(); let failed = true;
  const painter = api.createPainter(machine, factory, {...options, fetch: async (file, request) => failed && file.endsWith('/near_foot.png') ? {ok: false, status: 503} : options.fetch(file, request)});
  await assert.rejects(painter.load(), /HTTP 503/);
  assert.equal(painter.ready(), false); assert.equal(painter.status().state, 'error');
  const recorded = recorder(); assert.equal(painter.draw(recorded.context, {}), false); assert.equal(recorded.draws.length, 0);
  failed = false; await painter.load({reload: true}); assert.equal(painter.ready(), true);
});
test('manifest and individual source tampering fail before admission', async () => {
  const {api, factory, machine} = setup(), options = fixtureOptions();
  const alteredManifest = api.createPainter(machine, factory, {...options, sha256: async () => '0'.repeat(64)});
  await assert.rejects(alteredManifest.load(), /contract SHA256 differs/);
  const changedPNG = api.createPainter(machine, factory, {...options, contract, sha256: async () => '0'.repeat(64)});
  await assert.rejects(changedPNG.load(), /PNG bytes differ/);
  assert.equal(changedPNG.ready(), false);
});
test('registry wraps Gander only and never fetches an old atlas as a loading fallback', async () => {
  const {api, factory, catalog} = setup(), fetched = [], options = fixtureOptions();
  const wrapped = api.wrapFactory(factory, {...options, fetch: async (...args) => { fetched.push(args[0]); return options.fetch(...args); }});
  const registry = wrapped.create(catalog, options);
  assert.equal(registry.ready(ID), false); await registry.load(ID); assert.equal(registry.ready(ID), true);
  assert.equal(registry.status(ID).pins.length, 24);
  assert(fetched.every(file => file.includes('/p54-gander-parts/')));
  registry.dispose(ID); assert.equal(registry.ready(ID), false);
  assert.equal(api.wrapFactory(wrapped), wrapped);
});
test('abort and dispose release a partial attempt without admitting it or poisoning a later load', async () => {
  const {api, factory, machine} = setup(), options = fixtureOptions(), controller = new AbortController();
  let block = true;
  const painter = api.createPainter(machine, factory, {...options, contract, fetch: async (file, request) => {
    if (!block) return options.fetch(file, request);
    return new Promise((resolve, reject) => request.signal.addEventListener('abort', () => reject(new Error('aborted')), {once: true}));
  }});
  const attempt = painter.load({signal: controller.signal});
  await Promise.resolve(); controller.abort();
  await assert.rejects(attempt, /aborted/); assert.equal(painter.ready(), false);
  block = false; await painter.load({reload: true}); assert.equal(painter.ready(), true);
  painter.dispose(); assert.equal(painter.ready(), false);
  await painter.load(); assert.equal(painter.ready(), true);
});
test('non-Gander registries and operations keep the original renderer behavior', async () => {
  const {api, factory, catalog} = setup(), calls = [];
  const other = {ready: id => { calls.push(['ready', id]); return true; },
    status: id => { calls.push(['status', id]); return {id, state: 'original'}; },
    load: async (id, request) => { calls.push(['load', id, request]); return 'original load'; },
    draw: (...args) => { calls.push(['draw', args[1]]); return 'original draw'; },
    drawCore: (...args) => { calls.push(['drawCore', args[1].boss.id]); return 'original Core'; },
    dispose: id => { calls.push(['dispose', id]); return 'original dispose'; }};
  const wrapped = api.wrapFactory({...factory, create: () => other}).create(catalog, fixtureOptions());
  assert.equal(wrapped.ready('rex'), true); assert.equal(wrapped.status('rex').state, 'original');
  assert.equal(await wrapped.load('rex', {reload: true}), 'original load');
  assert.equal(wrapped.draw({}, 'rex', {}), 'original draw');
  assert.equal(wrapped.drawCore({}, {boss: {id: 'rex'}}, {}), 'original Core');
  assert.equal(wrapped.dispose('rex'), 'original dispose');
  assert.equal(calls.length, 6);
});
test('source manifests and match states remain byte-identical throughout presentation', async () => {
  const {api, factory, machine, context} = setup(), before = JSON.stringify(contract);
  const painter = api.createPainter(machine, factory, fixtureOptions()); await painter.load();
  const state = {origin: [1160, 0], flags: {ganderMouthOpen: true}, channels: {ganderNearLift: 35, weaponRecoilImpulse: 1}};
  const raw = JSON.stringify(state), adapted = context.CQC_PASS30_GANDER_FIDELITY.presentationPose(ID, state), recorded = recorder();
  painter.draw(recorded.context, adapted); painter.sourcePoint('near_rail_barrel', [1485, 174], adapted);
  assert.equal(JSON.stringify(state), raw); assert.equal(JSON.stringify(contract), before);
});
