from pathlib import Path
from PIL import Image
import json,hashlib
B=Path('/workspace/cqc-pass8-generation/paz-eva');checks=[]
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def ck(n,cond,detail=None):
 checks.append({'name':n,'passed':bool(cond),'detail':detail})
 if not cond:raise AssertionError(n)
for c in ['eva-mgs3','paz-gz','paz-pw']:
 p=B/c;d=json.loads((p/'FINAL_DELIVERY.json').read_text());uid=d['uid']
 ck(uid+' native declaration',len(d['sourceFiles'])==6 and d['mirror'] is False)
 ck(uid+' 72 authored positions',d['counts']['totalPoseCells']==72 and sum(len(v['indices']) for v in d['actionLayout'].values())==36)
 ck(uid+' qualified fidelity',d['review']['fidelityStatus']=='closest_supported' and d['review']['absolute1to1Certified'] is False)
 sourcehashes=[];poses=set()
 for s in d['sourceFiles']:
  f=Path(s['source']);im=Image.open(f);layout=json.loads(Path(d['layouts'][s['key']]).read_text());sourcehashes.append(sha(f))
  ck(uid+' '+s['key']+' exact native bytes',sha(f)==s['sha256']==sha(Path(s['nativeOriginal'])))
  ck(uid+' '+s['key']+' RGBA dimensions',im.mode=='RGBA' and im.size==(s['width'],s['height']) and im.getchannel('A').histogram()[0]>0)
  ck(uid+' '+s['key']+' 12 components',len(layout['cells'])==12 and all(x['pixels']>=1000 for x in layout['cells']))
  ck(uid+' '+s['key']+' fixed source height',d['sourceGeometry'][s['key']]['recommendStandingSourceHeight']>0)
  for cell in layout['cells']:
   x,y,w,h=cell['frame']['rect'];ck(uid+' '+s['key']+' pose'+str(cell['index'])+' bounded crop',x>=0 and y>=0 and w>0 and h>0 and x+w<=im.width and y+h<=im.height)
   poses.add((s['key'],tuple(cell['frame']['rect'])))
 ck(uid+' 6 byte distinct independent source PNG',len(set(sourcehashes))==6)
 ck(uid+' 72 unique native crops',len(poses)==72)
 for ref in d['review']['sources']:ck(uid+' source '+Path(ref['file']).name+' pinned',sha(Path(ref['file']))==ref['sha256'])
 marks=json.loads(Path(d['sourceCombatOrigins']).read_text())
 if uid=='core__eva_mgs3':
  for side,acts in marks['marks'].items():
   for action,v in acts.items():
    im=Image.open(v['source']);ck(uid+' '+side+' '+action+' actual muzzle alpha',im.getpixel(tuple(v['point']))[3]>80 and sha(Path(v['source']))==v['sha256'] and v['frame']==1 and v['sourcePoseIndex']==(1 if action=='shoot' else 4))
 else:ck(uid+' no fake ballistic origins',marks['ballisticOriginsApplicable'] is False and marks['marks']=={'right':{},'left':{}})
 ck(uid+' actual attempt count',len(list((p/'native-attempts').glob('*.png')))==d['counts']['nativeGenerationAttempts'])
 ck(uid+' producer physical scope',json.loads((p/'PRODUCER_PHYSICAL_REVIEW.json').read_text())['completePoseBodiesViewed']==72)
prev=B/'eva-mgs3/review-revisions/before-extra-left-holster-correction/FINAL_DELIVERY.json';ck('EVA prior root-reviewed candidate preserved',sha(prev)=='b88947c69b16a45916402def93781b9119623da39c79db47d9f5591a8fd4292d')
report={'schema':'cqc.pass8.paz-eva.producer-verification/1','status':'passed','checks':checks,'assertions':len(checks),'selectedNativePNG':18,'completeSelectedPoseCells':216,'taskNativeGenerationAttempts':24,'originalReferenceBudgetLimits':{'allPazGzResearchBytes':16307579,'selectedPazGzReferenceBytes':4208990,'allPazPwResearchBytes':15065503,'selectedPazPwReferenceBytes':1778926,'allEvaResearchBytes':3418745,'sourceGzSearchBudgetOverageExplicitlyReportedToRoot':True},'rootRuntimeImportNotPerformed':True,'nativePNGBytesUntouched':True,'verificationScope':'Byte/dimension/alpha/component/crop/phase-scale/origin contracts only. Producer physically viewed all18 native sheets and216 source figures separately. Root final Canvas/gameplay/publication remain outside this proof.'}
(B/'PRODUCER_DELIVERIES_VERIFICATION.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n');print(json.dumps({'status':'passed','assertions':len(checks),'selectedPNG':18,'poses':216,'reportSHA':sha(B/'PRODUCER_DELIVERIES_VERIFICATION.json')},indent=2))
