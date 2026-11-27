import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {open} from 'node:fs/promises';
import {constants} from 'node:fs';
import path from 'node:path';
import {extendP63RuntimeManifest} from './extend-cqc-p63-runtime.mjs';

export const P64_COMMIT = '3ab150e29deae21ee9f4451a08826b138669ec68';
export const ATLAS_PATH = 'data/cqc-p63-source-atlas.json';
const P64_RUNTIME_DIGEST = '376951a75fac20292ffbdd9b30137ee06e74465d860fb25449b9cfc2dd53773c';
const P64_ATLAS_DIGEST = '93b6c04c47244b57afe247a6e15baadc37d175b314c4cdb08fb0065a8bf9ac2c';
const digest = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');
const edgeKey = row => row.from + '\0' + row.to;
const ensure = (condition, message) => { if (!condition) throw Error(message); };

// P65 keeps the existing route and controller. Only its catalogue and new PNGs
// enter this runtime patch. No fighter, stage, binding or immutable route changes.
export function validateP65AtlasExtension(baseCatalog, catalog) {
  ensure(digest(baseCatalog) === P64_ATLAS_DIGEST, 'Atlas baseline is not the pinned P64 catalogue');
  ensure(catalog?.schema === baseCatalog.schema && Array.isArray(catalog.assets), 'Invalid P65 atlas schema');
  assert.deepEqual(catalog.assets.slice(0, baseCatalog.assets.length), baseCatalog.assets,
    'The 28 P63/P64 atlas entries must remain unchanged and in order');
  const added = catalog.assets.slice(baseCatalog.assets.length);
  ensure(added.length > 0, 'P65 has no additional atlas sources');
  const ids = new Set(baseCatalog.assets.map(row => row.id));
  const paths = new Set(baseCatalog.assets.map(row => row.path));
  for (const row of added) {
    ensure(/^[a-z0-9][a-z0-9_-]{0,119}$/.test(row.id || '') && !ids.has(row.id), 'Duplicate or invalid P65 atlas ID');
    ensure(/^\.\.\/assets\/p65\/[a-z0-9][a-z0-9_-]*\.png$/.test(row.path || '') && !paths.has(row.path), 'Invalid P65 atlas image path');
    ensure(row.selected === true && row.sourceGenerated === true && row.atlasIntegrated === true, row.id + ': source is not selected for the atlas');
    for (const flag of ['combatReady', 'combatRuntimeIntegrated', 'absolute1to1Certified']) {
      ensure(row[flag] === false, row.id + ': ' + flag + ' must remain false');
    }
    ids.add(row.id); paths.add(row.path);
  }
  return added;
}

export function verifyP65RuntimeExtension(base, current, newPaths) {
  ensure(digest(base) === P64_RUNTIME_DIGEST, 'Runtime baseline is not the pinned P64 manifest');
  ensure(new Set(newPaths).size === newPaths.length && newPaths.length > 0 &&
    newPaths.every(name => /^assets\/p65\/[a-z0-9][a-z0-9_-]*\.png$/.test(name)), 'Invalid new runtime PNG paths');
  for (const key of new Set([...Object.keys(base), ...Object.keys(current)])) {
    if (!['files', 'references', 'totalBytes'].includes(key)) assert.deepEqual(current[key], base[key], 'Historical runtime field changed: ' + key);
  }
  const rows = new Map(current.files.map(row => [row.path, row]));
  ensure(rows.size === current.files.length && rows.size === base.files.length + newPaths.length, 'Runtime rows are missing, duplicated or unexpected');
  for (const row of base.files) {
    ensure(rows.has(row.path), 'Historical runtime row removed: ' + row.path);
    if (row.path !== ATLAS_PATH) assert.deepEqual(rows.get(row.path), row, 'Historical runtime row changed: ' + row.path);
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
  return {baselineFiles:base.files.length, unchangedRows:base.files.length - 1,
    changedOwners:[ATLAS_PATH], preservedReferences:base.references.length,
    addedFiles:newPaths.length, addedReferences:current.references.length - base.references.length,
    files:rows.size, references:edges.size, reachable:reachable.size,
    omittedReferences:base.omittedReferences.length, externalRoutes:base.externalReferences.entries.length,
    externalPolicySha256:digest(base.externalReferences)};
}

// Returns a proposal. The caller explicitly decides where to write it.
// The inherited helper reads only the changed catalogue/new PNGs with no-atime
// and uses the project's real discoverReferences scanner.
export async function extendP65RuntimeManifest(base, runtimeRoot, baseCatalog) {
  ensure(digest(base) === P64_RUNTIME_DIGEST, 'Runtime baseline is not the pinned P64 manifest');
  const file = await open(path.join(runtimeRoot, ATLAS_PATH), constants.O_RDONLY | constants.O_NOFOLLOW | constants.O_NOATIME);
  let catalog;
  try {
    ensure((await file.stat()).isFile(), 'Atlas catalogue must be a regular file');
    catalog = JSON.parse(await file.readFile('utf8'));
  } finally { await file.close(); }
  const added = validateP65AtlasExtension(baseCatalog, catalog);
  const newPaths = added.map(row => row.path.slice(3));
  const proposed = await extendP63RuntimeManifest(base, runtimeRoot, [ATLAS_PATH, ...newPaths]);
  verifyP65RuntimeExtension(base, proposed, newPaths);
  return proposed;
}
