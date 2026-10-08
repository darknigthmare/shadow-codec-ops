/* Add only produced, reviewed local wardrobe entries to the existing pinned index. */
(function(root){'use strict';
 const clone=value=>JSON.parse(JSON.stringify(value));
 const localBase=new URL('../',root.document?.currentScript?.src||root.document?.baseURI||'http://localhost/cqc/src/').href;
 const sources=['CQC_PASS21_NATIVE_RETRO_INDEX','CQC_PASS21_NATIVE_RETRO_B_INDEX','CQC_PASS21_NATIVE_RETRO_C_INDEX','CQC_PASS21_NATIVE_TUXEDO_INDEX','CQC_PASS21_NATIVE_TUXEDO_B_INDEX','CQC_PASS21_NATIVE_TUXEDO_C_INDEX'];
 function localizeLegacy(previous,local,baseURL=localBase){
  if(!local)return clone(previous);
  if(local.schema!==previous.schema||!Array.isArray(local.entries)||local.entries.length!==4)throw Error('Copies locales historiques incorrectes');
  const transportFree=value=>{const result=clone(value);delete result.assetBaseURL;delete result.metadataBaseURL;delete result.metadata.url;for(const asset of result.assets)delete asset.url;return result;};
  const canonical=value=>JSON.stringify(value,(_key,item)=>item&&typeof item==='object'&&!Array.isArray(item)?Object.fromEntries(Object.keys(item).sort().map(name=>[name,item[name]])):item);
  const keys=new Set(),entries=clone(previous.entries);
  for(const replacement of local.entries){
   const key=replacement.uid+':'+replacement.id,position=entries.findIndex(entry=>entry.uid+':'+entry.id===key);
   if(keys.has(key)||position<0||replacement.id!=='nextgen'||replacement.family!=='nextgen'||canonical(transportFree(entries[position]))!==canonical(transportFree(replacement)))throw Error('Copie historique différente de la source immuable');
   keys.add(key);const entry=clone(replacement);entry.assetBaseURL=baseURL;entry.metadata.url=new URL(entry.metadata.path,baseURL).href;for(const asset of entry.assets)asset.url=new URL(asset.file,baseURL).href;entries[position]=entry;
  }
  return{...clone(previous),entries};
 }
 function compose(previous,additions,baseURL=localBase,localLegacy=null){
  if(previous?.schema!=='cqc.native-wardrobe-index/1'||!Array.isArray(previous.entries))throw Error('Vestiaire épinglé absent');
  const entries=localizeLegacy(previous,localLegacy,baseURL).entries,keys=new Set(entries.map(entry=>entry.uid+':'+entry.id));
  for(const addition of additions){
   if(!addition)continue;
   if(addition.schema!=='cqc.native-wardrobe-index/1'||!Array.isArray(addition.entries))throw Error('Lot de tenues incorrect');
   for(const source of addition.entries){
    if(source?.status==='pending'||source?.sprite||source?.option||source?.review?.status!=='approved'||!Array.isArray(source?.assets)||source.assets.length<2||!source.metadata?.path)throw Error('Tenue native non produite');
    if(!['retro','tuxedo'].includes(source.family)||source.provenance?.sourceUID!==source.uid)throw Error('Incarnation de tenue incorrecte');
    if(!/^(?:assets|data)\/[A-Za-z0-9_./-]+\.json$/.test(source.metadata.path)||source.metadata.path.split('/').some(part=>part==='..'||part===''))throw Error('Métadonnées locales incorrectes');
    const key=source.uid+':'+source.id;if(keys.has(key))throw Error('Tenue déjà inscrite');keys.add(key);
    const entry=clone(source);entry.assetBaseURL=baseURL;
    entry.metadata.url=new URL(entry.metadata.path,baseURL).href;
    entries.push(entry);
   }
  }
  return{...clone(previous),entries};
 }
 function install(){
  const index=compose(root.CQC_NATIVE_WARDROBE_INDEX,sources.map(name=>root[name]),localBase,root.CQC_PASS21_LOCAL_LEGACY_NEXTGEN_INDEX);
  root.CQC_NATIVE_WARDROBE_INDEX=index;
  root.CQC_NATIVE_WARDROBE?.configureIndex(index);
  return{entries:index.entries.length};
 }
 root.CQC_PASS21_NATIVE_WARDROBE_INDEX={version:'pass21-reviewed-local-wardrobe-index/2',compose,localizeLegacy,install};
 if(root.CQC_NATIVE_WARDROBE_INDEX)install();
})(globalThis);
