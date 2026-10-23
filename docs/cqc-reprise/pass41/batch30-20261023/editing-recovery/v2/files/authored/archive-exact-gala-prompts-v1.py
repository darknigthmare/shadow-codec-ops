"""Archive submitted prompt expressions without private generator receipt IDs.

Three early calls did not persist exact prompt text; this is recorded as missing,
never filled with a fabricated exact prompt. Native art remains conserved.
"""
from pathlib import Path
import hashlib,json
R=Path('@PROJECT_ROOT@')
plans=json.loads((R/'authored/NINE_GALA_GENERATION_PLAN_CANDIDATE_V1.json').read_text())
pure={'roster50__mei_mgs1','roster50__nastasha_mgs1','roster50__rose_mgs2','roster50__otacon_mgs4'}
out=[]
prefix='Make a NEW SQUARE 1536x1536 transparent sprite sheet, not the reference image\'s aspect ratio. Exactly4columns x4rows with16same-size square cells and wide invisible gutters. Every whole figure MUST FIT head-to-shoes, especially figure12 recovery bottom-left: DO NOT CROP LEGS. Uniform standing figure height at most80percentofcellheight, shrink allfiguresuniformly soall16fit. The reference shows the desired correct LEFT facing: keep nose pointing toward screenLEFT like reference. '
suffix='\nCritical: every nose, eye-line, punch, kick and reaching hand points toward the LEFT edge of the image. NOT toward the right. Base physical anatomy on the attached original LEFT-view source. Paint a complete new tuxedo; no old uniform remains. Preserve original source image as reference only; no flips or mirrored pixels. All16figuresfitinsidecanvasincludingfullbodypost-actionrecovery12.'
for j in plans:
    uid=j['uid'];d=R/'art'/uid/'tuxedo'
    prompts={
      'right-v1.png':(j['promptRight'],[j['rightReference']],'exact-persisted-plan-prompt'),
      'left-v1.png':(j['promptRight'].replace('screenRIGHT','screenLEFT',1)+'\nALL sixteen poses must physically face screen LEFT, independently redraw this anatomical view, NOT a horizontal mirror. The figure\'s nose, eyes, fists and kicks point LEFT. Preserve source character\'s exact hairstyle part and anatomical identity'+('.' if uid in pure else ', with any cane in anatomical LEFT hand.'),[j['rightReference']],'exact-session-expansion-of-persisted-plan'),
      'left-v2.png':(prefix+j['promptRight'].replace('screenRIGHT','screenLEFT')+suffix,[j['leftReference']],'exact-session-expansion-of-persisted-plan')}
    for name,(prompt,refs,status) in prompts.items():
      p=d/name
      assert p.exists()
      out.append({'uid':uid,'id':'tuxedo','sourceLogicalPath':'assets/combat-costumes-pass41/'+uid+'/tuxedo/'+name,'sourceSHA256':hashlib.sha256(p.read_bytes()).hexdigest(),'promptStatus':status,'prompt':prompt,'referencePaths':refs,'transparentBackground':True,'approvalCreated':False})
for name,filename in [('FOUR_UNARMED_BODY_SUPPLEMENT_PLAN_CANDIDATE_V1.json','body'),('FIVE_GALA_WEAPON_SUPPLEMENT_PLAN_CANDIDATE_V1.json','weapon')]:
  for j in json.loads((R/'authored'/name).read_text()):
    basename=j['side']+'-'+filename+'-supplement-v1.png';p=R/'art'/j['uid']/'tuxedo'/basename
    assert p.exists()
    refs=[j['bodyReference']]+([j['weaponReference'],j['grenadeReference']]if filename=='weapon' else [])
    out.append({'uid':j['uid'],'id':'tuxedo','sourceLogicalPath':'assets/combat-costumes-pass41/'+j['uid']+'/tuxedo/'+basename,'sourceSHA256':hashlib.sha256(p.read_bytes()).hexdigest(),'promptStatus':'exact-persisted-plan-prompt','prompt':j['prompt'],'referencePaths':refs,'transparentBackground':True,'approvalCreated':False})
for uid,basename in [('roster50__campbell_mg2','historical-custom16-right-v1.png'),('archive__holly_white','historical-custom16-right-v1.png'),('roster50__campbell_mgs4','right-body-supplement-v1.png')]:
    p=R/'art'/uid/'tuxedo'/basename
    out.append({'uid':uid,'id':'tuxedo','sourceLogicalPath':'assets/combat-costumes-pass41/'+uid+'/tuxedo/'+basename,'sourceSHA256':hashlib.sha256(p.read_bytes()).hexdigest(),'promptStatus':'exact-call-text-not-persisted-to-file-before-compaction','prompt':None,'qualification':'PNG preserved unchanged. Do not assert a reconstructed paraphrase as exact submitted text. This is an explicit traceability gap, not source-art loss.','transparentBackground':True,'approvalCreated':False})
assert len(out)==48
q=R/'authored/EXACT_SUBMITTED_PROMPT_LEDGER_WITH_GAPS_V1.json'
q.write_text(json.dumps({'schema':'cqc.p41.submitted-prompt-ledger/1','approved':False,'entries':out,'limits':['Prompt provenance does not approve visual fidelity or runtime admission.','Original custom16 and current cane repair exact call text was not persisted; those three entries explicitly remain unavailable.','No generator private receipt, UUID or tool image URL is included.']},ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'path':str(q),'entries':len(out),'exactPersistedOrSessionExpanded':45,'missingExactCallText':3,'bytes':q.stat().st_size,'sha256':hashlib.sha256(q.read_bytes()).hexdigest()}))
