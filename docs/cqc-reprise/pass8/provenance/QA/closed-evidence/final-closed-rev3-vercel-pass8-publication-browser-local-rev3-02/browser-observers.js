/* Publication QA observers only. Never installed in production source. */
(() => {
  if (window.__pub8Installed) return true;
  const A = window.__CQC055Versus, S = window.CQC_COMBAT_SPRITES;
  if (!A?.engine || !S || !window.CQC_PASS8_COMBAT_FIDELITY) throw Error('PASS8 runtime hooks absent');
  const cat = window.CQC_COMBAT_SPRITE_CATALOG.entries;
  window.__pub8Installed = true;
  window.__pub8Draws = []; window.__pub8Projectiles = []; window.__pub8Texts = [];
  const push = (a, x) => { a.push(x); if (a.length > 200) a.shift(); };
  const originalDraw = S.draw;
  S.draw = function (...args) {
    const c = args[0], oldDraw = c.drawImage, oldScale = c.scale;
    let row = null, scale = null, ok;
    c.drawImage = function (image, ...v) {
      const m = c.getTransform();
      if (c.canvas.id === 'game') row = {url: image.src, file: image.src.slice(image.src.indexOf('assets/')), rect: v.slice(0,4), destination: v.slice(4), matrix: [m.a,m.b,m.c,m.d,m.e,m.f], alpha: c.globalAlpha, canvas:[c.canvas.width,c.canvas.height]};
      return oldDraw.call(this, image, ...v);
    };
    c.scale = function (...v) { scale = v; return oldScale.apply(this,v); };
    try { ok = originalDraw(...args); } finally { c.drawImage = oldDraw; c.scale = oldScale; }
    if (row) {
      const uid=args[1]?.uid, e=cat[uid], pose=args[6]||{}, action=S.actionName(pose,e), group=(args[4]===e.facing?e.actions:e.oppositeActions)[action];
      const index=group?.frames.findIndex(f=>f.file===row.file&&JSON.stringify(f.rect)===JSON.stringify(row.rect)), frame=group?.frames[index];
      push(window.__pub8Draws,{...row,uid,face:args[4],scale:args[5],localScale:scale,actorCanvas:[args[2],args[3]],pose:{moveSlot:pose.moveSlot,attackPhase:pose.attackPhase,phaseProgress:pose.phaseProgress},action,index,ok,sourceSHA:frame?.sha256,pivot:frame?.pivot});
    }
    return ok;
  };
  const game=document.querySelector('#game'), c=game.getContext('2d'), oldText=c.fillText;
  c.fillText=function(text,x,y,...rest){push(window.__pub8Texts,{text:String(text),x,y,font:c.font});return oldText.call(this,text,x,y,...rest);};
  const art=window.CQC_PASS4_PROJECTILE_ART, oldProjectile=art?.draw;
  if (!oldProjectile) throw Error('Actual projectile art hook absent');
  art.draw=function(c,q,z){const m=c.getTransform();push(window.__pub8Projectiles,{id:q.id,owner:q.owner,kind:q.kind,slot:q.def?.slot,center:[m.e,m.f],zoom:z,x:q.x,y:q.y});return oldProjectile(c,q,z);};
  const near=(x,y,label)=>{if(Math.abs(x-y)>.01)throw Error(label+': '+x+' / '+y);};
  const empty=()=>A.engine.empty();
  window.__pub8Step=(s,n,inputB=null)=>{for(let i=0;i<n;i++)A.engine.step(s,[empty(),inputB||empty()]);};
  window.__pub8Start=(uid,face=1,subjectP2=false)=>{
    A.startExternal({p1:subjectP2?'core__snake':uid,p2:subjectP2?uid:'core__snake',stage:'shadow_heliport',mode:'training',dummy:'idle',autoheal:false,freeResource:false,rounds:1,seconds:99,finishers:'off',source:'pass8-published-browser-qa'});
    A.pause(true); A.resetDojo(); document.querySelector('#pause43').classList.add('hidden');
    const s=A.getState(),p=subjectP2?s.b:s.a,o=subjectP2?s.a:s.b;
    s.options.freeMeter=false;s.options.freeResource=false;s.options.autoheal=false;
    p.x=face===1?300:980;o.x=face===1?980:300;p.face=face;o.face=-face;
    for(const a of [s.a,s.b]){a.ai=false;a.vx=a.vy=a.kx=0;a.cool=0;a.cooldowns={};a.meter=100;const r=a.f.combat.resource;a.r=['heat','cost'].includes(r.kind)?0:r.max;}
    return s;
  };
  const clear=()=>{window.__pub8Draws=[];window.__pub8Texts=[];window.__pub8Projectiles=[];};
  window.__pub8Assert=(uid,face,phase=null,slot=null)=>{
    const d=window.__pub8Draws.filter(x=>x.uid===uid).at(-1),e=cat[uid],want=window.__pub8Expected.entries[uid];
    if(!d?.ok||d.face!==face||d.index<0||d.localScale?.[0]<0||d.matrix[0]<=0)throw Error('Actual independently authored native facing absent '+JSON.stringify(d));
    if(!d.url.startsWith(location.origin+'/cqc/assets/'))throw Error('Native image resolved outside actual CQC mount');
    if(want.files[d.file]!==d.sourceSHA)throw Error('Loaded native source frame SHA metadata differs from closed catalog');
    if(phase&&(d.pose.attackPhase!==phase||d.pose.moveSlot!==slot||d.action!==want.actionMap[slot]))throw Error('Actual engine action phase differs '+JSON.stringify(d));
    const indices=e.phaseMap?.[d.action]?.[phase];if(indices&&!indices.includes(d.index))throw Error('Actual frame outside documented phase');
    if(!d.destination.every(Number.isFinite))throw Error('Nonfinite native Canvas destination');
    near(d.destination[3],d.rect[3]*e.displayHeight/(e.sourceFrameHeights?.[d.file]||e.baseFrameHeight||d.rect[3]),'Native source standing scale');
    return d;
  };
  window.__pub8Idle=(uid,face)=>{window.__pub8Start(uid,face,face===-1);clear();A.draw();return window.__pub8Assert(uid,face);};
  window.__pub8HUD=(uid)=>{
    const s=window.__pub8Start(uid,1);clear();A.draw();const label=s.a.f.combat.resource.label,compact=matchMedia('(max-width:760px)').matches;
    const name=s.a.f.name;
    if(compact){
      const hud=document.querySelector('[data-player="0"]'),labelNode=hud?.querySelector('[data-hud="resourceLabel"]'),nameNode=hud?.querySelector('[data-hud="name"]'),health=hud?.querySelector('[data-hud="healthTrack"]');
      if(labelNode?.textContent!==label||nameNode?.textContent!==name||!health?.hasAttribute('aria-valuenow'))throw Error('Actual compact source HUD identity/resource differs '+uid);
    }else if(!window.__pub8Texts.some(t=>t.text.includes(label)))throw Error('Actual Canvas source resource HUD absent '+uid);
    return{uid,name,resourceLabel:label,resourceKind:s.a.f.combat.resource.kind,compact,actualDraw:true,numericalResourceIsVersusAdaptation:true};
  };
  window.__pub8Phases=(uid,face)=>{
    const samples=[];
    for(const slot of ['special','super'])for(const phase of ['startup','recovery','active']){
      const s=window.__pub8Start(uid,face),m=s.a.f.combat.moves[slot];
      if(!A.engine.start(s,s.a,slot))throw Error('Real move refused '+uid+' '+slot);
      const ticks=phase==='startup'?0:phase==='active'?m.startup:m.startup+m.active;
      window.__pub8Step(s,ticks);clear();A.draw();const d=window.__pub8Assert(uid,face,phase,slot);
      samples.push({slot,phase,ticks,name:m.name,kind:m.kind,action:d.action,index:d.index,file:d.file,sourceSHA:d.sourceSHA,rect:d.rect,pivot:d.pivot,destination:d.destination,matrix:d.matrix});
    }
    return {uid,face,realEnginePhaseSamples:samples,attackFrameAssignments:0};
  };
  window.__pub8Origin=(uid,face,slot)=>{
    const s=window.__pub8Start(uid,face),m=s.a.f.combat.moves[slot],F=window.CQC_PASS8_COMBAT_FIDELITY,group=Object.keys(F.slots[uid]||{}).find(k=>F.slots[uid][k].includes(slot)),mark=window.CQC_PASS8_NATIVE_ORIGINS[uid]?.[group]?.[face===1?'right':'left'];
    if(m.kind!=='projectile'||!mark)throw Error('Actual source-bound projectile absent');
    const before={resource:s.a.r,meter:s.a.meter};if(!A.engine.start(s,s.a,slot))throw Error('Real source action refused');
    const paid={resource:s.a.r,meter:s.a.meter};window.__pub8Step(s,m.startup);
    const q=s.projectiles.find(q=>!q.delay&&!q.dead);if(!q)throw Error('First-active real projectile absent');
    const immutable=JSON.stringify(q);clear();A.draw();const d=window.__pub8Assert(uid,face,'active',slot),render=window.__pub8Projectiles.find(p=>p.id===q.id);
    if(!render||mark.file!==d.file||mark.sha256!==d.sourceSHA||mark.frame!==d.index)throw Error('Actual body/source projectile draw mismatch');
    const [sx,sy,sw,sh]=d.rect,[dx,dy,dw,dh]=d.destination,[a,b,c,dd,tx,ty]=d.matrix;
    const lx=dx+(mark.point[0]-sx)*dw/sw,ly=dy+(mark.point[1]-sy)*dh/sh;
    const origin=[a*lx+c*ly+tx,b*lx+dd*ly+ty],z=d.scale/1.12,expected=[origin[0]+q.vx*z,origin[1]+(m.vy||0)*z],residual=Math.hypot(expected[0]-render.center[0],expected[1]-render.center[1]);
    if(residual>.01||JSON.stringify(q)!==immutable)throw Error('Real native launch transform differs or drawing mutated physics '+JSON.stringify({uid,face,slot,residual}));
    const r=s.a.f.combat.resource,sign=['heat','cost'].includes(r.kind)?1:-1;
    near(paid.resource,before.resource+sign*(m.cost||0),'Actual once-only resource charge');near(paid.meter,before.meter-(m.meter||0),'Actual meter charge');
    if(s.projectiles.length!==(m.count||1))throw Error('Real projectile burst count differs');
    return {uid,face,slot,sourceGroup:group,sourceFile:d.file,sourceSHA:d.sourceSHA,sourcePoint:mark.point,frame:d.index,nativeOriginCanvas:origin,actualProjectileCanvas:render.center,pixelResidual:residual,before,paid,projectiles:s.projectiles.length,firstPhysics:{age:q.age,x:q.x,y:q.y,vx:q.vx,vy:q.vy}};
  };
  window.__pub8RavenBlast=(face)=>{
    const s=window.__pub8Start('core__raging_raven',face);s.a.x=face===1?380:900;s.b.x=face===1?1200:80;
    const m=s.a.f.combat.moves.super;if(m.speed!==9||m.kind!=='projectile')throw Error('Final bounded grenade correction absent');
    if(!A.engine.start(s,s.a,'super'))throw Error('Real grenade super refused');
    let first=null;
    for(let i=0;i<m.startup+200;i++){window.__pub8Step(s,1);const blast=s.fx.find(x=>x.kind==='blast');if(!first&&blast){first={frame:s.frame,x:blast.x,y:blast.y,radius:blast.radius,life:blast.life};clear();A.draw();}}
    if(!first||s.metrics.explosion!==3||s.projectiles.length||!Number.isFinite(first.x)||!Number.isFinite(first.y))throw Error('Real finite three-grenade explosions failed '+JSON.stringify({face,first,metrics:s.metrics,projectiles:s.projectiles.length}));
    return{face,sourceSpeed:m.speed,gravity:m.gravity,fuse:m.fuse,declaredCount:m.count,actualExplosions:s.metrics.explosion,firstBlast:first,projectilesAfterBound:0,sourcePointsUnchanged:true};
  };
  window.__pub8RavenFirstBlast=(face)=>{
    const s=window.__pub8Start('core__raging_raven',face);s.a.x=face===1?380:900;s.b.x=face===1?1200:80;A.engine.start(s,s.a,'super');
    for(let i=0;i<200;i++){window.__pub8Step(s,1);if(s.fx.some(x=>x.kind==='blast')){clear();A.draw();return{face,frame:s.frame,actualExplosion:s.fx.find(x=>x.kind==='blast')};}}
    throw Error('No bounded real explosion for screenshot');
  };
  window.__pub8WolfBodyCharge=(face)=>{
    const s=window.__pub8Start('core__crying_wolf',face);s.b.x=s.a.x+face*105;const life=s.b.life,x=s.a.x,r=s.a.r,m=s.a.f.combat.moves.specialDown;
    if(m.kind!=='melee'||m.projectileOrigin||cat.core__crying_wolf.actionMap.specialDown!=='heavy')throw Error('Wolf body charge incorrectly bound to railgun emission');
    if(!A.engine.start(s,s.a,'specialDown'))throw Error('Wolf real body charge refused');window.__pub8Step(s,m.startup+m.active+m.recovery);clear();A.draw();
    if(s.metrics.projectile||s.projectiles.length||s.b.life>=life)throw Error('Wolf charge did not make actual melee contact or emitted projectile');
    near(s.a.x-x,face*m.travel*m.active,'Wolf actual bounded body travel');near(s.a.r,r-m.cost,'Wolf real charge cost');
    return{face,sourceAction:'heavy',actualTravel:s.a.x-x,damage:life-s.b.life,cost:r-s.a.r,projectiles:0,measuredDeployMuzzleInactive:true};
  };
  window.__pub8Support=(uid,face)=>{
    const rows=[];
    for(const slot of ['special','specialDown','specialForward','specialBack','super','utility']){
      const s=window.__pub8Start(uid,face),m=s.a.f.combat.moves[slot];s.b.x=s.a.x+face*200;const x=s.a.x,life=s.a.life,otherLife=s.b.life;s.a.r=70;
      if(m.damage!==0||['projectile','trap','beam'].includes(m.kind)||!A.engine.start(s,s.a,slot))throw Error('Narrative support received offensive special '+uid+' '+slot);
      const input=slot==='specialDown'?{...empty(),right:face===1,left:face===-1}:null;
      window.__pub8Step(s,m.startup+m.active+m.recovery+2,input);clear();A.draw();
      if(s.a.life!==life||s.b.life!==otherLife||s.metrics.projectile||s.projectiles.length||s.traps.length||s.events.some(e=>['damage','explosion','emp','heal'].includes(e.type)))throw Error('Narrative support emitted offensive/healing special');
      if(m.kind==='recover')near(s.a.x,x,'Support stationary reserve recovery');
      if(slot==='specialDown'&&!s.events.some(e=>e.type==='observe'))throw Error('Actual visible movement observation absent');
      rows.push({slot,name:m.name,kind:m.kind,healthUnchanged:true,opponentHealthUnchanged:true,projectiles:0,actualTravel:s.a.x-x,reserve:s.a.r,observeEvents:s.events.filter(e=>e.type==='observe').length});
    }
    const s=window.__pub8Start(uid,face);clear();A.draw();const label=s.a.f.combat.resource.label,compact=matchMedia('(max-width:760px)').matches;
    if(compact){const node=document.querySelector('[data-player="0"] [data-hud="resourceLabel"]');if(node?.textContent!==label)throw Error('Actual support DOM HUD label differs');}
    else if(!window.__pub8Texts.some(t=>t.text.includes(label)))throw Error('Actual support Canvas HUD label absent');
    return{uid,face,simulation:true,sourceHUDLabel:label,actualHUD:compact?'DOM':'Canvas',rows,bonusNormalMeleeNotClaimedCanonical:true};
  };
  return true;
})();
