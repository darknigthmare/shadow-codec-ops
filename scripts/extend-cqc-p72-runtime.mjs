// Finite P72 source-only extension of the exact published P71 ledger.
// Proposes data only: this module never writes a runtime file.
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {extendP63RuntimeManifest} from './extend-cqc-p63-runtime.mjs';

export const P71_COMMIT = 'b9051108080855cfcad8a322d34dbfb66e8c131e';
export const ATLAS_PATH = 'data/cqc-p63-source-atlas.json';
export const P71_RUNTIME_JSON_SHA256 = 'd61b97e19ea0776a58a6b726a1ce44c065c6e23037121118bf9b92c3a27cd364';
export const P72_IMAGES = Object.freeze([
  'assets/p72/acid-patrol-bot.png',
  'assets/p72/acid-surveillance-camera.png',
  'assets/p72/survive-large-spiked-barricade.png',
  'assets/p72/survive-beta-medical-workbench.png',
  'assets/p72/survive-beta-weapons-workbench.png',
  'assets/p72/mgr-vr-dlc-yellow-platform-course.png',
  'assets/p72/mgr-vr-dlc-camera-room.png',
  'assets/p72/mgr-pincer-blades-inventory.png',
  'assets/p72/mpop-kgb-soldier.png',
  'assets/p72/mpop-gru-soldier.png',
  'assets/p72/mpop-seal-soldier.png',
]);
export const P72_CHANGED_OWNERS = Object.freeze([ATLAS_PATH]);
const digest = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');
const ensure = (ok, message) => { if (!ok) throw Error(message); };
const edgeKey = row => row.from + '\0' + row.to;

function verifyBaseline(base) {
  ensure(digest(base) === P71_RUNTIME_JSON_SHA256, 'P72 requires the pinned P71 runtime baseline');
  ensure(base.files.length === 3113 && base.references.length === 5055 &&
    base.omittedReferences.length === 740 && base.externalReferences.entries.length === 499,
  'Unexpected P71 runtime counts');
}

export function verifyP72RuntimeExtension(base, current) {
  verifyBaseline(base);
  for (const key of new Set([...Object.keys(base), ...Object.keys(current)])) {
    if (!['files', 'references', 'totalBytes'].includes(key)) {
      assert.deepEqual(current[key], base[key], 'Historical runtime field changed: ' + key);
    }
  }
  const original = new Map(base.files.map(row => [row.path, row]));
  const rows = new Map(current.files.map(row => [row.path, row]));
  ensure(rows.size === current.files.length && rows.size === original.size + P72_IMAGES.length,
    'P72 files are duplicated, missing or outside the reviewed batch');
  const allowed = new Set([...original.keys(), ...P72_IMAGES]);
  for (const row of current.files) {
    ensure(allowed.has(row.path) && Number.isSafeInteger(row.bytes) && row.bytes > 0 &&
      /^[a-f0-9]{64}$/.test(row.sha256), 'Invalid or unreviewed runtime row: ' + row.path);
  }
  for (const row of base.files) {
    ensure(rows.has(row.path), 'Historical runtime file removed: ' + row.path);
    if (row.path !== ATLAS_PATH) assert.deepEqual(rows.get(row.path), row,
      'Historical runtime row changed: ' + row.path);
  }
  for (const name of P72_IMAGES) ensure(!original.has(name) && rows.has(name),
    'P72 image is missing or reuses a historical path: ' + name);
  ensure(Number.isSafeInteger(current.totalBytes) &&
    current.totalBytes === current.files.reduce((sum, row) => sum + row.bytes, 0),
  'Invalid P72 runtime byte total');

  const before = new Set(base.references.map(edgeKey));
  const expected = new Set(P72_IMAGES.map(to => edgeKey({from: ATLAS_PATH, to})));
  const edges = new Set(), graph = new Map();
  for (const edge of current.references) {
    ensure(Object.keys(edge).sort().join(',') === 'from,to' && rows.has(edge.from) && rows.has(edge.to),
      'Invalid runtime reference endpoints');
    const key = edgeKey(edge);
    ensure(!edges.has(key), 'Duplicate runtime reference');
    if (!before.has(key)) ensure(expected.delete(key),
      'Unreviewed new runtime edge: ' + edge.from + ' -> ' + edge.to);
    edges.add(key);
    if (!graph.has(edge.from)) graph.set(edge.from, []);
    graph.get(edge.from).push(edge.to);
  }
  for (const key of before) ensure(edges.has(key), 'Historical runtime reference removed');
  ensure(expected.size === 0 && edges.size === before.size + P72_IMAGES.length,
    'A selected P72 source lacks its sole Atlas edge');
  const reached = new Set([current.entry]), queue = [current.entry];
  for (const from of queue) for (const to of graph.get(from) || []) {
    if (!reached.has(to)) { reached.add(to); queue.push(to); }
  }
  ensure(reached.size === rows.size, 'Runtime contains unreachable resources');
  return {
    baselineCommit: P71_COMMIT, baselineFiles: 3113, unchangedRows: 3112,
    changedOwners: [...P72_CHANGED_OWNERS], addedFiles: P72_IMAGES.length, files: rows.size,
    preservedReferences: 5055, addedReferences: edges.size - before.size, references: edges.size,
    reachable: reached.size, omittedReferences: current.omittedReferences.length,
    externalRoutes: current.externalReferences.entries.length,
    omittedReferencesSha256: digest(current.omittedReferences),
    externalPolicySha256: digest(current.externalReferences),
    totalBytes: current.totalBytes, byteDelta: current.totalBytes - base.totalBytes,
  };
}

// Reuses the scanner-backed Atlas extension without weakening its historical
// contract. The P72 wrapper admits exactly one existing owner and eleven PNGs.
export async function extendP72RuntimeManifest(base, runtimeRoot) {
  verifyBaseline(base);
  const proposal = await extendP63RuntimeManifest(base, runtimeRoot, [ATLAS_PATH, ...P72_IMAGES]);
  verifyP72RuntimeExtension(base, proposal);
  return proposal;
}
