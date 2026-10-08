from pathlib import Path
import os
p=Path('/tmp/cqc-pass19-application/public/cqc/src/cqc-pass19-machine-costume-routing.js');s=p.read_text();Path('/workspace/cqc-pass20-preview/cqc-pass19-machine-costume-routing.prior-pass19.js').write_text(s)
s=s.replace(" 'use strict';const patched=new WeakSet();", " 'use strict';const patched=new WeakSet(),previewMeasures=new Map();\n const sharedPreviewUID='pass19__dwarf_gekko_humanoid_mgr',previewSampleSize=512;\n let rawFitted=null;")
a=s.index(' function install(){')
s=s[:a]+''' function sharedPreview(value,box,face){
  const f=fighter(value);if(f?.uid!==sharedPreviewUID||native(f))return null;
  return root.CQC_COMBAT_SPRITES?.previewGeometry?.({...f,costume:'original'},box,face)||null;
 }
 function previewMeasure(value,face=-1){
  const f=fighter(value),bridge=root.CQC_PASS18_MACHINES;
  if(f?.uid!==sharedPreviewUID||!rawFitted||!bridge?.ready?.(f.uid)||!root.document?.createElement)return null;
  const id=bridge.physical?.(f.uid,face),key=id+':'+face;
  if(previewMeasures.has(key))return previewMeasures.get(key);
  const canvas=root.document.createElement('canvas');canvas.width=canvas.height=previewSampleSize;
  try{
   const context=canvas.getContext('2d',{willReadFrequently:true});
   if(!context||rawFitted(context,f.uid,{x:0,y:0,width:previewSampleSize,height:previewSampleSize,padding:0},face,{action:'idle',frame:0})!==true)return null;
   const data=context.getImageData(0,0,previewSampleSize,previewSampleSize).data;
   let left=previewSampleSize,top=previewSampleSize,right=-1,bottom=-1;
   for(let y=0;y<previewSampleSize;y++)for(let x=0;x<previewSampleSize;x++)if(data[(y*previewSampleSize+x)*4+3]>=16){left=Math.min(left,x);right=Math.max(right,x);top=Math.min(top,y);bottom=Math.max(bottom,y);}
   if(bottom<top)return null;
   const result=Object.freeze({id,face,left,top,right:right+1,bottom:bottom+1,width:right+1-left,height:bottom+1-top,sampleSize:previewSampleSize,measurement:'native-rig-alpha-idle'});
   previewMeasures.set(key,result);return result;
  }catch(_){return null;}finally{canvas.width=canvas.height=1;}
 }
 function drawSharedPreview(context,value,box,face=-1,pose={}){
  const geometry=sharedPreview(value,box,face),measure=geometry&&previewMeasure(value,face);
  if(!geometry||!measure)return null;
  const ratio=geometry.standingHeight/measure.height;
  const fitted={x:geometry.x-(measure.left+measure.right)/2*ratio,y:geometry.floor-measure.bottom*ratio,width:previewSampleSize*ratio,height:previewSampleSize*ratio,padding:0};
  return rawFitted(context,fighter(value).uid,fitted,face,pose);
 }
''' +s[a:]
s=s.replace("  const bridge=root.CQC_PASS18_MACHINES;if(!bridge||patched.has(bridge))return false;patched.add(bridge);", "  const bridge=root.CQC_PASS18_MACHINES;if(!bridge||patched.has(bridge))return false;patched.add(bridge);\n  rawFitted=typeof bridge.drawFitted==='function'?bridge.drawFitted.bind(bridge):null;")
s=s.replace("bridge.drawPortrait=function(canvas,value,...args){return native(value)?false:original(canvas,typeof value==='object'?value.uid:value,...args);};", "bridge.drawPortrait=function(canvas,value,...args){if(native(value))return false;const f=fighter(value);if(f?.uid===sharedPreviewUID&&canvas?.getContext){const context=canvas.getContext('2d'),box={x:0,y:0,width:canvas.width,height:canvas.height,padding:Math.min(canvas.width,canvas.height)*.055},geometry=sharedPreview(value,box,-1);if(geometry&&previewMeasure(value,-1)){context.clearRect(0,0,canvas.width,canvas.height);return drawSharedPreview(context,value,box,-1,{action:'idle',frame:0});}}return original(canvas,typeof value==='object'?value.uid:value,...args);};")
s=s.replace("bridge.drawFitted=function(context,value,box,face,pose){return native(value)?root.CQC_COMBAT_SPRITES?.drawFitted(context,value,box,face,pose)||false:original(context,typeof value==='object'?value.uid:value,box,face,pose);};", "bridge.drawFitted=function(context,value,box,face,pose){if(native(value))return root.CQC_COMBAT_SPRITES?.drawFitted(context,value,box,face,pose)||false;const shared=drawSharedPreview(context,value,box,face,pose);return shared===null?original(context,typeof value==='object'?value.uid:value,box,face,pose):shared;};")
s=s.replace("return{version:'pass19-machine-costume-routing/1',install,native};", "return{version:'pass20-machine-costume-routing/1',install,native,previewMeasure};")
q=p.with_name(p.name+'.pass20.tmp');q.write_text(s);os.replace(q,p)
