#!/usr/bin/env python3
"""Read-only PASS8 provenance preparation; writes only beside this script."""
import argparse
import collections
import hashlib
import json
import os
import re
import stat
from datetime import datetime, timezone
from pathlib import Path

OUT = Path(__file__).resolve().parent
R = Path('/workspace/cqc-game-working/cqc-versus-v056')
P = Path('/workspace/cqc-pass8-generation')
G = Path('/workspace/generated_images')
INV = R / 'preparation/ALL_NATIVE_GENERATION_PRESERVATION.json'
BASE_SHA = '9e57801f5bbb324419cdcedcf6df80d3a4e1613b92c4a4e0f1c5a667629ab27b'
PRESERVED_REL = 'preparation/reprise-pass8-provenance/all-native-originals'
SKIP_DIRS = {'.git', 'node_modules', '.venv', 'venv', '__pycache__', '.cache'}
CACHE = {}


def stable_info(path):
    path = Path(path)
    before = path.stat()
    assert stat.S_ISREG(before.st_mode), ('not a regular file', path)
    cache_key = (before.st_dev, before.st_ino, before.st_size, before.st_mtime_ns)
    if cache_key not in CACHE:
        h = hashlib.sha256()
        with path.open('rb') as stream:
            for block in iter(lambda: stream.read(1024 * 1024), b''):
                h.update(block)
        CACHE[cache_key] = h.hexdigest()
    after = path.stat()
    assert (before.st_dev, before.st_ino, before.st_size, before.st_mtime_ns) == (
        after.st_dev, after.st_ino, after.st_size, after.st_mtime_ns), ('changed during read', path)
    return dict(path=str(path), bytes=before.st_size, sha256=CACHE[cache_key],
                device=before.st_dev, inode=before.st_ino, linksAtSnapshot=after.st_nlink)


def read_json(path):
    return json.loads(Path(path).read_bytes())


def put(name, value):
    path = OUT / name
    with path.open('x', encoding='utf-8') as stream:
        json.dump(value, stream, indent=2, ensure_ascii=False)
        stream.write('\n')
    return stable_info(path)


def strings(value):
    if isinstance(value, str):
        yield value
    elif isinstance(value, dict):
        for v in value.values():
            yield from strings(v)
    elif isinstance(value, list):
        for v in value:
            yield from strings(v)


def main():
    started = datetime.now(timezone.utc).isoformat()
    baseline_bytes = INV.read_bytes()
    assert hashlib.sha256(baseline_bytes).hexdigest() == BASE_SHA
    baseline = json.loads(baseline_bytes)
    assert len(baseline['files']) == 536 and baseline['additionalUnassignedFiles'] == []
    assert len({r['nativeFilename'] for r in baseline['files']}) == 536
    preimage_path = OUT / 'P7_INVENTORY_PREIMAGE.json'
    if preimage_path.exists():
        assert preimage_path.read_bytes() == baseline_bytes
    else:
        with preimage_path.open('xb') as f:
            f.write(baseline_bytes)
    originals = {p.name: stable_info(p) for p in sorted(G.glob('*.png'))}
    p7_checks = []
    for row in baseline['files']:
        original = originals[row['nativeFilename']]
        preserved = stable_info(R / row['preservedFile'])
        assert original['sha256'] == preserved['sha256'] == row['sha256']
        assert original['bytes'] == preserved['bytes'] == row['bytes']
        p7_checks.append(dict(nativeFilename=row['nativeFilename'], original=original,
                              preserved=preserved, originalRowUnchanged=True))
    new_names = set(originals) - {r['nativeFilename'] for r in baseline['files']}
    assert len(new_names) >= 78, ('missing selected-source set', len(new_names))

    finals = sorted(p for p in P.rglob('FINAL_DELIVERY.json')
                    if 'review-revisions' not in p.parts)
    assert len(finals) == 13
    uid_dirs, deliveries, selected, bindings = {}, [], {}, {}
    for path in finals:
        d = read_json(path)
        uid = d['uid']
        assert uid not in uid_dirs
        uid_dirs[uid] = path.parent
        assert len(d['sourceFiles']) == 6
        deliveries.append(dict(uid=uid, **stable_info(path)))
        for n, row in enumerate(d['sourceFiles']):
            name = Path(row['nativeOriginal']).name
            assert name in new_names and name not in selected
            assert row['sha256'] == originals[name]['sha256']
            source = stable_info(row['source'])
            assert source['sha256'] == originals[name]['sha256']
            selected[name] = dict(uid=uid, slot=row['key'], source=source,
                                  deliveryPath=str(path), deliverySha256=stable_info(path)['sha256'],
                                  jsonPointer=f'/sourceFiles/{n}')
    assert len(selected) == 78

    def uids_for_path(path):
        path = Path(path)
        specific = [uid for uid, directory in uid_dirs.items() if path.is_relative_to(directory)]
        if specific:
            return specific
        pair = [uid for uid, directory in uid_dirs.items()
                if path.is_relative_to(directory.parent)]
        return sorted(pair)

    def add_binding(name, uid, attempt, status, reason, evidence):
        assert name in new_names and name not in bindings, ('ambiguous or unexpected attempt', name)
        assert uid in uid_dirs
        if name in selected:
            assert selected[name]['uid'] == uid
            classification = 'selected_current_delivery'
        elif str(status).startswith('superseded') or status == 'variation':
            classification = 'superseded_intermediate'
        elif str(status).startswith('reject') or status is False:
            classification = 'rejected_preserved'
        else:
            raise AssertionError(('unqualified nonselected attempt', uid, attempt, status))
        bindings[name] = dict(uid=uid, attempt=attempt, classification=classification,
                              producerStatus=status, reason=reason, evidence=evidence)

    index_paths = sorted(P.rglob('NATIVE_PNG_INDEX.json'))
    for path in index_paths:
        d = read_json(path)
        rows = d.get('attempts', d.get('rows', d.get('nativeImageAttempts', [])))
        for n, row in enumerate(rows):
            uid = d.get('uid')
            if not uid:
                uid = {'armor': 'core__screaming_mantis',
                       'beauty': 'archive__screaming_beauty'}[row['form']]
            name = Path(row['nativeOriginal']).name
            assert row['sha256'] == originals[name]['sha256']
            assert row['bytes'] == originals[name]['bytes']
            attempt = row.get('key', row.get('id', row.get('attempt', row.get('name'))))
            status = row.get('status', row.get('selected'))
            reason = row.get('rejection')
            evidence = [dict(**stable_info(path), jsonPointer=f'/{"attempts" if "attempts" in d else "rows" if "rows" in d else "nativeImageAttempts"}/{n}')]
            if row.get('reviewPath') and not row.get('selected', True):
                review = Path(row['reviewPath'])
                evidence.append(stable_info(review))
                reason = read_json(review).get('reason')
            add_binding(name, uid, attempt, status, reason, evidence)

    for uid, directory in uid_dirs.items():
        if '/paz-eva/' in str(directory):
            statuses_path = directory / 'ATTEMPT_STATUS.json'
            statuses = read_json(statuses_path)
            selected_attempts = set(statuses['selected'].values())
            for result_path in sorted((directory / 'prompts').glob('*.result.json')):
                attempt = result_path.name.removesuffix('.result.json')
                name = Path(read_json(result_path)['nativeOriginal']).name
                if attempt in selected_attempts:
                    status, reason = 'selected', None
                elif attempt in statuses['rejected']:
                    status, reason = 'rejected', statuses['rejected'][attempt]
                else:
                    status, reason = 'variation', statuses['variation'][attempt]
                add_binding(name, uid, attempt, status, reason,
                            [stable_info(result_path), stable_info(statuses_path)])
        elif '/laughing-octopus/' in str(directory):
            for result_path in sorted((directory / 'metadata').glob('*.result-summary.json')):
                attempt = result_path.name.removesuffix('.result-summary.json')
                row = read_json(result_path)
                name = Path(row['nativeOriginal']).name
                assert row['sha256'] == originals[name]['sha256']
                evidence = [stable_info(result_path)]
                if name in selected:
                    status, reason = 'selected', None
                else:
                    status = 'rejected'
                    reject = directory / 'inspections' / f'{attempt}.REJECTED.json'
                    if not reject.exists():
                        reject = directory / 'inspections/B_INITIAL_PHASE_REJECTION.json'
                        assert attempt in read_json(reject)['rejectedAttempts']
                    reason = read_json(reject)['reason']
                    evidence.append(stable_info(reject))
                add_binding(name, uid, attempt, status, reason, evidence)
    assert set(bindings) == new_names, ('unassigned originals', sorted(new_names - set(bindings)))

    proposal_files = sorted(P.rglob('*.args.json')) + sorted(P.rglob('*.request.json'))
    attempts_by_key = {(v['uid'], v['attempt']): name for name, v in bindings.items()}
    requests, inputs = [], {}
    failed = []
    for path in sorted(P.rglob('*.failed-request.json')):
        owners = uids_for_path(path)
        assert len(owners) == 1
        failed.append(dict(uid=owners[0], attempt=path.name.removesuffix('.failed-request.json'),
                           classification='blocked_request_no_native_png',
                           evidence=stable_info(path), details=read_json(path), nativeImage=None))
    assert len(failed) == 1 and failed[0]['uid'] == 'archive__crying_beauty'
    failed_keys = {(x['uid'], x['attempt']) for x in failed}
    for path in proposal_files:
        owners = uids_for_path(path)
        assert len(owners) == 1
        uid = owners[0]
        attempt = re.sub(r'\.(args|request)\.json$', '', path.name)
        key = (uid, attempt)
        native_name = attempts_by_key.get(key)
        status = ('native_png_generated' if native_name else
                  'blocked_request_no_native_png' if key in failed_keys else
                  'proposal_without_attested_execution')
        data = read_json(path)
        request_inputs = []
        for source_path in data.get('referenced_image_paths', []):
            info = stable_info(source_path)
            request_inputs.append(info)
            inputs.setdefault(source_path, dict(**info, uids=[], usedByRequests=[]))
            if uid not in inputs[source_path]['uids']:
                inputs[source_path]['uids'].append(uid)
            inputs[source_path]['usedByRequests'].append(str(path))
        requests.append(dict(uid=uid, attempt=attempt, classification=status,
                             evidence=stable_info(path), nativeFilename=native_name,
                             referenceInputs=request_inputs))
    recorded_request_keys = {(r['uid'], r['attempt']) for r in requests if r['nativeFilename']}
    assert recorded_request_keys == set(attempts_by_key), 'native attempt missing its preserved request'

    producer_files = []
    for path in sorted(P.rglob('*')):
        if path.is_file():
            producer_files.append(dict(**stable_info(path), uids=uids_for_path(path),
                                       role=('generation_request' if path in proposal_files else
                                             'native_or_source_image' if path.suffix.lower() in {'.png', '.jpg', '.jpeg', '.gif', '.webp'} else
                                             'producer_evidence_or_research')))
    # Compare byte-equivalent PNG paths, including producer hardlinks and existing R/S copies.
    # Cache/dependency directories contain no project provenance and are excluded explicitly.
    size_to_names = collections.defaultdict(list)
    inode_to_names = collections.defaultdict(list)
    for name in new_names:
        info = originals[name]
        size_to_names[info['bytes']].append(name)
        inode_to_names[(info['device'], info['inode'])].append(name)
    equivalents = collections.defaultdict(list)
    scanned = 0
    for parent, dirs, files in os.walk('/workspace'):
        dirs[:] = sorted(d for d in dirs if d not in SKIP_DIRS)
        for filename in sorted(files):
            if not filename.lower().endswith('.png'):
                continue
            path = Path(parent) / filename
            if path.is_symlink():
                continue
            st = path.stat()
            scanned += 1
            if st.st_size not in size_to_names:
                continue
            info = stable_info(path)
            for name in size_to_names[info['bytes']]:
                original = originals[name]
                if info['sha256'] == original['sha256']:
                    equivalents[name].append(dict(**info, sameInodeAsOriginal=(
                        info['device'], info['inode']) == (original['device'], original['inode'])))

    rows = []
    for name in sorted(new_names):
        original = originals[name]
        binding = bindings[name]
        same_uid_requests = [r for r in requests if r['nativeFilename'] == name]
        assert len(same_uid_requests) == 1
        assert any(x['path'] == original['path'] for x in equivalents[name])
        rows.append(dict(nativeFilename=name, bytes=original['bytes'], sha256=original['sha256'],
                         preservedFile=f'{PRESERVED_REL}/{name}', pixelsEdited=False,
                         uid=binding['uid'], classification=binding['classification'],
                         attempt=binding['attempt'], original=original,
                         producerStatus=binding['producerStatus'], reason=binding['reason'],
                         selectedDelivery=selected.get(name),
                         producerEvidence=binding['evidence'],
                         requestEvidence=same_uid_requests[0]['evidence'],
                         equivalentPaths=equivalents[name]))

    summary = dict(oldP7Rows=536, currentOriginalPng=len(originals), newOriginalPng=len(rows),
                   selectedCurrent=len(selected), rejectedPreserved=sum(r['classification'] == 'rejected_preserved' for r in rows),
                   supersededIntermediate=sum(r['classification'] == 'superseded_intermediate' for r in rows),
                   unassignedOriginals=0, blockedRequestsWithoutPng=len(failed),
                   requestsWithPng=sum(x['classification'] == 'native_png_generated' for x in requests),
                   proposalsWithoutAttestedExecution=sum(x['classification'] == 'proposal_without_attested_execution' for x in requests),
                   requestArgumentFiles=len(requests), uids=len(uid_dirs),
                   perUid={uid: dict(native=sum(r['uid'] == uid for r in rows),
                                     selected=sum(r['uid'] == uid and r['classification'] == 'selected_current_delivery' for r in rows),
                                     rejected=sum(r['uid'] == uid and r['classification'] == 'rejected_preserved' for r in rows),
                                     superseded=sum(r['uid'] == uid and r['classification'] == 'superseded_intermediate' for r in rows))
                           for uid in sorted(uid_dirs)})
    critical_paths = {x['path'] for x in deliveries}
    for row in rows:
        critical_paths.add(row['requestEvidence']['path'])
        critical_paths.update(x['path'] for x in row['producerEvidence'])
    critical_paths.update(x['evidence']['path'] for x in failed)
    plan = dict(schema='cqc.pass8.additive-preservation-plan/1', startedAtUTC=started,
                preparedAtUTC=datetime.now(timezone.utc).isoformat(),
                scope='Read-only snapshot; generated PNGs and producer artifacts are retained unchanged. No R/S write, move, deletion, inventory mutation or final merge has occurred.',
                targetInventory=str(INV), targetRepository=str(R), targetPreservationDirectory=PRESERVED_REL,
                p7InventoryPreimage=stable_info(INV), p7RowCount=536,
                originalPngDirectory=str(G), originalPngNames=sorted(originals),
                summary=summary, deliveries=deliveries, additions=rows,
                blockedRequestsWithoutNativePng=failed,
                proposalAndAttemptRequests=requests,
                criticalEvidence=[stable_info(p) for p in sorted(critical_paths)],
                equivalentPathSearch=dict(root='/workspace', extensions=['.png'], regularFilesOnly=True,
                                          skippedDirectoryNames=sorted(SKIP_DIRS), pngFilesScanned=scanned,
                                          snapshotOnly=True,
                                          warning='Future imports can add paths after this snapshot. SHA256 matching proves bytes, not independent pixels or canonical approval.'),
                mergeExecuted=False)
    put('PASS8_ADDITIVE_PRESERVATION_PLAN.json', plan)
    put('P7_BASELINE_BYTE_VERIFICATION.json', dict(schema='cqc.pass8.p7-preservation-proof/1',
                                                 inventory=stable_info(INV), rows=p7_checks,
                                                 all536OriginalsAndPreservedCopiesByteExact=True,
                                                 baselineInventoryBytesUnchanged=True))
    put('ALL_PRODUCER_ARTIFACTS_SNAPSHOT.json', dict(schema='cqc.pass8.producer-artifact-snapshot/1',
                                                   root=str(P), files=producer_files,
                                                   referencedInputFiles=list(inputs.values()),
                                                   note='Includes rejected, superseded, off-target research, arguments and failures; inclusion is not canonical approval.'))
    put('COVERAGE_PROOF.json', dict(schema='cqc.pass8.native-attempt-coverage/1', summary=summary,
                                  everyNewOriginalHasExactlyOneUidAndAttempt=True,
                                  everyNativeAttemptHasPreservedRequest=True,
                                  everySelectedSheetHasCurrentDeliveryEvidence=True,
                                  originalNewSetEqualsProducerAttemptSet=True,
                                  old536OriginalAndPreservedCopiesByteExact=True,
                                  sunnyMgrSuperseded6Present=sum(r['uid'] == 'roster50__sunny_mgr' and r['classification'] == 'superseded_intermediate' for r in rows) == 6,
                                  evaExtraLeftHolsterRejectedPresent=any(r['uid'] == 'core__eva_mgs3' and r['attempt'] == 'C_LEFT_03' and r['classification'] == 'rejected_preserved' for r in rows),
                                  cryingBeautyModerationWithoutImagePresent=len(failed) == 1,
                                  readOnlyProduction=True, mergeExecuted=False))
    # Read again after the scan to prove the baseline and source freeze remained stable.
    assert INV.read_bytes() == baseline_bytes
    assert sorted(p.name for p in G.glob('*.png')) == sorted(originals)
    for name in new_names:
        assert stable_info(G / name)['sha256'] == originals[name]['sha256']
    print(json.dumps(summary, ensure_ascii=False))


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output-directory', type=Path, default=OUT,
                        help='Use a fresh subdirectory to retain earlier preparation snapshots unchanged')
    output = parser.parse_args().output_directory.resolve()
    assert output.is_relative_to(OUT), 'Output must stay under the owned preservation-prep folder'
    output.mkdir(parents=True, exist_ok=True)
    OUT = output
    main()
