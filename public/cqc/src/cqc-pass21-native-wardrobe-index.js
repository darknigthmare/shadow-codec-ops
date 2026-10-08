/* Add only produced, reviewed local wardrobe entries to the existing pinned index. */
(function(root){'use strict';
 const clone=value=>JSON.parse(JSON.stringify(value));
 const localBase=new URL('../',root.document?.currentScript?.src||root.document?.baseURI||'http://localhost/cqc/src/').href;
 const sources=['CQC_PASS21_NATIVE_RETRO_INDEX','CQC_PASS21_NATIVE_RETRO_B_INDEX','CQC_PASS21_NATIVE_RETRO_C_INDEX','CQC_PASS21_NATIVE_TUXEDO_INDEX','CQC_PASS21_NATIVE_TUXEDO_B_INDEX','CQC_PASS21_NATIVE_TUXEDO_C_INDEX'];
 function compose(previous,additions,baseURL=localBase){
  if(previous?.schema!=='cqc.native-wardrobe-index/1'||!Array.isArray(previous.entries))throw Error('Vestiaire épinglé absent');
  const entries=clone(previous.entries),keys=new Set(entries.map(entry=>entry.uid+':'+entry.id));
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
  const index=compose(root.CQC_NATIVE_WARDROBE_INDEX,sources.map(name=>root[name]));
  root.CQC_NATIVE_WARDROBE_INDEX=index;
  root.CQC_NATIVE_WARDROBE?.configureIndex(index);
  return{entries:index.entries.length};
 }
 root.CQC_PASS21_NATIVE_WARDROBE_INDEX={version:'pass21-reviewed-local-wardrobe-index/1',compose,install};
 if(root.CQC_NATIVE_WARDROBE_INDEX)install();
})(globalThis);
