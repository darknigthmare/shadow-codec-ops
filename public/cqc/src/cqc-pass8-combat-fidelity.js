/* Original-incarnation corrections for the thirteen confirmed PASS8 versions.
 * Historical raw profiles remain preserved. Native art and match choreography are
 * closest_supported adaptations; no absolute reproduction certificate is claimed.
 */
(function(root){'use strict';
  const beauty=['archive__laughing_beauty','archive__raging_beauty','archive__crying_beauty','archive__screaming_beauty'];
  const support=['roster50__sunny_mgs4','roster50__sunny_mgr','archive__paz','npc53__paz_gz'];
  const beasts=['core__laughing_octopus','core__raging_raven','core__crying_wolf','core__screaming_mantis'];
  const reviewedUIDs=[...beasts,...beauty,...support,'core__eva_mgs3'];
  const clone=v=>JSON.parse(JSON.stringify(v));
  const slots={core__raging_raven:{shoot:['special'],deploy:['specialDown'],charge:['super']},
    core__crying_wolf:{shoot:['special'],charge:['super']},
    core__eva_mgs3:{shoot:['special','super'],deploy:['specialDown']}};
  const hair={archive__laughing_beauty:['short-asymmetric-bob','#c7b693'],archive__raging_beauty:['long-tied','#26221f'],
    archive__crying_beauty:['shoulder-length-with-bangs','#211d1b'],archive__screaming_beauty:['short-swept-back','#24211f']};
  const forbidden=['speed','life','height','count','interval','fuse','radius','vy','gravity','homing','bounces','returnAt','status','potency','buff','target','blink','selfDamage','launchSelf','projectileOrigin'];
  function move(old,changes){const value={...old};for(const key of forbidden)delete value[key];return Object.assign(value,changes);}
  function recovery(old,name,restore=28,cost=0,meter=0){const value=move(old,{name,kind:'recover',tag:'recovery',damage:0,reach:0,restore,cost,meter,
    counterplay:'Pause interrompable avant récupération de la réserve ; aucun soin, projectile ou pouvoir offensif.'});delete value.travel;delete value.lowProfile;return value;}
  function displacement(old,name,travel,cost=0){return move(old,{name,kind:'mobility',tag:'movement',damage:0,reach:0,travel,cost,lowProfile:true,
    counterplay:'Déplacement rapproché borné, sans invincibilité ; poursuivre ou punir la sortie.'});}
  function origins(entry,marks,action){
    if(!entry||!marks)return null;
    for(const [side,face]of [['right',1],['left',-1]]){
      const mark=marks[side],actions=entry.facing===face?entry.actions:entry.oppositeActions,frame=actions?.[action]?.frames?.[mark?.frame];
      if(!frame||mark.file!==frame.file||mark.sha256!==frame.sha256||mark.pointKind!=='native-visible-firearm-muzzle')return null;
    }
    return root.CQC_PASS7_COMBAT_FIDELITY?.origins(entry,marks,action)||null;
  }
  function apply(fighters,catalog=root.CQC_COMBAT_SPRITE_CATALOG,anchors=root.CQC_PASS8_NATIVE_ORIGINS){
    const changed=[];
    for(const uid of reviewedUIDs){
      const index=fighters.findIndex(f=>f.uid===uid);if(index<0)continue;
      const f=clone(fighters[index]),c=f.combat,m=c.moves;
      f.visual={...f.visual,aura:null,insignia:null,signature:false};
      c.sources=[...new Set([...(c.sources||[]),'original_incarnation_reference_contract_pass8'])];
      if(beauty.includes(uid)){
        const [style,color]=hair[uid];
        f.visual={...f.visual,hair:style,hairColor:color,outfit:'mgs4-opaque-beauty-suit',primary:'#777363',secondary:'#333631',accent:'#96988c',
          weapon:'fists',back:null,headgear:null,pouches:0,holster:false,pads:false,material:'segmented-suit',boots:'integrated-suit-feet',collar:'closed'};
        c.weapon='fists';c.key='unarmed_beauty';c.role='Forme Beauty — approche et saisie';
        c.basis='Forme humaine de MGS4 original, combinaison opaque et mains vides. Approche et étreinte observées ; frappes, garde et esquive adaptées au versus.';
        c.resource={...c.resource,kind:'stamina',label:'EFFORT',max:100,regen:.16};
        m.special={...m.special,name:'Étreinte — adaptation rapprochée',kind:'melee',tag:'grapple',level:'throw',reach:82};
        m.specialDown={...m.specialDown,name:'Se dégager au sol — adaptation',tag:'strike'};
        m.super={...m.super,name:'Sortie de l’étreinte — adaptation',tag:'strike',cost:24};
        c.scope=c.basis+' Aucun armement de la forme Beast, tentacule, railgun, aile, poupée, aura ou pouvoir mental hérité. Dommages, commandes et chorégraphies sont adaptés au versus.';
      }else if(support.includes(uid)){
        const sunny=uid.startsWith('roster50__sunny'),mgr=uid==='roster50__sunny_mgr',gz=uid==='npc53__paz_gz';
        f.visual={...f.visual,body:sunny?'child':'adult',weapon:'none',back:null,pouches:0,holster:false,pads:false,material:'cloth',
          hair:sunny?'short-bob':gz?'very-short-cropped':'short-wavy',hairColor:sunny?'#c5c5c1':'#bba672',headgear:null,scarf:null};
        if(sunny)Object.assign(f.visual,{outfit:mgr?'sunny-solis-workwear':'sunny-nomad-kitchen',barretteSide:'anatomical-left',
          gloves:mgr,boots:mgr?'dark-work-shoes':'source-shoes',primary:mgr?'#ac9f73':'#222325',accent:mgr?'#58673e':'#dfdfd9'});
        else Object.assign(f.visual,{outfit:gz?'ground-zeroes-prisoner':'peace-walker-navy-school-blazer',gloves:false,boots:gz?'barefoot':'dark-school-shoes',primary:gz?'#a7a393':'#303943'});
        c.weapon='none';c.key=sunny?'support_sunny':'unarmed_paz';c.role=sunny?'Soutien technique — simulation bonus':'Version narrative — simulation bonus';
        c.evidence='simulation';c.resource={...c.resource,kind:'stamina',label:sunny?'CONCENTRATION':'EFFORT',max:100,regen:.16};
        c.passive={id:'cautious',name:'Simulation de soutien',desc:'Rôle narratif prioritaire, garde et déplacements adaptés au versus ; aucune arme ou capacité offensive ajoutée.',guardRegen:.18,observeMovement:true};
        for(const key of ['light','heavy','low','throw']){
          m[key]=move(m[key],{name:{light:'Geste de protection — simulation',heavy:'Repousser — simulation',low:'Se dégager bas — simulation',throw:'Écarter la menace — simulation'}[key],
            kind:'melee',tag:key==='throw'?'grapple':'strike',level:key==='throw'?'throw':key==='low'?'low':'mid',damage:sunny?160:key==='heavy'?400:250,
            reach:key==='throw'?65:90,cost:0,lore:'simulation'});
        }
        m.special=recovery(m.special,sunny?'Reprendre la concentration — simulation':'Reprendre appui — simulation',24,12);
        m.specialDown=move(m.specialDown,{name:'Observer une trace visible — simulation',kind:'observe',tag:'recon',damage:0,reach:380,duration:120,cost:10,
          counterplay:'Lecture de déplacement déjà visible, à portée limitée ; aucun contrôle des commandes, soin médical ou piratage offensif universel.'});
        m.specialForward=displacement(m.specialForward,'Écart prudent — simulation',4,14);
        m.specialBack=displacement(m.specialBack,'Repli prudent — simulation',-7,14);
        m.super=recovery(m.super,sunny?(mgr?'Coordination Solis — simulation':'Travail FOXALIVE — simulation'):'Retrouver son calme — simulation',50,0,50);
        m.utility=recovery(m.utility,'Pause — simulation',28);
        c.basis=sunny?(mgr?'Sunny dans Revengeance, enfant ingénieure chez Solis.':'Sunny dans MGS4, enfant programmeuse à bord du Nomad, tenue de cuisine.'):
          gz?'Paz adulte dans Ground Zeroes, captive de Camp Omega.':'Paz adulte dans Peace Walker, uniforme de cette incarnation.';
        c.scope=c.basis+' Participation au duel et gestes défensifs explicitement simulés. Aucun pistolet, grenade, électrode, drone armé, pouvoir de FOXALIVE, ZEKE ou protocole médical inventé. Les équipements tenus apparaissent uniquement lorsqu’une référence originale les prouve.';
        c.links=[['light','heavy']];
      }else if(uid==='core__laughing_octopus'){
        f.visual={...f.visual,outfit:'mgs4-octopus-exosuit',back:'four-flat-segmented-tentacles',pouches:0,holster:false,weapon:'tentacle'};
        m.specialDown=displacement(m.specialDown,'Roulade compacte — adaptation',5,20);
        m.specialForward=displacement(m.specialForward,'Roulade de dégagement — adaptation',-9,22);
        m.specialBack={...m.specialBack,name:'Camouflage de la combinaison — adaptation',
          counterplay:'Combinaison opaque et collision conservée ; attaque ou impact rompt l’état de dissimulation. Le changement de texture d’OctoCamo reste à compléter.'};
        c.scope='Laughing Octopus de MGS4 PS3 : casque fermé, quatre larges tentacules mécaniques segmentés, roulade compacte et camouflage. Aucun piège autonome blessant ou arme à feu attribué par les sources sélectionnées. Tenue opaque ; correspondance de texture encore à compléter. Impacts, énergie et roulades bornés sont des adaptations au versus.';
      }else if(uid==='core__raging_raven'){
        m.super={...m.super,speed:9}; // Bounded grenade arc reaches its fuse before arena cleanup.
        f.visual={...f.visual,outfit:'mgs4-raven-flight-exosuit',back:'mechanical-flight-wings',weapon:'grenade-launcher',pouches:0,holster:false};
        c.weapon='grenade-launcher';c.scope='Raging Raven de MGS4 PS3 : armure volante, ailes mécaniques, propulseurs et lance-grenades observés. Modèle exact du lanceur non certifié. Arcs, fusées, chaleur, vol borné et dommages adaptés au versus ; aucune aile magique ou arme importée de Beauty.';
      }else if(uid==='core__crying_wolf'){
        f.visual={...f.visual,kind:'quadruped',outfit:'mgs4-wolf-quadruped-exosuit',weapon:'dorsal-railgun',back:'railgun-and-tail-cable',headgear:'closed-wolf-shell',pouches:0,holster:false};
        c.weapon='dorsal-railgun';m.specialBack=displacement(m.specialBack,'Repli du châssis — adaptation',-6,22);
        c.scope='Crying Wolf de MGS4 PS3 : exosquelette massif à quatre pattes, railgun dorsal intégré et câble arrière. Charge et pistage adaptés au duel ; aucun fusil porté par une tireuse humaine, tempête invoquée ou invisibilité inventée. La forme Beauty garde un répertoire humain séparé.';
      }else if(uid==='core__screaming_mantis'){
        f.visual={...f.visual,outfit:'mgs4-mantis-exosuit',weapon:'mechanical-scythes',back:'six-extra-mechanical-arms',headgear:'closed-mantis-mask',pouches:0,holster:false};
        c.weapon='mechanical-scythes';c.role='Bras mécaniques et poupées tenues';
        m.special=move(m.special,{name:'Poupée Mantis tenue — repère adapté',kind:'mark',tag:'recon',damage:0,reach:380,duration:120,cost:20,
          counterplay:'Repère visible de versus à portée limitée. La manipulation SOP d’origine ne devient pas un contrôle universel des personnages ou des touches.'});
        m.specialDown=recovery(m.specialDown,'Poupée Sorrow tenue — préparation adaptée',20,15);
        m.specialBack=displacement(m.specialBack,'Replier les bras — adaptation',-5,20);
        m.super=move(m.super,{name:'Saisie mécanique — adaptation',kind:'melee',tag:'grapple',level:'throw',damage:1800,reach:120,cost:25,meter:50,
          counterplay:'Saisie mécanique au sol après préparation ; reculer, sauter ou déchoper. Aucun projectile-poupée ou bouclier magique.'});
        c.scope='Screaming Mantis de MGS4 PS3 : masque sombre, six bras mécaniques supplémentaires avec lames courbes et deux poupées distinctes tenues. Contrôle des humains liés à SOP dans l’épisode original ; les repères de ce versus ne certifient aucune télékinésie universelle. Aucune poupée explosive lancée, piège autonome ou barrière magique ajoutée.';
      }else{
        f.visual={...f.visual,outfit:'mgs3-ochre-motorcycle',collar:'source-open',holster:true,rightHolster:'anatomical-right-thigh',goggles:'neck',pouches:0,pads:false,boots:'black-motorcycle',weapon:'mauser'};
        c.weapon='mauser';m.special={...m.special,name:'Mauser — tir d’EVA'};
        m.specialDown=move(m.specialDown,{...m.special,name:'Mauser à genou — adaptation',slot:'specialDown',id:uid+'::specialDown',startup:24,recovery:31,cost:1,lowProfile:true});
        m.super={...m.super,name:'Couverture au Mauser — adaptation',cost:6};
        c.scope='EVA dans MGS3 original : tenue de moto ocre/brune, lunettes au cou, holster sur la cuisse anatomique droite et Mauser indiqué par Konami. Variante Type 17 non certifiée par les sources retenues. Tir debout, tir à genou, CQC et recharge adaptés au versus ; aucun lancer de grenade ni moto apparue hors écran.';
      }
      c.counterplay=['special','specialDown','specialForward','specialBack'].map(slot=>m[slot].counterplay);
      c.limitations=[...(c.limitations||[]),'Fidélité visuelle closest_supported ; 1:1 absolu non certifié.'];
      const entry=catalog?.entries?.[uid];
      if(uid==='roster50__sunny_mgs4'||uid==='roster50__sunny_mgr')c.cqcPass8Hurtbox={width:uid==='roster50__sunny_mgs4'?52:62,height:entry?.displayHeight||(uid==='roster50__sunny_mgs4'?150:175)};
      for(const [action,moveSlots]of Object.entries(slots[uid]||{})){
        const sourceAction=entry?.actionMap?.[moveSlots[0]],measured=moveSlots.every(slot=>entry?.actionMap?.[slot]===sourceAction)?origins(entry,anchors?.[uid]?.[action],sourceAction):null;
        if(measured)for(const slot of moveSlots)m[slot].projectileOrigin=measured;
      }
      fighters[index]=f;changed.push(uid);
    }
    return changed;
  }
  function hurtbox(p){
    if(!['roster50__sunny_mgs4','roster50__sunny_mgr'].includes(p?.f?.uid))return null;
    const b=p.f.combat.cqcPass8Hurtbox;if(!b||!Number.isFinite(b.width)||!Number.isFinite(b.height)||b.width<=0||b.height<=0)return null;
    const h=b.height*((p.crouch||p.attack?.def.lowProfile)? .53:1);return{x:p.x-b.width/2,y:p.y-h,w:b.width,h};
  }
  const finishSlots=uid=>support.includes(uid)?['super','specialDown','specialForward','utility']:['super','specialDown','special','throw'];
  function applyFinishers(catalog,fighters=[]){
    if(!catalog?.profiles)return [];
    const changed=[];
    for(const uid of reviewedUIDs){
      const original=catalog.profiles[uid],f=fighters.find(f=>f.uid===uid);if(!original||!f)continue;
      const profile=clone(original),simulation=support.includes(uid),family=simulation?'tactical':uid==='core__raging_raven'?'explosive':uid==='core__crying_wolf'?'sniper':uid==='core__eva_mgs3'?'ballistic':'cqc';
      Object.assign(profile,{family,basis:f.combat.scope,evidence:simulation?'simulation':'adaptation',visual:clone(f.visual)});
      profile.finishers=profile.finishers.map((fin,index)=>{const slot=finishSlots(uid)[index],m=f.combat.moves[slot];return{...fin,name:m.name+' — conclusion',family,canonical:false,
        evidence:simulation?'simulation':'adaptation',sourceMoves:[m.name],loreBasis:f.combat.scope,
        description:'Conclusion de versus après la victoire, à partir des poses de '+m.name+'. Chorégraphie '+(simulation?'de simulation bonus':'adaptée')+' ; aucun nouveau pouvoir ou fait canonique.',
        phases:simulation?['prepare','support','confirm','pose']:m.kind==='projectile'?['aim','shot','impact','pose']:m.level==='throw'?['approach','grapple','impact','pose']:['prepare','engage','confirm','pose']};});
      catalog.profiles[uid]=profile;changed.push(uid);
    }
    catalog.familyCounts=Object.values(catalog.profiles).reduce((out,p)=>{out[p.family]=(out[p.family]||0)+1;return out;},{});return changed;
  }
  function finisherPose(uid,fin,phase,pose={},t=0){
    if(!reviewedUIDs.includes(uid)||fin?.id&&!fin.id.startsWith(uid+'::'))return pose;
    const index=['neutral','down','forward','back'].indexOf(fin?.slot);if(index<0)return pose;
    const phases=fin.phases||[],i=Math.max(0,phases.indexOf(phase)),recovery=phase==='pose',startup=['prepare','aim','approach'].includes(phase);
    return{...pose,hit:false,ko:false,guard:false,walk:false,attack:!support.includes(uid)&&!startup&&!recovery,animationActive:true,moveSlot:finishSlots(uid)[index],
      attackPhase:startup?'startup':recovery?'recovery':'active',phaseProgress:Math.max(0,Math.min(1,t*phases.length-i)),actionTime:0,attackTime:0,finisherUid:uid,finisherPhase:phase};
  }
  const api={apply,origins,hurtbox,applyFinishers,finisherPose,hasSourceFinisher:uid=>reviewedUIDs.includes(uid),
    cloakAlpha:uid=>uid==='core__laughing_octopus'?1:null,reviewedUIDs,slots,sourceStatus:'closest_supported',absolute1to1Certified:false};
  root.CQC_PASS8_COMBAT_FIDELITY=api;if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
