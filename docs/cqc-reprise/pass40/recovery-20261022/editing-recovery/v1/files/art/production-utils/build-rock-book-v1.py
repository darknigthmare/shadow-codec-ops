from pathlib import Path
import json,hashlib
r=Path('@PROJECT_ROOT@');p=r/'art/core__snake/mgs3-camo-rock'
names=['idle','guard','walkA','walkB','crouch','jump','punch','low','grab','empty-release','knife','shoot-mk22','reload-mk22','hit','ko','roll']
maps={'right-16-v1':[[1,5],[4],[2],[3],[8,10,11,13],[6],[7],[9,12],[14,18],[15],[17,20],[16,19],[21],[22,25,26,27],[24],[23,28]],'left-16-v1':[[1],[4,6],[2],[3,5],[10,12,13,15],[7,9],[8],[11,14],[18,20],[16,21],[19],[17],[22,24],[23],[28],[25,26,27]]}
sources=[]
def pose(name,side,role,ids,hold=None):
 return dict(name=name,side=side,semanticPoseIndex=None if hold else role,candidateUsage='held-unmapped' if hold else 'calibration-only' if role is None else 'physical-review-pending',componentIDs=ids,holdReasons=hold or [],**({'originalSemanticPoseIndex':role} if hold and role is not None else {}))
def source(stem,h,poses,**extra):
 f=p/(stem+'.png');cc=json.loads((p/(stem+'-cc.json')).read_text());assert sorted(sum([v['componentIDs'] for v in poses],[]))==sorted(c['id'] for c in cc['components'])
 return dict(path=str(f),bytes=f.stat().st_size,sha256=hashlib.sha256(f.read_bytes()).hexdigest(),dimensions=[cc['width'],cc['height']],sourceFrameHeight=h,calibration=dict(method='same-page-same-facing-neutral-standing',measuredHeadToSolePixels=h,status='Candidate source extent; Root anatomy/calibration review required.'),poses=poses,**extra)
for stem,groups in maps.items():
 side='left' if stem.startswith('left') else 'right';sources.append(source(stem,324,[pose(names[i],side,i,ids,['Original walk pair duplicates near lead or substitutes back camera rotation; retained unmapped and replaced by independent native gait.'] if i in [2,3] else None) for i,ids in enumerate(groups)]))
poses=[pose('gait-neutral-right','right',None,[1]),pose('walkA','right',2,[2]),pose('walkB','right',3,[3]),pose('unused-gait-neutral-left','left',None,[4]),pose('old-walkA-left','left',2,[5],['LEFT pair duplicates neararm/lead instead of true opposite contact; replaced by native LEFT3.']),pose('old-walkB-left','left',3,[6],['LEFT pair duplicates neararm/lead; replaced by native LEFT3.'])]
sources.append(source('native-gait-six-v1',476,poses,unusedLeftNeutralHeight=481))
sources.append(source('left-gait-three-v1',812,[pose('gait-neutral-left','left',None,[1]),pose('walkA','left',2,[3]),pose('walkB','left',3,[2])]))
selected=[(v['side'],v['semanticPoseIndex']) for s in sources for v in s['poses'] if v['semanticPoseIndex'] is not None];assert len(selected)==len(set(selected))==32
ref=r/'references/canonical/camo_unifo_rock.gif'
j=dict(schema='cqc.p40.explicit-source-ownership-candidate/1',approved=False,uid='core__snake',id='mgs3-camo-rock',sourceAlphaThreshold=16,sourceConnectivity=8,sources=sources,nativePhysicalBodyCount=32,additionalCalibrationBodyCount=3,heldOriginalPhysicalBodies=6,gaitCertification=False,reference=dict(path=str(ref),bytes=ref.stat().st_size,sha256=hashlib.sha256(ref.read_bytes()).hexdigest()),limitations=['All4sourcePNG physically viewed, every alpha>16 component explicitly assigned once, no source edits/mirroring/filters.','Original MGS3PS2 Rock printed ochre/mustard/graybeige/charcoal angular pebble cloth follows official reference, not stone armor/body. Exact UV/straps/unseen surfaces and knee-pad side qualified.','Four old atlaswalks and duplicateLEFT6sheet pair preserved unmapped. New RIGHT6sheet top and new independent LEFT3 selected as gait candidates, not promptcertified.','Measured same-page neutral extents324/324/476/812 are candidate densities; pelvis/sole/sourceweaponpoints and peraction calibration need Root review. Unused LEFT6sheetneutral481 has no selected actions.','KO14 source still needs Root semantic review: head may be too raised/eyesopen or forearm-supported like getup15. Selection remains candidate only, never marks completion/admission.','No absolute1:1/fullretailanimationcycle or finalart/runtimeadmission claimed.'])
(p/'ROLEBOOK_NATIVE_CANDIDATE_V1.json').write_text(json.dumps(j,indent=2)+'\n')
print({'sourceBook':str(p/'ROLEBOOK_NATIVE_CANDIDATE_V1.json'),'candidateRoles':32})
