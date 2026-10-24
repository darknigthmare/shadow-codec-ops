#!/usr/bin/env python3
"""Freeze an explicit new recovery backup; this script makes no network or Git writes."""
import argparse
import hashlib
import json
import os
import re
import stat
from datetime import datetime, timezone
from pathlib import Path, PurePosixPath

SOURCE_ROOT = Path('/workspace/cqc-pass40-resume-20261022')
PREFIX = 'docs/cqc-reprise/pass40/recovery-20261022/'
REPOSITORY = 'darknigthmare/shadow-codec-ops'
BASE_COMMIT = '42279c1c884769873e66bbda0b6fe849bcd2f1a2'
BASE_TREE = 'b72f755d3fb97343f9dd8bc049ee7478754ae525'
BASE_BRANCH = 'codex/cqc-p38-archive-projectile-range'
NEW_BRANCH = 'codex/cqc-p40-batch30-recovery'
MAX_FILE = 15 * 1024 * 1024


def sha256(data):
    return hashlib.sha256(data).hexdigest()


def blob_oid(data):
    return hashlib.sha1(b'blob ' + str(len(data)).encode() + b'\0' + data).hexdigest()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--config', required=True)
    parser.add_argument('--out', required=True)
    args = parser.parse_args()
    config_path = Path(args.config)
    config_raw = config_path.read_bytes()
    config = json.loads(config_raw)
    assert config.get('schema') == 'cqc.pass40.recovery-backup-config/1'
    assert config.get('approvedByRoot') is True, 'Explicit final file list review required.'
    assert config.get('repository') == REPOSITORY
    assert config.get('parentCommit') == BASE_COMMIT
    assert config.get('baseTree') == BASE_TREE
    assert config.get('baseBranch') == BASE_BRANCH
    assert config.get('newBranch') == NEW_BRANCH
    requested = config.get('files')
    assert isinstance(requested, list) and 1 <= len(requested) <= 200
    rows, seen, total_png = [], set(), 0
    for relative in requested:
        assert isinstance(relative, str)
        rel = PurePosixPath(relative)
        assert not rel.is_absolute() and all(p not in ('', '.', '..') for p in rel.parts)
        assert relative == 'README.md' or rel.parts[0] in ('recovery', 'batch30', 'references', 'art', 'integration', 'publication', 'tools')
        assert relative not in seen
        seen.add(relative)
        source = SOURCE_ROOT / relative
        cursor = SOURCE_ROOT
        for part in rel.parts:
            cursor = cursor / part
            assert not cursor.is_symlink(), f'Symlink refused: {cursor}'
        info = source.lstat()
        assert stat.S_ISREG(info.st_mode), f'Not a regular file: {source}'
        assert source.resolve().is_relative_to(SOURCE_ROOT.resolve())
        assert 0 < info.st_size <= MAX_FILE
        raw = source.read_bytes()
        assert len(raw) == info.st_size
        suffix = source.suffix.lower()
        sums = bool(re.fullmatch(r'SHA256SUMS(?:_[A-Z0-9]+)?', source.name))
        assert suffix in ('.json', '.gz', '.md', '.txt', '.html', '.gif', '.png', '.py', '.mjs', '.js') or sums
        if suffix == '.png':
            assert raw[:8] == b'\x89PNG\r\n\x1a\n'
            total_png += len(raw)
            if relative.startswith('art/'):
                assert relative.startswith('art/core__snake/mgs3-camo-soviet-woodland/')
        if suffix in ('.json', '.md', '.txt', '.html', '.py', '.mjs', '.js') or sums:
            raw.decode('utf-8')
        rows.append({'source': str(source), 'relative': relative, 'path': PREFIX + relative,
                     'bytes': len(raw), 'sha256': sha256(raw), 'gitBlobOID': blob_oid(raw),
                     'mode': '100644', 'type': 'blob', 'regularFile': True})
    assert total_png <= MAX_FILE, 'Bounded backup PNG total must remain <=15 MiB.'
    body = config.get('pullRequest', {})
    assert body.get('draft') is True and body.get('title') and body.get('body')
    plan = {'schema': 'cqc.pass40.recovery-backup-plan/1',
            'createdAtUTC': datetime.now(timezone.utc).isoformat(), 'repository': REPOSITORY,
            'parentCommit': BASE_COMMIT, 'baseTree': BASE_TREE, 'baseBranch': BASE_BRANCH,
            'newBranch': NEW_BRANCH, 'config': {'path': str(config_path), 'bytes': len(config_raw), 'sha256': sha256(config_raw)},
            'files': rows, 'fileCount': len(rows), 'bytes': sum(r['bytes'] for r in rows), 'pngBytes': total_png,
            'commitMessage': config.get('commitMessage', 'chore(cqc): preserve batch30 recovery sources and tools'),
            'pullRequest': body,
            'limits': ['Recovery backup only; a draft PR does not establish playable batch30 delivery.',
                       'No runtime path, existing Git ref, old private source or broken generated-image alias is included.',
                       'No Vercel deployment or alias change is part of this backup plan.'],
            'networkMutationsPerformed': False, 'localGitMutationsPerformed': False}
    output = Path(args.out)
    output.parent.mkdir(parents=True, exist_ok=True)
    data = (json.dumps(plan, ensure_ascii=False, indent=2) + '\n').encode()
    with output.open('xb') as stream:
        stream.write(data)
        stream.flush()
        os.fsync(stream.fileno())
    print(json.dumps({'plan': str(output), 'bytes': len(data), 'sha256': sha256(data),
                      'fileCount': len(rows), 'payloadBytes': plan['bytes'], 'pngBytes': total_png}))


if __name__ == '__main__':
    main()
