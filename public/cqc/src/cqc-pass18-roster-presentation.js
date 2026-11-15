/* Source-led presentation corrections. Existing UIDs, moves and simulation shapes are retained. */
(function(root){
 'use strict';
 const records={
  npc53__max_wark_mgs2:{name:'MAXINE « MAX » WORK — CONCEPT MGS2',role:'SUPPORT CODEC · CONCEPT ABANDONNÉ',gender:'f',identity:'Planned AI identity with human female appearance; unreleased MGS2 concept.'},
  npc53__doc_wilson_mgs2:{name:'WILLIAM « DOC » WILSON — CONCEPT MGS2',role:'SCIENTIFIQUE CODEC · CONCEPT ABANDONNÉ',gender:'m',identity:'Planned Arsenal AI developer with human appearance; unreleased MGS2 concept.'},
  npc53__daniel_quinn_mgs2:{name:'COLONEL DANIEL QUINN — CONCEPT MGS2',role:'CONTACT CODEC · CONCEPT ABANDONNÉ',gender:'m',identity:'Planned human-looking Colonel/AI contact; no distinct full-body artwork established.'},
  npc53__vr_otacon_mobile:{name:'OTACON — AVATAR VR / MOBILE',role:'CONTACT CODEC · SIMULATION VR',gender:'m',identity:'Human-looking virtual Otacon contact, rather than a documented mechanical body.'}
 };
 const references=[
  'https://www.konami.com/mg/archive/mgs2/art/first.html',
  'https://www.unseen64.net/wp-content/uploads/2008/04/metal-gear-solid-2-design-document.pdf',
  'https://www.metalgearsolid.be/images/personnage-abandonne-maxime-max-metal-gear-solid-2.jpg',
  'https://www.metalgearsolid.be/images/personnage-abandonne-doc-william-wilson-metal-gear-solid-2-s.jpg'
 ];
 function apply(fighters){
  const list=Array.isArray(fighters)?fighters:Object.values(fighters||{});let changed=0;
  for(const f of list){
   const record=records[f?.uid];if(!record)continue;
   const old=f.visual||{};
   // Preserve the old simulation silhouette separately from its corrected visual identity.
   if(f.combat&&!f.combat.simulationVisualKind)f.combat.simulationVisualKind=old.kind;
   f.name=record.name;f.role=record.role;
   f.visual={...old,kind:'human',body:'athletic',gender:record.gender};
   f.presentationReference={identity:record.identity,fullBodyCanonEstablished:false,
    sourceScope:'Original concepts/scenario or virtual Codec identity; unseen costume, color and action poses remain adaptations.',
    simulationShapeRetained:true,absolute1to1Certified:false,references:f.uid==='npc53__vr_otacon_mobile'?
     ['https://metalgear.fandom.com/wiki/Metal_Gear_Solid_Mobile']:references.slice()};
   changed++;
  }
  return changed;
 }
 root.CQC_PASS18_ROSTER_PRESENTATION={apply,records,references};
})(globalThis);
