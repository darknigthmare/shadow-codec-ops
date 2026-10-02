#!/usr/bin/env python3
"""Pin a small lossless proof archive after ROOT closes final local browser QA.

No application copy, Git write, commit or API request. Bulky verification JSON
uses deterministic gzip computed in memory; raw sources remain untouched.
"""
from pathlib import Path
import argparse
import gzip
import hashlib
import json
import os
import stat
import subprocess

T = Path('/workspace/cqc-pass9-offline-prefetch-publication')
W = Path('/workspace')
B = W / 'cqc-pass9-browser-preparation'
FIX = W / 'cqc-pass9-offline-prefetch-fix'
PARENT = '7d4719d432cfe82087833f49df02b27fa2f3155f'
APP_SHA = 'eb5cca5cf44634733c85d451eca474e2b5450b06eb132ccaaef45d710869b911'
PREFIX = 'docs/cqc-reprise/pass9/offline-prefetch-and-touch/'


def digest(raw):
    return hashlib.sha256(raw).hexdigest()


def git_blob(raw):
    return hashlib.sha1(b'blob ' + str(len(raw)).encode() + b'\0' + raw).hexdigest()


def regular(path):
    path = Path(path)
    assert path.is_absolute() and path.is_file() and not path.is_symlink() and path.resolve() == path
    return path


def pin(path):
    path = regular(path)
    raw = path.read_bytes()
    return {'path': str(path), 'bytes': len(raw), 'sha256': digest(raw)}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--after-root-local-qa-go', action='store_true')
    parser.add_argument('--local-proof', type=Path)
    parser.add_argument('--local-proof-sha256')
    parser.add_argument('--root-local-physical-review', type=Path)
    parser.add_argument('--root-local-physical-sha256')
    parser.add_argument('--additional-closed', type=Path, action='append', default=[])
    parser.add_argument('--retained-local-dir', type=Path, action='append', default=[])
    parser.add_argument('--output', type=Path, default=T / 'CLOSED_ARCHIVE_PLAN.json')
    args = parser.parse_args()
    if not args.after_root_local_qa_go:
        print(json.dumps({'status': 'plan-only-awaiting-root-final-local-QA',
                          'expectedParent': PARENT, 'sourceSHA256': APP_SHA,
                          'applicationCopies': 0, 'GitMutations': 0, 'apiCalls': 0}))
        return
    assert args.local_proof and args.root_local_physical_review
    env = dict(os.environ, GIT_OPTIONAL_LOCKS='0', GIT_NO_LAZY_FETCH='1')
    def git_text(*args):
        return subprocess.check_output(['git', *args], cwd='/workspace/shadow-codec-recovered', env=env).decode().strip()
    assert git_text('rev-parse', 'HEAD') == PARENT and git_text('branch', '--show-current') == 'reprise/2026-10-02'
    assert git_text('rev-parse', 'HEAD:public/cqc') == '14271e4f8141429b8035575116883fca50925057'
    assert git_text('rev-parse', 'refs/heads/main') == '9a37e0ca975021df2eb6db7fd28fe4dcd9a2550c'
    historical_heads = dict(line.split(' ', 1) for line in git_text('for-each-ref', '--format=%(refname) %(objectname)', 'refs/heads/').splitlines())
    assert pin(args.local_proof)['sha256'] == args.local_proof_sha256
    assert pin(args.root_local_physical_review)['sha256'] == args.root_local_physical_sha256
    local = json.loads(args.local_proof.read_text())
    assert local.get('status') == 'passed', 'Only actual closed final-source local proof may certify QA'
    physical = json.loads(args.root_local_physical_review.read_text())
    assert physical.get('physicallyViewedAllFourByRoot') is True or physical.get('confirmedByRoot') is True \
        or physical.get('status') in ('passed', 'accepted', 'approved-with-qualifications'), 'ROOT local physical approval required'
    applied = json.loads((FIX / 'APPLIED_OFFLINE_GUARD_SOURCE_RECEIPT.json').read_text())
    assert applied['changedFiles'][0]['sha256'] == APP_SHA and applied['lint']['exitCode'] == 0
    assert pin('/workspace/shadow-codec-recovered/src/app/App.tsx')['sha256'] == APP_SHA
    production = json.loads((B / 'FINAL_PRODUCTION_MOBILE_CONTROLS_CLOSED.json').read_text())
    assert production['production']['commit40'] == PARENT and production['UI']['pageErrors'] \
        and production['nativeTouch']['pageErrors'] == []
    rows = []
    targets = set()

    def add(path, relative, gzip_json=False):
        source = regular(path)
        before = source.stat()
        raw = source.read_bytes()
        assert source.stat().st_size == len(raw) and source.stat().st_mtime_ns == before.st_mtime_ns
        packed = gzip.compress(raw, compresslevel=9, mtime=0) if gzip_json else raw
        # gzip.compress's OS byte varies by Python; normalize only the newly
        # authored transport header, never any original source/report/image.
        if gzip_json:
            packed = packed[:9] + b'\xff' + packed[10:]
            assert gzip.decompress(packed) == raw
        target = PREFIX + relative + ('.gz' if gzip_json else '')
        assert target not in targets and '..' not in Path(target).parts
        targets.add(target)
        rows.append({'source': str(source), 'sourceBytes': len(raw), 'sourceSHA256': digest(raw),
                     'targetPath': target, 'bytes': len(packed), 'sha256': digest(packed),
                     'gitBlobSHA1': git_blob(packed), 'mode': '100644',
                     'storagePolicy': 'deterministic-gzip-9-mtime0-os255' if gzip_json else 'independent-byte-copy',
                     'sourceSeal': {'dev': before.st_dev, 'ino': before.st_ino,
                                    'mtimeNs': before.st_mtime_ns, 'mode': stat.S_IMODE(before.st_mode)},
                     'sourceByteEdits': False})

    add(B / 'FINAL_PRODUCTION_MOBILE_CONTROLS_CLOSED.json', 'production7d/FINAL_PRODUCTION_MOBILE_CONTROLS_CLOSED.json')
    for dirname in ('mobile-toast-production-7d4719d4-01', 'mobile-native-touch-production-7d4719d4-01',
                    'mobile-native-touch-production-7d4719d4-02'):
        for path in sorted((B / dirname).iterdir()):
            if path.is_file():
                add(path, 'production7d/' + dirname + '/' + path.name,
                    gzip_json=path.name == 'verification.json' and path.stat().st_size > 100000)
    for name in ('verify-mobile-toast-fix-v4.py', 'verify-mobile-native-touch.py', 'verify-mobile-native-touch-v2.py'):
        add(B / name, 'tools/' + name)
    for key in ('rootREADY', 'actualDeploymentAPIProof'):
        path = Path(production['production'][key]['path'])
        assert pin(path) == production['production'][key]
        add(path, 'production7d/' + path.name)
    for path in sorted(FIX.rglob('*')):
        if path.is_file():
            add(path, 'source-attempts/' + path.relative_to(FIX).as_posix())
    add('/workspace/shadow-codec-recovered/src/app/App.tsx', 'source-final/src/app/App.tsx')
    add(T / 'ROOT_STATIC_QA_FACTS.json', 'source-final/ROOT_STATIC_QA_FACTS.json')
    for path in sorted(args.local_proof.parent.iterdir()):
        if path.is_file():
            add(path, 'final-local/' + path.name,
                gzip_json=path.name == 'verification.json' and path.stat().st_size > 100000)
    if args.root_local_physical_review.parent != args.local_proof.parent:
        add(args.root_local_physical_review, 'final-local/' + args.root_local_physical_review.name)
    for directory in args.retained_local_dir:
        assert directory.is_absolute() and directory.is_dir() and not directory.is_symlink() and directory.resolve() == directory
        failed = json.loads((directory / 'verification.json').read_text())
        assert failed.get('status') == 'failed', 'Retained attempts must remain failed'
        for path in sorted(directory.rglob('*')):
            assert not path.is_symlink(), 'No fixture/cache symlink traversal'
            if path.is_file():
                add(path, 'retained-local/' + directory.name + '/' + path.relative_to(directory).as_posix(),
                    gzip_json=path.name == 'verification.json' and path.stat().st_size > 100000)
    for path in args.additional_closed:
        add(path, 'additional-closed/' + path.name)
    add('/workspace/cqc-pass9-publication-preparation/publish_verified_shadow_cqc_pass9.py', 'tools/rest-core-pinned-508ef68e.py')
    for name in ('publish_verified_offline_prefetch.py', 'prepare_closed_archive.py',
                 'stage_closed_archive.py', 'seal_verified_candidate_facts.py', 'import_verified_offline_prefetch_commit.py'):
        add(T / name, 'tools/' + name)
    result = {'schema': 'cqc.offline-prefetch.closed-archive-plan/1',
              'status': 'closed-after-root-local-QA', 'expectedParent': PARENT,
              'sourceSHA256': APP_SHA, 'sourceBytes': 7876,
              'historicalGitHeadsBeforeRootCommit': historical_heads,
              'CQCSubtreeUnchanged': '14271e4f8141429b8035575116883fca50925057',
              'rootLocalQAConfirmed': True, 'closedLocalQA': pin(args.local_proof),
              'rootLocalPhysicalReview': pin(args.root_local_physical_review),
              'rootPhysicalProduction7d': pin(B / 'mobile-toast-production-7d4719d4-01/ROOT_PHYSICAL_REVIEW.json'),
              'retainedProduction7dOfflineErrorQualified': True, 'productionFixAlreadyVerified': False,
              'files': rows, 'archiveBytes': sum(r['bytes'] for r in rows),
              'copiedHistoricalNative273Stage81Reports': False,
              'retainedFailedLocalDirectories': [str(p) for p in args.retained_local_dir],
              'retainedFailedAttemptsCertifiedAsSuccess': False,
              'sourceNativeImageEdits': False, 'applicationCopies': 0, 'GitMutations': 0, 'apiCalls': 0}
    assert result['archiveBytes'] < 6 * 1024 * 1024, 'Tiny new archive budget required'
    assert args.output.is_relative_to(T) and not args.output.exists()
    with args.output.open('x') as stream:
        json.dump(result, stream, indent=2); stream.write('\n')
    print(json.dumps({'status': result['status'], 'path': str(args.output),
                      'sha256': digest(args.output.read_bytes()), 'files': len(rows),
                      'archiveBytes': result['archiveBytes'], 'applicationCopies': 0, 'GitMutations': 0, 'apiCalls': 0}))


if __name__ == '__main__':
    main()
