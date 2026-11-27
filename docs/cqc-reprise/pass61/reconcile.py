#!/usr/bin/env python3
"""Rebuild the P60/P61 source delivery index from selected batch records.

Run with Python + Pillow. Does not edit images or integrate assets into gameplay.
P60 blobs are checked against the pinned tree; P61 PNG bytes are checked locally.
"""
from pathlib import Path
from collections import Counter
import hashlib
import json
from PIL import Image

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
BRANCH = 'codex/cqc-p61-missing-static-sources-20261125'
REPOSITORY = 'darknigthmare/shadow-codec-ops'
PINNED = '2e2864e3cba653c10727113f574ec1107c274e41'

def read(path):
    return json.loads(path.read_text(encoding='utf-8'))

def write(path, data):
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

def listify(value):
    return value if isinstance(value, list) else ([value] if value else [])

def normalize(entry, source_manifest, pass_number, tree, selected=True):
    path = entry.get('path', entry.get('file', ''))
    if not path or not path.endswith('.png'):
        return None
    if not path.startswith('public/'):
        path = f'public/cqc/assets/p{pass_number}/' + path
    meta = entry.get('inspection', {})
    sha = entry.get('gitBlobSha', entry.get('gitBlobSHA', entry.get('recovery', {}).get('gitBlobSha')))
    if pass_number == 60:
        assert path in tree, f'P60 path absent from pinned tree: {path}'
        if sha:
            assert sha == tree[path], f'P60 SHA mismatch: {path}'
        sha = tree[path]
    if not sha:
        return None
    result = {
        'id': entry.get('id', Path(path).stem), 'label': entry.get('label', entry.get('id', Path(path).stem)),
        'episode': entry.get('episode', ''), 'kind': entry.get('kind', 'archive'),
        'pass': pass_number, 'path': path, 'gitBlobSha': sha,
        'sha256': entry.get('sha256', meta.get('sha256')),
        'width': entry.get('width', meta.get('width')), 'height': entry.get('height', meta.get('height')),
        'colorMode': entry.get('colorMode', entry.get('mode', meta.get('colorMode', meta.get('mode')))),
        'bytes': entry.get('bytes', meta.get('bytes')),
        'manifest': source_manifest.relative_to(ROOT).as_posix(),
        'workIds': listify(entry.get('workIds', entry.get('workId'))),
        'referenceURLs': listify(entry.get('referenceURLs', entry.get('referenceUrls'))),
        'qaNotes': listify(entry.get('qa', {}).get('notes')) + listify(entry.get('qa', {}).get('limitations')),
        'selected': selected, 'fidelityStatus': 'pending_external_review' if selected else 'superseded',
        'absolute1to1Certified': False, 'runtimeIntegrated': False, 'combatReady': False,
        'blobURL': f'https://github.com/{REPOSITORY}/blob/{BRANCH}/{path}',
    }
    if pass_number == 61:
        file = ROOT / path
        data = file.read_bytes()
        assert data, f'Empty PNG: {path}'
        actual = hashlib.sha1(b'blob ' + str(len(data)).encode() + b'\0' + data).hexdigest()
        assert actual == sha, f'P61 blob SHA mismatch: {path}'
        with Image.open(file) as image:
            image.load()
            result.update(width=image.width, height=image.height, colorMode=image.mode,
                          bytes=len(data), sha256=hashlib.sha256(data).hexdigest())
            if 'A' in image.getbands():
                result['alphaExtrema'] = list(image.getchannel('A').getextrema())
                assert result['alphaExtrema'][1] > 0, f'Invisible PNG: {path}'
            if selected and result['kind'] == 'stage':
                assert image.size == (1672, 941), f'Unexpected stage size: {path}'
            if selected and result['kind'] in ('character', 'costume', 'machine', 'vfx'):
                assert 'A' in image.getbands(), f'Cutout without alpha: {path}'
        result['byteIdentityEvidence'] = 'Local decoded PNG; SHA256 and Git blob SHA verified.'
    else:
        result['byteIdentityEvidence'] = 'Pinned P60 Git tree; original byte identity retained. No new visual certification.'
    return result

def build_delivery():
    tree = {x['path']: x['sha'] for x in read(HERE / 'audit/inherited-p60-tree.json')['entries']}
    assets, archives = [], []
    for pass_number in (60, 61):
        for file in sorted((ROOT / f'docs/cqc-reprise/pass{pass_number}/batches').glob('*.json')):
            data = read(file)
            if not isinstance(data, dict) or file.name.endswith('-prompts.json'):
                continue
            entries = data.get('entries', data.get('produced', data.get('assets', [])))
            for entry in entries:
                if not isinstance(entry, dict) or not entry.get('kind') or entry.get('selected') is False:
                    continue
                result = normalize(entry, file, pass_number, tree)
                if result:
                    assets.append(result)
            if pass_number == 61:
                for entry in data.get('rejected', []):
                    result = normalize(entry, file, pass_number, tree, False)
                    if result:
                        archives.append(result)
    for path, sha in tree.items():
        if '/rejected/' in path and path.endswith('.png'):
            archives.append({'id': Path(path).stem, 'label': 'Essai P60 remplacé', 'pass': 60,
                             'path': path, 'gitBlobSha': sha, 'selected': False})
    assert len({x['path'] for x in assets}) == len(assets), 'Duplicate selected source path'
    assert len({x['path'] for x in archives}) == len(archives), 'Duplicate archived source path'
    assert not {x['path'] for x in assets} & {x['path'] for x in archives}, 'Archive selected by mistake'
    assets.sort(key=lambda x: (-x['pass'], x['kind'], x['episode'], x['label']))
    result = {
        'schema': 'cqc.source-delivery.v1', 'asOf': '2026-11-25', 'repository': REPOSITORY,
        'branch': BRANCH, 'pullRequest': f'https://github.com/{REPOSITORY}/pull/25',
        'baselineCommit': PINNED,
        'interpretation': 'One selected static source per PNG. Source presence is not 1:1 certification, complete scope coverage, animation or gameplay admission.',
        'counts': {
            'selectedTotal': len(assets), 'selectedP61': sum(x['pass'] == 61 for x in assets),
            'selectedP60': sum(x['pass'] == 60 for x in assets),
            'p61ByKind': dict(Counter(x['kind'] for x in assets if x['pass'] == 61)),
            'p60ByKind': dict(Counter(x['kind'] for x in assets if x['pass'] == 60)),
            'archivedRejectedFiles': len(archives), 'certified1to1': 0, 'runtimeIntegratedByThesePasses': 0,
        },
        'assets': assets, 'archives': archives,
    }
    write(HERE / 'delivery-manifest.json', result)
    return result

if __name__ == '__main__':
    result = build_delivery()
    print(json.dumps(result['counts'], ensure_ascii=False))
