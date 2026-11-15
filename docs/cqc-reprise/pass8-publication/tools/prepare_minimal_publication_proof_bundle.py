#!/usr/bin/env python3
"""Copy only closed PASS8 publication evidence into an isolated new bundle."""
from pathlib import Path
import argparse, hashlib, json, subprocess, sys
sys.dont_write_bytecode = True

T = Path(__file__).parent
W = Path('/workspace')
S = W / 'shadow-codec-recovered'
PARENT = '13bbe0f85b7a23299eb8e7d47be87011cf62857d'
TREE = '20fcbe05bc8b3ae8b22beaaf3b73edf4b748f608'
FREEZE = '6929470adf81540681b190f92dcb0262863340177f7ed92b81f62ad9a76da14c'
CATALOG = '3fe34bf2be1cc7c5365a82e57b747b269adf795c1940885a6ce6e8a4a793d747'
CATALOG_JS = '2e77835dafc4ac5698b62c86700f2c6751ee551692216bcab89381b07183cc79'
MANIFEST = '7dd2b1b338459f88781897903d32449378aff38e55283099df1f8b0cdb68bd8a'
DEPLOYMENT = 'dpl_H79z6JBcxBx8CcXeKucSmZq93Nrb'
PREFIX = 'docs/cqc-reprise/pass8-publication/'

def require(ok, message):
    if not ok: raise RuntimeError(message)

def digest(raw): return hashlib.sha256(raw).hexdigest()

def read_closed(path):
    p = Path(path)
    require(p.is_absolute() and p.is_relative_to(W) and p.is_file() and not p.is_symlink() and p.resolve() == p, 'Closed regular source required: ' + str(p))
    before = p.stat(); raw = p.read_bytes(); after = p.stat()
    require((before.st_ino, before.st_size, before.st_mtime_ns, before.st_ctime_ns) == (after.st_ino, after.st_size, after.st_mtime_ns, after.st_ctime_ns), 'Source changed while copied')
    require(len(raw) < 25 * 1024 * 1024, 'Minimal proof source too large')
    return raw

def write_new(path, raw):
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open('xb') as f: f.write(raw)

def encode(value): return (json.dumps(value, ensure_ascii=False, indent=2) + '\n').encode()

def build(output, http_path, browser_path):
    require(output.is_absolute() and output.is_relative_to(T) and not output.exists(), 'Output must be a fresh isolated child of the tool directory')
    http_raw = read_closed(http_path); http = json.loads(http_raw)
    browser_raw = read_closed(browser_path); browser = json.loads(browser_raw)
    require(digest(http_raw) == '1b9fb3c2510c2fcff8de44193ae7359a054b9ccf3550aab76ea8b97102144ed8', 'Closed HTTP proof SHA differs')
    require(digest(browser_raw) == '495237518612c12b4d22a29ab82f1734d6e169b3b8be722d8642cab75eb1036b', 'Closed browser proof SHA differs')
    require(http.get('expectedCommit') == PARENT and http.get('passed') is True and http.get('checkCount') == 989 and http.get('failures') == [], 'Production HTTP proof is not closed/passed')
    require(browser.get('expectedCommit') == PARENT and browser.get('status') == 'passed' and browser.get('scope') == 'production' and browser.get('checkCount') == 406 and browser.get('cleanup') == 'owned browser closed', 'Production browser proof is not closed/passed')
    require(browser.get('manifestSHA256') == MANIFEST and browser.get('runtimeCatalogJSSHA256') == CATALOG_JS and browser.get('closedLocalCatalogJSONSHA256') == CATALOG, 'Historical PASS8 deployment source pins differ')
    require(len(browser.get('screenshots', [])) == 6, 'Expected six production captures')
    require(subprocess.check_output(['git', 'rev-parse', PARENT + '^{tree}'], cwd=S, text=True).strip() == TREE, 'Verified native parent tree unavailable/different')
    output.mkdir()
    rows = []; reports = []

    def add(raw, relative, origin, report_name=None, actual_field='status'):
        target = PREFIX + relative
        payload = output / 'payload' / target
        write_new(payload, raw)
        row = {'sourcePath': str(payload), 'targetPath': target, 'bytes': len(raw), 'sha256': digest(raw), 'origin': origin, 'storagePolicy': 'independent-byte-copy'}
        rows.append(row)
        if report_name:
            value = json.loads(raw).get(actual_field)
            require(value in (True, 'passed', 'published', 'completed', 'approved-with-fidelity-qualifications'), 'Unpassed report copied')
            reports.append({'name': report_name, 'path': str(payload), 'bytes': len(raw), 'sha256': digest(raw), 'status': 'passed', 'actualStatusField': actual_field, 'actualReportStatus': value})
        return row

    github = W / 'github-pass8-publication-lossless-chunks'
    native_result = json.loads(read_closed(github / 'publication-results.json'))
    require(native_result.get('status') == 'published' and native_result.get('commit') == PARENT and native_result.get('sourceTreeByteExact') == TREE and native_result.get('deletedPaths') == [] and native_result.get('force') is False, 'Native publication receipt differs')
    for name in ['publication-results.json', 'publication-plan.json', 'local-import-results.json', 'remote-tree-verification.json', 'created-commit.json', 'commit-request.json', 'remote-commit.raw', 'uploaded-blobs.jsonl']:
        report_name = {'publication-results.json': 'native-GitHub-publication', 'local-import-results.json': 'native-local-import', 'remote-tree-verification.json': 'native-remote-tree-verification'}.get(name)
        add(read_closed(github / name), 'github-native/' + name, {'closedOriginalPath': str(github / name)}, report_name)
    add(read_closed(W / 'cqc-pass8-lossless-snapshot-verification.json'), 'lossless-snapshots/verification.json', {'closedOriginalPath': str(W / 'cqc-pass8-lossless-snapshot-verification.json')}, 'lossless-three-snapshot-restore-verification')
    for name in ['LARGE_SNAPSHOT_CHUNKS.json', 'restore_large_snapshots.py', 'LOSSLESS_SNAPSHOT_VERIFICATION.json']:
        path = 'docs/cqc-reprise/pass8/' + name
        raw = subprocess.check_output(['git', 'show', PARENT + ':' + path], cwd=S)
        add(raw, 'lossless-snapshots/' + name, {'immutableGitCommit': PARENT, 'gitPath': path})
    freeze_path = W / 'cqc-pass8-source-freeze-39-rev3.json'
    freeze_raw = read_closed(freeze_path)
    require(digest(freeze_raw) == FREEZE, 'Historical PASS8 source freeze differs')
    add(freeze_raw, 'source-freeze/pass8-39-rev3.json', {'closedOriginalPath': str(freeze_path), 'futurePass9SourceIgnored': True})
    state_path = W / 'vercel-pass8-publication/production-state-02.json'
    state_raw = read_closed(state_path); state = json.loads(state_raw); response = state.get('response', {})
    require(state.get('exitCode') == 0 and response.get('id') == DEPLOYMENT and response.get('readyState') == 'READY' and response.get('readySubstate') == 'PROMOTED' and response.get('target') == 'production' and response.get('gitSource', {}).get('sha') == PARENT, 'Production Vercel deployment differs')
    add(state_raw, 'vercel/production-state-02.json', {'closedOriginalPath': str(state_path)})
    add(encode({'schema': 'cqc.pass8.qualified-vercel-ready-summary/1', 'status': 'passed', 'productionDeploymentId': DEPLOYMENT, 'nativeCommit': PARENT, 'readyState': 'READY', 'readySubstate': 'PROMOTED', 'productionStateRawSHA256': digest(state_raw), 'sourceFreezeSHA256': FREEZE, 'runtimeManifestSHA256': MANIFEST, 'canonicalCatalogSHA256': CATALOG, 'runtimeCatalogSHA256': CATALOG_JS, 'qualification': 'Observed production deployment and byte/browser evidence for immutable PASS8 commit. Future PASS9 files are outside this proof.'}), 'vercel/READY_SUMMARY.json', {'derivedFromClosedAPI': str(state_path)}, 'Vercel-production-READY-PROMOTED')
    add(http_raw, 'vercel/deployed-production-http.json', {'closedOriginalPath': str(http_path)}, 'production-HTTP989-byte-verification', 'passed')
    add(browser_raw, 'vercel/browser/verification.json', {'closedOriginalPath': str(browser_path)}, 'production-four-context-browser')
    for shot in browser['screenshots']:
        name = shot['file']; require(Path(name).name == name and name.endswith('.png'), 'Unsafe screenshot filename')
        p = browser_path.parent / name; raw = read_closed(p)
        require(len(raw) == shot['bytes'] and digest(raw) == shot['sha256'] and raw.startswith(b'\x89PNG\r\n\x1a\n'), 'Closed production screenshot differs')
        add(raw, 'vercel/browser/' + name, {'closedOriginalPath': str(p), 'physicallyViewedByRoot': True})
    visual_path = W / 'vercel-pass8-publication/ROOT_ACTUAL_PRODUCTION_VISUAL_REVIEW_13bbe0f8.json'
    visual = read_closed(visual_path)
    require(digest(visual) == '740259037633c51b5084a778c5d12e92a71e2ca88a577eae237aec67a56bed62', 'Actual visual review differs')
    add(visual, 'vercel/ROOT_ACTUAL_PRODUCTION_VISUAL_REVIEW.json', {'closedOriginalPath': str(visual_path)}, 'root-actual-six-production-screenshot-review')
    index_path = W / 'vercel-pass8-publication/PRODUCTION_VERIFICATION_CLOSED.json'
    index_raw = read_closed(index_path)
    require(digest(index_raw) == '46eff0e0dc4d95483101d8369e8cf327a125a77dd18f684600dc5cfbf0c2d347', 'Closed production index differs')
    add(index_raw, 'vercel/PRODUCTION_VERIFICATION_CLOSED.json', {'closedOriginalPath': str(index_path)})
    for name in ['publish_verified_shadow_cqc_pass8_chunks.original.py', 'import_verified_shadow_cqc_pass8_chunks_commit.original.py', 'publish_verified_shadow_cqc_pass8_publication_proofs.py', 'import_verified_shadow_cqc_pass8_publication_proofs_commit.py', 'prepare_minimal_publication_proof_bundle.py', 'test_publication_proof_guards.py', 'FIXTURE_TEST_RESULTS.json', 'TOOL_ORIGINS.json']:
        add(read_closed(T / name), 'tools/' + name, {'sourcePathAtFreeze': str(T / name)})
    readme = f"# PASS8 production publication evidence\n\nThis small follow-up preserves closed GitHub/local-import/lossless-snapshot receipts and actual Vercel production evidence for `{PARENT}`. Production HTTP checked all 989 manifest paths; the real browser passed 406 checks across desktop/mobile and direct/Shadow mounts. Six unchanged screenshots were physically reviewed by root.\n\nHistorical source pins are catalog `{CATALOG}`, runtime catalog `{CATALOG_JS}`, manifest `{MANIFEST}`. Original generation/source/chunk payloads remain in the native parent commit; no large catalog is duplicated here. Future PASS9 source files are outside this proof.\n\nArtwork and combat retain closest_supported and Versus adaptation qualifications; absolute original-game 1:1 is not certified. Failed older attempts remain preserved at their original locations and are not reclassified.\n"
    readme += '\nRaven explosions are actual bounded gameplay events rendered by the existing geometric Canvas effects; native MGS4 particles are not certified. The mobile combat field keeps its 16:9 shape with unused vertical space. Original PNG bytes are unchanged.\n'
    add(readme.encode(), 'README.md', {'generatedBy': str(T / 'prepare_minimal_publication_proof_bundle.py')})
    add(encode({'schema': 'cqc.pass8.publication-proof-source-inventory/1', 'files': rows, 'manifestSelfExcluded': True, 'noLargeCatalogOrChunkPayloadDuplicated': True, 'noHistoricalProofReclassified': True, 'futurePass9SourceIgnored': True}), 'PUBLICATION_PROOF_MANIFEST.json', {'generatedBy': str(T / 'prepare_minimal_publication_proof_bundle.py')})
    plan = {'schema': 'cqc.pass8.minimal-publication-proof-bundle-plan/1', 'status': 'prepared', 'expectedParent': PARENT, 'verifiedNativeTree': TREE, 'sourceFreezeSHA256': FREEZE, 'productionDeploymentId': DEPLOYMENT, 'files': rows, 'totalBytes': sum(r['bytes'] for r in rows), 'fileCount': len(rows), 'historicalPathDeletions': 0, 'RorSWrites': 0, 'remoteRequests': 0, 'currentMutableRuntimeSourcesRead': 0, 'futurePass9SourceIgnored': True}
    plan_path = output / 'PROOF_BUNDLE_PLAN.json'; write_new(plan_path, encode(plan))
    facts = {'schema': 'cqc.github.pass8-publication-proof-facts/1', 'confirmedByRoot': False, 'status': 'pending', 'sourceState': 'prepared', 'expectedParent': PARENT, 'verifiedNativeCommit': PARENT, 'verifiedNativeTree': TREE, 'sourceFreezeSHA256': FREEZE, 'productionDeploymentId': DEPLOYMENT, 'bundlePlan': {'path': str(plan_path), 'sha256': digest(plan_path.read_bytes())}, 'expectedNewPaths': sorted(r['targetPath'] for r in rows), 'localCommit': None, 'localTree': None, 'reports': reports, 'onlyNewPublicationProofPathsAllowed': True, 'historicalPathDeletions': 0, 'futurePass9SourceIgnored': True, 'rootConfirmationAndCandidateCommitRequired': True}
    facts_path = output / 'DRAFT_PUBLICATION_QA_FACTS.json'; write_new(facts_path, encode(facts))
    print(json.dumps({'plan': str(plan_path), 'planSHA256': digest(plan_path.read_bytes()), 'factsDraft': str(facts_path), 'factsDraftSHA256': digest(facts_path.read_bytes()), 'files': len(rows), 'totalBytes': plan['totalBytes'], 'sourceWrites': 0, 'remoteRequests': 0}, indent=2))

def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('--output', type=Path, required=True)
    p.add_argument('--http-report', type=Path, required=True)
    p.add_argument('--browser-report', type=Path, required=True)
    a = p.parse_args(); build(a.output, a.http_report, a.browser_report)

if __name__ == '__main__': main()
