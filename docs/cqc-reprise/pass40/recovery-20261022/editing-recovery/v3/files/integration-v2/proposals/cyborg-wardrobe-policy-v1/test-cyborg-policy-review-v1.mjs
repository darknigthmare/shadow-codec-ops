import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {reviewedCyborgPolicy} from '../../compile-native-batch-cyborg-policy-proposed-v1.mjs';
const base='@PROJECT_ROOT@/integration-v2/',clone=x=>JSON.parse(JSON.stringify(x)),rows=[];
const job=JSON.parse(fs.readFileSync(base+'quiet-cyborg/v1/JOB_CANDIDATE_V7.json','utf8'));
const audit={checks:{MGRDesignReviewed:true,fullCyberneticBodyReviewed:true,personalizedDesignReviewed:true}};
const fixture=vm.createContext({});
vm.runInContext(fs.readFileSync('@APP_ROOT@/public/cqc/src/cqc-pass21-wardrobe-policy.js','utf8'),fixture);
function checked(label,j,a,throws=false){if(throws)assert.throws(()=>reviewedCyborgPolicy(j,a));else assert.deepEqual(reviewedCyborgPolicy(j,a),j.family==='cyborg'?audit.checks:{});rows.push({label,passed:true,syntheticFixture:true});}
checked('All exact declared full-body criteria and explicit Root checks accepted',job,audit);
for(const key of ['artDirection','anatomy','cyberneticBody'])for(const value of [undefined,false,'wrong']){const j=clone(job);if(value===undefined)delete j.concept[key];else j.concept[key]=value;checked('Reject invalid concept '+key+' '+String(value),j,audit,true);}
for(const value of [undefined,[],['one'],['one',' '],['one',2]]){const j=clone(job);if(value===undefined)delete j.concept.identityCodes;else j.concept.identityCodes=value;checked('Reject missing or invalid personalized identity '+JSON.stringify(value),j,audit,true);}
for(const key of Object.keys(audit.checks))for(const value of [undefined,false,'true']){const a=clone(audit);if(value===undefined)delete a.checks[key];else a.checks[key]=value;checked('Reject missing/false/nonboolean Root '+key+' '+String(value),job,a,true);}
for(const family of ['canonical','nextgen','retro','tuxedo','metalgear','survive'])checked('Non-cyborg review fields absent without metadata additions '+family,{family},{});
const option={id:job.id,family:job.family,provenance:clone(job.provenance),sprite:{uid:job.uid,costumeConcept:clone(job.concept)},assetReview:{status:'verified',independentArt:true,...reviewedCyborgPolicy(job,audit)}};
assert.equal(fixture.CQC_PASS21_WARDROBE_POLICY.cyborgReason(job.uid,option),null);rows.push({label:'Same synthetic compiled option passes the actual unchanged product policy',passed:true,syntheticFixture:true});
const old={...clone(option),sprite:{uid:job.uid,costumeConcept:{description:job.concept.description}}};assert.equal(fixture.CQC_PASS21_WARDROBE_POLICY.cyborgReason(job.uid,old),'full-MGR-cybernetic-body-required');rows.push({label:'Existing incomplete concept reproduces actual rejection',passed:true,syntheticFixture:true});
for(const key of Object.keys(audit.checks)){const o=clone(option);delete o.assetReview[key];assert.equal(fixture.CQC_PASS21_WARDROBE_POLICY.cyborgReason(job.uid,o),'physical-MGR-body-and-personality-review-required');rows.push({label:'Actual unchanged policy still rejects missing '+key,passed:true,syntheticFixture:true});}
const result={schema:'cqc.p40.cyborg-policy-synthetic-fixtures/1',passed:rows.length,actualSourceArtApprovedByThisScript:false,actualQuietGameplayClaimed:false,productMutations:false,rows};
fs.writeFileSync(new URL('./CYBORG_POLICY_FIXTURE_RESULTS_ACTUAL_V1.json',import.meta.url),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify({passed:rows.length,syntheticOnly:true}));
