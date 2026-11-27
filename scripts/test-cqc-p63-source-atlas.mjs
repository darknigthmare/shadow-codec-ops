import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = fs.readFileSync(path.join(root,'public/cqc/src/cqc-p63-source-atlas.js'),'utf8');
const context = {module:{exports:{}},URL,URLSearchParams};
vm.runInNewContext(source,context,{filename:'cqc-p63-source-atlas.js'});
const api = context.module.exports;
const plain = value => JSON.parse(JSON.stringify(value));
const asset = (id,episode,label,extra={}) => ({id,episode,label,kind:'stage',path:`../assets/p63/${id}.png`,sourceGenerated:true,combatReady:false,...extra});
const catalog = {assets:[asset('forest','Metal Gear AC!D (PSP)','Forêt de Lobito'),asset('research','Metal Gear AC!D 2 (PSP)','Secteur expérimental'),asset('marshal','Metal Gear Rising: Revengeance','World Marshal'),asset('dite','Metal Gear Survive','Dite')]};

test('AC!D and AC!D 2 remain distinct, and all four titles resolve',() => {
  assert.deepEqual(plain(api.normalizeCatalog(catalog).map(row=>row.episode)),['acid','acid2','mgr','survive']);
  assert.equal(api.episodeKey('METAL GEAR ACID2'),'acid2');
  assert.equal(api.episodeKey('Metal Gear Solid 3'),null);
});
test('paths stay within local asset PNGs; traversal and external image URLs are refused',() => {
  assert.equal(api.assetPath('public/cqc/assets/p63/dite.png'),'../assets/p63/dite.png');
  assert.equal(api.assetPath('assets/p61/old-scene.png'),'../assets/p61/old-scene.png');
  for (const value of ['../../secret.png','assets/../secret.png','../assets/%2e%2e/secret.png','https://example.com/a.png','assets/test.svg','/assets/p63/a.png','assets//a.png']) assert.equal(api.assetPath(value),null,value);
});
test('a duplicate identity, unknown title, bad path or combat claim blocks catalog admission',() => {
  assert.throws(()=>api.normalizeCatalog({assets:[catalog.assets[0],catalog.assets[0]]}));
  assert.throws(()=>api.normalizeCatalog({assets:[asset('x','Metal Gear Solid 3','X')]}));
  assert.throws(()=>api.normalizeCatalog({assets:[asset('x','Survive','X',{path:'../private.png'})]}));
  assert.throws(()=>api.normalizeCatalog({assets:[asset('x','Survive','X',{combatReady:true})]}));
  assert.throws(()=>api.normalizeCatalog(null));
});
test('unselected or unavailable sources do not inflate the atlas',() => {
  const rows=api.normalizeCatalog({assets:[...catalog.assets,asset('rejected','Survive','Rejected',{selected:false}),asset('missing','Survive','Missing',{sourceGenerated:false})]});
  assert.equal(rows.length,4);
  assert.ok(rows.every(row=>row.combatReady===false&&row.atlasIntegrated===true));
});
test('search ignores accents and title filtering cannot mix Acid editions',() => {
  const rows=api.normalizeCatalog(catalog);
  assert.deepEqual(plain(api.filterAssets(rows,{episode:'all',kind:'all',query:'foret'}).map(row=>row.id)),['forest']);
  assert.deepEqual(plain(api.filterAssets(rows,{episode:'acid2',kind:'all',query:''}).map(row=>row.id)),['research']);
  assert.equal(api.filterAssets(rows,{episode:'mgr',kind:'character',query:''}).length,0);
});
test('selection follows the visible subset, including an empty result',() => {
  const rows=api.normalizeCatalog(catalog);
  const visible=api.filterAssets(rows,{episode:'acid2',kind:'all',query:''});
  assert.equal(api.selectedAsset(visible,'forest').id,'research');
  assert.equal(api.selectedAsset([],'forest'),null);
});
test('query restoration validates filters and serializes a stable deep link',() => {
  assert.deepEqual(plain(api.readState('?episode=acid2&kind=stage&asset=research&q=For%C3%AAt')),{episode:'acid2',kind:'stage',query:'Forêt',asset:'research'});
  assert.deepEqual(plain(api.readState('?episode=evil&kind=html&asset=../../index')),{episode:'all',kind:'all',query:'',asset:null});
  const url=new URL(api.stateURL({episode:'acid2',kind:'all',query:'',asset:'research'},'https://example.test/cqc/modules/source-atlas-v063.html?q=old&kind=stage'));
  assert.equal(url.pathname,'/cqc/modules/source-atlas-v063.html');
  assert.equal(url.searchParams.get('asset'),'research');assert.equal(url.searchParams.has('q'),false);assert.equal(url.searchParams.has('kind'),false);
});
test('external reference links reject executable URLs and credentials',() => {
  assert.equal(api.referenceURL('javascript:alert(1)'),null);
  assert.equal(api.referenceURL('https://name:secret@example.com'),null);
  assert.equal(api.referenceURL('https://www.konami.com/mg/'),'https://www.konami.com/mg/');
});
test('shell provides atlas routes in Extras and Chroniques with separate selected-asset validation',() => {
  const shell=fs.readFileSync(path.join(root,'public/cqc/index.html'),'utf8');
  assert.ok(shell.includes("atlas63:'modules/source-atlas-v063.html'"));
  assert.ok(shell.includes('data-extra="atlas63"'));
  assert.ok(shell.includes("story:['atlas63','chronicles56'"));
  assert.ok(shell.includes("atlas63:['asset','episode','kind']"));
  assert.ok(shell.includes("field==='asset'?/^[a-z0-9][a-z0-9_-]*$/"));
  assert.equal(context.CQC_STAGE_LAYER_DATA,undefined);
  assert.equal(context.CQC_STAGE_REGISTRY,undefined);
});

// Minimal DOM host tests exercise the real asynchronous mount and input handlers.
// They do not qualify CSS layout, image decoding or browser rendering.
function domHost(fetcher) {
  class Element {
    constructor(tag='div') { this.tagName=tag;this.children=[];this.dataset={};this.attributes={};this.events={};this.hidden=false;this.value='';this.text='';this.classes=new Set();this.classList={add:(...x)=>x.forEach(v=>this.classes.add(v)),remove:(...x)=>x.forEach(v=>this.classes.delete(v))}; }
    set textContent(value) {this.text=String(value);this.children=[];}
    get textContent() {return this.text+this.children.map(x=>x.textContent).join('');}
    append(...nodes) {for(const n of nodes){n.parent=this;this.children.push(n);}}
    replaceChildren(...nodes) {this.children=[];this.text='';this.append(...nodes);}
    remove() {if(this.parent)this.parent.children=this.parent.children.filter(x=>x!==this);}
    setAttribute(k,v) {this.attributes[k]=v;}
    addEventListener(k,fn) {(this.events[k]??=[]).push(fn);}
    dispatch(k,event={}) {for(const fn of this.events[k]||[])fn({preventDefault(){},...event});}
    querySelectorAll(selector) {const out=[];for(const c of this.children){if(selector==='[data-asset-id]'&&c.dataset.assetId)out.push(c);out.push(...c.querySelectorAll(selector));}return out;}
  }
  const ids=['atlas-grid','atlas-detail','atlas-status','atlas-episode','atlas-kind','atlas-search','atlas-filters','atlas-retry','atlas-empty'];
  const nodes=Object.fromEntries(ids.map(id=>[id,new Element()]));
  const events={};
  const document={getElementById:id=>nodes[id],createElement:tag=>new Element(tag),addEventListener(k,fn){(events[k]??=[]).push(fn);},dispatch(k,event){for(const fn of events[k]||[])fn(event);}};
  const host={document,fetch:fetcher,AbortController,addEventListener(){},matchMedia:()=>({matches:false}),location:{href:'https://example.test/cqc/modules/source-atlas-v063.html',search:'',origin:'https://example.test'}};
  host.history={replaceState(_a,_b,url){host.location.href=url;host.location.search=new URL(url).search;}};host.parent=host;
  return {host,nodes};
}
const flush=()=>new Promise(resolve=>setImmediate(resolve));
test('failed loading exposes retry and a successful retry renders the catalog',async() => {
  let requests=0;
  const {host,nodes}=domHost(async()=>++requests===1?{ok:false}:{ok:true,json:async()=>catalog});
  const controller=api.mount(host);await flush();
  assert.equal(nodes['atlas-retry'].hidden,false);assert.equal(nodes['atlas-grid'].children.length,0);
  assert.match(nodes['atlas-status'].textContent,/indisponible/);
  await controller.reload();
  assert.equal(nodes['atlas-retry'].hidden,true);assert.equal(nodes['atlas-grid'].children.length,4);
  assert.equal(controller.counts().total,4);assert.equal(controller.state().asset,'forest');
});
test('an older pending response cannot replace the newer catalog',async() => {
  let resolveOld,requests=0;
  const {host,nodes}=domHost(()=>++requests===1?new Promise(resolve=>{resolveOld=resolve;}):Promise.resolve({ok:true,json:async()=>({assets:[catalog.assets[2]]})}));
  const controller=api.mount(host);await controller.reload();
  resolveOld({ok:true,json:async()=>catalog});await flush();
  assert.equal(controller.counts().total,1);assert.equal(controller.state().asset,'marshal');
  assert.equal(nodes['atlas-grid'].children.length,1);
});
test('an image failure exposes retry after a successful catalog load',async() => {
  const {host,nodes}=domHost(async()=>({ok:true,json:async()=>catalog}));
  const controller=api.mount(host);await flush();
  const image=nodes['atlas-grid'].children[0].children[0].children[0];
  assert.equal(nodes['atlas-retry'].hidden,true);
  image.dispatch('error');
  assert.equal(image.hidden,true);assert.equal(nodes['atlas-retry'].hidden,false);
  await controller.reload();
  assert.equal(nodes['atlas-retry'].hidden,true);assert.equal(controller.counts().total,4);
});
test('mounted control changes and reset update the visible selected dossier',async() => {
  const {host,nodes}=domHost(async()=>({ok:true,json:async()=>catalog}));
  const controller=api.mount(host);await flush();
  nodes['atlas-episode'].value='acid2';nodes['atlas-episode'].dispatch('change');
  assert.equal(controller.counts().visible,1);assert.equal(controller.state().asset,'research');
  nodes['atlas-kind'].value='character';nodes['atlas-kind'].dispatch('change');
  assert.equal(nodes['atlas-detail'].hidden,true);assert.equal(nodes['atlas-empty'].hidden,false);
  nodes['atlas-filters'].dispatch('reset');
  assert.equal(controller.counts().visible,4);assert.equal(controller.state().asset,'forest');
});
test('embedded navigation returns to the existing shell without nesting a second shell',async() => {
  const {host}=domHost(async()=>({ok:true,json:async()=>catalog}));const sent=[];
  host.parent={postMessage:(data,origin)=>sent.push({data,origin})};api.mount(host);await flush();
  let prevented=0;
  const click=href=>host.document.dispatch('click',{button:0,target:{closest:()=>({href,target:''})},preventDefault(){prevented++;}});
  click('https://example.test/cqc/index.html?module=mgr');
  assert.equal(prevented,1);assert.equal(sent[0].data.module,'mgr');assert.equal(sent[0].origin,'https://example.test');
  click('https://example.test/cqc/index.html');assert.equal(sent[1].data.type,'cqc-admin-close');
  click('https://evil.test/cqc/index.html?module=mgr');assert.equal(sent.length,2);
  click('https://example.test/cqc/index.html?module=unknown');assert.equal(sent.length,2);
});
