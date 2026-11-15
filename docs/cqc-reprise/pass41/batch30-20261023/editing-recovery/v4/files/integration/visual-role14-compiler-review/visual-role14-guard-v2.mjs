// Qualified visual display choices are not anatomical transfer certificates.
const finite=Number.isFinite,hash=x=>typeof x==='string'&&/^[a-f0-9]{64}$/.test(x);
export const VISUAL_ROLE14_METHODS=new Set(['qualified-visual-role14-only-calibration','qualified-visual-role14-only-calibration-candidate']);
export function reviewedVisualRole14Aliases(job,audit,assets,geometry,inputSHA256){
 const visual=assets.filter(a=>VISUAL_ROLE14_METHODS.has(a.calibration?.method)),reviewed=audit.reviewedVisualRole14Aliases??[];
 if(!Array.isArray(reviewed)||reviewed.length!==visual.length)throw Error('Exact Root visual role14 alias list required');
 const allowed=new Map();if(!visual.length)return allowed;
 if(audit.schema!=='cqc.p41.root-art-review/2'||audit.status!=='approved'||!audit.reviewer?.startsWith('Root')||!audit.reviewedAt||!hash(inputSHA256)||audit.inputSHA256!==inputSHA256)throw Error('Visual role14 calibration requires Root review of exact raw job SHA');
 const ko=job.plan?.actions?.ko?.roles;if(!Array.isArray(ko)||!ko.length||!ko.every(r=>r===14))throw Error('Visual alias requires ko action with only role14');
 for(const[name,group]of Object.entries(job.plan?.actions??{}))if(name!=='ko'&&Array.isArray(group.roles)&&group.roles.includes(14))throw Error('Visual KO14 may not be used by non-ko action: '+name);
 const prefix='assets/combat-costumes-pass41/'+job.uid+'/'+job.id+'/',sourceByPath=new Map(geometry.sources.map(s=>[s.path,s]));
 for(const asset of visual){
  const records=reviewed.filter(r=>r.assetKey===asset.key);if(records.length!==1||allowed.has(asset.key))throw Error('Repeated or absent reviewed visual alias');const r=records[0];
  if(!['right','left'].includes(r.side)||r.roleIndex!==14||r.sourceSHA256!==asset.sha256||r.standingHeight!==asset.standingHeight||!hash(r.evidenceSHA256))throw Error('Root visual alias side/role/source/H/evidence differs');
  if(!asset.file?.startsWith(prefix)||!finite(asset.standingHeight)||asset.standingHeight<=0||asset.standingHeight>Math.max(asset.width,asset.height))throw Error('Unbounded or foreign visual alias');
  const source=sourceByPath.get(asset.path);if(!source||source.sha256!==asset.sha256||source.bytes!==asset.bytes||source.dimensions[0]!==asset.width||source.dimensions[1]!==asset.height)throw Error('Visual alias does not preserve exact source PNG');
  const uses=[];for(const side of ['right','left']){if(!Array.isArray(job.roles?.[side])||job.roles[side].length!==16)throw Error('Visual alias role set missing');for(let i=0;i<16;i++)if(job.roles[side][i].asset===asset.key)uses.push({side,index:i});}
  if(uses.length!==1||uses[0].side!==r.side||uses[0].index!==14)throw Error('Visual alias must be used exactly once at reviewed facing role14');
  const pose=source.poses.find(p=>p.name===job.roles[r.side][14].pose&&p.side===r.side);if(!pose||pose.semanticPoseIndex!==14||pose.holdReasons?.length||['held','held-unmapped','calibration-only'].includes(pose.candidateUsage))throw Error('Visual alias physical source is not an unheld KO14');
  const peer=assets.find(p=>p.key!==asset.key&&p.path===asset.path&&p.sha256===asset.sha256&&p.bytes===asset.bytes&&p.width===asset.width&&p.height===asset.height&&p.file?.startsWith(prefix)&&p.calibration?.method==='same-page-neutral'&&source.poses.some(n=>n.name===p.calibration.pose&&n.side===r.side&&Math.abs(p.standingHeight-n.nativeAlphaBounds[3])<=.05));
  const witness=(audit.reviewedVisualRole14SourceWitnesses??[]).find(w=>w.uid===job.uid&&w.assetKey===asset.key&&w.sourceSHA256===asset.sha256&&w.sourcePath===asset.path&&w.bytes===asset.bytes&&w.width===asset.width&&w.height===asset.height&&w.evidenceSHA256===r.evidenceSHA256);
  if(!peer&&!witness)throw Error('Visual alias needs unchanged same-UID source neutral or explicit Root source witness');
  const c=asset.calibration;if(!c.scope?.trim()||c.effectiveStandingHeight!==asset.standingHeight)throw Error('Visual alias calibration scope/H missing');
  if(peer&&finite(c.sameSourceNeutralMeasurement)&&Math.abs(c.sameSourceNeutralMeasurement-peer.standingHeight)>.05)throw Error('Visual alias original neutral H differs');
  if(c.rootVisualChoiceWitness?.sha256!=null&&c.rootVisualChoiceWitness.sha256!==r.evidenceSHA256)throw Error('Visual evidence SHA differs from exact Root review');
  allowed.set(asset.key,r);
 }
 if(new Set(reviewed.map(r=>r.assetKey)).size!==allowed.size)throw Error('Unmatched or repeated Root visual review record');
 return allowed;
}
