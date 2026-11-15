/* Shared, explicitly qualified metre calibration for admitted native projections.
 * A uniform source similarity is shared by rendering, mounts and contact consumers.
 * Physical aircraft references are never promoted to measured game-model dimensions.
 */
(function(root,factory){'use strict';const api=factory(root);if(typeof module==='object'&&module.exports)module.exports=api;root.CQC_PASS36_MACHINE_SCALE=api;})(typeof globalThis!=='undefined'?globalThis:this,function(root){
 'use strict';
 const REFERENCE=Object.freeze({metres:1.8,pixels:200,scope:'Arsenal native standing-height comparison reference; no anatomical source-pose certification.'});
 const hind=Object.freeze({
  heightM:6.477,lengthM:17.4752,mainRotorDiameterM:17.2466,
  source:'https://pimaair.org/museum-aircraft/mil-mi-24d/',
  sourceVehicle:'Physical Mil Mi-24D Hind-D museum exhibit; not the MGS1 model',
  observedHeight:'21 ft 3 in.',observedLength:'57 ft 4 in.',observedMainRotorDiameter:'56 ft 7 in.',
  evidence:'primary institutional real-world Mi-24D reference; exact MGS1 dimensional height unverified',
  metricUse:'real-world-aircraft-type-comparison',canonicalHeightCertified:false,
  heightConfiguration:'Museum label does not specify rotor inclusion or landing-gear configuration.',
  lengthConfiguration:'Museum label does not specify fuselage-only length versus length with turning rotors.',
  scope:'Height reference only. The positive uniform scale preserves the admitted perspective and never fits length or rotor diameter independently. Rounded imperial figures do not acquire extra precision through conversion.',
  absolute1to1Certified:false
 });
 const records=Object.freeze({hind_d_mgs1_ps1_1998:hind});
 function dimension(id){
  const measured=root.CQC_PASS28_RIG_SETUP?.dimension?.(id);
  if(measured&&Number.isFinite(measured.heightM)&&measured.heightM>0)return {...measured,metricUse:measured.metricUse||'existing-incarnation-height-record',absolute1to1Certified:false};
  return records[id]?{...records[id]}:null;
 }
 function dimensionSource(id,provided=null){
  const metric=provided||dimension(id);if(!metric)return {machineId:id,status:'unknown-dimension',sources:[],canonicalGameHeightCertified:false};
  const physical=metric.metricUse==='real-world-aircraft-type-comparison';
  return {machineId:id,status:physical?'real-world-reference-game-model-unverified':'existing-incarnation-record-with-original-evidence',evidence:metric.evidence||null,sources:[...new Set([metric.source,metric.url,...(metric.sources||[])].filter(value=>typeof value==='string'))],heightConfiguration:metric.heightConfiguration||'As documented by the retained dimensional source; native perspective bounds are qualified.',canonicalGameHeightCertified:false};
 }
 function status(){return {version:'cqc-pass36-machine-scale/1',humanReference:{...REFERENCE},qualifiedPhysicalReferences:Object.keys(records),canonicalGameHeightCertified:false,sourcePixelsChanged:false};}
 function calibration(id,nativeBounds,options={}){
  const metric=options.dimension||dimension(id),referenceMetres=options.humanMetres??REFERENCE.metres,referencePixels=options.humanPixels??REFERENCE.pixels;
  if(!metric||![metric.heightM,nativeBounds?.height,referenceMetres,referencePixels].every(value=>Number.isFinite(value)&&value>0))return null;
  const height=metric.heightM*referencePixels/referenceMetres,scale=height/nativeBounds.height;
  return Object.freeze({scale,height,heightM:metric.heightM,axis:'height',metric:{...metric},
   referenceMetres,referencePixels,heightStatus:metric.evidence||'existing qualified incarnation height record',
   canonicalGameHeightCertified:false,dimensionSource:dimensionSource(id,metric),
   metricUse:metric.metricUse||'existing-incarnation-height-record',
   nativeProjection:'Whole admitted native neutral silhouette; perspective and equipment bounds are not an independently measured orthographic body height.',
   sourceUniform:true,sourcePixelsChanged:false,absolute1to1Certified:false});
 }
 return Object.freeze({version:'cqc-pass36-machine-scale/1',reference:REFERENCE,records,dimension,dimensionSource,calibration,status});
});
