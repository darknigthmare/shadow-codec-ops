import json,pathlib,hashlib,re
B=pathlib.Path('@PROJECT_ROOT@');Q=B/'integration/retro-four-browser-qa-v1';paths=[]
def add(p):
 assert p.is_file(),p
 if p not in paths:paths.append(p)
for n in ['qa-overlay-p41.mjs','browser-p41-four-retro-v2.mjs','browser-p41-four-retro-v4.mjs','prepare-qa-configs.py','finalize-four-retro-qa.py','prepare-finite-qa-archive.py','OPTIONAL_CROSSING_QUALIFICATION_ACTUAL_V1.json','FOUR_ELIGIBLE_RETRO_GAMEPLAY_HANDOFF_ACTUAL_V1.json'] :add(Q/n)
for v in [2,4,5]:
 for n in ['BROWSER_CONFIG_V'+str(v)+'.json','OVERLAY_CONFIG_V'+str(v)+'.json','OWNED_PROCESSES_CLOSED_ACTUAL_V'+str(v)+'.json']:add(Q/n)
for n in ['run-owned-p41-three-retro-v2.mjs','run-owned-p41-retro-v4.mjs','run-owned-p41-retro-v5.mjs']:add(Q/n)
for dirname in ['attempt-v2-three-unarmed-approved-sdk-v2','attempt-v4-three-unarmed-two-slots-two-facing','attempt-v5-campbell-mg2-approved-native-six-shot']:
 add(Q/dirname/'ACTUAL_NATIVE_SUBSET_QA_V2.json')
 for p in (Q/dirname).glob('*.jpg'):add(p)
R=B/'retro-five/final-art-review-v1'
for d,script in [(R,'capture-exact-source-axes.mjs'),(R/'axis-correction-capture-v2','capture-corrected-source-axes.mjs')]:
 for n in ['CAPTURE_ACTUAL_V1.json',script]:add(d/n)
 for p in d.glob('*.jpg'):add(p)
for uid,version in [('roster50__mei_mgs1',2),('roster50__nastasha_mgs1',3),('roster50__emma_mgs2',3),('roster50__campbell_mg2',1)]:
 d=B/'integration/retro-five'/uid/('manual-axis-proposal-v'+str(version))
 for n in ['BODY_AXIS_PROPOSALS_CANDIDATE.json','POSE_BBOX_AND_MANUAL_PELVIS_PROPOSALS_UNAPPROVED.json','source-axes-review.html']:add(d/n)
files=[]
for p in paths:
 raw=p.read_bytes()
 if p.suffix not in ['.jpg','.png']:
  s=raw.decode('utf8');assert not re.search(r'exec-[0-9a-f]{8}-|' + '/'+'workspace/'+'generated_images',s),p
 files.append({'path':str(p),'logicalPath':'sources/pass41-final-retro-qa/'+str(p.relative_to(B)),'bytes':len(raw),'sha256':hashlib.sha256(raw).hexdigest(),'status':'finite immutable QA/source evidence; failed extra attempt explicitly retained and not admitted'})
r={'schema':'cqc.p41.finite-source-archive-addendum/1','purpose':'Four final eligible native Retro costumes: actual local gameplay proofs, exact executed harnesses/configs, original source axis captures, independent Root source approvals retained in the preceding final-art addendum. No browser profiles, no private generation UUID map.','files':files,'fileCount':len(files),'bytes':sum(x['bytes']for x in files),'approvedProductChangesByThisPackage':False,'publicPathRewritesAllowed':'Only project prefixes with logical aliases, preserving captured source hashes, Root reviews and all QA qualifications. Root source approval files are in FINAL_FOUR_RETRO_ART_FINITE_ARCHIVE_HANDOFF_ACTUAL_V1.json.','importantLimits':['Campbell MGS1 remains HOLD after refused correction and is excluded from all eligible tests.','V2 contains a failed optional jump-crossing attempt; V4 and V5 are the final successful accepted gameplay passes.','Real initial P1-right/P2-left directions only. Individual slot inversions are not claimed.','Separate exact HTTP SHA256 readbacks cover routes canceled in the gameplay browser; no production HTTPS browser claim.']}
p=Q/'FINAL_FOUR_RETRO_QA_FINITE_ARCHIVE_HANDOFF_ACTUAL_V1.json';p.write_text(json.dumps(r,indent=2)+'\n');raw=p.read_bytes();print(json.dumps({'path':str(p),'bytes':len(raw),'sha256':hashlib.sha256(raw).hexdigest(),'files':len(files),'sourceBytes':r['bytes']}))
