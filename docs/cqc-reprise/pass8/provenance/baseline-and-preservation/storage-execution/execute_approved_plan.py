"""Execute only the root-reviewed CLOSED PASS7 QA PNG hardlink plan.

No image contents are written. Every original pathname survives. A fsynced
JSONL journal records each step; any unexpected identity/content drift stops.
"""
from pathlib import Path
import os, stat, json, hashlib, time, subprocess, shutil, uuid, traceback

OUT = Path(__file__).parent
PLAN = OUT.parent / 'HARDLINK_REVIEW_PLAN.json'
APPROVED = '39a84b9791ff4837785bf8167b8481274e804b5a314b7f97d30cbb2fb233018a'
EXPECTED_S_HEAD = '37a0fa6682583cbfed4dfc8a55a5ecba4c6ed927'
ROOTS = [Path('/workspace/cqc-game-working/cqc-versus-v056'), Path('/workspace/shadow-codec-recovered')]
DENY = {'.git', 'node_modules', 'dist', '.aws', '.codex', '.agents', '.ssh', '.config', '.cache', '.vercel', '__pycache__', 'auth', 'credentials', 'secrets', 'vercel-auth'}
STATIC = ('bytes', 'device', 'inode', 'permissionsOctal', 'uid', 'gid', 'mtimeNs')
OUT.mkdir(parents=True, exist_ok=True)
JOURNAL = OUT / 'PROGRESS.jsonl'
if JOURNAL.exists():
    raise RuntimeError('Prior execution journal exists; do not silently resume or overwrite evidence.')
journal = JOURNAL.open('x', encoding='utf-8')
completed = []
started = time.time()

def emit(event, **kw):
    row = {'timeUnix': time.time(), 'event': event, **kw}
    journal.write(json.dumps(row, ensure_ascii=False) + '\n')
    journal.flush(); os.fsync(journal.fileno())

def write(name, value):
    with (OUT / name).open('x', encoding='utf-8') as f:
        json.dump(value, f, ensure_ascii=False, indent=2); f.write('\n')
        f.flush(); os.fsync(f.fileno())

def rec(p, s):
    if not stat.S_ISREG(s.st_mode):
        raise RuntimeError('Nonregular candidate: ' + str(p))
    return {'path': str(p), 'bytes': s.st_size, 'allocatedBytes': s.st_blocks * 512,
            'device': s.st_dev, 'inode': s.st_ino, 'nlink': s.st_nlink,
            'permissionsOctal': oct(stat.S_IMODE(s.st_mode)), 'uid': s.st_uid, 'gid': s.st_gid,
            'mtimeNs': s.st_mtime_ns, 'ctimeNs': s.st_ctime_ns}

def hash_fd(fd):
    os.lseek(fd, 0, os.SEEK_SET)
    h = hashlib.sha256()
    while True:
        b = os.read(fd, 8 * 1024 * 1024)
        if not b: break
        h.update(b)
    return h.hexdigest()

def hash_path(p, cache=None):
    fd = os.open(p, os.O_RDONLY | os.O_NOFOLLOW)
    try:
        before = rec(p, os.fstat(fd))
        key = tuple(before[k] for k in ('device', 'inode', 'bytes', 'mtimeNs', 'ctimeNs'))
        if cache is not None and key in cache:
            digest = cache[key]
        else:
            digest = hash_fd(fd)
            if cache is not None: cache[key] = digest
        after = rec(p, os.fstat(fd))
        if before != after: raise RuntimeError('File drift while hashing: ' + str(p))
        current = rec(p, os.lstat(p))
        if current != after: raise RuntimeError('Path identity drift while hashing: ' + str(p))
        return {**after, 'sha256': digest}
    finally: os.close(fd)

def allowed_png(p):
    p = Path(p)
    rel = p.relative_to('/workspace')
    if p.suffix.lower() != '.png' or any(x in DENY or 'pass8' in x.lower() or 'pass-8' in x.lower() for x in rel.parts):
        raise RuntimeError('Forbidden or active path: ' + str(p))
    for ancestor in [p, *p.parents]:
        if ancestor.is_symlink(): raise RuntimeError('Symlink candidate ancestor: ' + str(ancestor))

def git_guard():
    r = ROOTS[1]
    def cmd(*args): return subprocess.check_output(['git', *args], cwd=r, text=True)
    d = {'root': str(r), 'head': cmd('rev-parse', 'HEAD').strip(), 'statusPorcelain': cmd('status', '--porcelain=v1')}
    if d['head'] != EXPECTED_S_HEAD or d['statusPorcelain']:
        raise RuntimeError('S Git HEAD/clean guard drift: ' + json.dumps(d))
    return d

def source_snapshot(targets):
    files = []; cache = {}
    for root in ROOTS:
        for base, dirs, names in os.walk(root, followlinks=False):
            dirs[:] = sorted(n for n in dirs if n not in DENY and not Path(base, n).is_symlink())
            for name in sorted(names):
                p = Path(base, name)
                if str(p) in targets or name == '.env' or name.startswith('.env.') or p.is_symlink(): continue
                if not stat.S_ISREG(p.lstat().st_mode): continue
                row = hash_path(p, cache)
                files.append({k: row[k] for k in ('path', 'bytes', 'sha256', 'device', 'inode', 'permissionsOctal', 'uid', 'gid')})
    return {'roots': list(map(str, ROOTS)), 'scope': 'Every regular nonsecret file in R/S except the exact approved 504 replacement paths, symlinks, Git, dependencies and build directories.',
            'files': sorted(files, key=lambda r: r['path']), 'fileCount': len(files), 'distinctHashedInodes': len(cache)}

try:
    raw = PLAN.read_bytes()
    if hashlib.sha256(raw).hexdigest() != APPROVED: raise RuntimeError('Approved plan SHA mismatch')
    plan = json.loads(raw); groups = plan['groups']
    operations = [op for group in groups for op in group['operations']]
    assert len(groups) == 177 and len(operations) == 504
    assert len(plan['frozenPinVerification']['checks']) == 1610
    assert all(g['immutableKinds'] == ['closed-pass7-qa-png'] for g in groups)
    targets = {op['target'] for op in operations}
    assert len(targets) == 504
    for op in operations:
        allowed_png(op['target']); allowed_png(op['keeper'])
        assert op['keeper'] not in targets
        assert op['operation'] == 'atomic-byte-preserving-hardlink-replacement'
    free_before = shutil.disk_usage('/workspace').free
    emit('authorized-plan-verified', planSha256=APPROVED, operations=504, groups=177, freeBytesBefore=free_before)
    git_before = git_guard(); write('GIT_BEFORE.json', git_before)
    source_before = source_snapshot(targets); write('SOURCE_BEFORE.json', source_before)
    emit('source-before-captured', fileCount=source_before['fileCount'])
    # Initial full hash and all planned identity metadata must still match.
    identities = {}; preflight = []
    for group in groups:
        for expected in [group['keeper'], *[op['before'] for op in group['operations']]]:
            p = expected['path']
            if p in identities: continue
            actual = hash_path(p)
            for k in (*STATIC, 'nlink', 'ctimeNs', 'sha256'):
                if actual[k] != expected[k]: raise RuntimeError(f'Preflight drift {k}: {p}')
            identities[p] = actual; preflight.append(actual)
    write('PREFLIGHT.json', {'checks': preflight, 'failures': 0})
    emit('preflight-passed', checkedPaths=len(preflight))
    # Map evolving nlink/ctime per inode. All other fields remain immutable.
    dynamic = {(r['device'], r['inode']): {'nlink': r['nlink'], 'ctimeNs': r['ctimeNs']} for r in identities.values()}
    for group_index, group in enumerate(groups):
        for op in group['operations']:
            keeper = op['keeper']; target = op['target']; expected_k = op['keeperBefore']; expected_t = op['before']
            kfd = os.open(keeper, os.O_RDONLY | os.O_NOFOLLOW)
            tfd = os.open(target, os.O_RDONLY | os.O_NOFOLLOW)
            tmp = None
            try:
                actuals = []
                for p, fd, expected in ((keeper, kfd, expected_k), (target, tfd, expected_t)):
                    actual = rec(p, os.fstat(fd)); digest = hash_fd(fd)
                    after = rec(p, os.fstat(fd))
                    if actual != after or rec(p, os.lstat(p)) != after: raise RuntimeError('Immediate hash/stat drift: ' + p)
                    for k in STATIC:
                        if actual[k] != expected[k]: raise RuntimeError(f'Immediate {k} drift: {p}')
                    dynamic_expected = dynamic[(actual['device'], actual['inode'])]
                    for k in ('nlink', 'ctimeNs'):
                        if actual[k] != dynamic_expected[k]: raise RuntimeError(f'Unexpected {k} drift: {p}')
                    if digest != op['sha256']: raise RuntimeError('Immediate SHA drift: ' + p)
                    actuals.append({**actual, 'sha256': digest})
                emit('operation-start', index=len(completed) + 1, group=group_index + 1, keeper=keeper, target=target, immediateBefore=actuals)
                tmp = Path(target).parent / ('.cqc-hardlink-' + uuid.uuid4().hex + '.tmp')
                os.link(keeper, tmp, follow_symlinks=False)
                linked = rec(tmp, os.lstat(tmp))
                if (linked['device'], linked['inode']) != (expected_k['device'], expected_k['inode']):
                    raise RuntimeError('Temporary hardlink identity mismatch')
                # No original pathname is removed: atomically replace its directory entry.
                observed_t = rec(target, os.lstat(target))
                if any(observed_t[k] != actuals[1][k] for k in observed_t):
                    raise RuntimeError('Target drift immediately before replace')
                os.replace(tmp, target); tmp = None
                dfd = os.open(Path(target).parent, os.O_RDONLY | os.O_DIRECTORY)
                try: os.fsync(dfd)
                finally: os.close(dfd)
                keeper_after = rec(keeper, os.fstat(kfd)); old_after = rec(target, os.fstat(tfd))
                if keeper_after['nlink'] != actuals[0]['nlink'] + 1 or old_after['nlink'] != actuals[1]['nlink'] - 1:
                    raise RuntimeError('Unexpected link-count change after replace')
                dynamic[(keeper_after['device'], keeper_after['inode'])] = {'nlink': keeper_after['nlink'], 'ctimeNs': keeper_after['ctimeNs']}
                dynamic[(old_after['device'], old_after['inode'])] = {'nlink': old_after['nlink'], 'ctimeNs': old_after['ctimeNs']}
                target_after = hash_path(target)
                if target_after['sha256'] != op['sha256'] or target_after['inode'] != keeper_after['inode']:
                    raise RuntimeError('Post-replacement SHA/inode mismatch')
                row = {'index': len(completed) + 1, 'group': group_index + 1, 'keeper': keeper, 'target': target, 'after': target_after}
                completed.append(row); emit('operation-complete', **row)
            finally:
                os.close(tfd); os.close(kfd)
            if len(completed) % 100 == 0:
                print(json.dumps({'completed': len(completed), 'of': 504}), flush=True)
    post_targets = []
    for op in operations:
        r = hash_path(op['target'])
        if r['sha256'] != op['sha256'] or r['bytes'] != op['bytes']: raise RuntimeError('Final target mismatch: ' + op['target'])
        keeper = rec(op['keeper'], os.lstat(op['keeper']))
        if (r['device'], r['inode']) != (keeper['device'], keeper['inode']): raise RuntimeError('Final link mismatch')
        post_targets.append(r)
    write('TARGETS_POST_VERIFICATION.json', {'assertions': len(post_targets), 'failures': 0, 'checks': post_targets})
    emit('all-targets-post-verified', assertions=504, failures=0)
    pins = []; pin_cache = {}
    for expected in plan['frozenPinVerification']['checks']:
        r = hash_path(expected['path'], pin_cache)
        passed = r['sha256'] == expected['expectedSha256'] and r['bytes'] == expected['expectedBytes']
        if not passed: raise RuntimeError('Frozen pin mismatch: ' + r['path'])
        pins.append({**expected, 'actualSha256': r['sha256'], 'actualBytes': r['bytes'], 'passed': True})
    write('FROZEN_PINS_POST_VERIFICATION.json', {'assertions': len(pins), 'failures': 0, 'distinctFullSha256Reads': len(pin_cache), 'checks': pins})
    emit('frozen-pins-post-verified', assertions=1610, failures=0)
    source_after = source_snapshot(targets); write('SOURCE_AFTER.json', source_after)
    if source_before != source_after: raise RuntimeError('R/S source snapshot mismatch')
    git_after = git_guard(); write('GIT_AFTER.json', git_after)
    if git_before != git_after: raise RuntimeError('S Git guard before/after mismatch')
    free_after = shutil.disk_usage('/workspace').free
    result = {'schema': 'cqc.pass8.storage-hardlink-execution/1', 'status': 'completed', 'approvedPlanSha256': APPROVED,
              'operationsCompleted': len(completed), 'contentGroups': len(groups), 'targetShaChecks': len(post_targets),
              'frozenPinChecks': len(pins), 'failures': 0, 'sourcesBeforeAfterByteIdentical': True,
              'sourceFilesChecked': source_after['fileCount'], 'gitS': git_after,
              'historicalPathDeletionCount': 0, 'imageContentWrites': 0, 'mutableSourceWrites': 0,
              'estimatedAllocatedBytesReclaimed': plan['space']['estimatedAllocatedBytesReclaimable'],
              'freeBytesBefore': free_before, 'freeBytesAfter': free_after, 'measuredFreeBytesChange': free_after - free_before,
              'spaceMeasurementQualifier': 'Includes new execution proof files and any concurrent unrelated allocations on the shared overlay filesystem.',
              'elapsedSeconds': round(time.time() - started, 2)}
    emit('completed', **result); write('EXECUTION_RESULT.json', result)
    print(json.dumps(result, ensure_ascii=False, indent=2), flush=True)
except BaseException as e:
    failure = {'status': 'stopped-on-drift-or-error', 'approvedPlanSha256': APPROVED, 'operationsCompleted': len(completed),
               'errorType': type(e).__name__, 'error': str(e), 'elapsedSeconds': round(time.time() - started, 2)}
    emit('STOP', **failure); write('STOP.json', failure)
    print(json.dumps(failure, ensure_ascii=False, indent=2), flush=True)
    raise
finally:
    journal.close()
