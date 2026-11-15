/* New source-game adversaries and boxed human operators. Existing profiles stay intact. */
(function(root){
 'use strict';
 const clone=value=>JSON.parse(JSON.stringify(value));
 const slots=['light','heavy','low','throw','special','specialDown','specialForward','specialBack','super','utility'];
 function tailor(input){
  if(!input?.pass19Reference||!input.uid.startsWith('pass19__'))throw Error('New PASS19 identity required');
  const f=clone(input),r=f.pass19Reference,c=f.combat;
  const inherited=clone(c.moves);
  // Only common timing values come from the template. Its firearm, status and
  // character-specific mechanics must not leak into an unrelated creature.
  const put=(slot,patch)=>{const timing=inherited[slot];c.moves[slot]={startup:timing.startup,active:timing.active,recovery:timing.recovery,damage:0,cost:0,meter:0,reach:100,travel:0,level:'mid',input:timing.input,counterplay:'Observe le départ et garde ou quitte sa portée.',...patch,id:f.uid+'::'+slot,slot,lore:'adaptation'};};
  const melee=(name,patch={})=>({name,kind:'melee',tag:'strike',level:'mid',...patch});
  const resource=(kind,label,max,regen=0)=>{c.resource={kind,label,max,regen,reload:58};};
  for(const slot of slots)put(slot,melee({light:'Contact',heavy:'Percussion',low:'Balayage',throw:'Saisie',special:'Assaut',specialDown:'Repli offensif',specialForward:'Ruée',specialBack:'Recul offensif',super:'Assaut décisif',utility:'Reprise'}[slot],{damage:slot==='super'?1800:slot==='utility'?0:slot==='heavy'?720:slot==='throw'?780:370,cost:slot.startsWith('special')?18:0,meter:slot==='super'?50:0,...(slot==='low'?{level:'low',height:65}:{}),...(slot==='throw'?{level:'throw',tag:'grapple',reach:85}:{})}));
  if(r.group==='survive'){
   f.visual.kind=['crawler','watcher','giant'].includes(r.kit)?(r.kit==='crawler'?'quadruped':r.kit==='watcher'?'creature':'creature'): 'creature';
   c.passive={id:'crystalline-activity',name:'Activité cristalline',desc:'L’activité de la créature se régénère après une interruption de son assaut.',guardRegen:.08};
   resource('stamina','ACTIVITÉ',100,.16);
   put('light',melee('Contact de la créature',{damage:300,reach:76}));
   put('heavy',melee('Percussion cristalline',{damage:680,reach:126}));
   put('throw',melee('Saisie de la créature',{tag:'grapple',level:'throw',damage:770,reach:88,travel:0}));
   put('specialDown',{name:'Repli de la créature',kind:'mobility',tag:'movement',damage:0,cost:16,travel:-5,lowProfile:true});
   put('specialBack',{name:'Décrochage de la créature',kind:'mobility',tag:'movement',startup:10,active:13,recovery:24,damage:0,cost:14,travel:-4});
   put('utility',{name:'Reprise d’activité',kind:'recover',tag:'recovery',damage:0,restore:30});
   if(r.kit==='tracker'){
    f.archetype='rush';f.speed=1.16;
    put('special',melee('Bond du Tracker',{startup:17,active:7,recovery:28,damage:820,reach:125,travel:5,launchSelf:-11,cost:19}));
    put('specialForward',melee('Griffes en poursuite',{startup:10,active:4,recovery:24,reach:110,damage:650,travel:5,cost:15}));
   }else if(r.kit==='mortar'){
    f.archetype='zoner';f.speed=.74;f.visual.weapon='crystal-cannon';
    put('special',{name:'Salve cristalline',kind:'projectile',tag:'explosive',level:'mid',startup:30,active:1,recovery:34,damage:760,cost:24,speed:7,vy:-7.5,gravity:.24,life:125,height:172,fuse:72,radius:80,travel:0,counterplay:'Observe l’arc et quitte la zone avant l’explosion.'});
    put('specialForward',{name:'Tir de couverture',kind:'projectile',tag:'explosive',startup:22,active:1,recovery:31,damage:560,cost:19,speed:8,vy:-2.5,gravity:.18,life:88,height:150,fuse:55,radius:62,travel:0});
    put('super',{name:'Bombardement cristallin',kind:'projectile',tag:'explosive',startup:37,active:1,recovery:45,damage:720,meter:50,cost:0,speed:7,vy:-8,gravity:.25,life:130,height:174,fuse:76,radius:87,count:3,interval:13,travel:0});
   }else if(r.kit==='crawler'){
    f.visual.body='small';f.speed=1.15;c.simulationVisualKind='quadruped';
    c.simulationBody={width:82,height:55,crouchHeight:30};
    put('light',melee('Morsure rasante',{level:'low',height:76,reach:82,damage:280}));
    put('special',melee('Ruée du Crawler',{level:'low',height:85,lowProfile:true,travel:7,damage:720,reach:112,cost:18}));
    put('specialForward',melee('Bond de contact',{launchSelf:-8,travel:5,reach:110,damage:680,cost:20}));
   }else if(r.kit==='watcher'){
    f.archetype='tactical';f.speed=.93;
    put('special',{name:'Alerte du Watcher',kind:'mark',tag:'recon',startup:26,active:1,recovery:29,damage:0,cost:18,reach:560,duration:210,travel:0});
    put('specialForward',melee('Impact du Watcher',{launchSelf:-7,travel:5,damage:610,reach:116,cost:19}));
   }else if(r.kit==='grabber'){
    f.archetype='grappler';f.reach=1.18;
    put('special',melee('Prise des tendrils',{tag:'grapple',level:'throw',startup:19,active:5,recovery:37,damage:980,reach:152,cost:22,travel:0}));
    put('specialForward',melee('Balayage des tendrils',{level:'low',startup:16,active:6,recovery:31,damage:740,reach:172,cost:19}));
   }else if(r.kit==='detonator'){
    f.archetype='fire';
    put('special',melee('Percussion volatile',{damage:860,reach:133,travel:5,cost:20,tag:'volatile'}));
    put('specialDown',{name:'Fragments volatils',kind:'trap',tag:'volatile',startup:33,active:1,recovery:35,damage:670,reach:108,cost:32,duration:150,arm:32,maxTraps:1,hp:220,travel:0});
    put('super',melee('Détonation de la créature',{tag:'volatile',startup:48,active:7,recovery:44,damage:2350,reach:230,meter:50,cost:0,selfDamage:700,travel:0}));
   }else if(r.kit==='giant'){
    f.archetype='heavy';f.speed=.69;f.power=1.19;f.visual.body='heavy';
    const framing=root.CQC_COMBAT_SPRITE_CATALOG?.entries?.[r.uid]?.displayHeight||480;
    c.simulationBody={width:framing*.4375,height:framing,crouchHeight:framing*.59375};
    put('heavy',melee('Impact massif',{startup:23,active:7,recovery:35,damage:1030,reach:175}));
    if(r.uid.includes('frostbite'))put('special',{name:'Souffle du Frostbite',kind:'projectile',tag:'cold',startup:31,active:1,recovery:37,damage:690,cost:26,speed:9,life:75,height:150,status:'shock',duration:24,travel:0,counterplay:'Sors de l’axe du souffle avant son activation.'});
    else if(r.uid.includes('lord_of_dust'))put('special',{name:'Décharge du Lord of Dust',kind:'projectile',tag:'psychic',startup:36,active:1,recovery:42,damage:870,cost:31,speed:8,life:90,height:160,travel:0});
    else put('special',melee('Percussion du Big Mouth',{startup:26,active:8,recovery:39,damage:1160,reach:194,travel:3,cost:29}));
   }
  }else if(r.appearanceKind==='boxed-human'){
   f.visual.kind='human';f.visual.boxedOperator=clone(r.operator);f.archetype='tactical';
   c.passive={id:'boxed-cover',name:'Couverture de terrain',desc:'L’opérateur reste humain sous son équipement. L’effet de couverture se rompt lorsqu’il attaque.',guardRegen:.10};
   resource('ammo','ÉQUIPEMENT',6);
   put('specialDown',{name:'Glissade de l’opérateur',kind:'mobility',tag:'movement',startup:11,active:12,recovery:26,damage:0,cost:0,travel:3,lowProfile:true});
   put('specialBack',{name:'Couverture du carton',kind:'buff',tag:'stealth',buff:'cloak',startup:20,active:1,recovery:27,damage:0,cost:0,cooldown:240,duration:120,travel:0});
   put('specialForward',{name:'Avance sous couverture',kind:'mobility',tag:'movement',startup:8,active:18,recovery:23,damage:0,cost:0,travel:5,lowProfile:true});
   put('utility',{name:'Reconditionner l’équipement',kind:'reload',tag:'reload',startup:54,active:1,recovery:20,damage:0,cost:0,travel:0});
   const v=r.boxVariant;
   if(['cannon','stun-cannon','smoke-shell'].includes(v)){
    const stun=v==='stun-cannon',smoke=v==='smoke-shell';
    put('special',{name:stun?'Obus assommant':smoke?'Obus fumigène':'Obus du Box Tank',kind:'projectile',tag:stun?'tranq':smoke?'smoke':'explosive',startup:25,active:1,recovery:33,damage:stun?120:smoke?0:820,cost:2,speed:9,vy:-2,gravity:.12,life:94,height:160,fuse:55,radius:stun?63:smoke?106:78,...(stun?{status:'drowsy',duration:120,potency:35}:{}),travel:0});
    put('super',{...c.moves.special,name:stun?'Salve non létale':smoke?'Couverture fumigène':'Salve du Box Tank',damage:stun?100:smoke?0:670,count:3,interval:14,meter:50,cost:0});
   }else if(['bomb','stun','smoke'].includes(v)){
    const stun=v==='stun',smoke=v==='smoke';
    put('special',{name:stun?'Boîte assommante':smoke?'Boîte fumigène':'Boîte piégée',kind:'trap',tag:stun?'tranq':smoke?'smoke':'explosive',startup:31,active:1,recovery:34,damage:stun?80:smoke?0:780,reach:smoke?130:105,cost:2,duration:210,arm:34,maxTraps:1,hp:200,...(stun?{status:'drowsy',duration:120,potency:32}:{}),travel:0});
   }else if(v==='rescue'){
    put('special',{name:'Secours sous couverture',kind:'heal',tag:'medical',startup:55,active:1,recovery:30,damage:0,cost:2,heal:550,travel:0});
   }else if(v==='assassin'){
    put('special',melee('Capture dans la paille',{tag:'grapple',level:'throw',startup:13,active:3,recovery:35,damage:900,reach:91,cost:1,disarm:75,travel:0}));
   }else put('special',{name:'Abri de la Love Box',kind:'buff',tag:'armor',buff:'armor',startup:26,active:1,recovery:30,damage:0,cost:1,duration:150,hits:1,travel:0});
  }else if(r.kit==='gekko'||r.kit==='dwarf'){
   c.passive={id:'machine',name:'Châssis autonome',desc:'Les protections organiques ne s’appliquent pas au châssis ; un EMP perturbe son énergie.',machine:true,guardRegen:.08};
   resource('energy','ÉNERGIE',100,.10);
   c.simulationBody={width:r.kit==='dwarf'?145:205,height:450,crouchHeight:r.kit==='dwarf'?285:360};
   put('utility',{name:'Régulation du châssis',kind:'recover',tag:'recovery',startup:48,active:1,recovery:24,damage:0,cost:0,restore:28});
   put('special',{name:'Percussion du châssis',kind:'melee',tag:'strike',startup:25,active:6,recovery:33,damage:790,cost:20,reach:150,travel:2});
   if(r.uid.includes('suicide')){
    resource('energy','CHARGE',100,.10);
    put('special',melee('Percussion de démolition',{tag:'explosive',startup:29,active:7,recovery:38,damage:1050,reach:165,cost:26,travel:4}));
    put('super',melee('Détonation de démolition',{tag:'volatile',startup:56,active:8,recovery:52,damage:2600,reach:240,meter:50,cost:0,selfDamage:1200,travel:0}));
   }else if(r.uid.includes('missile')){
    put('special',{name:'Missile du Gekko',kind:'projectile',aimAtBody:true,tag:'rocket',startup:30,active:1,recovery:38,damage:970,cost:28,speed:9,life:95,height:185,radius:82,travel:0});
   }else if(r.uid.includes('grenade')){
    put('special',{name:'Grenade du Gekko',kind:'projectile',tag:'explosive',startup:28,active:1,recovery:34,damage:740,cost:23,speed:7,vy:-7,gravity:.28,life:110,height:178,fuse:67,radius:76,travel:0});
   }else if(r.uid==='pass19__gekko_mgr'){
    put('specialForward',{name:'Rafale du Gekko',kind:'projectile',aimAtBody:true,tag:'ballistic',startup:24,active:1,recovery:33,damage:210,cost:18,count:3,interval:5,speed:19,life:58,height:315,travel:0});
   }else if(r.uid.includes('trenchcoat')){
    c.simulationVisualKind='machine';
    put('special',melee('Contact des unités dissimulées',{tag:'electric',startup:19,active:5,recovery:31,damage:620,reach:113,cost:19,status:'shock',duration:27}));
    put('specialBack',{name:'Discrétion sous le manteau',kind:'buff',tag:'stealth',buff:'cloak',startup:24,active:1,recovery:29,damage:0,cost:20,cooldown:270,duration:120,travel:0});
   }else if(r.uid.includes('humanoid')){
    put('special',melee('Impulsion du Double Tripod',{tag:'electric',startup:18,active:6,recovery:31,damage:690,reach:121,cost:22,status:'shock',duration:30}));
   }
  }
  c.scope='Silhouette et équipement attestés du jeu source ; mouvements et valeurs du versus adaptés.';
  c.basis=r.silhouette;
  c.counterplay=Object.values(c.moves).map(m=>m.counterplay);
  c.sources=r.referenceIds.map(id=>root.CQC_PASS19_ROSTER_ADDITIONS.registry.references[id]?.url).filter(Boolean);
  c.weapon=r.episode==='SURVIVE'?(r.kit==='mortar'?'crystal-cannon':'natural'):r.appearanceKind==='boxed-human'?'field-equipment':r.weaponVariant||'mechanical-contact';
  c.limitations=[...new Set([...(c.limitations||[]),'Ce profil CQC ne revendique pas une extraction exacte des attaques ou paramètres du jeu source.'])];
  for(const slot of slots){const m=c.moves[slot];if(!m||m.id!==f.uid+'::'+slot)throw Error('Incomplete new move profile');for(const key of ['startup','active','recovery','damage','cost','meter'])if(!Number.isFinite(m[key])||m[key]<0)throw Error('Invalid new move numeric value');}
  return f;
 }
 function prepare(baseline,options={}){return root.CQC_PASS19_ROSTER_ADDITIONS.prepare(baseline,options).map(tailor);}
 function install(baseline,options={}){if(typeof options.isRenderable!=='function')throw Error('Reviewed native availability predicate required');const existing=new Set(baseline.map(f=>f.uid)),added=[],pending=[];for(const f of prepare(baseline,options)){if(existing.has(f.uid))continue;if(!options.isRenderable(f)){pending.push(f.uid);continue;}baseline.push(f);existing.add(f.uid);added.push(f.uid);}return{added,pending};}
 root.CQC_PASS19_COMBAT_ADDITIONS={version:'pass19-new-combat/1',tailor,prepare,install};
 if(typeof module==='object'&&module.exports)module.exports=root.CQC_PASS19_COMBAT_ADDITIONS;
})(globalThis);
