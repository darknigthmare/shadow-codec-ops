/* One reviewed whole-pose UG. Fixed native bore axis; authored CQC values. */
(function(root){'use strict';
 const UID='pass19__raptor_mgr',clone=value=>JSON.parse(JSON.stringify(value)),equal=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 const slots=Object.freeze(['light','heavy','low','throw','special','specialDown','specialForward','specialBack','super','utility']);
 const projectileSlots=new Set(['special','super']);
 const attachments={"schema":"cqc.pass39.native-raptor-attachments/1","uid":"pass19__raptor_mgr","sourcePixelsEdited":false,"absoluteCanonicalAttachmentCertified":false,"indexConvention":"zero-based; missile_fire11 is ordinal12/row3col4","sides":{"right":{"10":{"side":"right","physicalPoseIndex":10,"physicalPoseOrdinal":11,"file":"assets/combat-sprites-pass39-raptor/pass19__raptor_mgr/right-v1.png","sourceSHA256":"27a6fb173e18154d0fac2e4af5309b6c9f7f09ceae41a63a46356a9ac09e81c2","rect":[644,637,289,281],"pivot":[0.52249135,0.99644128],"nativePixelPoint":[882.5,666.5],"nativeRearAxisPoint":[824.5,670.5],"frameFraction":[0.8252595155709342,0.10498220640569395],"normalizedScreenDirection":[0.997630328422983,-0.06880209161537815],"attachmentKind":"visible-dorsal-four-tube-pod-bore","absoluteCanonicalAttachmentCertified":false},"11":{"side":"right","physicalPoseIndex":11,"physicalPoseOrdinal":12,"file":"assets/combat-sprites-pass39-raptor/pass19__raptor_mgr/right-v1.png","sourceSHA256":"27a6fb173e18154d0fac2e4af5309b6c9f7f09ceae41a63a46356a9ac09e81c2","rect":[940,659,303,255],"pivot":[0.54125413,0.99607843],"nativePixelPoint":[1216.5,684.5],"nativeRearAxisPoint":[1156.5,689.5],"frameFraction":[0.9125412541254125,0.1],"normalizedScreenDirection":[0.9965457582448797,-0.08304547985373997],"attachmentKind":"visible-dorsal-four-tube-pod-bore","absoluteCanonicalAttachmentCertified":false}},"left":{"10":{"side":"left","physicalPoseIndex":10,"physicalPoseOrdinal":11,"file":"assets/combat-sprites-pass39-raptor/pass19__raptor_mgr/left-v1.png","sourceSHA256":"f09832d1c0f06194eae519e5874dee27b6feb622530efdc3aeebf0f8661ba015","rect":[649,642,299,280],"pivot":[0.48829431,0.99642857],"nativePixelPoint":[748.5,650.5],"nativeRearAxisPoint":[810.5,662.5],"frameFraction":[0.33277591973244147,0.030357142857142857],"normalizedScreenDirection":[-0.9817798505902814,-0.1900219065658609],"attachmentKind":"visible-dorsal-four-tube-pod-bore","absoluteCanonicalAttachmentCertified":false},"11":{"side":"left","physicalPoseIndex":11,"physicalPoseOrdinal":12,"file":"assets/combat-sprites-pass39-raptor/pass19__raptor_mgr/left-v1.png","sourceSHA256":"f09832d1c0f06194eae519e5874dee27b6feb622530efdc3aeebf0f8661ba015","rect":[967,643,269,279],"pivot":[0.51672862,0.99641577],"nativePixelPoint":[1090.5,652.5],"nativeRearAxisPoint":[1150.5,665.5],"frameFraction":[0.4591078066914498,0.034050179211469536],"normalizedScreenDirection":[-0.9773231400267972,-0.21175334700580606],"attachmentKind":"visible-dorsal-four-tube-pod-bore","absoluteCanonicalAttachmentCertified":false}}}};
 function admitted(){
  const entry=root.CQC_COMBAT_SPRITE_CATALOG?.entries?.[UID],contracts=root.CQC_PASS39_RAPTOR_SPRITE_DATA?.sourceContracts;
  if(!entry||entry.uid!==UID||entry.review?.status!=='approved'||entry.mirror!==false||!contracts)return false;
  for(const side of ['right','left']){
   const actions=side==='right'?entry.actions:entry.oppositeActions,contract=contracts[side];
   if(!actions?.idle?.frames?.length||!actions?.deploy?.frames?.length||contract.sha256!==attachments.sides[side][11].sourceSHA256)return false;
   if(entry.sourceFrameHeights?.[contract.file]!==contract.baseFrameHeight)return false;
   const fire=actions.deploy.frames[1],pin=attachments.sides[side][11];
   if(!fire||fire.file!==pin.file||fire.sha256!==pin.sourceSHA256||!equal(fire.rect,pin.rect)||!equal(fire.pivot,pin.pivot))return false;
  }
  return true;
 }
 function tailor(input){
  if(input?.uid!==UID||input.pass19Reference?.kit!=='raptor'||!admitted())throw Error('Reviewed native Raptor body and dedicated profile required');
  const f=clone(input),c=f.combat;if(!c?.moves)throw Error('Combat template required');
  const inherited=clone(c.moves);
  f.visual={...f.visual,kind:'machine',body:'heavy',weapon:'raptor-dorsal-four-tube-pod'};
  f.archetype='heavy';f.speed=.84;f.power=1.10;f.reach=1.14;
  c.simulationVisualKind='machine';c.simulationBody={width:250,height:384,crouchHeight:230};
  c.resource={kind:'energy',label:'ÉNERGIE',max:100,regen:.12,reload:58};
  c.passive={id:'unmanned-gear',name:'Unité autonome',desc:'Le châssis reçoit les effets mécaniques et les perturbations électromagnétiques.',machine:true,guardRegen:.08};
  const put=(slot,patch)=>{c.moves[slot]={startup:12,active:4,recovery:24,damage:0,cost:0,meter:0,cooldown:0,reach:100,travel:0,level:'mid',input:inherited[slot]?.input,counterplay:'Observe la préparation et quitte sa portée.',...patch,id:UID+'::'+slot,slot,lore:'adaptation'};};
  put('light',{name:'Griffe de contact',kind:'melee',tag:'blade',startup:12,active:4,recovery:22,damage:410,reach:130});
  put('heavy',{name:'Fauchage des lames',kind:'melee',tag:'blade',startup:26,active:6,recovery:36,damage:870,reach:180});
  put('low',{name:'Cisaille rasante',kind:'melee',tag:'blade',level:'low',startup:19,active:5,recovery:30,damage:520,reach:166,lowProfile:true,counterplay:'Garde basse ou saut avant le balayage.'});
  put('throw',{name:'Saisie du Raptor',kind:'melee',tag:'grapple',level:'throw',startup:18,active:4,recovery:38,damage:930,reach:120,counterplay:'Quitte la portée de saisie ou saute avant son activation.'});
  const missile={kind:'projectile',tag:'rocket',startup:29,active:2,recovery:37,damage:760,cost:27,speed:10,life:100,height:320,radius:66,count:1,interval:0,aimAtBody:false,counterplay:'Le missile suit le tube vers le haut ; reste hors de son axe. Il peut survoler une cible au sol.'};
  put('special',{...missile,name:'Tir dorsal antiaérien'});
  put('specialForward',{name:'Bond du châssis',kind:'melee',tag:'strike',startup:20,active:6,recovery:33,damage:740,cost:22,travel:4,launchSelf:-7,reach:150,counterplay:'Évite la préparation du bond puis punis la retombée.'});
  put('specialDown',{name:'Repli bas du Raptor',kind:'mobility',tag:'movement',startup:11,active:13,recovery:25,cost:15,travel:-3,lowProfile:true});
  put('specialBack',{name:'Décrochage du Raptor',kind:'mobility',tag:'movement',startup:13,active:13,recovery:27,cost:17,travel:-4,launchSelf:-5});
  put('super',{...missile,name:'Impact dorsal renforcé',startup:39,recovery:47,damage:1630,cost:0,meter:50,radius:88});
  put('utility',{name:'Stabilisation mécanique',kind:'recover',tag:'recovery',startup:45,active:1,recovery:24,restore:28,counterplay:'Interromps la régulation ; elle ne protège pas le châssis.'});
  c.key='raptor_mgr_native';c.uid=UID;c.fighterName=f.name;c.role='Lames rapprochées et missile antiaérien';
  c.weapon=f.visual.weapon;c.scope='Apparence observable du Raptor MGR2013 ; mouvements, trajectoires et valeurs du versus créés pour CQC.';
  c.basis='Raptor bipède biomécanique et nacelle dorsale à quatre ouvertures2×2 visibles dans le trailer officiel KONAMI.';
  c.evidence='adaptation';c.sources=root.CQC_COMBAT_SPRITE_CATALOG.entries[UID].review.sources.map(source=>source.url);
  c.limitations=[...new Set([...(c.limitations||[]),'Les16poses par face, collisions, timings, dégâts et ressources sont des adaptations CQC2D5, pas une extraction des animations source.','La hauteur3,2m reste une estimation ; les pivots2D projetés et surfaces cachées ne certifient pas le modèle3D.','Un seul missile part par activation, du tube peint actuel et dans son axe fixe ; aucune poursuite de cible. La trajectoire haute peut manquer les humains au sol.','Sources whole-pose, sans pièces destructibles ni ajout au catalogue64rigs/841pièces.'])];
  c.counterplay=slots.map(slot=>c.moves[slot].counterplay);
  for(const slot of slots){const m=c.moves[slot];if(m.id!==UID+'::'+slot||m.slot!==slot)throw Error('Incomplete Raptor move identity');for(const key of ['startup','active','recovery','damage','cost','meter'])if(!Number.isFinite(m[key])||m[key]<0)throw Error('Invalid authored Raptor move');}
  f.pass39Native=true;f.pass19Reference.assetStatus='native-source-reviewed';f.pass19Reference.registrationStatus='active-only-with-approved-native-sprite';f.pass19Reference.absolute1to1Certified=false;
  return f;
 }
 function ownsProjectile(p,m){return p?.f?.uid===UID&&projectileSlots.has(m?.slot)&&m.id===UID+'::'+m.slot&&m.kind==='projectile'&&m.tag==='rocket'&&m.count===1&&m.interval===0;}
 function sourceSelection(p,m,options={}){
  if(!ownsProjectile(p,m)||!admitted()||!p.attack||p.attack.def!==m||p.life<=0||p.hit>0||![-1,1].includes(p.face))return null;
  const sprites=root.CQC_COMBAT_SPRITES,entry=sprites?.getEntry(UID,p.f);if(!entry)return null;
  const actions=p.face===entry.facing?entry.actions:entry.oppositeActions;if(!actions)return null;
  const pose=options.pose||root.CQC_PASS19_VERSUS_SPATIAL?.poseFor(p,Number.isFinite(options.frame)?options.frame:0);if(!pose)return null;
  const frame=sprites.selectFrame({...entry,actions},pose)?.frame;if(!frame)return null;
  const side=p.face===1?'right':'left',pin=attachments.sides[side][11];
  if(frame.file!==pin.file||frame.sha256!==pin.sourceSHA256||!equal(frame.rect,pin.rect)||!equal(frame.pivot,pin.pivot)||frame.nativePoseIndex!==11)return null;
  const factor=entry.displayHeight/(entry.sourceFrameHeights?.[frame.file]||entry.baseFrameHeight||frame.rect[3]);
  const local=xy=>({x:(xy[0]-frame.rect[0]-frame.pivot[0]*frame.rect[2])*factor,y:(xy[1]-frame.rect[1]-frame.pivot[1]*frame.rect[3])*factor});
  const mouth=local(pin.nativePixelPoint),tail=local(pin.nativeRearAxisPoint),dx=mouth.x-tail.x,dy=mouth.y-tail.y,norm=Math.hypot(dx,dy);
  if(!(factor>0)||!(norm>0)||dx*p.face<=0||mouth.x*p.face<0||mouth.y>=0)return null;
  return{entry,frame,pin,mouth,tail,direction:{x:dx/norm,y:dy/norm},factor};
 }
 function prepareProjectile(p,m,targetBox,options={}){
  const sample=sourceSelection(p,m,options),speed=m?.speed;if(!sample||!Number.isFinite(speed)||speed<=0)return null;
  const worldFactor=1.12*(root.CQC_PASS19_WORLD_SCALE?.height(p.f).ratio||1),toWorld=v=>({x:p.x+v.x*worldFactor,y:p.y+v.y*worldFactor});
  return{valid:true,fixedNativeAxis:true,targetAligned:false,bodyAim:false,mouth:toWorld(sample.mouth),tail:toWorld(sample.tail),velocity:{valid:true,vx:sample.direction.x*speed,vy:sample.direction.y*speed,speed},sourcePin:{source:{file:sample.frame.file,sha256:sample.frame.sha256},rect:[...sample.frame.rect],pivot:[...sample.frame.pivot]},sourceMouth:[...sample.pin.nativePixelPoint],sourceTail:[...sample.pin.nativeRearAxisPoint],physicalPoseIndex:11,originalSpeedPreserved:true,qualification:'Visible painted dorsal-tube fixed axis. Authored CQC projectile, no target lock or homing.'};
 }
 function nativeOrigin(p,m,options={}){
  const sample=sourceSelection(p,m,options);if(!sample)return null;
  return{forward:sample.mouth.x*p.face,height:-sample.mouth.y,sourceFile:sample.frame.file,sourceSHA256:sample.frame.sha256,sourceRect:[...sample.frame.rect],sourcePivot:[...sample.frame.pivot],sourcePointNativeXY:[...sample.pin.nativePixelPoint],sourceRearAxisNativeXY:[...sample.pin.nativeRearAxisPoint],physicalPoseIndex:11,reviewKind:'reviewed-raptor-wholepose-fixed-source-axis',bodyAim:false,worldScaleApplied:false,facingQualification:'independently-painted-native-facing',emissionQualification:'One measured visible dorsal bore; fixed source axis, no original3Dsocket certificate.'};
 }
 let hookedCombat=null,hookedAim=null;
 function installHooks(){
  const combat=root.CQC_PASS19_COMBAT_ADDITIONS;
  if(combat&&combat!==hookedCombat){
   const previousPrepare=combat.prepare,previousInstall=combat.install;
   combat.prepare=function(){return previousPrepare.apply(combat,arguments).map(f=>f.uid===UID?tailor(f):f);};
   combat.install=function(fighters){const result=previousInstall.apply(combat,arguments);for(const f of fighters)if(f.uid===UID&&root.CQC_COMBAT_SPRITES?.has(UID))Object.assign(f,tailor(f));return result;};
   hookedCombat=combat;
  }
  const previousAim=root.CQC_PASS19_NATIVE_AIM;
  if(previousAim?.prepare&&previousAim?.nativeOrigin&&previousAim!==hookedAim){
   const wrapped=Object.freeze({...previousAim,prepare:function(p,m,targetBox,options){return p?.f?.uid===UID?prepareProjectile(p,m,targetBox,options):previousAim.prepare.apply(previousAim,arguments);},nativeOrigin:function(p,m,options){return p?.f?.uid===UID?nativeOrigin(p,m,options):previousAim.nativeOrigin.apply(previousAim,arguments);}});
   root.CQC_PASS19_NATIVE_AIM=wrapped;hookedAim=wrapped;
  }
  return{combat:!!hookedCombat,nativeAim:!!hookedAim};
 }
 function prepare(fighters){installHooks();const combat=root.CQC_PASS19_COMBAT_ADDITIONS;return combat?combat.prepare(fighters,{uids:[UID]}):[];}
 function install(fighters){installHooks();const combat=root.CQC_PASS19_COMBAT_ADDITIONS;return combat?combat.install(fighters,{uids:[UID],isRenderable:f=>f.uid===UID&&admitted()&&root.CQC_COMBAT_SPRITES?.has(UID)}):{added:[],pending:[UID]};}
 if(root.CQC_PASS39_RAPTOR_NATIVE)throw Error('Duplicate Raptor native module');
 root.CQC_PASS39_RAPTOR_NATIVE=Object.freeze({version:'pass39-native-raptor-wholepose/1',uid:UID,uids:Object.freeze([UID]),admitted,tailor,prepare,install,installHooks,ownsProjectile,prepareProjectile,nativeOrigin,attachments,scope:'Selected four-opening dorsal-pod source appearance; CQC2D5 whole poses, no articulated rig addition.',absolute1to1Certified:false});
 installHooks();
})(globalThis);
