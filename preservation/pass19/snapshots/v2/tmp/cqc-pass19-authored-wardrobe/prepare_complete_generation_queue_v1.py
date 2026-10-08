#!/usr/bin/env python3
"""Prepare explicit per-identity generation work. No artwork or runtime costume registration implied."""
import datetime,hashlib,json,os
from pathlib import Path
ROOT=Path('/tmp/cqc-pass19-authored-wardrobe')
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
input_file=ROOT/'NATIVE_WARDROBE_INPUT_V1.json';eligibility_file=ROOT/'REQUEST_ELIGIBILITY_INPUT_V1.json'
native=json.loads(input_file.read_text());eligibility=json.loads(eligibility_file.read_text())
sprites={r['uid']:r for r in native['records']}
groups_file=Path('/tmp/cqc-pass19-canonical-costumes/CANONICAL_APPEARANCE_CROSSMAP_V2.json')
groups=json.loads(groups_file.read_text())['sameIndividualGroups']
identity={uid:g['identityID'] for g in groups for uid in g['uids']}
families={
 'cyborg':{'label':'Châssis cybernétique','designInstruction':'Redesign THIS identity as a coherent original full-body cyborg. Preserve its own face, age, hair, emblematic silhouette, palette, role and equipment. Design bespoke torso plates, limb articulation, exposed electromechanical muscle, coherent connectors and footwear informed by THIS source incarnation. No generic Raiden/Gray Fox replacement, white hair or borrowed costume. Preserve all action poses and anatomical weapon sides.'},
 'survive':{'label':'Expédition Dité','designInstruction':'Adapt THIS identity into a coherent original post-apocalyptic Dité survivor. Preserve age, face, hair, personal colours, emblematic silhouette and recognised equipment; adapt its own clothing with functional wear, local repairs, repurposed straps, coherent filter/oxygen survival equipment and mission-specific supplies. Preserve its established role and action poses. No generic Captain body, universal gas mask obscuring everyone, invented crystal infection or copy of another character.'},
 'metalgear':{'label':'Unité blindée','designInstruction':'Create a truly original mechanical Metal Gear form inspired by THIS identity: personalised silhouette, armour topology, colour scheme and unique recognisable motifs translating the source clothing/face/role into cockpit, sensor, canopy, armour, appendage and actuator design. No human merely coloured grey, costume armour over human skin, universal REX silhouette or generic humanoid with a robot filter. Design mechanical joints and meaningful action equivalents. Keep original-design provenance and any invented physical dimensions explicit.'},
 'tuxedo':{'label':'Tenue de soirée','designInstruction':'Design a coherent original formal/tuxedo variant for THIS identity, adapted to its age, anatomy, role and distinctive palette while preserving face, hair, emblematic accessories and weapon-side identity. Tailored formal materials, lapels, appropriate collar/bow tie and functional shoes or species/machine equivalents. No default adult male anatomy for children, animals or machines. If THIS identity has a released canonical formal costume, route that request to reference-backed canonical drawing instead of inventing one.'},
 'retro':{'label':'Archives','designInstruction':'Render the same source identity, outfit, equipment, anatomical sides and poses as a deliberate high-quality retro pixel-art costume. Create designed pixel shapes, shading clusters and readable silhouettes; preserve recognisable face/hair/palette. A runtime blur or low-resolution CSS filter alone is not newly generated art and must never be claimed as independent artwork.'},
 'nextgen':{'label':'Nouvelle génération','designInstruction':'Render the same source identity, outfit, equipment, anatomical sides and all poses in detailed contemporary 2.5D native painted quality. Preserve attested appearance extent and source qualifiers. Do not borrow another game incarnation, change age, silhouette, colours, weapon or hidden canonical claims. Unseen source surfaces remain qualified adapted details.'}
}
queue=[];excluded=[];already=[]
for uid,row in eligibility['entries'].items():
 src=sprites.get(uid)
 for req in row['requests']:
  family=req['id']
  if family not in families:continue
  if req['status']=='not-applicable':
   excluded.append({'uid':uid,'family':family,'reason':req.get('reason'),'bodyKind':row['nativeBody']});continue
  if req['status']=='ready-existing-native':
   already.append({'uid':uid,'family':family,'qualification':'Actual existing reviewed native variant, not newly generated in this queue.'});continue
  status='pending-art' if src else 'pending-rig-source-extraction'
  if uid=='core__solid' and family=='cyborg':status='complete-native-reviewed-geometry'
  entry={'jobID':uid+'--'+family,'uid':uid,'name':row['name'],'game':row['game'],'identityGroup':identity.get(uid),
   'family':family,'label':families[family]['label'],'status':status,'nativeBody':row['nativeBody'],
   'basePresentation':row['basePresentation'],'cyborgIncarnation':row['cyborgIncarnation'],
   'alreadyMechanical':row['alreadyMechanical'],'surviveIncarnation':row['surviveIncarnation'],
   'originalDesign':family in ['cyborg','survive','metalgear','tuxedo'],'canonicalAppearanceAttested':False,
   'sourceIncarnation':src['incarnation'] if src else None,'sourceReferences':src['sourceReferences'] if src else [],
   'sourceAtlasFiles':src['atlasFiles'] if src else [],'existingPhysicalPoses':src['uniquePhysicalFrames'] if src else None,
   'sourceVisualFirearmPresent':src['visualFirearmPresent'] if src else None,'sourceReviewLimits':src['sourceReviewLimits'] if src else [],
   'designInstruction':families[family]['designInstruction'],'processingRequirements':[
    'Physically view every local source reference before imagegen editing; use image_gen for creation/edits.',
    'Describe the source identity feature set explicitly. Record exact prompt, source file SHA and original returned PNG path.',
    'Generate distinct real native PNGs for both facings; do not mirror source asymmetries.',
    'Preserve all actual source action poses/action maps/phase maps unless a separately authored machine rig uses explicit reviewed equivalents.',
    'Measure source rectangles, pivots and alpha geometry read-only; never rewrite the original PNG pixels.',
    'Physically review identity, costume, equipment, anatomy, isolation and transparency for each independent direction.',
    'Use original-costume provenance; source URLs attest base identity only. Canonical alternatives require their own actual released appearance references.',
    'Register runtime option only after all required PNGs and code/Canvas checks pass. Preserve rejected/previous generations.',
    'A true match-scene check follows geometry/readiness tests. Do not inflate repeated/shared frame counts.',
    'Publish/conserve verified asset batches before reclaiming any local new-source copy; follow Root storage plan.']}
  if status=='complete-native-reviewed-geometry':
   entry['actualNativeOption']='SOLID_CYBORG_NATIVE_OPTION_V1.json';entry['actualQA']='reviews/SOLID_CYBORG_ALL_NATIVE_POSES_ACTUAL_BROWSER_QA_V1.json'
  queue.append(entry)
counts={}
for job in queue:counts[job['status']]=counts.get(job['status'],0)+1
out={'schema':'cqc.pass19.authored-wardrobe-generation-queue/1','createdAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),
 'baselineSourceCommit':eligibility['baselineSourceCommit'],'baselineIdentities':len(eligibility['entries']),
 'nativeSourceIdentities':len(sprites),'inputPins':[{'path':str(p),'bytes':p.stat().st_size,'sha256':sha(p)} for p in [input_file,eligibility_file,groups_file]],
 'canonicalAlternativesHandledSeparately':True,'newRosterExpansionNotYetIncluded':True,
 'counts':counts,'excludedRequests':excluded,'existingReviewedRequests':already,'jobs':queue,
 'qualification':'This is a generation work queue, not produced artwork or complete runtime coverage. Source-backed identity/body constraints and exact asset pins guide further real generation. 17 machine entries require source rig extraction; pending concepts never appear as playable costumes.'}
path=ROOT/'FULL_IDENTITY_FAMILY_GENERATION_QUEUE_V1.json'
if path.exists():raise FileExistsError(path)
path.write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n');os.chmod(path,0o400)
print(json.dumps({'baselineIdentities':out['baselineIdentities'],'sourceSprites':out['nativeSourceIdentities'],'jobs':len(queue),'statuses':counts,'excluded':len(excluded),'existing':len(already),'bytes':path.stat().st_size,'sha256':sha(path)}))

