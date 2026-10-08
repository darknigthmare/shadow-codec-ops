import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const base='/tmp/cqc-pass19-gekko-generation',version=process.env.CQC_REVIEW_VERSION||'V2',client=(await readFile('/tmp/cqc-pass18-integration/cdp.mjs','utf8')).replaceAll('9231','9352');
const {connect}=await import('data:text/javascript;base64,'+Buffer.from(client).toString('base64'));
const browser=await connect(),page=await browser.page('http://127.0.0.1:8119/review.html');
const report={schema:'cqc.pass19.actual-native-rig-capture/1',startedAt:new Date().toISOString(),localOnly:true,sourcePixelEditingPerformed:false,checks:[],screenshots:[]};
try{
 await page.send('Emulation.setDeviceMetricsOverride',{width:1800,height:1100,deviceScaleFactor:1,mobile:false});
 const end=Date.now()+50000;while(!await page.evaluate('!!window.reviewReady&&reviewReady()')){const error=await page.evaluate('window.reviewError||null');if(error)throw Error(error);if(Date.now()>end)throw Error('Native source load timeout');await new Promise(r=>setTimeout(r,200));}
 report.nativeStatus=await page.evaluate('reviewStatus()');assert.equal(report.nativeStatus.length,5);assert.ok(report.nativeStatus.every(s=>s.state==='ready'&&s.pins.length>=1));assert.equal(report.nativeStatus.reduce((n,s)=>n+s.pins.length,0),9);
 for(const [name,action,frame,phase,options]of [['idle','idle',0,.5,{}],['walk','walk',13,.5,{}],['heavy','heavy',0,.5,{}],['strike','light',0,.5,{}],['guard','guard',0,.5,{}],['hurt','hurt',0,.5,{}],['collapse','dead',0,.6,{}],['coat-open','idle',0,.5,{coatOpened:true}],['part-detachment','idle',0,.5,{flags:{part0Destroyed:true},channels:{destroy0Frames:32}}]]){
  const rows=await page.evaluate('reviewDraw('+[action,frame,phase,options].map(v=>JSON.stringify(v)).join(',')+')');assert.ok(rows.every(r=>r.drawn));const path=base+'/qa/ASSEMBLED_'+name.toUpperCase().replaceAll('-','_')+'_'+version+'.png';await page.screenshot(path);const bytes=await readFile(path);report.checks.push({name,rows});report.screenshots.push({name,path,bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')});
 }
 const errors=browser.events.filter(e=>e.sessionId===page.sessionId&&e.method==='Runtime.exceptionThrown');assert.equal(errors.length,0);report.runtimeExceptions=errors;report.status='passed';
}catch(error){report.status='failed';report.failure={message:error.message,stack:error.stack};process.exitCode=1;}
finally{report.finishedAt=new Date().toISOString();await writeFile(base+'/qa/ASSEMBLED_ACTUAL_BROWSER_QA_'+version+'.json',JSON.stringify(report,null,2)+'\n');await page.close();browser.close();}
console.log(JSON.stringify({status:report.status,captures:report.screenshots.length,failure:report.failure?.message}));
