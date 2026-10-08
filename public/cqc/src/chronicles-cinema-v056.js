/* Scene paintings and compositions. Atlas geometry is defined by the art catalogue. */
(() => {
  'use strict';
  const A = window.CQC55_ART;
  const CACHE_LIMIT = 8, images = new Map(), failed = new Set(), requests = new WeakMap(), stageRequests = new WeakMap(), spriteRequests = new WeakMap();
  const legacy = Object.fromEntries(['snow', 'jungle', 'sea', 'war', 'desert', 'virtual'].map(set =>
    [set, {file: 'assets/cinema-v056/' + set + '.png', cols: 3, rows: 2, inset: 4}]));
  const catalogue = {...legacy, ...(window.CQC56_PLATE_CATALOG || {})};
  const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
  function visualInfo(visual = {}) {
    if (typeof visual === 'string') visual = {set: visual};
    const set = Object.hasOwn(catalogue, visual.set) ? visual.set : 'virtual';
    const definition = catalogue[set];
    const cols = Number.isInteger(definition.cols) && definition.cols > 0 ? definition.cols : 1;
    const rows = Number.isInteger(definition.rows) && definition.rows > 0 ? definition.rows : 1;
    const tile = clamp(Number.isInteger(visual.tile) ? visual.tile : 0, 0, cols * rows - 1);
    return {set, definition, cols, rows, tile, fullScene: visual.fullScene === true || definition.fullScene === true};
  }
  function forget(entry) {
    entry.cancelled = true;
    entry.redraws.clear();
    entry.img.onload = entry.img.onerror = null;
    // Deleting the Map entry alone would leave evicted decodes and requests running.
    try { entry.img.src = ''; } catch {}
  }
  function finish(entry, ok) {
    if (entry.cancelled || entry.status !== 'loading') return;
    entry.status = ok && entry.img.naturalWidth && entry.img.naturalHeight ? 'loaded' : 'failed';
    if (entry.status === 'loaded') failed.delete(entry.set); else failed.add(entry.set);
    const redraws = [...entry.redraws.values()];
    entry.redraws.clear();
    for (const redraw of redraws) redraw();
  }
  function entryFor(info) {
    let entry = images.get(info.set);
    if (entry) {
      images.delete(info.set); images.set(info.set, entry);
      return entry;
    }
    const img = new Image();
    entry = {set: info.set, img, status: 'loading', cancelled: false, redraws: new Map()};
    images.set(info.set, entry);
    while (images.size > CACHE_LIMIT) {
      const oldest = images.keys().next().value;
      forget(images.get(oldest)); images.delete(oldest);
    }
    img.decoding = 'async';
    let decoding = false;
    const loaded = () => {
      if (decoding || entry.cancelled || entry.status !== 'loading') return;
      decoding = true;
      if (typeof img.decode !== 'function') { finish(entry, true); return; }
      try { Promise.resolve(img.decode()).then(() => finish(entry, true), () => finish(entry, false)); }
      catch (_) { finish(entry, false); }
    };
    img.onload = loaded;
    img.onerror = () => finish(entry, false);
    const file = info.definition.file || legacy[info.set]?.file || legacy.virtual.file;
    const source = /^(?:\.\.\/|\/|data:|blob:|https?:)/.test(file) ? file : '../' + file.replace(/^\.\//, '');
    const set = info.set;
    img.src = window.CQC56_IMAGE_DATA?.[set] || source;
    // Already-decoded images and native Canvas hosts may complete synchronously.
    if (img.complete && img.naturalWidth && img.naturalHeight && entry.status === 'loading') loaded();
    return entry;
  }
  function preload(set) { return entryFor(visualInfo(set)).img; }
  function redrawWhenReady(canvas, entry, redraw) {
    const previous = requests.get(canvas);
    if (previous) previous.entry.redraws.delete(canvas);
    const request = {entry}; requests.set(canvas, request);
    if (entry.status !== 'loading') return;
    entry.redraws.set(canvas, () => {
      if (requests.get(canvas) === request && canvas.isConnected !== false) redraw();
    });
  }
  function drawPlate(canvas, visual, options = {}) {
    if (!options.onLoad) spriteRequests.delete(canvas);
    window.CQC56_PORTRAITS?.cancel(canvas);
    const info = visualInfo(visual), entry = entryFor(info), img = entry.img;
    const c = canvas.getContext('2d'), width = options.width || canvas.width || 1280, height = options.height || canvas.height || 720;
    const ready = entry.status === 'loaded' && !!(img.complete && img.naturalWidth && img.naturalHeight);
    c.clearRect(0, 0, width, height);
    canvas.dataset.plate = info.set + ':' + info.tile;
    canvas.dataset.artReady = String(ready);
    canvas.dataset.fullScene = String(info.fullScene);
    canvas.setAttribute?.('aria-busy', entry.status === 'loading' ? 'true' : 'false');
    canvas.dataset.composition = 'clean-art';
    canvas.dataset.portraitReady = 'not-required';
    redrawWhenReady(canvas, entry, options.onLoad || (() => drawPlate(canvas, visual, options)));
    if (!ready) {
      c.fillStyle = '#07110d'; c.fillRect(0, 0, width, height);
      canvas.dataset.artState = entry.status === 'failed' ? 'failed' : 'loading';
      return false;
    }
    canvas.dataset.artState = 'ready';
    const sw = img.naturalWidth / info.cols, sh = img.naturalHeight / info.rows;
    const time = options.motion ? performance.now() / 1000 : 0;
    const setting = Number.isFinite(visual?.inset) ? visual.inset : info.definition.inset;
    const baseInset = Number.isFinite(setting) ? setting : info.cols * info.rows > 1 ? 2 : 0;
    const inset = clamp(baseInset + (options.motion ? 3 + Math.sin(time * .12) * 3 : 0), 0, Math.min(sw, sh) * .2);
    let sx = info.tile % info.cols * sw + inset, sy = Math.floor(info.tile / info.cols) * sh + inset;
    let cw = sw - inset * 2, ch = sh - inset * 2, dx = 0, dy = 0, dw = width, dh = height;
    if (options.fit === 'contain') {
      const scale = Math.min(width / cw, height / ch);
      dw = cw * scale; dh = ch * scale; dx = (width - dw) / 2; dy = (height - dh) / 2;
      c.fillStyle = options.background || '#061119'; c.fillRect(0, 0, width, height);
    } else {
      // Crop inside this cell; never stretch a 3:2 original into a 16:9 canvas.
      const focusX = clamp(visual?.focusX ?? info.definition.focusX ?? .5, 0, 1);
      const focusY = clamp(visual?.focusY ?? info.definition.focusY ?? .5, 0, 1);
      if (cw / ch > width / height) { const crop = ch * width / height; sx += (cw - crop) * focusX; cw = crop; }
      else { const crop = cw * height / width; sy += (ch - crop) * focusY; ch = crop; }
    }
    c.drawImage(img, sx, sy, cw, ch, dx, dy, dw, dh);
    return true;
  }
  const ink = '#111a1f';
  function path(c, points, fill, stroke = ink, width = 3) {
    c.beginPath();
    points.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y));
    c.closePath(); c.fillStyle = fill; c.fill();
    if (stroke) { c.strokeStyle = stroke; c.lineWidth = width; c.stroke(); }
  }
  function box(c, x, y, w, h, fill, border = ink) {
    c.fillStyle = fill; c.fillRect(x, y, w, h);
    c.strokeStyle = border; c.lineWidth = 3; c.strokeRect(x, y, w, h);
  }
  function object(c, kind, x, y, scale, ending, color) {
    c.save(); c.translate(x, y); c.scale(scale, scale); c.rotate(ending ? -.09 : .08);
    c.shadowColor = '#0008'; c.shadowBlur = 12; c.shadowOffsetY = 9;
    if (['tape', 'radio', 'terminal', 'card', 'photo', 'map', 'letter', 'book'].includes(kind)) {
      const paper = ['card', 'photo', 'map', 'letter', 'book'].includes(kind);
      box(c, -66, -42, 132, 84, paper ? '#d6d0b5' : '#46575b', '#18282e');
      c.shadowBlur = 0; c.shadowOffsetY = 0;
      if (kind === 'tape') {
        box(c, -54, -30, 108, 39, '#182b30', '#79949a');
        for (const px of [-29, 29]) {
          c.strokeStyle = '#c5c8b9'; c.lineWidth = 6;
          c.beginPath(); c.arc(px, -10, 12, 0, Math.PI * 2); c.stroke();
        }
        path(c, [[-43, 35], [-33, 18], [33, 18], [43, 35]], '#8d9891');
        box(c, -45, -38, 90, 6, ending ? '#dfbe75' : '#b9bbaa', null);
      } else if (kind === 'radio' || kind === 'terminal') {
        box(c, -55, -33, 79, 43, ending ? '#264135' : '#78a293', '#081418');
        c.strokeStyle = '#aaccc0'; c.lineWidth = 2; c.beginPath();
        for (let i = 0; i < 70; i++) c.lineTo(-50 + i, -9 + (ending ? 0 : Math.sin(i * .4) * 8));
        c.stroke();
        for (let i = 0; i < 4; i++) box(c, -51 + i * 30, 20, 18, 10, '#afbcad');
        if (kind === 'radio') { c.lineWidth = 5; c.beginPath(); c.moveTo(50, -35); c.lineTo(65, -109); c.stroke(); }
      } else if (kind === 'photo') {
        box(c, -54, -31, 108, 53, '#697e81');
        path(c, [[-50, 18], [-9, -19], [20, 18]], '#405b60', null);
        c.fillStyle = '#d9c497'; c.beginPath(); c.arc(34, -13, 9, 0, 7); c.fill();
      } else if (kind === 'map') {
        c.strokeStyle = '#657b68'; c.lineWidth = 2;
        for (let i = 0; i < 4; i++) { c.beginPath(); c.moveTo(-56, -28 + i * 16); c.bezierCurveTo(-20, -50, 8, 55, 58, -21 + i * 15); c.stroke(); }
        c.strokeStyle = ending ? '#284e45' : '#983d36'; c.lineWidth = 4; c.beginPath(); c.moveTo(-38, 13); c.lineTo(0, -10); c.lineTo(33, 24); c.stroke();
      } else {
        c.strokeStyle = '#857d68'; c.lineWidth = 2;
        for (let i = 0; i < 5; i++) { c.beginPath(); c.moveTo(-45, -24 + i * 12); c.lineTo(36 - i % 2 * 30, -24 + i * 12); c.stroke(); }
        if (!ending) { c.fillStyle = '#77483b'; c.beginPath(); c.arc(43, 24, 13, 0, 7); c.fill(); }
      }
    } else if (['blade', 'rifle', 'key'].includes(kind)) {
      if (kind === 'blade') { path(c, [[-100, 23], [-42, -1], [104, -53], [37, -2], [-34, 13]], '#c5d8d4'); box(c, -101, 17, 58, 15, '#2e4043'); }
      if (kind === 'rifle') { box(c, -69, -12, 127, 24, '#32444c'); box(c, 59, -7, 52, 9, '#869794'); path(c, [[-73,-10],[-115,5],[-111,25],[-58,12]], '#586568'); box(c, -5, 13, 20, 30, '#22363b'); }
      if (kind === 'key') { c.strokeStyle = '#c8b377'; c.lineWidth = 10; c.beginPath(); c.arc(-30, 0, 22, 0, 7); c.moveTo(-9, 0); c.lineTo(75, 0); c.lineTo(75, 20); c.moveTo(54, 0); c.lineTo(54, 15); c.stroke(); }
    } else if (kind === 'flower') {
      c.strokeStyle = '#87955a'; c.lineWidth = 5; c.beginPath(); c.moveTo(0, 69); c.lineTo(0, -17); c.stroke();
      for (let i = 0; i < 7; i++) { const r = i * Math.PI * 2 / 7; c.fillStyle = ending ? '#eee9c9' : '#ddd8c3'; c.beginPath(); c.ellipse(Math.cos(r)*18, -20+Math.sin(r)*18, 22, 11, r, 0, 7); c.fill(); }
      c.fillStyle = '#b9a969'; c.beginPath(); c.arc(0, -20, 7, 0, 7); c.fill();
    } else if (kind === 'helmet' || kind === 'mask') {
      c.fillStyle = color || '#73877c'; c.strokeStyle = '#152b32'; c.lineWidth = 4;
      c.beginPath(); c.ellipse(0, -5, 54, 48, 0, Math.PI, Math.PI * 2); c.lineTo(59, 17); c.lineTo(-58, 17); c.closePath(); c.fill(); c.stroke();
      if (kind === 'mask') { box(c, -43, 4, 33, 17, '#12292c'); box(c, 10, 4, 33, 17, '#12292c'); box(c, -17, 30, 34, 30, '#788d87'); }
    } else if (kind === 'chain' || kind === 'dogtag' || kind === 'medal') {
      c.strokeStyle = '#b0bbb0'; c.lineWidth = 3;
      for (let i = 0; i < 12; i++) { c.beginPath(); c.ellipse(-61+i*10, -36+Math.sin(i*.28)*17, 9, 5, .4, 0, 7); c.stroke(); }
      if (kind === 'dogtag') { box(c,-28,-8,51,65,'#9da9a2'); c.strokeStyle='#6a7976'; for(let j=0;j<3;j++){c.beginPath();c.moveTo(-19,9+j*12);c.lineTo(15,9+j*12);c.stroke();} }
      if (kind === 'medal') { path(c,[[-21,-34],[21,-34],[12,5],[-12,5]],'#777348'); c.fillStyle='#b6a36b'; c.beginPath();c.arc(0,28,25,0,7);c.fill(); }
    } else if (kind === 'glove') {
      path(c, [[-32,35],[-39,-15],[-21,-23],[-17,-50],[-5,-52],[0,-25],[8,-57],[20,-54],[19,-20],[34,-41],[44,-33],[27,5],[28,34]], '#63746d');
    } else {
      // Mechanical part or reconnaissance drone, matching the authored prop category.
      box(c, -43, -28, 86, 57, '#667b80'); box(c,-20,-15,40,29,'#162e35');
      c.strokeStyle = '#a1b6b5'; c.lineWidth = 6;
      for (const k of [-1,1]) { c.beginPath(); c.moveTo(k*40,0); c.lineTo(k*81,-26); c.stroke(); c.beginPath();c.arc(k*83,-28,20,0,7);c.stroke(); }
    }
    c.restore();
  }
  function draw(canvas, story, phase, index, page, options = {}) {
    window.CQC56_PORTRAITS?.cancel(canvas);
    const c = canvas.getContext('2d');
    const scene = ['intro', 'outro'].includes(phase);
    const card = scene ? story[phase][page] : story.route[index];
    if (!card) return;
    const ending = phase === 'outro' || phase === 'finished';
    const set = card.visual?.set || story.visualSet || 'virtual';
    const tile = Number.isInteger(card.visual?.tile) ? card.visual.tile : ending ? 3 + page : scene ? page : index % 3;
    const visual = {...(card.visual || {}), set, tile}, info = visualInfo(visual);
    const time = options.motion ? performance.now() / 1000 : 0;
    const ready = drawPlate(canvas, visual, {...options, width: 1280, height: 720,
      onLoad: () => draw(canvas, story, phase, index, page, options)});
    const stage = options.stages?.[card.stage], layerOptions = {motion:options.motion, layers:!info.fullScene};
    const layered = !options.cleanArt && !info.fullScene && !!A.drawStageLayers?.(c, stage, time, 0, true, layerOptions);
    canvas.dataset.stageLayers = String(layered);
    if (!ready && !layered && !info.fullScene) {
      A.drawStage(c, stage, time, 0, true, layerOptions);
    }
    const camera = card.camera || 'wide';
    const hero=canvas.id==='heroArt';
    const f = options.fighters?.[story.uid];
    const pendingPortraits = [], pendingSprites = [];
    const waitForSprite = uid => {
      const state = window.CQC_COMBAT_SPRITES?.status(uid);
      if (state?.renderer === 'png' && !state.ready && state.states?.some(value => value === 'loading' || value === 'not-requested'))
        pendingSprites.push(uid);
    };
    canvas.dataset.portraitReady = options.cleanArt || info.fullScene ? 'not-required' : 'false';
    canvas.dataset.composition = options.cleanArt ? 'clean-art' : info.fullScene ? 'full-scene' : 'portrait-composition';
    if (f && !options.cleanArt && !info.fullScene) {
      const pose = {time, guard: !ending && camera === 'profile', walk: ending && camera === 'wide'};
      const actor = ending && !['rifle','blade'].includes(card.prop) ? {...f, visual:{...f.visual, weapon:'fists'}} : f;
      const scale = camera === 'close' ? 1.9 : camera === 'wide' ? 1.13 : 1.4;
      const portraitX=hero?765:camera==='close'?(ending?155:110):(ending?210:160);
      const portraitSize=hero?420:camera==='close'?(ending?360:420):(ending?300:340);
      const sprite = camera !== 'overhead' && !!A.drawSprite?.(c, actor, ending ? 370 : 285, camera === 'close' ? 825 : 628, ending ? 1 : -1, scale, pose);
      if (!sprite && camera !== 'overhead' && actor.visual?.weapon === f.visual?.weapon) waitForSprite(f.uid);
      const atlasActor = !!window.CQC56_PORTRAIT_MAP?.[f.uid];
      const nativeActor = camera !== 'overhead' && actor.visual?.weapon === f.visual?.weapon && !!window.CQC_COMBAT_SPRITES?.has?.(f.uid);
      const illustrated=!sprite && !nativeActor && window.CQC56_PORTRAITS?.draw(c,f.uid,portraitX,hero?175:camera==='close'?215:255,portraitSize,portraitSize,{ending});
      if (!illustrated && !sprite && !nativeActor) pendingPortraits.push(f.uid);
      canvas.dataset.portraitReady=String(!!illustrated || sprite);
      const nativeFailed = nativeActor && window.CQC_COMBAT_SPRITES.status(f.uid).states?.some(state => state === 'failed' || state === 'unavailable');
      canvas.dataset.actorRenderer=sprite?'approved-combat-png':nativeActor?(nativeFailed?'failed-combat-png':'loading-combat-png'):illustrated?'portrait':atlasActor?(window.CQC56_PORTRAITS?.status?.(f.uid).state==='failed'?'failed-portrait':'loading-portrait'):'procedural-canvas';
      if (!illustrated && !sprite && !nativeActor && !atlasActor && camera !== 'overhead') {
        c.save();
        if (camera === 'silhouette') c.filter = 'brightness(0.22) saturate(0.25)';
        A.drawFighter(c, actor, ending ? 370 : 285, camera === 'close' ? 825 : 628, ending ? 1 : -1, scale, pose);
        c.restore();
      }
      if (!scene && options.fighters?.[card.opponent]) {const opponent=options.fighters[card.opponent],opponentPose={time,guard:phase==='pre',hit:phase==='post'};const sprite=A.drawSprite?.(c,opponent,640,628,-1,1.1,opponentPose);if(!sprite)waitForSprite(card.opponent);const nativeOpponent=!!window.CQC_COMBAT_SPRITES?.has?.(card.opponent);const drawn=sprite||(!nativeOpponent&&window.CQC56_PORTRAITS?.draw(c,card.opponent,515,312,260,260,{ending:phase==='post'}));if(!drawn&&!nativeOpponent){pendingPortraits.push(card.opponent);if(!window.CQC56_PORTRAIT_MAP?.[card.opponent])A.drawFighter(c,opponent,640,628,-1,1.1,opponentPose);}}
      if (scene && card.prop && !hero) {
        const overhead = camera === 'overhead';
        object(c, card.prop, overhead ? 559 : 540, overhead ? 492 : 570, overhead ? 1.22 : .74, ending, f.color);
      }
    }
    if (layered) A.drawStageForeground?.(c, stage, time, 0, true, layerOptions);
    if (!options.cleanArt) {
      const shade = c.createLinearGradient(0,0,1280,0);
      shade.addColorStop(0,'#06111916'); shade.addColorStop(.46,'#07131a10'); shade.addColorStop(1,'#04101783');
      c.fillStyle = shade; c.fillRect(0,0,1280,720);
      c.fillStyle = '#03090ee6'; c.fillRect(0,0,1280,22); c.fillRect(0,698,1280,22);
    }
    canvas.dataset.sceneKey = story.uid + ':' + phase + ':' + (scene ? page : index);
    if (!options.cleanArt && !info.fullScene && !layered && stage && window.CQC_STAGE_LAYERS?.status(stage).approved) {
      const key = canvas.dataset.sceneKey + ':' + stage.id;
      if (stageRequests.get(canvas)?.key !== key) {
        const request = {key}; stageRequests.set(canvas, request);
        window.CQC_STAGE_LAYERS.preload(stage).then(loaded => {
          if (stageRequests.get(canvas) !== request) return;
          stageRequests.delete(canvas);
          if (loaded && canvas.isConnected !== false && canvas.dataset.sceneKey + ':' + stage.id === key)
            draw(canvas, story, phase, index, page, options);
        });
      }
    } else stageRequests.delete(canvas);
    if (pendingSprites.length && window.CQC_COMBAT_SPRITES?.whenReady) {
      const uids = [...new Set(pendingSprites)], sceneKey = canvas.dataset.sceneKey;
      const key = [sceneKey, card.stage, camera, set, tile, uids.join(',')].join(':');
      if (spriteRequests.get(canvas)?.key !== key) {
        const request = {key}; spriteRequests.set(canvas, request);
        Promise.all(uids.map(uid => window.CQC_COMBAT_SPRITES.whenReady(uid))).then(loaded => {
          if (spriteRequests.get(canvas) !== request) return;
          spriteRequests.delete(canvas);
          // A terminal failure must redraw its waiting state once as well. Failed files
          // are excluded by waitForSprite, so this never starts an automatic retry loop.
          if (canvas.isConnected !== false && canvas.dataset.sceneKey === sceneKey)
            draw(canvas, story, phase, index, page, options);
        });
      }
    } else spriteRequests.delete(canvas);
    if (pendingPortraits.length) window.CQC56_PORTRAITS?.whenReady(canvas, pendingPortraits,
      () => draw(canvas, story, phase, index, page, options));
  }
  function diagnostics() {
    const entries = [...images.values()].map(({set, img, status}) => ({set, status,
      width: img.naturalWidth || 0, height: img.naturalHeight || 0,
      decodedBytes: status === 'loaded' ? (img.naturalWidth || 0) * (img.naturalHeight || 0) * 4 : 0}));
    return {loaded: entries.filter(e => e.status === 'loaded').map(e => e.set), failed: [...failed],
      pending: entries.filter(e => e.status === 'loading').map(e => e.set),
      decoded: entries.filter(e => e.status === 'loaded').length,
      decodedBytes: entries.reduce((sum, e) => sum + e.decodedBytes, 0),
      decodedBytesMethod: 'RGBA width × height × 4 for images retained in this cache; browser allocations may differ.',
      cacheSize: images.size, cacheLimit: CACHE_LIMIT, catalogued: Object.keys(catalogue).length, entries};
  }
  window.CQC56_CINEMA = {draw, drawPlate, preload, diagnostics};
})();
