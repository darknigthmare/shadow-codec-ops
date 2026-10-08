import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';
const root='/tmp/cqc-pass19-canonical-costumes';
const plan=JSON.parse(fs.readFileSync(path.join(root,'CANONICAL_APPEARANCE_CROSSMAP_V1.json')));
const guard=JSON.parse(fs.readFileSync(path.join(root,'SOURCE_APPEARANCE_ATTESTATION_GUARD_V1.json')));
const blocked=new Set(guard.filter(e=>e.presentationReconstruction===true||e.canonicalBodyAppearanceAttested===false||/unattested|historical-project/.test(e.referenceStatus||'')).map(e=>e.uid));
const filtered=plan.options.filter(e=>!blocked.has(e.sourceSpriteUID));
const omitted=plan.options.filter(e=>blocked.has(e.sourceSpriteUID));
const kinds=['canonical-game-costume','official-remake-appearance','historical-incarnation','body-transformation'];
const counts={groups:plan.counts.groups,targetUIDs:new Set(filtered.map(e=>e.uid)).size,readyNativeOptions:filtered.length,...Object.fromEntries(kinds.map(k=>[k,filtered.filter(e=>e.provenance.kind===k).length]))};
const next={...plan,schema:'cqc.pass19.canonical-appearance-crossmap/2',options:filtered,counts,omittedUnattestedSourceMappings:omitted.map(({uid,sourceSpriteUID,id})=>({uid,sourceSpriteUID,id,reason:'Source whole-body presentation is explicitly unattested; not registered as canonical appearance.'})),priorProposal:{path:'CANONICAL_APPEARANCE_CROSSMAP_V1.json',sha256:crypto.createHash('sha256').update(fs.readFileSync(path.join(root,'CANONICAL_APPEARANCE_CROSSMAP_V1.json'))).digest('hex')}};
fs.writeFileSync(path.join(root,'CANONICAL_APPEARANCE_CROSSMAP_V2.json'),JSON.stringify(next,null,2)+'\n');
const old=JSON.parse(fs.readFileSync(path.join(root,'COMPLETE_BASELINE_APPEARANCE_CENSUS_V1.json')));
const rows=old.rows.map(e=>({...e,readyMappedOptions:filtered.filter(o=>o.uid===e.uid).map(o=>({id:o.id,label:o.label,sourceSpriteUID:o.sourceSpriteUID,kind:o.provenance.kind}))}));
fs.writeFileSync(path.join(root,'COMPLETE_BASELINE_APPEARANCE_CENSUS_V2.json'),JSON.stringify({...old,schema:'cqc.pass19.complete-baseline-appearance-census/2',rows,counts,omittedUnattestedSources:[...blocked]},null,2)+'\n');
const records=filtered.map(e=>({uid:e.uid,sourceSpriteUID:e.sourceSpriteUID,id:e.id,label:e.label,kind:e.provenance.kind,identityID:e.provenance.identityID,identitySource:e.provenance.sources[0]}));
const payload=JSON.stringify({schema:'cqc.pass19.existing-canonical-appearance-mappings/2',counts,records});
const addon=`/* Same-individual reviewed appearance options. No PNG copy, recoloring, UID merge or gameplay mutation. */
(function(root){'use strict';
const data=${payload};
const clone=value=>JSON.parse(JSON.stringify(value));
const qualification='Previously reviewed same-individual appearance. Historical ages, surgery, injuries and body changes are named incarnations, not transplanted clothing. Original fighter identity, lore, moves, weapons, hitboxes and gameplay statistics stay unchanged. This does not claim that the originating game offered this appearance as an alternate costume.';
function additions(){
 const entries=root.CQC_COMBAT_SPRITE_CATALOG?.entries;if(!entries)throw Error('Catalogue natif absent');
 return data.records.map(record=>{
  const source=entries[record.sourceSpriteUID],target=entries[record.uid];
  if(!source||!target||source.review?.status!=='approved'||source.presentationReconstruction===true||source.canonicalBodyAppearanceAttested===false||/unattested|historical-project/.test(source.referenceStatus||''))throw Error('Source canonique non attestée: '+record.sourceSpriteUID);
  const sprite={...source,uid:record.uid};
  return{uid:record.uid,option:{id:record.id,family:'canonical',label:record.label,sprite,
   provenance:{kind:record.kind,category:record.kind,sourceUID:record.uid,sourceSpriteUID:record.sourceSpriteUID,identityID:record.identityID,originalDesign:false,canonicalAppearanceAttested:true,canonicalAttestationScope:'Only originally reviewed visible appearance facts; existing reconstruction limits stay attached.',incarnation:source.incarnation,costumeName:record.label,appearanceName:record.label,sources:[record.identitySource,...clone(source.review.sources||[])],qualification,originalAtlasLimits:clone(source.review.limits||[])},
   assetReview:{status:'verified',independentArt:true,reviewer:'pass19-same-individual-canonical-atlas-crossmap',reviewedAt:'2026-10-08',existingAcceptedSourceReview:source.review.reviewer,reusedExistingAcceptedAtlas:true,newArtGenerated:false,sourceSpriteUID:record.sourceSpriteUID}}};
 });
}
let installed=false;
function install(){if(installed)return{accepted:0,alreadyInstalled:true};const api=root.CQC_PASS19_COSTUMES;if(!api?.registerBatch)throw Error('Enregistrement des costumes absent');const result=api.registerBatch(additions());if(result.accepted!==data.counts.readyNativeOptions||result.rejected?.length)throw Error('Options historiques non enregistrées');installed=true;return{...result,counts:{...data.counts}};}
root.CQC_PASS19_CANONICAL_APPEARANCES=Object.freeze({version:'pass19-canonical-appearances/2',data,additions,install});
install();
})(globalThis);
`;
fs.writeFileSync(path.join(root,'cqc-pass19-canonical-appearances.js'),addon);
console.log(JSON.stringify({counts,omitted:omitted.map(({uid,sourceSpriteUID})=>({uid,sourceSpriteUID})),addonBytes:Buffer.byteLength(addon)}));
