from pathlib import Path
import hashlib
import json
import re

ROOT = Path(__file__).resolve().parent
BASELINE = Path('/tmp/cqc-pass18-application/public/cqc/modules/unified-versus-v055.html')
SOURCE_RELEASE = '5642ae495aa68eaf940e10724de8f3986f808cd0'
source = BASELINE.read_bytes()
text = source.decode('utf-8')
fighters, _ = json.JSONDecoder().raw_decode(text[text.index('const FIGHTERS=') + len('const FIGHTERS='):])
uids = {f['uid'] for f in fighters}
assert len(fighters) == len(uids) == 354

references = {
 'konami-creatures': {'url':'https://eu-support.konami.com/hc/en-gb/articles/9649446866327-Creatures','kind':'publisher-primary','access':'direct-page-and-original-publisher-images','scope':'Wanderer, Bomber and Tracker identities, visual design and behaviour.'},
 'survive-enemies': {'url':'https://metalgearsurvive-archive.fandom.com/wiki/Enemies','kind':'community-gameplay-reference','access':'search-index-extract; full page blocked','scope':'Enemy names and concise gameplay distinctions; not an independently viewed original model.'},
 'survive-nameplates': {'url':'https://metalgear.fandom.com/wiki/Nameplate','kind':'community-transcription-of-game-data','access':'search-index-extract; full page blocked','scope':'The in-game Survive collectible names attest creature nomenclature.'},
 'survive-bosses': {'url':'https://metalgear.fandom.com/wiki/Category:Bosses_in_Metal_Gear_Survive','kind':'community-gameplay-reference','access':'search-index-extract; full page blocked','scope':'Big Mouth, Frostbite and Lord of Dust are separate bosses.'},
 'survive-mortar-capture': {'url':'https://gameranx.com/features/id/140946/article/metal-gear-survive-walkthrough-chapter-18-find-sahelanthropus/','kind':'community-original-game-capture','access':'search-index-extract; image not yet physically reviewed','scope':'Released-game Mortar artillery encounter.'},
 'gekko-chart-transcription': {'url':'https://mgcvt.com/word/w2','kind':'community-transcription-of-publisher-chart','access':'direct-page','scope':'4.2 m height, optional weapon mounts, MGS4/MGR appearances; dimensional source is official MGSV promotional comparative diagram.'},
 'gekko-variant': {'url':'https://metalgear.fandom.com/wiki/Gekko','kind':'community-gameplay-reference','access':'search-index-extract; full page blocked','scope':'Suicide configuration and Dwarf carrier; carrier appears in cutscenes rather than normal combat encounters.'},
 'dwarf-disguise': {'url':'https://metalgear.fandom.com/wiki/Trenchcoat','kind':'community-gameplay-reference','access':'search-index-extract; full page blocked','scope':'MGS4 Eastern Europe disguise contains three Dwarf Gekko under trenchcoat and fedora.'},
 'dwarf-tripod': {'url':'https://metalgear.fandom.com/wiki/Humanoid_Dwarf_Gekko','kind':'community-gameplay-reference','access':'search-index-extract; full page blocked','scope':'MGR Humanoid Dwarf Gekko / Double Tripod consists of two connected units, distinct from the three-unit MGS4 coat disguise.'},
 'pw-boxes': {'url':'https://mgcvt.com/guide/mgspw/equipment.htm','kind':'community-transcription-of-game-data','access':'direct-page','scope':'All nine separate box loadouts; development ranks are progression, not separate identities.'},
 'pw-box-crosscheck': {'url':'https://wikiwiki.jp/walker/%E8%A3%85%E5%82%99%E5%93%81','kind':'community-gameplay-reference','access':'direct-page','scope':'LOVE BOX, BOX-TANK, BOX-T(STN), BOX-T(SMK), BOX BOMB, BOX STUN, BOX SMOKE, ASSN.BOX and RESCUE BOX.'},
 'pw-manual': {'url':'https://metalgear.konami.net/manual/mc2/mgspw/xbox/en/page08.html','kind':'publisher-primary','access':'direct-page','scope':'Player equips and drops the box; player-sized obstacle and hiding equipment, not autonomous robot.'},
 'mgr-fenrir': {'url':'https://metalgear.fandom.com/wiki/Fenrir','kind':'community-gameplay-reference','access':'search-index-extract; full page blocked','scope':'LQ-84 Fenrir is a mass-produced quadrupedal UG, distinct from LQ-84i Blade Wolf.'},
 'mgr-raptor': {'url':'https://metalgear.fandom.com/wiki/Raptor','kind':'community-gameplay-reference','access':'search-index-extract; full page blocked','scope':'Medium bipedal UG with claws and blades.'},
 'mgr-machines': {'url':'https://metalgear.fandom.com/wiki/Unmanned_Gear','kind':'community-gameplay-reference','access':'reference target; full-page verification still required','scope':'Further Rising UG roster candidates require physical game reference review before asset acceptance.'},
}

def candidate(key, name, game, kind, kit, silhouette, refs, height=None, height_status='estimated', group=None, **extra):
 return {'uid':'pass19__'+key, 'name':name, 'episode':game, 'group':group or ('survive' if game=='SURVIVE' else 'peace-walker' if game=='PEACE WALKER' else 'revengeance' if game=='MGR' else 'guns-of-the-patriots'),
  'appearanceKind':kind,'kit':kit,'silhouette':silhouette,'referenceIds':refs,
  'canonicalInSourceGame':True,'canonContinuity':'source-game appearance; Survive and Revengeance are their own continuities',
  'playableAdaptation':True,'originalDesign':False,'absolute1to1Certified':False,
  'assetStatus':'awaiting-original-reference-and-native-art-review','registrationStatus':'inactive-until-native-renderer-ready',
  'worldHeightMeters':height,'heightEvidence':height_status,'heightQualification':'Display estimate only; not an official height certificate.' if height_status=='estimated' else 'Community transcription of official MGSV comparative chart; original numeric diagram not independently read here.', **extra}

creature_refs=['survive-enemies','survive-nameplates']
rows=[
 candidate('wanderer_survive','WANDERER','SURVIVE','creature','wanderer','Human remnant with red-black crystalline head growth, damaged exposed torso and torn civilian trousers.',['konami-creatures'],1.80, referenceImage='references/wanderer-konami-official.png'),
 candidate('tracker_survive','TRACKER','SURVIVE','creature','tracker','Leaping human-derived creature; elongated red crystal head and visibly mutated dark legs.',['konami-creatures'],1.85, referenceImage='references/tracker-konami-official.png'),
 candidate('mortar_survive','MORTAR','SURVIVE','creature','mortar','Armoured crystalline humanoid; biological artillery on anatomical left arm, not a carried military mortar.',creature_refs+['survive-mortar-capture'],2.20, anatomy={'armCannon':'left'}),
 candidate('crawler_survive','CRAWLER','SURVIVE','creature','crawler','Small crawling multi-limbed organic creature; full anatomy must be checked against a released-game capture before drawing.',creature_refs,0.65),
 candidate('watcher_survive','WATCHER','SURVIVE','creature','watcher','Small flying reconnaissance creature; alerts and ranged attacks. Body geometry pending original capture.',creature_refs,0.75),
 candidate('grabber_survive','GRABBER','SURVIVE','creature','grabber','Ambush organism emerging from ground with vegetation-like tendrils; not a normal clothed humanoid.',creature_refs,1.10),
 candidate('detonator_survive','DETONATOR','SURVIVE','creature','detonator','Co-op explosive creature associated with side objectives; body/loot carrier must be checked against released-game capture.',['survive-enemies'],2.10),
 candidate('big_mouth_survive','BIG MOUTH','SURVIVE','creature','giant','Large distinct boss creature; a reviewed original whole-body capture is required.',['survive-bosses','survive-enemies'],None,sizeClass='giant',canonicalDimensionsKnown=False),
 candidate('frostbite_survive','FROSTBITE','SURVIVE','creature','giant','Large distinct boss creature; do not invent a humanoid redesign or assume Big Mouth anatomy.',['survive-bosses'],None,sizeClass='giant',canonicalDimensionsKnown=False),
 candidate('lord_of_dust_survive','LORD OF DUST','SURVIVE','creature','giant','Gigantic many-limbed story boss; should retain large world scale with camera fit, not become a human-sized fighter.',['survive-bosses','survive-enemies'],None,sizeClass='world-boss',canonicalDimensionsKnown=False),
 candidate('gekko_suicide_mgs4','GEKKO — UNITÉ SUICIDE','MGS4','machine','gekko','Dark Gekko chassis with organic legs and demolition modules; no human pilot.',['gekko-chart-transcription','gekko-variant'],4.20,'community-transcription-of-official-chart',machineClass='gekko',weaponVariant='demolition'),
 candidate('gekko_missile_mgs4','GEKKO — LANCE-MISSILES','MGS4','machine','gekko','Standard Gekko chassis with side-mounted anti-tank missile launcher. Specific BGM-71/TOW model identification is community inference.',['gekko-chart-transcription'],4.20,'community-transcription-of-official-chart',machineClass='gekko',weaponVariant='missile'),
 candidate('gekko_grenade_mgs4','GEKKO — LANCE-GRENADES','MGS4','machine','gekko','Standard Gekko chassis with grenade-launcher mount; exact mount needs physical released-game reference.',['gekko-chart-transcription'],4.20,'community-transcription-of-official-chart',machineClass='gekko',weaponVariant='grenade'),
 candidate('gekko_carrier_mgs4','GEKKO — PORTEUR DE TRIPODS','MGS4','machine','gekko','Gekko with Dwarf Gekko attached beside its head; cutscene configuration, not separately attested combat loadout.',['gekko-variant','gekko-chart-transcription'],4.20,'community-transcription-of-official-chart',machineClass='gekko',weaponVariant='dwarf-carrier',appearanceScope='cutscene configuration'),
 candidate('gekko_mgr','GEKKO — DESPERADO','MGR','machine','gekko','Revengeance Gekko green camouflage; keep mechanical upper hull and organic legs.',['gekko-chart-transcription','gekko-variant'],4.20,'community-transcription-of-official-chart',machineClass='gekko',weaponVariant='machine-gun'),
 candidate('dwarf_gekko_trenchcoat_mgs4','TRIPODS — INFILTRATION','MGS4','machine','dwarf','Three Dwarf Gekko stacked under a trenchcoat and fedora, following Old Snake in Eastern Europe. Requested parka is resolved to this attested disguise.',['dwarf-disguise'],1.78,machineClass='dwarf-stack',assembly={'unitCount':3,'garment':'trenchcoat','headwear':'fedora'},requestedAlias='gekko en parka'),
 candidate('dwarf_gekko_humanoid_mgr','DOUBLE TRIPOD','MGR','machine','dwarf','Two connected Dwarf Gekko in humanoid arrangement; no trenchcoat/fedora.',['dwarf-tripod'],1.55,machineClass='dwarf-stack',assembly={'unitCount':2,'garment':None}),
]

box_specs=[
 ('love_box_pw','LOVE BOX','love','Rectangular LOVE PACK box; operator boots visible below, shoulders/head hidden.','Concealment and body bump'),
 ('box_tank_pw','BOX-TANK','cannon','Cardboard tank hull and turret, human operators underneath; no real metal treads.','Artillery'),
 ('box_tank_stun_pw','BOX-TANK — STUN','stun-cannon','Cardboard tank with stun ammunition; operator-based assembly.','Nonlethal artillery'),
 ('box_tank_smoke_pw','BOX-TANK — SMOKE','smoke-shell','Cardboard tank with smoke shells; separate from autonomous BOX SMOKE trap.','Smoke artillery'),
 ('bomb_box_pw','BOX BOMB','bomb','LOVE BOX family with explosive trap variant; no generic extra robot face.','Explosive trap'),
 ('stun_box_pw','BOX STUN','stun','LOVE BOX family with nonlethal stun trap; separate from Box Tank Stun.','Nonlethal trap'),
 ('smoke_box_pw','BOX SMOKE','smoke','LOVE BOX family with smoke trap; separate from Box Tank Smoke.','Smoke trap'),
 ('assassin_box_pw','ASSN. BOX','assassin','Box-shaped hay/straw bale used as hiding equipment; operator hidden inside.','Close capture'),
 ('rescue_box_pw','RESCUE BOX','rescue','Rescue-design cardboard box; canonical markings require original game capture.','Rescue and recovery'),
]
for key,name,variant,silhouette,role in box_specs:
 rows.append(candidate(key,name,'PEACE WALKER','boxed-human','box',silhouette,['pw-boxes','pw-box-crosscheck','pw-manual'],1.02 if 'tank' in key else .98,boxVariant=variant,role=role,operator={'kind':'human','identity':'generic MSF field operator','count':2 if 'tank' in key else 1,'visibleParts':['boots'],'headHidden':True},gameplayQualification='Original equipment appearance; becoming an independent versus fighter with operator underneath is a requested CQC adaptation.'))

optional_specs=[
 ('fenrir_mgr','LQ-84 FENRIR','quadruped','fenrir','Mass-produced LQ-84 quadruped; distinct model/loadout from LQ-84i Blade Wolf.',['mgr-fenrir'],1.25),
 ('raptor_mgr','RAPTOR','machine','raptor','Bipedal UG with organic Gekko-like legs, claws and blades.',['mgr-raptor'],3.2),
 ('mastiff_mgr','MASTIFF','machine','mastiff','Large gorilla-like UG; original mechanical anatomy must be reviewed.',['mgr-machines'],2.8),
 ('vodomjerka_mgr','VODOMJERKA','machine','vodomjerka','Multi-legged ground UG; exact original limb count/reference still required.',['mgr-machines'],1.5),
 ('slider_mgr','SLIDER','machine','slider','Flying winged UG; must not be confused with Slider-mounted human cyborg.',['mgr-machines'],1.5),
 ('hammerhead_mgr','HAMMERHEAD','machine','hammerhead','Unmanned helicopter-type aircraft; rotor and full aircraft proportions required.',['mgr-machines'],3.5),
]
for key,name,kind,kit,silhouette,refs,height in optional_specs:
 rows.append(candidate(key,name,'MGR',kind,kit,silhouette,refs,height,priority='extension',evidenceStatus='requires-additional-primary-review'))

assert len(rows)==32
assert len({r['uid'] for r in rows})==32
assert not uids.intersection(r['uid'] for r in rows)

existing=[
 {'uid':'completion44__armored_wanderer_44','identity':'Armoured Wanderer','action':'preserve existing identity and native sprite; no duplicate'},
 {'uid':'completion44__wanderer_bomber_44','identity':'Bomber','action':'preserve existing identity and native sprite; no duplicate','referenceImage':'references/bomber-konami-official.png'},
 {'uid':'completion__gekko_mgs4','identity':'Standard MGS4 Gekko','action':'preserve existing playable machine binding; add distinct configurations only'},
 {'uid':'completion__dwarf_gekko_mgs4','identity':'Single Dwarf Gekko','action':'preserve existing three-arm single-unit machine; stacks are different assemblies'},
 {'uid':'core__blade_wolf','identity':'LQ-84i Blade Wolf','action':'preserve existing intelligent named unit; LQ-84 Fenrir is a different mass-produced model'},
]
for row in existing: assert row['uid'] in uids

registry={'schema':'cqc.pass19.reference-roster/1','sourceRelease':SOURCE_RELEASE,'baselineFile':str(BASELINE),'baselineFileSHA256':hashlib.sha256(source).hexdigest(),'baselineVsFighterCount':354,'newCandidateCount':len(rows),'priorityCandidateCount':26,'optionalFurtherUGCount':6,'existingIdentitiesPreserved':existing,'references':references,'candidates':rows,'qualification':['All baseline names, UIDs, source files and combat data stay unchanged.','Candidate definitions are not claims that native art is complete. Runtime installation requires an actual accepted renderer asset.','CanonicalInSourceGame attests the appearance belongs to that game; it does not assert Survive/Revengeance belong to the core Saga continuity.','Game-specific physical art review remains necessary wherever only search-index extracts or community summaries are available.','Parka is resolved to the attested MGS4 trenchcoat disguise; no fictional parka version is labelled canonical.','Nine PW box loadouts are distinct; development ranks1–5 do not become invented separate silhouettes.','Box fighters are humans underneath equipment, not autonomous machines.','No absolute1:1 certificate and no invented official dimensional values.']}
(ROOT/'REFERENCE_ROSTER_REGISTRY_V1.json').write_text(json.dumps(registry,ensure_ascii=False,indent=2)+'\n')

module=r'''/* PASS19 source-game additions. No baseline edits, runtime registration or fallback art on load. */
(function(root){
 'use strict';
 const registry=__REGISTRY__;
 const clone=value=>JSON.parse(JSON.stringify(value));
 const templates={wanderer:'completion44__armored_wanderer_44',tracker:'completion44__armored_wanderer_44',mortar:'completion44__armored_wanderer_44',crawler:'completion44__armored_wanderer_44',watcher:'completion44__armored_wanderer_44',grabber:'completion44__armored_wanderer_44',detonator:'completion44__wanderer_bomber_44',giant:'completion44__armored_wanderer_44',gekko:'completion__gekko_mgs4',dwarf:'completion__dwarf_gekko_mgs4',box:'core__snake_pw',fenrir:'core__blade_wolf',raptor:'completion__gekko_mgs4',mastiff:'completion__gekko_mgs4',vodomjerka:'completion__gekko_mgs4',slider:'completion__gekko_mgs4',hammerhead:'completion__gekko_mgs4'};
 const boxLabels={love:'Avance sous couverture',cannon:'Obus carton','stun-cannon':'Obus assommant','smoke-shell':'Obus fumigène',bomb:'Piège explosif',stun:'Piège assommant',smoke:'Écran de fumée',assassin:'Capture dans la paille',rescue:'Secours sous couverture'};
 function create(candidate, baseline){
  const template=baseline.find(f=>f.uid===templates[candidate.kit]);
  if(!template)throw new Error('PASS19 missing unchanged baseline template: '+candidate.kit);
  const fighter=clone(template), uid=candidate.uid;
  Object.assign(fighter,{uid,id:uid.slice(8),name:candidate.name,source:'DOSSIERS DE TERRAIN',ep:candidate.episode,role:candidate.role||candidate.name,bonus:true,canonical:candidate.canonicalInSourceGame,playableAdaptation:true,pass19:true,pass19Reference:clone(candidate)});
  fighter.visual={...fighter.visual,kind:candidate.appearanceKind==='boxed-human'?'human':candidate.appearanceKind,variant:uid,signatureLabel:candidate.name};
  if(candidate.appearanceKind==='boxed-human')fighter.visual.boxedOperator=clone(candidate.operator);
  if(candidate.worldHeightMeters!==null)fighter.visual.worldHeightMeters=candidate.worldHeightMeters;
  fighter.visual.heightEvidence=candidate.heightEvidence;
  const combat=fighter.combat;
  Object.assign(combat,{uid,fighterName:candidate.name,incarnation:candidate.episode,evidence:'adaptation',basis:candidate.silhouette,scope:'Apparence du jeu source; combat CQC adapté et calibré.',limitations:['Profil de versus adapté; valeurs et animations non extraites du jeu source.','Références de silhouette et qualité native validées séparément.'],sources:candidate.referenceIds.map(id=>registry.references[id].url)});
  combat.passive={...combat.passive};
  for(const [slot,move] of Object.entries(combat.moves)){move.id=uid+'::'+slot;move.slot=slot;move.lore='adaptation';}
  if(candidate.appearanceKind==='boxed-human'){
   combat.key='boxed_operator';combat.passive.machine=false;
   combat.role='Opérateur humain sous équipement de terrain';
   for(const slot of ['light','heavy','low','throw'])combat.moves[slot].name={light:'Contact du carton',heavy:'Charge du carton',low:'Glissade sous couverture',throw:'Saisie de l’opérateur'}[slot];
   combat.moves.special.name=boxLabels[candidate.boxVariant];
   combat.moves.specialDown.name='Couverture du carton';
   combat.moves.specialForward.name='Avance dissimulée';
   combat.moves.specialBack.name='Repli sous couverture';
   combat.moves.super.name='Sortie de l’opérateur';
   combat.moves.utility.name='Repositionnement';
  }else if(candidate.episode==='SURVIVE'){
   combat.key=candidate.kit;combat.passive.machine=false;
   combat.resource={kind:'stamina',label:'ACTIVITÉ',max:100,regen:.16,reload:58};
   combat.moves.light.name='Contact organique';combat.moves.heavy.name='Percussion cristalline';
   combat.moves.low.name='Attaque rasante';combat.moves.throw.name='Saisie';
   combat.moves.special.name={wanderer:'Avance du Wanderer',tracker:'Bond du Tracker',mortar:'Salve du Mortar',crawler:'Ruée du Crawler',watcher:'Alerte du Watcher',grabber:'Saisie des tendrils',detonator:'Détonation',giant:'Impact de la créature'}[candidate.kit];
  }
  return fighter;
 }
 function prepare(baseline,options={}){
  if(!Array.isArray(baseline))throw new TypeError('PASS19 baseline must be an array');
  const selection=options.uids?new Set(options.uids):null;
  return registry.candidates.filter(c=>!selection||selection.has(c.uid)).map(c=>create(c,baseline));
 }
 function install(baseline,options={}){
  if(typeof options.isRenderable!=='function')throw new TypeError('PASS19 installation requires accepted native-renderer readiness predicate');
  const existing=new Set(baseline.map(f=>f.uid)), added=[], pending=[];
  for(const fighter of prepare(baseline,options)){
   if(existing.has(fighter.uid))continue;
   if(!options.isRenderable(fighter)){pending.push(fighter.uid);continue;}
   baseline.push(fighter);existing.add(fighter.uid);added.push(fighter.uid);
  }
  return {added,pending,baseSourceRelease:registry.sourceRelease};
 }
 const api={schema:registry.schema,registry,prepare,install};
 root.CQC_PASS19_ROSTER_ADDITIONS=api;
 if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
'''
module=module.replace('__REGISTRY__',json.dumps(registry,ensure_ascii=False,separators=(',',':')))
(ROOT/'cqc-pass19-roster-additions.js').write_text(module)

report={'schema':'cqc.pass19.reference-roster-build/1','status':'prepared-reference-and-profiles-only','baselineCount':len(fighters),'newCandidates':len(rows),'uidDuplicates':0,'existingIdentityDuplicates':0,'baselineSHA256':hashlib.sha256(source).hexdigest(),'baselineChanged':False,'runtimeActivated':False,'nativeArtGenerated':False,'priorityCandidates':26,'optionalUGCandidates':6,'outputs':{p.name:{'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()} for p in [ROOT/'REFERENCE_ROSTER_REGISTRY_V1.json',ROOT/'cqc-pass19-roster-additions.js']}}
(ROOT/'REFERENCE_ROSTER_BUILD_REPORT_V1.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(report,ensure_ascii=False))
