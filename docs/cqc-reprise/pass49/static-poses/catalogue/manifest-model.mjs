export const STATUS = Object.freeze({ drawn: 'Dessin disponible', missing: 'À dessiner', review: 'À vérifier' });
export const ORIGIN = Object.freeze({ original: 'Tenue d’origine', official: 'Archives officielles', invented: 'Création' });
const finite = (x) => typeof x === 'number' && Number.isFinite(x);
const safeId = (x) => typeof x === 'string' && /^[a-zA-Z0-9][a-zA-Z0-9_.:-]{0,179}$/.test(x);

export function atlasRect(slot, width, height, columns = 3, rows = 3) {
  if (![slot, width, height, columns, rows].every(Number.isInteger) || width < 1 || height < 1 || columns < 1 || rows < 1 || slot < 0 || slot >= columns * rows || columns * rows > 9) throw new Error('Cellule de planche invalide');
  const col = slot % columns, row = Math.floor(slot / columns);
  const x = Math.floor(col * width / columns), y = Math.floor(row * height / rows);
  return [x, y, Math.floor((col + 1) * width / columns) - x, Math.floor((row + 1) * height / rows) - y];
}

export function safeAssetURL(value, base = 'http://localhost/') {
  if (typeof value !== 'string' || !value || value.includes('\\') || value.split(/[/?#]/).some((x) => x === '..')) return null;
  try {
    const url = new URL(value, base), origin = new URL(base);
    if (url.username || url.password || url.hash || !['http:', 'https:'].includes(url.protocol) || url.origin !== origin.origin) return null;
    const localPaths = ['assets/source-pages/', 'assets/reused-sources/', 'assets/native-sources/', 'assets/composite-sources/'].map((path) => new URL(path, origin).pathname);
    if (url.search || (!url.pathname.startsWith('/native/') && !url.pathname.startsWith('/captures/') && !localPaths.some((path) => url.pathname.startsWith(path)))) return null;
    return url.href;
  } catch { return null; }
}

export function safeReferenceURL(value) {
  try { const u = new URL(value); return u.protocol === 'https:' && !u.username && !u.password ? u.href : null; } catch { return null; }
}

function validateFrame(frame, source, key) {
  if (!frame || !Array.isArray(frame.rect) || frame.rect.length !== 4 || !frame.rect.every(finite)) throw new Error(`Cadre absent : ${key}`);
  const [x, y, w, h] = frame.rect;
  if (x < 0 || y < 0 || w <= 0 || h <= 0 || (source.width && x + w > source.width) || (source.height && y + h > source.height)) throw new Error(`Cadre hors planche : ${key}`);
  if (frame.pivot && (!Array.isArray(frame.pivot) || frame.pivot.length !== 2 || !frame.pivot.every(finite) || frame.pivot.some((n) => n < 0 || n > 1))) throw new Error(`Appui invalide : ${key}`);
  for (const name of ['clipPolygon', 'footprint']) {
    if (frame[name] && (!Array.isArray(frame[name]) || frame[name].some((p) => !Array.isArray(p) || p.length !== 2 || !p.every(finite)))) throw new Error(`Contour invalide : ${key}`);
  }
  if (frame.clipHoles && (!Array.isArray(frame.clipHoles) || frame.clipHoles.some((poly) => !Array.isArray(poly) || poly.some((p) => !Array.isArray(p) || p.length !== 2 || !p.every(finite))))) throw new Error(`Découpe invalide : ${key}`);
  if (frame.bodyBounds && (!Array.isArray(frame.bodyBounds) || frame.bodyBounds.length !== 4 || !frame.bodyBounds.every(finite) || frame.bodyBounds[2] <= 0 || frame.bodyBounds[3] <= 0)) throw new Error(`Gabarit invalide : ${key}`);
}

export function normalizeManifest(input) {
  if (!input || input.schema !== 'cqc.static-pose-catalog/1' || !Array.isArray(input.entries)) throw new Error('Catalogue non reconnu');
  const keys = new Set();
  const entries = input.entries.map((entry) => {
    if (!safeId(entry.uid) || !safeId(entry.costumeId)) throw new Error('Identifiant de dossier invalide');
    const key = `${entry.uid}:${entry.costumeId}`;
    if (keys.has(key)) throw new Error(`Dossier en double : ${key}`);
    keys.add(key);
    if (!Object.hasOwn(STATUS, entry.status) || !Object.hasOwn(ORIGIN, entry.origin)) throw new Error(`État du dossier invalide : ${key}`);
    const e = { ...entry, key, character: String(entry.character || entry.uid), era: String(entry.era || 'Époque à préciser'), costume: String(entry.costume || entry.costumeId), family: String(entry.family || entry.costumeId), references: (entry.references || []).map((r) => typeof r === 'string' ? { url: r } : r).filter((r) => safeReferenceURL(r.url)) };
    if (e.source) {
      if (!['native-frame', 'generated-atlas', 'native-composite', 'existing-private-frame', 'existing-archived-frame'].includes(e.source.kind) || !/^[a-f0-9]{64}$/.test(e.source.sha256 || '') || typeof e.source.src !== 'string') throw new Error(`Source non vérifiable : ${key}`);
      validateFrame(e.frame, e.source, key);
    }
    if (e.status === 'drawn' && (input.syntheticMetadataOnly || !e.source || e.source.verified !== true || e.facing !== 'right')) throw new Error(`Un dessin ne peut être déclaré disponible sans preuve : ${key}`);
    if (e.facing && !['left', 'right', 'front'].includes(e.facing)) throw new Error(`Direction invalide : ${key}`);
    return e;
  });
  return { ...input, entries };
}

export function summary(entries) {
  return entries.reduce((s, e) => { s.total++; s[e.status]++; return s; }, { total: 0, drawn: 0, missing: 0, review: 0 });
}

export function searchText(entry) {
  return [entry.character, entry.era, entry.costume, entry.family, entry.uid].join(' ').normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
}

export function filterEntries(entries, { query = '', status = '', origin = '', era = '', family = '' } = {}) {
  const q = query.normalize('NFD').replace(/\p{Diacritic}/gu, '').trim().toLowerCase();
  return entries.filter((e) => (!q || searchText(e).includes(q)) && (!status || e.status === status) && (!origin || e.origin === origin) && (!era || e.era === era) && (!family || e.family === family || e.coversFamilies?.includes(family)));
}

export function placement(frame, canvasWidth, canvasHeight) {
  const [x, y, w, h] = frame.rect, [px, py] = frame.pivot || [0.5, 1];
  const bodyHeight = frame.bodyBounds?.[3] || h;
  const scale = Math.min((canvasHeight - 56) / bodyHeight, (canvasWidth - 28) / w);
  return { x: canvasWidth / 2 - px * w * scale, y: canvasHeight - 20 - py * h * scale, width: w * scale, height: h * scale, scale, source: [x, y, w, h], groundY: canvasHeight - 20 };
}
