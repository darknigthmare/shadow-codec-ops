import { access, readFile, readdir } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const requiredFiles = [
  'index.html',
  'manifest.webmanifest',
  'sw.js',
  'pwa-192x192.png',
  'pwa-512x512.png',
  'pwa-maskable-512x512.png',
  'apple-touch-icon.png'
];

for (const file of requiredFiles) {
  await access(path.join(dist, file), constants.R_OK);
}

const manifest = JSON.parse(await readFile(path.join(dist, 'manifest.webmanifest'), 'utf8'));
const requiredManifestFields = ['name', 'short_name', 'start_url', 'display', 'theme_color', 'background_color', 'icons'];
for (const field of requiredManifestFields) {
  if (!(field in manifest)) throw new Error(`PWA manifest missing ${field}`);
}
if (manifest.display !== 'standalone') throw new Error('PWA manifest must use standalone display mode.');
if (!Array.isArray(manifest.icons) || manifest.icons.length < 3) throw new Error('PWA manifest requires standard and maskable icons.');
if (!manifest.icons.some((icon) => String(icon.purpose ?? '').includes('maskable'))) throw new Error('PWA manifest missing maskable icon.');
if (!Array.isArray(manifest.shortcuts) || manifest.shortcuts.length < 4) throw new Error('PWA manifest requires Codec, Side Ops, VR and Builder shortcuts.');
if (!manifest.shortcuts.some((shortcut) => String(shortcut.url ?? '').includes('module=builder'))) throw new Error('PWA manifest missing Mission Builder shortcut.');

const sw = await readFile(path.join(dist, 'sw.js'), 'utf8');
if (!sw.includes('precacheAndRoute')) throw new Error('Generated service worker does not include the Workbox precache route.');

const workboxFiles = (await readdir(dist)).filter((file) => file.startsWith('workbox-') && file.endsWith('.js'));
if (workboxFiles.length === 0) throw new Error('Workbox runtime file not generated.');

console.log(`PWA CHECK PASS — ${manifest.name} / ${manifest.icons.length} icons / ${workboxFiles.length} Workbox runtime`);
