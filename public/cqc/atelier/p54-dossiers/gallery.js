const grid = document.getElementById('cards');
const status = document.getElementById('status');
const search = document.getElementById('search');
const collection = document.getElementById('collection');
const normalized = text => String(text || '').normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
const cards = [];
function filter() {
  const query = normalized(search.value), kind = collection.value;
  let visible = false;
  for (const {row, element} of cards) {
    element.hidden = !!((kind && (kind === 'metalgear' ? row.family !== kind : row.kind !== kind)) ||
      !normalized(row.character + ' ' + row.label).includes(query));
    visible ||= !element.hidden;
  }
  status.textContent = visible ? '' : 'Aucun dossier correspondant.';
}
function text(tag, value, className) {
  const node = document.createElement(tag); node.textContent = value;
  if (className) node.className = className;
  return node;
}
function card(row) {
  const wide = row.family === 'metalgear';
  const element = document.createElement('article'); element.className = 'card' + (wide ? ' wide' : ''); element.dataset.id = row.id;
  const head = document.createElement('header');
  head.append(text('h2', row.character), text('p', row.label, 'label')); element.append(head);
  const portrait = document.createElement('div'); portrait.className = 'portrait';
  const canvas = document.createElement('canvas'); canvas.width = wide ? 640 : 320; canvas.height = 420;
  canvas.setAttribute('role', 'img'); canvas.setAttribute('aria-label', row.character + ' — ' + row.label);
  const loading = text('p', 'Transmission en cours…', 'loading');
  const retry = text('button', 'Réessayer la transmission', 'retry'); retry.type = 'button'; retry.hidden = true;
  portrait.append(canvas, loading, retry); element.append(portrait);
  const footer = document.createElement('footer'); footer.append(text('span', row.kind === 'character' ? 'Renfort' : 'Tenue créée'));
  const links = document.createElement('span'); links.className = 'links';
  const source = text('a', 'Planche'); source.href = row.src; source.target = '_blank'; source.rel = 'noopener noreferrer'; links.append(source);
  const reference = row.referenceURLs.find(url => /^https:\/\//.test(url));
  if (reference) { const link = text('a', 'Référence'); link.href = reference; link.target = '_blank'; link.rel = 'noopener noreferrer'; links.append(link); }
  footer.append(links); element.append(footer);
  const image = new Image();
  function paint() {
    const ctx = canvas.getContext('2d'), [sx, sy, sw, sh] = row.sourceRect;
    const [bx, by, bw, bh] = row.bodyBounds || row.sourceRect;
    const left = Math.min(sx, bx), right = Math.max(sx + sw, bx + bw);
    const top = Math.min(sy, by), floor = 380, mid = canvas.width / 2;
    const side = Math.max(row.anchorX - left, right - row.anchorX, 1);
    const scale = Math.min(330 / Math.max(1, row.footY - top), (mid - 16) / side);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = row.family !== 'retro';
    ctx.strokeStyle = '#354632'; ctx.beginPath(); ctx.moveTo(18, floor); ctx.lineTo(canvas.width - 18, floor); ctx.stroke();
    ctx.drawImage(image, sx, sy, sw, sh, mid + (sx - row.anchorX) * scale, floor + (sy - row.footY) * scale, sw * scale, sh * scale);
    element.dataset.loaded = 'true'; loading.hidden = true; retry.hidden = true;
  }
  image.onload = paint;
  image.onerror = () => { loading.textContent = 'Transmission indisponible.'; loading.hidden = false; retry.hidden = false; element.dataset.loaded = 'error'; };
  retry.onclick = () => { retry.hidden = true; loading.textContent = 'Transmission en cours…'; image.src = row.src; };
  grid.append(element); image.src = row.src;
  cards.push({row, element, image});
}
try {
  const response = await fetch('catalog.json'); if (!response.ok) throw Error('Dossiers indisponibles');
  const catalog = await response.json();
  for (const row of catalog.entries) card(row);
  document.documentElement.dataset.archiveReady = 'true'; filter();
} catch {
  status.textContent = 'Dossiers indisponibles. Rechargez la transmission.';
}
search.addEventListener('input', filter); collection.addEventListener('change', filter);
