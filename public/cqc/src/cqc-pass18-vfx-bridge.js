/* PASS18 draw-only VFX bridge. Whole source PNGs remain unchanged.
 * No simulation, collision, timing, damage, resource, replay or RNG writes.
 * Source sizes and animation phase timing are CQC adaptations, not original-game claims.
 */
(function(root){'use strict';
 const copy=value=>JSON.parse(JSON.stringify(value));
 function createRenderer(options={}){
  const catalog=options.catalog||root.CQC_PASS18_VFX_CATALOG,ImageType=options.Image||root.Image,
   scriptURL=options.scriptURL||root.document?.currentScript?.src;
  if(!catalog||catalog.schema!=='cqc.pass18.vfx-catalog/1'||catalog.absolute1to1Certified!==false||catalog.physicsMutation!==false)throw Error('Invalid PASS18 VFX catalogue');
  const images=new Map(),effectIds=Object.keys(catalog.effects),seenFrames=new Map(),counts={nativeDraws:0,suppressedPending:0,failedFallbacks:0,invalidRequests:0,projectile:0,coreProjectile:0,bossProjectile:0,effect:0,melee:0,muzzle:0,hazard:0};
  let lastSelection=null;
  for(const id of effectIds){const a=catalog.effects[id];
   if(!/^assets\/vfx-pass18\/[a-z0-9-]+\.png$/.test(a.file)||!/^[a-f0-9]{64}$/.test(a.sha256)||
     !Number.isInteger(a.width)||!Number.isInteger(a.height)||a.width<1||a.height<1||a.width>4096||a.height>4096||
     !Array.isArray(a.frames)||a.frames.length!==4||!Number.isFinite(a.sourceScaleReferenceWidth)||a.sourceScaleReferenceWidth<1||
     !Number.isFinite(a.displayWidth)||a.displayWidth<=0||a.displayWidth>320||a.absolute1to1Certified!==false)throw Error('Invalid native VFX effect '+id);
   for(const f of a.frames){const r=f.rect,p=f.pivot;if(!Array.isArray(r)||r.length!==4||!r.every(Number.isFinite)||r[0]<0||r[1]<0||r[2]<=0||r[3]<=0||r[0]+r[2]>a.width||r[1]+r[3]>a.height||!Array.isArray(p)||p.length!==2||!p.every(n=>Number.isFinite(n)&&n>=0&&n<=1))throw Error('Invalid native VFX frame '+id);}
   if(!images.has(a.file))images.set(a.file,{file:a.file,width:a.width,height:a.height,sha256:a.sha256,url:scriptURL?new URL('../'+a.file,scriptURL).href:a.file,image:null,status:'not-requested',promise:null});
  }
  function request(item,retry=false){
   if(!item)return Promise.resolve(false);if(item.status==='ready')return Promise.resolve(true);
   if(item.promise&&item.status==='loading')return item.promise;
   if(!retry&&['failed','invalid-dimensions','unavailable'].includes(item.status))return Promise.resolve(false);
   if(typeof ImageType!=='function'){item.status='unavailable';return Promise.resolve(false);}
   item.status='loading';
   item.promise=new Promise(resolve=>{
    let done=false;const image=new ImageType();item.image=image;
    const finish=ok=>{if(done)return;done=true;clearTimeout(timer);resolve(ok);};
    const timer=setTimeout(()=>{if(!done){item.status='failed';finish(false);}},20000);
    image.onload=()=>{if(done)return;if(image.naturalWidth!==item.width||image.naturalHeight!==item.height){item.status='invalid-dimensions';finish(false);return;}
     Promise.resolve(typeof image.decode==='function'?image.decode():undefined).then(()=>{if(done)return;item.status='ready';finish(true);}).catch(()=>{if(!done){item.status='failed';finish(false);}});};
    image.onerror=()=>{if(!done){item.status='failed';finish(false);}};
    image.src=item.url;
   });return item.promise;
  }
  function phaseIndex(age,opts={},duration){if(opts.reducedMotion)return 1;
   const n=Number.isFinite(age)?Math.max(0,age):0;return duration?Math.min(3,Math.floor(n/Math.max(1,duration)*4)):Math.floor(n/4)%4;
  }
  function paint(c,id,age=0,scale=1,opts={},duration){
   const a=catalog.effects[id];if(!a)return false;
   if(!c||typeof c.drawImage!=='function'||!Number.isFinite(scale)||scale<=0||scale>6){counts.invalidRequests++;return false;}
   const item=images.get(a.file);
   if(item.status==='not-requested')void request(item);
   // A pending native source is handled without a one-frame procedural substitute.
   if(['not-requested','loading'].includes(item.status)){counts.suppressedPending++;return true;}
   if(item.status!=='ready'){counts.failedFallbacks++;return false;}
   const index=phaseIndex(age,opts,duration),frame=a.frames[index],[x,y,w,h]=frame.rect,
    unit=a.displayWidth/a.sourceScaleReferenceWidth*scale,dw=w*unit,dh=h*unit;
   c.save();
   // Bright artwork remains localized; noFlash dims it instead of replacing it with flashes.
   if(a.bright&&opts.noFlash!==false)c.globalAlpha*=.46;
   if(a.bright&&opts.reducedMotion)c.globalAlpha*=.78;
   c.drawImage(item.image,x,y,w,h,-dw*frame.pivot[0],-dh*frame.pivot[1],dw,dh);c.restore();
   counts.nativeDraws++;seenFrames.set(id,(seenFrames.get(id)||0)|(1<<index));
   lastSelection={effect:id,frame:index,file:a.file,sha256:a.sha256,rect:frame.rect,display:[dw,dh]};return true;
  }
  function filesFor(fighters=[],opts={}){
   const list=Array.isArray(fighters)?fighters:[fighters],ids=new Set(['cqc-impact','guard-impact','metal-hit','dust-plume','explosion','steel-slash']);
   if(opts.engine==='core'||opts.boss){
    // Core boss scripts use several external projectile kinds. The bounded eight-atlas pool
    // is decoded before launch so an authored encounter can switch weapon phases safely.
    if(opts.boss||!list.length)for(const id of effectIds)ids.add(id);
    else for(const kind of Object.keys(catalog.coreKinds))ids.add(catalog.coreKinds[kind]);
   }else for(const f of list){const uid=typeof f==='string'?f:f?.uid||f?.f?.uid;
    for(const id of catalog.versusFighterEffects[uid]||[])ids.add(id);
    const actor=typeof f==='object'?f:null;
    if(actor?.combat?.moves)for(const m of Object.values(actor.combat.moves))if(catalog.fxTags[m.tag])ids.add(catalog.fxTags[m.tag]);
   }
   // HUD-only simulation/support moves retain their UI; these are source files, not state.
   ids.add('muzzle-flash');ids.add('chaff-cloud');ids.add('hf-blue-slash');ids.add('hf-red-slash');ids.add('jet-exhaust');
   const files=new Set([...ids].map(id=>catalog.effects[id]?.file).filter(Boolean));
   return [...files];
  }
  function readiness(fighters=[],opts={}){const files=filesFor(fighters,opts),companion=root.CQC_PASS18_COMPANION_VFX?.readiness(fighters,opts);return{ready:files.every(file=>images.get(file).status==='ready')&&(!companion||companion.ready),files,atlasCount:files.length,decodedPixelBytes:files.reduce((n,file)=>{const a=images.get(file);return n+a.width*a.height*4;},0),companion};}
  function whenReady(fighters=[],opts={}){return Promise.all([...filesFor(fighters,opts).map(file=>request(images.get(file),!!opts.retry)),root.CQC_PASS18_COMPANION_VFX?.whenReady(fighters,opts)??true]).then(results=>results.every(Boolean));}
  function versusEffect(q){const d=q?.def,r=catalog.versusMoveEffects[d?.id];
   if(!r||d.kind!=='projectile'||d.tag!==r.tag||q.dead||q.delay>0||!Number.isFinite(q.x)||!Number.isFinite(q.y))return null;
   return r.effect;
  }
  function drawProjectile(c,q,zoom=1,owner,opts={}){
   const id=versusEffect(q);if(!id)return false;
   c.save();if(!opts.rotationHandled)c.rotate(Math.atan2(q.vy||0,q.vx||0));
   const ok=paint(c,id,q.age,zoom,opts);c.restore();if(ok)counts.projectile++;return ok;
  }
  function coreEffect(p,owner){
   if(!p||p.hit||p.dead||p.delay>0||!Number.isFinite(p.x)||!Number.isFinite(p.y))return null;
   if(p.exploding)return'explosion';
   const id=owner?.id||owner?.f?.id||'',name=p.move||'';
   if(p.kind==='bullet'){
    if(/snipe|precision|quietShot|crying|wolf|theEnd|tranqSnipe/i.test(name+' '+id))return'sniper-tracer';
    if(/socom|pistol|mauser|revolver|bankShot|meryl|olga|ocelot|acPistol/i.test(name+' '+id))return'pistol-tracer';
   }
   if(p.kind==='debris'&&/mantis|tretij/.test(id))return'telekinetic-fragment';
   if(p.kind==='puppet'&&/screaming|mantis/.test(id))return'mantis-doll';
   if(p.kind==='grenade'&&/mg1|mg2/.test(id))return'pineapple-grenade';
   return catalog.coreKinds[p.kind]||null;
  }
  function drawCoreProjectile(c,p,owner,opts={}){
   const id=coreEffect(p,owner);if(!id)return false;
   const visualY=p.exploding?(p.kind==='zgGrenade'?Math.max(87,p.y):p.kind==='zgMine'?75:65):p.y;
   c.save();c.translate(p.x,-visualY);if(!catalog.effects[id].grounded&&!p.exploding)c.rotate(Math.atan2(-(p.vy||0),p.vx||1));
   const scale=p.kind==='puppet'?3:1,age=p.exploding?Math.max(0,9-p.exploding):p.age??(opts.time||0)*60;
   const ok=paint(c,id,age,scale,opts,p.exploding?9:undefined);c.restore();if(ok)counts.coreProjectile++;return ok;
  }
  function drawBossProjectile(c,p,opts={}){
   if(!p||p.dead||p.hit||p.delay>0||p.ttl<=0||p.life<=0||!Number.isFinite(p.x)||!Number.isFinite(p.y))return false;
   const kind=p.kind||p.type||opts.kind,id=catalog.bossKinds[kind]||(kind==='rocket'?'stinger-missile':null);
   if(!id)return false;const flipY=opts.coordinateY==='down'?1:-1;
   c.save();c.translate(p.x,flipY*p.y);if(!catalog.effects[id].grounded)c.rotate(Math.atan2(flipY*(p.vy||0),p.vx||1));
   const ok=paint(c,id,p.age??(opts.time||0)*60,opts.scale||1,opts);c.restore();if(ok)counts.bossProjectile++;return ok;
  }
  function effectFor(f){
   if(f?.kind==='text')return null;
   if(f?.kind==='blast'||f?.type==='explosion'||f?.type==='shieldBlast')return'explosion';
   if(f?.kind==='guard'||['block','parry','justguard','deflect','throwtech','bladeParry','fieldDeflect','objectiveImmune'].includes(f?.type))return'guard-impact';
   if(['shatter','armor','nanoArmor','shieldCut','disarm'].includes(f?.type))return'metal-hit';
   if(['teleport','splitEvade','nanoRepair'].includes(f?.type))return'stealth-distortion';
   return catalog.fxTags[f?.tag]||'cqc-impact';
  }
  function drawFX(c,f,x,y,zoom=1,opts={}){
   const id=effectFor(f);if(!id||![x,y,zoom].every(Number.isFinite))return false;
   const age=f.max!==undefined?f.max-f.t:Math.max(0,(.65-(f.life||0))*60),duration=f.max||39;
   c.save();c.translate(x,y);const ok=paint(c,id,age,zoom,opts,duration);c.restore();if(ok)counts.effect++;return ok;
  }
  function drawCoreFX(c,f,x,y,opts={}){return drawFX(c,f,x,y,1,opts);}
  function drawGroundMark(c,mark,stage,opts={}){
   if(!Number.isFinite(mark?.x)||!Number.isFinite(mark?.life))return false;
   const id=stage?.template==='snow'?'snow-impact':stage?.template==='water'?'water-impact':'dust-plume';
   c.save();c.translate(mark.x,0);const ok=paint(c,id,(2.5-mark.life)*60,1,opts,150);c.restore();if(ok)counts.effect++;return ok;
  }
  function drawMelee(c,actor,move,phase=0,zoom=1,opts={}){
   if(!move||move.kind!=='melee'||move.level==='throw')return false;
   const uid=actor?.f?.uid||actor?.uid||'',tag=move.tag;
   let id=tag==='tentacle'?'tentacle-motion':tag==='electric'?'electrical-contact':tag==='fire'?'fire-projectile':
    ['blade','knife','machete','spear'].includes(tag)?(/sam/.test(uid)?'hf-red-slash':/raiden.*mgr|blade_wolf|wolf_robot/.test(uid)?'hf-blue-slash':'steel-slash'):'cqc-impact';
   if(/blade_wolf/.test(uid)&&tag==='blade')id='chainsaw-sparks';
   c.save();c.translate((move.reach||0)*.45*zoom,0);const ok=paint(c,id,Math.max(0,Math.min(1,phase))*24,zoom,opts,24);c.restore();if(ok)counts.melee++;return ok;
  }
  function drawMuzzle(c,actor,move,age,zoom=1,opts={}){
   if(!actor||!move||move.kind!=='projectile'||!['ballistic','precision','tranq'].includes(move.tag)||!Number.isFinite(age)||age<0||age>8)return false;
   const pos=opts.position,face=actor.face||actor.facing||1;
   if(!pos||![pos.x,pos.y].every(Number.isFinite))return false;
   const origin=opts.visualOrigin||move.projectileOrigin?.[face],forward=origin?.forward??52,height=origin?.height??move.height??140;
   c.save();c.translate(pos.x+face*forward*zoom,pos.y-height*zoom);c.scale(face,1);const ok=paint(c,'muzzle-flash',age,zoom,opts,8);c.restore();if(ok)counts.muzzle++;return ok;
  }
  function drawAt(c,id,x,y,age=0,scale=1,opts={}){
   if(![x,y].every(Number.isFinite))return false;c.save();c.translate(x,y);if(Number.isFinite(opts.angle))c.rotate(opts.angle);const ok=paint(c,id,age,scale,opts);c.restore();return ok;
  }
  function drawBeam(c,from,to,id='fortune-rail',age=0,opts={}){
   if(!from||!to||![from.x,from.y,to.x,to.y].every(Number.isFinite))return false;const a=catalog.effects[id];if(!a)return false;
   const dx=to.x-from.x,dy=to.y-from.y,length=Math.hypot(dx,dy);if(length<=0||length>2400)return false;const item=images.get(a.file);
   if(item.status==='not-requested')void request(item);if(['not-requested','loading'].includes(item.status)){counts.suppressedPending++;return true;}if(item.status!=='ready')return false;
   const index=phaseIndex(age,opts),[x,y,w,h]=a.frames[index].rect,height=Math.max(2,Math.min(40,opts.width||10));
   c.save();c.translate(from.x,from.y);c.rotate(Math.atan2(dy,dx));if(a.bright&&opts.noFlash!==false)c.globalAlpha*=.46;if(a.bright&&opts.reducedMotion)c.globalAlpha*=.78;
   c.drawImage(item.image,x,y,w,h,0,-height/2,length,height);c.restore();counts.nativeDraws++;seenFrames.set(id,(seenFrames.get(id)||0)|(1<<index));return true;
  }
  function drawHazard(c,h,opts={}){
   // Preparation markers/hit-area outlines stay in their original renderer.
   if(!h||h.active===false||h.warning||h.delay>0||!Number.isFinite(h.x)||!Number.isFinite(h.y))return false;
   const id=catalog.bossKinds[h.kind||h.type];if(!id)return false;
   c.save();c.translate(h.x,(opts.coordinateY==='down'?1:-1)*h.y);const ok=paint(c,id,h.age??(opts.time||0)*60,opts.scale||1,opts);c.restore();if(ok)counts.hazard++;return ok;
  }
  function boxHazardEffect(h,opts={}){
   if(opts.episode==='mgr'){
    // MGR RAY mouth emission is hot orange/white in the source capture. Other
    // shared laser colors are CQC presentation adaptations pending shot references.
    if(h.id==='plasma')return'fire-projectile';
    if(['core-laser','laser-zone'].includes(h.id))return'red-laser';
    if(['missile-explosion','core-zone'].includes(h.id))return'explosion';
    if(['blade-sweep','tail'].includes(h.id))return'steel-slash';
    if(['stomp','leg-stomp','ram','shock','ground-wave','core-wave'].includes(h.id))return'dust-plume';
   }else if(opts.episode==='acid'){
    if(h.rail||opts.attackKind==='rail')return'heavy-rail';
    if(h.type==='line'&&['laser','sweep'].includes(opts.attackKind))return'red-laser';
    if(opts.attackKind==='plasma')return'fire-projectile';
    if(h.type==='wave'||['stomp','wave'].includes(opts.attackKind))return'dust-plume';
    if(opts.attackKind==='zones')return'explosion';
   }return null;
  }
  function drawBoxHazard(c,h,opts={}){
   // Replace only active material. Warning fills, rectangular hit-area outlines,
   // telegraph phase, damage and encounter state remain in the episode renderer.
   if(!h||h.warn>0||h.t>0||h.warning||h.delay>0||h.active===false||h.active<=0||
    ![h.x,h.y,h.w,h.h].every(Number.isFinite)||h.w<=0||h.h<=0||h.w>2400||h.h>1200)return false;
   const id=boxHazardEffect(h,opts),a=catalog.effects[id];if(!a)return false;
   const age=h.age??(opts.time||0)*60;
   if(h.w>h.h*2){const ok=drawBeam(c,{x:h.x,y:h.y+h.h/2},{x:h.x+h.w,y:h.y+h.h/2},id,age,{...opts,width:Math.min(40,h.h)});if(ok)counts.hazard++;return ok;}
   const item=images.get(a.file);if(item.status==='not-requested')void request(item);
   if(['not-requested','loading'].includes(item.status)){counts.suppressedPending++;return true;}if(item.status!=='ready')return false;
   const index=phaseIndex(age,opts),[x,y,w,height]=a.frames[index].rect,unit=Math.min(h.w/w,h.h/height),dw=w*unit,dh=height*unit;
   c.save();if(a.bright&&opts.noFlash!==false)c.globalAlpha*=.46;if(a.bright&&opts.reducedMotion)c.globalAlpha*=.78;
   c.drawImage(item.image,x,y,w,height,h.x+(h.w-dw)/2,h.y+(h.h-dh)/2,dw,dh);c.restore();
   counts.nativeDraws++;counts.hazard++;seenFrames.set(id,(seenFrames.get(id)||0)|(1<<index));return true;
  }
  let pending=null,dialog=null,focusBefore=null,launchSerial=0;
  function ensureDialog(){
   if(dialog||!root.document?.createElement)return dialog;
   const d=root.document.createElement('div');d.hidden=true;d.setAttribute('role','dialog');d.setAttribute('aria-modal','true');d.setAttribute('aria-labelledby','cqc-pass18-effects-message');
   d.style.cssText='position:fixed;inset:0;z-index:9998;display:none;place-items:center;background:#061013e8;padding:24px';
   const box=root.document.createElement('div');box.style.cssText='width:min(420px,100%);background:#102327;border:1px solid #849684;padding:24px;color:#ecebdc';
   const message=root.document.createElement('p');message.id='cqc-pass18-effects-message';message.setAttribute('role','status');message.setAttribute('aria-live','polite');
   const retry=root.document.createElement('button');retry.type='button';retry.textContent='Réessayer';retry.hidden=true;retry.style.marginRight='12px';
   const cancel=root.document.createElement('button');cancel.type='button';cancel.textContent='Annuler';
   retry.addEventListener('click',()=>{if(pending)beginLaunch(pending,true);});cancel.addEventListener('click',cancelPendingLaunch);
   d.addEventListener('keydown',event=>{
    event.stopPropagation();if(event.key==='Escape'){event.preventDefault();cancelPendingLaunch();}
    if(event.key==='Tab'){const buttons=retry.hidden?[cancel]:[retry,cancel],first=buttons[0],last=buttons[buttons.length-1];
     if(!buttons.includes(root.document.activeElement)){event.preventDefault();(event.shiftKey?last:first).focus();}
     else if(event.shiftKey&&root.document.activeElement===first){event.preventDefault();last.focus();}
     else if(!event.shiftKey&&root.document.activeElement===last){event.preventDefault();first.focus();}}
   });box.append(message,retry,cancel);d.append(box);root.document.body.append(d);dialog={node:d,message,retry,cancel};return dialog;
  }
  function hideDialog(restore=false){if(dialog){dialog.node.hidden=true;dialog.node.style.display='none';}if(restore&&focusBefore?.isConnected)focusBefore.focus?.();focusBefore=null;}
  function showDialog(error=false){const d=ensureDialog();if(!d)return;d.node.hidden=false;d.node.style.display='grid';d.message.textContent=error?'Effets indisponibles. Réessayez.':'Préparation du combat…';d.retry.hidden=!error;(error?d.retry:d.cancel).focus();}
  function cancelPendingLaunch(){if(pending)pending.cancelled=true;pending=null;++launchSerial;hideDialog(true);}
  async function beginLaunch(ticket,retry=false){
   if(ticket.cancelled||pending!==ticket)return;const attempt=++ticket.attempt;showDialog(false);
   let ready=false;try{ready=await whenReady(ticket.uids,{engine:'core',boss:ticket.boss,retry});}catch{}
   if(ticket.cancelled||pending!==ticket||attempt!==ticket.attempt)return;
   if(ready&&readiness(ticket.uids,{engine:'core',boss:ticket.boss}).ready){pending=null;hideDialog(false);ticket.resume(ticket.options);}else showDialog(true);
  }
  function deferCoreLaunch(options,resume){
   if(!options||typeof resume!=='function')return false;const key=JSON.stringify(options),uids=[options.player,options.opponent].filter(Boolean),boss=options.mode==='boss'||!!options.encounter;
   if(pending){if(pending.key===key)return true;cancelPendingLaunch();}
   if(readiness(uids,{engine:'core',boss}).ready)return false;
   focusBefore=root.document?.activeElement||null;const ticket={number:++launchSerial,key,uids,boss,options:{...options},resume,cancelled:false,attempt:0};pending=ticket;void beginLaunch(ticket);return true;
  }
  function cancelOnNewIntent(options){if(pending&&pending.key!==JSON.stringify(options))cancelPendingLaunch();}
  root.addEventListener?.('pagehide',cancelPendingLaunch);
  root.document?.addEventListener?.('change',event=>{if(pending&&['SELECT','INPUT'].includes(event.target?.tagName))cancelPendingLaunch();},true);

  return {deferCoreLaunch,cancelPendingLaunch,cancelOnNewIntent,pendingState:()=>pending?{uids:[...pending.uids],attempt:pending.attempt,cancelled:pending.cancelled}:null,whenReady,readiness,readyFor:(fighters,opts)=>readiness(fighters,opts).ready,drawProjectile,drawCoreProjectile,drawBossProjectile,drawFX,drawCoreFX,drawGroundMark,drawMelee,drawMuzzle,drawHazard,drawBoxHazard,boxHazardEffect,drawAt,drawBeam,
   effectFor,versusEffect,coreEffect,paint,createRenderer,
   diagnostics:()=>({version:18,counts:{...counts},effects:effectIds.length,nativeSourceFrames:effectIds.length*4,atlases:[...images.values()].map(a=>({file:a.file,url:a.url,status:a.status,sha256:a.sha256})),
    selectedFrames:Object.fromEntries([...seenFrames].map(([id,bits])=>[id,[0,1,2,3].filter(i=>bits&(1<<i))])),lastSelection:copy(lastSelection),absolute1to1Certified:false,physicsMutation:false,
    pendingPolicy:'Native pending is handled without procedural flash; existing match loader awaits decode.',failurePolicy:'Retained procedural renderer only after actual source load/decode failure.'})};
 }
 const api=createRenderer();root.CQC_PASS18_VFX=api;if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
