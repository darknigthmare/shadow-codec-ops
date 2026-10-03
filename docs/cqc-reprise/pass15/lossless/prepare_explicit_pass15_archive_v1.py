#!/usr/bin/env python3
"""Plan PASS15 from Root's explicit closed list and Git-published prior archives.
No producer traversal/freeze, new archives, old archive copies or Root GO creation.
"""
import sys
sys.dont_write_bytecode = True
import argparse, hashlib, importlib.util, json, subprocess
from pathlib import Path

HERE = Path(__file__).resolve().parent
sp = importlib.util.spec_from_file_location('archive15', HERE / 'archive_pass15_lossless_v1.py')
A = importlib.util.module_from_spec(sp); sp.loader.exec_module(A)
REPO = Path('/workspace/shadow-codec-recovered')
BASE = '7524824aea3dc1b8bb925b75834a5d19b8106af6'
PUBLISHED = [
    'docs/cqc-reprise/pass13/lossless/LOSSLESS_RECONSTRUCTION_INDEX.json',
    'docs/cqc-reprise/pass13/lossless/LOSSLESS_RECONSTRUCTION_INDEX_V2.json',
    'docs/cqc-reprise/pass13/lossless/LOSSLESS_RECONSTRUCTION_INDEX_V3.json',
    'docs/cqc-reprise/pass14/lossless/LOSSLESS_RECONSTRUCTION_INDEX_PHASE1_V3.json',
    'docs/cqc-reprise/pass14/lossless/LOSSLESS_RECONSTRUCTION_INDEX_PHASE2_V1.json',
]

def git_blob(data):
    return hashlib.sha1(b'blob ' + str(len(data)).encode() + b'\0' + data).hexdigest()

def git_tree():
    tree = subprocess.check_output(['git', 'ls-tree', '-r', BASE, '--', 'docs/cqc-reprise/pass13/lossless', 'docs/cqc-reprise/pass14/lossless'], cwd=REPO, text=True)
    return {line.split('\t', 1)[1]: line.split()[2] for line in tree.splitlines()}

def checked_published(relative, tree, cache):
    p = REPO / relative
    if relative not in tree or not p.resolve(strict=True).is_relative_to(REPO / 'docs/cqc-reprise'):
        raise ValueError('Only prior Git-published lossless artifacts are accepted')
    if relative not in cache:
        b = A.file_bytes(p)
        if git_blob(b) != tree[relative]:
            raise ValueError('Prior published artifact differs from Git752: ' + relative)
        cache[relative] = {'path': str(p), 'repositoryPath': relative, 'bytes': len(b), 'sha256': A.sha(b), 'gitBlobSHA1': tree[relative]}
    return cache[relative]

def prior_catalog(tree):
    catalog, indexpins, cache = {}, [], {}
    historical14 = 0
    for relative in PUBLISHED:
        pin = checked_published(relative, tree, cache)
        index = json.loads(A.file_bytes(Path(pin['path'])))
        if not index.get('closed') or not index.get('actualRun'):
            raise ValueError('Prior published index must be closed and actual')
        indexpins.append(pin)
        if '/pass14/' in relative:
            historical14 += index['logicalBytes']
        for obj in index['objects']:
            if obj['sha256'] in catalog:
                continue
            if 'archivePart' in obj and 'archiveMember' in obj:
                members = [{'archiveRepositoryPath': str(Path(relative).parent / obj['archivePart']), 'archiveMember': obj['archiveMember'], 'sha256': obj['sha256'], 'bytes': obj['bytes']}]
            elif obj.get('storageKind') == 'pass14-new-chunks':
                pins = {x['file']: x for x in index['archives']}
                members = [{**m, 'archiveRepositoryPath': pins[m['archiveFile']]['repositoryPath']} for m in obj['chunks']]
            elif obj.get('storageKind') == 'existing-closed-member':
                loc = obj['location']; members = loc.get('members', [loc])
            else:
                raise ValueError('Unsupported prior published object kind')
            fixed = []
            for m in members:
                rel = m.get('archiveRepositoryPath')
                if not rel or rel not in tree:
                    raise ValueError('Prior member missing Git-published repository path')
                fixed.append({**m, 'archivePath': str(REPO / rel)})
            catalog[obj['sha256']] = {'sha256': obj['sha256'], 'bytes': obj['bytes'], 'members': fixed}
    return catalog, indexpins, cache, historical14

def prepare(config_path, output):
    if output.exists():
        raise ValueError('Preparation output must be new')
    raw = A.file_bytes(config_path); c = json.loads(raw)
    if c.get('schema') != 'cqc.pass15.root-closed-archive-inputs/1' or c.get('closed') is not True or c.get('authorizedByRoot') is not True:
        raise ValueError('Root explicit closed input schema/authorization required')
    if c.get('expectedPublishedPriorCommit', BASE) != BASE:
        raise ValueError('Pinned prior publication is Git752')
    roots = [Path(p).resolve(strict=True) for p in c['allowedRoots']]
    if not roots or any(str(p) in {'/', '/tmp', '/workspace', str(REPO), str(REPO / 'public')} for p in roots):
        raise ValueError('Explicit bounded producer roots required')
    if output.resolve().is_relative_to(REPO) or any(output.resolve().is_relative_to(p) for p in roots):
        raise ValueError('Preparation output cannot be in a project/source root')
    observed, seen = [], set()
    for row in c['files']:
        if row.get('producerState') != 'closed':
            raise ValueError('No open producer can be inferred closed')
        p = A.approved_source(row['path'], roots); b = A.file_bytes(p)
        if p in seen or len(b) != row['bytes'] or A.sha(b) != row['sha256']:
            raise ValueError('Duplicate or changed explicit source: ' + str(p))
        if len(b) > 32 * 1024 * 1024:
            raise ValueError('One explicit source exceeds32MiB')
        seen.add(p); observed.append({**row, 'path': str(p)})
    if not observed or len(observed) > 10000:
        raise ValueError('Bounded nonempty explicit source list required')
    evidence = c.get('sourceClosureEvidence', [])
    if not evidence:
        raise ValueError('Exact source closure receipt evidence required')
    for row in evidence:
        p = A.approved_source(row['path'], roots); b = A.file_bytes(p)
        if row.get('closed') is not True or len(b) != row['bytes'] or A.sha(b) != row['sha256']:
            raise ValueError('Root-pinned closure evidence differs')
    tree = git_tree(); catalog, indexpins, cache, historical14 = prior_catalog(tree)
    previous15 = 0; extra_prior_pins = []
    for row in c.get('additionalClosedPass15Indexes', []):
        p = Path(row['path']).resolve(strict=True); b = A.file_bytes(p)
        idx = json.loads(b)
        if row.get('closed') is not True or len(b) != row['bytes'] or A.sha(b) != row['sha256'] or idx.get('schema') != 'cqc.pass15.lossless-reconstruction-index/1' or not idx.get('closed') or not idx.get('actualRun'):
            raise ValueError('Additional PASS15 prior index must be explicit closed actual and pinned')
        found, pins = A.prior_objects([str(p)]); catalog.update(found)
        extra_prior_pins.extend(pins); previous15 += idx['logicalBytes']
    cumulative15 = previous15 + sum(x['bytes'] for x in observed)
    cap = min(c.get('maximumLogicalInputBytes', 128 * 1024 * 1024), 128 * 1024 * 1024)
    if cumulative15 > cap:
        raise ValueError('Cumulative new PASS15 batches exceed<=128MiB Root budget')
    bysha = {r['sha256']: r for r in observed}
    reused, new = [], []
    for digest, row in bysha.items():
        loc = catalog.get(digest)
        if not loc:
            new.append({'sha256': digest, 'bytes': row['bytes']}); continue
        for member in loc.get('members', [loc]):
            rel = member.get('archiveRepositoryPath')
            if rel in tree:
                checked_published(rel, tree, cache)
        b, verified = A.read_object(loc)
        if b != A.file_bytes(Path(row['path'])):
            raise ValueError('Prior reused object is not exact current closed source')
        reused.append({'sha256': digest, 'bytes': len(b), 'storageKind': 'existing-closed-member', 'location': verified})
    bins = A.pack_objects(new)
    output.mkdir(parents=True)
    priorpath = output / 'PORTABLE_PUBLISHED_PRIOR_REUSE_INDEX_V1.json'
    A.dump(priorpath, {'schema': 'cqc.pass15.selected-prior-reuse-index/1', 'actualRun': True, 'closed': True, 'objects': reused, 'publishedPriorGitCommit': BASE, 'publishedIndexPins': indexpins, 'publishedArchivePinsActuallyReused': [p for p in cache.values() if p['repositoryPath'].endswith('.zip')], 'additionalClosedPass15IndexPins': extra_prior_pins, 'noPriorZIPCopiedOrRecompressed': True})
    spec = {'schema': 'cqc.pass15.closed-lossless-source-spec/1', 'closed': True, 'allowedRoots': c['allowedRoots'], 'priorIndexes': [str(priorpath)], 'files': observed, 'maximumLogicalInputBytes': cap, 'archivePrefix': c.get('archivePrefix', 'pass15-lossless'), 'portableRepositoryArchiveBase': 'docs/cqc-reprise/pass15/lossless', 'logicalSymlinkAliases': c.get('logicalSymlinkAliases', []), 'externalNativeToolAliases': c.get('externalNativeToolAliases', []), 'sourceClosureEvidence': evidence, 'historicalSourceReferences': c.get('historicalSourceReferences', []), 'qualificationNotes': c.get('qualificationNotes', []), 'absolute1To1Certified': False, 'publishedPriorGitCommit': BASE, 'cumulativeNewPASS15LogicalBytes': cumulative15, 'parentPASS14HistoricalLogicalBytesReferencedNotCopied': historical14}
    spath = output / 'CLOSED_SOURCE_SPEC_PASS15_V1.json'; A.dump(spath, spec)
    result = {'schema': 'cqc.pass15.closed-lossless-archive-plan/1', 'closed': True, 'actualArchivesCreated': False, 'rootClosedInput': {'path': str(config_path), 'bytes': len(raw), 'sha256': A.sha(raw)}, 'closedSourceSpec': {'path': str(spath), 'bytes': spath.stat().st_size, 'sha256': A.sha(spath.read_bytes())}, 'portablePriorIndex': {'path': str(priorpath), 'bytes': priorpath.stat().st_size, 'sha256': A.sha(priorpath.read_bytes())}, 'logicalFiles': len(observed), 'logicalBytes': sum(x['bytes'] for x in observed), 'uniqueObjects': len(bysha), 'reusedObjects': len(reused), 'reusedBytes': sum(o['bytes'] for o in reused), 'newObjects': len(new), 'newObjectBytes': sum(o['bytes'] for o in new), 'newVolumes': len(bins), 'predictedStoredZIPBytes': sum(v['exactZIPBytes'] for v in bins), 'volumeMaximumBytes': A.LIMIT, 'newVolumePlan': bins, 'cumulativeNewPASS15LogicalBytes': cumulative15, 'newPASS15LogicalCap': cap, 'parentPASS14HistoricalLogicalBytesReferencedNotCopied': historical14, 'safeApproximateTMPPeakAdditionalBytes': sum(o['bytes'] for o in new) + sum(v['exactZIPBytes'] for v in bins) + 2 * 1024 * 1024, 'approximateWorkspaceArchiveAndGitAdditionalBytes': 2 * sum(v['exactZIPBytes'] for v in bins) + 2 * 1024 * 1024, 'rootGONotManufactured': True, 'noProducerTraversalOrFreeze': True, 'noSnapshotOrDependencyCopy': True, 'noExistingArchiveCopyOrRecompression': True, 'archiveAfterSeparateExactRootGOOnly': True, 'qualificationNotes': c.get('qualificationNotes', [])}
    result['safePeakBytesOnOutputFilesystemBeforeGit'] = result['safeApproximateTMPPeakAdditionalBytes']
    result['outputFilesystemQualification'] = 'Staging is under archive output.parent, so direct S/docs output uses workspace for this peak; an output in /tmp uses /tmp. Prior ZIPs are never copied.'
    A.dump(output / 'CLOSED_ARCHIVE_PLAN_PASS15_V1.json', result)
    return result

def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('--root-closed-inputs', required=True, type=Path)
    p.add_argument('--output', required=True, type=Path)
    a = p.parse_args(); r = prepare(a.root_closed_inputs, a.output)
    print(json.dumps({k: r[k] for k in ['logicalFiles', 'logicalBytes', 'reusedObjects', 'newObjectBytes', 'newVolumes', 'predictedStoredZIPBytes', 'safeApproximateTMPPeakAdditionalBytes', 'approximateWorkspaceArchiveAndGitAdditionalBytes']}, indent=2))

if __name__ == '__main__':
    main()
