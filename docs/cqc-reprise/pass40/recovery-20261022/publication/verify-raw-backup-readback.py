#!/usr/bin/env python3
"""Independently verify immutable public GitHub file bytes after publication."""
import argparse
import hashlib
import json
import re
import ssl
import urllib.request
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import quote


def digest(raw):
    return hashlib.sha256(raw).hexdigest()


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('--plan', required=True)
    p.add_argument('--plan-sha256', required=True)
    p.add_argument('--commit', required=True)
    p.add_argument('--out', required=True)
    args = p.parse_args()
    raw = Path(args.plan).read_bytes()
    assert digest(raw) == args.plan_sha256
    plan = json.loads(raw)
    assert plan['schema'] == 'cqc.pass40.recovery-backup-plan/1'
    assert plan['repository'] == 'darknigthmare/shadow-codec-ops'
    assert re.fullmatch('[a-f0-9]{40}', args.commit)
    # This is a read-only fallback for bounded connector responses, not a source upload.
    class NoRedirect(urllib.request.HTTPRedirectHandler):
        def redirect_request(self, req, fp, code, msg, headers, newurl):
            raise RuntimeError('Immutable source read redirected')
    opener = urllib.request.build_opener(NoRedirect(), urllib.request.HTTPSHandler(context=ssl.create_default_context()))
    rows = []
    for item in plan['files']:
        url = 'https://raw.githubusercontent.com/' + plan['repository'] + '/' + args.commit + '/' + quote(item['path'], safe='/')
        req = urllib.request.Request(url, headers={'User-Agent': 'CQC-recovery-byte-readback/1', 'Cache-Control': 'no-cache'})
        with opener.open(req, timeout=45) as response:
            assert response.status == 200 and response.url == url
            data = response.read(item['bytes'] + 1)
        assert len(data) == item['bytes'], 'Remote byte count mismatch: ' + item['path']
        assert digest(data) == item['sha256'], 'Remote SHA256 mismatch: ' + item['path']
        oid = hashlib.sha1(b'blob ' + str(len(data)).encode() + b'\0' + data).hexdigest()
        assert oid == item['gitBlobOID'], 'Remote Git OID mismatch: ' + item['path']
        rows.append({'path': item['path'], 'url': url, 'bytes': len(data), 'sha256': digest(data), 'gitBlobOID': oid, 'verified': True})
    report = {'schema': 'cqc.pass40.recovery-independent-raw-readback/1',
              'observedAtUTC': datetime.now(timezone.utc).isoformat(), 'commit': args.commit,
              'plan': {'path': args.plan, 'sha256': args.plan_sha256}, 'fileCount': len(rows),
              'totalBytes': sum(row['bytes'] for row in rows), 'allBytesVerified': True,
              'tlsVerification': True, 'redirectsAllowed': False, 'files': rows}
    out = Path(args.out)
    out.parent.mkdir(parents=True, exist_ok=True)
    encoded = (json.dumps(report, ensure_ascii=False, indent=2) + '\n').encode()
    with out.open('xb') as stream:
        stream.write(encoded)
    print(json.dumps({'path': str(out), 'bytes': len(encoded), 'sha256': digest(encoded), 'filesVerified': len(rows)}))


if __name__ == '__main__':
    main()
