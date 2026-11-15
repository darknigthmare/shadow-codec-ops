/* Runtime correction only. Historical roster/profiles and story archives remain intact. */
(function(root){'use strict';
  const source={title:'Ghost Babel — combat de Black Arts Viper (captures du jeu)',
    url:'https://lparchive.org/Metal-Gear-Ghost-Babel/Update%2040/',
    scope:'Fils à hauteur du torse, évitables accroupi ; mines retardées visant une position stationnaire ; retrait après impact.'};
  const uid='core__viper';
  const move=(slot,name,kind,startup,active,recovery,damage,reach,extra={})=>({
    id:uid+'::'+slot,slot,name,kind,startup,active,recovery,damage,reach,
    level:'mid',cost:0,meter:0,cooldown:0,tag:'tactical',lore:'adaptation',
    counterplay:'Interrompre la préparation visible et quitter la zone annoncée.',...extra});
  function apply(fighters){
    const index=fighters.findIndex(f=>f.uid===uid);if(index<0)return false;
    const f=JSON.parse(JSON.stringify(fighters[index])),c=f.combat;
    f.role='FILS ET MINES RETARDÉES';f.archetype='trapper';
    f.visual={...f.visual,weapon:'fists',primary:'#aaada9',secondary:'#393b40',hair:'long',hairColor:'#302e37',headgear:null};
    c.key='viper_wire_mines';c.role='Pièges de fils et mines sur position déjà stationnaire';c.evidence='adaptation';
    c.basis='Ghost Babel : Viper pose des fils entre ancrages et des mines retardées. Aucun fusil, monoculaire vert ni projectile de bras n’est attribué à cette incarnation.';
    c.sources=['viper_canonical_reprise'];
    c.scope='Fils, esquive accroupie et délai des mines tirés des captures du jeu. Échelle, ressources et commandes adaptés au versus 2D.';
    c.limitations=['Les mines ciblent une position déjà immobile et restent signalées avant armement.',
      'Les fils se contournent ou s’évitent accroupi ; tous les dispositifs sont visibles et destructibles.',
      'Aucun fusil ajouté ni tir de prothèse ; mouvements de corps à corps et gestion de réserve sont des adaptations du versus.'];
    c.resource={kind:'energy',label:'DISPOSITIFS',max:100,regen:.14};
    c.passive={id:'viper_traps',name:'Réseau annoncé',desc:'Le fil coupe uniquement la hauteur du torse. Une mine visant un arrêt passé laisse 110 images pour quitter la position.',guardRegen:.12};
    c.moves.special=move('special','Fil entre ancrages','trap',28,1,30,420,150,
      {tag:'wire',level:'high',cost:20,arm:28,duration:420,hp:180,maxTraps:2,cooldown:80,
       counterplay:'S’accroupir sous le fil, quitter son segment, interrompre la pose ou détruire un ancrage au contact.'});
    c.moves.specialDown=move('specialDown','Mine — arrêt observé','stationaryMine',30,1,30,620,90,
      {tag:'mine',cost:30,arm:110,duration:400,hp:180,maxTraps:2,cooldown:120,requiresStillFrames:60,
       counterplay:'La cible doit avoir été immobile 60 images. Après le signal de pose, bouger pendant les 110 images d’armement ou détruire la mine.'});
    c.moves.specialForward=move('specialForward','Fil avancé','trap',24,1,32,460,120,
      {tag:'wire',level:'high',cost:25,arm:24,duration:360,hp:180,maxTraps:2,cooldown:95,
       counterplay:'Garde ou accroupissement sous le fil visible ; sortir du segment, interrompre la préparation ou casser l’ancrage.'});
    c.moves.specialBack=move('specialBack','Repli vers l’angle','mobility',9,18,25,0,0,
      {tag:'movement',cost:15,travel:-10,cooldown:120,counterplay:'Repli fini de 180 px : aucune invulnérabilité, poursuite et punition possibles.'});
    c.moves.utility=move('utility','Préparer les dispositifs','recover',46,1,24,0,0,
      {tag:'recovery',restore:24,cooldown:180,counterplay:'Gestion de réserve adaptée au versus : une frappe avant l’activation interrompt la préparation.'});
    c.moves.super=move('super','Champ de mines retardées','stationaryMine',42,1,38,980,110,
      {tag:'mine',cost:35,meter:75,arm:110,duration:400,hp:240,maxTraps:2,cooldown:210,requiresStillFrames:45,
       counterplay:'Un arrêt déjà observé est nécessaire. La position annoncée reste esquivable pendant 110 images ; pas de dégâts à distance avant collision.'});
    fighters[index]=f;return true;
  }
  function applyFinishers(catalog){
    const old=catalog?.profiles?.[uid];if(!old)return false;
    const profile=JSON.parse(JSON.stringify(old));
    profile.basis='Conclusions adaptées au versus à partir des fils, mines retardées et retraits de Ghost Babel.';
    const names=['Fil de sortie','Mine retardée','Angles de Galuade','Retrait du maître'];
    const descriptions=[
      'Après la victoire, la caméra suit un segment de fil annoncé puis le retrait de Viper. Conclusion propre au versus ; aucun laser ni fusil ajouté.',
      'Une position est signalée, une mine s’arme avec retard et conclut la séquence déjà gagnée. Conclusion adaptée au versus, pas une technique canonique supplémentaire.',
      'Les ancrages visibles ferment un axe tandis que Viper change de position. Mise en scène de ses pièges, adaptée au duel.',
      'Viper quitte l’axe de confrontation après confirmation de la victoire. Une conclusion de versus qui conserve sa tactique de retrait.'
    ];
    profile.finishers=profile.finishers.map((fin,i)=>({...fin,name:names[i],family:'trap',
      description:descriptions[i],loreBasis:profile.basis,sourceMoves:i===1?['Mine — arrêt observé']:['Fil entre ancrages','Repli vers l’angle'],
      phases:i===1?['bait','lock','impact','clear']:['approach','lock','confirm','clear'],canonical:false,evidence:'adaptation'}));
    catalog.profiles[uid]=profile;return true;
  }
  root.CQC_CANONICAL_COMBAT_REPRISE={apply,applyFinishers,source,uid};
  if(typeof module!=='undefined'&&module.exports)module.exports=root.CQC_CANONICAL_COMBAT_REPRISE;
})(typeof globalThis!=='undefined'?globalThis:this);
