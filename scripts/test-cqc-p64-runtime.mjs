import test, {after} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp, mkdir, writeFile, readFile, rm} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';
import {P63_COMMIT, ATLAS_PATH, validateP64AtlasExtension, verifyP64RuntimeExtension, extendP64RuntimeManifest} from './extend-cqc-p64-runtime.mjs';
import {verifyStaticPng} from './check-cqc-p64.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pinned = name => JSON.parse(execFileSync('git',['show',P63_COMMIT+':'+name],{cwd:root,maxBuffer:4*1024*1024}));
const base = pinned('public/cqc/runtime-manifest.json');
const baseAtlas = pinned('public/cqc/' + ATLAS_PATH);
const png = await readFile(path.join(root,'public/cqc/assets/p64/acid-flemming-decoy.png'));
const metadata = bytes => ({bytes:bytes.length,width:bytes.readUInt32BE(16),height:bytes.readUInt32BE(20),
  sha256:createHash('sha256').update(bytes).digest('hex'),gitBlobSha:createHash('sha1').update('blob '+bytes.length+'\0').update(bytes).digest('hex')});
const asset = {id:'acid-flemming-decoy',label:'Faux Flemming',episode:'AC!D',kind:'character',path:'../assets/p64/acid-flemming-decoy.png',
  sourceGenerated:true,selected:true,atlasIntegrated:true,combatReady:false,combatRuntimeIntegrated:false,absolute1to1Certified:false,...metadata(png)};
const catalog = {...baseAtlas,assets:[...baseAtlas.assets,asset]};
const runtimePath = asset.path.slice(3);
const fixture = await mkdtemp(path.join(tmpdir(),'cqc-p64-runtime-test-'));
after(async () => rm(fixture,{recursive:true,force:true}));
await mkdir(path.join(fixture,'data'),{recursive:true});
await mkdir(path.join(fixture,'assets/p64'),{recursive:true});
await writeFile(path.join(fixture,runtimePath),png); // real selected PNG; no placeholder imagery
await writeFile(path.join(fixture,ATLAS_PATH),JSON.stringify(catalog));
const proposed = await extendP64RuntimeManifest(base,fixture,baseAtlas);

test('new catalogue and one real PNG extend the runtime without reading absent legacy files',() => {
  const proof = verifyP64RuntimeExtension(base,proposed,[runtimePath]);
  assert.equal(proof.files,3031); assert.equal(proof.references,4967);
  assert.equal(proof.unchangedRows,3029); assert.equal(proof.preservedReferences,4966);
  assert.equal(proof.externalRoutes,499); assert.equal(proof.omittedReferences,740);
  assert.equal(proposed.files.find(row=>row.path===runtimePath).sha256,asset.sha256);
});
test('the old 17 catalogue entries cannot be edited, removed or reordered',() => {
  const changed = structuredClone(catalog); changed.assets[0].label += ' changed';
  assert.throws(()=>validateP64AtlasExtension(baseAtlas,changed));
  const removed = structuredClone(catalog); removed.assets.shift();
  assert.throws(()=>validateP64AtlasExtension(baseAtlas,removed));
  const reordered = structuredClone(catalog); [reordered.assets[0],reordered.assets[1]] = [reordered.assets[1],reordered.assets[0]];
  assert.throws(()=>validateP64AtlasExtension(baseAtlas,reordered));
});
test('duplicate IDs, foreign PNG paths, excluded sources and combat claims are rejected',() => {
  for (const patch of [{id:baseAtlas.assets[0].id},{path:'../assets/p63/new.png'},{path:'../assets/p64/../bad.png'},
    {path:'https://example.com/image.png'},{selected:false},{sourceGenerated:false},{combatReady:true},{combatRuntimeIntegrated:true},{absolute1to1Certified:true}]) {
    assert.throws(()=>validateP64AtlasExtension(baseAtlas,{...catalog,assets:[...baseAtlas.assets,{...asset,...patch}]}),JSON.stringify(patch));
  }
});
test('a different baseline or any historical row, route or edge modification is rejected',() => {
  const wrongBase = structuredClone(base); wrongBase.files[0].bytes++;
  assert.throws(()=>verifyP64RuntimeExtension(wrongBase,proposed,[runtimePath]));
  for (const mutate of [
    value=>{value.files.find(row=>row.path==='index.html').sha256='0'.repeat(64);},
    value=>{value.references.splice(0,1);},
    value=>{value.externalReferences.entries[0].url='https://example.com';},
    value=>{value.omittedReferences.pop();},
    value=>{value.references.push({from:'index.html',to:runtimePath});},
    value=>{value.files.push({...value.files[0]});},
  ]) { const broken = structuredClone(proposed); mutate(broken); assert.throws(()=>verifyP64RuntimeExtension(base,broken,[runtimePath])); }
});
test('the real scanner refuses an unresolved asset hidden in catalogue metadata',async () => {
  await writeFile(path.join(fixture,ATLAS_PATH),JSON.stringify({...catalog,unreviewedImage:'../assets/p64/not-produced.png'}));
  try { await assert.rejects(extendP64RuntimeManifest(base,fixture,baseAtlas),/Unresolved runtime references/); }
  finally { await writeFile(path.join(fixture,ATLAS_PATH),JSON.stringify(catalog)); }
});
test('new character sources use the existing normalization, episode and category filters',async () => {
  const context = {module:{exports:{}},URL,URLSearchParams};
  vm.runInNewContext(await readFile(path.join(root,'public/cqc/src/cqc-p63-source-atlas.js'),'utf8'),context);
  const api = context.module.exports, normalized = api.normalizeCatalog(catalog);
  assert.equal(normalized.length,18);
  assert.equal(api.filterAssets(normalized,{episode:'acid',kind:'character',query:'Flemming'})[0].id,asset.id);
  assert.equal(api.filterAssets(normalized,{episode:'acid2',kind:'character',query:''}).length,0);
  assert.equal(context.CQC_STAGE_REGISTRY,undefined); assert.equal(context.CQC_FIGHTERS,undefined);
});
test('real RGBA PNG passes CRC, decompression and reconstructed alpha checks',() => {
  const result = verifyStaticPng(png,{...asset,transparentBackground:true});
  assert.equal(result.colorType,6); assert.equal(result.alphaExtrema[0],0); assert.ok(result.alphaExtrema[1]>0);
});
test('a real RGB stage remains valid but cannot be claimed as a transparent cutout',async () => {
  const bytes = await readFile(path.join(root,'public/cqc/assets/p63/acid-lobito-forest.png'));
  const row = {id:'acid-lobito-forest',...metadata(bytes)};
  assert.equal(verifyStaticPng(bytes,row).colorType,2);
  assert.throws(()=>verifyStaticPng(bytes,{...row,transparentBackground:true}),/transparency missing/);
});
test('bad chunk CRC and truncated files fail even when supplied whole-file hashes match',() => {
  const badCrc = Buffer.from(png); badCrc[32] ^= 1;
  assert.throws(()=>verifyStaticPng(badCrc,{id:'bad-crc',...metadata(badCrc)}),/CRC mismatch/);
  const truncated = png.subarray(0,png.length-3);
  assert.throws(()=>verifyStaticPng(truncated,{id:'truncated',...metadata(truncated)}),/truncated chunk|invalid chunk length/);
});
