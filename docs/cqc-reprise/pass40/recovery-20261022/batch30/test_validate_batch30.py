#!/usr/bin/env python3
"""Tiny synthetic PNG fixtures test admission guards; none are production artwork."""
from pathlib import Path
import copy
import hashlib
import importlib.util
import json
import struct
import tempfile
import unittest
import zlib

HERE = Path(__file__).resolve().parent
SPEC = importlib.util.spec_from_file_location('batch_validator', HERE / 'validate-batch30.py')
V = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(V)

def tiny_png(rgba):
    def chunk(kind, payload):
        return struct.pack('>I', len(payload)) + kind + payload + struct.pack('>I', zlib.crc32(kind + payload) & 0xffffffff)
    return b'\x89PNG\r\n\x1a\n' + chunk(b'IHDR', struct.pack('>IIBBBBB', 1, 1, 8, 6, 0, 0, 0)) + chunk(b'IDAT', zlib.compress(b'\0' + bytes(rgba))) + chunk(b'IEND', b'')

class BatchGuards(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory(prefix='cqc-batch30-test-', dir='/tmp')
        self.root = Path(self.tmp.name)
        self.manifest = json.loads((HERE / 'manifest.json').read_text())
        # Product candidates and downloaded references are not fixture artwork.
        self.manifest.pop('canonicalReferenceLedger', None)
        for entry in self.manifest['entries']:
            entry.update(status='needs-source-regeneration', hold=False, sources=[],
                         implementation=[], references=[], qa=None, publication=None)
            entry.pop('heldPoses', None)
        # The fixture incident and audit are freshly pinned synthetic records.
        self.manifest['recoveryIncident'] = self.write_json('recovery/incident.json', {
            'schema': 'cqc.pass40.reprise-local-recovery-incident/1', 'observedUTC': '2026-10-22T19:31:40Z'})
        self.manifest['sevenUnitRecoveryAudit'] = self.write_json('recovery/seven.json', {'newPlayableUnitCount': 0})

    def tearDown(self):
        self.tmp.cleanup()

    def pin(self, rel):
        data = (self.root / rel).read_bytes()
        return {'path': rel, 'bytes': len(data), 'sha256': hashlib.sha256(data).hexdigest()}

    def write(self, rel, data):
        target = self.root / rel
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(data)
        return self.pin(rel)

    def write_json(self, rel, data):
        return self.write(rel, json.dumps(data, sort_keys=True).encode())

    def validate(self):
        return V.validate(self.manifest, self.root, _fixture=True)

    def admit(self, index=23, status='ready'):
        entry = self.manifest['entries'][index]
        stem = 'fixture/' + str(index)
        entry['sources'] = []
        for face, colour in [('right', (index, 20, 30, 255)), ('left', (index, 40, 50, 255))]:
            pin = self.write(stem + '/' + face + '.png', tiny_png(colour))
            entry['sources'].append({'id': face + '-a', 'facing': face, **pin, 'width': 1, 'height': 1})
        entry['implementation'] = [self.write(stem + '/unit.js', b'/* synthetic unit fixture; not a game implementation */\n')]
        entry['references'] = [{'url': 'https://example.org/synthetic-fixture', 'scope': 'Synthetic guard fixture, no artwork fidelity claim'}]
        entry['status'] = status
        self.reapprove(entry)
        return entry

    def reapprove(self, entry, **overrides):
        stem = 'fixture/' + str(self.manifest['entries'].index(entry))
        checks = {key: True for key in V.CHECKS | (V.MACHINE_CHECKS if entry['kind'] == 'machine' else set())}
        qa = {'schema': 'cqc.pass40.batch30.entry-qa/1', 'status': 'approved', 'entryId': entry['id'],
              'inputDigest': V.input_digest(entry), 'reviewedUTC': '2026-10-22T20:00:00Z',
              'inheritedApprovalUsed': False, 'reviewer': 'synthetic-fixture-test', 'checks': checks,
              'evidence': [self.write(stem + '/trace.json', b'{"synthetic":true}')], **overrides}
        entry['qa'] = self.write_json(stem + '/qa.json', qa)
        return qa

    def publish(self, entry):
        entry['status'] = 'published'
        publication = {'productCommit': '1' * 40, 'sourceArchiveCommit': '2' * 40,
                       'deploymentURL': 'https://example.org/immutable-deployment', 'verifiedProductCommit': '1' * 40}
        readback = {'schema': 'cqc.pass40.batch30.entry-publication/1', 'entryId': entry['id'],
                    'inputDigest': V.input_digest(entry), 'verifiedUTC': '2026-10-22T20:01:00Z',
                    'httpChecksPassed': True, 'bothGamesVerified': True,
                    **{key: publication[key] for key in ('productCommit', 'sourceArchiveCommit', 'deploymentURL')}}
        publication['readback'] = self.write_json('fixture/publication.json', readback)
        entry['publication'] = publication
        return publication, readback

    def reject(self, phrase):
        with self.assertRaisesRegex(V.Invalid, phrase):
            self.validate()

    def test_draft_is_valid_but_zero_delivered(self):
        result = self.validate()
        self.assertEqual(result['entryCount'], 30)
        self.assertEqual(result['completedCount'], 0)
        self.assertFalse(result['deliveredBatch30'])
        self.assertFalse(result['publishedBatch30'])

    def test_ready_does_not_count_as_complete(self):
        self.admit()
        result = self.validate()
        self.assertEqual(result['counts']['ready'], 1)
        self.assertEqual(result['completedCount'], 0)

    def test_incremental_completion_is_one_not_thirty(self):
        self.admit(status='complete')
        result = self.validate()
        self.assertEqual(result['completedCount'], 1)
        self.assertFalse(result['deliveredBatch30'])

    def test_published_requires_fresh_bound_readback(self):
        self.publish(self.admit())
        result = self.validate()
        self.assertEqual(result['counts']['published'], 1)
        self.assertFalse(result['publishedBatch30'])

    def test_cannot_drop_a_slot(self):
        self.manifest['entries'].pop()
        self.reject('exactly 30')

    def test_declared_scope_cannot_be_changed(self):
        self.manifest['scope']['canonicalCostumes'] = 15
        self.reject('Batch counts differ')

    def test_ready_cannot_be_claimed_without_sources(self):
        self.manifest['entries'][0]['status'] = 'ready'
        self.reject('Independent right and left')

    def test_duplicate_slot_is_rejected(self):
        self.manifest['entries'][-1] = copy.deepcopy(self.manifest['entries'][0])
        self.reject('Duplicate or unexpected')

    def test_incarnation_cannot_change_to_meryl_mgs4(self):
        row = next(x for x in self.manifest['entries'] if x['uid'] == 'core__meryl_mgs1')
        row['incarnation'] = 'MGS4-MERYL'
        self.reject('Identity/incarnation differs')

    def test_liquid_is_not_a_new_family(self):
        row = next(x for x in self.manifest['entries'] if x['uid'] == 'core__liquid')
        row['newFamilyCoverage'] = True
        self.reject('newFamilyCoverage')

    def test_hold_cannot_be_ready(self):
        self.admit()['hold'] = True
        self.reject('HOLD entry cannot')

    def test_clearing_hold_flag_does_not_admit_unresolved_held_poses(self):
        row = self.admit();row['heldPoses'] = [{'semanticPoseIndex': 12, 'runtimeAdmitted': False}]
        self.reapprove(row)
        self.reject('Held poses cannot')

    def test_missing_source_is_rejected(self):
        row = self.admit()
        (self.root / row['sources'][0]['path']).unlink()
        self.reject('Missing artifact')

    def test_corrupted_source_is_rejected(self):
        row = self.admit()
        path = self.root / row['sources'][0]['path']
        data = bytearray(path.read_bytes());data[44] ^= 1;path.write_bytes(data)
        self.reject('SHA256 differs')

    def test_png_corruption_is_rejected_even_with_new_sha(self):
        row = self.admit()
        source = row['sources'][0]
        data = bytearray((self.root / source['path']).read_bytes());data[44] ^= 1
        source.update(self.write(source['path'], data));self.reapprove(row)
        self.reject('CRC differs')

    def test_undecodable_png_is_rejected_even_with_valid_crc_and_sha(self):
        row = self.admit();source = row['sources'][0]
        data = (self.root / source['path']).read_bytes()
        length = struct.unpack('>I', data[33:37])[0]
        payload = b'x' * length
        data = data[:41] + payload + struct.pack('>I', zlib.crc32(b'IDAT' + payload) & 0xffffffff) + data[45 + length:]
        source.update(self.write(source['path'], data));self.reapprove(row)
        self.reject('deflate stream')

    def test_invalid_png_filter_is_rejected_even_with_valid_crc_and_sha(self):
        row = self.admit();source = row['sources'][0]
        data = (self.root / source['path']).read_bytes()
        old_length = struct.unpack('>I', data[33:37])[0]
        payload = zlib.compress(bytes([5, 1, 2, 3, 255]))
        chunk = struct.pack('>I', len(payload)) + b'IDAT' + payload + struct.pack('>I', zlib.crc32(b'IDAT' + payload) & 0xffffffff)
        data = data[:33] + chunk + data[45 + old_length:]
        source.update(self.write(source['path'], data));self.reapprove(row)
        self.reject('scanline filter')

    def test_wrong_dimensions_are_rejected(self):
        row = self.admit();row['sources'][0]['width'] = 2;self.reapprove(row)
        self.reject('dimensions differ')

    def test_same_image_cannot_supply_two_facings(self):
        row = self.admit()
        right, left = row['sources']
        data = (self.root / right['path']).read_bytes()
        left.update(self.write(left['path'], data));self.reapprove(row)
        self.reject('reused across facings')

    def test_symlink_file_is_rejected(self):
        row = self.admit();source = row['sources'][0]
        original = self.root / source['path']
        backing = original.with_name('backing.png');original.rename(backing);original.symlink_to(backing)
        self.reject('contains symlink')

    def test_symlink_parent_is_rejected(self):
        row = self.admit();source = row['sources'][0]
        alias = self.root / 'alias';alias.symlink_to(self.root / 'fixture', target_is_directory=True)
        source['path'] = source['path'].replace('fixture/', 'alias/');self.reapprove(row)
        self.reject('contains symlink')

    def test_broken_raster_alias_is_rejected(self):
        row = self.admit();source = row['sources'][0]
        path = self.root / source['path'];path.unlink();path.symlink_to('/tmp/nonexistent-cqc-source.png')
        self.reject('contains symlink')

    def test_parent_escape_is_rejected(self):
        row = self.admit();row['sources'][0]['path'] = '../out.png';self.reapprove(row)
        self.reject('escapes durable root')

    def test_absolute_tmp_path_is_rejected(self):
        row = self.admit();row['sources'][0]['path'] = '/tmp/out.png';self.reapprove(row)
        self.reject('escapes durable root')

    def test_draft_art_cannot_hide_missing_sources(self):
        row = self.admit();row['status'] = 'draft-art';row['qa'] = None
        (self.root / row['sources'][0]['path']).unlink()
        self.reject('Missing artifact')

    def test_qa_digest_must_match_exact_current_sources(self):
        row = self.admit();self.reapprove(row, inputDigest='0' * 64)
        self.reject('QA is stale')

    def test_updated_code_needs_new_qa(self):
        row = self.admit();code = row['implementation'][0]
        code.update(self.write(code['path'], b'/* changed synthetic unit */'))
        self.reject('QA is stale')

    def test_new_valid_source_png_needs_new_qa(self):
        row = self.admit();source = row['sources'][0]
        source.update(self.write(source['path'], tiny_png((100, 101, 102, 255))))
        self.reject('QA is stale')

    def test_declared_local_reference_corruption_is_rejected(self):
        row = self.admit()
        pin = self.write('fixture/reference.txt', b'synthetic reference bytes')
        row['references'][0].update(pin);self.reapprove(row)
        (self.root / pin['path']).write_bytes(b'synthetic reference byteX')
        self.reject('SHA256 differs')

    def add_mixed(self, row):
        def chunk(kind, payload):
            return struct.pack('>I', len(payload)) + kind + payload + struct.pack('>I', zlib.crc32(kind + payload) & 0xffffffff)
        data = b'\x89PNG\r\n\x1a\n' + chunk(b'IHDR', struct.pack('>IIBBBBB', 2, 1, 8, 6, 0, 0, 0))
        data += chunk(b'IDAT', zlib.compress(bytes([0, 71, 72, 73, 255, 74, 75, 76, 255]))) + chunk(b'IEND', b'')
        source = {'id': 'mixed-native-supplement', 'facing': 'mixed', 'width': 2, 'height': 1,
                  'nativeFacingRegions': [{'facing': 'right', 'rect': [0, 0, 1, 1]},
                                         {'facing': 'left', 'rect': [1, 0, 1, 1]}],
                  **self.write('fixture/mixed.png', data)}
        row['sources'].append(source);self.reapprove(row)
        return source

    def test_mixed_supplement_is_valid_with_two_separate_main_facings(self):
        row = self.admit();self.add_mixed(row)
        self.assertEqual(self.validate()['counts']['ready'], 1)

    def test_mixed_region_overlap_is_rejected(self):
        row = self.admit();source = self.add_mixed(row)
        source['nativeFacingRegions'][1]['rect'] = [0, 0, 1, 1];self.reapprove(row)
        self.reject('regions overlap')

    def test_mixed_region_outside_canvas_is_rejected(self):
        row = self.admit();source = self.add_mixed(row)
        source['nativeFacingRegions'][1]['rect'] = [2, 0, 1, 1];self.reapprove(row)
        self.reject('outside PNG bounds')

    def test_mixed_alone_cannot_replace_two_main_facings(self):
        row = self.admit();source = self.add_mixed(row)
        row['sources'] = [source];self.reapprove(row)
        self.reject('Independent right and left')

    def test_mixed_art_on_hold_is_a_valid_incomplete_draft(self):
        row = self.admit();self.add_mixed(row)
        row.update(status='hold', hold=True, qa=None)
        result = self.validate()
        self.assertEqual(result['counts']['hold'], 1)
        self.assertEqual(result['completedCount'], 0)

    def test_historical_qa_cannot_be_reused(self):
        row = self.admit();self.reapprove(row, reviewedUTC='2026-10-20T20:00:00Z')
        self.reject('predates the recovery incident')

    def test_missing_runtime_check_is_rejected(self):
        row = self.admit();checks = {key: True for key in V.CHECKS};checks['noFallback'] = False
        self.reapprove(row, checks=checks)
        self.reject('Required QA check')

    def test_machine_needs_articulation_and_aim_checks(self):
        row = self.admit(index=27);self.reapprove(row, checks={key: True for key in V.CHECKS})
        self.reject('Required QA check')

    def test_published_cannot_point_to_another_commit(self):
        publication, _ = self.publish(self.admit())
        publication['verifiedProductCommit'] = '3' * 40
        self.reject('Deployment commit was not verified')

    def test_public_readback_needs_current_input_digest(self):
        publication, readback = self.publish(self.admit());readback['inputDigest'] = '0' * 64
        publication['readback'] = self.write_json('fixture/publication.json', readback)
        self.reject('Publication readback is stale')

    def test_production_validator_rejects_ephemeral_fixture_root(self):
        with self.assertRaisesRegex(V.Invalid, 'under /workspace'):
            V.validate(self.manifest, self.root)

    def test_fatman_must_remain_outside_batch_and_no_retry(self):
        self.manifest['excludedHolds'][0]['retryAllowed'] = True
        self.reject('Fatman HOLD')

if __name__ == '__main__':
    unittest.main(verbosity=2)
