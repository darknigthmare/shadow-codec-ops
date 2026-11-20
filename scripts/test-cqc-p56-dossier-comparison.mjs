import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {sharedFit, placement} from '../public/cqc/atelier/p55-dossiers/comparison.js';

const catalog = JSON.parse(await fs.readFile(new URL('../public/cqc/atelier/p55-dossiers/catalog.json', import.meta.url)));
const originals = JSON.parse(await fs.readFile(new URL('../public/cqc/atelier/p54-dossiers/catalog.json', import.meta.url)));

test('one fighter keeps the same displayed top/support while its widest complete variant fits', () => {
  for (const uid of new Set(catalog.entries.map(row => row.uid))) {
    const rows = [...catalog.entries, ...originals.entries.filter(row => row.family === 'original')].filter(row => row.uid === uid);
    const fit = sharedFit(rows);
    for (const row of rows) {
      const [sx, sy] = row.sourceRect, [bx, by, bw, bh] = row.bodyBounds || row.sourceRect;
      const p = placement(row, fit), x = p.x + (bx - sx) * p.scale, y = p.y + (by - sy) * p.scale;
      assert.ok(Math.abs(y - (fit.floorY - fit.displayHeight)) < 1e-8);
      assert.ok(Math.abs(p.y + (row.footY - sy) * p.scale - fit.floorY) < 1e-8);
      assert.ok(x >= 19.999 && x + bw * p.scale <= 460.001, row.id + ' horizontal fit');
      assert.ok(y >= 23.999 && y + bh * p.scale <= 508.001, row.id + ' vertical fit');
    }
  }
});

test('shared fit rejects another fighter and preserves a cropped source rectangle', () => {
  assert.throws(() => sharedFit(catalog.entries), /Un seul combattant/);
  const row = catalog.entries.find(row => row.sourceRect[0] > 0), fit = sharedFit([row]);
  const p = placement(row, fit);
  assert.ok(Math.abs(p.x + (row.anchorX - row.sourceRect[0]) * p.scale - fit.centerX) < 1e-8);
});

const browserURL = process.env.CQC_DOSSIERS_BROWSER_URL;
test('browser keeps the decoded pair during pending, stale and failed swaps; retry and mobile work',
  {skip: !browserURL, timeout: 90000}, async () => {
    const endpoint = process.env.CQC_BROWSER_CDP || 'http://127.0.0.1:9225';
    const target = await (await fetch(endpoint + '/json/new?about:blank', {method: 'PUT'})).json();
    const ws = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });
    let serial = 0; const pending = new Map(), paused = [], exceptions = [];
    ws.onmessage = ({data}) => {
      const event = JSON.parse(data);
      if (event.method === 'Fetch.requestPaused') paused.push(event.params);
      if (event.method === 'Runtime.exceptionThrown') exceptions.push(event.params);
      if (event.id) { const request = pending.get(event.id); if (request) { pending.delete(event.id); clearTimeout(request.timer); event.error ? request.reject(Error(event.error.message)) : request.resolve(event.result); } }
    };
    const call = (method, params = {}) => new Promise((resolve, reject) => {
      const id = ++serial, timer = setTimeout(() => { pending.delete(id); reject(Error('Timeout ' + method)); }, 20000);
      pending.set(id, {resolve, reject, timer}); ws.send(JSON.stringify({id, method, params}));
    });
    const evaluate = async expression => {
      const result = await call('Runtime.evaluate', {expression, returnByValue: true, awaitPromise: true});
      assert.equal(result.exceptionDetails, undefined); return result.result.value;
    };
    const until = async expression => {
      const end = Date.now() + 20000;
      while (Date.now() < end) { if (await evaluate(expression)) return; await new Promise(resolve => setTimeout(resolve, 50)); }
      throw Error('Condition timeout: ' + expression);
    };
    const takePaused = async () => {
      const end = Date.now() + 20000;
      while (!paused.length && Date.now() < end) await new Promise(resolve => setTimeout(resolve, 50));
      assert.ok(paused.length, 'Expected paused original source request'); return paused.shift();
    };
    const choose = uid => evaluate(`document.getElementById('compare-fighter').value=${JSON.stringify(uid)};document.getElementById('compare-fighter').dispatchEvent(new Event('change'));`);
    const firstUID = catalog.entries[0].uid, otherUID = catalog.entries.find(row => row.uid !== firstUID).uid;
    try {
      await call('Runtime.enable'); await call('Page.enable');
      await call('Emulation.setDeviceMetricsOverride', {width: 1440, height: 1100, deviceScaleFactor: 1, mobile: false});
      await call('Page.navigate', {url: browserURL});
      await until('document.documentElement.dataset.archiveReady === "true"');
      assert.equal(await evaluate('document.querySelectorAll("#cards .card").length'), catalog.entries.length);
      assert.ok(Number(await evaluate('document.getElementById("compare-a-canvas").dataset.sourceBodyTop')) > 0, 'Original transparent padding must not count as silhouette height');
      const initial = await evaluate('document.getElementById("compare-a-canvas").toDataURL()');
      const original = originals.entries.find(row => row.uid === otherUID && row.family === 'original');
      await call('Fetch.enable', {patterns: [{urlPattern: '*' + new URL(original.src, new URL('../p54-dossiers/catalog.json', browserURL)).pathname, requestStage: 'Request'}]});
      await choose(otherUID); const oldRequest = await takePaused();
      assert.equal(await evaluate('document.getElementById("comparison-pair").getAttribute("aria-busy")'), 'true');
      assert.equal(await evaluate('document.getElementById("compare-a-canvas").toDataURL()'), initial);
      await choose(firstUID); await until('document.getElementById("comparison-pair").getAttribute("aria-busy") === "false"');
      await call('Fetch.failRequest', {requestId: oldRequest.requestId, errorReason: 'Failed'});
      await new Promise(resolve => setTimeout(resolve, 100));
      assert.equal(await evaluate('document.getElementById("comparison-retry").hidden'), true, 'Stale failure must not replace current status');
      await choose(otherUID); const failedRequest = await takePaused();
      await call('Fetch.failRequest', {requestId: failedRequest.requestId, errorReason: 'Failed'});
      await until('!document.getElementById("comparison-retry").hidden');
      assert.equal(await evaluate('document.getElementById("comparison-pair").dataset.uid'), firstUID);
      assert.equal(await evaluate('document.getElementById("compare-a-canvas").toDataURL()'), initial);
      await evaluate('document.getElementById("comparison-retry").click()'); const retryRequest = await takePaused();
      await call('Fetch.continueRequest', {requestId: retryRequest.requestId});
      await until(`document.getElementById('comparison-pair').dataset.uid === ${JSON.stringify(otherUID)}`);
      assert.deepEqual(await evaluate('[...document.querySelectorAll(".comparison-pane canvas")].map(canvas => canvas.dataset.uid)'), [otherUID, otherUID]);
      await evaluate('document.querySelector("#cards .card footer button").click()');
      await until(`document.getElementById('comparison-pair').dataset.uid === ${JSON.stringify(firstUID)}`);
      assert.equal(await evaluate('document.activeElement.id'), 'compare-b');
      assert.equal(await evaluate('document.querySelectorAll("header nav a").length'), 4);
      const machine = catalog.entries.find(row => row.uid === firstUID && row.family === 'metalgear');
      const beforeHeight = await evaluate('document.getElementById("compare-b-canvas").dataset.displayHeight');
      await evaluate(`document.getElementById('compare-b').value=${JSON.stringify(machine.id)};document.getElementById('compare-b').dispatchEvent(new Event('change'));`);
      await until(`document.getElementById('compare-b-canvas').dataset.rowId === ${JSON.stringify(machine.id)}`);
      assert.equal(await evaluate('document.getElementById("compare-b-canvas").dataset.displayHeight'), beforeHeight);
      if (process.env.CQC_DOSSIERS_SCREENSHOT) {
        const screenshot = await call('Page.captureScreenshot', {format: 'png'});
        await fs.writeFile(process.env.CQC_DOSSIERS_SCREENSHOT, Buffer.from(screenshot.data, 'base64'));
      }
      await call('Emulation.setDeviceMetricsOverride', {width: 760, height: 1000, deviceScaleFactor: 1, mobile: false});
      assert.equal(await evaluate('document.getElementById("compare-a-canvas").getBoundingClientRect().top === document.getElementById("compare-b-canvas").getBoundingClientRect().top'), true);
      await call('Emulation.setDeviceMetricsOverride', {width: 390, height: 844, deviceScaleFactor: 1, mobile: true});
      assert.equal(await evaluate('document.documentElement.scrollWidth <= innerWidth'), true);
      assert.deepEqual(await evaluate('[...document.querySelectorAll(".comparison-pane canvas")].map(canvas => canvas.dataset.floorY)'), ['484', '484']);
      if (process.env.CQC_DOSSIERS_MOBILE_SCREENSHOT) {
        await choose(otherUID);
        const otherMachine = catalog.entries.find(row => row.uid === otherUID && row.family === 'metalgear');
        await evaluate(`document.getElementById('compare-b').value=${JSON.stringify(otherMachine.id)};document.getElementById('compare-b').dispatchEvent(new Event('change'));`);
        await until(`document.getElementById('compare-b-canvas').dataset.rowId === ${JSON.stringify(otherMachine.id)}`);
        const clip = await evaluate('(()=>{const r=document.getElementById("comparison-pair").getBoundingClientRect();return{x:r.x+scrollX,y:r.y+scrollY,width:r.width,height:r.height,scale:1}})()');
        const screenshot = await call('Page.captureScreenshot', {format: 'png', captureBeyondViewport: true, clip});
        await fs.writeFile(process.env.CQC_DOSSIERS_MOBILE_SCREENSHOT, Buffer.from(screenshot.data, 'base64'));
      }
      await evaluate('document.getElementById("search").value="Pequod";document.getElementById("search").dispatchEvent(new Event("input"));document.getElementById("collection").value="tuxedo";document.getElementById("collection").dispatchEvent(new Event("change"));');
      assert.equal(await evaluate('[...document.querySelectorAll("#cards .card")].filter(card => !card.hidden).length'), 1);
      assert.deepEqual(exceptions, []);
    } finally { ws.close(); await fetch(endpoint + '/json/close/' + target.id); }
  });
