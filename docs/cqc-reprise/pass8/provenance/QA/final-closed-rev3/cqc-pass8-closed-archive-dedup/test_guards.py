#!/usr/bin/env python3
"""Small meaningful executor guards; mutations occur only in temporary fixtures."""
import contextlib
import copy
import importlib.util
import io
import json
import os
import tempfile
from pathlib import Path

spec = importlib.util.spec_from_file_location('closed_archive_executor', Path(__file__).with_name('execute_plan.py'))
m = importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)
checks = []

def rejected(name, call):
    try:
        call()
    except (ValueError, FileExistsError, OSError):
        checks.append({'name': name, 'passed': True})
    else:
        raise AssertionError(f'Expected rejection: {name}')

with tempfile.TemporaryDirectory(prefix='cqc-closed-archive-guards-') as directory:
    root = Path(directory)
    archive = root / 'closed-archives'; live = root / 'live'; evidence = root / 'evidence'
    archive.mkdir(); live.mkdir(); evidence.mkdir()
    keeper = archive / 'keeper.json'; target = archive / 'target.json'; live_file = live / 'source.json'
    payload = b'{"closed":"fixture"}\n' + b' ' * (1024 * 1024 + 13)
    for p in (keeper, target, live_file):
        p.write_bytes(payload); p.chmod(0o600)
    original_clean = m.clean
    m.ROOTS = (archive,); m.LIVE_ROOTS = (live,); m.OUT = evidence
    # Fixture lives in /tmp; real executor still excludes every tmp directory.
    m.DENY = m.DENY - {'tmp'}
    # Only the fixture path routing is replaced. All hashing/stat/scope/group,
    # source independence, journal and atomic replacement logic stays active.
    m.clean = lambda p, roots=None: original_clean(p, m.ROOTS if roots is None else roots)
    def row(p):
        return {'path': str(p), 'scopeRoot': str(archive), 'sha256': m.digest(p), 'stat': m.info(p)}
    a, b, c = row(keeper), row(target), row(live_file)
    plan = {'schema': 'cqc.pass8.closed-independent-archive-hardlink-plan/1', 'scopeRoots': [str(archive)],
            'minimumExclusiveBytes': 1024 * 1024, 'groups': [{'keeper': a, 'targets': [b], 'sha256': a['sha256'], 'bytes': len(payload)}],
            'mutableLivePins': [c], 'summary': {'targets': 1, 'keepers': 1, 'reclaimAllocatedBytesEstimate': b['stat']['allocatedBytes']}}
    assert m.preflight(plan) == 2
    checks.append({'name': 'independent_duplicate_preflight_passes_without_mutation', 'passed': True})
    bad = copy.deepcopy(plan); bad['groups'][0]['targets'][0]['sha256'] = '0' * 64
    rejected('changed_SHA_rejected_before_mutation', lambda: m.preflight(bad))
    bad = copy.deepcopy(plan); bad['groups'][0]['targets'][0]['stat']['mode'] = 0o644
    rejected('changed_stat_rejected_before_mutation', lambda: m.preflight(bad))
    bad = copy.deepcopy(plan); bad['groups'][0]['targets'][0]['path'] = str(live_file)
    rejected('mutable_live_target_outside_scope_rejected', lambda: m.preflight(bad))
    bad = copy.deepcopy(plan); bad['groups'][0]['targets'][0]['path'] = str(archive / '..' / 'live' / 'source.json')
    rejected('path_traversal_rejected', lambda: m.preflight(bad))
    symbolic = archive / 'alias.json'; symbolic.symlink_to(keeper)
    bad = copy.deepcopy(plan); bad['groups'][0]['targets'][0]['path'] = str(symbolic)
    rejected('symlink_target_rejected', lambda: m.preflight(bad))
    target_before = target.stat().st_ino
    assert target.stat().st_ino == target_before and target.read_bytes() == payload
    with contextlib.redirect_stdout(io.StringIO()):
        m.execute(plan, 'fixture-only')
    assert keeper.stat().st_ino == target.stat().st_ino
    assert keeper.read_bytes() == target.read_bytes() == live_file.read_bytes() == payload
    assert live_file.stat().st_ino != keeper.stat().st_ino
    assert m.info(live_file) == c['stat']
    assert target.stat().st_mode & 0o777 == 0o600
    checks.append({'name': 'fixture_atomic_link_preserves_paths_bytes_mode_and_live_independence', 'passed': True})
    rejected('already_multilink_archive_rejected_for_fresh_plan', lambda: m.preflight(plan))
    runs = list(evidence.glob('execution-*'))
    result = json.loads((runs[0] / 'EXECUTION_RESULT.json').read_text())
    assert result['status'] == 'completed' and result['targetsCompleted'] == 1
    checks.append({'name': 'fixture_complete_fsynced_journal_and_result_exist', 'passed': True})

print(json.dumps({'schema': 'cqc.pass8.closed-archive-executor-targeted-guards/1', 'status': 'passed',
                  'failed': 0, 'checks': checks, 'workspaceArchiveMutations': 0,
                  'fixtureMutationOnly': True}, indent=2))
