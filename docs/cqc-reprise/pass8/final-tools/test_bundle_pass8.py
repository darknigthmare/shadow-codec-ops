#!/usr/bin/env python3
"""Guard verification on small isolated fixtures; never run the real bundler."""
import copy, hashlib, importlib.util, json, os, sys, tempfile, unittest
from unittest.mock import patch
from pathlib import Path
sys.dont_write_bytecode = True
spec = importlib.util.spec_from_file_location('bundle_pass8', Path(__file__).with_name('bundle_pass8.py'))
B = importlib.util.module_from_spec(spec); spec.loader.exec_module(B)

class Guards(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory(prefix='cqc-p8-bundle-guards-', dir='/tmp')
        self.w = Path(self.tmp.name)
        self.saved = {n: getattr(B, n) for n in ('W', 'R', 'S', 'P', 'D', 'T', 'GEN')}
        B.W = self.w; B.R = self.w / 'standalone'; B.S = self.w / 'shadow'
        B.P = B.R / 'preparation/reprise-pass8-provenance'; B.D = B.S / 'docs/cqc-reprise/pass8'
        B.T = self.w / 'tools'; B.GEN = self.w / 'generation'; B.T.mkdir()
        self.report = self.w / 'final-report.json'; self.report.write_text(json.dumps({'status': 'passed', 'failures': 0}))
        deliveries = []
        for folder, uid in B.FORMS.items():
            p = B.GEN / folder / 'FINAL_DELIVERY.json'; p.parent.mkdir(parents=True); p.write_text('{}')
            deliveries.append({'uid': uid, 'path': str(p), 'sha256': B.sha(p), 'allSixNativeSheetsPhysicallyViewedByRoot': True})
        self.facts = {'schema': 'cqc.github.pass8-review-bundle-inputs/1', 'confirmedByRoot': True, 'status': 'passed', 'sourceState': 'frozen',
                      'counts': copy.deepcopy(B.COUNTS), 'deliveries': deliveries,
                      'reports': [{'name': 'independent final QA', 'path': str(self.report), 'sha256': B.sha(self.report), 'status': 'passed', 'actualReportStatus': 'passed'}]}
        pins = []
        for name in ['data/combat-sprite-catalog-v1.json', 'src/cqc-sprite-catalog.js', 'modules/unified-versus-v055.html',
                     'src/cqc-pass8-layout.css', 'src/cqc-pass8-combat-engine.js', 'src/cqc-pass8-native-origins.js', 'src/cqc-pass8-combat-fidelity.js']:
            p = B.R / name; p.parent.mkdir(parents=True, exist_ok=True); p.write_bytes(b'final source fixture\n')
            pins.append({'path': str(p), 'bytes': p.stat().st_size, 'sha256': B.sha(p)})
        self.freeze = self.w / 'source-freeze.json'; self.freeze.write_text(json.dumps({'schema': 'cqc.pass8.current-source-freeze/1', 'status': 'frozen', 'confirmedByRoot': True, 'entryCount': 39, 'nativePNG': 234, 'uniquePoses': 2808, 'newForms': 13, 'preservedOldEntries': 26, 'files': pins}))
        self.facts['sourceFreeze'] = {'path': str(self.freeze), 'sha256': B.sha(self.freeze)}
        self.facts_path = self.w / 'root-facts.json'; self.save()

    def save(self): self.facts_path.write_text(json.dumps(self.facts))
    def tearDown(self):
        for n, v in self.saved.items(): setattr(B, n, v)
        self.tmp.cleanup()

    def fixture(self, name='source.json', raw=b'original source\n'):
        p = self.w / name; p.write_bytes(raw); return p

    def row(self, source, name='target.json'):
        rows = {}; B.add(rows, source, B.D / name, 'guard-fixture'); return list(rows.values())[0]

    def test_read_root_facts_never_creates_repository_destinations(self):
        facts, raw = B.read_facts(self.facts_path)
        self.assertEqual(facts, self.facts); self.assertEqual(raw, self.facts_path.read_bytes())
        self.assertFalse(B.P.exists()); self.assertFalse(B.D.exists())

    def test_pending_unconfirmed_and_unfrozen_facts_rejected(self):
        for key, value in [('confirmedByRoot', False), ('sourceState', 'in_progress'), ('status', 'pending')]:
            previous = self.facts[key]; self.facts[key] = value; self.save()
            with self.assertRaises(ValueError): B.read_facts(self.facts_path)
            self.facts[key] = previous

    def test_wrong_counts_and_duplicate_incarnation_rejected(self):
        self.facts['counts']['nativeAttemptPng'] = 104; self.save()
        with self.assertRaises(ValueError): B.read_facts(self.facts_path)
        self.facts['counts'] = copy.deepcopy(B.COUNTS)
        self.facts['deliveries'][-1] = copy.deepcopy(self.facts['deliveries'][0]); self.save()
        with self.assertRaises(ValueError): B.read_facts(self.facts_path)

    def test_missing_physical_root_review_rejected(self):
        self.facts['deliveries'][0]['allSixNativeSheetsPhysicallyViewedByRoot'] = False; self.save()
        with self.assertRaises(ValueError): B.read_facts(self.facts_path)

    def test_tampered_final_report_rejected(self):
        self.report.write_text('{"status":"passed","failures":1}')
        with self.assertRaises(ValueError): B.read_facts(self.facts_path)

    def test_negative_report_and_nonzero_failure_cannot_be_final(self):
        for body in [{'status': 'failed', 'failures': 0}, {'status': 'passed', 'failures': 1}]:
            self.report.write_text(json.dumps(body)); self.facts['reports'][0].update(sha256=B.sha(self.report), actualReportStatus=body['status']); self.save()
            with self.assertRaises(ValueError): B.read_facts(self.facts_path)

    def test_negative_status_cannot_hide_behind_passing_boolean(self):
        self.report.write_text('{"status":"failed","passed":true,"failures":0}')
        self.facts['reports'][0].update(sha256=B.sha(self.report), actualStatusField='passed', actualReportStatus=True); self.save()
        with self.assertRaises(ValueError): B.read_facts(self.facts_path)

    def test_missing_source_freeze_and_live_source_drift_rejected(self):
        freeze = self.facts.pop('sourceFreeze'); self.save()
        with self.assertRaises((ValueError, KeyError)): B.read_facts(self.facts_path)
        self.facts['sourceFreeze'] = freeze; self.save()
        (B.R / 'src/cqc-pass8-layout.css').write_text('drift')
        with self.assertRaises(ValueError): B.read_facts(self.facts_path)

    def test_duplicate_qa_name_rejected(self):
        self.facts['reports'].append(copy.deepcopy(self.facts['reports'][0])); self.save()
        with self.assertRaises(ValueError): B.read_facts(self.facts_path)

    def test_archive_movie_credential_and_symlink_sources_rejected(self):
        for n in ['full.zip', 'part.z01', 'longplay.mkv', '.env.local', 'auth.json']:
            with self.assertRaises(ValueError): B.safe_file(self.fixture(n))
        linked = self.w / 'linked.json'; linked.symlink_to(self.report)
        with self.assertRaises(ValueError): B.safe_file(linked)

    def test_targets_cannot_escape_evidence_or_follow_symlink_parent(self):
        with self.assertRaises(ValueError): B.safe_target(B.D / '../pass7/history.json')
        with self.assertRaises(ValueError): B.safe_target(B.S / 'public/source.js')
        B.D.parent.mkdir(parents=True); B.D.symlink_to(self.w / 'other')
        with self.assertRaises(ValueError): B.safe_target(B.D / 'report.json')

    def test_mutable_document_copy_is_independent_and_exact(self):
        source = self.fixture(); before = source.read_bytes(); row = self.row(source)
        result = B.install(row); target = Path(row['target'])
        self.assertEqual(result['mode'], 'independent-byte-copy'); self.assertEqual(target.read_bytes(), before)
        self.assertNotEqual(source.stat().st_ino, target.stat().st_ino)
        target.write_bytes(b'fixture edit\n'); self.assertEqual(source.read_bytes(), before)

    def test_existing_mutable_hardlink_is_detached_without_byte_loss(self):
        source = self.fixture(); row = self.row(source); target = Path(row['target']); target.parent.mkdir(parents=True)
        os.link(source, target); B.install(row)
        self.assertEqual(source.read_bytes(), target.read_bytes()); self.assertNotEqual(source.stat().st_ino, target.stat().st_ino)

    def test_closed_png_is_hardlinked_with_exact_original_bytes(self):
        source = self.fixture('native.png', b'\x89PNG\r\n\x1a\nsynthetic guard fixture')
        row = self.row(source, 'native.png'); row['storagePolicy'] = 'closed-artifact-hardlink'; B.install(row); target = Path(row['target'])
        self.assertEqual(source.read_bytes(), target.read_bytes()); self.assertEqual(source.stat().st_ino, target.stat().st_ino)

    def test_different_previous_bytes_refused_by_default(self):
        source = self.fixture(); row = self.row(source); target = Path(row['target']); target.parent.mkdir(parents=True); target.write_bytes(b'historical\n')
        with self.assertRaises(ValueError): B.install(row)
        self.assertEqual(target.read_bytes(), b'historical\n')

    def test_explicit_update_keeps_previous_document_bytes_independent(self):
        source = self.fixture(); row = self.row(source); target = Path(row['target']); target.parent.mkdir(parents=True); old = b'historical\n'; target.write_bytes(old)
        result = B.install(row, preserve_existing=True); backup = Path(result['backup'])
        self.assertEqual(backup.read_bytes(), old); self.assertEqual(target.read_bytes(), source.read_bytes())
        self.assertNotEqual(backup.stat().st_ino, target.stat().st_ino); self.assertNotEqual(source.stat().st_ino, target.stat().st_ino)

    def test_tampered_source_rejected_before_destination_creation(self):
        source = self.fixture(); row = self.row(source); source.write_bytes(b'drift\n')
        with self.assertRaises(ValueError): B.install(row)
        self.assertFalse(Path(row['target']).exists())

    def test_execution_without_exact_root_freeze_sha_is_rejected_before_git_or_copy(self):
        with self.assertRaises(ValueError): B.execute({'rootFactsSha256': '1' * 64}, self.facts_path, None)
        with self.assertRaises(ValueError): B.execute({'rootFactsSha256': '1' * 64}, self.facts_path, '2' * 64)
        self.assertFalse(B.D.exists())

    def test_only_named_source_preimage_gzip_is_accepted(self):
        p = B.P / 'action-mapping-revisions/wolf-body-charge/combat-sprite-catalog-v1.json.before.gz'; p.parent.mkdir(parents=True); p.write_bytes(b'synthetic gzip fixture')
        self.assertEqual(B.safe_file(p), p)
        bad = p.parent / 'historical-full-archive.gz'; bad.write_bytes(b'fixture')
        with self.assertRaises(ValueError): B.safe_file(bad)

    def test_closed_json_reference_is_hardlinked_after_root_freeze(self):
        source = self.fixture('closed-report.json'); row = self.row(source); row['storagePolicy'] = 'closed-artifact-hardlink'
        B.install(row); self.assertEqual(source.stat().st_ino, Path(row['target']).stat().st_ino)

    def test_mutable_runtime_is_copied_once_then_only_archive_is_linked(self):
        source = B.R / 'src/cqc-pass8-layout.css'; rows = {}
        B.archive_source(rows, source, Path('src/cqc-pass8-layout.css'), Path('source-code/src/cqc-pass8-layout.css'), 'fixture')
        for row in B.ordered_rows(rows): B.install(row)
        archive = B.P / 'final-source-archive/src/cqc-pass8-layout.css'; view = B.D / 'source-code/src/cqc-pass8-layout.css'
        self.assertNotEqual(source.stat().st_ino, archive.stat().st_ino); self.assertEqual(archive.stat().st_ino, view.stat().st_ino)

    def test_mutable_test_report_never_directly_links_to_proof(self):
        source = B.R / 'tests/results.json'; source.parent.mkdir(); source.write_text('{}'); rows = {}
        B.mirror_provenance(rows, source, Path('QA/results.json'), 'fixture')
        for row in B.ordered_rows(rows): B.install(row)
        self.assertNotEqual(source.stat().st_ino, (B.P / 'QA/results.json').stat().st_ino)
        self.assertEqual((B.P / 'QA/results.json').stat().st_ino, (B.D / 'provenance/QA/results.json').stat().st_ino)

    def test_unrelated_mutable_hardlinks_are_detached_before_copy_reuse(self):
        source = self.fixture(); row = self.row(source); target = Path(row['target']); target.parent.mkdir(parents=True)
        other = self.fixture('other.json'); os.link(other, target); B.install(row)
        self.assertNotEqual(other.stat().st_ino, target.stat().st_ino); self.assertEqual(source.read_bytes(), target.read_bytes())

    def test_known_insufficient_space_stops_before_git_and_bundle_writes(self):
        digest = B.sha(self.facts_path)
        plan = {'rootFactsSha256': digest, 'collisionsRequiringPreviousByteBackup': [], 'newIndependentCopyAllocatedBytesUpperBound': 10 * 1024 ** 3,
                'previousByteBackupAllocatedBytesUpperBound': 0, 'spaceReserveBytes': 80 * 1024 ** 2}
        with self.assertRaisesRegex(ValueError, 'Insufficient storage'): B.execute(plan, self.facts_path, digest)
        self.assertFalse(B.D.exists()); self.assertFalse(B.P.exists())

    def test_existing_archive_crosslink_to_other_mutable_source_is_detached(self):
        source = B.R / 'src/cqc-pass8-layout.css'; other = B.R / 'src/cqc-pass8-combat-engine.js'; rows = {}
        archive = B.P / 'final-source-archive/src/cqc-pass8-layout.css'; archive.parent.mkdir(parents=True); os.link(other, archive)
        B.archive_source(rows, source, Path('src/cqc-pass8-layout.css'), Path('source-code/src/cqc-pass8-layout.css'), 'fixture')
        for row in B.ordered_rows(rows): B.install(row)
        self.assertNotEqual(other.stat().st_ino, archive.stat().st_ino); self.assertNotEqual(source.stat().st_ino, archive.stat().st_ino)
        self.assertEqual(archive.stat().st_ino, (B.D / 'source-code/src/cqc-pass8-layout.css').stat().st_ino)

    def test_gzip_source_preimage_mirror_can_be_reused(self):
        source = B.P / 'action-mapping-revisions/wolf-body-charge/combat-sprite-catalog-v1.json.before.gz'; source.parent.mkdir(parents=True); source.write_bytes(b'closed fixture')
        rows = {}; B.add(rows, source, B.D / 'provenance/action-mapping-revisions/wolf-body-charge/combat-sprite-catalog-v1.json.before.gz', 'fixture', 'closed-artifact-hardlink')
        row = list(rows.values())[0]; B.install(row); B.install(row)
        self.assertEqual(source.stat().st_ino, Path(row['target']).stat().st_ino)

    def test_preparation_output_cannot_escape_or_follow_symlinks(self):
        with self.assertRaises(ValueError): B.exclusive_write(B.T / '../escaped-output.json', b'{}')
        linked = B.T / 'linked'; linked.symlink_to(self.w)
        with self.assertRaises(ValueError): B.exclusive_write(linked / 'escaped-output.json', b'{}')

    def test_previous_manifest_backups_are_pinned_and_mirrored_on_authorized_update(self):
        previous = []
        for target, raw in [(B.P / 'PRESERVATION_MANIFEST.json', b'{"old":"standalone"}\n'), (B.D / 'BUNDLE_MANIFEST.json', b'{"old":"review"}\n')]:
            target.parent.mkdir(parents=True, exist_ok=True); target.write_bytes(raw); digest = B.sha(target)
            backup = target.with_name(target.stem + '.previous-' + digest + target.suffix)
            previous.append({'path': str(target), 'bytes': len(raw), 'sha256': digest, 'backupTarget': str(backup),
                             'reviewMirrorTarget': str(B.D / 'provenance' / backup.relative_to(B.P)) if backup.is_relative_to(B.P) else None})
        digest = B.sha(self.facts_path)
        plan = {'rootFactsSha256': digest, 'collisionsRequiringPreviousByteBackup': previous, 'newIndependentCopyAllocatedBytesUpperBound': 8192,
                'previousByteBackupAllocatedBytesUpperBound': 8192, 'spaceReserveBytes': 80 * 1024 ** 2,
                'files': [], 'previousManifestPins': previous, 'externalRetainedShaPins': []}
        with patch.object(B, 'git_outside', return_value={'fixture': 'unchanged'}): result = B.execute(plan, self.facts_path, digest, True)
        manifest = json.loads((B.D / 'BUNDLE_MANIFEST.json').read_text())
        pins = manifest['retainedPreviousBytes']; self.assertEqual(len(pins), 3)
        self.assertEqual({r['sha256'] for r in pins}, {p['sha256'] for p in previous})
        for pin in pins: self.assertEqual(B.sha(Path(pin['path'])), pin['sha256'])
        self.assertEqual(result['backups'], pins)

    def test_generated_identical_document_with_other_hardlink_is_detached(self):
        raw = b'{"closed":"fixture"}\n'; source = self.fixture('other.json', raw); target = B.D / 'generated.json'; target.parent.mkdir(parents=True); os.link(source, target)
        row = {'source': None, 'target': str(target), 'bytes': len(raw), 'sha256': B.raw_sha(raw), 'storagePolicy': 'generated-independent-bytes', 'generatedUtf8': raw.decode()}
        B.install(row); self.assertNotEqual(source.stat().st_ino, target.stat().st_ino); self.assertEqual(target.read_bytes(), raw)

    def test_extra_artifact_alias_to_mutable_historical_test_gets_independent_archive(self):
        live = B.R / 'tests/historical-results.json'; live.parent.mkdir(); live.write_bytes(b'{"prior":true}\n')
        source = self.w / 'closed-run/original-report-inodes/historical-results.json'; source.parent.mkdir(parents=True); os.link(live, source)
        rows = {}; B.mirror_provenance(rows, source, Path('QA/historical-results.json'), 'fixture', force_independent=True)
        for row in B.ordered_rows(rows): B.install(row)
        proof = B.D / 'provenance/QA/historical-results.json'; self.assertNotEqual(proof.stat().st_ino, live.stat().st_ino)
        live.write_bytes(b'new mutable test run\n'); self.assertEqual(proof.read_bytes(), b'{"prior":true}\n')

    def test_frozen_evidence_tree_membership_must_be_exact(self):
        tree = self.w / 'closed-browser'; tree.mkdir(); p = tree / 'receipt.json'; p.write_text('{}')
        manifest = tree / 'FILE_SHA256_MANIFEST.json'; manifest.write_text(json.dumps({'files': [{'path': str(p), 'bytes': p.stat().st_size, 'sha256': B.sha(p)}]}))
        self.facts['evidenceTrees'] = [{'path': str(tree), 'manifestPath': str(manifest), 'manifestSha256': B.sha(manifest)}]; self.save()
        B.read_facts(self.facts_path)
        (tree / 'unexpected.json').write_text('{}')
        with self.assertRaises(ValueError): B.read_facts(self.facts_path)

if __name__ == '__main__': unittest.main(verbosity=2)
