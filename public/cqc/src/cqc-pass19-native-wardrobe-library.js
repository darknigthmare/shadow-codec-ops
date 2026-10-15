/* Byte-verified lazy native wardrobe. No requested or unfinished art appears in its index. */
(function(root,factory){'use strict';const api=factory(root);if(typeof module==='object'&&module.exports)module.exports=api;root.CQC_NATIVE_WARDROBE_LIBRARY=api;if(root.CQC_PASS19_COSTUMES&&root.CQC_COMBAT_SPRITES&&!root.CQC_NATIVE_WARDROBE)root.CQC_NATIVE_WARDROBE=api.create({index:root.CQC_NATIVE_WARDROBE_INDEX});})(globalThis,function(defaultRoot){
 'use strict';
 const idPattern=/^[a-z0-9_-]+$/,uidPattern=/^[a-z0-9]+__[a-z0-9_]+$/,shaPattern=/^[a-f0-9]{64}$/;
 const kinds=new Set(['canonical-game-costume','original-character-costume','style-reinterpretation','historical-incarnation','body-transformation','official-remake-appearance']);
 const families=new Set(['canonical','retro','nextgen','cyborg','survive','metalgear','tuxedo']);
 const clone=value=>JSON.parse(JSON.stringify(value)),key=(uid,id)=>uid+':'+id;
 function canonical(value){return JSON.stringify(value,(_key,item)=>item&&typeof item==='object'&&!Array.isArray(item)?Object.fromEntries(Object.keys(item).sort().map(name=>[name,item[name]])):item);}
 function abortError(){return Object.assign(new Error('Liaison annulée'),{name:'AbortError'});}
 function create(config={}){
  const root=config.root||defaultRoot,wardrobe=config.wardrobe||root.CQC_PASS19_COSTUMES,choices=config.choices||root.CQC_COSTUMES_PASS17,renderer=config.renderer||root.CQC_COMBAT_SPRITES;
  if(!wardrobe||!choices||!renderer)throw Error('Vestiaire natif indisponible');
  const originals={renderer:{...renderer},select:choices.select},undo=[];
  const raw=Object.fromEntries(Object.entries(renderer).filter(([,value])=>typeof value==='function').map(([name,value])=>[name,value.bind(renderer)]));
  const fetcher=config.fetch||root.fetch?.bind(root),crypto=config.crypto||root.crypto,baseURL=new URL(config.baseURL||new URL('../',root.document?.currentScript?.src||root.document?.baseURI||'http://localhost/cqc/src/').href);
  const maxEntries=config.maxEntries||8,maxMetadataBytes=config.maxMetadataBytes||8*1024*1024,maxAssetBytes=config.maxAssetBytes||32*1024*1024,maxBlobBytes=config.maxBlobBytes||64*1024*1024;
  const descriptors=new Map(),records=new Map(),routes=new Map(),assets=new Map(),listeners=new Set(),pendingSlots=[null,null],slotValues=[null,null],activeKeys=new Set(),preparations=new Map();
  const previousSelect=choices.select.bind(choices),previousChosen=choices.chosen.bind(choices),journal=[Object.create(null),Object.create(null)],assetQueue=[];
  let activeFighters=[];
  let index={schema:'cqc.native-wardrobe-index/1',entries:[]},tick=0,assetLoads=0,serial=0,hooks={},disposed=false,OriginalImage=null,RoutedImage=null;
  const storageKey='cqc-native-wardrobe-journal-v1';
  try{const saved=JSON.parse(root.localStorage?.getItem(storageKey)||'null');for(let slot=0;slot<2;slot++)if(saved?.slots?.[slot]&&typeof saved.slots[slot]==='object')Object.assign(journal[slot],saved.slots[slot]);const legacy=JSON.parse(root.localStorage?.getItem('cqc-v056-costumes')||'null');for(let slot=0;slot<2;slot++)for(const[uid,id]of Object.entries(legacy?.slots?.[slot]||{}))if(!journal[slot][uid])journal[slot][uid]={id};}catch{}
  const saveJournal=()=>{try{root.localStorage?.setItem(storageKey,JSON.stringify({schema:'cqc.native-wardrobe-journal/1',slots:journal}));}catch{}};
  function emit(event){for(const listener of listeners)try{listener(event);}catch{}try{hooks.onStatus?.(event);}catch{}}
  function allowedURL(value,type,relativeBase=baseURL){
   const url=new URL(value,relativeBase);if(url.username||url.password||url.hash||url.search)throw Error('Adresse native non admissible');
   const same=url.origin===baseURL.origin,rawHost=url.protocol==='https:'&&url.hostname==='raw.githubusercontent.com'&&/^\/[^/]+\/[^/]+\/[a-f0-9]{40}\//.test(url.pathname);
   if(!same&&!rawHost)throw Error('Source native hors origine ou commit immuable');
   if(type&&!url.pathname.toLowerCase().endsWith('.'+type))throw Error('Type de source native incorrect');
   return url.href;
  }
  function validateAsset(asset,assetBase){
   if(!asset||typeof asset.file!=='string'||!/^assets\/[A-Za-z0-9_./-]+\.png$/.test(asset.file)||asset.file.split('/').some(part=>part==='..'||part==='.')||!shaPattern.test(asset.sha256)||!Number.isInteger(asset.bytes)||asset.bytes<24||asset.bytes>maxAssetBytes||![asset.width,asset.height].every(value=>Number.isInteger(value)&&value>0&&value<=8192))throw Error('Source PNG non vérifiée');
   return{...clone(asset),url:allowedURL(asset.url||asset.file,'png',assetBase),virtualURL:new URL(asset.file,baseURL).href};
  }
  function configureIndex(value){
   if(disposed)throw Error('Vestiaire fermé');if(value?.schema!=='cqc.native-wardrobe-index/1'||!Array.isArray(value.entries)||value.entries.length>10000)throw Error('Index natif incorrect');
   const next=new Map(),blocked=[],defaultAssetBase=new URL(value.assetBaseURL||baseURL.href,baseURL),defaultMetadataBase=new URL(value.metadataBaseURL||value.assetBaseURL||baseURL.href,baseURL);
   for(const item of value.entries){
    if(!uidPattern.test(item?.uid)||!idPattern.test(item?.id)||item.id==='original'||!item.label?.trim()||!families.has(item.family)||item.sprite||item.option||item.status==='pending')throw Error('Option native non produite');
    const provenance=item.provenance,review=item.review;
    if(!kinds.has(provenance?.kind)||provenance.sourceUID!==item.uid||typeof provenance.originalDesign!=='boolean'||typeof provenance.canonicalAppearanceAttested!=='boolean'||review?.status!=='approved'||!review.reviewer||!review.reviewedAt||!shaPattern.test(review.artAuditSHA256))throw Error('Revue physique ou provenance manquante');
    if(wardrobe.appearanceAllowed?.(item.uid,item)===false){blocked.push({uid:item.uid,id:item.id,reason:wardrobe.appearanceReason?.(item.uid,item)||'separate-incarnation'});continue;}
    if(!wardrobe.selectable(item.uid,'original'))throw Error('Incarnation native absente');
    const metadata=item.metadata;if(!metadata||!shaPattern.test(metadata.sha256)||!Number.isInteger(metadata.bytes)||metadata.bytes<2||metadata.bytes>4*1024*1024)throw Error('Métadonnées non épinglées');
    if(!Array.isArray(item.assets)||!item.assets.length||item.assets.length>48)throw Error('PNG produits absents');
    const assetBase=new URL(item.assetBaseURL||defaultAssetBase.href,baseURL),pins=item.assets.map(asset=>validateAsset(asset,assetBase)),seen=new Set();for(const pin of pins){if(seen.has(pin.file))throw Error('PNG répété');seen.add(pin.file);}
    const preview=item.preview;if(!preview||!seen.has(preview.file)||!Array.isArray(preview.rect)||preview.rect.length!==4||!preview.rect.every(Number.isFinite)||preview.rect[0]<0||preview.rect[1]<0||preview.rect[2]<=0||preview.rect[3]<=0||!Array.isArray(preview.pivot)||preview.pivot.length!==2||!preview.pivot.every(number=>Number.isFinite(number)&&number>=0&&number<=1))throw Error('Aperçu non épinglé');
    const previewPin=pins.find(pin=>pin.file===preview.file);if(preview.rect[0]+preview.rect[2]>previewPin.width||preview.rect[1]+preview.rect[3]>previewPin.height)throw Error('Aperçu hors PNG');
    const desc={...clone(item),metadata:{...metadata,url:allowedURL(metadata.url||metadata.path,'json',defaultMetadataBase)},assets:pins};const entryKey=key(item.uid,item.id);
    if(next.has(entryKey))throw Error('Option native répétée');const old=records.get(entryKey);if(old&&old.descriptor.metadata.sha256!==metadata.sha256)throw Error('Identifiant de version déjà utilisé');next.set(entryKey,desc);
   }
   for(const record of records.values())if(!next.has(record.key)&&protectedKeys().has(record.key))throw Error('Tenue active retirée de l’index');
   for(const record of [...records.values()])if(!next.has(record.key)){if(record.owned)remove(record);else records.delete(record.key);}descriptors.clear();for(const[entryKey,desc]of next)descriptors.set(entryKey,desc);index=clone(value);refreshRenderer();emit({type:'index-ready'});return{entries:descriptors.size,blocked};
  }
  async function pinnedFetch(pin,{signal,type}={}){
   if(!fetcher||!crypto?.subtle)throw Error('Vérification cryptographique indisponible');if(signal?.aborted)throw abortError();
   const response=await fetcher(pin.url,{signal,mode:'cors',credentials:'omit',redirect:'error',cache:'force-cache'});if(!response.ok||response.redirected)throw Error('Source native indisponible');
   if(response.url&&allowedURL(response.url,type)!==pin.url)throw Error('Adresse source modifiée');
   let bytes;if(response.body?.getReader){const reader=response.body.getReader(),chunks=[];let count=0;try{while(true){if(signal?.aborted)throw abortError();const result=await reader.read();if(result.done)break;count+=result.value.byteLength;if(count>pin.bytes)throw Error('Taille native incorrecte');chunks.push(result.value);}if(count!==pin.bytes)throw Error('Taille native incorrecte');bytes=new Uint8Array(count);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.byteLength;}}catch(error){try{await reader.cancel();}catch{}throw error;}}
   else{bytes=new Uint8Array(await response.arrayBuffer());if(bytes.byteLength!==pin.bytes)throw Error('Taille native incorrecte');}
   const digest=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),number=>number.toString(16).padStart(2,'0')).join('');if(digest!==pin.sha256)throw Error('Empreinte native incorrecte');if(signal?.aborted)throw abortError();
   return bytes;
  }
  function subscribe(job,signal){
   if(signal?.aborted)return Promise.reject(abortError());const consumer={};job.consumers.add(consumer);
   return new Promise((resolve,reject)=>{let done=false;function cleanup(){job.consumers.delete(consumer);signal?.removeEventListener?.('abort',cancel);}function cancel(){if(done)return;done=true;cleanup();if(!job.consumers.size&&!job.settled)job.controller.abort();reject(abortError());}signal?.addEventListener?.('abort',cancel,{once:true});job.promise.then(value=>{if(done)return;done=true;cleanup();resolve(value);},error=>{if(done)return;done=true;cleanup();reject(error);});});
  }
  function pumpAssets(){while(assetLoads<3&&assetQueue.length){const job=assetQueue.shift();if(job.controller.signal.aborted){job.reject(abortError());continue;}assetLoads++;(async()=>{try{const bytes=await pinnedFetch(job.pin,{signal:job.controller.signal,type:'png'});if(bytes[0]!==137||bytes[1]!==80||bytes[2]!==78||bytes[3]!==71||bytes[12]!==73||bytes[13]!==72||bytes[14]!==68||bytes[15]!==82)throw Error('PNG natif incorrect');const view=new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength);if(view.getUint32(16)!==job.pin.width||view.getUint32(20)!==job.pin.height)throw Error('Dimensions PNG incorrectes');job.blob=new root.Blob([bytes],{type:'image/png'});job.lastUse=++tick;job.resolve(job.blob);emit({type:'asset-verified',file:job.pin.file,sha256:job.pin.sha256,bytes:job.pin.bytes,url:job.pin.url});}catch(error){job.error=error;job.reject(error);}finally{job.settled=true;assetLoads--;trimBlobs();pumpAssets();}})();}}
  function asset(pin,signal,retry=false){
   const assetKey=pin.url+':'+pin.sha256;let job=assets.get(assetKey);if(job?.controller.signal.aborted&&!job.settled||job?.error&&(retry||job.error.name==='AbortError')){assets.delete(assetKey);job=null;}
   if(job?.blob){job.lastUse=++tick;return signal?.aborted?Promise.reject(abortError()):Promise.resolve(job.blob);}
   if(!job){job={pin,controller:new AbortController(),consumers:new Set(),settled:false,promise:null,resolve:null,reject:null,blob:null,error:null,lastUse:++tick};job.promise=new Promise((resolve,reject)=>{job.resolve=resolve;job.reject=reject;});job.promise.catch(()=>{});assets.set(assetKey,job);assetQueue.push(job);queueMicrotask(pumpAssets);}
   return subscribe(job,signal);
  }
  function protectedKeys(){const result=new Set(activeKeys);for(const slot of slotValues)if(slot)result.add(slot.key);for(const request of pendingSlots)if(request)result.add(request.key);for(const preparation of preparations.values())for(const fighter of preparation.fighters)if(descriptors.has(key(fighter.uid,fighter.costume)))result.add(key(fighter.uid,fighter.costume));return result;}
  function trimBlobs(){let bytes=0;for(const job of assets.values())if(job.blob)bytes+=job.pin.bytes;if(bytes<=maxBlobBytes)return;const protectedFiles=new Set([...protectedKeys()].flatMap(entryKey=>descriptors.get(entryKey)?.assets.map(pin=>pin.url+':'+pin.sha256)||[]));for(const[assetKey,job]of [...assets].sort((a,b)=>a[1].lastUse-b[1].lastUse)){if(bytes<=maxBlobBytes)break;if(!job.blob||protectedFiles.has(assetKey)||job.consumers.size)continue;assets.delete(assetKey);bytes-=job.pin.bytes;}}
  function installImageRouting(){
   if(OriginalImage||typeof root.Image!=='function')return;OriginalImage=root.Image;
   RoutedImage=function(width,height){const image=new OriginalImage(width,height);let proto=image,native;while(proto&&!native){const descriptor=Object.getOwnPropertyDescriptor(proto,'src');if(descriptor?.set)native=descriptor;proto=Object.getPrototypeOf(proto);}if(!native)return image;
    let request='',version=0,controller=null,objectURL=null;
    function revoke(){if(objectURL){root.URL.revokeObjectURL(objectURL);objectURL=null;}}
    Object.defineProperty(image,'src',{configurable:true,get:()=>request,set(value){request=String(value);version++;const current=version;controller?.abort();revoke();let route;try{route=routes.get(new URL(request,baseURL).href);}catch{}if(!route){native.set.call(image,request);return;}controller=new AbortController();image.crossOrigin='anonymous';asset(route,controller.signal).then(blob=>{if(current!==version)return;objectURL=root.URL.createObjectURL(blob);native.set.call(image,objectURL);if(typeof image.decode==='function')Promise.resolve(image.decode()).then(()=>{if(current===version)revoke();},()=>{if(current===version)revoke();});}).catch(error=>{if(current!==version||error.name==='AbortError')return;if(typeof image.dispatchEvent==='function'&&typeof root.Event==='function')image.dispatchEvent(new root.Event('error'));else image.onerror?.({type:'error',error});});}});
    return image;
   };RoutedImage.prototype=OriginalImage.prototype;Object.setPrototypeOf(RoutedImage,OriginalImage);root.Image=RoutedImage;
  }
  function allFrames(option){return[...Object.values(option.sprite?.actions||{}),...Object.values(option.sprite?.oppositeActions||{})].flatMap(action=>action.frames||[]);}
  function checkMetadata(desc,metadata){
   if(metadata?.schema!=='cqc.native-wardrobe-option/1'||metadata.uid!==desc.uid||metadata.id!==desc.id||metadata.artAuditSHA256!==desc.review.artAuditSHA256)throw Error('Identité des métadonnées incorrecte');const option=metadata.option;
   if(option?.id!==desc.id||option.label!==desc.label||option.family!==desc.family||!option.sprite)throw Error('Tenue native incorrecte');
   for(const property of ['kind','sourceUID','originalDesign','canonicalAppearanceAttested','sourceSpriteUID'])if(desc.provenance[property]!==option.provenance?.[property])throw Error('Provenance des métadonnées modifiée');
   if(wardrobe.appearanceAllowed?.(desc.uid,option)===false)throw Error('Illustration d’une autre incarnation ou rétro dérivé refusé');
   if(option.assetReview?.status!=='verified'||option.sprite.review?.status!=='approved')throw Error('Art non approuvé');
   const referenced=new Map();for(const frame of allFrames(option)){if(referenced.has(frame.file)&&referenced.get(frame.file)!==frame.sha256)throw Error('Source contradictoire');referenced.set(frame.file,frame.sha256);}
   for(const source of Object.values(option.sprite.costumeParts?.sources||{}))referenced.set(source.file,source.sha256);
   if(referenced.size!==desc.assets.length||desc.assets.some(pin=>referenced.get(pin.file)!==pin.sha256))throw Error('Sources PNG différentes de l’index');
   for(const frame of allFrames(option)){const pin=desc.assets.find(asset=>asset.file===frame.file);if(!pin||frame.rect[0]+frame.rect[2]>pin.width||frame.rect[1]+frame.rect[3]>pin.height)throw Error('Cadre hors source native');}
   if(!allFrames(option).some(frame=>frame.file===desc.preview.file&&canonical(frame.rect)===canonical(desc.preview.rect)&&canonical(frame.pivot)===canonical(desc.preview.pivot)))throw Error('Aperçu différent du costume');
   return option;
  }
  function rendererCatalog(){const published=root.CQC_COMBAT_COSTUME_CATALOG,entries={...published.entries};for(const record of records.values())if(record.option&&record.state!=='failed'){const row=entries[record.uid]||{default:'original',options:[{id:'original',label:'Tenue d’origine'}]};if(!row.options.some(option=>option.id===record.id))entries[record.uid]={...row,options:[...row.options,record.option]};}return{...published,entries};}
  function refreshRenderer(){const result=raw.configureCostumes(rendererCatalog());if(result.rejected.length)throw Error('Catalogue natif refusé');}
  function keepDecoded(){const fighters=[...activeFighters,...(hooks.getFighters?.()||[])];for(const slot of slotValues)if(slot)fighters.push({uid:slot.uid,costume:slot.id});for(const entryKey of activeKeys){const desc=descriptors.get(entryKey);if(desc)fighters.push({uid:desc.uid,costume:desc.id});}for(const record of records.values())if(record.state==='decoding')fighters.push({uid:record.uid,costume:record.id});raw.retainFighters?.(fighters);}
  function isReady(entryKey){const record=records.get(entryKey);return record?.state==='ready'&&record.published===true&&raw.status(record.uid,{costume:record.id})?.ready===true;}
  function publish(record){if(record.published)return;const catalog=root.CQC_COMBAT_COSTUME_CATALOG,row=catalog.entries[record.uid]||{default:'original',options:[{id:'original',label:'Tenue d’origine'}]};if(row.options.some(option=>option.id===record.id))throw Error('Tenue déjà publiée avec un autre contenu');root.CQC_COMBAT_COSTUME_CATALOG={...catalog,entries:{...catalog.entries,[record.uid]:{...row,options:[...row.options,record.option]}}};record.published=true;wardrobe.installChoices();refreshRenderer();}
  async function load(record,{retry=false}={}){
   const desc=record.descriptor;record.state='fetching';emit({type:'loading',uid:record.uid,id:record.id});
   try{const bytes=await pinnedFetch(desc.metadata,{signal:record.controller.signal,type:'json'}),text=new root.TextDecoder('utf-8',{fatal:true}).decode(bytes),option=checkMetadata(desc,JSON.parse(text));if(record.controller.signal.aborted)throw abortError();
    const existing=wardrobe.optionFor(record.uid,record.id);if(existing){if(canonical(existing)!==canonical(option))throw Error('Identifiant de tenue différent du contenu épinglé');record.option=existing;record.owned=false;record.published=true;}
    else{const published=root.CQC_COMBAT_COSTUME_CATALOG;try{wardrobe.registerBatch([{uid:record.uid,option}]);record.option=wardrobe.optionFor(record.uid,record.id);record.owned=true;}finally{root.CQC_COMBAT_COSTUME_CATALOG=published;}}
    for(const pin of desc.assets){const old=routes.get(pin.virtualURL);if(old&&old.sha256!==pin.sha256)throw Error('Chemin PNG déjà utilisé pour une autre version');routes.set(pin.virtualURL,pin);}installImageRouting();
    record.state='verifying-assets';await Promise.all(desc.assets.map(pin=>asset(pin,record.controller.signal,retry)));if(record.controller.signal.aborted)throw abortError();
    record.state='decoding';refreshRenderer();keepDecoded();const ready=await raw.whenReady(record.uid,{costume:record.id,retry});if(record.controller.signal.aborted)throw abortError();refreshRenderer();if(!ready||raw.status(record.uid,{costume:record.id})?.ready!==true)throw Error('Images natives indisponibles');
    record.state='ready';record.lastUse=++tick;emit({type:'ready',uid:record.uid,id:record.id});return record;
   }catch(error){record.state=error.name==='AbortError'?'cancelled':'failed';record.error=error;emit({type:record.state,uid:record.uid,id:record.id});throw error;}finally{record.settled=true;keepDecoded();trim();}
  }
  function ensure(uid,id,options={}){
   const entryKey=key(uid,id),desc=descriptors.get(entryKey);if(disposed||!desc)return Promise.reject(Error('Tenue native absente'));
   let record=records.get(entryKey);if(record?.state==='ready'&&raw.status(uid,{costume:id})?.ready){record.lastUse=++tick;if(options.publish)publish(record);return options.signal?.aborted?Promise.reject(abortError()):Promise.resolve(record);}
   if(record?.state==='failed'&&!options.retry)return Promise.reject(record.error);
   if(!record||record.settled||record.controller.signal.aborted){record={key:entryKey,uid,id,descriptor:desc,state:'fetching',controller:new AbortController(),consumers:new Set(),settled:false,promise:null,option:record?.option||null,owned:record?.owned||false,published:record?.published||false,lastUse:++tick};records.set(entryKey,record);record.promise=load(record,options);record.promise.catch(()=>{});}
   return subscribe(record,options.signal).then(result=>{if(options.publish){records.set(entryKey,result);for(const pin of result.descriptor.assets)routes.set(pin.virtualURL,pin);publish(result);}return result;});
  }
  function cancel(slot){if(![0,1].includes(slot))return false;const request=pendingSlots[slot];if(!request)return false;pendingSlots[slot]=null;request.controller.abort();try{hooks.onBusy?.({slot,uid:request.uid,id:request.id,busy:false});}catch{}emit({type:'selection-cancelled',slot});return true;}
  async function select(slot,uid,id,{signal,retry=false}={}){
   if(![0,1].includes(slot)||!descriptors.has(key(uid,id)))return{committed:false,reason:'unavailable'};cancel(slot);
   const request={serial:++serial,key:key(uid,id),slot,uid,id,controller:new AbortController()};pendingSlots[slot]=request;const forward=()=>request.controller.abort();signal?.addEventListener?.('abort',forward,{once:true});if(signal?.aborted)forward();try{hooks.onBusy?.({slot,uid,id,busy:true});}catch{}
   try{const record=await ensure(uid,id,{signal:request.controller.signal,retry});if(pendingSlots[slot]!==request||request.controller.signal.aborted)return{committed:false,reason:'superseded'};
    const current=hooks.getFighters?.()?.[slot];if(current&&current.uid!==uid)return{committed:false,reason:'fighter-changed'};publish(record);if(!raw.status(uid,{costume:id})?.ready)throw Error('Images natives indisponibles');
    if(!previousSelect(slot,uid,id))throw Error('Emplacement indisponible');slotValues[slot]={uid,id,key:record.key};journal[slot][uid]={id,metadataSHA256:record.descriptor.metadata.sha256};saveJournal();keepDecoded();emit({type:'selection-committed',slot,uid,id});try{hooks.onCommit?.({slot,uid,id,fighter:{...(current||{uid}),costume:id}});}catch{}return{committed:true,slot,uid,id};
   }catch(error){if(error.name==='AbortError')return{committed:false,reason:'cancelled'};try{hooks.onError?.({slot,uid,id,error});}catch{}return{committed:false,reason:'failed',error:error.message};}
   finally{signal?.removeEventListener?.('abort',forward);if(pendingSlots[slot]===request){pendingSlots[slot]=null;try{hooks.onBusy?.({slot,uid,id,busy:false});}catch{}}trim();}
  }
  function cancelPreparation(owner='match'){const request=preparations.get(owner);if(!request)return false;preparations.delete(owner);request.controller.abort();wardrobe.cancel?.(owner);return true;}
  async function prepareSlots(fighters,options={}){if(!Array.isArray(fighters)||fighters.length!==2)throw Error('Deux emplacements de combat requis');fighters=fighters.map(fighter=>descriptors.has(key(fighter.uid,fighter.costume))?{...fighter}:wardrobe.fighterFor(fighter,0,fighter.costume||'original'));const owner=options.owner||'match';cancelPreparation(owner);const request={fighters:fighters.map(fighter=>({...fighter})),controller:new AbortController()};preparations.set(owner,request);const forward=()=>request.controller.abort();options.signal?.addEventListener?.('abort',forward,{once:true});if(options.signal?.aborted)forward();try{await Promise.all(fighters.map(fighter=>descriptors.has(key(fighter.uid,fighter.costume))?ensure(fighter.uid,fighter.costume,{signal:request.controller.signal,retry:options.retry,publish:true}):Promise.resolve()));if(preparations.get(owner)!==request||request.controller.signal.aborted)return{ready:false,reason:'cancelled',fighters:[]};const result=await wardrobe.prepareSlots(fighters,{...options,signal:request.controller.signal});if(preparations.get(owner)!==request||request.controller.signal.aborted)return{ready:false,reason:'cancelled',fighters:[]};if(result.ready)setActiveFighters(result.fighters);return result;}catch(error){return{ready:false,reason:error.name==='AbortError'?'cancelled':'unavailable-costume',error:error.name==='AbortError'?undefined:error.message,fighters:[]};}finally{options.signal?.removeEventListener?.('abort',forward);if(preparations.get(owner)===request)preparations.delete(owner);trim();}}
  function remove(record){if(!record.owned)return;const catalog=root.CQC_COMBAT_COSTUME_CATALOG,row=catalog.entries[record.uid];if(row&&record.published)root.CQC_COMBAT_COSTUME_CATALOG={...catalog,entries:{...catalog.entries,[record.uid]:{...row,options:row.options.filter(option=>option.id!==record.id)}}};records.delete(record.key);record.published=false;for(const pin of record.descriptor.assets)if(![...records.values()].some(other=>other.descriptor.assets.some(asset=>asset.virtualURL===pin.virtualURL)))routes.delete(pin.virtualURL);}
  function trim(){const protection=protectedKeys();let owned=[...records.values()].filter(record=>record.owned),bytes=owned.reduce((sum,record)=>sum+record.descriptor.metadata.bytes,0),changed=false;for(const record of owned.sort((a,b)=>a.lastUse-b.lastUse)){if(owned.length<=maxEntries&&bytes<=maxMetadataBytes)break;if(protection.has(record.key)||!record.settled||record.consumers.size)continue;remove(record);owned=owned.filter(item=>item!==record);bytes-=record.descriptor.metadata.bytes;changed=true;}if(changed)refreshRenderer();trimBlobs();}
  function setActiveFighters(fighters=[]){activeFighters=fighters.map(fighter=>({...fighter}));activeKeys.clear();for(const fighter of fighters)if(fighter?.costume&&descriptors.has(key(fighter.uid,fighter.costume)))activeKeys.add(key(fighter.uid,fighter.costume));for(let slot=0;slot<2;slot++)if(fighters[slot]&&slotValues[slot]&&key(fighters[slot].uid,fighters[slot].costume||'original')!==slotValues[slot].key)slotValues[slot]=null;keepDecoded();trim();}
  async function restoreSlots(fighters){return Promise.all((fighters||[]).slice(0,2).map((fighter,slot)=>{const saved=journal[slot][fighter.uid],desc=saved&&descriptors.get(key(fighter.uid,saved.id));if(!desc||saved.metadataSHA256&&saved.metadataSHA256!==desc.metadata.sha256)return{committed:false,reason:'no-pinned-preference'};return select(slot,fighter.uid,saved.id);}));}
  function availableFor(uid){return[...descriptors.values()].filter(desc=>desc.uid===uid).map(desc=>({uid:desc.uid,id:desc.id,label:desc.label,family:desc.family,provenance:clone(desc.provenance),preview:clone(desc.preview),ready:isReady(key(uid,desc.id))}));}
  async function preview(uid,id,{signal}={}){const desc=descriptors.get(key(uid,id));if(!desc)throw Error('Tenue native absente');const pin=desc.assets.find(asset=>asset.file===desc.preview.file),blob=await asset(pin,signal);return{blob,frame:clone(desc.preview),source:{url:pin.url,bytes:pin.bytes,sha256:pin.sha256,width:pin.width,height:pin.height}};}
  // Decoded previews may use owned metadata before it is published to choices.
  // The active renderer guards below still require an explicitly published record.
  function drawPreview(context,fighter,box,face,pose={}){
   const entryKey=key(fighter?.uid,fighter?.costume),desc=descriptors.get(entryKey),record=records.get(entryKey);
   if(disposed||!desc||record?.state!=='ready'||record.descriptor.metadata.sha256!==desc.metadata.sha256||raw.status(record.uid,{costume:record.id})?.ready!==true)return false;
   return raw.drawFitted(context,fighter,box,face,pose);
  }
  function state(uid,id){const record=records.get(key(uid,id));return{known:descriptors.has(key(uid,id)),state:record?.state||'dormant',ready:isReady(key(uid,id)),published:record?.published===true,error:record?.error?.message||null};}
  function replace(target,name,wrapper){const original=target[name];target[name]=wrapper;undo.push(()=>{if(target[name]===wrapper)target[name]=original;});}
  const guarded=(uid,options)=>descriptors.has(key(uid,options?.costume));
  renderer.getEntry=function(uid,options={}){return guarded(uid,options)&&!isReady(key(uid,options.costume))?null:raw.getEntry(uid,options);};
  renderer.has=function(uid,options={}){return guarded(uid,options)?true:raw.has(uid,options);};
  renderer.status=function(uid,options={}){if(!guarded(uid,options))return raw.status(uid,options);const record=records.get(key(uid,options.costume));if(isReady(key(uid,options.costume)))return raw.status(uid,options);return{uid,renderer:'png',coverage:'reviewed-lazy-native',ready:false,states:[record?.state==='failed'?'failed':'loading'],limits:['Tenue native vérifiée avant son application.']};};
  renderer.draw=function(context,fighter,...args){return guarded(fighter?.uid,fighter)&&!isReady(key(fighter.uid,fighter.costume))?false:raw.draw(context,fighter,...args);};
  renderer.drawFitted=function(context,fighter,...args){return guarded(fighter?.uid,fighter)&&!isReady(key(fighter.uid,fighter.costume))?false:raw.drawFitted(context,fighter,...args);};
  renderer.whenReady=function(uid,options={}){return guarded(uid,options)?ensure(uid,options.costume,{retry:options.retry,publish:true}).then(()=>isReady(key(uid,options.costume)),()=>false):raw.whenReady(uid,options);};
  renderer.preload=function(uid,options={}){if(!guarded(uid,options))return raw.preload(uid,options);ensure(uid,options.costume,{publish:true}).catch(()=>{});return true;};
  choices.select=function(slot,uid,id){if(descriptors.has(key(uid,id))&&!isReady(key(uid,id)))return false;cancel(slot);const selected=previousSelect(slot,uid,id);if(selected){if(descriptors.has(key(uid,id))){slotValues[slot]={uid,id,key:key(uid,id)};journal[slot][uid]={id,metadataSHA256:descriptors.get(key(uid,id)).metadata.sha256};}else{slotValues[slot]=null;delete journal[slot][uid];}saveJournal();keepDecoded();trim();}return selected;};
  // Source engines should treat an unready lazy native costume as handled, never draw its old body.
  const machine=root.CQC_PASS18_MACHINES;if(machine){for(const name of ['has','hasComposite'])if(typeof machine[name]==='function'){const original=machine[name].bind(machine);replace(machine,name,function(value,...args){return typeof value==='object'&&guarded(value.uid,value)?false:original(value,...args);});}if(typeof machine.drawPlayable==='function'){const original=machine.drawPlayable.bind(machine);replace(machine,'drawPlayable',function(context,fighter,...args){return guarded(fighter?.uid,fighter)?false:original(context,fighter,...args);});}if(typeof machine.drawCoreMachine==='function'){const original=machine.drawCoreMachine.bind(machine);replace(machine,'drawCoreMachine',function(context,actor,...args){return guarded(actor?.uid||'core__'+actor?.id,actor)?false:original(context,actor,...args);});}}
  const core=root.CQC_PASS17_CORE_COSTUMES;if(core)for(const name of ['drawActor','drawFighter'])if(typeof core[name]==='function'){const original=core[name].bind(core);replace(core,name,function(context,actor,...args){return guarded(actor?.uid||'core__'+actor?.id,actor)&&!isReady(key(actor.uid||'core__'+actor.id,actor.costume))?true:original(context,actor,...args);});}
  for(const name of ['getEntry','has','status','draw','drawFitted','whenReady','preload']){const wrapper=renderer[name];undo.push(()=>{if(renderer[name]===wrapper)renderer[name]=originals.renderer[name];});}const guardedSelect=choices.select;undo.push(()=>{if(choices.select===guardedSelect)choices.select=originals.select;});
  if(config.index)configureIndex(config.index);
  return{version:'native-wardrobe-library/1',configureIndex,availableFor,known:(uid,id)=>descriptors.has(key(uid,id)),state,ensure,select,cancel,prepareSlots,cancelPreparation,preview,drawPreview,setActiveFighters,restoreSlots,bindSlots:value=>(hooks=value||{}),on:listener=>(listeners.add(listener),()=>listeners.delete(listener)),statistics:()=>({indexEntries:descriptors.size,loadedMetadata:records.size,ownedMetadata:[...records.values()].filter(record=>record.owned).length,metadataBytes:[...records.values()].filter(record=>record.option).reduce((sum,record)=>sum+record.descriptor.metadata.bytes,0),assetLoads,verifiedAssets:[...assets.values()].filter(asset=>asset.blob).length,protected:[...protectedKeys()],pendingSlots:pendingSlots.map(request=>request?{uid:request.uid,id:request.id}:null)}),dispose(){disposed=true;cancel(0);cancel(1);for(const owner of [...preparations.keys()])cancelPreparation(owner);for(const record of records.values())if(!record.settled)record.controller.abort();for(const job of assets.values())if(!job.settled)job.controller.abort();listeners.clear();for(const restore of undo.reverse())restore();if(root.Image===RoutedImage)root.Image=OriginalImage;}};
 }
 return{create,version:'native-wardrobe-library-factory/1'};
});
