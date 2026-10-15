/* Codex art: exact native PNGs and reviewed portraits; original files stay intact. */
(function (root) {
  'use strict';
  const data = root.CQC_PASS17_CODEX_DATA;
  if (!data || root.CQC_PASS17_CODEX_ART) return;
  const selected = { ...data.legacy, ...data.native, ...data.corrected };
  const images = new Map();
  const pending = new WeakMap();
  const machineTickets = new WeakMap();
  const machineMapped = uid => root.CQC_PASS18_MACHINES?.hasComposite(uid) === true;
  const pins = new WeakMap();
  const retainedLimit = 12;
  const assetBase = new URL('../', document.currentScript?.src || document.baseURI);
  const sourceUrl = file => new URL(file, assetBase).href;
  let serial = 0;

  function release(canvas) {
    machineTickets.delete(canvas);
    root.CQC_PASS18_MACHINES?.cancelPortrait(canvas);
    const old = pending.get(canvas);
    if (old) {
      for (const entry of old.entries) entry.waiters.delete(canvas);
      pending.delete(canvas);
    }
    const held = pins.get(canvas);
    if (held) {
      for (const entry of held) entry.canvases.delete(canvas);
      pins.delete(canvas);
    }
  }

  function prune() {
    for (const entry of images.values()) {
      for (const canvas of entry.canvases) {
        if (canvas.isConnected === false) {
          entry.canvases.delete(canvas);
          entry.waiters.delete(canvas);
          pending.delete(canvas);
          pins.delete(canvas);
        }
      }
    }
    for (const [file, entry] of images) {
      if (images.size <= retainedLimit) break;
      if (entry.canvases.size || entry.waiters.size || entry.state === 'loading') continue;
      images.delete(file);
    }
  }

  function finish(entry, ok) {
    if (entry.state !== 'loading') return;
    entry.state = ok && entry.image.naturalWidth && entry.image.naturalHeight ? 'ready' : 'failed';
    const work = [...entry.waiters];
    entry.waiters.clear();
    for (const [canvas, request] of work) {
      if (canvas.isConnected !== false && pending.get(canvas) === request) request.redraw();
    }
    prune();
  }

  function load(item) {
    if (!item) return null;
    let entry = images.get(item.file);
    if (entry) {
      images.delete(item.file);
      images.set(item.file, entry);
      return entry;
    }
    const image = new Image();
    entry = { image, file: item.file, state: 'loading', waiters: new Map(), canvases: new Set() };
    images.set(item.file, entry);
    image.decoding = 'async';
    image.onload = () => {
      if (typeof image.decode !== 'function') { Promise.resolve().then(() => finish(entry, true)); return; }
      try { Promise.resolve(image.decode()).then(() => finish(entry, true), () => finish(entry, false)); }
      catch (_) { finish(entry, false); }
    };
    image.onerror = () => finish(entry, false);
    image.src = sourceUrl(item.file);
    if (image.complete && image.naturalWidth) image.onload();
    return entry;
  }

  function resolve(uid) {
    const primary = selected[uid];
    if (!primary) return null;
    let item = primary, entry = load(primary);
    // The selection map remains immutable. Only an actual source error selects its historical art.
    if (entry.state === 'failed' && primary.kind !== 'legacy' && data.legacy[uid]) {
      item = data.legacy[uid];
      entry = load(item);
    }
    return { item, entry, primary };
  }

  function hold(canvas, entry) {
    let held = pins.get(canvas);
    if (!held) { held = new Set(); pins.set(canvas, held); }
    held.add(entry);
    entry.canvases.add(canvas);
  }

  function whenReady(canvas, uids, redraw) {
    release(canvas);
    const machines=uids.filter(machineMapped);if(machines.length){const ticket={id:++serial};machineTickets.set(canvas,ticket);root.CQC_PASS18_MACHINES.whenReadyComposite(machines).then(ok=>{if(ok&&canvas.isConnected!==false&&machineTickets.get(canvas)===ticket)redraw();});}
    const entries = new Set();
    for (const uid of uids.filter(uid=>!machineMapped(uid))) {
      const resolved = resolve(uid);
      if (!resolved) continue;
      const { entry } = resolved;
      hold(canvas, entry);
      if (entry.state === 'loading') entries.add(entry);
    }
    if (!entries.size) return;
    const request = { id: ++serial, entries, redraw };
    pending.set(canvas, request);
    for (const entry of entries) entry.waiters.set(canvas, request);
  }

  function rectFor(item, image) {
    if (item.rect) return item.rect;
    const sw = image.naturalWidth / item.cols;
    const sh = image.naturalHeight / item.rows;
    return [item.col * sw, item.row * sh, sw, sh];
  }

  function draw(context, uid, x, y, width, height, options = {}) {
    if(machineMapped(uid)){const result=root.CQC_PASS18_MACHINES.drawFitted(context,uid,{x,y,width,height,padding:Math.min(width,height)*.045},-1,{action:'idle',time:0});if(result){context.canvas.dataset.codexSource='native-assembled';context.canvas.dataset.codexUid=uid;return true;}}
    const resolved = resolve(uid);
    if (!resolved || resolved.entry.state !== 'ready') return false;
    const { item, entry } = resolved;
    const image = entry.image;
    const [sx, sy, sw, sh] = rectFor(item, image);
    if (!sw || !sh || width <= 0 || height <= 0) return false;
    hold(context.canvas, entry);
    context.save();
    context.beginPath();
    context.rect(x, y, width, height);
    context.clip();
    if (item.kind === 'native') {
      // Keep the entire approved idle pose; do not guess a face from a different incarnation.
      const padding = Math.min(width, height) * 0.045;
      const scale = Math.min((width - padding * 2) / sw, (height - padding * 2) / sh);
      const dw = sw * scale, dh = sh * scale;
      const dx = x + (width - dw) / 2, dy = y + height - padding - dh;
      if (item.clipPolygon?.length) {
        context.beginPath();
        item.clipPolygon.forEach(([px, py], i) => {
          const xx = dx + px * dw, yy = dy + py * dh;
          if (i) context.lineTo(xx, yy); else context.moveTo(xx, yy);
        });
        context.closePath();
        context.clip();
      }
      context.imageSmoothingEnabled = item.pixelArt !== true;
      context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
    } else {
      // Cover-crop strictly inside this portrait's own cell, never a neighbouring person.
      const srcRatio = sw / sh, dstRatio = width / height;
      let cw = sw, ch = sh;
      if (dstRatio > srcRatio) ch = sw / dstRatio; else cw = sh * dstRatio;
      const cx = sx + (sw - cw) / 2;
      const cy = sy + (sh - ch) * (item.kind === 'corrected' ? 0.16 : 0.35);
      context.drawImage(image, cx, cy, cw, ch, x, y, width, height);
    }
    context.restore();
    context.canvas.dataset.codexSource = item.kind;
    context.canvas.dataset.codexUid = uid;
    return true;
  }

  function portrait(canvas, fighter) {
    if(machineMapped(fighter?.uid)){release(canvas);if(root.CQC_PASS18_MACHINES.drawPortrait(canvas,fighter.uid,()=>{if(canvas.isConnected!==false&&canvas.dataset.codexUid===fighter.uid)portrait(canvas,fighter);})){canvas.dataset.codexUid=fighter.uid;canvas.dataset.codexSource='native-assembled';canvas.dataset.artState=root.CQC_PASS18_MACHINES.ready(fighter.uid)?'ready':'loading';canvas.dataset.painted=canvas.dataset.artState==='ready'?'true':'false';canvas.setAttribute('aria-label',fighter.name||fighter.uid);canvas.setAttribute('aria-busy',canvas.dataset.artState==='loading'?'true':'false');return true;}}
    const item = selected[fighter?.uid];
    if (!item) return false;
    release(canvas);
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    const gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 3, 0,
      canvas.width / 2, canvas.height / 3, Math.max(canvas.width, canvas.height));
    gradient.addColorStop(0, '#182830'); gradient.addColorStop(1, '#07111a');
    context.fillStyle = gradient; context.fillRect(0, 0, canvas.width, canvas.height);
    canvas.setAttribute('aria-label', fighter.name || fighter.uid);
    canvas.dataset.codexUid = fighter.uid;
    if (draw(context, fighter.uid, 0, 0, canvas.width, canvas.height, { small: true })) {
      canvas.dataset.painted = 'true'; canvas.dataset.artState = 'ready';
      canvas.setAttribute('aria-busy', 'false');
    } else {
      const { entry } = resolve(fighter.uid);
      hold(canvas, entry);
      canvas.dataset.painted = 'false'; canvas.dataset.artState = entry.state;
      canvas.setAttribute('aria-busy', entry.state === 'loading' ? 'true' : 'false');
      if (entry.state === 'loading') whenReady(canvas, [fighter.uid], () => portrait(canvas, fighter));
    }
    return true;
  }

  function status(uid) {
    if(machineMapped(uid))return{mapped:true,source:'native-assembled',requestedSource:'native-assembled',state:root.CQC_PASS18_MACHINES.ready(uid)?'ready':'loading',fallbackAfterError:false};
    const primary = selected[uid];
    const primaryEntry = primary && images.get(primary.file);
    const fallback = primaryEntry?.state === 'failed' && primary.kind !== 'legacy' ? data.legacy[uid] : null;
    const displayed = fallback || primary;
    return { mapped: !!primary, source: displayed?.kind, requestedSource: primary?.kind,
      state: displayed ? (images.get(displayed.file)?.state || 'not-requested') : 'unmapped',
      fallbackAfterError: !!fallback };
  }

  function install() {
    if (root.CQC55_ART && !root.CQC55_ART.pass17Codex) {
      const original = root.CQC55_ART.drawPortrait;
      root.CQC55_ART.drawPortrait = function (canvas, fighter) {
        if (!portrait(canvas, fighter)) original(canvas, fighter);
      };
      root.CQC55_ART.pass17Codex = true;
    }
    if (root.CQC56_PORTRAITS && !root.CQC56_PORTRAITS.pass17Codex) {
      const original = root.CQC56_PORTRAITS;
      const previous = { draw: original.draw, whenReady: original.whenReady, cancel: original.cancel, status: original.status };
      original.draw = function (context, uid, x, y, width, height, options) {
        return selected[uid]||machineMapped(uid) ? draw(context, uid, x, y, width, height, options) : previous.draw(context, uid, x, y, width, height, options);
      };
      original.whenReady = function (canvas, uids, redraw) {
        const ours = uids.filter(uid => selected[uid]||machineMapped(uid));
        const other = uids.filter(uid => !selected[uid]&&!machineMapped(uid));
        if (ours.length) whenReady(canvas, ours, redraw);
        if (other.length) previous.whenReady(canvas, other, redraw);
      };
      original.cancel = function (canvas) { release(canvas); previous.cancel(canvas); };
      original.status = uid => selected[uid]||machineMapped(uid) ? status(uid) : previous.status(uid);
      original.portrait = portrait;
      original.pass17Codex = true;
    }
  }

  root.CQC_PASS17_CODEX_ART = { draw, drawPortrait: portrait, whenReady, cancel: release, status, install,
    diagnostics: () => ({ mapped: Object.keys(selected).length, native: Object.keys(data.native).length,
      corrected: Object.keys(data.corrected).length, cachedImages: images.size,
      activeImages: [...images.values()].filter(e => e.canvases.size).length,
      failed: [...images.values()].filter(e => e.state === 'failed').map(e => e.file) }) };
  install();
})(globalThis);
