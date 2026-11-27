import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {open} from 'node:fs/promises';
import {constants} from 'node:fs';
import path from 'node:path';
import {extendP63RuntimeManifest} from './extend-cqc-p63-runtime.mjs';

export const P66_COMMIT = '5d7c6c5187f3906ad1ead53706e83674750f1c34';
export const MUTABLE_ATLAS_OWNERS = Object.freeze(['data/cqc-p63-source-atlas.json', 'src/cqc-p63-source-atlas.js', 'modules/source-atlas-v063.html']);
export const ATLAS_PATH = 'data/cqc-p63-source-atlas.json';
const P66_RUNTIME_DIGEST = '0bede9668cb44f0983f5d8dc18c3b08c4903ac8b357ba81b65e15793324bb1fc';
const P66_ATLAS_DIGEST = 'bd7473589d62905cad95df53eb6cea7ab76ff01a575bb219530f99448bc811e5';
const digest = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');
const edgeKey = row => row.from + '\0' + row.to;
const ensure = (condition, message) => { if (!condition) throw Error(message); };

// P67 adds explicit edition support to the existing Atlas controller and filter
// markup. Only these three owners plus new PNGs may change; the route, host shell,
// style, fighters, stages and combat bindings remain outside this patch.
export function validateP67AtlasExtension(baseCatalog, catalog) {
  ensure(digest(baseCatalog) === P66_ATLAS_DIGEST, 'Atlas baseline is not the pinned P66 catalogue');
  ensure(catalog?.schema === baseCatalog.schema && Array.isArray(catalog.assets), 'Invalid P67 atlas schema');
  assert.deepEqual(catalog.assets.slice(0, baseCatalog.assets.length), baseCatalog.assets,
    'The 48 P63–P66 atlas entries must remain unchanged and in order');
  const added = catalog.assets.slice(baseCatalog.assets.length);
  ensure(added.length > 0, 'P67 has no additional atlas sources');
  const ids = new Set(baseCatalog.assets.map(row => row.id));
  const paths = new Set(baseCatalog.assets.map(row => row.path));
  for (const row of added) {
    ensure(/^[a-z0-9][a-z0-9_-]{0,119}$/.test(row.id || '') && !ids.has(row.id), 'Duplicate or invalid P67 atlas ID');
    ensure(/^\.\.\/assets\/p67\/[a-z0-9][a-z0-9_-]*\.png$/.test(row.path || '') && !paths.has(row.path), 'Invalid P67 atlas image path');
    ensure(row.selected === true && row.sourceGenerated === true && row.atlasIntegrated === true, row.id + ': source is not selected for the atlas');
    for (const flag of ['runtimeIntegrated', 'combatReady', 'combatRuntimeIntegrated', 'absolute1to1Certified']) {
      ensure(row[flag] === false, row.id + ': ' + flag + ' must remain false');
    }
    ids.add(row.id); paths.add(row.path);
  }
  return added;
}

export function verifyP67RuntimeExtension(base, current, newPaths) {
  ensure(digest(base) === P66_RUNTIME_DIGEST, 'Runtime baseline is not the pinned P66 manifest');
  ensure(new Set(newPaths).size === newPaths.length && newPaths.length > 0 &&
    newPaths.every(name => /^assets\/p67\/[a-z0-9][a-z0-9_-]*\.png$/.test(name)), 'Invalid new runtime PNG paths');
  for (const key of new Set([...Object.keys(base), ...Object.keys(current)])) {
    if (!['files', 'references', 'totalBytes'].includes(key)) assert.deepEqual(current[key], base[key], 'Historical runtime field changed: ' + key);
  }
  const rows = new Map(current.files.map(row => [row.path, row]));
  ensure(rows.size === current.files.length && rows.size === base.files.length + newPaths.length, 'Runtime rows are missing, duplicated or unexpected');
  for (const row of base.files) {
    ensure(rows.has(row.path), 'Historical runtime row removed: ' + row.path);
    if (!MUTABLE_ATLAS_OWNERS.includes(row.path)) assert.deepEqual(rows.get(row.path), row, 'Historical runtime row changed: ' + row.path);
  }
  const allowed = new Set([...base.files.map(row => row.path), ...newPaths]);
  for (const row of current.files) {
    ensure(allowed.has(row.path), 'Unexpected runtime row: ' + row.path);
    ensure(Number.isSafeInteger(row.bytes) && row.bytes >= 0 && /^[a-f0-9]{64}$/.test(row.sha256), 'Invalid runtime metadata: ' + row.path);
  }
  ensure(current.totalBytes === current.files.reduce((sum,row) => sum + row.bytes, 0) && Number.isSafeInteger(current.totalBytes), 'Runtime byte total mismatch');
  const edges = new Set(), graph = new Map();
  for (const edge of current.references) {
    ensure(rows.has(edge.from) && rows.has(edge.to), 'Runtime reference has a missing endpoint');
    ensure(!edges.has(edgeKey(edge)), 'Duplicate runtime reference');
    edges.add(edgeKey(edge));
    if (!graph.has(edge.from)) graph.set(edge.from, []);
    graph.get(edge.from).push(edge.to);
  }
  for (const edge of base.references) ensure(edges.has(edgeKey(edge)), 'Historical runtime reference removed: ' + edge.from + ' -> ' + edge.to);
  const expectedNewEdges = new Set(newPaths.map(to => edgeKey({from:ATLAS_PATH,to})));
  const baseEdges = new Set(base.references.map(edgeKey));
  for (const edge of current.references) if (!baseEdges.has(edgeKey(edge))) ensure(expectedNewEdges.delete(edgeKey(edge)), 'Unexpected new runtime reference');
  ensure(expectedNewEdges.size === 0, 'New PNG is not referenced by the atlas catalogue');
  const reachable = new Set([current.entry]), queue = [current.entry];
  for (const from of queue) for (const to of graph.get(from) || []) if (!reachable.has(to)) { reachable.add(to); queue.push(to); }
  ensure(reachable.size === rows.size, 'Runtime graph contains an unreachable file');
  return {baselineFiles:base.files.length, unchangedRows:base.files.length - MUTABLE_ATLAS_OWNERS.length,
    changedOwners:[...MUTABLE_ATLAS_OWNERS], preservedReferences:base.references.length,
    addedFiles:newPaths.length, addedReferences:current.references.length - base.references.length,
    files:rows.size, references:edges.size, reachable:reachable.size,
    totalBytes:current.totalBytes, addedBytes:current.totalBytes - base.totalBytes,
    omittedReferences:base.omittedReferences.length, externalRoutes:base.externalReferences.entries.length,
    externalPolicySha256:digest(base.externalReferences)};
}

// Returns a proposal. The caller explicitly decides where to write it.
// The inherited helper reads only the changed Atlas owners/new PNGs with no-atime
// and uses the project's real discoverReferences scanner.
export async function extendP67RuntimeManifest(base, runtimeRoot, baseCatalog) {
  ensure(digest(base) === P66_RUNTIME_DIGEST, 'Runtime baseline is not the pinned P66 manifest');
  const file = await open(path.join(runtimeRoot, ATLAS_PATH), constants.O_RDONLY | constants.O_NOFOLLOW | constants.O_NOATIME);
  let catalog;
  try {
    ensure((await file.stat()).isFile(), 'Atlas catalogue must be a regular file');
    catalog = JSON.parse(await file.readFile('utf8'));
  } finally { await file.close(); }
  const added = validateP67AtlasExtension(baseCatalog, catalog);
  const newPaths = added.map(row => row.path.slice(3));
  const proposed = await extendP63RuntimeManifest(base, runtimeRoot, [...MUTABLE_ATLAS_OWNERS, ...newPaths]);
  verifyP67RuntimeExtension(base, proposed, newPaths);
  return proposed;
}
