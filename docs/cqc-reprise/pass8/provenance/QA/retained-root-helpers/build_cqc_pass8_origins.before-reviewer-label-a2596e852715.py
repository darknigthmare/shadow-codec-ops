"""Bind physically reviewed muzzle marks to unchanged imported source geometry.

Measurement only: no image resizing, retouching, reflection or pixel writes.
"""
from pathlib import Path
from PIL import Image
import argparse
import hashlib
import json
import math
import shutil

ROOT = Path('/workspace/cqc-game-working/cqc-versus-v056')
parser = argparse.ArgumentParser()
parser.add_argument('--marks', type=Path, action='append', required=True)
args = parser.parse_args()
catalog = json.loads((ROOT / 'data/combat-sprite-catalog-v1.json').read_text())
target = ROOT / 'src/cqc-pass8-native-origins.js'
old = target.read_bytes()
start = old.decode().index('globalThis.CQC_PASS8_NATIVE_ORIGINS = ') + len('globalThis.CQC_PASS8_NATIVE_ORIGINS = ')
origins = json.loads(old.decode()[start:].strip().removesuffix(';'))
records = []
for marks_path in args.marks:
    source = json.loads(marks_path.read_text())
    uid = source['uid']
    if uid not in {'core__raging_raven', 'core__crying_wolf', 'core__eva_mgs3'}:
        raise ValueError('Only source-supported firearm incarnations may bind muzzle marks')
    entry = catalog['entries'][uid]
    review = json.loads((ROOT / 'preparation/combat-sprites-pass8' / uid / 'INTEGRATOR_VISUAL_REVIEW.json').read_text())
    assert review['status'] == 'approved' and review['reviewer'].startswith('root,')
    bound = {}
    for side, face in [('right', 1), ('left', -1)]:
        actions = entry['actions'] if entry['facing'] == face else entry['oppositeActions']
        for action, item in source['marks'][side].items():
            frame = actions[action]['frames'][item['frame']]
            assert item['frame'] == entry['phaseMap'][action]['active'][0]
            assert item['file'] == frame['file'] and item['sha256'] == frame['sha256']
            png = ROOT / frame['file']
            assert hashlib.sha256(png.read_bytes()).hexdigest() == frame['sha256']
            x, y, w, h = frame['rect']
            point = item['point']
            assert len(point) == 2 and all(isinstance(v, (int, float)) and math.isfinite(v) for v in point)
            assert x <= point[0] < x + w and y <= point[1] < y + h
            with Image.open(png) as image:
                rgba = image.convert('RGBA').getpixel(tuple(map(int, point)))
            assert rgba[3] >= 80, 'Observed muzzle must be an actual visible opaque source point'
            assert list(rgba) == item['pointRGBA']
            scale = entry['displayHeight'] / entry['sourceFrameHeights'][frame['file']] * 1.12
            forward = (point[0] - (x + w * frame['pivot'][0])) * face * scale
            height = (y + h * frame['pivot'][1] - point[1]) * scale
            assert 0 <= forward <= 220 and 0 < height <= 330, (uid, action, side, forward, height)
            mark = {'action': action, 'frame': item['frame'], 'file': frame['file'], 'sha256': frame['sha256'],
                    'point': point, 'sourcePixelAlpha': rgba[3], 'rect': frame['rect'], 'pivot': frame['pivot'],
                    'sourceFrameHeight': entry['sourceFrameHeights'][frame['file']],
                    'pointKind': 'native-visible-firearm-muzzle', 'physicallyViewed': True,
                    'adaptedWorldForward': forward, 'adaptedWorldHeight': height, 'engineBodyScale': 1.12,
                    'notes': [item['note'], 'Root physically viewed complete native firearm sheet and visible muzzle ends. Source-SHA/crop/pivot/scale bound; authored versus geometry, no original-game pixel or timing identity certification.']}
            bound.setdefault(action, {})[side] = mark
            records.append({'uid': uid, 'action': action, 'side': side, 'forward': forward, 'height': height, 'alpha': rgba[3]})
    assert all(set(pair) == {'right', 'left'} for pair in bound.values())
    if uid in origins and origins[uid] != bound:
        raise ValueError('Preserve already frozen origin revision explicitly before replacement: ' + uid)
    origins[uid] = bound
new = ('/* Physically reviewed complete native muzzle points; exact source SHA, crop, body pivot and upright scale guarded. */\n'
       + 'globalThis.CQC_PASS8_NATIVE_ORIGINS = ' + json.dumps(origins, ensure_ascii=False, separators=(',', ':')) + ';\n').encode()
if new != old:
    previous = ROOT / 'preparation/reprise-pass8-provenance/source-drafts' / ('cqc-pass8-native-origins.before-' + hashlib.sha256(old).hexdigest()[:12] + '.js')
    previous.parent.mkdir(parents=True, exist_ok=True)
    if not previous.exists():
        previous.write_bytes(old)
    target.write_bytes(new)
report = ROOT / 'preparation/reprise-pass8-provenance' / ('NATIVE_ORIGIN_BINDING-' + hashlib.sha256(new).hexdigest()[:12] + '.json')
document = {'schema': 'cqc.pass8.native-origin-binding/1', 'status': 'passed', 'nativeSourceBytesUntouched': True,
            'sourceFiles': [{'path': str(p), 'sha256': hashlib.sha256(p.read_bytes()).hexdigest()} for p in args.marks],
            'boundCatalogSHA256': hashlib.sha256(new).hexdigest(), 'records': records}
if not report.exists():
    report.write_text(json.dumps(document, ensure_ascii=False, indent=2) + '\n')
print(json.dumps({'status': 'passed', 'boundMarks': len(records), 'nativeSourceBytesUntouched': True, 'report': str(report)}))
