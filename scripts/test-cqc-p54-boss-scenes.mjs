import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import test from 'node:test';
const code = fs.readFileSync(new URL('../public/cqc/src/cqc-p54-boss-scenes.js', import.meta.url), 'utf8');
function fixture() {
  let loaded = false, finish;
  const draws = [], delegated = [], resumed = [];
  const stages = [{id: 'p54_mgs1_tank_canyon', name: 'Canyon'}];
  const renderer = {stages, status: () => ({state: loaded ? 'ready' : 'unloaded'}),
    preload: () => new Promise(resolve => { finish = ok => { loaded = ok; resolve(ok); }; }),
    drawBackground: (ctx, stage, options) => { draws.push({kind: 'back', stage: stage.id, options}); return true; },
    drawForeground: (ctx, stage, options) => { draws.push({kind: 'front', stage: stage.id, options}); return true; }};
  const old = {bindings: () => [{id: 'm1tank'}, {id: 'rex'}], diagnostics: () => ({backgrounds: 0})};
  for (const method of ['ready', 'preload', 'cancelPending', 'deferLaunch', 'drawBackground', 'drawForeground', 'caption']) {
    old[method] = (...args) => { delegated.push({method, args}); return method; };
  }
  const window = {CQC_PASS27_ARSENAL_NATIVE_SCENES: old, CQC_SERVICE_YARD: renderer};
  const nodes = [];
  const document = {createElement: () => ({setAttribute() {}, style: {}}), body: {append(node) { nodes.push(node); }}};
  vm.runInNewContext(code, {window, document, localStorage: {getItem: () => null}});
  const ctx = {canvas: {width: 1280, dataset: {}}, save() {}, restore() {}, fillRect() {}, translate() {}};
  return {api: window.CQC_P54_BOSS_SCENES, draws, delegated, resumed, ctx,
    finish: ok => finish(ok), resume: (...args) => resumed.push(args)};
}
const flush = () => new Promise(resolve => setImmediate(resolve));

test('cold launch retains the existing (definition, mode, callback) API', async () => {
  const f = fixture();
  assert.equal(f.api.deferLaunch({id: 'm1tank'}, 'practice', f.resume), true);
  assert.equal(f.resumed.length, 0);
  f.finish(true); await flush();
  assert.deepEqual(f.resumed, [['m1tank', 'practice']]);
  assert.equal(f.api.deferLaunch({id: 'm1tank'}, 'combat', f.resume), false);
});

test('selection cancellation and failed preload cannot start a stale encounter', async () => {
  const f = fixture();
  f.api.deferLaunch({id: 'm1tank'}, 'practice', f.resume);
  f.api.cancelPending(); f.finish(true); await flush();
  assert.equal(f.resumed.length, 0);
  const g = fixture(); g.api.deferLaunch({id: 'm1tank'}, 'combat', g.resume);
  g.finish(false); await flush(); assert.equal(g.resumed.length, 0);
});

test('unaffected encounters retain exact callback delegation order', () => {
  const f = fixture(), def = {id: 'rex'};
  assert.equal(f.api.deferLaunch(def, 'practice', f.resume), 'deferLaunch');
  const call = f.delegated.at(-1);
  assert.equal(call.args[0], def); assert.equal(call.args[1], 'practice'); assert.equal(call.args[2], f.resume);
});

test('boss scenery stays on the same world anchor as the player crosses it', async () => {
  const f = fixture(), def = {id: 'm1tank'};
  const load = f.api.preload(def); f.finish(true); await load;
  for (const x of [80, 640, 1200]) {
    const state = {def, tick: 120, player: {x}, camera: x};
    f.api.drawBackground(f.ctx, state); f.api.drawForeground(f.ctx, state);
  }
  assert.equal(f.draws.length, 6);
  for (const draw of f.draws) assert.equal(draw.options.camera, 0);
  assert.equal(new Set(f.draws.map(draw => JSON.stringify(draw.options))).size, 1);
  assert.equal(f.ctx.canvas.dataset.stageGroundY, '598');
  assert.equal(f.ctx.canvas.dataset.stageId, 'p54_mgs1_tank_canyon');
});
