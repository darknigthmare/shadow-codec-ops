#!/usr/bin/env python3
"""Fresh synthetic tool proof; never enumerates or freezes production folders."""
import importlib.util
import json
import tempfile
import zipfile
from pathlib import Path

HERE = Path(__file__).parent
spec = importlib.util.spec_from_file_location('lossless', HERE / 'archive_pass14_lossless_v3.py')
A = importlib.util.module_from_spec(spec)
spec.loader.exec_module(A)

results = []


def expect_reject(label, spec_path, go_path, output, contains):
    try:
        A.create(spec_path, go_path, output)
    except ValueError as exc:
        assert contains in str(exc), str(exc)
        results.append({'case': label, 'passed': True, 'actualRejection': str(exc)})
    else:
        raise AssertionError(label + ' unexpectedly passed')


with tempfile.TemporaryDirectory(prefix='pass14-archive-fixture-', dir='/tmp') as raw:
    root = Path(raw)
    source = root / 'closed-fixture'
    source.mkdir()
    prior = root / 'prior-closed'
    prior.mkdir()
    existing = b'closed immutable original fixture\x00\xff'
    archive_path = prior / 'old.zip'
    with zipfile.ZipFile(archive_path, 'x', compression=zipfile.ZIP_STORED) as z:
        z.writestr('original-native-fixture', existing)
    prior_pin = A.sha(archive_path.read_bytes())
    index_path = prior / 'INDEX.json'
    A.dump(index_path, {'closed': True, 'actualRun': True, 'objects': [{'sha256': A.sha(existing), 'bytes': len(existing), 'archivePath': str(archive_path), 'archiveMember': 'original-native-fixture'}]})
    (source / 'original.png').write_bytes(existing)
    (source / 'duplicate.png').write_bytes(existing)
    # 9 MiB verifies genuine multi-volume split; generated fixture is never native art.
    large = bytes(range(256)) * (9 * 1024 * 1024 // 256)
    (source / 'large.fixture').write_bytes(large)
    closed = {'schema': 'cqc.pass14.closed-lossless-source-spec/1', 'closed': True,
              'allowedRoots': [str(source)], 'priorIndexes': [str(index_path)],
              'files': [{'path': str(path), 'bytes': path.stat().st_size, 'sha256': A.sha(path.read_bytes()), 'producerState': 'closed'} for path in source.iterdir()]}
    spec_path = root / 'SPEC.json'
    go_path = root / 'GO.json'
    A.dump(spec_path, closed)
    go = {'schema': 'cqc.pass14.root-archive-go/1', 'approved': True, 'closedSourceSpecSHA256': A.sha(spec_path.read_bytes()), 'priorIndexSHA256': {str(index_path): A.sha(index_path.read_bytes())}}
    A.dump(go_path, {**go, 'approved': False})
    expect_reject('Root GO is mandatory', spec_path, go_path, root / 'no-go', 'Root GO')
    assert not (root / 'no-go').exists()
    A.dump(go_path, go)
    result = A.create(spec_path, go_path, root / 'actual')
    assert result['logicalFileCount'] == 3 and result['uniqueObjectCount'] == 2 and result['existingMemberObjectCount'] == 1
    assert len(result['archives']) >= 2 and all(part['bytes'] <= A.LIMIT for part in result['archives'])
    assert archive_path.read_bytes() and A.sha(archive_path.read_bytes()) == prior_pin
    assert sum(part['bytes'] for part in result['archives']) >= len(large)
    predicted = A.pack_objects([obj for obj in result['objects'] if obj['storageKind'] == 'pass14-new-chunks'])
    assert [x['bytes'] for x in result['archives']] == [x['exactZIPBytes'] for x in predicted]
    results.append({'case': 'predicted exact ZIP_STORED sizes match real volumes', 'passed': True, 'volumeBytes': [x['bytes'] for x in result['archives']]})
    results.append({'case': 'actual bytes equality, SHA dedupe, old member reuse and <=8MiB volumes', 'passed': True, 'logicalFiles': 3, 'uniqueObjects': 2, 'reusedObjects': 1, 'archives': result['archives'], 'oldArchiveSHAUnchanged': True})
    next_spec = {**closed, 'priorIndexes': [str(root / 'actual/LOSSLESS_RECONSTRUCTION_INDEX.json')]}
    next_spec_path = root / 'NEXT_SPEC.json'
    next_go_path = root / 'NEXT_GO.json'
    A.dump(next_spec_path, next_spec)
    A.dump(next_go_path, {**go, 'closedSourceSpecSHA256': A.sha(next_spec_path.read_bytes()), 'priorIndexSHA256': {str(root / 'actual/LOSSLESS_RECONSTRUCTION_INDEX.json'): A.sha((root / 'actual/LOSSLESS_RECONSTRUCTION_INDEX.json').read_bytes())}})
    next_result = A.create(next_spec_path, next_go_path, root / 'next-actual')
    assert next_result['existingMemberObjectCount'] == 2 and next_result['archives'] == []
    results.append({'case': 'future index reuses own chunked objects without new ZIP or whole-archive copy', 'passed': True, 'reusedObjects': 2, 'newZIPCount': 0})
    expect_reject('existing output immutable', spec_path, go_path, root / 'actual', 'output must be new')
    (source / 'original.png').write_bytes(existing + b'changed')
    expect_reject('changed source fails pinned closure', spec_path, go_path, root / 'changed-source', 'source differs')
    (source / 'original.png').write_bytes(existing)
    # Same prior member metadata with changed member data proves SHA validation.
    with zipfile.ZipFile(archive_path, 'w', compression=zipfile.ZIP_STORED) as z:
        z.writestr('original-native-fixture', existing[:-1] + b'X')
    expect_reject('corrupted reused bytes fail', spec_path, go_path, root / 'changed-prior', 'member SHA/bytes')
    with zipfile.ZipFile(archive_path, 'w', compression=zipfile.ZIP_STORED) as z:
        z.writestr('original-native-fixture', existing)
    corrupt = bytearray(archive_path.read_bytes())
    corrupt[30 + len('original-native-fixture')] ^= 1
    archive_path.write_bytes(corrupt)
    try:
        A.read_member({'archivePath': str(archive_path), 'archiveMember': 'original-native-fixture', 'bytes': len(existing), 'sha256': A.sha(existing)})
    except zipfile.BadZipFile as exc:
        assert 'CRC' in str(exc)
        results.append({'case': 'actual ZIP payload corruption fails CRC', 'passed': True, 'actualRejection': str(exc)})
    else:
        raise AssertionError('ZIP payload CRC corruption unexpectedly passed')
    denied = source / '.env.local'
    denied.write_bytes(b'fixture')
    try:
        A.approved_source(str(denied), [source])
    except ValueError as exc:
        results.append({'case': 'credential/build/dependency filters', 'passed': True, 'actualRejection': str(exc)})
    else:
        raise AssertionError('denied path accepted')

A.dump(HERE / 'ARCHIVER_ACTUAL_SYNTHETIC_VERIFICATION_V3.json', {
    'schema': 'cqc.pass14.archive-tool-synthetic-verification/1', 'actualRun': True,
    'productionProducerOrQAFoldersReadOrFrozen': False, 'nativeImageEditing': False,
    'createdUTC': A.datetime.now(A.timezone.utc).isoformat(),
    'toolSHA256': A.sha((HERE / 'archive_pass14_lossless_v3.py').read_bytes()),
    'testScriptSHA256': A.sha(Path(__file__).read_bytes()),
    'passedCases': len(results), 'cases': results,
    'fixtureZIPsRemovedAfterVerification': True})
print(json.dumps({'passedCases': len(results), 'productionSourcesFrozen': False}))
