import {writeFile} from 'node:fs/promises';
export async function connect(){
 const version=await fetch('http://127.0.0.1:9263/json/version').then(r=>r.json());
 const ws=new WebSocket(version.webSocketDebuggerUrl),pending=new Map(),events=[],listeners=new Set();let sequence=0;
 await new Promise((resolve,reject)=>{ws.addEventListener('open',resolve,{once:true});ws.addEventListener('error',reject,{once:true});});
 ws.addEventListener('message',event=>{const m=JSON.parse(event.data);if(m.id){const p=pending.get(m.id);if(p){pending.delete(m.id);clearTimeout(p.timeout);m.error?p.reject(Error(JSON.stringify(m.error))):p.resolve(m.result);}}else{events.push(m);for(const fn of listeners)try{fn(m);}catch{}}});
 function send(method,params={},sessionId){return new Promise((resolve,reject)=>{const id=++sequence,timeout=setTimeout(()=>{pending.delete(id);reject(Error('CDP timeout '+method));},90000);pending.set(id,{resolve,reject,timeout});ws.send(JSON.stringify({id,method,params,...sessionId?{sessionId}:{}}));});}
 async function page(url='about:blank'){
  const {targetId}=await send('Target.createTarget',{url:'about:blank'}),{sessionId}=await send('Target.attachToTarget',{targetId,flatten:true});
  for(const method of ['Page.enable','Runtime.enable'])await send(method,{},sessionId);
  await send('Network.enable',{maxTotalBufferSize:64000000,maxResourceBufferSize:10000000},sessionId);
  await send('Network.setCacheDisabled',{cacheDisabled:true},sessionId);await send('Network.setBypassServiceWorker',{bypass:true},sessionId);
  if(url!=='about:blank')await send('Page.navigate',{url},sessionId);
  return{targetId,sessionId,send:(m,p)=>send(m,p,sessionId),async evaluate(expression){const r=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true,userGesture:true},sessionId);if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;},async screenshot(file){const r=await send('Page.captureScreenshot',{format:'png'},sessionId);await writeFile(file,Buffer.from(r.data,'base64'));return file;},close:()=>send('Target.closeTarget',{targetId})};
 }
 return{send,page,events,onEvent:fn=>{listeners.add(fn);return()=>listeners.delete(fn);},close:()=>ws.close()};
}
