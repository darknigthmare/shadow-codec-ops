import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mkdtemp, mkdir, readFile, writeFile, copyFile, readdir, lstat, symlink, link } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { digest, inventory, byteInventory, sameInventory, freezePins, fingerprint, stageFile, promotePreserving, guardOperationRoots, assertRasterSignature } from './common.mjs';
import { planSync, syncFrozenRuntime } from './sync-frozen-runtime.mjs';
import { planBuild, buildFrozenPublic, stagingPlugin, guardTypecheckOutputs } from './build-with-frozen-public.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const S = '/workspace/shadow-codec-recovered';
const SYNC = path.join(S, 'scripts/sync-cqc-runtime.mjs');
const VITE = path.join(S, 'node_modules/vite/dist/node/index.js');
const PNG = await readFile(path.join(S, 'public/pwa-64x64.png'));
const WEBP = await readFile(path.join(S, 'public/portraits/msx/mg1/diane/calm.webp'));
const ROOT = await mkdtemp(path.join(HERE, 'fixture-run-'));
const evidence = { schema: 'cqc.pass8.storage-fixture-tests/1', fixtureRoot: ROOT, realProductionSyncExecuted: false, realProductionBuildExecuted: false, productionReadonlyPins: {}, cases: [] };
for (const file of [SYNC, path.join(S, 'vite.config.ts'), path.join(S, 'package.json')]) evidence.productionReadonlyPins[file] = digest(await readFile(file));

async function put(root, name, bytes) { await mkdir(path.dirname(path.join(root, name)), { recursive: true }); await writeFile(path.join(root, name), bytes); }
async function pinsFor(root, paths, v2 = false) {
  return { schema: v2 ? 'cqc.pass8.immutable-raster-pins/2' : 'cqc.pass8.immutable-png-pins/1', sourceRoot: root, confirmedByRoot: true, sourceState: 'frozen', files: await Promise.all(paths.map(async (file) => ({ path: file, ...(v2 ? { format: path.extname(file).slice(1) } : {}), ...(await fingerprint(path.join(root, file))), immutable: true }))) };
}
async function runtimeFixture(name) {
  const base = path.join(ROOT, name), source = path.join(base, 'source'), destination = path.join(base, 'runtime');
  await put(source, 'index.html', '<!doctype html><script>localStorageKey.toLowerCase().includes("cqc")</script><script src="src/main.js"></script><a href="modules/atelier-v056.html">Workshop</a><img src="assets/native.png"><img src="assets/unfrozen.png"><a href="data/state.json">state</a><a href="a-x.json">edge</a><a href="a/x.json">edge2</a>');
  await put(source, 'src/main.js', 'window.fixture = { file: "data/state.json" };');
  await put(source, 'data/state.json', '{"original":true}\n');
  await put(source, 'modules/atelier-v056.html', '<html>Old filesystem-only workshop</html>');
  for (const file of ['chronicles-v056.html', 'unified-versus-v055.html', 'arcade-chronicles-v055.html']) await put(source, `modules/${file}`, '<!doctype html><p>Preserved mode</p>');
  await put(source, 'src/chronicles-data-v056.js', 'window.CQC55_DATA={counts:{stories:1}};');
  for (const file of ['assets/native.png', 'assets/unfrozen.png', 'assets/not-reachable.png']) await put(source, file, PNG);
  await put(source, 'a-x.json', '{}'); await put(source, 'a/x.json', '{}');
  await put(source, 'docs/history.md', 'Never part of runtime');
  await put(destination, 'old/kept.txt', 'Old runtime must remain recoverable\n');
  const pins = await pinsFor(source, ['assets/native.png']);
  return { base, source, destination, syncModule: SYNC, pins, backupRoot: path.join(base, 'backups'), evidenceRoot: path.join(base, 'evidence') };
}
function record(name, details) { evidence.cases.push({ name, status: 'passed', ...details }); }

test('exclusive pinned PNG links, independent mutable/unpinned copies, and frozen source guards', async () => {
  const fixture = await runtimeFixture('copy-contract'), target = path.join(fixture.base, 'fresh-stage'); await mkdir(target);
  const row = await fingerprint(path.join(fixture.source, 'assets/native.png'));
  const staged = await stageFile({ sourceRoot: fixture.source, relative: 'assets/native.png', targetRoot: target, expected: row, pin: fixture.pins.files[0] });
  assert.equal(staged.mode, 'immutable-png-hardlink'); assert.equal(staged.ino, row.ino); assert.equal(staged.dev, row.dev);
  for (const file of ['assets/unfrozen.png', 'data/state.json']) {
    const sourceRow = await fingerprint(path.join(fixture.source, file));
    const copied = await stageFile({ sourceRoot: fixture.source, relative: file, targetRoot: target, expected: sourceRow });
    assert.equal(copied.sha256, sourceRow.sha256); assert.notEqual(copied.ino, sourceRow.ino);
  }
  await assert.rejects(stageFile({ sourceRoot: fixture.source, relative: 'assets/native.png', targetRoot: target, expected: row, pin: fixture.pins.files[0] }), /EEXIST/);
  await put(fixture.source, 'assets/native.png', Buffer.concat([PNG, Buffer.from('mutation')]));
  await assert.rejects(planSync(fixture), /Frozen source changed/);
  const bad = structuredClone(fixture.pins); bad.files[0].path = 'data/state.json';
  assert.throws(() => freezePins(bad, fixture.source), /Invalid|Unsupported/);
  for (const name of ['../escape.png', '/absolute.png', 'assets/../native.png', 'assets\\native.png']) {
    const unsafe = structuredClone(fixture.pins); unsafe.files[0].path = name; assert.throws(() => freezePins(unsafe, fixture.source), /Unsafe/);
  }
  const unconfirmed = structuredClone(fixture.pins); unconfirmed.confirmedByRoot = false; assert.throws(() => freezePins(unconfirmed, fixture.source), /root-confirmed/);
  record('copy-contract', { sourceBytesPinned: true, nativePixelsUntouchedUntilIntentionalDisposableFixtureMutation: true, mutableFilesShareNoInode: true });
});

test('generic reachability and both exact transformations retained; old runtime bytes preserved', async () => {
  const fixture = await runtimeFixture('sync-equivalence');
  const beforeSource = byteInventory(await inventory(fixture.source)), beforeDestination = byteInventory(await inventory(fixture.destination));
  const { plan, graph } = await planSync(fixture);
  assert.deepEqual(plan.transformedFiles, ['index.html', 'modules/atelier-v056.html']);
  assert.deepEqual(byteInventory(await inventory(fixture.destination)), beforeDestination);
  assert.ok(!plan.manifest.files.some((row) => row.path.includes('not-reachable') || row.path.startsWith('docs/')));
  const result = await syncFrozenRuntime({ ...fixture, reviewedPlan: plan });
  for (const row of graph.manifest.files) assert.deepEqual(await readFile(path.join(fixture.destination, row.path)), graph.files.get(row.path).bytes);
  assert.deepEqual(JSON.parse(await readFile(path.join(fixture.destination, 'runtime-manifest.json'))), graph.manifest);
  assert.deepEqual(byteInventory(await inventory(result.receipt.promotion.backup)), beforeDestination);
  assert.deepEqual(byteInventory(await inventory(fixture.source)), beforeSource);
  assert.equal((await lstat(path.join(fixture.destination, 'assets/native.png'))).ino, (await lstat(path.join(fixture.source, 'assets/native.png'))).ino);
  assert.notEqual((await lstat(path.join(fixture.destination, 'index.html'))).ino, (await lstat(path.join(fixture.source, 'index.html'))).ino);
  assert.match(await readFile(path.join(fixture.destination, 'index.html'), 'utf8'), /startsWith\('cqc'\)/);
  record('sync-equivalence', { runtimeFiles: graph.manifest.files.length, references: graph.manifest.references.length, transformedBytesMatchOfficialBuilder: true, previousDestinationRecoverable: true, immutablePngHardlinks: result.receipt.rows.filter((row) => row.mode === 'immutable-png-hardlink').length });
});

test('explicit raster/2 links real WebP bytes; legacy PNG/1, forged containers and mutable files cannot link as WebP', async () => {
  const fixture = await runtimeFixture('webp-v2'), target = path.join(fixture.base, 'fresh-webp-stage'); await mkdir(target);
  await put(fixture.source, 'assets/real.webp', WEBP); await put(fixture.source, 'assets/unpinned.webp', WEBP);
  const pins = await pinsFor(fixture.source, ['assets/native.png', 'assets/real.webp'], true), frozen = freezePins(pins, fixture.source);
  const row = await fingerprint(path.join(fixture.source, 'assets/real.webp'));
  const staged = await stageFile({ sourceRoot: fixture.source, relative: 'assets/real.webp', targetRoot: target, expected: row, pin: frozen.get('assets/real.webp') });
  assert.equal(staged.mode, 'immutable-webp-hardlink'); assert.equal(staged.ino, row.ino); assert.equal(staged.sha256, row.sha256);
  const unpinned = await stageFile({ sourceRoot: fixture.source, relative: 'assets/unpinned.webp', targetRoot: target, expected: await fingerprint(path.join(fixture.source, 'assets/unpinned.webp')) });
  assert.notEqual(unpinned.ino, (await fingerprint(path.join(fixture.source, 'assets/unpinned.webp'))).ino);
  const legacy = structuredClone(pins); legacy.schema = 'cqc.pass8.immutable-png-pins/1'; assert.throws(() => freezePins(legacy, fixture.source), /Invalid/);
  for (const file of ['state.json', 'main.js', 'fake.jpeg']) { const bad = structuredClone(pins); bad.files[1].path = file; assert.throws(() => freezePins(bad, fixture.source), /Unsupported/); }
  const wrongFormat = structuredClone(pins); wrongFormat.files[1].format = 'png'; assert.throws(() => freezePins(wrongFormat, fixture.source), /Invalid/);
  const wrongLength = Buffer.from(WEBP); wrongLength.writeUInt32LE(4, 4); assert.throws(() => assertRasterSignature(wrongLength, 'webp', 'forged.webp'), /signature\/length/);
  assert.throws(() => assertRasterSignature(Buffer.from('RIFF\u0004\u0000\u0000\u0000WEBP'), 'webp', 'empty.webp'), /signature\/length/);
  const wrongChunk = Buffer.from(WEBP); wrongChunk.write('JSON', 12, 'ascii'); assert.throws(() => assertRasterSignature(wrongChunk, 'webp', 'renamed.webp'), /chunk mismatch/);
  const badBound = Buffer.from(WEBP); badBound.writeUInt32LE(WEBP.length, 16); assert.throws(() => assertRasterSignature(badBound, 'webp', 'overflow.webp'), /chunk exceeds/);
  record('raster-v2-webp', { realWebpBytes: WEBP.length, webpSourceSha256: digest(WEBP), sameNativeInodeAndBytes: true, unpinnedWebpCopiedIndependently: true, legacyPngStillPngOnly: true, forgedOrMislabelledContainersRejected: true });
});

test('reviewed destination/source changes reject execution, and symbolic links reject the tree', async () => {
  const fixture = await runtimeFixture('change-guards'), { plan } = await planSync(fixture);
  await put(fixture.destination, 'new.txt', 'Concurrent destination mutation');
  await assert.rejects(syncFrozenRuntime({ ...fixture, reviewedPlan: plan }), /differ from reviewed plan/);
  const second = await runtimeFixture('source-change'), originalPlan = (await planSync(second)).plan;
  await put(second.source, 'data/state.json', '{"original":false}');
  await assert.rejects(syncFrozenRuntime({ ...second, reviewedPlan: originalPlan }), /differ from reviewed plan/);
  const third = await runtimeFixture('symlink-guards'); await symlink(path.join(third.source, 'data/state.json'), path.join(third.source, 'src/alias.json'));
  await assert.rejects(planSync(third), /symbolic link/);
  await assert.rejects(guardOperationRoots({ sourceRoots: [second.source], destination: second.destination, stage: second.destination + '.tmp', backupRoot: second.destination + '/backup', evidenceRoot: second.evidenceRoot }), /disjoint/);
  record('change-guards', { destinationChangeRejected: true, mutableSourceChangeRejected: true, symlinkRejected: true, overlappingBackupRejected: true });
});

test('caught pre-promotion and post-promotion failures restore old destination without deleting either version', async () => {
  for (const post of [false, true]) {
    const base = path.join(ROOT, post ? 'rollback-post' : 'rollback-pre'), destination = path.join(base, 'runtime'), stage = path.join(base, 'stage');
    await put(destination, 'old.txt', 'old original'); await put(stage, 'new.txt', 'new reviewed');
    const before = byteInventory(await inventory(destination)), expected = byteInventory(await inventory(stage));
    const journal = path.join(base, 'evidence/promotion.json'); let failure;
    try {
      await promotePreserving({ stage, destination, before, backupRoot: path.join(base, 'backups'), journal, async afterBackup() { if (post) await put(stage, 'new.txt', 'unreviewed late mutation'); else throw new Error('Injected failure before activation'); }, async validate(active) { if (!sameInventory(expected, await inventory(active))) throw new Error('Injected integrity failure after activation'); } });
    } catch (error) { failure = error; }
    assert.ok(failure); assert.equal(failure.promotion.status, 'rolled-back');
    assert.deepEqual(byteInventory(await inventory(destination)), before);
    assert.ok(await readFile(journal)); assert.ok(await readFile(journal + '.failure.json'));
    if (post) assert.equal(await readFile(path.join(failure.promotion.rejected, 'new.txt'), 'utf8'), 'unreviewed late mutation');
    else assert.equal(await readFile(path.join(stage, 'new.txt'), 'utf8'), 'new reviewed');
  }
  record('rollback', { caughtFailureBeforeActivationRestored: true, caughtIntegrityFailureAfterActivationRestored: true, rejectedNewOutputPreserved: true });
});

test('inventory comparison ignores traversal order; no mutable output can alias TypeScript outputs', async () => {
  const base = path.join(ROOT, 'source-order'); await put(base, 'a/x.txt', 'one'); await put(base, 'a-x.txt', 'two');
  const rows = byteInventory(await inventory(base)); assert.ok(sameInventory(rows, [...rows].reverse()));
  await put(base, 'vite.config.js', 'generated'); await link(path.join(base, 'vite.config.js'), path.join(base, 'compiler-output-alias.js'));
  await assert.rejects(guardTypecheckOutputs(base), /aliases another path/);
  record('canonical-order-and-tsc', { orderIndependent: true, aliasedTypeScriptOutputRejectedBeforeCompiler: true });
});

test('build plans freeze app inputs and reject output/evidence inside source', async () => {
  const base = path.join(ROOT, 'build-plan'), projectRoot = path.join(base, 'project'), destination = path.join(projectRoot, 'dist');
  await put(projectRoot, 'src/main.ts', 'export const version=1;'); await put(projectRoot, 'vite.config.ts', 'export default {};'); await put(projectRoot, 'public/pinned.png', PNG);
  const pins = await pinsFor(path.join(projectRoot, 'public'), ['pinned.png']);
  const plan = await planBuild({ projectRoot, destination, pins });
  await put(projectRoot, 'src/main.ts', 'export const version=2;');
  assert.notDeepEqual((await planBuild({ projectRoot, destination, pins })).sourceFiles, plan.sourceFiles);
  for (const badDestination of [projectRoot, path.join(projectRoot, 'src'), path.join(projectRoot, 'public'), base]) await assert.rejects(planBuild({ projectRoot, destination: badDestination, pins }), /limited to its dist/);
  await assert.rejects(guardOperationRoots({ sourceRoots: [projectRoot], destination, stage: destination + '.tmp', backupRoot: path.join(base, 'backups'), evidenceRoot: path.join(projectRoot, 'new-evidence') }), /disjoint/);
  record('build-plan-source-and-paths', { appInputMutationChangesPlan: true, srcAndPublicOutputsRejected: true, ancestorOutputRejected: true, sourceEvidenceRejected: true });
});

test('public bundle collision fails exclusive creation without overwriting generated code', async () => {
  const base = path.join(ROOT, 'bundle-collision'), publicRoot = path.join(base, 'public'), stage = path.join(base, 'stage');
  await put(publicRoot, 'index.html', 'public index'); await put(stage, 'index.html', 'generated index');
  const plugin = stagingPlugin({ publicRoot, stage, publicFiles: byteInventory(await inventory(publicRoot)), pins: new Map(), evidence: [] });
  await assert.rejects(plugin.writeBundle.handler(), /EEXIST/);
  assert.equal(await readFile(path.join(stage, 'index.html'), 'utf8'), 'generated index');
  record('exclusive-bundle-collision', { generatedCodePreserved: true });
});

test('pin recorder and plan/execute CLIs run with explicit frozen assertion and concrete reviewed SHA', async () => {
  const fixture = await runtimeFixture('cli-roundtrip'), pinsFile = path.join(fixture.base, 'recorded-pins.json'), planFile = path.join(fixture.base, 'reviewed-plan.json');
  const run = (file, args) => promisify(execFile)(process.execPath, [path.join(HERE, file), ...args], { env: { ...process.env, NODE_TEST_CONTEXT: undefined } });
  await assert.rejects(run('prepare-frozen-png-pins.mjs', ['--source', fixture.source, '--scope', 'runtime', '--output', pinsFile, '--sync-module', SYNC]), /source-state frozen/);
  await run('prepare-frozen-png-pins.mjs', ['--source', fixture.source, '--scope', 'runtime', '--output', pinsFile, '--sync-module', SYNC, '--source-state', 'frozen', '--confirm-owner', 'root']);
  const pins = JSON.parse(await readFile(pinsFile)); assert.equal(pins.files.length, 2); assert.ok(!pins.files.some((row) => row.path.includes('not-reachable')));
  const args = ['--source', fixture.source, '--destination', fixture.destination, '--sync-module', SYNC, '--pins', pinsFile, '--plan', planFile];
  const before = byteInventory(await inventory(fixture.destination)); await run('sync-frozen-runtime.mjs', args);
  assert.deepEqual(byteInventory(await inventory(fixture.destination)), before);
  await assert.rejects(run('sync-frozen-runtime.mjs', [...args, '--execute', '--plan-sha256', '0'.repeat(64)]), /Reviewed plan SHA required/);
  const executed = await run('sync-frozen-runtime.mjs', [...args, '--execute', '--plan-sha256', digest(await readFile(planFile)), '--backup-root', fixture.backupRoot, '--evidence-root', fixture.evidenceRoot]);
  const receipts = (await readdir(fixture.evidenceRoot)).filter((file) => file.startsWith('receipt-'));
  assert.equal(receipts.length, 1); assert.equal(JSON.parse(await readFile(path.join(fixture.evidenceRoot, receipts[0]))).status, 'passed');
  await put(fixture.source, 'assets/cli.webp', WEBP); await put(fixture.source, 'index.html', (await readFile(path.join(fixture.source, 'index.html'), 'utf8')) + '<img src="assets/cli.webp">');
  const rasterPinsFile = path.join(fixture.base, 'raster-pins.json');
  await run('prepare-frozen-raster-pins.mjs', ['--source', fixture.source, '--scope', 'runtime', '--output', rasterPinsFile, '--sync-module', SYNC, '--source-state', 'frozen', '--confirm-owner', 'root', '--formats', 'png,webp']);
  const rasterPins = JSON.parse(await readFile(rasterPinsFile)); assert.equal(rasterPins.schema, 'cqc.pass8.immutable-raster-pins/2'); assert.equal(rasterPins.files.length, 3); assert.equal(rasterPins.files.find((row) => row.path.endsWith('.webp')).format, 'webp');
  record('cli-roundtrip', { ownerFreezeAssertionRequired: true, onlyReachablePngsPinned: true, planLeavesDestinationUnchanged: true, wrongPlanShaRejected: true, concreteReviewedPlanExecutedOnFixtureOnly: true });
});

test('real official Vite/PWA fixture stages public before Workbox, preserves runtime graph and previous dist', { timeout: 120000 }, async () => {
  const fixture = await runtimeFixture('real-vite-pwa'), projectRoot = path.join(fixture.base, 'project'), publicRoot = path.join(projectRoot, 'public');
  await put(projectRoot, 'index.html', '<!doctype html><html><head><title>Storage fixture</title></head><body><div id="app"></div><script type="module" src="/src/main.js"></script></body></html>');
  await put(projectRoot, 'src/main.js', 'document.querySelector("#app").textContent="verified storage fixture";');
  await put(projectRoot, 'package.json', '{"type":"module"}'); await put(projectRoot, 'scripts/sync-cqc-runtime.mjs', await readFile(SYNC));
  const runtime = { ...fixture, destination: path.join(publicRoot, 'cqc') }; const runtimePlan = (await planSync(runtime)).plan;
  await syncFrozenRuntime({ ...runtime, reviewedPlan: runtimePlan });
  const icons = ['pwa-192x192.png', 'pwa-512x512.png', 'pwa-maskable-512x512.png', 'apple-touch-icon.png'];
  for (const icon of icons) await copyFile(path.join(S, 'public', icon), path.join(publicRoot, icon));
  await put(publicRoot, 'glob-only.json', '{"mustBeDiscoveredBeforeGenerateSW":true}');
  await put(publicRoot, 'real-immutable.webp', WEBP);
  const configFile = path.join(projectRoot, 'vite.config.mjs');
  await mkdir(path.join(projectRoot, 'node_modules')); await symlink(path.join(S, 'node_modules/vite-plugin-pwa'), path.join(projectRoot, 'node_modules/vite-plugin-pwa'));
  await put(projectRoot, 'vite.config.mjs', `import { VitePWA } from 'vite-plugin-pwa';\nexport default { plugins: [VitePWA({ registerType:'prompt', injectRegister:false, includeAssets:${JSON.stringify(icons)}, manifest:{name:'Storage Fixture',short_name:'Fixture',start_url:'/',display:'standalone',theme_color:'#010101',background_color:'#010101',icons:[{src:'pwa-192x192.png',sizes:'192x192',type:'image/png'},{src:'pwa-512x512.png',sizes:'512x512',type:'image/png'},{src:'pwa-maskable-512x512.png',sizes:'512x512',type:'image/png',purpose:'maskable'}],shortcuts:[{name:'Builder',url:'/?module=builder'},{name:'CQC',url:'/?module=cqc'},{name:'Codec',url:'/?module=codec'},{name:'VR',url:'/?module=vr'}]},workbox:{globPatterns:['**/*.{js,css,html,json,png,webp,svg,ico,woff2}'],globIgnores:['cqc/**'],navigateFallback:'index.html',navigateFallbackDenylist:[/^\\/cqc(?:\\/|$)/],runtimeCaching:[{urlPattern:({url,sameOrigin})=>sameOrigin&&url.pathname.startsWith('/cqc/'),handler:'NetworkFirst',options:{cacheName:'cqc-runtime',networkTimeoutSeconds:5,expiration:{maxEntries:300,maxAgeSeconds:2592000}}}],maximumFileSizeToCacheInBytes:3145728,cleanupOutdatedCaches:true,clientsClaim:true,skipWaiting:false}})] };\n`);
  const destination = path.join(projectRoot, 'dist'); await put(destination, 'old-dist.txt', 'old deployed build fixture');
  const pins = await pinsFor(publicRoot, [...icons, 'cqc/assets/native.png', 'real-immutable.webp'], true);
  const input = { projectRoot, destination, configFile, pins, backupRoot: path.join(fixture.base, 'build-backups'), evidenceRoot: path.join(fixture.base, 'build-evidence'), viteApiPath: VITE, typecheck: false };
  const plan = await planBuild(input); const result = await buildFrozenPublic({ ...input, reviewedPlan: plan });
  const sw = await readFile(path.join(destination, 'sw.js'), 'utf8');
  assert.match(sw, /glob-only\.json/); assert.ok(!/url:\s*["']cqc\//.test(sw));
  assert.deepEqual(byteInventory(await inventory(result.receipt.promotion.backup)), plan.previousDestination);
  for (const icon of [...icons, 'cqc/assets/native.png', 'real-immutable.webp']) assert.equal((await lstat(path.join(destination, icon))).ino, (await lstat(path.join(publicRoot, icon))).ino);
  assert.match(sw, /real-immutable\.webp/);
  for (const mutable of ['glob-only.json', 'cqc/index.html', 'cqc/runtime-manifest.json']) assert.notEqual((await lstat(path.join(destination, mutable))).ino, (await lstat(path.join(publicRoot, mutable))).ino);
  await promisify(execFile)(process.execPath, [path.join(S, 'scripts/check-pwa.mjs')], { cwd: projectRoot });
  record('real-vite-pwa', { publicFiles: plan.publicFiles.length, hardlinkedPngs: result.receipt.rows.filter((row) => row.mode === 'immutable-png-hardlink').length, hardlinkedWebps: result.receipt.rows.filter((row) => row.mode === 'immutable-webp-hardlink').length, independentPublicCopies: result.receipt.rows.filter((row) => row.mode === 'independent-copy').length, unlistedPublicMarkerPrecachedBeforePwaCloseBundle: true, immutableWebpPrecachedWithSameNativeBytes: true, unchangedOfficialPwaCheckPassed: true, previousDistRecoverable: true, receipt: result.receiptPath });
});

after(async () => {
  for (const [file, hash] of Object.entries(evidence.productionReadonlyPins)) assert.equal(digest(await readFile(file)), hash, `Production source changed during fixtures: ${file}`);
  evidence.productionReadonlyPinsRevalidated = true;
  await put(ROOT, 'TEST_EVIDENCE.json', JSON.stringify(evidence, null, 2) + '\n');
  console.log(`Fixture evidence: ${path.join(ROOT, 'TEST_EVIDENCE.json')}`);
});
