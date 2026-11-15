(function (root) {
  'use strict';
  const host = root.document.getElementById('heroArt');
  if (!host) return;
  // A pending request owns its image. Never assign a new src to a DOM image
  // which another request can make visible while decode() is pending.
  const cache = new Map(), removals = new Map();
  let request = 0, current = null, shownPath = '', motion = true, visible = true;
  function syncMotion() {
    host.classList.toggle('is-moving', motion);
    host.classList.toggle('is-paused', !visible || root.document.hidden);
  }
  function ready(path) {
    if (cache.has(path)) return cache.get(path);
    const image = new root.Image();
    image.alt = '';
    image.decoding = 'async';
    const pending = new Promise((resolve, reject) => {
      image.onload = async () => {
        try {
          if (image.decode) await image.decode();
          if (!(image.naturalWidth > 0 && image.naturalHeight > 0)) throw new Error('Menu artwork has no decoded pixels: ' + path);
          resolve(image);
        } catch (error) { reject(error); }
      };
      image.onerror = () => reject(new Error('Menu artwork unavailable: ' + path));
      image.src = path;
    });
    cache.set(path, pending);
    pending.catch(() => { if (cache.get(path) === pending) cache.delete(path); });
    return pending;
  }
  async function show(key) {
    const token = ++request;
    const entry = root.CQCMenuArtCatalog?.images?.[key];
    if (!entry?.path) return;
    if (entry.path === shownPath) {
      // Shared artwork can still have a different mode and camera framing.
      current.style.objectPosition = entry.objectPosition || '67% 42%';
      host.dataset.mode = key;
      return;
    }
    try {
      const image = await ready(entry.path);
      if (token !== request) return;
      const previous = current;
      if (removals.has(image)) { root.clearTimeout(removals.get(image)); removals.delete(image); }
      image.style.objectPosition = entry.objectPosition || '67% 42%';
      image.classList.add('visible');
      host.appendChild(image);
      current = image;
      shownPath = entry.path;
      host.dataset.mode = key;
      if (previous && previous !== image) {
        previous.classList.remove('visible');
        if (removals.has(previous)) root.clearTimeout(removals.get(previous));
        removals.set(previous, root.setTimeout(() => {
          removals.delete(previous);
          if (previous !== current && previous.parentNode === host) host.removeChild(previous);
        }, 350));
      }
    } catch (error) {
      // Keep the last decoded image visible and allow a later request to retry.
      if (token === request) root.CQCProfileV044?.recordError(error, 'menu-art');
    }
  }
  root.CQCMenuArt = Object.freeze({
    show,
    setMotion(value) { motion = !!value; syncMotion(); },
    setVisible(value) { visible = !!value; syncMotion(); }
  });
  root.document.addEventListener('visibilitychange', syncMotion);
  syncMotion();
})(globalThis);
