from pathlib import Path
import hashlib,json,concurrent.futures
W=Path('/workspace');R=W/'cqc-game-working/cqc-versus-v056'
def sha(p):
 h=hashlib.sha256()
 with p.open('rb')as f:
  for c in iter(lambda:f.read(1048576),b''):h.update(c)
 return h.hexdigest()
def write(p,d):
 with p.open('x')as f:json.dump(d,f,ensure_ascii=False,indent=2);f.write('\n')
m=json.loads((W/'CQC_Versus_Legacy_v0.56_REPRISE_PASS5_2026-10-01.manifest.json').read_text());assert m['packagedFiles']==9079
rows=[{'path':n,'bytes':v['size'],'sha256':v['sha256']}for n,v in sorted(m['files'].items())]
def verify(row):
 p=R/row['path'];assert p.is_file()and p.stat().st_size==row['bytes']and sha(p)==row['sha256'],row['path']
with concurrent.futures.ThreadPoolExecutor(max_workers=4)as pool:list(pool.map(verify,rows))
b=W/'cqc-delivered-pass5-baseline-files.json';write(b,rows)
previous=json.loads((W/'cqc-pass5-previous-deliveries-frozen.json').read_text())['files'];current=sorted(p for p in W.iterdir()if p.is_file()and(p.suffix=='.zip'or p.name.endswith(('.manifest.json','.summary.json'))))
old={x['path']:x for x in previous};pins=[]
for p in current:
 digest=sha(p)
 if str(p)in old:assert digest==old[str(p)]['sha256']and p.stat().st_size==old[str(p)]['bytes']
 pins.append({'path':str(p),'bytes':p.stat().st_size,'sha256':digest})
write(W/'cqc-pass6-previous-deliveries-frozen.json',{'schema':'cqc.pass6.previous-deliveries/1','files':pins})
write(W/'cqc-pass6-frozen-baseline-facts.json',{'schema':'cqc.pass6.baseline-facts/1','date':'2026-10-02','sourceFiles':9079,'baselineFile':str(b),'baselineSha256':sha(b),'previousArchiveAndSidecarPins':len(pins),'pass5CQCArchiveSha256':'b6615f5fef9252ade6296b88d92cc25023905b06c7f7451ffa37fce0465138c8','pass5ShadowArchiveSha256':'563c4863405540cb6bc2335f37553a1dc3dfd222febcdccd3ec16c5fa202ef8f','publishedPASS5Commit':'a5e33a020cd3b45378d33488e3753ed83281c6a0','sourceCodeWritersMayStartAfterThisFileExists':True})
print(json.dumps({'sourceFiles':9079,'baselineSHA256':sha(b),'historicalPins':len(pins)}))
