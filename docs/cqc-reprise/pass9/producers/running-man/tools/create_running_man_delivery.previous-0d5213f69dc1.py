"""PASS9 producer metadata only. Read native PNG pixels; never save or edit an image."""
from pathlib import Path
from PIL import Image
from scipy import ndimage
import numpy as np
import datetime
import hashlib
import json
import os
import sys

BASE = Path(__file__).resolve().parents[1]
assert BASE == Path('/workspace/cqc-pass9-generation/running-man')
sys.path.insert(0, '/workspace/cqc-game-working/cqc-versus-v056/tools')
from inspect_combat_sprite_sheet import inspect_components

UID = 'core__runner_mg2'
NOW = datetime.datetime.now(datetime.timezone.utc).isoformat()
SELECTED = {'a-right': 'A_RIGHT_01', 'a-left': 'A_LEFT_01',
            'b-right': 'B_RIGHT_01', 'b-left': 'B_LEFT_01',
            'c-right': 'C_RIGHT_02', 'c-left': 'C_LEFT_02'}

def sha(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()

def write(relative, document):
    path = BASE / relative
    assert path.resolve().is_relative_to(BASE)
    raw = (json.dumps(document, ensure_ascii=False, indent=2) + '\n').encode()
    if path.exists():
        if path.read_bytes() == raw:
            return
        backup = path.with_name(path.stem + '.previous-' + sha(path)[:12] + path.suffix)
        if not backup.exists():
            with backup.open('xb') as f:
                f.write(path.read_bytes())
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(raw)

contract = json.loads((BASE / 'SOURCE_AND_ACTION_CONTRACT.json').read_text())
reference_contract = json.loads((BASE / 'original-reference-preparation/SOURCE_CONTRACT.json').read_text())
reference_by_name = {r['file']: r for r in reference_contract['references']}
references = []
for ref in contract['references']:
    p = Path(ref['file'])
    assert sha(p) == ref['sha256'] == sha(ref['source'])
    assert p.stat().st_size == ref['bytes']
    original = reference_by_name[p.name]
    references.append({**ref, 'url': original['url'], 'authority': original['authority'],
                       'sourceKind': 'official-game-reference' if p.name.startswith('manual-') else 'original-game-capture',
                       'viewed': True, 'physicallyViewed': True,
                       'qualifiedEvidence': contract['localizationQualification']})

layout = {
    'idle': {'sheet': 'a', 'indices': [0, 1], 'fps': 4, 'loop': True},
    'walk': {'sheet': 'a', 'indices': [2, 3, 4, 5], 'fps': 8, 'loop': True},
    'guard': {'sheet': 'a', 'indices': [6, 7], 'fps': 4, 'loop': True},
    'crouch': {'sheet': 'a', 'indices': [8, 9], 'fps': 4, 'loop': True},
    'jump': {'sheet': 'a', 'indices': [10, 11], 'fps': 5, 'loop': False},
    'punch': {'sheet': 'b', 'indices': [0, 1, 2], 'fps': 10, 'loop': False},
    'heavy': {'sheet': 'b', 'indices': [3, 4, 5], 'fps': 9, 'loop': False},
    'low': {'sheet': 'b', 'indices': [6, 7, 8], 'fps': 9, 'loop': False},
    'hit': {'sheet': 'b', 'indices': [9], 'fps': 0, 'loop': False},
    'ko': {'sheet': 'b', 'indices': [10, 11], 'fps': 4, 'loop': False},
    'shoot': {'sheet': 'c', 'indices': [0, 1, 2], 'fps': 9, 'loop': False},
    'throw': {'sheet': 'c', 'indices': [3, 4, 5], 'fps': 8, 'loop': False},
    'charge': {'sheet': 'c', 'indices': [6, 7, 8], 'fps': 9, 'loop': False},
    'recover': {'sheet': 'c', 'indices': [9, 10, 11], 'fps': 5, 'loop': False},
}
action_map = {'light': 'punch', 'heavy': 'heavy', 'low': 'low', 'throw': 'throw',
              'special': 'shoot', 'specialDown': 'low', 'specialForward': 'charge',
              'specialBack': 'guard', 'super': 'charge', 'utility': 'recover'}
phase_map = {a: {'startup': [0], 'active': [1], 'recovery': [2]}
             for a in ['punch', 'heavy', 'low', 'shoot', 'throw', 'charge', 'recover']}
phase_map['guard'] = {'startup': [0], 'active': [1], 'recovery': [0]}
observed = {k: list(v) for k, v in contract['poseSemantics'].items()}
observed['C'][4] = 'Empty open hands reach forward in adapted grab/contact; no victim or carried object.'
observed['C'][5] = 'Empty-hand forward follow-through/reset in the adapted throw triplet; reads as extended-arm motion, not a certified canonical CQC throw.'
write('OBSERVED_POSE_CONTRACT.json', {
    'schema': 'cqc.pass9.running-man-observed-poses/1', 'uid': UID,
    'sourceContractFile': str(BASE / 'SOURCE_AND_ACTION_CONTRACT.json'),
    'sourceContractSHA256': sha(BASE / 'SOURCE_AND_ACTION_CONTRACT.json'),
    'rootRequestedRuntimeCoverage': 'A idle2/walk4/guard2/crouch2/jump2; B punch3/heavy3/low3/hit1/ko2; C sprint3/adaptedThrow3/chargeRun3/recover3.',
    'poseSemantics': observed, 'canonicalMotionCertified': False,
    'technicalAliases': {'shoot': 'unarmed sprint, no shooting', 'throw': 'authored unarmed grab/follow-through', 'charge': 'athletic charge-run/contact adaptation'},
    'preparedOriginalPromptVariantsRetainedUnchanged': True,
})

limits = [
    'Target 1:1 original 1990 MSX2 incarnation where tiny original pixels resolve palette and silhouette; result is closest_supported newly authored 2D art, not extraction, enlargement, exact facial identity or absolute 1:1 certification.',
    contract['localizationQualification'],
    'Observed original tiny sprite/game captures support green clothing/forearms/trousers, light-grey upper/shoulder blocks, dark/ochre small head and boots, compact athletic adult silhouette and no carried weapon. Exact headwear, hair, face, seams, gloves, footwear hardware and anatomy between tiny poses are unresolved. Generated short dark hair and folds are readability interpretations, not new canonical facts.',
    'Original encounter movement and speed are source supported. Original LP account says he does not directly attack Snake; punches, heavy/low attacks, guards, crouches, jumps, throws, shoulder contacts, hit/KO and timings are explicitly bounded Versus adaptations, not canonical Running Man martial arts.',
    'No gun, player HUD pistol, player mine, grenade, detonator, gas projector or invented carried device. Original nerve-gas/explosives lore does not certify a particular prop model or implement a gas/trap stage mechanic here.',
    'Technical action shoot depicts an unarmed sprint; it must never produce a gunshot or ballistic muzzle. throw depicts open-hand reach and follow-through with no second body, carried prop or certified exact CQC throw. charge depicts an athletic charge-run/contact adaptation. No deploy or optic action is invented.',
    'Six facings were independently generated as brand-new transparent native atlases, mirror=false. Both sides preserve supported green/grey palette and unarmed silhouette. Small opposing-facing fold/panel/face variations are illustration approximations; no hidden original asymmetry is claimed.',
    'All selected and rejected native PNGs remain byte-identical to tool outputs. RGB behind transparent/very low-alpha pixels may look dark/green/ochre in viewers. Frames retain complete alpha>=8 body components and 5-pixel padding, with actual alpha>80 body/support measurements. Unconnected faint alpha speckles are not asserted to be anatomy. No image crop export, resize, recolour, alpha cleanup or mirror was performed.',
    'Source-pixel standing heights are measured separately for each unchanged atlas from listed upright source poses. displayHeight225 is a relative gameplay recommendation, not certified centimetres or a measured canonical 3D model. Pivots use the body pelvis band and observed lower support extent; crouch, jump and KO retain their real native pose heights.',
    'Producer approval covers six native source atlases,72 unique source poses, actual source marks and their metadata only. Integration, runtime balance/helper changes, browser Canvas crops/contacts and both 1280/390 viewport reviews remain root-owned and have not been performed for this PASS9 delivery.',
    'First C_RIGHT attempt is rejected and preserved unchanged because two intended recovery figures still ran. It is never selected, deleted or repurposed as an OC. Prepared original triplet prompts remain unmodified alongside separate new runtime-complete variants.',
]
review = {'uid': UID, 'status': 'approved', 'reviewer': 'sunny_two_versions / native producer physical review',
          'reviewedAt': NOW, 'sourceKind': 'original-game-capture', 'fidelityStatus': 'closest_supported',
          'absolute1to1Certified': False, 'checks': {k: True for k in ['identity', 'costume', 'equipment', 'anatomicalSides', 'singleFigure', 'transparentBackground']},
          'sources': references, 'limits': limits,
          'approvalScope': 'Six unchanged native atlases and72 observed authored pose semantics only; runtime/browser integration pending.'}

files, physical = [], []
for key, name in SELECTED.items():
    src = BASE / 'native-attempts' / (name + '.png')
    target = BASE / 'sources' / (name + '.png')
    if target.exists():
        assert sha(target) == sha(src), 'Refuse source collision'
    else:
        os.link(src, target)
    metadata = json.loads((BASE / 'metadata' / (name + '.result-summary.json')).read_text())
    assert sha(src) == sha(target) == sha(metadata['nativeOriginal']) == metadata['sha256']
    asset = f'assets/combat-sprites/{UID}/{key}-v1.png'
    doc = inspect_components(target, 4, 3, asset)
    with Image.open(target) as im:
        alpha = np.array(im.getchannel('A'))
        assert im.mode == 'RGBA' and im.size == (1536, 1024) and alpha.min() == 0
    labels8, _ = ndimage.label(alpha >= 8)
    counts8 = np.bincount(labels8.ravel())
    large8 = set(int(i) for i in np.where(counts8[1:] >= 1000)[0] + 1)
    assert len(large8) == 12
    matched8 = set()
    for cell in doc['cells']:
        bx, by, bx1, by1 = cell['bbox']
        local_counts = np.bincount(labels8[by:by1, bx:bx1].ravel())
        local_counts[0] = 0
        component8 = int(local_counts.argmax())
        assert component8 in large8 and component8 not in matched8
        matched8.add(component8)
        yy, xx = np.where(labels8 == component8)
        box8 = [int(xx.min()), int(yy.min()), int(xx.max()+1), int(yy.max()+1)]
        x0, y0, x1, y1 = box8
        left, top, right, bottom = max(0, x0-5), max(0, y0-5), min(1536, x1+5), min(1024, y1+5)
        old = cell['frame']
        oldx, oldy, oldw, oldh = old['rect']
        full_pivot = [oldx + old['pivot'][0]*oldw, oldy + old['pivot'][1]*oldh]
        foreign8 = sum(int(np.count_nonzero(labels8[top:bottom, left:right] == other)) for other in large8 if other != component8)
        assert foreign8 == 0, 'Expanded native group crop intersects another full body; review before delivery'
        cell['frame'] = {**old, 'rect': [left, top, right-left, bottom-top],
                         'pivot': [(full_pivot[0]-left)/(right-left), (full_pivot[1]-top)/(bottom-top)]}
        assert 'clipPolygon' not in cell['frame']
        cell.update({'component8': component8, 'pixelsAlpha8': int(counts8[component8]), 'bboxAlpha8': box8,
                     'foreign_body_alpha8_pixels_in_rect': foreign8, 'observedBodyPivotFullSheet': full_pivot,
                     'pivotMeasurement': 'x alpha>80 connected-body pelvis band 48%-65%; y observed lowest alpha>80 body support exclusive bound; no world-scale or pose canonicality claim.',
                     'poseMeaning': observed[key[0].upper()][cell['index']],
                     'artistic_review': 'producer-physically-observed-complete-unarmed-green-grey-original-era-silhouette-correct-facing-authored-versus-pose'})
    assert matched8 == large8
    doc.update({'frame_layout': 'full-alpha8-native-body-bounds-padded5-support-pivot-alpha80-no-image-modification',
                'alphaGroupingThreshold': 8, 'supportMeasurementThreshold': 80,
                'foreign_body_frames': [], 'producerPhysicalViewedAt': NOW,
                'warning': 'Approved native producer source/layout metadata only; actual browser Canvas crop review remains integration pending.'})
    layout_file = BASE / 'layouts' / (key + '.json')
    write('layouts/' + key + '.json', doc)
    standing = [0, 1] if key.startswith('a-') else [0, 2, 3, 5] if key.startswith('b-') else [2, 8, 10, 11]
    heights = [doc['cells'][i]['bbox'][3]-doc['cells'][i]['bbox'][1] for i in standing]
    height = sum(heights)/len(heights)
    files.append({'key': key, 'file': asset, 'source': str(target), 'nativeOriginal': metadata['nativeOriginal'],
                  'sha256': sha(target), 'bytes': target.stat().st_size, 'width': 1536, 'height': 1024,
                  'columns': 4, 'rows': 3, 'poseCount': 12, 'facing': 1 if key.endswith('right') else -1,
                  'mirror': False, 'independentlyGenerated': True, 'layout': str(layout_file),
                  'layoutSHA256': sha(layout_file), 'standingReferencePoseIndices': standing,
                  'standingReferenceSourceHeights': heights, 'standingSourceHeight': height,
                  'observedBodyHeights': [c['bbox'][3]-c['bbox'][1] for c in doc['cells']],
                  'canvasContourFrames': [], 'alphaGroupingThreshold': 8, 'sourcePixelsEdited': False})
    physical.append({'key': key, 'sha256': sha(target), 'physicallyViewed': True, 'viewedAt': NOW,
                     'completeBodyInAll12Poses': True, 'observedFacing': 'RIGHT' if key.endswith('right') else 'LEFT',
                     'greenGreyPaletteAndCompactAthleticAdult': True, 'unarmed': True,
                     'actualHitKneelingKOAndCompleteSideLyingKO': True if key.startswith('b-') else None,
                     'recovery9to11StationaryFeetGrounded': True if key.startswith('c-') else None,
                     'nativeDimensions': [1536, 1024], 'alphaExtrema': [int(alpha.min()), int(alpha.max())],
                     'opaqueMajorComponents': 12, 'fullBodyAlpha8Components': 12,
                     'standingReferencePoseIndices': standing, 'standingReferenceSourceHeights': heights,
                     'standingSourceHeight': height, 'exactCanonicalFaceHairDetailsCertified': False,
                     'noForeignBodyPixelsInAnyNativeCrop': True})

marks = {'right': {}, 'left': {}}
points = {'right': {'punch': [715, 107], 'heavy': [399, 446], 'low': [1430, 600], 'throw': [309, 435]},
          'left': {'punch': [450, 129], 'heavy': [90, 475], 'low': [1230, 632], 'throw': [97, 437]}}
for side in ['right', 'left']:
    for action, point in points[side].items():
        config = layout[action]
        row = next(r for r in files if r['key'] == config['sheet'] + '-' + side)
        source_pose = config['indices'][phase_map[action]['active'][0]]
        cell = json.loads(Path(row['layout']).read_text())['cells'][source_pose]
        with Image.open(row['source']) as im:
            rgba = list(im.getpixel(tuple(point)))
        x, y, w, h = cell['frame']['rect']
        assert rgba[3] > 80 and x <= point[0] < x+w and y <= point[1] < y+h
        marks[side][action] = {'action': action, 'actionFrame': 1, 'sourcePoseIndex': source_pose,
                               'file': row['file'], 'source': row['source'], 'nativeOriginal': row['nativeOriginal'],
                               'sha256': row['sha256'], 'point': point, 'pointRGBA': rgba,
                               'kind': 'native-boot-contact-presentation-only' if action == 'low' else 'native-hand-contact-presentation-only',
                               'canLaunchProjectile': False, 'canonicalAttackCertified': False,
                               'scope': 'Physically observed alpha>80 hand/boot on the first active source pose; optional bounded Versus contact presentation anchor only.'}
write('SOURCE_CONTACT_MARKS.json', {'schema': 'cqc.pass9.running-man-native-contact-marks/1', 'uid': UID,
                                   'marks': marks, 'projectileMuzzles': 0, 'canonicalAttackCertified': False})
write('SOURCE_COMBAT_ORIGINS.json', {'schema': 'cqc.pass9.native-source-combat-marks/1', 'uid': UID,
                                    'marks': {'right': {}, 'left': {}}, 'slotSourceGroups': {},
                                    'nonBallistic': True, 'canonicalWeapon': None,
                                    'scope': 'Unarmed running actor. No ballistic launch points, player weapons or unsupported original prop. Contact marks are separate presentation-only source pixels.'})
attempts = []
for path in sorted((BASE / 'native-attempts').glob('*.png')):
    metadata = json.loads((BASE / 'metadata' / (path.stem + '.result-summary.json')).read_text())
    assert sha(path) == metadata['sha256'] == sha(metadata['nativeOriginal'])
    attempts.append({'key': path.stem, 'source': str(path), 'nativeOriginal': metadata['nativeOriginal'],
                     'sha256': sha(path), 'bytes': path.stat().st_size,
                     'status': 'approved-final' if path.stem in SELECTED.values() else 'rejected-recovery-still-running-retained',
                     'argsFile': metadata['argsFile'], 'argsSHA256': metadata['argsSHA256'],
                     'retainedUnchanged': True, 'repurposedAsOC': False})
write('NATIVE_PNG_INDEX.json', {'uid': UID, 'attempts': attempts, 'nativeImages': len(attempts),
                             'approvedBodySheets': 6, 'approvedPoses': 72, 'rejectedNativeImages': 1,
                             'pixelEdits': 0, 'generatedOtherOCs': 0})
write('CANONICAL_REVIEW.json', review)
write('PRODUCER_PHYSICAL_REVIEW.json', {'schema': 'cqc.pass9.running-man-producer-physical-review/1',
                                      'uid': UID, 'status': 'approved_closest_supported', 'reviewer': 'sunny_two_versions',
                                      'reviewedAt': NOW, 'sources': physical, 'observedCompletePoses': 72,
                                      'canonicalReviewSHA256': sha(BASE / 'CANONICAL_REVIEW.json'),
                                      'limits': limits, 'browserCanvasReviewPerformed': False, 'runtimeImported': False})
delivery = {'schema': 'cqc.native-combat-delivery/1', 'uid': UID, 'name': 'RUNNING MAN',
            'game': 'Metal Gear 2: Solid Snake (1990), original MSX2 visual incarnation',
            'incarnation': 'Original-era MSX2 Running Man, compact unarmed green-grey running mercenary; English LP localization and sprite extraction provenance unverified.',
            'selectedCostume': contract['selectedCostume'],
            'basis': 'Physically observed tiny original-era sprite/captures and original manual page42. Unarmed speed is supported; all combat normals and timing are bounded Versus adaptations.',
            'displayHeight': 225, 'coverage': 'action-frames', 'facing': 1, 'mirror': False,
            'sourceFiles': files, 'actionLayout': layout, 'actionMap': action_map, 'phaseMap': phase_map,
            'review': review, 'nativeSourceCombatOrigins': str(BASE / 'SOURCE_COMBAT_ORIGINS.json'),
            'nativeSourceContactMarks': str(BASE / 'SOURCE_CONTACT_MARKS.json'),
            'sourceContractFile': str(BASE / 'SOURCE_AND_ACTION_CONTRACT.json'),
            'sourceContractSHA256': sha(BASE / 'SOURCE_AND_ACTION_CONTRACT.json'),
            'observedPoseContract': str(BASE / 'OBSERVED_POSE_CONTRACT.json'),
            'limits': limits, 'nonBallistic': True, 'canonicalWeapon': None,
            'runtimeImported': False, 'browserCanvasReviewPerformed': False}
write('FINAL_DELIVERY.json', delivery)
print(json.dumps({'uid': UID, 'delivery': str(BASE / 'FINAL_DELIVERY.json'),
                  'sha256': sha(BASE / 'FINAL_DELIVERY.json'), 'sheets': 6, 'poses': 72,
                  'allNativeSourcePNGsUnchanged': True, 'selectedReferenceBytes': contract['selectedReferenceBytes'],
                  'standingSourceHeights': {r['key']: r['standingSourceHeight'] for r in files},
                  'runtimeImported': False}, indent=2))
