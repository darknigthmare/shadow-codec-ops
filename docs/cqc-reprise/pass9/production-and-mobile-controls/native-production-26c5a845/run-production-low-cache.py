"""Run the closed PASS9 browser verifier with bounded Chromium disk caches only."""
import argparse, hashlib, importlib.util, json, pathlib, re, sys
sys.dont_write_bytecode=True
ROOT=pathlib.Path('/workspace/cqc-pass9-browser-preparation')
RUNNER=ROOT/'verify-pass9-browser.py'
RUNNER_SHA='5f65941671ce119b2130caafd123fb2434e533d2e111e75f3bdb86674d435b05'
HTTP_SHA='c257cecdc054cddb1872c89d2c6a64b87a3f2cb0409b0fcf4d0ee5951ca3d79c'
FLAGS=['--disk-cache-size=1','--media-cache-size=1']
def digest(path):
    h=hashlib.sha256()
    with path.open('rb')as f:
        while chunk:=f.read(1<<20):h.update(chunk)
    return h.hexdigest()
p=argparse.ArgumentParser()
p.add_argument('--run-after-root-ready',action='store_true')
p.add_argument('--base');p.add_argument('--commit');p.add_argument('--label')
for name in ['manifest','source-freeze','catalog','root-ready']:
    p.add_argument('--'+name,type=pathlib.Path);p.add_argument('--'+name+'-sha256')
a=p.parse_args()
assert digest(RUNNER)==RUNNER_SHA,'Closed runner changed'
if not a.run_after_root_ready:
    print(json.dumps({'status':'prepared_not_executed','closedRunnerSHA256':RUNNER_SHA,'storageOnlyBrowserFlags':FLAGS,'productionRequests':0}));sys.exit(0)
assert a.commit and re.fullmatch('[a-f0-9]{40}',a.commit) and a.base and a.label
for name in ['manifest','source_freeze','catalog','root_ready']:
    f=getattr(a,name);sha=getattr(a,name+'_sha256');assert f and sha and re.fullmatch('[a-f0-9]{64}',sha) and digest(f)==sha,'Exact ROOT input pin differs '+name
ready=json.loads(a.root_ready.read_text());base=a.base.rstrip('/')
assert ready['schema']=='cqc-pass9-http-root-ready/v1' and ready['status']=='READY' and ready['confirmedByRoot'] is True and ready['entryCount']==43
assert ready['baseUrl']==base and ready['commit40']==a.commit and ready['canonical53MPublicationClaimMade'] is False
assert ready['tool']['sha256']==HTTP_SHA
for key,name in [('manifest','manifest'),('sourceFreeze','source_freeze')]:
    f=getattr(a,name);assert ready[key]['sha256']==getattr(a,name+'_sha256') and ready[key]['bytes']==f.stat().st_size
actual=ready['deployment'];assert actual['readyState']=='READY' and actual['readySubstate']=='PROMOTED' and actual['target']=='production' and actual['gitSha']==a.commit and actual['id'].startswith('dpl_')
spec=importlib.util.spec_from_file_location('closed_pass9_browser_readonly',RUNNER);module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
original=module.C.Browser
class BoundedDiskCacheBrowser(original):
    def __init__(self,out,tag):
        super().__init__(out,tag)
        i=self.prefix.index('--args')+1;assert self.prefix[i]=='--no-sandbox'
        self.prefix[i]+=','+','.join(FLAGS)
        source=pathlib.Path(__file__).resolve();proof={'schema':'cqc.pass9.production-browser-cache-launch/1','closedRunnerPath':str(RUNNER),'closedRunnerSHA256':RUNNER_SHA,'launcherPath':str(source),'launcherSHA256':digest(source),'actualArgv':sys.argv,'actualBrowserPrefix':self.prefix,'ownedSession':self.session,'rootREADYPath':str(a.root_ready),'rootREADYSHA256':a.root_ready_sha256,'storageOnlyFlags':FLAGS,'pageAndObserverCodeChanged':False,'applicationSourceChanged':False}
        (out/'ACTUAL_LAUNCH_PROVENANCE.json').write_text(json.dumps(proof,indent=2)+'\n')
        (out/'run-production-low-cache.py').write_bytes(source.read_bytes())
module.C.Browser=BoundedDiskCacheBrowser
try:
    module.run(base,a.commit,a.label,a.manifest,a.manifest_sha256,'production',a.source_freeze,a.source_freeze_sha256,a.catalog,a.catalog_sha256)
finally:
    assert digest(RUNNER)==RUNNER_SHA and digest(a.root_ready)==a.root_ready_sha256,'Closed source or ROOT READY drifted'
