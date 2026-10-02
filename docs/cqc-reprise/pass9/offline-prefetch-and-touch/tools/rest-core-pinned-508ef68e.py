#!/usr/bin/env python3
"""Publish a frozen PASS9 tree through GitHub REST; default mode is read-only.

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
import math
from pathlib import Path
import re
import subprocess
import threading
import time
import zlib

SOURCE = Path('/workspace/shadow-codec-recovered')
PROOFS = Path('/workspace/github-pass9-publication')
REPOSITORY = 'darknigthmare/shadow-codec-ops'
BRANCH = 'reprise/2026-10-02'
PARENT = 'db5fd672af5e5da7e2908321452e14fbbed8edef'
DOC_PREFIX = 'docs/cqc-reprise/pass9/'
RUNTIME_PREFIX = 'public/cqc/'
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
    require(facts.get('schema') == 'cqc.github.pass9-qa-facts/1', 'Wrong QA facts schema')
    require(facts.get('confirmedByRoot') is True and facts.get('status') == 'passed'
            and facts.get('sourceState') == 'frozen', 'Root has not frozen and verified PASS9')
    require(facts.get('localCommit') == local_commit and facts.get('localTree') == local_tree,
            'QA facts identify a different commit/tree')
    require(facts.get('expectedParent') == PARENT, 'PASS9 parent differs')
    require(facts.get('nativeCounts') == {'fighterSelected': 24, 'fighterNonFinal': 5, 'fighterAttempts': 29, 'projectileSelected': 1, 'projectileFrames': 8, 'allNativeAttempts': 30}, 'PASS9 native preservation counts differ')
    require(all(type(value) is int for value in facts['nativeCounts'].values()),
            'Native preservation counts must be integers')
    validate_closed_pass9_inputs(facts)
    reports = facts.get('reports')
    require(isinstance(reports, list) and reports, 'No verified reports in QA facts')
    names = set()
    roles = set()
    for report in reports:
        roles.add(report.get('role'))
        require(report.get('status') == 'passed' and report.get('name') not in names,
                'Unverified or repeated QA report')
        names.add(report.get('name'))
        report_path = Path(report.get('path', ''))
        require(report_path.is_absolute() and report_path.is_file()
                and not report_path.is_symlink() and report_path.resolve() == report_path,
                'Missing regular QA report: ' + str(report_path))
        report_raw = report_path.read_bytes()
        observed = json.loads(report_raw)
        actual_status = observed.get(report.get('actualStatusField', 'status')) if isinstance(observed, dict) else None
        approved_status = report.get('actualReportStatus')
        require(isinstance(observed, dict) and type(actual_status) is type(approved_status)
                and actual_status == approved_status, 'Actual PASS9 report status differs')
        passing = ('passed', 'completed', 'verified', 'accepted_closest_supported', 'approved-with-fidelity-qualifications')
        require(approved_status is True or (type(approved_status) is str and approved_status in passing),
                'Actual PASS9 report did not pass')
        require('status' not in observed or observed['status'] is True or
                (type(observed['status']) is str and observed['status'] in passing),
                'Non-passing actual PASS9 report cannot be reclassified')
        require(not re.search(r'(?:^|[./_-])(?:fixtures?|preparation|plan|draft)(?:[./_-]|$)',
                              str(observed.get('schema', '')), re.IGNORECASE),
                'Fixture/preparation proof cannot certify actual PASS9 QA')
        expected = report.get('sha256', '')
        require(SHA256.fullmatch(expected) and sha256(report_raw) == expected,
                'QA report bytes changed: ' + str(report_path))
        if report.get('role') == 'lossless-catalog-verification':
            validate_lossless_verification_receipt(observed, facts)
    require({'actual-vm413', 'actual-native-projectile8', 'actual-browser', 'actual-shadow-qa-build', 'lossless-catalog-verification'} <= roles, 'Closed actual PASS9 QA roles are missing')
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
            'PASS9 must be an unsigned, single-parent commit descending from the verified PASS8 publication commit')
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


def closed_json_pin(row):
    path = Path(row.get('path', ''))
    require(path.is_absolute() and path.is_file() and not path.is_symlink() and path.resolve() == path, 'Closed regular JSON proof required')
    raw = path.read_bytes()
    require(SHA256.fullmatch(row.get('sha256', '')) and sha256(raw) == row['sha256'], 'Closed proof SHA differs: ' + str(path))
    return json.loads(raw)


def repository_path(value, prefix=None):
    require(type(value) is str and value and not value.startswith('/') and
            '\\' not in value and ':' not in value and
            all(part and part not in ('.', '..') for part in value.split('/')) and
            not any(ord(c) < 32 or ord(c) == 127 for c in value), 'Unsafe repository path')
    require(prefix is None or value.startswith(prefix), 'Unexpected repository path scope')
    return value


def approved_configuration_map(facts, enforce_core_flags=True):
    rows = facts.get('approvedShadowConfigurationChanges', [])
    require(type(rows) is list and len(rows) <= 1, 'Only one Shadow configuration exception is authorized')
    if not rows:
        if enforce_core_flags:
            require(facts.get('shadowCoreUnchanged') is True and
                    facts.get('shadowCoreUnchangedExceptApprovedConfiguration', False) is False,
                    'Unchanged Shadow core requires no configuration exception')
        return {}
    row = rows[0]
    require(type(row) is dict and row.get('path') == 'vitest.config.ts' and
            row.get('rootApproved') is True and
            facts.get('shadowCoreUnchanged') is False and
            facts.get('shadowCoreUnchangedExceptApprovedConfiguration') is True,
            'Exact root-approved vitest exception and qualified core status required')
    require(row.get('previousVersion') == PARENT and row.get('mode') == '100644',
            'Configuration must preserve the approved parent version and mode')
    for field, pattern in [('previousGitBlobSHA1', SHA1), ('gitBlobSHA1', SHA1),
                           ('previousSha256', SHA256), ('sha256', SHA256)]:
        require(type(row.get(field)) is str and pattern.fullmatch(row[field]),
                'Configuration lacks exact old/new digest pins')
    require(all(type(row.get(field)) is int and row[field] >= 0
                for field in ('previousBytes', 'bytes')), 'Configuration lacks exact old/new sizes')
    return {'vitest.config.ts': row}


def expected_vitest_configuration(previous):
    old_import = b"import { defineConfig } from 'vitest/config';"
    anchor = b'  test: {\n'
    require(previous.count(old_import) == 1 and previous.count(anchor) == 1 and
            b'configDefaults' not in previous and b'exclude' not in previous,
            'Approved parent vitest template differs; no inferred transformation')
    return previous.replace(old_import, b"import { configDefaults, defineConfig } from 'vitest/config';", 1).replace(
        anchor, anchor + b"    exclude: [...configDefaults.exclude, 'docs/**'],\n", 1)


def validate_candidate_configuration(local_commit, base, candidate, facts):
    approvals = approved_configuration_map(facts)
    for name, approved in approvals.items():
        require(name in base and name in candidate and base[name]['type'] == candidate[name]['type'] == 'blob'
                and base[name]['mode'] == candidate[name]['mode'] == approved['mode']
                and base[name]['sha'] == approved['previousGitBlobSHA1']
                and candidate[name]['sha'] == approved['gitBlobSHA1'],
                'Configuration tree entries differ from root-approved old/new pins')
        previous = git('show', PARENT + ':' + name)
        actual = git('show', local_commit + ':' + name)
        require(len(previous) == approved['previousBytes'] and sha256(previous) == approved['previousSha256']
                and object_sha('blob', previous) == approved['previousGitBlobSHA1'],
                'Parent configuration bytes differ from approval')
        require(len(actual) == approved['bytes'] and sha256(actual) == approved['sha256']
                and object_sha('blob', actual) == approved['gitBlobSHA1'],
                'Candidate configuration bytes differ from approval')
        require(actual == expected_vitest_configuration(previous),
                'Only configDefaults and test.exclude docs/** may change')


def validate_lossless_verification_receipt(observed, facts):
    chunks = closed_json_pin(facts['catalogChunkManifest'])
    source = chunks['files'][0]
    require(observed.get('schema') == 'cqc.pass9.catalog43-lossless-snapshot-execution/1' and
            observed.get('status') == 'passed' and observed.get('sourceBytes') == source['originalBytes'] and
            observed.get('sourceSha256') == source['originalSha256'] and
            observed.get('sourceGitBlob') == source['originalGitBlob'] and
            observed.get('snapshotManifest', {}).get('sha256') == facts['catalogChunkManifest']['sha256'] and
            observed.get('rootFreeze', {}).get('sha256') == facts['sourceFreeze']['sha256'] and
            observed.get('rawCompressedAndCompleteHashesVerifiedByRestoreTool') is True and
            observed.get('verificationReadsOriginalOrCurrentCatalog') is False and
            observed.get('wroteExpandedCatalog') is False and observed.get('runtimeSourceWrites') == 0,
            'Lossless QA report is not the exact completed frozen43 verification receipt')


def validate_catalog_candidate(local_commit, base, candidate, facts):
    """Bind the closed catalog manifest and every gzip byte to the reviewed tree."""
    manifest_path = repository_path(facts.get('catalogChunkManifestRepositoryPath'), DOC_PREFIX)
    require(manifest_path in candidate and manifest_path not in base,
            'Candidate lacks the new closed catalog manifest')
    raw_manifest = bounded_candidate_blob(local_commit, manifest_path, candidate[manifest_path],
                                          maximum_bytes=2 * 1024 * 1024)
    require(sha256(raw_manifest) == facts['catalogChunkManifest']['sha256'] and
            object_sha('blob', raw_manifest) == candidate[manifest_path]['sha'],
            'Candidate catalog manifest differs from the closed pin/tree')
    manifest = json.loads(raw_manifest)
    require(manifest.get('schema') == 'cqc.lossless-snapshot-chunks/1' and
            manifest.get('status') == 'byte-exact-lossless' and
            set(manifest) == {'schema', 'status', 'compression', 'files', 'authorization'},
            'Strict catalog chunk manifest required')
    require(manifest.get('compression') == {'format': 'gzip', 'level': 9, 'mtime': 0,
            'chunkBytes': 16777216, 'readBytes': 1048576, 'maxCompressedPartBytes': 94371840},
            'Catalog compression settings differ')
    require(all(type(manifest['compression'][field]) is int for field in
                ('level', 'mtime', 'chunkBytes', 'readBytes', 'maxCompressedPartBytes')),
            'Catalog compression sizes and settings must be integers')
    require(type(manifest.get('files')) is list and len(manifest['files']) == 1,
            'Exactly one catalog row required')
    row = manifest['files'][0]
    require(set(row) == {'logicalPath', 'originalBytes', 'originalSha256', 'originalGitBlob', 'parts'} and
            row['logicalPath'] == 'source-code/data/combat-sprite-catalog-v1.json' and
            type(row['originalBytes']) is int and row['originalBytes'] >= 0 and
            SHA256.fullmatch(row['originalSha256']) and SHA1.fullmatch(row['originalGitBlob']),
            'Invalid complete catalog digest or size')
    require(not any(entry['sha'] == row['originalGitBlob']
                    for name, entry in candidate.items()
                    if name not in base or entry != base[name]),
            'Another uncompressed full canonical catalog copy is forbidden, regardless of filename')
    auth = manifest['authorization']
    require(type(auth) is dict and set(auth) == {'kind', 'manifestPath', 'manifestSha256',
            'manifestSchema', 'confirmedByRoot', 'sourceState', 'entryCount'} and
            auth.get('kind') == 'root-frozen-source' and auth.get('confirmedByRoot') is True and
            type(auth.get('entryCount')) is int and auth.get('entryCount') == 43 and
            auth.get('manifestSchema') in ('cqc.pass9.current-source-freeze/1', 'cqc.pass8.current-source-freeze/1') and
            type(auth.get('manifestPath')) is str and Path(auth['manifestPath']).is_absolute() and
            '..' not in Path(auth['manifestPath']).parts and '\\' not in auth['manifestPath'] and
            auth.get('sourceState') == 'frozen' and
            auth.get('manifestSha256') == facts['sourceFreeze']['sha256'],
            'Catalog chunks do not identify the final approved root freeze')
    parts = row['parts']
    require(type(parts) is list and len(parts) == max(1, math.ceil(row['originalBytes'] / 16777216)),
            'Catalog part count differs from full source size')
    full = hashlib.sha256()
    git_blob = hashlib.sha1(b'blob ' + str(row['originalBytes']).encode() + b'\0')
    total = 0
    for index, part in enumerate(parts, 1):
        require(type(part) is dict and set(part) == {'index', 'offset', 'path', 'bytes', 'sha256',
                'uncompressedBytes', 'uncompressedSha256'} and type(part['index']) is int and
                part['index'] == index and type(part['offset']) is int and part['offset'] == total and
                part['path'] == f'parts/part-{index:06d}.gz' and type(part['bytes']) is int and
                20 <= part['bytes'] < 94371840 and type(part['uncompressedBytes']) is int and
                part['uncompressedBytes'] == min(16777216, row['originalBytes'] - total) and
                SHA256.fullmatch(part['sha256']) and SHA256.fullmatch(part['uncompressedSha256']),
                'Unsafe, unordered or unpinned catalog part')
        name = repository_path(str(Path(manifest_path).parent / part['path']), DOC_PREFIX)
        require(name in candidate and name not in base, 'Candidate lacks an exact new catalog part')
        compressed = bounded_candidate_blob(local_commit, name, candidate[name],
                                             expected_bytes=part['bytes'], maximum_bytes=94371839)
        require(len(compressed) == part['bytes'] and sha256(compressed) == part['sha256'] and
                object_sha('blob', compressed) == candidate[name]['sha'],
                'Catalog part differs from candidate Git blob or compressed pin')
        require(compressed[:10] == b'\x1f\x8b\x08\x00\x00\x00\x00\x00\x02\xff',
                'Catalog gzip header differs from the deterministic format')
        decoder = zlib.decompressobj(wbits=31)
        raw_sha = hashlib.sha256()
        count = 0
        for offset in range(0, len(compressed), 1048576):
            pending = compressed[offset:offset + 1048576]
            require(not decoder.eof, 'Trailing catalog gzip bytes')
            while True:
                bound = min(1048576, part['uncompressedBytes'] - count + 1)
                data = decoder.decompress(pending, bound)
                count += len(data)
                require(count <= part['uncompressedBytes'], 'Catalog decompression exceeded frozen size')
                raw_sha.update(data); full.update(data); git_blob.update(data)
                require(not decoder.unused_data, 'Concatenated/trailing catalog gzip member')
                pending = decoder.unconsumed_tail
                if decoder.eof or (not pending and len(data) < bound):
                    break
        require(decoder.eof and count == part['uncompressedBytes'] and
                raw_sha.hexdigest() == part['uncompressedSha256'], 'Raw catalog part differs')
        total += count
    require(total == row['originalBytes'] and full.hexdigest() == row['originalSha256'] and
            git_blob.hexdigest() == row['originalGitBlob'], 'Full candidate catalog SHA256/Git blob differs')


def bounded_candidate_blob(commit, name, entry, expected_bytes=None, maximum_bytes=94371839):
    """Check the actual immutable object size before asking Git for its content."""
    require(entry.get('type') == 'blob' and SHA1.fullmatch(entry.get('sha', '')),
            'Candidate regular Git blob required')
    size_raw = git('cat-file', '-s', entry['sha'])
    require(re.fullmatch(rb'[0-9]+\n?', size_raw), 'Invalid candidate Git object size')
    size = int(size_raw)
    require(size <= maximum_bytes and (expected_bytes is None or size == expected_bytes),
            'Actual Git blob exceeds or differs from declared size before loading')
    raw = git('show', commit + ':' + name)
    require(len(raw) == size, 'Candidate Git byte count differs from preflight')
    return raw


def validate_closed_pass9_inputs(facts):
    freeze = closed_json_pin(facts.get('sourceFreeze', {}))
    require(freeze.get('schema') in ('cqc.pass8.current-source-freeze/1', 'cqc.pass9.current-source-freeze/1') and freeze.get('confirmedByRoot') is True and freeze.get('status') == 'frozen' and type(freeze.get('entryCount')) is int and freeze.get('entryCount') == 43, 'Final root-frozen43 required; current/preliminary source is not QA')
    catalog_pins = [r for r in freeze.get('files', []) if Path(r.get('path', '')).as_posix().endswith('/data/combat-sprite-catalog-v1.json')]
    require(len(catalog_pins) == 1, 'Exact canonical catalog freeze pin required')
    chunks = closed_json_pin(facts.get('catalogChunkManifest', {}))
    require(chunks.get('schema') == 'cqc.lossless-snapshot-chunks/1' and chunks.get('status') == 'byte-exact-lossless' and len(chunks.get('files', [])) == 1, 'Exactly one frozen PASS9 catalog must be stored losslessly')
    row = chunks['files'][0]; frozen = catalog_pins[0]
    require(row.get('logicalPath') == 'source-code/data/combat-sprite-catalog-v1.json' and row.get('originalSha256') == frozen['sha256'] and type(frozen.get('bytes')) is int and frozen['bytes'] >= 0 and type(row.get('originalBytes')) is int and row.get('originalBytes') == frozen['bytes'], 'Chunked catalog differs from frozen43')
    require(SHA1.fullmatch(row.get('originalGitBlob', '')) and row.get('parts'), 'Exact source Git blob and gzip parts required')
    require(type(facts.get('historicalPathDeletions')) is int and facts['historicalPathDeletions'] == 0,
            'Historical paths must be preserved')
    approved_configuration_map(facts)
    repository_path(facts.get('catalogChunkManifestRepositoryPath'), DOC_PREFIX)
    require(SHA256.fullmatch(facts.get('runtimeManifestSHA256', '')), 'Final actual transformed runtime manifest pin required')


def validate_pass9_scope(changes, base, facts):
    """Allow exact new docs and explicitly reviewed transformed runtime changes."""
    docs = facts.get('expectedNewDocumentationPaths'); runtime = facts.get('approvedRuntimeChanges')
    require(isinstance(docs, list) and len(docs) == len(set(docs)) and docs, 'Exact new PASS9 documentation paths required')
    require(isinstance(runtime, list) and runtime, 'Actual closed runtime changes required')
    runtime_map = {r.get('path'): r for r in runtime}
    require(len(runtime_map) == len(runtime), 'Duplicate runtime approval')
    configuration_map = approved_configuration_map(facts, enforce_core_flags=False)
    require(not set(docs) & (set(runtime_map) | set(configuration_map)) and
            not set(runtime_map) & set(configuration_map), 'Overlapping documentation/runtime/configuration scopes')
    names = [r['path'] for r in changes]
    require(len(names) == len(set(names)) and set(names) == set(docs) | set(runtime_map) | set(configuration_map), 'Candidate changes differ from reviewed docs/runtime/configuration graph')
    for row in changes:
        name = row['path']; path = Path(name)
        require(not path.is_absolute() and '..' not in path.parts and '\\' not in name, 'Unsafe candidate path')
        require(row.get('mode') in ('100644', '100755') and row.get('type') == 'blob', 'Unsupported candidate entry')
        if name in docs:
            require(name.startswith(DOC_PREFIX) and name not in base, 'Historical/non-PASS9 documentation may not change')
            require(not name.endswith('/source-code/data/combat-sprite-catalog-v1.json'), 'Canonical catalog must be lossless gzip chunks, never another full source archive copy')
        elif name in configuration_map:
            approved = configuration_map[name]
            require(name in base and base[name]['sha'] == approved['previousGitBlobSHA1'] and
                    row['sha'] == approved['gitBlobSHA1'] and row['mode'] == approved['mode'],
                    'Configuration scope differs from exact approved old/new tree pins')
        else:
            expected = runtime_map[name]
            require(name.startswith(RUNTIME_PREFIX) and name != 'public/cqc/data/combat-sprite-catalog-v1.json', 'Only transformed public CQC runtime may change; full canonical JSON is excluded')
            require(expected.get('approvedActualTransformedRuntime') is True and expected.get('gitBlobSHA1') == row['sha'] and expected.get('mode') == row['mode'], 'Runtime change lacks exact reviewed Git blob/mode approval')


def runtime_manifest_rows(manifest):
    require(manifest.get('schema') == 'shadow-codec-ops.cqc-runtime/1' and isinstance(manifest.get('files'), list), 'Official transformed runtime manifest required')
    rows = {}
    for row in manifest['files']:
        name = row.get('path', ''); p = Path(name)
        require(name and not p.is_absolute() and '..' not in p.parts and '\\' not in name and RUNTIME_PREFIX + name not in rows and SHA256.fullmatch(row.get('sha256', '')) and type(row.get('bytes')) is int and row['bytes'] >= 0, 'Unsafe/repeated runtime graph row')
        rows[RUNTIME_PREFIX + name] = row
    return rows


def validate_runtime_graph(local_commit, base, candidate, facts):
    path = 'public/cqc/runtime-manifest.json'
    raw = git('show', local_commit + ':' + path)
    require(sha256(raw) == facts['runtimeManifestSHA256'], 'Candidate actual runtime manifest differs')
    expected = runtime_manifest_rows(json.loads(raw))
    actual = {p for p in candidate if p.startswith(RUNTIME_PREFIX)}
    require(actual == set(expected) | {path}, 'Candidate loses or adds paths outside its supplied complete runtime graph')
    old = runtime_manifest_rows(json.loads(git('show', PARENT + ':' + path)))
    require(set(old) <= set(expected), 'Final runtime manifest drops historical runtime rows')
    approvals = {r['path']: r for r in facts['approvedRuntimeChanges']}
    for name, row in expected.items():
        if name not in approvals:
            require(name in base and candidate[name] == base[name] and name in old and row == old[name], 'Unreviewed runtime bytes/metadata changed')
        else:
            approved = approvals[name]
            require(row['sha256'] == approved.get('sha256') and row['bytes'] == approved.get('bytes'), 'Runtime approval differs from transformed manifest')
    require(path in approvals and approvals[path].get('sha256') == sha256(raw) and approvals[path].get('bytes') == len(raw), 'Changed actual runtime manifest itself must be approved')


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
    require(changes, 'PASS9 contains no changes')
    validate_pass9_scope(changes, base, facts)
    validate_candidate_configuration(local_commit, base, local, facts)
    validate_runtime_graph(local_commit, base, local, facts)
    validate_catalog_candidate(local_commit, base, local, facts)
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
    plan = {'schema': 'cqc.github.pass9-publication-plan/1', 'repository': REPOSITORY,
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
    require(remote_base == base, 'Remote verified PASS8 publication parent tree differs from local preserved parent')
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
        result = {'schema': 'cqc.github.pass9-publication/1', 'status': 'published',
                  'repository': REPOSITORY, 'branch': BRANCH, 'commit': remote_commit_sha,
                  'commitURL': 'https://github.com/' + REPOSITORY + '/commit/' + remote_commit_sha,
                  'branchURL': 'https://github.com/' + REPOSITORY + '/tree/' + BRANCH,
                  'localSourceCommit': local_commit, 'sourceTreeByteExact': local_tree,
                  'remoteParentPreserved': PARENT, 'force': False,
                  'uploadedUniqueBlobs': len(uploaded), 'changedPaths': len(changes),
                  'payloadBytesUploaded': upload_bytes, 'deletedPaths': [],
                  'qaFactsSHA256': qa_digest, 'games': GAMES,
                  'evidence': 'Git blob responses and the complete remote tree equal the frozen local source; '
                              'The verified PASS8 publication commit is the sole parent and no historical path was removed.'}
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
    parser.add_argument('--local-commit', required=True, help='Frozen local PASS9 commit SHA')
    parser.add_argument('--qa-facts', type=Path, required=True, help='Root-verified QA facts JSON')
    parser.add_argument('--execute', action='store_true', help='Perform authorized GitHub publication')
    publish(parser.parse_args())


if __name__ == '__main__':
    main()
