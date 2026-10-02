#!/usr/bin/env python3
"""Check source-collection budgets before each authorized ImageGen request."""
from pathlib import Path
import hashlib,json,os,sys,time
B=Path(__file__).resolve().parent
a=B/'prompts'/(sys.argv[1]+'.args.json')
assert a.is_file()
u={}
for p in B.rglob('*'):
 if p.is_file():s=p.stat();u[(s.st_dev,s.st_ino)]=s.st_size
free=os.statvfs(B).f_bavail*os.statvfs(B).f_frsize;used=sum(u.values())
ok=free>100*1024*1024 and used<39*1024*1024
record={'schema':'cqc.pass9.generation-preflight/1','attempt':sys.argv[1],'requestSHA256':hashlib.sha256(a.read_bytes()).hexdigest(),'checkedUtcEpoch':time.time(),'diskFreeBytes':free,'taskUniqueBytes':used,'initialBudgetBytes':25*1024*1024,'maxBudgetBytes':45*1024*1024,'reservedNativeHeadroomBytes':6*1024*1024,'generationAllowed':ok,'noImageRequestIfBlocked':True}
p=B/'metadata'/(sys.argv[1]+'.preflight.json')
if not p.exists():
 with p.open('x') as f:json.dump(record,f,indent=2);f.write('\n')
print(json.dumps(record))
sys.exit(0 if ok else 2)
