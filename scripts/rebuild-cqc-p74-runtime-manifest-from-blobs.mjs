// Pure deterministic P74 reconstruction from immutable Git blob content.
// This module performs no filesystem, browser, network, branch or ref operations.
export const SOURCE_SYNC_BLOB = '88ab8285cb2c491ace6cefb8b2c20925fa96630a';
export const BASELINE_MANIFEST_BLOB = 'f76f15e2b2139bbe5414866c5a38ddc182ebda67';
export const EXPECTED_ORIGINAL_PNGS = 99;
export const REQUIRED = Object.freeze([
  'index.html', 'modules/unified-versus-v055.html', 'src/cqc-pass8-combat-engine.js',
  'src/cqc-p74-tag-team.js', 'src/cqc-p74-team-controls.js',
  'data/cqc-p63-source-atlas.json', 'data/veilbreak-content.json',
  'originals/veilbreak/index.html'
]);
const OPTIONAL = new Set(['modules/arcade-chronicles-v055.html']);
const TEXT_EXTENSIONS = new Set(['.html', '.js', '.css', '.json']);
const compare = (a, b) => a.localeCompare(b, 'en');
const clone = value => JSON.parse(JSON.stringify(value));
const pairKey = row => row.from + '\0' + row.to;

export function utf8(text) {
  if (typeof text !== 'string') throw Error('Exact string content required');
  const out = [];
  for (let i = 0; i < text.length; i++) {
    let code = text.charCodeAt(i);
    if (code >= 0xd800 && code <= 0xdbff) {
      const low = text.charCodeAt(i + 1);
      if (low >= 0xdc00 && low <= 0xdfff) { code = 0x10000 + ((code - 0xd800) << 10) + low - 0xdc00; i++; }
      else code = 0xfffd;
    } else if (code >= 0xdc00 && code <= 0xdfff) code = 0xfffd;
    if (code < 0x80) out.push(code);
    else if (code < 0x800) out.push(0xc0 | (code >>> 6), 0x80 | (code & 63));
    else if (code < 0x10000) out.push(0xe0 | (code >>> 12), 0x80 | ((code >>> 6) & 63), 0x80 | (code & 63));
    else out.push(0xf0 | (code >>> 18), 0x80 | ((code >>> 12) & 63), 0x80 | ((code >>> 6) & 63), 0x80 | (code & 63));
  }
  return Uint8Array.from(out);
}
function padded(bytes) {
  const size = Math.ceil((bytes.length + 9) / 64) * 64;
  const out = new Uint8Array(size); out.set(bytes); out[bytes.length] = 128;
  const view = new DataView(out.buffer);
  view.setUint32(size - 8, Math.floor(bytes.length / 0x20000000), false);
  view.setUint32(size - 4, (bytes.length * 8) >>> 0, false);
  return view;
}
const hex32 = value => (value >>> 0).toString(16).padStart(8, '0');
export function sha256(bytes) {
  const K = [
    0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,
    0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,
    0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,
    0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,
    0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,
    0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,
    0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,
    0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2
  ];
  const h = [0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19];
  const w = new Uint32Array(64), view = padded(bytes);
  const rotr = (x, n) => (x >>> n) | (x << (32 - n));
  for (let off = 0; off < view.byteLength; off += 64) {
    for (let i = 0; i < 16; i++) w[i] = view.getUint32(off + 4 * i, false);
    for (let i = 16; i < 64; i++) {
      const x = w[i - 15], y = w[i - 2];
      w[i] = (w[i - 16] + (rotr(x, 7) ^ rotr(x, 18) ^ (x >>> 3)) + w[i - 7] + (rotr(y, 17) ^ rotr(y, 19) ^ (y >>> 10))) >>> 0;
    }
    let [a,b,c,d,e,f,g,hh] = h;
    for (let i = 0; i < 64; i++) {
      const t1 = (hh + (rotr(e,6)^rotr(e,11)^rotr(e,25)) + ((e & f) ^ (~e & g)) + K[i] + w[i]) >>> 0;
      const t2 = ((rotr(a,2)^rotr(a,13)^rotr(a,22)) + ((a & b) ^ (a & c) ^ (b & c))) >>> 0;
      hh=g;g=f;f=e;e=(d+t1)>>>0;d=c;c=b;b=a;a=(t1+t2)>>>0;
    }
    const state=[a,b,c,d,e,f,g,hh]; for(let i=0;i<8;i++)h[i]=(h[i]+state[i])>>>0;
  }
  return h.map(hex32).join('');
}
export function sha1(bytes) {
  const h=[0x67452301,0xefcdab89,0x98badcfe,0x10325476,0xc3d2e1f0], w=new Uint32Array(80), view=padded(bytes);
  const rotl=(x,n)=>(x<<n)|(x>>>(32-n));
  for(let off=0;off<view.byteLength;off+=64){
    for(let i=0;i<16;i++)w[i]=view.getUint32(off+4*i,false);
    for(let i=16;i<80;i++)w[i]=rotl(w[i-3]^w[i-8]^w[i-14]^w[i-16],1);
    let[a,b,c,d,e]=h;
    for(let i=0;i<80;i++){
      const f=i<20?(b&c)|(~b&d):i<40?b^c^d:i<60?(b&c)|(b&d)|(c&d):b^c^d;
      const k=i<20?0x5a827999:i<40?0x6ed9eba1:i<60?0x8f1bbcdc:0xca62c1d6;
      const t=(rotl(a,5)+f+e+k+w[i])>>>0;e=d;d=c;c=rotl(b,30);b=a;a=t;
    }
    const state=[a,b,c,d,e];for(let i=0;i<5;i++)h[i]=(h[i]+state[i])>>>0;
  }
  return h.map(hex32).join('');
}
export function gitBlobSHA(bytes) {
  const header=utf8('blob '+bytes.length+'\0'), combined=new Uint8Array(header.length+bytes.length);
  combined.set(header);combined.set(bytes,header.length);return sha1(combined);
}
export function decodeBase64(value) {
  if(typeof value!=='string'||value.length%4||!/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(value))throw Error('Strict base64 required');
  const alphabet='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/', out=[];
  for(let i=0;i<value.length;i+=4){
    const a=alphabet.indexOf(value[i]),b=alphabet.indexOf(value[i+1]),c=alphabet.indexOf(value[i+2]),d=alphabet.indexOf(value[i+3]);
    out.push((a<<2)|(b>>>4));if(value[i+2]!=='=')out.push(((b&15)<<4)|(c>>>2));if(value[i+3]!=='=')out.push(((c&3)<<6)|d);
  }
  return Uint8Array.from(out);
}
export const posix = Object.freeze({
  normalize(value){
    if(typeof value!=='string')throw Error('Path string required');
    if(!value)return '.';
    const absolute=value.startsWith('/'), trailing=value.endsWith('/'), parts=[];
    for(const part of value.split('/')){
      if(!part||part==='.')continue;
      if(part==='..'){if(parts.length&&parts[parts.length-1]!=='..')parts.pop();else if(!absolute)parts.push('..');}
      else parts.push(part);
    }
    let out=(absolute?'/':'')+parts.join('/');
    if(!out)out=absolute?'/':'.';
    if(trailing&&out!=='/')out+='/';
    return out;
  },
  isAbsolute(value){return value.startsWith('/');},
  join(...parts){return posix.normalize(parts.filter(Boolean).join('/'));},
  dirname(value){
    if(!value)return '.';
    const absolute=value.startsWith('/');let end=-1,matchedSlash=true;
    for(let i=value.length-1;i>=1;i--){if(value[i]==='/'){if(!matchedSlash){end=i;break;}}else matchedSlash=false;}
    if(end===-1)return absolute?'/':'.';if(absolute&&end===1)return '//';return value.slice(0,end);
  },
  basename(value){const trimmed=value.replace(/\/+$/,'');return trimmed.slice(trimmed.lastIndexOf('/')+1);},
  extname(value){
    const base=posix.basename(value), dot=base.lastIndexOf('.');
    return dot<=0||base==='..'?'':base.slice(dot);
  }
});
function assertRelative(value){
  if(typeof value!=='string'||!value||value.includes('\\')||value.includes('\0')||posix.isAbsolute(value)
    ||posix.normalize(value)!==value||value.split('/').some(part=>!part||part==='.'||part==='..'))throw Error('Invalid relative runtime path: '+String(value));
  return value;
}
export function createDiscovery(syncSource, expectedBlob=SOURCE_SYNC_BLOB){
  if(gitBlobSHA(utf8(syncSource))!==expectedBlob)throw Error('Synchronizer source Git blob mismatch');
  const take=(start,end)=>{
    const a=syncSource.indexOf(start),b=syncSource.indexOf(end,a);
    if(a<0||b<=a)throw Error('Expected synchronizer source section missing');return syncSource.slice(a,b).trim();
  };
  const constants=take("const textExtensions = new Set(", "\nconst sha256 =");
  const runtime=take("export function isRuntimePath(", "\nasync function fileInventory");
  const discovery=take("export function discoverReferences(", "\n// Explicit immutable routes");
  const pinStart=syncSource.indexOf('const p48LocalRuntimePins=new Map(');
  const pinEnd=syncSource.indexOf(';\n',pinStart);
  if(pinStart<0||pinEnd<0)throw Error('Pinned P48 runtime names missing');
  const pins=syncSource.slice(pinStart,pinEnd)+';';
  const factory=new Function('path',constants+'\n'+pins+'\n'+runtime.replace(/^export /,'')+'\n'+discovery.replace(/^export /,'')+'\nreturn {isRuntimePath,discoverReferences};');
  return {...factory({posix}),sourceGitBlob:expectedBlob,
    extractedSectionsSHA256:sha256(utf8(constants+'\n'+pins+'\n'+runtime+'\n'+discovery))};
}
function reachable(entry,refs){
  const next=new Map(),seen=new Set([entry]),queue=[entry];
  for(const r of refs){if(!next.has(r.from))next.set(r.from,[]);next.get(r.from).push(r.to);}
  for(let i=0;i<queue.length;i++)for(const target of next.get(queue[i])||[])if(!seen.has(target)){seen.add(target);queue.push(target);}
  return seen;
}
function validateManifest(manifest,isRuntimePath){
  if(manifest?.schema!=='shadow-codec-ops.cqc-runtime/1'||manifest.entry!=='index.html'
    ||!Array.isArray(manifest.files)||!Array.isArray(manifest.references)||!Array.isArray(manifest.omittedReferences))throw Error('Invalid baseline structure');
  const files=new Map();let bytes=0;const pairs=new Set();
  for(const row of manifest.files){
    assertRelative(row?.path);
    if(!isRuntimePath(row.path)||row.path==='runtime-manifest.json'||files.has(row.path)||!Number.isSafeInteger(row.bytes)||row.bytes<0||!/^[a-f0-9]{64}$/.test(row.sha256))throw Error('Invalid/duplicate file row: '+row.path);
    files.set(row.path,row);bytes+=row.bytes;
  }
  if(!files.has(manifest.entry)||!Number.isSafeInteger(bytes)||bytes!==manifest.totalBytes)throw Error('Baseline total/entry mismatch');
  for(const row of manifest.references){
    if(!row||!files.has(row.from)||!files.has(row.to)||pairs.has(pairKey(row)))throw Error('Invalid/duplicate reference');
    pairs.add(pairKey(row));
  }
  for(const row of manifest.omittedReferences)if(!row||!files.has(row.from)||typeof row.to!=='string')throw Error('Invalid omission');
  if(manifest.externalReferences!==undefined&&(!manifest.externalReferences||!Array.isArray(manifest.externalReferences.entries)))throw Error('Invalid inherited external ledger');
  for(const row of manifest.externalReferences?.entries||[]){
    assertRelative(row?.from);assertRelative(row?.to);if(!files.has(row.from)||files.has(row.to))throw Error('Invalid external owner/alias');
  }
  return files;
}
export function reconstructP74({
  baselineText,baselineGitBlobSha=BASELINE_MANIFEST_BLOB,syncSource,records,
  expectedOriginalPngs=EXPECTED_ORIGINAL_PNGS,expectedCanonicalPngs=3,requireFullP74Scope=true
}={}){
  if(gitBlobSHA(utf8(baselineText))!==baselineGitBlobSha)throw Error('Historical manifest Git blob mismatch');
  const original=JSON.parse(baselineText),{isRuntimePath,discoverReferences,sourceGitBlob,extractedSectionsSHA256}=createDiscovery(syncSource);
  const historical=validateManifest(original,isRuntimePath);
  if(!Array.isArray(records)||!records.length)throw Error('Selected immutable records required');
  const selected=[...records].sort((a,b)=>compare(a.path,b.path)),selectedSet=new Set();
  const protectedNames=new Set((original.externalReferences?.entries||[]).flatMap(row=>[row.from,row.to]));
  for(const row of selected){
    assertRelative(row.path);
    if(selectedSet.has(row.path))throw Error('Duplicate selected path: '+row.path);
    selectedSet.add(row.path);
    if(!isRuntimePath(row.path)||!(REQUIRED.includes(row.path)||OPTIONAL.has(row.path)||row.path.startsWith('originals/veilbreak/')||row.path.startsWith('assets/canon-pass74/')))throw Error('Outside P74 scope: '+row.path);
    if(protectedNames.has(row.path))throw Error('Protected external owner/alias: '+row.path);
  }
  if(requireFullP74Scope)for(const name of REQUIRED)if(!selectedSet.has(name))throw Error('Required P74 record missing: '+name);
  const originalPngs=selected.filter(row=>row.path.startsWith('originals/veilbreak/')&&row.path.endsWith('.png'));
  const canonicalPngs=selected.filter(row=>row.path.startsWith('assets/canon-pass74/')&&row.path.endsWith('.png'));
  if(!Number.isSafeInteger(expectedOriginalPngs)||expectedOriginalPngs<0||originalPngs.length!==expectedOriginalPngs)throw Error('Original PNG count differs: expected '+expectedOriginalPngs+', found '+originalPngs.length);
  if(!Number.isSafeInteger(expectedCanonicalPngs)||expectedCanonicalPngs<0||canonicalPngs.length!==expectedCanonicalPngs)throw Error('Canonical PNG count differs: expected '+expectedCanonicalPngs+', found '+canonicalPngs.length);
  const available=new Set([...historical.keys(),...selectedSet]),refresh=new Map(),textOwners=new Set(),refs=[],omissions=[];
  const newFiles=[],changedFiles=[],unchangedFiles=[],directByteChecks=[],attestedBinaryChecks=[],sourcePins=[];
  for(const row of selected){
    const {path:name}=row;
    if(!Number.isSafeInteger(row.bytes)||row.bytes<=0||!/^[a-f0-9]{64}$/.test(row.sha256)||!/^[a-f0-9]{40}$/.test(row.gitBlobSha))throw Error('Invalid selected byte metadata: '+name);
    const isText=TEXT_EXTENSIONS.has(posix.extname(name));let actual=null;
    if(isText){
      if(typeof row.text!=='string')throw Error('Exact text absent: '+name);actual=utf8(row.text);
      if(name.endsWith('.json')){try{JSON.parse(row.text);}catch{throw Error('Invalid selected JSON: '+name);}}
    }else if(typeof row.base64==='string')actual=decodeBase64(row.base64);
    else {
      if(!['bytes-hashed-before-executor-loss','bytes-hashed-from-retained-generation-output'].includes(row.evidence?.kind)||typeof row.evidence?.producer!=='string'||!row.evidence.producer||typeof row.evidence?.source!=='string'||!row.evidence.source)throw Error('Unverified binary metadata provenance: '+name);
      attestedBinaryChecks.push({path:name,gitBlobSha:row.gitBlobSha,sha256:row.sha256,bytes:row.bytes,evidence:clone(row.evidence)});
    }
    if(actual){
      if(actual.length!==row.bytes||sha256(actual)!==row.sha256||gitBlobSHA(actual)!==row.gitBlobSha)throw Error('Selected immutable bytes mismatch: '+name);
      if(name.endsWith('.png')){
        const signature=[137,80,78,71,13,10,26,10],end=[0,0,0,0,73,69,78,68,174,66,96,130];
        const view=new DataView(actual.buffer,actual.byteOffset,actual.byteLength);
        if(actual.length<45||signature.some((x,i)=>actual[i]!==x)||String.fromCharCode(...actual.slice(12,16))!=='IHDR'||!view.getUint32(16,false)||!view.getUint32(20,false)||end.some((x,i)=>actual[actual.length-12+i]!==x))throw Error('Invalid PNG header/trailer: '+name);
      }
      directByteChecks.push(name);
    }
    sourcePins.push({path:name,gitBlobSha:row.gitBlobSha,sha256:row.sha256,bytes:row.bytes});
    const previous=historical.get(name);
    if(previous&&(previous.sourceSha256||previous.transformation)&&(previous.sha256!==row.sha256||previous.bytes!==row.bytes))throw Error('Transformed historical entry requires original workflow: '+name);
    refresh.set(name,{...(previous||{path:name}),bytes:row.bytes,sha256:row.sha256});
    if(!previous)newFiles.push(name);else if(previous.sha256!==row.sha256||previous.bytes!==row.bytes)changedFiles.push(name);else unchangedFiles.push(name);
    if(!isText)continue;
    textOwners.add(name);
    const found=discoverReferences(row.text,name,available);
    for(const to of found.references)refs.push({from:name,to});
    for(const to of found.omittedReferences){
      if(isRuntimePath(to))throw Error('Unresolved affected runtime reference: '+name+' -> '+to);
      omissions.push({from:name,to});
    }
  }
  const next=clone(original);
  next.files=original.files.map(row=>refresh.get(row.path)||clone(row));
  for(const name of newFiles)next.files.push(refresh.get(name));
  const sortRefs=rows=>rows.sort((a,b)=>compare(a.from+':'+a.to,b.from+':'+b.to));
  next.references=[...original.references.filter(row=>!textOwners.has(row.from)).map(clone),...sortRefs(refs)];
  next.omittedReferences=[...original.omittedReferences.filter(row=>!textOwners.has(row.from)).map(clone),...sortRefs(omissions)];
  next.totalBytes=next.files.reduce((sum,row)=>sum+row.bytes,0);
  validateManifest(next,isRuntimePath);
  if(JSON.stringify(next.externalReferences)!==JSON.stringify(original.externalReferences))throw Error('External ledger changed');
  const before=reachable(original.entry,original.references),after=reachable(next.entry,next.references);
  const lost=[...before].filter(name=>!after.has(name)),unreachable=[...selectedSet].filter(name=>!after.has(name));
  if(lost.length)throw Error('Historical reachability lost: '+lost.slice(0,12).join(', '));
  if(unreachable.length)throw Error('Selected file unreachable: '+unreachable.slice(0,12).join(', '));
  const text=JSON.stringify(next,null,2)+'\n',bytes=utf8(text);
  const untouched=original.files.filter(row=>!selectedSet.has(row.path));
  const inheritedTargets=[...new Set(refs.map(row=>row.to).filter(name=>!selectedSet.has(name)))].sort(compare);
  const externalBytes=original.externalReferences===undefined?null:utf8(JSON.stringify(original.externalReferences));
  return {manifest:next,text,bytes:bytes.length,sha256:sha256(bytes),gitBlobSha:gitBlobSHA(bytes),report:{
    schema:'cqc.p74.blob-reconstruction-report.v1',result:'immutable_blob_scope_reconstructed',
    scope:'P74 selected blob records and affected declared graph only',
    fullRuntimeValidated:false,fullRuntimeFileAuditPerformed:false,checkoutFilesRead:false,
    nodeUpdater99Executed:false,browserValidationPerformed:false,gameplayValidationPerformed:false,
    externalPolicyRevalidated:false,externalPolicyPreserved:true,
    externalPolicySHA256:externalBytes?sha256(externalBytes):null,
    externalRouteCountPreserved:(original.externalReferences?.entries||[]).length,
    manifestWrittenToCheckout:false,branchOrRefUpdated:false,
    baselineManifestGitBlob:baselineGitBlobSha,baselineManifestSHA256:sha256(utf8(baselineText)),
    discoverySourceGitBlob:sourceGitBlob,discoveryExtractedSectionsSHA256:extractedSectionsSHA256,
    discoveryFunction:'scripts/sync-cqc-runtime.mjs#discoverReferences',
    selectedPaths:[...selectedSet],sourcePins,directByteChecks,attestedBinaryChecks,
    binaryHashesRecomputedInThisRun:directByteChecks.filter(name=>!TEXT_EXTENSIONS.has(posix.extname(name))).length,
    pngPixelDecodePerformed:false,originalPngCount:originalPngs.length,canonicalPngCount:canonicalPngs.length,
    expectedOriginalPngs,expectedCanonicalPngs,newFiles,changedFiles,unchangedFiles,
    affectedTextOwners:[...textOwners],affectedReferenceCount:refs.length,affectedNonRuntimeOmissionCount:omissions.length,
    historicalFilesNotRead:untouched.length,historicalBytesNotRead:untouched.reduce((sum,row)=>sum+row.bytes,0),
    inheritedReferenceTargetsNotRead:inheritedTargets,allSelectedFilesDeclaredReachable:true,historicalDeclaredReachabilityPreserved:true,
    declaredReachableFilesBefore:before.size,declaredReachableFilesAfter:after.size,
    fileCountBefore:original.files.length,fileCountAfter:next.files.length,totalBytesBefore:original.totalBytes,totalBytesAfter:next.totalBytes,
    byteDelta:next.totalBytes-original.totalBytes,
    meaning:'Selected exact text bytes are rehashed. Binary attestations are listed separately and not recertified. Historical declarations and external routes are inherited unchanged. No complete runtime or final browser acceptance is claimed.'
  }};
}
