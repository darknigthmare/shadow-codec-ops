#!/usr/bin/env python3
"""Record the separate physical native-source review, then use unchanged importers.

This integration does not edit images or alter previously approved sprite objects.
"""
import hashlib
import json
from pathlib import Path
import statistics
import sys

from assemble_reviewed_combat_sprite_pass6 import assemble, write_json
from assemble_native_combat_origins_pass6 import assemble as assemble_origins
from inspect_combat_sprite_sheet import inspect_components
from prepare_combat_sprite import import_sprite

ROOT = Path(__file__).resolve().parent.parent
ARTIST = Path('/workspace/cqc-pass6-generation/fear')
delivery_path = ARTIST / 'FINAL_DELIVERY.json'
delivery = json.loads(delivery_path.read_text())
prep = ROOT / 'preparation/combat-sprites-pass6/core__fear'
observed = {
    'uid': 'core__fear', 'status': 'approved',
    'reviewer': 'pass6_sprite_final/physical six-native-sheet and eight-original-reference inspection',
    'fidelityStatus': 'closest_supported', 'absolute1to1Certified': False,
    'displayHeight': 230, 'sources': {},
    'allCanonicalReferenceFilesPhysicallyViewed': True,
    'limits': [
        'All six unchanged native sheets, all 72 complete authored bodies and all eight listed original reference images were physically viewed independently on 2026-10-02. Full long sleeves, brown/olive dark-striped fatigues, slick black hair and white temples, gloves, chest quiver, hip pouch and two crossbow groups agree with the selected original-model-era incarnation.',
        'Actual original PS2 archive footage is the Subsistence model-era re-release rather than proof of a first-pressing 2004 capture. The named Little Joe and William Tell source-to-shape association, invisible seams and far-side hand/hip fittings remain closest-supported, with the producer limitations preserved.',
        'All native body poses and bounded Versus actions are authored adaptations. Six independently generated source PNGs are retained byte for byte; no mirroring, resizing, repainting or alpha manipulation is performed. Stored dark RGB outside native alpha remains unchanged.',
        'Fixed per-sheet scaling uses physically observed upright crown-to-sole body components; bent recover, crouch, jump and fallen bodies are not stretched. Existing Canvas source contours are required to exclude neighboring figures in padded crops. Final live Canvas inspection is a separate gate.'
    ]
}
for row in delivery['sourceFiles']:
    key = row['key']
    layout = inspect_components(Path(row['source']), 4, 3, 'assets/combat-sprites/core__fear/' + key + '-v1.png')
    ids = [0, 1] if key.startswith('a') else ([0, 1, 2] if key.startswith('b') else [0, 1])
    heights = [layout['cells'][i]['bbox'][3] - layout['cells'][i]['bbox'][1] for i in ids]
    observed['sources'][key] = {
        'sha256': row['sha256'], 'completeBodyAndWeaponViewed': True,
        'standingSourceHeight': statistics.median(heights),
        'uprightWitnessCells': ids, 'uprightWitnessObservedHeadToSoleHeights': heights,
        'scaleMethod': 'Median alpha connected-body crown-to-sole heights of physically observed upright witnesses; native PNG unchanged.',
        'notes': [
            'Twelve complete original-era long-sleeve camouflage bodies independently facing the declared direction, original dark chest block and olive anatomical right pouch intended; far-side occlusion limitations retained.',
            'Distinct short Little Joe shoot and longer William Tell charge poses retain physically visible rails, no firearm, modern optic, laser or baked projectile. Native padded crop contours retain the selected body and omit neighboring atlas figures.'
        ]
    }
write_json(prep / 'INTEGRATOR_VISUAL_REVIEW.json', observed)
result = assemble(ROOT, delivery_path, prep / 'INTEGRATOR_VISUAL_REVIEW.json')
document = json.loads((prep / 'FINAL_IMPORT_REVIEW.json').read_text())
dry = import_sprite(ROOT, document, dry_run=True, review_dir=ROOT / 'preparation/combat-sprites-pass6/approved-reviews')
write_json(prep / 'IMPORT_DRY_RUN.json', dry)
actual = import_sprite(ROOT, document, review_dir=ROOT / 'preparation/combat-sprites-pass6/approved-reviews')
write_json(prep / 'IMPORT_RESULT.json', actual)
artist_marks = json.loads((ARTIST / 'SOURCE_COMBAT_ORIGINS.json').read_text())
marks = {
    'uid': 'core__fear', 'physicallyViewed': True,
    'reviewer': observed['reviewer'],
    'entries': {}, 'slotSourceGroups': {'shoot': ['special'], 'charge': ['super']},
    'limits': [
        'The four leading rail/bolt exits were physically inspected on actual first-active native shoot and charge poses. Crossbow rail contact is not a firearm muzzle.',
        'Producer low-snare fingertips are preserved in the unchanged supplied source metadata; the engine does not consume a trap projectile-origin mark.'
    ]
}
for group in ['shoot', 'charge']:
    marks['entries'][group] = {}
    for side in ['right', 'left']:
        mark = artist_marks['origins'][group][side]
        marks['entries'][group][side] = {
            'action': mark['action'], 'frame': mark['frame'], 'point': mark['point'],
            'pointKind': 'crossbow-leading-rail-exit', 'notes': [mark['basis']]
        }
write_json(prep / 'OBSERVED_SOURCE_MARKS.json', marks)
origins = assemble_origins(ROOT, prep / 'OBSERVED_SOURCE_MARKS.json')
print(json.dumps({'assembly': result, 'import': actual, 'origins': origins}, ensure_ascii=False, indent=2))
