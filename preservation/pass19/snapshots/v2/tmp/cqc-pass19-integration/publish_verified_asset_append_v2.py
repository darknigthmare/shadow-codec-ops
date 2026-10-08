import pathlib,json,hashlib,base64,importlib.util,concurrent.futures
out=pathlib.Path('/workspace/cqc-pass19-asset-preservation')
import sys
planPath=pathlib.Path(sys.argv[1]); plan=json.loads(planPath.read_text()); assert plan['parentPolicy']=='expected-fast-forward'
expectedParent=plan['expectedParent']; assert len(expectedParent)==40
receiptName=plan['receiptName']
helper='/workspace/cqc-pass9-publication-preparation/publish_verified_shadow_cqc_pass9.py'
spec=importlib.util.spec_from_file_location('verified_publication_helper',helper);helperModule=importlib.util.module_from_spec(spec);spec.loader.exec_module(helperModule)
api=helperModule.api
sha=lambda b:hashlib.sha256(b).hexdigest()
blobsha=lambda b:hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()
assert api('GET','git/ref/heads/'+plan['branch'])['object']['sha']==expectedParent
parent=api('GET','git/commits/'+expectedParent);previousTree=parent['tree']['sha']
previous=api('GET','git/trees/'+previousTree+'?recursive=1');assert not previous.get('truncated')
previousFiles={r['path']:r['sha'] for r in previous['tree'] if r['type']=='blob'}
assert not set(previousFiles)&{r['path'] for r in plan['files']}
def upload(row):
 b=pathlib.Path(row['localPath']).read_bytes();assert len(b)==row['bytes'] and sha(b)==row['sha256']
 x=api('POST','git/blobs',{'encoding':'base64','content':base64.b64encode(b).decode()});assert x['sha']==blobsha(b)
 remote=api('GET','git/blobs/'+x['sha']);rb=base64.b64decode(remote['content']);assert rb==b and sha(rb)==row['sha256']
 result={**row,'gitBlobSHA1':x['sha'],'remoteBytesVerified':True,'remoteSHA256':sha(rb)}
 return result
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as executor:rows=list(executor.map(upload,plan['files']))
tree=api('POST','git/trees',{'base_tree':previousTree,'tree':[{'path':r['path'],'mode':'100644','type':'blob','sha':r['gitBlobSHA1']} for r in rows]})
actual=api('GET','git/trees/'+tree['sha']+'?recursive=1');assert not actual.get('truncated')
expected={**previousFiles,**{r['path']:r['gitBlobSHA1'] for r in rows}};assert {r['path']:r['sha'] for r in actual['tree'] if r['type']=='blob'}==expected
commit=api('POST','git/commits',{'message':plan['commitMessage'],'tree':tree['sha'],'parents':[expectedParent]})
remote=api('GET','git/commits/'+commit['sha']);assert remote['tree']['sha']==tree['sha'] and [p['sha'] for p in remote['parents']]==[expectedParent]
assert api('GET','git/ref/heads/'+plan['branch'])['object']['sha']==expectedParent
api('PATCH','git/refs/heads/'+plan['branch'],{'sha':commit['sha'],'force':False})
assert api('GET','git/ref/heads/'+plan['branch'])['object']['sha']==commit['sha']
receipt={'schema':'cqc.asset-preservation-actual/1','status':'published-and-byte-verified','repository':plan['repository'],'branch':plan['branch'],'commit':commit['sha'],'parent':expectedParent,'tree':tree['sha'],'commitURL':'https://github.com/'+plan['repository']+'/commit/'+commit['sha'],'immutableAssetBaseURL':'https://raw.githubusercontent.com/'+plan['repository']+'/'+commit['sha']+'/','files':rows,'sourceEvictions':0,'sourcePixelsChanged':False,'qualification':plan['qualification']}
p=out/receiptName
with p.open('x') as f:json.dump(receipt,f,indent=2,ensure_ascii=False)
print(json.dumps({'status':receipt['status'],'commit':commit['sha'],'receipt':str(p),'sha256':sha(p.read_bytes()),'verifiedFiles':len(rows)}),flush=True)
