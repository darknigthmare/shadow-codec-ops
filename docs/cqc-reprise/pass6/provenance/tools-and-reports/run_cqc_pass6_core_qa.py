#!/usr/bin/env python3
"""Run sixteen distinct CQC PASS6 suites after an explicit production freeze.

The default --plan mode only reads files. --execute protects historical report
bytes before any Node execution, captures each fresh result in a unique PASS6
run directory, and restores the seven original test reports afterward.

Invoke the runner through exec_command with additional_permissions.network.enabled
when required by this environment's Node process sandbox. No test requests the
network, and this runner does not change proxy/TLS policy or game production code.
"""
from __future__ import annotations

import argparse
from datetime import datetime, timezone
import hashlib
import json
import os
from pathlib import Path
import re
import shutil
import signal
import subprocess
import sys
import time
import uuid

DEFAULT_ROOT = Path('/workspace/cqc-game-working/cqc-versus-v056')
DEFAULT_OUTPUT = Path('/workspace/cqc-pass6-core-qa')
# One row is one suite. Baseline checks are comparisons, never recycled results.
SUITES = [
    ('test_original_gameplay_reprise.cjs', 'PARALLAXE: real control, traps, resources, collisions and CPU', 'original-gameplay-reprise-results.json', 28),
    ('test_viper_canonical_combat_reprise.cjs', 'Viper Ghost Babel: canonical wire/mines, timing and counterplay', 'viper-canonical-combat-reprise-results.json', 14),
    ('test_combat_v045.cjs', 'Historical0.45: 194fighter profiles, command effects and CPU matches', 'combat-validation-v045.json', 278),
    ('test_combat_v056.cjs', 'All354 historical fighters: real contact, KO and deterministic rules', 'combat-results-v056.json', 355),
    ('test_core_v056.cjs', 'Chronicles: full routes, resumes, save integrity and progression', 'unit-results-v056.json', 380),
    ('test_runtime_v056.cjs', 'Chronicles runtime: transport, controls, gallery and asynchronous loading in VM', 'runtime-results-v056.json', 37),
    ('test_album_v056.cjs', 'Album: filtering, story selection and illustration dispatch in simulated DOM', 'album-results-v056.json', 25),
    ('test_static_portrait_refresh_reprise.cjs', 'Late portrait loading: cancellation, selection and detached canvas safety', None, 8),
    ('test_static_sprite_readiness_reprise.cjs', 'Native sprite readiness and static cinema refresh without progression', None, 7),
    ('test_pass3_combat_fidelity.cjs', 'PASS3 canonical ammunition and per-facing muzzle origins: Meryl and Ocelot', None, 22),
    ('test_pass4_combat_fidelity.cjs', 'PASS4 canonical weapons, resources, recoil and native origin safeguards', None, None),
    ('test_pass4_projectile_art.cjs', 'PASS4 projectile artwork: exact-UID canonical dispatch and real engine geometry', None, None),
]
SUITES += [('test_pass5_combat_fidelity.cjs', 'PASS5 exact-UID native origins, canonical gear and unchanged engine balance', None, None),
           ('test_pass5_prop_art.cjs', 'PASS5 native knife/C4 dispatch, readiness, reflections and unchanged object state', None, None)]
SUITES += [('test_pass6_combat_fidelity.cjs', 'PASS6 original equipment, finite reserves and four source-locked native bodies', None, None),
           ('test_pass6_prop_art.cjs', 'PASS6 native original projectile props, readiness and immutable engine state', None, None)]
assert len({row[0] for row in SUITES}) == len(SUITES)
assert sum(row[3] for row in SUITES[:9]) == 1132
assert sum(row[3] for row in SUITES[:10]) == 1154


def sha(raw: bytes) -> str:
    return hashlib.sha256(raw).hexdigest()


def dump(path: Path, value: object) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')


def plan(root: Path) -> dict:
    rows = []
    for name, scope, report, old_count in SUITES:
        file = root / 'tests' / name
        rows.append({
            'test': str(file), 'scope': scope, 'command': ['node', str(file)],
            'exists': file.is_file(),
            'sourceSha256': sha(file.read_bytes()) if file.is_file() else None,
            'writesHistoricalReport': str(root / 'tests' / report) if report else None,
            'previousDeliveredCaseCountForComparisonOnly': old_count,
        })
    return {
        'mode': 'plan_only_no_tests_executed', 'root': str(root), 'distinctSuites': len(rows),
        'historicalNineBaselineChecks': 1132, 'pass3DedicatedBaselineChecks': 22,
        'totalBaselineComparisonOnly': 1154, 'plannedNewSuites': 2,
        'missingTests': [row['test'] for row in rows if not row['exists']], 'suites': rows,
        'scopeLimits': [
            'Node/VM/simulatedDOM checks do not certify browser pixels, mobile CSS or human competitive balance.',
            'Native image fidelity, sprite contours, stage/parallax captures and Shadow integration are verified separately.',
            'Counts are test cases/check records, not each assertion, action execution, CPU match or simulated frame.',
            'No historical1154 result is counted as a current PASS6 success without executing its distinct suite.',
        ],
    }


def input_snapshot(root: Path) -> dict:
    paths = set()
    for directory, extensions in [
        ('src', {'.js', '.json'}), ('data', {'.json', '.js'}),
        ('modules', {'.html', '.js'}), ('assets/combat-sprites', {'.png', '.json'}),
        ('tests', {'.cjs', '.js'}),
    ]:
        base = root / directory
        if base.is_dir():
            paths.update(p for p in base.rglob('*') if p.is_file() and p.suffix in extensions)
    for name in ['docs/ALBUM_354_RECITS_ILLUSTRES_v0.56.html', 'docs/ALBUM_LOCAL_354_RECITS_v0.56.html']:
        path = root / name
        if path.is_file():
            paths.add(path)
    return {str(path.relative_to(root)): sha(path.read_bytes()) for path in sorted(paths)}


def protect_reports(root: Path, run_dir: Path, recovery: Path, output_base: Path) -> tuple[list[dict], dict[Path, bytes | None]]:
    """Copy exact originals first. Absent originals are tracked for restoration."""
    rows = []
    originals = {}
    sources = [(root / 'tests' / report, Path('tests') / report)
               for _, _, report, _ in SUITES if report]
    for suffix in ['.json', '.md']:
        path = output_base.with_suffix(suffix)
        if path.is_file():
            sources.append((path, Path('prior-pass6-summary') / path.name))
    for source, relative in sources:
        raw = source.read_bytes() if source.is_file() else None
        if relative.parts[0] == 'tests':
            originals[source] = raw
        row = {'source': str(source), 'existsBefore': raw is not None, 'relative': str(relative)}
        if raw is not None:
            for target in [run_dir / 'prior-reports' / relative, recovery / relative]:
                target.parent.mkdir(parents=True, exist_ok=True)
                if target.exists():
                    raise RuntimeError('Immutable backup collision: ' + str(target))
                target.write_bytes(raw)
                if sha(target.read_bytes()) != sha(raw):
                    raise RuntimeError('Backup SHA mismatch: ' + str(target))
            row.update(bytes=len(raw), sha256=sha(raw), exactRecoveryCopy=str(recovery / relative))
        rows.append(row)
    manifest = {'allBackupsShaVerified': True, 'reports': rows}
    dump(run_dir / 'BEFORE_QA_REPORT_MANIFEST.json', manifest)
    dump(recovery / 'BEFORE_QA_REPORT_MANIFEST.json', manifest)
    return rows, originals


def parse_counts(stdout: str, report: dict | None) -> dict:
    """Use one authoritative case-count source; never add JSON and TAP totals."""
    stdout = re.sub(r'\x1b\[[0-9;]*m', '', stdout)
    if report is not None:
        passed, failed = report.get('passed'), report.get('failed')
        tests = report.get('tests', report.get('unitTests'))
        if tests is None and isinstance(passed, int) and isinstance(failed, int):
            tests = passed + failed
        if all(isinstance(n, int) and n >= 0 for n in [tests, passed, failed]):
            if tests != passed + failed:
                raise ValueError('Fresh report counts do not add up')
            return {'tests': tests, 'passed': passed, 'failed': failed, 'countSource': 'fresh-generated-JSON'}
        raise ValueError('Fresh generated report does not contain usable counts')
    found = {}
    for label in ['tests', 'pass', 'fail', 'cancelled', 'skipped', 'todo']:
        matches = re.findall(r'^(?:#|ℹ)\s+' + label + r'\s+(\d+)\s*$', stdout, re.M)
        if matches:
            if len(matches) != 1:
                raise ValueError('Multiple TAP summaries would double count ' + label)
            found[label] = int(matches[0])
    if all(k in found for k in ['tests', 'pass', 'fail']):
        accounted = sum(found.get(key, 0) for key in ['pass', 'fail', 'cancelled', 'skipped', 'todo'])
        if found['tests'] != accounted:
            raise ValueError('TAP counts do not add up')
        return {'tests': found['tests'], 'passed': found['pass'], 'failed': found['fail'],
                'cancelled': found.get('cancelled', 0), 'skipped': found.get('skipped', 0),
                'todo': found.get('todo', 0), 'countSource': 'direct-node-TAP-or-spec-final-summary'}
    # Some future direct suites may print their own simple one-line JSON summary.
    for line in reversed(stdout.splitlines()):
        try:
            value = json.loads(line)
        except (json.JSONDecodeError, ValueError):
            continue
        if isinstance(value, dict) and all(isinstance(value.get(k), int) for k in ['tests', 'passed', 'failed']):
            if value['tests'] != value['passed'] + value['failed']:
                raise ValueError('Printed JSON counts do not add up')
            return {**{k: value[k] for k in ['tests', 'passed', 'failed']}, 'countSource': 'fresh-stdout-JSON'}
    raise ValueError('No current count summary; old reports cannot substitute for an executed suite')


def run_suite(root: Path, run_dir: Path, node: str, spec: tuple, timeout: float) -> dict:
    name, scope, report_name, baseline_count = spec
    test = root / 'tests' / name
    command = [node, str(test)]
    row = {'test': str(test), 'scope': scope, 'command': command,
           'testSourceSha256': sha(test.read_bytes()),
           'previousDeliveredCaseCountForComparisonOnly': baseline_count,
           'tests': 0, 'passed': 0, 'failed': 0,
           'environment': 'Direct Node with shipped source; VM/DOM simulations where authored, no real-browser claim'}
    start_wall_ns = time.time_ns()
    start = time.monotonic()
    timed_out = False
    proc = subprocess.Popen(command, cwd=root, stdout=subprocess.PIPE, stderr=subprocess.PIPE,
                            text=True, start_new_session=True)
    try:
        stdout, stderr = proc.communicate(timeout=timeout)
    except subprocess.TimeoutExpired:
        timed_out = True
        os.killpg(proc.pid, signal.SIGKILL)
        stdout, stderr = proc.communicate()
    row.update(exitCode=proc.returncode, timedOut=timed_out, elapsedSeconds=time.monotonic() - start)
    stdout_path = run_dir / 'logs' / (name + '.stdout.log')
    stderr_path = run_dir / 'logs' / (name + '.stderr.log')
    stdout_path.parent.mkdir(parents=True, exist_ok=True)
    stdout_path.write_text(stdout, encoding='utf-8')
    stderr_path.write_text(stderr, encoding='utf-8')
    row.update(stdoutLog=str(stdout_path), stderrLog=str(stderr_path),
               stdoutSha256=sha(stdout_path.read_bytes()), stderrSha256=sha(stderr_path.read_bytes()))
    fresh_report = None
    if report_name:
        source_report = root / 'tests' / report_name
        if source_report.is_file() and source_report.stat().st_mtime_ns >= start_wall_ns:
            raw = source_report.read_bytes()
            target = run_dir / 'generated-reports' / report_name
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_bytes(raw)
            row.update(freshReport=str(target), freshReportSha256=sha(raw), freshReportCaptured=True)
            try:
                fresh_report = json.loads(raw)
            except (ValueError, json.JSONDecodeError) as error:
                row['countError'] = 'Generated report parse failed: ' + str(error)
        else:
            row['countError'] = 'Historical report was not freshly written by this invocation'
    try:
        if 'countError' not in row:
            row.update(parse_counts(stdout, fresh_report))
    except ValueError as error:
        row['countError'] = str(error)
    row['suiteSucceeded'] = (row['exitCode'] == 0 and not timed_out and 'countError' not in row
                             and row['tests'] > 0 and row['failed'] == 0
                             and row.get('cancelled', 0) == 0 and row.get('skipped', 0) == 0
                             and row.get('todo', 0) == 0)
    return row


def restore_reports(originals: dict[Path, bytes | None]) -> list[dict]:
    rows = []
    for path, raw in originals.items():
        if raw is None:
            # This is only a freshly generated known test-report path, never source artwork.
            if path.exists():
                path.unlink()
            rows.append({'file': str(path), 'restoredOriginallyAbsent': not path.exists()})
        else:
            if not path.exists() or path.read_bytes() != raw:
                path.write_bytes(raw)
            rows.append({'file': str(path), 'bytes': len(raw), 'sha256': sha(raw),
                         'restoredByteExact': path.read_bytes() == raw})
    return rows


def render_markdown(report: dict) -> str:
    total = report['totals']
    lines = [
        '# CQC PASS6 — contrôles core',
        '',
        f"{total['passed']} cas passent sur {total['tests']} exécutés ; {total['failed']} échouent.",
        f"{total['suites']} suites distinctes, {total['successfulSuites']} réussies. Tous les chiffres proviennent de cette exécution.",
        '',
        '| Suite | Cas | Passent | Échouent | Exit | État |',
        '| --- | ---: | ---: | ---: | ---: | --- |',
    ]
    for row in report['suites']:
        lines.append(f"| {Path(row['test']).name} | {row['tests']} | {row['passed']} | {row['failed']} | {row['exitCode']} | {'PASS' if row['suiteSucceeded'] else 'FAIL'} |")
    lines += [
        '',
        'Les sept rapports historiques ont été sauvegardés avant exécution puis restaurés byte pour byte. Les résultats neufs, sorties et SHA restent dans le dossier PASS6 propre à cette exécution.',
        '',
        f"Entrées stables pendant les tests : {report['inputsUnchangedDuringRun']}.",
        'Le moteur réel et les fonctions livrées sont évalués par Node ; certains contrôles utilisent un DOM/Canvas simulé. Ces résultats ne certifient pas les pixels du navigateur, le rendu mobile, les références artistiques ou l’équilibrage humain.',
        'Captures natives, stages/parallaxe et intégration Shadow sont vérifiés séparément. Les assertions internes, commandes, matches CPU et frames simulées ne gonflent pas le nombre de cas.',
        '',
        f"Dossier de preuves : {report['runDirectory']}",
        f"Manifeste des sauvegardes : {report['beforeQaManifest']}",
    ]
    if report.get('runnerError'):
        lines += ['', 'Erreur du runner : ' + report['runnerError']]
    if report['changedInputs']:
        lines += ['', 'Fichiers modifiés pendant les contrôles :'] + ['- ' + item['file'] for item in report['changedInputs']]
    return '\n'.join(lines) + '\n'


def execute(args: argparse.Namespace) -> int:
    root = args.root.resolve()
    readiness = plan(root)
    if readiness['missingTests']:
        raise RuntimeError('Refusing partial QA; missing test files: ' + ', '.join(readiness['missingTests']))
    node = shutil.which(args.node)
    if not node:
        raise RuntimeError('Node executable unavailable: ' + args.node)
    stamp = datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%SZ')
    run_id = stamp + '-' + uuid.uuid4().hex[:8]
    run_dir = args.output.parent / (args.output.name + '-logs') / ('run-' + run_id)
    recovery = root / 'recovery' / 'pass6-before-core-qa' / run_id
    run_dir.mkdir(parents=True, exist_ok=False)
    recovery.mkdir(parents=True, exist_ok=False)
    dump(run_dir / 'plan.json', readiness)
    backup_rows, originals = protect_reports(root, run_dir, recovery, args.output)
    before = input_snapshot(root)
    dump(run_dir / 'inputs-before.json', before)
    suites = []
    runner_error = None
    try:
        for spec in SUITES:
            result = run_suite(root, run_dir, node, spec, args.timeout)
            suites.append(result)
            dump(run_dir / 'execution-results.partial.json', suites)
            print(json.dumps({'suite': Path(result['test']).name, 'tests': result['tests'],
                              'passed': result['passed'], 'failed': result['failed'],
                              'exitCode': result['exitCode'], 'suiteSucceeded': result['suiteSucceeded']}), flush=True)
    except Exception as error:
        runner_error = type(error).__name__ + ': ' + str(error)
    finally:
        restored = restore_reports(originals)
    after = input_snapshot(root)
    dump(run_dir / 'inputs-after.json', after)
    changed = [{'file': name, 'before': before.get(name), 'after': after.get(name)}
               for name in sorted(before.keys() | after.keys()) if before.get(name) != after.get(name)]
    all_restored = all(row.get('restoredByteExact', row.get('restoredOriginallyAbsent', False)) for row in restored)
    totals = {
        'suites': len(suites), 'plannedSuites': len(SUITES),
        'tests': sum(row['tests'] for row in suites), 'passed': sum(row['passed'] for row in suites),
        'failed': sum(row['failed'] for row in suites),
        'successfulSuites': sum(bool(row['suiteSucceeded']) for row in suites),
        'allExitCodesZero': all(row['exitCode'] == 0 for row in suites),
        'baselineCurrentCases': sum(row['tests'] for row in suites[:14]),
        'newPass6CurrentCases': sum(row['tests'] for row in suites[14:]),
        'noHistoricalResultsReusedOrDoubleCounted': True,
    }
    success = (not runner_error and len(suites) == len(SUITES)
               and totals['successfulSuites'] == len(SUITES) and not changed and all_restored)
    report = {
        'date': datetime.now(timezone.utc).isoformat(), 'scope': 'CQC PASS6 fresh execution of sixteen distinct core suites',
        'runDirectory': str(run_dir), 'suites': suites, 'totals': totals,
        'runnerError': runner_error, 'passedAllChecks': success,
        'beforeQaManifest': str(recovery / 'BEFORE_QA_REPORT_MANIFEST.json'),
        'historicalReportBackups': backup_rows, 'reportRestoration': restored,
        'allHistoricalReportsRestoredByteExact': all_restored,
        'inputShaBefore': before, 'inputShaAfter': after,
        'inputsUnchangedDuringRun': not changed, 'changedInputs': changed,
        'baselineComparisonOnly': {'historicalNineSuiteCases': 1132, 'pass3FidelityCases': 22, 'pass4FidelityAndArtCases': 20, 'pass5FidelityAndArtCases': 21, 'total': 1195},
        'countingRule': 'One fresh case/check per distinct suite invocation; JSON and TAP alternatives never added together.',
        'scopeLimits': readiness['scopeLimits'],
    }
    dump(run_dir / 'execution-results.json', suites)
    dump(run_dir / 'report.json', report)
    dump(args.output.with_suffix('.json'), report)
    markdown = render_markdown(report)
    (run_dir / 'report.md').write_text(markdown, encoding='utf-8')
    args.output.with_suffix('.md').write_text(markdown, encoding='utf-8')
    print(json.dumps({'report': str(args.output.with_suffix('.json')), 'totals': totals,
                      'passedAllChecks': success, 'inputsUnchangedDuringRun': not changed}), flush=True)
    return 0 if success else 1


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', type=Path, default=DEFAULT_ROOT)
    parser.add_argument('--output', type=Path, default=DEFAULT_OUTPUT)
    parser.add_argument('--node', default='node')
    parser.add_argument('--timeout', type=float, default=240)
    parser.add_argument('--execute', action='store_true',
                        help='Run only after the parent/root announces that production source is frozen.')
    args = parser.parse_args()
    if not args.execute:
        print(json.dumps(plan(args.root.resolve()), ensure_ascii=False, indent=2))
        return 0
    if args.timeout <= 0:
        parser.error('--timeout must be positive')
    try:
        return execute(args)
    except Exception as error:
        print(json.dumps({'runnerError': type(error).__name__ + ': ' + str(error),
                          'passedAllChecks': False}), file=sys.stderr)
        return 2


if __name__ == '__main__':
    raise SystemExit(main())
