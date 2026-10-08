/* Original pixel presentation of the actual pose-driven machine parts, retaining its combat behavior. */
(function(root,factory){'use strict';const api=factory(root);if(typeof module==='object'&&module.exports)module.exports=api;root.CQC_PASS19_MACHINE_PIXEL_STYLE=api;api.install();})(globalThis,function(root){
 'use strict';const patched=new WeakSet(),canvases=new Map(),portraits=new WeakMap(),limit=8;let receipt=null;
 function optionFor(fighter){return fighter?.costume&&root.CQC_COMBAT_COSTUME_CATALOG?.entries?.[fighter.uid]?.options?.find(option=>option.id===fighter.costume)||null;}
 function validate(uid,option){const style=option?.machinePresentation;return!!style&&style.schema==='cqc.machine-pixel-presentation/1'&&style.baseUID===uid&&style.originalPresentation===true&&style.canonicalRetroExtractionClaimed===false&&Number.isInteger(style.maxBodyHeight)&&style.maxBodyHeight>=24&&style.maxBodyHeight<=128&&Object.hasOwn(root.CQC_PASS18_MACHINE_DATA?.playable||{},uid)&&option.family==='retro';}
 function selected(fighter){const option=optionFor(fighter);return validate(fighter?.uid,option)?option:null;}
 function createCanvas(key,width,height){let canvas=canvases.get(key);if(!canvas){canvas=root.document?.createElement?.('canvas')||(typeof root.OffscreenCanvas==='function'?new root.OffscreenCanvas(width,height):null);if(!canvas)return null;canvases.set(key,canvas);while(canvases.size>limit)canvases.delete(canvases.keys().next().value);}else{canvases.delete(key);canvases.set(key,canvas);}if(canvas.width!==width)canvas.width=width;if(canvas.height!==height)canvas.height=height;return canvas;}
 function install(){
  const bridge=root.CQC_PASS18_MACHINES;if(!bridge||patched.has(bridge))return false;patched.add(bridge);
  const drawPlayable=bridge.drawPlayable?.bind(bridge),drawFitted=bridge.drawFitted?.bind(bridge),drawPortrait=bridge.drawPortrait?.bind(bridge),ready=bridge.ready?.bind(bridge),whenReady=bridge.whenReady?.bind(bridge),drawCore=bridge.drawCoreMachine?.bind(bridge),cancelPortrait=bridge.cancelPortrait?.bind(bridge);
  bridge.cancelPortrait=function(canvas){portraits.delete(canvas);return cancelPortrait?.(canvas);};
  if(drawPlayable)bridge.drawPlayable=function(context,fighter,x,y,face,scale,pose={}){
   const option=selected(fighter);if(!option)return drawPlayable(context,fighter,x,y,face,scale,pose);
   if(!context||![x,y,scale].every(Number.isFinite)||scale<=0||![1,-1].includes(face))return false;
   const bodyHeight=root.CQC_PASS19_WORLD_SCALE?.displayHeightFor?.(fighter.uid,fighter.costume,'versus')||450;
   const ratio=option.machinePresentation.maxBodyHeight/bodyHeight,w=option.machinePresentation.maxBodyHeight*6,h=option.machinePresentation.maxBodyHeight*5;
   const canvas=createCanvas(fighter.uid+':'+fighter.costume+':'+face,w,h);if(!canvas)return false;const pixel=canvas.getContext('2d');pixel.clearRect(0,0,w,h);pixel.save();
   let result;try{pixel.scale(ratio,ratio);pixel.imageSmoothingEnabled=true;result=drawPlayable(pixel,{...fighter,costume:'original'},w/(2*ratio),h*.8/ratio,face,1,{...pose,worldScaleApplied:false});}finally{pixel.restore();}
   if(!result)return false;context.save();try{context.imageSmoothingEnabled=false;context.drawImage(canvas,x-w/(2*ratio)*scale,y-h*.8/ratio*scale,w/ratio*scale,h/ratio*scale);}finally{context.restore();}return true;
  };
  if(drawFitted)bridge.drawFitted=function(context,value,box,face=-1,pose={}){
   const option=selected(value);if(!option)return drawFitted(context,typeof value==='object'?value.uid:value,box,face,pose);
   if(!context||!box||![box.x,box.y,box.width,box.height].every(Number.isFinite)||box.width<=0||box.height<=0)return false;
   const h=option.machinePresentation.maxBodyHeight,w=Math.max(1,Math.round(h*box.width/box.height)),canvas=createCanvas(value.uid+':portrait:'+face,w,h);if(!canvas)return false;const pixel=canvas.getContext('2d');pixel.clearRect(0,0,w,h);const result=drawFitted(pixel,value.uid,{x:0,y:0,width:w,height:h,padding:2},face,pose);if(!result)return false;
   context.save();try{context.imageSmoothingEnabled=false;context.drawImage(canvas,box.x,box.y,box.width,box.height);}finally{context.restore();}return true;
  };
  if(drawPortrait)bridge.drawPortrait=function(canvas,value,onRepaint){
   const option=selected(value);if(!option)return drawPortrait(canvas,typeof value==='object'?value.uid:value,onRepaint);
   const ticket={uid:value.uid,costume:value.costume};portraits.set(canvas,ticket);
   const context=canvas.getContext('2d'),box={x:0,y:0,width:canvas.width,height:canvas.height,padding:7};context.clearRect(0,0,canvas.width,canvas.height);bridge.drawFitted(context,value,box,-1,{action:'idle',frame:0});
   if(!ready?.(value.uid))Promise.resolve(whenReady?.(value.uid)||false).then(result=>{if(result===false||canvas.isConnected===false||portraits.get(canvas)!==ticket)return;if(typeof onRepaint==='function')onRepaint();else bridge.drawFitted(context,value,box,-1,{action:'idle',frame:0});}).catch(()=>{});
   return true;
  };
  if(drawCore)bridge.drawCoreMachine=function(context,actor,time,state={},hooks={}){
   const value={...actor,uid:actor.uid||'core__'+actor.id},option=selected(value);if(!option)return drawCore(context,actor,time,state,hooks);
   const bodyHeight=root.CQC_PASS19_WORLD_SCALE?.displayHeightFor?.(value.uid,value.costume,'core')||450,ratio=option.machinePresentation.maxBodyHeight/bodyHeight,w=option.machinePresentation.maxBodyHeight*6,h=option.machinePresentation.maxBodyHeight*5;
   const canvas=createCanvas(value.uid+':core:'+actor.facing,w,h);if(!canvas)return false;const pixel=canvas.getContext('2d');pixel.clearRect(0,0,w,h);pixel.save();let result;
   try{pixel.translate(w/2,h*.8);pixel.scale(ratio,ratio);result=drawCore(pixel,{...actor,costume:'original'},time,state,hooks);}finally{pixel.restore();}
   if(!result)return false;context.save();try{context.imageSmoothingEnabled=false;context.drawImage(canvas,-w/(2*ratio),-h*.8/ratio,w/ratio,h/ratio);}finally{context.restore();}return true;
  };
  return true;
 }
 function registerAll(){
  const wardrobe=root.CQC_PASS19_COSTUMES,data=root.CQC_PASS19_COSTUME_REQUEST_DATA;if(!wardrobe||!data)throw Error('Registre costume absent');install();const additions=[];
  for(const uid of Object.keys(root.CQC_PASS18_MACHINE_DATA?.playable||{}))if(data.entries[uid]&&!wardrobe.optionFor(uid,'retro'))additions.push({uid,option:{id:'retro',family:'retro',label:'Archives',machinePresentation:{schema:'cqc.machine-pixel-presentation/1',baseUID:uid,originalPresentation:true,maxBodyHeight:80,canonicalRetroExtractionClaimed:false},provenance:{kind:'style-reinterpretation',sourceUID:uid,originalDesign:true,canonicalAppearanceAttested:false,sources:[{url:'https://github.com/darknigthmare/shadow-codec-ops/commit/5642ae495aa68eaf940e10724de8f3986f808cd0',scope:'Existing source-reviewed native parts composition; original low-resolution presentation, no official retro body claim.'}]},assetReview:{status:'verified',independentArt:false,reviewer:'native-machine-pixel-presentation-pipeline',reviewedAt:'2026-10-08',scope:'Reuses accepted native machine parts and the live pose renderer; no invented atlas or body silhouette.'}}});
  const result={accepted:0,rejected:[]};receipt={schema:'cqc.pass19.machine-pixel-presentations/1',...result,uids:[],archivedDerivedPresentationUIDs:additions.map(addition=>addition.uid),reason:'newly-drawn-retro-atlas-required',newPhysicalPNGCount:0,sourcePixelsChanged:false,canonicalRetroExtractionClaimed:false};return receipt;
 }
 return{version:'pass19-machine-pixel-style/1',validate,selected,install,registerAll,status:()=>receipt,cacheInfo:()=>({entries:canvases.size,limit})};
});
