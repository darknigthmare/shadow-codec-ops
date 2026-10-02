#!/usr/bin/env python3
"""Copy approved native narrative proof unchanged and import twelve reviewed scenes."""
from pathlib import Path
import hashlib,json,shutil,subprocess,sys
W=Path('/workspace');R=W/'cqc-game-working/cqc-versus-v056';S=W/'cqc-pass6-narrative-art';D=R/'preparation/reprise-pass6-provenance/narrative'
ARTIST_SHA='11202e4fb37cdc109c1f86404e197722de1b3364544071dde008499185766fcc'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def main():
 artist=S/'IMPORT_READY_MANIFEST.json';assert sha(artist)==ARTIST_SHA
 for p in sorted(S.rglob('*')):
  if not p.is_file():continue
  assert not p.is_symlink()
  relative=p.relative_to(S);target=D/relative
  if relative.as_posix()=='IMPORT_READY_MANIFEST.json':target=target.with_name('IMPORT_READY_MANIFEST.artist-delivery.json')
  target.parent.mkdir(parents=True,exist_ok=True)
  if target.exists():assert sha(target)==sha(p),str(target)
  else:shutil.copyfile(p,target)
 def portable(v):
  if isinstance(v,dict):return{k:portable(x)for k,x in v.items()}
  if isinstance(v,list):return[portable(x)for x in v]
  if isinstance(v,str)and v.startswith(str(S)+'/'):return (D/Path(v).relative_to(S)).relative_to(R).as_posix()
  if isinstance(v,str)and v.startswith('/workspace/generated_images/'):
   p=D/'native-source'/Path(v).name;assert p.is_file(),str(p)
   return p.relative_to(R).as_posix()
  return v
 manifest=portable(json.loads(artist.read_text()));assert len(manifest['assets'])==12
 assert {a['uid']for a in manifest['assets']}=={'core__runner_mg2','core__redblaster_mg2'}
 out=D/'IMPORT_READY_MANIFEST.json'
 with out.open('x')as f:json.dump(manifest,f,ensure_ascii=False,indent=2);f.write('\n')
 cmd=[sys.executable,str(R/'tools/reprise/integrate_cqc_reprise.py'),'--root',str(R),'--manifest',str(out)]
 for dryrun in [True,False]:
  p=subprocess.run(cmd+(['--dry-run']if dryrun else[]),capture_output=True,text=True)
  if p.returncode:raise RuntimeError(p.stderr)
  result=json.loads(p.stdout);dest=W/('cqc-pass6-narrative-dry-run.json'if dryrun else'cqc-pass6-narrative-import-results.json')
  with dest.open('x')as f:json.dump(result,f,ensure_ascii=False,indent=2);f.write('\n')
  print(json.dumps({'dryRun':dryrun,'resultFile':str(dest),'reportKeys':list(result)},ensure_ascii=False),flush=True)
if __name__=='__main__':main()
