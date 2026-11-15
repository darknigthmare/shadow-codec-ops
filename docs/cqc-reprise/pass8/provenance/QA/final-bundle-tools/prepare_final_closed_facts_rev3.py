#!/usr/bin/env python3
"""Prepare a new unconfirmed facts draft from already closed evidence only."""
from pathlib import Path
import collections, copy, hashlib, json, os, sys
sys.dont_write_bytecode = True
import bundle_pass8 as B

T = Path(__file__).parent
W = Path('/workspace')
OLD = T / 'DRAFT_ROOT_FACTS_PASS8.json'
OUT = T / 'DRAFT_ROOT_FACTS_PASS8_FINAL_CLOSED_REV3.json'
cache = {}

def pin(path):
    p = B.safe_file(path)
    before = p.stat()
    key = (before.st_dev, before.st_ino, before.st_size, before.st_mtime_ns, before.st_ctime_ns)
    if key not in cache: cache[key] = B.sha(p)
    after = p.stat()
    B.require(key == (after.st_dev, after.st_ino, after.st_size, after.st_mtime_ns, after.st_ctime_ns), 'Evidence changed: ' + str(p))
    return {'path': str(p), 'bytes': before.st_size, 'sha256': cache[key]}

def write(path, value):
    data = B.encode(value)
    if Path(path).exists():
        B.require(Path(path).read_bytes() == data, 'Existing prepared artifact differs: ' + str(path))
        return
    B.exclusive_write(path, data)

def main():
    old_pin = pin(OLD)
    facts = copy.deepcopy(json.loads(OLD.read_text()))
    facts.update(confirmedByRoot=False, status='pending', sourceState='in_progress', retainReproducibleRenderCapturesLocally=True)
    facts['draftPredecessor'] = old_pin
    extras = {r['path']: r for r in facts['extraFiles']}
    covered = set()

    def extra(path, relative=None, independent=None):
        p = Path(path)
        if independent is None: independent = p.suffix.lower() in {'.py', '.js', '.mjs', '.cjs'}
        row = {**pin(p), 'provenanceRelativePath': relative or 'QA/final-closed-rev3/' + str(p.relative_to(W)), 'closedImmutableArtifact': not independent}
        if independent: row.update(requiresIndependentArchive=True, proofClosesAfterIndependentArchiveCopy=True)
        extras[str(p)] = row

    def report(name, path, scope):
        p = Path(path); j = json.loads(p.read_text()); actual = j.get('status')
        B.require(actual in ('passed', 'completed', 'approved', 'accepted_closest_supported'), 'Unpassed report: ' + str(p))
        facts['reports'].append({'name': name, **pin(p), 'status': 'passed', 'actualStatusField': 'status', 'actualReportStatus': actual, 'scopeQualification': scope})

    def tree(base):
        base = Path(base)
        label = 'final-closed-rev3-' + '-'.join(base.relative_to(W).parts)
        files = [pin(p) for p in B.files_in(base)]
        manifest = T / 'evidence-manifests' / (label + '.json')
        write(manifest, {'schema': 'cqc.pass8.closed-evidence-tree-sha256/1', 'sourceRoot': str(base), 'files': files, 'manifestSelfExcluded': True, 'manifestOutsideSourceTree': True})
        facts['evidenceTrees'].append({'path': str(base), 'manifestPath': str(manifest), 'manifestSha256': pin(manifest)['sha256'], 'provenanceRelativePath': 'QA/closed-evidence/' + label, 'closedImmutableArtifact': True})
        covered.update(r['path'] for r in files)
        extra(manifest)

    browser = W / 'cqc-pass8-native-browser-final/pass8-shadow-runtime-final-rev3/cqc'
    raw = browser / 'verification.json'
    commands = json.loads(raw.read_text())
    B.require(isinstance(commands, list) and len(commands) == 963, 'Unexpected raw embedded browser structure')
    B.require(all(r.get('exit') == 0 and r.get('result', {}).get('success') is True for r in commands), 'Embedded browser command failed')
    evaluated = [r['result'].get('data', {}).get('result') for r in commands if r.get('command') == 'eval']
    ready = [r for r in evaluated if isinstance(r, dict) and set(r) == {'status', 'uid'}]
    B.require(len(ready) == 26 and all(r['status'].get('ready') is True and r['status'].get('renderer') == 'png' for r in ready), 'Embedded native readiness failed')
    uids = sorted({r['uid'] for r in ready})
    B.require(len(uids) == 13, 'Embedded form count changed')
    selections = []
    for r in evaluated:
        if not isinstance(r, dict): continue
        if isinstance(r.get('actual'), dict): selections.append(r['actual'])
        for sample in r.get('samples', []):
            if isinstance(sample.get('actual'), dict): selections.append(sample['actual'])
    B.require(selections and all(r.get('ok') is True for r in selections), 'Embedded Canvas selection failed')
    error_records = [r['result'].get('data', {}).get('errors') for r in commands if r.get('command') == 'errors']
    B.require(len(error_records) == 2 and all(r == [] for r in error_records), 'Embedded page errors')
    summary = T / 'ROOT_EMBEDDED_ALL13_BROWSER_SUMMARY_REV3.json'
    write(summary, {'schema': 'cqc.pass8.qualified-embedded-browser-summary/1', 'status': 'passed', 'sourceRawVerification': pin(raw), 'rawVerificationIsCommandList': True, 'commandCount': len(commands), 'allCommandExitsZeroAndToolSuccessTrue': True, 'commandCounts': dict(collections.Counter(r['command'] for r in commands)), 'uidCount': len(uids), 'uids': uids, 'nativeReadyObservations': len(ready), 'canvasSelectionObservations': len(selections), 'allObservedCanvasSelectionsOK': True, 'pageErrorSamples': error_records, 'rootSourceFreeze': facts['sourceFreeze'], 'basis': 'Read the already closed actual embedded browser command log. No new browser or physical review was performed by this preparer.', 'limits': ['This is local embedded runtime verification, not remote deployment certification.', 'Physical authored sheet review and source fidelity limits remain in the existing reports.', 'Raw Canvas observations are not added to the 1406 distinct regression count.'], 'absolute1to1Certified': False, 'deploymentCertified': False})
    report('fresh-embedded-all13-native-browser-rev3', summary, 'Actual local /cqc/ embedded runtime: 963 successful commands, 13 forms, 26 PNG-ready observations and all recorded Canvas selections OK. Closed raw command list is retained; no new physical review or deployed-site certification.')
    extra(summary)

    main02 = W / 'vercel-pass8-publication/browser-local-rev3-02'
    main01 = W / 'vercel-pass8-publication/browser-local-rev3-01'
    report('mainbrowser-local-rev3-02', main02 / 'verification.json', 'Actual local Shadow tab and direct CQC checks at desktop/mobile sizes, native-byte hashes, boots and observed Raven explosion. scope=local-root-ready; no remote publication claim. Failed first browser attempt remains retained separately.')
    rootqa = W / 'cqc-pass8-root-final-proofs/shadow-build-wrapper-argv-correction'
    qa = json.loads((rootqa / 'FINAL_SHADOW_QA_COMPLETION.json').read_text())
    report('root-final-Shadow-QA-and-official-build-rev3', rootqa / 'FINAL_SHADOW_QA_COMPLETION.json', 'Fresh original copy verification/lint/705 Vitest tests in104 files/tsc, corrected official Vite build and PWA check. First duplicated-wrapper-argv rejection is retained; already passing suites were not repeated. Deployment not certified.')
    runtime = W / 'cqc-pass8-storage-tools/root-runtime-evidence'
    build = W / 'cqc-pass8-storage-tools/root-build-evidence'
    report('production-runtime-sync-rev3-actual', runtime / 'receipt-56ab47df-96b8-488f-9b87-c68f7d375289.json', 'Actual completed official transformed graph sync:988 content files plus runtime-manifest; fresh immutable typed raster links and independent mutable copies; old destination preserved. No deployment claim.')
    report('production-official-Vite-PWA-build-rev3-actual', build / 'receipt-1956f5fd-15ea-4b3c-88f6-11666cf95ed4.json', 'Actual official Vite/PWA output using verified frozen public assets. Typecheck skipped inside wrapper because original tsc step already passed explicitly in root QA; full receipt and preserved old dist retained.')
    png = W / 'cqc-pass8-closed-backup-png-storage-plan'
    report('closed-backup-PNG-byte-preservation-rev3-actual', png / 'execution/EXECUTION_RESULT.json', 'Exactly12 single-link copies in two closed old backups, six frozen PNG donors, 34.46875MiB allocated reclaimed; complete21283 R/S/1814 backup paths,1130 pin and Git guards passed.26 archive fullSHA observations reused only with exact closed stat seals; no new archive fullSHA read is claimed.')
    first_run = Path(qa['retainedFirstAttemptReport']['path']).parent
    for base in [browser, main02, main01, rootqa, runtime, build, png / 'execution', first_run / 'shadow-logs']: tree(base)
    for p in sorted(first_run.iterdir()):
        if p.is_file(): extra(p)

    for p in sorted(png.iterdir()):
        if p.is_file(): extra(p)
    closed_archive = W / 'cqc-pass8-closed-archive-dedup'
    additional = closed_archive / 'additional-pass7-execution'
    report('additional-closed-PASS6-PASS7-byte-preservation', additional / 'EXECUTION_RESULT.json', 'Actual additional nine byte-identical immutable closed-copy hardlinks under root-approved plan. Storage byte/path preservation only; no new game/fidelity/remote-publication claim.')
    tree(additional)
    for p in sorted(closed_archive.iterdir()):
        if p.is_file(): extra(p)
    storage = W / 'cqc-pass8-storage-tools'
    for name in ['runtime-pins-root-rev3.json', 'runtime-plan-root-rev3.json', 'ROOT_RUNTIME_PLAN_REV3_READONLY_REVIEW.json', 'public-pins-root-rev3.json', 'build-plan-root-rev3.json', 'ROOT_BUILD_PLAN_REV3_REVIEW_AND_ARGUMENTS.json', 'build-execute-argv-root-rev3.json']:
        extra(storage / name)
    for name in ['bundle_pass8.py', 'prepare_final_closed_facts_rev3.py']:
        extra(T / name, 'QA/final-bundle-tools/' + name, True)
    for p in sorted(T.glob('bundle_pass8.previous-*.py')):
        extra(p, 'QA/final-bundle-tools/' + p.name, True)
    extra(OLD, 'QA/final-bundle-tools/' + OLD.name)
    facts['extraFiles'] = [r for r in extras.values() if r['path'] not in covered]
    facts['pendingReports'] = [{'name': 'root-final-source-and-artifact-freeze-GO', 'status': 'pending', 'path': None, 'reason': 'Root must review this distinct draft, exact final tool pins, closed evidence inventories and source freeze, then confirm the facts explicitly.'}]
    facts['scopeLimits'] = [s for s in facts['scopeLimits'] if not s.startswith('Runtime-sync backup trees')]
    facts['scopeLimits'].append('Actual runtime sync, official build/PWA and local embedded/native/main browser receipts are now explicit. Neither Git commit nor remote deployment is certified by this pending draft.')
    facts['scopeLimits'].append('Root explicitly authorized exact local retention of reproducible full native-browser Canvas PNGs, Wolf Canvas proofs and Raven inspection/initial-page captures. These remain intact at original paths with complete SHA inventories, not a complete remote backup. All source references/images,105 original generation attempts and234 runtime native PNGs remain in the Git bundle; the six successful main-browser boots/explosion captures remain included.')
    facts['finalClosedEvidenceQualification'] = {'originalDraftUnmodified': old_pin, 'newReportsDoNotReplaceFailedHistoricalAttempts': True, 'failedMainBrowserAttempt': pin(main01 / 'verification.json'), 'failedShadowWrapperArgvAttempt': pin(first_run / 'report.json'), 'helpersAndProductionReceiptsWereOutsideOlderReportScope': True, 'sourceOrOldEvidenceReauditedByPreparer': False, 'newSourceWrites': 0, 'newBrowserRuns': 0, 'newBuildRuns': 0, 'rootFactsConfirmationStillRequired': True}
    facts['realBundlePlanningOrExecutionPerformedByPreparer'] = False
    facts['realRorSWritesByPreparer'] = 0
    write(OUT, facts)
    B.require(pin(OLD) == old_pin, 'Original draft changed')
    print(json.dumps({'draft': pin(OUT), 'status': facts['status'], 'confirmedByRoot': False, 'reports': len(facts['reports']), 'closedEvidenceTrees': len(facts['evidenceTrees']), 'extraFiles': len(facts['extraFiles']), 'sourceWrites': 0, 'bundleExecuted': False}, indent=2))

if __name__ == '__main__': main()
