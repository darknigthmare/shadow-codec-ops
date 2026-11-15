/* Archive: seven exact-incarnation native encounters. Owner engine retains HP, score,
   saves, attack budgets and the only clock. Pass36 shares one fixed encounter camera
   and world basis; undocumented physical dimensions remain explicitly unknown. */
(function(root){'use strict';
 const profiles=Object.freeze({
  mgs4_gekko:{id:'gekko_mgs4_ps3_2008',arsenal:'gekko',height:360,kind:'gun',units:3,spacing:115},
  mgs4_dwarf:{id:'dwarf_gekko_mgs4_ps3_2008',arsenal:'dwarf_swarm',height:82,contact:true,units:20,spacing:49},
  mgs1_hind:{id:'hind_d_mgs1_ps1_1998',arsenal:'hind_d',height:255,air:true,kind:'missile'},
  mgs1_tank:{id:'m1_mgs1_ps1_1998',arsenal:'m1tank',height:226,kind:'shot'},
  mg1_bulldozer:{id:'bulldozer_mg1_msx1987',arsenal:'bulldozer',height:215,contact:true},
  mgsv_battle_gear:{id:'battle_gear_mgsv2015',arsenal:'battle_gear',height:330,kind:'rail'},
  mgsv_walker_column:{id:'walker_gear_mgsv2015',arsenal:'walker_column',height:276,kind:'gun',units:4,spacing:91}
 });
 const clamp=(n,a,b)=>Math.max(a,Math.min(b,n)),finite=(n,d=0)=>Number.isFinite(n)?n:d;
 const bridge=()=>root.CQC_PASS18_MACHINES;
 let catalog=null,definitions=null;const portraitJobs=new WeakMap();
 function definition(id){if(catalog!==root.CQC_MACHINE_PARTS_CATALOG){catalog=root.CQC_MACHINE_PARTS_CATALOG;definitions=root.CQC_MACHINE_PARTS?.normalizeCatalog(catalog);}return definitions?.get(id);}
 const profile=b=>profiles[typeof b==='string'?b:b?.id]||null;
 function owns(g){return g?.kind==='boss'&&!!profile(g.boss)&&!!g.enemy?.archiveNative35;}
 const humanCalibration=Object.freeze({uid:'archive__snake_tts',pixels:254,metres:1.82,top:-254,sole:-1,source:'Archive legacyHumanV4 neutral head vertex and foot-origin; official matching Snake TTS height in CQC_PASS19_WORLD_SCALE',qualification:'Foot-origin to head-top convention, excluding outline; procedural source posture and equipment are not certified anatomy.'});
 function offsets(p,spacing,unit){return p.units>1?{x:(unit-(p.units-1)/2)*spacing,y:0}:{x:0,y:0};}
 function configure(g){const p=profile(g?.boss);if(!p||g.kind!=='boss')return g;
  const b=bridge()?.bounds(p.id);if(!b)return g;
  const calibrated=root.CQC_PASS36_MACHINE_SCALE?.calibration(p.id,b,{humanPixels:humanCalibration.pixels,humanMetres:humanCalibration.metres}),sc=calibrated?.scale>0?calibrated.scale:p.height/b.height,height=b.height*sc,width=b.width*sc;
  const spacing=p.units>1?Math.max(p.spacing,width+humanCalibration.pixels*.18):0,positions=Array.from({length:p.units||1},(_,unit)=>offsets(p,spacing,unit)),minX=Math.min(...positions.map(v=>v.x)),maxX=Math.max(...positions.map(v=>v.x)),minY=Math.min(...positions.map(v=>v.y));
  // Separate full same-incarnation units on their shared ground plane. Twenty
  // Dwarfs widen the fixed scene; no depth shrink or invented stacked floors.
  g.enemy.x=g.player.x+300+width/2-minX;
  const right=Math.max(1280,g.enemy.x+maxX+width/2+80),airGap=p.air?100:0,homeY=p.air?560-airGap-height/2:560;
  const zoom=Math.min(1,1160/right,430/(height+airGap-minY+24)),camera=Object.freeze({schema:'cqc.pass36.archive-fixed-camera/1',scale:zoom,x:(1280-right*zoom)/2,y:560-560*zoom,width:1280,height:720,fixed:true});
  const scene=Object.freeze({left:0,right,floor:560,playerMin:70,playerMax:right-70,machineScale:sc,machineHeight:height,machineWidth:width,spacing,airHomeY:homeY,calibration:calibrated||null,heightStatus:calibrated?.heightStatus||'Preserved authored Archive height; no eligible metric dimensions established.',humanCalibration,backgroundPlayerX:330});
  g.paused=false;g.enemy.y=homeY;g.enemy.archiveNative35={frame:0,homeX:g.enemy.x,attack:null,rush:null,camera,scene};return g;
 }
 function tick(g){if(!owns(g)||g.ended||g.paused)return;const e=g.enemy,n=e.archiveNative35,p=profile(g.boss);n.frame++;
  // A contact carrier follows the oldest live charge's captured destination.
  // Later patterns and a player crossing its body cannot retarget that charge.
  if(p.contact&&!p.units&&n.carrierSpeed){const carrier=e.projectiles.find(q=>q.native35?.contact&&q.life>0),active=!!carrier,goal=active?finite(carrier.native35.carrierTargetX,n.homeX):n.homeX,dx=goal-e.x;e.x+=clamp(dx*.12,-n.carrierSpeed,n.carrierSpeed);n.rush=Math.abs(dx)>.05?{active}:null;if(!active&&Math.abs(dx)<.05){e.x=n.homeX;n.carrierSpeed=0;n.rush=null;}}
  if(p.air)e.y=(n.scene?.airHomeY??310)+Math.sin(n.frame*.017)*12;
 }
 function event(g){const n=g.enemy.archiveNative35,a=n.attack;if(!a)return null;const age=n.frame-a.startedAt;if(age>=a.warn+a.active+a.recovery)return null;return{...a,age};}
 function world(b,p){return{x:b[0]*p.x+b[2]*p.y+b[4],y:b[1]*p.x+b[3]*p.y+b[5]};}
 function worldBox(b,r){if(!r)return null;const points=[[r.left,r.top],[r.right,r.top],[r.left,r.bottom],[r.right,r.bottom]].map(([x,y])=>world(b,{x,y}));const left=Math.min(...points.map(p=>p.x)),right=Math.max(...points.map(p=>p.x)),top=Math.min(...points.map(p=>p.y)),bottom=Math.max(...points.map(p=>p.y));return{left,right,top,bottom,width:right-left,height:bottom-top};}
 function sourceContext(g,options={}){const p=profile(g.boss),e=g.enemy,n=e.archiveNative35;if(!p||!n)return null;const api=bridge(),m=definition(p.id),b=api?.bounds(p.id);if(!m||!b)return null;
  const unit=finite(options.unit),sc=options.height!==undefined?finite(options.height,p.height)/b.height:n.scene?.machineScale||p.height/b.height;
  let x=finite(options.x,e.x),y=finite(options.y,e.y);
  if(options.x===undefined&&p.units>1){const offset=offsets(p,n.scene?.spacing||p.spacing,unit);x+=offset.x;y+=offset.y;}
  const basis=[sc,0,0,sc,x-(b.left+b.width/2)*sc,y-(p.air?b.top+b.height/2:b.bottom)*sc];
  const a=event(g),moving=!!options.moving||!!n.rush,dead=e.life<=0;
  const raw=api.mechanicalPose(p.id,{frame:n.frame,action:dead?'dead':moving?'walk':a?'shoot':'idle',attacking:!!a&&!dead,phaseProgress:a?clamp((a.age-a.warn)/Math.max(1,a.active),0,1):0,defeated:dead,machineMotion:{travelX:basis[4]/sc,direction:1,source:'engine-archive-native-root'}},[]);
  if(!raw)return null;const state={tick:n.frame,events:a?[a]:[],motionState:{x,y}};
  const pose=a&&!p.contact&&!p.air?api.mechanicalAimPose(p.id,raw,state,basis,a):root.CQC_PASS28_RIG_SETUP.presentationPose(p.id,raw,state);
  return{id:p.id,profile:p,machine:m,pose,basis,root:{x,y},unit};
 }
 function contexts(g){const p=profile(g.boss);if(!p||!owns(g))return[];const mobile=new Set(p.contact&&p.units?g.enemy.projectiles.filter(q=>q.native35?.contact&&q.native35.emitted&&q.life>0).map(q=>q.native35.unit):[]);return Array.from({length:p.units||1},(_,unit)=>mobile.has(unit)?null:sourceContext(g,{unit})).filter(Boolean);}
 function body(value){return worldBox(value.basis,root.CQC_PASS28_MACHINE_GEOMETRY.bounds(value.machine,root.CQC_MACHINE_PARTS,value.pose));}
 function targets(value){const list=root.CQC_PASS28_RIG_SETUP.targetParts()[value.profile.arsenal]||[],geo=root.CQC_PASS28_MACHINE_GEOMETRY;return list.map((descriptor,index)=>{
  const point=geo.sourcePoint(value.machine,root.CQC_MACHINE_PARTS,value.pose,descriptor);if(!point)return null;
  const partOnly={...value.machine,paintOrder:value.machine.paintOrder.filter(p=>p.id===descriptor.part)};
  return{...world(value.basis,point),part:point.part,index,alphaMeasured:point.alphaMeasured,qualification:point.alphaMeasured?'available alpha-measured native part box':'bounded final native source rectangle; final clipped alpha record unavailable',sourceNativeXY:point.nativeXY,box:worldBox(value.basis,geo.bounds(partOnly,root.CQC_MACHINE_PARTS,value.pose))};
 }).filter(Boolean);}
 function weapon(value,sourceIndex=0){if(value.profile.contact)return null;
  // Both MGS1 Hind pods are independently admitted left-facing source art.
  // The bridge pins their final native mouths; no mirroring or aiming servo.
  const vector=bridge().mechanicalWeaponVector(value.id,value.pose,value.basis,{kind:value.profile.kind,sources:value.profile.air?[sourceIndex%2]:[]});
  return vector?.axisVisible?{...vector,fixedNativeAxis:!!value.profile.air}:null;
 }
 function contactContexts(g){if(!owns(g)||g.boss.id!=='mgs4_dwarf')return[];return g.enemy.projectiles.filter(q=>q.native35?.contact&&q.native35.emitted).map(q=>sourceContext(g,{x:q.x,y:q.y,unit:q.native35.unit,moving:true})).filter(Boolean);}
 function hitBoxes(g){return[...contexts(g),...contactContexts(g)].flatMap(v=>targets(v).map(t=>({...t,rigID:v.id,unit:v.unit})));}
 function contains(box,x,y,margin=0){return box&&x>=box.left-margin&&x<=box.right+margin&&y>=box.top-margin&&y<=box.bottom+margin;}
 function overlaps(a,b){return a&&b&&a.left<=b.right&&a.right>=b.left&&a.top<=b.bottom&&a.bottom>=b.top;}
 function segmentBox(box,ax,ay,bx,by,margin=0){if(!box)return false;let lo=0,hi=1;for(const [a,d,min,max]of[[ax,bx-ax,box.left-margin,box.right+margin],[ay,by-ay,box.top-margin,box.bottom+margin]]){if(Math.abs(d)<1e-9){if(a<min||a>max)return false;}else{const t0=(min-a)/d,t1=(max-a)/d;lo=Math.max(lo,Math.min(t0,t1));hi=Math.min(hi,Math.max(t0,t1));if(lo>hi)return false;}}return true;}
 // Retain the owner's minimum flight; only a forward bore ray intersecting
 // the box captured at emission can extend it. No later target following.
 function retainFlightToBox(q,box,margin=0,decrementedBeforeEmission=false){
  if(!box||![q.x,q.y,q.vx,q.vy,q.life,box.left,box.right,box.top,box.bottom,margin].every(Number.isFinite)||q.life<0||box.left>box.right||box.top>box.bottom||Math.hypot(q.vx,q.vy)<1e-9)return null;
  let enter=0,exit=Infinity;
  for(const [origin,speed,min,max]of[[q.x,q.vx,box.left-margin,box.right+margin],[q.y,q.vy,box.top-margin,box.bottom+margin]]){
   if(Math.abs(speed)<1e-9){if(origin<min||origin>max)return null;}
   else{const a=(min-origin)/speed,b=(max-origin)/speed;enter=Math.max(enter,Math.min(a,b));exit=Math.min(exit,Math.max(a,b));if(enter>exit)return null;}
  }
  const entrySteps=Math.max(1,Math.ceil(enter));if(!Number.isSafeInteger(entrySteps))return null;
  const remainingBefore=q.life;
  // Enemy life was decremented before emission: its current movement is still
  // tested for collision at life zero. Player life is decremented afterwards.
  q.life=Math.max(remainingBefore,entrySteps-(decrementedBeforeEmission?1:0));
  return{targetBox:{left:box.left,right:box.right,top:box.top,bottom:box.bottom},margin,entrySteps,remainingBefore,remainingAtEmission:q.life,decrementedBeforeEmission};
 }
 function playerBox(p){return{left:p.x-35,right:p.x+35,top:p.y+humanCalibration.top,bottom:p.y-4};}
 // This is the retained procedural Snake TTS pistol, not extracted canonical art.
 // Its visible V1 receiver is [0,-9,48,18], with grip [7,8,15,24].
 const playerFirearm=Object.freeze({weapon:'pistol',source:'Archive weaponV V1 procedural pistol',anchor:[42,-176],base:[0,0],mouth:[48,0],grip:[14.5,20],supportGrip:[10.5,18],arcDegrees:[-55,55],speed:Math.hypot(12,-1),front:{shoulder:[22,-194],lengths:[44,40]},back:{shoulder:[-27,-196],lengths:[52,48]}});
 function armIK(shoulder,hand,lengths){const dx=hand.x-shoulder[0],dy=hand.y-shoulder[1],distance=Math.hypot(dx,dy),[upper,lower]=lengths,d=clamp(distance,Math.abs(upper-lower)+1e-6,upper+lower-1e-6),ux=dx/Math.max(1e-6,distance),uy=dy/Math.max(1e-6,distance),along=(upper*upper-lower*lower+d*d)/(2*d),height=Math.sqrt(Math.max(0,upper*upper-along*along));
  return{shoulder:{x:shoulder[0],y:shoulder[1]},elbow:{x:shoulder[0]+ux*along-uy*height,y:shoulder[1]+uy*along+ux*height},hand:{...hand},upperLength:upper,lowerLength:lower,reachable:distance>=Math.abs(upper-lower)&&distance<=upper+lower};
 }
 function playerAim(g,options={}){if(!owns(g))return null;const p=g.player,frame=g.enemy.archiveNative35.frame,descriptor=playerFirearm,anchor={x:p.x+descriptor.anchor[0],y:p.y+descriptor.anchor[1]},radians=Math.PI/180,min=descriptor.arcDegrees[0]*radians,max=descriptor.arcDegrees[1]*radians;
  const candidates=hitBoxes(g).filter(t=>t.alphaMeasured&&contains(t.box,t.x,t.y)).map(t=>{const dx=t.x-anchor.x,dy=t.y-anchor.y,distance=Math.hypot(dx,dy),angle=Math.atan2(dy,dx);return{...t,distance,angle,admitted:dx>0&&distance>descriptor.mouth[0]+4&&angle>=min&&angle<=max};}).sort((a,b)=>a.distance-b.distance);
  const target=candidates.find(t=>t.admitted)||candidates[0]||null,shot=options.shot||p.archiveShot35,age=shot?frame-shot.startedAt:Infinity,emissionAge=Number.isFinite(shot?.emittedAt)?frame-shot.emittedAt:Infinity,locked=options.lock!==false&&emissionAge>=0&&emissionAge<7&&Number.isFinite(shot?.angle);
  const desired=target?.angle??0,angle=locked?shot.angle:clamp(desired,min,max),ux=Math.cos(angle),uy=Math.sin(angle),recoil=age<28&&emissionAge>=0&&emissionAge<14?3*Math.exp(-emissionAge/3.2):0;
  const localOrigin={x:descriptor.anchor[0]-ux*recoil,y:descriptor.anchor[1]-uy*recoil},project=n=>({x:localOrigin.x+n[0]*ux-n[1]*uy,y:localOrigin.y+n[0]*uy+n[1]*ux}),base=project(descriptor.base),muzzle=project(descriptor.mouth),grip=project(descriptor.grip),supportGrip=project(descriptor.supportGrip),front=armIK(descriptor.front.shoulder,grip,descriptor.front.lengths),back=armIK(descriptor.back.shoulder,supportGrip,descriptor.back.lengths);
  const targetSummary=target?{x:target.x,y:target.y,part:target.part,unit:target.unit,rigID:target.rigID,alphaMeasured:true,sourceNativeXY:target.sourceNativeXY.slice()}:null,error=target?Math.atan2(Math.sin(desired-angle),Math.cos(desired-angle)):null;
  return{schema:'cqc.pass35.archive-player-pistol-pose/2',source:descriptor.source,weapon:descriptor.weapon,frame,angle,arcDegrees:descriptor.arcDegrees.slice(),origin:localOrigin,base:{x:p.x+base.x,y:p.y+base.y},muzzle:{x:p.x+muzzle.x,y:p.y+muzzle.y},axis:{x:ux,y:uy},front,back,grip,supportGrip,recoil,target:targetSummary,targetAligned:!!target?.admitted&&Math.abs(error)<1e-7,angularError:error,reason:!target?'no-admitted-native-alpha-target':target.admitted?locked?'emission-pose-recoil':'native-alpha-target':target.x<=anchor.x?'target-behind-retained-right-facing-player':target.distance<=descriptor.mouth[0]+4?'target-inside-pistol-envelope':'target-outside-retained-pistol-arc',qualification:'Procedural inherited player, fixed torso and two attached articulated arms. Original pistol geometry, bounded forward arc, no homing and no extracted-art or absolute 1:1 claim.'};
 }
 function drawPlayerArms(c,v,aim,hooks){if(!aim||v.weapon!=='pistol'||!aim.front.reachable||!aim.back.reachable)return false;const color=v.primary||'#5d7384';
  const drawArm=(arm,shade)=>{hooks.limbV(c,[arm.shoulder.x,arm.shoulder.y],[arm.elbow.x,arm.elbow.y],22,hooks.tone(color,shade));hooks.limbV(c,[arm.elbow.x,arm.elbow.y],[arm.hand.x,arm.hand.y],19,hooks.tone(color,shade-.05));};
  drawArm(aim.back,-.24);drawArm(aim.front,0);
  // Cancel only weaponV's retained idle transform, then apply this shared bore pose.
  c.save();c.translate(aim.origin.x,aim.origin.y);c.rotate(aim.angle);c.rotate(.14);c.translate(-35,118);hooks.weaponV(c,v,{attack:false});c.restore();
  for(const [hand,radius]of[[aim.supportGrip,8],[aim.grip,8]]){c.fillStyle=hooks.tone(color,-.52);c.strokeStyle='#07100c';c.lineWidth=2;c.beginPath();c.arc(hand.x,hand.y,radius,0,Math.PI*2);c.fill();c.stroke();}return true;
 }
 function launchPlayerShot(g,q,boxes){const meta=q.playerNative35;if(!meta||meta.emitted)return;meta.emittedAt=g.enemy.archiveNative35.frame;const aim=playerAim(g,{shot:meta,lock:false});if(!aim)return;meta.angle=aim.angle;meta.emitted=true;meta.emission={frame:aim.frame,x:aim.muzzle.x,y:aim.muzzle.y,base:{...aim.base},tip:{...aim.muzzle},axis:{...aim.axis},target:aim.target,aligned:aim.targetAligned,reason:aim.reason,source:aim.source};q.x=aim.muzzle.x;q.y=aim.muzzle.y;q.vx=aim.axis.x*playerFirearm.speed;q.vy=aim.axis.y*playerFirearm.speed;
  const target=aim.targetAligned&&boxes.find(t=>t.alphaMeasured&&t.rigID===aim.target.rigID&&t.unit===aim.target.unit&&t.part===aim.target.part&&contains(t.box,aim.target.x,aim.target.y));
  if(target)meta.flightBudget=retainFlightToBox(q,target.box,4);
 }
 function pattern(g,legacy){if(!owns(g))return legacy(g);if(g.paused||g.ended)return;const e=g.enemy,n=e.archiveNative35,p=profile(g.boss),start=e.projectiles.length;legacy(g);const added=e.projectiles.slice(start);if(!added.length)return;
  const first=added[0],warn=first.kind==='zone'?first.life-first.armed:0;
  n.attack={kind:p.kind||'contact',startedAt:n.frame,warn,active:Math.max(1,Math.min(30,first.life-warn)),recovery:18,aimTarget:[g.player.x,g.player.y-80],sources:[]};
  if(p.contact&&!p.units)n.carrierSpeed=Math.max(8,...added.map(q=>Math.hypot(q.vx,q.vy)));
  const available=contexts(g);
  added.forEach((q,index)=>{const original={kind:q.kind,life:q.life,vx:q.vx,vy:q.vy,armed:q.armed},wait=q.kind==='zone'?q.life-q.armed:0;
   q.native35={original,contact:!!p.contact,...(p.contact&&!p.units?{carrierTargetX:Math.max(180,n.attack.aimTarget[0]+105)}:{}),emitted:false,fireAt:n.frame+wait,unit:available[index%Math.max(1,available.length)]?.unit??0,speed:Math.hypot(q.vx,q.vy)||(p.air?5.2:8),sourceIndex:p.air?index%2:0,sourceKind:p.contact?'native-contact':p.air?'fixed-admitted-rocket-pod':p.kind};
   q.kind=p.contact?'native-contact':p.air?'missile':'native-shot';q.vx=0;q.vy=0;
   const v=available[q.native35.unit]||available[0];q.x=v?.root.x??e.x;q.y=v?.root.y??e.y;
  });
 }
 function emit(g,q){const p=profile(g.boss),v=sourceContext(g,{unit:q.native35.unit});if(!v)return false;
  if(p.contact){q.native35.emitted=true;if(p.units){q.x=v.root.x;q.y=560;const sign=g.player.x<q.x?-1:1;q.vx=sign*q.native35.speed;q.vy=0;}return true;}
  const muzzle=weapon(v,q.native35.sourceIndex);if(!muzzle||muzzle.tip.x>=muzzle.base.x)return false;
  const dx=muzzle.tip.x-muzzle.base.x,dy=muzzle.tip.y-muzzle.base.y,len=Math.hypot(dx,dy);if(len<1e-6)return false;
  q.x=muzzle.x;q.y=muzzle.y;q.vx=dx/len*q.native35.speed;q.vy=dy/len*q.native35.speed;q.native35.emitted=true;
  q.native35.emission={frame:g.enemy.archiveNative35.frame,x:q.x,y:q.y,base:{...muzzle.base},tip:{...muzzle.tip},part:muzzle.part,basis:v.basis.slice(),axisAligned:true};q.native35.flightBudget=retainFlightToBox(q,playerBox(g.player),0,true);return true;
 }
 function playerAttack(g,special,hooks){if(g.paused||g.ended)return;const p=g.player,e=g.enemy;if(p.attack>0||p.reloadT>0)return;if(special&&p.ammo<=0){hooks.showToast('MUNITIONS VIDES · BAS + I POUR RECHARGER');return;}
  p.attack=special?28:18;const damage=(special?850:380)*(p.supportPower>0?1.25:1);if(special)p.ammo--;
  if(special){const meta={startedAt:g.enemy.archiveNative35.frame,emittedAt:null,emitted:false,angle:null};p.archiveShot35=meta;const aim=playerAim(g);g.particles.push({x:aim.muzzle.x,y:aim.muzzle.y,vx:0,vy:0,life:70,max:70,color:'#e0c56e',shot:true,damage,delay:12,playerNative35:meta});return;}
  const reach={left:p.x,right:p.x+150,top:p.y-170,bottom:p.y-20},hit=hitBoxes(g).find(t=>overlaps(reach,t.box));
  if(hit){e.life-=damage;g.score+=damage;hooks.spawn(g,hit.x,hit.y,'#ffd17b',12);}
 }
 function updateProjectiles(g,hooks){if(g.paused||g.ended)return;const p=g.player,e=g.enemy,n=e.archiveNative35,boxes=hitBoxes(g);
  for(let i=g.particles.length-1;i>=0;i--){const q=g.particles[i];if(!q.shot)continue;if(q.delay>0){q.delay--;if(q.playerNative35){const aim=playerAim(g,{shot:q.playerNative35});q.x=aim.muzzle.x;q.y=aim.muzzle.y;}continue;}if(q.playerNative35&&!q.playerNative35.emitted)launchPlayerShot(g,q,boxes);const oldX=q.x,oldY=q.y;q.x+=q.vx;q.y+=q.vy;q.life--;
   const hit=boxes.find(t=>segmentBox(t.box,oldX,oldY,q.x,q.y,4));if(hit){e.life-=q.damage;g.score+=q.damage;hooks.spawn(g,q.x,q.y,'#ffd17b',14);g.particles.splice(i,1);}else if(q.life<=0||q.x>(n.scene?.right??1300)+20||q.x<(n.scene?.left??0)-20)g.particles.splice(i,1);
  }
  const pbox=playerBox(p);
  for(let i=e.projectiles.length-1;i>=0;i--){const q=e.projectiles[i],meta=q.native35;if(!meta)continue;q.life--;
   if(!meta.emitted&&n.frame>=meta.fireAt)emit(g,q);
   if(meta.emitted){if(meta.contact){let bodies;if(profile(g.boss).units){q.x+=q.vx;q.y+=q.vy;const v=sourceContext(g,{x:q.x,y:q.y,moving:true});bodies=v?[body(v)]:[];}else bodies=contexts(g).map(body);
     if(bodies.some(b=>overlaps(b,pbox))){hooks.bossHit(g,q.damage);e.projectiles.splice(i,1);continue;}
    }else{const oldX=q.x,oldY=q.y;q.x+=q.vx;q.y+=q.vy;if(segmentBox(pbox,oldX,oldY,q.x,q.y)){hooks.bossHit(g,q.damage);e.projectiles.splice(i,1);continue;}}}
   if(q.life<=0||q.x<(n.scene?.left??0)-250||q.x>(n.scene?.right??1280)+220)e.projectiles.splice(i,1);
  }
 }
 function drawValue(c,v,owner){return bridge()?.drawMechanical(c,v.id,v.pose,v.basis,owner)===true;}
 function requestPortrait(c,b,repaint){if(!c.canvas||portraitJobs.has(c.canvas))return;const canvas=c.canvas;portraitJobs.set(canvas,b.id);bridge()?.whenReadyBoss(profile(b).arsenal,'arsenal').then(()=>{const wanted=portraitJobs.get(canvas);portraitJobs.delete(canvas);if(wanted===b.id&&typeof repaint==='function')repaint();}).catch(()=>portraitJobs.delete(canvas));}
 function drawEntity(c,b,e,portrait=false,hooks={}){const p=profile(b);if(!p)return false;
  if(!bridge()?.ready(p.id)){if(portrait)requestPortrait(c,b,hooks.repaint);return true;}
  if(portrait){const fake={kind:'boss',boss:b,enemy:{...e,life:finite(e.life,1),x:0,y:0,archiveNative35:{frame:0,attack:null,rush:null}}};const bnd=bridge().bounds(p.id),height=Math.min(205,280*bnd.height/bnd.width),v=sourceContext(fake,{x:0,y:5,height});if(v)drawValue(c,v,c.canvas);return true;}
  const fake={kind:'boss',boss:b,enemy:e};for(const v of contexts(fake))drawValue(c,v,e);for(const v of contactContexts(fake))drawValue(c,v,e);return true;
 }
 function update(g,hooks){if(!owns(g)||g.ended||g.paused)return;tick(g);g.timer=Math.max(0,g.timer-1);
  const p=g.player,e=g.enemy,b=g.boss,scene=e.archiveNative35.scene;p.flash=Math.max(0,p.flash-1);
  // Retain the owner movement norms, gravity, jump, attack/reload timings and
  // minimum projectile lifetimes in world units. Only a captured box on the
  // emitted bore ray can extend flight. Camera zoom never changes these norms.
  const dir=(hooks.inputDown('ArrowLeft')?-1:0)+(hooks.inputDown('ArrowRight')?1:0);p.vx=dir*5;
  if(hooks.pressed('ArrowUp')&&p.onGround){p.vy=-14;p.onGround=false;}p.guard=hooks.inputDown('KeyL');
  if(p.reloadT>0){p.reloadT--;if(p.reloadT===0){p.ammo=12;hooks.showToast('MUNITIONS PRÊTES');}}
  else{if(hooks.pressed('KeyJ'))playerAttack(g,false,hooks);if(hooks.pressed('KeyI')&&hooks.inputDown('ArrowDown')&&p.attack<=0&&p.ammo<12){p.reloadT=60;p.attack=60;}else if(hooks.pressed('KeyI'))playerAttack(g,true,hooks);}
  p.vy+=.7;p.x+=p.vx;p.y+=p.vy;if(p.y>=560){p.y=560;p.vy=0;p.onGround=true;}p.x=clamp(p.x,scene?.playerMin??70,scene?.playerMax??1210);
  if(p.attack>0)p.attack--;e.t--;if(e.t<=0){hooks.bossPattern(g);e.t=Math.max(35,95-e.phase*15);}
  updateProjectiles(g,hooks);hooks.updateParticles(g);
  if(e.life<=0||g.score>=hooks.bossLife(b))hooks.endGame(true,`${b.name} NE RÉPOND PLUS.`);else if(p.life<=0||g.timer<=0)hooks.endGame(false,`OPÉRATION ROMPUE · ${b.name}`);
 }
 function draw(c,g,hooks){if(!owns(g))return false;const n=g.enemy.archiveNative35,camera=n.camera;
  if(hooks.drawStage)hooks.drawStage(c,{...g,player:{...g.player,x:n.scene?.backgroundPlayerX??330}});
  hooks.drawSupportHud(c,g);hooks.drawBossHUD(c,g);c.save();try{
  if(camera)c.transform(camera.scale,0,0,camera.scale,camera.x,camera.y);
  hooks.drawPlayerBoss(c,g.player,g);drawEntity(c,g.boss,g.enemy);
  for(const q of g.enemy.projectiles){if(!q.native35||q.native35.contact)continue;if(!q.native35.emitted){const v=sourceContext(g,{unit:q.native35.unit}),m=v&&weapon(v,q.native35.sourceIndex);if(m){c.save();c.strokeStyle='#ffcb68';c.lineWidth=2;c.beginPath();c.arc(m.x,m.y,9,0,Math.PI*2);c.stroke();c.restore();}continue;}
   c.save();c.strokeStyle=q.kind==='missile'?'#ff9b4a':'#e8f0dc';c.lineWidth=q.kind==='missile'?6:3;c.beginPath();c.moveTo(q.x-q.vx*1.8,q.y-q.vy*1.8);c.lineTo(q.x,q.y);c.stroke();c.restore();
  }if(hooks.drawParticles)hooks.drawParticles(c,g);
  }finally{c.restore();}return true;
 }
 function diagnostics(g){if(!owns(g))return null;const values=[...contexts(g),...contactContexts(g)].sort((a,b)=>a.unit-b.unit);return{schema:'cqc.pass35.archive-native-diagnostics/1',boss:g.boss.id,frame:g.enemy.archiveNative35.frame,paused:!!g.paused,camera:g.enemy.archiveNative35.camera,scene:g.enemy.archiveNative35.scene,playerBody:playerBox(g.player),worldSpeedNorms:{player:5,playerShot:playerFirearm.speed,gravity:.7,jump:-14,qualification:'Preserved gameplay world-unit magnitudes; no real-world muzzle speed claim.'},playerAim:playerAim(g),playerShots:g.particles.filter(q=>q.playerNative35).map(q=>({x:q.x,y:q.y,vx:q.vx,vy:q.vy,delay:q.delay,life:q.life,damage:q.damage,metadata:JSON.parse(JSON.stringify(q.playerNative35))})),rig:profile(g.boss).id,units:values.map(v=>({unit:v.unit,basis:v.basis.slice(),root:{...v.root},body:body(v),targets:targets(v),weapon:weapon(v),weapons:v.profile.air?[weapon(v,0),weapon(v,1)]:[weapon(v)],action:v.pose.action,machineMotion:v.pose.machineMotion})),projectiles:g.enemy.projectiles.map(q=>({x:q.x,y:q.y,vx:q.vx,vy:q.vy,life:q.life,damage:q.damage,metadata:q.native35?JSON.parse(JSON.stringify(q.native35)):null})),qualification:'Shared final source pose; available alpha-measured part box, else bounded final native source rectangle, qualified per target. Original HP pool and score. Documented dimensions share the explicit 254 world-unit / 1.82 m retained procedural-player reference; other heights remain authored and unknown. Fixed encounter camera and one world basis cover actors, ports, contacts, targets and projectiles. Native source projection is not absolute 1:1 certification. Non-equipped patterns use native contact or admitted weapon adaptations.'};}
 function defer(id,resume){const p=profile(id);if(!p){bridge()?.cancelPendingLaunch();return false;}return p?bridge()?.deferLaunch({id:p.arsenal,engine:'arsenal',consumer:'archive-pass35'},resume)===true:false;}
 root.CQC_PASS35_ARCHIVE_NATIVE=Object.freeze({schema:'cqc.pass35.archive-native/1',profiles,owns,configure,tick,update,pattern,playerAttack,updateProjectiles,draw,drawEntity,playerAim,drawPlayerArms,playerFirearm,humanCalibration,defer,cancel:()=>bridge()?.cancelPendingLaunch(),diagnostics});
})(globalThis);
