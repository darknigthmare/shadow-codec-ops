import fs from'node:fs/promises';import path from'node:path';import{createHash}from'node:crypto';import assert from'node:assert/strict';
import{discoverReferences,isRuntimePath,p48Dependencies,verifyRuntime}from'./sync-cqc-runtime.mjs';
const root=path.resolve('public/cqc');
const argument=process.argv.indexOf('--proof-dir');
const proof=path.resolve(argument>=0?process.argv[argument+1]:'docs/cqc-reprise/pass54/verification');
await fs.mkdir(proof,{recursive:true});
const baseline=path.join(proof,'P53_RUNTIME_MANIFEST_SNAPSHOT_PRIVATE_V1.json');
try{await fs.access(baseline)}catch{await fs.copyFile(path.join(root,'runtime-manifest.json'),baseline)}
const before=JSON.parse(await fs.readFile(baseline,'utf8')),old=new Map(before.files.map(r=>[r.path,r]));
async function walk(dir=''){const out=[];for(const e of await fs.readdir(path.join(root,dir),{withFileTypes:true})){const p=path.posix.join(dir,e.name);assert(!e.isSymbolicLink(),'No runtime symlinks');if(e.isDirectory())out.push(...await walk(p));else if(e.isFile()&&isRuntimePath(p))out.push(p)}return out}
const available=new Set(await walk()),external=new Set(before.externalReferences.entries.map(r=>r.from+'\0'+r.to)),used=new Set(),queue=['index.html'],rows=new Map(),refs=[],omitted=[];
const text=new Set(['.js','.mjs','.json','.css','.html']);
for(let n=0;n<queue.length;n++){
 const owner=queue[n];if(rows.has(owner))continue;const b=await fs.readFile(path.join(root,owner)),sha=createHash('sha256').update(b).digest('hex');
 const prior=old.get(owner);rows.set(owner,prior?.sha256===sha&&prior.bytes===b.length?prior:{path:owner,bytes:b.length,sha256:sha});
 if(!text.has(path.posix.extname(owner)))continue;
 const found=discoverReferences(b.toString('utf8'),owner,available),dependencies=[...new Set([...found.references,...p48Dependencies(owner,available)])].sort();
 for(const to of dependencies){refs.push({from:owner,to});if(!rows.has(to))queue.push(to)}
 for(const to of found.omittedReferences){const key=owner+'\0'+to;if(external.has(key))used.add(key);else omitted.push({from:owner,to})}
}
assert.equal(used.size,external.size,'Existing external policy stays exactly reachable');
const missingOld=before.files.filter(r=>!rows.has(r.path));assert.deepEqual(missingOld,[],'Historical runtime entry became unreachable');
assert.deepEqual(omitted.filter(r=>isRuntimePath(r.to)),[],'Missing local runtime dependency');
const entries=[...rows.values()].sort((a,b)=>a.path.localeCompare(b.path,'en'));
const next={...before,files:entries,references:refs.sort((a,b)=>(a.from+':'+a.to).localeCompare(b.from+':'+b.to,'en')),totalBytes:entries.reduce((n,r)=>n+r.bytes,0),omittedReferences:omitted.sort((a,b)=>(a.from+':'+a.to).localeCompare(b.from+':'+b.to,'en'))};
const changed=entries.filter(r=>old.has(r.path)&&JSON.stringify(old.get(r.path))!==JSON.stringify(r)).map(r=>r.path);assert(changed.every(p=>p.endsWith('.html')),'No existing binary/JS row changes');
const output=JSON.stringify(next,null,2)+'\n';await fs.writeFile(path.join(root,'runtime-manifest.json'),output);await verifyRuntime(root);
const report={status:'PASS',baseCommit:'04221faf7933b4a33cf63e3859533639f010723e',baselineFiles:before.files.length,files:entries.length,newFiles:entries.length-before.files.length,changedHistoricalPaths:changed,historicalPNGsUnchanged:true,existingExternalRoutes:external.size,sourcePolicyScriptChanged:false,manifestSHA256:createHash('sha256').update(output).digest('hex'),canonicalVerifier:'verifyRuntime(public/cqc)',qualification:'Reconciles the existing web runtime directly. The standalone-to-web workshop transformation is not reapplied over the already updated atelier.'};await fs.writeFile(path.join(proof,'P54_RUNTIME_MANIFEST_RECONCILIATION_PRIVATE_V1.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report));
