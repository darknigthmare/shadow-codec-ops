#!/usr/bin/env python3
"""Read one frozen upload payload in bounded chunks; never makes network or Git writes."""
import argparse
import base64
import hashlib
import json
import stat
from pathlib import Path

ROOT = Path('/workspace/cqc-pass40-resume-20261022')
CHUNK = 32768


def sha256(raw):
    return hashlib.sha256(raw).hexdigest()


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('--plan', required=True)
    p.add_argument('--plan-sha256', required=True)
    p.add_argument('--index', type=int)
    p.add_argument('--chunk', type=int)
    args = p.parse_args()
    plan_path = Path(args.plan)
    raw = plan_path.read_bytes()
    assert sha256(raw) == args.plan_sha256
    plan = json.loads(raw)
    assert plan['schema'] == 'cqc.pass40.recovery-backup-plan/1'
    assert plan['repository'] == 'darknigthmare/shadow-codec-ops'
    if args.index is None:
        assert args.chunk is None
        print(json.dumps(plan, ensure_ascii=False, separators=(',', ':')))
        return
    row = plan['files'][args.index]
    source = Path(row['source'])
    assert source.is_relative_to(ROOT)
    cursor = ROOT
    for part in source.relative_to(ROOT).parts:
        cursor /= part
        assert not cursor.is_symlink()
    assert stat.S_ISREG(source.lstat().st_mode)
    payload = source.read_bytes()
    assert len(payload) == row['bytes'] and sha256(payload) == row['sha256']
    git_oid = hashlib.sha1(b'blob ' + str(len(payload)).encode() + b'\0' + payload).hexdigest()
    assert git_oid == row['gitBlobOID']
    encoded = base64.b64encode(payload).decode('ascii')
    count = (len(encoded) + CHUNK - 1) // CHUNK
    if args.chunk is None:
        print(json.dumps({'index': args.index, 'path': row['path'], 'bytes': len(payload),
                          'sha256': row['sha256'], 'gitBlobOID': git_oid,
                          'base64Bytes': len(encoded), 'chunkSize': CHUNK, 'chunkCount': count}))
    else:
        assert 0 <= args.chunk < count
        print(encoded[args.chunk * CHUNK:(args.chunk + 1) * CHUNK], end='')


if __name__ == '__main__':
    main()
