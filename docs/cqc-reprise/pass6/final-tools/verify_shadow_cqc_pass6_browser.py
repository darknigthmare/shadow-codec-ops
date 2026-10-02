#!/usr/bin/env python3
"""PASS6 final Shadow tab/direct CQC browser QA; requires root final sync signal."""
from pathlib import Path
import argparse,hashlib,importlib.util,json,os,signal,socket,subprocess,time,urllib.request
def load(name,path):
 spec=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m
C=load('p6common','/workspace/cqc-pass6-browser-common.py')
P5=load('p5readonly','/workspace/verify_shadow_cqc_pass5_tab.py')
ROOT=Path('/workspace/shadow-codec-recovered');SOURCE=C.SOURCE
STORIES=['core__runner_mg2','core__redblaster_mg2']
def static_preflight():
 manifest_path=ROOT/'public/cqc/runtime-manifest.json';d=json.loads(manifest_path.read_text());table={e['path']:e for e in d['files']};assert len(table)==len(d['files'])
 for e in d['files']:
  raw=(ROOT/'public/cqc'/e['path']).read_bytes();assert len(raw)==e['bytes'] and hashlib.sha256(raw).hexdigest()==e['sha256'],e['path']
  assert e['path'].split('/')[0]not in{'docs','tests','tools','preparation','recovery','references','history'}
 for e in d['references']:assert e['from']in table and e['to']in table,e
 required=['modules/unified-versus-v055.html','modules/chronicles-v056.html','src/cqc-pass6-native-origins.js','src/cqc-pass6-combat-fidelity.js','src/cqc-pass6-prop-data.js','src/cqc-pass6-prop-art.js',P5.PORTRAIT,P5.DEBRIS]
 assert all(p in table for p in required)
 cat=json.loads((SOURCE/'data/combat-sprite-catalog-v1.json').read_text())['entries'];old=json.loads((SOURCE/'recovery/pass6-before-native-sprite-integration/data/combat-sprite-catalog-v1.json').read_text())['entries']
 assert set(cat)==set(C.NATIVE_UIDS)and set(old)==set(C.OLD_UIDS)
 for uid,entry in old.items():assert entry==cat[uid],uid+' old object changed'
 native=set();counts={}
 for uid,entry in cat.items():
  fs=[f for a in list(entry['actions'].values())+list(entry['oppositeActions'].values())for f in a['frames']];files={f['file']for f in fs};poses={(f['file'],tuple(f['rect']))for f in fs};assert len(files)==6 and len(poses)==72 and entry['mirror']is False
  for f in fs:assert table[f['file']]['sha256']==f['sha256'],f['file']
  native|=files;counts[uid]=len(poses)
 assert len(native)==132 and sum(counts.values())==1584
 for p in required:assert table[p]['sha256']==hashlib.sha256((SOURCE/p).read_bytes()).hexdigest(),p
 return{'manifest':str(manifest_path),'manifestSHA256':hashlib.sha256(manifest_path.read_bytes()).hexdigest(),'runtimeFiles':len(table),'runtimeBytes':d['totalBytes'],'reachableReferences':len(d['references']),'nativePNG':len(native),'nativePoses':sum(counts.values()),'perUID':counts,'preservedOldEntryObjects':len(old),'requiredPaths':required,'allCopiedBytesVerified':True}
STAGES=r"""(async()=>{
const a=window.__CQC055Versus,rows=window.CQC_STAGE_LAYERS.summary();if(rows.length!==30)throw Error('Expected30 stages');const canvas=document.querySelector('#game'),c=canvas.getContext('2d'),results=[];
for(const row of rows){if(!await window.CQC_STAGE_LAYERS.preload(row.id))throw Error('Stage preload failed '+row.id);const s=window.__p6Start('core__pain',1,'core__snake',row.id);const images=[],old=c.drawImage;
c.drawImage=function(img,...r){if(img.src?.includes('/assets/stages-reprise/')){const t=c.getTransform();images.push({file:img.src.slice(img.src.indexOf('assets/')),nativeWidth:img.naturalWidth,nativeHeight:img.naturalHeight,matrix:[t.a,t.b,t.c,t.d,t.e,t.f],sourceOrDestination:r})}return old.call(this,img,...r)};
try{a.draw()}finally{c.drawImage=old}const status=window.CQC_STAGE_LAYERS.status(row.id);if(status.state!=='ready'||status.errors.length||!images.length||images.some(i=>i.nativeWidth<=0||i.matrix[0]<=0))throw Error('Stage actual native draw failed '+JSON.stringify({row,status,images}));results.push({id:row.id,status,actualNativeDraws:images,engineStage:s.stage});}
return{stageCount:results.length,viewport:innerWidth,actualStages:results};})()"""
def run(out):
 out.mkdir(parents=True,exist_ok=False);b=C.Browser(out,'s6cqc');server=None;log=None;failure=None;base=None;proof=None
 def fe(js):return b.evaluate("(()=>{const m=document.querySelector('.cqc-game-frame')?.contentDocument?.querySelector('#moduleFrame')?.contentDocument;if(!m)throw Error('Nested CQC module absent');return m.defaultView.eval("+json.dumps(js)+");})()")
 def wait_cqc():return b.evaluate("(async()=>{for(let i=0;i<100;i++){const d=document.querySelector('.cqc-game-frame')?.contentDocument;if(d?.readyState==='complete'&&d.querySelector('[data-mode=versus]'))return{title:d.title};await new Promise(r=>setTimeout(r,100))}throw Error('CQC host not ready')})()")
 def wait_versus():return b.evaluate("(async()=>{for(let i=0;i<100;i++){const d=document.querySelector('.cqc-game-frame')?.contentDocument?.querySelector('#moduleFrame')?.contentDocument;if(d?.readyState==='complete'&&d.defaultView.__CQC055Versus?.engine)return{title:d.title,fighters:d.defaultView.__CQC055Versus.fighters.length,original:d.defaultView.__CQC055Versus.originalMode};await new Promise(r=>setTimeout(r,100))}throw Error('Versus not ready')})()")
 def launch():
  b.evaluate("(()=>{const d=document.querySelector('.cqc-game-frame').contentDocument,w=d.defaultView,t=d.querySelector('[data-mode=versus]');t.dispatchEvent(new w.MouseEvent('mouseenter'));t.click();return true})()")
  s=wait_versus();assert s['fighters']==354 and not s['original'];b.checks.append({'name':'354-canonical-versus-launch','result':s})
 def capture(name):
  b.screenshot(name);s=b.record(name+'-dom',"(()=>{const f=document.querySelector('.cqc-game-frame'),d=f?.contentDocument,r=f?.getBoundingClientRect();return{title:document.title,route:document.querySelector('[data-route]')?.dataset.route,overflow:document.documentElement.scrollWidth>innerWidth,viewport:innerWidth,iframe:f?{title:d?.title,height:r.height,width:r.width,overflow:d?.documentElement.scrollWidth>r.width}:null}})()");return s
 try:
  proof=static_preflight();b.save('synced-runtime-graph-proof.json',proof);b.checks.append({'name':'final-synced-runtime-bytes-and-old18-entries-preserved','result':proof})
  with socket.socket()as p:p.bind(('127.0.0.1',0));port=p.getsockname()[1]
  base='http://127.0.0.1:'+str(port);log=(out/'vite-pass6.log').open('w');server=subprocess.Popen(['npm','run','dev','--','--host','127.0.0.1','--port',str(port),'--strictPort'],cwd=ROOT,stdout=log,stderr=subprocess.STDOUT,start_new_session=True)
  for _ in range(100):
   if server.poll()is not None:raise RuntimeError('Owned Vite exited before readiness')
   try:
    if urllib.request.urlopen(base,timeout=1).status==200:break
   except Exception:time.sleep(.15)
  else:raise RuntimeError('Owned Vite failed readiness')
  b.call('set','viewport','1280','800');b.initial(base+'/','Shadow');b.evaluate("document.querySelectorAll('.nav-button').forEach(b=>{if(b.textContent==='CQC VERSUS')b.click()})");wait_cqc();s=capture('cqc-desktop');assert s['route']=='cqc'and not s['overflow']and s['iframe']['height']>=420
  for width,height in [(1280,800),(390,844)]:
   if width==390:
    b.call('set','viewport',str(width),str(height));b.call('open',base+'/?module=cqc');b.call('wait','--load','networkidle');wait_cqc();s=capture('cqc-mobile');assert not s['overflow']and s['route']=='cqc'and s['iframe']['height']>=420
   launch();assets=b.record(str(width)+'-22-native-assets-and-PASS6-props-under-cqc',C.ready_js('/cqc'),fe);b.save(str(width)+'-native-assets.json',assets)
   C.gameplay_checks(b,width,fe,[u for u in C.NATIVE_UIDS if u!='oc__parallaxe'])
   if width==1280:
    stages=b.record('all30-stages-actual-native-draws',STAGES,fe);b.save('30-stage-runtime-draws.json',stages);assert stages['stageCount']==30;b.screenshot('stage-last-desktop')
    fe(P5.PROJECTILE_OBSERVERS);fe(P5.INSTALL5)
    for name,js in [('preserved-native-Mantis-debris','window.__p4Origin("core__mantis",1,"special")'),('preserved-native-C4-trap','window.__p5Trap(1)'),('preserved-actual-Vamp-knife-parry','window.__p5Reflection()')]:b.record(name,js,fe)
   if width==390:
    hud=b.record('mobile-readable-HUD-inside-Shadow',"(()=>{window.__p6Start('core__pain',1);const h=document.querySelector('.hud-reprise');return{display:getComputedStyle(h).display,names:[...document.querySelectorAll('.hud-reprise-name')].map(n=>({text:n.textContent,font:getComputedStyle(n).fontSize})),canvasWidth:document.querySelector('#game').getBoundingClientRect().width,viewport:innerWidth}})()",fe);assert hud['display']=='grid'and len(hud['names'])==2 and all(float(n['font'].replace('px',''))>=14 for n in hud['names'])and hud['canvasWidth']<=hud['viewport'];capture('native-Pain-mobile-HUD')
   b.evaluate("document.querySelector('.cqc-game-frame').contentDocument.querySelector('#moduleFrame').src='/cqc/modules/unified-versus-v055.html?original=parallaxe'");s=wait_versus();assert s['fighters']==355 and s['original'];b.checks.append({'name':str(width)+'-354-canon-plus-one-OC-opt-in','result':s});fe(C.ready_js('/cqc'));fe(C.INSTALL)
   for face in[1,-1]:b.record(str(width)+'-native-idle-oc__parallaxe-'+str(face),'window.__p6Idle("oc__parallaxe",'+str(face)+')',fe)
   b.screenshot(str(width)+'-opt-in-Parallaxe')
  isolation=b.record('Shadow-storage-export-import-reset-isolation',"(()=>{const w=document.querySelector('.cqc-game-frame').contentWindow;localStorage.setItem('shadow-codec-ops:qa-cqc-pass6-sentinel','shadow');localStorage.setItem('cqc-qa-pass6-sentinel','cqc');const exported=w.CQCProfileV044.exportAll(),imported=w.CQCProfileV044.importAll({keys:{'shadow-codec-ops:cqc-pass6-injected':'bad','cqc-qa-pass6-imported':'cqc'}}),before={shadowExported:Object.hasOwn(exported.keys,'shadow-codec-ops:qa-cqc-pass6-sentinel'),shadowInjected:localStorage.getItem('shadow-codec-ops:cqc-pass6-injected'),imported};w.CQCProfileV044.resetAll();return{...before,shadowAfterReset:localStorage.getItem('shadow-codec-ops:qa-cqc-pass6-sentinel'),cqcAfterReset:localStorage.getItem('cqc-qa-pass6-sentinel')}})()");assert not isolation['shadowExported']and isolation['shadowInjected']is None and isolation['shadowAfterReset']=='shadow'and isolation['cqcAfterReset']is None and isolation['imported']==1
  b.evaluate("localStorage.setItem('cqc-qa-pass6-sentinel','cqc')");b.call('open',base+'/cqc/index.html');b.call('wait','--load','networkidle');standalone=b.record('standalone-CQC-route-shares-owned-save-prefix',"({title:document.title,cqc:localStorage.getItem('cqc-qa-pass6-sentinel'),shadow:localStorage.getItem('shadow-codec-ops:qa-cqc-pass6-sentinel'),url:location.href})");assert'CQC'in standalone['title']and standalone['cqc']=='cqc'and standalone['shadow']=='shadow';b.screenshot('direct-CQC-mobile')
  narrative_check=P5.NARRATIVE_CHECK.replace('474','486').replace('79','81').replace('PASS5','PASS6').replace('STORY_UIDS',json.dumps(STORIES))
  for uid in STORIES:
   b.call('open',base+'/cqc/modules/chronicles-v056.html?uid='+uid);b.call('wait','--load','networkidle');n=b.record('12-MG2-native-paintings-real-intro-'+uid,narrative_check);assert n['screen']=='scene'and n['artReady']=='true'and len(n['cards'])==12;b.screenshot(uid+'-narrative-pass6')
  b.call('open',base+'/cqc/modules/chronicles-v056.html?uid=archive__gray_fox_mg1');b.call('wait','--load','networkidle');p=b.record('preserved-original-human-GrayFox-native-portrait',P5.PORTRAIT_CHECK);b.save('gray-fox-mg1-human-portrait-proof.json',p)
  errors=b.call('errors');console=b.call('console');assert not errors.get('errors');b.checks.append({'name':'final-browser-page-errors-empty','result':errors});after=static_preflight();assert after==proof;b.checks.append({'name':'frozen-runtime-bytes-stable-through-fresh-QA','result':after})
 except Exception as e:
  failure=repr(e)
  try:b.screenshot('failure-state-pass6')
  except Exception:pass
  raise
 finally:
  if base:
   try:b.evaluate("['shadow-codec-ops:qa-cqc-pass6-sentinel','shadow-codec-ops:cqc-pass6-injected','cqc-qa-pass6-sentinel','cqc-qa-pass6-imported'].forEach(k=>localStorage.removeItem(k))")
   except Exception:pass
  b.close()
  if server and server.poll()is None:
   os.killpg(server.pid,signal.SIGTERM)
   try:server.wait(timeout=5)
   except subprocess.TimeoutExpired:os.killpg(server.pid,signal.SIGKILL);server.wait(timeout=5)
  if log:log.close()
  report={'schema':'shadow.cqc.pass6.fresh-browser/1','status':'failed'if failure else'passed','failure':failure,'baseURL':base,'ownedServerPID':server.pid if server else None,'ownedBrowserSession':b.session,'checks':b.checks,'commands':b.commands,'observed':C.observed_counts(b.checks),'pageErrors':locals().get('errors'),'console':locals().get('console'),'assetPreflight':proof,'viewports':[1280,390],'cleanup':{'ownedViteServerExited':server.poll()is not None if server else None},'limits':'Fresh React Shadow CQC tab at desktop/mobile, direct CQC mount, all22 native idle identities/facings, actual9-slot source origins and simulation resources/counterplay, native effects, preserved old props/parry and human Gray Fox portrait, OC opt-in,30 actual stage draws,12 new narrative decodes/two rendered intros and save prefix isolation. Red wire does 0 HP unblocked and retains the historical minimum 1 HP frontal low-guard chip; no explosion and unblocked slow bounded at 140 frames. No full campaign or hardware device/absolute1:1 certification.'};b.save('browser-results-pass6.json',report)
 print(json.dumps({'status':'passed','observed':C.observed_counts(b.checks),'commands':len(b.commands)},ensure_ascii=False),flush=True)
def main():
 p=argparse.ArgumentParser(description=__doc__);p.add_argument('--run-after-final-sync',action='store_true');p.add_argument('--output',type=Path,default=Path('/workspace/shadow-cqc-pass6-browser-qa'));a=p.parse_args()
 if a.run_after_final_sync:run(a.output)
 else:print(json.dumps({'status':'plan_only','needsRootFinalShadowSyncSignal':True,'output':str(a.output)}))
if __name__=='__main__':main()
