#!/usr/bin/env python3
"""Prepare a bounded, read-only plan. Never modifies a scanned file."""
import collections
import hashlib
import json
import os
import stat
from pathlib import Path
from datetime import datetime, timezone

OUT = Path('/workspace/cqc-pass8-closed-archive-dedup')
ROOTS = (
    Path('/workspace/cqc-pass8-storage-tools/root-runtime-backups/cqc-088abffa-7dad-4e93-9331-89bea636b7a8'),
    Path('/workspace/cqc-pass8-storage-tools/root-build-backups/dist-96ad7cb8-eeb4-4064-bbcb-e59fd5c6bbe6/cqc'),
    Path('/workspace/cqc-pass8-independent-gameplay-review'),
    Path('/workspace/cqc-pass8-final-qa-tools/runs'),
)
LIVE_ROOTS = (
    Path('/workspace/cqc-game-working/cqc-versus-v056'),
    Path('/workspace/shadow-codec-recovered/public/cqc'),
    Path('/workspace/shadow-codec-recovered/dist/cqc'),
)
DENY = {'.git', '.vercel', '.aws', '.codex', 'node_modules', 'fixtures', 'tmp', 'cache', 'node-compile-cache', '__pycache__', 'private', 'secrets'}
EXT = {'.json', '.js', '.mjs', '.cjs', '.html', '.css', '.txt', '.md', '.log', '.png', '.webp', '.jpg', '.jpeg', '.gif'}
MIN = 1024 * 1024

def digest(p):
    h = hashlib.sha256()
    with p.open('rb') as f:
        for b in iter(lambda: f.read(1024 * 1024), b''):
            h.update(b)
    return h.hexdigest()

def info(p):
    s = p.lstat()
    if not stat.S_ISREG(s.st_mode):
        raise ValueError(f'Not a regular file: {p}')
    return {'dev': s.st_dev, 'inode': s.st_ino, 'bytes': s.st_size,
            'mode': stat.S_IMODE(s.st_mode), 'uid': s.st_uid, 'gid': s.st_gid,
            'nlink': s.st_nlink, 'mtimeNs': s.st_mtime_ns, 'ctimeNs': s.st_ctime_ns,
            'allocatedBytes': s.st_blocks * 512}

def clean_path(p):
    if not p.is_absolute() or '..' in p.parts:
        raise ValueError(f'Unsafe path: {p}')
    for q in (p, *p.parents):
        if q.is_symlink():
            raise ValueError(f'Symlink forbidden: {q}')
    return True

def write(name, value):
    p = OUT / name
    data = (json.dumps(value, indent=2, ensure_ascii=False) + '\n').encode()
    with p.open('xb') as f:
        f.write(data)
        f.flush()
        os.fsync(f.fileno())
    return {'path': str(p), 'bytes': len(data), 'sha256': hashlib.sha256(data).hexdigest()}

def main():
    OUT.mkdir(exist_ok=True)
    candidates, excluded = [], collections.Counter()
    root_counts = {}
    for root in ROOTS:
        clean_path(root)
        n = 0
        for directory, dirs, names in os.walk(root, followlinks=False):
            dirs[:] = [x for x in sorted(dirs) if x not in DENY and not Path(directory, x).is_symlink()]
            for name in sorted(names):
                p = Path(directory, name)
                if p.is_symlink() or name.startswith('.env') or p.suffix.lower() not in EXT:
                    excluded['symlink_private_or_non_allowlisted_extension'] += 1
                    continue
                s = p.lstat()
                if not stat.S_ISREG(s.st_mode) or s.st_size <= MIN:
                    continue
                if s.st_nlink != 1:
                    excluded['over1MiB_already_multilink'] += 1
                    continue
                clean_path(p)
                candidates.append({'path': str(p), 'scopeRoot': str(root), 'stat': info(p)})
                n += 1
        root_counts[str(root)] = n
    compatible = collections.defaultdict(list)
    for row in candidates:
        s = row['stat']
        compatible[tuple(s[k] for k in ('bytes', 'dev', 'mode', 'uid', 'gid'))].append(row)
    groups, different, hashed = [], [], 0
    for rows in compatible.values():
        if len(rows) < 2:
            continue
        hashes = collections.defaultdict(list)
        for row in rows:
            row['sha256'] = digest(Path(row['path']))
            if info(Path(row['path'])) != row['stat']:
                raise ValueError(f'Source changed during read: {row["path"]}')
            hashed += 1
            hashes[row['sha256']].append(row)
        for sha, same in hashes.items():
            if len(same) < 2:
                different.extend(same)
                continue
            # Keeper preference: closed runtime backup, then closed build backup,
            # then chronological closed QA source. Never a mutable R/S file.
            same.sort(key=lambda x: (list(map(str, ROOTS)).index(x['scopeRoot']), x['path']))
            keeper, *targets = same
            if len({(x['stat']['dev'], x['stat']['inode']) for x in same}) != len(same):
                raise ValueError('Candidate unexpectedly aliases another candidate')
            groups.append({'sha256': sha, 'bytes': keeper['stat']['bytes'], 'keeper': keeper,
                           'targets': targets, 'reclaimAllocatedBytes': sum(x['stat']['allocatedBytes'] for x in targets)})
    groups.sort(key=lambda x: x['keeper']['path'])
    live_paths = set()
    for group in groups:
        for row in (group['keeper'], *group['targets']):
            origin_root = Path(row['scopeRoot'])
            if origin_root in ROOTS[:2]:
                relative = Path(row['path']).relative_to(origin_root)
                for live in LIVE_ROOTS:
                    if (live / relative).exists():
                        live_paths.add(live / relative)
    for live in LIVE_ROOTS:
        if (live / 'data/combat-sprite-catalog-v1.json').exists():
            live_paths.add(live / 'data/combat-sprite-catalog-v1.json')
    live_pins = []
    archive_inodes = {(r['stat']['dev'], r['stat']['inode']) for g in groups for r in (g['keeper'], *g['targets'])}
    for p in sorted(live_paths):
        clean_path(p)
        before = info(p)
        sha = digest(p)
        if info(p) != before:
            raise ValueError(f'Mutable source changed during pin read: {p}')
        if (before['dev'], before['inode']) in archive_inodes:
            raise ValueError(f'Archive aliases mutable live source: {p}')
        live_pins.append({'path': str(p), 'sha256': sha, 'stat': before})
    plan = {
        'schema': 'cqc.pass8.closed-independent-archive-hardlink-plan/1',
        'createdUtc': datetime.now(timezone.utc).isoformat(),
        'status': 'prepared_only', 'confirmedByRoot': False, 'rootGoRequired': True,
        'scopeRoots': list(map(str, ROOTS)), 'minimumExclusiveBytes': MIN,
        'operation': 'atomic_replace_identical_closed_target_with_hardlink_to_closed_keeper',
        'preservation': {'allPathsRetained': True, 'allBytesRetained': True,
                         'modeUidGidRetained': True, 'mutableRSMustRemainIndependent': True,
                         'allowedMetadataChanges': ['target_inode', 'target_mtime_aligns_to_keeper', 'target_ctime', 'keeper_ctime', 'nlink']},
        'groups': groups, 'mutableLivePins': live_pins,
        'summary': {'candidateNlink1FilesOver1MiB': len(candidates), 'candidateStatRootCounts': root_counts,
                    'fullSHAHashedCandidateFiles': hashed, 'duplicateGroups': len(groups),
                    'targets': sum(len(g['targets']) for g in groups),
                    'keepers': len(groups), 'mutableLivePins': len(live_pins),
                    'reclaimAllocatedBytesEstimate': sum(g['reclaimAllocatedBytes'] for g in groups),
                    'reclaimContentBytes': sum(g['bytes'] * len(g['targets']) for g in groups),
                    'excludedCounts': dict(excluded), 'sameStatDifferentSHAFiles': len(different)},
        'scanLimits': 'Stat-filtered only these four bounded roots; no ZIP, movie, PDF, mutable runtime target, private config, cache, dependency or current working-tool scan.'
    }
    scan_pin = write('BOUNDED_SCAN.json', {'schema': 'cqc.pass8.closed-archive-stat-scan/1', 'candidates': candidates,
                                           'differentSHA': different, 'excludedCounts': dict(excluded)})
    plan['scanEvidence'] = scan_pin
    plan_pin = write('PLAN.json', plan)
    print(json.dumps({'plan': plan_pin, 'summary': plan['summary']}, ensure_ascii=False))

if __name__ == '__main__':
    main()
