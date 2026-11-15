"""Propose explicit alpha ownership for physical review; never edit any PNG.

Large, visibly isolated full figures are bounded first. Small components must be
inside one unique bounded figure region; no nearest-neighbour assignment occurs.
Anything outside those bounds is retained explicitly as an unmapped artifact.
Root must inspect every physical pose and review any excluded artifact.
"""
from pathlib import Path
from PIL import Image
from scipy.ndimage import label, find_objects
import numpy as np
import argparse, hashlib, json

p=argparse.ArgumentParser();p.add_argument('config',type=Path);a=p.parse_args()
c=json.loads(a.config.read_text());r=Path('@PROJECT_ROOT@')
ref=next(e for e in json.loads((r/'canonical/CANONICAL_NEXT10_REFERENCE_AUDIT_V1.json').read_text())['entries'] if e['id']==c['id'])
o=r/'canonical'/c['prep'];assert not o.exists(),'Use a fresh candidate directory';o.mkdir()
names=['idle','guard','walkA','walkB','crouch','jump','punch','low','grab','empty-release','knife','shoot-mk22','reload-mk22','hit','ko','roll']
sources=[];selected={'right':{},'left':{}};cal={};allExcluded=[];diagnostics=[]
for side in ['right','left']:
 src=Path(c['sources'][side]);raw=src.read_bytes()
 with Image.open(src) as im:
  assert im.mode=='RGBA';dim=list(im.size);alpha=np.asarray(im.getchannel('A'))
 labs,n=label(alpha>16,np.ones((3,3),np.int8));comps=[]
 for i,box in enumerate(find_objects(labs),1):
  if box is None:continue
  ys,xs=box;comps.append({'id':i,'area':int((labs[box]==i).sum()),'rect':[xs.start,ys.start,xs.stop,ys.stop]})
 mains=[v for v in comps if v['area']>=c.get('minimumFigureArea',8000)]
 assert len(mains)==16,('Physical review required: expected16 large figures',side,len(mains))
 ordered=[]
 mains.sort(key=lambda v:v['rect'][1])
 for row in range(4):ordered.extend(sorted(mains[row*4:row*4+4],key=lambda v:v['rect'][0]))
 groups=[[v['id']] for v in ordered];extra=[]
 for tiny in comps:
  if tiny in mains:continue
  x0,y0,x1,y1=tiny['rect'];matches=[]
  for i,m in enumerate(ordered):
   a0,b0,a1,b1=m['rect'];margin=c.get('containmentMarginPixels',5)
   if x0>=a0-margin and y0>=b0-margin and x1<=a1+margin and y1<=b1+margin:matches.append(i)
  if len(matches)==1:groups[matches[0]].append(tiny['id'])
  else:extra.append(tiny)
 poses=[{'name':name,'side':side,'semanticPoseIndex':i,'candidateUsage':'physical-review-pending','componentIDs':sorted(groups[i]),'holdReasons':[]} for i,name in enumerate(names)]
 for e in extra:
  poses.append({'name':'unmapped-native-artifact-'+str(e['id']),'side':side,'semanticPoseIndex':None,'candidateUsage':'held-unmapped','componentIDs':[e['id']],'holdReasons':['Unmapped source artifact outside every reviewed figure region; do not expose in any animation. Root physical review of exclusion required.']})
 allExcluded.extend({'side':side,**e}for e in extra)
 x0,y0,x1,y1=ordered[0]['rect'];height=y1-y0
 sources.append({'path':str(src),'bytes':len(raw),'sha256':hashlib.sha256(raw).hexdigest(),'dimensions':dim,'sourceFrameHeight':height,'calibration':{'method':'same-page-neutral-standing','poseName':'idle','measuredHeadToSolePixels':height,'status':'Candidate same-page neutral bounds; Root anatomical density, body axis and floor review required.'},'poses':poses})
 selected[side]={str(i):{'sourcePath':str(src),'pose':name} for i,name in enumerate(names)};cal[str(src)]={side:'idle'}
 diagnostics.append({'side':side,'components':comps,'explicitProposedComponents':groups,'excludedArtifacts':extra,'sourcePNGUnchanged':src.read_bytes()==raw})
book={'schema':'cqc.p40.explicit-source-ownership-candidate/1','approved':False,'uid':'core__snake','id':c['id'],'sourceAlphaThreshold':16,'sourceConnectivity':8,'sources':sources,'nativePhysicalBodyCount':32,'additionalCalibrationBodyCount':0,'gaitCertification':False,'reference':{k:ref[k]for k in ['path','bytes','sha256','url']},'unmappedArtifacts':allExcluded,'limitations':['P41 candidate only; historical P40 book schema is used solely as measurement format. Root approval is never inherited.','All32 drawings require per-pose physical review against original KONAMI costume and exact1964 pre-eyeinjury identity. Native body/anatomy, costume texture, concealed surfaces and retail animation timings are not certified absolute1:1.','Pixel ownership uses explicit bounded containment proposals, no nearest-distance assignment and no raster mutation. Unmapped artifacts remain separately owned and excluded until Root review.','Only two walk keyposes per facing; repeated temporal frames are authored limited CQC choreography.','Native muzzle/release points, frame density, body axes and real gameplay must be checked before admission.']}
bp=o/'ROLEBOOK_NATIVE_CANDIDATE_V1.json';bp.write_text(json.dumps(book,indent=2)+'\n')
spec={'uid':'core__snake','id':c['id'],'label':ref['label'],'family':'canonical','geometryPath':str(o/'NATIVE_GEOMETRY_CANDIDATE_V1.json.gz'),'ownershipBookPath':str(bp),'output':str(r/'integration'/c['integration']),'provenance':{'kind':'canonical-game-costume','sourceUID':'core__snake','sourceSpriteUID':'core__snake','originalDesign':False,'canonicalAppearanceAttested':True,'incarnation':'Naked Snake — original MGS3 PS2,1964, before eye injury; two natural eyes.','costumeName':ref['label'],'sources':[{'url':ref['url'],'sha256':ref['sha256'],'scope':'Original KONAMI PS2 costume plate; visible palette, fabric motif and kit only. Edition availability and unseen surfaces remain qualified.'},{'url':'https://www.konami.com/mg/mc/manual/mgs3/ps5/en/page21.html','scope':'Publisher Mk22 silhouette/manual cycling reference; authored CQC phases are an adaptation.'}]},'selectedRoles':selected,'calibrationPoses':cal,'anchors':c.get('anchors',[]),'sourceLimitations':book['limitations'],'gaitCertification':False}
(o/'SOURCE_SELECTION_SPEC_V1.json').write_text(json.dumps(spec,indent=2)+'\n');(o/'CONTAINMENT_PROPOSALS_UNAPPROVED_V1.json').write_text(json.dumps(diagnostics,indent=2)+'\n')
print(json.dumps({'candidateDirectory':str(o),'physicalRoles':32,'unmappedArtifacts':allExcluded,'sourceMutations':False,'RootReview':'pending'}))
