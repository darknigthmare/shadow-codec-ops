/* A private fighter costume overrides its machine body; bare UIDs retain historical behavior. */
(function(root,factory){'use strict';const api=factory(root);if(typeof module==='object'&&module.exports)module.exports=api;root.CQC_PASS19_MACHINE_COSTUME_ROUTING=api;api.install();})(globalThis,function(root){
 'use strict';const patched=new WeakSet(),previewMeasures=new Map();
 const sharedPreviewUID='pass19__dwarf_gekko_humanoid_mgr',previewSampleSize=512,previewSamplePadding=32;
 let rawFitted=null;
 function fighter(value,options={}){return typeof value==='string'?{uid:value,costume:options.costume}:value;}
 function native(value,options={}){return root.CQC_PASS19_COSTUMES?.nativeVariant(fighter(value,options))===true;}
 function sharedPreview(value,box,face){
  const f=fighter(value);if(f?.uid!==sharedPreviewUID||native(f))return null;
  return root.CQC_COMBAT_SPRITES?.previewGeometry?.({...f,costume:'original'},box,face)||null;
 }
 function previewMeasure(value,face=-1){
  const f=fighter(value),bridge=root.CQC_PASS18_MACHINES;
  if(f?.uid!==sharedPreviewUID||!rawFitted||!root.document?.createElement)return null;
  const id=bridge.physical?.(f.uid,face);if(!id||!bridge.ready?.(id))return null;
  const key=id+':'+face;
  if(previewMeasures.has(key))return previewMeasures.get(key);
  const canvas=root.document.createElement('canvas');canvas.width=canvas.height=previewSampleSize;
  try{
   const context=canvas.getContext('2d',{willReadFrequently:true});
   if(!context||rawFitted(context,f.uid,{x:0,y:0,width:previewSampleSize,height:previewSampleSize,padding:previewSamplePadding},face,{action:'idle',frame:0})!==true)return null;
   const data=context.getImageData(0,0,previewSampleSize,previewSampleSize).data;
   let left=previewSampleSize,top=previewSampleSize,right=-1,bottom=-1;
   for(let y=0;y<previewSampleSize;y++)for(let x=0;x<previewSampleSize;x++)if(data[(y*previewSampleSize+x)*4+3]>=16){left=Math.min(left,x);right=Math.max(right,x);top=Math.min(top,y);bottom=Math.max(bottom,y);}
   if(bottom<top)return null;
   const result=Object.freeze({id,face,left,top,right:right+1,bottom:bottom+1,width:right+1-left,height:bottom+1-top,sampleSize:previewSampleSize,samplePadding:previewSamplePadding,measurement:'native-rig-alpha-idle'});
   previewMeasures.set(key,result);return result;
  }catch(_){return null;}finally{canvas.width=canvas.height=1;}
 }
 function drawSharedPreview(context,value,box,face=-1,pose={}){
  const geometry=sharedPreview(value,box,face),measure=geometry&&previewMeasure(value,face);
  if(!geometry||!measure)return null;
  const ratio=geometry.standingHeight/measure.height;
  const fitted={x:geometry.x-(measure.left+measure.right)/2*ratio,y:geometry.floor-measure.bottom*ratio,width:previewSampleSize*ratio,height:previewSampleSize*ratio,padding:previewSamplePadding*ratio};
  return rawFitted(context,fighter(value).uid,fitted,face,pose);
 }
 function install(){
  const bridge=root.CQC_PASS18_MACHINES;if(!bridge||patched.has(bridge))return false;patched.add(bridge);
  rawFitted=typeof bridge.drawFitted==='function'?bridge.drawFitted.bind(bridge):null;
  for(const name of ['has','hasComposite','ready'])if(typeof bridge[name]==='function'){const original=bridge[name].bind(bridge);bridge[name]=function(value,...args){if(native(value,args[0]))return false;return original(typeof value==='object'?value.uid:value,...args);};}
  if(typeof bridge.drawPlayable==='function'){const original=bridge.drawPlayable.bind(bridge);bridge.drawPlayable=function(context,value,...args){return native(value)?false:original(context,value,...args);};}
  if(typeof bridge.drawPortrait==='function'){const original=bridge.drawPortrait.bind(bridge);bridge.drawPortrait=function(canvas,value,...args){if(native(value))return false;const f=fighter(value);if(f?.uid===sharedPreviewUID&&canvas?.getContext){const context=canvas.getContext('2d'),box={x:0,y:0,width:canvas.width,height:canvas.height,padding:Math.min(canvas.width,canvas.height)*.055},geometry=sharedPreview(value,box,-1);if(geometry&&previewMeasure(value,-1)){context.clearRect(0,0,canvas.width,canvas.height);return drawSharedPreview(context,value,box,-1,{action:'idle',frame:0});}}return original(canvas,typeof value==='object'?value.uid:value,...args);};}
  if(typeof bridge.drawFitted==='function'){const original=bridge.drawFitted.bind(bridge);bridge.drawFitted=function(context,value,box,face,pose){if(native(value))return root.CQC_COMBAT_SPRITES?.drawFitted(context,value,box,face,pose)||false;const shared=drawSharedPreview(context,value,box,face,pose);return shared===null?original(context,typeof value==='object'?value.uid:value,box,face,pose):shared;};}
  for(const name of ['drawCoreMachine','drawAccessory'])if(typeof bridge[name]==='function'){const original=bridge[name].bind(bridge);bridge[name]=function(context,actor,...args){const value={...actor,uid:actor.uid||'core__'+actor.id};return native(value)?false:original(context,actor,...args);};}
  for(const name of ['whenReady','whenReadyComposite'])if(typeof bridge[name]==='function'){const original=bridge[name].bind(bridge);bridge[name]=function(value,options={}){const record=fighter(value,options);return native(record)?root.CQC_PASS19_COSTUMES.whenReady(record,options):original(typeof value==='object'?value.uid:value,options);};}
  return true;
 }
 return{version:'pass20-machine-costume-routing/1',install,native,previewMeasure};
});
