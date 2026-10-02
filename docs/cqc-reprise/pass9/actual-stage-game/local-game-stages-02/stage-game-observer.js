/* Read-only full-game observer. DOM inputs and the game's public clock/replay APIs;
   no actor/phase/time assignments and no replacement of renderer results. */
(() => {
  'use strict';
  const A=window.__CQC055Versus, R=window.CQC_STAGE_LAYERS;
  if(!A?.advance || !A.startReplay || !R?.drawBackground) throw Error('Real game APIs absent');
  if(window.PASS9_STAGE_GAME) throw Error('Stage observer already installed');
  const expected=window.__stage9Expected;
  if(!expected) throw Error('Root frozen stage contract absent');
  const near=(a,b)=>Math.abs(a-b)<1e-7;
  const need=(yes,message)=>{if(!yes)throw Error(message)};
  const key=(type,code)=>window.dispatchEvent(new KeyboardEvent(type,{code,key:code,bubbles:true,cancelable:true}));
  const tick=()=>{const n=A.advance(1000/60);need(n===1,'Actual game clock did not advance exactly one tick');};
  const ticks=n=>{for(let i=0;i<n;i++)tick()};
  const stateData=s=>({frame:s.frame,phase:s.phase,phaseT:s.phaseT,timer:s.timer,seed:s.seed,finished:s.finished,winner:s.winner,
    a:[s.a.x,s.a.y,s.a.vx,s.a.vy,s.a.life,s.a.wins,s.a.onGround,s.a.face,s.a.r,s.a.meter],
    b:[s.b.x,s.b.y,s.b.vx,s.b.vy,s.b.life,s.b.wins,s.b.onGround,s.b.face,s.b.r,s.b.meter],
    projectiles:s.projectiles.length,traps:s.traps.length});
  const projection=s=>({camera:Math.max(-220,Math.min(220,(s.a.x+s.b.x)/2-640)),zoom:Math.max(.78,Math.min(1.08,1040/(Math.abs(s.a.x-s.b.x)+300)))});
  let capture=null,phase=null,trace=null;
  const rawStep=A.engine.step;
  A.engine.step=function(...args){const value=rawStep.apply(this,args);if(trace)trace.push(stateData(args[0]));return value};
  for(const [method,p]of [['drawBackground','background'],['drawForeground','foreground']]){
    const raw=R[method];R[method]=function(ctx,stage,options){const prior=phase;if(capture&&ctx.canvas.id==='game'){phase=p;capture.calls.push({phase:p,stage:stage?.id||stage,options:{...options}})}
      try{const value=raw.apply(this,arguments);if(capture&&ctx.canvas.id==='game')capture.calls[capture.calls.length-1].returned=value;return value}finally{phase=prior}};
  }
  const rawDraw=CanvasRenderingContext2D.prototype.drawImage;
  CanvasRenderingContext2D.prototype.drawImage=function(image,...args){
    if(capture&&phase&&this.canvas.id==='game'){
      const m=this.getTransform(),url=image.currentSrc||image.src||null;
      capture.draws.push({phase,url,args,sourceType:url?'native-image':'canvas-mask',sourceWidth:image.naturalWidth||image.width,sourceHeight:image.naturalHeight||image.height,
        matrix:[m.a,m.b,m.c,m.d,m.e,m.f],alpha:this.globalAlpha,smoothing:this.imageSmoothingEnabled});
    }return rawDraw.apply(this,[image,...args]);
  };
  function inspectDraw(stageId){
    const s=A.getState(),stage=expected.stages[stageId],p=projection(s);need(s.stage.id===stageId,'Wrong real stage');
    capture={calls:[],draws:[]};try{A.draw()}finally{const last=capture;capture=null;window.__stage9LastDraw=last}
    const got=window.__stage9LastDraw;
    need(got.calls.length===2&&got.calls[0].phase==='background'&&got.calls[1].phase==='foreground','Both actual stage phases must execute in order');
    for(const call of got.calls){need(call.returned===true,'Real renderer fell back');need(call.stage===stageId,'Stage phase mismatch');need(near(call.options.camera,p.camera)&&near(call.options.zoom,p.zoom),'Real fighter camera/zoom mismatch');need(near(call.options.time,s.frame/60),'Real stage time is not engine frame/60');}
    const central=got.draws.filter(d=>d.sourceType==='native-image'&&d.args.length===4);
    need(central.length===4,'Four actual central native planes required');
    for(const layer of stage.layers){const url=location.origin+'/cqc/'+layer.file,draw=central.find(d=>d.url===url);need(draw,'Actual native plane missing '+layer.file);
      need(draw.phase===layer.phase,'Foreground phase changed '+layer.id);
      need(draw.sourceWidth===layer.width&&draw.sourceHeight===layer.height,'Native plane dimensions changed');
      const want=[layer.rect.x,layer.rect.y,layer.rect.width,layer.rect.height];need(draw.args.every((v,i)=>near(v,want[i])),'Native geometry changed '+layer.id);
      const m=[p.zoom,0,0,p.zoom,640-(640+p.camera*layer.parallax)*p.zoom,568*(1-p.zoom)];need(draw.matrix.every((v,i)=>near(v,m[i])),'True camera/parallax transform changed '+layer.id);
    }
    const depths=stage.layers.map(l=>l.parallax);need(new Set(depths).size===4,'Distinct four plane depths absent');
    need(s.a.y===568&&s.b.y===568&&s.a.onGround&&s.b.onGround,'Walking feet left actual logical floor568');
    const masks=got.draws.filter(d=>d.sourceType==='canvas-mask');
    for(const mask of masks){need(mask.phase==='background'&&mask.smoothing===false,'Mask stage/order/filter mismatch');need(mask.alpha>=0&&mask.alpha<=stage.maximumDimmingFraction,'Native luminance command exceeds reviewed bound');const arch=central.find(d=>d.url.endsWith('/architecture.png'));need(mask.matrix.every((v,i)=>near(v,arch.matrix[i])),'Mask detached from native architecture transform');}
    if(stageId==='zanzibar')need(masks.length===0,'Zanzibar must remain static');
    const rect=document.querySelector('#game').getBoundingClientRect();need(near(rect.width/rect.height,1280/720),'Actual game canvas deformed');
    return {frame:s.frame,projection:p,actors:{a:{x:s.a.x,y:s.a.y},b:{x:s.b.x,y:s.b.y}},canvas:{width:rect.width,height:rect.height},
      phaseCalls:got.calls,centralNativePlanes:central,maskDraws:masks,coordinates:R.coordinates};
  }
  function start(stageId,seconds=4,mode='local'){
    document.activeElement?.blur?.();
    A.startExternal({p1:'core__runner_mg2',p2:'core__snake',stage:stageId,mode,dummy:'idle',autoheal:false,freeResource:false,rounds:1,seconds,finishers:'off',seed:901997,source:'pass9-stage-fullgame-readonly-proof'});
    need(!A.diagnostics().paused,'Actual new match paused');
    const s=A.getState();need(s.phase==='intro'||s.phase==='fight','Invalid actual startup phase');return s;
  }
  function walkAndReplay(stageId){
    const oldReplays=A.getReplays().length,s=start(stageId);trace=[];
    try{
      let guard=0;while(s.phase==='intro'&&guard++<120)tick();need(s.phase==='fight','Genuine intro failed');
      const initial=inspectDraw(stageId),bindings=A.getBindings();
      key('keydown',bindings.p1.r);key('keydown',bindings.p2.r);ticks(15);key('keyup',bindings.p1.r);key('keyup',bindings.p2.r);
      const right=inspectDraw(stageId);need(right.actors.a.x>initial.actors.a.x&&right.actors.b.x>initial.actors.b.x,'Real keyboard walk right absent');
      key('keydown',bindings.p1.l);key('keydown',bindings.p2.l);ticks(30);key('keyup',bindings.p1.l);key('keyup',bindings.p2.l);
      const left=inspectDraw(stageId);need(left.actors.a.x<right.actors.a.x&&left.actors.b.x<right.actors.b.x,'Real keyboard walk left absent');
      need(Math.abs(right.projection.camera-left.projection.camera)>20,'Actual walking did not drive parallax camera');
      key('keydown',bindings.p1.r);ticks(130);key('keyup',bindings.p1.r);
      key('keydown',bindings.p1.light);tick();key('keyup',bindings.p1.light);ticks(45);
      need(s.b.life<s.b.max,'Real recorded melee did not damage opponent; timeout would tie');
      guard=0;while(!s.finished&&guard++<500)tick();need(s.finished,'Natural timed match did not finish');
      const recorded=trace;trace=null;const rep=A.getLastReplay();need(rep?.meta.stage===s.stage.name&&rep.frames.length>0,'Game did not finalize actual recorded replay');
      need(A.getReplays().length===Math.min(30,oldReplays+1),'Game did not save actual replay to its history');
      const recordedFinal=stateData(s),flat=rep.frames.reduce((n,row)=>n+row[0],0);
      need(flat===recorded.length,'Recorded input tick count differs from genuine physics');
      A.startReplay(rep);trace=[];for(let i=0;i<recorded.length;i++)tick();
      const replayed=trace;trace=null;need(JSON.stringify(recorded)===JSON.stringify(replayed),'Actual saved replay does not reproduce every physical tick');
      const result=stateData(A.getState());need(JSON.stringify(result)===JSON.stringify(recordedFinal),'Actual replay final state differs');
      A.draw();A.pause(true);
      return {stage:stageId,inputMethod:'DOM keyboard events through existing bindings and public advance API',noActorPhaseOrTimeAssignments:true,
        initial,right,left,recorded:{id:rep.id,inputTicks:flat,compressedRows:rep.frames.length,meta:rep.meta,final:recordedFinal},
        replay:{startedBy:'public startReplay on actual saved replay',allPhysicalTicksIdentical:true,comparedTicks:recorded.length,final:result}};
    }finally{trace=null;A.pause(true)}
  }
  function motionProbe(stageId,expectedMotion,mode){
    const s=start(stageId,99,'training');ticks(240);const draw=inspectDraw(stageId);A.pause(true);
    for(const call of draw.phaseCalls)need(call.options.motion===expectedMotion,'Actual scene setting did not control both stage phases: '+mode);
    if(!expectedMotion)need(draw.maskDraws.length===0,'Disabled stage motion still drew local masks: '+mode);
    else if(stageId!=='zanzibar')need(draw.maskDraws.length===4,'Enabled real game must draw four native local masks');
    return {stage:stageId,mode,expectedMotion,mediaReducedMotion:matchMedia('(prefers-reduced-motion: reduce)').matches,
      actualStoredSettings:JSON.parse(localStorage.getItem('cqc-v044-profile')||'{}').settings,draw};
  }
  async function ready(){
    need(R.coordinates.width===1280&&R.coordinates.height===720&&R.coordinates.ground===568&&R.coordinates.cameraMin===-220&&R.coordinates.cameraMax===220,'Logical stage coordinate contract differs');
    const stages=Object.keys(expected.stages);need(window.CQC_STAGE_LAYER_DATA.stages.length===30,'Actual30 stage catalog absent');
    for(const id of stages){const got=window.CQC_STAGE_LAYER_DATA.stages.find(s=>s.id===id);need(JSON.stringify(got.layers)===JSON.stringify(expected.stages[id].layers),'Actual loaded stage geometry/metadata differs '+id);need(await R.preload(id),'Real stage native load failed '+id);const status=R.status(id);need(status.state==='ready'&&!status.errors.length&&status.layers===4,'Real stage not ready '+id);}
    need((await Promise.all(['core__runner_mg2','core__snake'].map(uid=>window.CQC_COMBAT_SPRITES.whenReady(uid)))).every(Boolean),'Actual fighters not ready '+JSON.stringify(['core__runner_mg2','core__snake'].map(uid=>window.CQC_COMBAT_SPRITES.status(uid))));
    const hashes=[];for(const [path,want] of Object.entries(expected.sourcePins)){const url=location.origin+'/cqc/'+path,response=await fetch(url,{cache:'force-cache'});need(response.ok,'Runtime source fetch failed '+path);const bytes=await response.arrayBuffer(),sha=[...new Uint8Array(await crypto.subtle.digest('SHA-256',bytes))].map(x=>x.toString(16).padStart(2,'0')).join('');need(sha===want.sha256&&bytes.byteLength===want.bytes,'Actual loaded runtime byte pin differs '+path);hashes.push({path,bytes:bytes.byteLength,sha256:sha});}
    return {actualRuntimeByteHashes:hashes,stageStatus:stages.map(id=>R.status(id)),coordinates:R.coordinates};
  }
  window.PASS9_STAGE_GAME={ready,walkAndReplay,motionProbe};
  return {installed:true,observerOnly:true,noAppSourceMutation:true};
})()
