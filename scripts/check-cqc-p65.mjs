// Incremental verification of P65 against the pinned P64 commit.
// node scripts/check-cqc-p65.mjs [repository-root] [--baseline-only]
// Reads new PNGs and metadata; never downloads historical PNGs.
import assert from 'node:assert/strict';
import {existsSync, openSync, readSync, closeSync, fstatSync, constants, readdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {resolve, posix} from 'node:path';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';
import {verifyStaticPng} from './check-cqc-p64.mjs';
import {P64_COMMIT, ATLAS_PATH, validateP65AtlasExtension, verifyP65RuntimeExtension, extendP65RuntimeManifest} from './extend-cqc-p65-runtime.mjs';

const ensure = (value, message) => { if (!value) throw Error(message); };
const hash = (algorithm, bytes) => createHash(algorithm).update(bytes).digest('hex');
const jsonDigest = value => hash('sha256', JSON.stringify(value));
const FALSE_FLAGS = ['combatReady', 'combatRuntimeIntegrated', 'absolute1to1Certified'];
const HISTORICAL_REGISTRIES = ['docs/cqc-bible/asset-associations.json', 'docs/cqc-bible/asset-associations-p63.json', 'docs/cqc-bible/asset-associations-p64.json'];
const DELIVERY = 'docs/cqc-reprise/pass65/delivery-manifest.json';
const BIBLE = 'docs/cqc-bible/asset-associations-p65.json';
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
function pinnedJson(root, name) {
  return JSON.parse(execFileSync('git', ['show', P64_COMMIT + ':' + canonicalPath(name)], {cwd:root, maxBuffer:4 * 1024 * 1024}));
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
export function verifyHistoricalSources(root) {
  const rows = [], registries = [];
  for (const name of HISTORICAL_REGISTRIES) {
    const base = pinnedJson(root,name), current = readJson(root,name);
    assert.deepEqual(current,base,'Historical source registry changed: ' + name);
    ensure(current.assets.every(row => row.selected === true), 'Historical registry selection changed');
    rows.push(...current.assets); registries.push({path:name,entries:current.assets.length,sha256:hash('sha256',readBytes(root,name))});
  }
  ensure(rows.length === 205, 'Expected 205 historical selected sources');
  unique(rows,'assetId','historical sources'); unique(rows,'path','historical sources');
  const indexText = execFileSync('git',['ls-files','--stage','--',...rows.map(row=>row.path)],{cwd:root,encoding:'utf8',maxBuffer:1024*1024});
  const index = new Map(indexText.trim().split('\n').map(line => { const [metadata,name] = line.split('\t'); return [name,metadata.split(' ')]; }));
  let localFilesHashed = 0;
  for (const row of rows) {
    ensure(index.get(row.path)?.[1] === row.gitBlobSha && index.get(row.path)?.[2] === '0', 'Historical indexed PNG changed: ' + row.path);
    if (existsSync(resolve(root,row.path))) {
      const bytes = readBytes(root,row.path);
      ensure(bytes.length === row.bytes && hash('sha256',bytes) === row.sha256, 'Historical local PNG changed: ' + row.path);
      localFilesHashed++;
    }
  }
  const byKind = {}; for (const row of rows) byKind[row.kind] = (byKind[row.kind] || 0) + 1;
  return {entries:rows.length,registries,gitIndexBlobIdentities:rows.length,localFilesHashed,metadataDigest:jsonDigest(rows),byKind,assetIds:rows.map(row=>row.assetId)};
}

export async function verifyP65(root, {baselineOnly = false} = {}) {
  const historical = verifyHistoricalSources(root);
  if (baselineOnly) return {schema:'cqc.p65.baseline-verification.v1',status:'passed',checkedAt:new Date().toISOString(),nodeVersion:process.version,baseCommit:P64_COMMIT,historical,limits:['Absent historical PNGs are verified by unchanged registry and Git-index blob identity; they are not downloaded.']};
  const delivery = readJson(root,DELIVERY), bible = readJson(root,BIBLE), atlas = readJson(root,'public/cqc/' + ATLAS_PATH);
  const baseAtlas = pinnedJson(root,'public/cqc/' + ATLAS_PATH), baseRuntime = pinnedJson(root,'public/cqc/runtime-manifest.json');
  const runtime = readJson(root,'public/cqc/runtime-manifest.json');
  ensure(delivery.schema === 'cqc.p65.delivery.v1' && delivery.previousSelected === 205 && delivery.parentCommit === P64_COMMIT, 'Invalid P65 delivery baseline/schema');
  const selected = delivery.assets, archives = delivery.archives, blocked = delivery.blockedRequests;
  unique([...selected,...archives,...blocked],'id','delivery'); unique([...selected,...archives],'path','delivery');
  unique([...selected,...archives],'sha256','generated outputs');
  unique(selected,'assetId','selected sources');
  ensure(selected.length > 0 && delivery.counts.selectedSources === selected.length && delivery.counts.archivedAttempts === archives.length && delivery.counts.totalSelected === 205 + selected.length && delivery.counts.generatedPNGs === selected.length + archives.length, 'P65 delivery counts mismatch');
  ensure(delivery.counts.blockedRequests === blocked.length && delivery.counts.generationRequests === selected.length + archives.length + blocked.reduce((sum,row)=>sum+row.attempts,0), 'P65 generation request counts mismatch');
  for (const row of blocked) {
    ensure(/^[a-z0-9][a-z0-9_-]{0,119}$/.test(row.id) && row.status === 'blocked_by_image_tool' && row.hasOutputFile === false && row.selected === false && row.atlasIntegrated === false && row.retried === false && row.attempts === 1, row.id + ': invalid blocked request record');
    for (const key of ['path','bytes','sha256','gitBlobSha']) ensure(!Object.hasOwn(row,key), row.id + ': blocked request must not claim a file');
  }
  const byKind = {}, byEpisode = {}, allPassesByKind = {...historical.byKind};
  for (const row of selected) { byKind[row.kind] = (byKind[row.kind] || 0) + 1; byEpisode[row.episodeKey] = (byEpisode[row.episodeKey] || 0) + 1; allPassesByKind[row.kind] = (allPassesByKind[row.kind] || 0) + 1; }
  for (const [key,value] of Object.entries({byKind,byEpisode,allPassesByKind})) assert.deepEqual(delivery.counts[key],value,'P65 count breakdown mismatch: ' + key);
  ensure(delivery.counts.selectedBytes === selected.reduce((sum,row)=>sum+row.bytes,0) && delivery.counts.archivedBytes === archives.reduce((sum,row)=>sum+row.bytes,0),'P65 image byte totals mismatch');
  const historicalIds = new Set(historical.assetIds);
  for (const [records, selectedFlag] of [[selected,true],[archives,false]]) for (const row of records) {
    const pattern = selectedFlag ? /^public\/cqc\/assets\/p65\/[a-z0-9][a-z0-9_-]*\.png$/ : /^docs\/cqc-reprise\/pass65\/rejected\/[a-z0-9][a-z0-9_-]*\.png$/;
    ensure(pattern.test(canonicalPath(row.path)) && row.selected === selectedFlag && row.atlasIntegrated === selectedFlag && row.sourceGenerated === true, row.id + ': selection/path mismatch');
    for (const key of FALSE_FLAGS) ensure(row[key] === false, row.id + ': ' + key + ' must remain false');
    for (const key of ['bytes','width','height']) ensure(Number.isSafeInteger(row[key]) && row[key] > 0, row.id + ': invalid ' + key);
    ensure(/^[a-f0-9]{64}$/.test(row.sha256) && /^[a-f0-9]{40}$/.test(row.gitBlobSha), row.id + ': invalid PNG hash');
    if (selectedFlag) ensure(row.sourceGenerated === true && !historicalIds.has(row.assetId), row.id + ': invalid or reused source identity');
  }
  for (const document of [delivery,atlas,bible]) rejectPositiveClaims(document);
  const pngs = [...selected,...archives].map(row => verifyStaticPng(readBytes(root,row.path),row));
  const added = validateP65AtlasExtension(baseAtlas,atlas), selectedById = unique(selected,'id','selected');
  ensure(added.length === selected.length, 'P65 atlas count mismatch');
  const baseRuntimeRows = new Map(baseRuntime.files.map(row=>[row.path,row]));
  for (const name of ['index.html','modules/source-atlas-v063.html','src/cqc-p63-source-atlas.js','src/cqc-p63-source-atlas.css']) {
    const bytes = readBytes(root,'public/cqc/' + name), metadata = baseRuntimeRows.get(name);
    ensure(metadata && bytes.length === metadata.bytes && hash('sha256',bytes) === metadata.sha256,'P65 must preserve the existing Atlas shell/controller/style: ' + name);
  }
  const context = {module:{exports:{}}, URL, URLSearchParams};
  vm.runInNewContext(readBytes(root,'public/cqc/src/cqc-p63-source-atlas.js').toString('utf8'),context,{filename:'cqc-p63-source-atlas.js'});
  const api = context.module.exports, normalized = api.normalizeCatalog(atlas);
  ensure(normalized.length === 28 + selected.length, 'P65 sources failed runtime catalogue normalization');
  for (const row of added) {
    const source = selectedById.get(row.id); ensure(source,'Unknown P65 atlas source: ' + row.id);
    ensure(row.path === '../' + source.path.slice('public/cqc/'.length), row.id + ': atlas path mismatch');
    for (const key of ['assetId','label','episode','episodeKey','bytes','width','height','sha256','gitBlobSha','kind','workIds','referenceURLs','qaNotes','scope','bibleURL']) assert.deepEqual(row[key],source[key],row.id + ': atlas ' + key + ' mismatch');
    ensure(Array.isArray(row.referenceURLs) && row.referenceURLs.length > 0 && row.referenceURLs.every(url => api.referenceURL(url)),row.id + ': invalid references');
    ensure(Array.isArray(row.qaNotes) && row.qaNotes.length > 0 && row.fidelityStatus === 'pending_external_review',row.id + ': missing fidelity reservations');
  }
  ensure(bible.schema === 'cqc.bible.asset-associations-p65.v1' && bible.counts.selectedSources === selected.length && bible.counts.totalSelected === 205 + selected.length, 'P65 bible counts/schema mismatch');
  assert.deepEqual(bible.counts,delivery.counts,'Bible and delivery counts differ');
  assert.deepEqual(bible.archives,archives,'Bible and delivery archives differ');
  assert.deepEqual(bible.blockedRequests,blocked,'Bible and delivery blocked requests differ');
  const bibleRows = unique(bible.assets,'id','bible'); ensure(bibleRows.size === selected.length,'P65 bible count mismatch');
  for (const source of selected) {
    const row = bibleRows.get(source.id); ensure(row,source.id + ': missing bible association');
    for (const key of ['assetId','label','episode','episodeKey','path','bytes','width','height','sha256','gitBlobSha','kind','workIds','referenceURLs','qaNotes','scope','guideSections','bibleURL']) assert.deepEqual(row[key],source[key],source.id + ': bible ' + key + ' mismatch');
    ensure(Array.isArray(row.guideSections) && row.guideSections.length > 0 && Array.isArray(row.workIds) && row.workIds.length > 0,source.id + ': missing bible links');
    ensure(row.runtimeIntegrated === false && row.runtimeBinding?.status === 'atlas_only' && row.runtimeBinding?.admittedByThisPass === false,source.id + ': invalid combat binding claim');
  }
  const published = readdirSync(resolve(root,'public/cqc/assets/p65')).filter(name=>name.endsWith('.png')).sort();
  assert.deepEqual(published,selected.map(row=>posix.basename(row.path)).sort(),'Unlisted PNG in published P65 folder');
  const newPaths = selected.map(row=>row.path.slice('public/cqc/'.length));
  const runtimeProof = verifyP65RuntimeExtension(baseRuntime,runtime,newPaths);
  const proposed = await extendP65RuntimeManifest(baseRuntime,resolve(root,'public/cqc'),baseAtlas);
  assert.deepEqual(runtime,proposed,'Committed runtime differs from scanner-backed P65 proposal');
  const archiveHashes = new Set(archives.map(row=>row.sha256));
  ensure(runtime.files.every(row=>!archiveHashes.has(row.sha256)),'Archived attempt appears in the runtime');
  return {schema:'cqc.p65.local-verification.v1',status:'passed',checkedAt:new Date().toISOString(),nodeVersion:process.version,baseCommit:P64_COMMIT,
    counts:{selectedSources:selected.length,archivedAttempts:archives.length,generatedPNGs:selected.length+archives.length,blockedRequests:blocked.length,generationRequests:delivery.counts.generationRequests,totalSelected:205+selected.length,atlasSources:atlas.assets.length},historical,
    checks:{historical205EntriesUnchanged:true,old28AtlasEntriesUnchanged:true,atlasShellControllerAndStyleBytesUnchanged:true,pngStructureCrcHashesAndDecompression:true,runtimeCatalogNormalization:true,deliveryAtlasBibleBijections:true,combatAndCertificationFlagsFalse:true,archivesExcluded:true,blockedRequestsHaveNoFiles:true,realScannerMatchesManifest:true},
    runtime:runtimeProof,pngs,limits:['Historical PNGs absent from the sparse checkout are verified by unchanged registry and Git-index identity; they are not downloaded.','PNG verification establishes file integrity and transparency, not visual 1:1 fidelity.','Runtime reachability is a static graph check, not gameplay or browser execution.']};
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const args = process.argv.slice(2), baselineOnly = args.includes('--baseline-only');
    const roots = args.filter(arg => arg !== '--baseline-only');
    ensure(roots.length <= 1 && !roots[0]?.startsWith('--'),'Usage: node scripts/check-cqc-p65.mjs [repository-root] [--baseline-only]');
    console.log(JSON.stringify(await verifyP65(resolve(roots[0] || process.cwd()),{baselineOnly}),null,2));
  } catch (error) { console.error('P65 verification failed: ' + error.message); process.exitCode = 1; }
}
