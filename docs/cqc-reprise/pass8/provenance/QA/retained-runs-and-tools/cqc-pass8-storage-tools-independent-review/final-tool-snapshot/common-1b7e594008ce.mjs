import path from 'node:path';
import { createHash, randomUUID } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { lstat, readdir, readFile, mkdir, writeFile, link, rename, stat } from 'node:fs/promises';

export const digest = (bytes) => createHash('sha256').update(bytes).digest('hex');
export const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

export function rasterFormat(relative) {
  const extension = path.extname(relative).toLowerCase();
  if (extension === '.png') return 'png';
  if (extension === '.webp') return 'webp';
  throw new Error(`Unsupported immutable raster format: ${relative}`);
}

export function assertRasterSignature(bytes, format, relative) {
  if (format === 'png') {
    if (!bytes.subarray(0, 8).equals(pngSignature)) throw new Error(`Frozen PNG signature mismatch: ${relative}`);
    return;
  }
  if (format !== 'webp' || bytes.length < 20 || bytes.toString('ascii', 0, 4) !== 'RIFF'
    || bytes.toString('ascii', 8, 12) !== 'WEBP' || bytes.readUInt32LE(4) + 8 !== bytes.length) {
    throw new Error(`Frozen WebP RIFF signature/length mismatch: ${relative}`);
  }
  const first = bytes.toString('ascii', 12, 16), size = bytes.readUInt32LE(16);
  if (!['VP8 ', 'VP8L', 'VP8X'].includes(first) || !size || (first === 'VP8X' && size !== 10)
    || (first === 'VP8 ' && size < 10) || (first === 'VP8L' && size < 5)) {
    throw new Error(`Frozen WebP image chunk mismatch: ${relative}`);
  }
  let offset = 12;
  while (offset < bytes.length) {
    if (offset + 8 > bytes.length) throw new Error(`Frozen WebP truncated chunk header: ${relative}`);
    const length = bytes.readUInt32LE(offset + 4);
    offset += 8 + length + (length % 2);
    if (offset > bytes.length) throw new Error(`Frozen WebP chunk exceeds container: ${relative}`);
  }
}

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

export async function inventory(root, { exclude = () => false } = {}) {
  try { await requireDirectory(root); }
  catch (error) { if (error.code === 'ENOENT') return null; throw error; }
  const rows = [];
  async function walk(prefix = '') {
    const entries = await readdir(path.join(root, prefix), { withFileTypes: true });
    for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name, 'en'))) {
      const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
      safeRelative(relative);
      if (exclude(relative, entry)) continue;
      if (entry.isSymbolicLink()) throw new Error(`Symbolic link in tree: ${relative}`);
      if (entry.isDirectory()) await walk(relative);
      else if (entry.isFile()) rows.push({ path: relative, ...await fingerprint(path.join(root, relative)) });
      else throw new Error(`Nonregular tree entry: ${relative}`);
    }
  }
  await walk();
  return rows;
}

export function overlaps(a, b) {
  a = path.resolve(a); b = path.resolve(b);
  return a === b || a.startsWith(b + path.sep) || b.startsWith(a + path.sep);
}

export async function assertRealAncestors(value) {
  const absolute = path.resolve(value);
  let current = path.parse(absolute).root;
  for (const part of absolute.slice(current.length).split(path.sep).filter(Boolean)) {
    current = path.join(current, part);
    try {
      const info = await lstat(current);
      if (info.isSymbolicLink() || !info.isDirectory()) throw new Error(`Non-directory or symbolic-link operation ancestor: ${current}`);
    } catch (error) { if (error.code !== 'ENOENT') throw error; }
  }
}

export async function guardOperationRoots({ sourceRoots, destination, stage, backupRoot, evidenceRoot }) {
  for (const extra of [backupRoot, evidenceRoot]) {
    if (!extra) throw new Error('Explicit backup and evidence directories required.');
    if ([...sourceRoots, destination, stage].some((protectedRoot) => overlaps(extra, protectedRoot))) {
      throw new Error('Backup/evidence directories must be disjoint from sources, destination and staging.');
    }
  }
  if (overlaps(backupRoot, evidenceRoot)) throw new Error('Backup and evidence directories must be disjoint.');
  for (const item of [...sourceRoots, destination, stage, backupRoot, evidenceRoot]) await assertRealAncestors(item);
}

export function byteInventory(rows) {
  return rows?.map(({ path: file, bytes, sha256 }) => ({ path: file, bytes, sha256 })).sort((a, b) => a.path.localeCompare(b.path, 'en')) ?? null;
}

export function sameInventory(a, b) {
  return JSON.stringify(byteInventory(a)) === JSON.stringify(byteInventory(b));
}

export function freezePins(value, sourceRoot) {
  const legacy = value?.schema === 'cqc.pass8.immutable-png-pins/1';
  const rasterV2 = value?.schema === 'cqc.pass8.immutable-raster-pins/2';
  if ((!legacy && !rasterV2) || value.confirmedByRoot !== true
    || value.sourceState !== 'frozen' || path.resolve(value.sourceRoot ?? '') !== path.resolve(sourceRoot)
    || !Array.isArray(value.files)) throw new Error('Explicit root-confirmed frozen PNG/1 or raster/2 pins required.');
  const pins = new Map();
  for (const row of value.files) {
    safeRelative(row.path);
    const format = rasterFormat(row.path);
    if ((legacy && format !== 'png') || (rasterV2 && row.format !== format) || row.immutable !== true
      || !/^[0-9a-f]{64}$/.test(row.sha256 ?? '') || !Number.isSafeInteger(row.bytes) || row.bytes < 8
      || (format === 'webp' && row.bytes < 20) || pins.has(row.path)) throw new Error(`Invalid or duplicate frozen raster pin: ${row.path}`);
    pins.set(row.path, row);
  }
  return pins;
}

export async function assertFrozenRaster(sourceRoot, relative, pin, expected, targetDirectory) {
  const format = rasterFormat(relative);
  if (pin.immutable !== true || pin.path !== relative || (pin.format && pin.format !== format)) throw new Error(`Explicit matching immutable raster pin required: ${relative}`);
  const source = await regularPath(sourceRoot, relative);
  const current = await fingerprint(source);
  if (current.bytes !== pin.bytes || current.sha256 !== pin.sha256
    || current.bytes !== expected.bytes || current.sha256 !== expected.sha256) {
    throw new Error(`Frozen raster byte pin mismatch: ${relative}`);
  }
  assertRasterSignature(await readFile(source), format, relative);
  if ((await stat(targetDirectory)).dev !== current.dev) throw new Error(`Cross-device raster hardlink forbidden: ${relative}`);
  return { source, current };
}

// Retain the old PNG-only helper API without accepting WebP through that name.
export async function assertFrozenPng(...args) {
  if (rasterFormat(args[1]) !== 'png') throw new Error('PNG helper accepts only PNG files.');
  return assertFrozenRaster(...args);
}

export async function stageFile({ sourceRoot, relative, targetRoot, expected, pin, bytes }) {
  const target = path.join(targetRoot, safeRelative(relative));
  await mkdir(path.dirname(target), { recursive: true });
  let mode = 'independent-copy';
  if (pin) {
    const { source, current } = await assertFrozenRaster(sourceRoot, relative, pin, expected, path.dirname(target));
    await link(source, target);
    const linked = await fingerprint(target);
    if (linked.dev !== current.dev || linked.ino !== current.ino) throw new Error(`Hardlink inode mismatch: ${relative}`);
    mode = `immutable-${rasterFormat(relative)}-hardlink`;
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
    assertRasterSignature(await readFile(file), rasterFormat(relative), relative);
  }
}

export async function writeExclusiveJson(file, value) {
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, JSON.stringify(value, null, 2) + '\n', { flag: 'wx' });
}

export async function promotePreserving({ stage, destination, before, backupRoot, journal, afterBackup, validate }) {
  if (overlaps(stage, destination) || overlaps(backupRoot, stage) || overlaps(backupRoot, destination)
    || overlaps(path.dirname(journal), stage) || overlaps(path.dirname(journal), destination)) throw new Error('Unsafe promotion path overlap.');
  for (const item of [stage, destination, backupRoot, path.dirname(journal)]) await assertRealAncestors(item);
  const current = await inventory(destination);
  if (!sameInventory(before, current)) throw new Error('Destination changed since reviewed snapshot.');
  await mkdir(backupRoot, { recursive: true });
  const backup = before === null ? null : path.join(backupRoot, `${path.basename(destination)}-${randomUUID()}`);
  await writeExclusiveJson(journal, { schema: 'cqc.pass8.storage-promotion-journal/1', stage, destination, backup, before: byteInventory(before), status: 'prepared' });
  let moved = false, activated = false, rejected = null;
  try {
    if (backup) { await rename(destination, backup); moved = true; }
    if (afterBackup) await afterBackup(); // Injectable fixture fault, never supplied by production CLI.
    await rename(stage, destination);
    activated = true;
    if (validate) await validate(destination);
    if (backup && !sameInventory(before, await inventory(backup))) throw new Error('Preserved destination backup changed.');
  } catch (error) {
    if (activated) {
      rejected = path.join(backupRoot, `${path.basename(destination)}-rejected-${randomUUID()}`);
      await rename(destination, rejected); // Preserve rejected new output; never erase it.
    }
    if (moved) {
      try { await lstat(destination); throw new Error('Refusing rollback over an unexpected destination.'); }
      catch (probe) { if (probe.code !== 'ENOENT') throw probe; }
      await rename(backup, destination);
    }
    error.promotion = { status: 'rolled-back', journal, rejected, originalDestinationRestored: moved, originalDestinationWasAbsent: before === null, unactivatedStage: activated ? null : stage };
    await writeExclusiveJson(`${journal}.failure.json`, { ...error.promotion, error: error.message });
    throw error;
  }
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
