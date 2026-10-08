from pathlib import Path
import hashlib,json,subprocess,time

OUT=Path('/workspace/cqc-pass19-backlog-final');APP=Path('/tmp/cqc-pass19-application');REF=Path('/tmp/cqc-pass19-reference-roster');IMAGES=REF/'references'
REG=REF/'REFERENCE_ROSTER_REGISTRY_V2.json';PROGRESS=REF/'SURVIVE_REFERENCE_PROGRESS_AND_PENDING_V2.json'
CHECK=OUT/'ROSTER_RESERVED_SOURCE_STATUS_ACTUAL_V1.json';COVERAGE=Path('/workspace/cqc-pass19-reference-final/COVERAGE_AND_SCALE_SOURCE_ACTUAL_V1.json')
reg=json.loads(REG.read_text());progress=json.loads(PROGRESS.read_text());check=json.loads(CHECK.read_text());coverage=json.loads(COVERAGE.read_text());have={r['uid'] for r in coverage['UIDProofs']}
reserved={r['uid']:r for r in check['rows'] if not r['activeInFinalCoverage']}

def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def pin(p):return {'path':str(p),'bytes':p.stat().st_size,'sha256':sha(p)}
def source(url,kind,scope,local=None,viewed=False):
 d={'url':url,'kind':kind,'scope':scope,'physicallyViewedPreviously':viewed}
 if local and (IMAGES/local).exists():d['localEvidence']=pin(IMAGES/local)
 return d

enemy=source('https://metalgearsurvive-archive.fandom.com/wiki/Enemies','secondary-community-index-only','Names and behaviour; full page unavailable during research, not a physically observed original model.')
nameplate=source('https://metalgear.fandom.com/wiki/Nameplate','secondary-game-data-transcription-index-only','Survive creature nomenclature; not a full model reference.')
guide=source('https://mgcvt.com/guide/mgspw/equipment.htm','secondary-game-equipment-transcription','RESCUE BOX equipment identity and role; texture not physically verified.')
manual=source('https://metalgear.konami.net/manual/mc2/mgspw/xbox/en/page08.html','publisher-primary','Player-equipped cardboard box behaviour only; does not attest the unique Rescue exterior.')
chart=source('https://www.konami.com/mg/mgs5/tpp/jp/evolution/_img/his_pic02_zoom.jpg','publisher-primary','Common Gekko 4.2m height directly read earlier; does not identify a grenade mount or Dwarf carrier attachment.','konami-mgsv-his_pic02_zoom.jpg',True)
details={
 'pass19__watcher_survive':{
  'referenceStatus':'partial-original-game-capture-viewed','identityStatus':'source-enemy-name-attested; full-wing-topology-unresolved',
  'visualFinding':'A close original capture shows the floating dark bulb, dorsal crest, frontal red light/laser and four hanging appendages. Wings are motion-blurred; membrane count and roots remain unresolved.',
  'sources':[source('https://www.gamepur.com/guides/chapter-10-and-chapter-11-metal-gear-survive-walkthrough','secondary-published-original-gameplay-capture','Released-game close view, incomplete moving wings.'),source('https://cdn1.gamepur.com/images/feature/watcher.jpg','secondary-published-original-gameplay-capture','Actually viewed close view.','watcher-gamepur-original.jpg',True),enemy,nameplate],
  'nextReliableAction':'Find a released-game front/side frame with still wings; verify the full roots and membranes, then create and review independent native facings before activation.'},
 'pass19__grabber_survive':{
  'referenceStatus':'name-behaviour-attested-but-exposed-body-unviewed','identityStatus':'source-enemy-name-attested; full-exposed-anatomy-unresolved',
  'visualFinding':'Thirteen Chapter16 captures and a Gamepur picture were physically inspected; none exposes a complete Grabber body. Text describes a plant-like lure and grabbing tendril; it does not certify a precise crab anatomy.',
  'sources':[source('https://gameranx.com/features/id/140658/article/metal-gear-survive-walkthrough-chapter-16-new-map-new-memory-board/','secondary-published-original-gameplay-captures','Thirteen inspected images lack an exposed complete body.','gameranx-grabber-ch16-source.html',True),enemy,nameplate],
  'nextReliableAction':'Obtain a released-game capture after a Kuban lure or attack exposes the body, inspect all limbs and tentacle roots, and only then prepare native body and grab poses.'},
 'pass19__detonator_survive':{
  'referenceStatus':'secondary-text-only-no-accepted-physical-body-reference','identityStatus':'co-op-enemy-label-attested; visual-distinction-from-Bomber-unresolved',
  'visualFinding':'Reserved co-op explosive/side-objective adversary. No accepted original full-body image has been inspected. Do not duplicate the already native Bomber under another name.',
  'sources':[enemy],
  'nextReliableAction':'Capture the co-op enemy nameplate and full visible body in the same released-game sequence, establish the distinction from Bomber, then review the explosive body/loadout before generating.'},
 'pass19__lord_of_dust_survive':{
  'referenceStatus':'partial-original-game-captures-viewed','identityStatus':'separate-story-boss-attested; complete-joint-topology-and-size-unresolved',
  'visualFinding':'Three usable original screenshots show the gigantic crystalline arthropod. A fourth contains no creature and is excluded. Occlusion prevents certification of the entire locomotion-leg/arm/mandible topology; no eight-leg assertion or official metric size.',
  'sources':[source('https://gameranx.com/features/id/140657/article/metal-gear-survive-walkthrough-chapter-14-15-escape-dite/','secondary-published-original-gameplay-captures','Three usable original views inspected.','lord-of-dust-original-202543.jpg',True),source('https://gameranx.com/features/id/141165/article/metal-gear-survive-walkthrough-chapter-23-24-the-final-battle/','secondary-walkthrough-reference-target','Final-battle page preserved; additional full images have not been physically reviewed.','lord-dust-final-battle-source.html')],
  'nextReliableAction':'Inspect unobstructed final-battle views of every joint and body section, determine a qualified boss framing and camera regime, then build separate native moving/destructible sections as needed.'},
 'pass19__gekko_grenade_mgs4':{
  'referenceStatus':'chassis-attested-weapon-mount-identification-unresolved','identityStatus':'configuration-reserved; small-launcher-clusters-not-yet-identified',
  'visualFinding':'A released Gekko render includes large missile tubes and separate clusters of small tubes. The small clusters have not been proven to be grenade launchers rather than decoy/smoke launchers. Standard Gekko already has its native body.',
  'sources':[chart,source('https://mgcvt.com/word/w2','secondary-transcription-of-publisher-material','Gekko options and dimensions; exact visible grenade assembly still requires released-game verification.')],
  'nextReliableAction':'Find a released MGS4 sequence identifying the grenade assembly and its discharge; reuse only attested chassis data and create source-matched attachment parts for both directions.'},
 'pass19__gekko_carrier_mgs4':{
  'referenceStatus':'secondary-cutscene-configuration-text-only','identityStatus':'cutscene-assembly-reserved; not-attested-as-independent-combat-loadout',
  'visualFinding':'A Gekko carrying Dwarf Gekko near the head is text-attested. The exact number, attachment sockets and deployment have not been physically reviewed. This is separate from the already added three-unit trenchcoat and two-unit Double Tripod.',
  'sources':[chart,source('https://metalgear.fandom.com/wiki/Gekko','secondary-community-index-only','Carrier described as a cutscene configuration; full page was unavailable.')],
  'nextReliableAction':'Inspect the original cutscene carrier and Dwarf release, pin the attachment positions and number, and document the requested playable adaptation before making native parts.'},
 'pass19__rescue_box_pw':{
  'referenceStatus':'equipment-name-attested-unique-exterior-unviewed','identityStatus':'boxed-human-loadout-reserved; not-an-autonomous-machine',
  'visualFinding':'Text describes rescue/ambulance-like use, but the unique exterior, markings and siren have not been physically confirmed. Eight other Peace Walker boxed-human loadouts are already native. The Night3 EN and JP public Dailymotion metadata returned object_not_found and yielded no usable Rescue frame.',
  'sources':[manual,guide,source('https://wikiwiki.jp/walker/%E8%A3%85%E5%82%99%E5%93%81','secondary-game-equipment-transcription','RESCUE BOX role and item identity.'),source('https://www.konami.com/mg/archive/mgs_pw/en/trailer/index.html','publisher-primary-page','Night3 archive exists, but the preserved page exposes no usable trailer stream.','pw-night3-official-trailer-index-source.html')],
  'nextReliableAction':'Locate an accessible original Rescue Box equipment/gameplay frame and review markings, dimensions and operator boots; then create native facings without invented ambulance graphics.'},
 'pass19__fenrir_mgr':{
  'referenceStatus':'secondary-label-and-concept-family-reference-only','identityStatus':'LQ-84-mass-produced-unit; preserve-existing-LQ-84i-Blade-Wolf',
  'visualFinding':'A quadruped concept has been viewed, but it is not a certified final released Fenrir loadout. A candidate Gamepressure screenshot contained an empty corridor and is excluded.',
  'sources':[source('https://metalgear.fandom.com/wiki/Fenrir','secondary-community-index-only','LQ-84 Fenrir identity; distinct from named intelligent LQ-84i Blade Wolf.'),source('https://www.creativeuncut.com/gallery-22/mgrr-blade-wolf-concept.html','publisher-concept-republished-by-secondary','Family design evidence only; concept versus final Fenrir distinction remains.','mgrr-blade-wolf-concept.jpg',True)],
  'nextReliableAction':'Capture a released-game mass-produced LQ-84 at close range, verify its weapon/tail and markings against LQ-84i, then prepare its own native articulated body.'},
 'pass19__raptor_mgr':{
  'referenceStatus':'republished-concept-viewed-final-game-body-unreviewed','identityStatus':'Raptor-UG-label-attested; released-attachment-detail-unresolved',
  'visualFinding':'A dark biped concept with claws/blades is physically viewed. The concept does not certify all released model geometry or metric height.',
  'sources':[source('https://metalgear.fandom.com/wiki/Raptor','secondary-community-index-only','UG name and role.'),source('https://www.creativeuncut.com/gallery-22/mgrr-raptor-concept.html','publisher-concept-republished-by-secondary','Design concept, not a verified released model capture.','mgrr-raptor-concept.jpg',True)],
  'nextReliableAction':'Inspect close released-game front/side Raptor views and attack limbs, then produce independent native sections and directional anatomy.'},
 'pass19__mastiff_mgr':{
  'referenceStatus':'community-full-render-and-partial-game-captures-viewed','identityStatus':'Mastiff-UG-name-attested; final-hidden-joints-unresolved',
  'visualFinding':'A community render claimed to be an extracted released model shows gorilla proportions, long arms, masked head, pouches and yellow zigzag armour markings. Partial released-game frames corroborate visible features; no official primary model provenance or all-angle proof.',
  'sources':[source('https://open3dlab.com/project/478600f7-dee1-4c1b-97dc-d7e2039f55ee/','secondary-community-claimed-extracted-game-model-render','No model downloaded; full render provenance remains community-attested.','mgr-mastiff-extracted-model-community.png',True),source('https://portforward.com/games/walkthroughs/Metal-Gear-Solid-Rising-Revengeance/R-02-Research-Facility.htm','secondary-published-original-gameplay-captures','Partial combat views corroborate visible exterior, not hidden joints.','mgr-mastiff-original-120.webp',True)],
  'nextReliableAction':'Corroborate a complete released-game Mastiff turn and attack poses, especially hidden joints and weapons; then build source-matched native sections without certifying the community render as official.'},
 'pass19__vodomjerka_mgr':{
  'referenceStatus':'republished-concept-viewed-final-game-body-unreviewed','identityStatus':'UG-label-attested; released-locomotion-and-weapon-mount-unresolved',
  'visualFinding':'The viewed concept shows a four-legged green water-strider-like machine, jet pods and an underslung weapon. Its full released-game geometry remains unreviewed.',
  'sources':[source('https://metalgear.fandom.com/wiki/Unmanned_Gear','secondary-community-reference-target','Further MGR UG nomenclature.'),source('https://www.creativeuncut.com/gallery-22/mgrr-vodomjerka-concept.html','publisher-concept-republished-by-secondary','Concept topology only; not complete released-game certification.','mgrr-vodomjerka-concept.jpg',True)],
  'nextReliableAction':'Inspect original water/ground traversal and gun mount in released-game frames, then make native leg/body sections and reviewed directions.'},
 'pass19__slider_mgr':{
  'referenceStatus':'tiny-distant-original-game-capture-viewed','identityStatus':'flying-UG; must-distinguish-machine-from-human-rider',
  'visualFinding':'The inspected original 640×360 game frame contains a small distant Slider above the hangar; it does not resolve wings, weapon sockets or the entire outline.',
  'sources':[source('https://www.gamepressure.com/mgsrevengeance/boss-metal-gear-ray/z45cf6','secondary-published-original-gameplay-capture','Distant small visible flying unit.','mgr-slider-original-gamepressure.jpg',True),source('https://metalgear.fandom.com/wiki/Unmanned_Gear','secondary-community-reference-target','UG category and rider distinction.')],
  'nextReliableAction':'Find a close unobstructed released Slider front/side/banked view, separate rider variants from the UG identity, then construct its native wings and body.'},
 'pass19__hammerhead_mgr':{
  'referenceStatus':'secondary-label-only-no-accepted-physical-reference','identityStatus':'unmanned-helicopter-candidate; full-rotor-and-fuselage-unresolved',
  'visualFinding':'No accepted complete original Hammerhead image has been physically inspected. A targeted StrategyWiki image returned HTTP403 and was not bypassed.',
  'sources':[source('https://metalgear.fandom.com/wiki/Unmanned_Gear','secondary-community-reference-target','Helicopter UG label and category only.')],
  'nextReliableAction':'Find an accessible original released helicopter encounter with a clear rotor, fuselage and weapons; verify the exact Hammerhead identity before native articulated generation.'},
}
entries=[]
for c in reg['candidates']:
 if c['uid'] not in reserved:continue
 item={'uid':c['uid'],'name':c['name'],'sourceGame':c['episode'],'appearanceKind':c['appearanceKind'],'scopeClass':'optional-UG-extension-already-proposed' if c.get('priority')=='extension' else 'reserved-requested-category-addition','userRequestBasis':'Requested category: Survive enemies, Gekko configurations/related machines, or all Peace Walker playable boxes. These individual names were researcher-proposed; this is not a claim that every name was explicitly enumerated by the user.','runtimeRegistration':'reserved-in-registry-inactive','approvedNativeBody':'absent','currentNativeSourceCheck':reserved[c['uid']],'absolute1to1Certified':False,'officialMetricHeightCertifiedForThisAppearance':False,**details[c['uid']]}
 entries.append(item)
assert len(entries)==13 and len(details)==13
research=[]
for c in progress['additionalPendingCandidates']:
 uid=c['proposedUID'];ambiguous=('wanderer_flame' in uid or 'wanderer_frost' in uid or 'wanderer_shock' in uid or 'gekko_' in uid or 'devastator' in uid)
 research.append({'proposedUID':uid,'name':c['name'],'runtimeRegistration':'research-only; not-in-current-runtime-registry','approvedNativeBody':'absent','sourceEvidence':'secondary-game-data-transcription-only','sources':[{'url':url,'kind':'secondary-community-game-data-transcription'} for url in c['sources']],'identityDecisionRequired':ambiguous,'scope':c['scope'],'nextReliableAction':'Inspect released-game nameplate and full original body. Decide state/loadout/costume versus distinct incarnation before reserving or activating a new UID. Preserve archive__seth for the human Seth and existing standard Wanderer/Gekko identities.','absolute1to1Certified':False})
assert len(research)==8 and all(c['proposedUID'] not in have and c['proposedUID'] not in {e['uid'] for e in reg['candidates']} for c in progress['additionalPendingCandidates'])
head=subprocess.check_output(['git','rev-parse','HEAD'],cwd=APP).decode().strip();assert head=='4cf0e71d9c7486ef63745e5f270c88da2847c18e'
manifest=APP/'public/cqc/runtime-manifest.json';assert sha(manifest)=='71f78c94af131f40f40dddf150a65e6cd80394c3c1e9a1c0473837f714a45560'
assert sha(IMAGES/'watcher-gamepur-original.jpg')==progress['physicalReferenceReview']['watcher']['sha256']
report={'schema':'cqc.pass19.remaining-roster-reference-audit/1','status':'completed-read-only-with-qualified-pending-work','createdAtUTC':time.strftime('%Y-%m-%dT%H:%M:%SZ',time.gmtime()),'appGitCommit':head,'runtimeManifest':pin(manifest),'sourceInputs':[pin(REG),pin(PROGRESS),pin(CHECK),pin(COVERAGE)],'scope':'Bounded audit of the32 previously reserved additions and8 previously researched Survive proposals, supplementing but not modifying the costume backlog. Not an exhaustive catalogue of every Metal Gear licence character.','mutations':{'source':False,'runtime':False,'git':False,'browser':False,'imageGeneration':False},'counts':{'currentPlayableNativeCoveredUIDs':373,'currentBaseNativeCatalogUIDsIncludingOC':374,'previousRegistryCandidates':32,'activeNativeRegistryAdditions':19,'remainingReservedCandidates':13,'remainingPriorityReserved':7,'remainingOptionalUGReserved':6,'researchOnlySurviveProposals':8,'activePlayableUIDsWithoutApprovedNativeBody':0},'criticalDistinction':'All373 current playable identities have their source-pinned approved sprite/rig coverage. The13 reservations below are inactive additions without an approved native body, not active fighters rendered through a substitute. Raw unapproved isolated attempts, if any, are not asserted absent.','reservedCandidates':entries,'boundedResearchOnlyProposals':research,'alreadyCompletedRequestedFamilies':{'surviveNativeAdditions':progress['nativeApprovedUIDs'],'peaceWalkerBoxes':8,'newGekkoAssemblies':5,'requestedParkaResolution':'Three Dwarf Gekko in the canonical MGS4 trenchcoat and fedora, pass19__dwarf_gekko_trenchcoat_mgs4, already native; no invented parka incarnation.','existingIdentitiesPreserved':[e['uid'] for e in reg['existingIdentitiesPreserved']]},'blockedOrExcludedEvidence':{'Watcher':'The publisher-press candidate actually showed Fulton balloons and is excluded; only the reviewed Gamepur original capture supports the partial body.','Grabber':'Chapter16 and additional Gamepur landscape frames do not reveal its complete exposed body.','LordOfDust':'lord-of-dust-original-202633.jpg contains no creature and is excluded.','Fenrir':'mgr-fenrir-original-gamepressure.jpg was an empty corridor and is excluded.','RescueBox':'Both public Night3 Dailymotion metadata endpoints were dead/object_not_found; no usable frame was extracted.','CommunityPages':'Blocked HTTP402/403 full pages and images were not bypassed. Index text is qualified as secondary and is not a physical model certificate.'},'nextAcceptanceGate':'Physically review the original reference, resolve identity/configuration ambiguity, then create and review both native facings or source-pinned articulated parts and appropriate gameplay/scale. Keep the UID inactive until native renderer readiness passes.','fidelityQualification':'Every appearance aims for the closest source fidelity supported by observed references. Neither hidden original3D anatomy, unobserved markings nor original metric heights are invented or certified literal1:1.'}
target=OUT/'ROSTER_REMAINING_REFERENCE_AUDIT_ACTUAL_V1.json';assert not target.exists();target.write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
md='''Les 373 combattants actuellement jouables disposent de leur corps natif validé. Le registre pass19 conserve **13 ajouts inactifs** sans corps natif approuvé : **7 réserves principales** et **6 UG optionnels déjà proposés**. Il ne s’agit pas d’une liste exhaustive de la licence.

| Réserve | Référence disponible | Prochaine étape fiable |
| --- | --- | --- |
| Watcher | Capture originale proche, ailes floues | Vue nette des ailes et de leurs attaches |
| Grabber | Noms et comportements ; captures sans corps exposé | Capture originale après exposition complète |
| Detonator | Texte secondaire ; distinction visuelle inconnue | Nom et corps en co-op, distinction avec Bomber |
| Lord of Dust | Trois captures utiles, articulations masquées | Vues complètes, structure et caméra de boss |
| Gekko lance-grenades | Châssis connu ; petits tubes non identifiés | Preuve de l’arme et de son montage |
| Gekko porteur | Configuration de cinématique décrite | Capture du portage et du déploiement |
| Rescue Box | Objet attesté ; extérieur non inspecté | Capture originale des marquages et de l’opérateur |
| Fenrir | Famille conceptuelle ; modèle final à confirmer | LQ-84 de série distinct de Blade Wolf |
| Raptor | Concept inspecté | Corps et attaques du jeu sorti |
| Mastiff | Rendu communautaire complet et captures partielles | Corroboration complète des articulations |
| Vodomjerka | Concept inspecté | Traversée et montages du jeu sorti |
| Slider | Petite silhouette distante | Vue proche sans confusion avec le pilote |
| Hammerhead | Nomenclature secondaire | Rencontre originale avec rotor et armes visibles |

**8 propositions Survive restent au stade recherche** : XOF Gunner, Devastator, Seth muté, Wanderer feu/glace/électricité, Gekko de Dite et variante toxique. Aucun de ces noms supplémentaires n’est activé ni inclus dans les 13 réserves. Les variantes élémentaires, loadouts et incarnations doivent être distingués avant de créer de nouveaux UID ; le Seth humain est préservé.

Les six nouvelles créatures Survive, huit boîtes Peace Walker et cinq assemblages Gekko sont déjà natifs. La demande « Gekko en parka » a été rattachée à l’assemblage canonique de trois Dwarf Gekko sous trenchcoat et fedora, déjà livré. Les limites des références restent explicites ; aucune fidélité absolue 1:1 n’est certifiée.

Le JSON associé contient chaque UID, la provenance primaire/secondaire, les preuves locales SHA, les ambiguïtés et les exclusions. Aucun runtime, source, Git, navigateur ou asset n’a été modifié par cet audit.
'''
mp=OUT/'ROSTER_REMAINING_REFERENCE_AUDIT_ACTUAL_V1.md';assert not mp.exists();mp.write_text(md)
print(json.dumps({'json':pin(target),'markdown':pin(mp),'reserved':13,'priority':7,'optional':6,'researchOnly':8,'currentNativePlayable':373},ensure_ascii=False),flush=True)
