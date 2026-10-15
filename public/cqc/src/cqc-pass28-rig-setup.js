/* Source-led machine corrections shared by every CQC presentation. */
(function(root){'use strict';
 const clone=value=>JSON.parse(JSON.stringify(value)), originals=new Map();
 const names=['CQC_PASS28_HEAVY_RIG_FIXES','CQC_PASS28_PW_RIG_FIXES','CQC_PASS28_VEHICLE_RIG_FIXES'];
 const articulations=['CQC_PASS29_MODERN_ARTICULATION','CQC_PASS29_CLASSIC_ARTICULATION','CQC_PASS29_PW_ARTICULATION','CQC_PASS29_HEAVY_ARTICULATION','CQC_PASS30_BIC_COMPLETION','CQC_PASS30_MK_COMPLETION','CQC_PASS30_ZEKE_COMPLETION','CQC_PASS30_GANDER_FIDELITY','CQC_PASS31_REX_MGS4','CQC_PASS31_PW_BIPED','CQC_PASS34_LIGHT_ARTICULATION','CQC_PASS34_VEHICLE_ARTICULATION'];
 const nativeDescriptors=new Map();
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
  for(const name of articulations){const helper=root[name];if(!helper?.apply)throw Error('Native articulation unavailable: '+name);const result=helper.apply(catalog);catalog=result.catalog;reviewed.push({name,changes:result.changes,limits:result.limits||helper.limits||[]});}
  const normalized=root.CQC_MACHINE_PARTS.normalizeCatalog(catalog);
  nativeDescriptors.clear();
  // Resolve later source replacements before validating any descriptor against the final rig.
  // A predecessor's mouth coordinate belongs to its old atlas, not the replacement art.
  const finalSourcePoints=new Map();
  for(const name of articulations)for(const[id,slots]of Object.entries(root[name]?.sourcePoints||{}))
   finalSourcePoints.set(id,{...(finalSourcePoints.get(id)||{}),...slots});
  for(const[id,slots]of finalSourcePoints){
   const machine=normalized.get(id);if(!machine)continue;
   for(const[slot,descriptor]of Object.entries(slots)){
    const part=machine.parts.find(part=>part.id===descriptor.part),source=part&&machine.sources.get(part.source),point=descriptor.nativeXY;
    if(!part?.rect||!source||!Array.isArray(point)||point.length!==2||!point.every(Number.isFinite)||point[0]<part.rect[0]||point[1]<part.rect[1]||point[0]>=part.rect[0]+part.rect[2]||point[1]>=part.rect[1]+part.rect[3])throw Error('Native articulated weapon point differs: '+id+'/'+slot);
    nativeDescriptors.set(id+':'+slot,{...clone(descriptor),pin:{machine:id,part:part.id,source:clone(source),rect:part.rect.slice(),pivot:part.pivot.slice(),imageScale:part.imageScale}});
   }
  }
  root.CQC_MACHINE_PARTS_CATALOG=catalog;
  const data=root.CQC_PASS18_MACHINE_DATA;
  if(data){
   const mappingHelpers=[addition,...articulations.map(name=>root[name])].filter(Boolean);
   // Only explicit incarnation mappings are admitted. A native pilot rig does
   // not create a fighter UID or borrow another edition's metric dimensions.
   root.CQC_PASS18_MACHINE_DATA={...data,
    arsenal:Object.assign({},data.arsenal,...mappingHelpers.map(helper=>helper.arsenalMappings||{})),
    playable:Object.assign({},data.playable,...mappingHelpers.map(helper=>helper.playableMappings||{})),
    states:Object.assign({},data.states,...mappingHelpers.map(helper=>helper.stateMappings||{}))};
  }
  return catalog;
 }
 function presentationPose(id,pose,state=null){
  let result=pose;
  for(const name of names)result=root[name]?.presentationPose?.(id,result,state)||result;
  result=root.CQC_PASS28_SHAGOHOD_NATIVE_REAR?.presentationPose?.(id,result,state)||result;
  result=root.CQC_PASS28_MISSING_MACHINE?.presentationPose?.(id,result,state)||result;
  for(const name of articulations)result=root[name]?.presentationPose?.(id,result,state)||result;
  return result;
 }
 function targetParts(){return Object.assign({},...[...names,...articulations].map(name=>root[name]?.targetParts||{}),root.CQC_PASS28_EDITION_FIXES?.targetParts||{});}
 function weaponPoints(){return Object.assign({},...[...names,...articulations].map(name=>root[name]?.weaponPoints||{}));}
 function dimension(id){
  const primary=root.CQC_PASS28_HEAVY_RIG_FIXES?.audit?.canonicalDimensions?.[id]||root.CQC_PASS28_SHAGOHOD_NATIVE_REAR?.canonicalDimensions?.[id]||root.CQC_PASS28_EDITION_FIXES?.canonicalDimensions?.[id];
  if(primary)return {...primary,evidence:primary.evidence||'primary printed canonical dimensions'};
  if(id==='peacewalker_biped_pw_psp2010'){
   const biped=root.CQC_PASS31_PW_BIPED?.dimensions?.[id];
   if(biped?.heightM>0)return {...biped,evidence:biped.evidence||biped.heightEvidence||'secondary height citation; bipedal configuration, metric source projection not independently verified',absolute1to1Certified:false};
  }
  const secondary=root.CQC_PASS28_PW_RIG_FIXES?.dimensions?.[id];
  return secondary?{...secondary,evidence:secondary.heightEvidence||secondary.evidence||'secondary citation; primary page not independently read'}:null;
 }
 root.CQC_PASS28_RIG_SETUP=Object.freeze({prepare,presentationPose,targetParts,weaponPoints,dimension,descriptor:(id,slot)=>nativeDescriptors.has(id+':'+slot)?clone(nativeDescriptors.get(id+':'+slot)):null,status:()=>({schema:'cqc.pass34.shared-native-incarnations/1',machines:root.CQC_MACHINE_PARTS_CATALOG?.machines?.length||0,reviewed:clone(reviewed),absolute1to1Certified:false})});
})(globalThis);
