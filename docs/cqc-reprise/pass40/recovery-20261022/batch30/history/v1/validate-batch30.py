#!/usr/bin/env python3
"""Validate recoverable batch inputs; a valid draft is never a delivered batch."""
from pathlib import Path
import argparse
import datetime as dt
import hashlib
import json
import stat
import struct
import zlib
from urllib.parse import urlparse

SCHEMA = 'cqc.pass40.batch30/1'
CAMOS = ['soviet-woodland', 'urban-tiger', 'klmk', 'former-east-germany',
         'former-west-germany', 'night-desert', 'chameleon', 'watersnake',
         'flower', 'santa-claus', 'mummy', 'grenade', 'rock', 'barracuda']
ORIGINALS = [
    ('core__eva_mgs3', 'cyborg', 'MGS3-PS2-2004-EVA'),
    ('core__liquid', 'nextgen', 'MGS1-PS1-1998-LIQUID'),
    ('core__venus', 'retro-msx', 'METAL-GEAR-ACID-2-VENUS'),
    ('core__skull_armor', 'retro-msx', 'MGSV-ARMORED-SKULL'),
    ('core__meryl_mgs1', 'survive', 'MGS1-PS1-1998-MERYL'),
    ('core__boss', 'metalgear', 'MGS3-PS2-2004-THE-BOSS'),
    ('core__quiet', 'cyborg', 'MGSV-QUIET'),
    ('core__amanda_pw', 'tuxedo', 'PEACE-WALKER-AMANDA'),
    ('core__mistral', 'tuxedo', 'MGR-MISTRAL'),
]
UNITS = [
    ('roster', 'pass40__raiden_r00', 'MGR-R00-STANDARD-BODY'),
    ('roster', 'pass19__detonator_survive', 'SURVIVE-DETONATOR'),
    ('roster', 'pass19__watcher_survive', 'SURVIVE-WATCHER'),
    ('roster', 'pass19__grabber_survive', 'SURVIVE-GRABBER'),
    ('machine', 'pass40__powered_suit_mgs4', 'MGS4-POWERED-SUIT'),
    ('machine', 'pass19__fenrir_mgr', 'MGR-LQ84-FENRIR-RAILGUN'),
    ('machine', 'pass19__vodomjerka_mgr', 'MGR-VODOMJERKA-TRIPOD'),
]
ADMITTED = {'ready', 'complete', 'published'}
STATUSES = ADMITTED | {'needs-source-regeneration', 'draft-art', 'hold'}
CHECKS = {'referencesReviewed', 'nativeFacingsIndependentlyReviewed', 'geometryAndFloor',
          'completeActions', 'runtimeBothFacings', 'noFallback', 'bothGamesIntegrated'}
MACHINE_CHECKS = {'articulatedJoints', 'weaponAiming', 'destructionAttachments', 'fixedWorldRoot'}

class Invalid(ValueError):
    pass

def require(condition, message):
    if not condition:
        raise Invalid(message)

def canonical(value):
    return json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(',', ':')).encode()

def digest(value):
    return hashlib.sha256(canonical(value)).hexdigest()

def contract(kind, uid, option_id, incarnation, origin):
    return {'id': kind + ':' + uid + (':' + option_id if option_id else ''),
            'kind': kind, 'uid': uid, 'optionId': option_id, 'incarnation': incarnation,
            'origin': origin, 'newFamilyCoverage': False}

def expected_contracts():
    rows = [contract('costume', 'core__snake', 'mgs3-camo-' + name,
                     'MGS3-PS2-2004-NAKED-SNAKE-PRE-INJURY', 'canonical') for name in CAMOS]
    rows += [contract('costume', uid, option, incarnation, 'original')
             for uid, option, incarnation in ORIGINALS]
    rows += [contract(kind, uid, None, incarnation, 'canonical') for kind, uid, incarnation in UNITS]
    return rows

def iso(value):
    try:
        parsed = dt.datetime.fromisoformat(value.replace('Z', '+00:00'))
        require(parsed.tzinfo is not None, 'UTC timestamp must include timezone')
        return parsed
    except (AttributeError, ValueError, TypeError) as error:
        raise Invalid('Invalid timestamp') from error

def safe_file(root, relative, fixture=False):
    require(isinstance(relative, str) and bool(relative), 'Missing artifact path')
    require('\\' not in relative and '\x00' not in relative, 'Non-portable artifact path')
    path = Path(relative)
    require(not path.is_absolute() and '..' not in path.parts and '.' not in path.parts,
            'Artifact path escapes durable root')
    # This private argument is for isolated unit fixtures only, never a CLI option.
    require(fixture or root.is_relative_to('/workspace'), 'Durable artifact root must be under /workspace')
    cursor = root
    for part in path.parts:
        cursor = cursor / part
        try:
            mode = cursor.lstat().st_mode
        except OSError as error:
            raise Invalid('Missing artifact: ' + relative) from error
        require(not stat.S_ISLNK(mode), 'Artifact path contains symlink: ' + relative)
    require(stat.S_ISREG(cursor.lstat().st_mode), 'Artifact must be a regular file')
    require(cursor.resolve().is_relative_to(root), 'Artifact path escapes durable root')
    return cursor

def checked_pin(root, pin, fixture=False):
    require(isinstance(pin, dict), 'Missing artifact pin')
    path = safe_file(root, pin.get('path'), fixture)
    size = path.stat().st_size
    require(type(pin.get('bytes')) is int and size == pin['bytes'] and 0 < size <= 32 * 1024 * 1024,
            'Artifact byte count differs: ' + pin['path'])
    data = path.read_bytes()
    require(hashlib.sha256(data).hexdigest() == pin.get('sha256'),
            'Artifact SHA256 differs: ' + pin['path'])
    return data

def png_dimensions(data):
    require(data[:8] == b'\x89PNG\r\n\x1a\n', 'Source is not a PNG')
    offset, chunks, dims, compressed = 8, [], None, []
    while offset < len(data):
        require(offset + 12 <= len(data), 'Truncated PNG chunk')
        size = struct.unpack('>I', data[offset:offset + 4])[0]
        kind = data[offset + 4:offset + 8]
        end = offset + 12 + size
        require(end <= len(data), 'Truncated PNG payload')
        payload = data[offset + 8:offset + 8 + size]
        crc = struct.unpack('>I', data[end - 4:end])[0]
        require(zlib.crc32(kind + payload) & 0xffffffff == crc, 'PNG chunk CRC differs')
        chunks.append(kind)
        if kind == b'IHDR':
            require(len(chunks) == 1 and size == 13, 'Invalid PNG header')
            w, h, depth, colour, compression, filtering, interlace = struct.unpack('>IIBBBBB', payload)
            require(0 < w <= 8192 and 0 < h <= 8192, 'Invalid PNG dimensions')
            depths = {0: {1, 2, 4, 8, 16}, 2: {8, 16}, 3: {1, 2, 4, 8}, 4: {8, 16}, 6: {8, 16}}
            require(depth in depths.get(colour, set()) and compression == 0 and filtering == 0
                    and interlace in {0, 1}, 'Invalid PNG encoding')
            dims = (w, h)
        if kind == b'IDAT':
            compressed.append(payload)
        if kind == b'IEND':
            require(size == 0 and end == len(data), 'PNG has data after IEND')
        offset = end
    require(dims is not None and chunks[-1:] == [b'IEND'] and b'IDAT' in chunks,
            'Incomplete PNG')
    channels = {0: 1, 2: 3, 3: 1, 4: 2, 6: 4}[colour]
    passes = [(0, 0, 1, 1)] if interlace == 0 else [
        (0, 0, 8, 8), (4, 0, 8, 8), (0, 4, 4, 8), (2, 0, 4, 4),
        (0, 2, 2, 4), (1, 0, 2, 2), (0, 1, 1, 2)]
    scanlines = []
    for x, y, dx, dy in passes:
        pw, ph = max(0, (w - x + dx - 1) // dx), max(0, (h - y + dy - 1) // dy)
        if pw and ph:
            scanlines.extend([(pw * channels * depth + 7) // 8] * ph)
    # Verify the actual deflate stream and every scanline filter in bounded buffers.
    # No source pixels are edited and no decoded raster is retained.
    row, remaining = 0, 0
    def consume(decoded):
        nonlocal row, remaining
        pos = 0
        while pos < len(decoded):
            if remaining == 0:
                require(row < len(scanlines), 'PNG decoded payload exceeds dimensions')
                require(decoded[pos] <= 4, 'Invalid PNG scanline filter')
                remaining = scanlines[row]
                row += 1
                pos += 1
            amount = min(remaining, len(decoded) - pos)
            remaining -= amount
            pos += amount
    inflater = zlib.decompressobj()
    try:
        for payload in compressed:
            pending = payload
            while pending:
                consume(inflater.decompress(pending, 65536))
                pending = inflater.unconsumed_tail
        consume(inflater.flush())
    except zlib.error as error:
        raise Invalid('Invalid PNG deflate stream') from error
    require(inflater.eof and not inflater.unused_data and row == len(scanlines) and remaining == 0,
            'PNG decoded payload differs from dimensions')
    return dims

def input_digest(entry):
    expected = next((row for row in expected_contracts() if row['id'] == entry.get('id')), None)
    require(expected is not None, 'Entry is outside the batch contract')
    return digest({'identity': expected, 'sources': entry.get('sources', []),
                   'implementation': entry.get('implementation', []),
                   'references': entry.get('references', []), 'hold': entry.get('hold')})

def validate(manifest, root, *, _fixture=False):
    root = Path(root).absolute()
    require(root.is_dir() and root.resolve() == root, 'Durable root must not contain a symlink')
    require(isinstance(manifest, dict), 'Manifest must be an object')
    require(manifest.get('schema') == SCHEMA, 'Unsupported manifest schema')
    require(manifest.get('preserveSeparateIncarnations') is True, 'Separate incarnations must be preserved')
    require(manifest.get('inheritedApprovalsAccepted') is False, 'Inherited approvals cannot admit regenerated art')
    require(manifest.get('scope') == {'canonicalCostumes': 14, 'originalCostumes': 9,
                                    'rosterUnits': 4, 'articulatedMachines': 3, 'total': 30}, 'Batch counts differ')
    incident_data = checked_pin(root, manifest.get('recoveryIncident'), _fixture)
    incident = json.loads(incident_data)
    require(isinstance(incident, dict) and incident.get('schema') == 'cqc.pass40.reprise-local-recovery-incident/1', 'Wrong recovery incident')
    incident_time = iso(incident.get('observedUTC'))
    checked_pin(root, manifest.get('sevenUnitRecoveryAudit'), _fixture)
    entries = manifest.get('entries')
    require(isinstance(entries, list) and len(entries) == 30, 'Batch must contain exactly 30 entries')
    expected = {row['id']: row for row in expected_contracts()}
    seen, uid_options, source_hashes = set(), set(), set()
    counts = {'draft': 0, 'ready': 0, 'complete': 0, 'published': 0, 'hold': 0}
    for entry in entries:
        require(isinstance(entry, dict), 'Entry must be an object')
        key = entry.get('id')
        require(key not in seen and key in expected, 'Duplicate or unexpected entry ID')
        seen.add(key)
        identity = expected[key]
        for field, value in identity.items():
            require(entry.get(field) == value, 'Identity/incarnation differs: ' + key + '/' + field)
        pair = (entry.get('uid'), entry.get('optionId'))
        require(pair not in uid_options, 'Duplicate UID/option')
        uid_options.add(pair)
        status = entry.get('status')
        require(status in STATUSES, 'Unsupported entry status')
        require(type(entry.get('hold')) is bool, 'Hold flag must be explicit')
        require(entry.get('inheritedApprovalUsed') is False, 'Historical approval cannot be reused')
        sources = entry.get('sources')
        require(isinstance(sources, list) and len(sources) <= 48, 'Sources must be a bounded list')
        face_hashes = {'right': set(), 'left': set()}
        source_ids = set()
        for source in sources:
            require(isinstance(source, dict), 'Source must be an object')
            require(source.get('id') and source['id'] not in source_ids, 'Duplicate source ID')
            source_ids.add(source['id'])
            require(source.get('facing') in face_hashes, 'Source facing must be right or left')
            data = checked_pin(root, source, _fixture)
            require(png_dimensions(data) == (source.get('width'), source.get('height')), 'PNG dimensions differ')
            sha = source['sha256']
            require(sha not in source_hashes, 'Source PNG reused across facings or entries')
            source_hashes.add(sha)
            face_hashes[source['facing']].add(sha)
        require(isinstance(entry.get('implementation'), list), 'Implementation must be a list')
        for code in entry['implementation']:
            checked_pin(root, code, _fixture)
        require(isinstance(entry.get('references'), list), 'References must be a list')
        require(all(isinstance(ref, dict) and isinstance(ref.get('url'), str)
                    and urlparse(ref['url']).scheme == 'https' and urlparse(ref['url']).netloc
                    and ref.get('scope') for ref in entry['references']),
                'Reference must have an HTTPS URL and explicit reviewed scope')
        if status not in ADMITTED:
            require(not entry.get('qa'), 'Unadmitted entry must not present an approval as current QA')
            require(status != 'hold' or entry['hold'], 'HOLD status requires hold flag')
            counts['hold' if status == 'hold' or entry['hold'] else 'draft'] += 1
            continue
        require(not entry['hold'], 'HOLD entry cannot be ready, complete or published')
        require(len(sources) >= 2 and all(face_hashes.values()), 'Independent right and left source PNGs are required')
        require(entry['implementation'], 'Missing implementation files')
        require(entry['references'], 'Missing fidelity references')
        qa = json.loads(checked_pin(root, entry.get('qa'), _fixture))
        require(isinstance(qa, dict) and qa.get('schema') == 'cqc.pass40.batch30.entry-qa/1' and qa.get('status') == 'approved', 'QA is not approved')
        require(qa.get('entryId') == key and qa.get('inputDigest') == input_digest(entry), 'QA is stale or bound to different inputs')
        require(iso(qa.get('reviewedUTC')) >= incident_time, 'QA predates the recovery incident')
        require(qa.get('inheritedApprovalUsed') is False and qa.get('reviewer'), 'QA must be newly reviewed')
        checks = CHECKS | (MACHINE_CHECKS if entry['kind'] == 'machine' else set())
        require(all(qa.get('checks', {}).get(check) is True for check in checks), 'Required QA check is missing')
        evidence = qa.get('evidence')
        require(isinstance(evidence, list) and evidence, 'Missing physical QA evidence')
        for item in evidence:
            checked_pin(root, item, _fixture)
        if status == 'published':
            publication = entry.get('publication', {})
            require(isinstance(publication, dict), 'Missing publication record')
            for field in ('productCommit', 'sourceArchiveCommit'):
                value = publication.get(field, '')
                require(len(value) == 40 and all(c in '0123456789abcdef' for c in value), 'Missing immutable publication commit')
            require(isinstance(publication.get('deploymentURL'), str)
                    and urlparse(publication['deploymentURL']).scheme == 'https'
                    and urlparse(publication['deploymentURL']).netloc, 'Missing published deployment URL')
            require(publication.get('verifiedProductCommit') == publication['productCommit'], 'Deployment commit was not verified')
            readback = json.loads(checked_pin(root, publication.get('readback'), _fixture))
            require(isinstance(readback, dict) and readback.get('schema') == 'cqc.pass40.batch30.entry-publication/1'
                    and readback.get('entryId') == key and readback.get('inputDigest') == input_digest(entry),
                    'Publication readback is stale or belongs to another entry')
            require(all(readback.get(field) == publication[field]
                        for field in ('productCommit', 'sourceArchiveCommit', 'deploymentURL')), 'Publication readback differs')
            require(readback.get('httpChecksPassed') is True and readback.get('bothGamesVerified') is True,
                    'Public deployment checks are missing')
            require(iso(readback.get('verifiedUTC')) >= iso(qa['reviewedUTC']), 'Publication readback predates QA')
        counts[status] += 1
    require(seen == set(expected), 'Batch scope differs')
    held = manifest.get('excludedHolds', [])
    require(isinstance(held, list) and any(x.get('uid') == 'core__fatman' and x.get('optionId') == 'tuxedo'
            and x.get('status') == 'hold' and x.get('retryAllowed') is False for x in held), 'Fatman HOLD must remain outside the lot')
    completed = counts['complete'] + counts['published']
    return {'validation': 'PASS', 'meaning': 'manifest structure and claimed admission evidence verified; not a visual fidelity certificate',
            'entryCount': 30, 'counts': counts, 'completedCount': completed,
            'deliveredBatch30': completed == 30, 'publishedBatch30': counts['published'] == 30}

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('manifest', nargs='?', default=str(Path(__file__).with_name('manifest.json')))
    args = parser.parse_args()
    path = Path(args.manifest).absolute()
    try:
        result = validate(json.loads(path.read_text()), path.parent.parent)
    except (Invalid, OSError, ValueError, TypeError, KeyError) as error:
        print(json.dumps({'validation': 'FAIL', 'reason': str(error)}, ensure_ascii=False))
        raise SystemExit(1)
    print(json.dumps(result, ensure_ascii=False, indent=2))

if __name__ == '__main__':
    main()
