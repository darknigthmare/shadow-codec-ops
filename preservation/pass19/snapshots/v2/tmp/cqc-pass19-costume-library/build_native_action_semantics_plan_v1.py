#!/usr/bin/env python3
"""Retain reviewed source action semantics after independent costume atlas generation."""
from pathlib import Path
import json,hashlib,datetime
ROOT=Path('/tmp/cqc-pass19-costume-library');p=Path('/tmp/cqc-pass19-application/public/cqc/src/cqc-sprite-renderer.js');source=p.read_bytes();text=source.decode()
helper="""  function hasNativeActionSemantics(entry) {
    const nativeFile=value=>value?.actions?.idle?.frames?.[0]?.file?.startsWith('assets/combat-sprites-pass18/')===true;
    if(nativeFile(entry))return true;
    const concept=entry?.costumeConcept;
    if(concept?.schema!=='cqc.costume-design/1'||concept.sourceUID!==entry.uid)return false;
    const source=entries.get(concept.sourceUID);
    if(!source||source===entry||!nativeFile(source))return false;
    // The approved source body owns the semantics; an atlas folder never changes its moves.
    return Object.entries(source.actionMap||{}).every(([key,value])=>entry.actionMap?.[key]===value)
      &&Object.keys(source.actions||{}).every(action=>entry.actions?.[action]?.frames?.length>0);
  }

"""
ops=[{'id':'native-action-semantics-from-reviewed-ancestry','before':'  function actionName(pose = {}, entry = null) {','after':helper+'  function actionName(pose = {}, entry = null) {','count':1},
{'id':'native-routes-use-source-semantics','before':"entry.actions.idle.frames[0].file.startsWith('assets/combat-sprites-pass18/')",'after':'hasNativeActionSemantics(entry)','count':2}]
for op in ops:
    assert text.count(op['before'])==op['count'],(op['id'],text.count(op['before']))
    text=text.replace(op['before'],op['after'])
data=text.encode();candidate=ROOT/'cqc-sprite-renderer-native-costume-semantics-v1.js'
with candidate.open('xb')as f:f.write(data)
candidate.chmod(0o400)
sha=lambda value:hashlib.sha256(value).hexdigest()
plan={'schema':'cqc.source-preconditioned-plan/1','status':'reviewable-plan-no-APP-mutation','createdAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'renderer':{'path':'src/cqc-sprite-renderer.js','expectedSHA256':sha(source),'resultSHA256':sha(data),'candidate':str(candidate),'replacements':ops},'scope':'Only native action resolution changed. New independent costume PNGs inherit getup/roll and actual moveKind/tag routes from the accepted sourceUID and unchanged actionMap/retained action groups. Unknown ancestry and remapped actionMap keep legacy mapping. No physics, image, geometry, phase map or palette mutation.'}
target=ROOT/'NATIVE_ACTION_SEMANTICS_PRECONDITION_PLAN_V1.json'
with target.open('xb')as f:f.write((json.dumps(plan,ensure_ascii=False,indent=2)+'\n').encode())
target.chmod(0o400);print(json.dumps({'path':str(target),'sourceSHA256':sha(source),'resultSHA256':sha(data)}))
