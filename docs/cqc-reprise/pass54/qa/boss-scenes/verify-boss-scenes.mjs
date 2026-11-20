import fs from 'node:fs';
import assert from 'node:assert/strict';
import {openPage,until,pause} from '../../browser/cdp.mjs';
const output='/tmp/cqc-p54-20261120/qa/boss-scenes';
const targets=[['m1tank','p54_mgs1_tank_canyon'],['hind_d','p54_mgs1_hind_tower_b'],['ray_mgR','p54_mgr_r00_africa_avenue']];
const results=[];
for(const [id,stageID] of targets){
 const p=await openPage('http://127.0.0.1:8154/cqc/modules/arsenal-files-v044.html?qaBoss='+id,1440,1000);
 try{
  await until(p,`!!window.__CQC044Arsenal && !!window.CQC_P54_BOSS_SCENES && document.querySelectorAll('[data-machine]').length>20`);
  await p.call('Network.setCacheDisabled',{cacheDisabled:true});
  await p.ev(`(async()=>{const def=__CQC044Arsenal.data.machines.find(x=>x.id===${JSON.stringify(id)});window.__qaDef=def;await new Promise(resolve=>{if(!CQC_PASS18_MACHINES.deferLaunch({engine:'arsenal',id:def.id,mode:'practice'},resolve))resolve()});await new Promise(resolve=>{if(!CQC_PASS18_VFX.deferCoreLaunch({mode:'boss',bossId:def.id,source:'arsenal44'},resolve))resolve()});await new Promise(resolve=>{if(!CQC_PASS27_ARSENAL_NATIVE_PLAYER.deferLaunch(def,resolve,'practice'))resolve()});return true})()`);
  const pre=await p.ev(`({stageState:CQC_SERVICE_YARD.status(CQC_SERVICE_YARD.stages.find(x=>x.id===${JSON.stringify(stageID)})).state,records:__CQC044Arsenal.profile()})`);
  await p.ev(`(()=>{window.__qaSceneCalls=[];const api=CQC_PASS27_ARSENAL_NATIVE_SCENES,original=api.deferLaunch;api.deferLaunch=function(def,mode,resume){__qaSceneCalls.push({id:def.id,mode,callbackType:typeof resume,ready:api.ready(def)});return original.call(this,def,mode,resume)};const ctx=document.querySelector('#game').getContext('2d'),draw=ctx.drawImage;window.__qaBackground=null;ctx.drawImage=function(image,...args){if(String(image.src||'').includes('/p54-boss-stages/')){const m=this.getTransform();__qaBackground={url:image.src,args,matrix:[m.a,m.b,m.c,m.d,m.e,m.f]};}return draw.call(this,image,...args)};document.querySelector('[data-machine="${id}"]').click();document.querySelector('#practice').click()})()`);
  await until(p,`!document.querySelector('#play').classList.contains('hidden') && __CQC044Arsenal.getState()?.def?.id===${JSON.stringify(id)} && document.querySelector('#game').dataset.nativeSceneState==='ready'`,60000);
  await pause(200);
  const read=`(()=>{const s=__CQC044Arsenal.getState(),c=CQC_PASS28_ARSENAL_PRESENTATION.camera(s),g=CQC_PASS18_MACHINES.arsenalGeometry(s);return{tick:s.tick,mode:s.mode,player:{x:s.player.x,y:s.player.y},boss:s.boss,camera:{zoom:c.zoom,centerX:c.centerX,tx:c.tx,ty:c.ty,floorY:c.floorY,policy:c.cameraPolicy},geometry:g,dataset:{...document.querySelector('#game').dataset},background:window.__qaBackground,bridge:CQC_P54_BOSS_SCENES.diagnostics().p54}})()`;
  const before=await p.ev(read);
  assert.equal(before.mode,'practice');assert.equal(before.dataset.stageId,stageID);assert.equal(before.dataset.stageGroundY,'598');
  let shot=await p.call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync(output+'/'+id+'-before.png',Buffer.from(shot.data,'base64'));
  await p.call('Input.dispatchKeyEvent',{type:'keyDown',key:'ArrowRight',code:'ArrowRight',windowsVirtualKeyCode:39,nativeVirtualKeyCode:39});
  await pause(650);
  await p.call('Input.dispatchKeyEvent',{type:'keyUp',key:'ArrowRight',code:'ArrowRight',windowsVirtualKeyCode:39,nativeVirtualKeyCode:39});
  await pause(100);
  const after=await p.ev(read);
  assert(after.player.x>before.player.x+40,'Actual ArrowRight did not move player: '+id);
  assert.deepEqual(after.camera,before.camera,'Encounter camera shifted with approaching player: '+id);
  assert.deepEqual(after.background,before.background,'Background draw anchor shifted: '+id);
  assert.equal(after.player.y,598,'Human world feet not on floor598: '+id);
  shot=await p.call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync(output+'/'+id+'-after.png',Buffer.from(shot.data,'base64'));
  const probe=await p.ev(`(()=>{const s=__CQC044Arsenal.getState();const sample=x=>{const t={...s,player:{...s.player,x}};const camera=CQC_PASS28_ARSENAL_PRESENTATION.camera(t);const geometry=CQC_PASS18_MACHINES.arsenalGeometry(t);return{playerX:x,camera:{zoom:camera.zoom,centerX:camera.centerX,tx:camera.tx,ty:camera.ty,floorY:camera.floorY},geometry}};return[sample(120),sample(1120)]})()`);
  assert.deepEqual(probe[0].camera,probe[1].camera,'Same-tick player proximity altered camera');
  const calls=await p.ev('window.__qaSceneCalls');
  const profileAfter=await p.ev('__CQC044Arsenal.profile()');assert.deepEqual(profileAfter.records,pre.records.records);
  const httpErrors=p.responses.filter(x=>x.status>=400);const faviconErrors=httpErrors.filter(x=>new URL(x.url).pathname==='/favicon.ico');const assetErrors=httpErrors.filter(x=>new URL(x.url).pathname!=='/favicon.ico');
  assert.equal(p.exceptions.length,0,'Uncaught page exception');assert.equal(assetErrors.length,0,'HTTP asset errors');
  results.push({id,stageID,pre,sceneLaunchCalls:calls,coldLaunchObserved:calls.some(x=>x.id===id&&x.ready===false),before,after,sameTickPlayerProximityProbe:probe,actualPlayerMoved:after.player.x-before.player.x,backgroundAnchorStable:true,encounterCameraStable:true,worldFootY:after.player.y,recordsUnchanged:true,exceptions:p.exceptions,networkFailures:p.failed,assetHTTPErrors:assetErrors,optionalFaviconErrors:faviconErrors});
  console.log('PASS',id,'movement',after.player.x-before.player.x,'cold',results.at(-1).coldLaunchObserved);
  await p.ev(`document.querySelector('#leave').click()`);
 }catch(error){results.push({id,stageID,error:String(error),exceptions:p.exceptions,networkFailures:p.failed,httpErrors:p.responses.filter(x=>x.status>=400)});console.log('FAIL',id,String(error));}
 finally{await p.close();}
}
const report={schema:'cqc.p54.boss-scenes-real-browser/1',atUTC:new Date().toISOString(),url:'http://127.0.0.1:8154/cqc/modules/arsenal-files-v044.html',viewport:[1440,1000],targets:results,pass:results.length===3&&results.every(r=>!r.error),scope:'Actual card selection, cold scenery launch after other preload gates, practice, real ArrowRight input, real Canvas background coordinates and same-tick camera probe. Three new scenery bindings only, not all historical assets or rig articulation certified.',sourceFilesEdited:false};
fs.writeFileSync(output+'/BOSS_SCENES_BROWSER_QA_PRIVATE_V1.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({pass:report.pass,cases:results.length}));process.exit(report.pass?0:1);
