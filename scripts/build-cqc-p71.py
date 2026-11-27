#!/usr/bin/env python3
"""Build the five reviewed P71 Atlas candidates from the preserved local records.

Standard-library-only, offline and idempotent. Never edits prior association
registries, prior Atlas entries, runtime code, runtime manifests or QA reports.
"""
from __future__ import annotations

import argparse
import copy
import hashlib
import json
import struct
from collections import Counter
from pathlib import Path

PARENT = 'f2b7c526a3a6a763767afcd8ae91f60bc7012d7c'
PASS = 'docs/cqc-reprise/pass71/'
BIBLE = 'docs/cqc-bible/'
ATLAS = 'public/cqc/data/cqc-p63-source-atlas.json'
WEB = 'https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/'
FALSE_FLAGS = ['runtimeIntegrated', 'combatReady', 'combatRuntimeIntegrated', 'absolute1to1Certified', 'referenceGeometryValidated', 'nativePixelExact', 'nativeUhd', 'scopeClosed']


def sha256(raw):
    return hashlib.sha256(raw).hexdigest()


def blob(raw):
    return hashlib.sha1(b'blob ' + str(len(raw)).encode() + b'\0' + raw).hexdigest()


def canonical(value):
    return json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(',', ':')).encode()


def load(root, path):
    return json.loads((root / path).read_text(encoding='utf-8'))


def write(root, path, data):
    p = root / path
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(data if isinstance(data, str) else json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')


def file_record(root, path):
    raw = (root / path).read_bytes()
    return {'path': path, 'bytes': len(raw), 'sha256': sha256(raw), 'gitBlobSha': blob(raw)}


def verify_file(root, row):
    actual = file_record(root, row['path'])
    for key in ['bytes', 'sha256', 'gitBlobSha']:
        assert actual[key] == row[key], f"File mismatch: {row['path']} ({key})"


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', type=Path, default=Path(__file__).resolve().parents[1])
    args = parser.parse_args()
    root = args.root.resolve()
    source = load(root, PASS + 'source-records.json')
    baseline = source['baseline']
    assert baseline['parentCommit'] == PARENT
    assert source['generationRequests'] == 5 and not source['blockedRequests'] and not source['archives']
    for record in baseline['historicalAssociationFiles']:
        verify_file(root, record)
    previous = load(root, BIBLE + 'asset-associations-p69.json')
    assert previous['counts']['totalSelected'] == baseline['previousSelected'] == 267
    assert previous['counts']['totalArchivedAttempts'] == baseline['previousArchivedAttempts'] == 20

    catalogue = load(root, ATLAS)
    old_assets = catalogue['assets'][:90]
    assert len(old_assets) == baseline['atlasRecordCount'] == 90
    assert sha256(canonical(old_assets)) == baseline['atlasRecordsCanonicalSha256'], 'Prior Atlas entries changed'
    assets = copy.deepcopy(source['assets'])
    ids = [a['id'] for a in assets]
    assert len(ids) == len(set(ids)) == 5
    assert not ({a['id'] for a in old_assets} & set(ids)), 'Existing Atlas candidate reused'
    assert not catalogue['assets'][90:] or [a['id'] for a in catalogue['assets'][90:]] == ids, 'Unowned later Atlas entries exist'
    refs = load(root, PASS + 'references.json')['references']
    assert len(refs) == 3 and len({r['path'] for r in refs}) == 3
    ref_index = {r['path']: r for r in refs}
    for ref in refs:
        verify_file(root, ref)
    prompts = []
    for asset in assets:
        verify_file(root, asset)
        raw = (root / asset['path']).read_bytes()
        assert raw.startswith(b'\x89PNG\r\n\x1a\n')
        width, height, depth, color_type = struct.unpack('>IIBB', raw[16:26])
        assert [width, height, depth, color_type] == [asset['width'], asset['height'], asset['bitDepth'], asset['colorType']]
        assert depth == 8 and color_type == 6 and asset['colorMode'] == 'RGBA'
        gen = asset['generation']
        assert (root / gen['promptFile']).read_text(encoding='utf-8') == gen['exactPrompt'], 'Prompt mismatch'
        assert gen['transparent_background'] is True and gen['rawBytesPreserved'] is True
        assert gen['attempts'] == 1 and gen['retried'] is False
        assert len(asset['referenceFiles']) == len(gen['referenced_image_paths']) == 1
        assert asset['references'] == [ref_index[p] for p in asset['referenceFiles']]
        prompts.append(file_record(root, gen['promptFile']))
        asset.update({flag: False for flag in FALSE_FLAGS})
        asset.update(passId='P71', sourceGenerated=True, selected=True, atlasIntegrated=True, fidelityStatus='pending_external_review', transparentBackground=True, selectedVersion='v1')
        asset['pass'] = 'P71'
        asset['assetId'] = 'asset:p71:' + asset['id']
        asset['referenceMetadata'] = [file_record(root, p) for p in asset['referenceFiles']]
        asset['reviewRecords'] = [PASS + 'reviewed-batch.json']
        asset['guideSections'] = ['02', '04', '05', '15', '16', '17', '18', '22', '25', '26', '27', '29']
        asset['extensionGuideSections'] = ['44', '45', '47', '54', '64', '65', '67']
        if asset['episodeKey'] == 'mgr':
            asset['extensionGuideSections'].insert(0, '40')
        asset['extensionGuideMap'] = BIBLE + 'extension-guide-map-p71.json'
        asset['runtimeBinding'] = {'status': 'atlas_only', 'moduleKey': 'atlas63', 'catalogPath': ATLAS, 'admittedByThisPass': False}
        asset['bibleURL'] = WEB + BIBLE + 'CONTINUATION_P71.md#' + asset['id']
        asset['blobURL'] = WEB + asset['path']
        asset['manifest'] = PASS + 'delivery-manifest.json'
        asset['bibleDocuments'] = [BIBLE + p for p in ['CONTINUATION_P71.md', 'EXTENSIONS_GUIDE_P71.md', 'ASSOCIATIONS.md', 'COMBAT.md', 'FICHES_ET_VALIDATION.md']]
        asset['promptRecord'] = PASS + 'prompt-index.json#' + asset['id']
        assert asset['kind'] == 'prop' and asset['bodyCoverage'] in ['full_object', 'head_module']

    inherited = previous['inherits'] + [BIBLE + 'asset-associations-p69.json']
    old_work = {w for path in inherited for a in load(root, path)['assets'] for w in a.get('workIds', [])}
    new_work = {w for a in assets for w in a['workIds']}
    inventory = load(root, 'docs/cqc-reprise/pass61/inventory.json')['rows']
    historical_ids = {row['id'] for row in inventory}
    unresolved = {row['id'] for row in inventory if row['presenceClass'] == 'unresolved'}
    assert len(inventory) == 277 and len(unresolved) == 97
    assert len(unresolved - old_work) == len(unresolved - (old_work | new_work)) == 75
    assert len(new_work) == 5 and not (new_work & historical_ids) and not (new_work & old_work)
    counts = {'selectedSources': 5, 'archivedAttempts': 0, 'generatedPNGs': 5, 'generationRequests': 5, 'blockedRequests': 0, 'previousSelected': 267, 'totalSelected': 272, 'previousArchivedAttempts': 20, 'totalArchivedAttempts': 20, 'atlasSources': 95, 'editionCount': 2, 'byEpisode': dict(Counter(a['episodeKey'] for a in assets)), 'byKind': dict(Counter(a['kind'] for a in assets)), 'byBodyCoverage': dict(Counter(a['bodyCoverage'] for a in assets)), 'allPassesByKind': dict(Counter(previous['counts']['allPassesByKind']) + Counter(a['kind'] for a in assets)), 'selectedBytes': sum(a['bytes'] for a in assets), 'archivedBytes': 0, 'combatAdmissions': 0, 'absolute1to1Certifications': 0, 'newNarrativeImages': 0, 'closedScopes': 0}
    assert counts['selectedBytes'] == 3768837 and sum(counts['allPassesByKind'].values()) == 272
    review = {'schema': 'cqc.p71.reviewed-batch.v1', 'parentCommit': PARENT, 'asOf': source['asOf'], 'reviewer': '/root', 'reviewComplete': True, 'selected': [{'id': a['id'], 'sha256': a['sha256'], 'gitBlobSha': a['gitBlobSha']} for a in assets], 'archives': [], 'blockedIds': [], 'references': [file_record(root, r['path']) for r in refs], 'prompts': prompts, 'evidence': source['reviewEvidence'], 'reviewScope': 'Sélection comme sources fixes candidates de l’Atlas ; aucune certification géométrique 1:1 ni admission au combat.', 'historicalPreservation': baseline}
    write(root, PASS + 'reviewed-batch.json', review)
    manifest = {'schema': 'cqc.p71.delivery.v1', 'asOf': source['asOf'], 'parentCommit': PARENT, 'previousSelected': 267, 'sourcePass': 'P61+P62+P63+P64+P65+P66+P67+P68+P69+P71', 'reservedPasses': ['P70'], 'counts': counts, 'historicalRows': 277, 'historicalUnmatchedRows': 97, 'historicalRowsWithoutSelectedCandidate': 75, 'historicalCountsMeaning': 'Les 75 lignes historiques sans candidat après P69 restent sans candidat après P71. Les cinq workIds de P71 étendent le périmètre des props et ne ferment aucune ligne historique ; les statuts P61 sont inchangés.', 'extensionScopes': sorted(new_work), 'historicalScopeUpdates': [], 'inherits': inherited, 'interpretation': 'Cinq sources PNG fixes consultables dans l’Atlas, accompagnées de leurs trois références primaires et de leurs réserves. Les animations et interactions décrites sont du travail futur ; aucune nouvelle admission au combat, certification 1:1, validation UHD native ou clôture de scope.', 'requirementsGuide': BIBLE + 'guide-map.json', 'requirementsExtensions': [BIBLE + 'EXTENSIONS_GUIDE_P71.md', BIBLE + 'extension-guide-map-p71.json'], 'recoveryStatus': PASS + 'RECOVERY_STATUS.json', 'recoveryInterpretation': 'P70 reste réservé au lot ancien annoncé mais non récupéré. Aucun fichier absent n’est compté dans les livraisons P71 ou le cumul.', 'assets': assets, 'archives': [], 'blockedRequests': []}
    write(root, PASS + 'delivery-manifest.json', manifest)
    write(root, BIBLE + 'asset-associations-p71.json', dict(manifest, schema='cqc.bible.asset-associations-p71.v1'))
    prompt_records = [{'id': a['id'], 'selected': True, 'path': a['path'], 'promptId': a['id'], **a['generation'], 'postprocessing': 'none; exact original PNG copied byte-for-byte'} for a in assets]
    write(root, PASS + 'prompt-index.json', {'schema': 'cqc.p71.prompt-index.v1', 'generationRequests': 5, 'generatedOutputs': 5, 'selectedOutputs': 5, 'archiveOutputs': 0, 'blockedRequests': 0, 'records': prompt_records, 'archiveRecords': [], 'blockedRecords': [], 'interpretation': 'Cinq appels individuels, cinq sorties originales. Les chemins d’entrée originaux restent conservés et chaque référence dispose d’une copie brute dans le dépôt.'})

    catalogue.update(asOf=source['asOf'], sourcePass=baseline['atlasSourcePass'] + '+P71', description='95 dossiers de sources fixes P63–P69 et P71 ; les 90 dossiers antérieurs sont conservés sans modification, dans leur ordre initial. P70 reste réservé au lot non récupéré.')
    fields = ['id', 'label', 'episodeKey', 'workIds', 'referenceURLs', 'scope', 'qaNotes', 'episode', 'edition', 'bodyCoverage', 'kind', 'width', 'height', 'bitDepth', 'colorType', 'bytes', 'sha256', 'pass', 'gitBlobSha', 'colorMode', 'sourceGenerated', 'selected', 'atlasIntegrated', *FALSE_FLAGS, 'fidelityStatus', 'assetId', 'bibleURL', 'blobURL', 'alphaExtrema', 'transparentBackground', 'selectedVersion']
    new_rows = []
    for asset in assets:
        row = {key: copy.deepcopy(asset[key]) for key in fields}
        row['path'] = '../' + asset['path'][len('public/cqc/'):]
        row['generation'] = {'tool': asset['generation']['tool'], 'mode': asset['generation']['mode'], 'promptId': asset['id']}
        new_rows.append(row)
    catalogue['assets'] = old_assets + new_rows
    assert sha256(canonical(catalogue['assets'][:90])) == baseline['atlasRecordsCanonicalSha256']
    write(root, ATLAS, catalogue)

    summary = '**5 nouvelles sources sélectionnées, 0 essai archivé et 0 refus.** Cumul : **272 sources sélectionnées**, **95 dossiers Atlas**, **20 essais archivés**.'
    continuation = ['# Continuation P71 — accessoires Survive et Revengeance', '', summary, '', '[Galerie](../cqc-reprise/pass71/README.md) · [Associations](asset-associations-p71.json) · [Manifeste](../cqc-reprise/pass71/delivery-manifest.json) · [Prompts exacts](../cqc-reprise/pass71/prompt-index.json) · [Extensions du guide](EXTENSIONS_GUIDE_P71.md) · [Carte des extensions](extension-guide-map-p71.json)', '', 'Les 90 fiches Atlas antérieures et les registres P61–P69 sont conservés. Les cinq nouveaux workIds sont des extensions de props : **les 75 lignes historiques sans candidat restent ouvertes**. P70 est réservé au lot ancien non récupéré ; le [constat de recherche](../cqc-reprise/pass71/RECOVERY_STATUS.json) ne démontre pas une disparition définitive et aucun fichier absent n’est ajouté aux compteurs.', '', '**Une image fixe est livrée par sujet.** Les états et interactions ci-dessous décrivent du travail futur, sans nouvelle animation, hitbox, admission au combat, certification 1:1 ni UHD natif. Les PNG bruts conservent les défauts d’alpha et les extrapolations observées.', '', 'Le [guide général](guide-map.json) reste la base ; les sections 30–67 sont reliées dans l’[annexe P71](EXTENSIONS_GUIDE_P71.md). Ces cinq sources ne créent aucun droit premium, condition de déblocage ou bonus de gameplay.', '']
    gallery = ['# P71 — cinq sources fixes et fichiers conservés', '', summary, '', '[Fiches et états à produire](../../cqc-bible/CONTINUATION_P71.md) · [Manifeste](delivery-manifest.json) · [Prompts exacts](prompt-index.json) · [Références](references.json) · [Revue des sources](reviewed-batch.json) · [Extensions du guide](../../cqc-bible/EXTENSIONS_GUIDE_P71.md)', '', 'Cinq PNG individuels RGBA, conservés sans retouche, conversion ou upscaling. Trois fichiers de référence officiels ont réellement servi aux générations. Ce sont des candidats de l’Atlas, avec réserves de fidélité ; aucune animation ou nouvelle admission au combat n’est livrée par ces images.', '', '**P70 reste réservé.** Le [constat de recherche](RECOVERY_STATUS.json) ne retrouve aucun original du lot ancien annoncé ; aucun de ces fichiers absents n’est compté ici. Les 75 anciennes lignes sans candidat restent ouvertes.', '']
    for asset in assets:
        ident = asset['id']
        continuation.extend([f'<a id="{ident}"></a>', '', '## ' + asset['label'], '', asset['scope'], '', '| Champ | Valeur |', '|---|---|', '| Identité | `' + asset['assetId'] + '` |', '| Édition et couverture | ' + asset['edition'] + ' — `' + asset['bodyCoverage'] + '` |', '| Fichier | [' + ident + '.png](' + asset['blobURL'] + ') |', '| Sortie | ' + f"{asset['width']} × {asset['height']}, RGBA, {asset['bytes']:,}".replace(',', ' ') + ' octets |', '| SHA-256 | `' + asset['sha256'] + '` |', '| WorkIds | `' + '`, `'.join(asset['workIds']) + '` |', '| État | Source Atlas ; fidélité et admission au combat à valider |', '', '### Référence et limites', '', asset['observed'], ''])
        for ref in asset['references']:
            continuation.append('- [Contexte officiel](' + ref['contextURL'] + ') · [Image officielle](' + ref['sourceURL'] + ') · [Copie utilisée](../cqc-reprise/pass71/' + ref['path'][len(PASS):] + ').')
        continuation.extend(['', '[Prompt exact](../cqc-reprise/pass71/' + asset['generation']['promptFile'][len(PASS):] + ').', ''])
        continuation.extend('- ' + note for note in asset['qaNotes'])
        continuation.extend(['', '### États et interactions à produire', '', asset['productionPlan']['role'], '', '| État prévu | Travail restant |', '|---|---|'])
        continuation.extend('| ' + row['name'] + ' | ' + row['description'] + ' |' for row in asset['productionPlan']['states'])
        continuation.extend(['', *['- ' + text for text in asset['productionPlan']['interactions']], '', '### Prochaine validation', '', *['- ' + text for text in asset['nextWork']], '', 'Sections du [guide général](guide-map.json) : ' + ', '.join(asset['guideSections']) + '. Sections de l’[annexe P71](EXTENSIONS_GUIDE_P71.md) : ' + ', '.join(asset['extensionGuideSections']) + '. Ces liens décrivent les contrôles et le travail futur ; ils ne déclarent pas les systèmes implémentés pour cet asset.', ''])
        gallery.extend(['## ' + asset['label'], '', '![' + asset['label'] + '](../../../' + asset['path'] + ')', '', '**' + f"{asset['width']} × {asset['height']} · RGBA · {asset['bytes']:,}".replace(',', ' ') + ' octets · `' + asset['bodyCoverage'] + '`**', '', '[Référence, limites et états prévus](../../cqc-bible/CONTINUATION_P71.md#' + ident + ').', ''])
    gallery.extend(['## Traçabilité', '', 'Les [enregistrements sources](source-records.json), le [registre des prompts](prompt-index.json), les [références](references.json) et la [revue](reviewed-batch.json) conservent identités, paramètres, SHA-256 et SHA Git. Les cinq sorties occupent **3 768 837 octets**. Les trois références restent brutes ; les autres documents de recherche non utilisés ne sont pas présentés comme entrées.', '', 'La reconstruction reproductible de ces registres et de l’annexe utilise `python scripts/build-cqc-p71.py` depuis la racine du dépôt. Ce script préserve les registres historiques et les 90 premières fiches, et ne modifie aucun code de jeu, manifeste runtime ou rapport QA.', ''])
    write(root, BIBLE + 'CONTINUATION_P71.md', '\n'.join(continuation))
    write(root, PASS + 'README.md', '\n'.join(gallery))
    for record in baseline['historicalAssociationFiles']:
        verify_file(root, record)
    assert load(root, ATLAS)['assets'][:90] == old_assets
    print(json.dumps({'selectedSources': 5, 'totalSelected': 272, 'atlasSources': 95, 'archivedAttempts': 20, 'historicalRowsWithoutSelectedCandidate': 75, 'references': 3, 'prompts': 5, 'selectedBytes': counts['selectedBytes'], 'preservedAtlasRecords': 90, 'preservedAssociationFiles': len(baseline['historicalAssociationFiles'])}, ensure_ascii=False))


if __name__ == '__main__':
    main()
