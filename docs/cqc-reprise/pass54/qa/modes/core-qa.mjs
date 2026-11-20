import {openPage,until,pause} from '../../browser/cdp.mjs';
import assert from 'node:assert/strict';import fs from 'node:fs';
const out='/tmp/cqc-p54-20261120/qa/modes';
const page=await openPage('http://127.0.0.1:8154/cqc/modules/core-v032.html');
const report={cases:[],intentionalBlockedAsset:'p53-service-yard/power-yard.png'};
async function capture(name){const shot=await page.call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync(out+'/'+name+'.png',Buffer.from(shot.data,'base64'));}
async function choose(id){
 const name=await page.ev(`CQC_P54_MODE_SCENES.resolve(${JSON.stringify(id)}).name`);
 await page.ev(`document.getElementById('coreStageSearchPass17').value='EXERCICE';document.getElementById('coreStageSearchPass17').dispatchEvent(new Event('input',{bubbles:true}));[...document.querySelectorAll('#coreStageGridPass17 button')].find(b=>b.querySelector('strong').textContent.startsWith(${JSON.stringify(name)})).click()`);
}
try{
 await until(page,'document.readyState==="complete"&&!!window.CQC');
 await page.ev(`document.getElementById('coreMatchSettingsButtonPass17').click();document.querySelector('#coreMatchSettingsPass17 [data-mode="cpu"]').click();document.querySelector('#coreMatchSettingsPass17 [data-core-close]').click()`);
 assert.equal(await page.ev('CQC_CORE_MATCH_FLOW_PASS17_INSTANCE.getSnapshot().mode'),'cpu');
 await page.call('Network.setBlockedURLs',{urls:['*p53-service-yard/power-yard.png*']});
 await page.ev(`document.getElementById('start').click()`);
 await until(page,`document.getElementById('coreStageSelectPass17').open`);
 await choose('p53_null_power_yard');
 await until(page,`CQC_P54_MODE_SCENES.status('p53_null_power_yard').state==='error'`);
 await page.ev(`document.getElementById('coreStageConfirmPass17').click()`);
 await until(page,`document.querySelector('#cqc-exercise-stage-loading button')?.hidden===false`);
 assert.equal(await page.ev('CQC.playing'),false);
 report.cases.push({name:'blocked-scene-stops-free-match',playing:false,state:await page.ev(`CQC_P54_MODE_SCENES.status('p53_null_power_yard').state`)});
 await capture('core-loading-error');
 await page.ev(`document.querySelectorAll('#cqc-exercise-stage-loading button')[1].click()`);
 assert.equal(await page.ev(`!document.getElementById('cqc-exercise-stage-loading')?.isConnected&&!CQC.playing`),true);
 report.cases.push({name:'cancel-restores-menu',playing:false});
 await page.call('Network.setBlockedURLs',{urls:[]});
 await page.ev(`document.getElementById('start').click()`);await until(page,`document.getElementById('coreStageSelectPass17').open`);
 await choose('p53_null_power_yard');await page.ev(`document.getElementById('coreStageConfirmPass17').click()`);
 await until(page,`document.querySelector('#cqc-exercise-stage-loading button')?.hidden===false`);
 await page.ev(`document.querySelector('#cqc-exercise-stage-loading button').click()`);
 await until(page,`CQC.playing&&CQC.match.options.stage==='p53_null_power_yard'`,90000);
 await pause(500);
 report.cases.push({name:'retry-starts-cpu-match',stage:await page.ev('CQC.match.options.stage'),frame:await page.ev('CQC.match.frame'),mode:await page.ev('CQC.match.options.mode'),state:await page.ev(`CQC_P54_MODE_SCENES.status('p53_null_power_yard').state`)});
 await capture('core-cpu-yard');
 await page.ev(`CQC.menu();document.getElementById('coreMatchSettingsButtonPass17').click();document.querySelector('#coreMatchSettingsPass17 [data-mode="local"]').click();document.querySelector('#coreMatchSettingsPass17 [data-core-close]').click();document.getElementById('start').click()`);
 await until(page,`document.getElementById('coreStageSelectPass17').open`);
 const ids=await page.ev('CQC_SERVICE_YARD.stages.map(s=>s.id)');
 for(const id of ids){
  await choose(id);await until(page,`document.getElementById('coreMatchStagePreviewPass17').dataset.stageArtState==='ready'&&CQC_P54_MODE_SCENES.status(${JSON.stringify(id)}).state==='ready'`);
  const state=await page.ev(`({scene:${JSON.stringify(id)},state:CQC_P54_MODE_SCENES.status(${JSON.stringify(id)}).state,name:document.getElementById('coreStageNamePass17').textContent,colors:(()=>{const a=document.getElementById('coreMatchStagePreviewPass17').getContext('2d').getImageData(100,100,1,1).data;return [...a]})()})`);
  assert.equal(state.state,'ready');assert.equal(state.colors[3],255);report.cases.push({name:'actual-stage-picker-preview',...state});
 }
 await choose('p54_mgs2_oil_fence_hd');await capture('core-oil-fence-picker');
 await page.ev(`document.getElementById('coreStageConfirmPass17').click()`);await until(page,`CQC.playing&&CQC.match.options.stage==='p54_mgs2_oil_fence_hd'`,90000);await pause(500);
 report.cases.push({name:'oil-fence-local-match',stage:await page.ev('CQC.match.options.stage'),frame:await page.ev('CQC.match.frame'),mode:await page.ev('CQC.match.options.mode')});
 await capture('core-local-oil-fence');
 report.status='PASS';
}catch(error){report.status='FAIL';report.error=String(error.stack||error);await capture('core-failure').catch(()=>{});console.error(report.error)}
finally{
 report.exceptions=page.exceptions;report.failed=page.failed;report.badResponses=page.responses.filter(r=>r.status>=400);report.atUTC=new Date().toISOString();
 fs.writeFileSync(out+'/CORE_ACTUAL_BROWSER_QA_PRIVATE_V1.json',JSON.stringify(report,null,2)+'\n');
 console.log(JSON.stringify({status:report.status,cases:report.cases.length,exceptions:report.exceptions.map(x=>x.exception?.description||x.text),badResponses:report.badResponses,failed:report.failed.map(x=>({error:x.errorText,blockedReason:x.blockedReason}))}));await page.close();
}
if(report.status!=='PASS')process.exitCode=1;
