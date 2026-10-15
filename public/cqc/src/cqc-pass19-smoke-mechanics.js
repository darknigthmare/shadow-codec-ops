/* Non-damaging smoke and conditional cover; clocks use existing deterministic Versus FX ticks. */
(function(root){'use strict';
 const LIMIT=8,QUIET=24,isMove=m=>m?.tag==='smoke'&&['projectile','trap','stationaryMine'].includes(m.kind);
 const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),finite=Number.isFinite;
 function actor(s,owner){return owner===0?s.a:owner===1?s.b:null;}
 function emit(hooks,s,type,p,extra={}){hooks?.event?.(s,type,p,extra);}
 function cloud(s,source,hooks={}){
  const p=actor(s,source.owner),m=source.def;if(!p||!isMove(m)||![source.x,source.y].every(finite))return null;
  const duration=clamp(Math.round(m.smokeFrames||240),90,360),radius=clamp(m.smokeRadius||m.radius||m.reach||106,55,180),id=s.nextId++;
  const f={id,kind:'smoke-cloud',tag:'smoke',x:source.x,y:source.kind==='trap'?source.y-65:source.y,owner:source.owner,radius,verticalRadius:radius*1.15,t:duration,max:duration,sourceMoveID:m.id,nonDamaging:true};
  const previous=s.fx.filter(fx=>fx.kind==='smoke-cloud');while(previous.length>=LIMIT){const old=previous.shift(),index=s.fx.indexOf(old);if(index>=0)s.fx.splice(index,1);}
  s.fx.push(f);if(s.fx.length>100)s.fx.shift();emit(hooks,s,'smokeCloud',p,{id,source:source.id,moveID:m.id,radius,duration});return f;
 }
 function explode(s,q,hooks={}){if(!isMove(q?.def))return false;if(q.dead)return true;q.dead=true;cloud(s,q,hooks);return true;}
 function trap(s,tr,a,d,hooks={}){if(!isMove(tr?.def))return false;if(!tr.dead&&!tr.def.remoteOnly&&Math.abs(tr.x-d.x)<(tr.def.reach||90)&&d.y>568-95){tr.dead=true;cloud(s,{...tr,kind:'trap'},hooks);emit(hooks,s,'smokeTrapTrigger',a,{id:tr.id});}return true;}
 function contains(cloud,p,box){const body=box?.(p),centreY=body?body.y+body.h*.55:p.y-105,dx=(p.x-cloud.x)/cloud.radius,dy=(centreY-cloud.y)/cloud.verticalRadius;return dx*dx+dy*dy<=1;}
 function step(s,hooks={}){const clouds=s.fx.filter(f=>f.kind==='smoke-cloud'&&f.t>0);for(const p of [s.a,s.b]){
   const own=clouds.find(f=>f.owner===p.slot&&contains(f,p,hooks.box)),eligible=!!own&&p.life>0&&p.onGround&&!p.attack&&!p.hit&&!p.blockstun&&!p.statuses.marked&&s.frame-p.lastOffense>QUIET;
   const current=p.buffs.cloak;
   if(eligible){if(!current||current.smokeOnly){if(!current)emit(hooks,s,'smokeCover',p,{cloud:own.id});p.buffs.cloak={t:2,hits:1,smokeOnly:true,cloudID:own.id};}}
   else if(current?.smokeOnly){delete p.buffs.cloak;emit(hooks,s,'smokeRevealed',p,{cloud:current.cloudID,reason:!own?'outside-or-expired':p.attack?'action':p.hit||p.blockstun?'hit':p.statuses.marked?'marked':'revealed'});}
  }
 }
 function drawCloud(c,f,x,y,zoom,options={},vfx=root.CQC_PASS18_VFX){if(f?.kind!=='smoke-cloud')return false;if(!vfx?.drawAt||![x,y,zoom,f.radius,f.t,f.max].every(finite)||zoom<=0)return true;const age=f.max-f.t,fade=Math.min(1,age/12,f.t/24),reference=root.CQC_PASS18_VFX_CATALOG?.effects?.['smoke-cloud']?.displayWidth||180,scale=clamp(2*f.radius/reference*zoom,.1,6);c.save();c.globalAlpha*=fade*.68;for(const [i,offset]of[-.38,0,.34].entries())vfx.drawAt(c,'smoke-cloud',x+(i-1)*f.radius*.12*zoom,y+offset*f.radius*zoom,age+i*5,scale,options);c.restore();return true;}
 root.CQC_PASS19_SMOKE={version:'pass19-non-damaging-smoke-v1',isMove,cloud,explode,trap,step,contains,drawCloud,limits:{maxClouds:LIMIT,quietFrames:QUIET,defaultFrames:240,maxFrames:360},scope:'Source-game smoke equipment; bounded cover/clock/radius and native cloud rendering are CQC adaptations. Smoke never deals damage, chip, hitstun, drowsy, or destroys traps.'};
 if(typeof module==='object'&&module.exports)module.exports=root.CQC_PASS19_SMOKE;
})(globalThis);
