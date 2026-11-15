// Owned, local-only visual source review. No product code, game state or PNG pixels are edited.
import{mkdir,writeFile,readFile}from'node:fs/promises';import{spawn}from'node:child_process';import{createHash}from'node:crypto';
const base='@PROJECT_ROOT@',out=base+'/retro-five/final-art-review-v1',port=54387,profile=out+'/owned-chrome-profile',sha=b=>createHash('sha256').update(b).digest('hex');
try{await fetch('http://127.0.0.1:'+port+'/json/version',{signal:AbortSignal.timeout(300)});throw Error('Refuse reuse of preexisting CDP port');}catch(e){if(e.message.startsWith('Refuse'))throw e;}
await mkdir(profile);const child=spawn('/usr/bin/chromium',['--headless=new','--no-sandbox','--disable-gpu','--disable-background-networking','--no-first-run','--no-default-browser-check','--remote-debugging-address=127.0.0.1','--remote-debugging-port='+port,'--user-data-dir='+profile,'about:blank'],{stdio:['ignore','ignore','ignore']});
const report={schema:'cqc.pass41.owned-local-source-axis-capture/1',profile,childPID:child.pid,port,localBaseURL:'http://127.0.0.1:8842',productStateMutated:false,sourcePNGMutated:false,rows:[],errors:[]};let socket;
const pause=ms=>new Promise(r=>setTimeout(r,ms));
try{
 let targets;for(let i=0;i<100;i++){try{targets=await(await fetch('http://127.0.0.1:'+port+'/json/list')).json();if(targets.some(t=>t.type==='page'))break;}catch{}await pause(100);}
 const target=targets?.find(t=>t.type==='page');if(!target)throw Error('Owned Chrome page unavailable');socket=new WebSocket(target.webSocketDebuggerUrl);await new Promise((r,j)=>{socket.onopen=r;socket.onerror=j});let counter=0;const pending=new Map();const listeners=new Set();socket.onmessage=event=>{const m=JSON.parse(event.data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);if(p)m.error?p.reject(Error(JSON.stringify(m.error))):p.resolve(m.result);}else for(const f of listeners)f(m);};const call=(method,params={})=>new Promise((resolve,reject)=>{const id=++counter;pending.set(id,{resolve,reject});socket.send(JSON.stringify({id,method,params}));});
 listeners.add(m=>{if(m.method==='Runtime.exceptionThrown')report.errors.push(m.params.exceptionDetails);});
 await call('Page.enable');await call('Runtime.enable');await call('Emulation.setDeviceMetricsOverride',{width:1700,height:1900,deviceScaleFactor:1,mobile:false});
 for(const uid of['roster50__mei_mgs1','roster50__nastasha_mgs1','roster50__emma_mgs2','roster50__campbell_mg2']){
  const v=uid.includes('campbell')?'v1':'v2',rel='integration/retro-five/'+uid+'/manual-axis-proposal-'+v+'/source-axes-review.html',url='http://127.0.0.1:8842/'+rel;
  const loaded=new Promise(resolve=>{const listener=m=>{if(m.method==='Page.loadEventFired'){listeners.delete(listener);resolve();}};listeners.add(listener);});await call('Page.navigate',{url});await Promise.race([loaded,pause(10000).then(()=>{throw Error('Local source review load timed out')})]);await pause(350);
  const state=await call('Runtime.evaluate',{expression:'JSON.stringify({url:location.href,articleCount:document.querySelectorAll("article").length,imageFiles:[...new Set([...document.querySelectorAll("svg image")].map(n=>n.getAttribute("href")))]})',returnByValue:true});const observed=JSON.parse(state.result.value);if(observed.url!==url||observed.articleCount!==32)throw Error('Wrong source review document');
  for(const side of['right','left']){
   const expression=side==='right'?'window.scrollTo(0,0)':'window.scrollTo(0,document.querySelectorAll("article")[16].offsetTop-145)';await call('Runtime.evaluate',{expression});await pause(100);const screen=await call('Page.captureScreenshot',{format:'jpeg',quality:91,fromSurface:true,captureBeyondViewport:false});const bytes=Buffer.from(screen.data,'base64'),file=out+'/'+uid+'__'+side.toUpperCase()+'_16_SOURCE_AXES.jpg';await writeFile(file,bytes,{flag:'wx'});report.rows.push({uid,side,url,observed,screenshot:{path:file,bytes:bytes.length,sha256:sha(bytes)},qualification:'Actual local HTML/SVG review view of exact source PNGs with non-mutating proposed axis overlays; not game QA or art approval.'});
  }
 }
 await call('Browser.close').catch(()=>{});
}catch(error){report.failure=String(error.stack||error);throw error;}finally{
 if(socket?.readyState===1)socket.close();await Promise.race([new Promise(r=>child.once('exit',r)),pause(5000)]);if(child.exitCode===null)child.kill('SIGTERM');report.ownedChromeClosed=child.exitCode!==null;await writeFile(out+'/CAPTURE_ACTUAL_V1.json',JSON.stringify(report,null,2)+'\n',{flag:'wx'});console.log(JSON.stringify({screens:report.rows.length,errors:report.errors.length,ownedChromeClosed:report.ownedChromeClosed,failure:report.failure||null}));
}
