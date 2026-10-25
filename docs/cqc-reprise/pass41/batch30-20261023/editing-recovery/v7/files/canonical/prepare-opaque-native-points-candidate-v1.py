"""Create four unapproved metadata-only point corrections after Root's alpha review.

The explicit native coordinates below were inspected on the unchanged source
sheets. This tool does not edit, crop, filter, or rewrite any source image.
"""
from pathlib import Path
import copy
import hashlib
import html
import json
import math
from PIL import Image

ROOT = Path('@PROJECT_ROOT@')
INTEGRATION = ROOT / 'integration'
CASES = [
    ('dododo-sourcev3-manual-axis-candidate-v4', 'dododo-sourcev3-opaque-points-candidate-v5',
     {('left', 'shoot'): [965.5, 708.5]}),
    ('banana-sourcev2-logical-v2-candidate-v5', 'banana-sourcev2-opaque-points-candidate-v6',
     {('right', 'shoot'): [1224.5, 722.5], ('right', 'deploy'): [606.5, 753.5]}),
    ('fly-manual-axis-candidate-v2', 'fly-opaque-points-candidate-v3',
     {('right', 'shoot'): [1223.5, 732.5], ('right', 'deploy'): [621.5, 739.5],
      ('left', 'shoot'): [953.5, 720.5], ('left', 'deploy'): [345.5, 732.5]}),
    ('dpm-manual-axis-candidate-v2', 'dpm-opaque-points-candidate-v3',
     {('left', 'shoot'): [952.5, 726.5], ('left', 'deploy'): [356.5, 743.5]}),
]


def pin(path):
    path = Path(path)
    data = path.read_bytes()
    return {'path': str(path), 'bytes': len(data),
            'sha256': hashlib.sha256(data).hexdigest()}


def write(path, value):
    assert not path.exists(), f'Never overwrite: {path}'
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n')


def pixel(image, xy):
    return list(image.getpixel(tuple(math.floor(n) for n in xy)))


def panel(asset, xy, color, label, bounds, rear=None):
    x, y, width, height = bounds
    source = '/' + str(Path(asset['path']).relative_to(ROOT))
    parts = [f'<div><p>{html.escape(label)}</p><svg viewBox="{x} {y} {width} {height}" '
             'aria-label="Repère sur le PNG source inchangé">',
             f'<image href="{html.escape(source)}" x="0" y="0" '
             f'width="{asset["width"]}" height="{asset["height"]}"/>']
    if rear:
        parts += [f'<line x1="{rear[0]}" y1="{rear[1]}" x2="{xy[0]}" '
                  f'y2="{xy[1]}" stroke="{color}" stroke-width=".3"/>',
                  f'<circle cx="{rear[0]}" cy="{rear[1]}" r="1.5" '
                  'fill="none" stroke="#50c9f2" stroke-width=".4"/>']
    parts += [f'<circle cx="{xy[0]}" cy="{xy[1]}" r="1.6" '
              f'fill="none" stroke="{color}" stroke-width=".35"/>',
              f'<path d="M {xy[0]-2.8} {xy[1]} h 5.6 M {xy[0]} {xy[1]-2.8} v 5.6" '
              f'stroke="{color}" stroke-width=".25"/>', '</svg></div>']
    return ''.join(parts)


manifest = []
for old_name, new_name, points in CASES:
    old_path = INTEGRATION / old_name / 'JOB_FOR_ROOT_REVIEW.json'
    before = json.loads(old_path.read_text())
    after = copy.deepcopy(before)
    destination = INTEGRATION / new_name
    destination.mkdir(exist_ok=False)
    assets = {a['key']: a for a in before['assets']}
    images = {}
    for key, asset in assets.items():
        actual = pin(asset['path'])
        assert actual['bytes'] == asset['bytes'] and actual['sha256'] == asset['sha256']
        images[key] = Image.open(asset['path']).convert('RGBA')
    changes = []
    all_points = []
    cards = []
    for index, (a, corrected) in enumerate(zip(before['anchors'], after['anchors'])):
        key = (a['side'], a['action'])
        asset_key = before['roles'][a['side']][a['roleIndex']]['asset']
        asset = assets[asset_key]
        image = images[asset_key]
        if key in points:
            corrected['nativeXY'] = points[key]
            distance = math.dist(a['nativeXY'], corrected['nativeXY'])
            assert 0 < distance <= 2
            reason = ('Move inward from antialiased suppressor rim onto the neighboring opaque '
                      'suppressor end, preserving the horizontal barrel axis and exact rear point.'
                      if a['action'] == 'shoot' else
                      'Move by one native pixel from the antialiased fingertip rim onto the same '
                      'visible release finger; no arm, hand, pose, or artwork movement.')
            entry = {'anchorIndex': index, 'side': a['side'], 'action': a['action'],
                     'socket': a['socket'], 'source': pin(asset['path']),
                     'beforeNativeXY': a['nativeXY'], 'afterNativeXY': corrected['nativeXY'],
                     'beforeRGBA': pixel(image, a['nativeXY']),
                     'afterRGBA': pixel(image, corrected['nativeXY']),
                     'movementNativePixels': distance, 'qualification': reason,
                     'rearNativeXYUnchanged': a.get('rearNativeXY')}
            changes.append(entry)
            cx, cy = a['nativeXY']
            bounds = [max(0, cx-35), max(0, cy-24), 70, 48]
            label = f'{before["label"]} — {a["side"]} {a["action"]}'
            cards += [f'<article><h2>{html.escape(label)}</h2><p>'
                      f'{entry["movementNativePixels"]:g} px ; alpha '
                      f'{entry["beforeRGBA"][3]} → {entry["afterRGBA"][3]}.</p><div class="pair">',
                      panel(asset, a['nativeXY'], '#ff5656',
                            f'AVANT {a["nativeXY"]}', bounds, a.get('rearNativeXY')),
                      panel(asset, corrected['nativeXY'], '#52ff94',
                            f'APRÈS {corrected["nativeXY"]}', bounds, a.get('rearNativeXY')),
                      '</div><code>' + asset['sha256'] + '</code></article>']
        assert pixel(image, corrected['nativeXY'])[3] >= 200
        if 'rearNativeXY' in corrected:
            assert corrected['rearNativeXY'] == a['rearNativeXY']
            dx = corrected['nativeXY'][0] - corrected['rearNativeXY'][0]
            dy = corrected['nativeXY'][1] - corrected['rearNativeXY'][1]
            assert dy == 0 and (dx > 0 if a['side'] == 'right' else dx < 0)
        all_points.append({'anchorIndex': index, 'side': corrected['side'],
                           'action': corrected['action'], 'nativeXY': corrected['nativeXY'],
                           'RGBA': pixel(image, corrected['nativeXY']),
                           'rearNativeXY': corrected.get('rearNativeXY')})
    assert len(changes) == len(points)
    # Verify that only the explicitly listed nativeXY anchor fields differ.
    reverted = copy.deepcopy(after)
    for row in changes:
        reverted['anchors'][row['anchorIndex']]['nativeXY'] = row['beforeNativeXY']
    assert reverted == before
    for dependency in (before['geometry'], before['ownershipBook']):
        actual = pin(dependency['path'])
        assert actual['bytes'] == dependency['bytes'] and actual['sha256'] == dependency['sha256']
    job_path = destination / 'JOB_FOR_ROOT_REVIEW.json'
    write(job_path, after)
    report = {'schema': 'cqc.pass41.opaque-native-point-review-candidate/1',
              'status': 'UNAPPROVED_ROOT_REVIEW_REQUIRED', 'beforeJob': pin(old_path),
              'afterJob': pin(job_path), 'changes': changes, 'allAnchorChecks': all_points,
              'assertions': {'onlyExplicitAnchorNativeXYChanged': True,
                             'all16RoleAxesAndPlansUnchangedBothSides': True,
                             'standingHeightsUnchanged': True, 'sourcePNGsByteIdentical': True,
                             'geometryAndOwnershipBookByteIdentical': True,
                             'allFourFrontAnchorsAlphaAtLeast200': True,
                             'rearPointsUnchangedAndShotAxesHorizontal': True},
              'productMutations': False, 'sourceImageMutations': False,
              'approvalInherited': False}
    write(destination / 'POINT_CORRECTIONS_PREFLIGHT_ACTUAL_V1.json', report)
    review_html = ('<!doctype html><html lang="fr"><meta charset="utf-8">'
                   '<title>Points natifs — revue avant/après</title><style>'
                   'html{background:#161d21;color:#eff5f2;font:15px system-ui}'
                   'body{max-width:1200px;margin:20px auto}h1{font-size:22px}'
                   'h2{font-size:17px}article{margin:22px 0;padding:12px;background:#253037}'
                   '.pair{display:grid;grid-template-columns:1fr 1fr;gap:14px}'
                   'svg{width:100%;height:310px;background:repeating-conic-gradient('
                   '#313d44 0% 25%,#46515b 0% 50%) 50%/12px 12px;image-rendering:pixelated}'
                   'code{font-size:11px}p{line-height:1.5}</style>'
                   f'<h1>{html.escape(before["label"])} — points natifs à contre-vérifier</h1>'
                   '<p>Candidat non approuvé. Le PNG source reste identique : les repères '
                   'avant/après sont uniquement superposés en SVG. Les déplacements de 1 à 2 pixels '
                   'restent sur le même bout de silencieux ou doigt de lâcher. '
                   'Axe arrière bleu inchangé ; aucune modification des 32 poses, du sol ou de la taille.</p>'
                   + ''.join(cards) + '</html>')
    html_path = destination / 'source-points-before-after-review.html'
    assert not html_path.exists()
    html_path.write_text(review_html)
    write(destination / 'ROOT_REVIEW_PENDING_ACTUAL_V1.json', {
        'schema': 'cqc.pass41.root-review-pending/1', 'job': pin(job_path),
        'reason': 'Fresh job has only corrected explicit native anchor pixels. Root must inspect '
                  'the unchanged source plus before/after overlay and bind a new review.',
        'approved': False})
    manifest.append({'id': after['id'], 'job': pin(job_path),
                     'preflight': pin(destination / 'POINT_CORRECTIONS_PREFLIGHT_ACTUAL_V1.json'),
                     'reviewHTML': pin(html_path), 'changedPoints': len(changes)})
out = ROOT / 'canonical' / 'FOUR_OPAQUE_POINTS_CANDIDATES_HANDOFF_ACTUAL_V1.json'
write(out, {'schema': 'cqc.pass41.four-opaque-point-candidates/1',
            'status': 'UNAPPROVED_ROOT_REVIEW_REQUIRED', 'jobs': manifest,
            'totalChangedPoints': sum(x['changedPoints'] for x in manifest),
            'productMutations': False, 'sourcePNGMutations': False})
print(json.dumps(pin(out)))
