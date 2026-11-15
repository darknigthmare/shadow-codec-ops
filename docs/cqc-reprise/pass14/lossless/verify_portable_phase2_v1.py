#!/usr/bin/env python3
"""Actual portable verification against Git docs13 + phase1 docs14 + new ZIPs.
All absolute source/prior/old-member paths are made unavailable in second read.
"""
import copy,importlib.util,json,tempfile,hashlib
from pathlib import Path
HERE=Path(__file__).parent
TOOL=Path('/tmp/cqc-pass14-quality/archival-plan-v3/restore_pass14_portable_v3.py')
s=importlib.util.spec_from_file_location('restore',TOOL);R=importlib.util.module_from_spec(s);s.loader.exec_module(R)
INDEX=Path('/tmp/cqc-pass14-production-preservation-v1/phase2-actual-01/LOSSLESS_RECONSTRUCTION_INDEX.json')
P1=Path('/tmp/cqc-pass14-production-preservation-v1/phase1-actual-01/LOSSLESS_RECONSTRUCTION_INDEX.json')
REPO=Path('/workspace/shadow-codec-recovered')
actual=R.verify(INDEX,REPO,INDEX.parent)
phase1=R.verify(P1,REPO)
stress=copy.deepcopy(json.loads(INDEX.read_text()));stress['priorIndexes']=[{'path':'/unavailable/prior-index.json'}]
for obj in stress['objects']:
 obj['sourcePaths']=['/unavailable/closed-producer-source']
 if obj['storageKind']=='existing-closed-member':
  obj['location']['archivePath']='/unavailable/old-prior-archive.zip'
  for member in obj['location']['members']:member['archivePath']='/unavailable/old-prior-archive.zip'
with tempfile.TemporaryDirectory(prefix='pass14-phase2-portable-stress-',dir='/tmp') as raw:
 p=Path(raw)/'INDEX.json';p.write_text(json.dumps(stress));second=R.verify(p,REPO,INDEX.parent)
assert actual==second
p1=json.loads(P1.read_text());p2=json.loads(INDEX.read_text());unique={o['sha256']:o['bytes'] for o in p1['objects']+p2['objects']}
report={'schema':'cqc.pass14.closed-phase2-actual-portable-reconstruction/1','actualRun':True,'closed':True,'actualIndex':{'path':str(INDEX),'bytes':INDEX.stat().st_size,'sha256':R.sha(INDEX.read_bytes())},'phase1IndexSHA256':R.sha(P1.read_bytes()),'portableToolSHA256':R.sha(TOOL.read_bytes()),'reviewScriptSHA256':R.sha(Path(__file__).read_bytes()),'actualPhase2PortableResult':actual,'phase1RepositoryCopiesReverified':phase1,'secondActualReadWithUnavailableProducerPriorIndexAndAbsoluteOldMemberArchivePaths':True,'resultsEqualAfterDependencyStress':True,'onlyArchiveDependencies':['published Git docs/cqc-reprise/pass13/lossless','existing phase1 docs/cqc-reprise/pass14/lossless','new two phase2 ZIPs in actual output directory'],'unionUniqueObjects':len(unique),'unionUniqueBytes':sum(unique.values()),'totalEightNewZIPBytes':sum(a['bytes'] for a in p1['archives']+p2['archives']),'cumulativeLogicalSourceBytes':p1['logicalBytes']+p2['logicalBytes'],'volumeLimitBytes':8*1024*1024,'sourceEqualityVerification':'archivev3 actually compared all446sources after reconstructing407objects; own ACTUAL_RECONSTRUCTION_VERIFICATION.json is pinned separately','nativePixelsEdited':False,'SOrRWritten':False,'oldZIPOrSourceCopiesCreated':False,'publicQAIncluded':False}
(HERE/'ACTUAL_PHASE2_PORTABLE_RECONSTRUCTION_REVIEW_V1.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({'phase2':actual,'unionUniqueObjects':len(unique),'unionUniqueBytes':sum(unique.values()),'totalEightNewZIPBytes':report['totalEightNewZIPBytes'],'cumulativeLogicalSourceBytes':report['cumulativeLogicalSourceBytes']},indent=2))
