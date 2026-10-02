from pathlib import Path
from PIL import Image
from scipy import ndimage
import numpy as np,json,hashlib
B=Path(__file__).parent
sha=lambda p:hashlib.sha256(Path(p).read_bytes()).hexdigest()
checks=[]
def check(label,actual):
 checks.append({'label':label,'passed':bool(actual)})
 if not actual:raise AssertionError(label)
d=json.loads((B/'FINAL_DELIVERY.json').read_text())
check('exact original canonical UID',d['uid']=='core__raven')
check('six independent final sources',len(d['sourceFiles'])==6 and len({x['sha256']for x in d['sourceFiles']})==6)
check('six action-side source keys',{x['key']for x in d['sourceFiles']}=={'a-right','a-left','b-right','b-left','c-right','c-left'})
check('no mirror',d['mirror'] is False and all(x['mirror']is False for x in d['sourceFiles']))
check('honest fidelity scope',d['review']['fidelityStatus']=='closest_supported' and d['review']['absolute1to1Certified'] is False)
check('all72unique pose indices',[len([i for a in d['actionLayout'].values()if a['sheet']==s for i in a['indices']])for s in ['a','b','c']]==[12,12,12] and all(sorted(i for a in d['actionLayout'].values()if a['sheet']==s for i in a['indices'])==list(range(12))for s in ['a','b','c']))
check('lowshot uses dedicated native low group',d['actionMap']['specialForward']=='deploy' and d['actionLayout']['deploy']['indices']==[5,6,7] and d['phaseMap']['deploy']=={'startup':[0],'active':[1],'recovery':[2]})
check('crosse/brace and utility physical mappings',d['actionMap']['specialDown']=='heavy' and d['actionMap']['specialBack']=='guard' and d['actionMap']['utility']=='recover')
for row in d['sourceFiles']:
 key=row['key'];p=Path(row['source']);im=Image.open(p);a=np.array(im);al=a[:,:,3]
 check(key+' copied native SHA exact',sha(p)==row['sha256']==sha(row['nativeOriginal']))
 check(key+' PNG alpha',im.format=='PNG' and im.mode=='RGBA')
 check(key+' native dimensions correct',im.size==(row['width'],row['height']))
 labels,n=ndimage.label(al>80);counts=np.bincount(labels.ravel());ids=np.flatnonzero(counts[1:]>1000)+1
 check(key+' exactly12major body components',len(ids)==12)
 border=np.concatenate([al[0],al[-1],al[:,0],al[:,-1]])
 check(key+' no opaque boundary clipping',not np.any(border>80))
 check(key+' genuinely transparent corners and substantial alpha0',(al==0).sum()>al.size*.4 and al[0,0]==0 and al[-1,-1]==0)
 layout=json.loads(Path(row['layout']).read_text())
 check(key+' all12complete contour rectangles',len(layout['cells'])==12 and all(0<=c['frame']['rect'][0]<im.width and 0<=c['frame']['rect'][1]<im.height and c['frame']['rect'][0]+c['frame']['rect'][2]<=im.width and c['frame']['rect'][1]+c['frame']['rect'][3]<=im.height for c in layout['cells']))
 check(key+' every frame nativeSHA',all(c['frame']['sha256']==sha(p)for c in layout['cells']))
 check(key+' neighbor fragments stencil metadata',all('clipPolygon'in c['frame']for c in layout['cells']if c['foreign_body_opaque_pixels_in_rect']>0))
 check(key+' independent correct facing metadata',row['facing']==(1 if key.endswith('right')else -1))
 check(key+' fixed positive human scale',row['standingSourceHeight']>250 and row['standingSourceHeight']<400)
 check(key+' all12 observed body anchors supplied',len(row['observedBodyPivots'])==12 and all(0<=v<=1 for c in layout['cells']for v in c['frame']['pivot']))
 check(key+' complete Canvas contact exists',Path(row['completeCanvasContact']).is_file())
for side,groups in json.loads((B/'SOURCE_COMBAT_ORIGINS.json').read_text())['marks'].items():
 for group,m in groups.items():
  p=Path(m['source']);im=Image.open(p);point=m['point'];row=next(x for x in d['sourceFiles']if x['key']=='c-'+side)
  check(side+' '+group+' pinned exact native origin source',m['sha256']==sha(p)==row['sha256'])
  check(side+' '+group+' actual native opaque muzzle',im.getpixel(tuple(point))[3]>80 and list(im.getpixel(tuple(point)))==m['pointRGBA'])
  check(side+' '+group+' actual active pose mapping',m['frame']==1 and m['sourcePoseIndex']=={'shoot':3,'deploy':6,'charge':11}[group])
  check(side+' '+group+' physically valid ground-relative height',50<m['suggestedWorldHeight']<175)
for name in ['ch09_body.jpg','ch09_face.jpg']:
 check(name+' exact frozen Konami source preservation',sha(B/'references'/name)==sha(Path('/workspace/cqc-pass7-reference-selection/core__raven')/name))
for r in d['review']['sources']:
 check(Path(r['file']).name+' canonical source SHA preserved',sha(r['file'])==r['sha256'])
index=json.loads((B/'NATIVE_PNG_INDEX.json').read_text())
check('all11 native attempts retained',len(index['attempts'])==11 and all(sha(x['source'])==x['sha256']==sha(x['nativeOriginal'])for x in index['attempts']))
check('four rejected and one unselected described honestly',sum(x['status'].startswith('rejected-')for x in index['attempts'])==4 and sum(x['status'].startswith('preserved-unselected')for x in index['attempts'])==1)
check('reference budget under15MB',json.loads((B/'REFERENCE_PRESERVATION_INDEX.json').read_text())['totalBytes']<15000000)
for name in ['BROWSER_INITIAL_VERIFICATION_RETRY.json','BROWSER_FINAL_CONTACT_VERIFICATION.json','BROWSER_COMPLETE_CONTACT_VERIFICATION.json']:
 rows=json.loads((B/'inspections'/name).read_text());check(name+' allbrowser commands success',all(r['exit']==0 for r in rows))
check('first Chrome sandbox failures retained',len(json.loads((B/'inspections/BROWSER_INITIAL_VERIFICATION.json').read_text()))==7)
report={'schema':'cqc.native-producer-delivery-qa/1','uid':'core__raven','status':'passed','checks':len(checks),'failures':0,'checksResults':checks,'nativeSourceImagesModified':False,'artisticReviewSeparate':'CANONICAL_REVIEW.json and PRODUCER_VISUAL_REVIEW.json after physically viewing original references,11nativeattempts andsix complete1600pxCanvascontacts. Automated alpha checks do not certify absolute1:1.'}
(B/'PRODUCER_SOURCE_DELIVERY_QA.json').write_text(json.dumps(report,indent=2)+'\n')
files=[{'path':str(p.relative_to(B)),'bytes':p.stat().st_size,'sha256':sha(p)}for p in sorted(B.rglob('*'))if p.is_file()and p.name!='FILE_SHA256_MANIFEST.json']
(B/'FILE_SHA256_MANIFEST.json').write_text(json.dumps({'uid':'core__raven','fileCount':len(files),'files':files},indent=2)+'\n')
print(json.dumps({'status':'passed','checks':len(checks),'failures':0,'deliverySHA256':sha(B/'FINAL_DELIVERY.json'),'nativeSheets':6,'uniquePoses':72,'nativeAttemptsPreserved':11,'fileCount':len(files)},indent=2))
