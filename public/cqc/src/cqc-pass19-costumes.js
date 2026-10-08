/* Reviewed native costume registration. Requests never manufacture selectable sprites. */
(function(root,factory){'use strict';const api=factory(root);if(typeof module==='object'&&module.exports)module.exports=api;root.CQC_PASS19_COSTUMES=api;api.installChoices();})(globalThis,function(root){
 'use strict';
 const kinds=new Set(['canonical-game-costume','original-character-costume','style-reinterpretation','historical-incarnation','body-transformation','official-remake-appearance']);
 const families=new Set(['retro','nextgen','cyborg','survive','metalgear','tuxedo','canonical','alternate']);
 const data=()=>root.CQC_PASS19_COSTUME_REQUEST_DATA;
 const renderer=()=>root.CQC_COMBAT_SPRITES;
 const requests=new Map(),generation=new Map();
 const copy=value=>JSON.parse(JSON.stringify(value));
 const safeID=id=>typeof id==='string'&&/^[a-z0-9_-]+$/.test(id)&&id!=='original';
 const samePeriodSources=new Map([
  ['core__snake_mgs2',new Set(['roster51__pliskin_mgs2'])],
  ['roster51__pliskin_mgs2',new Set(['core__snake_mgs2'])],
  ['core__eva_mgs3',new Set(['npc53__tatyana_mgs3'])],
  ['npc53__tatyana_mgs3',new Set(['core__eva_mgs3'])]
 ]);
 const retired=new Map();
 function appearanceReason(uid,option){
  if(!option||option.id==='original')return null;
  const provenance=option.provenance;
  if(provenance&&provenance.sourceUID!==uid)return 'different-fighter-identity';
  if(option.sprite&&option.sprite.uid!==uid)return 'different-fighter-identity';
  if(['historical-incarnation','body-transformation'].includes(provenance?.kind))return 'separate-incarnation';
  if(provenance?.kind==='official-remake-appearance')return 'remake-requires-separate-incarnation-review';
  if(provenance?.sourceSpriteUID&&provenance.sourceSpriteUID!==uid&&!(provenance.kind==='canonical-game-costume'&&samePeriodSources.get(uid)?.has(provenance.sourceSpriteUID)))return 'other-incarnation-atlas';
  if(option.machinePresentation||option.sprite?.pixelArt||option.presentation?.kind==='authored-pixel-presentation')return 'newly-drawn-retro-atlas-required';
  return null;
 }
 function appearanceAllowed(uid,option){return appearanceReason(uid,option)===null;}
 function policyReport(){return{schema:'cqc.incarnation-costume-policy/1',samePeriodAtlasPairs:[...samePeriodSources].flatMap(([uid,sources])=>[...sources].map(sourceSpriteUID=>({uid,sourceSpriteUID}))),retired:[...retired.values()],historicalSourceFilesPreserved:true,derivedRetroSelectable:false};}
 const files=sprite=>new Map([...Object.values(sprite?.actions||{}),...Object.values(sprite?.oppositeActions||{})].flatMap(action=>action.frames||[]).map(frame=>[frame.file,frame.sha256]));
 function requestFor(uid,id){return requests.get(uid+':'+id)||data()?.entries?.[uid]?.requests?.find(request=>request.id===id)||null;}
 function catalog(){return root.CQC_COMBAT_COSTUME_CATALOG||{schema:'cqc.combat-costumes/1',entries:{}};}
 function optionFor(uid,id){return catalog().entries?.[uid]?.options?.find(option=>option.id===id)||null;}
 function selectable(uid,id){if(id==='original')return!!(data()?.entries?.[uid]||catalog().entries?.[uid]);const option=optionFor(uid,id);return appearanceAllowed(uid,option)&&(!!option?.sprite||!!option?.machineParts&&root.CQC_PASS21_MACHINE_COSTUME_RUNTIME?.ownsOption(uid,option)===true);}
 function validateOption(uid,option){
  if(!data()?.entries?.[uid]&&!catalog().entries?.[uid])throw Error('Identité non inscrite: '+uid);
  if(!safeID(option?.id)||!families.has(option.family)||!option.label?.trim())throw Error('Costume mal défini');
  const policyReason=appearanceReason(uid,option);if(policyReason)throw Error('Costume d’une autre incarnation ou illustration dérivée refusé: '+policyReason);
  if(optionFor(uid,option.id))throw Error('Costume déjà inscrit: '+uid+':'+option.id);
  if(requestFor(uid,option.family)?.status==='not-applicable')throw Error('Costume non applicable à cette incarnation');
  const provenance=option.provenance,review=option.assetReview,sprite=option.sprite;
  if(option.machineParts){if(!root.CQC_PASS21_MACHINE_COSTUME_RUNTIME?.ownsOption(uid,option))throw Error('Pièces natives de machine non vérifiées');return true;}
  if(option.machinePresentation){if(provenance?.kind!=='style-reinterpretation'||provenance.sourceUID!==uid||provenance.originalDesign!==true||provenance.canonicalAppearanceAttested!==false||!Array.isArray(provenance.sources)||!provenance.sources.length||provenance.sources.some(source=>!/^https:\/\//.test(source.url||''))||review?.status!=='verified'||!review.reviewer||!review.reviewedAt||!root.CQC_PASS19_MACHINE_PIXEL_STYLE?.validate(uid,option))throw Error('Présentation native de machine non vérifiée');return true;}
  if(!kinds.has(provenance?.kind)||provenance.sourceUID!==uid||!Array.isArray(provenance.sources)||!provenance.sources.length||provenance.sources.some(source=>!/^https:\/\//.test(source.url||'')))throw Error('Provenance du costume absente');
  const presentation=option.presentation;
  const pixelOnly=provenance?.kind==='style-reinterpretation'&&presentation?.kind==='authored-pixel-presentation'&&presentation.originalPresentation===true&&sprite?.pixelArt?.schema==='cqc.pixel-presentation/1';
  const composed=!!sprite?.costumeParts;
  if(review?.status!=='verified'||review.independentArt!==true||!review.reviewer||!review.reviewedAt)throw Error('Illustrations distinctes non vérifiées');
  if(!sprite||sprite.uid!==uid||sprite.mirror===true||!sprite.oppositeActions?.idle)throw Error('Deux directions natives requises');
  if(['canonical-game-costume','historical-incarnation','body-transformation','official-remake-appearance'].includes(provenance.kind)){
   if(provenance.kind!=='canonical-game-costume'&&(!provenance.sourceSpriteUID||!root.CQC_COMBAT_SPRITE_CATALOG?.entries?.[provenance.sourceSpriteUID]))throw Error('Corps source attesté absent');
   if(provenance.originalDesign!==false||provenance.canonicalAppearanceAttested!==true||!provenance.incarnation?.trim()||!provenance.costumeName?.trim())throw Error('Tenue canonique sans attestation de son incarnation');
  }else{
   const concept=sprite.costumeConcept;
   if(provenance.originalDesign!==true||provenance.canonicalAppearanceAttested!==false||concept?.schema!=='cqc.costume-design/1'||concept.sourceUID!==uid||concept.family!==option.family||concept.originalDesign!==true||concept.canonicalAppearanceAttested!==false)throw Error('Adaptation originale mal qualifiée');
  }
  if(option.physicalExtent){const extent=option.physicalExtent;if(!Number.isFinite(extent.metres)||extent.metres<=0||!extent.evidence||!Array.isArray(extent.sources))throw Error('Échelle physique du costume mal définie');}
  const validator=renderer()?.validateCostumeEntry||renderer()?.validateEntry;
  if(!validator||!validator(uid,sprite))throw Error('Atlas natif refusé: '+uid+':'+option.id);
  const original=root.CQC_COMBAT_SPRITE_CATALOG?.entries?.[uid],sourceFiles=files(original),nativeFiles=files(sprite);
  if(!nativeFiles.size||(!pixelOnly&&!composed&&[...nativeFiles].some(([file,sha])=>sourceFiles.has(file)||[...sourceFiles.values()].includes(sha))))throw Error('Une alternative ne peut réutiliser les images du corps original');
  if(composed&&!root.CQC_PASS19_COSTUME_PARTS?.validate(sprite))throw Error('Pièces natives ou ancrages anatomiques non vérifiés');
  const forward=new Set(Object.values(sprite.actions).flatMap(action=>action.frames).map(frame=>frame.file)),backward=new Set(Object.values(sprite.oppositeActions).flatMap(action=>action.frames).map(frame=>frame.file));
  if([...forward].some(file=>backward.has(file)))throw Error('Les deux directions doivent être des sources indépendantes');
  return true;
 }
 function registerBatch(additions){
  if(!Array.isArray(additions)||!additions.length)return{accepted:0,rejected:[]};
  const keys=new Set();for(const {uid,option} of additions){const key=uid+':'+option?.id;if(keys.has(key))throw Error('Costume répété dans le lot');keys.add(key);validateOption(uid,option);}
  const old=catalog(),entries={...old.entries};
  for(const {uid,option} of additions){const record=entries[uid]||{default:'original',options:[{id:'original',label:'Tenue d’origine'}]};entries[uid]={...record,options:[...record.options,copy(option)]};}
  const candidate={...old,schema:'cqc.combat-costumes/1',entries};
  const result=renderer()?.configureCostumes(candidate);if(!result||result.rejected.length){renderer()?.configureCostumes(old);throw Error('Enregistrement natif refusé: '+JSON.stringify(result?.rejected));}
  root.CQC_COMBAT_COSTUME_CATALOG=candidate;
  for(const {uid,option} of additions){requests.set(uid+':'+option.family,{id:option.family,status:option.family==='canonical'?'partial-reviewed-appearances':'ready-native',costumeID:option.id,provenanceKind:option.provenance.kind,...(option.family==='canonical'?{canonicalEnumerationComplete:false}:{})});if(option.physicalExtent){root.CQC_PASS19_COSTUME_HEIGHTS||={};root.CQC_PASS19_COSTUME_HEIGHTS[uid]={...(root.CQC_PASS19_COSTUME_HEIGHTS[uid]||{}),[option.id]:copy(option.physicalExtent)};}}
  installChoices();return{accepted:additions.length,rejected:[]};
 }
 function addRoster(entries){
  if(!Array.isArray(entries))throw Error('Incarnations attendues');
  const registry=data();if(!registry)throw Error('Registre des demandes absent');
  for(const entry of entries){if(!entry?.uid||!Array.isArray(entry.requests)||Object.hasOwn(registry.entries,entry.uid))throw Error('Incarnation nouvelle invalide ou déjà inscrite');if(!renderer()?.has(entry.uid)&&!root.CQC_PASS18_MACHINES?.has(entry.uid))throw Error('Corps natif approuvé absent: '+entry.uid);}
  root.CQC_PASS19_COSTUME_REQUEST_DATA={...registry,entries:{...registry.entries,...Object.fromEntries(entries.map(entry=>[entry.uid,copy(entry)]))}};
  installChoices();return entries.length;
 }
 function createRosterRecord({uid,name,game,basePresentation,nativeBody='sprite',cyborgIncarnation=false,alreadyMechanical=false,surviveIncarnation=false,referenceStatus='source-reviewed'}){
  if(!uid||!name||!game||!['retro','nextgen'].includes(basePresentation)||!['sprite','rig'].includes(nativeBody))throw Error('Métadonnées d’incarnation approuvée requises');
  const specifications=[basePresentation==='retro'?'nextgen':'retro','cyborg','survive','metalgear','tuxedo','canonical'];
  const requests=specifications.map(id=>{const reason=id==='cyborg'?(cyborgIncarnation?'already-cyborg-incarnation':alreadyMechanical?'already-mechanical-body':null):id==='survive'&&surviveIncarnation?'already-survive-incarnation':null;return{id,status:reason?'not-applicable':id==='canonical'?'pending-reference-review':'pending-art',...(reason?{reason}:{})};});
  return{uid,name,game,basePresentation,nativeBody,cyborgIncarnation,alreadyMechanical,surviveIncarnation,referenceStatus,requests,existingVariants:[]};
 }
 function normalize(uid,id){return selectable(uid,id)?id:'original';}
 function fighterFor(fighter,slot,override){
  if(!fighter)return fighter;const chosen=override===undefined?root.CQC_COSTUMES_PASS17?.chosen?.(slot,fighter.uid):override;
  const costume=normalize(fighter.uid,chosen),result={...fighter};if(costume==='original')delete result.costume;else result.costume=costume;return result;
 }
 function installChoices(){
  if(!data())return false;const old=catalog(),entries={...old.entries};
  for(const uid of Object.keys(data().entries))if(!entries[uid])entries[uid]={default:'original',options:[{id:'original',label:'Tenue d’origine'}]};
  let removed=0;
  for(const[uid,record]of Object.entries(entries)){
   const options=record.options.filter(option=>{const reason=appearanceReason(uid,option);if(!reason)return true;removed++;retired.set(uid+':'+option.id,{uid,id:option.id,reason,sourceSpriteUID:option.provenance?.sourceSpriteUID||null});return false;});
   entries[uid]={...record,default:options.some(option=>option.id===record.default)?record.default:'original',options};
  }
  root.CQC_COMBAT_COSTUME_CATALOG={...old,schema:'cqc.combat-costumes/1',entries};
  if(removed)renderer()?.configureCostumes(root.CQC_COMBAT_COSTUME_CATALOG);
  const choices=root.CQC_COSTUMES_PASS17;if(choices){choices.fighterFor=fighterFor;choices.spriteOptions=(fighter,options={})=>({...options,costume:normalize(fighter?.uid,fighter?.costume)});}
  return true;
 }
 function nativeVariant(fighter){return!!fighter&&fighter.costume!=='original'&&!!fighter.costume&&!!optionFor(fighter.uid,fighter.costume)?.sprite;}
 function strictEntry(uid,options={}){return renderer()?.getEntry(uid,{...options,costume:normalize(uid,options.costume||'original')})||null;}
 function displayHeight(fighter){return strictEntry(fighter?.uid,fighter)?.displayHeight||null;}
 function status(uid,id){const request=requestFor(uid,id),option=optionFor(uid,id);return{uid,id,request:request?copy(request):null,selectable:selectable(uid,id),art:option?.sprite?.coverage||'missing',provenance:option?.provenance?copy(option.provenance):null};}
 async function whenReady(fighter,options={}){
  fighter=fighterFor(fighter,0,fighter?.costume||'original');
  if(optionFor(fighter.uid,fighter.costume)?.machineParts)return root.CQC_PASS21_MACHINE_COSTUME_RUNTIME?.whenReady(fighter,options)||false;
  const machine=root.CQC_PASS18_MACHINES,originalComposite=(!fighter?.costume||fighter.costume==='original')&&machine?.hasComposite(fighter?.uid)===true;
  if(originalComposite||root.CQC_PASS19_MACHINE_PIXEL_STYLE?.selected(fighter)){const result=await machine?.whenReadyComposite(fighter.uid,options);return result===true&&machine?.ready(fighter.uid)===true;}
  const entry=strictEntry(fighter?.uid,fighter);if(!entry)return false;
  return!!(await renderer()?.whenReady(fighter.uid,{...options,costume:fighter.costume||'original'}));
 }
 async function prepareSlots(fighters,options={}){
  if(!Array.isArray(fighters)||fighters.length!==2)throw Error('Deux emplacements de combat requis');
  const resolved=fighters.map((fighter,slot)=>fighterFor(fighter,slot,fighter.costume||'original'));
  // Persist no new choice here. Superseded requests may finish decoding but cannot launch.
  const key=options.owner||'match',serial=(generation.get(key)||0)+1;generation.set(key,serial);
  renderer()?.retainFighters?.(resolved);
  const checks=await Promise.all(resolved.map(fighter=>whenReady(fighter,options)));
  return{ready:generation.get(key)===serial&&checks.every(Boolean)&&!options.signal?.aborted,serial,fighters:resolved};
 }
 function cancel(owner='match'){generation.set(owner,(generation.get(owner)||0)+1);}
 function report(){const entries=Object.values(data()?.entries||{});return{schema:'cqc.costume-status/1',identities:entries.length,readyNativeVariants:Object.values(catalog().entries).reduce((n,record)=>n+record.options.filter(option=>option.id!=='original'&&(option.sprite||option.machinePresentation)).length,0),requests:entries.flatMap(entry=>entry.requests.map(request=>({uid:entry.uid,...(requestFor(entry.uid,request.id)||request)}))),absolute1to1Certified:false};}
 return{version:'pass20-incarnation-costumes/1',appearanceAllowed,appearanceReason,policyReport,registerBatch,addRoster,createRosterRecord,validateOption,requestFor,optionFor,selectable,normalize,fighterFor,installChoices,nativeVariant,strictEntry,displayHeight,status,whenReady,prepareSlots,cancel,report};
});
