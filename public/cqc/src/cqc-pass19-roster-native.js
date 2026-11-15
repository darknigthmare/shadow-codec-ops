/* Add only native reviewed identities, preserving every baseline fighter. */
(function(root){'use strict';
function install(fighters){
 const result=root.CQC_PASS19_COMBAT_ADDITIONS.install(fighters,{isRenderable:f=>root.CQC_COMBAT_SPRITES.has(f.uid)||root.CQC_PASS18_MACHINES?.has(f.uid)});
 const added=fighters.filter(f=>result.added.includes(f.uid));
 const records=added.map(f=>root.CQC_PASS19_COSTUMES.createRosterRecord({uid:f.uid,name:f.name,game:f.ep,basePresentation:'nextgen',nativeBody:root.CQC_COMBAT_SPRITES.has(f.uid)?'sprite':'rig',alreadyMechanical:f.pass19Reference.appearanceKind==='machine',surviveIncarnation:f.pass19Reference.episode==='SURVIVE'}));
 if(records.length)root.CQC_PASS19_COSTUMES.addRoster(records);
 root.CQC_PASS19_RETRO_PRESENTATIONS.registerAll();root.CQC_PASS19_MACHINE_PIXEL_STYLE.registerAll();
 const heights={};for(const f of added){const ref=f.pass19Reference;if(Number.isFinite(ref.worldHeightMeters)&&ref.worldHeightMeters>0)heights[f.uid]={metres:ref.worldHeightMeters,evidence:'estimated-source-incarnation-display',sources:ref.referenceIds.map(id=>root.CQC_PASS19_ROSTER_ADDITIONS.registry.references[id]?.url).filter(Boolean),scope:ref.heightQualification,absoluteHeightCertified:false};}
 root.CQC_PASS19_WORLD_SCALE.configure(heights);root.CQC_PASS19_WORLD_SCALE.install();
 root.CQC_PASS19_ROSTER_RESULT=result;return result;
}
function finishers(catalog,fighters){
 const template=Object.values(catalog.profiles)[0];
 for(const f of fighters.filter(f=>f.uid.startsWith('pass19__'))){
  if(catalog.profiles[f.uid])continue;
  const family=f.pass19Reference.appearanceKind==='machine'?'mechanical':f.pass19Reference.appearanceKind==='creature'?'beast':'cqc';
  const moves=['super','specialDown','specialForward','throw'];
  const profile={...template,uid:f.uid,fighterName:f.name,episode:f.ep,source:f.source,family,basis:f.combat.basis,evidence:'adaptation',visual:f.visual,color:f.color,accent:f.accent,power:f.power,speed:f.speed,reach:f.reach,finishers:template.finishers.map((fin,i)=>({...fin,id:f.uid+'::finisher'+(i+1),name:f.combat.moves[moves[i]].name+' · conclusion',family,loreBasis:f.combat.basis,description:'Séquence de conclusion créée pour ce duel à partir de '+f.combat.moves[moves[i]].name+'.',sourceMoves:[f.combat.moves[moves[i]].name],canonical:false,evidence:'adaptation',gore:false}))};
  catalog.profiles[f.uid]=profile;
 }
 catalog.fighterCount=Object.keys(catalog.profiles).length;catalog.finisherCount=Object.values(catalog.profiles).reduce((n,p)=>n+p.finishers.length,0);
}
root.CQC_PASS19_ROSTER_NATIVE={install,finishers};
})(globalThis);
