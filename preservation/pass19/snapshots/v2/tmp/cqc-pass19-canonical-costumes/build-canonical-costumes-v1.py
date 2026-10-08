import json, hashlib, re
from pathlib import Path
ROOT=Path('/tmp/cqc-pass19-canonical-costumes')
meta=json.load(open(ROOT/'BASELINE_NATIVE_SPRITE_METADATA_V1.json'))['entries']; by={e['uid']:e for e in meta}
roster=json.load(open(ROOT/'BASELINE_ACTUAL_VERSUS_ROSTER_V1.json'))
assert len(by)==338 and len(roster)==354
remakes=[
('core__snake','archive__naked_delta'),('core__boss','roster51__boss_delta'),('core__eva_mgs3','roster51__eva_delta'),('core__ocelot','roster51__ocelot_delta'),('core__volgin','roster51__volgin_delta'),('core__pain','roster51__pain_delta'),('core__fear','roster51__fear_delta'),('core__end','roster51__end_delta'),('core__fury','roster51__fury_delta'),('core__raikov_mgs3','roster51__raikov_delta'),('roster50__zero_mgs3','roster51__zero_delta'),('roster50__paramedic_mgs3','roster51__paramedic_delta'),('roster50__sigint_mgs3','roster51__sigint_delta'),('roster50__sokolov_mgs3','roster51__sokolov_delta'),('roster51__sorrow_mgs3','roster51__sorrow_delta'),('roster50__granin_mgs3','roster51__granin_delta'),('roster50__johnny_sr_mgs3','roster51__johnny_delta'),
('core__solid','archive__snake_tts'),('core__meryl_mgs1','roster51__meryl_tts'),('core__liquid','roster51__liquid_tts'),('core__fox','roster51__grayfox_tts'),('core__ocelot_mgs1','roster51__ocelot_tts'),('core__mantis','roster51__mantis_tts'),('core__wolf','roster51__wolf_tts'),('core__raven','roster51__raven_tts'),('roster50__otacon_mgs1','roster51__otacon_tts'),('archive__johnny_mgs1','roster51__johnny_tts')]
canonical=[('core__snake_mgs2','roster51__pliskin_mgs2'),('core__eva_mgs3','npc53__tatyana_mgs3')]
transform=[('core__laughing_octopus','archive__laughing_beauty'),('core__raging_raven','archive__raging_beauty'),('core__crying_wolf','archive__crying_beauty'),('core__screaming_mantis','archive__screaming_beauty'),('core__olga_mgs2','core__olga_ninja')]
# Same individual only. Guest/game epochs remain named; cosmetics do not replace identity or combat data.
groups=[
('solid-snake','Solid Snake','Solid_Snake',['core__snake_mg1','core__snake_mg2','core__solid','archive__snake_tts','core__snake_mgs2','roster51__pliskin_mgs2','core__old_snake']),
('big-boss','Big Boss / Naked Snake','Big_Boss',['core__snake','archive__naked_delta','core__snake_mpo','core__snake_pw','core__snake_gz','archive__ishmael','core__bigboss_mg1','core__bigboss_mg2','completion__big_boss_epilogue']),
('raiden','Raiden','Raiden',['core__raiden_mgs2','core__raiden_mgs4','core__raiden']),
('gray-fox','Gray Fox / Frank Jaeger','Gray_Fox',['core__null_mpo','archive__gray_fox_mg1','core__fox_mg2','core__fox','roster51__grayfox_tts']),
('ocelot','Revolver Ocelot','Revolver_Ocelot',['core__ocelot','roster51__ocelot_delta','completion__ocelot_mpo','core__ocelot_mgsv','core__ocelot_mgs1','roster51__ocelot_tts','core__ocelot_mgs2','core__liquid_ocelot']),
('eva','EVA','EVA',['core__eva_mgs3','roster51__eva_delta','npc53__tatyana_mgs3','completion__eva_mpo','archive__big_mama']),
('meryl','Meryl Silverburgh','Meryl_Silverburgh',['core__meryl_mgs1','roster51__meryl_tts','core__meryl_mgs4']),
('vamp','Vamp','Vamp',['core__vamp','core__vamp_mgs4']),
('volgin','Yevgeny Borisovitch Volgin','Yevgeny_Borisovitch_Volgin',['core__volgin','roster51__volgin_delta','archive__man_on_fire']),
('liquid','Liquid Snake / Eli','Liquid_Snake',['core__liquid','roster51__liquid_tts','archive__eli']),
('mantis','Psycho Mantis / Tretij Rebenok','Psycho_Mantis',['core__mantis','roster51__mantis_tts','archive__tretij']),
('miller','Kazuhira Miller','Kazuhira_Miller',['core__kaz_pw','npc53__kaz_gz','roster50__kaz_mgsv','roster50__miller_mg2']),
('campbell','Roy Campbell','Roy_Campbell',['core__campbell_mpo','roster50__campbell_mg2','roster50__campbell_mgs1','roster50__campbell_mgs4']),
('otacon','Hal Emmerich','Hal_Emmerich',['roster50__otacon_mgs1','roster51__otacon_tts','roster50__otacon_mgs2','roster50__otacon_mgs4']),
('naomi','Naomi Hunter','Naomi_Hunter',['roster50__naomi_mgs1','roster50__naomi_mgs4']),
('mei-ling','Mei Ling','Mei_Ling',['roster50__mei_mgs1','roster50__meiling_mgs4']),
('rosemary','Rosemary','Rosemary',['roster50__rose_mgs2','roster50__rose_mgs4']),
('huey','Huey Emmerich','Huey_Emmerich',['roster50__huey_pw','roster50__huey_mgsv']),
('madnar','Drago Pettrovich Madnar','Drago_Pettrovich_Madnar',['roster50__madnar_mg1','roster50__madnar_mg2']),
('zero','Major Zero','Zero',['roster50__zero_mgs3','roster51__zero_delta','npc53__zero_mpo']),
('paramedic','Para-Medic','Para-Medic',['roster50__paramedic_mgs3','roster51__paramedic_delta','npc53__paramedic_mpo']),
('sigint','SIGINT','Donald_Anderson',['roster50__sigint_mgs3','roster51__sigint_delta','npc53__sigint_mpo']),
('sokolov','Nikolai Sokolov','Nikolai_Stepanovich_Sokolov',['roster50__sokolov_mgs3','roster51__sokolov_delta','npc53__sokolov_mpo']),
('raikov','Ivan Raikov','Ivan_Raidenovitch_Raikov',['core__raikov_mgs3','roster51__raikov_delta','completion__raikov_mpo']),
('granin','Aleksandr Granin','Aleksandr_Leonovitch_Granin',['roster50__granin_mgs3','roster51__granin_delta']),
('sorrow','The Sorrow','The_Sorrow',['roster51__sorrow_mgs3','roster51__sorrow_delta']),
('boss','The Boss','The_Boss',['core__boss','roster51__boss_delta']),
('pain','The Pain','The_Pain',['core__pain','roster51__pain_delta']),
('fear','The Fear','The_Fear',['core__fear','roster51__fear_delta']),
('end','The End','The_End',['core__end','roster51__end_delta']),
('fury','The Fury','The_Fury',['core__fury','roster51__fury_delta']),
('johnny-sr','Johnny Sasaki Sr.','Johnny_Sasaki_(Soviet_guard)',['roster50__johnny_sr_mgs3','roster51__johnny_delta']),
('johnny-jr','Johnny Sasaki / Akiba','Johnny_Sasaki',['archive__johnny_mgs1','roster51__johnny_tts','core__johnny_mgs4']),
('sniper-wolf','Sniper Wolf','Sniper_Wolf',['core__wolf','roster51__wolf_tts']),
('vulcan-raven','Vulcan Raven','Vulcan_Raven',['core__raven','roster51__raven_tts']),
('olga','Olga Gurlukovich','Olga_Gurlukovich',['core__olga_mgs2','core__olga_ninja']),
('paz','Paz Ortega Andrade','Paz_Ortega_Andrade',['archive__paz','npc53__paz_gz']),
('sunny','Sunny Emmerich','Sunny_Emmerich',['roster50__sunny_mgs4','roster50__sunny_mgr']),
('schneider','Kyle Schneider','Kyle_Schneider',['roster50__schneider_mg1','core__ninja_mg2']),
('skull-face','Skull Face','Skull_Face',['npc53__skull_face_gz','archive__skull_face']),
('chico','Chico','Chico',['archive__chico_pw','npc53__chico_gz']),
('laughing-octopus','Laughing Octopus','Laughing_Octopus',['core__laughing_octopus','archive__laughing_beauty']),
('raging-raven','Raging Raven','Raging_Raven',['core__raging_raven','archive__raging_beauty']),
('crying-wolf','Crying Wolf','Crying_Wolf',['core__crying_wolf','archive__crying_beauty']),
('screaming-mantis','Screaming Mantis','Screaming_Mantis',['core__screaming_mantis','archive__screaming_beauty'])]
# Some named transformations change the body; neither ordinary wardrobe nor a new canonical cyborg design.
cyborgs={'core__raiden_mgs4','core__raiden','core__fox','roster51__grayfox_tts'}
remake_pairs={frozenset(p) for p in remakes};canonical_pairs={frozenset(p) for p in canonical};transform_pairs={frozenset(p) for p in transform}
labels={
'core__snake_mg1':'Outer Heaven · 1995','core__snake_mg2':'Zanzibar Land · 1999','core__solid':'Shadow Moses · PS1','archive__snake_tts':'Shadow Moses · GameCube','core__snake_mgs2':'Philanthropy · MGS2','roster51__pliskin_mgs2':'Pliskin · MGS2','core__old_snake':'Old Snake · MGS4',
'core__snake':'Snake Eater · PS2','archive__naked_delta':'Snake Eater · Δ','core__snake_mpo':'San Hieronymo · Portable Ops','core__snake_pw':'MSF · Peace Walker','core__snake_gz':'MSF · Ground Zeroes','archive__ishmael':'Ishmael · hôpital de Chypre','core__bigboss_mg1':'Commandant FOXHOUND · MG1','core__bigboss_mg2':'Zanzibar Land · MG2','completion__big_boss_epilogue':'Épilogue · MGS4',
'core__raiden_mgs2':'Raiden humain · MGS2','core__raiden_mgs4':'Raiden cyborg · MGS4','core__raiden':'Raiden cyborg · Revengeance',
'core__null_mpo':'Null · Portable Ops','archive__gray_fox_mg1':'Gray Fox humain · MG1','core__fox_mg2':'Gray Fox humain · MG2','core__fox':'Ninja cyborg · PS1','roster51__grayfox_tts':'Ninja cyborg · GameCube',
'npc53__tatyana_mgs3':'Tatyana · uniforme soviétique','core__eva_mgs3':'EVA · tenue de motarde PS2','roster51__eva_delta':'EVA · tenue de motarde Δ','archive__big_mama':'Big Mama · MGS4',
'core__laughing_octopus':'Octopus · système tentaculaire','archive__laughing_beauty':'Laughing Beauty · combinaison','core__raging_raven':'Raven · armure volante','archive__raging_beauty':'Raging Beauty · combinaison','core__crying_wolf':'Wolf · armure quadrupède','archive__crying_beauty':'Crying Beauty · combinaison','core__screaming_mantis':'Mantis · exosquelette','archive__screaming_beauty':'Screaming Beauty · combinaison',
'core__olga_mgs2':'Olga · Tanker','core__olga_ninja':'Mr. X · exosquelette','archive__man_on_fire':'Man on Fire · MGSV','npc53__skull_face_gz':'Skull Face · Ground Zeroes','archive__skull_face':'Skull Face · The Phantom Pain',
'archive__paz':'Paz · tenue Peace Walker','npc53__paz_gz':'Paz · prisonnière Ground Zeroes','roster50__sunny_mgs4':'Sunny · Nomad MGS4','roster50__sunny_mgr':'Sunny · Solis Revengeance','archive__eli':'Eli · The Phantom Pain','archive__tretij':'Tretij Rebenok · MGSV'}
def label(uid):
 if uid in labels:return labels[uid]
 e=by[uid];name=e['name'].split('—')[0].strip();game=e['game']
 if 'delta' in uid:return name+' · Δ'
 if 'tts' in uid:return name+' · GameCube'
 if '_mpo' in uid:return name+' · Portable Ops'
 if '_mgs1' in uid:return name+' · MGS1'
 if '_mgs2' in uid:return name+' · MGS2'
 if '_mgs3' in uid:return name+' · PS2'
 if '_mgs4' in uid:return name+' · MGS4'
 if '_mgsv' in uid:return name+' · The Phantom Pain'
 if '_mg1' in uid:return name+' · MG1'
 if '_mg2' in uid:return name+' · MG2'
 if '_pw' in uid:return name+' · Peace Walker'
 if '_gz' in uid:return name+' · Ground Zeroes'
 if 'core__ocelot'==uid:return name+' · PS2'
 return e['name']
options=[];group_records=[];membership={}
for ident,name,wiki,uids in groups:
 assert all(u in by for u in uids),(ident,set(uids)-set(by))
 identity_source={'url':'https://metalgear.fandom.com/wiki/'+wiki,'scope':'Secondary identity context; exact appearance extent is established by the original atlas source review, preserved below.'}
 group_records.append({'identityID':ident,'name':name,'uids':uids,'identitySources':[identity_source]})
 for target in uids:
  assert target not in membership,(target,membership.get(target),ident)
  membership[target]=ident
  for source in uids:
   if source==target:continue
   pair=frozenset((target,source))
   if pair in canonical_pairs:kind='canonical-game-costume'
   elif pair in remake_pairs:kind='official-remake-appearance'
   elif pair in transform_pairs or (target in cyborgs)!=(source in cyborgs) or ident=='volgin' and 'archive__man_on_fire' in pair:kind='body-transformation'
   else:kind='historical-incarnation'
   e=by[source];sources=[identity_source]+e['review'].get('sources',[])
   assert e['review'].get('status')=='approved' and sources
   options.append({'uid':target,'sourceSpriteUID':source,'id':'appearance-'+source.replace('__','-').replace('_','-'),'family':'canonical','label':label(source),'provenance':{'kind':kind,'category':kind,'sourceUID':target,'sourceSpriteUID':source,'identityID':ident,'originalDesign':False,'canonicalAppearanceAttested':True,'canonicalAttestationScope':'Only the originally reviewed visible appearance facts; existing reconstruction limits remain attached.','incarnation':e['incarnation'],'costumeName':label(source),'appearanceName':label(source),'sources':sources,'qualification':'Reviewed existing same-individual appearance reused as an explicitly named cosmetic. Historical ages, surgery, injuries and body changes are not transplanted clothing. Original UID, lore, moves, weapons, hitboxes and gameplay statistics stay unchanged. This does not claim that the originating game offered this appearance as an alternate costume.','originalAtlasLimits':e['review'].get('limits',[])},'assetReview':{'status':'verified','independentArt':True,'reviewer':'pass19-same-individual-canonical-atlas-crossmap','reviewedAt':'2026-10-08','existingAcceptedSourceReview':e['review'].get('reviewer'),'reusedExistingAcceptedAtlas':True,'newArtGenerated':False,'sourceSpriteUID':source}})
exclusions=[
{'uids':['core__venom','core__snake','core__snake_gz','archive__ishmael','npc53__msf_medic_gz'],'reason':'Venom is the distinct MSF medic, not Big Boss. Shared face, cover identity or role does not permit atlas identity substitution.'},
{'uids':['core__snake_acid','core__snake_acid2','core__solid'],'reason':'Separate AC!D continuity and AC!D2 clone identity: never merged into primary Solid Snake.'},
{'uids':['core__clown','core__teliko'],'reason':'Clown wears Teliko disguise but is a distinct character; no automatic same-individual atlas transfer.'},
{'uids':['roster51__miller_mgs1','core__liquid','roster50__miller_mg2'],'reason':'MGS1 Master Miller codec is Liquid impersonation; intended Miller concept design is not evidence of Kaz physically wearing this exact body.'},
{'uids':['roster50__anderson_mgs1','archive__decoy','roster51__decoy_tts','roster50__sigint_mgs3'],'reason':'Donald Anderson identity, Decoy disguise and original Decoy appearance remain separate; no automatic transfer of hostage/impostor body.'},
{'uids':['completion__gary_murray','completion__flemming_acid','npc53__hans_davis_acid'],'reason':'Cover identities/disguises and unverified complete bodies cannot establish equivalent physical costumes by names alone.'},
{'uids':['npc53__paz_phantom_tpp','archive__paz','npc53__paz_gz'],'reason':'Medical-platform Paz is a Venom hallucination, not a later living-body incarnation. Her separate UID is retained without physical-identity crossmapping.'},
{'uids':['core__skull_mist','core__skull_armor','core__skull_sniper','completion44__parasite_camo_44'],'reason':'Unnamed parasite-unit representatives are not established as one individual wearing several costumes.'},
{'uids':['core__bigboss_sr','core__bigboss_mg1','core__bigboss_mg2','archive__snake_nes','core__snake_sr','core__snake_gb'],'reason':'NES/Snake\u2019s Revenge/Ghost Babel alternative continuities are retained separately, not merged into main-continuity physical incarnations.'},
{'uids':['roster50__johnny_sr_mgs3','archive__johnny_mgs1','core__johnny_mgs4'],'reason':'Soviet Johnny Sr. and his grandson Johnny Sasaki are different people.'},
{'uids':['roster50__otacon_mobile','npc53__vr_otacon_mobile','roster50__colonel_ai_mgs2','roster50__campbell_mgs1'],'reason':'Human physical identity and VR/AI facsimile are separate; similar portrait does not prove interchangeable canonical bodies.'},
{'uids':['npc53__adam_mgs3','core__ocelot','roster51__ghost_mpo','npc53__sokolov_mpo','npc53__jeff_jones_acid','core__leone'],'reason':'Known aliases already share reviewed identical appearance. Do not manufacture duplicate wardrobe entries from unchanged atlas bytes.'}]
# Known missing official families. These requests never create selectable placeholder/recolored art.
refs={
'mgs1':'https://metalgear.fandom.com/wiki/Tuxedo',
'meryl':'https://metalgear.fandom.com/wiki/Meryl_Silverburgh',
'mgs2':'https://metalgear.fandom.com/wiki/Metal_Gear_Solid_2:_Substance',
'mgs3':'https://metalgear.fandom.com/wiki/Camouflage_(Metal_Gear_Solid_3)',
'pw':'https://metalgear.fandom.com/wiki/Camouflage_(Peace_Walker)',
'mgs4':'https://metalgear.konami.net/manual/mc2/mgs4/xbox/en/page09.html',
'mgs4secondary':'https://metalgear.fandom.com/wiki/Camouflage_(Metal_Gear_Solid_4_and_Metal_Gear_Online)',
'mgr':'https://store.steampowered.com/app/235460/METAL_GEAR_RISING_REVENGEANCE/',
'mgrsecondary':'https://metalgear.fandom.com/wiki/Metal_Gear_Rising:_Revengeance_secrets',
'mgsv':'https://metalgear.fandom.com/wiki/Camouflage_(The_Phantom_Pain)',
'mgsvdlc':'https://store.steampowered.com/app/406580/METAL_GEAR_SOLID_V_THE_PHANTOM_PAIN__Tuxedo/',
'quiet':'https://metalgear.fandom.com/wiki/Quiet',
'delta':'https://www.konami.com/games/us/en/topics/2786/'}
backlog=[]
def pending(uids,names,ref,scope,qualification='Attested outfit existence; exact fullbody reference and fresh independent left/right native atlases still required before registration.'):
 for uid in uids:
  assert uid in by
  for name in names:
   backlog.append({'uid':uid,'id':'official-'+re.sub('[^a-z0-9]+','-',name.lower()).strip('-'),'family':'canonical','name':name,'status':'reference-and-native-art-pending','selectable':False,'sources':[{'url':refs[ref],'scope':scope}],'qualification':qualification})
pending(['core__solid','archive__snake_tts'],['Tuxedo'],'mgs1','Secondary costume history; MGS1 and Twin Snakes version shapes must be reviewed independently.')
pending(['core__meryl_mgs1','roster51__meryl_tts'],['Sneaking suit (Integral / Twin Snakes)'],'meryl','Secondary Meryl costume history; original Integral bandana and Twin Snakes no-bandana incarnations differ.')
pending(['core__fox'],['Red exoskeleton (Integral)'],'mgs1','Secondary unlockable context; additional direct visual source required, not an attested detail from the Tuxedo page.','Reference discovery required: do not mark as fully verified from this source.')
pending(['core__snake_mgs2'],['Tuxedo (Substance)','MGS1 Snake style (Substance)'],'mgs2','Secondary Substance playable body roster. MGS1 costume option must keep MGS2 model-specific details.')
pending(['core__raiden_mgs2'],['Ninja Raiden (Substance)','B.D.U. disguise'],'mgs2','Secondary Substance roster and MGS2 actual enemy-disguise context; not a Raikov officer costume.')
pending(['core__snake'],['Olive Drab','Leaf','Tree Bark','Choco Chip','Square','Black','Snow','Splitter','Rain Drop','Water','Tiger Stripe Naked','Animal','Spirit','Moss','Spider','Hornet Stripe','Fire','Snake','Cold War','Sneaking Suit','Scientist disguise','Officer / Raikov-mask disguise','Tuxedo'],'mgs3','Secondary original MGS3 camouflage table; version and pre/post-eye-injury source review required.','Existence catalog is not exhaustive across regional downloads, Subsistence and later editions. Face paints, flags and downloaded patterns remain a separately enumerated research task.')
pending(['archive__naked_delta'],['Battle Dress (PW ver.)','Sneaking suit (PW ver.)','Crocodile suit','Naked (Woodland)','Naked (Ammunition Belt)','Gold','White Tuxedo'],'delta','KONAMI product announcement explicitly enumerates the six DLC uniforms and White Tuxedo preorder uniform.')
pending(['core__snake_pw'],['Jungle Fatigues','Naked Fatigues','Sneaking Suit','Battle Dress (with helmet)','Tuxedo','T-shirt','Swimsuit','Kazuhira uniform','Amanda uniform','Neo Moss','Tigrex','Rathalos','Gear REX'],'pw','Secondary PW uniform categories and unlockables; PSP/HD regional/Monster Hunter exclusives qualified separately.','Known families only; all camouflage patterns, bonus/DLC and regional body variants require version-specific enumeration and native art. Do not substitute Kaz/Amanda whole-character sprites for Snake wearing those uniforms.')
pending(['core__old_snake'],['Suit','Middle East Rebel Disguise','South America Rebel Disguise','Civilian disguise','OctoCamo pattern collection','FaceCamo mask collection','Command vest colors'],'mgs4secondary','Secondary MGS4 clothing listing, with official manual verifying clothing/OctoCamo/FaceCamo/vest settings.','Disguises and masks must be authored on Old Snake\u2019s own body; anonymous rebel and young Snake character art cannot stand in for these costumes.')
pending(['core__raiden'],['White Armor','Inferno Armor','Commando Armor','Cyborg Ninja','MGS4 Body (Revengeance DLC)'],'mgr','KONAMI-published Steam product description lists these body upgrades.','Published upgrade existence verified. Existing MGS4 Raiden is a historical incarnation, not certified as the exact Revengeance DLC model, weapon or sheath.')
pending(['core__raiden'],['Standard Body (prologue)','Custom Body Blue','Business suit'],'mgrsecondary','Secondary unlockable outfit reference; Raiden suit also described in Suit article.')
pending(['core__venom'],['Tuxedo','Fatigues (Naked Snake)','Sneaking Suit (Naked Snake)'],'mgsvdlc','KONAMI-published MGSV Costume & Tack Pack product listing.','Costume clothing belongs on Venom\u2019s shrapnel, eyepatch and bionic-arm anatomy; never substitute Big Boss\u2019s body to simulate the uniform.')
pending(['core__venom'],['Sneaking Suit','Battle Dress','Parasite Suit','Leather jacket','Scarf fatigues','Naked fatigues','Gold fatigues','Silver fatigues','Hospital patient','Avatar','Solid Snake (PS1 model)','Cyborg Ninja','Raiden suit'],'mgsv','Secondary released MGSV equipment/camouflage listing.','Known families only; exact grade/pattern/headgear combinations not exhaustively enumerated, and body-replacement special uniforms must keep their specific game qualification.')
pending(['core__quiet'],['Naked (Blood)','Naked (Silver Q)','Naked (Gold Q)','Gray XOF','Sniper Wolf'],'quiet','Secondary Quiet buddy outfit listing.','Quiet wearing Sniper Wolf-inspired clothing remains Quiet; original Sniper Wolf character atlas is not a faithful substitute.')
requestmap={u:[x for x in backlog if x['uid']==u] for u in by}
optionmap={u:[x for x in options if x['uid']==u] for u in by}
rows=[]
actual={f['uid']:f for f in roster};actual['oc__parallaxe']={'uid':'oc__parallaxe','name':'PARALLAXE','ep':'Original CQC'}
assert len(actual)==355
for uid,f in actual.items():
 e=by.get(uid);sourceText=(e or {}).get('incarnation','');unattested=any(s in sourceText.lower() for s in ['unattested','not canonically attested','noauthentic','no authentic','original oc design','original cqc','cqc network manifestation','generic roster uid','no uniquely attested'])
 status='machine-renderer-body' if not e else 'original-or-unattested-project-presentation' if unattested else 'reviewed-base-only-additional-official-reference-discovery-open'
 if optionmap.get(uid):status='reviewed-same-individual-native-options-ready'
 rows.append({'uid':uid,'name':f.get('name'),'episode':f.get('ep'),'bodyKind':'native-sprite' if e else 'native-machine-renderer','identityGroup':membership.get(uid),'canonicalAppearanceCensusStatus':status,'existingBaseReviewed':bool(e and e.get('review',{}).get('status')=='approved'),'readyMappedOptions':[{'id':o['id'],'label':o['label'],'sourceSpriteUID':o['sourceSpriteUID'],'kind':o['provenance']['kind']} for o in optionmap.get(uid,[])],'knownOfficialArtPending':[{'id':o['id'],'name':o['name'],'status':o['status']} for o in requestmap.get(uid,[])],'exhaustiveOfficialWardrobeCertified':False})
counts={k:sum(o['provenance']['kind']==k for o in options) for k in ['canonical-game-costume','official-remake-appearance','historical-incarnation','body-transformation']}
plan={'schema':'cqc.pass19.canonical-appearance-crossmap/1','baselineSourceCommit':'5642ae495aa68eaf940e10724de8f3986f808cd0','baselineIdentityCount':355,'baselineNativeSpriteCount':338,'sameIndividualGroups':group_records,'options':options,'explicitNonMerges':exclusions,'counts':{'groups':len(groups),'targetUIDs':len({o['uid'] for o in options}),'readyNativeOptions':len(options),**counts},'absolute1to1Certified':False,'newArtGenerated':0,'qualification':'Mappings reuse physically distinct previously accepted native atlas bodies of the same individual. Historical/remake/transformation mappings are not counted as original-game alternate wardrobe. All existing source review limits remain in each option.'}
back={'schema':'cqc.pass19.known-official-wardrobe-backlog/1','requests':backlog,'requestCount':len(backlog),'targetUIDCount':len({o['uid'] for o in backlog}),'exhaustiveAcrossAllEditions':False,'selectablePendingRequests':0,'qualification':'Source-backed research backlog only. No placeholder costume is exposed. Known outfit existence does not certify generated pixels. Additional regional/download uniforms, face paints and recruit class customization need further enumeration.'}
census={'schema':'cqc.pass19.complete-baseline-appearance-census/1','rosterCount':355,'nativeSpriteCount':338,'nativeMachineUIDCount':17,'rows':rows,'counts':plan['counts'],'knownPendingOfficialArtRequests':len(backlog),'exhaustiveOfficialWardrobeCertified':False,'censusCompleteForBaselineUIDs':True,'qualification':'Every baseline UID has an explicit status. Complete roster accounting is distinct from exhaustive worldwide official outfit discovery or new-art completion.'}
for name,data in [('CANONICAL_APPEARANCE_CROSSMAP_V1.json',plan),('KNOWN_OFFICIAL_WARDROBE_BACKLOG_V1.json',back),('COMPLETE_BASELINE_APPEARANCE_CENSUS_V1.json',census)]:
 (ROOT/name).write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'counts':plan['counts'],'backlogRequests':len(backlog),'censusRows':len(rows)},ensure_ascii=False))
