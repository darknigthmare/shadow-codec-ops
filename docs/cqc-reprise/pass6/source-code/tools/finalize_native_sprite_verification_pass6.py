#!/usr/bin/env python3
"""Combine fresh tool logs, real browser observations and recorded physical review."""
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PREP = ROOT / 'preparation/combat-sprites-pass6'
UIDS = ['core__pain', 'core__fear', 'core__end', 'core__fury']
SHA = lambda raw: hashlib.sha256(raw).hexdigest()
physical = {
    'core__pain': 'All six rendered Canvas contact sheets and all 72 complete bodies physically viewed: black masked first-phase balaclava, charcoal long sleeves/gloves/boots, ochre cartridge vest and bag retained. No physical firearm, oral phase-two attack, aura or opaque backdrop in body sources. Native crops and contours suppress neighboring bodies without cutting hands, boots or equipment. Lean/crouch/KO retain their shorter native posture and meaningful cyan ground pivots.',
    'core__fear': 'All six rendered Canvas contact sheets and all 72 complete bodies physically viewed and compared with the separately physically viewed eight original model-era references: full brown/olive long-sleeve striped fatigues, slick black hair/white temples, dark chest block, pouch, gloves and boots. Short shoot and longer charge crossbows remain distinct. Complete rails/limbs and crouch/KO poses render without source neighbors, opaque dark RGB or fixed-height stretching. Weapon naming, hidden joints and far-side hand/hip surfaces remain source-limited.',
    'core__end': 'All six rendered Canvas contact sheets and all 72 complete elderly bodies physically viewed: bald painted scalp, headset, white beard, flat leaf camouflage, bare hands, boots, perched parrot and same conventional wooden scoped Mosin complete. Independent facing-left sources point the actual rifle left. Upright source scale excludes the parrot above the human head; crouch, lean and fallen bodies remain short. No neighboring fragments or opaque background visible.',
    'core__fury': 'All six rendered Canvas contact sheets and all 72 complete cosmonaut bodies physically viewed: closed dark bronze visor, ribbed black suit, complete gloves/boots, pale paired back cylinders, hose, transverse booms and flame tube. Independently authored facings point the tube correctly without mirroring. Heavy/KO contours omit neighboring figures without cutting equipment. Native transparent gray RGB remains invisible. Fine lettering and hidden pipe/finger details remain closest-supported.'
}

catalog = json.loads((ROOT / 'data/combat-sprite-catalog-v1.json').read_text())
frozen = json.loads((ROOT / 'recovery/pass6-before-native-sprite-integration/FROZEN_PASS5_SPRITES.json').read_text())
assert len(catalog['entries']) == 22
for uid, entry in frozen['existingEntries'].items():
    assert catalog['entries'][uid] == entry, uid
for row in frozen['existingPNGFiles']:
    raw = (ROOT / row['path']).read_bytes()
    assert len(raw) == row['bytes'] and SHA(raw) == row['sha256'], row['path']
for row in frozen['files']:
    raw = (ROOT / row['backup']).read_bytes()
    assert len(raw) == row['bytes'] and SHA(raw) == row['sha256'], row['backup']
    if row['path'] not in ['data/combat-sprite-catalog-v1.json', 'src/cqc-sprite-catalog.js']:
        assert (ROOT / row['path']).read_bytes() == raw, row['path']

tool_path = PREP / 'tool-qa-20261002-individual-counts/verification.json'
tools = json.loads(tool_path.read_text())
assert tools['success'] and tools['tests'] == 39
browser_dir = PREP / 'browser-qa/p6final-d/standalone'
browser_path = browser_dir / 'verification.json'
rows = json.loads(browser_path.read_text())
assert all(row['exit'] == 0 and row['result'].get('success') is not False for row in rows)
assert rows[-1]['command'] == 'close' and rows[-2]['command'] == 'errors'
assert all(not row['result'].get('data', {}).get('errors') for row in rows if row['command'] == 'errors')
results = [row['result'].get('data', {}).get('result') for row in rows if row['command'] == 'eval']
techniques = [value for value in results if isinstance(value, dict) and 'samples' in value]
states = [value for value in results if isinstance(value, dict) and 'state' in value and 'actual' in value]
contacts = [value for value in results if isinstance(value, list) and len(value) == 12 and all(isinstance(pose, dict) and 'reviewBounds' in pose for pose in value)]
assert len(techniques) == 160 and sum(len(row['samples']) for row in techniques) == 480
assert len(states) == 112 and len(contacts) == 24
assert sum(len(row) for row in contacts) == 288
assert all(pose['frameFullyInsideCell'] and pose['nativeFacingWithoutMirror'] for row in contacts for pose in row)
captures = sorted(browser_dir.glob('*.png'))
assert len(captures) == 73
unused = [pose for row in contacts for pose in row if pose['poseSelection'] == 'review-only-unused-source-group']
assert len(unused) == 2 and all(pose['uid'] == 'core__pain' and pose['action'] == 'optic' for pose in unused)
origins_path = PREP / 'SOURCE_COMBAT_ORIGINS.json'
origins = json.loads(origins_path.read_text())
assert not origins['pendingUIDs']
assert sum(len(sides) for groups in origins['entries'].values() for sides in groups.values()) == 16

inputs = [ROOT / 'data/combat-sprite-catalog-v1.json', ROOT / 'src/cqc-sprite-catalog.js',
          ROOT / 'src/cqc-sprite-renderer.js', ROOT / 'src/cqc-pass6-native-origins.js',
          ROOT / 'modules/unified-versus-v055.html', origins_path,
          PREP / 'frame-review.html', ROOT / 'tools/verify_combat_sprites_pass6_browser.py']
all_files, all_poses = set(), set()
per_uid = []
for uid, entry in catalog['entries'].items():
    frames = [frame for action in [*entry['actions'].values(), *entry['oppositeActions'].values()] for frame in action['frames']]
    all_files.update(frame['file'] for frame in frames)
    all_poses.update((uid, frame['file'], tuple(frame['rect'])) for frame in frames)
    if uid not in UIDS:
        continue
    native_files = sorted({frame['file'] for frame in frames})
    assert len(native_files) == 6 and entry['mirror'] is False
    for file in native_files:
        inputs.append(ROOT / file)
        expected = next(frame['sha256'] for frame in frames if frame['file'] == file)
        assert SHA((ROOT / file).read_bytes()) == expected
    own_techniques = [row for row in techniques if row['uid'] == uid]
    own_states = [row for row in states if row['uid'] == uid]
    own_contacts = [row for row in contacts if row[0]['uid'] == uid]
    assert len(own_techniques) == 40 and len(own_states) == 28 and len(own_contacts) == 6
    per_uid.append({'uid': uid, 'status': 'passed', 'actualTechniqueViewportFacingCombinations': 40,
                    'actualTechniqueStartsAndPhaseSamples': 120, 'actualStateSamples': 28,
                    'nativeCanvasContactSheets': 6, 'nativeCanvasPoseObservations': 72,
                    'physicallyViewedAllSixCanvasContactSheets': True,
                    'physicalReview': physical[uid],
                    'verifiedEntrySHA256': SHA(json.dumps(entry, sort_keys=True, separators=(',', ':'), ensure_ascii=False).encode()),
                    'verifiedEntrySerialization': 'UTF8 JSON sorted keys, separators comma/colon, ensure_ascii=False'})
assert len(all_files) == 132 and len(all_poses) == 1584
input_manifest = [{'path': str(path.relative_to(ROOT)), 'bytes': path.stat().st_size, 'sha256': SHA(path.read_bytes())} for path in sorted(set(inputs))]
report = {
    'schema': 'cqc.pass6-native-sprite-runtime-verification/1', 'status': 'passed',
    'newUIDs': UIDS, 'canonicalOriginalModelEraMGS3NewCharacters': 4,
    'newIndependentNativePNG': 24, 'newUniqueAuthoredPoses': 288,
    'totalApprovedEntries': 22, 'totalNativePNG': 132, 'totalUniqueAuthoredPoses': 1584,
    'oldEighteenEntryObjectsExact': True, 'oldOneHundredEightNativePNGBytesExact': True,
    'oldRendererImporterInspectorPASS5HelperBytesExact': True,
    'beforeSourceSnapshotsExact': True,
    'testResults': {'nodePassed': 29, 'pythonImporterPassed': 8, 'pythonBodyContourPassed': 2,
                    'totalPassed': 39, 'verification': str(tool_path.relative_to(ROOT)), 'verificationSHA256': SHA(tool_path.read_bytes())},
    'standaloneActualBrowser': {'browserCommands': len(rows), 'distinctTechniqueViewportFacingCombinations': 160,
                                'actualTechniqueStartsAndPhaseSamples': 480, 'actualStateSamples': 112,
                                'nativeCanvasContactSheets': 24, 'nativeCanvasPoseObservations': 288,
                                'reviewOnlyUnusedSourcePoseObservations': 2, 'pngCaptures': 73,
                                'allTwentyFourCanvasSheetsPhysicallyViewed': True,
                                'allCommandsSucceeded': True, 'consoleErrors': 0,
                                'allOwnedBrowserSessionsAndServersClosed': True,
                                'viewportWidths': [1280, 390], 'independentNativeFacings': [1, -1],
                                'verification': str(browser_path.relative_to(ROOT)), 'verificationSHA256': SHA(browser_path.read_bytes())},
    'sourceCombatOriginsFile': str(origins_path.relative_to(ROOT)), 'sourceCombatOriginsSHA256': SHA(origins_path.read_bytes()),
    'sourceCombatDirectionalMarks': 16, 'perUID': per_uid, 'verifiedSpriteInputs': input_manifest,
    'earlierFailuresPreserved': [
        {'verification': 'preparation/combat-sprites-pass6/browser-qa/p6final/standalone/verification.json', 'reason': 'Review tool incorrectly required an actual playable move for additional unused Pain optic source pose; all 480 real gameplay phases and 112 states had already passed.'},
        {'verification': 'preparation/combat-sprites-pass6/browser-qa/p6final-c/standalone/verification.json', 'reason': 'Temporary review-only renderer configuration cleared image readiness cache; tool needed an explicit post-configure PNG preload. Production source and renderer unchanged.'}
    ],
    'scopeLimits': [
        'Fresh body/catalog/tool/standalone phase and native Canvas contact review only. Parent separately verifies canonical gameplay resources/collisions, native projectiles and barrier props, final counterplay text, stage parallax, Shadow mount and publication.',
        'Pain optic source pose is retained and physically reviewed through two explicitly tagged review-only slots. These are unused authored source art and are not counted as additional playable techniques. The ten actual moves are verified separately through real engine starts.',
        'Goal is source-specific original-incarnation 1:1 fidelity; closest_supported illustrated art and 72 newly authored Versus poses per UID are not certified original model/material pixels or extracted game animations. Hidden hands/seams/plumbing and exact source movements remain limited.',
        'Final verified input SHAs cover sprite geometry/catalog/renderer/origin marks/native PNGs and unchanged mounted HTML. Aggregate counterplay metadata changes in parent-owned fidelity helper do not change these bodies/action maps; parent final core and gameplay checks cover that helper.'
    ]
}
path = PREP / 'FINAL_PASS6_SPRITE_RUNTIME_VERIFICATION.json'
assert not path.exists(), 'Existing final sprite verification must be preserved'
path.write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n')
files = [{'path': str(path.relative_to(ROOT)), 'bytes': path.stat().st_size, 'sha256': SHA(path.read_bytes())} for path in sorted(PREP.rglob('*')) if path.is_file()]
(PREP / 'FILE_SHA256_MANIFEST.json').write_text(json.dumps({'schema': 'cqc.pass6-native-sprite-file-manifest/1', 'files': files, 'notes': ['Self manifest excluded; every listed evidence/source file retains its recorded SHA.']}, ensure_ascii=False, indent=2) + '\n')
print(json.dumps({'report': str(path), 'sha256': SHA(path.read_bytes()), 'browserCommands': len(rows), 'captures': len(captures), 'tests': tools['tests'], 'evidenceFiles': len(files)}, indent=2))
