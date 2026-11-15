#!/usr/bin/env python3
"""Meaningful isolated guard regressions; no Git/remote or R/S mutations."""
from pathlib import Path
import copy, importlib.util, json, sys, tempfile
sys.dont_write_bytecode = True
T = Path(__file__).parent
spec = importlib.util.spec_from_file_location('publication_proof', T / 'publish_verified_shadow_cqc_pass8_publication_proofs.py')
P = importlib.util.module_from_spec(spec); spec.loader.exec_module(P)
results = []

def check(name, fn, reject=False):
    try: fn()
    except RuntimeError:
        if not reject: raise
    else:
        if reject: raise AssertionError('Guard did not reject: ' + name)
    results.append({'name': name, 'passed': True})

def run():
    name = P.PROOF_PREFIX + 'evidence.json'
    row = {'path': name, 'mode': '100644', 'type': 'blob', 'sha': 'a' * 40}
    check('exact-new-proof-path-accepted', lambda: P.validate_new_proof_changes([row], {}, [name]))
    check('existing-history-change-rejected', lambda: P.validate_new_proof_changes([row], {name: row}, [name]), True)
    check('scope-expansion-runtime-rejected', lambda: P.validate_new_proof_changes([{**row, 'path': 'public/cqc/src/runtime.js'}], {}, ['public/cqc/src/runtime.js']), True)
    check('unexpected-proof-path-rejected', lambda: P.validate_new_proof_changes([row], {}, [P.PROOF_PREFIX + 'another.json']), True)
    check('duplicate-path-rejected', lambda: P.validate_new_proof_changes([row, row], {}, [name, name]), True)
    check('large-gzip-payload-type-rejected', lambda: P.validate_new_proof_changes([{**row, 'path': P.PROOF_PREFIX + 'catalog.gz'}], {}, [P.PROOF_PREFIX + 'catalog.gz']), True)
    check('traversal-rejected', lambda: P.validate_new_proof_changes([{**row, 'path': P.PROOF_PREFIX + '../escape.json'}], {}, [P.PROOF_PREFIX + '../escape.json']), True)
    check('backslash-path-rejected', lambda: P.validate_new_proof_changes([{**row, 'path': P.PROOF_PREFIX + 'a\\escape.json'}], {}, [P.PROOF_PREFIX + 'a\\escape.json']), True)
    check('symlink-mode-rejected', lambda: P.validate_new_proof_changes([{**row, 'mode': '120000'}], {}, [name]), True)
    check('submodule-kind-rejected', lambda: P.validate_new_proof_changes([{**row, 'type': 'commit'}], {}, [name]), True)
    with tempfile.TemporaryDirectory(prefix='proof-fixture-', dir=T) as fixture:
        root = Path(fixture); P.SOURCE = root
        working = root / name; working.parent.mkdir(parents=True); working.write_text('{"closed":true}\n')
        report = root / 'closed-report.json'; report.write_text('{"status":"passed"}\n')
        plan = root / 'closed-plan.json'
        plan.write_text(json.dumps({'status': 'prepared', 'expectedParent': P.PARENT, 'historicalPathDeletions': 0, 'files': [{'targetPath': name, 'bytes': working.stat().st_size, 'sha256': P.sha256(working.read_bytes())}]}))
        facts = {'schema': 'cqc.github.pass8-publication-proof-facts/1', 'confirmedByRoot': True, 'status': 'passed', 'sourceState': 'frozen', 'localCommit': 'b'*40, 'localTree': 'c'*40, 'expectedParent': P.PARENT, 'verifiedNativeCommit': P.PARENT, 'sourceFreezeSHA256': P.SOURCE_FREEZE_SHA256, 'productionDeploymentId': P.DEPLOYMENT_ID, 'bundlePlan': {'path': str(plan), 'sha256': P.sha256(plan.read_bytes())}, 'expectedNewPaths': [name], 'reports': [{'name': 'fixture', 'status': 'passed', 'path': str(report), 'sha256': P.sha256(report.read_bytes()), 'actualStatusField': 'status', 'actualReportStatus': 'passed'}]}
        facts_path = root / 'facts.json'
        def read(value):
            facts_path.write_text(json.dumps(value)); return P.read_qa_facts(facts_path, 'b'*40, 'c'*40)
        check('closed-proof-facts-pass', lambda: read(facts))
        (root / 'future-runtime.js').write_text('changed PASS9 runtime\n')
        (root / 'future-freeze43.json').write_text('{"new":43}\n')
        check('future-runtime-and-freeze-ignored', lambda: read(facts))
        check('wrong-native-parent-rejected', lambda: read({**facts, 'expectedParent': 'd'*40}), True)
        check('root-unconfirmed-rejected', lambda: read({**facts, 'confirmedByRoot': False}), True)
        check('closed-P8-freeze-pin-change-rejected', lambda: read({**facts, 'sourceFreezeSHA256': 'd'*64}), True)
        check('different-deployment-rejected', lambda: read({**facts, 'productionDeploymentId': 'dpl_other'}), True)
        report.write_text('{"status":"failed"}\n')
        tampered = copy.deepcopy(facts); tampered['reports'][0]['sha256'] = P.sha256(report.read_bytes())
        check('actual-failed-report-rejected-even-with-updated-pin', lambda: read(tampered), True)
        report.write_text('{"status":"passed"}\n'); working.write_text('{"closed":false}\n')
        check('proof-payload-tamper-rejected', lambda: read(facts), True)
    evidence = {'schema': 'cqc.pass8.publication-proof-fixture-tests/1', 'status': 'passed', 'checks': results, 'count': len(results), 'remoteRequests': 0, 'realGitMutations': 0, 'realRorSWrites': 0, 'fixtureOutputsCleanedOnly': True}
    print(json.dumps(evidence, indent=2))
    return evidence

if __name__ == '__main__': run()
