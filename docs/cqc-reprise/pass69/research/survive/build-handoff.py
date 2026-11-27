from pathlib import Path
from datetime import datetime, timezone
import hashlib
import json
from PIL import Image

REPO = Path(__file__).resolve().parents[5]
HERE = Path(__file__).resolve().parent
PREFIX = HERE.relative_to(REPO).as_posix()
REFS = HERE / 'references'
old = REFS / 'native-survival-machete-gold.jpg'
if old.exists():
    old.rename(REFS / 'native-onehand-example-20180815182809_1.jpg')

def identity(path):
    raw = path.read_bytes()
    im = Image.open(path)
    out = dict(path=path.relative_to(REPO).as_posix(), bytes=len(raw),
               sha256=hashlib.sha256(raw).hexdigest(),
               gitBlobSha=hashlib.sha1(b'blob ' + str(len(raw)).encode() + b'\0' + raw).hexdigest(),
               width=im.width, height=im.height, colorMode=im.mode)
    if path.suffix == '.png':
        out.update(bitDepth=raw[24], colorType=raw[25])
    if 'A' in im.getbands():
        a = im.getchannel('A')
        hist = a.histogram()
        edges = list(a.crop((0, 0, im.width, 1)).getdata()) + list(a.crop((0, im.height-1, im.width, im.height)).getdata()) + list(a.crop((0, 0, 1, im.height)).getdata()) + list(a.crop((im.width-1, 0, im.width, im.height)).getdata())
        out['alphaExtrema'] = list(a.getextrema())
        out['alphaStats'] = dict(fullyTransparentPixels=hist[0], nearOpaquePixels250To255=sum(hist[250:]), semiTransparentPixels1To249=sum(hist[1:250]), alphaAbove16OnCanvasEdges=sum(v > 16 for v in edges), boundsAt16=a.point(lambda v: 255 if v > 16 else 0).getbbox(), boundsAt128=a.point(lambda v: 255 if v > 128 else 0).getbbox())
    return out

context_defense = 'https://w.atwiki.jp/mgsurvive/pages/111.html'
official_context = 'https://www.konami.com/games/us/en/topics/917/'
source_rows = [
    ('native-air-side-220401_10.jpg', 'https://img.atwiki.jp/mgsurvive/attach/111/100/220401_10.jpg', context_defense, 'native_gameplay_screenshot_hosted_on_community_wiki', True, 'Vue principale P69 : disque frontal, corps et monture dégagés ; quelques éléments du pied restent sous le HUD.'),
    ('native-air-support-220401_12.jpg', 'https://img.atwiki.jp/mgsurvive/attach/111/98/220401_12.jpg', context_defense, 'native_gameplay_screenshot_hosted_on_community_wiki', True, 'Seconde vue : collerette, monture, quatre appuis ; face de l’émetteur sous le HUD, couverte par la nouvelle vue 220401_10.'),
    ('native-heavy-weapon-20180815182912_1.jpg', 'https://img.atwiki.jp/mgsurvive/attach/25/71/20180815182912_1.jpg', 'https://w.atwiki.jp/mgsurvive/pages/25.html', 'native_inventory_render_hosted_on_community_wiki', True, 'Marteau doré intégral sur grille ; silhouette comparée au Sledgehammer nommé dans la planche officielle. La page classe l’image comme exemple Heavy Weapons, sans légende individuelle Gold.'),
    ('native-survival-spear-gold.jpg', 'https://img.atwiki.jp/mgsurvive/attach/24/64/20180815182903_1.jpg', 'https://w.atwiki.jp/mgsurvive/pages/24.html', 'native_inventory_render_hosted_on_community_wiki', True, 'Lance dorée intégrale sur grille ; silhouette comparée à la Survival Spear nommée dans le Survival Pack officiel. La page présente un exemple de la classe Thrust Weapons sans légende individuelle Gold.'),
    ('official-mgv-preorder-beauty-shot.png', 'https://www.konami.com/kde_cms/na_publish/uploads/mgv_preorder_beauty_shot.png', official_context, 'official_publisher_promotional_render', False, 'Document d’identification des variantes dorées ; les vignettes de la masse et de la lance servent à corroborer la forme et le nom. Non envoyé comme référence imagegen.'),
    ('native-defenses-220401_03.jpg', 'https://img.atwiki.jp/mgsurvive/attach/111/94/220401_03.jpg', context_defense, 'native_gameplay_screenshot_hosted_on_community_wiki', False, 'Réexaminée : Oil Trap et Flame Trap déjà sélectionnés P66, aucun Frost/Shock Trap distinct établi.'),
    ('native-defenses-220401_04.jpg', 'https://img.atwiki.jp/mgsurvive/attach/111/95/220401_04.jpg', context_defense, 'native_gameplay_screenshot_hosted_on_community_wiki', False, 'Réexaminée : Machine Gun Turret déjà sélectionnée P66 ; aucun doublon généré.'),
    ('survive_defenses_official.png', 'https://eu-support.konami.com/hc/article_attachments/25993239646359', 'https://eu-support.konami.com/hc/en-gb/articles/9649642757399-Game-Modes', 'official_publisher_gameplay_screenshot', False, 'Mortar déployé encore masqué par son opérateur. Aucune génération.'),
    ('native-air-spike-220401_11.jpg', 'https://img.atwiki.jp/mgsurvive/attach/111/102/220401_11.jpg', context_defense, 'native_gameplay_screenshot_hosted_on_community_wiki', False, 'Grande barricade de pieux : centre masqué par l’avatar, aucune génération.'),
    ('native-defense-220401_06.jpg', 'https://img.atwiki.jp/mgsurvive/attach/111/97/220401_06.jpg', context_defense, 'native_gameplay_screenshot_hosted_on_community_wiki', False, 'Air Cannon moins dégagé que la vue 10 ; non envoyé à imagegen.'),
    ('native-defense-220401_08.jpg', 'https://img.atwiki.jp/mgsurvive/attach/111/99/220401_08.jpg', context_defense, 'native_gameplay_screenshot_hosted_on_community_wiki', False, 'Montage de clôtures ; aucun objet nouveau lisible.'),
    ('native-defense-220401_09.jpg', 'https://img.atwiki.jp/mgsurvive/attach/111/101/220401_09.jpg', context_defense, 'native_gameplay_screenshot_hosted_on_community_wiki', False, 'Air Cannon masqué par le personnage ; non envoyé à imagegen.'),
    ('native-onehand-example-20180815182809_1.jpg', 'https://img.atwiki.jp/mgsurvive/attach/21/65/20180815182809_1.jpg', 'https://w.atwiki.jp/mgsurvive/pages/21.html', 'native_inventory_render_hosted_on_community_wiki', False, 'Exemple de machette à lame sombre et manche enveloppé ; identité de variante non établie, aucune génération. Le fichier a été renommé pour ne pas l’affirmer Gold.'),
    ('official-preorder-for-web.jpg', 'https://www.konami.com/kde_cms/eu_publish/uploads/for-web.jpg', 'https://www.konami.com/games/eu/en/topics/14402/', 'official_publisher_promotional_render', False, 'Affiche générale, pas une planche d’équipement ; archivée comme piste examinée, non utilisée.'),
    ('official-preorder-1920_1080-600x338.jpg', 'https://www.konami.com/kde_cms/eu_publish/uploads/1920_1080-600x338.jpg', 'https://www.konami.com/games/eu/en/topics/14402/', 'official_publisher_promotional_render', False, 'Affiche de sortie, pas une planche d’équipement ; non utilisée.'),
]
refs = []
for name, url, context, kind, used, note in source_rows:
    row = identity(REFS / name)
    row.update(sourceURL=url, contextURL=context, sourceKind=kind, officialPublisherHosted=kind.startswith('official_'), usedForGeneration=used, visuallyInspected=True, editing='none; original retrieved bytes', observation=note)
    if name in ['native-defenses-220401_03.jpg', 'native-defenses-220401_04.jpg', 'survive_defenses_official.png']:
        row['retrieval'] = 'github_fetch_file encoding base64 at published P68 commit, exact P66 reference bytes'
        row['inheritedFrom'] = 'docs/cqc-reprise/pass66/research/survive/references/' + name
    elif name == 'native-air-support-220401_12.jpg':
        row['retrieval'] = 'byte-for-byte copy of surviving published P68 reference'
        row['inheritedFrom'] = 'docs/cqc-reprise/pass68/research/survive/references/native-balloon-trap-220401_12.jpg'
    else:
        row['retrieval'] = 'public HTTPS GET with urllib.request and User-Agent Mozilla/5.0'
    refs.append(row)
by_name = {Path(r['path']).name: r for r in refs}

air_path = REPO / 'public/cqc/assets/p69/survive-air-shock-cannon.png'
air_image = Image.open(air_path)
air_alpha_diagnostic = dict(schema='cqc.p69.survive.alpha-preview-diagnostic.v1', checkedAt=datetime.now(timezone.utc).isoformat(), asset=identity(air_path), requestedSamples=[dict(x=x, y=y, rgba=list(air_image.getpixel((x,y)))) for x,y in [(430,386),(360,440)]], brightRgbDefinition='min(R,G,B)>220', regions=[], pixelEdits=False)
for box in [(420,370,440,410),(340,430,390,447)]:
    pixels = [(x,y,*air_image.getpixel((x,y))) for y in range(box[1],box[3]) for x in range(box[0],box[2])]
    bright = [r for r in pixels if min(r[2:5])>220]
    visible = [r for r in bright if r[5]>16]
    air_alpha_diagnostic['regions'].append(dict(rectangle=list(box), pixels=len(pixels), brightRgbPixels=len(bright), brightAlpha0=sum(r[5]==0 for r in bright), brightAlpha1To16=sum(0<r[5]<=16 for r in bright), brightAlphaAbove16=len(visible), brightMaxAlpha=max((r[5] for r in bright),default=None), brightBoundsInclusive=[min(r[0] for r in bright),min(r[1] for r in bright),max(r[0] for r in bright),max(r[1] for r in bright)] if bright else None))
air_alpha_diagnostic['interpretation'] = 'Both requested white preview spots are RGBA(255,255,255,1), not alpha0. In the two inspected rectangles all bright RGB pixels have alpha1 or2 (max2/255); no bright pixel has alpha>16. A faint fringe remains. These regions also include gray object-edge antialiasing, so the conclusion applies to the white preview spots, not every pixel in the rectangles. Original PNG bytes unchanged.'
(HERE/'alpha-preview-diagnostic.json').write_text(json.dumps(air_alpha_diagnostic,ensure_ascii=False,indent=2)+'\n')

data = [
    dict(id='survive-air-shock-cannon', label='Survive — Air Shock Cannon, déployé inactif', edition='Metal Gear Survive — équipement de défense, plateforme non certifiée', scope='Un canon à choc d’air déployé, vue trois quarts frontale, statique ; nouveau candidat pour le périmètre auparavant sans vue dégagée.', refs=['native-air-side-220401_10.jpg', 'native-air-support-220401_12.jpg'], generated='exec-61fd50a9-c276-4d06-b82d-f378683759f2.png', work='prop:survive_air_shock_cannon', qa=[
        'La nouvelle capture 220401_10 dégage la face ronde olive que P68 ne pouvait pas lire sous le HUD de 220401_12. Les deux vues native-gameplay ont été inspectées avant génération.',
        'Disque court et large, boîtier sombre, collerette blanche, monture, câble latéral, antenne et quatre appuis bas sont repris ; aucun long tube de canon ou effet lumineux ajouté.',
        'Le rendu conserve la grande silhouette. Les vis, grilles, arêtes et textures sont interpolées à partir de petits détails, sans mesure ni validation géométrique absolue. Le boîtier opposé et le dos ne sont pas documentés.',
        'Un seul objet, entier, sans avatar, clôture ou HUD. Quatre appuis détachés et pointes présentes. Aucun cycle actif, déplacement d’air, impact, collision ou comportement de défense livré.',
        'Les boutons PlayStation des captures n’établissent pas à eux seuls la plateforme d’exécution. L’édition est donc enregistrée avec plateforme non certifiée.',
        'Diagnostic demandé par le root : les taches blanches d’aperçu aux pixels (430,386) et (360,440) valent chacune RGBA(255,255,255,1), pas alpha0. Dans les rectangles [420,370,440,410] et [340,430,390,447], tous les pixels RGB clairs ont un alpha de1 ou2, aucun supérieur à16. Faible frange conservée, aucune retouche ; détails dans alpha-preview-diagnostic.json.'
    ], next=['Obtenir une vue native nette du dos et du boîtier opposé puis vérifier les dimensions du disque, du pivot et des quatre appuis.', 'Produire séparément les états posé, armé, déclenchement, retour et désactivation à partir de séquences natives.', 'Définir pour CQC, après validation, un pivot et une zone d’effet orientée ; créer séparément le VFX de déplacement d’air et les réactions. Aucune donnée de combat n’est déduite de ce PNG.']),
    dict(id='survive-sledgehammer-gold', label='Survive — Sledgehammer [Gold], Survival Pack', edition='Metal Gear Survive — Survival Pack / variante Gold', scope='Masse dorée complète, une vue trois quarts diagonale du modèle d’inventaire ; accessoire séparé de tout avatar.', refs=['native-heavy-weapon-20180815182912_1.jpg'], supporting=['official-mgv-preorder-beauty-shot.png'], generated='exec-dd6d1243-ea65-4024-a9a8-39b4bea44742.png', work='prop:survive_sledgehammer_gold', qa=[
        'Capture native de l’exemple Heavy Weapons sur atwiki, corroborée par la vignette de masse nommée dans la planche officielle Survival Pack et par l’annonce KONAMI des quatre armes dorées.',
        'Attribution Gold fondée sur la comparaison visuelle et la source officielle ; la page communautaire ne légende pas individuellement cette image. Revue externe du modèle exact encore requise.',
        'Tête massive à encoches, faces d’impact polygonales sombres, plaque latérale dorée, cou évasé et long manche enveloppé conservés ; tête et extrémité du manche entièrement cadrées.',
        'Détails de surface et micro-rayures réinterprétés. La vue opposée, l’attache à la main et les collisions n’ont pas été établies. Aucun swing, coup chargé ou effet d’impact fourni.'
    ], next=['Confirmer l’identifiant de modèle Gold et obtenir l’autre flanc ainsi que la vue de dessus native.', 'Définir un point de prise et l’axe du manche pour les futurs avatars CQC ; garder le prop autonome tant que les mains et poses correspondantes ne sont pas validées.', 'Créer des poses statiques puis des cycles de préparation, frappe verticale, frappe latérale et récupération à partir de captures de référence ; séparer choc, poussière et son de cette source.']),
    dict(id='survive-survival-spear-gold', label='Survive — Survival Spear [Gold], Survival Pack', edition='Metal Gear Survive — Survival Pack / variante Gold', scope='Lance dorée complète, profil trois quarts de l’inventaire, lame vers la gauche ; un PNG indépendant sans porteur.', refs=['native-survival-spear-gold.jpg'], supporting=['official-mgv-preorder-beauty-shot.png'], generated='exec-ec2afa99-84f0-4451-80e0-2c26c16162df.png', work='prop:survive_survival_spear_gold', qa=[
        'Capture native de l’exemple Thrust Weapons sur atwiki ; comparaison avec la Survival Spear dorée explicitement présente dans le Survival Pack officiel.',
        'Lame courte asymétrique, petite garde circulaire, douille évasée, hampe fine très longue, bagues et pommeau arrondi sont conservés. La pointe, le pommeau et les marges sont présents.',
        'Le nom précis de variante est corroboré par la planche officielle et la teinte du modèle ; la page communautaire ne fournit pas de légende individuelle Gold. Une confirmation de modèle reste ouverte.',
        'L’échelle du relief, de l’usure et des bagues est interprétée, sans extraction 1:1 du modèle. Aucun porteur, estoc, projectile, collision ni comportement de combat n’est livré.'
    ], next=['Vérifier le nom de modèle Gold, le revers de la lame, l’épaisseur de la garde et les bagues avec des vues natives supplémentaires.', 'Définir pour l’intégration future deux prises de mains sur la hampe sans modifier la proportion lame/hampe validée.', 'Documenter puis produire les positions de garde, estoc, retrait et transition de course ; traiter l’arme de mêlée séparément d’un projectile et garder l’effet de contact distinct.']),
]

assets = []
for d in data:
    asset = identity(REPO / ('public/cqc/assets/p69/' + d['id'] + '.png'))
    reference_names = d['refs'] + d.get('supporting', [])
    exact_prompt = (HERE / 'prompts' / (d['id'] + '.txt')).read_text()
    original = REPO.parent / 'generated_images' / d['generated']
    assert original.read_bytes() == (REPO / asset['path']).read_bytes(), 'Raw PNG identity changed'
    asset.update(id=d['id'], assetId='asset:p69:' + d['id'], label=d['label'], kind='prop', episode='Metal Gear Survive', episodeKey='survive', edition=d['edition'], **{'pass':'P69'}, passId='P69', workIds=[d['work']], scope=d['scope'], bodyCoverage='full_object', referenceFiles=[by_name[n]['path'] for n in reference_names], referenceURLs=list(dict.fromkeys(v for n in reference_names for v in [by_name[n]['contextURL'], by_name[n]['sourceURL']])), referenceMetadata=[by_name[n] for n in reference_names], qaNotes=d['qa'], nextWork=d['next'], transparentBackground=True, sourceGenerated=True, selected=True, atlasIntegrated=False, runtimeIntegrated=False, combatReady=False, combatRuntimeIntegrated=False, absolute1to1Certified=False, referenceGeometryValidated=False, nativePixelExact=False, nativeUhd=False, scopeClosed=False, fidelityStatus='pending_external_review', publishedPath=asset['path'], tracking=dict(scopeClosed=False, historicalWorkIds=[], extensionWorkIds=[d['work']], narrativePlansCreated=0), generation=dict(tool='image_gen.imagegen', mode='reference_generation', attempts=1, promptId=d['id'], promptFile=PREFIX + '/prompts/' + d['id'] + '.txt', exactPrompt=exact_prompt, referenced_image_paths=[str(REFS/n) for n in d['refs']], transparent_background=True, postprocessing='none; original generated PNG bytes preserved', originalGeneratedPath=str(original), transport='referenced_image_paths; output copied byte-for-byte from local generated_images file'), decision='Agent visual selection, root independent review required before Atlas integration.')
    assets.append(asset)

handoff = dict(schema='cqc.p69.survive.handoff.v1', passId='P69', **{'pass':'P69'}, domain='survive', parentCommit='764ba74e7650b3f744899636cfabc2683c960bfe', checkedAt=datetime.now(timezone.utc).isoformat(), generationCalls=3, generatedOutputs=3, selectedOutputs=3, rejectedOutputs=0, archivedOutputs=0, refusals=[], blockedRequests=[], assets=assets, archives=[], referenceFiles=refs, openCandidates=[
    dict(id='survive-air-shock-cannon', status='new_static_candidate_not_scope_closed', reason='New source220401_10 supports the visible front; back, active states and geometric qualification remain open.'),
    dict(id='survive-large-spike-barricade', status='open_no_image_generated', reason='Central support is still obscured by the avatar in screenshot220401_11.'),
    dict(id='survive-mortar-emplacement', status='open_no_image_generated', reason='Published official screenshot still hides support behind the operator.'),
    dict(id='survive-frost-shock-traps', status='open_no_image_generated', reason='Retrieved defense screenshots only identify Oil and Flame traps; distinct Frost and Shock geometry unconfirmed.'),
    dict(id='survive-onehand-example', status='open_no_image_generated', reason='Native blade screenshot classifies the weapon class but exact individual weapon identity not established.'),
    dict(id='survive-silver-scarf-avatars', status='open_no_image_generated', reason='Official promotional thumbnails viewed but insufficient individual surface detail; no bodies invented.'),
], integrationNote='Three static reference-grounded candidates only. Existing selections, history rows, code and central bible/Atlas files untouched by this agent. Native outputs are 1086x1448,1555x1012,2172x724, not native UHD. Root owns final validation and publication.')
(HERE/'handoff.json').write_text(json.dumps(handoff, ensure_ascii=False, indent=2)+'\n')
print(json.dumps({'selected':len(assets),'selectedBytes':sum(a['bytes'] for a in assets),'referenceFiles':len(refs),'referenceBytes':sum(r['bytes'] for r in refs),'paths':[a['path'] for a in assets]}, ensure_ascii=False))
