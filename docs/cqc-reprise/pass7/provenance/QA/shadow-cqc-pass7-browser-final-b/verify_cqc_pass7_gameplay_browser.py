#!/usr/bin/env python3
"""PASS7 source-bound browser QA. Preparation is read-only; execution needs root's final freeze signal."""
from pathlib import Path
import argparse, functools, hashlib, http.server, importlib.util, json, threading

def load(name,path):
 spec=importlib.util.spec_from_file_location(name,path);module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module);return module

C=load('p7_p6_readonly_common','/workspace/cqc-pass6-browser-common.py')
SOURCE=C.SOURCE
NEW_UIDS=['core__raven','core__old_snake','core__quiet','archive__skull_face']
NATIVE_UIDS=C.NATIVE_UIDS+NEW_UIDS
SLOTS={'core__raven':['special','specialForward','super'],'core__old_snake':['special','specialDown'],'core__quiet':['special','specialDown','super'],'archive__skull_face':['special','specialDown','specialForward','super']}
PROJECTILE_SLOTS={uid:slots for uid,slots in SLOTS.items()if uid!='archive__skull_face'}
INSTALL=Path('/workspace/cqc-pass7-browser-observers.js').read_text()

def sha(path):
 h=hashlib.sha256()
 with path.open('rb')as f:
  while chunk:=f.read(1024*1024):h.update(chunk)
 return h.hexdigest()

def static_preflight(expected_catalog_sha,expected_helper_sha,expected_origins_sha):
 required={'data/combat-sprite-catalog-v1.json':expected_catalog_sha,'src/cqc-pass7-combat-fidelity.js':expected_helper_sha,'src/cqc-pass7-native-origins.js':expected_origins_sha}
 for name,digest in required.items():
  assert isinstance(digest,str)and len(digest)==64,'Root final freeze SHA required: '+name
  assert sha(SOURCE/name)==digest,'Final freeze source changed: '+name
 catalog=json.loads((SOURCE/'data/combat-sprite-catalog-v1.json').read_text())['entries']
 baseline=json.loads((SOURCE/'recovery/pass7-before-source-integration/data/combat-sprite-catalog-v1.json').read_text())['entries']
 assert set(catalog)==set(NATIVE_UIDS)and set(baseline)==set(C.NATIVE_UIDS),'Exact 26/22 UID sets required'
 for uid,entry in baseline.items():assert catalog[uid]==entry,'Preserved old native entry changed: '+uid
 files=set();counts={};source_files={}
 for uid,entry in catalog.items():
  frames=[f for a in list(entry['actions'].values())+list(entry['oppositeActions'].values())for f in a['frames']]
  sources={f['file']for f in frames};poses={(f['file'],tuple(f['rect']))for f in frames}
  assert entry['mirror']is False and len(sources)==6 and len(poses)==72,uid
  for frame in frames:
   path=frame['file']
   if path not in source_files:source_files[path]=sha(SOURCE/path)
   digest=source_files[path]
   assert digest==frame['sha256'],'Native source SHA mismatch: '+path
  files|=sources;counts[uid]=len(poses)
 assert len(files)==156 and sum(counts.values())==1872
 snapshots={uid:json.loads((Path('/workspace/cqc-pass7-reference-selection')/uid/'FINISHER_PROFILE_SNAPSHOT.json').read_text())for uid in NEW_UIDS}
 return{'finalSourcePins':required,'catalogUIDs':26,'nativePNG':156,'nativePoses':1872,'perUID':counts,'preservedOldEntryObjects':22,'sourcePNGHashes':source_files,'baselineFinisherProfiles':snapshots}

def ready_js(prefix='',source_pins=None):
 return """(async()=>{
const expected=EXPECTED,cat=window.CQC_COMBAT_SPRITE_CATALOG.entries;if(JSON.stringify(Object.keys(cat).sort())!==JSON.stringify([...expected].sort()))throw Error('Expected26 exact native UIDs');
if(!window.CQC_PASS7_COMBAT_FIDELITY||!window.__CQC055Versus.engine.pass7ChaffAttached)throw Error('PASS7 fidelity engine attachment absent');
const ready=await Promise.all(expected.map(uid=>window.CQC_COMBAT_SPRITES.whenReady(uid)));if(ready.some(v=>!v))throw Error('Native image failed to load');
const rows=expected.map(uid=>{const e=cat[uid],frames=[...Object.values(e.actions),...Object.values(e.oppositeActions)].flatMap(a=>a.frames),files=[...new Set(frames.map(f=>f.file))],poses=[...new Set(frames.map(f=>f.file+JSON.stringify(f.rect)))];if(files.length!==6||poses.length!==72||e.mirror!==false)throw Error('Native independent source contract '+uid);return{uid,files,poses:poses.length}});
const files=[...new Set(rows.flatMap(r=>r.files))],poses=rows.reduce((n,r)=>n+r.poses,0);if(files.length!==156||poses!==1872)throw Error('26-native totals mismatch');
const marks=window.CQC_PASS7_NATIVE_ORIGINS;if(!marks||!['core__raven','core__old_snake','core__quiet'].every(uid=>Object.keys(marks[uid]||{}).length))throw Error('Measured PASS7 native source origin manifest absent');
const sourcePins=SOURCE_PINS,loadedScriptHashes={};for(const name of['cqc-pass7-combat-fidelity.js','cqc-pass7-native-origins.js']){const script=[...document.scripts].find(s=>new URL(s.src||location.href).pathname.endsWith('/src/'+name));if(!script)throw Error('Actual script route absent '+name);const response=await fetch(script.src,{cache:'no-store'});if(!response.ok)throw Error('Loaded script HTTP failure '+name);const digest=[...new Uint8Array(await crypto.subtle.digest('SHA-256',await response.arrayBuffer()))].map(b=>b.toString(16).padStart(2,'0')).join('');if(sourcePins&&digest!==sourcePins['src/'+name])throw Error('Actual browser script differs from final frozen source '+name);loadedScriptHashes[name]={url:script.src,sha256:digest};}
return{sprites:rows,nativePNG:files.length,nativePoses:poses,originUIDs:Object.keys(marks),loadedScriptHashes,prefix:PREFIX};})()""".replace('EXPECTED',json.dumps(NATIVE_UIDS)).replace('PREFIX',json.dumps(prefix)).replace('SOURCE_PINS',json.dumps(source_pins))

def install(b,proof,evaluator=None):
 ev=evaluator or b.evaluate
 ev('window.__p7BaselineFinishers='+json.dumps(proof['baselineFinisherProfiles']))
 ev(INSTALL)

def gameplay_checks(b,width,proof,evaluator=None):
 ev=evaluator or b.evaluate
 record=lambda name,code:b.record(str(width)+'-'+name,code,ev)
 install(b,proof,ev)
 for uid in NATIVE_UIDS:
  if uid=='oc__parallaxe':continue
  for face in[1,-1]:
   record('native-idle-'+uid+'-'+str(face),'window.__p7Idle('+json.dumps(uid)+','+str(face)+')')
   if uid in NEW_UIDS:b.screenshot(str(width)+'-'+uid+'-'+str(face)+'-idle')
 for uid,slots in SLOTS.items():
  for face in[1,-1]:
   for slot in slots:
    for phase in['startup','active','recovery']:record('native-phase-'+uid+'-'+str(face)+'-'+slot+'-'+phase,'window.__p7Phase('+json.dumps(uid)+','+str(face)+','+json.dumps(slot)+','+json.dumps(phase)+')')
 for uid,slots in PROJECTILE_SLOTS.items():
  for face in[1,-1]:
   for slot in slots:
    record('source-origin-'+uid+'-'+str(face)+'-'+slot,'window.__p7Origin('+json.dumps(uid)+','+str(face)+','+json.dumps(slot)+')');b.screenshot(str(width)+'-'+uid+'-'+str(face)+'-'+slot+'-origin')
    if uid=='core__old_snake'and slot=='specialDown':continue
    for crouch in[False,True]:record('actual-contact-'+uid+'-'+str(face)+'-'+slot+'-'+str(crouch),'window.__p7Contact('+json.dumps(uid)+','+str(face)+','+json.dumps(slot)+','+str(crouch).lower()+')')
 for name,fn in[('Raven-real-eight-shot-heat-ceiling','__p7RavenHeat'),('Quiet-real-empty-ammo-and-finite-reload','__p7QuietAmmo'),('Quiet-bounded-neutral-movement','__p7QuietMovement'),('16-finisher-identities-and-visible-scope','__p7FinishersCatalogue')]:record(name,'window.'+fn+'()')
 for face in[1,-1]:
  record('Quiet-actual-projectile-interrupts-reload-'+str(face),'window.__p7QuietInterruptedReload('+str(face)+')');b.screenshot(str(width)+'-Quiet-interrupted-reload-'+str(face))
  record('Old-opaque-cloak-real-collision-'+str(face),'window.__p7OldCloak('+str(face)+')')
  record('Old-Chaff-real-projectile-interrupted-'+str(face),'window.__p7ChaffInterrupted('+str(face)+')')
  for guard in[False,True]:record('Old-Chaff-no-human-damage-mark-guardchip-'+str(face)+'-'+str(guard),'window.__p7Chaff('+str(face)+',"core__snake",'+str(guard).lower()+')')
  record('Old-Chaff-machine-guided-fire-and-bounded-expiry-'+str(face),'window.__p7Chaff('+str(face)+',"archive__dwalker",false)')
  for slot in SLOTS['archive__skull_face']:
   record('Skull-real-unarmed-simulation-'+str(face)+'-'+slot,'window.__p7SkullSimulation('+str(face)+','+json.dumps(slot)+')')
  b.screenshot(str(width)+'-Skull-unarmed-super-'+str(face))
  record('Skull-real-one-hit-brace-'+str(face),'window.__p7SkullBrace('+str(face)+')')
 record('Skull-readable-short-resource-HUD','window.__p7SkullHUD()');b.screenshot(str(width)+'-Skull-resource-HUD')
 for uid in NEW_UIDS:
  for index in range(4)if width==1280 else[0]:
   record('actual-finisher-native-phases-'+uid+'-'+str(index),'window.__p7FinisherScene('+json.dumps(uid)+','+str(index)+')');b.screenshot(str(width)+'-'+uid+'-actual-finisher-'+str(index))
 print(str(width)+'px PASS7 real origins, phases, contacts, resources, Chaff, unarmed simulation and finishers complete.',flush=True)

def observed(checks):
 names=[r['name']for r in checks]
 return{'completedChecks':len(checks),'nativeIdleDraws':sum('-native-idle-'in n for n in names),'sourceOriginCases':sum('-source-origin-'in n for n in names),'nativeActionPhaseCases':sum('-native-phase-'in n for n in names),'actualContactCases':sum('-actual-contact-'in n for n in names),'actualFinisherSceneCases':sum('-actual-finisher-native-phases-'in n for n in names),'actualQuietInterruptedReloadCases':sum('Quiet-actual-projectile-interrupts' in n for n in names),'actualChaffHumanNoDamageCases':sum('Chaff-no-human-damage' in n for n in names),'actualChaffMachineCases':sum('Chaff-machine-guided-fire' in n for n in names),'SkullUnarmedSimulationCases':sum('Skull-real-unarmed' in n for n in names)}

def run(out,expected_catalog_sha,expected_helper_sha,expected_origins_sha):
 out.mkdir(parents=True,exist_ok=False);b=C.Browser(out,'p7game');server=None;failure=None;base=None;proof=None
 for path in[Path(__file__),Path('/workspace/cqc-pass7-browser-observers.js'),Path('/workspace/cqc-pass6-browser-common.py')]:
  (out/path.name).write_bytes(path.read_bytes())
 class Handler(http.server.SimpleHTTPRequestHandler):
  def log_message(self,*_):pass
  def do_GET(self):
   if self.path=='/favicon.ico':self.send_response(204);self.end_headers();return
   super().do_GET()
 try:
  proof=static_preflight(expected_catalog_sha,expected_helper_sha,expected_origins_sha);before=C.pin_source();b.save('final-frozen-source-preflight.json',proof);b.save('source-inputs-before.json',before)
  server=http.server.ThreadingHTTPServer(('127.0.0.1',0),functools.partial(Handler,directory=str(SOURCE)));threading.Thread(target=server.serve_forever,daemon=True).start();base='http://127.0.0.1:'+str(server.server_port)
  b.call('set','viewport','1280','800');b.initial(base+'/modules/unified-versus-v055.html','CQC')
  for width,height in[(1280,800),(390,844)]:
   if width==390:b.call('set','viewport',str(width),str(height));b.call('open',base+'/modules/unified-versus-v055.html');b.call('wait','--load','networkidle')
   assets=b.record(str(width)+'-all26-native-bodies-ready',ready_js(source_pins=proof['finalSourcePins']));b.save(str(width)+'-native-asset-readiness.json',assets);gameplay_checks(b,width,proof)
   b.call('open',base+'/modules/unified-versus-v055.html?original=parallaxe');b.call('wait','--load','networkidle');b.evaluate(ready_js(source_pins=proof['finalSourcePins']));install(b,proof)
   for face in[1,-1]:b.record(str(width)+'-native-idle-oc__parallaxe-'+str(face),'window.__p7Idle("oc__parallaxe",'+str(face)+')')
   mode=b.record(str(width)+'-OC-opt-in-retains-canonical-roster','({fighters:window.__CQC055Versus.fighters.length,original:window.__CQC055Versus.originalMode})');assert mode['fighters']==355 and mode['original'];b.screenshot(str(width)+'-OC-opt-in-Parallaxe')
  errors=b.call('errors');console=b.call('console');assert not errors.get('errors');b.checks.append({'name':'final-browser-errors-empty','result':errors})
  after=C.pin_source();b.save('source-inputs-after.json',after);assert before==after,'Frozen source mutated during PASS7 browser QA';b.checks.append({'name':'final-frozen-source-stable-through-QA','result':{'files':len(before),'match':True}})
 except Exception as exc:
  failure=repr(exc)
  try:b.screenshot('failure-state-pass7')
  except Exception:pass
 finally:
  b.close()
  if server:server.shutdown();server.server_close()
  report={'schema':'cqc.pass7.actual-gameplay-browser/1','status':'failed'if failure else'passed','failure':failure,'baseURL':base,'assetPreflight':proof,'ownedBrowserSession':b.session,'checks':b.checks,'commands':b.commands,'observed':observed(b.checks),'pageErrors':locals().get('errors'),'console':locals().get('console'),'viewports':[1280,390],'cleanup':{'ownedHTTPServerClosed':server is not None},'limits':'Actual standalone engine steps and production Canvas draws, original source-SHA launch alignment, both independent facings, finite ammo/reload interruption/heat budget, Chaff target separation/no human guard chip and bounded electronic disruption, opaque OctoCamo collision, unarmed Skull Face bonus simulation, sixteen historical finisher identities/commands/durations and native post-victory phases. Adapted timing/effects; no absolute 1:1 or hardware-device certification.'};b.save('verification.json',report)
 print(json.dumps({'status':report['status'],'failure':failure,'observed':report['observed'],'commands':len(b.commands)},ensure_ascii=False),flush=True)
 if failure:raise SystemExit(1)

def main():
 p=argparse.ArgumentParser(description=__doc__);p.add_argument('--run-after-root-final-freeze',action='store_true');p.add_argument('--expected-catalog-sha');p.add_argument('--expected-helper-sha');p.add_argument('--expected-origins-sha');p.add_argument('--output',type=Path,default=Path('/workspace/cqc-pass7-gameplay-browser'));a=p.parse_args()
 if a.run_after_root_final_freeze:run(a.output,a.expected_catalog_sha,a.expected_helper_sha,a.expected_origins_sha)
 else:print(json.dumps({'status':'plan_only','needsRootFinalSourceFreezeSignal':True,'output':str(a.output),'requiredFrozenPins':['data/combat-sprite-catalog-v1.json','src/cqc-pass7-combat-fidelity.js','src/cqc-pass7-native-origins.js'],'plannedNativeUIDs':NATIVE_UIDS,'viewports':[1280,390]}))

if __name__=='__main__':main()
