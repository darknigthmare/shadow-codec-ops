"""Copy PASS6 source provenance and review evidence into the GitHub repository."""
from pathlib import Path
import json,hashlib,shutil
W=Path('/workspace');R=W/'cqc-game-working/cqc-versus-v056';S=W/'shadow-codec-recovered';D=S/'docs/cqc-reprise/pass6'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def copy(source,target):
 target.parent.mkdir(parents=True,exist_ok=True)
 if target.exists():assert sha(target)==sha(source),'Review bundle collision: '+str(target)
 else:shutil.copyfile(source,target)
 assert sha(target)==sha(source)
 return {'file':target.relative_to(S).as_posix(),'source':str(source),'bytes':target.stat().st_size,'sha256':sha(target)}
rows=[]
for folder,label in [('preparation/reprise-pass6-provenance','provenance'),('preparation/combat-sprites-pass6','sprite-review'),('docs/reprise-qa/pass6','qa')]:
 source=R/folder
 for p in sorted(source.rglob('*')):
  if p.is_file():rows.append(copy(p,D/label/p.relative_to(source)))
for p in sorted((R/'src').glob('cqc-pass6-*.js')):rows.append(copy(p,D/'source-code/src'/p.name))
for p in sorted((R/'tests').glob('test_pass6_*.cjs')):rows.append(copy(p,D/'source-code/tests'/p.name))
for name in ['modules/unified-versus-v055.html','data/combat-prop-catalog-pass6.json','recovery/PASS6_PREVIOUS_WAVES_PRESERVATION.json']:
 rows.append(copy(R/name,D/'source-code'/name))
for p in [W/'cqc-pass6-preservation-review.json',W/'cqc-pass6-final-source-review-facts.json',W/'MGS_CQC_PASS6_DELIVERY_2026-10-02.json',W/'REPRISE_PASS6_MGS_CQC_2026-10-02.md']:
 assert p.is_file(),str(p);rows.append(copy(p,D/p.name))
text='''# CQC PASS6 source and review bundle

The runnable standalone game and the Shadow tab share `public/cqc/` and its SHA256 runtime manifest. This folder preserves PASS6 generation arguments, native source sheets, original-game references, rejected attempts, failed preliminary checks, final tests and browser captures. Preservation does not approve a rejected asset.

`source-code/modules/unified-versus-v055.html` retains the source HTML before the documented standalone runtime transformation. The new helper scripts and meaningful tests are included byte-exact; their original paths are relative to the full CQC source root. `sprite-review` preserves the importer, crop metadata, all source-pixel origin marks and contact reviews.

The complete standalone historical source remains in the immutable PASS5 source ZIP and earlier archives pinned in the provenance facts. This evidence bundle is not labelled a complete replacement for those archives. Old repository paths, branches and commits remain preserved; PASS6 descends from PASS5. PNG pixel data are unchanged. Original incarnations are reviewed as closest_supported, with adaptations explicitly recorded.
'''
D.mkdir(parents=True,exist_ok=True);p=D/'README.md'
if p.exists():assert p.read_text()==text
else:p.write_text(text)
manifest={'schema':'cqc.github.pass6-review-bundle/1','files':rows,'byteExact':True,'completeHistoricalArchiveReplacement':False}
p=D/'BUNDLE_MANIFEST.json';assert not p.exists();p.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'files':len(rows),'bytes':sum(r['bytes']for r in rows),'root':str(D),'manifestSHA256':sha(p)}))
