#!/usr/bin/env python3
"""Read-only integration helper. Returns patched catalogs in memory only."""
import copy
import hashlib
import json
from pathlib import Path

ROOT = Path('/workspace/cqc-game-working/cqc-versus-v056')
HERE = Path(__file__).resolve().parent

def patched_catalog(catalog, overlay):
    result = copy.deepcopy(catalog)
    ids = [r['id'] for r in overlay['rows']]
    if len(ids) != 3 or set(ids) != {'outer_heaven', 'arsenal_corridor', 'zanzibar'}:
        raise ValueError('Only the three reviewed stages are allowed.')
    index = {s['id']: s for s in result['stages']}
    for row in overlay['rows']:
        before = index[row['id']]
        digest = hashlib.sha256(json.dumps(before, ensure_ascii=False, separators=(',', ':')).encode()).hexdigest()
        if digest != row['beforeStageSha256']:
            raise ValueError('Reviewed source stage changed: ' + row['id'])
        after = copy.deepcopy(row['afterStage'])
        if after['id'] != before['id']:
            raise ValueError('Cannot change stage identity.')
        comparable = copy.deepcopy(after)
        comparable['review'] = copy.deepcopy(before['review'])
        for layer in comparable['layers']:
            layer.pop('localLuminance', None)
        if comparable != before:
            raise ValueError('Only review qualifications and local luminance metadata may change.')
        if row['id'] == 'zanzibar' and any(l.get('localLuminance') for l in after['layers']):
            raise ValueError('Zanzibar must retain strict static rendering.')
        result['stages'][result['stages'].index(before)] = after
    return result

def verify_sources():
    pins = json.loads((HERE / 'SOURCE_PINS.json').read_text())
    for pin in pins['files']:
        p = Path(pin['path'])
        if p.stat().st_size != pin['bytes'] or hashlib.sha256(p.read_bytes()).hexdigest() != pin['sha256']:
            raise ValueError('Reviewed immutable input changed: ' + str(p))
    return len(pins['files'])

def catalog_bytes(catalog):
    return (json.dumps(catalog, ensure_ascii=False, indent=2) + '\n').encode()

def runtime_bytes(catalog):
    return ('/* Generated from data/stage-layer-catalog-reprise.json. */\nwindow.CQC_STAGE_LAYER_DATA = ' +
            json.dumps(catalog, ensure_ascii=False, separators=(',', ':')) + ';\n').encode()

if __name__ == '__main__':
    count = verify_sources()
    catalog = json.loads((ROOT / 'data/stage-layer-catalog-reprise.json').read_text())
    patched = patched_catalog(catalog, json.loads((HERE / 'THREE_STAGE_OVERLAY.json').read_text()))
    print(json.dumps({'status':'read_only_verified', 'sourcePinsVerified':count, 'stages':len(patched['stages']),
                     'productionFilesWritten':0, 'outputsInMemory':[
                         {'path':'data/stage-layer-catalog-reprise.json','bytes':len(catalog_bytes(patched)), 'sha256':hashlib.sha256(catalog_bytes(patched)).hexdigest()},
                         {'path':'src/cqc-stage-layer-data.js','bytes':len(runtime_bytes(patched)), 'sha256':hashlib.sha256(runtime_bytes(patched)).hexdigest()}]}))
