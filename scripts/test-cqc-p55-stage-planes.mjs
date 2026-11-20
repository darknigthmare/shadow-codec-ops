import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';

const code = fs.readFileSync(new URL('../public/cqc/src/cqc-p55-stage-planes.js', import.meta.url), 'utf8');
const ids = ['p54_mgs1_tank_canyon', 'p54_mgs1_hind_tower_b', 'p54_mgr_r00_africa_avenue'];
const manifest = {scenes: ids.map(id => ({id, width: 1672, height: 941, foot: .82,
  background: id + '-background.png', planes: [
    {file: id + '-object.png', sourceRect: [20, 30, 400, 300], placement: [1000, 200, 400, 300], depth: .3, phase: 'background'},
    {file: id + '-near.png', sourceRect: [0, 0, 1600, 100], placement: [0, 841, 1672, 100], depth: .65, phase: 'foreground', clipBelowFloor: true}]}))};
const flush = () => new Promise(resolve => setImmediate(resolve));
function fixture({badManifest = false} = {}) {
  const requested = [], calls = [], delegated = [];
  let failManifest = badManifest, fetches = 0;
  class Image {
    set src(url) { this.url = url; requested.push(this); }
    finish(ok = true) { this.naturalWidth = 1672; this.naturalHeight = 941; ok ? this.onload() : this.onerror(); }
  }
  const old = {stages: [{id: 'old'}, ...ids.map(id => ({id}))], owns: stage => stage?.id === 'old'};
  for (const method of ['status', 'preload', 'drawBackground', 'drawForeground']) old[method] = (...args) => { delegated.push({method, args}); return method; };
  const clips = [];
  const ctx = {save() {}, restore() {}, beginPath() {}, rect(...args) { clips.push(args); }, clip() {}, drawImage(image, ...args) { calls.push({url: image.url, args}); }};
  const window = {CQC_SERVICE_YARD: old};
  vm.runInNewContext(code, {window, document: {currentScript: {src: 'https://test/cqc/src/cqc-p55-stage-planes.js'}}, URL, Image,
    fetch: async () => { fetches++; return {ok: !failManifest, json: async () => manifest}; }});
  return {api: window.CQC_SERVICE_YARD, geometry: window.CQC_P55_STAGE_PLANES.geometry, old, requested, calls, delegated, ctx, clips,
    fixManifest: () => { failManifest = false; }, fetches: () => fetches};
}
async function ready(f, id = ids[0]) {
  const job = f.api.preload({id}); await flush(); f.requested.forEach(image => image.finish()); assert.equal(await job, true);
}

test('the same stage objects and legacy API remain available without duplicate rooms', () => {
  const f = fixture(); assert.equal(f.api.stages, f.old.stages);
  for (const method of ['status', 'preload', 'drawBackground', 'drawForeground']) assert.equal(f.api[method]({id: 'old'}), method);
  assert.equal(f.delegated.length, 4);
});

test('all three planes must decode before any scene pixel is drawn', async () => {
  const f = fixture(), stage = {id: ids[0]}, job = f.api.preload(stage);
  assert.equal(f.api.preload(stage), job); await flush(); assert.equal(f.requested.length, 3);
  f.requested[0].finish(); f.requested[1].finish();
  assert.equal(f.api.drawBackground(f.ctx, stage), false); assert.equal(f.calls.length, 0);
  f.requested[2].finish(); assert.equal(await job, true);
  f.api.drawBackground(f.ctx, stage); assert.equal(f.calls.length, 2);
  f.api.drawForeground(f.ctx, stage); assert.equal(f.calls.length, 3);
  assert.deepEqual(f.clips, [[0, 568, 1280, 152]], 'Only faint near-plane margins above the fixed ground are clipped');
});

test('failed image retry retains both good planes and reissues only the failed request', async () => {
  const f = fixture(), stage = {id: ids[0]}, job = f.api.preload(stage); await flush();
  f.requested.forEach((image, index) => image.finish(index !== 1)); assert.equal(await job, false);
  assert.equal(f.api.status(stage).state, 'error');
  const retry = f.api.preload(stage, {retry: true}); await flush(); assert.equal(f.requested.length, 4);
  f.requested[3].finish(); assert.equal(await retry, true); assert.equal(f.fetches(), 1);
});

test('failed manifest reports an error and permits a real retry', async () => {
  const f = fixture({badManifest: true}), stage = {id: ids[0]};
  assert.equal(await f.api.preload(stage), false); assert.equal(f.api.status(stage).state, 'error');
  assert.equal(f.requested.length, 0); f.fixManifest();
  const retry = f.api.preload(stage, {retry: true}); await flush(); f.requested.forEach(image => image.finish());
  assert.equal(await retry, true); assert.equal(f.fetches(), 2);
});

test('all scenes reconstruct source placements and keep their ground stable during pan', async () => {
  const f = fixture();
  for (const id of ids) {
    await ready(f, id);
    for (const zoom of [.76, 1, 1.15]) {
      const mid = f.geometry(id, {camera: 0, zoom}), [left, top, width, height] = mid.background;
      assert(left <= 0 && top <= 0 && left + width >= 1280 && top + height >= 720);
      assert(Math.abs(top + height * .82 - 568) < 1e-9);
      const scale = width / 1672;
      for (const plane of mid.planes) {
        assert(Math.abs(plane.destination[0] - (left + plane.placement[0] * scale)) < 1e-9);
        assert(Math.abs(plane.destination[1] - (top + plane.placement[1] * scale)) < 1e-9);
      }
      for (const camera of [-220, 220]) {
        const frame = f.geometry(id, {camera, zoom});
        frame.planes.forEach((plane, index) => {
          assert.equal(plane.destination[1], mid.planes[index].destination[1]);
          assert(Math.abs(plane.destination[0] - mid.planes[index].destination[0] + camera * plane.depth) < 1e-9);
        });
      }
    }
  }
});

test('reduced motion freezes all plane placements, regardless of camera or time', async () => {
  const f = fixture(); await ready(f);
  assert.equal(JSON.stringify(f.geometry(ids[0], {camera: -220, time: 0, motion: false})),
    JSON.stringify(f.geometry(ids[0], {camera: 220, time: 500, motion: false})));
});
