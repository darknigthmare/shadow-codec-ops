/* P41 PRIVATE CANDIDATE, VS only. Root review required before any product installation.
 * The finite allowlist contains only byte-pinned Root-approved Drebin Gala. No profile,
 * cadence, velocity, lifetime, cost, damage or interruption rule is changed.
 */
(function(root){'use strict';
 const prior=root.CQC_PASS40_VS_DELAYED_BURSTS;
 if(!prior||!['register','emission','poseFor','selectFrame','drawNative'].every(name=>typeof prior[name]==='function'))throw Error('Contrôleur P40 absent avant son adaptateur P41');
 const allowed=new Map([["archive__drebin:tuxedo",{"revision":"native-batch40-v2","audit":"a5a47acc151948022a27fc499880d30b0fc220b47bfd6b37e57a19f510fc4f27","metadataSHA256":"071d978f38689f70e476e38c183b027ccf0117bc2adcb80c25afc03424cae086","metadataBytes":1935384}],["roster50__campbell_mg2:retro-msx",{"revision":"native-batch40-v2","audit":"fe141c631813653c5946c0bab89a4bf3d683cbad9b6301401a04d49cc2651884","metadataSHA256":"c6d570c017ede6bd22c4c591eb9b244adbf185917405f8649f418fa1c1833072","metadataBytes":1254161}],["roster50__campbell_mg2:tuxedo",{"revision":"native-batch40-v2","audit":"7f134a1ffb4b897b3b3ea1d43181300908fa16650d4e3154e43c5460e77edf3f","metadataSHA256":"c7f5362200ed1480ab34691f25e6c82c93fe854da26bb37306f173ddbb49b60e","metadataBytes":2076007}]]);
 const bursts=new WeakMap(),rounds=new WeakMap(),token=Symbol('private-reviewed-p41-vs-burst-frame'),poses=new WeakMap();
 const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b),finite=Number.isFinite;
 const emissions=[];let selectionCalls=0;
 function authority(p,m){
  if(!p?.f||!m||m.kind!=='projectile'||!(m.count>1)||!(m.interval>0))return null;
  const spec=allowed.get(p.f.uid+':'+p.f.costume),sdk=root.CQC_PASS41_NATIVE_ORIGINS,S=root.CQC_COMBAT_SPRITES;
  if(!spec||typeof sdk?.sourcePoint!=='function')return null;
  const entry=S?.getEntry?.(p.f.uid,p.f),descriptor=root.CQC_NATIVE_WARDROBE_INDEX?.entries?.find(d=>d.uid===p.f.uid&&d.id===p.f.costume);
  if(!entry||entry.pass40Revision!==spec.revision||entry.review?.status!=='approved'||!entry.review.reviewer?.startsWith('Root')||entry.review.artAuditSHA256!==spec.audit||entry.mirror!==false||entry.fallbackMissingActions!==false||descriptor?.metadata?.sha256!==spec.metadataSHA256||descriptor.metadata.bytes!==spec.metadataBytes)return null;
  const side=p.face===-1?'left':'right',actions=p.face===entry.facing?entry.actions:entry.oppositeActions;
  let point;try{point=sdk.sourcePoint(p.f.uid,p.f.costume,side,m.slot,m.tag);}catch{return null;}
  if(point?.sourceAuthorityMethod!=='pure-source-point'||point.evidence!=='reviewed-pass41-native-source-point'||point.worldScaleApplied!==false||point.selectedAction!=='shoot')return null;
  const index=point.selectedFrameIndex,frame=actions?.shoot?.frames?.[index];
  if(!frame||frame.physicalPoseIndex!==11||frame.file!==point.sourceFile||frame.sha256!==point.sourceSHA256||!same(frame.rect,point.sourceRect)||!same(frame.pivot,point.sourcePivot)||!point.sourceNativeXY?.every(finite))return null;
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
  selectionCalls++;return{frame:source.frame,requested:'shoot',action:'shoot',index:source.index,phase:pose.attackPhase,presentation:'reviewed-p41-delayed-burst-source-frame'};
 }
 function emission(s,q){const record=rounds.get(q);if(q.age!==0||q.delay>0||!roundEligible(record,q)||!valid(record))return null;
  const p=record.owner,source=authority(p,q.def);if(!source)return null;
  const a=source.point,[x,y]=a.sourceNativeXY,[rx,ry,w,h]=a.sourceRect,[px,py]=a.sourcePivot,k=source.scale;
  const result={x:p.x+(x-rx-px*w)*k,y:p.y+(y-ry-py*h)*k,sourceFile:a.sourceFile,sourceSHA256:a.sourceSHA256,sourceRect:[...a.sourceRect],sourcePivot:[...a.sourcePivot],sourceNativeXY:[...a.sourceNativeXY],scale:k,coordinateSpace:'world',sourceScaleAppliedOnce:true,frame:s.frame,ownerSlot:p.slot,burstId:q.burstId,projectileId:q.id};
  if(!finite(result.x)||!finite(result.y))return null;record.lastEmissionFrame=s.frame;record.lastEmissionRound=q;
  emissions.push({...result,actor:{x:p.x,y:p.y,face:p.face},phase:p.attack.t<p.attack.def.startup?'startup':p.attack.t<p.attack.def.startup+p.attack.def.active?'active':'recovery'});if(emissions.length>96)emissions.shift();return result;
 }
 function drawNative(c,p,f,x,y,face,scale,pose){if(!f||!p?.f||f.uid!==p.f.uid||f.costume!==p.f.costume||face!==p.face)return false;const decorated=poseFor(p,pose,pose.frame);if(!decorated[token])return false;return root.CQC_COMBAT_SPRITES.draw(c,f,x,y,face,scale,decorated)===true;}
 const api=Object.freeze({register,emission,poseFor,selectFrame,drawNative,status:()=>({schema:'cqc.p41.private-vs-delayed-burst-candidate/1',allowlist:[...allowed.keys()],selectionCalls,emissions:emissions.map(x=>({...x})),phaseFabricated:false,gameplayProfileChanged:false,priorP40Delegated:true})});
 root.CQC_PASS41_VS_DELAYED_BURSTS=api;
 // Preserve the already installed engine/renderer hook protocol and all P40 subjects.
 root.CQC_PASS40_VS_DELAYED_BURSTS=Object.freeze({...prior,
  register(...args){return api.register(...args)||prior.register(...args);},
  emission(...args){return api.emission(...args)||prior.emission(...args);},
  poseFor(p,pose,frame){const selected=api.poseFor(p,pose,frame);return selected===pose?prior.poseFor(p,pose,frame):selected;},
  selectFrame(...args){return api.selectFrame(...args)||prior.selectFrame(...args);},
  drawNative(...args){return api.drawNative(...args)||prior.drawNative(...args);}
 });
})(globalThis);
