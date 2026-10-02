// Uses tiny owned copies of a real existing WebP. Never mutates a production inode.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';
import { mkdir, writeFile, readFile, lstat } from 'node:fs/promises';
import { digest, freezePins, fingerprint, stageFile, verifyPins } from '/workspace/cqc-pass8-storage-tools/common.mjs';
const base=path.dirname(fileURLToPath(import.meta.url)),fixture=path.join(base,'webp-v2-fixtures-'+randomUUID());
const source=path.join(fixture,'source');await mkdir(source,{recursive:true});
const actual='/workspace/shadow-codec-recovered/public/portraits/msx/mg1/diane/calm.webp';
const webp=await readFile(actual),originalHash=digest(webp);
const png=await readFile(path.join(base,'initial-fixtures/project/public/frozen.png'));
await writeFile(path.join(source,'frozen.webp'),webp);await writeFile(path.join(source,'frozen.png'),png);
await writeFile(path.join(source,'mutable.json'),'{}\n');await writeFile(path.join(source,'mutable.js'),'export default 1;\n');
const rows=[{path:'frozen.png',format:'png',bytes:png.length,sha256:digest(png),immutable:true},{path:'frozen.webp',format:'webp',bytes:webp.length,sha256:digest(webp),immutable:true}];
const v2={schema:'cqc.pass8.immutable-raster-pins/2',sourceRoot:source,sourceState:'frozen',confirmedByRoot:true,files:rows};
const checks=[];const hashes=[];
for(const file of ['common.mjs','sync-frozen-runtime.mjs','build-with-frozen-public.mjs','prepare-frozen-png-pins.mjs'])hashes.push({file:'/workspace/cqc-pass8-storage-tools/'+file,sha256:digest(await readFile('/workspace/cqc-pass8-storage-tools/'+file))});
function assert(x,msg){if(!x)throw Error(msg);}
async function check(name,fn){try{checks.push({name,status:'passed',details:await fn()});}catch(e){checks.push({name,status:'failed',error:e.message});}}
async function rejects(fn){try{await fn();}catch(e){return e.message;}throw Error('Expected rejection, operation accepted');}
await check('Real source WebP RIFF size matches physical bytes',async()=>{assert(webp.toString('ascii',0,4)==='RIFF'&&webp.toString('ascii',8,12)==='WEBP','Real reference lacks signature');assert(webp.readUInt32LE(4)+8===webp.length,'Real reference RIFF length differs');return{source:actual,bytes:webp.length,sha256:originalHash,firstChunk:webp.toString('ascii',12,16)};});
await check('V2 explicit PNG and WebP pins both share source inodes',async()=>{
 const pins=freezePins(v2,source),target=path.join(fixture,'linked');await mkdir(target);const result=[];
 for(const row of rows){const staged=await stageFile({sourceRoot:source,relative:row.path,targetRoot:target,expected:row,pin:pins.get(row.path)});const a=await lstat(path.join(source,row.path)),b=await lstat(path.join(target,row.path));assert(a.dev===b.dev&&a.ino===b.ino,'Explicit raster did not hardlink');assert((await readFile(path.join(target,row.path))).equals(row.path.endsWith('.webp')?webp:png),'Raster bytes changed');result.push({path:row.path,mode:staged.mode,sameInode:true});}await verifyPins(source,pins);return result;
});
await check('Legacy PNG v1 still rejects a WebP pin',async()=>({rejected:await rejects(()=>freezePins({...v2,schema:'cqc.pass8.immutable-png-pins/1'},source))}));
await check('Legacy PNG v1 still accepts a genuine PNG',async()=>{const p=freezePins({...v2,schema:'cqc.pass8.immutable-png-pins/1',files:[rows[0]]},source);await verifyPins(source,p);return{accepted:true};});
await check('Unpinned WebP and JS/JSON are independent copies',async()=>{
 const target=path.join(fixture,'unlinked');await mkdir(target);const result=[];
 for(const name of ['frozen.webp','mutable.js','mutable.json']){const expected=await fingerprint(path.join(source,name));const r=await stageFile({sourceRoot:source,relative:name,targetRoot:target,expected});const a=await lstat(path.join(source,name)),b=await lstat(path.join(target,name));assert(a.dev!==b.dev||a.ino!==b.ino,'Mutable/unpinned file inode shared');result.push({path:name,mode:r.mode,sameInode:false});}return result;
});
for(const ext of ['.js','.json','.jpg','.svg'])await check('V2 rejects explicitly pinned '+ext,async()=>({rejected:await rejects(()=>freezePins({...v2,files:[{...rows[1],path:'fake'+ext}]},source))}));
await check('V2 requires explicit root freeze assertion',async()=>({rejected:await rejects(()=>freezePins({...v2,confirmedByRoot:false},source))}));
await check('V2 requires explicit format matching the file extension',async()=>({rejected:await rejects(()=>freezePins({...v2,files:[{...rows[1],format:'png'}]},source))}));
await check('Pinned WebP digest/length mismatch fails before linking',async()=>{
 const target=path.join(fixture,'changed-pin');await mkdir(target);const wrong={...rows[1],sha256:'0'.repeat(64)};return{rejected:await rejects(()=>stageFile({sourceRoot:source,relative:'frozen.webp',targetRoot:target,expected:rows[1],pin:wrong}))};
});
const fake12=Buffer.alloc(12);fake12.write('RIFF',0);fake12.writeUInt32LE(4,4);fake12.write('WEBP',8);
const badCases=[['PNG renamed WebP',png],['WebP RIFF trailing byte',Buffer.concat([webp,Buffer.from([0])])],['Bare twelve-byte RIFF WEBP without image chunk',fake12]];
for(let i=0;i<badCases.length;i++)await check('Reject malformed format: '+badCases[i][0],async()=>{
 const [name,bytes]=badCases[i],root=path.join(fixture,'bad-'+i),target=path.join(fixture,'bad-target-'+i);await mkdir(root);await mkdir(target);await writeFile(path.join(root,'invalid.webp'),bytes);
 const expected={path:'invalid.webp',bytes:bytes.length,sha256:digest(bytes)},pin={...expected,format:'webp',immutable:true};
 return{rejected:await rejects(async()=>{const frozen=freezePins({...v2,sourceRoot:root,files:[pin]},root);await stageFile({sourceRoot:root,relative:expected.path,targetRoot:target,expected,pin:frozen.get(expected.path)});})};
});
await check('Pinned WebP collision preserves existing target',async()=>{
 const target=path.join(fixture,'collision');await mkdir(target);await writeFile(path.join(target,'frozen.webp'),'old target');const frozen=freezePins(v2,source);await rejects(()=>stageFile({sourceRoot:source,relative:'frozen.webp',targetRoot:target,expected:rows[1],pin:frozen.get('frozen.webp')}));assert((await readFile(path.join(target,'frozen.webp'),'utf8'))==='old target','Collision overwrote old bytes');return{preserved:true};
});
await check('No production WebP bytes changed',async()=>{assert(digest(await readFile(actual))===originalHash,'Production WebP source changed');return{unchanged:true};});
for(const row of hashes)await check('Stable reviewed tool '+path.basename(row.file),async()=>{assert(digest(await readFile(row.file))===row.sha256,'Tool changed during regression');return{sha256:row.sha256};});
const report={schema:'cqc.pass8.webp-v2-independent-regression/1',status:checks.every(r=>r.status==='passed')?'passed':'failed',fixtureRoot:fixture,productionSyncRun:false,productionBuildRun:false,productionRepositoriesModified:false,toolSources:hashes,checks};
const out=path.join(base,'WEBP_V2_REGRESSION-'+randomUUID()+'.json');await writeFile(out,JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({report:out,...report},null,2));if(report.status!=='passed')process.exitCode=1;
