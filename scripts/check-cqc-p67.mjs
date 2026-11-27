// Incremental verification of P67 against the pinned P66 commit.
// node scripts/check-cqc-p67.mjs [repository-root] [--baseline-only] [--baseline-dir directory] [--git-repository directory]
// Reads new PNGs and metadata; never downloads historical PNGs.
import assert from 'node:assert/strict';
import {existsSync, openSync, readSync, closeSync, fstatSync, constants, readdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {resolve, posix} from 'node:path';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';
import {verifyStaticPng} from './check-cqc-p64.mjs';
import {P66_COMMIT, ATLAS_PATH, validateP67AtlasExtension, verifyP67RuntimeExtension, extendP67RuntimeManifest} from './extend-cqc-p67-runtime.mjs';

const ensure = (value, message) => { if (!value) throw Error(message); };
const hash = (algorithm, bytes) => createHash(algorithm).update(bytes).digest('hex');
const jsonDigest = value => hash('sha256', JSON.stringify(value));
const FALSE_FLAGS = ['runtimeIntegrated', 'combatReady', 'combatRuntimeIntegrated', 'absolute1to1Certified'];
const HISTORICAL_REGISTRIES = ['docs/cqc-bible/asset-associations.json', 'docs/cqc-bible/asset-associations-p63.json', 'docs/cqc-bible/asset-associations-p64.json', 'docs/cqc-bible/asset-associations-p65.json', 'docs/cqc-bible/asset-associations-p66.json'];
// Complete batch fixed after independent review: 29 selected, one archived, one refused.
// IDs come from the reviewed handoffs and the parent's explicit final root list,
// not from the delivery being verified.
const REVIEWED_BATCH = Object.freeze({
  "selectedIds": [
    "delta-gru-balaclava-portrait",
    "gz-camp-omega-poncho-salute-portrait",
    "mg1-msx-outer-heaven-gray-guard",
    "mg1-nes-outer-heaven-guard",
    "mg2-four-horsemen-shared-guard",
    "mgo1-rowdy-reiko-idle",
    "mgo2-white-beret-black-uniform-preset",
    "mgo3-enforcer-skull-face-preset",
    "mgo3-enforcer-visor-portrait",
    "mgo3-infiltrator-balaclava-portrait",
    "mgo3-infiltrator-respirator-preset",
    "mgo3-scout-nvg-mantle-portrait",
    "mgo3-scout-patrol-cap-preset",
    "mgs1-genome-heavily-armed-troop",
    "mgs1-genome-light-infantry",
    "mgs2-shell1-gray-haired-hostage",
    "mgs4-middle-east-rebel-light-tunic",
    "mgs4-middle-east-rebel-short-sleeve",
    "mobile-ngage-olive-guard",
    "mpop-female-officer-a",
    "mpop-male-scientist-a",
    "mpop-ocelot-female-a",
    "mpop-ussr-female-a",
    "mpop-ussr-male-a",
    "pw-sandinista",
    "touch-gekko-mission07",
    "tpp-evangelos-constantinou-hospital",
    "tpp-hospital-nurse-white-uniform-portrait",
    "tts-kenneth-baker-seated"
  ],
  "archiveIds": [
    "mgo3-scout-nvg-mantle-portrait-v1"
  ],
  "blockedIds": [
    "pw-sentinel-vest"
  ]
});
const DELIVERY = 'docs/cqc-reprise/pass67/delivery-manifest.json';
const BIBLE = 'docs/cqc-bible/asset-associations-p67.json';
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
  'public/cqc/runtime-manifest.json': 'e3db78ce529e6545d382efdba6948b1b036381c0',
  'public/cqc/data/cqc-p63-source-atlas.json': '2f420d904766b22e210e9452a1a65131f0a88e30',
  'docs/cqc-bible/asset-associations.json': 'fdde971b01abbaba3675442ce90b4433287ab1fc',
  'docs/cqc-bible/asset-associations-p63.json': 'ce28b6a4f30fd16f55b520b3b4478d30d0d8bc8e',
  'docs/cqc-bible/asset-associations-p64.json': 'b17679835b1236ecaa299c8b42eadbc07f59f0b1',
  'docs/cqc-bible/asset-associations-p65.json': 'b8d8c504f8b07c61c0abf11663a0ed17b94fc13d',
  'docs/cqc-bible/asset-associations-p66.json': '98ec8b9c175b8f49484d503735eecb01c03a2728'
});
const gitBlobHash = bytes => createHash('sha1').update('blob ' + bytes.length + '\0').update(bytes).digest('hex');
// Optional external snapshots must match the exact pinned Git blob identities.
// The companion Git repository supplies the real tree only, never an invented index.
// GIT_NO_LAZY_FETCH prevents implicit downloads from a partial clone.
function pinnedJson(root, name, options = {}) {
  canonicalPath(name);
  const bytes = options.baselineRoot ? readBytes(options.baselineRoot, name) :
    execFileSync('git', ['show', P66_COMMIT + ':' + name], {
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
    ensure(![...FALSE_FLAGS,'scopeClosed'].includes(key) || child !== true, 'Unsupported claim: ' + key);
    rejectPositiveClaims(child);
  }
}
export function verifyHistoricalSources(root, options = {}) {
  const rows = [], archives = [], registries = [];
  for (const name of HISTORICAL_REGISTRIES) {
    const base = pinnedJson(root,name,options), current = readJson(root,name);
    ensure(gitBlobHash(readBytes(root,name)) === PINNED_FILES[name], 'Historical registry bytes changed: ' + name);
    assert.deepEqual(current,base,'Historical source registry changed: ' + name);
    ensure(current.assets.every(row => row.selected === true), 'Historical registry selection changed');
    rows.push(...current.assets); archives.push(...(current.archives || []));
    registries.push({path:name,entries:current.assets.length,sha256:hash('sha256',readBytes(root,name))});
  }
  ensure(rows.length === 225, 'Expected 225 historical selected sources');
  ensure(archives.length === 18, 'Expected 18 historical archived attempts');
  unique(rows,'assetId','historical sources'); unique(rows,'path','historical sources');
  unique([...rows,...archives],'path','historical selected and archived sources');
  const treeText = execFileSync('git', ['ls-tree', '-rz', P66_COMMIT, '--', ...[...rows,...archives].map(row => row.path)], {
    cwd: options.gitRepository || root, encoding: 'utf8', maxBuffer: 1024 * 1024,
    env: {...process.env, GIT_NO_LAZY_FETCH: '1'}
  });
  const tree = new Map(treeText.split('\0').filter(Boolean).map(line => {
    const [metadata,name] = line.split('\t'); return [name,metadata.split(' ')];
  }));
  ensure(tree.size === rows.length + archives.length, 'Pinned Git tree lacks a historical source or archive');
  let localFilesHashed = 0;
  for (const row of rows) {
    ensure(tree.get(row.path)?.[1] === 'blob' && tree.get(row.path)?.[2] === row.gitBlobSha, 'Historical tree PNG identity changed: ' + row.path);
    if (existsSync(resolve(root,row.path))) {
      const bytes = readBytes(root,row.path);
      ensure(bytes.length === row.bytes && hash('sha256',bytes) === row.sha256, 'Historical local PNG changed: ' + row.path);
      localFilesHashed++;
    }
  }
  let localArchiveFilesHashed = 0;
  for (const row of archives) {
    ensure(tree.get(row.path)?.[1] === 'blob' && tree.get(row.path)?.[2] === row.gitBlobSha, 'Historical archive identity changed: ' + row.path);
    if (existsSync(resolve(root,row.path))) {
      ensure(gitBlobHash(readBytes(root,row.path)) === row.gitBlobSha, 'Historical local archive changed: ' + row.path);
      localArchiveFilesHashed++;
    }
  }
  const byKind = {}; for (const row of rows) byKind[row.kind] = (byKind[row.kind] || 0) + 1;
  return {entries:rows.length,registries,pinnedGitTreeBlobIdentities:rows.length,localFilesHashed,
    archivedEntries:archives.length,pinnedGitTreeArchivedBlobIdentities:archives.length,localArchiveFilesHashed,
    metadataDigest:jsonDigest(rows),byKind,assetIds:rows.map(row=>row.assetId),sourceSha256:rows.map(row=>row.sha256)};
}

export async function verifyP67(root, {baselineOnly = false, ...options} = {}) {
  const historical = verifyHistoricalSources(root,options);
  if (baselineOnly) return {schema:'cqc.p67.baseline-verification.v1',status:'passed',checkedAt:new Date().toISOString(),nodeVersion:process.version,baseCommit:P66_COMMIT,historical,limits:['Absent historical PNGs are verified by unchanged registry and pinned Git-tree blob identity; they are not downloaded.']};
  const delivery = readJson(root,DELIVERY), bible = readJson(root,BIBLE), atlas = readJson(root,'public/cqc/' + ATLAS_PATH);
  const baseAtlas = pinnedJson(root,'public/cqc/' + ATLAS_PATH,options), baseRuntime = pinnedJson(root,'public/cqc/runtime-manifest.json',options);
  const runtime = readJson(root,'public/cqc/runtime-manifest.json');
  ensure(delivery.schema === 'cqc.p67.delivery.v1' && delivery.previousSelected === 225 && delivery.parentCommit === P66_COMMIT, 'Invalid P67 delivery baseline/schema');
  const selected = delivery.assets, archives = delivery.archives, blocked = delivery.blockedRequests;
  for (const [name, rows] of [['selectedIds',selected],['archiveIds',archives],['blockedIds',blocked]]) {
    ensure(Array.isArray(REVIEWED_BATCH[name]), 'P67 reviewed batch has not been finalized: ' + name);
    assert.deepEqual(rows.map(row=>row.id).sort(), [...REVIEWED_BATCH[name]].sort(), 'P67 reviewed batch differs: ' + name);
  }
  unique([...selected,...archives,...blocked],'id','delivery'); unique([...selected,...archives],'path','delivery');
  unique([...selected,...archives],'sha256','generated outputs');
  unique(selected,'assetId','selected sources');
  ensure(selected.length > 0 && delivery.counts.selectedSources === selected.length && delivery.counts.archivedAttempts === archives.length && delivery.counts.totalSelected === 225 + selected.length && delivery.counts.generatedPNGs === selected.length + archives.length, 'P67 delivery counts mismatch');
  ensure(delivery.counts.blockedRequests === blocked.length && delivery.counts.generationRequests === selected.length + archives.length + blocked.reduce((sum,row)=>sum+row.attempts,0), 'P67 generation request counts mismatch');
  for (const row of blocked) {
    ensure(/^[a-z0-9][a-z0-9_-]{0,119}$/.test(row.id) && row.status === 'blocked_by_image_tool' && row.hasOutputFile === false && row.selected === false && row.atlasIntegrated === false && row.retried === false && row.attempts === 1, row.id + ': invalid blocked request record');
    for (const key of ['path','bytes','sha256','gitBlobSha']) ensure(!Object.hasOwn(row,key), row.id + ': blocked request must not claim a file');
    for (const key of FALSE_FLAGS) ensure(row[key] === false, row.id + ': blocked request ' + key + ' must remain false');
  }
  const byKind = {}, byEpisode = {}, allPassesByKind = {...historical.byKind};
  for (const row of selected) { byKind[row.kind] = (byKind[row.kind] || 0) + 1; byEpisode[row.episodeKey] = (byEpisode[row.episodeKey] || 0) + 1; allPassesByKind[row.kind] = (allPassesByKind[row.kind] || 0) + 1; }
  for (const [key,value] of Object.entries({byKind,byEpisode,allPassesByKind})) assert.deepEqual(delivery.counts[key],value,'P67 count breakdown mismatch: ' + key);
  ensure(delivery.counts.selectedBytes === selected.reduce((sum,row)=>sum+row.bytes,0) && delivery.counts.archivedBytes === archives.reduce((sum,row)=>sum+row.bytes,0),'P67 image byte totals mismatch');
  const historicalIds = new Set(historical.assetIds), historicalHashes = new Set(historical.sourceSha256);
  for (const [records, selectedFlag] of [[selected,true],[archives,false]]) for (const row of records) {
    const pattern = selectedFlag ? /^public\/cqc\/assets\/p67\/[a-z0-9][a-z0-9_-]*\.png$/ : /^docs\/cqc-reprise\/pass67\/rejected\/[a-z0-9][a-z0-9_-]*\.png$/;
    ensure(pattern.test(canonicalPath(row.path)) && row.selected === selectedFlag && row.atlasIntegrated === selectedFlag && row.sourceGenerated === true, row.id + ': selection/path mismatch');
    for (const key of FALSE_FLAGS) ensure(row[key] === false, row.id + ': ' + key + ' must remain false');
    for (const key of ['bytes','width','height']) ensure(Number.isSafeInteger(row[key]) && row[key] > 0, row.id + ': invalid ' + key);
    ensure(/^[a-f0-9]{64}$/.test(row.sha256) && /^[a-f0-9]{40}$/.test(row.gitBlobSha), row.id + ': invalid PNG hash');
    if (selectedFlag) {
      ensure(row.sourceGenerated === true && !historicalIds.has(row.assetId) && !historicalHashes.has(row.sha256), row.id + ': invalid or reused source identity/content');
      ensure(row.scopeClosed === false, row.id + ': a new candidate cannot close a broad historical scope');
    }
  }
  for (const document of [delivery,atlas,bible]) rejectPositiveClaims(document);
  const pngs = [...selected,...archives].map(row => verifyStaticPng(readBytes(root,row.path),row));
  const added = validateP67AtlasExtension(baseAtlas,atlas), selectedById = unique(selected,'id','selected');
  ensure(added.length === selected.length, 'P67 atlas count mismatch');
  const baseRuntimeRows = new Map(baseRuntime.files.map(row=>[row.path,row]));
  for (const name of ['index.html','src/cqc-p63-source-atlas.css']) {
    const bytes = readBytes(root,'public/cqc/' + name), metadata = baseRuntimeRows.get(name);
    ensure(metadata && bytes.length === metadata.bytes && hash('sha256',bytes) === metadata.sha256,'P67 must preserve the host shell and Atlas style: ' + name);
  }
  const context = {module:{exports:{}}, URL, URLSearchParams};
  vm.runInNewContext(readBytes(root,'public/cqc/src/cqc-p63-source-atlas.js').toString('utf8'),context,{filename:'cqc-p63-source-atlas.js'});
  const api = context.module.exports, normalized = api.normalizeCatalog(atlas);
  ensure(normalized.length === 48 + selected.length, 'P67 sources failed runtime catalogue normalization');
  ensure(jsonDigest(normalized.slice(0,48)) === 'af6948b68f48576e4f67f8ad77df1f6282dd131c1b63e9655090fcd05f0649ad', 'P67 controller altered a historical normalized dossier');
  for (const row of added) {
    const source = selectedById.get(row.id); ensure(source,'Unknown P67 atlas source: ' + row.id);
    ensure(row.path === '../' + source.path.slice('public/cqc/'.length), row.id + ': atlas path mismatch');
    for (const key of ['assetId','label','episode','episodeKey','bytes','width','height','sha256','gitBlobSha','kind','workIds','referenceURLs','qaNotes','scope','bibleURL']) assert.deepEqual(row[key],source[key],row.id + ': atlas ' + key + ' mismatch');
    ensure(Object.hasOwn(api.EPISODES,row.episodeKey),row.id + ': unknown explicit edition key');
    const visible = api.filterAssets(normalized,{episode:row.episodeKey,kind:row.kind,query:row.label});
    ensure(visible.some(candidate=>candidate.id===row.id),row.id + ': new dossier not searchable with its edition/category filters');
    ensure(visible.every(candidate=>candidate.episode===row.episodeKey),row.id + ': title filter leaks another edition');
    ensure(Array.isArray(row.referenceURLs) && row.referenceURLs.length > 0 && row.referenceURLs.every(url => api.referenceURL(url)),row.id + ': invalid references');
    ensure(Array.isArray(row.qaNotes) && row.qaNotes.length > 0 && row.fidelityStatus === 'pending_external_review',row.id + ': missing fidelity reservations');
  }
  ensure(bible.schema === 'cqc.bible.asset-associations-p67.v1' && bible.counts.selectedSources === selected.length && bible.counts.totalSelected === 225 + selected.length, 'P67 bible counts/schema mismatch');
  assert.deepEqual(bible.counts,delivery.counts,'Bible and delivery counts differ');
  assert.deepEqual(bible.archives,archives,'Bible and delivery archives differ');
  assert.deepEqual(bible.blockedRequests,blocked,'Bible and delivery blocked requests differ');
  const bibleRows = unique(bible.assets,'id','bible'); ensure(bibleRows.size === selected.length,'P67 bible count mismatch');
  for (const source of selected) {
    const row = bibleRows.get(source.id); ensure(row,source.id + ': missing bible association');
    for (const key of ['assetId','label','episode','episodeKey','path','bytes','width','height','sha256','gitBlobSha','kind','workIds','referenceURLs','qaNotes','scope','guideSections','bibleURL']) assert.deepEqual(row[key],source[key],source.id + ': bible ' + key + ' mismatch');
    ensure(Array.isArray(row.guideSections) && row.guideSections.length > 0 && Array.isArray(row.workIds) && row.workIds.length > 0,source.id + ': missing bible links');
    ensure(row.runtimeIntegrated === false && row.scopeClosed === false && row.runtimeBinding?.status === 'atlas_only' && row.runtimeBinding?.admittedByThisPass === false,source.id + ': invalid combat binding or closure claim');
  }
  const published = readdirSync(resolve(root,'public/cqc/assets/p67')).filter(name=>name.endsWith('.png')).sort();
  assert.deepEqual(published,selected.map(row=>posix.basename(row.path)).sort(),'Unlisted PNG in published P67 folder');
  const newPaths = selected.map(row=>row.path.slice('public/cqc/'.length));
  const runtimeProof = verifyP67RuntimeExtension(baseRuntime,runtime,newPaths);
  const proposed = await extendP67RuntimeManifest(baseRuntime,resolve(root,'public/cqc'),baseAtlas);
  assert.deepEqual(runtime,proposed,'Committed runtime differs from scanner-backed P67 proposal');
  const archiveHashes = new Set(archives.map(row=>row.sha256));
  ensure(runtime.files.every(row=>!archiveHashes.has(row.sha256)),'Archived attempt appears in the runtime');
  return {schema:'cqc.p67.local-verification.v1',status:'passed',checkedAt:new Date().toISOString(),nodeVersion:process.version,baseCommit:P66_COMMIT,
    counts:{selectedSources:selected.length,archivedAttempts:archives.length,generatedPNGs:selected.length+archives.length,blockedRequests:blocked.length,generationRequests:delivery.counts.generationRequests,totalSelected:225+selected.length,atlasSources:atlas.assets.length},historical,
    checks:{historical225EntriesUnchanged:true,historical18ArchivesPreserved:true,old48AtlasEntriesUnchanged:true,old48NormalizedDossiersUnchanged:true,hostShellAndAtlasStyleBytesUnchanged:true,atlasControllerAndFilterSupportExtended:true,newDossiersSearchableByEditionAndCategory:true,changedRuntimeOwnersExplicitlyBounded:true,reviewedBatchComplete:true,pngStructureCrcHashesAndDecompression:true,runtimeCatalogNormalization:true,deliveryAtlasBibleBijections:true,combatAndCertificationFlagsFalse:true,archivesExcluded:true,blockedRequestsHaveNoFiles:true,realScannerMatchesManifest:true},
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
    ensure(roots.length <= 1, 'Usage: node scripts/check-cqc-p67.mjs [repository-root] [--baseline-only] [--baseline-dir directory] [--git-repository directory]');
    console.log(JSON.stringify(await verifyP67(resolve(roots[0] || process.cwd()),options),null,2));
  } catch (error) { console.error('P67 verification failed: ' + error.message); process.exitCode = 1; }
}
