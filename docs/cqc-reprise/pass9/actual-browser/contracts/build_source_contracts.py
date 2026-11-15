#!/usr/bin/env python3
"""Extract small, pinned PASS9 source contracts. No browser, network or R/S writes."""
import hashlib
import json
import math
from pathlib import Path

from PIL import Image

OUT = Path(__file__).resolve().parent
PREP = Path('/workspace/cqc-pass9-importer-preparation')
GEN = Path('/workspace/cqc-pass9-generation')
P8_RUNNER = Path('/workspace/vercel-pass8-publication/verify-deployed-browser.py')
P8_SHA = 'f05843d4caee99947c7e0387f828756c6157bdafb1b8e28f25dfb38140dbf6d2'
FIGHTERS = {'core__runner_mg2': 'running-man', 'core__ninja_mg2': 'black-color',
            'core__redblaster_mg2': 'red-blaster', 'core__jungle_evil': 'jungle-evil'}
ROUTES = {'core__runner_mg2': {},
          'core__ninja_mg2': {'shoot': ['special', 'super']},
          'core__redblaster_mg2': {'shoot': ['special', 'specialForward', 'super']},
          'core__jungle_evil': {'shoot': ['special', 'super']}}
KINDS = {'core__ninja_mg2': 'native-visible-star-release-hand',
         'core__redblaster_mg2': 'qualified-native-hand-grenade-release',
         'core__jungle_evil': 'native-visible-firearm-muzzle'}


def sha(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def read(path):
    return json.loads(Path(path).read_text())


def save(name, value, compact=False):
    # Fail closed on rerun: no previous reports may be overwritten.
    path = OUT / name
    assert path.parent == OUT
    data = json.dumps(value, ensure_ascii=False, separators=(',', ':') if compact else None,
                      indent=None if compact else 2) + '\n'
    with path.open('x') as stream:
        stream.write(data)
    return {'path': str(path), 'sha256': sha(path), 'bytes': path.stat().st_size}


def frame_key(frame):
    return (frame['file'], tuple(frame['rect']), tuple(frame['pivot']))


def main():
    assert sha(P8_RUNNER) == P8_SHA
    catalog_path = PREP / 'PASS9_CATALOG_ENTRIES_ONLY.json'
    origins_path = PREP / 'PASS9_NATIVE_ORIGINS.json'
    catalog = read(catalog_path)
    origins = read(origins_path)
    assert set(catalog['entries']) == set(FIGHTERS) == set(origins['entries'])
    pin_map = {}

    def pin(path, kind, expected=None, source_kind=None):
        path = Path(path)
        actual = sha(path)
        if expected:
            assert actual == expected, f'Pin mismatch: {path}'
        value = {'path': str(path), 'sha256': actual, 'bytes': path.stat().st_size, 'kind': kind}
        if source_kind:
            value['sourceKind'] = source_kind
        old = pin_map.get(str(path))
        if old:
            assert old['sha256'] == actual
        pin_map[str(path)] = value
        return value

    for name in ['PASS9_CATALOG_ENTRIES_ONLY.json', 'PASS9_NATIVE_ORIGINS.json',
                 'cqc-pass9-combat-fidelity.js', 'cqc-pass9-native-origins.js',
                 'CURRENT_CATALOG_39_LITERAL_GUARD.json', 'SOURCE_PINS.json',
                 'PREPARATION_RECEIPT.json', 'PASS9_PENDING_RUNTIME_HOOK_PATCH_PLAN.json']:
        pin(PREP / name, 'prepared-read-only-input')
    pin(P8_RUNNER, 'frozen-parent-pass8-runner', P8_SHA)
    for item in read(PREP / 'SOURCE_PINS.json')['pins']:
        pin(item['path'], item['kind'], item['sha256'])

    expected = {'schema': 'cqc.pass9.browser-expected-four/1', 'entries': {}}
    files24 = {'schema': 'cqc.pass9.browser-source-files/1', 'nativeSourceKind':
               'newly-authored-imagegen-native-versus-illustration', 'entries': {}, 'sourceFiles': []}
    geometry_checks = []
    for uid, directory in FIGHTERS.items():
        base = GEN / directory
        delivery_path = base / 'FINAL_DELIVERY.json'
        delivery = read(delivery_path)
        contract_path = base / 'SOURCE_AND_ACTION_CONTRACT.json'
        contract = read(contract_path)
        assert delivery['uid'] == contract['uid'] == uid
        pin(delivery_path, 'producer-final-delivery')
        pin(contract_path, 'producer-source-and-action-contract')
        pin(base / 'SOURCE_COMBAT_ORIGINS.json', 'producer-measured-native-points')
        candidate_path = PREP / 'candidates' / f'{uid}.json'
        pin(candidate_path, 'prepared-exact-uid-candidate')
        entry = catalog['entries'][uid]
        assert read(candidate_path)['entry'] == entry
        assert entry['facing'] == 1 and entry['mirror'] is False
        ref_path = (contract.get('referenceContractFile') or
                    contract.get('originalReferenceContract'))
        ref_sha = (contract.get('referenceContractSHA256') or
                   contract.get('originalReferenceContractSHA256'))
        if ref_path:
            pin(ref_path, 'original-reference-contract', ref_sha)
        refs = delivery.get('review', {}).get('sources', [])
        for reference in refs:
            if Path(reference['file']).exists():
                pin(reference['file'], 'qualified-original-era-reference', reference['sha256'],
                    reference.get('sourceKind'))
        frame_indexes = {}
        for source in delivery['sourceFiles']:
            layout_path = Path(source.get('layout') or delivery.get('layouts', {}).get(
                source['key']) or base / 'layouts' / f"{source['key']}.json")
            layout = read(layout_path)
            pin(layout_path, 'authoritative-source-layout', source.get('layoutSHA256'))
            pin(source['source'], 'unchanged-native-png', source['sha256'])
            assert layout['unchanged_source_sha256'] == source['sha256']
            assert len(layout['cells']) == 12
            for cell in layout['cells']:
                frame = cell['frame']
                assert frame['sha256'] == source['sha256']
                frame_indexes[frame_key(frame)] = cell['index']
            file = layout['cells'][0]['frame']['file']
            files24['sourceFiles'].append({
                'uid': uid, 'key': source['key'], 'file': file, 'source': source['source'],
                'sourceSHA256': source['sha256'], 'bytes': source['bytes'],
                'dimensions': [source['width'], source['height']], 'poseCount': 12,
                'facing': source['facing'], 'mirror': False,
                'sourceFrameHeight': entry['sourceFrameHeights'][file],
                'layout': str(layout_path), 'layoutSHA256': sha(layout_path)})
        out_entry = {key: entry[key] for key in ['displayHeight', 'facing', 'mirror', 'actionMap',
                     'phaseMap', 'sourceFrameHeights', 'baseFrameHeight']}
        out_entry['sourceFileSHA'] = {}
        unique = set()
        for facing in ['actions', 'oppositeActions']:
            out_entry[facing] = {}
            for action, data in entry[facing].items():
                frames = []
                for frame in data['frames']:
                    key = frame_key(frame)
                    assert key in frame_indexes, f'Frame not in authoritative layout: {uid}/{action}'
                    unique.add(key)
                    out_entry['sourceFileSHA'][frame['file']] = frame['sha256']
                    frames.append({key: frame[key] for key in ['file', 'sha256', 'rect', 'pivot']} |
                                  {'sourcePoseIndex': frame_indexes[key]})
                out_entry[facing][action] = {'frames': frames}
        assert len(unique) == 72
        assert len(out_entry['sourceFileSHA']) == 6
        expected['entries'][uid] = out_entry
        files24['entries'][uid] = {'candidatePath': str(candidate_path),
            'candidateSHA256': sha(candidate_path), 'deliveryPath': str(delivery_path),
            'deliverySHA256': sha(delivery_path), 'sourceContractPath': str(contract_path),
            'sourceContractSHA256': sha(contract_path), 'coverage': entry['coverage'],
            'fallbackMissingActions': entry['fallbackMissingActions'],
            'sourceFiles': 6, 'uniquePoses': 72, 'status': 'prepared-not-installed',
            'sourceFidelityStatus': 'closest_supported', 'absolute1to1Certified': False}
        geometry_checks.append({'uid': uid, 'authoritativeLayoutFramesMatched': 72})

    assert len(files24['sourceFiles']) == 24
    assert len({item['sourceSHA256'] for item in files24['sourceFiles']}) == 24
    red = expected['entries']['core__redblaster_mg2']
    assert red['actionMap']['specialDown'] == 'crouch'
    assert 'deploy' not in red['actionMap'].values()
    assert red['phaseMap']['crouch'] == {'startup': [0], 'active': [1], 'recovery': [0]}
    for facing in ['actions', 'oppositeActions']:
        assert [frame['sourcePoseIndex'] for frame in red[facing]['crouch']['frames']] == [8, 9]
        assert all('/a-' in frame['file'] for frame in red[facing]['crouch']['frames'])

    compact_origins = {'schema': 'cqc.pass9.browser-native-origins/1',
        'coordinateSystem': 'Full unchanged native PNG x,y; action frame is zero-based local frame.',
        'nativeSourceKind': 'newly-authored-imagegen-native-versus-illustration',
        'physicalViewClaims': 'Producer claims preserved; this extraction performs no physical or Canvas review.',
        'activePointCount': 6, 'reviewOnlyPointCount': 2, 'documentedPointCount': 8,
        'slotFaceFixtureCount': 14, 'entries': {}, 'slotFaceFixtures': []}
    pixel_checks = []
    for uid, actions in origins['entries'].items():
        entry = expected['entries'][uid]
        compact_origins['entries'][uid] = {}
        for action, sides in actions.items():
            compact_origins['entries'][uid][action] = {}
            for side, mark in sides.items():
                face = 1 if side == 'right' else -1
                frame = entry['actions' if face == entry['facing'] else 'oppositeActions'][action]['frames'][mark['frame']]
                assert mark['frame'] == entry['phaseMap'][action]['active'][0]
                assert all(frame[key] == mark[key] for key in ['file', 'sha256', 'rect', 'pivot'])
                assert frame['sourcePoseIndex'] == mark['sourcePoseIndex']
                assert entry['sourceFrameHeights'][frame['file']] == mark['sourceFrameHeight']
                assert mark['engineBodyScale'] == 1.12
                rgba = list(Image.open(mark['source']).convert('RGBA').getpixel(tuple(mark['point'])))
                assert rgba == mark['pointRGBA'] and rgba[3] == mark['sourcePixelAlpha'] > 80
                x, y, w, h = frame['rect']
                sx, sy = mark['point']
                assert x <= sx < x + w and y <= sy < y + h
                px, py = x + w * frame['pivot'][0], y + h * frame['pivot'][1]
                scale = entry['displayHeight'] / mark['sourceFrameHeight'] * mark['engineBodyScale']
                runtime = {'forward': (sx - px) * face * scale, 'height': (py - sy) * scale}
                assert all(math.isclose(runtime[key], mark['measuredRuntimeOrigin'][key], abs_tol=1e-10)
                           for key in runtime)
                active = action in ROUTES[uid]
                compact_mark = {key: mark[key] for key in ['action', 'frame', 'sourcePoseIndex', 'file',
                    'sha256', 'source', 'point', 'pointRGBA', 'rect', 'pivot', 'sourceFrameHeight',
                    'engineBodyScale', 'sourcePixelAlpha', 'pointKind', 'note']}
                compact_mark.update({'sourceKind': 'newly-authored-imagegen-native-versus-illustration',
                    'sourceSHA256': mark['sha256'], 'activeRoute': active,
                    'allowedSlots': ROUTES[uid].get(action, []), 'measuredRuntimeOrigin': runtime,
                    'producerPhysicallyViewed': mark['physicallyViewed'],
                    'rootCanvasSemanticReview': 'pending', 'canonicalWeaponModelCertified': False})
                if active:
                    assert mark['pointKind'] == KINDS[uid]
                    for slot in ROUTES[uid][action]:
                        assert entry['actionMap'][slot] == action
                        compact_origins['slotFaceFixtures'].append({'uid': uid, 'slot': slot,
                            'face': face, 'action': action, 'frame': mark['frame'],
                            'sourcePoseIndex': mark['sourcePoseIndex'], 'file': mark['file'],
                            'sourceSHA256': mark['sha256'], 'pointKind': mark['pointKind'],
                            'point': mark['point'], 'expectedProjectileOrigin': runtime})
                else:
                    assert uid == 'core__redblaster_mg2' and action == 'deploy'
                    compact_mark['qualification'] = 'INACTIVE review-only measured low hand; ambiguous white segment proves no knife, wire geometry or trap implementation. No Down route or ground-object origin.'
                compact_origins['entries'][uid][action][side] = compact_mark
                pixel_checks.append({'uid': uid, 'action': action, 'side': side,
                    'exactNativeRGBAMatched': True, 'firstActiveFrameMatched': True,
                    'pointKind': mark['pointKind'], 'activeRoute': active})
    assert len(compact_origins['slotFaceFixtures']) == 14

    semantics = {'schema': 'cqc.pass9.browser-source-semantics/1', 'status': 'prepared-not-installed',
        'uids': list(FIGHTERS), 'nativeSources': 24, 'uniquePoses': 288,
        'sourceClaims': {'fidelityStatus': 'closest_supported', 'absolute1to1Certified': False,
            'nativeAnimationsExtractedFromMSX2': False, 'nativeImageBytesEditedByPreparation': False,
            'numerical1to1Certified': False, 'canonicalBallisticsOrBalanceClaimed': False,
            'browserCanvasReviewPerformed': False, 'independentPhysicalReviewPerformedHere': False},
        'commonQualifications': [
            'All 72 poses per fighter are newly authored versus interpretations, not original animation extraction or upscaling.',
            'Original Japanese manual page42 supports names/lore; tiny sprite mirrors and secondary LP screenshots constrain only observable appearance. LP ROM/emulator/translation patch and sprite extraction provenance remain unverified.',
            'Fine garment, face, reverse-side topology and exact weapon hardware are unresolved. Display heights, renderer pivots, collisions, phase timings, damage, costs, reserve counts and super counts are versus adaptations.',
            'Native transparent regions coexist with low-alpha fringe/speckles and near-opaque body pixels; no alpha255 purity, native cleanup or exact hidden topology certification.',
            'Measured point SHA/RGBA/rect/pivot agreement validates the metadata relationship, not canon, physical appearance or live collision behavior.'],
        'entries': {
            'core__runner_mg2': {'identity': 'RUNNING MAN, original1990 MSX2',
                'weapon': 'unarmed', 'activeOrigins': 0,
                'sourceActions': {'shoot': 'visible sprint', 'charge': 'running/contact', 'recover': 'stationary breathing'},
                'required': ['no gun', 'no projectile or ground object launch', 'no emitted gas or placed mine'],
                'qualification': 'Original running/nerve-gas encounter does not prove personal weapon or attacks; versus normals/guard/throws/contact remain authored.'},
            'core__ninja_mg2': {'identity': 'BLACK COLOR / KYLE SCHNEIDER, original1990 MSX2',
                'weapon': 'hand-thrown stars', 'activeOrigins': 2,
                'sourceActions': {'shoot': 'visible star-release hand', 'deploy': 'visible bounded evade'},
                'required': ['alpha1 in cloak branch', 'no cloak/invisibility', 'no firearm muzzle origin', 'no katana/exoskeleton/Zandatsu'],
                'qualification': 'Exact star hardware, trajectory, eight-unit reserve and three-star super are not canonical data.'},
            'core__redblaster_mg2': {'identity': 'RED BLASTER, original1990 MSX2',
                'weapon': 'qualified hand-grenade interpretation', 'activeOrigins': 2,
                'documentaryInactiveOrigins': 2, 'sourceActions': {'shoot': 'qualified hand-grenade release', 'specialDown': 'A crouch source8/9, local0/1'},
                'producerDeliveryDown': 'deploy', 'preparedFinalDown': 'crouch',
                'required': ['Down stationary travel0 damage0 cost0', 'Down no projectile/trap/wire/ground-object origin', 'deploy absent from active actionMap'],
                'qualification': 'Grenades and immobilizing wires are source-supported categories; exact launcher/model/original animation unresolved. C4 white segment remains blade/wire/handle ambiguous and only documentary. Corrected manual lore names Lumumba University; no Leningrad/Bergen claim.'},
            'core__jungle_evil': {'identity': 'PREDATOR, runtime alias JUNGLE EVIL, original1990 MSX2',
                'weapon': 'generic conventional longgun silhouette', 'activeOrigins': 2,
                'sourceActions': {'shoot': 'visible native muzzle tip', 'deploy': 'always-visible low movement'},
                'required': ['exact UID without _mg2', 'alpha1 in cloak branch', 'no cloak/invisibility', 'no grenade/flame/laser/plasma'],
                'qualification': 'Human guerrillero, not film alien. Brand/caliber/feed/fire mode, twelve-unit reserve, reload restoration and six-shot super are authored or unresolved.'}},
        'runtimeHookRecommendations': ['Install exact-UID adapter last; compare exact action/phase/source geometry with expected4.',
            'Evaluate all14 slot/face origin fixtures against typed points; empty runner origin routes must remain empty.',
            'Prepend PASS9 hasSourceFinisher before PASS6 drawFinisher so legacy drawing side effects are bypassed.',
            'Use PASS9 cloakAlpha before earlier adapters/fallback so Black/Jungle visible low poses remain alpha1.']}
    old_guard_path = PREP / 'CURRENT_CATALOG_39_LITERAL_GUARD.json'
    old_guard = read(old_guard_path)
    guard_plan = {'schema': 'cqc.pass9.pending-root43-freeze-guard-plan/1',
        'status': 'pending-root-owned-import-runtime-install-and-freeze', 'root43FreezeCreated': False,
        'root43CatalogSHA256': None, 'currentAuthorization': 'isolated source-contract preparation only',
        'browserStarted': False, 'networkSessionStarted': False, 'publicationStarted': False,
        'existing39Guard': {'path': str(old_guard_path), 'sha256': sha(old_guard_path),
            'catalogPath': old_guard['catalogPath'], 'catalogSHA256': old_guard['catalogSHA256'],
            'oldEntryCount': 39, 'oldUIDs': list(old_guard['entries'])},
        'pendingRequiredFreeze': ['record R and S exact catalog JSON/JS SHA256 and43 UID set after root-approved import/install',
            'verify all39 raw entry-literal SHA256 against existing guard; compare new4 projection to expected4',
            'record24 native asset SHA256 and renderer/helper/engine/HTML pins; compare R and S for intended parity',
            'pin completed root named source/mapping review; preserve P8 runner exact immutable SHA256',
            'record deployed browser runner/observer/expected4/origin/semantics SHA256 and explicit target/build identity'],
        'beforeAnyBrowserRun': ['require completed root43 freeze and root authorization',
            'reject catalog, runtime or24-source SHA drift and any UID count/set mismatch',
            'reject old39 raw-literal drift, new4 geometry/action/phase drift, RedDown deploy route or active wire mark',
            'require six active/eight documentary typed points and fourteen slot/face fixtures'],
        'afterAnyBrowserRun': ['rehash the same root43 and frozen P8 pins; fail on any drift',
            'write fresh immutable run receipt and evidence; never overwrite prior reports',
            'keep runtime visual/collision outcomes distinct from source and numerical1:1 claims'],
        'publication': 'Root-owned later decision; this plan neither builds nor publishes P9.'}

    outputs = []
    outputs.append(save('expected4.json', expected, compact=True))
    assert outputs[-1]['bytes'] <= 100 * 1024
    outputs.append(save('native-origins8.json', compact_origins, compact=True))
    outputs.append(save('source-files24.json', files24, compact=True))
    outputs.append(save('source-semantics.json', semantics))
    outputs.append(save('root43-freeze-guard-plan.pending.json', guard_plan))
    assert all(sha(item['path']) == item['sha256'] for item in pin_map.values())
    outputs.append(save('source-contract-pins.json', {'schema': 'cqc.pass9.browser-source-contract-pins/1',
        'status': 'read-only-inputs-pinned', 'pins': list(pin_map.values())}, compact=True))
    assert sha(P8_RUNNER) == P8_SHA
    outputs.append(save('PREPARATION_RECEIPT.json', {'schema': 'cqc.pass9.browser-contract-preparation-receipt/1',
        'status': 'prepared-no-browser-no-network-no-publication', 'outputs': outputs,
        'inputPinCount': len(pin_map), 'nativeSources': 24, 'uniquePoses': 288,
        'documentaryPoints': 8, 'activePoints': 6, 'slotFaceFixtures': 14,
        'geometryChecks': geometry_checks, 'exactPixelAndPointChecks': pixel_checks,
        'pass8RunnerSHA256Before': P8_SHA, 'pass8RunnerSHA256After': sha(P8_RUNNER),
        'allWritesUnder': str(OUT), 'sourcePNGBytesCopied': 0, 'fullCatalogBytesCopied': 0,
        'noRSWrites': True, 'browserReviewPerformed': False, 'sourceOrNumerical1to1Certified': False}))
    print(json.dumps(outputs, indent=2))


if __name__ == '__main__':
    main()
