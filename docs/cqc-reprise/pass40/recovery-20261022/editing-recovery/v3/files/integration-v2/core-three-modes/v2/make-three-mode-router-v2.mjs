// Core-only descriptor aliases. No SDK/private-source binding or original profile is mutated.
import{createHash}from'node:crypto';
const clone=x=>JSON.parse(JSON.stringify(x)),sha=x=>createHash('sha256').update(x).digest('hex');
const expected=[['core__boss','metalgear','459fac8bdcd1b863302cbdc8106f16321ff76b612f44c16eeec2da6e6eecfd1f'],['core__quiet','cyborg','3dabe9e01a777c8113fef83dbf01db704732084a7d7567699288d47d6de5b617'],['core__liquid','nextgen','f592ccf181c17f57727177d406db143b650cfb163948d5c22a06116499a39815']];
export function makeThreeModeRouter(variants){
 if(!Array.isArray(variants)||variants.length!==3)throw Error('Three exact Core native aliases required');
 const seen=new Set();for(const variant of variants){const key=variant.uid+':'+variant.id,identity=expected.find(e=>e[0]===variant.uid&&e[1]===variant.id);if(!identity||seen.has(key)||variant.baseVSMetadataSHA256!==identity[2]||!/^[a-f0-9]{64}$/.test(variant.baseArtAuditSHA256||'')||!/^[a-f0-9]{64}$/.test(variant.metadata?.sha256||'')||!Number.isSafeInteger(variant.metadata?.bytes)||variant.metadata.bytes<=0||variant.metadata.path!=='assets/combat-costumes-pass40/'+variant.uid+'/'+variant.id+'/metadata-core-v1.json')throw Error('Core alias identity or exact source contract changed');seen.add(key);}
 const code=`/* Three Core-specific visual aliases; original profiles and native drawings stay exact. */
(function(root){'use strict';
 if(!/(^|\\/)modules\\/core-v032\\.html$/.test(root.location?.pathname||''))return;
 if(root.CQC_NATIVE_WARDROBE)throw Error('Core visual aliases must precede wardrobe creation');
 const variants=${JSON.stringify(clone(variants))};
 const previous=root.CQC_NATIVE_WARDROBE_INDEX;if(previous?.schema!=='cqc.native-wardrobe-index/1'||!Array.isArray(previous.entries))throw Error('Core source index absent');
 const next={...previous,entries:previous.entries.map(entry=>({...entry}))};
 for(const variant of variants){const matches=next.entries.map((entry,index)=>({entry,index})).filter(({entry})=>entry.uid===variant.uid&&entry.id===variant.id);if(matches.length!==1)throw Error('Core exact native alias missing or repeated');const{entry,index}=matches[0];if(entry.metadata?.sha256!==variant.baseVSMetadataSHA256||entry.review?.artAuditSHA256!==variant.baseArtAuditSHA256||entry.review?.status!=='approved'||!entry.review?.reviewer?.startsWith('Root'))throw Error('Core native alias lost its reviewed VS body');next.entries[index]={...entry,metadata:{...variant.metadata,url:variant.metadata.url||new URL(variant.metadata.path,entry.assetBaseURL).href},coreModeVariant:{schema:'cqc.p40.core-mode-descriptor/3',baseVSMetadataSHA256:variant.baseVSMetadataSHA256,baseArtAuditSHA256:variant.baseArtAuditSHA256,sameNativeSourcePNGs:true}};}
 root.CQC_NATIVE_WARDROBE_INDEX=next;
 root.CQC_PASS40_CORE_THREE_MODE_VARIANTS={version:'pass40-core-three-mode-variants/1',installed:variants.map(v=>({uid:v.uid,id:v.id,metadataSHA256:v.metadata.sha256,baseVSMetadataSHA256:v.baseVSMetadataSHA256}))};
})(globalThis);
`;
 return{code,variants:clone(variants),codeSHA256:sha(code)};
}
