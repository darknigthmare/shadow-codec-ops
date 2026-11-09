/* Finite P48 gzip metadata transport. Decoded Source JSON remains byte-identical. */
(function(root,factory){'use strict';const api=factory(root);if(typeof module==='object'&&module.exports)module.exports=api;root.CQC_PASS48_GZIP_METADATA_TRANSPORT=api;})(globalThis,function(defaultRoot){
 'use strict';
 const SCHEMA='cqc.p48.gzip-metadata/1',MAX_ENTRIES=676,INITIAL_MAX_ENTRIES=40,MAX_RAW=4*1024*1024,MAX_PACKED=2*1024*1024;
 const UID=/^[a-z0-9]+__[a-z0-9_]+$/,SHA=/^[a-f0-9]{64}$/;
 const clone=value=>JSON.parse(JSON.stringify(value));
 const canonical=value=>JSON.stringify(value,(_key,item)=>item&&typeof item==='object'&&!Array.isArray(item)?Object.fromEntries(Object.keys(item).sort().map(name=>[name,item[name]])):item);
 const abortError=()=>Object.assign(new Error('Chargement P48 annulé'),{name:'AbortError'});
 function create(config={}){
  const root=config.root||defaultRoot,baseURL=new URL(config.baseURL||new URL('../',root.document?.currentScript?.src||root.document?.baseURI||'http://localhost/cqc/src/').href);
  if(!['http:','https:'].includes(baseURL.protocol)||baseURL.username||baseURL.password||baseURL.search||baseURL.hash)throw Error('Base P48 incorrecte');
  const limit=config.maxEntries??INITIAL_MAX_ENTRIES,rows=config.entries;if(!Number.isInteger(limit)||limit<1||limit>MAX_ENTRIES||!Array.isArray(rows)||!rows.length||rows.length>limit)throw Error('Registre P48 fini requis');
  const known=new Map(),keys=new Set();
  function url(value){const result=new URL(value,baseURL);if(result.username||result.password||result.search||result.hash)throw Error('Adresse P48 non admissible');return result;}
  for(const input of rows){
   const item=clone(input),m=item.metadata,t=m?.transport,uid=item.uid,id=item.id;
   if(!UID.test(uid||'')||!['zombie','cyborg'].includes(id)||item.family!==id)throw Error('Identité P48 incorrecte');
   if(id==='cyborg'&&['core__fear','core__eva_mgs3'].includes(uid))throw Error('Réserve de correction P48 exclue');
   if(item.review?.status!=='approved'||item.review.reviewer!=='Root P48'||!SHA.test(item.review.artAuditSHA256||''))throw Error('Revue Source Root P48 absente');
   const logical='assets/combat-costumes-pass48/'+uid+'/'+id+'/metadata-v1.json';
   if(m?.path!==logical||!Number.isInteger(m.bytes)||m.bytes<2||m.bytes>MAX_RAW||!SHA.test(m.sha256||''))throw Error('Source JSON P48 non épinglée');
   if(t?.schema!==SCHEMA||t.path!==logical+'.gz'||!Number.isInteger(t.bytes)||t.bytes<20||t.bytes>MAX_PACKED||!SHA.test(t.sha256||'')||t.rawBytes!==m.bytes||t.rawSHA256!==m.sha256||t.artAuditSHA256!==item.review.artAuditSHA256)throw Error('Transport P48 non épinglé');
   if(Object.keys(t).some(key=>!['schema','path','bytes','sha256','rawBytes','rawSHA256','artAuditSHA256','url'].includes(key)))throw Error('Champ transport P48 inconnu');
   const logicalURL=url(logical),declaredURL=url(m.url||logical),packedURL=url(t.url||t.path);
   if(logicalURL.origin!==baseURL.origin||declaredURL.href!==logicalURL.href)throw Error('Identité logique P48 modifiée');
   const localPacked=new URL(t.path,baseURL).href;
   const remote=packedURL.protocol==='https:'&&packedURL.hostname==='raw.githubusercontent.com'&&!packedURL.port&&new RegExp('^/darknigthmare/shadow-codec-ops/[a-f0-9]{40}/rootassets/'+t.path.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'$').test(packedURL.pathname);
   if(packedURL.href!==localPacked&&!remote)throw Error('Transport P48 hors source exacte');
   const key=uid+':'+id;if(keys.has(key)||known.has(logicalURL.href))throw Error('Source P48 répétée');keys.add(key);
   known.set(logicalURL.href,Object.freeze({uid,id,family:item.family,metadata:Object.freeze(m),transport:Object.freeze(t),url:logicalURL.href,packedURL:packedURL.href}));
  }
  function recordFor(pin){
   if(!pin||typeof pin.url!=='string')return null;
   const row=known.get(pin.url);
   if(!row){let requested;try{requested=new URL(pin.url);}catch{return null;}
    const prefix=new URL('assets/combat-costumes-pass48/',baseURL);
    if(requested.origin===prefix.origin&&requested.pathname.startsWith(prefix.pathname))throw Error('Source P48 non revue');
    return null;
   }
   if(pin.path!==row.metadata.path||pin.bytes!==row.metadata.bytes||pin.sha256!==row.metadata.sha256||canonical(pin.transport)!==canonical(row.transport))throw Error('Épinglage P48 modifié');
   return row;
  }
  async function bounded(stream,expected,signal){
   if(!stream?.getReader)throw Error('Flux vérifiable P48 indisponible');
   const reader=stream.getReader(),chunks=[];let size=0;
   const cancel=()=>{try{Promise.resolve(reader.cancel(abortError())).catch(()=>{});}catch{}};
   signal?.addEventListener?.('abort',cancel,{once:true});
   try{while(true){if(signal?.aborted)throw abortError();const next=await reader.read();if(signal?.aborted)throw abortError();if(next.done)break;
     if(!ArrayBuffer.isView(next.value)||next.value.BYTES_PER_ELEMENT!==1)throw Error('Flux binaire P48 incorrect');size+=next.value.byteLength;if(size>expected)throw Error('Taille P48 dépassée');chunks.push(next.value);
    }
    if(size!==expected)throw Error('Taille P48 incorrecte');const result=new Uint8Array(size);let offset=0;for(const chunk of chunks){result.set(chunk,offset);offset+=chunk.byteLength;}return result;
   }catch(error){try{await reader.cancel();}catch{}if(signal?.aborted)throw abortError();throw error;}
   finally{signal?.removeEventListener?.('abort',cancel);try{reader.releaseLock();}catch{}}
  }
  async function digest(bytes,crypto){return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),n=>n.toString(16).padStart(2,'0')).join('');}
  async function read(pin,options={}){
   const row=recordFor(pin);if(!row)throw Error('Transport P48 non propriétaire');const {signal}=options;
   if(signal?.aborted)throw abortError();const fetcher=options.fetcher||config.fetcher||root.fetch?.bind(root),crypto=options.crypto||config.crypto||root.crypto;
   if(!fetcher||!crypto?.subtle||typeof root.DecompressionStream!=='function'||typeof root.Blob!=='function'||typeof root.TextDecoder!=='function')throw Error('Vérification gzip P48 indisponible');
   const response=await fetcher(row.packedURL,{signal,mode:'cors',credentials:'omit',redirect:'error',cache:'force-cache'});
   if(signal?.aborted)throw abortError();if(!response?.ok||response.redirected||response.url&&response.url!==row.packedURL)throw Error('Source gzip P48 indisponible');
   const packed=await bounded(response.body,row.transport.bytes,signal);
   if(await digest(packed,crypto)!==row.transport.sha256)throw Error('Empreinte gzip P48 incorrecte');if(signal?.aborted)throw abortError();
   if(packed[0]!==31||packed[1]!==139||packed[2]!==8)throw Error('Format gzip P48 incorrect');
   const decoded=await bounded(new root.Blob([packed]).stream().pipeThrough(new root.DecompressionStream('gzip')),row.metadata.bytes,signal);
   if(await digest(decoded,crypto)!==row.metadata.sha256)throw Error('Empreinte Source JSON P48 incorrecte');if(signal?.aborted)throw abortError();
   const parsed=JSON.parse(new root.TextDecoder('utf-8',{fatal:true}).decode(decoded));
   if(parsed?.schema!=='cqc.native-wardrobe-option/1'||parsed.uid!==row.uid||parsed.id!==row.id||parsed.artAuditSHA256!==row.transport.artAuditSHA256||parsed.option?.id!==row.id||parsed.option?.family!==row.family)throw Error('Identité Source JSON P48 incorrecte');
   return decoded;
  }
  return Object.freeze({version:'p48-gzip-metadata-reader/1',handles:pin=>!!recordFor(pin),read,statistics:()=>Object.freeze({entries:known.size,rawBytes:[...known.values()].reduce((n,r)=>n+r.metadata.bytes,0),packedBytes:[...known.values()].reduce((n,r)=>n+r.transport.bytes,0)})});
 }
 return Object.freeze({create,version:'p48-gzip-metadata-transport/1',schema:SCHEMA,maxEntries:MAX_ENTRIES,initialMaxEntries:INITIAL_MAX_ENTRIES,maxRawBytes:MAX_RAW,maxPackedBytes:MAX_PACKED});
});
