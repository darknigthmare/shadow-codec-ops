/* Native articulated surfaces from admitted Metal Gear source atlases.
 * A source pixel belongs to one segment. No raster is redrawn, mirrored or rescaled
 * independently; original identities, HP pools, attack clocks and metric scales remain.
 */
(function (root) {
  'use strict';
  const clone = value => JSON.parse(JSON.stringify(value));
  const finite = value => typeof value === 'number' && Number.isFinite(value);
  const value = input => finite(input) ? input : 0;
  const clamp = (input, low, high) => Math.max(low, Math.min(high, input));
  const DEG = Math.PI / 180;
  const ids = Object.freeze(['excelsus_mgr2013', 'arsenal_gear_mgs2_ps2_2001',
    'outer_haven_mgs4_ps3_2008', 'kodoque_acid_psp2004',
    'chaioth_acid2_psp2005', 'shagohod_mgs3_ps2_2004']);
  const limits = Object.freeze([
    'Source-led projected 2D joint motion; original 3D animations are not extracted and absolute 1:1 is not certified.',
    'Excelsus six independently drawn feet retain the four existing support HP groups; a foot follows its detached tibia and has no additional HP pool.',
    'Orthogonal native crop cuts preserve the admitted neutral source geometry. Complementary Chaioth finger masks can have a subpixel antialiasing seam; measured raster tolerance is documented by QA.',
    'Arsenal Gear and Outer Haven rigid pressure hulls remain rigid. Existing incomplete Arsenal exterior geometry is not filled with invented sections.',
    'Shagohod screws retain their real long axial projection. True rotating helical phases require independently authored native source images and are not simulated as spinning flat wheels.',
    'Chaioth gripper finger separation follows the visible admitted source rails; concealed knuckle interiors are not manufactured.',
    'Weapon aiming is limited to the admitted 2D mount projection; rotations and weight transfers are authored, not extracted original animations.',
    'Opposite cameras absent from an admitted rig remain absent; no source is mirrored into another incarnation.'
  ]);
  function part(machine, id) {
    const result = machine.parts.find(item => item.id === id);
    if (!result) throw Error('Native heavy articulation part unavailable: ' + machine.id + '/' + id);
    return result;
  }
  function polygon(item) {
    if (item.sourceClipPolygonNativeXY) return clone(item.sourceClipPolygonNativeXY);
    const [x, y, w, h] = item.rect;
    return [[x,y], [x+w,y], [x+w,y+h], [x,y+h]];
  }
  // Clip a convex source mask without reading, replacing or manufacturing raster pixels.
  function halfPlane(points, a, b, positive) {
    const distance = p => (b[0]-a[0])*(p[1]-a[1]) - (b[1]-a[1])*(p[0]-a[0]);
    const inside = p => positive ? distance(p) >= -1e-9 : distance(p) <= 1e-9;
    const out = [];
    for (let i=0; i<points.length; i++) {
      const p=points[i], q=points[(i+1)%points.length], pi=inside(p), qi=inside(q);
      if (pi) out.push(p.slice());
      if (pi !== qi) {
        const dp=distance(p), dq=distance(q), t=dp/(dp-dq);
        out.push([p[0]+(q[0]-p[0])*t, p[1]+(q[1]-p[1])*t]);
      }
    }
    return out.filter((p,i) => !i || Math.hypot(p[0]-out[i-1][0],p[1]-out[i-1][1])>1e-8);
  }
  function bind(item, property, channel, factor=1, cosmetic=false) {
    item.channels ||= {};
    const rows = (item.channels[property] || []).filter(row => row.channel !== channel);
    rows.push({channel, factor, ...(cosmetic ? {cosmetic:true} : {})});
    item.channels[property] = rows;
  }
  function child(machine, original, id, sourcePolygon, hinge, channels) {
    if (machine.parts.some(item=>item.id===id)) throw Error('Native heavy articulation ID collision: '+id);
    const [rx,ry] = original.rect, scale=original.imageScale || 1;
    const result={id, source:original.source, rect:clone(original.rect),
      pivot:[hinge[0]-rx,hinge[1]-ry],
      offset:[(hinge[0]-rx-original.pivot[0])*scale,
        -(hinge[1]-ry-original.pivot[1])*scale],
      imageScale:scale, parent:original.id, z:(original.z || 0)+.001,
      sourceClipPolygonNativeXY:clone(sourcePolygon), ...(channels ? {channels:clone(channels)} : {})};
    if (original.textureRotation) throw Error('Nonzero native texture rotation needs explicit partition basis: '+id);
    machine.parts.push(result);
    return result;
  }
  function splitHorizontal(machine, id, childID, cutY, hinge, channels, edits) {
    const original=part(machine,id), before=clone(original), mask=polygon(original);
    const [rx,ry,rw,rh]=original.rect, upper=halfPlane(mask,[rx,cutY],[rx+rw,cutY],false),
      lower=halfPlane(mask,[rx,cutY],[rx+rw,cutY],true);
    if (!(cutY>ry && cutY<ry+rh) || upper.length<3 || lower.length<3) throw Error('Empty native joint partition: '+id);
    original.sourceClipPolygonNativeXY=upper;
    const next=child(machine,before,childID,lower,hinge,channels);
    edits.push({kind:'complementary-native-partition',part:id,added:[childID],
      cut:{axis:'y',native:cutY},hingeSourceNativeXY:hinge,before,after:clone(original),children:[clone(next)]});
    return next;
  }
  function splitVertical(machine, id, childID, cutX, hinge, channels, edits) {
    const original=part(machine,id), before=clone(original), mask=polygon(original);
    const [rx,ry,rw,rh]=original.rect, left=halfPlane(mask,[cutX,ry],[cutX,ry+rh],true),
      right=halfPlane(mask,[cutX,ry],[cutX,ry+rh],false);
    if (!(cutX>rx && cutX<rx+rw) || left.length<3 || right.length<3) throw Error('Empty native barrel partition: '+id);
    original.sourceClipPolygonNativeXY=left;
    const next=child(machine,before,childID,right,hinge,channels);
    edits.push({kind:'complementary-native-partition',part:id,added:[childID],
      cut:{axis:'x',native:cutX},hingeSourceNativeXY:hinge,before,after:clone(original),children:[clone(next)]});
    return next;
  }
  function hinge(machine,id,nativeXY,channel,factor,edits,cosmetic=false) {
    const item=part(machine,id), before=clone(item), old=item.pivot, s=item.imageScale || 1;
    const next=[nativeXY[0]-item.rect[0],nativeXY[1]-item.rect[1]];
    // Offset compensation preserves the exact closed surface in its existing parent.
    item.offset=[item.offset[0]+(next[0]-old[0])*s,item.offset[1]-(next[1]-old[1])*s];
    item.pivot=next; bind(item,'rotation',channel,factor,cosmetic);
    if (item.detachment) {
      const dx=(next[0]-old[0])*s,dy=-(next[1]-old[1])*s;
      item.detachment.anchor=[item.detachment.anchor[0]+dx,item.detachment.anchor[1]+dy];
    }
    edits.push({kind:'source-socket-hinge',part:id,nativeXY,before,after:clone(item)});
  }
  function attach(machine,id,parentID,edits) {
    const item=part(machine,id), parent=part(machine,parentID);
    if (item.parent===parentID) return;
    if ((item.rotation || 0) || (parent.rotation || 0)) throw Error('Attachment needs rotated explicit basis: '+id);
    const location = item => {
      let p=item,x=0,y=0,count=0;
      while(p){if((p.rotation || 0) || ++count>machine.parts.length) throw Error('Rotated or cyclic socket needs explicit basis: '+id);x+=p.offset[0];y+=p.offset[1];p=p.parent?part(machine,p.parent):null;}
      return [x,y];
    };
    const own=location(item), receiver=location(parent), before=clone(item);item.parent=parentID;
    item.offset=[own[0]-receiver[0],own[1]-receiver[1]];
    edits.push({kind:'rigid-socket-parent',part:id,before,after:clone(item)});
  }
  function apply(catalog) {
    if (!catalog || catalog.schema!=='cqc.machine-parts/1' || !Array.isArray(catalog.machines)) throw Error('Native heavy articulation catalog unavailable');
    const next=clone(catalog), changes=[];
    for (const machine of next.machines) {
      if (!ids.includes(machine.id) || machine.pass29HeavyArticulation===true) continue;
      const sources=JSON.stringify(machine.sources), oldIDs=machine.parts.map(item=>item.id), edits=[];
      if (machine.id==='excelsus_mgr2013') {
        bind(part(machine,'hull'),'y','pass32ExcelsusSeat',-1);
        const joints=[['front_near',510,[1090,538]],['front_far',798,[406,831]],
          ['middle_near',798,[1079,837]],['middle_far',1105,[386,1151]],
          ['rear_near',1097,[1012,1142]],['rear_far',1097,[1167,1144]]];
        for (const [prefix,cut,pivot] of joints) {
          splitHorizontal(machine,prefix+'_shin_claw_module',prefix+'_foot_native',cut,pivot,
            {rotation:[{channel:'pass29_'+prefix+'FootLevel',factor:1}]},edits);
          // A stomp remains mechanically visible when decorative motion is reduced.
          for (const piece of [prefix+'_upper',prefix+'_shin_claw_module'])
            for (const row of part(machine,piece).channels?.rotation || []) row.cosmetic=false;
        }
      } else if (machine.id==='shagohod_mgs3_ps2_2004') {
        // Native long gun barrel and the fixed receiver no longer recoil as one plate.
        const gun=part(machine,'gun_turret');
        const receiver=splitVertical(machine,'gun_turret','gun_receiver_native',1349,[1415,739],
          {},edits);
        // The receiver is the fixed support; the long tube moves about its real socket.
        // Counterrotating a child receiver translated that support sideways during aim.
        receiver.parent=gun.parent;receiver.offset=gun.offset.slice();
        gun.parent=receiver.id;gun.offset=[0,0];
        gun.channels={x:[{channel:'pass32ShagohodRecoilX',factor:1}],
          y:[{channel:'pass32ShagohodRecoilY',factor:1}],
          rotation:[{channel:'pass29GunAim',factor:1}]};
        receiver.z=gun.z-.001;
        for (const id of ['cockpit_roof','near_screw_axle','far_screw_axle',
          'near_screw_strut','far_screw_strut','near_exhaust','far_exhaust']) attach(machine,id,'front_hull',edits);
        attach(machine,'gun_receiver_native','cockpit_roof',edits);
        attach(machine,'roof_sensor','cockpit_roof',edits);
      } else if (machine.id==='kodoque_acid_psp2004') {
        for (const [side,cut,pivot] of [['near',784,[1367,780]],['far',936,[236,931]]]) {
          const gun=part(machine,side+'_cannon');
          const mount=splitHorizontal(machine,gun.id,side+'_cannon_mount_native',cut,pivot,
            {},edits);
          mount.parent=gun.parent;mount.offset=gun.offset.slice();gun.parent=mount.id;gun.offset=[0,0];
          const label=side[0].toUpperCase()+side.slice(1);
          gun.channels={x:[{channel:'pass32Kodoque'+label+'RecoilX',factor:1}],
            y:[{channel:'pass32Kodoque'+label+'RecoilY',factor:1}],
            rotation:[{channel:'pass32Kodoque'+label+'Aim',factor:1}]};
          mount.z=gun.z-.001;
        }
        for (const id of ['near_shoulder_hinge','far_shoulder_hinge']) attach(machine,id,'upper_torso',edits);
      } else if (machine.id==='chaioth_acid2_psp2005') {
        const grip=part(machine,'far_forearm_gripper'), before=clone(grip), mask=polygon(grip);
        const palm=halfPlane(mask,[1260,661],[1505,661],false), fingers=halfPlane(mask,[1260,661],[1505,661],true);
        grip.sourceClipPolygonNativeXY=palm;
        const lineA=[1375,661],lineB=[1450,825];
        const left=halfPlane(fingers,lineA,lineB,true),right=halfPlane(fingers,lineA,lineB,false);
        const first=child(machine,before,'far_gripper_inner_finger_native',left,[1363,661],
          {rotation:[{channel:'pass29GripOpen',factor:-5}]}),
          second=child(machine,before,'far_gripper_outer_finger_native',right,[1416,675],
            {rotation:[{channel:'pass29GripOpen',factor:5}]});
        edits.push({kind:'complementary-native-partition',part:grip.id,
          added:[first.id,second.id],cut:{axis:'palm-and-native-finger-seam',nativeY:661,line:[lineA,lineB]},
          before,after:clone(grip),children:[clone(first),clone(second)]});
        for (const id of ['head_cylinder','chest_shield','near_hip_skirt','far_hip_skirt',
          'purple_mount_couplers','central_neck_gear']) attach(machine,id,'central_frame',edits);
        bind(part(machine,'railgun_outer_fin'),'rotation','pass29RailAperture',-4);
        bind(part(machine,'railgun_inner_fin'),'rotation','pass29RailAperture',4);
      } else if (machine.id==='outer_haven_mgs4_ps3_2008') {
        for (const [side,cut,pivot] of [['near',541,[664,558]],['far',565,[1000,578]]]) {
          splitHorizontal(machine,side+'_hydroplane',side+'_hydroplane_elevator_native',cut,pivot,
            {rotation:[{channel:'pass29HydroplanePitch',factor:side==='near'?1:.8,cosmetic:true}]},edits);
        }
      } else if (machine.id==='arsenal_gear_mgs2_ps2_2001') {
        // A closed lid has a rigid lower lip in this admitted source, not a new door cavity.
        const hatch=part(machine,'hatch');
        const rim=splitHorizontal(machine,'hatch','hatch_lower_rim_native',963,[260,859],
          {rotation:[{channel:'pass29ArsenalHatch',factor:-1}]},edits);
        hinge(machine,'hatch',[260,859],'pass29ArsenalHatch',1,edits);
        // Rebase the static rim after the parent hinge pivot moves; its original world pixels stay fixed.
        const s=hatch.imageScale || 1;
        rim.offset=[(rim.rect[0]+rim.pivot[0]-(hatch.rect[0]+hatch.pivot[0]))*s,
          -(rim.rect[1]+rim.pivot[1]-(hatch.rect[1]+hatch.pivot[1]))*s];
      }
      if (JSON.stringify(machine.sources)!==sources || oldIDs.some(id=>!machine.parts.some(item=>item.id===id))) throw Error('Native historical material lost');
      machine.pass29HeavyArticulation=true;
      machine.documentaryQualifications=[...(machine.documentaryQualifications || []),...limits];
      changes.push({id:machine.id,edits,retainedPartIDs:oldIDs,
        addedPartIDs:machine.parts.filter(item=>!oldIDs.includes(item.id)).map(item=>item.id),
        sourcePixelsChanged:false,HPOrTimingsChanged:false});
    }
    return {catalog:next,changes,limits:[...limits]};
  }
  // Solve existing projected source link lengths at a fixed hip, preserving the original bend side.
  function plantedJoint(first,second,stride,lift) {
    if (Math.abs(stride)+Math.abs(lift)<1e-10) return {upper:0,lower:0,foot:0};
    const a=Math.hypot(...first),b=Math.hypot(...second),na=Math.atan2(first[1],first[0]),
      nb=Math.atan2(second[1],second[0]),target=[first[0]+second[0]+stride,first[1]+second[1]+lift];
    const maxX=Math.sqrt(Math.max(0,(a+b-1e-8)**2-target[1]**2));target[0]=clamp(target[0],-maxX,maxX);
    const distance=clamp(Math.hypot(...target),Math.abs(a-b)+1e-8,a+b-1e-8),
      sign=Math.sin(nb-na)>=0?1:-1,relative=sign*Math.acos(clamp((distance*distance-a*a-b*b)/(2*a*b),-1,1)),
      upper=(Math.atan2(target[1],target[0])-Math.atan2(b*Math.sin(relative),a+b*Math.cos(relative))-na)/DEG,
      lower=(relative-(nb-na))/DEG;
    return {upper,lower,foot:-upper-lower};
  }
  const smooth = t => { t=clamp(t,0,1);return t*t*(3-2*t); };
  function clocks(state,kinds) {
    const events=(state?.events || []).filter(e=>kinds.includes(e.kind));
    const a=state?.boss?.attack;
    if(a && kinds.includes(a.kind)) events.push({...a,age:a.t,warn:a.windup});
    return events.filter(e=>finite(e.age) && finite(e.warn) && e.warn>=0);
  }
  function weaponPhase(state) {
    let impulse=0,brace=0,opening=0;
    for(const e of clocks(state,['gatling','shot','volley','beam','rail','laser','missiles'])){
      const age=e.age-e.warn;
      if(age<0){brace=Math.max(brace,smooth(e.age/Math.max(1,e.warn)));opening=Math.max(opening,brace);}
      else {
        // Only the existing owner event defines an active/recovery boundary.
        // Keep legacy unknown-duration events unchanged instead of making up a clock.
        const active=finite(e.active)?Math.max(1,e.active):Infinity,
          recovery=finite(e.recovery)?Math.max(0,e.recovery):18;
        if(age<active){impulse=Math.max(impulse,Math.exp(-age/2.8));opening=Math.max(opening,1);}
        else if(recovery>0&&age<active+recovery)opening=Math.max(opening,1-smooth((age-active)/recovery));
      }
    }
    return {impulse,brace,opening};
  }
  // Rig rotation is counterclockwise; source/target aim deltas are clockwise canvas degrees.
  function aim(channels,key,fallback,limit=24){
    return finite(channels[key]) ? -clamp(channels[key],-limit,limit)
      : clamp(value(channels[fallback]),-8,8);
  }
  function axialRecoil(channels,name,axis,rotation,recoil){
    const length=Math.hypot(...axis),a=-rotation*DEG,c=Math.cos(a),s=Math.sin(a);
    const x=axis[0]/length,y=axis[1]/length;
    // Negative recoil moves against the visible native forward axis, in the fixed mount basis.
    channels[name+'X']=recoil*(x*c-y*s);channels[name+'Y']=-recoil*(x*s+y*c);
  }
  function presentationPose(id,p,state=null) {
    if (!ids.includes(id) || !p || p.pass29HeavyArticulationID===id) return p;
    const channels={...(p.channels || {})}, flags={...(p.flags || {})},
      dead=p.defeated===true || p.ko===true || /^(dead|ko|collapse|defeated|destroyed)$/.test(p.action || '') || value(channels.collapse)>0 || state?.boss?.defeated===true,
      phase=weaponPhase(state),
      firing=!p.motionEvent || ['gatling','shot','volley','beam','rail','laser','missiles','gun','cannon','fire'].includes(p.motionEvent.kind),
      impulse=dead||!firing?0:clamp(finite(channels.weaponRecoilImpulse)?channels.weaponRecoilImpulse:phase.impulse,0,1),
      recoil=dead||!firing?0:finite(channels.weaponRecoilImpulse)||clocks(state,['gatling','shot','volley','beam','rail','laser']).length
        ? -7*impulse : clamp(value(channels.weaponRecoil),-7,0),
      brace=dead?0:clamp(finite(channels.weaponBrace)?channels.weaponBrace:phase.brace,0,1);
    channels.pass29BarrelRecoil=recoil;
    channels.pass29GunAim=dead?0:aim(channels,'weaponAimDegrees','weaponAim',24);
    if(id==='shagohod_mgs3_ps2_2004') axialRecoil(channels,'pass32ShagohodRecoil',[-253,-37],channels.pass29GunAim,recoil*.3);
    if(id==='kodoque_acid_psp2004') for(const side of ['near','far']){
      const label=side[0].toUpperCase()+side.slice(1),key='weaponAimDegrees'+label;
      channels['pass32Kodoque'+label+'Aim']=dead?0:aim(channels,finite(channels[key])?key:'weaponAimDegrees','weaponAim',25);
      axialRecoil(channels,'pass32Kodoque'+label+'Recoil',side==='near'?[-98,-27]:[-91,-27],channels['pass32Kodoque'+label+'Aim'],recoil*.3);
    }
    if (id==='excelsus_mgr2013') {
      for(const event of clocks(state,['sweep'])){
        const progress=event.warn>0?event.age/event.warn:1,activeAge=event.age-event.warn,
          duration=Math.max(1,value(event.active)),q=clamp(activeAge/duration,0,1);
        const swing=progress<1?-16*smooth(progress):q<.35?-16+54*smooth(q/.35):38*(1-smooth((q-.35)/.65));
        if((event.sources||[]).includes(4)||(event.id==='blade-sweep'&&event.side!==1))channels.nearBladeSwing=dead?0:swing;
        if((event.sources||[]).includes(5)||(event.id==='blade-sweep'&&event.side===1))channels.farBladeSwing=dead?0:-swing;
      }
      const geometry={"front_near":[[-47.87096774193548,-102.09216589861751],[-31.328,-68.352]],"front_far":[[-50.15,-87.125],[-38.04114285714286,-78.676]],"middle_near":[[-58.42926829268293,-100.31219512195122],[-39.882075471698116,-78.50471698113208]],"middle_far":[[-46.55885167464115,-87.94449760765549],[-35.41063829787234,-74.04042553191489]],"rear_near":[[-53,-119.25],[-33.13138686131387,-110.43795620437956]],"rear_far":[[40.57483443708609,-114.56423841059602],[18.179457364341083,-100.28023255813953]]};
      const motion=p.machineMotion||state?.machineMotion,realTravel=finite(motion?.travelX),direction=motion?.direction===-1?-1:1,cycleDistance=12/.65,
        moving=!dead&&(p.walk===true||/^(walk|dash|run)$/.test(p.action||''))&&(!p.reducedMotion||realTravel),
        frame=value(p.frame ?? state?.tick),cycle=realTravel?direction*motion.travelX/cycleDistance:finite(channels.machineStridePhase)?channels.machineStridePhase:frame/112,
        stanceSeat=moving?Math.pow(Math.sin(cycle*Math.PI*2),2)*1.2:0;
      let impactSeat=0;
      for(const event of clocks(state,['stomp'])){
        const age=event.age-event.warn;
        if(age>=0 && age<10) impactSeat=Math.max(impactSeat,Math.sin(age/10*Math.PI)*2.5);
      }
      let seat=dead?0:stanceSeat+brace*.8+impactSeat;
      const contacts=[],targets=[];
      for (const [prefix,[first,second]] of Object.entries(geometry)) {
        // Alternating tripod, 35% transfer and 65% loaded stance: at least three supports stay planted.
        const alternate=['front_far','middle_near','rear_far'].includes(prefix)? .5:0,
          step=((cycle+alternate)%1+1)%1,flight=step<.35;
        const t=step/.35,blend=t**3*(10+t*(-15+6*t)),tangent=-cycleDistance*.35;
        let stride=moving?direction*(flight?-6+12*blend+tangent*t*(1-t)*(1-2*t):6-12*(step-.35)/.65):0,
          lift=moving&&flight?Math.sin(step/.35*Math.PI)**2*14:0;
        const pool={front_near:0,front_far:1,middle_near:2,rear_near:2,middle_far:3,rear_far:3}[prefix];
        for (const event of clocks(state,['stomp'])) {
          if (!(event.sources || []).includes(pool)) continue;
          const progress=event.warn>0?event.age/event.warn:1;
          // Lift visibly before impact, then plant at the exact first dangerous frame.
          if(progress<1){const raised=progress<.68?smooth(progress/.68):1-smooth((progress-.68)/.32);lift=Math.max(lift,raised*30);stride=0;}
          else if(event.age<event.warn+Math.max(1,value(event.active))) {stride=0;lift=0;}
        }
        contacts.push({limb:prefix,support:lift===0&&flags['part'+pool+'Destroyed']!==true,phase:step,pool,destroyed:flags['part'+pool+'Destroyed']===true,stride,lift});
        targets.push({prefix,first,second,stride,lift});
        if(!dead){const x=first[0]+second[0]+stride,y=first[1]+second[1]+lift,
          reach=Math.hypot(...first)+Math.hypot(...second)-1e-8;
          // Decide the hull load before IK. Clamping a fully extended stance
          // ankle in X would slide it despite an otherwise correct distance phase.
          seat=Math.max(seat,-Math.sqrt(Math.max(0,reach*reach-x*x))-y);}
      }
      channels.pass32ExcelsusSeat=seat;
      for(const {prefix,first,second,stride,lift}of targets){
        const joint=plantedJoint(first,second,dead?0:stride,dead?0:lift+seat);
        channels[prefix+'Swing']=joint.upper;channels[prefix+'Knee']=joint.lower;
        channels['pass29_'+prefix+'FootLevel']=joint.foot;
      }
      p={...p,excelsus35MotionSupport:{mode:realTravel?'explicit-native-root-distance':'nominal-frame-presentation',realTravel,worldContactQualified:realTravel&&moving&&contacts.every(row=>!row.destroyed),travelX:realTravel?motion.travelX:null,walking:moving,cycleDistance,legs:contacts}};
    }
    channels.pass29GripOpen=dead?0:clamp(Math.max(value(channels.shieldOpen),brace),0,1);
    channels.pass29RailAperture=dead?0:clamp(Math.max(flags.chaiothRailWarning?1:0,phase.opening),0,1);
    channels.pass29HydroplanePitch=dead?0:clamp(value(channels.bodyRoll)+value(channels.weaponAim)*.25,-6,6);
    channels.pass29ArsenalHatch=dead?0:phase.opening*7;
    return {...p,channels,flags,pass29HeavyArticulationID:id};
  }
  const axis=(part,baseNativeXY,tipNativeXY,channel='weaponAimDegrees',limit=24,jointPart=part)=>Object.freeze({part,jointPart,
    baseNativeXY:Object.freeze(baseNativeXY),tipNativeXY:Object.freeze(tipNativeXY),channel,minDegrees:-limit,maxDegrees:limit});
  const shagohodAxis=axis('gun_turret',[1415,739],[1162,702],'weaponAimDegrees',24,'gun_receiver_native'),
    kodoqueNear=axis('near_cannon',[1367,780],[1269,753],'weaponAimDegreesNear',25,'near_cannon_mount_native'),
    kodoqueFar=axis('far_cannon',[236,931],[145,904],'weaponAimDegreesFar',25,'far_cannon_mount_native'),
    // The source shows these bores, but not an independently reviewed aiming bearing.
    // Keep their admitted projection fixed; emitters and collision share this exact axis.
    chaiothRail=axis('railgun_receiver',[136,928],[107,995],'pass34ChaiothFixedRail',0),
    chaiothGun=axis('near_forearm_gun',[995,660],[915,707],'pass34ChaiothFixedGun',0);
  const aimAxes=Object.freeze({shagohod_mgs3_ps2_2004:Object.freeze({byAttackKind:Object.freeze({shot:shagohodAxis,volley:shagohodAxis,gatling:shagohodAxis,beam:shagohodAxis})}),
    kodoque_acid_psp2004:Object.freeze({byAttackKind:Object.freeze({beam:kodoqueNear,shot:kodoqueNear,volley:kodoqueNear}),
      bySourceIndex:Object.freeze({0:kodoqueNear,1:kodoqueFar,2:kodoqueNear})}),
    chaioth_acid2_psp2005:Object.freeze({byAttackKind:Object.freeze({rail:chaiothRail,beam:chaiothRail,shot:chaiothGun,volley:chaiothGun})})});
  const weaponPoints=Object.freeze({shagohod:{part:'gun_turret',sourceNativeXY:[1162,702]},
    kodoque:{part:'near_cannon',sourceNativeXY:[1269,753]},
    chaioth:{byAttackKind:{rail:{part:'railgun_receiver',sourceNativeXY:[107,995]},beam:{part:'railgun_receiver',sourceNativeXY:[107,995]},shot:{part:'near_forearm_gun',sourceNativeXY:[915,707]}}}});
  const sourcePoints=Object.freeze({
    shagohod_mgs3_ps2_2004:{ballistic:{part:'gun_turret',nativeXY:[1162,702],kind:'native barrel mouth'}},
    kodoque_acid_psp2004:{ballistic:{part:'near_cannon',nativeXY:[1269,753],kind:'native near cannon mouth'},
      ballisticFar:{part:'far_cannon',nativeXY:[145,904],kind:'native far cannon mouth'}},
    chaioth_acid2_psp2005:{rail:{part:'railgun_receiver',nativeXY:[107,995],kind:'fixed source-native rail barrel mouth; independent aiming bearing unreviewed'},
      ballistic:{part:'near_forearm_gun',nativeXY:[915,707],kind:'fixed source-native gun mouth; independent aiming bearing unreviewed'}}
  });
  root.CQC_PASS29_HEAVY_ARTICULATION=Object.freeze({apply,presentationPose,ids,limits,weaponPoints,sourcePoints,aimAxes,
    audit:Object.freeze({schema:'cqc.pass29.native-heavy-articulation/1',ids,
      sourcePixelsChanged:false,simulationMutation:false,absolute1to1Certified:false})});
})(globalThis);
