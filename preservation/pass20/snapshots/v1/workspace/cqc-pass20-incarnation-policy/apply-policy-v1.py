from pathlib import Path
import os
b=Path('/tmp/cqc-pass19-application/public/cqc/src')
def edit(name,old,new):
 p=b/name;s=p.read_text();assert s.count(old)==1,(name,s.count(old),old[:80]);n=s.replace(old,new);tmp=p.with_name(p.name+'.pass20-tmp');tmp.write_text(n);os.replace(tmp,p)
# Policy lives in the existing foundation, so replay/legacy callers use the same rules.
edit('cqc-pass19-costumes.js'," const files=sprite=>",''' const samePeriodSources=new Map([
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
 const files=sprite=>''')
edit('cqc-pass19-costumes.js',"const option=optionFor(uid,id);return!!option?.sprite||root.CQC_PASS19_MACHINE_PIXEL_STYLE?.validate(uid,option)===true;","const option=optionFor(uid,id);return appearanceAllowed(uid,option)&&!!option?.sprite;")
edit('cqc-pass19-costumes.js',"  if(optionFor(uid,option.id))throw Error('Costume déjà inscrit: '+uid+':'+option.id);","  const policyReason=appearanceReason(uid,option);if(policyReason)throw Error('Costume d’une autre incarnation ou illustration dérivée refusé: '+policyReason);\n  if(optionFor(uid,option.id))throw Error('Costume déjà inscrit: '+uid+':'+option.id);")
edit('cqc-pass19-costumes.js',"  if(review?.status!=='verified'||(!pixelOnly&&review.independentArt!==true)||!review.reviewer||!review.reviewedAt)","  if(review?.status!=='verified'||review.independentArt!==true||!review.reviewer||!review.reviewedAt)")
edit('cqc-pass19-costumes.js',"  root.CQC_COMBAT_COSTUME_CATALOG={...old,schema:'cqc.combat-costumes/1',entries};\n  const choices=",'''  let removed=0;
  for(const[uid,record]of Object.entries(entries)){
   const options=record.options.filter(option=>{const reason=appearanceReason(uid,option);if(!reason)return true;removed++;retired.set(uid+':'+option.id,{uid,id:option.id,reason,sourceSpriteUID:option.provenance?.sourceSpriteUID||null});return false;});
   entries[uid]={...record,default:options.some(option=>option.id===record.default)?record.default:'original',options};
  }
  root.CQC_COMBAT_COSTUME_CATALOG={...old,schema:'cqc.combat-costumes/1',entries};
  if(removed)renderer()?.configureCostumes(root.CQC_COMBAT_COSTUME_CATALOG);
  const choices=''')
edit('cqc-pass19-costumes.js',"function strictEntry(uid,options={}){const costume=options.costume||'original';return costume!=='original'&&!selectable(uid,costume)?null:renderer()?.getEntry(uid,options)||null;}","function strictEntry(uid,options={}){return renderer()?.getEntry(uid,{...options,costume:normalize(uid,options.costume||'original')})||null;}")
edit('cqc-pass19-costumes.js',"  const machine=root.CQC_PASS18_MACHINES,originalComposite=", "  fighter=fighterFor(fighter,0,fighter?.costume||'original');\n  const machine=root.CQC_PASS18_MACHINES,originalComposite=")
edit('cqc-pass19-costumes.js',"  if(fighters.some(fighter=>fighter?.costume&&fighter.costume!=='original'&&!selectable(fighter.uid,fighter.costume)))return{ready:false,reason:'unavailable-costume',fighters:[]};\n","")
edit('cqc-pass19-costumes.js',"selectable:!!option?.sprite,art:","selectable:selectable(uid,id),art:")
edit('cqc-pass19-costumes.js',"return{version:'pass19-costumes/1',registerBatch", "return{version:'pass20-incarnation-costumes/1',appearanceAllowed,appearanceReason,policyReport,registerBatch")
# Old crossmaps remain fully readable in data/additions; only reviewed same-period pairs register.
edit('cqc-pass19-canonical-appearances.js',"function install(){if(installed)return{accepted:0,alreadyInstalled:true};const api=root.CQC_PASS19_COSTUMES;if(!api?.registerBatch)throw Error('Enregistrement des costumes absent');const result=api.registerBatch(additions());if(result.accepted!==data.counts.readyNativeOptions||result.rejected?.length)throw Error('Options historiques non enregistrées');installed=true;return{...result,counts:{...data.counts}};}",'''function reviewedAdditions(){return additions().filter(({uid,option})=>root.CQC_PASS19_COSTUMES.appearanceAllowed(uid,option));}
function excludedRecords(){return data.records.filter(record=>!root.CQC_PASS19_COSTUMES.appearanceAllowed(record.uid,{id:record.id,provenance:{kind:record.kind,sourceUID:record.uid,sourceSpriteUID:record.sourceSpriteUID}})).map(record=>({...record,reason:root.CQC_PASS19_COSTUMES.appearanceReason(record.uid,{id:record.id,provenance:{kind:record.kind,sourceUID:record.uid,sourceSpriteUID:record.sourceSpriteUID}})}));}
function install(){if(installed)return{accepted:0,alreadyInstalled:true};const api=root.CQC_PASS19_COSTUMES;if(!api?.registerBatch)throw Error('Enregistrement des costumes absent');const reviewed=reviewedAdditions(),result=api.registerBatch(reviewed);if(result.accepted!==reviewed.length||result.rejected?.length)throw Error('Costumes de la même période non enregistrés');installed=true;return{...result,counts:{preservedHistoricalRecords:data.records.length,retainedSamePeriodOptions:reviewed.length,excludedSeparateIncarnations:excludedRecords().length}};}''')
edit('cqc-pass19-canonical-appearances.js',"data,additions,install", "data,additions,reviewedAdditions,excludedRecords,install")
# Retain the old generators as archival source; they no longer register derived costumes.
edit('cqc-pass19-retro-presentations.js',"  const registered=additions.length?wardrobe.registerBatch(additions):{accepted:0,rejected:[]};", "  const registered={accepted:0,rejected:[]};\n  skipped.push(...additions.map(({uid})=>({uid,reason:'newly-drawn-retro-atlas-required'})));")
edit('cqc-pass19-retro-presentations.js',"uids:additions.map(addition=>addition.uid)","uids:[],archivedDerivedPresentationUIDs:additions.map(addition=>addition.uid)")
edit('cqc-pass19-machine-pixel-style.js',"  const result=additions.length?wardrobe.registerBatch(additions):{accepted:0,rejected:[]};", "  const result={accepted:0,rejected:[]};")
edit('cqc-pass19-machine-pixel-style.js',"uids:additions.map(addition=>addition.uid)","uids:[],archivedDerivedPresentationUIDs:additions.map(addition=>addition.uid),reason:'newly-drawn-retro-atlas-required'")
# Lexical normalization, including preferences read before the policy loads, stays authoritative.
edit('cqc-pass17-costumes.js',"function optionsFor(uid){return (record(uid)?.options||[{id:'original',label:'Original'}]).map", "function optionsFor(uid){return (record(uid)?.options||[{id:'original',label:'Original'}]).filter(option=>root.CQC_PASS19_COSTUMES?.appearanceAllowed(uid,option)!==false).map")
edit('cqc-pass17-costumes.js',"slots:slots.map(slot=>({...slot}))", "slots:slots.map(slot=>Object.fromEntries(Object.entries(slot).map(([uid,id])=>[uid,normalize(uid,id)])))")
# Lazy indexes also obey incarnation boundaries; pending/new independent artwork remains supported.
edit('cqc-pass19-native-wardrobe-library.js',"   const next=new Map(),defaultAssetBase=", "   const next=new Map(),blocked=[],defaultAssetBase=")
edit('cqc-pass19-native-wardrobe-library.js',"    if(!wardrobe.selectable(item.uid,'original'))", "    if(wardrobe.appearanceAllowed?.(item.uid,item)===false){blocked.push({uid:item.uid,id:item.id,reason:wardrobe.appearanceReason?.(item.uid,item)||'separate-incarnation'});continue;}\n    if(!wardrobe.selectable(item.uid,'original'))")
edit('cqc-pass19-native-wardrobe-library.js',"return{entries:descriptors.size};", "return{entries:descriptors.size,blocked};")
edit('cqc-pass19-native-wardrobe-library.js',"   if(option.assetReview?.status!=='verified'||option.sprite.review?.status!=='approved')", "   if(wardrobe.appearanceAllowed?.(desc.uid,option)===false)throw Error('Illustration d’une autre incarnation ou rétro dérivé refusé');\n   if(option.assetReview?.status!=='verified'||option.sprite.review?.status!=='approved')")
edit('cqc-pass19-native-wardrobe-library.js',"const owner=options.owner||'match';cancelPreparation(owner);", "fighters=fighters.map(fighter=>descriptors.has(key(fighter.uid,fighter.costume))?{...fighter}:wardrobe.fighterFor(fighter,0,fighter.costume||'original'));const owner=options.owner||'match';cancelPreparation(owner);")
print('Atomic policy edits complete: 6 source files. Originals retained.')
