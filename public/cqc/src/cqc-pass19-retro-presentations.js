/* Compatibility receipt only: Archives require independently drawn native retro sprites. Prior derived pipeline source is preserved in PASS20 history. */
(function(root,factory){'use strict';const api=factory(root);if(typeof module==='object'&&module.exports)module.exports=api;root.CQC_PASS19_RETRO_PRESENTATIONS=api;if(root.CQC_PASS19_COSTUMES)api.registerAll();})(globalThis,function(root){
 'use strict';let receipt=null;
 function registerAll(){
  const wardrobe=root.CQC_PASS19_COSTUMES,catalog=root.CQC_COMBAT_SPRITE_CATALOG,requests=root.CQC_PASS19_COSTUME_REQUEST_DATA;
  if(!wardrobe||!catalog||!requests)throw Error('Sources de présentation indisponibles');
  const archivedDerivedPresentationUIDs=[],skipped=[];
  for(const [uid,body] of Object.entries(catalog.entries)){
   if(body.renderStyle!=='painted'||requests.entries[uid]?.basePresentation!=='nextgen'||wardrobe.optionFor(uid,'retro'))continue;
   if(!body.oppositeActions||body.mirror===true){skipped.push({uid,reason:'two-native-directions-required'});continue;}
   archivedDerivedPresentationUIDs.push(uid);
   skipped.push({uid,reason:'newly-drawn-retro-atlas-required'});
  }
  const registered={accepted:0,rejected:[]};
  receipt={schema:'cqc.pass19.retro-presentations/1',...registered,uids:[],archivedDerivedPresentationUIDs,skipped,newPhysicalPNGCount:0,sourcePixelsChanged:false,canonicalRetroExtractionClaimed:false};return receipt;
 }
 return{version:'pass19-retro-presentations/1',registerAll,status:()=>receipt};
});
