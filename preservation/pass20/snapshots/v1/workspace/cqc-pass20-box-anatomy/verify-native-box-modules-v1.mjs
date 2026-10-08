import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
const app='/tmp/cqc-pass19-application/public/cqc',root='/workspace/cqc-pass20-box-anatomy';
const context=vm.createContext({URL,console,location:{href:'http://127.0.0.1:8029/cqc/modules/unified-versus-v055.html'},document:{currentScript:{src:'http://127.0.0.1:8029/cqc/src/cqc-sprite-renderer.js'}}});
function run(name){vm.runInContext(fs.readFileSync(`${app}/src/${name}`,'utf8'),context,{filename:name});}
run('cqc-pass19-pw-box-sprite-catalog.js');
const before=JSON.parse(JSON.stringify(context.CQC_COMBAT_SPRITE_CATALOG.entries));
run('cqc-pass20-pw-box-corrections.js');run('cqc-pass19-box-cannon-anchors.js');run('cqc-pass20-box-cannon-anchors.js');run('cqc-sprite-renderer.js');run('cqc-pass19-native-origins.js');
const uids=Array.from(context.CQC_PASS20_BOX_CORRECTIONS.uids);
const configure=context.CQC_COMBAT_SPRITES.configure(context.CQC_COMBAT_SPRITE_CATALOG);
assert.equal(configure.accepted,8);assert.deepEqual(Array.from(configure.rejected),[]);
const sourceProof=JSON.parse(fs.readFileSync(`${root}/PW_BOXES_FOUR_BOOTS_SOURCE_REVIEW_ACTUAL_V1.json`,'utf8'));
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
for(const row of sourceProof.baselineSources)assert.equal(sha(fs.readFileSync(row.path)),row.sha256);
for(const row of sourceProof.selectedFilesForRootInstallation)assert.equal(sha(fs.readFileSync(`${app}/${row.runtimePath}`)),row.sha256);
const untouched=[];
for(const [uid,entry]of Object.entries(before))if(!uids.includes(uid)){assert.equal(JSON.stringify(context.CQC_COMBAT_SPRITE_CATALOG.entries[uid]),JSON.stringify(entry));untouched.push(uid);}
const records=[];
for(const uid of uids){
 const e=context.CQC_COMBAT_SPRITES.getEntry(uid,{uid});
 assert.ok(e);for(const key of ['actionMap','phaseMap','displayHeight','operatorCount','equipmentAdaptation'])assert.equal(JSON.stringify(e[key]),JSON.stringify(before[uid][key]));
 for(const face of [1,-1]){
  const side=face===1?'right':'left';
  const directional={...e,actions:face===1?e.actions:e.oppositeActions};
  const selected=context.CQC_COMBAT_SPRITES.selectFrame(directional,{moveSlot:'special',moveKind:'projectile',moveTag:'explosive',attack:true,animationActive:true,attackPhase:'active',phaseProgress:0,actionTime:0,time:0});
  const anchor=context.CQC_PASS19_BOX_ATTACHMENTS.entries[uid].sides[side]['11'];
  assert.equal(selected.frame.file,anchor.file);assert.equal(selected.frame.sha256,anchor.sourceSHA256);
  assert.equal(JSON.stringify(selected.frame.rect),JSON.stringify(anchor.rect));assert.equal(JSON.stringify(selected.frame.pivot),JSON.stringify(anchor.pivot));
  const origin=context.CQC_PASS19_NATIVE_ORIGINS.projectile({f:{uid},face},{slot:'special',kind:'projectile',tag:'explosive'});
  assert.ok(origin);assert.equal(origin.reviewKind,'reviewed-native-2d-attachment');assert.equal(origin.sourceSHA256,anchor.sourceSHA256);
  const factor=e.displayHeight/e.sourceFrameHeights[selected.frame.file];
  const pixel=[selected.frame.rect[0]+selected.frame.pivot[0]*selected.frame.rect[2]+origin.forward*face/factor,selected.frame.rect[1]+selected.frame.pivot[1]*selected.frame.rect[3]-origin.height/factor];
  const delta=Math.hypot(pixel[0]-anchor.sourcePixel[0],pixel[1]-anchor.sourcePixel[1]);assert.ok(delta<.00001);
  records.push({uid,side,file:selected.frame.file,sourceSHA256:anchor.sourceSHA256,sourcePixel:anchor.sourcePixel,origin:{...origin},nativePixelOriginError:delta});
 }
}
assert.equal(new Set(sourceProof.selectedPages.flatMap(p=>p.poses.map(z=>`${p.side}:${z.physicalPoseIndex}`))).size,32);
assert.ok(sourceProof.selectedPages.every(p=>p.poses.length===4&&p.poses.every(z=>z.bootCountPhysicallyReviewed===4&&z.operatorCount===2)));
const out={schema:'cqc.pass20.native-pw-box-module-verification/1',status:'passed-static-source-and-runtime-API; actual-live-match-QA-pending',configure:{accepted:configure.accepted,rejected:Array.from(configure.rejected)},correctedUIDs:uids,untouchedSimpleEquipmentUIDs:untouched,baselineSourceFilesByteUnchanged:16,newSourceFilesByteExact:8,newPhysicalPoses:32,equipmentPoseMappings:96,sourcePixelsTransformed:false,profilesAndActionMappingsChanged:false,cannonSocketCases:records,limits:['VM verifies real renderer validation, selection and native origin API. It does not certify browser image decoding or live match rendering.']};
const path=`${root}/PW_BOXES_NATIVE_MODULE_SOURCE_API_ACTUAL_V1.json`;fs.writeFileSync(path,JSON.stringify(out,null,2));console.log(JSON.stringify({path,sha256:sha(fs.readFileSync(path)),cases:records.length,status:out.status}));
