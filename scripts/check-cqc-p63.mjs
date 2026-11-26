// P63 source-delivery verifier. Run from the repository root:
// node scripts/check-cqc-p63.mjs [repository-root]
// Node builtins only; reads the new PNGs, four atlas files, index, and JSON metadata.
// Historical PNGs are not read. Historical manifest preservation is a separate check.
// PNG format: https://www.w3.org/TR/png/
// zlib API: https://nodejs.org/api/zlib.html
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve, posix } from 'node:path';
import { inflateSync } from 'node:zlib';

const ROOT = resolve(process.argv[2] || process.cwd());
const DELIVERY = 'docs/cqc-reprise/pass63/delivery-manifest.json';
const ATLAS = 'public/cqc/data/cqc-p63-source-atlas.json';
const BIBLE = 'docs/cqc-bible/asset-associations-p63.json';
const RUNTIME = 'public/cqc/runtime-manifest.json';
const ATLAS_RUNTIME_PATHS = [
  'modules/source-atlas-v063.html',
  'src/cqc-p63-source-atlas.js',
  'src/cqc-p63-source-atlas.css',
  'data/cqc-p63-source-atlas.json',
];
const FALSE_FLAGS = ['combatReady', 'absolute1to1Certified', 'combatRuntimeIntegrated'];
const SHA256 = /^[0-9a-f]{64}$/;
const SHA1 = /^[0-9a-f]{40}$/;
const CRC_TABLE = Array.from({ length: 256 }, (_, value) => {
  let crc = value;
  for (let bit = 0; bit < 8; bit += 1) {
    crc = (crc & 1) ? (0xedb88320 ^ (crc >>> 1)) : (crc >>> 1);
  }
  return crc >>> 0;
});

function ensure(condition, message) {
  if (!condition) throw new Error(message);
}

function object(value, label) {
  ensure(value && typeof value === 'object' && !Array.isArray(value), label + ': expected object');
  return value;
}

function array(value, label) {
  ensure(Array.isArray(value), label + ': expected array');
  return value;
}

function nonempty(value, label) {
  ensure(typeof value === 'string' && value.trim().length > 0, label + ': expected nonempty string');
  return value;
}

function integer(value, minimum, label) {
  ensure(Number.isSafeInteger(value) && value >= minimum, label + ': invalid integer');
}

function canonicalPath(value, label) {
  nonempty(value, label);
  ensure(!/[\u0000-\u001f\\]/.test(value) && !posix.isAbsolute(value),
    label + ': expected relative POSIX path');
  ensure(!value.split('/').some(part => !part || part === '.' || part === '..'),
    label + ': path must be normalized');
  return value;
}

function readBytes(path) {
  return readFileSync(resolve(ROOT, canonicalPath(path, path)));
}

function readJson(path) {
  return object(JSON.parse(readBytes(path).toString('utf8')), path);
}

function hash(algorithm, bytes) {
  return createHash(algorithm).update(bytes).digest('hex');
}

function crc32(bytes) {
  let crc = 0xffffffff;
  for (const byte of bytes) crc = CRC_TABLE[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function uniqueRows(rows, key, label) {
  const result = new Map();
  for (const row of rows) {
    object(row, label + ' row');
    const value = nonempty(row[key], label + '.' + key);
    ensure(!result.has(value), label + ': duplicate ' + key + ' ' + value);
    result.set(value, row);
  }
  return result;
}

function checkFlags(row, label, required = false) {
  for (const key of FALSE_FLAGS) {
    if (required || Object.hasOwn(row, key)) {
      ensure(row[key] === false, label + ': ' + key + ' must be false');
    }
  }
}

function checkNoPositiveClaims(value, label) {
  if (!value || typeof value !== 'object') return;
  for (const [key, child] of Object.entries(value)) {
    ensure(!FALSE_FLAGS.includes(key) || child !== true, label + '.' + key + ': unsupported claim');
    checkNoPositiveClaims(child, label + '.' + key);
  }
}

function validatePng(row) {
  const label = row.id + ' (' + row.path + ')';
  const bytes = readBytes(row.path);
  ensure(bytes.length === row.bytes, label + ': byte count mismatch');
  ensure(bytes.length >= 45 && bytes.subarray(0, 8).equals(
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])), label + ': invalid PNG signature');
  const actualSha256 = hash('sha256', bytes);
  const actualGitBlobSha = createHash('sha1')
    .update(Buffer.from('blob ' + bytes.length + '\0'))
    .update(bytes).digest('hex');
  ensure(actualSha256 === row.sha256, label + ': SHA-256 mismatch');
  ensure(actualGitBlobSha === row.gitBlobSha, label + ': Git blob SHA-1 mismatch');

  let offset = 8;
  let chunks = 0;
  let width;
  let height;
  let idatPhase = 0;
  let seenPalette = false;
  let ended = false;
  const idat = [];
  while (offset < bytes.length) {
    ensure(offset + 12 <= bytes.length, label + ': truncated chunk header');
    const size = bytes.readUInt32BE(offset);
    ensure(size <= 0x7fffffff && offset + size + 12 <= bytes.length, label + ': invalid chunk length');
    const type = bytes.toString('ascii', offset + 4, offset + 8);
    ensure(/^[A-Za-z]{4}$/.test(type) && /[A-Z]/.test(type[2]), label + ': invalid chunk type');
    // ASCII decoding masks high bits; validate the original type bytes as well.
    ensure(bytes.subarray(offset + 4, offset + 8).every(byte =>
      (byte >= 65 && byte <= 90) || (byte >= 97 && byte <= 122)), label + ': non-ASCII chunk type');
    const data = bytes.subarray(offset + 8, offset + 8 + size);
    const actualCrc = crc32(bytes.subarray(offset + 4, offset + 8 + size));
    ensure(actualCrc === bytes.readUInt32BE(offset + 8 + size), label + ': CRC mismatch in ' + type);
    ensure(chunks > 0 || type === 'IHDR', label + ': IHDR must be first');
    if (idatPhase === 1 && type !== 'IDAT') idatPhase = 2;
    if (type === 'IHDR') {
      ensure(chunks === 0 && size === 13, label + ': duplicate or malformed IHDR');
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      ensure(width > 0 && height > 0 && width <= 0x7fffffff && height <= 0x7fffffff,
        label + ': invalid dimensions');
      ensure(width === row.width && height === row.height, label + ': dimension mismatch');
      ensure(data[8] === 8 && data[9] === 2 && data[10] === 0 &&
        data[11] === 0 && data[12] === 0, label + ': expected noninterlaced RGB8 PNG');
    } else if (type === 'PLTE') {
      ensure(!seenPalette && idatPhase === 0 && size >= 3 && size <= 768 && size % 3 === 0,
        label + ': malformed or misplaced PLTE');
      seenPalette = true;
    } else if (type === 'IDAT') {
      ensure(idatPhase !== 2, label + ': IDAT chunks must be consecutive');
      idatPhase = 1;
      idat.push(data);
    } else if (type === 'IEND') {
      ensure(size === 0 && idat.length > 0, label + ': malformed IEND or missing IDAT');
      ensure(offset + 12 === bytes.length, label + ': data after IEND');
      ended = true;
    } else {
      ensure(!['acTL', 'fcTL', 'fdAT'].includes(type), label + ': expected static PNG');
      ensure(/[a-z]/.test(type[0]), label + ': unsupported critical chunk ' + type);
    }
    chunks += 1;
    offset += size + 12;
    if (ended) break;
  }
  ensure(ended && offset === bytes.length, label + ': missing IEND');
  const rowBytes = width * 3 + 1;
  const expectedInflated = rowBytes * height;
  ensure(Number.isSafeInteger(expectedInflated) && expectedInflated <= 512 * 1024 * 1024,
    label + ': invalid or excessive decoded size');
  const compressed = Buffer.concat(idat);
  ensure(compressed.length > 0, label + ': empty IDAT data');
  const inflated = inflateSync(compressed, { maxOutputLength: expectedInflated, info: true });
  ensure(inflated.buffer.length === expectedInflated, label + ': decoded scanline length mismatch');
  ensure(inflated.engine.bytesWritten === compressed.length, label + ': trailing compressed data');
  for (let y = 0; y < height; y += 1) {
    ensure(inflated.buffer[y * rowBytes] <= 4, label + ': invalid filter byte on row ' + y);
  }
  return {
    id: row.id, path: row.path, selected: row.selected, bytes: bytes.length,
    width, height, sha256: actualSha256, gitBlobSha: actualGitBlobSha,
    chunks, inflatedBytes: expectedInflated,
  };
}

function main() {
  ensure(process.argv.length <= 3, 'Usage: node scripts/check-cqc-p63.mjs [repository-root]');
  const delivery = readJson(DELIVERY);
  const atlas = readJson(ATLAS);
  const bible = readJson(BIBLE);
  const runtime = readJson(RUNTIME);
  ensure(delivery.schema === 'cqc.p63.delivery.v1', 'Delivery schema mismatch');
  ensure(atlas.schema === 'cqc.source-atlas.v1', 'Atlas schema mismatch');
  ensure(runtime.schema === 'shadow-codec-ops.cqc-runtime/1', 'Runtime schema mismatch');
  ensure(delivery.previousSelected === 177, 'Expected 177 selected sources before P63');

  const selected = array(delivery.assets, 'delivery.assets');
  const archives = array(delivery.archives, 'delivery.archives');
  ensure(selected.length > 0, 'No selected P63 sources');
  const counts = object(delivery.counts, 'delivery.counts');
  ensure(counts.selectedSources === selected.length, 'Selected source count mismatch');
  ensure(counts.archivedAttempts === archives.length, 'Archived attempt count mismatch');
  ensure(counts.totalSelected === 177 + selected.length, 'Cumulative selected count mismatch');
  const all = [...selected, ...archives];
  uniqueRows(all, 'id', 'delivery');
  uniqueRows(all, 'path', 'delivery');
  for (const [rows, selectedFlag] of [[selected, true], [archives, false]]) {
    for (const row of rows) {
      const label = 'delivery.' + row.id;
      canonicalPath(row.path, label + '.path');
      const allowed = selectedFlag
        ? /^public\/cqc\/assets\/p63\/[^/]+\.png$/
        : /^docs\/cqc-reprise\/pass63\/rejected\/[^/]+\.png$/;
      ensure(allowed.test(row.path), label + ': unexpected PNG location');
      ensure(row.selected === selectedFlag, label + ': selected flag mismatch');
      ensure(row.atlasIntegrated === selectedFlag, label + ': atlasIntegrated flag mismatch');
      checkFlags(row, label, true);
      integer(row.bytes, 1, label + '.bytes');
      integer(row.width, 1, label + '.width');
      integer(row.height, 1, label + '.height');
      ensure(typeof row.sha256 === 'string' && SHA256.test(row.sha256), label + ': invalid SHA-256');
      ensure(typeof row.gitBlobSha === 'string' && SHA1.test(row.gitBlobSha), label + ': invalid Git blob SHA-1');
    }
  }
  for (const [label, doc] of [['delivery', delivery], ['atlas', atlas], ['bible', bible]]) {
    checkNoPositiveClaims(doc, label);
  }
  const pngs = all.map(validatePng);
  const verifiedByPath = new Map(pngs.map(row => [row.path, row]));
  const selectedById = new Map(selected.map(row => [row.id, row]));

  const atlasAssets = array(atlas.assets, 'atlas.assets');
  ensure(atlasAssets.length === selected.length, 'Atlas count mismatch');
  uniqueRows(atlasAssets, 'id', 'atlas');
  uniqueRows(atlasAssets, 'path', 'atlas');
  for (const row of atlasAssets) {
    const source = selectedById.get(row.id);
    ensure(source, 'Atlas contains an unselected or unknown ID: ' + row.id);
    const expectedPath = '../assets/p63/' + posix.basename(source.path);
    ensure(row.path === expectedPath, row.id + ': atlas path mismatch');
    for (const key of ['bytes', 'width', 'height', 'sha256', 'gitBlobSha', 'assetId']) {
      if (Object.hasOwn(row, key)) ensure(row[key] === source[key], row.id + ': atlas ' + key + ' mismatch');
    }
    if (Object.hasOwn(row, 'selected')) ensure(row.selected === true, row.id + ': atlas selected flag mismatch');
    if (Object.hasOwn(row, 'atlasIntegrated')) ensure(row.atlasIntegrated === true, row.id + ': atlas integration mismatch');
    checkFlags(row, 'atlas.' + row.id);
  }

  const bibleAssets = array(bible.assets, 'bible.assets');
  ensure(bibleAssets.length === selected.length, 'Bible association count mismatch');
  uniqueRows(bibleAssets, 'id', 'bible');
  uniqueRows(bibleAssets, 'assetId', 'bible');
  const bibleCounts = object(bible.counts, 'bible.counts');
  ensure(bibleCounts.selectedSources === selected.length &&
    bibleCounts.totalSelected === 177 + selected.length, 'Bible counts mismatch');
  for (const row of bibleAssets) {
    const source = selectedById.get(row.id);
    ensure(source, 'Bible contains an unknown or archived ID: ' + row.id);
    ensure(row.assetId === (source.assetId ?? source.id), row.id + ': bible assetId mismatch');
    for (const key of ['guideSections', 'workIds']) {
      const values = array(row[key], 'bible.' + row.id + '.' + key);
      ensure(values.length > 0, 'bible.' + row.id + ': empty ' + key);
      ensure(new Set(values.map(value => JSON.stringify(value))).size === values.length,
        'bible.' + row.id + ': duplicate ' + key);
      for (const value of values) {
        ensure((typeof value === 'string' && value.trim().length > 0) ||
          (key === 'guideSections' && Number.isSafeInteger(value) && value > 0),
        'bible.' + row.id + ': invalid ' + key + ' member');
      }
    }
    if (Object.hasOwn(row, 'selected')) ensure(row.selected === true, row.id + ': bible selected flag mismatch');
    checkFlags(row, 'bible.' + row.id);
  }

  const runtimeFiles = uniqueRows(array(runtime.files, 'runtime.files'), 'path', 'runtime');
  let runtimeBytes = 0;
  const archivedHashes = new Set(archives.map(row => row.sha256));
  for (const file of runtimeFiles.values()) {
    canonicalPath(file.path, 'runtime.' + file.path);
    integer(file.bytes, 0, 'runtime.' + file.path + '.bytes');
    ensure(typeof file.sha256 === 'string' && SHA256.test(file.sha256), file.path + ': invalid runtime SHA-256');
    ensure(!archivedHashes.has(file.sha256), file.path + ': archived attempt appears in runtime');
    runtimeBytes += file.bytes;
    ensure(Number.isSafeInteger(runtimeBytes), 'Runtime byte total exceeds safe integer range');
  }
  ensure(runtime.totalBytes === runtimeBytes, 'Runtime totalBytes mismatch');
  ensure(runtime.entry === 'index.html' && runtimeFiles.has(runtime.entry), 'Runtime entry mismatch');
  const selectedRuntimePaths = selected.map(row => row.path.slice('public/cqc/'.length));
  const selectedRuntimeSet = new Set(selectedRuntimePaths);
  for (const path of runtimeFiles.keys()) {
    if (path.startsWith('assets/p63/')) ensure(selectedRuntimeSet.has(path), 'Unselected P63 runtime PNG: ' + path);
  }
  const newRuntimePaths = [...ATLAS_RUNTIME_PATHS, ...selectedRuntimePaths];
  for (const path of [runtime.entry, ...newRuntimePaths]) {
    const metadata = runtimeFiles.get(path);
    ensure(metadata, 'Missing runtime entry: ' + path);
    const repoPath = 'public/cqc/' + path;
    const verified = verifiedByPath.get(repoPath);
    const bytes = verified ? undefined : readBytes(repoPath);
    const actualBytes = verified ? verified.bytes : bytes.length;
    const actualSha256 = verified ? verified.sha256 : hash('sha256', bytes);
    ensure(metadata.bytes === actualBytes && metadata.sha256 === actualSha256,
      'Runtime metadata does not match local file: ' + path);
  }
  const graph = new Map();
  const edges = new Set();
  for (const ref of array(runtime.references, 'runtime.references')) {
    object(ref, 'runtime reference');
    canonicalPath(ref.from, 'reference.from');
    canonicalPath(ref.to, 'reference.to');
    ensure(runtimeFiles.has(ref.from) && runtimeFiles.has(ref.to),
      'Runtime reference endpoint absent from files: ' + ref.from + ' -> ' + ref.to);
    const key = ref.from + '\0' + ref.to;
    ensure(!edges.has(key), 'Duplicate runtime reference: ' + ref.from + ' -> ' + ref.to);
    edges.add(key);
    if (!graph.has(ref.from)) graph.set(ref.from, []);
    graph.get(ref.from).push(ref.to);
  }
  const reachable = new Set([runtime.entry]);
  const queue = [runtime.entry];
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    for (const target of graph.get(queue[cursor]) || []) {
      if (!reachable.has(target)) { reachable.add(target); queue.push(target); }
    }
  }
  for (const path of newRuntimePaths) ensure(reachable.has(path), 'P63 runtime file is unreachable: ' + path);

  console.log(JSON.stringify({
    schema: 'cqc.p63.local-verification.v1',
    status: 'passed',
    repositoryRoot: ROOT,
    nodeVersion: process.version,
    previousSelected: 177,
    counts: { selectedSources: selected.length, archivedAttempts: archives.length, totalSelected: 177 + selected.length },
    checks: {
      pngSignatureIhdrCrcAndHashes: true,
      noninterlacedRgb8DecodedScanlines: true,
      deliveryAtlasBibleIdsAndCounts: true,
      combatAndCertificationFlagsFalse: true,
      archivedAttemptsExcludedFromRuntime: true,
      runtimeNewFileAndIndexMetadata: true,
      runtimeNewFilesReachableFromEntry: true,
    },
    runtime: { files: runtimeFiles.size, references: edges.size, checkedLocalPaths: [runtime.entry, ...newRuntimePaths] },
    pngs,
    limits: [
      'Historical PNG files are not read; preservation of previous runtime entries requires the separate pinned-baseline comparison.',
      'Reachability is checked in runtime-manifest references; this is not browser execution or gameplay verification.',
      'PNG validation checks structure, decompression and scanline filters; it does not certify visual fidelity or combat readiness.',
    ],
  }, null, 2));
}

try {
  main();
} catch (error) {
  console.error('P63 verification failed: ' + (error instanceof Error ? error.message : String(error)));
  process.exitCode = 1;
}
