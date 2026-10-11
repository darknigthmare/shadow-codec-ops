/* Shared scene identities. Existing native planes, registration and animation stay authoritative. */
(function(root,factory){
 'use strict';
 const api=factory(root);
 if(typeof module==='object'&&module.exports)module.exports=api;
 root.CQC_STAGE_REGISTRY_FACTORY=api;
 root.CQC_STAGE_REGISTRY=api.createRegistry();
})(typeof globalThis==='object'?globalThis:this,function(root){
 'use strict';
 const TITLE_EPISODES=Object.freeze({
  mg_msx:['METAL GEAR','MG1'],mg_nes:['METAL GEAR NES'],mg2:['METAL GEAR 2','MG2'],
  snakes_revenge:['REVENGE'],mgs1:['MGS1'],vr_missions:['VR MISSIONS'],mgs2:['MGS2'],
  mgs3:['MGS3'],mpo:['PORTABLE OPS','MPO'],pw:['PEACE WALKER','PW'],gz:['GROUND ZEROES','GZ'],
  tpp:['MGSV','TPP'],mgs4:['MGS4'],mgr:['REVENGEANCE','MGR'],survive:['SURVIVE'],
  ghost_babel:['GHOST BABEL','GHOST'],acid:['AC!D','ACID'],acid2:['AC!D 2','ACID2'],mgo3:['MGO3']
 });
 // These aliases already identify specific reviewed original scenes in the native catalogue.
 // A remake, mobile edition or earlier/later incarnation never inherits its parent title's scenes.
 const TITLE_PREFERENCES=Object.freeze({mg_nes:'nes_jungle',snakes_revenge:'revenge-jungle-base',mgo3:'mgo3_jade'});
 const COMBAT_SCENES=Object.freeze({
  mg_msx:{core__shotmaker:'mg1-outer-heaven-poste-de-tir',core__firetrooper:'mg1-outer-heaven-galerie-thermique',
   core__dirtyduck:'mg1-outer-heaven-bloc-des-captifs',core__bloody_brad:'mg1-outer-heaven-salle-brad'},
  mg2:{core__ninja_mg2:'mg2-zanzibar-bureau-ninja',core__runner_mg2:'mg2-zanzibar-salle-de-poursuite',
   core__redblaster_mg2:'mg2-zanzibar-salle-des-filets',core__fox_mg2:'mg2-champ-de-mines-duel-gray-fox',
   core__bigboss_mg2:'mg2-zanzibar-arsenal-final',core__jungle_evil:'mg2-zanzibar-jungle-embuscade',
   core__night_fright:'mg2-zanzibar-salle-obscure'},
  mgs1:{core__ocelot_mgs1:'mgs1-shadow-moses-armurerie',core__fox:'mgs1-shadow-moses-laboratoire',
   core__mantis:'mgs1-shadow-moses-bureau-mantis',core__wolf:'mgs1-shadow-moses-champ-de-neige',
   core__raven:'mgs1-shadow-moses-entrepot-frigorifique',core__liquid:'mgs1-sommet-de-metal-gear-rex'},
  mgs2:{core__fortune:'mgs2-strut-a-quai',core__fatman:'big_shell',core__vamp:'mgs2-chambre-de-filtration',
   core__solidus:'mgs2-federal-hall-toiture',core__olga_mgs2:'tanker_deck',completion44__tengu_soldier_44:'arsenal_corridor'},
  mgs3:{core__pain:'mgs3-chyornaya-peschera-grotte',core__fear:'mgs3-graniny-gorki-foret',
   core__end:'sokrovenno',core__fury:'mgs3-tunnel-the-fury',core__boss:'flower_field',
   core__ocelot:'mgs3-bolshaya-past-crevasse',core__volgin:'mgs3-groznyj-grad-aire-de-combat-volgin',
   roster51__sorrow_mgs3:'mgs3-riviere-the-sorrow'},
  mpo:{core__cunningham:'mpo-san-hieronymo-silo',core__null_mpo:'mpo-san-hieronymo-prison',
   core__gene:'mpo-silo-lancement-icbmg'},
  pw:{npc53__reptile_pod_pw:'pw-pupa-operation',npc53__avian_pod_pw:'pw-chrysalis-operation',
   npc53__arthropod_pod_pw:'pw-cocoon-operation',npc53__mammal_pod_pw:'pw-peace-walker-operation'},
  tpp:{core__skull_mist:'tpp-afghanistan-brume-ruines',core__skull_armor:'tpp-aeroport-nova-braga-piste',
   core__skull_sniper:'tpp-afrique-centrale-lufwa-valley',archive__man_on_fire:'tpp-hopital-chypre',
   core__quiet:'tpp-afghanistan-ruines-daabe-shifap'},
  mgs4:{core__laughing_octopus:'mgs4-laboratoire-naomi',archive__laughing_beauty:'mgs4-laboratoire-naomi',
   core__raging_raven:'mgs4-tour-europe-est',archive__raging_beauty:'mgs4-tour-europe-est',
   core__crying_wolf:'mgs4-shadow-moses-ruines',archive__crying_beauty:'mgs4-shadow-moses-ruines',
   core__screaming_mantis:'mgs4-outer-haven-salle-mantis',archive__screaming_beauty:'mgs4-outer-haven-salle-mantis',
   core__liquid_ocelot:'outer_haven'},
  mgr:{core__blade_wolf:'mgr-abkhazie-cour-desperado',core__mistral:'mgr-abkhazie-installation-industrielle',
   core__monsoon:'mgr-world-marshal-esplanade',core__sundowner:'world_marshal',core__armstrong:'pakistan_wreck',
   core__sam:'mgr-badlands-duel-sam',core__khamsin:'mgr-abkhazie-carriere-khamsin'},
  ghost_babel:{core__hawk:'ghost-galuade-cour-logistique',core__pyro:'ghost-galuade-complexe-thermique',
   core__owl:'ghost-galuade-salle-des-marionnettes'},
  acid:{core__leone:'acid-lobito-entrepot',core__clown:'acid-tour-ebro-salle'}
 });
 const normalize=value=>String(value||'').trim().toUpperCase();
 const validID=value=>typeof value==='string'&&/^[a-z0-9_-]+$/.test(value);
 function createRegistry(dependencies={}){
  const catalogue=dependencies.catalog||root.CQC_STAGE_LAYER_DATA||{stages:[]};
  const renderer=dependencies.renderer||root.CQC_STAGE_LAYERS;
  const validation=dependencies.validateStage||root.CQC_STAGE_LAYER_ENGINE?.validateStage;
  const byID=new Map(),aliases=new Map(),names=new Map();
  const definitions=new Map((dependencies.stages||[]).map(stage=>[stage.id,stage]));
  for(const stage of catalogue.stages||[]){
   if(stage?.approved!==true||stage.review?.status!=='accepted_closest'||!validID(stage.id))continue;
   if(typeof validation==='function'&&validation(stage).length)continue;
   const definition=definitions.get(stage.id)||stage.legacyVisualDefinition;
   if(!definition||definition.id!==stage.id||typeof definition.name!=='string'||typeof definition.ep!=='string')continue;
   byID.set(stage.id,{native:stage,definition});
   const key=normalize(definition.name);
   if(names.has(key))names.set(key,null);else names.set(key,stage.id);
  }
  for(const [id,entry] of byID){
   for(const alias of [...(entry.native.targetCoreIDs||[]),...(entry.native.targetEpisodeIDs||[])]){
    if(!validID(alias))continue;
    if(byID.has(alias)&&alias!==id)throw Error('Native scene identity conflicts with alias: '+alias);
    if(aliases.has(alias)&&aliases.get(alias)!==id)throw Error('Ambiguous reviewed scene alias: '+alias);
    aliases.set(alias,id);
   }
  }
  const bridge=dependencies.bridge||root.CQC_PASS12_STAGE_BRIDGE;
  for(const table of [bridge?.aliases?.core,bridge?.aliases?.episode])for(const [alias,id] of Object.entries(table||{})){
   if(!validID(alias)||!byID.has(id))continue;
   if(aliases.has(alias)&&aliases.get(alias)!==id)throw Error('Reviewed bridge disagrees with native scene alias: '+alias);
   aliases.set(alias,id);
  }
  function available(entry){
   if(!entry)return false;
   if(typeof renderer?.status!=='function')return true;
   try{const status=renderer.status(entry.native.id);return status?.approved===true&&
    ['unloaded','loading','ready'].includes(status.state)&&!(status.errors||[]).length;}
   catch{return false;}
  }
  function sameTitle(entry,titleID){return !!entry&&TITLE_EPISODES[titleID]?.includes(normalize(entry.definition.ep));}
  function resolve(value,options={}){
   const input=typeof value==='string'?value:value?.id;
   const id=byID.has(input)?input:aliases.get(input)||names.get(normalize(input));
   const entry=byID.get(id);
   if(!available(entry)||(options.titleID&&!sameTitle(entry,options.titleID)&&!(options.allowVR&&id==='vr_grid')))return null;
   return {id:entry.native.id,name:entry.definition.name,ep:entry.definition.ep,native:entry.native,definition:entry.definition};
  }
  function listForTitle(titleID){
   return [...byID.values()].filter(entry=>sameTitle(entry,titleID)&&available(entry)).map(entry=>resolve(entry.native.id));
  }
  function appendStages(stages){
   if(!Array.isArray(stages))return 0;
   const seen=new Set(stages.map(stage=>stage.id));let count=0;
   for(const [id,entry] of byID){
    if(seen.has(id)||!available(entry))continue;
    stages.push(JSON.parse(JSON.stringify(entry.definition)));seen.add(id);count++;
   }
   return count;
  }
  function choose({titleID,opponentUID,preferredID,fallbackID='vr_grid'}={}){
   const combat=resolve(COMBAT_SCENES[titleID]?.[opponentUID],{titleID});
   const title=resolve(TITLE_PREFERENCES[titleID],{titleID});
   const preferred=resolve(preferredID,{titleID,allowVR:true});
   const fallback=resolve(fallbackID,{titleID,allowVR:true});
   const picked=combat||title||preferred||fallback;
   if(!picked)return null;
   return {stage:picked.name,stageId:picked.id,simulation:picked.id==='vr_grid'&&titleID!=='vr_missions'};
  }
  function titleForEpisode(episode){
   const ep=normalize(episode).split(/\s*\/\s*/)[0];
   return Object.keys(TITLE_EPISODES).find(title=>TITLE_EPISODES[title].includes(ep))||null;
  }
  return {version:'cqc-shared-native-stage-registry/1',resolve,listForTitle,appendStages,choose,titleForEpisode,
   counts:()=>({admitted:byID.size,aliases:aliases.size}),titles:Object.freeze(Object.keys(TITLE_EPISODES))};
 }
 return {createRegistry,TITLE_EPISODES,TITLE_PREFERENCES,COMBAT_SCENES};
});
