#!/usr/bin/env python3
"""Assemble native-source frame metadata from a separately supplied visual review.

The delivery and integrator review are evidence supplied after actual source inspection.
This tool measures native PNG geometry and copies provenance; it does not certify art,
edit images, replace existing approved UID art, or change the runtime catalog.
"""
from __future__ import annotations

import argparse
import copy
import hashlib
import json
import math
from pathlib import Path
import shutil

from inspect_combat_sprite_sheet import inspect_components
from prepare_combat_sprite import validate_entry


def write_json(path: Path, value: object) -> None:
    raw = (json.dumps(value, ensure_ascii=False, indent=2) + '\n').encode()
    path.parent.mkdir(parents=True, exist_ok=True)
    if path.exists() and path.read_bytes() != raw:
        old = path.read_bytes()
        previous = path.with_name(path.stem + '.previous-' + hashlib.sha256(old).hexdigest()[:12] + path.suffix)
        if previous.exists() and previous.read_bytes() != old:
            raise ValueError('Preserved provenance collision: ' + str(previous))
        if not previous.exists():
            previous.write_bytes(old)
    path.write_bytes(raw)


def assemble(root: Path, delivery_path: Path, review_path: Path) -> dict:
    delivery = json.loads(delivery_path.read_text(encoding='utf-8'))
    observed = json.loads(review_path.read_text(encoding='utf-8'))
    uid = delivery['uid']
    if uid not in {'core__raven', 'core__old_snake', 'core__quiet', 'archive__skull_face'}:
        raise ValueError('PASS7 integration is restricted to its four exact original-game UIDs')
    if delivery.get('schema') != 'cqc.native-combat-delivery/1' or delivery.get('mirror') is not False:
        raise ValueError('Reviewed independent native-facing delivery schema is required')
    if delivery.get('review', {}).get('status') != 'approved':
        raise ValueError('Producer visual review must be approved before assembly')
    if observed.get('uid') != uid or not observed.get('reviewer') or observed.get('status') != 'approved':
        raise ValueError('Explicit named visual review for this exact UID is required')
    source_rows = delivery['sourceFiles']
    if len(source_rows) != 6 or len({row['sha256'] for row in source_rows}) != 6:
        raise ValueError('Six independent byte-distinct native PNGs are required')
    if {row['key'] for row in source_rows} != {'a-right', 'a-left', 'b-right', 'b-left', 'c-right', 'c-left'}:
        raise ValueError('Exactly six reviewed A/B/C sources and both independent facings are required')
    prep = root / 'preparation/combat-sprites-pass7' / uid
    source_files, tables, scales, technical = [], {}, {}, []
    for row in source_rows:
        key = row['key']
        source = Path(row['source'])
        sha = hashlib.sha256(source.read_bytes()).hexdigest()
        if row.get('columns') != 4 or row.get('rows') != 3 or row.get('poseCount') != 12 or row.get('mirror') is not False or row.get('facing') != (1 if key.endswith('right') else -1):
            raise ValueError('Every sheet must declare its independent 4x3 twelve-pose facing')
        checked = observed['sources'].get(key, {})
        if checked.get('sha256') != sha or checked.get('completeBodyAndWeaponViewed') is not True:
            raise ValueError('Actual visual source review/hash is missing for ' + key)
        if row.get('sha256') and row['sha256'] != sha:
            raise ValueError('Generator source SHA mismatch for ' + key)
        height = checked.get('standingSourceHeight')
        if not isinstance(height, (int, float)) or height <= 0:
            raise ValueError('Observed fixed upright source scale required for ' + key)
        file = 'assets/combat-sprites/' + uid + '/' + key + '-v1.png'
        layout = inspect_components(source, 4, 3, file)
        # Large authored weapons can shift the historical alpha-centroid anchor.
        # A separately observed body/ground point may override only this new UID's
        # frame pivot. Crop, native PNG bytes and every previous entry stay intact.
        for index, point in checked.get('observedBodyPivots', {}).items():
            if not str(index).isdigit() or not 0 <= int(index) < 12:
                raise ValueError('Observed body pivot must name an actual source cell')
            if not isinstance(point, list) or len(point) != 2 or not all(isinstance(v, (int, float)) and math.isfinite(v) for v in point):
                raise ValueError('Observed body pivot requires two finite full-sheet pixel coordinates')
            cell = layout['cells'][int(index)]
            x, y, w, h = cell['frame']['rect']
            if not x <= point[0] <= x + w or not y <= point[1] <= y + h:
                raise ValueError('Observed body/ground pivot must stay inside its complete native crop')
            cell['frame']['pivot'] = [(point[0] - x) / w, (point[1] - y) / h]
            cell['observedBodyPivotFullSheet'] = point
        write_json(prep / 'layouts' / (key + '.json'), layout)
        tables[key] = layout['cells']
        scales[file] = height
        source_files.append({'file': file, 'source': str(source)})
        technical.append({'key': key, 'sha256': sha, 'nativeDimensions': [layout['width'], layout['height']],
                          'completeObservedPoseBodies': 12, 'unchangedSourceImage': True,
                          'canvasContourFrames': layout['foreign_body_frames'], 'standingSourceHeight': height,
                          'visualNotes': checked.get('notes', [])})
    review = copy.deepcopy(delivery['review'])
    review['reviewer'] += ' + ' + observed['reviewer']
    review['limits'] += observed.get('limits', [])
    review['sources'] = []
    for item in delivery['review']['sources']:
        item = copy.deepcopy(item)
        source = Path(item['file'])
        raw = source.read_bytes()
        if item.get('sha256') and hashlib.sha256(raw).hexdigest() != item['sha256']:
            raise ValueError('Canonical reference changed: ' + str(source))
        destination = prep / 'references' / source.name
        if destination.exists() and destination.read_bytes() != raw:
            raise ValueError('Canonical reference filename collision: ' + str(destination))
        destination.parent.mkdir(parents=True, exist_ok=True)
        if not destination.exists():
            shutil.copyfile(source, destination)
        item['file'] = str(destination.relative_to(root))
        item['sha256'] = hashlib.sha256(raw).hexdigest()
        review['sources'].append(item)
    entry = {'uid': uid, 'name': delivery['name'], 'game': delivery['game'], 'incarnation': delivery['incarnation'],
             'coverage': 'action-frames', 'displayHeight': observed.get('displayHeight', delivery.get('displayHeight', 230)),
             'baseFrameHeight': 350, 'sourceFrameHeights': scales, 'facing': 1, 'mirror': False,
             'fallbackMissingActions': True, 'actionMap': delivery['actionMap'], 'phaseMap': delivery['phaseMap'],
             'actions': {}, 'oppositeActions': {}, 'review': review}
    for side, target in [('right', 'actions'), ('left', 'oppositeActions')]:
        for action, spec in delivery['actionLayout'].items():
            cells = tables[spec['sheet'] + '-' + side]
            entry[target][action] = {'fps': spec['fps'], 'loop': spec['loop'],
                                     'frames': [copy.deepcopy(cells[index]['frame']) for index in spec['indices']]}
        if 'attack' not in entry[target]:
            entry[target]['attack'] = copy.deepcopy(entry[target].get('punch') or entry[target].get('blade'))
        if not entry[target]['attack']:
            raise ValueError('Generic attack pose must have an actual authored visual group')
    if 'attack' not in entry['phaseMap']:
        alias = 'punch' if 'punch' in entry['actions'] else 'blade'
        if alias in entry['phaseMap']:
            entry['phaseMap']['attack'] = copy.deepcopy(entry['phaseMap'][alias])
    document = {'entry': entry, 'sourceFiles': source_files, 'technicalReview': technical,
                'providedGeneratorDelivery': str(delivery_path), 'providedIntegratorVisualReview': observed}
    fighters = json.loads((root / 'data/chronicles-v056.json').read_text())['fighters']
    validate_entry(entry, source_files, {f['uid'] for f in fighters})
    poses = {(f['file'], tuple(f['rect'])) for a in [*entry['actions'].values(), *entry['oppositeActions'].values()] for f in a['frames']}
    if len(poses) != 72:
        raise ValueError('Action groups must retain all 72 authored poses; aliases cannot inflate counts')
    write_json(prep / 'GENERATOR_DELIVERY.json', delivery)
    write_json(prep / 'INTEGRATOR_VISUAL_REVIEW.json', observed)
    write_json(prep / 'FINAL_IMPORT_REVIEW.json', document)
    return {'uid': uid, 'nativePNG': 6, 'uniquePoses': len(poses), 'review': str(prep / 'FINAL_IMPORT_REVIEW.json'),
            'catalogNotChanged': True, 'sourceImageBytesUntouched': True}


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', type=Path, default=Path(__file__).resolve().parent.parent)
    parser.add_argument('--delivery', type=Path, required=True)
    parser.add_argument('--integrator-review', type=Path, required=True)
    args = parser.parse_args()
    print(json.dumps(assemble(args.root, args.delivery, args.integrator_review), indent=2))
