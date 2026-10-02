"""Storage-only deduplication; never edits PNG pixels or any document bytes.

The allow-list is the frozen PASS7 inventory of 536 generated PNGs plus explicitly closed QA capture folders. Every
candidate is compared by full SHA256, and every resulting path is rehashed.
This final pass excludes active/new browser captures and never selects mutable source code.
"""
from pathlib import Path
import argparse
import collections
import concurrent.futures
import hashlib
import json
import os
import stat
import subprocess
import uuid
from datetime import datetime, timezone

W = Path('/workspace')
R = W / 'cqc-game-working/cqc-versus-v056'
S = W / 'shadow-codec-recovered'
ALLOW = R / 'preparation/ALL_NATIVE_GENERATION_PRESERVATION.json'
PLAN = W / 'cqc-pass7-final-disk-preservation-plan.json'
REPORT = W / 'cqc-pass7-final-disk-preservation.json'
FROZEN_NATIVE_INVENTORY_SHA = '9e57801f5bbb324419cdcedcf6df80d3a4e1613b92c4a4e0f1c5a667629ab27b'
FROZEN_QA_ROOTS = [
    W / 'cqc-pass7-native-browser-final',
    W / 'cqc-pass7-native-browser-preliminary',
    W / 'cqc-pass7-gameplay-browser-final-a',
    W / 'cqc-pass7-gameplay-browser-final-b',
    W / 'shadow-cqc-pass7-browser-final-a',
]
ACTIVE_EXCLUDED_ROOTS = [W / 'cqc-pass7-gameplay-browser-final-c', W / 'shadow-cqc-pass7-browser-final-b']
EXCLUDE_DIRECTORIES = {
    '.git', 'node_modules', '.cache', '.npm', '.codex', '.agents', '.aws',
    '.vercel', '__pycache__',
}

def sha(path):
    digest = hashlib.sha256()
    with path.open('rb') as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b''):
            digest.update(block)
    return digest.hexdigest()

def write_once(path, document):
    with path.open('x', encoding='utf-8') as stream:
        json.dump(document, stream, ensure_ascii=False, indent=2)
        stream.write('\n')

def disk():
    result = os.statvfs(W)
    return {
        'capacityBytes': result.f_blocks * result.f_frsize,
        'freeBytes': result.f_bavail * result.f_frsize,
    }

def git_status():
    result = subprocess.run(
        ['git', '-C', str(S), 'status', '--porcelain=v1', '-z'],
        stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=True,
    )
    return result.stdout.decode('utf-8', errors='surrogateescape')

def pin(path):
    before = path.lstat()
    assert stat.S_ISREG(before.st_mode) and not path.is_symlink(), str(path)
    digest = sha(path)
    after = path.lstat()
    assert (before.st_dev, before.st_ino, before.st_size, before.st_mtime_ns) == (
        after.st_dev, after.st_ino, after.st_size, after.st_mtime_ns
    ), str(path)
    return {
        'path': str(path), 'bytes': after.st_size, 'sha256': digest,
        'device': after.st_dev, 'inode': after.st_ino,
        'links': after.st_nlink, 'allocatedBytes': after.st_blocks * 512,
        'mtimeNanoseconds': after.st_mtime_ns,
        'permissions': stat.S_IMODE(after.st_mode),
    }

def anchor_rank(row):
    path = Path(row['path'])
    return (0 if path.parent == W / 'generated_images' else 1, str(path))

def make_plan():
    assert not PLAN.exists(), str(PLAN)
    assert sha(ALLOW) == FROZEN_NATIVE_INVENTORY_SHA
    inventory = json.loads(ALLOW.read_text())
    assert len(inventory['files']) == 536 and not inventory['additionalUnassignedFiles']
    allowed = {row['sha256']: row['bytes'] for row in inventory['files']}
    qa_capture_pins = []
    for root in FROZEN_QA_ROOTS:
        assert root.is_dir(), str(root)
        for path in sorted(root.rglob('*.png')):
            row = pin(path)
            qa_capture_pins.append(row)
            if row['sha256'] in allowed:
                assert allowed[row['sha256']] == row['bytes']
            allowed[row['sha256']] = row['bytes']
    sizes = set(allowed.values())
    before_disk = disk()
    before_git = git_status()
    candidates = []
    for parent, directories, filenames in os.walk(W, followlinks=False):
        directories[:] = sorted(
            name for name in directories
            if name not in EXCLUDE_DIRECTORIES and not Path(parent, name).is_symlink() and not any(Path(parent, name) == root or root in Path(parent, name).parents for root in ACTIVE_EXCLUDED_ROOTS)
        )
        for name in sorted(filenames):
            if not name.lower().endswith('.png'):
                continue
            path = Path(parent, name)
            metadata = path.lstat()
            if stat.S_ISREG(metadata.st_mode) and metadata.st_size in sizes:
                candidates.append(path)
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as executor:
        checked = list(executor.map(pin, candidates))
    groups = collections.defaultdict(list)
    for row in checked:
        if row['sha256'] in allowed:
            assert row['bytes'] == allowed[row['sha256']]
            groups[(row['sha256'], row['device'], row['permissions'])].append(row)
    operations = []
    selected_groups = []
    reclaimable = 0
    for key, rows in sorted(groups.items()):
        inodes = collections.defaultdict(list)
        for row in rows:
            inodes[row['inode']].append(row)
        if len(inodes) < 2:
            continue
        # Choosing the source with the most existing links avoids unnecessary
        # inode churn; prefer the original generated_images path for ties.
        canonical_inode = min(
            inodes,
            key=lambda inode: (-len(inodes[inode]), anchor_rank(min(inodes[inode], key=anchor_rank))),
        )
        anchor = min(inodes[canonical_inode], key=anchor_rank)
        members = sorted(rows, key=lambda row: row['path'])
        selected_groups.append({
            'sha256': key[0], 'bytes': anchor['bytes'], 'device': key[1],
            'anchor': anchor['path'], 'members': members,
        })
        for inode, inode_rows in inodes.items():
            if inode == canonical_inode:
                continue
            # Only count blocks once when this operation replaces every link
            # of an existing inode. Paths outside this scan retain their bytes.
            if len(inode_rows) == inode_rows[0]['links']:
                reclaimable += inode_rows[0]['allocatedBytes']
            for target in sorted(inode_rows, key=lambda row: row['path']):
                assert target['permissions'] == anchor['permissions'], (
                    'Refuse to change file permissions', target['path'], anchor['path']
                )
                operations.append({
                    'anchor': anchor['path'], 'target': target['path'],
                    'sha256': target['sha256'], 'bytes': target['bytes'],
                    'device': target['device'], 'previousInode': target['inode'],
                    'previousMtimeNanoseconds': target['mtimeNanoseconds'],
                    'permissions': target['permissions'],
                })
    plan = {
        'schema': 'cqc.pass7.final-storage-only-frozen-png-deduplication-plan/1',
        'createdAt': datetime.now(timezone.utc).isoformat(),
        'mode': 'plan',
        'allowList': {'path': str(ALLOW), 'sha256': sha(ALLOW), 'nativeFiles': 536},
        'futureAndActiveBrowserCapturesExcluded': True,
        'activeExcludedRoots': [str(path) for path in ACTIVE_EXCLUDED_ROOTS],
        'frozenCaptureRoots': [str(path) for path in FROZEN_QA_ROOTS],
        'frozenCapturePNGCount': len(qa_capture_pins),
        'frozenCapturePNGs': qa_capture_pins,
        'contentMutableFilesSelected': False,
        'zipOrOtherArchiveFilesSelected': False,
        'gitDirectorySelected': False,
        'filesystemBefore': before_disk,
        'shadowGitStatusBefore': before_git,
        'candidateFilesHashed': len(checked),
        'allowedNativePathsFound': sum(len(rows) for rows in groups.values()),
        'duplicateContentGroups': len(selected_groups),
        'pathsToReplaceByHardlink': len(operations),
        'estimatedReclaimableAllocatedBytes': reclaimable,
        'groups': selected_groups,
        'operations': operations,
        'strategy': 'Full byte hashes, same device, temporary hardlink in target directory, atomic replace, full post-operation hashes.',
    }
    write_once(PLAN, plan)
    print(json.dumps({
        'mode': 'plan', 'plan': str(PLAN), 'planSHA256': sha(PLAN),
        'groups': len(selected_groups), 'replacements': len(operations),
        'estimatedReclaimableBytes': reclaimable,
        'freeBytesBefore': before_disk['freeBytes'],
    }), flush=True)

def apply_plan():
    assert PLAN.is_file() and not REPORT.exists()
    plan = json.loads(PLAN.read_text())
    assert sha(ALLOW) == plan['allowList']['sha256']
    before_disk = disk()
    before_git = git_status()
    operations = []
    error = None
    try:
        for operation in plan['operations']:
            anchor = Path(operation['anchor'])
            target = Path(operation['target'])
            assert target.suffix.lower() == '.png' and anchor.suffix.lower() == '.png'
            a = anchor.lstat()
            t = target.lstat()
            assert stat.S_ISREG(a.st_mode) and stat.S_ISREG(t.st_mode)
            assert a.st_dev == t.st_dev == operation['device']
            assert a.st_size == t.st_size == operation['bytes']
            assert t.st_ino == operation['previousInode']
            assert t.st_mtime_ns == operation['previousMtimeNanoseconds']
            assert stat.S_IMODE(t.st_mode) == stat.S_IMODE(a.st_mode) == operation['permissions']
            assert sha(anchor) == sha(target) == operation['sha256'], str(target)
            temporary = target.with_name('.' + target.name + '.native-hardlink-' + uuid.uuid4().hex)
            assert not temporary.exists()
            try:
                os.link(anchor, temporary, follow_symlinks=False)
                assert sha(temporary) == operation['sha256']
                # All data was checked before replacing the redundant inode.
                os.replace(temporary, target)
            finally:
                if temporary.exists():
                    temporary.unlink()
            new = target.lstat()
            assert new.st_dev == a.st_dev and new.st_ino == a.st_ino
            assert sha(target) == operation['sha256']
            operations.append({
                **operation, 'newInode': new.st_ino,
                'originalByteHashUnchanged': True, 'atomicReplacement': True,
            })
            if len(operations) % 250 == 0:
                print(json.dumps({'hardlinkedPaths': len(operations), 'freeBytes': disk()['freeBytes']}), flush=True)
    except Exception as exception:
        error = repr(exception)
    # Even when interrupted by an unexpected filesystem condition, replaced
    # paths remain byte-identical; the final verification records every path.
    verified = []
    for group in plan['groups']:
        for member in group['members']:
            actual = pin(Path(member['path']))
            assert actual['bytes'] == member['bytes'] and actual['sha256'] == member['sha256'], member['path']
            verified.append({
                'path': actual['path'], 'bytes': actual['bytes'],
                'beforeSha256': member['sha256'], 'afterSha256': actual['sha256'],
                'unchanged': True, 'device': actual['device'], 'inode': actual['inode'],
            })
    after_disk = disk()
    after_git = git_status()
    report = {
        'schema': 'cqc.pass7.final-storage-only-frozen-png-deduplication/1',
        'status': 'passed' if error is None else 'partially-completed-byte-preservation-verified',
        'createdAt': datetime.now(timezone.utc).isoformat(),
        'script': {'path': str(Path(__file__)), 'sha256': sha(Path(__file__))},
        'plan': {'path': str(PLAN), 'sha256': sha(PLAN)},
        'allowList': plan['allowList'],
        'filesystemBefore': before_disk, 'filesystemAfter': after_disk,
        'observedFreeByteIncrease': after_disk['freeBytes'] - before_disk['freeBytes'],
        'estimatedReclaimableAllocatedBytes': plan['estimatedReclaimableAllocatedBytes'],
        'completedHardlinkReplacements': len(operations),
        'selectedContentGroups': len(plan['groups']),
        'verifiedPathCount': len(verified),
        'sha256ChangedPaths': 0,
        'allSelectedPathHashesUnchanged': True,
        'pixelsEdited': False,
        'pathsRemoved': 0,
        'archiveBytesOrPathsChanged': False,
        'mutableSourceDocumentsChanged': False,
        'shadowGitStatusBefore': before_git,
        'shadowGitStatusAfter': after_git,
        'shadowGitStatusUnchanged': before_git == after_git,
        'error': error,
        'operations': operations,
        'postOperationByteVerification': verified,
        'limits': [
            'PNG paths now share immutable file inodes; future byte changes to a native PNG must use atomic replacement rather than overwrite a shared inode.',
            'Only 536 frozen PASS7 native hashes and byte-pinned PNGs from explicitly closed QA capture folders were selected. Active/new final-c and Shadow final-b captures, other references, ZIP archives, JS, JSON, source helpers, Git objects and dependency directories were excluded.',
            'Observed free space may also vary because independent agents generate assets; per-inode estimated reclaim counts remain recorded in the plan.',
        ],
    }
    write_once(REPORT, report)
    print(json.dumps({
        'status': report['status'], 'report': str(REPORT), 'reportSHA256': sha(REPORT),
        'replacements': len(operations), 'verifiedPaths': len(verified),
        'freeBytesBefore': before_disk['freeBytes'], 'freeBytesAfter': after_disk['freeBytes'],
        'observedFreeByteIncrease': report['observedFreeByteIncrease'],
        'shadowGitStatusUnchanged': report['shadowGitStatusUnchanged'], 'error': error,
    }), flush=True)
    if error:
        raise RuntimeError(error)

if __name__ == '__main__':
    arguments = argparse.ArgumentParser()
    arguments.add_argument('--apply', action='store_true')
    parsed = arguments.parse_args()
    if parsed.apply:
        apply_plan()
    else:
        make_plan()
