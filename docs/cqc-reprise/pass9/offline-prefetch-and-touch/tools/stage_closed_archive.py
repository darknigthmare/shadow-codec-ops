#!/usr/bin/env python3
"""Default is preflight; only an exact ROOT plan GO copies new archive files."""
from pathlib import Path
import argparse
import gzip
import hashlib
import json
import os
import subprocess

T = Path('/workspace/cqc-pass9-offline-prefetch-publication')
S = Path('/workspace/shadow-codec-recovered')
PREFIX = 'docs/cqc-reprise/pass9/offline-prefetch-and-touch/'
PARENT = '7d4719d432cfe82087833f49df02b27fa2f3155f'


def sha(raw):
    return hashlib.sha256(raw).hexdigest()


def blob(raw):
    return hashlib.sha1(b'blob ' + str(len(raw)).encode() + b'\0' + raw).hexdigest()


def transport(row):
    path = Path(row['source'])
    assert path.is_absolute() and path.is_file() and not path.is_symlink() and path.resolve() == path
    before = path.stat()
    assert (before.st_dev, before.st_ino, before.st_mtime_ns) == tuple(row['sourceSeal'][k] for k in ('dev', 'ino', 'mtimeNs'))
    raw = path.read_bytes()
    assert len(raw) == row['sourceBytes'] and sha(raw) == row['sourceSHA256']
    if row['storagePolicy'] == 'deterministic-gzip-9-mtime0-os255':
        packed = gzip.compress(raw, compresslevel=9, mtime=0)
        raw_target = packed[:9] + b'\xff' + packed[10:]
        assert gzip.decompress(raw_target) == raw
    else:
        assert row['storagePolicy'] == 'independent-byte-copy'
        raw_target = raw
    assert (len(raw_target), sha(raw_target), blob(raw_target)) == (row['bytes'], row['sha256'], row['gitBlobSHA1'])
    return raw_target


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--plan', type=Path, required=True)
    parser.add_argument('--plan-sha256', required=True)
    parser.add_argument('--execute-plan-sha256')
    args = parser.parse_args()
    assert sha(args.plan.read_bytes()) == args.plan_sha256
    plan = json.loads(args.plan.read_text())
    assert plan['schema'] == 'cqc.offline-prefetch.closed-archive-plan/1' and plan['status'] == 'closed-after-root-local-QA'
    assert plan['expectedParent'] == PARENT
    env = dict(os.environ, GIT_OPTIONAL_LOCKS='0', GIT_NO_LAZY_FETCH='1')
    assert subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=S, env=env).decode().strip() == PARENT
    names = set()
    for row in plan['files']:
        name = row['targetPath']
        assert name.startswith(PREFIX) and name not in names and '..' not in Path(name).parts
        names.add(name)
        target = S / name
        assert target.resolve() == target and not target.exists()
        transport(row)
    if not args.execute_plan_sha256:
        print(json.dumps({'status': 'read-only-ready', 'files': len(names), 'archiveBytes': plan['archiveBytes'],
                          'applicationCopies': 0, 'GitMutations': 0, 'apiCalls': 0}))
        return
    assert args.execute_plan_sha256 == args.plan_sha256, 'ROOT GO must identify this exact closed plan'
    output = T / ('stage-execution-' + args.plan_sha256[:12])
    output.mkdir()
    completed = []
    try:
        for row in plan['files']:
            raw = transport(row)
            target = S / row['targetPath']
            target.parent.mkdir(parents=True, exist_ok=True)
            assert target.resolve() == target and not target.exists()
            with target.open('xb') as stream:
                stream.write(raw); stream.flush(); os.fsync(stream.fileno())
            assert target.stat().st_nlink == 1 and sha(target.read_bytes()) == row['sha256']
            completed.append({'path': row['targetPath'], 'bytes': row['bytes'], 'sha256': row['sha256'],
                              'gitBlobSHA1': row['gitBlobSHA1']})
            with (output / 'JOURNAL.jsonl').open('a') as stream:
                stream.write(json.dumps(completed[-1]) + '\n'); stream.flush(); os.fsync(stream.fileno())
        for row in plan['files']:
            transport(row)
        receipt = {'schema': 'cqc.offline-prefetch.closed-archive-stage/1', 'status': 'completed',
                   'planSHA256': args.plan_sha256, 'files': completed, 'newDocumentationPaths': len(completed),
                   'historicalPathsDeleted': 0, 'sourceImageEdits': 0, 'GitMutations': 0, 'apiCalls': 0}
        (output / 'RECEIPT.json').write_text(json.dumps(receipt, indent=2) + '\n')
        print(json.dumps({'status': 'completed', 'receipt': str(output / 'RECEIPT.json'),
                          'sha256': sha((output / 'RECEIPT.json').read_bytes()), 'files': len(completed)}))
    except BaseException as exc:
        (output / 'FAILURE.json').write_text(json.dumps({'status': 'failed', 'error': repr(exc),
            'completedFiles': completed, 'partialBytesPreserved': True}, indent=2) + '\n')
        raise


if __name__ == '__main__':
    main()
