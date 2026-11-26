// Read-only P68 integrity gate against the independently published P67 tree.
// node scripts/check-cqc-p68.mjs [repository-root] [--baseline-only]
//   [--baseline-dir directory] [--git-repository directory]
// Writes one JSON result to stdout; never changes files or fetches Git objects.
import assert from 'node:assert/strict';
import {constants, existsSync, openSync, closeSync, fstatSync, readSync, readdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {resolve, posix} from 'node:path';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';
import {verifyStaticPng} from './check-cqc-p64.mjs';
import {extendP63RuntimeManifest} from './extend-cqc-p63-runtime.mjs';

export const P67_COMMIT = '0a92d18aa7bb4068f0be0265bf01d884e3404e95';
const P67_TREE = '9ba36a3f8a44c1711fc16c4f8a5546147550e230';
const ATLAS = 'data/cqc-p63-source-atlas.json';
const DELIVERY = 'docs/cqc-reprise/pass68/delivery-manifest.json';
const BIBLE = 'docs/cqc-bible/asset-associations-p68.json';
const REVIEW = 'docs/cqc-reprise/pass68/reviewed-batch.json';
const RECOVERY = 'docs/cqc-reprise/local-recovery-20261126';
const RECOVERY_MANIFEST_SHA256 = 'b9e9a5345cabcaf296401cc20af861a6753636c7a28ae0fab8a8788670b3d95c';
// Frozen after the root's final visual selection, separately from the delivery.
const REVIEWED_BATCH_SHA256 = 'b9a101e60f22235c398bf285db3232cb1ac5d75099f749d369f0c81c7401517b';
const FALSE_FLAGS = ['runtimeIntegrated', 'combatReady', 'combatRuntimeIntegrated', 'absolute1to1Certified'];
const PINNED_FILES = Object.freeze({
  'public/cqc/data/cqc-p63-source-atlas.json': 'a7d981dab8f80ee607e12004d7d66817b4447160',
  'public/cqc/runtime-manifest.json': 'fb348ad5dfa865b00190d2549a936c35f9d4f452',
  'docs/cqc-bible/asset-associations.json': 'fdde971b01abbaba3675442ce90b4433287ab1fc',
  'docs/cqc-bible/asset-associations-p63.json': 'ce28b6a4f30fd16f55b520b3b4478d30d0d8bc8e',
  'docs/cqc-bible/asset-associations-p64.json': 'b17679835b1236ecaa299c8b42eadbc07f59f0b1',
  'docs/cqc-bible/asset-associations-p65.json': 'b8d8c504f8b07c61c0abf11663a0ed17b94fc13d',
  'docs/cqc-bible/asset-associations-p66.json': '98ec8b9c175b8f49484d503735eecb01c03a2728',
  'docs/cqc-bible/asset-associations-p67.json': '0a51e2352f2c472ccdf3e1247786dc62816bce5e'
});
const HISTORICAL_REGISTRIES = Object.keys(PINNED_FILES).filter(name => name.startsWith('docs/'));
// The three native reference images are exact copies of already published
// P66/P67 blobs. Pin them independently of the new delivery's provenance fields.
const PINNED_REFERENCE_FILES = Object.freeze({
  'docs/cqc-reprise/pass68/research/classic/references/mg1-msx-enemies-native.png': {
    sourcePath: 'docs/cqc-reprise/pass67/research/classic/references/mg1-msx-enemies-native.png',
    bytes: 23526, sha256: '148912028441b199391af77faca0610258bec994f95328111749fb53265ccf95',
    gitBlobSha: '1c6fe5578f94ac2ed94c05e5f9982ccdfaadc873'
  },
  'docs/cqc-reprise/pass68/research/classic/references/mg1-nes-enemies-native.png': {
    sourcePath: 'docs/cqc-reprise/pass67/research/classic/references/mg1-nes-enemies-native.png',
    bytes: 11248, sha256: '3f20f028580aea6049a2b0e5933b9039dc383dcd8eb68b6389477fdef619b1fb',
    gitBlobSha: '9de5e5b8c3af374d212fdb752230d7de4e51d543'
  },
  'docs/cqc-reprise/pass68/research/survive/references/native-balloon-trap-220401_12.jpg': {
    sourcePath: 'docs/cqc-reprise/pass66/research/survive/references/native-air-cannon-220401_12.jpg',
    bytes: 292612, sha256: '6aa3590b40a45424cbd054f373bbf257b9c9da81747dc6b05a7253e6d06d147b',
    gitBlobSha: '2622177ae31c7c46e7c30693d6276033b6345560'
  }
});
const ensure = (condition, message) => { if (!condition) throw Error(message); };
const hash = (algorithm, bytes) => createHash(algorithm).update(bytes).digest('hex');
const digest = value => hash('sha256', JSON.stringify(value));
const gitBlobHash = bytes => createHash('sha1').update('blob ' + bytes.length + '\0').update(bytes).digest('hex');
const edgeKey = row => row.from + '\0' + row.to;
const idPattern = /^[a-z0-9][a-z0-9_-]{0,119}$/;

function canonicalPath(name) {
  ensure(typeof name === 'string' && name && !/[\x00-\x1f\\]/.test(name) &&
    !posix.isAbsolute(name) && !name.split('/').some(part => !part || part === '.' || part === '..'),
  'Invalid repository-relative path: ' + name);
  return name;
}
function readBytes(root, name) {
  const fd = openSync(resolve(root, canonicalPath(name)), constants.O_RDONLY | constants.O_NOFOLLOW | constants.O_NOATIME);
  try {
    const stat = fstatSync(fd); ensure(stat.isFile(), 'Not a regular file: ' + name);
    const bytes = Buffer.alloc(stat.size); let offset = 0;
    while (offset < bytes.length) {
      const count = readSync(fd, bytes, offset, bytes.length - offset, null);
      ensure(count > 0, 'Short file read: ' + name); offset += count;
    }
    return bytes;
  } finally { closeSync(fd); }
}
const readJson = (root, name) => JSON.parse(readBytes(root, name));
function unique(rows, key, label) {
  ensure(Array.isArray(rows), label + ': expected an array'); const map = new Map();
  for (const row of rows) {
    ensure(row && typeof row[key] === 'string' && row[key] && !map.has(row[key]), label + ': missing or duplicate ' + key);
    map.set(row[key], row);
  }
  return map;
}
function git(root, options, args, maxBuffer = 4 * 1024 * 1024) {
  return execFileSync('git', args, {cwd: options.gitRepository || root, maxBuffer,
    env: {...process.env, GIT_NO_LAZY_FETCH: '1'}});
}
function pinnedJson(root, name, options) {
  const bytes = options.baselineRoot ? readBytes(options.baselineRoot, name) : git(root, options, ['show', P67_COMMIT + ':' + name]);
  ensure(PINNED_FILES[name] && gitBlobHash(bytes) === PINNED_FILES[name], 'Untrusted P67 baseline bytes: ' + name);
  return JSON.parse(bytes);
}
function rejectPositiveClaims(value, location = 'document') {
  if (!value || typeof value !== 'object') return;
  for (const [key, child] of Object.entries(value)) {
    ensure(![...FALSE_FLAGS, 'scopeClosed', 'nativePixelExact', 'nativeUhd', 'referenceGeometryValidated'].includes(key) || child !== true,
      'Unsupported certification or admission: ' + location + '.' + key);
    rejectPositiveClaims(child, location + '.' + key);
  }
}
function recursiveFiles(root, directory) {
  const result = [];
  for (const entry of readdirSync(resolve(root, canonicalPath(directory)), {withFileTypes: true})) {
    const name = directory + '/' + entry.name;
    if (entry.isDirectory()) result.push(...recursiveFiles(root, name));
    else { ensure(entry.isFile(), 'Unexpected nonregular archive entry: ' + name); result.push(name); }
  }
  return result;
}

export function verifyP67History(root, options = {}) {
  ensure(git(root, options, ['rev-parse', P67_COMMIT + '^{tree}']).toString('utf8').trim() === P67_TREE,
    'The P67 Git commit does not resolve to the pinned published tree');
  const sources = [], archives = [], registries = [];
  for (const name of HISTORICAL_REGISTRIES) {
    const baseline = pinnedJson(root, name, options), bytes = readBytes(root, name), current = JSON.parse(bytes);
    ensure(gitBlobHash(bytes) === PINNED_FILES[name], 'Historical registry byte identity changed: ' + name);
    assert.deepEqual(current, baseline, 'Historical registry changed: ' + name);
    ensure(Array.isArray(current.assets) && current.assets.every(row => row.selected === true), 'Invalid historical selected sources');
    sources.push(...current.assets); archives.push(...(current.archives || []));
    registries.push({path: name, entries: current.assets.length, archives: (current.archives || []).length,
      bytes: bytes.length, gitBlobSha: PINNED_FILES[name], sha256: hash('sha256', bytes)});
  }
  ensure(sources.length === 254 && archives.length === 19, 'Expected 254 selected sources and 19 archives from six P67 registries');
  unique(sources, 'assetId', 'historical sources'); unique([...sources, ...archives], 'path', 'historical source files');
  const paths = [...Object.keys(PINNED_FILES), ...sources.map(row => row.path), ...archives.map(row => row.path),
    ...Object.values(PINNED_REFERENCE_FILES).map(row => row.sourcePath)];
  const tree = new Map(git(root, options, ['ls-tree', '-rz', P67_COMMIT, '--', ...paths]).toString('utf8').split('\0').filter(Boolean).map(record => {
    const [metadata, name] = record.split('\t'); const [mode, type, sha] = metadata.split(' '); return [name, {mode, type, sha}];
  }));
  ensure(tree.size === paths.length, 'Pinned P67 tree does not contain every historical registry, runtime owner, image and archive');
  for (const [name, sha] of Object.entries(PINNED_FILES)) ensure(tree.get(name)?.type === 'blob' && tree.get(name).sha === sha,
    'Baseline file is not backed by the published P67 tree: ' + name);
  for (const reference of Object.values(PINNED_REFERENCE_FILES)) ensure(tree.get(reference.sourcePath)?.type === 'blob' &&
    tree.get(reference.sourcePath).sha === reference.gitBlobSha, 'Native reference is not backed by the published P67 tree: ' + reference.sourcePath);
  let localSourceFilesHashed = 0, localArchiveFilesHashed = 0;
  for (const [rows, archived] of [[sources, false], [archives, true]]) for (const row of rows) {
    const record = tree.get(row.path);
    ensure(record?.type === 'blob' && record.mode === '100644' && record.sha === row.gitBlobSha,
      'Historical image differs from the published P67 tree: ' + row.path);
    if (existsSync(resolve(root, row.path))) {
      const bytes = readBytes(root, row.path);
      ensure(gitBlobHash(bytes) === row.gitBlobSha, 'Historical local image changed: ' + row.path);
      if (row.bytes !== undefined) ensure(bytes.length === row.bytes, 'Historical local byte count changed: ' + row.path);
      if (row.sha256 !== undefined) ensure(hash('sha256', bytes) === row.sha256, 'Historical local SHA256 changed: ' + row.path);
      if (archived) localArchiveFilesHashed++; else localSourceFilesHashed++;
    }
  }
  const byKind = {}; for (const row of sources) byKind[row.kind] = (byKind[row.kind] || 0) + 1;
  return {sources, archives, byKind, summary: {registries, selectedSources: 254, archivedAttempts: 19,
    pinnedSelectedBlobIdentities: 254, pinnedArchiveBlobIdentities: 19, pinnedNativeReferenceBlobIdentities: 3, localSourceFilesHashed,
    localArchiveFilesHashed, selectedMetadataDigest: digest(sources), archiveMetadataDigest: digest(archives)}};
}

export function verifyRecoveryArchive(root) {
  const manifestBytes = readBytes(root, RECOVERY + '/manifest.json');
  ensure(hash('sha256', manifestBytes) === RECOVERY_MANIFEST_SHA256, 'The frozen 53-file recovery manifest changed');
  const manifest = JSON.parse(manifestBytes);
  ensure(manifest.schema === 'cqc.local-recovery-manifest.v1' && manifest.files.length === 52, 'Invalid recovery manifest');
  const rows = unique(manifest.files, 'path', 'recovery manifest');
  let listedBytes = 0;
  for (const row of rows.values()) {
    const bytes = readBytes(root, RECOVERY + '/' + canonicalPath(row.path));
    ensure(bytes.length === row.bytes && hash('sha256', bytes) === row.sha256 && gitBlobHash(bytes) === row.gitBlobSha,
      'Recovery archive content changed: ' + row.path);
    listedBytes += bytes.length;
  }
  const actual = recursiveFiles(root, RECOVERY).map(name => name.slice(RECOVERY.length + 1)).sort();
  assert.deepEqual(actual, [...rows.keys(), 'manifest.json'].sort(), 'Recovery archive has missing or unlisted files');
  ensure(actual.length === 53 && listedBytes + manifestBytes.length === 716978 && manifest.counts.exactSourceCopies === 50,
    'Recovery archive count or byte total changed');
  const publicationPath = 'docs/cqc-reprise/pass68/recovery-publication-verification.json';
  let recordedPublication = null;
  if (existsSync(resolve(root, publicationPath))) {
    const proof = readJson(root, publicationPath);
    for (const [key, value] of Object.entries({schema: 'cqc.local-recovery.post-publication.v1', status: 'passed',
      commit: '97b19718581154374ecb8bbb299540fd4c8b0322', parent: P67_COMMIT,
      tree: '888a5a2910ec4c685ff6d69f86d6eff2bf898e52', added: 53, modified: 0, deleted: 0,
      verifiedBytes: 716978, remoteGitTreeRead: true, unchangedPreviousEntries: 23621, afterEntries: 23674})) {
      ensure(proof[key] === value, 'Recovery publication evidence differs: ' + key);
    }
    recordedPublication = {path: publicationPath, commit: proof.commit, tree: proof.tree,
      evidenceSha256: hash('sha256', readBytes(root, publicationPath)),
      scope: 'Checks the stored independently obtained publication evidence; this gate makes no network request.'};
  }
  return {files: 53, exactSourceCopies: 50, totalBytes: 716978, verifiedContentEntries: 52,
    manifestSha256: RECOVERY_MANIFEST_SHA256, manifestGitBlobSha: gitBlobHash(manifestBytes),
    olderPublishedSnapshotFiles: manifest.alreadyPublishedOlderSnapshot.files, recordedPublication};
}

function verifyReviewedBatch(root, delivery) {
  const bytes = readBytes(root, REVIEW), review = JSON.parse(bytes), sha256 = hash('sha256', bytes);
  ensure(typeof REVIEWED_BATCH_SHA256 === 'string' && sha256 === REVIEWED_BATCH_SHA256,
    'The root-reviewed batch must be finalized and its exact file hash pinned in this verifier');
  ensure(review.schema === 'cqc.p68.reviewed-batch.v1' && review.parentCommit === P67_COMMIT &&
    review.reviewer === '/root' && review.reviewComplete === true, 'Invalid explicit root review record');
  for (const [reviewKey, deliveryKey] of [['selected', 'assets'], ['archives', 'archives']]) {
    const reviewed = unique(review[reviewKey], 'id', 'root-reviewed ' + reviewKey);
    assert.deepEqual([...reviewed.keys()].sort(), delivery[deliveryKey].map(row => row.id).sort(), 'Reviewed batch ID set differs: ' + reviewKey);
    for (const row of delivery[deliveryKey]) {
      const expected = reviewed.get(row.id);
      ensure(expected.sha256 === row.sha256 && expected.gitBlobSha === row.gitBlobSha,
        'Reviewed image byte identity differs: ' + row.id);
    }
  }
  assert.deepEqual([...(review.blockedIds || [])].sort(), delivery.blockedRequests.map(row => row.id).sort(), 'Reviewed blocked-request IDs differ');
  return {path: REVIEW, reviewer: review.reviewer, sha256, selected: review.selected.length, archives: review.archives.length};
}

function verifyReferenceAndBibleLinks(root, row, guideIds) {
  ensure(Array.isArray(row.referenceFiles) && row.referenceFiles.length > 0, row.id + ': missing archived reference files');
  const references = new Set([...row.referenceFiles, ...(row.generation?.referenceFiles || [])]);
  for (const name of references) {
    const pinned = PINNED_REFERENCE_FILES[canonicalPath(name)], bytes = readBytes(root, name);
    ensure(pinned && bytes.length === pinned.bytes && hash('sha256', bytes) === pinned.sha256 && gitBlobHash(bytes) === pinned.gitBlobSha,
      row.id + ': native reference bytes differ from their pinned published source: ' + name);
  }
  ensure(row.generation?.tool === 'image_gen.imagegen' && typeof row.generation.promptFile === 'string', row.id + ': missing image-generation provenance');
  if (row.generation.mode === 'edit' || row.generation.inputTargetPath !== undefined) {
    const target = canonicalPath(row.generation.inputTargetPath);
    ensure(target !== row.path && /^[a-f0-9]{64}$/.test(row.generation.inputTargetSha256), row.id + ': invalid or self-referential image edit target');
    ensure(hash('sha256', readBytes(root, target)) === row.generation.inputTargetSha256, row.id + ': image edit target hash differs');
  }
  for (const snapshot of row.generation.inputSnapshots || []) {
    ensure(snapshot && typeof snapshot === 'object' && /^[a-f0-9]{64}$/.test(snapshot.sha256), row.id + ': unbound input snapshot');
    ensure(hash('sha256', readBytes(root, canonicalPath(snapshot.path))) === snapshot.sha256, row.id + ': input snapshot hash differs');
  }
  const prompt = readBytes(root, row.generation.promptFile).toString('utf8');
  ensure(prompt.trim().length > 0, row.id + ': empty prompt');
  if (typeof row.generation.exactPrompt === 'string') ensure(prompt.trimEnd() === row.generation.exactPrompt.trimEnd(), row.id + ': prompt file differs from recorded exact prompt');
  if (row.generation.planRecord) readJson(root, canonicalPath(row.generation.planRecord));
  if (!row.selected) return {referenceFiles: references.size, promptFiles: 1, bibleAnchors: 0};
  ensure(Array.isArray(row.guideSections) && row.guideSections.length > 0 && row.guideSections.every(id => guideIds.has(id)), row.id + ': invalid guide section association');
  ensure(Array.isArray(row.workIds) && row.workIds.length > 0 && row.workIds.every(id => typeof id === 'string' && id.trim()), row.id + ': missing work IDs');
  ensure(row.runtimeBinding?.status === 'atlas_only' && row.runtimeBinding?.admittedByThisPass === false &&
    row.runtimeBinding?.catalogPath === 'public/cqc/' + ATLAS, row.id + ': invalid runtime binding');
  const url = new URL(row.bibleURL);
  ensure(url.protocol === 'https:' && url.hostname === 'github.com' && !url.username && !url.password &&
    url.pathname.startsWith('/darknigthmare/shadow-codec-ops/blob/') &&
    url.pathname.endsWith('/docs/cqc-bible/CONTINUATION_P68.md') && decodeURIComponent(url.hash.slice(1)) === row.id,
  row.id + ': invalid bible URL');
  const bibleText = readBytes(root, 'docs/cqc-bible/CONTINUATION_P68.md').toString('utf8');
  ensure(new RegExp('<a\\s+id=["\']' + row.id + '["\'][^>]*>').test(bibleText), row.id + ': missing explicit bible anchor');
  return {referenceFiles: references.size, promptFiles: 1, bibleAnchors: 1};
}

function verifyRuntime(root, base, current, selected) {
  ensure(base.files.length === 3090 && base.references.length === 5026, 'Unexpected pinned P67 runtime size');
  const newPaths = selected.map(row => row.path.slice('public/cqc/'.length));
  ensure(new Set(newPaths).size === newPaths.length, 'Duplicate new runtime path');
  const baseRows = unique(base.files, 'path', 'P67 runtime'), rows = unique(current.files, 'path', 'P68 runtime');
  ensure(rows.size === baseRows.size + newPaths.length && newPaths.every(name => !baseRows.has(name)), 'Unexpected or reused runtime file path');
  const allowed = new Set([...baseRows.keys(), ...newPaths]);
  for (const name of rows.keys()) ensure(allowed.has(name), 'Unlisted new runtime file: ' + name);
  let unchangedLocalFilesHashed = 0;
  for (const [name, row] of baseRows) {
    ensure(rows.has(name), 'Historical runtime file removed: ' + name);
    if (name === ATLAS) continue;
    assert.deepEqual(rows.get(name), row, 'Historical runtime metadata changed: ' + name);
    if (existsSync(resolve(root, 'public/cqc/' + name))) {
      const bytes = readBytes(root, 'public/cqc/' + name);
      ensure(bytes.length === row.bytes && hash('sha256', bytes) === row.sha256, 'Historical runtime local file changed: ' + name);
      unchangedLocalFilesHashed++;
    }
  }
  for (const key of new Set([...Object.keys(base), ...Object.keys(current)])) {
    if (!['files', 'references', 'totalBytes'].includes(key)) assert.deepEqual(current[key], base[key], 'Historical runtime policy/field changed: ' + key);
  }
  const baseEdges = new Set(base.references.map(edgeKey)), edges = new Set(), graph = new Map();
  for (const edge of current.references) {
    ensure(rows.has(edge.from) && rows.has(edge.to) && !edges.has(edgeKey(edge)), 'Invalid or duplicate runtime reference');
    edges.add(edgeKey(edge)); if (!graph.has(edge.from)) graph.set(edge.from, []); graph.get(edge.from).push(edge.to);
  }
  for (const key of baseEdges) ensure(edges.has(key), 'Historical runtime edge removed: ' + key.replace('\0', ' -> '));
  const expected = new Set(newPaths.map(to => edgeKey({from: ATLAS, to})));
  for (const key of edges) if (!baseEdges.has(key)) ensure(expected.delete(key), 'Unexpected new runtime edge: ' + key.replace('\0', ' -> '));
  ensure(expected.size === 0, 'New selected PNG lacks its catalogue edge');
  const reachable = new Set([current.entry]), queue = [current.entry];
  for (const from of queue) for (const to of graph.get(from) || []) if (!reachable.has(to)) { reachable.add(to); queue.push(to); }
  ensure(reachable.size === rows.size, 'Runtime graph has unreachable file rows');
  ensure(Number.isSafeInteger(current.totalBytes) && current.totalBytes === current.files.reduce((sum, row) => sum + row.bytes, 0), 'Runtime byte total differs');
  return {baselineFiles: 3090, unchangedRows: 3089, unchangedLocalFilesHashed, changedOwners: [ATLAS],
    preservedReferences: 5026, addedFiles: newPaths.length, addedReferences: edges.size - baseEdges.size,
    files: rows.size, references: edges.size, reachable: reachable.size, totalBytes: current.totalBytes,
    byteDelta: current.totalBytes - base.totalBytes, omittedReferences: base.omittedReferences.length,
    externalRoutes: base.externalReferences.entries.length, externalPolicySha256: digest(base.externalReferences)};
}

export async function verifyP68(root, {baselineOnly = false, ...options} = {}) {
  const historical = verifyP67History(root, options);
  const baseAtlas = pinnedJson(root, 'public/cqc/' + ATLAS, options);
  const baseRuntime = pinnedJson(root, 'public/cqc/runtime-manifest.json', options);
  ensure(baseAtlas.assets.length === 77, 'Expected the 77-entry published P67 catalogue');
  const recovery = verifyRecoveryArchive(root);
  const common = {baseCommit: P67_COMMIT, baseTree: P67_TREE, historical: historical.summary, recovery};
  if (baselineOnly) return {schema: 'cqc.p68.baseline-verification.v1', status: 'passed', ...common};
  const delivery = readJson(root, DELIVERY), bible = readJson(root, BIBLE), atlas = readJson(root, 'public/cqc/' + ATLAS);
  ensure(delivery.schema === 'cqc.p68.delivery.v1' && bible.schema === 'cqc.bible.asset-associations-p68.v1' &&
    delivery.parentCommit === P67_COMMIT && delivery.previousSelected === 254, 'Invalid P68 delivery/bible schema or baseline');
  assert.deepEqual({...delivery, schema: bible.schema}, bible, 'Bible and delivery must be identical apart from their schema');
  const selected = delivery.assets, archives = delivery.archives, blocked = delivery.blockedRequests;
  unique([...selected, ...archives, ...blocked], 'id', 'P68 delivery'); unique([...selected, ...archives], 'path', 'P68 PNG paths');
  unique([...selected, ...archives], 'sha256', 'P68 PNG outputs'); unique(selected, 'assetId', 'P68 source identities');
  ensure(selected.length > 0, 'P68 must contain a reviewed selected source');
  const reviewedBatch = verifyReviewedBatch(root, delivery);
  const counts = delivery.counts;
  for (const [key, expected] of Object.entries({selectedSources: selected.length, archivedAttempts: archives.length,
    generatedPNGs: selected.length + archives.length, blockedRequests: blocked.length, previousSelected: 254,
    totalSelected: 254 + selected.length, previousArchivedAttempts: 19, totalArchivedAttempts: 19 + archives.length,
    atlasSources: 77 + selected.length, combatAdmissions: 0, absolute1to1Certifications: 0})) {
    ensure(counts[key] === expected, 'P68 count mismatch: ' + key);
  }
  ensure(counts.generationRequests === selected.length + archives.length + blocked.reduce((sum, row) => sum + row.attempts, 0), 'Generation request count mismatch');
  const byKind = {}, byEpisode = {}, allPassesByKind = {...historical.byKind};
  for (const row of selected) {
    byKind[row.kind] = (byKind[row.kind] || 0) + 1; byEpisode[row.episodeKey] = (byEpisode[row.episodeKey] || 0) + 1;
    allPassesByKind[row.kind] = (allPassesByKind[row.kind] || 0) + 1;
  }
  for (const [key, value] of Object.entries({byKind, byEpisode, allPassesByKind})) assert.deepEqual(counts[key], value, 'P68 count breakdown mismatch: ' + key);
  if (counts.editionCount !== undefined) ensure(counts.editionCount === Object.keys(byEpisode).length, 'Edition count mismatch');
  ensure(counts.selectedBytes === selected.reduce((sum, row) => sum + row.bytes, 0) &&
    counts.archivedBytes === archives.reduce((sum, row) => sum + row.bytes, 0), 'P68 generated image byte total mismatch');
  const oldIds = new Set(historical.sources.map(row => row.assetId)), oldHashes = new Set([...historical.sources, ...historical.archives].map(row => row.sha256));
  const guide = readJson(root, delivery.requirementsGuide), guideIds = new Set(guide.sections.map(row => row.id));
  const pngs = [], links = [];
  for (const [records, isSelected] of [[selected, true], [archives, false]]) for (const row of records) {
    const pattern = isSelected ? /^public\/cqc\/assets\/p68\/[a-z0-9][a-z0-9_-]*\.png$/ : /^docs\/cqc-reprise\/pass68\/.+\.png$/;
    ensure(idPattern.test(row.id) && pattern.test(canonicalPath(row.path)) && row.selected === isSelected &&
      row.atlasIntegrated === isSelected && row.sourceGenerated === true && row.pass === 'P68' && row.scopeClosed === false,
    row.id + ': invalid P68 identity, path, pass or selection flag');
    for (const key of FALSE_FLAGS) ensure(row[key] === false, row.id + ': ' + key + ' must remain explicitly false');
    ensure(row.referenceGeometryValidated === false && row.nativeUhd === false && row.fidelityStatus === 'pending_external_review', row.id + ': missing fidelity limitations');
    if (isSelected) ensure(row.assetId === 'asset:p68:' + row.id && !oldIds.has(row.assetId) && !oldHashes.has(row.sha256), row.id + ': reused historical source identity/content');
    for (const key of ['bytes', 'width', 'height']) ensure(Number.isSafeInteger(row[key]) && row[key] > 0, row.id + ': invalid ' + key);
    ensure(/^[a-f0-9]{64}$/.test(row.sha256) && /^[a-f0-9]{40}$/.test(row.gitBlobSha), row.id + ': invalid PNG identity');
    const proof = verifyStaticPng(readBytes(root, row.path), row);
    ensure(row.bitDepth === proof.bitDepth && row.colorMode === (proof.colorType === 6 ? 'RGBA' : 'RGB'), row.id + ': PNG color metadata differs');
    if (row.pngIntegrity) ensure(row.pngIntegrity.crcValid === true && row.pngIntegrity.allChunksParsed === true &&
      row.pngIntegrity.idatDecompressionValid === true && row.pngIntegrity.trailingBytes === 0 &&
      row.pngIntegrity.decodedScanlineBytes === proof.inflatedBytes, row.id + ': reported PNG integrity differs');
    pngs.push(proof); links.push(verifyReferenceAndBibleLinks(root, row, guideIds));
  }
  for (const row of blocked) {
    ensure(idPattern.test(row.id) && row.status === 'blocked_by_image_tool' && row.hasOutputFile === false &&
      row.selected === false && row.atlasIntegrated === false && row.retried === false && row.attempts === 1, row.id + ': invalid blocked request');
    for (const key of ['path', 'bytes', 'sha256', 'gitBlobSha']) ensure(!Object.hasOwn(row, key), row.id + ': blocked request claims a file');
    for (const key of FALSE_FLAGS) ensure(row[key] === false, row.id + ': blocked request claims combat or certification');
    if (row.promptFile) readBytes(root, row.promptFile);
  }
  for (const [name, document] of [['delivery', delivery], ['bible', bible], ['atlas', atlas]]) rejectPositiveClaims(document, name);
  ensure(atlas.schema === baseAtlas.schema && atlas.sourcePass === baseAtlas.sourcePass + '+P68', 'P68 catalogue schema/sourcePass mismatch');
  ensure(JSON.stringify(atlas.assets.slice(0, 77)) === JSON.stringify(baseAtlas.assets), 'The 77 historical Atlas objects must remain exactly serialized and in order');
  for (const key of new Set([...Object.keys(baseAtlas), ...Object.keys(atlas)])) {
    if (!['assets', 'sourcePass', 'asOf', 'description'].includes(key)) assert.deepEqual(atlas[key], baseAtlas[key], 'Historical catalogue field changed: ' + key);
  }
  unique(atlas.assets, 'id', 'Atlas identities'); unique(atlas.assets, 'path', 'Atlas paths');
  const added = atlas.assets.slice(77);
  assert.deepEqual(added.map(row => row.id), selected.map(row => row.id), 'P68 delivery and Atlas selected order differ');
  const context = {module: {exports: {}}, URL, URLSearchParams};
  vm.runInNewContext(readBytes(root, 'public/cqc/src/cqc-p63-source-atlas.js').toString('utf8'), context,
    {filename: 'cqc-p63-source-atlas.js', timeout: 1000});
  const api = context.module.exports, normalizedBase = api.normalizeCatalog(baseAtlas), normalized = api.normalizeCatalog(atlas);
  ensure(normalized.length === 77 + selected.length && digest(normalized.slice(0, 77)) === digest(normalizedBase), 'Historical normalized Atlas dossier changed');
  for (let i = 0; i < added.length; i++) {
    const row = added[i], source = selected[i];
    ensure(row.path === '../' + source.path.slice('public/cqc/'.length) && row.pass === 'P68' &&
      row.selected === true && row.sourceGenerated === true && row.atlasIntegrated === true, row.id + ': invalid Atlas source');
    for (const key of FALSE_FLAGS) ensure(row[key] === false, row.id + ': Atlas ' + key + ' must remain false');
    for (const key of ['assetId', 'label', 'episode', 'episodeKey', 'bytes', 'width', 'height', 'sha256', 'gitBlobSha', 'kind', 'workIds', 'referenceURLs', 'qaNotes', 'scope', 'bibleURL'])
      assert.deepEqual(row[key], source[key], row.id + ': Atlas/source mismatch: ' + key);
    ensure(Object.hasOwn(api.EPISODES, row.episodeKey) && Object.hasOwn(api.KINDS, row.kind), row.id + ': unsupported episode or kind');
    ensure(Array.isArray(row.referenceURLs) && row.referenceURLs.length > 0 && row.referenceURLs.every(url => api.referenceURL(url)), row.id + ': invalid reference URL');
    ensure(Array.isArray(row.qaNotes) && row.qaNotes.length > 0, row.id + ': missing QA reservations');
    const filtered = api.filterAssets(normalized, {episode: row.episodeKey, kind: row.kind, query: row.label});
    ensure(filtered.some(candidate => candidate.id === row.id) && filtered.every(candidate => candidate.episode === row.episodeKey), row.id + ': filter reachability or edition isolation failed');
  }
  const selectedFiles = recursiveFiles(root, 'public/cqc/assets/p68');
  assert.deepEqual(selectedFiles.sort(), selected.map(row => row.path).sort(), 'Unlisted or missing file in the selected P68 asset directory');
  const runtime = readJson(root, 'public/cqc/runtime-manifest.json');
  const runtimeProof = verifyRuntime(root, baseRuntime, runtime, selected);
  const proposed = await extendP63RuntimeManifest(baseRuntime, resolve(root, 'public/cqc'), [ATLAS, ...selected.map(row => row.path.slice('public/cqc/'.length))]);
  assert.deepEqual(runtime, proposed, 'Runtime differs from the real scanner proposal for the catalogue and new selected PNGs');
  const archiveHashes = new Set(archives.map(row => row.sha256));
  ensure(runtime.files.every(row => !archiveHashes.has(row.sha256)), 'A rejected/archived output was admitted to the runtime');
  return {schema: 'cqc.p68.local-verification.v1', status: 'passed', checkedAt: new Date().toISOString(), nodeVersion: process.version,
    ...common, reviewedBatch, counts: {selectedSources: selected.length, archivedAttempts: archives.length, generatedPNGs: pngs.length,
      totalSelected: 254 + selected.length, atlasSources: atlas.assets.length, referenceFileUsesVerified: links.reduce((sum, row) => sum + row.referenceFiles, 0),
      promptFilesVerified: links.length, bibleAnchorsVerified: links.reduce((sum, row) => sum + row.bibleAnchors, 0)},
    checks: {historicalSixRegistriesByteIdentical: true, historical254SelectedAnd19ArchivesPinned: true,
      historical77AtlasObjectsOrderedAndIdentical: true, historicalNormalizedDossiersUnchanged: true,
      deliveryBibleEqualApartFromSchema: true, reviewedBatchIdentitiesPinned: true,
      pngCrcDecompressionHashesAndRealAlphaVerified: true, referenceFilesPromptsAndBibleAnchorsPresent: true,
      runtimeOnlyCatalogueAndSelectedPngsChanged: true, historical3089OtherRowsAnd5026EdgesPreserved: true,
      externalPolicyPreserved: true, realScannerProposalMatches: true, recovery53FilesVerified: true},
    runtime: runtimeProof, pngs, limits: ['Absent historical PNGs are checked through their exact published Git-tree identities, without downloading them.',
      'PNG integrity and transparency checks do not certify visual 1:1 fidelity.',
      'Reachability and normalization checks do not establish combat integration or browser execution.']};
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
    ensure(roots.length <= 1, 'Expected at most one repository-root argument');
    console.log(JSON.stringify(await verifyP68(resolve(roots[0] || process.cwd()), options), null, 2));
  } catch (error) {
    console.log(JSON.stringify({schema: 'cqc.p68.local-verification.v1', status: 'failed', baseCommit: P67_COMMIT, error: error.message}, null, 2));
    process.exitCode = 1;
  }
}
