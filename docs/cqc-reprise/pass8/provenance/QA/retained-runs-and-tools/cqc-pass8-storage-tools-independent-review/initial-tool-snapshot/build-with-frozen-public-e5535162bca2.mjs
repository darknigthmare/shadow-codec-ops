import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { randomUUID } from 'node:crypto';
import { spawn } from 'node:child_process';
import { readFile, mkdir } from 'node:fs/promises';
import { digest, freezePins, inventory, byteInventory, sameInventory, stageFile, verifyPins, writeExclusiveJson, promotePreserving, parseArgs } from './common.mjs';

export async function planBuild({ projectRoot, destination, pins, configFile }) {
  projectRoot = path.resolve(projectRoot); destination = path.resolve(destination); configFile = path.resolve(configFile ?? path.join(projectRoot, 'vite.config.ts'));
  const publicRoot = path.join(projectRoot, 'public');
  if (destination === projectRoot || destination.startsWith(publicRoot + path.sep) || publicRoot.startsWith(destination + path.sep)) throw new Error('Build output must not overlap project/public source.');
  freezePins(pins, publicRoot);
  const publicFiles = byteInventory(await inventory(publicRoot));
  if (!publicFiles) throw new Error('Public source directory missing.');
  return { schema: 'cqc.pass8.storage-build-plan/1', projectRoot, destination, publicRoot, configFile, configSha256: digest(await readFile(configFile)), pinsSha256: digest(Buffer.from(JSON.stringify(pins))), publicFiles, previousDestination: byteInventory(await inventory(destination)), copyPublicDir: false, stagePublicHook: 'writeBundle, order pre, sequential true; awaited before VitePWA closeBundle generateSW', pwaConfigUnchanged: true, productionBuildNotRun: true };
}

async function command(executable, args, cwd) {
  await new Promise((resolve, reject) => {
    const child = spawn(executable, args, { cwd, stdio: 'inherit' });
    child.once('error', reject);
    child.once('exit', (code) => code === 0 ? resolve() : reject(new Error(`${executable} exited ${code}`)));
  });
}

export function stagingPlugin({ publicRoot, stage, publicFiles, pins, evidence }) {
  return { name: 'pass8-stage-frozen-public-before-workbox', apply: 'build',
    writeBundle: { order: 'pre', sequential: true, async handler() {
      if (!sameInventory(publicFiles, await inventory(publicRoot))) throw new Error('Public source changed since reviewed plan.');
      for (const row of publicFiles) {
        // stageFile uses exclusive creation; a generated-bundle/public path collision
        // fails instead of overwriting either generated code or old public bytes.
        evidence.push(await stageFile({ sourceRoot: publicRoot, relative: row.path, targetRoot: stage, expected: row, pin: pins.get(row.path) }));
      }
      await verifyPins(publicRoot, pins);
    } }
  };
}

export async function verifyBuildArtifacts(stage, publicFiles) {
  const actual = new Map((await inventory(stage)).map((row) => [row.path, row]));
  for (const expected of publicFiles) {
    const row = actual.get(expected.path);
    if (!row || row.sha256 !== expected.sha256 || row.bytes !== expected.bytes) throw new Error(`Built public asset missing/changed: ${expected.path}`);
  }
  for (const file of ['index.html', 'manifest.webmanifest', 'sw.js', 'pwa-192x192.png', 'pwa-512x512.png', 'pwa-maskable-512x512.png', 'apple-touch-icon.png', 'cqc/index.html', 'cqc/runtime-manifest.json']) if (!actual.has(file)) throw new Error(`PWA artifact missing: ${file}`);
  const manifest = JSON.parse(await readFile(path.join(stage, 'manifest.webmanifest'), 'utf8'));
  if (manifest.display !== 'standalone' || !manifest.icons?.some((icon) => String(icon.purpose ?? '').includes('maskable')) || !manifest.shortcuts?.some((item) => item.url?.includes('module=cqc'))) throw new Error('PWA manifest contract failed.');
  const sw = await readFile(path.join(stage, 'sw.js'), 'utf8');
  if (!sw.includes('precacheAndRoute') || !sw.includes('cqc-runtime') || /url:\s*["']cqc\//.test(sw)) throw new Error('Generated SW must retain CQC runtime caching and exclude CQC from global precache.');
  if (![...actual.keys()].some((file) => file.startsWith('workbox-') && file.endsWith('.js'))) throw new Error('Workbox runtime artifact missing.');
  // includeAssets are resolved from public, but glob discovery must see staged
  // public files before generateSW; icon URL checks detect a late staging hook.
  for (const file of ['pwa-192x192.png', 'pwa-512x512.png', 'pwa-maskable-512x512.png', 'apple-touch-icon.png']) if (!sw.includes(file)) throw new Error(`Public icon absent from generated precache: ${file}`);
  return byteInventory([...actual.values()].sort((a, b) => a.path.localeCompare(b.path, 'en')));
}

export async function buildFrozenPublic({ projectRoot, destination, configFile, pins, reviewedPlan, backupRoot, evidenceRoot, viteApiPath, typecheck = true, afterBackup }) {
  const plan = await planBuild({ projectRoot, destination, configFile, pins });
  if (JSON.stringify(plan) !== JSON.stringify(reviewedPlan)) throw new Error('Build sources/config/public/destination differ from reviewed plan.');
  if (typecheck) await command(process.execPath, [path.join(plan.projectRoot, 'node_modules/typescript/bin/tsc'), '-b'], plan.projectRoot);
  await mkdir(path.dirname(plan.destination), { recursive: true });
  const stage = `${plan.destination}.storage-build-${randomUUID()}`;
  await mkdir(stage, { recursive: false });
  const linkedRows = [], frozen = freezePins(pins, plan.publicRoot);
  const { build } = await import(pathToFileURL(path.resolve(viteApiPath ?? path.join(plan.projectRoot, 'node_modules/vite/dist/node/index.js'))).href);
  await build({ root: plan.projectRoot, configFile: plan.configFile, plugins: [stagingPlugin({ publicRoot: plan.publicRoot, stage, publicFiles: plan.publicFiles, pins: frozen, evidence: linkedRows })], build: { outDir: stage, emptyOutDir: true, copyPublicDir: false } });
  if (linkedRows.length !== plan.publicFiles.length) throw new Error('Vite public staging hook did not complete.');
  const built = await verifyBuildArtifacts(stage, plan.publicFiles);
  const syncModule = path.join(plan.projectRoot, 'scripts/sync-cqc-runtime.mjs');
  const { verifyRuntime } = await import(pathToFileURL(syncModule).href);
  await verifyRuntime(path.join(stage, 'cqc'));
  if (!sameInventory(plan.publicFiles, await inventory(plan.publicRoot))) throw new Error('Public source changed during build.');
  await verifyPins(plan.publicRoot, frozen);
  await mkdir(evidenceRoot, { recursive: true });
  const promotion = await promotePreserving({ stage, destination: plan.destination, before: plan.previousDestination, backupRoot, journal: path.join(evidenceRoot, `promotion-${randomUUID()}.json`), afterBackup });
  if (!sameInventory(built, await inventory(plan.destination))) throw new Error('Promoted build differs from verified staging.');
  const receipt = { schema: 'cqc.pass8.storage-build-receipt/1', status: 'passed', viteOfficialBuildApi: true, typecheckRan: typecheck, copyPublicDir: false, hookOrder: plan.stagePublicHook, configSha256: plan.configSha256, rows: linkedRows, publicSourceBeforeAndAfter: plan.publicFiles, destinationAfter: built, promotion, allPublicAssetsRetained: true, generatedWorkboxAndManifestVerified: true, cqcNotGlobalPrecached: true, historicalDeletion: false, sourcePixelsEdited: false };
  const receiptPath = path.join(evidenceRoot, `receipt-${randomUUID()}.json`); await writeExclusiveJson(receiptPath, receipt);
  return { receipt, receiptPath };
}

async function cli() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.project || !args.destination || !args.pins || !args.plan) throw new Error('Required: --project --destination --pins --plan. Default writes build plan only; --execute requires --plan-sha256. Official Vite config and package scripts stay unchanged.');
  const input = { projectRoot: args.project, destination: args.destination, configFile: args.config, pins: JSON.parse(await readFile(args.pins, 'utf8')) };
  if (!args.execute) {
    const plan = await planBuild(input); await writeExclusiveJson(args.plan, plan); console.log(JSON.stringify({ status: 'plan-only', plan: args.plan, sha256: digest(await readFile(args.plan)), publicFiles: plan.publicFiles.length }));
  } else {
    const raw = await readFile(args.plan); if (!/^[0-9a-f]{64}$/.test(args['plan-sha256'] ?? '') || digest(raw) !== args['plan-sha256']) throw new Error('Reviewed plan SHA required.');
    const base = path.dirname(fileURLToPath(import.meta.url));
    const result = await buildFrozenPublic({ ...input, reviewedPlan: JSON.parse(raw), typecheck: !args['skip-typecheck'], backupRoot: path.resolve(args['backup-root'] ?? path.join(base, 'preserved-dist-backups')), evidenceRoot: path.resolve(args['evidence-root'] ?? path.join(base, 'build-evidence')) });
    console.log(JSON.stringify({ status: result.receipt.status, receipt: result.receiptPath, publicFiles: result.receipt.rows.length, preservedBackup: result.receipt.promotion.backup }));
  }
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await cli();
