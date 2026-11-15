'use strict';
// Read-only dependency substitution: execute the existing suite against an isolated candidate.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const Module = require('node:module');
const originalTest = '/workspace/cqc-game-working/cqc-versus-v056/tests/test_stage_layers_reprise.cjs';
const candidate = process.env.CQC_ISOLATED_STAGE_RENDERER;
if (!candidate || !path.isAbsolute(candidate)) throw new Error('CQC_ISOLATED_STAGE_RENDERER must name an absolute isolated candidate.');
const candidateReal = fs.realpathSync(candidate);
if (!candidateReal.startsWith('/workspace/cqc-pass9-stage-preparation/')) throw new Error('Candidate must stay in its isolated preparation directory.');
const nativeRequire = Module.createRequire(originalTest);
const rendererRequest = '../src/cqc-stage-layers.js';
function candidateRequire(request) {
  return nativeRequire(request === rendererRequest ? candidateReal : request);
}
candidateRequire.resolve = request => request === rendererRequest ? candidateReal : nativeRequire.resolve(request);
const code = fs.readFileSync(originalTest, 'utf8');
const wrapper = vm.runInThisContext(Module.wrap(code), {filename: originalTest});
const sandboxModule = {exports:{}};
wrapper(sandboxModule.exports, candidateRequire, sandboxModule, originalTest, path.dirname(originalTest));
