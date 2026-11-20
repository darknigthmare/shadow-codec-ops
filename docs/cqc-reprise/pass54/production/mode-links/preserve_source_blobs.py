from pathlib import Path
import json,hashlib,base64,subprocess,concurrent.futures,datetime
R='darknigthmare/shadow-codec-ops';P=Path('/tmp/cqc-p54-20261120/project');O=Path('/tmp/cqc-p54-20261120/production/mode-links')
files=['public/cqc/src/cqc-p54-mode-scenes.js','public/cqc/modules/core-v032.html','public/cqc/modules/arcade-chronicles-v055.html','public/cqc/modules/combat-academy-v053.html','scripts/test-cqc-p54-mode-scenes.mjs']
def api(endpoint,payload=None):
 args=['gh','api','repos/'+R+'/'+endpoint]
 if payload is not None:args+=['--method','POST','--input','-']
 r=subprocess.run(args,input=json.dumps(payload).encode()if payload is not None else None,capture_output=True,timeout=120)
 assert r.returncode==0,r.stderr.decode()[:800]
 return json.loads(r.stdout)
def pin(name):
 b=(P/name).read_bytes();oid=hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()
 d=api('git/blobs',{'encoding':'base64','content':base64.b64encode(b).decode()});assert d['sha']==oid
 returned=api('git/blobs/'+oid);assert base64.b64decode(returned['content'])==b
 old=subprocess.run(['git','ls-tree','HEAD','--',name],cwd=P,capture_output=True,text=True).stdout.strip()
 return {'path':name,'source':str(P/name),'bytes':len(b),'sha256':hashlib.sha256(b).hexdigest(),'gitBlobOID':oid,'baseGitBlobOID':old.split()[2]if old else None,'readbackExact':True,'branchesChanged':False,'commitsCreated':0}
with concurrent.futures.ThreadPoolExecutor(max_workers=3)as pool:rows=list(pool.map(pin,files))
r={'schema':'cqc.p54.mode-link-source-preservation/1','atUTC':datetime.datetime.now(datetime.timezone.utc).isoformat(),'baseCommit':'04221faf7933b4a33cf63e3859533639f010723e','scope':'Git blob objects only, with exact base64 readback; no tree, commit or branch reference mutations. Core also includes Root Oil Fence and machine bootstrap tags already present at readback time.','rows':rows}
(O/'P54_MODE_LINK_SOURCE_BLOBS_PRIVATE_V1.json').write_text(json.dumps(r,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(r,ensure_ascii=False))
