from pathlib import Path
from datetime import datetime, timezone
import hashlib
import json
from PIL import Image

R = Path('/workspace/cqc-game-working/cqc-versus-v056')
OUT = Path('/workspace/cqc-next-stage-animation-audit/references-review')
IDS = ('outer_heaven', 'zanzibar', 'arsenal_corridor')

def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def pinned(path, role, physically_viewed=False, expected=None, notes=None):
    record = {'path': str(path), 'relativeToR': str(path.relative_to(R)),
              'bytes': path.stat().st_size, 'sha256': sha(path), 'role': role,
              'physicallyViewed': physically_viewed}
    if expected:
        record['declaredSha256'] = expected
        record['declaredSha256Matches'] = record['sha256'] == expected
        assert record['declaredSha256Matches'], path
    if path.suffix.lower() in ('.png', '.jpg', '.jpeg', '.gif'):
        with Image.open(path) as image:
            record['width'], record['height'] = image.size
            record['mode'] = image.mode
    if notes:
        record['notes'] = notes
    return record

catalog_path = R / 'data/stage-layer-catalog-reprise.json'
catalog_bytes = catalog_path.read_bytes()
catalog_sha = hashlib.sha256(catalog_bytes).hexdigest()
catalog = json.loads(catalog_bytes)
stages = {stage['id']: stage for stage in catalog['stages'] if stage['id'] in IDS}
assert len(stages) == 3
physical = []
metadata = [pinned(catalog_path, 'authoritative_current_stage_catalog')]
records = []

base_exclusions = [
    'Aucune météo : pas de pluie, neige, poussière dérivante, fumée, feu ou étincelles ambiantes.',
    'Aucune végétation ou machine tournante ajoutée ; aucune lame ou grille déplacée.',
    'Architecture, sol, joints, colonnes et plateformes immobiles ; conserver leurs ancrages et parallaxes.',
    'Aucun personnage, robot, arme, projectile ou texte HUD peint ou animé dans le décor.',
    'Ne pas convertir les anciens legacyVisualDefinition.weather en preuve canonique : le catalogue courant désactive la météo.',
]

for sid in IDS:
    stage = stages[sid]
    refs = []
    for ref in stage['references']:
        path = R / ref['file']
        pin = pinned(path, 'original_game_capture', True, ref['sha256'])
        pin.update({'url': ref['url'], 'source': ref['source'],
                    'incarnation': ref['incarnation'], 'sourceType': ref['sourceType'],
                    'provesTemporalAnimation': False})
        refs.append(pin)
        physical.append(pin)
    master = pinned(R / stage['master']['file'], 'accepted_generated_master', True,
                    stage['master']['sha256'])
    architecture = next(layer for layer in stage['layers'] if layer['id'] == 'architecture')
    arch_pin = pinned(R / architecture['file'], 'accepted_generated_architecture_layer',
                      True, architecture['sha256'])
    physical.extend([master, arch_pin])
    manifest = pinned(R / f'preparation/stage-layers-reprise/generated-history/{sid}/APPROVED_MANIFEST.json',
                      'historical_generation_approval_manifest')
    metadata.append(manifest)
    records.append({
        'id': sid, 'targetIncarnation': stage['incarnation'],
        'catalogReviewStatus': stage['review']['status'],
        'absolute1to1Certified': False,
        'references': refs, 'reviewedMaster': master, 'reviewedArchitecture': arch_pin,
        'anchorLayer': {'id': architecture['id'], 'file': architecture['file'],
                        'sha256': architecture['sha256'], 'width': architecture['width'],
                        'height': architecture['height'], 'phase': architecture['phase'],
                        'parallax': architecture['parallax'], 'rect': architecture['rect']},
        'currentWeather': stage['weather'], 'doNotAnimate': list(base_exclusions),
        'sourceEvidence': {}, 'minimalProposal': {}, 'limits': [],
    })

byid = {record['id']: record for record in records}
byid['outer_heaven']['sourceEvidence'] = {
    'originalObserved': 'Salle TX-55 MSX2 : renforts trapézoïdaux, mur horizontal gris, plaques olive et quatre coffrets striés. Chaque coffret possède un petit centre rouge visible.',
    'generatedObserved': 'Les quatre coffrets et leurs centres rouges sont conservés dans le master et dans le plan architecture ; le robot TX-55 est volontairement absent.',
    'temporalEvidence': 'Une capture de jeu fixe : existence et couleur des centres rouges établies, clignotement ou rythme non établi.',
    'lightInterpretation': 'Un indicateur électrique est une lecture plausible de ces centres, mais aucune fonction de machine ou séquence lumineuse précise n’est prouvée.',
}
byid['outer_heaven']['minimalProposal'] = {
    'status': 'closest_supported_authored_animation',
    'description': 'Faire varier très légèrement la luminance des quatre centres rouges existants ; aucun déplacement, aucune extinction ou nouvelle couronne lumineuse.',
    'type': 'existing_colored_marks_luminance', 'sourceLayer': 'architecture',
    'sourcePixelRegions': [
        {'x': 145, 'y': 358, 'width': 10, 'height': 4},
        {'x': 1516, 'y': 358, 'width': 9, 'height': 5},
        {'x': 145, 'y': 461, 'width': 10, 'height': 6},
        {'x': 1516, 'y': 462, 'width': 10, 'height': 4},
    ],
    'regionBasis': 'Composantes opaques rouges du PNG courant, puis contrôle visuel du plan.',
    'suggestedMaximumLuminanceVariationFraction': 0.02,
    'suggestedPeriodSeconds': [7.0, 9.0], 'fullOffAllowed': False,
    'newGlowOutsideExistingPixelsAllowed': False, 'sourceCanonicalTiming': False,
}
byid['outer_heaven']['doNotAnimate'].extend([
    'Coffrets striés fixes : leurs barres ne prouvent pas des pales de ventilateur visibles.',
    'Ne pas réintroduire le TX-55, ses tirs ou son explosion dans cette adaptation de salle vide.',
])
byid['outer_heaven']['limits'] = [
    'Le jeu source est vu de dessus ; la scène générée est une adaptation frontale et ses tailles ne sont pas certifiées au pixel près.',
    'Le rythme proposé est une animation d’auteur au plus proche, jamais une animation MSX2 1:1 prouvée.',
]

byid['zanzibar']['sourceEvidence'] = {
    'originalObserved': 'Salle MSX2 éclairée après destruction de Metal Gear D : mur vert strié, petits traits ocre et sol teal quadrillé. Les panneaux et le sol sont fixes dans la capture.',
    'originalOchreMarks': {'imageWidth': 544, 'imageHeight': 480,
        'clusters': [{'xMin': 84, 'xMax': 105}, {'xMin': 148, 'xMax': 169},
                     {'xMin': 212, 'xMax': 233}, {'xMin': 276, 'xMax': 297}],
        'yMin': 68, 'yMax': 69,
        'note': 'Quatre groupes identifiés dans le mur original, hors panneaux HUD à droite.'},
    'generatedObserved': 'Le master et le plan architecture ont huit panneaux et huit groupes ocre : répétition déjà adaptée au combat latéral.',
    'temporalEvidence': 'Aucune séquence d’animation de ces marques n’est établie par les deux captures conservées.',
    'lightInterpretation': 'La nature lumineuse, électrique ou décorative des marques ocre reste indéterminée.',
}
byid['zanzibar']['minimalProposal'] = {
    'status': 'static_is_highest_fidelity_optional_weak_adaptation',
    'preferredDescription': 'Conserver la scène fixe avec sa parallaxe actuelle tant que le comportement temporel des marques ocre n’est pas documenté.',
    'ifAmbientMotionIsRequired': 'Varier seulement la luminance des marques ocre de quatre panneaux centraux déjà peints. Décrire cela comme modulation de marques ocre, jamais comme des voyants canoniques.',
    'type': 'optional_existing_colored_marks_luminance', 'sourceLayer': 'architecture',
    'sourcePixelRegions': [
        {'x': 544, 'y': 154, 'width': 57, 'height': 7},
        {'x': 735, 'y': 154, 'width': 56, 'height': 7},
        {'x': 924, 'y': 154, 'width': 55, 'height': 7},
        {'x': 1111, 'y': 154, 'width': 58, 'height': 7},
    ],
    'regionBasis': 'Quatre groupes centraux existants sur les huit groupes du PNG ; moduler les pixels ocre seulement, pas tout le rectangle ni les lamelles vertes.',
    'suggestedMaximumLuminanceVariationFraction': 0.01,
    'suggestedPeriodSeconds': [8.0, 10.0], 'fullOffAllowed': False,
    'newGlowOutsideExistingPixelsAllowed': False, 'sourceCanonicalTiming': False,
}
byid['zanzibar']['doNotAnimate'].extend([
    'Ne pas faire tourner, glisser ou battre les lamelles vertes : leur rôle mécanique n’est pas établi.',
    'Ne pas animer le bleu de l’inventaire HUD de la capture comme s’il s’agissait d’un écran du hangar.',
    'Ne pas réintroduire Metal Gear D, son arme, son explosion ou des débris dans la variante vide après destruction.',
])
byid['zanzibar']['limits'] = [
    'L’animation ocre optionnelle a une preuve plus faible que les lampes cyan d’Arsenal ; le choix statique est le plus conservateur.',
    'La répétition et la perspective du mur généré sont déjà des adaptations. Les huit groupes ocre du PNG ne doivent pas être décrits comme huit indicateurs identiques certifiés dans la source.',
    'La capture avant destruction montre une autre phase sombre et un robot actif ; elle ne prouve pas une alternance lumineuse ambiante de la variante après destruction.',
]

byid['arsenal_corridor']['sourceEvidence'] = {
    'originalObserved': 'Capture de combat Snake/Raiden/Tengu : colonnes gris-vert à bases trapézoïdales, coffrets mécaniques, grandes plaques au sol et lampes cyan fixes visibles sur les colonnes.',
    'generatedObserved': 'Quatre petites lampes cyan et leurs halos de proximité sont déjà peints sur les colonnes du master et du plan architecture.',
    'temporalEvidence': 'La capture fixe établit les luminaires cyan ; elle ne prouve ni scintillement, ni panne électrique, ni fréquence de pulsation.',
    'sourceEdition': 'Le catalogue courant réattribue explicitement cette capture à MGS2 Substance PC2003, selon Update1 du playthrough. La cible est l’environnement PS2 partagé ; textures et effets PS2 ne sont pas certifiés par cette référence.',
    'sourceEditionEvidenceUrl': 'https://lparchive.org/Metal-Gear-Solid-2-(Screenshot)/Update%201/',
    'historicalMetadataCaution': 'Le APPROVED_MANIFEST.json historique dit encore PS2. Il est conservé comme trace historique ; le catalogue courant corrigé est l’autorité pour l’édition source.',
}
byid['arsenal_corridor']['minimalProposal'] = {
    'status': 'closest_supported_authored_animation',
    'description': 'Moduler faiblement la luminance des quatre lampes cyan existantes, sans flash, extinction, faisceau ni nouvelle lumière au sol.',
    'type': 'existing_luminaire_luminance', 'sourceLayer': 'architecture',
    'sourcePixelRegions': [
        {'x': 258, 'y': 31, 'width': 32, 'height': 19},
        {'x': 480, 'y': 62, 'width': 21, 'height': 10},
        {'x': 1170, 'y': 62, 'width': 22, 'height': 10},
        {'x': 1380, 'y': 35, 'width': 33, 'height': 14},
    ],
    'regionBasis': 'Petits tubes et pixels cyan existants, composantes de forte luminance regroupées par luminaire. Le halo déjà peint peut rester fixe ; aucune extension hors de la zone native.',
    'suggestedMaximumLuminanceVariationFraction': 0.03,
    'suggestedPeriodSeconds': [6.0, 8.0], 'fullOffAllowed': False,
    'newGlowOutsideExistingPixelsAllowed': False, 'sourceCanonicalTiming': False,
}
byid['arsenal_corridor']['doNotAnimate'].extend([
    'Les flashes de tirs visibles dans la capture appartiennent au combat, pas à l’éclairage ambiant.',
    'Les taches de sang et personnages de la capture ne doivent pas être réintroduits dans le décor vide.',
    'Aucun câble ondulant, ventilateur visible, émission de vapeur ou éclairage d’alarme rouge n’est établi.',
    'Ne pas remplacer ce couloir par l’arène circulaire Ascending Colon ; le nom Jejunum reste non certifié.',
])
byid['arsenal_corridor']['limits'] = [
    'Rythme choisi par adaptation, pas de preuve d’une animation PS2 1:1.',
    'La référence conservée est PC2003. L’animation ne doit pas masquer cette limite d’édition.',
]

supplement_dir = R / 'preparation/reprise-pass2-provenance/cqc-stage-canonical-references'
provenance_path = supplement_dir / 'cqc-stage-msx-arsenal-more-images-provenance.json'
provenance = json.loads(provenance_path.read_text())
metadata.append(pinned(provenance_path, 'preserved_reference_download_provenance'))
supplements = []
for name, observation, decision in [
    ('mgs2_100_cda.jpg', 'Vue d’une autre partie du complexe et d’un engin suspendu ; ne montre pas les quatre luminaires du couloir.', 'excluded_as_temporal_or_machine_animation_evidence'),
    ('mgs2_138_177.jpg', 'Écran de conversation Codec ; aucune preuve d’une animation du décor du couloir.', 'excluded_as_stage_animation_evidence'),
]:
    source_record = next(item for item in provenance if item.get('stage_id') == 'arsenal_corridor' and item['path'].endswith('/' + name))
    pin = pinned(supplement_dir / 'arsenal_corridor' / name, 'preserved_related_game_capture', True,
                 source_record['sha256'], observation)
    pin.update({'url': source_record['url'], 'useDecision': decision,
                'sourceEdition': 'same LPArchive playthrough, PC2003 Substance per current catalog qualification'})
    supplements.append(pin)
    physical.append(pin)

report = {
    'schema': 'cqc-existing-stage-reference-animation-review-v1',
    'createdAt': datetime.now(timezone.utc).isoformat(),
    'author': '/root/pass7_disk_preservation/existing_stage_reference_review',
    'status': 'read_only_reference_review_completed',
    'scope': list(IDS), 'rRoot': str(R), 'ownedOutputRoot': str(OUT),
    'downloads': {'count': 0, 'bytes': 0, 'failedRequests': []},
    'productionMutations': False, 'pngPixelMutations': False,
    'physicallyViewedImageCount': len(physical),
    'absolute1to1Certified': False,
    'policy': 'Les captures fixes prouvent seulement les objets et couleurs visibles. Les tempos proposés sont des adaptations autorisées au plus proche et ne constituent pas une certification temporelle 1:1.',
    'catalogPin': metadata[0], 'metadataInputs': metadata,
    'stageReviews': records, 'relatedCapturesViewedAndExcluded': supplements,
    'coordinateContract': {
        'regionsUnit': 'native architecture PNG source pixels',
        'transform': 'worldX = layer.rect.x + sourceX * layer.rect.width / layer.width ; worldY = layer.rect.y + sourceY * layer.rect.height / layer.height. Apply the same camera, zoom and architecture.parallax as the original layer.',
        'movement': 'No layer translation, rotation, deformation or collision change.',
        'preservation': 'Keep all source PNG bytes, references, historic manifests and catalog layer geometry unchanged. Runtime luminance modulation only.',
        'motionPreference': 'Disable authored ambient modulation for reduced motion or an explicit static fidelity mode; leave camera parallax behavior under the existing game contract.',
    },
    'suggestedBrowserChecks': [
        'Same cropped lamp/mark anchors at camera0 and ±220, zoom0.78 and1.08; no ghost lights detached from architecture.',
        'Frames at minimum and maximum modulation show no full-screen brightness change, weather, displaced panels or added light outside the existing regions.',
        'Source PNG SHA256 and original layer rect/parallax values remain identical before/after integration.',
        'Reduced motion / static option gives the exact existing scene. No effect on fighter, HUD, health, collision or groundY568.',
    ],
    'catalogStableAcrossReportWrite': None,
}

OUT.mkdir(parents=True, exist_ok=True)
snapshot_path = OUT / 'REVIEWED_STAGE_RECORDS.json'
snapshot_path.write_text(json.dumps({'sourceCatalogSha256': catalog_sha,
                                    'stages': [stages[sid] for sid in IDS]},
                                   ensure_ascii=False, indent=2) + '\n')
report['reviewedStageSnapshot'] = {'path': str(snapshot_path), 'sha256': sha(snapshot_path)}
report['catalogStableAcrossReportWrite'] = sha(catalog_path) == catalog_sha
assert report['catalogStableAcrossReportWrite']
report_path = OUT / 'EXISTING_STAGE_REFERENCE_ANIMATION_REVIEW.json'
report_path.write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n')

md = '''# Références et animation minimale de trois stages

Revue en lecture seule de 12 images conservées : quatre captures inscrites au catalogue, trois masters générés, trois plans architecture et deux captures connexes écartées. Aucun téléchargement, aucune génération et aucune modification de R, S, des PNG ou de Git.

| Stage | Preuve visible | Proposition minimale | Limite |
|---|---|---|---|
| Outer Heaven, MG1987 MSX2 | Quatre centres rouges sur les coffrets striés, dans le jeu original et l’architecture générée | Modulation locale de luminance ≤2%, lente7–9s, sans déplacement ni extinction | Fonction/rythme original non prouvés par la capture fixe ; animation d’auteur `closest_supported` |
| Zanzibar, MG2 1990 MSX2 après destruction | Quatre groupes de traits ocre dans le mur original ; huit groupes dans le décor adapté | Scène statique recommandée. Si une animation ambiante est nécessaire : moduler les seuls traits ocre de quatre groupes centraux ≤1%,8–10s | Nature lumineuse indéterminée ; ne pas appeler ces marques des voyants canoniques |
| Arsenal Corridor, cible MGS2 PS2 | Lampes cyan sur les colonnes visibles dans la capture et quatre lampes dans l’architecture générée | Modulation locale des lampes ≤3%,6–8s ; aucune panne, alarme ou nouveau faisceau | Référence conservée PC2003 Substance, effets PS2 et rythme temporel non certifiés |

Les trois scènes sont intérieures. Les références ne justifient aucune météo, fumée, poussière, étincelle, végétation ou ventilation en mouvement. Les lamelles vertes de Zanzibar et les grilles des coffrets d’Outer Heaven ne prouvent pas des pales animables. Les flashes de tir d’Arsenal sont des événements de combat.

Le catalogue courant désactive déjà la météo pour ces trois stages. Les anciennes valeurs `dust`/`sparks` dans `legacyVisualDefinition` sont historiques et ne prouvent aucun effet canonique. Le manifeste historique `APPROVED_MANIFEST.json` d’Arsenal dit encore PS2 ; le catalogue corrigé attribue la capture au port PC2003. Cette limite doit rester explicite.

Les rectangles du rapport JSON sont exprimés dans les pixels natifs du plan **architecture**. Toute modulation doit utiliser son rectangle, sa caméra et sa parallaxe0.12. Les pixels sources restent immuables ; aucun mouvement des panneaux, du sol ou des bâtiments. Conserver les centres colorés, sans dessiner une nouvelle lueur autour.

La fidélité1:1 temporelle n’est certifiée pour aucun des trois. Une capture fixe établit les éléments visibles, pas leur évolution. La variation lente proposée est une adaptation au plus proche. Le choix statique reste le plus fidèle pour Zanzibar tant qu’une source temporelle manque.

Le JSON contient les chemins, SHA256, dimensions, observations visuelles, exclusions et qualifications de chaque source. Les quatre captures principales, trois masters et trois plans architecture correspondent exactement à leurs SHA256 déclarés dans le catalogue. Deux images connexes d’Arsenal ont été réellement vues puis écartées : une autre salle avec engin suspendu et un écran Codec ne constituent pas des preuves de l’animation du couloir.
'''
md_path = OUT / 'EXISTING_STAGE_REFERENCE_ANIMATION_REVIEW.md'
md_path.write_text(md)
receipt = {'report': str(report_path), 'sha256': sha(report_path),
           'markdown': str(md_path), 'markdownSha256': sha(md_path),
           'snapshot': str(snapshot_path), 'snapshotSha256': sha(snapshot_path),
           'catalogSha256': catalog_sha, 'physicallyViewedImageCount': len(physical),
           'declaredImageHashesVerified': 12, 'catalogDeclaredImageHashesVerified': 10,
           'preservedSupplementHashesVerified': 2, 'catalogStableAcrossReportWrite': True,
           'downloads': 0, 'productionMutations': False}
(OUT / 'DELIVERY.json').write_text(json.dumps(receipt, indent=2) + '\n')
print(json.dumps(receipt, indent=2))
