#!/usr/bin/env python3
"""Close the independently generated Black Color producer evidence; no runtime writes."""
from pathlib import Path
from PIL import Image
import copy, hashlib, json, os, statistics
import numpy as np
from scipy import ndimage

BASE=Path(__file__).resolve().parent
REF=Path('/workspace/cqc-pass8-reference-selection/core__ninja_mg2')
UID='core__ninja_mg2'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def write(name,value):
 p=BASE/name
 raw=(json.dumps(value,ensure_ascii=False,indent=2)+'\n').encode()
 if p.exists():
  assert p.read_bytes()==raw,'Closed evidence exists; preserve it and version a new candidate: '+name
 else:
  p.parent.mkdir(parents=True,exist_ok=True)
  with p.open('xb') as f:f.write(raw)

def main():
 ref_contract=json.loads((REF/'SOURCE_CONTRACT.json').read_text())
 selection={'a-right':'A_RIGHT_FULL_01','a-left':'A_LEFT_FULL_02','b-right':'B_RIGHT_FULL_03','b-left':'B_LEFT_FULL_04','c-right':'C_RIGHT_FULL_03','c-left':'C_LEFT_FULL_03'}
 rejected={'B_RIGHT_FULL_02':'Thirteen bodies (4+4+5), incorrect fixed-row mapping.','B_LEFT_FULL_03':'KO lowering at index10 looked RIGHT instead of the requested LEFT; corrected through ImageGen, no pixel edit.'}
 limits=[
  'Closest supported original1990 MSX2 Black Color/Kyle Schneider reconstruction; no absolute1:1 or pixel-exact face, material, seam, palette, animation or reverse-side certification.',
  'Original Japanese manual page42 establishes flex armor and enhanced ninja lore. Tiny gray/cyan+dark teal sprite mirror and original-era boss corpse captures establish a limited palette/silhouette, with unresolved realistic face/hair and fine tailoring. The sprite mirror extraction/native enlargement provenance is unverified. Codec portrait images show Kessler and Snake, not Schneider; no MG1 portrait is used as his face.',
  'English LP images are original-era MSX2 graphical evidence, but ROM, emulator and translation patch are unverified. Secondary LP prose supports throwing stars and sudden relocation; selected captures do not establish a detailed active star projectile or hardware pattern. The held plain4-point star is a restrained authored interpretation, not a certified exact original model.',
  'All72 versus poses, their CQC strikes, sweep, jump, hit/KO, bounded evade and reserve recovery are authored adaptations. These are new native illustrations in a crisp original-era pixel style, not extracted or upscaled original animations. No katana, scabbard, firearm, Gray Fox optic, cyborg eye, Zandatsu, optical invisibility or universal invulnerability is source-supported or depicted.',
  'Independent right/left ImageGen requests are preserved. No software flip, native resize, cleanup, transparency removal or pixel editing was performed. ImageGen correction can alter untargeted pixels; previous candidates remain immutable and exact preservation of other cells is not claimed. LEFT hit9 naturally tilts/turns the head backward during recoil; LEFT KO10 now faces LEFT and KO11 lies fully toward its leftward head.',
  'Native sources have true zero-alpha space and12 large separated bodies, but tiny detached alpha residue and low-alpha glow/fringe remain unedited. Full opacity254 rather than255 and fine fringe purity are not certified. All complete native sheets were physically viewed; automated components do not certify image quality or unseen geometry. Actual browser Canvas, combat phases/collisions and mobile/public runtime review belong to root.',
  'Runtime group shoot means hand-thrown star, deploy means bounded evade, throw means unarmed CQC, recover means reserve recovery. Damage, speed, costs, meter, range and super count are not canonical data and require a scoped root gameplay adapter; raw legacy blade/cloak/exoskeleton profile is retained read-only and must not silently drive this exact incarnation.'
 ]
 sources=[];geometry={};alpha_review=[];physical={};tables={}
 for key,attempt in selection.items():
  p=BASE/'sources'/(attempt+'.png');meta=json.loads((BASE/'prompts'/(attempt+'.result.json')).read_text());im=Image.open(p)
  q=json.loads((BASE/'layouts'/(key+'.json')).read_text());tables[key]=q['cells']
  inds=[0,1] if key[0]=='a' else [0,2] if key[0]=='b' else [9,11]
  heights=[q['cells'][i]['bbox'][3]-q['cells'][i]['bbox'][1] for i in inds]
  pivots={str(c['index']):[c['frame']['rect'][0]+c['frame']['pivot'][0]*c['frame']['rect'][2],c['bbox'][3]] for c in q['cells']}
  row={'key':key,'source':str(p),'nativeOriginal':meta['nativeOriginal'],'sha256':sha(p),'bytes':p.stat().st_size,'width':im.width,'height':im.height,'columns':4,'rows':3,'poseCount':12,'facing':1 if key.endswith('right') else -1,'mirror':False};sources.append(row)
  geometry[key]={'recommendStandingSourceHeight':statistics.median(heights),'nativeUprightHeights':heights,'observedUprightIndices':inds,'measuredLayouts':str(BASE/'layouts'/(key+'.json')),'measuredBodyGroundPivots':pivots,'basis':'One measured native upright head-to-boot sheet scale. Pelvis-band horizontal actor anchor and visible complete body/boot alpha baseline; no stretching lowered crouch/KO to standing height. The empty ground between two boots may itself be transparent.'}
  a=np.array(im.getchannel('A'));labels,_=ndimage.label(a>80);counts=np.bincount(labels.ravel());h=im.getchannel('A').histogram()
  small=[int(v) for v in counts[1:] if 0<v<1000]
  alpha_review.append({'key':key,'sha256':sha(p),'mode':im.mode,'alphaExtrema':list(im.getchannel('A').getextrema()),'alphaZeroPixels':h[0],'lowAlpha1to15Pixels':sum(h[1:16]),'tinyDetachedComponentsOverAlpha80':small,'significantBodyComponents':int(np.sum(counts[1:]>=1000)),'completePhysicallyViewedBodies':12,'foreignOpaqueRectFrames':q['foreign_body_frames'],'nativePixelsEdited':False,'fineNativeFringeCertifiedPure':False})
  physical[key]={'sha256':sha(p),'completeBodyAndWeaponViewed':True,'fullSheetViewed':True,'completeSourceIndicesViewed':list(range(12)),'standingSourceHeight':geometry[key]['recommendStandingSourceHeight'],'observedBodyPivots':pivots,'nativeFidelityQualified':True,'notes':['Gray/cyan covered head and leg panels, dark teal upper flex armor and ochre hands/boots; full12 bodies and both boots observed.','Independent requested facing; action hit may naturally look backward. No sword, gun, forehead optic or detached effect.','Pose0 in C alone holds a connected small star; C pose1 has an actual visible empty release hand.']}
 refs=[]
 for r in ref_contract['references']:
  if r['file'].endswith('.pdf'):continue
  p=REF/r['file'];assert sha(p)==r['sha256']
  refs.append({'file':str(p),'url':r['url'],'sourceKind':'original-game-capture' if r['file'].startswith('lp') else 'original-manual-page' if r['file'].startswith('manual') else 'tiny-original-era-sprite-mirror','scope':r['authority'],'viewed':True,'sha256':sha(p),'bytes':p.stat().st_size,'immutableExternalReference':True})
 proto=json.loads(Path('/workspace/cqc-pass7-generation/skull-face/FINAL_DELIVERY.json').read_text())
 action_map={'light':'punch','heavy':'heavy','low':'low','throw':'throw','special':'shoot','specialDown':'heavy','specialForward':'deploy','specialBack':'deploy','super':'shoot','utility':'recover'}
 marks={'right':{},'left':{}}
 for side,point in [('right',[730,123]),('left',[449,123])]:
  row=next(r for r in sources if r['key']=='c-'+side);im=Image.open(row['source']);assert im.getpixel(tuple(point))[3]>80
  marks[side]['shoot']={'action':'shoot','semantic':'hand-thrown-star','frame':1,'sourcePoseIndex':1,'file':f'assets/combat-sprites/{UID}/c-{side}-v1.png','source':row['source'],'nativeOriginal':row['nativeOriginal'],'sha256':row['sha256'],'point':point,'pointRGBA':list(im.getpixel(tuple(point))),'note':'Actual opaque ochre fingertip area of the visible extended empty throwing hand in the first active local frame1, independently measured from this source. No firearm muzzle or placeholder origin; exact star hardware/ballistic trajectory not certified.'}
 write('SOURCE_COMBAT_ORIGINS.json',{'schema':'cqc.pass9.native-source-combat-marks/1','uid':UID,'coordinateSystem':'Full unchanged native PNG source x,y; local action frame1 is first active, source cell1.','marks':marks,'slotSourceGroups':{'special':'shoot','super':'shoot'},'sourceScope':'Measured star release hands only. No muzzle, sword, laser, magical or evade ballistic marks.'})
 write('NATIVE_ALPHA_REVIEW.json',{'schema':'cqc.pass9.native-alpha-review/1','uid':UID,'status':'passed-with-native-fringe-limits','sources':alpha_review,'nativeImageBytesUntouched':True,'limits':limits[5:6]})
 review={'status':'approved','reviewer':'/root/paz_two_versions_eva producer; physically viewed original references and six full native sheets/72 cells','reviewedAt':'2026-10-02','sourceKind':'original-game-capture','checks':{'identity':True,'costume':True,'equipment':True,'anatomicalSides':True,'singleFigure':True,'transparentBackground':True},'fidelityStatus':'closest_supported','absolute1to1Certified':False,'sources':refs,'limits':limits,'approvalScope':'Qualified original-era palette/silhouette, complete native72 action poses and two actual release-hand points; root integration/Canvas/gameplay review remains separate.'}
 d={'schema':'cqc.native-combat-delivery/1','uid':UID,'name':'BLACK NINJA / BLACK COLOR','game':'Metal Gear 2: Solid Snake (1990, MSX2)','incarnation':'Kyle Schneider as original MSX2 Black Color; limited original gray/cyan and dark teal flex-armor sprite reconstruction, not Gray Fox or MG1 contact portrait','selectedCostume':'original1990-msx2-black-color-flex-armor','basis':'Manuel japonais original1990, minuscule sprite et captures MSX2 de palette qualifiés ; poses versus créées, étoiles seulement, détails non résolus conservés comme limites.','displayHeight':224,'coverage':'action-frames','facing':1,'mirror':False,'sourceFiles':sources,'actionLayout':copy.deepcopy(proto['actionLayout']),'actionMap':action_map,'phaseMap':copy.deepcopy(proto['phaseMap']),'review':review,'counts':{'selectedNativePngSheets':6,'totalPoseCells':72,'poseCellsPerSheet':12,'facings':2,'nativeGenerationAttempts':8,'rejectedNativeAttempts':2,'selectedWeaponPropAtlases':0,'unexecutedArgumentProposals':14},'sourceGeometry':geometry,'layouts':{k:str(BASE/'layouts'/(k+'.json')) for k in selection},'sourceCombatOrigins':str(BASE/'SOURCE_COMBAT_ORIGINS.json'),'sourceContract':str(BASE/'SOURCE_AND_ACTION_CONTRACT.json'),'nativeAlphaReview':str(BASE/'NATIVE_ALPHA_REVIEW.json'),'limits':limits,'requiresGameplayContract':'Unarmed punch/heavy/low/CQC; hand-thrown star shoot for special/super; bounded visible evade deploy forward/back, ordinary heavy specialDown and reserve recover utility. No katana/blade, optical cloak, cyborg energy promise or firearm. Timings, collisions, costs/damage/super count are root-owned versus adaptations.'}
 write('FINAL_DELIVERY.json',d)
 write('SOURCE_AND_ACTION_CONTRACT.json',{'schema':'cqc.pass9.source-and-action-contract/1','uid':UID,'sourceCostume':d['selectedCostume'],'originalReferenceContract':str(REF/'SOURCE_CONTRACT.json'),'originalReferenceContractSHA256':sha(REF/'SOURCE_CONTRACT.json'),'rootConfirmedRuntimeCompleteLayout':True,'originalSixProposalEnvelopesPreserved':True,'canonicalWeapon':'Throwing-star family supported by secondary original-era gameplay account; precise hardware pattern not certified','slotSourceGroups':action_map,'canonicalMovesExtracted':False,'inventedKatana':False,'inventedCloak':False,'canonicalBallisticsOrBalanceClaimed':False,'limits':limits})
 write('PRODUCER_PHYSICAL_REVIEW.json',{'schema':'cqc.pass9.producer-physical-review/1','uid':UID,'status':'approved','reviewer':'/root/paz_two_versions_eva','completeSelectedNativePngViewed':6,'completePoseBodiesViewed':72,'sources':physical,'referenceFilesPhysicallyViewed':[r['file'] for r in refs],'limits':limits,'actualCanvasRuntimeViewedForThisUID':False,'nativePNGEdited':False})
 records=[]
 executed=set(selection.values())|set(rejected)
 for p in sorted((BASE/'prompts').glob('*.args.json')):
  attempt=p.name.removesuffix('.args.json');args=json.loads(p.read_text());result=BASE/'prompts'/(attempt+'.result.json')
  rec={'attempt':attempt,'args':str(p),'argsSHA256':sha(p),'executed':attempt in executed,'status':'selected' if attempt in selection.values() else 'rejected-preserved' if attempt in rejected else 'unexecuted-proposal-no-image','referencePins':[{'path':s,'sha256':sha(Path(s)),'bytes':Path(s).stat().st_size} for s in args.get('referenced_image_paths',[])]}
  if result.exists():rec['result']=str(result);rec['resultSHA256']=sha(result);rec['nativeOriginal']=json.loads(result.read_text())['nativeOriginal'];rec['nativeSha256']=sha(Path(rec['nativeOriginal']))
  if attempt in rejected:rec['reason']=rejected[attempt]
  records.append(rec)
 unique={}
 for p in (BASE/'native-attempts').glob('*.png'):
  st=p.stat();unique[(st.st_dev,st.st_ino)]=st.st_size
 assert len(unique)==8 and sum(unique.values())<45*1024*1024
 write('ATTEMPT_STATUS.json',{'schema':'cqc.pass9.native-attempt-coverage/1','uid':UID,'selected':selection,'rejected':rejected,'requests':records,'executedImageRequests':8,'nativeOriginalsProduced':8,'selectedNative':6,'rejectedNative':2,'blockedRequestsWithoutPng':0,'unexecutedArgumentProposals':len(records)-8,'nativeUniqueInodeBytes':sum(unique.values()),'budgetBytes':45*1024*1024,'preservation':'All originals and rejected PNGs hardlinked immutably; no source moves/deletions, no R/S or historical producer writes.'})
 write('metadata/TECHNICAL_ENTRY_FOR_VALIDATION.json',{'entry':{'uid':UID,'name':d['name'],'game':d['game'],'incarnation':d['incarnation'],'coverage':'action-frames','displayHeight':224,'baseFrameHeight':350,'sourceFrameHeights':{f'assets/combat-sprites/{UID}/{r["key"]}-v1.png':geometry[r['key']]['recommendStandingSourceHeight'] for r in sources},'facing':1,'mirror':False,'fallbackMissingActions':True,'actionMap':action_map,'phaseMap':d['phaseMap']|{'attack':d['phaseMap']['punch']},'review':review,'actions':{**{action:{'fps':spec['fps'],'loop':spec['loop'],'frames':[tables[spec['sheet']+'-right'][idx]['frame'] for idx in spec['indices']]} for action,spec in d['actionLayout'].items()},'attack':{'fps':12,'loop':False,'frames':[tables['b-right'][idx]['frame'] for idx in [0,1,2]]}},'oppositeActions':{**{action:{'fps':spec['fps'],'loop':spec['loop'],'frames':[tables[spec['sheet']+'-left'][idx]['frame'] for idx in spec['indices']]} for action,spec in d['actionLayout'].items()},'attack':{'fps':12,'loop':False,'frames':[tables['b-left'][idx]['frame'] for idx in [0,1,2]]}}},'sourceFiles':[{'file':f'assets/combat-sprites/{UID}/{r["key"]}-v1.png','source':r['source']} for r in sources],'notImported':True,'producerOnlyEvidence':True})
 print(json.dumps({'delivery':str(BASE/'FINAL_DELIVERY.json'),'sha256':sha(BASE/'FINAL_DELIVERY.json'),'selectedNative':6,'poses':72,'releaseHandPoints':2,'nativeUniqueBytes':sum(unique.values()),'diskFree':os.statvfs(BASE).f_bavail*os.statvfs(BASE).f_frsize},indent=2))
if __name__=='__main__':main()
