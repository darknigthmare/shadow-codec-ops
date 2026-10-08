import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const dir='/tmp/cqc-pass19-scale-menu',clientSource=(await readFile('/tmp/cqc-pass18-integration/cdp.mjs','utf8')).replaceAll('9231','9349');
const {connect}=await import('data:text/javascript;base64,'+Buffer.from(clientSource).toString('base64'));
const browser=await connect(),page=await browser.page('http://127.0.0.1:8019/cqc/modules/unified-versus-v055.html'),report={schema:'cqc.pass19.actual-native-scale-inspection-browser/1',startedAt:new Date().toISOString(),origin:'http://127.0.0.1:8019',browserPort:9349,productionObserved:false,sourceFilesModified:false,checks:[],screenshots:[]};
async function wait(expression,max=90000){const until=Date.now()+max;while(Date.now()<until){if(await page.evaluate(expression))return;await new Promise(r=>setTimeout(r,250));}throw Error('Timed out: '+expression);}
try{
 await page.send('Emulation.setDeviceMetricsOverride',{width:1600,height:1000,deviceScaleFactor:1,mobile:false});
 await wait('!!window.CQC_COMBAT_SPRITES&&!!window.CQC_PASS18_MACHINES&&document.readyState==="complete"');
 const source=await readFile(dir+'/cqc-pass19-world-scale.js','utf8');await page.evaluate(source+'\n;true');
 const sourcePin=createHash('sha256').update(source).digest('hex');report.moduleSHA256=sourcePin;
 await page.evaluate(`(()=>{const canvas=document.createElement('canvas');canvas.id='pass19-inspection-proof';canvas.width=1600;canvas.height=1000;canvas.style.cssText='position:fixed;inset:0;width:100vw;height:100vh;z-index:2147483647;background:#071713';document.body.append(canvas);return true})()`);
 for(const [name,uids]of[['human-gekko',['core__solid','roster50__sunny_mgr','roster50__kasler_mg2','completion__gekko_mgs4']],['human-rex',['core__solid','rex']]]){
  assert.equal(await page.evaluate(`CQC_PASS19_WORLD_SCALE.prepareComparison(${JSON.stringify(uids)})`),true);
  const result=await page.evaluate(`(()=>{const canvas=document.querySelector('#pass19-inspection-proof'),ctx=canvas.getContext('2d'),api=CQC_PASS19_WORLD_SCALE;ctx.fillStyle='#071713';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.fillStyle='#d8e3c5';ctx.font='28px system-ui';ctx.fillText('DOSSIER — ÉCHELLE RELATIVE',35,40);const drawn=api.drawComparison(ctx,${JSON.stringify(uids)});const rect=canvas.getBoundingClientRect(),pixels=ctx.getImageData(0,80,canvas.width,canvas.height-180).data;let visiblePixels=0;for(let i=0;i<pixels.length;i+=4)if(pixels[i]!==7||pixels[i+1]!==23||pixels[i+2]!==19)visiblePixels++;return{drawn,visiblePixels,bounds:{width:rect.width,height:rect.height},rows:${JSON.stringify(uids)}.map(uid=>({uid,height:api.height(uid),worldBounds:api.worldBounds(uid)}))};})()`);
  assert.equal(result.drawn,true);assert.ok(result.visiblePixels>20000);assert.equal(result.bounds.width,1600);assert.equal(result.bounds.height,1000);
  await page.evaluate('new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))');
  const path=dir+'/SCALE_INSPECTION_'+name.toUpperCase().replaceAll('-','_')+'_ACTUAL_V3.png';await page.screenshot(path);const bytes=await readFile(path);report.checks.push({name,uids,...result});report.screenshots.push({name,path,bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')});
 }
 const events=browser.events.filter(e=>e.sessionId===page.sessionId);report.runtimeExceptions=events.filter(e=>e.method==='Runtime.exceptionThrown').map(e=>e.params);report.failedRequests=events.filter(e=>e.method==='Network.loadingFailed').map(e=>e.params);assert.equal(report.runtimeExceptions.length,0);assert.equal(report.failedRequests.length,0);report.status='passed';
 report.qualifications=['Actual local native PNG and articulated rig drawing, not production flow QA.','Source poses are uniformly scaled about the feet; costume anatomy/equipment remains authored artwork.','REX H13.0m is directly read in the official Konami chart. Other unestablished machine heights use preserved display framing, not atlas/source units. Boss combat framing remains unchanged.','Machine combat scale wrapper remained disabled; comparison has no simulation/collision writes.'];
}catch(error){report.status='failed';report.failure={message:error.message,stack:error.stack};process.exitCode=1;}
finally{report.finishedAt=new Date().toISOString();await writeFile(dir+'/SCALE_INSPECTION_ACTUAL_BROWSER_QA_V3.json',JSON.stringify(report,null,2));await page.close();browser.close();}
console.log(JSON.stringify({status:report.status,checks:report.checks.length,screenshots:report.screenshots.length,failure:report.failure?.message}));
