// Finite P71 extension of the published P69 runtime. This does not weaken the
// older Atlas-only gate or rewrite/download historical binary resources.
import assert from 'node:assert/strict';
import {constants} from 'node:fs';
import {open} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import path from 'node:path';
import {discoverReferences, isRuntimePath} from './sync-cqc-runtime.mjs';

export const P69_COMMIT = 'f2b7c526a3a6a763767afcd8ae91f60bc7012d7c';
export const ATLAS_PATH = 'data/cqc-p63-source-atlas.json';
const BASE_DIGEST = '1a3b0c2f19c46ee190ce79554e3e07cd3123fc157b53ba2d9f1f90edff5612b3';
export const P71_IMAGES = Object.freeze([
  'assets/p71/mgr-monsoon-head-module.png',
  'assets/p71/mgr-mistral-etranger-polearm.png',
  'assets/p71/survive-boxman-the-orange.png',
  'assets/p71/survive-bat-gold.png',
  'assets/p71/survive-survival-machete-gold.png',
]);
export const P71_MODULE_FILES = Object.freeze([
  'modules/classified-archives-p71.html',
  'src/cqc-p71-access.js',
  'src/cqc-p71-archives.js',
  'src/cqc-p71-archives.css',
  'data/cqc-p71-access-dossiers.json',
]);
export const P71_CHANGED_OWNERS = Object.freeze([
  ATLAS_PATH, 'modules/atelier-v056.html', 'modules/source-atlas-v063.html',
]);
const inserted = [...P71_IMAGES, ...P71_MODULE_FILES];
const changed = new Set([...P71_CHANGED_OWNERS, ...inserted]);
const digest = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');
const edgeKey = row => row.from + '\0' + row.to;
const ensure = (ok, message) => { if (!ok) throw Error(message); };
const sortedEdges = rows => [...new Map(rows.map(row => [edgeKey(row), row])).values()]
  .sort((a, b) => `${a.from}:${a.to}`.localeCompare(`${b.from}:${b.to}`, 'en'));

export function verifyP71RuntimeExtension(base, current) {
  ensure(digest(base) === BASE_DIGEST, 'P71 requires the pinned P69 runtime baseline');
  for (const key of new Set([...Object.keys(base), ...Object.keys(current)])) {
    if (!['files', 'references', 'totalBytes'].includes(key)) {
      assert.deepEqual(current[key], base[key], 'Historical runtime field changed: ' + key);
    }
  }
  const baseRows = new Map(base.files.map(row => [row.path, row]));
  const rows = new Map(current.files.map(row => [row.path, row]));
  ensure(rows.size === current.files.length && rows.size === baseRows.size + inserted.length,
    'P71 runtime files are missing, duplicated or unexpected');
  const allowed = new Set([...baseRows.keys(), ...inserted]);
  for (const row of current.files) {
    ensure(allowed.has(row.path) && Number.isSafeInteger(row.bytes) && row.bytes > 0 && /^[a-f0-9]{64}$/.test(row.sha256),
      'Invalid or unreviewed runtime file: ' + row.path);
  }
  for (const row of base.files) {
    ensure(rows.has(row.path), 'Historical runtime file removed: ' + row.path);
    if (!P71_CHANGED_OWNERS.includes(row.path)) assert.deepEqual(rows.get(row.path), row, 'Historical runtime file changed: ' + row.path);
  }
  ensure(current.totalBytes === current.files.reduce((sum, row) => sum + row.bytes, 0) && Number.isSafeInteger(current.totalBytes),
    'Invalid runtime byte total');
  const baseEdges = new Set(base.references.map(edgeKey)), edges = new Set(), graph = new Map();
  for (const edge of current.references) {
    ensure(Object.keys(edge).sort().join(',') === 'from,to' && rows.has(edge.from) && rows.has(edge.to), 'Reference lacks a runtime endpoint');
    ensure(!edges.has(edgeKey(edge)), 'Duplicate runtime reference');
    if (!baseEdges.has(edgeKey(edge))) ensure(changed.has(edge.from), 'Unreviewed owner acquired a new runtime reference');
    edges.add(edgeKey(edge));
    if (!graph.has(edge.from)) graph.set(edge.from, []);
    graph.get(edge.from).push(edge.to);
  }
  for (const edge of base.references) ensure(edges.has(edgeKey(edge)), 'Historical reference removed: ' + edge.from + ' -> ' + edge.to);
  for (const name of P71_IMAGES) ensure(edges.has(edgeKey({from: ATLAS_PATH, to: name})), 'PNG is not linked by the Atlas: ' + name);
  for (const owner of P71_CHANGED_OWNERS.filter(name => name.endsWith('.html'))) {
    ensure(edges.has(edgeKey({from: owner, to: 'modules/classified-archives-p71.html'})), 'Missing Archives entry from ' + owner);
  }
  const reached = new Set([current.entry]), queue = [current.entry];
  for (const from of queue) for (const to of graph.get(from) || []) if (!reached.has(to)) { reached.add(to); queue.push(to); }
  ensure(reached.size === rows.size, 'Runtime contains unreachable resources');
  return {
    baselineCommit: P69_COMMIT, baselineFiles: base.files.length, unchangedRows: base.files.length - P71_CHANGED_OWNERS.length,
    changedOwners: [...P71_CHANGED_OWNERS], addedFiles: inserted.length, files: rows.size,
    preservedReferences: base.references.length, addedReferences: edges.size - baseEdges.size, references: edges.size,
    reachable: reached.size, omittedReferences: current.omittedReferences.length,
    externalRoutes: current.externalReferences.entries.length, externalPolicySha256: digest(current.externalReferences),
    totalBytes: current.totalBytes,
  };
}

// Returns a proposal; only the caller writes it after inspecting/verifying it.
export async function extendP71RuntimeManifest(base, runtimeRoot) {
  ensure(digest(base) === BASE_DIGEST, 'P71 requires the pinned P69 runtime baseline');
  const next = structuredClone(base), rows = new Map(base.files.map(row => [row.path, row]));
  const policyOwners = new Set(base.externalReferences.entries.map(row => row.from));
  const available = new Set([...rows.keys(), ...inserted]);
  const sources = new Map();
  for (const name of changed) {
    ensure(isRuntimePath(name) && path.posix.normalize(name) === name && !policyOwners.has(name), 'Invalid changed path: ' + name);
    ensure(rows.has(name) === P71_CHANGED_OWNERS.includes(name), 'P71 insertion/update scope mismatch: ' + name);
    const file = await open(path.join(runtimeRoot, name), constants.O_RDONLY | constants.O_NOFOLLOW | constants.O_NOATIME);
    let bytes;
    try { ensure((await file.stat()).isFile(), 'Not a regular runtime file: ' + name); bytes = await file.readFile(); }
    finally { await file.close(); }
    rows.set(name, {path: name, bytes: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex')});
    if (/\.(html|js|css|json)$/.test(name)) sources.set(name, bytes.toString('utf8'));
  }
  next.references = base.references.filter(row => !changed.has(row.from));
  next.omittedReferences = base.omittedReferences.filter(row => !changed.has(row.from));
  for (const [from, source] of sources) {
    const found = discoverReferences(source, from, available);
    const unresolved = found.omittedReferences.filter(isRuntimePath);
    ensure(unresolved.length === 0, 'Unresolved runtime references from ' + from + ': ' + unresolved.join(', '));
    next.references.push(...found.references.map(to => ({from, to})));
    next.omittedReferences.push(...found.omittedReferences.map(to => ({from, to})));
  }
  next.references = sortedEdges(next.references);
  next.omittedReferences = sortedEdges(next.omittedReferences);
  next.files = [...rows.values()].sort((a, b) => a.path.localeCompare(b.path, 'en'));
  next.totalBytes = next.files.reduce((sum, row) => sum + row.bytes, 0);
  verifyP71RuntimeExtension(base, next);
  return next;
}
