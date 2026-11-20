import {openPage,until,pause} from '../../browser/cdp.mjs';import fs from 'node:fs';import assert from 'node:assert/strict';
const out='/tmp/cqc-p54-20261120/qa/modes',key='cqc-v047-arcade-profile';const p=await openPage('http://127.0.0.1:8154/cqc/modules/arcade-chronicles-v055.html');const r={cases:[]};let backup;
try{
 await until(p,`document.readyState==='complete'&&!!window.__CQC053Arcade&&!!document.getElementById('fightFrame').contentWindow.CQC_SERVICE_YARD&&!!document.getElementById('fightFrame').contentWindow.__CQC053Versus`);
 backup=await p.ev(`localStorage.getItem(${JSON.stringify(key)})`);
 const canonical=await p.ev(`(()=>{const a=__CQC053Arcade,w=document.getElementById('fightFrame').contentWindow;return a.campaignRoutes.data.titles.map(t=>({id:t.id,...a.campaignRoutes.matchStage(t,t.opponents[0])})).map(s=>({...s,authored:!!w.CQC_SERVICE_YARD.owns({id:s.stageId})}))})()`);
 assert(canonical.every(s=>!s.authored));r.cases.push({name:'canonical-campaign-planner-has-no-new-authored-admission',titlesChecked:canonical.length});
 await p.ev(`(()=>{const a=__CQC053Arcade;a.startRoute('core__snake_mgs2','recruit');const run=a.getRun();run.matches[0].stage='p54_mgs2_oil_fence_hd';run.matches[0].stageId='p54_mgs2_oil_fence_hd';run.matches[0].opponent='core__vamp';a.profile.lastRun=JSON.parse(JSON.stringify(run));a.show('home');document.querySelector('.nav[data-go="continue"]').click()})()`);
 await until(p,`document.getElementById('storyCanvas').dataset.stageArtState==='ready'`);
 const story=await p.ev(`({stage:__CQC053Arcade.getRun().matches[0].stage,stageId:__CQC053Arcade.getRun().matches[0].stageId,label:document.getElementById('storyStage').textContent,previewState:document.getElementById('storyCanvas').dataset.stageArtState})`);
 assert.equal(story.stage,'BIG SHELL · OIL FENCE');assert.equal(story.stageId,'p54_mgs2_oil_fence_hd');r.cases.push({name:'explicit-custom-save-stage-id-normalizes-and-renders',...story});
 let shot=await p.call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync(out+'/chronicles-custom-oil-fence-story.png',Buffer.from(shot.data,'base64'));
 await p.ev(`document.getElementById('storyFight').click()`);
 await until(p,`document.getElementById('fightFrame').contentWindow.__CQC053Versus.getState()?.stage.id==='p54_mgs2_oil_fence_hd'`,90000);await pause(500);
 const state=await p.ev(`(()=>{const w=document.getElementById('fightFrame').contentWindow,s=w.__CQC053Versus.getState();return{stage:s.stage.id,frame:s.frame,actors:[s.a.f.uid,s.b.f.uid],sourceState:w.CQC_SERVICE_YARD.status(s.stage).state,loading:w.__CQC053Versus.getLoadingState()}})()`);
 assert.equal(state.sourceState,'ready');assert.equal(state.loading,null);r.cases.push({name:'explicit-custom-save-launches-real-arcade-fight',...state});
 shot=await p.call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync(out+'/chronicles-custom-oil-fence-fight.png',Buffer.from(shot.data,'base64'));
 const advance=await p.ev(`(()=>{const w=document.getElementById('fightFrame').contentWindow,a=w.__CQC053Versus;let calls=0;for(;calls<1000&&!a.getState().finished;calls++)a.advance(250);a.draw();return{calls,frame:a.getState().frame,finished:a.getState().finished,winner:a.getState().winner}})()`);
 if(advance.finished){
  await until(p,`__CQC053Arcade.getRun().results.length===1`);
  const result=await p.ev(`({result:__CQC053Arcade.getRun().results[0],stage:__CQC053Arcade.getRun().matches[0].stage,between:document.getElementById('between').classList.contains('active')})`);assert.equal(result.between,true);r.cases.push({name:'actual-accelerated-engine-result-accepted-after-custom-stage-normalization',advance,...result});
 }else r.cases.push({name:'accelerated-engine-result-not-reached',advance});
 r.status='PASS';
}catch(e){r.status='FAIL';r.error=String(e.stack||e);console.error(r.error)}
finally{if(backup!==undefined)await p.ev(backup===null?`localStorage.removeItem(${JSON.stringify(key)})`:`localStorage.setItem(${JSON.stringify(key)},${JSON.stringify(backup)})`).catch(()=>{});r.atUTC=new Date().toISOString();r.exceptions=p.exceptions;r.failed=p.failed;r.badResponses=p.responses.filter(x=>x.status>=400);fs.writeFileSync(out+'/CHRONICLES_ACTUAL_BROWSER_QA_PRIVATE_V1.json',JSON.stringify(r,null,2)+'\n');console.log(JSON.stringify({status:r.status,cases:r.cases.length,exceptions:r.exceptions.map(x=>x.exception?.description||x.text),badResponses:r.badResponses,failed:r.failed.map(x=>({error:x.errorText,blockedReason:x.blockedReason}))}));await p.close()}
if(r.status!=='PASS')process.exitCode=1;
