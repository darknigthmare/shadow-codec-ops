// Current source head/heel evidence is a visual measurement, not a cross-pose anatomical transfer.
export const BODY_LANDMARK_METHOD='same-page-body-landmarks';
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b),finite=Number.isFinite,hash=x=>typeof x==='string'&&/^[a-f0-9]{64}$/.test(x);
function inside(p,point){
 const [x,y,w,h]=p.rect,qx=(point[0]-x)/w,qy=(point[1]-y)/h;let flag=false;
 for(let i=0;i<p.clipPolygon.length;i++){
  const a=p.clipPolygon[i],b=p.clipPolygon[(i+1)%p.clipPolygon.length];
  if((a[1]>qy)!==(b[1]>qy)&&qx<(b[0]-a[0])*(qy-a[1])/(b[1]-a[1])+a[0])flag=!flag;
 }
 return flag;
}
export function reviewedBodyLandmarkHeights(job,audit,assets,geometry,inputSHA256){
 const chosen=assets.filter(a=>a.calibration?.method===BODY_LANDMARK_METHOD),reviews=audit.reviewedBodySourceHeights??[],result=new Map();
 if(!Array.isArray(reviews)||reviews.length!==chosen.length)throw Error('Exact Root body-source height list required');
 if(!chosen.length)return result;
 if(audit.schema!=='cqc.p42.root-art-review/2'||audit.status!=='approved'||!audit.reviewer?.startsWith('Root')||!audit.reviewedAt||audit.inputSHA256!==inputSHA256||!hash(inputSHA256)||audit.checks?.bodyLandmarkHeights!==true)throw Error('Current Root source head/heel review required');
 for(const a of chosen){
  const c=a.calibration,rs=reviews.filter(r=>r.assetKey===a.key);if(rs.length!==1)throw Error('Body-height asset absent or repeated');const r=rs[0];
  if(!c.scope?.trim()||c.sourceSHA256!==a.sha256||r.sourceSHA256!==a.sha256||r.pose!==c.pose||r.standingHeight!==a.standingHeight||!same(r.headNativeXY,c.headNativeXY)||!same(r.heelNativeXY,c.heelNativeXY)||!hash(r.evidenceSHA256))throw Error('Exact source head/heel review differs from job');
  if(![c.headNativeXY,c.heelNativeXY].every(p=>Array.isArray(p)&&p.length===2&&p.every(finite))||c.heelNativeXY[1]<=c.headNativeXY[1]||Math.abs(c.heelNativeXY[1]-c.headNativeXY[1]-a.standingHeight)>.00001)throw Error('Body span is not the actual reviewed vertical head/heel difference');
  const source=geometry.sources.find(s=>s.path===a.path&&s.sha256===a.sha256),pose=source?.poses.find(p=>p.name===c.pose);
  if(!pose||pose.holdReasons?.length||['held','held-unmapped'].includes(pose.candidateUsage)||!inside(pose,c.headNativeXY)||!inside(pose,c.heelNativeXY))throw Error('Body landmarks are outside their owned source figure');
  if(!finite(a.standingHeight)||a.standingHeight<=0||a.standingHeight>Math.max(a.width,a.height))throw Error('Body source height unbounded');
  result.set(a.key,{assetKey:a.key,pose:c.pose,sourceSHA256:a.sha256,standingHeight:a.standingHeight,headNativeXY:[...c.headNativeXY],heelNativeXY:[...c.heelNativeXY],evidenceSHA256:r.evidenceSHA256});
 }
 return result;
}
