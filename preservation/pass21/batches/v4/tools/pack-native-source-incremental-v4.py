"""Pack only newly unique V4 objects, without rewriting any old ZIP."""
from pathlib import Path
import argparse, hashlib, json, shutil, zipfile
ROOT = Path(__file__).parent
PACK = Path('/tmp/cqc-pass21-source-preservation-v4/lossless-delta-v1')
PREFIX = 'preservation/pass21/batches/v4/'
SHA = lambda b: hashlib.sha256(b).hexdigest()
GIT = lambda b: hashlib.sha1(b'blob ' + str(len(b)).encode() + b'\0' + b).hexdigest()
def save(p, d):
    b = (json.dumps(d, ensure_ascii=False, indent=2) + '\n').encode(); p.parent.mkdir(parents=True, exist_ok=True)
    if p.exists(): assert p.read_bytes() == b
    else: p.write_bytes(b); p.chmod(0o400)
    return SHA(b)
def execute():
    snapshot_file = ROOT / 'SOURCE_SNAPSHOT_ACTUAL_V1.json'; raw = snapshot_file.read_bytes(); snapshot = json.loads(raw)
    baseline = json.loads((ROOT / 'PRIOR_FULL_REGULAR_TREE_BASELINE_ACTUAL_V1.json').read_bytes())
    prior_paths = {r['path']: r['sha'] for r in baseline['tree'] if r['type'] == 'blob'}
    assert len(prior_paths) == 3443 and baseline['sha'] == snapshot['priorTree']
    assert snapshot['oldArchivesNotRepacked'] and snapshot['noProducerByteOrMtimeMutations']
    for pin in snapshot['priorArchives']:
        assert prior_paths[pin['repositoryPath']] == pin['gitBlobSHA1']
    for pin in snapshot['priorIndexPins']:
        assert SHA(Path(pin['path']).read_bytes()) == pin['sha256']
    new = sorted((r for r in snapshot['uniqueBlobs'] if r['tier'] == 'new-cas'), key=lambda r: r['sha256'])
    assert len(new) == snapshot['newCASUniqueBlobCount'] and all(r['bytes'] <= 200_000_000 for r in new)
    assert shutil.disk_usage('/tmp').free > snapshot['storageBudgetAtInventory']['measuredDeflateBytes'] + len(new) * 2048 + snapshot['storageBudgetAtInventory']['maximumRegularRestorationFileBytes'] + 16 * 1024 * 1024
    # Segment only oversized objects; each recipe retains the complete original SHA.
    physical = []; segmented = {}
    for row in new:
        content = Path(row['snapshotPath']).read_bytes()
        assert len(content) == row['bytes'] and SHA(content) == row['sha256'] and GIT(content) == row['gitBlobSHA1']
        if len(content) <= 21_000_000:
            physical.append(dict(row, sourceSnapshotPath=row['snapshotPath'], sourceOffset=0, sourceBytes=len(content)))
        else:
            parts = []
            for number, offset in enumerate(range(0, len(content), 20_000_000)):
                part = content[offset:offset+20_000_000]
                chunk = {'sha256': SHA(part), 'gitBlobSHA1': GIT(part), 'bytes': len(part), 'sourceSnapshotPath': row['snapshotPath'], 'sourceOffset': offset, 'sourceBytes': len(content), 'originalSourceSHA256': row['sha256'], 'segmentNumber': number}
                physical.append(chunk); parts.append(chunk)
            segmented[row['sha256']] = parts
        del content
    PACK.mkdir(parents=True, exist_ok=True); groups = []; group = []; size = 0
    for row in physical:
        if group and size + row['bytes'] > 21_000_000: groups.append(group); group = []; size = 0
        group.append(row); size += row['bytes']
    if group: groups.append(group)
    archives = []; locations = {}
    for number, rows in enumerate(groups, 1):
        target = PACK / ('source-delta-part-%04d.zip' % number); assert not target.exists()
        with zipfile.ZipFile(target, 'x', compression=zipfile.ZIP_DEFLATED, compresslevel=6) as archive:
            for row in rows:
                with Path(row['sourceSnapshotPath']).open('rb') as source:
                    source.seek(row['sourceOffset']); content = source.read(row['bytes'])
                assert SHA(content) == row['sha256'] and GIT(content) == row['gitBlobSHA1'] and len(content) == row['bytes']
                info = zipfile.ZipInfo('objects/' + row['sha256']); info.date_time = (2026, 10, 8, 0, 0, 0); info.compress_type = zipfile.ZIP_DEFLATED; info.external_attr = 0o100644 << 16
                archive.writestr(info, content, compresslevel=6)
        assert target.stat().st_size <= 22_000_000
        with zipfile.ZipFile(target) as archive:
            assert archive.testzip() is None and len(archive.infolist()) == len(rows)
            for row in rows:
                with Path(row['sourceSnapshotPath']).open('rb') as source:
                    source.seek(row['sourceOffset']); expected = source.read(row['bytes'])
                assert archive.read('objects/' + row['sha256']) == expected
        content = target.read_bytes(); target.chmod(0o400)
        pin = {'file': target.name, 'repositoryPath': PREFIX + 'lossless-delta-v1/' + target.name, 'bytes': len(content), 'sha256': SHA(content), 'gitBlobSHA1': GIT(content), 'objectCount': len(rows), 'uncompressedObjectBytes': sum(r['bytes'] for r in rows), 'objects': [{'entry': 'objects/' + r['sha256'], **{k: r[k] for k in ['sha256', 'gitBlobSHA1', 'bytes']}} for r in rows]}
        archives.append(pin)
        for row in rows:
            locations[row['sha256']] = {'tier': 'delta-v4', 'repositoryArchivePath': pin['repositoryPath'], 'archiveFile': pin['file'], 'archiveSHA256': pin['sha256'], 'archiveGitBlobSHA1': pin['gitBlobSHA1'], 'entry': 'objects/' + row['sha256'], **{k: row[k] for k in ['sha256', 'gitBlobSHA1', 'bytes']}}
        print(json.dumps({'stage': 'delta-CRC-and-exact-bytes-passed', 'part': number, 'parts': len(groups), 'archiveBytes': len(content), 'objects': len(rows)}), flush=True)
    for row in new:
        if row['sha256'] not in segmented: continue
        recipe = []
        for part in segmented[row['sha256']]:
            pointer = dict(locations[part['sha256']]); pointer.update(originalSourceOffset=part['sourceOffset'], segmentNumber=part['segmentNumber'])
            recipe.append(pointer)
        assert sum(part['bytes'] for part in recipe) == row['bytes']
        locations[row['sha256']] = {'tier': 'delta-v4-segmented', 'sha256': row['sha256'], 'gitBlobSHA1': row['gitBlobSHA1'], 'bytes': row['bytes'], 'segments': recipe, 'method': 'ordered-exact-native-byte-segments-no-JSON-rewrite'}
    mapping = []
    for row in snapshot['rows']:
        pointer = locations[row['sha256']] if row['storage']['tier'] == 'new-cas' else row['storage']
        assert pointer['bytes'] == row['bytes'] and pointer['gitBlobSHA1'] == row['gitBlobSHA1']
        item = {k: row[k] for k in ['localPath', 'sha256', 'gitBlobSHA1', 'bytes', 'versionScope']}; item['archive'] = pointer
        for key in ['literalTopLevelStatus', 'priorVersionSHA256', 'sameAsPriorVersion', 'sourceRead']:
            if key in row: item[key] = row[key]
        mapping.append(item)
    map_file = ROOT / 'FULL_SNAPSHOT_ARCHIVE_MAP_ACTUAL_V1.json'
    map_sha = save(map_file, {'schema': 'cqc.pass21.full-source-archive-map/2', 'status': 'portable-exact-byte-map', 'sourceSnapshotSHA256': SHA(raw), 'sourceReadStartedAt': snapshot['snapshotReadStartedAt'], 'sourceReadFinishedAt': snapshot['snapshotReadFinishedAt'], 'rows': mapping, 'pathCount': len(mapping), 'allOriginalPathNamesPreserved': True, 'currentVersusPriorOnlyVersionScopeExplicit': True, 'futureVersionsCovered': False})
    prior_archives = [{k: p[k] for k in ['file', 'repositoryPath', 'bytes', 'sha256', 'gitBlobSHA1', 'localArchivePath']} for p in snapshot['priorArchives']]
    index = {'schema': 'cqc.pass21.incremental-lossless-source-index/2', 'status': 'passed-new-object-byte-roundtrip', 'sourceSnapshotFile': snapshot_file.name, 'sourceSnapshotSHA256': SHA(raw), 'sourceSnapshotRepositoryPath': PREFIX + 'metadata/' + snapshot_file.name, 'fullMapFile': map_file.name, 'fullMapSHA256': map_sha, 'fullMapRepositoryPath': PREFIX + 'metadata/' + map_file.name, 'parent': snapshot['parent'], 'priorTree': snapshot['priorTree'], 'priorArchives': prior_archives, 'deltaArchives': archives, 'newUniqueBlobCount': len(new), 'newUniqueBytes': sum(r['bytes'] for r in new), 'newArchiveBytes': sum(a['bytes'] for a in archives), 'originalPathCount': len(mapping), 'currentReadPathCount': snapshot['currentReadPathCount'], 'priorOnlyRetainedPathCount': snapshot['priorOnlyRetainedPathCount'], 'oldArchiveCount': 72, 'oldArchivesNotRepacked': True, 'prior3443GitPathsUnchanged': True, 'archiveHardCapBytes': 22_000_000, 'allNewZIPCRCAndObjectBytesVerified': True, 'fullRegularRestorationQAPendingAtIndexCreation': True, 'sourceStatusesNotReclassified': True, 'sourceCandidatesNotPromotedToRuntime': True, 'newObjectLocations': {row['sha256']: locations[row['sha256']] for row in new}, 'segmentedWholeSourceCount': len(segmented), 'physicalZIPObjectCount': len(physical), 'futureReuseQualification': 'Use newObjectLocations for whole source SHA reuse; the ZIP object list also contains exact chunks of oversized sources.', 'sourceInterval': {'start': snapshot['snapshotReadStartedAt'], 'finish': snapshot['snapshotReadFinishedAt']}}
    save(PACK / 'LOSSLESS_INCREMENTAL_SOURCE_INDEX_ACTUAL_V1.json', index)
    print(json.dumps({'stage': 'archive-map-ready', 'paths': len(mapping), 'deltaArchives': len(archives), 'newArchiveBytes': index['newArchiveBytes'], 'tmpFree': shutil.disk_usage('/tmp').free}), flush=True)
if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__); parser.add_argument('--pack', action='store_true'); args = parser.parse_args()
    if args.pack: execute()
