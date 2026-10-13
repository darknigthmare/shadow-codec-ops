/* Source-specific original-game equipment; historical profile JSON stays intact. */
(function(root){'use strict';
  const slots={
    core__pain:{shoot:['special','specialForward'],charge:['super']},
    core__fear:{shoot:['special'],charge:['super']},
    core__end:{shoot:['special'],charge:['super']},
    core__fury:{shoot:['special','super']}
  };
  const reviewedUIDs=[...Object.keys(slots),'core__dirtyduck','core__redblaster_mg2'];
  function apply(fighters,catalog=root.CQC_COMBAT_SPRITE_CATALOG,anchors=root.CQC_PASS6_NATIVE_ORIGINS){
    const changed=[];
    for(const uid of reviewedUIDs){
      const index=fighters.findIndex(f=>f.uid===uid);if(index<0)continue;
      const f=JSON.parse(JSON.stringify(fighters[index])),c=f.combat;
      if(uid==='core__end'){
        c.moves.special.counterplay=`Repère de visée du versus ; tir de Mosin annoncé pendant ${c.moves.special.startup} images, garde ou approche pendant la préparation.`;
        c.moves.super={...c.moves.super,name:'Mosin-Nagant — dernier souffle',tag:'precision',cost:1,
          counterplay:'Une cartouche de Mosin et 50 points de jauge ; tir tranquillisant annoncé, garde, esquive ou parade de projectile.'};
        c.counterplay=[c.moves.special.counterplay,c.moves.specialDown.counterplay,c.moves.specialForward.counterplay,c.moves.specialBack.counterplay];
        c.scope='The End de MGS3 PS2 original : Mosin-Nagant tranquillisant, tenue végétale, repérage et repos. Le super utilise une vraie cartouche ; réserve de cinq, repère de visée, dégâts et durées adaptés au versus. Aucun railgun ni accessoire laser canonique revendiqué.';
        c.sources=[...new Set([...(c.sources||[]),'end_ps2_mosin_pass6'])];
      }else if(uid==='core__fear'){
        c.moves.specialDown={...c.moves.specialDown,counterplay:c.moves.specialDown.counterplay.replace(/mine/g,'dispositif')};
        c.counterplay=[c.moves.special.counterplay,c.moves.specialDown.counterplay,c.moves.specialForward.counterplay,c.moves.specialBack.counterplay];
        c.scope='The Fear de MGS3 PS2 original : Little Joe, William Tell, camouflage et bonds. Les deux arbalètes utilisent des animations et origines distinctes ; réserve, piège posé, dégâts et durées sont adaptés au versus.';
      }else if(uid==='core__pain'){
        f.visual={...f.visual,weapon:'fists'};c.weapon='swarm';
        c.moves.specialForward={...c.moves.specialForward,name:'Essaim rapide — adaptation',
          counterplay:'Éviter ou bloquer les frelons ; poison borné, non létal à lui seul et non empilable.'};
        c.counterplay=[c.moves.special.counterplay,c.moves.specialDown.counterplay,c.moves.specialForward.counterplay,c.moves.specialBack.counterplay];
        c.scope='The Pain de MGS3 PS2 original, costume avec cagoule : essaims et écran de frelons. Essaim rapide conserve la mécanique du versus sans attribuer la phase Bullet Bee au costume de première phase. Coûts, guidage borné, protection de deux projectiles et durées sont des adaptations.';
      }else if(uid==='core__fury'){
        f.visual={...f.visual,weapon:'flamethrower'};c.weapon='flamethrower';
        c.scope='The Fury de MGS3 PS2 original : combinaison fermée, lance-flammes, tuyaux et propulseurs. Jets, nappe, protection et envol bornés par le versus ; pression, chaleur, collision, dégâts et durées sont des adaptations.';
      }else if(uid==='core__dirtyduck'){
        c.role='Boomerangs aller-retour et repli';
      }
      else if(uid==='core__redblaster_mg2'){
        c.role='Grenades et fils d’immobilisation';c.weapon='grenade';
        c.resource={...c.resource,label:'GRENADES'};
        const grenade={kind:'projectile',tag:'explosive',projectileOverride:'grenade',level:'mid',speed:7,vy:-6,gravity:.4,fuse:48,radius:75};
        c.moves.special={...c.moves.special,...grenade,name:'Grenade du tireur',
          counterplay:'Arc visible et explosion après délai ; éviter la zone ou punir la préparation. Trajectoire et délai adaptés au versus.'};
        c.moves.specialDown={...c.moves.specialDown,name:'Fil d’immobilisation — adaptation',tag:'snare',damage:0,status:'slow',
          counterplay:'Fil visible et destructible avant armement ; sauter ou détruire le dispositif. Deux maximum, ralentissement bref, aucune explosion.'};
        c.moves.specialForward={...c.moves.specialForward,...grenade,name:'Grenade lobée — adaptation',damage:c.moves.special.damage,cost:1,speed:5,vy:-10,life:80,height:138,reach:900,
          counterplay:'Arc haut et grenade à délai visible ; se déplacer hors de la zone ou punir la préparation.'};
        c.moves.super={...c.moves.super,cost:3,
          counterplay:'Trois grenades réelles et 50 points de jauge ; arcs et délais visibles, réserve de trois requise. Éviter la zone ou punir la préparation.'};
        c.counterplay=[c.moves.special.counterplay,c.moves.specialDown.counterplay,c.moves.specialForward.counterplay,c.moves.specialBack.counterplay];
        c.scope='Red Blaster de MG2 MSX2 original : grenades tirées depuis un couvert et fils qui immobilisent. Le modèle précis du lance-grenades reste indéterminé. Arcs, fusées temporisées, réserve de dix, fil posé destructible, ralentissement et repli sont des adaptations au versus. Aucun pistolet, roller ni C4 télécommandé attribué au personnage.';
        c.sources=[...new Set([...(c.sources||[]),'redblaster_msx2_grenades_wires_pass6'])];
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
  const pain={family:'ballistic',basis:'The Pain de MGS3 PS2 original, première phase avec cagoule : frelons, écran et repli. Conclusions adaptées au versus ; aucun pouvoir de lévitation attribué à cette incarnation.',
    names:['Nuée de frelons — conclusion adaptée','Écran de frelons — conclusion adaptée','Essaim rapide — conclusion adaptée','Repli de The Pain — conclusion adaptée'],
    families:['ballistic','ballistic','ballistic','cqc'],
    phases:[['aim','volley','impact','pose'],['bait','lock','confirm','pose'],['aim','volley','impact','pose'],['approach','grapple','impact','fall']],
    descriptions:[
      'Après la victoire, une nuée visible suit le geste de la main et ferme un axe. Mise en scène de versus à partir des frelons ; la cible reste au sol, sans télékinésie ni nouvelle technique canonique.',
      'L’écran de frelons se rassemble devant The Pain, puis se disperse lorsque la victoire est confirmée. Conclusion de versus du costume masqué, sans lévitation ni arme à feu matérielle ajoutée.',
      'Un essaim visible accompagne un geste rapide de la main. Conclusion adaptée au versus pour le costume masqué ; la phase Bullet Bee à visage découvert n’est pas représentée.',
      'Un contrôle rapproché puis un repli concluent la victoire. Contact et projection sont une chorégraphie de versus, sans force mentale ni fait canonique supplémentaire.']};
  const red={family:'explosive',basis:'Red Blaster de MG2 MSX2 original : grenades depuis un couvert et fils d’immobilisation. Modèle exact du lance-grenades indéterminé ; conclusions, arcs et délais adaptés au versus.',
    names:['Grenade — conclusion adaptée','Fil d’immobilisation — conclusion adaptée','Grenade lobée — conclusion adaptée','Repli du grenadier — conclusion adaptée'],
    families:['explosive','trap','explosive','explosive'],
    phases:[['aim','arc','blast','pose'],['bait','lock','confirm','pose'],['aim','arc','blast','pose'],['aim','arc','blast','clear']],
    descriptions:[
      'Après la victoire, une grenade visible décrit un arc puis explose après son délai. Conclusion propre au versus ; aucune pose de C4 ni commande de détonation à distance.',
      'Un fil visible ferme brièvement un passage et confirme la victoire par immobilisation. Mise en scène adaptée des fils de MG2 ; le dispositif ne provoque aucune explosion.',
      'Une grenade visible suit un arc haut avant une explosion à délai. Trajectoire et durée adaptées au versus, sans charge télécommandée ni nouveau modèle d’arme canonique.',
      'Le grenadier quitte l’axe après un lancer visible ; l’explosion suit le délai de la grenade. Conclusion de versus après la victoire, sans télécommande, pistolet ou rollers.']};
  const sourceSlot={neutral:'special',down:'specialDown',forward:'specialForward',back:'throw'};
  function applyFinishers(catalog,fighters=[]){
    if(!catalog?.profiles)return [];
    const changed=[];
    for(const uid of reviewedUIDs){
      const original=catalog.profiles[uid];if(!original)continue;
      const fighter=fighters.find(f=>f.uid===uid),combat=fighter?.combat;
      const patch=uid==='core__pain'?pain:uid==='core__redblaster_mg2'?red:null;
      const profile=JSON.parse(JSON.stringify(original));
      if(patch){profile.family=patch.family;profile.basis=patch.basis;profile.evidence='adaptation';}
      if(fighter?.visual)profile.visual=JSON.parse(JSON.stringify(fighter.visual));
      profile.finishers=profile.finishers.map((fin,index)=>{
        const next={...fin};
        if(patch)Object.assign(next,{name:patch.names[index],family:patch.families[index],description:patch.descriptions[index],loreBasis:patch.basis,phases:[...patch.phases[index]],canonical:false,evidence:'adaptation'});
        const selected=uid==='core__pain'&&fin.slot==='down'?'specialDown':uid==='core__redblaster_mg2'&&fin.slot==='back'?'specialBack':sourceSlot[fin.slot];
        const sourceMoves=uid==='core__pain'&&fin.slot==='back'?[combat?.moves?.throw?.name,combat?.moves?.specialBack?.name]:uid==='core__redblaster_mg2'&&fin.slot==='down'?[combat?.moves?.specialDown?.name]:[combat?.moves?.super?.name,combat?.moves?.[selected]?.name];
        if(sourceMoves.every(n=>typeof n==='string'&&n.trim())){
          if(!patch){
            let description=next.description;
            for(let i=0;i<(next.sourceMoves||[]).length;i++)if(sourceMoves[i])description=description.split(next.sourceMoves[i]).join(sourceMoves[i]);
            next.description=description;
          }
          next.sourceMoves=[...new Set(sourceMoves)];
        }else if(patch){
          const painSources=[['Nuée de The Pain','Essaim de frelons'],['Écran de frelons'],['Essaim rapide — adaptation'],['Projection','Repli de l’essaim']];
          const redSources=[['Barrage rouge','Grenade du tireur'],['Fil d’immobilisation — adaptation'],['Grenade lobée — adaptation'],['Grenade du tireur','Repli du tireur']];
          next.sourceMoves=[...(uid==='core__pain'?painSources:redSources)[index]];
        }
        return next;
      });
      catalog.profiles[uid]=profile;changed.push(uid);
    }
    // familyCounts describes profiles (354), not all four finishers (1,416).
    catalog.familyCounts=Object.values(catalog.profiles).reduce((counts,p)=>{counts[p.family]=(counts[p.family]||0)+1;return counts;},{});
    return changed;
  }
  function finisherPose(uid,fin,phase,pose={},t=0){
    if(uid!=='core__pain'&&uid!=='core__redblaster_mg2')return pose;
    if(fin?.id&&!fin.id.startsWith(uid+'::'))return pose;
    const phases=Array.isArray(fin?.phases)?fin.phases:[];
    const phaseIndex=Math.max(0,phases.indexOf(phase));
    const within=Math.max(0,Math.min(1,Math.max(0,Math.min(1,Number.isFinite(t)?t:0))*Math.max(1,phases.length)-phaseIndex));
    const startup=['aim','bait','approach'].includes(phase),recovery=['pose','fall','clear'].includes(phase);
    const moveSlot=uid==='core__pain'?(fin?.slot==='down'?'specialDown':fin?.slot==='forward'?'specialForward':fin?.slot==='back'?'throw':'super'):(fin?.slot==='down'?'specialDown':fin?.slot==='forward'?'specialForward':'special');
    return {...pose,hit:false,ko:false,attack:!startup&&!recovery,guard:false,walk:false,
      moveSlot,animationActive:true,attackPhase:startup?'startup':recovery?'recovery':'active',phaseProgress:within,actionTime:0,attackTime:0,
      finisherUid:uid,finisherSlot:fin?.slot,finisherPhase:phase,finisherProgress:t};
  }
  const api={apply,applyFinishers,finisherPose,slots,reviewedUIDs};root.CQC_PASS6_COMBAT_FIDELITY=api;
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
