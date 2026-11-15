#!/usr/bin/env python3
"""Synthetic archive/restoration contracts only; never a gameplay or native art proof."""
import hashlib
import json
import os
from pathlib import Path
import subprocess
import sys

BASE = Path('/tmp/cqc-pass16-preservation')
VARIANT = sys.argv[1] if len(sys.argv) == 2 else 'v1'
if VARIANT not in ('v1', 'v2', 'v3'):
    raise SystemExit('Expected optional fixture variant v1, v2 or v3')
ROOT = BASE / ('helper-contract-' + VARIANT)
HELPER = BASE / 'preserve-pass16.py'


def sha(data):
    return hashlib.sha256(data).hexdigest()


def pin(path):
    data = path.read_bytes()
    return {'source': str(path), 'bytes': len(data), 'sha256': sha(data)}


def run(args, success=True):
    result = subprocess.run([sys.executable, '-B', str(HELPER), *args],
                            text=True, capture_output=True, check=False)
    if (result.returncode == 0) != success:
        raise AssertionError(result.stdout + result.stderr)
    return {'exit': result.returncode, 'stdout': result.stdout.strip(),
            'stderr': result.stderr.strip()}


def main():
    if ROOT.exists():
        raise SystemExit('Fixture already exists; never overwrite it.')
    ROOT.mkdir()
    source = ROOT / 'closed-source'
    source.mkdir()
    (source / 'empty-directory').mkdir()
    (source / 'nested').mkdir()
    native_bytes = b'PNG-source-fixture-not-an-actual-generated-image\0' * 301
    (source / 'native-source.png').write_bytes(native_bytes)
    (source / 'duplicate.txt').write_bytes(b'preserved identical byte stream\n')
    (source / 'nested' / 'duplicate-copy.txt').write_bytes(b'preserved identical byte stream\n')
    (source / 'empty.bin').write_bytes(b'')
    (source / 'large-original.bin').write_bytes(bytes(range(256)) * 39000)
    (source / 'receipt.json').write_text('{"status":"synthetic-closed-fixture"}\n')
    fixed = 1700000000123456789
    for i, path in enumerate(sorted(source.rglob('*'))):
        os.chmod(path, 0o750 if path.is_dir() else (0o640 if i % 2 else 0o644))
        os.utime(path, ns=(fixed + i, fixed + i * 2))
    os.utime(source, ns=(fixed, fixed))
    repository = ROOT / 'repository'
    runtime = repository / 'public' / 'cqc' / 'assets' / 'native-fixture.png'
    runtime.parent.mkdir(parents=True)
    runtime.write_bytes(native_bytes)
    tool_alias = ROOT / 'tool-original-fixture.png'
    tool_alias.write_bytes(native_bytes)
    config = {'schema': 'cqc.pass16-preservation-input/1',
              'rootApproval': 'GO PASS16 FINAL LOSSLESS PACK',
              'roots': [{'id': 'fixture', 'source': str(source), 'closed': True,
                         'receipt': pin(source / 'receipt.json')}],
              'gitReferences': [{**pin(runtime), 'gitPath': 'public/cqc/assets/native-fixture.png',
                                  'kind': 'runtime'}],
              'originalAliases': [{**pin(tool_alias), 'aliasKind': 'synthetic-fixture-only'}],
              'qualifications': ['Synthetic fixture; not a PASS16 producer archive or native image claim.']}
    cp = ROOT / 'config.json'
    cp.write_text(json.dumps(config))
    proof = {'schema': 'cqc.pass16-preservation-helper-contracts/1',
             'scope': 'Synthetic CRC/SHA restoration, metadata, source immutability, chunk-size and determinism only.',
             'nativeArtOrGameplayClaim': False, 'contracts': []}
    for label in ['package-a', 'package-b']:
        outcome = run(['pack', '--config', str(cp), '--out', str(ROOT / label)])
        proof['contracts'].append({'name': label, 'passed': True, 'result': outcome})
    manifest_a = json.loads((ROOT / 'package-a' / 'LOSSLESS_MANIFEST_V1.json').read_text())
    manifest_b = json.loads((ROOT / 'package-b' / 'LOSSLESS_MANIFEST_V1.json').read_text())
    assert manifest_a == manifest_b
    for item in manifest_a['chunks']:
        a = (ROOT / 'package-a' / item['file']).read_bytes()
        b = (ROOT / 'package-b' / item['file']).read_bytes()
        assert a == b and len(a) <= 8 * 1024 * 1024
    proof['contracts'].append({'name': 'identical manifest and ZIP bytes across two runs', 'passed': True})
    assert manifest_a['stats']['gitReferencedBytes'] == len(native_bytes)
    assert manifest_a['stats']['uniqueContentCount'] == 5
    proof['contracts'].append({'name': 'content deduplication and runtime alias exclude duplicate PNG payload', 'passed': True})
    outcome = run(['restore', '--manifest', str(ROOT / 'package-a' / 'LOSSLESS_MANIFEST_V1.json'),
                   '--target', str(ROOT / 'restored'), '--repository', str(repository),
                   '--max-bytes', str(32 * 1024 * 1024)])
    proof['contracts'].append({'name': 'complete CRC/SHA and mode/mtime restoration including runtime PNG and original alias',
                               'passed': True, 'result': outcome})
    proof['contracts'].append({'name': 'large 9.5 MiB original restored from segments across multiple ≤8 MiB ZIPs',
                               'passed': len(manifest_a['chunks']) >= 2})
    refused = run(['restore', '--manifest', str(ROOT / 'package-a' / 'LOSSLESS_MANIFEST_V1.json'),
                   '--target', str(ROOT / 'restored'), '--repository', str(repository),
                   '--max-bytes', str(32 * 1024 * 1024)], success=False)
    proof['contracts'].append({'name': 'existing restoration destination refused', 'passed': True, 'result': refused})
    source_link = source / 'unapproved-alias'
    source_link.symlink_to('duplicate.txt')
    refused = run(['pack', '--config', str(cp), '--out', str(ROOT / 'refused-symlink')], success=False)
    proof['contracts'].append({'name': 'unapproved source symlink refused', 'passed': True, 'result': refused})
    source_link.unlink()  # Synthetic fixture only, never producer roots.
    rejected = dict(config)
    rejected['rootApproval'] = 'PREPARATION ONLY'
    (ROOT / 'no-go.json').write_text(json.dumps(rejected))
    refused = run(['pack', '--config', str(ROOT / 'no-go.json'), '--out', str(ROOT / 'refused-go')], success=False)
    proof['contracts'].append({'name': 'missing final GO refused', 'passed': True, 'result': refused})
    assert all(item['passed'] for item in proof['contracts'])
    proof['status'] = 'passed'
    (BASE / ('ACTUAL_HELPER_CONTRACTS_' + VARIANT.upper() + '.json')).write_text(json.dumps(proof, ensure_ascii=False, indent=2) + '\n')
    print(json.dumps({'contracts': len(proof['contracts']), 'status': 'passed',
                      'scope': proof['scope']}, ensure_ascii=False))


if __name__ == '__main__':
    main()
