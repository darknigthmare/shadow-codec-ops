#!/usr/bin/env python3
"""Import the already verified REST commit locally; default mode changes nothing."""
from __future__ import annotations

import argparse
import json
from pathlib import Path
import subprocess

from publish_verified_shadow_cqc_pass7_publication_proofs import (
    api, announce, BRANCH, commit_request, git, git_text, GAMES, object_sha,
    PARENT, PROOFS, REPOSITORY, require, save_exact, sha256, SOURCE,
    reconstruct_remote_commit, verify_remote_commit,
)

CHECKPOINT = 'refs/heads/reprise/2026-10-02-pass7-publication-checkpoint'
ACTIVE_REF = 'refs/heads/' + BRANCH
TRACKING_REF = 'refs/remotes/origin/' + BRANCH


def ref_value(name):
    response = subprocess.run(['git', 'rev-parse', '--verify', name], cwd=SOURCE,
                              capture_output=True, text=True)
    return response.stdout.strip() if response.returncode == 0 else None


def import_commit(execute):
    result = json.loads((PROOFS / 'publication-results.json').read_text())
    plan = json.loads((PROOFS / 'publication-plan.json').read_text())
    raw = (PROOFS / 'remote-commit.raw').read_bytes()
    requested = json.loads((PROOFS / 'commit-request.json').read_text())
    require(result.get('schema') == 'cqc.github.pass7-publication-proofs-publication/1'
            and result.get('status') == 'published', 'PASS7 publication is not verified')
    require(result['repository'] == REPOSITORY and result['branch'] == BRANCH
            and result['remoteParentPreserved'] == PARENT and result['force'] is False,
            'Unexpected publication target or parent')
    local = result['localSourceCommit']
    remote = result['commit']
    tree = result['sourceTreeByteExact']
    require(plan['localCommit'] == local and plan['localTree'] == tree,
            'Publication plan/results mismatch')
    require(object_sha('commit', raw) == remote, 'Published raw commit bytes differ')
    expected_request, expected_raw = commit_request(local, tree)
    require(requested == expected_request
            and plan['requestedCommitRawCandidateSHA'] == object_sha('commit', expected_raw),
            'Remote commit request does not match the preserved local source')
    require(git_text('branch', '--show-current') == BRANCH, 'Wrong current local branch')
    require(not git('status', '--porcelain=v1').strip(), 'Local worktree is not clean')
    head = git_text('rev-parse', 'HEAD')
    require(head in (local, remote), 'Local HEAD changed since publication')
    require(git_text('rev-parse', 'HEAD^{tree}') == tree, 'Current local tree differs')
    checkpoint = ref_value(CHECKPOINT)
    require(checkpoint in (None, local), 'Checkpoint branch already names another commit')
    tracking = ref_value(TRACKING_REF)
    require(tracking in (None, PARENT, remote), 'Unexpected local remote-tracking ref')
    before = dict(line.split(' ', 1) for line in
                  git_text('for-each-ref', '--format=%(refname) %(objectname)', 'refs/heads/').splitlines())
    import_plan = {'schema': 'cqc.github.pass7-publication-proofs-local-import-plan/1',
                   'localSourceCommit': local, 'remoteCommit': remote, 'tree': tree,
                   'activeBranch': BRANCH, 'checkpointRef': CHECKPOINT,
                   'rawCommitSHA256': sha256(raw), 'worktreeContentChanges': 0,
                   'games': GAMES}
    if not execute:
        announce({'status': 'read-only-ready', 'remoteRequests': 0,
                  'gitMutations': 0, 'plan': import_plan})
        return

    require(api('GET', 'git/ref/heads/' + BRANCH)['object']['sha'] == remote,
            'Remote branch changed after PASS7 publication')
    metadata = api('GET', 'git/commits/' + remote)
    verify_remote_commit(metadata, remote, tree, requested)
    require(reconstruct_remote_commit(metadata, tree, requested) == raw,
            'Remote exact commit bytes differ from publication proof')
    # Import bytes only after remote verification; keep the native commit reachable.
    written = subprocess.check_output(['git', 'hash-object', '-t', 'commit', '-w', '--stdin'],
                                      cwd=SOURCE, input=raw).decode().strip()
    require(written == remote, 'Imported Git commit object SHA differs')
    operations = ['start']
    if checkpoint is None:
        operations.append('create ' + CHECKPOINT + ' ' + local)
    if head != remote:
        operations.append('update ' + ACTIVE_REF + ' ' + remote + ' ' + local)
    if tracking != remote:
        if tracking is None:
            operations.append('create ' + TRACKING_REF + ' ' + remote)
        else:
            operations.append('update ' + TRACKING_REF + ' ' + remote + ' ' + tracking)
    operations += ['prepare', 'commit']
    subprocess.run(['git', 'update-ref', '-m', 'Import verified PASS7 GitHub commit', '--stdin'], cwd=SOURCE,
                   input='\n'.join(operations) + '\n', text=True, check=True,
                   capture_output=True)
    require(git_text('rev-parse', 'HEAD') == remote and ref_value(CHECKPOINT) == local
            and ref_value(TRACKING_REF) == remote, 'Local import refs differ')
    require(git_text('rev-parse', 'HEAD^{tree}') == tree
            and not git('status', '--porcelain=v1').strip(), 'Local runtime changed during import')
    after = dict(line.split(' ', 1) for line in
                 git_text('for-each-ref', '--format=%(refname) %(objectname)', 'refs/heads/').splitlines())
    preserved = {ref: digest for ref, digest in before.items()
                 if ref not in (ACTIVE_REF, CHECKPOINT)}
    require(all(after.get(ref) == digest for ref, digest in preserved.items()),
            'An existing historical local branch changed')
    imported = {'schema': 'cqc.github.pass7-publication-proofs-local-import/1', 'status': 'passed',
                'remoteCommit': remote, 'localSourceCommitPreserved': local,
                'checkpointRef': CHECKPOINT, 'sourceTreeByteExact': tree,
                'historicalBranchesPreserved': preserved, 'worktreeContentChanges': 0,
                'remoteRefNotMutated': True}
    save_exact(PROOFS / 'local-import-results.json', imported)
    announce(imported)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--execute', action='store_true', help='Import verified commit and update local refs')
    import_commit(parser.parse_args().execute)


if __name__ == '__main__':
    main()
