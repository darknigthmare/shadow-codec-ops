/* Proposed PASS9 adapter. Four exact MSX2 UIDs; historical profiles stay intact.
 * Illustrated motions, numerical balance and resource counts are adaptations.
 * Requires the prepared native catalog and typed measured source points.
 */
(function(root){'use strict';
  const reviewedUIDs=['core__runner_mg2','core__ninja_mg2','core__redblaster_mg2','core__jungle_evil'];
  const clone=v=>JSON.parse(JSON.stringify(v));
  const incompatible=['speed','life','height','count','interval','fuse','radius','vy','gravity','homing','bounces','returnAt','status','potency','buff','target','blink','selfDamage','launchSelf','projectileOrigin','groundObjectOrigin','projectileOverride','travel','lowProfile','duration','arm','maxTraps','hp','remoteOnly','launch','requiresStagger','restoreEnergy','restoreOnParry','heal','telegraph','parryMode','disarm','pass9Wire','restore'];
  function move(old,changes){const m={...old};for(const k of incompatible)delete m[k];return {...m,...changes};}
  const movement=(old,name,travel,cost=0)=>move(old,{name,kind:'mobility',tag:'movement',damage:0,reach:0,level:'mid',travel,cost,meter:0,active:12,lowProfile:true,
    counterplay:'Déplacement visible et borné du versus ; collision conservée, saut ou approche pour punir la préparation ou la sortie. Aucune invulnérabilité.'});
  const recover=(old,name,restore)=>move(old,{name,kind:'recover',tag:'recovery',damage:0,reach:0,cost:0,meter:0,restore,
    counterplay:'Pause interrompable avant restauration de la réserve du versus ; aucun soin, armure ou pouvoir ajouté.'});
  function origins(entry,marks,action,kind){
    if(!entry||entry.mirror!==false||!marks||!action)throw Error('Missing exact PASS9 source entry/marks: '+action);
    const out={};
    for(const [side,face]of [['right',1],['left',-1]]){
      const mark=marks[side],frames=entry.facing===face?entry.actions:entry.oppositeActions,frame=mark&&frames?.[action]?.frames?.[mark.frame];
      if(!frame||mark.action!==action||mark.pointKind!==kind||mark.physicallyViewed!==true||mark.sourcePixelAlpha<=80||
        !Number.isInteger(mark.frame)||entry.phaseMap?.[action]?.active?.[0]!==mark.frame||frame.file!==mark.file||frame.sha256!==mark.sha256||
        JSON.stringify(frame.rect)!==JSON.stringify(mark.rect)||JSON.stringify(frame.pivot)!==JSON.stringify(mark.pivot)||
        entry.sourceFrameHeights?.[frame.file]!==mark.sourceFrameHeight||mark.engineBodyScale!==1.12||
        !Array.isArray(mark.point)||mark.point.length!==2||!mark.point.every(Number.isFinite))throw Error('Invalid typed native origin: '+entry.uid+'/'+action+'/'+side);
      const [x,y,w,h]=frame.rect,[sx,sy]=mark.point,px=x+w*frame.pivot[0],py=y+h*frame.pivot[1],scale=entry.displayHeight/mark.sourceFrameHeight*1.12;
      const forward=(sx-px)*face*scale,height=(py-sy)*scale;
      if(sx<x||sx>=x+w||sy<y||sy>=y+h||!Number.isFinite(forward)||!Number.isFinite(height)||forward<0||forward>220||height<=0||height>330)throw Error('Native origin outside renderer/engine contract');
      out[face]={forward,height};
    }
    return out;
  }
  const routes={
    core__runner_mg2:{},
    core__ninja_mg2:{shoot:{slots:['special','super'],kind:'native-visible-star-release-hand'}},
    core__redblaster_mg2:{shoot:{slots:['special','specialForward','super'],kind:'qualified-native-hand-grenade-release'}},
    core__jungle_evil:{shoot:{slots:['special','super'],kind:'native-visible-firearm-muzzle'}}
  };
  function apply(fighters,catalog=root.CQC_COMBAT_SPRITE_CATALOG,anchorDocument=root.CQC_PASS9_NATIVE_ORIGINS){
    const anchors=anchorDocument?.entries||anchorDocument,changed=[];
    for(const uid of reviewedUIDs){
      const index=fighters.findIndex(f=>f.uid===uid);if(index<0)continue;
      const entry=catalog?.entries?.[uid];if(!entry)throw Error('PASS9 catalog must be imported before adapter: '+uid);
      const f=clone(fighters[index]),c=f.combat,m=c.moves;
      if(uid==='core__runner_mg2'){
        f.visual={...f.visual,weapon:'fists',primary:'#687b5b',accent:'#697470',pouches:0,pads:false,holster:false,back:null};
        c.key='brawler';c.weapon='fists';c.role='Course et contact sans arme';
        m.special=movement(m.special,'Sprint visible — adaptation',10,15);
        m.specialForward=move(m.specialForward,{name:'Contact en course — adaptation',kind:'melee',tag:'strike',damage:600,reach:100,travel:8,cost:16,level:'mid'});
        m.super=move(m.super,{name:'Charge en course — adaptation',kind:'melee',tag:'strike',damage:2100,reach:193,travel:3,meter:50,cost:0,level:'mid'});
        m.utility=recover(m.utility,'Reprendre son souffle — adaptation',28);
        c.scope='Running Man de Metal Gear2 MSX2 original1990 : silhouette verte/grise et course à mains nues. Aucune arme personnelle ni point de lancement. Groupe natif shoot = sprint, charge = course/contact, recover = reprise stationnaire. Frappes, garde, saisies, parade, collision, jauge et réserve sont des adaptations du versus ; aucun gaz émis par le personnage ni mine placée.';
      }else if(uid==='core__ninja_mg2'){
        f.visual={...f.visual,weapon:'shuriken',primary:'#9fa7a7',accent:'#183e43',outfit:'flex-armor',pouches:0,pads:false,holster:false,back:null};
        c.key='msx2_star_ninja';c.weapon='shuriken';c.role='Étoiles et esquive visible';
        c.resource={...c.resource,kind:'ammo',label:'ÉTOILES — VERSUS',max:8,regen:0};
        m.light=move(m.light,{name:'Poing — adaptation',kind:'melee',tag:'strike',reach:76,cost:0});
        m.heavy=move(m.heavy,{name:'Frappe engagée — adaptation',kind:'melee',tag:'strike',reach:128,cost:0});
        m.special=move(m.special,{name:'Étoile lancée à la main — adaptation',kind:'projectile',tag:'shuriken',speed:16,life:64,damage:460,reach:900,level:'high',cost:1,count:1});
        m.specialDown=move(m.specialDown,{name:'Frappe corporelle — adaptation',kind:'melee',tag:'strike',damage:720,reach:118,cost:0,level:'mid'});
        m.specialForward=movement(m.specialForward,'Esquive visible vers l’avant — adaptation',5,0);m.specialForward.cooldown=120;
        m.specialBack=movement(m.specialBack,'Esquive visible vers l’arrière — adaptation',-7,0);
        m.super=move(m.super,{name:'Trois étoiles — adaptation',kind:'projectile',tag:'shuriken',damage:650,reach:1050,speed:16,life:64,count:3,interval:6,cost:3,meter:50,active:1,
          counterplay:'Trois étoiles consomment trois unités de la réserve du versus ; préparation et sortie punissables, saut/garde haute/parade. Nombre et cadence ne sont pas des données originales.'});
        m.utility=recover(m.utility,'Reprendre la réserve d’étoiles — adaptation',4);
        c.scope='Black Color / Kyle Schneider de Metal Gear2 MSX2 original1990 : armure souple grise/cyan sombre et étoiles lancées à la main. Détails fins et modèle exact d’étoile non prouvés. Aucun katana, arme à feu, exosquelette de Gray Fox, énergie Zandatsu ou invisibilité. Déplacements deploy restent visibles et bornés ; corps à corps, réserve de huit, trois étoiles du super, récupération, collisions et durées sont des adaptations du versus.';
      }else if(uid==='core__redblaster_mg2'){
        f.visual={...f.visual,weapon:'grenade',primary:'#187331',accent:'#253925',pouches:0,pads:false,holster:false,back:null};
        c.key='msx2_grenade';c.weapon='grenade';c.role='Grenades à la main et posture basse';c.resource={...c.resource,label:'GRENADES — VERSUS'};
        const grenade={kind:'projectile',tag:'explosive',projectileOverride:'grenade',speed:7,life:80,vy:-6,gravity:.4,fuse:48,radius:75,level:'mid',cost:1,count:1,damage:520,reach:900};
        m.special=move(m.special,{...grenade,name:'Grenade à la main — adaptation',counterplay:'Arc visible, délai puis explosion ; déplacement, garde ou punition du lancer. Modèle et geste exacts non certifiés.'});
        m.specialForward=move(m.specialForward,{...grenade,name:'Grenade lobée à la main — adaptation',vy:-10,speed:5,counterplay:'Arc haut visible avec délai ; quitter la zone ou punir le lancer. Adaptation, sans lance-grenades matériel inventé.'});
        m.specialDown=movement(m.specialDown,'Posture basse stationnaire — adaptation',0,0);m.specialDown.startup=12;m.specialDown.recovery=24;
        m.specialDown.counterplay='Posture basse visible du versus, touchable et sans dégâts ; saut ou approche pour punir la préparation/sortie. Aucun fil, piège, explosion ou arme déduit du segment blanc ambigu.';
        m.specialBack=movement(m.specialBack,'Repli visible — adaptation',-7,0);
        m.super=move(m.super,{...grenade,name:'Trois grenades à la main — adaptation',damage:650,count:3,interval:6,cost:3,meter:50,speed:7,vy:-8,
          counterplay:'Trois unités de réserve et50points de jauge ; trois arcs/délais adaptés au versus, préparation et récupération punissables.'});
        m.utility=recover(m.utility,'Reprendre la réserve de grenades — adaptation',4);
        c.scope='Red Blaster de Metal Gear2 MSX2 original1990 : grenades et fils d’immobilisation documentés, tenue verte et bottes sombres. Exact mécanisme de tir original non résolu ; les PNG retenus en combat montrent un lancer à la main. Cdeploy reste conservé uniquement comme preuve de source avec segment blanc fil/lame/poignée ambigu ; aucune route active ne l’utilise. Down emploie A crouch8/9, sans dégâts, objet posé ou pouvoir. Aucune certification de lance-grenades, couteau, pistolet, rollers, C4 ou télécommande. Lancer à la main, posture basse, réserve, trois grenades du super et récupération sont des adaptations qualifiées du versus.';
      }else{
        f.visual={...f.visual,weapon:'rifle',primary:'#5c7554',accent:'#253025',pouches:0,pads:false,holster:false,back:null};
        c.key='msx2_conventional_longgun';c.weapon='rifle';c.role='Arme longue conventionnelle et déplacement bas visible';c.resource={...c.resource,label:'MUNITIONS — VERSUS'};
        m.special=move(m.special,{name:'Tir conventionnel — adaptation',kind:'projectile',tag:'ballistic',damage:460,reach:900,speed:21,life:64,level:'high',cost:1,count:1,
          counterplay:'Tir annoncé, garde haute/accroupissement/saut/parade ; marque, calibre, cadence et effets exacts de l’arme originale non prouvés.'});
        m.specialDown=movement(m.specialDown,'Déplacement bas visible — adaptation',2,0);
        m.specialBack=movement(m.specialBack,'Repli bas visible — adaptation',-3,0);
        m.specialForward=move(m.specialForward,{name:'Contact corporel — adaptation',kind:'melee',tag:'strike',travel:7,damage:600,reach:100,level:'mid',cost:0});
        m.super=move(m.super,{name:'Six tirs conventionnels — adaptation',kind:'projectile',tag:'ballistic',damage:360,reach:1050,speed:21,life:62,count:6,interval:6,cost:6,meter:50,active:1,
          counterplay:'Six unités de la réserve du versus et50points de jauge ; préparation longue, garde/saut/parade. Nombre et cadence adaptés, pas certifiés comme mode de tir original.'});
        m.utility=move(m.utility,{name:'Reprendre la réserve — adaptation',kind:'reload',tag:'reload',damage:0,reach:0,cost:0,meter:0,
          counterplay:'Manipulation visible interrompable avant restauration de la réserve du versus ; modèle et alimentation de l’arme non prouvés.'});
        c.scope='PREDATOR du manuel japonais Metal Gear2 MSX2 original1990, alias runtime JUNGLE EVIL : guérillero humain vert/sombre et arme longue conventionnelle. Modèle, calibre, alimentation et mode de tir non résolus. Aucune grenade, flamme, plasma, laser ou invisibilité. Groupe deploy = déplacement bas toujours visible, sans lancement. Tirs, réserve de douze, six tirs du super, gestion de réserve, contacts et collisions sont des adaptations du versus.';
      }
      c.basis=c.scope;c.evidence='adaptation';c.sourceFidelityStatus='closest_supported';c.absolute1to1Certified=false;
      f.role=c.role;c.incarnation='METAL GEAR2 MSX2 ORIGINAL1990 / '+(uid==='core__ninja_mg2'?'BLACK COLOR — KYLE SCHNEIDER':uid==='core__jungle_evil'?'PREDATOR / JUNGLE EVIL':uid==='core__runner_mg2'?'RUNNING MAN':'RED BLASTER');
      c.counterplay=['special','specialDown','specialForward','specialBack'].map(k=>m[k].counterplay);
      c.sources=[...new Set([...(c.sources||[]),'original_msx2_reference_contract_pass9'])];
      for(const [action,route]of Object.entries(routes[uid])){
        if(!route.slots.every(slot=>entry.actionMap[slot]===action))throw Error('Source/action mismatch for '+uid+'/'+action);
        const point=origins(entry,anchors?.[uid]?.[action],action,route.kind);
        for(const slot of route.slots)m[slot][route.ground?'groundObjectOrigin':'projectileOrigin']=clone(point);
      }
      fighters[index]=f;changed.push(uid);
    }
    return changed;
  }
  const finisherPlan={core__runner_mg2:{family:'cqc',slots:['super','specialDown','specialForward','throw']},core__ninja_mg2:{family:'ballistic',slots:['super','specialDown','special','specialBack']},core__redblaster_mg2:{family:'explosive',slots:['super','specialDown','specialForward','specialBack']},core__jungle_evil:{family:'ballistic',slots:['super','specialDown','special','specialBack']}};
  function applyFinishers(catalog,fighters=[]){
    if(!catalog?.profiles)return [];
    const changed=[];
    for(const uid of reviewedUIDs){
      const old=catalog.profiles[uid],f=fighters.find(x=>x.uid===uid);if(!old||!f)continue;
      const plan=finisherPlan[uid],profile=clone(old);Object.assign(profile,{family:plan.family,basis:f.combat.scope,evidence:'adaptation',visual:clone(f.visual)});
      profile.finishers=profile.finishers.map((fin,index)=>{
        const slot=plan.slots[index],m=f.combat.moves[slot],family=m.kind==='projectile'?(m.tag==='explosive'?'explosive':'ballistic'):m.kind==='trap'?'trap':m.kind==='mobility'?'tactical':'cqc';
        return {...fin,name:m.name+' — conclusion adaptée',family,canonical:false,evidence:'adaptation',description:'Conclusion de versus après la victoire à partir de '+m.name+'. Chorégraphie créée ; aucun pouvoir, invisible camouflage ou nouvelle arme canonique.',loreBasis:f.combat.scope,sourceMoves:[m.name],phases:m.kind==='projectile'?['prepare','release','confirm','pose']:m.kind==='trap'?['prepare','place','confirm','pose']:m.kind==='mobility'?['prepare','move','confirm','pose']:['approach','contact','confirm','pose']};
      });catalog.profiles[uid]=profile;changed.push(uid);
    }
    catalog.familyCounts=Object.values(catalog.profiles).reduce((counts,p)=>{counts[p.family]=(counts[p.family]||0)+1;return counts;},{});
    return changed;
  }
  function finisherPose(uid,fin,phase,pose={},t=0){
    if(!reviewedUIDs.includes(uid)||fin?.id&&!fin.id.startsWith(uid+'::'))return pose;
    const index=['neutral','down','forward','back'].indexOf(fin?.slot);if(index<0)return pose;
    const phases=fin.phases||[],phaseIndex=Math.max(0,phases.indexOf(phase)),within=Math.max(0,Math.min(1,(Number.isFinite(t)?t:0)*Math.max(1,phases.length)-phaseIndex));
    return {...pose,hit:false,ko:false,guard:false,walk:false,moveSlot:finisherPlan[uid].slots[index],animationActive:true,attackPhase:['prepare','approach'].includes(phase)?'startup':['pose','confirm'].includes(phase)?'recovery':'active',phaseProgress:within,actionTime:0,attackTime:0};
  }
  const api={apply,origins,routes,reviewedUIDs,applyFinishers,finisherPose,hasSourceFinisher:uid=>reviewedUIDs.includes(uid),cloakAlpha:uid=>reviewedUIDs.includes(uid)?1:null,sourceStatus:'closest_supported',absolute1to1Certified:false};
  root.CQC_PASS9_COMBAT_FIDELITY=api;if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
