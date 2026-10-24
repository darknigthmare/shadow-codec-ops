#!/usr/bin/env python3
"""Read-only inventory of the seven units planned before the temporary workspace reset."""
from pathlib import Path
import hashlib
import json

ROOT = Path('/workspace/cqc-pass21-application/public/cqc')
OUT = Path(__file__).resolve().parent

def pin(path):
    data = path.read_bytes()
    return {'path': str(path), 'bytes': len(data), 'sha256': hashlib.sha256(data).hexdigest()}

rows = []
for uid, name, term in [
    ('pass40__raiden_r00', 'Raiden R-00', 'raiden-r00'),
    ('pass19__watcher_survive', 'Watcher', 'watcher'),
    ('pass19__grabber_survive', 'Grabber', 'grabber'),
    ('pass19__detonator_survive', 'Detonator', 'detonator'),
    ('pass40__powered_suit_mgs4', 'Powered Suit MGS4', 'powered'),
    ('pass19__fenrir_mgr', 'LQ-84 Fenrir', 'fenrir'),
    ('pass19__vodomjerka_mgr', 'Vodomjerka', 'vodom'),
]:
    assets = [pin(p) for p in sorted((ROOT / 'assets').rglob('*.png')) if term in str(p.relative_to(ROOT)).lower()]
    row = {'uid': uid, 'name': name, 'existingNamedPNGs': assets,
           'newP40UnitPlayable': False, 'newP40ArtRecovered': False,
           'recoveryStatus': 'requires-native-art-regeneration-and-source-review'}
    if term == 'raiden-r00':
        row.update({
            'existingOlderImplementation': pin(ROOT / 'src/cqc-pass31-raiden-r00.js'),
            'existingOlderScope': 'P31 core__raiden costume mgr_r00_standard, RAY prologue and Arsenal RAY simulation only',
            'physicalNativePosesPerFacing': 8,
            'knownPoseAliases': {'jump': 'walk pose 2', 'hit': 'guard pose 1', 'recover': 'crouch pose 4'},
            'missingDedicatedArt': ['jump', 'impact', 'recovery', 'roll', 'throw', 'finishers'],
            'recoveryStatus': 'older-restricted-body-preserved; complete-distinct-P40-unit-not-recovered',
        })
    else:
        row['missingDedicatedArt'] = ['both native combat facings', 'complete action bodies', 'native articulated joints for mechanical units']
    rows.append(row)

report = {
    'schema': 'cqc.p40.seven-source-recovery/1',
    'observedDateUTC': '2026-10-22',
    'sourceOfPlan': 'conversation handoff; not evidence that missing files were recovered',
    'productWritesPerformed': False,
    'newPlayableUnitCount': 0,
    'countedTowardCompletedBatch30': 0,
    'units': rows,
    'backlogEvidence': [pin(Path('/workspace/cqc-pass21-application/docs/cqc-reprise/pass31/NEXT_LOT.md')),
                        pin(ROOT / 'src/cqc-pass27-machine-completion.js')],
    'qualification': 'No activation or fallback substitution is safe from the currently recovered sources. Existing P31 R-00 body remains unchanged.',
}
target = OUT / 'SEVEN_SOURCE_RECOVERY_ACTUAL.json'
target.write_text(json.dumps(report, indent=2, ensure_ascii=False) + '\n')
print(json.dumps({'report': pin(target), 'newPlayableUnits': 0, 'existingOlderR00PNGs': len(rows[0]['existingNamedPNGs'])}))
