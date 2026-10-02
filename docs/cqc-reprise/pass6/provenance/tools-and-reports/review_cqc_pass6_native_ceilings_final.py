#!/usr/bin/env python3
"""Pin final ceiling metadata without modifying the original physical review."""
import copy
import hashlib
import json
import math
from pathlib import Path
from PIL import Image

R = Path('/workspace/cqc-game-working/cqc-versus-v056')
ORIGINAL = Path('/workspace/cqc-pass6-native-ceiling-physical-review.json')
OUT = Path('/workspace/cqc-pass6-native-ceiling-physical-review-final.json')
EXPECTED_ORIGINAL = '521eb21b0a04b941540ce0af5d118f5299df42e31e6c3988378fab3e85f8bb11'
EXPECTED_FINAL = 'dce3b8fe59a182c419a6109344ebbd6f7e3b69b467ba9651045535cebfd2a7a3'
SUFFIX = ' Fresh PASS6 runtime review supersedes the historical dark-band limitation: six camera/zoom states reviewed per stage; no duplicated architecture. Horizontal panel join remains perceptible at zoom 0.78. Ceiling geometry is authored material continuation, not an exact original PSP roof reconstruction.'
UIDS = ('lobito', 'saintlogic', 'saintlogic_security')

def sha(p):
    return hashlib.sha256(p.read_bytes()).hexdigest()

def main():
    assert not OUT.exists(), 'Do not overwrite an earlier final review.'
    checks = []
    def check(name, ok, details=None):
        checks.append({'name': name, 'passed': bool(ok), 'details': details})
    original_bytes = ORIGINAL.read_bytes()
    physical = json.loads(original_bytes)
    check('original physical review SHA unchanged', sha(ORIGINAL) == EXPECTED_ORIGINAL)
    check('original physical review remains accepted, 268 checks and no failures', physical['status'] == 'accepted_closest' and physical['checkCount'] == 268 and physical['failures'] == 0)
    catalog_path = R / 'data/stage-layer-catalog-reprise.json'
    catalog = json.loads(catalog_path.read_text())
    check('final catalog exact approved SHA', sha(catalog_path) == EXPECTED_FINAL)
    previous = json.loads(Path(physical['baselineCatalog']['path']).read_text())
    check('PASS5 baseline catalog unchanged', sha(Path(physical['baselineCatalog']['path'])) == physical['baselineCatalog']['sha256'])
    old = {s['id']: s for s in previous['stages']}
    now = {s['id']: s for s in catalog['stages']}
    check('same 30 stage identities', set(old) == set(now) and len(now) == 30)
    check('old 123 layers plus 3 additions', sum(len(s['layers']) for s in old.values()) == 123 and sum(len(s['layers']) for s in now.values()) == 126)
    recon = copy.deepcopy(catalog)
    changed = []
    for stage in recon['stages']:
        uid = stage['id']
        if uid not in UIDS:
            check(f'{uid}: whole stage unchanged', now[uid] == old[uid])
        else:
            mark = stage['review']['pass6CameraMargin']
            check(f'{uid}: final accepted marker', mark['status'] == 'accepted_closest')
            check(f'{uid}: evidence binds original physical review', mark['physicalReviewSHA256'] == EXPECTED_ORIGINAL and mark['physicalReviewEvidence'] == 'preparation/reprise-pass6-provenance/tools-and-reports/cqc-pass6-native-ceiling-physical-review.json' and mark['runtimeEvidence'] == 'docs/reprise-qa/pass6/cqc-pass6-native-ceiling-browser/inspection.json')
            check(f'{uid}: documented authored margin and perceptible join', mark['notes'].endswith(SUFFIX) and old[uid]['review']['absolute1to1Certified'] is False and now[uid]['review']['absolute1to1Certified'] is False)
            changed.append({'uid': uid, 'metadata': copy.deepcopy(mark), 'changedFieldsSincePhysicalReview': ['status', 'notes', 'runtimeEvidence', 'physicalReviewEvidence', 'physicalReviewSHA256']})
            mark['status'] = 'native-generated-awaiting-runtime-review'
            for key in ('runtimeEvidence', 'physicalReviewEvidence', 'physicalReviewSHA256'):
                del mark[key]
            if mark['notes'].endswith(SUFFIX):
                mark['notes'] = mark['notes'][:-len(SUFFIX)]
        kept = now[uid]['layers'][1:] if uid in UIDS else now[uid]['layers']
        check(f'{uid}: old layers structurally identical', kept == old[uid]['layers'])
        if uid in UIDS:
            baseline_stage = copy.deepcopy(now[uid])
            baseline_stage['layers'] = baseline_stage['layers'][1:]
            del baseline_stage['review']['pass6CameraMargin']
            check(f'{uid}: entire stage unchanged except addition and new review marker', baseline_stage == old[uid])
        for layer in old[uid]['layers']:
            p = R / layer['file']
            check(f"{uid}/{layer['id']}: old PNG SHA unchanged", p.is_file() and sha(p) == layer['sha256'])
    reconstructed = json.dumps(recon, ensure_ascii=False, indent=2) + '\n'
    previous_sha = hashlib.sha256(reconstructed.encode()).hexdigest()
    check('reversing only declared metadata changes recovers exact catalog physically reviewed', previous_sha == physical['catalogAtReview']['sha256'], previous_sha)
    additions = []
    for addition in physical['additions']:
        uid = addition['uid']
        layer = now[uid]['layers'][0]
        check(f'{uid}: new layer exact object from physical review', layer == addition['layer'])
        source = addition['source']
        source_path = Path(source['source'])
        original_path = Path(source['nativeOriginal'])
        asset = R / layer['file']
        check(f'{uid}: native source, original and runtime PNG SHA unchanged', sha(source_path) == sha(original_path) == sha(asset) == source['sha256'] == layer['sha256'])
        check(f'{uid}: native metadata unchanged', json.loads((source_path.parent / 'NATIVE_SOURCE_01.json').read_text()) == source)
        with Image.open(source_path) as im:
            check(f'{uid}: unchanged 2172 by 724 RGB native', im.size == (2172, 724) and im.mode == 'RGB')
        check(f'{uid}: native Canvas aspect preserved', math.isclose(layer['rect']['width'] / layer['rect']['height'], 3.0, abs_tol=1e-12))
        additions.append({'uid': uid, 'layer': layer, 'sourceSHA256': sha(source_path), 'runtimeAssetSHA256': sha(asset)})
    for record in physical['physicallyViewedReferences']:
        p = Path(record['file'])
        check(f'{p.name}: physically reviewed reference SHA unchanged', sha(p) == record['sha256'])
    for record in physical['physicallyViewedCaptures']:
        p = Path(record['file'])
        check(f'{p.name}: physically reviewed capture SHA unchanged', sha(p) == record['sha256'])
    check('original capture run unchanged', sha(Path(physical['captureRun']['path'])) == physical['captureRun']['sha256'])
    js_path = R / 'src/cqc-stage-layer-data.js'
    text = js_path.read_text()
    data = text.split('window.CQC_STAGE_LAYER_DATA = ', 1)[1].rsplit(';', 1)[0]
    check('embedded JavaScript matches final JSON', json.loads(data) == catalog)
    finalizer = Path('/workspace/finalize_cqc_pass6_stage_metadata.py')
    provenance_copy = R / 'preparation/reprise-pass6-provenance/tools-and-reports/cqc-pass6-native-ceiling-physical-review.json'
    check('preserved original physical review copy exact', provenance_copy.is_file() and sha(provenance_copy) == EXPECTED_ORIGINAL)
    pin = json.loads(Path('/workspace/cqc-delivered-pass5-baseline-files.json').read_text())
    if isinstance(pin, dict):
        pin = pin.get('files', pin.get('entries', []))
    renderer = next(x for x in pin if x['path'] == 'src/cqc-stage-layers.js')
    check('stage renderer unchanged since delivered PASS5', sha(R / renderer['path']) == renderer['sha256'])
    check('original report bytes never modified', ORIGINAL.read_bytes() == original_bytes)
    failures = sum(not x['passed'] for x in checks)
    result = {
        'schema': 'cqc.pass6.native-ceiling-final-review/1',
        'status': 'accepted_closest' if failures == 0 else 'failed',
        'reviewer': '/root/pass6_ceiling_review',
        'originalPhysicalReview': {'path': str(ORIGINAL), 'sha256': EXPECTED_ORIGINAL, 'checks': 268, 'failures': 0},
        'finalCatalog': {'path': str(catalog_path), 'sha256': sha(catalog_path)},
        'finalEmbeddedData': {'path': str(js_path), 'sha256': sha(js_path)},
        'metadataFinalizer': {'path': str(finalizer), 'sha256': sha(finalizer)},
        'reviewMethod': 'Original visual evidence remains byte identical. Exact inverse of the declared metadata-only finalization recovers the previous physically reviewed catalog SHA. No image replay required.',
        'metadataChangesOnlySincePhysicalReview': previous_sha == physical['catalogAtReview']['sha256'],
        'reconstructedPreviousCatalogSHA256': previous_sha,
        'fidelityStatus': 'closest_supported',
        'absolute1to1Certified': False,
        'limits': physical['limits'],
        'physicalCaptureCount': 18,
        'physicalReferenceCount': 5,
        'newNativeCount': 3,
        'oldImagesPreserved': 123,
        'otherStageObjectsPreserved': 27,
        'additions': additions,
        'finalizedMetadata': changed,
        'checks': checks,
        'checkCount': len(checks),
        'failures': failures,
        'rejectedCandidateApproved': False,
    }
    OUT.write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n')
    print(json.dumps({'status': result['status'], 'checks': len(checks), 'failures': failures, 'report': str(OUT), 'sha256': sha(OUT)}))
    raise SystemExit(1 if failures else 0)

if __name__ == '__main__':
    main()
