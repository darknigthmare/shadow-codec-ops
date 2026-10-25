/* Read-only extraction of declared native frame groups; no browser/art verification. */
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'../../..');
const html=fs.readFileSync(path.join(root,'public/cqc/modules/unified-versus-v055.html'),'utf8');
const context=vm.createContext({console,URL,structuredClone,setTimeout:()=>0,clearTimeout:()=>{},document:{baseURI:'https://audit.invalid/cqc/modules/',currentScript:null,addEventListener:()=>{}},Image:class{},performance:{now:()=>0}});
context.window=context;context.globalThis=context;
const sources=[];
for(const m of html.matchAll(/<script\s+src="([^"]+)"[^>]*><\/script>/g)){
 const name=path.basename(m[1]);
 if(name==='cqc-sprite-catalog.js'||name.includes('sprite-catalog')||name==='cqc-pass20-pw-box-corrections.js'){
  const p=path.resolve(root,'public/cqc/modules',m[1]);
  vm.runInContext(fs.readFileSync(p,'utf8'),context,{filename:name,timeout:10000});sources.push(path.relative(root,p));
 }
}
const entries=context.CQC_COMBAT_SPRITE_CATALOG.entries;
function frameKey(f){return [f.sha256||f.file,JSON.stringify(f.rect),f.physicalPoseIndex??''].join(':')}
function summarizeAction(a){const frames=a.frames||[];return {frames:frames.length,distinctRegions:new Set(frames.map(frameKey)).size,fps:a.fps,loop:a.loop,physicalPoseIndices:[...new Set(frames.map(f=>f.physicalPoseIndex).filter(x=>x!==undefined))],sourceFiles:[...new Set(frames.map(f=>f.file))]}}
vm.runInContext(fs.readFileSync(path.join(root,'public/cqc/src/cqc-original-fighters-reprise.js'),'utf8'),context,{filename:'cqc-original-fighters-reprise.js',timeout:10000});
const result={scope:'Declared native body catalog only; dynamic costumes and articulated render overrides must be reconciled separately.',sources,optionalSource:'public/cqc/src/cqc-original-fighters-reprise.js',originalFighters:context.CQC_ORIGINAL_FIGHTERS.fighters,entries:Object.values(entries).map(e=>({uid:e.uid,name:e.name,game:e.game,incarnation:e.incarnation,coverage:e.coverage,mirror:e.mirror??false,facing:e.facing,hasOpposite:!!e.oppositeActions,referenceStatus:e.referenceStatus||'',displayHeight:e.displayHeight,actionMap:e.actionMap||{},phaseMap:e.phaseMap||{},actions:Object.fromEntries(Object.entries(e.actions||{}).map(([n,a])=>[n,summarizeAction(a)])),oppositeActions:Object.fromEntries(Object.entries(e.oppositeActions||{}).map(([n,a])=>[n,summarizeAction(a)])),distinctRegions:new Set([...Object.values(e.actions||{}),...Object.values(e.oppositeActions||{})].flatMap(a=>a.frames||[]).map(frameKey)).size,review:e.review,geometry:e.geometry||null}))};
const out=process.argv[2]||'/tmp/cqc-animation-catalog.json';fs.writeFileSync(out,JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({sources:sources.length,entries:result.entries.length,out},null,2));
