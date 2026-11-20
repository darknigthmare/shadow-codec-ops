import assert from 'node:assert/strict';
import test from 'node:test';
import {TRACE_DURATION, sampleTrace, drawTrace} from '../public/cqc/originals/rook/relay-signal.js';
const base = {origin:{x:963.7,y:-18.2},target:{x:-27.4,y:301.1},seed:57};
function canvas({alpha=.37,failAt}={}) {
 const draws=[],stack=[];
 const ctx={globalAlpha:alpha,lineWidth:7,strokeStyle:'#123',fillStyle:'#456',globalCompositeOperation:'multiply',lineCap:'butt',lineJoin:'miter'};
 const keys=Object.keys(ctx);
 ctx.save=()=>stack.push(Object.fromEntries(keys.map(key=>[key,ctx[key]])));
 ctx.restore=()=>Object.assign(ctx,stack.pop());
 for(const method of ['beginPath','moveTo','lineTo','arc','fill','stroke'])ctx[method]=(...args)=>{
  for(const n of args)if(typeof n==='number')assert(Number.isFinite(n));
  if(['fill','stroke'].includes(method))draws.push({method,alpha:ctx.globalAlpha});
  if(method===failAt)throw Error('synthetic canvas failure '+method);
 };
 return {ctx,keys,draws,stack};
}
function finite(primitives){for(const p of primitives){assert(p.alpha>=0&&p.alpha<=1&&Number.isFinite(p.alpha));assert(p.width>0&&Number.isFinite(p.width));for(const v of p.points||[p.center]){assert(Number.isFinite(v.x)&&Number.isFinite(v.y));}if(p.type!=='segment')assert(p.radius>0&&Number.isFinite(p.radius));if(p.type==='arc'){assert(Number.isFinite(p.start)&&Number.isFinite(p.end));assert(p.end>p.start&&p.end-p.start<Math.PI*2);}}}

test('immutable timing exposes exact launch, travel, captured-endpoint contact and expiry boundaries',()=>{
 assert(Object.isFrozen(TRACE_DURATION));assert.deepEqual(TRACE_DURATION,{launch:.12,travel:.40,contactStart:.52,contact:.30,total:.82});
 for(const reducedMotion of [false,true]){
  assert.equal(sampleTrace({...base,age:.12-1e-9,reducedMotion}).phase,'launch');assert.equal(sampleTrace({...base,age:.12,reducedMotion}).phase,'travel');assert.equal(sampleTrace({...base,age:.52-1e-9,reducedMotion}).phase,'travel');
  for(const age of [.52,.72,.82,4]){const s=sampleTrace({...base,age,reducedMotion});assert.deepEqual(s.position,base.target);assert.equal(s.travelProgress,1);}
  assert.equal(sampleTrace({...base,age:.52,reducedMotion}).phase,'contact');assert.equal(sampleTrace({...base,age:.82,reducedMotion}).phase,'done');
 }
});
test('forward, backward, vertical and zero-length paths stay finite and travel linearly',()=>{
 for(const target of [{x:300,y:20},{x:-300,y:20},{x:10,y:-300},{x:10,y:20}]){
  const origin={x:10,y:20},s=sampleTrace({origin,target,age:TRACE_DURATION.launch+TRACE_DURATION.travel/2});
  assert(Math.abs(s.position.x-(origin.x+target.x)/2)<1e-9);assert(Math.abs(s.position.y-(origin.y+target.y)/2)<1e-9);assert(Math.abs(Math.hypot(s.direction.x,s.direction.y)-1)<1e-12);finite(s.primitives);
 }
});
test('sample geometry is deterministic, independent of history and decor seed does not alter trajectory',()=>{
 const a=sampleTrace({...base,age:.31});sampleTrace({...base,seed:199,age:.6,impact:'hit'});assert.deepEqual(sampleTrace({...base,age:.31}),a);
 const b=sampleTrace({...base,seed:21,age:.31});assert.notDeepEqual(a.primitives,b.primitives);assert.deepEqual(a.position,b.position);assert.equal(a.contactStart,b.contactStart);
});
test('captured sample, caller snapshots and returned geometry cannot mutate each other',()=>{
 const origin={...base.origin},target={...base.target},s=sampleTrace({origin,target,age:.52});const before=structuredClone(s);
 origin.x+=900;target.y-=400;assert.deepEqual(s,before);
 s.position.x=90;s.primitives[0].center.y=80;assert.notEqual(origin.x,90);assert.notEqual(target.y,80);
 const frozen=Object.freeze({origin:Object.freeze({...base.origin}),target:Object.freeze({...base.target}),age:.3});assert.doesNotThrow(()=>sampleTrace(frozen));
});
test('reduced motion preserves contact and location while removing the dotted sweep and contact expansion',()=>{
 const age=.3,normal=sampleTrace({...base,age}),reduced=sampleTrace({...base,age,reducedMotion:true});assert(reduced.primitives.length<normal.primitives.length);assert.deepEqual(normal.position,reduced.position);assert.equal(normal.contactStart,reduced.contactStart);
 for(const impact of ['hit','miss']){const first=sampleTrace({...base,age:.53,reducedMotion:true,impact}),last=sampleTrace({...base,age:.81,reducedMotion:true,impact});assert.deepEqual(first.primitives,last.primitives);}
});
test('contact feedback distinguishes caller-provided hit and miss without a target algorithm',()=>{
 const hit=sampleTrace({...base,age:.6,impact:'hit'}),miss=sampleTrace({...base,age:.6,impact:'miss'});assert.notDeepEqual(hit.primitives,miss.primitives);assert.deepEqual(hit.position,miss.position);assert.equal(hit.phase,miss.phase);assert.equal(sampleTrace({...base,age:.6}).impact,'miss');
});
test('actual Canvas operations respect inherited alpha including zero, and preserve caller state',()=>{
 for(const alpha of [0,.37])for(const age of [.05,.3,.6]){
  const {ctx,keys,draws,stack}=canvas({alpha}),before=Object.fromEntries(keys.map(k=>[k,ctx[k]]));const sample=drawTrace(ctx,{...base,age,impact:'hit'});assert.equal(draws.length,sample.primitives.length);
  sample.primitives.forEach((p,i)=>assert.equal(draws[i].alpha,alpha*p.alpha));assert.equal(stack.length,0);for(const key of keys)assert.equal(ctx[key],before[key]);
 }
});
test('Canvas state restores after arc, lineTo and fill exceptions',()=>{
 for(const [failAt,age] of [['arc',.3],['lineTo',.3],['fill',.05]]){
  const {ctx,keys,stack}=canvas({failAt}),before=Object.fromEntries(keys.map(k=>[k,ctx[k]]));assert.throws(()=>drawTrace(ctx,{...base,age}),/synthetic canvas failure/);assert.equal(stack.length,0);for(const key of keys)assert.equal(ctx[key],before[key]);
 }
});
test('all lifecycle primitives remain finite; inactive frames do not touch the drawing context',()=>{
 for(let i=-2;i<=110;i++){const s=sampleTrace({...base,age:TRACE_DURATION.total*i/100,impact:i%2?'hit':'miss'});finite(s.primitives);assert(s.phaseProgress>=0&&s.phaseProgress<=1);if(i<0||i>=100){assert.equal(s.active,false);assert.deepEqual(s.primitives,[]);}}
 for(const age of [-.1,.82,5]){const {ctx,draws,stack}=canvas();drawTrace(ctx,{...base,age});assert.deepEqual(draws,[]);assert.equal(stack.length,0);}
});
test('invalid snapshots and nonfinite input fail before any drawing operation',()=>{
 for(const options of [{...base,age:NaN},{...base,seed:Infinity},{...base,target:{x:Infinity,y:3}}])assert.throws(()=>sampleTrace(options),TypeError);
 assert.throws(()=>sampleTrace({...base,impact:'unsure'}),RangeError);
 const {ctx,draws,stack}=canvas();assert.throws(()=>drawTrace(ctx,{origin:{x:1e308,y:0},target:{x:-1e308,y:0},age:.3}),RangeError);assert.deepEqual(draws,[]);assert.equal(stack.length,0);
});
