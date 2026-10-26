// PASS43 isolated candidate. The legacy pass40Revision native-batch40-v2 property is a renderer protocol retained byte-for-byte, not a claim that this art shipped in P40. No product files are modified here.
// One Root art review binds every source, role, framing value, plan, and native point.
import {readFile,writeFile,mkdir,lstat,realpath} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {gunzipSync} from 'node:zlib';
import {fileURLToPath} from 'node:url';
import {resolve,dirname,isAbsolute} from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {VISUAL_ROLE14_METHODS,reviewedVisualRole14Aliases} from './visual-role14-compiler-review/visual-role14-guard-v2.mjs';
import {VISUAL_PAGE_METHOD,reviewedVisualPageStatures} from './visual-page-stature-guard-candidate-v1.mjs';
import {BODY_LANDMARK_METHOD,reviewedBodyLandmarkHeights} from './body-landmark-height-guard-candidate-v1.mjs';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
const own=fileURLToPath(new URL('.',import.meta.url));
// Explicit roots must be configured once by the caller; no historical workspace defaults.
let root=null,app=null,measureTool=null;
let registeredNativeSources=[];
export async function configurePortableRoots({restorationRoot,appRoot}={}){
 if(root)throw Error('Portable compiler roots are already configured');
 async function directory(value){
  if(typeof value!=='string'||!isAbsolute(value)||value.includes('\0'))throw Error('Explicit absolute directory required');
  const normalized=resolve(value),stat=await lstat(normalized),physical=await realpath(normalized);
  if(!stat.isDirectory()||stat.isSymbolicLink()||physical!==normalized)throw Error('Regular canonical root directory required');
  return normalized+'/';
 }
 const owned=await directory(restorationRoot),repository=await directory(appRoot);
 if(owned===repository||owned.startsWith(repository)||repository.startsWith(owned))throw Error('Restoration and read-only app roots must be disjoint');
 root=owned;app=repository;measureTool=root+'tools/measure-owned-native.py';
 return{restorationRoot:root,appRoot:app,measureHelper:measureTool};
}
function requirePortableRoots(){if(!root||!app)throw Error('Configure explicit portable roots before reading or compiling');}
function portableReadPath(value){
 requirePortableRoots();if(typeof value!=='string'||!value||value.includes('\0')||value.includes('\\'))throw Error('Portable path string required');
 if(isAbsolute(value)){if(resolve(value)!==value)throw Error('Noncanonical absolute input path');return value;}
 if(value.split('/').some(part=>!part||part==='.'||part==='..'))throw Error('Noncanonical relative input path');
 // The immutable baseline remains in the explicitly supplied read-only app checkout.
 return value.startsWith('baseline/app/')?app+value.slice('baseline/app/'.length):root+value;
}
async function ownedConfiguration(configPath){
 requirePortableRoots();configPath=portableReadPath(configPath);if(!configPath.startsWith(root))throw Error('Configuration must be inside the explicit restoration root');
 const stat=await lstat(configPath),physical=await realpath(configPath);
 if(!stat.isFile()||stat.isSymbolicLink()||!physical.startsWith(root))throw Error('Regular owned configuration required');
 return JSON.parse(await readFile(configPath,'utf8'));
}
async function ownedOutput(target){
 requirePortableRoots();target=portableReadPath(target);if(!target.startsWith(root+'integration/'))throw Error('Output must remain inside the explicit owned integration root');
 for(let parent=dirname(target);parent!==root.slice(0,-1);parent=dirname(parent)){
  if(!parent.startsWith(root))throw Error('Output parent escaped restoration root');
  try{const stat=await lstat(parent);if(!stat.isDirectory()||stat.isSymbolicLink()||!(await realpath(parent)).startsWith(root))throw Error('Output parent is not a regular owned directory');}catch(error){if(error.code!=='ENOENT')throw error;}
 }
 try{const stat=await lstat(target);if(stat.isSymbolicLink()||!(await realpath(target)).startsWith(root))throw Error('Output target is outside the owned root or a symlink');}catch(error){if(error.code!=='ENOENT')throw error;}
 return target;
}
const sha=b=>createHash('sha256').update(b).digest('hex'),clone=x=>JSON.parse(JSON.stringify(x)),same=(a,b)=>JSON.stringify(a)===JSON.stringify(b),finite=Number.isFinite,hash=s=>typeof s==='string'&&/^[a-f0-9]{64}$/.test(s);
export async function pinned(pin,{decode=false,source=false}={}){
 if(!pin||typeof pin.path!=='string'||!Number.isInteger(pin.bytes)||pin.bytes<=0||!hash(pin.sha256))throw Error('Incomplete source pin');
 const input=portableReadPath(pin.path),stat=await lstat(input);if(!stat.isFile()||stat.isSymbolicLink())throw Error('Regular preserved file required');
 requirePortableRoots();const physical=await realpath(input);
 const registered=source&&registeredNativeSources.some(row=>row.sourcePin.path===physical&&row.sourcePin.sha256===pin.sha256&&row.sourcePin.bytes===pin.bytes);
 if(!physical.startsWith(root)&&!physical.startsWith(app)&&!registered)throw Error('Pinned input is outside explicit roots or exact native registry');
 if(source&&!registered)throw Error('Native PNG is absent from the exact current source registry');
 const bytes=await readFile(input);if(bytes.length!==pin.bytes||sha(bytes)!==pin.sha256)throw Error('Pinned bytes differ: '+pin.path);
 return decode?JSON.parse((pin.path.endsWith('.gz')?gunzipSync(bytes):bytes).toString('utf8')):bytes;
}
// Only public provenance paths are normalized; private jobs and preserved artifacts stay exact.
export function publicProvenanceSources(sources){
 requirePortableRoots();
 if(!Array.isArray(sources))throw Error('Public provenance sources must be an array');
 const result=clone(sources);
 for(const source of result){
  if(!source||typeof source!=='object'||Array.isArray(source))throw Error('Invalid public provenance source');
  if(!Object.hasOwn(source,'path'))continue;
  if(typeof source.path!=='string')throw Error('Public source path must be a project-relative string');
  const value=source.path.startsWith(root)?source.path.slice(root.length):source.path;
  if(!value||value.startsWith('/')||value.includes('\\')||value.includes('\0')||/^[A-Za-z][A-Za-z0-9+.-]*:/.test(value)||value.split('/').some(part=>!part||part==='.'||part==='..'))throw Error('Public provenance source path is outside the project or unsafe');
  source.path=value;
 }return result;
}
function pathOK(path){return typeof path==='string'&&/^assets\/[A-Za-z0-9_./-]+\.png$/.test(path)&&!path.split('/').some(x=>x==='.'||x==='..');}
function rectOK(r,width,height){return Array.isArray(r)&&r.length===4&&r.every(finite)&&r[0]>=0&&r[1]>=0&&r[2]>0&&r[3]>0&&r[0]+r[2]<=width&&r[1]+r[3]<=height;}
function roleIdentity(source,pose){return source.sha256+':'+pose.componentIDs.slice().sort((a,b)=>a-b).join(',');}
function insideNative(frame,point){const x=(point[0]-frame.rect[0])/frame.rect[2],y=(point[1]-frame.rect[1])/frame.rect[3];let winding=0;const p=frame.clipPolygon;for(let i=0;i<p.length;i++){const a=p[i],b=p[(i+1)%p.length],cross=(b[0]-a[0])*(y-a[1])-(x-a[0])*(b[1]-a[1]);if(a[1]<=y&&b[1]>y&&cross>0)winding++;else if(a[1]>y&&b[1]<=y&&cross<0)winding--;}return winding!==0;}
function withPaths(value){return JSON.stringify(value,(_key,item)=>typeof item==='string'&&/^assets\/.+\.(png|json)$/.test(item)?{nativePathParts:item.split('/')}:item);}
function expression(value){return 'JSON.parse('+JSON.stringify(withPaths(value))+',(_key,value)=>value&&Array.isArray(value.nativePathParts)?value.nativePathParts.join("/"):value)';}
const archiveRoot='https://raw.githubusercontent.com/darknigthmare/shadow-codec-ops/';
const optionKey=value=>value.uid+':'+value.id;
function pinBytes(path,bytes){return{path,bytes:bytes.length,sha256:sha(bytes)};}
// Parse the data literals emitted by this compiler. Never execute a previous index.
export function extractCompiledPayload(code){
 const read=name=>{const regex=new RegExp('\\bconst '+name+'=JSON\\.parse\\(("(?:\\\\.|[^"\\\\])*")'),matches=[...code.matchAll(new RegExp(regex.source,'g'))];if(matches.length!==1)throw Error('Previous index data literal absent or repeated: '+name);return JSON.parse(JSON.parse(matches[0][1]),(_key,value)=>value&&Array.isArray(value.nativePathParts)?value.nativePathParts.join('/'):value);};
 const commitMatches=[...code.matchAll(/\barchiveCommit=(null|"[a-f0-9]{40}")/g)];if(commitMatches.length!==1)throw Error('Previous index archive constant absent or repeated');
 const descriptors=read('entries'),bindings=read('bindings'),archiveCommit=JSON.parse(commitMatches[0][1]);if(!Array.isArray(descriptors)||!Array.isArray(bindings)||descriptors.length!==bindings.length||!descriptors.length)throw Error('Previous index entries/bindings differ');
 return{descriptors,bindings,archiveCommit};
}
export function immutableDescriptor(descriptor,archiveCommit){
 const result=clone(descriptor);delete result.assetBaseURL;
 if(!result.metadata?.path||!hash(result.metadata.sha256)||!Array.isArray(result.assets)||!result.assets.length)throw Error('Previous native descriptor is incomplete');
 if(result.metadata.url==null){if(!/^[a-f0-9]{40}$/.test(archiveCommit||''))throw Error('Previous artifact must already have immutable routes');result.metadata.url=archiveRoot+archiveCommit+'/rootassets/'+result.metadata.path;}
 const escaped=result.metadata.path.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');if(!new RegExp('^https://raw\\.githubusercontent\\.com/darknigthmare/shadow-codec-ops/[a-f0-9]{40}/rootassets/'+escaped+'$').test(result.metadata.url))throw Error('Previous metadata route is not exact and immutable');
 for(const asset of result.assets){if(!pathOK(asset.file)||!hash(asset.sha256))throw Error('Previous source descriptor is incomplete');if(asset.url==null){if(!/^[a-f0-9]{40}$/.test(archiveCommit||''))throw Error('Previous source route is absent');asset.url=archiveRoot+archiveCommit+'/raw/'+asset.sha256+'.png';}if(!new RegExp('^https://raw\\.githubusercontent\\.com/darknigthmare/shadow-codec-ops/[a-f0-9]{40}/raw/'+asset.sha256+'\\.png$').test(asset.url))throw Error('Previous PNG route does not bind its SHA');}
 return result;
}
function compareRuntimeDescriptor(observed,expected){const actual=clone(observed);delete actual.assetBaseURL;assert.deepEqual(actual,expected,'Installed previous descriptor or immutable routes changed');}
async function validatePreservedEntry(entry,descriptor,binding,contracts,{checkInstalled=false}={}){
 assert.deepEqual(entry.sourceDescriptor,descriptor,'Previous descriptor differs from its pinned index');assert.deepEqual(entry.binding,binding,'Previous binding differs from its pinned index');assert.deepEqual(entry.descriptor,immutableDescriptor(descriptor,entry.indexArchiveCommit),'Previous immutable routes changed');
 const metadataBytes=await pinned(entry.metadata),metadata=JSON.parse(metadataBytes),d=entry.descriptor,contract=contracts.entries[d.uid];
 if(!contract||metadata.schema!=='cqc.native-wardrobe-option/1'||metadata.uid!==d.uid||metadata.id!==d.id||metadataBytes.length!==d.metadata.bytes||sha(metadataBytes)!==d.metadata.sha256)throw Error('Previous metadata differs from its descriptor');
 const sprite=metadata.option?.sprite;if(metadata.option?.id!==d.id||metadata.option.family!==d.family||metadata.option.label!==d.label||!same(metadata.option.provenance,d.provenance)||metadata.artAuditSHA256!==d.review?.artAuditSHA256||sprite?.review?.artAuditSHA256!==metadata.artAuditSHA256||metadata.option.assetReview?.artAuditSHA256!==metadata.artAuditSHA256)throw Error('Previous metadata identity or art review differs');
 if(binding.uid!==d.uid||binding.id!==d.id||binding.revision!==sprite.pass40Revision||binding.artAuditSHA256!==metadata.artAuditSHA256||!same(binding.anchors,sprite.pass40Attachments||[]))throw Error('Previous native point binding changed');
 if(sprite.mirror!==false||sprite.fallbackMissingActions!==false)throw Error('Previous native facings lost independence');
 const sources=new Map((entry.sources||[]).map(s=>[s.file,s]));if(sources.size!==entry.sources?.length||sources.size!==d.assets.length)throw Error('Previous source set changed');
 for(const asset of d.assets){const source=sources.get(asset.file);if(!source||source.bytes!==asset.bytes||source.sha256!==asset.sha256||source.width!==asset.width||source.height!==asset.height)throw Error('Previous PNG pin differs from descriptor');const bytes=await pinned(source,{source:true});if(bytes.subarray(0,8).toString('hex')!=='89504e470d0a1a0a'||bytes.readUInt32BE(16)!==asset.width||bytes.readUInt32BE(20)!==asset.height)throw Error('Previous PNG dimensions changed');}
 const roles={right:new Set(),left:new Set()};for(const[side,actions]of [['right',sprite.actions],['left',sprite.oppositeActions]]){if(!actions)throw Error('Previous native facing absent');for(const group of Object.values(actions))for(const frame of group.frames){const source=sources.get(frame.file);if(!source||source.sha256!==frame.sha256||!rectOK(frame.rect,source.width,source.height)||!finite(sprite.sourceFrameHeights?.[frame.file])||sprite.sourceFrameHeights[frame.file]<=0)throw Error('Previous native frame or source scale changed');roles[side].add(frame.physicalPoseIndex);}}
 for(const side of ['right','left'])assert.deepEqual([...roles[side]].sort((a,b)=>a-b),Array.from({length:16},(_,i)=>i),'Previous physical role set changed');
 for(const anchor of binding.anchors){const m=contract.fighter.combat.moves[anchor.slot],actions=anchor.side==='right'?sprite.actions:anchor.side==='left'?sprite.oppositeActions:null;if(m?.kind!=='projectile'||m.tag!==anchor.tag||!actions?.[anchor.action]?.frames.some(f=>f.file===anchor.file&&f.sha256===anchor.sourceSHA256&&same(f.rect,anchor.rect)&&same(f.pivot,anchor.pivot)&&insideNative(f,anchor.nativeXY)))throw Error('Previous source attachment differs from its native frame or profile');}
 if(checkInstalled){if(!Array.isArray(contract.nativeIndexDescriptors))throw Error('Recapture complete nativeIndexDescriptors after installation before additive compilation');const actual=contract.nativeIndexDescriptors.filter(v=>optionKey(v)===optionKey(d));if(actual.length!==1)throw Error('Previously admitted native option is absent from the installed runtime');compareRuntimeDescriptor(actual[0],d);const option=contract.existingOptions?.[d.id];if(option?.artAuditSHA256&&option.artAuditSHA256!==metadata.artAuditSHA256)throw Error('Installed previous art audit changed');}
 return{entry,descriptor:d,binding,metadata,metadataBytes,contract};
}
export async function loadPreviousArtifact(pin,contracts,{checkInstalled=true}={}){
 const artifact=await pinned(pin,{decode:true});if(artifact.schema!=='cqc.p43.compiled-native-artifact/1'||artifact.immutable!==true||!Array.isArray(artifact.entries)||!artifact.entries.length)throw Error('An immutable previous compiled artifact is required');
 const index=await pinned(artifact.index),payload=extractCompiledPayload(index.toString('utf8'));if(payload.descriptors.length!==artifact.entries.length)throw Error('Previous artifact removed an admission');
 const before=await pinned(artifact.contracts,{decode:true}),seen=new Set(),preserved=[];
 for(const entry of artifact.entries){const key=optionKey(entry.descriptor);if(seen.has(key))throw Error('Repeated previous admission');seen.add(key);const ds=payload.descriptors.filter(d=>optionKey(d)===key),bs=payload.bindings.filter(b=>optionKey(b)===key);if(ds.length!==1||bs.length!==1||entry.indexArchiveCommit!==payload.archiveCommit)throw Error('Previous index identity/route set changed');const old=before.entries[entry.descriptor.uid],current=contracts.entries[entry.descriptor.uid];if(!old||!current||!same(old.fighter.combat,current.fighter.combat)||old.sprite.uid!==current.sprite.uid||old.sprite.displayHeight!==current.sprite.displayHeight)throw Error('Previous combat profile or stature changed');preserved.push(await validatePreservedEntry(entry,ds[0],bs[0],contracts,{checkInstalled}));}
 return{artifact,preserved};
}
export async function captureCompiledArtifact(config){
 const index=await pinned(config.index),payload=extractCompiledPayload(index.toString('utf8')),contracts=await pinned(config.contracts,{decode:true}),archive=await pinned(config.archiveFiles,{decode:true});if(archive.schema!=='cqc.p43.artifact-source-files/2'||!Array.isArray(archive.files))throw Error('Compiled source manifest absent');
 const metadataPins=new Map((config.metadata||[]).map(m=>[m.uid+':'+m.id,m.pin])),entries=[];
 for(const descriptor of payload.descriptors){const key=optionKey(descriptor),matches=payload.bindings.filter(b=>optionKey(b)===key);if(matches.length!==1)throw Error('Compiled binding set changed');const file=archive.files.find(f=>f.logicalPath===descriptor.metadata.path),metadata=metadataPins.get(key)||(file&&{path:file.path,bytes:file.bytes,sha256:file.sha256});if(!metadata)throw Error('Preserved metadata pin absent');const sources=descriptor.assets.map(a=>{const file=archive.files.find(f=>f.logicalPath===a.file);if(!file)throw Error('Preserved source path absent');return{file:a.file,path:file.path,bytes:file.bytes,sha256:file.sha256,width:a.width,height:a.height};});const entry={sourceDescriptor:clone(descriptor),descriptor:immutableDescriptor(descriptor,payload.archiveCommit),binding:clone(matches[0]),indexArchiveCommit:payload.archiveCommit,metadata,sources};await validatePreservedEntry(entry,descriptor,matches[0],contracts);entries.push(entry);}
 const artifact={schema:'cqc.p43.compiled-native-artifact/1',immutable:true,index:clone(config.index),contracts:clone(config.contracts),entries};const raw=Buffer.from(JSON.stringify(artifact)+'\n');const artifactOutput=await ownedOutput(config.output);await mkdir(dirname(artifactOutput),{recursive:true});await writeFile(artifactOutput,raw);return pinBytes(artifactOutput,raw);
}

export function validateSelectedActionPlan(plan,contract=null){
 if(!Object.hasOwn(plan,'selectedActionBySlot'))return false;
 const mapping=plan.selectedActionBySlot;
 if(!mapping||typeof mapping!=='object'||Array.isArray(mapping))throw Error('Selected action map must be an explicit object');
 const slots=Object.keys(plan.actionMap||{}).sort();
 assert.deepEqual(Object.keys(mapping).sort(),slots,'Selected action map must expose exactly the original slot set');
 if(contract){
  assert.deepEqual(plan.actionMap,contract.sprite.actionMap,'Selected action plan must preserve the original native-gate actionMap');
  assert.deepEqual(slots,Object.keys(contract.fighter.combat.moves).sort(),'Selected action slot set differs from the captured combat profile');
  for(const action of Object.keys(contract.sprite.actions||{}))if(!plan.actions?.[action]?.roles?.length)throw Error('Original native action group absent: '+action);
 }
 for(const slot of slots){
  const name=mapping[slot],group=typeof name==='string'&&plan.actions?.[name];
  if(!name||!group||!Array.isArray(group.roles)||!group.roles.length||group.roles.some(role=>!Number.isInteger(role)||role<0||role>15))throw Error('Selected action references absent physical roles: '+slot);
 }
 return true;
}
export function expectedActiveRole(plan,slot,progress){const explicit=validateSelectedActionPlan(plan),name=(explicit?plan.selectedActionBySlot:plan.actionMap)?.[slot],group=plan.actions?.[name];if(!group?.roles?.length)throw Error('Declared visual move group absent: '+slot);const phase=plan.phaseMap?.[name]?.active,index=phase?phase[Math.min(phase.length-1,Math.floor(Math.max(0,Math.min(1,progress))*phase.length))]:0,role=group.roles[index];if(!Number.isInteger(role))throw Error('Declared visual role absent: '+slot);return role;}
export function assertSelectedRole(plan,slot,progress,selected){const expected=expectedActiveRole(plan,slot,progress);assert.equal(selected?.frame?.physicalPoseIndex,expected,'Actual renderer selected a different physical role from the reviewed move plan: '+slot);if(Object.hasOwn(plan,'selectedActionBySlot'))assert.equal(selected?.action,plan.selectedActionBySlot[slot],'Actual renderer selected a different action from the reviewed per-slot plan: '+slot);}
export function proposedPlan(contract){
 const base=contract.sprite,actions={};
 const activeRoles={punch:6,attack:6,heavy:6,low:7,throw:8,deploy:9,shoot:11,reload:12,blade:10,charge:6,optic:1,parry:1,recover:12};
 for(const[name,group]of Object.entries(base.actions)){let roles;if(name==='idle')roles=group.frames.map(()=>0);else if(name==='guard')roles=group.frames.map(()=>1);else if(name==='walk')roles=group.frames.map((_x,i)=>2+i%2);else if(name==='crouch')roles=group.frames.map(()=>4);else if(name==='jump')roles=group.frames.map(()=>5);else if(name==='hit')roles=group.frames.map(()=>13);else if(name==='ko')roles=group.frames.map(()=>14);else if(name==='roll')roles=group.frames.map(()=>15);else{const count=group.frames.length,active=base.phaseMap?.[name]?.active||[Math.min(1,count-1)];roles=group.frames.map((_x,i)=>active.includes(i)?activeRoles[name]??1:name==='low'?4:1);}actions[name]={fps:group.fps,loop:group.loop,roles};}
 // Repeated temporal frames are explicit. These plans never create extra drawings.
 actions.shoot={fps:10,loop:false,roles:[1,11,1]};actions.deploy={fps:6,loop:false,roles:[1,8,9,1]};
 actions.reload||={fps:4,loop:false,roles:[12]};actions.jump||={fps:0,loop:false,roles:[5]};actions.roll||={fps:0,loop:false,roles:[15]};actions.blade||={fps:9,loop:false,roles:[1,10,1]};actions.heavy||={fps:9,loop:false,roles:[1,6,1]};
 const actionMap=clone(base.actionMap||{});
 for(const[slot,m]of Object.entries(contract.fighter.combat.moves)){
  if(m.kind==='projectile')actionMap[slot]=['ballistic','precision','tranq','fire'].includes(m.tag)?'shoot':['blade','knife','boomerang'].includes(m.tag)?'blade':'deploy';
  else if(m.kind==='melee'&&['blade','knife','machete','spear','tentacle'].includes(m.tag))actionMap[slot]='blade';
  else if(m.kind==='reload')actionMap[slot]='reload';
 }
 const phaseMap=clone(base.phaseMap||{});phaseMap.shoot={startup:[0],active:[1],recovery:[2]};phaseMap.deploy={startup:[0,1],active:[2],recovery:[3]};for(const name of ['blade','heavy'])if(!phaseMap[name]&&actions[name]?.roles.length===3)phaseMap[name]={startup:[0],active:[1],recovery:[2]};
 return{actions,actionMap,phaseMap,scope:'Unreviewed visual proposal; original combat timings and move profiles stay unchanged.'};
}
export function reviewedCyborgPolicy(job,audit){
 if(job.family!=='cyborg')return{};
 const concept=job.concept,criteria={artDirection:'metal-gear-rising-revengeance',anatomy:'full-body-cybernetic-reconstruction',cyberneticBody:true};
 if(!concept||Object.entries(criteria).some(([key,value])=>concept[key]!==value))throw Error('Reviewed cyborg lacks the existing full MGR body criteria');
 if(!Array.isArray(concept.identityCodes)||concept.identityCodes.length<2||concept.identityCodes.some(value=>typeof value!=='string'||!value.trim()))throw Error('Reviewed cyborg lacks personalized identity codes');
 const checks=['MGRDesignReviewed','fullCyberneticBodyReviewed','personalizedDesignReviewed'];
 if(checks.some(key=>audit.checks?.[key]!==true))throw Error('Explicit Root MGR body and identity reviews are required');
 return Object.fromEntries(checks.map(key=>[key,true]));
}
// Explicitly unmapped artifact groups remain owned/measured but do not count as native body figures.
export function countPhysicalSourceFigures(geometry){return geometry.sources.reduce((n,source)=>n+source.poses.filter(pose=>pose.candidateUsage!=='held-unmapped').length,0);}
export function assemble(job,audit,contract,geometry,assets,{inputSHA256=null}={}){
 if(job.schema!=='cqc.p42.native-costume-job/2'||audit.schema!=='cqc.p42.root-art-review/2'||audit.status!=='approved'||!audit.reviewer?.startsWith('Root')||!audit.reviewedAt)throw Error('An explicit current Root art review is required');
 for(const key of ['identity','incarnation','nativeArt','semanticPoses','equipment','ownership','framing'])if(audit.checks?.[key]!==true)throw Error('Root art check absent: '+key);
 if(job.uid!==contract.fighter.uid||job.uid!==contract.sprite.uid||job.provenance.sourceUID!==job.uid||job.provenance.sourceSpriteUID!==job.uid)throw Error('Incarnation changed');
 validateSelectedActionPlan(job.plan,contract);
 const cyborgPolicyReview=reviewedCyborgPolicy(job,audit);
 if(geometry.approved!==false||geometry.sourcePNGMutations!==false||geometry.canvasNonzeroPixelCentreCoverageChecked!==true)throw Error('Unmodified source geometry evidence absent');
 const sourceByPath=new Map(geometry.sources.map(s=>[s.path,s])),assetMap=new Map(assets.map(a=>[a.key,a]));if(assetMap.size!==assets.length||new Set(assets.map(a=>a.file)).size!==assets.length||assets.length>48)throw Error('Repeated or excessive source aliases');
 const visualAliases=reviewedVisualRole14Aliases(job,audit,assets,geometry,inputSHA256);
 const visualPages=reviewedVisualPageStatures(job,audit,assets,geometry,inputSHA256,root);
 const bodyLandmarks=reviewedBodyLandmarkHeights(job,audit,assets,geometry,inputSHA256);
 const frames={right:[],left:[]},roleKeys=new Set(),directions=[];const sourceHeights={};
 for(const asset of assets){
  if(!pathOK(asset.file)||!asset.file.startsWith('assets/combat-costumes-pass43/'+job.uid+'/'+job.id+'/')||!finite(asset.standingHeight)||asset.standingHeight<=0||asset.standingHeight>Math.max(asset.width,asset.height))throw Error('Invalid fixed native source height');
  const source=sourceByPath.get(asset.path);if(!source||source.sha256!==asset.sha256||!same(source.dimensions,[asset.width,asset.height]))throw Error('Geometry does not bind source');
  const calibration=asset.calibration;if(!calibration||!['same-page-neutral','reviewed-anatomical-transfer'].includes(calibration.method)&&!VISUAL_ROLE14_METHODS.has(calibration.method)&&calibration.method!==VISUAL_PAGE_METHOD&&calibration.method!==BODY_LANDMARK_METHOD)throw Error('Source calibration absent');
  if(calibration.method==='same-page-neutral'){
   const neutral=source.poses.find(p=>p.name===calibration.pose);if(!neutral||Math.abs(asset.standingHeight-neutral.nativeAlphaBounds[3])>.05)throw Error('Neutral height differs from its native evidence');
  }else if(bodyLandmarks.has(asset.key)){
   // Exact reviewed source head/heel points, not weapon extent or an anatomical transfer.
  }else if(visualPages.has(asset.key)){
   // Exact Root-reviewed whole-page visual display fit; never an anatomical transfer.
  }else if(visualAliases.has(asset.key)){
   // Exact Root-listed role14 visual compromise; never an anatomical certificate.
  }else if(!Array.isArray(calibration.landmarkPairs)||calibration.landmarkPairs.length<2||!finite(calibration.tolerance)||calibration.tolerance<=0||!calibration.scope?.trim())throw Error('Qualified anatomical transfer needs two reviewed landmark pairs and tolerance');
  sourceHeights[asset.file]=asset.standingHeight;
 }
 for(const side of ['right','left']){
  if(!Array.isArray(job.roles?.[side])||job.roles[side].length!==16)throw Error('Exactly sixteen independently drawn roles per facing are required');
  for(let index=0;index<16;index++){
   const mapping=job.roles[side][index],asset=assetMap.get(mapping.asset),source=asset&&sourceByPath.get(asset.path),pose=source?.poses.find(p=>p.name===mapping.pose&&p.side===side);
   if(!pose||pose.holdReasons?.length||['held','held-unmapped'].includes(pose.candidateUsage)||pose.side!==side||pose.ownPixelsLost!==0||pose.foreignPixelsKept!==0||pose.opaqueCanvasEdgePixels!==0)throw Error('Mapped source is held, clipped, foreign, or unowned');
   const identity=roleIdentity(source,pose);if(roleKeys.has(identity))throw Error('A physical drawing cannot manufacture a second semantic role');roleKeys.add(identity);
   if(!rectOK(pose.rect,asset.width,asset.height))throw Error('Native rectangle outside source');
   const pivot=mapping.pivot;if(!Array.isArray(pivot)||pivot.length!==2||pivot.some(x=>!finite(x)||x<0||x>1))throw Error('Reviewed source ground/body axis missing');
   if(asset.standingHeight>asset.height&&(index!==14||pose.rect[2]<=pose.rect[3]*1.2||asset.calibration.method!=='reviewed-anatomical-transfer'))throw Error('Height above canvas is allowed only for a reviewed horizontal KO transfer');
   const frame={file:asset.file,sha256:asset.sha256,rect:clone(pose.rect),pivot:clone(pivot),clipPolygon:clone(pose.clipPolygon),physicalPoseIndex:index,nativePoseKey:side+':'+pose.name};
   if(index===0){const preview=mapping.preview;if(!preview||!finite(preview.datumX)||preview.datumX<0||preview.datumX>pose.rect[2]||!rectOK(preview.bodyBounds,pose.rect[2],pose.rect[3]))throw Error('Independent preview pelvis and stature bounds missing');const[x,y,w,h]=preview.bodyBounds;frame.previewDatumX=preview.datumX;frame.previewStatureBounds={left:x,top:y,right:x+w,bottom:y+h};}
   frames[side].push(frame);directions.push({file:frame.file,sha256:frame.sha256,face:side==='right'?1:-1,rect:clone(frame.rect),physicalSourceSHA256:source.sha256,componentIDs:clone(pose.componentIDs)});
  }
 }
 // Same PNG may hold real R/L drawings; their exact physical regions must be disjoint.
 for(let a=0;a<directions.length;a++)for(let b=a+1;b<directions.length;b++){const x=directions[a],y=directions[b];if(x.face===y.face||x.physicalSourceSHA256!==y.physicalSourceSHA256)continue;const[p,q,w,h]=x.rect,[r,s,u,v]=y.rect;if(p<r+u&&r<p+w&&q<s+v&&s<q+h)throw Error('Opposing native source regions overlap');}
 const sprite={};for(const key of ['uid','name','game','incarnation','displayHeight'])sprite[key]=clone(contract.sprite[key]);
 Object.assign(sprite,{incarnation:job.provenance.incarnation||contract.sprite.incarnation,coverage:'action-frames',facing:1,mirror:false,fallbackMissingActions:false,renderStyle:job.family==='retro'?'pixel':'painted',pass40Revision:'native-batch40-v2',actionMap:clone(job.plan.actionMap),phaseMap:clone(job.plan.phaseMap),baseFrameHeight:assetMap.get(job.roles.right[0].asset).standingHeight,sourceFrameHeights:sourceHeights,nativeDirectionRegions:{schema:'cqc.native-direction-regions/1',uid:job.uid,regions:directions.map(({physicalSourceSHA256,componentIDs,...r})=>r)}});
 if(job.family!=='canonical')sprite.pass21Revision='native-'+(job.family==='cyborg'?'cyborg-mgr':job.family)+'-v1';
 sprite.costumeConcept={schema:'cqc.costume-design/1',sourceUID:job.uid,family:job.family,originalDesign:job.family!=='canonical',canonicalAppearanceAttested:job.family==='canonical',...(job.concept||{})};
 for(const[side,key]of [['right','actions'],['left','oppositeActions']]){sprite[key]={};for(const[name,group]of Object.entries(job.plan.actions)){if(!Array.isArray(group.roles)||!group.roles.length||group.roles.some(i=>!Number.isInteger(i)||i<0||i>15))throw Error('Invalid visual action role');sprite[key][name]={fps:group.fps,loop:group.loop,frames:group.roles.map(i=>clone(frames[side][i]))};}}
 sprite.review={status:'approved',reviewer:audit.reviewer,reviewedAt:audit.reviewedAt,sourceKind:job.family==='canonical'?'official-art-reference':'original-character',sources:publicProvenanceSources(job.provenance.sources),checks:Object.fromEntries(['identity','costume','equipment','anatomicalSides','singleFigure','transparentBackground'].map(k=>[k,true])),limits:clone(audit.limits),artAuditSHA256:job.artAuditSHA256};
 const option={id:job.id,label:job.label,family:job.family,provenance:{...clone(job.provenance),sources:publicProvenanceSources(job.provenance.sources)},sprite,assetReview:{status:'verified',independentArt:true,reviewer:audit.reviewer,reviewedAt:audit.reviewedAt,artAuditSHA256:job.artAuditSHA256,allDirectionsReviewed:true,physicalPoseCount:countPhysicalSourceFigures(geometry),mappedSemanticRoles:32,temporalFramesAreNotAdditionalDrawings:true,...cyborgPolicyReview}};
 if(job.physicalExtent)option.physicalExtent=clone(job.physicalExtent);
 const anchors=[];
 for(const input of job.anchors||[]){const move=contract.fighter.combat.moves[input.slot];if(move?.kind!=='projectile'||!['right','left'].includes(input.side)||!Number.isInteger(input.roleIndex)||input.roleIndex<0||input.roleIndex>15)throw Error('Invented native projectile point');const frame=frames[input.side][input.roleIndex];const xy=input.nativeXY;if(!Array.isArray(xy)||xy.length!==2||!xy.every(finite)||xy[0]<frame.rect[0]||xy[0]>frame.rect[0]+frame.rect[2]||xy[1]<frame.rect[1]||xy[1]>frame.rect[1]+frame.rect[3]||!input.socket?.trim()||!insideNative(frame,xy))throw Error('Unreviewed native source point outside its owned opaque pixels');if(input.rearNativeXY){const rear=input.rearNativeXY;if(!Array.isArray(rear)||rear.length!==2||!rear.every(finite)||!insideNative(frame,rear)||(xy[0]-rear[0])*(input.side==='right'?1:-1)<=0||Math.abs(Math.atan2(xy[1]-rear[1],Math.abs(xy[0]-rear[0]))*180/Math.PI)>12)throw Error('Native firearm axis does not match its actual horizontal shot');}anchors.push({side:input.side,slot:input.slot,tag:move.tag,action:input.action,file:frame.file,sourceSHA256:frame.sha256,rect:clone(frame.rect),pivot:clone(frame.pivot),nativeXY:clone(xy),socket:input.socket,...(input.rearNativeXY?{rearNativeXY:clone(input.rearNativeXY)}:{})});}
 const hasProjectiles=Object.values(contract.fighter.combat.moves).some(m=>m.kind==='projectile');if(hasProjectiles?audit.checks.selectedWeaponPoints!==true:audit.checks.selectedWeaponPoints!=='not-applicable-no-projectiles')throw Error('Native point review scope differs from final move profiles');
 sprite.pass40Attachments=clone(anchors);
 return{option,binding:{uid:job.uid,id:job.id,revision:sprite.pass40Revision,artAuditSHA256:job.artAuditSHA256,anchors},frames,physicalRoles:roleKeys.size};
}

// The new lot is independently pinned; an old lot or a free-form allow-list cannot admit art.
export function validateFixedManifest(manifest){
 if(manifest?.schema!=='cqc.p43.batch30-manifest/1'||!Array.isArray(manifest.entries)||manifest.entries.length!==30)throw Error('Exactly thirty pinned next-lot entries are required');
 const ids=new Set();
 for(const e of manifest.entries){
  if(!e||!['costume','character','machine'].includes(e.kind)||typeof e.entryID!=='string'||!e.entryID||ids.has(e.entryID)||typeof e.uid!=='string'||!/^[a-zA-Z0-9_]+$/.test(e.uid))throw Error('Invalid or repeated fixed-lot identity');
  const expected=e.kind==='costume'?'costume:'+e.uid+':'+e.id:e.kind+':'+e.uid;
  if(e.entryID!==expected||e.kind==='costume'&&(typeof e.id!=='string'||!/^[a-z0-9][a-z0-9-]*$/.test(e.id)))throw Error('Entry ID must bind the exact incarnation and option');
  ids.add(e.entryID);
 }
 return new Set(manifest.entries.filter(e=>e.kind==='costume').map(e=>e.entryID));
}


export function validateContractsForManifest(contracts,manifest,manifestPin){
 validateFixedManifest(manifest);
 if(contracts?.schema!=='cqc.p43.final-runtime-contracts/1'||contracts.readOnly!==true||contracts.productMutations!==false||!Array.isArray(contracts.baselineFiles)||!contracts.baselineFiles.length)throw Error('A current read-only P43 browser contract capture is required');
 if(contracts.manifest?.sha256!==manifestPin?.sha256||contracts.manifest?.bytes!==manifestPin?.bytes)throw Error('Browser contracts do not bind the exact fixed lot manifest');
 const expected=[...new Set(manifest.entries.filter(e=>e.kind==='costume').map(e=>e.uid))].sort();
 assert.deepEqual(Object.keys(contracts.entries||{}).sort(),expected,'Browser contract identities differ from the fixed costume lot');
 assert.deepEqual([...(contracts.originalUIDsCaptured||[])].sort(),expected,'Captured incarnation set differs from the fixed lot');
}


export function validateAdditiveBaseline(contracts,template,indexCode,bindingCode,newCount){
 const baseline=clone(contracts.nativeIndexDescriptors);if(!Array.isArray(baseline)||baseline.length!==218)throw Error('Current exact 218-entry VS baseline required');
 const original=clone(baseline),sentinelCalls=[];const fixture=vm.createContext({URL,console,CQC_NATIVE_WARDROBE_INDEX:{schema:'cqc.native-wardrobe-index/1',entries:baseline},CQC_PASS19_NATIVE_ORIGINS:{projectile(p,m,o){const result={uid:p.f.uid,id:p.f.costume,tag:m.tag,unchangedToken:37};sentinelCalls.push(result);return result;}},document:{baseURI:'http://p43.invalid/cqc/'}});
 vm.runInContext(indexCode,fixture);const next=clone(fixture.CQC_NATIVE_WARDROBE_INDEX.entries);
 assert.equal(next.length,original.length+newCount);assert.deepEqual(next.slice(0,original.length),original,'Existing 218 descriptors, metadata and source routes changed');
 for(const old of original){const actual=next.filter(v=>v.uid===old.uid&&v.id===old.id);assert.equal(actual.length,1);assert.deepEqual(actual[0],old);const result=fixture.CQC_PASS19_NATIVE_ORIGINS.projectile({f:{uid:old.uid,costume:old.id}},{kind:'projectile',tag:'sentinel-test'},{});assert.deepEqual(clone(result),{uid:old.uid,id:old.id,tag:'sentinel-test',unchangedToken:37});}
 assert.equal(sentinelCalls.length,218);return{status:'PASS',baselineEntries:218,newEntries:newCount,descriptorsAndImmutableRoutesByteEquivalent:true,priorSourceMetadataRecompiled:false,legacyKeyDelegationCases:218,qualification:'Exact current index preservation and sentinel delegation; not a new validation of old source bitmap geometry or all old match emissions.'};
}

export async function compile(configPath){
 const config=await ownedConfiguration(configPath);if(config.schema!=='cqc.p43.native-batch-compile/2'||!Array.isArray(config.jobs)||!config.jobs.length&&!config.previousArtifact)throw Error('Compile configuration absent');
 if(config.archiveCommit!=null&&!/^[a-f0-9]{40}$/.test(config.archiveCommit))throw Error('An immutable archive commit is required');
 const contracts=await pinned(config.contracts,{decode:true}),manifest=await pinned(config.manifest,{decode:true});validateContractsForManifest(contracts,manifest,config.manifest);for(const file of contracts.baselineFiles)await pinned(file);
 const registryPins=[config.sourceRegistry,...(config.additionalSourceRegistries||[])];registeredNativeSources=[];
 for(const registryPin of registryPins){const registry=await pinned(registryPin,{decode:true});if(!Array.isArray(registry.entries))throw Error('Positive source registry entries absent');for(const row of [...registry.entries,...(registry.additionalUnarchivedOriginals||[])]){const p=row.sourcePin;if(!p||typeof p.path!=='string'||!hash(p.sha256)||!Number.isInteger(p.bytes)||p.bytes<=0||!manifest.entries.some(e=>e.uid===row.uid&&e.id===row.id))throw Error('Unbound positive source registry entry');registeredNativeSources.push({uid:row.uid,id:row.id,sourcePin:{path:p.path,bytes:p.bytes,sha256:p.sha256}});}}
 const previous=config.previousArtifact?await loadPreviousArtifact(config.previousArtifact,contracts):null;
 if(previous?.preserved?.some(p=>p.descriptor.uid==='core__sam'&&p.descriptor.id==='mgr-breathing-mask-closed'))throw Error('Preserved Sam artifact lacks its exact source visual plan; provide the currently reviewed Sam job instead of carrying this option');
 const carried=(previous?.preserved||[]).map(p=>({...p,job:{uid:p.descriptor.uid,id:p.descriptor.id},option:p.metadata.option,assets:p.entry.sources,physicalRoles:32,preserved:true}));
 const allowed=validateFixedManifest(manifest);
 const prepared=[],keySet=new Set(carried.map(p=>'costume:'+p.job.uid+':'+p.job.id));
 for(const spec of config.jobs){const jobRaw=await pinned(spec.input),job=JSON.parse(jobRaw),auditRaw=await pinned(spec.review),audit=JSON.parse(auditRaw);if(audit.inputSHA256!==sha(jobRaw))throw Error('Root art review does not bind this exact job');job.artAuditSHA256=sha(auditRaw);
  const key='costume:'+job.uid+':'+job.id;if(!allowed.has(key)||keySet.has(key))throw Error('Option outside fixed batch, repeated, or already preserved');keySet.add(key);
  const contract=contracts.entries[job.uid];if(!contract)throw Error('Final runtime profile absent');if(contract.existingOptions[job.id]||contract.nativeDescriptors.some(e=>e.id===job.id))throw Error('Existing option must be explicitly versioned, never overwritten');
  const geometry=await pinned(job.geometry,{decode:true}),book=await pinned(job.ownershipBook);if(geometry.ownershipBookSHA256!==sha(book))throw Error('Geometry ownership book changed');
  await pinned({path:measureTool,bytes:5212,sha256:'588cb8e3b7bfafd375cf8a055ef95065c666cf164522bd6a270ebd4679acc745'});const proofDir=root+'integration/recomputed-ownership';await ownedOutput(proofDir);await mkdir(proofDir,{recursive:true});const proofPath=proofDir+'/'+sha(book)+'.json.gz';await promisify(execFile)('python',[measureTool,portableReadPath(job.ownershipBook.path),'--output',proofPath],{cwd:root,maxBuffer:1024*1024});const recomputed=JSON.parse(gunzipSync(await readFile(proofPath)).toString('utf8'));assert.deepEqual(recomputed,geometry,'Geometry must reproduce from real native alpha and explicit ownership');
  const assets=[];for(const asset of job.assets){if(!registeredNativeSources.some(r=>r.uid===job.uid&&r.id===job.id&&r.sourcePin.path===asset.path&&r.sourcePin.sha256===asset.sha256&&r.sourcePin.bytes===asset.bytes))throw Error('Native source registry changed incarnation or option');const bytes=await pinned(asset,{source:true});if(bytes.subarray(0,8).toString('hex')!=='89504e470d0a1a0a'||bytes.readUInt32BE(16)!==asset.width||bytes.readUInt32BE(20)!==asset.height)throw Error('Native PNG header/dimensions differ');assets.push(asset);}
  await promisify(execFile)('python',[own+'validate-body-landmark-alpha-candidate-v1.py',portableReadPath(spec.input.path)],{cwd:root,maxBuffer:1024*1024});
  const built=assemble(job,audit,contract,geometry,assets,{inputSHA256:sha(jobRaw)});prepared.push({job,audit,contract,assets,...built});
 }
 const all=[...carried,...prepared];
 const makeFixture=async()=>{const fixture=vm.createContext({URL,console,CQC_NATIVE_WARDROBE_INDEX:{schema:'cqc.native-wardrobe-index/1',entries:[]},CQC_COMBAT_SPRITE_CATALOG:{schema:'cqc.combat-sprites/1',entries:Object.fromEntries(all.map(p=>[p.job.uid,clone(p.contract.sprite)]))},CQC_PASS19_COSTUME_REQUEST_DATA:{entries:Object.fromEntries(all.map(p=>[p.job.uid,{requests:[]}]))},CQC_PASS19_VERSUS_SPATIAL:{poseFor:()=>({attackPhase:'active',phaseProgress:0})},CQC_PASS19_NATIVE_ORIGINS:{projectile(){throw Error('A reviewed P43 projectile reached a legacy origin');}}});vm.runInContext(await readFile(app+'src/cqc-sprite-renderer.js','utf8'),fixture);vm.runInContext(await readFile(app+'src/cqc-pass19-costumes.js','utf8'),fixture);vm.runInContext(await readFile(app+'src/cqc-pass21-wardrobe-policy.js','utf8'),fixture);for(const p of all){if(p.job.family==='cyborg')assert.equal(fixture.CQC_PASS21_WARDROBE_POLICY.cyborgReason(p.job.uid,p.option),null,'Compiled cyborg must pass the actual unchanged wardrobe policy');assert.equal(fixture.CQC_COMBAT_SPRITES.validateCostumeEntry(p.job.uid,p.option.sprite),true);assert.equal(fixture.CQC_PASS19_COSTUMES.validateOption(p.job.uid,p.option),true);}fixture.CQC_PASS19_COSTUMES.registerBatch(all.map(p=>({uid:p.job.uid,option:p.option})));return fixture;};
 const fixture=await makeFixture(),originTemplate=await readFile(own+'native-origins.template.js','utf8');const visualRows=all.flatMap(p=>(p.job.plan?.runtimeSelectionOverrides||[]).map(r=>({...r,artAuditSHA256:p.job.artAuditSHA256})));for(const r of visualRows)if(r.uid!=='core__sam'||r.id!=='mgr-breathing-mask-closed'||r.slot!=='specialForward'||r.kind!=='buff'||r.action!=='charge'||JSON.stringify(r.roles)!=='[9,9,1]')throw Error('Visual override outside reviewed exact Sam plan');const visualTemplate=await readFile(own+'native-visual-actions.template.js','utf8'),bindingCode=originTemplate.replace('/* REVIEWED_BINDINGS */null',expression(all.map(p=>p.binding)))+'\n'+visualTemplate.replace('/* REVIEWED_VISUAL_OVERRIDES */null',expression(visualRows));vm.runInContext(bindingCode,fixture);
 let previousFixture;if(previous){previousFixture=await makeFixture();vm.runInContext((await pinned(previous.artifact.index)).toString('utf8'),previousFixture);}
 const projectileCases=[];let selectedFrameCases=0,preservedProjectileCases=0;
 for(const p of all)for(const[slot,move]of Object.entries(p.contract.fighter.combat.moves))for(const face of [1,-1]){
  const entry=fixture.CQC_COMBAT_SPRITES.getEntry(p.job.uid,{costume:p.job.id}),direction=face===entry.facing?entry.actions:entry.oppositeActions;
  for(const progress of [0,.5,1]){selectedFrameCases++;
   const selected=fixture.CQC_COMBAT_SPRITES.selectFrame({...entry,actions:direction},{moveSlot:slot,moveKind:move.kind,moveTag:move.tag,attack:true,animationActive:true,attackPhase:'active',phaseProgress:progress});if(!selected?.frame)throw Error('Final move has no selected native frame');if(!p.preserved)assertSelectedRole(p.job.plan,slot,progress,selected);
   if(move.kind==='projectile'){const actor={f:{uid:p.job.uid,costume:p.job.id},face,attack:{name:slot}};fixture.CQC_PASS19_VERSUS_SPATIAL.poseFor=()=>({attackPhase:'active',phaseProgress:progress});const result=fixture.CQC_PASS19_NATIVE_ORIGINS.projectile(actor,move);assert.ok(result?.sourceSHA256);if(p.preserved){previousFixture.CQC_PASS19_VERSUS_SPATIAL.poseFor=()=>({attackPhase:'active',phaseProgress:progress});const before=previousFixture.CQC_PASS19_NATIVE_ORIGINS.projectile(actor,move);assert.deepEqual(clone(result),clone(before),'Previously admitted selected source point changed');preservedProjectileCases++;}projectileCases.push({uid:p.job.uid,id:p.job.id,preserved:p.preserved===true,slot,face,progress,selectedAction:selected.action,selectedFrameIndex:selected.index,...clone(result)});}
  }
 }
 let allPhaseSelectedCases=0;
 for(const p of all)if(!p.preserved)for(const [slot,move]of Object.entries(p.contract.fighter.combat.moves))for(const face of [1,-1])for(const phase of ['startup','active','recovery'])for(const progress of [0,.5,1]){
  const entry=fixture.CQC_COMBAT_SPRITES.getEntry(p.job.uid,{costume:p.job.id}),actions=face===entry.facing?entry.actions:entry.oppositeActions,selected=fixture.CQC_COMBAT_SPRITES.selectFrame({...entry,actions},{moveSlot:slot,moveKind:move.kind,moveTag:move.tag,attack:true,animationActive:true,attackPhase:phase,phaseProgress:progress}),name=p.job.plan.selectedActionBySlot[slot],group=p.job.plan.actions[name],indices=p.job.plan.phaseMap[name]?.[phase],raw=Math.floor(0*group.fps),index=indices?indices[Math.min(indices.length-1,Math.floor(progress*indices.length))]:group.loop?raw%group.roles.length:Math.min(raw,group.roles.length-1);
  assert.equal(selected.action,name,'Actual selected action differs at '+slot+'/'+phase);assert.equal(selected.frame.physicalPoseIndex,group.roles[index],'Actual source role differs at '+slot+'/'+phase);allPhaseSelectedCases++;
 }
 const out=await ownedOutput(config.output);if(typeof out!=='string'||!out.startsWith(root+'integration/'))throw Error('Compile output must be a new isolated P43 integration directory');try{await lstat(out);throw Error('Compile output already exists; preserve it and choose a new directory');}catch(error){if(error.code!=='ENOENT')throw error;}await mkdir(out,{recursive:true});const descriptors=carried.map(p=>clone(p.descriptor)),archiveFiles=[];
 for(const p of carried){archiveFiles.push({logicalPath:p.descriptor.metadata.path,...p.entry.metadata},...p.assets.map(a=>({logicalPath:a.file,path:a.path,bytes:a.bytes,sha256:a.sha256})));}
 for(const p of prepared){const prefix='assets/combat-costumes-pass43/'+p.job.uid+'/'+p.job.id+'/',metadata={schema:'cqc.native-wardrobe-option/1',uid:p.job.uid,id:p.job.id,artAuditSHA256:p.job.artAuditSHA256,option:p.option},raw=Buffer.from(JSON.stringify(metadata)+'\n'),name=p.job.uid+'--'+p.job.id+'--metadata-v2.json',path=out+'/'+name;if(raw.length>4*1024*1024)throw Error('Metadata exceeds existing native wardrobe bound');await writeFile(path,raw);const metadataPath=prefix+'metadata-v2.json';const pins=p.assets.map(a=>({file:a.file,bytes:a.bytes,sha256:a.sha256,width:a.width,height:a.height}));const preview=clone(p.frames.right[0]);descriptors.push({uid:p.job.uid,id:p.job.id,label:p.job.label,family:p.job.family,provenance:p.option.provenance,review:{status:'approved',reviewer:p.audit.reviewer,reviewedAt:p.audit.reviewedAt,artAuditSHA256:p.job.artAuditSHA256},metadata:{path:metadataPath,bytes:raw.length,sha256:sha(raw)},assets:pins,preview});archiveFiles.push({logicalPath:metadataPath,path,bytes:raw.length,sha256:sha(raw)},...p.assets.map(a=>({logicalPath:a.file,path:a.path,bytes:a.bytes,sha256:a.sha256})));}
 const template=await readFile(own+'native-index.template.js','utf8'),code=template.replace('/* REVIEWED_DESCRIPTORS */null',expression(descriptors)).replace('/* IMMUTABLE_ARCHIVE_COMMIT */null',JSON.stringify(config.archiveCommit||null))+'\n'+bindingCode,indexPath=out+'/cqc-pass43-native-batch-index-v1.js',archivePath=out+'/ARCHIVE_FILES.json',archiveBytes=Buffer.from(JSON.stringify({schema:'cqc.p43.artifact-source-files/2',files:archiveFiles},null,2)+'\n');await writeFile(indexPath,code);await writeFile(archivePath,archiveBytes);
 let artifactPin=null;if(config.archiveCommit||!prepared.length)artifactPin=await captureCompiledArtifact({index:pinBytes(indexPath,Buffer.from(code)),archiveFiles:pinBytes(archivePath,archiveBytes),contracts:config.contracts,output:out+'/COMPILED_ARTIFACT.json'});
 const additivePreservation=validateAdditiveBaseline(contracts,template,code,bindingCode,descriptors.length);
 const report={additivePreservation,schema:'cqc.p43.native-batch-compile-report/2',status:'compiled-explicitly-reviewed-art-browser-match-QA-still-required',options:all.map(p=>({uid:p.job.uid,id:p.job.id,preserved:p.preserved===true,physicalRoles:p.physicalRoles,sourceAliases:p.assets.length,physicalSourcePNGs:new Set(p.assets.map(a=>a.sha256)).size})),newOptions:prepared.length,preservedOptions:carried.length,previousArtifact:config.previousArtifact||null,preservedMetadataRecompiled:false,preservedImmutableRoutesByteIdentical:true,metadataCount:descriptors.length,indexBytes:Buffer.byteLength(code),indexSHA256:sha(Buffer.from(code)),compiledArtifact:artifactPin,actualRendererAndCostumeValidatorsPassed:true,actualFinalMoveSelectedFrameCases:selectedFrameCases,actualAllPhaseSelectedFrameCases:allPhaseSelectedCases,preservedProjectileCases,projectileCases,PNGModified:false,productMutations:false,archiveCommit:config.archiveCommit||null,pending:['physical-browser-contact-and-menu','actual-match-emissions-both-facings','product-install-and-publication']};await writeFile(out+'/COMPILE_REPORT.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({status:report.status,newOptions:prepared.length,preservedOptions:carried.length,indexSHA256:report.indexSHA256,selectedProjectileCases:projectileCases.length,output:out}));return report;
}
if(process.argv[1]===fileURLToPath(import.meta.url)){
 const args=process.argv.slice(2);if(args.length!==5||args[1]!=='--restore-root'||args[3]!=='--app-root')throw Error('Usage: node portable-compiler.mjs CONFIG --restore-root ABS_OWNED_ROOT --app-root ABS_READONLY_CQC_ROOT');
 await configurePortableRoots({restorationRoot:args[2],appRoot:args[4]});
 const config=await ownedConfiguration(args[0]);if(config.schema==='cqc.p43.capture-compiled-artifact/1')console.log(JSON.stringify(await captureCompiledArtifact(config)));else await compile(args[0]);
}
