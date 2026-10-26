/* P44 reviewed native-source controller, VS only. Root review required before any product installation.
 * The finite allowlist contains only byte-pinned current Root-reviewed P44 native options. No profile,
 * cadence, velocity, lifetime, cost, damage or interruption rule is changed.
 */
(function(root){'use strict';
 const prior=root.CQC_PASS40_VS_DELAYED_BURSTS;
 if(!prior||!['register','emission','poseFor','selectFrame','drawNative'].every(name=>typeof prior[name]==='function'))throw Error('Contrôleur P40 absent avant son adaptateur P44');
 const allowed=new Map([["core__johnny_mgs4:tuxedo",{"revision":"native-batch40-v2","audit":"e85cac69e87ea4ce705cba4f97e699dc7bb9c032e4b3f142d9c4b10c2c281b7f","metadataSHA256":"ef9eff2e7761e43e9e50079a287095b3ac3cdbd94f8cb94b91ead6d0ae0198c3","metadataBytes":1129456,"slots":{"super":{"action":"shoot","physicalPoseIndex":11,"tag":"ballistic"}}}]]);
 const bursts=new WeakMap(),rounds=new WeakMap(),token=Symbol('reviewed-p44-vs-burst-frame'),poses=new WeakMap();
 const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b),finite=Number.isFinite;
 const emissions=[];let selectionCalls=0;
 function authority(p,m){
  if(!p?.f||!m||m.kind!=='projectile'||!(m.count>1)||!(m.interval>0))return null;
  const spec=allowed.get(p.f.uid+':'+p.f.costume),sdk=root.CQC_PASS44_NATIVE_ORIGINS,S=root.CQC_COMBAT_SPRITES;
  if(!spec||typeof sdk?.sourcePoint!=='function')return null;const binding=spec.slots[m.slot];if(!binding||binding.tag!==m.tag)return null;
  const entry=S?.getEntry?.(p.f.uid,p.f),descriptor=root.CQC_NATIVE_WARDROBE_INDEX?.entries?.find(d=>d.uid===p.f.uid&&d.id===p.f.costume);
  if(!entry||entry.pass40Revision!==spec.revision||entry.review?.status!=='approved'||!entry.review.reviewer?.startsWith('Root')||entry.review.artAuditSHA256!==spec.audit||entry.mirror!==false||entry.fallbackMissingActions!==false||descriptor?.metadata?.sha256!==spec.metadataSHA256||descriptor.metadata.bytes!==spec.metadataBytes)return null;
  const side=p.face===-1?'left':'right',actions=p.face===entry.facing?entry.actions:entry.oppositeActions;
  let point;try{point=sdk.sourcePoint(p.f.uid,p.f.costume,side,m.slot,m.tag);}catch{return null;}
  if(point?.sourceAuthorityMethod!=='pure-source-point'||point.evidence!=='reviewed-pass44-native-source-point'||point.worldScaleApplied!==false||point.selectedAction!==binding.action)return null;
  const index=point.selectedFrameIndex,frame=actions?.[binding.action]?.frames?.[index];
  if(!frame||frame.physicalPoseIndex!==binding.physicalPoseIndex||frame.file!==point.sourceFile||frame.sha256!==point.sourceSHA256||!same(frame.rect,point.sourceRect)||!same(frame.pivot,point.sourcePivot)||!point.sourceNativeXY?.every(finite))return null;
  const H=entry.sourceFrameHeights?.[frame.file],ratio=root.CQC_PASS19_WORLD_SCALE?.height?.(p.f)?.ratio;
  if(!finite(H)||H<=0||!finite(entry.displayHeight)||entry.displayHeight<=0||!finite(ratio)||ratio<=0)return null;
  return{entry,actions,frame,index,point,scale:entry.displayHeight/H*1.12*ratio};
 }
 function register(s,p,m,attack,q){
  if(!attack||q.delay<0||q.pass35BoxEmissionOwner)return false;
  const source=authority(p,m);if(!source)return false;
  let record=bursts.get(p);if(!record||record.attack!==attack){record={owner:p,uid:p.f.uid,costume:p.f.costume,face:p.face,attack,def:m,rounds:[],lastEmissionFrame:-1,lastEmissionRound:null};bursts.set(p,record);}
  record.rounds.push(q);rounds.set(q,record);return true;
 }
 function valid(record){const p=record?.owner;return !!p&&p.f?.uid===record.uid&&p.f.costume===record.costume&&p.face===record.face&&p.attack===record.attack&&p.attack.def===record.def&&p.attack.id===record.attack.id&&p.life>0&&!(p.hit>0)&&!(p.blockstun>0);}
 function roundEligible(record,q){return !!record&&!!q&&!q.dead&&q.reflections===0&&q.owner===record.owner.slot&&q.burstId===record.attack.id&&q.def===record.def;}
 function active(record,frame){return valid(record)&&(record.rounds.some(q=>roundEligible(record,q)&&(q.delay>0||q.age<=1))||record.lastEmissionFrame===frame&&roundEligible(record,record.lastEmissionRound));}
 function poseFor(p,pose,frame){const record=bursts.get(p);if(!active(record,frame)||pose.ko||pose.hit||pose.getup||pose.moveSlot!==record.attack.name||pose.moveKind!==record.def.kind||pose.moveTag!==record.def.tag)return pose;
  const source=authority(p,record.def);if(!source)return pose;
  const key={};poses.set(key,{record,source,frame});return{...pose,[token]:key};
 }
 function selectFrame(entry,pose){const selected=poses.get(pose?.[token]);if(!selected||pose.ko||pose.hit||pose.getup||!active(selected.record,selected.frame))return null;
  const source=authority(selected.record.owner,selected.record.def);if(!source||entry.uid!==source.entry.uid||entry.actions!==source.actions||entry.review?.artAuditSHA256!==source.entry.review.artAuditSHA256||entry.pass40Revision!==source.entry.pass40Revision||!same(source.frame,selected.source.frame))return null;
  selectionCalls++;return{frame:source.frame,requested:source.point.selectedAction,action:source.point.selectedAction,index:source.index,phase:pose.attackPhase,presentation:'reviewed-p44-delayed-burst-source-frame'};
 }
 function emission(s,q){const record=rounds.get(q);if(q.age!==0||q.delay>0||!roundEligible(record,q)||!valid(record))return null;
  const p=record.owner,source=authority(p,q.def);if(!source)return null;
  const a=source.point,[x,y]=a.sourceNativeXY,[rx,ry,w,h]=a.sourceRect,[px,py]=a.sourcePivot,k=source.scale;
  const result={x:p.x+(x-rx-px*w)*k,y:p.y+(y-ry-py*h)*k,sourceFile:a.sourceFile,sourceSHA256:a.sourceSHA256,sourceRect:[...a.sourceRect],sourcePivot:[...a.sourcePivot],sourceNativeXY:[...a.sourceNativeXY],scale:k,coordinateSpace:'world',sourceScaleAppliedOnce:true,frame:s.frame,ownerSlot:p.slot,burstId:q.burstId,projectileId:q.id};
  if(!finite(result.x)||!finite(result.y))return null;record.lastEmissionFrame=s.frame;record.lastEmissionRound=q;
  emissions.push({...result,actor:{x:p.x,y:p.y,face:p.face},phase:p.attack.t<p.attack.def.startup?'startup':p.attack.t<p.attack.def.startup+p.attack.def.active?'active':'recovery'});if(emissions.length>96)emissions.shift();return result;
 }
 function drawNative(c,p,f,x,y,face,scale,pose){if(!f||!p?.f||f.uid!==p.f.uid||f.costume!==p.f.costume||face!==p.face)return false;const decorated=poseFor(p,pose,pose.frame);if(!decorated[token])return false;return root.CQC_COMBAT_SPRITES.draw(c,f,x,y,face,scale,decorated)===true;}
 const api=Object.freeze({register,emission,poseFor,selectFrame,drawNative,status:()=>({schema:'cqc.p44.vs-delayed-burst-source/1',allowlist:[...allowed.keys()],selectionCalls,emissions:emissions.map(x=>({...x})),phaseFabricated:false,gameplayProfileChanged:false,priorInstalledP41Delegated:true})});
 root.CQC_PASS44_VS_DELAYED_BURSTS=api;
 // Preserve the already installed engine/renderer hook protocol and all P40 subjects.
 root.CQC_PASS40_VS_DELAYED_BURSTS=Object.freeze({...prior,
  register(...args){return api.register(...args)||prior.register(...args);},
  emission(...args){return api.emission(...args)||prior.emission(...args);},
  poseFor(p,pose,frame){const selected=api.poseFor(p,pose,frame);return selected===pose?prior.poseFor(p,pose,frame):selected;},
  selectFrame(...args){return api.selectFrame(...args)||prior.selectFrame(...args);},
  drawNative(...args){return api.drawNative(...args)||prior.drawNative(...args);}
 });
 root.CQC_PASS44_NATIVE_VISUAL_ACTIONS?.install?.();
})(globalThis);
