#!/usr/bin/env python3
"""Read-only by default. Mutation requires explicit root GO and exact plan SHA."""
import argparse
import hashlib
import json
import os
import stat
import uuid
from pathlib import Path
from datetime import datetime, timezone

OUT = Path('/workspace/cqc-pass8-closed-archive-dedup')
ROOTS = (
    Path('/workspace/cqc-pass8-storage-tools/root-runtime-backups/cqc-088abffa-7dad-4e93-9331-89bea636b7a8'),
    Path('/workspace/cqc-pass8-storage-tools/root-build-backups/dist-96ad7cb8-eeb4-4064-bbcb-e59fd5c6bbe6/cqc'),
    Path('/workspace/cqc-pass8-independent-gameplay-review'),
    Path('/workspace/cqc-pass8-final-qa-tools/runs'),
)
LIVE_ROOTS = (Path('/workspace/cqc-game-working/cqc-versus-v056'), Path('/workspace/shadow-codec-recovered/public/cqc'), Path('/workspace/shadow-codec-recovered/dist/cqc'))
DENY = {'.git', '.vercel', '.aws', '.codex', 'node_modules', 'fixtures', 'tmp', 'cache', 'node-compile-cache', '__pycache__', 'private', 'secrets'}
EXT = {'.json', '.js', '.mjs', '.cjs', '.html', '.css', '.txt', '.md', '.log', '.png', '.webp', '.jpg', '.jpeg', '.gif'}

def digest(p):
    h = hashlib.sha256()
    fd = os.open(p, os.O_RDONLY | os.O_NOFOLLOW)
    before = os.fstat(fd)
    if not stat.S_ISREG(before.st_mode):
        os.close(fd)
        raise ValueError(f'Not regular while opening: {p}')
    with os.fdopen(fd, 'rb') as f:
        for b in iter(lambda: f.read(1024 * 1024), b''):
            h.update(b)
        after = os.fstat(f.fileno())
        stable = ('st_dev', 'st_ino', 'st_size', 'st_mode', 'st_uid', 'st_gid', 'st_nlink', 'st_mtime_ns', 'st_ctime_ns')
        if any(getattr(before, k) != getattr(after, k) for k in stable):
            raise ValueError(f'File changed during open-file hash: {p}')
    return h.hexdigest()

def info(p):
    s = p.lstat()
    if not stat.S_ISREG(s.st_mode):
        raise ValueError(f'Not regular: {p}')
    return {'dev': s.st_dev, 'inode': s.st_ino, 'bytes': s.st_size,
            'mode': stat.S_IMODE(s.st_mode), 'uid': s.st_uid, 'gid': s.st_gid,
            'nlink': s.st_nlink, 'mtimeNs': s.st_mtime_ns, 'ctimeNs': s.st_ctime_ns,
            'allocatedBytes': s.st_blocks * 512}

def clean(p, roots=ROOTS):
    if not p.is_absolute() or '..' in p.parts or not any(p.is_relative_to(root) for root in roots):
        raise ValueError(f'Outside exact allowed roots: {p}')
    if set(p.parts) & DENY or p.name.startswith('.env') or p.suffix.lower() not in EXT:
        raise ValueError(f'Excluded file: {p}')
    for q in (p, *p.parents):
        if q.is_symlink():
            raise ValueError(f'Symlink forbidden: {q}')
    return p

def verify(row, exact=True, expected_nlink=None):
    p = clean(Path(row['path']))
    now = info(p)
    if exact and now != row['stat']:
        raise ValueError(f'Stat changed: {p}')
    if not exact:
        for key in ('dev', 'inode', 'bytes', 'mode', 'uid', 'gid', 'mtimeNs', 'allocatedBytes'):
            if now[key] != row['stat'][key]:
                raise ValueError(f'Keeper stat changed ({key}): {p}')
        if now['nlink'] != expected_nlink:
            raise ValueError(f'Unexpected keeper link count: {p}')
    if digest(p) != row['sha256']:
        raise ValueError(f'SHA changed: {p}')
    if info(p) != now:
        raise ValueError(f'Path changed during SHA read: {p}')
    return now

def verify_live(rows):
    for row in rows:
        p = clean(Path(row['path']), LIVE_ROOTS)
        if info(p) != row['stat'] or digest(p) != row['sha256'] or info(p) != row['stat']:
            raise ValueError(f'Mutable live pin changed: {p}')

def preflight(plan):
    if plan.get('schema') != 'cqc.pass8.closed-independent-archive-hardlink-plan/1':
        raise ValueError('Wrong plan schema')
    if plan.get('scopeRoots') != list(map(str, ROOTS)) or plan.get('minimumExclusiveBytes') != 1024 * 1024:
        raise ValueError('Plan scope changed')
    all_paths, all_inodes = set(), set()
    for group in plan['groups']:
        keeper = group['keeper']
        if not group['targets']:
            raise ValueError('Empty group')
        for row in (keeper, *group['targets']):
            now = verify(row)
            if now['nlink'] != 1 or now['bytes'] <= 1024 * 1024:
                raise ValueError('Only independent, exclusive >1 MiB archives qualify')
            inode = (now['dev'], now['inode'])
            if row['path'] in all_paths or inode in all_inodes:
                raise ValueError('Duplicate row or already aliased archive')
            all_paths.add(row['path']); all_inodes.add(inode)
            for k in ('bytes', 'dev', 'mode', 'uid', 'gid'):
                if now[k] != keeper['stat'][k]:
                    raise ValueError('Incompatible hardlink group')
            if row['sha256'] != group['sha256'] or row['stat']['bytes'] != group['bytes']:
                raise ValueError('Inconsistent group SHA or size')
    verify_live(plan['mutableLivePins'])
    for row in plan['mutableLivePins']:
        s = row['stat']
        if (s['dev'], s['inode']) in all_inodes:
            raise ValueError('Archive aliases mutable runtime')
    if len(all_paths) != plan['summary']['targets'] + plan['summary']['keepers']:
        raise ValueError('Summary count mismatch')
    return len(all_paths)

def write_result(path, value):
    with path.open('x') as f:
        json.dump(value, f, indent=2, ensure_ascii=False)
        f.write('\n'); f.flush(); os.fsync(f.fileno())

def execute(plan, plan_sha):
    # All archive and live pins are checked before any mutation.
    preflight(plan)
    run = OUT / ('execution-' + datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%SZ') + '-' + uuid.uuid4().hex[:8])
    run.mkdir()
    initial_free = os.statvfs(OUT).f_bavail * os.statvfs(OUT).f_frsize
    if initial_free < 8 * 1024 * 1024:
        raise ValueError('Less than 8 MiB journal headroom')
    completed = []
    journal = (run / 'JOURNAL.jsonl').open('x')
    def event(value):
        journal.write(json.dumps(value) + '\n'); journal.flush(); os.fsync(journal.fileno())
    try:
        for group in plan['groups']:
            keeper = group['keeper']; keeper_path = Path(keeper['path'])
            for index, target in enumerate(group['targets']):
                verify(keeper, exact=False, expected_nlink=1 + index)
                verify(target)
                target_path = Path(target['path'])
                temp = target_path.with_name('.closed-archive-link-' + uuid.uuid4().hex)
                event({'event': 'before_atomic_replace', 'target': target['path'], 'keeper': keeper['path'], 'sha256': group['sha256'], 'temporary': str(temp)})
                try:
                    os.link(keeper_path, temp, follow_symlinks=False)
                    # Recheck target immediately before replacement. No unlink of a historic path.
                    verify(target)
                    os.replace(temp, target_path)
                    fd = os.open(target_path.parent, os.O_RDONLY | os.O_DIRECTORY)
                    try: os.fsync(fd)
                    finally: os.close(fd)
                finally:
                    if temp.exists(): temp.unlink()
                after = info(target_path)
                if digest(target_path) != target['sha256'] or after['inode'] != keeper['stat']['inode'] or after['dev'] != keeper['stat']['dev']:
                    raise ValueError(f'Post replacement verification failed: {target_path}')
                completed.append(target['path'])
                event({'event': 'atomic_replace_verified', 'target': target['path'], 'sha256': target['sha256'], 'statAfter': after})
        verify_live(plan['mutableLivePins'])
        for group in plan['groups']:
            keeper_stat = verify(group['keeper'], exact=False, expected_nlink=1 + len(group['targets']))
            for target in group['targets']:
                s = info(Path(target['path']))
                if digest(Path(target['path'])) != target['sha256'] or (s['dev'], s['inode']) != (keeper_stat['dev'], keeper_stat['inode']):
                    raise ValueError('Final archive alias verification failed')
                for key in ('bytes', 'mode', 'uid', 'gid'):
                    if s[key] != target['stat'][key]:
                        raise ValueError('Final content or owner/mode changed')
        result = {'schema': 'cqc.pass8.closed-independent-archive-hardlink-execution/1', 'status': 'completed', 'failures': 0,
                  'planSha256': plan_sha, 'targetsCompleted': len(completed), 'allPathsAndSHABytesRetained': True,
                  'mutableLivePinsPassed': len(plan['mutableLivePins']), 'liveSourcesIndependent': True,
                  'freeBytesBefore': initial_free, 'freeBytesAfter': os.statvfs(OUT).f_bavail * os.statvfs(OUT).f_frsize,
                  'reclaimAllocatedBytesEstimate': plan['summary']['reclaimAllocatedBytesEstimate']}
        write_result(run / 'EXECUTION_RESULT.json', result)
        event({'event': 'completed', **result})
        print(json.dumps({'run': str(run), **result}))
    except Exception as e:
        write_result(run / 'EXECUTION_FAILURE.json', {'status': 'failed_stopped', 'planSha256': plan_sha, 'completedTargets': completed, 'error': str(e), 'noHistoricPathDeleted': True})
        event({'event': 'failed_stopped', 'error': str(e), 'completedTargets': len(completed)})
        raise
    finally:
        journal.close()

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--plan', default=str(OUT / 'PLAN.json'))
    parser.add_argument('--execute', action='store_true')
    parser.add_argument('--root-go', action='store_true')
    parser.add_argument('--approved-plan-sha256')
    args = parser.parse_args()
    path = Path(args.plan)
    if not path.is_absolute() or '..' in path.parts or not path.is_relative_to(OUT):
        raise ValueError('Plan must be a regular file within preparation directory')
    for q in (path, *path.parents):
        if q.is_symlink():
            raise ValueError('Plan symlink or symlinked parent forbidden')
    sha = digest(path)
    plan = json.loads(path.read_text())
    if args.execute:
        if not args.root_go or args.approved_plan_sha256 != sha:
            raise ValueError('Execution requires explicit root GO and exact reviewed plan SHA')
        execute(plan, sha)
    else:
        count = preflight(plan)
        print(json.dumps({'status': 'read_only_preflight_passed', 'planSha256': sha, 'archivePins': count, 'mutableLivePins': len(plan['mutableLivePins']), 'summary': plan['summary'], 'executed': False}))

if __name__ == '__main__':
    main()
