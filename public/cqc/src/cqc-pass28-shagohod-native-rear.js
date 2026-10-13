/* Original MGS3 rear air-cushion underside. Native source bytes stay intact. */
(function(root){'use strict';
 const clone=value=>JSON.parse(JSON.stringify(value));
 const id='shagohod_mgs3_ps2_2004', source={"id":"rear_hover_native","file":"assets/machines-pass28/shagohod-hover-rear/shagohod-hover-skirt-parts-v2.png","sha256":"d2bfe6b8d311005f467732fcca69d45e40a2ec6c4176b6e9fc03647e37f684a4","bytes":1515187,"width":2172,"height":724}, replacements=[{"id":"near_rear_track","source":"rear_hover_native","rect":[16,88,1277,298],"pivot":[638,88],"offset":[0,-30],"z":20,"imageScale":0.205,"parent":"rear_anchor","variants":[{"when":"shagohodRearSkirtScorched","rect":[15,402,1276,290],"pivot":[638,88],"imageScale":0.205}]},{"id":"far_rear_track","source":"rear_hover_native","rect":[1337,164,805,229],"pivot":[403,73],"offset":[12,-22],"z":5,"imageScale":0.285,"parent":"rear_anchor","variants":[{"when":"shagohodRearSkirtScorched","rect":[1336,468,805,232],"pivot":[403,73],"imageScale":0.285}]}];
 const limits=["Authored source-led 2D sealing skirt projection, not extracted original model or animation. Absolute1:1 not certified.","Near and far underside modules independently painted in one left-facing camera, not opposing facing sprites.","Legacy part IDs retained to avoid new HP pools, while their native textures now depict air-cushion underside rather than wheels.","Native damage states authored for existing defeat/phase flags; no new destruction event or combat rule."];
 function apply(catalog){
  if(!catalog||catalog.schema!=='cqc.machine-parts/1'||!Array.isArray(catalog.machines))throw Error('Shagohod native rear requires a source catalog');
  const next=clone(catalog), machine=next.machines.find(value=>value.id===id), changes=[];
  if(!machine||machine.pass28ShagohodHoverRear===true)return {catalog:next,changes,limits:[...limits]};
  if(!machine.parts.some(p=>p.id==='rear_anchor')||replacements.some(p=>!machine.parts.some(old=>old.id===p.id)))return {catalog:next,changes,limits:[...limits,'Absent historical rear receiver; source rig left intact.']};
  const existing=machine.sources.find(value=>value.id===source.id);
  if(existing&&JSON.stringify(existing)!==JSON.stringify(source))throw Error('Shagohod rear native source ID collision');
  if(!existing)machine.sources.push(clone(source));
  for(const replacement of replacements){
   const index=machine.parts.findIndex(value=>value.id===replacement.id), old=machine.parts[index];
   // Preserve receiver flags/channels/detachment if an upstream source catalog owns them.
   machine.parts[index]={...old,...clone(replacement)};
   delete machine.parts[index].sourceClipPolygonNativeXY;
   changes.push({id,part:old.id,before:clone(old),after:clone(machine.parts[index]),reason:'Historical rear hover module has a continuous dark air-cushion sealing base, no rear tank wheels or tracks.'});
  }
  const rear=machine.parts.find(value=>value.id==='rear_anchor'), beforeRear=clone(rear);
  rear.offset=[150,95];
  changes.push({id,part:'rear_anchor',before:beforeRear,after:clone(rear),reason:'Lower the entire historical rear assembly together to its air-cushion support plane. No hull stretch, weapon slot, HP pool or combat clock changes.'});
  machine.pass28ShagohodHoverRear=true;
  machine.documentaryQualifications=[...(machine.documentaryQualifications||[]),...limits];
  return {catalog:next,changes,limits:[...limits]};
 }
 function presentationPose(machineID,p,state=null){
  if(machineID!==id||!p)return p;
  const flags={...(p.flags||{})};
  flags.shagohodRearSkirtScorched=flags.shagohodRearSkirtScorched===true||flags.shagohodPhase2===true||flags.shagohodDefeated===true||p.defeated===true||/^(dead|ko)$/.test(p.action||'')||state?.boss?.defeated===true;
  return {...p,flags};
 }
 const canonicalDimensions=Object.freeze({[id]:{"heightM":8.2,"lengthM":22.8,"widthM":6.4,"source":"https://www.konami.com/mg/archive/mgs3/english/pic/mecha_word02.gif","sha256":"1e18ec9384f075e8ed3b9086c0c21a5a5df8653a22bef7fe6b1371b5eb33d2eb","evidence":"Original publisher archived MGS3 mechanical profile, physical primary image read."}});
 const audit=Object.freeze({schema:'cqc.pass28.shagohod-hover-native/1',id,source:clone(source),sourcePixelsChanged:false,simulationMutation:false,absolute1to1Certified:false,parts:['near_rear_track','far_rear_track'],preservedTargets:['near_screw','far_screw','near_booster','cockpit_roof'],canonicalDimensions,limits:[...limits]});
 root.CQC_PASS28_SHAGOHOD_NATIVE_REAR=Object.freeze({apply,presentationPose,audit,canonicalDimensions});
})(globalThis);
