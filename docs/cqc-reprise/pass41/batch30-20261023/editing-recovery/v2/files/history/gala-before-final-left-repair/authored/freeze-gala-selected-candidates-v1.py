"""Freeze source ownership and select independently drawn native role candidates.

No Root approval is created; no raster or product file is edited. Existing
frozen files are verified, never overwritten. A held source is never selected.
"""
from pathlib import Path
import json, hashlib

R = Path('@PROJECT_ROOT@')
NAMES = ['idle','guard','walkA','walkB','crouch','jump','punch','low','throw','deploy','heavy','special','recover','hit','KO','roll']
PURE = {'roster50__mei_mgs1','roster50__nastasha_mgs1','roster50__rose_mgs2','roster50__otacon_mgs4'}
READY = ['roster50__campbell_mg2','roster50__campbell_mgs1','roster50__mei_mgs1','roster50__nastasha_mgs1','roster50__rose_mgs2','roster50__campbell_mgs4','roster50__otacon_mgs4','archive__holly_white']
out = []
for uid in READY:
    d = R/'art'/uid/'tuxedo'
    frozen = d/'ownership-frozen-v1.json'
    if not frozen.exists():
        frozen.write_bytes((d/'ownership-candidate-v1.json').read_bytes())
    b = json.loads(frozen.read_text())
    assert b['approved'] is False and b['runtimeAdmitted'] is False
    poses = {p['name']: p for s in b['sources'] for p in s['poses']}
    selected = {}
    for side in ['right','left']:
        selected[side] = {}
        for role in range(16):
            base = 'right-v1' if side=='right' else 'left-v2'
            if uid in PURE and role in [0,3,12,15]:
                base = side+'-body-supplement-v1'
            elif uid not in PURE and role in [3,9,11,12]:
                base = side+'-weapon-supplement-v1'
            if uid=='roster50__campbell_mgs4' and side=='right' and role in [0,8,15]:
                base = 'right-body-supplement-v1'
            name = side+'-'+base+'-'+NAMES[role]
            assert name in poses, (uid, name)
            assert not poses[name]['holdReasons'], (uid, name, poses[name]['holdReasons'])
            selected[side][str(role)] = name
        assert len(set(selected[side].values())) == 16
    plan = {'schema':'cqc.p41.selected-native-role-names-candidate/1','uid':uid,'id':'tuxedo','approved':False,'runtimeAdmitted':False,'ownershipBook':{'path':str(frozen),'sha256':hashlib.sha256(frozen.read_bytes()).hexdigest()},'selected':selected,'note':'For ballistic actors extra unarmed body11 remains available for CQC charge; keep firearm shoot role11 separate from body special11.'}
    q = d/'selected-body-roles-candidate-v1.json'
    raw = (json.dumps(plan,ensure_ascii=False,indent=2)+'\n').encode()
    if q.exists():
        assert q.read_bytes()==raw, ('Existing selection would change',uid)
    else:
        q.write_bytes(raw)
    out.append({'uid':uid,'book':str(frozen),'bookSha256':hashlib.sha256(frozen.read_bytes()).hexdigest(),'selection':str(q),'selectionSha256':hashlib.sha256(q.read_bytes()).hexdigest(),'selectedPhysicalDrawings':32,'approved':False,'runtimeAdmitted':False})
report = R/'authored/EIGHT_FROZEN_SOURCE_BOOKS_CANDIDATE_V1.json'
report.write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(out))
