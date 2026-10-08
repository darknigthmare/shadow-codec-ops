/* Original MGS2 identities. Historical profiles stay intact; timing and damage stay unchanged. */
(function(root){'use strict';
  const slots={core__fortune:{shoot:['special','super']},
    core__fatman:{shoot:['special'],deploy:['super']},
    core__vamp:{shoot:['special'],low:['specialDown']}};
  const reviewedUIDs=[...Object.keys(slots),'core__solidus'];
  function apply(fighters,catalog=root.CQC_COMBAT_SPRITE_CATALOG,anchors=root.CQC_PASS5_NATIVE_ORIGINS){
    const changed=[];
    for(const uid of reviewedUIDs){
      const index=fighters.findIndex(f=>f.uid===uid);if(index<0)continue;
      const f=JSON.parse(JSON.stringify(fighters[index])),c=f.combat;
      if(uid==='core__fortune'){
        c.resource={...c.resource,label:'RAILGUN / DÉVIATION'};
        c.scope='Fortune de MGS2 original : railgun et déviation bornée. Réserve, préparation, protection de deux projectiles et commandes sont des adaptations au versus.';
      }else if(uid==='core__fatman'){
        f.visual={...f.visual,weapon:'pistol'};c.weapon='pistol';
        c.resource={...c.resource,label:'C4 / TIRS'};
        c.moves.super={...c.moves.super,name:'Lancer de C4 — adaptation',projectileOverride:'c4',
          counterplay:'Trois charges de C4 lancées pour le versus ; trajectoires, délai et dégâts adaptés. Éviter les arcs et punir la préparation.'};
        c.scope='Fatman de MGS2 original : rollers, pistolet et C4. Les charges posées sont destructibles, deux maximum. Le lancer de trois C4 est une adaptation du versus ; aucune grenade à fragmentation supplémentaire n’est attribuée au personnage.';
      }else if(uid==='core__solidus'){
        c.role='Deux lames et bras de l’exosquelette';
        c.passive={...c.passive,name:'Exosquelette de Solidus',
          desc:'Réserve partagée pour les lames, bras articulés et propulsion dans le versus ; aucun gain d’énergie sur impact.'};
        c.scope='Solidus de MGS2 original : deux lames, deux bras arrière et propulsion de l’exosquelette. Réserve et déviation de projectiles adaptées au versus ; aucun mode Ripper ni système de cellules électrolytiques de Revengeance.';
      }else{
        c.scope='Vamp de MGS2 original : couteaux, acrobaties et liaison d’ombre. Réparation récupérable plafonnée et durées adaptées au versus ; aucune capacité supplémentaire de son incarnation MGS4.';
      }
      for(const [kind,moveSlots]of Object.entries(slots[uid]||{})){
        const measured=root.CQC_PASS4_COMBAT_FIDELITY?.origins(catalog?.entries?.[uid],anchors?.[uid]?.[kind]);
        if(!measured)continue;
        for(const slot of moveSlots)c.moves[slot].projectileOrigin=measured;
      }
      fighters[index]=f;changed.push(uid);
    }
    return changed;
  }
  const api={apply,slots,reviewedUIDs};root.CQC_PASS5_COMBAT_FIDELITY=api;
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
