/* Source-based corrections for the two MSX2 procedural placeholders.
 * These remain Canvas approximations, not approved native combat sprite sets.
 * Original roster, combat profiles and authored stories are preserved. */
(function(root){'use strict';
  const sources={
    core__bloody_brad:'https://lparchive.org/Metal-Gear-1-2/Update%2009/',
    core__firetrooper:'https://lparchive.org/Metal-Gear-1-2/Update%2008/',
    manual:'https://lparchive.org/Metal-Gear-1-2/Update%2011/58-wSLfj.jpg'
  };
  function visual(f,pose={}){
    const original=f.visual||{};
    if(f.uid==='core__bloody_brad')return {...original,primary:'#18252e',
      accent:'#647b45',trousers:'#53713a',skin:'#ad916c',hairColor:'#201c18',
      weapon:'fists',pouches:0,holster:false,pads:false,back:null};
    if(f.uid==='core__firetrooper')return {...original,primary:'#cfcebc',
      accent:'#8b8e81',trousers:'#cfcebc',hair:'bald',headgear:'gas-mask',
      weapon:'flamethrower',fireActive:pose.moveTag==='fire',back:'fuel-tank',
      pouches:0,holster:false,pads:false};
    return original;
  }
  const api={visual,sources,fidelity:'closest_supported',
    limitations:['Les silhouettes restent procédurales : elles ne remplacent pas un atlas natif approuvé.',
      'La palette et les éléments visibles suivent Metal Gear MSX2 1987 ; les détails sous la résolution des sources restent approximatifs.',
      'Les commandes, dégâts, réserves et techniques de versus sont des adaptations, pas des animations originales du MSX2.']};
  root.CQC_MSX2_IDENTITY_REPRISE=api;
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
