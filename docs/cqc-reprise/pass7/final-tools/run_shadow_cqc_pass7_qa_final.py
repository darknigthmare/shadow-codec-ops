#!/usr/bin/env python3
"""Run the authorised final Shadow QA once after final root sync; keep exact log and exit."""
from pathlib import Path
import argparse,datetime,hashlib,json,re,subprocess,sys
ROOT=Path('/workspace/shadow-codec-recovered')
LOG=Path('/workspace/shadow-cqc-pass7-final-qa.log')
REPORT=Path('/workspace/shadow-cqc-pass7-final-npm-qa.json')
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def main():
 p=argparse.ArgumentParser(description=__doc__);p.add_argument('--run-after-final-sync',action='store_true');args=p.parse_args()
 if not args.run_after_final_sync:print('Prepared final npm QA only; no process launched.');return
 if LOG.exists() or REPORT.exists():raise FileExistsError('Do not overwrite prior PASS7 QA evidence.')
 manifest=ROOT/'public/cqc/runtime-manifest.json';before=sha(manifest);data=json.loads(manifest.read_text())
 inputs={e['path']:sha(ROOT/'public/cqc'/e['path']) for e in data['files']}
 for e in data['files']:assert inputs[e['path']]==e['sha256']
 started=datetime.datetime.now(datetime.timezone.utc).isoformat()
 print('Running final npm run qa; exact output -> '+str(LOG),flush=True)
 with LOG.open('xb') as log:r=subprocess.run(['npm','run','qa'],cwd=ROOT,stdout=log,stderr=subprocess.STDOUT,timeout=300)
 text=re.sub(r'\x1b\[[0-?]*[ -/]*[@-~]','',LOG.read_text(errors='replace'))
 files=re.search(r'Test Files\s+(\d+) passed\s*\((\d+)\)',text)
 tests=re.search(r'(?<!File)Tests\s+(\d+) passed\s*\((\d+)\)',text)
 steps={'cqcCopyVerify':'> node scripts/sync-cqc-runtime.mjs --verify' in text,'typescriptNoEmit':'> tsc --noEmit' in text,'vitest':'vitest run' in text,'typescriptBuildAndVite':'> tsc -b && vite build' in text,'pwaCheck':'> node scripts/check-pwa.mjs' in text}
 stable=sha(manifest)==before and all(sha(ROOT/'public/cqc'/name)==value for name,value in inputs.items())
 passed=r.returncode==0 and files and tests and all(steps.values()) and stable
 report={'status':'passed' if passed else 'failed','startedAt':started,'finishedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'command':['npm','run','qa'],'cwd':str(ROOT),'exitCode':r.returncode,'log':str(LOG),'logSHA256':sha(LOG),'stepsObserved':steps,'testCounts':{'passedFiles':int(files.group(1)) if files else None,'totalFiles':int(files.group(2)) if files else None,'passedTests':int(tests.group(1)) if tests else None,'totalTests':int(tests.group(2)) if tests else None},'runtime':{'manifest':str(manifest),'manifestSHA256':before,'files':len(data['files']),'totalBytes':data['totalBytes'],'referenceEdges':len(data['references']),'inputPayloadSHA256StableDuringQA':stable},'freshRun':True,'oldQAResultsReused':False}
 with REPORT.open('x') as f:f.write(json.dumps(report,indent=2)+'\n')
 print(json.dumps(report,indent=2),flush=True)
 if not passed:sys.exit(r.returncode or 1)
if __name__=='__main__':main()
