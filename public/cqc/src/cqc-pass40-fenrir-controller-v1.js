/* Candidate stock Fenrir controller. Native art never mirrored; screen coordinates are Y-down. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.FENRIR_V3_CONTROLLER=api;})(globalThis,function(){'use strict';
const TAU=Math.PI*2,DEG=180/Math.PI;
const add=(a,b)=>[a[0]+b[0],a[1]+b[1]],sub=(a,b)=>[a[0]-b[0],a[1]-b[1]],mul=(a,s)=>[a[0]*s,a[1]*s],len=a=>Math.hypot(...a),rot=(a,r)=>[a[0]*Math.cos(r)-a[1]*Math.sin(r),a[0]*Math.sin(r)+a[1]*Math.cos(r)],clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
function ik(h,a,l1,l2,bend){const d0=len(sub(a,h));if(d0<1e-8)throw Error('collapsed limb');const d=clamp(d0,Math.abs(l1-l2)+.001,l1+l2-.001),u=mul(sub(a,h),1/d0),v=[-u[1],u[0]],q=(l1*l1-l2*l2+d*d)/(2*d),height=Math.sqrt(Math.max(0,l1*l1-q*q));return {ankle:add(h,mul(u,d)),knee:add(h,add(mul(u,q),mul(v,height*bend))),reachable:Math.abs(d-d0)<.002};}
function vectorAngle(v){return Math.atan2(v[1],v[0]);}
function nativeAngle(p){return vectorAngle(sub(p.nativeEnd,p.nativePivot));}
function transformPoint(part,pt){return add(part.position,rot(mul(sub(pt,part.spec.nativePivot),part.spec.imageScale),part.angle));}
function create(map){
 if(map.schema!=='cqc.fenrir-native-map/1'||map.uid!=='pass19__fenrir_mgr')throw Error('invalid Fenrir map');
 for(const facing of ['right','left']){if(map.facings[facing]?.length!==18)throw Error('18 parts per native facing required');const ids=new Set();for(const p of map.facings[facing]){if(ids.has(p.id)||!map.sources.some(s=>s.id===p.source)||p.imageScale<=0)throw Error('invalid piece');ids.add(p.id);}}
 function sample(opts={}){
  const facing=opts.facing||'right';if(!['right','left'].includes(facing))throw Error('unknown native facing');
  const f=facing==='right'?1:-1,t=Number(opts.time||0),velocity=Number(opts.velocityX||0),anchor=opts.position;if(!Array.isArray(anchor)||anchor.length!==2||!anchor.every(Number.isFinite))throw Error('authoritative actor position required');const root=anchor.slice(),parts=new Map(),spec=new Map(map.facings[facing].map(p=>[p.id,p]));
  if(![t,velocity,...anchor].every(Number.isFinite))throw Error('invalid world state');
  const action=opts.action||'idle',actionAge=Math.max(0,Number(opts.actionAge||0)),bob=velocity?Math.sin(t/.9*TAU*2)*2:Math.sin(t*TAU*.7)*1.2,posture=action==='guard'?12:action==='defeated'?Math.min(1,actionAge/.8)*65:0,body=add(root,[action==='stagger'?Math.sin(actionAge*24)*4*Math.max(0,1-actionAge/.45):0,-178+bob+posture]);
  const put=(id,position,angle=0)=>{const p={id,spec:spec.get(id),position,angle,opacity:1};parts.set(id,p);return p;};
  put('hull',body);
  const neckPos=add(body,f===1?[137,-31]:[-136,-17]);const neckAngle=Math.sin(t*1.2)*.012;
  const neck=put('neck',neckPos,neckAngle);const headPos=transformPoint(neck,spec.get('neck').nativeEnd);put('head',headPos,neckAngle+Math.sin(t*.8)*.015);
  const base=put('support_base',add(body,f===1?[-35,-66]:[12,-40]));const link=put('support_link',transformPoint(base,spec.get('support_base').nativeEnd));
  const gunPos=transformPoint(link,spec.get('support_link').nativeEnd);const target=opts.target||add(gunPos,[f*500,0]);
  const nativeBore=nativeAngle(spec.get('railgun'));let desired=vectorAngle(sub(target,gunPos));const relative=Math.atan2(Math.sin(desired-(f===1?0:Math.PI)),Math.cos(desired-(f===1?0:Math.PI)));const aim=clamp(relative,-.38,.30);desired=(f===1?0:Math.PI)+aim;
  const gun=put('railgun',gunPos,desired-nativeBore);
  const feet=[];let reachable=true;
  for(const name of ['front_near','front_far','hind_near','hind_far']){
   const front=name.startsWith('front'),far=name.endsWith('far');
   const hipLocal=f===1?(front?[108-(far?15:0),-2-(far?7:0)]:[-76-(far?12:0),-17-(far?4:0)]):(front?[-80+(far?12:0),-8-(far?6:0)]:[110+(far?10:0),6-(far?5:0)]);
   const hip=add(body,hipLocal),baseline=f*(front?(far?117:145):(far?-90:-125)),phaseOffset=(front!==far)?0:.5,period=.9,phase=t/period+phaseOffset,cycle=Math.floor(phase),q=phase-cycle;
   let foot=[root[0]+baseline,root[1]],contact=true;
   if(opts.feet?.[name]){foot=opts.feet[name].position.slice();contact=opts.feet[name].contact===true;}
   if(action==='melee'&&name==='front_near'){const strike=Math.sin(Math.min(1,actionAge/.5)*Math.PI);foot=add(foot,[f*35*strike,-35*strike]);contact=strike<.01;}
   const pawSpec=spec.get(name+'_paw'),sole=pawSpec.rect[1]+pawSpec.rect[3]-pawSpec.nativePivot[1]-1,requestedAnkle=add(foot,[0,-sole*pawSpec.imageScale]);
   const upper=spec.get(name+'_upper'),lower=spec.get(name+'_lower'),l1=len(sub(upper.nativeEnd,upper.nativePivot))*upper.imageScale,l2=len(sub(lower.nativeEnd,lower.nativePivot))*lower.imageScale,solution=ik(hip,requestedAnkle,l1,l2,f),ankle=solution.ankle,requestedFoot=foot.slice();
   if(!solution.reachable){foot=add(ankle,[0,sole*pawSpec.imageScale]);contact=false;}
   reachable=reachable&&solution.reachable;
   put(name+'_upper',hip,vectorAngle(sub(solution.knee,hip))-nativeAngle(upper));put(name+'_lower',solution.knee,vectorAngle(sub(ankle,solution.knee))-nativeAngle(lower));put(name+'_paw',ankle,0);
   feet.push({name,contact,foot,requestedFoot,requestedAnkle,reachLimited:!solution.reachable,hip,knee:solution.knee,ankle,l1,l2});
  }
  return {uid:map.uid,facing,time:t,root,parts,feet,reachable,gunTarget:target,gunAim:desired,muzzle:transformPoint(gun,spec.get('railgun').nativeEnd),canFire:action!=='defeated'&&action!=='guard',action,actionAge};
 }
 function channels(pose){const out={};for(const p of pose.parts.values()){const parent=p.spec.parent?pose.parts.get(p.spec.parent):null,base=parent?parent.position:pose.root,angle=parent?parent.angle:0,local=rot(sub(p.position,base),-angle);out[p.id+'_x']=local[0];out[p.id+'_y']=-local[1];out[p.id+'_rotation']=-(p.angle-angle)*DEG;out[p.id+'_opacity']=p.opacity-1;}return out;}
 function createSession(){
  let last=null,phase=0,face=null,feet=new Map(),cached=null,cachedKey=null;const events=new Map(),owners=new Map(),names=['front_near','front_far','hind_near','hind_far'];
  const base=(name,f)=>f*(name.startsWith('front')?(name.endsWith('far')?117:145):(name.endsWith('far')?-90:-125));
  const initialize=opts=>{feet=new Map(names.map(name=>[name,{position:[opts.position[0]+base(name,opts.facing==='left'?-1:1),opts.position[1]],contact:true,swing:null}]));face=opts.facing||'right';};
  function updateFeet(opts){
   if(!last){initialize(opts);return;}
   const dt=Math.max(0,opts.time-last.time),dx=opts.position[0]-last.position[0],dy=opts.position[1]-last.position[1],moving=Math.abs(dx)>.00001;
   if((opts.facing||'right')!==face){for(const side of ['near','far']){const a=feet.get('front_'+side),b=feet.get('hind_'+side);feet.set('front_'+side,b);feet.set('hind_'+side,a);}face=opts.facing||'right';}
   const f=face==='left'?-1:1,dir=moving?Math.sign(dx):Math.sign(opts.velocityX||0)||f;
   if(opts.airborne){for(const name of names)feet.set(name,{position:[opts.position[0]+base(name,f),opts.position[1]],contact:false,swing:null});return;}
   if(last.airborne){initialize(opts);return;}
   const distance=Math.abs(dx),oldPhase=phase;phase+=(distance/100)+(moving?0:[...feet.values()].some(v=>v.swing)?Math.min(dt,1/15)*1.8:0);
   for(const name of names){const rec=feet.get(name),offset=(name.startsWith('front')!==name.endsWith('far'))?0:.5,q=(phase+offset)%1,oldQ=(oldPhase+offset)%1;
    if(!rec.swing&&moving&&(q>=.62||Math.abs(rec.position[0]-(opts.position[0]+base(name,f)))>26)){
     rec.swing={start:rec.position.slice(),target:[opts.position[0]+base(name,f)+dir*28,opts.position[1]],progress:0};rec.contact=false;
    }
    if(rec.swing){const a=rec.swing;a.progress=Math.min(1,a.progress+Math.max(distance/38,Math.min(dt,1/15)*3.8));const u=a.progress,e=u*u*(3-2*u);rec.position=[a.start[0]+(a.target[0]-a.start[0])*e,a.start[1]+(a.target[1]-a.start[1])*e-Math.sin(u*Math.PI)*29];if(u>=1){rec.position=a.target.slice();rec.swing=null;rec.contact=true;}}
    // An authoritative change of the actor's floor carries the support plane only.
    else if(Math.abs(dy)>.00001)rec.position[1]+=dy;
   }
  }
  return {reset(){last=null;phase=0;face=null;feet.clear();events.clear();owners.clear();cached=null;cachedKey=null;},sample(opts={}){
   if(!Array.isArray(opts.position)||opts.position.length!==2||!opts.position.every(Number.isFinite)||!Number.isFinite(opts.time))throw Error('finite authoritative actor position and independent clock required');
   const key=JSON.stringify([opts.time,opts.position,opts.facing,opts.action,opts.actionAge,opts.target,opts.destroyedParts,opts.airborne]);if(key===cachedKey)return cached;
   if(last&&opts.time<last.time){this.reset();}
   updateFeet(opts);const pose=sample({...opts,feet:Object.fromEntries(feet)});
   // A foot beyond fixed native limb reach must lift and recover; source pieces never stretch.
   for(const ft of pose.feet)if(ft.reachLimited){const rec=feet.get(ft.name),f=pose.facing==='left'?-1:1,dir=Math.sign(opts.velocityX||0)||f;rec.position=ft.foot.slice();rec.contact=false;rec.swing={start:ft.foot.slice(),target:[opts.position[0]+base(ft.name,f)+dir*20,opts.position[1]],progress:0};}
   pose.reachLimitedFeet=pose.feet.filter(f=>f.reachLimited).map(f=>f.name);
   for(const id of opts.destroyedParts||[]){if(!pose.parts.has(id))throw Error('unknown destroyed piece');if(owners.has(id))continue;
    const main=pose.parts.get(id),members=new Map();for(const p of pose.parts.values()){if(owners.has(p.id))continue;let n=p;while(n&&n.id!==id)n=n.spec.parent?pose.parts.get(n.spec.parent):null;if(n){members.set(p.id,{relative:sub(p.position,main.position),angle:p.angle,spec:p.spec});owners.set(p.id,id);}}
    if(members.size)events.set(id,{time:pose.time,position:main.position.slice(),members});
   }
   for(const [id,e]of events){const age=Math.max(0,pose.time-e.time),spin=.5*age,position=[e.position[0]+32*age,e.position[1]-25*age+105*age*age];for(const [partID,m]of e.members){const p=pose.parts.get(partID);p.position=add(position,rot(m.relative,spin));p.angle=m.angle+spin;p.spec=m.spec;p.opacity=clamp((1.5-age)/.35,0,1);}}
   if(owners.has('railgun')){pose.canFire=false;pose.muzzle=null;}
   pose.debris=[...owners.keys()];pose.flags={};for(const p of pose.parts.values()){const native=map.facings[pose.facing].find(s=>s.id===p.id);if(native.source!==p.spec.source||JSON.stringify(native.rect)!==JSON.stringify(p.spec.rect))pose.flags[p.id+'_opposite_art']=true;}
   pose.gaitPhase=phase;pose.authoritativePosition=opts.position.slice();last={time:opts.time,position:opts.position.slice(),airborne:!!opts.airborne};cached=pose;cachedKey=key;return pose;
  },diagnostics(){return {phase,last: last&&{...last,position:last.position.slice()},detachedParts:[...owners.keys()],groups:events.size,rootDerivedFromVelocity:false};}};
 }

 return {sample,channels,createSession,transformPoint};
}
return {create,ik,transformPoint};});
