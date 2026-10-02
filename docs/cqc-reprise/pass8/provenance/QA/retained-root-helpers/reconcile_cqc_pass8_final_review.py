import hashlib, json, pathlib, sys

R = pathlib.Path('/workspace/cqc-game-working/cqc-versus-v056')
sys.path.insert(0, str(R / 'tools'))
from assemble_reviewed_combat_sprite_pass8 import assemble, write_json
from prepare_combat_sprite import import_sprite

def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()

revision = R / 'preparation/reprise-pass8-provenance/final-revisions/raven-super-and-wolf-approval'
revision.mkdir(parents=True, exist_ok=True)
helper = R / 'src/cqc-pass8-combat-fidelity.js'
before = helper.read_bytes()
assert sha(helper) == 'af729ab492f0f54439a0cbdc9ec48e32847bfa45e0a2485e06d2cf9d17f1c913'
assert helper.stat().st_nlink == 1
saved = revision / ('cqc-pass8-combat-fidelity.before-' + sha(helper) + '.js')
with saved.open('xb') as f: f.write(before)
anchor = b"      }else if(uid==='core__raging_raven'){\n"
assert before.count(anchor) == 1
after = before.replace(anchor, anchor + b"        m.super={...m.super,speed:9}; // Bounded grenade arc reaches its fuse before arena cleanup.\n")
helper.write_bytes(after)

uid = 'core__crying_wolf'
prep = R / 'preparation/combat-sprites-pass8' / uid
old = json.loads((prep / 'INTEGRATOR_VISUAL_REVIEW.json').read_text())
observed = json.loads(json.dumps(old))
observed['actionMapOverrides']['specialDown'] = 'heavy'
observed_path = revision / 'WOLF_REVIEWED_NATIVE_BODY_CHARGE.json'
write_json(observed_path, observed)
delivery = pathlib.Path('/workspace/cqc-pass8-generation/crying-wolf/armor/FINAL_DELIVERY.json')
catalog = R / 'data/combat-sprite-catalog-v1.json'
catalog_sha = sha(catalog)
browser_catalog = R / 'src/cqc-sprite-catalog.js'
browser_catalog_sha = sha(browser_catalog)
assembled = assemble(R, delivery, observed_path)
document = json.loads(pathlib.Path(assembled['review']).read_text())
assert document['entry'] == json.loads(catalog.read_text())['entries'][uid]
dry = import_sprite(R, document, True, R / 'preparation/combat-sprites-pass8/approved-reviews')
approved = R / 'preparation/combat-sprites-pass8/approved-reviews' / (uid + '.json')
assert approved.stat().st_nlink == 1
write_json(approved, document)
assert sha(catalog) == catalog_sha and sha(browser_catalog) == browser_catalog_sha
receipt = {
    'schema': 'cqc.pass8.root-final-source-revision/1',
    'reviewer': 'root / original refs and all six full native sheets physically viewed',
    'raven': {'before': str(saved), 'beforeSha256': hashlib.sha256(before).hexdigest(),
              'afterSha256': sha(helper), 'onlyChange': 'scoped super grenade speed 21 to 9',
              'reason': 'actual engine destroyed all three grenades at the arena boundary before fuse 48; speed 9 keeps native muzzle landmarks unchanged and permits the real fuse/explosion',
              'independentCandidateProof': '/workspace/cqc-pass8-independent-gameplay-review/verified-final-origins/run-03/CANDIDATE_SPEED9_ISOLATED_PROOF.json',
              'adaptation': True, 'automaticAimAdded': False},
    'wolf': {'onlyChange': 'active final approval documents now agree with already reviewed catalog specialDown heavy body charge',
             'assembler': assembled, 'unchangedCatalogSha256': catalog_sha,
             'unchangedBrowserCatalogSha256': browser_catalog_sha, 'dryRun': dry,
             'originalProducerDeliveryUnchanged': True, 'sourcePNGsUnchanged': True},
    'oldRawInlineEngineUnchanged': True, 'absolute1to1Certified': False,
}
write_json(revision / 'ROOT_RECONCILIATION_RECEIPT.json', receipt)
prior = pathlib.Path('/workspace/cqc-pass8-source-freeze-39-rev2.json')
freeze = json.loads(prior.read_text())
freeze.update(revision=3, supersedes=str(prior), revisionReview=str(revision / 'ROOT_RECONCILIATION_RECEIPT.json'))
for row in freeze['files']:
    p = pathlib.Path(row['path'])
    row.update(sha256=sha(p), bytes=p.stat().st_size)
target = pathlib.Path('/workspace/cqc-pass8-source-freeze-39-rev3.json')
with target.open('x') as f: f.write(json.dumps(freeze, ensure_ascii=False, indent=2) + '\n')
print(json.dumps({'freeze': str(target), 'freezeSha256': sha(target), 'helperSha256': sha(helper), 'catalogSha256': catalog_sha, 'wolfApprovalReconciled': True}))
