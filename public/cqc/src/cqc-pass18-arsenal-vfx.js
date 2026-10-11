/* Arsenal uses the reviewed VFX sources without changing simulation or target areas.
 * Shared weapon families and beam timing remain CQC presentation adaptations.
 */
(function(root){'use strict';
 const api=()=>root.CQC_PASS18_VFX;
 const projectileEffects={bullet:'rifle-tracer',rocket:'stinger-missile',missile:'stinger-missile',card:'acid-card',slash:'hf-blue-slash'};
 const opts=()=>({noFlash:true,reducedMotion:root.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches===true});
 function projectile(c,b){const effect=projectileEffects[b?.kind];if(!effect||![b.x,b.y,b.vx,b.vy,b.t].every(Number.isFinite))return false;return api()?.drawAt(c,effect,b.x,b.y,Math.max(0,(b.owner==='enemy'?160:125)-b.t),1,{...opts(),angle:Math.atan2(b.vy,b.vx)})===true;}
 function impact(c,f){if(!f||![f.x,f.y,f.t].every(Number.isFinite))return false;const effect=f.kind==='shield'||f.kind==='parry'?'guard-impact':f.kind==='destroy'?'explosion':f.kind==='hit'?'metal-hit':f.kind==='player'?'cqc-impact':null;if(!effect)return false;const duration=f.kind==='destroy'?55:f.kind==='parry'?30:f.kind==='shield'?13:f.kind==='hit'?18:17;return api()?.drawAt(c,effect,f.x,f.y,Math.max(0,duration-f.t),1,opts())===true;}
 function event(c,e,state){if(!e||e.age<e.warn)return false;const age=e.age-e.warn;if(e.kind==='beam'){const id=['raymass','ray_mgR'].includes(state?.def?.id)?'fire-projectile':'heavy-rail';return api()?.drawBeam(c,e.from,{x:e.x,y:e.y},id,age,{...opts(),width:10})===true;}if(e.kind==='stomp'||e.kind==='sweep')return api()?.drawAt(c,e.kind==='sweep'?'steel-slash':'dust-plume',e.x,590,age,1,opts())===true;return false;}
 root.CQC_PASS18_ARSENAL_VFX={projectile,impact,event,projectileEffects:Object.freeze({...projectileEffects}),sourceLimits:'Native shared projectile and impact families; Arsenal attack clocks, hit areas and original warnings are retained. Individual beam weapon geometry is not certified 1:1.'};
})(globalThis);
