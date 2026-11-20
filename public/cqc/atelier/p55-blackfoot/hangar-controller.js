/* Isolated hangar adapter. It never registers a machine, fighter or encounter. */
(function (root, factory) {
  'use strict';
  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.CQC_P55_BLACKFOOT_HANGAR = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function (root) {
  'use strict';
  const SOURCES = Object.freeze([
    {id: 'controller', file: 'blackfoot-isolated-controller-landing-v3.js', bytes: 5740, sha256: 'dbceaa43deb9eb004e9b6c1d4cab1515aad71c0f1d711777545be714412e30e6'},
    {id: 'parts', file: 'PARTS_CANDIDATE_ACTUAL_V1.json', bytes: 225014, sha256: 'd4a167d00492280184afc05404d501dd3b7cf8ea2468ccafc4139b57db196c81'},
    {id: 'atlas', file: 'right-parts-v2.png', bytes: 1859482, sha256: 'e5e0dd36ea1b9ac6885f77be8566581885103c1c19e406c4e6c7f3c1e325b3fb'}
  ]);
  const fail = message => { throw new Error('Blackfoot hangar: ' + message); };
  const release = image => { if (typeof image?.close === 'function') image.close(); };
  async function digest(bytes) {
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
  function create(options = {}) {
    const fetcher = options.fetch || root.fetch?.bind(root), hasher = options.sha256 || digest, decoder = options.decode || decode;
    const resolve = options.resolveURL || (file => new URL(file, options.baseURL || root.document.baseURI).href);
    const position = (options.position || [630, 390]).slice(), scale = options.scale ?? 1.8;
    if (!fetcher || !position.every(Number.isFinite) || position.length !== 2 || !Number.isFinite(scale) || scale <= 0) fail('source transport and explicit owner geometry required');
    let entry = null, current = 0, pending = null, attempt = {state: 'missing', error: null};
    function status() {
      return {state: entry ? 'ready' : attempt.state, error: attempt.error, admitted: false,
        scope: 'isolated-right-review-only', sourcePixelsModified: false, globalCatalogueModified: false,
        pins: entry ? entry.pins.map(pin => ({...pin})) : []};
    }
    async function load(request = {}) {
      if (entry && !request.reload) return status();
      if (pending && !request.reload) return pending;
      const ticket = ++current;
      attempt = {state: 'loading', error: null};
      const work = async () => {
        let image = null;
        const active = () => current === ticket && !request.signal?.aborted;
        try {
          const settled = await Promise.allSettled(SOURCES.map(async pin => {
            const response = await fetcher(resolve(pin.file), {signal: request.signal, cache: 'force-cache'});
            if (!response.ok) fail('source HTTP ' + response.status + ': ' + pin.file);
            const bytes = await response.arrayBuffer();
            if (bytes.byteLength !== pin.bytes || await hasher(bytes) !== pin.sha256) fail('source bytes differ: ' + pin.file);
            return {pin, bytes};
          }));
          const failure = settled.find(result => result.status === 'rejected');
          if (failure) throw failure.reason;
          if (!active()) fail('load superseded or aborted');
          const resources = new Map(settled.map(result => [result.value.pin.id, result.value]));
          const data = JSON.parse(new TextDecoder().decode(resources.get('parts').bytes));
          if (data.source?.file !== 'right-parts-v2.png') fail('unexpected atlas path');
          const controller = options.controller || root.CQC_P41_BLACKFOOT_ISOLATED || await options.ensureController?.();
          if (typeof controller?.create !== 'function') fail('verified controller unavailable');
          const rig = controller.create(data);
          image = await decoder(resources.get('atlas').bytes);
          if ((image.width || image.naturalWidth) !== 1536 || (image.height || image.naturalHeight) !== 1024) fail('decoded atlas dimensions differ');
          if (!active()) fail('load superseded or aborted');
          const previous = entry;
          entry = {rig, image, pins: SOURCES.map(pin => ({...pin}))};
          image = null; release(previous?.image);
          attempt = {state: 'ready', error: null};
          return status();
        } catch (error) {
          release(image);
          if (ticket === current) attempt = {state: 'error', error: String(error?.message || error)};
          throw error;
        }
      };
      pending = work();
      const own = pending;
      try { return await own; }
      finally { if (pending === own) pending = null; }
    }
    function sample(options = {}) {
      if (!entry) return null;
      return entry.rig.sample({position, scale, frame: options.frame ?? 0, facing: options.facing ?? 'right',
        aimDegrees: options.aimDegrees ?? 0, pitchDegrees: options.pitchDegrees ?? 0,
        hoverAmplitude: 0, defeated: options.defeated === true, reducedMotion: options.reducedMotion === true});
    }
    function draw(context, options = {}) {
      const pose = sample(options);
      return pose && entry.rig.draw(context, entry.image, pose) ? pose : null;
    }
    function dispose() { ++current; pending = null; release(entry?.image); entry = null; attempt = {state: 'missing', error: null}; }
    return Object.freeze({load, sample, draw, dispose, status});
  }
  return Object.freeze({create, sources: SOURCES, admitted: false, schema: 'cqc.p55.blackfoot-hangar/1'});
});
