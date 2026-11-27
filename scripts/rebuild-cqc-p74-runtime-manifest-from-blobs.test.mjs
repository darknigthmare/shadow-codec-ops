// Pure tests: run runBlobReconstructionTests(libraryExports, exactSyncSource).
// No filesystem or browser evidence is produced by these tests.
export function runBlobReconstructionTests(lib,syncSource){
  const {utf8,sha256,sha1,gitBlobSHA,decodeBase64,posix,createDiscovery,reconstructP74}=lib;
  const results=[];
  const equal=(a,b,message='different')=>{if(JSON.stringify(a)!==JSON.stringify(b))throw Error(message+': '+JSON.stringify(a)+' != '+JSON.stringify(b));};
  const ok=(value,message='assertion failed')=>{if(!value)throw Error(message);};
  const raises=(fn,pattern)=>{let error;try{fn();}catch(e){error=e;}if(!error||!pattern.test(error.message))throw Error('Expected '+pattern+', received '+(error?.message||'success'));};
  const run=(name,fn)=>{fn();results.push({name,passed:true});};
  const encode64=bytes=>{const abc='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';let out='';for(let i=0;i<bytes.length;i+=3){const a=bytes[i],b=bytes[i+1],c=bytes[i+2];out+=abc[a>>>2]+abc[((a&3)<<4)|((b||0)>>>4)]+(i+1<bytes.length?abc[((b&15)<<2)|((c||0)>>>6)]:'=')+(i+2<bytes.length?abc[c&63]:'=');}return out;};
  const textRecord=(path,text)=>{const b=utf8(text);return{path,text,bytes:b.length,sha256:sha256(b),gitBlobSha:gitBlobSHA(b)};};
  const blankPNG=new Uint8Array(45);
  blankPNG.set([137,80,78,71,13,10,26,10]);blankPNG.set([73,72,68,82],12);
  blankPNG[19]=1;blankPNG[23]=1;blankPNG.set([0,0,0,0,73,69,78,68,174,66,96,130],33);
  const pngRecord={path:'originals/veilbreak/characters/a.png',base64:encode64(blankPNG),bytes:blankPNG.length,sha256:sha256(blankPNG),gitBlobSha:gitBlobSHA(blankPNG)};
  const indexText='<script src="src/old.js"></script><script src="originals/veilbreak/pinned.js"></script><a href="originals/veilbreak/index.html">Enter</a>';
  const oldIndex=textRecord('index.html','<script src="src/old.js"></script><script src="originals/veilbreak/pinned.js"></script>');
  const fixture=()=>{
    const baseline={schema:'shadow-codec-ops.cqc-runtime/1',entry:'index.html',storage:{preserve:'namespaces'},unknown:{also:'preserved'},files:[
      {path:'index.html',bytes:oldIndex.bytes,sha256:oldIndex.sha256},
      {path:'src/old.js',bytes:9,sha256:'a'.repeat(64),opaque:'old-file-untouched'},
      {path:'originals/veilbreak/pinned.js',bytes:5,sha256:'b'.repeat(64)}
    ],totalBytes:oldIndex.bytes+14,references:[{from:'index.html',to:'src/old.js',opaque:'old-edge'},{from:'index.html',to:'originals/veilbreak/pinned.js'}],
    omittedReferences:[{from:'src/old.js',to:'docs/old.json',opaque:'old-omission'}],
    externalReferences:{schema:'shadow-codec-ops.cqc-external-references/1',entries:[{from:'originals/veilbreak/pinned.js',to:'originals/veilbreak/remote.png',url:'https://example.invalid/immutable.png',sha256:'c'.repeat(64),ownerSHA256:'b'.repeat(64),bytes:7}]}};
    const baselineText=JSON.stringify(baseline,null,2)+'\n';
    return{baselineText,baselineGitBlobSha:gitBlobSHA(utf8(baselineText)),syncSource,
      expectedOriginalPngs:1,expectedCanonicalPngs:0,requireFullP74Scope:false,records:[
        textRecord('index.html',indexText),
        textRecord('originals/veilbreak/index.html','<script src="campaign.js"></script>'),
        textRecord('originals/veilbreak/campaign.js',"fetch('../../data/veilbreak-content.json')"),
        textRecord('data/veilbreak-content.json',JSON.stringify({asset:'originals/veilbreak/characters/a.png',coreEngineValidation:{report:'docs/cqc-bible/veilbreak-engine-validation.json'},test:'tests/example.json'})),
        {...pngRecord}
      ]};
  };
  run('SHA256 and SHA1 known vectors including multi-block input',()=>{
    for(const [text,s256,s1]of [
      ['', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 'da39a3ee5e6b4b0d3255bfef95601890afd80709'],
      ['abc','ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad','a9993e364706816aba3e25717850c26c9cd0d89d'],
      ['a'.repeat(1000000),'cdc76e5c9914fb9281a1c7e284d73e67f1809a48a497200e046d39ccc7112cd0','34aa973cd4c4daa4f61eeb2bdbad27316534016f']]){
      equal(sha256(utf8(text)),s256);equal(sha1(utf8(text)),s1);
    }
    equal(gitBlobSHA(utf8('')),'e69de29bb2d1d6434b8b29ae775ad8c2e48c5391');
  });
  run('UTF8 exact encoding including surrogate replacement',()=>{
    equal([...utf8('é € 😀')],[195,169,32,226,130,172,32,240,159,152,128]);
    equal([...utf8('\ud800A\udc00')],[239,191,189,65,239,191,189]);
  });
  run('Strict base64 binary decoding',()=>{equal([...decodeBase64(encode64(blankPNG))],[...blankPNG]);raises(()=>decodeBase64('!?=='),/base64/);});
  run('POSIX normalization and extension semantics for reference paths',()=>{
    for(const [input,expected]of [['','.' ],['.','.' ],['./','./'],['a//b/../c/','a/c/'],['../../a','../../a'],['/a/../../b','/b'],['//foo//','/foo/']])equal(posix.normalize(input),expected);
    equal(posix.join('data','../../docs/a.json'),'../docs/a.json');
    equal(posix.dirname('a/b.js'),'a');equal(posix.dirname('/x'),'/');equal(posix.dirname('//x'),'//');
    equal(posix.basename('/a/b/'),'b');equal(posix.extname('.config'),'');equal(posix.extname('..'),'');equal(posix.extname('a.'),'.');
  });
  run('Original synchronizer pin and extraction',()=>{const d=createDiscovery(syncSource);equal(d.sourceGitBlob,'88ab8285cb2c491ace6cefb8b2c20925fa96630a');equal(d.extractedSectionsSHA256,'e099c0ef0fc2d1bebb178c739edd80a98e94078d3f3cf3e1ba2b205ba58ddc17');raises(()=>createDiscovery(syncSource+'\n'),/source Git blob mismatch/);});
  run('Reference discovery uses exact original policy including docs exclusions',()=>{
    const d=createDiscovery(syncSource),files=new Set(['data/a.json','assets/x.png','assets/one/shared.png','assets/two/shared.png']);
    equal(d.discoverReferences('const a="../assets/x.png";const b="shared.png";const d="docs/cqc-bible/veilbreak-engine-validation.json";const u="https://example.test/data.png";','data/a.json',files),
      {references:['assets/one/shared.png','assets/two/shared.png','assets/x.png'],omittedReferences:['docs/cqc-bible/veilbreak-engine-validation.json']});
    ok(!d.isRuntimePath('docs/cqc-bible/veilbreak-engine-validation.json'));ok(!d.isRuntimePath('tests/example.json'));ok(d.isRuntimePath('data/missing.json'));
  });
  run('Deterministic reconstruction preserves historical rows, unknown metadata and external order',()=>{
    const f=fixture(),before=JSON.parse(f.baselineText),a=reconstructP74(f),b=reconstructP74(f);
    equal(a.text,b.text);equal(a.gitBlobSha,b.gitBlobSha);
    equal(a.manifest.files[1],before.files[1]);equal(a.manifest.externalReferences,before.externalReferences);equal(a.manifest.storage,before.storage);equal(a.manifest.unknown,before.unknown);
    equal(a.manifest.omittedReferences[0],before.omittedReferences[0]);
    equal(a.manifest.files.length,7);equal(a.manifest.totalBytes,a.manifest.files.reduce((n,row)=>n+row.bytes,0));
    equal(f.baselineText,JSON.stringify(before,null,2)+'\n');
  });
  run('Affected docs provenance is omitted normally without external route changes',()=>{
    const r=reconstructP74(fixture());ok(r.manifest.omittedReferences.some(x=>x.to==='docs/cqc-bible/veilbreak-engine-validation.json'));
    equal(r.report.affectedNonRuntimeOmissionCount,2);equal(r.report.externalRouteCountPreserved,1);equal(r.report.externalPolicyPreserved,true);
  });
  run('Scope report never certifies full runtime or checkout and separates binary attestations',()=>{
    const f=fixture(),png=f.records.find(r=>r.path.endsWith('.png'));delete png.base64;png.evidence={kind:'bytes-hashed-from-retained-generation-output',producer:'fixture',source:'fixture immutable metadata'};
    const r=reconstructP74(f);for(const key of ['fullRuntimeValidated','fullRuntimeFileAuditPerformed','checkoutFilesRead','nodeUpdater99Executed','browserValidationPerformed','gameplayValidationPerformed','externalPolicyRevalidated','manifestWrittenToCheckout','branchOrRefUpdated','pngPixelDecodePerformed'])equal(r.report[key],false);
    equal(r.report.attestedBinaryChecks.length,1);equal(r.report.binaryHashesRecomputedInThisRun,0);equal(r.report.historicalFilesNotRead,2);
  });
  run('Invalid historical blob and structural metadata reject',()=>{
    const f=fixture();raises(()=>reconstructP74({...f,baselineText:f.baselineText+'\n'}),/manifest Git blob mismatch/);
    const baseline=JSON.parse(f.baselineText);baseline.totalBytes++;const text=JSON.stringify(baseline);
    raises(()=>reconstructP74({...f,baselineText:text,baselineGitBlobSha:gitBlobSHA(utf8(text))}),/total\/entry mismatch/);
  });
  run('Selected text Git SHA, SHA256 and bytes must match exactly',()=>{
    for(const key of ['gitBlobSha','sha256','bytes']){const f=fixture();f.records[0][key]=key==='bytes'?1:'d'.repeat(key==='gitBlobSha'?40:64);raises(()=>reconstructP74(f),/immutable bytes mismatch/);}
  });
  run('Unproven binary metadata rejects',()=>{const f=fixture();delete f.records[4].base64;raises(()=>reconstructP74(f),/binary metadata provenance/);});
  run('Corrupt actual PNG header or trailer rejects even with recalculated digests',()=>{
    const f=fixture(),bad=blankPNG.slice();bad[0]=0;f.records[4]={...pngRecord,base64:encode64(bad),sha256:sha256(bad),gitBlobSha:gitBlobSHA(bad)};
    raises(()=>reconstructP74(f),/PNG header\/trailer/);
  });
  run('Missing exact text and malformed selected JSON reject',()=>{
    const f=fixture();delete f.records[0].text;raises(()=>reconstructP74(f),/Exact text absent/);
    const g=fixture();g.records[3]=textRecord('data/veilbreak-content.json','{');raises(()=>reconstructP74(g),/Invalid selected JSON/);
  });
  run('Unresolved affected runtime reference rejects',()=>{
    const f=fixture();f.records[3]=textRecord('data/veilbreak-content.json',JSON.stringify({asset:'originals/veilbreak/characters/a.png',missing:'assets/missing.png'}));raises(()=>reconstructP74(f),/Unresolved affected runtime reference/);
  });
  run('Orphan selected file and lost historical reachability reject',()=>{
    const f=fixture();f.records.push(textRecord('originals/veilbreak/orphan.js','const orphan=true;'));raises(()=>reconstructP74(f),/Selected file unreachable/);
    const g=fixture();g.records[0]=textRecord('index.html','<a href="originals/veilbreak/index.html">Enter</a>');raises(()=>reconstructP74(g),/Historical reachability lost/);
  });
  run('Protected external owner and alias cannot be modified',()=>{
    for(const name of ['originals/veilbreak/pinned.js','originals/veilbreak/remote.png']){const f=fixture();f.records.push(textRecord(name,'x'));raises(()=>reconstructP74(f),/Protected external owner\/alias/);}
  });
  run('Scope path traversal, duplicates and non-P74 scope reject',()=>{
    for(const name of ['../index.html','/index.html','originals\\veilbreak\\bad.js','src/unrelated.js']){const f=fixture();f.records.push(textRecord(name,'x'));raises(()=>reconstructP74(f),/relative runtime path|Outside P74 scope/);}
    const g=fixture();g.records.push({...g.records[0]});raises(()=>reconstructP74(g),/Duplicate selected path/);
  });
  run('Strict original99/canonical3 counts and required P74 files enforced by default',()=>{
    const f=fixture();raises(()=>reconstructP74({...f,expectedOriginalPngs:99}),/expected 99, found 1/);
    raises(()=>reconstructP74({...f,expectedCanonicalPngs:3}),/expected 3, found 0/);
    raises(()=>reconstructP74({...f,requireFullP74Scope:true}),/Required P74 record missing/);
  });
  run('Transformed historical entries cannot be silently changed',()=>{
    const f=fixture(),m=JSON.parse(f.baselineText);m.files[0].sourceSha256='e'.repeat(64);m.files[0].transformation='old-transform';f.baselineText=JSON.stringify(m);f.baselineGitBlobSha=gitBlobSHA(utf8(f.baselineText));raises(()=>reconstructP74(f),/Transformed historical entry/);
  });
  return {schema:'cqc.p74.blob-reconstruction-unit-tests.v1',environment:'functions.exec V8 isolate',testCount:results.length,passed:results.length,failed:0,results,fullRuntimeValidated:false,checkoutAuditPerformed:false,browserValidationPerformed:false};
}
