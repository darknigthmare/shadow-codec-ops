/* Exact-UID runtime corrections. Original roster/profile JSON is never edited. */
(function(root){'use strict';
  const ocelotSource={url:'https://archive.org/download/LP_Metal_Gear_Solid_3/mgs3_12.mp4',
    observedSeconds:[718,765,805,845,864,870,880,890,900],
    observation:'Original PS2 duel: two SAA, HUD 6+6 -> 0+0 -> 6+6 after loading gates.',
    limits:'One shared twelve-round reserve. Super remains six shots; startup and reload timing are versus adaptations.'};
  const anchors={
    right:{file:'assets/combat-sprites/core__meryl_mgs1/c-right-v1.png',
      sha256:'0eaef65b37a918fb7b8f2ee6e89063f0f38f4558954fb10e4fcbc695e0806562',
      shoot:{action:'shoot',frame:0,point:[355,775]},grenade:{action:'deploy',frame:2,point:[1093,428]}},
    left:{file:'assets/combat-sprites/core__meryl_mgs1/c-left-v1.png',
      sha256:'5c53a1870fdd5904ae777d364c48ee02e4d18705bbffce986d9b1d60bb9cdf28',
      shoot:{action:'shoot',frame:0,point:[60,788]},grenade:{action:'deploy',frame:2,point:[751,428]}}
  };
  const ocelotAnchors={
    right:{file:'assets/combat-sprites/core__ocelot/c-right-v1.png',
      sha256:'02725c12d8abb2d618d5361a3913a509c6376d40ac8160bb1df3b4c0365db084',
      shoot:{action:'shoot',frame:1,point:[624,494]},grenade:{action:'deploy',frame:1,point:[1238,728]}},
    left:{file:'assets/combat-sprites/core__ocelot/c-left-v1.png',
      sha256:'2bb3170f84d8428f83f08c4ab5bea7c4b395593af8d7687584ded483f05c92b6',
      shoot:{action:'shoot',frame:1,point:[344,516]},grenade:{action:'deploy',frame:1,point:[953,750]}}
  };
  function origins(entry,kind,nativeAnchors=anchors){
    const result={};
    for(const [side,face]of [['right',1],['left',-1]]){
      const a=nativeAnchors[side],mark=a[kind],actions=face===entry?.facing?entry?.actions:entry?.oppositeActions,
        frame=actions?.[mark.action]?.frames?.[mark.frame];
      if(!frame||frame.file!==a.file||frame.sha256!==a.sha256)return null;
      const [x,y,w,h]=frame.rect,px=x+w*frame.pivot[0],py=y+h*frame.pivot[1],
        scale=entry.displayHeight/entry.sourceFrameHeights[a.file]*1.12;
      result[face]={forward:Math.abs(mark.point[0]-px)*scale,height:(py-mark.point[1])*scale};
    }
    return result;
  }
  function apply(fighters,catalog=root.CQC_COMBAT_SPRITE_CATALOG){
    const changed=[];
    for(const uid of ['core__ocelot','core__meryl_mgs1']){
      const index=fighters.findIndex(f=>f.uid===uid);if(index<0)continue;
      const f=JSON.parse(JSON.stringify(fighters[index])),c=f.combat;
      if(uid==='core__ocelot'){
        c.resource={...c.resource,max:12,label:'DEUX SAA'};
        c.basis+=' Le duel PS2 original montre deux SAA de six cartouches, soit douze avant recharge.';
        c.moves.special.counterplay='Douze cartouches réparties entre deux SAA, puis recharge interruptible ; ricochet limité, aucun tir infini.';
        c.moves.specialDown.name='Tir bas de duel';
        c.moves.specialDown.counterplay='Garde accroupie, parade de projectile ou saut ; rester accroupi sans garde ne protège pas de ce tir bas.';
        c.moves.utility.name='Recharger les deux SAA';
        c.scope='Réserve totale 6+6 issue du vrai duel PS2. Un revolver est utilisé par pose ; super six coups et durées adaptés au versus.';
        c.sources=[...new Set([...(c.sources||[]),'ocelot_ps2_dual_saa_pass3'])];
        const entry=catalog?.entries?.[uid],shoot=origins(entry,'shoot',ocelotAnchors),low=origins(entry,'grenade',ocelotAnchors);
        if(shoot&&low){c.moves.special.projectileOrigin=shoot;c.moves.super.projectileOrigin=shoot;c.moves.specialDown.projectileOrigin=low;}
      }else{
        const entry=catalog?.entries?.[uid],shoot=origins(entry,'shoot'),grenade=origins(entry,'grenade');
        if(!shoot||!grenade)continue;
        c.moves.special.projectileOrigin=shoot;c.moves.super.projectileOrigin=shoot;
        c.moves.specialDown.projectileOrigin=grenade;
        c.scope=(c.scope||'Techniques adaptées au versus.')+' Départ des projectiles aligné sur le canon et la main des PNG natifs validés, séparément pour chaque direction.';
      }
      fighters[index]=f;changed.push(uid);
    }
    return changed;
  }
  const api={apply,origins,anchors,ocelotAnchors,ocelotSource};root.CQC_PASS3_COMBAT_FIDELITY=api;
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
