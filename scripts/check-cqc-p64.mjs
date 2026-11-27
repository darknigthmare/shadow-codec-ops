// Incremental verification of P64 against the pinned P63 commit.
// node scripts/check-cqc-p64.mjs [repository-root] [--baseline-only]
// Reads new PNGs and metadata; never downloads historical PNGs.
import assert from 'node:assert/strict';
import {existsSync, openSync, readSync, closeSync, fstatSync, constants, readdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {resolve, posix} from 'node:path';
import {fileURLToPath} from 'node:url';
import {inflateSync} from 'node:zlib';
import vm from 'node:vm';
import {P63_COMMIT, ATLAS_PATH, validateP64AtlasExtension, verifyP64RuntimeExtension, extendP64RuntimeManifest} from './extend-cqc-p64-runtime.mjs';

const ensure = (value, message) => { if (!value) throw Error(message); };
const hash = (algorithm, bytes) => createHash(algorithm).update(bytes).digest('hex');
const jsonDigest = value => hash('sha256', JSON.stringify(value));
const FALSE_FLAGS = ['combatReady', 'combatRuntimeIntegrated', 'absolute1to1Certified'];
const HISTORICAL_REGISTRIES = ['docs/cqc-bible/asset-associations.json', 'docs/cqc-bible/asset-associations-p63.json'];
const DELIVERY = 'docs/cqc-reprise/pass64/delivery-manifest.json';
const BIBLE = 'docs/cqc-bible/asset-associations-p64.json';
const CRC_TABLE = Array.from({length:256}, (_,n) => {
  let c = n; for (let i = 0; i < 8; i++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});

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
  return JSON.parse(execFileSync('git', ['show', P63_COMMIT + ':' + canonicalPath(name)], {cwd:root, maxBuffer:4 * 1024 * 1024}));
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
function crc32(bytes) {
  let c = 0xffffffff; for (const b of bytes) c = CRC_TABLE[(c ^ b) & 255] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

// PNG structure, CRC, decompression and row filters; supports static RGB/RGBA8.
// Alpha extrema are reconstructed from real samples, not from filtered bytes.
export function verifyStaticPng(bytes, row) {
  const label = row.id || row.path;
  ensure(bytes.length === row.bytes && bytes.length >= 45, label + ': PNG byte count mismatch');
  ensure(bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])), label + ': invalid PNG signature');
  const sha256 = hash('sha256', bytes), gitBlobSha = createHash('sha1').update('blob ' + bytes.length + '\0').update(bytes).digest('hex');
  ensure(sha256 === row.sha256 && gitBlobSha === row.gitBlobSha, label + ': PNG hash mismatch');
  let offset = 8, chunks = 0, width, height, channels, colorType, ended = false, idatPhase = 0, palette = false;
  const idat = [];
  while (offset < bytes.length) {
    ensure(offset + 12 <= bytes.length, label + ': truncated chunk');
    const n = bytes.readUInt32BE(offset);
    ensure(n <= 0x7fffffff && offset + n + 12 <= bytes.length, label + ': invalid chunk length');
    const typeBytes = bytes.subarray(offset+4,offset+8), type = typeBytes.toString('ascii');
    ensure(typeBytes.every(b => (b >= 65 && b <= 90) || (b >= 97 && b <= 122)) && /[A-Z]/.test(type[2]), label + ': invalid chunk type');
    const data = bytes.subarray(offset+8,offset+8+n);
    ensure(crc32(bytes.subarray(offset+4,offset+8+n)) === bytes.readUInt32BE(offset+8+n), label + ': CRC mismatch in ' + type);
    ensure(chunks || type === 'IHDR', label + ': IHDR must be first');
    if (idatPhase === 1 && type !== 'IDAT') idatPhase = 2;
    if (type === 'IHDR') {
      ensure(chunks === 0 && n === 13, label + ': duplicate or invalid IHDR');
      width = data.readUInt32BE(0); height = data.readUInt32BE(4); colorType = data[9];
      ensure(width > 0 && height > 0 && width === row.width && height === row.height, label + ': PNG dimensions mismatch');
      ensure(data[8] === 8 && [2,6].includes(colorType) && data[10] === 0 && data[11] === 0 && data[12] === 0, label + ': expected noninterlaced RGB/RGBA8');
      channels = colorType === 6 ? 4 : 3;
    } else if (type === 'PLTE') {
      ensure(!palette && idatPhase === 0 && n >= 3 && n <= 768 && n % 3 === 0, label + ': invalid PLTE'); palette = true;
    } else if (type === 'IDAT') {
      ensure(idatPhase !== 2, label + ': nonconsecutive IDAT'); idatPhase = 1; idat.push(data);
    } else if (type === 'IEND') {
      ensure(n === 0 && idat.length > 0 && offset + 12 === bytes.length, label + ': invalid IEND or trailing data'); ended = true;
    } else ensure(/[a-z]/.test(type[0]) && !['acTL','fcTL','fdAT'].includes(type), label + ': unsupported critical or animation chunk');
    chunks++; offset += n + 12; if (ended) break;
  }
  ensure(ended && offset === bytes.length, label + ': incomplete PNG');
  const stride = width * channels, expected = (stride + 1) * height;
  ensure(Number.isSafeInteger(expected) && expected <= 512 * 1024 * 1024, label + ': excessive decoded size');
  const compressed = Buffer.concat(idat);
  const decoded = inflateSync(compressed, {maxOutputLength:expected, info:true});
  ensure(decoded.buffer.length === expected && decoded.engine.bytesWritten === compressed.length, label + ': invalid or trailing compressed data');
  let previous = Buffer.alloc(stride), current = Buffer.alloc(stride), alphaMin = 255, alphaMax = 0;
  const paeth = (a,b,c) => { const p = a+b-c, pa = Math.abs(p-a), pb = Math.abs(p-b), pc = Math.abs(p-c); return pa <= pb && pa <= pc ? a : pb <= pc ? b : c; };
  for (let y = 0; y < height; y++) {
    const start = y * (stride + 1), filter = decoded.buffer[start];
    ensure(filter <= 4, label + ': invalid scanline filter');
    if (channels !== 4) continue;
    for (let x = 0; x < stride; x++) {
      const a = x >= channels ? current[x-channels] : 0, b = previous[x], c = x >= channels ? previous[x-channels] : 0;
      const predicted = filter === 0 ? 0 : filter === 1 ? a : filter === 2 ? b : filter === 3 ? Math.floor((a+b)/2) : paeth(a,b,c);
      current[x] = (decoded.buffer[start+1+x] + predicted) & 255;
      if (x % 4 === 3) { alphaMin = Math.min(alphaMin,current[x]); alphaMax = Math.max(alphaMax,current[x]); }
    }
    [previous,current] = [current,previous];
  }
  const alphaExtrema = channels === 4 ? [alphaMin,alphaMax] : null;
  if (Object.hasOwn(row,'alphaExtrema')) assert.deepEqual(row.alphaExtrema, alphaExtrema, label + ': alpha extrema mismatch');
  if (row.transparentBackground === true) ensure(channels === 4 && alphaMin === 0 && alphaMax > 0, label + ': requested transparency missing');
  if (Object.hasOwn(row,'colorType')) ensure(row.colorType === colorType, label + ': color type mismatch');
  return {id:row.id,path:row.path,selected:row.selected,bytes:bytes.length,width,height,bitDepth:8,colorType,sha256,gitBlobSha,chunks,inflatedBytes:expected,alphaExtrema};
}

export function verifyHistoricalSources(root) {
  const rows = [], registries = [];
  for (const name of HISTORICAL_REGISTRIES) {
    const base = pinnedJson(root,name), current = readJson(root,name);
    assert.deepEqual(current,base,'Historical source registry changed: ' + name);
    ensure(current.assets.every(row => row.selected === true), 'Historical registry selection changed');
    rows.push(...current.assets); registries.push({path:name,entries:current.assets.length,sha256:hash('sha256',readBytes(root,name))});
  }
  ensure(rows.length === 194, 'Expected 194 historical selected sources');
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

export async function verifyP64(root, {baselineOnly = false} = {}) {
  const historical = verifyHistoricalSources(root);
  if (baselineOnly) return {schema:'cqc.p64.baseline-verification.v1',status:'passed',checkedAt:new Date().toISOString(),nodeVersion:process.version,baseCommit:P63_COMMIT,historical,limits:['Absent historical PNGs are verified by unchanged registry and Git-index blob identity; they are not downloaded.']};
  const delivery = readJson(root,DELIVERY), bible = readJson(root,BIBLE), atlas = readJson(root,'public/cqc/' + ATLAS_PATH);
  const baseAtlas = pinnedJson(root,'public/cqc/' + ATLAS_PATH), baseRuntime = pinnedJson(root,'public/cqc/runtime-manifest.json');
  const runtime = readJson(root,'public/cqc/runtime-manifest.json');
  ensure(delivery.schema === 'cqc.p64.delivery.v1' && delivery.previousSelected === 194 && delivery.parentCommit === P63_COMMIT, 'Invalid P64 delivery baseline/schema');
  const selected = delivery.assets, archives = delivery.archives, blocked = delivery.blockedRequests;
  unique([...selected,...archives,...blocked],'id','delivery'); unique([...selected,...archives],'path','delivery');
  unique([...selected,...archives],'sha256','generated outputs');
  unique(selected,'assetId','selected sources');
  ensure(selected.length > 0 && delivery.counts.selectedSources === selected.length && delivery.counts.archivedAttempts === archives.length && delivery.counts.totalSelected === 194 + selected.length && delivery.counts.generatedPNGs === selected.length + archives.length, 'P64 delivery counts mismatch');
  ensure(delivery.counts.blockedRequests === blocked.length && delivery.counts.generationRequests === selected.length + archives.length + blocked.reduce((sum,row)=>sum+row.attempts,0), 'P64 generation request counts mismatch');
  for (const row of blocked) {
    ensure(/^[a-z0-9][a-z0-9_-]{0,119}$/.test(row.id) && row.status === 'blocked_by_image_tool' && row.hasOutputFile === false && row.selected === false && row.atlasIntegrated === false && row.retried === false && row.attempts === 1, row.id + ': invalid blocked request record');
    for (const key of ['path','bytes','sha256','gitBlobSha']) ensure(!Object.hasOwn(row,key), row.id + ': blocked request must not claim a file');
  }
  const byKind = {}, byEpisode = {}, allPassesByKind = {...historical.byKind};
  for (const row of selected) { byKind[row.kind] = (byKind[row.kind] || 0) + 1; byEpisode[row.episodeKey] = (byEpisode[row.episodeKey] || 0) + 1; allPassesByKind[row.kind] = (allPassesByKind[row.kind] || 0) + 1; }
  for (const [key,value] of Object.entries({byKind,byEpisode,allPassesByKind})) assert.deepEqual(delivery.counts[key],value,'P64 count breakdown mismatch: ' + key);
  ensure(delivery.counts.selectedBytes === selected.reduce((sum,row)=>sum+row.bytes,0) && delivery.counts.archivedBytes === archives.reduce((sum,row)=>sum+row.bytes,0),'P64 image byte totals mismatch');
  const historicalIds = new Set(historical.assetIds);
  for (const [records, selectedFlag] of [[selected,true],[archives,false]]) for (const row of records) {
    const pattern = selectedFlag ? /^public\/cqc\/assets\/p64\/[a-z0-9][a-z0-9_-]*\.png$/ : /^docs\/cqc-reprise\/pass64\/rejected\/[a-z0-9][a-z0-9_-]*\.png$/;
    ensure(pattern.test(canonicalPath(row.path)) && row.selected === selectedFlag && row.atlasIntegrated === selectedFlag, row.id + ': selection/path mismatch');
    for (const key of FALSE_FLAGS) ensure(row[key] === false, row.id + ': ' + key + ' must remain false');
    for (const key of ['bytes','width','height']) ensure(Number.isSafeInteger(row[key]) && row[key] > 0, row.id + ': invalid ' + key);
    ensure(/^[a-f0-9]{64}$/.test(row.sha256) && /^[a-f0-9]{40}$/.test(row.gitBlobSha), row.id + ': invalid PNG hash');
    if (selectedFlag) ensure(row.sourceGenerated === true && !historicalIds.has(row.assetId), row.id + ': invalid or reused source identity');
  }
  for (const document of [delivery,atlas,bible]) rejectPositiveClaims(document);
  const pngs = [...selected,...archives].map(row => verifyStaticPng(readBytes(root,row.path),row));
  const added = validateP64AtlasExtension(baseAtlas,atlas), selectedById = unique(selected,'id','selected');
  ensure(added.length === selected.length, 'P64 atlas count mismatch');
  const baseRuntimeRows = new Map(baseRuntime.files.map(row=>[row.path,row]));
  for (const name of ['index.html','modules/source-atlas-v063.html','src/cqc-p63-source-atlas.js','src/cqc-p63-source-atlas.css']) {
    const bytes = readBytes(root,'public/cqc/' + name), metadata = baseRuntimeRows.get(name);
    ensure(metadata && bytes.length === metadata.bytes && hash('sha256',bytes) === metadata.sha256,'P64 must preserve the existing Atlas shell/controller/style: ' + name);
  }
  const context = {module:{exports:{}}, URL, URLSearchParams};
  vm.runInNewContext(readBytes(root,'public/cqc/src/cqc-p63-source-atlas.js').toString('utf8'),context,{filename:'cqc-p63-source-atlas.js'});
  const api = context.module.exports, normalized = api.normalizeCatalog(atlas);
  ensure(normalized.length === 17 + selected.length, 'P64 sources failed runtime catalogue normalization');
  for (const row of added) {
    const source = selectedById.get(row.id); ensure(source,'Unknown P64 atlas source: ' + row.id);
    ensure(row.path === '../' + source.path.slice('public/cqc/'.length), row.id + ': atlas path mismatch');
    for (const key of ['assetId','bytes','width','height','sha256','gitBlobSha','kind','workIds','referenceURLs','qaNotes']) assert.deepEqual(row[key],source[key],row.id + ': atlas ' + key + ' mismatch');
    ensure(Array.isArray(row.referenceURLs) && row.referenceURLs.length > 0 && row.referenceURLs.every(url => api.referenceURL(url)),row.id + ': invalid references');
    ensure(Array.isArray(row.qaNotes) && row.qaNotes.length > 0 && row.fidelityStatus === 'pending_external_review',row.id + ': missing fidelity reservations');
  }
  ensure(bible.schema === 'cqc.bible.asset-associations-p64.v1' && bible.counts.selectedSources === selected.length && bible.counts.totalSelected === 194 + selected.length, 'P64 bible counts/schema mismatch');
  assert.deepEqual(bible.counts,delivery.counts,'Bible and delivery counts differ');
  assert.deepEqual(bible.archives,archives,'Bible and delivery archives differ');
  assert.deepEqual(bible.blockedRequests,blocked,'Bible and delivery blocked requests differ');
  const bibleRows = unique(bible.assets,'id','bible'); ensure(bibleRows.size === selected.length,'P64 bible count mismatch');
  for (const source of selected) {
    const row = bibleRows.get(source.id); ensure(row,source.id + ': missing bible association');
    for (const key of ['assetId','path','bytes','width','height','sha256','gitBlobSha','workIds']) assert.deepEqual(row[key],source[key],source.id + ': bible ' + key + ' mismatch');
    ensure(Array.isArray(row.guideSections) && row.guideSections.length > 0 && Array.isArray(row.workIds) && row.workIds.length > 0,source.id + ': missing bible links');
    ensure(row.runtimeIntegrated === false && row.runtimeBinding?.status === 'atlas_only' && row.runtimeBinding?.admittedByThisPass === false,source.id + ': invalid combat binding claim');
  }
  const published = readdirSync(resolve(root,'public/cqc/assets/p64')).filter(name=>name.endsWith('.png')).sort();
  assert.deepEqual(published,selected.map(row=>posix.basename(row.path)).sort(),'Unlisted PNG in published P64 folder');
  const newPaths = selected.map(row=>row.path.slice('public/cqc/'.length));
  const runtimeProof = verifyP64RuntimeExtension(baseRuntime,runtime,newPaths);
  const proposed = await extendP64RuntimeManifest(baseRuntime,resolve(root,'public/cqc'),baseAtlas);
  assert.deepEqual(runtime,proposed,'Committed runtime differs from scanner-backed P64 proposal');
  const archiveHashes = new Set(archives.map(row=>row.sha256));
  ensure(runtime.files.every(row=>!archiveHashes.has(row.sha256)),'Archived attempt appears in the runtime');
  return {schema:'cqc.p64.local-verification.v1',status:'passed',checkedAt:new Date().toISOString(),nodeVersion:process.version,baseCommit:P63_COMMIT,
    counts:{selectedSources:selected.length,archivedAttempts:archives.length,generatedPNGs:selected.length+archives.length,blockedRequests:blocked.length,generationRequests:delivery.counts.generationRequests,totalSelected:194+selected.length,atlasSources:atlas.assets.length},historical,
    checks:{historical194EntriesUnchanged:true,old17AtlasEntriesUnchanged:true,atlasShellControllerAndStyleBytesUnchanged:true,pngStructureCrcHashesAndDecompression:true,runtimeCatalogNormalization:true,deliveryAtlasBibleBijections:true,combatAndCertificationFlagsFalse:true,archivesExcluded:true,blockedRequestsHaveNoFiles:true,realScannerMatchesManifest:true},
    runtime:runtimeProof,pngs,limits:['Historical PNGs absent from the sparse checkout are verified by unchanged registry and Git-index identity; they are not downloaded.','PNG verification establishes file integrity and transparency, not visual 1:1 fidelity.','Runtime reachability is a static graph check, not gameplay or browser execution.']};
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const args = process.argv.slice(2), baselineOnly = args.includes('--baseline-only');
    const roots = args.filter(arg => arg !== '--baseline-only');
    ensure(roots.length <= 1 && !roots[0]?.startsWith('--'),'Usage: node scripts/check-cqc-p64.mjs [repository-root] [--baseline-only]');
    console.log(JSON.stringify(await verifyP64(resolve(roots[0] || process.cwd()),{baselineOnly}),null,2));
  } catch (error) { console.error('P64 verification failed: ' + error.message); process.exitCode = 1; }
}
