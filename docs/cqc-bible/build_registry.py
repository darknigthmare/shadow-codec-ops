#!/usr/bin/env python3
"""Rebuild the guide crosswalk and source associations without changing gameplay.

Run from any directory with Python 3. Optional --verify-images uses Pillow for
new P62 PNGs only. Historical PNGs are represented by their pinned manifests.
"""
from pathlib import Path
from collections import Counter, defaultdict
import argparse
import hashlib
import json

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
BRANCH = 'codex/cqc-p61-missing-static-sources-20261125'
BASE = '5c2cbed73f15c4583f5ffd2cee0c2344180b5d68'
DATE = '2026-11-25'
SECTIONS = {
    'character': ['02', '03', '05', '06', '07', '08', '10', '17', '18'],
    'costume': ['02', '03', '07', '10', '17', '18', '22'],
    'stage': ['02', '09', '10', '13', '14', '15', '17', '18'],
    'machine': ['02', '03', '11', '13', '15', '16', '17', '18'],
    'vfx': ['02', '05', '14', '16', '17', '18', '22'],
}

def read(path):
    return json.loads(path.read_text(encoding='utf-8'))

def write(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

def esc(value):
    return str(value or '').replace('|', '\\|').replace('\n', ' ')

def git_sha(data):
    return hashlib.sha1(b'blob ' + str(len(data)).encode() + b'\0' + data).hexdigest()

def requirement_map():
    source = read(HERE / 'requirements-source.json')
    guide = HERE / 'sources/Combat_Games_Guide_General_v1.0.txt'
    guide_bytes = guide.read_bytes()
    rows = []
    sections = []
    for section in source['sections']:
        ids = []
        for n, (title, acceptance) in enumerate(section['requirements'], 1):
            req_id = f"CQC-G{section['section']}-{n:02}"
            deferred = (section['section'], n) in {('12', 3), ('18', 1), ('23', 2)}
            rows.append({
                'id': req_id, 'guideSection': section['section'], 'title': title,
                'priority': 'P2' if (section['section'], n) in {('12', 3), ('23', 2)} else section['priority'],
                'decision': 'differee' if deferred else 'retenue',
                'reason': ('Extension à qualifier après les fondations ; fonctionnalités existantes conservées.'
                           if section['section'] == '12' and n == 3 else
                           'Production d’animation différée pendant la phase de sprites fixes ; conception conservée.'
                           if section['section'] == '18' and n == 1 else
                           'Services réseau différés ; contraintes de simulation traitées dès la conception.'
                           if section['section'] == '23' and n == 2 else
                           'Exigence adaptée au périmètre CQC et reliée au document indiqué.'),
                'document': section['document'], 'acceptanceCriterion': acceptance,
                'implementationEvidence': 'runtime-evidence.json',
                'status': {'design': 'documentee', 'implementation': 'voir_preuves_par_rubrique',
                           'validation': 'critere_defini_execution_non_deduite'},
            })
            ids.append(req_id)
        sections.append({'id': section['section'], 'title': section['title'],
                         'document': section['document'], 'requirementIds': ids})
    assert [x['id'] for x in sections] == [f'{i:02}' for i in range(30)]
    assert len(rows) == 90 and len({x['id'] for x in rows}) == 90
    evidence_file = HERE / 'runtime-evidence.json'
    findings = read(evidence_file)['findings'] if evidence_file.exists() else []
    for row in rows:
        row['runtimeFindings'] = [
            {'id': finding['id'], 'status': finding['status'], 'evidenceIds': finding['evidenceIds']}
            for finding in findings if row['guideSection'] in finding['guideSections']
        ]
        row['status']['implementation'] = ('domaine_inspecte_voir_reserves' if row['runtimeFindings']
                                            else 'exigence_documentaire_ou_conception')
    result = {'schema': 'cqc.bible.guide-map.v1', 'asOf': DATE,
              'guide': {'path': guide.relative_to(ROOT).as_posix(), 'version': '1.0',
                        'bytes': len(guide_bytes), 'sha256': hashlib.sha256(guide_bytes).hexdigest()},
              'sourceCommit': BASE, 'phase': 'static_base_sources_and_bible',
              'counts': {'sections': 30, 'requirements': len(rows),
                         'decisions': dict(Counter(x['decision'] for x in rows))},
              'sections': sections, 'requirements': rows}
    write(HERE / 'guide-map.json', result)
    lines = ['# Guide général → exigences CQC', '',
             '**30 rubriques et 90 exigences identifiées.** Les décisions portent sur la conception ; elles ne déclarent pas les fonctionnalités terminées.', '',
             '[Guide original](sources/Combat_Games_Guide_General_v1.0.txt) · [État réel du code](ETAT_DU_JEU.md) · [Données structurées](guide-map.json)', '',
             f"Empreinte SHA-256 du guide conservé : `{result['guide']['sha256']}`.", '']
    for section in sections:
        lines += [f"## {section['id']}. {section['title']}", '',
                  f"Document CQC : [{section['document']}]({section['document']}).", '',
                  '| Exigence | Priorité / décision | Critère de validation |', '|---|---|---|']
        for row in rows:
            if row['guideSection'] == section['id']:
                lines.append(f"| `{row['id']}` — {esc(row['title'])} | {row['priority']} / {row['decision']} | {esc(row['acceptanceCriterion'])} |")
        lines.append('')
    (HERE / 'EXIGENCES.md').write_text('\n'.join(lines), encoding='utf-8')
    return result

def new_sources(verify_images=False):
    folder = ROOT / 'docs/cqc-reprise/pass62/batches'
    assets = []
    for file in sorted(folder.glob('*.json')):
        data = read(file)
        if not isinstance(data, dict):
            continue
        for entry in data.get('entries', data.get('produced', [])):
            if entry.get('selected') is False:
                continue
            path = entry.get('path', entry.get('file', ''))
            if not path.endswith('.png'):
                continue
            if not path.startswith('public/'):
                path = 'public/cqc/assets/p62/' + path
            image_file = ROOT / path
            content = image_file.read_bytes()
            sha = git_sha(content)
            stated = entry.get('gitBlobSha', entry.get('gitBlobSHA'))
            assert not stated or stated == sha, f'P62 Git SHA mismatch: {path}'
            work_ids = entry.get('workIds', entry.get('workId', []))
            if isinstance(work_ids, str):
                work_ids = [work_ids]
            qa = entry.get('qa', {})
            notes = qa.get('notes', []) if isinstance(qa, dict) else []
            if isinstance(notes, str):
                notes = [notes]
            limits = qa.get('limitations', []) if isinstance(qa, dict) else []
            if isinstance(limits, str):
                limits = [limits]
            meta = entry.get('inspection', {})
            asset = {
                'id': entry.get('id', Path(path).stem), 'label': entry.get('label', Path(path).stem),
                'episode': entry.get('episode', ''), 'kind': entry.get('kind', 'stage'), 'pass': 62,
                'path': path, 'gitBlobSha': sha, 'sha256': hashlib.sha256(content).hexdigest(),
                'bytes': len(content), 'width': entry.get('width', meta.get('width')),
                'height': entry.get('height', meta.get('height')),
                'colorMode': entry.get('colorMode', meta.get('colorMode', meta.get('mode'))),
                'workIds': work_ids,
                'referenceURLs': entry.get('referenceURLs', entry.get('referenceUrls', [])),
                'manifest': file.relative_to(ROOT).as_posix(), 'qaNotes': notes + limits,
                'selected': True, 'absolute1to1Certified': False, 'runtimeIntegrated': False,
                'combatReady': False, 'fidelityStatus': 'pending_external_review',
                'blobURL': f'https://github.com/darknigthmare/shadow-codec-ops/blob/{BRANCH}/{path}',
            }
            if verify_images:
                from PIL import Image
                with Image.open(image_file) as image:
                    image.load()
                    asset.update(width=image.width, height=image.height, colorMode=image.mode)
                    if asset['kind'] == 'stage':
                        assert image.size == (1672, 941), f'Unexpected stage dimensions: {path}'
            assets.append(asset)
    return assets

def associate_narrative(assets):
    """Resolve narrative-local reference IDs to the selected source identity."""
    narrative = read(HERE / 'narrative-registry.json')
    by_path = {asset['path']: asset for asset in assets}
    references = {ref['id']: ref for ref in narrative['sourceAssetReferences']}
    assert len(references) == len(narrative['sourceAssetReferences']), 'Duplicate narrative reference ID'
    uses = {}
    for ref_id, ref in references.items():
        assert ref['path'] in by_path, f'Narrative source is not selected: {ref_id}'
        asset = by_path[ref['path']]
        assert asset['gitBlobSha'] == ref['gitBlobSha'], f'Narrative source identity mismatch: {ref_id}'
        uses[ref_id] = {
            'referenceId': ref_id, 'assetId': asset['assetId'], 'usage': ref['usage'],
            'routeIds': [], 'pilotUids': [], 'encounterIds': [], 'chapterIds': [],
            'sceneIds': [], 'shotIds': [], 'fullNarrativeShot': False,
            'runtimeAdmissionByThisAssociation': False,
        }

    def link(ref_ids, field, value):
        for ref_id in ref_ids:
            assert ref_id in uses, f'Unknown narrative reference: {ref_id}'
            if value not in uses[ref_id][field]:
                uses[ref_id][field].append(value)

    for route in narrative['routes']:
        link(route['sourceAssetIds'], 'routeIds', route['id'])
        link(route['sourceAssetIds'], 'pilotUids', route['uid'])
        for encounter in route['encounters']:
            link(encounter['stageBinding']['sourceAssetIds'], 'encounterIds', encounter['id'])
    for chapter in narrative['campaign']['chapters']:
        link(chapter['sourceAssetIds'], 'chapterIds', chapter['id'])
    for scene in narrative['scenes']:
        for shot in scene['shots']:
            link(shot['stageReferenceAssetIds'], 'sceneIds', scene['id'])
            link(shot['stageReferenceAssetIds'], 'shotIds', shot['id'])
    for ref_id, use in uses.items():
        asset = by_path[references[ref_id]['path']]
        asset.setdefault('narrativeUses', []).append(use)
        if 'NARRATION.md' not in asset['bibleDocuments']:
            asset['bibleDocuments'].append('NARRATION.md')
    return {
        'registry': 'narrative-registry.json',
        'sourcesLinked': len(uses),
        'routes': len(narrative['routes']),
        'chapters': len(narrative['campaign']['chapters']),
        'sequences': len(narrative['scenes']),
        'shotBriefs': sum(len(scene['shots']) for scene in narrative['scenes']),
        'newSceneImagesGenerated': narrative['counts']['newSceneImagesGenerated'],
        'meaning': 'Source references for authored scenes; these are not generated scene images.',
    }

def build_associations(verify_images=False):
    legacy = read(ROOT / 'docs/cqc-reprise/pass61/delivery-manifest.json')
    inventory = read(ROOT / 'docs/cqc-reprise/pass61/inventory.json')
    extra = new_sources(verify_images)
    new_archives = []
    for file in sorted((ROOT / 'docs/cqc-reprise/pass62/batches').glob('*.json')):
        data = read(file)
        if not isinstance(data, dict):
            continue
        for entry in data.get('rejected', []):
            path = entry.get('path', entry.get('file', ''))
            assert path.startswith('public/cqc/assets/p62/rejected/'), f'Unqualified archive path: {path}'
            content = (ROOT / path).read_bytes()
            sha = git_sha(content)
            assert sha == entry.get('gitBlobSha', entry.get('gitBlobSHA')), f'Archive Git SHA mismatch: {path}'
            archive = {**entry, 'path': path, 'pass': 62, 'selected': False,
                       'gitBlobSha': sha, 'sha256': hashlib.sha256(content).hexdigest(),
                       'bytes': len(content), 'manifest': file.relative_to(ROOT).as_posix()}
            if verify_images:
                from PIL import Image
                with Image.open(ROOT / path) as image:
                    image.load()
                    archive.update(width=image.width, height=image.height, colorMode=image.mode)
            new_archives.append(archive)
    archives = legacy['archives'] + new_archives
    selected = legacy['assets'] + extra
    assert len({a['path'] for a in selected}) == len(selected), 'Duplicate selected source'
    scope_ids = {r['id'] for r in inventory['rows']}
    asset_ids_by_scope = defaultdict(list)
    auxiliary = {}
    assets = []
    for asset in selected:
        assert asset['workIds'], f"Source without workId: {asset['path']}"
        asset_id = f"asset:p{asset['pass']}:{asset['id']}"
        for scope_id in asset['workIds']:
            asset_ids_by_scope[scope_id].append(asset_id)
            if scope_id not in scope_ids:
                assert asset['pass'] == 60, f'Unknown new scope ID: {scope_id}'
                auxiliary[scope_id] = {'id': scope_id, 'label': asset['label'],
                                     'scope': 'retained_P60_source_outside_P61_gap_inventory'}
        assets.append({
            **asset, 'assetId': asset_id, 'guideSections': SECTIONS[asset['kind']],
            'bibleDocuments': ['README.md', 'FICHES_ET_VALIDATION.md',
                               'ARENES_ET_BOSS.md' if asset['kind'] in ('stage', 'machine') else 'COMBAT.md'],
            'runtimeBinding': {'status': 'requires_explicit_binding_and_review', 'admittedByThisPass': False},
            'tracking': {'lore': 'references_identified_review_pending', 'design': 'associated_to_bible',
                         'assets': 'selected_static_source', 'integration': 'not_admitted_by_P60_P61_P62',
                         'validation': 'file_identity_recorded_visual_1to1_pending',
                         'publication': 'versioned_in_PR25'},
        })
    assert len({a['assetId'] for a in assets}) == len(assets)
    narrative_links = associate_narrative(assets)
    scopes = []
    for row in inventory['rows']:
        linked = asset_ids_by_scope[row['id']]
        scopes.append({**row, 'selectedAssetIds': linked,
                       'p62AssetIds': [x for x in linked if x.startswith('asset:p62:')],
                       'coverageInterpretation': 'One or more sources may cover only part of this historical scope; no automatic closure.'})
    counts = {
        'selectedSources': len(assets), 'selectedP60': 40, 'selectedP61': 132, 'selectedP62': len(extra),
        'selectedByKind': dict(Counter(x['kind'] for x in assets)),
        'historicalGapScopes': len(scopes), 'auxiliaryRetainedScopes': len(auxiliary),
        'historicalScopesWithoutDemonstratedSource': sum(r['presenceClass'] == 'unresolved' for r in scopes),
        'historicalScopesExtendedByP62': sum(bool(r['p62AssetIds']) for r in scopes),
        'archivedTrialsExcluded': len(archives),
        'archivedTrialsByPass': dict(Counter(str(x['pass']) for x in archives)),
        'newRuntimeAdmissions': 0, 'new1to1Certifications': 0,
    }
    result = {'schema': 'cqc.bible.asset-associations.v1', 'asOf': DATE, 'sourceCommit': BASE,
              'interpretation': 'Images, historical gap scopes, roster profiles and narrative plans are separate units.',
              'counts': counts, 'assets': assets, 'scopeRecords': scopes,
              'auxiliaryScopes': list(auxiliary.values()),
              'narrativeAssociations': narrative_links,
              'archives': archives}
    write(HERE / 'asset-associations.json', result)
    write(ROOT / 'docs/cqc-reprise/pass62/delivery-manifest.json', {
        'schema': 'cqc.source-delivery.v2', 'asOf': DATE, 'baselineCommit': BASE,
        'branch': BRANCH, 'counts': counts, 'assets': extra, 'archives': new_archives,
        'inheritedDelivery': '../pass61/delivery-manifest.json',
        'bibleAssociations': '../../cqc-bible/asset-associations.json',
    })
    lines = ['# Sources associées à la bible CQC', '',
             f"**{len(assets)} sources sélectionnées**, dont {len(extra)} nouvelles P62 ; **277 périmètres historiques** et **{len(auxiliary)} périmètres P60 auxiliaires** conservés séparément.", '',
             f'Les sources candidates ne sont pas automatiquement admises au combat. Les {len(archives)} essais remplacés restent exclus. [Données et suivi par périmètre](asset-associations.json).', '',
             '| Source | Passe / catégorie | Périmètres associés | Rubriques du guide |', '|---|---|---|---|']
    for asset in assets:
        lines.append(f"| [{esc(asset['label'])}](../../{asset['path']}) | P{asset['pass']} / {asset['kind']} | {' ; '.join('`'+w+'`' for w in asset['workIds'])} | {', '.join(asset['guideSections'])} |")
    lines += ['', '## Associations narratives réciproques', '',
              f"**{narrative_links['sourcesLinked']} sources sélectionnées** servent de références pour les {narrative_links['routes']} parcours pilotes et les {narrative_links['chapters']} chapitres de campagne. Les {narrative_links['shotBriefs']} plans sont des briefs distincts, pas des images produites. Les IDs de scènes et de plans sont conservés dans [asset-associations.json](asset-associations.json) et contrôlés contre [narrative-registry.json](narrative-registry.json).", '',
              '| Source sélectionnée | Référence narrative | Parcours / chapitres | Séquences / plans associés |',
              '|---|---|---|---|']
    for asset in assets:
        for use in asset.get('narrativeUses', []):
            lines.append(f"| `{asset['assetId']}` | `{use['referenceId']}` | {len(use['routeIds'])} parcours / {len(use['chapterIds'])} chapitres | {len(use['sceneIds'])} séquences / {len(use['shotIds'])} plans |")
    (HERE / 'ASSOCIATIONS.md').write_text('\n'.join(lines) + '\n', encoding='utf-8')
    return result

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--verify-images', action='store_true')
    args = parser.parse_args()
    guide = requirement_map()
    associations = build_associations(args.verify_images)
    print(json.dumps({'guide': guide['counts'], 'assets': associations['counts']}, ensure_ascii=False))
