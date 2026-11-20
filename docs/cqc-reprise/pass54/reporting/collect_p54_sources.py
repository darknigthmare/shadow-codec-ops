#!/usr/bin/env python3
"""Normalize actual P54 source proposals; briefs without a PNG remain pending."""
from pathlib import Path
import argparse
import datetime
import hashlib
import json
import struct

ROOT = Path('/tmp/cqc-p54-20261120')
BASE = Path('/workspace/cqc-static-20261113/livraison-finale/CQC_SUIVI_P52_POSES_UNIQUES_20261114_PUBLIC_V1.xlsx')


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def load(path):
    return json.loads(path.read_text(encoding='utf-8'))


def save(path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    temp = path.with_suffix(path.suffix + '.tmp')
    temp.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')
    temp.replace(path)


def editions(base):
    import openpyxl
    workbook = openpyxl.load_workbook(base, read_only=True, data_only=False)
    try:
        result = {}
        for values in workbook['P52_poses_statiques'].iter_rows(min_row=2, values_only=True):
            uid, _, incarnation, _, costume = values[:5]
            if uid not in result or costume == 'original':
                result[uid] = incarnation or ''
        return result
    finally:
        workbook.close()


def source_row(path, document, era):
    raw = document.get('rawPNG')
    if not isinstance(raw, dict) or not raw.get('path'):
        return None
    source = Path(raw['path'])
    if not source.is_file():
        return None
    data = source.read_bytes()
    assert data[:8] == b'\x89PNG\r\n\x1a\n', f'Not PNG: {source}'
    width, height = struct.unpack('>II', data[16:24])
    actual = hashlib.sha256(data).hexdigest()
    assert actual == raw['sha256'] and len(data) == raw['bytes'], f'Source pin differs: {source}'
    assert [width, height] == [raw['width'], raw['height']], f'Source dimensions differ: {source}'
    slots = document.get('slots', [])
    assert len(slots) <= 1, 'P54 gallery requires one pose per source proposal'
    slot = slots[0] if slots else document.get('frame', {})
    uid = slot.get('uid', document.get('uid'))
    kind = 'character' if path.parent.name == 'roster' else 'costume'
    record_id = document.get('id') or uid
    frame = slot.get('sourceRect', slot.get('rect', [0, 0, width, height]))
    assert len(frame) == 4 and all(isinstance(n, (int, float)) for n in frame)
    assert frame[0] >= 0 and frame[1] >= 0 and frame[2] > 0 and frame[3] > 0
    assert frame[0] + frame[2] <= width and frame[1] + frame[3] <= height
    notes = document.get('visualReview', {}).get('limits', document.get('limits', []))
    notes = notes if isinstance(notes, list) else [notes]
    held = document.get('status') in ['held', 'rejected', 'correction-pending']
    if record_id == 'OC-010' and source.name.endswith('-v1.png'):
        held = True
        notes = notes + ['OC-010 v1 is held by Root: worn exoskeleton is not the requested all-machine version. The fully mechanical v2 is selected; v1 stays as a historical version.']
    anchor = slot.get('bodyDatumX')
    floor = slot.get('footDatumY')
    # Do not derive a support point from the image center or fill missing values.
    anchor_status = 'pending' if anchor is None or floor is None else (
        'alpha-measured-source-only' if document.get('supportPointQA') or kind == 'character'
        else 'artist-candidate-review-pending')
    references = document.get('referenceSources', document.get('references', []))
    references = references if isinstance(references, list) else []
    urls = list(dict.fromkeys(r.get('url', r.get('URL')) for r in references if isinstance(r, dict) and r.get('url', r.get('URL'))))
    row = {'id': record_id, 'uid': uid, 'character': document.get('character', ''),
           'label': document.get('costumeName', document.get('name', document.get('character', 'Original'))),
           'kind': kind, 'family': document.get('family', 'original'),
           'edition': document.get('game', document.get('edition', era.get(uid, document.get('incarnation', '')))),
           'path': str(source), 'SHA256': actual, 'width': width, 'height': height,
           'sourceRect': frame, 'anchorX': anchor, 'footY': floor,
           'status': 'held' if held else 'review', 'anchorStatus': anchor_status,
           'promptPath': str(path), 'referenceURLs': urls, 'proposalPath': str(path),
           'proposalSHA256': digest(path), 'newArtwork': True, 'newAnimations': 0,
           'runtimeAdmittedByArtist': False, 'notes': notes}
    bounds = slot.get('bodyBounds')
    if bounds is not None:
        row['bodyBounds'] = bounds
    return row


def collect(root=ROOT, base=BASE, approved=None):
    era = editions(base)
    inputs, candidates = [], []
    for directory in ['costumes-a', 'costumes-b', 'roster']:
        for path in sorted((root / 'production' / directory).rglob('*ARTIFACT_PROPOSAL*.json')):
            document = load(path)
            inputs.append({'path': str(path), 'sha256': digest(path)})
            row = source_row(path, document, era)
            if row and row['id'] != 'OC-002':
                candidates.append(row)
    ledger_path = root / 'publication/SOURCE_COMMITS_PRIVATE_V1.json'
    ledger = {item['sha256']: item for item in load(ledger_path)['rows']} if ledger_path.exists() else {}
    for row in candidates:
        pin = ledger.get(row['SHA256'])
        if pin:
            row['immutableURL'] = 'https://raw.githubusercontent.com/darknigthmare/shadow-codec-ops/' + pin['commit'] + '/' + pin['gitPath']
    by_id = {}
    for row in candidates:
        previous = by_id.get(row['id'])
        if previous is None or (row['status'] != 'held', row['proposalPath']) > (previous['status'] != 'held', previous['proposalPath']):
            by_id[row['id']] = row
    if approved is not None:
        allowed = set(approved)
        by_id = {key: row for key, row in by_id.items() if row['SHA256'] in allowed}
        assert allowed == {row['SHA256'] for row in by_id.values()}, 'Approved Source hash lacks an actual eligible proposal'
    rows = sorted(by_id.values(), key=lambda row: (row['kind'], row['id']))
    visible = [row for row in rows if row['status'] == 'review']
    held = list({row['SHA256']: row for row in candidates if row['status'] == 'held'}.values())
    return {'schema': 'cqc.p54.normalized-static-sources/1',
            'atUTC': datetime.datetime.now(datetime.timezone.utc).isoformat(),
            'state': 'DRAFT_LIVE_ARTIFACT_INVENTORY' if approved is None else 'ROOT_FROZEN_SOURCE_INVENTORY',
            'rows': visible, 'heldRows': held,
            'counts': {'visibleSourceRows': len(visible), 'newCostumePoses': sum(row['kind'] == 'costume' for row in visible),
                       'newCharacterPoses': sum(row['kind'] == 'character' for row in visible),
                       'uniquePhysicalPNGs': len({row['SHA256'] for row in visible}),
                       'heldSourceRows': len(held),
                       'newGanderArt': 0, 'newAnimations': 0, 'runtimeAdmissionsFromThisInventory': 0},
            'inputProposals': inputs,
            'qualification': 'Actual read-back PNGs only. New source versions do not recover historical lost bytes. Presence is not runtime or 1:1 certification. OC-002 generation guard excluded; OC-010 v1 held. Gander existing43 PNGs are reused machine sources, not new drawings.'}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', type=Path, default=ROOT)
    parser.add_argument('--base', type=Path, default=BASE)
    parser.add_argument('--freeze', type=Path, help='Root-approved freeze JSON with approvedSourceSHA256 list')
    args = parser.parse_args()
    freeze = load(args.freeze) if args.freeze else None
    report = collect(args.root, args.base, freeze['approvedSourceSHA256'] if freeze else None)
    target = args.root / 'reporting' / 'P54_NORMALIZED_SOURCE_INVENTORY_PRIVATE_V1.json'
    save(target, report)
    print(json.dumps({'output': str(target), 'sha256': digest(target), **report['counts']}))


if __name__ == '__main__':
    main()
