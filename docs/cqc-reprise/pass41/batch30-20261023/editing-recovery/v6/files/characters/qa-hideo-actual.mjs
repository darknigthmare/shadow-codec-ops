import fs from 'node:fs';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {CDP,delay} from '@WORKSPACE_ROOT@/cqc-pass40-resume-20261022/integration-v2/cdp-owned.mjs';
const root='@PROJECT_ROOT@/characters';
const port=Number(fs.readFileSync(root+'/qa-server-port.txt','utf8'));
const base='http://127.0.0.1:'+port+'/cqc/';
const c=await CDP.open(9641);
const r={schema:'cqc.pass41.hideo-actual-browser-qa/1',status:'running',trustedUI:true,productStateInjected:false,storageInjected:false,transport:'local-readonly-exact-product-overlay',checks:[],startedAt:new Date().toISOString()};
let frame;
const ev=expression=>c.evaluate(frame,expression);
async function wait(expression,ms=35000){const start=Date.now();while(Date.now()-start<ms){try{const value=await ev(expression);if(value)return value;}catch{}await delay(60);}throw Error('Timeout '+expression);}
async function screenshot(name){const shot=await c.call('Page.captureScreenshot',{format:'jpeg',quality:84,captureBeyondViewport:false});fs.writeFileSync(root+'/qa-'+name+'.jpg',Buffer.from(shot.data,'base64'));}
async function click(selector){await c.click(frame,selector);}
const snapshot='({count:__CQC053Roster.fighters.length,uids:__CQC053Roster.fighters.map(f=>f.uid),audit:__CQC053Roster.audit,getPicks:__CQC053Roster.getPicks()})';
const current='(()=>{const d=document.getElementById("p41-hideo-dialog"),i=d.querySelector("img"),s=d.querySelector("[role=status]");return{open:d.open,uid:d.dataset.hideoUid,imageUID:i.dataset.hideoUid,hidden:i.hidden,src:i.currentSrc||i.src,naturalWidth:i.naturalWidth,naturalHeight:i.naturalHeight,alt:i.alt,statusHidden:s.hidden,busy:d.querySelector(".p41-hideo-art").getAttribute("aria-busy"),pressed:[...d.querySelectorAll("[aria-pressed=true]")].map(b=>b.dataset.hideoUid)}})()';
try{
 await c.call('Network.enable');await c.call('Network.setCacheDisabled',{cacheDisabled:true});
 await c.call('Page.navigate',{url:base+'modules/roster-command-v053.html'});
 for(let i=0;i<180;i++){try{frame=await c.frame('roster-command-v053.html');if(await ev('document.readyState==="complete"&&!!CQC_PASS41_HIDEO_CODEX'))break;}catch{}await delay(80);}
 await wait('!!CQC_PASS41_HIDEO_CODEX');
 const before=await ev(snapshot);r.baseline=before;
 assert.equal(before.uids.filter(uid=>uid.startsWith('pass41__hideo')).length,0);
 await click('#p41-hideo-open');
 for(const era of ['pw','gz','tpp']){
  const uid='pass41__hideo_'+era;await click('[data-hideo-uid="'+uid+'"]');
  await wait('document.querySelector("#p41-hideo-dialog img").dataset.hideoUid==='+JSON.stringify(uid));
  const actual=await ev(current);assert.equal(actual.uid,uid);assert.equal(actual.imageUID,uid);assert(!actual.hidden);assert(actual.statusHidden);assert(actual.naturalWidth>0);assert.equal(actual.busy,'false');assert.deepEqual(actual.pressed,[uid]);
  r.checks.push({kind:'actual-decoded-incarnation',...actual});await screenshot(era);
 }
 // Reload clears this module's three-item decode cache; pointer clicks now race actual delayed PNG responses.
 await c.call('Page.reload',{ignoreCache:true});
 for(let i=0;i<180;i++){try{frame=await c.frame('roster-command-v053.html');if(await ev('document.readyState==="complete"&&!!CQC_PASS41_HIDEO_CODEX'))break;}catch{}await delay(60);}
 await wait('!!CQC_PASS41_HIDEO_CODEX');await click('#p41-hideo-open');
 for(const era of ['pw','gz','tpp','pw','gz','tpp','pw'])await click('[data-hideo-uid="pass41__hideo_'+era+'"]');
 await wait('document.querySelector("#p41-hideo-dialog img").dataset.hideoUid==="pass41__hideo_pw"');
 const race=await ev(current);assert.equal(race.imageUID,'pass41__hideo_pw');r.checks.push({kind:'rapid-seven-tab-transitions-final-source-correct',...race});
 await c.key('Escape','Escape',27);await wait('!document.getElementById("p41-hideo-dialog").open');
 assert.equal(await ev('document.activeElement.id'),'p41-hideo-open');
 await click('#overviewBtn');await wait('!document.getElementById("overview").classList.contains("hidden")');
 await click('#overview .overview-card');await wait('!document.getElementById("detail").classList.contains("hidden")');
 const after=await ev(snapshot);assert.deepEqual(after,before);r.checks.push({kind:'escape-focus-restored-unrelated-overview-and-roster-return-without-data-mutation',fighterCount:after.count});
 await click('#roster .fighter');
 const picked=await ev(snapshot);assert.equal(picked.getPicks.length,1);
 await click('#p41-hideo-open');await wait('document.querySelector("#p41-hideo-dialog img").dataset.hideoUid==="pass41__hideo_pw"');await click('#p41-hideo-dialog header button');await wait('!document.getElementById("p41-hideo-dialog").open');
 assert.deepEqual(await ev(snapshot),picked);
 r.checks.push({kind:'reopen-cached-portrait-close-button-and-preserve-unrelated-fighter-selection',pickedUID:picked.getPicks[0]});
 await click('#p41-hideo-open');await wait('document.querySelector("#p41-hideo-dialog img").dataset.hideoUid==="pass41__hideo_pw"');
 await c.call('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
 const mobile=await ev('(()=>{const d=document.getElementById("p41-hideo-dialog"),b=d.getBoundingClientRect();return{left:b.left,right:b.right,viewport:innerWidth,scrollWidth:d.scrollWidth,clientWidth:d.clientWidth}})()');assert(mobile.left>=0&&mobile.right<=mobile.viewport+1);assert(mobile.scrollWidth<=mobile.clientWidth+1);r.checks.push({kind:'mobile390-no-horizontal-overflow',...mobile});await screenshot('mobile');
 await c.key('Escape','Escape',27);
 await c.call('Emulation.clearDeviceMetricsOverride');
 await c.call('Page.reload',{ignoreCache:true});
 for(let i=0;i<180;i++){try{frame=await c.frame('roster-command-v053.html');if(await ev('document.readyState==="complete"&&!!CQC_PASS41_HIDEO_CODEX'))break;}catch{}await delay(60);}
 await wait('!!CQC_PASS41_HIDEO_CODEX');await click('#p41-hideo-open');
 const pending=await ev(current);assert(pending.open&&pending.hidden&&!pending.statusHidden);
 await c.key('Escape','Escape',27);await delay(1800);
 const canceled=await ev(current);assert(!canceled.open&&canceled.hidden&&!canceled.imageUID);
 r.checks.push({kind:'close-during-pending-real-http-decode-late-completion-cannot-repaint',pending,canceled});
 r.requests=await (await fetch('http://127.0.0.1:'+port+'/__hideo_requests')).json();
 const pins=JSON.parse(fs.readFileSync(root+'/HIDEO_RUNTIME_CANDIDATE_PINS_V1.json')).records;
 for(const pin of pins){const requests=r.requests.filter(x=>x.logical===pin.logicalPath);assert(requests.length>0);assert(requests.every(x=>x.status===200&&x.bytes===pin.bytes&&x.sha256===pin.sha256));}
 r.status='passed-actual-three-portraits-ui-with-body-held';
}catch(error){r.status='failed-or-incomplete';r.error=String(error.stack||error);process.exitCode=1;try{await screenshot('failure');}catch{}}
finally{
 r.runtimeExceptions=c.errors;r.consoleErrors=c.consoleErrors;r.loadingFailures=c.loadingFailures;r.finishedAt=new Date().toISOString();
 if(r.runtimeExceptions.length||r.consoleErrors.length){r.status='failed-or-incomplete';process.exitCode=1;}
 fs.writeFileSync(root+'/HIDEO_ACTUAL_BROWSER_QA_V1.json',JSON.stringify(r,null,2)+'\n');
 console.log(JSON.stringify({status:r.status,checks:r.checks.length,error:r.error,exceptions:r.runtimeExceptions.length,consoleErrors:r.consoleErrors.length}));
 try{await c.call('Browser.close');}catch{}c.ws.close();
}
