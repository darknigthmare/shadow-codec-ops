import { createHash } from 'node:crypto';
import { access, copyFile, mkdir, readFile, readdir, rename, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const textExtensions = new Set(['.html', '.js', '.css', '.json']);
const runtimeExtensions = new Set([...textExtensions, '.png', '.webp', '.jpg', '.jpeg', '.gif', '.svg', '.ogg', '.mp3', '.wav', '.woff', '.woff2']);
const excludedRoots = new Set(['docs', 'tests', 'tools', 'preparation', 'recovery', 'references', 'history']);
const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex');

const webWorkshop = `<!doctype html><html lang="fr"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>CQC — Atelier web</title><style>body{margin:0;padding:24px;background:#07100b;color:#e6eadd;font:16px/1.5 system-ui}main{max-width:850px;margin:auto}h1{color:#e3c86f}a{color:#e3c86f}nav{display:flex;flex-wrap:wrap;gap:18px}section{border:1px solid #3e5342;padding:16px;margin:20px 0}</style><main><h1>CQC Versus — Atelier</h1><p>Les sauvegardes et les options sont disponibles depuis le menu principal. Cette édition web reprend le jeu autonome avec les mêmes clés de progression CQC.</p><section><p>Retrouvez les chroniques, les duels et vos archives depuis le commandement.</p><p>Les références de production, archives historiques et rapports de développement restent dans le paquet autonome complet.</p></section><nav><a href="chronicles-v056.html">Chroniques</a><a href="unified-versus-v055.html">Versus libre</a><a href="arcade-chronicles-v055.html">Arcade</a><a href="../index.html">Menu principal</a></nav></main><script src="../src/chronicles-data-v056.js"></script><script>for(const el of document.querySelectorAll('[data-count]'))el.textContent=(window.CQC55_DATA?.counts?.[el.dataset.count]??0).toLocaleString('fr-FR')</script></html>`;

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

// Explicit immutable routes are separate from local files. Validate the exact
// reviewed owner bytes and every logical name; never ignore a missing prefix.
export function validateExternalReferences(policy, availableFiles, ownerSources) {
  if (policy === undefined) {
    if (['src/cqc-pass40-core-metadata-variants-v1.js', 'src/cqc-pass40-core-three-metadata-variants-v1.js', 'src/cqc-pass40-support-skull-mode-v1.js', 'src/cqc-pass40-liquid-support-v1.js'].some((owner) => availableFiles.has(owner))) {
      throw new Error('Immutable-route owners require their explicit external-reference ledger.');
    }
    return new Map();
  }
  if (!policy || policy.schema !== 'shadow-codec-ops.cqc-external-references/1'
      || Object.keys(policy).sort().join(',') !== 'entries,schema'
      || !Array.isArray(policy.entries) || policy.entries.length < 1 || policy.entries.length > 128) {
    throw new Error('Invalid explicit external-reference policy.');
  }
  // This release admits only this reviewed finite ledger. A later route or
  // immutable URL change requires a separately reviewed ledger and this pin.
  if (sha256(Buffer.from(JSON.stringify(policy))) !== 'a0fedd997c21559b4813f0c71183dee69a00b86732bace7fbce2a291ad92de2d') {
    throw new Error('External-reference ledger differs from the reviewed release.');
  }
  const allowedOwners = new Set(['src/cqc-pass40-core-metadata-variants-v1.js', 'src/cqc-pass40-core-three-metadata-variants-v1.js', 'src/cqc-pass40-support-skull-mode-v1.js', 'src/cqc-pass40-liquid-support-v1.js']);
  const resolved = new Map(), owners = new Set();
  for (const row of policy.entries) {
    if (!row || Object.keys(row).sort().join(',') !== 'bytes,from,ownerSHA256,sha256,to,url'
        || !allowedOwners.has(row.from) || !availableFiles.has(row.from) || availableFiles.has(row.to)
        || !/^assets\/combat-costumes-pass40\/[a-z0-9_]+\/[a-z0-9-]+\/[a-z0-9-]+\.(?:png|json)$/.test(row.to)
        || !Number.isSafeInteger(row.bytes) || row.bytes < 1 || row.bytes > 8 * 1024 * 1024
        || !/^[a-f0-9]{64}$/.test(row.sha256) || !/^[a-f0-9]{64}$/.test(row.ownerSHA256)) {
      throw new Error('Invalid explicit external-reference entry.');
    }
    const source = ownerSources.get(row.from);
    if (!Buffer.isBuffer(source) || sha256(source) !== row.ownerSHA256) throw new Error('External-reference owner changed: ' + row.from);
    const prefix = /^https:\/\/raw\.githubusercontent\.com\/darknigthmare\/shadow-codec-ops\/[a-f0-9]{40}\//;
    if (!prefix.test(row.url)) throw new Error('External-reference URL is not immutable.');
    const remotePath = row.url.replace(prefix, '');
    const expectedPath = row.to.endsWith('.png') ? 'raw/' + row.sha256 + '.png' : 'rootassets/' + row.to;
    if (remotePath !== expectedPath) throw new Error('External-reference URL/path/SHA mismatch.');
    const key = row.from + '\0' + row.to;
    if (resolved.has(key)) throw new Error('Duplicate explicit external reference.');
    resolved.set(key, row); owners.add(row.from);
  }
  for (const owner of owners) {
    const missing = discoverReferences(ownerSources.get(owner).toString('utf8'), owner, availableFiles).omittedReferences.filter(isRuntimePath);
    for (const to of missing) if (!resolved.has(owner + '\0' + to)) throw new Error('Unregistered external reference: ' + owner + ':' + to);
    for (const row of resolved.values()) if (row.from === owner && !missing.includes(row.to)) throw new Error('Unused external reference: ' + owner + ':' + row.to);
  }
  return resolved;
}

async function readExternalPolicy(sourceRoot) {
  try {
    return JSON.parse(await readFile(path.join(sourceRoot, 'runtime-manifest.json'), 'utf8')).externalReferences;
  } catch (error) {
    if (error.code === 'ENOENT') return undefined;
    throw error;
  }
}

async function externalOwners(sourceRoot, policy) {
  const result = new Map();
  if (policy === undefined) return result;
  // Do not read an unvalidated owner path from the policy.
  for (const owner of ['src/cqc-pass40-core-metadata-variants-v1.js', 'src/cqc-pass40-core-three-metadata-variants-v1.js', 'src/cqc-pass40-support-skull-mode-v1.js', 'src/cqc-pass40-liquid-support-v1.js']) {
    if (policy?.entries?.some((row) => row?.from === owner)) result.set(owner, await readFile(path.join(sourceRoot, owner)));
  }
  return result;
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
  const externalPolicy = await readExternalPolicy(sourceRoot);
  const external = validateExternalReferences(externalPolicy, availableFiles, await externalOwners(sourceRoot, externalPolicy));
  const usedExternal = new Set();
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
    for (const dependency of discovered.omittedReferences) {
      const key = relativePath + '\0' + dependency;
      if (external.has(key)) usedExternal.add(key);
      else omitted.push({ from: relativePath, to: dependency });
    }
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
  if (externalPolicy !== undefined) {
    if (usedExternal.size !== external.size) throw new Error('External-reference owner is not reachable from CQC entry.');
    manifest.externalReferences = externalPolicy;
  }
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
  if (!Array.isArray(manifest.files) || !Array.isArray(manifest.references)) throw new Error('Invalid CQC runtime file/reference table.');
  const declaredFiles = new Set(), declaredReferences = new Set();
  let totalBytes = 0;
  for (const entry of manifest.files) {
    if (!entry || typeof entry.path !== 'string' || declaredFiles.has(entry.path)
        || !Number.isSafeInteger(entry.bytes) || entry.bytes < 0) throw new Error('Invalid or duplicate CQC runtime file row.');
    declaredFiles.add(entry.path); totalBytes += entry.bytes;
  }
  if (manifest.entry !== 'index.html' || !declaredFiles.has(manifest.entry)) throw new Error('CQC runtime entry lacks a checksummed file row.');
  if (!Number.isSafeInteger(totalBytes) || manifest.totalBytes !== totalBytes) throw new Error('CQC runtime byte total differs from its declared file rows.');
  for (const reference of manifest.references) {
    if (!reference || !declaredFiles.has(reference.from) || !declaredFiles.has(reference.to)) throw new Error('CQC runtime reference lacks a checksummed file row.');
    const key = reference.from + '\0' + reference.to;
    if (declaredReferences.has(key)) throw new Error('Duplicate CQC runtime reference row.');
    declaredReferences.add(key);
  }
  const external = validateExternalReferences(manifest.externalReferences, declaredFiles, await externalOwners(destinationRoot, manifest.externalReferences));
  const actualReferences = new Set(), usedExternal = new Set();
  for (const entry of manifest.files) {
    const file = await readFile(path.join(destinationRoot, entry.path));
    if (file.length !== entry.bytes || sha256(file) !== entry.sha256) throw new Error(`CQC runtime changed: ${entry.path}`);
    if (!textExtensions.has(path.posix.extname(entry.path))) continue;
    const discovered = discoverReferences(file.toString('utf8'), entry.path, declaredFiles);
    for (const to of discovered.references) {
      const key = entry.path + '\0' + to;
      if (!declaredReferences.has(key)) throw new Error('Actual CQC source reference omitted from manifest: ' + entry.path + ':' + to);
      actualReferences.add(key);
    }
    for (const to of discovered.omittedReferences.filter(isRuntimePath)) {
      const key = entry.path + '\0' + to;
      if (!external.has(key)) throw new Error('Actual CQC source reference lacks a declared local file or exact external route: ' + entry.path + ':' + to);
      usedExternal.add(key);
    }
  }
  if (actualReferences.size !== declaredReferences.size) throw new Error('CQC runtime declares an unused source reference.');
  if (usedExternal.size !== external.size) throw new Error('CQC runtime declares an unused external reference.');
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
