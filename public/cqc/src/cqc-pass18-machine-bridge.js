/* PASS18 native machine presentation. Engines retain all combat and save state. */
(function(root,factory){'use strict';const api=factory(root);if(typeof module==='object'&&module.exports)module.exports=api;if(root.document)root.CQC_PASS18_MACHINE_BRIDGE_FACTORY=api;if(root.document)root.CQC_PASS18_MACHINES=api.createBridge({rendererOptions:root.CQC_PASS18_MACHINE_RENDERER_OPTIONS||{}});})(typeof globalThis!=='undefined'?globalThis:this,function(root){
 'use strict';
 const finite=(v,d=0)=>Number.isFinite(v)?v:d,clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
 const validBox=box=>!!box&&[box.x,box.y,box.width,box.height].every(Number.isFinite)&&box.width>0&&box.height>0;
 function createBridge(deps={}){
  const data=deps.data||root.CQC_PASS18_MACHINE_DATA,catalog=deps.catalog||root.CQC_MACHINE_PARTS_CATALOG,parts=deps.parts||root.CQC_MACHINE_PARTS;
  let registry=deps.registry||null,definitions=null,initializationError=null,launch=null,serial=0,activeLoads=0;
  const playableKO=new WeakMap();
  const loads=new Map(),queue=[],errors=new Map(),lru=new Map(),protectUntil=new Map(),portraits=new WeakMap(),previewRequests=new WeakMap(),destroyTimes=new WeakMap();
  let pumpTimer=null,pumpEpoch=0;const schedule=deps.setTimeout||root.setTimeout?.bind(root),cancelTimer=deps.clearTimeout||root.clearTimeout?.bind(root);
  const now=deps.now||(()=>Date.now()),maxRigs=deps.maxRigs||8,maxBytes=deps.maxDecodedBytes||96*1024*1024,concurrency=deps.concurrency||2;
  try{if(!data||!parts||!catalog)throw Error('Sources machine indisponibles');definitions=parts.normalizeCatalog(catalog);if(!registry)registry=parts.create(catalog,deps.rendererOptions||{});}catch(e){initializationError=String(e.message||e);}
  function reduced(){if(deps.reducedMotion)return deps.reducedMotion();return!!root.matchMedia?.('(prefers-reduced-motion: reduce)').matches||root.document?.documentElement?.classList.contains('cqc-reduced-motion')||root.document?.body?.classList.contains('reduced-motion');}
  function physical(uid,face=-1){const pair=data?.playable?.[typeof uid==='object'?uid.uid:uid];return pair?pair[face===1?1:0]:definitions?.has(uid)?uid:null;}
  function has(uid){return Object.hasOwn(data?.playable||{},typeof uid==='object'?uid.uid:uid);}
  function hasComposite(uid){return has(uid)||(typeof uid==='object'?uid.uid:uid)==='core__cunningham';}
  function estimated(id){return Array.from(definitions?.get(id)?.sources.values()||[]).reduce((n,s)=>n+s.width*s.height*4,0);}
  function nativeStatus(id){if(initializationError)return{id,state:'error',error:initializationError,pins:[]};const s=registry?.status(id)||{id,state:'missing',pins:[]};return errors.has(id)?{...s,state:'error',error:errors.get(id)}:loads.has(id)&&s.state==='missing'?{...s,state:'queued'}:s;}
  function ready(id){return!!registry?.ready(id)&&!initializationError;}
  function touch(id,keep=0){lru.delete(id);lru.set(id,now());if(keep)protectUntil.set(id,Math.max(protectUntil.get(id)||0,now()+keep));}
  function trim(){let bytes=Array.from(lru.keys()).reduce((n,id)=>n+(ready(id)?estimated(id):0),0),count=Array.from(lru.keys()).filter(ready).length;
   for(const id of Array.from(lru.keys())){if(count<=maxRigs&&bytes<=maxBytes)break;if((protectUntil.get(id)||0)>now()||loads.has(id))continue;if(ready(id)){registry.dispose(id);bytes-=estimated(id);count--;}lru.delete(id);protectUntil.delete(id);}
  }
  const reservations=new Map();
  function reserve(id){if(reservations.has(id))return false;let bytes=Array.from(lru.keys()).reduce((n,key)=>n+(ready(key)?estimated(key):0),0)+Array.from(reservations.values()).reduce((a,b)=>a+b,0),count=Array.from(lru.keys()).filter(ready).length+reservations.size;
   const required=estimated(id);for(const key of Array.from(lru.keys())){if(bytes+required<=maxBytes&&count+1<=maxRigs)break;if(!ready(key)||key===id||reservations.has(key)||(protectUntil.get(key)||0)>now())continue;registry.dispose(key);bytes-=estimated(key);count--;lru.delete(key);protectUntil.delete(key);}
   if(bytes+required>maxBytes||count+1>maxRigs)return false;reservations.set(id,required);return true;}
  function schedulePump(){if(pumpTimer!==null||!queue.length||!schedule)return;const protectedExpiry=Array.from(lru.keys()).filter(ready).map(id=>protectUntil.get(id)||0).filter(t=>t>now());const wait=protectedExpiry.length?Math.max(16,Math.min(1200,Math.min(...protectedExpiry)-now()+1)):120;const epoch=pumpEpoch;pumpTimer=schedule(()=>{pumpTimer=null;if(epoch!==pumpEpoch)return;trim();pump();},wait);pumpTimer?.unref?.();}
  function promote(job){const index=queue.indexOf(job);if(index>0){queue.splice(index,1);queue.unshift(job);}}
  function pump(){while(activeLoads<concurrency&&queue.length){const job=queue[0];if(loads.get(job.id)!==job){queue.shift();continue;}if(!reserve(job.id)){schedulePump();break;}queue.shift();activeLoads++;(async()=>{
    try{await registry.load(job.id,{signal:job.controller.signal,reload:job.retry});if(job.controller.signal.aborted||loads.get(job.id)!==job){registry.dispose(job.id);return;}errors.delete(job.id);touch(job.id,1200);job.resolve(nativeStatus(job.id));}
    catch(e){if(!job.controller.signal.aborted)errors.set(job.id,String(e.message||e));job.reject(e);}
    finally{if(loads.get(job.id)===job)loads.delete(job.id);reservations.delete(job.id);activeLoads--;queueMicrotask(()=>{trim();pump();});}
   })();}}
  function ensure(id,{retry=false,protect=0}={}){if(!id||!definitions?.has(id))return Promise.reject(Error('Machine inconnue'));if(protect)protectUntil.set(id,Math.max(protectUntil.get(id)||0,now()+protect));if(ready(id)){touch(id,protect);return Promise.resolve(nativeStatus(id));}if(loads.has(id)){const existing=loads.get(id);if(protect){promote(existing);pump();}return existing.promise;}if(initializationError)return Promise.reject(Error(initializationError));if(errors.has(id)&&!retry)return Promise.reject(Error(errors.get(id)));const job={id,retry,controller:new AbortController(),promise:null,resolve:null,reject:null};if(retry){errors.delete(id);registry.dispose(id);}job.promise=new Promise((resolve,reject)=>{job.resolve=resolve;job.reject=reject;});job.promise.catch(()=>{});loads.set(id,job);if(protect)queue.unshift(job);else queue.push(job);pump();return job.promise;}
  async function whenReady(uid,options={}){let ids=[],body=[];for(const value of Array.isArray(uid)?uid:[uid]){if(value==='core__cunningham'){ids.push('cunningham_hover_platform_mpo2006');body.push(value);}else if(data?.playable?.[value])ids.push(...(options.face===1||options.face===-1?[physical(value,options.face)]:data.playable[value]));else if(definitions?.has(value))ids.push(value);}ids=[...new Set(ids)];if(!ids.length)return true;try{const results=await Promise.all([...ids.map(id=>ensure(id,{retry:options.retry===true,protect:12000})),...body.map(value=>root.CQC_COMBAT_SPRITES?.whenReady?.(value,options)||Promise.resolve(false))]);return ids.every(ready)&&results.slice(ids.length).every(v=>v===true);}catch(_){return false;}}
  function bossId(id,engine='arsenal'){return engine==='mgr'?data?.mgr?.[id]:data?.arsenal?.[id];}
  function whenReadyBoss(id,engine='arsenal'){const mapped=bossId(id,engine);return mapped?whenReady(mapped):Promise.resolve(true);}
  function placeholder(ctx,box,failed=false){ctx.save();try{ctx.fillStyle='#091b21';ctx.fillRect(box.x,box.y,box.width,box.height);ctx.strokeStyle='#4b6865';ctx.lineWidth=1;ctx.strokeRect(box.x+1,box.y+1,box.width-2,box.height-2);ctx.textAlign='center';ctx.fillStyle='#b6cec1';ctx.font=Math.max(9,Math.min(14,box.height/12))+'px system-ui,sans-serif';ctx.fillText(failed?'DOSSIER INACCESSIBLE':'LIAISON TACTIQUE…',box.x+box.width/2,box.y+box.height/2);}finally{ctx.restore();}}
  function neutralBounds(id){const machine=definitions?.get(id);if(!machine)return null;if(root.CQC_PASS28_MACHINE_GEOMETRY)return root.CQC_PASS28_MACHINE_GEOMETRY.bounds(machine,parts);const poses=parts.pose(machine,{origin:[0,0],channels:{},flags:{},reducedMotion:true});let left=Infinity,top=Infinity,right=-Infinity,bottom=-Infinity;for(const p of poses.values()){if(!p.visible||p.opacity<=0)continue;const source=machine.sources.get(p.source),r=p.rect||[0,0,source.width,source.height],angle=(p.textureRotation||0)*Math.PI/180,c=Math.cos(angle),sn=Math.sin(angle);for(const [u,v]of [[0,0],[r[2],0],[r[2],r[3]],[0,r[3]]]){const a=(u-p.pivot[0])*p.imageScale,b=(v-p.pivot[1])*p.imageScale,x=a*c-b*sn,y=a*sn+b*c,m=p.matrix,px=m[0]*x+m[2]*y+m[4],py=m[1]*x+m[3]*y+m[5];left=Math.min(left,px);right=Math.max(right,px);top=Math.min(top,py);bottom=Math.max(bottom,py);}}return{left,top,right,bottom,width:right-left,height:bottom-top};}
  const boundsCache=new Map();function bounds(id){if(!boundsCache.has(id))boundsCache.set(id,neutralBounds(id));return boundsCache.get(id);}
  function animation(pose={},hp=[],mapped=null,adapt=true){pose=pose&&typeof pose==='object'?pose:{};
   // Versus supplies booleans and a move slot; preserve explicit action callers.
   if(typeof pose.action!=='string'||!pose.action){
    const dead=pose.defeated===true||pose.ko===true,hit=pose.hit===true,locomotion=pose.moveKind==='mobility',parry=pose.moveKind==='parry',
     attacking=!dead&&!hit&&!locomotion&&!parry&&(pose.attacking===true||pose.attack===true),walking=!dead&&!hit&&(!pose.animationActive||locomotion)&&pose.walk===true,
     slot=typeof pose.moveSlot==='string'&&/^(light|heavy|special|super)$/.test(pose.moveSlot)?pose.moveSlot:'attack';
    pose={...pose,action:dead?'dead':hit?'hurt':attacking?slot:walking?'walk':pose.guard===true?'guard':pose.crouch===true?'crouch':pose.jump===true?'jump':'idle',
     defeated:pose.defeated??dead,attacking:pose.attacking??attacking};
   }
   if(Object.hasOwn(root.CQC_PASS19_GEKKO_DATA?.states||{},mapped)&&root.CQC_PASS19_GEKKO_POSES?.pose){const native=root.CQC_PASS19_GEKKO_POSES.pose(mapped,{...pose,action:pose.defeated?'dead':pose.action,reducedMotion:reduced()});hp.forEach((value,index)=>{if(value<=0)native.flags['part'+index+'Destroyed']=true;});const value={...native,origin:[0,0],frame:finite(pose.frame,finite(pose.time)*60),action:pose.action,attacking:pose.attacking,phaseProgress:pose.phaseProgress,machineMotion:pose.machineMotion,machineAim:pose.machineAim,defeated:pose.defeated};return adapt?presentationPose(mapped,value):value;}const t=finite(pose.frame,finite(pose.actionTime,finite(pose.time)*60)),move=/walk|dash|run/.test(pose.action||''),attack=/shoot|attack|heavy|light|special|super|slash/.test(pose.action||'')||!!pose.attacking;
   const wave=Math.sin(t*.12),channels={idleBreath:Math.sin(t*.032),weaponRecoil:attack?-Math.max(0,Math.sin(finite(pose.phaseProgress,.5)*Math.PI))*6:0,weaponAim:finite(pose.weaponAim),cameraSweep:Math.sin(t*.022)*3,bodyRoll:move?Math.sin(t*.08)*5:0,terminalPulse:Math.sin(t*.05),podCapLift:/deploy/.test(pose.action||'')?6:0,rotorSpin:t*18,airTilt:Math.sin(t*.022)*2,collapse:pose.defeated?1:0},flags={};
   for(const pfx of ['near','far','front_near','front_far','rear_near','rear_far','middle_near','middle_far']){const flip=/far/.test(pfx)?-1:1;channels[pfx+'Swing']=move?wave*12*flip:0;channels[pfx+'Knee']=move?-wave*8*flip:0;channels[pfx+'Foot']=move?-wave*4*flip:0;channels[pfx+'Lift']=move?Math.max(0,wave*flip)*9:0;channels[pfx+'Damage']=hp[/far/.test(pfx)?1:0]===0?1:0;}
   for(let i=0;i<3;i++){channels['arm'+i+'Swing']=Math.sin(t*.09+i*2.1)*(move?12:3);channels['arm'+i+'Bend']=attack?-14:Math.sin(t*.07+i)*3;}
   if(mapped?.startsWith('khamsin_')){const phase=Math.sin(clamp(finite(pose.phaseProgress,.5))*Math.PI),direction=mapped.endsWith('right')?1:-1;channels.nearAxeRaise=attack?phase*64:0;channels.farAxeRaise=attack?phase*42:0;channels.nearAxeElbow=attack?phase*26:0;channels.farAxeElbow=attack?phase*20:0;channels.axeSwing=attack?phase*42*direction:0;}
   const value={...pose,channels,flags,origin:[0,0],frame:t,action:pose.action,attacking:pose.attacking,phaseProgress:pose.phaseProgress,defeated:pose.defeated,reducedMotion:reduced(),id:mapped};return adapt?presentationPose(mapped,value):value;}
  function presentationPose(id,pose,state=null){return root.CQC_PASS28_RIG_SETUP?.presentationPose(id,pose,state)||pose;}
  function destroyClock(state,index,t){if(Array.isArray(state.eventLog)){let start=-1,wave=-1;for(const e of state.eventLog){if(e.event==='wave')wave=finite(e.tick);if(e.event==='destroy'&&e.part===index&&finite(e.tick)>=wave)start=finite(e.tick);}if(start>=0)return Math.max(0,t-start);}
   let cache=destroyTimes.get(state);if(!cache||cache.revision!==state.revision){cache={revision:state.revision,times:new Map()};destroyTimes.set(state,cache);}if(!cache.times.has(index))cache.times.set(index,t);return Math.max(0,t-cache.times.get(index));}
  // All phases use engine clocks. A getter never advances animation or aims from
  // the already rotated muzzle, so drawing, hits and projectiles share one pose.
  function eventMotion(events=[]){
   let brace=0,recoil=0,recovery=0,selected=null;
   const valid=events.filter(e=>Number.isFinite(e.age)&&Number.isFinite(e.warn)&&Number.isFinite(e.active)&&e.age<e.warn+e.active+finite(e.recovery,18));
   for(const e of valid){const a=e.age-e.warn,w=clamp(e.age/Math.max(1,e.warn)),tail=clamp(1-(a-e.active)/Math.max(1,finite(e.recovery,18)));
    brace=Math.max(brace,a<0?w*w*(3-2*w):a<e.active?1:tail*tail*(3-2*tail));
    if(a>=0&&['beam','shot','volley','flame','gatling','rail'].includes(e.kind))recoil=Math.max(recoil,Math.exp(-a/5));
    if(a>=e.active)recovery=Math.max(recovery,tail);
   }
   selected=valid.find(e=>e.age>=e.warn&&e.age<e.warn+e.active)||valid.filter(e=>e.age<e.warn).at(-1)||valid.at(-1)||null;
   return {brace,recoil,recovery,selected,phase:selected?(selected.age<selected.warn?'windup':selected.age<selected.warn+selected.active?'active':'recovery'):'idle'};
  }
  function axisDescriptor(id,spec={}){
   const names=['CQC_PASS29_MODERN_ARTICULATION','CQC_PASS29_CLASSIC_ARTICULATION','CQC_PASS29_HEAVY_ARTICULATION','CQC_PASS29_PW_ARTICULATION','CQC_PASS30_GANDER_FIDELITY','CQC_PASS31_PW_BIPED','CQC_PASS34_LIGHT_ARTICULATION','CQC_PASS34_VEHICLE_ARTICULATION'];
   let value=null;for(const name of names){const entry=root[name]?.aimAxes?.[id];if(!entry||entry.byAttackKind&&!Object.hasOwn(entry.byAttackKind,spec.kind))continue;
    value=entry.bySourceIndex?.[spec.sources?.[0]]||entry.byAttackKind?.[spec.kind]||entry[spec.kind]||entry.default||value;
   }return value&&value.part&&[value.baseNativeXY,value.tipNativeXY].every(p=>Array.isArray(p)&&p.length===2&&p.every(Number.isFinite))?value:null;
  }
  function localAxis(id,pose,axis){
   const machine=definitions.get(id),part=machine?.parts.find(p=>p.id===axis?.part);if(!part)return null;
   const native=parts.pose(machine,pose).get(part.id);if(!native)return null;
   const g=root.CQC_PASS28_MACHINE_GEOMETRY,base=g.point(native,native.rect,axis.baseNativeXY),tip=g.point(native,native.rect,axis.tipNativeXY);
   const length=Math.hypot(tip.x-base.x,tip.y-base.y);const poses=parts.pose(machine,pose),jointPart=machine.parts.find(p=>p.id===(axis.jointPart||axis.part)),parent=jointPart?.parent?poses.get(jointPart.parent)?.matrix:[machine.scale[0],0,0,machine.scale[1],0,0],offset=jointPart?.offset||[0,0],pivot={x:parent[0]*offset[0]-parent[2]*offset[1]+parent[4],y:parent[1]*offset[0]-parent[3]*offset[1]+parent[5]};return length>1e-6?{base,tip,pivot,angle:Math.atan2(tip.y-base.y,tip.x-base.x),length,visible:native.visible&&native.opacity>0}:null;
  }
  function motionBasis(state){return state._machineBasis||arsenalGeometry(state)?.basis||null;}
  function aimPose(id,p,state,motion){
   const event=motion.selected,basis=motionBasis(state);if(!event||!basis)return presentationPose(id,p,state);
   const target=event.aimTarget||[event.x,event.y];if(!target.every(Number.isFinite))return presentationPose(id,p,state);
   const targetRig=[(target[0]-basis[4])/basis[0],(target[1]-basis[5])/basis[3]],axis=axisDescriptor(id,event);
   const zero={...p,channels:{...p.channels,weaponAim:0,weaponAimDegrees:0,weaponAimDegreesNear:0,weaponAimDegreesFar:0},machineAim:null};
   const neutral=presentationPose(id,zero,state);if(axis?.channel)neutral.channels[axis.channel]=0;
   const base=axis&&localAxis(id,neutral,axis);
   let desired=Number.isFinite(event.aimAngle)?event.aimAngle:null,delta=0,servo=1,servoTarget=targetRig;
   if(base){const unit={x:Math.cos(base.angle),y:Math.sin(base.angle)},offset={x:base.base.x-base.pivot.x,y:base.base.y-base.pivot.y},sideways=-offset.x*unit.y+offset.y*unit.x,distance=Math.hypot(targetRig[0]-base.pivot.x,targetRig[1]-base.pivot.y);
    desired=Math.atan2(targetRig[1]-base.pivot.y,targetRig[0]-base.pivot.x)-Math.asin(clamp(sideways/Math.max(1e-6,distance),-1,1));
    delta=Math.atan2(Math.sin(desired-base.angle),Math.cos(desired-base.angle));
    const q=motion.phase==='windup'?clamp(event.age/Math.max(1,event.warn)*1.6):motion.phase==='recovery'?clamp(1-(event.age-event.warn-event.active)/Math.max(1,finite(event.recovery,18))):1;servo=q*q*(3-2*q);
    const turn=-delta*(1-servo),cx=Math.cos(turn),sn=Math.sin(turn),dx=targetRig[0]-base.pivot.x,dy=targetRig[1]-base.pivot.y;
    servoTarget=[base.pivot.x+dx*cx-dy*sn,base.pivot.y+dx*sn+dy*cx];desired=base.angle+delta*servo;
   }
   const degrees=delta*servo*180/Math.PI,c={...p.channels,weaponAimDegrees:degrees};if(axis?.channel)c[axis.channel]=degrees;
   return presentationPose(id,{...p,channels:c,machineAim:{targetRig:servoTarget,lockedTargetRig:targetRig,kind:event.kind,locked:true,angle:desired,axis:axis||null,phase:motion.phase,servo}},state);
  }
  function mechanicalWeaponVector(id,pose,basis,spec){
   const axis=axisDescriptor(id,spec),vector=axis&&localAxis(id,pose,axis);if(!vector||!basis)return null;
   const world=p=>({x:basis[0]*p.x+basis[2]*p.y+basis[4],y:basis[1]*p.x+basis[3]*p.y+basis[5]}),tip=world(vector.tip);
   return {...tip,base:world(vector.base),tip,angle:vector.angle,part:axis.part,axisNative:axis,axisVisible:vector.visible};
  }
  function mechanicalAimPose(id,pose,state,basis,event){
   if(!axisDescriptor(id,event)||!basis)return presentationPose(id,pose,state);
   const motion=eventMotion([event]),gun=event.kind==='gun'||event.kind==='gatling',age=event.age-event.warn;
   const recoil=gun&&age>=0&&age<event.active?Math.exp(-(age%7)/2.8):motion.recoil;
   const raw={...pose,motionPhase:motion.phase,motionEvent:event,channels:{...pose.channels,weaponBrace:motion.brace,weaponRecoilImpulse:recoil,weaponRecovery:motion.recovery}};
   return aimPose(id,raw,{...state,_machineBasis:basis},motion);
  }
  function arsenalPose(state,mapped){const t=finite(state.tick),hp=state.hp||[],motion=eventMotion((state.events||[]).filter(e=>(e.sources||[]).every(i=>hp[i]!==0))),p=animation({frame:t,action:motion.phase==='idle'?'idle':motion.phase==='windup'?'guard':'attack',phaseProgress:motion.selected?clamp((motion.selected.age-motion.selected.warn)/Math.max(1,motion.selected.active)):0,defeated:state.status==='result'&&state.won},hp,mapped,false),c=p.channels,f=p.flags;
   c.weaponBrace=motion.brace;c.weaponRecoilImpulse=motion.recoil;c.weaponRecovery=motion.recovery;p.motionPhase=motion.phase;p.motionEvent=motion.selected;p.motionState=state.motionState||state;p.maxHP=state.max;const basis=motionBasis(state);if(basis?.[0]>0&&Number.isFinite(basis[4]))p.machineMotion={travelX:basis[4]/basis[0],direction:1,source:'engine-machine-world-basis'};
   hp.forEach((h,i)=>{if(h<=0){f['part'+i+'Destroyed']=true;c['destroy'+i+'Frames']=destroyClock(state.destroyOwner||state,i,t);}});
   const active=(state.events||[]).filter(e=>e.age>=e.warn&&e.age<e.warn+e.active);for(const e of active){const q=clamp((e.age-e.warn)/Math.max(1,e.active)),v=Math.sin(q*Math.PI);if(e.kind==='sweep'){c.nearBladeSwing=v*36;c.farBladeSwing=-v*31;c.weaponAim=v*5;}if(e.kind==='stomp'){for(const i of e.sources||[]){const n=i%2?'far':'near';c[n+'Lift']=v*30;c[n+'Swing']=v*11;}}if(['beam','shot','volley','flame','gatling'].includes(e.kind)){c.weaponRecoil=-motion.recoil*7;c.jawOpen=Math.max(c.jawOpen||0,motion.brace);}}
   c.jawOpen=Math.max(c.jawOpen||0,state.boss?.exposure>0?1:0);c.shieldOpen=state.boss?.exposure>0?1:0;c.bladeLift=state.boss?.actionCd>0?1:0;
   // Existing native edition rigs keep their historic visual channel contract.
   const gone=i=>hp[i]===0;f.radomeDestroyed=gone(0);f.cockpitOpened=gone(0)&&state.boss?.exposure>0;f.jawOpen=c.jawOpen>0;f.ganderMouthOpen=state.boss?.exposure>0;f.ganderMissilesOpen=active.some(e=>e.kind==='shot');f.raxaLeftPodOpen=state.boss?.exposure>0;f.raxaRightPodOpen=f.raxaLeftPodOpen;f.zekeRailDisabled=gone(0);f.zekeJetDisabled=gone(1);f.shagohodEngineDisabled=gone(2);
   c.radomeDetachFrames=c.destroy0Frames||0;c.nearKneeStagger=gone(0)?1:0;c.farKneeStagger=gone(1)?1:0;c.farLegDisabled=gone(1)?1:0;c.nearLegDisabled=gone(0)?1:0;c.mgdFarFoldUpper=gone(1)?28:0;c.mgdNearFoldUpper=gone(0)?28:0;c.ganderFold=gone(0)||gone(1)?1:0;c.pwStomp=c.nearLift||0;c.pwCannonRecoil=c.weaponRecoil||0;c.kodoqueNearEmitterOpacityDelta=gone(0)?-.65:0;c.kodoqueFarEmitterOpacityDelta=gone(1)?-.65:0;
   return aimPose(mapped,p,state,motion);}
  function fittedBasis(id,box){const b=bounds(id);if(!b)return null;const pad=Math.max(0,finite(box.padding,5)),sc=Math.max(.001,Math.min((box.width-pad*2)/b.width,(box.height-pad*2)/b.height)),dx=box.x+(box.width-b.width*sc)/2-sc*b.left,dy=(box.alignBottom?box.y+box.height-pad-b.height*sc:box.y+(box.height-b.height*sc)/2)-sc*b.top;return[sc,0,0,sc,dx,dy];}
  function fit(ctx,id,box,pose){const basis=fittedBasis(id,box);if(!basis||!ready(id))return false;ctx.save();try{ctx.transform(...basis);const result=registry.draw(ctx,id,{...pose,origin:[0,0],detachmentOwner:pose.detachmentOwner||ctx.canvas,detachmentBasis:basis});touch(id,1200);return result;}finally{ctx.restore();}}
  function drawCunningham(ctx,f,x,y,face,scale,pose={}){pose=pose&&typeof pose==='object'?pose:{};const loader=root.CQC_COMBAT_SPRITES;if(!loader?.has?.('core__cunningham'))return false;const id='cunningham_hover_platform_mpo2006',height=accessoryHeight(),st=nativeStatus(id);if(st.state==='error')return false;const bodyStatus=loader.status?.('core__cunningham',{face})||{},bodyReady=bodyStatus.ready===true;if(bodyStatus.states?.some(state=>state==='failed'||state==='unavailable'))return false;if(!ready(id)||!bodyReady){placeholder(ctx,{x:x-75*scale,y:y-445*scale,width:150*scale,height:445*scale});whenReady('core__cunningham',{face}).catch(()=>{});return true;}ctx.save();try{ctx.translate(x,y);ctx.scale(scale,scale);const sourceTime=Number.isFinite(pose.frame)?pose.frame/60:finite(pose.time);ctx.translate(0,-height+(reduced()?0:Math.sin(sourceTime*3)*3));drawAccessory(ctx,{id:'cunningham'},sourceTime,'under',pose);loader.draw(ctx,f,0,0,face,1,pose);return true;}finally{ctx.restore();}}
  function drawFitted(ctx,uid,box,face=-1,pose={}){if(!ctx||!validBox(box)||![1,-1].includes(face)||finite(box.padding)>Math.min(box.width,box.height)/2)return false;pose=pose&&typeof pose==='object'?pose:{};if(uid==='core__cunningham'){const pad=finite(box.padding,5),sc=Math.max(.001,Math.min((box.width-pad*2)/260,(box.height-pad*2)/445));return drawCunningham(ctx,{uid},box.x+box.width/2,box.y+(box.height+445*sc)/2,face,sc,pose);}const id=physical(uid,face);if(!id)return false;if(ready(id))return fit(ctx,id,box,animation(pose||{},[],id));const st=nativeStatus(id);placeholder(ctx,box,st.state==='error');if(st.state!=='error')ensure(id).catch(()=>{});return true;}
  function drawPortrait(canvas,uid,onRepaint,options={}){if(!hasComposite(uid)||!canvas?.getContext||![canvas.width,canvas.height].every(Number.isFinite)||canvas.width<=0||canvas.height<=0)return false;uid=typeof uid==='object'?uid.uid:uid;const face=options.face===1?1:-1,ticket=++serial;portraits.set(canvas,{ticket,uid});const ctx=canvas.getContext('2d'),box={x:0,y:0,width:canvas.width,height:canvas.height,padding:7};ctx.clearRect(0,0,canvas.width,canvas.height);drawFitted(ctx,uid,box,face,{action:'idle',frame:0});const pending=uid==='core__cunningham'?(!ready('cunningham_hover_platform_mpo2006')||root.CQC_COMBAT_SPRITES?.status?.(uid,{face})?.ready!==true?whenReady(uid,{face}):null):!ready(physical(uid,face))?ensure(physical(uid,face)):null;if(pending)pending.then(result=>{if(result===false)return;const p=portraits.get(canvas);if(p?.ticket!==ticket||p.uid!==uid)return;if(typeof onRepaint==='function')onRepaint();else{ctx.clearRect(0,0,canvas.width,canvas.height);drawFitted(ctx,uid,box,face,{action:'idle',frame:0});}},()=>{});return true;}
  function cancelPortrait(canvas){portraits.delete(canvas);}
  // Canvas x may already be local to a translated actor. Only a simulation actor
  // with both position and velocity establishes the real world travel context.
  // The same pure conversion is used by drawing, source getters and diagnostics.
  function actorTravelPose(actor,pose,sc){
   if(Number.isFinite(pose?.machineMotion?.travelX))return pose;
   if(!actor||typeof actor!=='object'||!Number.isFinite(actor.x)||!Number.isFinite(actor.vx)||!Number.isFinite(sc)||sc<=0)return pose;
   return {...pose,machineMotion:{travelX:actor.x/sc,direction:1,source:'engine-actor-world-x'}};
  }
  function displayGeometry(id,scale=1,options={}){const b=bounds(id);if(!b)return null;const kind=data.states[id]?.kind,height=Number.isFinite(options.displayHeight)&&options.displayHeight>0?options.displayHeight:data.states[id]?.displayHeight>0?data.states[id].displayHeight:kind==='heavy_biped'?420:kind==='small_biped'?155:kind==='radial'?133:kind==='pod'?222:kind==='authored_vr'?250:288;return {bounds:b,height,scale:scale*height/b.height};}
  // Real Versus actors are distinct from their immutable fighter definitions.
  // Use world scale before the camera zoom; a camera pan never moves a support.
  function motionContext(actor,scaleWorld=1.12){
   if(!actor||!Number.isFinite(actor.x)||!Number.isFinite(actor.vx)||!Number.isFinite(scaleWorld)||scaleWorld<=0)return null;
   const fighter=actor.f||actor,id=physical(fighter,actor.face||-1),g=id&&displayGeometry(id,scaleWorld);if(!g)return null;
   const measured=root.CQC_PASS19_WORLD_SCALE?.height?.(fighter,{originalPixels:g.height}),ratio=Number.isFinite(measured?.ratio)&&measured.ratio>0?measured.ratio:1,sc=g.scale*ratio;
   return {travelX:actor.x/sc,direction:1,source:'engine-versus-owner',worldX:actor.x,nativeWorldScale:sc};
  }
  function inspectPlayablePose(actor,face=-1,scale=1,pose={},options={}){const id=physical(actor,face),g=id&&displayGeometry(id,scale,options);return g?animation(actorTravelPose(actor,pose,g.scale),[],id):null;}
  function drawPlayable(ctx,f,x,y,face,scale,pose={}){
   if(f&&typeof f==='object'){const frame=finite(pose.frame,finite(pose.actionTime,finite(pose.time)*60)),dead=pose.defeated===true||/^(dead|ko)$/.test(pose.action||'');let previous=playableKO.get(f);if(!dead)playableKO.set(f,{alive:true,frame,rotorPhase:Math.floor(Math.max(0,frame)/2)%4});else{if(!previous||previous.alive||frame<previous.frame)previous={start:frame,frame,rotorPhase:previous?.rotorPhase??Math.floor(Math.max(0,frame)/2)%4};previous.frame=frame;playableKO.set(f,previous);pose={...pose,defeatFrames:Math.max(0,frame-previous.start),frozenRotorFrame:previous.rotorPhase};}}if(!ctx||![x,y,scale].every(Number.isFinite)||scale<=0||![1,-1].includes(face))return false;if(f?.uid==='core__cunningham')return drawCunningham(ctx,f,x,y,face,scale,pose||{});const id=physical(f,face);if(!id)return false;const st=nativeStatus(id);if(st.state==='error')return false;const b=bounds(id),kind=data.states[id]?.kind,height=data.states[id]?.displayHeight>0?data.states[id].displayHeight:kind==='heavy_biped'?420:kind==='small_biped'?155:kind==='radial'?133:kind==='pod'?222:kind==='authored_vr'?250:288,sc=Math.max(.001,finite(scale,1))*height/(b?.height||height);
   if(!ready(id)){placeholder(ctx,{x:x-52*scale,y:y-height*scale,width:104*scale,height:height*scale});ensure(id).catch(()=>{});return true;}
   ctx.save();try{ctx.translate(x,y);ctx.scale(sc,sc);ctx.translate(-(b.left+b.width/2),-(b.top+b.height));const result=registry.draw(ctx,id,{...animation(actorTravelPose(f,pose,sc),[],id),detachmentOwner:f,detachmentBasis:[sc,0,0,sc,x-sc*(b.left+b.width/2),y-sc*(b.top+b.height)]});touch(id,1200);return result;}finally{ctx.restore();}}
  function rigSourcePoint(uid,slot,face=-1,pose={}){if(![1,-1].includes(face))return null;const id=physical(uid,face),api=deps.sourcePoints||root.CQC_PASS19_MACHINE_SOURCE_POINTS;if(!id||!ready(id)||!api)return null;const descriptor=root.CQC_PASS28_RIG_SETUP?.descriptor?.(id,slot)||root.CQC_PASS28_MISSING_MACHINE?.descriptor?.(id,slot)||api.descriptor(id,slot);if(!descriptor)return null;const native=api.resolve(parts,definitions.get(id),animation(pose,[],id),descriptor);return native?{...native,id,uid:typeof uid==='object'?uid.uid:uid,face,facingQualification:data.states[id]?.nativeSourceCameraFacing?(('native independently rendered '+data.states[id].nativeSourceCameraFacing+'-source camera')+(face===(data.states[id].nativeSourceCameraFacing==='right'?1:-1)?'':'; requested opposite facing is not a separately authored camera')):(face===1?(id.endsWith('_right')?'native independently rendered right-source camera':'left-source projection; independent reverse source pending'):'native left-source camera'),absolute1to1Certified:false}:null;}
  function playableSourcePoint(uid,slot,x,y,face=-1,scale=1,pose={},options={}){
   if(![x,y,scale].every(Number.isFinite)||scale<=0)return null;
   const id=physical(uid,face),g=id&&displayGeometry(id,scale,options);if(!g)return null;
   const point=rigSourcePoint(uid,slot,face,actorTravelPose(uid,pose,g.scale));if(!point)return null;
   const b=g.bounds,sc=g.scale;return {...point,rigLocalXY:[point.x,point.y],x:x+sc*(point.x-(b.left+b.width/2)),y:y+sc*(point.y-(b.top+b.height)),renderScale:sc,displayHeight:g.height,spatialMutation:false,simulationMutation:false};
  }
  function arsenalBox(state){const id=state.def.id,p=state.def.parts,maxY=Math.max(...p.map(v=>-v.y));if(['harrier','hind_d','chrysalis'].includes(id)){const height=id==='harrier'?190:280;return{x:state.boss.x-305,y:state.boss.y-maxY-height*.42,width:610,height,padding:0};}const h=Math.min(425,Math.max(205,maxY+75));return{x:state.boss.x-315,y:state.boss.y-h,width:630,height:h,padding:0};}
  // Fixed encounter framing includes the actual four rotor phases and the
  // admitted +/-2 degree hover tilt. This does not advance any owner clock.
  const arsenalAirFrames=new Map();
  function arsenalFramingBounds(id,neutral){
   if(id!=='hind_d_mgs1_ps1_1998')return neutral;
   if(arsenalAirFrames.has(id))return arsenalAirFrames.get(id);
   const machine=definitions.get(id),geo=root.CQC_PASS28_MACHINE_GEOMETRY;let left=neutral.left,top=neutral.top,right=neutral.right,bottom=neutral.bottom;
   if(machine&&geo)for(let phase=0;phase<4;phase++)for(const tilt of [-2,0,2])for(const hover of [-1.5,1.5]){
    const p=animation({frame:phase*3,action:'idle'},[],id);p.channels={...p.channels,airTilt:tilt,pass34HindHover:hover};
    // The tail rotor is a real projected vertical-plane rotation; a box enlarged
    // to its diagonal conservatively covers every angle without inventing frames.
    const rig=parts.pose(machine,p),tail=rig.get('tail_rotor');let tailRadius=0;
    if(tail){const source=machine.sources.get(tail.source),r=tail.rect||[0,0,source.width,source.height];tailRadius=Math.hypot(Math.max(tail.pivot[0],r[2]-tail.pivot[0]),Math.max(tail.pivot[1],r[3]-tail.pivot[1]))*tail.imageScale*Math.max(Math.hypot(tail.matrix[0],tail.matrix[1]),Math.hypot(tail.matrix[2],tail.matrix[3]));}
    const b=geo.bounds(machine,parts,p);if(b){left=Math.min(left,b.left);top=Math.min(top,b.top);right=Math.max(right,b.right);bottom=Math.max(bottom,b.bottom);}
    if(tail&&tailRadius){left=Math.min(left,tail.matrix[4]-tailRadius);right=Math.max(right,tail.matrix[4]+tailRadius);top=Math.min(top,tail.matrix[5]-tailRadius);bottom=Math.max(bottom,tail.matrix[5]+tailRadius);}
   }
   const value=Object.freeze({left,top,right,bottom,width:right-left,height:bottom-top});arsenalAirFrames.set(id,value);return value;
  }
  function arsenalGeometry(state){
   const id=bossId(state?.def?.id),b=bounds(id);if(!b||![state?.boss?.x,state?.boss?.y].every(Number.isFinite))return null;
   const shared=root.CQC_PASS36_MACHINE_SCALE,calibration=shared?.calibration?.(id,b),metric=calibration?.metric||root.CQC_PASS28_RIG_SETUP?.dimension(id),height=calibration?.height||(metric?.heightM>0?metric.heightM*200/1.8:null),air=['harrier','hind_d','chrysalis'].includes(state.def.id);
   let basis;if(height){const sc=calibration?.scale||height/b.height;basis=[sc,0,0,sc,state.boss.x-sc*(b.left+b.width/2),state.boss.y-(air?100:0)-sc*b.bottom];}else{const box={...arsenalBox(state),alignBottom:!air};basis=fittedBasis(id,box);}if(!basis)return null;
   const [sc,,,,x,y]=basis,world=r=>({left:x+r.left*sc,top:y+r.top*sc,right:x+r.right*sc,bottom:y+r.bottom*sc,width:r.width*sc,height:r.height*sc});
   return{basis,bounds:world(b),framingBounds:world(arsenalFramingBounds(id,b)),machineId:id,scale:sc,heightM:metric?.heightM||null,heightStatus:calibration?.heightStatus||metric?.evidence||'authored framing; canonical dimensions unverified',
    humanReferenceM:calibration?.referenceMetres||1.8,humanReferencePixels:calibration?.referencePixels||200,metricUse:calibration?.metricUse||(height?'existing-incarnation-height-record':'unknown-dimension-authored-framing'),metric:metric?{...metric}:null,dimensionSource:calibration?.dimensionSource||null,
    nativeProjection:calibration?.nativeProjection||'Preserved native source perspective; no absolute game-model metric certification.',sourceUniform:true,absolute1to1Certified:false};
  }
  function arsenalTargetPoint(state,index){const geometry=arsenalGeometry(state),descriptor=root.CQC_PASS28_RIG_SETUP?.targetParts()?.[state?.def?.id]?.[index];if(!geometry||!descriptor)return null;const machine=definitions.get(geometry.machineId),p=root.CQC_PASS28_MACHINE_GEOMETRY.sourcePoint(machine,parts,arsenalPose(state,geometry.machineId),descriptor);if(!p)return null;const m=geometry.basis;return{x:m[0]*p.x+m[2]*p.y+m[4],y:m[1]*p.x+m[3]*p.y+m[5],r:Math.max(20,Math.min(150,p.localRadius*geometry.scale)),part:p.part,sourceNativeXY:p.nativeXY,alphaMeasured:p.alphaMeasured,canonicalSizeStatus:geometry.heightStatus};}
  function arsenalWeaponPoint(state,spec=null){
   const geometry=arsenalGeometry(state);if(!geometry)return null;const pose=arsenalPose(state,geometry.machineId),axis=axisDescriptor(geometry.machineId,spec||pose.motionEvent||{}),vector=axis&&localAxis(geometry.machineId,pose,axis),base=root.CQC_PASS28_RIG_SETUP?.weaponPoints()?.[state?.def?.id],descriptor=axis?{part:axis.part,point:axis.tipNativeXY}:base?.byAttackKind?.[spec?.kind]||base;
   if(!descriptor)return null;
   const p=root.CQC_PASS28_MACHINE_GEOMETRY.sourcePoint(definitions.get(geometry.machineId),parts,pose,descriptor);if(!p)return null;
   const m=geometry.basis,world=p=>({x:m[0]*p.x+m[2]*p.y+m[4],y:m[1]*p.x+m[3]*p.y+m[5]});
   const muzzle=vector?world(vector.tip):world(p),v=vector?{base:world(vector.base),tip:world(vector.tip),angle:vector.angle,axisNative:axis,axisVisible:vector.visible}:{};
   return {...muzzle,part:vector?axis.part:p.part,...v,motionPhase:pose.motionPhase};
  }
  function drawArsenal(ctx,state,preview=false){const id=bossId(state?.def?.id);if(!id||!ctx||!Array.isArray(state.def.parts)||!Array.isArray(state.hp)||!state.def.parts.length||!state.def.parts.every(part=>Number.isFinite(part.y))||![state.boss?.x,state.boss?.y].every(Number.isFinite))return false;const st=nativeStatus(id);if(st.state==='error')return false;const geometry=arsenalGeometry(state);if(!geometry)return false;const box={x:geometry.bounds.left,y:geometry.bounds.top,width:geometry.bounds.width,height:geometry.bounds.height};if(ready(id)){ctx.save();try{ctx.transform(...geometry.basis);const result=registry.draw(ctx,id,{...arsenalPose(state,id),origin:[0,0],detachmentOwner:state.destroyOwner||state,detachmentBasis:geometry.basis});touch(id,1200);return result;}finally{ctx.restore();}}placeholder(ctx,box);let entry=previewRequests.get(ctx.canvas);if(!entry||entry.id!==id){entry={id,state};previewRequests.set(ctx.canvas,entry);ensure(id).then(()=>{if(previewRequests.get(ctx.canvas)!==entry)return;if(preview&&ctx.canvas.isConnected!==false)root.ArsenalRender?.draw(ctx,state,{preview:true,hudVisible:false});},()=>{});}return true;}
  function mgrPresentation(state,selectedId='ray'){
   const boss=state?.boss||selectedId,id=bossId(boss,'mgr');if(!id)return null;
   const hp=boss==='ray'?[...(state?.legs||[1,1]),finite(state?.head,1)]:boss==='grad'?[finite(state?.shield,1),finite(state?.shield,1),finite(state?.battery,1)]:[...(state?.legs||[1,1,1,1]),...(state?.blades||[1,1]),finite(state?.core,1)];
   const frame=Math.max(0,finite(state?.machineClock,(finite(state?.startedAt)-finite(state?.t))*60)),box={x:boss==='excelsus'?620:760,y:boss==='excelsus'?205:180,width:boss==='excelsus'?590:440,height:boss==='excelsus'?385:410,padding:0,alignBottom:true},basis=fittedBasis(id,box);
   const events=(state?.hazards||[]).map(h=>{const warn=finite(h.initialWarn,h.warn),active=finite(h.initialActive,h.active),age=h.warn>0?warn-h.warn:warn+active-h.active;
    const kind=/stomp|appui/.test(h.id)?'stomp':/tail|blade/.test(h.id)?'sweep':/plasma|laser/.test(h.id)?'beam':h.id==='ram'?'ram':'shock';
    return {...h,kind,sources:[finite(h.side)],age:age*60,warn:warn*60,active:active*60,recovery:18,x:h.x+h.w/2,y:h.y+h.h/2,aimTarget:h.machineAimTarget,aimAngle:h.machineAimAngle};});
   for(const e of state?.machineEvents||[])events.push({...e,age:Math.max(0,frame-e.startedFrame)});
   const surrogate={tick:frame,hp,max:hp,def:{id:boss==='ray'?'ray_mgR':boss},boss:{exposure:(state?.headOpen||state?.batteryOpen||state?.bladeOpenT||0)>0?1:0},events,status:state?.won?'result':'fight',won:state?.won,revision:finite(state?.phase),destroyOwner:state||null,motionState:state,_machineBasis:basis};
   return {id,box,basis,surrogate,pose:arsenalPose(surrogate,id)};
  }
  // MGR selectors and collisions use exactly the pose and fitted basis painted above.
  function mgrTargetPoint(state,index=state?.target){
   if(!state||!Number.isInteger(index)||index<0)return null;
   const value=mgrPresentation(state);if(!value)return null;
   const boss=state.boss,logical=boss==='ray'?'ray_mgR':boss;
   let target=index;
   if(boss==='grad'){if(index>1)return null;target=index===0?0:2;}
   else if(boss==='excelsus'){if(state.phase===1){if(index>3)return null;}else if(state.phase===2){if(index>1)return null;target=4+index;}else target=6;}
   const descriptor=root.CQC_PASS28_RIG_SETUP?.targetParts?.()?.[logical]?.[target],machine=definitions.get(value.id);
   if(!descriptor||!machine)return null;
   const native=root.CQC_PASS28_MACHINE_GEOMETRY?.sourcePoint(machine,parts,value.pose,descriptor);if(!native)return null;
   const m=value.basis;
   return{x:m[0]*native.x+m[2]*native.y+m[4],y:m[1]*native.x+m[3]*native.y+m[5],part:native.part,sourceNativeXY:native.nativeXY.slice(),alphaMeasured:native.alphaMeasured,nativeGeometry:true,rigId:value.id,targetIndex:index,sourcePartIndex:target,qualification:boss==='grad'&&index===1?'Exposed hull target bound to its native art; an independently drawn battery interior is still unavailable.':'Source part follows the identical final native MGR render pose.'};
  }
  function mechanicalPose(id,rawPose={},hp=[]){
   if(!definitions.has(id)||!rawPose||typeof rawPose!=='object'||!Array.isArray(hp))return null;
   return animation(rawPose,hp,id,false);
  }
  function drawMechanical(ctx,id,finalPose,basis,owner=null){
   if(!ctx||!definitions.has(id)||!ready(id)||!finalPose||!Array.isArray(basis)||basis.length!==6||!basis.every(Number.isFinite)||basis[0]<=0||basis[3]<=0)return false;
   ctx.save();try{ctx.transform(...basis);const result=registry.draw(ctx,id,{...finalPose,detachmentOwner:owner||ctx.canvas,detachmentBasis:basis});touch(id,1200);return result;}finally{ctx.restore();}
  }
  function mgrWeaponVector(state,spec={kind:'volley'}){
   const value=mgrPresentation(state);if(!value)return null;const axis=axisDescriptor(value.id,spec),vector=axis&&localAxis(value.id,value.pose,axis);if(!vector)return null;
   const m=value.basis,world=p=>({x:m[0]*p.x+m[2]*p.y+m[4],y:m[1]*p.x+m[3]*p.y+m[5]}),tip=world(vector.tip);
   return {...tip,part:axis.part,base:world(vector.base),tip,angle:vector.angle,axisNative:axis,axisVisible:vector.visible,motionPhase:value.pose.motionPhase};
  }
  function drawMGR(ctx,state,selectedId='ray'){
   if(!ctx)return false;const value=mgrPresentation(state,selectedId);if(!value)return false;const st=nativeStatus(value.id);if(st.state==='error')return false;
   if(ready(value.id))return fit(ctx,value.id,value.box,{...value.pose,detachmentOwner:state||ctx.canvas});placeholder(ctx,value.box);ensure(value.id).catch(()=>{});return true;
  }
  function drawCoreMachine(ctx,f,t,state={},hooks={}){if(!ctx||f?.id!=='khamsin'||!Number.isFinite(t))return false;const pose={...(root.CQC_PASS16_CORE_SPRITES?.poseFor?.(f,t,state,hooks)||{time:t,action:f.attack?'heavy':'idle',phaseProgress:f.attack?.t/60})};pose.defeated=f.health<=0||f.vigilance<=0;const wave=Math.sin(clamp(finite(pose.phaseProgress,.5))*Math.PI),attack=!!f.attack;const id=physical('core__khamsin',f.facing===-1?-1:1),p=animation(pose,[],id,false);p.channels.nearAxeRaise=attack?wave*64:0;p.channels.farAxeRaise=attack?wave*42:0;p.channels.nearAxeElbow=attack?wave*26:0;p.channels.farAxeElbow=attack?wave*20:0;p.channels.axeSwing=attack?wave*42*(id.endsWith('right')?1:-1):0;const b=bounds(id),sc=420/(b?.height||420);if(!ready(id)){const st=nativeStatus(id);if(st.state==='error')return false;placeholder(ctx,{x:-80,y:-420,width:160,height:420});ensure(id).catch(()=>{});return true;}ctx.save();try{ctx.scale(sc,sc);ctx.translate(-(b.left+b.width/2),-(b.top+b.height));registry.draw(ctx,id,{...presentationPose(id,p,state),detachmentOwner:f,detachmentBasis:[sc,0,0,sc,finite(f.x)-sc*(b.left+b.width/2),finite(f.y)-sc*(b.top+b.height)]});touch(id,1200);return true;}finally{ctx.restore();}}
  function accessoryHeight(){return 180;}
  function drawAccessory(ctx,f,t,layer,pose={}){if(!ctx||f?.id!=='cunningham'||!Number.isFinite(t))return false;const id='cunningham_hover_platform_mpo2006',st=nativeStatus(id);if(st.state==='error')return false;if(layer!=='under')return true;const box={x:-75,y:0,width:150,height:180,padding:0};if(!ready(id)){placeholder(ctx,box);ensure(id).catch(()=>{});return true;}return fit(ctx,id,box,animation({...pose,time:t,frame:Number.isFinite(pose.frame)?pose.frame:t*60},[],id));}
  function whenReadyAccessory(id){return id==='cunningham'?whenReady('cunningham_hover_platform_mpo2006'):Promise.resolve(true);}
  let overlay=null,message=null,retryButton=null,cancelButton=null,focusBefore=null;
  function ui(show,error=false,onRetry=null,onCancel=null){if(deps.loadingUI)return deps.loadingUI(show,error,onRetry,onCancel);const doc=root.document;if(!doc?.createElement)return;if(!overlay){overlay=doc.createElement('div');overlay.id='cqc-pass18-machine-loading';overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');overlay.style.cssText='position:fixed;inset:0;z-index:10020;background:#061115f5;color:#d9e6ce;display:flex;align-items:center;justify-content:center;font:16px system-ui';const panel=doc.createElement('div');panel.style.cssText='text-align:center;padding:28px;width:min(90vw,420px)';message=doc.createElement('p');message.setAttribute('aria-live','polite');retryButton=doc.createElement('button');retryButton.textContent='RÉESSAYER';cancelButton=doc.createElement('button');cancelButton.textContent='ANNULER';for(const b of[retryButton,cancelButton])b.style.cssText='margin:8px;padding:12px 18px;color:inherit;background:#21332f;border:1px solid #799688;font:inherit';panel.append(message,retryButton,cancelButton);overlay.append(panel);overlay.onkeydown=e=>{if(e.key==='Escape'){e.preventDefault();cancelButton.click();}if(e.key==='Tab'){e.preventDefault();const list=retryButton.hidden?[cancelButton]:[retryButton,cancelButton],i=list.indexOf(doc.activeElement);list[(i+(e.shiftKey?-1:1)+list.length)%list.length].focus();}};}
   if(!show){overlay.remove();if(focusBefore?.isConnected)focusBefore.focus();focusBefore=null;return;}if(!overlay.isConnected){focusBefore=doc.activeElement;doc.body.append(overlay);}message.textContent=error?'Le dossier natif ne peut pas être chargé.':'Chargement des pièces articulées…';retryButton.hidden=!error;retryButton.onclick=onRetry;cancelButton.onclick=onCancel;(error?retryButton:cancelButton).focus();}
  function cancelPendingLaunch(){if(!launch)return false;launch.cancelled=true;launch=null;ui(false);return true;}
  function deferLaunch(options,resume){const id=bossId(options?.id,options?.engine||'arsenal');if(!id){cancelPendingLaunch();return false;}if(ready(id)){cancelPendingLaunch();return false;}const key=JSON.stringify(options);if(launch?.key===key)return true;cancelPendingLaunch();const request={key,id,options:{...options},resume,cancelled:false,ticket:++serial};launch=request;const cancel=()=>{if(launch===request)cancelPendingLaunch();};async function attempt(retry){if(launch!==request||request.cancelled)return;ui(true,false,null,cancel);try{await ensure(id,{retry,protect:12000});}catch(_){if(launch===request&&!request.cancelled)ui(true,true,()=>attempt(true),cancel);return;}if(launch!==request||request.cancelled)return;launch=null;ui(false);request.resume(request.options);}attempt(false);return true;}
  function status(){const ids=definitions?Array.from(definitions.keys()):[];return{schema:'cqc.pass18-machine-status/1',initializationError,arsenalIds:Object.keys(data?.arsenal||{}),playableUIDs:Object.keys(data?.playable||{}),pending:launch?{id:launch.id,ticket:launch.ticket}:null,activeLoads,queued:queue.filter(j=>loads.get(j.id)===j).length,cache:{maxRigs,maxDecodedBytes:maxBytes,readyRigs:ids.filter(ready).length,estimatedDecodedBytes:ids.filter(ready).reduce((n,id)=>n+estimated(id),0),protected:ids.filter(id=>(protectUntil.get(id)||0)>now())},machines:ids.map(nativeStatus)};}
  function dispose(){pumpEpoch++;if(pumpTimer!==null){cancelTimer?.(pumpTimer);pumpTimer=null;}cancelPendingLaunch();for(const job of loads.values()){job.controller.abort();const error=Error('Machine request cancelled');error.name='AbortError';job.reject(error);}loads.clear();queue.length=0;registry?.dispose();lru.clear();protectUntil.clear();errors.clear();}
  if(!deps.disableLifecycleListeners){root.addEventListener?.('pagehide',dispose);root.document?.addEventListener('change',()=>cancelPendingLaunch());}
  return{mechanicalWeaponVector,mechanicalAimPose,mechanicalPose,drawMechanical,mgrPresentation,mgrTargetPoint,arsenalGeometry,arsenalTargetPoint,arsenalWeaponPoint,arsenalWeaponVector:arsenalWeaponPoint,mgrWeaponVector,rigSourcePoint,playableSourcePoint,inspectPlayablePose,motionContext,has,hasComposite,physical,whenReady,whenReadyComposite:whenReady,whenReadyBoss,whenReadyAccessory,drawPlayable,drawCoreMachine,drawFitted,drawPortrait,cancelPortrait,drawArsenal,drawMGR,drawAccessory,accessoryHeight,deferLaunch,cancelPendingLaunch,status,bounds,ready:(uid,options={})=>{const face=options.face===1?1:-1,value=typeof uid==='object'?uid.uid:uid;return value==='core__cunningham'?ready('cunningham_hover_platform_mpo2006')&&root.CQC_COMBAT_SPRITES?.status?.(value,{face})?.ready===true:ready(physical(value,face)||value);},dispose};
 }
 return{createBridge};
});
