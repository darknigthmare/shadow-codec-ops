#!/usr/bin/env python3
"""Close Jungle Evil producer sources and native metadata; no runtime writes."""
from pathlib import Path
from PIL import Image
import copy,hashlib,json,os,statistics
import numpy as np
from scipy import ndimage

B=Path(__file__).resolve().parent
REF=Path('/workspace/cqc-pass8-reference-selection/core__jungle_evil')
UID='core__jungle_evil'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def write(name,value):
 p=B/name;raw=(json.dumps(value,ensure_ascii=False,indent=2)+'\n').encode()
 if p.exists():assert p.read_bytes()==raw,'Closed evidence exists: '+name
 else:
  p.parent.mkdir(parents=True,exist_ok=True)
  with p.open('xb') as f:f.write(raw)

def main():
 selection={s+'-'+f:s.upper()+'_'+f.upper()+'_FULL_02' for s in 'abc' for f in ['right','left']}
 rejected={'A_RIGHT_FULL_01':'Bright blue/white muzzle tips and red lens-like facial blocks are unsupported. Large rear hardware block not established by selected capture. Corrected through ImageGen; original untouched.'}
 limits=[
  'Closest supported original1990 MSX2 PREDATOR, runtime alias JUNGLE EVIL. Exact UID is core__jungle_evil, without _mg2. No film alien, remake portrait, fan-art anatomy or absolute1:1 pixel/model/material certification.',
  'Original Japanese manual page42 supports human guerrilla/ambush specialist. Tiny green/dark sprite mirror and original-era wheat-field LP captures support green covered head, simple green uniform, dark boots and a long dark firearm. Real face/hair/skin/glove details, exact cloth pattern, headwear type and reverse-side asymmetry remain unresolved. Minimal facial blocks and rear shoulder/cloth contour are authored interpretations, not realistic identity or backpack hardware claims.',
  'LP graphics preserve original MSX2 visual era, but ROM/emulator/translation patch are unverified; English dialogue/LP commentary is not a certified original-language transcript. Yellow wheat, hay bales, pink mirror matte and HUD are not actor clothing. HUD grenades belong to Snake and do not prove Jungle Evil has grenades.',
  'Visible long firearm silhouette is supported, but its brand/model/caliber/feed and exact firing mode/effect are not proved. No flame jet, fuel tank, plasma, laser, scope/suppressor brand, grenade or red eye is depicted in selected sources. Any ballistic versus projectile, magazine count, six-shot super, reload restoration, damage, timing or range is explicit gameplay adaptation, not original weapon data.',
  'All72 native action poses are newly authored versus adaptations, not extracted/upscaled MSX2 animations. C shoot is generic conventional longgun aim; deploy is always-visible low conceal/crawl; throw is physical unarmed CQC with gun carried at far side/back; recover is restrained reserve/receiver handling. Small carry straps and gun repositioning are functional adaptations with original hardware unknown. Far-side equipment can be occluded, especially RIGHT B KO11; hidden topology is not certified. No optical invisibility, magical cloak or universal invulnerability.',
  'Six independent final native sources and every12 complete bodies were physically viewed, including complete visible barrels and lowered/rest poses. No software mirror, native resize, cleanup or pixel editing. A RIGHT01 is rejected and retained; ImageGen correction can also vary untargeted pixels and exact11-cell preservation is not claimed.',
  'True zero-alpha space and12 large body components are verified, while fine native low-alpha glow/fringe and tiny disconnected alpha residue remain unedited and explicitly qualified. Near-opaque254/253 body pixels are not255 purity certified. Measured component crops preserve original source bytes. Actual Canvas/live fighting/mobile/phase/origin/collision review and integration belong to root.',
  'Fixed sheet scale uses upright human head-cover to boot height, never a large gun silhouette or crouch/KO stretched to standing size. Native pelvis-band actor anchors and visible ground baselines are recorded; the two prone C4 hip axes are separately physically selected from opaque green body pixels and projected to the full visible-body ground baseline. These are versus renderer pivots, not skeletal model extraction.',
  'Raw generic rifle profile/snapshots remain untouched. Its grenade slot and translucent cloak must be corrected only in a new UID-scoped future adapter. Proposed mapping is ordinary physical normals/throw, generic shoot special/super, low deploy specialDown/specialBack, physical heavy specialForward, reserve handling utility; balance is not canon.'
 ]
 refs=[];contract=json.loads((REF/'SOURCE_CONTRACT.json').read_text())
 for r in contract['references']:
  if r['file'].endswith('.pdf'):continue
  p=REF/r['file'];assert sha(p)==r['sha256']
  refs.append({'file':str(p),'url':r['url'],'sourceKind':'original-game-capture' if r['file'].startswith('lp') else 'original-manual-page' if r['file'].startswith('manual') else 'tiny-original-era-sprite-mirror','scope':r['authority'],'viewed':True,'sha256':sha(p),'bytes':p.stat().st_size,'immutableExternalReference':True})
 head_windows={'b-right':{0:[180,40,260,125],2:[930,40,1005,130]},'b-left':{0:[168,60,227,145],2:[915,60,978,145]}}
 crawl_points={'c-right':([178,632],[178,574]),'c-left':([269,608],[269,575])}
 sources=[];geom={};physical={};tables={};layouts={};alphas=[]
 for key,attempt in selection.items():
  p=B/'sources'/(attempt+'.png');meta=json.loads((B/'prompts'/(attempt+'.result.json')).read_text());im=Image.open(p);a=np.array(im.getchannel('A'));labels,n=ndimage.label(a>80);counts=np.bincount(labels.ravel());hist=im.getchannel('A').histogram()
  lp=B/'layouts'/(key+'.json');q=json.loads(lp.read_text());height_indices=[0,1] if key[0]=='a' else [0,2] if key[0]=='b' else [9,11];heights=[];height_marks=[]
  for idx in height_indices:
   c=q['cells'][idx];top=c['bbox'][1];region=head_windows.get(key,{}).get(idx)
   if region:
    x0,y0,x1,y1=region;yy,xx=np.where(labels[y0:y1,x0:x1]==c['component']);top=int(yy.min()+y0)
   heights.append(c['bbox'][3]-top);height_marks.append({'sourcePoseIndex':idx,'observedHumanHeadOutlineTopY':top,'observedBootBaselineY':c['bbox'][3],'sourceHeight':c['bbox'][3]-top,'headMeasurementRegion':region,'equipmentExcludedFromHeadRegion':bool(region)})
  if key in crawl_points:
   point,hip=crawl_points[key];c=q['cells'][4];x,y,w,h=c['frame']['rect'];assert im.getpixel(tuple(hip))[3]>230 and x<=point[0]<=x+w and y<=point[1]<=y+h
   c['frame']['pivot']=[(point[0]-x)/w,(point[1]-y)/h];c['observedBodyPivotFullSheet']=point;c['observedOpaqueHipAxisSample']={'point':hip,'rgba':list(im.getpixel(tuple(hip)))};c['pivotReview']='Physically selected native green hip axis projected to visible complete-body ground, without weapon centroid.'
   q['sourceInspectorLayoutPreservedAt']=str(lp);lp=B/'layouts'/(key+'.observed-body-pivots.json');write(str(lp.relative_to(B)),q)
  tables[key]=q['cells'];layouts[key]=str(lp)
  pivots={str(c['index']):[c['frame']['rect'][0]+c['frame']['pivot'][0]*c['frame']['rect'][2],c['frame']['rect'][1]+c['frame']['pivot'][1]*c['frame']['rect'][3]] for c in q['cells']}
  sources.append({'key':key,'source':str(p),'nativeOriginal':meta['nativeOriginal'],'sha256':sha(p),'bytes':p.stat().st_size,'width':im.width,'height':im.height,'columns':4,'rows':3,'poseCount':12,'facing':1 if key.endswith('right') else -1,'mirror':False})
  geom[key]={'recommendStandingSourceHeight':statistics.median(heights),'nativeUprightHeights':heights,'observedUprightIndices':height_indices,'humanHeightMeasurements':height_marks,'measuredLayouts':str(lp),'measuredBodyGroundPivots':pivots,'basis':limits[7]}
  physical[key]={'sha256':sha(p),'completeBodyAndWeaponViewed':True,'fullSheetViewed':True,'completeSourceIndicesViewed':list(range(12)),'standingSourceHeight':geom[key]['recommendStandingSourceHeight'],'observedBodyPivots':pivots,'notes':['All12 complete selected native bodies viewed with supported green/dark silhouette, visible dark longgun and boots; no blue muzzle or red lens.','Visible equipment complete; far-side gun can be body-occluded in lowered/rest poses, which does not certify hidden topology.','Fixed human scale and ground anchors reviewed; opaque native hip samples support prone C4 pivot.']}
  alphas.append({'key':key,'sha256':sha(p),'mode':im.mode,'alphaExtrema':list(im.getchannel('A').getextrema()),'alphaZeroPixels':hist[0],'lowAlpha1to15Pixels':sum(hist[1:16]),'tinyDetachedComponentsOverAlpha80':[int(v) for v in counts[1:] if v<1000],'significantBodyComponents':int(np.sum(counts[1:]>=1000)),'completePhysicallyViewedBodies':12,'foreignOpaqueRectFrames':q['foreign_body_frames'],'nativePixelsEdited':False,'fineNativeFringeCertifiedPure':False})
 marks={'right':{},'left':{}}
 for side,point in [('right',[768,132]),('left',[441,152])]:
  row=next(s for s in sources if s['key']=='c-'+side);im=Image.open(row['source']);rgba=list(im.getpixel(tuple(point)));assert rgba[3]>=230
  marks[side]['shoot']={'action':'shoot','semantic':'generic-conventional-longgun','frame':1,'sourcePoseIndex':1,'file':f'assets/combat-sprites/{UID}/c-{side}-v1.png','source':row['source'],'nativeOriginal':row['nativeOriginal'],'sha256':row['sha256'],'point':point,'pointRGBA':rgba,'note':'Actually visible dark forward barrel end in first active authored aim cell1, last near-opaque native tip inside the small antialiased outer boundary. Independent face measurement; no detached effect or fake origin. Generic source-supported longgun silhouette, precise model/fire mode unproved.'}
 write('SOURCE_COMBAT_ORIGINS.json',{'schema':'cqc.pass9.native-source-combat-marks/1','uid':UID,'coordinateSystem':'Full unchanged native PNG x,y. Local first-active frame1 corresponds to source cell1.','marks':marks,'slotSourceGroups':{'special':'shoot','super':'shoot'},'sourceScope':'Two actual generic longgun barrel-tip marks only, no grenade/flame/laser/magical origin.'})
 write('NATIVE_ALPHA_REVIEW.json',{'schema':'cqc.pass9.native-alpha-review/1','uid':UID,'status':'passed-with-native-fringe-limits','sources':alphas,'nativeImageBytesUntouched':True,'limits':limits[6:7]})
 proto=json.loads(Path('/workspace/cqc-pass7-generation/skull-face/FINAL_DELIVERY.json').read_text());action_map={'light':'punch','heavy':'heavy','low':'low','throw':'throw','special':'shoot','specialDown':'deploy','specialForward':'heavy','specialBack':'deploy','super':'shoot','utility':'recover'}
 review={'status':'approved','reviewer':'/root/paz_two_versions_eva producer; physically viewed seven original reference images and all six complete selected native sheets/72 bodies','reviewedAt':'2026-10-02','sourceKind':'original-game-capture','checks':{k:True for k in ['identity','costume','equipment','anatomicalSides','singleFigure','transparentBackground']},'fidelityStatus':'closest_supported','absolute1to1Certified':False,'sources':refs,'limits':limits,'approvalScope':'Qualified original1990 MSX2 human appearance/longgun silhouette,72 native source poses and2 actual muzzle marks; root runtime integration is separate.'}
 d={'schema':'cqc.native-combat-delivery/1','uid':UID,'name':'JUNGLE EVIL / PREDATOR','game':'Metal Gear 2: Solid Snake (1990, MSX2)','incarnation':'Original1990 human PREDATOR, preserved runtime alias JUNGLE EVIL; green covered head/uniform and generic long dark firearm, no film Predator or later portrait blend','selectedCostume':'original1990-msx2-predator-green-human','basis':'Manuel japonais original1990 et petites captures MSX2 qualifiés ; silhouette verte/noire et arme longue seulement, gestes versus adaptés, modèle et mode de tir non prouvés.','displayHeight':224,'coverage':'action-frames','facing':1,'mirror':False,'sourceFiles':sources,'actionLayout':copy.deepcopy(proto['actionLayout']),'actionMap':action_map,'phaseMap':copy.deepcopy(proto['phaseMap']),'review':review,'counts':{'selectedNativePngSheets':6,'totalPoseCells':72,'poseCellsPerSheet':12,'facings':2,'nativeGenerationAttempts':7,'rejectedNativeAttempts':1,'selectedWeaponPropAtlases':0,'unexecutedArgumentProposals':11},'sourceGeometry':geom,'layouts':layouts,'sourceCombatOrigins':str(B/'SOURCE_COMBAT_ORIGINS.json'),'sourceContract':str(B/'SOURCE_AND_ACTION_CONTRACT.json'),'nativeAlphaReview':str(B/'NATIVE_ALPHA_REVIEW.json'),'limits':limits,'requiresGameplayContract':limits[8]}
 write('FINAL_DELIVERY.json',d)
 write('SOURCE_AND_ACTION_CONTRACT.json',{'schema':'cqc.pass9.source-and-action-contract/1','uid':UID,'sourceCostume':d['selectedCostume'],'originalReferenceContract':str(REF/'SOURCE_CONTRACT.json'),'originalReferenceContractSHA256':sha(REF/'SOURCE_CONTRACT.json'),'rootConfirmedRuntimeCompleteLayout':True,'originalSixProposalEnvelopesPreserved':True,'canonicalWeapon':'Long conventional firearm silhouette only, exact hardware/firemode/feed unverified','slotSourceGroups':action_map,'canonicalMovesExtracted':False,'inventedGrenade':False,'inventedFlamethrower':False,'inventedOpticalCloak':False,'canonicalBallisticsOrBalanceClaimed':False,'limits':limits})
 write('PRODUCER_PHYSICAL_REVIEW.json',{'schema':'cqc.pass9.producer-physical-review/1','uid':UID,'status':'approved','reviewer':'/root/paz_two_versions_eva','completeSelectedNativePngViewed':6,'completePoseBodiesViewed':72,'sources':physical,'referenceFilesPhysicallyViewed':[r['file'] for r in refs],'limits':limits,'actualCanvasRuntimeViewedForThisUID':False,'nativePNGEdited':False})
 executed=set(selection.values())|set(rejected);requests=[]
 for p in sorted((B/'prompts').glob('*.args.json')):
  attempt=p.name.removesuffix('.args.json');a=json.loads(p.read_text());result=B/'prompts'/(attempt+'.result.json');r={'attempt':attempt,'args':str(p),'argsSHA256':sha(p),'executed':attempt in executed,'status':'selected' if attempt in selection.values() else 'rejected-preserved' if attempt in rejected else 'unexecuted-proposal-no-image','referencePins':[{'path':s,'sha256':sha(Path(s)),'bytes':Path(s).stat().st_size} for s in a.get('referenced_image_paths',[])]}
  if result.exists():r.update({'result':str(result),'resultSHA256':sha(result),'nativeOriginal':json.loads(result.read_text())['nativeOriginal']});r['nativeSha256']=sha(Path(r['nativeOriginal']))
  if attempt in rejected:r['reason']=rejected[attempt]
  requests.append(r)
 u={}
 for p in (B/'native-attempts').glob('*.png'):s=p.stat();u[(s.st_dev,s.st_ino)]=s.st_size
 assert len(u)==7 and sum(u.values())<25*1024*1024
 write('ATTEMPT_STATUS.json',{'schema':'cqc.pass9.native-attempt-coverage/1','uid':UID,'selected':selection,'rejected':rejected,'requests':requests,'executedImageRequests':7,'nativeOriginalsProduced':7,'selectedNative':6,'rejectedNative':1,'blockedRequestsWithoutPng':0,'unexecutedArgumentProposals':len(requests)-7,'nativeUniqueInodeBytes':sum(u.values()),'initialBudgetBytes':25*1024*1024,'budgetBytes':45*1024*1024,'preservation':'Originals and rejection retained unchanged through hardlinks; no source moves/deletions, reference duplication, native editing or R/S/PASS8/Git/catalog writes.'})
 entry={'uid':UID,'name':d['name'],'game':d['game'],'incarnation':d['incarnation'],'coverage':'action-frames','displayHeight':224,'baseFrameHeight':350,'sourceFrameHeights':{f'assets/combat-sprites/{UID}/{s["key"]}-v1.png':geom[s['key']]['recommendStandingSourceHeight'] for s in sources},'facing':1,'mirror':False,'fallbackMissingActions':True,'actionMap':action_map,'phaseMap':d['phaseMap']|{'attack':d['phaseMap']['punch']},'review':review}
 for side,target in [('right','actions'),('left','oppositeActions')]:
  entry[target]={action:{'fps':spec['fps'],'loop':spec['loop'],'frames':[copy.deepcopy(tables[spec['sheet']+'-'+side][i]['frame']) for i in spec['indices']]} for action,spec in d['actionLayout'].items()};entry[target]['attack']=copy.deepcopy(entry[target]['punch'])
 write('metadata/TECHNICAL_ENTRY_FOR_VALIDATION.json',{'entry':entry,'sourceFiles':[{'file':f'assets/combat-sprites/{UID}/{s["key"]}-v1.png','source':s['source']} for s in sources],'notImported':True,'producerOnlyEvidence':True})
 print(json.dumps({'uid':UID,'delivery':str(B/'FINAL_DELIVERY.json'),'sha256':sha(B/'FINAL_DELIVERY.json'),'selectedNative':6,'poses':72,'actualMuzzles':2,'nativeUniqueBytes':sum(u.values()),'diskFree':os.statvfs(B).f_bavail*os.statvfs(B).f_frsize},indent=2))
if __name__=='__main__':main()
