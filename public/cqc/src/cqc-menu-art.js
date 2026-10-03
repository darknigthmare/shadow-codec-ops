(function (root) {
  'use strict';
  const host = root.document.getElementById('heroArt');
  if (!host) return;
  const slots = [root.document.createElement('img'), root.document.createElement('img')];
  slots.forEach(img => { img.alt = ''; img.decoding = 'async'; host.appendChild(img); });
  const cache = new Map();
  let request = 0, current = -1, shownPath = '', motion = true, visible = true;
  function syncMotion() {
    host.classList.toggle('is-moving', motion);
    host.classList.toggle('is-paused', !visible || root.document.hidden);
  }
  function ready(path) {
    if (cache.has(path)) return cache.get(path);
    const image = new root.Image();
    image.decoding = 'async';
    const pending = new Promise((resolve, reject) => {
      image.onload = async () => {
        try { if (image.decode) await image.decode(); resolve(image); }
        catch (error) { reject(error); }
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
    if (!entry?.path || entry.path === shownPath) return;
    try {
      const image = await ready(entry.path);
      if (token !== request) return;
      const next = current < 0 ? 0 : 1 - current;
      const slot = slots[next];
      slot.src = image.src;
      slot.style.objectPosition = entry.objectPosition || '67% 42%';
      if (slot.decode) await slot.decode();
      if (token !== request) return;
      slot.classList.add('visible');
      if (current >= 0) slots[current].classList.remove('visible');
      current = next;
      shownPath = entry.path;
      host.dataset.mode = key;
    } catch (error) {
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
