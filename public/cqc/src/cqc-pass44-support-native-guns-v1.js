/* P44 exact-key native projectile sources and owned-shot native upright target bounds; review required. */
(function(root){
  'use strict';
  if(typeof root.CQC_PASS44_NATIVE_ORIGINS?.sourcePoint!=='function')throw Error('P44 Support requires the reviewed pure sourcePoint getter');
  const scope=new Map([["core__venom:cyborg",{"slot":"special","tag":"ballistic","metadataSHA256":"c254f71aab7e40b2690fcb032e047b4ff798e6a7af400a5276145fa7744914dd","artAuditSHA256":"f10c8f361c44dff8d1562b0a2fc2a133517baccaf70cdc87aefcba3f5ab684b8","presentation":"pistol-tracer"}],["core__johnny_mgs4:tuxedo",{"slot":"special","tag":"precision","metadataSHA256":"ef9eff2e7761e43e9e50079a287095b3ac3cdbd94f8cb94b91ead6d0ae0198c3","artAuditSHA256":"e85cac69e87ea4ce705cba4f97e699dc7bb9c032e4b3f142d9c4b10c2c281b7f","presentation":"rifle-tracer"}]]),states=new WeakMap(),ownedShots=new WeakMap(),same=(a,b)=>JSON.stringify(a)===JSON.stringify(b),finite=Number.isFinite;
  let bridge=null,router=null,live=null,requests=0,emissions=0,draws=0,blocked=0,lastEmission=null,lastDraw=null;
  const selected=state=>bridge?.selectedLead?.(state?.lead)||state?.lead;
  function configuration(state){const fighter=selected(state),value=scope.get(fighter?.uid+':'+fighter?.costume);if(!value)return null;const descriptor=root.CQC_NATIVE_WARDROBE_INDEX?.entries?.find(d=>d.uid===fighter.uid&&d.id===fighter.costume);if(descriptor?.metadata?.sha256!==value.metadataSHA256||descriptor?.review?.artAuditSHA256!==value.artAuditSHA256)throw Error('P44 Support exact native descriptor changed');return root.CQC_PASS44_NATIVE_ORIGINS?.owns?.({f:fighter})?{fighter,...value}:null;}
  function readyForProjectile(state,config){return projectileArt.state==='native-ready'&&!!projectileAtlases[config.presentation];}
  function record(state){let value=states.get(state);if(!value){value={pending:null,attack:null,lastTick:-1};states.set(state,value);}return value;}
  function pose(state,config){return{entityKey:state.hero,time:state.frame/60,moveSlot:config.slot,moveKind:'projectile',moveTag:config.tag,attack:true,animationActive:true,attackPhase:'active',phaseProgress:0,attackTime:0,actionTime:0};}
  function source(state,config){
    const sprites=root.CQC_COMBAT_SPRITES,entry=sprites?.getEntry?.(config.fighter.uid,config.fighter);
    const anchor=root.CQC_PASS44_NATIVE_ORIGINS?.sourcePoint?.(config.fighter.uid,config.fighter.costume,'right',config.slot,config.tag);
    if(!entry||!anchor||typeof bridge?.leadScale!=='function')return null;
    const actions=entry.facing===1?entry.actions:entry.oppositeActions;
    if(!actions)return null;
    const selectedFrame=sprites.selectFrame({...entry,actions},pose(state,config)),frame=selectedFrame?.frame;
    if(!frame||selectedFrame.action!==anchor.selectedAction||selectedFrame.index!==anchor.selectedFrameIndex||frame.file!==anchor.sourceFile||frame.sha256!==anchor.sourceSHA256||!same(frame.rect,anchor.sourceRect)||!same(frame.pivot,anchor.sourcePivot))return null;
    if(sprites.status(config.fighter.uid,{...config.fighter,face:1,action:selectedFrame.action}).ready!==true)return null;
    return{entry,anchor,selectedFrame};
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

  const projectileAtlases={"pistol-tracer":{"id":"pistol-tracer","file":"assets/vfx-pass18/ballistics-native-pass18.png","sha256":"cb66deec0d4a9e412df551643ddedc00bd3097f741a00e1a98c5872da799a16f","bytes":1520813,"width":1536,"height":1024,"frames":[{"rect":[157,60,62,28],"pivot":[0.5,0.5]},{"rect":[507,59,107,29],"pivot":[0.5,0.5]},{"rect":[883,58,149,31],"pivot":[0.5,0.5]},{"rect":[1266,59,167,30],"pivot":[0.5,0.5]}],"sourceScaleReferenceWidth":167,"displayWidth":44,"poseTicks":4,"grounded":false,"bright":false,"sources":["https://www.konami.com/mg/history/jp/ja/mgs","https://www.konami.com/mg/history/jp/ja/mgs2","https://www.konami.com/mg/history/jp/ja/mgs3","https://www.konami.com/mg/history/jp/ja/mgs4"],"scope":"Physical silhouette/material nearest supported to specified weapon. Generated 2D source, neither original game pixels nor certified 1:1 hardware/pose/timing. Simulation moves remain simulations.","absolute1to1Certified":false},"rifle-tracer":{"id":"rifle-tracer","file":"assets/vfx-pass18/ballistics-native-pass18.png","sha256":"cb66deec0d4a9e412df551643ddedc00bd3097f741a00e1a98c5872da799a16f","bytes":1520813,"width":1536,"height":1024,"frames":[{"rect":[134,176,116,28],"pivot":[0.5,0.5]},{"rect":[476,175,190,30],"pivot":[0.5,0.5]},{"rect":[819,175,282,32],"pivot":[0.5,0.5]},{"rect":[1203,175,294,32],"pivot":[0.5,0.5]}],"sourceScaleReferenceWidth":294,"displayWidth":62,"poseTicks":4,"grounded":false,"bright":false,"sources":["https://www.konami.com/mg/history/jp/ja/mgs","https://www.konami.com/mg/history/jp/ja/mgs2","https://www.konami.com/mg/history/jp/ja/mgs3","https://www.konami.com/mg/history/jp/ja/mgs4"],"scope":"Physical silhouette/material nearest supported to specified weapon. Generated 2D source, neither original game pixels nor certified 1:1 hardware/pose/timing. Simulation moves remain simulations.","absolute1to1Certified":false}},ownScriptURL=root.document?.currentScript?.src;
  const projectileArt={state:'loading',bitmaps:new Map(),error:null,nativeDraws:0,lastDraw:null};
  const nativeArtReady=(async()=>{try{
   if(!ownScriptURL||typeof root.fetch!=='function'||typeof root.createImageBitmap!=='function'||!root.crypto?.subtle)throw Error('Native projectile source APIs unavailable');
   for(const atlas of Object.values(projectileAtlases)){
    const key=atlas.file+':'+atlas.sha256;if(projectileArt.bitmaps.has(key))continue;
    const response=await root.fetch(new URL('../'+atlas.file,ownScriptURL).href,{redirect:'error',cache:'force-cache'});if(!response.ok)throw Error('Native projectile HTTP '+response.status);
    const raw=await response.arrayBuffer();if(raw.byteLength!==atlas.bytes)throw Error('Native projectile byte count changed');const hash=[...new Uint8Array(await root.crypto.subtle.digest('SHA-256',raw))].map(n=>n.toString(16).padStart(2,'0')).join('');if(hash!==atlas.sha256)throw Error('Native projectile SHA changed');
    const bitmap=await root.createImageBitmap(new Blob([raw],{type:'image/png'}));if(bitmap.width!==atlas.width||bitmap.height!==atlas.height){bitmap.close();throw Error('Native projectile dimensions changed');}projectileArt.bitmaps.set(key,bitmap);
   }projectileArt.state='native-ready';return true;
  }catch(error){projectileArt.state='failed';projectileArt.error=String(error);return false;}})();
  function drawShot(context,shot){
    const source=ownedShots.get(shot);if(!source)return false;
    // An owned source never reaches the host's generic white rectangle.
    if(shot.hit||projectileArt.state!=='native-ready')return true;
    const selectedAtlas=projectileAtlases[source.presentation];if(!selectedAtlas)throw Error('P44 native projectile presentation outside exact scope');
    const age=Math.max(0,source.state.frame-source.frame),index=Math.floor(age/selectedAtlas.poseTicks)%selectedAtlas.frames.length;
    const frame=selectedAtlas.frames[index],[x,y,w,h]=frame.rect,k=selectedAtlas.displayWidth/selectedAtlas.sourceScaleReferenceWidth;
    context.save();try{context.imageSmoothingEnabled=false;context.drawImage(projectileArt.bitmaps.get(selectedAtlas.file+':'+selectedAtlas.sha256),x,y,w,h,shot.x-w*frame.pivot[0]*k,shot.y-h*frame.pivot[1]*k,w*k,h*k);}finally{context.restore();}
    projectileArt.nativeDraws++;projectileArt.lastDraw={frame:source.state.frame,index,file:selectedAtlas.file,sha256:selectedAtlas.sha256,sourceRect:[...frame.rect],x:shot.x,y:shot.y,effect:selectedAtlas.id,presentation:source.presentation,sourcePixelsChanged:false};return true;
  }

  function requestShot(state){
    const config=configuration(state);if(!config)return false;
    live=state;const h=state.hero,value=record(state);
    if(!h||h.cool>0||h.ammo<=0)return true;
    requests++;if(!readyForProjectile(state,config)){blocked++;return true;}
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
      if(!at)throw Error('P44 Support native projection is unavailable');
      const shot={x:at.x,y:at.y,vx:17,damage:pending.damage};ownedShots.set(shot,{state,frame:state.frame,presentation:pending.config.presentation});state.shots.push(shot);emissions++;
      lastEmission={uid:pending.config.fighter.uid,costume:pending.config.fighter.costume,frame:state.frame,presentation:pending.config.presentation,x:at.x,y:at.y,face:1,vx:17,damage:pending.damage,sourceFile:pending.native.anchor.sourceFile,sourceSHA256:pending.native.anchor.sourceSHA256,sourceNativeXY:[...pending.native.anchor.sourceNativeXY]};
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
      if(typeof current.leadScale!=='function')throw Error('P44 Support requires the reviewed shared leadScale export');
      bridge=current;const prior=current.drawLead;
      current.drawLead=function(context,fighter,x,y,face,scale,normalPose={}){
        const state=live,config=state&&configuration(state),attack=state&&record(state).attack;
        if(!config||!attack||fighter!==state.lead||context?.canvas?.id!=='gameCanvas'||state.hero.x!==x||state.hero.y!==y||state.hero.life<=0||normalPose.hit&&!attack.firstDraw)return prior.apply(this,arguments);
        // The active muzzle frame faces right because Support retains its right-going shot.
        // Give the first visible discharge priority; subsequent hurt poses keep their old priority.
        const native=source(state,attack.config);if(!native)return false;
        const at=project(state,attack.config,native,context,scale);if(!at)return false;
        const drawn=root.CQC_COMBAT_SPRITES.draw(context,attack.config.fighter,x,y,1,at.adjusted,pose(state,attack.config))===true;
        if(drawn){draws++;attack.firstDraw=false;const f=native.selectedFrame.frame;lastDraw={uid:attack.config.fighter.uid,costume:attack.config.fighter.costume,face:1,frame:state.frame,phase:'active',physicalPoseIndex:f.physicalPoseIndex,sourceFile:f.file,sourceSHA256:f.sha256,sourceRect:[...f.rect],sourcePivot:[...f.pivot]};}return drawn;
      };
    }
    const prior=root.CQC_PASS39_RAPTOR_SUPPORT;
    if(prior&&!router&&typeof prior.requestShot==='function'&&typeof prior.update==='function'){
      router=Object.freeze({...prior,
        requestShot:function(state,keys){return configuration(state)?requestShot(state):prior.requestShot.apply(prior,arguments);},
        update:function(state){return configuration(state)?update(state):prior.update.apply(prior,arguments);},
        drawShot:function(context,shot){return drawShot(context,shot)||prior.drawShot?.apply(prior,arguments)||false;}});
      root.CQC_PASS39_RAPTOR_SUPPORT=router;
    }
    return!!router;
  }
  if(root.CQC_PASS44_SUPPORT_NATIVE_GUNS)throw Error('Duplicate P44 Support gun adapter');
  root.CQC_PASS44_SUPPORT_NATIVE_GUNS=Object.freeze({install,requestShot,update,hitTest,drawShot,whenNativeArtReady:()=>nativeArtReady,
    diagnostics:()=>({scopeVersion:'pass44-support-native-projectiles/5',nativeProjectile:{state:projectileArt.state,error:projectileArt.error,nativeDraws:projectileArt.nativeDraws,lastDraw:projectileArt.lastDraw?{...projectileArt.lastDraw}:null,atlases:Object.values(projectileAtlases).map(a=>({id:a.id,file:a.file,sha256:a.sha256})),whiteRectangleFallback:false},requests,emissions,draws,blocked,lastDraw:lastDraw?{...lastDraw}:null,lastEmission:lastEmission?{...lastEmission,sourceNativeXY:[...lastEmission.sourceNativeXY]}:null,scope:[...scope.keys()],skullEnabled:false,ammoCost:1,cooldown:10,vx:17})});
  const oldGuns=root.CQC_PASS40_SUPPORT_NATIVE_GUNS;if(!oldGuns?.hitTest)throw Error('Original Support native gun collision interface absent');
  root.CQC_PASS40_SUPPORT_NATIVE_GUNS=Object.freeze({...oldGuns,hitTest:function(){return hitTest.apply(null,arguments)??oldGuns.hitTest.apply(oldGuns,arguments);}});
  install();
})(globalThis);
