/* Scoped Liquid MGS1 nextgen Support CQC. All contact volumes are authored gameplay. */
(function(root){
  'use strict';
  const authority={"uid":"core__liquid","costume":"nextgen","revision":"native-batch40-v2","metadataSHA256":"f592ccf181c17f57727177d406db143b650cfb163948d5c22a06116499a39815","artAuditSHA256":"f25cd5e267d2a266d5417dd66425be2e75de04d6cda5acf36e0299c662fdca6c","displayHeight":230,"moves":{"punch":{"startup":6,"active":3,"recovery":12,"damage":320,"reach":76,"tag":"strike","slot":"light","action":"punch","role":6,"travel":0},"throw":{"startup":10,"active":3,"recovery":32,"damage":930,"reach":86,"tag":"grapple","slot":"specialForward","action":"throw","role":8,"travel":0},"charge":{"startup":18,"active":7,"recovery":32,"damage":730,"reach":100,"tag":"strike","slot":"special","action":"charge","role":11,"travel":7}},"sources":{"right":{"punch":{"selectedFrameIndex":1,"sourceFile":"assets/combat-costumes-pass40/core__liquid/nextgen/page0-right-v1.png","sourceSHA256":"86c0a61c6a014ca37359b09423a54db0c9325feee787414ade5aefd66ccc327e","sourceRect":[635,331,287,286],"sourcePivot":[0.4808362369337979,0.993006993006993],"physicalPoseIndex":6,"sourceStandingHeight":309},"throw":{"selectedFrameIndex":1,"sourceFile":"assets/combat-costumes-pass40/core__liquid/nextgen/page0-right-v1.png","sourceSHA256":"86c0a61c6a014ca37359b09423a54db0c9325feee787414ade5aefd66ccc327e","sourceRect":[27,640,271,280],"sourcePivot":[0.43911439114391143,0.9928571428571429],"physicalPoseIndex":8,"sourceStandingHeight":309},"charge":{"selectedFrameIndex":1,"sourceFile":"assets/combat-costumes-pass40/core__liquid/nextgen/page0-right-v1.png","sourceSHA256":"86c0a61c6a014ca37359b09423a54db0c9325feee787414ade5aefd66ccc327e","sourceRect":[920,643,325,261],"sourcePivot":[0.5169230769230769,0.9923371647509579],"physicalPoseIndex":11,"sourceStandingHeight":309}},"left":{"punch":{"selectedFrameIndex":1,"sourceFile":"assets/combat-costumes-pass40/core__liquid/nextgen/page1-left-v1.png","sourceSHA256":"46eb319faa5f534b85cd7de62baa79a1b2639f3cf877cddcd72564baa2bd90fb","sourceRect":[620,374,292,266],"sourcePivot":[0.5205479452054794,0.9924812030075187],"physicalPoseIndex":6,"sourceStandingHeight":346},"throw":{"selectedFrameIndex":1,"sourceFile":"assets/combat-costumes-pass40/core__liquid/nextgen/page1-left-v1.png","sourceSHA256":"46eb319faa5f534b85cd7de62baa79a1b2639f3cf877cddcd72564baa2bd90fb","sourceRect":[19,663,279,271],"sourcePivot":[0.5412186379928315,0.992619926199262],"physicalPoseIndex":8,"sourceStandingHeight":346},"charge":{"selectedFrameIndex":1,"sourceFile":"assets/combat-costumes-pass40/core__liquid/nextgen/page1-left-v1.png","sourceSHA256":"46eb319faa5f534b85cd7de62baa79a1b2639f3cf877cddcd72564baa2bd90fb","sourceRect":[868,686,385,241],"sourcePivot":[0.7272727272727273,0.991701244813278],"physicalPoseIndex":11,"sourceStandingHeight":346}}}};
  const UID=authority.uid,ID=authority.costume,states=new WeakMap(),same=(a,b)=>JSON.stringify(a)===JSON.stringify(b),finite=Number.isFinite;
  let bridge=null,router=null,live=null,requests=0,accepted=0,hits=0,draws=0,blocked=0,canceled=0,lastAttack=null,lastHit=null;
  const selected=state=>bridge?.selectedLead?.(state?.lead)||state?.lead;
  function ownsLead(fighter){const actual=bridge?.selectedLead?.(fighter)||fighter;return actual?.uid===UID&&actual.costume===ID;}
  const owns=state=>ownsLead(state?.lead);
  function record(state){let value=states.get(state);if(!value){value={attack:null,lastTick:-1,face:1};states.set(state,value);}return value;}
  function reviewed(state){
    const fighter=selected(state),descriptor=root.CQC_NATIVE_WARDROBE_INDEX?.entries?.find(value=>value.uid===UID&&value.id===ID);
    const sprites=root.CQC_COMBAT_SPRITES,entry=sprites?.getEntry?.(UID,fighter);
    if(!owns(state)||!root.CQC_PASS40_NATIVE_ORIGINS?.owns?.({f:fighter})||descriptor?.metadata?.sha256!==authority.metadataSHA256
      ||descriptor.review?.artAuditSHA256!==authority.artAuditSHA256||entry?.uid!==UID||entry.pass40Revision!==authority.revision
      ||entry.review?.status!=='approved'||!entry.review.reviewer?.startsWith('Root')||entry.review.artAuditSHA256!==authority.artAuditSHA256
      ||entry.mirror!==false||entry.fallbackMissingActions!==false||entry.costumeConcept?.family!=='nextgen'
      ||entry.nativeDirectionRegions?.uid!==UID||entry.nativeDirectionRegions.regions?.length!==32)return null;
    return{fighter,entry};
  }
  function pose(state,attack){
    const age=state.frame-attack.start,move=attack.move,phase=age<move.startup?'startup':age<move.startup+move.active?'active':'recovery';
    const duration=phase==='startup'?move.startup:phase==='active'?move.active:move.recovery;
    const elapsed=phase==='startup'?age:phase==='active'?age-move.startup:age-move.startup-move.active;
    return{entityKey:state.hero,time:state.frame/60,moveSlot:move.slot,moveKind:'melee',moveTag:move.tag,attack:true,
      animationActive:true,attackPhase:phase,phaseProgress:Math.max(0,Math.min(1,elapsed/duration)),attackTime:age/60,actionTime:age/60};
  }
  function nativeFrame(state,attack,activeOnly=false){
    const value=reviewed(state);if(!value)return null;
    const side=attack.face===-1?'left':'right',expected=authority.sources[side][attack.move.action];
    const actions=attack.face===value.entry.facing?value.entry.actions:value.entry.oppositeActions;
    if(!actions)return null;
    const values=pose(state,attack),selectedFrame=root.CQC_COMBAT_SPRITES.selectFrame({...value.entry,actions},
      activeOnly?{...values,attackPhase:'active',phaseProgress:0}:values),frame=selectedFrame?.frame;
    if(!frame||root.CQC_COMBAT_SPRITES.status(UID,{...value.fighter,face:attack.face,action:attack.move.action}).ready!==true)return null;
    if((activeOnly||values.attackPhase==='active')&&(selectedFrame.action!==attack.move.action||selectedFrame.index!==expected.selectedFrameIndex
      ||frame.physicalPoseIndex!==expected.physicalPoseIndex||frame.file!==expected.sourceFile||frame.sha256!==expected.sourceSHA256
      ||!same(frame.rect,expected.sourceRect)||!same(frame.pivot,expected.sourcePivot)
      ||value.entry.sourceFrameHeights?.[frame.file]!==expected.sourceStandingHeight))return null;
    return{...value,selectedFrame,pose:values};
  }
  function scaled(state,native,context,scale){
    if(typeof bridge?.leadScale!=='function')return null;
    const adjusted=bridge.leadScale(native.fighter,context,state.hero.y,scale);
    const ratio=root.CQC_PASS19_WORLD_SCALE?.height?.(native.fighter,{originalPixels:native.entry.displayHeight})?.ratio;
    return finite(adjusted)&&adjusted>0&&finite(ratio)&&ratio>0?{adjusted,ratio,factor:adjusted*ratio}:null;
  }
  function targetBounds(operation,enemy){
    if(!enemy||!finite(enemy.x)||!finite(enemy.y))return null;
    const target=bridge?.resolveEnemy?.(operation,enemy.kind);
    if(!target?.uid||target.simulation)return{x:enemy.x-35,y:enemy.y-160,w:70,h:160};
    const fighter={uid:target.uid},entry=root.CQC_COMBAT_SPRITES?.getEntry?.(target.uid,fighter);
    const actions=entry?.facing===-1?entry.actions:entry?.oppositeActions,frame=actions?.idle?.frames?.[0];
    const sourceHeight=entry?.sourceFrameHeights?.[frame?.file]||entry?.baseFrameHeight;
    const ratio=root.CQC_PASS19_WORLD_SCALE?.height?.(fighter,{originalPixels:entry?.displayHeight})?.ratio;
    const factor=entry?.displayHeight/sourceHeight*ratio*root.CQC_SUPPORT_NATIVE_ACTOR_FACTORY?.SCALE;
    if(!frame||!finite(factor)||factor<=0)return null;
    const ys=frame.clipPolygon?.length?frame.clipPolygon.map(point=>point[1]):[0,1];
    if(ys.some(y=>!finite(y)||y<0||y>1))return null;
    const top=enemy.y+(Math.min(...ys)-frame.pivot[1])*frame.rect[3]*factor;
    const bottom=enemy.y+(Math.max(...ys)-frame.pivot[1])*frame.rect[3]*factor;
    return bottom>top?{x:enemy.x-35,y:top,w:70,h:bottom-top}:null;
  }
  function contactZone(state,attack,factor){
    const reach=attack.move.reach*factor,top=190*factor,bottom=35*factor;
    return{x:attack.face===1?state.hero.x:state.hero.x-reach,y:state.hero.y-top,w:reach,h:top-bottom};
  }
  function requestShot(state,keys){
    if(!owns(state))return false;
    live=state;install();requests++;const value=record(state),hero=state.hero;
    const left=!!keys?.has?.('ArrowLeft'),right=!!keys?.has?.('ArrowRight');
    if(left!==right)value.face=left?-1:1;
    if(value.attack&&state.frame-value.attack.start>=value.attack.total)value.attack=null;
    // Every owned request is consumed, including rejected/loading inputs. No pistol fallback.
    if(!hero||state.ended||hero.life<=0||hero.cool>0||hero.inv>18||hero.y<589||Math.abs(hero.vy||0)>.001||value.attack){blocked++;return true;}
    const modified=!!keys?.has?.('ShiftLeft')||!!keys?.has?.('ShiftRight');
    const kind=modified?(left!==right?'charge':'throw'):'punch';
    const move=authority.moves[kind],attack={kind,move,start:state.frame,face:value.face,total:move.startup+move.active+move.recovery,
      damage:hero.power>0?Math.round(move.damage*360/260):move.damage,hitOnce:false,rootX:Math.max(45,Math.min(1230,hero.x)),keys};
    if(!nativeFrame(state,attack,true)){blocked++;return true;}
    value.attack=attack;hero.cool=attack.total;accepted++;
    lastAttack={kind,frame:state.frame,face:attack.face,total:attack.total,damage:attack.damage,ammoCost:0,physicalPoseIndex:move.role};
    return true;
  }
  function update(state){
    if(!owns(state))return false;
    live=state;install();const value=record(state);if(value.lastTick===state.frame)return true;value.lastTick=state.frame;
    const attack=value.attack,hero=state.hero;if(!attack||!hero)return true;
    const age=state.frame-attack.start;
    if(state.ended||hero.life<=0||hero.inv>18||hero.y<589||attack.keys?.has?.('KeyK')||age>=attack.total){if(age<attack.total)canceled++;value.attack=null;return true;}
    // Plant the source body's root while winding up/recovering; K dash, jump or hurt canceled above.
    hero.x=attack.rootX;
    if(age<attack.move.startup||age>=attack.move.startup+attack.move.active)return true;
    const native=nativeFrame(state,attack,true),canvas=root.document?.getElementById?.('gameCanvas');
    const size=native&&canvas&&scaled(state,native,{canvas},root.CQC_SUPPORT_NATIVE_ACTOR_FACTORY?.SCALE);
    if(!size){canceled++;value.attack=null;return true;}
    // Fixed authored travel follows the hero root only; it never tracks an enemy or camera.
    if(attack.kind==='charge'){hero.x=Math.max(45,Math.min(1230,hero.x+attack.face*attack.move.travel));attack.rootX=hero.x;}
    if(attack.hitOnce)return true;
    const zone=contactZone(state,attack,size.factor);
    const candidates=(state.enemies||[]).filter(enemy=>enemy.life>0&&(enemy.x-hero.x)*attack.face>=-5)
      .sort((a,b)=>Math.abs(a.x-hero.x)-Math.abs(b.x-hero.x));
    for(const enemy of candidates){
      if(attack.kind==='throw'&&Math.abs(enemy.y-590)>1)continue;
      const box=targetBounds(state.o,enemy);
      if(!box||zone.x>=box.x+box.w||zone.x+zone.w<=box.x||zone.y>=box.y+box.h||zone.y+zone.h<=box.y)continue;
      enemy.life-=attack.damage;enemy.flash=8;attack.hitOnce=true;hits++;
      if(attack.kind==='throw'){enemy.slow=Math.max(enemy.slow||0,18);enemy.cool=Math.max(enemy.cool||0,24);}
      const frame=native.selectedFrame.frame;
      lastHit={frame:state.frame,kind:attack.kind,face:attack.face,damage:attack.damage,enemyX:enemy.x,enemyY:enemy.y,remainingLife:enemy.life,
        physicalPoseIndex:frame.physicalPoseIndex,sourceFile:frame.file,sourceSHA256:frame.sha256,zone:{...zone},targetBounds:{...box}};
      break;
    }
    return true;
  }
  function controlsLabel(state){return owns(state)?'FRAPPE · MAJ+J PRISE · MAJ+←/→+J CHARGE':null;}
  function hudLabel(state){return owns(state)?'CQC · RATIONS '+state.hero.rations:null;}
  function install(){
    const current=root.CQC_SUPPORT_NATIVE_ACTORS;
    if(current?.drawLead&&current!==bridge){
      if(typeof current.leadScale!=='function')throw Error('Liquid Support CQC requires the reviewed shared leadScale');
      bridge=current;const previous=current.drawLead;
      current.drawLead=function(context,fighter,x,y,face,scale,normalPose={}){
        const state=live;
        if(!owns(state)||fighter!==state.lead||context?.canvas?.id!=='gameCanvas'||state.hero.x!==x||state.hero.y!==y)return previous.apply(this,arguments);
        // Dash cooldown and interrupted CQC never turn the unarmed body into a shooting pose.
        const value=record(state),neutral={...normalPose,shoot:false},attack=value.attack;
        if(!attack&&normalPose.walk)value.face=face;
        if(!attack||normalPose.hit||state.hero.life<=0)return previous.call(this,context,fighter,x,y,attack?.face||value.face,scale,neutral);
        const native=nativeFrame(state,attack),size=native&&scaled(state,native,context,scale);
        if(!native||!size)return false;
        const drawn=root.CQC_COMBAT_SPRITES.draw(context,native.fighter,x,y,attack.face,size.adjusted,native.pose)===true;
        if(drawn)draws++;return drawn;
      };
    }
    const previous=root.CQC_PASS39_RAPTOR_SUPPORT;
    if(previous&&!router&&typeof previous.requestShot==='function'&&typeof previous.update==='function'){
      router=Object.freeze({...previous,
        requestShot:function(state,keys){return owns(state)?requestShot(state,keys):previous.requestShot.apply(previous,arguments);},
        update:function(state){return owns(state)?update(state):previous.update.apply(previous,arguments);}});
      root.CQC_PASS39_RAPTOR_SUPPORT=router;
    }
    return!!router;
  }
  if(root.CQC_PASS40_LIQUID_SUPPORT)throw Error('Duplicate Liquid Support CQC adapter');
  root.CQC_PASS40_LIQUID_SUPPORT=Object.freeze({uid:UID,costume:ID,install,requestShot,update,ownsLead,controlsLabel,hudLabel,
    diagnostics:()=>({scope:'pass40-liquid-nextgen-support-cqc/1',requests,accepted,hits,draws,blocked,canceled,ammoCost:0,projectilesEmitted:0,
      sourceAuthority:authority.metadataSHA256,lastAttack:lastAttack?{...lastAttack}:null,lastHit:lastHit?JSON.parse(JSON.stringify(lastHit)):null,
      qualification:'Original Liquid MGS1 source identity and authored nextgen art. Support timings/contact volumes/travel are gameplay adaptation, not extracted retail animation or hand collision.'})});
  install();
})(globalThis);
