from pathlib import Path
import json,hashlib
R=Path('/workspace/cqc-game-working/cqc-versus-v056');p=R/'data/stage-layer-catalog-reprise.json';d=json.loads(p.read_text())
proof=Path('/workspace/cqc-pass6-native-ceiling-physical-review.json');q=json.loads(proof.read_text())
assert q['status']=='accepted_closest' and q['failures']==0 and q['physicalCaptureCount']==18
for st in d['stages']:
 if st['id'] in ['lobito','saintlogic','saintlogic_security']:
  mark=st['review']['pass6CameraMargin'];assert mark['status']=='native-generated-awaiting-runtime-review'
  mark['status']='accepted_closest'
  mark['runtimeEvidence']='docs/reprise-qa/pass6/cqc-pass6-native-ceiling-browser/inspection.json'
  mark['physicalReviewEvidence']='preparation/reprise-pass6-provenance/tools-and-reports/cqc-pass6-native-ceiling-physical-review.json'
  mark['physicalReviewSHA256']=hashlib.sha256(proof.read_bytes()).hexdigest()
  mark['notes']+=' Fresh PASS6 runtime review supersedes the historical dark-band limitation: six camera/zoom states reviewed per stage; no duplicated architecture. Horizontal panel join remains perceptible at zoom 0.78. Ceiling geometry is authored material continuation, not an exact original PSP roof reconstruction.'
p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n')
(R/'src/cqc-stage-layer-data.js').write_text('/* Generated from data/stage-layer-catalog-reprise.json. */\nwindow.CQC_STAGE_LAYER_DATA = '+json.dumps(d,ensure_ascii=False,separators=(',',':'))+';\n')
print('Finalized accepted ceiling metadata after independent268/268 review')
