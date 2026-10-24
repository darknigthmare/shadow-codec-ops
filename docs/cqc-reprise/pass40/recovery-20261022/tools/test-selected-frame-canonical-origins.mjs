import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFile, writeFile, mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
const dir=fileURLToPath(new URL('.',import.meta.url));
const app='/workspace/cqc-pass21-application/public/cqc/';
const template=await readFile(dir+'selected-frame-canonical-origins.template.js','utf8');
const source=await readFile(app+'src/cqc-sprite-catalog.js','utf8');
const original=JSON.parse(source.slice(source.indexOf('{')).trim().replace(/;$/,'')).entries.core__snake;
const renderer=await readFile(app+'src/cqc-sprite-renderer.js','utf8');
const copy=x=>JSON.parse(JSON.stringify(x));
const uid='core__snake',id='mgs3-camo-soviet-woodland',audit='a'.repeat(64);
const frame=side=>({file:'assets/combat-costumes-pass40/core__snake/'+id+'/'+side+'-v1.png',sha256:(side==='right'?'b':'c').repeat(64),rect:[20,30,100,180],pivot:[.5,.99],physicalPoseIndex:side==='right'?11:27});
function setup(mutator=()=>{}){
 let delegated=0;
 const context=vm.createContext({URL,console,CQC_COMBAT_SPRITE_CATALOG:{schema:'cqc.combat-sprites/1',entries:{[uid]:copy(original)}},CQC_PASS19_NATIVE_ORIGINS:{projectile(){delegated++;return{legacy:true};}},CQC_PASS19_VERSUS_SPATIAL:{poseFor:()=>({attackPhase:'active',phaseProgress:0})}});
 vm.runInContext(renderer,context);
 const entry=copy(original);entry.displayHeight=220;entry.mirror=false;entry.pass40Revision='pass40-soviet-woodland-native-v1';entry.review={artAuditSHA256:audit};entry.sourceFrameHeights={};
 const anchors=[];
 for(const[side,key]of [['right','actions'],['left','oppositeActions']]){
  const f=frame(side);entry.sourceFrameHeights[f.file]=200;
  entry[key]={shoot:{fps:10,loop:false,frames:[copy(f),copy(f)]},deploy:{fps:6,loop:false,frames:[copy(f),copy(f),copy(f),copy(f)]},idle:{fps:0,loop:false,frames:[copy(f)]}};
  for(const[slot,action,tag,socket]of [['special','shoot','tranq','mk22-suppressor-muzzle'],['specialDown','deploy','explosive','grenade-release-hand']])anchors.push({side,slot,action,tag,socket,file:f.file,sourceSHA256:f.sha256,rect:copy(f.rect),pivot:copy(f.pivot),nativeXY:[side==='right'?110:30,90]});
 }
 const binding={uid,id,revision:entry.pass40Revision,artAuditSHA256:audit,anchors};mutator(binding,entry);
 context.CQC_COMBAT_SPRITES.getEntry=()=>entry;
 vm.runInContext(template.replace('/* P40_REVIEWED_SOURCE_BINDINGS */null',JSON.stringify([binding])),context);
 return{context,entry,binding,delegated:()=>delegated};
}
const fixture=setup(),api=fixture.context.CQC_PASS40_CANONICAL_ORIGINS;
const observed=[];
for(const face of [1,-1])for(const[slot,tag,expectedAction,expectedFrame]of [['special','tranq','shoot',1],['specialDown','explosive','deploy',2]]){
 const result=api.projectile({f:{uid,costume:id},face,attack:{name:slot}},{kind:'projectile',tag,slot});
 assert.ok(result);assert.equal(result.selectedAction,expectedAction);assert.equal(result.selectedFrameIndex,expectedFrame);assert.equal(result.forward,44);assert.ok(Math.abs(result.height-130.02)<1e-9);assert.equal(result.worldScaleApplied,false);
 observed.push({face,slot,selectedAction:result.selectedAction,selectedFrameIndex:result.selectedFrameIndex,forward:result.forward,height:result.height});
}
const p={f:{uid,costume:id},face:1,attack:{name:'special'}},move={kind:'projectile',tag:'tranq',slot:'special'};
const negative=[
 ['wrong incarnation',()=>api.projectile({...p,f:{uid:'core__old_snake',costume:id}},move)],
 ['wrong costume',()=>api.projectile({...p,f:{uid,costume:'original'}},move)],
 ['wrong move family',()=>api.projectile(p,{...move,tag:'ballistic'})],
 ['nonprojectile',()=>api.projectile(p,{...move,kind:'melee'})],
 ['unreviewed revision',()=>{const f=setup((_b,e)=>e.pass40Revision='other');return f.context.CQC_PASS40_CANONICAL_ORIGINS.projectile(p,move);} ],
 ['changed art audit',()=>{const f=setup((_b,e)=>e.review.artAuditSHA256='d'.repeat(64));return f.context.CQC_PASS40_CANONICAL_ORIGINS.projectile(p,move);} ],
 ['changed selected source hash',()=>{const f=setup((_b,e)=>e.actions.shoot.frames[1].sha256='e'.repeat(64));return f.context.CQC_PASS40_CANONICAL_ORIGINS.projectile(p,move);} ],
 ['changed selected rectangle',()=>{const f=setup((_b,e)=>e.actions.shoot.frames[1].rect[0]++);return f.context.CQC_PASS40_CANONICAL_ORIGINS.projectile(p,move);} ],
 ['changed selected pivot',()=>{const f=setup((_b,e)=>e.actions.shoot.frames[1].pivot[0]=.6);return f.context.CQC_PASS40_CANONICAL_ORIGINS.projectile(p,move);} ],
 ['missing calibrated density',()=>{const f=setup((_b,e)=>e.sourceFrameHeights={});return f.context.CQC_PASS40_CANONICAL_ORIGINS.projectile(p,move);} ],
 ['mirrored sprite',()=>{const f=setup((_b,e)=>e.mirror=true);return f.context.CQC_PASS40_CANONICAL_ORIGINS.projectile(p,move);} ]
];
for(const[label,run]of negative)assert.equal(run(),null,label);
for(const mutate of [b=>b.anchors.pop(),b=>b.anchors[0].nativeXY[0]=999,b=>b.anchors[0].file='../foreign.png',b=>b.uid='core__solid',b=>b.anchors[3]=copy(b.anchors[2])])assert.throws(()=>setup(mutate));
const before=fixture.delegated();assert.equal(fixture.context.CQC_PASS19_NATIVE_ORIGINS.projectile({...p,f:{uid:'core__solid',costume:'original'}},move).legacy,true);assert.equal(fixture.delegated(),before+1);
const report={schema:'cqc.p40.canonical-origin-template-tests/1',status:'passed-fixtures-not-art-approval',actualRendererSelectFrame:true,positiveSelectedFrameCases:observed,negativeSourceOrIdentityCases:negative.map(x=>x[0]),invalidCompiledBindingsRejected:5,unrelatedOriginDelegatedExactlyOnce:true,productMutations:false,PNGReadsOrChanges:false,limits:['Synthetic geometry proves source-binding rejection and actual renderer phase selection, not physical anatomy or real game projectile emission.','The compatibility wrapper delegates an unresolved point to the existing origin provider. Exact real-profile coverage and actual match emissions must pass before publishing a costume.']};
const out='/tmp/cqc-p40-resume-20261022/soviet-integration';await mkdir(out,{recursive:true});const bytes=Buffer.from(JSON.stringify(report,null,2)+'\n');await writeFile(out+'/SOURCE_ORIGIN_TEMPLATE_TESTS_ACTUAL.json',bytes);console.log(JSON.stringify({status:report.status,positive:observed.length,negative:negative.length+5,path:out+'/SOURCE_ORIGIN_TEMPLATE_TESTS_ACTUAL.json',bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')}));
