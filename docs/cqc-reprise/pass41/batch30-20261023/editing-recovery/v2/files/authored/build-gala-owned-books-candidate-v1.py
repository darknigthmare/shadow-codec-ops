"""Read native alpha only; create explicitly unapproved ownership candidates.
No raster pixels are edited. Ambiguous ownership fails instead of nearest assignment.
"""
from pathlib import Path
import hashlib,json,datetime
import numpy as np
from scipy.ndimage import label,find_objects
from PIL import Image
R=Path('@PROJECT_ROOT@')
PLAN=json.loads((R/'authored/NINE_GALA_GENERATION_PLAN_CANDIDATE_V1.json').read_text())
NAMES=['idle','guard','walkA','walkB','crouch','jump','punch','low','throw','deploy','heavy','special','recover','hit','KO','roll']
reports=[]
manual_path=R/'authored/OWNERSHIP_MANUAL_FRAGMENT_OVERRIDES_V1.json'
manual=json.loads(manual_path.read_text()) if manual_path.exists() else {}
for job in PLAN:
 uid=job['uid'];d=R/'art'/uid/'tuxedo';sources=[]
 for basename in ['right-v1.png','left-v2.png','right-body-supplement-v1.png','left-body-supplement-v1.png','right-weapon-supplement-v1.png','left-weapon-supplement-v1.png']:
  p=d/basename
  if not p.exists():continue
  side=basename.split('-')[0];raw=p.read_bytes()
  with Image.open(p) as im:
   if im.mode!='RGBA':raise RuntimeError(f'Native RGBA needed {p}')
   alpha=np.asarray(im.getchannel('A'));labs,n=label(alpha>16,np.ones((3,3),np.int8));sizes=np.bincount(labs.ravel());regions=find_objects(labs)
   comp={i:{'id':i,'pixels':int(sizes[i]),'rect':[b[1].start,b[0].start,b[1].stop-b[1].start,b[0].stop-b[0].start]} for i,b in enumerate(regions,1) if b is not None}
   major=[v for v in comp.values() if v['pixels']>8000]
   correction=manual.get(str(p.relative_to(R)),{})
   if correction and correction.get('sha256')!=hashlib.sha256(raw).hexdigest():raise RuntimeError('Manualoverridepinmismatch')
   diagnostics=R/'authored/component-tables'/uid/(basename+'.components.json')
   diagnostics.parent.mkdir(parents=True,exist_ok=True)
   diagnostics.write_text(json.dumps({'path':str(p),'sha256':hashlib.sha256(raw).hexdigest(),'dimensions':list(im.size),'components':list(comp.values())},indent=2)+'\n')
   count=len(correction['majorSemanticPoseIndices']) if correction.get('majorSemanticPoseIndices') else (4 if 'supplement' in basename else 16)
   if len(major)!=count:reports.append({'path':str(p),'status':'needs-manual-component-review','largeComponentCount':len(major),'expected':count});continue
   columns=2 if count==4 else 4
   ordered=[]
   bytop=sorted(major,key=lambda v:v['rect'][1])
   for k in range(0,count,columns):ordered.extend(sorted(bytop[k:k+columns],key=lambda v:v['rect'][0]))
   # Explicit source-figure envelopes are stored in the book for visual review.
   envelopes=[]
   for v in ordered:
    x,y,w,h=v['rect'];envelopes.append([max(0,x-10),max(0,y-10),min(im.width,x+w+10),min(im.height,y+h+10)])
   owners={v['id']:i for i,v in enumerate(ordered)}
   for cid,index in correction.get('componentOwnerIndices',{}).items():
    cid=int(cid)
    if cid not in comp or cid in owners or index not in range(count):raise RuntimeError('Invalidexplicitmanualoverride')
    owners[cid]=index
   ambiguous=[]
   for cid,v in comp.items():
    if cid in owners:continue
    x,y,w,h=v['rect'];matches=[i for i,(l,t,r,b) in enumerate(envelopes) if x>=l and y>=t and x+w<=r and y+h<=b]
    if len(matches)!=1:ambiguous.append({'component':v,'matches':matches});continue
    owners[cid]=matches[0]
   if ambiguous:
    reports.append({'path':str(p),'status':'needs-explicit-manual-fragment-ownership','ambiguous':ambiguous,'diagnostics':str(diagnostics)})
    continue
   semantic=correction.get('majorSemanticPoseIndices') or ([0,8,12,15] if uid=='roster50__campbell_mgs4' and 'body-supplement' in basename else [0,3,12,15] if 'body-supplement' in basename else [3,11,12,9] if 'weapon-supplement' in basename else list(range(16)))
   poses=[]
   for i,v in enumerate(ordered):
    role=semantic[i];ids=sorted(k for k,owner in owners.items() if owner==i);mask=np.isin(labs,ids);edge=int(mask[0].sum()+mask[-1].sum()+mask[:,0].sum()+mask[:,-1].sum());hold=[]
    hold.extend(correction.get('poseHoldReasons',{}).get(str(role),[]))
    if edge:hold.append('Nativeopaquealphaattouchescanvasedge; framing review/correction required.')
    if count>=15 and role==3:hold.append('Original walkB stride requires opposed-leg physical counterreview; new independent step source prepared.')
    if basename=='right-v1.png' and role==12 and uid in ['roster50__mei_mgs1','roster50__nastasha_mgs1']:hold.append('Physical visual review: native standing recovery drawing incomplete lower legs; new whole-body recovery prepared.')
    poses.append({'name':side+'-'+p.stem+'-'+NAMES[role],'side':side,'semanticPoseIndex':role,'physicalPoseIndex':i,'candidateUsage':'physical-review-pending'if not hold else'held-pending-correction','componentIDs':ids,'explicitOwnershipEnvelope':envelopes[i],'majorComponentID':v['id'],'holdReasons':hold})
   sources.append({'path':str(p),'bytes':len(raw),'sha256':hashlib.sha256(raw).hexdigest(),'dimensions':list(im.size),'alphaConnectedComponentCount':n,'assignmentEvidence':'Provisional row/column order derived from16or4 whole-figure main alpha components. Actual physical semantics, direction and anatomy must still be explicitly reviewed. Every residual fragment must fit exactly one explicitly stored10px envelope; ambiguity fails; no nearest-neighbour assignment. This remains unapproved evidence.','poses':poses})
  if p.read_bytes()!=raw:raise RuntimeError('Sourcechanged')
 book={'schema':'cqc.p40.explicit-source-ownership-candidate/1','uid':uid,'id':'tuxedo','approved':False,'runtimeAdmitted':False,'createdAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'alphaThreshold':16,'assignmentMethod':'Complete component table with explicit bounded envelopes and unique containment, no source mutation or nearest-neighbour assignment. Root physical review still required.','originalDesign':True,'canonicalAppearanceAttested':False,'sources':sources,'limits':['No Root approval is inherited or invented.','Correct anatomy, real direction, body density, face fidelity, source weapon points, canonical source relationship and actual game behavior remain independently reviewable.','Old wrong-facing and initial custom-order sources are preserved outside this selection candidate.']}
 q=d/'ownership-candidate-v1.json';q.write_text(json.dumps(book,ensure_ascii=False,indent=2)+'\n');reports.append({'uid':uid,'path':str(q),'sources':len(sources),'drawings':sum(len(s['poses'])for s in sources),'bytes':q.stat().st_size,'sha256':hashlib.sha256(q.read_bytes()).hexdigest(),'holds':sum(bool(p['holdReasons'])for s in sources for p in s['poses'])})
out=R/'authored/OWNERSHIP_BOOK_BUILD_CANDIDATE_V1.json';out.write_text(json.dumps(reports,ensure_ascii=False,indent=2)+'\n');print(json.dumps(reports,ensure_ascii=False))
