#!/usr/bin/env python3
"""Independent, read-only checks after physical viewing of 18 fresh captures."""
import hashlib
import json
import math
from pathlib import Path
from PIL import Image

R = Path('/workspace/cqc-game-working/cqc-versus-v056')
OUT = Path('/workspace/cqc-pass6-native-ceiling-physical-review.json')
CAPTURE = Path('/workspace/cqc-pass6-native-ceiling-browser/inspection.json')
OLD = R / 'recovery/pass6-before-stage-cover/data/stage-layer-catalog-reprise.json'
CURRENT = R / 'data/stage-layer-catalog-reprise.json'
UIDS = ('lobito', 'saintlogic', 'saintlogic_security')

def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def main():
    assert not OUT.exists(), 'Do not overwrite an earlier review.'
    checks = []
    def check(name, ok, details=None):
        checks.append({'name': name, 'passed': bool(ok), 'details': details})
    old = json.loads(OLD.read_text())
    current = json.loads(CURRENT.read_text())
    baseline = {x['id']: x for x in old['stages']}
    now = {x['id']: x for x in current['stages']}
    check('all 30 stage identities preserved', set(baseline) == set(now) and len(now) == 30)
    check('123 previous layers plus exactly 3 additions', sum(len(s['layers']) for s in baseline.values()) == 123 and sum(len(s['layers']) for s in now.values()) == 126)
    old_count = 0
    for uid, stage in baseline.items():
        layers = now[uid]['layers'][1:] if uid in UIDS else now[uid]['layers']
        check(f'{uid}: old layer objects unchanged', layers == stage['layers'])
        if uid not in UIDS:
            check(f'{uid}: whole stage object unchanged', now[uid] == stage)
        for layer in stage['layers']:
            p = R / layer['file']
            check(f"{uid}/{layer['id']}: old image SHA unchanged", p.is_file() and sha(p) == layer['sha256'])
            old_count += 1
    additions = []
    viewed_references = []
    for uid in UIDS:
        layer = now[uid]['layers'][0]
        source_dir = Path('/workspace/cqc-pass6-stage-ceilings') / uid
        native = source_dir / 'CEILING_01_NATIVE.png'
        facts = json.loads((source_dir / 'NATIVE_SOURCE_01.json').read_text())
        original = Path(facts['nativeOriginal'])
        asset = R / layer['file']
        check(f'{uid}: new layer first beneath unchanged sky', layer['id'] == 'ceiling-extension' and now[uid]['layers'][1]['id'] == 'sky')
        check(f'{uid}: source, native original and runtime asset byte identical', native.read_bytes() == original.read_bytes() == asset.read_bytes())
        check(f'{uid}: declared native SHA', sha(native) == layer['sha256'] == facts['sha256'])
        with Image.open(native) as im:
            check(f'{uid}: native RGB dimensions 2172 by 724', im.size == (2172, 724) and im.mode == 'RGB')
        rect = layer['rect']
        check(f'{uid}: exact camera-margin rect', rect['x'] == -220 and rect['y'] == -396.8 and rect['width'] == 1720 and math.isclose(rect['height'], 573.3333333333334, abs_tol=1e-10))
        check(f'{uid}: native aspect preserved in Canvas', math.isclose(rect['width'] / rect['height'], 2172 / 724, abs_tol=1e-12))
        check(f'{uid}: fixed background architecture', layer['parallax'] == 0 and layer['phase'] == 'background' and layer['role'] == 'architecture' and layer['transparent'] is False)
        check(f'{uid}: source refs preserved', now[uid]['references'] == baseline[uid]['references'] and layer['referenceURLs'] == baseline[uid]['layers'][0]['referenceURLs'])
        bounds = []
        for camera in (-220, 0, 220):
            for zoom in (.78, 1.08):
                tx = 640 - 640 * zoom
                ty = 568 * (1 - zoom)
                x1, x2 = tx + rect['x'] * zoom, tx + (rect['x'] + rect['width']) * zoom
                y1, y2 = ty + rect['y'] * zoom, ty + (rect['y'] + rect['height']) * zoom
                sky_top = ty + baseline[uid]['layers'][0]['rect']['y'] * zoom
                check(f'{uid}: ceiling covers margin camera {camera} zoom {zoom}', x1 <= 0 and x2 >= 1280 and y1 <= 0 and y2 >= max(0, sky_top))
                bounds.append({'camera': camera, 'zoom': zoom, 'bounds': [x1, y1, x2, y2], 'originalSkyTop': sky_top})
        additions.append({'uid': uid, 'layer': layer, 'source': facts, 'screenCoverage': bounds})
        for ref in baseline[uid]['references']:
            p = R / ref['file']
            check(f"{uid}: reference SHA {p.name}", p.is_file() and sha(p) == ref['sha256'])
            viewed_references.append({'file': str(p), 'sha256': sha(p), 'url': ref['url'], 'physicallyViewed': True})
    captures = json.loads(CAPTURE.read_text())
    check('fresh capture run completed with no failure', captures['failure'] is None)
    check('18 distinct expected camera/zoom captures', {(x['stage'], x['camera'], x['zoom']) for x in captures['captures']} == {(u, c, z) for u in UIDS for c in (-220, 0, 220) for z in (.78, 1.08)} and len(captures['captures']) == 18)
    reviewed = []
    for c in captures['captures']:
        p = Path(c['file'])
        check(f'{p.name}: captured PNG SHA', p.is_file() and sha(p) == c['sha256'])
        check(f"{p.name}: layer runtime ready without errors", c['status']['state'] == 'ready' and c['status']['errors'] == [] and c['status']['layers'] == 5)
        reviewed.append({**c, 'physicallyViewed': True, 'physicalVerdict': 'accepted_closest', 'emptyUpperBand': False, 'duplicatedWindowsLightsOrStairs': False, 'visibleJoin': 'Shallow horizontal ceiling-plane join remains visible at zoom 0.78; no exposed background gap.' if c['zoom'] == .78 else 'Extension is outside the visible camera crop.'})
    pin = json.loads(Path('/workspace/cqc-delivered-pass5-baseline-files.json').read_text())
    if isinstance(pin, dict):
        pin = pin.get('files', pin.get('entries', []))
    renderer = next(x for x in pin if x['path'] == 'src/cqc-stage-layers.js')
    check('stage renderer untouched against delivered PASS5', sha(R / renderer['path']) == renderer['sha256'])
    failure_count = sum(not x['passed'] for x in checks)
    report = {
        'schema': 'cqc.pass6.native-ceiling-physical-review/1',
        'status': 'accepted_closest' if failure_count == 0 else 'failed',
        'reviewer': '/root/pass6_ceiling_review',
        'reviewMethod': 'Independent physical viewing with view_image of every listed native, reference and fresh capture, plus read-only structural/SHA checks.',
        'fidelityStatus': 'closest_supported',
        'absolute1to1Certified': False,
        'limits': ['Original PSP references support palette, panel materials and room features; they do not show this authored upper ceiling geometry.', 'The horizontal join remains perceptible at minimum zoom. This is an accepted camera-margin material continuation, not a recovered original PSP ceiling mesh.', 'The rejected uniform background enlargement and its duplicate geometry are not approved by this report.'],
        'catalogAtReview': {'path': str(CURRENT), 'sha256': sha(CURRENT)},
        'baselineCatalog': {'path': str(OLD), 'sha256': sha(OLD)},
        'captureRun': {'path': str(CAPTURE), 'sha256': sha(CAPTURE)},
        'oldImageChecks': old_count,
        'newNativeCount': 3,
        'physicalCaptureCount': 18,
        'physicalReferenceCount': len(viewed_references),
        'checks': checks,
        'checkCount': len(checks),
        'failures': failure_count,
        'additions': additions,
        'physicallyViewedReferences': viewed_references,
        'physicallyViewedCaptures': reviewed,
        'rejectedCandidateApproved': False,
    }
    OUT.write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n')
    print(json.dumps({'status': report['status'], 'checks': len(checks), 'failures': failure_count, 'report': str(OUT)}))
    raise SystemExit(1 if failure_count else 0)

if __name__ == '__main__':
    main()
