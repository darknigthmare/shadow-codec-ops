/* Original profile JSON remains intact. Corrections apply to exact reviewed UIDs. */
(function(root){'use strict';
  const source={uid:'core__wolf',game:'Metal Gear Solid (1998), original PS1',
    weapon:'PSG1',url:'https://www.konami.com/mg/archive/mgs/character/images/ch10_body.jpg',
    limits:'Five-round reserve, targeting guide, damage and timings are Versus adaptations. No canonical laser accessory or railgun is claimed.'};
  const slots={core__wolf:{shoot:['special','super']},
    core__firetrooper:{shoot:['special','super']},
    core__mantis:{shoot:['special','super'],bind:['specialDown']}};
  function origins(entry,marks){
    if(!entry||!marks)return null;
    const out={};
    for(const [side,face]of [['right',1],['left',-1]]){
      const mark=marks[side],actions=entry.facing===face?entry.actions:entry.oppositeActions,
        frame=mark&&actions?.[mark.action]?.frames?.[mark.frame];
      if(!frame||frame.file!==mark.file||frame.sha256!==mark.sha256||
        !Array.isArray(mark.point)||mark.point.length!==2||!mark.point.every(Number.isFinite))return null;
      const [x,y,w,h]=frame.rect,px=x+w*frame.pivot[0],py=y+h*frame.pivot[1],
        sourceHeight=entry.sourceFrameHeights?.[frame.file],scale=entry.displayHeight/sourceHeight*1.12,
        forward=(mark.point[0]-px)*face*scale,height=(py-mark.point[1])*scale;
      if(!Number.isFinite(forward)||!Number.isFinite(height)||forward<0||forward>220||height<=0||height>330)return null;
      out[face]={forward,height};
    }
    return out;
  }
  function apply(fighters,catalog=root.CQC_COMBAT_SPRITE_CATALOG,anchors=root.CQC_PASS4_NATIVE_ORIGINS){
    const changed=[];
    for(const [uid,plans]of Object.entries(slots)){
      const i=fighters.findIndex(f=>f.uid===uid);if(i<0)continue;
      const f=JSON.parse(JSON.stringify(fighters[i])),c=f.combat;let edited=false;
      if(uid==='core__wolf'){
        c.resource={...c.resource,label:'PSG1'};
        c.moves.special.counterplay=`Repère de visée du versus ; tir haut annoncé pendant ${c.moves.special.startup} images, accroupissement ou approche pendant la préparation.`;
        c.moves.super={...c.moves.super,tag:'precision',cost:1,
          counterplay:'Un tir de PSG1 consomme une cartouche et la jauge du super ; préparation longue, garde, esquive ou parade de projectile.'};
        c.basis=(c.basis||'')+' Le PSG1 original est un fusil de précision conventionnel, pas une arme électromagnétique.';
        c.scope='PSG1 de Wolf MGS1 PS1. Réserve de cinq cartouches et repère de visée adaptés au versus ; aucun accessoire laser canonique revendiqué. Super : une vraie cartouche, aucun tir à réserve vide.';
        c.sources=[...new Set([...(c.sources||[]),'wolf_ps1_psg1_pass4'])];edited=true;
      }
      for(const [kind,moveSlots]of Object.entries(plans)){
        const measured=origins(catalog?.entries?.[uid],anchors?.[uid]?.[kind]);
        if(!measured)continue;
        for(const slot of moveSlots)c.moves[slot].projectileOrigin=measured;
        edited=true;
      }
      if(edited){fighters[i]=f;changed.push(uid);}
    }
    return changed;
  }
  const api={apply,origins,source,slots};root.CQC_PASS4_COMBAT_FIDELITY=api;
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
