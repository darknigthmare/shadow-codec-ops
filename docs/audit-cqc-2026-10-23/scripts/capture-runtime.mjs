/** Read-only data capture. Image substitutions are NOT visual/gameplay validation. */
import fs from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const repository = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const output = path.resolve(process.argv[2] || '/tmp/cqc-audit-capture');
const git = args => execFileSync('git', args, {cwd:repository, encoding:'utf8'}).trim();
const sourceCommit = 'ba4e30a09e9e95727b75a665e7b6ab07d9941aea';
const checkoutCommit = git(['rev-parse', 'HEAD']);
const referenceRuntimeTree = git(['rev-parse', `${sourceCommit}:public/cqc`]);
const checkoutRuntimeTree = git(['rev-parse', 'HEAD:public/cqc']);
if (referenceRuntimeTree !== checkoutRuntimeTree || git(['diff', '--name-only', '--no-renames', 'HEAD', '--', 'public/cqc'])) {
  throw new Error('Le runtime diffère de P41. Créer un audit pour cette version et actualiser explicitement sa référence.');
}
const publicRoot = path.join(repository,'public');
const mime = {'.js':'application/javascript','.html':'text/html','.css':'text/css','.json':'application/json'};
const server = http.createServer(async(req,res)=>{
  try {
    const relative = decodeURIComponent(new URL(req.url,'http://localhost').pathname).replace(/^\/+/, '');
    const target = path.resolve(publicRoot,relative);
    if(!target.startsWith(publicRoot+path.sep)) throw Error('Out-of-root path');
    const bytes = await fs.readFile(target);
    res.writeHead(200,{'content-type':mime[path.extname(target)]||'application/octet-stream'});res.end(bytes);
  } catch {res.writeHead(404);res.end('Not found');}
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const {chromium} = await import(process.env.CQC_PLAYWRIGHT_MODULE || 'playwright');
let browser;
try {
  browser = await chromium.launch({headless:true,...(process.env.CQC_CHROMIUM_EXECUTABLE?{executablePath:process.env.CQC_CHROMIUM_EXECUTABLE}:{}),args:['--no-sandbox','--disable-dev-shm-usage']});
  const page=await browser.newPage({viewport:{width:1440,height:1000}});
  const errors=[];page.on('pageerror',error=>errors.push(String(error)));
  const placeholder=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/eXcAAAAASUVORK5CYII=','base64');
  await page.route('**/*',route=>{
    const url=route.request().url();
    if(/\.(png|webp|jpe?g|gif|ogg|mp3|wav)(\?|$)/i.test(url)) return route.fulfill({status:200,contentType:'image/png',body:placeholder});
    if(url.startsWith(origin+'/')) return route.continue();
    return route.abort();
  });
  await page.goto(origin+'/cqc/modules/unified-versus-v055.html',{waitUntil:'load',timeout:120000});
  await page.waitForFunction(()=>!!window.__CQC055Versus?.fighters?.length);
  const snapshot=await page.evaluate(()=>{
    const v=window.__CQC055Versus;
    return JSON.parse(JSON.stringify({
      fighters:v.fighters,stages:v.stages,finishers:v.finishers,
      wardrobeIndex:window.CQC_NATIVE_WARDROBE_INDEX,
      costumeOptions:Object.fromEntries(Object.entries(window.CQC_COMBAT_COSTUME_CATALOG.entries).map(([uid,e])=>[uid,{...e,options:e.options.map(o=>{const{sprite,...rest}=o;return{...rest,spriteSummary:sprite?{uid:sprite.uid,coverage:sprite.coverage,actions:Object.keys(sprite.actions||{}),oppositeActions:Object.keys(sprite.oppositeActions||{}),mirror:sprite.mirror,limits:sprite.limits,costumeConcept:sprite.costumeConcept}:null};})}])),
      wardrobeAvailability:Object.fromEntries(v.fighters.map(f=>[f.uid,window.CQC_NATIVE_WARDROBE.availableFor(f.uid)])),
      costumeRequests:window.CQC_PASS19_COSTUMES.report(),
      wardrobePolicy:window.CQC_PASS21_WARDROBE_POLICY.report(),wardrobePlan:window.CQC_PASS21_WARDROBE_POLICY.plan(),
      machineStatus:window.CQC_PASS18_MACHINES.status(),machineData:window.CQC_PASS18_MACHINE_DATA,machineCatalog:window.CQC_MACHINE_PARTS_CATALOG,
      stageDefinitions:window.CQC_STAGE_LAYER_DATA,stageRegistry:{counts:window.CQC_STAGE_REGISTRY.counts(),titles:window.CQC_STAGE_REGISTRY.titles},
      rosterResult:window.CQC_PASS19_ROSTER_RESULT,presentation:window.CQC_PASS18_ROSTER_PRESENTATION.records,
      profiles:window.CQC_PASS19_ROSTER_ADDITIONS.registry,fenrir:window.CQC_PASS40_FENRIR_ADMISSION,
    }));
  });
  const routing=await page.evaluate(()=>window.__CQC055Versus.fighters.map(f=>{
    const api=window.CQC_COMBAT_SPRITES,entry=api.getEntry(f.uid,f),out={uid:f.uid,name:f.name,entryExists:!!entry,machine:window.CQC_PASS18_MACHINES.has(f.uid),moves:{}};
    if(entry){
      Object.assign(out,{entryUID:entry.uid,actionMap:entry.actionMap,mirror:entry.mirror,coverage:entry.coverage,limits:entry.limits});
      const summarize=set=>Object.fromEntries(Object.entries(set||{}).map(([key,a])=>[key,{frameCount:a.frames?.length||0,frames:(a.frames||[]).map(x=>({file:x.file,rect:x.rect,sha256:x.sha256,duration:x.duration})),loop:a.loop,speed:a.speed}]));
      out.actions=summarize(entry.actions);out.oppositeActions=summarize(entry.oppositeActions);
      for(const[slot,m]of Object.entries(f.combat?.moves||{}))out.moves[slot]={name:m.name,action:api.actionName({moveSlot:slot,moveKind:m.kind,moveTag:m.tag,animationActive:true,attack:true},entry)};
    }return out;
  }));
  const receipt={sourceCommit,checkoutCommit,runtimeTree:referenceRuntimeTree,method:'Chromium local; scripts réels dans leur ordre HTML; images remplacées par un pixel; accès externes bloqués',visualValidation:false,combatValidation:false,pageErrors:errors,fighterCount:snapshot.fighters.length,stageCount:snapshot.stages.length,wardrobeDescriptorCount:snapshot.wardrobeIndex.entries.length,machineRigCount:snapshot.machineStatus.machines.length,staticPoseEntries:routing.filter(x=>x.entryExists).length,machineRoutedProfiles:routing.filter(x=>x.machine).length};
  await fs.mkdir(output,{recursive:true});
  for(const[name,data]of Object.entries({'runtime-detailed.json':snapshot,'sprite-routing.json':routing,'capture-receipt.json':receipt}))await fs.writeFile(path.join(output,name),JSON.stringify(data,null,2)+'\n');
  console.log(JSON.stringify(receipt,null,2));
} finally {await browser?.close();await new Promise(resolve=>server.close(resolve));}
