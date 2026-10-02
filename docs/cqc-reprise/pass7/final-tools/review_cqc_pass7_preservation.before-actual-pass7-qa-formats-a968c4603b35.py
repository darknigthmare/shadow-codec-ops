#!/usr/bin/env python3
"""Independent, read-only PASS7 preservation review.

Default is a plan only. --execute requires explicit root-confirmed frozen facts.
Only a new external report is written; archives, R, S and Git are never mutated.
Historical ZIP CRC results are reused only after their full byte SHA256 matches
the existing 46 immutable pins and the independently verified PASS6 report.
"""
from __future__ import annotations
import argparse
import collections
import concurrent.futures
import hashlib
import json
import math
import re
import struct
import subprocess
import traceback
from datetime import datetime, timezone
from pathlib import Path, PurePosixPath
from PIL import Image

W = Path('/workspace')
R = W / 'cqc-game-working/cqc-versus-v056'
S = W / 'shadow-codec-recovered'
BASELINES = [
    ('cqc-original-v056-files.json', 1322, 'c073d1c51a42f0508d4ab5291d0483019be5cd1eec07e6a4c513ba9ef0117512'),
    ('cqc-delivered-pass2-baseline-files.json', 4576, '12c4825ea85f1954e123459730084740fd9a5a402f46f6c272cf7e8a3bc90190'),
    ('cqc-pass2-baseline-files.json', 4617, '4f8d7df1a657edda7ef236a2cfd366534946008308182bad0cb48a27c72e96c8'),
    ('cqc-delivered-pass3-baseline-files.json', 5972, '9641befa9ffa0f37c2279487fa91562b3b1052cff4d33d711c835d3066076d46'),
    ('cqc-delivered-pass4-baseline-files.json', 7850, '88f294418baf46d7269c08324c433a615fdeadf924d35814221e64e4bbc67244'),
    ('cqc-delivered-pass5-baseline-files.json', 9079, '31251f4751b162334ca1d064025ac23876b4afffe9f55782410ff8128e2fbc67'),
    ('cqc-delivered-pass6-baseline-files.json', 10474, '999b0477f8898fa5f2fbc323bc073a1784ef26c96e7465d5057d58435ceb034d'),
]
PINS = W / 'cqc-pass6-previous-deliveries-frozen.json'
PINS_SHA = 'dfbb85e3f3d7f6e56fa81d916c94ecd1c7b197b32dfb64bfca0102a236845934'
PASS6_REVIEW = W / 'cqc-pass6-preservation-review-corrected.json'
PASS6_REVIEW_SHA = '394658e8425a1b2805fcf58fb890bc586d056743c3719be5fc589753af2bb5e6'
PASS7_BASELINE_FACTS = W / 'cqc-pass7-frozen-baseline-facts.json'
PASS7_BASELINE_FACTS_SHA = 'b14e7cb6d1cc3c1bc89f89c7330b9fcc9b1fcffb939c2ce4e7f607f921e21604'
PASS6_COMMIT = '310bf32069fa0a42fe1815a6ffe8f831f6d3bede'
MAIN_COMMIT = '9a37e0ca975021df2eb6db7fd28fe4dcd9a2550c'
OLD_BRANCH_COMMIT = 'e2e2c31ee931c79f61f43172f3a46f0eab027c51'
ENGINE_SHA = '197acd7da230bf479a68d37ff409801c0d4390d001a98b4c1451075be55d2d51'
NEW_UID_FOLDERS = {
    'core__raven': 'raven', 'core__old_snake': 'old-snake',
    'core__quiet': 'quiet', 'archive__skull_face': 'skull-face',
}
MOVE_SLOTS = {'light', 'heavy', 'low', 'throw', 'special', 'specialDown', 'specialForward', 'specialBack', 'super', 'utility'}
QA_REQUIRED = {'core', 'sprites', 'standaloneBrowser', 'shadowBrowser', 'shadowNpm', 'gameplayPhysical', 'combat'}
EXCLUDED_RUNTIME_ROOTS = {'docs', 'tests', 'tools', 'preparation', 'recovery', 'references', 'history'}
checks, failures, measures = [], [], {}
actual = {}
by_sha = collections.defaultdict(list)
baseline6 = {}

def digest(raw):
    return hashlib.sha256(raw).hexdigest()

def file_sha(path):
    result = hashlib.sha256()
    with Path(path).open('rb') as stream:
        for block in iter(lambda: stream.read(8 * 1024 * 1024), b''):
            result.update(block)
    return result.hexdigest()

def document(path):
    return json.loads(Path(path).read_bytes())

def norm(value):
    return digest(json.dumps(value, sort_keys=True, ensure_ascii=False, separators=(',', ':')).encode())

def check(name, ok, **detail):
    row = {'name': name, 'passed': bool(ok), **detail}
    checks.append(row)
    if not ok:
        failures.append(row)
    return bool(ok)

def safe_path(value):
    path = PurePosixPath(value)
    return bool(value) and not path.is_absolute() and '..' not in path.parts and '\\' not in value and path.as_posix() == value

def source_index(root):
    def pin(path):
        before = path.stat()
        value = {'bytes': before.st_size, 'sha256': file_sha(path), 'symlink': path.is_symlink()}
        after = path.stat()
        if (before.st_size, before.st_mtime_ns) != (after.st_size, after.st_mtime_ns):
            raise RuntimeError('Source changed while being hashed: ' + str(path))
        return path.relative_to(root).as_posix(), value
    files = sorted(path for path in root.rglob('*') if path.is_file())
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as executor:
        return dict(executor.map(pin, files))

def same(rel, sha256, size=None):
    row = actual.get(rel, {})
    return row.get('sha256') == sha256 and (size is None or row.get('bytes') == size)

def retained(sha256, prefixes=('preparation/', 'recovery/', 'docs/', 'history/')):
    return [path for path in by_sha.get(sha256, []) if path.startswith(prefixes)]

def baseline_bytes(rel):
    old = baseline6[rel]
    if same(rel, old['sha256'], old['bytes']):
        return (R / rel).read_bytes()
    alternatives = [p for p in retained(old['sha256'], ('recovery/',)) if actual[p]['bytes'] == old['bytes']]
    if not alternatives:
        raise RuntimeError('Exact PASS6 bytes not recovered: ' + rel)
    return (R / alternatives[0]).read_bytes()

def assignment(raw, name):
    text = raw.decode()
    matches = list(re.finditer(r'(?:window|globalThis)\.' + re.escape(name) + r'\s*=\s*', text))
    if len(matches) != 1:
        raise ValueError('Non-unique assignment: ' + name)
    return json.JSONDecoder().raw_decode(text[matches[0].end():])[0]

def frames(entry):
    for side in ('actions', 'oppositeActions'):
        for action in entry.get(side, {}).values():
            yield from action.get('frames', [])

def pin_ok(row, default_root=R):
    path = Path(row.get('path', ''))
    path = path if path.is_absolute() else default_root / path
    return path.is_file() and not path.is_symlink() and file_sha(path) == row.get('sha256') and ('bytes' not in row or path.stat().st_size == row['bytes'])

def verify_archives_and_previous_qa():
    check('46_historical_pin_manifest_identity', file_sha(PINS) == PINS_SHA)
    pins = document(PINS)['files']
    check('46_unique_immutable_deliveries', len(pins) == len({p['path'] for p in pins}) == 46)
    check('PASS6_independent_full_crc_evidence_identity', file_sha(PASS6_REVIEW) == PASS6_REVIEW_SHA)
    prior = document(PASS6_REVIEW)
    check('PASS6_crc_and_preservation_review_passed', prior['status'] == 'passed' and prior['failureCount'] == 0)
    old_checks = {row['path']: row for row in prior['measures']['previousDeliveries']}
    result = []
    for pin in pins:
        path = Path(pin['path'])
        valid = pin_ok(pin, W)
        old = old_checks.get(str(path), {})
        inherited_crc = valid and old.get('matchesPin') is True and old.get('sha256') == pin['sha256'] and old.get('bytes') == pin['bytes'] and not old.get('errors')
        check('immutable_archive_or_sidecar:' + path.name, valid and inherited_crc, path=str(path), sha256=pin['sha256'], reusedCRCOnlyAfterExactHash=bool(inherited_crc), zip=path.suffix.lower() == '.zip')
        result.append({**pin, 'currentFullHashMatchesPin': valid, 'PASS6CRCProofValid': inherited_crc, 'CRCReadRepeated': False})
    check('26_previously_crc_validated_zip_archives_retained', sum(Path(p['path']).suffix.lower() == '.zip' for p in pins) == 26)
    measures['previousDeliveries'] = result
    frozen = document(PASS7_BASELINE_FACTS)
    check('PASS7_initial_frozen_baseline_facts_identity', file_sha(PASS7_BASELINE_FACTS) == PASS7_BASELINE_FACTS_SHA)
    qa = frozen['pass6QA']
    check('PASS6_root_QA_facts_unchanged', pin_ok(qa, W))
    for row in frozen['pass6QAReports']:
        check('PASS6_frozen_QA_report_unchanged:' + row['name'], pin_ok(row, W))

def verify_baselines_and_backups():
    global baseline6
    recovery = collections.defaultdict(list)
    for rel, row in actual.items():
        if rel.startswith('recovery/'):
            recovery[(row['sha256'], row['bytes'])].append(rel)
    output = []
    for name, count, sha256 in BASELINES:
        path = W / name
        rows = document(path)
        check('frozen_inventory_identity:' + name, len(rows) == count and file_sha(path) == sha256, files=len(rows), sha256=file_sha(path))
        missing, changed = [], []
        for old in rows:
            rel = old['path']
            if rel not in actual:
                missing.append(rel)
            elif not same(rel, old['sha256'], old['bytes']):
                changed.append({'path': rel, 'previousSha256': old['sha256'], 'currentSha256': actual[rel]['sha256'], 'oldBytes': old['bytes'], 'exactRecovery': recovery[(old['sha256'], old['bytes'])]})
        check('no_deleted_paths_and_all_changed_bytes_recovered:' + name, not missing and all(row['exactRecovery'] for row in changed), missing=missing, changedFiles=len(changed), unrecovered=[row for row in changed if not row['exactRecovery']])
        output.append({'inventory': name, 'files': len(rows), 'missing': missing, 'changedWithExactRecovery': changed})
        if count == 10474:
            baseline6 = {row['path']: row for row in rows}
    measures['sevenHistoricalBaselines'] = output
    backup = document(R / 'recovery/pass7-before-source-integration/MANIFEST.json')
    paths = {'modules/unified-versus-v055.html', 'data/combat-sprite-catalog-v1.json', 'src/cqc-sprite-catalog.js', 'preparation/ALL_NATIVE_GENERATION_PRESERVATION.json'}
    check('four_before_integration_and_inventory_backups_match_PASS6_baseline', len(backup['files']) == 4 and {row['path'] for row in backup['files']} == paths and backup.get('baselineSha256') == BASELINES[-1][2] and all(row['sha256'] == baseline6[row['path']]['sha256'] and row['bytes'] == baseline6[row['path']]['bytes'] and same(row['backup'], row['sha256'], row['bytes']) for row in backup['files']))

def verify_native_sets(facts):
    old = json.loads(baseline_bytes('data/combat-sprite-catalog-v1.json'))['entries']
    new = document(R / 'data/combat-sprite-catalog-v1.json')['entries']
    check('22_PASS6_entry_objects_exact_plus_four_exact_UIDs', len(old) == 22 and all(new.get(uid) == entry for uid, entry in old.items()) and set(new) == set(old) | set(NEW_UID_FOLDERS), addedUIDs=sorted(set(new) - set(old)))
    old_paths = {frame['file'] for entry in old.values() for frame in frames(entry)}
    bad = [path for path in old_paths if not same(path, baseline6[path]['sha256'], baseline6[path]['bytes'])]
    check('132_PASS6_native_PNG_paths_and_bytes_exact', len(old_paths) == 132 and not bad, errors=bad)
    all_paths, all_poses, frame_bad = set(), set(), []
    for uid, entry in new.items():
        paths, poses = set(), set()
        for frame in frames(entry):
            rel = frame['file']
            paths.add(rel)
            poses.add((rel, tuple(frame['rect'])))
            ok = safe_path(rel) and same(rel, frame['sha256'])
            if ok:
                with (R / rel).open('rb') as stream:
                    header = stream.read(24)
                width, height = struct.unpack('>II', header[16:24])
                x, y, w, h = frame['rect']
                pivot = frame['pivot']
                ok = header[:8] == b'\x89PNG\r\n\x1a\n' and all(isinstance(v, (int, float)) and math.isfinite(v) for v in [x, y, w, h, *pivot]) and x >= 0 and y >= 0 and w > 0 and h > 0 and x + w <= width and y + h <= height and all(0 <= v <= 1 for v in pivot)
            if not ok:
                frame_bad.append({'uid': uid, 'file': rel, 'rect': frame['rect']})
        all_paths.update(paths)
        all_poses.update(poses)
        check('native_independent_facings_six_PNGs_72_poses:' + uid, len(paths) == 6 and len(poses) == 72 and entry.get('mirror') is False and bool(entry.get('actions')) and bool(entry.get('oppositeActions')), pngs=len(paths), poses=len(poses))
        check('all_ten_runtime_move_slots_have_both_native_facings:' + uid, set(entry.get('actionMap', {})) == MOVE_SLOTS and all(action in entry['actions'] and action in entry['oppositeActions'] for action in entry['actionMap'].values()))
    check('all_native_frames_have_valid_source_sha_rect_and_pivot', not frame_bad, errors=frame_bad)
    check('native_counts_26_sets_156_PNGs_1872_poses', len(new) == 26 and len(all_paths) == 156 and len(all_poses) == 1872, sets=len(new), pngs=len(all_paths), poses=len(all_poses))
    claims = facts.get('artistDeliverySHA256', {})
    physical = facts.get('producerPhysicalReviews', {})
    selected = []
    for uid, folder in NEW_UID_FOLDERS.items():
        path = W / 'cqc-pass7-generation' / folder / 'FINAL_DELIVERY.json'
        delivery = document(path)
        expected_sha = claims.get(folder, claims.get(uid))
        check('root_frozen_artist_delivery_identity:' + uid, bool(expected_sha) and file_sha(path) == expected_sha and delivery.get('uid') == uid, actualSha256=file_sha(path), expectedSha256=expected_sha)
        entry = new[uid]
        supplied = {'assets/combat-sprites/' + uid + '/' + row['key'] + '-v1.png': row['sha256'] for row in delivery['sourceFiles']}
        imported = {frame['file']: frame['sha256'] for frame in frames(entry)}
        check('immutable_artist_import_matches_source_maps:' + uid, supplied == imported and entry['actionMap'] == delivery['actionMap'] and entry['displayHeight'] == delivery['displayHeight'] and delivery.get('mirror') is False and all(entry.get('phaseMap', {}).get(k) == v for k, v in delivery.get('phaseMap', {}).items()))
        review = delivery.get('review', {})
        check('closest_supported_art_scope_and_limits_are_explicit:' + uid, review.get('status') == 'approved' and review.get('fidelityStatus') == 'closest_supported' and review.get('absolute1to1Certified') is False and bool(review.get('limits', delivery.get('limits'))), reviewStatus=review.get('status'), fidelityStatus=review.get('fidelityStatus'))
        proof = physical.get(uid, physical.get(folder, {}))
        common_physical = proof.get('physicallyObservedPoseCount') == 72 and proof.get('allSixSourceSheetsPhysicallyViewed') is True
        if uid == 'archive__skull_face':
            check('root_confirms_72_unarmed_hand_poses_physically_observed:' + uid, common_physical and proof.get('unarmed') is True and proof.get('muzzleApplicable') is False and proof.get('handsPhysicallyObserved') is True, rootClaim=proof)
        else:
            check('root_confirms_72_hands_and_muzzles_physically_observed:' + uid, common_physical and proof.get('handsAndMuzzlesPhysicallyObserved') is True, rootClaim=proof)
        for row in delivery['sourceFiles']:
            source, native = Path(row['source']), Path(row['nativeOriginal'])
            ok = source.is_file() and native.is_file() and file_sha(source) == file_sha(native) == row['sha256'] and source.stat().st_size == row['bytes'] and native.stat().st_size == row['bytes'] and same('assets/combat-sprites/' + uid + '/' + row['key'] + '-v1.png', row['sha256'], row['bytes'])
            selected.append({'uid': uid, 'sheet': row['key'], 'sha256': row['sha256'], 'nativeByteExact': ok})
        for reference in review.get('sources', []):
            filename = reference.get('file', reference.get('path'))
            if filename and reference.get('sha256'):
                check('source_reference_identity:' + uid + ':' + Path(filename).name, pin_ok({'path': filename, 'sha256': reference['sha256'], **({'bytes': reference['bytes']} if 'bytes' in reference else {})}, path.parent))
    check('all_24_new_source_PNGs_are_unedited_native_originals', len(selected) == len({row['sha256'] for row in selected}) == 24 and all(row['nativeByteExact'] for row in selected), sheets=selected)
    check('embedded_sprite_catalog_matches_actual_JSON', assignment((R / 'src/cqc-sprite-catalog.js').read_bytes(), 'CQC_COMBAT_SPRITE_CATALOG') == document(R / 'data/combat-sprite-catalog-v1.json'))
    measures['nativeSets'] = {'sets': len(new), 'nativePNGPaths': len(all_paths), 'distinctSourcePoseRects': len(all_poses), 'oldEntryObjects': len(old), 'newUIDs': sorted(NEW_UID_FOLDERS)}
    return new

def verify_generated_and_artist_preservation(facts):
    old_inventory = json.loads(baseline_bytes('preparation/ALL_NATIVE_GENERATION_PRESERVATION.json'))
    inventory = document(R / 'preparation/ALL_NATIVE_GENERATION_PRESERVATION.json')
    old_rows = {row['nativeFilename']: row for row in old_inventory['files']}
    rows = {row['nativeFilename']: row for row in inventory['files']}
    check('all_498_previous_native_generation_declarations_unchanged', len(old_rows) == 498 and all(rows.get(name) == row for name, row in old_rows.items()))
    actual_generated = {}
    bad = []
    for path in sorted((W / 'generated_images').glob('*.png')):
        current = {'sha256': file_sha(path), 'bytes': path.stat().st_size}
        actual_generated[path.name] = current
        declared = rows.get(path.name, {})
        if current['sha256'] != declared.get('sha256') or current['bytes'] != declared.get('bytes') or declared.get('pixelsEdited') is not False or not same(declared.get('preservedFile', ''), current['sha256'], current['bytes']):
            bad.append({'path': str(path), 'sha256': current['sha256'], 'declared': declared})
    check('all_generated_native_attempts_rejections_and_aliases_preserved', bool(actual_generated) and not bad and len(rows) == len(inventory['files']) == len(actual_generated) and set(rows) == set(actual_generated) and not inventory.get('additionalUnassignedFiles'), totalNativeFiles=len(actual_generated), errors=bad)
    prior = document(PASS6_REVIEW)['measures']['artistPreservation']['sourceFiles']
    old_bad = []
    for row in prior:
        source = Path(row['source'])
        if not source.is_file() or file_sha(source) != row['sha256'] or source.stat().st_size != row['bytes'] or not retained(row['sha256']):
            old_bad.append(row['source'])
    check('all_frozen_PASS6_artist_files_and_provenance_byte_exact', bool(prior) and not old_bad, oldArtistFiles=len(prior), errors=old_bad)
    artist_rows, new_bad, videos = [], [], []
    directories = [W / 'cqc-pass7-generation' / folder for folder in NEW_UID_FOLDERS.values()]
    directories += [Path(path) for path in facts.get('additionalArtistDirectories', [])]
    for directory in directories:
        if not directory.is_dir():
            new_bad.append({'path': str(directory), 'reason': 'Missing artist directory'})
            continue
        for path in sorted(directory.rglob('*')):
            if not path.is_file():
                continue
            row = {'source': str(path), 'bytes': path.stat().st_size, 'sha256': file_sha(path), 'retainedByteExactPaths': retained(file_sha(path))}
            if path.suffix.lower() in {'.mp4', '.mkv', '.webm'}:
                videos.append(row)
                continue
            artist_rows.append(row)
            if path.is_symlink() or not row['retainedByteExactPaths']:
                new_bad.append(row)
    check('all_PASS7_producer_prompts_sources_rejected_attempts_and_reviews_retained', bool(artist_rows) and not new_bad, artistFiles=len(artist_rows), errors=new_bad)
    measures['artistPreservation'] = {'oldArtistFiles': len(prior), 'newArtistFiles': artist_rows, 'nativeGenerationCount': len(actual_generated), 'oldNativeGenerationCount': len(old_rows), 'locallyRetainedReferenceVideos': videos}

def verify_native_physical_review(facts):
    pin = facts.get('nativePhysicalReview', {
        'path': '/workspace/cqc-pass7-native-browser-physical-review.json',
        'sha256': '91fe30da90840427c691a311cd6d7e4bd5f26b63b0d5b4b53adcf07ca932cfec',
    })
    path = Path(pin['path'])
    physical = document(path)
    check('root_final_native_physical_review_identity', pin_ok(pin, W) and pin.get('sha256') == '91fe30da90840427c691a311cd6d7e4bd5f26b63b0d5b4b53adcf07ca932cfec' and bool(retained(pin['sha256'])), path=str(path), sha256=file_sha(path))
    check('24_final_Canvas_charts_288_complete_native_poses_physically_observed', physical.get('status') == 'passed' and physical.get('catalogSHA256') == actual['data/combat-sprite-catalog-v1.json']['sha256'] and physical.get('physicallyViewedNativeCharts') == 24 and physical.get('physicallyViewedCompleteSourcePoses') == 288 and physical.get('nativePNGEdited') is False and physical.get('historicalRendererChanged') is False and not physical.get('pageErrors') and physical.get('browserClosed') is True)
    charts = physical.get('charts', [])
    errors = []
    counts = {uid: 0 for uid in NEW_UID_FOLDERS}
    for chart in charts:
        source = Path(chart['path'])
        if chart.get('physicallyViewed') is not True or chart.get('completePoses') != 12 or not pin_ok(chart, W) or not retained(chart['sha256']):
            errors.append(chart)
        for uid in counts:
            if source.name.startswith('native-frames-' + uid + '-'):
                counts[uid] += 1
    check('all_24_physically_reviewed_chart_bytes_preserved_six_per_UID', len(charts) == 24 and all(count == 6 for count in counts.values()) and not errors, perUID=counts, errors=errors)
    trace_path = Path(physical['verificationLog'])
    trace = document(trace_path)
    check('native_physical_review_raw_402_browser_commands_verified', file_sha(trace_path) == physical['verificationLogSHA256'] and bool(retained(physical['verificationLogSHA256'])) and len(trace) == physical.get('browserCommands') == physical.get('successfulCommands') == 402 and all(row.get('exit') == 0 and row.get('result', {}).get('success') is True for row in trace), browserCommands=len(trace))
    measures['nativePhysicalReview'] = {'path': str(path), 'sha256': file_sha(path), 'physicallyViewedCanvasCharts': len(charts), 'completeNativePoses': sum(chart.get('completePoses', 0) for chart in charts), 'perUID': counts, 'browserTraceSHA256': physical['verificationLogSHA256']}

def verify_raw_sources_stages_and_engine(catalog):
    unchanged = [
        'data/unified-roster-v053.json', 'data/finishers-v046.json', 'data/finishers-v050.json', 'data/finishers-v051.json', 'data/finishers-v053.json',
        'data/chronicles-v056.json', 'data/plate-catalog-illustrated-v056.json', 'data/stage-layer-catalog-reprise.json', 'data/portrait-atlas-v056.json',
        'src/cqc-sprite-renderer.js', 'tools/prepare_combat_sprite.py', 'tools/inspect_combat_sprite_sheet.py',
        'src/cqc-pass5-native-origins.js', 'src/cqc-pass5-combat-fidelity.js', 'src/cqc-pass5-prop-data.js', 'src/cqc-pass5-prop-art.js',
        'src/cqc-pass6-native-origins.js', 'src/cqc-pass6-combat-fidelity.js', 'src/cqc-pass6-prop-data.js', 'src/cqc-pass6-prop-art.js',
    ]
    for rel in unchanged:
        old = baseline6[rel]
        check('historical_source_byte_exact:' + rel, same(rel, old['sha256'], old['bytes']))
    fighters = document(R / 'data/unified-roster-v053.json')['fighters']
    finishers = document(R / 'data/finishers-v053.json')
    fin_count = sum(len(profile['finishers']) for profile in finishers['profiles'].values())
    check('354_raw_fighters_and_1416_raw_finishers_unchanged', len(fighters) == 354 and len(finishers['profiles']) == 354 and fin_count == 1416, fighters=len(fighters), finishers=fin_count)
    stories = document(R / 'data/chronicles-v056.json')['stories']
    routes = sum(len(story['route']) for story in stories.values())
    paragraphs = sum(len([part for part in re.split(r'\n\s*\n', card['text']) if part.strip()]) for story in stories.values() for phase in ('intro', 'outro') for card in story[phase])
    check('354_stories_2832_routes_4248_paragraphs_unchanged', len(stories) == 354 and routes == 2832 and paragraphs == 4248, stories=len(stories), routes=routes, paragraphs=paragraphs)
    plates = document(R / 'data/plate-catalog-illustrated-v056.json')
    painting_count = sum(bool(value.get('fullScene')) for value in plates.values())
    painting_bad = [value['file'] for value in plates.values() if not same(value['file'], baseline6[value['file']]['sha256'], baseline6[value['file']]['bytes'])]
    check('486_paintings_and_all_previous_plate_images_unchanged', painting_count == 486 and not painting_bad, fullScenePaintings=painting_count, errors=painting_bad)
    stages = document(R / 'data/stage-layer-catalog-reprise.json')['stages']
    layers = [layer for stage in stages for layer in stage['layers']]
    references = [ref for stage in stages for ref in stage.get('references', [])]
    stage_bad = [row['file'] for row in layers + references if not same(row['file'], row['sha256'])]
    check('all_30_stages_126_layers_57_references_unchanged', len(stages) == 30 and len(layers) == 126 and len({row['file'] for row in references}) == 57 and not stage_bad, stages=len(stages), layers=len(layers), errors=stage_bad)
    for rel, variable, data_rel in [
        ('src/chronicles-data-v056.js', 'CQC55_DATA', 'data/chronicles-v056.json'),
        ('src/chronicles-plate-data-v056.js', 'CQC56_PLATE_CATALOG', 'data/plate-catalog-illustrated-v056.json'),
        ('src/cqc-stage-layer-data.js', 'CQC_STAGE_LAYER_DATA', 'data/stage-layer-catalog-reprise.json'),
    ]:
        check('embedded_catalog_matches_live_JSON:' + rel, assignment((R / rel).read_bytes(), variable) == document(R / data_rel))
    html = (R / 'modules/unified-versus-v055.html').read_bytes()
    def engine(raw):
        scripts = re.findall(r'<script(?:\s[^>]*)?>([\s\S]*?)</script>', raw.decode(), re.I)
        return next(script for script in scripts if 'function spawn(' in script and 'function destroyObjects(' in script)
    before, after = engine(baseline_bytes('modules/unified-versus-v055.html')), engine(html)
    check('complete_inline_physics_engine_byte_exact', before == after and digest(after.encode()) == ENGINE_SHA, engineSHA256=digest(after.encode()))
    hooks = ['src/cqc-pass7-combat-fidelity.js', 'src/cqc-pass7-native-origins.js']
    check('new_PASS7_helpers_reachable_from_live_versus', all(('../' + rel).encode() in html for rel in hooks), helpers=hooks)
    measures['unchangedSources'] = {'rawFighters': len(fighters), 'rawFinishers': fin_count, 'stories': len(stories), 'routes': routes, 'paragraphs': paragraphs, 'paintings': painting_count, 'stages': len(stages), 'engineSha256': digest(after.encode())}

def verify_source_marks(facts, catalog):
    rel = 'preparation/combat-sprites-pass7/SOURCE_COMBAT_ORIGINS.json'
    data = document(R / rel)
    expected_pin = facts.get('sourceCombatOrigins', {})
    check('root_frozen_combat_source_mark_file_identity', bool(expected_pin.get('sha256')) and same(rel, expected_pin['sha256'], expected_pin.get('bytes')))
    marks, bad = [], []
    for uid, actions in data.get('entries', {}).items():
        for action, views in actions.items():
            for view, mark in views.items():
                ok = uid in NEW_UID_FOLDERS and view in {'right', 'left'} and mark.get('physicallyViewed') is True
                entry = catalog[uid]
                side = entry['actions'] if (1 if view == 'right' else -1) == entry['facing'] else entry['oppositeActions']
                source_frames = side.get(mark.get('action', action), {}).get('frames', [])
                frame_number = mark.get('frame', -1)
                ok = ok and isinstance(frame_number, int) and 0 <= frame_number < len(source_frames)
                if ok:
                    frame = source_frames[frame_number]
                    ok = mark.get('file') == frame['file'] and mark.get('sha256') == frame['sha256'] and mark.get('rect') == frame['rect'] and mark.get('pivot') == frame['pivot']
                    point = mark.get('point', [])
                    if len(point) != 2 or not all(isinstance(v, (int, float)) and math.isfinite(v) for v in point):
                        ok = False
                    else:
                        with Image.open(R / frame['file']) as image:
                            px, py = map(round, point)
                            in_image = 0 <= px < image.width and 0 <= py < image.height
                            alpha = image.getpixel((px, py))[-1] if in_image and image.mode == 'RGBA' else (255 if in_image else 0)
                            ok = ok and in_image and alpha > 0 and alpha == mark.get('sourcePixelAlpha')
                        x, y, w, h = frame['rect']
                        ok = ok and x <= point[0] < x + w and y <= point[1] < y + h
                        source_height = mark.get('sourceFrameHeight', 0)
                        if not isinstance(source_height, (int, float)) or source_height <= 0:
                            ok = False
                        else:
                            scale = entry['displayHeight'] / source_height * 1.12
                            expected_forward = (point[0] - x - frame['pivot'][0] * w) * scale * (1 if view == 'right' else -1)
                            expected_height = (y + frame['pivot'][1] * h - point[1]) * scale
                            ok = ok and math.isclose(expected_forward, mark.get('adaptedWorldForward', math.inf), abs_tol=1e-6) and math.isclose(expected_height, mark.get('adaptedWorldHeight', math.inf), abs_tol=1e-6)
                row = {'uid': uid, 'action': action, 'facing': view, 'mark': mark, 'verified': bool(ok)}
                marks.append(row)
                if not ok:
                    bad.append(row)
    expected_counts = {'core__raven': 6, 'core__quiet': 6, 'core__old_snake': 4}
    actual_counts = dict(collections.Counter(mark['uid'] for mark in marks))
    check('16_physically_reviewed_native_directional_projectile_marks', len(marks) == 16 and not bad and actual_counts == expected_counts and set(data.get('entries', {})) == set(expected_counts) and not data.get('pendingUIDs'), markCount=len(marks), expectedCounts=expected_counts, actualCounts=actual_counts, noSkullFaceInventedMuzzle='archive__skull_face' not in data.get('entries', {}), errors=bad)
    check('runtime_native_origin_marks_match_frozen_JSON', assignment((R / 'src/cqc-pass7-native-origins.js').read_bytes(), 'CQC_PASS7_NATIVE_ORIGINS') == data['entries'])
    measures['sourceCombatOrigins'] = {'file': rel, 'sha256': actual[rel]['sha256'], 'markCount': len(marks), 'marks': marks}

def git(*arguments):
    result = subprocess.run(['git', '-C', str(S), *arguments], stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=True)
    return result.stdout

def verify_runtime_and_git(facts):
    root = S / 'public/cqc'
    manifest_path = root / 'runtime-manifest.json'
    manifest = document(manifest_path)
    rows = manifest['files']
    table = {row['path']: row for row in rows}
    errors, transformations = [], []
    for row in rows:
        rel = row['path']
        path = root / rel
        ok = safe_path(rel) and rel.split('/')[0] not in EXCLUDED_RUNTIME_ROOTS and path.is_file() and not path.is_symlink() and path.stat().st_size == row['bytes'] and file_sha(path) == row['sha256'] and rel in actual
        if not ok:
            errors.append({'path': rel, 'reason': 'Unsafe, missing or incorrect runtime/source payload'})
            continue
        if row.get('transformation'):
            transformations.append({'path': rel, 'transformation': row['transformation']})
            if row.get('sourceSha256') != actual[rel]['sha256']:
                errors.append({'path': rel, 'reason': 'Transformed input SHA changed'})
            if rel == 'index.html':
                expected = re.sub(r'''\.toLowerCase\(\)\.includes\((['"])cqc\1\)''', ".toLowerCase().startsWith('cqc')", (R / rel).read_text()).encode()
                if path.read_bytes() != expected:
                    errors.append({'path': rel, 'reason': 'Namespace transformation differs'})
            elif rel == 'modules/atelier-v056.html':
                if path.read_bytes() != git('show', PASS6_COMMIT + ':public/cqc/' + rel):
                    errors.append({'path': rel, 'reason': 'Known PASS6 web workshop template differs'})
            else:
                errors.append({'path': rel, 'reason': 'Unexpected runtime transformation'})
        elif row['sha256'] != actual[rel]['sha256'] or row['bytes'] != actual[rel]['bytes']:
            errors.append({'path': rel, 'reason': 'Standalone and Shadow source bytes differ'})
    check('every_runtime_payload_byte_matches_standalone_source', len(table) == len(rows) and not errors and sum(row['bytes'] for row in rows) == manifest['totalBytes'], files=len(rows), runtimeBytes=manifest['totalBytes'], errors=errors)
    check('only_two_historical_HTML_runtime_transformations', sorted(transformations, key=lambda row: row['path']) == [{'path': 'index.html', 'transformation': 'cqc-save-namespace'}, {'path': 'modules/atelier-v056.html', 'transformation': 'web-only-workshop'}], transformations=transformations)
    edges = manifest.get('references', [])
    bad_edges = [edge for edge in edges if edge['from'] not in table or edge['to'] not in table]
    reached = {'index.html'}
    while True:
        next_reached = reached | {edge['to'] for edge in edges if edge['from'] in reached}
        if reached == next_reached:
            break
        reached = next_reached
    check('runtime_reference_graph_closed_and_every_file_reachable', not bad_edges and reached == set(table), edges=len(edges), unreachable=sorted(set(table) - reached), invalidEdges=bad_edges)
    expected_sha = facts.get('runtimeManifestSha256', facts.get('runtimeManifestSHA256'))
    check('runtime_manifest_matches_root_frozen_pin', bool(expected_sha) and file_sha(manifest_path) == expected_sha, actualSha256=file_sha(manifest_path), expectedSha256=expected_sha)
    check('original_main_branch_preserved', git('rev-parse', 'main').decode().strip() == MAIN_COMMIT)
    check('previous_reprise_branch_preserved', git('rev-parse', 'reprise/2026-10-01').decode().strip() == OLD_BRANCH_COMMIT)
    check('published_PASS6_native_checkpoint_preserved', git('rev-parse', 'reprise/2026-10-02-pass6-native-checkpoint').decode().strip() == PASS6_COMMIT)
    deleted = [line for line in git('diff', '--name-status', PASS6_COMMIT).decode().splitlines() if line.startswith('D\t')]
    check('no_PASS6_tracked_Git_paths_deleted', not deleted, deleted=deleted)
    candidate = facts.get('localCommit', facts.get('publicationCommit'))
    if candidate:
        parents = git('rev-list', '--parents', '-n', '1', candidate).decode().strip().split()
        check('new_publication_commit_has_exact_single_PASS6_parent', parents == [candidate, PASS6_COMMIT], commit=candidate, parents=parents[1:])
    else:
        check('publication_parent_anchor_available', facts.get('publicationParentCommit', PASS6_COMMIT) == PASS6_COMMIT and bool(git('cat-file', '-p', PASS6_COMMIT)))
    measures['runtime'] = {'manifest': str(manifest_path), 'manifestSha256': file_sha(manifest_path), 'files': len(rows), 'bytes': manifest['totalBytes'], 'referenceEdges': len(edges), 'transformations': transformations}
    measures['git'] = {'main': MAIN_COMMIT, 'PASS6Commit': PASS6_COMMIT, 'previousRepriseBranch': OLD_BRANCH_COMMIT, 'candidatePASS7Commit': candidate, 'publicationClaimMade': False}

def verify_qa(facts):
    paths = facts.get('qaPaths', {})
    check('all_required_fresh_QA_kinds_declared', QA_REQUIRED <= set(paths), required=sorted(QA_REQUIRED), declared=sorted(paths))
    output = {}
    for kind, value in paths.items():
        row = {'path': value} if isinstance(value, str) else value
        path = Path(row['path'])
        exists = path.is_file()
        check('fresh_QA_report_exists:' + kind, exists, path=str(path))
        if not exists:
            continue
        data = document(path)
        sha256 = file_sha(path)
        check('root_frozen_QA_report_identity:' + kind, bool(row.get('sha256')) and sha256 == row['sha256'], actualSha256=sha256, expectedSha256=row.get('sha256'))
        status = data.get('status')
        accepted = status in {'passed', 'accepted_closest', 'accepted_closest_supported'} or (kind == 'core' and data.get('passedAllChecks') is True)
        declared_failures = data.get('failureCount', data.get('failures', 0))
        check('fresh_QA_report_passed_without_failures:' + kind, accepted and not declared_failures and not data.get('exception'), status=status, failureValue=declared_failures)
        found_rows = data.get('checks', data.get('assertions', []))
        if found_rows:
            check('all_individual_QA_checks_passed:' + kind, all(check_row.get('passed', check_row.get('ok')) is True for check_row in found_rows), actualChecks=len(found_rows))
        if row.get('expectedChecks') is not None:
            check('root_expected_actual_QA_check_count:' + kind, len(found_rows) == row['expectedChecks'], actualChecks=len(found_rows), expectedChecks=row['expectedChecks'])
        check('fresh_QA_report_copy_preserved_in_standalone_source:' + kind, bool(retained(sha256)), sourceCopies=retained(sha256))
        for field in ('sourceInputsSHA256', 'productionInputSHA', 'sourceInputsSha256', 'inputShaAfter', 'verifiedSpriteInputs', 'reviewedProductionFiles', 'rawHistoricalCatalogs'):
            pins = data.get(field)
            if pins:
                pins = [{'path': key, 'sha256': value} for key, value in pins.items()] if isinstance(pins, dict) else pins
                check('QA_current_production_input_pins:' + kind + ':' + field, all(pin_ok(pin) for pin in pins), pinCount=len(pins))
        commands = data.get('commands')
        if commands:
            check('every_actual_browser_command_succeeded:' + kind, all(command.get('exit') == 0 and command.get('result', {}).get('success') is True for command in commands), commands=len(commands))
        if kind == 'core':
            suites, bad = data.get('suites', []), []
            total, passed = 0, 0
            for suite in suites:
                total += suite['tests']; passed += suite['passed']
                if not Path(suite['test']).is_file() or file_sha(suite['test']) != suite['testSourceSha256'] or suite['exitCode'] != 0 or suite.get('failed', 0) or suite.get('timedOut') or suite.get('suiteSucceeded') is not True:
                    bad.append(suite['test'])
                for log_field, sha_field in (('stdoutLog', 'stdoutSha256'), ('stderrLog', 'stderrSha256')):
                    log = Path(suite[log_field])
                    if not log.is_file() or file_sha(log) != suite[sha_field]:
                        bad.append(str(log))
            check('fresh_core_suite_sources_and_actual_logs_verified', bool(suites) and len({suite['test'] for suite in suites}) == len(suites) and total == passed and total >= 1227 and not bad, suites=len(suites), totalTests=total, passedTests=passed, errors=bad)
            check('historical_QA_reports_restored_and_inputs_stable_during_core', data.get('allHistoricalReportsRestoredByteExact') is True and data.get('inputsUnchangedDuringRun') is True and data.get('inputShaBefore') == data.get('inputShaAfter'))
            restorations = data.get('reportRestoration', [])
            check('seven_historical_QA_reports_still_byte_exact', len(restorations) == 7 and all(record.get('restoredByteExact') is True and Path(record.get('file', record.get('path', ''))).is_file() and file_sha(record.get('file', record.get('path', ''))) == record.get('sha256', record.get('beforeSha256')) for record in restorations))
        if kind == 'shadowNpm':
            log = Path(data['log']); text = re.sub(r'\x1b\[[0-?]*[ -/]*[@-~]', '', log.read_text(errors='replace')) if log.is_file() else ''
            tests = re.search(r'(?<!File)Tests\s+(\d+) passed\s*\((\d+)\)', text)
            files = re.search(r'Test Files\s+(\d+) passed\s*\((\d+)\)', text)
            counts = data['testCounts']
            correct = tests is not None and files is not None and int(tests.group(1)) == int(tests.group(2)) == counts['passedTests'] == counts['totalTests'] and int(files.group(1)) == int(files.group(2)) == counts['passedFiles'] == counts['totalFiles']
            check('fresh_Shadow_npm_actual_log_tests_types_build_PWA_verified', data.get('freshRun') is True and data.get('oldQAResultsReused') is False and data.get('exitCode') == 0 and log.is_file() and file_sha(log) == data.get('logSHA256') and correct and all(data.get('stepsObserved', {}).values()), testCounts=counts)
            check('Shadow_npm_uses_current_runtime_payload', data.get('runtime', {}).get('manifestSHA256') == measures['runtime']['manifestSha256'] and data.get('runtime', {}).get('inputPayloadSHA256StableDuringQA') is True)
        if kind in {'standaloneBrowser', 'shadowBrowser'}:
            console = [message for message in (data.get('console') or {}).get('messages', []) if message.get('type') == 'error']
            check('live_browser_console_page_errors_empty_and_owned_sessions_cleaned:' + kind, not (data.get('pageErrors') or {}).get('errors') and not console and bool(data.get('cleanup')) and all(data['cleanup'].values()), cleanup=data.get('cleanup'), consoleErrors=console)
            if kind == 'shadowBrowser':
                preflight = data.get('assetPreflight', {})
                check('Shadow_browser_uses_current_graph_pin', preflight.get('manifestSHA256') == measures['runtime']['manifestSha256'] and preflight.get('runtimeFiles') == measures['runtime']['files'] and preflight.get('allCopiedBytesVerified') is True)
        output[kind] = {'path': str(path), 'sha256': sha256, 'status': status, 'checks': len(found_rows)}
    measures['freshFinalQA'] = output

def main():
    global actual
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--execute', action='store_true')
    parser.add_argument('--facts', type=Path, default=W / 'cqc-pass7-final-source-review-facts.json')
    parser.add_argument('--output', type=Path, default=W / 'cqc-pass7-preservation-review.json')
    args = parser.parse_args()
    if not args.execute:
        print(json.dumps({
            'status': 'plan_only', 'requiresExplicitRootGO': True,
            'facts': str(args.facts), 'output': str(args.output),
            'productionMutations': False, 'GitMutations': False,
            'historicalBaselines': [{'file': name, 'files': count, 'sha256': sha256} for name, count, sha256 in BASELINES],
            'historicalArchivePins': 46, 'archiveCRCPolicy': 'Full SHA256 check then reuse exact PASS6 CRC proof; no repeated decompression.',
            'expectedNativeCounts': {'sets': 26, 'PNG': 156, 'poses': 1872, 'oldObjects': 22, 'oldPNG': 132},
            'requiredFacts': {
                'confirmedByRoot': True, 'sourceState': 'frozen',
                'artistDeliverySHA256': {folder: '<SHA256 FINAL_DELIVERY.json>' for folder in NEW_UID_FOLDERS.values()},
                'producerPhysicalReviews': {uid: {'physicallyObservedPoseCount': 72, 'allSixSourceSheetsPhysicallyViewed': True, **({'unarmed': True, 'muzzleApplicable': False, 'handsPhysicallyObserved': True} if uid == 'archive__skull_face' else {'handsAndMuzzlesPhysicallyObserved': True})} for uid in NEW_UID_FOLDERS},
                'nativePhysicalReview': {'path': '/workspace/cqc-pass7-native-browser-physical-review.json', 'sha256': '91fe30da90840427c691a311cd6d7e4bd5f26b63b0d5b4b53adcf07ca932cfec', 'physicallyViewedNativeCharts': 24, 'physicallyViewedCompleteSourcePoses': 288},
                'sourceCombatOrigins': {'path': 'preparation/combat-sprites-pass7/SOURCE_COMBAT_ORIGINS.json', 'sha256': '<SHA256>', 'bytes': '<actual bytes>'},
                'runtimeManifestSha256': '<SHA256 S/public/cqc/runtime-manifest.json>',
                'qaPaths': {kind: {'path': '<report>', 'sha256': '<SHA256>', 'expectedChecks': '<optional actual count>'} for kind in sorted(QA_REQUIRED)},
                'publicationParentCommit': PASS6_COMMIT,
                'additionalArtistDirectories': [],
            },
        }, ensure_ascii=False, indent=2))
        return
    if not args.facts.is_file():
        raise RuntimeError('Root final frozen facts missing; final review may not begin')
    facts = document(args.facts)
    if facts.get('confirmedByRoot') is not True or facts.get('sourceState') != 'frozen':
        raise RuntimeError('Root must explicitly confirm frozen source before final review')
    if args.output.exists():
        raise FileExistsError('Preserve existing review; select a fresh --output path')
    started, exception = datetime.now(timezone.utc).isoformat(), None
    try:
        print('Indexing frozen standalone source; no content mutations.', flush=True)
        actual = source_index(R)
        for rel, row in actual.items():
            by_sha[row['sha256']].append(rel)
        check('standalone_source_has_no_symbolic_links', not [rel for rel, row in actual.items() if row['symlink']])
        runtime_before = source_index(S / 'public/cqc')
        refs_before = git('show-ref', '--heads')
        verify_archives_and_previous_qa()
        verify_baselines_and_backups()
        catalog = verify_native_sets(facts)
        verify_native_physical_review(facts)
        verify_generated_and_artist_preservation(facts)
        verify_raw_sources_stages_and_engine(catalog)
        verify_source_marks(facts, catalog)
        verify_runtime_and_git(facts)
        verify_qa(facts)
        print('Rehashing reviewed source and runtime to verify read-only stability.', flush=True)
        after = source_index(R)
        changed = sorted(rel for rel in set(actual) | set(after) if actual.get(rel) != after.get(rel))
        check('all_standalone_paths_and_bytes_stable_during_review', not changed, changed=changed)
        runtime_after = source_index(S / 'public/cqc')
        runtime_changed = sorted(rel for rel in set(runtime_before) | set(runtime_after) if runtime_before.get(rel) != runtime_after.get(rel))
        check('all_Shadow_runtime_paths_and_bytes_stable_during_review', not runtime_changed, changed=runtime_changed)
        check('Git_branch_refs_stable_during_read_only_review', refs_before == git('show-ref', '--heads'))
    except Exception as error:
        exception = traceback.format_exc()
        check('review_completed_without_exception', False, error=repr(error))
        print(exception, flush=True)
    report = {
        'schema': 'cqc.pass7.independent-source-preservation-review/1',
        'status': 'failed' if failures else 'passed', 'reviewer': 'pass7_disk_preservation',
        'startedAt': started, 'finishedAt': datetime.now(timezone.utc).isoformat(),
        'readOnlyProductionAndArchives': True, 'productionMutations': False, 'GitMutations': False,
        'rootFrozenFacts': str(args.facts), 'rootFrozenFactsSha256': file_sha(args.facts),
        'script': str(Path(__file__).resolve()), 'scriptSha256': file_sha(__file__),
        'assertionCount': len(checks), 'failureCount': len(failures), 'failures': failures,
        'exception': exception, 'measures': measures, 'assertions': checks,
        'limits': [
            'This report verifies byte preservation, imports, provenance and pinned fresh QA. It does not certify absolute original-game pixel, animation or geometry fidelity.',
            'The root and producer physical inspection declarations are pinned and checked; the read-only Python reviewer does not itself observe images visually.',
            'Each historical archive is fully SHA256-checked. The independent PASS6 CRC result is reused only when exactly the same pinned bytes remain.',
            'No deployment, new ZIP package or GitHub publication is claimed by this local preservation review.',
        ],
    }
    with args.output.open('x') as stream:
        stream.write(json.dumps(report, ensure_ascii=False, indent=2) + '\n')
    print(json.dumps({'status': report['status'], 'output': str(args.output), 'sha256': file_sha(args.output), 'assertions': len(checks), 'failures': len(failures), 'productionMutations': False}, ensure_ascii=False, indent=2), flush=True)
    if failures:
        raise SystemExit(1)

if __name__ == '__main__':
    main()
