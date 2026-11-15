#!/usr/bin/env python3
"""PASS6 standalone actual engine/native Canvas QA; preparation never serves."""
from pathlib import Path
import argparse,functools,http.server,importlib.util,json,threading
spec=importlib.util.spec_from_file_location('p6common','/workspace/cqc-pass6-browser-common.py');C=importlib.util.module_from_spec(spec);spec.loader.exec_module(C)
def run(out):
 out.mkdir(parents=True,exist_ok=False);server=None;b=C.Browser(out,'p6game');failure=None;base=None;before=None
 class Handler(http.server.SimpleHTTPRequestHandler):
  def log_message(self,*_):pass
  def do_GET(self):
   if self.path=='/favicon.ico':self.send_response(204);self.end_headers();return
   super().do_GET()
 try:
  before=C.pin_source();b.save('source-inputs-before.json',before)
  server=http.server.ThreadingHTTPServer(('127.0.0.1',0),functools.partial(Handler,directory=str(C.SOURCE)));threading.Thread(target=server.serve_forever,daemon=True).start();base='http://127.0.0.1:'+str(server.server_port)
  b.call('set','viewport','1280','800');b.initial(base+'/modules/unified-versus-v055.html','CQC')
  ready=b.record('all22-native-bodies-and-props-ready',C.ready_js());b.save('final-native-assets.json',ready)
  for width,height in [(1280,800),(390,844)]:b.call('set','viewport',str(width),str(height));C.gameplay_checks(b,width)
  errors=b.call('errors');console=b.call('console');assert not errors.get('errors');b.checks.append({'name':'final-browser-errors-empty','result':errors})
  after=C.pin_source();b.save('source-inputs-after.json',after);assert before==after,'Source changed during frozen browser QA';b.checks.append({'name':'frozen-source-inputs-byte-exact-through-run','result':{'count':len(before),'match':True}})
 except Exception as e:
  failure=repr(e)
  try:b.screenshot('failure-state')
  except Exception:pass
  raise
 finally:
  b.close()
  if server:server.shutdown();server.server_close()
  report={'schema':'cqc.pass6.actual-gameplay-browser/1','status':'failed'if failure else'passed','failure':failure,'baseURL':base,'ownedBrowserSession':b.session,'checks':b.checks,'commands':b.commands,'observed':C.observed_counts(b.checks),'pageErrors':locals().get('errors'),'console':locals().get('console'),'viewports':[1280,390],'cleanup':{'ownedHTTPServerClosed':server is not None},'limits':'Actual standalone simulation, native source matrix alignment, forward-glove/bow/Mosin/flamethrower origins, native hornet/bolt/fire/optional grenade effects, finite ammunition, two-hit insect barrier, camouflage human collision and heat/one-nappe bounds. Human hurtbox/crouch contacts physically simulated; no full campaign or physical-device certification.'};b.save('verification.json',report)
 print(json.dumps({'status':'passed','observed':C.observed_counts(b.checks),'commands':len(b.commands)},ensure_ascii=False),flush=True)
def main():
 p=argparse.ArgumentParser(description=__doc__);p.add_argument('--run-after-standalone-freeze',action='store_true');p.add_argument('--output',type=Path,default=Path('/workspace/cqc-pass6-gameplay-browser'));a=p.parse_args()
 if a.run_after_standalone_freeze:run(a.output)
 else:print(json.dumps({'status':'plan_only','needsRootStandaloneFrozenSignal':True,'output':str(a.output)}))
if __name__=='__main__':main()
