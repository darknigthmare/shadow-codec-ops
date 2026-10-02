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
final=json.loads((W/'cqc-pass6-preservation-review-corrected.json').read_text())
assert final['status']=='passed' and final['failureCount']==0
for folder,label in [('preparation/reprise-pass6-provenance','provenance'),('preparation/combat-sprites-pass6','sprite-review'),('docs/reprise-qa/pass6','qa')]:
 source=R/folder
 for p in sorted(source.rglob('*')):
  if p.is_file():rows.append(copy(p,D/label/p.relative_to(source)))
for p in sorted((R/'src').glob('cqc-pass6-*.js')):rows.append(copy(p,D/'source-code/src'/p.name))
for p in sorted((R/'tests').glob('test_pass6_*.cjs')):rows.append(copy(p,D/'source-code/tests'/p.name))
for name in ['modules/unified-versus-v055.html','data/combat-prop-catalog-pass6.json','recovery/PASS6_PREVIOUS_WAVES_PRESERVATION.json']:
 rows.append(copy(R/name,D/'source-code'/name))
baseline=json.loads((W/'cqc-delivered-pass5-baseline-files.json').read_text())
previous=set(baseline) if isinstance(baseline,dict) else {row['path']for row in baseline}
history=json.loads((R/'recovery/PASS6_PREVIOUS_WAVES_PRESERVATION.json').read_text())
for row in next(b for b in history['baselines']if b['tag']=='pass5')['changes']:
 p=R/row['path'];assert sha(p)==row['currentSha256'];rows.append(copy(p,D/'source-code'/row['path']))
 backup=R/row['exactBackups'][0];assert sha(backup)==row['previousSha256'];rows.append(copy(backup,D/'source-code'/row['exactBackups'][0]))
for folder in ['src','data','tools','tests']:
 for p in sorted((R/folder).rglob('*')):
  if p.is_file() and p.relative_to(R).as_posix() not in previous:
   rows.append(copy(p,D/'source-code'/p.relative_to(R)))
for p in [W/'cqc-pass6-preservation-review.json',W/'cqc-pass6-preservation-review-corrected.json',W/'cqc-pass6-final-source-review-facts.json',W/'MGS_CQC_PASS6_DELIVERY_2026-10-02.json',W/'REPRISE_PASS6_MGS_CQC_2026-10-02.md']:
 assert p.is_file(),str(p);rows.append(copy(p,D/p.name))
for p in sorted(set(W.glob('*cqc*pass6*.py'))|set(W.glob('cqc-pass6-review*.js'))):
 if p.is_file():rows.append(copy(p,D/'final-tools'/p.name))
for folder in sorted(W.glob('cqc-pass6-preservation*')):
 if folder.is_dir():
  for p in sorted(folder.rglob('*')):
   if p.is_file():rows.append(copy(p,D/'preservation-reader-history'/folder.name/p.relative_to(folder)))
text='''# CQC PASS6 source and review bundle

The runnable standalone game and the Shadow tab share `public/cqc/` and its SHA256 runtime manifest. This folder preserves PASS6 generation arguments, native source sheets, original-game references, rejected attempts, failed preliminary checks, final tests and browser captures. Preservation does not approve a rejected asset.

`source-code/modules/unified-versus-v055.html` retains the source HTML before the documented standalone runtime transformation. The new helper scripts and meaningful tests are included byte-exact; their original paths are relative to the full CQC source root. `sprite-review` preserves the importer, crop metadata, all source-pixel origin marks and contact reviews.

The complete standalone historical source remains in the immutable PASS5 source ZIP and earlier archives pinned in the provenance facts. This evidence bundle is not labelled a complete replacement for those archives. Old repository paths, branches and commits remain preserved; PASS6 descends from PASS5. PNG pixel data are unchanged. Original incarnations are reviewed as closest_supported, with adaptations explicitly recorded.

`cqc-pass6-preservation-review-corrected.json` is the final preservation result. The first report is retained separately: its six failures describe an obsolete PASS5 field reader in the verification tool; the reader and corrected source-log checks are documented without discarding that first result.
'''
D.mkdir(parents=True,exist_ok=True);p=D/'README.md'
if p.exists():assert p.read_text()==text
else:p.write_text(text)
unique={row['file']:row for row in rows}
manifest={'schema':'cqc.github.pass6-review-bundle/1','files':list(unique.values()),'byteExact':True,'completeHistoricalArchiveReplacement':False}
p=D/'BUNDLE_MANIFEST.json';assert not p.exists();p.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'files':len(unique),'bytes':sum(r['bytes']for r in unique.values()),'root':str(D),'manifestSHA256':sha(p)}))
