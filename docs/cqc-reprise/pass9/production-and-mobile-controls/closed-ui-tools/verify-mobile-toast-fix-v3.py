"""Actual parent-UI route/gesture QA, separate from closed native/HTTP runs."""
import sys
sys.dont_write_bytecode=True
import argparse, datetime, hashlib, importlib.util, json, pathlib, subprocess, time

ROOT=pathlib.Path('/workspace/cqc-pass9-browser-preparation')
S=pathlib.Path('/workspace/shadow-codec-recovered')
FREEZE=pathlib.Path('/workspace/cqc-pass9-final-qa/actual43-source-freeze.json')
FREEZE_SHA='dea09b3b8870c5c7d3eb6f6fbe88c9540a0852422d7f255c30d6d51546687052'
APP_SHA='ea4d24ab423d3026718708f5f7501538832cc2de8108e0024e74780959267300'
CSS_SHA='e368860a9d1f7e27a60f9d1d8a703b31a8a7710d5d1b367919dbefc632c1aeb4'
PATHS=['src/app/App.tsx','src/styles/mobile.css','src/components/common/PwaRuntimeBanner.tsx','src/systems/pwaEngine.ts','src/components/cqc/CqcLauncher.tsx']
ACCESS='document.querySelector(".cqc-game-frame")?.contentDocument?.querySelector("#moduleFrame")?.contentWindow'
def sha(p):
 h=hashlib.sha256()
 with p.open('rb') as f:
  while c:=f.read(1024*1024):h.update(c)
 return h.hexdigest()
def pin(p):return {'path':str(p),'bytes':p.stat().st_size,'sha256':sha(p)}
def source_guard():
 assert sha(S/'src/app/App.tsx')==APP_SHA and sha(S/'src/styles/mobile.css')==CSS_SHA
 assert sha(FREEZE)==FREEZE_SHA
 d=json.loads(FREEZE.read_text());assert d['confirmedByRoot'] and d['status']=='frozen' and d['entryCount']==43
 for row in d['files']:
  p=pathlib.Path(row['path']);assert p.stat().st_size==row['bytes'] and sha(p)==row['sha256'],str(p)
 assert len(d['files'])==334
 return [pin(S/f) for f in PATHS]

TOP=r'''(()=>{const e=document.querySelector('.app-shell'),b=e?.querySelector(':scope > .pwa-runtime-banner');const r=b?.getBoundingClientRect(),c=b?getComputedStyle(b):null;return{route:e?.dataset.route,online:navigator.onLine,viewport:{width:innerWidth,height:innerHeight},banner:b?{connected:b.isConnected,display:c.display,visible:c.display!=='none'&&c.visibility!=='hidden'&&r.width>0&&r.height>0,text:b.innerText,rect:{left:r.left,top:r.top,right:r.right,bottom:r.bottom,width:r.width,height:r.height},sameElementAsFirstOffline:b===window.__toastQARef}:null,realNetworkEvents:window.__toastNetworkEvents||[],drawer:document.querySelector('.main-drawer-handle')?.getAttribute('aria-expanded')}})()'''
MEASURE=r'''(()=>{
 const rect=r=>({left:r.left,top:r.top,right:r.right,bottom:r.bottom,width:r.width,height:r.height});
 const f1=document.querySelector('.cqc-game-frame'),f2=f1?.contentDocument?.querySelector('#moduleFrame'),w=f2?.contentWindow;
 if(!w?.__CQC055Versus)throw Error('Actual nested versus absent');
 const r1=f1.getBoundingClientRect(),r2=f2.getBoundingClientRect(),ox=r1.left+f1.clientLeft+r2.left+f2.clientLeft,oy=r1.top+f1.clientTop+r2.top+f2.clientTop;
 const describe=e=>e?{tag:e.tagName,id:e.id,className:typeof e.className==='string'?e.className:null,code:e.dataset?.code,text:e.textContent?.trim().slice(0,80)}:null;
 const map=el=>{const r=el.getBoundingClientRect(),c=w.getComputedStyle(el),x=ox+r.left+r.width/2,y=oy+r.top+r.height/2,top=rect({left:ox+r.left,top:oy+r.top,right:ox+r.right,bottom:oy+r.bottom,width:r.width,height:r.height});
  const p=document.elementFromPoint(x,y),middle=p===f1?f1.contentDocument.elementFromPoint(x-r1.left-f1.clientLeft,y-r1.top-f1.clientTop):null,inner=middle===f2?w.document.elementFromPoint(x-ox,y-oy):null;
  return{label:el.textContent,code:el.dataset.code,id:el.id,display:c.display,visible:r.width>0&&r.height>0&&c.visibility!=='hidden'&&c.display!=='none',local:rect(r),top,center:{x,y},centerInTopViewport:x>=0&&x<innerWidth&&y>=0&&y<innerHeight,hitPath:[describe(p),describe(middle),describe(inner)],actualElementReached:inner===el||!!inner&&el.contains(inner)};};
 const main=document.querySelector('.main-content'),a=w.__CQC055Versus,s=a.getState();
 return{wallTime:Date.now(),moduleViewport:{width:w.innerWidth,height:w.innerHeight},frames:{outer:rect(r1),inner:rect(r2),outerTransform:getComputedStyle(f1).transform,innerTransform:f1.contentWindow.getComputedStyle(f2).transform},main:{rect:rect(main.getBoundingClientRect()),scrollTop:main.scrollTop,scrollHeight:main.scrollHeight,clientHeight:main.clientHeight},touchVisible:w.getComputedStyle(w.document.querySelector('#touch45')).display!=='none',buttons:[...w.document.querySelectorAll('#touch45 button')].map(map),resume:map(w.document.querySelector('#resume43')),desktopHelpVisible:w.getComputedStyle(w.document.querySelector('.game-help')).display!=='none',pointerEvents:w.__toastQAPointers||[],diagnostics:a.diagnostics(),state:s?{phase:s.phase,phaseT:s.phaseT,frame:s.frame,a:{uid:s.a.f.uid,x:s.a.x,y:s.a.y,r:s.a.r,meter:s.a.meter,move:s.a.move,resource:s.a.f.combat.resource},b:{x:s.b.x,ai:s.b.ai},utility:s.a.f.combat.moves.utility}:null};
})()'''

def run(args):
 before=source_guard();head=subprocess.check_output(['git','rev-parse','HEAD'],cwd=S,text=True).strip()
 if args.scope=='production':
  assert args.commit and len(args.commit)==40 and args.root_ready and args.root_ready_sha256
  ready_path=pathlib.Path(args.root_ready);assert sha(ready_path)==args.root_ready_sha256
  ready=json.loads(ready_path.read_text());assert ready['status']=='READY' and ready['commit40']==args.commit
  assert args.base.rstrip('/')==ready['baseUrl'].rstrip('/') and head==args.commit
 else:assert not args.commit,'Local working-tree validation must not assign a fake publication commit'
 out=ROOT/args.label;out.mkdir(exist_ok=False)
 spec=importlib.util.spec_from_file_location('readonly_common','/workspace/cqc-pass6-browser-common.py');C=importlib.util.module_from_spec(spec);spec.loader.exec_module(C)
 b=C.Browser(out,'vc9-toast-fix');b.env['AGENT_BROWSER_CA_CERT']='/etc/ssl/certs/ca-certificates.crt'
 b.prefix[b.prefix.index('--args')+1]='--no-sandbox,--disk-cache-size=1,--media-cache-size=1'
 observations=[];screens=[];failure=None
 def row(name,js):
  result=b.evaluate(js);observations.append({'name':name,'result':result});return result
 def top(name):return row(name,TOP)
 def module(js):return b.evaluate('(()=>{const w='+ACCESS+';if(!w)throw Error("Actual module absent");return w.eval('+json.dumps(js)+')})()')
 def navigate(route):
  drawer=b.evaluate('(()=>{const h=document.querySelector(".main-drawer-handle");return h&&getComputedStyle(h).display!=="none"&&h.getAttribute("aria-expanded")==="false"})()')
  if drawer:
   b.call('click','.main-drawer-handle');time.sleep(.45)
  label={'home':'HOME','settings':'SETTINGS','cqc':'CQC VERSUS'}[route]
  selector='button.nav-button[aria-label^="'+label+':"]'
  hit=b.evaluate('(()=>{const b=document.querySelector('+json.dumps(selector)+');const r=b.getBoundingClientRect(),e=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);return{reached:e===b||b.contains(e),target:{left:r.left,top:r.top,right:r.right,bottom:r.bottom},hit:e?{tag:e.tagName,className:e.className,text:e.textContent.slice(0,80)}:null}})()')
  if not hit['reached']:
   b.call('scrollintoview',selector);time.sleep(.2)
  b.call('click',selector)
  b.evaluate('(async()=>{for(let i=0;i<150;i++){if(document.querySelector(".app-shell")?.dataset.route==='+json.dumps(route)+')return true;await new Promise(r=>setTimeout(r,100))}throw Error("Actual route not ready")})()')
  time.sleep(.15)
 def launch():
  b.evaluate('''(async()=>{for(let i=0;i<150;i++){const d=document.querySelector('.cqc-game-frame')?.contentDocument;if(d?.readyState==='complete'&&d.querySelector('[data-mode=versus]')){const t=d.querySelector('[data-mode=versus]');t.dispatchEvent(new d.defaultView.MouseEvent('mouseenter'));t.click();return true}await new Promise(r=>setTimeout(r,100))}throw Error('Actual front not ready')})()''')
  b.evaluate('(async()=>{for(let i=0;i<150;i++){const w='+ACCESS+';if(w?.__CQC055Versus?.engine){const a=w.__CQC055Versus;a.startExternal({p1:"core__redblaster_mg2",p2:"core__snake",stage:"shadow_heliport",mode:"training",dummy:"idle",autoheal:false,freeResource:false,rounds:1,seconds:99,finishers:"off",source:"pass9-parent-toast-ui-qa"});await w.CQC_COMBAT_SPRITES.whenReady("core__redblaster_mg2");a.pause(true);w.__toastQAPointers=[];w.document.querySelector("#touch45").addEventListener("pointerdown",e=>w.__toastQAPointers.push({type:e.type,trusted:e.isTrusted,code:e.target.dataset.code,time:w.performance.now()}),{capture:true,passive:true});return{nativeLoaded:true,uid:a.getState().a.f.uid}}await new Promise(r=>setTimeout(r,100))}throw Error("Actual versus absent")})()')
 def screen(name):
  b.screenshot(name);screens.append(pin(out/(name+'.png')))
  assert sum(x['bytes'] for x in screens)<3*1024*1024,'Sparse UI screenshot budget exceeded'
 def pointer(point,label,hold=.2):
  b.call('mouse','move',str(point['x']),str(point['y']));b.call('mouse','down');time.sleep(hold)
  held=row(label+'-real-pointer-held',MEASURE);b.call('mouse','up');time.sleep(.12)
  released=row(label+'-real-pointer-released',MEASURE);return held,released
 try:
  for width in [390,980,981]:
   b.call('set','offline','off');b.call('set','viewport',str(width),'844');b.call('open',args.base.rstrip('/')+'/?module=cqc');b.call('wait','--load','networkidle')
   # Preload lazy routes through the actual menu, while the network is available.
   navigate('home');top(str(width)+'-preloaded-home-online');navigate('settings');top(str(width)+'-preloaded-settings-online');navigate('cqc');launch()
   b.evaluate('(()=>{window.__toastNetworkEvents=[];for(const type of ["offline","online"])window.addEventListener(type,e=>window.__toastNetworkEvents.push({type:e.type,trusted:e.isTrusted,online:navigator.onLine,time:performance.now()}),{passive:true});return true})()')
   b.call('set','offline','on');time.sleep(.2)
   state=top(str(width)+'-real-browser-offline-cqc')
   assert state['online'] is False and state['banner'] and state['banner']['visible']==(width>980)
   assert any(x['type']=='offline' and x['trusted'] for x in state['realNetworkEvents'])
   b.evaluate('window.__toastQARef=document.querySelector(".app-shell > .pwa-runtime-banner");true')
   geom=row(str(width)+'-real-module-layout-before-scroll',MEASURE)
   if geom['touchVisible']:
    assert width==390 and len(geom['buttons'])==12
    bottom=max(x['top']['bottom'] for x in geom['buttons']);delta=max(0,bottom-839)
    if delta:b.call('scroll','down',str(int(delta+12)),'--selector','.main-content')
    geom=row(str(width)+'-real-all-twelve-touch-centres-after-normal-scroll',MEASURE)
    assert all(x['visible'] and x['centerInTopViewport'] for x in geom['buttons']), 'A real touch button centre is outside the viewport while paused'
    assert geom['resume']['actualElementReached']
    pointer(geom['resume']['center'],str(width)+'-actual-resume-button',.06)
    module('(async()=>{const a=window.__CQC055Versus;for(let i=0;i<150;i++){if(!a.diagnostics().paused&&a.getState().phase==="fight")return true;await new Promise(r=>setTimeout(r,50))}throw Error("Actual resumed fight not running")})()')
    geom=row(str(width)+'-real-active-fight-all-twelve-centres-before-direction',MEASURE)
    assert all(x['visible'] and x['centerInTopViewport'] and x['actualElementReached'] for x in geom['buttons']), 'A real touch centre remains occluded after actual Resume'
    right=next(x for x in geom['buttons'] if x['code']=='ArrowRight');x0=geom['state']['a']['x']
    held,released=pointer(right['center'],str(width)+'-actual-direction',.3)
    assert held['state']['a']['x']>x0 and 'ArrowRight' in held['diagnostics']['keys'] and not held['diagnostics']['paused']
    geom=row(str(width)+'-before-actual-I-then-lower-row-L',MEASURE)
    i=next(x for x in geom['buttons'] if x['code']=='KeyI');r0=geom['state']['a']['r']
    pointer(i['center'],str(width)+'-actual-I-grenade-input',.1);time.sleep(1)
    spent=row(str(width)+'-actual-grenade-reserve-spent',MEASURE);assert spent['state']['a']['r']<r0
    l=next(x for x in spent['buttons'] if x['code']=='KeyL');assert l['actualElementReached']
    pointer(l['center'],str(width)+'-actual-lower-row-L-recovery',.1)
    m=spent['state']['utility'];time.sleep(min(3,(m['startup']+m['active']+m['recovery']+10)/60))
    restored=row(str(width)+'-actual-lower-row-L-resource-restored',MEASURE);assert restored['state']['a']['r']>spent['state']['a']['r']
    assert all(any(e['trusted'] and e['code']==code for e in restored['pointerEvents']) for code in ['ArrowRight','KeyI','KeyL'])
    screen('390-CQC-real-offline-no-parent-toast-and-accessible-controls')
   else:
    assert geom['desktopHelpVisible'] and not any(x['visible'] for x in geom['buttons'])
    if width==981:screen('981-CQC-original-desktop-parent-status-remains-visible')
   # Retain the real offline banner element through normal React route transitions.
   for route in ['home','settings','cqc']:
    navigate(route);state=top(str(width)+'-real-offline-route-'+route)
    assert state['banner'] and state['banner']['sameElementAsFirstOffline'] and state['online'] is False
    assert state['banner']['visible']==(route!='cqc' or width>980)
    if width==390 and route=='home':screen('390-HOME-real-offline-parent-status-still-visible')
   b.call('set','offline','off');time.sleep(.2);online=top(str(width)+'-actual-network-restored')
   assert online['online'] and any(x['type']=='online' and x['trusted'] for x in online['realNetworkEvents'])
   # The local dev server does not supply a service worker: returning offline can
   # fail an iframe navigation. Restore via normal routes rather than a fake frame.
   navigate('home');navigate('cqc');launch();row(str(width)+'-online-restored-real-module-ready',MEASURE)
 except Exception as e:failure={'type':type(e).__name__,'message':str(e)}
 finally:
  try:b.call('set','offline','off')
  except Exception:pass
  errors=b.call('errors')
  b.close();after=source_guard();assert before==after
  assert subprocess.check_output(['git','rev-parse','HEAD'],cwd=S,text=True).strip()==head
  report={'schema':'cqc-pass9-real-parent-toast-fix-browser/v1','checkedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'status':'failed' if failure else 'passed','failure':failure,'scope':args.scope,'baseURL':args.base,'expectedPublishedCommit40':args.commit,'localGitHEADAtStartAndEnd':head,'sourcePinsBefore':before,'sourcePinsAfter':after,'native334SourcesUnchangedBeforeAndAfter':True,'nativeSourceFreeze':pin(FREEZE),'tool':pin(pathlib.Path(__file__)),'actualArgs':vars(args),'actualBrowserPrefix':b.prefix,'commands':b.commands,'observations':observations,'screenshots':screens,'browserPageErrors':errors,'cleanup':'owned browser closed; actual network restored','limits':['Real browser offline/online settings produce trusted native browser network events; no synthetic install/offline window event was dispatched.','Routes use the existing application menu. The same offline banner DOM element is retained across CQC, HOME and SETTINGS; CSS alone determines its visibility.','Training match and pause use the public game API; Resume and control presses are genuine browser mouse pointer gestures at actual DOM centres, and real engine frames run normally.','No injected CSS, DOM hiding, mocked PWA state, fake engine frames or native pixel changes.','At 980/981 the actual nested module selects desktop controls; the 12 touch buttons are verified only when visible at 390.','Vite local has no service-worker offline guarantee. Offline iframe navigations may fail while parent route/UI checks remain meaningful, and the real module is loaded again online through the normal menu.','This UI follow-up does not rewrite the closed 273 native/physics checks or the 1018 production HTTP checks for commit26c5a845.']}
  p=out/'verification.json';p.write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
  print(json.dumps({'status':report['status'],'failure':failure,'path':str(p),'sha256':sha(p),'screenshots':screens,'observations':len(observations),'sourceFilesUnchanged':334},ensure_ascii=False),flush=True)
  if failure:sys.exit(1)

if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--base',required=True);p.add_argument('--scope',choices=['local','production'],required=True);p.add_argument('--label',required=True);p.add_argument('--commit');p.add_argument('--root-ready');p.add_argument('--root-ready-sha256');run(p.parse_args())
