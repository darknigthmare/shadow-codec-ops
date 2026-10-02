#!/usr/bin/env python3
"""Seal the ROOT-created commit against its closed archive plan; no Git/API writes."""
from pathlib import Path
import argparse
import json

import publish_verified_offline_prefetch as pub

T = Path('/workspace/cqc-pass9-offline-prefetch-publication')


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--archive-plan', type=Path, required=True)
    parser.add_argument('--archive-plan-sha256', required=True)
    parser.add_argument('--local-commit', required=True)
    parser.add_argument('--root-confirmed', action='store_true')
    parser.add_argument('--output', type=Path, default=T / 'ROOT_CANDIDATE_QA_FACTS.json')
    args = parser.parse_args()
    pub.require(args.root_confirmed, 'ROOT confirmation of exact local commit required')
    raw = args.archive_plan.read_bytes()
    pub.require(pub.sha256(raw) == args.archive_plan_sha256, 'Closed archive plan changed')
    plan = json.loads(raw)
    pub.require(plan['schema'] == 'cqc.offline-prefetch.closed-archive-plan/1'
                and plan['status'] == 'closed-after-root-local-QA' and plan['expectedParent'] == pub.PARENT,
                'Wrong closed archive plan')
    commit = args.local_commit
    pub.require(pub.core.SHA1.fullmatch(commit) and pub.git_text('rev-parse', 'HEAD') == commit
                and pub.git_text('branch', '--show-current') == pub.BRANCH
                and not pub.git('status', '--porcelain=v1').strip(), 'Exact clean ROOT candidate required')
    pub.require(pub.git_text('rev-parse', commit + '^') == pub.PARENT, 'Wrong candidate parent')
    current_heads = dict(line.split(' ', 1) for line in pub.git_text('for-each-ref', '--format=%(refname) %(objectname)', 'refs/heads/').splitlines())
    for ref, digest in plan['historicalGitHeadsBeforeRootCommit'].items():
        if ref != 'refs/heads/' + pub.BRANCH:
            pub.require(current_heads.get(ref) == digest, 'Historical branch changed since ROOT archive plan: ' + ref)
    base = pub.local_files(pub.PARENT)
    candidate = pub.local_files(commit)
    pub.require(set(base) <= set(candidate), 'Historical path deletion forbidden')
    changes = [candidate[p] for p in sorted(candidate) if p not in base or candidate[p] != base[p]]
    tree = pub.git_text('rev-parse', commit + '^{tree}')
    _, requested_raw = pub.commit_request(commit, tree)
    pub.require(pub.object_sha('commit', requested_raw) == commit, 'Exact UTC commit request required')
    facts = {'schema': pub.FACTS_SCHEMA, 'status': 'passed', 'confirmedByRoot': True,
             'sourceState': 'frozen', 'localCommit': commit, 'localTree': tree,
             'expectedParent': pub.PARENT, 'sourceSHA256': pub.AFTER_SHA, 'sourceBytes': 7876,
             'sourceGitBlobSHA1': pub.AFTER_BLOB, 'historicalPathDeletions': 0,
             'CQCSubtreeUnchanged': pub.CQC_TREE, 'productionFixAlreadyVerified': False,
             'archivePlan': {'path': str(args.archive_plan), 'bytes': len(raw),
                             'sha256': args.archive_plan_sha256},
             'expectedNewDocumentationPaths': [r['targetPath'] for r in plan['files']],
             'documentationPins': [{k: r[k] for k in ('targetPath', 'bytes', 'sha256', 'gitBlobSHA1', 'mode')}
                                    for r in plan['files']],
             'commitMessage': pub.git('cat-file', 'commit', commit).split(b'\n\n', 1)[1].decode(),
             'qualifiedPriorProductionErrorPreserved': True,
             'sourceAttemptsPreserved': ['published7d-before', 'catch-only511', 'offline-guard-eb5-final'],
             'newActualFinalLocalQA': plan['closedLocalQA'],
             'rootActualLocalPhysicalReview': plan['rootLocalPhysicalReview']}
    pub.validate_pass9_scope(changes, base, facts)
    pub.validate_candidate_configuration(commit, base, candidate, facts)
    pub.validate_runtime_graph(commit, base, candidate, facts)
    pub.validate_catalog_candidate(commit, base, candidate, facts)
    pub.require(args.output.is_absolute() and args.output.is_relative_to(T)
                and args.output.resolve() == args.output and not args.output.exists(), 'Fresh isolated output required')
    with args.output.open('x') as stream:
        json.dump(facts, stream, indent=2); stream.write('\n')
    pub.read_qa_facts(args.output, commit, tree)
    print(json.dumps({'status': 'root-candidate-facts-closed', 'path': str(args.output),
                      'sha256': pub.sha256(args.output.read_bytes()), 'localCommit': commit,
                      'localTree': tree, 'changes': len(changes), 'sourceModifications': 1,
                      'newDocumentationPaths': len(plan['files']), 'GitMutations': 0, 'apiCalls': 0}))


if __name__ == '__main__':
    main()
