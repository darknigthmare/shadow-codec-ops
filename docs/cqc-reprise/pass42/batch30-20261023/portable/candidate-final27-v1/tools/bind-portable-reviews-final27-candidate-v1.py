#!/usr/bin/env python3
"""Bind new portable reviews only under a new exact global Root receipt.

Candidate code: no installer, compiler, downloader, Git, source rewrite, or
approval inference. The original reviews remain byte-identical evidence.
All reads and the one new output directory are confined to an explicitly
supplied canonical restoration root. Native PNG/App availability is left to
the unchanged compiler's own exact source and baseline checks.
"""
import argparse
import copy
from datetime import datetime, timezone
import hashlib
import json
import os
from pathlib import Path, PurePosixPath
import re
import stat
import struct

FIXED_MANIFEST_SHA = 'bee97de007bb1fc7bd9f7dadcec8f3e33d494480af57d7f3427f5d2cbf22fb8d'
SELECTION_SHA = 'f5844020da90da662a00c8c5c45c19ed2d3b6e7187687a858c8a798828a981d5'
PLAN_SHA = 'e322800edd6402c8aaa1096e6d21acd4ac25053901ee2302e17295c6ca4684c4'
SHA = re.compile(r'[a-f0-9]{64}')
BAD = re.compile(rb'/tmp/|/workspace/|exec-[0-9a-f-]{20,}|request[_-]?id', re.I)
ROOT_CHECKS = (
    'finiteMappingsOnly', 'allNumericRoleMaskGeometryLeavesExact',
    'originalReviewsByteIdentical', 'sourcePNGBytesUnchanged',
    'readOnlyBaselines', 'externalReferencesQualified',
    'newDerivedInputReviewsAuthorized', 'isolatedCompileOnly',
)
ART_CHECKS = ('identity', 'incarnation', 'nativeArt', 'semanticPoses',
              'equipment', 'ownership', 'framing')


def digest(data):
    return hashlib.sha256(data).hexdigest()


def parse(data):
    def pairs(rows):
        result = {}
        for key, value in rows:
            assert key not in result, 'Duplicate JSON object key'
            result[key] = value
        return result
    return json.loads(data, object_pairs_hook=pairs,
                      parse_int=lambda text: -0.0 if text == '-0' else int(text),
                      parse_constant=lambda text: (_ for _ in ()).throw(ValueError(text)))


def strict_equal(left, right):
    if type(left) is not type(right):
        return False
    if isinstance(left, float):
        return struct.pack('>d', left) == struct.pack('>d', right)
    if isinstance(left, dict):
        return left.keys() == right.keys() and all(strict_equal(left[k], right[k]) for k in left)
    if isinstance(left, list):
        return len(left) == len(right) and all(strict_equal(a, b) for a, b in zip(left, right))
    return left == right


def relative(value):
    assert isinstance(value, str) and re.fullmatch(r'[A-Za-z0-9_./-]+', value)
    path = PurePosixPath(value)
    assert not path.is_absolute() and value == str(path)
    assert all(part not in ('', '.', '..') for part in path.parts)
    return value


def canonical_root(value):
    path = Path(value)
    assert path.is_absolute() and path.resolve() == path
    assert path != Path('/') and path.is_dir() and not path.is_symlink()
    return path


def confined(root, value, existing=True):
    path = root / relative(value)
    assert path.resolve().is_relative_to(root) and path.resolve() == path
    if existing:
        assert path.exists() and path.is_file() and not path.is_symlink()
    return path


def read(root, value):
    path = confined(root, value)
    fd = os.open(path, os.O_RDONLY | os.O_NOFOLLOW | os.O_NOATIME)
    try:
        info = os.fstat(fd)
        assert stat.S_ISREG(info.st_mode) and info.st_size <= 8 * 1024 * 1024
        with os.fdopen(fd, 'rb', closefd=False) as stream:
            return stream.read()
    finally:
        os.close(fd)


def read_pin(root, pin):
    assert set(pin) == {'path', 'bytes', 'sha256'}
    assert type(pin['bytes']) is int and pin['bytes'] > 0
    assert SHA.fullmatch(pin['sha256'])
    raw = read(root, pin['path'])
    assert len(raw) == pin['bytes'] and digest(raw) == pin['sha256']
    return raw


def pin(path, data):
    return {'path': relative(path), 'bytes': len(data), 'sha256': digest(data)}


def timestamp(value):
    assert isinstance(value, str)
    result = datetime.fromisoformat(value.replace('Z', '+00:00'))
    assert result.tzinfo is not None and result.utcoffset() is not None
    return result


def serialize(document):
    raw = (json.dumps(document, ensure_ascii=False, separators=(',', ':'),
                      allow_nan=False) + '\n').encode()
    assert strict_equal(parse(raw), document), 'Serialization changed a number or JSON value'
    assert not BAD.search(raw), 'Private path/tool identifier in new output'
    assert len(raw) <= 8 * 1024 * 1024
    return raw


def new_output(root, value):
    value = relative(value)
    parts = PurePosixPath(value).parts
    assert len(parts) == 2 and parts[0] == 'integration'
    assert re.fullmatch(r'portable-[a-z0-9-]+', parts[1])
    path = confined(root, value, existing=False)
    assert not path.exists() and not path.is_symlink()
    parent = path.parent
    assert parent.resolve() == parent and parent.is_relative_to(root)
    assert not parent.is_symlink()
    if parent.exists():
        assert parent.is_dir()
    return path


def bind(root, request_path):
    root = canonical_root(root)
    request_raw = read(root, request_path)
    request = parse(request_raw)
    assert set(request) == {'schema', 'derivationManifest', 'invariantReport',
                            'globalRootReceipt', 'output', 'compileOutput',
                            'archiveCommit'}
    assert request['schema'] == 'cqc.p42.portable-review-bind-request/1'
    manifest_raw = read_pin(root, request['derivationManifest'])
    invariant_raw = read_pin(root, request['invariantReport'])
    receipt_raw = read_pin(root, request['globalRootReceipt'])
    assert request['globalRootReceipt']['path'].startswith('proofs/')
    manifest, invariants, receipt = map(parse, (manifest_raw, invariant_raw, receipt_raw))
    assert manifest['schema'] == 'cqc.p42.portable-derivation-candidate/1'
    assert manifest['approved'] is False and manifest['runtimeActivation'] is False
    assert manifest['requiresNewRootGlobalReceipt'] is True
    assert manifest['privatePlanSHA256'] == PLAN_SHA
    assert manifest['sourceSelection']['sha256'] == SELECTION_SHA
    assert invariants['schema'] == 'cqc.p42.portable-invariants-actual/1'
    assert invariants['status'] == 'PASS'
    assert invariants['privatePlanSHA256'] == PLAN_SHA
    assert invariants['derivationManifestSHA256'] == digest(manifest_raw)
    for key in ('allJSONShapesAndUnmappedLeavesExact',
                'float64BitsAndNegativeZeroChecked', 'sourceInputsRehashed'):
        assert invariants[key] is True
    for key in ('originalPNGsCopied', 'originalArtApprovalInherited', 'runtimeActivation'):
        assert invariants[key] is False
    assert type(invariants['numericLeavesUnchanged']) is int and invariants['numericLeavesUnchanged'] > 0
    assert type(invariants['roleMaskGeometryLeavesUnchanged']) is int and invariants['roleMaskGeometryLeavesUnchanged'] > 0
    assert receipt['schema'] == 'cqc.p42.root-portability-global-receipt/1'
    assert receipt['approved'] is True and receipt['runtimeActivation'] is False
    assert isinstance(receipt['reviewer'], str) and receipt['reviewer'].startswith('Root')
    reviewed_at = timestamp(receipt['reviewedAt'])
    assert receipt['derivationManifest'] == request['derivationManifest']
    assert receipt['invariantReport'] == request['invariantReport']
    assert receipt['sourceSelection'] == manifest['sourceSelection']
    assert receipt['privatePlanSHA256'] == PLAN_SHA
    assert receipt['originalProductionMetadataByteIdentityClaimed'] is False
    assert all(receipt['checks'].get(key) is True for key in ROOT_CHECKS)

    files = manifest['files']
    assert len(files) == 137 and invariants['filesChecked'] == len(files)
    nodes = {row['id']: row for row in files}
    assert len(nodes) == len(files) and len({row['path'] for row in files}) == len(files)
    data_by_id = {}
    for row in files:
        assert row['originalApprovalInherited'] is False
        data_by_id[row['id']] = read_pin(root, {k: row[k] for k in ('path', 'bytes', 'sha256')})
    assert nodes['manifest']['sha256'] == FIXED_MANIFEST_SHA
    fixed_manifest = parse(data_by_id['manifest'])
    assert fixed_manifest['schema'] == 'cqc.pass42.fixed-batch30/1'
    contracts = parse(data_by_id['contracts'])
    assert contracts['schema'] == 'cqc.p42.final-runtime-contracts/1'
    assert contracts['manifest']['sha256'] == FIXED_MANIFEST_SHA
    assert contracts['readOnly'] is True and contracts['productMutations'] is False
    assert len(manifest['sources']) == 112 and len(manifest['baselines']) == 224
    assert len(manifest['externalReferences']) == 13
    assert all(row['available'] is False and row['requiredForCompile'] is False
               and row['archivedPublicly'] is False for row in manifest['externalReferences'])

    bindings = manifest['originalReviewInputBindings']
    assert len(bindings) == 27 and len({(r['uid'], r['id']) for r in bindings}) == 27
    expected_entries = []
    for row in bindings:
        job_node, review_node = nodes[row['jobFile']], nodes[row['reviewFile']]
        assert job_node['originalSHA256'] == row['originalInputSHA256']
        assert review_node['encoding'] == 'exact'
        assert review_node['originalSHA256'] == review_node['sha256'] == row['originalReviewSHA256']
        expected_entries.append({'uid': row['uid'], 'id': row['id'],
            'originalJobSHA256': row['originalInputSHA256'],
            'derivedJobSHA256': job_node['sha256'],
            'originalReviewSHA256': row['originalReviewSHA256']})
    assert receipt['entries'] == expected_entries, 'New Root receipt must bind all 27 exact ordered pairs'

    output = new_output(root, request['output'])
    compile_output = new_output(root, request['compileOutput'])
    assert output != compile_output
    archive_commit = request['archiveCommit']
    assert archive_commit is None or isinstance(archive_commit, str) and re.fullmatch(r'[a-f0-9]{40}', archive_commit)
    prepared, compile_jobs, rebound = {}, [], []
    for row, entry in zip(bindings, expected_entries):
        job_node, review_node = nodes[row['jobFile']], nodes[row['reviewFile']]
        job = parse(data_by_id[row['jobFile']])
        original = parse(data_by_id[row['reviewFile']])
        assert job['uid'] == row['uid'] and job['id'] == row['id']
        assert original['schema'] == 'cqc.p42.root-art-review/2'
        assert original['status'] == 'approved' and original['reviewer'].startswith('Root')
        assert original['inputSHA256'] == row['originalInputSHA256']
        assert reviewed_at >= timestamp(original['reviewedAt'])
        assert all(original['checks'].get(key) is True for key in ART_CHECKS)
        assert original['heldRoles'] == []
        assert 'portabilityBinding' not in original
        new = copy.deepcopy(original)
        new['reviewer'] = receipt['reviewer']
        new['reviewedAt'] = receipt['reviewedAt']
        new['inputSHA256'] = entry['derivedJobSHA256']
        new['portabilityBinding'] = {
            'schema': 'cqc.p42.new-root-portability-review-binding/1',
            'authorization': 'new-exact-global-Root-receipt',
            'globalRootReceipt': copy.deepcopy(request['globalRootReceipt']),
            'derivationManifest': copy.deepcopy(request['derivationManifest']),
            'invariantReport': copy.deepcopy(request['invariantReport']),
            'sourceSelection': copy.deepcopy(manifest['sourceSelection']),
            'originalJobSHA256': row['originalInputSHA256'],
            'originalReview': {k: review_node[k] for k in ('path', 'bytes', 'sha256')},
            'originalReviewer': original['reviewer'],
            'originalReviewedAt': original['reviewedAt'],
            'originalArtChecksAndVisualRecordsUnchanged': True,
            'originalApprovalAutomaticallyInherited': False,
            'originalProductionMetadataByteIdentityClaimed': False,
            'runtimeActivation': False,
            'qualification': 'A new Root portability GO binds this exact derived input after independent invariants. Original art observations/checks remain exact evidence. No new physical art check, source edit, runtime installation, or equivalence of newly compiled metadata to original production metadata is claimed.',
        }
        for key in original.keys() - {'reviewer', 'reviewedAt', 'inputSHA256'}:
            assert strict_equal(new[key], original[key])
        name = row['uid'] + '--' + row['id'] + '--portable-review.json'
        assert re.fullmatch(r'[A-Za-z0-9_-]+--portable-review\.json', name)
        review_path = request['output'] + '/' + name
        raw = serialize(new)
        assert name not in prepared
        prepared[name] = raw
        review_pin = pin(review_path, raw)
        compile_jobs.append({'input': {k: job_node[k] for k in ('path', 'bytes', 'sha256')},
                             'review': review_pin})
        rebound.append({**entry, 'newReview': review_pin})
    config = {'schema': 'cqc.p42.native-batch-compile/2',
              'manifest': {k: nodes['manifest'][k] for k in ('path', 'bytes', 'sha256')},
              'contracts': {k: nodes['contracts'][k] for k in ('path', 'bytes', 'sha256')},
              'jobs': compile_jobs, 'output': request['compileOutput'],
              'archiveCommit': archive_commit}
    config_raw = serialize(config)
    prepared['COMPILE_CONFIG_CANDIDATE_V1.json'] = config_raw
    report = {'schema': 'cqc.p42.portable-review-binding-actual/1',
              'status': 'new-global-Root-receipt-bound-isolated-compile-still-required',
              'generatedAtUTC': datetime.now(timezone.utc).isoformat(),
              'binderSHA256': digest(Path(__file__).read_bytes()),
              'requestSHA256': digest(request_raw),
              'globalRootReceipt': request['globalRootReceipt'],
              'derivationManifest': request['derivationManifest'],
              'invariantReport': request['invariantReport'],
              'sourceSelection': manifest['sourceSelection'],
              'entries': rebound,
              'compileConfiguration': pin(request['output'] + '/COMPILE_CONFIG_CANDIDATE_V1.json', config_raw),
              'all137DerivedFilesRehashed': True,
              'originalReviewsUnmodified': True,
              'originalChecksVisualRecordsLimitsAndObservationsUnmodified': True,
              'newReviewAuthority': 'new exact global Root receipt, not automatic approval transfer',
              'sourceAndBaselineRestorationAvailabilityChecked': False,
              'sourceOrAppBytesWritten': False, 'compilerExecuted': False,
              'originalProductionMetadataByteIdentityClaimed': False,
              'runtimeActivation': False, 'GitWrites': False}
    prepared['PORTABLE_REVIEW_BINDING_ACTUAL_V1.json'] = serialize(report)
    assert sum(map(len, prepared.values())) <= 8 * 1024 * 1024
    # All validation/serialization finishes before the first filesystem write.
    output.parent.mkdir(exist_ok=True)
    output.mkdir()
    for name, raw in prepared.items():
        with (output / name).open('xb') as stream:
            stream.write(raw)
    return {'output': str(output), 'newReviews': len(rebound),
            'config': report['compileConfiguration'], 'compilerExecuted': False,
            'sourceOrAppBytesWritten': False}


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--restore-root', required=True)
    parser.add_argument('--request', required=True,
                        help='Relative pinned-request JSON inside the explicit restoration root')
    args = parser.parse_args()
    print(json.dumps(bind(args.restore_root, args.request)))
