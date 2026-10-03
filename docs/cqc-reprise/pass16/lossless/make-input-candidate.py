#!/usr/bin/env python3
"""Prepare an input proposal, never grant packaging GO or write source roots."""
import argparse
import importlib.util
import json
from pathlib import Path
import sys

sys.dont_write_bytecode = True
BASE = Path('/tmp/cqc-pass16-preservation')
spec = importlib.util.spec_from_file_location('preservation_helper', BASE / 'preserve-pass16.py')
helper = importlib.util.module_from_spec(spec)
spec.loader.exec_module(helper)


def walk_json(value):
    if isinstance(value, dict):
        yield value
        for v in value.values():
            yield from walk_json(v)
    elif isinstance(value, list):
        for v in value:
            yield from walk_json(v)


def load(path):
    with helper.reader(path) as handle:
        return json.load(handle)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--roots', required=True, help='JSON array of explicit closed roots and pinned receipts')
    parser.add_argument('--runtime-freeze', required=True, help='Root frozen runtime manifest {root,closed,files}')
    parser.add_argument('--out', required=True)
    args = parser.parse_args()
    roots = load(args.roots)
    frozen = load(args.runtime_freeze)
    if not isinstance(roots, list) or frozen.get('closed') is not True:
        raise SystemExit('Expected root list and an explicitly closed runtime freeze')
    aliases = {}
    problems = []
    for item in roots:
        if item.get('closed') is not True:
            raise SystemExit('Open root supplied: ' + item.get('id', '?'))
        receipt = helper.source_pin(item['receipt'])
        root = Path(item['source'])
        if not Path(receipt['source']).is_relative_to(root):
            raise SystemExit('Receipt outside source root')
        for path in helper.list_root(root):
            if path.is_symlink() or path.suffix.lower() != '.json' or not path.is_file():
                continue
            try:
                doc = load(path)
            except (UnicodeDecodeError, json.JSONDecodeError):
                continue  # The raw member remains preserved by the packager.
            for record in walk_json(doc):
                sha = record.get('sha256')
                size = record.get('bytes')
                if not isinstance(sha, str) or not helper.SHA.fullmatch(sha) or not isinstance(size, int):
                    continue
                for value in record.values():
                    if not isinstance(value, str) or not value.startswith('/workspace/generated_images/') or not value.endswith('.png'):
                        continue
                    pin = {'source': value, 'bytes': size, 'sha256': sha,
                           'aliasKind': 'original-imagegen',
                           'pinDocument': str(path)}
                    if value in aliases and (aliases[value]['sha256'], aliases[value]['bytes']) != (sha, size):
                        problems.append({'type': 'conflicting-original-pin', 'source': value,
                                         'a': aliases[value], 'b': pin})
                    else:
                        aliases[value] = pin
    if problems:
        raise SystemExit(json.dumps(problems, ensure_ascii=False))
    git_refs = []
    runtime_root = Path(frozen['root'])
    for item in frozen['files']:
        file = helper.relative(item['file'])
        git_refs.append({'kind': 'runtime', 'source': str(runtime_root / file),
                         'gitPath': 'public/cqc/' + file,
                         'bytes': item['bytes'], 'sha256': item['sha256']})
    candidate = {'schema': 'cqc.pass16-preservation-input/1',
                 'rootApproval': 'PREPARATION ONLY — explicit Root GO still required',
                 'roots': roots, 'gitReferences': git_refs,
                 'originalAliases': sorted(aliases.values(), key=lambda x: x['source']),
                 'externalFiles': [], 'knownSymlinks': [],
                 'maxPayloadBytes': helper.MAX_PAYLOAD,
                 'qualifications': [
                     'Source fidelity follows the documented producer/reference review; no absolute1:1 certificate.',
                     'Preserves candidate revisions, rejected sources, prompts, references and documentary qualifications.',
                     'Canonical Clown incarnation is the Teliko disguise from Metal Gear Acid.',
                     'Cunningham native atlas is the human body; existing hover-platform and weapon accessories remain runtime responsibilities.',
                     'Gander battle is the existing two-phase CQC adaptation; preservation does not establish the original three-phase campaign.',
                     'Synthetic helper verification is separate from real browser/combat/native-image validation.'
                 ]}
    output = helper.within_base(Path(args.out))
    if output.exists():
        raise SystemExit('Existing candidate file refused')
    helper.atomic_json(output, candidate)
    print(json.dumps({'candidate': str(output), 'roots': len(roots),
                      'runtimeReferences': len(git_refs), 'originalAliases': len(aliases),
                      'finalPackagingAuthorized': False}, ensure_ascii=False))


if __name__ == '__main__':
    main()
