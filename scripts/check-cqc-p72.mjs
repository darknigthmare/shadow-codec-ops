// Read-only P72 gate against the pinned published P71 state.
// node scripts/check-cqc-p72.mjs [root] [--baseline-dir dir] [--proposal-only]
// Historical binaries absent from the checkout are not fetched or rewritten.
import assert from 'node:assert/strict';
import {openSync, readFileSync, closeSync, constants, existsSync, readdirSync, lstatSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';
import {verifyStaticPng} from './check-cqc-p64.mjs';
import {P71_COMMIT, ATLAS_PATH, P72_IMAGES, extendP72RuntimeManifest, verifyP72RuntimeExtension} from './extend-cqc-p72-runtime.mjs';

const PASS = 'docs/cqc-reprise/pass72/';
const BIBLE = 'docs/cqc-bible/';
const FALSE_FLAGS = ['runtimeIntegrated', 'combatReady', 'combatRuntimeIntegrated', 'absolute1to1Certified',
  'referenceGeometryValidated', 'nativePixelExact', 'nativeUhd', 'scopeClosed'];
const HISTORICAL_REGISTRIES = [BIBLE + 'asset-associations.json',
  ...[63,64,65,66,67,68,69,71].map(n => BIBLE + 'asset-associations-p' + n + '.json')];
const HISTORICAL_DOCUMENTS = ['guide-map.json', 'requirements-source.json',
  'extension-guide-map-p71.json', 'EXTENSIONS_GUIDE_P71.md'].map(name => BIBLE + name);
const GUIDE_PINS = [
  ['Combat_Games_Guide_General_v1.0.txt', 55172, '4844584616072ac0d52d37c2fab4365e1ec489240f17a721ee216e223b0355b7'],
  ['Combat_Games_Extension_01_Tag_Taunts_Bonus_v1.0.txt', 60589, '330fb7485a7a52b2a20f855646c940aaac0fcd9510032bc84b2e17c518edd25f'],
  ['Combat_Games_Extension_02_Slots_Verrouilles_Deblocages_Abonnes_v1.0.txt', 47334, '08b57ea542e83c487fef3276997a612d4657f2ee9ed4f8e46b0bf65a2778038b'],
];
const BASELINE_PINS = [
  {
    "path": "public/cqc/runtime-manifest.json",
    "bytes": 1682818,
    "sha256": "c295f6659389c36ade223fa67866e505ac7526d93bc122c80dbba772f9b9d36a"
  },
  {
    "path": "public/cqc/data/cqc-p63-source-atlas.json",
    "bytes": 271853,
    "sha256": "553efcde6c3f94f58c513c83fe36611f89933cb71c136539be2bfa1b19a92ab8"
  },
  {
    "path": "docs/cqc-bible/asset-associations-p71.json",
    "bytes": 70379,
    "sha256": "3f89712a3dd0abdb6e8e9d09489f49c2187950f4fd6c587ec7a2abc35c807fdd"
  },
  {
    "path": "docs/cqc-bible/asset-associations.json",
    "bytes": 899386,
    "sha256": "8fe1d434400a7ebc9ea70ae3b50ac73bb8d6550149486b88b82d3ede3dcf46e4"
  },
  {
    "path": "docs/cqc-bible/asset-associations-p69.json",
    "bytes": 104269,
    "sha256": "7641461f6cb14ca2d2a50017086042dd5c8c5bd93b2cbf71bfca70946cf5a3e9"
  },
  {
    "path": "docs/cqc-bible/asset-associations-p68.json",
    "bytes": 64630,
    "sha256": "ca9aeecac5a2a94a302e1d0f32da6b4b77c6575982ef9b8b62872a3e9ddb8a09"
  },
  {
    "path": "docs/cqc-bible/asset-associations-p67.json",
    "bytes": 239554,
    "sha256": "dd9136f2b3ac301b24d2ff482720e2d01452262eeda25d674496459bb730f44f"
  },
  {
    "path": "docs/cqc-bible/asset-associations-p66.json",
    "bytes": 109479,
    "sha256": "bbb43600930c4b6a94b1ee568f9da67bf38ccf4a7a55b845664448a22fa9a639"
  },
  {
    "path": "docs/cqc-bible/asset-associations-p65.json",
    "bytes": 40703,
    "sha256": "86b0732ce5cbba16c3b84cfd976a019bf1aa31ad4b4bf4b8fac4b9585bad1b22"
  },
  {
    "path": "docs/cqc-bible/asset-associations-p64.json",
    "bytes": 51476,
    "sha256": "13c9ef925908086f69b1e28412fe87b43230a91347af8278ec24d217b830869d"
  },
  {
    "path": "docs/cqc-bible/asset-associations-p63.json",
    "bytes": 56019,
    "sha256": "ccf4330624821dcd9d90c2bbef3009ea2491dcbf1acdf401cf187f49f9e24fdd"
  }
];
const OUTPUT_PINS = [
  {
    "id": "acid-patrol-bot",
    "sha256": "9e9811ba337190a262f2005d69a3338f4c4b5862426213176c2a2bc5989fd366",
    "gitBlobSha": "5a6c12ad57c4d61e304e5429376b5bff8bd05315"
  },
  {
    "id": "acid-surveillance-camera",
    "sha256": "ccdbb9030289ae6697ec054536d16c673156870818f599ec256df58ed24a7d91",
    "gitBlobSha": "586a7cd11224c6a8cd1993382521496d97e14346"
  },
  {
    "id": "acid-gun-camera",
    "sha256": "b285887db9712d7b67cbe2ba2779ccb56e887fe42b7af570217cc3f7a20033d1",
    "gitBlobSha": "07de49317852ca8446e4646605f2453449d907c1"
  },
  {
    "id": "survive-large-spiked-barricade",
    "sha256": "6871772cdc9b9bc43a7c87730c73a77f50ed3ce7ccb945e7991084ce070c8b2d",
    "gitBlobSha": "18f1b461b2aa6a3c941925c0d4c23f8279d3a8ce"
  },
  {
    "id": "survive-beta-medical-workbench",
    "sha256": "891930686ae566ebc64a05821e8c7096698e91c271129ae6e8c380c5831b756f",
    "gitBlobSha": "c7e0c2f52df2a347ee35af66e86ee77055457a85"
  },
  {
    "id": "survive-beta-weapons-workbench",
    "sha256": "e149bda6e64284172172054e234b45b0fb728b91dd019ec89ed5b0200d9dcc58",
    "gitBlobSha": "37f3b55893b09b12caa47bc2eee9904b18ff3f82"
  },
  {
    "id": "mgr-vr-dlc-yellow-platform-course",
    "sha256": "b7ff1272e935072227a48fa6c18c8d404e1bdc4579c59e61c7f7c6e492ff8388",
    "gitBlobSha": "9e36dd6e83682446c3571c50dcb7ba53cfd9d10e"
  },
  {
    "id": "mgr-vr-dlc-camera-room",
    "sha256": "f2939289a4b3fb7b312ee3aee111fbd1eff055c40b6c41df775fd5d9aac43db2",
    "gitBlobSha": "7dec7f22e2cdd10ade7d866ed0d3a829e4a15db0"
  },
  {
    "id": "mgr-pincer-blades-inventory",
    "sha256": "6712006730d9078b3603dc26d2525bd221103957110ef6d74aa385faebb14dfa",
    "gitBlobSha": "1213d00157be704db007507cf675d7d9b6d116be"
  },
  {
    "id": "mpop-kgb-soldier",
    "sha256": "5b00e2d2cb57b2e29b182032964b9ec16c6c517fb560cc07da1b20cdb633fbda",
    "gitBlobSha": "b2373ff399cac2431dde457f4eaf044cd25c04e5"
  },
  {
    "id": "mpop-gru-soldier",
    "sha256": "580e248d421b6703f1e83e4fa946900e54dae5bbc126e7d4c042c491555c03ae",
    "gitBlobSha": "d9363a82ea20e815d060d88d579f7348d6fde5cb"
  },
  {
    "id": "mpop-seal-soldier",
    "sha256": "ba61c07c2adf96e5c5ee9ef88b2532bab27eb8a1e0e2a01141c6e434e1286810",
    "gitBlobSha": "3f241bc0e523daee64fbb181c8a29654a5aec0ee"
  },
  {
    "id": "mpop-kgb-soldier-v1",
    "sha256": "eed74b98ed83eef9980ca946449f128caef8870256b010e86772c06ba4deff2c",
    "gitBlobSha": "6453319334d4e761c11404b79cf856d0b71a4b7d"
  }
];
const ARCHIVE_IDS = ['acid-gun-camera', 'mpop-kgb-soldier-v1'];
const BLOCKED_IDS = ['mgr-sai-inventory', 'mpop-tengu-soldier'];
const ensure = (ok, message) => { if (!ok) throw Error(message); };
const hash = raw => createHash('sha256').update(raw).digest('hex');
const blob = raw => createHash('sha1').update('blob ' + raw.length + '\0').update(raw).digest('hex');
const digest = value => hash(JSON.stringify(value));
const identity = row => ({id: row.id, sha256: row.sha256, gitBlobSha: row.gitBlobSha});

function canonical(name) {
  ensure(typeof name === 'string' && name && !/[\x00-\x1f\\]/.test(name) &&
    !path.posix.isAbsolute(name) && !name.split('/').some(p => !p || p === '.' || p === '..'),
  'Invalid relative path: ' + name);
  return name;
}
function read(root, name) {
  const fd = openSync(path.resolve(root, canonical(name)), constants.O_RDONLY | constants.O_NOFOLLOW | constants.O_NOATIME);
  try { return readFileSync(fd); } finally { closeSync(fd); }
}
const json = (root, name) => JSON.parse(read(root, name));
function unique(rows, key, label) {
  ensure(Array.isArray(rows), label + ': expected an array');
  const result = new Map();
  for (const row of rows) {
    ensure(row && typeof row[key] === 'string' && row[key] && !result.has(row[key]), label + ': missing/duplicate ' + key);
    result.set(row[key], row);
  }
  return result;
}
function listFiles(root, folder) {
  return readdirSync(path.resolve(root, canonical(folder)), {withFileTypes: true}).flatMap(item => {
    const name = folder + '/' + item.name;
    ensure(item.isFile() || item.isDirectory(), 'Unexpected nonregular entry: ' + name);
    return item.isDirectory() ? listFiles(root, name) : [name];
  });
}
function noPositiveClaims(value) {
  if (!value || typeof value !== 'object') return;
  for (const [key, child] of Object.entries(value)) {
    ensure(!FALSE_FLAGS.includes(key) || child !== true, 'Unsupported positive claim: ' + key);
    noPositiveClaims(child);
  }
}

export async function checkP72(root, options = {}) {
  const pinIndex = new Map(BASELINE_PINS.map(row => [row.path, row]));
  const gitRoot = options.gitRepository || root;
  const pinned = name => {
    canonical(name);
    const local = options.baselineRoot && path.resolve(options.baselineRoot, name);
    const raw = local && existsSync(local) ? read(options.baselineRoot, name)
      : execFileSync('git', ['show', P71_COMMIT + ':' + name],
        {cwd: gitRoot, env: {...process.env, GIT_NO_LAZY_FETCH: '1'}, maxBuffer: 8 * 1024 * 1024});
    const pin = pinIndex.get(name);
    if (pin) ensure(raw.length === pin.bytes && hash(raw) === pin.sha256, 'Pinned P71 snapshot changed: ' + name);
    return raw;
  };
  const base = JSON.parse(pinned('public/cqc/runtime-manifest.json'));
  const baseCatalog = JSON.parse(pinned('public/cqc/' + ATLAS_PATH));
  const catalog = json(root, 'public/cqc/' + ATLAS_PATH);
  const historicalSources = [], historicalArchives = [];
  const historical = HISTORICAL_REGISTRIES.map(name => {
    const raw = read(root, name), inherited = pinned(name);
    assert.deepEqual(raw, inherited, 'Historical source registry changed: ' + name);
    const data = JSON.parse(raw);
    historicalSources.push(...data.assets);
    historicalArchives.push(...(data.archives || []));
    return {path: name, bytes: raw.length, sha256: hash(raw), selected: data.assets.length, archives: (data.archives || []).length};
  });
  ensure(historicalSources.length === 272 && historicalArchives.length === 20, 'Unexpected P71 source/archive totals');
  unique(historicalSources, 'assetId', 'historical source identities');
  unique([...historicalSources, ...historicalArchives], 'path', 'historical output paths');
  const guideDocuments = HISTORICAL_DOCUMENTS.map(name => {
    const raw = read(root, name);
    assert.deepEqual(raw, pinned(name), 'Historical guide mapping changed: ' + name);
    return {path: name, bytes: raw.length, sha256: hash(raw)};
  });
  const guides = GUIDE_PINS.map(([name, size, sha256]) => {
    const file = BIBLE + 'sources/' + name, raw = read(root, file);
    ensure(raw.length === size && hash(raw) === sha256, 'Original guide changed: ' + file);
    assert.deepEqual(raw, pinned(file), 'Original guide differs from P71: ' + file);
    return {path: file, bytes: size, sha256};
  });
  const guideMap = json(root, BIBLE + 'guide-map.json');
  const extensionMap = json(root, BIBLE + 'extension-guide-map-p71.json');
  ensure(guideMap.requirements.length === 90 && extensionMap.requirements.length === 114 &&
    extensionMap.sections.length === 38, 'P71 guide coverage changed');
  const guideIds = new Set(guideMap.sections.map(row => row.id));
  const extensionIds = new Set(extensionMap.sections.map(row => row.id));

  const delivery = json(root, PASS + 'delivery-manifest.json');
  const bible = json(root, BIBLE + 'asset-associations-p72.json');
  ensure(delivery.schema === 'cqc.p72.delivery.v1' && delivery.parentCommit === P71_COMMIT &&
    bible.schema === 'cqc.bible.asset-associations-p72.v1', 'Wrong P72 schema or parent');
  assert.deepEqual({...delivery, schema: bible.schema}, bible, 'P72 delivery and Bible differ');
  const selected = delivery.assets, archives = delivery.archives, blocked = delivery.blockedRequests;
  unique([...selected, ...archives, ...blocked], 'id', 'P72 output/request identities');
  unique([...selected, ...archives], 'path', 'P72 output paths');
  unique([...selected, ...archives], 'sha256', 'P72 PNG content');
  assert.deepEqual(new Set(selected.map(row => row.path.slice('public/cqc/'.length))), new Set(P72_IMAGES),
    'Delivery differs from the finite reviewed P72 image set');
  assert.deepEqual(new Set(archives.map(row => row.id)), new Set(ARCHIVE_IDS), 'Unexpected P72 archive set');
  assert.deepEqual(new Set(blocked.map(row => row.id)), new Set(BLOCKED_IDS), 'Unexpected P72 refused-request set');
  const outputPins = new Map(OUTPUT_PINS.map(row => [row.id, row]));
  for (const row of [...selected, ...archives]) assert.deepEqual(identity(row), outputPins.get(row.id),
    'A reviewed raw PNG was replaced: ' + row.id);

  const reviewRaw = read(root, PASS + 'reviewed-batch.json'), review = JSON.parse(reviewRaw);
  ensure(review.parentCommit === P71_COMMIT && review.reviewer === '/root' && review.reviewComplete === true &&
    review.evidence?.reviewComplete === true, 'P72 root visual review is not complete');
  assert.deepEqual(review.selected, selected.map(identity), 'Selected identities differ from root review');
  assert.deepEqual(review.archives, archives.map(identity), 'Archived identities differ from root review');
  assert.deepEqual(review.blockedIds, blocked.map(row => row.id), 'Refused IDs differ from root review');
  const references = unique(review.references, 'path', 'reviewed references');
  const prompts = unique(review.prompts, 'path', 'reviewed prompts');
  for (const rows of [references, prompts]) for (const [name, row] of rows) {
    const raw = read(root, name);
    ensure(raw.length === row.bytes && hash(raw) === row.sha256 && blob(raw) === row.gitBlobSha,
      'Reviewed evidence bytes changed: ' + name);
  }
  const referenceIndex = unique(json(root, PASS + 'references.json').references, 'path', 'reference provenance');
  assert.deepEqual(new Set(referenceIndex.keys()), new Set(references.keys()), 'Reference index differs from review');

  const pngs = [], oldIds = new Set(historicalSources.map(row => row.assetId));
  const oldHashes = new Set([...historicalSources, ...historicalArchives].map(row => row.sha256));
  const continuation = read(root, BIBLE + 'CONTINUATION_P72.md').toString('utf8');
  for (const [rows, selectedFlag] of [[selected, true], [archives, false]]) for (const row of rows) {
    canonical(row.path);
    ensure(row.path.startsWith('public/cqc/assets/p72/') && row.path.endsWith('.png'), 'Wrong P72 output path: ' + row.id);
    ensure(row.selected === selectedFlag && row.sourceGenerated === true && row.atlasIntegrated === selectedFlag,
      'Invalid source/selection flags: ' + row.id);
    for (const key of FALSE_FLAGS) ensure(row[key] === false, row.id + ': unsupported ' + key);
    ensure(row.fidelityStatus === 'pending_external_review', 'Missing fidelity qualification: ' + row.id);
    ensure(row.assetId === 'asset:p72:' + row.id && !oldIds.has(row.assetId) && !oldHashes.has(row.sha256),
      'Historical identity/content reused: ' + row.id);
    const actual = verifyStaticPng(read(root, row.path), row);
    pngs.push(actual);
    ensure(row.bitDepth === 8 && row.colorMode === (actual.colorType === 6 ? 'RGBA' : 'RGB'),
      'Incorrect PNG metadata: ' + row.id);
    ensure(Array.isArray(row.referenceFiles) && row.referenceFiles.length > 0 &&
      row.referenceFiles.every(name => references.has(name)), 'Missing preserved input reference: ' + row.id);
    const generation = row.generation;
    ensure(generation?.tool === 'image_gen.imagegen' && generation.promptFile &&
      prompts.has(generation.promptFile) && typeof generation.exactPrompt === 'string', 'Missing exact prompt provenance: ' + row.id);
    assert.equal(read(root, generation.promptFile).toString('utf8'), generation.exactPrompt, 'Exact prompt file differs: ' + row.id);
    assert.equal(generation.toolArgs?.prompt, generation.exactPrompt, 'Recorded imagegen arguments differ: ' + row.id);
    ensure(!(generation.toolArgs?.referenced_image_paths && generation.toolArgs?.num_last_images_to_include),
      'Conflicting image inputs: ' + row.id);
    ensure(generation.rawBytesPreserved === true, 'Raw-output preservation missing: ' + row.id);
    if (!selectedFlag) { ensure(row.reason, 'Missing archive reason: ' + row.id); continue; }
    for (const field of ['label', 'episodeKey', 'kind', 'bodyCoverage', 'scope', 'observed', 'productionPlan', 'nextWork']) {
      ensure(row[field], 'Incomplete source dossier: ' + row.id + '.' + field);
    }
    ensure(['acid', 'survive', 'mgr', 'mpo_plus'].includes(row.episodeKey), 'Unreviewed episode: ' + row.id);
    ensure(Array.isArray(row.workIds) && row.workIds.length && row.guideSections.every(id => guideIds.has(id)) &&
      row.extensionGuideSections.every(id => extensionIds.has(id)), 'Missing/invalid work and guide links: ' + row.id);
    ensure(row.runtimeBinding?.status === 'atlas_only' && row.runtimeBinding.admittedByThisPass === false,
      'Unsupported combat binding: ' + row.id);
    const bibleURL = new URL(row.bibleURL);
    ensure(bibleURL.hostname === 'github.com' && bibleURL.pathname.endsWith('/docs/cqc-bible/CONTINUATION_P72.md') &&
      bibleURL.hash === '#' + row.id && continuation.includes('<a id="' + row.id + '"></a>'),
    'Missing Bible anchor: ' + row.id);
  }
  for (const row of blocked) {
    ensure(row.selected === false && row.outputCreated === false && row.noRetryUnderAlias === true &&
      !row.path && !row.sha256 && !row.gitBlobSha, 'Refused request incorrectly claims a PNG: ' + row.id);
    ensure(row.generation?.tool === 'image_gen.imagegen' && prompts.has(row.generation.promptFile),
      'Refused request prompt is missing: ' + row.id);
    assert.equal(read(root, row.generation.promptFile).toString('utf8'), row.generation.exactPrompt,
      'Refused prompt differs: ' + row.id);
    assert.equal(row.generation.toolArgs?.prompt, row.generation.exactPrompt, 'Refused tool arguments differ: ' + row.id);
  }
  for (const doc of [delivery, bible, catalog]) noPositiveClaims(doc);
  const expectedCounts = {
    selectedSources: 11, archivedAttempts: 2, generatedPNGs: 13, generationRequests: 15, blockedRequests: 2,
    previousSelected: 272, totalSelected: 283, previousArchivedAttempts: 20, totalArchivedAttempts: 22,
    atlasSources: 106, editionCount: 4, selectedBytes: selected.reduce((sum, row) => sum + row.bytes, 0),
    archivedBytes: archives.reduce((sum, row) => sum + row.bytes, 0),
    combatAdmissions: 0, absolute1to1Certifications: 0, closedScopes: 0, newNarrativeImages: 0,
  };
  for (const [key, value] of Object.entries(expectedCounts)) assert.equal(delivery.counts[key], value, 'Count mismatch: ' + key);
  for (const [field, property] of [['byEpisode', 'episodeKey'], ['byKind', 'kind'], ['byBodyCoverage', 'bodyCoverage']]) {
    const expected = {};
    for (const row of selected) expected[row[property]] = (expected[row[property]] || 0) + 1;
    assert.deepEqual(delivery.counts[field], expected, 'Count breakdown mismatch: ' + field);
  }

  assert.equal(catalog.schema, baseCatalog.schema);
  assert.equal(catalog.sourcePass, baseCatalog.sourcePass + '+P72');
  assert.equal(baseCatalog.assets.length, 95);
  assert.equal(catalog.assets.length, 106);
  assert.deepEqual(catalog.assets.slice(0, 95), baseCatalog.assets, 'Historical 95 Atlas dossiers changed or reordered');
  unique(catalog.assets, 'id', 'Atlas identities');
  unique(catalog.assets, 'path', 'Atlas paths');
  const added = catalog.assets.slice(95);
  assert.deepEqual(added.map(row => row.id), selected.map(row => row.id), 'New Atlas ordering differs from delivery');
  const context = {module: {exports: {}}, URL, URLSearchParams};
  vm.runInNewContext(read(root, 'public/cqc/src/cqc-p63-source-atlas.js').toString('utf8'), context, {timeout: 1000});
  const api = context.module.exports, normalized = api.normalizeCatalog(catalog);
  assert.equal(normalized.length, 106);
  assert.equal(digest(normalized.slice(0, 95)), digest(api.normalizeCatalog(baseCatalog)), 'Normalized historical Atlas records changed');
  for (let i = 0; i < added.length; i++) {
    const row = added[i], source = selected[i];
    assert.equal(row.path, '../' + source.path.slice('public/cqc/'.length));
    for (const field of ['assetId', 'label', 'episode', 'episodeKey', 'kind', 'bodyCoverage', 'scope', 'workIds',
      'bytes', 'width', 'height', 'sha256', 'gitBlobSha', 'referenceURLs', 'qaNotes', 'bibleURL',
      'selected', 'sourceGenerated', 'atlasIntegrated', 'transparentBackground', ...FALSE_FLAGS]) {
      assert.deepEqual(row[field], source[field], 'Atlas/source mismatch: ' + row.id + '.' + field);
    }
    ensure(row.referenceURLs.length > 0 && row.referenceURLs.every(url => api.referenceURL(url)) &&
      Array.isArray(row.qaNotes) && row.qaNotes.length > 0, 'Missing reference links/limits: ' + row.id);
    const filtered = api.filterAssets(normalized, {episode: row.episodeKey, kind: row.kind, query: row.label});
    ensure(filtered.some(item => item.id === row.id) && filtered.every(item => item.episode === row.episodeKey),
      'New source missing from edition-isolated Atlas filter: ' + row.id);
  }
  assert.deepEqual(listFiles(root, 'public/cqc/assets/p72').sort(), [...selected, ...archives].map(row => row.path).sort(),
    'Unlisted or missing P72 PNG');
  const inventoryRaw = read(root, 'docs/cqc-reprise/pass61/inventory.json');
  assert.deepEqual(inventoryRaw, pinned('docs/cqc-reprise/pass61/inventory.json'), 'Historical inventory changed');
  const inventory = JSON.parse(inventoryRaw).rows, historicalIds = new Set(inventory.map(row => row.id));
  const unresolved = inventory.filter(row => row.presenceClass === 'unresolved');
  const oldWork = new Set(historicalSources.flatMap(row => row.workIds || []));
  const newWork = new Set(selected.flatMap(row => row.workIds));
  const before = unresolved.filter(row => !oldWork.has(row.id)).map(row => row.id);
  const after = before.filter(id => !newWork.has(id));
  const newlyCovered = before.filter(id => newWork.has(id)).sort();
  ensure(inventory.length === 277 && unresolved.length === 97 && before.length === 75, 'Unexpected historical coverage baseline');
  const coverage = json(root, PASS + 'coverage-delta.json');
  assert.equal(delivery.historicalRowsWithoutSelectedCandidate, after.length);
  assert.equal(coverage.beforeWithoutSelectedCandidate, 75);
  assert.equal(coverage.afterWithoutSelectedCandidate, after.length);
  assert.deepEqual(coverage.newlyCoveredHistoricalRows, newlyCovered);
  assert.equal(coverage.closedScopes, 0);
  assert.equal(coverage.p61StatusesChanged, false);
  assert.deepEqual(delivery.extensionScopes, [...newWork].filter(id => !historicalIds.has(id) && !oldWork.has(id)).sort(),
    'Extension work incorrectly counted as historical coverage');

  const promptIndex = json(root, PASS + 'prompt-index.json');
  assert.deepEqual(promptIndex.records.map(row => row.id), selected.map(row => row.id));
  assert.deepEqual(promptIndex.archiveRecords.map(row => row.id), archives.map(row => row.id));
  assert.deepEqual(promptIndex.blockedRecords.map(row => row.id), blocked.map(row => row.id));
  assert.equal(promptIndex.generationRequests, 15);
  assert.equal(promptIndex.generatedOutputs, 13);
  const proposed = await extendP72RuntimeManifest(base, path.join(root, 'public/cqc'));
  const current = options.proposalOnly ? proposed : json(root, 'public/cqc/runtime-manifest.json');
  if (!options.proposalOnly) assert.deepEqual(current, proposed, 'Saved runtime differs from scanner-backed P72 proposal');
  const runtime = verifyP72RuntimeExtension(base, current);
  const archiveHashes = new Set(archives.map(row => row.sha256));
  ensure(current.files.every(row => !archiveHashes.has(row.sha256)), 'Archived attempt entered the runtime');
  let localLegacyFilesHashed = 0;
  for (const row of base.files) {
    if (row.path === ATLAS_PATH || !existsSync(path.join(root, 'public/cqc', row.path))) continue;
    ensure(lstatSync(path.join(root, 'public/cqc', row.path)).isFile(), 'Historical runtime path is not a regular file');
    const raw = read(root, 'public/cqc/' + row.path);
    ensure(raw.length === row.bytes && hash(raw) === row.sha256, 'Historical runtime content changed: ' + row.path);
    localLegacyFilesHashed++;
  }
  runtime.localLegacyFilesHashed = localLegacyFilesHashed;

  const tree = new Set(execFileSync('git', ['ls-tree', '-r', '--name-only', P71_COMMIT],
    {cwd: gitRoot, encoding: 'utf8', maxBuffer: 8 * 1024 * 1024}).trim().split('\n'));
  const changed = execFileSync('git', ['diff', '--name-only', P71_COMMIT],
    {cwd: gitRoot, encoding: 'utf8'}).trim().split('\n').filter(Boolean);
  const permittedExisting = new Set([BIBLE + 'README.md', 'public/cqc/runtime-manifest.json', 'public/cqc/' + ATLAS_PATH]);
  for (const name of changed) if (tree.has(name)) ensure(permittedExisting.has(name), 'Unreviewed historical file changed: ' + name);
  assert.equal(execFileSync('git', ['diff', '--name-only', '--diff-filter=D', P71_COMMIT],
    {cwd: gitRoot, encoding: 'utf8'}).trim(), '', 'Historical file deletion');
  const tests = execFileSync(process.execPath, ['--test', '--test-reporter=tap', 'scripts/test-cqc-p63-source-atlas.mjs',
    'scripts/test-cqc-p67-source-atlas.mjs'], {cwd: root, encoding: 'utf8', maxBuffer: 2 * 1024 * 1024});
  ensure(/# tests 22\b/.test(tests) && /# pass 22\b/.test(tests) && /# fail 0\b/.test(tests), 'The 22 existing Atlas tests did not all pass');
  return {
    schema: 'cqc.p72.incremental-verification/1', status: 'passed', checkedAt: new Date().toISOString(),
    baselineCommit: P71_COMMIT, manifestStatus: options.proposalOnly ? 'proposal_only_not_saved' : 'saved_and_scanner_verified',
    counts: expectedCounts, historical,
    atlas: {historicalUnchanged: 95, added: 11, total: 106, normalized: normalized.length},
    sources: {historicalSelected: 272, selected: 283, previousArchives: 20, archivedAttempts: 22, pngs},
    guides: {verifiedOriginals: guides, unchangedMappings: guideDocuments, historicalRequirements: 90,
      extensionRequirements: 114, totalRequirements: 204, extensionSections: 38},
    coverage: {beforeWithoutSelectedCandidate: 75, afterWithoutSelectedCandidate: after.length, newlyCoveredHistoricalRows: newlyCovered, closedScopes: 0},
    evidence: {reviewSha256: hash(reviewRaw), referenceFilesVerified: references.size, exactPromptsVerified: prompts.size},
    runtime, atlasTests: {total: 22, passed: 22, failed: 0},
    existingFileChanges: changed.filter(name => tree.has(name)),
    checks: {nineHistoricalRegistriesUnchanged: true, historical95AtlasDossiersUnchanged: true,
      originalThreeGuidesUnchanged: true, all13OutputPngsVerified: true, exactPromptsAndReferencesVerified: true,
      historical3112RuntimeRows5055EdgesPreserved: true, onlyAtlasAndElevenNewPngsAdmitted: true,
      omitted740AndExternal499Unchanged: true, allRuntimeFilesReachable: true, noCombatOrAbsoluteFidelityClaim: true},
    limits: ['Historical binary files absent locally were not downloaded; their ledger rows are unchanged.',
      'Static-source integrity and unit tests do not certify absolute1:1 fidelity, native UHD, combat readiness or browser rendering.'],
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const args = process.argv.slice(2), options = {}, roots = [];
    for (let i = 0; i < args.length; i++) {
      if (args[i] === '--baseline-dir') options.baselineRoot = path.resolve(args[++i]);
      else if (args[i] === '--git-repository') options.gitRepository = path.resolve(args[++i]);
      else if (args[i] === '--proposal-only') options.proposalOnly = true;
      else { ensure(!args[i].startsWith('--'), 'Unknown option: ' + args[i]); roots.push(args[i]); }
    }
    ensure(roots.length <= 1, 'Too many repository roots');
    const root = path.resolve(roots[0] || path.join(path.dirname(fileURLToPath(import.meta.url)), '..'));
    console.log(JSON.stringify(await checkP72(root, options), null, 2));
  } catch (error) { console.error(error.stack || String(error)); process.exitCode = 1; }
}
