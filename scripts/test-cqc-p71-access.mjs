import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
const context = vm.createContext({ module: { exports: {} } });
vm.runInContext(read('public/cqc/src/cqc-p71-access.js'), context);
const A = context.module.exports;
const [chronicle, survival, relay] = A.DEFINITIONS;
const current = '2026-11-27T08:00:00.000Z';
const store = initial => {
  const entries = new Map(Object.entries(initial || {}));
  return { getItem: key => entries.has(key) ? entries.get(key) : null, setItem: (key, value) => entries.set(key, value), removeItem: key => entries.delete(key), entries };
};
const operations = (records = {}) => store({ [A.OPERATIONS_KEY]: JSON.stringify({ version: '0.48', records }) });
const available = (definition, storage, ledger = A.emptyLedger(), options = {}) => A.accessFor(definition, ledger, A.readEvidence(storage), { technical: 'ready', ...options });
const sourceContext = vm.createContext({ module: { exports: {} } });
vm.runInContext(read('public/cqc/src/chronicles-core-v056.js'), sourceContext);
const C = sourceContext.module.exports;
const storyUid = 'core__solid', foeUid = 'core__liquid';
const storyData = {
  fighters: [{ uid: storyUid }, { uid: foeUid }],
  stories: Object.fromEntries([storyUid, foeUid].map(uid => [uid, {
    intro: [{ text: 'One' }], outro: [{ text: 'Two' }],
    route: Array.from({ length: 8 }, () => ({ opponent: uid === storyUid ? foeUid : storyUid }))
  }]))
};
function storyProfile(wins) {
  let profile = C.begin(storyData, C.fresh(storyData), storyUid);
  profile = C.next(storyData, profile);
  for (let index = 0; index < wins; index++) {
    profile = C.next(storyData, profile);
    profile = C.result(storyData, profile, { winner: storyUid, loser: foeUid, life: 50, maxLife: 100, seconds: 20 });
    if (index < wins - 1) profile = C.next(storyData, profile);
  }
  return profile;
}
function storyStorage(wins) {
  return store({ [A.CHRONICLES_KEY + '.a']: C.envelope(storyData, storyProfile(wins), 1) });
}

test('fresh local profile keeps all dossiers secret and non-selectable', () => {
  for (const definition of A.DEFINITIONS) {
    const state = available(definition, store());
    assert.equal(state.discovery, 'secret'); assert.equal(state.right, 'none');
    assert.equal(state.canSelect, false); assert.equal(state.canClaim, false);
    assert.equal(state.visibleName, 'Dossier non révélé');
  }
});
test('secret names stay absent while the public condition remains readable', () => {
  const state = available(survival, operations({ survivalBest: 1 }));
  assert.equal(state.discovery, 'hint'); assert.notEqual(state.visibleName, survival.label);
  assert.equal(state.rule.children[0].label, 'Gagner trois duels dans une même Survie');
  assert.equal(available(survival, store(), A.emptyLedger(), { hideSecrets: false }).visibleName, survival.label);
});
test('only the eighth actual Chronicles core victory makes report01 eligible', () => {
  assert.equal(available(chronicle, storyStorage(7)).canClaim, false);
  const state = available(chronicle, storyStorage(8));
  assert.equal(state.canClaim, true); assert.equal(state.discovery, 'identified');
  assert.equal(state.rule.operator, 'all');
});
test('the existing Operations onResult callback feeds the Survie milestone', () => {
  const source = read('public/cqc/modules/battle-operations-v053.html');
  const original = source.split('\n').find(line => line.startsWith('function onResult(d)'));
  assert.ok(original);
  let saved;
  const fixture = vm.createContext({
    replayAction: null, profile: { uniqueStages: [], uniqueFighters: [], records: { survivalBest: 0 } },
    run: { mode: 'survival', index: 0, target: 10, history: [], score: 0 },
    FIGHTERS: [{ uid: storyUid }, { uid: foeUid }], currentMatch: () => ({ p1: 0, p2: 1 }),
    addReplay() {}, save() { saved = JSON.stringify(fixture.profile); }, buildRun() {}, show() {},
    completeRun() { throw Error('This fixture must continue between wins.'); }
  });
  vm.runInContext(original, fixture);
  for (let count = 1; count <= 3; count++) {
    fixture.onResult({ winner: storyUid, stage: 'test-stage', timerStart: 5940, timer: 3000, life: 5000 });
    const storage = store({ [A.OPERATIONS_KEY]: saved });
    assert.equal(available(survival, storage).canClaim, count === 3);
  }
});
test('either recorded relay format is sufficient; neither is not', () => {
  assert.equal(available(relay, operations({ relay3Wins: 1, relay5Wins: 0 })).canClaim, true);
  assert.equal(available(relay, operations({ relay3Wins: 0, relay5Wins: 1 })).canClaim, true);
  assert.equal(available(relay, operations({ relay3Wins: 0, relay5Wins: 0 })).canClaim, false);
  assert.equal(available(relay, operations()).rule.operator, 'any');
});
test('existing relay completeRun writes the exact counters consumed by access', () => {
  const source = read('public/cqc/modules/battle-operations-v053.html');
  const original = source.split('\n').find(line => line.startsWith('function completeRun(success)'));
  for (const size of [3, 5]) {
    let saved;
    const fixture = vm.createContext({
      profile: { modesPlayed: [], records: { totalScore: 0, relay3Wins: 0, relay5Wins: 0, relayPerfect: 0 }, history: [] },
      run: { mode: 'relay', team: Array.from({ length: size }), score: 10, index: 3, pIndex: 0, seed: 1 },
      MODES: [{ id: 'relay', name: 'TEAM RELAY' }], save() { saved = JSON.stringify(fixture.profile); },
      $: () => ({}), metricsHTML: () => '', show() {}
    });
    vm.runInContext(original, fixture); fixture.completeRun(true);
    assert.equal(available(relay, store({ [A.OPERATIONS_KEY]: saved })).canClaim, true);
    assert.equal(JSON.parse(saved).records[size === 3 ? 'relay3Wins' : 'relay5Wins'], 1);
  }
});
test('wrong, missing and negative Operations counters do not grant an access', () => {
  for (const value of [-1, '3', 3.5, 1e20]) {
    const state = available(survival, operations({ survivalBest: value }));
    assert.equal(state.right, 'pending'); assert.equal(state.canClaim, false);
  }
  assert.equal(available(survival, operations()).right, 'none');
});
test('corrupt latest Chronicle slot falls back to a valid saved copy', () => {
  const storage = storyStorage(8); storage.setItem(A.CHRONICLES_KEY + '.b', '{broken');
  assert.equal(available(chronicle, storage).canClaim, true);
  assert.equal(A.readEvidence(storage).sources.chronicles.recovered, true);
});
test('both damaged Chronicle slots yield unknown progress instead of a false reset', () => {
  const storage = store({ [A.CHRONICLES_KEY + '.a']: '{broken', [A.CHRONICLES_KEY + '.b']: '{}' });
  assert.equal(available(chronicle, storage).right, 'pending');
});
test('a matching checksum still cannot turn an inconsistent epilogue into a reward', () => {
  const profile = storyProfile(8); profile.introSeen = [];
  const raw = { format: 'cqc.save-slot/1', revision: 1, payload: profile, checksum: A.checksum(JSON.stringify(profile)) };
  const storage = store({ [A.CHRONICLES_KEY + '.a']: JSON.stringify(raw) });
  assert.equal(available(chronicle, storage).canClaim, false);
});
test('claim, save, reload and old-record removal preserve one permanent reward', () => {
  const storage = operations({ survivalBest: 3 }), evidence = A.readEvidence(storage);
  const claimed = A.claim(A.emptyLedger(), survival, evidence, current);
  const saved = A.saveLedger(storage, claimed.ledger, 0);
  assert.equal(saved.revision, 1);
  storage.removeItem(A.OPERATIONS_KEY);
  const reloaded = A.loadLedger(storage);
  const state = available(survival, storage, reloaded.payload);
  assert.equal(state.canSelect, true); assert.equal(state.right, 'permanent');
  const repeated = A.claim(reloaded.payload, survival, A.readEvidence(storage), '2026-12-01T00:00:00Z');
  assert.equal(repeated.changed, false); assert.equal(repeated.ledger.grants.length, 1);
  assert.equal(repeated.ledger.grants[0].awardedAt, current);
});
test('claim is refused before the earned condition and does not mutate a ledger', () => {
  const ledger = A.emptyLedger();
  assert.throws(() => A.claim(ledger, survival, A.readEvidence(store()), current), /conditions/);
  assert.equal(ledger.grants.length, 0);
});
test('failed writes and unconfirmed readback never report a successful save', () => {
  const ledger = A.claim(A.emptyLedger(), survival, A.readEvidence(operations({ survivalBest: 3 })), current).ledger;
  assert.throws(() => A.saveLedger({ setItem() { throw Error('Quota'); }, getItem() { return null; } }, ledger, 0), /Quota/);
  assert.throws(() => A.saveLedger({ setItem() {}, getItem() { return null; } }, ledger, 0), /confirmé/);
});
test('double slots recover valid acquisitions and protect a fully damaged registry', () => {
  const storage = operations({ survivalBest: 3 });
  const ledger = A.claim(A.emptyLedger(), survival, A.readEvidence(storage), current).ledger;
  A.saveLedger(storage, ledger, 0); storage.setItem(A.KEY + '.b', '{broken');
  assert.equal(A.loadLedger(storage).recovered, true); assert.equal(A.loadLedger(storage).payload.grants.length, 1);
  storage.setItem(A.KEY + '.a', '{broken'); assert.equal(A.loadLedger(storage).reliable, false);
});
test('separate acquisition, files and compatibility survive combined obstacles', () => {
  const storage = operations({ survivalBest: 3 });
  const ledger = A.claim(A.emptyLedger(), survival, A.readEvidence(storage), current).ledger;
  const state = available(survival, storage, ledger, { technical: 'error', mode: 'versus' });
  assert.equal(state.right, 'permanent'); assert.equal(state.technical, 'error');
  assert.equal(state.compatibility, 'incompatible'); assert.equal(state.canSelect, false);
  assert.equal(available(survival, storage, ledger, { technical: 'missing' }).right, 'permanent');
});
test('an earned dossier can be acquired before its text becomes available', () => {
  const storage = operations({ survivalBest: 3 });
  const state = available(survival, storage, A.emptyLedger(), { technical: 'missing' });
  assert.equal(state.canClaim, true); assert.equal(state.canSelect, false);
});
test('unknown OR branch does not erase a valid alternative and AND stays strict', () => {
  const branch = { any: [{ fact: 'relay3Wins', target: 1 }, { fact: 'relay5Wins', target: 1 }] };
  assert.equal(A.evaluateRule(branch, { relay3Wins: null, relay5Wins: 1 }).state, 'met');
  assert.equal(A.evaluateRule({ all: branch.any }, { relay3Wins: null, relay5Wins: 1 }).state, 'unknown');
  assert.throws(() => A.evaluateRule({ all: [] }, {}), /vide/);
});
test('local ledger rejects subscription claims, unknown items and duplicate events', () => {
  const ledger = A.claim(A.emptyLedger(), survival, A.readEvidence(operations({ survivalBest: 3 })), current).ledger;
  const invalid = JSON.parse(JSON.stringify(ledger)); invalid.grants[0].authority = 'patreon';
  assert.throws(() => A.validateLedger(invalid), /Source/);
  invalid.grants[0].authority = 'local-progression'; invalid.grants.push(invalid.grants[0]);
  assert.throws(() => A.validateLedger(invalid), /dupliquée/);
});
test('all three actual report texts resolve to the stable catalog identities', () => {
  const raw = JSON.parse(read('public/cqc/data/cqc-p71-access-dossiers.json'));
  const documents = A.validateDocuments(raw); assert.equal(documents.size, 3);
  for (const definition of A.DEFINITIONS) assert.equal(documents.get(definition.id).title, definition.label);
  raw.dossiers[0].title = 'Wrong'; assert.throws(() => A.validateDocuments(raw), /Identité/);
});
test('new archive navigation is additive to the existing Atelier and Atlas', () => {
  assert.match(read('public/cqc/modules/atelier-v056.html'), /href="classified-archives-p71.html"/);
  assert.match(read('public/cqc/modules/atelier-v056.html'), /href="unified-versus-v055.html"/);
  assert.match(read('public/cqc/modules/source-atlas-v063.html'), /href="classified-archives-p71.html"/);
});
