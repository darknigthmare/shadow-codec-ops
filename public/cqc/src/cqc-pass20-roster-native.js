/* Released-game UG identities. CQC values are authored adaptations, never canonical frame data. */
(function(root){'use strict';
 const uids=Object.freeze(['pass19__mastiff_mgr','pass19__slider_mgr']);
 const clone=value=>JSON.parse(JSON.stringify(value));
 function tailor(input){
  if(!uids.includes(input?.uid))throw Error('PASS20 reviewed UG identity required');
  const f=clone(input),c=f.combat,slider=f.uid==='pass19__slider_mgr';
  f.visual={...f.visual,kind:'machine',body:slider?'flying':'heavy',weapon:slider?'wing-missile-pods':'shoulder-grenade-launcher'};
  f.archetype=slider?'zoner':'heavy';f.speed=slider?.95:.72;f.power=slider?.92:1.17;f.reach=slider?1.05:1.15;
  c.simulationVisualKind='machine';
  c.simulationBody=slider?{width:256,height:180,crouchHeight:108}:{width:176,height:336,crouchHeight:194};
  c.resource={kind:'energy',label:'ÉNERGIE',max:100,regen:.12,reload:58};
  c.passive={id:'unmanned-gear',name:'Unité autonome',desc:'Le châssis reçoit les effets mécaniques et les perturbations électromagnétiques.',machine:true,guardRegen:.08};
  const put=(slot,patch)=>{const timing=c.moves[slot];c.moves[slot]={startup:timing.startup,active:timing.active,recovery:timing.recovery,damage:0,cost:0,meter:0,reach:100,travel:0,level:'mid',input:timing.input,counterplay:'Observe la préparation et garde ou quitte sa portée.',...patch,id:f.uid+'::'+slot,slot,lore:'adaptation'};};
  if(slider){
   put('light',{name:'Contact de l’aile',kind:'melee',tag:'strike',startup:13,active:4,recovery:22,damage:330,reach:115});
   put('heavy',{name:'Passage de l’UG',kind:'melee',tag:'strike',startup:25,active:6,recovery:32,damage:720,reach:155,travel:3});
   put('low',{name:'Passage rasant',kind:'melee',tag:'strike',level:'low',startup:19,active:5,recovery:29,damage:470,reach:140,lowProfile:true});
   put('throw',{name:'Collision de capture',kind:'melee',tag:'grapple',level:'throw',startup:18,active:4,recovery:35,damage:750,reach:92});
   put('special',{name:'Missile du Slider',kind:'projectile',tag:'rocket',startup:28,active:1,recovery:35,damage:720,cost:25,speed:11,life:95,height:160,radius:60});
   put('specialForward',{name:'Double départ de missiles',kind:'projectile',tag:'rocket',startup:33,active:1,recovery:42,damage:410,cost:31,count:2,interval:9,speed:11,life:95,height:160,radius:48});
   put('specialDown',{name:'Décrochage aérien',kind:'mobility',tag:'movement',startup:9,active:14,recovery:22,cost:16,travel:4,launchSelf:-6,lowProfile:true});
   put('specialBack',{name:'Repli aérien',kind:'mobility',tag:'movement',startup:10,active:14,recovery:22,cost:14,travel:-5,launchSelf:-4});
   put('super',{name:'Salve des ailes',kind:'projectile',tag:'rocket',startup:39,active:1,recovery:47,damage:490,meter:50,count:3,interval:10,speed:11,life:100,height:160,radius:58});
  }else{
   put('light',{name:'Poing de l’UG',kind:'melee',tag:'strike',startup:14,active:4,recovery:23,damage:420,reach:116});
   put('heavy',{name:'Marteau des avant-bras',kind:'melee',tag:'strike',startup:27,active:7,recovery:37,damage:970,reach:155});
   put('low',{name:'Contact au sol',kind:'melee',tag:'strike',level:'low',startup:20,active:5,recovery:31,damage:530,reach:125,lowProfile:true});
   put('throw',{name:'Saisie des mains mécaniques',kind:'melee',tag:'grapple',level:'throw',startup:17,active:4,recovery:40,damage:1090,reach:108});
   put('special',{name:'Grenade de l’épaule',kind:'projectile',tag:'explosive',startup:30,active:1,recovery:37,damage:750,cost:26,speed:8,vy:-2,gravity:.15,life:95,height:287,fuse:48,radius:72});
   put('specialForward',{name:'Ruée du Mastiff',kind:'melee',tag:'strike',startup:18,active:6,recovery:33,damage:860,cost:24,travel:4,reach:145});
   put('specialDown',{name:'Repli du châssis',kind:'mobility',tag:'movement',startup:12,active:13,recovery:26,cost:15,travel:2,lowProfile:true});
   put('specialBack',{name:'Saut de retrait',kind:'mobility',tag:'movement',startup:14,active:13,recovery:27,cost:18,travel:-4,launchSelf:-8});
   put('super',{name:'Salve du Mastiff',kind:'projectile',tag:'explosive',startup:42,active:1,recovery:48,damage:570,meter:50,count:3,interval:13,speed:8,vy:-2,gravity:.15,life:100,height:287,fuse:48,radius:76});
  }
  put('utility',{name:'Régulation de l’UG',kind:'recover',tag:'recovery',startup:45,active:1,recovery:23,restore:28});
  c.weapon=f.visual.weapon;c.scope='Unité du jeu source ; mouvements du versus et valeurs adaptés.';
  c.basis=slider?'Slider de Revengeance, machine volante distincte de son éventuel pilote.':'Mastiff de Revengeance, unité humanoïde autonome à longs avant-bras.';
  c.sources=root.CQC_COMBAT_SPRITE_CATALOG.entries[f.uid].review.sources.map(source=>source.url);
  c.limitations=[...new Set([...(c.limitations||[]),'Attaques, collisions, phases, cadence et ressources créées pour CQC ; aucune valeur n’est déclarée extraite du jeu source.','La taille reste une estimation, et les pièces ne disposent pas encore d’une destruction indépendante.'])];
  c.counterplay=Object.values(c.moves).map(move=>move.counterplay);
  f.pass20Native=true;f.pass19Reference.assetStatus='native-source-reviewed';
  f.pass19Reference.registrationStatus='active-only-with-approved-native-sprite';
  f.pass19Reference.absolute1to1Certified=false;
  return f;
 }
 function prepare(fighters){return root.CQC_PASS19_COMBAT_ADDITIONS.prepare(fighters,{uids}).map(tailor);}
 function install(fighters){
  if(!Array.isArray(fighters))throw Error('Roster array required');
  const added=[],decorated=[],pending=[];
  for(const f of prepare(fighters)){
   if(!root.CQC_COMBAT_SPRITES?.has(f.uid)){pending.push(f.uid);continue;}
   const current=fighters.find(item=>item.uid===f.uid);
   if(current){Object.assign(current,f);decorated.push(f.uid);}else{fighters.push(f);added.push(f.uid);}
  }
  return {added,decorated,pending,absolute1to1Certified:false};
 }
 root.CQC_PASS20_ROSTER_NATIVE={version:'pass20-reviewed-ug-roster/1',uids,prepare,install,tailor};
})(globalThis);
