import pathlib,json,hashlib,os,tempfile
APP=pathlib.Path('/tmp/cqc-pass19-application');I=pathlib.Path('/tmp/cqc-pass19-integration');p=pathlib.Path('/tmp/cqc-pass19-authored-wardrobe/DELIVERY_MERYL_CYBORG_ASSET_MAP_V1.json');sha=lambda b:hashlib.sha256(b).hexdigest();assert sha(p.read_bytes())=='29da23fffa2081e1a2c55d8dc67a3bd0a6ec96d7922af4334a22ba18fbbf1873';j=json.loads(p.read_bytes());q=pathlib.Path(j['option']['source']);raw=q.read_bytes();assert sha(raw)==j['option']['sha256'];option=json.loads(raw);assert option['family']=='cyborg' and j['uid']=='core__meryl_mgs1'
rows=[]
for a in j['artifacts']:
 source=pathlib.Path(a['source']);b=source.read_bytes();assert len(b)==a['bytes'] and sha(b)==a['sha256'];dest=APP/'public/cqc'/a['destinationRelativeToCQC'];dest.parent.mkdir(parents=True,exist_ok=True)
 if dest.exists():assert sha(dest.read_bytes())==a['sha256']
 else:os.link(source,dest)
 rows.append({'path':str(dest.relative_to(APP)),'sha256':sha(b),'bytes':len(b),'operation':'immutable-native-source-link'})
dest=APP/'public/cqc/src/cqc-pass19-original-costumes.js';raw=dest.read_bytes();s=raw.decode();start=s.index('const additions=')+len('const additions=');add,end=json.JSONDecoder().raw_decode(s[start:]);assert len(add)==3 and all(x['uid']!='core__meryl_mgs1' for x in add);add.append({'uid':j['uid'],'option':option});s=s[:start]+json.dumps(add,ensure_ascii=False,separators=(',',':'))+s[start+end:];b=s.encode();fd,tmp=tempfile.mkstemp(dir=dest.parent)
with os.fdopen(fd,'wb') as f:f.write(b)
os.replace(tmp,dest);rows.append({'path':str(dest.relative_to(APP)),'inputSHA256':sha(raw),'outputSHA256':sha(b),'bytes':len(b)})
r={'schema':'cqc.pass19.native-cyborg-costume-integrated/1','status':'applied-awaiting-combined-match-qa','uid':j['uid'],'id':j['id'],'family':'cyborg','physicalPoses':72,'files':rows,'separateDestructibleRig':False,'canonical':False}
p=I/'MERYL_CYBORG_COSTUME_ATOMIC_ACTUAL_V1.json'
with p.open('x')as f:json.dump(r,f,ensure_ascii=False,indent=2)
print(json.dumps({'receipt':str(p),'sha256':sha(p.read_bytes())}))
