import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
import {connect} from '/tmp/cqc-pass18-integration/cdp.mjs';
const browser=await connect(),stamp=new Date().toISOString().replace(/[:.]/g,'-');
const dir='/tmp/cqc-pass19-integration',report={schema:'cqc.pass19.integrated-native-wardrobe-ui/1',startedAt:new Date().toISOString(),checks:[],qualification:'Local integrated application. Original pixel presentation is not newly drawn retro art. Canonical option sources remain distinct incarnations; original cyborg is a fan design.'};
let page;
const wait=async(expression)=>{for(let i=0;i<200;i++){if(await page.evaluate(expression))return;await new Promise(r=>setTimeout(r,100));}throw Error('Timeout '+expression);};
try{
 for(const flow of ['versus','core']){
  page=await browser.page('http://127.0.0.1:8029/cqc/modules/'+(flow==='versus'?'unified-versus-v055.html':'core-v032.html'));
  await page.send('Emulation.setDeviceMetricsOverride',{width:1600,height:1000,deviceScaleFactor:1,mobile:false});
  await wait(flow==='versus'?'!!window.__CQC055Versus':'!!window.CQC');
  const registration=await page.evaluate(`({costumes:CQC_PASS19_COSTUMES.report().readyNativeVariants,canonical:CQC_PASS19_CANONICAL_APPEARANCES.data.counts,original:CQC_PASS19_ORIGINAL_COSTUMES.result,scale:!!CQC_PASS19_WORLD_SCALE,baseCount:Object.keys(CQC_COMBAT_SPRITE_CATALOG.entries).length})`);
  assert.equal(registration.costumes,649);assert.equal(registration.original.accepted,1);assert.equal(registration.baseCount,338);
  const storageBefore=await page.evaluate(`Object.fromEntries(Object.keys(localStorage).map(k=>[k,localStorage.getItem(k)]))`);
  if(flow==='versus'){
   await page.evaluate(`(()=>{document.querySelector('#filters [data-dossier="TOUS"]').click();const search=document.getElementById('search');search.value='SOLID SNAKE';search.dispatchEvent(new Event('input',{bubbles:true}));for(const slot of [1,2]){document.getElementById('slotP'+slot).click();const card=[...document.querySelectorAll('#roster .fighter-card')].find(b=>b.querySelector('b').textContent==='SOLID SNAKE');if(!card)throw Error('Snake MGS1 card missing');card.click();}for(const [slot,value]of [[1,'cyborg'],[2,'appearance-core-snake-mgs2']]){const control=document.getElementById('costume-p'+slot+'-pass17');if(!control||control.disabled||control.closest('label').hidden)throw Error('Costume select missing');control.value=value;control.dispatchEvent(new Event('change',{bubbles:true}));}return true;})()`);
  }else{
   await page.evaluate(`(()=>{document.querySelector('[data-mode="training"]').click();document.querySelector('[data-player="solid"]').click();const opponent=document.getElementById('opponent');opponent.value='solid';opponent.dispatchEvent(new Event('change',{bubbles:true}));for(const [slot,value]of [[1,'cyborg'],[2,'appearance-core-snake-mgs2']]){const control=document.getElementById('mobile-costume-p'+slot+'-pass17');if(!control||control.disabled||control.closest('label').hidden)throw Error('Core costume select missing');control.value=value;control.dispatchEvent(new Event('change',{bubbles:true}));}return true;})()`);
  }
  const actual=await page.evaluate(`(async()=>{const uid='core__solid',api=CQC_COMBAT_SPRITES,rows=[];for(const slot of [0,1]){const fighter=CQC_COSTUMES_PASS17.fighterFor({uid},slot);if(!await api.whenReady(uid,fighter))throw Error('Native images unavailable');for(const face of [1,-1]){const canvas=document.createElement('canvas');canvas.width=360;canvas.height=480;const c=canvas.getContext('2d',{willReadFrequently:true}),calls=[],draw=c.drawImage.bind(c);c.drawImage=(...a)=>{calls.push(a[0].src);return draw(...a)};if(!api.drawFitted(c,fighter,{x:8,y:8,width:344,height:464,padding:10},face,{time:0,actionTime:0,entityKey:'pass19-ui-'+slot+'-'+face}))throw Error('No draw');let alpha=0,edge=0;const d=c.getImageData(0,0,360,480).data;for(let y=0;y<480;y++)for(let x=0;x<360;x++)if(d[(y*360+x)*4+3]>12){alpha++;if(x<8||x>351||y<8||y>471)edge++;}rows.push({slot,costume:fighter.costume,face,calls,alpha,edge});}}return{rows,choices:[0,1].map(slot=>CQC_COSTUMES_PASS17.chosen(slot,uid)),coreActors:window.CQC?.match?.fighters?.map(f=>({id:f.id,costume:f.costume})),labels:[...document.querySelectorAll('select[id*="costume-p1"] option')].map(o=>o.textContent)};})()`);
  assert.deepEqual(actual.choices,['cyborg','appearance-core-snake-mgs2']);assert(actual.rows.every(r=>r.alpha>100&&r.edge===0&&r.calls.length===1));
  assert(actual.rows.filter(r=>r.slot===0).every(r=>r.calls[0].includes('/combat-costumes-pass19/core__solid/cyborg/')));
  if(flow==='core')assert.deepEqual(actual.coreActors.map(f=>f.costume),actual.choices);
  const shot=dir+'/WARDROBE_ACTUAL_'+flow.toUpperCase()+'_'+stamp+'.png';await page.screenshot(shot);
  report.checks.push({flow,registration,...actual,screenshot:shot});
  await page.evaluate(`(()=>{const saved=${JSON.stringify(storageBefore)};for(const k of Object.keys(localStorage))if(!(k in saved))localStorage.removeItem(k);for(const[k,v]of Object.entries(saved))localStorage.setItem(k,v);return true;})()`);
  await page.close();page=null;
 }
 report.exceptions=browser.events.filter(e=>e.method==='Runtime.exceptionThrown').map(e=>e.params.exceptionDetails);
 report.failures=browser.events.filter(e=>e.method==='Network.loadingFailed').map(e=>e.params);
 assert.equal(report.exceptions.length,0);assert.equal(report.failures.length,0);report.status='passed';
}catch(error){report.status='failed';report.error=error.stack;report.exceptions=browser.events.filter(e=>e.method==='Runtime.exceptionThrown').map(e=>e.params.exceptionDetails);if(page)try{report.failure=await page.evaluate(`({url:location.href,title:document.title,body:document.body.innerText.slice(0,400),costumes:window.CQC_PASS19_COSTUMES?.report()})`);}catch{}process.exitCode=1;}
finally{if(page)await page.close();browser.close();report.finishedAt=new Date().toISOString();const path=dir+'/WARDROBE_INTEGRATED_ACTUAL_UI_V2_'+stamp+'.json';await writeFile(path,JSON.stringify(report,null,2),{flag:'wx'});console.log(JSON.stringify({status:report.status,path,error:report.error,checks:report.checks.length,exceptions:report.exceptions?.length}));}
