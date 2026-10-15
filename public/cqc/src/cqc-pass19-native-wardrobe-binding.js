/* Bind the native wardrobe to the existing pass17 controls without replacing their lexical state. */
(function(root){'use strict';let installed=false,current=null,view=null;const wrappers=new Set();
 function library(){return root.CQC_NATIVE_WARDROBE;}
 function refresh(ui=current){if(!ui)return;let known=false;for(const wrapper of wrappers){if(wrapper.ui!==ui)continue;wrapper.handle.refresh();known||=!wrapper.handle.button.hidden;}if(known&&ui.bar)ui.bar.hidden=false;}
 function bind(ui){if(!ui||typeof ui.getFighters!=='function'||!library())return ui;current=ui;if(!view)view=root.CQC_NATIVE_WARDROBE_UI.create({library:library()});
  const controls=new Set([...(ui.controls||[]),...(ui.mobile||[])]);for(const control of controls){if(!control?.label?.parentElement||[...wrappers].some(w=>w.control===control))continue;const slot=ui.controls?.indexOf(control)>=0?ui.controls.indexOf(control):ui.mobile.indexOf(control);if(![0,1].includes(slot))continue;const group=ui.document.createElement('div');group.className='cqc-wardrobe-slot-pass19';control.label.before(group);group.append(control.label);const handle=view.mountSlot(group,slot,()=>{const fighter=ui.getFighters()?.[slot];return fighter?{...fighter,costume:root.CQC_COSTUMES_PASS17.chosen(slot,fighter.uid)}:fighter;});wrappers.add({ui,control,group,handle});}
  library().bindSlots({getFighters:()=>ui.getFighters(),onCommit:({slot,uid,id})=>{ui.onChange?.({slot,uid,costume:id});root.CQC_COSTUMES_PASS17.updateUI(ui.getFighters());}});refresh(ui);return ui;
 }
 function install(){if(installed)return false;const choices=root.CQC_COSTUMES_PASS17;if(!choices||!library()||!root.CQC_NATIVE_WARDROBE_UI)return false;installed=true;
  for(const name of ['mount','mountCore']){const original=choices[name].bind(choices);choices[name]=function(...args){return bind(original(...args));};}
  const update=choices.updateUI.bind(choices);choices.updateUI=function(...args){const result=update(...args);refresh();return result;};
  library().on(event=>{if(event.type==='index-ready'&&current)choices.updateUI(current.getFighters());});
  const doc=root.document;if(doc&&!doc.getElementById('cqc-wardrobe-binding-style')){const style=doc.createElement('style');style.id='cqc-wardrobe-binding-style';style.textContent='.cqc-wardrobe-slot-pass19{display:flex;flex-wrap:wrap;align-items:end;gap:8px}.cqc-wardrobe-slot-pass19>.costume-choice-pass17{flex:1;min-width:120px}.costume-mobile-pass17>.cqc-wardrobe-slot-pass19,.costume-core-pass17>.cqc-wardrobe-slot-pass19{flex:1}';doc.head.append(style);}return true;
 }
 root.CQC_NATIVE_WARDROBE_BINDING={version:'native-wardrobe-pass17-binding/1',install,bind,refresh};install();
})(globalThis);
