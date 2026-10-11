/* Pure source geometry. Decode readiness and camera zoom never change physics. */
(function(root){'use strict';
 const DEG=Math.PI/180;
 function key(source,rect,polygon){return source.sha256+'|'+rect.join(',')+'|'+JSON.stringify(polygon||null);}
 function ink(machine,part,pose){const source=machine.sources.get(pose.source),rect=pose.rect||[0,0,source.width,source.height];return root.CQC_PASS28_MACHINE_INK?.records[key(source,rect,part.sourceClipPolygonNativeXY)]||null;}
 function point(pose,rect,native){
  const x=(native[0]-rect[0]-pose.pivot[0])*pose.imageScale,y=(native[1]-rect[1]-pose.pivot[1])*pose.imageScale,angle=(pose.textureRotation||0)*DEG,c=Math.cos(angle),s=Math.sin(angle),a=x*c-y*s,b=x*s+y*c,m=pose.matrix;
  return {x:m[0]*a+m[2]*b+m[4],y:m[1]*a+m[3]*b+m[5]};
 }
 function bounds(machine,parts,state={origin:[0,0],flags:{},channels:{},reducedMotion:true}){
  const poses=parts.pose(machine,state);let left=Infinity,top=Infinity,right=-Infinity,bottom=-Infinity,measured=0;
  for(const part of machine.paintOrder){const pose=poses.get(part.id);if(!pose.visible||pose.opacity<=0)continue;const source=machine.sources.get(pose.source),rect=pose.rect||[0,0,source.width,source.height],record=ink(machine,part,pose);if(record?.empty)continue;
   const box=record?.bounds||[rect[0],rect[1],rect[0]+rect[2],rect[1]+rect[3]];if(record)measured++;
   for(const native of [[box[0],box[1]],[box[2],box[1]],[box[2],box[3]],[box[0],box[3]]]){const p=point(pose,rect,native);left=Math.min(left,p.x);top=Math.min(top,p.y);right=Math.max(right,p.x);bottom=Math.max(bottom,p.y);}
  }
  return right>left&&bottom>top?{left,top,right,bottom,width:right-left,height:bottom-top,measuredParts:measured}:null;
 }
 function sourcePoint(machine,parts,state,descriptor){
  const part=machine.parts.find(part=>part.id===descriptor.part);if(!part)return null;
  const attached={...state,flags:{...state.flags},channels:{...state.channels}};
  // A destroyed HP target remains at its last attached joint, never follows flying debris.
  if(part.detachment){attached.flags[part.detachment.when]=false;attached.channels[part.detachment.clock]=0;}
  if(part.showWhen)for(const flag of part.showWhen)attached.flags[flag]=true;
  const pose=parts.pose(machine,attached).get(part.id);if(!pose)return null;const source=machine.sources.get(pose.source),rect=pose.rect||[0,0,source.width,source.height],record=ink(machine,part,pose);
  if(record?.empty)return null;
  const native=descriptor.sourceNativeXY||descriptor.point||record?.center||[rect[0]+rect[2]/2,rect[1]+rect[3]/2];
  const p=point(pose,rect,native),box=record?.bounds||[rect[0],rect[1],rect[0]+rect[2],rect[1]+rect[3]];
  return {...p,nativeXY:native,part:part.id,localRadius:Math.max(5,Math.min(box[2]-box[0],box[3]-box[1])*pose.imageScale*.22),alphaMeasured:!!record};
 }
 root.CQC_PASS28_MACHINE_GEOMETRY=Object.freeze({key,ink,point,bounds,sourcePoint});
})(globalThis);
