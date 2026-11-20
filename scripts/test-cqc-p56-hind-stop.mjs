import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import test from 'node:test';
import {fileURLToPath} from 'node:url';

const project = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cqc = path.join(project, 'public/cqc');
const id = 'hind_d_mgs1_ps1_1998';

function setup() {
  const context = vm.createContext({console, URL, AbortController, TextDecoder, Blob});
  context.window = context;
  const html = fs.readFileSync(path.join(cqc, 'modules/arsenal-files-v044.html'), 'utf8');
  const scripts = [...html.matchAll(/<script\b[^>]*\bsrc="([^"]+)"/g)].map(match => match[1]);
  let bridgeAPI;
  for (const file of scripts) {
    const full = path.resolve(cqc, 'modules', file);
    const isBridge = file.endsWith('/cqc-pass18-machine-bridge.js');
    if (isBridge) context.module = {exports: {}};
    vm.runInContext(fs.readFileSync(full, 'utf8'), context, {filename: file});
    if (isBridge) { bridgeAPI = context.module.exports; delete context.module; break; }
  }
  assert(bridgeAPI, 'Active Arsenal native bridge script must remain reachable');
  const factory = context.CQC_MACHINE_PARTS;
  const machine = factory.normalizeCatalog(context.CQC_MACHINE_PARTS_CATALOG).get(id);
  let drawn;
  const registry = {ready: () => true, status: key => ({id: key, state: 'ready', pins: []}),
    draw(_ctx, key, pose) { assert.equal(key, id); drawn = pose; return true; }, dispose() {}};
  const bridge = bridgeAPI.createBridge({catalog: context.CQC_MACHINE_PARTS_CATALOG,
    data: context.CQC_PASS18_MACHINE_DATA, parts: factory, registry,
    reducedMotion: () => false, disableLifecycleListeners: true});
  const canvas = {save() {}, restore() {}, transform() {}, canvas: {}};
  const state = (frame, hp = [100, 100, 100]) => ({tick: frame, revision: 1,
    def: {id: 'hind_d', parts: [{y: 100}, {y: 100}, {y: 100}]}, hp, max: [100, 100, 100],
    boss: {x: 900, y: 440}, player: {x: 300, y: 500}, status: 'fight', events: []});
  const draw = input => { assert(bridge.drawArsenal(canvas, input)); return drawn; };
  return {context, factory, machine, bridge, state, draw};
}

const close = (a, b, message) => assert(Math.abs(a - b) < 1e-8, `${message}: ${a} != ${b}`);
function world(basis, point) {
  return {x: basis[0] * point.x + basis[2] * point.y + basis[4],
    y: basis[1] * point.x + basis[3] * point.y + basis[5]};
}

test('partial rotor destruction stops the additional hover while the encounter remains active', () => {
  const {state, draw} = setup();
  for (const frame of [3, 15, 45, 75, 120, 180, 240]) {
    const input = state(frame, [0, 100, 100]), pose = draw(input);
    assert.equal(input.status, 'fight'); assert.equal(pose.defeated, false);
    assert.equal(pose.flags.part0Destroyed, true);
    assert.equal(pose.flags.hindMainRotorFrame0, true);
    assert.equal(pose.channels.pass34HindHover, 0, `Stopped rotor must not keep the additional hover at frame ${frame}`);
  }
});

test('the admitted intact hover remains unchanged and other damage groups do not stop it', () => {
  const {state, draw} = setup();
  for (const frame of [15, 45, 75, 120]) {
    const expected = Math.sin(frame * .035) * 1.5;
    for (const hp of [[100, 100, 100], [100, 0, 100], [100, 100, 0]]) {
      close(draw(state(frame, hp)).channels.pass34HindHover, expected, 'Intact main rotor hover');
    }
  }
});

test('the stopped pose retains its existing parent sockets and real source muzzle', () => {
  const {context, factory, machine, bridge, state, draw} = setup();
  const input = state(45, [0, 100, 100]), pose = draw(input);
  const poses = factory.pose(machine, pose), geometry = context.CQC_PASS28_MACHINE_GEOMETRY;
  for (const [child, childXY, parent, parentXY] of [
    ['near_rockets', [224, 605], 'near_stubwing', [922, 514]],
    ['far_rockets', [922, 152], 'far_stubwing', [1275, 494]],
    ['tail_rotor', [198, 897], 'tail_boom', [1107, 50]],
  ]) {
    // Detached rotor debris has its own snapshot pipeline; test mounted pods here.
    if (machine.parts.find(part => part.id === child).detachment?.when === 'part0Destroyed') continue;
    const a = geometry.point(poses.get(child), poses.get(child).rect, childXY);
    const b = geometry.point(poses.get(parent), poses.get(parent).rect, parentXY);
    close(a.x, b.x, `${child} socket X`); close(a.y, b.y, `${child} socket Y`);
  }
  const vector = bridge.arsenalWeaponVector(input, {kind: 'shot', sources: [0]});
  const tipPose = poses.get('near_rockets');
  const native = geometry.point(tipPose, tipPose.rect, [103, 680]);
  const expected = world(bridge.arsenalGeometry(input).basis, native);
  close(vector.x, expected.x, 'Muzzle X follows final mounted part');
  close(vector.y, expected.y, 'Muzzle Y follows final mounted part');
});

test('player approach cannot change the stopped rig basis, attached sockets or muzzle', () => {
  const {state, draw, bridge} = setup(), input = state(45, [0, 100, 100]);
  const before = JSON.stringify(input);
  const basis = [...bridge.arsenalGeometry(input).basis];
  const muzzle = bridge.arsenalWeaponVector(input, {kind: 'shot', sources: [0]});
  for (const x of [120, 300, 700, 1150]) {
    const next = {...input, player: {...input.player, x}};
    assert.deepEqual([...bridge.arsenalGeometry(next).basis], basis);
    const pose = draw(next); assert.equal(pose.channels.pass34HindHover, 0);
    const other = bridge.arsenalWeaponVector(next, {kind: 'shot', sources: [0]});
    close(other.x, muzzle.x, 'Player-independent muzzle X'); close(other.y, muzzle.y, 'Player-independent muzzle Y');
  }
  assert.equal(JSON.stringify(input), before, 'Rendering must not mutate encounter state');
});
