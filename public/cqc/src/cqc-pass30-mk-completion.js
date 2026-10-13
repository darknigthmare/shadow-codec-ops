/* Mk.II/Mk.III: admit existing native service and manipulator pixels.
 * The four admitted atlases retain independent editions and cameras. No new
 * weapon, source recolour, mirrored camera, HP pool or animation clock is made.
 */
(function(root){'use strict';
 const clone=x=>JSON.parse(JSON.stringify(x)), finite=x=>typeof x==='number'&&Number.isFinite(x), number=x=>finite(x)?x:0;
 const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
 const definitions=Object.freeze({
  mk2_mgs4_ps3_2008:{rect:[692,963,187,240],mount:[843,1002],wrist:[849,1072],far:[747,1105],near:[772,1153],socket:[319,131],axis:'y',cut:1072,farLine:[[747,1105],[715,1140]],farPositive:true,nearCut:1144,scale:.36,
   cable:{folded:[58,1029,197,144],foldPivot:[126,1063],extended:[343,973,309,211],extendedPivot:[635,1082],scale:.3},service:{rect:[912,936,314,289],pivot:[159,162.5]}},
  mk3_mgs4_ps3_2008:{rect:[665,980,184,191],mount:[808,1008],wrist:[774,1036],far:[724,1087],near:[749,1131],socket:[330,145],axis:'y',cut:1036,farLine:[[724,1087],[691,1120]],farPositive:true,nearCut:1120,scale:.36,
   cable:{folded:[73,980,210,163],foldPivot:[170,1003],extended:[363,949,262,234],extendedPivot:[565,1140],scale:.3},service:{rect:[891,950,345,233],pivot:[172.5,116]}},
  mk2_mgs4_right:{rect:[1320,194,195,162],mount:[1343,228],wrist:[1417,264],far:[1458,268],near:[1441,308],socket:[167,177],axis:'x',cut:1417,farLine:[[1458,268],[1481,338]],farPositive:false,nearCut:303,scale:.36},
  mk3_mgs4_right:{rect:[1316,164,203,164],mount:[1340,197],wrist:[1409,249],far:[1451,229],near:[1431,285],socket:[165,160],axis:'x',cut:1409,farLine:[[1451,229],[1475,319]],farPositive:false,nearCut:280,scale:.36}
 });
 const ids=Object.freeze(Object.keys(definitions));
 const limits=Object.freeze([
  'Mk.II/Mk.III have one documented multifunction manipulator, not four new weapons. These are native cable poses, gripper components and a service-hull appearance already present in the admitted art.',
  'The arm endpoints, finger hinges and body sockets are authored on opaque native source pixels. Concealed 3D mount interiors and exact extracted MGS4 animation are unavailable; absolute 1:1 is not certified.',
  'Native cable appearances switch between two authored projections; their flexible geometry is not falsely represented as extracted continuous deformation.',
  'The admitted opposite-camera atlases contain the gripper but no cable or open-hull art. Missing opposite-camera service poses remain absent, without mirroring another camera.',
  'Mk.III retains its separately authored red atlas and the pre-existing colour qualification. No Mk.II source is recoloured into Mk.III.',
  'Complementary source polygons conserve opaque pixel centres; native Canvas edges can have a measured antialias seam.',
  'The service hull is available only through an explicit service/repair/inspect pose; this presentation addition does not add an undocumented gameplay action.'
 ]);
 function polygon(rect){const[x,y,w,h]=rect;return[[x,y],[x+w,y],[x+w,y+h],[x,y+h]];}
 function cut(points,a,b,positive){const distance=p=>(b[0]-a[0])*(p[1]-a[1])-(b[1]-a[1])*(p[0]-a[0]);const inside=p=>positive?distance(p)>=-1e-9:distance(p)<=1e-9,out=[];
  for(let i=0;i<points.length;i++){const p=points[i],q=points[(i+1)%points.length],pi=inside(p),qi=inside(q);if(pi)out.push(p.slice());if(pi!==qi){const dp=distance(p),dq=distance(q),t=dp/(dp-dq);out.push([p[0]+(q[0]-p[0])*t,p[1]+(q[1]-p[1])*t]);}}
  return out.filter((p,i)=>!i||Math.hypot(p[0]-out[i-1][0],p[1]-out[i-1][1])>1e-8);
 }
 function find(machine,id){const p=machine.parts.find(p=>p.id===id);if(!p)throw Error('Mk native support missing: '+machine.id+'/'+id);return p;}
 function rotation(channel,factor=1){return{rotation:[{channel,factor}]};}
 function apply(catalog){if(catalog?.schema!=='cqc.machine-parts/1'||!Array.isArray(catalog.machines))throw Error('Mk native catalog unavailable');const next=clone(catalog),changes=[];
  for(const machine of next.machines){const d=definitions[machine.id];if(!d||machine.pass30MkCompletion===true)continue;
   const originalIDs=machine.parts.map(p=>p.id),sourcePin=JSON.stringify(machine.sources),hull=find(machine,'hull'),source=hull.source,s=hull.imageScale||1,base=polygon(d.rect),[rx,ry,rw,rh]=d.rect;
   const mountPolygon=d.axis==='y'?cut(base,[rx,d.cut],[rx+rw,d.cut],false):cut(base,[d.cut,ry],[d.cut,ry+rh],true), remainder=d.axis==='y'?cut(base,[rx,d.cut],[rx+rw,d.cut],true):cut(base,[d.cut,ry],[d.cut,ry+rh],false);
   const far=cut(remainder,...d.farLine,d.farPositive),palmAndNear=cut(remainder,...d.farLine,!d.farPositive),near=cut(palmAndNear,[rx,d.nearCut],[rx+rw,d.nearCut],true),palm=cut(palmAndNear,[rx,d.nearCut],[rx+rw,d.nearCut],false);
   const rootOffset=[(d.socket[0]-hull.rect[0]-hull.pivot[0])*s,-(d.socket[1]-hull.rect[1]-hull.pivot[1])*s];
   const add=(id,pivot,clip,parent,offset,channels,z)=>{if(machine.parts.some(p=>p.id===id)||clip.length<3)throw Error('Mk native partition invalid: '+id);const p={id,source,rect:d.rect.slice(),pivot:[pivot[0]-rx,pivot[1]-ry],offset,parent,imageScale:d.scale,z,sourceClipPolygonNativeXY:clip,channels,hideWhen:['pass30MkService']};if(d.cable)p.showWhen=['pass30MkGrip'];machine.parts.push(p);return p;};
   add('manipulator_mount_native',d.mount,mountPolygon,'hull',rootOffset,rotation('pass30MkShoulder'),42);
   add('manipulator_wrist_native',d.wrist,palm,'manipulator_mount_native',[(d.wrist[0]-d.mount[0])*d.scale,-(d.wrist[1]-d.mount[1])*d.scale],rotation('pass30MkWrist'),43);
   add('manipulator_far_finger_native',d.far,far,'manipulator_wrist_native',[(d.far[0]-d.wrist[0])*d.scale,-(d.far[1]-d.wrist[1])*d.scale],rotation('pass30MkFingerOpen',d.axis==='y'?-7:7),43.001);
   add('manipulator_near_finger_native',d.near,near,'manipulator_wrist_native',[(d.near[0]-d.wrist[0])*d.scale,-(d.near[1]-d.wrist[1])*d.scale],rotation('pass30MkFingerOpen',d.axis==='y'?7:-7),43.002);
   if(d.cable){const c=d.cable;machine.parts.push({id:'manipulator_cable_native',source,rect:c.folded.slice(),pivot:[c.foldPivot[0]-c.folded[0],c.foldPivot[1]-c.folded[1]],offset:rootOffset.slice(),parent:'hull',z:41,imageScale:c.scale,hideWhen:['pass30MkGrip','pass30MkService'],channels:rotation('pass30MkCableTilt'),variants:[{when:'pass30MkCableExtended',rect:c.extended.slice(),pivot:[c.extendedPivot[0]-c.extended[0],c.extendedPivot[1]-c.extended[1]],imageScale:c.scale,sourceClipPolygonNativeXY:polygon(c.extended)}]});
    hull.variants=[...(hull.variants||[]),{when:'pass30MkService',rect:d.service.rect.slice(),pivot:d.service.pivot.slice(),imageScale:s,sourceClipPolygonNativeXY:polygon(d.service.rect)}];
   }
   machine.pass30MkCompletion=true;machine.documentaryQualifications=[...(machine.documentaryQualifications||[]),...limits];
   if(sourcePin!==JSON.stringify(machine.sources)||originalIDs.some(id=>!machine.parts.some(p=>p.id===id)))throw Error('Mk original source or identity changed');
   changes.push({id:machine.id,retainedPartIDs:originalIDs,addedPartIDs:machine.parts.filter(p=>!originalIDs.includes(p.id)).map(p=>p.id),hingesSourceNativeXY:{mount:d.mount,wrist:d.wrist,farFinger:d.far,nearFinger:d.near,hullSocket:d.socket},nativeManipulatorPartitionRect:d.rect,partitionParts:['manipulator_mount_native','manipulator_wrist_native','manipulator_far_finger_native','manipulator_near_finger_native'],nativeCableAppearances:!!d.cable,nativeServiceHull:!!d.service,sourcePixelsChanged:false,HPOrTimingsChanged:false});
  }return{catalog:next,changes,limits:[...limits]};
 }
 function presentationPose(id,pose,state=null){const d=definitions[id];if(!d)return pose;const p=pose||{},channels={...(p.channels||{})},flags={...(p.flags||{})},dead=p.defeated===true||p.ko===true||/^(dead|ko)$/.test(p.action||'')||number(channels.collapse)>0;
  const action=p.action||'',moveSlot=typeof p.moveSlot==='string'?p.moveSlot:'',normalMatchActive=p.attack===true||(p.animationActive===true&&moveSlot.length>0),active=/shoot|attack|heavy|light|special|super|slash|shock/.test(action)||p.attacking===true||normalMatchActive||Math.abs(number(channels.weaponRecoil))>1e-9;
  const phase=finite(p.phaseProgress)?clamp(p.phaseProgress,0,1):.5,wave=active&&!dead?Math.sin(phase*Math.PI):0;
  const service=!dead&&(flags.pass30MkService===true||/^(service|repair|inspect)$/.test(action)),grip=!dead&&!service&&(flags.pass30MkGrip===true||/^(grip|interact|pickup|light|heavy|attack)$/.test(action)||(normalMatchActive&&['light','heavy','low','throw'].includes(moveSlot)));
  flags.pass30MkService=service;flags.pass30MkGrip=grip;flags.pass30MkCableExtended=!service&&!grip&&!dead&&(active||flags.pass30MkCableExtended===true||action==='aim');
  channels.pass30MkShoulder=dead?0:wave*(d.axis==='y'?6:-6);channels.pass30MkWrist=dead?0:wave*(d.axis==='y'?-9:9);channels.pass30MkFingerOpen=dead?0:clamp(finite(channels.pass30MkFingerOpen)?channels.pass30MkFingerOpen:wave,0,1);channels.pass30MkCableTilt=dead?0:clamp(number(channels.weaponAim)*.25,-4,4);
  return{...p,channels,flags,pass30MkCompletionID:id};
 }
 const sourcePoints=Object.freeze({mk2_mgs4_ps3_2008:{gripContact:{part:'manipulator_near_finger_native',nativeXY:[739,1187],kind:'native gripper contact; visible during grip pose'}},mk3_mgs4_ps3_2008:{gripContact:{part:'manipulator_near_finger_native',nativeXY:[697,1156],kind:'native gripper contact; visible during grip pose'}},mk2_mgs4_right:{gripContact:{part:'manipulator_near_finger_native',nativeXY:[1461,339],kind:'native gripper contact'}},mk3_mgs4_right:{gripContact:{part:'manipulator_near_finger_native',nativeXY:[1457,314],kind:'native gripper contact'}}});
 root.CQC_PASS30_MK_COMPLETION=Object.freeze({apply,presentationPose,ids,limits,sourcePoints,audit:Object.freeze({schema:'cqc.pass30.native-mk-completion/1',ids,sourcePixelsChanged:false,simulationMutation:false,absolute1to1Certified:false})});
})(globalThis);
