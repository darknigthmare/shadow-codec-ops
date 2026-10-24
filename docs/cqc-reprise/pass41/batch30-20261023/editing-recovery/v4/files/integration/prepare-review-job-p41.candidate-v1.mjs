// Propose data for physical inspection. This tool never writes an approved review.
import {readFile,writeFile,mkdir,lstat} from 'node:fs/promises';
import {gunzipSync} from 'node:zlib';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {proposedPlan} from './compile-native-batch-p41.candidate-v1.mjs';
const own=fileURLToPath(new URL('.',import.meta.url)),sha=b=>createHash('sha256').update(b).digest('hex');
const [specPath]=process.argv.slice(2);if(!specPath)throw Error('A source-selection specification is required');
const spec=JSON.parse(await readFile(specPath,'utf8'));const pin=async path=>{const b=await readFile(path);return{path,bytes:b.length,sha256:sha(b)};};
// This file creates UNAPPROVED job proposals only. A supplied custom plan remains unreviewed.
const contracts=JSON.parse(gunzipSync(await readFile(own+'ACTUAL_FIGHTER_CONTRACTS_P41_V1.json.gz')).toString('utf8')),contract=contracts.entries[spec.uid];if(!contract)throw Error('Final profile not captured');
const geometryPin=await pin(spec.geometryPath),geometry=JSON.parse((spec.geometryPath.endsWith('.gz')?gunzipSync(await readFile(spec.geometryPath)):await readFile(spec.geometryPath)).toString('utf8'));
const assets=[],roles={right:[],left:[]},bodyAxes=spec.bodyAxesPath?JSON.parse(await readFile(spec.bodyAxesPath,'utf8')):null;
for(let sourceIndex=0;sourceIndex<geometry.sources.length;sourceIndex++){
 const source=geometry.sources[sourceIndex];for(const side of ['right','left']){
  if(!source.poses.some(p=>p.side===side&&Number.isInteger(p.semanticPoseIndex)&&!p.holdReasons?.length&&!['held','held-unmapped','calibration-only'].includes(p.candidateUsage)))continue;
  const neutralName=spec.calibrationPoses?.[source.path]?.[side],neutral=source.poses.find(p=>p.name===neutralName)||source.poses.find(p=>p.side===side&&p.candidateUsage==='calibration-only')||source.poses.find(p=>p.side===side&&p.semanticPoseIndex===0);
  if(!neutral)throw Error('Choose the calibration pose for '+source.path+' '+side);
  const key='page'+sourceIndex+'-'+side,asset={key,file:'assets/combat-costumes-pass41/'+spec.uid+'/'+spec.id+'/'+key+'-v1.png',path:source.path,bytes:source.bytes,sha256:source.sha256,width:source.dimensions[0],height:source.dimensions[1],standingHeight:neutral.nativeAlphaBounds[3],calibration:{method:'same-page-neutral',pose:neutral.name}};assets.push(asset);
 }
}
for(const side of ['right','left'])for(let index=0;index<16;index++){
 const explicit=spec.selectedRoles?.[side]?.[index];const matches=[];
 for(let sourceIndex=0;sourceIndex<geometry.sources.length;sourceIndex++)for(const pose of geometry.sources[sourceIndex].poses){if(pose.side!==side||pose.holdReasons?.length||pose.candidateUsage==='held'||pose.candidateUsage==='calibration-only')continue;if(explicit?pose.name===explicit.pose&&geometry.sources[sourceIndex].path===explicit.sourcePath:pose.semanticPoseIndex===index)matches.push({pose,sourceIndex});}
 if(matches.length!==1)throw Error('Exactly one unheld drawing required for '+side+' role '+index+'; candidates='+matches.length);
 const{pose,sourceIndex}=matches[0],source=geometry.sources[sourceIndex],axis=bodyAxes?.sources?.[source.path]?.poses?.[side+':'+pose.name],pivot=[...(pose.candidatePivot||[])];if(axis)pivot[0]=(axis.nativeX-pose.rect[0])/pose.rect[2];const frame={asset:'page'+sourceIndex+'-'+side,pose:pose.name,pivot,...(axis?{bodyAxisProposal:axis}:{})};if(index===0){const[x,y,w,h]=pose.nativeAlphaBounds,[rx,ry]=pose.rect;frame.preview={datumX:((axis?.nativeX??pose.candidateContactX)-rx),bodyBounds:[x-rx,y-ry,w,h]};}roles[side].push(frame);
}
const job={schema:'cqc.p41.native-costume-job/2',uid:spec.uid,id:spec.id,label:spec.label,family:spec.family,provenance:spec.provenance,geometry:geometryPin,ownershipBook:await pin(spec.ownershipBookPath),assets,roles,plan:spec.plan||proposedPlan(contract),anchors:spec.anchors||[],...(spec.concept?{concept:spec.concept}:{}),...(spec.physicalExtent?{physicalExtent:spec.physicalExtent}:{}),proposalLimits:['Candidate pixel heights and pivots require physical review. A neutral pose on the same image can use a different drawn density; do not approve that value automatically.','Preview datum is proposed from contact pixels. Replace it with a reviewed pelvis/body axis where appropriate.','No source point is inferred from a gun bounding box. Native muzzle or release points must be supplied explicitly.']};
const dir=spec.output;if(typeof dir!=='string'||!dir.startsWith('@PROJECT_ROOT@/integration/'))throw Error('New isolated integration directory required');try{await lstat(dir);throw Error('Candidate output exists; preserve it and choose a new directory');}catch(error){if(error.code!=='ENOENT')throw error;}await mkdir(dir,{recursive:true});const raw=Buffer.from(JSON.stringify(job,null,2)+'\n'),inputPath=dir+'/JOB_CANDIDATE_V1.json';await writeFile(inputPath,raw);
const projectiles=Object.entries(contract.fighter.combat.moves).filter(([_slot,m])=>m.kind==='projectile').map(([slot,m])=>({slot,kind:m.kind,tag:m.tag,startup:m.startup,requiredNativeFacings:['right','left']}));
const review={schema:'cqc.p41.root-art-review/2',status:'pending',reviewer:'',reviewedAt:null,inputSHA256:sha(raw),checks:{identity:false,incarnation:false,nativeArt:false,semanticPoses:false,equipment:false,ownership:false,framing:false,selectedWeaponPoints:projectiles.length?false:'not-applicable-no-projectiles'},limits:[],requiredProjectilesFromFinalProfile:projectiles,observations:[],heldRoles:[]};await writeFile(dir+'/ROOT_REVIEW_PENDING_V1.json',JSON.stringify(review,null,2)+'\n');
await writeFile(dir+'/REQUIRED_NATIVE_POINTS_V1.json',JSON.stringify({uid:spec.uid,id:spec.id,projectiles,physicalPointsSupplied:job.anchors.length,roleCount:32,approved:false},null,2)+'\n');
console.log(JSON.stringify({candidateInput:inputPath,inputSHA256:sha(raw),assets:assets.length,physicalSources:new Set(assets.map(a=>a.sha256)).size,roles:32,requiredProjectileSlots:projectiles.length,reviewApproved:false}));
