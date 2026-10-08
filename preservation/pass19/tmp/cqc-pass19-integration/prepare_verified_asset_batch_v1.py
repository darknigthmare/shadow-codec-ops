import pathlib,json,hashlib
out=pathlib.Path('/workspace/cqc-pass19-asset-preservation');out.mkdir(exist_ok=True)
source=pathlib.Path('/tmp/cqc-pass19-authored-wardrobe')
option=json.loads((source/'SOLID_CYBORG_NATIVE_OPTION_V1.json').read_text());option['family']='cyborg'
audit=source/'reviews/SOLID_CYBORG_ALL_NATIVE_POSES_ACTUAL_BROWSER_QA_V1.json'
digest=lambda b:hashlib.sha256(b).hexdigest()
auditSHA=digest(audit.read_bytes())
metadata={'schema':'cqc.native-wardrobe-option/1','uid':'core__solid','id':'cyborg','artAuditSHA256':auditSHA,'option':option}
meta=out/'solid-cyborg-option-v1.json'
with meta.open('x') as f:json.dump(metadata,f,ensure_ascii=False,separators=(',',':'))
rows=[]
frames=[fr for acts in [option['sprite']['actions'],option['sprite']['oppositeActions']] for act in acts.values() for fr in act['frames']]
files={fr['file']:fr['sha256'] for fr in frames}
for rel,pin in files.items():
 p=source/'assets'/pathlib.Path(rel).relative_to('assets');b=p.read_bytes();assert digest(b)==pin
 rows.append({'path':rel,'localPath':str(p),'bytes':len(b),'sha256':pin})
for local,rel in [(meta,'metadata/core__solid/cyborg-v1.json'),(audit,'reviews/core__solid/cyborg-v1-actual-browser-qa.json'),(source/'reviews/SOLID_CYBORG_PHYSICAL_REVIEW_V1.json','reviews/core__solid/cyborg-v1-physical-review.json')]:
 b=local.read_bytes();rows.append({'path':rel,'localPath':str(local),'bytes':len(b),'sha256':digest(b)})
plan={'schema':'cqc.asset-preservation-batch/1','repository':'darknigthmare/shadow-codec-ops','branch':'cqc-native-wardrobe-assets-pass19','parentPolicy':'new-isolated-branch-only','files':rows,'totalBytes':sum(r['bytes'] for r in rows),'qualification':'Approved independent Snake cyborg only. Original fan design. Source PNG bytes preserved, each uploaded Git blob must be fetched and independently verified before branch publication. No local source eviction authorized by this plan.'}
planPath=out/'APPROVED_NATIVE_ASSET_BATCH_PLAN_V1.json'
with planPath.open('x') as f:json.dump(plan,f,ensure_ascii=False,indent=2)
print(json.dumps({'plan':str(planPath),'sha256':digest(planPath.read_bytes()),'files':len(rows),'bytes':plan['totalBytes']}))
