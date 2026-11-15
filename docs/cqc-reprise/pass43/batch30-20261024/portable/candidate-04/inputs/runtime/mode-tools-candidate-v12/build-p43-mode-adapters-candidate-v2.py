"""Generate finite P43 candidates from current contracts + actually compiled Root-reviewed metadata.
No product writes, image edits, art approval, game injection or UI-PASS claims.
"""
from pathlib import Path
import hashlib,json,re,sys,os,subprocess
B=Path('/workspace/cqc-p43-resume-20261025');I=B/'integration';A=Path('/workspace/cqc-pass21-application/public/cqc')
sha=lambda b:hashlib.sha256(b).hexdigest()
def read(p):
 p=Path(p);fd=os.open(p,os.O_RDONLY|os.O_NOATIME)
 with os.fdopen(fd,'rb') as f:return f.read()
def pin(p,h):
 b=read(p);assert sha(b)==h,str(p);return b
def fresh(p):
 p=Path(p);assert p.is_relative_to(I) and p.resolve()==p and not p.exists();return p
def selected_action(slot,m,base):
 if m['kind']=='projectile':return 'shoot' if m['tag'] in ['ballistic','precision','tranq','fire'] else 'blade' if m['tag'] in ['blade','knife','boomerang'] else 'deploy'
 if m['kind']=='melee':return 'throw' if m['tag']=='grapple' or slot=='throw' else 'blade' if m['tag'] in ['blade','knife','machete','spear','tentacle'] else 'low' if slot=='low' else 'heavy' if slot=='heavy' else 'punch'
 return {'reload':'reload','recover':'recover','parry':'parry'}.get(m['kind'],base.get(slot))
cfg=json.loads(read(sys.argv[1]));assert cfg['schema']=='cqc.p43.mode-adapter-build/1'
stage=Path(cfg['stage']);assert stage.is_relative_to(I) and stage.resolve()==stage
out=fresh(cfg['output']);archive=json.loads(pin(stage/'ARCHIVE_FILES.json',cfg['archiveFilesSHA256']))
manifest=json.loads(pin('/workspace/cqc-p43-resume-20261025/sources-recovery/restored-p43/excel/P43_MANIFEST_30_CANONICAL_FIXED_V1.json','6edcd1f735da0d0fd4d525c8dbead45a714f295fc64e1165d64585623ea0a574'));fixed={(e['uid'],e['id']) for e in manifest['entries']}
contracts=json.loads(pin('/workspace/cqc-p43-resume-20261025/qa/actual-current-contracts-v1/versus-current-contracts-v1.json','829e61f42597763ac6f9c130593e5307cc02b42b81a9970d1b634d29855a4422'))
corecontracts=json.loads(pin('/workspace/cqc-p43-resume-20261025/qa/actual-current-contracts-v1/P43_CORE_MOVES_STATIC_DERIVATION_CURRENT_V2.json','a76061f18d617ecec00eeaf1c5a7f22c855d8ebc9b6e92ed696f885f2519d02f'))['entries']
catalograw=pin(A/'src/cqc-pass18-vfx-catalog.js','bb92d120bb64fb8146cf6395f792e9ae3c07e68f0d4e6df4ea15dd3af2af79c2');catalog=json.loads(catalograw.decode().split('const catalog=',1)[1].split(';root.CQC_PASS18_VFX_CATALOG=',1)[0])
corevariants=None;coreMetadataByKey={};coreVariantModule=b'';contactProfile=None;contactKeys=set()
if cfg.get('coreVariantsReport'):
 raw=pin(cfg['coreVariantsReport']['path'],cfg['coreVariantsReport']['sha256']);assert len(raw)==cfg['coreVariantsReport']['bytes'];corevariants=json.loads(raw);assert corevariants['schema']=='cqc.p43.core-mode-variants-candidate/1' and corevariants['runtimeAdmitted'] is False
 coreVariantModule=pin(corevariants['module']['path'],corevariants['module']['sha256'])
 for r in corevariants['metadataFiles']:
  raw=pin(r['path'],r['sha256']);assert len(raw)==r['bytes'];d=json.loads(raw);coreMetadataByKey[(d['uid'],d['id'])]=(r,d)
if cfg.get('contactProfileReport'):
 raw=pin(cfg['contactProfileReport']['path'],cfg['contactProfileReport']['sha256']);assert len(raw)==cfg['contactProfileReport']['bytes'];contactProfile=json.loads(raw);assert contactProfile['schema']=='cqc.p43.venom-native-contact-candidate/1' and contactProfile['runtimeAdmitted'] is False
 contactKeys={k for k,v in contactProfile['contacts']};assert contactKeys<=set(uid+':'+id for uid,id in coreMetadataByKey)
core=[];guns=[];cqc=[];bursts=[];inputs=[];corebindings=[];holds=[];atlases={}
tagmap={'bullet':'ballistic','tranq':'tranq','grenade':'explosive','debris':'debris','rocketArm':'rocket-arm'}
effectmap={'core__snake':'tranquilizer-dart','core__snake_pw':'rifle-tracer','core__solid':'pistol-tracer','core__venom':'pistol-tracer','core__raiden_mgs2':'pistol-tracer','core__mantis':'telekinetic-fragment'}
seen=set()
for record in archive['files']:
 if not record['logicalPath'].endswith('/metadata-v2.json'):continue
 p=Path(record['path']);assert p.is_relative_to(stage);raw=pin(p,record['sha256']);assert len(raw)==record['bytes'];data=json.loads(raw)
 uid,id=data['uid'],data['id'];assert (uid,id) in fixed and (uid,id) not in seen;seen.add((uid,id))
 option=data['option'];sprite=option['sprite'];key=uid+':'+id;profile=contracts['entries'][uid]['fighter']['combat']['moves'];review=sprite['review'];audit=review['artAuditSHA256'];assert review['status']=='approved' and review['reviewer'].startswith('Root') and data['artAuditSHA256']==audit
 assert sprite['uid']==uid and sprite['pass40Revision']=='native-batch40-v2' and sprite['mirror'] is False and sprite['fallbackMissingActions'] is False
 common={'metadataSHA256':record['sha256'],'artAuditSHA256':audit};inputs.append({'key':key,**common,'metadataBytes':record['bytes']})
 if uid in corecontracts:
  coreRecord,coreData=coreMetadataByKey.get((uid,id),(record,data));coreSprite=coreData['option']['sprite'];coreCommon={'metadataSHA256':coreRecord['sha256'],'artAuditSHA256':coreSprite['review']['artAuditSHA256']}
  core.append([key,{'uid':uid,'id':id,**coreCommon}])
  coreSlots={**corecontracts[uid]['slots'],**{k:v for k,v in corecontracts[uid].get('stanceVariants',{}).get('gun',{}).items() if isinstance(v,dict) and 'move' in v}}
  for slot,c in coreSlots.items():
   if not c['move'].get('projectile'):continue
   if key in contactKeys and uid=='core__venom' and slot=='specialDown':continue
   tag=tagmap[c['move']['projectile']['kind']];anchors=[a for a in coreSprite.get('pass40Attachments',[]) if a['slot']==slot and a['tag']==tag]
   if len(anchors)==2 and {a['side'] for a in anchors}=={'left','right'}:
    corebindings.append([key+':'+slot,{'sourceSlot':slot,'tag':tag,'actualMoveName':c['moveName']}])
   else:holds.append({'key':key,'mode':'Core','slot':slot,'moveName':c['moveName'],'projectileKind':c['move']['projectile']['kind'],'reason':'No exactly tagged, same-slot, both-facing Root-reviewed native attachment. Different weapon/emit pose is not substituted.'})
 projectile_moves=[(slot,m) for slot,m in profile.items() if m['kind']=='projectile']
 if projectile_moves:
  slot,m=projectile_moves[0];anchors=[a for a in sprite.get('pass40Attachments',[]) if a['side']=='right' and a['slot']==slot and a['tag']==m['tag']];assert len(anchors)==1
  assert uid in effectmap,'Unreviewed Support effect '+uid
  effect=effectmap[uid];atlas=catalog['effects'][effect];assert atlas['id']==effect;atlases[effect]=atlas
  guns.append([key,{'slot':slot,'tag':m['tag'],**common,'presentation':effect}])
  delayed={}
  for slot,m in projectile_moves:
   if not(m.get('count',1)>1 and m.get('interval',0)>0):continue
   sides=[]
   for side,groups in [('right',sprite['actions']),('left',sprite['oppositeActions'])]:
    anchors=[a for a in sprite.get('pass40Attachments',[]) if a['side']==side and a['slot']==slot and a['tag']==m['tag']];assert len(anchors)==1;anchor=anchors[0];action=anchor['action']
    matches=[f for f in groups[action]['frames'] if f['file']==anchor['file'] and f['sha256']==anchor['sourceSHA256'] and f['rect']==anchor['rect'] and f['pivot']==anchor['pivot']];assert matches and len({f['physicalPoseIndex'] for f in matches})==1
    sides.append({'action':action,'physicalPoseIndex':matches[0]['physicalPoseIndex'],'tag':m['tag']})
   assert sides[0]==sides[1];delayed[slot]=sides[0]
  if delayed:bursts.append([key,{'revision':'native-batch40-v2','audit':audit,'metadataSHA256':record['sha256'],'metadataBytes':record['bytes'],'slots':delayed}])
 else:
  moves={};sources={'right':{},'left':{}}
  for kind,slot in [('punch','light'),('throw','throw')]:
   m=profile[slot]
   if m['kind']!='melee' or m.get('travel',0)!=0 or m.get('requiresStagger') or m['tag'] not in ['strike','grapple','blade','machete','spear'] or slot=='throw' and m['tag']!='grapple':
    holds.append({'key':key,'mode':'Support','slot':slot,'moveName':m['name'],'reason':'Conditional or unknown melee mechanic is not converted to a free unconditional contact.'});moves[kind]=None;continue
   original=contracts['entries'][uid]['sprite'];native=original['actions']['idle']['frames'][0]['file'].startswith('assets/combat-sprites-pass18/');action=selected_action(slot,m,sprite['actionMap']) if native else sprite['actionMap'][slot];assert action in sprite['actions'] and action in sprite['oppositeActions']
   moves[kind]={k:m[k] for k in ['startup','active','recovery','damage','reach','tag']};moves[kind].update({'slot':slot,'action':action,'travel':0})
   roles=[]
   for side,groups in [('right',sprite['actions']),('left',sprite['oppositeActions'])]:
    indices=sprite['phaseMap'][action]['active'];assert indices
    f=groups[action]['frames'][indices[0]];assert all(groups[action]['frames'][i]==f for i in indices)
    roles.append(f['physicalPoseIndex']);sources[side][action]={'selectedFrameIndex':indices[0],'selectedFrameIndices':indices,'sourceFile':f['file'],'sourceSHA256':f['sha256'],'sourceRect':f['rect'],'sourcePivot':f['pivot'],'physicalPoseIndex':f['physicalPoseIndex'],'sourceStandingHeight':sprite['sourceFrameHeights'][f['file']]}
   assert roles[0]==roles[1];moves[kind]['role']=roles[0]
  assert moves['punch']
  label=('LAME' if moves['punch']['action']=='blade' else 'FRAPPE')+(' · MAJ+J PRISE' if moves.get('throw') else '')
  cqc.append([key,{'uid':uid,'costume':id,'family':option['family'],'revision':'native-batch40-v2',**common,'displayHeight':sprite['displayHeight'],'moves':moves,'sources':sources,'controlsLabel':label}])
assert seen and len(seen)<=30
pins={'core-native-origins': '8e65dd372c5256159af46dffb2409968797098d9b74d9a53f1c290e8491d64b9', 'vs-delayed-bursts': '70ba522f81f9cfcdd634c9dcfa5c887f60cc3e167a4fd12d70b4c11b69b0e95a', 'support-native-guns': '6802e7d12007b192c443b323fab3d9205b1f74c9030787288a4e7e68d9e6f2bb', 'support-native-cqc': 'ca1df1fa97ea1750431ea4c2b811c065e4c83d88e71c577080aeafa4f71b90f9'}
out.mkdir();generated=[]
for name,rows in [('core-native-origins',core),('vs-delayed-bursts',bursts),('support-native-guns',guns),('support-native-cqc',cqc)]:
 if not rows:continue
 template=Path('/workspace/cqc-p43-resume-20261025/runtime/mode-tools-candidate-v12/templates')/('cqc-pass43-'+name+'-v1.template.js');s=pin(template,pins[name]).decode();assert s.count('__P43_SCOPE_JSON__')==1;s=s.replace('__P43_SCOPE_JSON__',json.dumps(rows,separators=(',',':')))
 if name=='core-native-origins':
  s=s.replace('__P43_CORE_CONTRACTS_JSON__',json.dumps(corecontracts,separators=(',',':'))).replace('__P43_CORE_BINDINGS_JSON__',json.dumps(corebindings,separators=(',',':')))
  if coreVariantModule:s=coreVariantModule.decode()+'\n'+s
 if name=='support-native-guns':s=s.replace('__P43_PROJECTILE_ATLASES_JSON__',json.dumps(atlases,separators=(',',':')))
 assert '__P43_' not in s
 p=out/('cqc-pass43-'+name+'-v1.js');p.write_text(s);check=subprocess.run(['node','--check',str(p)],capture_output=True,text=True);assert check.returncode==0,check.stderr
 generated.append({'path':str(p),'logicalPath':'src/'+p.name,'bytes':p.stat().st_size,'sha256':sha(read(p)),'scope':[r[0] for r in rows],'template':str(template),'templateSHA256':pins[name],'syntax':'PASS'})
result={'schema':'cqc.p43.mode-adapters-candidate/1','approved':False,'runtimeAdmitted':False,'productMutations':False,'archiveFilesSHA256':cfg['archiveFilesSHA256'],'metadataInputs':inputs,'files':generated,'scopes':{'core':len(core),'versusDelayed':len(bursts),'supportProjectiles':len(guns),'supportMelee':len(cqc)},'explicitHolds':holds,'coreProjectileBindings':corebindings,'coreVariantsReport':cfg.get('coreVariantsReport'),'contactProfileReport':cfg.get('contactProfileReport'),'additionalCoreMetadataRoutes':corevariants['metadataFiles'] if corevariants else [],'supportNativeEffects':list(atlases),'legacyDelegation':'New exact keys intercept only through existing P40/P39 engine protocols and delegate installed P40/P41/P42 for all prior keys.','installOrder':'Index/nativeSDK first, then mode-specific P43 adapters; Support machine-motion P43 module last after all these adapters with supportActor and supportFrame hook.','qualifications':['No actual combat/UI PASS is created by generation.','Support movement/contact/shot rules remain authored mode adaptation; no official retail physics certification.','Core different weapons without exact both-facing reviewed native points remain explicit holds.','Thirty art targets remain independent of these shared adapters; adapter count is not costume count.']}
p=out/'MODE_ADAPTER_CANDIDATE_REPORT_V1.json';p.write_text(json.dumps(result,indent=2)+'\n');print(json.dumps({'output':str(out),'reportSHA256':sha(read(p)),'files':generated,'scopes':result['scopes'],'explicitHolds':holds}))
