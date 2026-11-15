#!/usr/bin/env python3
"""Validate a reviewed preparation; apply only when explicitly passed --apply.

The default mode performs reads only. Applying appends rows by inserting JSON
text, preserving every byte of the old inventory in its original order. Native
PNGs are exclusively hardlinked, never edited, removed, moved or overwritten.
"""
import argparse
import hashlib
import json
import os
import re
import stat
import tempfile
import textwrap
from datetime import datetime, timezone
from pathlib import Path


def sha256(path):
    h = hashlib.sha256()
    with Path(path).open('rb') as f:
        for block in iter(lambda: f.read(1024 * 1024), b''):
            h.update(block)
    return h.hexdigest()


def require(condition, message):
    if not condition:
        raise ValueError(message)


def check_file(info, *, inode=False):
    path = Path(info['path'])
    require(path.is_file() and not path.is_symlink(), f'Not an ordinary file: {path}')
    st = path.stat()
    require(st.st_size == info['bytes'], f'Byte count changed: {path}')
    require(sha256(path) == info['sha256'], f'SHA256 changed: {path}')
    if inode:
        require((st.st_dev, st.st_ino) == (info['device'], info['inode']),
                f'Original inode changed: {path}')
    return path


def append_rows_preserving_old_bytes(raw, additions):
    """Locate the top-level files array and insert after its last row token."""
    s = raw.decode('utf-8')
    decoder = json.JSONDecoder()
    pos = 0

    def whitespace(i):
        while i < len(s) and s[i].isspace():
            i += 1
        return i

    pos = whitespace(pos)
    require(s[pos] == '{', 'Inventory root must be a JSON object')
    pos += 1
    found = None
    while True:
        pos = whitespace(pos)
        if s[pos] == '}':
            break
        key, key_end = decoder.raw_decode(s, pos)
        pos = whitespace(key_end)
        require(s[pos] == ':', 'Invalid inventory field')
        value_start = whitespace(pos + 1)
        value, value_end = decoder.raw_decode(s, value_start)
        if key == 'files':
            require(found is None and isinstance(value, list) and value,
                    'Exactly one nonempty files array is required')
            require(s[value_end - 1] == ']', 'Invalid files array close')
            last = value_end - 2
            while s[last].isspace():
                last -= 1
            require(s[last] == '}', 'Inventory rows must be JSON objects')
            found = last + 1
        pos = whitespace(value_end)
        if s[pos] == ',':
            pos += 1
        else:
            require(s[pos] == '}', 'Invalid inventory separator')
            break
    require(found is not None, 'files array not found')
    block = ',\n'.join(textwrap.indent(json.dumps(row, ensure_ascii=False, indent=2), '    ')
                         for row in additions)
    inserted = ',\n' + block
    merged = (s[:found] + inserted + s[found:]).encode('utf-8')
    point = len(s[:found].encode('utf-8'))
    require(merged[:point] == raw[:point] and merged.endswith(raw[point:]),
            'Literal old inventory bytes were not preserved')
    before = json.loads(raw)
    after = json.loads(merged)
    require(after['files'] == before['files'] + additions, 'Incorrect append result')
    require({k: v for k, v in before.items() if k != 'files'} ==
            {k: v for k, v in after.items() if k != 'files'},
            'An existing inventory field changed')
    return merged, dict(oldLiteralBytesPreservedInOrder=True, insertionByteOffset=point,
                        insertedBytes=len(merged) - len(raw), oldRowsExactlyUnchanged=True)


def validate_plan(plan, *, require_original_inode=True):
    require(plan['schema'] == 'cqc.pass8.additive-preservation-plan/1', 'Wrong plan schema')
    require(plan.get('mergeExecuted') is False, 'Plan was not prepared as an unapplied snapshot')
    repository = Path(plan['targetRepository']).resolve()
    inventory = Path(plan['targetInventory']).resolve()
    require(inventory.is_relative_to(repository), 'Inventory must be inside the planned repository')
    relative = Path(plan['targetPreservationDirectory'])
    require(not relative.is_absolute() and '..' not in relative.parts,
            'Invalid preservation directory')
    preserve_dir = repository / relative
    require(not any(p.is_symlink() for p in [preserve_dir, *preserve_dir.parents]),
            'Preservation directory must not traverse symlinks')
    baseline = check_file(plan['p7InventoryPreimage'])
    require(baseline.resolve() == inventory, 'Baseline must describe the target inventory')
    raw = inventory.read_bytes()
    before = json.loads(raw)
    require(len(before['files']) == plan['p7RowCount'], 'Baseline row count changed')
    old_names = {r['nativeFilename'] for r in before['files']}
    require(len(old_names) == len(before['files']), 'Baseline has duplicate native names')
    original_dir = Path(plan['originalPngDirectory']).resolve()
    names_now = sorted(p.name for p in original_dir.glob('*.png'))
    require(names_now == plan['originalPngNames'], 'Original image set changed after preparation')
    additions = plan['additions']
    new_names = {r['nativeFilename'] for r in additions}
    require(len(new_names) == len(additions), 'Duplicate planned native image')
    require(new_names.isdisjoint(old_names), 'Attempt to replace an old row')
    require(new_names | old_names == set(names_now), 'Unassigned original image or missing old image')
    for row in before['files']:
        original = original_dir / row['nativeFilename']
        old_preserved = repository / row['preservedFile']
        require(original.is_file() and old_preserved.is_file(), 'Missing historical native source')
        require(original.stat().st_size == old_preserved.stat().st_size == row['bytes'],
                f'Historical bytes changed: {row["nativeFilename"]}')
        require(sha256(original) == sha256(old_preserved) == row['sha256'],
                f'Historical SHA changed: {row["nativeFilename"]}')
    for info in plan['criticalEvidence']:
        check_file(info)
    current_selected = {}
    for delivery_info in plan['deliveries']:
        d = json.loads(check_file(delivery_info).read_bytes())
        require(d['uid'] == delivery_info['uid'], 'Current delivery UID changed')
        for r in d['sourceFiles']:
            current_selected[Path(r['nativeOriginal']).name] = d['uid']
    planned_selected = {r['nativeFilename']: r['uid'] for r in additions
                        if r['classification'] == 'selected_current_delivery'}
    require(planned_selected == current_selected, 'Current delivery selection changed')
    for row in additions:
        name = row['nativeFilename']
        require(re.fullmatch(r'exec-[0-9a-f-]+\.png', name) is not None, 'Invalid native filename')
        require(row['pixelsEdited'] is False, 'A planned native was edited')
        require(row['preservedFile'] == str(relative / name), 'Unexpected destination path')
        original = check_file(row['original'], inode=require_original_inode)
        require(original.resolve() == original_dir / name, 'Source path is outside the original directory')
        require(row['sha256'] == row['original']['sha256'] and row['bytes'] == row['original']['bytes'],
                'Row disagrees with original source bytes')
        existing = repository / row['preservedFile']
        if existing.exists():
            require(existing.is_file() and not existing.is_symlink() and
                    existing.stat().st_size == row['bytes'] and sha256(existing) == row['sha256'],
                    f'Existing preservation destination conflicts: {existing}')
    merged, literal_proof = append_rows_preserving_old_bytes(raw, additions)
    return repository, inventory, preserve_dir, raw, merged, literal_proof


def apply_plan(plan):
    repository, inventory, preserve_dir, before, after, proof = validate_plan(plan)
    lock = inventory.with_name(inventory.name + '.pass8-additive.lock')
    fd = os.open(lock, os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600)
    lock_stat = os.fstat(fd)
    created_links = []
    try:
        os.write(fd, (str(os.getpid()) + '\n').encode())
        os.close(fd)
        require(inventory.read_bytes() == before, 'Inventory changed before obtaining lock')
        preserve_dir.mkdir(parents=True, exist_ok=True)
        for row in plan['additions']:
            source = check_file(row['original'], inode=True)
            destination = repository / row['preservedFile']
            if not destination.exists():
                os.link(source, destination)  # No fallback copy and no native overwrite.
                created_links.append(str(destination))
            require(destination.stat().st_size == row['bytes'] and sha256(destination) == row['sha256'],
                    f'Preserved source verification failed: {destination}')
        backup = inventory.with_name(inventory.stem + '.before-pass8-' +
                                     hashlib.sha256(before).hexdigest() + '.json')
        if backup.exists():
            require(backup.read_bytes() == before, 'Conflicting inventory preimage backup')
        else:
            with backup.open('xb') as f:
                f.write(before)
                f.flush()
                os.fsync(f.fileno())
        require(inventory.read_bytes() == before, 'Inventory changed during source preservation')
        st = inventory.stat()
        with tempfile.NamedTemporaryFile(prefix=inventory.name + '.additive-', dir=inventory.parent,
                                         delete=False) as temporary:
            temporary.write(after)
            temporary.flush()
            os.fsync(temporary.fileno())
            temporary_path = Path(temporary.name)
        os.chmod(temporary_path, stat.S_IMODE(st.st_mode))
        require(inventory.read_bytes() == before, 'Inventory changed before atomic append')
        os.replace(temporary_path, inventory)
        require(inventory.read_bytes() == after, 'Written inventory does not match validated append')
        return dict(status='applied-additively', inventory=str(inventory),
                    beforeSha256=hashlib.sha256(before).hexdigest(),
                    afterSha256=hashlib.sha256(after).hexdigest(), beforeRows=plan['p7RowCount'],
                    appendedRows=len(plan['additions']), inventoryPreimageBackup=str(backup),
                    createdHardlinks=created_links, existingRowsReplaced=0,
                    nativeBytesEdited=0, nativeFilesDeleted=0, **proof)
    finally:
        # Only the ephemeral lock created by this invocation is removed.
        if lock.exists() and lock.stat().st_ino == lock_stat.st_ino:
            lock.unlink()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--plan', type=Path,
                        default=Path(__file__).with_name('PASS8_ADDITIVE_PRESERVATION_PLAN.json'))
    parser.add_argument('--apply', action='store_true',
                        help='Mutate the reviewed target only after root explicitly requests the merge')
    parser.add_argument('--report', type=Path, help='Optional exclusive output report path')
    args = parser.parse_args()
    plan = json.loads(args.plan.read_bytes())
    if args.apply:
        report = apply_plan(plan)
    else:
        _, inventory, _, before, after, proof = validate_plan(plan)
        report = dict(status='validated-read-only-no-merge-executed', inventory=str(inventory),
                      baselineSha256=hashlib.sha256(before).hexdigest(),
                      proposedAfterSha256=hashlib.sha256(after).hexdigest(),
                      beforeRows=plan['p7RowCount'], appendedRows=len(plan['additions']),
                      proposedTotalRows=plan['p7RowCount'] + len(plan['additions']),
                      nativeAndInventoryWrites=0, **proof)
    report['checkedAtUTC'] = datetime.now(timezone.utc).isoformat()
    report['planSha256'] = sha256(args.plan)
    if args.report:
        with args.report.open('x', encoding='utf-8') as f:
            json.dump(report, f, indent=2)
            f.write('\n')
    print(json.dumps(report, ensure_ascii=False))


if __name__ == '__main__':
    main()
