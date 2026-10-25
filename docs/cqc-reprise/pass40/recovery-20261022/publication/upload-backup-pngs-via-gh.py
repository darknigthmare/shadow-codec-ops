#!/usr/bin/env python3
"""Upload only pinned PNG blobs; no tree, commit, ref, PR or deployment writes."""
import argparse
import base64
import hashlib
import json
import os
import stat
import subprocess
import tempfile
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path('/workspace/cqc-pass40-resume-20261022')
REPO = 'darknigthmare/shadow-codec-ops'


def sha256(raw):
    return hashlib.sha256(raw).hexdigest()


def save_new(path, data):
    raw = (json.dumps(data, indent=2, ensure_ascii=False) + '\n').encode()
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open('xb') as stream:
        stream.write(raw)
        stream.flush()
        os.fsync(stream.fileno())
    return {'path': str(path), 'bytes': len(raw), 'sha256': sha256(raw)}


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('--plan', required=True)
    p.add_argument('--plan-sha256', required=True)
    p.add_argument('--out-dir', required=True)
    args = p.parse_args()
    raw = Path(args.plan).read_bytes()
    assert sha256(raw) == args.plan_sha256
    plan = json.loads(raw)
    assert plan['schema'] == 'cqc.pass40.recovery-backup-plan/1'
    assert plan['repository'] == REPO
    out_dir = Path(args.out_dir)
    assert out_dir.is_relative_to(ROOT) and not out_dir.exists()
    out_dir.mkdir(parents=True)
    selected = [row for row in plan['files'] if row['path'].lower().endswith('.png')]
    assert selected and sum(row['bytes'] for row in selected) <= 15 * 1024 * 1024
    uploads, seen = [], {}
    for item in selected:
        source = Path(item['source'])
        assert source.is_relative_to(ROOT)
        cursor = ROOT
        for part in source.relative_to(ROOT).parts:
            cursor /= part
            assert not cursor.is_symlink()
        assert stat.S_ISREG(source.lstat().st_mode)
        payload = source.read_bytes()
        assert len(payload) == item['bytes'] and sha256(payload) == item['sha256']
        assert payload[:8] == b'\x89PNG\r\n\x1a\n'
        oid = hashlib.sha1(b'blob ' + str(len(payload)).encode() + b'\0' + payload).hexdigest()
        assert oid == item['gitBlobOID']
        if oid not in seen:
            with tempfile.TemporaryDirectory(prefix='cqc-p40-png-upload-') as temporary:
                request = Path(temporary) / 'blob-request.json'
                with request.open('x', encoding='utf-8') as stream:
                    os.chmod(request, 0o600)
                    json.dump({'content': base64.b64encode(payload).decode('ascii'), 'encoding': 'base64'}, stream)
                completed = subprocess.run(['gh', 'api', '--method', 'POST', 'repos/' + REPO + '/git/blobs', '--input', str(request)],
                                           check=True, capture_output=True, text=True, timeout=120)
                response = json.loads(completed.stdout)
                assert response.get('sha') == oid, 'GitHub PNG blob OID mismatch'
                if response.get('size') is not None:
                    assert response['size'] == len(payload)
            receipt = {'schema': 'cqc.pass40.recovery-png-blob-upload/1',
                       'uploadedAtUTC': datetime.now(timezone.utc).isoformat(), 'repository': REPO,
                       'planSHA256': args.plan_sha256, 'path': item['path'], 'bytes': len(payload),
                       'sha256': item['sha256'], 'expectedGitBlobOID': oid, 'returnedGitBlobOID': response['sha'],
                       'transport': 'gh api structured JSON --input file', 'sourceModified': False,
                       'treeCommitRefPROrDeploymentMutated': False}
            receipt_pin = save_new(out_dir / (oid + '.json'), receipt)
            seen[oid] = receipt_pin
        uploads.append({'path': item['path'], 'bytes': item['bytes'], 'sha256': item['sha256'],
                        'gitBlobOID': oid, 'receipt': seen[oid]})
        print(json.dumps({'uploadedPNG': item['path'], 'bytes': item['bytes'], 'gitBlobOID': oid}), flush=True)
    final = {'schema': 'cqc.pass40.recovery-all-png-blobs-uploaded/1', 'planSHA256': args.plan_sha256,
             'fileCount': len(uploads), 'uniqueBlobCount': len(seen), 'files': uploads,
             'pending': ['text blobs', 'tree and commit', 'new branch', 'independent byte readback', 'draft PR']}
    print(json.dumps(save_new(out_dir / 'PNG_BLOBS_UPLOADED_ACTUAL.json', final)))


if __name__ == '__main__':
    main()
