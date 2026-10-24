// The caller must supply exact pins of an actual fresh Root Support mode review.
// This builder writes only a new private generated folder, never application files.
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {extractCompiledPayload} from '../integration-v2/compile-native-batch.mjs';
import {makeSupportModeRuntime} from './make-support-mode-runtime-v1.mjs';
const D='@PROJECT_ROOT@/support-skull-debris-v1',sha=b=>createHash('sha256').update(b).digest('hex');
async function pinned(pin){if(!pin||typeof pin.path!=='string'||!Number.isInteger(pin.bytes)||!/^[a-f0-9]{64}$/.test(pin.sha256||''))throw Error('Complete exact file pin required');const stat=await fs.lstat(pin.path);assert(stat.isFile()&&!stat.isSymbolicLink());const raw=await fs.readFile(pin.path);assert.equal(raw.length,pin.bytes);assert.equal(sha(raw),pin.sha256);return raw;}
const cfg=JSON.parse(await fs.readFile(process.argv[2],'utf8'));assert.equal(cfg.schema,'cqc.p40.build-reviewed-support-skull-runtime/1');
assert(cfg.output?.startsWith(D+'/generated-')&&!cfg.output.includes('/../')&&cfg.output.slice(D.length+1).split('/').length===1,'Fresh owned private output folder required');
const artifact=JSON.parse(await pinned(cfg.artifact)),reviewRaw=await pinned(cfg.rootModeReview),review=JSON.parse(reviewRaw);
const job=JSON.parse(await pinned(artifact.job)),metadataRaw=await pinned(artifact.metadata),metadata=JSON.parse(metadataRaw),index=await pinned(artifact.baseNineteenIndex),template=await pinned(artifact.pureSourceTemplate);
assert.equal(artifact.baseNineteenIndex.sha256,'95d2d214211144cc93b21d8b37078692a010cff1cf670094ec64acbfa0917995');assert.equal(artifact.pureSourceTemplate.sha256,'ae75224e64f34a0c4018605096bde3b2f681f6f772f80f1740aede3caa32c7f2');
await pinned(artifact.sourceCoreMetadata);await pinned(artifact.sourceArtReview);
assert.deepEqual(artifact.sourceBinding,job.sourceBinding);assert.deepEqual(artifact.additionalAssets,job.additionalAssets);assert.equal(metadata.option.sprite.supportModeVariant.selectionJobSHA256,artifact.job.sha256);
const payload=extractCompiledPayload(index.toString()),made=makeSupportModeRuntime({artifact,review,reviewSHA256:sha(reviewRaw),template:template.toString(),baseBindings:payload.bindings,supportMetadata:metadata,metadataCommit:cfg.metadataCommit??null});
// Every source and fresh review has been validated before the first output write.
await fs.mkdir(cfg.output,{recursive:false});
const runtime=cfg.output+'/cqc-pass40-support-skull-mode-v1.js';await fs.writeFile(runtime,made.code,{flag:'wx'});
const receipt={schema:'cqc.p40.root-reviewed-support-skull-runtime-candidate/1',runtime:{path:runtime,bytes:Buffer.byteLength(made.code),sha256:sha(made.code)},artifact:cfg.artifact,modeReview:cfg.rootModeReview,metadata:artifact.metadata,metadataCommit:cfg.metadataCommit??null,sdkTemplateSHA256:made.sdkTemplateSHA256,otherEighteenBindingsUnchanged:true,productMutations:false,actualSupportQAPending:true};
await fs.writeFile(cfg.output+'/GENERATED_RUNTIME_CANDIDATE_RECEIPT_V1.json',JSON.stringify(receipt,null,2)+'\n',{flag:'wx'});console.log(JSON.stringify(receipt));
