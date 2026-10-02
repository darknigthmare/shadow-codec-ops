"""Actual cold VR-hover regression; no edits to games or closed QA tools."""
import sys
sys.dont_write_bytecode=True
import argparse,asyncio,datetime,hashlib,importlib.util,json,pathlib,subprocess,urllib.parse
import websockets

ROOT=pathlib.Path('/workspace/cqc-pass9-browser-preparation')
S=pathlib.Path('/workspace/shadow-codec-recovered')
FREEZE=pathlib.Path('/workspace/cqc-pass9-final-qa/actual43-source-freeze.json')
FREEZE_SHA='dea09b3b8870c5c7d3eb6f6fbe88c9540a0852422d7f255c30d6d51546687052'
APP_SHA='eb5cca5cf44634733c85d451eca474e2b5450b06eb132ccaaef45d710869b911'
CSS_SHA='e368860a9d1f7e27a60f9d1d8a703b31a8a7710d5d1b367919dbefc632c1aeb4'
OLD_V4=ROOT/'verify-mobile-toast-fix-v4.py'
OLD_V4_SHA='2cef40f88ddf4843c2a4e9440f71770d0b6fa908704ceb87eaf5a1716e47f49f'
PATHS=['src/app/App.tsx','src/styles/mobile.css','src/components/common/PwaRuntimeBanner.tsx','src/systems/pwaEngine.ts','src/components/cqc/CqcLauncher.tsx','src/styles/vr.css','src/components/vr/VRMissionsScreen.tsx']
def sha(p):
 h=hashlib.sha256()
 with p.open('rb') as f:
  while c:=f.read(1024*1024):h.update(c)
 return h.hexdigest()
def pin(p):return {'path':str(p),'bytes':p.stat().st_size,'sha256':sha(p)}
def source_guard():
 assert sha(S/'src/app/App.tsx')==APP_SHA and sha(S/'src/styles/mobile.css')==CSS_SHA
 assert sha(OLD_V4)==OLD_V4_SHA and sha(FREEZE)==FREEZE_SHA
 d=json.loads(FREEZE.read_text());assert d['confirmedByRoot'] and d['status']=='frozen' and d['entryCount']==43
 for x in d['files']:
  p=pathlib.Path(x['path']);assert p.stat().st_size==x['bytes'] and sha(p)==x['sha256'],str(p)
 assert len(d['files'])==334
 return [pin(S/f) for f in PATHS]

STATE=r'''(()=>{const app=document.querySelector('.app-shell'),b=app?.querySelector(':scope > .pwa-runtime-banner'),r=b?.getBoundingClientRect();return{route:app?.dataset.route,online:navigator.onLine,viewport:{width:innerWidth,height:innerHeight},banner:b?{display:getComputedStyle(b).display,text:b.innerText,connected:b.isConnected,rect:{top:r.top,bottom:r.bottom}}:null,VRResourceTimings:performance.getEntriesByType('resource').filter(e=>/VRMissionsScreen|\/styles\/vr\.css/.test(e.name)).map(e=>({url:e.name,initiator:e.initiatorType,transferSize:e.transferSize})),events:window.__vrHoverQA||[],bodyText:document.querySelector('.main-content')?.innerText.slice(0,900)}})()'''
STYLE=r'''(()=>{const grid=document.querySelector('.vr-missions-grid');if(!grid)throw Error('Actual VR mission library absent');const sheets=[];for(const s of document.styleSheets){const owner=s.ownerNode,id=owner?.getAttribute('data-vite-dev-id'),own=!!id?.endsWith('/src/styles/vr.css')||!!s.href?.includes('VRMissionsScreen');if(!own)continue;let rules;try{rules=[...s.cssRules]}catch(e){throw Error('VR CSS sheet unavailable '+s.href)}const matching=rules.filter(r=>r.selectorText?.split(',').some(x=>x.trim()==='.vr-missions-grid'));sheets.push({href:s.href,devOwnerID:id,ruleCount:rules.length,gridRules:matching.map(r=>({selector:r.selectorText,display:r.style.display,gap:r.style.gap,columns:r.style.gridTemplateColumns})),linkSheetLoaded:!!owner.sheet});}const c=getComputedStyle(grid);return{route:document.querySelector('.app-shell')?.dataset.route,missionRows:document.querySelectorAll('.vr-mission-row').length,systemReady:document.body.innerText.includes('VR MODULE READY'),computed:{display:c.display,gap:c.gap,columns:c.gridTemplateColumns},sheets,errorBoundary:!!document.querySelector('.app-error-panel,.error-boundary'),bodyText:document.querySelector('.main-content')?.innerText.slice(0,1000)}})()'''

async def run(a):
 before=source_guard();head=subprocess.check_output(['git','rev-parse','HEAD'],cwd=S,text=True).strip()
 if a.scope=='production':
  assert a.commit and len(a.commit)==40 and a.root_ready and a.root_ready_sha256
  p=pathlib.Path(a.root_ready);assert sha(p)==a.root_ready_sha256
  ready=json.loads(p.read_text());assert ready['status']=='READY' and ready['commit40']==a.commit==head and ready['baseUrl'].rstrip('/')==a.base.rstrip('/')
 else:assert a.commit is None and head=='7d4719d432cfe82087833f49df02b27fa2f3155f'
 out=ROOT/a.label;out.mkdir(exist_ok=False)
 s=importlib.util.spec_from_file_location('readonly_common','/workspace/cqc-pass6-browser-common.py');C=importlib.util.module_from_spec(s);s.loader.exec_module(C)
 b=C.Browser(out,'vc9-vr-hover');b.env['AGENT_BROWSER_CA_CERT']='/etc/ssl/certs/ca-certificates.crt';b.prefix[b.prefix.index('--args')+1]='--no-sandbox,--disk-cache-size=1,--media-cache-size=1'
 ws=None;session=None;serial=0;observed=[];network=[];requests={};cdp_commands=[];failure=None;shots=[]
 def relevant(url):return 'VRMissionsScreen' in url or '/styles/vr.css' in url
 def process(e):
  method=e.get('method');p=e.get('params',{});rid=p.get('requestId')
  if method=='Network.requestWillBeSent':
   url=p.get('request',{}).get('url','');requests[rid]=url
   if relevant(url):network.append({'method':method,'requestId':rid,'url':url,'resourceType':p.get('type'),'timestamp':p.get('timestamp')})
  elif method in ['Network.responseReceived','Network.loadingFailed','Network.loadingFinished'] and relevant(requests.get(rid,'')):
   response=p.get('response',{});network.append({'method':method,'requestId':rid,'url':requests.get(rid),'status':response.get('status'),'fromDiskCache':response.get('fromDiskCache'),'fromServiceWorker':response.get('fromServiceWorker'),'errorText':p.get('errorText'),'timestamp':p.get('timestamp')})
 async def cdp(method,params=None,attached=True):
  nonlocal serial
  serial+=1;msg={'id':serial,'method':method,'params':params or {}}
  if attached:msg['sessionId']=session
  await ws.send(json.dumps(msg))
  while True:
   response=json.loads(await asyncio.wait_for(ws.recv(),15));process(response)
   if response.get('id')==serial:
    cdp_commands.append({'method':method,'params':params or {},'error':response.get('error')})
    if 'error' in response:raise RuntimeError(str(response['error']))
    return response.get('result',{})
 async def drain():await cdp('Runtime.evaluate',{'expression':'undefined','returnByValue':True})
 def record(name,js=STATE):
  row={'name':name,'result':b.evaluate(js)};observed.append(row);return row['result']
 def screenshot(name):
  b.screenshot(name);shots.append(pin(out/(name+'.png')));assert sum(x['bytes'] for x in shots)<=500*1024
 def open_menu():
  opened=b.evaluate('document.querySelector(".main-drawer-handle")?.getAttribute("aria-expanded")==="true"')
  if not opened:b.call('click','.main-drawer-handle');b.call('wait','450')
 def select(label,route):
  open_menu();b.call('click','button.nav-button[aria-label^="'+label+':"]')
  b.evaluate('(async()=>{for(let i=0;i<150;i++){if(document.querySelector(".app-shell")?.dataset.route==='+json.dumps(route)+')return true;await new Promise(r=>setTimeout(r,100))}throw Error("Actual selected route absent")})()')
 try:
  b.call('set','viewport','390','844');b.call('open','about:blank')
  endpoint=b.call('get','cdp-url')['cdpUrl'];assert urllib.parse.urlsplit(endpoint).hostname in ['localhost','127.0.0.1']
  ws=await websockets.connect(endpoint,max_size=2*1024*1024,max_queue=1000)
  targets=await cdp('Target.getTargets',attached=False);target=next(x for x in targets['targetInfos']if x['type']=='page' and x['url']=='about:blank')
  session=(await cdp('Target.attachToTarget',{'targetId':target['targetId'],'flatten':True},attached=False))['sessionId']
  await cdp('Network.enable');await cdp('Network.setCacheDisabled',{'cacheDisabled':True});await cdp('Network.setBypassServiceWorker',{'bypass':True})
  b.call('open',a.base.rstrip('/')+'/?module=cqc');b.call('wait','--load','networkidle')
  b.evaluate('(async()=>{for(let i=0;i<150;i++){if(document.querySelector(".app-shell")?.dataset.route==="cqc"&&document.querySelector(".cqc-game-frame")?.contentDocument?.readyState==="complete")return true;await new Promise(r=>setTimeout(r,100))}throw Error("Actual CQC parent/iframe not ready")})()')
  b.evaluate('(()=>{window.__vrHoverQA=[];for(const type of ["offline","online","unhandledrejection"])window.addEventListener(type,e=>window.__vrHoverQA.push({type:e.type,trusted:e.isTrusted,online:navigator.onLine,message:e.reason?String(e.reason):null,time:performance.now()}),{passive:true});for(const type of ["pointerover","mouseover"])document.addEventListener(type,e=>{if(e.target.closest("button.nav-button[aria-label^=\\"VR MISSIONS:\\"]"))window.__vrHoverQA.push({type:e.type,trusted:e.isTrusted,online:navigator.onLine,time:performance.now()})},{capture:true,passive:true});return true})()')
  cold=record('fresh-owned-CQC-before-offline-no-VR-module-request');await drain();assert not cold['VRResourceTimings'] and not network,'VR module was already requested'
  b.call('set','offline','on');await asyncio.sleep(.2);off=record('real-native-browser-offline-CQC-banner-hidden');assert off['online'] is False and off['banner'] and off['banner']['display']=='none'
  open_menu();selector='button.nav-button[aria-label^="VR MISSIONS:"]'
  hit=record('real-VR-menu-target-before-hover','(()=>{const b=document.querySelector('+json.dumps(selector)+'),r=b.getBoundingClientRect(),e=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);return{reached:e===b||b.contains(e),rect:{left:r.left,top:r.top,right:r.right,bottom:r.bottom}}})()');assert hit['reached']
  b.call('hover',selector);await asyncio.sleep(1);hover=record('real-trusted-offline-hover-VR');await drain()
  assert any(e['type']=='mouseover' and e['trusted'] and e['online'] is False for e in hover['events'])
  assert not network and not hover['VRResourceTimings'],'Known offline hover initiated a VR request'
  assert not any(e['type']=='unhandledrejection' for e in hover['events'])
  offline_errors=b.call('errors');assert not offline_errors.get('errors'),'Offline hover produced a page error'
  b.call('set','offline','off');await asyncio.sleep(.2);online=record('real-native-browser-network-restored');assert online['online'] and any(e['type']=='online' and e['trusted'] for e in online['events'])
  select('VR MISSIONS','vr')
  b.evaluate('(async()=>{for(let i=0;i<150;i++){if(document.querySelector(".vr-missions-grid")&&document.body.innerText.includes("VR MODULE READY"))return true;if(document.querySelector(".app-error-panel,.error-boundary"))throw Error("Real VR error boundary");await new Promise(r=>setTimeout(r,100))}throw Error("Real VR mission library did not load online")})()')
  styled=record('actual-online-VR-library-and-stylesheet',STYLE);await drain()
  assert styled['route']=='vr' and styled['missionRows']>0 and styled['systemReady'] and styled['computed']['display']=='grid' and styled['computed']['gap']=='18px'
  assert any(s['linkSheetLoaded'] and any(r['display']=='grid' and r['gap']=='18px' for r in s['gridRules'])for s in styled['sheets']), 'Actual VR stylesheet did not apply'
  assert any(x['method']=='Network.responseReceived' and x['status']==200 and not x['fromDiskCache'] and not x['fromServiceWorker']for x in network),'Online VR was not genuinely fetched'
  if a.scope=='production':
   assert any(s['href'] and 'VRMissionsScreen' in s['href'] for s in styled['sheets']),'Production bundled VR stylesheet absent'
   css=b.evaluate('(async()=>{const link=[...document.querySelectorAll("link[rel=stylesheet]")].find(e=>e.href.includes("VRMissionsScreen"));if(!link?.sheet)throw Error("Actual bundled CSS link absent");const r=await fetch(link.href,{cache:"no-store"}),a=await r.arrayBuffer();if(!r.ok)throw Error("Actual bundled CSS fetch failed");return{url:link.href,bytes:a.byteLength,sha256:[...new Uint8Array(await crypto.subtle.digest("SHA-256",a))].map(x=>x.toString(16).padStart(2,"0")).join("")}})()');observed.append({'name':'actual-production-VR-bundled-CSS-byte-hash','result':css})
  screenshot('390-real-online-VR-library-after-offline-hover')
  select('CQC VERSUS','cqc');record('normal-menu-return-to-CQC-after-VR-online');await drain()
  errors=b.call('errors');assert not errors.get('errors'),'Actual page errors after online VR navigation'
  final=record('final-real-network-and-events');assert final['online'] and not any(e['type']=='unhandledrejection' for e in final['events'])
 except Exception as e:
  failure={'type':type(e).__name__,'message':str(e)}
  try:screenshot('actual-failure-page-preserved')
  except Exception:pass
 finally:
  try:b.call('set','offline','off')
  except Exception:pass
  if ws:
   try:
    await drain();await cdp('Network.setCacheDisabled',{'cacheDisabled':False});await cdp('Network.setBypassServiceWorker',{'bypass':False})
   except Exception as e:cdp_commands.append({'cleanupError':str(e)})
   await ws.close()
  errors=b.call('errors');b.close();after=source_guard();assert before==after and subprocess.check_output(['git','rev-parse','HEAD'],cwd=S,text=True).strip()==head
  commands=[]
  for row in b.commands:
   c=row['command'];r=row.get('result',{});commands.append({'command':c if not c or c[0]!='eval' else ['eval',{'executedJavaScriptSHA256':hashlib.sha256(c[1].encode()).hexdigest(),'bytes':len(c[1].encode())}],'exit':row.get('exit'),'success':r.get('success'),'error':r.get('error')})
  proof={'schema':'cqc-pass9-real-offline-hover-and-online-VR-style/v1','checkedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'status':'failed' if failure else 'passed','failure':failure,'scope':a.scope,'baseURL':a.base,'expectedPublishedCommit40':a.commit,'localGitHEADBeforeAndAfter':head,'rootREADY':pin(pathlib.Path(a.root_ready))if a.root_ready else None,'tool':pin(pathlib.Path(__file__)),'closedV4Unchanged':pin(OLD_V4),'sourcePinsBefore':before,'sourcePinsAfter':after,'native334SourceFilesUnchangedBeforeAndAfter':True,'nativeSourceFreeze':pin(FREEZE),'actualArgs':vars(a),'ownedBrowserSession':b.session,'actualBrowserPrefix':b.prefix,'CDPTransportSettingsAndCommands':cdp_commands,'VRNetworkEvents':network,'observations':observed,'actualBrowserCommands':commands,'pageErrors':errors,'screenshots':shots,'cleanup':'owned browser/CDP closed; actual network and cache/service-worker-bypass settings restored','limits':['Offline/online comes from the actual browser network setting; VR hover and navigation use the real existing menu. No synthetic prefetch or window network event is dispatched.','Only passive observers and CDP Network recording are used; no injected CSS, forced DOM hiding, mocked responses, request abortion, app-state mutation or fake engine frames.','The owned renderer has HTTP cache and service-worker response bypass enabled to ensure a cold online fetch; no PWA state/cache is deleted or replaced. These settings test the harder uncached case and are recorded/restored.','Local Vite validates the real route/import flow and applied dev VR stylesheet; it does not certify production bundled CSS. Production separately requires a loaded VRMissionsScreen CSS link, its applied CSS rules and actual response byte hash.','Only the mission library and its CSS are validated; launching or playing every VR mission is outside this regression test.','All closed40/7/273/1018 proofs, native images, original tools and failed attempts remain unmodified.']}
  raw=json.dumps(proof,ensure_ascii=False,indent=2)+'\n';assert len(raw.encode())<=150*1024
  p=out/'verification.json';p.write_text(raw)
  print(json.dumps({'status':proof['status'],'failure':failure,'report':pin(p),'screenshots':shots,'observations':len(observed),'VRRequests':sum(x['method']=='Network.requestWillBeSent' for x in network),'native334Unchanged':True},ensure_ascii=False),flush=True)
  if failure:sys.exit(1)

if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--base',required=True);p.add_argument('--scope',choices=['local','production'],required=True);p.add_argument('--label',required=True);p.add_argument('--commit');p.add_argument('--root-ready');p.add_argument('--root-ready-sha256');asyncio.run(run(p.parse_args()))
