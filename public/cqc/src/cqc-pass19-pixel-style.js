/* Optional original pixel presentation, never claimed to be an official retro extraction. */
(function(root,factory){'use strict';const api=factory(root);if(typeof module==='object'&&module.exports)module.exports=api;root.CQC_PASS19_PIXEL_STYLE=api;})(globalThis,function(root){
 'use strict';
 const canvases=new Map(),entryIDs=new WeakMap(),limit=64;let sequence=0;
 function validate(entry){const style=entry?.pixelArt;return !style||style.schema==='cqc.pixel-presentation/1'&&style.originalPresentation===true&&Number.isInteger(style.maxHeight)&&style.maxHeight>=24&&style.maxHeight<=128;}
 function drawSource(context,args){
  const {entry,frame,image,factor,resolveSource}=args;if(!entry?.pixelArt||!validate(entry))return false;
  const srcW=frame.rect[2],srcH=frame.rect[3],ratio=Math.min(1,entry.pixelArt.maxHeight/(entry.sourceFrameHeights?.[frame.file]||entry.baseFrameHeight||srcH));
  const width=Math.max(1,Math.round(srcW*ratio)),height=Math.max(1,Math.round(srcH*ratio));
  if(!entryIDs.has(entry))entryIDs.set(entry,++sequence);
  const key=entryIDs.get(entry)+':'+entry.uid+':'+entry.costumeConcept?.family+':'+frame.file+'#'+frame.rect.join(',')+':'+entry.pixelArt.maxHeight;
  let canvas=canvases.get(key);
  if(!canvas){canvas=root.document?.createElement?.('canvas')||(typeof root.OffscreenCanvas==='function'?new root.OffscreenCanvas(width,height):null);if(!canvas)return false;canvas.width=width;canvas.height=height;const pixelContext=canvas.getContext('2d');if(!pixelContext)return false;
   pixelContext.imageSmoothingEnabled=true;pixelContext.translate(frame.pivot[0]*width,frame.pivot[1]*height);pixelContext.scale(width/srcW,height/srcH);
   if(!root.CQC_PASS19_COSTUME_PARTS?.drawSourceParts(pixelContext,{...args,factor:1,resolveSource}))pixelContext.drawImage(image,...frame.rect,-srcW*frame.pivot[0],-srcH*frame.pivot[1],srcW,srcH);
   canvases.set(key,canvas);while(canvases.size>limit)canvases.delete(canvases.keys().next().value);
  }else{canvases.delete(key);canvases.set(key,canvas);}
  context.imageSmoothingEnabled=false;const w=srcW*factor,h=srcH*factor;context.drawImage(canvas,-w*frame.pivot[0],-h*frame.pivot[1],w,h);return true;
 }
 return{version:'pass19-pixel-presentation/1',validate,drawSource,clear:()=>canvases.clear(),cacheInfo:()=>({entries:canvases.size,limit,scope:'Derived low-resolution frame canvases; authored PNGs are never changed.'})};
});
