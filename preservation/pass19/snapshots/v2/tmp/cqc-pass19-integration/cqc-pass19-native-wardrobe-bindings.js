/* Bind the native Vestiaire to the existing independent slot choices. */
(function(root){'use strict';
 function mount(){
  const choices=root.CQC_COSTUMES_PASS17,library=root.CQC_NATIVE_WARDROBE;
  if(!choices||!library||!root.CQC_NATIVE_WARDROBE_UI)return false;
  const ui=choices.mount();if(!ui?.getFighters||!ui.controls)return false;
  const getFighters=()=>ui.getFighters().map((f,slot)=>choices.fighterFor(f,slot));
  const wardrobe=root.CQC_NATIVE_WARDROBE_UI.create({library}),buttons=[];
  library.bindSlots({getFighters,onCommit:({slot,fighter})=>{ui.onChange?.({slot,uid:fighter.uid,costume:fighter.costume});choices.updateUI(ui.getFighters());},onError:()=>{}});
  const seen=new Set();for(const controls of [ui.controls,ui.mobile])for(let slot=0;slot<2;slot++){
   const control=controls?.[slot];if(!control||seen.has(control.label))continue;seen.add(control.label);
   const holder=root.document.createElement('span');holder.className='cqc-native-wardrobe-slot';control.label.after(holder);
   const mounted=wardrobe.mountSlot(holder,slot,()=>getFighters()[slot]);buttons.push(mounted);
  }
  const update=choices.updateUI;
  choices.updateUI=function(fighters){const result=update.call(choices,fighters);buttons.forEach(button=>button.refresh());if(ui.bar&&fighters?.some(f=>library.availableFor(f?.uid).length))ui.bar.hidden=false;return result;};
  choices.updateUI(ui.getFighters());
  root.CQC_NATIVE_WARDROBE_BINDINGS={wardrobe,buttons,getFighters,mounted:true};return true;
 }
 if(root.document.readyState==='loading')root.document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})(globalThis);
