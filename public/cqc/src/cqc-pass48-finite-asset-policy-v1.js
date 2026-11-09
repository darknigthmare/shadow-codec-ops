/* Independent finite P48 allowlist. Does not change or wrap the legacy policy/fetch. */
(function(root,factory){'use strict';const api=factory(root,typeof module==='object'&&module.exports?require('./cqc-pass48-metadata-gzip-transport-v1.js'):root.CQC_PASS48_GZIP_METADATA_TRANSPORT);if(typeof module==='object'&&module.exports)module.exports=api;root.CQC_PASS48_FINITE_ASSET_POLICY=api;})(globalThis,function(defaultRoot,transport){
 'use strict';
 const LIMITS=Object.freeze({entries:40,png:80,gzip:40}),SHA=/^[a-f0-9]{64}$/;
 function create(config={}){
  if(!transport?.create)throw Error('Transport fini P48 absent');
  const baseURL=new URL(config.baseURL),entries=JSON.parse(JSON.stringify(config.entries));
  const reader=transport.create({root:config.root||defaultRoot,baseURL:baseURL.href,entries,maxEntries:LIMITS.entries});
  const pins=new Map();let pngCount=0,gzipCount=0;
  function add(row,path,bytes,sha256,kind,declared){
   if(!Number.isInteger(bytes)||bytes<1||bytes>(kind==='gzip'?transport.maxPackedBytes:128*1024*1024)||!SHA.test(sha256||''))throw Error('Épinglage ressource P48 incorrect');
   const local=new URL(path,baseURL).href,url=new URL(declared||path,baseURL);
   if(url.username||url.password||url.search||url.hash)throw Error('Adresse ressource P48 incorrecte');
   const remote=url.protocol==='https:'&&url.hostname==='raw.githubusercontent.com'&&!url.port&&url.pathname==='/darknigthmare/shadow-codec-ops/'+url.pathname.split('/')[3]+'/rootassets/'+path&&/^[a-f0-9]{40}$/.test(url.pathname.split('/')[3]||'');
   if(url.href!==local&&!remote)throw Error('Source ressource P48 hors liste exacte');
   if(pins.has(url.href))throw Error('Ressource P48 répétée');
   pins.set(url.href,Object.freeze({uid:row.uid,family:row.family,kind,path,url:url.href,bytes,sha256}));
   if(kind==='png')pngCount++;else gzipCount++;
  }
  for(const row of entries){
   const assets=row.assets;
   if(!Array.isArray(assets)||assets.length<1||assets.length>2)throw Error('Une ou deux pages PNG P48 requises par costume');
   const prefix='assets/combat-costumes-pass48/'+row.uid+'/'+row.id+'/';
   for(const asset of assets){
    if(typeof asset.file!=='string'||!asset.file.startsWith(prefix)||!/^[-a-zA-Z0-9_]+\.png$/.test(asset.file.slice(prefix.length)))throw Error('Page PNG P48 hors identité exacte');
    if(!Number.isInteger(asset.width)||!Number.isInteger(asset.height)||asset.width<1||asset.height<1||asset.width>16384||asset.height>16384)throw Error('Dimensions PNG P48 incorrectes');
    add(row,asset.file,asset.bytes,asset.sha256,'png',asset.url);
   }
   const t=row.metadata.transport;add(row,t.path,t.bytes,t.sha256,'gzip',t.url);
  }
  if(pngCount>LIMITS.png||gzipCount>LIMITS.gzip)throw Error('Plafond fini P48 dépassé');
  return Object.freeze({version:'p48-finite-asset-policy/1',allows:url=>typeof url==='string'&&pins.has(url),pinFor:url=>pins.get(url)||null,statistics:()=>Object.freeze({entries:reader.statistics().entries,png:pngCount,gzip:gzipCount,urls:pins.size}),limits:LIMITS});
 }
 return Object.freeze({create,version:'p48-finite-asset-policy/1',limits:LIMITS});
});
