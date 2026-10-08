"""Publish exactly the frozen reviewed release. All ref updates are non-forced."""
if not __debug__:
    raise SystemExit('Publication guards require normal Python.')
from pathlib import Path
import argparse, base64, hashlib, importlib.util, json

APP = Path('/tmp/cqc-pass19-application')
OUT = Path('/workspace/cqc-pass20/github')
PARENT = 'ecc1061ff7986ddc3a08370f7df61dae31e0149b'
MAIN = '9a37e0ca975021df2eb6db7fd28fe4dcd9a2550c'
BRANCH = 'reprise/2026-10-02'
spec = importlib.util.spec_from_file_location('trusted_transport', '/workspace/cqc-pass9-publication-preparation/publish_verified_shadow_cqc_pass9.py')
t = importlib.util.module_from_spec(spec)
spec.loader.exec_module(t)
t.SOURCE, t.PARENT = APP, PARENT
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--execute', action='store_true')
args = parser.parse_args()
receipt = json.loads(Path('/workspace/cqc-pass20/integration/LOCAL_RELEASE_COMMIT_ACTUAL_V1.json').read_bytes())
facts_path = Path('/workspace/cqc-pass20/integration/RELEASE_FACTS_FROZEN_ACTUAL_V1.json')
facts = json.loads(facts_path.read_bytes())
assert receipt['status'] == facts['status'] == 'passed' and facts['confirmedByRoot'] is True
assert receipt['parent'] == facts['parent'] == PARENT and facts['sourceState'] == 'frozen'
commit, tree = receipt['commit'], receipt['tree']
assert t.git_text('rev-parse', 'HEAD') == commit and t.git_text('rev-parse', 'HEAD^') == PARENT
assert not t.git('status', '--porcelain=v1', '-uno').strip()
assert hashlib.sha256((APP / 'public/cqc/runtime-manifest.json').read_bytes()).hexdigest() == facts['runtimeManifestSHA256']
for pin in facts['reports']:
    raw = Path(pin['path']).read_bytes()
    assert hashlib.sha256(raw).hexdigest() == pin['sha256'] and json.loads(raw)['status'] == 'passed'
base, candidate = t.local_files(PARENT), t.local_files(commit)
assert set(base) <= set(candidate)
changes = [candidate[p] for p in sorted(candidate) if candidate[p] != base.get(p)]
assert changes == receipt['changes'] and {r['path'] for r in changes} == set(facts['reviewedChangedPaths'])
assert all(r['path'].startswith(('public/cqc/', 'docs/cqc-reprise/pass20/')) for r in changes)
raws = {}
for row in changes:
    source = APP / row['path']
    assert source.is_file() and not source.is_symlink() and row['mode'] == '100644'
    raw = source.read_bytes()
    assert len(raw) < 100 * 1024 * 1024 and t.object_sha('blob', raw) == row['sha']
    raws[row['sha']] = (row['path'], raw)
payload, _ = t.commit_request(commit, tree)
plan = {'schema':'cqc.pass20.reviewed-github-release/1','status':'verified','commit':commit,'tree':tree,
        'parent':PARENT,'branch':BRANCH,'mainUnchanged':MAIN,'changes':changes,'deletedPaths':[],
        'qaFactsSHA256':hashlib.sha256(facts_path.read_bytes()).hexdigest(),'force':False}
t.save_exact(OUT / 'PUBLICATION_PLAN_ACTUAL_V1.json', plan)
print(json.dumps({'stage':'preflight-passed','changes':len(changes),'uniqueBlobs':len(raws),'execute':args.execute}), flush=True)
if not args.execute:
    raise SystemExit(0)
assert t.api('GET','git/ref/heads/main')['object']['sha'] == MAIN
current = t.api('GET','git/ref/heads/'+BRANCH)['object']['sha']
assert current in {PARENT, commit}
ledger = OUT / 'VERIFIED_BLOBS_ACTUAL_V1.jsonl'
previous = [json.loads(line) for line in ledger.read_text().splitlines()] if ledger.exists() else []
done = {r['gitBlobSHA1'] for r in previous}
assert done <= set(raws)
for oid, (name, raw) in raws.items():
    if oid in done:
        assert any(r['gitBlobSHA1']==oid and r['bytes']==len(raw) and r['sha256']==hashlib.sha256(raw).hexdigest() for r in previous)
        continue
    response = t.api('POST','git/blobs',{'content':base64.b64encode(raw).decode(),'encoding':'base64'})
    assert response['sha'] == oid
    observed = t.api('GET','git/blobs/'+oid)
    assert base64.b64decode(observed['content']) == raw
    record = {'path':name,'gitBlobSHA1':oid,'bytes':len(raw),'sha256':hashlib.sha256(raw).hexdigest(),'remoteByteVerified':True}
    with ledger.open('a') as handle:
        handle.write(json.dumps(record)+'\n')
        handle.flush()
    print(json.dumps({'stage':'verified-blob','path':name,'bytes':len(raw)}), flush=True)
parenttree = t.git_text('rev-parse', PARENT+'^{tree}')
assert t.api('POST','git/trees',{'base_tree':parenttree,'tree':changes})['sha'] == tree
observed = t.api('GET','git/trees/'+tree+'?recursive=1')
assert not observed.get('truncated')
remote = {r['path']:{k:r[k] for k in ('path','mode','type','sha')} for r in observed['tree'] if r['type']!='tree'}
assert remote == candidate
t.save_exact(OUT / 'COMMIT_REQUEST_ACTUAL_V1.json', payload)
created = t.api('POST','git/commits',payload)
t.verify_remote_commit(created, commit, tree, payload)
t.save_exact(OUT / 'CREATED_COMMIT_ACTUAL_V1.json', created)
current = t.api('GET','git/ref/heads/'+BRANCH)['object']['sha']
assert current in {PARENT, commit}
if current == PARENT:
    t.api('PATCH','git/refs/heads/'+BRANCH,{'sha':commit,'force':False})
assert t.api('GET','git/ref/heads/'+BRANCH)['object']['sha'] == commit
assert t.api('GET','git/ref/heads/main')['object']['sha'] == MAIN
result = {**plan,'status':'published','verifiedUniqueBlobs':len(raws),'preservedParentPaths':len(base),
          'newCompletePaths':len(candidate),'completeRemoteTreeVerified':True,
          'commitURL':'https://github.com/darknigthmare/shadow-codec-ops/commit/'+commit}
t.save_exact(OUT / 'PUBLICATION_RESULT_ACTUAL_V1.json', result)
print(json.dumps({'stage':'published','commit':commit,'tree':tree,'files':len(candidate)}), flush=True)
