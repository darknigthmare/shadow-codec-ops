/* P42 exact-key native projectile sources and owned-shot native upright target bounds; review required. */
(function(root){
  'use strict';
  if(typeof root.CQC_PASS42_NATIVE_ORIGINS?.sourcePoint!=='function')throw Error('P42 Support requires the reviewed pure sourcePoint getter');
  const scope=new Map([["roster50__sigint_mgs3:retro-msx",{"slot":"special","tag":"ballistic","metadataSHA256":"a323a64df4165cf3b3fc6baef39f66ff62aadafe7727eecdcfa117e5e11aaed6","artAuditSHA256":"7d171f245982e8d007cd65bc833fa630e62eb531f1adb72096754a74ff8b38f3","presentation":"pistol-tracer"}],["roster50__meiling_mgs4:retro-msx",{"slot":"special","tag":"ballistic","metadataSHA256":"017406888a75d346086c85d2b8e65bf9bfd304515fda8c5c8164fb92effc3da7","artAuditSHA256":"c3086925e37cd28436648febe6ae1678b10a179a5a43ca6f027e511640f51c87","presentation":"pistol-tracer"}],["roster50__sigint_mgs3:tuxedo",{"slot":"special","tag":"ballistic","metadataSHA256":"830ffcf6c718614ea04e56a0f3cb0fb257c59137f7671dde8f939d7610f5f8f9","artAuditSHA256":"3b565196cb5959ee61b80d91f14484f89445ff305fc4606d07afb2f85aad0c90","presentation":"pistol-tracer"}],["roster50__miller_mg2:tuxedo",{"slot":"specialDown","tag":"ballistic","metadataSHA256":"7f38a70fe71dac876545efa7cb9f1ae9af8832ef0f3bf8c42f866cea9e4d2b18","artAuditSHA256":"38ed9c9ceec694e83ac7141fe40756dcb20e44654ca145cb78498bcbd3cd6a86","presentation":"miller-gala-knife"}],["roster50__zero_mgs3:retro-msx",{"slot":"special","tag":"ballistic","metadataSHA256":"83e428e2846dbede785496581035d578cc74eceaa84e698b232a855974b27dba","artAuditSHA256":"baf1b0f9b6edbd40ea94603e601a7c30fdeac6b13203f1ef5658d7b2a097438d","presentation":"pistol-tracer"}],["roster50__zero_mgs3:tuxedo",{"slot":"special","tag":"ballistic","metadataSHA256":"b62fe48320983c8eb1420b50969018cdf855747ce15e18c1f6de9918dad27c15","artAuditSHA256":"7eb0bdb979f68efa41ea55c28d5d45f91cec770d732a197606ade414809ce29c","presentation":"pistol-tracer"}],["roster50__campbell_mgs4:retro-msx",{"slot":"special","tag":"ballistic","metadataSHA256":"bfe92b59ed276850d24bcba309568360bafcec4fc7c500091d082cf13c5e9617","artAuditSHA256":"db34932b82adb8f2fc2609573de8b639e465145a157185e6466618caec6376bd","presentation":"pistol-tracer"}],["roster50__ames_mgs2:tuxedo",{"slot":"special","tag":"ballistic","metadataSHA256":"3d97bf75b8b0ef79761c14e535727f5893501dcce4012ad68c754daa8540b92f","artAuditSHA256":"ef7225928b695553f71514a5eafacea19b66d7ddbe6eaddba602d0a54cdfd2ee","presentation":"pistol-tracer"}],["roster51__galvez_pw:tuxedo",{"slot":"special","tag":"ballistic","metadataSHA256":"5101270d2013515831da36b6727142095ca56b2eeca4842359ff2a969acfa77d","artAuditSHA256":"93151b1a1ff0e60a70db8642bd9688881e99b0775ce9eadce144c7eb32a45e32","presentation":"prosthetic-ballistic-tracer"}],["core__snake:mgs3-camo-leaf",{"slot":"special","tag":"tranq","metadataSHA256":"f965d131845191c88158f373c48530ea44e83d71e7047035e5e072730419e2cb","artAuditSHA256":"00c43d7897c1c829ab56aa31253a6be54699329adc21ba5289ca554d5f002192","presentation":"tranquilizer-dart"}],["core__snake:mgs3-camo-splitter",{"slot":"special","tag":"tranq","metadataSHA256":"1c18c01dea60dfcb8692995ea3dadb666740ae873ed62243037ff310f675e16d","artAuditSHA256":"f48d750655fd057d26b2dbc6837c3abd86ef8f5c9bdc754603dede58889f8f6b","presentation":"tranquilizer-dart"}],["core__snake:mgs3-camo-black",{"slot":"special","tag":"tranq","metadataSHA256":"0b33da465687e623f50a227f106c4da6680141a272f23b5c37dc36f83fcba4fb","artAuditSHA256":"1fff52c3e63809c3e58f7e48a40af02d9f22f3cac4793f3f9ec7473f43c4073c","presentation":"tranquilizer-dart"}],["core__snake:mgs3-camo-squares",{"slot":"special","tag":"tranq","metadataSHA256":"3ace83f23bb6ed4df285d1a48a5154461cf7242facbc323d8ee2c3f85685133e","artAuditSHA256":"756d23bb0dd670f8495b2068846aa7e64c78c9bc69e37e95629b16406ea7ee7f","presentation":"tranquilizer-dart"}],["core__snake:mgs3-camo-water",{"slot":"special","tag":"tranq","metadataSHA256":"a680b6a6eff12af25899f6b72f81d53ab38b0a2a12acc2658a08806697c3e799","artAuditSHA256":"98dc9c1e1cdc7a6edd619359e6b0b68ef2c7f8fb98331472b582083c150e1c68","presentation":"tranquilizer-dart"}],["core__snake:mgs3-camo-desert-tiger",{"slot":"special","tag":"tranq","metadataSHA256":"bb26c6599013fc856f9dc2cbe716e9faa11dc9fa13a120eda1e42d11223ae639","artAuditSHA256":"793b60c198faa59a18ce70e0d8fa008623843deda4cf52dc1695568f11cc6038","presentation":"tranquilizer-dart"}],["core__snake:mgs3-camo-chocolate-chip",{"slot":"special","tag":"tranq","metadataSHA256":"d2a3cb49b17829fe013ee1c871368583520b6adcd074da7a27a79a4e9772e0a7","artAuditSHA256":"db3280d0ec7b2b60e4bb488f72b2cdd0ddeb382e5734b4f8b2c5dc8da5560787","presentation":"tranquilizer-dart"}],["core__snake:mgs3-camo-raindrop",{"slot":"special","tag":"tranq","metadataSHA256":"13449f87a430ac59738f6b8b2b39b2751a63ea744c72f2004c24f7010adb315d","artAuditSHA256":"3272b752f888028fbc3d01e78bca5c993be28ea1c82d3f8d8553b2d2201e99f7","presentation":"tranquilizer-dart"}],["core__snake:mgs3-camo-tree-bark",{"slot":"special","tag":"tranq","metadataSHA256":"183e8c2b193cb762f4be2d57ff7a66ef8fe734aeb7da2bd13c38be4914afd72a","artAuditSHA256":"5e23118f52b491b8c61458b5790ff56e06e9c956125735041b85df8b0038f5fa","presentation":"tranquilizer-dart"}]]),states=new WeakMap(),ownedShots=new WeakMap(),same=(a,b)=>JSON.stringify(a)===JSON.stringify(b),finite=Number.isFinite;
  let bridge=null,router=null,live=null,requests=0,emissions=0,draws=0,blocked=0,lastEmission=null;
  const selected=state=>bridge?.selectedLead?.(state?.lead)||state?.lead;
  function configuration(state){const fighter=selected(state),value=scope.get(fighter?.uid+':'+fighter?.costume);if(!value)return null;const descriptor=root.CQC_NATIVE_WARDROBE_INDEX?.entries?.find(d=>d.uid===fighter.uid&&d.id===fighter.costume);if(descriptor?.metadata?.sha256!==value.metadataSHA256||descriptor?.review?.artAuditSHA256!==value.artAuditSHA256)throw Error('P42 Support exact native descriptor changed');return root.CQC_PASS42_NATIVE_ORIGINS?.owns?.({f:fighter})?{fighter,...value}:null;}
  const knifeAPI=()=>root.CQC_PASS42_MILLER_GALA_PROJECTILE_VFX;
  if(!knifeAPI()?.readyForSupport||!knifeAPI()?.markSupportShot||!knifeAPI()?.drawSupportShot||!knifeAPI()?.whenNativeArtReady)throw Error('Reviewed Miller knife API must load before Support projectile adapter');
  const isKnife=config=>config.presentation==='miller-gala-knife';
  function readyForProjectile(state,config){return isKnife(config)?knifeAPI()?.readyForSupport?.(state,config.slot)===true:projectileArt.state==='native-ready';}
  function record(state){let value=states.get(state);if(!value){value={pending:null,attack:null,lastTick:-1};states.set(state,value);}return value;}
  function pose(state,config){return{entityKey:state.hero,time:state.frame/60,moveSlot:config.slot,moveKind:'projectile',moveTag:config.tag,attack:true,animationActive:true,attackPhase:'active',phaseProgress:0,attackTime:0,actionTime:0};}
  function source(state,config){
    const sprites=root.CQC_COMBAT_SPRITES,entry=sprites?.getEntry?.(config.fighter.uid,config.fighter);
    const anchor=root.CQC_PASS42_NATIVE_ORIGINS?.sourcePoint?.(config.fighter.uid,config.fighter.costume,'right',config.slot,config.tag);
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

  // Finite pistol and concealed-prosthesis ballistic options use native tracers; Snake uses native darts and Miller its separate knife API.
  // Loading and drawing are private to P42; existing shot objects always delegate.
  const projectileAtlas={"id":"pistol-tracer","file":"assets/vfx-pass18/ballistics-native-pass18.png","sha256":"cb66deec0d4a9e412df551643ddedc00bd3097f741a00e1a98c5872da799a16f","bytes":1520813,"width":1536,"height":1024,"frames":[{"rect":[157,60,62,28],"pivot":[0.5,0.5]},{"rect":[507,59,107,29],"pivot":[0.5,0.5]},{"rect":[883,58,149,31],"pivot":[0.5,0.5]},{"rect":[1266,59,167,30],"pivot":[0.5,0.5]}],"sourceScaleReferenceWidth":167,"displayWidth":44,"poseTicks":4,"grounded":false,"bright":false,"sources":["https://www.konami.com/mg/history/jp/ja/mgs","https://www.konami.com/mg/history/jp/ja/mgs2","https://www.konami.com/mg/history/jp/ja/mgs3","https://www.konami.com/mg/history/jp/ja/mgs4"],"scope":"Physical silhouette/material nearest supported to specified weapon. Generated 2D source, neither original game pixels nor certified 1:1 hardware/pose/timing. Simulation moves remain simulations.","absolute1to1Certified":false},ownScriptURL=root.document?.currentScript?.src;
  const projectileArt={state:'loading',bitmap:null,error:null,nativeDraws:0,lastDraw:null};
  const nativeArtReady=(async()=>{
    try{
      if(!ownScriptURL||typeof root.fetch!=='function'||typeof root.createImageBitmap!=='function'||!root.crypto?.subtle)throw Error('Native projectile source APIs unavailable');
      const url=new URL('../'+projectileAtlas.file,ownScriptURL).href;
      const response=await root.fetch(url,{redirect:'error',cache:'force-cache'});if(!response.ok)throw Error('Native projectile HTTP '+response.status);
      const raw=await response.arrayBuffer();if(raw.byteLength!==projectileAtlas.bytes)throw Error('Native projectile byte count changed');
      const hash=[...new Uint8Array(await root.crypto.subtle.digest('SHA-256',raw))].map(n=>n.toString(16).padStart(2,'0')).join('');if(hash!==projectileAtlas.sha256)throw Error('Native projectile SHA changed');
      const bitmap=await root.createImageBitmap(new Blob([raw],{type:'image/png'}));if(bitmap.width!==projectileAtlas.width||bitmap.height!==projectileAtlas.height){bitmap.close();throw Error('Native projectile dimensions changed');}
      projectileArt.bitmap=bitmap;projectileArt.state='native-ready';return true;
    }catch(error){projectileArt.state='failed';projectileArt.error=String(error);return false;}
  })();
  const tranquilizerDart={"id":"tranquilizer-dart","file":"assets/vfx-pass18/ballistics-native-pass18.png","sha256":"cb66deec0d4a9e412df551643ddedc00bd3097f741a00e1a98c5872da799a16f","bytes":1520813,"width":1536,"height":1024,"frames":[{"rect":[145,410,104,37],"pivot":[0.5,0.5]},{"rect":[509,410,128,102],"pivot":[0.5,0.5]},{"rect":[878,409,145,103],"pivot":[0.5,0.5]},{"rect":[1244,409,166,103],"pivot":[0.5,0.5]}],"sourceScaleReferenceWidth":166,"displayWidth":23,"poseTicks":4,"absolute1to1Certified":false};
  function drawShot(context,shot){
    const source=ownedShots.get(shot);if(!source)return false;
    // An owned source never reaches the host's generic white rectangle.
    if(source.presentation==='miller-gala-knife'){knifeAPI()?.drawSupportShot?.(context,shot);return true;}
    if(shot.hit||projectileArt.state!=='native-ready')return true;
    const selectedAtlas=source.presentation==='tranquilizer-dart'?tranquilizerDart:projectileAtlas;
    const age=Math.max(0,source.state.frame-source.frame),index=Math.floor(age/selectedAtlas.poseTicks)%selectedAtlas.frames.length;
    const frame=selectedAtlas.frames[index],[x,y,w,h]=frame.rect,k=selectedAtlas.displayWidth/selectedAtlas.sourceScaleReferenceWidth;
    context.save();try{context.imageSmoothingEnabled=false;context.drawImage(projectileArt.bitmap,x,y,w,h,shot.x-w*frame.pivot[0]*k,shot.y-h*frame.pivot[1]*k,w*k,h*k);}finally{context.restore();}
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
      if(!at)throw Error('P42 Support native projection is unavailable');
      const shot={x:at.x,y:at.y,vx:17,damage:pending.damage};if(isKnife(pending.config)&&knifeAPI()?.markSupportShot?.(state,shot,pending.config.slot)!==true)throw Error('Reviewed Miller knife source is unavailable at emission');ownedShots.set(shot,{state,frame:state.frame,presentation:pending.config.presentation});state.shots.push(shot);emissions++;
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
      if(typeof current.leadScale!=='function')throw Error('P42 Support requires the reviewed shared leadScale export');
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
        update:function(state){return configuration(state)?update(state):prior.update.apply(prior,arguments);},
        drawShot:function(context,shot){return drawShot(context,shot)||prior.drawShot?.apply(prior,arguments)||false;}});
      root.CQC_PASS39_RAPTOR_SUPPORT=router;
    }
    return!!router;
  }
  if(root.CQC_PASS42_SUPPORT_NATIVE_GUNS)throw Error('Duplicate P42 Support gun adapter');
  root.CQC_PASS42_SUPPORT_NATIVE_GUNS=Object.freeze({install,requestShot,update,hitTest,drawShot,whenNativeArtReady:()=>Promise.all([nativeArtReady,knifeAPI().whenNativeArtReady()]).then(values=>values.every(Boolean)),
    diagnostics:()=>({scopeVersion:'pass42-support-native-projectiles/5',knifeProjectile:knifeAPI()?.diagnostics?.()||null,nativeProjectile:{state:projectileArt.state,error:projectileArt.error,nativeDraws:projectileArt.nativeDraws,lastDraw:projectileArt.lastDraw?{...projectileArt.lastDraw}:null,file:projectileAtlas.file,sha256:projectileAtlas.sha256,whiteRectangleFallback:false},requests,emissions,draws,blocked,lastEmission:lastEmission?{...lastEmission,sourceNativeXY:[...lastEmission.sourceNativeXY]}:null,scope:[...scope.keys()],skullEnabled:false,ammoCost:1,cooldown:10,vx:17})});
  const oldGuns=root.CQC_PASS40_SUPPORT_NATIVE_GUNS;if(!oldGuns?.hitTest)throw Error('Original Support native gun collision interface absent');
  root.CQC_PASS40_SUPPORT_NATIVE_GUNS=Object.freeze({...oldGuns,hitTest:function(){return hitTest.apply(null,arguments)??oldGuns.hitTest.apply(oldGuns,arguments);}});
  install();
})(globalThis);
