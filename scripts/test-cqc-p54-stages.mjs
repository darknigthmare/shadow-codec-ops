import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';

const code = fs.readFileSync(new URL('../public/cqc/src/cqc-p54-stages.js', import.meta.url), 'utf8');
const ID = 'p54_mgs2_oil_fence_hd';
function fixture() {
  const requested = [], calls = [], delegated = [];
  const dims = {'oil-fence-sunset-background.png': [1672, 941], 'oil-fence-pontoon.png': [2172, 724], 'oil-fence-steeple-pylon.png': [1536, 1024]};
  class Image {
    set src(url) { this.url = url; requested.push(this); }
    finish(ok = true) {
      [this.naturalWidth, this.naturalHeight] = dims[this.url.split('/').at(-1)];
      ok ? this.onload() : this.onerror();
    }
  }
  const old = {stages: [{id: 'old', name: 'Existing'}], owns: s => s?.id === 'old'};
  for (const method of ['status', 'preload', 'drawBackground', 'drawForeground']) {
    old[method] = (...args) => { delegated.push({method, args}); return method; };
  }
  const context = {save() {}, restore() {}, drawImage(image, ...args) { calls.push({url: image.url, args}); }, beginPath() {}, moveTo() {}, lineTo() {}, stroke() {}};
  const window = {CQC_SERVICE_YARD: old};
  vm.runInNewContext(code, {window, document: {currentScript: {src: 'http://localhost/cqc/src/cqc-p54-stages.js'}}, URL, Image});
  return {api: window.CQC_SERVICE_YARD, old, requested, calls, delegated, context};
}

test('new scene extends existing rooms and preserves all legacy delegation', () => {
  const f = fixture();
  assert.equal(f.api.stages[0], f.old.stages[0]);
  assert(f.api.stages.some(s => s.id === ID));
  assert.equal(f.api.owns({id: 'absent'}), false);
  for (const method of ['status', 'preload', 'drawBackground', 'drawForeground']) {
    assert.equal(f.api[method]({id: 'old'}, {motion: false}), method);
  }
  assert.equal(f.delegated.length, 4);
});

test('complete preload gates drawing without a partial or fallback image', async () => {
  const f = fixture(), stage = {id: ID};
  const first = f.api.preload(stage);
  assert.equal(f.api.preload(stage), first);
  assert.equal(f.requested.length, 3);
  f.requested[0].finish(); f.requested[1].finish();
  assert.equal(f.api.drawBackground(f.context, stage), false);
  assert.equal(f.calls.length, 0);
  f.requested[2].finish();
  assert.equal(await first, true);
  assert.equal(f.api.status(stage).approved, false);
  assert.equal(f.api.drawBackground(f.context, stage), true);
  assert.equal(f.calls.length, 3);
});

test('an image failure permits a clean retry and does not poison completed work', async () => {
  const f = fixture(), stage = {id: ID};
  const first = f.api.preload(stage);
  f.requested.forEach((image, i) => image.finish(i !== 1));
  assert.equal(await first, false);
  assert.equal(await f.api.preload(stage), false);
  const retry = f.api.preload(stage, {retry: true});
  assert.equal(f.requested.length, 4);
  f.requested[3].finish();
  assert.equal(await retry, true);
});

test('actual draw rectangles cover the viewport and register the pontoon at floor568 under pan/zoom', async () => {
  const f = fixture(), stage = {id: ID}, load = f.api.preload(stage);
  f.requested.forEach(image => image.finish()); await load;
  const centers = new Map();
  for (const zoom of [.76, 1, 1.15]) for (const camera of [-220, 0, 220]) {
    f.calls.length = 0;
    f.api.drawBackground(f.context, stage, {zoom, camera});
    const [x, y, w, h] = f.calls[0].args;
    assert(x <= 0 && y <= 0 && x + w >= 1280 && y + h >= 720);
    const pontoon = f.calls.find(call => call.url.endsWith('/oil-fence-pontoon.png')).args;
    const [, , sw, sh, dx, dy, dw, dh] = pontoon;
    assert.equal(sw, 2094); assert.equal(sh, 112);
    assert(Math.abs(dy + 7 / 112 * dh - 568) < 1e-8);
    assert(dx <= 0 && dx + dw >= 1280);
    if (!centers.has(zoom)) centers.set(zoom, dx);
    assert.equal(dx, centers.get(zoom));
  }
});

test('reduced motion produces identical image placements for opposite cameras and times', async () => {
  const f = fixture(), stage = {id: ID}, load = f.api.preload(stage);
  f.requested.forEach(image => image.finish()); await load;
  f.api.drawBackground(f.context, stage, {camera: -220, motion: false, time: 0});
  const first = JSON.stringify(f.calls); f.calls.length = 0;
  f.api.drawBackground(f.context, stage, {camera: 220, motion: false, time: 47});
  assert.equal(JSON.stringify(f.calls), first);
});
