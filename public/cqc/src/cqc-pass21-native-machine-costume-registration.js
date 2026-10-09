/* Produced native machine costumes: byte verification precedes choices and equipping. */
(function (root, factory) {
  'use strict';
  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  else {
    root.CQC_PASS21_NATIVE_MACHINE_REGISTRATION = api;
    api.install().catch(() => {});
  }
})(typeof globalThis === 'undefined' ? this : globalThis, function (root) {
  'use strict';
  const UID = 'completion__dwarf_gekko_mgs4', ID = 'retro-msx';
  const DESCRIPTOR = {
    path: 'data/pass21-machine-costumes/dwarf-gekko-retro-parts-v1.json', bytes: 31392,
    sha256: '3ab9fcec37c3c10854bfa452cceb11ee7e6f2f394499eb1d0ecba6ce36c32707'
  };
  const DESCRIPTORS = [
    {uid: UID, ...DESCRIPTOR},
    {uid: 'completion__mk2_mgs4', path: 'data/pass21-machine-costumes/mkii-retro-parts-v1.json', bytes: 28401, sha256: '60b2b1821d7860bb57d06aee6dd4151fa0d8db543b571c263371eef91ee05d74'}
  ];
  const CONTRACT = {
    path: 'data/pass21-machine-costumes/source-contract-v1.json', bytes: 1771292,
    sha256: '24085b924bcf0b42b6c77897d81161a7f6540c52afbfa91e7c26d14677d73548'
  };
  const clone = value => JSON.parse(JSON.stringify(value));
  const aborted = () => Object.assign(new Error('Liaison annulée'), {name: 'AbortError'});
  let installing = null, runtime = null, receipt = null, error = null, phase = 'dormant';
  const subscribers = new Set(), undo = [], pending = [null, null];
  let hooks = {}, installedLibrary = null;
  const baseURL = new URL('../', root.document?.currentScript?.src || root.document?.baseURI || 'http://localhost/cqc/src/').href;
  function emit(event) { for (const listener of subscribers) try { listener(event); } catch {} }
  function notify(name, event) { try { hooks[name]?.(event); } catch {} }
  async function readPinned(pin, config) {
    const url = new URL(pin.path, config.baseURL || baseURL);
    const origin = new URL(config.baseURL || baseURL).origin;
    if (url.origin !== origin || url.search || url.hash || url.username || url.password) throw Error('Source machine hors origine');
    const response = await (config.fetch || root.fetch.bind(root))(url.href, {cache: 'force-cache'});
    if (!response.ok) throw Error('Dossier machine indisponible');
    const bytes = await response.arrayBuffer();
    if (bytes.byteLength !== pin.bytes) throw Error('Taille du dossier machine différente');
    const hash = config.sha256 ? await config.sha256(bytes) : Array.from(new Uint8Array(await root.crypto.subtle.digest('SHA-256', bytes)), byte => byte.toString(16).padStart(2, '0')).join('');
    if (hash !== pin.sha256) throw Error('Empreinte du dossier machine différente');
    return bytes;
  }
  function owned(uid, id) { return !!runtime && id === ID && runtime.has({uid, costume: id}); }
  function replace(target, name, wrapper) {
    const previous = target[name]; target[name] = wrapper;
    undo.push(() => { if (target[name] === wrapper) target[name] = previous; });
  }
  function cancelMachine(slot) {
    const current = pending[slot]; if (!current) return false;
    pending[slot] = null; current.controller.abort(); return true;
  }
  function installLibrary(library, choices) {
    if (!library || !choices || installedLibrary) return;
    installedLibrary = library;
    const raw = Object.fromEntries(['availableFor', 'known', 'state', 'ensure', 'select', 'drawPreview', 'cancel', 'on', 'bindSlots'].map(name => [name, library[name].bind(library)]));
    replace(library, 'availableFor', function (uid) {
      const options = raw.availableFor(uid);
      if (!owned(uid, ID)) return options;
      const option = runtime.optionFor(uid, ID);
      return [...options.filter(item => item.id !== ID), {uid, id: ID, label: option.label, family: option.family,
        provenance: clone(option.provenance), ready: runtime.ready({uid, costume: ID}, 1) && runtime.ready({uid, costume: ID}, -1), presentation: 'articulated-source-machine'}];
    });
    replace(library, 'known', (uid, id) => owned(uid, id) || raw.known(uid, id));
    replace(library, 'state', (uid, id) => owned(uid, id) ? {known: true, state: 'ready', ready: runtime.ready({uid, costume: id}, 1) && runtime.ready({uid, costume: id}, -1), published: true, error: null} : raw.state(uid, id));
    replace(library, 'ensure', async function (uid, id, options = {}) {
      if (!owned(uid, id)) return raw.ensure(uid, id, options);
      if (options.signal?.aborted) throw aborted();
      const ready = await runtime.whenReady({uid, costume: id}, options);
      if (options.signal?.aborted) throw aborted();
      if (!ready) throw Error('Pièces natives indisponibles');
      return {uid, id, state: 'ready', owned: true, published: true, option: runtime.optionFor(uid, id)};
    });
    replace(library, 'cancel', slot => { const machine = cancelMachine(slot); return raw.cancel(slot) || machine; });
    replace(library, 'select', async function (slot, uid, id, options = {}) {
      if (!owned(uid, id)) { cancelMachine(slot); return raw.select(slot, uid, id, options); }
      if (![0, 1].includes(slot)) return {committed: false, reason: 'unavailable'};
      raw.cancel(slot); cancelMachine(slot);
      const ticket = {controller: new AbortController()}; pending[slot] = ticket;
      const forward = () => ticket.controller.abort();
      options.signal?.addEventListener('abort', forward, {once: true}); if (options.signal?.aborted) forward();
      try {
        notify('onBusy', {slot, uid, id, busy: true});
        await library.ensure(uid, id, {...options, signal: ticket.controller.signal});
        if (pending[slot] !== ticket || ticket.controller.signal.aborted) throw aborted();
        const current = hooks.getFighters?.()?.[slot];
        if (current && current.uid !== uid) return {committed: false, reason: 'fighter-changed'};
        if (!choices.select(slot, uid, id)) throw Error('Emplacement indisponible');
        const result = {committed: true, slot, uid, id};
        emit({type: 'selection-committed', ...result});
        notify('onCommit', {...result, fighter: {...(current || {uid}), costume: id}});
        return result;
      } catch (caught) {
        return {committed: false, reason: caught.name === 'AbortError' ? 'cancelled' : 'failed', ...(caught.name === 'AbortError' ? {} : {error: caught.message})};
      } finally {
        options.signal?.removeEventListener('abort', forward);
        if (pending[slot] === ticket) { pending[slot] = null; notify('onBusy', {slot, uid, id, busy: false}); }
      }
    });
    replace(library, 'drawPreview', (context, actor, box, face, pose) => runtime?.has(actor) ? runtime.drawFitted(context, actor, box, face, pose) : raw.drawPreview(context, actor, box, face, pose));
    replace(library, 'on', function (listener) { const off = raw.on(listener); subscribers.add(listener); return () => { subscribers.delete(listener); off(); }; });
    replace(library, 'bindSlots', function (value) { hooks = value || {}; return raw.bindSlots(value); });
  }
  function installBridge(bridge) {
    for (const name of ['drawPlayable', 'drawFitted']) {
      const raw = bridge[name].bind(bridge);
      replace(bridge, name, (context, actor, ...args) => runtime.has(actor) ? runtime[name](context, actor, ...args) : raw(context, actor, ...args));
    }
    const portrait = bridge.drawPortrait.bind(bridge);
    replace(bridge, 'drawPortrait', function (canvas, actor, ...args) {
      if (!runtime.has(actor)) return portrait(canvas, actor, ...args);
      if (!canvas?.getContext || canvas.width <= 0 || canvas.height <= 0) return false;
      bridge.cancelPortrait?.(canvas);
      const context = canvas.getContext('2d'); if (!context) return false;
      context.clearRect(0, 0, canvas.width, canvas.height);
      return runtime.drawFitted(context, actor, {x: 0, y: 0, width: canvas.width, height: canvas.height, padding: Math.min(canvas.width, canvas.height) * .055}, -1, {action: 'idle', frame: 0});
    });
    const ready = bridge.ready.bind(bridge);
    replace(bridge, 'ready', (actor, ...args) => runtime.has(actor) ? runtime.ready(actor, args[0]?.face || -1) : ready(actor, ...args));
    for (const name of ['whenReady', 'whenReadyComposite']) {
      const raw = bridge[name].bind(bridge);
      replace(bridge, name, (actor, options = {}) => runtime.has(actor) ? runtime.whenReady(actor, options) : raw(actor, options));
    }
  }
  function install(config = {}) {
    if (installing) return installing;
    installing = (async () => {
      phase = 'verifying'; error = null;
      const factory = root.CQC_PASS21_NATIVE_MACHINE_COSTUMES, bridgeFactory = root.CQC_PASS18_MACHINE_BRIDGE_FACTORY,
        foundation = root.CQC_PASS19_COSTUMES, bridge = root.CQC_PASS18_MACHINES;
      if (!factory?.create || !bridgeFactory?.createBridge || !foundation?.registerBatch || !bridge || !root.CQC_NATIVE_WARDROBE) throw Error('Ordre des modules de machine incomplet');
      if (!root.CQC_COSTUMES_PASS17?.select || ['availableFor', 'known', 'state', 'ensure', 'select', 'drawPreview', 'cancel', 'on', 'bindSlots'].some(name => typeof root.CQC_NATIVE_WARDROBE[name] !== 'function') || ['drawPlayable', 'drawFitted', 'drawPortrait', 'ready', 'whenReady', 'whenReadyComposite'].some(name => typeof bridge[name] !== 'function')) throw Error('Interfaces du vestiaire de machine incomplètes');
      // Install the empty facade synchronously, before UI bindings subscribe.
      installLibrary(root.CQC_NATIVE_WARDROBE, root.CQC_COSTUMES_PASS17);
      const [candidates, sourceContractBytes] = await Promise.all([
        Promise.all(DESCRIPTORS.map(async pin => {
          const candidate = JSON.parse(new TextDecoder().decode(await readPinned(pin, config)));
          if (candidate.uid !== pin.uid || candidate.option?.id !== ID || candidate.option?.family !== 'retro') throw Error('Incarnation du costume différente');
          return candidate;
        })), readPinned(CONTRACT, config)
      ]);
      const additions = candidates.map(candidate => ({uid: candidate.uid, option: candidate.option}));
      const selectedBase = config.baseURL || baseURL;
      const rendererOptions = {...(root.CQC_PASS18_MACHINE_RENDERER_OPTIONS || {}), ...(config.rendererOptions || {}), resolveURL: file => new URL(file, selectedBase).href};
      const next = await factory.create({parts: root.CQC_MACHINE_PARTS, catalog: root.CQC_MACHINE_PARTS_CATALOG,
        data: root.CQC_PASS18_MACHINE_DATA, sourceContractBytes, bridgeFactory: bridgeFactory.createBridge, rendererOptions,
        ...(config.sha256 ? {sha256: config.sha256} : {})});
      const prior = root.CQC_PASS21_MACHINE_COSTUME_RUNTIME;
      try {
        const native = await next.registerBatch(additions);
        // No choice is exposed until both native cameras and original source are decoded.
        runtime = next; root.CQC_PASS21_MACHINE_COSTUME_RUNTIME = next;
        const registration = foundation.registerBatch(additions);
        installBridge(bridge);
        receipt = {uid: UID, id: ID, native, registration, metadataSHA256: DESCRIPTOR.sha256, metadataPins: clone(DESCRIPTORS), uids: candidates.map(candidate => candidate.uid), sourceContractSHA256: CONTRACT.sha256};
        phase = 'ready'; emit({type: 'index-ready', source: 'native-machine-parts', entries: candidates.length});
        const fighters = hooks.getFighters?.() || [];
        for (let slot = 0; slot < 2; slot++) if (owned(fighters[slot]?.uid, ID) && root.CQC_COSTUMES_PASS17.chosen(slot, fighters[slot].uid) === ID) notify('onCommit', {slot, uid: fighters[slot].uid, id: ID, fighter: {...fighters[slot], costume: ID}});
        return clone(receipt);
      } catch (caught) {
        next.dispose(); runtime = null; if (prior === undefined) delete root.CQC_PASS21_MACHINE_COSTUME_RUNTIME; else root.CQC_PASS21_MACHINE_COSTUME_RUNTIME = prior;
        throw caught;
      }
    })().catch(caught => { phase = 'failed'; error = caught.message; installing = null; throw caught; });
    return installing;
  }
  return {version: 'pass21-native-machine-registration/2', install, get ready() { return installing; },
    status: () => ({phase, error, ready: phase === 'ready', publiclySelectable: phase === 'ready', receipt: receipt && clone(receipt), native: runtime?.status() || null}),
    sourcePins: {descriptor: clone(DESCRIPTOR), descriptors: clone(DESCRIPTORS), contract: clone(CONTRACT)}};
});
