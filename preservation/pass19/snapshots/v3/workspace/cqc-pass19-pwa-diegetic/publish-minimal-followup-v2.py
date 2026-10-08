"""Publish a byte-identical build snapshot; preserve the full release branch."""
if not __debug__:
    raise SystemExit('Publication guards require normal Python.')
from pathlib import Path
import argparse, datetime, hashlib, importlib.util, json

APP = Path('/tmp/cqc-pass19-application')
OUT = Path('/workspace/cqc-pass19-pwa-diegetic/vercel')
MAIN = '9a37e0ca975021df2eb6db7fd28fe4dcd9a2550c'
BRANCH = 'reprise/2026-10-02'
ALLOWED = {'.gitignore', '.vercelignore', 'app-icon.png', 'index.html', 'package-lock.json',
           'package.json', 'pnpm-lock.yaml', 'pnpm-workspace.yaml', 'public', 'src',
           'tsconfig.json', 'tsconfig.node.json', 'vercel.json', 'vite.config.ts', 'vitest.config.ts'}
spec = importlib.util.spec_from_file_location('transport', '/workspace/cqc-pass9-publication-preparation/publish_verified_shadow_cqc_pass9.py')
t = importlib.util.module_from_spec(spec)
spec.loader.exec_module(t)
t.SOURCE = APP

def main():
    a = argparse.ArgumentParser(description=__doc__)
    a.add_argument('--release', required=True)
    a.add_argument('--manifest', required=True)
    a.add_argument('--tag', required=True)
    a.add_argument('--execute', action='store_true')
    args = a.parse_args()
    assert t.SHA1.fullmatch(args.release) and t.SHA256.fullmatch(args.manifest)
    assert args.tag.startswith('cqc-runtime-pass19-minimal-build-20261008-')
    assert t.git_text('rev-parse', 'HEAD') == args.release
    assert not t.git('status', '--porcelain=v1').strip()
    assert hashlib.sha256((APP / 'public/cqc/runtime-manifest.json').read_bytes()).hexdigest() == args.manifest
    rows = []
    for line in t.git('ls-tree', '-z', args.release).split(b'\0'):
        if not line:
            continue
        meta, name = line.split(b'\t', 1)
        mode, kind, sha = meta.decode().split()
        name = name.decode()
        if name in ALLOWED:
            rows.append({'path': name, 'mode': mode, 'type': kind, 'sha': sha})
    assert len(rows) == 15 and {r['path'] for r in rows} == ALLOWED
    assert {r['path'] for r in rows if r['type'] == 'tree'} == {'public', 'src'}
    original = t.local_files(args.release)
    selected = {p: r for p, r in original.items() if p.split('/', 1)[0] in ALLOWED}
    total = 0
    for name, row in selected.items():
        p = APP / name
        assert p.is_file() and not p.is_symlink() and row['mode'] == '100644'
        size = p.stat().st_size
        h = hashlib.sha1(b'blob ' + str(size).encode() + b'\0')
        with p.open('rb') as handle:
            for block in iter(lambda: handle.read(1024 * 1024), b''):
                h.update(block)
        assert h.hexdigest() == row['sha'], name
        total += size
    raw_tree = b''.join((r['mode'].lstrip('0') + ' ' + r['path']).encode() + b'\0' + bytes.fromhex(r['sha'])
                        for r in sorted(rows, key=lambda r: (r['path'] + ('/' if r['type'] == 'tree' else '')).encode()))
    tree = t.object_sha('tree', raw_tree)
    plan = {'schema': 'cqc.pass19.minimal-build-snapshot/1', 'status': 'verified',
            'releaseCommit': args.release, 'releaseTree': t.git_text('rev-parse', 'HEAD^{tree}'),
            'runtimeManifestSHA256': args.manifest, 'tag': args.tag, 'tree': tree,
            'selectedRootEntries': rows, 'files': len(selected), 'bytes': total,
            'sourceBytesChanged': False, 'allSelectedBytesVerifiedAgainstReleaseGitObjects': True,
            'parentCount': 0, 'fullHistoryPreservedOnReleaseBranch': True}
    OUT.mkdir(exist_ok=True)
    t.save_exact(OUT / 'MINIMAL_BUILD_PLAN_ACTUAL_V1.json', plan)
    print(json.dumps({'stage': 'verified-minimal-build', 'files': len(selected), 'bytes': total, 'tree': tree}), flush=True)
    if not args.execute:
        return
    assert t.api('GET', 'git/ref/heads/' + BRANCH)['object']['sha'] == args.release
    assert t.api('GET', 'git/ref/heads/main')['object']['sha'] == MAIN
    remote = t.api('GET', 'git/trees/' + plan['releaseTree'])
    remote_rows = {r['path']: r for r in remote['tree']}
    for r in rows:
        assert all(remote_rows[r['path']][k] == r[k] for k in ('mode', 'type', 'sha'))
    assert t.api('POST', 'git/trees', {'tree': rows})['sha'] == tree
    req = OUT / 'MINIMAL_COMMIT_REQUEST_V1.json'
    if req.exists():
        payload = json.loads(req.read_bytes())
    else:
        source = t.api('GET', 'git/commits/' + args.release)
        date = datetime.datetime.now(datetime.timezone.utc).replace(microsecond=0).isoformat().replace('+00:00', 'Z')
        ident = {k: source['author'][k] for k in ('name', 'email')}
        ident['date'] = date
        payload = {'tree': tree, 'parents': [], 'author': ident, 'committer': ident,
                   'message': 'Build-only deployment snapshot of CQC release ' + args.release + '\n\nRetain identical public assets, application source and build configuration. Complete release history, raw sources and all preservation archives remain on reprise/2026-10-02. Runtime manifest SHA256 ' + args.manifest + '.'}
        t.save_exact(req, payload)
    assert payload['tree'] == tree and payload['parents'] == [] and payload['author'] == payload['committer']
    ident = payload['author']
    epoch = int(datetime.datetime.fromisoformat(ident['date'].replace('Z', '+00:00')).timestamp())
    identity = ident['name'] + ' <' + ident['email'] + '> ' + str(epoch) + ' +0000'
    commit_raw = ('tree ' + tree + '\nauthor ' + identity + '\ncommitter ' + identity + '\n\n' + payload['message']).encode()
    expected = t.object_sha('commit', commit_raw)
    response = t.api('POST', 'git/commits', payload)
    assert response['sha'] == expected and response['tree']['sha'] == tree and response['parents'] == []
    assert response['message'] == payload['message']
    t.save_exact(OUT / 'MINIMAL_COMMIT_RESPONSE_ACTUAL_V1.json', response)
    ref = 'refs/tags/' + args.tag
    matches = t.api('GET', 'git/matching-refs/tags/' + args.tag)
    if not matches:
        t.api('POST', 'git/refs', {'ref': ref, 'sha': expected})
    else:
        assert len(matches) == 1 and matches[0]['ref'] == ref and matches[0]['object']['sha'] == expected
    observed = t.api('GET', 'git/ref/tags/' + args.tag)
    assert observed['ref'] == ref and observed['object']['sha'] == expected
    assert t.api('GET', 'git/ref/heads/' + BRANCH)['object']['sha'] == args.release
    assert t.api('GET', 'git/ref/heads/main')['object']['sha'] == MAIN
    result = {**plan, 'schema': 'cqc.pass19.minimal-build-tag-publication/1', 'status': 'published',
              'commit': expected, 'ref': ref, 'mainUnchanged': MAIN, 'releaseBranchUnchanged': True}
    t.save_exact(OUT / 'MINIMAL_BUILD_PUBLICATION_RESULT_ACTUAL_V1.json', result)
    print(json.dumps({'stage': 'published-minimal-build', 'commit': expected, 'tag': args.tag, 'release': args.release}), flush=True)

if __name__ == '__main__':
    main()
