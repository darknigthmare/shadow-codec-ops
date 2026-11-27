/* Local dossier rewards. This module grants no fighter, costume or paid entitlement. */
(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.CQC_P71_ACCESS = api;
})(typeof globalThis === 'object' ? globalThis : this, function () {
  'use strict';
  const KEY = 'cqc.p71.access';
  const CHRONICLES_KEY = 'cqc.chronicles055';
  const OPERATIONS_KEY = 'cqc-v048-operations-profile';
  const SCHEMA = 'cqc.p71.local-access/1';
  const own = (value, key) => Object.prototype.hasOwnProperty.call(value, key);
  const record = value => value && typeof value === 'object' && !Array.isArray(value);
  const count = value => Number.isSafeInteger(value) && value >= 0 && value <= 1e9;
  const uid = value => typeof value === 'string' && /^[a-z0-9]+__[a-z0-9_]+$/.test(value);
  const clone = value => JSON.parse(JSON.stringify(value));
  const ensure = (ok, message) => { if (!ok) throw Error(message); };
  const FACT_LABELS = Object.freeze({
    chronicleIntros: 'Ouvrir un prologue dans les Chroniques',
    chronicleClears: 'Terminer les huit duels d’un récit',
    survivalBest: 'Gagner trois duels dans une même Survie',
    relay3Wins: 'Gagner un relais 3 contre 3',
    relay5Wins: 'Gagner un relais 5 contre 5'
  });
  const DEFINITIONS = Object.freeze([
    Object.freeze({ id: 'report01', label: 'Mémoire d’une opération', category: 'Dossier de parcours',
      hint: 'Les Chroniques conservent la trace d’un parcours terminé.', source: 'chronicles',
      rule: { all: [{ fact: 'chronicleIntros', target: 1 }, { fact: 'chronicleClears', target: 1 }] },
      modes: ['archives'], activity: '../index.html?module=chronicles56', activityLabel: 'Ouvrir les Chroniques' }),
    Object.freeze({ id: 'report02', label: 'Tenir la ligne', category: 'Dossier de terrain',
      hint: 'Une série de victoires en Survie laisse un rapport de terrain.', source: 'operations',
      rule: { all: [{ fact: 'survivalBest', target: 3 }] },
      modes: ['archives'], activity: '../index.html?module=survival48', activityLabel: 'Ouvrir la Survie' }),
    Object.freeze({ id: 'report03', label: 'Passage de témoin', category: 'Dossier d’équipe',
      hint: 'Une équipe victorieuse en relais produit un compte rendu commun.', source: 'operations',
      rule: { any: [{ fact: 'relay3Wins', target: 1 }, { fact: 'relay5Wins', target: 1 }] },
      modes: ['archives'], activity: '../index.html?module=relay48', activityLabel: 'Ouvrir les relais' })
  ]);
  const byId = new Map(DEFINITIONS.map(item => [item.id, item]));

  // Same checksum algorithm as chronicles-core-v056. It detects damaged local
  // writes; it is deliberately not an authentication or subscription proof.
  function checksum(text) {
    let value = 2166136261;
    for (let index = 0; index < text.length; index++) value = Math.imul(value ^ text.charCodeAt(index), 16777619);
    return (value >>> 0).toString(16).padStart(8, '0');
  }
  function emptyLedger() { return { schema: SCHEMA, grants: [] }; }
  function validateLedger(input) {
    ensure(record(input) && input.schema === SCHEMA && Array.isArray(input.grants) && input.grants.length <= 100, 'Registre des récompenses invalide.');
    const seen = new Set();
    const grants = input.grants.map(grant => {
      ensure(record(grant) && byId.has(grant.contentId) && grant.kind === 'permanent' && grant.authority === 'local-progression', 'Source de récompense invalide.');
      ensure(grant.eventId === grant.contentId + ':local-v1' && !seen.has(grant.eventId), 'Attribution de récompense dupliquée.');
      ensure(typeof grant.awardedAt === 'string' && Number.isFinite(Date.parse(grant.awardedAt)), 'Date de récompense invalide.');
      ensure(grant.source === byId.get(grant.contentId).source, 'Origine de récompense invalide.');
      seen.add(grant.eventId);
      return { contentId: grant.contentId, kind: 'permanent', authority: 'local-progression', eventId: grant.eventId, awardedAt: grant.awardedAt, source: grant.source };
    });
    return { schema: SCHEMA, grants };
  }
  function parseEnvelope(text, format, validate) {
    const raw = JSON.parse(text);
    ensure(record(raw) && raw.format === format && count(raw.revision), 'Format de sauvegarde incompatible.');
    ensure(raw.checksum === checksum(JSON.stringify(raw.payload)), 'Sauvegarde endommagée.');
    return { revision: raw.revision, payload: validate(raw.payload) };
  }
  function readPair(storage, key, format, validate, fresh) {
    const valid = [], errors = [];
    for (const suffix of ['a', 'b']) {
      try {
        const text = storage.getItem(key + '.' + suffix);
        if (text !== null) valid.push({ ...parseEnvelope(text, format, validate), slot: suffix });
      } catch (error) { errors.push({ slot: suffix, message: String(error.message || error) }); }
    }
    valid.sort((left, right) => right.revision - left.revision);
    return { payload: valid[0]?.payload || fresh(), revision: valid[0]?.revision || 0,
      reliable: valid.length > 0 || errors.length === 0, recovered: valid.length > 0 && errors.length > 0, errors };
  }
  function loadLedger(storage) { return readPair(storage, KEY, 'cqc.p71.access-slot/1', validateLedger, emptyLedger); }
  function saveLedger(storage, input, revision) {
    const payload = validateLedger(input);
    ensure(count(revision) && revision < 1e9, 'Révision de sauvegarde invalide.');
    const next = revision + 1;
    const text = JSON.stringify({ format: 'cqc.p71.access-slot/1', revision: next, checksum: checksum(JSON.stringify(payload)), payload });
    const slot = KEY + '.' + (next % 2 ? 'a' : 'b');
    storage.setItem(slot, text);
    ensure(storage.getItem(slot) === text, 'L’enregistrement n’a pas pu être confirmé.');
    return { payload, revision: next };
  }
  function validateChronicleRewards(payload) {
    ensure(record(payload) && payload.schema === 'cqc.chronicles.save/1' && record(payload.records), 'Progression des Chroniques incompatible.');
    for (const key of ['introSeen', 'unlocked']) {
      ensure(Array.isArray(payload[key]) && payload[key].length <= 5000 && payload[key].every(uid) && new Set(payload[key]).size === payload[key].length, 'Liste des Chroniques invalide.');
    }
    const ids = Object.keys(payload.records);
    ensure(ids.length <= 5000 && ids.every(uid), 'Historique des Chroniques invalide.');
    for (const id of ids) {
      const item = payload.records[id];
      ensure(record(item) && Number.isInteger(item.clears) && item.clears >= 1 && item.clears <= 9999 && Number.isInteger(item.bestContinues) && item.bestContinues >= 0 && item.bestContinues <= 3, 'Résultat des Chroniques invalide.');
      ensure(payload.unlocked.includes(id) && payload.introSeen.includes(id), 'Récit terminé sans scènes débloquées.');
    }
    ensure(payload.unlocked.every(id => own(payload.records, id)), 'Épilogue sans parcours terminé.');
    return { introSeen: [...payload.introSeen], unlocked: [...payload.unlocked], records: clone(payload.records) };
  }
  function readEvidence(storage) {
    const chronicle = readPair(storage, CHRONICLES_KEY, 'cqc.save-slot/1', validateChronicleRewards, () => ({ introSeen: [], unlocked: [], records: {} }));
    let operations = { records: {} }, operationsError = null;
    try {
      const raw = storage.getItem(OPERATIONS_KEY);
      if (raw !== null) {
        operations = JSON.parse(raw);
        ensure(record(operations) && record(operations.records), 'Progression des opérations incompatible.');
        for (const key of ['survivalBest', 'relay3Wins', 'relay5Wins']) ensure(!own(operations.records, key) || count(operations.records[key]), 'Compteur des opérations invalide.');
      }
    } catch (error) { operationsError = String(error.message || error); }
    return {
      facts: {
        chronicleIntros: chronicle.reliable ? chronicle.payload.introSeen.length : null,
        chronicleClears: chronicle.reliable ? Object.values(chronicle.payload.records).reduce((total, entry) => total + entry.clears, 0) : null,
        survivalBest: operationsError ? null : operations.records.survivalBest || 0,
        relay3Wins: operationsError ? null : operations.records.relay3Wins || 0,
        relay5Wins: operationsError ? null : operations.records.relay5Wins || 0
      },
      sources: { chronicles: { reliable: chronicle.reliable, recovered: chronicle.recovered, errors: chronicle.errors }, operations: { reliable: !operationsError, error: operationsError } }
    };
  }
  function evaluateRule(rule, facts) {
    if (Array.isArray(rule?.all) || Array.isArray(rule?.any)) {
      const operator = Array.isArray(rule.all) ? 'all' : 'any';
      ensure(!Array.isArray(rule.all) || !Array.isArray(rule.any), 'Condition ambiguë.');
      ensure(rule[operator].length > 0, 'Condition vide.');
      const children = rule[operator].map(item => evaluateRule(item, facts));
      const states = children.map(item => item.state);
      const state = operator === 'all' ? (states.includes('unmet') ? 'unmet' : states.includes('unknown') ? 'unknown' : 'met')
        : (states.includes('met') ? 'met' : states.includes('unknown') ? 'unknown' : 'unmet');
      return { operator, state, children };
    }
    ensure(own(FACT_LABELS, rule?.fact) && count(rule.target) && rule.target > 0, 'Condition inconnue.');
    const value = facts[rule.fact];
    return { fact: rule.fact, target: rule.target, value: count(value) ? value : null, label: FACT_LABELS[rule.fact],
      state: !count(value) ? 'unknown' : value >= rule.target ? 'met' : 'unmet' };
  }
  function accessFor(definition, ledger, evidence, options = {}) {
    const rule = evaluateRule(definition.rule, evidence.facts);
    const grant = ledger.grants.find(item => item.contentId === definition.id && item.kind === 'permanent');
    const right = grant ? 'permanent' : rule.state === 'met' ? 'claimable' : rule.state === 'unknown' ? 'pending' : 'none';
    const sourceFacts = definition.source === 'chronicles' ? ['chronicleIntros', 'chronicleClears'] : definition.id === 'report02' ? ['survivalBest'] : ['relay3Wins', 'relay5Wins'];
    const discovered = sourceFacts.some(key => evidence.facts[key] > 0);
    const discovery = grant || right === 'claimable' || options.hideSecrets === false ? 'identified' : discovered ? 'hint' : 'secret';
    const technical = ['ready', 'missing', 'error'].includes(options.technical) ? options.technical : 'missing';
    const compatibility = definition.modes.includes(options.mode || 'archives') ? 'allowed' : 'incompatible';
    return { id: definition.id, discovery, right, technical, compatibility, rule, grant: grant || null,
      canClaim: right === 'claimable', canSelect: right === 'permanent' && technical === 'ready' && compatibility === 'allowed',
      visibleName: discovery === 'identified' ? definition.label : discovery === 'hint' ? 'Dossier repéré' : 'Dossier non révélé' };
  }
  function claim(ledger, definition, evidence, now = new Date().toISOString()) {
    const previous = validateLedger(ledger);
    if (previous.grants.some(item => item.contentId === definition.id)) return { ledger: previous, changed: false };
    ensure(evaluateRule(definition.rule, evidence.facts).state === 'met', 'Les conditions de ce dossier ne sont pas encore remplies.');
    const grant = { contentId: definition.id, kind: 'permanent', authority: 'local-progression', source: definition.source,
      eventId: definition.id + ':local-v1', awardedAt: now };
    return { ledger: validateLedger({ schema: SCHEMA, grants: [...previous.grants, grant] }), changed: true };
  }
  function validateDocuments(raw) {
    ensure(record(raw) && raw.schema === 'cqc.p71.access-dossiers/1' && Array.isArray(raw.dossiers), 'Les dossiers ne sont pas disponibles dans cette version.');
    const result = new Map();
    for (const item of raw.dossiers) {
      ensure(record(item) && byId.has(item.id) && !result.has(item.id) && typeof item.title === 'string' && item.title === byId.get(item.id).label, 'Identité de dossier invalide.');
      ensure(item.continuity === 'CQC / simulation originale' && Array.isArray(item.paragraphs) && item.paragraphs.length > 0 && item.paragraphs.length <= 12 && item.paragraphs.every(text => typeof text === 'string' && text.length > 0 && text.length <= 4000), 'Texte de dossier invalide.');
      result.set(item.id, { id: item.id, title: item.title, continuity: item.continuity, paragraphs: [...item.paragraphs] });
    }
    return result;
  }
  return Object.freeze({ version: 'cqc-access/1', KEY, CHRONICLES_KEY, OPERATIONS_KEY, SCHEMA, DEFINITIONS, FACT_LABELS,
    checksum, emptyLedger, validateLedger, loadLedger, saveLedger, readEvidence, evaluateRule, accessFor, claim, validateDocuments });
});
