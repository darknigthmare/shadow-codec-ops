"""Publish the frozen, complete PASS19 commit. Default mode validates locally only."""
if not __debug__:
    raise SystemExit('Publication guards require normal Python execution; -O and PYTHONOPTIMIZE are forbidden.')
from pathlib import Path, PurePosixPath
import argparse, base64, concurrent.futures, hashlib, importlib.util, json, threading, time

ROOT = Path('/tmp/cqc-pass19-application')
PROOFS = Path('/tmp/cqc-pass19-github-publication')
PARENT = '5642ae495aa68eaf940e10724de8f3986f808cd0'
MAIN = '9a37e0ca975021df2eb6db7fd28fe4dcd9a2550c'
BRANCH = 'reprise/2026-10-02'
spec = importlib.util.spec_from_file_location('trusted_transport', '/workspace/cqc-pass9-publication-preparation/publish_verified_shadow_cqc_pass9.py')
t = importlib.util.module_from_spec(spec)
spec.loader.exec_module(t)
t.SOURCE, t.PARENT = ROOT, PARENT

# Receipts are installed only after a complete durable write. Existing mismatches remain preserved.
def atomic_raw_exact(path, raw):
    import os, uuid
    if path.exists():
        assert path.is_file() and not path.is_symlink() and path.read_bytes() == raw
        return
    temporary = path.with_name(path.name + '.pending-' + uuid.uuid4().hex)
    with temporary.open('xb') as handle:
        handle.write(raw)
        handle.flush()
        os.fsync(handle.fileno())
    assert not path.exists()
    os.replace(temporary, path)

def atomic_json_exact(path, value):
    if path.exists():
        assert path.is_file() and not path.is_symlink() and json.loads(path.read_bytes()) == value
        return
    atomic_raw_exact(path, (json.dumps(value, ensure_ascii=False, indent=2) + '\n').encode())

def atomic_append_ledger(path, value):
    import os, uuid
    previous = path.read_bytes() if path.exists() else b''
    assert not path.is_symlink()
    if previous:
        assert previous.endswith(b'\n'), 'An incomplete previous ledger must remain preserved and be reviewed.'
        for line in previous.splitlines():
            json.loads(line)
    raw = previous + (json.dumps(value, ensure_ascii=False) + '\n').encode()
    temporary = path.with_name(path.name + '.pending-' + uuid.uuid4().hex)
    with temporary.open('xb') as handle:
        handle.write(raw)
        handle.flush()
        os.fsync(handle.fileno())
    assert (path.read_bytes() if path.exists() else b'') == previous
    os.replace(temporary, path)

t.save_exact, t.save_raw_exact, t.append_ledger = atomic_json_exact, atomic_raw_exact, atomic_append_ledger

def pinned_json(pin):
    path = Path(pin['path'])
    assert path.is_absolute() and path.is_file() and not path.is_symlink()
    raw = path.read_bytes()
    assert hashlib.sha256(raw).hexdigest() == pin['sha256']
    return json.loads(raw)

def validate_frozen(commit, facts_path, facts_sha):
    assert t.git_text('branch', '--show-current') == BRANCH
    assert t.git_text('rev-parse', 'HEAD') == commit
    raw = facts_path.read_bytes()
    assert hashlib.sha256(raw).hexdigest() == facts_sha
    facts = json.loads(raw)
    assert facts['schema'] == 'cqc.pass19.aggregate-release-qa/1'
    assert facts['status'] == 'passed' and facts['confirmedByRoot'] is True
    assert facts['sourceState'] == 'frozen' and facts['expectedParent'] == PARENT
    assert facts['localCommit'] == commit
    tree = t.git_text('rev-parse', 'HEAD^{tree}')
    assert facts['localTree'] == tree
    assert t.git_text('rev-parse', 'HEAD^') == PARENT
    assert not t.git('status', '--porcelain=v1').strip()
    coverage = pinned_json(facts['coverageProof'])
    assert coverage['roster'] == facts['counts']['identities']
    assert coverage['nativeSprites'] + coverage['nativeMachineUIDs'] == coverage['roster']
    assert coverage['missingActualUIDs'] == 0 and coverage['complete'] is True
    assert facts['absolute1to1Certified'] is False
    assert len(facts['reports']) >= 4
    report_paths, report_digests, evidence_kinds = set(), set(), set()
    for report in facts['reports']:
        actual = pinned_json(report)
        assert actual['status'] == 'passed'
        assert report['evidenceKind'] in ['actual-browser', 'actual-build', 'actual-source-integrity']
        assert not any(word in actual.get('schema','') for word in ['draft', 'fixture', 'mock', 'preparation'])
        assert report['path'] not in report_paths and report['sha256'] not in report_digests
        report_paths.add(report['path']); report_digests.add(report['sha256']); evidence_kinds.add(report['evidenceKind'])
    assert evidence_kinds == {'actual-browser', 'actual-build', 'actual-source-integrity'}
    manifest_path = ROOT / 'public/cqc/runtime-manifest.json'
    manifest_raw = manifest_path.read_bytes()
    assert hashlib.sha256(manifest_raw).hexdigest() == facts['runtimeManifestSHA256']
    manifest = json.loads(manifest_raw)
    assert len(manifest['files']) >= 1257
    candidate = t.local_files(commit)
    manifest_names = set()
    total_bytes = 0
    for row in manifest['files']:
        relative = PurePosixPath(row['path'])
        assert not relative.is_absolute() and str(relative) == row['path']
        assert '\\' not in row['path'] and all(part not in ['', '.', '..'] for part in relative.parts)
        assert row['path'] not in manifest_names
        manifest_names.add(row['path'])
        p = ROOT / 'public/cqc' / row['path']
        assert p.is_file() and not p.is_symlink()
        b = p.read_bytes()
        assert len(b) == row['bytes'] and hashlib.sha256(b).hexdigest() == row['sha256']
        name = 'public/cqc/' + row['path']
        assert candidate[name]['type'] == 'blob' and candidate[name]['mode'] == '100644'
        assert t.object_sha('blob', b) == candidate[name]['sha']
        total_bytes += len(b)
    assert manifest['totalBytes'] == total_bytes
    assert manifest_names | {'runtime-manifest.json'} <= {name.removeprefix('public/cqc/') for name in candidate if name.startswith('public/cqc/')}
    assert t.object_sha('blob', manifest_raw) == candidate['public/cqc/runtime-manifest.json']['sha']
    return facts, tree

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--local-commit', required=True)
    parser.add_argument('--qa-facts', type=Path, required=True)
    parser.add_argument('--execute', action='store_true')
    args = parser.parse_args()
    assert t.SHA1.fullmatch(args.local_commit)
    PROOFS.mkdir(exist_ok=True)
    facts_raw = args.qa_facts.read_bytes()
    facts_sha = hashlib.sha256(facts_raw).hexdigest()
    facts, tree = validate_frozen(args.local_commit, args.qa_facts, facts_sha)
    base, candidate = t.local_files(PARENT), t.local_files(args.local_commit)
    assert set(base) <= set(candidate), 'Historical path deletion is forbidden.'
    changes = [candidate[name] for name in sorted(candidate) if candidate[name] != base.get(name)]
    assert changes and all(row['path'].startswith(('public/cqc/', 'docs/cqc-reprise/pass19/')) or row['path'] in {'src/app/AppLayout.tsx','src/components/cqc/CqcLauncher.tsx','scripts/sync-cqc-runtime.mjs','vite.config.ts'} for row in changes)
    assert all(row['path'] not in base for row in changes if row['path'].startswith('docs/'))
    old_blobs = {row['sha'] for row in base.values()}
    missing = {row['sha']: row['path'] for row in changes if row['sha'] not in old_blobs}
    payload, _ = t.commit_request(args.local_commit, tree)
    plan = {'schema': 'cqc.pass19.frozen-github-publication/1', 'parent': PARENT,
            'localCommit': args.local_commit, 'localTree': tree, 'changes': changes,
            'missingUniqueBlobs': len(missing), 'qaFactsSHA256': facts_sha,
            'deletedPaths': [], 'branch': BRANCH, 'mainUnchanged': MAIN}
    # Every changed source, including preservation documentation, must still match the staged Git object.
    for row in changes:
        source = ROOT / row['path']
        assert source.is_file() and not source.is_symlink()
        size = source.stat().st_size
        assert size < 100 * 1024 * 1024
        digest = hashlib.sha1(b'blob ' + str(size).encode() + b'\0')
        with source.open('rb') as handle:
            for chunk in iter(lambda: handle.read(1024 * 1024), b''):
                digest.update(chunk)
        assert digest.hexdigest() == row['sha'], 'Changed source no longer matches staged object: ' + row['path']
    t.save_exact(PROOFS / 'PUBLICATION_PLAN_V1.json', plan)
    t.save_raw_exact(PROOFS / 'FROZEN_QA_FACTS_V1.json', facts_raw)
    t.save_exact(PROOFS / 'COMMIT_REQUEST_V1.json', payload)
    print(json.dumps({'stage': 'verified-complete-publication-preflight', 'changedPaths': len(changes),
                      'uniqueBlobs': len(missing), 'execute': args.execute}), flush=True)
    if not args.execute:
        return
    assert t.api('GET', 'git/ref/heads/main')['object']['sha'] == MAIN
    created_path = PROOFS / 'CREATED_COMMIT_V1.json'
    created = json.loads(created_path.read_text()) if created_path.exists() else None
    remote_commit = created['commit'] if created else None
    if created:
        assert created['tree'] == tree and created['parent'] == PARENT
        assert remote_commit == args.local_commit
        t.verify_remote_commit(t.api('GET', 'git/commits/' + remote_commit), remote_commit, tree, payload)
    current = t.api('GET', 'git/ref/heads/' + BRANCH)['object']['sha']
    assert current == PARENT or (remote_commit and current == remote_commit)
    remote_base = t.api('GET', 'git/trees/' + t.git_text('rev-parse', PARENT + '^{tree}') + '?recursive=1')
    assert not remote_base.get('truncated')
    observed_base = {row['path']: {k: row[k] for k in ('path', 'mode', 'type', 'sha')}
                     for row in remote_base['tree'] if row['type'] != 'tree'}
    assert observed_base == base
    uploaded = {}
    for ledger in [PROOFS / 'VERIFIED_PUBLICATION_BLOBS_V1.jsonl']:
        if not ledger.exists():
            continue
        for line in ledger.read_text().splitlines():
            row = json.loads(line)
            oid = row['gitBlobSHA1']
            assert row['responseSHA1'] == oid
            if oid not in missing:
                continue
            raw = (ROOT / missing[oid]).read_bytes()
            assert t.object_sha('blob', raw) == oid and len(raw) == row['bytes']
            assert hashlib.sha256(raw).hexdigest() == row['sha256']
            uploaded[oid] = row
    lock = threading.Lock()
    def upload(item):
        oid, name = item
        if oid in uploaded:
            return
        raw = (ROOT / name).read_bytes()
        assert t.object_sha('blob', raw) == oid and len(raw) < 100 * 1024 * 1024
        response = t.api('POST', 'git/blobs', {'content': base64.b64encode(raw).decode(), 'encoding': 'base64'})
        assert response['sha'] == oid
        verified = t.api('GET', 'git/blobs/' + oid)
        assert base64.b64decode(verified['content']) == raw
        row = {'gitBlobSHA1': oid, 'responseSHA1': response['sha'], 'path': name,
               'bytes': len(raw), 'sha256': hashlib.sha256(raw).hexdigest(), 'uploadedAtEpoch': time.time(), 'remoteBytesVerified': True}
        with lock:
            t.append_ledger(PROOFS / 'VERIFIED_PUBLICATION_BLOBS_V1.jsonl', row)
            uploaded[oid] = row
            if len(uploaded) % 30 == 0:
                print(json.dumps({'stage': 'verified-publication-blobs', 'completed': len(uploaded), 'total': len(missing)}), flush=True)
    if current == PARENT:
        with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
            list(pool.map(upload, missing.items()))
        assert len(uploaded) == len(missing)
        validate_frozen(args.local_commit, args.qa_facts, facts_sha)
        assembled = t.git_text('rev-parse', PARENT + '^{tree}')
        for offset in range(0, len(changes), 70):
            result = t.api('POST', 'git/trees', {'base_tree': assembled, 'tree': changes[offset:offset + 70]})
            assembled = result['sha']
            print(json.dumps({'stage': 'assembled-publication-tree', 'done': min(offset + 70, len(changes)), 'total': len(changes)}), flush=True)
        assert assembled == tree
        validate_frozen(args.local_commit, args.qa_facts, facts_sha)
        result = t.api('POST', 'git/commits', payload)
        exact = t.reconstruct_remote_commit(result, tree, payload)
        remote_commit = result['sha']
        assert remote_commit == args.local_commit, 'Remote commit differs from the verified local commit.'
        t.save_raw_exact(PROOFS / 'REMOTE_COMMIT_EXACT_V1.raw', exact)
        t.save_exact(created_path, {'commit': remote_commit, 'tree': tree, 'parent': PARENT,
                                   'exactCommitSHA256': hashlib.sha256(exact).hexdigest()})
        assert t.api('GET', 'git/ref/heads/' + BRANCH)['object']['sha'] == PARENT
        validate_frozen(args.local_commit, args.qa_facts, facts_sha)
        t.api('PATCH', 'git/refs/heads/' + BRANCH, {'sha': remote_commit, 'force': False})
    assert set(uploaded) == set(missing), 'Every changed unique blob requires its exact successful transport receipt.'
    assert t.api('GET', 'git/ref/heads/' + BRANCH)['object']['sha'] == remote_commit
    t.verify_remote_commit(t.api('GET', 'git/commits/' + remote_commit), remote_commit, tree, payload)
    assert t.api('GET', 'git/ref/heads/main')['object']['sha'] == MAIN
    result = {'schema': 'cqc.pass19.complete-github-publication-result/1', 'status': 'published',
              'commit': remote_commit, 'tree': tree, 'parent': PARENT,
              'commitURL': 'https://github.com/darknigthmare/shadow-codec-ops/commit/' + remote_commit,
              'branch': BRANCH, 'deletedPaths': [], 'force': False, 'mainUnchanged': MAIN,
              'verifiedUniqueBlobs': len(uploaded), 'changedPaths': len(changes),
              'games': {'standalone': '/cqc/index.html', 'integrated': '/?module=cqc'},
              'qaFactsSHA256': facts_sha, 'absolute1to1Certified': False}
    t.save_exact(PROOFS / 'PUBLICATION_RESULT_V1.json', result)
    print(json.dumps(result), flush=True)

if __name__ == '__main__':
    main()
