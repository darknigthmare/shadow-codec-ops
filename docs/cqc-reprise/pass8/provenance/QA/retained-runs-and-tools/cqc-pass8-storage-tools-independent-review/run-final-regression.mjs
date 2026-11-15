// Independent isolated checks. No actual R/S sync, build, or module imports.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';
import { mkdir, writeFile, readFile, stat, symlink, link } from 'node:fs/promises';
import { planBuild, guardTypecheckOutputs, verifyBuildArtifacts } from '/workspace/cqc-pass8-storage-tools/build-with-frozen-public.mjs';
import { digest, freezePins, inventory, byteInventory, sameInventory, safeRelative, stageFile, guardOperationRoots, promotePreserving } from '/workspace/cqc-pass8-storage-tools/common.mjs';

const base = path.dirname(fileURLToPath(import.meta.url));
const toolsRoot = '/workspace/cqc-pass8-storage-tools';
const watched = ['common.mjs', 'sync-frozen-runtime.mjs', 'build-with-frozen-public.mjs'];
async function toolHashes() { return await Promise.all(watched.map(async file => ({ file: path.join(toolsRoot, file), sha256: digest(await readFile(path.join(toolsRoot, file))) }))); }
const toolsBefore = await toolHashes();
const fixture = path.join(base, 'final-fixtures-' + randomUUID());
const project = path.join(fixture, 'project'), publicRoot = path.join(project, 'public');
await mkdir(publicRoot, { recursive: true }); await mkdir(path.join(project, 'src'));
await writeFile(path.join(project, 'vite.config.ts'), 'export default {};\n');
await writeFile(path.join(project, 'src/main.ts'), 'export const x = 1;\n');
const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jxGsAAAAASUVORK5CYII=', 'base64');
await writeFile(path.join(publicRoot, 'frozen.png'), png);
await writeFile(path.join(publicRoot, 'mutable.js'), 'export default 1;\n');
const pins = { schema: 'cqc.pass8.immutable-png-pins/1', sourceRoot: publicRoot, sourceState: 'frozen', confirmedByRoot: true, files: [{ path: 'frozen.png', sha256: digest(png), bytes: png.length, immutable: true }] };
const results = [];
function assert(condition, message) { if (!condition) throw Error(message); }
async function check(name, callback) { try { results.push({ name, status: 'passed', details: await callback() }); } catch (error) { results.push({ name, status: 'failed', error: error.message }); } }
async function rejects(fn, message) { try { await fn(); } catch (error) { return error.message; } throw Error(message); }

await check('Build input code mutation invalidates reviewed plan', async () => {
  const input = { projectRoot: project, destination: path.join(project, 'dist'), pins };
  const before = await planBuild(input); await writeFile(path.join(project, 'src/main.ts'), 'export const x = 2;\n');
  const after = await planBuild(input); assert(JSON.stringify(before) !== JSON.stringify(after), 'Plan stayed unchanged after source code mutation');
  return { reviewedSourceSnapshotChanges: true };
});
for (const destination of [project, path.join(project, 'src'), publicRoot, path.join(project, 'src/output')]) await check('Reject build destination ' + path.relative(fixture, destination), async () => ({ rejected: await rejects(() => planBuild({ projectRoot: project, destination, pins }), 'Unsafe source overlap accepted') }));
await check('Allow ordinary project dist and disjoint external output', async () => {
  await planBuild({ projectRoot: project, destination: path.join(project, 'dist'), pins });
  await planBuild({ projectRoot: project, destination: path.join(fixture, 'external-dist'), pins }); return { allowed: true };
});
await check('Inventory order canonical across directory/file prefix', async () => {
  const root = path.join(fixture, 'ordering'); await mkdir(path.join(root, 'a'), { recursive: true });
  await writeFile(path.join(root, 'a/x.txt'), 'nested'); await writeFile(path.join(root, 'a-x.txt'), 'sibling');
  const actual = await inventory(root), sorted = [...actual].sort((a,b) => a.path.localeCompare(b.path, 'en'));
  assert(sameInventory(sorted, actual), 'DFS inventory differs from flat manifest path order'); return { canonicalPaths: actual.map(r => r.path) };
});
await check('Frozen PNG hardlinks while JS remains independent', async () => {
  const stage = path.join(fixture, 'stage-pins'); await mkdir(stage); const frozen = freezePins(pins, publicRoot), rows=[];
  for (const row of await inventory(publicRoot)) rows.push(await stageFile({ sourceRoot: publicRoot, relative: row.path, targetRoot: stage, expected: row, pin: frozen.get(row.path) }));
  assert(rows.find(r=>r.path==='frozen.png').mode==='immutable-png-hardlink', 'PNG was not linked');
  assert(rows.find(r=>r.path==='mutable.js').mode==='independent-copy', 'JS was linked'); return rows.map(({path,mode})=>({path,mode}));
});
await check('Unpinned PNG remains independent', async () => {
  const stage=path.join(fixture,'stage-no-pin'); await mkdir(stage); const expected=(await inventory(publicRoot)).find(r=>r.path==='frozen.png');
  await stageFile({sourceRoot:publicRoot,relative:expected.path,targetRoot:stage,expected}); const a=await stat(path.join(publicRoot,expected.path)),b=await stat(path.join(stage,expected.path));
  assert(a.ino!==b.ino,'Unpinned PNG inode aliases source');return {independent:true};
});
await check('Existing stage collision refuses overwrite', async () => {
  const stage=path.join(fixture,'stage-collision'); await mkdir(stage);await writeFile(path.join(stage,'frozen.png'),'original collision bytes');const expected=(await inventory(publicRoot)).find(r=>r.path==='frozen.png');
  await rejects(()=>stageFile({sourceRoot:publicRoot,relative:expected.path,targetRoot:stage,expected,pin:pins.files[0]}),'Stage collision overwritten');
  assert((await readFile(path.join(stage,'frozen.png'),'utf8'))==='original collision bytes','Existing collision changed');return {preserved:true};
});
await check('JavaScript and non-frozen pins rejected', async () => {
  await rejects(()=>freezePins({...pins,files:[{...pins.files[0],path:'mutable.js'}]},publicRoot),'JS pin accepted');
  await rejects(()=>freezePins({...pins,sourceState:'active'},publicRoot),'Active PNG source accepted');return {rejected:true};
});
await check('Tampered PNG bytes fail pin verification', async () => {
  const root=path.join(fixture,'tamper-source'),stage=path.join(fixture,'tamper-stage');await mkdir(root);await mkdir(stage);await writeFile(path.join(root,'frozen.png'),Buffer.concat([png,Buffer.from('changed')]));
  const expected={path:'frozen.png',bytes:png.length,sha256:digest(png)};
  return {rejected:await rejects(()=>stageFile({sourceRoot:root,relative:'frozen.png',targetRoot:stage,expected,pin:pins.files[0]}),'Tampered source linked')};
});
await check('Unsafe relative paths rejected', async () => {
  for(const value of ['/absolute','../parent','nested/../escape','a\\b','a//b','a/./b']) await rejects(()=>safeRelative(value),'Unsafe relative path accepted');return {rejectedCases:6};
});
await check('Backup and evidence cannot overlap active trees', async () => {
  const destination=path.join(fixture,'output'),stage=path.join(fixture,'staging'),backupRoot=path.join(fixture,'backups'),evidenceRoot=path.join(fixture,'evidence');
  for(const bad of [{backupRoot:path.join(project,'backup')},{evidenceRoot:path.join(destination,'evidence')},{backupRoot,evidenceRoot:path.join(backupRoot,'evidence')}]) await rejects(()=>guardOperationRoots({sourceRoots:[project],destination,stage,backupRoot,evidenceRoot,...bad}),'Protected root overlap accepted');return {rejectedCases:3};
});
await check('Symbolic-link operation ancestor rejected', async () => {
  await symlink(project,path.join(fixture,'project-link'));
  return {rejected:await rejects(()=>planBuild({projectRoot:path.join(fixture,'project-link'),destination:path.join(fixture,'link-output'),pins:{...pins,sourceRoot:path.join(fixture,'project-link/public')}}),'Symlink source root accepted')};
});
await check('Aliased mutable TypeScript emitted output rejected', async () => {
  const generated=path.join(project,'vite.config.js');await writeFile(generated,'generated');await link(generated,path.join(fixture,'generated-alias.js'));
  return {rejected:await rejects(()=>guardTypecheckOutputs(project),'Aliased emitted output accepted')};
});
for(const absent of [false,true]) await check('Post-promotion validation rollback; original '+(absent?'absent':'present'), async () => {
  const suffix=absent?'absent':'present',destination=path.join(fixture,'rollback-'+suffix),stage=path.join(fixture,'replacement-'+suffix),backupRoot=path.join(fixture,'backups-'+suffix),journal=path.join(fixture,'evidence-'+suffix,'promotion.json');
  if(!absent){await mkdir(destination);await writeFile(path.join(destination,'old.txt'),'old preserved');}await mkdir(stage);await writeFile(path.join(stage,'new.txt'),'validated');
  const before=byteInventory(await inventory(destination)),expected=byteInventory(await inventory(stage));let failure;
  try{await promotePreserving({stage,destination,before,backupRoot,journal,afterBackup:async()=>{await writeFile(path.join(stage,'new.txt'),'changed after staging');},validate:async active=>{assert(sameInventory(expected,await inventory(active)),'Post-promotion bytes changed');}});}catch(e){failure=e;}
  assert(failure?.promotion?.status==='rolled-back','Rollback journal state missing');assert(failure.promotion.rejected,'Rejected new output was not preserved');
  assert((await readFile(path.join(failure.promotion.rejected,'new.txt'),'utf8'))==='changed after staging','Rejected bytes not preserved');
  assert(absent?(await inventory(destination))===null:(await readFile(path.join(destination,'old.txt'),'utf8'))==='old preserved','Original destination state not restored');
  await readFile(journal+'.failure.json');return {originalRestored:!absent,originalAbsenceRestored:absent,rejectedNewOutputPreserved:true};
});
const pwaNames=['baseline manifest','missing required manifest fields','too few icons','too few shortcuts/no builder','four shortcuts without builder','only nested Workbox'];
for(let i=0;i<6;i++)await check('PWA parity: '+pwaNames[i],async()=>{
  const stage=path.join(base,'initial-pwa-fixtures','case-'+i);let error=null;
  try{await verifyBuildArtifacts(stage,[]);}catch(e){error=e.message;}
  assert(i===0?!error:Boolean(error),'Original PWA acceptance/rejection was not preserved');return {accepted:i===0,error};
});
const toolsAfter=await toolHashes();
const stable=JSON.stringify(toolsBefore)===JSON.stringify(toolsAfter);if(!stable)results.push({name:'Tools remained unchanged throughout independent run',status:'failed',error:'Tool sources changed during run'});else results.push({name:'Tools remained unchanged throughout independent run',status:'passed'});
const report={schema:'cqc.pass8.storage-tools-independent-regression/1',status:results.every(r=>r.status==='passed')?'passed':'failed',productionRepositoriesReadOnly:true,productionSyncRun:false,productionBuildRun:false,fixtureRoot:fixture,toolSources:toolsAfter,checks:results};
const out=path.join(base,'FINAL_REGRESSION-'+randomUUID()+'.json');await writeFile(out,JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({report:out,...report},null,2));
if(report.status!=='passed')process.exitCode=1;
