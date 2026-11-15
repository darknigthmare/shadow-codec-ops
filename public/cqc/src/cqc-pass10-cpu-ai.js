/* Resume expired CPU decisions without changing the historical combat engine.
 * Load after cqc-pass8-combat-engine.js, or call attachEngine with that API.
 */
(function(root){'use strict';
 const attached=new WeakMap();
 function attachEngine(engine){
  if(!engine||typeof engine.cpu!=='function')return engine;
  if(attached.has(engine))return engine;
  const originalCpu=engine.cpu;
  engine.cpu=function(state,actor,opponent){
   const input=originalCpu.call(this,state,actor,opponent);
   // cpu49 treats zero as a missing timer and restores its reaction delay.
   // A negative expired marker survives that cap and the native >0 check,
   // allowing the original CPU to choose its next action on the next tick.
   if(actor.cpuWait===0)actor.cpuWait=-1;
   return input;
  };
  attached.set(engine,originalCpu);
  return engine;
 }
 const api={attachEngine,attached:engine=>attached.has(engine),
  scope:'Expired reaction countdown only; native action choice, ranges, resource costs, movement and damage remain in the shipped engine.'};
 root.CQC_PASS10_CPU_AI=api;
 attachEngine(root.CQCCombat048Pass8||root.CQCCombat046||root.CQCCombat045);
 if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
