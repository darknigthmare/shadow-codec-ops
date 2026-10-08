from pathlib import Path
import json,urllib.request,hashlib
out=Path('/tmp/cqc-pass19-canonical-costumes');prior=out/'OFFICIAL_STEAM_PRODUCT_EXISTENCE_ACTUAL_HTTP_V1.json'
expected={'235460':'METAL GEAR RISING: REVENGEANCE','406580':'METAL GEAR SOLID V: THE PHANTOM PAIN - Tuxedo','406540':'METAL GEAR SOLID V: THE PHANTOM PAIN - Fatigues (Naked Snake)','406560':'METAL GEAR SOLID V: THE PHANTOM PAIN - Sneaking Suit (Naked Snake)','406590':'METAL GEAR SOLID V: THE PHANTOM PAIN - Sneaking Suit (The Boss)'}
rows=[]
for ident,name in expected.items():
 url=f'https://store.steampowered.com/api/appdetails?appids={ident}&l=english'
 with urllib.request.urlopen(url,timeout=20) as r:body=r.read();status=r.status
 v=json.loads(body)[ident]
 assert v['success'] and v['data']['name']==name,(ident,v)
 assert 'KONAMI' in v['data']['publishers']
 detail=v['data'].get('detailed_description','')
 if ident=='235460':
  fact='Official product description names White Armor, Inferno Armor, Commando Armor, MGS4 body, and Cyborg Ninja body upgrades.'
  assert all(s in detail for s in ['White Armor','Inferno Armor','Commando Armor','MGS4','Cyborg Ninja'])
 else:fact='KONAMI identifies this named DLC costume; the exact player-character model and visible construction still require native-art review.'
 rows.append({'appID':ident,'url':url,'httpStatus':status,'sha256':hashlib.sha256(body).hexdigest(),'name':name,'publishers':v['data']['publishers'],'publisherAndExactTitleVerified':True,'sourceExistenceSummary':fact})
d={'schema':'cqc.pass19.official-store-existence/2','status':'passed','rows':rows,'priorExploratoryReceipt':{'path':str(prior),'sha256':hashlib.sha256(prior.read_bytes()).hexdigest(),'qualification':'V1 probed two guessed adjacent app IDs 406550 and 406570, which returned unrelated products. Its generic KONAMI summary for those rows was incorrect and must not be cited. V2 uses exact expected product names plus actual publisher verification; V1 is preserved as an exploratory diagnostic.'},'qualification':'Source existence verification only; no generated outfit pixels or complete canonical wardrobe certification.'}
p=out/'OFFICIAL_STEAM_PRODUCT_EXISTENCE_ACTUAL_HTTP_V2.json';p.write_text(json.dumps(d,indent=2)+'\n');print(p,hashlib.sha256(p.read_bytes()).hexdigest())
