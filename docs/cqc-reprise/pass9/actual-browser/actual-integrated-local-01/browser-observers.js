/* Publication QA observers only. Never installed in production source. */
(() => {
  if (window.__pub9Installed) return true;
  const A = window.__CQC055Versus, S = window.CQC_COMBAT_SPRITES;
  if (!A?.engine || !S || !window.CQC_PASS9_COMBAT_FIDELITY) throw Error('PASS9 runtime hooks absent');
  const cat = window.CQC_COMBAT_SPRITE_CATALOG.entries;
  window.__pub9Installed = true;
  window.__pub9Draws = []; window.__pub9Projectiles = []; window.__pub9Texts = [];window.__pub9Arcs=[];
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
      push(window.__pub9Draws,{...row,uid,face:args[4],scale:args[5],localScale:scale,actorCanvas:[args[2],args[3]],pose:{moveSlot:pose.moveSlot,attackPhase:pose.attackPhase,phaseProgress:pose.phaseProgress},action,index,ok,sourceSHA:frame?.sha256,pivot:frame?.pivot});
    }
    return ok;
  };
  const game=document.querySelector('#game'), c=game.getContext('2d'), oldText=c.fillText;
  c.fillText=function(text,x,y,...rest){push(window.__pub9Texts,{text:String(text),x,y,font:c.font});return oldText.call(this,text,x,y,...rest);};
  const oldArc=c.arc,oldStroke=c.stroke,oldBegin=c.beginPath;let lastArc=null;
  c.beginPath=function(...args){lastArc=null;return oldBegin.apply(this,args);};
  c.arc=function(x,y,r,...rest){const m=c.getTransform();lastArc={center:[m.a*x+m.c*y+m.e,m.b*x+m.d*y+m.f],radius:r,lineWidth:c.lineWidth,alpha:c.globalAlpha};return oldArc.call(this,x,y,r,...rest);};
  c.stroke=function(...args){if(lastArc)push(window.__pub9Arcs,lastArc);return oldStroke.apply(this,args);};
  const art=window.CQC_PASS4_PROJECTILE_ART, oldProjectile=art?.draw;
  if (!oldProjectile) throw Error('Actual projectile art hook absent');
  art.draw=function(c,q,z){const m=c.getTransform();push(window.__pub9Projectiles,{id:q.id,owner:q.owner,kind:q.kind,slot:q.def?.slot,center:[m.e,m.f],zoom:z,x:q.x,y:q.y});return oldProjectile(c,q,z);};
  const scopedArt=window.CQC_PASS9_PROJECTILE_ART, originalScopedProjectile=scopedArt?.drawProjectile;
  if(typeof originalScopedProjectile!=='function')throw Error('Pending ROOT-scoped PASS9 native projectile handler: drawProjectile(c,q,zoom,owner)');
  window.__pub9ScopedProjectileDraws=[];
  scopedArt.drawProjectile=function(c,q,z,owner){
    const t=c.getTransform(),oldImage=c.drawImage,oldRotate=c.rotate,oldRect=c.fillRect,oldFill=c.fill;
    const nativeImages=[],rotations=[],rects=[];let fills=0,handled;
    c.drawImage=function(image,...values){const m=c.getTransform();nativeImages.push({url:image.src,complete:image.complete,width:image.naturalWidth,height:image.naturalHeight,rect:values.slice(0,4),destination:values.slice(4),matrix:[m.a,m.b,m.c,m.d,m.e,m.f],alpha:c.globalAlpha});return oldImage.call(this,image,...values);};
    c.rotate=function(angle){rotations.push(angle);return oldRotate.call(this,angle);};
    c.fillRect=function(...args){rects.push(args);return oldRect.apply(this,args);};
    c.fill=function(...args){fills++;return oldFill.apply(this,args);};
    try{handled=originalScopedProjectile(c,q,z,owner);}finally{c.drawImage=oldImage;c.rotate=oldRotate;c.fillRect=oldRect;c.fill=oldFill;}
    const row={id:q.id,burstId:q.burstId,age:q.age,owner:q.owner,kind:q.kind,slot:q.def?.slot,uid:owner?.f?.uid,center:[t.e,t.f],zoom:z,x:q.x,y:q.y,handled:!!handled,nativeImages,rotations,rects,fills};
    push(window.__pub9ScopedProjectileDraws,row);
    if(handled)push(window.__pub9Projectiles,row);
    return handled;
  };
  const near=(x,y,label)=>{if(Math.abs(x-y)>.01)throw Error(label+': '+x+' / '+y);};
  const empty=()=>A.engine.empty();
  window.__pub9Step=(s,n,inputB=null)=>{for(let i=0;i<n;i++)A.engine.step(s,[empty(),inputB||empty()]);};
  window.__pub9Start=(uid,face=1,subjectP2=false)=>{
    A.startExternal({p1:subjectP2?'core__snake':uid,p2:subjectP2?uid:'core__snake',stage:'shadow_heliport',mode:'training',dummy:'idle',autoheal:false,freeResource:false,rounds:1,seconds:99,finishers:'off',source:'pass9-published-browser-qa'});
    A.pause(true); A.resetDojo(); document.querySelector('#pause43').classList.add('hidden');
    const s=A.getState(),p=subjectP2?s.b:s.a,o=subjectP2?s.a:s.b;
    s.options.freeMeter=false;s.options.freeResource=false;s.options.autoheal=false;
    p.x=face===1?300:980;o.x=face===1?980:300;p.face=face;o.face=-face;
    for(const a of [s.a,s.b]){a.ai=false;a.vx=a.vy=a.kx=0;a.cool=0;a.cooldowns={};a.meter=100;const r=a.f.combat.resource;a.r=['heat','cost'].includes(r.kind)?0:r.max;}
    return s;
  };
  const clear=()=>{window.__pub9Draws=[];window.__pub9Texts=[];window.__pub9Projectiles=[];window.__pub9ScopedProjectileDraws=[];window.__pub9Arcs=[];};
  window.__pub9Assert=(uid,face,phase=null,slot=null)=>{
    const d=window.__pub9Draws.filter(x=>x.uid===uid).at(-1),e=cat[uid],want=window.__pub9Expected.entries[uid];
    if(!d?.ok||d.face!==face||d.index<0||d.localScale?.[0]<0||d.matrix[0]<=0)throw Error('Actual independently authored native facing absent '+JSON.stringify(d));
    if(!d.url.startsWith(location.origin+'/cqc/assets/'))throw Error('Native image resolved outside actual CQC mount');
    if(want.files[d.file]!==d.sourceSHA)throw Error('Loaded native source frame SHA metadata differs from closed catalog');
    if(['core__ninja_mg2','core__jungle_evil'].includes(uid)&&d.alpha!==1)throw Error('Source-supported Black/Jungle body became transparent');
    if(phase&&(d.pose.attackPhase!==phase||d.pose.moveSlot!==slot||d.action!==want.actionMap[slot]))throw Error('Actual engine action phase differs '+JSON.stringify(d));
    const indices=e.phaseMap?.[d.action]?.[phase];if(indices&&!indices.includes(d.index))throw Error('Actual frame outside documented phase');
    if(!d.destination.every(Number.isFinite))throw Error('Nonfinite native Canvas destination');
    near(d.destination[3],d.rect[3]*e.displayHeight/(e.sourceFrameHeights?.[d.file]||e.baseFrameHeight||d.rect[3]),'Native source standing scale');
    return d;
  };
  window.__pub9Idle=(uid,face)=>{window.__pub9Start(uid,face,face===-1);clear();A.draw();return window.__pub9Assert(uid,face);};
  window.__pub9HUD=(uid)=>{
    const s=window.__pub9Start(uid,1);clear();A.draw();const label=s.a.f.combat.resource.label,compact=matchMedia('(max-width:760px)').matches;
    const name=s.a.f.name;
    if(compact){
      const hud=document.querySelector('[data-player="0"]'),labelNode=hud?.querySelector('[data-hud="resourceLabel"]'),nameNode=hud?.querySelector('[data-hud="name"]'),health=hud?.querySelector('[data-hud="healthTrack"]');
      if(labelNode?.textContent!==label||nameNode?.textContent!==name||!health?.hasAttribute('aria-valuenow'))throw Error('Actual compact source HUD identity/resource differs '+uid);
    }else if(!window.__pub9Texts.some(t=>t.text.includes(label)))throw Error('Actual Canvas source resource HUD absent '+uid);
    return{uid,name,resourceLabel:label,resourceKind:s.a.f.combat.resource.kind,compact,actualDraw:true,numericalResourceIsVersusAdaptation:true};
  };
  window.__pub9Phases=(uid,face)=>{
    const samples=[];
    for(const slot of ['light','heavy','low','throw','special','specialDown','specialForward','specialBack','super','utility'])for(const phase of ['startup','recovery','active']){
      const s=window.__pub9Start(uid,face),m=s.a.f.combat.moves[slot];
      if(!A.engine.start(s,s.a,slot))throw Error('Real move refused '+uid+' '+slot);
      const ticks=phase==='startup'?0:phase==='active'?m.startup:m.startup+m.active;
      window.__pub9Step(s,ticks);clear();A.draw();const d=window.__pub9Assert(uid,face,phase,slot);
      samples.push({slot,phase,ticks,name:m.name,kind:m.kind,action:d.action,index:d.index,file:d.file,sourceSHA:d.sourceSHA,rect:d.rect,pivot:d.pivot,destination:d.destination,matrix:d.matrix});
    }
    return {uid,face,realEnginePhaseSamples:samples,attackFrameAssignments:0};
  };
  window.__pub9States=(uid,face)=>{
    const rows=[];
    for(const state of ['idle','walk','guard','crouch','jump','hit','ko']){
      const s=window.__pub9Start(uid,face),input=empty();
      if(state==='walk')input[face===1?'right':'left']=true;
      if(state==='guard')input.guard=true;if(state==='crouch')input.down=true;if(state==='jump')input.jump=true;
      if(state==='hit'||state==='ko'){
        s.b.x=s.a.x+face*90;s.b.face=-face;if(state==='ko'){s.options.training=false;s.a.life=1;}
        if(!A.engine.start(s,s.b,'heavy'))throw Error('Real enemy hit/KO fixture refused');
        for(let i=0;i<s.b.f.combat.moves.heavy.startup+20;i++){window.__pub9Step(s,1);if(state==='hit'?s.a.hit>0:s.a.life<=0)break;}
        if(state==='hit'&&!s.a.hit||state==='ko'&&s.a.life>0)throw Error('Actual enemy contact failed to produce '+state);
      }else{A.engine.step(s,[input,empty()]);if(state==='jump'&&s.a.onGround)throw Error('Actual jump input failed');}
      clear();A.draw();const d=window.__pub9Assert(uid,face);if(d.action!==state)throw Error('Actual native state differs '+state+' '+d.action);
      rows.push({state,action:d.action,index:d.index,file:d.file,sha256:d.sourceSHA,alpha:d.alpha,realEnemyContact:state==='hit'||state==='ko',koFixtureInitialLife:state==='ko'?1:null,koFixtureMatchRules:state==='ko'?s.options.training===false:null,actualLife:s.a.life,actualHitstun:s.a.hit});
    }
    return{uid,face,rows,syntheticPoseAssignments:0};
  };
  const actualNativeStar=(q)=>{
    const atlas=window.__pub9Expected.projectileCatalog,actual=window.__pub9ScopedProjectileDraws.find(x=>x.id===q.id&&x.age===q.age&&x.handled),diagnostics=window.CQC_PASS9_PROJECTILE_ART.diagnostics();
    if(!actual||q.def.tag!=='shuriken'||actual.uid!==atlas.uid||actual.owner!==q.owner||actual.kind!=='shuriken'||actual.nativeImages.length!==1||actual.rotations.length||actual.fills||actual.rects.length)throw Error('Black star did not dispatch the decoded native drawImage without Canvas rotation/fallback');
    const index=Math.floor(q.age/atlas.poseTicks)%atlas.frames.length,frame=atlas.frames[index],image=actual.nativeImages[0],scale=atlas.displayWidth/atlas.sourceScaleReferenceWidth*actual.zoom;
    const wanted=[-frame.rect[2]*frame.pivot[0]*scale,-frame.rect[3]*frame.pivot[1]*scale,frame.rect[2]*scale,frame.rect[3]*scale];
    if(diagnostics.status!=='native-ready'||diagnostics.nativeSHA256!==atlas.sha256||!image.complete||image.width!==atlas.width||image.height!==atlas.height||image.url!==location.origin+'/cqc/'+atlas.file||JSON.stringify(image.rect)!==JSON.stringify(frame.rect)||image.alpha!==1)throw Error('Native star byte-pinned image, source rectangle or image decode differs');
    image.matrix.slice(0,4).forEach((v,i)=>near(v,[1,0,0,1][i],'Native star must dispatch before parent velocity rotation on both faces'));
    image.destination.forEach((v,i)=>near(v,wanted[i],'Native star destination with common source-pixel scale'));
    const selection=diagnostics.recentNativeSelections.filter(x=>x.projectileId===q.id&&x.age===q.age&&x.ownerSlot===q.owner).at(-1);
    if(!selection||selection.ownerUID!==atlas.uid||selection.burstId!==q.burstId||selection.sourceFrameIndex!==index||selection.sourceSHA256!==atlas.sha256||selection.sourceFile!==atlas.file||selection.nativeURL!==image.url||JSON.stringify(selection.sourceRect)!==JSON.stringify(frame.rect)||JSON.stringify(selection.sourcePivot)!==JSON.stringify(frame.pivot))throw Error('Actual native renderer selection trace differs from genuine projectile');
    return{sourceHandler:'CQC_PASS9_PROJECTILE_ART.drawProjectile',projectileId:q.id,burstId:q.burstId,age:q.age,ownerSlot:q.owner,ownerUID:actual.uid,slot:q.def.slot,sourceFrameIndex:index,sourceFile:atlas.file,sourceSHA256:atlas.sha256,nativeDecode:{complete:image.complete,width:image.width,height:image.height,url:image.url},sourceRect:image.rect,sourcePivot:frame.pivot,destination:image.destination,matrix:image.matrix,commonSourcePixelScale:scale,additionalRotationCalls:0,canvasFallback:false,rendererSelection:selection};
  };
  window.__pub9NativeStarSpin=(face)=>{
    const uid='core__ninja_mg2',s=window.__pub9Start(uid,face),m=s.a.f.combat.moves.special;s.a.x=face===1?200:1080;s.b.x=s.a.x+face*700;
    if(!A.engine.start(s,s.a,'special'))throw Error('Real Black star source move refused');window.__pub9Step(s,m.startup);
    const q=s.projectiles.find(x=>!x.delay&&!x.dead);if(!q||q.age!==1)throw Error('Actual first-active native star missing');
    const samples=[];
    for(const age of [1,3,6,9,12,15,18,21]){
      if(q.age>age)throw Error('Native star fixture skipped a real engine age');window.__pub9Step(s,age-q.age);
      if(q.dead||!s.projectiles.includes(q)||q.age!==age)throw Error('Real native star died before all eight source poses');
      const physics=JSON.stringify(q);clear();A.draw();window.__pub9Assert(uid,face);samples.push(actualNativeStar(q));
      if(JSON.stringify(q)!==physics)throw Error('Native star drawing mutated actual projectile physics');
    }
    const indices=samples.map(x=>x.sourceFrameIndex),diagnostics=window.CQC_PASS9_PROJECTILE_ART.diagnostics();
    if(JSON.stringify(indices)!=='[0,1,2,3,4,5,6,7]'||new Set(samples.map(x=>JSON.stringify(x.sourceRect))).size!==8||JSON.stringify(diagnostics.nativeSelectedFrames8)!=='[0,1,2,3,4,5,6,7]')throw Error('Eight actual native source poses were not independently selected');
    return{uid,face,projectileId:q.id,realEngineAges:[1,3,6,9,12,15,18,21],samples,sourcePoseTimingIsVersusAdaptation:true,sourcePixelsUnmodified:true,frameAssignments:0,addedCanvasRotations:0};
  };
  window.__pub9Origin=(uid,face,slot)=>{
    const s=window.__pub9Start(uid,face),m=s.a.f.combat.moves[slot],F=window.CQC_PASS9_COMBAT_FIDELITY,group=Object.keys(F.routes[uid]||{}).find(k=>F.routes[uid][k].slots.includes(slot)),mark=window.CQC_PASS9_NATIVE_ORIGINS.entries[uid]?.[group]?.[face===1?'right':'left'];
    if(m.kind!=='projectile'||!mark)throw Error('Actual source-bound projectile absent');
    const before={resource:s.a.r,meter:s.a.meter};if(!A.engine.start(s,s.a,slot))throw Error('Real source action refused');
    const paid={resource:s.a.r,meter:s.a.meter};window.__pub9Step(s,m.startup);
    const q=s.projectiles.find(q=>!q.delay&&!q.dead);if(!q)throw Error('First-active real projectile absent');
    const immutable=JSON.stringify(q);clear();A.draw();const d=window.__pub9Assert(uid,face,'active',slot),render=window.__pub9Projectiles.find(p=>p.id===q.id);
    if(!render||mark.file!==d.file||mark.sha256!==d.sourceSHA||mark.frame!==d.index)throw Error('Actual body/source projectile draw mismatch');
    const [sx,sy,sw,sh]=d.rect,[dx,dy,dw,dh]=d.destination,[a,b,c,dd,tx,ty]=d.matrix;
    const lx=dx+(mark.point[0]-sx)*dw/sw,ly=dy+(mark.point[1]-sy)*dh/sh;
    const origin=[a*lx+c*ly+tx,b*lx+dd*ly+ty],z=d.scale/1.12,expected=[origin[0]+q.vx*z,origin[1]+(m.vy||0)*z],residual=Math.hypot(expected[0]-render.center[0],expected[1]-render.center[1]);
    if(residual>.01||JSON.stringify(q)!==immutable)throw Error('Real native launch transform differs or drawing mutated physics '+JSON.stringify({uid,face,slot,residual}));
    const r=s.a.f.combat.resource,sign=['heat','cost'].includes(r.kind)?1:-1;
    near(paid.resource,before.resource+sign*(m.cost||0),'Actual once-only resource charge');near(paid.meter,before.meter-(m.meter||0),'Actual meter charge');
    if(s.projectiles.length!==(m.count||1))throw Error('Real projectile burst count differs');
    let starNative=null;
    if(uid==='core__ninja_mg2'){
      starNative=actualNativeStar(q);
    }
    return {uid,face,slot,sourceGroup:group,typedSourcePointKind:mark.pointKind,sourceFile:d.file,sourceSHA:d.sourceSHA,sourcePoint:mark.point,frame:d.index,nativeOriginCanvas:origin,actualProjectileCanvas:render.center,pixelResidual:residual,before,paid,projectiles:s.projectiles.length,starNative,firstPhysics:{age:q.age,x:q.x,y:q.y,vx:q.vx,vy:q.vy}};
  };
  window.__pub9RedDown=(face)=>{
    const uid='core__redblaster_mg2',s=window.__pub9Start(uid,face),m=s.a.f.combat.moves.specialDown,life=s.b.life,x=s.a.x,r=s.a.r;
    s.b.x=s.a.x+face*90;
    if(cat[uid].actionMap.specialDown!=='crouch'||m.kind!=='mobility'||m.damage!==0||m.travel!==0||m.projectileOrigin||m.groundObjectOrigin)throw Error('Red Down incorrectly bound to ambiguous source wire/weapon');
    if(!A.engine.start(s,s.a,'specialDown'))throw Error('Actual Red low stationary posture refused');window.__pub9Step(s,m.startup);clear();A.draw();const d=window.__pub9Assert(uid,face,'active','specialDown');
    if(d.action!=='crouch'||d.index!==1||!d.file.includes('/a-'))throw Error('Red Down did not use A source crouch9');
    const crouch=cat[uid][face===cat[uid].facing?'actions':'oppositeActions'].crouch.frames;
    if(crouch.length!==2||JSON.stringify(d.rect)!==JSON.stringify(crouch[1].rect))throw Error('Red source A8/9 crouch groups differ');
    const image={file:d.file,rect:d.rect,pivot:d.pivot,matrix:d.matrix,index:d.index};
    window.__pub9Step(s,m.active+m.recovery+30);if(s.a.x!==x||s.a.r!==r||s.b.life!==life||s.metrics.projectile||s.metrics.explosion||s.traps.length||s.projectiles.length||s.events.some(e=>['damage','trapPlaced','explosion','projectile'].includes(e.type)))throw Error('Red stationary Down damaged or emitted an object');
    return{face,actualSourceAction:'crouch',sourcePoseIndices:[8,9],activeSourcePoseIndex:9,native:image,stationary:true,noDamage:true,noProjectiles:true,noWireOrTrap:true,ambiguousDeployRetainedButUnused:true};
  };
  window.__pub9OpaqueMovement=(uid,face)=>{
    const rows=[];
    for(const slot of ['specialForward','specialBack','specialDown']){
      const s=window.__pub9Start(uid,face),m=s.a.f.combat.moves[slot];if(!A.engine.start(s,s.a,slot))throw Error('Actual visible motion refused');
      window.__pub9Step(s,m.startup);clear();A.draw();const d=window.__pub9Assert(uid,face,'active',slot);
      if(d.alpha!==1||s.a.buffs.cloak||s.a.buffs.armor||s.metrics.projectile||s.traps.length)throw Error('Source-supported visible actor gained cloaking/armor/emission');
      rows.push({slot,name:m.name,kind:m.kind,alpha:d.alpha,bodyBox:A.engine.box(s.a),nativeAction:d.action,projectiles:0});
    }
    return{uid,face,alwaysOpaque:true,rows,sourceNoOpticalInvisibility:true};
  };
  window.__pub9RunnerScope=(face)=>{
    const rows=[];
    for(const slot of ['light','heavy','low','throw','special','specialDown','specialForward','specialBack','super','utility']){
      const s=window.__pub9Start('core__runner_mg2',face),m=s.a.f.combat.moves[slot];s.b.x=s.a.x+face*500;
      if(!['fists','none'].includes(s.a.f.combat.weapon)||m.kind==='projectile'||m.projectileOrigin||!A.engine.start(s,s.a,slot))throw Error('Running Man inherited a gun or device');
      window.__pub9Step(s,m.startup+m.active+m.recovery+2);clear();A.draw();
      if(s.projectiles.length||s.traps.length||s.metrics.projectile||s.metrics.explosion||s.events.some(e=>['trapPlaced','projectile','explosion','poison','emp'].includes(e.type)))throw Error('Running Man emitted a gun/gas/mine/device');
      rows.push({slot,name:m.name,kind:m.kind,weapon:s.a.f.combat.weapon,sourceAction:cat.core__runner_mg2.actionMap[slot],noEmissions:true});
    }
    return{uid:'core__runner_mg2',face,rows,originalRunningOnlyWithVersusContactsQualified:true};
  };
  window.__pub9RedGrenades=(face,slot,stopAtFirst=false)=>{
    const s=window.__pub9Start('core__redblaster_mg2',face),m=s.a.f.combat.moves[slot];s.a.x=face===1?200:1080;s.b.x=s.a.x+face*700;
    if(m.kind!=='projectile'||m.tag!=='explosive'||m.projectileOverride!=='grenade'||m.fuse!==48)throw Error('Qualified Red grenade scope missing');
    const before={resource:s.a.r,meter:s.a.meter};if(!A.engine.start(s,s.a,slot))throw Error('Actual grenade sequence refused');
    const paid={resource:s.a.r,meter:s.a.meter},explosions=[],blasts=[],drawnBlastSamples=[],seen=new Set();let maxConcurrentBlasts=0;
    const observeActualBlasts=()=>{
      clear();A.draw();const d=window.__pub9Assert('core__redblaster_mg2',face),z=d.scale/1.12,actual=[];
      for(const fx of s.fx.filter(x=>x.kind==='blast')){
        const center=[d.actorCanvas[0]+(fx.x-s.a.x)*z,d.actorCanvas[1]+(fx.y-s.a.y)*z],radius=(12+(fx.max-fx.t)*3)*z;
        const arc=window.__pub9Arcs.find(x=>Math.hypot(x.center[0]-center[0],x.center[1]-center[1])<.01&&Math.abs(x.radius-radius)<.01&&x.lineWidth===5);
        if(!arc)throw Error('Real active grenade blast FX was not actually stroked on Canvas');
        near(arc.alpha,Math.min(1,fx.t/15),'Actual blast FX opacity');actual.push({center,radius,t:fx.t,max:fx.max,actualCanvasArc:arc});
      }
      drawnBlastSamples.push({frame:s.frame,actual});return actual;
    };
    for(let tick=0;tick<m.startup+180;tick++){
      window.__pub9Step(s,1);
      let newBlast=false;
      for(const event of s.events.filter(e=>e.type==='explosion'))if(!seen.has(event.id)){seen.add(event.id);explosions.push({id:event.id,frame:event.frame});const blast=s.fx.filter(x=>x.kind==='blast').at(-1);if(!blast||blast.t<=0||blast.max!==26)throw Error('Fresh real explosion has no bounded active blast FX');blasts.push({frame:s.frame,x:blast.x,y:blast.y,t:blast.t,max:blast.max});newBlast=true;}
      maxConcurrentBlasts=Math.max(maxConcurrentBlasts,s.fx.filter(x=>x.kind==='blast').length);
      if(newBlast)observeActualBlasts();
      if(stopAtFirst&&explosions.length)return{face,slot,firstExplosion:explosions[0],freshBlast:blasts[0],actualDrawnFX:drawnBlastSamples.at(-1)};
    }
    if(explosions.length!==(m.count||1)||s.metrics.explosion!==(m.count||1)||s.projectiles.length||maxConcurrentBlasts!==(m.count||1))throw Error('Finite real grenade explosions/FX count differs');
    if(s.fx.some(x=>x.kind==='blast'))throw Error('Grenade blast FX lifetime is unbounded');
    near(paid.resource,before.resource-m.cost,'Actual grenade reserve charge');near(paid.meter,before.meter-(m.meter||0),'Actual grenade meter charge');
    return{face,slot,before,paid,declaredCount:m.count||1,actualExplosions:explosions,freshBlasts:blasts,drawnBlastSamples,maxConcurrentBlasts,finiteBlastLifetime:true,projectilesAfterBound:0,sourceHandOriginQualified:true};
  };

  return true;
})();
