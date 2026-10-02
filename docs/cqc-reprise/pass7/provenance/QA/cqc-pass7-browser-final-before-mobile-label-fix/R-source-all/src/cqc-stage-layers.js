/* CQC stage art: optional, reviewed image layers. Gameplay coordinates stay in the combat engine. */
(function (root, factory) {
  'use strict';
  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root && root.document) {
    root.CQC_STAGE_LAYER_ENGINE = api;
    root.CQC_STAGE_LAYERS = api.createRenderer(root.CQC_STAGE_LAYER_DATA || { stages: [] });
  }
})(typeof globalThis === 'object' ? globalThis : this, function (root) {
  'use strict';
  const WIDTH = 1280, HEIGHT = 720, GROUND = 568;
  // Resolve assets from this script, so root albums, nested modules and /cqc/ all share the same catalog.
  let defaultBaseURL = '../';
  const scriptURL = root?.document?.currentScript?.src;
  if (scriptURL && typeof root.URL === 'function') {
    try { defaultBaseURL = new root.URL('../', scriptURL).href; } catch (_) { /* SSR/inline script keeps the relative default. */ }
  }
  const PHASES = new Set(['background', 'foreground']);
  const ROLES = new Set(['sky', 'distant', 'architecture', 'ground', 'foreground', 'ambient']);
  const WEATHER = new Set(['none', 'snow', 'rain', 'petals', 'embers', 'dust']);
  const HASH = /^[a-f0-9]{64}$/;
  const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
  const finite = n => typeof n === 'number' && Number.isFinite(n);
  const localPath = value => typeof value === 'string' && value.length > 0 &&
    !/^(?:[a-z]+:|\/|\\)/i.test(value) && !value.split(/[\\/]/).includes('..');
  const externalURL = value => typeof value === 'string' && /^https?:\/\/[^\s]+$/i.test(value);

  function validateStage(stage) {
    const errors = [];
    if (!stage || typeof stage !== 'object') return ['Stage must be an object.'];
    if (!/^[a-z0-9_]+$/.test(stage.id || '')) errors.push('Invalid stage ID.');
    if (!stage.approved) return errors;
    if (stage.review?.status !== 'accepted_closest')
      errors.push('Approved stage needs an explicit fidelity review.');
    if (!stage.review?.notes || !stage.incarnation) errors.push('Review notes and exact incarnation are required.');
    const references = stage.references || [];
    if (!references.length || references.some(ref => !externalURL(ref.url) || !ref.incarnation || !ref.source ||
        !HASH.test(ref.sha256 || '') || !localPath(ref.file) ||
        !['official_art', 'original_game_capture'].includes(ref.sourceType)))
      errors.push('Approved stage needs documented external references.');
    if (!Array.isArray(stage.layers) || stage.layers.length < 3) {
      errors.push('At least three separate image layers are required.');
      return errors;
    }
    const ids = new Set(), paths = new Set(), hashes = new Set(), depths = new Set();
    let hasGround = false, hasForeground = false, opaqueBackground = false;
    for (const layer of stage.layers) {
      if (!layer || typeof layer !== 'object') { errors.push('Invalid image layer.'); continue; }
      if (!layer.id || ids.has(layer.id)) errors.push('Layer IDs must be unique.');
      if (!localPath(layer.file) || !/\.png$/i.test(layer.file) || paths.has(layer.file))
        errors.push('Layer files must be distinct local PNG paths.');
      if (!HASH.test(layer.sha256 || '') || hashes.has(layer.sha256)) errors.push('Distinct SHA-256 values are required.');
      if (!PHASES.has(layer.phase) || !ROLES.has(layer.role)) errors.push('Invalid layer phase or role.');
      if (!finite(layer.parallax) || layer.parallax < 0 || layer.parallax > 1.5) errors.push('Invalid parallax depth.');
      if (!finite(layer.width) || !finite(layer.height) || layer.width < 1 || layer.height < 1)
        errors.push('Original image dimensions are required.');
      const rect = layer.rect;
      if (!rect || ![rect.x, rect.y, rect.width, rect.height].every(finite) || rect.width <= 0 || rect.height <= 0)
        errors.push('A valid image placement is required.');
      else if (Math.abs(rect.width / rect.height - layer.width / layer.height) > .015)
        errors.push('Layer placement must preserve the original aspect ratio.');
      if (layer.phase === 'foreground' && !layer.transparent) errors.push('Foreground PNG must contain transparency.');
      if (layer.role === 'ground') {
        hasGround = true;
        if (layer.parallax !== 1 || layer.phase !== 'background') errors.push('Ground must track the fighter camera exactly.');
      }
      if (layer.edgeRepeatPixels !== undefined &&
          (layer.role !== 'ground' || layer.phase !== 'background' || layer.parallax !== 1 ||
           !Number.isInteger(layer.edgeRepeatPixels) || layer.edgeRepeatPixels < 16 ||
           layer.edgeRepeatPixels > Math.min(512, layer.width / 4) || layer.edgeRepeatReviewed !== true))
        errors.push('Ground edge extension requires a reviewed narrow outer strip; landmarks must not repeat.');
      if (layer.phase === 'foreground') hasForeground = true;
      if (layer.phase === 'background' && !layer.transparent) opaqueBackground = true;
      if (layer.motion) {
        const motion = layer.motion;
        if (!layer.ambient) errors.push('Ambient motion cannot deform static architecture or the floor.');
        for (const key of ['xAmplitude', 'yAmplitude', 'speed', 'phase', 'opacityAmplitude'])
          if (motion[key] !== undefined && !finite(motion[key])) errors.push('Invalid ambient animation value.');
        if (Math.abs(motion.xAmplitude || 0) > 24 || Math.abs(motion.yAmplitude || 0) > 24 ||
            Math.abs(motion.opacityAmplitude || 0) > .35) errors.push('Ambient animation exceeds its safety bounds.');
      }
      if (!Array.isArray(layer.referenceURLs) || !layer.referenceURLs.length ||
          layer.referenceURLs.some(url => !references.some(ref => ref.url === url)))
        errors.push('Each layer must identify its reviewed references.');
      ids.add(layer.id); paths.add(layer.file); hashes.add(layer.sha256); depths.add(layer.parallax);
    }
    if (!hasGround || !hasForeground || !opaqueBackground || depths.size < 3)
      errors.push('Stage needs an opaque background, camera-aligned ground, transparent foreground and three depths.');
    if (stage.weather && !WEATHER.has(stage.weather.type)) errors.push('Unsupported weather animation.');
    return errors;
  }

  function layerTransform(layer, options = {}) {
    const depth = layer.parallax;
    const zoom = finite(options.zoom) ? clamp(options.zoom, .5, 1.5) : 1;
    const camera = finite(options.camera) ? clamp(options.camera, -220, 220) : 0;
    // Registered image planes share a lens: differing vertical zoom tears connected horizons.
    // Depth changes horizontal parallax only; the ground still follows the fighter camera exactly.
    const scale = zoom;
    return { scale, x: WIDTH / 2 - (WIDTH / 2 + camera * depth) * scale, y: GROUND * (1 - scale) };
  }

  function optionsFor(value, reducedMotion) {
    const options = value || {};
    return {
      time: finite(options.time) && options.motion !== false && !reducedMotion ? options.time : 0,
      camera: finite(options.camera) ? clamp(options.camera, -220, 220) : 0,
      zoom: finite(options.zoom) ? clamp(options.zoom, .5, 1.5) : 1,
      preview: options.preview === true,
      animate: options.motion !== false && !reducedMotion
    };
  }

  function createRenderer(catalog, dependencies = {}) {
    const ImageClass = dependencies.Image || root.Image;
    const baseURL = dependencies.baseURL !== undefined ? dependencies.baseURL : defaultBaseURL;
    const reduced = dependencies.reducedMotion || (() => Boolean(root.matchMedia?.('(prefers-reduced-motion: reduce)').matches));
    const cacheLimit = Number.isInteger(dependencies.maxReadyStages) && dependencies.maxReadyStages > 0 ?
      clamp(dependencies.maxReadyStages, 1, 30) : 6;
    const records = new Map(), frame = new WeakMap();
    let useClock = 0;
    for (const stage of catalog.stages || []) {
      if (!stage || records.has(stage.id)) continue;
      const errors = validateStage(stage);
      records.set(stage.id, { stage, errors, state: errors.length ? 'invalid' : stage.approved ? 'unloaded' : 'pending', images: [], pins: 0, lastUse: 0 });
    }
    function recordFor(stage) { return records.get(typeof stage === 'string' ? stage : stage?.id); }
    function touch(record) { if (record) record.lastUse = ++useClock; }
    function releaseImages(record) {
      for (const {image} of record.images) {
        image.onload = image.onerror = null;
        try { image.src = ''; } catch (_) { /* Host image implementations may not allow cancellation. */ }
      }
      record.images = [];
    }
    function trimCache(protectedRecord) {
      const readyRecords = [...records.values()].filter(record => record.state === 'ready');
      const victims = readyRecords.filter(record => record !== protectedRecord && !record.pins)
        .sort((a, b) => a.lastUse - b.lastUse);
      let excess = readyRecords.length - cacheLimit;
      while (excess > 0 && victims.length) {
        const record = victims.shift(); releaseImages(record); record.promise = null; record.state = 'unloaded'; excess--;
      }
    }
    function releaseFrame(ctx, protectedRecord) {
      const marker = frame.get(ctx);
      if (marker) marker.record.pins = Math.max(0, marker.record.pins - 1);
      frame.delete(ctx); trimCache(protectedRecord);
    }
    function load(record) {
      if (record) touch(record);
      if (!record || record.state !== 'unloaded') {
        if (record?.state === 'ready') trimCache(record);
        return record?.promise || Promise.resolve(false);
      }
      if (!ImageClass) { record.state = 'error'; record.errors.push('Image loader unavailable.'); return Promise.resolve(false); }
      record.state = 'loading';
      record.promise = Promise.all(record.stage.layers.map(layer => new Promise(resolve => {
        const image = new ImageClass();
        record.images.push({ layer, image });
        image.onload = () => {
          if ((image.naturalWidth || image.width) !== layer.width || (image.naturalHeight || image.height) !== layer.height) {
            record.errors.push('Unexpected dimensions: ' + layer.file); resolve(false);
          } else resolve(true);
        };
        image.onerror = () => { record.errors.push('Missing or unreadable image: ' + layer.file); resolve(false); };
        image.src = baseURL + layer.file;
      }))).then(results => {
        record.state = results.every(Boolean) ? 'ready' : 'error';
        if (record.state === 'ready') { touch(record); trimCache(record); }
        else releaseImages(record);
        return record.state === 'ready';
      });
      return record.promise;
    }
    function ready(record) {
      if (!record || record.state === 'invalid' || record.state === 'pending' || record.state === 'error') return false;
      if (record.state === 'unloaded') load(record);
      return record.state === 'ready';
    }
    function paint(ctx, record, phase, options) {
      for (const { layer, image } of record.images) {
        if (layer.phase !== phase) continue;
        const transform = layerTransform(layer, options), motion = layer.motion || {};
        const angle = options.time * (motion.speed || .3) + (motion.phase || 0);
        const dx = options.animate ? Math.sin(angle) * (motion.xAmplitude || 0) : 0;
        const dy = options.animate ? Math.cos(angle) * (motion.yAmplitude || 0) : 0;
        ctx.save();
        ctx.translate(transform.x, transform.y); ctx.scale(transform.scale, transform.scale);
        ctx.globalAlpha = clamp((layer.opacity === undefined ? 1 : layer.opacity) +
          (options.animate ? Math.sin(angle) * (motion.opacityAmplitude || 0) : 0), 0, 1);
        if (layer.edgeRepeatPixels) {
          // Extend only the reviewed texture outside the image; central landmarks remain byte-exact.
          // These tiles use the same world transform as the ground and therefore the fighters.
          const strip = layer.edgeRepeatPixels, tileWidth = strip * layer.rect.width / layer.width;
          const visibleLeft = -transform.x / transform.scale, visibleRight = (WIDTH - transform.x) / transform.scale;
          for (let x = layer.rect.x - tileWidth, n = 0; x + tileWidth > visibleLeft && n < 12; x -= tileWidth, n++)
            ctx.drawImage(image, 0, 0, strip, layer.height, x, layer.rect.y, tileWidth, layer.rect.height);
          for (let x = layer.rect.x + layer.rect.width, n = 0; x < visibleRight && n < 12; x += tileWidth, n++)
            ctx.drawImage(image, layer.width - strip, 0, strip, layer.height, x, layer.rect.y, tileWidth, layer.rect.height);
        }
        ctx.drawImage(image, layer.rect.x + dx, layer.rect.y + dy, layer.rect.width, layer.rect.height);
        ctx.restore();
      }
    }
    function weather(ctx, stage, options) {
      const config = stage.weather;
      if (!config || config.type === 'none' || options.preview || config.enabled === false) return;
      const count = clamp(config.count || 30, 0, 64), time = options.time;
      const speedX = config.type === 'rain' ? -140 : config.type === 'snow' ? 24 : 48;
      const speedY = config.type === 'rain' ? 580 : config.type === 'embers' ? -34 : 46;
      ctx.save(); ctx.globalAlpha = .4; ctx.fillStyle = config.color || '#e9eff0'; ctx.strokeStyle = config.color || '#e9eff0';
      for (let i = 0; i < count; i++) {
        // Camera affects each particle's screen location once, independently of the fighters' zoom.
        const x = ((i * 97 + time * speedX - options.camera * .9) % 1380 + 1380) % 1380 - 50;
        const y = ((i * 61 + time * speedY) % 780 + 780) % 780 - 30;
        if (config.type === 'rain') {
          ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 4, y + 17); ctx.stroke();
        } else if (config.type === 'snow') {
          ctx.beginPath(); ctx.arc(x, y, 1.1 + i % 3, 0, Math.PI * 2); ctx.fill();
        } else if (config.type === 'petals') {
          ctx.beginPath(); ctx.ellipse(x, y, 3.5, 1.5, i + time * .35, 0, Math.PI * 2); ctx.fill();
        } else ctx.fillRect(x, y, 1 + i % 3, 1 + i % 2);
      }
      ctx.restore();
    }
    function drawBackground(ctx, stage, value) {
      const record = recordFor(stage);
      if (!ready(record)) { releaseFrame(ctx, record); return false; }
      touch(record); releaseFrame(ctx, record);
      const options = optionsFor(value, reduced());
      ctx.save(); ctx.fillStyle = record.stage.fillColor || '#101820'; ctx.fillRect(0, 0, WIDTH, HEIGHT); ctx.restore();
      paint(ctx, record, 'background', options);
      record.pins++;
      frame.set(ctx, { record, options });
      return true;
    }
    function drawForeground(ctx, stage, value) {
      const marker = frame.get(ctx), record = recordFor(stage);
      if (!marker || marker.record !== record || record?.state !== 'ready') return false;
      const options = optionsFor(value, reduced());
      if (options.time !== marker.options.time || options.camera !== marker.options.camera || options.zoom !== marker.options.zoom)
        return false;
      paint(ctx, record, 'foreground', options); weather(ctx, record.stage, options);
      releaseFrame(ctx, record); // Never paint the same foreground twice or leak it into a different scene.
      return true;
    }
    function status(stage) {
      const record = recordFor(stage);
      return record ? { id: record.stage.id, state: record.state, errors: record.errors.slice(),
        approved: Boolean(record.stage.approved), layers: record.stage.layers?.length || 0,
        weatherType: record.stage.approved ? record.stage.weather?.type || 'none' : null } :
        { state: 'unknown', approved: false, layers: 0, weatherType: null, errors: [] };
    }
    return { drawBackground, drawForeground, preload: stage => load(recordFor(stage)), status,
      cacheInfo: () => {
        const readyRecords = [...records.values()].filter(record => record.state === 'ready');
        return {limit:cacheLimit, readyStages:readyRecords.map(record => record.stage.id),
          pinnedStages:readyRecords.filter(record => record.pins).map(record => record.stage.id),
          images:readyRecords.reduce((sum, record) => sum + record.images.length, 0),
          decodedBytes:readyRecords.reduce((sum, record) => sum + record.images.reduce((size, item) =>
            size + item.layer.width * item.layer.height * 4, 0), 0),
          decodedBytesMethod:'Retained PNG width × height × 4 estimate; browser allocations may differ.'};
      },
      summary: () => [...records.values()].map(record => status(record.stage.id)),
      coordinates: Object.freeze({ width: WIDTH, height: HEIGHT, ground: GROUND, cameraMin: -220, cameraMax: 220 }) };
  }
  return { createRenderer, validateStage, layerTransform, WIDTH, HEIGHT, GROUND };
});
