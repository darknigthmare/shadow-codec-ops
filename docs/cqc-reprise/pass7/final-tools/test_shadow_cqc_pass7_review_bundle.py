#!/usr/bin/env python3
"""Meaningful bundle guards on isolated temporary fixtures; no real bundle run."""
import copy
import hashlib
import importlib.util
import json
from pathlib import Path
import sys
import tempfile
import unittest

sys.dont_write_bytecode=True
spec=importlib.util.spec_from_file_location('pass7_bundle','/workspace/assemble_shadow_cqc_pass7_review_bundle.py')
B=importlib.util.module_from_spec(spec);spec.loader.exec_module(B)

class Guards(unittest.TestCase):
    def setUp(self):
        self.tmp=tempfile.TemporaryDirectory(prefix='cqc-pass7-bundle-guards-',dir='/tmp');self.w=Path(self.tmp.name)
        self.original={name:getattr(B,name) for name in ['W','R','S','D','PREFIX']}
        B.W=self.w;B.R=self.w/'source';B.S=self.w/'shadow';B.D=B.S/'docs/cqc-reprise/pass7';B.PREFIX='docs/cqc-reprise/pass7'
        self.report=self.w/'final-report.json';self.report.write_text(json.dumps({'status':'passed','failures':0}))
        self.extra=self.w/'verified-source.js';self.extra.write_text('const source = true;\n')
        self.facts={'schema':'cqc.github.pass7-review-bundle-inputs/1','confirmedByRoot':True,'status':'passed','sourceState':'frozen','reports':[{'name':'Final meaningful QA','path':str(self.report),'sha256':B.sha(self.report),'status':'passed','actualReportStatus':'passed'}],'extraFiles':[{'path':str(self.extra),'sha256':B.sha(self.extra)}]}
        self.fact_path=self.w/'root-facts.json';self.save()
    def save(self):self.fact_path.write_text(json.dumps(self.facts))
    def tearDown(self):
        for name,value in self.original.items():setattr(B,name,value)
        self.tmp.cleanup()
    def test_root_pinned_final_reports_are_read_without_repository_writes(self):
        facts,raw=B.read_inputs(self.fact_path);self.assertEqual(facts,self.facts);self.assertEqual(raw,self.fact_path.read_bytes());self.assertFalse(B.D.exists())
    def test_missing_root_confirmation_rejected(self):
        self.facts['confirmedByRoot']=False;self.save()
        with self.assertRaises(ValueError):B.read_inputs(self.fact_path)
    def test_unfrozen_source_rejected(self):
        self.facts['sourceState']='in_progress';self.save()
        with self.assertRaises(ValueError):B.read_inputs(self.fact_path)
    def test_final_report_tamper_rejected(self):
        self.report.write_text(json.dumps({'status':'passed','failures':1}))
        with self.assertRaises(ValueError):B.read_inputs(self.fact_path)
    def test_actual_negative_status_cannot_be_asserted_as_passing(self):
        self.report.write_text(json.dumps({'status':'failed'}));self.facts['reports'][0].update(sha256=B.sha(self.report),actualReportStatus='failed');self.save()
        with self.assertRaises(ValueError):B.read_inputs(self.fact_path)
    def test_pass_label_with_nonzero_failure_count_rejected(self):
        self.report.write_text(json.dumps({'status':'passed','failureCount':1}));self.facts['reports'][0]['sha256']=B.sha(self.report);self.save()
        with self.assertRaises(ValueError):B.read_inputs(self.fact_path)
    def test_root_actual_status_disagreement_rejected(self):
        self.facts['reports'][0]['actualReportStatus']='approved';self.save()
        with self.assertRaises(ValueError):B.read_inputs(self.fact_path)
    def test_duplicate_final_qa_name_rejected(self):
        self.facts['reports'].append(copy.deepcopy(self.facts['reports'][0]));self.save()
        with self.assertRaises(ValueError):B.read_inputs(self.fact_path)
    def test_extra_evidence_tamper_rejected(self):
        self.extra.write_text('changed\n')
        with self.assertRaises(ValueError):B.read_inputs(self.fact_path)
    def test_private_and_archive_paths_rejected_without_reading(self):
        for name in ['.env','auth.json','config.json','private.zip','private.z01','private.pem']:
            p=self.w/name;p.write_bytes(b'fixture')
            with self.assertRaises(ValueError):B.safe_file(p)
        private=self.w/'tokens';private.mkdir();p=private/'opaque.json';p.write_bytes(b'fixture')
        with self.assertRaises(ValueError):B.safe_file(p)
    def test_source_symlink_rejected(self):
        p=self.w/'reference-link.json';p.symlink_to(self.report)
        with self.assertRaises(ValueError):B.safe_file(p)
    def test_target_traversal_rejected(self):
        for path in ['../pass6/old.json','/tmp/outside.json']:
            with self.assertRaises(ValueError):B.safe_target(path)
        self.assertEqual(B.safe_target('qa/report.json'),B.D/'qa/report.json')
    def test_target_parent_symlink_rejected(self):
        B.D.parent.mkdir(parents=True);(B.D.parent/'pass7').symlink_to(self.w/'unrelated')
        with self.assertRaises(ValueError):B.safe_target('qa/report.json')
    def test_identical_mapping_reused_but_collision_rejected(self):
        mapping={};B.add(mapping,self.extra,'source-code/helper.js','source');B.add(mapping,self.extra,'source-code/helper.js','source');self.assertEqual(len(mapping),1)
        other=self.w/'other.js';other.write_text('different\n')
        with self.assertRaises(ValueError):B.add(mapping,other,'source-code/helper.js','source')
    def test_bundle_does_not_recursively_include_itself(self):
        B.D.mkdir(parents=True);p=B.D/'existing.json';p.write_bytes(b'{}')
        with self.assertRaises(ValueError):B.add({},p,'source-code/existing.json','source')
    def test_exact_writer_never_overwrites_different_history(self):
        p=self.w/'history.json';B.write_exact(p,b'original\n');B.write_exact(p,b'original\n')
        with self.assertRaises(ValueError):B.write_exact(p,b'changed\n')
        self.assertEqual(p.read_bytes(),b'original\n')
    def test_png_policy_does_not_apply_to_mutable_javascript(self):
        png=self.w/'native.png';png.write_bytes(b'\x89PNG\r\n\x1a\nfixture')
        rows={};B.add(rows,png,'provenance/native.png','frozen');B.add(rows,self.extra,'source-code/helper.js','source')
        self.assertEqual(rows[B.PREFIX+'/provenance/native.png']['storagePolicy'],'immutable-png-hardlink-or-byte-copy')
        self.assertEqual(rows[B.PREFIX+'/source-code/helper.js']['storagePolicy'],'independent-byte-copy')

if __name__=='__main__':unittest.main(verbosity=2)
