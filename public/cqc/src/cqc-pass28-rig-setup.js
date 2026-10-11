/* Source-led machine corrections shared by every CQC presentation. */
(function(root){'use strict';
 const clone=value=>JSON.parse(JSON.stringify(value)), originals=new Map();
 const names=['CQC_PASS28_HEAVY_RIG_FIXES','CQC_PASS28_PW_RIG_FIXES','CQC_PASS28_VEHICLE_RIG_FIXES'];
 let reviewed=[];
 function prepare(){
  let catalog=root.CQC_MACHINE_PARTS_CATALOG;
  if(!catalog?.machines||!root.CQC_MACHINE_PARTS)throw Error('Machine source catalog unavailable');
  const addition=root.CQC_PASS28_MISSING_MACHINE;
  if(addition?.append){catalog=clone(catalog);const result=addition.append(catalog);if(result?.catalog)catalog=result.catalog;}
  for(const machine of catalog.machines)if(!originals.has(machine.id))originals.set(machine.id,clone(machine));
  catalog={...clone(catalog),machines:catalog.machines.map(machine=>clone(originals.get(machine.id)))};
  const previous=root.CQC_PASS27_MACHINE_COMPLETION;
  if(previous)catalog=previous.buildCatalog(catalog,root.CQC_MACHINE_PARTS,{allowPartial:true}).catalog;
  reviewed=[];
  for(const name of names){const helper=root[name];if(!helper?.apply)throw Error('Reviewed machine correction unavailable: '+name);const result=helper.apply(catalog);catalog=result.catalog;reviewed.push({name,changes:result.changes,limits:result.limits||helper.limits||[]});}
  if(root.CQC_PASS28_SHAGOHOD_NATIVE_REAR){const helper=root.CQC_PASS28_SHAGOHOD_NATIVE_REAR,result=helper.apply(catalog);catalog=result.catalog;reviewed.push({name:'CQC_PASS28_SHAGOHOD_NATIVE_REAR',changes:result.changes,limits:result.limits});}
  if(root.CQC_PASS28_EDITION_FIXES)catalog=root.CQC_PASS28_EDITION_FIXES.apply(catalog).catalog;
  root.CQC_MACHINE_PARTS.normalizeCatalog(catalog);
  root.CQC_MACHINE_PARTS_CATALOG=catalog;
  const data=root.CQC_PASS18_MACHINE_DATA;
  if(data&&addition){root.CQC_PASS18_MACHINE_DATA={...data,playable:{...data.playable,...addition.playableMappings},states:{...data.states,...addition.stateMappings}};}
  return catalog;
 }
 function presentationPose(id,pose,state=null){
  let result=pose;
  for(const name of names)result=root[name]?.presentationPose?.(id,result,state)||result;
  result=root.CQC_PASS28_SHAGOHOD_NATIVE_REAR?.presentationPose?.(id,result,state)||result;
  result=root.CQC_PASS28_MISSING_MACHINE?.presentationPose?.(id,result,state)||result;
  return result;
 }
 function targetParts(){return Object.assign({},...names.map(name=>root[name]?.targetParts||{}),root.CQC_PASS28_EDITION_FIXES?.targetParts||{});}
 function weaponPoints(){return Object.assign({},...names.map(name=>root[name]?.weaponPoints||{}));}
 function dimension(id){
  const primary=root.CQC_PASS28_HEAVY_RIG_FIXES?.audit?.canonicalDimensions?.[id]||root.CQC_PASS28_SHAGOHOD_NATIVE_REAR?.canonicalDimensions?.[id]||root.CQC_PASS28_EDITION_FIXES?.canonicalDimensions?.[id];
  if(primary)return {...primary,evidence:primary.evidence||'primary printed canonical dimensions'};
  const secondary=root.CQC_PASS28_PW_RIG_FIXES?.dimensions?.[id];
  return secondary?{...secondary,evidence:secondary.heightEvidence||secondary.evidence||'secondary citation; primary page not independently read'}:null;
 }
 root.CQC_PASS28_RIG_SETUP=Object.freeze({prepare,presentationPose,targetParts,weaponPoints,dimension,status:()=>({schema:'cqc.pass28.shared-rig-review/1',machines:root.CQC_MACHINE_PARTS_CATALOG?.machines?.length||0,reviewed:clone(reviewed),absolute1to1Certified:false})});
})(globalThis);
