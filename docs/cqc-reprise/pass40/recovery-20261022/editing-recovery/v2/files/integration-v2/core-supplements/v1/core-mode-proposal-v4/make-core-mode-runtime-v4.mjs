// Build a Core-only descriptor/table selection from pinned data; reuse the reviewed SDK verbatim.
import assert from'node:assert/strict';import{createHash}from'node:crypto';
const clone=x=>JSON.parse(JSON.stringify(x)),sha=x=>createHash('sha256').update(x).digest('hex');
export function makeCoreModeRuntime({template,baseBindings,skullBinding,amandaVariant,skullVariant}){
 if(sha(template)!=='ae75224e64f34a0c4018605096bde3b2f681f6f772f80f1740aede3caa32c7f2')throw Error('Root-reviewed pure SDK template changed');
 if(amandaVariant.uid!=='core__amanda_pw'||amandaVariant.id!=='tuxedo'||skullVariant.uid!=='core__skull_armor'||skullVariant.id!=='retro-msx'||skullBinding.uid!==skullVariant.uid||skullBinding.id!==skullVariant.id)throw Error('Outside two exact Core variants');
 if(amandaVariant.baseVSMetadataSHA256!=='c58c36c6304e1f4d1f93c9044143dcbb25cfae22c8011fac975e9323220b46f9'||skullVariant.baseVSMetadataSHA256!=='dcd22f4ce566206a4652b1cb0116aa26f50ed3601611e2e029e0a1c19d011a77')throw Error('Core variants lost their exact VS bodies');
 if(skullBinding.revision!=='native-batch40-v2'||skullBinding.artAuditSHA256!==skullVariant.newReview?.artAuditSHA256||skullBinding.anchors.length!==2||skullBinding.anchors.some(a=>a.slot!=='special'||a.tag!=='debris'||a.action!=='deploy'))throw Error('Core binding is not the exact reviewed debris source');
 const matches=baseBindings.filter(b=>b.uid===skullBinding.uid&&b.id===skullBinding.id);if(matches.length!==1)throw Error('Exact base Skull binding absent or repeated');
 const bindings=baseBindings.map(b=>b.uid===skullBinding.uid&&b.id===skullBinding.id?clone(skullBinding):clone(b));
 for(const b of baseBindings)if(b.uid!==skullBinding.uid||b.id!==skullBinding.id)assert.deepEqual(bindings.find(n=>n.uid===b.uid&&n.id===b.id),b);
 const variants=[clone(amandaVariant),clone(skullVariant)];
 const router=`/* Core-only mode metadata. Source authority below is the reviewed SDK template verbatim. */
(function(root){'use strict';
 if(!/(^|\\/)modules\\/core-v032\\.html$/.test(root.location?.pathname||''))return;
 const variants=${JSON.stringify(variants)};
 if(root.CQC_NATIVE_WARDROBE)throw Error('Core metadata variants must precede native wardrobe creation');
 const previous=root.CQC_NATIVE_WARDROBE_INDEX;if(previous?.schema!=='cqc.native-wardrobe-index/1'||!Array.isArray(previous.entries))throw Error('Core variant base index absent');
 const held=previous.entries.filter(entry=>entry.uid==='core__venus'&&entry.id==='retro-msx');if(held.length>1)throw Error('Held Core Venus option repeated');
 if(held.length&&(held[0].metadata?.sha256!=='4b54da4fe50a2712a4630cb1adbc13b44def931505f9407878860f84c319a0b9'||held[0].review?.artAuditSHA256!=='cc5ad5e0c0cb2aa9a531e5c51a3c4db9232c4339ae1df4becea8ae8996c7e541'))throw Error('Held Core Venus metadata identity changed');
 const next={...previous,entries:previous.entries.filter(entry=>!(entry.uid==='core__venus'&&entry.id==='retro-msx')).map(entry=>({...entry}))};
 for(const variant of variants){
  const matches=next.entries.map((entry,index)=>({entry,index})).filter(({entry})=>entry.uid===variant.uid&&entry.id===variant.id);if(matches.length!==1)throw Error('Core variant base identity absent or repeated');
  const{entry,index}=matches[0];if(entry.metadata.sha256!==variant.baseVSMetadataSHA256||entry.review.artAuditSHA256!==variant.baseArtAuditSHA256)throw Error('Core variant does not bind its exact VS body/art');
  const review=variant.newReview||entry.review,assets=variant.additionalAssets?[...entry.assets,...variant.additionalAssets]:entry.assets;
  if(review.status!=='approved'||!review.reviewer?.startsWith('Root')||!/^[a-f0-9]{64}$/.test(review.artAuditSHA256||''))throw Error('Core selection art review absent');
  if(new Set(assets.map(asset=>asset.file)).size!==assets.length)throw Error('Core source asset repeated');
  next.entries[index]={...entry,review,assets,metadata:{...variant.metadata,url:variant.metadata.url||new URL(variant.metadata.path,entry.assetBaseURL).href},coreModeVariant:{schema:'cqc.p40.core-mode-descriptor/2',baseVSMetadataSHA256:variant.baseVSMetadataSHA256,baseArtAuditSHA256:variant.baseArtAuditSHA256,coreArtAuditSHA256:review.artAuditSHA256}};
 }
 root.CQC_NATIVE_WARDROBE_INDEX=next;
 root.CQC_PASS40_CORE_METADATA_VARIANTS={version:'pass40-core-metadata-variants/2',installed:variants.map(v=>({uid:v.uid,id:v.id,metadataSHA256:v.metadata.sha256,baseVSMetadataSHA256:v.baseVSMetadataSHA256}))};
${template.replace('/* REVIEWED_BINDINGS */null',JSON.stringify(bindings))}
})(globalThis);
`;
 return{code:router,bindings,variants,sdkTemplateSHA256:sha(template)};
}
