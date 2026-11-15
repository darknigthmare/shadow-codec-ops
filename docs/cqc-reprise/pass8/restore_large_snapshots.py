#!/usr/bin/env python3
"""Verify or restore the three losslessly fragmented PASS8 JSON snapshots."""
import argparse
import gzip
import hashlib
import json
import os
from pathlib import Path
import tempfile


ROOT = Path(__file__).resolve().parent


def sha(path):
    digest = hashlib.sha256()
    with path.open('rb') as handle:
        for data in iter(lambda: handle.read(1024 * 1024), b''):
            digest.update(data)
    return digest.hexdigest()


def safe_relative(root, relative):
    relative = Path(relative)
    if relative.is_absolute() or '..' in relative.parts:
        raise ValueError('Unsafe snapshot path')
    path = root / relative
    for ancestor in [path, *path.parents]:
        if ancestor.is_symlink():
            raise ValueError('Snapshot symlinks are forbidden')
    return path


def restore(row, destination, verify_only):
    target = safe_relative(destination, row['logicalPath'])
    if target.exists() and (not target.is_file() or target.stat().st_size != row['originalBytes'] or sha(target) != row['originalSha256']):
        raise ValueError('Existing snapshot differs; no file will be overwritten: ' + str(target))
    full = hashlib.sha256()
    git_blob = hashlib.sha1(b'blob ' + str(row['originalBytes']).encode() + b'\0')
    size = 0
    temporary = None
    output = None
    wrote_restored_file = False
    try:
        if not verify_only and not target.exists():
            target.parent.mkdir(parents=True, exist_ok=True)
            fd, temporary = tempfile.mkstemp(prefix='.cqc-restore-', dir=target.parent)
            output = os.fdopen(fd, 'wb')
        for part in row['parts']:
            source = safe_relative(ROOT, part['path'])
            if not source.is_file() or source.stat().st_size != part['bytes'] or sha(source) != part['sha256']:
                raise ValueError('Compressed part changed: ' + str(source))
            digest = hashlib.sha256()
            part_size = 0
            with gzip.open(source, 'rb') as handle:
                for data in iter(lambda: handle.read(1024 * 1024), b''):
                    digest.update(data)
                    full.update(data)
                    git_blob.update(data)
                    part_size += len(data)
                    size += len(data)
                    if part_size > part['uncompressedBytes'] or size > row['originalBytes']:
                        raise ValueError('Uncompressed size exceeded the frozen source')
                    if output:
                        output.write(data)
            if part_size != part['uncompressedBytes'] or digest.hexdigest() != part['uncompressedSha256']:
                raise ValueError('Uncompressed part changed')
        if size != row['originalBytes'] or full.hexdigest() != row['originalSha256'] or git_blob.hexdigest() != row['originalGitBlob']:
            raise ValueError('Restored source differs from the complete original')
        if output:
            output.flush()
            os.fsync(output.fileno())
            output.close()
            output = None
            # Exclusive publication preserves an existing destination in a race.
            os.link(temporary, target, follow_symlinks=False)
            os.unlink(temporary)
            temporary = None
            wrote_restored_file = True
        return {'path': row['logicalPath'], 'status': 'verified-byte-exact', 'bytes': size, 'sha256': full.hexdigest(), 'gitBlob': git_blob.hexdigest(), 'wroteRestoredFile': wrote_restored_file}
    finally:
        if output:
            output.close()
        if temporary is not None:
            os.unlink(temporary)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--verify-only', action='store_true')
    parser.add_argument('--destination', type=Path, default=ROOT)
    args = parser.parse_args()
    manifest = json.loads((ROOT / 'LARGE_SNAPSHOT_CHUNKS.json').read_text())
    if manifest.get('schema') != 'cqc.pass8.lossless-large-snapshot-chunks/1':
        raise ValueError('Unknown manifest schema')
    results = [restore(row, args.destination.absolute(), args.verify_only) for row in manifest['files']]
    print(json.dumps({'status': 'passed', 'files': results, 'existingFilesOverwritten': 0}, indent=2))


if __name__ == '__main__':
    main()
