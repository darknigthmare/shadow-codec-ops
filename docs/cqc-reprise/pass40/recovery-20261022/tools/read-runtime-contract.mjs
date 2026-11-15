// Read the running game; never alter combat profiles, costumes, or player state.
import {mkdir, writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const [base='http://127.0.0.1:8340/', debug='http://127.0.0.1:9455', out='/tmp/cqc-p40-resume-20261022/soviet-integration'] = process.argv.slice(2);
const pages=await (await fetch(debug+'/json/list')).json();
const page=pages.find(p=>p.type==='page');
if(!page)throw Error('Owned browser page absent');
const ws=new WebSocket(page.webSocketDebuggerUrl),pending=new Map();let serial=0;
await new Promise((resolve,reject)=>{ws.onopen=resolve;ws.onerror=reject;});
ws.onmessage=event=>{const value=JSON.parse(event.data);if(value.id){const task=pending.get(value.id);if(task){pending.delete(value.id);value.error?task.reject(Error(JSON.stringify(value.error))):task.resolve(value.result);}}};
function send(method,params={}){return new Promise((resolve,reject)=>{const id=++serial;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));});}
await send('Page.enable');await send('Runtime.enable');
await send('Page.navigate',{url:new URL('modules/unified-versus-v055.html',base).href});
let snapshot;
for(let attempt=0;attempt<60;attempt++){
 const result=await send('Runtime.evaluate',{expression:`(()=>{const r=globalThis.CQC_COMBAT_SPRITES;const e=r?.getEntry?.('core__snake',{costume:'original'});const f=globalThis.__CQC053Versus?.fighters?.find(x=>x.uid==='core__snake');if(!e||!f)return null;return{uid:'core__snake',entry:e,finalFighter:f,url:location.href};})()`,returnByValue:true});
 snapshot=result.result?.value;if(snapshot)break;
 await new Promise(resolve=>setTimeout(resolve,250));
}
if(!snapshot)throw Error('Running native Snake entry absent');
const sourceCounts={};for(const side of ['actions','oppositeActions']){const groups=snapshot.entry[side]||{};sourceCounts[side]={groups:Object.keys(groups).length,temporalFrames:Object.values(groups).reduce((sum,g)=>sum+(g.frames?.length||0),0),physicalSourceFrames:new Set(Object.values(groups).flatMap(g=>(g.frames||[]).map(f=>JSON.stringify([f.file,f.rect])))).size};}
snapshot={schema:'cqc.p40.running-snake-contract/1',observedAt:new Date().toISOString(),readOnly:true,sourceCounts,...snapshot};
await mkdir(out,{recursive:true});const raw=Buffer.from(JSON.stringify(snapshot,null,2)+'\n');const path=out+'/RUNNING_SNAKE_CONTRACT_ACTUAL.json';await writeFile(path,raw);console.log(JSON.stringify({path,bytes:raw.length,sha256:createHash('sha256').update(raw).digest('hex'),sourceCounts,finalMoveFamilies:Object.fromEntries(Object.entries(snapshot.finalFighter.combat.moves).map(([key,value])=>[key,{kind:value.kind,tag:value.tag,startup:value.startup}]))}));
ws.close();
