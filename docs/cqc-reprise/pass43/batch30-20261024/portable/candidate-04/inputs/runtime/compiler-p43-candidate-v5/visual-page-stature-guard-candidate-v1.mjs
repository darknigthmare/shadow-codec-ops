// Finite three-costume visual-display calibration. Never anatomical measurement.
import fs from 'node:fs';
import crypto from 'node:crypto';
export const VISUAL_PAGE_METHOD='qualified-visual-page-stature-candidate';
const allowedIDs=new Set(['mgs3-camo-tree-bark','mgs3-camo-leaf','mgs3-camo-splitter']);
const hash=x=>typeof x==='string'&&/^[a-f0-9]{64}$/.test(x);
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const digest=b=>crypto.createHash('sha256').update(b).digest('hex');
export function reviewedVisualPageStatures(job,audit,assets,geometry,inputSHA256,restorationRoot){
 const visual=assets.filter(a=>a.calibration?.method===VISUAL_PAGE_METHOD);
 const records=audit.reviewedVisualPageStatures??[],approved=new Set();
 if(!Array.isArray(records)||records.length!==visual.length)throw Error('Exact current visual page review list required');
 if(!visual.length)return approved;
 if(job.uid!=='core__snake'||job.family!=='canonical'||!allowedIDs.has(job.id))throw Error('Visual page calibration is outside the finite three-costume scope');
 if(audit.status!=='approved'||!audit.reviewer?.startsWith('Root')||!audit.reviewedAt||!hash(inputSHA256)||audit.inputSHA256!==inputSHA256)throw Error('Current exact raw job review required for visual page stature');
 for(const asset of visual){
  const matches=records.filter(r=>r.assetKey===asset.key);if(matches.length!==1||approved.has(asset.key))throw Error('Duplicate or absent visual page record');
  const r=matches[0],c=asset.calibration;
  if(!['right','left'].includes(r.side)||r.sourceSHA256!==asset.sha256||r.standingHeight!==asset.standingHeight||r.referenceAssetKey!==c.referenceAssetKey||c.effectiveStandingHeight!==asset.standingHeight||c.qualification!=='visual-display-only-no-anatomical-certificate')throw Error('Visual page source, scale or qualification differs');
  const source=geometry.sources.find(s=>s.path===asset.path);
  if(!source||source.sha256!==asset.sha256||source.bytes!==asset.bytes||!same(source.dimensions,[asset.width,asset.height]))throw Error('Visual page exact original source differs');
  const reference=assets.find(a=>a.key===c.referenceAssetKey),refSource=reference&&geometry.sources.find(s=>s.path===reference.path);
  const neutral=refSource?.poses.find(p=>p.side===r.side&&p.semanticPoseIndex===0&&p.name===reference.calibration?.pose);
  if(!reference||reference.calibration?.method!=='same-page-neutral'||!neutral||neutral.holdReasons?.length||reference.sha256!==refSource.sha256||job.roles?.[r.side]?.[0]?.asset!==reference.key||job.roles[r.side][0].pose!==neutral.name||Math.abs(reference.standingHeight-neutral.nativeAlphaBounds[3])>.05)throw Error('Visual page needs exact same-facing own idle reference');
  if(r.referenceStandingHeight!==reference.standingHeight||!Number.isFinite(asset.standingHeight)||asset.standingHeight<reference.standingHeight*.75||asset.standingHeight>reference.standingHeight*1.5||asset.standingHeight>asset.height)throw Error('Visual page display scale is unbounded');
  const uses=[];for(const side of ['right','left']){if(!Array.isArray(job.roles?.[side])||job.roles[side].length!==16)throw Error('Visual page role mapping missing');for(let i=0;i<16;i++)if(job.roles[side][i].asset===asset.key)uses.push({side,index:i});}
  const indices=uses.map(u=>u.index);
  if(uses.length<7||uses.length>8||uses.some(u=>u.side!==r.side||u.index<8)||!same(indices,r.roleIndices)||!indices.every(i=>i>=8&&i<=15))throw Error('Visual page must bind exactly its own seven/eight combat roles');
  for(const u of uses){const pose=source.poses.find(p=>p.name===job.roles[u.side][u.index].pose&&p.side===u.side);if(!pose||pose.semanticPoseIndex!==u.index||pose.holdReasons?.length||['held','held-unmapped','calibration-only'].includes(pose.candidateUsage)||pose.ownPixelsLost!==0||pose.foreignPixelsKept!==0||pose.opaqueCanvasEdgePixels!==0)throw Error('Visual page contains held or invalid mapped art');}
  const evidence=c.evidence;
  if(!evidence||!hash(evidence.sha256)||r.evidenceSHA256!==evidence.sha256||!Number.isInteger(evidence.bytes)||evidence.bytes<=0||typeof restorationRoot!=='string'||!restorationRoot.startsWith('/')||!restorationRoot.endsWith('/')||typeof evidence.path!=='string'||evidence.path.startsWith('/')||evidence.path.includes('\\')||!evidence.path.startsWith('proofs/')||evidence.path.split('/').some(x=>!x||x==='.'||x==='..')||!evidence.path.endsWith('.png'))throw Error('Current finite visual comparison evidence missing');
  const evidencePath=restorationRoot+evidence.path;const stat=fs.lstatSync(evidencePath);if(!stat.isFile()||stat.isSymbolicLink()||stat.size!==evidence.bytes||!fs.realpathSync(evidencePath).startsWith(restorationRoot+'proofs/'))throw Error('Visual comparison must be an exact regular diagnostic');
  const raw=fs.readFileSync(evidencePath);if(digest(raw)!==evidence.sha256||raw.subarray(0,8).toString('hex')!=='89504e470d0a1a0a')throw Error('Visual comparison PNG bytes differ');
  if(!c.scope?.trim())throw Error('Visual page qualification scope missing');
  approved.add(asset.key);
 }
 if(new Set(records.map(r=>r.assetKey)).size!==approved.size)throw Error('Unmatched visual page review records');
 return approved;
}
