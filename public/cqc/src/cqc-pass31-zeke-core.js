/* ZEKE Core emission presentation. Combat trajectories, targets, clocks and HP
 * remain owned by the existing Core engine. Missile departure cues interpolate
 * to its unchanged first hazardous position; their approach has no collision.
 * Rail warning, beam and collision share one pure native-muzzle getter. Its
 * geometry never depends on bitmap decode timing. A standard ZEKE gatling
 * tube is not yet present in the admitted atlas.
 */
(function(root){
  'use strict';
  const ID='zeke_pw_psp2010',DURATION=22,catalogs=new WeakMap();
  const finite=value=>typeof value==='number'&&Number.isFinite(value);
  function machine(){
    const catalog=root.CQC_MACHINE_PARTS_CATALOG,parts=root.CQC_MACHINE_PARTS;
    if(!catalog||!parts?.normalizeCatalog)return null;
    if(!catalogs.has(catalog))catalogs.set(catalog,parts.normalizeCatalog(catalog).get(ID)||null);
    return catalogs.get(catalog);
  }
  function sourcePoint(state,descriptor,options={}){
    if(state?.boss?.id!=='zeke'||!descriptor?.part)return null;
    const value=machine(),parts=root.CQC_MACHINE_PARTS;
    if(!value||!parts?.corePose||!root.CQC_PASS28_MACHINE_GEOMETRY?.sourcePoint)return null;
    const raw=parts.corePose(state,{id:ID,reducedMotion:options.reducedMotion===true});
    if(!raw)return null;
    // This is the same read-only pose sequence used by registry.drawCore.
    const pose=root.CQC_PASS28_RIG_SETUP?.presentationPose(ID,raw,state)||raw;
    const p=root.CQC_PASS28_MACHINE_GEOMETRY.sourcePoint(value,parts,pose,descriptor);
    return p&&finite(p.x)&&finite(p.y)?{x:p.x,y:-p.y,part:p.part,
      sourceNativeXY:p.nativeXY.slice(),alphaMeasured:p.alphaMeasured,
      simulationMutation:false}:null;
  }
  function railLine(state,legacy=null){
    const r=state?.boss,a=r?.attack;
    if(r?.id!=='zeke'||a?.kind!=='rail'||![a.aim?.x,a.aim?.y].every(finite))return legacy;
    let p=null;
    try{p=sourcePoint(state,root.CQC_PASS30_ZEKE_COMPLETION?.weaponPoints?.zeke);}
    catch(_){/* An unavailable source catalog retains the same legacy line for both consumers. */}
    return p?{x1:p.x,y1:p.y,x2:a.aim.x,y2:a.aim.y,
      part:p.part,sourceNativeXY:p.sourceNativeXY.slice(),alphaMeasured:p.alphaMeasured,
      nativeGeometry:true,bitmapDecodeDependent:false,simulationMutation:false}:legacy;
  }
  function ready(){
    return root.CQC_MACHINE_PARTS_BRIDGE?.status?.().machines?.some(
      value=>value.id===ID&&value.state==='ready')===true;
  }
  function nativeOrigins(state,options={}){
    const data=root.CQC_PASS30_ZEKE_COMPLETION;
    if(state?.boss?.id!=='zeke'||!data)return null;
    const weapon=data.weaponPoints?.zeke,ports=data.nativePortCenters;
    return {rail:state.boss.rail>0?sourcePoint(state,weapon,options):null,
      missiles:[0,3,1].map(index=>ports?.[index]?sourcePoint(state,
        {part:'conventional_power_unit',sourceNativeXY:ports[index]},options):null),
      gatling:null,gatlingQualification:'Native standard gun-head muzzle pending; existing Core bullet origin retained.'};
  }
  function departure(from,to,elapsed,duration=DURATION){
    if(!from||!to||![from.x,from.y,to.x,to.y,elapsed,duration].every(finite)||duration<=0)return null;
    const q=Math.max(0,Math.min(1,elapsed/duration)),u=1-q,
      p1={x:from.x,y:from.y+duration*12/3},p2={x:to.x,y:to.y+duration*12/3};
    // First tangent leaves the dorsal cap upward; final tangent joins the old
    // falling missile with exactly vx=0, vy=-12 at its authored activation tick.
    const x=u*u*u*from.x+3*u*u*q*p1.x+3*u*q*q*p2.x+q*q*q*to.x,
      y=u*u*u*from.y+3*u*u*q*p1.y+3*u*q*q*p2.y+q*q*q*to.y,
      vx=(3*u*u*(p1.x-from.x)+6*u*q*(p2.x-p1.x)+3*q*q*(to.x-p2.x))/duration,
      vy=(3*u*u*(p1.y-from.y)+6*u*q*(p2.y-p1.y)+3*q*q*(to.y-p2.y))/duration;
    return {x,y,vx,vy,kind:'missile',age:Math.max(0,elapsed),ttl:duration-elapsed,
      presentationOnly:true,simulationMutation:false};
  }
  function plan(state,options={}){
    const r=state?.boss,a=r?.attack;
    if(r?.id!=='zeke'||r.defeated||!a||!finite(a.t)||!finite(a.windup))return {rail:null,departures:[]};
    const origins=nativeOrigins(state,options),age=a.t-a.windup,departures=[];
    let rail=null;
    if(a.kind==='rail'&&r.rail>0&&origins?.rail&&age>=0&&age<Math.min(8,a.active||0))
      rail={...origins.rail,age,aim:a.aim?{x:a.aim.x,y:a.aim.y}:null,
        damagingSegmentMoved:true,line:railLine(state)};
    if(a.kind==='missiles'&&options.reducedMotion!==true&&origins)
      for(let index=0;index<3;index++){
        const elapsed=a.t-(a.windup+index*10-DURATION);
        if(elapsed<0||elapsed>=DURATION||!finite(a.targets?.[index]))continue;
        const to={x:a.targets[index],y:610},value=departure(origins.missiles[index],to,elapsed);
        if(value)departures.push({...value,index,from:origins.missiles[index],to,
          hazardousActivationTick:a.windup+index*10});
      }
    return {rail,departures,simulationMutation:false};
  }
  function drawEmissions(context,state,options={}){
    if(!context||!ready())return false;
    const value=plan(state,options),vfx=root.CQC_PASS18_VFX;
    if(value.rail&&options.flashes!==false){const p=value.rail;
      vfx?.drawAt?.(context,'muzzle-flash',p.x,-p.y,p.age,.8,
        {...options,noFlash:true,angle:p.aim?Math.atan2(-(p.aim.y-p.y),p.aim.x-p.x):Math.PI});
    }
    for(const q of value.departures){
      if(vfx?.drawBossProjectile?.(context,q,{...options,noFlash:true}))continue;
      // Same procedural silhouette as the inherited descent, now rotated along
      // the local departure tangent. No source art is repainted or substituted.
      context.save();try{context.translate(q.x,-q.y);context.rotate(Math.atan2(-q.vy,q.vx)-Math.PI/2);
        context.fillStyle='#e7d0a2';context.strokeStyle='#172f34';context.lineWidth=2;
        context.beginPath();context.moveTo(-8,-18);context.lineTo(8,-18);context.lineTo(8,10);
        context.lineTo(0,23);context.lineTo(-8,10);context.closePath();context.fill();context.stroke();
      }finally{context.restore();}
    }
    return value.rail!==null||value.departures.length>0;
  }
  function drawHazard(context,hazard,options={}){
    if(!context||!hazard||!['missile','bullet'].includes(hazard.kind))return false;
    // Local copy adds only the orientation required by the shared VFX renderer.
    const q={...hazard,vx:hazard.kind==='bullet'?-24:0,vy:hazard.kind==='missile'?-12:0};
    return root.CQC_PASS18_VFX?.drawBossProjectile?.(context,q,{...options,noFlash:true})===true;
  }
  root.CQC_PASS31_ZEKE_CORE=Object.freeze({schema:'cqc.pass31.zeke-core-emissions/1',
    nativeOrigins,sourcePoint,railLine,departure,plan,drawEmissions,drawHazard,duration:DURATION,
    simulationMutation:false,absolute1to1Certified:false,
    limits:Object.freeze(['Rail drawing and collision now share the source-measured barrel mouth. Its existing fixed aim, windup, active frames, damage and recovery are retained; this 2D path is an adaptation.',
      'Missile departure curves are presentation cues timed to the existing first hazardous positions, not extracted Peace Walker motion.',
      'Gatling native standard gun-head source is pending; bullet origin and all collision volumes retain existing Core values.',
      'No launch-cap opening, extra projectile, weapon health pool, timer or save field is introduced.'])});
  if(typeof module==='object'&&module.exports)module.exports=root.CQC_PASS31_ZEKE_CORE;
})(globalThis);
