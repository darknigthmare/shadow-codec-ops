/* Exact reviewed MG2 Miller Gala survival knife presentation. Candidate only.
 * Draw-only hooks retain the profile's ballistic tag, count3, trajectory, collision,
 * clocks, damage and resources. Support's existing single-shot adaptation is unchanged.
 * Unaltered P18 generated knife family; no original retail pixels/1:1 hardware claim.
 */
(function(root){
  'use strict';
  const UID='roster50__miller_mg2',ID='tuxedo',SLOT='specialDown';
  const METADATA='7f38a70fe71dac876545efa7cb9f1ae9af8832ef0f3bf8c42f866cea9e4d2b18';
  const AUDIT='38ed9c9ceec694e83ac7141fe40756dcb20e44654ca145cb78498bcbd3cd6a86';
  const atlas={id:'thrown-knife',file:'assets/vfx-pass18/physical-exotics-native-pass18.png',sha256:'df3f062fd35cc7b69f4e19cc496a1903316227ae2542fa22e5e805e5ae73908e',bytes:2039823,width:1536,height:1024,frames:[{rect:[76,36,304,54],pivot:[.5,.5]},{rect:[455,29,285,71],pivot:[.5,.5]},{rect:[851,22,257,83],pivot:[.5,.5]},{rect:[1203,34,295,52],pivot:[.5,.5]}],sourceScaleReferenceWidth:304,displayWidth:45,poseTicks:4};
  const scriptURL=root.document?.currentScript?.src;
  const art={state:'loading',bitmap:null,error:null,versusDraws:0,supportDraws:0,suppressed:0,muzzleSuppressed:0,lastDraw:null};
  const shots=new WeakMap(),finite=Number.isFinite;
  const exact=f=>f?.uid===UID&&f?.costume===ID;
  const fighterOf=value=>value?.f||value;
  function selected(state){return root.CQC_SUPPORT_NATIVE_ACTORS?.selectedLead?.(state?.lead)||state?.lead;}
  function reviewed(fighter){
    if(!exact(fighter))return false;
    const descriptor=root.CQC_NATIVE_WARDROBE_INDEX?.entries?.find(d=>d.uid===UID&&d.id===ID);
    const entry=root.CQC_COMBAT_SPRITES?.getEntry?.(UID,fighter);
    return descriptor?.metadata?.sha256===METADATA&&descriptor.review?.artAuditSHA256===AUDIT
      &&root.CQC_PASS42_NATIVE_ORIGINS?.owns?.({f:fighter})===true
      &&entry?.uid===UID&&entry.pass40Revision==='native-batch40-v2'
      &&entry.review?.status==='approved'&&entry.review.reviewer?.startsWith('Root')&&entry.review.artAuditSHA256===AUDIT
      &&entry.mirror===false&&entry.fallbackMissingActions===false&&entry.costumeConcept?.family==='tuxedo'
      &&entry.nativeDirectionRegions?.uid===UID&&entry.nativeDirectionRegions.regions?.length===32;
  }
  const ready=(async()=>{
    try{
      if(!scriptURL||!root.fetch||!root.crypto?.subtle||!root.createImageBitmap)throw Error('Native knife source APIs unavailable');
      const response=await root.fetch(new URL('../'+atlas.file,scriptURL).href,{redirect:'error',cache:'force-cache'});
      if(!response.ok)throw Error('Native knife HTTP '+response.status);
      const raw=await response.arrayBuffer();if(raw.byteLength!==atlas.bytes)throw Error('Native knife bytes changed');
      const sha=[...new Uint8Array(await root.crypto.subtle.digest('SHA-256',raw))].map(n=>n.toString(16).padStart(2,'0')).join('');
      if(sha!==atlas.sha256)throw Error('Native knife SHA changed');
      const bitmap=await root.createImageBitmap(new Blob([raw],{type:'image/png'}));
      if(bitmap.width!==atlas.width||bitmap.height!==atlas.height){bitmap.close();throw Error('Native knife dimensions changed');}
      art.bitmap=bitmap;art.state='native-ready';return true;
    }catch(error){art.state='failed';art.error=String(error);return false;}
  })();
  function isKnifeMove(move){return move?.id===UID+'::'+SLOT&&move.kind==='projectile'&&move.tag==='ballistic'&&move.slot===SLOT&&move.count===3;}
  function ownedVersus(q,owner){return exact(owner?.f)&&Number.isInteger(q?.owner)&&q.owner===owner.slot&&isKnifeMove(q.def);}
  function paint(context,x,y,age,scale,angle,mode,extra){
    // Owned pending/failed art is consumed without rifle, muzzle or white-rectangle fallback.
    if(art.state!=='native-ready'){art.suppressed++;return true;}
    if(!context?.drawImage||![x,y,age,scale,angle].every(finite)||scale<=0||scale>6)return false;
    const index=Math.floor(Math.max(0,age)/atlas.poseTicks)%atlas.frames.length;
    const frame=atlas.frames[index],[sx,sy,w,h]=frame.rect,k=atlas.displayWidth/atlas.sourceScaleReferenceWidth*scale;
    context.save();try{context.translate(x,y);context.rotate(angle);context.imageSmoothingEnabled=false;context.drawImage(art.bitmap,sx,sy,w,h,-w*frame.pivot[0]*k,-h*frame.pivot[1]*k,w*k,h*k);}finally{context.restore();}
    if(mode==='versus')art.versusDraws++;else art.supportDraws++;
    art.lastDraw={mode,index,file:atlas.file,sha256:atlas.sha256,sourceRect:[...frame.rect],sourcePivot:[...frame.pivot],destination:[x,y,w*k,h*k],age,angle,sourcePixelsChanged:false,...extra};
    return true;
  }
  function drawVersus(context,q,zoom=1,owner,opts={}){
    if(!ownedVersus(q,owner))return false;
    if(q.dead||q.delay>0||![q.x,q.y,q.age,q.vx,q.vy].every(finite))return true;
    if(!reviewed(owner.f)){art.suppressed++;return true;}
    // Host has already translated to the projectile's rendered world position.
    return paint(context,0,0,q.age,zoom,opts.rotationHandled?0:Math.atan2(q.vy,q.vx),'versus',{projectileID:q.id,burstID:q.burstId,ownerSlot:q.owner,uid:UID,costume:ID,slot:SLOT});
  }
  function readyForSupport(state,slot){return slot===SLOT&&reviewed(selected(state))&&art.state==='native-ready';}
  function markSupportShot(state,shot,slot){
    if(!readyForSupport(state,slot)||!shot||![shot.x,shot.y,shot.vx,state.frame].every(finite)||shot.vx===0)return false;
    shots.set(shot,{state,frame:state.frame,slot});return true;
  }
  function drawSupportShot(context,shot){
    const source=shot&&shots.get(shot);if(!source)return false;
    if(shot.hit||!reviewed(selected(source.state)))return true;
    return paint(context,shot.x,shot.y,Math.max(0,source.state.frame-source.frame),1,Math.atan2(shot.vy||0,shot.vx),'support',{uid:UID,costume:ID,slot:source.slot});
  }
  const vfx=root.CQC_PASS18_VFX;
  if(root.CQC_PASS42_MILLER_GALA_PROJECTILE_VFX)throw Error('Duplicate Miller Gala knife VFX adapter');
  // Support does not load the Versus P18 bridge; its private shot API works independently.
  if(vfx){
    if(!vfx.drawProjectile||!vfx.drawMuzzle||!vfx.whenReady||!vfx.readiness||!vfx.readyFor)throw Error('Incomplete original native VFX API');
  const previous={drawProjectile:vfx.drawProjectile,drawMuzzle:vfx.drawMuzzle,whenReady:vfx.whenReady,readiness:vfx.readiness,readyFor:vfx.readyFor};
  const ownsFighters=values=>(Array.isArray(values)?values:[values]).some(v=>exact(fighterOf(v)));
  vfx.drawProjectile=function(context,q,zoom,owner,opts){return ownedVersus(q,owner)?drawVersus(context,q,zoom,owner,opts):previous.drawProjectile.apply(this,arguments);};
  vfx.drawMuzzle=function(context,actor,move){if(exact(actor?.f)&&isKnifeMove(move)){art.muzzleSuppressed++;return true;}return previous.drawMuzzle.apply(this,arguments);};
  vfx.whenReady=function(fighters,opts){const original=previous.whenReady.apply(this,arguments);return ownsFighters(fighters)?Promise.all([original,ready]).then(r=>r.every(Boolean)):original;};
  vfx.readiness=function(fighters,opts){
    const value=previous.readiness.apply(this,arguments);if(!ownsFighters(fighters))return value;
    const present=value.files?.includes(atlas.file),files=present?value.files:[...(value.files||[]),atlas.file];
    return{...value,ready:value.ready&&art.state==='native-ready',files,atlasCount:files.length,decodedPixelBytes:(value.decodedPixelBytes||0)+(present?0:atlas.width*atlas.height*4),millerGalaKnife:{state:art.state,sha256:atlas.sha256}};
  };
  vfx.readyFor=function(fighters,opts){return ownsFighters(fighters)?vfx.readiness(fighters,opts).ready:previous.readyFor.apply(this,arguments);};
  }
  root.CQC_PASS42_MILLER_GALA_PROJECTILE_VFX=Object.freeze({readyForSupport,markSupportShot,drawSupportShot,whenNativeArtReady:()=>ready,
    diagnostics:()=>({scope:UID+':'+ID,slot:SLOT,effect:'thrown-knife',metadataSHA256:METADATA,artAuditSHA256:AUDIT,nativeArt:{state:art.state,error:art.error,file:atlas.file,sha256:atlas.sha256,versusDraws:art.versusDraws,supportDraws:art.supportDraws,suppressed:art.suppressed,muzzleSuppressed:art.muzzleSuppressed,lastDraw:art.lastDraw?JSON.parse(JSON.stringify(art.lastDraw)):null},sourcePixelsEdited:false,simulationChanged:false,sharedCatalogChanged:false,supportRouterInstalled:false,versusHooksInstalled:!!vfx,qualification:'Unchanged generated native knife family. CQC source scale and four-pose timing are authored presentation; original profile ballistic tag/count3/trajectory/damage stay intact. Support emission stays its separately reviewed single-shot mode adaptation.'})});
})(globalThis);
