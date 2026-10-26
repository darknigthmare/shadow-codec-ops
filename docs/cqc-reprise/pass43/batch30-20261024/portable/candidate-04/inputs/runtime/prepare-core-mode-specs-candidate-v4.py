"""Pin mode-specific aliases to compiled VS metadata; emit pending reviews only."""
from pathlib import Path
import os,json,hashlib,sys
R=Path('/workspace/cqc-p43-resume-20261025');I=R/'integration'
def read(p):
 with os.fdopen(os.open(p,os.O_RDONLY|os.O_NOATIME),'rb')as f:return f.read()
def pin(p):
 b=read(p);return {'path':str(p),'bytes':len(b),'sha256':hashlib.sha256(b).hexdigest()}
def verified(x):
 b=read(x['path']);assert len(b)==x['bytes'] and hashlib.sha256(b).hexdigest()==x['sha256'];return b
cfg=json.loads(read(sys.argv[1]));assert cfg['schema']=='cqc.p43.core-mode-spec-preparation/1';out=Path(cfg['output']);assert out.is_relative_to(I) and not out.exists();archive=json.loads(verified(cfg['archive']));assert archive['schema']=='cqc.p43.artifact-source-files/2';metadata={}
for r in archive['files']:
 if r['logicalPath'].endswith('/metadata-v2.json'):
  d=json.loads(verified(r));metadata[(d['uid'],d['id'])]=(r,d)
pwPin=pin(R/'art-jobs/THREE_PW_CORE_MK22_NATIVE10_POINTS_PENDING_V1.json');assert pwPin['sha256']=='6df6b3be8949ef1627a0de32d5033fcd4526cf8605427e8ec6d42ba81cc1cca6';pw=json.loads(verified(pwPin))['entries']
venomPin=pin(R/'art-jobs/FIVE_VENOM_CORE_CONTACT10_REPAIRED_PROPOSALS_PENDING_V3.json');assert venomPin['sha256']=='e8aa837283800ed5abfec1e648a53cf25e4740bcb362b5334035820be5d083b5';venom=json.loads(verified(venomPin))['entries']
out.mkdir();proposals=[]
for key,(record,d) in metadata.items():
 uid,id=key;s=d['option']['sprite'];spec={'schema':'cqc.p43.core-mode-variant-spec/1','uid':uid,'id':id,'baseMetadataSHA256':record['sha256'],'baseArtAuditSHA256':d['artAuditSHA256'],'sameSourcePNGBytes':True,'sourcePointBodyAlphaThreshold':16,'runtimeAdmitted':False}
 if uid=='core__snake_pw':
  entries=[a for a in pw if a['id']==id];assert len(entries)==2 and {a['side'] for a in entries}=={'right','left'};anchors=[]
  for a in entries:
   role=[f for f in s['actions' if a['side']=='right' else 'oppositeActions']['blade']['frames'] if f['physicalPoseIndex']==10];assert role and role[0]['sha256']==a['sourcePNG']['sha256'];anchors.append({k:a[k] for k in ['side','roleIndex','slot','tag','socket','nativeXY','rearNativeXY']})
  spec.update(kind='pw-mk22-and-reload',coreShootRole=10,coreReloadRole=9,coreDormantM16Role=11,coreDormantM16Action='optic',coreDormantM16ReloadRole=12,coreDormantM16ReloadAction='parry',coreUnarmedUtilityRole=1,coreNonlethalCommandGrabRole=8,coreAnchors=anchors,proposalEvidence=pwPin,scope='Core uses its actual Mk22 TRANQ10 and reload9, VS/Support M16 source11/reload12 unchanged. Core keeps source11 in unmapped dormant optic group and source12 in dormant parry, preserving all16 physical roles; recover and weaponless utilities show guard1. Captured nonlethal command grabs/4200vigilance super show authored throw8 without changing gameplay. No extra Core ability. Existing source raster32 and scale remain identical; no additional costume.')
 elif uid=='core__venom':
  entries=[a for a in venom if a['id']==id];assert len(entries)==2;points=[]
  for a in entries:
   points.append({'side':a['side'],'roleIndex':10,'socket':'left-bionic-palm-contact','nativeXY':a['contactNativeXY'],'palmNativeXY':a['palmNativeXY'],'wristNativeXY':a['wristNativeXY'],'sourcePNG':a['sourcePNG'],'ownershipBookPin':a['ownershipBookPin'],'geometryPin':a['geometryPin'],'scope':a['scope']})
  spec.update(kind='venom-bionic-contact',coreContactRole=10,contactPoints=points,proposalEvidence=venomPin,scope='Only five new outfits: attached LEFT palm/forearm contact10 action charge [guard1,contact10,guard1], finite native contact <=145; no detached Rocket/Stun Arm upgrade, projectile or electrical effect. Existing windows/cost/damage retained, legacy original and old outfits unchanged.')
 elif uid=='core__mantis':spec.update(kind='mantis-palm-debris',coreSlots=['special','super'],sourceTag='psychic',coreTag='debris',scope='Core debris emits at the exact VS psychic palm11 original source point; no firearm point or alternative source PNG. Teleport utility selects existing neutral recover1.')
 elif uid=='core__raiden_mgs2' and cfg.get('includeRaidenMGS2Reload') is True:spec.update(kind='raiden-mgs2-gun-reload',coreReloadRole=12,coreRecoverRole=1,scope='Core gun stance SOCOM/reload source role11/12; actionMap.specialBack becomes reload only in Core metadata, utility recover1 remains for weaponSwitch. Default blade loadout unchanged. Exact captured gun-stance special slot preserved by Core wrapper.')
 else:continue
 p=out/(uid+'--'+id+'--CORE_MODE_SPEC_CANDIDATE_V1.json');p.write_text(json.dumps(spec,indent=2)+'\n');sp=pin(p);checks={k:False for k in ['identity','equipment','sourceFrameSelection','sourceWeaponPoints','sameSourcePixels']}
 if uid=='core__venom':checks['leftBionicArmAttached']=False
 review={'schema':'cqc.p43.root-core-mode-art-review/1','status':'pending','reviewer':'Root-PENDING','reviewedAt':None,'inputSHA256':sp['sha256'],'checks':checks,'limits':['Pending exact current Root review. These aliases do not attest extracted retail animation or literal1:1 hidden topology.']};rp=out/(uid+'--'+id+'--ROOT_CORE_REVIEW_PENDING_V1.json');rp.write_text(json.dumps(review,indent=2)+'\n');proposals.append({'uid':uid,'id':id,'kind':spec['kind'],'spec':sp,'reviewPending':pin(rp)})
report={'schema':'cqc.p43.core-mode-spec-candidates/1','approved':False,'runtimeAdmitted':False,'productMutations':False,'sourceArchive':cfg['archive'],'proposals':proposals,'count':len(proposals),'additionalCostumes':0};p=out/'CORE_MODE_SPECS_PENDING_HANDOFF_V1.json';p.write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(pin(p)))
