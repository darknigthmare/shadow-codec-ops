/* P46 reviewed native-source controller, VS only. Root review required before any product installation.
 * The finite allowlist contains only byte-pinned current Root-reviewed P46 native options. No profile,
 * cadence, velocity, lifetime, cost, damage or interruption rule is changed.
 */
(function(root){'use strict';
 const prior=root.CQC_PASS40_VS_DELAYED_BURSTS;
 if(!prior||!['register','emission','poseFor','selectFrame','drawNative'].every(name=>typeof prior[name]==='function'))throw Error('Contrôleur P40 absent avant son adaptateur P46');
 const allowed=new Map([["core__vamp_mgs4:cyborg",{"revision":"native-batch40-v2","audit":"11818743f682d6a1c2094876d28fc213365803fe03d93f05ab752e7517826740","metadataSHA256":"1718d82b3eb2406fcfaaa9425be2091a590cbeafad4ef44102f795ae633d56a4","metadataBytes":1946873,"slots":{"special":{"action":"deploy","physicalPoseIndex":11,"tag":"knife"},"specialDown":{"action":"charge","physicalPoseIndex":16,"tag":"knife"}}}],["core__meryl_mgs1:metalgear",{"revision":"native-batch40-v2","audit":"cbe1335ba6de347ba7a1bedac9a98bd12e795ac57b8d1b7427fcf5241783450b","metadataSHA256":"e01b04e9b960ffed68f1fa55d02e3c042f17117ae2df767ca82620cb67e6e75e","metadataBytes":2166677,"slots":{"special":{"action":"shoot","physicalPoseIndex":11,"tag":"ballistic"},"super":{"action":"shoot","physicalPoseIndex":11,"tag":"ballistic"},"specialDown":{"action":"deploy","physicalPoseIndex":8,"tag":"explosive"}}}],["core__snake_mgs2:metalgear",{"revision":"native-batch40-v2","audit":"b80adefd99e56c0e0416f53ec04cdf39cb772c7860699e3fbc5980aabb99faa1","metadataSHA256":"fbf30966e398ff80386516c3168ab45bdb073131ae8d2383ad10d5039d967abb","metadataBytes":1335258,"slots":{"special":{"action":"shoot","physicalPoseIndex":11,"tag":"tranq"},"specialDown":{"action":"deploy","physicalPoseIndex":8,"tag":"explosive"}}}],["core__snake_mgs2:survive",{"revision":"native-batch40-v2","audit":"11ff34bf20cd7749fd1702b7c5265250ddb9a19a87a8201ca1dce2bf7eb3524a","metadataSHA256":"a16e77ea68dc0b5a3ec17885b6c98174df88932e7f779cece786cd408bce02bc","metadataBytes":1483851,"slots":{"special":{"action":"shoot","physicalPoseIndex":11,"tag":"tranq"},"specialDown":{"action":"deploy","physicalPoseIndex":8,"tag":"explosive"}}}],["core__olga_ninja:metalgear",{"revision":"native-batch40-v2","audit":"2b0685a0e3f6399872a659efd20cfabc39a9a3b898ae9da264baa5a815a26388","metadataSHA256":"b1c54071becfff900c680dfd49ee9ae20f88250aaa96eedd8a549da845ed5798","metadataBytes":1409929,"slots":{}}],["core__meryl_mgs1:furry",{"revision":"native-batch40-v2","audit":"18152f725b5c6063615f78c510f8369af9ee5ecf4545111c5bf93aa13de3c49f","metadataSHA256":"430b0ae72d60fa5c31d54aa5dcff795da063c921043ee6cdba9db686e7a54a35","metadataBytes":2487621,"slots":{"special":{"action":"shoot","physicalPoseIndex":11,"tag":"ballistic"},"super":{"action":"shoot","physicalPoseIndex":11,"tag":"ballistic"},"specialDown":{"action":"deploy","physicalPoseIndex":8,"tag":"explosive"}}}],["core__olga_mgs2:metalgear",{"revision":"native-batch40-v2","audit":"2492f22698ba8511994bef667b09aebe002355ae188a463d5fe13e5db836669d","metadataSHA256":"e0683f4963988cc4b81924e1d6c3067f39be0e9e39a00194d3a123fb33f3ab26","metadataBytes":1395515,"slots":{"special":{"action":"shoot","physicalPoseIndex":11,"tag":"ballistic"},"super":{"action":"shoot","physicalPoseIndex":11,"tag":"ballistic"},"specialDown":{"action":"deploy","physicalPoseIndex":8,"tag":"explosive"}}}],["core__old_snake:survive",{"revision":"native-batch40-v2","audit":"47464c5a06b53d3d9153173b51ec0b768e166bc05414488a63b21a235b099ce3","metadataSHA256":"fd02820a84de492051c6f08ef752ba71848f6cd4db34a0db4a8ce74d99e30ac7","metadataBytes":1882892,"slots":{"special":{"action":"shoot","physicalPoseIndex":11,"tag":"tranq"}}}],["core__meryl_mgs1:zombie",{"revision":"native-batch40-v2","audit":"c6286361f001be3701457dc716d8e227623b092b976545d0664e60812143803d","metadataSHA256":"21aa48c2b4edbf0304ace6eb696f70b383afe118cc1005efa232ebfd9fbfd717","metadataBytes":2898318,"slots":{"special":{"action":"shoot","physicalPoseIndex":11,"tag":"ballistic"},"super":{"action":"shoot","physicalPoseIndex":11,"tag":"ballistic"},"specialDown":{"action":"deploy","physicalPoseIndex":8,"tag":"explosive"}}}],["core__snake_mgs2:zombie",{"revision":"native-batch40-v2","audit":"a7a70641894b3479b7d92c632e70fdbfdf0837b400849bb02db05c1c2a34b627","metadataSHA256":"f1233691b66ecdfe15f8b96d9d5cffe890cea9e223881bb9d1556d69cff4c68a","metadataBytes":1894595,"slots":{"special":{"action":"shoot","physicalPoseIndex":11,"tag":"tranq"},"specialDown":{"action":"deploy","physicalPoseIndex":8,"tag":"explosive"}}}]]);
 const bursts=new WeakMap(),rounds=new WeakMap(),token=Symbol('reviewed-p46-vs-burst-frame'),poses=new WeakMap();
 const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b),finite=Number.isFinite;
 const maxPendingNativePaintTicks=8;
 const emissions=[];let selectionCalls=0,nativePaints=0,deferredPaints=0;
 function authority(p,m){
  if(!p?.f||!m||m.kind!=='projectile')return null;
  const spec=allowed.get(p.f.uid+':'+p.f.costume),sdk=root.CQC_PASS46_NATIVE_ORIGINS,S=root.CQC_COMBAT_SPRITES;
  if(!spec||typeof sdk?.sourcePoint!=='function')return null;const binding=spec.slots[m.slot];if(!binding||binding.tag!==m.tag)return null;
  const entry=S?.getEntry?.(p.f.uid,p.f),descriptor=root.CQC_NATIVE_WARDROBE_INDEX?.entries?.find(d=>d.uid===p.f.uid&&d.id===p.f.costume);
  if(!entry||entry.pass40Revision!==spec.revision||entry.review?.status!=='approved'||!entry.review.reviewer?.startsWith('Root')||entry.review.artAuditSHA256!==spec.audit||entry.mirror!==false||entry.fallbackMissingActions!==false||descriptor?.metadata?.sha256!==spec.metadataSHA256||descriptor.metadata.bytes!==spec.metadataBytes)return null;
  const side=p.face===-1?'left':'right',actions=p.face===entry.facing?entry.actions:entry.oppositeActions;
  let point;try{point=sdk.sourcePoint(p.f.uid,p.f.costume,side,m.slot,m.tag);}catch{return null;}
  if(point?.sourceAuthorityMethod!=='pure-source-point'||point.evidence!=='reviewed-pass46-native-source-point'||point.worldScaleApplied!==false||point.selectedAction!==binding.action)return null;
  const index=point.selectedFrameIndex,frame=actions?.[binding.action]?.frames?.[index];
  if(!frame||frame.physicalPoseIndex!==binding.physicalPoseIndex||frame.file!==point.sourceFile||frame.sha256!==point.sourceSHA256||!same(frame.rect,point.sourceRect)||!same(frame.pivot,point.sourcePivot)||!point.sourceNativeXY?.every(finite))return null;
  const H=entry.sourceFrameHeights?.[frame.file],ratio=root.CQC_PASS19_WORLD_SCALE?.height?.(p.f)?.ratio;
  if(!finite(H)||H<=0||!finite(entry.displayHeight)||entry.displayHeight<=0||!finite(ratio)||ratio<=0)return null;
  return{entry,actions,frame,index,point,scale:entry.displayHeight/H*1.12*ratio};
 }
 function register(s,p,m,attack,q){
  if(!attack||q.delay<0||q.pass35BoxEmissionOwner||!s||!Number.isInteger(s.round)||(s.a!==p&&s.b!==p))return false;
  const source=authority(p,m);if(!source)return false;
  let record=bursts.get(p);if(!record||record.attack!==attack){record={owner:p,state:s,round:s.round,uid:p.f.uid,costume:p.f.costume,face:p.face,attack,def:m,rounds:[],lastEmissionFrame:-1,lastEmissionRound:null,lastPaintedRound:null};bursts.set(p,record);}
  record.rounds.push(q);rounds.set(q,record);return true;
 }
 function valid(record){if(record?.invalidated)return false;const p=record?.owner,ok=!!p&&record.state?.round===record.round&&(record.state.a===p||record.state.b===p)&&p.f?.uid===record.uid&&p.f.costume===record.costume&&p.face===record.face&&p.attack===record.attack&&p.attack.def===record.def&&p.attack.id===record.attack.id&&p.life>0&&!(p.hit>0)&&!(p.blockstun>0);if(record&&!ok)record.invalidated=true;return ok;}
 function roundEligible(record,q){return !!record&&!!q&&!q.dead&&q.reflections===0&&q.owner===record.owner.slot&&q.burstId===record.attack.id&&q.def===record.def;}
 function pendingPaint(record,frame){const q=record?.lastEmissionRound,age=frame-record?.lastEmissionFrame;return !!q&&record.lastPaintedRound!==q&&Number.isFinite(age)&&age>=0&&age<=maxPendingNativePaintTicks&&q.reflections===0&&q.owner===record.owner.slot&&q.burstId===record.attack.id&&q.def===record.def;}
 function active(record,frame){return valid(record)&&(record.rounds.some(q=>roundEligible(record,q)&&(q.delay>0||q.age<=1))||record.lastEmissionFrame===frame&&roundEligible(record,record.lastEmissionRound)||pendingPaint(record,frame));}
 function poseFor(p,pose,frame){const record=bursts.get(p);if(!active(record,frame)||pose.ko||pose.hit||pose.getup||pose.moveSlot!==record.attack.name||pose.moveKind!==record.def.kind||pose.moveTag!==record.def.tag)return pose;
  const source=authority(p,record.def);if(!source)return pose;
  const key={};poses.set(key,{record,source,frame});return{...pose,[token]:key};
 }
 function selectFrame(entry,pose){const selected=poses.get(pose?.[token]);if(!selected||pose.ko||pose.hit||pose.getup||!active(selected.record,selected.frame))return null;
  const source=authority(selected.record.owner,selected.record.def);if(!source||entry.uid!==source.entry.uid||entry.actions!==source.actions||entry.review?.artAuditSHA256!==source.entry.review.artAuditSHA256||entry.pass40Revision!==source.entry.pass40Revision||!same(source.frame,selected.source.frame))return null;
  selectionCalls++;return{frame:source.frame,requested:source.point.selectedAction,action:source.point.selectedAction,index:source.index,phase:pose.attackPhase,presentation:'reviewed-p46-delayed-burst-source-frame'};
 }
 function emission(s,q){const record=rounds.get(q);if(s!==record?.state||q.age!==0||q.delay>0||!roundEligible(record,q)||!valid(record))return null;
  const p=record.owner,source=authority(p,q.def);if(!source)return null;
  const a=source.point,[x,y]=a.sourceNativeXY,[rx,ry,w,h]=a.sourceRect,[px,py]=a.sourcePivot,k=source.scale;
  const result={x:p.x+(x-rx-px*w)*k,y:p.y+(y-ry-py*h)*k,sourceFile:a.sourceFile,sourceSHA256:a.sourceSHA256,sourceRect:[...a.sourceRect],sourcePivot:[...a.sourcePivot],sourceNativeXY:[...a.sourceNativeXY],scale:k,coordinateSpace:'world',sourceScaleAppliedOnce:true,frame:s.frame,ownerSlot:p.slot,burstId:q.burstId,projectileId:q.id};
  if(!finite(result.x)||!finite(result.y))return null;record.lastEmissionFrame=s.frame;record.lastEmissionRound=q;
  emissions.push({...result,actor:{x:p.x,y:p.y,face:p.face},phase:p.attack.t<p.attack.def.startup?'startup':p.attack.t<p.attack.def.startup+p.attack.def.active?'active':'recovery'});if(emissions.length>96)emissions.shift();return result;
 }
 function drawNative(c,p,f,x,y,face,scale,pose){if(!f||!p?.f||f.uid!==p.f.uid||f.costume!==p.f.costume||face!==p.face)return false;const decorated=poseFor(p,pose,pose.frame);if(!decorated[token])return false;const record=bursts.get(p),wasPending=pendingPaint(record,pose.frame),painted=root.CQC_COMBAT_SPRITES.draw(c,f,x,y,face,scale,decorated)===true;if(painted&&record&&valid(record)){nativePaints++;if(wasPending&&pose.attackPhase!=='active')deferredPaints++;record.lastPaintedRound=record.lastEmissionRound;}return painted;}
 const api=Object.freeze({register,emission,poseFor,selectFrame,drawNative,status:()=>({schema:'cqc.p46.vs-delayed-burst-source/1',allowlist:[...allowed.keys()],selectionCalls,emissions:emissions.map(x=>({...x})),phaseFabricated:false,gameplayProfileChanged:false,priorInstalledP41Delegated:true,nativePaints,deferredNativePaints:deferredPaints,maxPendingNativePaintTicks})});
 root.CQC_PASS46_VS_DELAYED_BURSTS=api;
 // Preserve the already installed engine/renderer hook protocol and all P40 subjects.
 root.CQC_PASS40_VS_DELAYED_BURSTS=Object.freeze({...prior,
  register(...args){return api.register(...args)||prior.register(...args);},
  emission(...args){return api.emission(...args)||prior.emission(...args);},
  poseFor(p,pose,frame){const selected=api.poseFor(p,pose,frame);return selected===pose?prior.poseFor(p,pose,frame):selected;},
  selectFrame(...args){return api.selectFrame(...args)||prior.selectFrame(...args);},
  drawNative(...args){return api.drawNative(...args)||prior.drawNative(...args);}
 });
 root.CQC_PASS46_NATIVE_VISUAL_ACTIONS?.install?.();
 const visualAndLegacy=root.CQC_PASS40_VS_DELAYED_BURSTS;
 root.CQC_PASS40_VS_DELAYED_BURSTS=Object.freeze({...visualAndLegacy,
  selectFrame(...args){return api.selectFrame(...args)||visualAndLegacy.selectFrame(...args);}
 });
})(globalThis);

/* P47 finite two-option adapter; complete installed P46 adapter retained above. */
/* P47 reviewed native-source controller, VS only. Root review required before any product installation.
 * The finite allowlist contains only byte-pinned current Root-reviewed P47 native options. No profile,
 * cadence, velocity, lifetime, cost, damage or interruption rule is changed.
 */
(function(root){'use strict';
 const prior=root.CQC_PASS40_VS_DELAYED_BURSTS;
 if(!prior||!['register','emission','poseFor','selectFrame','drawNative'].every(name=>typeof prior[name]==='function'))throw Error('Contrôleur P40 absent avant son adaptateur P47');
 const allowed=new Map([["core__snake_mgs2:furry",{"revision":"native-batch40-v2","audit":"1b5da1064f4d646669923f9e480518ed05e5010ee20fa1d380e50c5830ef1982","metadataSHA256":"24c228767d2a0edfa79bb48254310f1a4d3f8447584852eb65d70c12aaded799","metadataBytes":2346654,"slots":{"special":{"action":"shoot","physicalPoseIndex":11,"tag":"tranq"},"specialDown":{"action":"deploy","physicalPoseIndex":8,"tag":"explosive"}}}],["core__pain:furry",{"revision":"native-batch40-v2","audit":"97bee0fb64f6a9b997c3fc1a30e93520a4db60e937323a659e19755c64f7046c","metadataSHA256":"6e2e98657177acb4ab00a2ec70f95949ccf70432bbe597900bfa4708b23c9beb","metadataBytes":1678581,"slots":{"special":{"action":"shoot","physicalPoseIndex":11,"tag":"swarm"},"specialForward":{"action":"shoot","physicalPoseIndex":11,"tag":"swarm"},"super":{"action":"charge","physicalPoseIndex":10,"tag":"swarm"}}}]]);
 const bursts=new WeakMap(),rounds=new WeakMap(),token=Symbol('reviewed-p46-vs-burst-frame'),poses=new WeakMap();
 const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b),finite=Number.isFinite;
 const maxPendingNativePaintTicks=8;
 const emissions=[];let selectionCalls=0,nativePaints=0,deferredPaints=0;
 function authority(p,m){
  if(!p?.f||!m||m.kind!=='projectile')return null;
  const spec=allowed.get(p.f.uid+':'+p.f.costume),sdk=root.CQC_PASS47_NATIVE_ORIGINS,S=root.CQC_COMBAT_SPRITES;
  if(!spec||typeof sdk?.sourcePoint!=='function')return null;const binding=spec.slots[m.slot];if(!binding||binding.tag!==m.tag)return null;
  const entry=S?.getEntry?.(p.f.uid,p.f),descriptor=root.CQC_NATIVE_WARDROBE_INDEX?.entries?.find(d=>d.uid===p.f.uid&&d.id===p.f.costume);
  if(!entry||entry.pass40Revision!==spec.revision||entry.review?.status!=='approved'||!entry.review.reviewer?.startsWith('Root')||entry.review.artAuditSHA256!==spec.audit||entry.mirror!==false||entry.fallbackMissingActions!==false||descriptor?.metadata?.sha256!==spec.metadataSHA256||descriptor.metadata.bytes!==spec.metadataBytes)return null;
  const side=p.face===-1?'left':'right',actions=p.face===entry.facing?entry.actions:entry.oppositeActions;
  let point;try{point=sdk.sourcePoint(p.f.uid,p.f.costume,side,m.slot,m.tag);}catch{return null;}
  if(point?.sourceAuthorityMethod!=='pure-source-point'||point.evidence!=='reviewed-pass47-native-source-point'||point.worldScaleApplied!==false||point.selectedAction!==binding.action)return null;
  const index=point.selectedFrameIndex,frame=actions?.[binding.action]?.frames?.[index];
  if(!frame||frame.physicalPoseIndex!==binding.physicalPoseIndex||frame.file!==point.sourceFile||frame.sha256!==point.sourceSHA256||!same(frame.rect,point.sourceRect)||!same(frame.pivot,point.sourcePivot)||!point.sourceNativeXY?.every(finite))return null;
  const H=entry.sourceFrameHeights?.[frame.file],ratio=root.CQC_PASS19_WORLD_SCALE?.height?.(p.f)?.ratio;
  if(!finite(H)||H<=0||!finite(entry.displayHeight)||entry.displayHeight<=0||!finite(ratio)||ratio<=0)return null;
  return{entry,actions,frame,index,point,scale:entry.displayHeight/H*1.12*ratio};
 }
 function register(s,p,m,attack,q){
  if(!attack||q.delay<0||q.pass35BoxEmissionOwner||!s||!Number.isInteger(s.round)||(s.a!==p&&s.b!==p))return false;
  const source=authority(p,m);if(!source)return false;
  let record=bursts.get(p);if(!record||record.attack!==attack){record={owner:p,state:s,round:s.round,uid:p.f.uid,costume:p.f.costume,face:p.face,attack,def:m,rounds:[],lastEmissionFrame:-1,lastEmissionRound:null,lastPaintedRound:null};bursts.set(p,record);}
  record.rounds.push(q);rounds.set(q,record);return true;
 }
 function valid(record){if(record?.invalidated)return false;const p=record?.owner,ok=!!p&&record.state?.round===record.round&&(record.state.a===p||record.state.b===p)&&p.f?.uid===record.uid&&p.f.costume===record.costume&&p.face===record.face&&p.attack===record.attack&&p.attack.def===record.def&&p.attack.id===record.attack.id&&p.life>0&&!(p.hit>0)&&!(p.blockstun>0);if(record&&!ok)record.invalidated=true;return ok;}
 function roundEligible(record,q){return !!record&&!!q&&!q.dead&&q.reflections===0&&q.owner===record.owner.slot&&q.burstId===record.attack.id&&q.def===record.def;}
 function pendingPaint(record,frame){const q=record?.lastEmissionRound,age=frame-record?.lastEmissionFrame;return !!q&&record.lastPaintedRound!==q&&Number.isFinite(age)&&age>=0&&age<=maxPendingNativePaintTicks&&q.reflections===0&&q.owner===record.owner.slot&&q.burstId===record.attack.id&&q.def===record.def;}
 function active(record,frame){return valid(record)&&(record.rounds.some(q=>roundEligible(record,q)&&(q.delay>0||q.age<=1))||record.lastEmissionFrame===frame&&roundEligible(record,record.lastEmissionRound)||pendingPaint(record,frame));}
 function poseFor(p,pose,frame){const record=bursts.get(p);if(!active(record,frame)||pose.ko||pose.hit||pose.getup||pose.moveSlot!==record.attack.name||pose.moveKind!==record.def.kind||pose.moveTag!==record.def.tag)return pose;
  const source=authority(p,record.def);if(!source)return pose;
  const key={};poses.set(key,{record,source,frame});return{...pose,[token]:key};
 }
 function selectFrame(entry,pose){const selected=poses.get(pose?.[token]);if(!selected||pose.ko||pose.hit||pose.getup||!active(selected.record,selected.frame))return null;
  const source=authority(selected.record.owner,selected.record.def);if(!source||entry.uid!==source.entry.uid||entry.actions!==source.actions||entry.review?.artAuditSHA256!==source.entry.review.artAuditSHA256||entry.pass40Revision!==source.entry.pass40Revision||!same(source.frame,selected.source.frame))return null;
  selectionCalls++;return{frame:source.frame,requested:source.point.selectedAction,action:source.point.selectedAction,index:source.index,phase:pose.attackPhase,presentation:'reviewed-p46-delayed-burst-source-frame'};
 }
 function emission(s,q){const record=rounds.get(q);if(s!==record?.state||q.age!==0||q.delay>0||!roundEligible(record,q)||!valid(record))return null;
  const p=record.owner,source=authority(p,q.def);if(!source)return null;
  const a=source.point,[x,y]=a.sourceNativeXY,[rx,ry,w,h]=a.sourceRect,[px,py]=a.sourcePivot,k=source.scale;
  const result={x:p.x+(x-rx-px*w)*k,y:p.y+(y-ry-py*h)*k,sourceFile:a.sourceFile,sourceSHA256:a.sourceSHA256,sourceRect:[...a.sourceRect],sourcePivot:[...a.sourcePivot],sourceNativeXY:[...a.sourceNativeXY],scale:k,coordinateSpace:'world',sourceScaleAppliedOnce:true,frame:s.frame,ownerSlot:p.slot,burstId:q.burstId,projectileId:q.id};
  if(!finite(result.x)||!finite(result.y))return null;record.lastEmissionFrame=s.frame;record.lastEmissionRound=q;
  emissions.push({...result,actor:{x:p.x,y:p.y,face:p.face},phase:p.attack.t<p.attack.def.startup?'startup':p.attack.t<p.attack.def.startup+p.attack.def.active?'active':'recovery'});if(emissions.length>96)emissions.shift();return result;
 }
 function drawNative(c,p,f,x,y,face,scale,pose){if(!f||!p?.f||f.uid!==p.f.uid||f.costume!==p.f.costume||face!==p.face)return false;const decorated=poseFor(p,pose,pose.frame);if(!decorated[token])return false;const record=bursts.get(p),wasPending=pendingPaint(record,pose.frame),painted=root.CQC_COMBAT_SPRITES.draw(c,f,x,y,face,scale,decorated)===true;if(painted&&record&&valid(record)){nativePaints++;if(wasPending&&pose.attackPhase!=='active')deferredPaints++;record.lastPaintedRound=record.lastEmissionRound;}return painted;}
 const api=Object.freeze({register,emission,poseFor,selectFrame,drawNative,status:()=>({schema:'cqc.p46.vs-delayed-burst-source/1',allowlist:[...allowed.keys()],selectionCalls,emissions:emissions.map(x=>({...x})),phaseFabricated:false,gameplayProfileChanged:false,priorInstalledP41Delegated:true,nativePaints,deferredNativePaints:deferredPaints,maxPendingNativePaintTicks})});
 root.CQC_PASS47_VS_DELAYED_BURSTS=api;
 // Preserve the already installed engine/renderer hook protocol and all P40 subjects.
 root.CQC_PASS40_VS_DELAYED_BURSTS=Object.freeze({...prior,
  register(...args){return api.register(...args)||prior.register(...args);},
  emission(...args){return api.emission(...args)||prior.emission(...args);},
  poseFor(p,pose,frame){const selected=api.poseFor(p,pose,frame);return selected===pose?prior.poseFor(p,pose,frame):selected;},
  selectFrame(...args){return api.selectFrame(...args)||prior.selectFrame(...args);},
  drawNative(...args){return api.drawNative(...args)||prior.drawNative(...args);}
 });
 root.CQC_PASS47_NATIVE_VISUAL_ACTIONS?.install?.();
 const visualAndLegacy=root.CQC_PASS40_VS_DELAYED_BURSTS;
 root.CQC_PASS40_VS_DELAYED_BURSTS=Object.freeze({...visualAndLegacy,
  selectFrame(...args){return api.selectFrame(...args)||visualAndLegacy.selectFrame(...args);}
 });
})(globalThis);

/* P47 finite three-option adapter; complete installed P46 adapter retained above. */
/* P47 reviewed native-source controller, VS only. Root review required before any product installation.
 * The finite allowlist contains only byte-pinned current Root-reviewed P47 native options. No profile,
 * cadence, velocity, lifetime, cost, damage or interruption rule is changed.
 */
(function(root){'use strict';
 const prior=root.CQC_PASS40_VS_DELAYED_BURSTS;
 if(!prior||!['register','emission','poseFor','selectFrame','drawNative'].every(name=>typeof prior[name]==='function'))throw Error('Contrôleur P40 absent avant son adaptateur P47');
 const allowed=new Map([["core__olga_mgs2:cyborg",{"revision":"native-batch40-v2","audit":"57c547f16087fc53820d52b5ff6e8c01300f1f6152f672d46ed6ca27ac11af4b","metadataSHA256":"b477fd5dd653c530c9738b9f17caab69349ba07685d4371c11b992f74d1b5ce4","metadataBytes":1564667,"slots":{"special":{"action":"shoot","physicalPoseIndex":11,"tag":"ballistic"},"specialDown":{"action":"deploy","physicalPoseIndex":8,"tag":"explosive"},"super":{"action":"shoot","physicalPoseIndex":11,"tag":"ballistic"}}}],["core__ocelot_mgs2:zombie",{"revision":"native-batch40-v2","audit":"53f2631ac723c9b7ecd87f9cd93dc201aba67b9427476640ccd66f7dd2add442","metadataSHA256":"66e5599130c3bbe9172dd4194894b0db9f6e3135be61455e1d0f9c628d0a5042","metadataBytes":2312902,"slots":{"special":{"action":"shoot","physicalPoseIndex":11,"tag":"precision"},"specialDown":{"action":"deploy","physicalPoseIndex":9,"tag":"ballistic"},"super":{"action":"shoot","physicalPoseIndex":11,"tag":"ballistic"}}}],["core__ocelot_mgsv:survive",{"revision":"native-batch40-v2","audit":"f1425edaea66ec036621828e30772742ca1660f4d6bf0eaf880a7a8b31fc3b27","metadataSHA256":"93ad1e8486fdb15feb7c5471030c52b8062c5428b6daea30d8e58362368069e2","metadataBytes":2078244,"slots":{"special":{"action":"shoot","physicalPoseIndex":11,"tag":"precision"},"specialDown":{"action":"deploy","physicalPoseIndex":9,"tag":"ballistic"},"super":{"action":"shoot","physicalPoseIndex":11,"tag":"ballistic"}}}]]);
 const bursts=new WeakMap(),rounds=new WeakMap(),token=Symbol('reviewed-p46-vs-burst-frame'),poses=new WeakMap();
 const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b),finite=Number.isFinite;
 const maxPendingNativePaintTicks=8;
 const emissions=[];let selectionCalls=0,nativePaints=0,deferredPaints=0;
 function authority(p,m){
  if(!p?.f||!m||m.kind!=='projectile')return null;
  const spec=allowed.get(p.f.uid+':'+p.f.costume),sdk=root.CQC_PASS47_NEXT3_NATIVE_ORIGINS,S=root.CQC_COMBAT_SPRITES;
  if(!spec||typeof sdk?.sourcePoint!=='function')return null;const binding=spec.slots[m.slot];if(!binding||binding.tag!==m.tag)return null;
  const entry=S?.getEntry?.(p.f.uid,p.f),descriptor=root.CQC_NATIVE_WARDROBE_INDEX?.entries?.find(d=>d.uid===p.f.uid&&d.id===p.f.costume);
  if(!entry||entry.pass40Revision!==spec.revision||entry.review?.status!=='approved'||!entry.review.reviewer?.startsWith('Root')||entry.review.artAuditSHA256!==spec.audit||entry.mirror!==false||entry.fallbackMissingActions!==false||descriptor?.metadata?.sha256!==spec.metadataSHA256||descriptor.metadata.bytes!==spec.metadataBytes)return null;
  const side=p.face===-1?'left':'right',actions=p.face===entry.facing?entry.actions:entry.oppositeActions;
  let point;try{point=sdk.sourcePoint(p.f.uid,p.f.costume,side,m.slot,m.tag);}catch{return null;}
  if(point?.sourceAuthorityMethod!=='pure-source-point'||point.evidence!=='reviewed-pass47n3-native-source-point'||point.worldScaleApplied!==false||point.selectedAction!==binding.action)return null;
  const index=point.selectedFrameIndex,frame=actions?.[binding.action]?.frames?.[index];
  if(!frame||frame.physicalPoseIndex!==binding.physicalPoseIndex||frame.file!==point.sourceFile||frame.sha256!==point.sourceSHA256||!same(frame.rect,point.sourceRect)||!same(frame.pivot,point.sourcePivot)||!point.sourceNativeXY?.every(finite))return null;
  const H=entry.sourceFrameHeights?.[frame.file],ratio=root.CQC_PASS19_WORLD_SCALE?.height?.(p.f)?.ratio;
  if(!finite(H)||H<=0||!finite(entry.displayHeight)||entry.displayHeight<=0||!finite(ratio)||ratio<=0)return null;
  return{entry,actions,frame,index,point,scale:entry.displayHeight/H*1.12*ratio};
 }
 function register(s,p,m,attack,q){
  if(!attack||q.delay<0||q.pass35BoxEmissionOwner||!s||!Number.isInteger(s.round)||(s.a!==p&&s.b!==p))return false;
  const source=authority(p,m);if(!source)return false;
  let record=bursts.get(p);if(!record||record.attack!==attack){record={owner:p,state:s,round:s.round,uid:p.f.uid,costume:p.f.costume,face:p.face,attack,def:m,rounds:[],lastEmissionFrame:-1,lastEmissionRound:null,lastPaintedRound:null};bursts.set(p,record);}
  record.rounds.push(q);rounds.set(q,record);return true;
 }
 function valid(record){if(record?.invalidated)return false;const p=record?.owner,ok=!!p&&record.state?.round===record.round&&(record.state.a===p||record.state.b===p)&&p.f?.uid===record.uid&&p.f.costume===record.costume&&p.face===record.face&&p.attack===record.attack&&p.attack.def===record.def&&p.attack.id===record.attack.id&&p.life>0&&!(p.hit>0)&&!(p.blockstun>0);if(record&&!ok)record.invalidated=true;return ok;}
 function roundEligible(record,q){return !!record&&!!q&&!q.dead&&q.reflections===0&&q.owner===record.owner.slot&&q.burstId===record.attack.id&&q.def===record.def;}
 function pendingPaint(record,frame){const q=record?.lastEmissionRound,age=frame-record?.lastEmissionFrame;return !!q&&record.lastPaintedRound!==q&&Number.isFinite(age)&&age>=0&&age<=maxPendingNativePaintTicks&&q.reflections===0&&q.owner===record.owner.slot&&q.burstId===record.attack.id&&q.def===record.def;}
 function active(record,frame){return valid(record)&&(record.rounds.some(q=>roundEligible(record,q)&&(q.delay>0||q.age<=1))||record.lastEmissionFrame===frame&&roundEligible(record,record.lastEmissionRound)||pendingPaint(record,frame));}
 function poseFor(p,pose,frame){const record=bursts.get(p);if(!active(record,frame)||pose.ko||pose.hit||pose.getup||pose.moveSlot!==record.attack.name||pose.moveKind!==record.def.kind||pose.moveTag!==record.def.tag)return pose;
  const source=authority(p,record.def);if(!source)return pose;
  const key={};poses.set(key,{record,source,frame});return{...pose,[token]:key};
 }
 function selectFrame(entry,pose){const selected=poses.get(pose?.[token]);if(!selected||pose.ko||pose.hit||pose.getup||!active(selected.record,selected.frame))return null;
  const source=authority(selected.record.owner,selected.record.def);if(!source||entry.uid!==source.entry.uid||entry.actions!==source.actions||entry.review?.artAuditSHA256!==source.entry.review.artAuditSHA256||entry.pass40Revision!==source.entry.pass40Revision||!same(source.frame,selected.source.frame))return null;
  selectionCalls++;return{frame:source.frame,requested:source.point.selectedAction,action:source.point.selectedAction,index:source.index,phase:pose.attackPhase,presentation:'reviewed-p46-delayed-burst-source-frame'};
 }
 function emission(s,q){const record=rounds.get(q);if(s!==record?.state||q.age!==0||q.delay>0||!roundEligible(record,q)||!valid(record))return null;
  const p=record.owner,source=authority(p,q.def);if(!source)return null;
  const a=source.point,[x,y]=a.sourceNativeXY,[rx,ry,w,h]=a.sourceRect,[px,py]=a.sourcePivot,k=source.scale;
  const result={x:p.x+(x-rx-px*w)*k,y:p.y+(y-ry-py*h)*k,sourceFile:a.sourceFile,sourceSHA256:a.sourceSHA256,sourceRect:[...a.sourceRect],sourcePivot:[...a.sourcePivot],sourceNativeXY:[...a.sourceNativeXY],scale:k,coordinateSpace:'world',sourceScaleAppliedOnce:true,frame:s.frame,ownerSlot:p.slot,burstId:q.burstId,projectileId:q.id};
  if(!finite(result.x)||!finite(result.y))return null;record.lastEmissionFrame=s.frame;record.lastEmissionRound=q;
  emissions.push({...result,actor:{x:p.x,y:p.y,face:p.face},phase:p.attack.t<p.attack.def.startup?'startup':p.attack.t<p.attack.def.startup+p.attack.def.active?'active':'recovery'});if(emissions.length>96)emissions.shift();return result;
 }
 function drawNative(c,p,f,x,y,face,scale,pose){if(!f||!p?.f||f.uid!==p.f.uid||f.costume!==p.f.costume||face!==p.face)return false;const decorated=poseFor(p,pose,pose.frame);if(!decorated[token])return false;const record=bursts.get(p),wasPending=pendingPaint(record,pose.frame),painted=root.CQC_COMBAT_SPRITES.draw(c,f,x,y,face,scale,decorated)===true;if(painted&&record&&valid(record)){nativePaints++;if(wasPending&&pose.attackPhase!=='active')deferredPaints++;record.lastPaintedRound=record.lastEmissionRound;}return painted;}
 const api=Object.freeze({register,emission,poseFor,selectFrame,drawNative,status:()=>({schema:'cqc.p46.vs-delayed-burst-source/1',allowlist:[...allowed.keys()],selectionCalls,emissions:emissions.map(x=>({...x})),phaseFabricated:false,gameplayProfileChanged:false,priorInstalledP41Delegated:true,nativePaints,deferredNativePaints:deferredPaints,maxPendingNativePaintTicks})});
 root.CQC_PASS47_NEXT3_VS_DELAYED_BURSTS=api;
 // Preserve the already installed engine/renderer hook protocol and all P40 subjects.
 root.CQC_PASS40_VS_DELAYED_BURSTS=Object.freeze({...prior,
  register(...args){return api.register(...args)||prior.register(...args);},
  emission(...args){return api.emission(...args)||prior.emission(...args);},
  poseFor(p,pose,frame){const selected=api.poseFor(p,pose,frame);return selected===pose?prior.poseFor(p,pose,frame):selected;},
  selectFrame(...args){return api.selectFrame(...args)||prior.selectFrame(...args);},
  drawNative(...args){return api.drawNative(...args)||prior.drawNative(...args);}
 });
 root.CQC_PASS47_NEXT3_NATIVE_VISUAL_ACTIONS?.install?.();
 const visualAndLegacy=root.CQC_PASS40_VS_DELAYED_BURSTS;
 root.CQC_PASS40_VS_DELAYED_BURSTS=Object.freeze({...visualAndLegacy,
  selectFrame(...args){return api.selectFrame(...args)||visualAndLegacy.selectFrame(...args);}
 });
})(globalThis);
/* Restore the exact non-projectile MGR2 visual slots after the actual final burst hooks. */
(function(root){'use strict';const visual=root.CQC_PASS47_MGR2_NATIVE_VISUAL_ACTIONS;if(typeof visual?.install!=='function')throw Error('Reviewed MGR2 visual dispatcher absent after final hooks');visual.install();})(globalThis);

/* P47 finite three-option adapter; complete installed P46 adapter retained above. */
/* P47 reviewed native-source controller, VS only. Root review required before any product installation.
 * The finite allowlist contains only byte-pinned current Root-reviewed P47 native options. No profile,
 * cadence, velocity, lifetime, cost, damage or interruption rule is changed.
 */
(function(root){'use strict';
 const prior=root.CQC_PASS40_VS_DELAYED_BURSTS;
 if(!prior||!['register','emission','poseFor','selectFrame','drawNative'].every(name=>typeof prior[name]==='function'))throw Error('Contrôleur P40 absent avant son adaptateur P47');
 const allowed=new Map([["core__fury:metalgear",{"revision":"native-batch40-v2","audit":"ba432a799ef4f0df0de8ffa05f4ebf7b4dd299a62f262798e03dc8430eb90824","metadataSHA256":"f94bc64a811e6850561091eb7be975422d99b39bb390be082c85ebfd2519839c","metadataBytes":2181352,"slots":{"special":{"action":"shoot","physicalPoseIndex":11,"tag":"fire"},"super":{"action":"shoot","physicalPoseIndex":11,"tag":"fire"}}}],["core__vamp:zombie",{"revision":"native-batch40-v2","audit":"df891150655f057daf84706a31d8ae8f9521cfdfb9c3f8c727518d1d35ed0fb3","metadataSHA256":"21f5924d20f9e972db8e556ba3095fe968d7cd60e4e95d66f75daad234136f6b","metadataBytes":1924329,"slots":{"special":{"action":"shoot","physicalPoseIndex":11,"tag":"knife"},"specialDown":{"action":"deploy","physicalPoseIndex":8,"tag":"knife"}}}],["core__teliko:survive",{"revision":"native-batch40-v2","audit":"3fc93b8e01a5a03db089b80889dd42d46d1edcf627263a275ab169dee8f4dce9","metadataSHA256":"112a739320ec4f96e067a029e30da30784d6ee9533f5b93e6a218184994742df","metadataBytes":1587895,"slots":{"special":{"action":"shoot","physicalPoseIndex":11,"tag":"ballistic"},"specialDown":{"action":"deploy","physicalPoseIndex":8,"tag":"explosive"},"super":{"action":"optic","physicalPoseIndex":16,"tag":"card"}}}]]);
 const bursts=new WeakMap(),rounds=new WeakMap(),token=Symbol('reviewed-p46-vs-burst-frame'),poses=new WeakMap();
 const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b),finite=Number.isFinite;
 const maxPendingNativePaintTicks=8;
 const emissions=[];let selectionCalls=0,nativePaints=0,deferredPaints=0;
 function authority(p,m){
  if(!p?.f||!m||m.kind!=='projectile')return null;
  const spec=allowed.get(p.f.uid+':'+p.f.costume),sdk=root.CQC_PASS47_D3_NATIVE_ORIGINS,S=root.CQC_COMBAT_SPRITES;
  if(!spec||typeof sdk?.sourcePoint!=='function')return null;const binding=spec.slots[m.slot];if(!binding||binding.tag!==m.tag)return null;
  const entry=S?.getEntry?.(p.f.uid,p.f),descriptor=root.CQC_NATIVE_WARDROBE_INDEX?.entries?.find(d=>d.uid===p.f.uid&&d.id===p.f.costume);
  if(!entry||entry.pass40Revision!==spec.revision||entry.review?.status!=='approved'||!entry.review.reviewer?.startsWith('Root')||entry.review.artAuditSHA256!==spec.audit||entry.mirror!==false||entry.fallbackMissingActions!==false||descriptor?.metadata?.sha256!==spec.metadataSHA256||descriptor.metadata.bytes!==spec.metadataBytes)return null;
  const side=p.face===-1?'left':'right',actions=p.face===entry.facing?entry.actions:entry.oppositeActions;
  let point;try{point=sdk.sourcePoint(p.f.uid,p.f.costume,side,m.slot,m.tag);}catch{return null;}
  if(point?.sourceAuthorityMethod!=='pure-source-point'||point.evidence!=='reviewed-pass47d3-native-source-point'||point.worldScaleApplied!==false||point.selectedAction!==binding.action)return null;
  const index=point.selectedFrameIndex,frame=actions?.[binding.action]?.frames?.[index];
  if(!frame||frame.physicalPoseIndex!==binding.physicalPoseIndex||frame.file!==point.sourceFile||frame.sha256!==point.sourceSHA256||!same(frame.rect,point.sourceRect)||!same(frame.pivot,point.sourcePivot)||!point.sourceNativeXY?.every(finite))return null;
  const H=entry.sourceFrameHeights?.[frame.file],ratio=root.CQC_PASS19_WORLD_SCALE?.height?.(p.f)?.ratio;
  if(!finite(H)||H<=0||!finite(entry.displayHeight)||entry.displayHeight<=0||!finite(ratio)||ratio<=0)return null;
  return{entry,actions,frame,index,point,scale:entry.displayHeight/H*1.12*ratio};
 }
 function register(s,p,m,attack,q){
  if(!attack||q.delay<0||q.pass35BoxEmissionOwner||!s||!Number.isInteger(s.round)||(s.a!==p&&s.b!==p))return false;
  const source=authority(p,m);if(!source)return false;
  let record=bursts.get(p);if(!record||record.attack!==attack){record={owner:p,state:s,round:s.round,uid:p.f.uid,costume:p.f.costume,face:p.face,attack,def:m,rounds:[],lastEmissionFrame:-1,lastEmissionRound:null,lastPaintedRound:null};bursts.set(p,record);}
  record.rounds.push(q);rounds.set(q,record);return true;
 }
 function valid(record){if(record?.invalidated)return false;const p=record?.owner,ok=!!p&&record.state?.round===record.round&&(record.state.a===p||record.state.b===p)&&p.f?.uid===record.uid&&p.f.costume===record.costume&&p.face===record.face&&p.attack===record.attack&&p.attack.def===record.def&&p.attack.id===record.attack.id&&p.life>0&&!(p.hit>0)&&!(p.blockstun>0);if(record&&!ok)record.invalidated=true;return ok;}
 function roundEligible(record,q){return !!record&&!!q&&!q.dead&&q.reflections===0&&q.owner===record.owner.slot&&q.burstId===record.attack.id&&q.def===record.def;}
 function pendingPaint(record,frame){const q=record?.lastEmissionRound,age=frame-record?.lastEmissionFrame;return !!q&&record.lastPaintedRound!==q&&Number.isFinite(age)&&age>=0&&age<=maxPendingNativePaintTicks&&q.reflections===0&&q.owner===record.owner.slot&&q.burstId===record.attack.id&&q.def===record.def;}
 function active(record,frame){return valid(record)&&(record.rounds.some(q=>roundEligible(record,q)&&(q.delay>0||q.age<=1))||record.lastEmissionFrame===frame&&roundEligible(record,record.lastEmissionRound)||pendingPaint(record,frame));}
 function poseFor(p,pose,frame){const record=bursts.get(p);if(!active(record,frame)||pose.ko||pose.hit||pose.getup||pose.moveSlot!==record.attack.name||pose.moveKind!==record.def.kind||pose.moveTag!==record.def.tag)return pose;
  const source=authority(p,record.def);if(!source)return pose;
  const key={};poses.set(key,{record,source,frame});return{...pose,[token]:key};
 }
 function selectFrame(entry,pose){const selected=poses.get(pose?.[token]);if(!selected||pose.ko||pose.hit||pose.getup||!active(selected.record,selected.frame))return null;
  const source=authority(selected.record.owner,selected.record.def);if(!source||entry.uid!==source.entry.uid||entry.actions!==source.actions||entry.review?.artAuditSHA256!==source.entry.review.artAuditSHA256||entry.pass40Revision!==source.entry.pass40Revision||!same(source.frame,selected.source.frame))return null;
  selectionCalls++;return{frame:source.frame,requested:source.point.selectedAction,action:source.point.selectedAction,index:source.index,phase:pose.attackPhase,presentation:'reviewed-p46-delayed-burst-source-frame'};
 }
 function emission(s,q){const record=rounds.get(q);if(s!==record?.state||q.age!==0||q.delay>0||!roundEligible(record,q)||!valid(record))return null;
  const p=record.owner,source=authority(p,q.def);if(!source)return null;
  const a=source.point,[x,y]=a.sourceNativeXY,[rx,ry,w,h]=a.sourceRect,[px,py]=a.sourcePivot,k=source.scale;
  const result={x:p.x+(x-rx-px*w)*k,y:p.y+(y-ry-py*h)*k,sourceFile:a.sourceFile,sourceSHA256:a.sourceSHA256,sourceRect:[...a.sourceRect],sourcePivot:[...a.sourcePivot],sourceNativeXY:[...a.sourceNativeXY],scale:k,coordinateSpace:'world',sourceScaleAppliedOnce:true,frame:s.frame,ownerSlot:p.slot,burstId:q.burstId,projectileId:q.id};
  if(!finite(result.x)||!finite(result.y))return null;record.lastEmissionFrame=s.frame;record.lastEmissionRound=q;
  emissions.push({...result,actor:{x:p.x,y:p.y,face:p.face},phase:p.attack.t<p.attack.def.startup?'startup':p.attack.t<p.attack.def.startup+p.attack.def.active?'active':'recovery'});if(emissions.length>96)emissions.shift();return result;
 }
 function drawNative(c,p,f,x,y,face,scale,pose){if(!f||!p?.f||f.uid!==p.f.uid||f.costume!==p.f.costume||face!==p.face)return false;const decorated=poseFor(p,pose,pose.frame);if(!decorated[token])return false;const record=bursts.get(p),wasPending=pendingPaint(record,pose.frame),painted=root.CQC_COMBAT_SPRITES.draw(c,f,x,y,face,scale,decorated)===true;if(painted&&record&&valid(record)){nativePaints++;if(wasPending&&pose.attackPhase!=='active')deferredPaints++;record.lastPaintedRound=record.lastEmissionRound;}return painted;}
 const api=Object.freeze({register,emission,poseFor,selectFrame,drawNative,status:()=>({schema:'cqc.p46.vs-delayed-burst-source/1',allowlist:[...allowed.keys()],selectionCalls,emissions:emissions.map(x=>({...x})),phaseFabricated:false,gameplayProfileChanged:false,priorInstalledP41Delegated:true,nativePaints,deferredNativePaints:deferredPaints,maxPendingNativePaintTicks})});
 root.CQC_PASS47_D3_VS_DELAYED_BURSTS=api;
 // Preserve the already installed engine/renderer hook protocol and all P40 subjects.
 root.CQC_PASS40_VS_DELAYED_BURSTS=Object.freeze({...prior,
  register(...args){return api.register(...args)||prior.register(...args);},
  emission(...args){return api.emission(...args)||prior.emission(...args);},
  poseFor(p,pose,frame){const selected=api.poseFor(p,pose,frame);return selected===pose?prior.poseFor(p,pose,frame):selected;},
  selectFrame(...args){return api.selectFrame(...args)||prior.selectFrame(...args);},
  drawNative(...args){return api.drawNative(...args)||prior.drawNative(...args);}
 });
 root.CQC_PASS47_D3_NATIVE_VISUAL_ACTIONS?.install?.();
 const visualAndLegacy=root.CQC_PASS40_VS_DELAYED_BURSTS;
 root.CQC_PASS40_VS_DELAYED_BURSTS=Object.freeze({...visualAndLegacy,
  selectFrame(...args){return api.selectFrame(...args)||visualAndLegacy.selectFrame(...args);}
 });
})(globalThis);
/* P47 N9 finite projectile-only delayed adapter; chaff retains actual non-projectile transport. */
/* P47 reviewed native-source controller, VS only. Root review required before any product installation.
 * The finite allowlist contains only byte-pinned current Root-reviewed P47 native options. No profile,
 * cadence, velocity, lifetime, cost, damage or interruption rule is changed.
 */
(function(root){'use strict';
 const prior=root.CQC_PASS40_VS_DELAYED_BURSTS;
 if(!prior||!['register','emission','poseFor','selectFrame','drawNative'].every(name=>typeof prior[name]==='function'))throw Error('Contrôleur P40 absent avant son adaptateur P47');
 const allowed=new Map([["core__quiet:furry",{"revision":"native-batch40-v2","audit":"fad52e4b72048096e8308e0239c461f3b1d35bcc6fd52cec6dee0bf8d1b9c130","metadataSHA256":"14ba9cbdc146e51ce5342624ef800c2269a90729924d0cf7c2de417749bfb58c","metadataBytes":2315321,"slots":{"special":{"action":"shoot","physicalPoseIndex":11,"tag":"precision"},"specialDown":{"action":"deploy","physicalPoseIndex":8,"tag":"precision"},"super":{"action":"charge","physicalPoseIndex":11,"tag":"precision"}}}],["core__armstrong:zombie",{"revision":"native-batch40-v2","audit":"2cb99c0400a11a261d2e09d230a32118965a0a6041d54ee62b26a8efa092ea10","metadataSHA256":"133053097628c0f0f2e989be18a5851248d49c11bf3092db79997d41165a63bd","metadataBytes":1760694,"slots":{}}],["core__venom:zombie",{"revision":"native-batch40-v2","audit":"0d98902c9f81596be565697594bd3a1fda4de475f7aace4adda4dcb181705bda","metadataSHA256":"4c3503f4ea1277a2f18cbbbca705663ae37e6d7a6f3e8ce6ba82cea5b66deee2","metadataBytes":1979440,"slots":{"special":{"action":"shoot","physicalPoseIndex":11,"tag":"ballistic"}}}],["core__johnny_mgs4:cyborg",{"revision":"native-batch40-v2","audit":"83d0cb3b740e7941f49030f6a5d56b4cc04f7e9938193d1f55c8a6715985c71a","metadataSHA256":"9c81fb78e477a5befbac8247a228c96398b7488b611bdb6b5cb75453b1bd03b3","metadataBytes":1482995,"slots":{"special":{"action":"shoot","physicalPoseIndex":11,"tag":"precision"},"specialDown":{"action":"deploy","physicalPoseIndex":8,"tag":"explosive"},"super":{"action":"shoot","physicalPoseIndex":11,"tag":"ballistic"}}}],["core__meryl_mgs4:zombie",{"revision":"native-batch40-v2","audit":"1428d4c913efb8c6bc7a02e6f3e52b7fe393299564f463d3b10e1159b1776b3b","metadataSHA256":"5971638586a6da716e72f2f89a2c3aee4b7309e4fc7348d24260be7b1946a887","metadataBytes":1280470,"slots":{"special":{"action":"shoot","physicalPoseIndex":11,"tag":"ballistic"},"specialDown":{"action":"deploy","physicalPoseIndex":8,"tag":"explosive"},"super":{"action":"shoot","physicalPoseIndex":11,"tag":"ballistic"}}}],["core__vamp_mgs4:zombie",{"revision":"native-batch40-v2","audit":"8fa7b90df03ca18951b2a1e25d9be7d0dcd572df7af860de93aebcef247e2422","metadataSHA256":"66e8f646ae4129341371931d4f855a32658f8cdf9978e257ab1e13cbb6295efb","metadataBytes":1701645,"slots":{"special":{"action":"shoot","physicalPoseIndex":11,"tag":"knife"},"specialDown":{"action":"deploy","physicalPoseIndex":8,"tag":"knife"}}}],["core__old_snake:furry",{"revision":"native-batch40-v2","audit":"d60218fe3454711b4c2f43a5d9ae5d53cf84163c2a80236eb3ba715dbd14240b","metadataSHA256":"bbd0867b8ea84d3876e47e66d5689c86eeda39d690e1905e29672c8e3652256e","metadataBytes":2173454,"slots":{"special":{"action":"shoot","physicalPoseIndex":11,"tag":"tranq"}}}],["core__raiden_mgs2:zombie",{"revision":"native-batch40-v2","audit":"2ad734fe737cb630bbb761a527358db2b05f597cdef11ae4b0cdfee895c371dd","metadataSHA256":"6afce197ce3823ca46b1927d87ab68025b00c5fdc1988c2148f21bdda1250f98","metadataBytes":2467793,"slots":{"special":{"action":"shoot","physicalPoseIndex":11,"tag":"ballistic"},"specialDown":{"action":"deploy","physicalPoseIndex":8,"tag":"emp"}}}],["core__liquid_ocelot:metalgear",{"revision":"native-batch40-v2","audit":"f2ee81cb46ccd12c04b71de375d96035c2f86737f2303a311de84fbedc3ebd2a","metadataSHA256":"7f52370d6d97e01dc03ee9d4c4bcc3dc867c7c2afcfa16c68cd9fc30e458726b","metadataBytes":1358470,"slots":{}}]]);
 const bursts=new WeakMap(),rounds=new WeakMap(),token=Symbol('reviewed-p46-vs-burst-frame'),poses=new WeakMap();
 const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b),finite=Number.isFinite;
 const maxPendingNativePaintTicks=8;
 const emissions=[];let selectionCalls=0,nativePaints=0,deferredPaints=0;
 function authority(p,m){
  if(!p?.f||!m||m.kind!=='projectile')return null;
  const spec=allowed.get(p.f.uid+':'+p.f.costume),sdk=root.CQC_PASS47_N9_NATIVE_ORIGINS,S=root.CQC_COMBAT_SPRITES;
  if(!spec||typeof sdk?.sourcePoint!=='function')return null;const binding=spec.slots[m.slot];if(!binding||binding.tag!==m.tag)return null;
  const entry=S?.getEntry?.(p.f.uid,p.f),descriptor=root.CQC_NATIVE_WARDROBE_INDEX?.entries?.find(d=>d.uid===p.f.uid&&d.id===p.f.costume);
  if(!entry||entry.pass40Revision!==spec.revision||entry.review?.status!=='approved'||!entry.review.reviewer?.startsWith('Root')||entry.review.artAuditSHA256!==spec.audit||entry.mirror!==false||entry.fallbackMissingActions!==false||descriptor?.metadata?.sha256!==spec.metadataSHA256||descriptor.metadata.bytes!==spec.metadataBytes)return null;
  const side=p.face===-1?'left':'right',actions=p.face===entry.facing?entry.actions:entry.oppositeActions;
  let point;try{point=sdk.sourcePoint(p.f.uid,p.f.costume,side,m.slot,m.tag);}catch{return null;}
  if(point?.sourceAuthorityMethod!=='pure-source-point'||point.evidence!=='reviewed-pass47n9-native-source-point'||point.worldScaleApplied!==false||point.selectedAction!==binding.action)return null;
  const index=point.selectedFrameIndex,frame=actions?.[binding.action]?.frames?.[index];
  if(!frame||frame.physicalPoseIndex!==binding.physicalPoseIndex||frame.file!==point.sourceFile||frame.sha256!==point.sourceSHA256||!same(frame.rect,point.sourceRect)||!same(frame.pivot,point.sourcePivot)||!point.sourceNativeXY?.every(finite))return null;
  const H=entry.sourceFrameHeights?.[frame.file],ratio=root.CQC_PASS19_WORLD_SCALE?.height?.(p.f)?.ratio;
  if(!finite(H)||H<=0||!finite(entry.displayHeight)||entry.displayHeight<=0||!finite(ratio)||ratio<=0)return null;
  return{entry,actions,frame,index,point,scale:entry.displayHeight/H*1.12*ratio};
 }
 function register(s,p,m,attack,q){
  if(!attack||q.delay<0||q.pass35BoxEmissionOwner||!s||!Number.isInteger(s.round)||(s.a!==p&&s.b!==p))return false;
  const source=authority(p,m);if(!source)return false;
  let record=bursts.get(p);if(!record||record.attack!==attack){record={owner:p,state:s,round:s.round,uid:p.f.uid,costume:p.f.costume,face:p.face,attack,def:m,rounds:[],lastEmissionFrame:-1,lastEmissionRound:null,lastPaintedRound:null};bursts.set(p,record);}
  record.rounds.push(q);rounds.set(q,record);return true;
 }
 function valid(record){if(record?.invalidated)return false;const p=record?.owner,ok=!!p&&record.state?.round===record.round&&(record.state.a===p||record.state.b===p)&&p.f?.uid===record.uid&&p.f.costume===record.costume&&p.face===record.face&&p.attack===record.attack&&p.attack.def===record.def&&p.attack.id===record.attack.id&&p.life>0&&!(p.hit>0)&&!(p.blockstun>0);if(record&&!ok)record.invalidated=true;return ok;}
 function roundEligible(record,q){return !!record&&!!q&&!q.dead&&q.reflections===0&&q.owner===record.owner.slot&&q.burstId===record.attack.id&&q.def===record.def;}
 function pendingPaint(record,frame){const q=record?.lastEmissionRound,age=frame-record?.lastEmissionFrame;return !!q&&record.lastPaintedRound!==q&&Number.isFinite(age)&&age>=0&&age<=maxPendingNativePaintTicks&&q.reflections===0&&q.owner===record.owner.slot&&q.burstId===record.attack.id&&q.def===record.def;}
 function active(record,frame){return valid(record)&&(record.rounds.some(q=>roundEligible(record,q)&&(q.delay>0||q.age<=1))||record.lastEmissionFrame===frame&&roundEligible(record,record.lastEmissionRound)||pendingPaint(record,frame));}
 function poseFor(p,pose,frame){const record=bursts.get(p);if(!active(record,frame)||pose.ko||pose.hit||pose.getup||pose.moveSlot!==record.attack.name||pose.moveKind!==record.def.kind||pose.moveTag!==record.def.tag)return pose;
  const source=authority(p,record.def);if(!source)return pose;
  const key={};poses.set(key,{record,source,frame});return{...pose,[token]:key};
 }
 function selectFrame(entry,pose){const selected=poses.get(pose?.[token]);if(!selected||pose.ko||pose.hit||pose.getup||!active(selected.record,selected.frame))return null;
  const source=authority(selected.record.owner,selected.record.def);if(!source||entry.uid!==source.entry.uid||entry.actions!==source.actions||entry.review?.artAuditSHA256!==source.entry.review.artAuditSHA256||entry.pass40Revision!==source.entry.pass40Revision||!same(source.frame,selected.source.frame))return null;
  selectionCalls++;return{frame:source.frame,requested:source.point.selectedAction,action:source.point.selectedAction,index:source.index,phase:pose.attackPhase,presentation:'reviewed-p46-delayed-burst-source-frame'};
 }
 function emission(s,q){const record=rounds.get(q);if(s!==record?.state||q.age!==0||q.delay>0||!roundEligible(record,q)||!valid(record))return null;
  const p=record.owner,source=authority(p,q.def);if(!source)return null;
  const a=source.point,[x,y]=a.sourceNativeXY,[rx,ry,w,h]=a.sourceRect,[px,py]=a.sourcePivot,k=source.scale;
  const result={x:p.x+(x-rx-px*w)*k,y:p.y+(y-ry-py*h)*k,sourceFile:a.sourceFile,sourceSHA256:a.sourceSHA256,sourceRect:[...a.sourceRect],sourcePivot:[...a.sourcePivot],sourceNativeXY:[...a.sourceNativeXY],scale:k,coordinateSpace:'world',sourceScaleAppliedOnce:true,frame:s.frame,ownerSlot:p.slot,burstId:q.burstId,projectileId:q.id};
  if(!finite(result.x)||!finite(result.y))return null;record.lastEmissionFrame=s.frame;record.lastEmissionRound=q;
  emissions.push({...result,actor:{x:p.x,y:p.y,face:p.face},phase:p.attack.t<p.attack.def.startup?'startup':p.attack.t<p.attack.def.startup+p.attack.def.active?'active':'recovery'});if(emissions.length>96)emissions.shift();return result;
 }
 function drawNative(c,p,f,x,y,face,scale,pose){if(!f||!p?.f||f.uid!==p.f.uid||f.costume!==p.f.costume||face!==p.face)return false;const decorated=poseFor(p,pose,pose.frame);if(!decorated[token])return false;const record=bursts.get(p),wasPending=pendingPaint(record,pose.frame),painted=root.CQC_COMBAT_SPRITES.draw(c,f,x,y,face,scale,decorated)===true;if(painted&&record&&valid(record)){nativePaints++;if(wasPending&&pose.attackPhase!=='active')deferredPaints++;record.lastPaintedRound=record.lastEmissionRound;}return painted;}
 const api=Object.freeze({register,emission,poseFor,selectFrame,drawNative,status:()=>({schema:'cqc.p46.vs-delayed-burst-source/1',allowlist:[...allowed.keys()],selectionCalls,emissions:emissions.map(x=>({...x})),phaseFabricated:false,gameplayProfileChanged:false,priorInstalledP41Delegated:true,nativePaints,deferredNativePaints:deferredPaints,maxPendingNativePaintTicks})});
 root.CQC_PASS47_N9_VS_DELAYED_BURSTS=api;
 // Preserve the already installed engine/renderer hook protocol and all P40 subjects.
 root.CQC_PASS40_VS_DELAYED_BURSTS=Object.freeze({...prior,
  register(...args){return api.register(...args)||prior.register(...args);},
  emission(...args){return api.emission(...args)||prior.emission(...args);},
  poseFor(p,pose,frame){const selected=api.poseFor(p,pose,frame);return selected===pose?prior.poseFor(p,pose,frame):selected;},
  selectFrame(...args){return api.selectFrame(...args)||prior.selectFrame(...args);},
  drawNative(...args){return api.drawNative(...args)||prior.drawNative(...args);}
 });
 root.CQC_PASS47_N9_NATIVE_VISUAL_ACTIONS?.install?.();
 const visualAndLegacy=root.CQC_PASS40_VS_DELAYED_BURSTS;
 root.CQC_PASS40_VS_DELAYED_BURSTS=Object.freeze({...visualAndLegacy,
  selectFrame(...args){return api.selectFrame(...args)||visualAndLegacy.selectFrame(...args);}
 });
})(globalThis);
