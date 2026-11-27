import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdtemp, mkdir, readFile, rm, symlink, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { applyP74Update, collectP74Scope, isP74Scope, P74_REQUIRED_FILES, prepareP74Update, runCLI } from './update-cqc-p74-runtime-manifest.mjs';

const HASH = bytes => createHash('sha256').update(bytes).digest('hex');
const PNG = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=', 'base64');
const EXTERNAL_OWNER = 'src/cqc-pass40-core-metadata-variants-v1.js';
const INDEX = '<script src="src/legacy.js"></script><script src="' + EXTERNAL_OWNER + '"></script>';
const TAG = 'src/cqc-p74-tag-team.js';
const IMAGE = 'assets/canon-pass74/demo.png';

async function fixture(t) {
  const root = await mkdtemp(path.join(os.tmpdir(), 'cqc-p74-manifest-test-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const put = async (name, bytes) => {
    const file = path.join(root, name);
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, bytes);
  };
  const manifest = {
    schema: 'shadow-codec-ops.cqc-runtime/1',
    entry: 'index.html',
    storage: { cqc: 'cqc-*', shadow: 'shadow-codec-ops:' },
    files: [
      { path: 'index.html', bytes: Buffer.byteLength(INDEX), sha256: HASH(INDEX) },
      { path: 'src/legacy.js', bytes: 500, sha256: 'a'.repeat(64), immutableHistorical: { keep: true } },
      { path: 'assets/legacy.png', bytes: 700, sha256: 'b'.repeat(64) },
      { path: EXTERNAL_OWNER, bytes: 900, sha256: 'c'.repeat(64) }
    ],
    references: [
      { from: 'index.html', to: 'src/legacy.js' },
      { from: 'index.html', to: EXTERNAL_OWNER },
      { from: 'src/legacy.js', to: 'assets/legacy.png', historicalAnnotation: 'keep' }
    ],
    omittedReferences: [{ from: 'src/legacy.js', to: 'references/production.png' }],
    exclusions: 'historical exclusions unchanged',
    externalReferences: {
      schema: 'shadow-codec-ops.cqc-external-references/1',
      entries: [{
        from: EXTERNAL_OWNER, to: 'assets/combat-costumes-pass40/example/alias.png',
        url: 'https://raw.githubusercontent.com/example/repo/' + 'd'.repeat(40) + '/raw/source.png',
        bytes: 200, sha256: 'e'.repeat(64), ownerSHA256: 'c'.repeat(64)
      }]
    },
    futureUnknownMetadata: { untouched: ['yes', 9] }
  };
  manifest.totalBytes = manifest.files.reduce((n, r) => n + r.bytes, 0);
  const save = async () => put('runtime-manifest.json', JSON.stringify(manifest, null, 2) + '\n');
  await put('index.html', INDEX);
  await save();
  const add = async () => {
    await put('index.html', INDEX + '<script src="' + TAG + '"></script><img src="' + IMAGE + '">');
    await put(TAG, 'window.CQC74 = { ready: true };');
    await put(IMAGE, PNG);
    return ['index.html', TAG, IMAGE];
  };
  return { root, put, manifest, save, add };
}

test('partial checkout preserves absent history, external policy, old routes and unknown metadata', async t => {
  const f = await fixture(t), selectedPaths = await f.add();
  const oldBytes = await readFile(path.join(f.root, 'runtime-manifest.json'));
  const p = await prepareP74Update({ runtimeRoot: f.root, selectedPaths });
  assert.deepEqual(p.manifest.files.slice(1, 4), f.manifest.files.slice(1));
  assert.deepEqual(p.manifest.externalReferences, f.manifest.externalReferences);
  assert.deepEqual(p.manifest.futureUnknownMetadata, f.manifest.futureUnknownMetadata);
  assert.deepEqual(p.manifest.omittedReferences, f.manifest.omittedReferences);
  assert.deepEqual(p.manifest.references.find(r => r.from === 'src/legacy.js'), f.manifest.references[2]);
  assert.equal(p.manifest.files.length, 6);
  assert.equal(p.manifest.totalBytes, p.manifest.files.reduce((n, r) => n + r.bytes, 0));
  assert.equal(p.report.historicalFilesNotRead, 3);
  assert.deepEqual(p.report.inheritedReferenceTargetsNotRead, [EXTERNAL_OWNER, 'src/legacy.js'].sort((a, b) => a.localeCompare(b, 'en')));
  assert.equal(p.report.fullRuntimeValidated, false);
  assert.equal(p.report.fullRuntimeFileAuditPerformed, false);
  assert.equal(p.report.externalPolicyRevalidated, false);
  assert.equal(p.report.externalPolicyPreserved, true);
  assert.equal(p.report.manifestWritten, false);
  assert.deepEqual(await readFile(path.join(f.root, 'runtime-manifest.json')), oldBytes);
});

test('existing discoverReferences connects a new JSON catalogue to a new PNG', async t => {
  const f = await fixture(t);
  const data = 'data/veilbreak-content.json';
  await f.put('index.html', INDEX + '<script>fetch("' + data + '")</script>');
  await f.put(data, JSON.stringify({ image: '../' + IMAGE }));
  await f.put(IMAGE, PNG);
  const p = await prepareP74Update({ runtimeRoot: f.root, selectedPaths: ['index.html', data, IMAGE] });
  assert.ok(p.manifest.references.some(r => r.from === data && r.to === IMAGE));
  assert.equal(p.report.allSelectedFilesReachable, true);
  assert.equal(p.report.pngHeaderTrailerChecks, 1);
  assert.equal(p.report.pngPixelDecodePerformed, false);
});

test('Veilbreak provenance documentation and tests remain excluded omissions', async t => {
  const f = await fixture(t);
  const data = 'data/veilbreak-content.json';
  const report = 'docs/cqc-bible/veilbreak-engine-validation.json';
  await f.put('index.html', INDEX + '<script>fetch("' + data + '")</script>');
  await f.put(data, JSON.stringify({ provenance: { coreEngineValidation: { report } }, test: 'tests/veilbreak-fixture.js' }));
  const p = await prepareP74Update({ runtimeRoot: f.root, selectedPaths: ['index.html', data] });
  assert.ok(p.manifest.omittedReferences.some(r => r.from === data && r.to === report));
  assert.ok(p.manifest.omittedReferences.some(r => r.from === data && r.to === 'tests/veilbreak-fixture.js'));
  assert.ok(!p.manifest.files.some(r => r.path === report));
  assert.ok(!p.manifest.references.some(r => r.to === report));
  assert.deepEqual(p.manifest.externalReferences, f.manifest.externalReferences);
  assert.equal(p.report.affectedNonRuntimeOmissionCount, 2);
  assert.equal(p.report.fullRuntimeValidated, false);
});

test('new unresolved runtime references fail while absent historical targets remain declared', async t => {
  const f = await fixture(t);
  await f.put('index.html', INDEX + '<script src="' + TAG + '"></script>');
  await f.put(TAG, 'const image = "assets/canon-pass74/missing.png";');
  await assert.rejects(prepareP74Update({ runtimeRoot: f.root, selectedPaths: ['index.html', TAG] }), /Unresolved affected runtime reference/);
});

test('missing selected files fail and are never fabricated from manifest rows', async t => {
  const f = await fixture(t);
  await assert.rejects(prepareP74Update({ runtimeRoot: f.root, selectedPaths: ['index.html', TAG] }), /ENOENT/);
});

test('orphaned new assets are not made reachable by synthetic edges', async t => {
  const f = await fixture(t);
  await f.put(IMAGE, PNG);
  await assert.rejects(prepareP74Update({ runtimeRoot: f.root, selectedPaths: ['index.html', IMAGE] }), /not reachable/);
});

test('removing the last route to a historical module is rejected', async t => {
  const f = await fixture(t);
  await f.put('index.html', '<script src="' + EXTERNAL_OWNER + '"></script>');
  await assert.rejects(prepareP74Update({ runtimeRoot: f.root, selectedPaths: ['index.html'] }), /disconnect historical runtime files/);
});

test('external owners and aliases cannot be refreshed by the incremental path', async t => {
  const ownerFixture = await fixture(t);
  ownerFixture.manifest.externalReferences.entries[0].from = 'index.html';
  await ownerFixture.save();
  await assert.rejects(prepareP74Update({ runtimeRoot: ownerFixture.root, selectedPaths: ['index.html'] }), /Protected external owner or alias/);
  const aliasFixture = await fixture(t);
  aliasFixture.manifest.externalReferences.entries[0].to = IMAGE;
  await aliasFixture.save();
  await aliasFixture.put(IMAGE, PNG);
  await assert.rejects(prepareP74Update({ runtimeRoot: aliasFixture.root, selectedPaths: [IMAGE] }), /Protected external owner or alias/);
});

test('invalid totals and duplicate historical declarations fail before any update', async t => {
  const f = await fixture(t);
  f.manifest.totalBytes++;
  await f.save();
  await assert.rejects(prepareP74Update({ runtimeRoot: f.root, selectedPaths: ['index.html'] }), /totalBytes/);
  f.manifest.totalBytes--;
  f.manifest.files.push({ ...f.manifest.files[0] });
  f.manifest.totalBytes += f.manifest.files[0].bytes;
  await f.save();
  await assert.rejects(prepareP74Update({ runtimeRoot: f.root, selectedPaths: ['index.html'] }), /duplicate historical file/);
});

test('out-of-scope paths, traversal and file symlinks are rejected', async t => {
  assert.equal(isP74Scope('src/cqc-pass8-combat-engine.js'), true);
  assert.equal(isP74Scope('src/cqc-pass48-reviewed-vs-runtime-v1.js'), false);
  assert.throws(() => isP74Scope('../index.html'), /Invalid relative/);
  const f = await fixture(t);
  await assert.rejects(prepareP74Update({ runtimeRoot: f.root, selectedPaths: ['src/legacy.js'] }), /outside incremental P74 scope/);
  await mkdir(path.join(f.root, 'src'), { recursive: true });
  await symlink(path.join(f.root, 'index.html'), path.join(f.root, TAG));
  await assert.rejects(prepareP74Update({ runtimeRoot: f.root, selectedPaths: [TAG] }), /Symlink/);
});

test('symlinked parent directories are rejected', async t => {
  const f = await fixture(t);
  const target = path.join(f.root, 'elsewhere');
  await mkdir(target);
  await writeFile(path.join(target, 'demo.png'), PNG);
  await mkdir(path.join(f.root, 'assets'));
  await symlink(target, path.join(f.root, 'assets/canon-pass74'));
  await assert.rejects(prepareP74Update({ runtimeRoot: f.root, selectedPaths: [IMAGE] }), /Symlink/);
});

test('empty files, malformed JSON and truncated PNGs fail selected-file checks', async t => {
  const f = await fixture(t);
  await f.put(TAG, '');
  await assert.rejects(prepareP74Update({ runtimeRoot: f.root, selectedPaths: [TAG] }), /Empty selected/);
  await f.put('data/veilbreak-content.json', '{bad');
  await assert.rejects(prepareP74Update({ runtimeRoot: f.root, selectedPaths: ['data/veilbreak-content.json'] }), /Invalid JSON/);
  await f.put(IMAGE, PNG.subarray(0, 40));
  await assert.rejects(prepareP74Update({ runtimeRoot: f.root, selectedPaths: [IMAGE] }), /Incomplete PNG/);
});

test('changed transformed historical rows require the original full-sync workflow', async t => {
  const f = await fixture(t);
  f.manifest.files[0].sourceSha256 = 'f'.repeat(64);
  f.manifest.files[0].transformation = 'cqc-save-namespace';
  await f.save();
  await f.put('index.html', INDEX + '<!-- changed -->');
  await assert.rejects(prepareP74Update({ runtimeRoot: f.root, selectedPaths: ['index.html'] }), /Transformed historical file/);
});

test('atomic apply updates only declared selection and a repeat is idempotent', async t => {
  const f = await fixture(t), selectedPaths = await f.add();
  const p = await prepareP74Update({ runtimeRoot: f.root, selectedPaths });
  const report = await applyP74Update(p);
  assert.equal(report.manifestWritten, true);
  assert.equal(report.fullRuntimeValidated, false);
  const written = JSON.parse(await readFile(path.join(f.root, 'runtime-manifest.json'), 'utf8'));
  assert.deepEqual(written, p.manifest);
  const again = await prepareP74Update({ runtimeRoot: f.root, selectedPaths });
  assert.deepEqual(again.manifest, p.manifest);
  assert.deepEqual(again.report.newFiles, []);
  assert.deepEqual(again.report.changedFiles, []);
  assert.equal(again.report.unchangedSelectedFiles.length, 3);
});

test('concurrent source changes abort apply without changing the manifest', async t => {
  const f = await fixture(t), selectedPaths = await f.add();
  const before = await readFile(path.join(f.root, 'runtime-manifest.json'));
  const p = await prepareP74Update({ runtimeRoot: f.root, selectedPaths });
  await f.put(TAG, 'window.changedAfterPlan = true;');
  await assert.rejects(applyP74Update(p), /changed after preparation/);
  assert.deepEqual(await readFile(path.join(f.root, 'runtime-manifest.json')), before);
});

test('concurrent manifest edits and candidate mutation abort apply', async t => {
  const f = await fixture(t), selectedPaths = await f.add();
  const p = await prepareP74Update({ runtimeRoot: f.root, selectedPaths });
  await f.put('runtime-manifest.json', JSON.stringify({ ...f.manifest, changedElsewhere: true }));
  const concurrent = await readFile(path.join(f.root, 'runtime-manifest.json'));
  await assert.rejects(applyP74Update(p), /manifest changed after preparation/);
  assert.deepEqual(await readFile(path.join(f.root, 'runtime-manifest.json')), concurrent);
  const g = await fixture(t), selection = await g.add();
  const q = await prepareP74Update({ runtimeRoot: g.root, selectedPaths: selection });
  q.manifest.externalReferences.entries = [];
  await assert.rejects(applyP74Update(q), /modified after validation/);
});

test('scope collection requires all entry files and the explicit original image count', async t => {
  const f = await fixture(t);
  for (const name of P74_REQUIRED_FILES) await f.put(name, name.endsWith('.json') ? '{}' : '<!-- fixture -->');
  await f.put('originals/veilbreak/assets/first.png', PNG);
  await f.put('originals/veilbreak/assets/second.png', PNG);
  await f.put(IMAGE, PNG);
  await f.put('originals/veilbreak/production-notes.md', 'Excluded from runtime selection');
  await assert.rejects(collectP74Scope(f.root), /expected 99, found 2/);
  const selected = await collectP74Scope(f.root, { expectedOriginalPngs: 2 });
  assert.equal(selected.filter(n => n.startsWith('originals/veilbreak/') && n.endsWith('.png')).length, 2);
  assert.ok(selected.includes(IMAGE));
  assert.ok(!selected.some(n => n.endsWith('.md')));
});

test('report paths cannot overwrite runtime files, including through a symlink alias', async t => {
  const f = await fixture(t);
  const before = await readFile(path.join(f.root, 'runtime-manifest.json'));
  await symlink(f.root, path.join(f.root, 'root-alias'));
  for (const report of ['runtime-manifest.json', 'root-alias/runtime-manifest.json', 'root-alias/new/report.json']) {
    await assert.rejects(runCLI(['--root', f.root, '--report', path.join(f.root, report), '--write']), /Report must be outside/);
  }
  assert.deepEqual(await readFile(path.join(f.root, 'runtime-manifest.json')), before);
});
