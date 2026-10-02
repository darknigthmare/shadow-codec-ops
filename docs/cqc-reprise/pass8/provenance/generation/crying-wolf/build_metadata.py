from pathlib import Path
from PIL import Image
import json,hashlib,copy
B=Path(__file__).parent
sha=lambda p:hashlib.sha256(Path(p).read_bytes()).hexdigest()
def write(p,d):
 raw=(json.dumps(d,indent=2,ensure_ascii=False)+'\n').encode()
 if p.exists() and p.read_bytes()!=raw:
  old=p.read_bytes();previous=p.with_name(p.stem+'.previous-'+hashlib.sha256(old).hexdigest()[:12]+p.suffix)
  if not previous.exists():previous.write_bytes(old)
 p.write_bytes(raw)
selected={'armor':{'a-right':'A_RIGHT_01','a-left':'A_LEFT_01','b-right':'B_RIGHT_01','b-left':'B_LEFT_02','c-right':'C_RIGHT_01','c-left':'C_LEFT_01'},'beauty':{'a-right':'A_RIGHT_02','a-left':'A_LEFT_02','b-right':'B_RIGHT_02','b-left':'B_LEFT_02','c-right':'C_RIGHT_02','c-left':'C_LEFT_03'}}
heights={'armor':{'a-right':223,'a-left':206,'b-right':210,'b-left':185,'c-right':215,'c-left':205},'beauty':{'a-right':349,'a-left':386,'b-right':356,'b-left':385,'c-right':342.5,'c-left':337}}
pivots={'armor':{
'a-right':[[225,325],[617,327],[986,320],[1377,322],[215,648],[610,642],[1002,640],[1370,637],[230,948],[595,946],[990,946],[1370,908]],
'a-left':[[180,323],[577,323],[941,321],[1350,328],[179,642],[584,644],[943,649],[1330,645],[197,955],[584,951],[965,958],[1310,903]],
'b-right':[[225,328],[615,326],[978,336],[1360,334],[215,636],[617,655],[988,639],[1370,650],[211,971],[595,962],[1000,965],[1345,964]],
'b-left':[[168,315],[597,316],[966,326],[1353,326],[185,624],[603,634],[956,631],[1352,625],[186,948],[592,955],[955,942],[1330,949]],
'c-right':[[203,326],[584,327],[989,334],[1370,334],[207,648],[589,648],[1001,646],[1360,648],[207,963],[590,959],[980,964],[1363,959]],
'c-left':[[170,327],[580,326],[952,331],[1345,333],[180,655],[570,652],[945,652],[1350,654],[180,956],[570,961],[955,965],[1330,961]]},'beauty':{
'a-right':[[183,354],[548,355],[903,354],[1266,351],[205,717],[560,715],[899,717],[1280,716],[172,1056],[499,1053],[879,1051],[1259,1021]],
'a-left':[[205,391],[520,395],[933,393],[1278,392],[202,787],[562,786],[935,785],[1300,782],[198,1057],[562,1060],[925,1064],[1330,1016]],
'b-right':[[159,372],[516,373],[883,372],[1248,373],[180,736],[539,735],[879,741],[1228,732],[145,1061],[504,1063],[843,1022],[1220,1053]],
'b-left':[[208,396],[585,392],[953,391],[1300,391],[206,763],[594,761],[949,766],[1335,761],[182,1061],[526,1067],[880,1043],[1243,1044]],
'c-right':[[182,368],[539,367],[914,366],[1267,365],[178,730],[544,728],[917,734],[1269,739],[169,1060],[532,1060],[848,1058],[1215,1057]],
'c-left':[[214,381],[548,385],[945,383],[1320,385],[240,733],[552,721],[920,736],[1330,740],[190,1065],[552,1058],[951,1053],[1306,1059]]}}
base=json.loads(Path('/workspace/cqc-pass7-generation/quiet/FINAL_DELIVERY.json').read_text())
preview=[]
for form,sources in selected.items():
 b=B/form;uid='core__crying_wolf' if form=='armor' else 'archive__crying_beauty';contract=json.loads((b/'references/source-contract.json').read_text());files=[]
 for key,name in sources.items():
  p=b/'native-attempts'/(name+'.png');m=json.loads((b/'metadata'/(name+'.result-summary.json')).read_text());l=json.loads((b/'inspections'/(name+'.components.json')).read_text());assert len(l['cells'])==12 and m['opaqueEdgePixels']==0
  for i,c in enumerate(l['cells']):
   point=pivots[form][key][i];x,y,w,h=c['frame']['rect'];assert x<=point[0]<=x+w and y<=point[1]<=y+h
   c['frame']['pivot']=[(point[0]-x)/w,(point[1]-y)/h];c['observedBodyPivotFullSheet']=point;c['artistic_review']='physically-viewed-complete-original-identity-facing-equipment-pose-closest-supported'
  write(b/'layouts'/(key+'.json'),l)
  files.append({'key':key,'source':str(p),'nativeOriginal':m['nativeOriginal'],'sha256':sha(p),'bytes':p.stat().st_size,'width':m['dimensions'][0],'height':m['dimensions'][1],'columns':4,'rows':3,'poseCount':12,'facing':1 if key.endswith('right') else -1,'mirror':False,'inspection':str(b/'inspections'/(name+'.components.json')),'standingSourceHeight':heights[form][key],'observedBodyHeights':[c['bbox'][3]-c['bbox'][1] for c in l['cells']],'layout':str(b/'layouts'/(key+'.json')),'observedBodyPivots':{str(i):p for i,p in enumerate(pivots[form][key])},'bodyHeightMeasurement':'Armor upper rounded shoulder-shell to grounded paw height, excludes dorsal railgun and tail; human crown-to-grounded suitfoot height.' if form=='armor' else 'Physically observed native head-to-grounded suitfoot height, fixedper-sheet; crouch/jump/KO not independently stretched.'})
  preview.append({'key':form+'-'+key,'source':form+'/native-attempts/'+name+'.png','height':heights[form][key],'displayHeight':195 if form=='armor' else 230,'layout':l})
 write(b/'SOURCE_FILES_REVIEWED.json',{'uid':uid,'sourceFiles':files,'producerPhysicallyViewedAllSixSources':True,'all72PoseBodiesViewed':True,'nativeRasterEdited':False,'mirror':False,'runtimeEdited':False,'approvalScope':'Actual native body sheets and frame metadata. Independent integrator/browser combat validation pending.'})
write(B/'preview-data.json',preview)
html=Path('/workspace/cqc-pass7-generation/quiet/preview.html').read_text().replace('Quiet','Crying Wolf + Crying Beauty').replace('230px common standing height','195px quadrupedal shoulder-to-paw height and230px human height').replace('s=230/d.height','s=d.displayHeight/d.height').replace("d.key+' / native alpha rendered at230px'","d.key+' / actual native alpha at '+d.displayHeight+'px'")
html=html.replace("window.lastKey=key;return", "window.lastKey=key;return")
write(B/'SELECTION_AND_GEOMETRY.json',{'selected':selected,'fixedBodyHeights':heights,'observedBodyPivots':pivots,'pngBytesEdited':False,'sourceGeometryCaveat':'Quadrupedal shell body is deliberately measured apartfrom railgun/tail. Displayheight remains producer proposal; actual gameplay body/hitbox compatibility must be verified by integrator.'})
(B/'preview.html').write_text(html)
print('12sources,144completeposecells,144observedbodygroundpivots. Previewready; finaldeliveriesnotyetwritten.')
