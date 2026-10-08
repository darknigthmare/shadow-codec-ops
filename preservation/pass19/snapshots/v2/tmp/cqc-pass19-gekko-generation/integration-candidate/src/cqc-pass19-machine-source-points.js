/* Native absolute source-pixel points. No simulation/collider/event writes. */
(function(root){'use strict';
 const points={
  pass19__gekko_missile_mgs4:{missile:{part:'paired_missile_pod',nativeXY:[72,1068],kind:'upper missile-tube mouth'},missileLower:{part:'paired_missile_pod',nativeXY:[68,1158],kind:'lower missile-tube mouth'},ballistic:{part:'machinegun',nativeXY:[953,89],kind:'machinegun barrel mouth'}},
  pass19__gekko_mgr:{ballistic:{part:'machinegun',nativeXY:[918,90],kind:'machinegun barrel mouth'}}
 };
 function descriptor(id,slot){const point=points[id]?.[slot];return point?{...point,nativeXY:[...point.nativeXY]}:null;}
 function resolve(parts,machine,description,point){
  if(!machine||!point)return null;const part=machine.parts.find(p=>p.id===point.part);if(!part)return null;
  const pose=parts.pose(machine,description).get(part.id),r=pose?.rect,xy=point.nativeXY;
  if(!pose||!r||xy[0]<r[0]||xy[1]<r[1]||xy[0]>=r[0]+r[2]||xy[1]>=r[1]+r[3])return null;
  const x=(xy[0]-r[0]-pose.pivot[0])*pose.imageScale,y=(xy[1]-r[1]-pose.pivot[1])*pose.imageScale,m=pose.matrix;
  return{part:part.id,source:pose.source,nativeXY:[...xy],x:m[0]*x+m[2]*y+m[4],y:m[1]*x+m[3]*y+m[5],visible:pose.visible&&pose.opacity>0,opacity:pose.opacity,sourceSHA256:machine.sources.get(pose.source)?.sha256,kind:point.kind};
 }
 root.CQC_PASS19_MACHINE_SOURCE_POINTS={schema:'cqc.pass19.native-source-points/1',points,descriptor,resolve};
 if(typeof module==='object'&&module.exports)module.exports=root.CQC_PASS19_MACHINE_SOURCE_POINTS;
})(globalThis);
