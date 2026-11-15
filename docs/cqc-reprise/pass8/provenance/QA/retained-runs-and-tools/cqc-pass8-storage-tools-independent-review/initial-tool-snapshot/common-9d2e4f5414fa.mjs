import path from 'node:path';
import { createHash, randomUUID } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { lstat, readdir, readFile, mkdir, writeFile, link, rename, unlink, stat } from 'node:fs/promises';

export const digest = (bytes) => createHash('sha256').update(bytes).digest('hex');
export const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

export function safeRelative(value) {
  if (typeof value !== 'string' || !value || value.includes('\\') || value.includes('\0')
    || path.posix.isAbsolute(value) || path.posix.normalize(value) !== value
    || value.split('/').some((part) => !part || part === '.' || part === '..')) {
    throw new Error(`Unsafe relative path: ${JSON.stringify(value)}`);
  }
  return value;
}

export async function requireDirectory(root) {
  const info = await lstat(root);
  if (!info.isDirectory() || info.isSymbolicLink()) throw new Error(`Real directory required: ${root}`);
}

export async function regularPath(root, relative) {
  safeRelative(relative);
  await requireDirectory(root);
  const parts = relative.split('/');
  let current = root;
  for (let i = 0; i < parts.length; i++) {
    current = path.join(current, parts[i]);
    const info = await lstat(current);
    if (info.isSymbolicLink() || (i === parts.length - 1 ? !info.isFile() : !info.isDirectory())) {
      throw new Error(`Nonregular source path: ${current}`);
    }
  }
  return current;
}

export async function fingerprint(file) {
  const before = await lstat(file);
  if (!before.isFile() || before.isSymbolicLink()) throw new Error(`Regular file required: ${file}`);
  const hash = createHash('sha256');
  for await (const chunk of createReadStream(file)) hash.update(chunk);
  const after = await lstat(file);
  if (!after.isFile() || before.dev !== after.dev || before.ino !== after.ino
    || before.size !== after.size || before.mtimeMs !== after.mtimeMs) {
    throw new Error(`Source changed during hashing: ${file}`);
  }
  return { bytes: after.size, sha256: hash.digest('hex'), dev: after.dev, ino: after.ino };
}

export async function inventory(root) {
  try { await requireDirectory(root); }
  catch (error) { if (error.code === 'ENOENT') return null; throw error; }
  const rows = [];
  async function walk(prefix = '') {
    const entries = await readdir(path.join(root, prefix), { withFileTypes: true });
    for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name, 'en'))) {
      const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
      safeRelative(relative);
      if (entry.isSymbolicLink()) throw new Error(`Symbolic link in tree: ${relative}`);
      if (entry.isDirectory()) await walk(relative);
      else if (entry.isFile()) rows.push({ path: relative, ...await fingerprint(path.join(root, relative)) });
      else throw new Error(`Nonregular tree entry: ${relative}`);
    }
  }
  await walk();
  return rows;
}

export function byteInventory(rows) {
  return rows?.map(({ path: file, bytes, sha256 }) => ({ path: file, bytes, sha256 })) ?? null;
}

export function sameInventory(a, b) {
  return JSON.stringify(byteInventory(a)) === JSON.stringify(byteInventory(b));
}

export function freezePins(value, sourceRoot) {
  if (value?.schema !== 'cqc.pass8.immutable-png-pins/1' || value.confirmedByRoot !== true
    || value.sourceState !== 'frozen' || path.resolve(value.sourceRoot ?? '') !== path.resolve(sourceRoot)
    || !Array.isArray(value.files)) throw new Error('Explicit root-confirmed frozen PNG pins required.');
  const pins = new Map();
  for (const row of value.files) {
    safeRelative(row.path);
    if (path.extname(row.path).toLowerCase() !== '.png' || row.immutable !== true
      || !/^[0-9a-f]{64}$/.test(row.sha256 ?? '') || !Number.isSafeInteger(row.bytes) || row.bytes < 8
      || pins.has(row.path)) throw new Error(`Invalid or duplicate frozen PNG pin: ${row.path}`);
    pins.set(row.path, row);
  }
  return pins;
}

export async function assertFrozenPng(sourceRoot, relative, pin, expected, targetDirectory) {
  const source = await regularPath(sourceRoot, relative);
  const current = await fingerprint(source);
  if (current.bytes !== pin.bytes || current.sha256 !== pin.sha256
    || current.bytes !== expected.bytes || current.sha256 !== expected.sha256) {
    throw new Error(`Frozen PNG byte pin mismatch: ${relative}`);
  }
  const header = (await readFile(source)).subarray(0, 8);
  if (!header.equals(pngSignature)) throw new Error(`Frozen PNG signature mismatch: ${relative}`);
  if ((await stat(targetDirectory)).dev !== current.dev) throw new Error(`Cross-device PNG hardlink forbidden: ${relative}`);
  return { source, current };
}

export async function stageFile({ sourceRoot, relative, targetRoot, expected, pin, bytes }) {
  const target = path.join(targetRoot, safeRelative(relative));
  await mkdir(path.dirname(target), { recursive: true });
  let mode = 'independent-copy';
  if (pin) {
    const { source, current } = await assertFrozenPng(sourceRoot, relative, pin, expected, path.dirname(target));
    await link(source, target);
    const linked = await fingerprint(target);
    if (linked.dev !== current.dev || linked.ino !== current.ino) throw new Error(`Hardlink inode mismatch: ${relative}`);
    mode = 'immutable-png-hardlink';
  } else {
    const source = await regularPath(sourceRoot, relative);
    const current = await fingerprint(source);
    const sourceDigest = expected.sourceSha256 ?? expected.sha256;
    if (current.sha256 !== sourceDigest) throw new Error(`Source snapshot changed: ${relative}`);
    const payload = bytes ?? await readFile(source);
    if (payload.length !== expected.bytes || digest(payload) !== expected.sha256) throw new Error(`Copy bytes differ from supplied graph: ${relative}`);
    await writeFile(target, payload, { flag: 'wx' });
    const copied = await fingerprint(target);
    if (copied.dev === current.dev && copied.ino === current.ino) throw new Error(`Mutable copy unexpectedly aliases source: ${relative}`);
  }
  const result = await fingerprint(target);
  if (result.sha256 !== expected.sha256 || result.bytes !== expected.bytes) throw new Error(`Staged integrity failure: ${relative}`);
  return { path: relative, ...result, mode };
}

export async function verifyPins(sourceRoot, pins) {
  for (const [relative, pin] of pins) {
    const file = await regularPath(sourceRoot, relative);
    const row = await fingerprint(file);
    if (row.sha256 !== pin.sha256 || row.bytes !== pin.bytes) throw new Error(`Frozen source changed: ${relative}`);
  }
}

export async function writeExclusiveJson(file, value) {
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, JSON.stringify(value, null, 2) + '\n', { flag: 'wx' });
}

export async function promotePreserving({ stage, destination, before, backupRoot, journal, afterBackup }) {
  const current = await inventory(destination);
  if (!sameInventory(before, current)) throw new Error('Destination changed since reviewed snapshot.');
  await mkdir(backupRoot, { recursive: true });
  const backup = before === null ? null : path.join(backupRoot, `${path.basename(destination)}-${randomUUID()}`);
  await writeExclusiveJson(journal, { schema: 'cqc.pass8.storage-promotion-journal/1', stage, destination, backup, before: byteInventory(before), status: 'prepared' });
  let moved = false;
  try {
    if (backup) { await rename(destination, backup); moved = true; }
    if (afterBackup) await afterBackup(); // Injectable fixture fault, never supplied by production CLI.
    await rename(stage, destination);
  } catch (error) {
    if (moved) {
      try { await lstat(destination); throw new Error('Refusing rollback over an unexpected destination.'); }
      catch (probe) { if (probe.code !== 'ENOENT') throw probe; }
      await rename(backup, destination);
    }
    throw error;
  }
  if (backup && !sameInventory(before, await inventory(backup))) throw new Error('Preserved destination backup changed.');
  return { backup, journal, status: 'promoted-old-directory-preserved' };
}

export function parseArgs(argv) {
  const result = {};
  for (let i = 0; i < argv.length; i++) {
    const item = argv[i];
    if (!item.startsWith('--')) throw new Error(`Unexpected argument: ${item}`);
    if (['--execute', '--skip-typecheck'].includes(item)) result[item.slice(2)] = true;
    else {
      const next = argv[++i];
      if (!next || next.startsWith('--')) throw new Error(`Value missing: ${item}`);
      result[item.slice(2)] = next;
    }
  }
  return result;
}
