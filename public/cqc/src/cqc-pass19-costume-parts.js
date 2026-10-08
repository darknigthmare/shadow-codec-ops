/* Authored native PNG layers, fitted to independently reviewed anatomical frame anchors. */
(function(root,factory){'use strict';const api=factory(root);if(typeof module==='object'&&module.exports)module.exports=api;root.CQC_PASS19_COSTUME_PARTS=api;})(globalThis,function(root){
 'use strict';
 const finite=Number.isFinite,unit=values=>Array.isArray(values)&&values.length===2&&values.every(value=>finite(value)&&value>=0&&value<=1);
 const safeFile=file=>typeof file==='string'&&/^assets\/[a-zA-Z0-9_./-]+\.png$/.test(file)&&!file.split('/').some(part=>part==='..'||part==='.');
 const key=frame=>frame.file+'#'+frame.rect.join(',');
 function sources(entry){return Object.values(entry?.costumeParts?.sources||{});}
 function validate(entry){
  const rig=entry?.costumeParts;if(!rig)return true;
  if(rig.schema!=='cqc.costume-native-parts/1'||rig.identityUID!==entry.uid||rig.family!==entry.costumeConcept?.family||rig.canonicalAppearanceAttested!==false||rig.reviewedBindings!==true)return false;
  const design=rig.identityDesign;
  if(design?.authoredPerIdentity!==true||!design.bodyPlan||!Array.isArray(design.signature)||design.signature.length<2||design.signature.some(trait=>typeof trait!=='string'||!trait.trim())||!Array.isArray(design.palette)||design.palette.length<2||design.palette.some(color=>!/^#[0-9a-f]{6}$/i.test(color)))return false;
  if(!rig.sources||!Object.keys(rig.sources).length||Object.keys(rig.sources).length>24)return false;
  if(sources(entry).some(source=>!safeFile(source.file)||!/^[a-f0-9]{64}$/.test(source.sha256||'')||![source.width,source.height].every(value=>Number.isInteger(value)&&value>0&&value<=8192)))return false;
  const frames=[...Object.values(entry.actions||{}),...Object.values(entry.oppositeActions||{})].flatMap(action=>action.frames||[]);
  if(!rig.bindings||frames.some(frame=>!Array.isArray(rig.bindings[key(frame)])||!rig.bindings[key(frame)].length))return false;
  for(const layers of Object.values(rig.bindings)){
   if(!Array.isArray(layers)||layers.length>24)return false;
   for(const layer of layers)if(!Object.hasOwn(rig.sources,layer.source)||!unit(layer.position)||!unit(layer.pivot)||!Array.isArray(layer.size)||layer.size.length!==2||!layer.size.every(value=>finite(value)&&value>0&&value<=3)||!finite(layer.angle||0)||Math.abs(layer.angle||0)>180||layer.order!==undefined&&!Number.isFinite(layer.order))return false;
  }
  return true;
 }
 function drawSourceParts(context,{entry,frame,image,factor,resolveSource}){
  if(!entry?.costumeParts||!validate(entry)||typeof resolveSource!=='function')return false;
  const rig=entry.costumeParts,layers=rig.bindings[key(frame)],records=layers.map(layer=>({layer,source:rig.sources[layer.source],loaded:resolveSource(rig.sources[layer.source])}));
  if(records.some(({source,loaded})=>loaded?.state!=='ready'||loaded.image.naturalWidth!==source.width||loaded.image.naturalHeight!==source.height))return false;
  const width=frame.rect[2]*factor,height=frame.rect[3]*factor;
  function layerDraw({layer,loaded}){context.save();try{context.translate((layer.position[0]-frame.pivot[0])*width,(layer.position[1]-frame.pivot[1])*height);context.rotate((layer.angle||0)*Math.PI/180);const w=width*layer.size[0],h=height*layer.size[1];context.drawImage(loaded.image,-w*layer.pivot[0],-h*layer.pivot[1],w,h);}finally{context.restore();}}
  records.filter(record=>(record.layer.order||0)<0).sort((a,b)=>(a.layer.order||0)-(b.layer.order||0)).forEach(layerDraw);
  context.drawImage(image,...frame.rect,-width*frame.pivot[0],-height*frame.pivot[1],width,height);
  records.filter(record=>(record.layer.order||0)>=0).sort((a,b)=>(a.layer.order||0)-(b.layer.order||0)).forEach(layerDraw);
  return true;
 }
 function contract(){return{schema:'cqc.costume-native-parts-contract/1',sources:'Physically reviewed transparent PNG files with SHA-256 and native dimensions. Shared pieces are allowed; per-identity appearance is authored and reviewed.',bindings:'Every physical body frame has a file#x,y,width,height binding with anatomical part position, pivot, size and optional rotation. Both anatomical sides have independently reviewed anchors.',identityDesign:'A unique reviewed body plan, at least two silhouette/equipment traits and character-led palette are required. Metadata alone is not canon fidelity certification.',readiness:'The sprite renderer decodes the base body and all part PNGs before launch; unavailable parts never make a costume ready.',scope:'Original conceptual costume composition. Original actions, simulation collision, health and UID remain unchanged. Native layer composition does not imply destructible articulation.'};}
 return{version:'pass19-costume-parts/1',key,sources,validate,drawSourceParts,contract};
});
