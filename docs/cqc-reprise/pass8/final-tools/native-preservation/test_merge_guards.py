#!/usr/bin/env python3
"""Byte-level fixture checks only. Never calls apply_plan or touches real R/S."""
import copy
import hashlib
import importlib.util
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('merge_prepared', ROOT / 'merge_additive_inventory.py')
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


def info(path):
    st = path.stat()
    return dict(path=str(path), bytes=st.st_size, sha256=hashlib.sha256(path.read_bytes()).hexdigest(),
                device=st.st_dev, inode=st.st_ino)


def fixture():
    directory = ROOT / 'byte-level-test-fixtures'
    directory.mkdir(exist_ok=True)
    repo, originals = directory / 'repository', directory / 'originals'
    (repo / 'preparation').mkdir(parents=True, exist_ok=True)
    (repo / 'history').mkdir(exist_ok=True)
    originals.mkdir(exist_ok=True)
    # Deliberately byte fixtures, not generated graphics or actual native originals.
    old_name = 'exec-00000000-0000-0000-0000-000000000000.png'
    new_name = 'exec-11111111-1111-1111-1111-111111111111.png'
    for path, content in [(originals / old_name, b'OLD-BYTE-FIXTURE-NOT-A-REAL-IMAGE'),
                          (originals / new_name, b'NEW-BYTE-FIXTURE-NOT-A-REAL-IMAGE'),
                          (repo / 'history/old.png', b'OLD-BYTE-FIXTURE-NOT-A-REAL-IMAGE')]:
        if path.exists():
            assert path.read_bytes() == content
        else:
            path.write_bytes(content)
    old_info, new_info = info(originals / old_name), info(originals / new_name)
    row = dict(nativeFilename=old_name, bytes=old_info['bytes'], sha256=old_info['sha256'],
               preservedFile='history/old.png', pixelsEdited=False)
    body = dict(schema='fixture-preservation', files=[row], additionalUnassignedFiles=[],
                warning='Conserver éèà 中文; espaces et CRLF volontaires')
    raw = json.dumps(body, ensure_ascii=False, indent=3).replace('\n', '\r\n').encode()
    inv = repo / 'preparation/inventory.json'
    if inv.exists():
        assert inv.read_bytes() == raw
    else:
        inv.write_bytes(raw)
    delivery = directory / 'delivery.json'
    delivery_body = dict(uid='fixture__only', sourceFiles=[dict(nativeOriginal=str(originals / new_name))])
    delivery_raw = json.dumps(delivery_body).encode()
    if delivery.exists():
        assert delivery.read_bytes() == delivery_raw
    else:
        delivery.write_bytes(delivery_raw)
    add = dict(nativeFilename=new_name, bytes=new_info['bytes'], sha256=new_info['sha256'],
               preservedFile='preparation/new-originals/' + new_name, pixelsEdited=False,
               uid='fixture__only', classification='selected_current_delivery', original=new_info)
    plan = dict(schema='cqc.pass8.additive-preservation-plan/1', mergeExecuted=False,
                targetRepository=str(repo), targetInventory=str(inv),
                targetPreservationDirectory='preparation/new-originals',
                p7InventoryPreimage=info(inv), p7RowCount=1,
                originalPngDirectory=str(originals), originalPngNames=sorted([old_name, new_name]),
                additions=[add], criticalEvidence=[], deliveries=[dict(uid='fixture__only', **info(delivery))])
    return plan, raw


def main():
    plan, raw = fixture()
    before_native = {p: p.read_bytes() for p in Path(plan['originalPngDirectory']).glob('*.png')}
    _, inv, preserve, before, merged, proof = module.validate_plan(plan)
    assert before == raw and inv.read_bytes() == raw
    assert not preserve.exists(), 'Read-only validation created a target directory'
    assert proof['oldLiteralBytesPreservedInOrder']
    assert json.loads(merged)['files'] == json.loads(raw)['files'] + plan['additions']
    assert len(merged) > len(raw)
    results = [dict(check='literal insertion preserves Unicode, CRLF, old row and root fields', passed=True),
               dict(check='validating a plan performs no native, inventory or target-directory write', passed=True)]
    cases = []
    changed_inventory = copy.deepcopy(plan)
    changed_inventory['p7InventoryPreimage']['sha256'] = '0' * 64
    cases.append(('changed frozen inventory SHA is rejected', changed_inventory))
    changed_original = copy.deepcopy(plan)
    changed_original['additions'][0]['original']['sha256'] = '0' * 64
    cases.append(('changed native source SHA is rejected', changed_original))
    changed_inode = copy.deepcopy(plan)
    changed_inode['additions'][0]['original']['inode'] += 1
    cases.append(('replacement original inode is rejected', changed_inode))
    omitted = copy.deepcopy(plan)
    omitted['additions'] = []
    cases.append(('unassigned image is rejected', omitted))
    unknown_set = copy.deepcopy(plan)
    unknown_set['originalPngNames'] = []
    cases.append(('new or missing source filename is rejected', unknown_set))
    replaced_row = copy.deepcopy(plan)
    replaced_row['additions'][0]['nativeFilename'] = json.loads(raw)['files'][0]['nativeFilename']
    cases.append(('replacement of a frozen historical row is rejected', replaced_row))
    bad_destination = copy.deepcopy(plan)
    bad_destination['targetPreservationDirectory'] = '../outside'
    cases.append(('destination traversal is rejected', bad_destination))
    changed_selection = copy.deepcopy(plan)
    changed_selection['additions'][0]['classification'] = 'rejected_preserved'
    cases.append(('drift from the current selected delivery is rejected', changed_selection))
    changed_evidence = copy.deepcopy(plan)
    ev = copy.deepcopy(plan['deliveries'][0])
    ev['sha256'] = '0' * 64
    changed_evidence['criticalEvidence'] = [ev]
    cases.append(('changed producer evidence is rejected', changed_evidence))
    for label, bad_plan in cases:
        try:
            module.validate_plan(bad_plan)
        except ValueError as exc:
            results.append(dict(check=label, passed=True, rejection=str(exc)))
        else:
            raise AssertionError('Guard did not reject: ' + label)
    assert inv.read_bytes() == raw
    assert all(path.read_bytes() == data for path, data in before_native.items())
    assert not preserve.exists()
    report = dict(schema='cqc.pass8.additive-merge-fixture-checks/1', passed=len(results), failures=0,
                  actualProductionWrites=0, applyFunctionExecuted=False,
                  fixtureScope='Byte-only test fixtures under preservation-prep; no graphical source created or edited.',
                  checks=results)
    path = ROOT / 'MERGE_GUARD_FIXTURE_PROOF.json'
    with path.open('x', encoding='utf-8') as f:
        json.dump(report, f, indent=2)
        f.write('\n')
    print(json.dumps({k: v for k, v in report.items() if k != 'checks'}))


if __name__ == '__main__':
    main()
