#!/usr/bin/env python3
"""Read-only source audit. Every generated file stays in this isolated directory."""
import datetime
import hashlib
import json
from pathlib import Path
from PIL import Image

R = Path('/workspace/cqc-game-working/cqc-versus-v056')
S = Path('/workspace/shadow-codec-recovered/public/cqc')
O = Path(__file__).resolve().parent
IDS = ('outer_heaven', 'zanzibar', 'arsenal_corridor')

def save(name, value):
    path = O / name
    if path.exists():
        raise FileExistsError(f'Preserve existing artifact before a new run: {path}')
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n')

def pin(path, role):
    path = Path(path)
    result = {'path': str(path), 'bytes': path.stat().st_size,
              'sha256': hashlib.sha256(path.read_bytes()).hexdigest(), 'role': role}
    if path.suffix.lower() in ('.png', '.jpg'):
        with Image.open(path) as im:
            result.update(width=im.width, height=im.height, mode=im.mode)
    return result

catalog = json.loads((R/'data/stage-layer-catalog-reprise.json').read_text())
reference_review = json.loads((O/'references-review/EXISTING_STAGE_REFERENCE_ANIMATION_REVIEW.json').read_text())
stages = [next(x for x in catalog['stages'] if x['id'] == sid) for sid in IDS]
inputs = [pin(R/'data/stage-layer-catalog-reprise.json', 'authoring_catalog_json'),
          pin(S/'runtime-manifest.json', 'shadow_runtime_graph')]
for file, role in [('src/cqc-stage-layer-data.js', 'runtime_catalog_script'),
                   ('src/cqc-stage-layers.js', 'renderer'),
                   ('modules/unified-versus-v055.html', 'gameplay_integration')]:
    inputs += [pin(R/file, role), pin(S/file, 'shadow_runtime_'+role)]
for stage in stages:
    for layer in stage['layers']:
        inputs += [pin(R/layer['file'], 'runtime_layer_'+stage['id']+'_'+layer['id']),
                   pin(S/layer['file'], 'shadow_layer_'+stage['id']+'_'+layer['id'])]
    inputs += [pin(R/ref['file'], 'original_reference_'+stage['id']) for ref in stage['references']]
    inputs.append(pin(R/stage['master']['file'], 'accepted_master_'+stage['id']))
    inputs.append(pin(R/f"preparation/stage-layers-reprise/generated-history/{stage['id']}/APPROVED_MANIFEST.json",
                      'historical_approval_'+stage['id']))
for metadata in reference_review['metadataInputs']:
    if not any(x['path'] == metadata['path'] for x in inputs):
        inputs.append(pin(metadata['path'], metadata['role']))

classification = []
for stage in catalog['stages']:
    weather = stage.get('weather') or {}
    active_weather = weather.get('type', 'none') != 'none' and weather.get('enabled') is not False
    motion = [x['id'] for x in stage['layers'] if x.get('motion')]
    classification.append({'id': stage['id'], 'name': stage['name'], 'layers': len(stage['layers']),
        'activeWeather': active_weather, 'weatherType': weather.get('type', 'none'),
        'motionLayers': motion, 'hasAutonomousAmbient': active_weather or bool(motion),
        'cameraParallax': sorted(set(x['parallax'] for x in stage['layers']))})
assert [x['id'] for x in classification if not x['hasAutonomousAmbient']] == list(IDS)

config = {'schema': 'cqc.isolated-stage-luminance-study/1', 'studyOnly': True,
          'enabledInRuntime': False, 'prototypeDefaultEnabled': False,
          'canonicalTimingCertified': False, 'originalSourcePixelsModified': False, 'stages': []}
for stage in stages:
    review = next(x for x in reference_review['stageReviews'] if x['id'] == stage['id'])
    proposal = review['minimalProposal']
    layer = next(x for x in stage['layers'] if x['id'] == 'architecture')
    variant = {'outer_heaven': 'red', 'zanzibar': 'ochre', 'arsenal_corridor': 'cyan'}[stage['id']]
    maximum = {'outer_heaven': .02, 'zanzibar': .01, 'arsenal_corridor': .03}[stage['id']]
    periods = {'outer_heaven': [7, 9, 8, 9], 'zanzibar': [8, 10, 9, 10],
               'arsenal_corridor': [6, 8, 7, 8]}[stage['id']]
    row = {'id': stage['id'], 'anchorLayer': 'architecture', 'anchorFile': layer['file'],
        'anchorSha256': layer['sha256'], 'nativeWidth': layer['width'], 'nativeHeight': layer['height'],
        'worldRect': layer['rect'], 'parallax': layer['parallax'], 'maskColor': variant,
        'maximumDimmingFraction': maximum, 'authoredPeriodSeconds': periods,
        'sourceCanonicalTiming': False, 'sourceStatus': 'temporal_reference_not_established',
        'interpretation': 'existing ochre marks; luminous function unknown' if variant == 'ochre'
                           else 'existing colored pixels; authored luminance modulation',
        'sourcePixelRegions': proposal['sourcePixelRegions'],
        'defaultStaticRecommended': stage['id'] == 'zanzibar'}
    with Image.open(R/layer['file']) as im:
        im = im.convert('RGBA')
        counts = []
        for patch in row['sourcePixelRegions']:
            colors = []
            for y in range(patch['y'], patch['y']+patch['height']):
                for x in range(patch['x'], patch['x']+patch['width']):
                    red, green, blue, alpha = im.getpixel((x, y))
                    color_matches = (red >= green+25 and red >= blue+20 if variant == 'red' else
                                     green >= red+18 and blue >= red+18 if variant == 'cyan' else
                                     red >= green+6 and green >= blue+18)
                    if alpha >= 128 and color_matches:
                        colors.append((red, green, blue, alpha))
            counts.append({'region': patch, 'rectanglePixels': patch['width']*patch['height'],
                'selectedColoredPixels': len(colors),
                'colorMin': list(map(min, zip(*colors))) if colors else None,
                'colorMax': list(map(max, zip(*colors))) if colors else None})
            assert colors, (stage['id'], patch)
    row['nativeMaskAnalysis'] = counts
    config['stages'].append(row)

save('PROTOTYPE_CONFIG.json', config)
save('SOURCE_INPUTS_BEFORE.json', {'schema': 'cqc.stage-animation-audit-inputs/1',
    'createdAt': datetime.datetime.now(datetime.timezone.utc).isoformat(), 'inputs': inputs})
save('CURRENT_STAGE_CLASSIFICATION.json', {'totalStages': len(classification),
    'autonomousAmbientStages': sum(x['hasAutonomousAmbient'] for x in classification),
    'cameraOnlyStages': [x['id'] for x in classification if not x['hasAutonomousAmbient']],
    'classification': classification})
print(json.dumps({'sourceInputs': len(inputs), 'total': 30, 'ambient': 27, 'cameraOnly': 3,
    'maskCounts': {x['id']: [p['selectedColoredPixels'] for p in x['nativeMaskAnalysis']]
                   for x in config['stages']}}, ensure_ascii=False))
