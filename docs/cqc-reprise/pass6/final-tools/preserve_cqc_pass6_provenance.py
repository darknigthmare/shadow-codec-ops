#!/usr/bin/env python3
"""Preserve source jobs, references and rejected native attempts without approving them."""
from pathlib import Path
import hashlib,json,shutil
W=Path('/workspace');R=W/'cqc-game-working/cqc-versus-v056';DEST=R/'preparation/reprise-pass6-provenance'
def sha(p):
 h=hashlib.sha256()
 with p.open('rb')as f:
  for chunk in iter(lambda:f.read(1048576),b''):h.update(chunk)
 return h.hexdigest()
def preserve(source,target):
 h=sha(source);target.parent.mkdir(parents=True,exist_ok=True)
 if target.exists() and sha(target)!=h:
  old=target.read_bytes();saved=R/'recovery/pass6-provenance-history'/(hashlib.sha256(old).hexdigest()+'-'+target.name)
  saved.parent.mkdir(parents=True,exist_ok=True)
  if not saved.exists():saved.write_bytes(old)
 if not target.exists() or sha(target)!=h:shutil.copyfile(source,target)
 assert sha(target)==h
 return {'originalPath':str(source),'file':target.relative_to(R).as_posix(),'bytes':target.stat().st_size,'sha256':h}
def main():
 records=[];video=[];documents=[]
 for folder in ['pain','fear','end','fury']:
  src=W/'cqc-pass6-generation'/folder
  if not (src/'FINAL_DELIVERY.json').exists():continue
  for p in sorted(src.rglob('*')):
   if not p.is_file():continue
   if p.suffix.lower()in {'.mp4','.webm','.mkv'}:
    video.append({'file':str(p),'sha256':sha(p),'bytes':p.stat().st_size,'preservation':'Retained locally; selected original frames and source URL/SHA are included in the game proofs.'});continue
   records.append(preserve(p,DEST/'generation'/folder/p.relative_to(src)))
 for folder,category in [('cqc-pass6-reference-selection','reference-selection'),('cqc-pass6-narrative-selection','narrative-selection'),('cqc-pass6-narrative-art','narrative'),('cqc-pass6-stage-ceilings','stage-ceilings')]:
  src=W/folder
  if src.exists():
   for p in sorted(src.rglob('*')):
    if not p.is_file():continue
    if p.suffix.lower()in {'.mp4','.webm','.mkv'}:
     video.append({'file':str(p),'sha256':sha(p),'bytes':p.stat().st_size,'preservation':'Complete video retained locally; selected original captures and URL/SHA supplied in canonical reviews.'});continue
    target=DEST/category/p.relative_to(src)
    if category=='narrative'and p.name=='IMPORT_READY_MANIFEST.json':target=target.with_name('IMPORT_READY_MANIFEST.artist-delivery.json')
    records.append(preserve(p,target))
 extra=[W/'cqc-pass6-narrative-import-results.json',W/'cqc-pass6-narrative-qa.json',W/'cqc-pass6-narrative-qa.md',W/'cqc-pass6-core-qa.json',W/'cqc-pass6-core-qa.md',W/'cqc-pass6-combat-fidelity-tests.log',W/'shadow-cqc-pass6-final-qa.json',W/'shadow-cqc-pass6-qa.log',W/'cqc-pass6-narrative-art/APPROVED_NARRATIVE_MANIFEST.json',W/'verify_cqc_pass6_narrative_source.py',W/'preserve_cqc_pass6_provenance.py',W/'run_cqc_pass6_core_qa.py',W/'verify_cqc_pass6_gameplay.py',W/'verify_shadow_cqc_pass6_tab.py',W/'package_cqc_pass6.py',W/'package_shadow_cqc_pass6.py',W/'preserve_cqc_pass6_changed_baseline.py',W/'write_cqc_pass6_release_notes.py',W/'cqc-delivered-pass4-baseline-files.json',W/'cqc-pass6-previous-deliveries-frozen.json',W/'cqc-pass6-browser-observers.js',W/'verify_cqc_pass6_projectiles_browser.py',W/'write_cqc_pass6_release_notes.py',W/'import_cqc_pass6_narratives.py',W/'import_cqc_pass6_native_props.py',W/'integrate_cqc_pass6_gameplay.py',W/'run_shadow_cqc_pass6_qa.py',W/'review_cqc_pass6_gameplay.py',W/'review_cqc_pass6_packages.py']
 extra+=sorted(set(W.glob('*cqc*pass6*.py'))|set(W.glob('cqc-pass6-*.js'))|set(W.glob('cqc-pass6-*.json'))|set(W.glob('cqc-pass6-*.md'))|set(W.glob('cqc-pass6-*.log'))|set(W.glob('verify_cqc_pass6*.py'))|set(W.glob('shadow-cqc-pass6-*.json'))|set(W.glob('shadow-cqc-pass6-*.md'))|set(W.glob('shadow-cqc-pass6-*.log')))
 for p in extra:
  if p.exists():records.append(preserve(p,DEST/'tools-and-reports'/p.name))
 qa=R/'docs/reprise-qa/pass6';qa.mkdir(parents=True,exist_ok=True)
 directories=[W/n for n in ['cqc-pass6-gameplay-qa','cqc-pass6-projectile-browser-qa','cqc-pass6-core-qa-logs']]
 directories+=sorted(p for p in W.glob('shadow-cqc-pass6-browser-qa*')if p.is_dir())
 directories+=sorted(p for p in W.glob('cqc-pass6-*')if p.is_dir() and ('browser' in p.name or 'inspection' in p.name or 'gameplay' in p.name or 'core-qa-logs' in p.name))
 for source in directories:
  dirname=source.name
  if not source.exists():continue
  for p in sorted(source.rglob('*')):
   if p.is_file():records.append(preserve(p,qa/dirname/p.relative_to(source)))
 for basename in ['cqc-pass6-narrative-qa.json','cqc-pass6-narrative-qa.md','cqc-pass6-core-qa.json','cqc-pass6-core-qa.md']:
  p=W/basename
  if p.exists():records.append(preserve(p,qa/basename))
 out=DEST/'PRESERVATION_MANIFEST.json'
 if out.exists():preserve(out,R/'recovery/pass6-provenance-manifests'/(sha(out)+'.json'))
 out.write_text(json.dumps({'schema':'cqc.pass6-provenance-preservation/1','files':records,'rawVideosRetainedLocally':video,'longExternalDocumentsRetainedLocally':documents,'artisticApproval':'Preservation only; rejection/approval remains documented independently in the source reviews.'},ensure_ascii=False,indent=2)+'\n')
 print(json.dumps({'preservedFiles':len(records),'longVideosRetainedLocally':len(video)}))
if __name__=='__main__':main()
