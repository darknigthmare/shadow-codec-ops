from pathlib import Path
import json,hashlib
r=Path('@PROJECT_ROOT@');p=r/'art/core__snake/mgs3-camo-grenade'
names=['idle','guard','walkA','walkB','crouch','jump','punch','low','grab','empty-release','knife','shoot-mk22','reload-mk22','hit','ko','roll']
maps={'right-16-v1':[[1,5,6,9,10,11],[4,7],[3,8],[2],[14],[12,16],[13],[15,17],[19,23],[18,22,24],[21],[20],[25],[26],[29,30,31],[27,28]],'left-16-v1':[[1,5],[4,6],[2],[3],[10],[7],[8,9],[11],[15,19],[13,16],[14],[12,17,18],[20],[21],[23,24],[22]]}
sources=[]
def pose(name,side,role,ids,hold=None,usage=None):
 return dict(name=name,side=side,semanticPoseIndex=None if hold else role,candidateUsage=usage or ('held-unmapped' if hold else 'calibration-only' if role is None else 'physical-review-pending'),componentIDs=ids,holdReasons=hold or [],**({'originalSemanticPoseIndex':role} if hold and role is not None else {}))
def source(stem,height,poses,calibration,**extra):
 f=p/(stem+'.png');b=f.read_bytes();cc=json.loads((p/(stem+'-cc.json')).read_text());assert sorted(sum([v['componentIDs'] for v in poses],[]))==sorted(c['id'] for c in cc['components'])
 return dict(path=str(f),bytes=len(b),sha256=hashlib.sha256(b).hexdigest(),dimensions=[cc['width'],cc['height']],sourceFrameHeight=height,calibration=calibration,poses=poses,**extra)

for stem,groups in maps.items():
 side='left' if stem.startswith('left') else 'right';h=343 if side=='left' else 312;poses=[]
 for i,ids in enumerate(groups):
  hold=['Original walk pair duplicates lead leg or substitutes back-view; retained unmapped and replaced by independent gait source.'] if i in [2,3] else ['Original RIGHT KO has head at right but face points down/left toward feet; retained unmapped, replaced by native trueRIGHT side-profile KO.'] if side=='right' and i==14 else []
  poses.append(pose(names[i],side,i,ids,hold))
 sources.append(source(stem,h,poses,dict(method='same-page-neutral-standing',poseName='idle',measuredHeadToSolePixels=h,status='Candidate source extent; Root anatomy/calibration review required.')))
poses=[pose('gait-neutral-right','right',None,[1,4]),pose('walkA','right',2,[2]),pose('walkB','right',3,[3]),pose('unused-gait-neutral-left','left',None,[5]),pose('old-walkA-left','left',2,[7,8,9],['LEFT pair does not exchange actual near arm/leg; replaced by independently drawn native LEFT3 source.']),pose('old-walkB-left','left',3,[6],['LEFT pair duplicates the same lead and near-arm direction; replaced by native LEFT3.']),pose('ko','right',14,[10])]
sources.append(source('native-gait-ko-seven-v1',504,poses,dict(method='same-page-right-neutral-standing',poseName='gait-neutral-right',measuredHeadToSolePixels=504,status='Only RIGHT actions selected. LEFT neutral is calibration-only/unused, height500; no LEFT actions selected. Root reviews real leg/arm opposition and trueRIGHT KO.')))
poses=[pose('gait-neutral-left','left',None,[1]),pose('walkA','left',2,[2,4]),pose('walkB','left',3,[3])]
sources.append(source('left-gait-three-v1',827,poses,dict(method='same-page-left-neutral-standing',poseName='gait-neutral-left',measuredHeadToSolePixels=827,status='Candidate independent LEFT gait: right holstered leg trails inA and advances inB; near arm opposes near leg. Root exact review pending.')))
ref=r/'references/canonical/camo_unifo_grenade.gif'
j=dict(schema='cqc.p40.explicit-source-ownership-candidate/1',approved=False,uid='core__snake',id='mgs3-camo-grenade',sourceAlphaThreshold=16,sourceConnectivity=8,sources=sources,nativePhysicalBodyCount=32,additionalCalibrationBodyCount=3,heldOriginalPhysicalBodies=7,gaitCertification=False,reference=dict(path=str(ref),bytes=ref.stat().st_size,sha256=hashlib.sha256(ref.read_bytes()).hexdigest()),limitations=['All4sourcePNG physically viewed and every alpha>16 component explicitly assigned once, including tiny fragments. Original bytes unchanged and preserved.','Original dark olive tactical cloth and externally strapped inert oval grenade equipment follows official original MGS3PS2 Grenade uniform. No handling/explosive-use poses.','Four old atlaswalks, wrong-facingRIGHTKO, two duplicate LEFT gait drawings retained unmapped. New RIGHTgait/KO and independent LEFT3gait selected as candidates only.','Source heights312/343/504/827 are measured same-page neutral extents, not approved anatomical densities. Pelvis/sole anchors, source weapon points and per-action density still need Root review.','Exact tiny texture/strap placement, knee-pad side and unseen surfaces remain qualified reference-led2D interpretations. No absolute1:1 or full retail cycle certification.'])
(p/'ROLEBOOK_NATIVE_CANDIDATE_V1.json').write_text(json.dumps(j,indent=2)+'\n')
l=r/'art/MGS3_LAST_SIX_PRODUCTION_LEDGER_V1.json';j=json.loads(l.read_text());total=0
for e in j['entries']:
 receipts=list((r/'art/core__snake'/e['optionId']).glob('*-receipt.json'));e['candidatePNGCount']=len(receipts);e['sourceArtGenerated']=bool(receipts);e['completed']=False;total+=sum(json.loads(f.read_text())['bytes'] for f in receipts)
j['newNativePNGUsedBytes']=total;assert total<=35000000;l.write_text(json.dumps(j,indent=2)+'\n');print({'allSixUsed':total,'remaining':35000000-total})
