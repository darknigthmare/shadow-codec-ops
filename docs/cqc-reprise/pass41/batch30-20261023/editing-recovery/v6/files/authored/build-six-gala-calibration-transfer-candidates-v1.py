"""Make traceable, unapproved framing-transfer proposals from visible landmarks.

Manual chin points are selected on the physically viewed native SVG grid.
Crown and sole contours are read from known, explicitly owned head/shoe figures.
They are projected visual segments, never a clinical anatomy certificate.
"""
from pathlib import Path
import json,gzip,hashlib,math,copy,sys
import numpy as np
from scipy.ndimage import label
from PIL import Image
R=Path('@PROJECT_ROOT@')
CONFIG=Path(sys.argv[2])if len(sys.argv)>2 else R/'authored/SIX_GALA_MANUAL_TRANSFER_LANDMARK_CHOICES_UNAPPROVED_V1.json'
config=json.loads(CONFIG.read_text())
uid=sys.argv[1];c=config[uid];typ=c['type'];base=R/'integration'/('gala-'+typ+'-'+uid+'-manual-axes-v2');fixed=R/'integration/gala-provenance-fixed-v1'/uid/'JOB_FOR_ROOT_REVIEW.json';original=Path(c.get('inputJob',str(fixed if fixed.exists()else base/'JOB_FOR_ROOT_REVIEW.json')));j=json.loads(original.read_text());g=json.loads(gzip.decompress(Path(j['geometry']['path']).read_bytes()));sources={s['path']:s for s in g['sources']};assets={a['key']:a for a in j['assets']};cache={};evidence=[]
def native(asset,poseName,chin,soleExcludeX=None):
 p=Path(asset['path']);s=sources[str(p)];pose=next(v for v in s['poses']if v['name']==poseName)
 if str(p)not in cache:
  raw=p.read_bytes();assert hashlib.sha256(raw).hexdigest()==asset['sha256'];alpha=np.asarray(Image.open(p).getchannel('A'));labs,n=label(alpha>16,np.ones((3,3),np.int8));cache[str(p)]=(alpha,labs)
 alpha,labs=cache[str(p)];mask=np.isin(labs,pose['componentIDs']);yy,xx=np.nonzero(mask);top=int(yy.min());xs=np.nonzero(mask[top])[0];crown=[float(xs[len(xs)//2]+.5),float(top+.5)];x,y=chin;assert alpha[y,x]>16 and labs[y,x]in pose['componentIDs'],('Manual chin not on owned visible figure',uid,poseName,chin);chin=[x+.5,y+.5]
 # Explicit manual exclusions only remove a walking-cane lane from a contour
 # measurement; they never change pixel ownership, PNGs or clipped artwork.
 soles=mask.copy()
 if soleExcludeX:
  for l,r in soleExcludeX:soles[:,l:r]=False
 sy,sx=np.nonzero(soles);bottom=int(sy.max());bottomxs=np.nonzero(soles[bottom])[0];sole=[float(bottomxs[0]+.5),float(bottom+.5)]
 return{'sourcePath':str(p),'sourceSHA256':asset['sha256'],'pose':poseName,'crown':crown,'chin':chin,'sole':sole,'neutralNativeHeight':pose['nativeAlphaBounds'][3],'chinAlpha':int(alpha[y,x]),'soleCaneExclusionXRanges':soleExcludeX or [],'crownIdentityQualification':'The physically viewed upright figure has its unique uppermost contour on its head/hat, not an effect or neighbouring actor. This is a drawing-contour point, not an inferred skull landmark.','soleIdentityQualification':'The lowest retained body contour was physically viewed as a shoe sole; explicit cane-x exclusion, where supplied, prevents a cane tip from replacing the shoe. Projected posture remains a limitation.'}
def distance(a,b):return math.hypot(b[0]-a[0],b[1]-a[1])
def pairs(ref,target):
 out=[]
 for name,end in [('projected-head-crown-to-chin','chin'),('projected-crown-to-visible-shoe-sole','sole')]:
  rp=[ref['crown'],ref[end]];tp=[target['crown'],target[end]];rl=distance(*rp);tl=distance(*tp);out.append({'name':name,'reference':rp,'action':tp,'referenceNativePixels':rl,'actionNativePixels':tl,'ratio':tl/rl,'measurementScope':'Actual visible source-native contour/chin/shoe points. Two projected visual segments; crown-to-sole depends on stance and head-to-chin on head/hat tilt. Manual chin uncertainty is approximately4nativepixels, so the proposal is not anatomical certification.'})
 return out
for side,sc in c['sides'].items():
 refFrame=j['roles'][side][sc.get('referenceRole',0)];refAsset=assets[refFrame['asset']];ref=native(refAsset,refFrame['pose'],sc['referenceChin'],sc.get('referenceSoleExcludeX'));refH=refAsset['standingHeight'];assert refH>0
 targets=sc['targets']
 for item in targets:
  role=item['role'];frame=j['roles'][side][role];sourceAsset=assets[frame['asset']];target=native(sourceAsset,frame['pose'],item['chin'],item.get('soleExcludeX'));pp=pairs(ref,target);headH=refH*pp[0]['ratio'];bodyH=refH*pp[1]['ratio'];chosen=round((headH+bodyH)/2)
  if 'fixedNeutralReferenceHeight'in sc:
   refH=sc['fixedNeutralReferenceHeight'];headH=refH*pp[0]['ratio'];bodyH=refH*pp[1]['ratio'];chosen=round((headH+bodyH)/2)
  record={'uid':uid,'side':side,'targetRole':role,'reference':ref,'referenceSourceFrameHeight':refH,'target':target,'landmarkPairs':pp,'headDerivedSourceHeight':headH,'projectedBodyDerivedSourceHeight':bodyH,'proposedSourceFrameHeight':chosen,'choiceMethod':'Arithmetic midpoint of the two explicitly observed projected-segment estimates, rounded to native pixels; a transparent visual compromise proposal, not a true anatomical stature. Root may reject/refine the choice.','diagnosticRatioSpread':abs(pp[0]['ratio']-pp[1]['ratio']),'approved':False,'rootReviewPending':True};evidence.append(record)
  # Each actual weapon shoot/reload gets its own unchanged-PNG alias. A body-
  # page repair uses one alias shared by its already selected whole drawings.
  new=copy.deepcopy(sourceAsset);new['key']=sourceAsset['key']+'-transfer-role'+str(role);new['file']=sourceAsset['file'].replace('-v1.png','-transfer-role'+str(role)+'-v1.png');new['standingHeight']=chosen;new['calibration']={'method':'reviewed-anatomical-transfer','approved':False,'referenceSourcePath':ref['sourcePath'],'referenceSourceSHA256':ref['sourceSHA256'],'referencePose':ref['pose'],'referenceStandingHeight':refH,'targetPose':target['pose'],'landmarkPairs':pp,'tolerance':0.2,'scope':'UNAPPROVED qualified projected-source-framing transfer candidate. Visible head and shoe points support a bounded visual compromise; posture and head/hat projection cause different ratios. This is not a medical/anatomical certificate or inherited Root approval. Exact final job must receive independent Root review.'};j['assets'].append(new)
  affected=item.get('alsoApplyRoles',[role])
  for i in affected:
   assert j['roles'][side][i]['asset']==sourceAsset['key'],('Cross-source role alias forbidden',uid,side,i)
   j['roles'][side][i]['asset']=new['key']
 # Preserve old asset descriptors only if a selected role still uses them.
used={v['asset']for side in ['right','left']for v in j['roles'][side]};j['assets']=[a for a in j['assets']if a['key']in used]
j['proposalLimits'].append('Calibration transfer V1 supplies two explicitly located projected segments per new alias. Numerical midpoint is a qualified visual proposal, not anatomical truth; original sources, ownership, roles, axes, anchors and dispatch plan are preserved. Root review must bind the exact new raw job SHA, decide proportional uncertainty, and reject/refine unsuitable transfers.')
out=R/'integration'/('gala-'+typ+'-'+uid+'-calibration-transfers-v1');out.mkdir();raw=(json.dumps(j,indent=2)+'\n').encode();q=out/'JOB_FOR_ROOT_REVIEW.json';q.write_bytes(raw);eraw=(json.dumps({'schema':'cqc.p41.manual-projected-calibration-transfer-proposals/1','uid':uid,'approved':False,'sourcePNGMutations':False,'sourceJobSHA256':hashlib.sha256(original.read_bytes()).hexdigest(),'entries':evidence,'limits':['Manual coordinate proposals are read from actual unmodified source magnifications and remain counterreviewable.','The midpoint recipe is a display choice, not an assertion that both projected lengths measure anatomical stature.','Original PNGs, old jobs and old held calibrations remain preserved.']},indent=2)+'\n').encode();eq=out/'CALIBRATION_LANDMARK_PROPOSALS_UNAPPROVED_V1.json';eq.write_bytes(eraw)
review=json.loads((base/'ROOT_REVIEW_PENDING.json').read_text());review['inputSHA256']=hashlib.sha256(raw).hexdigest();review['observations']=['Manual projected transfer proposals are supplied but unapproved. Inspect actual marker coordinates, head/body ratio spread, the source framing compromise and final job before making any Root decision.'];(out/'ROOT_REVIEW_PENDING.json').write_text(json.dumps(review,indent=2)+'\n');print(json.dumps({'uid':uid,'job':{'path':str(q),'bytes':len(raw),'sha256':hashlib.sha256(raw).hexdigest()},'evidence':{'path':str(eq),'bytes':len(eraw),'sha256':hashlib.sha256(eraw).hexdigest()},'transfers':len(evidence),'sourcePNGMutations':False,'approved':False,'proposedHeights':[{k:e[k]for k in ['side','targetRole','proposedSourceFrameHeight','headDerivedSourceHeight','projectedBodyDerivedSourceHeight','diagnosticRatioSpread']}for e in evidence]}))
