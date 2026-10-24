/* Additive R-00 fighter. No existing Raiden profile, P31 RAY routing or original catalog object is modified. */
(function(root){
  'use strict';
  const UID='pass40__raiden_r00';
  const SLOTS=['light','heavy','low','throw','special','specialDown','specialForward','specialBack','super','utility'];
  const INPUT={light:'J',heavy:'K',low:'↓ + J',throw:'U',special:'I',specialDown:'↓ + I',
    specialForward:'AVANT + I',specialBack:'ARRIÈRE + I',super:'O',utility:'L'};
  const SOURCES=['https://shared.steamstatic.com/store_item_assets/steam/apps/235460/manuals/MGR_PC_manual_English.pdf',
    'https://gameadvanceplaythroughs.weebly.com/metal-gear-rising-revengeance-body.html',
    'https://steamcommunity.com/sharedfiles/filedetails/?id=288100510'];
  function profile(){
    const combat={uid:UID,key:'raiden_r00_prologue',fighterName:'RAIDEN · R-00',incarnation:'MGR · R-00',
      role:'Lame et parade · corps standard',weapon:'prologue-high-frequency-katana',evidence:'adaptation',
      resource:{kind:'stamina',label:'EFFORT',max:100,regen:.15,reload:58},
      passive:{id:'standard-cyborg-body',name:'Corps standard',machine:true,guardRegen:.08,
        desc:'Corps cyborg du prologue ; la parade et les limites d’effort sont adaptées au duel.'},
      basis:'Corps standard argent et or, visage naturel intact et katana HF conventionnel de File R-00.',
      scope:'Apparence originale du prologue ; commandes, collisions, effort, soins et valeurs CQC créés pour le versus.',
      sources:SOURCES.slice(),limitations:[
        'Profil créé séparément du corps noir de Revengeance et de Raiden MGS4 ; aucun pouvoir de ces incarnations n’est copié.',
        'Aucune jauge FC, aucun Ripper, Zandatsu, Blade Mode, arme à feu ou capacité de téléportation.',
        'L’effort et la jauge ordinaire de super appartiennent aux règles CQC. La nanopâte répare uniquement les dégâts récupérables, avec préparation et délai.',
        'La locomotion utilise deux dessins natifs par sens avec lame tenue ; les transitions de rangement et de dégainage restent à compléter.'
      ],links:[['light','heavy']],moves:{}};
    const put=(slot,patch)=>{combat.moves[slot]={name:'',kind:'melee',tag:'blade',level:'mid',startup:12,active:4,
      recovery:24,damage:0,cost:0,meter:0,cooldown:0,reach:100,travel:0,input:INPUT[slot],
      counterplay:'Observe la préparation, garde ou quitte la portée puis punis la récupération.',
      ...patch,id:UID+'::'+slot,slot,lore:'adaptation'};};
    put('light',{name:'Coupe brève',startup:8,active:3,recovery:16,damage:350,reach:112});
    put('heavy',{name:'Coupe engagée',startup:21,active:5,recovery:31,damage:760,reach:155});
    put('low',{name:'Balayage du corps standard',tag:'strike',level:'low',startup:15,active:4,recovery:26,
      damage:460,reach:116,lowProfile:true,counterplay:'Garde basse ou saut ; la récupération reste punissable.'});
    put('throw',{name:'Saisie et projection',tag:'grapple',level:'throw',startup:11,active:3,recovery:35,
      damage:790,reach:82,counterplay:'Recule, saute ou déchope pendant la courte fenêtre de saisie.'});
    put('special',{name:'Taille du katana HF',startup:18,active:5,recovery:29,damage:700,cost:20,reach:162});
    put('specialDown',{name:'Parade rapprochée',kind:'parry',tag:'counter',parryMode:'melee',
      startup:5,active:9,recovery:32,damage:480,cost:18,reach:112,
      counterplay:'Attends la fin de la parade, projette ou attaque à distance ; aucune parade de projectile.'});
    put('specialForward',{name:'Course de garde',kind:'mobility',tag:'movement',startup:5,active:15,
      recovery:23,damage:0,cost:15,reach:0,travel:5,
      counterplay:'Intercepte la course ; aucun dégât, verrouillage de cible ou invincibilité.'});
    put('specialBack',{name:'Roulade de dégagement',kind:'mobility',tag:'movement',startup:7,active:14,
      recovery:26,damage:0,cost:17,reach:0,travel:-4,lowProfile:true,
      counterplay:'Poursuis la sortie de roulade ; aucune invulnérabilité générale.'});
    put('super',{name:'Coupe décisive du corps standard',startup:34,active:6,recovery:44,
      damage:1650,meter:50,reach:178,
      counterplay:'Garde ou quitte la portée pendant la longue préparation ; aucune transformation.'});
    put('utility',{name:'Nanopâte de réparation',kind:'heal',tag:'recovery',startup:48,active:1,
      recovery:27,damage:0,reach:0,heal:450,cooldown:360,
      counterplay:'Interromps l’utilisation ; seuls les dégâts récupérables peuvent être réparés.'});
    combat.counterplay=SLOTS.map(slot=>combat.moves[slot].counterplay);
    return {uid:UID,id:'raiden_r00',name:'RAIDEN · R-00',source:'MAVERICK',ep:'MGR',
      role:'CORPS STANDARD',color:'#aab0b4',accent:'#c4ab63',archetype:'balanced',power:1.03,speed:1.02,reach:1.05,
      bonus:true,canonical:true,playableAdaptation:true,pass40Native:true,
      visual:{kind:'cyborg',gender:'m',body:'athletic',hair:'medium',hairColor:'#d5d8db',skin:'#d0b49d',
        primary:'#aab0b4',secondary:'#24272b',accent:'#c4ab63',weapon:'blade',variant:UID,
        signatureLabel:'Corps standard · R-00',heightEvidence:'Existing P31 display height; official body metric not certified'},
      combat,sourceIncarnation:{game:'MGR2013',file:'R-00',standardBody:true,customBlackBody:false,
        intactNaturalFace:true,absoluteHeightCertified:false,absolute1to1Certified:false},
      cqcSystems:{ripper:false,zandatsu:false,bladeMode:false,fcResource:false},
      pass19Reference:{uid:UID,name:'RAIDEN · R-00',episode:'MGR',group:'revengeance',
        kit:'raiden-r00-prologue',appearanceKind:'cyborg',worldHeightMeters:null,
        silhouette:'Corps standard argent et or du prologue, visage naturel et katana HF conventionnel.',
        heightEvidence:'Existing P31 display height; official body metric not certified',
        absolute1to1Certified:false,referenceIds:[]}};
  }
  function sourceApproved(){
    const packet=root.CQC_PASS40_R00_SOURCE,entry=packet?.entry;
    if(!packet?.approved||packet.uid!==UID||entry?.uid!==UID||entry.review?.status!=='approved'||
      entry.mirror!==false||entry.fallbackMissingActions!==false||entry.visualFirearmPresent!==false)return false;
    const needed=['idle','guard','walk','crouch','jump','blade','heavy','low','throw','recover','hit','ko','roll','parry'];
    for(const side of ['actions','oppositeActions']){
      if(!needed.every(name=>entry[side]?.[name]?.frames?.length))return false;
      const physical=new Set(Object.values(entry[side]).flatMap(a=>a.frames.map(f=>f.nativePoseIndex)));
      if(!Array.from({length:16},(_,i)=>i).every(i=>physical.has(i)))return false;
    }
    return true;
  }
  function admitted(){
    const sprites=root.CQC_COMBAT_SPRITES;
    return sourceApproved()&&sprites?.has(UID)===true&&
      sprites.getEntry(UID,{costume:'original'})===root.CQC_PASS40_R00_SOURCE.entry;
  }
  function prepare(){return [profile()];}
  function install(fighters){
    if(!Array.isArray(fighters))throw Error('Roster array required');
    if(!admitted())return{added:[],pending:[UID]};
    if(fighters.some(f=>f?.uid===UID))return{added:[],pending:[]};
    const fighter=profile();
    // Only the new UID receives its original presentation record. Never merge Raiden incarnations.
    const costumes=root.CQC_PASS19_COSTUMES;
    if(costumes?.createRosterRecord&&costumes?.addRoster){
      costumes.addRoster([costumes.createRosterRecord({uid:UID,name:fighter.name,game:'MGR',
        basePresentation:'nextgen',nativeBody:'sprite',alreadyMechanical:true,surviveIncarnation:false})]);
    }
    fighters.push(fighter);return{added:[UID],pending:[]};
  }
  function finishers(catalog,fighters){
    if(!admitted()||!fighters.some(f=>f.uid===UID)||!catalog?.profiles||catalog.profiles[UID])return false;
    const fighter=profile(),names=['Coupe de conclusion','Parade et projection','Percée contrôlée','Dernière taille'];
    const moves=[['light','heavy'],['specialDown','throw'],['specialForward','special'],['super']];
    const value={uid:UID,fighterName:fighter.name,episode:'MGR',source:fighter.source,
      family:'cqc',tone:'stylized',basis:fighter.combat.basis,evidence:'adaptation',visual:fighter.visual,
      color:fighter.color,accent:fighter.accent,power:fighter.power,speed:fighter.speed,reach:fighter.reach};
    value.finishers=names.map((name,i)=>({
      id:UID+'::finisher'+(i+1),index:i,slot:['neutral','down','forward','back'][i],
      commandP1:['O','↓ + O','AVANT + O','ARRIÈRE + O'][i],commandP2:['Y','S + Y','AVANT + Y','ARRIÈRE + Y'][i],
      name,family:'cqc',tone:'stylized',duration:220+i*18,camera:['close','wide','low','orbit'][i],
      phases:['approach','grapple','impact','fall'],victimRule:'any',rating:'stylized',loreBasis:fighter.combat.basis,
      description:'Conclusion CQC créée pour le corps standard ; aucune exécution Zandatsu.',
      sourceMoves:moves[i].map(slot=>fighter.combat.moves[slot].name),canonical:false,evidence:'adaptation',gore:false}));
    catalog.profiles[UID]=value;catalog.fighterCount=Object.keys(catalog.profiles).length;
    catalog.finisherCount=Object.values(catalog.profiles).reduce((n,p)=>n+(p.finishers?.length||0),0);return true;
  }
  let hooked=null,hookedCombat=null;
  function installHooks(){
    // The compact story/academy rosters call the public prepare method rather than the Versus installer.
    // Append this independent profile after the unchanged historical builders have finished.
    const combat=root.CQC_PASS19_COMBAT_ADDITIONS;
    if(combat&&combat!==hookedCombat&&typeof combat.prepare==='function'){
      const previousPrepare=combat.prepare;
      combat.prepare=function(baseline,options={}){
        const values=previousPrepare.apply(this,arguments);
        const selected=!options.uids||new Set(options.uids).has(UID);
        return sourceApproved()&&selected&&!baseline.some(f=>f.uid===UID)&&!values.some(f=>f.uid===UID)
          ? [...values,profile()]:values;
      };
      hookedCombat=combat;
    }
    const roster=root.CQC_PASS19_ROSTER_NATIVE;if(!roster||hooked===roster)return !!hooked||!!hookedCombat;
    const previousInstall=roster.install,previousFinishers=roster.finishers;
    if(typeof previousInstall!=='function'||typeof previousFinishers!=='function')return false;
    roster.install=function(fighters){const old=previousInstall.apply(this,arguments),own=install(fighters);
      const result={...old,added:[...(old?.added||[]),...own.added],pending:[...(old?.pending||[]),...own.pending]};
      root.CQC_PASS19_ROSTER_RESULT=result;return result;};
    roster.finishers=function(catalog,fighters){const value=previousFinishers.apply(this,arguments);finishers(catalog,fighters);return value;};
    hooked=roster;return true;
  }
  if(root.CQC_PASS40_R00_NATIVE)throw Error('Duplicate R00 native profile module');
  root.CQC_PASS40_R00_NATIVE=Object.freeze({version:'pass40-r00-candidate/1',uid:UID,uids:Object.freeze([UID]),
    profile,prepare,sourceApproved,admitted,install,finishers,installHooks,absolute1to1Certified:false});
  installHooks();
})(globalThis);
