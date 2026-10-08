from pathlib import Path
import json
base=Path('/tmp/cqc-pass19-gekko-generation')
geometry=json.loads((base/'qa/NATIVE_GEOMETRY_ANALYSIS_V1.json').read_text())
definitions={
 'gekko-suicide-mgs4-left-parts-v1.png':('pass19__gekko_suicide_mgs4',{'upper-hull':2,'optic-dome':1,'pelvis':4,'side-cover':3,'near-upper-leg':8,'near-lower-leg':9,'near-split-hoof':11,'near-hip-cover':10,'far-upper-leg':19,'far-lower-leg':20,'far-split-hoof':24,'far-hip-cover':21,'hatch-closed':35,'hatch-open':34,'optic-lens':32,'lower-connector':33}),
 'gekko-missile-mgs4-left-parts-v1.png':('pass19__gekko_missile_mgs4',{'upper-hull':1,'optic-dome':13,'pelvis':5,'upper-machinegun':9,'near-upper-leg':24,'near-lower-leg':25,'near-split-hoof':32,'near-hip-cover':26,'far-upper-leg':71,'far-lower-leg':72,'far-split-hoof':80,'far-hip-cover':78,'paired-missile-pod':130,'missile-attachment':133,'side-cover':134,'missile-authored-projectile':137}),
 'gekko-mgr-left-parts-v1.png':('pass19__gekko_mgr',{'upper-hull':1,'optic-dome':16,'pelvis':14,'upper-machinegun':10,'near-upper-leg':29,'near-lower-leg':30,'near-split-hoof':36,'near-hip-cover':37,'far-upper-leg':74,'far-lower-leg':75,'far-split-hoof':90,'far-hip-cover':78,'side-cover':129,'hatch-open':132,'hatch-closed':134,'lower-connector':131}),
 'trenchcoat-mgs4-left-parts-v2.png':('pass19__dwarf_gekko_trenchcoat_mgs4',{'fedora':16,'coat-closed-sleeveless':1,'coat-open-sleeveless':2,'upper-unit-sphere':12,'middle-unit-sphere':48,'lower-unit-sphere':49,'near-coat-upper-sleeve':50,'near-coat-forearm-sleeve':53,'near-mechanical-hand':78,'far-coat-upper-sleeve':75,'far-coat-forearm-sleeve':77,'far-mechanical-hand':79,'near-arm-as-leg-upper':145,'near-arm-as-leg-forearm-with-hand-foot':146,'far-arm-as-leg-upper':147,'far-arm-as-leg-forearm-with-hand-foot':153}),
 'double-tripod-mgr-left-parts-v1.png':('pass19__dwarf_gekko_humanoid_mgr',{'upper-unit-sphere':4,'lower-unit-sphere':6,'upper-optic':11,'lower-optic':12,'upper-left-arm':30,'upper-left-forearm':31,'upper-left-hand':32,'upper-right-arm':29,'upper-right-forearm':62,'upper-right-hand':66,'upper-third-stowed-arm':65,'lower-third-connector-upper':61,'lower-third-connector-forearm':103,'lower-third-connector-hand':104,'lower-left-arm-as-leg-upper':105,'lower-left-arm-as-leg-forearm':106,'lower-left-hand-foot':147,'lower-right-arm-as-leg-upper':143,'lower-right-arm-as-leg-forearm':144,'lower-right-hand-foot':145})
}
out=[]
for geo in geometry:
    if geo['file'] not in definitions: continue
    uid,mapping=definitions[geo['file']]
    labels={p['label']:p for p in geo['parts']}
    assert len(set(mapping.values()))==len(mapping)
    assert set(mapping.values())==set(labels)
    parts=[]
    for semantic,label in mapping.items():
        part=dict(labels[label]);part['id']=semantic
        # Pivot is only a geometry center proposal, NOT an attested joint anchor.
        part['geometricCenterProposal']=part.pop('center')
        part['jointPivotValidated']=False
        part['pixelTransform']='none'
        parts.append(part)
    out.append({'uid':uid,'sourcePath':str(base/'native-originals'/geo['file']),'sourceSha256':geo['sha256'],'sourceBytes':geo['bytes'],'width':geo['width'],'height':geo['height'],'alphaZeroPercent':geo['alphaZeroPercent'],'facingQualification':'source camera left-facing side-oblique; independent right-side artwork not yet generated','sourcePixelEditingPerformed':False,'assembledRigValidated':False,'absolute1to1Certified':False,'parts':parts})
(base/'NATIVE_SEMANTIC_SOURCE_CATALOG_V1.json').write_text(json.dumps({'schema':'cqc.pass19.native-source-catalog.v1','pixelPolicy':'Every PNG is an exact copy of native imagegen output; this file supplies read-only native crop/clip metadata. It does not certify rig pivots, hidden anatomy, opposite facing or absolute 1:1 fidelity.','sources':out},indent=2)+'\n')
print(json.dumps({'sources':len(out),'parts':sum(len(r['parts']) for r in out),'output':str(base/'NATIVE_SEMANTIC_SOURCE_CATALOG_V1.json')}))
