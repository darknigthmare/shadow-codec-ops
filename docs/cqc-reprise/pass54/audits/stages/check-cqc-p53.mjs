import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { constants } from 'node:fs';
import { open } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { discoverReferences, isRuntimePath } from './sync-cqc-runtime.mjs';

// Targeted P53 integrity check. This does not replace the complete cqc:check gate.
// Historical file rows and policy are preserved by digest; absent legacy image
// bytes are not downloaded, read or represented as newly verified.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const runtime = path.join(root, 'public/cqc');
const evidence = path.join(root, 'docs/cqc-reprise/pass53/verification-20261119');
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
const digest = value => sha256(Buffer.from(JSON.stringify(value)));
const keyOf = reference => `${reference.from}\0${reference.to}`;

async function read(file) {
  assert(Number.isInteger(constants.O_NOATIME) && Number.isInteger(constants.O_NOFOLLOW), 'Linux no-atime flags required');
  const handle = await open(file, constants.O_RDONLY | constants.O_NOATIME | constants.O_NOFOLLOW);
  try {
    assert((await handle.stat()).isFile(), `Regular file required: ${file}`);
    return await handle.readFile();
  } finally {
    await handle.close();
  }
}

const baselineBytes = await read(path.join(evidence, 'manifest-baseline.json'));
const baseline = JSON.parse(baselineBytes);
const manifestBytes = await read(path.join(runtime, 'runtime-manifest.json'));
const manifest = JSON.parse(manifestBytes);
const changed = new Set(baseline.changedExistingPaths);
const added = new Set(baseline.newRuntimePaths);
const newReferenceKeys = new Set(baseline.newReferences.map(keyOf));
const rows = new Map(manifest.files.map(row => [row.path, row]));
const referenceKeys = new Set(manifest.references.map(keyOf));

assert.equal(rows.size, manifest.files.length, 'Duplicate runtime file rows');
assert.equal(referenceKeys.size, manifest.references.length, 'Duplicate runtime reference rows');
assert.equal(manifest.files.length, baseline.historicalFileCount + added.size, 'Unexpected file count');
assert.equal(manifest.references.length, baseline.historicalReferenceCount + newReferenceKeys.size, 'Unexpected reference count');
assert.equal(added.size, 39, 'Expected 20 combat files and 19 atelier files');
assert.equal(newReferenceKeys.size, 40, 'Unexpected P53 dependency additions');
assert.equal(changed.size, 2, 'Expected exactly two historical HTML rows to change');
assert.equal(manifest.entry, 'index.html');
assert(rows.has(manifest.entry), 'Entry must have a checksummed file row');
assert(manifest.files.every(row => Number.isSafeInteger(row.bytes) && row.bytes >= 0 && /^[a-f0-9]{64}$/.test(row.sha256)), 'Invalid file metadata');
assert.equal(manifest.totalBytes, manifest.files.reduce((sum, row) => sum + row.bytes, 0), 'Runtime byte total mismatch');

const protectedFiles = manifest.files.filter(row => !changed.has(row.path) && !added.has(row.path));
assert.equal(protectedFiles.length, baseline.historicalFileCount - changed.size, 'Historical file rows removed');
assert.equal(digest(protectedFiles), baseline.protectedFilesSHA256, 'Historical file entries changed outside P53');
const protectedReferences = manifest.references.filter(reference => !newReferenceKeys.has(keyOf(reference)));
assert.equal(digest(protectedReferences), baseline.protectedReferencesSHA256, 'Historical dependency references changed');
const metadata = Object.fromEntries(Object.entries(manifest).filter(([key]) => !['files', 'references', 'totalBytes'].includes(key)));
assert.equal(digest(metadata), baseline.protectedMetadataSHA256, 'Historical manifest metadata or policy changed');
assert.equal(digest(manifest.externalReferences), baseline.externalReferencesSHA256, 'External route policy changed');
assert.equal(manifest.externalReferences.entries.length, baseline.externalReferenceCount);
assert.equal(sha256(await read(path.join(root, 'scripts/sync-cqc-runtime.mjs'))), baseline.syncScriptSHA256, 'Full runtime verifier changed');

const graph = new Map();
for (const reference of manifest.references) {
  assert(rows.has(reference.from) && rows.has(reference.to), 'Reference without a checksummed endpoint');
  if (!graph.has(reference.from)) graph.set(reference.from, []);
  graph.get(reference.from).push(reference.to);
}
for (const reference of baseline.newReferences) assert(referenceKeys.has(keyOf(reference)), 'Missing P53 dependency');
const reachable = new Set([manifest.entry]);
const queue = [manifest.entry];
for (let i = 0; i < queue.length; i++) {
  for (const next of graph.get(queue[i]) || []) {
    if (!reachable.has(next)) { reachable.add(next); queue.push(next); }
  }
}
assert.equal(reachable.size, manifest.files.length, 'Manifest has unreachable file rows');

const scope = [...changed, ...added].sort((a, b) => a.localeCompare(b, 'en'));
const checked = [];
let checkedBytes = 0;
let textOwnersChecked = 0;
for (const file of scope) {
  const row = rows.get(file);
  assert(row, `Missing P53 row: ${file}`);
  const bytes = await read(path.join(runtime, file));
  assert.equal(bytes.length, row.bytes, `Byte length changed: ${file}`);
  assert.equal(sha256(bytes), row.sha256, `SHA-256 changed: ${file}`);
  checkedBytes += bytes.length;
  if (/\.(?:html|js|json|css)$/.test(file)) {
    textOwnersChecked++;
    const found = discoverReferences(bytes.toString('utf8'), file, new Set(rows.keys()));
    assert.deepEqual(found.omittedReferences.filter(isRuntimePath), [], `Unresolved P53 reference: ${file}`);
    const expected = manifest.references.filter(reference => reference.from === file).map(reference => reference.to).sort();
    assert.deepEqual(found.references, expected, `Actual P53 references differ from manifest: ${file}`);
  }
  checked.push({ path: file, bytes: bytes.length, sha256: row.sha256 });
}

const report = {
  schema: 'cqc.p53.targeted-runtime-verification/1',
  status: 'passed',
  scope: 'P53 files, the two touched HTML owners, declared dependency graph, and preservation of historical manifest entries and policy.',
  fullRuntimeVerification: false,
  fullRuntimeCommand: 'npm run cqc:check',
  limitation: 'The 2834 unchanged historical file rows are preserved by digest; this command does not read their underlying runtime bytes.',
  manifestSHA256: sha256(manifestBytes),
  baselineSHA256: sha256(baselineBytes),
  manifestFiles: manifest.files.length,
  manifestReferences: manifest.references.length,
  manifestDeclaredBytes: manifest.totalBytes,
  newRuntimeFiles: added.size,
  newReferences: newReferenceKeys.size,
  historicalRowsUpdated: changed.size,
  historicalRowsPreserved: protectedFiles.length,
  externalReferencesPreserved: manifest.externalReferences.entries.length,
  scopedFilesHashed: checked.length,
  scopedBytesRead: checkedBytes,
  textOwnersChecked,
  declaredGraphReachableFiles: reachable.size,
  checked,
};

if (process.argv.includes('--json')) console.log(JSON.stringify(report, null, 2));
else console.log(`CQC P53 TARGETED CHECK PASSED — ${checked.length} files hashed; ${protectedFiles.length} historical rows and ${report.externalReferencesPreserved} external routes preserved. Full runtime verification: not performed.`);
