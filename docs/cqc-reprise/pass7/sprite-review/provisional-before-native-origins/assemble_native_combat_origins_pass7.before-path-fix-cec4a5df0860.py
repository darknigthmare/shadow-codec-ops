#!/usr/bin/env python3
"""Attach separately observed marks to actual native first-active frame geometry.

This reads supplied physical inspection evidence; it never edits images or grants
an artistic approval. Existing partial evidence versions are kept by their SHA.
"""
import argparse
import hashlib
import json
import math
from pathlib import Path

from PIL import Image

from assemble_reviewed_combat_sprite_pass7 import write_json

UIDS = ['core__raven', 'core__old_snake', 'core__quiet', 'archive__skull_face']


def assemble(root, marks_path):
    supplied = json.loads(marks_path.read_text())
    uid = supplied['uid']
    if uid not in UIDS or supplied.get('physicallyViewed') is not True:
        raise ValueError('Explicit physical source mark review for an exact PASS7 UID required')
    catalog = json.loads((root / 'data/combat-sprite-catalog-v1.json').read_text())
    entry = catalog['entries'][uid]
    if entry['mirror'] is not False:
        raise ValueError('Source marks require independently authored native facings')
    measured = {}
    for group, sides in supplied['entries'].items():
        measured[group] = {}
        for side in ['right', 'left']:
            mark = sides[side]
            actions = entry['actions'] if side == 'right' else entry['oppositeActions']
            action, index = mark['action'], mark['frame']
            if entry['phaseMap'][action]['active'][0] != index:
                raise ValueError('Point must name the actual first active source frame')
            frame = actions[action]['frames'][index]
            point = mark['point']
            if len(point) != 2 or not all(isinstance(v, int) for v in point):
                raise ValueError('A physically inspected integer source pixel is required')
            x, y, width, height = frame['rect']
            if not x <= point[0] < x + width or not y <= point[1] < y + height:
                raise ValueError('Observed source point is outside the actual native crop')
            raw = (root / frame['file']).read_bytes()
            if hashlib.sha256(raw).hexdigest() != frame['sha256']:
                raise ValueError('Observed native source hash changed')
            with Image.open(root / frame['file']) as image:
                alpha = image.getpixel(tuple(point))[3]
            if alpha <= 0:
                raise ValueError('Observed material contact point has no native alpha')
            source_height = entry['sourceFrameHeights'][frame['file']]
            scale = entry['displayHeight'] / source_height * 1.12
            face = 1 if side == 'right' else -1
            forward = (point[0] - x - width * frame['pivot'][0]) * scale * face
            height_above_ground = (y + height * frame['pivot'][1] - point[1]) * scale
            if not all(math.isfinite(v) for v in [forward, height_above_ground]):
                raise ValueError('Native world-origin geometry must be finite')
            if not 0 < forward <= 220 or not 0 < height_above_ground <= 330:
                raise ValueError('Observed source point exceeds existing origin bounds')
            measured[group][side] = {
                'action': action, 'frame': index, 'file': frame['file'],
                'sha256': frame['sha256'], 'point': point,
                'sourcePixelAlpha': alpha, 'rect': frame['rect'],
                'pivot': frame['pivot'], 'sourceFrameHeight': source_height,
                'pointKind': mark['pointKind'], 'physicallyViewed': True,
                'adaptedWorldForward': forward,
                'adaptedWorldHeight': height_above_ground,
                'engineBodyScale': 1.12,
                'notes': mark.get('notes', [])
            }
    path = root / 'preparation/combat-sprites-pass7/SOURCE_COMBAT_ORIGINS.json'
    document = json.loads(path.read_text()) if path.exists() else {
        'schema': 'cqc.native-source-origins/1',
        'reviewer': 'pass7_sprite_integrator', 'reviewedAt': '2026-10-02',
        'coordinateSystem': 'Full native PNG source pixels, without mirror or image edits',
        'entries': {}, 'slotSourceGroups': {}, 'suppliedPhysicalMarkReviews': {},
        'limits': [
            'Each point is physically observed on the supplied native first-active pose and is attached to its actual unchanged PNG SHA, crop, pivot and upright source scale.',
            'Marks align authored closest-supported versus animation, not extracted original boss rig or weapon world coordinates. Parent owns slot applicability, projectile physics and final browser contact proof.'
        ]
    }
    document['entries'][uid] = measured
    document['slotSourceGroups'][uid] = supplied['slotSourceGroups']
    document['suppliedPhysicalMarkReviews'][uid] = str(marks_path.relative_to(root))
    document['completeUIDs'] = [u for u in UIDS if u in document['entries']]
    document['pendingUIDs'] = [u for u in UIDS if u not in document['entries']]
    write_json(path, document)
    return {'uid': uid, 'originGroups': list(measured),
            'directionalMarks': sum(len(s) for s in measured.values()),
            'path': str(path), 'sha256': hashlib.sha256(path.read_bytes()).hexdigest(),
            'pendingUIDs': document['pendingUIDs']}


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', type=Path, default=Path(__file__).resolve().parent.parent)
    parser.add_argument('--marks', type=Path, required=True)
    args = parser.parse_args()
    print(json.dumps(assemble(args.root, args.marks), indent=2))
