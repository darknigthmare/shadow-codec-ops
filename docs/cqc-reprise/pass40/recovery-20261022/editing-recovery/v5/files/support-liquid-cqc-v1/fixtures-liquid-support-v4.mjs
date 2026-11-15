import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {gunzipSync} from 'node:zlib';
import {createHash} from 'node:crypto';

const base='@PROJECT_ROOT@/',dir=base+'support-liquid-cqc-v1/';
const clone=value=>JSON.parse(JSON.stringify(value)),digest=raw=>createHash('sha256').update(raw).digest('hex');
const authority=JSON.parse(fs.readFileSync(dir+'SOURCE_AUTHORITY_LITERAL_V1.json','utf8'));
const metadataPath=base+'integration-v2/originals-three-qa/v6/compiled-local-v6/core__liquid--nextgen--metadata-v2.json';
const metadataBytes=fs.readFileSync(metadataPath);assert.equal(digest(metadataBytes),authority.metadataSHA256);
const metadata=JSON.parse(metadataBytes),contracts=JSON.parse(gunzipSync(fs.readFileSync(base+'integration-v2/runtime/ACTUAL_FIGHTER_CONTRACTS_AFTER_CANONICAL_EIGHT_V1.json.gz')));
const rendererPath=base+'integration-v2/proposals/vs-delayed-p40-burst-v1/cumulative-staged-v1/src/cqc-sprite-renderer.js';
const renderer=fs.readFileSync(rendererPath,'utf8');assert.equal(digest(renderer),'ca1b36c81606d2fa29bc2d9ebc631db3c33a25257023068f03a728bba930f756');
const sdkPath=base+'integration-v2/cumulative-nineteen-qa/v1/compiled-immutable-v2/cqc-pass40-native-batch-index-v2.js';
const sdk=fs.readFileSync(sdkPath,'utf8');
const world=fs.readFileSync('@APP_ROOT@/public/cqc/src/cqc-pass19-world-scale.js','utf8');
const gunsPath=base+'support-p40-scope17-candidate-v1/native-target-bounds-v1/cqc-pass40-support-native-guns-v3.proposed.js',guns=fs.readFileSync(gunsPath,'utf8');
assert.equal(digest(guns),'0d2b5db3635836b3bd0db95f2af050f3642bb0d843a68c312a9eaebbfbf2e845');
const adapterPath=dir+'cqc-pass40-liquid-support-v2.proposed.js',adapter=fs.readFileSync(adapterPath,'utf8'),results=[];
function fixture(withAdapter=true){
  const canvas={id:'gameCanvas',width:1280,height:720},calls={legacyRequests:[],legacyUpdates:[],legacyDraws:[],nativeDraws:[]};
  const root=vm.createContext({URL,console,CQC_NATIVE_WARDROBE_INDEX:{schema:'cqc.native-wardrobe-index/1',entries:[]},
    CQC_PASS19_NATIVE_ORIGINS:{projectile(){throw Error('No firearm origin belongs to Liquid Support CQC');}},
    CQC_COMBAT_SPRITE_CATALOG:{schema:'cqc.combat-sprites/1',entries:{core__liquid:clone(contracts.entries.core__liquid.sprite)}},
    CQC_COMBAT_COSTUME_CATALOG:{schema:'cqc.combat-costumes/1',entries:{core__liquid:{default:'original',options:[{id:'original',label:'Original'},clone(metadata.option)]}}},
    document:{getElementById:id=>id==='gameCanvas'?canvas:null}});
  vm.runInContext(renderer,root);vm.runInContext(sdk,root);vm.runInContext(world,root);
  const actualGet=root.CQC_COMBAT_SPRITES.getEntry;let ready=true,entryMutator=value=>value;
  root.CQC_COMBAT_SPRITES.getEntry=function(uid,fighter){
    if(uid==='fixture_target')return{uid,displayHeight:200,baseFrameHeight:200,facing:-1,actions:{idle:{frames:[{rect:[0,0,70,200],pivot:[.5,1],clipPolygon:[[0,0],[1,0],[1,1],[0,1]]}]}}};
    const value=actualGet.call(this,uid,fighter);return uid==='core__liquid'&&fighter?.costume==='nextgen'?entryMutator(value):value;
  };
  root.CQC_COMBAT_SPRITES.status=()=>({ready});
  root.CQC_COMBAT_SPRITES.draw=function(context,fighter,x,y,face,scale,pose){
    const entry=this.getEntry(fighter.uid,fighter),actions=face===entry.facing?entry.actions:entry.oppositeActions;
    const selected=this.selectFrame({...entry,actions},pose);
    calls.nativeDraws.push({uid:fighter.uid,costume:fighter.costume,x,y,face,scale,phase:pose.attackPhase,move:pose.moveSlot,action:selected.action,role:selected.frame.physicalPoseIndex});return true;
  };
  const bridge={selectedLead:f=>f,leadScale:()=>.9,resolveEnemy:(operation)=>operation?.nativeTarget?{uid:'fixture_target'}:{simulation:true},
    drawLead:function(context,fighter,x,y,face,scale,pose){calls.legacyDraws.push({uid:fighter.uid,costume:fighter.costume,x,y,face,scale,pose:clone(pose)});return true;}};
  root.CQC_SUPPORT_NATIVE_ACTORS=bridge;root.CQC_SUPPORT_NATIVE_ACTOR_FACTORY={SCALE:.9};
  const legacy={uid:'legacy-router',requestShot:function(state,keys){calls.legacyRequests.push({uid:state.lead.uid,costume:state.lead.costume,keys:[...keys]});return ['pass40__raiden_r00','pass19__fenrir_mgr'].includes(state.lead.uid);},
    update:function(state){calls.legacyUpdates.push({uid:state.lead.uid,frame:state.frame});return 'legacy-update';},drawShot:()=>false};
  root.CQC_PASS39_RAPTOR_SUPPORT=legacy;vm.runInContext(guns,root);const oldRouter=root.CQC_PASS39_RAPTOR_SUPPORT,oldDraw=bridge.drawLead;
  if(withAdapter)vm.runInContext(adapter,root);
  function state(uid='core__liquid',costume='nextgen'){
    const lead={uid,...(costume?{costume}:{})};return{lead,o:{},frame:0,hero:{x:400,y:590,vy:0,life:10000,max:10000,ammo:12,rations:2,cool:0,inv:0,power:0},enemies:[],shots:[],ended:false};
  }
  function enemy(x,y=590){return{x,y,life:3000,max:3000,kind:'soldier',flash:0,cool:40,slow:0};}
  function hostShot(state,keys){if(root.CQC_PASS39_RAPTOR_SUPPORT.requestShot(state,keys))return;if(state.hero.cool>0||state.hero.ammo<=0)return;state.hero.ammo--;state.hero.cool=10;state.shots.push({x:state.hero.x+25,y:state.hero.y-85,vx:17,damage:260});}
  function tick(state,{walk=0,draw=true}={}){
    state.frame++;state.hero.cool=Math.max(0,state.hero.cool-1);state.hero.x=Math.max(45,Math.min(1230,state.hero.x+walk));
    root.CQC_PASS39_RAPTOR_SUPPORT.update(state);
    if(draw)bridge.drawLead({canvas},state.lead,state.hero.x,state.hero.y,walk<0?-1:1,.9,{time:state.frame/60,walk:!!walk,jump:state.hero.y<589,shoot:state.hero.cool>0,hit:state.hero.inv>18});
  }
  return{root,calls,bridge,oldRouter,oldDraw,canvas,state,enemy,hostShot,tick,setReady:x=>ready=x,mutateEntry:x=>entryMutator=x};
}
function test(label,run){run();results.push({label,passed:true,syntheticGameplayFixture:true,actualRasterOrBrowserClaimed:false});}

for(const face of [1,-1])for(const kind of ['punch','throw','charge'])test('Actual Root source '+kind+' facing '+face+' plus one hit/ammo0/no projectile',()=>{
  const f=fixture(),s=f.state(),keys=new Set(face===-1?['ArrowLeft']:['ArrowRight']);
  if(kind!=='punch')keys.add('ShiftLeft');if(kind==='throw')keys.delete(face===-1?'ArrowLeft':'ArrowRight');
  if(kind==='throw'&&face===-1){f.hostShot(s,new Set(['ArrowLeft']));s.frame=100;s.hero.cool=0;f.tick(s);}
  const start=s.frame,enemy=f.enemy(s.hero.x+face*65);s.enemies=[enemy];f.hostShot(s,keys);
  const before=enemy.life,diag=f.root.CQC_PASS40_LIQUID_SUPPORT.diagnostics();assert.equal(diag.lastAttack.kind,kind);assert.equal(diag.lastAttack.face,face);
  const expectedDamage=authority.moves[kind].damage;
  for(let i=0;i<diag.lastAttack.total+3;i++)f.tick(s);
  assert.equal(enemy.life,before-expectedDamage);assert.equal(s.hero.ammo,12);assert.equal(s.shots.length,0);
  const active=f.calls.nativeDraws.filter(row=>row.phase==='active'&&row.move===authority.moves[kind].slot);assert(active.length);assert(active.every(row=>row.role===authority.moves[kind].role&&row.action===authority.moves[kind].action&&row.face===face));
  assert(f.root.CQC_PASS40_LIQUID_SUPPORT.diagnostics().lastHit.frame>=start+authority.moves[kind].startup);
});
test('Ground punch remains planted under held movement, then movement resumes',()=>{
  const f=fixture(),s=f.state(),keys=new Set(['ArrowRight']);f.hostShot(s,keys);const x=s.hero.x;
  for(let i=0;i<20;i++){f.tick(s,{walk:5});assert.equal(s.hero.x,x);}f.tick(s,{walk:5});assert.equal(s.hero.x,x+5);
});
for(const face of [1,-1])test('Charge fixed hero-only travel and edge clamp '+face,()=>{
  const f=fixture(),s=f.state();s.hero.x=face===1?1220:55;const start=s.hero.x;f.hostShot(s,new Set([face===1?'ArrowRight':'ArrowLeft','ShiftLeft']));
  for(let i=0;i<57;i++){f.tick(s);const x=s.hero.x;f.root.CQC_PASS39_RAPTOR_SUPPORT.update(s);assert.equal(s.hero.x,x);}
  assert.equal(s.hero.x,face===1?1230:45);assert(Math.abs(s.hero.x-start)<=49);assert.equal(s.shots.length,0);
});
test('Throw cannot hit an airborne target or two enemies',()=>{
  const f=fixture(),s=f.state(),air=f.enemy(450,500),a=f.enemy(460),b=f.enemy(470);s.enemies=[air,a,b];f.hostShot(s,new Set(['ShiftLeft']));for(let i=0;i<47;i++)f.tick(s);
  assert.equal(air.life,3000);assert.equal(a.life,3000-930);assert.equal(b.life,3000);
});
test('Targets behind and outside CQC reach are untouched',()=>{
  const f=fixture(),s=f.state();s.enemies=[f.enemy(380),f.enemy(620)];f.hostShot(s,new Set());for(let i=0;i<24;i++)f.tick(s);assert(s.enemies.every(e=>e.life===3000));
});
test('Native upright target bounds participate without global gun collision changes',()=>{
  const f=fixture(),s=f.state();s.o.nativeTarget=true;const e=f.enemy(460);s.enemies=[e];f.hostShot(s,new Set());for(let i=0;i<24;i++)f.tick(s);assert.equal(e.life,2680);assert.equal(f.root.CQC_PASS40_SUPPORT_NATIVE_GUNS.hitTest({},e,s.o),null);
});
test('Power snapshot changes melee damage once; later power expiry cannot repeat a hit',()=>{
  const f=fixture(),s=f.state(),e=f.enemy(460);s.enemies=[e];s.hero.power=10;f.hostShot(s,new Set());s.hero.power=0;for(let i=0;i<24;i++)f.tick(s);assert.equal(e.life,3000-Math.round(320*360/260));
});
for(const reason of ['hurt','jump','dash'])test('Interruption '+reason+' cancels CQC and keeps source hurt/jump/dash without shoot pose',()=>{
  const f=fixture(),s=f.state(),keys=new Set(),e=f.enemy(460);s.enemies=[e];f.hostShot(s,keys);f.tick(s);
  if(reason==='hurt')s.hero.inv=25;if(reason==='jump'){s.hero.y=560;s.hero.vy=-5;}if(reason==='dash'){keys.add('KeyK');s.hero.x+=75;}
  f.tick(s);for(let i=0;i<30;i++)f.tick(s);assert.equal(e.life,3000);assert.equal(s.shots.length,0);assert.equal(s.hero.ammo,12);
  assert(f.calls.legacyDraws.every(row=>row.pose.shoot===false));if(reason==='dash')assert.equal(s.hero.x,475);
});
test('Cooldown blocks a second request without restarting native phases',()=>{
  const f=fixture(),s=f.state();f.hostShot(s,new Set());const first=clone(f.root.CQC_PASS40_LIQUID_SUPPORT.diagnostics().lastAttack);f.tick(s);f.hostShot(s,new Set(['ShiftLeft']));assert.deepEqual(clone(f.root.CQC_PASS40_LIQUID_SUPPORT.diagnostics().lastAttack),first);assert.equal(s.shots.length,0);
});
test('Loading source, ungrounded actor and KO fail closed without a generic pistol',()=>{
  for(const condition of ['loading','jump','ko','ended']){const f=fixture(),s=f.state();if(condition==='loading')f.setReady(false);if(condition==='jump')s.hero.y=560;if(condition==='ko')s.hero.life=0;if(condition==='ended')s.ended=true;f.hostShot(s,new Set());assert.equal(s.shots.length,0);assert.equal(s.hero.ammo,12);assert.equal(f.root.CQC_PASS40_LIQUID_SUPPORT.diagnostics().accepted,0);}
});
for(const change of ['descriptorSHA','artAudit','mirror','fallback','physicalRole','sourceRect','sourcePivot','sourceSHA','missingOwnRegions','bindingAbsent'])test('Reject nonauthoritative source '+change+' without firearm fallback',()=>{
  const f=fixture(),s=f.state();
  if(change==='descriptorSHA')f.root.CQC_NATIVE_WARDROBE_INDEX.entries.find(e=>e.uid==='core__liquid'&&e.id==='nextgen').metadata.sha256='0'.repeat(64);
  else if(change==='bindingAbsent')f.root.CQC_PASS40_NATIVE_ORIGINS.owns=()=>false;
  else f.mutateEntry(value=>{const e=clone(value);if(change==='artAudit')e.review.artAuditSHA256='0'.repeat(64);if(change==='mirror')e.mirror=true;if(change==='fallback')e.fallbackMissingActions=true;if(change==='missingOwnRegions')e.nativeDirectionRegions.regions.pop();for(const key of ['actions','oppositeActions']){const frame=e[key].punch.frames[1];if(change==='physicalRole')frame.physicalPoseIndex=11;if(change==='sourceRect')frame.rect[0]++;if(change==='sourcePivot')frame.pivot[0]+=.01;if(change==='sourceSHA')frame.sha256='0'.repeat(64);}return e;});
  f.hostShot(s,new Set());assert.equal(s.shots.length,0);assert.equal(s.hero.ammo,12);assert.equal(f.root.CQC_PASS40_LIQUID_SUPPORT.diagnostics().accepted,0);
});
test('Router install stays once-only across50 calls and duplicate script is rejected',()=>{
  const f=fixture(),router=f.root.CQC_PASS39_RAPTOR_SUPPORT,draw=f.bridge.drawLead;for(let i=0;i<50;i++)f.root.CQC_PASS40_LIQUID_SUPPORT.install();assert.equal(f.root.CQC_PASS39_RAPTOR_SUPPORT,router);assert.equal(f.bridge.drawLead,draw);assert.throws(()=>vm.runInContext(adapter,f.root),/Duplicate Liquid/);
});
test('All seventeen guns, R00, Fenrir and original soldier retain exact legacy state and routing',()=>{
  const old=fixture(false),candidate=fixture(true),uids=[['pass40__raiden_r00'],['pass19__fenrir_mgr'],['core__solid'],['core__liquid','original'],...old.root.CQC_PASS40_SUPPORT_NATIVE_GUNS.diagnostics().scope.map(key=>key.split(':'))];
  for(const[uid,costume]of uids){const a=old.state(uid,costume||'original'),b=candidate.state(uid,costume||'original');const keys=new Set(['ArrowLeft']);old.hostShot(a,keys);candidate.hostShot(b,keys);for(let i=0;i<4;i++){old.tick(a);candidate.tick(b);}assert.deepEqual(clone(b),clone(a));}
  assert.deepEqual(candidate.calls.legacyRequests,old.calls.legacyRequests);assert.deepEqual(candidate.calls.legacyUpdates,old.calls.legacyUpdates);assert.deepEqual(candidate.calls.legacyDraws,old.calls.legacyDraws);assert.deepEqual(clone(candidate.root.CQC_PASS40_SUPPORT_NATIVE_GUNS.diagnostics()),clone(old.root.CQC_PASS40_SUPPORT_NATIVE_GUNS.diagnostics()));
});
test('Returning from live Liquid to an original soldier restores generic ammo and projectile exactly',()=>{
  const f=fixture(),liquid=f.state();f.hostShot(liquid,new Set());for(let i=0;i<24;i++)f.tick(liquid);
  const soldier=f.state('core__solid','original');f.hostShot(soldier,new Set());f.tick(soldier);
  assert.equal(soldier.hero.ammo,11);assert.equal(soldier.shots.length,1);assert.equal(soldier.shots[0].vx,17);
  assert.equal(f.calls.legacyDraws.at(-1).uid,'core__solid');assert.equal(f.calls.legacyDraws.at(-1).pose.shoot,true);
});
test('Context filtering leaves menu/other state draw calls unchanged',()=>{
  const f=fixture(),s=f.state();f.hostShot(s,new Set());f.bridge.drawLead({canvas:{id:'briefCanvas'}},s.lead,1,2,1,1.05,{shoot:true});const row=f.calls.legacyDraws.at(-1);assert.equal(row.pose.shoot,true);assert.equal(row.x,1);
});

const report={schema:'cqc.p40.support-liquid-source-and-router-fixtures/1',status:'passed-synthetic-gameplay-source-contract-fixtures',passed:results.length,
  actualSourceMetadataSHA256:authority.metadataSHA256,actualRendererSHA256:digest(renderer),actualSDK19SHA256:digest(sdk),adapterSHA256:digest(adapter),
  actualRasterReadinessMocked:true,actualBrowserGameplayClaimed:false,productMutations:false,results};
const raw=JSON.stringify(report,null,2)+'\n';fs.writeFileSync(dir+'LIQUID_SUPPORT_FIXTURE_RESULTS_ACTUAL_V4.json',raw);console.log(JSON.stringify({passed:results.length,sha256:digest(raw),syntheticOnly:true}));
