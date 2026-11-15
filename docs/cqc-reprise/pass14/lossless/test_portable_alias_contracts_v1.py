#!/usr/bin/env python3
import importlib.util,json,tempfile,copy
from pathlib import Path
HERE=Path(__file__).parent;BASE=HERE.parent

def imp(name,path):
 s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
A=imp('archive',BASE/'archive_pass14_lossless_v3.py');R=imp('restore',BASE/'restore_pass14_portable_v3.py');cases=[]
with tempfile.TemporaryDirectory(prefix='pass14-alias-portable-fixture-',dir='/tmp') as raw:
 root=Path(raw);source=root/'closed-source';source.mkdir();repo=root/'repo';repo.mkdir()
 native=source/'untouched.fixture';native.write_bytes(b'original fixture pixels\x00\xff')
 alias=source/'linked.fixture';alias.symlink_to(native)
 tool=root/'native-tool.fixture';tool.write_bytes(native.read_bytes())
 digest=A.sha(native.read_bytes());n=len(native.read_bytes())
 spec={'schema':'cqc.pass14.closed-lossless-source-spec/1','closed':True,'allowedRoots':[str(source)],'files':[{'path':str(native),'bytes':n,'sha256':digest,'producerState':'closed'}],'archivePrefix':'fixture-phase1','portableRepositoryArchiveBase':'docs/cqc-reprise/pass14/lossless','logicalSymlinkAliases':[{'sourcePath':str(alias),'targetSourcePath':str(native),'linkTargetLiteral':str(native),'bytes':n,'sha256':digest}],'externalNativeToolAliases':[{'path':str(tool),'preservedSourcePath':str(native),'bytes':n,'sha256':digest}]}
 sp=root/'SPEC.json';gp=root/'GO.json'
 def write_spec():
  A.dump(sp,spec);A.dump(gp,{'schema':'cqc.pass14.root-archive-go/1','approved':True,'closedSourceSpecSHA256':A.sha(sp.read_bytes())})
 write_spec();out=root/'actual';index=A.create(sp,gp,out)
 restored=root/'restore';result=R.verify(out/'LOSSLESS_RECONSTRUCTION_INDEX.json',repo,out,restored)
 for p in [native,alias,tool]:assert (restored/'logical'/str(p).lstrip('/')).read_bytes()==native.read_bytes()
 cases.append({'case':'actual portable reconstruction writes source and symlink/native-tool aliases as equal bytes','passed':True,'result':result})
 alias.unlink();alias.symlink_to(tool)
 try:A.create(sp,gp,root/'bad-symlink')
 except ValueError as e:
  assert 'symlink alias changed' in str(e);cases.append({'case':'changed closed symlink target rejected','passed':True})
 else:raise AssertionError('changed alias accepted')
 alias.unlink();alias.symlink_to(native);tool.write_bytes(b'changed-original-tool-fixture')
 try:A.create(sp,gp,root/'bad-tool')
 except ValueError as e:
  assert 'native tool alias' in str(e);cases.append({'case':'changed native tool original rejected','passed':True})
 else:raise AssertionError('changed native original accepted')
 stress=copy.deepcopy(index);stress['objects'][0]['chunks'][0]['offset']=1;stressp=root/'bad-offset.json';A.dump(stressp,stress)
 try:R.verify(stressp,repo,out)
 except AssertionError:cases.append({'case':'portable fragment offset gap rejected','passed':True})
 else:raise AssertionError('offset gap accepted')
report={'schema':'cqc.pass14.portable-alias-tool-synthetic-verification/1','actualRun':True,'closed':True,'passedCases':len(cases),'cases':cases,'archiveToolSHA256':A.sha((BASE/'archive_pass14_lossless_v3.py').read_bytes()),'portableToolSHA256':A.sha((BASE/'restore_pass14_portable_v3.py').read_bytes()),'testScriptSHA256':A.sha(Path(__file__).read_bytes()),'fixturesRemoved':True,'productionOrImageSourcesEdited':False}
A.dump(HERE/'PORTABLE_ALIAS_ACTUAL_SYNTHETIC_VERIFICATION_V1.json',report)
print(json.dumps({'passedCases':len(cases)}))
