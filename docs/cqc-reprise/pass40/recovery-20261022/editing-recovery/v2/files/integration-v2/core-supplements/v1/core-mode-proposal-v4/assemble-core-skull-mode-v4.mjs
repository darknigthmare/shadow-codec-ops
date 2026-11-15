// Isolated Core-mode data transformer. No product files, profiles or shared SDK are edited.
import assert from'node:assert/strict';import{createHash}from'node:crypto';
const clone=x=>JSON.parse(JSON.stringify(x)),same=(a,b)=>JSON.stringify(a)===JSON.stringify(b),hex=x=>/^[a-f0-9]{64}$/.test(x||'');
const sha=x=>createHash('sha256').update(x).digest('hex');
const canonical=v=>Array.isArray(v)?v.map(canonical):v&&typeof v==='object'?Object.fromEntries(Object.keys(v).sort().map(k=>[k,canonical(v[k])])):v;
export function assembleCoreSkull({job,jobSHA256,audit,auditSHA256,metadata,geometry}){
 if(job.schema!=='cqc.p40.core-skull-selection-data-candidate/2'||job.uid!=='core__skull_armor'||job.baseCostumeId!=='retro-msx'||job.mode!=='core')throw Error('Outside exact Skull Core variant');
 if(!hex(jobSHA256)||!hex(auditSHA256)||audit.inputSHA256!==jobSHA256||!/^approved/.test(audit.status||'')||!audit.reviewer?.startsWith('Root')||!audit.reviewedAt)throw Error('Exact Root Core selection approval required');
 if(metadata.uid!==job.uid||metadata.id!==job.baseCostumeId||metadata.artAuditSHA256!==job.baseVS.artAuditSHA256)throw Error('Base VS identity or art audit changed');
 if(job.rootSourceOnlyReview.sha256!=='dc218c14874d734f1f53b696e3239745f5185526573f6202554f751ff1a72096'||job.baseVS.metadata.sha256!=='dcd22f4ce566206a4652b1cb0116aa26f50ed3601611e2e029e0a1c19d011a77')throw Error('Wrong pinned source review or base body');
 const output=clone(metadata),base=metadata.option.sprite,sprite=output.option.sprite,frames={right:[],left:[]},sources=[];
 for(const[side,group,height]of[['right','actions',443],['left','oppositeActions',442]]){
  const roles=job.proposedRoleSelection[side];if(roles.length!==16||new Set(roles.map(r=>r.physicalRoleIndex)).size!==16)throw Error('Core variant needs sixteen owned roles per face');
  for(let index=0;index<16;index++){
   const row=roles[index],lookup=row.baseFrameLookup,old=base[lookup.actionGroup]?.[lookup.action]?.frames?.[lookup.frameIndex];
   if(row.side!==side||row.physicalRoleIndex!==index||lookup.actionGroup!==group||old?.physicalPoseIndex!==index)throw Error('Wrong inherited physical source role');
   const identity=Object.fromEntries(['file','sha256','rect','pivot','clipPolygon','physicalPoseIndex','nativePoseKey'].map(k=>[k,old[k]]));
   if(sha(JSON.stringify(canonical(identity)))!==row.baseFrameIdentitySHA256)throw Error('Inherited full frame identity SHA inconsistent');
   if(sha(JSON.stringify(old.clipPolygon))!==(index===11?row.baseClipPolygonSHA256:row.clipPolygonSHA256))throw Error('Inherited clip pedigree SHA inconsistent');
   if(index===11&&sha(JSON.stringify(row.frame.clipPolygon))!==row.clipPolygonSHA256)throw Error('New Core clip SHA inconsistent');
   if(index!==11){for(const key of Object.keys(row.frame))assert.deepEqual(row.frame[key],old[key],'Inherited source frame changed');if(row.changedFromBaseVS!==false)throw Error('Extra body source replacement');frames[side].push(clone(old));continue;}
   const source=geometry.sources.find(s=>s.path===row.source.path),pose=source?.poses.find(p=>p.name===row.geometryReference.poseName);
   if(!pose||pose.ownerUID!==job.uid||pose.side!==side||pose.holdReasons.length||row.source.sha256!==source.sha256||row.frame.sha256!==source.sha256||row.nativeStandingHeight!==height||row.sourceNeutralWitness.proposedNativeStandingHeight!==height)throw Error('Supplement ownership, source or same-facing density changed');
   if(!same(row.frame.rect,pose.rect)||!same(row.frame.clipPolygon,pose.clipPolygon)||row.frame.physicalPoseIndex!==11||row.frame.nativePoseKey!==side+':'+pose.name)throw Error('Supplement geometry changed');
   const pivot=[(row.bodyAxis.nativeX-pose.rect[0])/pose.rect[2],(pose.candidateGroundY-pose.rect[1])/pose.rect[3]];assert.deepEqual(row.frame.pivot,pivot,'Body/ground pivot changed');
   const frame=clone(row.frame);frame.file=frame.fileProposal;delete frame.fileProposal;
   if(!new RegExp('^assets/combat-costumes-pass40/core__skull_armor/retro-msx/core-debris-'+side+'-v1\\.png$').test(frame.file))throw Error('Core supplement logical path escaped');
   frames[side].push(frame);sources.push({file:frame.file,path:row.source.path,bytes:source.bytes,sha256:source.sha256,width:source.dimensions[0],height:source.dimensions[1],side,standingHeight:height});
  }
  for(const action of Object.values(sprite[group]))action.frames=action.frames.map(frame=>frame.physicalPoseIndex===11?clone(frames[side][11]):frame);
  for(const[name,spec]of Object.entries(job.CoreActionGroupsProposal)){
   if(!['punch','deploy','optic','recover','low','throw'].includes(name))throw Error('New global action is forbidden');
   sprite[group][name]={fps:8,loop:false,frames:spec.roles.map(index=>clone(frames[side][index]))};sprite.phaseMap[name]=clone(spec.phaseMap);
  }
 }
 const proposal=job.CoreActionMapProposal;
 for(const slot of ['light','heavy','low','throw','special','specialDown','specialBack','super'])sprite.actionMap[slot]=proposal[slot];
 if(sprite.actionMap.special!=='deploy'||sprite.actionMap.specialDown!=='optic'||sprite.actionMap.super!=='punch')throw Error('Core actions do not represent debris, hardening and unarmed super');
 for(const source of sources)sprite.sourceFrameHeights[source.file]=source.standingHeight;
 sprite.nativeDirectionRegions.regions=['right','left'].flatMap(side=>frames[side].map(frame=>({file:frame.file,sha256:frame.sha256,face:side==='right'?1:-1,rect:clone(frame.rect)})));
 const anchors=job.nativeCoreReleasePointProposals.map(point=>{
  const frame=frames[point.side]?.[11];if(!frame||point.slot!=='special'||point.actualCoreMove!=='lg_skull_armor_D'||point.actualCoreProjectileKind!=='debris'||point.coreTag!=='debris'||point.selectedActionProposal!=='deploy'||point.sourceReviewSHA256!==job.rootSourceOnlyReview.sha256||!same(point.sourceRect,frame.rect)||!same(point.sourcePivot,frame.pivot)||point.source.sha256!==frame.sha256)throw Error('Core debris point lost actual-move/source ownership');
  const xy=point.sourceNativeXY;if(xy[0]<frame.rect[0]||xy[0]>=frame.rect[0]+frame.rect[2]||xy[1]<frame.rect[1]||xy[1]>=frame.rect[1]+frame.rect[3]||point.sourceSocket!=='hand-release'||!same(xy,point.side==='right'?[760,132]:[1130,145]))throw Error('Core release point changed');
  return{side:point.side,slot:'special',tag:'debris',action:'deploy',file:frame.file,sourceSHA256:frame.sha256,rect:clone(frame.rect),pivot:clone(frame.pivot),nativeXY:clone(xy),socket:'hand-release'};
 });
 if(anchors.length!==2||new Set(anchors.map(a=>a.side)).size!==2)throw Error('Two independent debris releases required');
 const marker={schema:'cqc.p40.core-mode-native-supplement-variant/1',engine:'core',baseVSMetadataSHA256:job.baseVS.metadata.sha256,baseArtAuditSHA256:job.baseVS.artAuditSHA256,supplementSourceReviewSHA256:job.rootSourceOnlyReview.sha256,selectionJobSHA256:jobSHA256,selectedRoleReplacements:[11],inheritedSourceRolesPerFacing:15,coreProfilesChanged:false,VSMetadataAndDescriptorChanged:false};
 sprite.coreModeVariant=marker;sprite.pass40Attachments=clone(anchors);output.artAuditSHA256=auditSHA256;
 sprite.review={...sprite.review,status:'approved',reviewer:audit.reviewer,reviewedAt:audit.reviewedAt,artAuditSHA256:auditSHA256,coreModeVariant:clone(marker),limits:[...sprite.review.limits,'Core-only mode selection:30 exact inherited native roles plus2 reviewed debris gestures. Retail UV metrics and full locomotion cycle are not certified. VS source32 remains unchanged.']};
 output.option.assetReview={...output.option.assetReview,status:'verified',reviewer:audit.reviewer,reviewedAt:audit.reviewedAt,artAuditSHA256:auditSHA256,physicalPoseCount:32,mappedSemanticRoles:32,sourceContextDrawingsNotCounted:true};
 const binding={uid:job.uid,id:job.baseCostumeId,revision:'native-batch40-v2',artAuditSHA256:auditSHA256,anchors};
 return{metadata:output,binding,newSources:sources,frames};
}
