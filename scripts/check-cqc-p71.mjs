// Reproducible incremental gate: the exact P69 Git objects are the baseline.
// It decodes only new PNGs; historical binary resources need not be downloaded.
import assert from 'node:assert/strict';
import {openSync, readFileSync, closeSync, constants, existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';
import {verifyStaticPng} from './check-cqc-p64.mjs';
import {P69_COMMIT, ATLAS_PATH, P71_IMAGES, P71_MODULE_FILES, P71_CHANGED_OWNERS,
  extendP71RuntimeManifest, verifyP71RuntimeExtension} from './extend-cqc-p71-runtime.mjs';

const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const ensure = (ok, message) => { if (!ok) throw Error(message); };
const GUIDE_PINS = [
  ['Combat_Games_Guide_General_v1.0.txt', 55172, '4844584616072ac0d52d37c2fab4365e1ec489240f17a721ee216e223b0355b7'],
  ['Combat_Games_Extension_01_Tag_Taunts_Bonus_v1.0.txt', 60589, '330fb7485a7a52b2a20f855646c940aaac0fcd9510032bc84b2e17c518edd25f'],
  ['Combat_Games_Extension_02_Slots_Verrouilles_Deblocages_Abonnes_v1.0.txt', 47334, '08b57ea542e83c487fef3276997a612d4657f2ee9ed4f8e46b0bf65a2778038b'],
];
const HISTORICAL = ['docs/cqc-bible/asset-associations.json', ...[63,64,65,66,67,68,69].map(n => `docs/cqc-bible/asset-associations-p${n}.json`),
  'docs/cqc-bible/guide-map.json', 'docs/cqc-bible/requirements-source.json'];

export async function checkP71(root) {
  const read = name => {
    const fd = openSync(path.join(root, name), constants.O_RDONLY | constants.O_NOFOLLOW | constants.O_NOATIME);
    try { return readFileSync(fd); } finally { closeSync(fd); }
  };
  const json = name => JSON.parse(read(name));
  const pinned = name => execFileSync('git', ['show', P69_COMMIT + ':' + name], {cwd: root, maxBuffer: 5 * 1024 * 1024});
  const base = JSON.parse(pinned('public/cqc/runtime-manifest.json'));
  const baseCatalog = JSON.parse(pinned('public/cqc/' + ATLAS_PATH));
  const catalog = json('public/cqc/' + ATLAS_PATH);
  assert.equal(catalog.schema, baseCatalog.schema);
  assert.equal(baseCatalog.assets.length, 90);
  assert.equal(catalog.assets.length, 95);
  assert.deepEqual(catalog.assets.slice(0, 90), baseCatalog.assets, 'Historical Atlas rows changed or reordered');
  const added = catalog.assets.slice(90);
  assert.deepEqual(new Set(added.map(row => row.path.slice(3))), new Set(P71_IMAGES));
  assert.equal(new Set(catalog.assets.map(row => row.id)).size, 95, 'Duplicate Atlas ID');
  const pngs = [];
  for (const row of added) {
    for (const key of ['selected', 'sourceGenerated', 'atlasIntegrated', 'transparentBackground']) assert.equal(row[key], true, row.id + ': ' + key);
    for (const key of ['runtimeIntegrated', 'combatReady', 'combatRuntimeIntegrated', 'absolute1to1Certified', 'referenceGeometryValidated', 'nativePixelExact', 'nativeUhd', 'scopeClosed']) {
      assert.equal(row[key], false, row.id + ': unsupported claim ' + key);
    }
    ensure(['mgr', 'survive'].includes(row.episodeKey), 'Unreviewed episode: ' + row.id);
    ensure(row.scope && row.qaNotes && row.referenceURLs.length > 0, 'Source scope/reference/QA missing: ' + row.id);
    pngs.push(verifyStaticPng(read('public/cqc/' + row.path.slice(3)), row));
  }
  const context = {module: {exports: {}}, URL, URLSearchParams};
  vm.runInNewContext(read('public/cqc/src/cqc-p63-source-atlas.js').toString('utf8'), context);
  const normalized = context.module.exports.normalizeCatalog(catalog);
  assert.equal(normalized.length, 95);
  for (const row of added) {
    const filtered = context.module.exports.filterAssets(normalized, {episode: row.episodeKey, kind: row.kind, query: row.label});
    ensure(filtered.some(item => item.id === row.id), 'New source missing from Atlas filters: ' + row.id);
  }
  const historical = HISTORICAL.map(name => {
    const bytes = read(name);
    assert.deepEqual(bytes, pinned(name), 'Historical source/guide registry changed: ' + name);
    return {path: name, bytes: bytes.length, sha256: hash(bytes)};
  });
  const guides = GUIDE_PINS.map(([name, size, sha256]) => {
    const nameInRepo = 'docs/cqc-bible/sources/' + name, bytes = read(nameInRepo);
    assert.equal(bytes.length, size); assert.equal(hash(bytes), sha256);
    return {path: nameInRepo, bytes: size, sha256};
  });
  const map = json('docs/cqc-bible/extension-guide-map-p71.json');
  assert.equal(map.sections.length, 38); assert.equal(map.requirements.length, 114);
  assert.deepEqual(map.sections.map(row => Number(row.id)), Array.from({length: 38}, (_, i) => i + 30));
  const requirementIds = new Set(map.requirements.map(row => row.id));
  assert.equal(requirementIds.size, 114);
  for (const section of map.sections) for (const id of section.requirementIds) ensure(requirementIds.has(id), 'Unknown extension requirement: ' + id);
  for (const row of [...map.sections, ...map.requirements]) for (const name of row.existingPaths || []) ensure(existsSync(path.join(root, name)), 'Missing mapped implementation path: ' + name);
  const inherited = json('docs/cqc-bible/guide-map.json');
  assert.equal(inherited.requirements.length, 90);
  const current = json('public/cqc/runtime-manifest.json');
  const rebuilt = await extendP71RuntimeManifest(base, path.join(root, 'public/cqc'));
  assert.deepEqual(current, rebuilt, 'Saved runtime manifest differs from actual P71 resource bytes/references');
  const runtime = verifyP71RuntimeExtension(base, current);
  const permittedChanges = new Set(['docs/cqc-bible/README.md', 'docs/cqc-bible/EXIGENCES.md', 'public/cqc/runtime-manifest.json',
    ...P71_CHANGED_OWNERS.map(name => 'public/cqc/' + name)]);
  const changed = execFileSync('git', ['diff', '--name-only', P69_COMMIT], {cwd: root, encoding: 'utf8'}).trim().split('\n').filter(Boolean);
  // Existing files are tightly scoped. New files are checked by the publication
  // plan and Git tree comparison; they are not historical modifications.
  const tree = new Set(execFileSync('git', ['ls-tree', '-r', '--name-only', P69_COMMIT], {cwd: root, encoding: 'utf8', maxBuffer: 6 * 1024 * 1024}).trim().split('\n'));
  for (const name of changed) if (tree.has(name)) ensure(permittedChanges.has(name), 'Unreviewed historical file changed: ' + name);
  const deleted = execFileSync('git', ['diff', '--name-only', '--diff-filter=D', P69_COMMIT], {cwd: root, encoding: 'utf8'}).trim();
  assert.equal(deleted, '', 'Historical file deletion');
  const accessQA = json('docs/cqc-reprise/pass71/access-runtime-qa.json');
  for (const row of accessQA.files) { const bytes = read(row.path); assert.equal(bytes.length, row.bytes); assert.equal(hash(bytes), row.sha256, 'Access QA pin outdated: ' + row.path); }
  assert.equal(accessQA.logic_tests.passed, 20); assert.equal(accessQA.dom_tests.passed, 10); assert.equal(accessQA.browser_tests.executed, 0);
  return {
    schema: 'cqc.p71.incremental-verification/1', date: '2026-11-27', baselineCommit: P69_COMMIT,
    atlas: {historicalUnchanged: 90, added: 5, total: 95, normalized: normalized.length},
    sources: {historicalSelected: 267, selected: 272, archivedAttempts: 20, newPngBytes: pngs.reduce((sum, row) => sum + row.bytes, 0), pngs},
    guides: {verifiedOriginals: guides, historicalRequirements: 90, newRequirements: 114, totalRequirements: 204, newSections: 38, totalSections: 68},
    historical, runtime, newModuleFiles: [...P71_MODULE_FILES], existingFileChanges: changed.filter(name => tree.has(name)),
    browserVisualQA: {executed: false, reason: 'Chromium binary unavailable; official Playwright download denied by network.'},
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = path.resolve(process.argv[2] || path.join(path.dirname(fileURLToPath(import.meta.url)), '..'));
  console.log(JSON.stringify(await checkP71(root), null, 2));
}
