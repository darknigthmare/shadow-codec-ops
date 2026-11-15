import json,pathlib,hashlib,sys
B=pathlib.Path('@PROJECT_ROOT@/integration/retro-four-browser-qa-v1'); T=pathlib.Path('@PROJECT_ROOT@/integration')
compiled=pathlib.Path(sys.argv[1]); html=pathlib.Path(sys.argv[2]); delayed=pathlib.Path(sys.argv[3])
def pin(p,logical=None):
 b=p.read_bytes(); d={'path':str(p),'bytes':len(b),'sha256':hashlib.sha256(b).hexdigest()}
 if logical:d={'logicalPath':logical,**d}
 return d
uids=['roster50__mei_mgs1','roster50__nastasha_mgs1','roster50__emma_mgs2','roster50__campbell_mg2']
archive=json.loads((compiled/'ARCHIVE_FILES.json').read_text()); selected=[x for x in archive['files'] if any('/'+uid+'/retro-msx/' in x['logicalPath'] for uid in uids)]
assert len({x['logicalPath'] for x in selected})==len(selected)
pins=[pin(html,'modules/unified-versus-v055.html'),pin(compiled/'cqc-pass41-native-batch-index-v1.js','src/cqc-pass41-native-batch-index-v1.js'),*selected,pin(delayed,'src/cqc-pass41-vs-delayed-bursts-v1.js')]
for p in pins:
 b=pathlib.Path(p['path']).read_bytes();assert len(b)==p['bytes'] and hashlib.sha256(b).hexdigest()==p['sha256']
jobs=[{'uid':uid,'id':'retro-msx','armed':uid.endswith('mg2'),'moveTests':[{'slot':slot,'roleIndex':role,'renderStyle':'pixel'} for slot,role in [('light',6),('heavy',10),('low',7),('throw',8)]+([]if uid.endswith('mg2')else[('special',6)])]} for uid in uids]
cfg={'output':str(B/'attempt-v1'),'debugPort':9569,'baseURL':'http://127.0.0.1:8857/','renderStyle':'pixel','contracts':pin(T/'ACTUAL_FIGHTER_CONTRACTS_P41_V1.json.gz'),'legacyFixturePlan':pin(pathlib.Path('@WORKSPACE_ROOT@/cqc-pass40-resume-20261022/integration-v2/cumulative-nineteen-qa/v1/EXACT_LOCAL_TRANSPORT_PLAN_ACTUAL_V1.json')),'runtimePins':pins,'jobs':jobs,'qaLimits':['Only real GUI controls and combat inputs; no combat-state/meter/storage injection.','Original ten-slot contracts checked by independent compiler fixtures; supers of the three unarmed characters are not claimed as played in GUI.','All four eligible options tested in both player slots and both true facing directions. Campbell MGS1 remains held and excluded.','Local exact-source transport, not a claim of production HTTPS browser validation.']}
(B/'BROWSER_CONFIG_V1.json').write_text(json.dumps(cfg,indent=2)+'\n')
overlay={'port':8857,'indexPath':str(compiled/'cqc-pass41-native-batch-index-v1.js'),'archiveFilesPath':str(compiled/'ARCHIVE_FILES.json'),'runtimeOverrides':[pins[0],pins[-1]]};(B/'OVERLAY_CONFIG_V1.json').write_text(json.dumps(overlay,indent=2)+'\n')
print(json.dumps({'configsWritten':True,'runtimePins':len(pins),'sourceRoutes':len(selected),'indexSHA256':pins[1]['sha256'],'jobs':len(jobs)}))
