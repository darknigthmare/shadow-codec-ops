"""Small supplementary real CDP-touch proof; closed v4 UI runner stays exact."""
import sys
sys.dont_write_bytecode=True
import argparse, asyncio, datetime, hashlib, importlib.util, json, pathlib, subprocess, urllib.parse
import websockets

ROOT=pathlib.Path('/workspace/cqc-pass9-browser-preparation')
UI=ROOT/'verify-mobile-toast-fix-v4.py'
UI_SHA='2cef40f88ddf4843c2a4e9440f71770d0b6fa908704ceb87eaf5a1716e47f49f'
MANIFEST_SHA='7cd007af2691f7b9471e1d6ef66079e016ccad79934ae85cff4e793e066f1c21'
MODULE_SHA='847ec162d224388058ad2e54490e0922636b042608c063c40c06149205bafea7'
ACCESS='document.querySelector(".cqc-game-frame")?.contentDocument?.querySelector("#moduleFrame")?.contentWindow'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def pin(p):return {'path':str(p),'bytes':p.stat().st_size,'sha256':sha(p)}

STATE=r'''(()=>{
 const f1=document.querySelector('.cqc-game-frame'),f2=f1?.contentDocument?.querySelector('#moduleFrame'),w=f2?.contentWindow;
 if(!w?.__CQC055Versus)throw Error('Actual nested game absent');
 const r1=f1.getBoundingClientRect(),r2=f2.getBoundingClientRect(),ox=r1.left+f1.clientLeft+r2.left+f2.clientLeft,oy=r1.top+f1.clientTop+r2.top+f2.clientTop;
 const locate=el=>{const r=el.getBoundingClientRect(),x=Math.round(ox+r.left+r.width/2),y=Math.round(oy+r.top+r.height/2),p=document.elementFromPoint(x,y),middle=p===f1?f1.contentDocument.elementFromPoint(x-r1.left-f1.clientLeft,y-r1.top-f1.clientTop):null,inner=middle===f2?w.document.elementFromPoint(x-ox,y-oy):null;return{label:el.textContent,code:el.dataset.code,point:{x,y},visible:r.width>0&&r.height>0&&x>=0&&x<innerWidth&&y>=0&&y<innerHeight,actuallyReached:inner===el||!!inner&&el.contains(inner)};};
 const a=w.__CQC055Versus,s=a.getState(),b=document.querySelector('.app-shell > .pwa-runtime-banner'),c=b?getComputedStyle(b):null;
 return{wallTime:Date.now(),viewport:{width:innerWidth,height:innerHeight},route:document.querySelector('.app-shell')?.dataset.route,online:navigator.onLine,banner:b?{connected:b.isConnected,display:c.display,text:b.textContent}:null,resume:locate(w.document.querySelector('#resume43')),buttons:[...w.document.querySelectorAll('#touch45 button')].map(locate),diagnostics:a.diagnostics(),state:{frame:s.frame,phase:s.phase,timer:s.timer,a:{uid:s.a.f.uid,x:s.a.x,y:s.a.y,ammo:s.a.r,max:s.a.f.combat.resource.max,meter:s.a.meter},b:{uid:s.b.f.uid,x:s.b.x,ai:s.b.ai},utility:s.a.f.combat.moves.utility},events:w.__nativeTouchProof||[],networkEvents:window.__nativeTouchNetworkEvents||[]};
})()'''

async def run(args):
 assert sha(UI)==UI_SHA,'Closed v4 UI tool differs'
 spec=importlib.util.spec_from_file_location('closed_ui_v4',UI);U=importlib.util.module_from_spec(spec);spec.loader.exec_module(U)
 before=U.source_guard();head=subprocess.check_output(['git','rev-parse','HEAD'],cwd=U.S,text=True).strip()
 if args.scope=='production':
  assert args.commit and len(args.commit)==40 and args.root_ready and args.root_ready_sha256
  ready_path=pathlib.Path(args.root_ready);assert sha(ready_path)==args.root_ready_sha256
  ready=json.loads(ready_path.read_text());assert ready['status']=='READY' and ready['commit40']==args.commit==head
  assert ready['baseUrl'].rstrip('/')==args.base.rstrip('/')
 else:assert args.commit is None,'Local proof cannot assign a published commit'
 out=ROOT/args.label;out.mkdir(exist_ok=False)
 s=importlib.util.spec_from_file_location('readonly_common','/workspace/cqc-pass6-browser-common.py');C=importlib.util.module_from_spec(s);s.loader.exec_module(C)
 b=C.Browser(out,'vc9-native-touch');b.env['AGENT_BROWSER_CA_CERT']='/etc/ssl/certs/ca-certificates.crt'
 b.prefix[b.prefix.index('--args')+1]='--no-sandbox,--disk-cache-size=1,--media-cache-size=1'
 rows=[];cdp_log=[];shots=[];failure=None;ws=None;session=None;seq=0;touches={}
 def observe(name):
  value=b.evaluate(STATE);rows.append({'name':name,'result':value});return value
 async def cdp(method,params=None,attached=True):
  nonlocal seq
  seq+=1;message={'id':seq,'method':method,'params':params or {}}
  if attached:message['sessionId']=session
  await ws.send(json.dumps(message))
  while True:
   response=json.loads(await asyncio.wait_for(ws.recv(),15))
   if response.get('id')==seq:
    cdp_log.append({'id':seq,'method':method,'params':params or {},'sessionId':message.get('sessionId'),'error':response.get('error')})
    if 'error' in response:raise RuntimeError(str(response['error']))
    return response.get('result',{})
 async def start(point,identifier):
  touches[identifier]={'x':point['x'],'y':point['y'],'id':identifier,'radiusX':1,'radiusY':1,'force':1}
  await cdp('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':list(touches.values())})
 async def end(identifier):
  assert set(touches)=={identifier},'Single-finger end requires one active touch'
  touches.clear()
  await cdp('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[]})
 try:
  b.call('set','viewport','390','844');b.call('open',args.base.rstrip('/')+'/?module=cqc');b.call('wait','--load','networkidle')
  runtime=b.evaluate('''(async()=>{const pins={'runtime-manifest.json':MANIFEST,'modules/unified-versus-v055.html':MODULE},rows=[];for(const[p,expected]of Object.entries(pins)){const r=await fetch('/cqc/'+p,{cache:'no-store'});if(!r.ok)throw Error('Actual runtime fetch failed');const a=await r.arrayBuffer(),sha=[...new Uint8Array(await crypto.subtle.digest('SHA-256',a))].map(x=>x.toString(16).padStart(2,'0')).join('');if(sha!==expected)throw Error('Actual runtime differs '+p);rows.push({path:p,bytes:a.byteLength,sha256:sha})}return rows})()'''.replace('MANIFEST',json.dumps(MANIFEST_SHA)).replace('MODULE',json.dumps(MODULE_SHA)))
  b.evaluate('''(async()=>{for(let i=0;i<150;i++){const d=document.querySelector('.cqc-game-frame')?.contentDocument;if(d?.readyState==='complete'&&d.querySelector('[data-mode=versus]')){const t=d.querySelector('[data-mode=versus]');t.dispatchEvent(new d.defaultView.MouseEvent('mouseenter'));t.click();return true}await new Promise(r=>setTimeout(r,100))}throw Error('Actual versus front absent')})()''')
  b.evaluate('(async()=>{for(let i=0;i<150;i++){const w='+ACCESS+';if(w?.__CQC055Versus?.engine){const a=w.__CQC055Versus;a.startExternal({p1:"core__redblaster_mg2",p2:"core__snake",stage:"shadow_heliport",mode:"training",dummy:"idle",autoheal:false,freeResource:false,rounds:1,seconds:99,finishers:"off",source:"pass9-real-native-touch-qa"});await w.CQC_COMBAT_SPRITES.whenReady("core__redblaster_mg2");a.pause(true);w.__nativeTouchProof=[];for(const type of ["pointerdown","pointerup","pointercancel"])w.document.addEventListener(type,e=>{if(e.target.closest("#touch45,#resume43"))w.__nativeTouchProof.push({type:e.type,pointerType:e.pointerType,pointerId:e.pointerId,isPrimary:e.isPrimary,trusted:e.isTrusted,code:e.target.dataset.code||null,id:e.target.id,time:w.performance.now()})},{capture:true,passive:true});return true}await new Promise(r=>setTimeout(r,100))}throw Error("Actual game absent")})()')
  b.evaluate('(()=>{window.__nativeTouchNetworkEvents=[];for(const type of ["offline","online"])window.addEventListener(type,e=>window.__nativeTouchNetworkEvents.push({type:e.type,trusted:e.isTrusted,online:navigator.onLine,time:performance.now()}),{passive:true});return true})()')
  endpoint=b.call('get','cdp-url')['cdpUrl'];assert urllib.parse.urlsplit(endpoint).hostname in ['127.0.0.1','localhost'],'Only owned local Chromium permitted'
  ws=await websockets.connect(endpoint,max_size=2*1024*1024)
  targets=await cdp('Target.getTargets',attached=False)
  expected_url=args.base.rstrip('/')+'/?module=cqc'
  target=next(t for t in targets['targetInfos'] if t['type']=='page' and t['url']==expected_url)
  attached=await cdp('Target.attachToTarget',{'targetId':target['targetId'],'flatten':True},attached=False);session=attached['sessionId']
  await cdp('Emulation.setTouchEmulationEnabled',{'enabled':True,'maxTouchPoints':2})
  b.call('set','offline','on');await asyncio.sleep(.2)
  paused=observe('actual-native-browser-offline-paused')
  assert paused['online'] is False and paused['banner'] and paused['banner']['display']=='none'
  assert paused['resume']['actuallyReached']
  await start(paused['resume']['point'],10);await asyncio.sleep(.08);await end(10)
  b.evaluate('(async()=>{const a='+ACCESS+'.__CQC055Versus;for(let i=0;i<150;i++){if(!a.diagnostics().paused&&a.getState().phase==="fight")return true;await new Promise(r=>setTimeout(r,50))}throw Error("Actual touched Resume did not run")})()')
  initial=observe('native-touch-resume-real-running-fight');assert all(x['visible'] and x['actuallyReached'] for x in initial['buttons'])
  points={x['code']:x['point'] for x in initial['buttons']}
  await start(points['ArrowRight'],11);await asyncio.sleep(.22)
  direction=observe('first-native-finger-holds-real-direction');assert direction['state']['a']['x']>initial['state']['a']['x'] and 'ArrowRight' in direction['diagnostics']['keys']
  await start(points['KeyI'],12);await asyncio.sleep(.25)
  two=observe('second-native-finger-throws-while-direction-held')
  assert {'ArrowRight','KeyI'}<=set(two['diagnostics']['keys']) and two['state']['a']['ammo']<initial['state']['a']['ammo']
  assert any(e['code']=='KeyI' and e['pointerType']=='touch' and e['trusted'] and not e['isPrimary'] for e in two['events'])
  # The failed original hypothesis is retained: touchMove did not release
  # the omitted second finger in this Chromium. End the real pair together.
  touches.clear()
  await cdp('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[]})
  await asyncio.sleep(1)
  spent=observe('both-native-fingers-released-real-reserve-spent');assert not spent['diagnostics']['keys']
  assert all(any(e['type']=='pointerup' and e['code']==code and e['pointerType']=='touch' and e['trusted'] for e in spent['events']) for code in ['ArrowRight','KeyI']), 'Real simultaneous fingers were not both released'
  await start(points['KeyL'],13);await asyncio.sleep(.12);await end(13)
  m=spent['state']['utility'];await asyncio.sleep(min(3,(m['startup']+m['active']+m['recovery']+10)/60))
  recovered=observe('third-native-touch-L-recovery-completes-on-real-frames')
  assert recovered['state']['a']['ammo']>spent['state']['a']['ammo']
  assert all(any(e['code']==code and e['pointerType']=='touch' and e['trusted'] for e in recovered['events']) for code in ['ArrowRight','KeyI','KeyL'])
  assert recovered['state']['frame']>initial['state']['frame'] and recovered['state']['b']['ai'] is False
  b.screenshot('390-real-native-multitouch-then-L-parent-toast-clear')
  shot=pin(out/'390-real-native-multitouch-then-L-parent-toast-clear.png');assert shot['bytes']<=250*1024;shots.append(shot)
  b.call('set','offline','off');await asyncio.sleep(.2)
  online=observe('actual-online-restored-after-native-touch')
  assert online['online'] and any(e['type']=='online' and e['trusted'] for e in online['networkEvents'])
 except Exception as e:failure={'type':type(e).__name__,'message':str(e)}
 finally:
  if ws:
   try:
    if touches:await cdp('Input.dispatchTouchEvent',{'type':'touchCancel','touchPoints':[]})
    if session:await cdp('Emulation.setTouchEmulationEnabled',{'enabled':False})
   except Exception as e:cdp_log.append({'cleanupError':str(e)})
   await ws.close()
  try:b.call('set','offline','off')
  except Exception:pass
  errors=b.call('errors');b.close();after=U.source_guard();assert before==after and sha(UI)==UI_SHA
  assert subprocess.check_output(['git','rev-parse','HEAD'],cwd=U.S,text=True).strip()==head
  commands=[]
  for row in b.commands:
   command=row['command'];result=row.get('result',{})
   commands.append({'command':command if not command or command[0]!='eval' else ['eval',{'executedJavaScriptSHA256':hashlib.sha256(command[1].encode()).hexdigest(),'bytes':len(command[1].encode())}],'exit':row.get('exit'),'success':result.get('success'),'error':result.get('error')})
  proof={'schema':'cqc-pass9-real-native-browser-multitouch/v1','checkedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'status':'failed' if failure else 'passed','failure':failure,'scope':args.scope,'baseURL':args.base,'expectedPublishedCommit40':args.commit,'localGitHEADBeforeAndAfter':head,'rootREADY':pin(pathlib.Path(args.root_ready)) if args.root_ready else None,'sourcePinsBefore':before,'sourcePinsAfter':after,'native334SourceFilesUnchangedBeforeAndAfter':True,'nativeSourceFreeze':pin(U.FREEZE),'closedV4RunnerUnchanged':pin(UI),'tool':pin(pathlib.Path(__file__)),'actualArgs':vars(args),'ownedBrowserSession':b.session,'actualBrowserPrefix':b.prefix,'CDPEndpoint':locals().get('endpoint'),'ownedTopTarget':locals().get('target'),'actualRuntimeHashGETs':locals().get('runtime'),'actualCDPCommands':cdp_log,'actualBrowserCommands':commands,'observations':rows,'screenshots':shots,'pageErrors':errors,'cleanup':'owned browser/CDP closed; touches released and real network restored','limits':['Chrome CDP dispatchTouchEvent generates trusted native browser pointerType:touch events through the actual page/iframe hit-testing pipeline; no synthetic DOM pointer event is dispatched.','Two live finger IDs are held simultaneously; the actual game handler and real engine frames consume direction and ammunition. Both fingers are then released together by native touchEnd[].',
 'Original b107 runner and its failed partial-release hypothesis remain preserved; this distinct version makes no claim of separate-finger release support.','This is browser touch emulation, not certification on a physical touch device or every mobile platform.','PWA offline/online events come from the real browser network setting. No mocked PWA state, injected CSS, forced DOM hiding or fake engine state/frames.','Match/pause use the normal public API; Resume, I and L are actual native browser touches. No PNG, application, Git, deployment or closed-proof mutation.','Closed v4, earlier native273/HTTP1018, their screenshots and failed local harness attempts remain exact.']}
  raw=json.dumps(proof,ensure_ascii=False,indent=2)+'\n';assert len(raw.encode())<=100*1024,'Small native-touch report budget exceeded'
  p=out/'verification.json';p.write_text(raw)
  print(json.dumps({'status':proof['status'],'failure':failure,'report':pin(p),'screenshots':shots,'observations':len(rows),'native334Unchanged':True},ensure_ascii=False),flush=True)
  if failure:sys.exit(1)

if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--base');p.add_argument('--scope',choices=['local','production']);p.add_argument('--label');p.add_argument('--commit');p.add_argument('--root-ready');p.add_argument('--root-ready-sha256');p.add_argument('--run-after-root-ready',action='store_true');a=p.parse_args()
 if not a.run_after_root_ready:print(json.dumps({'status':'prepared-not-executed','requiresActualRootREADY':True,'closedV4SHA256':UI_SHA,'cases':'390 trusted native touch Resume, simultaneous direction+I, ending both fingers together, L restoration; real offline/online','maximumJSONBytes':102400,'optionalPNGMaxBytes':256000}));sys.exit(0)
 assert a.base and a.scope and a.label
 asyncio.run(run(a))
