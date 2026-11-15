/* Private PASS21 proposal. Native pieces reuse the source rig and its existing state. */
(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.CQC_PASS21_NATIVE_MACHINE_COSTUMES = api;
})(typeof globalThis === 'undefined' ? this : globalThis, function () {
  'use strict';
  const SCHEMA = 'cqc.native-machine-costume/1';
  const CONTRACT_SHA = '24085b924bcf0b42b6c77897d81161a7f6540c52afbfa91e7c26d14677d73548';
  const copy = value => JSON.parse(JSON.stringify(value));
  const fail = message => { throw new Error('Native machine costume: ' + message); };
  const stable = value => JSON.stringify(value, (_, item) => item && typeof item === 'object' && !Array.isArray(item)
    ? Object.fromEntries(Object.keys(item).sort().map(key => [key, item[key]])) : item);
  const artKeys = new Set(['source', 'rect', 'pivot', 'imageScale', 'textureRotation', 'sourceClipPolygonNativeXY']);
  function skeleton(machine) {
    return {id: machine.id, origin: machine.origin, scale: machine.scale,
      parts: machine.parts.map(part => Object.fromEntries(Object.entries(part).filter(([key]) => !artKeys.has(key))
        .map(([key, value]) => [key, key === 'variants' ? value.map(variant => Object.fromEntries(
          Object.entries(variant).filter(([field]) => !artKeys.has(field)))) : value])))};
  }
  function normalizedSnapshot(machine) {
    return {id: machine.id, origin: machine.origin, scale: machine.scale,
      sources: Array.from(machine.sources.values()), parts: machine.parts};
  }
  async function sha256(bytes) {
    if (!globalThis.crypto?.subtle) fail('SHA256 unavailable');
    return Array.from(new Uint8Array(await globalThis.crypto.subtle.digest('SHA-256', bytes)), b => b.toString(16).padStart(2, '0')).join('');
  }
  function bindTexture(original, binding, partID) {
    if (!binding || binding.partID !== partID) fail('missing exact part binding ' + partID);
    if (!Array.isArray(binding.rect) || binding.rect.length !== 4 || !binding.rect.every(Number.isInteger) || binding.rect[2] <= 0 || binding.rect[3] <= 0) fail('invalid native rectangle ' + partID);
    if (!Array.isArray(binding.pivot) || binding.pivot.length !== 2 || !binding.pivot.every(Number.isFinite)) fail('invalid native pivot ' + partID);
    if (!Number.isFinite(binding.imageScale) || binding.imageScale <= 0) fail('invalid uniform texture scale ' + partID);
    if (binding.scale || binding.mirror || binding.flipX || binding.flipY || binding.rotation !== undefined || binding.offset !== undefined || binding.parent !== undefined || binding.detachment !== undefined || binding.channels !== undefined) fail('texture binding changes source skeleton ' + partID);
    const result = copy(original);
    for (const key of artKeys) delete result[key];
    for (const key of ['source', 'rect', 'pivot', 'imageScale']) result[key] = copy(binding[key]);
    if (!Number.isFinite(binding.textureRotation) || Math.abs(binding.textureRotation) > 180) fail('invalid rigid texture rotation ' + partID);
    result.textureRotation = binding.textureRotation;
    if (binding.sourceClipPolygonNativeXY) result.sourceClipPolygonNativeXY = copy(binding.sourceClipPolygonNativeXY);
    return result;
  }
  async function create(deps = {}) {
    const parts = deps.parts, sourceCatalog = deps.catalog, sourceData = deps.data;
    if (!parts?.create || !parts?.normalizeCatalog || !deps.bridgeFactory || !sourceData || !sourceCatalog) fail('real parts renderer, source catalogue, source data and bridge factory are required');
    const hasher = deps.sha256 || sha256;
    const contractBytes = deps.sourceContractBytes;
    if (!contractBytes || await hasher(contractBytes) !== CONTRACT_SHA) fail('source contract SHA256 differs');
    const contract = JSON.parse(new TextDecoder().decode(contractBytes));
    const rows = new Map(contract.rows.map(row => [row.uid, row]));
    const originals = parts.normalizeCatalog(sourceCatalog);
    const sourceRegistry = parts.create(sourceCatalog, deps.rendererOptions || {});
    const entries = new Map(), traces = [];
    let scope = null;
    const facade = {
      load: (...args) => sourceRegistry.load(...args), ready: id => sourceRegistry.ready(id),
      status: id => sourceRegistry.status(id), ids: () => sourceRegistry.ids(),
      dispose: (...args) => sourceRegistry.dispose(...args),
      draw(context, id, state) {
        if (!scope) return sourceRegistry.draw(context, id, state);
        const camera = scope.entry.cameras.get(scope.face);
        if (!camera || camera.sourceRigID !== id || !camera.registry.ready(id)) return false;
        const forwarded = copy(state);
        traces.push({uid: scope.entry.uid, costumeID: scope.entry.id, face: scope.face, sourceRigID: id,
          state: forwarded, sourceStateUnchanged: true, skeletonSHA256: camera.skeletonSHA256});
        if (traces.length > 32) traces.shift();
        return camera.registry.draw(context, id, state);
      },
      drawCore: (...args) => sourceRegistry.drawCore(...args),
    };
    const sourceBridge = deps.bridgeFactory({parts, catalog: sourceCatalog, data: sourceData, registry: facade,
      rendererOptions: deps.rendererOptions || {}, disableLifecycleListeners: true, loadingUI: () => {},
      ...(deps.bridgeOptions || {})});
    const key = (uid, id) => uid + '\u0000' + id;
    function resolve(actor) {
      if (!actor || typeof actor.uid !== 'string' || typeof actor.costume !== 'string') return null;
      return entries.get(key(actor.uid, actor.costume)) || null;
    }
    async function build(uid, option) {
      const row = rows.get(uid), native = option?.machineParts;
      if (!row || row.sourceNativeBody !== 'rig') fail('UID does not own an articulated source machine');
      if (option.sprite || !native || native.schema !== SCHEMA || native.sourceUID !== uid || native.sourceContractSHA256 !== CONTRACT_SHA) fail('wrong source UID, contract or human sprite');
      if (!['retro', 'tuxedo', 'alternate'].includes(option.family) || !/^[A-Za-z0-9_:-]+$/.test(option.id || '')) fail('unsupported owned costume');
      if (!/^native-(retro|tuxedo|alternate)-parts-v1$/.test(native.pass21Revision || '')) fail('unreviewed parts revision');
      if (native.anatomy?.kind !== 'source-articulated-machine' || native.anatomy.humanBody !== false || native.anatomy.identicalSourceSkeleton !== true) fail('source machine anatomy is required');
      if (option.provenance?.sourceUID !== uid || option.provenance.originalDesign !== true || option.provenance.canonicalAppearanceAttested !== false) fail('qualified authored appearance provenance required');
      const review = option.assetReview;
      if (!review?.verified || !review.independentArt || !review.machineAnatomyReviewed || !review.sourceJointGeometryReviewed || !review.reviewer || !review.reviewedAt) fail('physical source and joint review required');
      if (!Array.isArray(native.cameras) || native.cameras.length !== 2 || new Set(native.cameras.map(camera => camera.face)).size !== 2) fail('two independent native camera sources required');
      const entry = {uid, id: option.id, option: copy(option), cameras: new Map(), originalDisplayHeight: row.originalDisplayHeight};
      const sourceHashes = [];
      const originalSourceFiles = new Set(row.sourceRigCameras.flatMap(camera => camera.nativeMachineDefinition.sources.map(source => source.file)));
      const originalSourceHashes = new Set(row.sourceRigCameras.flatMap(camera => camera.nativeMachineDefinition.sources.map(source => source.sha256)));
      for (const camera of native.cameras) {
        if (![1, -1].includes(camera.face)) fail('invalid camera face');
        const originalCamera = row.sourceRigCameras.find(candidate => candidate.face === camera.face);
        if (!originalCamera || camera.sourceRigID !== originalCamera.id || sourceData.playable?.[uid]?.[camera.face === 1 ? 1 : 0] !== originalCamera.id) fail('camera is bound to a different source incarnation');
        const raw = originalCamera.nativeMachineDefinition;
        const actual = originals.get(raw.id);
        const pinned = parts.normalizeCatalog({schema: parts.schema, machines: [raw]}).get(raw.id);
        if (!actual || stable(normalizedSnapshot(actual)) !== stable(normalizedSnapshot(pinned))) fail('live source rig differs from reviewed contract');
        if (await hasher(new TextEncoder().encode(stable(raw))) !== camera.sourceRigDefinitionSHA256) fail('source definition fingerprint differs');
        const sourceState = sourceData.states?.[raw.id] || {};
        const height = sourceState.displayHeight > 0 ? sourceState.displayHeight : sourceState.kind === 'heavy_biped' ? 420 : sourceState.kind === 'small_biped' ? 155 : sourceState.kind === 'radial' ? 133 : sourceState.kind === 'pod' ? 222 : sourceState.kind === 'authored_vr' ? 250 : 288;
        if (height !== row.originalDisplayHeight || native.displayHeight !== row.originalDisplayHeight) fail('source physical height changed');
        if (!Array.isArray(camera.bindings) || camera.bindings.length !== raw.parts.length || new Set(camera.bindings.map(binding => binding.partID)).size !== raw.parts.length) fail('native part coverage is incomplete');
        const bindings = new Map(camera.bindings.map(binding => [binding.partID, binding]));
        const machine = copy(raw);
        if (!Array.isArray(camera.sources) || !camera.sources.length || camera.sources.some(source => originalSourceFiles.has(source.file) || originalSourceHashes.has(source.sha256))) fail('old source texture cannot masquerade as newly drawn costume art');
        machine.sources = copy(camera.sources);
        machine.parts = raw.parts.map(part => {
          const binding = bindings.get(part.id);
          const rebound = bindTexture(part, binding, part.id);
          if ((part.variants || []).length !== (binding.variants || []).length) fail('native variant coverage differs ' + part.id);
          if (part.variants?.length) rebound.variants = part.variants.map((variant, index) => bindTexture(variant,
            {...binding.variants[index], partID: part.id + ':variant:' + index}, part.id + ':variant:' + index));
          return rebound;
        });
        if (stable(skeleton(machine)) !== stable(skeleton(raw))) fail('native textures changed source articulation or destruction');
        const normalized = parts.normalizeCatalog({schema: parts.schema, machines: [machine]}).get(machine.id);
        if (stable(skeleton(normalized)) !== stable(skeleton(actual))) fail('normalized source skeleton changed');
        const registry = parts.create({schema: parts.schema, machines: [machine]}, deps.rendererOptions || {});
        const skeletonSHA256 = await hasher(new TextEncoder().encode(stable(skeleton(actual))));
        entry.cameras.set(camera.face, {sourceRigID: machine.id, registry, definition: normalized, skeletonSHA256});
        sourceHashes.push(stable(machine.sources.map(source => source.sha256).sort()));
      }
      if (sourceHashes[0] === sourceHashes[1]) fail('reverse view is not independently drawn');
      return entry;
    }
    async function registerBatch(additions) {
      if (!Array.isArray(additions) || !additions.length) fail('empty registration batch');
      const prepared = [];
      try {
        const seen = new Set();
        for (const addition of additions) {
          const id = key(addition.uid, addition.option?.id);
          if (seen.has(id) || entries.has(id)) fail('duplicate owned costume');
          seen.add(id); prepared.push(await build(addition.uid, addition.option));
        }
        for (const entry of prepared) {
          for (const camera of entry.cameras.values()) await camera.registry.load(camera.sourceRigID);
          if (await sourceBridge.whenReady(entry.uid, {bothFaces: true}) !== true) fail('original source rig could not be byte-verified');
        }
        for (const entry of prepared) entries.set(key(entry.uid, entry.id), entry);
        return {accepted: prepared.length, verifiedNativeSourcePins: prepared.flatMap(entry => Array.from(entry.cameras.values()).flatMap(camera => camera.registry.status(camera.sourceRigID).pins)), simulationMutation: false};
      } catch (error) {
        for (const entry of prepared) for (const camera of entry.cameras.values()) camera.registry.dispose();
        throw error;
      }
    }
    function withSelection(actor, face, callback) {
      const entry = resolve(actor), camera = entry?.cameras.get(face);
      if (!entry || !camera || !camera.registry.ready(camera.sourceRigID) || !sourceRegistry.ready(camera.sourceRigID)) return false;
      const previous = scope; scope = {entry, face};
      try { return callback(entry); } finally { scope = previous; }
    }
    function presentationPose(pose) {
      if (pose.action) return pose;
      if (pose.attack === true || pose.attacking === true) return {...pose, action: 'attack'};
      if (pose.walk === true || pose.run === true || pose.dash === true) return {...pose, action: 'walk'};
      return pose;
    }
    function drawSelected(context, actor, face, callback) {
      return withSelection(actor, face, entry => {
        context.save();
        try { if (entry.option.family === 'retro') context.imageSmoothingEnabled = false; return callback(entry); }
        finally { context.restore(); }
      });
    }
    return {
      schema: SCHEMA, registerBatch, has: actor => !!resolve(actor),
      ownsOption: (uid, option) => !!option && stable(entries.get(key(uid, option.id))?.option) === stable(option),
      optionFor: (uid, id) => { const entry = entries.get(key(uid, id)); return entry ? copy(entry.option) : null; },
      async whenReady(actor, options = {}) {
        const entry = resolve(actor); if (!entry) return false;
        for (const [face, camera] of entry.cameras) if (!options.face || options.face === face) await camera.registry.load(camera.sourceRigID);
        await sourceBridge.whenReady(entry.uid, options);
        return Array.from(entry.cameras.values()).every(camera => camera.registry.ready(camera.sourceRigID) && sourceRegistry.ready(camera.sourceRigID));
      },
      ready: (actor, face = -1) => { const entry = resolve(actor), camera = entry?.cameras.get(face); return !!camera?.registry.ready(camera.sourceRigID) && sourceRegistry.ready(camera.sourceRigID); },
      drawPlayable(context, actor, x, y, face, scale, pose = {}) {
        return drawSelected(context, actor, face, () => sourceBridge.drawPlayable(context, actor, x, y, face, scale, presentationPose(pose)));
      },
      drawFitted(context, actor, box, face = -1, pose = {}) {
        return drawSelected(context, actor, face, () => sourceBridge.drawFitted(context, actor.uid, box, face, presentationPose(pose)));
      },
      drawRigState(context, actor, x, y, face, scale, state) {
        if (![x, y, scale].every(Number.isFinite) || scale <= 0 || !state || state.origin && stable(state.origin) !== '[0,0]') return false;
        return withSelection(actor, face, entry => {
          const camera = entry.cameras.get(face), bounds = sourceBridge.bounds(camera.sourceRigID);
          if (state.id && state.id !== camera.sourceRigID) return false;
          const factor = scale * entry.originalDisplayHeight / bounds.height;
          context.save();
          try {
            if (entry.option.family === 'retro') context.imageSmoothingEnabled = false;
            context.translate(x, y); context.scale(factor, factor);
            context.translate(-(bounds.left + bounds.width / 2), -(bounds.top + bounds.height));
            return facade.draw(context, camera.sourceRigID, state);
          } finally { context.restore(); }
        });
      },
      bounds: (actor, face = -1) => { const entry = resolve(actor); return entry ? sourceBridge.bounds(entry.cameras.get(face)?.sourceRigID) : null; },
      status: () => ({ownedCostumes: Array.from(entries.values(), entry => ({uid: entry.uid, id: entry.id, displayHeight: entry.originalDisplayHeight,
        cameras: Array.from(entry.cameras, ([face, camera]) => ({face, sourceRigID: camera.sourceRigID, native: camera.registry.status(camera.sourceRigID)}))})),
        sourceStateForwarding: traces.map(trace => copy(trace)), simulationMutation: false}),
      inspectPose(actor, face, state) { const entry = resolve(actor), camera = entry?.cameras.get(face); return camera ? parts.pose(camera.definition, state) : null; },
      dispose() { for (const entry of entries.values()) for (const camera of entry.cameras.values()) camera.registry.dispose(); entries.clear(); sourceBridge.dispose(); },
    };
  }
  return {schema: SCHEMA, sourceContractSHA256: CONTRACT_SHA, create, stable, skeleton};
});
