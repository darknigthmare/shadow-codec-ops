"""Preserve exact stable reads, old archive pointers and literal source statuses."""
from pathlib import Path
import argparse, datetime, hashlib, json, os, re, shutil, stat, time, zlib

ROOT = Path(__file__).parent
TMP = Path('/tmp/cqc-pass21-source-preservation-v5')
PNG_CAS = ROOT / 'native-png-cas'
TEXT_CAS = TMP / 'text-cas'
SEALED_CAS = ROOT / 'sealed-proof-cas'
SEALED_PROOFS = json.loads((ROOT / 'SEALED_WORKSPACE_TEXT_CAS_WHITELIST_ACTUAL_V1.json').read_bytes())['sealedWorkspaceFiles']
PRIOR = Path('/workspace/cqc-pass21/batches/v4/preservation/SOURCE_SNAPSHOT_ACTUAL_V1.json')
B2 = Path('/tmp/cqc-pass21-source-archive-relocation/batch2/lossless-v2/LOSSLESS_SOURCE_INDEX_ACTUAL_V1.json')
B3 = Path('/tmp/cqc-pass21-source-preservation-v3/lossless-delta-v1/LOSSLESS_INCREMENTAL_SOURCE_INDEX_ACTUAL_V1.json')
B4 = Path('/tmp/cqc-pass21-source-preservation-v4/lossless-delta-v1/LOSSLESS_INCREMENTAL_SOURCE_INDEX_ACTUAL_V1.json')
BOOT = Path('/tmp/cqc-solid-cyborg-next-boot-v1')
TMP_SEAL = Path('/tmp/SOLID_CYBORG_PRIVATE_BOOT_ELEVEN_FILES_SOURCE_FREEZE_SEAL_ACTUAL_V1.json')
PARENT = '0b621149ba0ff3f678bcf2438a3ac93293392db1'
TREE = 'f5c32a7de6e5e5b7c6baea94240506e0d7e113b5'
PREFIX = 'preservation/pass21/batches/v5/'
SOURCE_REVIEW = Path('/workspace/cqc-pass21/batches/v4/integration/SOURCE_REVIEW_FOR_ISOLATED_QA_ACTUAL_V2.json')
FACTS = Path('/workspace/cqc-pass21/batches/v4/integration/RELEASE_FACTS_FROZEN_ACTUAL_V1.json')
FROZEN = Path('/workspace/cqc-pass21/batches/v4/application')
EXCLUDED = {'.git', '.vercel', '.aws', '.codex', '.agents', 'node_modules', '__pycache__', 'dist', 'profile', 'profiles', 'cas', 'native-png-cas', 'text-cas', 'sealed-proof-cas', 'native-source-cas', 'relocated-immutable-cas', 'generated-archives-lossless', 'application', 'publication', 'blob-proofs', 'packed-v2-blob-proofs', 'packed-v3-blob-proofs', 'packed-v4-blob-proofs'}
TEXT = {'.json', '.jsonl', '.mjs', '.js', '.py', '.txt', '.md', '.log', '.html', '.patch'}
SECRETS = [re.compile(rb'-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----'), re.compile(rb'github_pat_[A-Za-z0-9_]{50,}'), re.compile(rb'gh[pousr]_[A-Za-z0-9_]{36,}'), re.compile(rb'AKIA[0-9A-Z]{16}')]
TOOL_IMAGE = re.compile(r'/workspace/generated_images/exec-[0-9a-f-]{36}\.png')
SHA = lambda b: hashlib.sha256(b).hexdigest()
GIT = lambda b: hashlib.sha1(b'blob ' + str(len(b)).encode() + b'\0' + b).hexdigest()
now = lambda: datetime.datetime.now(datetime.timezone.utc).isoformat()

def save(path, document):
    raw = (json.dumps(document, ensure_ascii=False, indent=2) + '\n').encode()
    path.parent.mkdir(parents=True, exist_ok=True)
    if path.exists():
        assert path.read_bytes() == raw, 'Immutable receipt already differs'
    else:
        with path.open('xb') as handle: handle.write(raw)
        path.chmod(0o400)
    return SHA(raw)

def stable(path):
    for attempt in range(4):
        start = now(); before = path.stat(); raw = path.read_bytes(); after = path.stat()
        key = lambda s: (s.st_dev, s.st_ino, s.st_size, s.st_mtime_ns)
        if key(before) == key(after) and len(raw) == after.st_size:
            assert stat.S_ISREG(after.st_mode), 'Source must resolve to a regular file'
            if path.suffix.lower() in TEXT:
                assert not any(pattern.search(raw) for pattern in SECRETS), 'Operational credential pattern excluded; no content emitted'
            return raw, {'readStartedAt': start, 'readFinishedAt': now(), 'device': after.st_dev, 'inode': after.st_ino, 'size': after.st_size, 'mtimeNS': after.st_mtime_ns, 'stableReadAttempts': attempt + 1}
        time.sleep(.1)
    raise RuntimeError('Source changed through bounded retries: ' + str(path))

def blocked(path):
    name = path.name.lower()
    return name.startswith(('.env', 'auth', 'credentials')) or path.suffix.lower() in {'.sqlite', '.db', '.cookie', '.zip', '.raw-zip-segment', '.tsbuildinfo'} or path.suffix == '.log' and ('actual' not in name or any(s in name for s in ['chrome', 'browser', 'server']))

def old_archives():
    b2, b3 = json.loads(B2.read_bytes()), json.loads(B3.read_bytes())
    assert len(b2['archives']) == 58 and len(b3['deltaArchives']) == 14
    where = {}; archives = []
    for tier, directory, source in [('prior-batch2', B2.parent, b2['archives']), ('prior-batch3', B3.parent, b3['deltaArchives'])]:
        for archive in source:
            repository = archive.get('repositoryPath', 'preservation/pass21/batches/v2/lossless-v2/' + archive['file'])
            pin = {key: archive[key] for key in ['file', 'bytes', 'sha256', 'gitBlobSHA1']}
            pin.update(repositoryPath=repository, localArchivePath=str(directory / archive['file']))
            archives.append(pin)
            for obj in archive['objects']:
                pointer = {'tier': tier, 'repositoryArchivePath': repository, 'archiveFile': archive['file'], 'archiveSHA256': archive['sha256'], 'archiveGitBlobSHA1': archive['gitBlobSHA1'], **{key: obj[key] for key in ['entry', 'sha256', 'gitBlobSHA1', 'bytes']}}
                if obj['sha256'] in where: assert where[obj['sha256']]['bytes'] == obj['bytes']
                else: where[obj['sha256']] = pointer
    assert len(where) == 4850 and len(archives) == 72
    v4 = json.loads(B4.read_bytes()); assert len(v4['newObjectLocations']) == 1200 and not set(where) & set(v4['newObjectLocations'])
    where.update(v4['newObjectLocations'])
    for archive in v4['deltaArchives']:
        pin = {key: archive[key] for key in ['file', 'bytes', 'sha256', 'gitBlobSHA1', 'repositoryPath']}; pin['localArchivePath'] = str(B4.parent / archive['file']); archives.append(pin)
    assert len(where) == 6050 and len(archives) == 100
    assert len(where['532c4e4436616d1627b99ac29117717636143efe4bf7e0fa2c0e3cab1dbebf97']['segments']) == 9
    return where, archives

def collect():
    old = json.loads(PRIOR.read_bytes()); candidates = set(); excluded = []
    assert len(old['rows']) == 6940
    for name in old['roots']:
        directory = Path('/workspace') / name
        for base, dirs, names in os.walk(directory, followlinks=False):
            dirs[:] = [n for n in dirs if n not in EXCLUDED and not n.startswith('application-') and not any(s in n.lower() for s in ['chrome-profile', 'chromium-profile', 'profile-', 'cache-', 'owned-', 'root-owned']) and not (Path(base) / n).is_relative_to(ROOT)]
            for name in names:
                path = Path(base) / name
                if blocked(path): continue
                if not path.is_file(): continue
                if any(p in {'.git', '.aws', '.codex', '.agents', '.vercel', 'profile', 'profiles'} for p in path.resolve().parts): continue
                candidates.add(path)
    seal_raw = TMP_SEAL.read_bytes(); seal = json.loads(seal_raw)
    assert SHA(seal_raw) == 'd52cb10a2ab27dc5fc98054787c0d81f6e088a336da761625686c4d1a96adfb5' and len(seal['files']) == 11
    candidates.add(TMP_SEAL)
    for pin in seal['files']:
        path = Path(pin['path']); assert path.resolve().is_relative_to(BOOT) and not path.is_symlink()
        raw, _ = stable(path); assert SHA(raw) == pin['sha256'] and len(raw) == pin['bytes']; candidates.add(path)
    review_raw = SOURCE_REVIEW.read_bytes(); review = json.loads(review_raw)
    facts_raw = FACTS.read_bytes(); facts = json.loads(facts_raw)
    assert facts['status'] == 'passed' and review['status'] == 'reviewed-final-frozen-source' and len(review['sourcePins']) == 471
    explicit = {}
    for pin in review['sourcePins']:
        path = FROZEN / pin['path']; assert path.resolve().is_relative_to(FROZEN)
        assert path.is_file() and not path.is_symlink()
        raw, _ = stable(path); assert len(raw) == pin['bytes'] and SHA(raw) == pin['sha256']
        candidates.add(path); explicit[str(path)] = pin
    # Preserve the earlier readonly structure/estimate without including our future CAS.
    for path in ROOT.iterdir():
        if path.is_file() and path.suffix in {'.json', '.py', '.md'}: candidates.add(path)
    images = set()
    for path in sorted(candidates):
        if path.suffix.lower() in TEXT:
            raw, _ = stable(path); images.update(Path(p) for p in TOOL_IMAGE.findall(raw.decode('utf-8', errors='replace')))
    missing = [str(p) for p in sorted(images) if not p.is_file()]
    assert not missing, 'Producer-declared native tool source missing'
    candidates.update(images)
    return old, candidates, explicit, images, {'path': str(SOURCE_REVIEW), 'sha256': SHA(review_raw), 'bytes': len(review_raw)}, {'path': str(FACTS), 'sha256': SHA(facts_raw), 'bytes': len(facts_raw)}

def execute(freeze):
    started = now(); old, candidates, explicit, images, review_pin, facts_pin = collect(); old_where, archives = old_archives()
    previous = {r['localPath']: r for r in old['rows']}; inventory = []; new = {}; statuses = []
    for n, path in enumerate(sorted(candidates), 1):
        raw, read = stable(path); sha = SHA(raw); oid = GIT(raw)
        if str(path) in SEALED_PROOFS: assert sha == SEALED_PROOFS[str(path)], 'Explicit sealed proof changed'
        if str(path) in explicit: assert sha == explicit[str(path)]['sha256'] and len(raw) == explicit[str(path)]['bytes']
        row = {'localPath': str(path), 'sha256': sha, 'gitBlobSHA1': oid, 'bytes': len(raw), 'versionScope': 'current-stable-read', 'sourceRead': read}
        if str(path) in previous: row.update(priorVersionSHA256=previous[str(path)]['sha256'], sameAsPriorVersion=sha == previous[str(path)]['sha256'])
        if sha in old_where:
            assert old_where[sha]['bytes'] == len(raw) and old_where[sha]['gitBlobSHA1'] == oid
            row['storage'] = old_where[sha]
        else:
            assert len(raw) <= 200_000_000, 'New oversize object exceeds bounded read/restore budget'
            row['storage'] = {'tier': 'new-cas', 'sha256': sha, 'gitBlobSHA1': oid, 'bytes': len(raw), 'snapshotPath': str((SEALED_CAS if str(path) in SEALED_PROOFS else PNG_CAS if path.suffix.lower() == '.png' else TEXT_CAS) / sha)}
            new.setdefault(sha, row)
        if path.suffix.lower() == '.json':
            try: value = json.loads(raw)
            except (ValueError, UnicodeDecodeError): value = None
            if isinstance(value, dict) and isinstance(value.get('status'), str):
                row['literalTopLevelStatus'] = value['status']
                statuses.append({key: row[key] for key in ['localPath', 'sha256', 'literalTopLevelStatus', 'versionScope']})
        inventory.append(row)
        if n % 800 == 0: print(json.dumps({'stage': 'stable-inventory', 'read': n, 'total': len(candidates), 'newUnique': len(new)}), flush=True)
    other = sum(r['bytes'] for r in new.values() if not r['localPath'].lower().endswith('.png') and r['localPath'] not in SEALED_PROOFS)
    total = sum(r['bytes'] for r in new.values()); compressed = 0
    segmented = 0
    for row in new.values():
        with Path(row['localPath']).open('rb') as handle:
            if row['bytes'] > 21_000_000: segmented += 1
            while True:
                part = handle.read(20_000_000 if row['bytes'] > 21_000_000 else row['bytes'])
                if not part: break
                compressor = zlib.compressobj(6, zlib.DEFLATED, -15)
                count = len(compressor.compress(part)) + len(compressor.flush())
                assert count + 1024 < 22_000_000, 'Compressed segment cap unexpectedly exceeded'
                compressed += count
    max_restore = max(r['bytes'] for r in inventory)
    bound = other + compressed + len(new) * 2048 + max_restore + 32 * 1024 * 1024
    budget = {'newUniqueBlobs': len(new), 'newUniqueBytes': total, 'newPNGOrSealedProofHardlinkUniqueBytes': total - other, 'sealedProofCASRegularHardlinkSources': SEALED_PROOFS, 'tmpTextCASBytes': other, 'conservativeTmpTextCASPlusZIPPlusScratchBytes': bound, 'measuredDeflateBytes': compressed, 'largeSourcesUsingLosslessSegmentation': segmented, 'maximumRegularRestorationFileBytes': max_restore, 'tmpFree': shutil.disk_usage('/tmp').free, 'workspaceFree': shutil.disk_usage('/workspace').free, 'archiveHardCapBytes': 22_000_000, 'nativeRegularHardlinksExpected': True}
    assert budget['tmpFree'] > bound, 'TMP budget not sufficient; sources untouched'
    assert budget['workspaceFree'] > 24 * 1024 * 1024, 'Receipt/headroom budget insufficient'
    if not freeze:
        save(ROOT / 'SOURCE_DELTA_FINAL_READONLY_BUDGET_ACTUAL_V1.json', {'schema': 'cqc.pass21.final-delta-budget/1', 'status': 'passed-readonly-budget', 'readStartedAt': started, 'readFinishedAt': now(), 'budget': budget, 'currentCandidatePaths': len(candidates), 'all471FinalFrozenSourcePinsVerified': True})
        print(json.dumps({'stage': 'final-delta-budget', **{k:v for k,v in budget.items() if k != 'sealedProofCASRegularHardlinkSources'}}), flush=True); return
    assert not (ROOT / 'SOURCE_SNAPSHOT_ACTUAL_V1.json').exists()
    PNG_CAS.mkdir(parents=True, exist_ok=True); TEXT_CAS.mkdir(parents=True, exist_ok=True); SEALED_CAS.mkdir(parents=True, exist_ok=True)
    linked = copied = sealed_links = 0
    for n, (sha, row) in enumerate(sorted(new.items()), 1):
        source = Path(row['localPath']); target = Path(row['storage']['snapshotPath']); raw, _ = stable(source)
        assert SHA(raw) == sha and GIT(raw) == row['gitBlobSHA1'] and len(raw) == row['bytes'], 'Source changed since inventory; no substitute accepted'
        if not target.exists():
            if str(source) in SEALED_PROOFS:
                assert sha == SEALED_PROOFS[str(source)] and source.stat().st_dev == SEALED_CAS.stat().st_dev
                os.link(source.resolve(), target); sealed_links += 1
            elif source.suffix.lower() == '.png':
                assert source.stat().st_dev == PNG_CAS.stat().st_dev
                os.link(source.resolve(), target); linked += 1
            else:
                with target.open('xb') as handle: handle.write(raw)
                target.chmod(0o400); copied += len(raw)
        assert not target.is_symlink() and target.is_file() and SHA(target.read_bytes()) == sha
    current_paths = {r['localPath'] for r in inventory}; prior_only = 0
    for row in old['rows']:
        if row['localPath'] in current_paths: continue
        retained = {key: row[key] for key in ['localPath', 'sha256', 'gitBlobSHA1', 'bytes']}
        retained.update(versionScope='prior-only-preserved-not-attested-current', storage=old_where[row['sha256']])
        if 'literalTopLevelStatus' in row:
            retained['literalTopLevelStatus'] = row['literalTopLevelStatus']
            statuses.append({key: retained[key] for key in ['localPath', 'sha256', 'literalTopLevelStatus', 'versionScope']})
        inventory.append(retained); prior_only += 1
    inventory.sort(key=lambda r: r['localPath']); assert len(inventory) == len({r['localPath'] for r in inventory})
    assert set(previous).issubset({r['localPath'] for r in inventory})
    unique = {r['sha256']: r['storage'] for r in inventory}
    snapshot = {'schema': 'cqc.pass21.incremental-native-source-exact-snapshot/2', 'status': 'exact-byte-incremental-snapshot-frozen', 'parent': PARENT, 'priorTree': TREE, 'priorRegularGitPaths': 3481, 'pathPrefix': PREFIX, 'roots': old['roots'], 'snapshotReadStartedAt': started, 'snapshotReadFinishedAt': now(), 'priorSnapshot': {'path': str(PRIOR), 'sha256': SHA(PRIOR.read_bytes()), 'originalPathCount': 6940, 'archiveCount': 100}, 'priorIndexPins': [{'path': str(p), 'sha256': SHA(p.read_bytes())} for p in [B2, B3, B4]], 'priorArchives': archives, 'rows': inventory, 'uniqueBlobs': list(unique.values()), 'sourceQualityQualifications': statuses, 'exactDeclaredToolImages': list(map(str, sorted(images))), 'finalFrozenSourceReview': review_pin, 'finalReleaseFacts': facts_pin, 'applicationCommitReportedByRoot': '1c5872a7efbeb4a3f405471f36f84808773d70bf', 'applicationCommitIsSeparateFromSourceBranchParent': True, 'explicitFrozenSourcePinsRead': 471, 'currentReadPathCount': len(candidates), 'priorOnlyRetainedPathCount': prior_only, 'newCASUniqueBlobCount': len(new), 'newCASBytes': total, 'newCASCopiedBytes': copied, 'newCASNativePGHardlinks': linked, 'newCASSealedProofHardlinks': sealed_links, 'sealedProofHardlinkAuthorization': 'Root GO authorizes exact sealed-workspace whitelist regular links, no chmod; private eleven tmp candidates use byte-exact copies, never cross-device links.', 'storageBudgetAtInventory': budget, 'all6050HistoricalWholeSourceObjectsAvailableForReuse': True, 'V4WholeSourceLocations1200AndLeoneNineSegmentsReused': True, 'twoOlderObjectsAbsentFromPriorCurrentMapRemainInPriorArchives': True, 'noProducerByteOrMtimeMutations': True, 'nativeImagesAppendOnlyByProjectContractNoSharedInodeChmod': True, 'noSourceEvictions': True, 'oldArchivesNotRepacked': True, 'statusesNotReclassified': True, 'topLevelStatusesAreOverviewOnly': True, 'snapshotIsReadIntervalNotAtomicGlobalPause': True, 'coversVersionsReadAtSnapshotOnly': True, 'doesNotCertifyArtworkCompletion': True}
    save(ROOT / 'SOURCE_SNAPSHOT_ACTUAL_V1.json', snapshot)
    print(json.dumps({'stage': 'source-frozen', 'paths': len(inventory), 'currentPaths': len(candidates), 'priorOnlyPaths': prior_only, **{k:v for k,v in budget.items() if k != 'sealedProofCASRegularHardlinkSources'}, 'actualPNGCASRegularHardlinks': linked, 'actualTextCASCopiedBytes': copied}), flush=True)

if __name__ == '__main__':
    p = argparse.ArgumentParser(description=__doc__); p.add_argument('--freeze', action='store_true'); p.add_argument('--budget', action='store_true'); args = p.parse_args()
    if args.freeze or args.budget: execute(args.freeze)
