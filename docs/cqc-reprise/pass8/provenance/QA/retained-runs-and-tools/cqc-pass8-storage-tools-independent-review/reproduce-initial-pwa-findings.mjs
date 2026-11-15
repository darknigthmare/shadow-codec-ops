import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mkdir, writeFile } from 'node:fs/promises';
import { verifyBuildArtifacts } from '/workspace/cqc-pass8-storage-tools/build-with-frozen-public.mjs';
const base = path.dirname(fileURLToPath(import.meta.url));
const manifest = { name: 'Shadow', short_name: 'Shadow', start_url: '/', display: 'standalone', theme_color: '#06140c', background_color: '#020703', icons: [{ src: 'pwa-192x192.png' }, { src: 'pwa-512x512.png' }, { src: 'pwa-maskable-512x512.png', purpose: 'maskable' }], shortcuts: [{ url: '/?module=cqc' }, { url: '/?module=builder' }, { url: '/?module=campaign' }, { url: '/?module=codec' }] };
const tests = [
  ['baseline manifest', () => {}, false],
  ['missing required name/theme/background/start fields', m => { delete m.name; delete m.short_name; delete m.start_url; delete m.theme_color; delete m.background_color; }, true],
  ['only one maskable icon', m => { m.icons = [m.icons[2]]; }, true],
  ['only one CQC shortcut and no Mission Builder', m => { m.shortcuts = [m.shortcuts[0]]; }, true],
  ['four shortcuts but no Mission Builder', m => { m.shortcuts[1].url = '/?module=other'; }, true],
  ['only nested Workbox runtime', () => {}, true],
];
const results = [];
for (let i = 0; i < tests.length; i++) {
  const [name, mutate, mustReject] = tests[i], stage = path.join(base, 'initial-pwa-fixtures', 'case-' + i);
  const m = structuredClone(manifest); mutate(m);
  await mkdir(path.join(stage, 'cqc'), { recursive: true });
  for (const file of ['index.html', 'pwa-192x192.png', 'pwa-512x512.png', 'pwa-maskable-512x512.png', 'apple-touch-icon.png', 'cqc/index.html', 'cqc/runtime-manifest.json']) await writeFile(path.join(stage, file), 'fixture\n');
  await writeFile(path.join(stage, 'manifest.webmanifest'), JSON.stringify(m));
  await writeFile(path.join(stage, 'sw.js'), 'precacheAndRoute([]); /* cqc-runtime pwa-192x192.png pwa-512x512.png pwa-maskable-512x512.png apple-touch-icon.png */\n');
  const workbox = i === 5 ? 'workbox-nested/runtime.js' : 'workbox-fixture.js';
  await mkdir(path.dirname(path.join(stage, workbox)), { recursive: true });
  await writeFile(path.join(stage, workbox), '/* fixture Workbox */\n');
  let rejected = false, error = null;
  try { await verifyBuildArtifacts(stage, []); } catch (e) { rejected = true; error = e.message; }
  results.push({ name, requiredOriginalCheckerReject: mustReject, wrapperRejected: rejected, error, originalCheckerCompatibility: rejected === mustReject });
}
await writeFile(path.join(base, 'INITIAL_PWA_REPRODUCTION_RESULTS.json'), JSON.stringify({ productionBuildRun: false, productionRepositoriesModified: false, results }, null, 2) + '\n');
console.log(JSON.stringify(results, null, 2));
