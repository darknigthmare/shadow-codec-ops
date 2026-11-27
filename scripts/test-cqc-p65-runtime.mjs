import test, {after} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp, mkdir, writeFile, readFile, rm} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';
import {P64_COMMIT, ATLAS_PATH, validateP65AtlasExtension, verifyP65RuntimeExtension, extendP65RuntimeManifest} from './extend-cqc-p65-runtime.mjs';
import {verifyHistoricalSources} from './check-cqc-p65.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pinned = name => JSON.parse(execFileSync('git',['show',P64_COMMIT+':'+name],{cwd:root,maxBuffer:4*1024*1024}));
const base = pinned('public/cqc/runtime-manifest.json');
const baseAtlas = pinned('public/cqc/' + ATLAS_PATH);
const fixture = await mkdtemp(path.join(tmpdir(),'cqc-p65-runtime-test-'));
after(async () => rm(fixture,{recursive:true,force:true}));
await mkdir(path.join(fixture,'data'),{recursive:true});
await mkdir(path.join(fixture,'assets/p65'),{recursive:true});

// Temporary test copies of real published RGB/RGBA PNGs, never P65 sources.
const fixtureInputs = [
  {id:'p65-contract-stage',label:'P65 contract stage',episode:'Metal Gear AC!D',episodeKey:'acid',kind:'stage',source:'public/cqc/assets/p63/acid-lobito-forest.png'},
  {id:'p65-contract-prop',label:'P65 contract prop',episode:'Metal Gear Rising: Revengeance',episodeKey:'mgr',kind:'prop',source:'public/cqc/assets/p64/mgr-repair-nanopaste.png'}
];
const added = [];
for (const input of fixtureInputs) {
  const png = await readFile(path.join(root,input.source));
  const row = {id:input.id,label:input.label,episode:input.episode,episodeKey:input.episodeKey,kind:input.kind,
    path:'../assets/p65/'+input.id+'.png',sourceGenerated:true,selected:true,atlasIntegrated:true,
    combatReady:false,combatRuntimeIntegrated:false,absolute1to1Certified:false,
    bytes:png.length,width:png.readUInt32BE(16),height:png.readUInt32BE(20),
    sha256:createHash('sha256').update(png).digest('hex'),gitBlobSha:createHash('sha1').update('blob '+png.length+'\0').update(png).digest('hex')};
  added.push(row);
  await writeFile(path.join(fixture,row.path.slice(3)),png);
}
const catalog = {...baseAtlas,assets:[...baseAtlas.assets,...added]};
const paths = added.map(row=>row.path.slice(3));
await writeFile(path.join(fixture,ATLAS_PATH),JSON.stringify(catalog));
const proposed = await extendP65RuntimeManifest(base,fixture,baseAtlas);

test('all three historical source registries and 205 indexed source identities are preserved',() => {
  const proof = verifyHistoricalSources(root);
  assert.equal(proof.entries,205); assert.equal(proof.gitIndexBlobIdentities,205);
  assert.deepEqual(proof.registries.map(row=>row.entries),[177,17,11]);
  assert.ok(proof.localFilesHashed >= 28);
  assert.deepEqual(proof.byKind,{character:20,costume:9,machine:46,stage:124,vfx:1,prop:3,projectile:2});
});

test('the real scanner adds two temporary RGB/RGBA resources without reading absent legacy PNGs',() => {
  const proof = verifyP65RuntimeExtension(base,proposed,paths);
  assert.equal(proof.files,3043); assert.equal(proof.references,4979);
  assert.equal(proof.unchangedRows,3040); assert.equal(proof.preservedReferences,4977);
  assert.equal(proof.externalRoutes,499); assert.equal(proof.omittedReferences,740);
  for (const row of added) assert.equal(proposed.files.find(file=>file.path===row.path.slice(3)).sha256,row.sha256);
});

test('neither P63 nor P64 entries may be edited, removed or reordered among the old 28',() => {
  for (const index of [0,17,27]) {
    const changed = structuredClone(catalog); changed.assets[index].label += ' changed';
    assert.throws(()=>validateP65AtlasExtension(baseAtlas,changed));
  }
  const removed = structuredClone(catalog); removed.assets.splice(17,1);
  assert.throws(()=>validateP65AtlasExtension(baseAtlas,removed));
  const reordered = structuredClone(catalog); [reordered.assets[16],reordered.assets[17]] = [reordered.assets[17],reordered.assets[16]];
  assert.throws(()=>validateP65AtlasExtension(baseAtlas,reordered));
});

test('new records cannot reuse an old ID, escape the P65 directory, or assert combat/certification',() => {
  for (const patch of [{id:baseAtlas.assets[27].id},{path:'../assets/p64/borrowed.png'},{path:'../assets/p65/../bad.png'},
    {path:'https://example.com/image.png'},{selected:false},{atlasIntegrated:false},{sourceGenerated:false},
    {combatReady:true},{combatRuntimeIntegrated:true},{absolute1to1Certified:true}]) {
    assert.throws(()=>validateP65AtlasExtension(baseAtlas,{...catalog,assets:[...baseAtlas.assets,{...added[0],...patch}]}),JSON.stringify(patch));
  }
});

test('old file identities, reference edges, omissions and external routes stay immutable',() => {
  const wrongBase = structuredClone(base); wrongBase.files[0].bytes++;
  assert.throws(()=>verifyP65RuntimeExtension(wrongBase,proposed,paths));
  for (const mutate of [
    value=>{value.files.find(row=>row.path==='index.html').sha256='0'.repeat(64);},
    value=>{value.references.splice(0,1);},
    value=>{value.externalReferences.entries[0].url='https://example.com';},
    value=>{value.omittedReferences.pop();},
    value=>{value.references.push({from:'index.html',to:paths[0]});},
    value=>{value.references=value.references.filter(row=>row.to!==paths[0]);},
    value=>{value.files.push({...value.files[0]});}
  ]) { const broken=structuredClone(proposed); mutate(broken); assert.throws(()=>verifyP65RuntimeExtension(base,broken,paths)); }
});

test('an undocumented PNG reference in catalogue metadata is rejected by the actual scanner',async () => {
  await writeFile(path.join(fixture,ATLAS_PATH),JSON.stringify({...catalog,unreviewedImage:'../assets/p65/not-produced.png'}));
  try { await assert.rejects(extendP65RuntimeManifest(base,fixture,baseAtlas),/Unresolved runtime references/); }
  finally { await writeFile(path.join(fixture,ATLAS_PATH),JSON.stringify(catalog)); }
});

test('the unmodified Atlas normalizer and episode/category filters accept the new records',async () => {
  const context={module:{exports:{}},URL,URLSearchParams};
  vm.runInNewContext(await readFile(path.join(root,'public/cqc/src/cqc-p63-source-atlas.js'),'utf8'),context);
  const api=context.module.exports, normalized=api.normalizeCatalog(catalog);
  assert.equal(normalized.length,30);
  assert.equal(api.filterAssets(normalized,{episode:'acid',kind:'stage',query:'P65 contract stage'})[0].id,added[0].id);
  assert.equal(api.filterAssets(normalized,{episode:'mgr',kind:'prop',query:'P65 contract prop'})[0].id,added[1].id);
  assert.equal(api.filterAssets(normalized,{episode:'acid2',kind:'prop',query:'P65 contract prop'}).length,0);
  assert.equal(context.CQC_STAGE_REGISTRY,undefined); assert.equal(context.CQC_FIGHTERS,undefined);
});
