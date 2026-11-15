#!/usr/bin/env python3
"""Execute distinct sprite tool and native contour suites after explicit freeze.

The PASS7 catalog suite belongs to the core report. It is not executed or counted
a second time here. Historical fixed count22 catalog tests remain unchanged.
"""
from __future__ import annotations
import argparse
from datetime import datetime, timezone
import hashlib
import importlib.util
import json
import os
from pathlib import Path
import re
import signal
import subprocess
import sys
import time
import uuid

SPEC=importlib.util.spec_from_file_location('pass7_guarded_core_runner',Path(__file__).with_name('run_cqc_pass7_core_qa.py'))
core=importlib.util.module_from_spec(SPEC);SPEC.loader.exec_module(core)
SUITES=[
 ('brad-validation',['node','tests/test_combat_sprite_pass4_validation.cjs'],2),
 ('renderer',['node','tests/test_combat_sprite_renderer.cjs'],22),
 ('importer',['python','-m','unittest','discover','-s','tests','-p','test_prepare_combat_sprite.py','-v'],6),
 ('brad-importer',['python','-m','unittest','discover','-s','tests','-p','test_prepare_combat_sprite_pass4.py','-v'],2),
 ('native-contours',['python','tests/test_combat_sprite_contours_pass7.py','-v'],3),
]
REPORTS=[row[2] for row in core.SUITES if row[2]]

def report_pins(root):
 return {name:core.sha((root/'tests'/name).read_bytes()) if (root/'tests'/name).is_file() else None for name in REPORTS}

def plan(root):
 rows=[]
 for label,command,count in SUITES:
  file=next((word for word in command if word.startswith('tests/')),None)
  if not file:file='tests/'+command[command.index('-p')+1]
  p=root/file
  rows.append({'label':label,'command':command,'testSource':str(p),'testSourceSha256':core.sha(p.read_bytes()) if p.is_file() else None,'expectedCaseCount':count,'exists':p.is_file()})
 return {'mode':'plan_only_no_tests_executed','root':str(root),'distinctSuites':len(rows),'plannedCasesForComparisonOnly':sum(row[2] for row in SUITES),'suites':rows,'excludedCatalogSuite':'tests/test_combat_sprite_catalog_pass7.cjs is freshly executed once in the core report; no duplicate case count here.'}

def execute(args):
 root=args.root.resolve();pins=core.freeze_pins(args,root);p=plan(root)
 if any(not r['exists'] for r in p['suites']):raise RuntimeError('A planned suite source is missing')
 stamp=datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%SZ')+'-'+uuid.uuid4().hex[:8]
 out=args.output.parent/(args.output.name+'-logs')/('run-'+stamp);out.mkdir(parents=True,exist_ok=False);core.dump(out/'plan.json',p)
 before=core.input_snapshot(root);prior_reports=report_pins(root);core.dump(out/'inputs-before.json',before);rows=[];runner_error=None
 try:
  for label,command,count in SUITES:
   start=time.monotonic();proc=subprocess.Popen(command,cwd=root,text=True,stdout=subprocess.PIPE,stderr=subprocess.PIPE,start_new_session=True);timed=False
   try:stdout,stderr=proc.communicate(timeout=args.timeout)
   except subprocess.TimeoutExpired:
    timed=True;os.killpg(proc.pid,signal.SIGKILL);stdout,stderr=proc.communicate()
   logs={};
   for channel,value in [('stdout',stdout),('stderr',stderr)]:
    file=out/'logs'/(label+'.'+channel+'.log');file.parent.mkdir(parents=True,exist_ok=True);file.write_text(value);logs[channel+'Log']=str(file);logs[channel+'Sha256']=core.sha(file.read_bytes())
   row={'label':label,'command':command,'exitCode':proc.returncode,'timedOut':timed,'elapsedSeconds':time.monotonic()-start,'expectedCaseCount':count,**logs,'tests':0,'passed':0,'failed':0}
   try:
    if command[0]=='node':row.update(core.parse_counts(stdout,None))
    else:
     matches=re.findall(r'^Ran\s+(\d+)\s+tests?\s+in\s+',stderr,re.M)
     if len(matches)!=1:raise ValueError('Exactly one fresh unittest summary required')
     n=int(matches[0]);ok=bool(re.search(r'^OK\s*$',stderr,re.M));failure=re.search(r'^FAILED\s+\(([^)]+)\)',stderr,re.M)
     failed=sum(int(v) for v in re.findall(r'(?:failures|errors)=(\d+)',failure.group(1))) if failure else (0 if ok else n)
     row.update(tests=n,passed=n-failed,failed=failed,countSource='fresh-python-unittest-final-summary')
   except Exception as error:row['countError']=str(error)
   row['suiteSucceeded']=proc.returncode==0 and not timed and 'countError' not in row and row['tests']==count and row['failed']==0
   rows.append(row);core.dump(out/'execution-results.partial.json',rows);print(json.dumps({k:row[k] for k in ['label','tests','passed','failed','exitCode','suiteSucceeded']}),flush=True)
 except Exception as error:runner_error=type(error).__name__+': '+str(error)
 after=core.input_snapshot(root);after_reports=report_pins(root);core.dump(out/'inputs-after.json',after)
 changed=[{'file':name,'before':before.get(name),'after':after.get(name)}for name in sorted(before.keys()|after.keys())if before.get(name)!=after.get(name)]
 totals={'suites':len(rows),'plannedSuites':len(SUITES),'tests':sum(r['tests'] for r in rows),'passed':sum(r['passed'] for r in rows),'failed':sum(r['failed'] for r in rows),'successfulSuites':sum(r['suiteSucceeded'] for r in rows)}
 success=not runner_error and len(rows)==len(SUITES) and all(r['suiteSucceeded'] for r in rows) and not changed and prior_reports==after_reports
 report={'schema':'cqc.pass7.native-sprite-tool-qa/1','date':datetime.now(timezone.utc).isoformat(),'success':success,'passedAllChecks':success,'tests':totals['tests'],'totals':totals,'runs':rows,'suites':rows,'runDirectory':str(out),'explicitFreezePins':pins,'runnerError':runner_error,'inputsUnchangedDuringRun':not changed,'changedInputs':changed,'historicalReportsUnchanged':prior_reports==after_reports,'historicalReportShaBefore':prior_reports,'historicalReportShaAfter':after_reports,'scopeLimits':['Opaque components are connected original native alpha >80 bodies. Transparent fringes and artistic identity are separately physically reviewed in real browser captures.','Native PNGs are only read and measured. Renderer/importer unit tests use independent temporary fixtures, never mutate production artwork.','The fresh core catalog suite is intentionally not repeated or counted here.']}
 core.dump(out/'report.json',report);core.dump(args.output.with_suffix('.json'),report);print(json.dumps({'report':str(args.output.with_suffix('.json')),'totals':totals,'passedAllChecks':success}),flush=True);return 0 if success else 1

def main():
 parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('--root',type=Path,default=core.DEFAULT_ROOT);parser.add_argument('--output',type=Path,default=Path('/workspace/cqc-pass7-sprite-qa'));parser.add_argument('--timeout',type=float,default=240)
 parser.add_argument('--catalog-sha256');parser.add_argument('--helper-sha256');parser.add_argument('--origins-sha256');parser.add_argument('--execute',action='store_true');args=parser.parse_args()
 if not args.execute:print(json.dumps(plan(args.root.resolve()),indent=2));return 0
 try:return execute(args)
 except Exception as error:print(json.dumps({'passedAllChecks':False,'runnerError':type(error).__name__+': '+str(error)}),file=sys.stderr);return 2

if __name__=='__main__':raise SystemExit(main())
