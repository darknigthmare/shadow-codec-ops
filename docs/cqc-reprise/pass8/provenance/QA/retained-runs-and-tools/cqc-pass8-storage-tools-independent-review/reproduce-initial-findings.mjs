// All fixtures are owned by this review; no production sync or build is run.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mkdir, writeFile, readFile, stat } from 'node:fs/promises';
import { planBuild } from '/workspace/cqc-pass8-storage-tools/build-with-frozen-public.mjs';
import { digest, freezePins, inventory, byteInventory, stageFile, promotePreserving } from '/workspace/cqc-pass8-storage-tools/common.mjs';

const base = path.dirname(fileURLToPath(import.meta.url));
const fixture = path.join(base, 'initial-fixtures');
const project = path.join(fixture, 'project');
const publicRoot = path.join(project, 'public');
const results = [];
async function record(name, callback) {
  try { results.push({ name, ...await callback() }); }
  catch (error) { results.push({ name, unexpectedError: error.message }); }
}
await mkdir(publicRoot, { recursive: true });
await mkdir(path.join(project, 'src'), { recursive: true });
await writeFile(path.join(project, 'vite.config.ts'), 'export default {};\n');
await writeFile(path.join(project, 'src/main.ts'), 'export const state = "before";\n');
const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jxGsAAAAASUVORK5CYII=', 'base64');
await writeFile(path.join(publicRoot, 'frozen.png'), png);
await writeFile(path.join(publicRoot, 'mutable.js'), 'export default 1;\n');
const pins = { schema: 'cqc.pass8.immutable-png-pins/1', sourceRoot: publicRoot, sourceState: 'frozen', confirmedByRoot: true, files: [{ path: 'frozen.png', sha256: digest(png), bytes: png.length, immutable: true }] };
await record('Build plan fails to detect source-code change', async () => {
  const input = { projectRoot: project, destination: path.join(project, 'dist'), pins };
  const before = await planBuild(input);
  await writeFile(path.join(project, 'src/main.ts'), 'export const state = "after";\n');
  const after = await planBuild(input);
  return { sourceCodeChanged: true, planUnchanged: JSON.stringify(before) === JSON.stringify(after), classification: 'integrity gap in reviewed-source snapshot' };
});
await record('Build output accepts project src directory', async () => {
  try { await planBuild({ projectRoot: project, destination: path.join(project, 'src'), pins }); return { acceptedSourceOverlap: true, classification: 'source safety gap in destination validation' }; }
  catch (error) { return { acceptedSourceOverlap: false, error: error.message }; }
});
const stage = path.join(fixture, 'link-stage');
await mkdir(stage, { recursive: true });
const publicRows = await inventory(publicRoot);
await record('Only explicitly pinned PNG shares its source inode', async () => {
  const frozen = freezePins(pins, publicRoot), staged = [];
  for (const row of publicRows) staged.push(await stageFile({ sourceRoot: publicRoot, relative: row.path, targetRoot: stage, expected: row, pin: frozen.get(row.path) }));
  const linked = staged.find(row => row.path === 'frozen.png'), copied = staged.find(row => row.path === 'mutable.js');
  return { frozenPNGHardlinked: linked.mode === 'immutable-png-hardlink', mutableJSIndependent: copied.mode === 'independent-copy', classification: 'passed' };
});
await record('JavaScript cannot be pinned as immutable PNG', async () => {
  try { freezePins({ ...pins, files: [{ path: 'mutable.js', sha256: digest(Buffer.from('export default 1;\n')), bytes: 18, immutable: true }] }, publicRoot); return { rejected: false }; }
  catch (error) { return { rejected: true, error: error.message, classification: 'passed' }; }
});
await record('Unpinned PNG remains an independent copy', async () => {
  const next = path.join(fixture, 'unlinked-stage'); await mkdir(next, { recursive: true });
  const row = publicRows.find(row => row.path === 'frozen.png');
  const r = await stageFile({ sourceRoot: publicRoot, relative: row.path, targetRoot: next, expected: row });
  const src = await stat(path.join(publicRoot, row.path)), dst = await stat(path.join(next, row.path));
  return { mode: r.mode, independentInode: src.ino !== dst.ino, classification: 'passed' };
});
await record('Caught rename-stage failure restores previous destination', async () => {
  const destination = path.join(fixture, 'rollback-destination'), replacement = path.join(fixture, 'rollback-stage');
  await mkdir(destination); await mkdir(replacement);
  await writeFile(path.join(destination, 'old.txt'), 'preserve\n');
  const before = byteInventory(await inventory(destination));
  try { await promotePreserving({ stage: replacement, destination, before, backupRoot: path.join(fixture, 'rollback-backups'), journal: path.join(fixture, 'rollback-journal.json'), afterBackup: async () => { throw Error('fixture failure after backup'); } }); return { failedAsExpected: false }; }
  catch (error) { return { failedAsExpected: error.message === 'fixture failure after backup', previousDestinationRestored: (await readFile(path.join(destination, 'old.txt'), 'utf8')) === 'preserve\n', stageStillPreserved: (await stat(replacement)).isDirectory(), classification: 'passed' }; }
});
await record('Post-promotion stage-byte failure leaves new destination active', async () => {
  const destination = path.join(fixture, 'postcheck-destination'), replacement = path.join(fixture, 'postcheck-stage');
  await mkdir(destination); await mkdir(replacement);
  await writeFile(path.join(destination, 'old.txt'), 'original\n');
  await writeFile(path.join(replacement, 'new.txt'), 'validated\n');
  const before = byteInventory(await inventory(destination)), expected = byteInventory(await inventory(replacement));
  const promoted = await promotePreserving({ stage: replacement, destination, before, backupRoot: path.join(fixture, 'postcheck-backups'), journal: path.join(fixture, 'postcheck-journal.json'), afterBackup: async () => { await writeFile(path.join(replacement, 'new.txt'), 'changed after validation\n'); } });
  const actual = byteInventory(await inventory(destination));
  return { postcheckMismatch: JSON.stringify(expected) !== JSON.stringify(actual), previousDestinationPreservedAtBackup: (await readFile(path.join(promoted.backup, 'old.txt'), 'utf8')) === 'original\n', incorrectNewDestinationStillActive: (await readFile(path.join(destination, 'new.txt'), 'utf8')) === 'changed after validation\n', classification: 'rollback covers rename errors but not wrapper post-promotion validation errors' };
});
await writeFile(path.join(base, 'INITIAL_REPRODUCTION_RESULTS.json'), JSON.stringify({ productionSyncOrBuildRun: false, productionRepositoriesModified: false, results }, null, 2) + '\n');
console.log(JSON.stringify(results, null, 2));
