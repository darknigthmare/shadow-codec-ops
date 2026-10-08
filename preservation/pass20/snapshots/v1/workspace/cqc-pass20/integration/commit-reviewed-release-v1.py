"""Commit the reviewed PASS20 files without disturbing older missing tree objects."""
from pathlib import Path
import hashlib, json, os, subprocess

APP = Path('/tmp/cqc-pass19-application')
OUT = Path('/workspace/cqc-pass20/integration')
PARENT = 'ecc1061ff7986ddc3a08370f7df61dae31e0149b'
ENV = dict(os.environ, GIT_OBJECT_DIRECTORY='/workspace/cqc-pass19-git-object-store')

def git(*args, **kw):
    return subprocess.check_output(['git', *args], cwd=APP, env=ENV, **kw)

def files(ref):
    result = {}
    for line in git('ls-tree', '-rz', ref).split(b'\0'):
        if not line:
            continue
        meta, name = line.split(b'\t', 1)
        mode, kind, sha = meta.decode().split()
        name = name.decode()
        result[name] = {'path': name, 'mode': mode, 'type': kind, 'sha': sha}
    return result

facts = json.loads((OUT / 'RELEASE_FACTS_FROZEN_ACTUAL_V1.json').read_bytes())
assert facts['status'] == 'passed' and facts['confirmedByRoot'] is True
assert facts['sourceState'] == 'frozen' and facts['parent'] == PARENT
assert git('rev-parse', 'HEAD').decode().strip() == PARENT
allowed = set(facts['reviewedChangedPaths'])
assert allowed and all(p.startswith(('public/cqc/', 'docs/cqc-reprise/pass20/')) for p in allowed)
assert set(git('diff', '--cached', '--name-only').decode().splitlines()) == allowed
assert not git('diff', '--name-only', '--', *sorted(allowed)).strip()
for proof in facts['reports']:
    raw = Path(proof['path']).read_bytes()
    assert hashlib.sha256(raw).hexdigest() == proof['sha256']
    assert json.loads(raw)['status'] == 'passed'
manifest = APP / 'public/cqc/runtime-manifest.json'
assert hashlib.sha256(manifest.read_bytes()).hexdigest() == facts['runtimeManifestSHA256']
base = files(PARENT)
tree = git('write-tree', '--missing-ok').decode().strip()
candidate = files(tree)
assert set(base) <= set(candidate)
changes = [candidate[name] for name in sorted(candidate) if candidate[name] != base.get(name)]
assert {row['path'] for row in changes} == allowed
for row in changes:
    source = APP / row['path']
    assert source.is_file() and not source.is_symlink() and row['mode'] == '100644'
    raw = source.read_bytes()
    assert hashlib.sha1(b'blob ' + str(len(raw)).encode() + b'\0' + raw).hexdigest() == row['sha']
    assert git('cat-file', 'blob', row['sha']) == raw
objects = sorted({r['sha'] for r in candidate.values()})
check = git('cat-file', '--batch-check=%(objectname) %(objecttype)', input=('\n'.join(objects)+'\n').encode()).decode()
missing = {line.split()[0] for line in check.splitlines() if line.endswith(' missing')}
assert missing <= {row['sha'] for row in base.values()}
message = OUT / 'LOCAL_COMMIT_MESSAGE_V1.txt'
assert message.is_file()
commit = git('commit-tree', tree, '-p', PARENT, '-F', str(message)).decode().strip()
git('update-ref', 'refs/heads/reprise/2026-10-02', commit, PARENT)
assert not git('status', '--porcelain=v1', '-uno').strip()
receipt = {'schema':'cqc.pass20.reviewed-local-release/1', 'status':'passed', 'parent':PARENT,
           'commit':commit, 'tree':tree, 'changes':changes, 'deletedPaths':[],
           'allChangedBlobBytesVerified':True, 'historicalMissingObjects':len(missing),
           'allMissingObjectsUnchangedParent':True}
(OUT / 'LOCAL_RELEASE_COMMIT_ACTUAL_V1.json').write_text(json.dumps(receipt,indent=2)+'\n')
print(json.dumps({'status':'passed','commit':commit,'tree':tree,'changes':len(changes)}))
