#!/usr/bin/env python3
"""PASS9 producer preservation plans and guarded isolated archive execution."""
from pathlib import Path
import argparse, hashlib, json, os, stat, sys
sys.dont_write_bytecode = True
W = Path('/workspace')
T = W / 'cqc-pass9-publication-preparation'
R = W / 'cqc-game-working/cqc-versus-v056'
S = W / 'shadow-codec-recovered'
PARENT = 'db5fd672af5e5da7e2908321452e14fbbed8edef'
ROOTS = {n: W / 'cqc-pass9-generation' / n for n in ('running-man', 'black-color', 'red-blaster', 'jungle-evil')}
ROOTS['black-star'] = W / 'cqc-pass9-black-star-generation'
PREFIX = 'docs/cqc-reprise/pass9/'
DENY = {'.git', '__pycache__', 'node_modules', '.aws', '.ssh', '.codex', '.cache', '.vercel'}

def require(ok, message):
    if not ok: raise RuntimeError(message)

def sha(raw): return hashlib.sha256(raw).hexdigest()

def safe_file(p):
    p = Path(p)
    require(p.is_absolute() and p.is_relative_to(W) and p.is_file() and not p.is_symlink() and p.resolve() == p, 'Regular workspace source required: ' + str(p))
    require(not p.is_relative_to(R) and not p.is_relative_to(S), 'Mutable R/S source excluded from producer preservation')
    require(not any(x in DENY for x in p.parts) and not p.name.startswith('.env'), 'Private/cache source excluded')
    return p

def seal(st):
    return {'device': st.st_dev, 'inode': st.st_ino, 'bytes': st.st_size, 'mode': stat.S_IMODE(st.st_mode), 'uid': st.st_uid, 'gid': st.st_gid, 'mtimeNs': st.st_mtime_ns}

def pin(p):
    p = safe_file(p); before = p.stat(); digest = hashlib.sha256(); blob = hashlib.sha1(b'blob ' + str(before.st_size).encode() + b'\0')
    with p.open('rb') as f:
        for block in iter(lambda: f.read(1024 * 1024), b''): digest.update(block); blob.update(block)
    require(seal(p.stat()) == seal(before), 'Source changed during inventory')
    return {'source': str(p), 'bytes': before.st_size, 'sha256': digest.hexdigest(), 'gitBlobSHA1': blob.hexdigest(), 'statSeal': seal(before)}

def frozen_raster(p):
    p = Path(p)
    with p.open('rb') as f: head = f.read(32)
    if p.suffix.lower() == '.png':
        require(head.startswith(b'\x89PNG\r\n\x1a\n') and head[12:16] == b'IHDR', 'Invalid pinned PNG signature')
        return True
    if p.suffix.lower() == '.webp':
        require(head[:4] == b'RIFF' and head[8:12] == b'WEBP' and int.from_bytes(head[4:8], 'little') == p.stat().st_size - 8 and head[12:16] in (b'VP8 ', b'VP8L', b'VP8X'), 'Invalid pinned WebP signature')
        return True
    return False

def walk_json(v):
    if isinstance(v, dict):
        for x in v.values(): yield from walk_json(x)
    elif isinstance(v, list):
        for x in v: yield from walk_json(x)
    elif isinstance(v, str): yield v

def write_new(path, value):
    require(path.resolve() == path and not any(p.is_symlink() for p in path.parents), 'Symlink proof destination forbidden')
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open('x') as f: json.dump(value, f, ensure_ascii=False, indent=2); f.write('\n')

def prepare(output):
    require(output.is_absolute() and output.is_relative_to(T) and output.resolve() == output and not output.exists(), 'Fresh isolated plan path required')
    rows = {}; deliveries = []; selected = set(); attempts = {}; referenced = set()
    def add(p, relative, kind):
        p = safe_file(p); target = PREFIX + relative
        require(target not in rows, 'Repeated archive path')
        row = {**pin(p), 'targetPath': target, 'role': kind}
        row['storagePolicy'] = 'frozen-raster-hardlink' if frozen_raster(p) else 'independent-byte-copy'
        if row['storagePolicy'] == 'frozen-raster-hardlink': row['rootAuthorizedImmutableImageScope'] = True
        rows[target] = row; return row
    for label, base in ROOTS.items():
        delivery_path = base / 'FINAL_DELIVERY.json'; delivery = json.loads(delivery_path.read_text())
        sf = delivery.get('sourceFiles', [])
        if label == 'black-star':
            require(delivery.get('schema') == 'cqc.native-projectile-delivery/1' and delivery.get('frameCount') == 8 and delivery.get('nativeGenerationAttempts') == 1, 'Black Star count changed')
            sf = [delivery]
        else: require(delivery.get('schema') == 'cqc.native-combat-delivery/1' and len(sf) == 6, 'Fighter source count changed')
        for source in sf:
            observed = pin(source['source'])
            require(observed['sha256'] == source['sha256'] and observed['bytes'] == source['bytes'], 'Selected source pin differs')
            original = pin(source['nativeOriginal'])
            require((original['sha256'], original['bytes']) == (observed['sha256'], observed['bytes']), 'Native original differs')
            selected.add(source['sha256'])
        deliveries.append({'producer': label, 'uid': delivery['uid'], 'deliveryPin': pin(delivery_path), 'selectedNative': len(sf), 'newPhysicalFrames': 8 if label == 'black-star' else 72, 'fidelityStatus': 'closest_supported', 'QAImportedOrBrowserNotInferred': True})
        native = list((base / 'native-attempts').glob('*.png'))
        require(len(native) == {'running-man': 7, 'black-color': 8, 'red-blaster': 7, 'jungle-evil': 7, 'black-star': 1}[label], 'Native attempts changed')
        for p in native:
            row = pin(p); require(row['sha256'] not in attempts, 'Two attempts have identical PNG bytes')
            attempts[row['sha256']] = {**row, 'producer': label}
        for p in sorted(base.rglob('*')):
            if p.is_dir(): continue
            require(not p.is_symlink(), 'Producer symlink forbidden')
            if any(x in DENY for x in p.relative_to(base).parts): continue
            add(p, 'producers/' + label + '/' + p.relative_to(base).as_posix(), 'complete-producer-path')
            if p.suffix.lower() == '.json':
                for value in walk_json(json.loads(p.read_text())):
                    q = Path(value)
                    if value.startswith('/workspace/') and q.suffix.lower() in ('.png', '.webp', '.jpg', '.jpeg') and not any(q.is_relative_to(r) for r in ROOTS.values()): referenced.add(q)
    require(len(attempts) == 30 and len(selected) == 25 and selected <= set(attempts), '24 fighter selections +five nonfinal +one projectile invariant failed')
    original_sha = set()
    for p in sorted(referenced):
        require(p.is_file(), 'Referenced image missing; no silent omission: ' + str(p))
        if p.is_relative_to(W / 'generated_images'):
            row = add(p, 'native-originals/' + p.name, 'native-imagegen-original'); original_sha.add(row['sha256'])
        else: add(p, 'external-references/' + p.relative_to(W).as_posix(), 'exact-existing-reference-or-preview')
    require(original_sha == set(attempts), 'Generated originals do not cover exactly30 attempts')
    plan = {'schema': 'cqc.pass9.producer-preservation-plan/1', 'status': 'prepared-only', 'expectedParent': PARENT, 'counts': {'fighterSelected': 24, 'fighterNonFinal': 5, 'fighterAttempts': 29, 'projectileSelected': 1, 'projectileFrames': 8, 'allNativeAttempts': 30, 'newFighterPhysicalCells': 288}, 'deliveries': deliveries, 'nativeAttempts': [{**r, 'selected': d in selected, 'repurposedAsOC': False} for d, r in attempts.items()], 'files': list(rows.values()), 'logicalArchiveBytes': sum(r['bytes'] for r in rows.values()), 'newIndependentCopyBytes': sum(r['bytes'] for r in rows.values() if r['storagePolicy'] == 'independent-byte-copy'), 'imageContentWrites': 0, 'historicalDeletions': 0, 'RorSWrites': 0, 'futureQA43Certified': False, 'rootFreeze43StillPending': True, 'catalogWholeByteCopies': 0, 'qualifiedLimits': ['All originals, arguments, layouts, existing references/previews, rejects/failures and earlier producer versions are inventoried unchanged.', 'Immutable PNG/WebP links are authorized only for these exact producer/reference/original bytes. JSON, JS and tool text must have independent archive inodes.', 'Future integration, actualVM403/native8/browser and frozen43 remain pending; producer receipts are not recast as live QA.', 'Only the previously authorized Viper OC remains authorized; no rejected native is reinterpreted as another OC.']}
    write_new(output, plan)
    print(json.dumps({'plan': str(output), 'sha256': sha(output.read_bytes()), 'files': len(rows), 'nativeAttempts': len(attempts), 'independentCopyBytes': plan['newIndependentCopyBytes'], 'frozenRasterLinkBytes': plan['logicalArchiveBytes'] - plan['newIndependentCopyBytes'], 'RorSWrites': 0, 'archiveExecuted': False}, indent=2))

def archive(plan_path, approved_sha, output, execute):
    require(plan_path.is_absolute() and plan_path.is_relative_to(T) and plan_path.is_file() and not plan_path.is_symlink(), 'Isolated plan required')
    require(sha(plan_path.read_bytes()) == approved_sha, 'Approved plan SHA differs')
    plan = json.loads(plan_path.read_text()); require(plan['schema'] == 'cqc.pass9.producer-preservation-plan/1' and plan['expectedParent'] == PARENT, 'Wrong archive plan/parent')
    require(output.is_absolute() and output.is_relative_to(T) and output.resolve() == output and not output.exists(), 'Fresh isolated archive output required')
    before = []
    for row in plan['files']:
        observed = pin(row['source']); require(all(observed[k] == row[k] for k in ('bytes', 'sha256', 'gitBlobSHA1', 'statSeal')), 'Producer source changed after plan')
        name = row['targetPath']; require(name.startswith(PREFIX) and '..' not in Path(name).parts and '\\' not in name and not Path(name).is_absolute(), 'Unsafe archive target')
        require(row['storagePolicy'] in ('frozen-raster-hardlink', 'independent-byte-copy'), 'Unknown archive policy')
        if row['storagePolicy'] == 'frozen-raster-hardlink': require(row.get('rootAuthorizedImmutableImageScope') is True and frozen_raster(row['source']), 'Only explicitly frozen valid images may be linked')
        before.append(observed)
    if not execute:
        print(json.dumps({'status': 'read-only-ready', 'files': len(before), 'copies': plan['newIndependentCopyBytes'], 'sourceWrites': 0}, indent=2)); return
    output.mkdir(); journal = output / 'ARCHIVE_JOURNAL.jsonl'; post = []
    try:
        for row in plan['files']:
            source = safe_file(row['source']); target = output / row['targetPath']; target.parent.mkdir(parents=True, exist_ok=True)
            current = pin(source); require(current['sha256'] == row['sha256'] and current['statSeal'] == row['statSeal'], 'Source changed before archive')
            if row['storagePolicy'] == 'frozen-raster-hardlink':
                require(source.stat().st_dev == target.parent.stat().st_dev, 'Cross-device immutable hardlink forbidden')
                os.link(source, target, follow_symlinks=False)
            else:
                with source.open('rb') as src, target.open('xb') as dst:
                    for block in iter(lambda: src.read(1024 * 1024), b''): dst.write(block)
                os.chmod(target, row['statSeal']['mode'])
                require(target.stat().st_ino != source.stat().st_ino, 'Mutable archive copy shares source inode')
            observed = pin(target); require((observed['bytes'], observed['sha256']) == (row['bytes'], row['sha256']), 'Archived bytes differ')
            post.append(observed)
            with journal.open('a') as f: f.write(json.dumps({'source': str(source), 'target': str(target), 'sha256': row['sha256'], 'policy': row['storagePolicy']}) + '\n'); f.flush(); os.fsync(f.fileno())
        for row in plan['files']:
            observed = pin(row['source']); require(observed['sha256'] == row['sha256'] and observed['statSeal'] == row['statSeal'], 'Source bytes/identity changed during archive')
        write_new(output / 'ARCHIVE_RECEIPT.json', {'schema': 'cqc.pass9.producer-preservation-receipt/1', 'status': 'completed', 'approvedPlanSha256': approved_sha, 'fileCount': len(post), 'files': post, 'newIndependentCopyBytes': plan['newIndependentCopyBytes'], 'historicalPathsDeleted': 0, 'sourceImageBytesEdited': 0, 'RorSWrites': 0})
    except BaseException as exc:
        write_new(output / 'ARCHIVE_FAILURE.json', {'status': 'failed', 'error': repr(exc), 'completedPaths': len(post), 'allPartialAndHistoricalBytesRetained': True}); raise

def main():
    p = argparse.ArgumentParser(description=__doc__); sub = p.add_subparsers(dest='action', required=True)
    a = sub.add_parser('plan'); a.add_argument('--output', type=Path, required=True)
    a = sub.add_parser('archive'); a.add_argument('--plan', type=Path, required=True); a.add_argument('--approved-plan-sha256', required=True); a.add_argument('--output', type=Path, required=True); a.add_argument('--execute', action='store_true')
    args = p.parse_args()
    if args.action == 'plan': prepare(args.output)
    else: archive(args.plan, args.approved_plan_sha256, args.output, args.execute)

if __name__ == '__main__': main()
