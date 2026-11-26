// Incremental verification of P66 against the pinned P65 commit.
// node scripts/check-cqc-p66.mjs [repository-root] [--baseline-only] [--baseline-dir directory] [--git-repository directory]
// Reads new PNGs and metadata; never downloads historical PNGs.
import assert from 'node:assert/strict';
import {existsSync, openSync, readSync, closeSync, fstatSync, constants, readdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {resolve, posix} from 'node:path';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';
import {verifyStaticPng} from './check-cqc-p64.mjs';
import {P65_COMMIT, ATLAS_PATH, validateP66AtlasExtension, verifyP66RuntimeExtension, extendP66RuntimeManifest} from './extend-cqc-p66-runtime.mjs';

const ensure = (value, message) => { if (!value) throw Error(message); };
const hash = (algorithm, bytes) => createHash(algorithm).update(bytes).digest('hex');
const jsonDigest = value => hash('sha256', JSON.stringify(value));
const FALSE_FLAGS = ['runtimeIntegrated', 'combatReady', 'combatRuntimeIntegrated', 'absolute1to1Certified'];
const HISTORICAL_REGISTRIES = ['docs/cqc-bible/asset-associations.json', 'docs/cqc-bible/asset-associations-p63.json', 'docs/cqc-bible/asset-associations-p64.json', 'docs/cqc-bible/asset-associations-p65.json'];
const DELIVERY = 'docs/cqc-reprise/pass66/delivery-manifest.json';
const BIBLE = 'docs/cqc-bible/asset-associations-p66.json';
function canonicalPath(name) {
  ensure(typeof name === 'string' && name && !/[\x00-\x1f\\]/.test(name) && !posix.isAbsolute(name) &&
    !name.split('/').some(p => !p || p === '.' || p === '..'), 'Invalid relative path: ' + name);
  return name;
}
function readBytes(root, name) {
  const fd = openSync(resolve(root, canonicalPath(name)), constants.O_RDONLY | constants.O_NOFOLLOW | constants.O_NOATIME);
  try {
    const stat = fstatSync(fd); ensure(stat.isFile(), 'Not a regular file: ' + name);
    const bytes = Buffer.alloc(stat.size); let offset = 0;
    while (offset < bytes.length) { const n = readSync(fd, bytes, offset, bytes.length - offset, null); ensure(n > 0, 'Short read: ' + name); offset += n; }
    return bytes;
  } finally { closeSync(fd); }
}
const readJson = (root, name) => JSON.parse(readBytes(root, name));
const PINNED_FILES = Object.freeze({
  'public/cqc/runtime-manifest.json': '6cefa867a5b4b0d1ff669cfab5bc57ab8edffa98',
  'public/cqc/data/cqc-p63-source-atlas.json': 'e75b37b92b4362bb78b2702f1df56ec43a8b481f',
  'docs/cqc-bible/asset-associations.json': 'fdde971b01abbaba3675442ce90b4433287ab1fc',
  'docs/cqc-bible/asset-associations-p63.json': 'ce28b6a4f30fd16f55b520b3b4478d30d0d8bc8e',
  'docs/cqc-bible/asset-associations-p64.json': 'b17679835b1236ecaa299c8b42eadbc07f59f0b1',
  'docs/cqc-bible/asset-associations-p65.json': 'b8d8c504f8b07c61c0abf11663a0ed17b94fc13d'
});
const gitBlobHash = bytes => createHash('sha1').update('blob ' + bytes.length + '\0').update(bytes).digest('hex');
// Optional external snapshots must match the exact pinned Git blob identities.
// The companion Git repository supplies the real tree only, never an invented index.
// GIT_NO_LAZY_FETCH prevents implicit downloads from a partial clone.
function pinnedJson(root, name, options = {}) {
  canonicalPath(name);
  const bytes = options.baselineRoot ? readBytes(options.baselineRoot, name) :
    execFileSync('git', ['show', P65_COMMIT + ':' + name], {
      cwd: options.gitRepository || root, maxBuffer: 4 * 1024 * 1024,
      env: {...process.env, GIT_NO_LAZY_FETCH: '1'}
    });
  ensure(PINNED_FILES[name] && gitBlobHash(bytes) === PINNED_FILES[name], 'Pinned baseline bytes differ: ' + name);
  return JSON.parse(bytes);
}
function unique(rows, key, label) {
  ensure(Array.isArray(rows), label + ': expected array');
  const result = new Map();
  for (const row of rows) {
    ensure(row && typeof row[key] === 'string' && row[key] && !result.has(row[key]), label + ': missing or duplicate ' + key);
    result.set(row[key], row);
  }
  return result;
}
function rejectPositiveClaims(value) {
  if (!value || typeof value !== 'object') return;
  for (const [key, child] of Object.entries(value)) {
    ensure(!FALSE_FLAGS.includes(key) || child !== true, 'Unsupported claim: ' + key);
    rejectPositiveClaims(child);
  }
}
export function verifyHistoricalSources(root, options = {}) {
  const rows = [], registries = [];
  for (const name of HISTORICAL_REGISTRIES) {
    const base = pinnedJson(root,name,options), current = readJson(root,name);
    ensure(gitBlobHash(readBytes(root,name)) === PINNED_FILES[name], 'Historical registry bytes changed: ' + name);
    assert.deepEqual(current,base,'Historical source registry changed: ' + name);
    ensure(current.assets.every(row => row.selected === true), 'Historical registry selection changed');
    rows.push(...current.assets); registries.push({path:name,entries:current.assets.length,sha256:hash('sha256',readBytes(root,name))});
  }
  ensure(rows.length === 211, 'Expected 211 historical selected sources');
  unique(rows,'assetId','historical sources'); unique(rows,'path','historical sources');
  const treeText = execFileSync('git', ['ls-tree', '-rz', P65_COMMIT, '--', ...rows.map(row => row.path)], {
    cwd: options.gitRepository || root, encoding: 'utf8', maxBuffer: 1024 * 1024,
    env: {...process.env, GIT_NO_LAZY_FETCH: '1'}
  });
  const tree = new Map(treeText.split('\0').filter(Boolean).map(line => {
    const [metadata,name] = line.split('\t'); return [name,metadata.split(' ')];
  }));
  ensure(tree.size === rows.length, 'Pinned Git tree lacks a historical source');
  let localFilesHashed = 0;
  for (const row of rows) {
    ensure(tree.get(row.path)?.[1] === 'blob' && tree.get(row.path)?.[2] === row.gitBlobSha, 'Historical tree PNG identity changed: ' + row.path);
    if (existsSync(resolve(root,row.path))) {
      const bytes = readBytes(root,row.path);
      ensure(bytes.length === row.bytes && hash('sha256',bytes) === row.sha256, 'Historical local PNG changed: ' + row.path);
      localFilesHashed++;
    }
  }
  const byKind = {}; for (const row of rows) byKind[row.kind] = (byKind[row.kind] || 0) + 1;
  return {entries:rows.length,registries,pinnedGitTreeBlobIdentities:rows.length,localFilesHashed,metadataDigest:jsonDigest(rows),byKind,assetIds:rows.map(row=>row.assetId),sourceSha256:rows.map(row=>row.sha256)};
}

export async function verifyP66(root, {baselineOnly = false, ...options} = {}) {
  const historical = verifyHistoricalSources(root,options);
  if (baselineOnly) return {schema:'cqc.p66.baseline-verification.v1',status:'passed',checkedAt:new Date().toISOString(),nodeVersion:process.version,baseCommit:P65_COMMIT,historical,limits:['Absent historical PNGs are verified by unchanged registry and pinned Git-tree blob identity; they are not downloaded.']};
  const delivery = readJson(root,DELIVERY), bible = readJson(root,BIBLE), atlas = readJson(root,'public/cqc/' + ATLAS_PATH);
  const baseAtlas = pinnedJson(root,'public/cqc/' + ATLAS_PATH,options), baseRuntime = pinnedJson(root,'public/cqc/runtime-manifest.json',options);
  const runtime = readJson(root,'public/cqc/runtime-manifest.json');
  ensure(delivery.schema === 'cqc.p66.delivery.v1' && delivery.previousSelected === 211 && delivery.parentCommit === P65_COMMIT, 'Invalid P66 delivery baseline/schema');
  const selected = delivery.assets, archives = delivery.archives, blocked = delivery.blockedRequests;
  ensure(selected.length === 14 && archives.length === 3, 'P66 requires the complete reviewed batch: 14 selected PNGs and 3 archived attempts');
  unique([...selected,...archives,...blocked],'id','delivery'); unique([...selected,...archives],'path','delivery');
  unique([...selected,...archives],'sha256','generated outputs');
  unique(selected,'assetId','selected sources');
  ensure(selected.length > 0 && delivery.counts.selectedSources === selected.length && delivery.counts.archivedAttempts === archives.length && delivery.counts.totalSelected === 211 + selected.length && delivery.counts.generatedPNGs === selected.length + archives.length, 'P66 delivery counts mismatch');
  ensure(delivery.counts.blockedRequests === blocked.length && delivery.counts.generationRequests === selected.length + archives.length + blocked.reduce((sum,row)=>sum+row.attempts,0), 'P66 generation request counts mismatch');
  for (const row of blocked) {
    ensure(/^[a-z0-9][a-z0-9_-]{0,119}$/.test(row.id) && row.status === 'blocked_by_image_tool' && row.hasOutputFile === false && row.selected === false && row.atlasIntegrated === false && row.retried === false && row.attempts === 1, row.id + ': invalid blocked request record');
    for (const key of ['path','bytes','sha256','gitBlobSha']) ensure(!Object.hasOwn(row,key), row.id + ': blocked request must not claim a file');
  }
  const byKind = {}, byEpisode = {}, allPassesByKind = {...historical.byKind};
  for (const row of selected) { byKind[row.kind] = (byKind[row.kind] || 0) + 1; byEpisode[row.episodeKey] = (byEpisode[row.episodeKey] || 0) + 1; allPassesByKind[row.kind] = (allPassesByKind[row.kind] || 0) + 1; }
  for (const [key,value] of Object.entries({byKind,byEpisode,allPassesByKind})) assert.deepEqual(delivery.counts[key],value,'P66 count breakdown mismatch: ' + key);
  ensure(delivery.counts.selectedBytes === selected.reduce((sum,row)=>sum+row.bytes,0) && delivery.counts.archivedBytes === archives.reduce((sum,row)=>sum+row.bytes,0),'P66 image byte totals mismatch');
  const historicalIds = new Set(historical.assetIds), historicalHashes = new Set(historical.sourceSha256);
  for (const [records, selectedFlag] of [[selected,true],[archives,false]]) for (const row of records) {
    const pattern = selectedFlag ? /^public\/cqc\/assets\/p66\/[a-z0-9][a-z0-9_-]*\.png$/ : /^docs\/cqc-reprise\/pass66\/rejected\/[a-z0-9][a-z0-9_-]*\.png$/;
    ensure(pattern.test(canonicalPath(row.path)) && row.selected === selectedFlag && row.atlasIntegrated === selectedFlag && row.sourceGenerated === true, row.id + ': selection/path mismatch');
    for (const key of FALSE_FLAGS) ensure(row[key] === false, row.id + ': ' + key + ' must remain false');
    for (const key of ['bytes','width','height']) ensure(Number.isSafeInteger(row[key]) && row[key] > 0, row.id + ': invalid ' + key);
    ensure(/^[a-f0-9]{64}$/.test(row.sha256) && /^[a-f0-9]{40}$/.test(row.gitBlobSha), row.id + ': invalid PNG hash');
    if (selectedFlag) ensure(row.sourceGenerated === true && !historicalIds.has(row.assetId) && !historicalHashes.has(row.sha256), row.id + ': invalid or reused source identity/content');
  }
  for (const document of [delivery,atlas,bible]) rejectPositiveClaims(document);
  const pngs = [...selected,...archives].map(row => verifyStaticPng(readBytes(root,row.path),row));
  const added = validateP66AtlasExtension(baseAtlas,atlas), selectedById = unique(selected,'id','selected');
  ensure(added.length === selected.length, 'P66 atlas count mismatch');
  const baseRuntimeRows = new Map(baseRuntime.files.map(row=>[row.path,row]));
  for (const name of ['index.html','modules/source-atlas-v063.html','src/cqc-p63-source-atlas.js','src/cqc-p63-source-atlas.css']) {
    const bytes = readBytes(root,'public/cqc/' + name), metadata = baseRuntimeRows.get(name);
    ensure(metadata && bytes.length === metadata.bytes && hash('sha256',bytes) === metadata.sha256,'P66 must preserve the existing Atlas shell/controller/style: ' + name);
  }
  const context = {module:{exports:{}}, URL, URLSearchParams};
  vm.runInNewContext(readBytes(root,'public/cqc/src/cqc-p63-source-atlas.js').toString('utf8'),context,{filename:'cqc-p63-source-atlas.js'});
  const api = context.module.exports, normalized = api.normalizeCatalog(atlas);
  ensure(normalized.length === 34 + selected.length, 'P66 sources failed runtime catalogue normalization');
  for (const row of added) {
    const source = selectedById.get(row.id); ensure(source,'Unknown P66 atlas source: ' + row.id);
    ensure(row.path === '../' + source.path.slice('public/cqc/'.length), row.id + ': atlas path mismatch');
    for (const key of ['assetId','label','episode','episodeKey','bytes','width','height','sha256','gitBlobSha','kind','workIds','referenceURLs','qaNotes','scope','bibleURL']) assert.deepEqual(row[key],source[key],row.id + ': atlas ' + key + ' mismatch');
    ensure(Array.isArray(row.referenceURLs) && row.referenceURLs.length > 0 && row.referenceURLs.every(url => api.referenceURL(url)),row.id + ': invalid references');
    ensure(Array.isArray(row.qaNotes) && row.qaNotes.length > 0 && row.fidelityStatus === 'pending_external_review',row.id + ': missing fidelity reservations');
  }
  ensure(bible.schema === 'cqc.bible.asset-associations-p66.v1' && bible.counts.selectedSources === selected.length && bible.counts.totalSelected === 211 + selected.length, 'P66 bible counts/schema mismatch');
  assert.deepEqual(bible.counts,delivery.counts,'Bible and delivery counts differ');
  assert.deepEqual(bible.archives,archives,'Bible and delivery archives differ');
  assert.deepEqual(bible.blockedRequests,blocked,'Bible and delivery blocked requests differ');
  const bibleRows = unique(bible.assets,'id','bible'); ensure(bibleRows.size === selected.length,'P66 bible count mismatch');
  for (const source of selected) {
    const row = bibleRows.get(source.id); ensure(row,source.id + ': missing bible association');
    for (const key of ['assetId','label','episode','episodeKey','path','bytes','width','height','sha256','gitBlobSha','kind','workIds','referenceURLs','qaNotes','scope','guideSections','bibleURL']) assert.deepEqual(row[key],source[key],source.id + ': bible ' + key + ' mismatch');
    ensure(Array.isArray(row.guideSections) && row.guideSections.length > 0 && Array.isArray(row.workIds) && row.workIds.length > 0,source.id + ': missing bible links');
    ensure(row.runtimeIntegrated === false && row.runtimeBinding?.status === 'atlas_only' && row.runtimeBinding?.admittedByThisPass === false,source.id + ': invalid combat binding claim');
  }
  const published = readdirSync(resolve(root,'public/cqc/assets/p66')).filter(name=>name.endsWith('.png')).sort();
  assert.deepEqual(published,selected.map(row=>posix.basename(row.path)).sort(),'Unlisted PNG in published P66 folder');
  const newPaths = selected.map(row=>row.path.slice('public/cqc/'.length));
  const runtimeProof = verifyP66RuntimeExtension(baseRuntime,runtime,newPaths);
  const proposed = await extendP66RuntimeManifest(baseRuntime,resolve(root,'public/cqc'),baseAtlas);
  assert.deepEqual(runtime,proposed,'Committed runtime differs from scanner-backed P66 proposal');
  const archiveHashes = new Set(archives.map(row=>row.sha256));
  ensure(runtime.files.every(row=>!archiveHashes.has(row.sha256)),'Archived attempt appears in the runtime');
  return {schema:'cqc.p66.local-verification.v1',status:'passed',checkedAt:new Date().toISOString(),nodeVersion:process.version,baseCommit:P65_COMMIT,
    counts:{selectedSources:selected.length,archivedAttempts:archives.length,generatedPNGs:selected.length+archives.length,blockedRequests:blocked.length,generationRequests:delivery.counts.generationRequests,totalSelected:211+selected.length,atlasSources:atlas.assets.length},historical,
    checks:{historical211EntriesUnchanged:true,old34AtlasEntriesUnchanged:true,atlasShellControllerAndStyleBytesUnchanged:true,pngStructureCrcHashesAndDecompression:true,runtimeCatalogNormalization:true,deliveryAtlasBibleBijections:true,combatAndCertificationFlagsFalse:true,archivesExcluded:true,blockedRequestsHaveNoFiles:true,realScannerMatchesManifest:true},
    runtime:runtimeProof,pngs,limits:['Historical PNGs absent from the sparse checkout are verified by unchanged registry and pinned Git-tree identity; they are not downloaded.','PNG verification establishes file integrity and transparency, not visual 1:1 fidelity.','Runtime reachability is a static graph check, not gameplay or browser execution.']};
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const args = process.argv.slice(2), options = {}, roots = [];
    while (args.length) {
      const arg = args.shift();
      if (arg === '--baseline-only') options.baselineOnly = true;
      else if (arg === '--baseline-dir' || arg === '--git-repository') {
        const value = args.shift(); ensure(value && !value.startsWith('--'), 'Missing option path: ' + arg);
        options[arg === '--baseline-dir' ? 'baselineRoot' : 'gitRepository'] = resolve(value);
      } else { ensure(!arg.startsWith('--'), 'Unknown option: ' + arg); roots.push(arg); }
    }
    ensure(roots.length <= 1, 'Usage: node scripts/check-cqc-p66.mjs [repository-root] [--baseline-only] [--baseline-dir directory] [--git-repository directory]');
    console.log(JSON.stringify(await verifyP66(resolve(roots[0] || process.cwd()),options),null,2));
  } catch (error) { console.error('P66 verification failed: ' + error.message); process.exitCode = 1; }
}
