import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
import {connect} from './cdp-9276.mjs';
const browser=await connect(),report={schema:'cqc.pass20.native-mechanical-live-shots/1',startedAt:new Date().toISOString(),cases:[],qualification:'Natural game frames, supported public start API, real CDP keyboard events. A temporary per-match array-push observer copies actual projectile birth arguments and returns the original push result; actor positions, attacks, timers, damage and simulation are not assigned.'};
let page,saved;
const wait=async expression=>{for(let i=0;i<200;i++){if(await page.evaluate(expression))return;await new Promise(r=>setTimeout(r,100));}throw Error('Timeout '+expression);};
try{
 page=await browser.page('http://127.0.0.1:8029/cqc/modules/unified-versus-v055.html');
 await page.send('Emulation.setDeviceMetricsOverride',{width:1600,height:1000,deviceScaleFactor:1,mobile:false});
 await wait('!!window.__CQC055Versus&&!!window.CQC_PASS20_COSTUME_NATIVE_ORIGINS');
 saved=await page.evaluate(`Object.fromEntries(Object.keys(localStorage).map(k=>[k,localStorage.getItem(k)]))`);
 for(const [p1,p2]of [['core__solid','core__ocelot_mgs1'],['core__ocelot_mgs1','core__solid']]){
  await page.evaluate(`__CQC055Versus.startExternal(${JSON.stringify({p1,p2,costumes:['metalgear','metalgear'],mode:'local',rounds:1,seconds:99,finishers:'off'})})`);
  await wait(`!!__CQC055Versus.getState()&&__CQC055Versus.getState().frame>110`);
  const setup=await page.evaluate(`(()=>{const s=__CQC055Versus.getState(),queue=s.projectiles,prior=queue.push;window.__pass20Births=[];window.__pass20RestoreBirthObserver=()=>{delete queue.push;};Object.defineProperty(queue,'push',{configurable:true,value:function(...values){for(const q of values){const p=q.owner===0?s.a:s.b,n=CQC_PASS20_COSTUME_NATIVE_ORIGINS.projectile(p,q.def,{frame:s.frame});if(n){const ratio=CQC_PASS19_WORLD_SCALE.height(p.f).ratio,k=ratio*1.12,expected={x:p.x+p.face*n.forward*k,y:p.y-n.height*k};window.__pass20Births.push({uid:p.f.uid,costume:p.f.costume,face:p.face,owner:q.owner,frame:s.frame,slot:q.def.slot,tag:q.def.tag,actualBirth:{x:q.x,y:q.y,vx:q.vx,vy:q.vy,age:q.age},actor:{x:p.x,y:p.y},expected,source:n,worldScaleRatio:ratio,worldScaleAppliedOnce:true,errorPixels:Math.hypot(q.x-expected.x,q.y-expected.y)});} }return prior.apply(this,values);}});return{frame:s.frame,dojo:__CQC055Versus.dojo.on,mode:s.options.mode,bindings:__CQC055Versus.getBindings(),actors:[s.a,s.b].map(p=>({uid:p.f.uid,costume:p.f.costume,face:p.face}))};})()`);
  assert.equal(setup.dojo,false);
  for(const code of [setup.bindings.p1.special,setup.bindings.p2.special])await page.send('Input.dispatchKeyEvent',{type:'keyDown',code,key:code.startsWith('Key')?code.slice(3).toLowerCase():code});
  await new Promise(r=>setTimeout(r,90));
  for(const code of [setup.bindings.p1.special,setup.bindings.p2.special])await page.send('Input.dispatchKeyEvent',{type:'keyUp',code,key:code.startsWith('Key')?code.slice(3).toLowerCase():code});
  await wait(`__pass20Births.some(x=>x.owner===0)&&__pass20Births.some(x=>x.owner===1)`);
  const result=await page.evaluate(`(()=>{const s=__CQC055Versus.getState();window.__pass20RestoreBirthObserver();return{births:window.__pass20Births,frame:s.frame,phase:s.phase,actors:[s.a,s.b].map(p=>({uid:p.f.uid,costume:p.f.costume,life:p.life,attack:p.attack?.name||null,face:p.face})),observerRestored:!Object.hasOwn(s.projectiles,'push')};})()`);
  assert.equal(result.observerRestored,true);assert(result.births.every(x=>x.actualBirth.age===0&&x.errorPixels<1e-6&&x.source.worldScaleApplied===false&&x.source.sourceFile.includes('combat-costumes-pass20/')));
  const unique=result.births.filter((x,i,a)=>a.findIndex(y=>y.owner===x.owner)===i);assert.equal(unique.length,2);
  report.cases.push({setup,result});
  await page.evaluate(`__CQC055Versus.abort()`);
 }
 assert.equal(report.cases.flatMap(c=>c.result.births).reduce((set,x)=>set.add(x.uid+':'+x.face),new Set()).size,4);
 report.exceptions=browser.events.filter(e=>e.method==='Runtime.exceptionThrown').map(e=>e.params.exceptionDetails);
 report.failures=browser.events.filter(e=>e.method==='Network.loadingFailed').map(e=>e.params);assert.equal(report.exceptions.length,0);assert.equal(report.failures.length,0);report.status='passed';
}catch(error){report.status='failed';report.error=error.stack;process.exitCode=1;}
finally{if(page){try{await page.evaluate(`(()=>{window.__pass20RestoreBirthObserver?.();if(window.__CQC055Versus?.getState())__CQC055Versus.abort();return true;})()`);if(saved)await page.evaluate(`(()=>{const saved=${JSON.stringify(saved)};for(const k of Object.keys(localStorage))if(!(k in saved))localStorage.removeItem(k);for(const[k,v]of Object.entries(saved))localStorage.setItem(k,v);return true;})()`);}catch{}await page.close();}browser.close();report.finishedAt=new Date().toISOString();const path='/workspace/cqc-pass20-mecha/MECHANICAL_NATIVE_SHOTS_ACTUAL_V1.json';await writeFile(path,JSON.stringify(report,null,2),{flag:'wx'});console.log(JSON.stringify({status:report.status,path,cases:report.cases.length,error:report.error}));}
