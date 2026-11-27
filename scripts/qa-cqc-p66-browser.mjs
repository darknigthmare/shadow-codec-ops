// Run against the actual static CQC Atlas and actual PNGs, with no mocked responses.
// Optional environment: CQC_PLAYWRIGHT_PATH, CQC_CHROMIUM_EXECUTABLE.
import assert from 'node:assert/strict';
import {readFile, mkdir, writeFile} from 'node:fs/promises';
import {createServer} from 'node:http';
import {resolve, extname, sep} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = resolve(process.argv[2] || fileURLToPath(new URL('..', import.meta.url)));
const out = resolve(root, 'docs/cqc-reprise/pass66/browser');
const publicRoot = resolve(root, 'public');
const delivery = JSON.parse(await readFile(resolve(root, 'docs/cqc-reprise/pass66/delivery-manifest.json')));
const catalog = JSON.parse(await readFile(resolve(root, 'public/cqc/data/cqc-p63-source-atlas.json')));
assert.ok(delivery.assets.length > 0, 'P66 requires selected sources');
await mkdir(out, {recursive:true});
const {chromium} = await import(process.env.CQC_PLAYWRIGHT_PATH || 'playwright');
const mime = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.png':'image/png'};
const requests = [], pageErrors = [];
const server = createServer(async (req,res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    if (url.pathname === '/favicon.ico') { res.writeHead(204);res.end();return; }
    let pathname = decodeURIComponent(url.pathname);
    if (pathname.endsWith('/')) pathname += 'index.html';
    const name = resolve(publicRoot, '.' + pathname);
    if (!name.startsWith(publicRoot + sep)) {res.writeHead(403);res.end();return;}
    const bytes = await readFile(name);
    requests.push({path:url.pathname,status:200,bytes:bytes.length});
    res.writeHead(200, {'Content-Type':mime[extname(name)] || 'application/octet-stream', 'Cache-Control':'no-store'});
    res.end(bytes);
  } catch(error) { requests.push({path:req.url,status:404,error:error.code || String(error)});res.writeHead(404);res.end('Not found'); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const origin = 'http://127.0.0.1:' + server.address().port;
const moduleURL = origin + '/cqc/modules/source-atlas-v063.html';
let browser;
try {
  browser = await chromium.launch({headless:true, executablePath:process.env.CQC_CHROMIUM_EXECUTABLE || undefined, args:['--no-sandbox','--disable-dev-shm-usage']});
  const page = await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
  page.on('pageerror', error => pageErrors.push(String(error)));
  await page.goto(moduleURL, {waitUntil:'networkidle'});
  await page.waitForFunction(() => !document.querySelector('#atlas-status').textContent.includes('Chargement'));
  assert.equal(await page.locator('#atlas-grid .asset-card').count(), catalog.assets.length);
  const decoded = await page.evaluate(async rows => {
    const results = [];
    for (const row of rows) {
      const image = new Image();image.src = row.path;
      try { await image.decode(); results.push({id:row.id,width:image.naturalWidth,height:image.naturalHeight,ok:image.naturalWidth===row.width&&image.naturalHeight===row.height}); }
      catch(error) { results.push({id:row.id,ok:false,error:String(error)}); }
    }
    return results;
  }, catalog.assets);
  assert.ok(decoded.every(row=>row.ok), 'Every catalogue PNG must decode at its native dimensions');
  await page.screenshot({path:resolve(out,'atlas-desktop.png'),fullPage:false});
  const cases = [];
  for (const row of delivery.assets) {
    await page.locator('#atlas-episode').selectOption('all');
    await page.locator('#atlas-kind').selectOption('all');
    await page.locator('#atlas-search').fill(row.label);
    const card = page.locator('[data-asset-id="' + row.id + '"]');
    await card.click();
    await page.waitForFunction(id => document.querySelector('[data-asset-id="'+id+'"]')?.getAttribute('aria-pressed') === 'true',row.id);
    await page.locator('#atlas-detail .detail-image img').evaluate(image => image.decode());
    assert.equal(await page.locator('#atlas-detail h2').textContent(), row.label);
    const image = await page.locator('#atlas-detail .detail-image img').evaluate(n=>({width:n.naturalWidth,height:n.naturalHeight,src:n.getAttribute('src')}));
    assert.deepEqual(image, {width:row.width,height:row.height,src:'../'+row.path.slice('public/cqc/'.length)});
    assert.equal(await page.locator('#atlas-detail .detail-links a').nth(1).getAttribute('href'),row.bibleURL);
    assert.equal(new URL(page.url()).searchParams.get('asset'),row.id);
    assert.equal(await page.locator('#atlas-detail .reference-links a').count(),new Set(row.referenceURLs).size);
    await page.screenshot({path:resolve(out,row.id+'-desktop.png'),fullPage:true});
    cases.push({id:row.id,detailTitle:true,imageDecoded:true,image,deepLink:true,bibleLink:true,referenceLinks:true});
  }
  await page.locator('#atlas-search').fill('P66 aucun dossier introuvable 260011');
  assert.equal(await page.locator('#atlas-grid .asset-card').count(),0);
  assert.ok(await page.locator('#atlas-empty').isVisible());
  assert.ok(await page.locator('#atlas-detail').isHidden());
  await page.locator('.filter-reset').click();
  assert.equal(await page.locator('#atlas-grid .asset-card').count(),catalog.assets.length);
  for (const episode of ['acid','acid2','survive','mgr']) {
    await page.locator('#atlas-episode').selectOption(episode);
    const expected=catalog.assets.filter(row=>row.episodeKey===episode).length;
    assert.equal(await page.locator('#atlas-grid .asset-card').count(),expected);
  }
  const mobile = await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true});
  mobile.on('pageerror', error => pageErrors.push(String(error)));
  const first=delivery.assets[0];
  await mobile.goto(moduleURL+'?q='+encodeURIComponent(first.label)+'&asset='+first.id,{waitUntil:'networkidle'});
  await mobile.locator('[data-asset-id="'+first.id+'"]').tap();
  await mobile.locator('#atlas-detail .detail-image img').evaluate(image=>image.decode());
  const mobileGeometry = await mobile.evaluate(()=>({viewport:innerWidth,document:document.documentElement.scrollWidth}));
  assert.ok(mobileGeometry.document <= mobileGeometry.viewport+1,'Mobile view must not scroll horizontally');
  await mobile.screenshot({path:resolve(out,'atlas-mobile.png'),fullPage:true});
  assert.deepEqual(pageErrors,[],'No browser JavaScript errors');
  assert.ok(requests.every(row=>row.status===200),'No missing static resources during this Atlas traversal');
  const proof = {
    schema:'cqc.p66.browser-verification.v1',status:'passed',checkedAt:new Date().toISOString(),
    browser:browser.version(),executable:process.env.CQC_CHROMIUM_EXECUTABLE || 'Playwright-managed Chromium',
    route:'/cqc/modules/source-atlas-v063.html',viewports:[{width:1440,height:1000},{width:390,height:844}],
    catalogueSources:catalog.assets.length,decodedPNGs:decoded.length,newSourceCases:cases,
    checks:{allImagesDecode:true,newDossiersAndDeepLinks:true,newBibleAndReferenceLinks:true,emptyStateAndReset:true,fourEpisodeFilters:true,mobileNoHorizontalOverflow:true,zeroJavaScriptErrors:true,zeroMissingRequests:true},
    mobileGeometry,decoded,requests:requests.length,screenshots:['atlas-desktop.png',...delivery.assets.map(row=>row.id+'-desktop.png'),'atlas-mobile.png'],
    limits:['Local standalone Atlas traversal; no deployed Vercel build or combat admission is claimed.','The entire game and embedded Shadow Ops host were not executed.','Successful decoding and UI behavior do not establish absolute visual 1:1 fidelity.']
  };
  await writeFile(resolve(out,'verification.json'),JSON.stringify(proof,null,2)+'\n');
  console.log(JSON.stringify({status:proof.status,catalogueSources:proof.catalogueSources,decodedPNGs:proof.decodedPNGs,newSourceCases:cases.length,screenshots:proof.screenshots.length,browser:proof.browser}));
} finally {
  if(browser)await browser.close();
  await new Promise(resolve=>server.close(resolve));
}
