/* Proposed seventeen-option P41 native guns and owned-shot native upright target bounds; review required. */
(function(root){
  'use strict';
  if(typeof root.CQC_PASS41_NATIVE_ORIGINS?.sourcePoint!=='function')throw Error('P41 Support requires the reviewed pure sourcePoint getter');
  const scope=new Map([["core__snake:mgs3-camo-festival",{"slot":"special","tag":"tranq","metadataSHA256":"90e758b961c3426d99d9f0534f4f9f29292ae07be7e4c6a7d0395fa25880295c","artAuditSHA256":"02a42fafd4b45f1d2c17725625d73f0ce4108af975952515464de5fa52cee77e"}],["core__snake:mgs3-camo-swamp",{"slot":"special","tag":"tranq","metadataSHA256":"b04e84842df1b589768d8c2cd59a8d3cc54586697331b8c4e593f2b0b359b454","artAuditSHA256":"253c36fcce3515146e20528956cfd648710d27c0e241a568d2db595e29e6b751"}],["core__snake:mgs3-camo-anubis",{"slot":"special","tag":"tranq","metadataSHA256":"806030a173f32173ce1884bd353ca258830c688e1a48eea76fbba0a49d0c34f8","artAuditSHA256":"5687e5ae3846d9fd525a552770e30c2d6f95c86cb80f935231a1cd11eb152062"}],["core__snake:mgs3-camo-rainbow",{"slot":"special","tag":"tranq","metadataSHA256":"f4a7bbec2ce76f42d24bf8ec50a0d6f94a6bc48970ff1f6167149610ba908fd3","artAuditSHA256":"a1bd1cc2065de663021c1f91143957a25cf7daf7a0eee2e940c0e6c3cb9382c5"}],["archive__drebin:tuxedo",{"slot":"special","tag":"ballistic","metadataSHA256":"071d978f38689f70e476e38c183b027ccf0117bc2adcb80c25afc03424cae086","artAuditSHA256":"a5a47acc151948022a27fc499880d30b0fc220b47bfd6b37e57a19f510fc4f27"}],["core__snake:mgs3-camo-animals",{"slot":"special","tag":"tranq","metadataSHA256":"0942a906aabcaceb7473306780d0e643ad2029aa6be3a263a85be2301d2d68e8","artAuditSHA256":"9e749d83e43672e023cca5effc3a873eeafefd631f8386c271307d9c5d233a34"}],["core__snake:mgs3-camo-st-valentine",{"slot":"special","tag":"tranq","metadataSHA256":"eda8372ad90025e152be41651f041954b77557459d7d0eb42ff7d383f5544834","artAuditSHA256":"20c3264eff976a39623b5fa7e3f52e3c019a3880d77b80ac38f499c3bfdfae15"}],["core__snake:mgs3-camo-dododo",{"slot":"special","tag":"tranq","metadataSHA256":"0d2606a4934618e4a4ed1df66e6613a1958394f07e13c32dc209c6ee886aa477","artAuditSHA256":"1a1b145b22cab016afb80c6e2d57e966af9914d93c752021223789b49f4a1200"}],["core__snake:mgs3-camo-banana",{"slot":"special","tag":"tranq","metadataSHA256":"501b9497cf4919c0ab5cc1234db59723d8838f30a4744d13f47133585f919293","artAuditSHA256":"4c63a34b06d10769a3fcfb02b8a9d56adf98ba575ad4249735d475a0af8f1ec3"}],["core__snake:mgs3-camo-fly",{"slot":"special","tag":"tranq","metadataSHA256":"518fba0cd67cb682233aaeeaec1b676cb7261722133d1c8c25c2371ac090a654","artAuditSHA256":"b988f6367e52a33fe518ba87965935f1644566a394d5d68b336cd45bc7c83115"}],["core__snake:mgs3-camo-dpm",{"slot":"special","tag":"tranq","metadataSHA256":"040649478091c460bddf20ccf802bbc0922b58d74e01725927f0e7d6c4fc7ec9","artAuditSHA256":"edebfa446e1cbd9fc4bc9bae634383c90485c5d00d83d7834c99f11c7e115a11"}],["roster50__campbell_mg2:retro-msx",{"slot":"special","tag":"ballistic","metadataSHA256":"c6d570c017ede6bd22c4c591eb9b244adbf185917405f8649f418fa1c1833072","artAuditSHA256":"fe141c631813653c5946c0bab89a4bf3d683cbad9b6301401a04d49cc2651884"}],["roster50__campbell_mg2:tuxedo",{"slot":"special","tag":"ballistic","metadataSHA256":"c7f5362200ed1480ab34691f25e6c82c93fe854da26bb37306f173ddbb49b60e","artAuditSHA256":"7f134a1ffb4b897b3b3ea1d43181300908fa16650d4e3154e43c5460e77edf3f"}],["roster50__campbell_mgs1:tuxedo",{"slot":"special","tag":"ballistic","metadataSHA256":"4431c35023dabc49c65983959fa5c83c890ad8cd2126b32d228defe3594c3d3e","artAuditSHA256":"381797e7f774962fe36ba54b8c643471712b484de4fa930900f383b716a5545f"}],["archive__holly_white:tuxedo",{"slot":"special","tag":"ballistic","metadataSHA256":"ca79dfb701f43eefc9dae75b2dcaea1a4de5e55fbf2c4e7ee2365017582da4cf","artAuditSHA256":"bf57d6a3086d59ad472500208aa2eb981ed7ba5646a201ca6e811a01a9a26dfa"}],["roster50__campbell_mgs4:tuxedo",{"slot":"special","tag":"ballistic","metadataSHA256":"c10f08284c3ad13ba31efb95e08d0ae56662970f5fcad7b041bb0b0dafd4d415","artAuditSHA256":"2b75d537a041f97fdc9c08a9444d9811b4b93205d33d96eda1b45b6c27764898"}],["roster50__meiling_mgs4:tuxedo",{"slot":"special","tag":"ballistic","metadataSHA256":"563be286612fc411d8edcb6b876bcc16ff6abc4ac15bee436527e99406e0c470","artAuditSHA256":"85cd030eb8ac1894d2e3b9c49f6b049a655eb8fa5f456feda6b7007493a0a8ae"}]]),states=new WeakMap(),ownedShots=new WeakSet(),same=(a,b)=>JSON.stringify(a)===JSON.stringify(b),finite=Number.isFinite;
  let bridge=null,router=null,live=null,requests=0,emissions=0,draws=0,blocked=0,lastEmission=null;
  const selected=state=>bridge?.selectedLead?.(state?.lead)||state?.lead;
  function configuration(state){const fighter=selected(state),value=scope.get(fighter?.uid+':'+fighter?.costume);if(!value)return null;const descriptor=root.CQC_NATIVE_WARDROBE_INDEX?.entries?.find(d=>d.uid===fighter.uid&&d.id===fighter.costume);if(descriptor?.metadata?.sha256!==value.metadataSHA256||descriptor?.review?.artAuditSHA256!==value.artAuditSHA256)throw Error('P41 Support exact native descriptor changed');return root.CQC_PASS41_NATIVE_ORIGINS?.owns?.({f:fighter})?{fighter,...value}:null;}
  function record(state){let value=states.get(state);if(!value){value={pending:null,attack:null,lastTick:-1};states.set(state,value);}return value;}
  function pose(state,config){return{entityKey:state.hero,time:state.frame/60,moveSlot:config.slot,moveKind:'projectile',moveTag:config.tag,attack:true,animationActive:true,attackPhase:'active',phaseProgress:0,attackTime:0,actionTime:0};}
  function source(state,config){
    const sprites=root.CQC_COMBAT_SPRITES,entry=sprites?.getEntry?.(config.fighter.uid,config.fighter);
    const anchor=root.CQC_PASS41_NATIVE_ORIGINS?.sourcePoint?.(config.fighter.uid,config.fighter.costume,'right',config.slot,config.tag);
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
      if(!at)throw Error('P41 Support native projection is unavailable');
      const shot={x:at.x,y:at.y,vx:17,damage:pending.damage};ownedShots.add(shot);state.shots.push(shot);emissions++;
      lastEmission={uid:pending.config.fighter.uid,costume:pending.config.fighter.costume,frame:state.frame,x:at.x,y:at.y,face:1,vx:17,damage:pending.damage,sourceFile:pending.native.anchor.sourceFile,sourceSHA256:pending.native.anchor.sourceSHA256,sourceNativeXY:[...pending.native.anchor.sourceNativeXY]};
    }
    if(state.hero.cool<=0)value.attack=null;
    return true;
  }
  function hitTest(shot,enemy,operation){
    // Only this adapter's actual projectile objects gain a native target's upright body extent.
    // Existing projectiles and VR targets keep the host's exact historical collision branch.
    if(!ownedShots.has(shot))return null;
    const target=bridge?.resolveEnemy?.(operation,enemy?.kind);
    if(!target?.uid||target.simulation)return null;
    const fighter={uid:target.uid},entry=root.CQC_COMBAT_SPRITES?.getEntry?.(target.uid,fighter);
    const actions=entry?.facing===-1?entry.actions:entry?.oppositeActions;
    const frame=actions?.idle?.frames?.[0],height=entry?.sourceFrameHeights?.[frame?.file]||entry?.baseFrameHeight;
    const ratio=root.CQC_PASS19_WORLD_SCALE?.height?.(fighter,{originalPixels:entry?.displayHeight})?.ratio;
    const factor=entry?.displayHeight/height*ratio*root.CQC_SUPPORT_NATIVE_ACTOR_FACTORY?.SCALE;
    if(!frame||!finite(factor)||factor<=0||!finite(enemy?.x)||!finite(enemy?.y))return null;
    // A stable upright hurt rectangle avoids changing reach with the walk/shoot animation.
    // Its vertical edges follow the native silhouette; this is not per-pixel collision.
    const ys=frame.clipPolygon?.length?frame.clipPolygon.map(p=>p[1]):[0,1];
    if(ys.some(y=>!finite(y)||y<0||y>1))return null;
    const top=enemy.y+(Math.min(...ys)-frame.pivot[1])*frame.rect[3]*factor;
    const bottom=enemy.y+(Math.max(...ys)-frame.pivot[1])*frame.rect[3]*factor;
    return shot.x>enemy.x-35&&shot.x<enemy.x+35&&shot.y>top&&shot.y<bottom;
  }
  function install(){
    const current=root.CQC_SUPPORT_NATIVE_ACTORS;
    if(current?.drawLead&&current!==bridge){
      if(typeof current.leadScale!=='function')throw Error('P41 Support requires the reviewed shared leadScale export');
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
  if(root.CQC_PASS41_SUPPORT_NATIVE_GUNS)throw Error('Duplicate P41 Support gun adapter');
  root.CQC_PASS41_SUPPORT_NATIVE_GUNS=Object.freeze({install,requestShot,update,hitTest,
    diagnostics:()=>({scopeVersion:'pass41-support-native-guns/3',requests,emissions,draws,blocked,lastEmission:lastEmission?{...lastEmission,sourceNativeXY:[...lastEmission.sourceNativeXY]}:null,scope:[...scope.keys()],skullEnabled:false,ammoCost:1,cooldown:10,vx:17})});
  const oldGuns=root.CQC_PASS40_SUPPORT_NATIVE_GUNS;if(!oldGuns?.hitTest)throw Error('Original Support native gun collision interface absent');
  root.CQC_PASS40_SUPPORT_NATIVE_GUNS=Object.freeze({...oldGuns,hitTest:function(){return hitTest.apply(null,arguments)??oldGuns.hitTest.apply(oldGuns,arguments);}});
  install();
})(globalThis);
