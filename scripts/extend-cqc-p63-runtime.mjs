import {open} from 'node:fs/promises';
import {constants} from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {discoverReferences, isRuntimePath} from './sync-cqc-runtime.mjs';

// Returns a proposed ledger; never writes it or reads unchanged legacy files.
export async function extendP63RuntimeManifest(base, runtimeRoot, changedPaths) {
  if (base.schema !== 'shadow-codec-ops.cqc-runtime/1' || base.entry !== 'index.html') throw Error('Unexpected runtime schema/entry');
  const next = structuredClone(base), rows = new Map(base.files.map(row => [row.path, row]));
  const changed = new Set(changedPaths), available = new Set([...rows.keys(), ...changed]);
  if (rows.size !== base.files.length || !rows.has('index.html')) throw Error('Invalid existing file table');
  const fixed = new Set(['index.html', 'modules/source-atlas-v063.html', 'src/cqc-p63-source-atlas.js', 'src/cqc-p63-source-atlas.css', 'data/cqc-p63-source-atlas.json']);
  const policyOwners = new Set((base.externalReferences?.entries || []).map(row => row.from));
  const sources = new Map();
  for (const name of changed) {
    if (typeof name !== 'string' || path.posix.normalize(name) !== name || !isRuntimePath(name) || policyOwners.has(name)) throw Error('Invalid changed path: ' + name);
    if (!fixed.has(name) && !(name.startsWith('assets/') && name.endsWith('.png') && !rows.has(name))) throw Error('Only Atlas owners and new PNGs may change: ' + name);
    const handle = await open(path.join(runtimeRoot, name), constants.O_RDONLY | constants.O_NOFOLLOW | constants.O_NOATIME);
    let bytes; try { if (!(await handle.stat()).isFile()) throw Error('Not a regular file: ' + name); bytes = await handle.readFile(); } finally { await handle.close(); }
    rows.set(name, {path:name, bytes:bytes.length, sha256:createHash('sha256').update(bytes).digest('hex')});
    if (/\.(html|js|css|json)$/.test(name)) sources.set(name, bytes.toString('utf8'));
  }
  next.references = base.references.filter(row => !changed.has(row.from));
  next.omittedReferences = base.omittedReferences.filter(row => !changed.has(row.from));
  for (const [from, source] of sources) {
    const found = discoverReferences(source, from, available);
    const unresolved = found.omittedReferences.filter(isRuntimePath);
    if (unresolved.length) throw Error('Unresolved runtime references from ' + from + ': ' + unresolved.join(', '));
    next.references.push(...found.references.map(to => ({from,to})));
    next.omittedReferences.push(...found.omittedReferences.map(to => ({from,to})));
  }
  const sortedEdges = edges => [...new Map(edges.map(row => [row.from + '\0' + row.to, row])).values()].sort((a,b) => `${a.from}:${a.to}`.localeCompare(`${b.from}:${b.to}`, 'en'));
  next.references = sortedEdges(next.references); next.omittedReferences = sortedEdges(next.omittedReferences);
  if (next.references.some(row => !available.has(row.from) || !available.has(row.to))) throw Error('Reference lacks a file row');
  const reachable = new Set([next.entry]), queue = [next.entry], outgoing = new Map();
  for (const {from,to} of next.references) { if (!outgoing.has(from)) outgoing.set(from, []); outgoing.get(from).push(to); }
  for (const from of queue) for (const to of outgoing.get(from) || []) if (!reachable.has(to)) { reachable.add(to); queue.push(to); }
  for (const name of changed) if (!reachable.has(name)) throw Error('Changed file is unreachable: ' + name);
  next.files = [...rows.values()].sort((a,b) => a.path.localeCompare(b.path, 'en'));
  next.totalBytes = next.files.reduce((sum,row) => sum + row.bytes, 0);
  if (!Number.isSafeInteger(next.totalBytes)) throw Error('Invalid byte total');
  if (JSON.stringify(base.externalReferences) !== JSON.stringify(next.externalReferences)) throw Error('Historical external policy changed');
  return next;
}
