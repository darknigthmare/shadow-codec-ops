// Read-only P69 integrity gate. It verifies incremental data against published P68.
// node scripts/check-cqc-p69.mjs [root] [--baseline-dir directory] [--git-repository directory]
import assert from 'node:assert/strict';
import {readFileSync, existsSync, readdirSync, lstatSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {resolve, posix} from 'node:path';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';
import {verifyStaticPng} from './check-cqc-p64.mjs';
import {verifyP67History, verifyRecoveryArchive} from './check-cqc-p68.mjs';
import {extendP63RuntimeManifest} from './extend-cqc-p63-runtime.mjs';

export const P68_COMMIT = '764ba74e7650b3f744899636cfabc2683c960bfe';
const P68_TREE = '7e83efa8e46a9800f988ee31050482c458fa29fe';
const PASS = 'docs/cqc-reprise/pass69/';
const ATLAS = 'data/cqc-p63-source-atlas.json';
const BIBLE = 'docs/cqc-bible/';
const PINS_SHA256 = '0f3b0f1338d7775dccb23ecbd05563d370271345795546d61e98409913641b05';
const PROOF_SHA256 = 'ba6b806fbc2faa082d18a46d14f20f172d5bc2a98c8d5e58a921a8f61fd64de0';
const REVIEW_SHA256 = 'ae405da4e2e3f5c649ca306cd6d63e7cb5096909339fdc816703942cdccefca4';
const FALSE_FLAGS = ['runtimeIntegrated', 'combatReady', 'combatRuntimeIntegrated', 'absolute1to1Certified', 'referenceGeometryValidated', 'nativePixelExact', 'nativeUhd', 'scopeClosed'];
const ensure = (ok, message) => {if (!ok) throw Error(message);};
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const blob = bytes => createHash('sha1').update('blob ' + bytes.length + '\0').update(bytes).digest('hex');
const digest = value => hash(JSON.stringify(value));
const edgeKey = row => row.from + '\0' + row.to;
const identity = row => ({id:row.id, sha256:row.sha256, gitBlobSha:row.gitBlobSha});

function canonical(name) {
  ensure(typeof name === 'string' && name && !/[\x00-\x1f\\]/.test(name) && !posix.isAbsolute(name) && !name.split('/').some(p => !p || p === '.' || p === '..'), 'Invalid path: ' + name);
  return name;
}
function bytes(root, name) {
  const file = resolve(root, canonical(name));
  ensure(lstatSync(file).isFile(), 'Expected regular file: ' + name);
  return readFileSync(file);
}
const json = (root, name) => JSON.parse(bytes(root, name));
function unique(rows, key, label) {
  ensure(Array.isArray(rows), label + ': expected array');
  const result = new Map();
  for (const row of rows) {ensure(typeof row[key] === 'string' && row[key] && !result.has(row[key]), label + ': missing/duplicate ' + key); result.set(row[key], row);}
  return result;
}
function listFiles(root, folder) {
  return readdirSync(resolve(root, canonical(folder)), {withFileTypes:true}).flatMap(item => {
    const name = folder + '/' + item.name;
    ensure(item.isFile() || item.isDirectory(), 'Unexpected nonregular entry: ' + name);
    return item.isDirectory() ? listFiles(root, name) : [name];
  });
}
function noPositiveClaims(value) {
  if (!value || typeof value !== 'object') return;
  for (const [key, child] of Object.entries(value)) {ensure(!FALSE_FLAGS.includes(key) || child !== true, 'Unsupported positive claim: ' + key); noPositiveClaims(child);}
}
function baseline(root, name, pins, options) {
  const raw = options.baselineRoot ? bytes(options.baselineRoot, name) : execFileSync('git', ['show', P68_COMMIT + ':' + canonical(name)], {cwd:options.gitRepository || root, env:{...process.env,GIT_NO_LAZY_FETCH:'1'},maxBuffer:8*1024*1024});
  ensure(blob(raw) === pins[name], 'Baseline bytes do not match published P68: ' + name);
  return JSON.parse(raw);
}

function history(root, options, pins, proof) {
  const old = verifyP67History(root, options);
  const name = BIBLE + 'asset-associations-p68.json', raw = bytes(root, name);
  ensure(blob(raw) === pins[name], 'P68 historical registry changed');
  const registry = JSON.parse(raw), changes = new Map(proof.changes.map(row => [row.path,row]));
  ensure(registry.assets.length === 5 && registry.archives.length === 1, 'Invalid P68 source/attempt counts');
  for (const row of [...old.sources,...old.archives]) ensure(!changes.has(row.path), 'P67 selected/archive source changed before P69: ' + row.path);
  let localP68ImagesHashed = 0;
  for (const row of [...registry.assets,...registry.archives]) {
    const entry = changes.get(row.path)?.next;
    ensure(entry?.sha === row.gitBlobSha && entry.type === 'blob' && entry.mode === '100644', 'P68 source lacks its published Git-tree identity: ' + row.path);
    if (existsSync(resolve(root,row.path))) {
      const raw = bytes(root,row.path);
      ensure(raw.length === row.bytes && hash(raw) === row.sha256 && blob(raw) === row.gitBlobSha, 'Historical P68 image changed: ' + row.path);
      localP68ImagesHashed++;
    }
  }
  const sources = [...old.sources,...registry.assets], archives = [...old.archives,...registry.archives];
  unique(sources,'assetId','historical identities'); unique([...sources,...archives],'path','historical paths');
  return {sources,archives,byKind:registry.counts.allPassesByKind,summary:{...old.summary,registries:[...old.summary.registries,{path:name,entries:5,archives:1,gitBlobSha:pins[name],sha256:hash(raw)}],selectedSources:259,archivedAttempts:20,pinnedSelectedBlobIdentities:259,pinnedArchiveBlobIdentities:20,localP68ImagesHashed}};
}

function verifyRuntime(root, base, current, selected) {
  ensure(base.files.length === 3095 && base.references.length === 5031, 'Unexpected P68 runtime baseline');
  const original = unique(base.files,'path','baseline runtime'), rows = unique(current.files,'path','current runtime');
  const added = selected.map(row => row.path.slice('public/cqc/'.length));
  ensure(rows.size === original.size + added.length && added.every(path => !original.has(path)), 'Unexpected runtime file count/path reuse');
  const allowed = new Set([...original.keys(),...added]);
  for (const name of rows.keys()) ensure(allowed.has(name), 'Unexpected runtime file: ' + name);
  let localHistoricalFilesHashed = 0;
  for (const [name,row] of original) {
    ensure(rows.has(name), 'Historical runtime file removed: ' + name);
    if (name === ATLAS) continue;
    assert.deepEqual(rows.get(name),row,'Historical runtime row changed: ' + name);
    if (existsSync(resolve(root,'public/cqc/'+name))) {
      const raw = bytes(root,'public/cqc/'+name); ensure(raw.length === row.bytes && hash(raw) === row.sha256,'Historical runtime content changed: '+name); localHistoricalFilesHashed++;
    }
  }
  for (const key of new Set([...Object.keys(base),...Object.keys(current)])) if (!['files','references','totalBytes'].includes(key)) assert.deepEqual(current[key],base[key],'Runtime policy changed: '+key);
  const before = new Set(base.references.map(edgeKey)), edges = new Set(), graph = new Map();
  for (const edge of current.references) {
    ensure(rows.has(edge.from) && rows.has(edge.to) && !edges.has(edgeKey(edge)), 'Invalid/duplicate runtime edge');
    edges.add(edgeKey(edge)); if (!graph.has(edge.from)) graph.set(edge.from,[]); graph.get(edge.from).push(edge.to);
  }
  for (const key of before) ensure(edges.has(key),'Historical runtime edge removed');
  const expected = new Set(added.map(to => edgeKey({from:ATLAS,to})));
  for (const key of edges) if (!before.has(key)) ensure(expected.delete(key),'Unexpected new runtime edge');
  ensure(expected.size === 0,'New source lacks its Atlas reference');
  const reachable = new Set([current.entry]), queue = [current.entry];
  for (const from of queue) for (const to of graph.get(from)||[]) if (!reachable.has(to)) {reachable.add(to);queue.push(to);}
  ensure(reachable.size === rows.size,'Unreachable runtime row');
  ensure(Number.isSafeInteger(current.totalBytes) && current.totalBytes === current.files.reduce((n,r)=>n+r.bytes,0),'Runtime byte total mismatch');
  return {baselineFiles:3095,unchangedRows:3094,localHistoricalFilesHashed,preservedReferences:5031,addedFiles:added.length,addedReferences:edges.size-before.size,files:rows.size,references:edges.size,reachable:reachable.size,totalBytes:current.totalBytes,byteDelta:current.totalBytes-base.totalBytes,omittedReferences:base.omittedReferences.length,externalRoutes:base.externalReferences.entries.length};
}

export async function verifyP69(root, options={}) {
  const pinRaw=bytes(root,PASS+'baseline-pins.json'), proofRaw=bytes(root,PASS+'p68-baseline-proof.json');
  ensure(hash(pinRaw)===PINS_SHA256 && hash(proofRaw)===PROOF_SHA256,'Published baseline evidence changed');
  const pinDoc=JSON.parse(pinRaw), pins=pinDoc.files, proof=JSON.parse(proofRaw);
  ensure(pinDoc.parentCommit===P68_COMMIT && pinDoc.parentTree===P68_TREE && proof.toCommit===P68_COMMIT && proof.toTree===P68_TREE,'Wrong baseline commit/tree');
  const historical=history(root,options,pins,proof), recovery=verifyRecoveryArchive(root);
  ensure(blob(bytes(root,'docs/cqc-reprise/pass61/inventory.json'))===pins['docs/cqc-reprise/pass61/inventory.json'],'Historical inventory changed');
  const localArchive=json(root,PASS+'local-addendum/manifest.json');
  ensure(localArchive.files.length===6 && localArchive.exactCopies===6,'Unexpected local snapshot count');
  let localArchiveBytes=0;
  for(const row of localArchive.files){const raw=bytes(root,row.path);ensure(raw.length===row.bytes && hash(raw)===row.sha256 && blob(raw)===row.gitBlobSha,'Historical local snapshot changed: '+row.path);localArchiveBytes+=raw.length;}
  ensure(localArchiveBytes===localArchive.totalBytes,'Local snapshot byte count mismatch');
  for (const [name,sha] of Object.entries(pins)) {
    if (name.startsWith('public/cqc/') && !name.endsWith(ATLAS) && name!=='public/cqc/runtime-manifest.json' || name.startsWith('scripts/')) ensure(blob(bytes(root,name))===sha,'Previously published implementation changed: '+name);
  }
  const baseAtlas=baseline(root,'public/cqc/'+ATLAS,pins,options), baseRuntime=baseline(root,'public/cqc/runtime-manifest.json',pins,options);
  ensure(baseAtlas.assets.length===82,'Expected 82 historical Atlas objects');
  const delivery=json(root,PASS+'delivery-manifest.json'), bible=json(root,BIBLE+'asset-associations-p69.json'), atlas=json(root,'public/cqc/'+ATLAS);
  ensure(delivery.schema==='cqc.p69.delivery.v1' && bible.schema==='cqc.bible.asset-associations-p69.v1' && delivery.parentCommit===P68_COMMIT,'Wrong P69 schema or parent');
  assert.deepEqual({...delivery,schema:bible.schema},bible,'Bible and delivery differ');
  const selected=delivery.assets, archives=delivery.archives, blocked=delivery.blockedRequests;
  unique([...selected,...archives,...blocked],'id','P69 requests'); unique([...selected,...archives],'path','P69 outputs'); unique([...selected,...archives],'sha256','P69 output hashes');
  ensure(selected.length>0,'P69 needs a reviewed source');
  const reviewRaw=bytes(root,PASS+'reviewed-batch.json'); ensure(hash(reviewRaw)===REVIEW_SHA256,'Root visual review identities changed');
  const review=JSON.parse(reviewRaw); ensure(review.parentCommit===P68_COMMIT && review.reviewer==='/root' && review.reviewComplete===true,'Unfinished review');
  assert.deepEqual(review.selected,selected.map(identity),'Selected images differ from visual review'); assert.deepEqual(review.archives,archives.map(identity),'Archives differ from visual review');
  assert.deepEqual(review.blockedIds,blocked.map(r=>r.id),'Blocked requests differ from review');
  const refs=unique(review.references,'path','reviewed references'), guideIds=new Set(json(root,delivery.requirementsGuide).sections.map(r=>r.id));
  for (const [path,ref] of refs) {const raw=bytes(root,path);ensure(raw.length===ref.bytes && hash(raw)===ref.sha256 && blob(raw)===ref.gitBlobSha,'Reference identity changed: '+path);}
  const prompts=unique(review.prompts,'path','reviewed exact prompts');
  for (const [path,ref] of prompts) {const raw=bytes(root,path);ensure(raw.length===ref.bytes && hash(raw)===ref.sha256 && blob(raw)===ref.gitBlobSha,'Exact prompt identity changed: '+path);}
  const oldHashes=new Set([...historical.sources,...historical.archives].map(r=>r.sha256)), oldIds=new Set(historical.sources.map(r=>r.assetId));
  const pngs=[], bibleText=bytes(root,BIBLE+'CONTINUATION_P69.md').toString('utf8'); let refUses=0;
  for (const [records,isSelected] of [[selected,true],[archives,false]]) for (const row of records) {
    ensure(/^[a-z0-9][a-z0-9_-]{0,119}$/.test(row.id),'Invalid ID'); canonical(row.path);
    ensure((isSelected?/^public\/cqc\/assets\/p69\/[a-z0-9_-]+\.png$/:/^docs\/cqc-reprise\/pass69\/.+\.png$/).test(row.path),'Wrong output directory');
    ensure(row.selected===isSelected && row.atlasIntegrated===isSelected && row.sourceGenerated===true && row.pass==='P69','Wrong selected/source flags');
    for (const flag of FALSE_FLAGS) ensure(row[flag]===false,row.id+': unsupported '+flag);
    ensure(row.fidelityStatus==='pending_external_review','Missing fidelity qualification');
    if (isSelected) ensure(row.assetId==='asset:p69:'+row.id && !oldIds.has(row.assetId) && !oldHashes.has(row.sha256),'Duplicate historical identity/content');
    const actual=verifyStaticPng(bytes(root,row.path),row); pngs.push(actual);
    ensure(row.bitDepth===8 && row.colorMode===(actual.colorType===6?'RGBA':'RGB'),'Wrong PNG color metadata');
    ensure(Array.isArray(row.referenceFiles) && row.referenceFiles.length>0 && row.referenceFiles.every(path=>refs.has(path)),'Missing reviewed native/concept reference'); refUses+=row.referenceFiles.length;
    ensure(row.generation?.tool==='image_gen.imagegen' && row.generation.promptFile && typeof row.generation.exactPrompt==='string','Missing exact generation provenance');
    ensure(prompts.has(row.generation.promptFile),'Prompt absent from root review');
    ensure(bytes(root,row.generation.promptFile).toString('utf8').trimEnd()===row.generation.exactPrompt.trimEnd(),'Prompt bytes differ from generation record');
    if (row.generation.inputTargetPath) ensure(hash(bytes(root,row.generation.inputTargetPath))===row.generation.inputTargetSha256,'Image edit target changed');
    if (isSelected) {
      ensure(row.guideSections.length>0 && row.guideSections.every(id=>guideIds.has(id)),'Invalid guide association');
      ensure(row.workIds.length>0 && row.runtimeBinding?.status==='atlas_only' && row.runtimeBinding.admittedByThisPass===false,'Invalid work/runtime binding');
      const url=new URL(row.bibleURL); ensure(url.hostname==='github.com' && url.pathname.endsWith('/docs/cqc-bible/CONTINUATION_P69.md') && url.hash==='#'+row.id && bibleText.includes('<a id="'+row.id+'"></a>'),'Missing bible anchor');
      ensure(row.productionPlan?.status==='documented_future_work_not_generated_or_implemented' && row.productionPlan.animationClipsGeneratedByP69===0,'Animation plan misstates delivered work');
    }
  }
  for (const row of blocked) {
    ensure(row.status==='blocked_by_image_tool' && row.hasOutputFile===false && row.selected===false && row.atlasIntegrated===false && row.retried===false && row.attempts===1,'Invalid blocked request record');
    for (const field of ['path','bytes','sha256','gitBlobSha']) ensure(!Object.hasOwn(row,field),'Blocked request claims output');
    ensure(prompts.has(row.promptFile),'Refused prompt absent from root review');
    if(row.generation?.exactPrompt)ensure(bytes(root,row.promptFile).toString('utf8').trimEnd()===row.generation.exactPrompt.trimEnd(),'Refused prompt content mismatch');
  }
  const counts=delivery.counts, expected={selectedSources:selected.length,archivedAttempts:archives.length,generatedPNGs:selected.length+archives.length,generationRequests:selected.length+archives.length+blocked.reduce((n,r)=>n+r.attempts,0),blockedRequests:blocked.length,previousSelected:259,totalSelected:259+selected.length,previousArchivedAttempts:20,totalArchivedAttempts:20+archives.length,atlasSources:82+selected.length,selectedBytes:selected.reduce((n,r)=>n+r.bytes,0),archivedBytes:archives.reduce((n,r)=>n+r.bytes,0),combatAdmissions:0,absolute1to1Certifications:0,closedScopes:0};
  for (const [key,value] of Object.entries(expected)) ensure(counts[key]===value,'Count mismatch: '+key);
  const byKind={},byEpisode={},byBodyCoverage={},allPassesByKind={...historical.byKind};
  for(const row of selected){byKind[row.kind]=(byKind[row.kind]||0)+1;byEpisode[row.episodeKey]=(byEpisode[row.episodeKey]||0)+1;byBodyCoverage[row.bodyCoverage]=(byBodyCoverage[row.bodyCoverage]||0)+1;allPassesByKind[row.kind]=(allPassesByKind[row.kind]||0)+1;}
  for(const [key,value] of Object.entries({byKind,byEpisode,byBodyCoverage,allPassesByKind}))assert.deepEqual(counts[key],value,'Breakdown mismatch: '+key);
  ensure(counts.editionCount===Object.keys(byEpisode).length,'Edition count mismatch');
  const inventory=json(root,'docs/cqc-reprise/pass61/inventory.json').rows,historicalIds=new Set(inventory.map(r=>r.id));
  const oldWork=new Set(historical.sources.flatMap(r=>r.workIds||[])),newWork=new Set(selected.flatMap(r=>r.workIds||[])),allWork=new Set([...oldWork,...newWork]);
  const unresolved=inventory.filter(r=>r.presenceClass==='unresolved');
  ensure(inventory.length===277 && unresolved.length===97 && unresolved.filter(r=>!oldWork.has(r.id)).length===76,'Unexpected historical coverage baseline');
  const remaining=unresolved.filter(r=>!allWork.has(r.id)).length,coverage=json(root,PASS+'coverage-delta.json'),scope=json(root,PASS+'scope-delta.json');
  ensure(delivery.historicalRowsWithoutSelectedCandidate===remaining && coverage.afterRowsWithoutCandidate===remaining && scope.rowsWithoutSelectedCandidateAfter===remaining,'Historical candidate coverage mismatch');
  assert.deepEqual(delivery.extensionScopes,[...newWork].filter(w=>!historicalIds.has(w)).sort(),'Extension incorrectly classified as historical');
  assert.deepEqual(delivery.historicalScopeUpdates,[...newWork].filter(w=>historicalIds.has(w)).sort(),'Historical addition incorrectly classified as extension');
  assert.deepEqual(coverage.firstCandidateRows.map(r=>r.id),[...newWork].filter(w=>historicalIds.has(w)&&!oldWork.has(w)).sort(),'First-candidate rows mismatch');
  for(const doc of [delivery,bible,atlas])noPositiveClaims(doc);
  ensure(atlas.schema===baseAtlas.schema && atlas.sourcePass===baseAtlas.sourcePass+'+P69','Atlas schema/sourcePass changed');
  assert.deepEqual(atlas.assets.slice(0,82),baseAtlas.assets,'Historical 82 dossiers changed or reordered');
  unique(atlas.assets,'id','Atlas ids');unique(atlas.assets,'path','Atlas paths');
  const added=atlas.assets.slice(82);assert.deepEqual(added.map(r=>r.id),selected.map(r=>r.id),'New catalogue order differs');
  const context={module:{exports:{}},URL,URLSearchParams};vm.runInNewContext(bytes(root,'public/cqc/src/cqc-p63-source-atlas.js').toString('utf8'),context,{timeout:1000});
  const api=context.module.exports,normalized=api.normalizeCatalog(atlas);ensure(normalized.length===counts.atlasSources && digest(normalized.slice(0,82))===digest(api.normalizeCatalog(baseAtlas)),'Normalized historical dossiers changed');
  for(let i=0;i<added.length;i++){
    const row=added[i],source=selected[i];ensure(row.path==='../'+source.path.slice('public/cqc/'.length),'Atlas image path differs');
    for(const key of ['assetId','label','episode','episodeKey','bytes','width','height','sha256','gitBlobSha','kind','workIds','referenceURLs','qaNotes','scope','bibleURL',...FALSE_FLAGS])assert.deepEqual(row[key],source[key],'Atlas/source mismatch '+key);
    ensure(row.referenceURLs.length>0 && row.referenceURLs.every(url=>api.referenceURL(url)) && row.qaNotes.length>0,'Missing references/limits');
    const filtered=api.filterAssets(normalized,{episode:row.episodeKey,kind:row.kind,query:row.label});ensure(filtered.some(r=>r.id===row.id) && filtered.every(r=>r.episode===row.episodeKey),'Filter reachability/edition isolation failed');
  }
  assert.deepEqual(listFiles(root,'public/cqc/assets/p69').sort(),selected.map(r=>r.path).sort(),'Missing/unlisted selected PNG');
  const runtime=json(root,'public/cqc/runtime-manifest.json'), runtimeProof=verifyRuntime(root,baseRuntime,runtime,selected);
  const proposed=await extendP63RuntimeManifest(baseRuntime,resolve(root,'public/cqc'),[ATLAS,...selected.map(r=>r.path.slice('public/cqc/'.length))]);assert.deepEqual(runtime,proposed,'Runtime differs from real reference scanner');
  const archivedHashes=new Set(archives.map(r=>r.sha256));ensure(runtime.files.every(r=>!archivedHashes.has(r.sha256)),'Archived output in runtime');
  const promptIndex=json(root,PASS+'prompt-index.json');assert.deepEqual(promptIndex.records.map(r=>r.id),selected.map(r=>r.id),'Prompt selection order differs');ensure(promptIndex.generationRequests===counts.generationRequests,'Prompt request count differs');
  return {schema:'cqc.p69.local-verification.v1',status:'passed',checkedAt:new Date().toISOString(),nodeVersion:process.version,parentCommit:P68_COMMIT,parentTree:P68_TREE,historical:historical.summary,recovery,reviewedBatch:{sha256:hash(reviewRaw),selected:review.selected.length,archives:review.archives.length},counts:{...expected,referenceFilesVerified:refs.size,referenceUsesVerified:refUses,promptFilesVerified:prompts.size,generatedPromptFilesVerified:pngs.length,blockedPromptFilesVerified:blocked.length,bibleAnchorsVerified:selected.length},checks:{historicalSevenRegistriesIdentical:true,historical259Sources20ArchivesPinned:true,historical82AtlasObjectsOrderedAndIdentical:true,rootReviewedIdentitiesPinned:true,pngCrcDecompressionAndAlphaVerified:true,referenceAndExactPromptIdentitiesVerified:true,bibleDeliveryAndAtlasConsistent:true,runtimeOnlyCatalogueAndNewPngsChanged:true,historical3094RuntimeRows5031EdgesPreserved:true,externalPolicyPreserved:true,realScannerProposalMatches:true},runtime:runtimeProof,pngs,limits:['Historical images absent locally are verified by published Git-tree identities, not decoded again.','Integrity and visual QA do not certify absolute 1:1 fidelity, native UHD or combat readiness.','No browser execution is claimed; Chromium engine is absent.']};
}
if(process.argv[1] && resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  try{
    const args=process.argv.slice(2),options={},roots=[];
    for(let i=0;i<args.length;i++)if(args[i]==='--baseline-dir')options.baselineRoot=resolve(args[++i]);else if(args[i]==='--git-repository')options.gitRepository=resolve(args[++i]);else roots.push(args[i]);
    ensure(roots.length<=1,'Too many roots');console.log(JSON.stringify(await verifyP69(resolve(roots[0]||'.'),options),null,2));
  }catch(error){console.error(error.stack||String(error));process.exitCode=1;}
}
