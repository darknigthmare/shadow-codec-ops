/* Qualified generated native Black Color star, eight unchanged source poses.
 * Three engine ticks per authored pose and display size are Versus adaptations.
 * The four-point Canvas fallback is retained only while native art is unavailable.
 * The historical canvas-only881a4a version remains at its separate old path.
 */
(function(root){'use strict';
  const UID='core__ninja_mg2',copy=v=>JSON.parse(JSON.stringify(v));
  function createRenderer(options={}){
    const atlas=options.catalog||root.CQC_PASS9_PROJECTILE_CATALOG||null,
      ImageType=options.Image||root.Image,
      scriptURL=options.scriptURL||root.document?.currentScript?.src;
    let image=null,status='canvas-adaptation',url=null,nativeDraws=0,fallbackDraws=0;
    const selected=new Set(),recentNativeSelections=[];
    function validAtlas(a){
      if(!a||a.uid!==UID||a.tag!=='shuriken'||a.kind!=='shuriken'||a.poseTicks!==3||a.sourceFidelityStatus!=='closest_supported'||a.absolute1to1Certified!==false||
        typeof a.file!=='string'||!a.file.startsWith('assets/combat-props/core__ninja_mg2/')||a.file.includes('..')||
        !/^[a-f0-9]{64}$/.test(a.sha256)||!Number.isInteger(a.width)||!Number.isInteger(a.height)||a.width<=0||a.height<=0||
        !Array.isArray(a.frames)||a.frames.length!==8||!Number.isFinite(a.displayWidth)||a.displayWidth<=0||a.displayWidth>80||
        !Number.isFinite(a.sourceScaleReferenceWidth)||a.sourceScaleReferenceWidth<=0)return false;
      for(const frame of a.frames){
        if(!Array.isArray(frame.rect)||frame.rect.length!==4||!frame.rect.every(Number.isFinite)||
          !Array.isArray(frame.pivot)||frame.pivot.length!==2||!frame.pivot.every(v=>Number.isFinite(v)&&v>=0&&v<=1))return false;
        const [x,y,w,h]=frame.rect;if(x<0||y<0||w<=0||h<=0||x+w>a.width||y+h>a.height)return false;
      }
      return a.sourceScaleReferenceWidth===Math.max(...a.frames.map(frame=>frame.rect[2]));
    }
    if(atlas){
      if(!validAtlas(atlas))throw Error('Invalid qualified native PASS9 eight-pose star atlas');
      if(typeof ImageType==='function'){
        image=new ImageType();status='loading';
        image.onload=()=>{status=image.naturalWidth===atlas.width&&image.naturalHeight===atlas.height?'native-ready':'invalid-native-dimensions';};
        image.onerror=()=>{status='native-load-failed';};
        url=scriptURL?new URL('../'+atlas.file,scriptURL).href:atlas.file;image.src=url;
      }else status='native-image-unavailable';
    }
    function eligible(q,owner){
      return owner?.f?.uid===UID&&Number.isInteger(q?.owner)&&q.owner===owner.slot&&!q.dead&&!(q.delay>0)&&
        q.kind==='shuriken'&&q.def?.kind==='projectile'&&q.def.tag==='shuriken'&&
        ['special','super'].some(slot=>q.def.id===UID+'::'+slot)&&
        Number.isInteger(q.id)&&q.id>0&&Number.isFinite(q.age)&&q.age>=0&&Number.isFinite(q.x)&&Number.isFinite(q.y);
    }
    function drawProjectile(c,q,zoom=1,owner){
      if(!eligible(q,owner)||!Number.isFinite(zoom)||zoom<=0||zoom>4)return false;
      c.save();
      if(status==='native-ready'){
        const index=Math.floor(q.age/3)%8,frame=atlas.frames[index],[x,y,w,h]=frame.rect,
          scale=atlas.displayWidth/atlas.sourceScaleReferenceWidth*zoom,dw=w*scale,dh=h*scale,dx=-dw*frame.pivot[0],dy=-dh*frame.pivot[1];
        // Source frames already depict rotation; there is no second Canvas spin.
        c.drawImage(image,x,y,w,h,dx,dy,dw,dh);nativeDraws++;selected.add(index);
        recentNativeSelections.push({selection:nativeDraws,projectileId:q.id,burstId:q.burstId,ownerSlot:q.owner,ownerUID:owner.f.uid,age:q.age,
          sourceFrameIndex:index,sourceRect:copy(frame.rect),sourcePivot:copy(frame.pivot),destination:[dx,dy,dw,dh],sourceFile:atlas.file,sourceSHA256:atlas.sha256,nativeURL:url});
        if(recentNativeSelections.length>64)recentNativeSelections.shift();
      }else{
        c.rotate(q.age*.2);const radius=9*zoom,inner=2.2*zoom;c.beginPath();
        for(let i=0;i<8;i++){const angle=i*Math.PI/4-Math.PI/2,r=i%2?inner:radius,x=Math.cos(angle)*r,y=Math.sin(angle)*r;if(i)c.lineTo(x,y);else c.moveTo(x,y);}
        c.closePath();c.fillStyle='#9b9f9a';c.strokeStyle='#28332f';c.lineWidth=1.2*zoom;c.fill();c.stroke();fallbackDraws++;
      }
      c.restore();return true;
    }
    return{drawProjectile,eligible,diagnostics:()=>({status,url,nativeDraws,fallbackDraws,uid:UID,nativeSHA256:atlas?.sha256||null,
      nativeFrameCount:atlas?.frames?.length||0,nativePoseTicks:atlas?.poseTicks||null,nativeSelectedFrames8:[...selected].sort((a,b)=>a-b),recentNativeSelections:copy(recentNativeSelections),
      sourceFidelityStatus:'closest_supported',absolute1to1Certified:false,canvasFallback:'Four-point gray star; shape, display size and rotation are Versus adaptations.'})};
  }
  const api=createRenderer();api.createRenderer=createRenderer;root.CQC_PASS9_PROJECTILE_ART=api;
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
