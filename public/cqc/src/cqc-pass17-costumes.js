/* Independent cosmetic choices per slot and per fighter. Fighter data is never mutated. */
(function(root,factory){
  'use strict'; const api=factory(root);
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.CQC_COSTUMES_PASS17=api;
})(globalThis,function(root){
  'use strict';
  const KEY='cqc-v056-costumes',slots=[Object.create(null),Object.create(null)];
  let ui=null;
  const record=uid=>root.CQC_COMBAT_COSTUME_CATALOG?.entries?.[uid];
  function optionsFor(uid){return (record(uid)?.options||[{id:'original',label:'Original'}]).map(({id,label})=>({id,label}));}
  function normalize(uid,id){return optionsFor(uid).some(option=>option.id===id)?id:'original';}
  function chosen(slot,uid){return normalize(uid,slots[slot===1?1:0][uid]);}
  try{
    const saved=JSON.parse(root.localStorage?.getItem(KEY)||'null');
    if(saved?.schema==='cqc.slot-costumes/1'&&Array.isArray(saved.slots))for(let slot=0;slot<2;slot++){
      const values=saved.slots[slot];if(!values||typeof values!=='object'||Array.isArray(values))continue;
      for(const [uid,id] of Object.entries(values))if(record(uid)&&normalize(uid,id)===id)slots[slot][uid]=id;
    }
  }catch{}
  function snapshot(){return {schema:'cqc.slot-costumes/1',slots:slots.map(slot=>({...slot}))};}
  function select(slot,uid,id){
    if(![0,1].includes(slot)||!record(uid)||normalize(uid,id)!==id)return false;
    slots[slot][uid]=id;
    try{root.localStorage?.setItem(KEY,JSON.stringify(snapshot()));}catch{}
    return true;
  }
  function fighterFor(fighter,slot,override){
    if(!fighter)return fighter;
    const costume=override===undefined?chosen(slot,fighter.uid):normalize(fighter.uid,override);
    const copy={...fighter};if(costume==='nextgen')copy.costume=costume;else delete copy.costume;return copy;
  }
  function spriteOptions(fighter,options={}){return {...options,costume:normalize(fighter?.uid,fighter?.costume)};}
  function makeControl(doc,slot,mobile){
    const label=doc.createElement('label');label.className='costume-choice-pass17';
    const caption=doc.createElement('span');caption.textContent=mobile?'J'+(slot+1)+' · COSTUME':'COSTUME';
    const select=doc.createElement('select');select.id=(mobile?'mobile-':'')+'costume-p'+(slot+1)+'-pass17';
    select.setAttribute('aria-label','Costume du joueur '+(slot+1));
    select.addEventListener('change',()=>{
      if(!ui)return;const f=ui.getFighters?.()?.[slot];
      if(f&&api.select(slot,f.uid,select.value)){ui.onChange?.({slot,uid:f.uid,costume:select.value});updateUI(ui.getFighters?.());}
    });
    label.append(caption,select);return {label,select};
  }
  function mount({document:doc=root.document,getFighters,onChange}={}){
    if(ui)return ui;if(!doc)return null;
    const controls=[0,1].map(slot=>makeControl(doc,slot,false));
    for(let slot=0;slot<2;slot++)doc.querySelector('#p'+(slot+1)+'Info')?.before(controls[slot].label);
    const bar=doc.createElement('div');bar.className='costume-mobile-pass17';bar.hidden=true;
    const mobile=[0,1].map(slot=>makeControl(doc,slot,true));mobile.forEach(control=>bar.append(control.label));
    doc.querySelector('#filters')?.after(bar);
    ui={document:doc,getFighters,onChange,controls,mobile,bar};updateUI(getFighters?.());return ui;
  }
  function mountCore({document:doc=root.document,getFighters,onChange}={}){
    if(ui)return ui;if(!doc)return null;
    const controls=[0,1].map(slot=>makeControl(doc,slot,true));
    const bar=doc.createElement('div');bar.className='costume-core-pass17';bar.hidden=true;
    controls.forEach(control=>bar.append(control.label));
    doc.querySelector('#menu .detail .settings-grid')?.before(bar);
    ui={document:doc,getFighters,onChange,controls,mobile:controls,bar};updateUI(getFighters?.());return ui;
  }
  function updateUI(fighters){
    if(!ui||!Array.isArray(fighters))return;
    let available=0;
    for(let slot=0;slot<2;slot++){
      const fighter=fighters[slot],options=optionsFor(fighter?.uid),active=options.length>1;
      if(active)available++;
      for(const control of [ui.controls[slot],ui.mobile[slot]]){
        control.label.hidden=!active;
        control.select.replaceChildren(...options.map(option=>{const node=ui.document.createElement('option');node.value=option.id;node.textContent=option.label;return node;}));
        control.select.value=chosen(slot,fighter?.uid);control.select.disabled=!active;
      }
    }
    ui.bar.hidden=!available;
  }
  const api={version:'pass17-costumes/1',optionsFor,normalize,chosen,select,snapshot,fighterFor,spriteOptions,mount,mountCore,updateUI};
  return api;
});
