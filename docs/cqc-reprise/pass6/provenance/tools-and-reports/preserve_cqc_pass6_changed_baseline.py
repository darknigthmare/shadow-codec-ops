#!/usr/bin/env python3
"""Keep byte-exact backups for six immutable inventories before the PASS6 delivery.
Historical archives are opened read-only. No packaging or publication is performed.
Run only after source writers have stopped.
"""
import argparse
import hashlib
import json
from pathlib import Path, PurePosixPath
import shutil
import zipfile

ROOT = Path('/workspace/cqc-game-working/cqc-versus-v056')
ARCHIVE = Path('/workspace/CQC_Versus_Legacy_v0.56_REPRISE_PASS5_2026-10-01.zip')
ARCHIVE_SHA256 = 'b6615f5fef9252ade6296b88d92cc25023905b06c7f7451ffa37fce0465138c8'
BASELINES = [
    ('originals', Path('/workspace/cqc-original-v056-files.json'), 1322, 'c073d1c51a42f0508d4ab5291d0483019be5cd1eec07e6a4c513ba9ef0117512'),
    ('pass2', Path('/workspace/cqc-delivered-pass2-baseline-files.json'), 4576, '12c4825ea85f1954e123459730084740fd9a5a402f46f6c272cf7e8a3bc90190'),
    ('early-pass3-boundary', Path('/workspace/cqc-pass2-baseline-files.json'), 4617, '4f8d7df1a657edda7ef236a2cfd366534946008308182bad0cb48a27c72e96c8'),
    ('pass3', Path('/workspace/cqc-delivered-pass3-baseline-files.json'), 5972, '9641befa9ffa0f37c2279487fa91562b3b1052cff4d33d711c835d3066076d46'),
    ('pass4', Path('/workspace/cqc-delivered-pass4-baseline-files.json'), 7850, '88f294418baf46d7269c08324c433a615fdeadf924d35814221e64e4bbc67244'),
    ('pass5', Path('/workspace/cqc-delivered-pass5-baseline-files.json'), 9079, '31251f4751b162334ca1d064025ac23876b4afffe9f55782410ff8128e2fbc67'),
]


def sha(path):
    value = hashlib.sha256()
    with path.open('rb') as handle:
        for part in iter(lambda: handle.read(1048576), b''):
            value.update(part)
    return value.hexdigest()


def read_baseline(path, count, expected_sha):
    if sha(path) != expected_sha:
        raise ValueError('Immutable baseline inventory changed: ' + str(path))
    document = json.loads(path.read_text())
    rows = document if isinstance(document, list) else document.get('files', document)
    if isinstance(rows, list):
        names = [row.get('path', row.get('relative', row.get('name'))) for row in rows]
        if len(set(names)) != len(names):
            raise ValueError('Duplicate baseline path: ' + str(path))
        rows = dict(zip(names, rows))
    if len(rows) != count:
        raise ValueError('Immutable baseline count changed: ' + str(path))
    for name, row in rows.items():
        relative = PurePosixPath(name)
        digest = row if isinstance(row, str) else row.get('sha256')
        if relative.is_absolute() or '..' in relative.parts or '\\' in name or not digest or len(digest) != 64:
            raise ValueError('Unsafe/incomplete baseline record: ' + str(name))
    return rows


def snapshot(root):
    paths = sorted(path for path in root.rglob('*') if path.is_file())
    if any(path.is_symlink() or not path.resolve().is_relative_to(root) for path in paths):
        raise ValueError('Symbolic link or escaping source path refused')
    return {path.relative_to(root).as_posix(): path for path in paths}


def main(root=ROOT, archive=ARCHIVE):
    root = root.resolve()
    baselines = [(tag, path, read_baseline(path, count, digest)) for tag, path, count, digest in BASELINES]
    files = snapshot(root)
    for tag, path, previous in baselines:
        absent = sorted(set(previous) - set(files))
        if absent:
            raise ValueError('Baseline paths missing in ' + tag + ': ' + repr(absent))
    hashes = {name: sha(path) for name, path in files.items()}
    by_hash = {}
    for name, digest in hashes.items():
        by_hash.setdefault(digest, []).append(name)
    if archive.resolve().is_relative_to(root):
        raise ValueError('Historical source archive must be outside working game')
    if sha(archive) != ARCHIVE_SHA256:
        raise ValueError('Immutable delivered PASS5 archive SHA mismatch')
    reports = []
    with zipfile.ZipFile(archive, 'r') as archived:
        members = archived.namelist()
        if len(members) != len(set(members)):
            raise ValueError('Historical archive contains duplicate names')
        manifest = json.loads(archived.read('PACKAGE_RECOVERY_MANIFEST.json'))
        archive_by_hash = {}
        for name, record in manifest['files'].items():
            archive_by_hash.setdefault(record['sha256'], []).append(manifest['gameRoot'] + '/' + name)
        for tag, baseline_path, previous in baselines:
            changes = []
            for name, record in previous.items():
                wanted = record if isinstance(record, str) else record['sha256']
                if hashes[name] == wanted:
                    continue
                backups = [candidate for candidate in by_hash.get(wanted, []) if candidate.startswith('recovery/')]
                copied = False
                if not backups:
                    target = root / 'recovery' / ('pass6-all-changed-' + tag) / name
                    if target.is_symlink() or not target.resolve().is_relative_to(root / 'recovery'):
                        raise ValueError('Unsafe recovery target: ' + name)
                    if target.exists() and sha(target) != wanted:
                        raise ValueError('Exact backup collision: ' + name)
                    if not target.exists():
                        target.parent.mkdir(parents=True, exist_ok=True)
                        current = by_hash.get(wanted, [])
                        if current:
                            with target.open('xb') as out, files[current[0]].open('rb') as source:
                                shutil.copyfileobj(source, out)
                        else:
                            candidates = archive_by_hash.get(wanted, [])
                            if not candidates:
                                raise ValueError('Exact baseline bytes unavailable: ' + name)
                            source_name = candidates[0]
                            value = hashlib.sha256()
                            with archived.open(source_name) as source, target.open('xb') as out:
                                for part in iter(lambda: source.read(1048576), b''):
                                    value.update(part)
                                    out.write(part)
                            if value.hexdigest() != wanted:
                                raise ValueError('Historical payload mismatch: ' + source_name)
                        copied = True
                    if sha(target) != wanted:
                        raise ValueError('Backup byte verification failed: ' + name)
                    relative = target.relative_to(root).as_posix()
                    files[relative], hashes[relative] = target, wanted
                    by_hash.setdefault(wanted, []).append(relative)
                    backups = [relative]
                changes.append({'path': name, 'previousSha256': wanted, 'currentSha256': hashes[name],
                                'exactBackups': backups, 'copyAdded': copied})
            reports.append({'tag': tag, 'baseline': str(baseline_path), 'baselineFiles': len(previous),
                            'missingFiles': 0, 'changedFiles': len(changes),
                            'changesWithExactBackup': len(changes), 'changes': changes})
    # Concurrent edits invalidate this preparation instead of silently using stale hashes.
    for tag, path, previous in baselines:
        for name in previous:
            if sha(root / name) != hashes[name]:
                raise ValueError('Baseline source changed during preparation: ' + name)
    report = {'schema': 'cqc.pass6-preservation/1', 'archiveReadOnly': str(archive),
              'archiveSha256': ARCHIVE_SHA256, 'baselineCounts': [len(rows) for _, _, rows in baselines],
              'missingFiles': 0, 'allChangesHaveByteExactRecoveryCopy': True, 'baselines': reports}
    output = root / 'recovery/PASS6_PREVIOUS_WAVES_PRESERVATION.json'
    if output.exists():
        before = output.read_bytes()
        backup = root / 'recovery/pass6-preservation-history' / (hashlib.sha256(before).hexdigest() + '.json')
        backup.parent.mkdir(parents=True, exist_ok=True)
        if backup.exists() and backup.read_bytes() != before:
            raise ValueError('Preservation history collision')
        if not backup.exists():
            with backup.open('xb') as handle:
                handle.write(before)
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n')
    print(json.dumps({'baselineCounts': report['baselineCounts'], 'missingFiles': 0,
                      'modifiedAndBackedUp': {row['tag']: row['changedFiles'] for row in reports},
                      'report': str(output)}, ensure_ascii=False))


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', type=Path, default=ROOT)
    parser.add_argument('--archive', type=Path, default=ARCHIVE)
    args = parser.parse_args()
    main(args.root, args.archive)

