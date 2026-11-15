from pathlib import Path
import json,hashlib
r=Path('@PROJECT_ROOT@');p=r/'art/core__snake/mgs3-camo-santa-claus'
names=['idle','guard','walkA','walkB','crouch','jump','punch','low','grab','empty-release','knife','shoot-mk22','reload-mk22','hit','ko','roll']
maps={'right-16-v1':[[1,5],[4],[2],[3],[11],[6,8,9],[7,10],[12],[13],[14,17,20],[16,19],[15,18],[21,25],[22,23],[26,27],[24]],'left-16-v1':[[1],[4,5,7],[2,9],[3,6,8],[13],[10],[11,12],[14],[16],[15],[17,19],[18],[20],[21],[24,25],[22,23]]}
sources=[]
def source(stem,height,poses,calibration):
 f=p/(stem+'.png');b=f.read_bytes();cc=json.loads((p/(stem+'-cc.json')).read_text())
 assert sorted(sum([v['componentIDs'] for v in poses],[]))==sorted(c['id'] for c in cc['components'])
 return dict(path=str(f),bytes=len(b),sha256=hashlib.sha256(b).hexdigest(),dimensions=[cc['width'],cc['height']],sourceFrameHeight=height,calibration=calibration,poses=poses)
for stem,groups in maps.items():
 side='left' if stem.startswith('left') else 'right';h=343 if side=='left' else 319;poses=[]
 for i,ids in enumerate(groups):
  hold=['Original atlas walk pair does not prove alternating anatomical lead legs; superseded by independently drawn native gait.'] if i in[2,3] else []
  poses.append(dict(name=names[i],side=side,semanticPoseIndex=None if hold else i,candidateUsage='held-unmapped' if hold else 'physical-review-pending',componentIDs=ids,holdReasons=hold,**({'originalSemanticPoseIndex':i} if hold else {})))
 sources.append(source(stem,h,poses,dict(method='same-page-neutral-standing',poseName='idle',measuredHeadToSolePixels=h,status='Candidate source extent; Root anatomy/calibration review required.')))
poses=[]
for name,side,role,ids,hold in [('gait-neutral-right','right',None,[1,4],[]),('walkA','right',2,[2],[]),('walkB','right',3,[3,5],[]),('gait-neutral-left','left',None,[6],[]),('walkA-old-left','left',None,[7],['Left gait nearly duplicates near-leg lead and arm swing across frames; held unmapped, replaced by independent threefigure left gait.']),('walkB-old-left','left',None,[8],['Left gait nearly duplicates near-leg lead and arm swing across frames; held unmapped, replaced by independent threefigure left gait.'])]:
 poses.append(dict(name=name,side=side,semanticPoseIndex=role,candidateUsage='held-unmapped' if hold else 'calibration-only' if role is None else 'physical-review-pending',componentIDs=ids,holdReasons=hold))
sources.append(source('native-gait-six-v1',475,poses,dict(method='same-page-right-neutral-standing',poseName='gait-neutral-right',measuredHeadToSolePixels=475,leftUnmappedNeutralExtent=484,status='Right actions only use475; allLEFTactions on this source heldunmapped. Root still reviews visible right-leg alternation.')))
poses=[dict(name=n,side='left',semanticPoseIndex=k,candidateUsage='calibration-only' if k is None else 'physical-review-pending',componentIDs=[i],holdReasons=[]) for n,k,i in [('gait-neutral-left',None,1),('walkA',2,2),('walkB',3,3)]]
sources.append(source('left-gait-three-v1',803,poses,dict(method='same-page-left-neutral-standing',poseName='gait-neutral-left',measuredHeadToSolePixels=803,status='Candidate source803px: body/gear side ownership and arm-leg opposite swing physically reviewed; Root certification pending.')))
ref=r/'references/canonical/camo_unifo_santa.gif'
j=dict(schema='cqc.p40.explicit-source-ownership-candidate/1',approved=False,uid='core__snake',id='mgs3-camo-santa-claus',sourceAlphaThreshold=16,sourceConnectivity=8,sources=sources,nativePhysicalBodyCount=32,additionalCalibrationBodyCount=3,heldOriginalPhysicalBodies=6,gaitCertification=False,reference=dict(path=str(ref),bytes=ref.stat().st_size,sha256=hashlib.sha256(ref.read_bytes()).hexdigest()),limitations=['All4PNG sources physically viewed, original bytes preserved and every opaque component explicitly owned once; no automatic nearest-neighbor grouping.','Original red tactical short-sleeve shirt, white collar/opening/cuffs, dark bandana and ordinary brown beard follow official PS2 costume, noSanta hat/coat/fake beard.','Original4atlaswalks and2ambiguousLEFT6pagewalks preserved held/unmapped; selected newLEFT3page visibly swaps far holstered vs near bare leg leading and arm swing. Root still must certify.','Approximate source head/sole extents319/343/475/803 are candidate calibrations, not full retail movement or exact3D source density. Pelvis/sole anchors and Mk22/release source points remain to review.','Canonical right-thigh holster is targeted. Knee-pad side/straps and tiny unseen garment surfaces require more reference review and are not absolute1:1certified.'])
(p/'ROLEBOOK_NATIVE_CANDIDATE_V1.json').write_text(json.dumps(j,indent=2)+'\n')
l=r/'art/MGS3_LAST_SIX_PRODUCTION_LEDGER_V1.json';j=json.loads(l.read_text());total=0
for e in j['entries']:
 receipts=list((r/'art/core__snake'/e['optionId']).glob('*-receipt.json'));e['candidatePNGCount']=len(receipts);e['sourceArtGenerated']=bool(receipts);e['completed']=False;total+=sum(json.loads(f.read_text())['bytes'] for f in receipts)
j['newNativePNGUsedBytes']=total;assert total<=35000000;l.write_text(json.dumps(j,indent=2)+'\n');print({'allSixUsed':total,'remaining':35000000-total})
