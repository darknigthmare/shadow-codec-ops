/* A private fighter costume overrides its machine body; bare UIDs retain historical behavior. */
(function(root,factory){'use strict';const api=factory(root);if(typeof module==='object'&&module.exports)module.exports=api;root.CQC_PASS19_MACHINE_COSTUME_ROUTING=api;api.install();})(globalThis,function(root){
 'use strict';const patched=new WeakSet();
 function fighter(value,options={}){return typeof value==='string'?{uid:value,costume:options.costume}:value;}
 function native(value,options={}){return root.CQC_PASS19_COSTUMES?.nativeVariant(fighter(value,options))===true;}
 function install(){
  const bridge=root.CQC_PASS18_MACHINES;if(!bridge||patched.has(bridge))return false;patched.add(bridge);
  for(const name of ['has','hasComposite','ready'])if(typeof bridge[name]==='function'){const original=bridge[name].bind(bridge);bridge[name]=function(value,...args){if(native(value,args[0]))return false;return original(typeof value==='object'?value.uid:value,...args);};}
  if(typeof bridge.drawPlayable==='function'){const original=bridge.drawPlayable.bind(bridge);bridge.drawPlayable=function(context,value,...args){return native(value)?false:original(context,value,...args);};}
  if(typeof bridge.drawPortrait==='function'){const original=bridge.drawPortrait.bind(bridge);bridge.drawPortrait=function(canvas,value,...args){return native(value)?false:original(canvas,typeof value==='object'?value.uid:value,...args);};}
  if(typeof bridge.drawFitted==='function'){const original=bridge.drawFitted.bind(bridge);bridge.drawFitted=function(context,value,box,face,pose){return native(value)?root.CQC_COMBAT_SPRITES?.drawFitted(context,value,box,face,pose)||false:original(context,typeof value==='object'?value.uid:value,box,face,pose);};}
  for(const name of ['drawCoreMachine','drawAccessory'])if(typeof bridge[name]==='function'){const original=bridge[name].bind(bridge);bridge[name]=function(context,actor,...args){const value={...actor,uid:actor.uid||'core__'+actor.id};return native(value)?false:original(context,actor,...args);};}
  for(const name of ['whenReady','whenReadyComposite'])if(typeof bridge[name]==='function'){const original=bridge[name].bind(bridge);bridge[name]=function(value,options={}){const record=fighter(value,options);return native(record)?root.CQC_PASS19_COSTUMES.whenReady(record,options):original(typeof value==='object'?value.uid:value,options);};}
  return true;
 }
 return{version:'pass19-machine-costume-routing/1',install,native};
});
