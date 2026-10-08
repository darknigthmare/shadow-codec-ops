import argparse,concurrent.futures,datetime,hashlib,json,pathlib,ssl,urllib.request
p=argparse.ArgumentParser();p.add_argument('--deployment-ready',required=True);args=p.parse_args()
root=pathlib.Path('/workspace/cqc-pass19-production-checks');app=pathlib.Path('/tmp/cqc-pass19-application/public/cqc');origin='https://shadow-codec-ops.vercel.app'
stamp=datetime.datetime.now(datetime.timezone.utc).isoformat().replace(':','-');out=root/('http-'+stamp);out.mkdir()
sha=lambda b:hashlib.sha256(b).hexdigest();manifest=(app/'runtime-manifest.json').read_bytes();expected=json.loads(manifest)
assert sha(manifest)=='71f78c94af131f40f40dddf150a65e6cd80394c3c1e9a1c0473837f714a45560'
ctx=ssl.create_default_context();report={'schema':'cqc.pass19.production-http-byte-integrity/1','startedAt':stamp,'origin':origin,'readySignal':args.deployment_ready,'tls':'Python ssl.create_default_context with chain and hostname validation enabled; inherited session proxy; no TLS bypass or trust-store edits.','sourceCommit':'4cf0e71d9c7486ef63745e5f270c88da2847c18e','files':[],'failures':[]}
def fetch(path,pin=None):
 url=origin+'/cqc/'+urllib.parse.quote(path,safe='/');req=urllib.request.Request(url,headers={'Cache-Control':'no-cache','Accept-Encoding':'identity'});h=hashlib.sha256();n=0
 with urllib.request.urlopen(req,context=ctx,timeout=90) as r:
  status=r.status;headers=dict(r.headers);urlFinal=r.url
  while True:
   b=r.read(1024*1024)
   if not b:break
   n+=len(b);h.update(b)
 actual={'path':path,'url':urlFinal,'status':status,'bytes':n,'sha256':h.hexdigest(),'contentType':headers.get('Content-Type'),'vercelCache':headers.get('X-Vercel-Cache')}
 if pin:assert n==pin['bytes'] and h.hexdigest()==pin['sha256'],json.dumps({'expected':pin,'actual':actual})
 assert status==200
 return actual
try:
 report['manifest']=fetch('runtime-manifest.json',{'bytes':len(manifest),'sha256':sha(manifest)});report['runtime']={'fileCount':len(expected['files']),'totalBytes':expected['totalBytes']}
 critical={'index.html','modules/core-v032.html','modules/unified-versus-v055.html','src/cqc-pass8-combat-engine.js','src/cqc-sprite-renderer.js','src/cqc-pass18-machine-bridge.js','src/cqc-pass17-costumes.js','src/cqc-pass17-costume-catalog.js','src/cqc-pass17-match-flow.js','src/cqc-pass17-pause.js'}
 pins=[f for f in expected['files'] if 'pass19' in f['path'] or f['path'] in critical]
 report['scope']={'paths':len(pins),'expectedBytes':sum(f['bytes'] for f in pins),'qualification':'All PASS19-named runtime paths plus shell, Core, Versus and direct engine/renderer/flow bridges; unchanged 2.4GB baseline is not redownloaded. Responses stream to hashes and are not stored.'}
 with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
  tasks={pool.submit(fetch,f['path'],f):f for f in pins}
  for job in concurrent.futures.as_completed(tasks):
   f=tasks[job]
   try:report['files'].append(job.result())
   except Exception as e:report['failures'].append({'path':f['path'],'error':str(e)})
   if len(report['files'])%25==0:print(json.dumps({'checked':len(report['files']),'total':len(pins),'failures':len(report['failures'])}),flush=True)
 report['files'].sort(key=lambda f:f['path']);report['status']='passed' if not report['failures'] and len(report['files'])==len(pins) else 'failed'
except Exception as e:report['status']='failed';report['error']=str(e)
report['finishedAt']=datetime.datetime.now(datetime.timezone.utc).isoformat();file=out/'PRODUCTION_HTTP_INTEGRITY_ACTUAL_V1.json';raw=(json.dumps(report,indent=2)+'\n').encode();file.write_bytes(raw)
print(json.dumps({'status':report['status'],'report':str(file),'sha256':sha(raw),'checked':len(report['files']),'failures':report['failures'],'error':report.get('error')}),flush=True)
raise SystemExit(0 if report['status']=='passed' else 1)
