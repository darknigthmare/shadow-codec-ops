#!/usr/bin/env python3
"""Lossless source packaging. Reads pinned sources; never edits their roots."""
import argparse
import hashlib
import json
import os
from pathlib import Path, PurePosixPath
import re
import shutil
import stat
import sys
import zipfile
import zlib

BASE = Path('/tmp/cqc-pass16-preservation')
MAX_ZIP = 8 * 1024 * 1024
TARGET_RAW = 7 * 1024 * 1024
SEGMENT_BYTES = 4 * 1024 * 1024
MAX_PAYLOAD = 200 * 1024 * 1024
MAX_FILES = 50000
SHA = re.compile(r'^[0-9a-f]{64}$')
ROOT_ID = re.compile(r'^[a-z0-9][a-z0-9._-]{0,79}$')


def fail(message):
    raise ValueError(message)


def canonical(data):
    return (json.dumps(data, sort_keys=True, ensure_ascii=False,
                       separators=(',', ':')) + '\n').encode('utf-8')


def atomic_json(path, data):
    body = canonical(data)
    if len(body) > MAX_ZIP:
        fail('JSON exceeds the 8 MiB documentation limit: ' + str(path))
    temp = path.with_name(path.name + '.tmp')
    with temp.open('xb') as handle:
        handle.write(body)
    os.replace(temp, path)


def reader(path):
    """Keep original atime unchanged when Linux O_NOATIME is available."""
    flags = os.O_RDONLY | getattr(os, 'O_NOFOLLOW', 0)
    flags |= getattr(os, 'O_NOATIME', 0)
    try:
        fd = os.open(path, flags)
    except PermissionError:
        # No chmod, chown or timestamp mutation of a source is permitted.
        fail('O_NOATIME denied; source not opened: ' + str(path))
    return os.fdopen(fd, 'rb')


def digest(path):
    h = hashlib.sha256()
    count = 0
    with reader(path) as handle:
        while True:
            data = handle.read(1024 * 1024)
            if not data:
                break
            count += len(data)
            h.update(data)
    return count, h.hexdigest()


def metadata(st):
    return {'mode': stat.S_IMODE(st.st_mode), 'uid': st.st_uid,
            'gid': st.st_gid, 'atime_ns': st.st_atime_ns,
            'mtime_ns': st.st_mtime_ns, 'ctime_ns': st.st_ctime_ns}


def stability(st):
    # atime is also compared: O_NOATIME prevents our own source reads changing it.
    return (st.st_dev, st.st_ino, st.st_size, st.st_mode, st.st_uid, st.st_gid,
            st.st_atime_ns, st.st_mtime_ns, st.st_ctime_ns)


def relative(value):
    p = PurePosixPath(value)
    if p.is_absolute() or not p.parts or any(x in ('', '.', '..') for x in p.parts):
        fail('Unsafe relative path: ' + str(value))
    if '\\' in value or '\x00' in value:
        fail('Invalid relative path: ' + str(value))
    return p.as_posix()


def source_pin(pin):
    p = Path(pin['source']).absolute()
    if not SHA.fullmatch(pin['sha256']):
        fail('Invalid SHA-256 pin')
    st = p.lstat()
    if not stat.S_ISREG(st.st_mode):
        fail('Pinned source is not a regular file: ' + str(p))
    size, sha = digest(p)
    if size != pin['bytes'] or sha != pin['sha256']:
        fail('Pinned source mismatch: ' + str(p))
    if stability(st) != stability(p.lstat()):
        fail('Pinned source mutated while reading: ' + str(p))
    return {'source': str(p), 'bytes': size, 'sha256': sha, **metadata(st)}


def json_records(value):
    if isinstance(value, dict):
        yield value
        for v in value.values():
            yield from json_records(v)
    elif isinstance(value, list):
        for v in value:
            yield from json_records(v)


def list_root(p):
    paths = []
    def visit(current):
        flags = (os.O_RDONLY | getattr(os, 'O_DIRECTORY', 0)
                 | getattr(os, 'O_NOFOLLOW', 0) | getattr(os, 'O_NOATIME', 0))
        try:
            fd = os.open(current, flags)
        except PermissionError:
            fail('O_NOATIME directory scan denied: ' + str(current))
        try:
            with os.scandir(fd) as entries:
                names = sorted(x.name for x in entries)
        finally:
            os.close(fd)
        for name in names:
            q = current / name
            paths.append(q)
            if stat.S_ISDIR(q.lstat().st_mode):
                visit(q)
    visit(p)
    return sorted(paths, key=lambda x: x.relative_to(p).as_posix())


def zip_info(name):
    info = zipfile.ZipInfo(name, date_time=(1980, 1, 1, 0, 0, 0))
    info.create_system = 3
    info.external_attr = (stat.S_IFREG | 0o644) << 16
    info.compress_type = zipfile.ZIP_STORED
    info.flag_bits = 0
    return info


def within_base(path):
    p = path.absolute()
    if not p.is_relative_to(BASE) or p == BASE:
        fail('Output must be a new directory under ' + str(BASE))
    return p


def package(config_path, out):
    config = json.loads(Path(config_path).read_text())
    if config.get('schema') != 'cqc.pass16-preservation-input/1':
        fail('Unexpected configuration schema')
    if config.get('rootApproval') != 'GO PASS16 FINAL LOSSLESS PACK':
        fail('No explicit final packaging GO in the input configuration')
    out = within_base(Path(out))
    if out.exists():
        fail('Output already exists: ' + str(out))

    roots = config.get('roots', [])
    if not roots or len(roots) > 40:
        fail('Expected 1..40 explicitly closed roots')
    root_paths = {}
    root_records = []
    receipt_checks = []
    closure_member_pins = {}
    root_before = {}
    for item in roots:
        rid = item['id']
        if not ROOT_ID.fullmatch(rid) or rid in root_paths:
            fail('Invalid or duplicate root id')
        p = Path(item['source']).absolute()
        if p.is_symlink() or not p.is_dir() or item.get('closed') is not True:
            fail('Root is not explicitly closed or not a real directory: ' + str(p))
        if out.is_relative_to(p) or p.is_relative_to(out):
            fail('Source/output overlap')
        if any(p.is_relative_to(q) or q.is_relative_to(p) for q in root_paths.values()):
            fail('Overlapping source roots')
        receipt = source_pin(item['receipt'])
        if not Path(receipt['source']).is_relative_to(p):
            fail('Closure receipt is outside its root: ' + rid)
        root_paths[rid] = p
        root_before[rid] = stability(p.lstat())
        root_records.append({'id': rid, 'source': str(p),
                             'metadata': metadata(p.lstat()), 'receipt': receipt})
        receipt_checks.append(item['receipt'])
        with reader(receipt['source']) as handle:
            receipt_doc = json.load(handle)
        expected_members = {}
        for candidate in json_records(receipt_doc):
            sha, size = candidate.get('sha256'), candidate.get('bytes')
            if not isinstance(sha, str) or not SHA.fullmatch(sha) or not isinstance(size, int):
                continue
            # Only real member pins are enforced; external links stay documentary.
            rel = candidate.get('relative') or candidate.get('relativePath')
            if rel is None:
                absolute = candidate.get('path') or candidate.get('file')
                if isinstance(absolute, str) and Path(absolute).is_absolute() and Path(absolute).is_relative_to(p):
                    rel = Path(absolute).relative_to(p).as_posix()
            if isinstance(rel, str):
                rel = relative(rel)
                if rel in expected_members and expected_members[rel] != (size, sha):
                    fail('Conflicting member pins in closure receipt: ' + rid + '/' + rel)
                expected_members[rel] = (size, sha)
        closure_member_pins[rid] = expected_members

    references = []
    by_hash = {}
    for item in config.get('gitReferences', []):
        rec = source_pin(item)
        git_path = relative(item['gitPath'])
        if item.get('kind') == 'runtime' and not git_path.startswith('public/cqc/'):
            fail('Runtime Git reference must begin public/cqc/')
        if item.get('kind') not in ('runtime', 'historic'):
            fail('Git reference kind must be runtime or historic')
        rec.update({'kind': item['kind'], 'gitPath': git_path})
        if item.get('commit'):
            if not re.fullmatch(r'[0-9a-f]{40}', item['commit']):
                fail('Historic reference needs a full Git commit SHA')
            rec['commit'] = item['commit']
        elif item['kind'] == 'historic':
            fail('Historic Git references require a pinned commit')
        references.append(rec)
        by_hash.setdefault(rec['sha256'], rec)

    known_links = {(x['rootId'], relative(x['path'])): x
                   for x in config.get('knownSymlinks', [])}
    records = []
    contents = {}
    root_names = {}
    before = {}
    for rid, p in sorted(root_paths.items()):
        names = list_root(p)
        root_names[rid] = [x.relative_to(p).as_posix() for x in names]
        for q in names:
            rel = relative(q.relative_to(p).as_posix())
            st = q.lstat()
            before[(rid, rel)] = stability(st)
            rec = {'rootId': rid, 'path': rel, **metadata(st)}
            if stat.S_ISDIR(st.st_mode):
                rec['type'] = 'directory'
            elif stat.S_ISREG(st.st_mode):
                size, sha = digest(q)
                rec.update({'type': 'file', 'bytes': size, 'sha256': sha})
                if stability(q.lstat()) != stability(st):
                    fail('Source mutated during inventory: ' + str(q))
                expected = closure_member_pins[rid].get(rel)
                if expected is not None and expected != (size, sha):
                    fail('Closed receipt member hash mismatch: ' + rid + '/' + rel)
                if sha in contents and contents[sha]['bytes'] != size:
                    fail('SHA collision with a different size')
                contents.setdefault(sha, {'bytes': size, 'source': str(q)})
            elif stat.S_ISLNK(st.st_mode):
                link = known_links.get((rid, rel))
                if not link or os.readlink(q) != link['target']:
                    fail('Unapproved symlink: ' + str(q))
                target_rid = link['targetRootId']
                target_rel = relative(link['targetPath'])
                if target_rid not in root_paths:
                    fail('Symlink target is not an included root')
                actual_target = q.resolve(strict=True)
                expected = root_paths[target_rid] / target_rel
                if actual_target != expected or not expected.is_file() or expected.is_symlink():
                    fail('Symlink target mismatch: ' + str(q))
                size, sha = digest(expected)
                rec.update({'type': 'symlink', 'target': link['target'],
                            'targetRootId': target_rid, 'targetPath': target_rel,
                            'bytes': size, 'sha256': sha})
            else:
                fail('Non-file source member: ' + str(q))
            records.append(rec)
            if len(records) > MAX_FILES:
                fail('Too many source members')
        missing = set(closure_member_pins[rid]) - set(root_names[rid])
        if missing:
            fail('Closed receipt member missing: ' + rid + '/' + sorted(missing)[0])

    external_files = []
    for i, item in enumerate(config.get('externalFiles', [])):
        pin = source_pin(item)
        eid = item.get('id', 'external-' + str(i + 1))
        if not ROOT_ID.fullmatch(eid):
            fail('Invalid external file id')
        rec = {'externalId': eid, 'path': pin['source'], 'type': 'external-file',
               **{k: v for k, v in pin.items() if k != 'source'}}
        external_files.append(rec)
        contents.setdefault(pin['sha256'], {'bytes': pin['bytes'], 'source': pin['source']})

    aliases = []
    for item in config.get('originalAliases', []):
        pin = source_pin(item)
        target = contents.get(pin['sha256']) or by_hash.get(pin['sha256'])
        if not target or pin['bytes'] != target['bytes']:
            fail('Original alias has no included byteexact target: ' + pin['source'])
        contents.setdefault(pin['sha256'], {'bytes': target['bytes'], 'source': target['source']})
        aliases.append({'originalPath': pin['source'],
                        **{k: v for k, v in pin.items() if k != 'source'},
                        'aliasKind': item.get('aliasKind', 'original-imagegen')})

    payload_size = sum(x['bytes'] for sha, x in contents.items() if sha not in by_hash)
    if payload_size > config.get('maxPayloadBytes', MAX_PAYLOAD) or payload_size > MAX_PAYLOAD:
        fail('Deduplicated payload exceeds the authorized 200 MiB budget')
    out.mkdir(parents=True)
    chunks = []
    blob_records = {}
    z = None
    current_raw = 0
    current_names = []
    current_path = None

    def close_chunk():
        nonlocal z, current_path, current_raw, current_names
        if z is None:
            return
        z.close()
        final = current_path.with_suffix('.zip')
        os.replace(current_path, final)
        size, sha = digest(final)
        if size > MAX_ZIP:
            fail('ZIP chunk exceeds 8 MiB')
        with zipfile.ZipFile(final) as verify:
            if verify.testzip() is not None:
                fail('ZIP CRC verification failed')
        chunks.append({'file': final.name, 'bytes': size, 'sha256': sha,
                       'rawBytes': current_raw, 'entries': current_names})
        z = None
        current_raw = 0
        current_names = []

    for sha, blob in sorted(contents.items()):
        if sha in by_hash:
            if blob['bytes'] != by_hash[sha]['bytes']:
                fail('Git reference content size mismatch')
            blob_records[sha] = {'bytes': blob['bytes'], 'storage': 'git',
                                 'gitPath': by_hash[sha]['gitPath'],
                                 'kind': by_hash[sha]['kind']}
            if by_hash[sha].get('commit'):
                blob_records[sha]['commit'] = by_hash[sha]['commit']
            continue
        segments = []
        offset = 0
        actual_hash = hashlib.sha256()
        with reader(blob['source']) as handle:
            while True:
                data = handle.read(SEGMENT_BYTES)
                if not data:
                    break
                if z is not None and current_raw + len(data) > TARGET_RAW:
                    close_chunk()
                if z is None:
                    current_path = out / ('sources-%03d.tmp' % (len(chunks) + 1))
                    z = zipfile.ZipFile(current_path, 'x', compression=zipfile.ZIP_STORED,
                                        allowZip64=False)
                name = 'blobs/' + sha + '/%06d.bin' % len(segments)
                z.writestr(zip_info(name), data)
                current_raw += len(data)
                current_names.append(name)
                segments.append({'chunk': 'sources-%03d.zip' % (len(chunks) + 1),
                                 'entry': name, 'offset': offset, 'bytes': len(data),
                                 'sha256': hashlib.sha256(data).hexdigest(),
                                 'crc32': '%08x' % (zlib.crc32(data) & 0xffffffff)})
                actual_hash.update(data)
                offset += len(data)
        if offset != blob['bytes'] or actual_hash.hexdigest() != sha:
            fail('Source changed while packaging: ' + blob['source'])
        blob_records[sha] = {'bytes': blob['bytes'], 'storage': 'chunks',
                             'segments': segments}
    close_chunk()

    # Inventory and closed receipts are checked again after every source read.
    for rid, p in root_paths.items():
        if stability(p.lstat()) != root_before[rid]:
            fail('Root directory metadata changed while packaging: ' + rid)
        if root_names[rid] != [q.relative_to(p).as_posix() for q in list_root(p)]:
            fail('Source root members changed while packaging: ' + rid)
        for rel in root_names[rid]:
            if stability((p / rel).lstat()) != before[(rid, rel)]:
                fail('Source metadata changed while packaging: ' + rid + '/' + rel)
    for receipt in receipt_checks:
        source_pin(receipt)

    manifest = {'schema': 'cqc.pass16-lossless-package/1', 'closed': True,
                'deterministicZip': {'compression': 'STORED', 'date': '1980-01-01',
                                     'maxBytes': MAX_ZIP, 'targetRawBytes': TARGET_RAW},
                'roots': root_records, 'members': records,
                'externalFiles': external_files, 'originalAliases': aliases,
                'gitReferences': sorted(references, key=lambda x: x['gitPath']),
                'contents': blob_records, 'chunks': chunks,
                'stats': {'sourceFiles': sum(x['type'] == 'file' for x in records),
                          'sourceDirectories': sum(x['type'] == 'directory' for x in records),
                          'sourceSymlinks': sum(x['type'] == 'symlink' for x in records),
                          'logicalSourceBytes': sum(x.get('bytes', 0) for x in records
                                                    if x['type'] == 'file')
                                                + sum(x['bytes'] for x in external_files),
                          'uniqueContentCount': len(contents),
                          'uniquePayloadBytes': payload_size,
                          'gitReferencedBytes': sum(x['bytes'] for sha, x in contents.items()
                                                    if sha in by_hash),
                          'archiveBytes': sum(x['bytes'] for x in chunks)},
                'closedReceiptMemberPinsVerified': {rid: len(pins) for rid, pins in closure_member_pins.items()},
                'qualifications': config.get('qualifications', []),
                'metadataLimits': ['ctime is inventoried and cannot be set by ordinary restoration.',
                                   'uid/gid are inventoried; restoration never requests privilege.',
                                   'Absolute historical source paths are documentary only; restoration uses a new fixture.',
                                   'Native PNG bytes are preserved; no image transformation is performed.']}
    atomic_json(out / 'LOSSLESS_MANIFEST_V1.json', manifest)
    input_copy = {**config, 'configurationSource': str(Path(config_path).absolute())}
    atomic_json(out / 'PACK_INPUT_V1.json', input_copy)
    print(json.dumps({'output': str(out), 'stats': manifest['stats'],
                      'chunks': len(chunks), 'originalAliases': len(aliases)}, ensure_ascii=False))


def validate_manifest(manifest):
    if manifest.get('schema') != 'cqc.pass16-lossless-package/1' or manifest.get('closed') is not True:
        fail('Unexpected or open manifest')
    roots = {x['id'] for x in manifest['roots']}
    if len(roots) != len(manifest['roots']) or not all(ROOT_ID.fullmatch(x) for x in roots):
        fail('Invalid root identifiers')
    seen = set()
    for item in manifest['members']:
        pair = (item['rootId'], relative(item['path']))
        if pair[0] not in roots or pair in seen:
            fail('Invalid/duplicate member')
        seen.add(pair)
        if item['type'] not in ('file', 'directory', 'symlink'):
            fail('Unexpected member type')
        if item['type'] == 'file' and item['sha256'] not in manifest['contents']:
            fail('Missing content for member')
    if len(seen) > MAX_FILES:
        fail('Too many source members')
    for sha, blob in manifest['contents'].items():
        if not SHA.fullmatch(sha) or not isinstance(blob['bytes'], int) or blob['bytes'] < 0:
            fail('Invalid content record')
        if blob['storage'] == 'git':
            relative(blob['gitPath'])
        elif blob['storage'] != 'chunks':
            fail('Unexpected content storage')


def restore(manifest_path, target, repository, max_bytes, create_aliases=True):
    mp = Path(manifest_path).absolute()
    manifest = json.loads(mp.read_text())
    validate_manifest(manifest)
    target = within_base(Path(target))
    if target.exists():
        fail('Restoration target already exists: ' + str(target))
    repository = Path(repository).absolute()
    if not repository.is_dir() or repository.is_symlink():
        fail('Repository must be an existing real directory')
    required = manifest['stats']['logicalSourceBytes'] + sum(x['bytes'] for x in manifest['originalAliases'])
    if required > max_bytes:
        fail('Fixture exceeds explicitly allowed restoration size')
    chunk_map = {}
    for item in manifest['chunks']:
        name = relative(item['file'])
        if '/' in name or item['bytes'] > MAX_ZIP:
            fail('Unsafe or oversized ZIP chunk')
        path = mp.parent / name
        size, sha = digest(path)
        if size != item['bytes'] or sha != item['sha256']:
            fail('Archive pin mismatch: ' + name)
        z = zipfile.ZipFile(path)
        names = z.namelist()
        if names != item['entries'] or len(names) != len(set(names)):
            fail('ZIP entry list mismatch')
        if any(x.compress_type != zipfile.ZIP_STORED or x.file_size > SEGMENT_BYTES
               or x.flag_bits & 1 for x in z.infolist()):
            fail('Unexpected compression, encryption, or segment size')
        if z.testzip() is not None:
            fail('ZIP CRC check failed')
        chunk_map[name] = z

    target.mkdir(parents=True)
    proofs = {'schema': 'cqc.pass16-lossless-restore-proof/1',
              'manifest': str(mp), 'fixture': str(target), 'status': 'in-progress',
              'verifiedArchiveCRC': len(chunk_map), 'files': [], 'aliases': [],
              'references': [], 'directories': []}
    contents = manifest['contents']
    produced = {}

    def write_content(sha, dest):
        blob = contents[sha]
        h = hashlib.sha256()
        count = 0
        dest.parent.mkdir(parents=True, exist_ok=True)
        with dest.open('xb') as handle:
            if blob['storage'] == 'git':
                gp = repository / relative(blob['gitPath'])
                if gp.is_symlink() or not gp.is_file() or not gp.resolve().is_relative_to(repository.resolve()):
                    fail('Unsafe or missing Git reference: ' + str(gp))
                with reader(gp) as original:
                    while True:
                        data = original.read(1024 * 1024)
                        if not data:
                            break
                        h.update(data); count += len(data); handle.write(data)
                proofs['references'].append({'gitPath': blob['gitPath'], 'sha256': sha,
                                               'bytes': count, 'verified': True})
            else:
                offset = 0
                for segment in blob['segments']:
                    if segment['offset'] != offset or segment['bytes'] > SEGMENT_BYTES:
                        fail('Invalid content segment offset')
                    archive = chunk_map.get(segment['chunk'])
                    if archive is None:
                        fail('Missing archive segment')
                    data = archive.read(segment['entry'])
                    if len(data) != segment['bytes'] or hashlib.sha256(data).hexdigest() != segment['sha256']:
                        fail('Segment SHA mismatch')
                    if '%08x' % (zlib.crc32(data) & 0xffffffff) != segment['crc32']:
                        fail('Segment CRC mismatch')
                    h.update(data); count += len(data); offset += len(data); handle.write(data)
        if count != blob['bytes'] or h.hexdigest() != sha:
            fail('Restored content hash mismatch: ' + str(dest))
        return count

    def apply_metadata(path, rec, symlink=False):
        if not symlink:
            os.chmod(path, rec['mode'])
        os.utime(path, ns=(rec['atime_ns'], rec['mtime_ns']), follow_symlinks=not symlink)

    for item in manifest['roots']:
        (target / item['id']).mkdir()
    dirs = [x for x in manifest['members'] if x['type'] == 'directory']
    for item in sorted(dirs, key=lambda x: len(PurePosixPath(x['path']).parts)):
        (target / item['rootId'] / item['path']).mkdir(exist_ok=True)
    for item in manifest['members']:
        if item['type'] != 'file':
            continue
        dest = target / item['rootId'] / item['path']
        count = write_content(item['sha256'], dest)
        apply_metadata(dest, item)
        st = dest.lstat()
        if stat.S_IMODE(st.st_mode) != item['mode'] or st.st_mtime_ns != item['mtime_ns']:
            fail('Restored file metadata mismatch')
        produced.setdefault(item['sha256'], dest)
        proofs['files'].append({'rootId': item['rootId'], 'path': item['path'],
                                'bytes': count, 'sha256': item['sha256'],
                                'mode': stat.S_IMODE(st.st_mode),
                                'mtime_ns': st.st_mtime_ns, 'verified': True})
    for item in manifest.get('externalFiles', []):
        dest = target / 'external' / item['externalId'] / Path(item['path']).name
        write_content(item['sha256'], dest)
        apply_metadata(dest, item)
        produced.setdefault(item['sha256'], dest)
        proofs['files'].append({'externalId': item['externalId'], 'bytes': item['bytes'],
                                'sha256': item['sha256'], 'verified': True})
    for item in manifest['members']:
        if item['type'] != 'symlink':
            continue
        link = target / item['rootId'] / item['path']
        dest = target / item['targetRootId'] / relative(item['targetPath'])
        if not dest.is_file() or dest.is_symlink():
            fail('Restored symlink target is missing')
        link.symlink_to(os.path.relpath(dest, link.parent))
        apply_metadata(link, item, symlink=True)
        if digest(link.resolve()) != (item['bytes'], item['sha256']):
            fail('Restored symlink target hash mismatch')
    for i, item in enumerate(manifest['originalAliases']):
        # The absolute tool path is documented; it is never written or replaced.
        alias = target / 'aliases' / ('%04d' % (i + 1)) / Path(item['originalPath']).name
        if create_aliases:
            write_content(item['sha256'], alias)
            apply_metadata(alias, item)
            if digest(alias) != (item['bytes'], item['sha256']):
                fail('Restored original alias mismatch')
        proofs['aliases'].append({'originalPath': item['originalPath'],
                                  'fixturePath': str(alias) if create_aliases else None,
                                  'sha256': item['sha256'], 'bytes': item['bytes'],
                                  'verified': create_aliases})
    for item in sorted(dirs, key=lambda x: len(PurePosixPath(x['path']).parts), reverse=True):
        dest = target / item['rootId'] / item['path']
        apply_metadata(dest, item)
        proofs['directories'].append({'rootId': item['rootId'], 'path': item['path'],
                                       'mode': item['mode'], 'mtime_ns': item['mtime_ns']})
    for item in manifest['roots']:
        apply_metadata(target / item['id'], item['metadata'])
    for z in chunk_map.values():
        z.close()
    proofs.update({'status': 'passed', 'verifiedFiles': len(proofs['files']),
                   'verifiedOriginalAliases': sum(x['verified'] for x in proofs['aliases']),
                   'note': 'UID/GID/ctime inventory is retained; no privilege or source overwrite requested.'})
    atomic_json(target.parent / (target.name + '-RESTORE_PROOF_V1.json'), proofs)
    print(json.dumps({'status': 'passed', 'fixture': str(target),
                      'files': proofs['verifiedFiles'],
                      'aliases': proofs['verifiedOriginalAliases'],
                      'crcChunks': len(chunk_map)}, ensure_ascii=False))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest='command', required=True)
    pack = sub.add_parser('pack')
    pack.add_argument('--config', required=True)
    pack.add_argument('--out', required=True)
    extract = sub.add_parser('restore')
    extract.add_argument('--manifest', required=True)
    extract.add_argument('--target', required=True)
    extract.add_argument('--repository', required=True)
    extract.add_argument('--max-bytes', required=True, type=int)
    args = parser.parse_args()
    try:
        if args.command == 'pack':
            package(args.config, args.out)
        else:
            restore(args.manifest, args.target, args.repository, args.max_bytes)
    except (ValueError, OSError, KeyError, zipfile.BadZipFile) as error:
        print('FAILED: ' + str(error), file=sys.stderr)
        return 2
    return 0


if __name__ == '__main__':
    sys.exit(main())
