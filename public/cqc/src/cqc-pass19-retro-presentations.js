/* Complete pose-preserving pixel presentations of reviewed painted bodies. No new official costume claim. */
(function(root,factory){'use strict';const api=factory(root);if(typeof module==='object'&&module.exports)module.exports=api;root.CQC_PASS19_RETRO_PRESENTATIONS=api;if(root.CQC_PASS19_COSTUMES)api.registerAll();})(globalThis,function(root){
 'use strict';let receipt=null;
 function registerAll(){
  const wardrobe=root.CQC_PASS19_COSTUMES,catalog=root.CQC_COMBAT_SPRITE_CATALOG,requests=root.CQC_PASS19_COSTUME_REQUEST_DATA;
  if(!wardrobe||!catalog||!requests)throw Error('Sources de présentation indisponibles');
  const additions=[],skipped=[];
  for(const [uid,body] of Object.entries(catalog.entries)){
   if(body.renderStyle!=='painted'||requests.entries[uid]?.basePresentation!=='nextgen'||wardrobe.optionFor(uid,'retro'))continue;
   if(!body.oppositeActions||body.mirror===true){skipped.push({uid,reason:'two-native-directions-required'});continue;}
   const sprite=JSON.parse(JSON.stringify(body));
   sprite.renderStyle='pixel';sprite.pixelArt={schema:'cqc.pixel-presentation/1',originalPresentation:true,maxHeight:80};
   sprite.costumeConcept={schema:'cqc.costume-design/1',sourceUID:uid,costumeID:'retro',family:'retro',originalDesign:true,canonicalAppearanceAttested:false};
   const sources=body.review.sources?.length?body.review.sources:[{url:'https://github.com/darknigthmare/shadow-codec-ops/commit/5642ae495aa68eaf940e10724de8f3986f808cd0',scope:'Preserved original project character source; no official game appearance claimed.'}];
   sprite.review={...sprite.review,sourceKind:'original-character',sources,limits:[...sprite.review.limits,'Original low-resolution pixel presentation of the reviewed native pose sources; not an official sprite extraction or a newly authored full-body atlas.']};
   additions.push({uid,option:{id:'retro',family:'retro',label:'Archives',sprite,presentation:{kind:'authored-pixel-presentation',originalPresentation:true,method:'Native-frame downsampling then nearest-neighbor drawing; all poses, source aspect ratio and anatomical sides retained.'},provenance:{kind:'style-reinterpretation',sourceUID:uid,originalDesign:true,canonicalAppearanceAttested:false,sources},assetReview:{status:'verified',independentArt:false,reviewer:'native-pixel-presentation-pipeline',reviewedAt:'2026-10-08',scope:'Reuses accepted physical native PNGs with an explicit original rendering style; requires decoded body sources before launch.'}}});
  }
  const registered=additions.length?wardrobe.registerBatch(additions):{accepted:0,rejected:[]};
  receipt={schema:'cqc.pass19.retro-presentations/1',...registered,uids:additions.map(addition=>addition.uid),skipped,newPhysicalPNGCount:0,sourcePixelsChanged:false,canonicalRetroExtractionClaimed:false};return receipt;
 }
 return{version:'pass19-retro-presentations/1',registerAll,status:()=>receipt};
});
