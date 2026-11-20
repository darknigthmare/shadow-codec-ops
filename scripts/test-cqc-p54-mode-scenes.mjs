import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import test from 'node:test';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = name => fs.readFileSync(path.join(root, 'public/cqc/src', name), 'utf8');
const settle = () => new Promise(resolve => setImmediate(resolve));

function environment() {
  const images = [], calls = [], ui = {};
  class ControlledImage {
    naturalWidth = 1536;
    naturalHeight = 1024;
    set src(value) { this.url = value; images.push(this); }
    finish(ok = true) { if (!this.finished) { this.finished = true; ok ? this.onload() : this.onerror(); } }
  }
  const scope = {Image: ControlledImage, URL, console, Promise,
    document: {currentScript: {src: 'https://example.test/cqc/src/cqc-p53-service-yard.js'}},
    performance: {now: () => 9000}};
  scope.window = scope;
  vm.createContext(scope);
  vm.runInContext(source('cqc-p53-service-yard.js'), scope);
  vm.runInContext(source('cqc-p54-mode-scenes.js'), scope);
  const renderer = scope.CQC_SERVICE_YARD;
  for (const method of ['drawBackground', 'drawForeground']) {
    const original = renderer[method];
    renderer[method] = (...args) => { calls.push({method, stage: args[1], options: args[2]}); return original(...args); };
  }
  const loadingUI = {
    show(cancel) { ui.show = true; ui.cancel = cancel; },
    error(retry, cancel) { ui.error = true; ui.retry = retry; ui.cancel = cancel; },
    hide() { ui.hidden = true; }
  };
  const api = scope.CQC_P54_MODE_SCENES_FACTORY.createAdapter({loadingUI, clock: () => 77});
  const operations = [];
  const context = Object.fromEntries(['save', 'restore', 'translate', 'setTransform', 'clearRect', 'fillRect', 'fillText', 'drawImage']
    .map(method => [method, (...args) => operations.push({method, args})]));
  const canvas = {width: 640, height: 360, dataset: {}, isConnected: true, getContext: () => context};
  return {scope, api, renderer, images, calls, ui, context, canvas, operations,
    finish: (ok = true) => images.forEach(image => image.finish(ok))};
}

test('actual P53 scenes append once as exercises without touching the reviewed registry', () => {
  const e = environment(), previous = {id: 'vr_grid', name: 'VR GRID', approved: true};
  const list = [previous], registry = {counts: () => ({admitted: 73})};
  e.scope.CQC_STAGE_REGISTRY = registry;
  assert.equal(e.api.appendCoreStages(list), 5);
  assert.equal(e.api.appendCoreStages(list), 0);
  assert.equal(list[0], previous);
  assert(list.slice(1).every(stage => stage.authoredSimulation && stage.approved === false && stage.name.endsWith(' · EXERCICE')));
  assert.equal(e.scope.CQC_STAGE_REGISTRY, registry);
  assert.deepEqual(registry.counts(), {admitted: 73});
});

test('uses a later merged service-yard extension, not a frozen five-room copy', () => {
  const e = environment(), extra = {id: 'fixture_late_scene', name: 'LATE EXERCISE', ep: 'MGS2'};
  const previous = e.scope.CQC_SERVICE_YARD;
  e.scope.CQC_SERVICE_YARD = {...previous, stages: [...previous.stages, extra], owns: stage => stage.id === extra.id || previous.owns(stage)};
  const list = [];
  assert.equal(e.api.appendStages(list), 6);
  assert.equal(e.api.resolve(extra.id), extra);
});

test('Core launch waits for every real P53 dependency and resumes once with the original options', async () => {
  const e = environment(), options = {stage: e.renderer.stages[0].id, mode: 'local'};
  const resumed = [];
  assert.equal(e.api.deferCoreLaunch(options, value => resumed.push(value)), true);
  assert.equal(e.images.length, 4);
  assert.equal(resumed.length, 0);
  e.images[0].finish(); await settle();
  assert.equal(resumed.length, 0);
  e.finish(); await settle();
  assert.equal(resumed.length, 1);
  assert.equal(resumed[0], options);
  assert.equal(e.ui.hidden, true);
});

test('failed image keeps launch stopped until an explicit successful retry', async () => {
  const e = environment(), stage = e.renderer.stages[0], resumed = [];
  e.api.deferCoreLaunch({stage: stage.id}, value => resumed.push(value));
  e.images[0].finish(false); e.finish(); await settle();
  assert.equal(resumed.length, 0);
  assert.equal(e.ui.error, true);
  e.ui.retry();
  assert.equal(e.images.length, 5);
  e.finish(); await settle();
  assert.equal(resumed.length, 1);
});

test('cancelled or superseded exercise launch cannot start after its images arrive', async () => {
  const e = environment(), resumed = [];
  e.api.deferCoreLaunch({stage: e.renderer.stages[0].id}, value => resumed.push(value));
  assert.equal(e.api.deferCoreLaunch({stage: 'legacy_reviewed_stage'}, value => resumed.push(value)), false);
  e.finish(); await settle();
  assert.equal(resumed.length, 0);
  assert.equal(e.ui.hidden, true);
});

test('an authoritative boss-stage ID is not replaced by the free exercise selection', () => {
  const e = environment();
  assert.equal(e.api.deferCoreLaunch({stage: e.renderer.stages[0].id, mode: 'boss'}, () => {}, {stageID: 'boss_authored_native_stage'}), false);
  assert.equal(e.images.length, 0);
});

test('explicitly imported local stage art wins both drawing and launch loading', () => {
  const e = environment(), stage = e.renderer.stages[0];
  const bank = {draw: () => true, status: () => [{id: stage.id}]};
  e.api.decorateCoreBank(bank);
  assert.equal(bank.draw(e.context, stage.id, {x: 800, zoom: 1}), true);
  assert.equal(e.api.deferCoreLaunch({stage: stage.id}, () => {}), false);
  assert.equal(e.calls.length, 0);
  assert.equal(e.images.length, 0);
});

test('Core ground registration and front/back timing stay identical within one rendered frame', async () => {
  const e = environment(), stage = e.renderer.stages[0];
  const job = e.api.preload(stage); e.finish(); await job;
  const bank = {draw: () => false}; e.api.decorateCoreBank(bank);
  bank.draw(e.context, stage.id, {x: 1400, zoom: 0.9}, false, {time: 4, reducedMotion: true});
  bank.draw(e.context, stage.id, {x: 300, zoom: 1.1}, true, {time: 999});
  const back = e.calls.find(call => call.method === 'drawBackground'), front = e.calls.find(call => call.method === 'drawForeground');
  assert.equal(back.options, front.options);
  assert.equal(back.options.time, 4);
  assert.equal(back.options.camera, 220);
  assert.equal(back.options.motion, false);
  assert.equal(e.operations.filter(op => op.method === 'translate' && op.args[1] === 10).length, 2);
});

test('preview foreground reuses the exact background options after actor drawing', async () => {
  const e = environment(), stage = e.renderer.stages[0];
  const job = e.api.preload(stage); e.finish(); await job;
  assert.equal(e.api.renderPreview(e.canvas, stage.id, e.scope, {time: 2.5}), true);
  assert.equal(e.api.renderPreviewForeground(e.canvas, stage.id, e.scope), true);
  const [back, front] = e.calls;
  assert.equal(back.options, front.options);
  assert.equal(front.options.time, 2.5);
  assert.equal(front.options.motion, false);
});

test('a late preview image cannot restore an exercise after another ready scene was selected', async () => {
  const e = environment(), a = e.renderer.stages[0], b = e.renderer.stages[1];
  const readyB = e.api.preload(b); e.finish(); await readyB;
  let lateA = 0;
  e.api.renderPreview(e.canvas, a.id, e.scope, {onReady: () => lateA++});
  e.api.renderPreview(e.canvas, b.id, e.scope);
  e.finish(); await settle();
  assert.equal(lateA, 0);
});

test('unknown preview preserves the caller fallback and invalidates pending authored work', async () => {
  const e = environment(), stage = e.renderer.stages[0]; let late = 0;
  e.api.renderPreview(e.canvas, stage.id, e.scope, {onReady: () => late++});
  assert.equal(e.api.renderPreview(e.canvas, 'UNKNOWN ENDING TITLE', e.scope), false);
  e.finish(); await settle();
  assert.equal(late, 0);
});

test('the actual Core picker callback keeps imported local art ahead of authored exercise art', () => {
  const html = fs.readFileSync(path.join(root, 'public/cqc/modules/core-v032.html'), 'utf8');
  const line = html.split('\n').find(value => value.trim().startsWith('renderStage:(canvas,stage)=>'));
  assert(line, 'Core stage-picker callback missing');
  let authoredPaints = 0, importedPaints = 0;
  const scope = {
    window: {CQC_P54_MODE_SCENES: {renderPreview: () => { authoredPaints++; return true; }}},
    stageBank: {status: () => [{id: 'p53_null_power_yard'}]},
    selection: {player: 'snake', opponent: 'boss'}, coreStageRendererPass17: null,
    coreStagePreviewPass17: null, coreStagePreviewKeyPass17: '', reducedMotion: false,
    performance: {now: () => 9000}, createMenuPreview: options => options,
    createRenderer: () => ({reset() {}, draw() { importedPaints++; }})
  };
  vm.createContext(scope);
  const callback = vm.runInContext('(' + line.trim().slice('renderStage:'.length).replace(/,$/, '') + ')', scope);
  callback({}, {id: 'p53_null_power_yard'});
  assert.equal(importedPaints, 1);
  assert.equal(authoredPaints, 0);
});

test('all inline scripts in the three changed mode pages still parse', () => {
  for (const name of ['core-v032.html', 'arcade-chronicles-v055.html', 'combat-academy-v053.html']) {
    const html = fs.readFileSync(path.join(root, 'public/cqc/modules', name), 'utf8');
    for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
      if (/\bsrc\s*=/.test(match[1]) || !match[2].trim()) continue;
      new vm.Script(match[2], {filename: name});
    }
  }
});
