import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';

const code = fs.readFileSync(new URL('../public/cqc/src/cqc-p57-beacon-yard.js', import.meta.url), 'utf8');
function fixture(reduced = false) {
  const delegated = [];
  const previous = {stages: [{id: 'prior'}], owns: value => value?.id === 'prior'};
  for (const method of ['status', 'preload', 'drawBackground', 'drawForeground']) {
    previous[method] = (...args) => { delegated.push({method, args}); return method; };
  }
  const window = {CQC_SERVICE_YARD: previous, matchMedia: () => ({matches: reduced})};
  vm.runInNewContext(code, {window, Number, Math, Object, Promise});
  return {window, api: window.CQC_SERVICE_YARD, stage: window.CQC_P57_BEACON_YARD.stages[0],
    geometry: window.CQC_P57_BEACON_YARD.geometry, delegated};
}
function canvas() {
  const calls = [], state = [];
  const c = {calls, depth: 0,
    save() { this.depth++; state.push({}); calls.push(['save']); },
    restore() { assert.ok(this.depth > 0); this.depth--; state.pop(); calls.push(['restore']); },
    createLinearGradient(...args) {
      calls.push(['gradient', ...args]); return {addColorStop: (...args) => calls.push(['stop', ...args])};
    }};
  for (const name of ['fillRect', 'beginPath', 'moveTo', 'lineTo', 'stroke', 'ellipse',
    'fill', 'closePath', 'translate', 'scale', 'rotate', 'quadraticCurveTo', 'fillText', 'rect', 'clip']) {
    c[name] = (...args) => {
      for (const value of args) if (typeof value === 'number') assert.ok(Number.isFinite(value), `${name}: finite coordinates`);
      calls.push([name, ...args]);
    };
  }
  return c;
}
test('the original exercise is immediately selectable and requires no image or network work', async () => {
  const {api, stage} = fixture();
  assert.equal(api.stages.length, 2);
  assert.equal(stage.id, 'p57_meridien_beacon_yard');
  assert.equal(stage.original, true);
  assert.equal(api.owns(stage), true);
  assert.equal(api.status(stage).state, 'ready');
  assert.equal(api.status(stage).planes, 3);
  assert.equal(await api.preload(stage), true);
});
test('three independent depths move monotonically while the fighting floor stays568', () => {
  const {geometry} = fixture();
  const left = geometry({camera: -220}), right = geometry({camera: 220});
  assert.equal(left.floor, 568); assert.equal(right.floor, 568);
  assert.deepEqual(Array.from(left.planes, p => p.depth), [.10, .33, .70]);
  for (let i = 0; i < 3; i++) {
    assert.equal(left.planes[i].offsetX, -right.planes[i].offsetX);
    assert.ok(left.planes[i].offsetX > (i ? left.planes[i - 1].offsetX : 0));
  }
});
test('both user and operating-system reduced motion freeze weather instruments, clouds and parallax', () => {
  for (const osReduced of [false, true]) {
    const {geometry, api, stage} = fixture(osReduced);
    const options = osReduced ? {} : {motion: false};
    const a = canvas(), b = canvas();
    for (const method of ['drawBackground', 'drawForeground']) {
      api[method](a, stage, {...options, camera: -220, time: 3});
      api[method](b, stage, {...options, camera: 220, time: 98});
    }
    assert.deepEqual(a.calls, b.calls);
    assert.equal(geometry({...options, time: 50}).time, 0);
  }
});
test('rendering balances canvas state and keeps foreground below the entire fighting lane', () => {
  const {api, stage} = fixture();
  for (const camera of [-220, 0, 220]) for (const zoom of [.76, 1, 1.15]) {
    const rear = canvas(), front = canvas();
    assert.equal(api.drawBackground(rear, stage, {camera, zoom, time: 8}), true);
    assert.equal(api.drawForeground(front, stage, {camera, zoom, time: 8}), true);
    assert.equal(rear.depth, 0); assert.equal(front.depth, 0);
    assert.ok(rear.calls.some(call => call[0] === 'fillRect' && call[1] === 0 && call[2] === 568 && call[3] === 1280));
    assert.ok(front.calls.some(call => JSON.stringify(call) === JSON.stringify(['rect', 0, 642, 1280, 78])));
    assert.ok(front.calls.findIndex(call => call[0] === 'clip') < front.calls.findIndex(call => call[0] === 'fillRect'));
  }
});
test('nonfinite inputs cannot produce invalid draw coordinates; old stages delegate unchanged', () => {
  const {api, stage, geometry, delegated} = fixture();
  const c = canvas(); api.drawBackground(c, stage, {camera: Infinity, zoom: NaN, time: NaN});
  assert.equal(c.depth, 0); assert.equal(geometry({camera: Infinity}).camera, 0);
  const unknown = {id: 'unowned'}, options = {camera: 4};
  for (const method of ['status', 'preload', 'drawBackground', 'drawForeground']) {
    const args = method.startsWith('draw') ? [c, unknown, options] : [unknown, options];
    assert.equal(api[method](...args), method);
  }
  assert.deepEqual(delegated.map(x => x.method), ['status', 'preload', 'drawBackground', 'drawForeground']);
});
test('loading the module twice never duplicates the stage or renderer wrapper', () => {
  const {window, api} = fixture();
  vm.runInNewContext(code, {window, Number, Math, Object, Promise});
  assert.equal(window.CQC_SERVICE_YARD, api);
  assert.equal(api.stages.filter(s => s.id === 'p57_meridien_beacon_yard').length, 1);
});
test('the existing mode adapter exposes the same original exercise in Core and Versus selections', () => {
  const {api, stage} = fixture();
  const adapterCode = fs.readFileSync(new URL('../public/cqc/src/cqc-p54-mode-scenes.js', import.meta.url), 'utf8');
  const context = {};
  vm.runInNewContext(adapterCode, context);
  const adapter = context.CQC_P54_MODE_SCENES_FACTORY.createAdapter({service: () => api});
  const core = [], versus = [];
  assert.equal(adapter.appendCoreStages(core), 1);
  assert.equal(adapter.appendStages(versus), 1);
  assert.equal(core[0].id, stage.id); assert.equal(versus[0].id, stage.id);
  assert.equal(core[0].episodeId, 'vr');
  assert.equal(core[0].template, 'authored-exercise');
  assert.equal(core[0].approved, false);
  assert.equal(adapter.resolve(stage.id).name, stage.name);
  assert.equal(adapter.status(stage.id).state, 'ready');
});
