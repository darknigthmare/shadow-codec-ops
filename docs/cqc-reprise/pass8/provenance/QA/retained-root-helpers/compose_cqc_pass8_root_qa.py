import datetime, hashlib, json, pathlib

W = pathlib.Path('/workspace')
R = W / 'cqc-game-working/cqc-versus-v056'
out = W / 'cqc-pass8-root-final-proofs'
out.mkdir(exist_ok=True)
def read(p): return json.loads(p.read_text())
def pin(p): return {'path': str(p), 'sha256': hashlib.sha256(p.read_bytes()).hexdigest(), 'bytes': p.stat().st_size}

old_path = W / 'cqc-pass8-final-qa-tools/runs/run-20261002T091959Z-c847525b-all-r/report.json'
new_path = W / 'cqc-pass8-final-qa-tools/runs/run-20261002T093523Z-0fb6ac73-current/report.json'
old = read(old_path); new = read(new_path)
existing = [s for s in old['suites'] if s['scope'].startswith('current-existing-')]
assert len(existing) == 22 and sum(s['tests'] for s in existing) == 1304
assert all(s['suiteSucceeded'] and s['failed'] == 0 for s in existing)
assert new['passedAllChecks'] and new['currentTotals']['tests'] == 102 and new['currentTotals']['passed'] == 102
assert old['inputsUnchangedDuringRun'] and new['inputsUnchangedDuringRun']
assert old['allSevenHistoricalReportsRestoredByteAndMtimeExact'] and new['allSevenHistoricalReportsRestoredByteAndMtimeExact']
original_catalog = read(W / 'shadow-codec-recovered/docs/cqc-reprise/pass7/source-code/data/combat-sprite-catalog-v1.json')
current_catalog = read(R / 'data/combat-sprite-catalog-v1.json')
assert len(original_catalog['entries']) == 26 and len(current_catalog['entries']) == 39
assert all(current_catalog['entries'][uid] == entry for uid, entry in original_catalog['entries'].items())
freeze_path = W / 'cqc-pass8-source-freeze-39-rev3.json'
freeze = read(freeze_path)
for row in freeze['files']:
    assert pin(pathlib.Path(row['path']))['sha256'] == row['sha256']
for s in existing:
    for path_field, hash_field in [('stdoutLog','stdoutSHA256'),('stderrLog','stderrSHA256')]:
        assert pin(pathlib.Path(s[path_field]))['sha256'] == s[hash_field]
report = {
    'schema': 'cqc.pass8.root-distinct-regression-summary/1', 'status': 'passed',
    'checkedAtUTC': datetime.datetime.now(datetime.timezone.utc).isoformat(),
    'currentDistinctCases': 1406, 'passedDistinctCases': 1406, 'failed': 0,
    'existingRegressionCases': 1304, 'existingRegressionSuites': 22,
    'latestPASS8Cases': 102, 'sourceFreeze': pin(freeze_path),
    'inputs': [pin(old_path), pin(new_path)],
    'existingSuccessfulSuites': existing,
    'latestPASS8Totals': new['currentTotals'],
    'old26NativeEntriesExactlyPreserved': True,
    'historicalSevenReportsExactlyRestoredBothRuns': True,
    'countingRule': 'One fresh executed result per distinct existing suite plus the latest REV3 PASS8 two suites. Earlier failed PASS8/harness runs and archived fixture cases are preserved but excluded.',
    'existingSuiteRevalidationLimit': 'The 22 existing suites ran before the scoped Raven-only super speed correction and Wolf approval document reconciliation. Those changes affect the new thirteen-form helper or approval metadata; existing raw profiles, the old26 entries, historical renderer and historical raw inline engine were not edited. REV3 source/physics and independent actual grenade trajectory checks are separate fresh evidence.',
    'shadowAndPublicationCertifiedByThisReport': False,
    'absolute1to1Certified': False,
}
p = out / 'ROOT_DISTINCT_REGRESSION_SUMMARY_REV3.json'
with p.open('x') as f: f.write(json.dumps(report, ensure_ascii=False, indent=2) + '\n')
print(json.dumps({'status': 'passed', 'cases': 1406, 'report': pin(p)}))
