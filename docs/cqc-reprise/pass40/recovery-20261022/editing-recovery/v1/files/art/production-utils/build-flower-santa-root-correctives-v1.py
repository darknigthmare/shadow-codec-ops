from pathlib import Path
import json,hashlib,copy
r=Path('@PROJECT_ROOT@');flower=r/'art/core__snake/mgs3-camo-flower';santa=r/'art/core__snake/mgs3-camo-santa-claus'
def pose(name,side,role,ids,hold=None):
 return dict(name=name,side=side,semanticPoseIndex=None if hold else role,candidateUsage='held-unmapped' if hold else 'calibration-only' if role is None else 'physical-review-pending',componentIDs=ids,holdReasons=hold or [],**({'originalSemanticPoseIndex':role} if hold and role is not None else {}))
def source(stem,h,poses,**extra):
 f=flower/(stem+'.png');cc=json.loads((flower/(stem+'-cc.json')).read_text());assert sorted(sum([v['componentIDs'] for v in poses],[]))==sorted(c['id'] for c in cc['components'])
 return dict(path=str(f),bytes=f.stat().st_size,sha256=hashlib.sha256(f.read_bytes()).hexdigest(),dimensions=[cc['width'],cc['height']],sourceFrameHeight=h,calibration=dict(method='same-page-same-costume-neutral-standing',measuredHeadToSolePixels=h,status='Candidate source extent only; Root anatomy, identity, material pattern and calibration review required.'),poses=poses,**extra)
for folder,oldver,newver in [(flower,'V3','V4'),(santa,'V1','V2')]:
 j=json.loads((folder/('ROLEBOOK_NATIVE_CANDIDATE_'+oldver+'.json')).read_text())
 for s in j['sources']:
  for p in s['poses']:
   replacement=p['side']=='right' and p['semanticPoseIndex']==14 or folder==flower and p['side']=='left' and p['semanticPoseIndex']==2
   if replacement:p.update(originalSemanticPoseIndex=p['semanticPoseIndex'],semanticPoseIndex=None,candidateUsage='held-unmapped',holdReasons=['Root actual source review: old RIGHT KO has head raised/supporting forearms or eyes open like getup; replaced by new relaxed head-resting closed-eyes KO candidate.'] if p['side']=='right' else ['Root actual source review: nearLEFT arm and leg advance together. Replaced by new native walkA corrective candidate.'])
 if folder==flower:
  j['sources'].append(source('left-gait-a-corrective-v1',919,[pose('corrective-neutral-left','left',None,[1]),pose('walkA','left',2,[2])]))
  poses=[pose('ko-neutral-flower-right','right',None,[1]),pose('ko','right',14,[2]),pose('other-costume-santa-neutral','right',None,[3],['Other costume on same physical source; preserved explicitly unmapped in Flower job.']),pose('other-costume-santa-ko','right',None,[4],['Other costume on same physical source; preserved explicitly unmapped in Flower job.'])];h=506
 else:
  poses=[pose('other-costume-flower-neutral','right',None,[1],['Other costume on same physical source; preserved explicitly unmapped in Santa job.']),pose('other-costume-flower-ko','right',None,[2],['Other costume on same physical source; preserved explicitly unmapped in Santa job.']),pose('ko-neutral-santa-right','right',None,[3]),pose('ko','right',14,[4])];h=504
 j['sources'].append(source('right-ko-flower-santa-four-v1',h,poses,sharedPhysicalSource=True,proposedLogicalAlias='right-ko-root-corrective-'+('flower' if folder==flower else 'santa')+'-native.png',physicalSourceUnchanged=True))
 selected=[(p['side'],p['semanticPoseIndex']) for s in j['sources'] for p in s['poses'] if p['semanticPoseIndex'] is not None];assert len(selected)==len(set(selected))==32
 j['nativePhysicalBodyCount']=32;j['additionalCalibrationBodyCount']=sum(p['candidateUsage']=='calibration-only' for s in j['sources'] for p in s['poses']);j['heldOriginalPhysicalBodies']=sum(p['candidateUsage']=='held-unmapped' for s in j['sources'] for p in s['poses']);j['approved']=False;j['gaitCertification']=False;j['supersedesCandidateBook']=str(folder/('ROLEBOOK_NATIVE_CANDIDATE_'+oldver+'.json'))
 j['limitations']+=['Root requested only FlowerLEFTwalkA and bothRIGHTKO replacements; new source selection is candidate, never an art/runtime approval. All old source figures remain explicitly held, not erased.','Shared4figure KO source needs disjoint logical aliases: Flowerneutral506 / Santaneutral504. Other costume figures explicitly owned but unmapped in each job. No crosscostume contamination or source deletion.','New KO candidates have relaxed chest/head resting low and closed eyes. Exact lying-face orientation and anatomy still need Root actual-image judgment; no prompt-based approval.']
 out=folder/('ROLEBOOK_NATIVE_CANDIDATE_'+newver+'.json');out.write_text(json.dumps(j,indent=2)+'\n');print({'path':str(out),'neutral':j['additionalCalibrationBodyCount'],'held':j['heldOriginalPhysicalBodies']})
