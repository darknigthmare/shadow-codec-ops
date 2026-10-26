"""Prepare real Core GUI configuration from Root-reviewed source jobs and exact AST.

No browser execution, source edits, state/storage setters, or art approvals occur here.
"""
from pathlib import Path
import json,hashlib,sys,os,datetime
R=Path('/workspace/cqc-p43-resume-20261025');Q=R/'qa'
def read(p):
 fd=os.open(p,os.O_RDONLY|os.O_NOATIME)
 with os.fdopen(fd,'rb')as f:return f.read()
def pin(p):
 p=Path(p);b=read(p);return {'path':str(p),'bytes':len(b),'sha256':hashlib.sha256(b).hexdigest()}
def checked(p):
 b=read(p['path']);assert hashlib.sha256(b).hexdigest()==p['sha256'];assert 'bytes'not in p or len(b)==p['bytes'];return json.loads(b)
bundlePath,compileConfigPath,admissionPath,runID=sys.argv[1:];assert all(c.isalnum()or c in '-_' for c in runID)
bundle=json.loads(read(bundlePath));assert bundle['schema']=='cqc.p43.candidate-route-bundle/1'and bundle['productMutations']is False
compileCfg=json.loads(read(compileConfigPath));assert compileCfg['schema']=='cqc.p43.native-batch-compile/2';assert len(compileCfg['jobs'])==30
manifest=checked(compileCfg['manifest']);movesPath=Q/'actual-current-contracts-v1/P43_CORE_MOVES_STATIC_DERIVATION_CURRENT_V2.json';assert pin(movesPath)['sha256']=='a76061f18d617ecec00eeaf1c5a7f22c855d8ebc9b6e92ed696f885f2519d02f';moves=json.loads(read(movesPath))['entries']
selected={}
for jr in compileCfg['jobs']:
 job=checked(jr['input']);review=checked(jr['review']);assert review['status']=='approved'and review['reviewer'].startswith('Root')and review['inputSHA256']==jr['input']['sha256'];selected[(job['uid'],job['id'])]=(job,jr)
assert len(selected)==30
def rolefor(j,action):
 g=j['plan']['actions'][action];indices=j['plan']['phaseMap'].get(action,{}).get('active',[0]);roles={g['roles'][i]for i in indices};assert len(roles)==1,(j['id'],action,roles);return next(iter(roles))
jobs=[];notApplicable=[]
for e in manifest['entries']:
 uid,cid=e['uid'],e['id'];j,jr=selected[(uid,cid)]
 if uid=='archive__captain':notApplicable.append({'uid':uid,'id':cid,'reason':'Absent from actual95fighter Core roster; no Core playability/QA claim.'});continue
 assert uid in moves;c=moves[uid];tests=[]
 def test(label,slot,role,**kw):
  m=c['slots'][slot];t={'label':label,'action':slot,'moveName':m['moveName'],'role':role,'projectile':bool(m['move'].get('projectile')),'expectedWindow':{'startup':m['move']['startup'],'active':m['move']['active'],'basis':'Exact captured Core AST V2; Venom attached-contact correction preserves these timings.'},**kw};
  if t['projectile']:t['projectileKind']=m['move']['projectile']['kind']
  tests.append(t);return t
 test('heavy-native','heavy',rolefor(j,'blade'if c['slots']['heavy']['move'].get('blade')else'punch'))
 test('low-native','low',rolefor(j,'low'))
 if uid=='core__venom':
  for pos in ['ranged','center']:
   for slot in ['special','specialDown']:test('attached-'+slot.lower()+'-'+pos,slot,10,position=pos,projectile=False)
 elif uid=='core__raiden_mgs2':
  test('blade-hf','special',rolefor(j,'blade'),expectedStanceBefore='blade',expectedStanceAfter='blade')
  test('switch-to-gun','specialDown',1,expectedStanceBefore='blade',expectedStanceAfter='gun')
  gun=c['stanceVariants']['gun'];tests.append({'label':'gun-heavy-human','action':'heavy','moveName':'heavy','role':rolefor(j,'punch'),'projectile':False,'expectedStanceBefore':'gun','expectedStanceAfter':'gun'})
  tests.append({'label':'gun-socom-shot','action':'special','moveName':gun['special']['moveName'],'role':11,'projectile':True,'projectileKind':'bullet','expectedStanceBefore':'gun','expectedStanceAfter':'gun','expectedResourceDelta':1})
  tests.append({'label':'gun-reload-max','action':'specialBack','moveName':gun['specialBack']['moveName'],'role':12,'projectile':False,'expectedStanceBefore':'gun','expectedStanceAfter':'gun','expectedResourceAfter':'max'})
  test('switch-to-blade','specialDown',1,expectedStanceBefore='gun',expectedStanceAfter='blade')
  tests.append({'label':'blade-back-is-hf','action':'specialBack','moveName':c['slots']['special']['moveName'],'role':rolefor(j,'blade'),'projectile':False,'expectedStanceBefore':'blade','expectedStanceAfter':'blade'})
 elif uid=='core__snake_pw':
  test('mk22-tranq-shot','special',10,expectedResourceDelta=1)
  test('mk22-reload-max','specialBack',9,expectedResourceAfter='max')
  test('msf-command-grab','specialDown',rolefor(j,'throw'))
 elif uid=='core__mantis':
  test('palm-debris','special',11)
  test('teleport-recover','specialDown',1)
  test('core-empty-hand-grapple','throw',8,position='ranged')
  test('core-debris-super','super',11)
 else:
  m=c['slots']['special']['move'];action='shoot'if m.get('projectile')else'blade'if m.get('blade')else'punch';test('primary-native','special',rolefor(j,action))
  m=c['slots']['specialDown']['move'];util=m.get('utility');action='reload'if util=='reload'else'deploy'if util in ['ripper','focus','reactiveShield']or m.get('projectile')else'recover'if util in ['weaponSwitch','armCharge','teleport']else'throw'if m.get('level')=='throw'else'punch';t=test('secondary-native','specialDown',rolefor(j,action))
  if util=='reload':t['expectedResourceAfter']='max'
  if 'specialBack'in c['slots']and c['slots']['specialBack']['move'].get('utility')=='bladeParry':test('hf-parry','specialBack',rolefor(j,'guard'))
 assert len(tests)>=4
 sources=[]
 for asset in j['assets']:
  sides={side for side in ['right','left']for m in j['roles'][side]if m['asset']==asset['key']};assert len(sides)==1,(cid,asset['key'],sides)
  row={'file':asset['file'],'sha256':asset['sha256'],'originalPath':asset['path'],'bytes':asset['bytes'],'face':1 if 'right'in sides else-1}
  if row not in sources:sources.append(row)
 jobs.append({'uid':uid,'id':cid,'sourceFiles':sources,'tests':tests,'independentReviewedSourceJob':jr['input'],'rootSourceReview':jr['review'],'expectedRolesBasis':'Exact approved physical source job plan + captured ASTCoreV2 + separately reviewed Core variant choices (PW10/9,Mantis11,Venom10,R2context). Not derived solely from compiled selected metadata.'})
assert len(jobs)==25 and len(notApplicable)==5
# Exercise mode-specific adapters early, then cover every remaining costume.
# This changes only test order, not the fixed manifest, admitted options or cases.
priority={'core__raiden_mgs2':0,'core__mantis':1,'core__venom':2,'core__snake_pw':3,'core__sam':4,'core__raiden':5,'core__sundowner':6,'core__solid':7,'core__snake':8}
jobs.sort(key=lambda j:(priority[j['uid']],j['id']))
cfg={'schema':'cqc.p43.actual-core-gui-candidate/1','authorizedLocalReversibleGUI':True,'authorizationBasis':'Explicit Root task to execute all25 Core costumes with actual GUI, fresh owned temporary profiles and no combat/localStorage injection. User continuing task authorizes local reversible testing.','rootAdmission':pin(admissionPath),'contract':pin(Q/'actual-current-contracts-v1/core-current-contracts-v1.json'),'routes':bundle['sources']+bundle['overrides'],'totalAddedOptionsCore':30,'jobs':jobs,'notApplicableCore':notApplicable,'output':'/tmp/p43-core-native25-recovery-'+runID,'durableReceiptOutput':str(Q/('CORE25_COMPACT_ACTUAL_'+runID+'.json')),'inputs':{'bundle':pin(bundlePath),'rootApprovedCompileConfiguration':pin(compileConfigPath),'coreASTMoves':pin(movesPath)},'createdAtUTC':datetime.datetime.now(datetime.timezone.utc).isoformat(),'qualification':'Actual execution not yet performed. All heavy files/screenshots and exact report go to a new task-owned/tmp directory, with a compact durable receipt; five Captain descriptors stay in index but are not playable Core cases.'}
out=Q/('CORE25_ACTUAL_GUI_CONFIG_'+runID+'.json');assert not out.exists();out.write_text(json.dumps(cfg,ensure_ascii=False,indent=2)+'\n');print(json.dumps(pin(out)));print(json.dumps({'coreJobs':len(jobs),'casesPlannedBothFacings':sum(len(j['tests'])*2 for j in jobs),'notApplicableCaptain':len(notApplicable)}))
