/* Make already reviewed native encounter arenas available in the Versus stage chooser. */
(function(root){
 'use strict';
 const labels={mgs1_rex_hangar:{ep:'MGS1',family:'industrial'},mpo_raxa_test_hangar:{ep:'PORTABLE OPS',family:'industrial'}};
 for(const stage of root.CQC_STAGE_LAYER_DATA?.stages||[]){
  const label=labels[stage.id];
  if(!label||!stage.approved||stage.review?.status!=='accepted_closest'||stage.legacyVisualDefinition)continue;
  stage.legacyVisualDefinition={id:stage.id,name:stage.name,ep:label.ep,family:label.family,
   sky:[stage.fillColor||'#25302b','#142021','#080d0e'],weather:stage.weather?.enabled?stage.weather.type:'none',props:[]};
 }
 root.CQC_PASS18_STAGE_ACCESS={version:1,encounterIDs:Object.keys(labels)};
})(globalThis);
