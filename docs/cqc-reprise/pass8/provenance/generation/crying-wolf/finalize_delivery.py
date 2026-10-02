"""Write review evidence only; never modify image bytes or either game repository."""
from pathlib import Path
from PIL import Image
import hashlib, json, copy, os
import numpy as np

B = Path(__file__).parent
def sha(p):
    return hashlib.sha256(Path(p).read_bytes()).hexdigest()
def read(p):
    return json.loads(Path(p).read_text())
def write(p, d):
    p = Path(p)
    raw = (json.dumps(d, ensure_ascii=False, indent=2) + '\n').encode()
    if p.exists() and p.read_bytes() != raw:
        old = p.read_bytes()
        previous = p.with_name(p.stem + '.previous-' + hashlib.sha256(old).hexdigest()[:12] + p.suffix)
        if not previous.exists():
            previous.write_bytes(old)
    p.write_bytes(raw)

template = read('/workspace/cqc-pass7-generation/quiet/FINAL_DELIVERY.json')
browser = read(B / 'canvas-proof-final/CANVAS_BROWSER_REVIEW.json')
geometry = read(B / 'SELECTION_AND_GEOMETRY.json')
origin_points = {
    'right': {'shoot': [1510, 126], 'deploy': [1153, 504], 'charge': [1512, 768]},
    'left': {'shoot': [1176, 120], 'deploy': [797, 495], 'charge': [1166, 765]},
}
origin_indices = {'shoot': 3, 'deploy': 6, 'charge': 11}
common_limits = [
    'Original 2008 MGS4 PlayStation 3 is the target. Newly authored 2D detailed sprites and 72 Versus poses are closest_supported, not extracted PS3 mesh, animation data, or an absolute 1:1 certification.',
    'All six facings are independently generated native transparent PNGs. No reflection, body mirroring, image resize, recolor, alpha cleanup, crop/export, or raster edit was performed. Exact imagegen native bytes, args, rejected attempts and hashes are preserved.',
    'All 72 body crops are unique physical source cells. Action names and animation timings are authored Versus mappings. They do not increase the source pose count or certify original animation timings.',
    'Some close native atlas cells contain adjacent figure pixels inside their bounding rectangles. Generic read-only component contour metadata excludes foreign figures during Canvas drawing; PNG bytes are unchanged. Normal final green and black Canvas views show complete single bodies.',
    'Standing source height is fixed per native sheet. Every pose has a separately observed grounded body pivot; crouch, jump and KO preserve naturally short native geometry. Root/integrator must independently verify gameplay size, hitboxes, contacts, costs, phases, mobile rendering and compatibility.',
    'Producer review covers native art, source provenance, 144 body-ground pivots across the pair and frame metadata. No game repository, runtime catalog, deployment or Git files were modified by this producer.',
]
armor_limits = common_limits + [
    'Original PS3 captures authenticate the low hulking quadrupedal suit, sensor, broad mechanical paws and recovered original railgun. Armor captures use active snow camouflage. Default dark shell material and whole-body details rely partly on a secondary Creative Uncut mirror claimed to be an original game model; the publisher original render URL was not recovered.',
    'The dorsal railgun is genuine source equipment. Its visible long rectangular housing, barrel and mount are illustrated close to supplied evidence. Exact all-side mount topology, internal mechanisms and extension articulation during firing are not certified. No extra turret, humanoid rifle or magical emitter is depicted.',
    'Armored shoulder-shell to grounded paw height excludes the dorsal gun and tail. Display height 195 is a producer proposal for the low broad body; pivots are below the torso between grounded paws and are never alpha-centroid or gun-centroid anchors.',
    'Forepaw swipes, body checks, low sweeps, grab, guard and pounce are authored fighting-game adaptations of quadrupedal movement. shoot, deploy and charge use the same source-supported railgun; their first active native pixels are measured separately for right and left.',
    'Actual visible railgun muzzle positions remain high above grounded paws, especially upright shots. They must not be artificially lowered to force crouching hits; trajectory and collision tests remain the integrator responsibility. Source-supported weapon category does not certify free ammo, damage, charge costs or cooldown values.',
    'B_LEFT_01 was rejected: eleven sensor heads faced right and one pose invented a second rear sensor. All native bytes and args remain retained. B_LEFT_02 independently regenerated the correct left-facing single body.',
]
beauty_limits = common_limits + [
    'Original PS3 captures show an adult unarmed Crying Beauty with straight shoulder-long black hair and bangs, gray/silver full sleeves and leggings, dark waist panels, bare hands, gray suit feet and a small trailing cable. Original snowy lighting makes exact material shades and foot/sole construction uncertain.',
    'Selected art uses a fully opaque CLOSED HIGH-COLLAR gray suit coverage variant. The original game neckline is not reproduced exactly. This is an explicit costume coverage adaptation after an input moderation rejection; identity/hair/gray segmentation/unarmed actions are closest supported, and exact source costume fidelity is false.',
    'A_RIGHT_01 produced no native image: image_gen rejected the input at sexual moderation, request 4e6e8de2-557c-409b-9a78-a3af0ad3c94d. The successful request materially changed to fully closed high-collar utility coverage and ordinary gameplay action references. The failed args and response are preserved; there was no repeated attempt to generate the original rejected request.',
    'Beauty is unarmed. Legacy action keys shoot, deploy and charge map to ordinary unarmed approach, low reach and lunge cells, not a gun, projectile, sniper precision, railgun, psychic attack or unexplained weapon. sourceCombatOrigins has no ballistic marks; gameplay must use contact-based adaptations.',
    'Normal palm/push/sweep/defense, pursuit/grab, stagger and KO poses are authored nonsexual gameplay adaptations. Facial likeness, hidden suit seams, finger topology, cable attachment, precise anatomy and foot materials remain illustration approximations.',
    'C_LEFT_02 was rejected because index 11 rear hand clipped the sheet right edge with 35 opaque edge pixels. C_LEFT_03 was independently regenerated with image_gen; all twelve figures are complete and zero pixels with alpha greater than 80 touch the native sheet edge. Its nearest opaque extent is still close to the right edge, so source crops must be preserved exactly.',
    'Hidden native vivid-red RGB values exist only at very low alpha in selected Beauty sheets. Actual green/black Canvas compositing was physically reviewed at 230 pixels and shows no opaque red fringe, effects or background matte. No cleanup was performed.',
]

pair_qa = {'schema': 'cqc.pass8.native-delivery-qa/1', 'status': 'passed', 'forms': {}, 'runtimeVerification': 'pending independent integrator', 'nativeRasterEdits': False}
for form, uid, name, display, limits in [
    ('armor', 'core__crying_wolf', 'CRYING WOLF', 195, armor_limits),
    ('beauty', 'archive__crying_beauty', 'CRYING BEAUTY', 230, beauty_limits),
]:
    b = B / form
    reviewed = read(b / 'SOURCE_FILES_REVIEWED.json')
    files = copy.deepcopy(reviewed['sourceFiles'])
    contract = read(b / 'references/source-contract.json')
    assert sum(r['bytes'] for r in contract['references']) == contract['selectedReferenceBytes'] <= 15_000_000
    assert len(files) == 6 and len({r['sha256'] for r in files}) == 6
    assert {r['key'] for r in files} == {'a-right', 'a-left', 'b-right', 'b-left', 'c-right', 'c-left'}
    alpha_rows = []
    unique = set()
    for r in files:
        p = Path(r['source'])
        assert sha(p) == sha(r['nativeOriginal']) == r['sha256']
        assert os.stat(p).st_ino == os.stat(r['nativeOriginal']).st_ino
        native = np.array(Image.open(p).convert('RGBA'))
        alpha = native[:, :, 3]
        edges = int((alpha[0, :] > 80).sum() + (alpha[-1, :] > 80).sum() + (alpha[:, 0] > 80).sum() + (alpha[:, -1] > 80).sum())
        assert edges == 0 and int(alpha.min()) == 0 and r['poseCount'] == 12
        layout = read(r['layout'])
        assert len(layout['cells']) == 12 and layout['unchanged_source_sha256'] == r['sha256']
        for c in layout['cells']:
            frame = c['frame']
            assert frame['sha256'] == r['sha256']
            x, y, w, h = frame['rect']
            pivot = r['observedBodyPivots'][str(c['index'])]
            assert x <= pivot[0] < x + w and y <= pivot[1] < y + h
            assert np.allclose(frame['pivot'], [(pivot[0] - x) / w, (pivot[1] - y) / h])
            unique.add((r['sha256'], tuple(frame['rect'])))
        r['observedAlphaBoundsHeights'] = r['observedBodyHeights']
        r['observedBodyHeightsFieldNote'] = 'Historical inspector field contains whole alpha-bounds heights, including equipment/tail when elevated; fixed standingSourceHeight uses the separately observed body reference below.'
        vivid = (native[:, :, 0] > 170) & (native[:, :, 1] < 85) & (native[:, :, 2] < 90)
        vivid_a = alpha[vivid]
        vivid_opaque = int((vivid_a > 80).sum())
        if form == 'beauty':
            assert vivid_opaque == 0
        alpha_rows.append({'key': r['key'], 'source': str(p), 'sha256': r['sha256'], 'alphaExtrema': [int(alpha.min()), int(alpha.max())], 'opaqueEdgePixels': edges, 'transparentPixels': int((alpha == 0).sum()), 'foreignBodyFrames': layout['foreign_body_frames'], 'vividRedPredicate': 'R>170 G<85 B<90, observational only', 'vividRedPixels': int(vivid.sum()), 'vividRedMaxAlpha': int(vivid_a.max()) if vivid_a.size else 0, 'vividRedAlphaGreaterThan80': vivid_opaque, 'completeNativeBodyCountPhysicallyObserved': 12, 'nativeBytesUnchanged': True})
    assert len(unique) == 72
    mapped = {(spec['sheet'], i) for spec in template['actionLayout'].values() for i in spec['indices']}
    assert mapped == {(sheet, i) for sheet in ['a', 'b', 'c'] for i in range(12)}
    origins = {'uid': uid, 'schema': 'cqc.pass7.native-source-combat-marks/1', 'coordinateSystem': 'Native full-sheet PNG x,y, no resize/flip; frame local to action group, sourcePoseIndex full-sheet zero-based.', 'slotSourceGroups': {'special': 'shoot', 'specialDown': 'deploy', 'super': 'charge'}, 'marks': {}, 'sourceIncarnation': contract['incarnation'], 'ballistic': form == 'armor'}
    if form == 'armor':
        for side in ['right', 'left']:
            r = next(r for r in files if r['key'] == 'c-' + side)
            image = Image.open(r['source']).convert('RGBA')
            layout = read(r['layout'])
            origins['marks'][side] = {}
            for action, point in origin_points[side].items():
                index = origin_indices[action]
                assert template['actionLayout'][action]['indices'][template['phaseMap'][action]['active'][0]] == index
                c = layout['cells'][index]
                x, y, w, h = c['frame']['rect']
                assert x <= point[0] < x + w and y <= point[1] < y + h
                rgba = list(image.getpixel(tuple(point)))
                assert rgba[3] > 80
                pivot = r['observedBodyPivots'][str(index)]
                origins['marks'][side][action] = {'action': action, 'frame': 1, 'sourcePoseIndex': index, 'file': c['frame']['file'], 'source': r['source'], 'sha256': r['sha256'], 'point': point, 'pointRGBA': rgba, 'sourceFrameRect': c['frame']['rect'], 'bodyPivotFullSheet': pivot, 'standingSourceHeight': r['standingSourceHeight'], 'proposedDisplayHeight': display, 'heightAboveGroundAtProposedDisplayScale': round((pivot[1] - point[1]) * display / r['standingSourceHeight'], 4), 'physicallyViewedZoom': str(B / 'canvas-proof-final' / ('armor-c-' + side + '-muzzle-' + action + '.png')), 'note': 'Actual visible forward railgun muzzle/housing edge on the first active authored Versus frame. Side measured independently. Original railgun category is supported; exact hidden mount/firing extension and PS3 timing are not certified. Never lower this native point to force crouch collision.'}
    else:
        origins['note'] = 'Unarmed contact fighter. shoot/deploy/charge are historical atlas keys for chase/low reach/lunge, with no projectile origin. Do not fabricate firearm marks from empty hands.'
    write(b / 'SOURCE_COMBAT_ORIGINS.json', origins)
    physical = []
    for r in files:
        for bg in ['green', 'black']:
            p = B / 'canvas-proof-final' / (form + '-' + r['key'] + '-' + bg + '.png')
            physical.append({'file': str(p), 'sha256': sha(p), 'physicallyViewed': True, 'sourceKey': r['key'], 'background': bg, 'displayHeight': display, 'finding': 'All twelve full single bodies, proper independent facing, complete extremities and clean actual native alpha compositing.'})
    alpha_review = {'schema': 'cqc.pass8.native-alpha-review/1', 'uid': uid, 'status': 'approved', 'reviewer': 'bb_crying_wolf', 'reviewedAt': '2026-10-02', 'scope': 'Native bytes, physically viewed twelve-pose PNGs, final Canvas body compositions; runtime gameplay pending.', 'selectedNativeSourceCount': 6, 'all72UniqueBodiesPhysicallyViewed': True, 'selectedSources': alpha_rows, 'physicallyViewedCanvasCaptures': physical, 'canvasBrowserReport': str(B / 'canvas-proof-final/CANVAS_BROWSER_REVIEW.json'), 'canvasBrowserCommandsPassed': len(browser['commands']), 'nativePNGsModified': False, 'nativePixelsRewritten': False, 'reflectionOrMirroring': False, 'canvasContourExcludesForeignCellsWithoutPNGMutation': True, 'initialChartFix': {'file': str(B / 'CANVAS_CHART_REVIEW_INITIAL.json'), 'finding': 'Initial chart gutters were too narrow for long tails; chart layout widened to 500-pixel columns. All original attempts/screenshots retained. This was a review-chart correction, with no change to PNGs or source layouts.'}}
    write(b / 'NATIVE_ALPHA_REVIEW.json', alpha_review)
    attempts = []
    selected_names = {Path(r['source']).stem for r in files}
    for p in sorted((b / 'native-attempts').glob('*.png')):
        summary = read(b / 'metadata' / (p.stem + '.result-summary.json'))
        assert sha(p) == summary['sha256'] == sha(summary['nativeOriginal'])
        args = b / 'prompts' / (p.stem + '.args.json')
        rejection = b / 'metadata' / (p.stem + '.REJECTION.json')
        attempts.append({'attempt': p.stem, 'source': str(p), 'nativeOriginal': summary['nativeOriginal'], 'sha256': sha(p), 'bytes': p.stat().st_size, 'nativeHardlink': os.stat(p).st_ino == os.stat(summary['nativeOriginal']).st_ino, 'args': str(args), 'argsSHA256': sha(args), 'status': 'selected' if p.stem in selected_names else 'rejected-native-retained', 'rejection': read(rejection) if rejection.exists() else None, 'inspection': str(b / 'inspections' / (p.stem + '.components.json'))})
    assert len(attempts) == 7 and sum(a['status'] == 'selected' for a in attempts) == 6
    failed = []
    for p in sorted((b / 'metadata').glob('*.failed-request.json')):
        failed.append({'file': str(p), 'sha256': sha(p), 'details': read(p), 'args': str(b / 'prompts' / p.name.replace('.failed-request.json', '.args.json'))})
    executed = {a['attempt'] for a in attempts} | {Path(a['args']).name.removesuffix('.args.json') for a in failed}
    proposals = [{'file': str(p), 'sha256': sha(p), 'status': 'preserved unexecuted original proposal, not a generation attempt'} for p in sorted((b / 'prompts').glob('*.args.json')) if p.name.removesuffix('.args.json') not in executed]
    write(b / 'NATIVE_PNG_INDEX.json', {'schema': 'cqc.pass8.native-attempt-index/1', 'uid': uid, 'nativeImageAttempts': attempts, 'failedRequestsWithNoNativeImage': failed, 'unexecutedProposals': proposals, 'noNativeImageBytesDeletedOrRewritten': True})
    refs = copy.deepcopy(contract['references'])
    for r in refs:
        assert sha(r['file']) == r['sha256']
        r['sourceKind'] = 'original-game-model' if 'secondary_mirror' in r['provenanceLevel'] else 'original-game-capture'
        r['scope'] = r['role']
        r['limits'] = 'Secondary mirror claimed original game model; original publisher URL not recovered; supplementary only.' if r['sourceKind'] == 'original-game-model' else 'Original PlayStation 3 longplay, World of Longplays / Spazbo4, 2014; bounded timestamp captures. Source resolution and snowy scene lighting limit fine topology/material certification.'
    incarnation = contract['incarnation']
    selected_costume = contract['costume'] if form == 'armor' else 'Adult Crying Beauty black straight hair/bangs, opaque gray segmented full suit with dark waist and bare hands; CLOSED HIGH-COLLAR coverage variant, original neckline explicitly changed; covered gray suit feet and small rear cable.'
    review = {'uid': uid, 'incarnation': incarnation, 'status': 'approved', 'reviewer': 'bb_crying_wolf / physically viewed original references, all seven native attempts and six selected sources; twelve final green/black Canvas compositions per UID', 'reviewedAt': '2026-10-02', 'sourceKind': 'original-game-capture', 'absolute1to1Certified': False, 'fidelityStatus': 'closest_supported', 'exactOriginalCostumeCertified': False, 'costumeCoverageVariant': form == 'beauty', 'approvalScope': 'Six actual native transparent source PNGs, all 72 independently generated body cells and metadata. Beauty approval explicitly covers the documented closed-collar variant. Independent game integration/contact validation pending.', 'checks': {'identity': True, 'costume': True, 'equipment': True, 'anatomicalSides': True, 'singleFigure': True, 'transparentBackground': True}, 'checksScope': 'Closest-supported selected art and explicit coverage variant; these booleans do not certify exact original mesh, costume, anatomy or timing.', 'sources': refs, 'sourcePriority': contract['sourcePriority'], 'limits': limits}
    delivery = {'schema': 'cqc.native-combat-delivery/1', 'uid': uid, 'name': name, 'game': 'Metal Gear Solid 4: Guns of the Patriots (2008, original PlayStation 3)', 'incarnation': incarnation, 'selectedCostume': selected_costume, 'basis': 'Original hulking quadrupedal exosuit and genuinely source-supported integrated railgun; authored Versus quadrupedal melee.' if form == 'armor' else 'Original unarmed Crying Beauty pursuit/grab/defense, with explicit closed-collar costume coverage adaptation. Legacy atlas ranged keys are contact actions.', 'displayHeight': display, 'coverage': 'action-frames', 'facing': 1, 'mirror': False, 'sourceFiles': files, 'actionLayout': copy.deepcopy(template['actionLayout']), 'actionMap': copy.deepcopy(template['actionMap']), 'phaseMap': copy.deepcopy(template['phaseMap']), 'review': review, 'nativeSourceCombatOrigins': str(b / 'SOURCE_COMBAT_ORIGINS.json'), 'sourceCombatOrigins': str(b / 'SOURCE_COMBAT_ORIGINS.json'), 'sourceContract': str(b / 'references/source-contract.json'), 'sourceContractSHA256': sha(b / 'references/source-contract.json'), 'sourceContractAddendum': str(b / 'SOURCE_CONTRACT_ADDENDUM.json'), 'nativeAlphaReview': str(b / 'NATIVE_ALPHA_REVIEW.json'), 'nativeAttemptIndex': str(b / 'NATIVE_PNG_INDEX.json'), 'counts': {'selectedNativePngSheets': 6, 'totalPoseCells': 72, 'facings': 2, 'nativeBodyGenerationAttempts': 7, 'rejectedNativeBodyAttempts': 1, 'failedRequestsWithoutNativeImage': len(failed)}, 'limits': limits}
    write(b / 'SOURCE_CONTRACT_ADDENDUM.json', {'schema': 'cqc.pass8.source-contract-addendum/1', 'uid': uid, 'historicalContractPreserved': str(b / 'references/source-contract.json'), 'historicalContractSHA256': sha(b / 'references/source-contract.json'), 'actualSelectedCostume': selected_costume, 'costumeCoverageVariant': form == 'beauty', 'exactOriginalCostumeCertified': False, 'fixedSourceBodyHeights': {r['key']: r['standingSourceHeight'] for r in files}, 'bodyScaleReference': 'Upper rounded shoulder shell to grounded paw, excludes railgun and tail.' if form == 'armor' else 'Crown to grounded suit foot; fixed per sheet.', 'actualSelectedLimits': limits, 'ballistic': form == 'armor'})
    write(b / 'FINAL_DELIVERY.json', delivery)
    pair_qa['forms'][uid] = {'selectedNativePNG': 6, 'uniquePoses': len(unique), 'independentFacings': 2, 'preservedNativeAttempts': len(attempts), 'preservedRejectedNatives': 1, 'failedRequestsWithoutImage': len(failed), 'selectedReferenceBytes': contract['selectedReferenceBytes'], 'actualSourcesHashMatchNativeOriginal': True, 'allSelectedHardlinked': True, 'allSelectedNativeOpaqueEdgesZero': True, 'all144PairPivotsInsideOwnCrop': True, 'actionLayoutCoversAll36CellsPerFacingExactly': len(mapped) == 36, 'ballisticMarks': 6 if form == 'armor' else 0, 'finalCanvasChartsPhysicallyViewed': len(physical), 'delivery': str(b / 'FINAL_DELIVERY.json'), 'deliverySHA256': sha(b / 'FINAL_DELIVERY.json')}
write(B / 'DELIVERY_QA.json', pair_qa)
manifest = [{'file': str(p.relative_to(B)), 'bytes': p.stat().st_size, 'sha256': sha(p)} for p in sorted(B.rglob('*')) if p.is_file() and p.name != 'PRESERVED_FILE_SHA256_MANIFEST.json']
write(B / 'PRESERVED_FILE_SHA256_MANIFEST.json', {'schema': 'cqc.pass8.preserved-generation-manifest/1', 'files': manifest, 'nativeAndReferenceBytesRewritten': False, 'allAttemptsAndResearchPreserved': True})
print(json.dumps(pair_qa, ensure_ascii=False, indent=2))
