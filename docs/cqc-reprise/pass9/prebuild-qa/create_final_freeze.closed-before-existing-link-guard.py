#!/usr/bin/env python3
"""Read-only by default; closes actual installed source only after ROOT stage GO."""
import argparse
import datetime
import hashlib
import json
import os
from pathlib import Path

R = Path('/workspace/cqc-game-working/cqc-versus-v056')
OUT = Path('/workspace/cqc-pass9-final-qa')
GUARD = Path('/workspace/cqc-pass9-importer-preparation/CURRENT_CATALOG_39_LITERAL_GUARD.json')
OLD = Path('/workspace/cqc-pass8-independent-gameplay-review/verified-final-origins/source/combat-sprite-catalog-v1.json')
EXPECTED = {
    'data/combat-sprite-catalog-v1.json': '3e86a705f212492542c5f95f50bddf53a0d0b832c24090a63c094479b91d78dd',
    'src/cqc-sprite-catalog.js': 'dd6de917405653878d55bd4a0385dabdfc06f01d41a381036ac4e2d661dd5e22',
    'modules/unified-versus-v055.html': 'bc2ba609ae6f45d21dd16b8f4e00dc98d4b4403ca7846efe9d516016c2fa2277',
    'src/cqc-pass9-native-origins.js': '2ad1bfc9073339ebc1ad46462a2ba02f23fd397437a71f00c004290bc887cf62',
    'src/cqc-pass9-combat-fidelity.js': '582548f5d0799f23501eb8a8d899123eaa3e6a227e84ab58053ea71cb2f28603',
    'src/cqc-pass9-projectile-art.js': '887f944c76cbe6f1b676c50855f165d1c9bde4b8903dd203f683d3ec088070e9',
    'src/cqc-pass9-projectile-catalog.js': '9f56d0b88f04e6c9849ec52525c7eede3abc061f4830e272f1af355a1ad37f4c',
    'src/cqc-pass8-combat-engine.js': 'fd6c8d85333887a60056f1ab11e92abb63250c07de1664a6d832c1c679f34a8f',
    'src/cqc-sprite-renderer.js': 'bf08ed6aa762f9eef16cb2de268005bbd57d1fc2d60f8d70556f145e2f4cec25',
    'assets/combat-props/core__ninja_mg2/star-native-pass9.png': '29722b7fd8fe23d6c2929e9c54c4b9e8a35c48d451ab955b8325ae8cd8d3e0dc',
}
NEW_UIDS = {'core__runner_mg2', 'core__ninja_mg2', 'core__redblaster_mg2', 'core__jungle_evil'}


def digest(p):
    h = hashlib.sha256()
    with p.open('rb') as f:
        for block in iter(lambda: f.read(1024 * 1024), b''):
            h.update(block)
    return h.hexdigest()


def pin(p):
    assert p.is_file() and not p.is_symlink(), str(p)
    s = p.stat()
    r = {'path': str(p), 'bytes': s.st_size, 'sha256': digest(p)}
    try:
        r['runtimePath'] = str(p.relative_to(R))
    except ValueError:
        pass
    return r


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--execute-after-root-go', action='store_true')
    parser.add_argument('--stage-catalog-sha256')
    parser.add_argument('--stage-data-sha256')
    parser.add_argument('--stage-renderer-sha256')
    args = parser.parse_args()
    if not args.execute_after_root_go:
        print(json.dumps({'status': 'plan-only-not-frozen', 'entryCountExpected': 43,
                          'output': str(OUT / 'actual43-source-freeze.json'),
                          'requires': ['Explicit ROOT stage integration GO', 'Three actual installed stage SHA256s'],
                          'scope': 'All installed R src JS/CSS, module, canonical actor/stage JSON, 258 actor PNGs, 12 reviewed stage PNGs, native star PNG',
                          'applicationWrites': False, 'catalogCopies': False}))
        return
    stages = {'data/stage-layer-catalog-reprise.json': args.stage_catalog_sha256,
              'src/cqc-stage-layer-data.js': args.stage_data_sha256,
              'src/cqc-stage-layers.js': args.stage_renderer_sha256}
    assert all(isinstance(x, str) and len(x) == 64 and all(c in '0123456789abcdef' for c in x) for x in stages.values())
    expected = EXPECTED | stages
    for rel, sha in expected.items():
        assert digest(R / rel) == sha, 'Required installed source differs: ' + rel
    raw = (R / 'data/combat-sprite-catalog-v1.json').read_text()
    catalog = json.loads(raw)
    guard = json.loads(GUARD.read_text())
    assert len(catalog['entries']) == 43 and len(guard['entries']) == 39
    assert set(catalog['entries']) == set(guard['entries']) | NEW_UIDS
    assert digest(OLD) == guard['catalogSHA256']
    for uid, g in guard['entries'].items():
        assert hashlib.sha256(raw[g['start']:g['end']].encode()).hexdigest() == g['rawSHA256'], 'Old literal changed: ' + uid
    del raw
    sprite_files = {}
    pose_count = 0
    source_poses = set()
    for uid, entry in catalog['entries'].items():
        for side in ('actions', 'oppositeActions'):
            for action in entry[side].values():
                for frame in action['frames']:
                    path, sha = frame['file'], frame['sha256']
                    assert path.startswith('assets/combat-sprites/') and path.endswith('.png')
                    assert path not in sprite_files or sprite_files[path] == sha
                    sprite_files[path] = sha
                    pose_count += 1
                    source_poses.add((path, tuple(frame['rect'])))
    assert len(sprite_files) == 258 and len(source_poses) == 3096
    stage_catalog = json.loads((R / 'data/stage-layer-catalog-reprise.json').read_text())
    assert len(stage_catalog['stages']) == 30
    three = {s['id']: s for s in stage_catalog['stages'] if s['id'] in {'outer_heaven', 'arsenal_corridor', 'zanzibar'}}
    assert len(three) == 3
    for sid, s in three.items():
        assert len(s['layers']) == 4 and s['geometry']['ground'] == 568
        local = [l for l in s['layers'] if l.get('localLuminance')]
        assert len(local) == (0 if sid == 'zanzibar' else 1), sid
        for layer in s['layers']:
            expected[layer['file']] = layer['sha256']
    paths = set(R / rel for rel in expected)
    paths |= set(p for p in (R / 'src').iterdir() if p.is_file() and p.suffix in {'.js', '.css'})
    paths |= set(R / rel for rel in sprite_files)
    files = [pin(p) for p in sorted(paths)]
    by_path = {f['runtimePath']: f for f in files}
    for rel, sha in expected.items():
        assert by_path[rel]['sha256'] == sha
    for rel, sha in sprite_files.items():
        assert by_path[rel]['sha256'] == sha, 'Actual installed PNG differs: ' + rel
    for f in files:
        if Path(f['path']).suffix in {'.js', '.css', '.json', '.html'}:
            assert Path(f['path']).stat().st_nlink == 1, 'Live mutable text must remain independent: ' + f['path']
    result = {'schema': 'cqc.pass9.current-source-freeze/1', 'status': 'frozen',
              'confirmedByRoot': True, 'rootAuthorization': 'Explicit ROOT GO after actual stage integration',
              'createdAt': datetime.datetime.now(datetime.timezone.utc).isoformat(),
              'entryCount': 43, 'nativePNG': 258, 'uniquePoses': 3096,
              'newForms': 4, 'newPNGs': 24, 'newPoses': 288, 'nativeStarPNGs': 1, 'nativeStarPoses': 8,
              'actionFrameReferences': pose_count, 'uniquePoseDefinition': 'Distinct native PNG path and source rectangle',
              'preservedOldEntries': 39, 'previous39LiteralEntriesPreserved': True,
              'previous39LiteralGuard': pin(GUARD), 'closedPrevious39Catalog': pin(OLD),
              'stages': {'fourPlaneParallax': 30, 'ambientAnimated': 29, 'zanzibar': 'static_source_function_unproved'},
              'absolute1to1Certified': False, 'fidelityStatus': 'closest_supported',
              'files': files, 'applicationWritten': False, 'nativeImageEdited': False,
              'catalogCopied': False, 'canonicalJSONRequiredAsRuntimeAsset': False}
    target = OUT / 'actual43-source-freeze.json'
    OUT.mkdir(exist_ok=True)
    encoded = (json.dumps(result, indent=2) + '\n').encode()
    assert len(encoded) < 256 * 1024
    with target.open('xb') as f:
        f.write(encoded)
        f.flush()
        os.fsync(f.fileno())
    print(json.dumps({'status': 'frozen', 'entryCount': 43, 'files': len(files),
                      'path': str(target), 'bytes': len(encoded), 'sha256': digest(target),
                      'catalogSHA256': EXPECTED['data/combat-sprite-catalog-v1.json'],
                      'applicationWritten': False, 'catalogCopied': False}))


if __name__ == '__main__':
    main()
