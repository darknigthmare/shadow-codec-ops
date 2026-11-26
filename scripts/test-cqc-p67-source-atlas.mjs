import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const context = {module:{exports:{}},URL,URLSearchParams};
vm.runInNewContext(fs.readFileSync(path.join(root,'public/cqc/src/cqc-p63-source-atlas.js'),'utf8'),context);
const api = context.module.exports;
const plain = value => JSON.parse(JSON.stringify(value));
const asset = (id,episodeKey,label,extra={}) => ({
  id,episodeKey,label,episode:'Édition qualifiée dans le dossier',kind:'character',
  path:'../assets/p67/' + id + '.png',selected:true,sourceGenerated:true,
  runtimeIntegrated:false,combatRuntimeIntegrated:false,combatReady:false,absolute1to1Certified:false,
  workIds:[],scope:'Variante partielle ; groupe non clos',...extra
});
const catalog = {assets:[
  asset('msx-guard','mg_msx','Garde d’Outer Heaven',{workIds:['character:R-MG1-03']}),
  asset('nes-guard','mg_nes','Garde d’Outer Heaven',{workIds:['character:R-MG1-03']}),
  asset('ps2-scientist','mgs3','Scientifique de Groznyj Grad'),
  asset('delta-scientist','delta','Scientifique de Groznyj Grad'),
  asset('mpo-recruit','mpo','Recrue soviétique'),
  asset('plus-recruit','mpo_plus','Recrue soviétique'),
  asset('acid-guard','acid','Garde de Genetics'),
  asset('acid-mobile-guard','acid_mobile','Garde de l’édition mobile'),
  asset('acid2-mobile-guard','acid2_mobile','Garde de l’édition mobile'),
  asset('mgo3-preset','mgo3','Éclaireur — preset observé',{scope:'Portrait du preset visible ; équipement complet non établi'}),
  asset('pw-sandinista','pw','Guérillero sandiniste',{workIds:['character:R-PW-FSLN']}),
  asset('tpp-doctor','tpp','Médecin de l’hôpital',{workIds:['character:R-TPP-doctor']})
]};

test('explicit edition keys keep visually similar incarnations separate',() => {
  const rows=api.normalizeCatalog(catalog);
  for (const [episode,id] of [['mg_msx','msx-guard'],['mg_nes','nes-guard'],['mgs3','ps2-scientist'],['delta','delta-scientist'],['mpo','mpo-recruit'],['mpo_plus','plus-recruit'],['acid','acid-guard'],['acid_mobile','acid-mobile-guard'],['acid2_mobile','acid2-mobile-guard']]) {
    assert.deepEqual(plain(api.filterAssets(rows,{episode,kind:'character',query:''}).map(row=>row.id)),[id]);
  }
});

test('ambiguous labels and malformed explicit keys cannot fall back to another edition',() => {
  for (const label of ['AC!D Mobile','Metal Gear AC!D Mobile','AC!D 2 Mobile','Metal Gear AC!D 2 Mobile','MGS Rising — projet initial','Metal Gear Rising','Metal Gear Solid 3']) {
    const row={...catalog.assets[0],episode:label};delete row.episodeKey;
    assert.equal(api.episodeKey(label),null,label);
    assert.throws(()=>api.normalizeCatalog({assets:[row]}),/identité ou une image invalide/,label);
  }
  for (const episodeKey of ['acid_mobile_typo','rising_original_unknown','',null,42]) {
    assert.throws(()=>api.normalizeCatalog({assets:[{...catalog.assets[0],episodeKey,episode:'Metal Gear AC!D (PSP)'}]}));
  }
  assert.equal(api.normalizeCatalog({assets:[asset('prototype','rising_proto','Projet initial')]} )[0].episode,'rising_proto');
});

test('search covers canonical edition labels, accents and exact historical work IDs',() => {
  const rows=api.normalizeCatalog(catalog);
  const find=query=>plain(api.filterAssets(rows,{episode:'all',kind:'all',query}).map(row=>row.id));
  assert.deepEqual(find('portable ops plus'),['plus-recruit']);
  assert.deepEqual(find('Metal Gear — NES'),['nes-guard']);
  assert.deepEqual(find('eclaireur'),['mgo3-preset']);
  assert.deepEqual(find('character:R-PW-FSLN'),['pw-sandinista']);
  assert.equal(api.filterAssets(rows,{episode:'mg_msx',kind:'character',query:'NES'}).length,0);
});

test('new edition filters round-trip through deep links without losing unrelated route state',() => {
  const state=api.readState('?episode=mpo_plus&kind=character&asset=plus-recruit&q=sovi%C3%A9tique');
  assert.deepEqual(plain(state),{episode:'mpo_plus',kind:'character',asset:'plus-recruit',query:'soviétique'});
  const url=new URL(api.stateURL(state,'https://example.test/cqc/modules/source-atlas-v063.html?embed=1'));
  assert.equal(url.searchParams.get('episode'),'mpo_plus');
  assert.equal(url.searchParams.get('embed'),'1');
  assert.deepEqual(plain(api.readState(url.search)),plain(state));
  assert.equal(api.readState('?episode=mpo_plus_typo').episode,'all');
});

test('the 48 historical dossiers retain their pre-P67 normalized data exactly',() => {
  const all=JSON.parse(fs.readFileSync(path.join(root,'public/cqc/data/cqc-p63-source-atlas.json')));
  assert.ok(all.assets.length>=48);
  const normalized=api.normalizeCatalog({assets:all.assets.slice(0,48)});
  assert.equal(normalized.length,48);
  const digest=createHash('sha256').update(JSON.stringify(normalized)).digest('hex');
  assert.equal(digest,'af6948b68f48576e4f67f8ad77df1f6282dd131c1b63e9655090fcd05f0649ad');
});

// This host exercises real mount handlers, including select option validity.
// It does not qualify browser layout, PNG decoding or CSS.
function domHost(search='') {
  class Element {
    constructor(tag='div') {
      this.tagName=tag;this.children=[];this.dataset={};this.attributes={};this.events={};
      this.hidden=false;this._value='';this.text='';this.classes=new Set();
      this.classList={add:(...v)=>v.forEach(x=>this.classes.add(x)),remove:(...v)=>v.forEach(x=>this.classes.delete(x))};
    }
    set value(value) {
      const text=String(value);
      this._value=this.tagName==='select'&&!this.children.some(child=>child.value===text)?'':text;
    }
    get value() {return this._value;}
    set textContent(value) {this.text=String(value);this.children=[];}
    get textContent() {return this.text+this.children.map(x=>x.textContent).join('');}
    append(...nodes) {for(const n of nodes){n.parent=this;this.children.push(n);}}
    replaceChildren(...nodes) {this.children=[];this.text='';this.append(...nodes);}
    remove() {if(this.parent)this.parent.children=this.parent.children.filter(x=>x!==this);}
    setAttribute(k,v) {this.attributes[k]=v;}
    addEventListener(k,fn) {(this.events[k]??=[]).push(fn);}
    dispatch(k,event={}) {for(const fn of this.events[k]||[])fn({preventDefault(){},...event});}
    querySelectorAll(selector) {
      const out=[];
      for(const c of this.children){
        if((selector==='[data-asset-id]'&&c.dataset.assetId)||c.tagName===selector)out.push(c);
        out.push(...c.querySelectorAll(selector));
      }
      return out;
    }
  }
  const ids=['atlas-grid','atlas-detail','atlas-status','atlas-episode','atlas-kind','atlas-search','atlas-filters','atlas-retry','atlas-empty'];
  const nodes=Object.fromEntries(ids.map(id=>[id,new Element(['atlas-episode','atlas-kind'].includes(id)?'select':'div')]));
  const markup=fs.readFileSync(path.join(root,'public/cqc/modules/source-atlas-v063.html'),'utf8');
  for(const id of ['atlas-episode','atlas-kind']) {
    const select=markup.match(new RegExp('<select id="'+id+'"[^>]*>([\\s\\S]*?)</select>'))[1];
    for(const match of select.matchAll(/<option value="([^"]+)">([^<]+)<\/option>/g)) {
      const option=new Element('option');option.value=match[1];option.textContent=match[2];nodes[id].append(option);
    }
    nodes[id].value='all';
  }
  const events={},hostEvents={},sent=[];
  const document={getElementById:id=>nodes[id],createElement:tag=>new Element(tag),
    addEventListener(k,fn){(events[k]??=[]).push(fn);},
    dispatch(k,event){for(const fn of events[k]||[])fn(event);}};
  const base='https://example.test/cqc/modules/source-atlas-v063.html';
  const host={document,fetch:async()=>({ok:true,json:async()=>catalog}),AbortController,
    matchMedia:()=>({matches:false}),location:{href:base+search,search,origin:'https://example.test'},
    addEventListener(k,fn){(hostEvents[k]??=[]).push(fn);},
    dispatch(k){for(const fn of hostEvents[k]||[])fn();}};
  host.history={replaceState(_a,_b,url){host.location.href=url;host.location.search=new URL(url).search;}};
  host.parent={postMessage:(data,origin)=>sent.push({data,origin})};
  return {host,nodes,sent};
}
const flush=()=>new Promise(resolve=>setImmediate(resolve));

test('real filters expose each edition once and select its actual dossier',async() => {
  const {host,nodes}=domHost('?episode=mpo_plus&kind=character&asset=plus-recruit');
  const mounted=api.mount(host);await flush();
  const options=nodes['atlas-episode'].children.map(n=>n.value);
  assert.equal(new Set(options).size,options.length);
  assert.ok(options.includes('mg_msx')&&options.includes('mg_nes')&&options.includes('mpo_plus')&&options.includes('acid2_mobile'));
  assert.equal(mounted.counts().visible,1);assert.equal(mounted.state().asset,'plus-recruit');
  assert.equal(nodes['atlas-episode'].value,'mpo_plus');
  assert.match(nodes['atlas-detail'].textContent,/Portable Ops Plus/);
  nodes['atlas-episode'].value='mg_nes';nodes['atlas-episode'].dispatch('change');
  assert.equal(mounted.counts().visible,1);assert.equal(mounted.state().asset,'nes-guard');
  assert.equal(new URL(host.location.href).searchParams.get('episode'),'mg_nes');
  nodes['atlas-search'].value='introuvable';nodes['atlas-search'].dispatch('input');
  assert.equal(mounted.counts().visible,0);assert.equal(nodes['atlas-detail'].hidden,true);
  nodes['atlas-filters'].dispatch('reset');
  assert.equal(mounted.counts().visible,catalog.assets.length);assert.equal(nodes['atlas-episode'].value,'all');
});

test('new-title dossier navigation reuses the existing archives route in the host shell',async() => {
  const {host,nodes,sent}=domHost('?episode=mgo3&asset=mgo3-preset');
  const mounted=api.mount(host);await flush();
  assert.equal(mounted.state().asset,'mgo3-preset');
  const front=nodes['atlas-detail'].querySelectorAll('a').find(a=>a.textContent==='Archives de mission');
  assert.equal(front.href,'../index.html?module=episodes52');
  let prevented=false;
  host.document.dispatch('click',{button:0,target:{closest:()=>({href:new URL(front.href,host.location.href).href,target:''})},preventDefault(){prevented=true;}});
  assert.equal(prevented,true);assert.equal(sent.length,1);
  assert.deepEqual(plain(sent[0]),{data:{type:'cqc-open-module',module:'episodes52'},origin:'https://example.test'});
  assert.equal(api.frontURL('acid'),'../index.html?module=acid');
  assert.equal(api.frontURL('mgr'),'../index.html?module=mgr');
});

test('browser-history restoration applies a new edition before rendering its selection',async() => {
  const {host,nodes}=domHost();
  const mounted=api.mount(host);await flush();
  host.location.search='?episode=tpp&kind=character&asset=tpp-doctor&q=m%C3%A9decin';
  host.location.href='https://example.test/cqc/modules/source-atlas-v063.html'+host.location.search;
  host.dispatch('popstate');
  assert.equal(nodes['atlas-episode'].value,'tpp');
  assert.equal(mounted.counts().visible,1);
  assert.equal(mounted.state().asset,'tpp-doctor');
  assert.match(nodes['atlas-detail'].textContent,/The Phantom Pain/);
});
