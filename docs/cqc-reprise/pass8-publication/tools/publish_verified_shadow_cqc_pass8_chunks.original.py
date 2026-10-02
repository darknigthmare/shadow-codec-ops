#!/usr/bin/env python3
"""Publish a frozen PASS8 tree through GitHub REST; default mode is read-only.

Only --execute may upload objects or advance the already authorized recovery
branch. Historical source paths, the expected parent and the verified local tree
are mandatory guards. Credentials are inherited by gh and never inspected here.
"""
from __future__ import annotations

import argparse
import base64
import concurrent.futures
import datetime as dt
import hashlib
import json
from pathlib import Path
import re
import subprocess
import threading
import time

SOURCE = Path('/workspace/shadow-codec-recovered')
PROOFS = Path('/workspace/github-pass8-publication-lossless-chunks')
REPOSITORY = 'darknigthmare/shadow-codec-ops'
BRANCH = 'reprise/2026-10-02'
PARENT = '37a0fa6682583cbfed4dfc8a55a5ecba4c6ed927'
GAMES = {'shadow': '.', 'standaloneCQC': 'public/cqc/index.html',
         'integratedCQC': '/?module=cqc'}
SHA1 = re.compile(r'^[0-9a-f]{40}$')
SHA256 = re.compile(r'^[0-9a-f]{64}$')


def require(condition, message):
    if not condition:
        raise RuntimeError(message)


def git(*arguments):
    return subprocess.check_output(['git', *arguments], cwd=SOURCE)


def git_text(*arguments):
    return git(*arguments).decode('utf-8').strip()


def sha256(raw):
    return hashlib.sha256(raw).hexdigest()


def object_sha(kind, raw):
    return hashlib.sha1(kind.encode() + b' ' + str(len(raw)).encode()
                        + b'\0' + raw).hexdigest()


def announce(value):
    print(json.dumps(value, ensure_ascii=False), flush=True)


def api(method, path, data=None):
    """Small retry delays; object creation is deterministic and ref writes guarded."""
    arguments = ['gh', 'api', '--method', method,
                 'repos/' + REPOSITORY + '/' + path,
                 '-H', 'Accept: application/vnd.github+json',
                 '-H', 'X-GitHub-Api-Version: 2022-11-28']
    if data is not None:
        arguments += ['--input', '-']
    payload = json.dumps(data) if data is not None else None
    for attempt in range(4):
        try:
            response = subprocess.run(arguments, input=payload, text=True,
                                      capture_output=True, timeout=120)
        except subprocess.TimeoutExpired:
            if attempt == 3:
                raise RuntimeError('GitHub API timeout: ' + method + ' ' + path)
            response = None
        if response is not None and response.returncode == 0:
            return json.loads(response.stdout)
        error = ('timeout' if response is None else
                 response.stderr[:1600] + response.stdout[:1600])
        retryable = response is None or any(x in error.lower() for x in
                    ('http 502', 'http 503', 'http 504', 'http 429', 'rate limit'))
        if attempt == 3 or not retryable:
            raise RuntimeError('GitHub API ' + method + ' ' + path + ': ' + error)
        delay = 10 * (attempt + 1)
        announce({'stage': 'retry', 'method': method, 'path': path,
                  'attempt': attempt + 1, 'delaySeconds': delay})
        time.sleep(delay)
    raise RuntimeError('Unreachable GitHub retry state')


def save_exact(path, value):
    """Existing proofs may be reused only when their complete content is identical."""
    if path.exists():
        require(json.loads(path.read_text()) == value,
                'Existing proof differs; refusing to overwrite ' + str(path))
        return
    with path.open('x') as handle:
        json.dump(value, handle, ensure_ascii=False, indent=2)
        handle.write('\n')


def save_raw_exact(path, raw):
    if path.exists():
        require(path.read_bytes() == raw, 'Existing bytes differ: ' + str(path))
    else:
        with path.open('xb') as handle:
            handle.write(raw)


def append_ledger(path, value):
    with path.open('a') as handle:
        handle.write(json.dumps(value, ensure_ascii=False) + '\n')


def read_qa_facts(path, local_commit, local_tree):
    require(path.is_file() and not path.is_symlink(), 'Missing regular QA facts file')
    raw = path.read_bytes()
    facts = json.loads(raw)
    require(facts.get('schema') == 'cqc.github.pass8-qa-facts/1', 'Wrong QA facts schema')
    require(facts.get('confirmedByRoot') is True and facts.get('status') == 'passed'
            and facts.get('sourceState') == 'frozen', 'Root has not frozen and verified PASS8')
    require(facts.get('localCommit') == local_commit and facts.get('localTree') == local_tree,
            'QA facts identify a different commit/tree')
    reports = facts.get('reports')
    require(isinstance(reports, list) and reports, 'No verified reports in QA facts')
    names = set()
    for report in reports:
        require(report.get('status') == 'passed' and report.get('name') not in names,
                'Unverified or repeated QA report')
        names.add(report.get('name'))
        report_path = Path(report.get('path', ''))
        require(report_path.is_absolute() and report_path.is_file()
                and not report_path.is_symlink(), 'Missing regular QA report: ' + str(report_path))
        expected = report.get('sha256', '')
        require(SHA256.fullmatch(expected) and sha256(report_path.read_bytes()) == expected,
                'QA report bytes changed: ' + str(report_path))
    return facts, raw


def assert_frozen(local_commit, local_tree, qa_path, expected_facts_sha):
    require(git_text('branch', '--show-current') == BRANCH, 'Wrong local branch')
    require(git_text('rev-parse', 'HEAD') == local_commit, 'Local HEAD changed')
    require(git_text('rev-parse', 'HEAD^{tree}') == local_tree, 'Local tree changed')
    require(not git('status', '--porcelain=v1').strip(), 'Local worktree is not clean')
    _, raw = read_qa_facts(qa_path, local_commit, local_tree)
    require(sha256(raw) == expected_facts_sha, 'QA facts changed during publication')


def local_files(commit):
    result = {}
    for row in git('ls-tree', '-r', '-z', commit).split(b'\0'):
        if not row:
            continue
        metadata, name_raw = row.split(b'\t', 1)
        mode, kind, digest = metadata.decode().split()
        name = name_raw.decode('utf-8')
        require(kind == 'blob' and mode in ('100644', '100755'),
                'Unsupported tree entry: ' + name)
        path = Path(name)
        require(not path.is_absolute() and '..' not in path.parts,
                'Unsafe repository path: ' + name)
        require(not (path.name.startswith('.env') and path.name not in
                     ('.env.example', '.env.sample')), 'Environment file excluded: ' + name)
        result[name] = {'path': name, 'mode': mode, 'type': kind, 'sha': digest}
    return result


def utc_identity(raw_header):
    match = re.fullmatch(r'(.+) <([^<>\r\n]+)> (\d+) ([+-]\d{4})', raw_header.decode('utf-8'))
    require(match is not None, 'Unsupported Git identity header')
    name, email, epoch, _offset = match.groups()
    require(not any(x in name for x in '<>\r\n\0'), 'Unsafe Git identity name')
    stamp = dt.datetime.fromtimestamp(int(epoch), tz=dt.timezone.utc)
    return {'name': name, 'email': email, 'date': stamp.isoformat().replace('+00:00', 'Z')}, \
           f'{name} <{email}> {epoch} +0000'.encode('utf-8')


def commit_request(local_commit, local_tree):
    """Explicit UTC identities make POST retries and local import reproducible."""
    raw = git('cat-file', 'commit', local_commit)
    header, message = raw.split(b'\n\n', 1)
    rows = header.split(b'\n')
    require(len(rows) == 4 and rows[0] == b'tree ' + local_tree.encode()
            and rows[1] == b'parent ' + PARENT.encode()
            and rows[2].startswith(b'author ') and rows[3].startswith(b'committer '),
            'PASS8 must be an unsigned, single-parent commit descending from PASS7')
    require(message.endswith(b'\n') and message.strip() and b'\0' not in message,
            'Unsupported or empty commit message')
    author, author_raw = utc_identity(rows[2][7:])
    committer, committer_raw = utc_identity(rows[3][10:])
    message_text = message.decode('utf-8')
    payload = {'message': message_text, 'tree': local_tree, 'parents': [PARENT],
               'author': author, 'committer': committer}
    remote_raw = (b'tree ' + local_tree.encode() + b'\nparent ' + PARENT.encode()
                  + b'\nauthor ' + author_raw + b'\ncommitter ' + committer_raw
                  + b'\n\n' + message)
    return payload, remote_raw


def verify_remote_commit(commit, expected_sha, local_tree, payload):
    require(SHA1.fullmatch(commit.get('sha', ''))
            and (expected_sha is None or commit['sha'] == expected_sha)
            and commit['tree']['sha'] == local_tree, 'Remote commit SHA/tree differs')
    require([x['sha'] for x in commit['parents']] == [PARENT], 'Remote parent differs')
    # GitHub may omit the final LF in its JSON message; bytes are pinned separately.
    require(commit['message'].rstrip('\n') == payload['message'].rstrip('\n'),
            'Remote commit message differs')
    for kind in ('author', 'committer'):
        for field in ('name', 'email'):
            require(commit[kind][field] == payload[kind][field], 'Remote identity differs')
        remote_date = dt.datetime.fromisoformat(commit[kind]['date'].replace('Z', '+00:00'))
        requested = dt.datetime.fromisoformat(payload[kind]['date'].replace('Z', '+00:00'))
        require(remote_date == requested, 'Remote commit date differs')


def reconstruct_remote_commit(commit, local_tree, payload):
    """Recover exact unsigned bytes, accounting for GitHub's final-LF normalization."""
    verify_remote_commit(commit, None, local_tree, payload)
    lines = [b'tree ' + local_tree.encode(), b'parent ' + PARENT.encode()]
    for kind in ('author', 'committer'):
        identity = commit[kind]
        stamp = dt.datetime.fromisoformat(identity['date'].replace('Z', '+00:00'))
        epoch = int(stamp.timestamp())
        header = f'{kind} {identity["name"]} <{identity["email"]}> {epoch} +0000'
        lines.append(header.encode('utf-8'))
    header = b'\n'.join(lines) + b'\n\n'
    candidates = {payload['message'].encode('utf-8'), commit['message'].encode('utf-8')}
    candidates |= {value + b'\n' for value in tuple(candidates)}
    for message in candidates:
        raw = header + message
        if object_sha('commit', raw) == commit['sha']:
            return raw
    raise RuntimeError('Cannot reconstruct exact unsigned GitHub commit bytes; no local ref is changed')


def publish(arguments):
    local_commit = arguments.local_commit
    require(SHA1.fullmatch(local_commit), 'Expected a complete local commit SHA')
    local_tree = git_text('rev-parse', local_commit + '^{tree}')
    base_tree = git_text('rev-parse', PARENT + '^{tree}')
    qa_path = arguments.qa_facts.resolve()
    facts, qa_raw = read_qa_facts(qa_path, local_commit, local_tree)
    qa_digest = sha256(qa_raw)
    assert_frozen(local_commit, local_tree, qa_path, qa_digest)
    commit_payload, remote_raw = commit_request(local_commit, local_tree)
    if facts.get('commitMessage') is not None:
        require(facts['commitMessage'] == commit_payload['message'],
                'QA-approved commit message differs from the local commit')
    requested_commit_sha = object_sha('commit', remote_raw)
    local = local_files(local_commit)
    base = local_files(PARENT)
    deleted = sorted(set(base) - set(local))
    require(not deleted, 'Historical paths would be deleted: ' + repr(deleted))
    changes = [local[name] for name in sorted(local)
               if name not in base or any(base[name][key] != local[name][key]
                                          for key in ('sha', 'mode', 'type'))]
    require(changes, 'PASS8 contains no changes')
    existing = {entry['sha'] for entry in base.values()}
    missing = {}
    for entry in changes:
        if entry['sha'] not in existing:
            missing.setdefault(entry['sha'], entry['path'])
    upload_bytes = 0
    for digest, name in missing.items():
        path = SOURCE / name
        require(path.is_file() and not path.is_symlink()
                and path.resolve().is_relative_to(SOURCE), 'Unsafe or missing payload: ' + name)
        raw = path.read_bytes()
        require(object_sha('blob', raw) == digest, 'Working bytes differ from commit: ' + name)
        require(len(raw) < 100 * 1024 * 1024, 'GitHub blob size limit: ' + name)
        upload_bytes += len(raw)
    plan = {'schema': 'cqc.github.pass8-publication-plan/1', 'repository': REPOSITORY,
            'branch': BRANCH, 'remoteParent': PARENT, 'remoteParentTree': base_tree,
            'localCommit': local_commit, 'localTree': local_tree,
            'requestedCommitRawCandidateSHA': requested_commit_sha,
            'qaFactsSHA256': qa_digest, 'commitMessageSHA256': sha256(commit_payload['message'].encode()),
            'changedPaths': len(changes), 'changesSHA256': sha256(json.dumps(changes, sort_keys=True).encode()),
            'missingUniqueBlobs': len(missing), 'uploadBytes': upload_bytes,
            'deletedPaths': deleted, 'treeBatchSize': 70, 'games': GAMES}
    if not arguments.execute:
        announce({'status': 'read-only-ready', 'remoteRequests': 0,
                  'gitMutations': 0, 'plan': plan})
        return

    # No remote or Git mutation occurs above this explicit execution boundary.
    PROOFS.mkdir(exist_ok=True)
    save_exact(PROOFS / 'publication-plan.json', plan)
    save_raw_exact(PROOFS / 'qa-facts.snapshot.json', qa_raw)
    save_exact(PROOFS / 'commit-request.json', commit_payload)
    created_path = PROOFS / 'created-commit.json'
    created = json.loads(created_path.read_text()) if created_path.exists() else None
    remote_commit_sha = created['commit'] if created is not None else None
    if created is not None:
        require(created['tree'] == local_tree and created['parent'] == PARENT,
                'Existing created commit has a different tree/parent')
        exact_raw = (PROOFS / 'remote-commit.raw').read_bytes()
        require(object_sha('commit', exact_raw) == remote_commit_sha
                and sha256(exact_raw) == created['rawCommitSHA256'], 'Created commit bytes differ')
    current_ref = api('GET', 'git/ref/heads/' + BRANCH)['object']['sha']
    require(current_ref == PARENT or (remote_commit_sha is not None and current_ref == remote_commit_sha),
            'Concurrent remote change; refusing to overwrite the recovery branch')
    remote_tree = api('GET', 'git/trees/' + base_tree + '?recursive=1')
    require(not remote_tree.get('truncated'), 'Remote parent tree is truncated')
    remote_base = {x['path']: {k: x[k] for k in ('path', 'mode', 'type', 'sha')}
                   for x in remote_tree['tree'] if x['type'] != 'tree'}
    require(remote_base == base, 'Remote PASS7 parent tree differs from local preserved parent')
    ledger_path = PROOFS / 'uploaded-blobs.jsonl'
    ledger = [json.loads(line) for line in ledger_path.read_text().splitlines()] \
             if ledger_path.exists() else []
    uploaded = {}
    for item in ledger:
        digest = item.get('sha')
        require(item.get('verified') is True and digest in missing,
                'Unexpected/unverified blob in resume ledger')
        require(item.get('path') == missing[digest]
                and item.get('bytes') == (SOURCE / missing[digest]).stat().st_size,
                'Resume ledger payload differs')
        require(digest not in uploaded, 'Duplicate resume ledger SHA')
        uploaded[digest] = item
    lock = threading.Lock()

    def upload(item):
        digest, name = item
        raw = (SOURCE / name).read_bytes()
        require(object_sha('blob', raw) == digest, 'Payload changed before upload: ' + name)
        result = api('POST', 'git/blobs', {'content': base64.b64encode(raw).decode(),
                                         'encoding': 'base64'})
        require(result['sha'] == digest, 'GitHub blob response differs: ' + name)
        proof = {'path': name, 'sha': digest, 'bytes': len(raw), 'verified': True}
        with lock:
            append_ledger(ledger_path, proof)
            uploaded[digest] = proof
            if len(uploaded) % 20 == 0 or len(uploaded) == len(missing):
                announce({'stage': 'uploading', 'verifiedBlobs': len(uploaded),
                          'total': len(missing)})

    try:
        if current_ref == PARENT:
            with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
                futures = [pool.submit(upload, item) for item in missing.items()
                           if item[0] not in uploaded]
                for future in concurrent.futures.as_completed(futures):
                    future.result()
            require(len(uploaded) == len(missing), 'Not all required blobs are verified')
            assert_frozen(local_commit, local_tree, qa_path, qa_digest)
            tree = base_tree
            batches = []
            for offset in range(0, len(changes), 70):
                result = api('POST', 'git/trees', {'base_tree': tree,
                                                  'tree': changes[offset:offset + 70]})
                tree = result['sha']
                batch = {'offset': offset, 'elements': len(changes[offset:offset + 70]), 'sha': tree}
                batches.append(batch)
                announce({'stage': 'tree-batch', 'donePaths': min(offset + 70, len(changes)),
                          'total': len(changes), 'tree': tree})
            require(tree == local_tree, 'Remote assembled tree differs from verified local tree')
            save_exact(PROOFS / 'remote-tree-verification.json',
                       {'status': 'passed', 'treeSHA': tree, 'localTreeSHA': local_tree,
                        'batches': batches, 'blobResponsesVerified': len(uploaded),
                        'oldPathsRemoved': 0})
            assert_frozen(local_commit, local_tree, qa_path, qa_digest)
            commit = api('POST', 'git/commits', commit_payload)
            if remote_commit_sha is not None:
                require(commit['sha'] == remote_commit_sha, 'Recreated commit SHA differs')
            remote_commit_sha = commit['sha']
            exact_raw = reconstruct_remote_commit(commit, local_tree, commit_payload)
            save_raw_exact(PROOFS / 'remote-commit.raw', exact_raw)
            save_exact(PROOFS / 'created-commit.json',
                       {'commit': remote_commit_sha, 'tree': local_tree, 'parent': PARENT,
                        'rawCommitSHA256': sha256(exact_raw),
                        'url': 'https://github.com/' + REPOSITORY + '/commit/' + remote_commit_sha})
            # The final ref update is non-forcing and aborts after any concurrent change.
            require(api('GET', 'git/ref/heads/' + BRANCH)['object']['sha'] == PARENT,
                    'Concurrent remote branch change; commit remains unattached')
            assert_frozen(local_commit, local_tree, qa_path, qa_digest)
            api('PATCH', 'git/refs/heads/' + BRANCH, {'sha': remote_commit_sha, 'force': False})
        require(len(uploaded) == len(missing), 'Not all required blob proofs are retained')
        require(api('GET', 'git/ref/heads/' + BRANCH)['object']['sha'] == remote_commit_sha,
                'Final remote ref differs')
        final_commit = api('GET', 'git/commits/' + remote_commit_sha)
        verify_remote_commit(final_commit, remote_commit_sha, local_tree, commit_payload)
        assert_frozen(local_commit, local_tree, qa_path, qa_digest)
        result = {'schema': 'cqc.github.pass8-publication/1', 'status': 'published',
                  'repository': REPOSITORY, 'branch': BRANCH, 'commit': remote_commit_sha,
                  'commitURL': 'https://github.com/' + REPOSITORY + '/commit/' + remote_commit_sha,
                  'branchURL': 'https://github.com/' + REPOSITORY + '/tree/' + BRANCH,
                  'localSourceCommit': local_commit, 'sourceTreeByteExact': local_tree,
                  'remoteParentPreserved': PARENT, 'force': False,
                  'uploadedUniqueBlobs': len(uploaded), 'changedPaths': len(changes),
                  'payloadBytesUploaded': upload_bytes, 'deletedPaths': [],
                  'qaFactsSHA256': qa_digest, 'games': GAMES,
                  'evidence': 'Git blob responses and the complete remote tree equal the frozen local source; '
                              'PASS7 is the sole parent and no historical path was removed.'}
        save_exact(PROOFS / 'publication-results.json', result)
        announce(result)
    except BaseException as exc:
        # Preserve every failed attempt rather than replacing earlier evidence.
        failure = {'status': 'failed', 'verifiedBlobs': len(uploaded), 'error': repr(exc),
                   'forceWasNeverUsed': True, 'expectedParent': PARENT}
        stamp = dt.datetime.now(dt.timezone.utc).strftime('%Y%m%dT%H%M%S%fZ')
        save_exact(PROOFS / ('publication-failure-' + stamp + '.json'), failure)
        raise


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--local-commit', required=True, help='Frozen local PASS8 commit SHA')
    parser.add_argument('--qa-facts', type=Path, required=True, help='Root-verified QA facts JSON')
    parser.add_argument('--execute', action='store_true', help='Perform authorized GitHub publication')
    publish(parser.parse_args())


if __name__ == '__main__':
    main()
