from pathlib import Path
from collections import Counter
import copy, hashlib, json, struct
from PIL import Image

ROOT = Path('/mnt/data/cqc-p66/shadow-codec-ops')
PASS = ROOT / 'docs/cqc-reprise/pass66'
BASE = '101b15617f8766353800ffc1be592ec1aef6b66c'
BRANCH = 'codex/cqc-p61-missing-static-sources-20261125'
WEB = f'https://github.com/darknigthmare/shadow-codec-ops/blob/{BRANCH}/'
RAW = f'https://raw.githubusercontent.com/darknigthmare/shadow-codec-ops/refs/heads/{BRANCH}/'
DAY = '2026-11-26'

def read(name):
    return json.loads((ROOT/name).read_text())

def write_json(name, obj):
    p = ROOT/name
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(json.dumps(obj, ensure_ascii=False, indent=2)+'\n')

def write_text(name, body):
    p = ROOT/name
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(body.rstrip()+'\n')

def metadata(path):
    b=(ROOT/path).read_bytes()
    with Image.open(ROOT/path) as im:
        d=dict(width=im.width,height=im.height,colorMode=im.mode)
        if im.mode=='RGBA':
            a=im.getchannel('A')
            hist=a.histogram()
            d['alphaExtrema']=list(a.getextrema())
            edges=[a.crop((0,0,im.width,1)),a.crop((0,im.height-1,im.width,im.height)),a.crop((0,0,1,im.height)),a.crop((im.width-1,0,im.width,im.height))]
            d['alphaStats']={'fullyTransparentPixels':hist[0], 'nearOpaquePixels250To255':sum(hist[250:]), 'semiTransparentPixels1To249':sum(hist[1:250]), 'alphaAbove16OnCanvasEdges':sum(sum(e.histogram()[17:]) for e in edges), 'boundsAt16':list(a.point(lambda v:255 if v>16 else 0).getbbox())}
    d.update(bytes=len(b), sha256=hashlib.sha256(b).hexdigest(),gitBlobSha=hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest(),bitDepth=b[24],colorType=b[25])
    return d

historical=read('docs/cqc-reprise/pass61/inventory.json')
historical_ids={r['id'] for r in historical['rows']}
registry_names=['asset-associations.json','asset-associations-p63.json','asset-associations-p64.json','asset-associations-p65.json']
old_assets=[a for n in registry_names for a in read('docs/cqc-bible/'+n)['assets']]
assert len(old_assets)==211
stage_guide=['02','13','14','15','17','19','25','26','27','29']
prop_guide=['02','07','16','17','18','19','25','26','29']

details={
 'acid-far-b3f-container-bay':{
  'workIds':['stage:acid_far','stage:acid_far_b3f'],
  'scope':'Une baie de conteneurs et de caisses de FAR B3F, en caméra oblique. Fragment de référence, sans plan complet de l’étage.',
  'notes':['Conteneurs olive cannelés et caisses orange/jaune reconnaissables dans le gameplay PSP.', 'Nombre de modules, empilements et largeurs de passage reconstruits ; la petite image native ne permet pas une mesure exacte.', 'La sortie est une scène opaque unique ; aucun personnage, carte, HUD ou bord de console conservé.'],
  'remaining':'Obtenir des captures natives plus grandes, relever la circulation et les raccords de B3F, puis définir une adaptation latérale, les limites de combat et les calques de profondeur.'},
 'acid-far-b4f-turbine-walkways':{
  'label':'AC!D — FAR B4F, passerelles grillagées',
  'workIds':['stage:acid_far','stage:acid_far_b4f'],
  'scope':'Passerelles et caillebotis d’un secteur de FAR B4F ; les turbines, le graphe de circulation et la topologie exacte restent non validés.',
  'notes':['Motifs industriels, caillebotis, garde-corps et changements de niveau identifiables.', 'Réserve renforcée : les volumes ont été reconstruits en grands massifs pleins réguliers. Hauteurs, épaisseurs et continuités ne sont pas établies.', 'Le nom historique du fichier contient turbine, mais ne constitue pas une preuve de turbine fidèlement représentée.', 'Une deuxième séquence native B4F élargit les angles connus à 160×90 par vue, sans résoudre la géométrie fine.'],
  'remaining':'Priorité à une revue géométrique avec des captures plus grandes. Valider les machines, les escaliers, les hauteurs et les raccords avant tout découpage ou admission.'},
 'acid-far-b5f-clown-chamber':{
  'workIds':['stage:acid_far','stage:acid_far_b5f'],
  'scope':'Un secteur de la chambre de La Clown à FAR B5F, avec canal grillagé central et passerelles. Aucun boss intégré.',
  'notes':['Chemin central rouge-brun, volumes gris/verts, garde-corps et escaliers repris des vues natives.', 'Disposition symétrique des coffrages, nombre de modules et position des volées d’escaliers reconstruits.', 'La scène ne démontre ni toutes les connexions de l’étage ni le périmètre complet de la rencontre.'],
  'remaining':'Confronter au parcours natif et aux vues de dessus ; séparer fond, plans de circulation et volumes interactifs. Les phases et comportements de La Clown relèvent d’un chantier combat distinct.'},
 'acid2-control-section-stair-hall':{
  'workIds':['stage:acid2_control_section'],
  'scope':'Hall intérieur de Control Section : une longue volée d’escalier et deux paliers. Aucun secteur complet.',
  'notes':['Escalier crème, niveaux décalés, sols menthe et cloisons vert sombre/ambre repris d’une vue native sans bord PSP.', 'Le nombre exact de marches, la largeur des paliers et les murs hors champ ne sont pas relevés à une échelle connue.', 'L’image conserve une caméra tactique oblique ; elle ne fournit pas encore un fond latéral prêt au combat.'],
  'remaining':'Relever les accès, les dimensions et les limites du hall ; définir la caméra CQC et la navigation sans confondre l’escalier du décor avec une transition jouable.'},
 'acid2-communications-tower-service-deck':{
  'workIds':['stage:acid2_communications_tower'],
  'scope':'Passerelle technique de Communications Tower : panneaux orange, supports à treillis, rambardes rouges et coffrets.',
  'notes':['Deux séquences natives établissent les panneaux orange, les poteaux ouverts et les rambardes rouges.', 'Nombres de croisillons, dimensions des coffrets et géométrie des raccords simplifiés ou reconstruits.', 'Réserve forte de la revue indépendante : les grandes armoires fermées à évents ne reproduisent pas un équipement identifié ; largeur de colonne et raccord escalier/passerelle sont extrapolés.', 'Un seul fragment compact est représenté : ni tour entière, ni antenne, ni panorama inventé.'],
  'remaining':'Valider la disposition de la passerelle et ses accès dans la mission ; produire les vues latérales et les plans séparés utiles au stage CQC.'},
 'acid2-terminal-loading-platform':{
  'workIds':['stage:acid2_terminal'],
  'scope':'Quai souterrain de Terminal : rails parallèles, passerelle métallique, conteneurs verts et plateforme de chargement.',
  'notes':['Atmosphère vert sombre et relation linéaire rail/quai/conteneurs fondées sur deux séquences natives.', 'Échelle, nombres de conteneurs et distances ont été reconstruits ; les détails des rails ne sont pas certifiés.', 'Réserve forte de la revue indépendante : répétition des quais et ouverture lumineuse lointaine reconstituées. Le matériel roulant présent dans la référence a été retiré par la consigne de génération.', 'Aucun train, passager, HUD ou branche de tunnel supplémentaire n’a été demandé. Le fond reste une source de travail oblique.'],
  'remaining':'Vérifier les accès, l’emplacement exact des plateformes et les dimensions du quai. Séparer la présentation des rails de toute règle de danger ou de transition.'},
 'acid2-residential-area-lobby':{
  'workIds':['stage:acid2_residential_area'],
  'scope':'Vestibule intérieur de Residential Area : porte beige-olive, piédroits vert-noir veinés d’or et morceau du palier.',
  'notes':['Porte et encadrement identifiés sur les vues natives de Stage08 ; la vue de palier confirme le sol vert et une portion rouge à motifs.', 'Veinage, texture du tapis, éclairage et quincaillerie de porte reconstruits. Les détails fins ne sont pas attestés pixel par pixel.', 'L’élément central ambigu des vues éloignées n’est pas inclus ; cette image ne couvre pas le quartier résidentiel entier.'],
  'remaining':'Contrôler les matériaux et les proportions sur une capture plus nette, relever les couloirs adjacents et déterminer le cadrage de combat avant de compléter ce secteur.'}
}

plans=read('docs/cqc-reprise/pass66/research/acid/generation-plan.json')['plans']+read('docs/cqc-reprise/pass66/research/acid/generation-plan-acid2.json')['plans']+[read('docs/cqc-reprise/pass66/research/acid/generation-plan-residential.json')]
acid_assets=[]
for p in plans:
    spec=details[p['id']]
    refs=['docs/cqc-reprise/pass66/research/acid/'+p['file']]
    if p.get('secondFile'):refs.append('docs/cqc-reprise/pass66/research/acid/'+p['secondFile'])
    urls=[p.get('sourceURL','https://www.youtube.com/watch?v=3uEDiylaszU')]
    if p.get('secondaryURL'):urls.append(p['secondaryURL'])
    if p['id']=='acid-far-b4f-turbine-walkways':urls.append('https://www.youtube.com/watch?v=srqYghjykt0')
    path='public/cqc/assets/p66/'+p['id']+'.png'
    a={'id':p['id'],'label':spec.get('label',p['label']), 'episode':'Metal Gear AC!D' if p['episodeKey']=='acid' else 'Metal Gear AC!D 2', 'episodeKey':p['episodeKey'], 'kind':'stage', 'edition':'PSP — gameplay natif ; vues issues de séquences publiques', 'workIds':spec['workIds'], 'scope':spec['scope'], 'referenceURLs':urls,'referenceFiles':refs,'referenceSeconds':p.get('seconds',[]), 'qaNotes':spec['notes']+['PNG natif 1672×941, aucun agrandissement ni retouche de pixels. Les références ne valident pas une géométrie exacte 1:1.', 'Source statique candidate pour l’Atlas ; pas de parallaxe séparée, collisions, transition ou admission au combat.'], 'path':path,'selectedVersion':'v1','generation':{'tool':'image_gen.imagegen','mode':'reference_generation','attempts':1,'promptId':p['id'],'exactPrompt':p['prompt'],'referenceFiles':refs,'transparent_background':False,'postprocessing':'none; original data URL PNG decoded byte-for-byte'}, 'nextWork':spec['remaining']}
    a.update(metadata(path));acid_assets.append(a)
write_json('docs/cqc-reprise/pass66/research/acid/handoff.json',{'schema':'cqc.p66.acid-handoff.v1','parentCommit':BASE,'requests':7,'successfulOutputs':7,'selectedCount':7,'archives':[],'blockedRequests':[],'assets':acid_assets})

survive=read('docs/cqc-reprise/pass66/research/survive/handoff.json')
mgr=read('docs/cqc-reprise/pass66/research/mgr/handoff.json')
assets=acid_assets+copy.deepcopy(survive['assets'])+copy.deepcopy(mgr['assets'])
archives=copy.deepcopy(mgr['archives'])+copy.deepcopy(survive.get('archives',[]))
extra_next={
 'survive-forsaken-ruins-terrace':'Cartographier le reste des ruines, les entrées et les profondeurs ; produire les calques et relever les distances avant collisions et admission de stage.',
 'survive-machine-gun-turret':'Valider les parties masquées, le pivot et les appuis ; prévoir états de visée, tir, dégâts et destruction, règles de ciblage, limites et contre-jeu. Aucun de ces comportements n’est créé ici.',
 'survive-oil-trap':'Documenter et produire les états de pose, activation et destruction ; définir la surface affectée, l’effet de glissade, les délais et les règles de neutralisation.',
 'survive-flame-trap':'Valider la matrice de panneaux et les buses ; préparer les états actif/inactif, le VFX séparé, la zone de dommage, le délai et les possibilités de destruction.',
 'mgr-cardboard-box':'Documenter les autres faces et l’étiquette ; produire entrée/sortie et déplacement si retenus dans CQC, puis définir la détection, les limites et le contre-jeu.',
 'mgr-drum-can':'Vérifier le modèle retail, le couvercle et les proportions sur de nouvelles vues ; préparer les états dressé, renversé et déplacement avant règles de collision et furtivité.',
 'mgr-cardboard-box-mariachi':'Valider position, taille et motifs du sombrero ; relier cette variante au même objet de base sans créer artificiellement un combattant ou une animation.'}
for a in assets:
    a['path']=a.pop('publishedPath',a['path'])
    a.pop('originalGeneratedFile',None)
    a.pop('passId',None)
    a.update(metadata(a['path']))
    a.update(assetId='asset:p66:'+a['id'],passId='P66',selected=True,sourceGenerated=True,atlasIntegrated=True,runtimeIntegrated=False,combatRuntimeIntegrated=False,combatReady=False,absolute1to1Certified=False,referenceGeometryValidated=False,fidelityStatus='pending_external_review',nativeUhd=False,scopeClosed=False)
    a['pass']='P66'
    a.setdefault('selectedVersion','v1')
    a.setdefault('edition','Jeu original — vues natives de gameplay')
    a['transparentBackground']=a['colorMode']=='RGBA'
    a['guideSections']=stage_guide if a['kind']=='stage' else prop_guide
    a['runtimeBinding']={'status':'atlas_only','moduleKey':'atlas63','catalogPath':'public/cqc/data/cqc-p63-source-atlas.json','admittedByThisPass':False}
    a['tracking']={'scopeClosed':False,'historicalWorkIds':[x for x in a['workIds'] if x in historical_ids], 'extensionWorkIds':[x for x in a['workIds'] if x not in historical_ids], 'narrativePlansCreated':0}
    a['bibleURL']=WEB+'docs/cqc-bible/CONTINUATION_P66.md#'+a['id']
    a['blobURL']=WEB+a['path']
    a['manifest']='docs/cqc-reprise/pass66/delivery-manifest.json'
    a['bibleDocuments']=['docs/cqc-bible/CONTINUATION_P66.md','docs/cqc-bible/ASSOCIATIONS.md','docs/cqc-bible/FICHES_ET_VALIDATION.md', 'docs/cqc-bible/ARENES_ET_BOSS.md' if a['kind']=='stage' else 'docs/cqc-bible/COMBAT.md']
    a['promptRecord']='docs/cqc-reprise/pass66/prompt-index.json#'+a['id']
    a['nextWork']=a.get('nextWork',extra_next.get(a['id']))
    a['reviewRecords']=['docs/cqc-reprise/pass66/research/'+('acid/independent-far-qa.json' if a['episodeKey']=='acid' else 'acid/independent-acid2-qa.json' if a['episodeKey']=='acid2' else a['episodeKey']+'/independent-visual-qa.json')]
for a in archives:
    a.update(metadata(a['path']))
    a.update(sourceGenerated=True,selected=False,atlasIntegrated=False,runtimeIntegrated=False,combatReady=False,combatRuntimeIntegrated=False,absolute1to1Certified=False)

counts={'selectedSources':len(assets),'archivedAttempts':len(archives),'generatedPNGs':len(assets)+len(archives),'generationRequests':len(assets)+len(archives),'blockedRequests':0,'previousSelected':211,'totalSelected':211+len(assets),'previousArchivedAttempts':15,'totalArchivedAttempts':15+len(archives),'atlasSources':34+len(assets),'byEpisode':dict(Counter(a['episodeKey'] for a in assets)),'byKind':dict(Counter(a['kind'] for a in assets)),'allPassesByKind':dict(Counter(a['kind'] for a in old_assets+assets)),'selectedBytes':sum(a['bytes'] for a in assets),'archivedBytes':sum(a['bytes'] for a in archives),'combatAdmissions':0,'absolute1to1Certifications':0,'newNarrativeImages':0}
common={'asOf':DAY,'parentCommit':BASE,'previousSelected':211,'counts':counts,'historicalRows':277,'historicalUnmatchedRows':97,'historicalCountsMeaning':'Photographie historique P61 conservée. Une nouvelle source candidate ne ferme ni un groupe ni une tâche gameplay.', 'extensionScopes':sorted({x for a in assets for x in a['tracking']['extensionWorkIds']}),'historicalScopeUpdates':sorted({x for a in assets for x in a['tracking']['historicalWorkIds']}),'inherits':['docs/cqc-bible/'+n for n in registry_names], 'interpretation':'Extension additive P66. atlasIntegrated:true décrit la consultation de sources candidates. runtimeIntegrated:false conserve le sens d’admission au combat. Aucune nouvelle certification 1:1, aucun PNG natif UHD, aucun périmètre clos.', 'requirementsGuide':'docs/cqc-bible/guide-map.json','assets':assets,'archives':archives,'blockedRequests':[]}
write_json('docs/cqc-reprise/pass66/delivery-manifest.json',{'schema':'cqc.p66.delivery.v1',**common})
write_json('docs/cqc-bible/asset-associations-p66.json',{'schema':'cqc.bible.asset-associations-p66.v1',**common})
write_json('docs/cqc-reprise/pass66/prompt-index.json',{'schema':'cqc.p66.prompt-index.v1','generationRequests':len(assets)+len(archives),'generatedOutputs':len(assets)+len(archives),'selectedOutputs':len(assets),'archiveOutputs':len(archives),'blockedRequests':0,'records':[{'id':a['id'],'output':a['path'],'sha256':a['sha256'],'referenceFiles':a.get('referenceFiles',[]),'generation':a['generation']} for a in assets],'archiveRecords':archives,'interpretation':'Les mots HD/UHD dans les prompts sont des intentions artistiques ; les dimensions mesurées des fichiers font foi. Aucun agrandissement ni retouche de pixels après imagegen.'})

scope_rows=[]
for work_id in sorted({x for a in assets for x in a['workIds']}):
    linked=[a for a in assets if work_id in a['workIds']]
    before=[a['assetId'] for a in old_assets if work_id in a.get('workIds',[])]
    scope_rows.append({'workId':work_id,'historicalP61Row':work_id in historical_ids,'previousSelectedAssets':before,'newSelectedAssets':[a['assetId'] for a in linked],'status':'partial_static_source_added','scopeClosed':False,'combatAdmission':False,'remaining':[a['nextWork'] for a in linked]})
write_json('docs/cqc-reprise/pass66/scope-delta.json',{'schema':'cqc.p66.scope-delta.v1','parentCommit':BASE,'historicalSnapshot':{'path':'docs/cqc-reprise/pass61/inventory.json','rows':277,'unmatchedRowsAtP61':97,'modified':False},'counts':counts,'scopeUpdates':scope_rows,'surviveOpenCandidates':survive['openCandidates'],'previousRefusalsNotRetried':['MGR fragmentation grenade','MGR EM grenade','MGR rocket launcher','MGR armored cyborg','REX The Twin Snakes'],'scopeClosureCount':0,'interpretation':'Les extensions descriptives sont séparées du dénominateur P61. Plusieurs fragments peuvent enrichir la même ligne historique sans la fermer.'})

intro=f'''# Continuation P66 — Survive, AC!D, AC!D 2 et Rising

**26 novembre 2026 — 14 sources individuelles sélectionnées, 3 essais archivés, 17 appels de génération.** Cette passe ajoute 8 fragments de décor et 6 objets. Le cumul atteint **225 PNG sélectionnés**, dont **48 consultables dans l’Atlas**. Les 211 identités historiques et les 34 entrées Atlas antérieures restent inchangées.

Les fichiers sont des candidats visuels pour la production. **Aucune admission au combat, certification absolue 1:1, clôture de périmètre ou nouvelle image narrative.** Les 8 décors font 1672×941 ; les 6 objets ont leurs dimensions natives consignées ci-dessous. Aucun n’est un PNG natif UHD. Les octets de sortie imagegen sont conservés, sans agrandissement ni retouche de pixels.

[Galerie et bilan](../cqc-reprise/pass66/README.md) · [Associations P66](asset-associations-p66.json) · [Manifeste de livraison](../cqc-reprise/pass66/delivery-manifest.json) · [Delta des périmètres](../cqc-reprise/pass66/scope-delta.json) · [Contrôles](../cqc-reprise/pass66/INTEGRATION_QA.md) · [Manquants suivis](../cqc-reprise/pass66/MANQUANTS.md)

## Comptes et portée

| Ensemble | Ajouts | Nature |
|---|---:|---|
| Metal Gear AC!D | 3 | Baie B3F, passerelles B4F, chambre B5F de FAR |
| Metal Gear AC!D 2 | 4 | Fragments de Control Section, Communications Tower, Terminal et Residential Area |
| Metal Gear Survive | 4 | Terrasse Forsaken Ruins, Machine Gun Turret, Oil Trap, Flame Trap |
| Metal Gear Rising: Revengeance | 3 | Cardboard Box, Drum Can, variante Cardboard Box Mariachi |

La bible compte désormais 133 décors, 20 personnages, 9 costumes, 46 machines, 14 objets, 2 corps de projectiles et 1 VFX. Les 18 essais archivés cumulés sont exclus de ces 225 sources. Le guide original, ses 30 rubriques, ses 90 exigences et la photographie P61 de 277 lignes dont 97 sans correspondance démontrée ne sont pas réécrits pour suggérer une progression artificielle.

## Critères de lecture

La revue visuelle accepte les motifs observables comme base de travail et enregistre les écarts. Elle ne certifie pas les dimensions ni la topologie. Les références AC!D issues de storyboards ont parfois une très petite surface de jeu dans un cadre PSP ; leur taille limite les conclusions sur la géométrie et les détails. Les scènes à caméra oblique demandent encore une adaptation latérale. La terrasse Survive est déjà recomposée latéralement, mais ses distances et connexions restent ouvertes.

Les objets isolés conservent un véritable canal alpha. Pour les deux boîtes MGR, l’alpha maximal natif vaut 254/255 : une très faible translucidité subsiste. Le fût s’appuie sur une capture PS3 de preview datée du 26 janvier 2013 ; sa correspondance stricte au modèle final reste à démontrer. Les deux variantes de boîte sont des objets, pas de nouveaux combattants.

## Fiches individuelles
'''
sections=[]
for a in assets:
    refs='\n'.join(f'- [Référence {i+1}]({url})' for i,url in enumerate(a['referenceURLs']))
    qa='\n'.join('- '+n for n in a['qaNotes'])
    sections.append(f'''<a id="{a['id']}"></a>

### {a['label']}

**Périmètre :** {a['scope']}

| Champ | Valeur |
|---|---|
| Identité | `{a['assetId']}` |
| Type / épisode | `{a['kind']}` / {a['episode']} |
| Édition ou attribution | {a['edition']} |
| Source | [{Path(a['path']).name}]({WEB+a['path']}) |
| Format natif | {a['width']}×{a['height']}, {a['colorMode']}, {a['bytes']:,} octets |
| SHA-256 | `{a['sha256']}` |
| Périmètres reliés | {', '.join('`'+x+'`' for x in a['workIds'])} |
| Rubriques du guide | {', '.join(a['guideSections'])} |
| Admission | Atlas seulement ; combat et certification 1:1 non validés |

**Références :**

{refs}

**Constats et limites :**

{qa}

**Suite nécessaire :** {a['nextWork']}
''')
end='''## Conception et admission futures

Les huit fragments enrichissent la présentation. Les quatre axes d’arène restent suivis séparément : présentation, interactions, dangers et transitions. Une passerelle dessinée ne crée pas un étage jouable ; des rails dessinés ne créent pas un danger ; une porte dessinée ne crée pas une transition. Les volumes, règles, dimensions de la zone de combat, spawn points, caméras, profondeurs et liaisons devront être définis puis vérifiés dans le moteur.

Les six objets alimentent les fiches de comportement : pose ou équipement, activité, réaction aux coups, destruction, neutralisation, délais et contre-jeu. Les dégâts, projectiles, états d’invulnérabilité, frame data, sons et animations ne sont pas introduits par ces PNG. La tourelle Survive, les deux pièges et les déguisements MGR restent liés à leur incarnation et à leurs règles à concevoir.

Les exigences de lecture, d’accessibilité, de lisibilité des silhouettes, de contraste, de cohérence de caméra et de traçabilité s’appliquent avant admission. Chaque état dérivé devra garder une identité propre et une référence vérifiable. La production d’animation reste différée dans cette phase de sources fixes.

## Archives, refus et contrôle

La boîte MGR v1 a été remplacée par une correction d’alpha, et le fût v1 par une correction de proportions. La première version du piège à flamme, dont la matrice comportait 8 panneaux au lieu de 12, est aussi remplacée. Les trois originaux sont archivés hors du catalogue et du runtime ; leurs octets, hashes et motifs sont conservés dans les manifestes. Aucun refus nouveau n’a eu lieu pendant P66. Les cibles déjà refusées lors de passes antérieures n’ont pas été réessayées ni renommées.

L’intégration additive étend le catalogue Atlas et son graphe de fichiers. Le shell, le contrôleur, les styles et le point d’entrée historiques sont conservés. Les contrôles de structure PNG, CRC, décompression, hashes, alpha, unicité et bijections entre bible/livraison/Atlas sont décrits dans le rapport QA. Ils établissent l’intégrité de livraison ; ils ne démontrent pas une fidélité absolue.

Le contrôle navigateur reste indisponible : Chromium est incomplet dans l’environnement et le téléchargement officiel a échoué. Aucun parcours navigateur ou déploiement de production n’est présenté comme validé par P66. La publication cible la PR #25 existante.
'''
write_text('docs/cqc-bible/CONTINUATION_P66.md',intro+'\n'.join(sections)+'\n'+end)

gallery='''# P66 — galerie des nouvelles sources CQC

**14 PNG sélectionnés : 8 fragments de décor et 6 objets.** Cumul : **225 sources**, **48 entrées Atlas**, **18 essais archivés**. Les 3 archives de cette passe restent hors du catalogue. 17 appels imagegen ont produit 17 sorties PNG ; aucun refus nouveau.

[Bible P66](../../cqc-bible/CONTINUATION_P66.md) · [Livraison](delivery-manifest.json) · [Associations](../../cqc-bible/asset-associations-p66.json) · [Prompts](prompt-index.json) · [Manquants](MANQUANTS.md) · [QA](INTEGRATION_QA.md)

Chaque illustration est un fichier individuel, consultable dans `/cqc/?module=atlas63`. Les images opaques sont des fragments de décor ; les objets sont isolés avec alpha natif. Aucun PNG natif UHD, aucune admission combat, aucun périmètre clos et aucune certification absolue 1:1.

## Sources sélectionnées

'''
for a in assets:
    gallery+=f"### {a['label']}\n\n![{a['label']}]({('../../../'+a['path'])})\n\n{a['scope']}\n\n**{a['width']}×{a['height']} · {a['colorMode']} · {a['selectedVersion']}** — [Fiche et réserves]({a['bibleURL']}).\n\n"
gallery+='''## Essais archivés

| Essai | Motif | Remplacement |
|---|---|---|
| [Cardboard Box v1](rejected/mgr-cardboard-box-v1.png) | Correction de l’alpha périphérique | Cardboard Box v2 |
| [Drum Can v1](rejected/mgr-drum-can-v1.png) | Silhouette trop haute et étroite | Drum Can v2 |\n| [Flame Trap v1](rejected/survive-flame-trap-v1.png) | Matrice de 8 panneaux au lieu de 12 | Flame Trap v2 |

La comparaison indépendante des références est consignée dans `research/acid/independent-far-qa.json`, `research/acid/independent-acid2-qa.json`, `research/survive/independent-visual-qa.json` et `research/mgr/independent-visual-qa.json`. Les références locales sont des preuves de recherche, séparées des PNG générés et du runtime.
'''
write_text('docs/cqc-reprise/pass66/README.md',gallery)

missing='''# P66 — manquants et suites vérifiables

La passe ajoute 14 sources candidates. Elle ne ferme aucun périmètre. Le fichier P61 de 277 lignes, dont 97 alors sans correspondance démontrée, reste une photographie historique, pas un compteur courant de pourcentage d’achèvement. Les nouveaux sous-périmètres descriptifs sont suivis séparément dans [scope-delta.json](scope-delta.json).

## Priorités après cette livraison

| Ensemble | Avancée P66 | Suite nécessaire |
|---|---|---|
| FAR, AC!D | B3F, B4F et B5F possèdent chacun un fragment | Captures plus nettes, géométrie et connexions ; B4F à revoir en priorité. Aucun étage déclaré complet. |
| AC!D 2 | Quatre intérieurs/secteurs distincts ajoutés | Plans de niveau, cadrages latéraux, volumes et raccords ; détails de Residential Area encore approximatifs. |
| Forsaken Ruins | Terrasse et passage ajoutés | Reste de la carte, entrées, distances, profondeurs et calques séparés. |
| Défenses Survive | Tourelle autonome, Oil Trap et Flame Trap inactifs | Parties masquées, autres angles, états actifs/détruits, VFX séparés, interactions et règles de neutralisation. |
| Wormhole Transporter | Référence d’ensemble conservée | Vue rapprochée non masquée indispensable avant source isolée. |
| Air Shock Cannon | Deux vues supplémentaires inspectées | Face avant encore masquée par le HUD ; pas de reconstruction déclarée exacte. |
| Mortar de Survive | Identités séparées | Projectile de l’ennemi Mortar sans géométrie démontrée ; mortier déployable distinct avec appui arrière masqué. |
| Captain de Survive | Deux démonstrations de costumes antérieures conservées | Couverture du corps, variantes et personnalisation complète restent ouvertes. |
| Déguisements MGR | Boîte normale, variante Mariachi et fût ajoutés | Autres faces de boîte, détails du sombrero, modèle final du fût, états et comportements. |
| Combat / narration | Liens de bible enrichis | Aucun nouveau moveset, état, plan narratif illustré ou combattant admis par P66. |

## Travaux par source

'''
for a in assets:missing+=f"- **{a['label']}** : {a['nextWork']}\n"
missing+='''
## Contraintes conservées

Les grenades à fragmentation et EM de Rising, le lance-roquettes, le cyborg blindé et REX The Twin Snakes ont fait l’objet de refus antérieurs. Ils ne sont pas relancés sous un nom différent. Les corps BOX-T (SMK), BOX-T (STN) et le projectile du Mortar ne sont pas remplacés par un effet de fumée générique.

La séparation reste stricte entre une source générée, sa présence dans l’Atlas, une animation produite, une fonctionnalité testée, une admission combat et une certification de fidélité. Le [manifeste P66](delivery-manifest.json) porte ces statuts explicitement.
'''
write_text('docs/cqc-reprise/pass66/MANQUANTS.md',missing)

# Update only the current landing summary, preserve all historical sections.
p=ROOT/'docs/cqc-bible/README.md'
s=p.read_text()
s=s.replace('**Version P65 — 26 novembre 2026. Fondation P62 et extensions P63/P64 conservées.**','**Version P66 — 26 novembre 2026. Fondation P62 et extensions P63/P64/P65 conservées.**',1)
s=s.replace('les sources statiques P60/P61/P62/P63/P64/P65.','les sources statiques P60/P61/P62/P63/P64/P65/P66.',1)
marker='La [continuation P65](CONTINUATION_P65.md)'
current='La [continuation P66](CONTINUATION_P66.md) ajoute **14 sources individuelles** : trois fragments FAR d’AC!D, quatre secteurs d’AC!D 2, quatre sources Survive et trois objets Rising. Le total atteint **225 sources sélectionnées** et l’Atlas **48 entrées**. Les 211 sources et les 34 entrées Atlas antérieures restent inchangées. La [galerie P66](../cqc-reprise/pass66/README.md), les [associations P66](asset-associations-p66.json) et les [manquants suivis](../cqc-reprise/pass66/MANQUANTS.md) précisent les limites. **0 admission au combat, 0 certification absolue 1:1, aucun PNG natif UHD et aucun périmètre clos.**\n\n**Historique P65 conservé.** '
if 'La [continuation P66]' not in s:s=s.replace(marker,current+marker,1)
s=s.replace('| Livraison courante : 6 sources et extension Atlas P65 |','| Historique : 6 sources et extension Atlas P65 |',1)
table='| Livraison courante : 14 sources et extension Atlas P66 | [CONTINUATION_P66.md](CONTINUATION_P66.md) ; [galerie P66](../cqc-reprise/pass66/README.md) |\n| Associations et contrôles P66 | [asset-associations-p66.json](asset-associations-p66.json) ; [INTEGRATION_QA.md](../cqc-reprise/pass66/INTEGRATION_QA.md) |\n'
if table not in s:s=s.replace('| Historique : 6 sources et extension Atlas P65 |',table+'| Historique : 6 sources et extension Atlas P65 |',1)
counts_table='| Sources sélectionnées P66 | **14 PNG : 8 fragments de décor et 6 objets**. |\n| Total P60–P66 | **225 PNG : 133 décors, 20 personnages, 9 costumes, 46 machines, 14 objets, 2 projectiles et 1 VFX**. |\n| Atlas après P66 | **48 entrées**, dont les 34 antérieures conservées. |\n| Essais P66 et cumul | **3 P66 ; 18 cumulés**. |\n| Appels P66 | **17 appels, 17 PNG, 14 retenus et 3 archives ; 0 refus nouveau**. |\n| Admission et fidélité P66 | **0 admission au combat, 0 certification 1:1, 0 clôture de périmètre**. |\n'
anchor='| Admission et fidélité P65 | **0 admission au combat, 0 certification 1:1, 0 clôture de périmètre**. |\n'
if counts_table not in s:s=s.replace(anchor,anchor+counts_table,1)
p.write_text(s)

appendices={
 'ASSOCIATIONS.md':'Les 14 sources P66 sont associées individuellement aux périmètres, rubriques du guide, références, réserves et tâches suivantes. Le registre historique reste inchangé ; FAR reçoit trois fragments distincts sur sa ligne historique et les autres sous-périmètres descriptifs sont suivis en extension. Le cumul est de 225 sources sélectionnées, dont 48 dans l’Atlas. Les 3 archives P66 ne sont pas des sources retenues.',
 'ARENES_ET_BOSS.md':'P66 ajoute huit fragments : FAR B3F/B4F/B5F, Control Section, Communications Tower, Terminal, Residential Area et une terrasse de Forsaken Ruins. Ces images enrichissent la présentation seulement. Navigation, dimensions, quatre axes d’arène, transitions et règles de boss restent à définir et à tester. B4F porte une réserve renforcée sur la géométrie et les turbines.',
 'COMBAT.md':'P66 prépare six sources d’objet : Machine Gun Turret, Oil Trap, Flame Trap, Cardboard Box, Drum Can et variante Mariachi. Leurs états, délais, ciblage, dommages, collisions, neutralisations et contre-jeu sont consignés comme travaux nécessaires. Aucun comportement ni moveset n’est admis par l’ajout des PNG. La variante Mariachi partage l’objet de base et ne crée pas un combattant.',
 'FICHES_ET_VALIDATION.md':'Les 14 fiches P66 disposent d’une identité, de dimensions mesurées, d’un SHA-256, de références, d’un périmètre borné et de réserves. La revue indépendante accepte des candidats de travail ; elle ne certifie pas le 1:1. L’intégrité PNG et les bijections de catalogue sont vérifiées séparément de la fidélité visuelle. Le parcours navigateur reste non validé dans cette passe.'}
for name, body in appendices.items():
    p=ROOT/'docs/cqc-bible'/name;s=p.read_text()
    if '\n## Extension P66' not in s:
        s+='\n## Extension P66 — 26 novembre 2026\n\n'+body+'\n\n[Continuation et fiches P66](CONTINUATION_P66.md) · [Associations P66](asset-associations-p66.json) · [Delta](../cqc-reprise/pass66/scope-delta.json) · [QA](../cqc-reprise/pass66/INTEGRATION_QA.md)\n'
    p.write_text(s)
print(json.dumps(counts,ensure_ascii=False,indent=2))
