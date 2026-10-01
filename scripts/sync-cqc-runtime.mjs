import { createHash } from 'node:crypto';
import { access, copyFile, mkdir, readFile, readdir, rename, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const textExtensions = new Set(['.html', '.js', '.css', '.json']);
const runtimeExtensions = new Set([...textExtensions, '.png', '.webp', '.jpg', '.jpeg', '.gif', '.svg', '.ogg', '.mp3', '.wav', '.woff', '.woff2']);
const excludedRoots = new Set(['docs', 'tests', 'tools', 'preparation', 'recovery', 'references', 'history']);
const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex');

const webWorkshop = `<!doctype html><html lang="fr"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>CQC — Atelier web</title><style>body{margin:0;padding:24px;background:#07100b;color:#e6eadd;font:16px/1.5 system-ui}main{max-width:850px;margin:auto}h1{color:#e3c86f}a{color:#e3c86f}nav{display:flex;flex-wrap:wrap;gap:18px}section{border:1px solid #3e5342;padding:16px;margin:20px 0}</style><main><h1>CQC Versus Legacy — Atelier web</h1><p>Les sauvegardes et les options sont disponibles depuis le menu principal. Cette édition web reprend le jeu autonome avec les mêmes clés de progression CQC.</p><section><p><strong data-count="stories">—</strong> récits · <strong data-count="fullScenePaintings">—</strong> tableaux complets · <strong data-count="fullyPaintedStories">—</strong> récits entièrement illustrés.</p><p>Les références de production, archives historiques et rapports de développement restent dans le paquet autonome complet.</p></section><nav><a href="chronicles-v056.html">Chroniques</a><a href="unified-versus-v055.html">Versus libre</a><a href="arcade-chronicles-v055.html">Arcade</a><a href="../index.html">Menu principal</a></nav></main><script src="../src/chronicles-data-v056.js"></script><script>for(const el of document.querySelectorAll('[data-count]'))el.textContent=(window.CQC55_DATA?.counts?.[el.dataset.count]??0).toLocaleString('fr-FR')</script></html>`;

export function isRuntimePath(relativePath) {
  const normalized = path.posix.normalize(relativePath);
  return normalized !== '..' && !normalized.startsWith('../') && !path.posix.isAbsolute(normalized)
    && !excludedRoots.has(normalized.split('/')[0])
    && !normalized.split('/').some((part) => /^(?:\.git|archives?|historical|provenance)$/i.test(part))
    && runtimeExtensions.has(path.posix.extname(normalized).toLowerCase());
}

async function fileInventory(sourceRoot, prefix = '') {
  const entries = await readdir(path.join(sourceRoot, prefix), { withFileTypes: true });
  const result = [];
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name, 'en'))) {
    const relative = path.posix.join(prefix, entry.name);
    if (entry.isSymbolicLink()) throw new Error(`CQC source contains a symbolic link: ${relative}`);
    if (entry.isDirectory()) {
      if (!excludedRoots.has(relative.split('/')[0])) result.push(...await fileInventory(sourceRoot, relative));
    } else if (entry.isFile() && isRuntimePath(relative)) result.push(relative);
  }
  return result;
}

// CQC mixes HTML attributes, inline data, external scripts and catalogue file paths.
// Read static filenames without evaluating any source code. Bare atlas filenames
// resolve through the source inventory; the legacy cinema directory is generated
// dynamically by chronicles-cinema and has an explicit runtime fallback below.
export function discoverReferences(text, owner, availableFiles) {
  const found = new Set();
  const omissions = new Set();
  const literals = text.matchAll(/["'`]([^"'`\r\n<>]{1,800}\.(?:html|js|css|json|webp|png|jpe?g|gif|svg|ogg|mp3|wav|woff2?)(?:\?[^"'`\r\n<>]*)?)["'`]/gi);
  for (const match of literals) {
    let value = match[1].split(/[?#]/, 1)[0];
    if (/^(?:https?:|data:|blob:|javascript:|\/\/)/i.test(value)) continue;
    const candidates = [path.posix.normalize(path.posix.join(path.posix.dirname(owner), value)), path.posix.normalize(value.replace(/^\.\//, ''))];
    const direct = candidates.find((candidate) => availableFiles.has(candidate));
    if (direct) { found.add(direct); continue; }
    if (!value.includes('/') && !value.startsWith('.')) {
      const basenameMatches = [...availableFiles].filter((candidate) => path.posix.basename(candidate) === value);
      for (const candidate of basenameMatches) found.add(candidate);
      const context = text.slice(Math.max(0, match.index - 60), match.index);
      if (!basenameMatches.length && /(?:(?:src|href|file)\s*[:=]|fetch\()\s*$/i.test(context)) {
        omissions.add(candidates[0]);
      }
    } else if (value.startsWith('../') || /^(?:src|modules|assets|data|originals|docs|tests|preparation|recovery)\//.test(value)) {
      omissions.add(value.startsWith('../') ? candidates[0] : path.posix.normalize(value));
    }
  }
  if (owner === 'src/chronicles-cinema-v056.js') {
    for (const candidate of availableFiles) if (candidate.startsWith('assets/cinema-v056/')) found.add(candidate);
  }
  return { references: [...found].sort(), omittedReferences: [...omissions].sort() };
}

function runtimeBytes(relativePath, original) {
  if (relativePath === 'modules/atelier-v056.html') return Buffer.from(webWorkshop);
  if (relativePath === 'index.html') {
    // CQC's standalone save manager historically matched "cqc" anywhere in a
    // key. Bound its export/import/reset operations to its existing namespaces
    // so same-origin Shadow saves can never be swept into those operations.
    return Buffer.from(original.toString('utf8').replace(/\.toLowerCase\(\)\.includes\((['"])cqc\1\)/g, ".toLowerCase().startsWith('cqc')"));
  }
  return original;
}

export async function buildRuntimeManifest(sourceRoot) {
  const availableFiles = new Set(await fileInventory(sourceRoot));
  if (!availableFiles.has('index.html')) throw new Error('CQC source must contain index.html.');
  const queue = ['index.html'];
  const files = new Map();
  const references = [];
  const omitted = [];
  for (let index = 0; index < queue.length; index++) {
    const relativePath = queue[index];
    if (files.has(relativePath)) continue;
    const sourceBytes = await readFile(path.join(sourceRoot, relativePath));
    const bytes = runtimeBytes(relativePath, sourceBytes);
    files.set(relativePath, { bytes, sourceSha256: sha256(sourceBytes), sha256: sha256(bytes) });
    if (!textExtensions.has(path.posix.extname(relativePath))) continue;
    const discovered = discoverReferences(bytes.toString('utf8'), relativePath, availableFiles);
    for (const dependency of discovered.references) {
      references.push({ from: relativePath, to: dependency });
      if (!files.has(dependency)) queue.push(dependency);
    }
    for (const dependency of discovered.omittedReferences) omitted.push({ from: relativePath, to: dependency });
  }
  const entries = [...files].sort(([a], [b]) => a.localeCompare(b, 'en')).map(([relativePath, file]) => ({
    path: relativePath, bytes: file.bytes.length, sha256: file.sha256,
    ...(file.sourceSha256 !== file.sha256 ? { sourceSha256: file.sourceSha256, transformation: relativePath === 'index.html' ? 'cqc-save-namespace' : 'web-only-workshop' } : {})
  }));
  const manifest = {
    schema: 'shadow-codec-ops.cqc-runtime/1',
    entry: 'index.html',
    storage: { cqc: 'Existing cqc-* namespaces; same CQC saves in embedded and standalone views.', shadow: 'shadow-codec-ops:' },
    files: entries,
    totalBytes: entries.reduce((sum, entry) => sum + entry.bytes, 0),
    references: references.sort((a, b) => `${a.from}:${a.to}`.localeCompare(`${b.from}:${b.to}`, 'en')),
    omittedReferences: omitted.sort((a, b) => `${a.from}:${a.to}`.localeCompare(`${b.from}:${b.to}`, 'en')),
    exclusions: 'Production references, historical documents, tests, tools, recovery records and unused source images. Gameplay archive modes are retained when reachable.'
  };
  const unresolvedRuntime = manifest.omittedReferences.filter(({ to }) => isRuntimePath(to));
  if (unresolvedRuntime.length) throw new Error(`Unresolved runtime references: ${JSON.stringify(unresolvedRuntime.slice(0, 12))}`);
  return { manifest, files };
}

export async function syncRuntime(sourceRoot, destinationRoot) {
  const source = path.resolve(sourceRoot);
  const destination = path.resolve(destinationRoot);
  if (source === destination || destination.startsWith(source + path.sep)) throw new Error('CQC destination must be outside its source directory.');
  const { manifest, files } = await buildRuntimeManifest(source);
  const temporary = `${destination}.sync-tmp`;
  await rm(temporary, { recursive: true, force: true });
  await mkdir(temporary, { recursive: true });
  for (const entry of manifest.files) {
    const target = path.join(temporary, entry.path);
    await mkdir(path.dirname(target), { recursive: true });
    if (entry.transformation) await writeFile(target, files.get(entry.path).bytes);
    else await copyFile(path.join(source, entry.path), target);
    if (sha256(await readFile(target)) !== entry.sha256) throw new Error(`CQC copy integrity failure: ${entry.path}`);
  }
  await writeFile(path.join(temporary, 'runtime-manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  await rm(destination, { recursive: true, force: true });
  await rename(temporary, destination);
  return manifest;
}

export async function verifyRuntime(destinationRoot) {
  const manifest = JSON.parse(await readFile(path.join(destinationRoot, 'runtime-manifest.json'), 'utf8'));
  for (const entry of manifest.files) {
    const file = await readFile(path.join(destinationRoot, entry.path));
    if (file.length !== entry.bytes || sha256(file) !== entry.sha256) throw new Error(`CQC runtime changed: ${entry.path}`);
  }
  for (const reference of manifest.references) await access(path.join(destinationRoot, reference.to));
  return manifest;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const destination = path.join(repositoryRoot, 'public/cqc');
  const sourceIndex = args.indexOf('--source');
  if (args.includes('--verify')) {
    const manifest = await verifyRuntime(destination);
    console.log(`CQC RUNTIME VERIFIED — ${manifest.files.length} files / ${(manifest.totalBytes / 1024 ** 2).toFixed(1)} MiB`);
  } else if (sourceIndex >= 0 && args[sourceIndex + 1]) {
    const manifest = await syncRuntime(args[sourceIndex + 1], destination);
    console.log(`CQC RUNTIME SYNCED — ${manifest.files.length} files / ${(manifest.totalBytes / 1024 ** 2).toFixed(1)} MiB`);
  } else {
    throw new Error('Usage: npm run cqc:sync -- --source /path/to/cqc-versus-v056, or npm run cqc:check');
  }
}
