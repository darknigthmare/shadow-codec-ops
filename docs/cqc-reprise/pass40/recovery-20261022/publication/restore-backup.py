#!/usr/bin/env python3
"""Restore the immutable P40 recovery snapshot into a new directory only."""
import argparse
import hashlib
import json
import os
import re
import ssl
import stat
from datetime import datetime, timezone
from pathlib import Path, PurePosixPath
from urllib.parse import quote
from urllib.request import HTTPRedirectHandler, HTTPSHandler, Request, build_opener

REPOSITORY = 'darknigthmare/shadow-codec-ops'
PREFIX = 'docs/cqc-reprise/pass40/recovery-20261022/'
MANIFEST = 'publication/BACKUP_PAYLOAD_MANIFEST_V3_PUBLIC.json'
MANIFEST_SHA256 = '3d5420bde1aff3b99a4ec414799be71890a709cad4240f09fca4285186c431c7'


class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, *args):
        raise RuntimeError('Unexpected immutable-source redirect')


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--commit', required=True, help='Verified 40-character recovery commit')
    parser.add_argument('--out', required=True, help='New destination directory; must not exist')
    args = parser.parse_args()
    if not re.fullmatch(r'[a-f0-9]{40}', args.commit):
        parser.error('--commit must be an immutable 40-character Git commit')
    destination = Path(args.out).absolute()
    if destination.exists() or destination.is_symlink():
        parser.error('--out must not exist; existing files are never overwritten')
    if not destination.parent.is_dir() or destination.parent.resolve() != destination.parent:
        parser.error('Destination parent must exist and contain no symlinks')
    opener = build_opener(NoRedirect(), HTTPSHandler(context=ssl.create_default_context()))

    def fetch(relative, size_limit):
        url = 'https://raw.githubusercontent.com/' + REPOSITORY + '/' + args.commit + '/' + quote(PREFIX + relative, safe='/')
        with opener.open(Request(url, headers={'User-Agent': 'CQC-P40-source-restore/1'}), timeout=45) as response:
            if response.status != 200 or response.url != url:
                raise RuntimeError('Unexpected source response')
            data = response.read(size_limit + 1)
        if len(data) > size_limit:
            raise RuntimeError('Source exceeds its pinned byte count')
        return data

    manifest_bytes = fetch(MANIFEST, 1024 * 1024)
    if hashlib.sha256(manifest_bytes).hexdigest() != MANIFEST_SHA256:
        raise RuntimeError('Recovery manifest SHA256 differs')
    manifest = json.loads(manifest_bytes)
    if manifest.get('schema') != 'cqc.pass40.recovery-backup-payload-manifest/1':
        raise RuntimeError('Wrong recovery manifest')
    rows = manifest.get('files')
    if not isinstance(rows, list) or not 1 <= len(rows) <= 200 or len(rows) != manifest.get('fileCountExcludingThisManifest'):
        raise RuntimeError('Unexpected manifest file count')
    seen, total = set(), 0
    for row in rows:
        name = row.get('path')
        if not isinstance(name, str) or not name or '\\' in name or '\x00' in name:
            raise RuntimeError('Unsafe recovery path')
        path = PurePosixPath(name)
        if path.is_absolute() or '..' in path.parts or '.' in path.parts or name != path.as_posix() or name in seen or name == MANIFEST:
            raise RuntimeError('Unsafe or repeated recovery path')
        if not (name == 'README.md' or path.parts[0] in {'art', 'batch30', 'publication', 'recovery', 'references', 'tools'}):
            raise RuntimeError('Path is outside this recovery snapshot')
        if type(row.get('bytes')) is not int or not 0 < row['bytes'] <= 15 * 1024 * 1024:
            raise RuntimeError('Invalid source byte count')
        if not re.fullmatch(r'[a-f0-9]{64}', row.get('sha256', '')):
            raise RuntimeError('Invalid source SHA256')
        seen.add(name)
        total += row['bytes']
    if total != manifest.get('totalBytesExcludingThisManifest') or total > 32 * 1024 * 1024:
        raise RuntimeError('Unexpected total recovery size')
    destination.mkdir(mode=0o700)

    def write_new(relative, data):
        target = destination / relative
        target.parent.mkdir(parents=True, exist_ok=True)
        cursor = destination
        for part in PurePosixPath(relative).parts[:-1]:
            cursor /= part
            if not stat.S_ISDIR(cursor.lstat().st_mode):
                raise RuntimeError('Recovery parent is not a regular directory')
        with target.open('xb') as stream:
            stream.write(data)
            stream.flush()
            os.fsync(stream.fileno())

    write_new(MANIFEST, manifest_bytes)
    for row in rows:
        data = fetch(row['path'], row['bytes'])
        if len(data) != row['bytes'] or hashlib.sha256(data).hexdigest() != row['sha256']:
            raise RuntimeError('Source bytes differ: ' + row['path'])
        write_new(row['path'], data)
    result = {'schema': 'cqc.pass40.source-restoration-actual/1',
              'restoredUTC': datetime.now(timezone.utc).isoformat(), 'sourceCommit': args.commit,
              'manifestSHA256': MANIFEST_SHA256, 'destination': str(destination),
              'filesRestored': len(rows) + 1, 'bytesRestored': total + len(manifest_bytes),
              'allPinnedBytesVerified': True, 'normalTLSVerified': True,
              'redirectsAllowed': False, 'existingFilesOverwritten': 0,
              'productGameplayInstalled': False}
    encoded = (json.dumps(result, ensure_ascii=False, indent=2) + '\n').encode()
    write_new('RESTORATION_ACTUAL.json', encoded)
    print(encoded.decode(), end='')


if __name__ == '__main__':
    main()
