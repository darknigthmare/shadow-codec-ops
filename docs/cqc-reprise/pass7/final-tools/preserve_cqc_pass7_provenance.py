#!/usr/bin/env python3
"""Preserve frozen PASS7 producers without changing source image bytes.

No copy is made by default. --execute requires all four complete, reviewed
deliveries. Existing provenance paths may only contain identical bytes.
"""
from pathlib import Path
import argparse
import hashlib
import json
import os
import shutil

W = Path('/workspace')
R = W / 'cqc-game-working/cqc-versus-v056'
DEST = R / 'preparation/reprise-pass7-provenance'
TARGETS = {
    'raven': 'core__raven', 'old-snake': 'core__old_snake',
    'quiet': 'core__quiet', 'skull-face': 'archive__skull_face',
}


def digest(p):
    return hashlib.sha256(p.read_bytes()).hexdigest()


def plan():
    rows, deliveries = [], []
    for name, uid in TARGETS.items():
        source = W / 'cqc-pass7-generation' / name
        delivery = source / 'FINAL_DELIVERY.json'
        if not delivery.is_file():
            raise ValueError('Producer has not frozen a complete delivery: ' + uid)
        d = json.loads(delivery.read_text())
        if d.get('uid') != uid or d.get('schema') != 'cqc.native-combat-delivery/1':
            raise ValueError('Wrong exact incarnation/delivery schema: ' + uid)
        if d.get('mirror') is not False or d.get('review', {}).get('status') != 'approved':
            raise ValueError('Independent native facings and observed approval required: ' + uid)
        pngs = d.get('sourceFiles', [])
        if len(pngs) != 6 or len({p['sha256'] for p in pngs}) != 6:
            raise ValueError('Incomplete six-sheet producer: ' + uid)
        for png in pngs:
            p = Path(png['source'])
            if digest(p) != png['sha256'] or png.get('poseCount') != 12:
                raise ValueError('Changed or incomplete native source: ' + str(p))
        deliveries.append({'uid': uid, 'path': str(delivery), 'sha256': digest(delivery)})
        for p in sorted(source.rglob('*')):
            if p.is_file() and not p.is_symlink():
                rows.append((p, DEST / 'generation' / name / p.relative_to(source)))
    references = W / 'cqc-pass7-reference-selection'
    for p in sorted(references.rglob('*')):
        if p.is_file() and not p.is_symlink():
            rows.append((p, DEST / 'initial-reference-selection' / p.relative_to(references)))
    for name in ['cqc-delivered-pass6-baseline-files.json',
                 'cqc-pass7-frozen-baseline-facts.json',
                 'cqc-pass7-disk-preservation.json',
                 'cqc-pass7-publication-tool-preparation.json']:
        p = W / name
        if not p.is_file():
            raise ValueError('Missing baseline/proof: ' + str(p))
        rows.append((p, DEST / 'baseline-and-preservation' / name))
    return rows, deliveries


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--execute', action='store_true')
    args = parser.parse_args()
    rows, deliveries = plan()
    output = []
    for p, target in rows:
        expected = digest(p)
        if target.exists() and digest(target) != expected:
            raise ValueError('Preserved provenance collision: ' + str(target))
        if args.execute:
            target.parent.mkdir(parents=True, exist_ok=True)
            if not target.exists():
                # Reviewed native PNG files are immutable. Hardlinks retain all
                # paths and avoid another complete raster copy on this filesystem.
                if p.suffix.lower() == '.png' and p.stat().st_dev == target.parent.stat().st_dev:
                    os.link(p, target)
                else:
                    shutil.copyfile(p, target)
            if digest(target) != expected:
                raise ValueError('Byte preservation failed: ' + str(target))
        output.append({'source': str(p), 'file': str(target.relative_to(R)),
                       'bytes': p.stat().st_size, 'sha256': expected})
    report = {'schema': 'cqc.pass7.provenance-preservation/1',
              'mode': 'preserved' if args.execute else 'read_only_plan',
              'deliveries': deliveries, 'files': output,
              'fileCount': len(output), 'totalBytes': sum(r['bytes'] for r in output),
              'nativeImageBytesUntouched': True, 'rejectionsRemainRejections': True}
    if args.execute:
        target = DEST / 'PRESERVATION_MANIFEST.json'
        raw = (json.dumps(report, ensure_ascii=False, indent=2) + '\n').encode()
        if target.exists() and target.read_bytes() != raw:
            raise ValueError('Frozen preservation manifest collision')
        target.write_bytes(raw)
    print(json.dumps({k: v for k, v in report.items() if k != 'files'}, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
