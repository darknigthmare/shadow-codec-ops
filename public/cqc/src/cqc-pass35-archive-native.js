/* Archive: seven exact-incarnation native encounters. Owner engine retains HP, score,
   saves, attack budgets and the only clock. Scene framing is not a canonical metre claim. */
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
 function configure(g){const p=profile(g?.boss);if(!p||g.kind!=='boss')return g;
  const b=bridge()?.bounds(p.id);if(!b)return g;const sc=p.height/b.height,width=b.width*sc;
  g.enemy.x=clamp(g.enemy.x,Math.max(240,width/2+40),Math.max(260,1230-width/2-(p.units>1?p.spacing:0)));
  g.paused=false;g.enemy.y=p.air?310:560;g.enemy.archiveNative35={frame:0,homeX:g.enemy.x,attack:null,rush:null};return g;
 }
 function tick(g){if(!owns(g)||g.ended||g.paused)return;const e=g.enemy,n=e.archiveNative35,p=profile(g.boss);n.frame++;
  if(p.contact&&!p.units&&n.carrierSpeed){const active=e.projectiles.some(q=>q.native35?.contact&&q.life>0),goal=active?Math.max(180,g.player.x+105):n.homeX,dx=goal-e.x;e.x+=clamp(dx*.12,-n.carrierSpeed,n.carrierSpeed);n.rush=Math.abs(dx)>.05?{active}:null;if(!active&&Math.abs(dx)<.05){e.x=n.homeX;n.carrierSpeed=0;n.rush=null;}}
  if(p.air)e.y=310+Math.sin(n.frame*.017)*12;
 }
 function event(g){const n=g.enemy.archiveNative35,a=n.attack;if(!a)return null;const age=n.frame-a.startedAt;if(age>=a.warn+a.active+a.recovery)return null;return{...a,age};}
 function world(b,p){return{x:b[0]*p.x+b[2]*p.y+b[4],y:b[1]*p.x+b[3]*p.y+b[5]};}
 function worldBox(b,r){if(!r)return null;const points=[[r.left,r.top],[r.right,r.top],[r.left,r.bottom],[r.right,r.bottom]].map(([x,y])=>world(b,{x,y}));const left=Math.min(...points.map(p=>p.x)),right=Math.max(...points.map(p=>p.x)),top=Math.min(...points.map(p=>p.y)),bottom=Math.max(...points.map(p=>p.y));return{left,right,top,bottom,width:right-left,height:bottom-top};}
 function sourceContext(g,options={}){const p=profile(g.boss),e=g.enemy,n=e.archiveNative35;if(!p||!n)return null;const api=bridge(),m=definition(p.id),b=api?.bounds(p.id);if(!m||!b)return null;
  const unit=finite(options.unit),depth=p.units>1 ? p.contact ? 1-Math.floor(unit/5)*.05 : .86+unit*.07 : 1;
  const sc=finite(options.height,p.height)*depth/b.height;
  let x=finite(options.x,e.x),y=finite(options.y,e.y);
  if(options.x===undefined&&p.units>1){if(p.contact){x+=((unit%5)-2)*p.spacing+Math.floor(unit/5)*9;y-=Math.floor(unit/5)*8;}else{x+=(unit-(p.units-1)/2)*p.spacing;y-=unit*4;}}
  const basis=[sc,0,0,sc,x-(b.left+b.width/2)*sc,y-(p.air?b.top+b.height/2:b.bottom)*sc];
  const a=event(g),moving=!!options.moving||!!n.rush,dead=e.life<=0;
  const raw=api.mechanicalPose(p.id,{frame:n.frame,action:dead?'dead':moving?'walk':a?'shoot':'idle',attacking:!!a&&!dead,phaseProgress:a?clamp((a.age-a.warn)/Math.max(1,a.active),0,1):0,defeated:dead,machineMotion:{travelX:basis[4]/sc,direction:1,source:'engine-archive-native-root'}},[]);
  if(!raw)return null;const state={tick:n.frame,events:a?[a]:[],motionState:{x,y}};
  const pose=a&&!p.contact&&!p.air?api.mechanicalAimPose(p.id,raw,state,basis,a):root.CQC_PASS28_RIG_SETUP.presentationPose(p.id,raw,state);
  return{id:p.id,profile:p,machine:m,pose,basis,root:{x,y},unit};
 }
 function contexts(g){const p=profile(g.boss);if(!p||!owns(g))return[];return Array.from({length:p.units||1},(_,unit)=>sourceContext(g,{unit})).filter(Boolean);}
 function body(value){return worldBox(value.basis,root.CQC_PASS28_MACHINE_GEOMETRY.bounds(value.machine,root.CQC_MACHINE_PARTS,value.pose));}
 function targets(value){const list=root.CQC_PASS28_RIG_SETUP.targetParts()[value.profile.arsenal]||[],geo=root.CQC_PASS28_MACHINE_GEOMETRY;return list.map((descriptor,index)=>{
  const point=geo.sourcePoint(value.machine,root.CQC_MACHINE_PARTS,value.pose,descriptor);if(!point)return null;
  const partOnly={...value.machine,paintOrder:value.machine.paintOrder.filter(p=>p.id===descriptor.part)};
  return{...world(value.basis,point),part:point.part,index,alphaMeasured:point.alphaMeasured,qualification:point.alphaMeasured?'available alpha-measured native part box':'bounded final native source rectangle; final clipped alpha record unavailable',sourceNativeXY:point.nativeXY,box:worldBox(value.basis,geo.bounds(partOnly,root.CQC_MACHINE_PARTS,value.pose))};
 }).filter(Boolean);}
 function weapon(value){if(value.profile.contact)return null;if(!value.profile.air){const vector=bridge().mechanicalWeaponVector(value.id,value.pose,value.basis,{kind:value.profile.kind});return vector?.axisVisible?vector:null;}
  // The original near pod is left-facing. The far pod is right-facing and is never inverted.
  const part=value.machine.parts.find(p=>p.id==='near_rockets'),source=part&&value.machine.sources.get(part.source);
  if(source?.sha256!=='2883bf437505e4d41fc5207f95681af24b8e4c60f06b9b3daad1dca2506d933b')return null;
  const poses=root.CQC_MACHINE_PARTS.pose(value.machine,value.pose),pose=poses.get(part.id);if(!pose?.visible)return null;const geo=root.CQC_PASS28_MACHINE_GEOMETRY;
  const base=world(value.basis,geo.point(pose,pose.rect,[270,652])),tip=world(value.basis,geo.point(pose,pose.rect,[103,680]));
  return{...tip,base,tip,part:part.id,angle:Math.atan2(tip.y-base.y,tip.x-base.x),axisVisible:true,fixedNativeAxis:true};
 }
 function contactContexts(g){if(!owns(g)||g.boss.id!=='mgs4_dwarf')return[];return g.enemy.projectiles.filter(q=>q.native35?.contact&&q.native35.emitted).map(q=>sourceContext(g,{x:q.x,y:q.y,moving:true})).filter(Boolean);}
 function hitBoxes(g){return[...contexts(g),...contactContexts(g)].flatMap(v=>targets(v).map(t=>({...t,rigID:v.id,unit:v.unit})));}
 function contains(box,x,y,margin=0){return box&&x>=box.left-margin&&x<=box.right+margin&&y>=box.top-margin&&y<=box.bottom+margin;}
 function overlaps(a,b){return a&&b&&a.left<=b.right&&a.right>=b.left&&a.top<=b.bottom&&a.bottom>=b.top;}
 function segmentBox(box,ax,ay,bx,by,margin=0){if(!box)return false;let lo=0,hi=1;for(const [a,d,min,max]of[[ax,bx-ax,box.left-margin,box.right+margin],[ay,by-ay,box.top-margin,box.bottom+margin]]){if(Math.abs(d)<1e-9){if(a<min||a>max)return false;}else{const t0=(min-a)/d,t1=(max-a)/d;lo=Math.max(lo,Math.min(t0,t1));hi=Math.min(hi,Math.max(t0,t1));if(lo>hi)return false;}}return true;}
 function playerBox(p){return{left:p.x-35,right:p.x+35,top:p.y-150,bottom:p.y-10};}
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
 function launchPlayerShot(g,q){const meta=q.playerNative35;if(!meta||meta.emitted)return;meta.emittedAt=g.enemy.archiveNative35.frame;const aim=playerAim(g,{shot:meta,lock:false});if(!aim)return;meta.angle=aim.angle;meta.emitted=true;meta.emission={frame:aim.frame,x:aim.muzzle.x,y:aim.muzzle.y,base:{...aim.base},tip:{...aim.muzzle},axis:{...aim.axis},target:aim.target,aligned:aim.targetAligned,reason:aim.reason,source:aim.source};q.x=aim.muzzle.x;q.y=aim.muzzle.y;q.vx=aim.axis.x*playerFirearm.speed;q.vy=aim.axis.y*playerFirearm.speed;
 }
 function pattern(g,legacy){if(!owns(g))return legacy(g);if(g.paused||g.ended)return;const e=g.enemy,n=e.archiveNative35,p=profile(g.boss),start=e.projectiles.length;legacy(g);const added=e.projectiles.slice(start);if(!added.length)return;
  const first=added[0],warn=first.kind==='zone'?first.life-first.armed:0;
  n.attack={kind:p.kind||'contact',startedAt:n.frame,warn,active:Math.max(1,Math.min(30,first.life-warn)),recovery:18,aimTarget:[g.player.x,g.player.y-80],sources:[]};
  if(p.contact&&!p.units)n.carrierSpeed=Math.max(8,...added.map(q=>Math.hypot(q.vx,q.vy)));
  const available=contexts(g);
  added.forEach((q,index)=>{const original={kind:q.kind,life:q.life,vx:q.vx,vy:q.vy,armed:q.armed},wait=q.kind==='zone'?q.life-q.armed:0;
   q.native35={original,contact:!!p.contact,emitted:false,fireAt:n.frame+wait,unit:index%Math.max(1,available.length),speed:Math.hypot(q.vx,q.vy)||(p.air?5.2:8),sourceKind:p.contact?'native-contact':p.air?'fixed-near-rocket-pod':p.kind};
   q.kind=p.contact?'native-contact':p.air?'missile':'native-shot';q.vx=0;q.vy=0;
   const v=available[q.native35.unit]||available[0];q.x=v?.root.x??e.x;q.y=v?.root.y??e.y;
  });
 }
 function emit(g,q){const p=profile(g.boss),v=sourceContext(g,{unit:q.native35.unit});if(!v)return false;
  if(p.contact){q.native35.emitted=true;if(p.units){q.x=v.root.x;q.y=560;const sign=g.player.x<q.x?-1:1;q.vx=sign*q.native35.speed;q.vy=0;}return true;}
  const muzzle=weapon(v);if(!muzzle||muzzle.tip.x>=muzzle.base.x)return false;
  const dx=muzzle.tip.x-muzzle.base.x,dy=muzzle.tip.y-muzzle.base.y,len=Math.hypot(dx,dy);if(len<1e-6)return false;
  q.x=muzzle.x;q.y=muzzle.y;q.vx=dx/len*q.native35.speed;q.vy=dy/len*q.native35.speed;q.native35.emitted=true;
  q.native35.emission={frame:g.enemy.archiveNative35.frame,x:q.x,y:q.y,base:{...muzzle.base},tip:{...muzzle.tip},part:muzzle.part,basis:v.basis.slice(),axisAligned:true};return true;
 }
 function playerAttack(g,special,hooks){if(g.paused||g.ended)return;const p=g.player,e=g.enemy;if(p.attack>0||p.reloadT>0)return;if(special&&p.ammo<=0){hooks.showToast('MUNITIONS VIDES · BAS + I POUR RECHARGER');return;}
  p.attack=special?28:18;const damage=(special?850:380)*(p.supportPower>0?1.25:1);if(special)p.ammo--;
  if(special){const meta={startedAt:g.enemy.archiveNative35.frame,emittedAt:null,emitted:false,angle:null};p.archiveShot35=meta;const aim=playerAim(g);g.particles.push({x:aim.muzzle.x,y:aim.muzzle.y,vx:0,vy:0,life:70,max:70,color:'#e0c56e',shot:true,damage,delay:12,playerNative35:meta});return;}
  const reach={left:p.x,right:p.x+150,top:p.y-170,bottom:p.y-20},hit=hitBoxes(g).find(t=>overlaps(reach,t.box));
  if(hit){e.life-=damage;g.score+=damage;hooks.spawn(g,hit.x,hit.y,'#ffd17b',12);}
 }
 function updateProjectiles(g,hooks){if(g.paused||g.ended)return;const p=g.player,e=g.enemy,n=e.archiveNative35,boxes=hitBoxes(g);
  for(let i=g.particles.length-1;i>=0;i--){const q=g.particles[i];if(!q.shot)continue;if(q.delay>0){q.delay--;if(q.playerNative35){const aim=playerAim(g,{shot:q.playerNative35});q.x=aim.muzzle.x;q.y=aim.muzzle.y;}continue;}if(q.playerNative35&&!q.playerNative35.emitted)launchPlayerShot(g,q);const oldX=q.x,oldY=q.y;q.x+=q.vx;q.y+=q.vy;q.life--;
   const hit=boxes.find(t=>segmentBox(t.box,oldX,oldY,q.x,q.y,4));if(hit){e.life-=q.damage;g.score+=q.damage;hooks.spawn(g,q.x,q.y,'#ffd17b',14);g.particles.splice(i,1);}else if(q.life<=0||q.x>1300||q.x<0)g.particles.splice(i,1);
  }
  const pbox=playerBox(p);
  for(let i=e.projectiles.length-1;i>=0;i--){const q=e.projectiles[i],meta=q.native35;if(!meta)continue;q.life--;
   if(!meta.emitted&&n.frame>=meta.fireAt)emit(g,q);
   if(meta.emitted){if(meta.contact){let bodies;if(profile(g.boss).units){q.x+=q.vx;q.y+=q.vy;const v=sourceContext(g,{x:q.x,y:q.y,moving:true});bodies=v?[body(v)]:[];}else bodies=contexts(g).map(body);
     if(bodies.some(b=>overlaps(b,pbox))){hooks.bossHit(g,q.damage);e.projectiles.splice(i,1);continue;}
    }else{const oldX=q.x,oldY=q.y;q.x+=q.vx;q.y+=q.vy;if(segmentBox(pbox,oldX,oldY,q.x,q.y)){hooks.bossHit(g,q.damage);e.projectiles.splice(i,1);continue;}}}
   if(q.life<=0||q.x<-250||q.x>1500)e.projectiles.splice(i,1);
  }
 }
 function drawValue(c,v,owner){return bridge()?.drawMechanical(c,v.id,v.pose,v.basis,owner)===true;}
 function requestPortrait(c,b,repaint){if(!c.canvas||portraitJobs.has(c.canvas))return;const canvas=c.canvas;portraitJobs.set(canvas,b.id);bridge()?.whenReadyBoss(profile(b).arsenal,'arsenal').then(()=>{const wanted=portraitJobs.get(canvas);portraitJobs.delete(canvas);if(wanted===b.id&&typeof repaint==='function')repaint();}).catch(()=>portraitJobs.delete(canvas));}
 function drawEntity(c,b,e,portrait=false,hooks={}){const p=profile(b);if(!p)return false;
  if(!bridge()?.ready(p.id)){if(portrait)requestPortrait(c,b,hooks.repaint);return true;}
  if(portrait){const fake={kind:'boss',boss:b,enemy:{...e,life:finite(e.life,1),x:0,y:0,archiveNative35:{frame:0,attack:null,rush:null}}};const bnd=bridge().bounds(p.id),height=Math.min(205,280*bnd.height/bnd.width),v=sourceContext(fake,{x:0,y:5,height});if(v)drawValue(c,v,c.canvas);return true;}
  const fake={kind:'boss',boss:b,enemy:e};for(const v of contexts(fake))drawValue(c,v,e);for(const v of contactContexts(fake))drawValue(c,v,e);return true;
 }
 function draw(c,g,hooks){if(!owns(g))return false;hooks.drawSupportHud(c,g);hooks.drawBossHUD(c,g);hooks.drawPlayerBoss(c,g.player,g);drawEntity(c,g.boss,g.enemy);
  for(const q of g.enemy.projectiles){if(!q.native35||q.native35.contact)continue;if(!q.native35.emitted){const v=sourceContext(g,{unit:q.native35.unit}),m=v&&weapon(v);if(m){c.save();c.strokeStyle='#ffcb68';c.lineWidth=2;c.beginPath();c.arc(m.x,m.y,9,0,Math.PI*2);c.stroke();c.restore();}continue;}
   c.save();c.strokeStyle=q.kind==='missile'?'#ff9b4a':'#e8f0dc';c.lineWidth=q.kind==='missile'?6:3;c.beginPath();c.moveTo(q.x-q.vx*1.8,q.y-q.vy*1.8);c.lineTo(q.x,q.y);c.stroke();c.restore();
  }return true;
 }
 function diagnostics(g){if(!owns(g))return null;const values=contexts(g);return{schema:'cqc.pass35.archive-native-diagnostics/1',boss:g.boss.id,frame:g.enemy.archiveNative35.frame,paused:!!g.paused,playerAim:playerAim(g),playerShots:g.particles.filter(q=>q.playerNative35).map(q=>({x:q.x,y:q.y,vx:q.vx,vy:q.vy,delay:q.delay,life:q.life,damage:q.damage,metadata:JSON.parse(JSON.stringify(q.playerNative35))})),rig:profile(g.boss).id,units:values.map(v=>({unit:v.unit,basis:v.basis.slice(),root:{...v.root},body:body(v),targets:targets(v),weapon:weapon(v),action:v.pose.action,machineMotion:v.pose.machineMotion})),projectiles:g.enemy.projectiles.map(q=>({x:q.x,y:q.y,vx:q.vx,vy:q.vy,life:q.life,damage:q.damage,metadata:q.native35?JSON.parse(JSON.stringify(q.native35)):null})),qualification:'Shared final source pose; available alpha-measured part box, else bounded final native source rectangle, qualified per target. Original HP pool and score. Archive screen framing is a gameplay scale, not certified canonical metres. Non-equipped patterns use native contact or admitted weapon adaptations.'};}
 function defer(id,resume){const p=profile(id);if(!p){bridge()?.cancelPendingLaunch();return false;}return p?bridge()?.deferLaunch({id:p.arsenal,engine:'arsenal',consumer:'archive-pass35'},resume)===true:false;}
 root.CQC_PASS35_ARCHIVE_NATIVE=Object.freeze({schema:'cqc.pass35.archive-native/1',profiles,owns,configure,tick,pattern,playerAttack,updateProjectiles,draw,drawEntity,playerAim,drawPlayerArms,playerFirearm,defer,cancel:()=>bridge()?.cancelPendingLaunch(),diagnostics});
})(globalThis);
