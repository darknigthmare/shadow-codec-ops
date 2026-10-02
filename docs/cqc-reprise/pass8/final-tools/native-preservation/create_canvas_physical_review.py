#!/usr/bin/env python3
"""Record the completed human/model physical viewing pass; no image mutation."""
import collections
import hashlib
import json
from datetime import datetime, timezone
from pathlib import Path
from PIL import Image

B = Path('/workspace/cqc-pass8-native-browser-final/pass8-all13-final-a/standalone')
OUT = B.parent / 'reviewers'
R = Path('/workspace/cqc-game-working/cqc-versus-v056')
UID_NOTES = {
    'core__screaming_mantis': [
        'Six full Canvas sheets physically viewed, including all twelve cells of each sheet. The main armored body, attached mechanical arms and curved blades remain visible.',
        'Two distinct dolls are visible in every rendered pose, including crouch, jump and KO: the pale/goggled doll and the dark-coated doll. No whole doll is lost by a contour.',
        'Fine suspension lines are visible on several poses but have low contrast against the checkerboard; their continuous pixel-level attachment is not certified.',
        'The arms/dolls occupy different positions for the independently illustrated left and right sheets; this inspection does not establish a model-extracted canonical animation.'
    ],
    'core__crying_wolf': [
        'All six sheets show the quadrupedal armored body, single forward sensor head, back railgun and long curved tail without an obvious missing major part.',
        'Standing, advancing, crouched, airborne and fallen poses retain their visible paws. The grounded paws visually sit near the displayed foot/pivot baseline rather than stretching the body to one height per action.',
        'The railgun barrel is complete on both C facings, including the standing and low aimed poses. No extra sensor head is apparent in these selected B sheets.',
        'This base screenshot batch includes the earlier Wolf action-phase metadata. Root supplied a separate phase-only specialDown revision; this review concerns the identical displayed geometry and does not certify the revised timing.'
    ],
    'roster50__sunny_mgs4': [
        'All six sheets preserve clearly child-sized body/head proportions, smaller stature, short blond hair, black sweater, jeans, apron and dark shoes.',
        'The blue flower is visible on the near anatomical-left side on left-facing views; the far-side flower is mostly occluded on right-facing views.',
        'The B gestures are open-hand presentation/avoidance, and KO poses are seated rest rather than graphic injuries. C shows cookware/cup and small support gestures; no firearm is visible.',
        'The twelve feet/hands and apron ties remain inside the visible cells; no recognizable adjacent figure is shown.'
    ],
    'roster50__sunny_mgr': [
        'All six sheets preserve child proportions and a small stature, striped top, cargo trousers, work gloves, boots, green neck headset and left-side violet/blue flower.',
        'The selected longer lower nape/hair layer is present on the rendered facings, unlike the superseded short-nape delivery. There is no visible neighboring body joined to the B RIGHT sheet.',
        'C gestures signal/observe with free gloved hands; no firearm or damaging device is visible. B avoidance/guard and seated rest remain fully clothed.',
        'Hair, headset and all feet remain visible through the actual Canvas contours. An exact strand-by-strand source match is outside this pass.'
    ],
    'core__eva_mgs3': [
        'All six sheets show adult EVA in ochre motorcycle clothing, black inner garment, gloves, neck goggles and black boots. The selected C LEFT correction is the sheet actually rendered.',
        'A single thigh holster is visible where the costume angle permits it; the earlier second near-side anatomical-left holster is absent from C LEFT. The anatomical-right interpretation follows the previously inspected official Konami source and producer/root review.',
        'Standing and kneeling aimed handgun poses show complete visible barrels and hands. The bottom C row visibly manipulates/reloads the handgun, with no grenade added.',
        'Boots, low kick, kneeling feet and the horizontal KO figure are complete at the viewed resolution. This pass does not newly certify the exact Mauser model or reload mechanism.'
    ],
    'archive__screaming_beauty': [
        'The six sheets show a distinct unarmored adult with short swept-up black hair and an opaque bronze/olive suit with dark lined panels.',
        'Hands, crouched legs, jumps and sideways KO bodies are visible in all twelve cells. No Mantis mechanical rig, doll or gun is transferred to the unarmored form.',
        'C contains reaching/defense/composure gestures. Fine suit seams and shading are illustrative native details rather than a pixel-exact source certification.'
    ],
    'archive__crying_beauty': [
        'All six sheets show the distinct unarmored adult, dark shoulder-length hair, pale gray suit and free hands. C LEFT is the corrected complete-hand sheet, not the rejected clipped-hand candidate.',
        'The low kicks, crouches, jumps and lying bodies are complete; no railgun, quadruped head or armored Wolf tail is inherited.',
        'The producer-documented fuller collar/coverage adaptation remains visible. This Canvas-only review does not reclassify that adapted costume as a literal 1:1 original costume.',
        'Original source complexion/lighting and exact hair-strand identity are not independently re-audited in this pass.'
    ],
    'core__raging_raven': [
        'All six sheets show the armored body, wing assemblies and launcher/drum arrangement with their visible tips and feet retained.',
        'The selected C RIGHT sheet keeps the launcher visible even on the reaching/grab poses; the wing tips appear complete and the previously rejected clipped-tip candidate is not rendered.',
        'Extended wings, low poses, airborne states and fallen bodies remain within the visible cells. Exact hidden wing layers and individual rivets are not certified.'
    ],
    'archive__raging_beauty': [
        'All six sheets show the distinct unarmored adult with long tied black hair and an opaque gray segmented suit.',
        'Hair tails, hands, jumps, low kicks and sideways resting/fallen bodies remain visible; no armored wings or grenade launcher are present.',
        'C gestures are physical reaching/avoidance/guard. No inferred supernatural effect is visually asserted by this sheet review.'
    ],
    'core__laughing_octopus': [
        'All six sheets show the armored helmet/body and several complete attached segmented tentacles. Tentacles overlap naturally, so exact hidden tentacle count is not certified from every individual pose.',
        'The long extended tentacle poses, crouch/ball pose, jumps and fallen bodies remain visible; the selected B sheets have the intended low-recovery and hit sequence visible in their labeled cells.',
        'No whole tentacle endpoint is obviously truncated by a Canvas cell. Source fringe and overlap remain native limitations rather than a claim of mathematically perfect contours.'
    ],
    'archive__laughing_beauty': [
        'All six sheets show the distinct unarmored adult with short blond hair and an opaque olive/gray suit with pale panel bands.',
        'Free-hand gestures, low kicks, jumps, kneeling and sideways KO bodies are complete at the viewed resolution. No Beast tentacle or armor helmet appears.',
        'Contours exclude recognizable neighboring bodies while retaining the visible hands/feet; tiny semi-transparent native fringes are not certified absent.'
    ],
    'archive__paz': [
        'All six sheets show adult PW Paz with short wavy blond hair, a dark navy blazer/pleated skirt, white collar/red ribbon and high dark footwear.',
        'Low poses, jumps, kicks and the sideways resting/fallen body remain fully illustrated, with complete hands and footwear. C is free-hand signaling/guard/composure, with no gun or ZEKE equipment.',
        'These are authored bonus simulation gestures, not a canonical PW duel extraction. The probable pan seen in the original reference is omitted by this selected free-hand pose adaptation.',
        'The previously documented Xbox360 HD-port reference and footwear-material limitations remain; this Canvas inspection does not turn them into direct PSP pixel evidence.'
    ],
    'npc53__paz_gz': [
        'All six sheets show adult GZ Paz with cropped blond hair, the long worn prisoner shirt with rolled sleeves, bare legs and bare feet.',
        'All twelve cells of the corrected B LEFT are complete, including low recovery. The toes, knees, reaching hands and sideways resting body are visible in the rendered crops.',
        'The C gestures are unarmed signaling, defense and composure. No gun, grenade, ZEKE equipment, graphic trauma or extraction scene is present.',
        'The post-restraint bonus simulation posture is authored; it is not a recovered canonical combat sequence or a literal original animation.'
    ]
}


def info(path):
    path = Path(path)
    st = path.stat()
    return dict(path=str(path), bytes=st.st_size, sha256=hashlib.sha256(path.read_bytes()).hexdigest(),
                device=st.st_dev, inode=st.st_ino)


def main():
    qa_path = B / 'verification.json'
    qa = json.loads(qa_path.read_bytes())
    shots = sorted(B.glob('native-frames-*.png'))
    assert len(shots) == 78
    by_shot = {}
    for command_index, command in enumerate(qa):
        if command.get('command') != 'screenshot':
            continue
        matches = [Path(p) for p in command.get('arguments', []) if 'native-frames-' in str(p)]
        if not matches:
            continue
        assert len(matches) == 1
        assert command['exit'] == 0 and command['result']['success'] is True
        evaluation = qa[command_index - 1]
        assert evaluation['command'] == 'eval' and evaluation['exit'] == 0
        frames = evaluation['result']['data']['result']
        assert len(frames) == 12 and sorted(f['position'] for f in frames) == list(range(12))
        by_shot[matches[0].name] = (command_index, evaluation, frames)
    assert set(by_shot) == {p.name for p in shots}
    entries, kinds = [], collections.Counter()
    for path in shots:
        command_index, evaluation, frames = by_shot[path.name]
        uid = frames[0]['uid']
        assert uid in UID_NOTES and all(f['uid'] == uid for f in frames)
        assert all(f['frameFullyInsideCell'] is True for f in frames)
        assert all(f['nativeFacingWithoutMirror'] is True for f in frames)
        slot = frames[0]['key']
        assert path.name == f'native-frames-{uid}-{slot}.png'
        native_files = {(f['file'], f['sha256']) for f in frames}
        assert len(native_files) == 1
        native_path, native_sha = next(iter(native_files))
        native_info = info(R / native_path)
        assert native_info['sha256'] == native_sha
        slim = []
        for frame in frames:
            kinds[frame['poseSelection']] += 1
            rec = {key: value for key, value in frame.items() if key != 'clipPolygon'}
            polygon = frame.get('clipPolygon')
            rec['clipPolygonPoints'] = len(polygon) if polygon else 0
            rec['clipPolygonDataSha256'] = (hashlib.sha256(json.dumps(polygon, separators=(',', ':')).encode()).hexdigest()
                                            if polygon else None)
            # The flags below describe actual physical inspection at this screenshot resolution.
            rec['physicallyViewedCompleteVisibleCell'] = True
            rec['majorBodyPartsCompleteAtViewedResolution'] = True
            rec['noRecognizableNeighborFigureVisible'] = True
            rec['zeroNativeFringePixelsCertified'] = False
            slim.append(rec)
        entries.append(dict(uid=uid, slot=slot, screenshot=info(path), screenshotDimensions=list(Image.open(path).size),
                            sourceNativeAtlas=native_info, qaScreenshotCommandIndex=command_index,
                            qaEvaluationCommandIndex=command_index - 1,
                            origin=evaluation['result']['data']['origin'],
                            qaJsonPointers=[f'/{command_index}', f'/{command_index - 1}/result/data/result'],
                            physicallyViewedFullSheet=True, physicallyViewedPositions=list(range(12)),
                            visibleCellCount=12, invisibleSubRectanglesCertified=False,
                            observations=UID_NOTES[uid], frames=slim))
    totals = collections.Counter(e['uid'] for e in entries)
    assert len(totals) == 13 and all(v == 6 for v in totals.values())
    report = dict(schema='cqc.pass8.physical-canvas-sheet-review/1',
                  reviewer='/root/paz_two_versions_eva', reviewerName='paz_two_versions_eva',
                  reviewedAtUTC=datetime.now(timezone.utc).isoformat(),
                  status='all78-full-sheets-physically-viewed-with-native-edge-limits',
                  basis='Physical viewing through view_image of each complete existing 1280x1200 Canvas frame-review PNG; existing original-native/source review by root remains separately qualified.',
                  scope='standalone final-a native frame review page only, not a new live-fight/embedded/Vercel verification',
                  sheetCount=78, uidCount=13, physicallyViewedVisibleCells=936,
                  findingsRequiringNewCanvasCorrection=[],
                  qa=info(qa_path), qaReportedSelectionKinds=dict(kinds),
                  limitations=[
                      'Physical inspection sees all twelve displayed cells on every sheet, not invisible pixels outside the rendered contours or hidden geometry.',
                      'No zero-fringe, zero-semitransparent-pixel, mathematical contour-identity or absolute canonical 1:1 certification is made.',
                      'Fine Mantis puppet lines can be low contrast against the checkerboard, and hidden arm/tentacle/wing parts remain occluded.',
                      'Fixed source scale and visible foot/pivot placement were observed; numeric bounds and no-mirror flags are separately attributed to existing QA metadata.',
                      'Fifty-eight rendered cells are explicitly review-only unused source groups; seeing them does not assert that all936 cells occur in normal gameplay.',
                      'Wolf specialDown phase-only revision2 is outside this base screenshot timing evidence. Its geometry was reported unchanged by root; no re-timing certification is implied.',
                      'Original-game costume/face fidelity, age/incarnation, port evidence and adapted noncombatant roles retain their source-contract qualifications.'
                  ],
                  productionWrites=0, imageCopies=0, pixelsEdited=0,
                  uids=[dict(uid=uid, fullSheetsPhysicallyViewed=6, visibleCellsPhysicallyViewed=72,
                             observations=UID_NOTES[uid]) for uid in sorted(totals)],
                  sheets=entries)
    OUT.mkdir(exist_ok=True)
    path = OUT / 'paz-two-versions-eva-all13-native-canvas-physical-review.json'
    with path.open('x', encoding='utf-8') as f:
        json.dump(report, f, indent=2, ensure_ascii=False)
        f.write('\n')
    print(json.dumps(dict(report=info(path), sheetCount=78, cells=936, selectionKinds=dict(kinds),
                          findingsRequiringNewCanvasCorrection=0, pixelsEdited=0)))


if __name__ == '__main__':
    main()
