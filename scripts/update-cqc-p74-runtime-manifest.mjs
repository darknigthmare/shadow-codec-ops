import { createHash, randomUUID } from 'node:crypto';
import { constants } from 'node:fs';
import { lstat, mkdir, open, readdir, realpath, rename, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { discoverReferences, isRuntimePath } from './sync-cqc-runtime.mjs';

export const P74_EXPECTED_ORIGINAL_PNGS = 99;
export const P74_REQUIRED_FILES = Object.freeze([
  'index.html',
  'modules/unified-versus-v055.html',
  'src/cqc-pass8-combat-engine.js',
  'src/cqc-p74-tag-team.js',
  'src/cqc-p74-team-controls.js',
  'data/cqc-p63-source-atlas.json',
  'data/veilbreak-content.json',
  'originals/veilbreak/index.html'
]);
export const P74_OPTIONAL_FILES = Object.freeze(['modules/arcade-chronicles-v055.html']);
export const P74_PREFIXES = Object.freeze(['originals/veilbreak/', 'assets/canon-pass74/']);
const TEXT_EXTENSIONS = new Set(['.html', '.js', '.css', '.json']);
const MANIFEST_NAME = 'runtime-manifest.json';
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
const encoded = value => Buffer.from(JSON.stringify(value));
const pairKey = row => row.from + '\0' + row.to;
const compare = (a, b) => a.localeCompare(b, 'en');
const within = (root, target) => target === root || target.startsWith(root + path.sep);

function assertRelative(name) {
  if (typeof name !== 'string' || !name || name.includes('\\') || name.includes('\0')
      || path.posix.isAbsolute(name) || path.posix.normalize(name) !== name
      || name.split('/').some(part => !part || part === '.' || part === '..')) {
    throw Error('Invalid relative runtime path: ' + String(name));
  }
  return name;
}

export function isP74Scope(name) {
  assertRelative(name);
  return name !== MANIFEST_NAME && isRuntimePath(name)
    && (P74_REQUIRED_FILES.includes(name) || P74_OPTIONAL_FILES.includes(name)
      || P74_PREFIXES.some(prefix => name.startsWith(prefix)));
}

async function regularPath(root, relative) {
  assertRelative(relative);
  const parts = relative.split('/');
  let current = root;
  for (let i = 0; i < parts.length; i++) {
    current = path.join(current, parts[i]);
    const stat = await lstat(current);
    if (stat.isSymbolicLink()) throw Error('Symlink in incremental runtime scope: ' + relative);
    if (i < parts.length - 1 && !stat.isDirectory()) throw Error('Non-directory runtime ancestor: ' + relative);
    if (i === parts.length - 1 && !stat.isFile()) throw Error('Regular runtime file required: ' + relative);
  }
  return current;
}

// Match the existing synchronizer's no-atime/no-follow policy; never silently fall back.
async function readRuntime(root, relative) {
  const file = await regularPath(root, relative);
  if (!Number.isInteger(constants.O_NOATIME) || !Number.isInteger(constants.O_NOFOLLOW)) {
    throw Error('Required Linux no-atime flags unavailable');
  }
  const handle = await open(file, constants.O_RDONLY | constants.O_NOATIME | constants.O_NOFOLLOW);
  try {
    if (!(await handle.stat()).isFile()) throw Error('Regular runtime file required: ' + relative);
    return await handle.readFile();
  } finally {
    await handle.close();
  }
}

function assertBaseline(manifest) {
  if (manifest?.schema !== 'shadow-codec-ops.cqc-runtime/1' || manifest.entry !== 'index.html'
      || !Array.isArray(manifest.files) || !Array.isArray(manifest.references)
      || !Array.isArray(manifest.omittedReferences)) throw Error('Invalid existing runtime manifest');
  const files = new Map();
  let total = 0;
  for (const row of manifest.files) {
    assertRelative(row?.path);
    if (!isRuntimePath(row.path) || row.path === MANIFEST_NAME || files.has(row.path)
        || !Number.isSafeInteger(row.bytes) || row.bytes < 0 || !/^[a-f0-9]{64}$/.test(row.sha256)) {
      throw Error('Invalid or duplicate historical file row: ' + row.path);
    }
    files.set(row.path, row);
    total += row.bytes;
  }
  if (!files.has(manifest.entry) || !Number.isSafeInteger(total) || total !== manifest.totalBytes) {
    throw Error('Existing runtime manifest entry or totalBytes is inconsistent');
  }
  const refs = new Set();
  for (const row of manifest.references) {
    if (!row || !files.has(row.from) || !files.has(row.to) || refs.has(pairKey(row))) {
      throw Error('Invalid or duplicate historical reference row');
    }
    refs.add(pairKey(row));
  }
  for (const row of manifest.omittedReferences) {
    if (!row || !files.has(row.from) || typeof row.to !== 'string') throw Error('Invalid historical omitted reference');
  }
  const external = manifest.externalReferences;
  if (external !== undefined && (!external || typeof external !== 'object' || !Array.isArray(external.entries))) {
    throw Error('Invalid inherited external-reference ledger');
  }
  // This is structural inheritance, not a revalidation of the historical pinned policy.
  for (const row of external?.entries || []) {
    assertRelative(row?.from);
    assertRelative(row?.to);
    if (!files.has(row.from) || files.has(row.to)) throw Error('External ledger owner/alias conflicts with local declarations');
  }
  return files;
}

function reachableFrom(entry, references) {
  const outgoing = new Map();
  for (const row of references) {
    if (!outgoing.has(row.from)) outgoing.set(row.from, []);
    outgoing.get(row.from).push(row.to);
  }
  const reached = new Set([entry]), queue = [entry];
  for (let i = 0; i < queue.length; i++) {
    for (const target of outgoing.get(queue[i]) || []) {
      if (!reached.has(target)) { reached.add(target); queue.push(target); }
    }
  }
  return reached;
}

function assertSelectedBytes(name, bytes) {
  if (!bytes.length) throw Error('Empty selected runtime file: ' + name);
  if (name.endsWith('.json')) {
    try { JSON.parse(bytes.toString('utf8')); }
    catch { throw Error('Invalid JSON in selected runtime file: ' + name); }
  }
  if (name.endsWith('.png')) {
    const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
    const end = Buffer.from([0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130]);
    if (bytes.length < 45 || !bytes.subarray(0, 8).equals(signature)
        || bytes.toString('ascii', 12, 16) !== 'IHDR'
        || !bytes.readUInt32BE(16) || !bytes.readUInt32BE(20)
        || !bytes.subarray(-12).equals(end)) {
      throw Error('Incomplete PNG header/trailer in selected runtime file: ' + name);
    }
  }
}

async function walkScope(root, prefix) {
  const result = [], directory = path.join(root, prefix);
  let stat;
  try { stat = await lstat(directory); }
  catch (error) { if (error.code === 'ENOENT') return result; throw error; }
  if (stat.isSymbolicLink() || !stat.isDirectory()) throw Error('Invalid P74 scope directory: ' + prefix);
  for (const entry of (await readdir(directory, { withFileTypes: true })).sort((a, b) => compare(a.name, b.name))) {
    const name = path.posix.join(prefix, entry.name);
    if (entry.isSymbolicLink()) throw Error('Symlink in incremental runtime scope: ' + name);
    if (entry.isDirectory()) result.push(...await walkScope(root, name));
    else if (entry.isFile() && isP74Scope(name)) result.push(name);
  }
  return result;
}

export async function collectP74Scope(runtimeRoot, { expectedOriginalPngs = P74_EXPECTED_ORIGINAL_PNGS } = {}) {
  const root = await realpath(runtimeRoot), selected = new Set();
  for (const name of P74_REQUIRED_FILES) {
    await regularPath(root, name);
    selected.add(name);
  }
  for (const name of P74_OPTIONAL_FILES) {
    try { await regularPath(root, name); selected.add(name); }
    catch (error) { if (error.code !== 'ENOENT') throw error; }
  }
  for (const prefix of P74_PREFIXES) {
    for (const name of await walkScope(root, prefix.replace(/\/$/, ''))) selected.add(name);
  }
  const originalPngs = [...selected].filter(name => name.startsWith('originals/veilbreak/') && name.endsWith('.png'));
  if (!Number.isSafeInteger(expectedOriginalPngs) || expectedOriginalPngs < 0 || originalPngs.length !== expectedOriginalPngs) {
    throw Error('P74 original PNG count differs: expected ' + expectedOriginalPngs + ', found ' + originalPngs.length);
  }
  return [...selected].sort(compare);
}

export async function prepareP74Update({ runtimeRoot, selectedPaths, expectedOriginalPngs = P74_EXPECTED_ORIGINAL_PNGS } = {}) {
  const root = await realpath(runtimeRoot);
  const originalBytes = await readRuntime(root, MANIFEST_NAME);
  const original = JSON.parse(originalBytes.toString('utf8'));
  const historical = assertBaseline(original);
  const selected = selectedPaths === undefined
    ? await collectP74Scope(root, { expectedOriginalPngs })
    : [...new Set(selectedPaths)].sort(compare);
  if (!selected.length) throw Error('No P74 files selected');
  for (const name of selected) if (!isP74Scope(name)) throw Error('File is outside incremental P74 scope: ' + name);
  const externalRows = original.externalReferences?.entries || [];
  const protectedNames = new Set(externalRows.flatMap(row => [row.from, row.to]));
  for (const name of selected) {
    if (protectedNames.has(name)) throw Error('Protected external owner or alias cannot be refreshed incrementally: ' + name);
  }

  const available = new Set([...historical.keys(), ...selected]);
  const refresh = new Map(), textOwners = new Set(), newReferences = [], newOmissions = [];
  const snapshots = [], newFiles = [], changedFiles = [], unchangedSelectedFiles = [];
  for (const name of selected) {
    const bytes = await readRuntime(root, name);
    assertSelectedBytes(name, bytes);
    const digest = sha256(bytes), previous = historical.get(name);
    if (previous && (previous.sourceSha256 || previous.transformation)
        && (previous.sha256 !== digest || previous.bytes !== bytes.length)) {
      throw Error('Transformed historical file requires its original full-sync workflow: ' + name);
    }
    const entry = { ...(previous || { path: name }), bytes: bytes.length, sha256: digest };
    refresh.set(name, entry);
    snapshots.push({ path: name, bytes: bytes.length, sha256: digest });
    if (!previous) newFiles.push(name);
    else if (previous.sha256 !== digest || previous.bytes !== bytes.length) changedFiles.push(name);
    else unchangedSelectedFiles.push(name);
    if (!TEXT_EXTENSIONS.has(path.posix.extname(name))) continue;
    textOwners.add(name);
    const discovered = discoverReferences(bytes.toString('utf8'), name, available);
    for (const to of discovered.references) newReferences.push({ from: name, to });
    for (const to of discovered.omittedReferences) {
      if (isRuntimePath(to)) throw Error('Unresolved affected runtime reference: ' + name + ' -> ' + to);
      newOmissions.push({ from: name, to });
    }
  }

  const next = structuredClone(original);
  // Historical declarations absent from the sparse checkout are never read, removed or rewritten.
  next.files = original.files.map(row => refresh.get(row.path) || structuredClone(row));
  for (const name of newFiles) next.files.push(refresh.get(name));
  const sortRefs = rows => rows.sort((a, b) => compare(a.from + ':' + a.to, b.from + ':' + b.to));
  next.references = [
    ...original.references.filter(row => !textOwners.has(row.from)).map(row => structuredClone(row)),
    ...sortRefs(newReferences)
  ];
  next.omittedReferences = [
    ...original.omittedReferences.filter(row => !textOwners.has(row.from)).map(row => structuredClone(row)),
    ...sortRefs(newOmissions)
  ];
  next.totalBytes = next.files.reduce((sum, row) => sum + row.bytes, 0);
  assertBaseline(next);
  if (JSON.stringify(next.externalReferences) !== JSON.stringify(original.externalReferences)) {
    throw Error('External-reference ledger must remain unchanged');
  }
  const beforeReachable = reachableFrom(original.entry, original.references);
  const afterReachable = reachableFrom(next.entry, next.references);
  const lost = [...beforeReachable].filter(name => !afterReachable.has(name));
  if (lost.length) throw Error('Affected references disconnect historical runtime files: ' + lost.slice(0, 12).join(', '));
  const unreachable = selected.filter(name => !afterReachable.has(name));
  if (unreachable.length) throw Error('Selected P74 files are not reachable from index.html: ' + unreachable.slice(0, 12).join(', '));
  const selectedSet = new Set(selected);
  const untouched = original.files.filter(row => !selectedSet.has(row.path));
  const inheritedTargets = [...new Set(newReferences.map(row => row.to).filter(name => !selectedSet.has(name)))].sort(compare);
  const pngs = selected.filter(name => name.endsWith('.png'));
  const policyDigest = original.externalReferences === undefined ? null : sha256(encoded(original.externalReferences));
  const preparedBytes = Buffer.from(JSON.stringify(next, null, 2) + '\n');
  const report = {
    schema: 'cqc.p74.incremental-runtime-report.v1',
    result: 'selected_scope_prepared',
    scope: 'P74 selected files and affected reference graph only; historical declarations retained',
    fullRuntimeValidated: false,
    fullRuntimeFileAuditPerformed: false,
    gameplayValidationPerformed: false,
    externalPolicyRevalidated: false,
    externalPolicyPreserved: true,
    externalPolicySHA256: policyDigest,
    externalRouteCountPreserved: externalRows.length,
    manifestWritten: false,
    selectedFilesVerified: selected.length,
    selectedPaths: selected,
    newFiles,
    changedFiles,
    unchangedSelectedFiles,
    historicalFilesNotRead: untouched.length,
    historicalBytesNotRead: untouched.reduce((sum, row) => sum + row.bytes, 0),
    inheritedReferenceTargetsNotRead: inheritedTargets,
    inheritedReferenceTargetCount: inheritedTargets.length,
    affectedTextOwners: [...textOwners],
    affectedReferenceCount: newReferences.length,
    affectedNonRuntimeOmissionCount: newOmissions.length,
    allSelectedFilesReachable: true,
    historicalReachabilityPreserved: true,
    previousDeclaredReachableFiles: beforeReachable.size,
    declaredReachableFiles: afterReachable.size,
    pngHeaderTrailerChecks: pngs.length,
    pngPixelDecodePerformed: false,
    fileCountBefore: original.files.length,
    fileCountAfter: next.files.length,
    totalBytesBefore: original.totalBytes,
    totalBytesAfter: next.totalBytes,
    byteDelta: next.totalBytes - original.totalBytes,
    discoveryFunction: 'scripts/sync-cqc-runtime.mjs#discoverReferences',
    meaning: 'Checksums cover selected files on disk. Historical hashes and external routes are inherited unchanged, not re-certified. No full-runtime acceptance is claimed.'
  };
  return {
    runtimeRoot: root,
    baselineManifestSHA256: sha256(originalBytes),
    preparedManifestSHA256: sha256(preparedBytes),
    manifest: next,
    snapshots,
    report
  };
}

export async function applyP74Update(plan) {
  if (!plan || plan.report?.fullRuntimeValidated !== false || !plan.runtimeRoot) throw Error('A scoped prepared update is required');
  const root = await realpath(plan.runtimeRoot);
  const candidate = Buffer.from(JSON.stringify(plan.manifest, null, 2) + '\n');
  if (sha256(candidate) !== plan.preparedManifestSHA256) throw Error('Prepared manifest was modified after validation');
  const lockName = MANIFEST_NAME + '.p74.lock', tempName = MANIFEST_NAME + '.p74-' + randomUUID() + '.tmp';
  const lockPath = path.join(root, lockName), tempPath = path.join(root, tempName);
  let lock, tempCreated = false;
  try {
    lock = await open(lockPath, 'wx', 0o600);
    if (sha256(await readRuntime(root, MANIFEST_NAME)) !== plan.baselineManifestSHA256) {
      throw Error('Runtime manifest changed after preparation; prepare again');
    }
    for (const snapshot of plan.snapshots) {
      const current = await readRuntime(root, snapshot.path);
      if (current.length !== snapshot.bytes || sha256(current) !== snapshot.sha256) {
        throw Error('Selected runtime file changed after preparation: ' + snapshot.path);
      }
    }
    await writeFile(tempPath, candidate, { flag: 'wx', mode: 0o644 });
    tempCreated = true;
    if (sha256(await readRuntime(root, tempName)) !== plan.preparedManifestSHA256) throw Error('Temporary manifest write differs');
    await rename(tempPath, path.join(root, MANIFEST_NAME));
    tempCreated = false;
    return { ...plan.report, result: 'selected_scope_written', manifestWritten: true };
  } finally {
    if (tempCreated) await unlink(tempPath).catch(() => {});
    if (lock) { await lock.close(); await unlink(lockPath); }
  }
}

async function canonicalOutputPath(destination) {
  let probe = path.resolve(destination);
  const tail = [];
  for (;;) {
    try { return path.join(await realpath(probe), ...tail.reverse()); }
    catch (error) {
      if (error.code !== 'ENOENT') throw error;
      const parent = path.dirname(probe);
      if (parent === probe) throw error;
      tail.push(path.basename(probe));
      probe = parent;
    }
  }
}

export async function runCLI(args = process.argv.slice(2)) {
  const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  let runtimeRoot = path.join(repositoryRoot, 'public/cqc'), reportPath = null, write = false, expectedOriginalPngs = P74_EXPECTED_ORIGINAL_PNGS;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--root' && args[i + 1]) runtimeRoot = path.resolve(args[++i]);
    else if (args[i] === '--report' && args[i + 1]) reportPath = path.resolve(args[++i]);
    else if (args[i] === '--expected-original-pngs' && args[i + 1]) expectedOriginalPngs = Number(args[++i]);
    else if (args[i] === '--write') write = true;
    else throw Error('Unknown or incomplete argument: ' + args[i]);
  }
  const resolvedRoot = await realpath(runtimeRoot);
  if (reportPath) reportPath = await canonicalOutputPath(reportPath);
  if (reportPath && within(resolvedRoot, reportPath)) throw Error('Report must be outside the runtime directory');
  const plan = await prepareP74Update({ runtimeRoot: resolvedRoot, expectedOriginalPngs });
  const report = write ? await applyP74Update(plan) : plan.report;
  if (reportPath) {
    await mkdir(path.dirname(reportPath), { recursive: true });
    await writeFile(reportPath, JSON.stringify(report, null, 2) + '\n');
  }
  process.stdout.write(JSON.stringify(report, null, 2) + '\n');
  return report;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  runCLI().catch(error => { console.error(error.message); process.exitCode = 1; });
}
