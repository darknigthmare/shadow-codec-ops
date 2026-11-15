'use strict';
const fs = require('node:fs');
const assert = require('node:assert/strict');
const api = require('/workspace/cqc-pass9-stage-preparation/cqc-stage-layers.candidate.js');
const rows = JSON.parse(fs.readFileSync('/workspace/cqc-pass9-stage-preparation/THREE_STAGE_OVERLAY.json', 'utf8')).rows;
const results = [];
const copy = value => JSON.parse(JSON.stringify(value));
function check(name, callback) {
  try { callback(); results.push({name,passed:true}); }
  catch (error) {results.push({name,passed:false,error:error.message});}
}
for (const row of rows) check('valid_actual_overlay/' + row.id, () => assert.deepEqual(api.validateStage(row.afterStage), []));
const outer = rows.find(row => row.id === 'outer_heaven').afterStage;
const arsenal = rows.find(row => row.id === 'arsenal_corridor').afterStage;
function corrupt(name, mutate, expression = /Local luminance|Four bounded/) {
  check(name, () => {
    const candidate = copy(outer);
    const layer = candidate.layers.find(item => item.id === 'architecture');
    mutate(candidate, layer, layer.localLuminance);
    assert.match(api.validateStage(candidate).join(' '), expression);
  });
}
corrupt('red_over_stage_cap', (_s,_l,g) => {g.maximumDimmingFraction = .020001;});
check('cyan_over_stage_cap', () => {
  const candidate = copy(arsenal);
  candidate.layers.find(item => item.id === 'architecture').localLuminance.maximumDimmingFraction = .030001;
  assert.match(api.validateStage(candidate).join(' '), /stage-specific dimming limit/);
});
corrupt('changed_anchor_sha', (_s,_l,g) => {g.anchorSha256 = '0'.repeat(64);});
corrupt('wrong_native_color', (_s,_l,g) => {g.maskColor = 'cyan';});
corrupt('wrong_operation', (_s,_l,g) => {g.operation = 'new_glowing_halo';});
corrupt('unproven_timing_claim', (_s,_l,g) => {g.sourceCanonicalTiming = true;});
corrupt('structural_drift', (_s,l) => {l.motion = {xAmplitude:1};});
corrupt('fractional_native_crop', (_s,_l,g) => {g.sourcePixelRegions[0].x += .5;});
corrupt('native_crop_outside_source', (_s,l,g) => {g.sourcePixelRegions[0].x = l.width;});
corrupt('duplicate_native_crop_rejected', (_s,_l,g) => {g.sourcePixelRegions[1] = copy(g.sourcePixelRegions[0]);}, /must not overlap/);
corrupt('intersecting_native_crop_rejected', (_s,_l,g) => {g.sourcePixelRegions[1] = {...g.sourcePixelRegions[0], x:g.sourcePixelRegions[0].x+1};}, /must not overlap/);
corrupt('missing_period_rejected', (_s,_l,g) => {g.authoredPeriodSeconds.pop();});
corrupt('negative_period_rejected', (_s,_l,g) => {g.authoredPeriodSeconds[0] = -4;});
check('zanzibar_cannot_enable_luminance', () => {
  const z = copy(rows.find(row => row.id === 'zanzibar').afterStage);
  z.layers.find(item => item.id === 'architecture').localLuminance = copy(outer.layers.find(item => item.id === 'architecture').localLuminance);
  assert.match(api.validateStage(z).join(' '), /reviewed, frozen architecture anchor/);
});
check('zanzibar_has_no_runtime_luminance_metadata', () => {
  const z = rows.find(row => row.id === 'zanzibar').afterStage;
  assert.ok(z.layers.every(layer => !Object.hasOwn(layer, 'localLuminance')));
  assert.equal(z.review.localLuminanceDecision.enabled, false);
  assert.equal(z.review.localLuminanceDecision.policy, 'static');
});
check('edge_touching_native_rectangles_remain_valid', () => {
  const candidate = copy(outer), g = candidate.layers.find(item => item.id === 'architecture').localLuminance;
  g.sourcePixelRegions[1] = {...g.sourcePixelRegions[0],x:g.sourcePixelRegions[0].x+g.sourcePixelRegions[0].width};
  assert.deepEqual(api.validateStage(candidate), []);
});
const report = {schema:'cqc.pass9.independent-stage-validation-guards/1',scope:'Synthetic malformed-metadata validation against isolated final candidate; no browser/raster inference.',tests:results.length,failed:results.filter(item => !item.passed).length,results};
process.stdout.write(JSON.stringify(report,null,2)+'\n');
process.exitCode = report.failed ? 1 : 0;
