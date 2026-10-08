import json,re,hashlib
from pathlib import Path
r=Path('/tmp/cqc-pass19-canonical-costumes');d=json.load(open(r/'KNOWN_OFFICIAL_WARDROBE_BACKLOG_V1.json'));a=d['requests']
for e in a:
 if e['uid']=='core__fox' and e['id']=='official-red-exoskeleton-integral':
  e.update(id='official-alternate-red-gray-exoskeleton-mgs1',name='Alternate red-gray exoskeleton (MGS1)',sources=[{'url':'https://metalgear.fandom.com/wiki/Cyborg_Ninja','scope':'Secondary reference explicitly describes alternate red/gray exoskeleton colors after completing original MGS1 twice.'}],qualification='Existence known; original MGS1, Integral and Twin Snakes availability and textures must be reviewed per edition before art is accepted.')
extras=[
('archive__ddog',['Sneaking Suit (knife)','Sneaking Suit (stun)','Battle Dress','Fulton harness'],'https://metalgear.fandom.com/wiki/DD','Secondary buddy equipment list; same D-Dog anatomy/eyepatch must be retained; no generic wolf substitution.'),
('archive__dhorse',['Battle Dress','Parade Tack','Western Tack'],'https://metalgear.fandom.com/wiki/Metal_Gear_Solid_V/Downloadable_Content','Secondary DLC equipment list and official Costume & Tack Pack product context; identical D-Horse body remains.'),
('archive__paz',['Date with Paz swimsuit'],'https://metalgear.fandom.com/wiki/Camouflage_(Peace_Walker)','Adult Paz (21) original PW optional date mission outfit; original PSP/HD source and non-sexual gameplay treatment to verify, not TPP hallucination art.'),
('core__liquid',['Open trench coat (MGS1)'],'https://metalgear.fandom.com/wiki/Liquid_Snake','Original MGS1 coat and bare torso, before REX-roof shirtless duel; no direct Twin Snakes model texture substitution.'),
('core__liquid_ocelot',['Outer Haven duel (without coat)'],'https://metalgear.fandom.com/wiki/Suit_(clothing)','Secondary account of Liquid Ocelot removing his coat before the final Outer Haven encounter.'),
('core__armstrong',['Full business suit','Final shirtless nanomachine body'],'https://metalgear.fandom.com/wiki/Suit_(clothing)','Secondary source describes senator suit and removing the shirt to demonstrate nanomachines; original R-07 visual body reference required.'),
('core__boss',['Opened Snake Eater CQC suit'],'https://metalgear.fandom.com/wiki/The_Boss','Known original-game torso suit opening/scar presentation requires exact released-game reference; closed current native body is retained until new art is reviewed.'),
('core__volgin',['Shagohod hangar combat body (without military coat)'],'https://metalgear.fandom.com/wiki/Yevgeny_Borisovitch_Volgin','Original PS2 Volgin later boss appearance; no Delta or Man on Fire body substitution.'),
('core__blade_wolf',['Doktor-refitted companion body'],'https://metalgear.fandom.com/wiki/Blade_Wolf','Same AI after destruction/refit, a body/loadout change rather than ordinary clothing. Requires exact refitted final-model comparison to the reviewed LQ-84i boss body.')]
for uid,names,url,scope in extras:
 for name in names:a.append({'uid':uid,'id':'official-'+re.sub('[^a-z0-9]+','-',name.lower()).strip('-'),'family':'canonical','name':name,'status':'reference-and-native-art-pending','selectable':False,'sources':[{'url':url,'scope':scope}],'qualification':'Known or provisionally identified original-game appearance; exact independent fullbody visual source and native action atlases must be reviewed. Never exposes unreviewed generated/recolored art as a selectable official costume.'})
assert len({(x['uid'],x['id']) for x in a})==len(a)
d.update(schema='cqc.pass19.known-official-wardrobe-backlog/2',requests=a,requestCount=len(a),targetUIDCount=len({x['uid'] for x in a}),priorProposal={'path':'KNOWN_OFFICIAL_WARDROBE_BACKLOG_V1.json','sha256':hashlib.sha256((r/'KNOWN_OFFICIAL_WARDROBE_BACKLOG_V1.json').read_bytes()).hexdigest()})
(r/'KNOWN_OFFICIAL_WARDROBE_BACKLOG_V2.json').write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n')
c=json.load(open(r/'COMPLETE_BASELINE_APPEARANCE_CENSUS_V2.json'))
for row in c['rows']:row['knownOfficialArtPending']=[{k:x[k] for k in ['id','name','status']} for x in a if x['uid']==row['uid']]
c.update(schema='cqc.pass19.complete-baseline-appearance-census/3',knownPendingOfficialArtRequests=len(a))
(r/'COMPLETE_BASELINE_APPEARANCE_CENSUS_V3.json').write_text(json.dumps(c,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'requests':len(a),'targetUIDs':d['targetUIDCount'],'census':len(c['rows'])}))
