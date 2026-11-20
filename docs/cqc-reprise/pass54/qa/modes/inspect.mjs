import {openPage,until,pause} from '../../browser/cdp.mjs';
import fs from 'node:fs';
const base='http://127.0.0.1:8154/cqc/modules/';
const output='/tmp/cqc-p54-20261120/qa/modes';
const pages={};
for (const [name,file] of Object.entries({core:'core-v032.html',academy:'combat-academy-v053.html',chronicles:'arcade-chronicles-v055.html'})) {
 const page=await openPage(base+file);pages[name]=page;
 await until(page,'document.readyState==="complete"');await pause(1000);
 const info=await page.ev(`({title:document.title,coreAPI:!!window.CQC,modeAdapter:!!window.CQC_P54_MODE_SCENES,serviceStages:window.CQC_SERVICE_YARD?.stages.map(x=>({id:x.id,name:x.name})),selects:[...document.querySelectorAll('select')].map(s=>({id:s.id,value:s.value,options:s.options.length,last:[...s.options].slice(-7).map(o=>({value:o.value,label:o.textContent}))})),iframes:[...document.querySelectorAll('iframe')].map(f=>({id:f.id,src:f.src})),coreFlow:!!window.CQC_CORE_MATCH_FLOW_PASS17_INSTANCE,academyAPI:!!window.__CQC053Academy,arcadeAPI:!!window.__CQC053Arcade})`);
 fs.writeFileSync(output+'/'+name+'-inspect.json',JSON.stringify({info,exceptions:page.exceptions,failed:page.failed,responses:page.responses.filter(x=>x.status>=400)},null,2));
 console.log(JSON.stringify({name,target:page.target.id,info,exceptions:page.exceptions.map(x=>x.exception?.description||x.text),failed:page.failed.map(x=>x.errorText),badResponses:page.responses.filter(x=>x.status>=400)}));
}
for(const [name,p] of Object.entries(pages)){await p.close()}
