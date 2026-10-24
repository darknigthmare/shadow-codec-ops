#!/usr/bin/env python3
"""Materialize a verified editing archive at chosen roots. Never execute its code."""
from pathlib import Path
import argparse, gzip, hashlib, json, re, shutil

def digest(raw):
 return hashlib.sha256(raw).hexdigest()

def main():
 ap=argparse.ArgumentParser(description=__doc__)
 ap.add_argument('archive',type=Path)
 ap.add_argument('destination',type=Path)
 ap.add_argument('--manifest-sha256',required=True)
 ap.add_argument('--app-root',type=Path)
 ap.add_argument('--workspace-root',type=Path)
 ap.add_argument('--scratch-root',type=Path)
 ap.add_argument('--native-source-directory',type=Path)
 ap.add_argument('--native-bindings-sha256')
 a=ap.parse_args()
 archive=a.archive.resolve(); dest=a.destination.resolve()
 assert not dest.exists(), 'Destination must be new; no file is overwritten.'
 mp=archive/'EDITING_EXPORT_MANIFEST.json'; raw=mp.read_bytes()
 assert digest(raw)==a.manifest_sha256, 'Manifest pin mismatch'
 m=json.loads(raw); assert m['schema']=='cqc.pass40.portable-editing-export/1'
 assert len(m['files'])==m['fileCount']<=200
 mapping={'@PROJECT_ROOT@':str(dest), '@APP_ROOT@':str((a.app_root or dest/'host-app').resolve()),
  '@WORKSPACE_ROOT@':str((a.workspace_root or dest/'legacy-workspace').resolve()),
  '@SCRATCH_ROOT@':str((a.scratch_root or dest/'scratch').resolve())}
 prepared=[]
 for f in m['files']:
  rel=Path(f['relative'])
  assert not rel.is_absolute() and '..' not in rel.parts
  p=archive/'files'/rel
  assert p.is_file() and not p.is_symlink()
  source=p.read_bytes()
  assert len(source)==f['exportBytes'] and digest(source)==f['exportSHA256'], str(rel)
  decoded=gzip.decompress(source) if f['gzip'] else source
  assert digest(decoded)==f['exportDecodedSHA256']
  text=decoded.decode('utf8')
  for token, chosen in mapping.items(): text=text.replace(token,chosen)
  assert not re.search(r'@[A-Z_]+ROOT@',text), str(rel)
  value=text.encode('utf8'); out=gzip.compress(value,mtime=0) if f['gzip'] else value
  prepared.append((rel,out,{'relative':str(rel),'originalSHA256':f['originalSHA256'],
    'exportSHA256':f['exportSHA256'],'materializedSHA256':digest(out),
    'materializedDecodedSHA256':digest(value),'bytes':len(out)}))
 natives=[]
 if a.native_source_directory:
  assert a.native_bindings_sha256, 'Pin the native bindings manifest when supplying native sources.'
  native_manifest=(archive/'EDITING_NATIVE_SOURCE_BINDINGS.json').read_bytes()
  assert digest(native_manifest)==a.native_bindings_sha256
  native=json.loads(native_manifest);assert len(native['files'])==native['fileCount']<=100
  for f in native['files']:
   rel=Path(f['relative']);assert not rel.is_absolute() and '..' not in rel.parts
   assert rel not in {r for r,_,_ in prepared}
   p=a.native_source_directory.resolve()/rel
   assert p.is_file() and not p.is_symlink()
   value=p.read_bytes();assert len(value)==f['bytes'] and digest(value)==f['sha256'],str(rel)
   natives.append((rel,p,f))
 # All pins are checked before the first write. No imported module or job is executed.
 dest.mkdir(parents=True)
 for rel,out,_ in prepared:
  p=dest/rel;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(out)
 for rel,source,f in natives:
  p=dest/rel;p.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(source,p)
  assert p.stat().st_size==f['bytes'] and digest(p.read_bytes())==f['sha256']
 dependency_checks=[]
 for rel,out,_ in prepared:
  if not str(rel).endswith(('.json','.json.gz')): continue
  decoded=gzip.decompress(out) if str(rel).endswith('.gz') else out
  stack=[json.loads(decoded)]
  while stack:
   item=stack.pop()
   if isinstance(item,list): stack.extend(item)
   elif isinstance(item,dict):
    stack.extend(item.values())
    value=item.get('path'); expected=item.get('sha256')
    if isinstance(value,str) and isinstance(expected,str) and re.fullmatch(r'[0-9a-f]{64}',expected):
     dependency=Path(value)
     if dependency.is_absolute() and any(dependency.is_relative_to(Path(root)) for root in mapping.values()):
      actual=digest(dependency.read_bytes()) if dependency.is_file() and not dependency.is_symlink() else None
      dependency_checks.append({'owner':str(rel),'path':value,'recordedHistoricalSHA256':expected,
       'actualSHA256':actual,'status':'missing' if actual is None else 'matching' if actual==expected else 'changed-pin-needs-review'})
 report={'schema':'cqc.pass40.editing-materialization/1','manifestSHA256':a.manifest_sha256,
  'files':[row for _,_,row in prepared], 'fileCount':len(prepared), 'chosenRoots':mapping,
  'dependencyChecks':dependency_checks,
  'nativeFilesMaterialized':len(natives),
  'codeExecuted':False,'runtimeInstalled':False,'approvalInherited':False,
  'requiredNextStep':'Check all referenced dependencies, update changed input pins explicitly, and obtain fresh review before compiling or installing any normalized job.',
  'historicalReviewQualification':'Included old review records describe their original bytes, not these materialized files.'}
 (dest/'EDITING_MATERIALIZATION_REPORT_LOCAL_ONLY.json').write_text(json.dumps(report,indent=2)+'\n')
 print(json.dumps({'fileCount':len(prepared),'allExportPinsPassed':True,'codeExecuted':False,'approvalInherited':False}))

if __name__=='__main__': main()
