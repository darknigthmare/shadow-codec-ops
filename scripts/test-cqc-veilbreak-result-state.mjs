import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {freshSave,profile,acceptResult} from '../public/cqc/originals/veilbreak/campaign.js';

const portalSource=readFileSync(new URL('../public/cqc/originals/veilbreak/veilbreak.js',import.meta.url),'utf8');
const start=portalSource.indexOf('function onResult('),end=portalSource.indexOf('\nfunction setup(',start);
assert.ok(start>=0&&end>start,'Actual portal onResult function must exist');
const onResultSource=portalSource.slice(start,end);
const nextHandler=portalSource.split('\n').find(line=>line.includes("$('resultNext').onclick="));
assert.ok(nextHandler,'Actual portal next handler must exist');

// Stub only DOM/storage effects. Result classification and campaign progression
// execute their production functions rather than a mirror of their conditions.
const createPortal=new Function('scope','acceptResult',[
 'let active=scope.active,resultRun=null;',
 'const save=scope.save,routes=scope.routes,$=scope.$,all=()=>scope.actors;',
 'const persist=()=>{scope.calls.persist++;};',
 'const closeBattle=()=>{scope.calls.close++;active=null;};',
 'const syncSelection=()=>{scope.calls.sync++;};',
 'const startRoute=(mode,index)=>scope.next.push({mode,index});',
 onResultSource,nextHandler,
 'return{deliver:onResult,result:()=>resultRun,active:()=>active};'
].join('\n'));

function harness(mode,index,progress){
 const save=freshSave(),p=profile(save,save.selected),nodes=new Map();
 p.campaign=12;p.bossrush=7;if(['campaign','bossrush'].includes(mode))p[mode]=progress;
 const $=id=>{if(!nodes.has(id))nodes.set(id,{textContent:'',hidden:false,open:false,onclick:null,showModal(){this.open=true;},close(){this.open=false;}});return nodes.get(id);};
 const routes={campaign:Array.from({length:40},(_,n)=>({title:'Rencontre '+n})),bossrush:Array.from({length:20},(_,n)=>({title:'Boss '+n}))};
 const scope={save,routes,$,actors:[{id:'qa-opponent',name:'Adversaire de contrôle'}],calls:{persist:0,close:0,sync:0},next:[],active:{mode,index,fighterId:save.selected,token:'qa-result',handled:false,config:{opponentId:'qa-opponent'}}};
 const api=createPortal(scope,acceptResult);
 return{...api,scope,node:$,profile:p,before:{campaign:p.campaign,bossrush:p.bossrush}};
}
function once(h){assert.deepEqual(h.scope.calls,{persist:1,close:1,sync:1});assert.equal(h.active(),null);assert.equal(h.node('resultDialog').open,true);}
for(const mode of ['campaign','bossrush']){
 const max=mode==='campaign'?40:20,last=max-1,other=mode==='campaign'?'bossrush':'campaign';
 for(const [winner,kicker]of [[1,'REPLI TACTIQUE'],[-1,'CONTACT ROMPU']]){
  test(mode+' last encounter '+(winner<0?'draw':'defeat')+' never announces completion or advances counters',()=>{
   const h=harness(mode,last,last);h.deliver({winner,frames:60,mode:'cpu'});
   assert.equal(h.node('resultTitle').textContent,'Le contrat tient encore.');
   assert.equal(h.node('resultKicker').textContent,kicker);
   assert.equal(h.node('resultNext').hidden,true);
   assert.equal(h.profile[mode],last);assert.equal(h.profile[other],h.before[other]);
   assert.equal(h.result().advanced,false);once(h);
  });
 }
 test(mode+' defeat when replaying a previously completed final encounter stays a defeat',()=>{
  const h=harness(mode,last,max);h.deliver({winner:1,frames:60,mode:'cpu'});
  assert.equal(h.node('resultTitle').textContent,'Le contrat tient encore.');
  assert.equal(h.node('resultNext').hidden,true);
  assert.equal(h.profile[mode],max);assert.equal(h.profile[other],h.before[other]);once(h);
 });
 test(mode+' final victory advances only its own counter once and announces completion',()=>{
  const h=harness(mode,last,last),result={winner:0,frames:60,mode:'cpu'};h.deliver(result);h.deliver(result);
  assert.equal(h.node('resultTitle').textContent,mode==='campaign'?'Le passage est ouvert.':'Les vingt verrous sont tombés.');
  assert.equal(h.node('resultKicker').textContent,'OBJECTIF ATTEINT');
  assert.equal(h.node('resultNext').hidden,false);
  assert.equal(h.node('resultNext').textContent,mode==='campaign'?'Lire le dénouement →':'Retour aux cibles →');
  assert.equal(h.profile[mode],max);assert.equal(h.profile[other],h.before[other]);
  assert.equal(h.result().advanced,true);once(h);
 });
 test(mode+' completed-route replay keeps counters and follows the played index',()=>{
  const h=harness(mode,0,max);h.deliver({winner:0,frames:60,mode:'cpu'});
  assert.equal(h.node('resultTitle').textContent,'Secteur sécurisé.');
  assert.equal(h.node('resultNext').textContent,'Rencontre suivante →');
  assert.equal(h.node('resultNext').hidden,false);
  assert.equal(h.profile[mode],max);assert.equal(h.profile[other],h.before[other]);
  assert.equal(h.result().advanced,false);assert.match(h.node('resultText').textContent,/Rencontre rejouée/);once(h);
  h.node('resultNext').onclick();
  assert.deepEqual(h.scope.next,[{mode,index:1}]);assert.equal(h.result(),null);
 });
}
test('invalid outcomes do not consume a session or mutate progress',()=>{
 const h=harness('campaign',39,39);
 for(const result of [null,{winner:2,frames:60},{winner:0,frames:0},{winner:0,frames:1.5}])h.deliver(result);
 assert.equal(h.profile.campaign,39);assert.equal(h.profile.bossrush,7);
 assert.deepEqual(h.scope.calls,{persist:0,close:0,sync:0});assert.equal(h.node('resultDialog').open,false);assert.equal(h.result(),null);assert.ok(h.active());
});
test('free combat victory has no campaign continuation or progression side effect',()=>{
 const h=harness('cpu',0,0);h.deliver({winner:0,frames:60,mode:'cpu'});
 assert.equal(h.node('resultTitle').textContent,'Secteur sécurisé.');assert.equal(h.node('resultNext').hidden,true);
 assert.equal(h.profile.campaign,12);assert.equal(h.profile.bossrush,7);assert.equal(h.result().advanced,false);once(h);
});
