#!/usr/bin/env python3
"""Run actual individual test files and record their reported assertion counts."""
import datetime
import hashlib
import json
from pathlib import Path
import re
import subprocess

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'preparation/combat-sprites-pass6/tool-qa-20261002-individual-counts'
OUT.mkdir(exist_ok=False)
commands = [
    ('catalog-migration', ['node', 'tests/test_combat_sprite_catalog_pass6.cjs'], 5),
    ('brad-validation', ['node', 'tests/test_combat_sprite_pass4_validation.cjs'], 2),
    ('renderer', ['node', 'tests/test_combat_sprite_renderer.cjs'], 22),
    ('importer', ['python', '-m', 'unittest', 'discover', '-s', 'tests', '-p', 'test_prepare_combat_sprite.py', '-v'], 6),
    ('brad-importer', ['python', '-m', 'unittest', 'discover', '-s', 'tests', '-p', 'test_prepare_combat_sprite_pass4.py', '-v'], 2),
    ('native-contours', ['python', 'tests/test_combat_sprite_contours_pass6.py', '-v'], 2)
]
rows = []
for label, cmd, expected in commands:
    result = subprocess.run(cmd, cwd=ROOT, text=True, capture_output=True)
    raw = (result.stdout + result.stderr).encode()
    log = OUT / (label + '.log')
    log.write_bytes(raw)
    match = re.search(r'(?:tests\s+(\d+)|Ran\s+(\d+)\s+tests)', raw.decode())
    count = int(next(v for v in match.groups() if v is not None)) if match else 0
    row = {'label': label, 'command': cmd, 'exit': result.returncode,
           'reportedTests': count, 'expectedTests': expected,
           'success': result.returncode == 0 and count == expected,
           'log': str(log.relative_to(ROOT)), 'logSHA256': hashlib.sha256(raw).hexdigest()}
    rows.append(row)
    print(json.dumps(row), flush=True)
report = {'schema': 'cqc.pass6.native-sprite-tool-qa/1',
          'at': datetime.datetime.now(datetime.timezone.utc).isoformat(),
          'success': all(row['success'] for row in rows),
          'tests': sum(row['reportedTests'] for row in rows), 'runs': rows,
          'earlierPartialRun': 'preparation/combat-sprites-pass6/tool-qa-20261002-final/verification.json',
          'notes': ['Prior partial runner retained unchanged; Node --test counted three child files and the first Python invocation ran six importer tests. Final runner records each actual test file independently and includes two Bloody Brad importer tests.']}
(OUT / 'verification.json').write_text(json.dumps(report, indent=2) + '\n')
raise SystemExit(0 if report['success'] else 1)
