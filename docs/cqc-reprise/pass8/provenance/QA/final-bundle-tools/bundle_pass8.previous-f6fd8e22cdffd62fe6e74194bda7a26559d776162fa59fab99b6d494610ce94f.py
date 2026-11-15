#!/usr/bin/env python3
"""Preserve root-frozen PASS8 provenance and prepare the Git review bundle.

Preparation is read-only for R/S. Execution requires exact root-frozen inputs
and their explicitly supplied SHA256. This tool never commits, syncs or publishes.
"""
from __future__ import annotations
from pathlib import Path
import argparse, hashlib, json, os, re, shutil, subprocess, uuid

W = Path('/workspace')
R = W / 'cqc-game-working/cqc-versus-v056'
S = W / 'shadow-codec-recovered'
P = R / 'preparation/reprise-pass8-provenance'
D = S / 'docs/cqc-reprise/pass8'
T = Path(__file__).parent
GEN = W / 'cqc-pass8-generation'
SHA = re.compile(r'^[0-9a-f]{64}$')
DENY = {'.git', 'node_modules', '.aws', '.codex', '.agents', '.ssh', '.config', '.cache', '.vercel', '__pycache__', 'dist', 'coverage', 'auth', 'credentials', 'secrets', 'tokens', 'cli-config', 'fixtures', 'initial-fixtures', 'initial-pwa-fixtures'}
PRIVATE = {'auth.json', 'credentials.json', 'token.json', 'tokens.json', '.netrc', '.npmrc', 'id_rsa', 'id_ed25519'}
ARCHIVE_OR_MOVIE = {'.zip', '.z01', '.z02', '.7z', '.rar', '.tar', '.gz', '.mkv', '.mp4', '.mov', '.avi', '.pdf', '.epub', '.djvu', '.cbz', '.pem', '.key'}
FORMS = {
    'crying-wolf/armor': 'core__crying_wolf', 'crying-wolf/beauty': 'archive__crying_beauty',
    'laughing-octopus/core__laughing_octopus': 'core__laughing_octopus',
    'laughing-octopus/archive__laughing_beauty': 'archive__laughing_beauty',
    'raging-raven/armor': 'core__raging_raven', 'raging-raven/beauty': 'archive__raging_beauty',
    'screaming-mantis/armor': 'core__screaming_mantis', 'screaming-mantis/beauty': 'archive__screaming_beauty',
    'sunny/mgs4': 'roster50__sunny_mgs4', 'sunny/mgr': 'roster50__sunny_mgr',
    'paz-eva/paz-pw': 'archive__paz', 'paz-eva/paz-gz': 'npc53__paz_gz', 'paz-eva/eva-mgs3': 'core__eva_mgs3',
}
COUNTS = {'deliveries': 13, 'selectedNativePng': 78, 'nativeAttemptPng': 105,
          'nonFinalNativePng': 27, 'newPhysicalPoses': 936, 'totalNativeEntries': 39,
          'totalNativePng': 234, 'totalPhysicalPoses': 2808, 'canonicalNativeEntries': 38,
          'authorizedOCEntries': 1, 'proceduralCanonicalEntries': 316}

def require(ok, message):
    if not ok: raise ValueError(message)

def encode(value): return (json.dumps(value, ensure_ascii=False, indent=2) + '\n').encode()
def raw_sha(raw): return hashlib.sha256(raw).hexdigest()
def sha(p):
    h = hashlib.sha256()
    with Path(p).open('rb') as f:
        for chunk in iter(lambda: f.read(8 * 1024 * 1024), b''): h.update(chunk)
    return h.hexdigest()

def safe_file(p):
    p = Path(p)
    require(p.is_absolute() and p.is_relative_to(W), 'Source outside workspace: ' + str(p))
    require(not any(n in DENY for n in p.parts), 'Excluded evidence/private path: ' + str(p))
    source_preimage_gzip = (p.is_relative_to(P / 'action-mapping-revisions') or p.is_relative_to(D / 'provenance/action-mapping-revisions')) and re.fullmatch(r'(?:combat-sprite-catalog-v1\.json|cqc-sprite-catalog\.js)\.before(?:\.previous-[0-9a-f]{64})?\.gz', p.name) is not None
    require(p.name not in PRIVATE and not p.name.startswith('.env') and (p.suffix.lower() not in ARCHIVE_OR_MOVIE or source_preimage_gzip),
            'Archive/movie/credential bytes are excluded: ' + str(p))
    require(p.is_file() and not p.is_symlink() and p.resolve() == p, 'Regular nonsymlink source required: ' + str(p))
    require(p.stat().st_size < 100_000_000, 'Source exceeds GitHub blob limit: ' + str(p))
    return p

def safe_target(p):
    p = Path(p)
    require(p.is_absolute() and (p.is_relative_to(P) or p.is_relative_to(D)), 'Target outside PASS8 evidence destinations')
    require('..' not in p.parts, 'Unsafe target traversal')
    for a in [p, *p.parents]: require(not a.is_symlink(), 'Target ancestor symlink: ' + str(a))
    return p

def files_in(folder):
    folder = Path(folder)
    require(folder.is_dir() and not folder.is_symlink(), 'Missing evidence tree: ' + str(folder))
    for base, dirs, names in os.walk(folder, followlinks=False):
        dirs[:] = sorted(n for n in dirs if n not in DENY)
        for n in sorted(dirs): require(not Path(base, n).is_symlink(), 'Evidence directory symlink forbidden')
        for n in sorted(names):
            p = Path(base, n)
            if n in PRIVATE or n.startswith('.env'): continue
            yield safe_file(p)

def verify_pin(row):
    p = safe_file(row['path'])
    require(SHA.fullmatch(row.get('sha256', '')) is not None and sha(p) == row['sha256'], 'Frozen input SHA changed: ' + str(p))
    if 'bytes' in row: require(p.stat().st_size == row['bytes'], 'Frozen input size changed: ' + str(p))
    return p

def read_facts(path):
    path = safe_file(path); raw = path.read_bytes(); facts = json.loads(raw)
    require(facts.get('schema') == 'cqc.github.pass8-review-bundle-inputs/1', 'Wrong PASS8 root-input schema')
    require(facts.get('confirmedByRoot') is True and facts.get('sourceState') == 'frozen' and facts.get('status') == 'passed',
            'Root must freeze final source, all 13 deliveries and actual final QA before execution or final planning')
    require(facts.get('counts') == COUNTS, 'Root counts differ from the selected PASS8 scope')
    require(isinstance(facts.get('sourceFreeze'), dict) and facts['sourceFreeze'].get('path') and facts['sourceFreeze'].get('sha256'), 'Exact root sourceFreeze path/SHA required')
    freeze_path = verify_pin(facts['sourceFreeze'])
    freeze = json.loads(freeze_path.read_text())
    require(freeze.get('schema') == 'cqc.pass8.current-source-freeze/1' and freeze.get('status') == 'frozen' and freeze.get('confirmedByRoot') is True, 'Exact current-source freeze required')
    required_sources = {'data/combat-sprite-catalog-v1.json', 'src/cqc-sprite-catalog.js', 'modules/unified-versus-v055.html',
                        'src/cqc-pass8-layout.css', 'src/cqc-pass8-combat-engine.js', 'src/cqc-pass8-native-origins.js', 'src/cqc-pass8-combat-fidelity.js'}
    source_pins = freeze.get('files', [])
    require({row['path'] for row in source_pins} == {str(R / n) for n in required_sources}, 'Seven exact final runtime source pins required')
    require(all(freeze.get(key) == value for key, value in {'entryCount': 39, 'nativePNG': 234, 'uniquePoses': 2808, 'newForms': 13, 'preservedOldEntries': 26}.items()), 'Wrong source-freeze incarnation counts')
    for pin in source_pins: verify_pin(pin)
    deliveries = facts.get('deliveries', [])
    require(len(deliveries) == 13 and {r['uid'] for r in deliveries} == set(FORMS.values()), 'Exact 13 incarnation pins required')
    for row in deliveries:
        p = verify_pin(row); require(p == GEN / next(k for k, v in FORMS.items() if v == row['uid']) / 'FINAL_DELIVERY.json', 'Wrong delivery path')
        require(row.get('allSixNativeSheetsPhysicallyViewedByRoot') is True, 'Actual root visual review is mandatory')
    reports = facts.get('reports', [])
    require(reports and len({r['name'] for r in reports}) == len(reports), 'Unique root-pinned final QA reports required')
    for row in reports:
        p = verify_pin(row); observed = json.loads(p.read_text())
        require(observed.get('status') not in {'failed', 'error', 'pending', 'rejected', 'in_progress', 'blocked'}, 'Explicit negative report status cannot be bypassed by a passing boolean')
        actual = observed.get(row.get('actualStatusField', 'status'))
        require(row.get('status') == 'passed' and 'actualReportStatus' in row and actual == row['actualReportStatus'], 'Root actual report status disagreement: ' + str(p))
        require(actual is True or actual in {'passed', 'completed', 'approved', 'accepted_closest_supported', 'accepted_closest', 'passedAllChecks'}, 'Negative/pending report cannot be final QA')
        for key in ('failures', 'failureCount', 'failedChecks', 'failed', 'failCount'):
            value = observed.get(key)
            if isinstance(value, (int, float, list, dict)): require(not value, 'Nonzero final QA failure count: ' + str(p))
    for row in facts.get('extraFiles', []): verify_pin(row)
    for row in facts.get('evidenceTrees', []):
        p = Path(row['path'])
        require(p.is_absolute() and p.is_relative_to(W) and p != W and not p.is_relative_to(P) and not p.is_relative_to(D), 'Unsafe root-pinned evidence tree')
        verify_pin({'path': row['manifestPath'], 'sha256': row['manifestSha256']})
        index = json.loads(Path(row['manifestPath']).read_text())
        require(isinstance(index.get('files'), list), 'Evidence tree needs exact files[{path,bytes,sha256}] inventory')
        listed = set()
        for f in index['files']:
            q = verify_pin(f); require(q.is_relative_to(p), 'Tree inventory escaped its root'); listed.add(str(q))
        actual = {str(q) for q in files_in(p) if str(q) != row['manifestPath']}
        require(listed == actual, 'Root evidence tree membership changed')
    return facts, raw

def producer_inventory():
    deliveries = []; selected = {}; attempts = {}; originals = {}
    for folder, uid in FORMS.items():
        path = safe_file(GEN / folder / 'FINAL_DELIVERY.json'); d = json.loads(path.read_text())
        require(d.get('uid') == uid and d.get('schema') == 'cqc.native-combat-delivery/1' and d.get('mirror') is False and d.get('review', {}).get('status') == 'approved', 'Incomplete/wrong incarnation producer: ' + uid)
        source_files = d.get('sourceFiles', [])
        require(len(source_files) == 6 and len({r['sha256'] for r in source_files}) == 6, 'Six distinct native sheets required')
        for row in source_files:
            p = safe_file(row['source']); digest = sha(p)
            require(digest == row['sha256'] and row.get('poseCount') == 12, 'Native selected source changed')
            require(digest not in selected, 'Selected native reused across incarnations')
            selected[digest] = {'uid': uid, 'source': str(p), 'bytes': p.stat().st_size, 'sha256': digest}
        for p in sorted((GEN / folder / 'native-attempts').glob('*.png')):
            digest = sha(safe_file(p)); require(digest not in attempts, 'Attempt native content reused across forms')
            attempts[digest] = {'uid': uid, 'path': str(p), 'bytes': p.stat().st_size, 'sha256': digest, 'finalSelected': digest in selected}
        deliveries.append({'uid': uid, 'path': str(path), 'bytes': path.stat().st_size, 'sha256': sha(path), 'selectedCostume': d.get('selectedCostume'), 'limits': d.get('limits', [])})
    # All 105 original imagegen paths are recorded by the producer indices and
    # result metadata. Never infer an unlisted generated image as immutable.
    pattern = re.compile(r'/workspace/generated_images/exec-[A-Za-z0-9-]+\.png')
    mentioned = set()
    for folder in sorted({k.split('/')[0] for k in FORMS}):
        for p in files_in(GEN / folder):
            if p.suffix == '.json': mentioned.update(pattern.findall(p.read_text()))
    for name in sorted(mentioned):
        p = safe_file(name); digest = sha(p)
        if digest in attempts:
            require(p.stat().st_size == attempts[digest]['bytes'], 'Original native size mismatch')
            originals[digest] = {'path': str(p), 'bytes': p.stat().st_size, 'sha256': digest}
    require(len(selected) == 78 and len(attempts) == 105 and len(originals) == 105 and set(selected) <= set(attempts), '105 natives /78 selected /27 nonfinal count or original provenance mismatch')
    return {'schema': 'cqc.pass8.producer-native-inventory/1', 'status': 'preparation-observation-not-final-QA', 'counts': COUNTS,
            'deliveries': deliveries, 'selected': list(selected.values()), 'attempts': list(attempts.values()), 'nativeOriginals': list(originals.values()), 'absolute1to1Certified': False}

def add(rows, source, target, category, policy='independent-byte-copy', archive_source=None):
    source = safe_file(source); target = safe_target(target)
    require(source != target and not source.is_relative_to(D), 'Recursive/self-copy evidence source forbidden')
    row = {'source': str(source), 'target': str(target), 'bytes': source.stat().st_size, 'sha256': sha(source),
           'category': category, 'storagePolicy': policy}
    if archive_source: row['archiveSource'] = str(safe_target(archive_source))
    old = rows.get(str(target))
    require(old is None or (old['bytes'], old['sha256']) == (row['bytes'], row['sha256']), 'Two frozen sources collide at one target')
    if old is None: rows[str(target)] = row

def mirror_provenance(rows, source, relative, category, force_independent=False):
    p = Path(source)
    mutable_repository_file = (p.is_relative_to(R) and not (p.is_relative_to(P) or p.is_relative_to(R / 'preparation/combat-sprites-pass8'))) or (p.is_relative_to(S) and not p.is_relative_to(S / 'docs/cqc-reprise'))
    if mutable_repository_file or force_independent:
        archived = P / 'final-source-archive/evidence' / relative
        add(rows, source, archived, category, 'independent-byte-copy')
        add(rows, source, P / relative, category, 'closed-archive-hardlink', archived)
        add(rows, source, D / 'provenance' / relative, category, 'closed-archive-hardlink', archived)
    else:
        add(rows, source, P / relative, category, 'closed-artifact-hardlink')
        add(rows, source, D / 'provenance' / relative, category, 'closed-artifact-hardlink')

CLOSED_AUTHORING_CATALOG = W / 'cqc-pass8-independent-gameplay-review/verified-final-origins/source/combat-sprite-catalog-v1.json'
CLOSED_AUTHORING_CATALOG_SHA = '3fe34bf2be1cc7c5365a82e57b747b269adf795c1940885a6ce6e8a4a793d747'

def independent_closed_catalog(mutable):
    mutable = safe_file(mutable); closed = safe_file(CLOSED_AUTHORING_CATALOG)
    require(mutable == R / 'data/combat-sprite-catalog-v1.json', 'Closed reuse is limited to the final authoring catalog')
    require(closed.stat().st_size == 53784490 and sha(closed) == CLOSED_AUTHORING_CATALOG_SHA == sha(mutable), 'Closed authoring catalog no longer matches the root freeze')
    require((closed.stat().st_dev, closed.stat().st_ino) != (mutable.stat().st_dev, mutable.stat().st_ino), 'Closed reuse must remain independent from mutable source')
    require(closed.stat().st_dev == mutable.stat().st_dev and (closed.stat().st_mode & 0o777, closed.stat().st_uid, closed.stat().st_gid) == (mutable.stat().st_mode & 0o777, mutable.stat().st_uid, mutable.stat().st_gid), 'Closed reuse metadata or device differs')
    return closed

def archive_source(rows, source, relative, review_relative, category):
    archive = P / 'final-source-archive' / relative
    if Path(source) == R / 'data/combat-sprite-catalog-v1.json':
        closed = independent_closed_catalog(source)
        add(rows, closed, archive, category, 'closed-artifact-hardlink')
        rows[str(archive)]['independenceFromMutableSource'] = str(source)
        rows[str(archive)]['existingIndependentClosedArchiveReuse'] = True
    else:
        add(rows, source, archive, category, 'independent-byte-copy')
    add(rows, source, D / review_relative, category, 'closed-archive-hardlink', archive)

def generated_row(rows, target, raw, category):
    target = safe_target(target)
    require(str(target) not in rows, 'Generated text target collision')
    rows[str(target)] = {'source': None, 'target': str(target), 'bytes': len(raw), 'sha256': raw_sha(raw), 'category': category, 'storagePolicy': 'generated-independent-bytes', 'generatedUtf8': raw.decode()}

def ordered_rows(rows):
    # Seed archives must exist before any proof link reads from them, regardless
    # of directory alphabet order (QA sorts before final-source-archive).
    return sorted(rows.values(), key=lambda row: (0 if Path(row['target']).is_relative_to(P / 'final-source-archive') else 1, row['target']))

def make_plan(facts_path):
    facts, facts_raw = read_facts(facts_path); inventory = producer_inventory(); rows = {}
    pinned = {r['uid']: r['sha256'] for r in facts['deliveries']}
    require(all(pinned[r['uid']] == r['sha256'] for r in inventory['deliveries']), 'Producer changed since root freeze')
    catalog = json.loads((R / 'data/combat-sprite-catalog-v1.json').read_text())
    require(len(catalog['entries']) == 39, 'Final integrated catalog must contain39 entries')
    entries = {r['uid']: r for r in catalog['entries']} if isinstance(catalog['entries'], list) else catalog['entries']
    require(set(FORMS.values()) <= set(entries), 'Missing imported PASS8 UID')
    for folder in sorted({k.split('/')[0] for k in FORMS}):
        for p in files_in(GEN / folder): mirror_provenance(rows, p, Path('generation') / folder / p.relative_to(GEN / folder), 'all-producer-files-including-rejections-references-and-revisions')
    for p in sorted(GEN.glob('ROOT_REVIEWED_SELECTION*.json')): mirror_provenance(rows, p, Path('root-selections') / p.name, 'observed-root-selections')
    for native in inventory['nativeOriginals']: mirror_provenance(rows, native['path'], Path('native-originals') / Path(native['path']).name, 'unchanged-imagegen-original')
    # Existing PASS8 import/derivation/preimage evidence is preserved once in S.
    # Do not recursively re-import generation trees created by this bundler.
    planned_r = {r['target'] for r in rows.values() if Path(r['target']).is_relative_to(P)}
    for p in files_in(P):
        if str(p) in planned_r or (p.parent == P and p.name in {'PRESERVATION_MANIFEST.json', 'BUNDLE_MANIFEST.json', 'NATIVE_PRODUCER_INVENTORY.json', 'RELEASE_NOTES_PASS8.md'}): continue
        add(rows, p, D / 'provenance' / p.relative_to(P), 'preexisting-pass8-import-source-draft-or-preimage', 'closed-artifact-hardlink')
    for p in files_in(R / 'preparation/combat-sprites-pass8'): add(rows, p, D / 'sprite-review' / p.relative_to(R / 'preparation/combat-sprites-pass8'), 'approved-integration-frame-and-contour-review', 'closed-artifact-hardlink')
    baseline = safe_file(W / 'cqc-delivered-pass7-baseline-files.json')
    frozen = json.loads((W / 'cqc-pass8-frozen-baseline-facts.json').read_text())
    require(sha(baseline) == frozen['baselineSha256'], 'PASS7 source baseline changed')
    previous = {r['path']: r for r in json.loads(baseline.read_text())}
    # One final source snapshot, only in S. Large catalogs are never copied into
    # each report/fixture/provenance branch or repeated for the same final state.
    for folder in ('src', 'data', 'tools', 'tests'):
        for p in files_in(R / folder):
            relative = p.relative_to(R); old = previous.get(relative.as_posix())
            if old is None or p.stat().st_size != old['bytes'] or sha(p) != old['sha256']:
                archive_source(rows, p, relative, Path('source-code') / relative, 'single-final-new-or-changed-source-snapshot')
    for relative in ('modules/unified-versus-v055.html', 'preparation/ALL_NATIVE_GENERATION_PRESERVATION.json'):
        archive_source(rows, R / relative, Path(relative), Path('source-code') / relative, 'single-final-source-snapshot')
    add(rows, baseline, D / 'baseline-and-preservation' / baseline.name, 'single-pinned-previous-source-inventory', 'closed-artifact-hardlink')
    mirror_provenance(rows, facts['sourceFreeze']['path'], Path('baseline-and-preservation') / Path(facts['sourceFreeze']['path']).name, 'root-pinned-final-source-freeze')
    for name in ('cqc-pass8-frozen-baseline-facts.json', 'cqc-pass8-frozen-pass7-native-routing.json'):
        mirror_provenance(rows, W / name, Path('baseline-and-preservation') / name, 'frozen-pass7-baseline')
    storage = W / 'cqc-pass8-storage-plan'
    for p in files_in(storage / 'execution'): mirror_provenance(rows, p, Path('baseline-and-preservation/storage-execution') / p.name, 'complete-reviewed-storage-execution-proof')
    for name in ('HARDLINK_REVIEW_PLAN.json', 'SCAN_SUMMARY.json', 'build_plan.py'):
        mirror_provenance(rows, storage / name, Path('baseline-and-preservation/storage-plan') / name, 'approved-storage-plan-and-scanner')
    preservation = W / 'cqc-pass8-preservation-prep'
    for p in sorted(preservation.iterdir()):
        if p.is_file() and p.suffix in {'.json', '.md'}:
            mirror_provenance(rows, p, Path('baseline-and-preservation/native-preservation') / p.name, 'additive536-to641-native-preservation-and-actual-merge-proof')
        elif p.is_file() and p.suffix == '.py':
            archive_source(rows, p, Path('tools/native-preservation') / p.name, Path('final-tools/native-preservation') / p.name, 'native-preservation-tool-snapshot')
    # The large original stat scan remains in place and is fully SHA-pinned;
    # duplicating it adds no preservation of image/source bytes.
    external = []
    p = safe_file(storage / 'SCAN_FILE_STATS.json')
    external.append({'path': str(p), 'bytes': p.stat().st_size, 'sha256': sha(p), 'reason': 'Retained unchanged at original path; excluded from repeated verbatim stat scans.'})
    for row in facts.get('externalRetainedFiles', []):
        verify_pin(row); external.append(row)
    for row in facts['reports']:
        p = Path(row['path']); slug = re.sub('[^A-Za-z0-9_.-]+', '-', row['name']).strip('-'); require(slug, 'Empty safe QA name')
        mirror_provenance(rows, p, Path('QA/final-reports') / slug / p.name, 'root-pinned-actual-final-QA')
    for row in facts.get('extraFiles', []): mirror_provenance(rows, row['path'], Path(row.get('provenanceRelativePath', 'QA/retained-extra-evidence/' + Path(row['path']).name)), 'retained-extra-evidence-not-inferred-passing', row.get('requiresIndependentArchive') is True)
    for tree in facts.get('evidenceTrees', []):
        base = Path(tree['path']); label = Path(tree.get('provenanceRelativePath', 'QA/evidence-trees/' + base.name))
        for p in files_in(base): mirror_provenance(rows, p, label / p.relative_to(base), 'root-frozen-exact-evidence-tree')
    add(rows, facts_path, D / 'QA_INPUT_FACTS.json', 'root-frozen-final-inputs', 'closed-artifact-hardlink')
    tool_allowlist = {'bundle_pass8.py', 'test_bundle_pass8.py', 'README_BUNDLE_FR.md', 'RELEASE_NOTES_PASS8_FR.md', 'INPUT_CONTRACT.md', 'PREPARATION_GUARD_RESULTS.json'}
    for p in sorted(T.iterdir()):
        if p.is_file() and p.name in tool_allowlist:
            archive_source(rows, p, Path('tools') / p.name, Path('final-tools') / p.name, 'reviewed-bundler-preparation-tool')
    for name in ('freeze_cqc_pass8_baseline.py', 'integrate_cqc_pass8_reviewed.py', 'build_cqc_pass8_origins.py'):
        archive_source(rows, W / name, Path('tools') / name, Path('final-tools') / name, 'root-final-pass8-integration-tool')
    readme = (T / 'README_BUNDLE_FR.md').read_bytes(); notes = (T / 'RELEASE_NOTES_PASS8_FR.md').read_bytes()
    generated_row(rows, D / 'README.md', readme, 'scope-and-qualified-limitations')
    generated_row(rows, P / 'RELEASE_NOTES_PASS8.md', notes, 'qualified-pass8-release-notes')
    generated_row(rows, D / 'provenance/RELEASE_NOTES_PASS8.md', notes, 'qualified-pass8-release-notes')
    final_inventory = {**inventory, 'status': 'root-frozen-producer-native-provenance', 'rootFactsSha256': raw_sha(facts_raw)}
    generated_row(rows, P / 'NATIVE_PRODUCER_INVENTORY.json', encode(final_inventory), 'all105-native-source-provenance')
    generated_row(rows, D / 'provenance/NATIVE_PRODUCER_INVENTORY.json', encode(final_inventory), 'all105-native-source-provenance')
    files = ordered_rows(rows)
    collisions = []; needed_copy_bytes = 0; backup_bytes = 0
    for row in files:
        target = Path(row['target'])
        different = False; detach_needed = False
        if target.exists():
            old = sha(safe_file(target)); different = old != row['sha256']
            if row['source'] and row['storagePolicy'] == 'independent-byte-copy':
                source = Path(row['source'])
                detach_needed = (source.stat().st_dev, source.stat().st_ino) == (target.stat().st_dev, target.stat().st_ino) or target.stat().st_nlink > 1
            elif row['storagePolicy'] == 'generated-independent-bytes': detach_needed = target.stat().st_nlink > 1
            if different:
                backup = target.with_name(target.stem + '.previous-' + old + target.suffix)
                collisions.append({'target': str(target), 'previousBytes': target.stat().st_size, 'previousSha256': old,
                                   'backupTarget': str(backup), 'reviewMirrorTarget': str(D / 'provenance' / backup.relative_to(P)) if backup.is_relative_to(P) else None})
                if row['storagePolicy'] == 'independent-byte-copy' and not backup.exists():
                    backup_bytes += ((target.stat().st_size + 4095) // 4096) * 4096
        if row['storagePolicy'] in {'independent-byte-copy', 'generated-independent-bytes'} and (not target.exists() or different or detach_needed):
            needed_copy_bytes += ((row['bytes'] + 4095) // 4096) * 4096
    previous_manifests = []
    for target in (P / 'PRESERVATION_MANIFEST.json', D / 'BUNDLE_MANIFEST.json'):
        if target.exists():
            old = sha(safe_file(target)); backup = target.with_name(target.stem + '.previous-' + old + target.suffix)
            pin = {'path': str(target), 'bytes': target.stat().st_size, 'sha256': old, 'backupTarget': str(backup),
                   'reviewMirrorTarget': str(D / 'provenance' / backup.relative_to(P)) if backup.is_relative_to(P) else None}
            previous_manifests.append(pin)
            collisions.append({'target': str(target), 'previousBytes': pin['bytes'], 'previousSha256': old, 'backupTarget': str(backup), 'kind': 'retained-previous-manifest'})
    return {'schema': 'cqc.pass8.provenance-and-review-bundle-plan/1', 'status': 'root-frozen-reviewable-plan',
            'rootFactsPath': str(facts_path), 'rootFactsSha256': raw_sha(facts_raw), 'sourceRoot': str(R), 'provenanceRoot': str(P), 'reviewRoot': str(D),
            'counts': COUNTS, 'files': files, 'fileCount': len(files), 'payloadBytes': sum(r['bytes'] for r in files),
            'newIndependentCopyAllocatedBytesUpperBound': needed_copy_bytes, 'previousByteBackupAllocatedBytesUpperBound': backup_bytes,
            'spaceReserveBytes': 80 * 1024 * 1024,
            'externalRetainedShaPins': external, 'collisionsRequiringPreviousByteBackup': collisions,
            'previousManifestPins': previous_manifests,
            'sourceCodeFinalIndependentArchiveCopies': 1, 'closedArtifactHardlinksAuthorizedByRootFreeze': True,
            'mutableSourceHardlinksForbidden': True, 'completeHistoricalArchiveReplacement': False, 'absolute1to1Certified': False,
            'publicAssetWrites': 0, 'gitMutations': 0, 'syncOrPublicationActions': 0}

def git_outside():
    prefix = D.relative_to(S).as_posix()
    diff = subprocess.check_output(['git', 'diff', '--binary', '--no-ext-diff', 'HEAD', '--', '.', ':(exclude)' + prefix], cwd=S)
    status = subprocess.check_output(['git', 'status', '--porcelain=v1', '-z', '--untracked-files=all'], cwd=S)
    outside = [s.decode() for s in status.split(b'\0') if s and not s[3:].decode().startswith(prefix + '/')]
    return {'diffSHA256': raw_sha(diff), 'statusRows': outside, 'HEAD': subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=S, text=True).strip()}

def install(row, preserve_existing=False):
    target = safe_target(row['target']); source = safe_file(row['source']) if row['source'] else None
    raw = row.get('generatedUtf8', '').encode() if source is None else None
    require((sha(source) if source else raw_sha(raw)) == row['sha256'], 'Frozen source changed immediately before install')
    if row.get('independenceFromMutableSource'):
        mutable = safe_file(row['independenceFromMutableSource'])
        require(source == independent_closed_catalog(mutable), 'Only root-pinned closed authoring catalog may be reused')
        require(row.get('existingIndependentClosedArchiveReuse') is True and target == P / 'final-source-archive/data/combat-sprite-catalog-v1.json' and row['storagePolicy'] == 'closed-artifact-hardlink', 'Closed reuse escaped its exact target or policy')
    if row.get('archiveSource'):
        archived = safe_file(row['archiveSource'])
        require(sha(archived) == row['sha256'] and archived.is_relative_to(P / 'final-source-archive'), 'Closed independent archive is missing or changed')
        require((archived.stat().st_dev, archived.stat().st_ino) != (source.stat().st_dev, source.stat().st_ino), 'Archive seed must be independent of mutable source')
        source = archived
    target.parent.mkdir(parents=True, exist_ok=True)
    if target.exists():
        old = sha(safe_file(target))
        same_inode = source is not None and (source.stat().st_dev, source.stat().st_ino) == (target.stat().st_dev, target.stat().st_ino)
        hardlink_policy = row['storagePolicy'] in {'closed-artifact-hardlink', 'closed-archive-hardlink'}
        independent_ok = not same_inode and target.stat().st_nlink == 1
        if old == row['sha256'] and ((source is None and target.stat().st_nlink == 1) or (source is not None and (same_inode if hardlink_policy else independent_ok))):
            return {'mode': 'existing-identical', 'backup': None}
        if old != row['sha256']:
            require(preserve_existing, 'Previous destination bytes differ; explicit preserved-update option required')
            backup = target.with_name(target.stem + '.previous-' + old + target.suffix)
            if backup.exists(): require(sha(safe_file(backup)) == old, 'Previous-byte backup collision')
            elif row['storagePolicy'] in {'closed-artifact-hardlink', 'closed-archive-hardlink'}: os.link(target, backup, follow_symlinks=False)
            else:
                with target.open('rb') as src, backup.open('xb') as dst: shutil.copyfileobj(src, dst); dst.flush(); os.fsync(dst.fileno())
            require(sha(backup) == old, 'Previous-byte backup failed')
        else: backup = None  # Exact bytes are retained while fixing the inode policy.
    else: backup = None
    tmp = target.parent / ('.cqc-bundle-' + uuid.uuid4().hex + '.tmp')
    if row['storagePolicy'] in {'closed-artifact-hardlink', 'closed-archive-hardlink'}:
        require(source is not None and source.stat().st_dev == target.parent.stat().st_dev, 'Closed artifact requires same-device hardlink; copy fallback forbidden')
        os.link(source, tmp, follow_symlinks=False); mode = 'closed-artifact-hardlink'
    else:
        with tmp.open('xb') as dst:
            if source:
                with source.open('rb') as src: shutil.copyfileobj(src, dst)
            else: dst.write(raw)
            dst.flush(); os.fsync(dst.fileno())
        mode = 'independent-byte-copy'
    require(sha(tmp) == row['sha256'] and tmp.stat().st_size == row['bytes'], 'Temporary exact-byte copy failed')
    if target.exists():
        require((backup is not None or old == row['sha256']) and sha(target) == old, 'Target changed before atomic preserved update')
        os.replace(tmp, target)
    else:
        # link() creates the final name exclusively and cannot overwrite a race.
        os.link(tmp, target, follow_symlinks=False); tmp.unlink()
    require(sha(target) == row['sha256'], 'Final exact-byte copy failed')
    if row.get('independenceFromMutableSource'):
        mutable = safe_file(row['independenceFromMutableSource'])
        require((target.stat().st_dev, target.stat().st_ino) != (mutable.stat().st_dev, mutable.stat().st_ino), 'Final archive shares mutable authoring source inode')
    if source and mode == 'independent-byte-copy': require(target.stat().st_ino != source.stat().st_ino, 'Mutable metadata/code must have independent inode')
    return {'mode': mode, 'backup': str(backup) if backup else None}

def execute(plan, facts_path, freeze_sha, preserve_existing=False):
    require(SHA.fullmatch(freeze_sha or '') is not None and plan['rootFactsSha256'] == freeze_sha, 'Exact root-frozen facts SHA is required to execute')
    require(sha(facts_path) == freeze_sha, 'Root freeze changed before first write'); read_facts(facts_path)
    if plan['collisionsRequiringPreviousByteBackup']: require(preserve_existing, 'Collision plan requires explicit byte-preserving update mode')
    # Includes two manifests, journal/directory entries and an explicit reserve;
    # never start a preservation batch that is known to exhaust shared storage.
    required = plan['newIndependentCopyAllocatedBytesUpperBound'] + plan['previousByteBackupAllocatedBytesUpperBound'] + 2 * len(encode(plan)) + plan['spaceReserveBytes']
    free = shutil.disk_usage(W).free
    require(free >= required, f'Insufficient storage before any bundle write: free={free}, requiredWithReserve={required}')
    before = git_outside(); receipt = T / ('EXECUTION-' + uuid.uuid4().hex + '.jsonl')
    completed = []; previous_bytes = []
    with receipt.open('x') as log:
        # Retain and pin previous manifests before encoding their successor.
        # This avoids a self-SHA cycle and includes every previous byte in the
        # successor's receipt/manifest, including R-to-S backup mirrors.
        for pin in plan.get('previousManifestPins', []):
            old = verify_pin(pin); backup = safe_target(pin['backupTarget'])
            backup.parent.mkdir(parents=True, exist_ok=True)
            if backup.exists(): require(sha(safe_file(backup)) == pin['sha256'], 'Previous manifest backup collision')
            else: os.link(old, backup, follow_symlinks=False)
            saved = {'path': str(backup), 'bytes': backup.stat().st_size, 'sha256': sha(backup)}
            previous_bytes.append(saved); log.write(json.dumps({'event': 'retained-previous-manifest', **saved}) + '\n'); log.flush(); os.fsync(log.fileno())
            if pin['reviewMirrorTarget']:
                mirror = safe_target(pin['reviewMirrorTarget'])
                install({'source': str(backup), 'target': str(mirror), 'bytes': saved['bytes'], 'sha256': saved['sha256'], 'storagePolicy': 'closed-artifact-hardlink'})
                previous_bytes.append({'path': str(mirror), 'bytes': mirror.stat().st_size, 'sha256': sha(mirror)})
        for row in plan['files']:
            result = install(row, preserve_existing); completed.append({'target': row['target'], 'sha256': row['sha256'], **result})
            log.write(json.dumps(completed[-1]) + '\n'); log.flush(); os.fsync(log.fileno())
            if result['backup']:
                backup = Path(result['backup']); pin = {'path': str(backup), 'bytes': backup.stat().st_size, 'sha256': sha(backup)}
                previous_bytes.append(pin)
                if backup.is_relative_to(P):
                    mirror = D / 'provenance' / backup.relative_to(P)
                    mirror_row = {'source': str(backup), 'target': str(mirror), 'bytes': pin['bytes'], 'sha256': pin['sha256'],
                                  'storagePolicy': 'closed-artifact-hardlink'}
                    mirrored = install(mirror_row, preserve_existing)
                    previous_bytes.append({'path': str(mirror), 'bytes': mirror.stat().st_size, 'sha256': sha(mirror)})
                    require(mirrored['backup'] is None, 'Unexpected backup-of-backup collision; root review required')
    require(read_facts(facts_path)[1] and sha(facts_path) == freeze_sha, 'Frozen root inputs changed during bundling')
    for row in plan['files']:
        require(sha(Path(row['target'])) == row['sha256'], 'Bundle final destination SHA changed')
        if row['source']: require(sha(Path(row['source'])) == row['sha256'], 'Frozen source changed during bundling')
    for row in plan['externalRetainedShaPins']: verify_pin(row)
    for row in previous_bytes: verify_pin(row)
    require(git_outside() == before, 'Git/source status outside PASS8 docs changed during bundling')
    # Generated inline bytes are omitted from the public manifests, not their SHA.
    manifest = {**plan, 'files': [{k: v for k, v in row.items() if k != 'generatedUtf8'} for row in plan['files']],
                'retainedPreviousBytes': previous_bytes, 'status': 'byte-exact-preserved'}
    raw = encode(manifest)
    for target in (P / 'PRESERVATION_MANIFEST.json', D / 'BUNDLE_MANIFEST.json'):
        final_result = install({'source': None, 'target': str(target), 'bytes': len(raw), 'sha256': raw_sha(raw), 'storagePolicy': 'generated-independent-bytes', 'generatedUtf8': raw.decode()}, preserve_existing)
        if final_result['backup']: require(any(r['path'] == final_result['backup'] for r in previous_bytes), 'Previous manifest backup was not pre-pinned')
    return {'status': 'byte-exact-preserved', 'files': len(completed), 'manifestSha256': raw_sha(raw), 'receipt': str(receipt),
            'sourceBytesUntouched': True, 'nativeImageBytesUntouched': True, 'outsideGitStateUnchanged': True,
            'backups': previous_bytes, 'counts': COUNTS, 'publicationPerformed': False}

def exclusive_write(path, raw):
    path = Path(path)
    require(path.is_absolute() and path.is_relative_to(T) and '..' not in path.parts, 'Preparation output must stay in the tool directory')
    for ancestor in [path, *path.parents]: require(not ancestor.is_symlink(), 'Preparation output ancestor symlink')
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open('xb') as f: f.write(raw)

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--inspect-producers', action='store_true', help='Read-only source observation; never claims final QA or writes R/S')
    parser.add_argument('--facts', type=Path)
    parser.add_argument('--out', type=Path, help='Optional preparation result within this tool folder')
    parser.add_argument('--execute', action='store_true')
    parser.add_argument('--freeze-sha256')
    parser.add_argument('--preserve-existing', action='store_true', help='Back up differing previous destination bytes before an authorized update')
    args = parser.parse_args()
    if args.inspect_producers:
        require(not args.execute and args.facts is None, 'Inspection cannot execute the bundler')
        result = producer_inventory()
    else:
        require(args.facts is not None, 'Root facts required for final planning/execution')
        plan = make_plan(args.facts)
        result = execute(plan, args.facts, args.freeze_sha256, args.preserve_existing) if args.execute else plan
    if args.out: exclusive_write(args.out, encode(result))
    print(json.dumps({k: v for k, v in result.items() if k not in {'files', 'selected', 'attempts', 'nativeOriginals', 'deliveries'}}, ensure_ascii=False, indent=2))

if __name__ == '__main__': main()
