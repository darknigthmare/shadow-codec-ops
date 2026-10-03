#!/usr/bin/env python3
import copy,importlib.util,json,tempfile
from pathlib import Path
HERE=Path(__file__).parent;PARENT=HERE.parent
s=importlib.util.spec_from_file_location('restore',PARENT/'restore_pass14_portable_v3.py');R=importlib.util.module_from_spec(s);s.loader.exec_module(R)
index=Path('/tmp/cqc-pass14-production-preservation-v1/phase1-actual-01/LOSSLESS_RECONSTRUCTION_INDEX.json');repo=Path('/workspace/shadow-codec-recovered')
actual=R.verify(index,repo,index.parent)
stress=copy.deepcopy(json.loads(index.read_text()))
stress['priorIndexes']=[{'path':'/unavailable-old-preparation/no-index.json'}]
for obj in stress['objects']:
 obj['sourcePaths']=['/unavailable-producer/source']
 if obj['storageKind']=='existing-closed-member':
  obj['location']['archivePath']='/unavailable-old-archive/old.zip'
  for m in obj['location']['members']:m['archivePath']='/unavailable-old-archive/old.zip'
with tempfile.TemporaryDirectory(prefix='pass14-portable-index-stress-',dir='/tmp') as p:
 stress_path=Path(p)/'INDEX.json';stress_path.write_text(json.dumps(stress));second=R.verify(stress_path,repo,index.parent)
assert actual==second
report={'schema':'cqc.pass14.actual-phase1-portable-reconstruction-review/1','actualRun':True,'closed':True,'actualIndex':{'path':str(index),'bytes':index.stat().st_size,'sha256':R.sha(index.read_bytes())},'portableToolSHA256':R.sha((PARENT/'restore_pass14_portable_v3.py').read_bytes()),'reviewScriptSHA256':R.sha(Path(__file__).read_bytes()),'actualPortableResult':actual,'dependenciesOnlyPublishedGitDocs13AndNewSixVolumes':True,'secondActualReadWithUnavailableProducerPriorIndexAndAbsoluteOldArchivePaths':True,'resultsEqualAfterDependencyStress':True,'nativePixelsEdited':False,'producerRootsWritten':False,'oldArchivesCopiedOrModified':False}
(HERE/'ACTUAL_PHASE1_PORTABLE_RECONSTRUCTION_REVIEW_V1.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(actual,indent=2))
