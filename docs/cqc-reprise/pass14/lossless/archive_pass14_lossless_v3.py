#!/usr/bin/env python3
"""Explicit closed-file archive, SHA dedupe and independently verified <=8 MiB ZIPs.

Preparation only: no producer is enumerated or frozen until a Root GO matches a
closed, pinned, explicit spec. Prior ZIPs are read by member and never copied.
"""
import argparse
import hashlib
import json
import re
import shutil
import tempfile
import zipfile
import zlib
from datetime import datetime, timezone
from pathlib import Path

LIMIT = 8 * 1024 * 1024
CHUNK = 4 * 1024 * 1024
DENIED = {'.git', '.aws', '.codex', '.agents', 'node_modules', 'dist', '.vercel', '__pycache__'}
SENSITIVE = re.compile(r'(^|[._-])(credentials?|secrets?|tokens?|private[-_]?key|id_rsa|id_ed25519)([._-]|$)', re.I)


def sha(data):
    return hashlib.sha256(data).hexdigest()


def dump(path, data):
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')


def file_bytes(path):
    before = path.stat()
    data = path.read_bytes()
    after = path.stat()
    if (before.st_size, before.st_mtime_ns, before.st_ino) != (after.st_size, after.st_mtime_ns, after.st_ino):
        raise ValueError('source changed during read: ' + str(path))
    return data


def approved_source(path, roots):
    original = Path(path)
    if not original.is_absolute() or original.is_symlink():
        raise ValueError('explicit absolute regular file required: ' + path)
    resolved = original.resolve(strict=True)
    if not resolved.is_file() or not any(resolved.is_relative_to(root) for root in roots):
        raise ValueError('file outside explicit bounded roots: ' + path)
    if any(part in DENIED for part in resolved.parts) or resolved.name.startswith('.env') or SENSITIVE.search(resolved.name):
        raise ValueError('dependency/build/credential path rejected: ' + path)
    return resolved


def prior_objects(index_paths):
    """Read existing indexes; member bytes are verified only when actually reused."""
    objects = {}
    indexes = []
    for raw in index_paths:
        path = Path(raw).resolve(strict=True)
        data = file_bytes(path)
        index = json.loads(data)
        if index.get('closed') is not True or index.get('actualRun') is not True:
            raise ValueError('prior index must describe closed actual archive: ' + str(path))
        indexes.append({'path': str(path), 'bytes': len(data), 'sha256': sha(data)})
        for obj in index['objects']:
            if 'archivePath' in obj and 'archiveMember' in obj:
                members = [{k: obj[k] for k in ['sha256', 'bytes', 'archivePath', 'archiveMember', 'archiveRepositoryPath', 'crc32'] if k in obj}]
            elif obj.get('storageKind') == 'existing-closed-member':
                old = obj['location']
                members = old.get('members', [old])
            elif obj.get('storageKind') == 'pass14-new-chunks':
                archive_pins = {item['file']: item for item in index['archives']}
                members = [{**chunk, 'archivePath': str(path.parent / chunk['archiveFile']), **({'archiveRepositoryPath': archive_pins[chunk['archiveFile']]['repositoryPath']} if 'repositoryPath' in archive_pins[chunk['archiveFile']] else {})} for chunk in obj['chunks']]
            else:
                raise ValueError('unsupported prior reconstruction object: ' + obj['sha256'])
            objects.setdefault(obj['sha256'], {'sha256': obj['sha256'], 'bytes': obj['bytes'], 'members': members})
    return objects, indexes


def read_member(location):
    with zipfile.ZipFile(location['archivePath']) as archive:
        member = archive.getinfo(location['archiveMember'])
        data = archive.read(member)  # zipfile itself checks ZIP CRC.
    crc = zlib.crc32(data) & 0xffffffff
    if member.file_size != len(data) or member.CRC != crc:
        raise ValueError('ZIP bytes/CRC verification failed: ' + str(location))
    if 'crc32' in location and location['crc32'] != f'{crc:08x}':
        raise ValueError('pinned member CRC differs: ' + str(location))
    if len(data) != location['bytes'] or sha(data) != location['sha256']:
        raise ValueError('member SHA/bytes verification failed: ' + str(location))
    return data, crc


def read_object(location):
    pieces = []
    members = []
    for member in location.get('members', [location]):
        data, crc = read_member(member)
        pieces.append(data)
        members.append({**member, 'crc32': f'{crc:08x}'})
    data = b''.join(pieces)
    if len(data) != location['bytes'] or sha(data) != location['sha256']:
        raise ValueError('prior object reconstruction SHA/bytes verification failed')
    return data, {**location, 'members': members}


def create(spec_path, go_path, output):
    spec_bytes = file_bytes(spec_path)
    spec = json.loads(spec_bytes)
    go = json.loads(file_bytes(go_path))
    if spec.get('schema') != 'cqc.pass14.closed-lossless-source-spec/1' or spec.get('closed') is not True:
        raise ValueError('only closed explicit source spec is accepted')
    if go.get('schema') != 'cqc.pass14.root-archive-go/1' or go.get('approved') is not True or go.get('closedSourceSpecSHA256') != sha(spec_bytes):
        raise ValueError('Root GO missing, unapproved or not bound to exact closed source spec')
    roots = [Path(root).resolve(strict=True) for root in spec['allowedRoots']]
    # Prevent broad project, /workspace and /tmp producer traversal permissions.
    if any(str(root) in {'/', '/tmp', '/workspace'} for root in roots):
        raise ValueError('allowedRoots must be bounded task folders')
    rows = spec['files']
    if not rows or len(rows) > 10000:
        raise ValueError('bounded explicit nonempty file list required')
    cap = min(int(spec.get('maximumLogicalInputBytes', 128 * 1024 * 1024)), 128 * 1024 * 1024)
    if sum(row['bytes'] for row in rows) > cap:
        raise ValueError('logical inputs exceed <=128 MiB spec cap')
    if output.exists():
        raise ValueError('output must be new; existing archives are immutable')
    if any(output.resolve().is_relative_to(root) for root in roots):
        raise ValueError('output cannot be within any source root')
    prior, index_pins = prior_objects(spec.get('priorIndexes', []))
    expected_prior = go.get('priorIndexSHA256', {})
    if any(expected_prior.get(pin['path']) != pin['sha256'] for pin in index_pins):
        raise ValueError('Root GO must pin each reused prior index')
    output.mkdir(parents=True)
    logical, objects = [], {}
    temp = Path(tempfile.mkdtemp(prefix='pass14-lossless-staging-', dir=output.parent))
    try:
        for row in rows:
            if row.get('producerState') != 'closed' or not re.fullmatch('[a-f0-9]{64}', row['sha256']):
                raise ValueError('every explicit input requires closed producerState and exact SHA pin')
            path = approved_source(row['path'], roots)
            if path.stat().st_size > 32 * 1024 * 1024:
                raise ValueError('one source exceeds bounded 32 MiB: ' + str(path))
            data = file_bytes(path)
            digest = sha(data)
            if digest != row['sha256'] or len(data) != row['bytes']:
                raise ValueError('source differs from closed pinned spec: ' + str(path))
            logical.append({'sourcePath': str(path), 'sha256': digest, 'bytes': len(data), 'role': row.get('role', 'unspecified')})
            if digest in objects:
                objects[digest]['sourcePaths'].append(str(path))
                continue
            obj = {'sha256': digest, 'bytes': len(data), 'sourcePaths': [str(path)]}
            if digest in prior:
                location = prior[digest]
                recovered, verified_location = read_object(location)
                if recovered != data:
                    raise ValueError('SHA reused bytes not equal original source')
                obj.update({'storageKind': 'existing-closed-member', 'location': verified_location})
            else:
                (temp / digest).write_bytes(data)
                obj.update({'storageKind': 'pass14-new-chunks', 'chunks': []})
            objects[digest] = obj
        # First-fit-decreasing packs whole objects/chunks into the fewest practical
        # bounded volumes. No PNG compression, resampling or other pixel operation.
        bins = pack_objects([obj for obj in objects.values() if obj['storageKind'] == 'pass14-new-chunks'])
        archives = []
        for part_number, volume in enumerate(bins, 1):
            prefix = spec.get('archivePrefix', 'pass14-lossless')
            if not re.fullmatch(r'[a-z0-9-]{1,64}', prefix):
                raise ValueError('bounded archivePrefix required')
            archive_name = f'{prefix}-{part_number:03d}.zip'
            archives.append(archive_name)
            with zipfile.ZipFile(output / archive_name, 'x', compression=zipfile.ZIP_STORED, allowZip64=False) as archive:
                for fragment in volume['members']:
                    obj = objects[fragment['objectSHA256']]
                    data = (temp / obj['sha256']).read_bytes()
                    start, size = fragment['offset'], fragment['bytes']
                    chunk = data[start:start + size]
                    member = fragment['archiveMember']
                    info = zipfile.ZipInfo(member, date_time=(1980, 1, 1, 0, 0, 0))
                    info.compress_type = zipfile.ZIP_STORED
                    archive.writestr(info, chunk)
                    obj['chunks'].append({'archiveFile': archive_name, 'archiveMember': member, 'offset': start, 'bytes': len(chunk), 'sha256': sha(chunk), 'crc32': f'{zlib.crc32(chunk) & 0xffffffff:08x}'})
        for obj in objects.values():
            if 'chunks' in obj:
                obj['chunks'].sort(key=lambda item: item['offset'])
        archive_pins = []
        for name in archives:
            path = output / name
            data = file_bytes(path)
            if len(data) > LIMIT:
                raise ValueError('archive exceeds exact 8 MiB volume limit')
            with zipfile.ZipFile(path) as archive:
                if archive.testzip() is not None:
                    raise ValueError('archive full CRC check failed')
            archive_pins.append({'file': name, 'bytes': len(data), 'sha256': sha(data), **({'repositoryPath': spec['portableRepositoryArchiveBase'].rstrip('/') + '/' + name} if 'portableRepositoryArchiveBase' in spec else {})})
        verification = []
        for obj in objects.values():
            if obj['storageKind'] == 'existing-closed-member':
                data, _ = read_object(obj['location'])
            else:
                pieces = []
                for chunk in obj['chunks']:
                    location = {**chunk, 'archivePath': str(output / chunk['archiveFile'])}
                    piece, _ = read_member(location)
                    pieces.append(piece)
                data = b''.join(pieces)
            if len(data) != obj['bytes'] or sha(data) != obj['sha256']:
                raise ValueError('reconstruction SHA/bytes failed')
            for source in obj['sourcePaths']:
                # End-to-end equality against actual closed originals, not just metadata.
                if file_bytes(Path(source)) != data:
                    raise ValueError('source changed after archival: ' + source)
            verification.append({'sha256': obj['sha256'], 'bytes': len(data), 'sourceEquality': True, 'ZIPCRCChecked': True, 'SHA256Checked': True})
        for alias in spec.get('logicalSymlinkAliases', []):
            source = Path(alias['sourcePath'])
            if not source.is_symlink() or str(source.readlink()) != alias['linkTargetLiteral'] or str(source.resolve(strict=True)) != alias['targetSourcePath']:
                raise ValueError('closed symlink alias changed')
            data = file_bytes(source.resolve(strict=True))
            if sha(data) != alias['sha256'] or len(data) != alias['bytes'] or alias['sha256'] not in objects:
                raise ValueError('symlink alias object missing or bytes changed')
        for alias in spec.get('externalNativeToolAliases', []):
            data = file_bytes(Path(alias['path']))
            if sha(data) != alias['sha256'] or len(data) != alias['bytes'] or alias['sha256'] not in objects:
                raise ValueError('native tool alias object missing or bytes changed')
        index = {'schema': 'cqc.pass14.lossless-reconstruction-index/1', 'actualRun': True, 'closed': True,
                 'createdUTC': datetime.now(timezone.utc).isoformat(), 'closedSourceSpecSHA256': sha(spec_bytes),
                 'priorIndexes': index_pins, 'volumeMaximumBytes': LIMIT, 'ZIPCompression': 'stored-lossless',
                 'archives': archive_pins, 'logicalSources': logical, 'objects': list(objects.values()),
                 'logicalFileCount': len(logical), 'uniqueObjectCount': len(objects),
                 'logicalBytes': sum(row['bytes'] for row in logical), 'uniqueBytes': sum(obj['bytes'] for obj in objects.values()),
                 'existingMemberObjectCount': sum(obj['storageKind'] == 'existing-closed-member' for obj in objects.values()),
                 'noExistingArchiveCopyOrRecompression': True, 'noOpenProducerSnapshot': True,
                 'logicalSymlinkAliases': spec.get('logicalSymlinkAliases', []),
                 'externalNativeToolAliases': spec.get('externalNativeToolAliases', []),
                 'sourceClosureEvidence': spec.get('sourceClosureEvidence', []),
                 'historicalSourceReferences': spec.get('historicalSourceReferences', []),
                 'packingMethod': 'first-fit-decreasing bounded stored entries',
                 'packingLowerBoundVolumes': minimum_volumes([obj for obj in objects.values() if obj['storageKind'] == 'pass14-new-chunks'])}
        dump(output / 'LOSSLESS_RECONSTRUCTION_INDEX.json', index)
        dump(output / 'ACTUAL_RECONSTRUCTION_VERIFICATION.json', {'schema': 'cqc.pass14.actual-lossless-verification/1', 'actualRun': True, 'objects': verification, 'archives': archive_pins})
        return index
    except Exception:
        # A failed new output is incomplete and never described as closed preservation.
        (output / 'INCOMPLETE_ARCHIVE_FAILURE.txt').write_text('This new output failed verification; no closed preservation claim.\n')
        raise
    finally:
        shutil.rmtree(temp)


def pack_objects(objects):
    fragments = []
    for obj in objects:
        for number, start in enumerate(range(0, obj['bytes'], CHUNK) if obj['bytes'] else [0]):
            size = min(CHUNK, obj['bytes'] - start)
            member = f"objects/sha256/{obj['sha256']}/{number:04d}"
            cost = size + 76 + 2 * len(member)
            fragments.append({'objectSHA256': obj['sha256'], 'offset': start, 'bytes': size, 'archiveMember': member, 'ZIPStoredCostBytes': cost})
    bins = []
    for fragment in sorted(fragments, key=lambda item: (-item['ZIPStoredCostBytes'], item['objectSHA256'], item['offset'])):
        fitting = next((volume for volume in bins if volume['exactZIPBytes'] + fragment['ZIPStoredCostBytes'] <= LIMIT), None)
        if fitting is None:
            fitting = {'exactZIPBytes': 22, 'members': []}
            bins.append(fitting)
        fitting['members'].append(fragment)
        fitting['exactZIPBytes'] += fragment['ZIPStoredCostBytes']
    return bins


def minimum_volumes(objects):
    total = sum(volume['exactZIPBytes'] - 22 for volume in pack_objects(objects))
    return (total + (LIMIT - 22) - 1) // (LIMIT - 22)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--closed-spec', type=Path, required=True)
    parser.add_argument('--root-go', type=Path, required=True)
    parser.add_argument('--output', type=Path, required=True)
    args = parser.parse_args()
    result = create(args.closed_spec, args.root_go, args.output)
    print(json.dumps({key: result[key] for key in ['logicalFileCount', 'uniqueObjectCount', 'existingMemberObjectCount', 'logicalBytes', 'uniqueBytes', 'archives']}))


if __name__ == '__main__':
    main()
