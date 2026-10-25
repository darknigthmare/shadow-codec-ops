from pathlib import Path
import json, math, hashlib, copy
base = Path('@PROJECT_ROOT@/integration')
out = Path(__file__).parent
job = json.loads((base/'drebin-manual-axis-candidate-v2/JOB_FOR_ROOT_REVIEW.json').read_text())
points = {
 'right': {'refHead': [[774,531],[792,607]], 'refCrownHeel': [[774,531],[713,1006]], 'shootHead': [[291,14],[309,92]], 'shootCrownHeel': [[291,14],[368,521]], 'reloadHead': [[783,4],[797,83]], 'reloadCrownHeel': [[783,4],[846,521]]},
 'left': {'refHead': [[811,553],[801,624]], 'refCrownHeel': [[811,553],[881,1031]], 'shootHead': [[337,22],[318,102]], 'shootCrownHeel': [[337,22],[500,540]], 'reloadHead': [[820,19],[797,102]], 'reloadCrownHeel': [[820,19],[916,552]]}
}
rows = []
for side in ['right', 'left']:
 for role, name, targetH in [(11,'shoot',510 if side == 'right' else 540), (12,'reload',520 if side == 'right' else 555)]:
  mapping = job['roles'][side][role]
  asset = next(a for a in job['assets'] if a['key'] == mapping['asset'])
  choice = points[side]
  pairs = []
  for label, refKey, actionKey in [('projected-head-crown-to-chin','refHead',name+'Head'), ('projected-crown-to-heel','refCrownHeel',name+'CrownHeel')]:
   reference, action = choice[refKey], choice[actionKey]
   refLength, actionLength = math.dist(*reference), math.dist(*action)
   pairs.append({'name':label,'reference':reference,'action':action,'referenceNativePixels':refLength,'actionNativePixels':actionLength,'ratio':actionLength/refLength,'measurementScope':'Explicit visually selected native-coordinate landmarks from unmodified source magnifications; perspective/posture uncertainty requires Root counterreview.'})
  rows.append({'side':side,'role':role,'sourcePath':asset['path'],'sourceSHA256':asset['sha256'],'samePageNeutralStandingHeight':asset['standingHeight'],'proposedSourceFrameHeight':targetH,'proposedScaleRatio':targetH/asset['standingHeight'],'landmarkPairs':pairs,'diagnosticRatioSpread':max(p['ratio']for p in pairs)-min(p['ratio']for p in pairs),'approved':False})
evidence = {'schema':'cqc.pass41.drebin-native-calibration-proposals/1','approved':False,'sourcePNGMutations':False,'equipmentAliases':rows,'rightKO':{'role':14,'sourcePath':job['assets'][0]['path'],'sourceSHA256':job['assets'][0]['sha256'],'sameSourceNeutralStandingHeight':296,'standingProjectedCrownHeel':[[185,12],[145,304]],'standingProjectedCrownHeelPixels':math.dist([185,12],[145,304]),'KOProjectedCrownHeel':[[1140,977],[818,993]],'KOProjectedCrownHeelPixels':math.dist([1140,977],[818,993]),'proposedSourceFrameHeight':323,'method':'qualified-visual-role14-only-calibration-candidate','qualification':'Exact body-framing visual proposal only. Face/chin partly hidden by hand, so no second independent reliable anatomical segment is asserted. The 371px bbox includes toe/hand projection and is not standing stature. Requires fresh Root-listed role14 visual alias; no anatomical certificate.'},'leftKO':{'sameSourceNeutralStandingHeight':353,'proposedSourceFrameHeight':353,'reason':'Curled/projected head-to-heel is shorter than standing while magnified head is similar; retain same-page neutral without unsupported correction.'},'limits':['All coordinates are manual measurement proposals, not automated anatomy or approval.','Projected crown-to-heel depends on posture; the head-ratio crosscheck limits blind body-height normalization.','Explicit Root review must weigh head/torso/proportional tradeoffs.','Original PNG and earlier jobs are preserved.']}
evidenceBytes = (json.dumps(evidence,indent=2)+'\n').encode()
evidencePath = out/'CALIBRATION_LANDMARK_PROPOSALS_UNAPPROVED_V1.json'
with evidencePath.open('xb') as file: file.write(evidenceBytes)
evidenceSHA = hashlib.sha256(evidenceBytes).hexdigest()
for row in rows:
 mapping = job['roles'][row['side']][row['role']]
 source = next(a for a in job['assets'] if a['key'] == mapping['asset'])
 alias = copy.deepcopy(source)
 alias['key'] = source['key']+'-role'+str(row['role'])+'-calibration-v1'
 alias['file'] = source['file'].replace('-v1.png','-role'+str(row['role'])+'-calibration-v1.png')
 alias['standingHeight'] = row['proposedSourceFrameHeight']
 alias['calibration'] = {'method':'reviewed-anatomical-transfer','status':'UNAPPROVED-PROPOSAL-ROOT-REVIEW-REQUIRED','landmarkPairs':row['landmarkPairs'],'tolerance':0.10,'scope':'Native-source density/framing proposal from two explicit manually selected projected segments. Posture and head/body proportions remain qualified; these field names do not constitute approval.','sourceProposal':{'path':str(evidencePath),'bytes':len(evidenceBytes),'sha256':evidenceSHA},'observedDiagnosticRatioSpread':row['diagnosticRatioSpread'],'toleranceAutomaticallyPassed':False}
 job['assets'].append(alias)
 mapping['asset'] = alias['key']
mapping = job['roles']['right'][14]
source = next(a for a in job['assets'] if a['key'] == mapping['asset'])
alias = copy.deepcopy(source)
alias['key'] = source['key']+'-ko14-visual-v1'
alias['file'] = source['file'].replace('-v1.png','-ko14-visual-v1.png')
alias['standingHeight'] = 323
alias['calibration'] = {'method':'qualified-visual-role14-only-calibration-candidate','status':'UNAPPROVED-PROPOSAL-ROOT-REVIEW-REQUIRED','effectiveStandingHeight':323,'sameSourceNeutralMeasurement':296,'scope':evidence['rightKO']['qualification'],'rootVisualChoiceWitness':{'path':str(evidencePath),'sha256':evidenceSHA}}
job['assets'].append(alias)
mapping['asset'] = alias['key']
job['proposalLimits'].append('V3 adds five same-source calibration alias proposals: right KO14 H323 (qualified visual only), right shoot11 H510/reload12 H520, left shoot11 H540/reload12 H555. PNG bytes, owned physical roles, source points and combat stats stay unchanged. Fresh Root must review measurements/proportions and explicitly list the visual14 alias before admission.')
jobBytes = (json.dumps(job,indent=2)+'\n').encode()
jobPath = out/'JOB_FOR_ROOT_REVIEW_V3.json'
with jobPath.open('xb') as file: file.write(jobBytes)
review = json.loads((base/'drebin-manual-axis-candidate-v2/ROOT_REVIEW_PENDING.json').read_text())
review['inputSHA256'] = hashlib.sha256(jobBytes).hexdigest()
review['reviewedVisualRole14Aliases'] = []
review['limits'].append('Root must explicitly list the right KO visual alias asset key, side:right, roleIndex:14, source SHA, standingHeight:323, evidence SHA '+evidenceSHA+' if accepted. No art approval follows automatically from coordinate inspection.')
with (out/'ROOT_REVIEW_PENDING_V3.json').open('x') as file: file.write(json.dumps(review,indent=2)+'\n')
print(json.dumps({'job':str(jobPath),'bytes':len(jobBytes),'sha256':hashlib.sha256(jobBytes).hexdigest(),'calibrationEvidenceSHA256':evidenceSHA,'aliases':len(rows)+1,'approved':False,'equipmentRatios':[{'side':r['side'],'role':r['role'],'H':r['proposedSourceFrameHeight'],'ratios':[round(p['ratio'],4)for p in r['landmarkPairs']]}for r in rows]}))
