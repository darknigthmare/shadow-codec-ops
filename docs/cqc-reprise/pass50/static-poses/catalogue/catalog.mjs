import { STATUS, ORIGIN, normalizeManifest, summary, filterEntries, placement, safeAssetURL, safeReferenceURL } from './manifest-model.mjs';

const PAGE_SIZE = 24;
const COLLECTIONS = {original:'Origine',retro:'Rétro',nextgen:'Nouvelle génération',tuxedo:'Gala',cyborg:'Châssis cybernétique',metalgear:'Metal Gear',survive:'Dité',zombie:'Décomposition',furry:'Totems',canonical:'Tenues officielles'};
const $ = (id) => document.getElementById(id);
let manifest, filtered = [], page = 0, observer;
const imageCache = new Map();
let activeLoads = 0;
const queue = [];
const icon = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 2.5h7l3 3v8H3zM10 2.5v3h3M5 8h6M5 10.5h4"/></svg>';

function pump() {
  while (activeLoads < 4 && queue.length) {
    const job = queue.shift(); activeLoads++;
    const image = new Image(); image.decoding = 'async';
    image.onload = async () => {
      try { await image.decode(); } catch { /* load already succeeded */ }
      activeLoads--; job.entry.state = 'ready'; job.entry.image = image; job.resolve(image);
      while (imageCache.size > 8) {
        const stale = [...imageCache.entries()].find(([key, value]) => key !== job.url && value.state !== 'pending');
        if (!stale) break; imageCache.delete(stale[0]);
      }
      pump();
    };
    image.onerror = () => { activeLoads--; job.entry.state = 'error'; job.reject(new Error('Source indisponible')); pump(); };
    image.src = job.url;
  }
}

function getImage(url) {
  if (imageCache.has(url)) { const e = imageCache.get(url); imageCache.delete(url); imageCache.set(url, e); return e.promise; }
  let resolve, reject;
  const promise = new Promise((r, j) => { resolve = r; reject = j; });
  const entry = { state: 'pending', promise }; imageCache.set(url, entry);
  queue.push({ url, entry, resolve, reject }); pump(); return promise;
}

function el(tag, className, text) {
  const node = document.createElement(tag); if (className) node.className = className; if (text !== undefined) node.textContent = text; return node;
}

function makeLink(label, href) {
  const a = el('a', '', label); a.href = href; a.target = '_blank'; a.rel = 'noopener noreferrer'; return a;
}

function clipPath(ctx, polygon, holes, p, sw, sh) {
  if (!polygon?.length) return;
  ctx.beginPath();
  for (const points of [polygon, ...(holes || [])]) {
    if (points.length < 3) continue;
    points.forEach(([x, y], i) => { const dx = p.x + x * sw * p.scale, dy = p.y + y * sh * p.scale; i ? ctx.lineTo(dx, dy) : ctx.moveTo(dx, dy); }); ctx.closePath();
  }
  ctx.clip('evenodd');
}

async function renderPose(canvas, entry, stage, message) {
  const url = safeAssetURL(entry.source.src, location.href);
  if (!url) { stage.classList.add('error'); message.textContent = 'Source à raccorder'; return; }
  try {
    const image = await getImage(url); if (!canvas.isConnected) return;
    const [sx, sy, sw, sh] = entry.frame.rect;
    if (sx + sw > image.naturalWidth || sy + sh > image.naturalHeight) throw new Error('Cadre hors planche');
    const context = canvas.getContext('2d'), p = placement(entry.frame, canvas.width, canvas.height);
    context.clearRect(0, 0, canvas.width, canvas.height); context.imageSmoothingEnabled = entry.family !== 'retro'; context.save();
    clipPath(context, entry.frame.clipPolygon, entry.frame.clipHoles, p, sw, sh);
    context.drawImage(image, sx, sy, sw, sh, p.x, p.y, p.width, p.height); context.restore();
    canvas.hidden = false; message.hidden = true; stage.dataset.loaded = 'true';
  } catch {
    if (!canvas.isConnected) return; canvas.hidden = true; stage.classList.add('error'); message.textContent = 'Lecture de la source indisponible'; message.hidden = false;
  }
}

function card(entry) {
  const article = el('article', 'card'); article.dataset.key = entry.key;
  const heading = el('div', 'card-heading'), era = el('p', 'era', entry.era); era.title = entry.incarnation || entry.era; heading.append(el('h2', '', entry.character), era);
  const stage = el('div', 'stage'), message = el('p', 'no-image', entry.source ? 'Lecture de la planche…' : entry.status === 'missing' ? 'Illustration à produire' : 'Dessin à vérifier'); stage.append(message);
  if (entry.source && entry.frame) {
    const canvas = el('canvas'); canvas.width = 320; canvas.height = 360; canvas.hidden = true; canvas.setAttribute('role', 'img'); canvas.setAttribute('aria-label', `${entry.character}, ${entry.costume}, vue ${entry.facing === 'right' ? 'vers la droite' : 'à vérifier'}`); stage.append(canvas);
    stage._load = () => renderPose(canvas, entry, stage, message);
  }
  const details = el('div', 'card-details'); details.append(el('p', 'costume-name', entry.costume));
  const tags = el('div', 'tags'); tags.append(el('span', `badge ${entry.status}`, STATUS[entry.status]));
  const provenance = el('span', 'source-kind'); provenance.innerHTML = icon; provenance.append(document.createTextNode(ORIGIN[entry.origin])); tags.append(provenance); details.append(tags);
  const sources = el('div', 'sources');
  const assetURL = entry.source && safeAssetURL(entry.source.src, location.href); if (assetURL) sources.append(makeLink('Planche', assetURL));
  const reference = entry.references?.find((r) => safeReferenceURL(r.url)); if (reference) sources.append(makeLink('Référence', safeReferenceURL(reference.url))); details.append(sources);
  if (entry.note) details.append(el('p', 'entry-note', entry.note));
  article.append(heading, stage, details); return article;
}

function render() {
  observer?.disconnect(); const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE)); page = Math.min(page, pages - 1);
  const fragment = document.createDocumentFragment(); for (const entry of filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)) fragment.append(card(entry));
  $('cards').replaceChildren(fragment); $('previous').disabled = page === 0; $('next').disabled = page >= pages - 1; $('page-label').textContent = filtered.length ? `${page + 1} / ${pages}` : 'Aucun dossier';
  const counts = summary(filtered); $('summary').textContent = `${counts.drawn} disponibles · ${counts.missing} à dessiner · ${counts.review} à vérifier`;
  $('notice').hidden = filtered.length > 0; if (!filtered.length) $('notice').textContent = manifest.entries.length ? 'Aucun dossier ne correspond aux filtres.' : 'Les dossiers de cette passe seront présentés ici dès leur enregistrement.';
  observer = new IntersectionObserver((items) => { for (const item of items) if (item.isIntersecting) { item.target._load?.(); observer.unobserve(item.target); } }, { rootMargin: '200px' });
  for (const stage of document.querySelectorAll('.stage')) if (stage._load) observer.observe(stage);
}

function applyFilters() {
  page = 0; filtered = filterEntries(manifest.entries, { query: $('search').value, status: $('status').value, origin: $('origin').value, era: $('era').value, family: $('family').value }); render();
}

function optionList(id, values, labels = {}) {
  const select = $(id); for (const value of [...new Set(values)].sort((a, b) => a.localeCompare(b, 'fr'))) { const option = el('option', '', labels[value] || value); option.value = value; select.append(option); }
}

async function main() {
  try {
    const params = new URLSearchParams(location.search), path = params.get('manifest') || 'manifest.json';
    if (path.startsWith('/') || path.includes('..') || !/^[a-zA-Z0-9_./-]+\.json$/.test(path)) throw new Error('Chemin de catalogue invalide');
    const response = await fetch(path, { cache: 'no-store' }); if (!response.ok) throw new Error('Catalogue indisponible'); manifest = normalizeManifest(await response.json());
    optionList('era', manifest.entries.map((e) => e.era)); optionList('family', manifest.entries.flatMap((e) => [e.family, ...(e.coversFamilies || [])]), COLLECTIONS);
    $('snapshot').textContent = manifest.label || 'Archives des tenues';
    for (const id of ['status', 'origin', 'era', 'family']) $(id).addEventListener('change', applyFilters); $('search').addEventListener('input', applyFilters);
    $('reset').addEventListener('click', () => { for (const id of ['search', 'status', 'origin', 'era', 'family']) $(id).value = ''; applyFilters(); });
    $('previous').addEventListener('click', () => { if (page) { page--; render(); $('cards').scrollIntoView({ block: 'start' }); } }); $('next').addEventListener('click', () => { if ((page + 1) * PAGE_SIZE < filtered.length) { page++; render(); $('cards').scrollIntoView({ block: 'start' }); } });
    filtered = manifest.entries; render(); document.documentElement.dataset.catalogReady = 'true';
  } catch { $('notice').hidden = false; $('notice').textContent = 'Le dossier des tenues est indisponible ou incomplet.'; $('summary').textContent = 'Archives non chargées'; document.documentElement.dataset.catalogError = 'true'; }
}
main();
