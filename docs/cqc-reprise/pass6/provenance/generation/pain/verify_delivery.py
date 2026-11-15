from pathlib import Path
from PIL import Image
from scipy import ndimage
import numpy as np
import json,hashlib,re
B=Path(__file__).parent;D=json.loads((B/'FINAL_DELIVERY.json').read_text());checks=[]
sha=lambda p:hashlib.sha256(Path(p).read_bytes()).hexdigest()
def ck(name,condition,detail=None):
 checks.append({'name':name,'passed':bool(condition),'details':detail});assert condition,(name,detail)
ck('original The Pain exact UID',D['uid']=='core__pain')
ck('six independently generated both-facing atlases',len(D['sourceFiles'])==6 and {r['key'] for r in D['sourceFiles']}=={s+'-'+f for s in 'abc' for f in ['right','left']} and len({r['sha256'] for r in D['sourceFiles']})==6)
positions=[(v['sheet'],i) for v in D['actionLayout'].values() for i in v['indices']]
ck('all 36 source positions without omission or duplication',len(positions)==36 and set(positions)=={(s,i) for s in 'abc' for i in range(12)})
profile=json.loads((B/'CURRENT_FIGHTER_PROFILE.json').read_text())
ck('all ten original combat slots routed',len(D['actionMap'])==10 and set(D['actionMap'])==set(profile['moves']))
for slot,act in D['actionMap'].items():
 ph=D['phaseMap'][act];n=len(D['actionLayout'][act]['indices']);ck('three valid native phases '+slot,set(ph)=={'startup','active','recovery'} and all(v and all(isinstance(i,int) and 0<=i<n for i in v) for v in ph.values()))
ck('covered first phase and no invented mouth origin',D['actionMap']['specialForward']=='shoot' and 'FIRST PHASE' in D['review']['incarnation'] and D['review']['absolute1to1Certified'] is False and D['review']['fidelityStatus']=='closest_supported')
for r in D['sourceFiles']:
 im=Image.open(r['source']);a=np.asarray(im.getchannel('A'));v=a>80;l,n=ndimage.label(v);sizes=np.bincount(l.ravel())[1:]
 ck('unchanged generated native '+r['key'],sha(r['source'])==sha(r['nativeOriginal'])==r['sha256'])
 ck('real alpha and twelve major isolated figures '+r['key'],im.mode=='RGBA' and int((a==0).sum())>0 and int((sizes>=1000).sum())==12)
 ck('all complete figures contained inside native source '+r['key'],sum(int(x.sum()) for x in [v[0],v[-1],v[:,0],v[:,-1]])==0)
for r in D['review']['sources']:ck('physically reviewed reference byte exact '+Path(r['file']).name,r['viewed'] is True and sha(r['file'])==r['sha256'])
M=json.loads((B/'SOURCE_COMBAT_ORIGINS.json').read_text())
ck('first phase documented exact source group mapping',M['slotSourceGroups']=={'special':'shoot','specialForward':'shoot','super':'charge'})
for side,marks in M['marks'].items():
 for action,m in marks.items():
  r=next(x for x in D['sourceFiles'] if x['key']=='c-'+side);im=Image.open(r['source']);ck('actual first-active glove alpha anchor '+side+' '+action,m['sha256']==r['sha256'] and im.getpixel(tuple(m['point']))[3]>80 and D['actionLayout'][action]['indices'][m['frame']]==m['sourcePoseIndex'])
P=json.loads((B/'NATIVE_HORNET_PROP_ATLAS.json').read_text());ck('untouched additional native hornet PNG',sha(P['source'])==sha(P['nativeOriginal'])==P['sha256']);ck('three independent source cloud views',len(P['props'])==3 and len({tuple(x['rect']) for x in P['props']})==3)
for r in P['props']:
 x,y,w,h=r['rect'];ck('native hornet cloud crop geometry '+r['id'],x>=0 and y>=0 and w>0 and h>0 and x+w<=P['width'] and y+h<=P['height'])
metas=list((B/'metadata').glob('*.result-summary.json'));ck('all seven generation results and prompts preserved',len(metas)==7)
for p in metas:
 d=json.loads(p.read_text());ck('exact native tool output retained '+d['key'],Path(d['nativeOriginal']).exists() and len(re.findall(r'/workspace/generated_images/[A-Za-z0-9_.-]+\.png',d['output_hint']))==1 and d['args']['transparent_background'] is True and all(Path(x).exists() for x in d['args']['referenced_image_paths']))
report={'schema':'cqc.native-source-delivery-readonly-qa/1','uid':D['uid'],'status':'passed','assertions':len(checks),'failures':0,'scope':'Producer source integrity and native asset contract; source physical visual review recorded separately. No runtime collision/absolute 1:1 certificate.','checks':checks}
(B/'PRODUCER_SOURCE_DELIVERY_QA.json').write_text(json.dumps(report,indent=2,ensure_ascii=False)+'\n');print(json.dumps({k:report[k] for k in ['uid','status','assertions','failures']},indent=2))
