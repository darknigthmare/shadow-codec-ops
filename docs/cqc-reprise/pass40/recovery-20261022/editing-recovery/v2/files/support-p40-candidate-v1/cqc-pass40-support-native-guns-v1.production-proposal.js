/* Two reviewed P40 costumes; native muzzle placement with historical Support projectile rules. */
(function(root){
  'use strict';
  if(typeof root.CQC_PASS40_NATIVE_ORIGINS?.sourcePoint!=='function')throw Error('P40 Support requires the reviewed pure sourcePoint getter');
  const scope=new Map([
    ['core__snake:mgs3-camo-watersnake',{slot:'special',tag:'tranq'}],
    ['core__meryl_mgs1:survive',{slot:'special',tag:'ballistic'}]
  ]),states=new WeakMap(),same=(a,b)=>JSON.stringify(a)===JSON.stringify(b),finite=Number.isFinite;
  let bridge=null,router=null,live=null,requests=0,emissions=0,draws=0,blocked=0,lastEmission=null;
  const selected=state=>bridge?.selectedLead?.(state?.lead)||state?.lead;
  function configuration(state){const fighter=selected(state),value=scope.get(fighter?.uid+':'+fighter?.costume);return value&&root.CQC_PASS40_NATIVE_ORIGINS?.owns?.({f:fighter})?{fighter,...value}:null;}
  function record(state){let value=states.get(state);if(!value){value={pending:null,attack:null,lastTick:-1};states.set(state,value);}return value;}
  function pose(state,config){return{entityKey:state.hero,time:state.frame/60,moveSlot:config.slot,moveKind:'projectile',moveTag:config.tag,attack:true,animationActive:true,attackPhase:'active',phaseProgress:0,attackTime:0,actionTime:0};}
  function source(state,config){
    const sprites=root.CQC_COMBAT_SPRITES,entry=sprites?.getEntry?.(config.fighter.uid,config.fighter);
    const anchor=root.CQC_PASS40_NATIVE_ORIGINS?.sourcePoint?.(config.fighter.uid,config.fighter.costume,'right',config.slot,config.tag);
    if(!entry||!anchor||typeof bridge?.leadScale!=='function')return null;
    const actions=entry.facing===1?entry.actions:entry.oppositeActions;
    if(!actions)return null;
    const selectedFrame=sprites.selectFrame({...entry,actions},pose(state,config)),frame=selectedFrame?.frame;
    if(!frame||selectedFrame.action!==anchor.selectedAction||selectedFrame.index!==anchor.selectedFrameIndex||frame.file!==anchor.sourceFile||frame.sha256!==anchor.sourceSHA256||!same(frame.rect,anchor.sourceRect)||!same(frame.pivot,anchor.sourcePivot))return null;
    if(sprites.status(config.fighter.uid,{...config.fighter,face:1,action:selectedFrame.action}).ready!==true)return null;
    return{entry,anchor};
  }
  function project(state,config,native,context,scale){
    const {entry,anchor}=native,height=entry.sourceFrameHeights?.[anchor.sourceFile];
    const adjusted=bridge.leadScale(config.fighter,context,state.hero.y,scale);
    const ratio=root.CQC_PASS19_WORLD_SCALE?.height?.(config.fighter)?.ratio;
    const factor=entry.displayHeight/height*adjusted*ratio,rect=anchor.sourceRect,pivot=anchor.sourcePivot;
    if(!finite(factor)||factor<=0)return null;
    const x=state.hero.x+(anchor.sourceNativeXY[0]-rect[0]-pivot[0]*rect[2])*factor;
    const y=state.hero.y+(anchor.sourceNativeXY[1]-rect[1]-pivot[1]*rect[3])*factor;
    return finite(x)&&finite(y)?{x,y,adjusted}:null;
  }
  function requestShot(state){
    const config=configuration(state);if(!config)return false;
    live=state;const h=state.hero,value=record(state);
    if(!h||h.cool>0||h.ammo<=0)return true;
    requests++;
    // Fail closed for these owned costumes; never substitute the generic pistol point.
    const native=source(state,config),canvas=root.document?.getElementById?.('gameCanvas');
    if(!native||!canvas||!project(state,config,native,{canvas},root.CQC_SUPPORT_NATIVE_ACTOR_FACTORY?.SCALE)){blocked++;return true;}
    h.ammo--;h.cool=10;
    value.pending={config,native,damage:h.power>0?360:260,frame:state.frame};
    value.attack={config,frame:state.frame,firstDraw:true};
    return true;
  }
  function update(state){
    const config=configuration(state);if(!config)return false;
    live=state;const value=record(state);if(value.lastTick===state.frame)return true;value.lastTick=state.frame;
    const pending=value.pending;value.pending=null;
    if(pending){
      // The host calls this after clamping the hero, before advancing/colliding shots.
      const canvas=root.document?.getElementById?.('gameCanvas'),scale=root.CQC_SUPPORT_NATIVE_ACTOR_FACTORY?.SCALE;
      const at=canvas&&project(state,pending.config,pending.native,{canvas},scale);
      if(!at)throw Error('P40 Support native projection is unavailable');
      state.shots.push({x:at.x,y:at.y,vx:17,damage:pending.damage});emissions++;
      lastEmission={uid:pending.config.fighter.uid,costume:pending.config.fighter.costume,frame:state.frame,x:at.x,y:at.y,face:1,vx:17,damage:pending.damage,sourceFile:pending.native.anchor.sourceFile,sourceSHA256:pending.native.anchor.sourceSHA256,sourceNativeXY:[...pending.native.anchor.sourceNativeXY]};
    }
    if(state.hero.cool<=0)value.attack=null;
    return true;
  }
  function install(){
    const current=root.CQC_SUPPORT_NATIVE_ACTORS;
    if(current?.drawLead&&current!==bridge){
      if(typeof current.leadScale!=='function')throw Error('P40 Support requires the reviewed shared leadScale export');
      bridge=current;const prior=current.drawLead;
      current.drawLead=function(context,fighter,x,y,face,scale,normalPose={}){
        const state=live,config=state&&configuration(state),attack=state&&record(state).attack;
        if(!config||!attack||fighter!==state.lead||context?.canvas?.id!=='gameCanvas'||state.hero.x!==x||state.hero.y!==y||state.hero.life<=0||normalPose.hit&&!attack.firstDraw)return prior.apply(this,arguments);
        // The active muzzle frame faces right because Support retains its right-going shot.
        // Give the first visible discharge priority; subsequent hurt poses keep their old priority.
        const native=source(state,attack.config);if(!native)return false;
        const at=project(state,attack.config,native,context,scale);if(!at)return false;
        const drawn=root.CQC_COMBAT_SPRITES.draw(context,attack.config.fighter,x,y,1,at.adjusted,pose(state,attack.config))===true;
        if(drawn){draws++;attack.firstDraw=false;}return drawn;
      };
    }
    const prior=root.CQC_PASS39_RAPTOR_SUPPORT;
    if(prior&&!router&&typeof prior.requestShot==='function'&&typeof prior.update==='function'){
      router=Object.freeze({...prior,
        requestShot:function(state,keys){return configuration(state)?requestShot(state):prior.requestShot.apply(prior,arguments);},
        update:function(state){return configuration(state)?update(state):prior.update.apply(prior,arguments);}});
      root.CQC_PASS39_RAPTOR_SUPPORT=router;
    }
    return!!router;
  }
  if(root.CQC_PASS40_SUPPORT_NATIVE_GUNS)throw Error('Duplicate P40 Support gun adapter');
  root.CQC_PASS40_SUPPORT_NATIVE_GUNS=Object.freeze({install,requestShot,update,
    diagnostics:()=>({scopeVersion:'pass40-support-native-guns/1',requests,emissions,draws,blocked,lastEmission:lastEmission?{...lastEmission,sourceNativeXY:[...lastEmission.sourceNativeXY]}:null,scope:[...scope.keys()],skullEnabled:false,ammoCost:1,cooldown:10,vx:17})});
  install();
})(globalThis);
