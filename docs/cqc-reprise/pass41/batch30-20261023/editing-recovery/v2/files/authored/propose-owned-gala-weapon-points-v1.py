"""Read unmodified alpha to propose source points inside physically viewed weapons.

Each gun band is an explicit review choice; point ownership is restricted to
the selected shoot drawing. No global source extrema or neighbouring actors.
"""
from pathlib import Path
import json,hashlib,gzip
import numpy as np
from scipy.ndimage import label
from PIL import Image
R=Path('@PROJECT_ROOT@')
UIDS=['roster50__campbell_mgs1','archive__holly_white','roster50__campbell_mgs4','roster50__meiling_mgs4']
manual=json.loads((R/'authored/OWNERSHIP_MANUAL_FRAGMENT_OVERRIDES_V1.json').read_text())
rows=[]
for uid in UIDS:
 d=R/'art'/uid/'tuxedo';geom=json.loads(gzip.decompress((d/'geometry-frozen-v1.json.gz').read_bytes()));selected=json.loads((d/'selected-body-roles-candidate-v1.json').read_text());out=[]
 for side in ['right','left']:
  source=next(s for s in geom['sources']if Path(s['path']).name==side+'-weapon-supplement-v1.png');p=Path(source['path']);raw=p.read_bytes();assert hashlib.sha256(raw).hexdigest()==source['sha256'];im=Image.open(p);alpha=np.asarray(im.getchannel('A'));labs,n=label(alpha>16,np.ones((3,3),np.int8));shoot=next(q for q in source['poses']if q['name']==selected['selected'][side]['11']);owned=np.isin(labs,shoot['componentIDs']);band=[85,150]
  by,bx=np.nonzero(owned[band[0]:band[1]+1]);by=by+band[0];assert len(bx)
  extreme=int(bx.max()if side=='right'else bx.min());dy=by[bx==extreme];sy=int(dy[len(dy)//2]);point=[extreme,sy];assert int(alpha[sy,extreme])>16 and int(labs[sy,extreme])in shoot['componentIDs']
  key=str(p.relative_to(R));ids=list(manual[key]['componentOwnerIndices']);assert len(ids)==1;grenadeID=int(ids[0]);gy,gx=np.nonzero(labs==grenadeID);gpoint=[float(gx.mean()),float(gy.mean())];xx,yy=map(lambda v:int(round(v)),gpoint);assert int(labs[yy,xx])==grenadeID and int(alpha[yy,xx])>16
  release=next(q for q in source['poses']if q['name']==selected['selected'][side]['9']);assert grenadeID in release['componentIDs']
  out.append({'side':side,'sourcePath':str(p),'sourceSHA256':source['sha256'],'sourceDimensions':source['dimensions'],'shootPose':shoot['name'],'shootComponentIDs':shoot['componentIDs'],'explicitNativeBarrelReviewBandY':band,'muzzleNativePointProposal':point,'muzzleAlpha':int(alpha[sy,extreme]),'muzzleComponentID':int(labs[sy,extreme]),'grenadeReleasePose':release['name'],'grenadeDetachedComponentID':grenadeID,'grenadeNativePointProposal':gpoint,'grenadePointAlpha':int(alpha[yy,xx]),'sourcePNGMutations':False,'approved':False,'rootReviewPending':True,'method':'Native opaque endpoint inside physically viewed horizontal handgun barrel band, restricted to explicitly owned shoot components. Grenade centre belongs to explicitly manually assigned detached drawn grenade component. These are source geometry proposals; final transformed runtime binding and muzzle/release-frame semantics still require Root review.'})
 q=d/'weapon-source-points-candidate-v1.json';assert not q.exists();q.write_text(json.dumps({'schema':'cqc.p41.native-weapon-point-proposals/1','uid':uid,'id':'tuxedo','approved':False,'runtimeAdmitted':False,'sources':out,'limits':['Period-universe weapon is an explicit CQC kit adaptation, not attested canonical ownership by this character.','Muzzle and already released grenade pixels are distinct action origins and need renderer review.','No other actor or foot component may supply a gun point.']},ensure_ascii=False,indent=2)+'\n');rows.append({'uid':uid,'path':str(q),'bytes':q.stat().st_size,'sha256':hashlib.sha256(q.read_bytes()).hexdigest()})
q=R/'authored/FOUR_ADDITIONAL_NATIVE_WEAPON_POINTS_CANDIDATE_V1.json';q.write_text(json.dumps(rows,indent=2)+'\n');print(json.dumps(rows))
