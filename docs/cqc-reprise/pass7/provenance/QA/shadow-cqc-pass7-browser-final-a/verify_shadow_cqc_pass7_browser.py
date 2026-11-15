#!/usr/bin/env python3
"""PASS7 final Shadow/standalone runtime QA. Starts nothing before root's final sync signal."""
from pathlib import Path
import argparse, importlib.util, json, os, signal, socket, subprocess, time, urllib.request

def load(name,path):
 spec=importlib.util.spec_from_file_location(name,path);module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module);return module

P7=load('shadow_pass7_standalone_readonly','/workspace/verify_cqc_pass7_gameplay_browser.py')
C=P7.C
ROOT=Path('/workspace/shadow-codec-recovered')
SOURCE=P7.SOURCE

def static_preflight(catalog_sha,helper_sha,origins_sha,runtime_sha):
 proof=P7.static_preflight(catalog_sha,helper_sha,origins_sha)
 manifest_path=ROOT/'public/cqc/runtime-manifest.json';assert isinstance(runtime_sha,str)and len(runtime_sha)==64,'Root final synced manifest SHA required'
 assert P7.sha(manifest_path)==runtime_sha,'Final synced runtime changed before browser QA';manifest=json.loads(manifest_path.read_text());table={e['path']:e for e in manifest['files']};assert len(table)==len(manifest['files'])
 for item in manifest['files']:
  target=ROOT/'public/cqc'/item['path'];assert target.stat().st_size==item['bytes']and P7.sha(target)==item['sha256'],item['path']
  assert item['path'].split('/')[0]not in{'docs','tests','tools','preparation','recovery','references','history'},item['path']
 for edge in manifest['references']:assert edge['from']in table and edge['to']in table,edge
 required=['modules/unified-versus-v055.html','src/cqc-pass7-native-origins.js','src/cqc-pass7-combat-fidelity.js','src/cqc-sprite-catalog.js','src/cqc-sprite-renderer.js']
 for name in required:assert name in table and table[name]['sha256']==P7.sha(SOURCE/name),name
 for path,digest in proof['sourcePNGHashes'].items():assert table[path]['sha256']==digest,path
 proof['syncedRuntime']={'manifestSHA256':runtime_sha,'runtimeFiles':len(table),'runtimeBytes':manifest['totalBytes'],'reachableReferences':len(manifest['references']),'requiredIdenticalSources':required,'allCopiedBytesVerified':True}
 return proof

def run(out,catalog_sha,helper_sha,origins_sha,runtime_sha):
 out.mkdir(parents=True,exist_ok=False);b=C.Browser(out,'s7cqc');server=None;log=None;failure=None;base=None;proof=None
 for path in[Path(__file__),Path('/workspace/verify_cqc_pass7_gameplay_browser.py'),Path('/workspace/cqc-pass7-browser-observers.js'),Path('/workspace/cqc-pass6-browser-common.py')]:
  (out/path.name).write_bytes(path.read_bytes())
 def fe(js):return b.evaluate('(()=>{const w=document.querySelector(".cqc-game-frame")?.contentDocument?.querySelector("#moduleFrame")?.contentWindow;if(!w)throw Error("Nested CQC module absent");return w.eval('+json.dumps(js)+')})()')
 def direct_fe(js):return b.evaluate('(()=>{const w=document.querySelector("#moduleFrame")?.contentWindow;if(!w)throw Error("Standalone module frame absent");return w.eval('+json.dumps(js)+')})()')
 def wait_front(embedded=True):
  access='document.querySelector(".cqc-game-frame")?.contentDocument'if embedded else'document'
  return b.evaluate('(async()=>{for(let i=0;i<100;i++){const d='+access+';if(d?.readyState==="complete"&&d.querySelector("[data-mode=versus]"))return{title:d.title};await new Promise(r=>setTimeout(r,100))}throw Error("CQC front not ready")})()')
 def wait_versus(embedded=True):
  access='document.querySelector(".cqc-game-frame")?.contentDocument?.querySelector("#moduleFrame")?.contentDocument'if embedded else'document.querySelector("#moduleFrame")?.contentDocument'
  return b.evaluate('(async()=>{for(let i=0;i<100;i++){const d='+access+';if(d?.readyState==="complete"&&d.defaultView.__CQC055Versus?.engine)return{title:d.title,fighters:d.defaultView.__CQC055Versus.fighters.length,original:d.defaultView.__CQC055Versus.originalMode};await new Promise(r=>setTimeout(r,100))}throw Error("Final PASS7 versus not ready")})()')
 def launch(embedded=True):
  access='document.querySelector(".cqc-game-frame").contentDocument'if embedded else'document'
  b.evaluate('(()=>{const d='+access+',w=d.defaultView,t=d.querySelector("[data-mode=versus]");t.dispatchEvent(new w.MouseEvent("mouseenter"));t.click();return true})()');state=wait_versus(embedded);assert state['fighters']==354 and not state['original'];b.checks.append({'name':'354-canonical-versus-launch-'+('Shadow'if embedded else'standalone'),'result':state})
 def capture(name):
  b.screenshot(name);state=b.record(name+'-dom','(()=>{const f=document.querySelector(".cqc-game-frame"),d=f?.contentDocument,r=f?.getBoundingClientRect();return{title:document.title,route:document.querySelector("[data-route]")?.dataset.route,overflow:document.documentElement.scrollWidth>innerWidth,viewport:innerWidth,iframe:f?{title:d?.title,height:r.height,width:r.width,overflow:d?.documentElement.scrollWidth>r.width}:null}})()');return state
 try:
  proof=static_preflight(catalog_sha,helper_sha,origins_sha,runtime_sha);before=C.pin_source();b.save('final-synced-runtime-preflight.json',proof);b.save('source-inputs-before.json',before);b.checks.append({'name':'synced-runtime-byte-exact-and-old22-native-entries-preserved','result':proof['syncedRuntime']})
  with socket.socket()as reservation:reservation.bind(('127.0.0.1',0));port=reservation.getsockname()[1]
  base='http://127.0.0.1:'+str(port);log=(out/'vite-pass7.log').open('w');server=subprocess.Popen(['npm','run','dev','--','--host','127.0.0.1','--port',str(port),'--strictPort'],cwd=ROOT,stdout=log,stderr=subprocess.STDOUT,start_new_session=True)
  for _ in range(100):
   if server.poll()is not None:raise RuntimeError('Owned Vite exited before readiness')
   try:
    if urllib.request.urlopen(base,timeout=1).status==200:break
   except Exception:time.sleep(.15)
  else:raise RuntimeError('Owned Vite did not become ready')
  b.call('set','viewport','1280','800');b.initial(base+'/','Shadow');b.evaluate('document.querySelectorAll(".nav-button").forEach(b=>{if(b.textContent==="CQC VERSUS")b.click()})');wait_front();state=capture('cqc-desktop');assert state['route']=='cqc'and not state['overflow']and state['iframe']['height']>=420
  for width,height in[(1280,800),(390,844)]:
   if width==390:
    b.call('set','viewport',str(width),str(height));b.call('open',base+'/?module=cqc');b.call('wait','--load','networkidle');wait_front();state=capture('cqc-mobile');assert state['route']=='cqc'and not state['overflow']and state['iframe']['height']>=420
   launch();assets=b.record(str(width)+'-all26-native-assets-under-cqc',P7.ready_js('/cqc',proof['finalSourcePins']),fe);b.save(str(width)+'-native-assets.json',assets);P7.gameplay_checks(b,width,proof,fe)
   if width==390:
    hud=b.record('mobile-readable-PASS7-HUD','(()=>{window.__p7Start("core__quiet",1);const h=document.querySelector(".hud-reprise");return{display:getComputedStyle(h).display,names:[...document.querySelectorAll(".hud-reprise-name")].map(n=>({text:n.textContent,font:getComputedStyle(n).fontSize})),canvasWidth:document.querySelector("#game").getBoundingClientRect().width,viewport:innerWidth}})()',fe);assert hud['display']=='grid'and len(hud['names'])==2 and all(float(n['font'].replace('px',''))>=14 for n in hud['names'])and hud['canvasWidth']<=hud['viewport'];b.screenshot('mobile-native-Quiet-HUD')
   b.evaluate('document.querySelector(".cqc-game-frame").contentDocument.querySelector("#moduleFrame").src="/cqc/modules/unified-versus-v055.html?original=parallaxe"');state=wait_versus();assert state['fighters']==355 and state['original'];b.checks.append({'name':str(width)+'-canonical354-plus-one-opt-in-OC','result':state});fe(P7.ready_js('/cqc',proof['finalSourcePins']));P7.install(b,proof,fe)
   for face in[1,-1]:b.record(str(width)+'-native-idle-oc__parallaxe-'+str(face),'window.__p7Idle("oc__parallaxe",'+str(face)+')',fe)
   b.screenshot(str(width)+'-opt-in-Parallaxe')
   if width==1280:
    isolation=b.record('Shadow-CQC-export-import-reset-prefix-isolation','(()=>{const w=document.querySelector(".cqc-game-frame").contentWindow;localStorage.setItem("shadow-codec-ops:qa-cqc-pass7-sentinel","shadow");localStorage.setItem("cqc-qa-pass7-sentinel","cqc");const exported=w.CQCProfileV044.exportAll(),imported=w.CQCProfileV044.importAll({keys:{"shadow-codec-ops:cqc-pass7-injected":"bad","cqc-qa-pass7-imported":"cqc"}});w.CQCProfileV044.resetAll();return{shadowExported:Object.hasOwn(exported.keys,"shadow-codec-ops:qa-cqc-pass7-sentinel"),shadowInjected:localStorage.getItem("shadow-codec-ops:cqc-pass7-injected"),imported,shadowAfterReset:localStorage.getItem("shadow-codec-ops:qa-cqc-pass7-sentinel"),cqcAfterReset:localStorage.getItem("cqc-qa-pass7-sentinel")}})()');assert not isolation['shadowExported']and isolation['shadowInjected']is None and isolation['imported']==1 and isolation['shadowAfterReset']=='shadow'and isolation['cqcAfterReset']is None
   b.evaluate('localStorage.setItem("cqc-qa-pass7-sentinel","cqc")');b.call('open',base+'/cqc/index.html');b.call('wait','--load','networkidle');wait_front(False);b.screenshot(str(width)+'-direct-CQC-front');shared=b.record(str(width)+'-direct-CQC-shares-prefix-with-Shadow','({title:document.title,cqc:localStorage.getItem("cqc-qa-pass7-sentinel"),shadow:localStorage.getItem("shadow-codec-ops:qa-cqc-pass7-sentinel"),url:location.href})');assert'CQC'in shared['title']and shared['cqc']=='cqc'and shared['shadow']=='shadow'
   launch(False);b.record(str(width)+'-direct-CQC-all26-native-ready',P7.ready_js('/cqc',proof['finalSourcePins']),direct_fe);P7.install(b,proof,direct_fe)
   for uid,slot in[('core__raven','specialForward'),('core__old_snake','specialDown'),('core__quiet','super')]:b.record(str(width)+'-direct-source-origin-'+uid,'window.__p7Origin('+json.dumps(uid)+',1,'+json.dumps(slot)+')',direct_fe)
   b.record(str(width)+'-direct-Skull-unarmed-native-super','window.__p7SkullSimulation(1,"super")',direct_fe);b.screenshot(str(width)+'-direct-Skull-unarmed-super')
  errors=b.call('errors');console=b.call('console');assert not errors.get('errors');b.checks.append({'name':'final-browser-page-errors-empty','result':errors});after=static_preflight(catalog_sha,helper_sha,origins_sha,runtime_sha);assert after==proof;source_after=C.pin_source();b.save('source-inputs-after.json',source_after);assert before==source_after;b.checks.append({'name':'final-frozen-runtime-and-source-stable-through-QA','result':proof['syncedRuntime']})
 except Exception as exc:
  failure=repr(exc)
  try:b.screenshot('failure-state-pass7')
  except Exception:pass
 finally:
  if base:
   try:b.evaluate('["shadow-codec-ops:qa-cqc-pass7-sentinel","shadow-codec-ops:cqc-pass7-injected","cqc-qa-pass7-sentinel","cqc-qa-pass7-imported"].forEach(k=>localStorage.removeItem(k))')
   except Exception:pass
  b.close()
  if server and server.poll()is None:
   os.killpg(server.pid,signal.SIGTERM)
   try:server.wait(timeout=5)
   except subprocess.TimeoutExpired:os.killpg(server.pid,signal.SIGKILL);server.wait(timeout=5)
  if log:log.close()
  report={'schema':'shadow.cqc.pass7.fresh-browser/1','status':'failed'if failure else'passed','failure':failure,'baseURL':base,'ownedServerPID':server.pid if server else None,'ownedBrowserSession':b.session,'checks':b.checks,'commands':b.commands,'observed':P7.observed(b.checks),'pageErrors':locals().get('errors'),'console':locals().get('console'),'assetPreflight':proof,'viewports':[1280,390],'cleanup':{'ownedViteServerExited':server.poll()is not None if server else None},'limits':'Fresh Shadow CQC tab at desktop/mobile with all26 native idle identities/facings, actual source-bound launch/action phases and contact/resource/Chaff/simulation/finisher cases, synchronized runtime byte verification, OC opt-in and save-prefix isolation. Direct standalone front and native projectile/unarmed smoke cases additionally run on the identical public CQC runtime. Extensive standalone simulation is covered separately by PASS7 gameplay QA; no absolute1:1 or physical-device certification.'};b.save('browser-results-pass7.json',report)
 print(json.dumps({'status':report['status'],'failure':failure,'observed':report['observed'],'commands':len(b.commands)},ensure_ascii=False),flush=True)
 if failure:raise SystemExit(1)

def main():
 p=argparse.ArgumentParser(description=__doc__);p.add_argument('--run-after-root-final-sync',action='store_true');p.add_argument('--expected-catalog-sha');p.add_argument('--expected-helper-sha');p.add_argument('--expected-origins-sha');p.add_argument('--expected-runtime-manifest-sha');p.add_argument('--output',type=Path,default=Path('/workspace/shadow-cqc-pass7-browser-qa'));a=p.parse_args()
 if a.run_after_root_final_sync:run(a.output,a.expected_catalog_sha,a.expected_helper_sha,a.expected_origins_sha,a.expected_runtime_manifest_sha)
 else:print(json.dumps({'status':'plan_only','needsRootFinalSourceFreezeAndShadowSyncSignal':True,'output':str(a.output),'requiredFrozenPins':['catalogJSON','PASS7-helper','PASS7-native-origins','synced-runtime-manifest'],'plannedNativeUIDs':P7.NATIVE_UIDS,'viewports':[1280,390]}))

if __name__=='__main__':main()
