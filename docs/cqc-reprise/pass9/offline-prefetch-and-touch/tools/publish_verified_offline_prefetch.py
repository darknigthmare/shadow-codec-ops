#!/usr/bin/env python3
"""Root-owned publication: one exact App change and new closed proof documents.

The pinned PASS9 publisher supplies its existing REST retries, immutable blob
verification, exact Git tree/commit construction and non-forcing ref update.
Only this isolated module instance receives the new parent/scope guards.
Default mode makes no API requests or Git object/ref/index writes.
"""
from pathlib import Path
import hashlib
import importlib.util
import json
import os

os.environ['GIT_OPTIONAL_LOCKS'] = '0'
os.environ['GIT_NO_LAZY_FETCH'] = '1'
BASE = Path('/workspace/cqc-pass9-publication-preparation/publish_verified_shadow_cqc_pass9.py')
BASE_SHA = '508ef68e220b3af471b5fd80a350a6557e3b8d84a5602a39e21bb3219cd1f723'
assert hashlib.sha256(BASE.read_bytes()).hexdigest() == BASE_SHA, 'Closed REST helper changed'
spec = importlib.util.spec_from_file_location('isolated_offline_prefetch_rest_core', BASE)
core = importlib.util.module_from_spec(spec)
spec.loader.exec_module(core)

PARENT = '7d4719d432cfe82087833f49df02b27fa2f3155f'
PARENT_TREE = '62bf00d481bed6cfd5b4dc66c528a197ca895da1'
CQC_TREE = '14271e4f8141429b8035575116883fca50925057'
MAIN = '9a37e0ca975021df2eb6db7fd28fe4dcd9a2550c'
DOC_PREFIX = 'docs/cqc-reprise/pass9/offline-prefetch-and-touch/'
APP = 'src/app/App.tsx'
BEFORE_SHA = 'ea4d24ab423d3026718708f5f7501538832cc2de8108e0024e74780959267300'
AFTER_SHA = 'eb5cca5cf44634733c85d451eca474e2b5450b06eb132ccaaef45d710869b911'
AFTER_BLOB = '782980aa50bc15581b02c91cdb18b1f6b2ccd785'
PROOFS = Path('/workspace/github-pass9-offline-prefetch-publication')
FACTS_SCHEMA = 'cqc.github.offline-prefetch-qa-facts/1'
core.PARENT = PARENT
core.PROOFS = PROOFS
core.DOC_PREFIX = DOC_PREFIX

require = core.require
git = core.git
git_text = core.git_text
api = core.api
announce = core.announce
object_sha = core.object_sha
sha256 = core.sha256
_base_save_exact = core.save_exact
SOURCE = core.SOURCE
REPOSITORY = core.REPOSITORY
BRANCH = core.BRANCH
GAMES = core.GAMES
_base_commit_request = core.commit_request
reconstruct_remote_commit = core.reconstruct_remote_commit
verify_remote_commit = core.verify_remote_commit
local_files = core.local_files


def commit_request(local_commit, local_tree):
    payload, raw = _base_commit_request(local_commit, local_tree)
    require(object_sha('commit', raw) == local_commit,
            'ROOT local commit must retain exact UTC identities and LF bytes in the REST request')
    return payload, raw


def save_exact(path, value):
    if isinstance(value, dict) and value.get('schema') == 'cqc.github.pass9-publication/1' \
            and value.get('status') == 'published':
        value['schema'] = 'cqc.github.offline-prefetch-publication/1'
        value['evidence'] = ('The exact published mobile-controls commit7d4719d4 is the sole parent. '
                             'The complete remote tree equals the frozen local candidate; only the '
                             'approved optional-prefetch App change and new closed evidence archives '
                             'were added, with the CQC subtree and every historical path preserved.')
    return _base_save_exact(path, value)


core.commit_request = commit_request
core.save_exact = save_exact


def regular_pin(row):
    path = Path(row.get('path', ''))
    require(path.is_absolute() and path.is_file() and not path.is_symlink()
            and path.resolve() == path, 'Closed regular proof path required')
    raw = path.read_bytes()
    require(type(row.get('bytes')) is int and len(raw) == row['bytes']
            and core.SHA256.fullmatch(row.get('sha256', ''))
            and sha256(raw) == row['sha256'], 'Closed proof bytes changed: ' + str(path))
    return raw


def expected_app(before):
    old = (b'function prefetchRoute(route: AppRoute): void {\n'
           b'  void routeLoaders[route]?.();\n}\n')
    new = (b'function prefetchRoute(route: AppRoute): void {\n'
           b'  if (!navigator.onLine) return;\n'
           b'  // Prefetch is optional; navigation errors are handled by AppErrorBoundary.\n'
           b'  void routeLoaders[route]?.().catch(() => {});\n}\n')
    require(before.count(old) == 1, 'Exact parent prefetch function required')
    return before.replace(old, new, 1)


def read_qa_facts(path, local_commit, local_tree):
    raw = regular_pin({'path': str(path), 'bytes': path.stat().st_size,
                       'sha256': sha256(path.read_bytes())})
    facts = json.loads(raw)
    require(facts.get('schema') == FACTS_SCHEMA and facts.get('status') == 'passed'
            and facts.get('confirmedByRoot') is True and facts.get('sourceState') == 'frozen',
            'ROOT must close the exact offline-prefetch candidate')
    require(facts.get('localCommit') == local_commit and facts.get('localTree') == local_tree
            and facts.get('expectedParent') == PARENT, 'Wrong closed candidate commit/tree/parent')
    require(facts.get('sourceSHA256') == AFTER_SHA and facts.get('sourceBytes') == 7876
            and facts.get('sourceGitBlobSHA1') == AFTER_BLOB, 'Wrong final App source')
    require(facts.get('historicalPathDeletions') == 0 and facts.get('CQCSubtreeUnchanged') == CQC_TREE
            and facts.get('productionFixAlreadyVerified') is False,
            'History/runtime must stay preserved; local QA cannot certify the new production')
    plan_raw = regular_pin(facts.get('archivePlan', {}))
    plan = json.loads(plan_raw)
    require(plan.get('schema') == 'cqc.offline-prefetch.closed-archive-plan/1'
            and plan.get('status') == 'closed-after-root-local-QA'
            and plan.get('expectedParent') == PARENT and plan.get('sourceSHA256') == AFTER_SHA,
            'Exact closed archive plan required')
    expected_docs = [r['targetPath'] for r in plan['files']]
    require(expected_docs == facts.get('expectedNewDocumentationPaths')
            and len(expected_docs) == len(set(expected_docs)) and expected_docs,
            'Exact new documentation path set required')
    require(facts.get('documentationPins') == [{k: r[k] for k in
            ('targetPath', 'bytes', 'sha256', 'gitBlobSHA1', 'mode')} for r in plan['files']],
            'Candidate documentation byte pins must match the closed plan')
    local = json.loads(regular_pin(plan['closedLocalQA']))
    require(local.get('status') == 'passed', 'Final local browser proof did not pass')
    require(plan.get('rootLocalQAConfirmed') is True,
            'ROOT has not approved the actual final-source local proof')
    regular_pin(plan['rootPhysicalProduction7d'])
    require(plan.get('retainedProduction7dOfflineErrorQualified') is True,
            'Old production error must remain qualified in retained evidence')
    return facts, raw


def validate_pass9_scope(changes, base, facts):
    pins = {r['targetPath']: r for r in facts['documentationPins']}
    require(len(pins) == len(facts['documentationPins']), 'Duplicate proof target')
    names = {r['path'] for r in changes}
    require(len(names) == len(changes) and names == set(pins) | {APP},
            'Only one exact App modification and exact new archive paths are allowed')
    for row in changes:
        name = core.repository_path(row['path'])
        require(row.get('mode') in ('100644', '100755') and row.get('type') == 'blob',
                'Only regular Git blobs allowed')
        if name == APP:
            require(name in base and row['sha'] == AFTER_BLOB and row['mode'] == '100644',
                    'Wrong App byte/mode change')
        else:
            pin = pins[name]
            require(name.startswith(DOC_PREFIX) and name not in base
                    and row['sha'] == pin['gitBlobSHA1'] and row['mode'] == pin['mode'],
                    'Historical edit or undocumented byte change')


def validate_candidate_configuration(local_commit, base, candidate, facts):
    require(base[APP]['mode'] == candidate[APP]['mode'] == '100644'
            and base[APP]['type'] == candidate[APP]['type'] == 'blob', 'App must stay regular')
    before = git('show', PARENT + ':' + APP)
    after = git('show', local_commit + ':' + APP)
    require(len(before) == 7749 and sha256(before) == BEFORE_SHA,
            'The exact published App parent must be preserved')
    require(len(after) == 7876 and sha256(after) == AFTER_SHA
            and object_sha('blob', after) == AFTER_BLOB
            and after == expected_app(before), 'Only offline guard and optional prefetch catch may change')
    for row in facts['documentationPins']:
        name = row['targetPath']
        raw = core.bounded_candidate_blob(local_commit, name, candidate[name],
                                         expected_bytes=row['bytes'], maximum_bytes=8 * 1024 * 1024)
        require(sha256(raw) == row['sha256'] and object_sha('blob', raw) == row['gitBlobSHA1'],
                'Committed new archive bytes differ from the reviewed plan')


def validate_runtime_graph(local_commit, base, candidate, facts):
    require(git_text('rev-parse', PARENT + '^{tree}') == PARENT_TREE,
            'Published parent tree changed')
    require(git_text('rev-parse', PARENT + ':public/cqc') == CQC_TREE
            and git_text('rev-parse', local_commit + ':public/cqc') == CQC_TREE,
            'The CQC subtree must remain byte-identical')
    require(git_text('rev-parse', 'refs/heads/main') == MAIN, 'Main must remain unchanged')


def validate_catalog_candidate(local_commit, base, candidate, facts):
    require(set(base) <= set(candidate), 'Historical paths may not be deleted')
    # Every new byte is reviewed archive evidence; native/catalog data are inherited.
    require(not any(p.startswith('public/cqc/') and candidate[p] != base.get(p)
                    for p in candidate), 'No CQC/catalog/image change permitted')


# Reuse the closed REST execution boundary without modifying its source file.
core.read_qa_facts = read_qa_facts
core.validate_pass9_scope = validate_pass9_scope
core.validate_candidate_configuration = validate_candidate_configuration
core.validate_runtime_graph = validate_runtime_graph
core.validate_catalog_candidate = validate_catalog_candidate
assert_frozen = core.assert_frozen


if __name__ == '__main__':
    core.main()
