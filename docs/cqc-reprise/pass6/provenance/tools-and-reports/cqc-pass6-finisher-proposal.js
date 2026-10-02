/* Proposal only: root may merge these functions into its PASS6 runtime helper.
 * Historical JSON/inline catalogs remain byte-exact. All conclusions are authored
 * versus staging after the duel has been won, never additional canonical moves. */
(function(root){'use strict';
  const reviewedUIDs=['core__pain','core__fear','core__end','core__fury','core__dirtyduck','core__redblaster_mg2'];
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
  const api={applyFinishers,finisherPose,reviewedUIDs};root.CQC_PASS6_FINISHER_PROPOSAL=api;
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
