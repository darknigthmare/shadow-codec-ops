const imageLoads = new Map();

// Share decoded sources with the library; failed loads remain retryable.
export function loadSource(source) {
  const url = new URL(source, document.baseURI).href;
  if (imageLoads.has(url)) return imageLoads.get(url);
  const image = new Image();
  image.decoding = 'async';
  const promise = new Promise((resolve, reject) => {
    image.onerror = () => reject(Error('Image indisponible'));
    image.onload = async () => {
      try {
        if (image.decode) await image.decode();
        if (!image.naturalWidth || !image.naturalHeight) throw Error('Image vide');
        resolve(image);
      } catch (error) { reject(error); }
    };
    image.src = url;
  });
  imageLoads.set(url, promise);
  promise.catch(() => { if (imageLoads.get(url) === promise) imageLoads.delete(url); });
  return promise;
}

export function sharedFit(rows, width = 480, height = 520) {
  if (!rows.length || new Set(rows.map(row => row.uid)).size !== 1) throw Error('Un seul combattant par comparaison');
  const centerX = width / 2, floorY = height - 36, padding = 20;
  let side = 0, below = 0;
  for (const row of rows) {
    const [x, y, w, h] = row.bodyBounds || row.sourceRect;
    const bodyHeight = Math.max(1, row.footY - y);
    side = Math.max(side, (row.anchorX - x) / bodyHeight, (x + w - row.anchorX) / bodyHeight);
    below = Math.max(below, (y + h - row.footY) / bodyHeight);
  }
  const displayHeight = Math.min(floorY - 24, (centerX - padding) / Math.max(side, .001),
    below > 0 ? (height - floorY - 12) / below : Infinity);
  return {centerX, floorY, displayHeight};
}

export function placement(row, fit) {
  const [sx, sy, sw, sh] = row.sourceRect;
  const top = (row.bodyBounds || row.sourceRect)[1];
  const scale = fit.displayHeight / Math.max(1, row.footY - top);
  return {scale, x: fit.centerX + (sx - row.anchorX) * scale,
    y: fit.floorY + (sy - row.footY) * scale, width: sw * scale, height: sh * scale};
}

function visibleBounds(row, image) {
  const [sx, sy, width, height] = row.sourceRect;
  const canvas = document.createElement('canvas'); canvas.width = width; canvas.height = height;
  const context = canvas.getContext('2d', {willReadFrequently: true});
  context.drawImage(image, sx, sy, width, height, 0, 0, width, height);
  const pixels = context.getImageData(0, 0, width, height).data;
  let left = width, top = height, right = -1, bottom = -1;
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
    if (pixels[(y * width + x) * 4 + 3] < 32) continue;
    left = Math.min(left, x); top = Math.min(top, y); right = Math.max(right, x); bottom = Math.max(bottom, y);
  }
  return right < left ? row.sourceRect : [sx + left, sy + top, right - left + 1, bottom - top + 1];
}

function stagedCanvas(row, image, fit) {
  const canvas = document.createElement('canvas'); canvas.width = 480; canvas.height = 520;
  const context = canvas.getContext('2d'), position = placement(row, fit);
  context.imageSmoothingEnabled = row.family !== 'retro';
  context.strokeStyle = '#718573'; context.lineWidth = 1;
  context.beginPath(); context.moveTo(16, fit.floorY); context.lineTo(464, fit.floorY); context.stroke();
  context.setLineDash([4, 5]); context.strokeStyle = '#354a38';
  context.beginPath(); context.moveTo(fit.centerX, 12); context.lineTo(fit.centerX, fit.floorY); context.stroke();
  context.beginPath(); context.moveTo(16, fit.floorY - fit.displayHeight); context.lineTo(464, fit.floorY - fit.displayHeight); context.stroke();
  context.setLineDash([]);
  context.drawImage(image, ...row.sourceRect, position.x, position.y, position.width, position.height);
  return canvas;
}

export function createComparison() {
  const section = document.getElementById('comparison'), pair = document.getElementById('comparison-pair');
  const fighter = document.getElementById('compare-fighter'), selectors = ['a', 'b'].map(id => document.getElementById('compare-' + id));
  const status = document.getElementById('comparison-status'), retry = document.getElementById('comparison-retry');
  const groups = new Map(), fits = new Map(); let version = 0, displayed = false;
  function options(select, rows) {
    select.replaceChildren(...rows.map(row => new Option(row.label, row.id)));
  }
  function fitFor(uid, rows) {
    if (fits.has(uid)) return fits.get(uid);
    const promise = (async () => {
      for (const row of rows) if (!row.bodyBounds) row.bodyBounds = visibleBounds(row, await loadSource(row.src));
      return sharedFit(rows);
    })();
    fits.set(uid, promise);
    promise.catch(() => { if (fits.get(uid) === promise) fits.delete(uid); });
    return promise;
  }
  async function update() {
    const ticket = ++version, rows = groups.get(fighter.value);
    const requested = selectors.map(select => rows?.find(row => row.id === select.value));
    if (requested.some(row => !row)) return;
    pair.setAttribute('aria-busy', 'true'); retry.hidden = true;
    status.textContent = displayed ? 'Chargement des tenues… La comparaison affichée reste disponible.' : 'Chargement des tenues…';
    try {
      const [images, fit] = await Promise.all([
        Promise.all(requested.map(row => loadSource(row.src))), fitFor(fighter.value, rows)
      ]);
      if (ticket !== version) return;
      const staged = requested.map((row, index) => stagedCanvas(row, images[index], fit));
      // Both decoded frames and their labels commit in the same browser task.
      requested.forEach((row, index) => {
        const prefix = 'compare-' + ['a', 'b'][index], canvas = document.getElementById(prefix + '-canvas');
        const context = canvas.getContext('2d'); context.clearRect(0, 0, 480, 520); context.drawImage(staged[index], 0, 0);
        canvas.setAttribute('aria-label', row.character + ' — ' + row.label);
        canvas.style.imageRendering = row.family === 'retro' ? 'pixelated' : 'auto';
        canvas.dataset.rowId = row.id; canvas.dataset.uid = row.uid;
        canvas.dataset.displayHeight = String(fit.displayHeight); canvas.dataset.floorY = String(fit.floorY);
        canvas.dataset.sourceBodyTop = String((row.bodyBounds || row.sourceRect)[1]);
        document.getElementById(prefix + '-title').textContent = row.label;
        document.getElementById(prefix + '-character').textContent = row.character;
        const source = document.getElementById(prefix + '-source'); source.href = row.src; source.hidden = false;
        const reference = document.getElementById(prefix + '-reference');
        const url = row.referenceURLs?.find(value => /^https:\/\//.test(value));
        reference.hidden = !url; if (url) reference.href = url;
      });
      pair.dataset.uid = requested[0].uid; displayed = true;
      pair.setAttribute('aria-busy', 'false'); status.textContent = 'Comparaison affichée.';
    } catch {
      if (ticket !== version) return;
      pair.setAttribute('aria-busy', 'false'); retry.hidden = false;
      status.textContent = displayed ? 'Chargement impossible. La comparaison précédente reste affichée.' : 'Chargement impossible. Réessayez la comparaison.';
    }
  }
  function selectFighter(uid, selectedID) {
    fighter.value = uid;
    const rows = groups.get(uid); selectors.forEach(select => options(select, rows));
    selectors[0].value = rows[0].id;
    selectors[1].value = selectedID || rows[1]?.id || rows[0].id;
    return update();
  }
  fighter.addEventListener('change', () => selectFighter(fighter.value));
  selectors.forEach(select => select.addEventListener('change', update));
  retry.addEventListener('click', update);
  return {
    async initialize(entries) {
      for (const row of entries) {
        if (!groups.has(row.uid)) groups.set(row.uid, []);
        groups.get(row.uid).push({...row, src: new URL(row.src, document.baseURI).href});
      }
      // Original is an optional baseline from the existing archive, never a new asset.
      try {
        const url = new URL('../p54-dossiers/catalog.json', import.meta.url);
        const response = await fetch(url); if (!response.ok) throw Error('Archive indisponible');
        const archive = await response.json();
        for (const row of archive.entries) if (row.family === 'original' && groups.has(row.uid)) {
          groups.get(row.uid).unshift({...row, src: new URL(row.src, url).href});
        }
      } catch { /* Costume-to-costume comparison remains available without the archive. */ }
      fighter.replaceChildren(...Array.from(groups, ([uid, rows]) => new Option(rows[0].character, uid)));
      fighter.disabled = false; selectors.forEach(select => { select.disabled = false; });
      await selectFighter(fighter.options[0].value);
    },
    show(row) {
      selectFighter(row.uid, row.id);
      section.scrollIntoView({block: 'start'}); selectors[1].focus({preventScroll: true});
    }
  };
}
