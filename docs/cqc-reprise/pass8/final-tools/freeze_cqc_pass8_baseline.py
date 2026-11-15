from pathlib import Path
import concurrent.futures
import hashlib
import json
import os
from datetime import datetime, timezone

W = Path('/workspace')
R = W / 'cqc-game-working/cqc-versus-v056'
S = W / 'shadow-codec-recovered'

def sha(path):
    digest = hashlib.sha256()
    with path.open('rb') as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b''):
            digest.update(block)
    return digest.hexdigest()

def write_once(path, document):
    if path.exists():
        assert json.loads(path.read_text()) == document, 'Existing frozen evidence differs: ' + str(path)
        return
    with path.open('x', encoding='utf-8') as stream:
        json.dump(document, stream, ensure_ascii=False, indent=2)
        stream.write('\n')

def pin(path):
    before = path.stat()
    assert path.is_file() and not path.is_symlink(), str(path)
    digest = sha(path)
    after = path.stat()
    assert (before.st_size, before.st_mtime_ns) == (after.st_size, after.st_mtime_ns), str(path)
    return {'path': str(path), 'bytes': after.st_size, 'sha256': digest}

def relative_pin(path):
    result = pin(path)
    result['path'] = str(path.relative_to(R))
    return result

inventory = sorted(p for p in R.rglob('*') if p.is_file())
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as executor:
    rows = list(executor.map(relative_pin, inventory))
baseline = W / 'cqc-delivered-pass7-baseline-files.json'
write_once(baseline, rows)

old_path = W / 'cqc-pass6-previous-deliveries-frozen.json'
old_pins = json.loads(old_path.read_text())['files']
assert len(old_pins) == 46
old_stats = []
for item in old_pins:
    path = Path(item['path'])
    assert path.is_file() and path.stat().st_size == item['bytes'], str(path)
    old_stats.append({'path': str(path), 'bytes': path.stat().st_size, 'exists': True})

review = W / 'cqc-pass7-preservation-review-corrected.json'
review_data = json.loads(review.read_text())
assert review_data['status'] == 'passed' and review_data['failureCount'] == 0
previous_review = {item['path']: item for item in review_data['measures']['previousDeliveries']}
for item in old_pins:
    verified = previous_review[item['path']]
    assert verified['sha256'] == item['sha256'] and verified['bytes'] == item['bytes']

qa_path = W / 'cqc-pass7-github-qa-facts.json'
qa_data = json.loads(qa_path.read_text())
assert qa_data['confirmedByRoot'] and qa_data['status'] == 'passed'
qa_reports = []
for item in qa_data['reports']:
    actual = pin(Path(item['path']))
    assert actual['sha256'] == item['sha256'], item['path']
    qa_reports.append({**item, 'bytes': actual['bytes'], 'verifiedSha256': True})

catalog_path = R / 'data/combat-sprite-catalog-v1.json'
catalog = json.loads(catalog_path.read_text())
entries = catalog['entries']
assert len(entries) == 26
native_files = set()
def collect(value):
    if isinstance(value, dict):
        file = value.get('file')
        if isinstance(file, str) and file.startswith('assets/combat-sprites/') and file.endswith('.png'):
            native_files.add(file)
        for child in value.values():
            collect(child)
    elif isinstance(value, list):
        for child in value:
            collect(child)
collect(entries)
assert len(native_files) == 156, len(native_files)
native_pins = [relative_pin(R / filename) for filename in sorted(native_files)]
native_proof = W / 'cqc-pass8-frozen-pass7-native-routing.json'
write_once(native_proof, {
    'schema': 'cqc.pass8.frozen-pass7-native-routing/1',
    'catalog': pin(catalog_path),
    'entries': sorted(entries),
    'entryCount': 26,
    'nativePngCount': 156,
    'nativePngs': native_pins,
    'renderer': pin(R / 'src/cqc-sprite-renderer.js'),
    'completeCatalogBytesPinnedByBaseline': True,
})

native_preservation = R / 'preparation/ALL_NATIVE_GENERATION_PRESERVATION.json'
native_inventory = json.loads(native_preservation.read_text())
assert len(native_inventory['files']) == 536
assert not native_inventory['additionalUnassignedFiles']
facts = {
    'schema': 'cqc.pass8.baseline-facts/1',
    'date': '2026-10-02',
    'createdAt': datetime.now(timezone.utc).isoformat(),
    'sourceRoot': str(R),
    'sourceFiles': len(rows),
    'sourceBytes': sum(item['bytes'] for item in rows),
    'baselineFile': str(baseline),
    'baselineSha256': sha(baseline),
    'publishedPASS7ProofCommit': '37a0fa6682583cbfed4dfc8a55a5ecba4c6ed927',
    'publishedPASS7GameplayCommit': 'a739238479c0eb7e14fd6b4a35cb7da77338b575',
    'publishedPASS7ProofTree': 'a3daf05c322f85cda0c6febe3c95914bd5371fd6',
    'publishedPASS7GameplayTree': 'fbe384a8f953dd7395b5e795c9248eb67deaedc7',
    'previousArchiveAndSidecarPins': 46,
    'previousArchiveAndSidecarSource': pin(old_path),
    'previousArchiveAndSidecars': old_pins,
    'historicalArchiveVerification': {
        'currentAction': 'existence and byte-count checked; original pinned SHA256 values retained',
        'fullHashAndZipCRCProof': pin(review),
        'repeatedZipCRCRead': False,
        'currentStatChecks': old_stats,
    },
    'pass7QA': pin(qa_path),
    'pass7QAReports': qa_reports,
    'frozenNativeRouting': pin(native_proof),
    'nativeRoutingEntries': 26,
    'nativeRoutingPngs': 156,
    'previousNativeGenerationInventory': pin(native_preservation),
    'previousNativeGenerationFiles': 536,
    'productionContentChanges': 0,
    'sourceCodeWritersMayStartAfterThisFileExists': True,
}
facts_path = W / 'cqc-pass8-frozen-baseline-facts.json'
write_once(facts_path, facts)
print(json.dumps({
    'baselineFile': str(baseline),
    'baselineSHA256': sha(baseline),
    'sourceFiles': len(rows),
    'sourceBytes': facts['sourceBytes'],
    'factsFile': str(facts_path),
    'factsSHA256': sha(facts_path),
    'nativeEntries': 26,
    'nativePngs': 156,
    'historicalPins': 46,
    'productionContentChanges': 0,
}))
