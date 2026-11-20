import assert from 'node:assert/strict';
import test from 'node:test';
import {sampleSignal, drawSignal, SIGNAL_KINDS, SIGNAL_DURATIONS} from '../public/cqc/originals/rook/signal-effects.js';
const base = Object.freeze({origin:Object.freeze({x:20,y:30}),target:Object.freeze({x:320,y:430}),seed:42});
function finiteGeometry(primitives) {
 for(const p of primitives){assert(Number.isFinite(p.alpha)&&p.alpha>=0&&p.alpha<=1);assert(p.width>0&&Number.isFinite(p.width));
  for(const point of p.points||[p.center]){assert(Number.isFinite(point.x)&&Number.isFinite(point.y));}
  if(p.type==='circle')assert(p.radius>0&&Number.isFinite(p.radius));
 }
}
function context(fail = false) {
 const calls=[],stack=[];
 const ctx={globalAlpha:.45,lineWidth:7,strokeStyle:'#123',fillStyle:'#456',globalCompositeOperation:'multiply',lineCap:'square',lineJoin:'miter',
  save(){stack.push(Object.fromEntries(['globalAlpha','lineWidth','strokeStyle','fillStyle','globalCompositeOperation','lineCap','lineJoin'].map(k=>[k,this[k]])));calls.push('save')},
  restore(){Object.assign(this,stack.pop());calls.push('restore')},stroke(){calls.push('stroke');if(fail)throw Error('paint failed')}};
 for(const name of ['beginPath','arc','moveTo','lineTo','closePath','fill'])ctx[name]=(...args)=>{for(const n of args)if(typeof n==='number')assert(Number.isFinite(n));calls.push(name)};
 return {ctx,calls,stack};
}
test('public collision timing is immutable and contact begins at the exact target',()=>{
 assert(Object.isFrozen(SIGNAL_KINDS)&&Object.isFrozen(SIGNAL_DURATIONS));
 const exact={'telemetry-pulse':[.1,.32,.42,.64],'calibration-ping':[.14,.46,.60,.90]};
 for(const kind of SIGNAL_KINDS){const t=SIGNAL_DURATIONS[kind];assert(Object.isFrozen(t));assert.deepEqual([t.launch,t.travel,t.contactStart,t.total],exact[kind]);
  assert.equal(sampleSignal(kind,{...base,age:t.launch-1e-8}).phase,'launch');
  assert.equal(sampleSignal(kind,{...base,age:t.launch}).phase,'travel');
  assert.equal(sampleSignal(kind,{...base,age:t.contactStart-1e-8}).phase,'travel');
  const contact=sampleSignal(kind,{...base,age:t.contactStart});assert.equal(contact.phase,'contact');assert.deepEqual(contact.position,base.target);assert.equal(contact.travelProgress,1);
  assert.equal(sampleSignal(kind,{...base,age:t.total}).phase,'done');
 }
});
test('travel geometry follows the snapshotted direction on forward, reverse, diagonal and zero-length paths',()=>{
 for(const kind of SIGNAL_KINDS)for(const target of [{x:320,y:30},{x:-280,y:30},{x:320,y:430},base.origin]){
  const t=SIGNAL_DURATIONS[kind],s=sampleSignal(kind,{...base,target,age:t.launch+t.travel/2});
  assert(Math.abs(s.position.x-(base.origin.x+target.x)/2)<1e-9);assert(Math.abs(s.position.y-(base.origin.y+target.y)/2)<1e-9);
  assert(Math.abs(Math.hypot(s.direction.x,s.direction.y)-1)<1e-9);finiteGeometry(s.primitives);
 }
});
test('sampling is deterministic, independent of call history and does not mutate caller snapshots',()=>{
 for(const kind of SIGNAL_KINDS){const options=Object.freeze({...base,age:.3,impact:'hit'}),before=JSON.stringify(options),a=sampleSignal(kind,options);sampleSignal(kind,{...base,seed:99,age:.5});assert.deepEqual(sampleSignal(kind,options),a);assert.equal(JSON.stringify(options),before);}
});
test('telemetry tick seed changes only decoration, never contact timing or trajectory',()=>{
 const a=sampleSignal('telemetry-pulse',{...base,age:.25}),b=sampleSignal('telemetry-pulse',{...base,seed:12,age:.25});assert.notDeepEqual(a.primitives,b.primitives);assert.deepEqual(a.position,b.position);assert.equal(a.contactStart,b.contactStart);
});
test('hit and miss contact feedback differ without deciding the gameplay impact',()=>{
 for(const kind of SIGNAL_KINDS){const age=SIGNAL_DURATIONS[kind].contactStart+.03,hit=sampleSignal(kind,{...base,age,impact:'hit'}),miss=sampleSignal(kind,{...base,age,impact:'miss'});assert.notDeepEqual(hit.primitives,miss.primitives);assert.deepEqual(hit.position,miss.position);assert.equal(hit.phase,miss.phase);assert.equal(sampleSignal(kind,{...base,age}).impact,'miss');}
});
test('reduced motion removes trailing decoration and expansion while preserving the same motion and hit timing',()=>{
 for(const kind of SIGNAL_KINDS){const t=SIGNAL_DURATIONS[kind],age=t.launch+t.travel/2,normal=sampleSignal(kind,{...base,age}),reduced=sampleSignal(kind,{...base,age,reducedMotion:true});assert(reduced.primitives.length<normal.primitives.length);assert.deepEqual(reduced.position,normal.position);assert.equal(reduced.contactStart,normal.contactStart);
  const first=sampleSignal(kind,{...base,age:t.contactStart+.01,reducedMotion:true,impact:'hit'}),later=sampleSignal(kind,{...base,age:t.total-.01,reducedMotion:true,impact:'hit'});assert.deepEqual(first.primitives,later.primitives);
 }
});
test('all lifecycle geometry remains finite, bounded in opacity and inactive outside the signal lifetime',()=>{
 for(const kind of SIGNAL_KINDS){const t=SIGNAL_DURATIONS[kind];for(let i=-2;i<=110;i++){const s=sampleSignal(kind,{...base,age:t.total*i/100,impact:i%2?'hit':'miss'});finiteGeometry(s.primitives);assert(s.travelProgress>=0&&s.travelProgress<=1);if(i<0||i>=100){assert.equal(s.active,false);assert.deepEqual(s.primitives,[]);}}
  const {ctx,calls}=context();drawSignal(ctx,kind,{...base,age:t.total});assert.deepEqual(calls,[]);
 }
});
test('draw preserves inherited Canvas state and restores it even when a drawing operation throws',()=>{
 for(const kind of SIGNAL_KINDS){const {ctx,calls,stack}=context(),before={...ctx};const s=drawSignal(ctx,kind,{...base,age:.3});assert.equal(s.phase,'travel');assert(calls.includes('stroke'));assert.equal(stack.length,0);for(const name of ['globalAlpha','lineWidth','strokeStyle','fillStyle','globalCompositeOperation','lineCap','lineJoin'])assert.equal(ctx[name],before[name]);
  const failing=context(true);assert.throws(()=>drawSignal(failing.ctx,kind,{...base,age:.3}),/paint failed/);assert.equal(failing.stack.length,0);assert.equal(failing.calls.at(-1),'restore');
 }
});
test('invalid signal data is rejected before it can write nonfinite Canvas commands',()=>{
 assert.throws(()=>sampleSignal('unknown',base),RangeError);assert.throws(()=>sampleSignal('telemetry-pulse',{...base,age:NaN}),TypeError);assert.throws(()=>sampleSignal('telemetry-pulse',{...base,seed:Infinity}),TypeError);assert.throws(()=>sampleSignal('telemetry-pulse',{...base,target:{x:Infinity,y:0}}),TypeError);assert.throws(()=>sampleSignal('telemetry-pulse',{...base,impact:'maybe'}),RangeError);
 const {ctx,calls}=context();assert.throws(()=>drawSignal(ctx,'telemetry-pulse',{...base,origin:{x:1e308,y:0},target:{x:-1e308,y:0}}),RangeError);assert.deepEqual(calls,[]);
});
