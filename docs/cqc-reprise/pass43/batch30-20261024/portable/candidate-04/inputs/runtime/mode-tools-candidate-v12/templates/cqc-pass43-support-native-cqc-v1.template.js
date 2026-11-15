/* P43 native unarmed Support variants; source jab/throw stats and authored contact zones. */
(function(root){
  'use strict';
  const authorities=new Map(__P43_SCOPE_JSON__),states=new WeakMap(),same=(a,b)=>JSON.stringify(a)===JSON.stringify(b),finite=Number.isFinite;
  let bridge=null,router=null,live=null,requests=0,accepted=0,hits=0,draws=0,blocked=0,canceled=0,lastAttack=null,lastHit=null,lastDraw=null;
  const selected=state=>bridge?.selectedLead?.(state?.lead)||state?.lead;
  function ownsLead(fighter){const actual=bridge?.selectedLead?.(fighter)||fighter;return authorities.has(actual?.uid+':'+actual?.costume);}
  function authorityFor(state){const fighter=selected(state);return authorities.get(fighter?.uid+':'+fighter?.costume)||null;}
  const owns=state=>ownsLead(state?.lead);
  function record(state){let value=states.get(state);if(!value){value={attack:null,lastTick:-1,face:1};states.set(state,value);}return value;}
  function reviewed(state){
    const authority=authorityFor(state);if(!authority)return null;const UID=authority.uid,ID=authority.costume;
    const fighter=selected(state),descriptor=root.CQC_NATIVE_WARDROBE_INDEX?.entries?.find(value=>value.uid===UID&&value.id===ID);
    const sprites=root.CQC_COMBAT_SPRITES,entry=sprites?.getEntry?.(UID,fighter);
    if(!owns(state)||!root.CQC_PASS43_NATIVE_ORIGINS?.owns?.({f:fighter})||descriptor?.metadata?.sha256!==authority.metadataSHA256
      ||descriptor.review?.artAuditSHA256!==authority.artAuditSHA256||entry?.uid!==UID||entry.pass40Revision!==authority.revision
      ||entry.review?.status!=='approved'||!entry.review.reviewer?.startsWith('Root')||entry.review.artAuditSHA256!==authority.artAuditSHA256
      ||entry.mirror!==false||entry.fallbackMissingActions!==false||entry.costumeConcept?.family!==authority.family
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
    const authority=authorityFor(state);if(!authority)return null;const UID=authority.uid;
    const value=reviewed(state);if(!value)return null;
    const side=attack.face===-1?'left':'right',expected=authority.sources[side][attack.move.action];
    const actions=attack.face===value.entry.facing?value.entry.actions:value.entry.oppositeActions;
    if(!actions)return null;
    const values=pose(state,attack),selectedFrame=root.CQC_COMBAT_SPRITES.selectFrame({...value.entry,actions},
      activeOnly?{...values,attackPhase:'active',phaseProgress:0}:values),frame=selectedFrame?.frame;
    if(!frame||root.CQC_COMBAT_SPRITES.status(UID,{...value.fighter,face:attack.face,action:attack.move.action}).ready!==true)return null;
    if((activeOnly||values.attackPhase==='active')&&(selectedFrame.action!==attack.move.action||!expected.selectedFrameIndices.includes(selectedFrame.index)
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
    live=state;install();requests++;const authority=authorityFor(state),value=record(state),hero=state.hero;
    const left=!!keys?.has?.('ArrowLeft'),right=!!keys?.has?.('ArrowRight');
    if(left!==right)value.face=left?-1:1;
    if(value.attack&&state.frame-value.attack.start>=value.attack.total)value.attack=null;
    // Every owned request is consumed, including rejected/loading inputs. No pistol fallback.
    if(!hero||state.ended||hero.life<=0||hero.cool>0||hero.inv>18||hero.y<589||Math.abs(hero.vy||0)>.001||value.attack){blocked++;return true;}
    const modified=!!keys?.has?.('ShiftLeft')||!!keys?.has?.('ShiftRight');
    const kind=modified?'throw':'punch';
    const move=authority.moves[kind];if(!move){blocked++;return true;}const attack={kind,move,start:state.frame,face:value.face,total:move.startup+move.active+move.recovery,
      damage:hero.power>0?Math.round(move.damage*360/260):move.damage,hitOnce:false,rootX:Math.max(45,Math.min(1230,hero.x)),keys};
    if(!nativeFrame(state,attack,true)){blocked++;return true;}
    value.attack=attack;hero.cool=attack.total;accepted++;
    lastAttack={uid:authority.uid,costume:authority.costume,kind,frame:state.frame,face:attack.face,total:attack.total,damage:attack.damage,ammoCost:0,physicalPoseIndex:move.role};
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
  function controlsLabel(state){return owns(state)?authorityFor(state).controlsLabel:null;}
  function hudLabel(state){return owns(state)?'CQC · RATIONS '+state.hero.rations:null;}
  function install(){
    const current=root.CQC_SUPPORT_NATIVE_ACTORS;
    if(current?.drawLead&&current!==bridge){
      if(typeof current.leadScale!=='function')throw Error('P43 Support CQC requires the reviewed shared leadScale');
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
        if(drawn){draws++;const f=native.selectedFrame.frame;lastDraw={uid:native.fighter.uid,costume:native.fighter.costume,face:attack.face,frame:state.frame,phase:native.pose.attackPhase,physicalPoseIndex:f.physicalPoseIndex,sourceFile:f.file,sourceSHA256:f.sha256,sourceRect:[...f.rect],sourcePivot:[...f.pivot]};}return drawn;
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
  if(root.CQC_PASS43_SUPPORT_CQC)throw Error('Duplicate P43 Support CQC adapter');
  root.CQC_PASS43_SUPPORT_CQC=Object.freeze({install,requestShot,update,ownsLead,controlsLabel,hudLabel,
    diagnostics:()=>({scope:'pass43-support-native-unarmed-cqc/1',requests,accepted,hits,draws,blocked,canceled,ammoCost:0,projectilesEmitted:0,
      sourceAuthorities:[...authorities.values()].map(a=>({uid:a.uid,costume:a.costume,metadataSHA256:a.metadataSHA256})),lastDraw:lastDraw?{...lastDraw}:null,lastAttack:lastAttack?{...lastAttack}:null,lastHit:lastHit?JSON.parse(JSON.stringify(lastHit)):null,
      qualification:'Exact reviewed P43 native source jab/throw frames; startup, active, recovery, damage and reach retain each current fighter profile. Support contact volumes and powered damage are gameplay adaptation, not extracted retail animation or hand collision.'})});
  // The host queries this legacy HUD/controls interface; only exact new keys intercept.
  const priorLabels=root.CQC_PASS40_LIQUID_SUPPORT;if(!priorLabels?.controlsLabel||!priorLabels?.hudLabel)throw Error('Original Support CQC label interface absent');
  root.CQC_PASS40_LIQUID_SUPPORT=Object.freeze({...priorLabels,controlsLabel:function(state){return owns(state)?controlsLabel(state):priorLabels.controlsLabel.apply(priorLabels,arguments);},hudLabel:function(state){return owns(state)?hudLabel(state):priorLabels.hudLabel.apply(priorLabels,arguments);}});
  install();
})(globalThis);
