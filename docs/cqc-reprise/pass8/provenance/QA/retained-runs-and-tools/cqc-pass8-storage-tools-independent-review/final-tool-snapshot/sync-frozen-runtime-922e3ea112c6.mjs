import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { randomUUID } from 'node:crypto';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { digest, safeRelative, freezePins, inventory, byteInventory, sameInventory, stageFile, verifyPins, writeExclusiveJson, promotePreserving, parseArgs, assertRealAncestors, guardOperationRoots, overlaps } from './common.mjs';

export async function planSync({ source, destination, syncModule, pins }) {
  source = path.resolve(source); destination = path.resolve(destination);
  if (source === destination || source.startsWith(destination + path.sep) || destination.startsWith(source + path.sep)) throw new Error('Source and destination must be disjoint.');
  await assertRealAncestors(source); await assertRealAncestors(destination);
  const { buildRuntimeManifest } = await import(pathToFileURL(path.resolve(syncModule)).href);
  const graph = await buildRuntimeManifest(source);
  const frozen = freezePins(pins, source);
  await verifyPins(source, frozen);
  for (const row of graph.manifest.files) {
    safeRelative(row.path);
    if (row.transformation && frozen.has(row.path)) throw new Error('Transformed bytes cannot be hardlinked.');
  }
  const plan = { schema: 'cqc.pass8.storage-sync-plan/1', source, destination, syncModule: path.resolve(syncModule), syncModuleSha256: digest(await readFile(syncModule)), pinsSha256: digest(Buffer.from(JSON.stringify(pins))), pinsSchema: pins.schema, manifest: graph.manifest, previousDestination: byteInventory(await inventory(destination)), immutablePngHardlinks: graph.manifest.files.filter((row) => frozen.has(row.path) && row.path.toLowerCase().endsWith('.png')).length, immutableWebpHardlinks: graph.manifest.files.filter((row) => frozen.has(row.path) && row.path.toLowerCase().endsWith('.webp')).length, immutableRasterHardlinks: graph.manifest.files.filter((row) => frozen.has(row.path)).length, immutableLinkedBytes: graph.manifest.files.filter((row) => frozen.has(row.path)).reduce((sum, row) => sum + row.bytes, 0), independentCopyBytes: graph.manifest.files.filter((row) => !frozen.has(row.path)).reduce((sum, row) => sum + row.bytes, 0), independentCopies: graph.manifest.files.filter((row) => !frozen.has(row.path)).length, transformedFiles: graph.manifest.files.filter((row) => row.transformation).map((row) => row.path), destinationNotWritten: true };
  return { plan, graph, frozen };
}

export async function syncFrozenRuntime({ source, destination, syncModule, pins, reviewedPlan, backupRoot, evidenceRoot, afterBackup }) {
  const { plan, graph, frozen } = await planSync({ source, destination, syncModule, pins });
  if (JSON.stringify(plan) !== JSON.stringify(reviewedPlan)) throw new Error('Current graph, pins, source module or destination differ from reviewed plan.');
  const stage = `${plan.destination}.storage-sync-${randomUUID()}`;
  await guardOperationRoots({ sourceRoots: [plan.source], destination: plan.destination, stage, backupRoot, evidenceRoot });
  await mkdir(path.dirname(plan.destination), { recursive: true });
  await mkdir(stage, { recursive: false });
  const rows = [];
  for (const entry of graph.manifest.files) {
    rows.push(await stageFile({ sourceRoot: plan.source, relative: entry.path, targetRoot: stage, expected: entry, pin: frozen.get(entry.path), bytes: graph.files.get(entry.path).bytes }));
  }
  await writeFile(path.join(stage, 'runtime-manifest.json'), JSON.stringify(graph.manifest, null, 2) + '\n', { flag: 'wx' });
  const expected = [...graph.manifest.files.map(({ path: file, bytes, sha256 }) => ({ path: file, bytes, sha256 })), { path: 'runtime-manifest.json', bytes: Buffer.byteLength(JSON.stringify(graph.manifest, null, 2) + '\n'), sha256: digest(Buffer.from(JSON.stringify(graph.manifest, null, 2) + '\n')) }].sort((a, b) => a.path.localeCompare(b.path, 'en'));
  const staged = await inventory(stage);
  if (!sameInventory(expected, staged)) throw new Error('Staged runtime paths or bytes differ from supplied graph.');
  const { verifyRuntime, buildRuntimeManifest } = await import(pathToFileURL(plan.syncModule).href);
  await verifyRuntime(stage);
  await verifyPins(plan.source, frozen);
  if (JSON.stringify((await buildRuntimeManifest(plan.source)).manifest) !== JSON.stringify(graph.manifest)) throw new Error('Source runtime graph changed during staging.');
  if (digest(await readFile(plan.syncModule)) !== plan.syncModuleSha256) throw new Error('Generic sync module changed during staging.');
  await mkdir(evidenceRoot, { recursive: true });
  const journal = path.join(evidenceRoot, `promotion-${randomUUID()}.json`);
  const promoted = await promotePreserving({ stage, destination: plan.destination, before: plan.previousDestination, backupRoot, journal, afterBackup, async validate(active) {
    if (!sameInventory(expected, await inventory(active))) throw new Error('Promoted runtime differs from validated staging.');
    await verifyRuntime(active);
    await verifyPins(plan.source, frozen);
  } });
  const after = await inventory(plan.destination);
  const receipt = { schema: 'cqc.pass8.storage-sync-receipt/1', status: 'passed', manifest: graph.manifest, rows, previousDestination: plan.previousDestination, destinationAfter: byteInventory(after), promotion: promoted, hardlinkPolicy: 'Only explicitly pinned immutable PNG/1 or PNG+WebP raster/2 source files; every text/binary without an explicit raster pin has independent bytes.', noHistoricalDeletion: true, sourcePixelsEdited: false, atomicity: 'Each directory rename is atomic; a brief pathname gap exists between backup and stage renames, as in the generic sync. On caught promotion failure the original destination is restored. A prepared journal preserves crash recovery paths.' };
  const receiptPath = path.join(evidenceRoot, `receipt-${randomUUID()}.json`);
  await writeExclusiveJson(receiptPath, receipt);
  return { receipt, receiptPath };
}

async function cli() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.source || !args.destination || !args['sync-module'] || !args.pins || !args.plan) throw new Error('Required: --source --destination --sync-module --pins --plan. Default creates reviewed plan only; --execute requires that plan plus --plan-sha256.');
  if ([args.source, args.destination].some((root) => overlaps(path.resolve(args.plan), root))) throw new Error('Plan file must be outside source and runtime destination trees.');
  await assertRealAncestors(path.dirname(path.resolve(args.plan)));
  const pins = JSON.parse(await readFile(args.pins, 'utf8'));
  if (!args.execute) {
    const { plan } = await planSync({ source: args.source, destination: args.destination, syncModule: args['sync-module'], pins });
    await writeExclusiveJson(args.plan, plan);
    console.log(JSON.stringify({ status: 'plan-only', plan: args.plan, sha256: digest(await readFile(args.plan)), files: plan.manifest.files.length, hardlinks: plan.immutableRasterHardlinks, linkedBytes: plan.immutableLinkedBytes, copies: plan.independentCopies, copiedBytes: plan.independentCopyBytes }));
  } else {
    const raw = await readFile(args.plan);
    if (!/^[0-9a-f]{64}$/.test(args['plan-sha256'] ?? '') || digest(raw) !== args['plan-sha256']) throw new Error('Reviewed plan SHA required.');
    const base = path.dirname(fileURLToPath(import.meta.url));
    const result = await syncFrozenRuntime({ source: args.source, destination: args.destination, syncModule: args['sync-module'], pins, reviewedPlan: JSON.parse(raw), backupRoot: path.resolve(args['backup-root'] ?? path.join(base, 'preserved-runtime-backups')), evidenceRoot: path.resolve(args['evidence-root'] ?? path.join(base, 'sync-evidence')) });
    console.log(JSON.stringify({ status: result.receipt.status, receipt: result.receiptPath, files: result.receipt.manifest.files.length, preservedBackup: result.receipt.promotion.backup }));
  }
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await cli();
