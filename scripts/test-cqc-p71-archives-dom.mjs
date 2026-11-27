/* DOM verification only. This does not assert rendering, focus geometry or a real browser run. */
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
const require = createRequire(import.meta.url);
let JSDOM;
try { ({ JSDOM } = require('jsdom')); }
catch {
  if (!process.env.CQC_P71_DOM_MODULES) throw Error('Install the project jsdom dependency or set CQC_P71_DOM_MODULES to a test-only node_modules directory.');
  ({ JSDOM } = require(path.join(process.env.CQC_P71_DOM_MODULES, 'jsdom')));
}
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
const html = read('public/cqc/modules/classified-archives-p71.html');
const accessSource = read('public/cqc/src/cqc-p71-access.js');
const uiSource = read('public/cqc/src/cqc-p71-archives.js');
const dossierData = JSON.parse(read('public/cqc/data/cqc-p71-access-dossiers.json'));
async function settle() { for (let index = 0; index < 5; index++) await new Promise(resolve => setImmediate(resolve)); }
async function setup(initial = {}, options = {}) {
  const dom = new JSDOM(html, { url: 'https://cqc.test/cqc/modules/classified-archives-p71.html', runScripts: 'outside-only', pretendToBeVisual: true });
  const { window } = dom;
  window.__networkFailure = !!options.networkFailure;
  window.fetch = async () => { if (options.documentGate) await options.documentGate; if (window.__networkFailure) throw Error('Network test'); return { ok: true, json: async () => structuredClone(dossierData) }; };
  window.HTMLDialogElement.prototype.showModal = function () { this.setAttribute('open', ''); };
  window.HTMLDialogElement.prototype.close = function () { this.removeAttribute('open'); };
  for (const [key, value] of Object.entries(initial)) window.localStorage.setItem(key, value);
  window.eval(accessSource); window.eval(uiSource); await settle();
  return { dom, window, doc: window.document, close: () => window.close(), A: window.CQC_P71_ACCESS };
}
const ops = records => ({ 'cqc-v048-operations-profile': JSON.stringify({ records }) });

test('initial DOM and accessible labels keep all secret report identities hidden', async () => {
  const scene = await setup();
  try {
    assert.equal(scene.doc.querySelectorAll('.dossier-card').length, 3);
    assert.equal(scene.doc.querySelectorAll('[data-discovery=secret]').length, 3);
    for (const definition of scene.A.DEFINITIONS) assert.equal(scene.doc.body.textContent.includes(definition.label), false);
    assert.ok([...scene.doc.querySelectorAll('.dossier-card')].every(card => card.getAttribute('aria-label').includes('Dossier non révélé')));
    assert.equal(scene.doc.querySelector('#reader-title').textContent, '');
    assert.equal(scene.doc.querySelector('#archives-claim,#archives-open'), null);
  } finally { scene.close(); }
});
test('locked slots are ordinary focusable buttons and selection explains the actual condition', async () => {
  const scene = await setup();
  try {
    const card = scene.doc.querySelector('[data-dossier-id=report02]'); card.focus(); card.click();
    assert.equal(scene.doc.activeElement, card); assert.equal(card.disabled, false);
    assert.equal(card.getAttribute('aria-pressed'), 'true');
    assert.ok(scene.doc.querySelector('#archives-detail').textContent.includes('Gagner trois duels'));
    assert.equal(scene.doc.querySelectorAll('.axes > div').length, 4);
  } finally { scene.close(); }
});
test('earned dossier claims before reading, persists once and reopens after progress is removed', async () => {
  const scene = await setup(ops({ survivalBest: 3 }));
  try {
    scene.doc.querySelector('[data-dossier-id=report02]').click();
    scene.doc.querySelector('#archives-claim').click(); await settle();
    const saved = scene.A.loadLedger(scene.window.localStorage);
    assert.equal(saved.payload.grants.length, 1);
    assert.equal(scene.doc.querySelector('[data-dossier-id=report02]').dataset.right, 'permanent');
    assert.equal(scene.doc.querySelector('#archives-reader').open, false);
    scene.doc.querySelector('#archives-open').click();
    assert.equal(scene.doc.querySelector('#archives-reader').open, true);
    assert.equal(scene.doc.querySelector('#reader-title').textContent, 'Tenir la ligne');
    assert.equal(scene.doc.querySelectorAll('#reader-body p').length, 3);
    scene.doc.querySelector('#archives-reader').close();
    scene.window.localStorage.removeItem(scene.A.OPERATIONS_KEY); scene.doc.querySelector('#archives-refresh').click(); await settle();
    assert.ok(scene.doc.querySelector('#archives-open')); assert.equal(scene.doc.querySelector('#archives-claim'), null);
    assert.equal(scene.A.loadLedger(scene.window.localStorage).payload.grants[0].awardedAt, saved.payload.grants[0].awardedAt);
  } finally { scene.close(); }
});
test('failed local save cannot claim or open a dossier and retry remains idempotent', async () => {
  const scene = await setup(ops({ relay5Wins: 1 }));
  try {
    scene.doc.querySelector('[data-dossier-id=report03]').click();
    assert.equal(scene.doc.querySelector('.rule-join').textContent, 'OU');
    const original = scene.window.Storage.prototype.setItem;
    scene.window.Storage.prototype.setItem = function (key, value) { if (key.startsWith(scene.A.KEY)) throw Error('Quota'); return original.call(this, key, value); };
    scene.doc.querySelector('#archives-claim').click(); await settle();
    assert.equal(scene.doc.querySelector('#archives-open'), null);
    assert.equal(scene.doc.querySelector('[data-dossier-id=report03]').dataset.right, 'claimable');
    assert.equal(scene.A.loadLedger(scene.window.localStorage).payload.grants.length, 0);
    assert.ok(scene.doc.querySelector('#archives-status').textContent.includes('non confirmé'));
    scene.window.Storage.prototype.setItem = original;
    scene.doc.querySelector('#archives-claim').click(); await settle();
    assert.equal(scene.A.loadLedger(scene.window.localStorage).payload.grants.length, 1);
    assert.ok(scene.doc.querySelector('#archives-open'));
  } finally { scene.close(); }
});
test('earned access and technical failure stay separate through recovery', async () => {
  const scene = await setup(ops({ survivalBest: 3 }), { networkFailure: true });
  try {
    scene.doc.querySelector('[data-dossier-id=report02]').click();
    scene.doc.querySelector('#archives-claim').click(); await settle();
    assert.equal(scene.doc.querySelector('[data-dossier-id=report02]').dataset.right, 'permanent');
    assert.equal(scene.doc.querySelector('#archives-open'), null);
    assert.ok(scene.doc.querySelector('.axes').textContent.includes('Chargement à réessayer'));
    scene.window.__networkFailure = false; scene.doc.querySelector('#archives-refresh').click(); await settle();
    assert.ok(scene.doc.querySelector('#archives-open'));
    assert.equal(scene.A.loadLedger(scene.window.localStorage).payload.grants.length, 1);
  } finally { scene.close(); }
});
test('invalid progression displays uncertainty while preserving a saved permanent right', async () => {
  const scene = await setup(ops({ survivalBest: 3 }));
  try {
    scene.doc.querySelector('[data-dossier-id=report02]').click(); scene.doc.querySelector('#archives-claim').click(); await settle();
    scene.window.localStorage.setItem(scene.A.OPERATIONS_KEY, '{bad'); scene.doc.querySelector('#archives-refresh').click(); await settle();
    assert.equal(scene.doc.querySelector('[data-dossier-id=report02]').dataset.right, 'permanent');
    assert.equal(scene.doc.querySelector('[data-dossier-id=report03]').dataset.right, 'pending');
    assert.ok(scene.doc.querySelector('#archives-warning').textContent.includes('ne peut pas être lue'));
  } finally { scene.close(); }
});
test('a completely damaged access registry is never silently overwritten', async () => {
  const scene = await setup({ ...ops({ survivalBest: 3 }), 'cqc.p71.access.a': '{bad', 'cqc.p71.access.b': '{bad' });
  try {
    scene.doc.querySelector('[data-dossier-id=report02]').click();
    assert.equal(scene.doc.querySelector('#archives-claim').disabled, true);
    assert.equal(scene.window.localStorage.getItem('cqc.p71.access.a'), '{bad');
    assert.ok(scene.doc.querySelector('#archives-warning').textContent.includes('Aucune nouvelle attribution'));
  } finally { scene.close(); }
});
test('name reveal preference affects display but never grants an access', async () => {
  const scene = await setup();
  try {
    const control = scene.doc.querySelector('#archives-hide-secrets'); control.checked = false;
    control.dispatchEvent(new scene.window.Event('change', { bubbles: true }));
    assert.equal(scene.doc.querySelector('[data-dossier-id=report03] .card-name').textContent, 'Passage de témoin');
    assert.equal(scene.window.localStorage.getItem(scene.A.KEY + '.hide-secrets'), 'false');
    assert.equal(scene.doc.querySelector('#archives-open,#archives-claim'), null);
  } finally { scene.close(); }
});
test('a delayed dossier fetch preserves the focused activity action after rebuilding details', async () => {
  let resolveDocuments;
  const documentGate = new Promise(resolve => { resolveDocuments = resolve; });
  const scene = await setup({}, { documentGate });
  try {
    const activity = scene.doc.querySelector('#archives-detail [data-archive-action=activity]');
    activity.focus(); assert.equal(scene.doc.activeElement, activity);
    resolveDocuments(); await settle();
    const replacement = scene.doc.querySelector('#archives-detail [data-archive-action=activity]');
    assert.equal(activity.isConnected, false);
    assert.equal(replacement.href, activity.href);
    assert.equal(scene.doc.activeElement, replacement);
  } finally { resolveDocuments(); scene.close(); }
});
test('storage updates preserve the focused claim, open and activity actions', async () => {
  const scene = await setup(ops({ survivalBest: 3 }));
  try {
    const storageEvent = () => scene.window.dispatchEvent(new scene.window.StorageEvent('storage', { key: scene.A.OPERATIONS_KEY }));
    scene.doc.querySelector('[data-dossier-id=report02]').click();
    scene.doc.querySelector('#archives-claim').focus(); storageEvent();
    assert.equal(scene.doc.activeElement, scene.doc.querySelector('#archives-claim'));
    scene.doc.querySelector('#archives-claim').click(); await settle();
    assert.equal(scene.doc.activeElement, scene.doc.querySelector('#archives-open'));
    storageEvent(); assert.equal(scene.doc.activeElement, scene.doc.querySelector('#archives-open'));
    scene.doc.querySelector('#archives-detail [data-archive-action=activity]').focus(); storageEvent();
    assert.equal(scene.doc.activeElement, scene.doc.querySelector('#archives-detail [data-archive-action=activity]'));
  } finally { scene.close(); }
});
