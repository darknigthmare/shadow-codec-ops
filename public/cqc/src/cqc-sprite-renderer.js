/* Verified combat PNGs, decoded readiness and uniformly fitted native previews. */
(function (root, factory) {
  'use strict';
  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.CQC_COMBAT_SPRITES = api;
  if (root.CQC_COMBAT_SPRITE_CATALOG) api.configure(root.CQC_COMBAT_SPRITE_CATALOG);
})(globalThis, function (root) {
  'use strict';
  const entries = new Map(), images = new Map(), clocks = new Map(), entryFiles = new Map();
  // Capture while this script executes: later album/iframe configuration has no currentScript.
  const ownScriptURL = root.document?.currentScript?.src || null;
  const checks = ['identity', 'costume', 'equipment', 'anatomicalSides', 'singleFigure', 'transparentBackground'];
  const actions = ['idle', 'guard', 'walk', 'crouch', 'attack', 'hit', 'ko', 'punch', 'low', 'throw', 'deploy', 'shoot', 'reload', 'optic', 'recover', 'blade', 'roll', 'heavy', 'charge', 'parry', 'jump'];
  let baseURL = null;
  const finite = (v) => Number.isFinite(v);
  const safeFile = (f) => typeof f === 'string' && /^[a-zA-Z0-9_./-]+\.png$/.test(f) && !f.split('/').some(p => p === '..' || p === '.') && !f.startsWith('/');
  function validateEntry(uid, entry) {
    // These two authored groups belong only to the original MG1 android incarnation.
    const allowedActions = uid === 'core__bloody_brad' ? actions.concat(['brace', 'stomp']) : actions;
    if (!entry || entry.uid !== uid || typeof entry.name !== 'string' || typeof entry.game !== 'string' || typeof entry.incarnation !== 'string' || !entry.incarnation.trim()) return false;
    const review = entry.review;
    if (!review || review.status !== 'approved' || !review.reviewer || !review.reviewedAt || !Array.isArray(review.limits)) return false;
    if (!checks.every(k => review.checks && review.checks[k] === true)) return false;
    if (!['official-game-reference', 'original-game-capture', 'original-game-model', 'official-art-reference', 'original-character'].includes(review.sourceKind)) return false;
    if (review.sourceKind !== 'original-character' && (!Array.isArray(review.sources) || !review.sources.length || !review.sources.every(s => /^https:\/\//.test(s.url || '')))) return false;
    if (review.sourceKind === 'original-character' && !uid.startsWith('oc__')) return false;
    if (!['static-pose', 'action-frames'].includes(entry.coverage) || !finite(entry.displayHeight) || entry.displayHeight <= 0 || ![1, -1].includes(entry.facing)) return false;
    if (entry.baseFrameHeight !== undefined && (!finite(entry.baseFrameHeight) || entry.baseFrameHeight <= 0)) return false;
    if (entry.sourceFrameHeights && (typeof entry.sourceFrameHeights !== 'object' || Object.entries(entry.sourceFrameHeights).some(([file, height]) => !safeFile(file) || !finite(height) || height <= 0))) return false;
    if (!entry.actions || !entry.actions.idle || Object.keys(entry.actions).some(k => !allowedActions.includes(k))) return false;
    if (entry.actionMap && (typeof entry.actionMap !== 'object' || Object.values(entry.actionMap).some(k => !allowedActions.includes(k)))) return false;
    if (entry.phaseMap && (typeof entry.phaseMap !== 'object' || Object.entries(entry.phaseMap).some(([name, phases]) => !allowedActions.includes(name) || !phases || Object.entries(phases).some(([phase, indices]) => !['startup', 'active', 'recovery'].includes(phase) || !Array.isArray(indices) || !indices.length || indices.some(i => !Number.isInteger(i) || i < 0 || i >= (entry.actions[name]?.frames.length || 0) || entry.oppositeActions && i >= (entry.oppositeActions[name]?.frames.length || 0)))))) return false;
    if (entry.oppositeActions && (!entry.oppositeActions.idle || Object.keys(entry.oppositeActions).some(k => !allowedActions.includes(k)))) return false;
    for (const action of [...Object.values(entry.actions), ...Object.values(entry.oppositeActions || {})]) {
      if (!Array.isArray(action.frames) || !action.frames.length || !finite(action.fps) || action.fps < 0 || typeof action.loop !== 'boolean') return false;
      if (action.frames.length > 1 && action.fps === 0) return false;
      for (const frame of action.frames) {
        if (!safeFile(frame.file) || !/^[a-f0-9]{64}$/.test(frame.sha256 || '') || !Array.isArray(frame.rect) || frame.rect.length !== 4 || !frame.rect.every(finite) || frame.rect[0] < 0 || frame.rect[1] < 0 || frame.rect[2] <= 0 || frame.rect[3] <= 0) return false;
        if (!Array.isArray(frame.pivot) || frame.pivot.length !== 2 || !frame.pivot.every(v => finite(v) && v >= 0 && v <= 1)) return false;
        if (frame.clipPolygon && (!Array.isArray(frame.clipPolygon) || frame.clipPolygon.length < 3 || !frame.clipPolygon.every(p => Array.isArray(p) && p.length === 2 && p.every(v => finite(v) && v >= 0 && v <= 1)))) return false;
      }
    }
    return true;
  }
  function resolveBase(options) {
    if (options.baseURL) return options.baseURL;
    if (ownScriptURL) return new URL('../', ownScriptURL).href;
    if (root.document && root.document.baseURI) return new URL('../', root.document.baseURI).href;
    return 'http://localhost/';
  }
  function configure(catalog, options = {}) {
    entries.clear(); images.clear(); clocks.clear(); entryFiles.clear(); baseURL = resolveBase(options);
    if (!catalog || catalog.schema !== 'cqc.combat-sprites/1' || !catalog.entries || typeof catalog.entries !== 'object') return { accepted: 0, rejected: [] };
    const rejected = [];
    for (const [uid, entry] of Object.entries(catalog.entries)) {
      if (validateEntry(uid, entry)) {
        entries.set(uid, entry);
        const files = new Map();
        for (const action of [...Object.values(entry.actions), ...Object.values(entry.oppositeActions || {})])
          for (const frame of action.frames) files.set(frame.file, frame);
        entryFiles.set(uid, [...files.values()]);
      } else rejected.push(uid);
    }
    return { accepted: entries.size, rejected };
  }
  function getImage(frame) {
    const key = frame.file;
    if (images.has(key)) return images.get(key);
    const record = { image: null, state: 'loading', promise: null };
    let settle;
    record.promise = new Promise(resolve => { settle = resolve; });
    images.set(key, record);
    if (typeof root.Image !== 'function') { record.state = 'unavailable'; settle(false); return record; }
    const image = new root.Image(); record.image = image;
    let settled = false;
    const finish = (ready) => {
      if (settled) return;
      settled = true; record.state = ready ? 'ready' : 'failed'; settle(ready);
    };
    image.decoding = 'async';
    image.onload = () => {
      if (!(image.naturalWidth > 0 && image.naturalHeight > 0)) { finish(false); return; }
      // A loaded response is not enough: publish readiness only after pixel decoding.
      if (typeof image.decode !== 'function') { finish(true); return; }
      try { Promise.resolve(image.decode()).then(() => finish(true), () => finish(false)); }
      catch (_) { finish(false); }
    };
    image.onerror = () => finish(false);
    image.src = new URL(frame.file, baseURL).href;
    return record;
  }
  function actionName(pose = {}, entry = null) {
    if (pose.ko) return 'ko';
    if (pose.hit) return 'hit';
    if (pose.moveSlot && (pose.animationActive || pose.attack) && entry?.actionMap?.[pose.moveSlot]) return entry.actionMap[pose.moveSlot];
    if (pose.jump && entry?.actions?.jump) return 'jump';
    return pose.attack ? 'attack' : pose.crouch ? 'crouch' : pose.walk ? 'walk' : pose.guard ? 'guard' : 'idle';
  }
  function selectFrame(entry, pose = {}) {
    const requested = actionName(pose, entry), action = entry.actions[requested] || entry.actions.idle;
    const mapped = entry.phaseMap?.[requested]?.[pose.attackPhase];
    if (mapped) {
      const progress = Math.max(0, Math.min(1, finite(pose.phaseProgress) ? pose.phaseProgress : 0));
      const index = mapped[Math.min(mapped.length - 1, Math.floor(progress * mapped.length))];
      return { frame: action.frames[index], requested, action: requested, index, phase: pose.attackPhase };
    }
    const time = Math.max(0, finite(pose.actionTime) ? pose.actionTime : pose.animationActive && finite(pose.attackTime) ? pose.attackTime : pose.hit && finite(pose.hitTime) ? pose.hitTime : finite(pose.time) ? pose.time : 0);
    const raw = Math.floor(time * action.fps);
    const index = action.loop ? raw % action.frames.length : Math.min(raw, action.frames.length - 1);
    return { frame: action.frames[index], requested, action: entry.actions[requested] ? requested : 'idle', index };
  }
  function has(uid) { return entries.has(uid); }
  function framesFor(entry, options = {}) {
    if (!options.action) return entryFiles.get(entry.uid);
    const face = options.face === -1 || options.face === 1 ? options.face : entry.facing;
    const directional = face !== entry.facing && entry.oppositeActions ? entry.oppositeActions : entry.actions;
    return directional[options.action]?.frames || [];
  }
  function recordsFor(entry, options = {}) {
    const frames = framesFor(entry, options), records = new Set();
    if (options.retry === true) {
      for (const frame of frames) {
        const state = images.get(frame.file)?.state;
        if (state === 'failed' || state === 'unavailable') images.delete(frame.file);
      }
    }
    for (const frame of frames) records.add(getImage(frame));
    return [...records];
  }
  function preload(uid, options = {}) {
    const entry = entries.get(uid); if (!entry) return false;
    return recordsFor(entry, options).length > 0;
  }
  function whenReady(uid, options = {}) {
    const entry = entries.get(uid);
    if (!entry) return Promise.resolve(false);
    const records = recordsFor(entry, options);
    return Promise.all(records.map(record => record.promise)).then(results => results.length > 0 && results.every(Boolean));
  }
  function status(uid, options = {}) {
    const entry = entries.get(uid);
    if (!entry) return { uid, renderer: 'procedural-canvas', coverage: 'pending-art-review', ready: false };
    const states = [...new Set(framesFor(entry, options).map(f => images.get(f.file)?.state || 'not-requested'))];
    return { uid, renderer: 'png', coverage: entry.coverage, actions: Object.keys(entry.actions), oppositeActions: Object.keys(entry.oppositeActions || {}), states, ready: states.length === 1 && states[0] === 'ready', limits: entry.review.limits };
  }
  function drawFitted(c, fighter, box, face = -1, pose = {}) {
    const entry = entries.get(fighter?.uid);
    if (!entry || !box || ![box.x, box.y, box.width, box.height].every(finite) || box.width <= 0 || box.height <= 0 || ![1, -1].includes(face)) return false;
    const opposite = face !== entry.facing && entry.oppositeActions;
    if (face !== entry.facing && !opposite && entry.mirror !== true) return false;
    const directional = opposite ? { ...entry, actions: entry.oppositeActions } : entry;
    const selected = selectFrame(directional, { ...pose, actionTime: finite(pose.actionTime) ? pose.actionTime : 0 });
    const frame = selected.frame;
    const padding = finite(box.padding) ? Math.max(0, box.padding) : 0;
    const innerWidth = box.width - padding * 2, innerHeight = box.height - padding * 2;
    if (innerWidth <= 0 || innerHeight <= 0) return false;
    const factor = entry.displayHeight / (entry.sourceFrameHeights?.[frame.file] || entry.baseFrameHeight || frame.rect[3]);
    const nativeWidth = frame.rect[2] * factor, nativeHeight = frame.rect[3] * factor;
    const fit = Math.min(innerWidth / nativeWidth, innerHeight / nativeHeight);
    const width = nativeWidth * fit, height = nativeHeight * fit;
    const pivotX = face !== entry.facing && !opposite ? 1 - frame.pivot[0] : frame.pivot[0];
    const x = box.x + padding + (innerWidth - width) / 2 + width * pivotX;
    const y = box.y + padding + (innerHeight - height) / 2 + height * frame.pivot[1];
    // Preview scale is separate from combat geometry; include the complete equipment rectangle.
    return draw(c, fighter, x, y, face, fit, { ...pose, actionTime: finite(pose.actionTime) ? pose.actionTime : 0, entityKey: pose.entityKey || `portrait:${entry.uid}:${face}` });
  }
  function draw(c, fighter, x, y, face = 1, scale = 1, pose = {}) {
    const entry = entries.get(fighter && fighter.uid);
    if (!entry || !c || ![x, y, scale].every(finite) || scale <= 0 || ![1, -1].includes(face)) return false;
    const opposite = face !== entry.facing && entry.oppositeActions;
    if (face !== entry.facing && !opposite && entry.mirror !== true) return false;
    const directionalEntry = opposite ? { ...entry, actions: entry.oppositeActions } : entry;
    if (entry.fallbackMissingActions === true && !directionalEntry.actions[actionName(pose, entry)]) return false;
    const requested = actionName(pose, entry), time = Math.max(0, finite(pose.time) ? pose.time : 0);
    const clockKey = pose.entityKey || `${entry.uid}:${face}`;
    let clock = clocks.get(clockKey);
    if (!clock || clock.action !== requested || time < clock.lastTime) {
      clock = { action: requested, start: time, lastTime: time }; clocks.set(clockKey, clock);
    }
    clock.lastTime = time;
    const relative = finite(pose.actionTime) ? pose.actionTime : requested === 'hit' && finite(pose.hitTime) ? pose.hitTime : requested !== 'ko' && pose.animationActive && finite(pose.attackTime) ? pose.attackTime : time - clock.start;
    const selected = selectFrame(directionalEntry, { ...pose, actionTime: relative }), frame = selected.frame, loaded = getImage(frame);
    if (loaded.state !== 'ready') return false;
    const image = loaded.image, [sx, sy, sw, sh] = frame.rect;
    if (sx + sw > image.naturalWidth || sy + sh > image.naturalHeight) return false;
    // Independently authored sheets can use different native pixel scales. Keep every pose
    // in one source at its observed upright scale; crouch/roll/KO never stretch to full height.
    const factor = entry.displayHeight / (entry.sourceFrameHeights?.[frame.file] || entry.baseFrameHeight || sh), w = sw * factor, h = sh * factor;
    c.save();
    try {
      c.translate(x, y); c.scale(scale * (face === entry.facing || opposite ? 1 : -1), scale);
      c.imageSmoothingEnabled = false;
      if (frame.clipPolygon) {
        c.beginPath();
        frame.clipPolygon.forEach((p, i) => {
          const dx = (p[0] - frame.pivot[0]) * w, dy = (p[1] - frame.pivot[1]) * h;
          if (i) c.lineTo(dx, dy); else c.moveTo(dx, dy);
        });
        c.closePath(); c.clip();
      }
      c.drawImage(image, sx, sy, sw, sh, -w * frame.pivot[0], -h * frame.pivot[1], w, h);
    } finally { c.restore(); }
    return true;
  }
  return { configure, draw, drawFitted, has, preload, whenReady, status, validateEntry, actionName, selectFrame };
});
