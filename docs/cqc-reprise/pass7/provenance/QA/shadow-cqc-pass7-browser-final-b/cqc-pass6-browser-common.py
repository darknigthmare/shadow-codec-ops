"""Shared read-only/browser harness for PASS6; no server starts on import."""
from pathlib import Path
import hashlib,json,os,subprocess,time
BROWSER='/tmp/cqc-browser-npm-cache/_npx/6de2aa2fded2970c/node_modules/agent-browser/bin/agent-browser-linux-x64'
SOURCE=Path('/workspace/cqc-game-working/cqc-versus-v056')
NEW_UIDS=['core__pain','core__fear','core__end','core__fury']
SLOTS={'core__pain':['special','specialForward','super'],'core__fear':['special','super'],'core__end':['special','super'],'core__fury':['special','super']}
OLD_UIDS=['core__snake','core__viper','core__boss','core__raiden_mgs2','core__solid','oc__parallaxe','core__meryl_mgs1','core__liquid','core__fox','core__ocelot','core__bloody_brad','core__firetrooper','core__wolf','core__mantis','core__fortune','core__fatman','core__vamp','core__solidus']
NATIVE_UIDS=OLD_UIDS+NEW_UIDS
INSTALL=Path('/workspace/cqc-pass6-browser-observers.js').read_text()
class Browser:
 def __init__(self,out,tag):
  self.out=out;self.commands=[];self.checks=[];self.session=tag+'-'+str(os.getpid())+'-'+hex(time.time_ns())[-7:]
  self.env=dict(os.environ,AGENT_BROWSER_SOCKET_DIR='/tmp/'+self.session+'/sockets',AGENT_BROWSER_STATE_DIR='/tmp/'+self.session+'/state')
  self.prefix=[BROWSER,'--session',self.session,'--executable-path','/usr/bin/chromium','--args','--no-sandbox','--json']
 def call(self,*args):
  p=subprocess.run(self.prefix+list(args),env=self.env,text=True,capture_output=True,timeout=55)
  try:data=json.loads(p.stdout)
  except ValueError:data={'success':False,'stdout':p.stdout,'stderr':p.stderr}
  self.commands.append({'command':list(args),'exit':p.returncode,'result':data,'stderr':p.stderr})
  if p.returncode or not data.get('success'):raise RuntimeError(str(data))
  return data.get('data',{})
 def evaluate(self,js):return self.call('eval',js).get('result')
 def record(self,name,js,evaluator=None):
  row=(evaluator or self.evaluate)(js);self.checks.append({'name':name,'result':row});return row
 def screenshot(self,name):return self.call('screenshot',str(self.out/(name+'.png')))
 def initial(self,url,title_substring):
  self.call('open',url);self.call('wait','--load','networkidle');self.screenshot('initial-page');snap=self.call('snapshot','-i');self.save('initial-snapshot.json',snap)
  errors=self.call('errors');self.checks.append({'name':'initial-page-errors-empty','result':errors});assert not errors.get('errors')
  state=self.record('initial-page-not-blank',"(()=>{const t=document.body.innerText.trim();if(t.length<100||document.querySelector('vite-error-overlay,.vite-error-overlay,[data-nextjs-dialog]'))throw Error('Blank/error overlay');return{title:document.title,bodyCharacters:t.length,viewport:{width:innerWidth,height:innerHeight}}})()")
  assert title_substring in state['title']
 def save(self,name,data):(self.out/name).write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
 def close(self):
  try:self.call('close')
  except Exception as e:self.commands.append({'command':['close'],'cleanupError':repr(e)})
def pin_source(root=SOURCE):
 paths=set(root.glob('modules/*.html'))|set(root.glob('src/*.js'))|set(root.glob('data/*.json'))|set(root.glob('assets/combat-sprites/**/*.png'))|set(root.glob('assets/combat-props/**/*.png'))|set(root.glob('assets/stages/**/*.png'))|set(root.glob('assets/stages-reprise/**/*.png'))
 return [{'path':str(p.relative_to(root)),'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()}for p in sorted(paths)if p.is_file()]
def ready_js(prefix=''):
 return """(async()=>{
const expected=EXPECTED,cat=window.CQC_COMBAT_SPRITE_CATALOG.entries;if(JSON.stringify(Object.keys(cat).sort())!==JSON.stringify([...expected].sort()))throw Error('Expected22 exact native UIDs');
const r=await Promise.all(expected.map(uid=>window.CQC_COMBAT_SPRITES.whenReady(uid)));if(r.some(v=>!v))throw Error('Native image loading failed');
const sprites=expected.map(uid=>{const e=cat[uid],fs=[...Object.values(e.actions),...Object.values(e.oppositeActions)].flatMap(a=>a.frames),files=[...new Set(fs.map(f=>f.file))],poses=[...new Set(fs.map(f=>f.file+JSON.stringify(f.rect)))];if(files.length!==6||poses.length!==72||e.mirror!==false)throw Error('Native source contract '+uid);return{uid,files,poses:poses.length}});
for(let i=0;i<100&&Object.values(window.CQC_PASS6_PROP_ART?.diagnostics().atlases||{}).some(a=>a.status==='loading');i++)await new Promise(r=>setTimeout(r,100));
const props=window.CQC_PASS6_PROP_ART?.diagnostics(),catalog=window.CQC_PASS6_PROP_CATALOG;if(!props||!['pain-hornets','fear-bolts','fury-flames'].every(k=>props.atlases[k]?.status==='ready'))throw Error('Required PASS6 props not ready');
for(const[id,a]of Object.entries(props.atlases)){const s=catalog[id];if(a.status!=='ready'||a.sha256!==s.sha256||a.url!==location.origin+PREFIX+'/'+s.file)throw Error('Native prop route/SHA mismatch '+id);}
const files=[...new Set(sprites.flatMap(s=>s.files))],poses=sprites.reduce((n,s)=>n+s.poses,0);if(files.length!==132||poses!==1584)throw Error('22 native totals mismatch');return{sprites,nativePNG:files.length,nativePoses:poses,props};
})()""".replace('EXPECTED',json.dumps(NATIVE_UIDS)).replace('PREFIX',json.dumps(prefix))
def gameplay_checks(b,width,evaluator=None,idles=None):
 ev=evaluator or b.evaluate;record=lambda n,s:b.record(str(width)+'-'+n,s,ev)
 ev(INSTALL)
 for uid in idles or NEW_UIDS:
  for face in [1,-1]:record('native-idle-'+uid+'-'+str(face),'window.__p6Idle('+json.dumps(uid)+','+str(face)+')')
 for uid,slots in SLOTS.items():
  for face in [1,-1]:
   for slot in slots:
    record('source-origin-'+uid+'-'+str(face)+'-'+slot,'window.__p6Origin('+json.dumps(uid)+','+str(face)+','+json.dumps(slot)+')')
    b.screenshot(str(width)+'-'+uid+'-'+str(face)+'-'+slot)
   for crouch in [False,True]:record('contact-'+uid+'-'+str(face)+'-'+str(crouch),'window.__p6Contact('+json.dumps(uid)+','+str(face)+',"special",'+str(crouch).lower()+')')
 for face in [1,-1]:
  record('Pain-actual-two-hit-native-barrier-'+str(face),'window.__p6PainBarrier('+str(face)+')')
  record('Fury-actual-native-trap-and-heat-'+str(face),'window.__p6FuryTrap('+str(face)+')');b.screenshot(str(width)+'-fury-trap-'+str(face))
 for name,fn in [('Fear-cloak-collision','__p6FearCloak'),('End-five-ammo-super-reload','__p6EndAmmo'),('End-actual-projectile-interrupted-reload','__p6EndReloadInterrupted'),('six-original-equipment-identities','__p6EquipmentMetadata'),('Pain-Red-actual-finisher-catalogue','__p6FinishersCatalogue')]:record(name,'window.'+fn+'()')
 for face in [1,-1]:
  for slot in ['special','specialForward','super']:record('RedBlaster-real-grenades-'+str(face)+'-'+slot,'window.__p6RedGrenades('+str(face)+','+json.dumps(slot)+')')
  record('RedBlaster-burst-reserve-and-zero-damage-wire-'+str(face),'window.__p6RedReserveWire('+str(face)+')')
  record('RedBlaster-actual-low-guard-wire-minimum-chip-'+str(face),'window.__p6RedWireLowGuard('+str(face)+')')
 for uid,index in [('core__pain',2),('core__redblaster_mg2',0)]:
  record('actual-finisher-scene-'+uid,'window.__p6FinishersScene('+json.dumps(uid)+','+str(index)+')');b.screenshot(str(width)+'-actual-finisher-'+uid)
  record('actual-finisher-active-phase-capture-'+uid,'window.__p6FinishersScene('+json.dumps(uid)+','+str(index)+',1)');b.screenshot(str(width)+'-actual-active-finisher-'+uid)
 state=record('native-props-actually-drawn','window.CQC_PASS6_PROP_ART.diagnostics()');assert state['counts']['projectile']>0 and state['counts']['trap']>0 and state['counts']['barrier']>0
 print(f'{width}px gameplay: actual origins, native effects and equipment resource/counterplay cases complete.',flush=True)
def supplemental_checks(b,width,evaluator=None):
 ev=evaluator or b.evaluate;record=lambda n,s:b.record(str(width)+'-'+n,s,ev)
 ev(INSTALL)
 for face in [1,-1]:record('RedBlaster-actual-low-guard-wire-minimum-chip-'+str(face),'window.__p6RedWireLowGuard('+str(face)+')')
 for uid,index in [('core__pain',2),('core__redblaster_mg2',0)]:
  record('actual-finisher-native-effects-scene-'+uid,'window.__p6FinishersScene('+json.dumps(uid)+','+str(index)+')')
  record('actual-finisher-active-phase-capture-'+uid,'window.__p6FinishersScene('+json.dumps(uid)+','+str(index)+',1)');b.screenshot(str(width)+'-actual-active-finisher-'+uid)
 print(f'{width}px supplement: real low-guard wire minimum chip, native Pain hornets and Red authored grenade arcs physically captured.',flush=True)
def observed_counts(checks):
 names=[c['name']for c in checks]
 return {'completedChecks':len(checks),'sourceOrigins':sum('-source-origin-' in x for x in names),'nativeIdleDraws':sum('-native-idle-' in x for x in names),'actualContactCases':sum('-contact-' in x for x in names),'PainBarrierCases':sum('Pain-actual-two-hit-native-barrier' in x for x in names),'FuryTrapHeatCases':sum('Fury-actual-native-trap-and-heat' in x for x in names),'EndAmmoCases':sum('End-five-ammo-super-reload' in x for x in names),'EndActualInterruptedReloadCases':sum('End-actual-projectile-interrupted-reload' in x for x in names),'FearCloakCases':sum('Fear-cloak-collision' in x for x in names),'RedGrenadeCases':sum('RedBlaster-real-grenades' in x for x in names),'RedReserveZeroDamageWireCases':sum('RedBlaster-burst-reserve-and-zero-damage-wire' in x for x in names),'RedActualLowGuardWireChipCases':sum('RedBlaster-actual-low-guard-wire-minimum-chip' in x for x in names),'ActualFinisherModalCases':sum('Pain-Red-actual-finisher-catalogue' in x for x in names)*2,'ActualFinisherSceneCases':sum('-actual-finisher-scene-' in x or '-actual-finisher-native-effects-scene-' in x for x in names),'ActualFinisherActiveCaptureCases':sum('-actual-finisher-active-phase-capture-' in x for x in names)}
