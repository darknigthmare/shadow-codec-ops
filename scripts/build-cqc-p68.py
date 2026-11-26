#!/usr/bin/env python3
"""Build the reviewed P68 source extension from immutable P67 snapshots.

Usage: python scripts/build-cqc-p68.py --baseline-dir /path/to/p67 --pins /path/to/pins.json
Writes only P68 documents, additive shared-bible sections, the Atlas catalogue
and its runtime ledger. Never modifies historical registries or image pixels.
"""
from __future__ import annotations

import argparse
import copy
import hashlib
import json
from collections import Counter
from pathlib import Path
import subprocess

P67 = '0a92d18aa7bb4068f0be0265bf01d884e3404e95'
RECOVERY = '97b19718581154374ecb8bbb299540fd4c8b0322'
BRANCH = 'codex/cqc-p61-missing-static-sources-20261125'
WEB = 'https://github.com/darknigthmare/shadow-codec-ops/blob/' + BRANCH + '/'
PASS = 'docs/cqc-reprise/pass68/'
BIBLE = 'docs/cqc-bible/'
ATLAS = 'public/cqc/data/cqc-p63-source-atlas.json'
RUNTIME = 'public/cqc/runtime-manifest.json'
EXPECTED = {
    'classic-mg1-msx-guard-dog-side': '552b164d66e387ef8ecf7dd499f317a1dea4fc2645e90ccec1e0132bffca702a',
    'classic-mg1-nes-guard-dog-side': 'f55c32c07df48be89468fc1edea07a7292203868edd17af3722043584a9504bd',
    'classic-mg1-nes-jetpack-guard': 'a66b15d776dae733d6ce3ddaa33e3ac5977a4ebfa8b6f7cef09f2955c4aecffe',
    'classic-mg1-msx-red-guard': '5a977ced18f3b43233ab6e310127e9530a84a216d90edfe849bb736da5015a5f',
    'survive-balloon-trap': '665ea5e6f9b46ac7985943738ba6b184d9fde13181b4fb711d27e86c723b17da',
    'survive-balloon-trap-v2-alpha-attempt': '961073e92fb748d66af3abe433a9a594312bd78d70c6a1d03811ac2436fd9dfb',
}
FALSE_FLAGS = ['runtimeIntegrated', 'combatReady', 'combatRuntimeIntegrated',
               'absolute1to1Certified', 'referenceGeometryValidated', 'nativePixelExact',
               'nativeUhd', 'scopeClosed']


def blob_sha(data: bytes) -> str:
    return hashlib.sha1(b'blob ' + str(len(data)).encode() + b'\0' + data).hexdigest()


def write_json(root: Path, name: str, data: object) -> None:
    write_text(root, name, json.dumps(data, ensure_ascii=False, indent=2) + '\n')


def write_text(root: Path, name: str, text: str) -> None:
    p = root / name
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(text, encoding='utf-8')


def append_section(root: Path, name: str, text: str) -> None:
    p = root / BIBLE / name
    old = p.read_text(encoding='utf-8')
    start, end = '<!-- BEGIN:P68 -->', '<!-- END:P68 -->'
    block = start + '\n' + text.strip() + '\n' + end
    if start in old:
        left, remainder = old.split(start, 1)
        assert end in remainder, 'Incomplete P68 section in ' + name
        _, right = remainder.split(end, 1)
        result = left + block + right
    else:
        result = old + '\n\n' + block + '\n'
    p.write_text(result, encoding='utf-8')


def production_plan(asset: dict) -> dict:
    key = asset['id']
    common = {
        'status': 'documented_future_work_not_generated_or_implemented',
        'classification': 'proposition_CQC_a_valider_par_references_natives',
        'framesGeneratedByP68': 1, 'animationClipsGeneratedByP68': 0,
        'frameTimings': 'À mesurer sur les références puis équilibrer dans CQC ; aucun nombre de frames canonique inventé.',
        'camera': 'La source conserve sa vue native. Une éventuelle vue latérale CQC demande des références et des sprites séparés.',
        'acceptance': ['Comparer incarnation, silhouette et palette à la bonne édition.',
                       'Définir ancrage, échelle, volumes et transitions sans les déduire de la marge transparente.',
                       'Vérifier retour au contrôle, réaction à la pause, KO et fin de manche avant toute admission.'],
    }
    if 'guard-dog' in key:
        edition = 'MSX2' if asset['episodeKey'] == 'mg_msx' else 'NES'
        common.update({
            'role': 'Ennemi quadrupède de référence ' + edition + ' ; aucun combattant humain ou compagnon ajouté au roster.',
            'states': [
                {'name': 'Attente et observation', 'description': 'Stabiliser les quatre appuis, conserver le dos et la queue de la variante ; tout mouvement de tête exige une frame native ou une adaptation clairement identifiée.'},
                {'name': 'Déplacement', 'description': 'Décomposer appui, poussée, passage des membres et retour à la pose initiale. Les pattes proches et éloignées doivent rester identifiables ; ne pas dupliquer le PNG fixe pour prétendre livrer un cycle.'},
                {'name': 'Alerte et approche', 'description': 'Préparer une transition lisible entre locomotion et orientation vers la cible. La portée de détection, le temps de réaction et le changement de direction sont des paramètres CQC encore non implémentés.'},
                {'name': 'Contact, récupération et sortie', 'description': 'Si une attaque de contact est retenue après qualification native, séparer préparation, contact et récupération. Prévoir réaction à impact, interruption et sortie de scène ; aucune nouvelle morsure ou neutralisation produite ici.'},
            ],
            'interactions': ['Mesurer séparément le volume bas de la créature et les collisions du terrain ; ne pas appliquer une capsule humaine par défaut.',
                             'Établir le contre-jeu et la compatibilité des projections/neutralisations avec une petite cible avant de l’utiliser dans un duel.',
                             'Conserver les deux éditions et leurs palettes, sans échange automatique de cycles entre MSX2 et NES.'],
            'separateAssetsNeeded': ['Frames natives complémentaires', 'Vues latérales CQC si retenues', 'Cycle de déplacement', 'Réactions et états de sortie', 'Sons et effets éventuels séparés'],
        })
    elif 'jetpack' in key:
        common.update({
            'role': 'Variante ennemie NES à appareil dorsal ; la frame fixe ne prouve pas un kit aérien complet.',
            'states': [
                {'name': 'Pose de référence', 'description': 'Conserver l’axe du corps, les pieds et les deux grandes formes supérieures de l’équipement ; fixer l’ancrage du personnage et celui du dispositif séparément.'},
                {'name': 'Déplacement au sol', 'description': 'Décomposer départ, appuis et arrêt uniquement après observation de frames du même ennemi. Éviter la copie des animations du garde standard.'},
                {'name': 'Transition aérienne à qualifier', 'description': 'Rechercher une séquence native pour départ, déplacement aérien et retour au sol. Les variations d’altitude, flammes et fumées restent des besoins conditionnels, pas des capacités déclarées par ce PNG.'},
                {'name': 'Réaction et interruption', 'description': 'Documenter séparément réaction au sol, interruption d’une transition et reprise stable. Les poses intermédiaires et éventuels morceaux détachés ne sont pas fournis.'},
            ],
            'interactions': ['Définir limites d’altitude et interaction avec plateformes uniquement après validation de la séquence source.',
                             'Séparer masse du corps, accessoire dorsal et éventuels effets ; aucune hitbox ni invulnérabilité déduite de l’appareil.',
                             'Qualifier les armes visibles avant d’ajouter tir, projectile ou rechargement.'],
            'separateAssetsNeeded': ['Vues natives complémentaires', 'Frames de déplacement', 'États aériens si attestés', 'Réactions', 'VFX et projectiles qualifiés séparément'],
        })
    elif 'red-guard' in key:
        common.update({
            'role': 'Une variante de garde MSX2 ; la couleur ne crée pas une classe ou un équipement universel.',
            'states': [
                {'name': 'Garde de référence', 'description': 'Relever l’orientation, la position des mains et la silhouette sombre de l’équipement. Conserver l’asymétrie et la palette rouge propre à la frame.'},
                {'name': 'Patrouille et arrêt', 'description': 'Décomposer appui gauche, passage, appui droit et retour sans glissement des pieds ; la chronologie doit venir des frames natives de cette variante.'},
                {'name': 'Détection et action', 'description': 'Séparer pivot, préparation et récupération. La nature de l’arme et du tir doit être qualifiée avant de produire recul, flash ou projectile.'},
                {'name': 'Impact et sortie', 'description': 'Prévoir réaction courte, interruption et état final adaptés à CQC ; les poses de neutralisation et de fin de manche sont à produire et à valider, sans être attribuées automatiquement au jeu MSX2.'},
            ],
            'interactions': ['Mesurer le volume corporel et la portée de contact indépendamment de l’image agrandie.',
                             'Vérifier la garde, les projections et la lisibilité de la préparation contre petite et grande cible avant admission.',
                             'Ne pas transformer une variation de palette en bonus de dégâts, rang ou IA sans preuve ou décision de conception explicite.'],
            'separateAssetsNeeded': ['Patrouille et pivots', 'Actions avec arme qualifiée', 'Réactions et neutralisations', 'Vues opposées vérifiées', 'Projectiles et VFX séparés'],
        })
    else:
        common.update({
            'role': 'Accessoire Survive déployé inactif ; aucun ballon gonflé, câble ou ennemi capturé livré.',
            'states': [
                {'name': 'Pose et armement', 'description': 'Définir une pose au sol avec toutes les extrémités dans une zone de support valide. Séparer apparition/installation et état armé ; la séquence et sa durée restent à documenter.'},
                {'name': 'Attente déployée', 'description': 'Utiliser la source fixe comme référence du boîtier et des supports. Toute animation de témoin, vibration ou signal sonore doit être sourcée ou marquée comme adaptation CQC.'},
                {'name': 'Déclenchement et capture à confirmer', 'description': 'Obtenir les vues natives du mécanisme avant de produire ouverture, ballon, câble, attache et éventuelle élévation. Chaque élément doit être un asset distinct, avec ancrage et occlusion propres.'},
                {'name': 'Interruption, expiration et retrait', 'description': 'Prévoir libération de la cible, retour à un état contrôlable et retrait du piège aux transitions de manche. Les règles d’immunité, destruction et récupération restent des choix non implémentés.'},
            ],
            'interactions': ['Définir placement, espace requis et compatibilité avec les plateformes ; aucune pose flottante ou support traversant le terrain.',
                             'Établir une matrice de cibles compatibles par taille, morphologie et état ; ne pas supposer qu’une machine géante peut être capturée.',
                             'Prévoir anticipation et contre-jeu lisibles, pause, KO simultané et fin de manche sans cible suspendue hors état.',
                             'Conserver le piège distinct du Mortar ennemi, de son projectile et de l’Air Shock Cannon.'],
            'separateAssetsNeeded': ['Vue dégagée des supports', 'Vue arrière', 'Ballon et câble natifs', 'Déclenchement et retour', 'VFX/SFX et collisions'],
        })
    return common


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument('--baseline-dir', required=True, type=Path)
    parser.add_argument('--pins', required=True, type=Path)
    args = parser.parse_args()
    root, baseline = args.root.resolve(), args.baseline_dir.resolve()
    pins = json.loads(args.pins.read_text())
    old = {}
    for name, expected in pins.items():
        raw = (baseline / name).read_bytes()
        assert blob_sha(raw) == expected, 'Untrusted baseline: ' + name
        old[name] = json.loads(raw)
        if name.startswith(BIBLE):
            assert (root / name).read_bytes() == raw, 'Historical registry modified: ' + name
    previous = old[BIBLE + 'asset-associations-p67.json']
    base_atlas, base_runtime = old[ATLAS], old[RUNTIME]
    assert len(base_atlas['assets']) == 77
    classic = json.loads((root / PASS / 'research/classic/handoff.json').read_text())
    survive = json.loads((root / PASS / 'research/survive/handoff.json').read_text())
    selected = copy.deepcopy(classic['assets'] + survive['assets'])
    archives = copy.deepcopy(classic['archives'] + survive['archives'])
    assert len(selected) == 5 and len(archives) == 1
    assert not classic.get('blockedRequests') and not survive['refusals']
    for item in selected + archives:
        raw = (root / item['path']).read_bytes()
        sha = hashlib.sha256(raw).hexdigest()
        assert sha == EXPECTED[item['id']] == item['sha256'], 'Unreviewed image: ' + item['id']
        assert len(raw) == item['bytes'] and blob_sha(raw) == item['gitBlobSha']
        assert (root / item['generation']['promptFile']).read_text().rstrip() == item['generation']['exactPrompt'].rstrip()
        for flag in FALSE_FLAGS:
            item[flag] = False
        item['pass'] = item['passId'] = 'P68'
        item['sourceGenerated'] = True
        item['fidelityStatus'] = 'pending_external_review'
        item['atlasIntegrated'] = item['selected']
        item.setdefault('selectedVersion', 'v1' if item['selected'] else 'v2')
        item.setdefault('bodyCoverage', 'full_object')
        item.setdefault('edition', 'Metal Gear Survive — capture native PC/console, plateforme de capture non certifiée')
        item['reviewRecords'] = [PASS + 'reviewed-batch.json']
        if item['selected']:
            item['assetId'] = 'asset:p68:' + item['id']
            item['guideSections'] = ['02', '03', '04', '16', '17', '18', '25', '26', '27', '29'] if item['kind'] != 'prop' else ['02', '04', '05', '15', '16', '17', '18', '22', '25', '26', '27', '29']
            item['runtimeBinding'] = {'status': 'atlas_only', 'moduleKey': 'atlas63', 'catalogPath': ATLAS, 'admittedByThisPass': False}
            item['bibleURL'] = WEB + BIBLE + 'CONTINUATION_P68.md#' + item['id']
            item['blobURL'] = WEB + item['path']
            item['manifest'] = PASS + 'delivery-manifest.json'
            item['bibleDocuments'] = [BIBLE + n for n in ['CONTINUATION_P68.md', 'ASSOCIATIONS.md', 'COMBAT.md', 'FICHES_ET_VALIDATION.md']]
            item['promptRecord'] = PASS + 'prompt-index.json#' + item['id']
            item['productionPlan'] = production_plan(item)
            item['nextWork'] = 'Produire et valider les états décrits dans la fiche, depuis des vues natives complémentaires ; aucune admission au combat déduite de ce PNG.'

    review = {'schema': 'cqc.p68.reviewed-batch.v1', 'parentCommit': P67, 'reviewer': '/root', 'reviewComplete': True,
              'selected': [{k: x[k] for k in ['id', 'sha256', 'gitBlobSha']} for x in selected],
              'archives': [{k: x[k] for k in ['id', 'sha256', 'gitBlobSha']} for x in archives], 'blockedIds': [],
              'evidence': ['Root a inspecté les planches natives MSX2/NES et les deux planches de QA classiques sur fond clair/sombre.',
                           'Root a retenu Survive V1 après le diagnostic alpha et a classé V2 en archive.',
                           'Acceptation comme sources statiques bornées uniquement ; aucune certification 1:1 ni admission au combat.']}
    write_json(root, PASS + 'reviewed-batch.json', review)
    all_kinds = Counter(previous['counts']['allPassesByKind'])
    all_kinds.update(x['kind'] for x in selected)
    counts = {'selectedSources': 5, 'archivedAttempts': 1, 'generatedPNGs': 6, 'generationRequests': 6,
              'blockedRequests': 0, 'previousSelected': 254, 'totalSelected': 259,
              'previousArchivedAttempts': 19, 'totalArchivedAttempts': 20, 'atlasSources': 82,
              'editionCount': 3, 'byEpisode': dict(Counter(x['episodeKey'] for x in selected)),
              'byKind': dict(Counter(x['kind'] for x in selected)),
              'byBodyCoverage': dict(Counter(x['bodyCoverage'] for x in selected)),
              'allPassesByKind': dict(all_kinds), 'selectedBytes': sum(x['bytes'] for x in selected),
              'archivedBytes': sum(x['bytes'] for x in archives), 'combatAdmissions': 0,
              'absolute1to1Certifications': 0, 'newNarrativeImages': 0, 'closedScopes': 0}
    scopes = sorted({w for x in selected for w in x['workIds'] if w != 'character:R-MG1-03'})
    delivery = {'schema': 'cqc.p68.delivery.v1', 'asOf': '2026-11-26', 'parentCommit': P67,
                'publicationParent': RECOVERY, 'previousSelected': 254, 'counts': counts,
                'historicalRows': 277, 'historicalUnmatchedRows': 97,
                'historicalCountsMeaning': 'Statuts P61 conservés. Après P67 comme après P68, 76 des 97 lignes historiquement non résolues restent sans candidat sélectionné ; aucun groupe fermé.',
                'extensionScopes': scopes, 'historicalScopeUpdates': ['character:R-MG1-03'],
                'inherits': previous['inherits'] + [BIBLE + 'asset-associations-p67.json'],
                'interpretation': 'Cinq sources fixes consultables dans l’Atlas ; deux personnages, deux créatures et un accessoire. Aucune animation produite, admission au combat, certification pixel exacte, UHD native ou clôture de périmètre.',
                'requirementsGuide': BIBLE + 'guide-map.json', 'assets': selected,
                'archives': archives, 'blockedRequests': []}
    write_json(root, PASS + 'delivery-manifest.json', delivery)
    write_json(root, BIBLE + 'asset-associations-p68.json', dict(delivery, schema='cqc.bible.asset-associations-p68.v1'))
    prompt_rows = [{**{'id': x['id'], 'selected': x['selected'], 'path': x['path']}, **x['generation']} for x in selected + archives]
    write_json(root, PASS + 'prompt-index.json', {'schema': 'cqc.p68.prompt-index.v1', 'generationRequests': 6,
               'generatedOutputs': 6, 'selectedOutputs': 5, 'archiveOutputs': 1, 'blockedRequests': 0,
               'records': prompt_rows[:5], 'archiveRecords': prompt_rows[5:], 'blockedRecords': [],
               'interpretation': 'Six appels réels : quatre créations classiques et deux versions Survive. Les prompts sont conservés exactement ; aucun refus relancé.'})

    catalogue = copy.deepcopy(base_atlas)
    catalogue['sourcePass'] = base_atlas['sourcePass'] + '+P68'
    catalogue['asOf'] = '2026-11-26'
    catalogue['description'] = '82 dossiers de sources fixes P63–P68 ; images, édition, références et réserves. Les 77 dossiers antérieurs sont conservés sans modification.'
    fields = ['id', 'label', 'episodeKey', 'workIds', 'referenceURLs', 'scope', 'qaNotes', 'episode', 'edition',
              'bodyCoverage', 'kind', 'width', 'height', 'bitDepth', 'colorType', 'bytes', 'sha256', 'pass',
              'gitBlobSha', 'colorMode', 'sourceGenerated', 'selected', 'atlasIntegrated', *FALSE_FLAGS,
              'fidelityStatus', 'assetId', 'bibleURL', 'blobURL', 'alphaExtrema', 'transparentBackground', 'selectedVersion']
    for item in selected:
        row = {key: copy.deepcopy(item[key]) for key in fields}
        row['path'] = '../' + item['path'][len('public/cqc/'):]
        row['generation'] = {'tool': 'image_gen.imagegen', 'mode': item['generation']['mode'], 'promptId': item['id']}
        catalogue['assets'].append(row)
    assert catalogue['assets'][:77] == base_atlas['assets']
    write_json(root, ATLAS, catalogue)
    javascript = """import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
const [root,baseline]=process.argv.slice(1);
const {extendP63RuntimeManifest}=await import(pathToFileURL(path.join(root,'scripts/extend-cqc-p63-runtime.mjs')));
const base=JSON.parse(fs.readFileSync(path.join(baseline,'public/cqc/runtime-manifest.json')));
const delivery=JSON.parse(fs.readFileSync(path.join(root,'docs/cqc-reprise/pass68/delivery-manifest.json')));
const proposed=await extendP63RuntimeManifest(base,path.join(root,'public/cqc'),['data/cqc-p63-source-atlas.json',...delivery.assets.map(x=>x.path.slice('public/cqc/'.length))]);
fs.writeFileSync(path.join(root,'public/cqc/runtime-manifest.json'),JSON.stringify(proposed,null,2)+'\\n');
console.log(JSON.stringify({files:proposed.files.length,references:proposed.references.length,totalBytes:proposed.totalBytes,byteDelta:proposed.totalBytes-base.totalBytes,omittedReferences:proposed.omittedReferences.length,externalRoutes:proposed.externalReferences.entries.length}));"""
    result = subprocess.run(['node', '--input-type=module', '-e', javascript, str(root), str(baseline)], capture_output=True, text=True, check=True)
    runtime_summary = json.loads(result.stdout)
    write_json(root, PASS + 'integration-delta.json', {'schema': 'cqc.p68.integration-delta.v1', 'parentCommit': P67,
               'previousAtlas': 77, 'atlasSources': 82, 'selected': 5, 'selectedBytes': counts['selectedBytes'],
               'changedRuntimeOwners': ['data/cqc-p63-source-atlas.json'], 'runtime': runtime_summary,
               'scanner': 'extendP63RuntimeManifest with real discoverReferences scanner',
               'shellChanged': False, 'controllerChanged': False, 'combatAdmission': False})
    write_documents(root, selected, archives, counts, runtime_summary)
    for name in pins:
        if name.startswith(BIBLE):
            assert (root / name).read_bytes() == (baseline / name).read_bytes()
    print(json.dumps({'selected': 5, 'archives': 1, 'counts': counts, 'runtime': runtime_summary,
                      'reviewedBatchSHA256': hashlib.sha256((root / PASS / 'reviewed-batch.json').read_bytes()).hexdigest()}, ensure_ascii=False, indent=2))


def write_documents(root: Path, assets: list, archives: list, counts: dict, runtime: dict) -> None:
    summary = '**5 nouvelles sources sélectionnées, 1 essai archivé et 6 appels imagegen.** Le cumul atteint **259 sources sélectionnées**, **82 dossiers Atlas** et **20 archives**.'
    links = '[Galerie](../cqc-reprise/pass68/README.md) · [Associations](asset-associations-p68.json) · [Manifeste](../cqc-reprise/pass68/delivery-manifest.json) · [Manquants](../cqc-reprise/pass68/MANQUANTS.md) · [Contrôles](../cqc-reprise/pass68/INTEGRATION_QA.md)'
    continuation = ['# Continuation P68 — ennemis MSX2/NES et Balloon Trap Survive', '', '**26 novembre 2026.** ' + summary, '', links, '',
                    'Les deux chiens, le garde au jetpack NES et le garde rouge MSX2 suivent des frames natives de leurs éditions. Le Balloon Trap Survive suit une capture native attribuée par son libellé. Les reconstructions conservent des limites explicites : les pixels agrandis ne sont pas une extraction exacte et un support du piège est partiellement occulté. Les 77 dossiers Atlas P67 restent identiques et dans le même ordre.', '',
                    'Les plans d’animation et d’interaction ci-dessous décrivent le travail à réaliser dans le contexte du duel CQC. **Une seule image fixe est livrée par sujet ; aucune des séquences proposées n’est générée ou implémentée.** Les durées, volumes, règles et capacités demandent leurs preuves natives et leur validation de jeu.', '', '## Fiches individuelles', '']
    for item in assets:
        plan = item['productionPlan']
        continuation += ['<a id="' + item['id'] + '"></a>', '', '### ' + item['label'], '',
                         item['scope'], '', '| Champ | Valeur |', '|---|---|',
                         '| Identité | `' + item['assetId'] + '` |',
                         '| Type / édition | `' + item['kind'] + '` / `' + item['episodeKey'] + '` — ' + item['edition'] + ' |',
                         '| Fichier | [' + Path(item['path']).name + '](' + item['blobURL'] + ') |',
                         f"| Dimensions de sortie | {item['width']} × {item['height']}, RGBA, {item['bytes']:,} octets |",
                         '| SHA-256 | `' + item['sha256'] + '` |',
                         '| WorkIds | ' + ' ; '.join('`' + w + '`' for w in item['workIds']) + ' |',
                         '| Guide | ' + ', '.join(item['guideSections']) + ' — [rubriques et exigences](guide-map.json) |',
                         '| État réel | Source consultable dans l’Atlas ; combat et certification 1:1 non validés |', '',
                         '**Références et constats.**', '']
        continuation += ['- [Référence ' + str(i + 1) + '](' + url + ')' for i, url in enumerate(item['referenceURLs'])]
        continuation += ['', 'Les captures/frames utilisées sont archivées dans ' + ', '.join('[' + Path(p).name + '](../cqc-reprise/' + p.split('docs/cqc-reprise/', 1)[1] + ')' for p in item['referenceFiles']) + '.', '']
        continuation += ['- ' + note for note in item['qaNotes']]
        continuation += ['', '**Rôle et animation à produire.** ' + plan['role'], '',
                         '| État prévu | Description et vérification requise |', '|---|---|']
        continuation += ['| ' + s['name'] + ' | ' + s['description'] + ' |' for s in plan['states']]
        continuation += ['', '**Interactions à valider.**', ''] + ['- ' + x for x in plan['interactions']]
        continuation += ['', '**Assets encore nécessaires :** ' + ' ; '.join(plan['separateAssetsNeeded']) + '.', '',
                         plan['frameTimings'] + ' ' + plan['camera'], '']
    continuation += ['## Choix de version et conservation', '',
                     'Le Balloon Trap **V1** est retenu. Une correction alpha a produit V2, archivée : les grandes plages suspectées de halo dans V1 ont été mesurées à alpha nul, alors que V2 modifiait aussi les microtextures. Les faibles franges périphériques restent décrites dans le [diagnostic Survive](../cqc-reprise/pass68/research/survive/pixel-qa.json). Aucun nettoyage de pixels n’a été appliqué aux sorties brutes.', '',
                     'Les [53 fichiers locaux récupérés](../cqc-reprise/local-recovery-20261126/README.md) sont conservés dans une archive additive, publiée au commit `' + RECOVERY + '`. Cette récupération documentaire est distincte des cinq images P68. La base de comparaison des assets reste P67 (`' + P67 + '`).', '',
                     'Une réinitialisation de l’exécuteur a supprimé le premier dossier temporaire. Les sorties d’image brutes, les blobs déjà créés et les copies exactes des références publiées ont permis la reprise. Les chemins d’origine sont conservés comme provenance ; ils ne sont pas présentés comme des chemins encore accessibles.', '',
                     'Les familles restent ouvertes : R-MG1-03 avait déjà des candidats P67. Les quatre nouveaux classiques ajoutent des variantes à ce groupe ; le piège crée un périmètre d’extension. Le nombre de lignes historiques non résolues sans candidat reste **76**. Aucun décor, projectile, VFX, intro, épilogue ou nouveau kit complet n’est produit dans cette passe.', '']
    write_text(root, BIBLE + 'CONTINUATION_P68.md', '\n'.join(continuation))

    gallery = ['# P68 — livraison des cinq sources fixes', '', summary, '',
               '[Fiches et états à produire](../../cqc-bible/CONTINUATION_P68.md) · [Manifeste](delivery-manifest.json) · [Prompts](prompt-index.json) · [Manquants](MANQUANTS.md) · [QA](INTEGRATION_QA.md)', '',
               'Les fichiers sont des PNG individuels bruts, transparents et accompagnés de leurs références. Les éléments MSX2/NES conservent une esthétique pixel art native ; leur grille générée reste une reconstruction. Le gadget Survive conserve une réserve sur le support masqué et sur les détails interpolés.', '']
    for item in assets:
        gallery += ['## ' + item['label'], '', '![' + item['label'] + '](../../../' + item['path'] + ')', '',
                    f"**{item['width']} × {item['height']} · RGBA · {item['bytes']:,} octets · une image fixe**", '',
                    '[Références, limites et animation prévue](../../cqc-bible/CONTINUATION_P68.md#' + item['id'] + ').', '']
    gallery += ['## Archive et reprise des fichiers locaux', '',
                'Le [Balloon Trap V2](' + archives[0]['path'][len(PASS):] + ') est archivé et exclu de l’Atlas comme du runtime. Aucun refus de génération n’a eu lieu en P68.', '',
                'La [récupération locale de 53 fichiers](../local-recovery-20261126/README.md) est publiée séparément et vérifiée dans [recovery-publication-verification.json](recovery-publication-verification.json). Les archives, documents, sources antérieures et leurs statuts restent conservés.', '']
    write_text(root, PASS + 'README.md', '\n'.join(gallery))

    scope = {'schema': 'cqc.p68.scope-delta.v1', 'parentCommit': P67, 'historicalRows': 277,
             'historicallyUnresolvedP61': 97, 'unresolvedWithoutSelectedBefore': 76, 'unresolvedWithoutSelectedAfter': 76,
             'historicalRowsGainingFirstSelectedCandidate': 0, 'closedScopes': 0,
             'historicalScopeUpdates': [{'workId': 'character:R-MG1-03', 'before': 'partial_selected_candidates_in_P67',
                  'after': 'partial_with_four_additional_native_edition_variants', 'selectedIds': [a['id'] for a in assets if a['episodeKey'] in ['mg_msx', 'mg_nes']],
                  'scopeClosed': False, 'note': 'Les chiens et variantes restent une famille partielle ; les workIds de créature sont des sous-périmètres, pas de nouveaux combattants admis.'}],
             'extensionScopes': [{'workId': w, 'assetId': a['assetId'], 'scopeClosed': False} for a in assets for w in a['workIds'] if w != 'character:R-MG1-03'],
             'editionSourceCounts': {'mg_msx': {'before': 1, 'added': 2, 'after': 3}, 'mg_nes': {'before': 3, 'added': 2, 'after': 5}, 'survive': {'before': 19, 'added': 1, 'after': 20}},
             'interpretation': 'Présence de sources distincte de complétude. AC!D, AC!D 2, Rising et les autres éditions ne reçoivent aucun nouveau PNG P68.'}
    write_json(root, PASS + 'scope-delta.json', scope)
    missing = '''# P68 — manquants après la nouvelle série

Les cinq sources P68 ajoutent des variantes et un gadget ; elles ne ferment aucun groupe. Les **277 lignes historiques** et leurs **97 statuts non résolus de P61** sont conservés. Après P67 comme après P68, **76** de ces lignes restent sans candidat sélectionné. R-MG1-03 avait déjà un garde MSX2 et un garde NES ; le Balloon Trap est un périmètre d’extension.

| Édition touchée | Sources sélectionnées avant → après | Travail encore ouvert |
|---|---:|---|
| Metal Gear MSX2 | 1 → 3 | Autres palettes/poses des gardes et chiens, cycles et vues utiles ; qualification séparée du faux Madnar et du frère de Jennifer. |
| Metal Gear NES | 3 → 5 | Autres frames/ennemis, séquences réelles du jetpack, source des actions et équipements ; aucune couverture transférée depuis MSX2. |
| Survive | 19 → 20 | Référence dégagée des supports et du dos du Balloon Trap, états actifs, ballon/câble, interactions ; reste des avatars, machines et missions. |

## Priorités Survive, AC!D et Rising

- **Survive :** Air Shock Cannon encore masqué par le HUD ; Mortar déployé masqué par son opérateur ; projectile du Mortar ennemi non lisible ; Wormhole Transporter sans vue suffisante. La grande barricade de pieux demeure non générée faute de vue dégagée. Harley Warren et Joel Marton restent documentaires.
- **AC!D :** FAR B3F/B4F/B5F et Ruins restent des fragments, avec connexions, scènes et couches à compléter. Harold Burton ne reçoit pas de corps inventé.
- **AC!D 2 :** personnel SaintLogic, variantes de Prototype KODOQUE/Test Subjects et secteurs restants à qualifier. Les réserves de P66 sur Communications Tower/Terminal sont conservées.
- **Revengeance :** soldats humains R-00, arènes VR DLC et pièces/équipements encore ouverts. Les refus antérieurs du cyborg blindé, des grenades Fragmentation/EM et du Rocket Launcher ne sont pas relancés.

## Autres éditions

Le [tableau des 32 éditions P67](../pass67/MANQUANTS.md) reste la référence détaillée pour les éditions non touchées : TTS, MGS2, MGS3/Delta/3DS, MPO/Plus, Peace Walker, MGS4, GZ/TPP, Online, Mobile/Touch/Arcade/Social Ops et Ghost Babel. Un nom documentaire, un portrait ou un petit aperçu ne devient pas un corps complet. Le projet initial MGS Rising reste distinct de Revengeance.

Les plans des cinq [fiches P68](../../cqc-bible/CONTINUATION_P68.md) décrivent les états, interactions et assets à produire. **Aucun cycle, projectile, VFX, son, nouvelle arène ou illustration narrative n’a été livré par P68.** Les précédentes sources, archives, réserves et refus restent conservés.
'''
    write_text(root, PASS + 'MANQUANTS.md', missing)
    qa = f'''# P68 — intégration et limites de validation

## Résultat préparé

{summary}

Base des assets : P67 `{P67}`. Parent de publication prévu après récupération locale : `{RECOVERY}`. Le [contrat de revue indépendant](reviewed-batch.json) contient les identités des cinq sélections et de l’archive ; il reflète la revue du root, sans certification absolue de fidélité.

| Contrôle | État et portée |
|---|---|
| Sources/alpha | Six sorties PNG brutes conservées ; diagnostics dans les sous-dossiers classic et survive. |
| Registres P63–P67 | Six registres historiques comparés à leurs octets P67 avant écriture de l’extension. |
| Atlas | 77 objets historiques conservés ; cinq fiches ajoutées, soit 82. |
| Runtime | Scanner réel `extendP63RuntimeManifest` exécuté : {runtime['files']} lignes, {runtime['references']} références, {runtime['totalBytes']} octets. |
| Propriétaires runtime | Seul le catalogue est changé ; cinq PNG ajoutés. Interface, contrôleur et shell conservés. |
| Tests Node et gate final | À exécuter et consigner après finalisation du contrat de revue. |
| Navigateur | Non exécuté après la réinitialisation : binaire Chromium et cache absents. |
| Combat/déploiement | Aucune admission au combat ni validation de déploiement par cette préparation. |

## Reproduction

Construire depuis les huit snapshots P67 authentifiés par leurs SHA Git :

```sh
python scripts/build-cqc-p68.py --baseline-dir /chemin/p67-integration-baseline --pins /chemin/p67-baseline-pins.json
node --test scripts/test-cqc-p63-source-atlas.mjs scripts/test-cqc-p67-source-atlas.mjs
node scripts/check-cqc-p68.mjs /chemin/du/projet --baseline-dir /chemin/p67-integration-baseline --git-repository /chemin/du/clone-reel
```

Le vérificateur doit comparer l’extension au véritable arbre Git P67 ; les métadonnées de fichiers historiques absents localement sont rapprochées de leurs blobs publiés sans téléchargement de toute la collection. Aucun résultat de navigateur, de combat ou de certification 1:1 n’est déduit des contrôles de PNG et de graphe.

## Version Survive et reprise

Balloon Trap V1 est retenu après diagnostic alpha ; V2 est archivé. Les couleurs RGB de pixels alpha nul ne constituent pas un halo visible avec une composition alpha correcte. Les faibles franges restent documentées, sans nettoyage des pixels. Les [53 fichiers récupérés](../local-recovery-20261126/README.md) ont leur [preuve de publication séparée](recovery-publication-verification.json).

La réinitialisation a supprimé le dossier temporaire d’origine. Les PNG bruts, les blobs déjà créés et les références publiées ont permis une récupération vérifiée ; les chemins d’origine restent des informations de provenance. Les fiches conservent toutes les limites de pose, de cadrage, de géométrie et de référence.
'''
    if not (root / PASS / 'INTEGRATION_QA.md').exists():
        write_text(root, PASS + 'INTEGRATION_QA.md', qa)

    append_section(root, 'ASSOCIATIONS.md', '''## Extension P68 — deux éditions MG1 et Survive

Les [cinq associations P68](asset-associations-p68.json) ajoutent deux personnages, deux créatures et un accessoire. Le cumul passe à **259 sources** : 50 personnages, 9 costumes, 49 machines/créatures, 133 décors, 15 accessoires, 2 projectiles et 1 VFX. Les **20 archives** restent exclues de la sélection.

Les quatre classiques prolongent le groupe R-MG1-03 déjà couvert partiellement ; le Balloon Trap est un périmètre supplémentaire. Les 76 anciennes lignes non résolues sans candidat ne changent pas. Chaque fiche conserve son édition, les sources, hashes, prompts, limites et rubriques du guide. [Fiches P68](CONTINUATION_P68.md) · [Delta](../cqc-reprise/pass68/scope-delta.json).''')
    append_section(root, 'COMBAT.md', '''## P68 — états documentés, sources fixes uniquement

Les [fiches P68](CONTINUATION_P68.md) détaillent les séquences à produire pour les chiens MSX2/NES, le garde au jetpack NES, le garde rouge MSX2 et le Balloon Trap Survive : attente, déplacement, préparation, interruption et sortie, avec ancrages et interactions à vérifier. Les états aériens du jetpack et la capture par ballon restent conditionnés par des références complémentaires.

Les règles proposées pour CQC sont distinguées des observations natives. Aucun cycle animé, tir, dommage, hitbox, collision, VFX, son, neutralisation ou nouveau combattant jouable n’est implémenté par cette passe. Les cinq images ont `atlasIntegrated:true` et des flags de combat/certification faux ; les chiens gardent une morphologie quadrupède et les éditions restent séparées.''')
    append_section(root, 'FICHES_ET_VALIDATION.md', '''## Validation P68 — cinq sélections et une archive

Les six PNG sont suivis individuellement dans le [manifeste](../cqc-reprise/pass68/delivery-manifest.json), les [prompts](../cqc-reprise/pass68/prompt-index.json) et le [contrat de revue root](../cqc-reprise/pass68/reviewed-batch.json). La revue accepte cinq sources bornées ; elle ne certifie ni fidélité 1:1, ni grille de pixels native, ni géométrie de parties occultées. V2 du Balloon Trap reste archivé.

Le contrôle P68 vérifie le préfixe exact de 77 dossiers Atlas, les 254 sélections et 19 archives historiques, la nouvelle bijection de cinq sources et l’exclusion de l’archive du runtime. Les [fiches](CONTINUATION_P68.md) relient les plans d’animation aux sections du guide sans prétendre produire leurs frames. Le [rapport QA](../cqc-reprise/pass68/INTEGRATION_QA.md) conserve les résultats réellement exécutés et la limite du navigateur indisponible.''')
    append_section(root, 'README.md', '''## Continuation P68 et récupération locale

**259 sources sélectionnées, 82 dossiers Atlas et 20 archives.** P68 ajoute cinq PNG individuels : chiens MSX2/NES, garde au jetpack NES, garde rouge MSX2 et Balloon Trap Survive. Les [fiches détaillées](CONTINUATION_P68.md) associent les images, leur édition, les références, les réserves et les états encore à produire. [Galerie](../cqc-reprise/pass68/README.md) · [Manquants](../cqc-reprise/pass68/MANQUANTS.md) · [Contrôles](../cqc-reprise/pass68/INTEGRATION_QA.md).

Les 53 fichiers locaux de suivi et snapshots ont été conservés dans la [récupération du 26 novembre](../cqc-reprise/local-recovery-20261126/README.md), distincte des nouveaux assets. Les sources P67 et antérieures restent inchangées. Les cinq PNG sont consultables dans l’Atlas ; cette présence n’est pas une admission au combat et ne ferme aucun groupe historique.''')
    append_section(root, 'ARENES_ET_BOSS.md', '''## P68 — contraintes de placement et de petite cible

P68 ne livre aucune nouvelle arène. Les [fiches](CONTINUATION_P68.md) préparent les contraintes des deux chiens, de la variante au jetpack et du Balloon Trap : ancrage au terrain, volumes propres aux quadrupèdes, éventuels états aériens qualifiés séparément et surface de support du gadget. Aucun nouvel obstacle, danger, connexion de niveau ou comportement de boss n’est activé par les PNG.

Le futur piège exige une zone de placement valide et une matrice de cibles compatibles ; la capture d’un grand boss ou d’une machine ne se déduit pas de son apparence. Les transitions de manche, la pause et les interruptions doivent rendre le contrôle sans laisser une cible hors état. Ces règles sont des travaux de conception non implémentés.''')


if __name__ == '__main__':
    main()
