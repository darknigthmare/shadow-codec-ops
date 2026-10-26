/* P43 exact-key native projectile sources and owned-shot native upright target bounds; review required. */
(function(root){
  'use strict';
  if(typeof root.CQC_PASS43_NATIVE_ORIGINS?.sourcePoint!=='function')throw Error('P43 Support requires the reviewed pure sourcePoint getter');
  const scope=new Map([["core__snake:mgs3-camo-hornet-stripe",{"slot":"special","tag":"tranq","metadataSHA256":"8a65ff3b9bf76eefbb361c8eafe110b4efa773de461ae9867f3eaeb62164a727","artAuditSHA256":"15ecb03bd8baef07e1838eddebdedfcb74b33e52f5920e21cf821cd504ae8a44","presentation":"tranquilizer-dart"}],["core__snake:mgs3-camo-spider",{"slot":"special","tag":"tranq","metadataSHA256":"e0407436c5f3d5c4afa3978a28fbf344721a4893eb0bde900870cfeccf336128","artAuditSHA256":"a12a2d0df396c4554ce58011b66b0bef64cdc8a949cc8e53c6fc0dd2c295a200","presentation":"tranquilizer-dart"}],["core__snake:mgs3-camo-moss",{"slot":"special","tag":"tranq","metadataSHA256":"ded1f7aa9634d4d1d7d98479576a84d24dcd0ce57fd1dd20d5199a63f9b87282","artAuditSHA256":"e2ebbb0ab6054c16dc87ccaad81c56cbf93153ef76488465ade62cf152fb83bb","presentation":"tranquilizer-dart"}],["core__snake:mgs3-camo-fire",{"slot":"special","tag":"tranq","metadataSHA256":"7a4d74394b314831a64c9cfb10deaed3dd743930b557d210bf7abf00a2a0624b","artAuditSHA256":"ae9878f5cde2f6ffb3cc491b789443ee865076ea5e5cd386693368fb64787b29","presentation":"tranquilizer-dart"}],["core__snake:mgs3-camo-spirit",{"slot":"special","tag":"tranq","metadataSHA256":"cce6f80759890cd1bf205f515440cedd07446760dba36b097ee311af8bd071da","artAuditSHA256":"5a8012441bce13025a5f65a6d66ba6a6e4958023844b882724076b6e6abc098f","presentation":"tranquilizer-dart"}],["core__snake:mgs3-camo-cold-war",{"slot":"special","tag":"tranq","metadataSHA256":"2329d23b3b168a310f5cee16004e80f6d0a006de04cbb9f33d4ed3ae297bd2ec","artAuditSHA256":"18407f74a3166182e0dfee91e1318b6bfd8689fe7536d1db2fdafef23960f800","presentation":"tranquilizer-dart"}],["core__snake:mgs3-camo-snake",{"slot":"special","tag":"tranq","metadataSHA256":"e818f3542f4a4bd25f9ad6dc15a64250fb344217c4e11bb03ff943da1d9693ba","artAuditSHA256":"1d8f999092631e5771d508fa5f90f72e8ba9670b36ff611ee2d968a69add5eb1","presentation":"tranquilizer-dart"}],["core__snake:mgs3-camo-flecktarn",{"slot":"special","tag":"tranq","metadataSHA256":"8e5b06098dcea45b4d9027436c61150439e5faf1ce0a34f3c199e3f4a936202b","artAuditSHA256":"2a262e2adfd5bd7dc0c064dcda588da51241087af61ef3bef158b3832e988c34","presentation":"tranquilizer-dart"}],["core__snake:mgs3-camo-auscam",{"slot":"special","tag":"tranq","metadataSHA256":"06913619c7fe4170246a537d0339e1fd48dfe70242558c2ef28ca4369567fa88","artAuditSHA256":"ab558eea1f2bd2efd55ef3138767cb834da96baa538d11d7bc9e9946e99ca910","presentation":"tranquilizer-dart"}],["core__raiden_mgs2:mgs2-sunglasses-bonus",{"slot":"special","tag":"ballistic","metadataSHA256":"aec6f317470dbc92a95b80cc0d2e97a8585f918b74e175cb4c319eb6592d1d79","artAuditSHA256":"84ca7af42ddbed8a79f1ad33ac2ecbd36cbc56a23184c2c0c847338c077d94e6","presentation":"pistol-tracer"}],["core__venom:mgsv-naked-fatigues",{"slot":"special","tag":"ballistic","metadataSHA256":"c853be6a7ca40ac60862d0d519e5e892629d3a9d9d0e6b152a177342774cba61","artAuditSHA256":"5172112a3f7feb411053bab3b8009133b8ebfcb707dd5ba97f4bfbd6940e0ad8","presentation":"pistol-tracer"}],["core__mantis:mgs1-unmasked",{"slot":"special","tag":"psychic","metadataSHA256":"6142e2c4052ff9cd22f019f2d56e5a4365e05571a5f23469d42b0478ee2b96be","artAuditSHA256":"c5d2640971dd5d1b213bbd35c9bf8031b6f3568ef7ccab787282ad0ee87a9302","presentation":"telekinetic-fragment"}],["core__venom:mgsv-cyborg-ninja",{"slot":"special","tag":"ballistic","metadataSHA256":"537ea96ea89f9d03d9a8079e89b3b4e56d8e34f109294916582a9a4b5b8801b9","artAuditSHA256":"d1ca4b76eb32509410a729f2fc5401b4ee9f0e74c313d7159fde56a521655ee3","presentation":"pistol-tracer"}],["core__venom:mgsv-raiden",{"slot":"special","tag":"ballistic","metadataSHA256":"96f1e32b7101c93ad9eeff28aff3df5de432faeca425965576fb1b40222f4902","artAuditSHA256":"a4b13cd2d96d66bf84080f0eb2eb4c3afc7d2323dff8bc63dd6a36186c361a79","presentation":"pistol-tracer"}],["core__venom:mgsv-solid-snake-1998",{"slot":"special","tag":"ballistic","metadataSHA256":"c8b42374073b6882c7bc22c3c0ba7e7f07e4ee1a8158134c7694306135d062ca","artAuditSHA256":"d53d3deb3ab4010f2990d4201e5817b3aa29e0cabf934e183d2fe17550c23e4d","presentation":"pistol-tracer"}],["core__venom:mgsv-naked-gold-arm",{"slot":"special","tag":"ballistic","metadataSHA256":"93d2a85d95c2259c8950a2b64834b3a429afc0de62c12b9442e7f09436ff2660","artAuditSHA256":"908d200edbc76f5bb2ebea10d0ba1b3526c8ca7b063122c07fcb84436585e25f","presentation":"pistol-tracer"}],["core__snake_pw:pw-battle-dress-helmet",{"slot":"special","tag":"ballistic","metadataSHA256":"5ab23050ded182d5968fad7a2255f1a42ad47478b7ea8943ef6da6bc7da9605a","artAuditSHA256":"dd309b05af952c5e634e333145327ee1ffcea04d9f97e048df7475ba4404657b","presentation":"rifle-tracer"}],["core__snake_pw:pw-jungle-fatigues-pink",{"slot":"special","tag":"ballistic","metadataSHA256":"a227313f75a96e8cec4aac84f9124aeaad444169e8bfb10def505547521e64ed","artAuditSHA256":"c9a900103ad2399b317b2f9b2cecb2e02f4c8bea2658d38c8459164b69281475","presentation":"rifle-tracer"}],["core__snake_pw:pw-ut-n425g-white",{"slot":"special","tag":"ballistic","metadataSHA256":"d6ea4616fed3c94f82304d8e47017c0dddc6eb116f20022acc0e6c4bf5ba665d","artAuditSHA256":"d5d27cae867e5f4a1160e668739ee454dbe422e3b67128761f0e1caf393a5b21","presentation":"rifle-tracer"}],["core__solid:mgs1-shirtless",{"slot":"special","tag":"ballistic","metadataSHA256":"ec8051d0af159d640766d87f9877526d461ce15e02f3a8b2eaf868f71a49c7a8","artAuditSHA256":"354f17ddd172409f6f122e582d863a2ef2f64ab121c3e5c3ad5528f76c5dbe84","presentation":"pistol-tracer"}]]),states=new WeakMap(),ownedShots=new WeakMap(),same=(a,b)=>JSON.stringify(a)===JSON.stringify(b),finite=Number.isFinite;
  let bridge=null,router=null,live=null,requests=0,emissions=0,draws=0,blocked=0,lastEmission=null,lastDraw=null;
  const selected=state=>bridge?.selectedLead?.(state?.lead)||state?.lead;
  function configuration(state){const fighter=selected(state),value=scope.get(fighter?.uid+':'+fighter?.costume);if(!value)return null;const descriptor=root.CQC_NATIVE_WARDROBE_INDEX?.entries?.find(d=>d.uid===fighter.uid&&d.id===fighter.costume);if(descriptor?.metadata?.sha256!==value.metadataSHA256||descriptor?.review?.artAuditSHA256!==value.artAuditSHA256)throw Error('P43 Support exact native descriptor changed');return root.CQC_PASS43_NATIVE_ORIGINS?.owns?.({f:fighter})?{fighter,...value}:null;}
  function readyForProjectile(state,config){return projectileArt.state==='native-ready'&&!!projectileAtlases[config.presentation];}
  function record(state){let value=states.get(state);if(!value){value={pending:null,attack:null,lastTick:-1};states.set(state,value);}return value;}
  function pose(state,config){return{entityKey:state.hero,time:state.frame/60,moveSlot:config.slot,moveKind:'projectile',moveTag:config.tag,attack:true,animationActive:true,attackPhase:'active',phaseProgress:0,attackTime:0,actionTime:0};}
  function source(state,config){
    const sprites=root.CQC_COMBAT_SPRITES,entry=sprites?.getEntry?.(config.fighter.uid,config.fighter);
    const anchor=root.CQC_PASS43_NATIVE_ORIGINS?.sourcePoint?.(config.fighter.uid,config.fighter.costume,'right',config.slot,config.tag);
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

  const projectileAtlases={"tranquilizer-dart":{"id":"tranquilizer-dart","file":"assets/vfx-pass18/ballistics-native-pass18.png","sha256":"cb66deec0d4a9e412df551643ddedc00bd3097f741a00e1a98c5872da799a16f","bytes":1520813,"width":1536,"height":1024,"frames":[{"rect":[145,410,104,37],"pivot":[0.5,0.5]},{"rect":[509,410,128,102],"pivot":[0.5,0.5]},{"rect":[878,409,145,103],"pivot":[0.5,0.5]},{"rect":[1244,409,166,103],"pivot":[0.5,0.5]}],"sourceScaleReferenceWidth":166,"displayWidth":23,"poseTicks":4,"grounded":false,"bright":false,"sources":["https://www.konami.com/mg/history/jp/ja/mgs","https://www.konami.com/mg/history/jp/ja/mgs2","https://www.konami.com/mg/history/jp/ja/mgs3","https://www.konami.com/mg/history/jp/ja/mgs4"],"scope":"Physical silhouette/material nearest supported to specified weapon. Generated 2D source, neither original game pixels nor certified 1:1 hardware/pose/timing. Simulation moves remain simulations.","absolute1to1Certified":false},"pistol-tracer":{"id":"pistol-tracer","file":"assets/vfx-pass18/ballistics-native-pass18.png","sha256":"cb66deec0d4a9e412df551643ddedc00bd3097f741a00e1a98c5872da799a16f","bytes":1520813,"width":1536,"height":1024,"frames":[{"rect":[157,60,62,28],"pivot":[0.5,0.5]},{"rect":[507,59,107,29],"pivot":[0.5,0.5]},{"rect":[883,58,149,31],"pivot":[0.5,0.5]},{"rect":[1266,59,167,30],"pivot":[0.5,0.5]}],"sourceScaleReferenceWidth":167,"displayWidth":44,"poseTicks":4,"grounded":false,"bright":false,"sources":["https://www.konami.com/mg/history/jp/ja/mgs","https://www.konami.com/mg/history/jp/ja/mgs2","https://www.konami.com/mg/history/jp/ja/mgs3","https://www.konami.com/mg/history/jp/ja/mgs4"],"scope":"Physical silhouette/material nearest supported to specified weapon. Generated 2D source, neither original game pixels nor certified 1:1 hardware/pose/timing. Simulation moves remain simulations.","absolute1to1Certified":false},"telekinetic-fragment":{"id":"telekinetic-fragment","file":"assets/vfx-pass18/special-material-native-pass18.png","sha256":"061071f020ef949f4e42a7e9c4162b7a5ca9befb676d090b599258c4e1073915","bytes":2305204,"width":1536,"height":1024,"frames":[{"rect":[113,128,191,128],"pivot":[0.5,0.5]},{"rect":[493,128,184,128],"pivot":[0.5,0.5]},{"rect":[868,129,151,125],"pivot":[0.5,0.5]},{"rect":[1223,129,148,126],"pivot":[0.5,0.5]}],"sourceScaleReferenceWidth":191,"displayWidth":46,"poseTicks":4,"grounded":false,"bright":false,"sources":["https://www.konami.com/mg/history/jp/ja/mgs","https://www.konami.com/mg/history/jp/ja/mgs2","https://www.konami.com/mg/history/jp/ja/mgs3","https://www.konami.com/mg/history/jp/ja/mgs4","https://metalgear.fandom.com/wiki/Screaming_Mantis"],"scope":"Physical silhouette/material nearest supported to specified weapon. Generated 2D source, neither original game pixels nor certified 1:1 hardware/pose/timing. Simulation moves remain simulations.","absolute1to1Certified":false},"rifle-tracer":{"id":"rifle-tracer","file":"assets/vfx-pass18/ballistics-native-pass18.png","sha256":"cb66deec0d4a9e412df551643ddedc00bd3097f741a00e1a98c5872da799a16f","bytes":1520813,"width":1536,"height":1024,"frames":[{"rect":[134,176,116,28],"pivot":[0.5,0.5]},{"rect":[476,175,190,30],"pivot":[0.5,0.5]},{"rect":[819,175,282,32],"pivot":[0.5,0.5]},{"rect":[1203,175,294,32],"pivot":[0.5,0.5]}],"sourceScaleReferenceWidth":294,"displayWidth":62,"poseTicks":4,"grounded":false,"bright":false,"sources":["https://www.konami.com/mg/history/jp/ja/mgs","https://www.konami.com/mg/history/jp/ja/mgs2","https://www.konami.com/mg/history/jp/ja/mgs3","https://www.konami.com/mg/history/jp/ja/mgs4"],"scope":"Physical silhouette/material nearest supported to specified weapon. Generated 2D source, neither original game pixels nor certified 1:1 hardware/pose/timing. Simulation moves remain simulations.","absolute1to1Certified":false}},ownScriptURL=root.document?.currentScript?.src;
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
    const selectedAtlas=projectileAtlases[source.presentation];if(!selectedAtlas)throw Error('P43 native projectile presentation outside exact scope');
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
      if(!at)throw Error('P43 Support native projection is unavailable');
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
      if(typeof current.leadScale!=='function')throw Error('P43 Support requires the reviewed shared leadScale export');
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
  if(root.CQC_PASS43_SUPPORT_NATIVE_GUNS)throw Error('Duplicate P43 Support gun adapter');
  root.CQC_PASS43_SUPPORT_NATIVE_GUNS=Object.freeze({install,requestShot,update,hitTest,drawShot,whenNativeArtReady:()=>nativeArtReady,
    diagnostics:()=>({scopeVersion:'pass43-support-native-projectiles/5',nativeProjectile:{state:projectileArt.state,error:projectileArt.error,nativeDraws:projectileArt.nativeDraws,lastDraw:projectileArt.lastDraw?{...projectileArt.lastDraw}:null,atlases:Object.values(projectileAtlases).map(a=>({id:a.id,file:a.file,sha256:a.sha256})),whiteRectangleFallback:false},requests,emissions,draws,blocked,lastDraw:lastDraw?{...lastDraw}:null,lastEmission:lastEmission?{...lastEmission,sourceNativeXY:[...lastEmission.sourceNativeXY]}:null,scope:[...scope.keys()],skullEnabled:false,ammoCost:1,cooldown:10,vx:17})});
  const oldGuns=root.CQC_PASS40_SUPPORT_NATIVE_GUNS;if(!oldGuns?.hitTest)throw Error('Original Support native gun collision interface absent');
  root.CQC_PASS40_SUPPORT_NATIVE_GUNS=Object.freeze({...oldGuns,hitTest:function(){return hitTest.apply(null,arguments)??oldGuns.hitTest.apply(oldGuns,arguments);}});
  install();
})(globalThis);
