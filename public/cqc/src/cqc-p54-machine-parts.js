/* Gander's separate P53 PNGs use the admitted rig's native atlas coordinates.
 * No joint, source pixel, attack, camera, hitbox or simulation clock is replaced.
 * Install before the existing machine bridge creates its renderer registry.
 */
(function (root, factory) {
  'use strict';
  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.CQC_P54_MACHINE_PARTS = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function (root) {
  'use strict';
  const ID = 'gander_ghost_gbc2000';
  const PREFIX = 'assets/p54-gander-parts/';
  const MANIFEST = 'assets/p54-gander-parts/manifest.json';
  const CONTRACT_SHA256 = 'a14c01fa27bce670540e15057d31870de2b2476fe7ef405af0cfb13768544e0e';
  const SCHEMA = 'cqc.p54.gander-separated-parts/1';
  const DEG = Math.PI / 180;
  const finite = Number.isFinite;
  const same = (a, b) => JSON.stringify(a ?? null) === JSON.stringify(b ?? null);
  const fail = message => { throw new Error('Gander parts: ' + message); };
  const release = image => { if (typeof image?.close === 'function') image.close(); };
  const near = (a, b) => Array.isArray(a) && Array.isArray(b) && a.length === b.length
    && a.every((n, i) => finite(n) && Math.abs(n - b[i]) < 1e-8);
  async function sha256(bytes) {
    if (!root.crypto?.subtle) fail('SHA256 unavailable');
    return Array.from(new Uint8Array(await root.crypto.subtle.digest('SHA-256', bytes)), n => n.toString(16).padStart(2, '0')).join('');
  }
  async function decode(bytes) {
    const blob = new Blob([bytes], {type: 'image/png'});
    if (typeof root.createImageBitmap === 'function') return root.createImageBitmap(blob);
    const image = new root.Image(), url = root.URL.createObjectURL(blob);
    try { image.src = url; await image.decode(); return image; }
    finally { root.URL.revokeObjectURL(url); }
  }
  function validateContract(contract, machine) {
    if (contract?.schema !== SCHEMA || contract.machineID !== ID || !Array.isArray(contract.records)
      || contract.records.length !== 43) fail('unrecognized source contract');
    const representation = machine.parts.find(p => p.id === 'carapace')?.source === 'gander_pass30' ? 'pass30' : 'pass16';
    const rows = contract.records.filter(row => row.representation === representation);
    if (rows.length !== (representation === 'pass30' ? 24 : 19)) fail('incomplete source representation');
    const paths = new Set();
    for (const row of rows) {
      if (typeof row.file !== 'string' || !/^(?:pass16|pass30)\/[a-z0-9_-]+\.png$/.test(row.file)
        || paths.has(row.file) || !/^[a-f0-9]{64}$/.test(row.sha256)
        || !Number.isInteger(row.bytes) || row.bytes < 8 || row.bytes > 32 * 1024 * 1024
        || !Number.isInteger(row.width) || row.width < 1 || !Number.isInteger(row.height) || row.height < 1
        || row.width > 16384 || row.height > 16384) fail('invalid individual PNG pin');
      paths.add(row.file);
      const part = machine.parts.find(p => p.id === row.part);
      const appearance = row.when === null ? part : part?.variants.find(v => v.when === row.when);
      const source = machine.sources.get(row.source);
      const native = row.sourceRectXYWH, rect = row.rigRectXYWH;
      if (!part || !appearance || !source || source.sha256 !== row.sourceSHA256
        || appearance.source !== row.source || !same(appearance.rect, rect)
        || !Array.isArray(native) || native.length !== 4 || !native.every(Number.isInteger)
        || native[0] < 0 || native[1] < 0 || native[2] !== row.width || native[3] !== row.height
        || native[0] + row.width > source.width || native[1] + row.height > source.height
        || part.parent !== (row.parent ?? null) || !near(part.offset, row.offsetXY)
        || Math.abs(appearance.imageScale - row.imageScale) > 1e-8
        || !near(appearance.pivot, [row.pivotXY[0] + native[0] - rect[0], row.pivotXY[1] + native[1] - rect[1]])
        || !same(appearance.sourceClipPolygonNativeXY, row.sourceClipPolygonNativeXY)) fail('native rig differs: ' + row.part);
    }
    const visible = machine.parts.filter(part => part.rect?.[2] !== 1 || part.rect?.[3] !== 1);
    if (!visible.every(part => rows.some(row => row.part === part.id && row.when === null))) fail('unmapped visible rig part');
    return rows;
  }
  function createPainter(machine, parts, options = {}) {
    if (machine?.id !== ID || typeof parts?.pose !== 'function') fail('admitted Gander rig required');
    const fetcher = options.fetch || root.fetch?.bind(root), decoder = options.decode || decode, hasher = options.sha256 || sha256;
    if (!fetcher) fail('fetch unavailable');
    const resolve = options.resolveURL || (file => new URL(file, options.baseURL || new URL('../', root.document.baseURI)).href);
    const fileURL = file => resolve(file === MANIFEST ? file : PREFIX + file, machine);
    let rows = null, images = new Map(), pins = [], current = 0, pending = null;
    let attempt = {state: 'missing', error: null};
    function ready() { return !!rows && images.size === rows.length; }
    function status() {
      return {id: ID, state: ready() ? 'ready' : attempt.state, attemptState: attempt.state,
        error: attempt.error, separatedPNGs: true, pins: ready() ? pins.map(pin => ({...pin})) : []};
    }
    async function requestBytes(file, request) {
      const response = await fetcher(fileURL(file), {signal: request.signal, cache: 'force-cache'});
      if (!response.ok) fail('source HTTP ' + response.status + ': ' + file);
      return response.arrayBuffer();
    }
    async function load(request = {}) {
      if (ready() && !request.reload) return status();
      if (pending && !request.reload) return pending;
      const ticket = ++current, loaded = new Map(), verified = [];
      attempt = {state: 'loading', error: null};
      const stillCurrent = () => ticket === current && !request.signal?.aborted;
      const work = async () => {
        try {
          let contract = options.contract;
          if (!contract) {
            const bytes = await requestBytes(MANIFEST, request);
            if (bytes.byteLength > 512 * 1024 || await hasher(bytes) !== (options.contractSHA256 || CONTRACT_SHA256)) fail('source contract SHA256 differs');
            contract = JSON.parse(new TextDecoder().decode(bytes));
          }
          const nextRows = validateContract(contract, machine);
          let cursor = 0;
          async function worker() {
            while (cursor < nextRows.length) {
              if (!stillCurrent()) fail('load superseded or aborted');
              const row = nextRows[cursor++], bytes = await requestBytes(row.file, request);
              const header = new Uint8Array(bytes, 0, Math.min(8, bytes.byteLength));
              if (bytes.byteLength !== row.bytes || ![137, 80, 78, 71, 13, 10, 26, 10].every((n, i) => header[i] === n)
                || await hasher(bytes) !== row.sha256) fail('individual PNG bytes differ: ' + row.file);
              const image = await decoder(bytes, row);
              if (!stillCurrent()) { release(image); fail('load superseded or aborted'); }
              loaded.set(row.file, image);
              if ((image.width || image.naturalWidth) !== row.width || (image.height || image.naturalHeight) !== row.height) fail('individual PNG dimensions differ: ' + row.file);
              verified.push({id: row.file, file: PREFIX + row.file, bytes: row.bytes, sha256: row.sha256, width: row.width, height: row.height});
            }
          }
          // Finish all workers before disposing their temporary decoded images.
          const results = await Promise.allSettled(Array.from({length: 4}, worker));
          const rejected = results.find(result => result.status === 'rejected');
          if (rejected) throw rejected.reason;
          if (!stillCurrent()) fail('load superseded or aborted');
          const old = images;
          rows = nextRows; images = loaded; pins = verified; attempt = {state: 'ready', error: null};
          old.forEach(release);
          return status();
        } catch (error) {
          loaded.forEach(release);
          if (ticket === current) attempt = {state: 'error', error: String(error?.message || error)};
          throw error;
        }
      };
      pending = work();
      const own = pending;
      try { return await own; }
      finally { if (pending === own) pending = null; }
    }
    function planned(state = {}) {
      if (!ready()) return null;
      const poses = parts.pose(machine, state), result = [];
      for (const part of machine.paintOrder) {
        const pose = poses.get(part.id);
        if (!pose?.visible || pose.opacity <= 0 || pose.rect?.[2] === 1 && pose.rect?.[3] === 1) continue;
        const row = rows.find(row => row.part === part.id && row.source === pose.source && same(row.rigRectXYWH, pose.rect));
        if (!row || !images.has(row.file)) fail('unmapped active appearance: ' + part.id);
        const r = row.sourceRectXYWH, rect = pose.rect;
        result.push({part, pose, row, image: images.get(row.file),
          destination: [(r[0] - rect[0] - pose.pivot[0]) * pose.imageScale, (r[1] - rect[1] - pose.pivot[1]) * pose.imageScale,
            r[2] * pose.imageScale, r[3] * pose.imageScale]});
      }
      return result;
    }
    function draw(context, state = {}) {
      const plan = planned(state);
      if (!plan) return false;
      for (const {pose, row, image, destination} of plan) {
        context.save();
        try {
          context.transform(...pose.matrix);
          if (pose.textureRotation) context.rotate(pose.textureRotation * DEG);
          context.globalAlpha *= pose.opacity;
          context.drawImage(image, 0, 0, row.width, row.height, ...destination);
        } finally { context.restore(); }
      }
      return true;
    }
    function sourcePoint(partID, nativeXY, state = {}) {
      const pose = parts.pose(machine, state).get(partID);
      if (!pose || !Array.isArray(nativeXY) || nativeXY.length !== 2 || !nativeXY.every(finite)) return null;
      const x = (nativeXY[0] - pose.rect[0] - pose.pivot[0]) * pose.imageScale;
      const y = (nativeXY[1] - pose.rect[1] - pose.pivot[1]) * pose.imageScale;
      const angle = (pose.textureRotation || 0) * DEG, a = x * Math.cos(angle) - y * Math.sin(angle), b = x * Math.sin(angle) + y * Math.cos(angle), m = pose.matrix;
      return {x: m[0] * a + m[2] * b + m[4], y: m[1] * a + m[3] * b + m[5]};
    }
    function dispose() { ++current; pending = null; images.forEach(release); images = new Map(); rows = null; pins = []; attempt = {state: 'missing', error: null}; }
    return {load, ready, status, draw, sourcePoint, dispose};
  }
  function wrapFactory(parts, options = {}) {
    if (parts?.p54SeparatedGander === true) return parts;
    if (typeof parts?.create !== 'function' || typeof parts.normalizeCatalog !== 'function') fail('native renderer unavailable');
    return {...parts, p54SeparatedGander: true, create(catalog, rendererOptions = {}) {
      const registry = parts.create(catalog, rendererOptions);
      const raw = catalog.machines?.find(machine => machine.id === ID);
      if (!raw) return registry;
      const machine = parts.normalizeCatalog({schema: catalog.schema, machines: [raw]}).get(ID);
      const painter = createPainter(machine, parts, {...rendererOptions, ...options});
      const wrapped = {...registry,
        load: (id, request = {}) => id === ID ? painter.load(request) : registry.load(id, request),
        ready: id => id === ID ? painter.ready() : registry.ready(id),
        status: id => id === ID ? painter.status() : registry.status(id),
        draw: (context, id, state = {}) => id === ID ? painter.draw(context, state) : registry.draw(context, id, state),
        drawCore(context, state, drawOptions = {}) {
          if ((drawOptions.id || state?.boss?.id) !== ID && state?.boss?.id !== 'gander') return registry.drawCore(context, state, drawOptions);
          const adapter = parts.corePose(state, {...drawOptions, id: ID});
          if (!adapter) return false;
          const corrected = root.CQC_PASS28_RIG_SETUP?.presentationPose?.(ID, adapter, state) || adapter;
          return painter.draw(context, corrected);
        },
        dispose(id) { if (id === undefined || id === ID) painter.dispose(); return registry.dispose(id); }
      };
      return wrapped;
    }};
  }
  function install(options = {}) {
    root.CQC_MACHINE_PARTS = wrapFactory(root.CQC_MACHINE_PARTS, options);
    return root.CQC_MACHINE_PARTS;
  }
  return Object.freeze({id: ID, version: '1.0.0', contractSHA256: CONTRACT_SHA256, createPainter, validateContract, wrapFactory, install,
    scope: 'Existing 43 P53 PNG exports, current P30 camera uses 24 appearances; no new artwork, joints, attacks or camera changes.'});
});
