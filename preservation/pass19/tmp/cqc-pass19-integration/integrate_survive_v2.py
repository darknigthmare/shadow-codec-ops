import pathlib,json,os,tempfile,hashlib
APP=pathlib.Path('/tmp/cqc-pass19-application');SRC=APP/'public/cqc/src';OUT=pathlib.Path('/tmp/cqc-pass19-integration')
sha=lambda b:hashlib.sha256(b).hexdigest()
rows=[]
def write(p,b):
 old=p.read_bytes() if p.exists() else None;fd,t=tempfile.mkstemp(prefix=p.name+'.pass19-',dir=p.parent)
 with os.fdopen(fd,'wb') as f:f.write(b)
 os.replace(t,p);rows.append({'path':str(p.relative_to(APP)),'sourceSHA256':sha(old) if old else None,'outputSHA256':sha(b),'bytes':len(b)})
h=json.load(open('/tmp/cqc-pass19-survive-generation/NATIVE_SURVIVE_HANDOFF_V2.json'))
cat=pathlib.Path(h['candidateCatalog']['path']);b=cat.read_bytes();assert sha(b)==h['candidateCatalog']['sha256'];write(SRC/cat.name,b)
for item in h['items']:
 for face,rel in zip(['right','left'],item['files']):
  pin=item['sourcePins'][face];p=pathlib.Path(pin['source']);b=p.read_bytes();assert len(b)==pin['bytes'] and sha(b)==pin['sha256']
  target=APP/'public/cqc'/rel;target.parent.mkdir(parents=True,exist_ok=True)
  if target.exists():assert sha(target.read_bytes())==pin['sha256']
  else:os.link(p,target)
  rows.append({'path':str(target.relative_to(APP)),'sourceSHA256':pin['sha256'],'outputSHA256':pin['sha256'],'bytes':len(b),'operation':'immutable-new-source-link'})
reg=pathlib.Path('/tmp/cqc-pass19-reference-roster/cqc-pass19-roster-additions-v2.js');b=reg.read_bytes();assert sha(b)=='58e054714994559a1d8551ebaa47250ccbdb7ad34b4fb13ed8dd0b8184b91c03';write(SRC/reg.name,b)
combat=OUT/'cqc-pass19-combat-additions.js';write(SRC/combat.name,combat.read_bytes())
addon=r'''/* Add only native reviewed identities, preserving every baseline fighter. */
(function(root){'use strict';
function install(fighters){
 const result=root.CQC_PASS19_COMBAT_ADDITIONS.install(fighters,{isRenderable:f=>root.CQC_COMBAT_SPRITES.has(f.uid)||root.CQC_PASS18_MACHINES?.has(f.uid)});
 const added=fighters.filter(f=>result.added.includes(f.uid));
 const records=added.map(f=>root.CQC_PASS19_COSTUMES.createRosterRecord({uid:f.uid,name:f.name,game:f.ep,basePresentation:'nextgen',nativeBody:root.CQC_COMBAT_SPRITES.has(f.uid)?'sprite':'rig',alreadyMechanical:f.pass19Reference.appearanceKind==='machine',surviveIncarnation:f.pass19Reference.episode==='SURVIVE'}));
 if(records.length)root.CQC_PASS19_COSTUMES.addRoster(records);
 root.CQC_PASS19_RETRO_PRESENTATIONS.registerAll();root.CQC_PASS19_MACHINE_PIXEL_STYLE.registerAll();
 const heights={};for(const f of added){const ref=f.pass19Reference;if(Number.isFinite(ref.worldHeightMeters)&&ref.worldHeightMeters>0)heights[f.uid]={metres:ref.worldHeightMeters,evidence:'estimated-source-incarnation-display',sources:ref.referenceIds.map(id=>root.CQC_PASS19_ROSTER_ADDITIONS.registry.references.find(r=>r.id===id)?.url).filter(Boolean),scope:ref.heightQualification,absoluteHeightCertified:false};}
 root.CQC_PASS19_WORLD_SCALE.configure(heights);root.CQC_PASS19_WORLD_SCALE.install();
 root.CQC_PASS19_ROSTER_RESULT=result;return result;
}
function finishers(catalog,fighters){
 const template=Object.values(catalog.profiles)[0];
 for(const f of fighters.filter(f=>f.uid.startsWith('pass19__'))){
  if(catalog.profiles[f.uid])continue;
  const family=f.pass19Reference.appearanceKind==='machine'?'mechanical':f.pass19Reference.appearanceKind==='creature'?'beast':'cqc';
  const moves=['super','specialDown','specialForward','throw'];
  const profile={...template,uid:f.uid,fighterName:f.name,episode:f.ep,source:f.source,family,basis:f.combat.basis,evidence:'adaptation',visual:f.visual,color:f.color,accent:f.accent,power:f.power,speed:f.speed,reach:f.reach,finishers:template.finishers.map((fin,i)=>({...fin,id:f.uid+'::finisher'+(i+1),name:f.combat.moves[moves[i]].name+' · conclusion',family,loreBasis:f.combat.basis,description:'Séquence de conclusion créée pour ce duel à partir de '+f.combat.moves[moves[i]].name+'.',sourceMoves:[f.combat.moves[moves[i]].name],canonical:false,evidence:'adaptation',gore:false}))};
  catalog.profiles[f.uid]=profile;
 }
 catalog.fighterCount=Object.keys(catalog.profiles).length;catalog.finisherCount=Object.values(catalog.profiles).reduce((n,p)=>n+p.finishers.length,0);
}
root.CQC_PASS19_ROSTER_NATIVE={install,finishers};
})(globalThis);
'''
write(SRC/'cqc-pass19-roster-native.js',addon.encode())
p=APP/'public/cqc/modules/unified-versus-v055.html';s=p.read_text()
def rep(a,b):
 global s
 assert s.count(a)==1,(a[:130],s.count(a));s=s.replace(a,b)
rep('<script src="../src/cqc-pass18-npc1-sprite-catalog.js"></script>','<script src="../src/cqc-pass18-npc1-sprite-catalog.js"></script>\n<script src="../src/cqc-pass19-survive-sprite-catalog-v2.js"></script>')
rep('<script src="../src/cqc-pass19-original-costumes.js"></script>','<script src="../src/cqc-pass19-original-costumes.js"></script>\n'+''.join('<script src="../src/'+n+'"></script>\n' for n in ['cqc-pass19-roster-additions-v2.js','cqc-pass19-combat-additions.js','cqc-pass19-roster-native.js']))
rep('window.CQC_PASS18_ROSTER_PRESENTATION?.apply(FIGHTERS);','window.CQC_PASS19_ROSTER_NATIVE.install(FIGHTERS);\nwindow.CQC_PASS18_ROSTER_PRESENTATION?.apply(FIGHTERS);')
rep('const FIN46=window.CQC_FINISHERS_053;','const FIN46=window.CQC_FINISHERS_053;window.CQC_PASS19_ROSTER_NATIVE.finishers(FIN46,FIGHTERS);')
rep('<span>PARALLAXE · OC</span>','<span>PARALLAXE · DOSSIER PERSONNEL</span>')
write(p,s.encode())
# Core loads the native artwork for common wardrobe/inspection, while its
# separate authored character engine remains restricted to its own roster.
p=APP/'public/cqc/modules/core-v032.html';s=p.read_text();a='<script src="../src/cqc-pass18-npc1-sprite-catalog.js"></script>';assert s.count(a)==1;s=s.replace(a,a+'\n<script src="../src/cqc-pass19-survive-sprite-catalog-v2.js"></script>');write(p,s.encode())
r={'schema':'cqc.pass19.native-survive-integrated/2','status':'applied-awaiting-browser-match-qa','nativeUIDs':h['approvedUIDs'],'physicalPoses':h['approvedPhysicalPoses'],'files':rows,'baselineFighterRemovalCount':0,'qualification':'New fighters are Versus playable; Core has its separate authored roster. Gameplay adaptation and estimated dimensions remain explicit.'}
p=OUT/'SURVIVE_NATIVE_ATOMIC_INTEGRATION_ACTUAL_V2.json'
with p.open('x') as f:json.dump(r,f,indent=2,ensure_ascii=False)
print(json.dumps({'receipt':str(p),'sha256':sha(p.read_bytes()),'uids':r['nativeUIDs']}))
