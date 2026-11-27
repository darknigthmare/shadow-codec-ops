import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); }
catch { ({ chromium } = require(path.join(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES || '/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules', 'playwright'))); }
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.resolve(process.argv[2] || '/tmp/cqc-p71-browser-qa');
fs.mkdirSync(output, { recursive: true });
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.css': 'text/css' };
const server = http.createServer((request, response) => {
  const pathname = new URL(request.url, 'http://127.0.0.1').pathname;
  if (pathname === '/p71-harness') {
    response.setHeader('Content-Type', 'text/html');
    response.end('<!doctype html><title>Frame integration test</title><iframe id="archive-frame" src="/cqc/modules/classified-archives-p71.html" style="width:100%;height:950px"></iframe><script>window.messages=[];addEventListener("message",e=>{if(e.source===document.querySelector("iframe").contentWindow&&e.origin===location.origin)messages.push(e.data)})</script>'); return;
  }
  const file = path.resolve(root, 'public', '.' + pathname);
  if (!file.startsWith(path.join(root, 'public') + path.sep)) { response.writeHead(403); response.end(); return; }
  try { const data = fs.readFileSync(file); response.setHeader('Content-Type', mime[path.extname(file)] || 'application/octet-stream'); response.end(data); }
  catch { response.writeHead(404); response.end('Missing test resource'); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const origin = 'http://127.0.0.1:' + server.address().port;
const url = origin + '/cqc/modules/classified-archives-p71.html';
let browser;
try {
  browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
} catch (error) {
  await new Promise(resolve => server.close(resolve));
  const message = String(error.message || error);
  fs.writeFileSync(path.join(output, 'results.json'), JSON.stringify({ date: new Date().toISOString(), status: 'blocked', tests: 0, passed: 0, failed: 0, reason: message.includes('/usr/lib/chromium/chromium: not found') ? 'The system Chromium launcher has no browser binary at /usr/lib/chromium/chromium.' : message.split('\n')[0] }, null, 2) + '\n');
  console.error('BLOCKED: Chromium could not launch. No browser scenario was executed; see results.json.');
  process.exit(2);
}
const results = [], pageErrors = [];
const check = (name, details = {}) => { results.push({ name, status: 'passed', ...details }); console.log('PASS', name); };
const waitReady = page => page.waitForFunction(() => document.querySelector('.axes')?.innerText.includes('Rapport disponible'));
let failure;
try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage(); page.on('pageerror', error => pageErrors.push(error.message));
  await page.goto(url); await waitReady(page);
  assert.equal(await page.locator('.dossier-card').count(), 3);
  assert.equal(await page.locator('[data-discovery=secret]').count(), 3);
  const content = await page.locator('body').innerText();
  for (const name of ['Mémoire d’une opération', 'Tenir la ligne', 'Passage de témoin']) assert.equal(content.includes(name), false);
  assert.equal(await page.locator('#archives-claim,#archives-open').count(), 0);
  assert.equal(await page.locator('#reader-title').innerText(), '');
  const labels = await page.locator('.dossier-card').evaluateAll(nodes => nodes.map(node => node.getAttribute('aria-label')));
  assert.ok(labels.every(label => label.includes('Dossier non révélé')));
  await page.screenshot({ path: path.join(output, 'desktop-secret.png'), fullPage: true });
  check('Fresh screen: secrets hidden from visible text, reader and accessible labels');

  const card2 = page.locator('[data-dossier-id=report02]');
  await card2.focus(); await page.keyboard.press('Enter');
  assert.equal(await card2.getAttribute('aria-pressed'), 'true');
  assert.ok((await page.locator('#archives-detail').innerText()).includes('Gagner trois duels'));
  check('Locked slot remains focusable and explains its real condition');

  await page.evaluate(() => localStorage.setItem('cqc-v048-operations-profile', JSON.stringify({ records: { survivalBest: 1 } })));
  await page.locator('#archives-refresh').click(); await waitReady(page);
  assert.equal(await page.locator('[data-dossier-id=report02]').getAttribute('data-discovery'), 'hint');
  assert.equal(await page.locator('#archives-claim').count(), 0);
  await page.evaluate(() => localStorage.setItem('cqc-v048-operations-profile', JSON.stringify({ records: { survivalBest: 3 } })));
  await page.locator('#archives-refresh').click(); await waitReady(page);
  await page.locator('#archives-claim').click();
  await page.waitForFunction(() => document.getElementById('archives-status').textContent.includes('sauvegardé'));
  assert.equal(await page.locator('[data-dossier-id=report02]').getAttribute('data-right'), 'permanent');
  assert.equal(await page.evaluate(() => document.querySelector('#archives-reader').open), false);
  const granted = await page.evaluate(() => CQC_P71_ACCESS.loadLedger(localStorage));
  assert.equal(granted.payload.grants.length, 1);
  await page.locator('#archives-open').click();
  assert.equal(await page.locator('#reader-title').innerText(), 'Tenir la ligne');
  assert.equal(await page.locator('#reader-body p').count(), 3);
  await page.keyboard.press('Escape');
  check('Earned report saved before revealing, then opened with its complete text');

  await page.evaluate(() => localStorage.removeItem('cqc-v048-operations-profile'));
  await page.reload(); await waitReady(page);
  await page.locator('[data-dossier-id=report02]').click();
  assert.equal(await page.locator('#archives-open').count(), 1);
  assert.equal(await page.locator('#archives-claim').count(), 0);
  const reloaded = await page.evaluate(() => CQC_P71_ACCESS.loadLedger(localStorage));
  assert.deepEqual(reloaded.payload.grants, granted.payload.grants);
  check('Permanent acquisition survives reload and removal of its original progress record');

  await page.route('**/cqc-p71-access-dossiers.json', route => route.abort());
  await page.reload();
  await page.waitForFunction(() => document.querySelector('#archives-warning').textContent.includes('chargés'));
  await page.locator('[data-dossier-id=report02]').click();
  assert.equal(await page.locator('[data-dossier-id=report02]').getAttribute('data-right'), 'permanent');
  assert.equal(await page.locator('#archives-open').count(), 0);
  assert.ok((await page.locator('.axes').innerText()).includes('Chargement à réessayer'));
  await page.unroute('**/cqc-p71-access-dossiers.json');
  await page.locator('#archives-refresh').click(); await waitReady(page);
  assert.equal(await page.locator('#archives-open').count(), 1);
  check('Network failure is technical unavailability; recovery retains the permanent right');

  await page.evaluate(() => {
    localStorage.setItem('cqc-v048-operations-profile', JSON.stringify({ records: { relay5Wins: 1 } }));
    window.originalSetItem = Storage.prototype.setItem;
    Storage.prototype.setItem = function (key, value) { if (key.startsWith('cqc.p71.access.')) throw new DOMException('Quota test', 'QuotaExceededError'); return window.originalSetItem.call(this, key, value); };
  });
  await page.locator('#archives-refresh').click(); await waitReady(page);
  await page.locator('[data-dossier-id=report03]').click();
  assert.equal(await page.locator('.rule-join').innerText(), 'OU');
  await page.locator('#archives-claim').click();
  await page.waitForFunction(() => document.querySelector('#archives-status').textContent.includes('non confirmé'));
  assert.equal(await page.locator('[data-dossier-id=report03]').getAttribute('data-right'), 'claimable');
  assert.equal(await page.locator('#archives-open').count(), 0);
  assert.equal((await page.evaluate(() => CQC_P71_ACCESS.loadLedger(localStorage))).payload.grants.length, 1);
  await page.evaluate(() => { Storage.prototype.setItem = window.originalSetItem; });
  await page.locator('#archives-claim').click();
  await page.waitForFunction(() => document.querySelector('#archives-status').textContent.includes('sauvegardé'));
  assert.equal((await page.evaluate(() => CQC_P71_ACCESS.loadLedger(localStorage))).payload.grants.length, 2);
  check('Failed save cannot reveal a report; retry grants once through the 5v5 alternative');

  await page.evaluate(() => localStorage.setItem('cqc-v048-operations-profile', '{broken'));
  await page.locator('#archives-refresh').click(); await waitReady(page);
  assert.equal(await page.locator('[data-dossier-id=report02]').getAttribute('data-right'), 'permanent');
  assert.equal(await page.locator('[data-dossier-id=report03]').getAttribute('data-right'), 'permanent');
  assert.ok((await page.locator('#archives-warning').innerText()).includes('progression'));
  check('Unreadable progress does not revoke previously acquired reports');

  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
  const mobilePage = await mobile.newPage(); mobilePage.on('pageerror', error => pageErrors.push(error.message));
  await mobilePage.goto(url); await waitReady(mobilePage);
  assert.equal(await mobilePage.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
  assert.ok((await mobilePage.locator('.dossier-card').evaluateAll(nodes => nodes.map(node => node.getBoundingClientRect().height))).every(height => height >= 44));
  await mobilePage.locator('[data-dossier-id=report03]').tap();
  assert.ok((await mobilePage.locator('#archives-detail').innerText()).includes('OU'));
  await mobilePage.evaluate(() => document.getElementById('archives-detail').classList.add('revealed'));
  assert.equal(await mobilePage.locator('#archives-detail').evaluate(node => getComputedStyle(node).animationName), 'none');
  await mobilePage.screenshot({ path: path.join(output, 'mobile-secret.png'), fullPage: true });
  check('390px touch layout has no horizontal overflow and honors reduced motion');

  await mobilePage.locator('#archives-hide-secrets').uncheck();
  assert.equal(await mobilePage.locator('[data-dossier-id=report03] .card-name').innerText(), 'Passage de témoin');
  await mobilePage.reload(); await waitReady(mobilePage);
  assert.equal(await mobilePage.locator('#archives-hide-secrets').isChecked(), false);
  assert.equal(await mobilePage.locator('#archives-open,#archives-claim').count(), 0);
  check('Optional name reveal persists without granting access');

  const concurrent = await browser.newContext({ viewport: { width: 1100, height: 850 } });
  await concurrent.addInitScript(() => localStorage.setItem('cqc-v048-operations-profile', JSON.stringify({ records: { survivalBest: 3, relay3Wins: 1 } })));
  const [first, second] = await Promise.all([concurrent.newPage(), concurrent.newPage()]);
  await Promise.all([first.goto(url), second.goto(url)]); await Promise.all([waitReady(first), waitReady(second)]);
  await first.locator('[data-dossier-id=report02]').click(); await second.locator('[data-dossier-id=report03]').click();
  await Promise.all([first.locator('#archives-claim').click(), second.locator('#archives-claim').click()]);
  await first.waitForFunction(() => CQC_P71_ACCESS.loadLedger(localStorage).payload.grants.length === 2);
  const combined = await first.evaluate(() => CQC_P71_ACCESS.loadLedger(localStorage));
  assert.equal(new Set(combined.payload.grants.map(item => item.eventId)).size, 2);
  check('Two tabs claim distinct reports without losing a permanent attribution');

  const framePage = await context.newPage(); await framePage.goto(origin + '/p71-harness');
  const frame = framePage.frameLocator('#archive-frame');
  await frame.locator('#archives-detail a').click();
  await framePage.waitForFunction(() => messages.length > 0);
  assert.deepEqual(await framePage.evaluate(() => messages.at(-1)), { type: 'cqc-open-module', module: 'chronicles56' });
  check('Embedded activity link sends the existing shell command with the correct origin');

  await page.goto(url); await waitReady(page);
  await page.evaluate(() => {
    window.testPad = { connected: true, buttons: Array.from({ length: 16 }, () => ({ pressed: false })) };
    Object.defineProperty(navigator, 'getGamepads', { configurable: true, value: () => [window.testPad] });
    window.testPad.buttons[13].pressed = true;
  });
  await page.waitForFunction(() => document.activeElement.matches('a.wordmark'));
  await page.evaluate(() => { testPad.buttons[13].pressed = false; }); await page.waitForTimeout(170);
  await page.evaluate(() => { testPad.buttons[13].pressed = true; });
  await page.waitForFunction(() => document.activeElement.textContent === 'Atelier');
  check('Browser gamepad adapter moves the same visible keyboard focus targets');

  assert.deepEqual(pageErrors, []);
  check('No uncaught browser errors across the tested desktop/mobile paths');
  await context.close(); await mobile.close(); await concurrent.close();
} catch (error) { failure = error; console.error(error); }
finally {
  await browser.close(); await new Promise(resolve => server.close(resolve));
  fs.writeFileSync(path.join(output, 'results.json'), JSON.stringify({ date: new Date().toISOString(), browser: 'Chromium', tests: results.length, passed: results.length, failed: failure ? 1 : 0, results, pageErrors, error: failure ? String(failure.stack || failure) : null }, null, 2) + '\n');
}
if (failure) process.exitCode = 1;
