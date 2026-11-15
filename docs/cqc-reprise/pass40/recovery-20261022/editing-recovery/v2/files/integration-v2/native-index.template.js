/* Existing native wardrobe handles bytes, SHA verification, loading, and selection. */
(function(root){'use strict';
 const entries=/* REVIEWED_DESCRIPTORS */null,archiveCommit=/* IMMUTABLE_ARCHIVE_COMMIT */null;
 const copy=x=>JSON.parse(JSON.stringify(x)),same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 const ownURL=root.document?.currentScript?.src;
 function compose(previous,baseURL){
  if(previous?.schema!=='cqc.native-wardrobe-index/1'||!Array.isArray(previous.entries))throw Error('Index natif initial absent');
  if(archiveCommit!==null&&!/^[a-f0-9]{40}$/.test(archiveCommit))throw Error('Archive native non immuable');
  const base=new URL(baseURL||root.document?.baseURI||'http://localhost/cqc/'),next=copy(previous);
  for(const source of entries){const entry=copy(source);entry.assetBaseURL=base.href;
   if(entry.metadata.url!=null){if(!/^https:\/\/raw\.githubusercontent\.com\/darknigthmare\/shadow-codec-ops\/[a-f0-9]{40}\/rootassets\//.test(entry.metadata.url)||!entry.metadata.url.endsWith('/rootassets/'+entry.metadata.path))throw Error('Ancienne route de métadonnées non immuable');}
   else entry.metadata.url=archiveCommit?'https://raw.githubusercontent.com/darknigthmare/shadow-codec-ops/'+archiveCommit+'/rootassets/'+entry.metadata.path:new URL(entry.metadata.path,base).href;
   for(const asset of entry.assets){if(asset.url!=null){if(!new RegExp('^https://raw\\.githubusercontent\\.com/darknigthmare/shadow-codec-ops/[a-f0-9]{40}/raw/'+asset.sha256+'\\.png$').test(asset.url))throw Error('Ancienne route PNG non immuable');}else if(archiveCommit)asset.url='https://raw.githubusercontent.com/darknigthmare/shadow-codec-ops/'+archiveCommit+'/raw/'+asset.sha256+'.png';}
   const old=next.entries.find(e=>e.uid===entry.uid&&e.id===entry.id);if(old){if(!same(old,entry))throw Error('Identifiant P40 déjà inscrit avec un autre contenu');}else next.entries.push(entry);
  }return next;
 }
 function install(options={}){const baseURL=options.baseURL||(ownURL?new URL('../',ownURL).href:new URL('../',root.document?.baseURI||'http://localhost/cqc/modules/').href);const next=compose(root.CQC_NATIVE_WARDROBE_INDEX,baseURL);root.CQC_NATIVE_WARDROBE_INDEX=next;root.CQC_NATIVE_WARDROBE?.configureIndex?.(next);return{accepted:entries.length,ids:entries.map(e=>e.uid+':'+e.id)};}
 root.CQC_PASS40_NATIVE_BATCH_INDEX={version:'pass40-native-batch-index/2',compose,install};if(root.CQC_NATIVE_WARDROBE_INDEX)install();
})(globalThis);
