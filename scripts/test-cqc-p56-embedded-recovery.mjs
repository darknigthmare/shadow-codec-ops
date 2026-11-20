import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import test from 'node:test';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const source=fs.readFileSync(path.join(root,'public/cqc/src/cqc-p54-mode-scenes.js'),'utf8');
function adapter(){const scope={console,Date,Promise};scope.window=scope;vm.createContext(scope);vm.runInContext(source,scope);return scope.CQC_P54_MODE_SCENES;}

test('a superseded or cleared host launch cannot accept an old child notification',()=>{
 const link=adapter().createLaunchSequence('academy');
 const first=link.begin();assert(link.accepts({requestId:first}));
 const second=link.begin();assert.notEqual(first,second);
 for(const type of ['cqc-versus-started','cqc-versus-error','cqc-versus-cancelled','cqc-versus-result','cqc-versus-telemetry']){
  assert.equal(link.accepts({type,requestId:first}),false);assert.equal(link.accepts({type}),false);assert(link.accepts({type,requestId:second}));
 }
 assert.equal(link.clear(),second);assert.equal(link.current(),null);assert.equal(link.accepts({requestId:second}),false);
});
test('the host uncovers the existing child recovery dialog only when it is present',()=>{
 const api=adapter(),classes=new Set(),overlay={classList:{toggle:(name,on)=>on?classes.add(name):classes.delete(name)},textContent:''};
 assert(api.presentEmbeddedLoadError(overlay,{__CQC053Versus:{getLoadingState:()=>({status:'failed'})}},'asset failed'));assert(classes.has('hidden'));
 assert.equal(api.presentEmbeddedLoadError(overlay,{__CQC053Versus:{getLoadingState:()=>null}},'configuration failed'),false);assert(!classes.has('hidden'));assert.match(overlay.textContent,/configuration failed/);
});

function transport(){
 const html=fs.readFileSync(path.join(root,'public/cqc/modules/unified-versus-v055.html'),'utf8');
 const line=html.split('\n').find(line=>line.startsWith("addEventListener('message',e=>{if(story55||e.source!==parent)return;"));assert(line);
 const calls=[],messages=[],parent={postMessage:message=>messages.push(message)};let handler;
 const scope={parent,window:{parent},story55:false,externalEmbed48:true,FIGHTERS:[],STAGES:[],AI_PROFILES49:[],MUTATORS49:[],running:false,state:null,dojo:{on:false},matchRequestPass10:null,
  addEventListener:(name,fn)=>{if(name==='message')handler=fn},
  prepareExternalPass10:(config,started,error,cancelled)=>calls.push({kind:'start',config,started,error,cancelled}),
  prepareReplayPass10:(replay,ghost)=>calls.push({kind:'replay',replay,ghost}),
  pause43:()=>{},resetDojo:()=>{},emitTelemetry49:()=>{},Combat:{empty:()=>({})}};
 vm.createContext(scope);vm.runInContext('let externalRequestID56=null;',scope);scope.abort55=()=>{calls.push({kind:'abort'});vm.runInContext('externalRequestID56=null;',scope)};vm.runInContext(line,scope);
 return {calls,messages,send:data=>handler({source:parent,data}),foreign:data=>handler({source:{},data})};
}
test('actual Versus handler echoes launch IDs and suppresses superseded callbacks',()=>{
 const e=transport();e.send({type:'cqc-versus-start',requestId:'first',config:{p1:'a'}});const first=e.calls[0];
 first.error(Error('missing source'));assert.equal(e.messages.at(-1).requestId,'first');
 e.send({type:'cqc-versus-start',requestId:'second',config:{p1:'b'}});const second=e.calls[1],before=e.messages.length;
 first.started();first.error(Error('late'));first.cancelled();assert.equal(e.messages.length,before);
 second.started();assert.equal(e.messages.at(-1).type,'cqc-versus-started');assert.equal(e.messages.at(-1).requestId,'second');
 second.cancelled();assert.equal(e.messages.at(-1).type,'cqc-versus-cancelled');assert.equal(e.messages.at(-1).requestId,'second');
});
test('a delayed abort from an older request leaves the newer request active',()=>{
 const e=transport();e.send({type:'cqc-versus-start',requestId:'new',config:{}});e.send({type:'cqc-versus-abort',requestId:'old'});assert.equal(e.calls.filter(c=>c.kind==='abort').length,0);
 e.send({type:'cqc-versus-abort',requestId:'new'});assert.equal(e.calls.filter(c=>c.kind==='abort').length,1);
});
test('legacy uncorrelated starts, aborts, replays, ghosts and source validation remain supported',()=>{
 const e=transport();e.send({type:'cqc-versus-start',config:{p1:'legacy'}});assert.equal(e.calls[0].config.p1,'legacy');e.calls[0].error(Error('legacy failure'));assert.equal(e.messages.at(-1).type,'cqc-versus-error');assert.equal(e.messages.at(-1).requestId,undefined);
 e.send({type:'cqc-versus-abort'});assert.equal(e.calls.at(-1).kind,'abort');
 e.send({type:'cqc-versus-replay',replay:{id:1}});assert.equal(e.calls.at(-1).ghost,null);
 e.send({type:'cqc-versus-ghost',replay:{id:2},liveSlot:1});assert.equal(e.calls.at(-1).ghost,0);
 const count=e.calls.length;e.foreign({type:'cqc-versus-abort'});assert.equal(e.calls.length,count);
});
test('all inline JavaScript in the three changed mode HTML files compiles',()=>{
 for(const name of ['unified-versus-v055.html','arcade-chronicles-v055.html','combat-academy-v053.html']){
  const html=fs.readFileSync(path.join(root,'public/cqc/modules',name),'utf8');let count=0;
  for(const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)){
   if(/\bsrc\s*=|\btype\s*=\s*["']application\/json/i.test(match[1])||!match[2].trim())continue;
   new vm.Script(match[2],{filename:name+':inline-'+(++count)});
  }
  assert(count>0);
 }
});

test('actual finished-match result retains correlation after the one-shot launch config is consumed',()=>{
 const html=fs.readFileSync(path.join(root,'public/cqc/modules/unified-versus-v055.html'),'utf8');
 const fn=html.split('\n').find(line=>line.startsWith('function showResult(w,fin=null){'));assert(fn);
 const messages=[],parent={postMessage:m=>messages.push(m)},a={slot:0,f:{uid:'a'},life:400,max:500,wins:1},b={slot:1,f:{uid:'b'},life:0,max:500,wins:0};
 const scope={state:{a,b,options:{externalRequestID56:'persistent-match-id'},stage:{name:'Test scene'},timer:300,timerStart:600},externalConfig48:null,story55:false,externalEmbed48:true,window:{parent},finalizeReplay48:()=>null,fighterLabelPass18:f=>f.uid,$:()=>({textContent:'',classList:{remove:()=>{}}})};
 vm.createContext(scope);vm.runInContext(fn,scope);scope.showResult(a);assert.equal(messages.length,1);assert.equal(messages[0].requestId,'persistent-match-id');
});
