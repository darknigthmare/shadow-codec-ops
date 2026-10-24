// Derive a pending Support selection from the actual Root-reviewed Core source union.
// No new Root approval, sprite bitmap, source frame or gameplay profile is authored here.
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
const R='@PROJECT_ROOT@',D=R+'/support-skull-debris-v1';
const sha=b=>createHash('sha256').update(b).digest('hex'),clone=x=>JSON.parse(JSON.stringify(x));
const pin=async(path,expected)=>{const b=await fs.readFile(path);if(expected)assert.equal(sha(b),expected);return{path,bytes:b.length,sha256:sha(b)}};
const sourceArtifactPath=R+'/integration-v2/core-supplements/v1/core-mode-proposal-v4/generated-real-candidate-v4/REAL_CORE_CANDIDATE_ARTIFACT_V4.json';
const sourceArtifact=JSON.parse(await fs.readFile(sourceArtifactPath,'utf8'));
const source=sourceArtifact.metadata,sourceReview=sourceArtifact.rootSelectionReview;
assert.equal(source.sha256,'921e188ec460e2eb75e1f5f3cecb3ee6ae53ea763a4bde1beaba2161dad6e009');
assert.equal(sourceReview.sha256,'cfa40249c6319c6f5f5fb89c3ce319dc72ab07d66079e302a54e36a7de085111');
await pin(source.path,source.sha256);await pin(sourceReview.path,sourceReview.sha256);
const baseIndex=await pin(R+'/integration-v2/cumulative-nineteen-qa/v1/compiled-immutable-v2/cqc-pass40-native-batch-index-v2.js','95d2d214211144cc93b21d8b37078692a010cff1cf670094ec64acbfa0917995');
const template=await pin(R+'/integration-v2/native-origins.template.js','ae75224e64f34a0c4018605096bde3b2f681f6f772f80f1740aede3caa32c7f2');
const job={schema:'cqc.p40.support-skull-mode-selection-job/1',status:'pending-fresh-Root-Support-mode-selection-review',uid:'core__skull_armor',id:'retro-msx',engine:'support',
 sourceCoreMetadata:source,sourceArtReview:sourceReview,sourceCoreArtifact:await pin(sourceArtifactPath),baseVSMetadataSHA256:'dcd22f4ce566206a4652b1cb0116aa26f50ed3601611e2e029e0a1c19d011a77',baseVSArtAuditSHA256:'0e1b65cd9f4bd374f540f5a5f6fb37a42d1d50918fc289769b82987d60b9c947',
 baseNineteenIndex:baseIndex,pureSourceTemplate:template,sourceBinding:clone(sourceArtifact.sourceBinding),additionalAssets:sourceArtifact.newSources.map(s=>({file:s.file,bytes:s.bytes,sha256:s.sha256,width:s.width,height:s.height,url:'https://raw.githubusercontent.com/darknigthmare/shadow-codec-ops/88cd2fb7511ea8f3995d14c3e72348f598818e3d/raw/'+s.sha256+'.png'})),
 selection:{slot:'special',tag:'debris',action:'deploy',physicalPoseIndex:11,socket:'hand-release',firingFace:1,ammoCost:1,cooldown:10,vx:17,damage:260,poweredDamage:360},
 qualifications:['Source pose, geometry, drawing and cfa402 art authority are reused unchanged.','Support input, costs, speed and damage retain the existing Support rules; they do not certify MGSV retail timing.','The new Support marker replaces the Core marker. It is not an assertion that Core mode data is already approved for Support.','Fresh Root review of this job and the derived metadata is required before a router can be built.'],productMutation:false,sourcePNGMutation:false};
await fs.mkdir(D,{recursive:true});const jobPath=D+'/JOB_SUPPORT_SKULL_SELECTION_CANDIDATE_V1.json',jobRaw=Buffer.from(JSON.stringify(job,null,2)+'\n');await fs.writeFile(jobPath,jobRaw,{flag:'wx'});
const prior=JSON.parse(await fs.readFile(source.path,'utf8')),made=clone(prior),oldMarker=clone(made.option.sprite.coreModeVariant);
assert.equal(prior.uid,job.uid);assert.equal(prior.id,job.id);assert.equal(prior.artAuditSHA256,sourceReview.sha256);assert.equal(oldMarker.engine,'core');
delete made.option.sprite.coreModeVariant;
made.option.sprite.supportModeVariant={schema:'cqc.p40.support-mode-native-supplement-variant/1',engine:'support',sourceCoreMetadataSHA256:source.sha256,sourceArtAuditSHA256:sourceReview.sha256,baseVSMetadataSHA256:job.baseVSMetadataSHA256,baseVSArtAuditSHA256:job.baseVSArtAuditSHA256,selectionJobSHA256:sha(jobRaw),selectedRoleReplacements:[11],inheritedSourceRolesPerFacing:15,sameSourceFramesAndPivots:true,sameNativeSourcePNGs:true,SupportProfilesChanged:false,canonicalFirearmClaim:false};
const undo=clone(made);delete undo.option.sprite.supportModeVariant;undo.option.sprite.coreModeVariant=oldMarker;assert.deepEqual(undo,prior);
const metadataPath=D+'/core__skull_armor--retro-msx--metadata-support-v1.json';await fs.writeFile(metadataPath,JSON.stringify(made)+'\n',{flag:'wx'});
const artifact={schema:'cqc.p40.pending-support-skull-source-selection/1',status:'pending-fresh-Root-mode-review; no runtime admission',job:await pin(jobPath),metadata:await pin(metadataPath),sourceCoreMetadata:source,sourceArtReview:sourceReview,baseNineteenIndex:baseIndex,pureSourceTemplate:template,sourceBinding:job.sourceBinding,additionalAssets:job.additionalAssets,allSourceDataUndoDeepEqual:true,rootSupportSelectionReview:null,productMutation:false,PNGMutation:false};
await fs.writeFile(D+'/SOURCE_SELECTION_CANDIDATE_ARTIFACT_V1.json',JSON.stringify(artifact,null,2)+'\n',{flag:'wx'});console.log(JSON.stringify({job:artifact.job,metadata:artifact.metadata,rootModeReviewRequired:true,sourceDataUnchanged:true}));
