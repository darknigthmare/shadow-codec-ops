import {openPage,until,pause} from '../../browser/cdp.mjs';import fs from 'node:fs';import assert from 'node:assert/strict';
const out='/tmp/cqc-p54-20261120/qa/modes';const p=await openPage('http://127.0.0.1:8154/cqc/modules/combat-academy-v053.html');const r={cases:[]};
try{
 await until(p,`document.readyState==='complete'&&!!window.__CQC053Academy&&[...document.getElementById('aiStage').options].some(o=>o.value==='BIG SHELL · OIL FENCE')`);
 const before=await p.ev(`({lessons:__CQC053Academy.data.universalLessons,weekly:__CQC053Academy.data.weeklyOperations,options:[...document.getElementById('aiStage').options].filter(o=>o.textContent.includes('EXERCICE')).map(o=>({value:o.value,label:o.textContent}))})`);
 const actual=await p.ev(`document.getElementById('fightFrame').contentWindow.CQC_SERVICE_YARD.stages.map(s=>s.name)`);const authored=before.options.filter(o=>actual.includes(o.value));assert.equal(authored.length,actual.length);assert(actual.every(name=>authored.some(o=>o.value===name&&o.label.endsWith(' · EXERCICE'))));r.cases.push({name:'all-authored-stages-exposed-only-free-ai',options:authored});
 await p.ev(`document.querySelector('[data-mode="ailab"]').click();document.getElementById('aiP1').value='core__snake_mgs2';document.getElementById('aiP2').value='core__vamp';document.getElementById('aiStage').value='BIG SHELL · OIL FENCE';document.getElementById('aiLevel').value='normal';document.getElementById('launchAI').click()`);
 await until(p,`document.getElementById('fightFrame').contentWindow.__CQC053Versus?.getState()?.stage.id==='p54_mgs2_oil_fence_hd'`,90000);await pause(700);
 const state=await p.ev(`(()=>{const w=document.getElementById('fightFrame').contentWindow,s=w.__CQC053Versus.getState();return {stage:s.stage.id,frame:s.frame,options:s.options,actors:[s.a.f.uid,s.b.f.uid],sourceState:w.CQC_SERVICE_YARD.status(s.stage),loading:w.__CQC053Versus.getLoadingState()}})()`);
 assert.equal(state.sourceState.state,'ready');assert.equal(state.loading,null);assert(state.frame>0);r.cases.push({name:'actual-ai-free-oil-fence-match',...state});
 const shot=await p.call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync(out+'/academy-oil-fence-fight.png',Buffer.from(shot.data,'base64'));
 await p.ev(`document.getElementById('fightAbort').click()`);await pause(100);assert.equal(await p.ev(`document.getElementById('home').classList.contains('active')`),true);
 r.cases.push({name:'free-ai-abort-returns-academy'});r.status='PASS';
}catch(e){r.status='FAIL';r.error=String(e.stack||e);console.error(r.error)}
finally{r.atUTC=new Date().toISOString();r.exceptions=p.exceptions;r.failed=p.failed;r.badResponses=p.responses.filter(x=>x.status>=400);fs.writeFileSync(out+'/ACADEMY_ACTUAL_BROWSER_QA_PRIVATE_V1.json',JSON.stringify(r,null,2)+'\n');console.log(JSON.stringify({status:r.status,cases:r.cases.length,exceptions:r.exceptions.map(x=>x.exception?.description||x.text),badResponses:r.badResponses,failed:r.failed.map(x=>({error:x.errorText,blockedReason:x.blockedReason}))}));await p.close()}
if(r.status!=='PASS')process.exitCode=1;
