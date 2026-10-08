/* Exact-incarnation corrections. Original profile data and inline combat engine remain intact. */
(function(root){'use strict';
  const reviewedUIDs=['core__raven','core__old_snake','core__quiet','archive__skull_face'];
  const slots={
    core__raven:{shoot:['special'],lowShoot:['specialForward'],charge:['super']},
    core__old_snake:{shoot:['special'],deploy:['specialDown']},
    core__quiet:{shoot:['special'],deploy:['specialDown'],charge:['super']},
    archive__skull_face:{}
  };
  const clone=value=>JSON.parse(JSON.stringify(value));
  const appliedFighters={};
  function origins(entry,marks,action){
    if(!entry||entry.mirror!==false||!marks||!action)return null;
    for(const [side,face]of [['right',1],['left',-1]]){
      const mark=marks[side],actions=entry.facing===face?entry.actions:entry.oppositeActions,
        frame=mark&&actions?.[action]?.frames?.[mark.frame];
      if(!frame||mark.action!==action||!Number.isInteger(mark.frame)||entry.phaseMap?.[action]?.active?.[0]!==mark.frame||
        mark.physicallyViewed!==true||!Number.isFinite(mark.sourcePixelAlpha)||mark.sourcePixelAlpha<=0||
        JSON.stringify(mark.rect)!==JSON.stringify(frame.rect)||JSON.stringify(mark.pivot)!==JSON.stringify(frame.pivot)||
        mark.sourceFrameHeight!==entry.sourceFrameHeights?.[frame.file]||mark.engineBodyScale!==1.12||
        !Array.isArray(mark.point)||mark.point.length!==2||!mark.point.every(Number.isFinite))return null;
      const [x,y,w,h]=frame.rect,[px,py]=mark.point;
      if(px<x||px>=x+w||py<y||py>=y+h)return null;
    }
    return root.CQC_PASS4_COMBAT_FIDELITY?.origins(entry,marks)||null;
  }
  function apply(fighters,catalog=root.CQC_COMBAT_SPRITE_CATALOG,anchors=root.CQC_PASS7_NATIVE_ORIGINS){
    const changed=[];
    for(const uid of reviewedUIDs){
      const index=fighters.findIndex(f=>f.uid===uid);if(index<0)continue;
      const f=clone(fighters[index]),c=f.combat,m=c.moves;
      if(uid==='core__quiet'){
        f.visual={...f.visual,outfit:'quiet-default-tpp',hair:'tied-back',holster:true,pads:false,gloves:true,collar:'open',
          leftSleeve:'black-long-sleeve-and-glove',rightGlove:'olive-short-glove',rightHolster:'anatomical-right-thigh'};
        m.special={...m.special,name:'Fusil de Quiet — tir de précision',counterplay:`Repère de visée du versus ; tir conventionnel annoncé pendant ${m.special.startup} images, garde ou approche pendant la préparation.`};
        m.specialDown={...m.specialDown,name:'Tir posé — adaptation',tag:'precision',counterplay:'Une cartouche du même fusil conventionnel ; tir préparé depuis une position basse, garde ou approche pendant la préparation.'};
        for(const key of ['status','potency','duration'])delete m.specialDown[key];
        m.specialBack={...m.specialBack,tag:'movement',counterplay:'Repli rapide lié à la mobilité de Quiet ; départ et arrivée lisibles, distance bornée et collision conservée. Aucun pouvoir mental attribué.'};
        m.super={...m.super,tag:'precision',cost:1,counterplay:'Une vraie cartouche et 50 points de jauge ; long repère de visée du versus, garde, esquive ou parade de projectile.'};
        c.scope='Quiet, costume par défaut de MGSV The Phantom Pain : fusil conventionnel à lunette et mobilité parasite. Les sources sélectionnées ne certifient pas le nom de ce modèle ; aucun accessoire laser, railgun, pouvoir psychique ou fusil tranquillisant ajouté. Réserve de cinq, repère de visée, déplacement borné, dommages et durées adaptés au versus.';
      }else if(uid==='core__raven'){
        f.visual={...f.visual,outfit:'shirtless-harness',weapon:'vulcan',back:'ammunition-pack',holster:false,pads:false};
        c.weapon='vulcan';m.super={...m.super,cost:48,counterplay:'Huit projectiles distincts, 48 points de chaleur et 50 points de jauge ; plafond de chaleur réel, préparation et récupération punissables.'};
        c.scope='Vulcan Raven de MGS1 PlayStation original : torse nu, harnais, tatouage et canon Vulcan lourd avec réserve dorsale. Budget de chaleur, refroidissement, nombres de tirs, brace, dégâts et durées sont des adaptations du versus, sans invoquer de corbeaux combattants ni pouvoir magique.';
      }else if(uid==='core__old_snake'){
        f.visual={...f.visual,outfit:'octocamo',solidEye:'anatomical-left',eyePatch:false};
        m.specialDown={...m.specialDown,kind:'chaff',tag:'chaff',damage:0,name:'Chaff — brouillage électronique',
          counterplay:'Grenade à arc et fusée visibles ; le nuage brouille brièvement les équipements électroniques compatibles. Aucun dégât humain, impact, marquage ou chip de garde. Sortir de la zone, punir le lancer ou détruire la grenade.',
          chaffDuration:120,chaffEffectDuration:90,chaffResourceCost:10};
        delete m.specialDown.status;delete m.specialDown.duration;
        m.specialBack={...m.specialBack,counterplay:'Tenue OctoCamo opaque : état de dissimulation borné du versus, collision conservée ; attaque ou impact rompt cet état. La reproduction du changement de texture du jeu original reste à compléter.'};
        c.passive={...c.passive,desc:'CQC de vétéran et tenue OctoCamo opaque ; le Solid Eye est une aide de vision portée sur l’œil anatomique gauche, sans rayon offensif.'};
        c.scope='Old Snake de MGS4 PS3 : Mk.2 tranquillisant, Solid Eye sur l’œil anatomique gauche, tenue OctoCamo opaque et grenade Chaff. Le changement de texture d’OctoCamo reste à compléter ; l’état de dissimulation présent est une adaptation bornée du versus. Le Chaff ne blesse ni ne marque les humains ; portée, fusée, nuage et brouillage temporaire des capteurs de machines sont adaptés au versus. Aucun laser offensif du Solid Eye ni invisibilité d’OctoCamo revendiqué.';
      }else{
        f.visual={...f.visual,face:'scarred-human',scar:true,insignia:null,material:'formal-cloth',pouches:0,weapon:'fists',gloves:true,boots:'western'};
        c.key='command_simulation';c.weapon='fists';c.role='Commandement — simulation rapprochée';
        c.resource={...c.resource,kind:'stamina',label:'Effort XOF',max:100,regen:.16};
        m.special={...m.special,kind:'mark',tag:'recon',name:'Désigner l’axe — simulation',damage:0,cost:0,reach:600,duration:120,
          counterplay:'Désignation visible de simulation bonus à portée limitée ; sortir de portée ou punir la préparation. Aucun tir ou pouvoir mental personnel revendiqué.'};
        for(const key of ['speed','life','height','fuse','radius','vy','gravity'])delete m.special[key];
        m.super={...m.super,kind:'melee',tag:'strike',name:'Entrée du commandement — simulation',damage:2100,active:7,reach:193,cost:30,travel:3,
          counterplay:'Entrée rapprochée de simulation bonus : 30 points d’effort et 50 points de jauge ; garde ou recul pendant la longue préparation, aucun projectile surnaturel.'};
        for(const key of ['speed','life','height','count','interval','fuse','radius','vy','gravity'])delete m.super[key];
        m.specialDown={...m.specialDown,kind:'buff',tag:'armor',name:'Défense du commandement — simulation',damage:0,reach:0,cost:0,cooldown:240,buff:'armor',duration:90,hits:1,
          counterplay:'Garde engagée de simulation bonus, une seule frappe absorbée ; saisir ou attendre la fin de la courte protection.'};
        for(const key of ['speed','vy','gravity','life','height','fuse','radius','status','potency'])delete m.specialDown[key];
        m.specialForward={...m.specialForward,name:'CQC du commandement — simulation',
          counterplay:'Saisie rapprochée de simulation bonus à mains nues ; recul, saut ou protection après projection. Aucune crosse d’arme personnelle non certifiée.'};
        m.utility={...m.utility,kind:'recover',tag:'recovery',name:'Reprendre appui — simulation',restore:32,
          counterplay:'Pause de simulation bonus interrompable avant récupération de l’effort ; aucun soin ni réapparition de cartouches.'};
        c.scope='Skull Face de MGSV The Phantom Pain : humain au visage brûlé, masque séparé, fedora, tenue formelle, gants noirs et bottes western. Les vues originales sélectionnées ne prouvent pas son modèle d’arme personnelle : aucun pistolet ou tir ajouté. Désignation, défense, effort et CQC sont une simulation bonus déclarée, sans duel canonique certifié, grenade, flamme, pouvoir des Skulls, squelette ou emblème Diamond Dogs attribué.';
      }
      c.counterplay=['special','specialDown','specialForward','specialBack'].map(slot=>m[slot].counterplay);
      c.sources=[...new Set([...(c.sources||[]),'original_incarnation_reference_contract_pass7'])];
      for(const [action,moveSlots]of Object.entries(slots[uid])){
        const entry=catalog?.entries?.[uid],sourceAction=entry?.actionMap?.[moveSlots[0]],
          measured=moveSlots.every(slot=>entry?.actionMap?.[slot]===sourceAction)?origins(entry,anchors?.[uid]?.[action],sourceAction):null;
        if(measured)for(const slot of moveSlots)m[slot].projectileOrigin=measured;
      }
      fighters[index]=f;appliedFighters[uid]=f;changed.push(uid);
    }
    return changed;
  }
  const finishes={
    core__raven:{family:'ballistic',slots:['super','special','specialForward','throw'],families:['ballistic','ballistic','ballistic','cqc'],
      names:['Rafale Vulcan — conclusion adaptée','Canon Vulcan — conclusion adaptée','Rafale rasante — conclusion adaptée','Repli de Raven — conclusion adaptée']},
    core__old_snake:{family:'cqc',slots:['super','specialDown','specialForward','throw'],families:['cqc','tactical','cqc','cqc'],
      names:['OctoCamo — conclusion adaptée','Chaff — conclusion adaptée','CQC du vétéran — conclusion adaptée','Dernière mission — conclusion adaptée']},
    core__quiet:{family:'sniper',slots:['super','specialDown','special','specialBack'],families:['sniper','sniper','sniper','sniper'],
      names:['Tir silencieux — conclusion adaptée','Tir posé — conclusion adaptée','Visée de Quiet — conclusion adaptée','Repli de Quiet — conclusion adaptée']},
    archive__skull_face:{family:'tactical',slots:['super','specialDown','specialForward','specialBack'],families:['cqc','tactical','cqc','tactical'],
      names:['Ordre XOF — simulation','Défense du commandement — simulation','Contrôle rapproché — simulation','Repli de Skull Face — simulation']}
  };
  function finishPhases(uid,index,family){
    if(uid==='core__old_snake'&&index===1)return ['aim','deploy','disperse','pose'];
    if(family==='cqc')return ['approach','grapple','impact','fall'];
    if(family==='tactical')return ['prepare','guard','confirm','pose'];
    return family==='sniper'?['mark','steady','shot','fade']:['aim','volley','impact','pose'];
  }
  function applyFinishers(catalog,fighters=[]){
    if(!catalog?.profiles)return [];
    const changed=[];
    for(const uid of reviewedUIDs){
      const original=catalog.profiles[uid],f=fighters.find(f=>f.uid===uid);if(!original||!f)continue;
      const plan=finishes[uid],profile=clone(original),evidence=uid==='archive__skull_face'?'simulation':'adaptation';
      Object.assign(profile,{family:plan.family,basis:f.combat.scope,evidence,visual:clone(f.visual)});
      profile.finishers=profile.finishers.map((fin,index)=>{
        const slot=plan.slots[index],move=f.combat.moves[slot],family=plan.families[index];
        let description=`Conclusion de versus après la victoire à partir de ${move.name}. Coûts, poses et durée sont une chorégraphie ${evidence==='simulation'?'de simulation bonus':'adaptée'}, sans nouveau fait canonique.`;
        if(uid==='core__old_snake'&&index===1)description='Après la victoire, un lancer visible disperse du Chaff pour brouiller brièvement les équipements électroniques compatibles. Aucune blessure humaine, extraction, immobilisation psychique ou arme laser du Solid Eye. Conclusion adaptée au versus.';
        if(uid==='core__quiet'&&index===3)description='Quiet quitte l’axe avec son fusil conventionnel. Conclusion adaptée au versus après la victoire ; aucune extraction Fulton, télékinésie ou procédure de capture revendiquée.';
        return {...fin,name:plan.names[index],family,canonical:false,evidence,description,loreBasis:f.combat.scope,sourceMoves:[move.name],phases:finishPhases(uid,index,family)};
      });
      catalog.profiles[uid]=profile;changed.push(uid);
    }
    catalog.familyCounts=Object.values(catalog.profiles).reduce((counts,p)=>{counts[p.family]=(counts[p.family]||0)+1;return counts;},{});
    return changed;
  }
  function finisherPose(uid,fin,phase,pose={},t=0){
    if(!reviewedUIDs.includes(uid)||fin?.id&&!fin.id.startsWith(uid+'::'))return pose;
    const index=['neutral','down','forward','back'].indexOf(fin?.slot);if(index<0)return pose;
    const phases=fin?.phases||[],phaseIndex=Math.max(0,phases.indexOf(phase));
    const within=Math.max(0,Math.min(1,Math.max(0,Math.min(1,Number.isFinite(t)?t:0))*Math.max(1,phases.length)-phaseIndex));
    const recovery=['pose','fall','fade'].includes(phase),startup=['aim','mark','steady','approach','prepare'].includes(phase);
    return {...pose,hit:false,ko:false,guard:false,walk:false,attack:!startup&&!recovery,moveSlot:finishes[uid].slots[index],animationActive:true,
      attackPhase:startup?'startup':recovery?'recovery':'active',phaseProgress:within,actionTime:0,attackTime:0,
      finisherUid:uid,finisherSlot:fin.slot,finisherPhase:phase,finisherProgress:t};
  }
  const hasSourceFinisher=uid=>reviewedUIDs.includes(uid);
  const cloakAlpha=uid=>uid==='core__old_snake'?1:.36;
  const machine=p=>!!(p?.f?.combat?.passive?.machine||p?.f?.visual?.kind==='machine');
  const electronicMove=m=>!!m&&(m.kind==='observe'||m.kind==='mark'||m.kind==='projectile'&&(m.homing||m.telegraph||['electric','emp','laser','rail','rocket'].includes(m.tag)));
  const affected=(p,m)=>machine(p)&&p.statuses?.pass7Chaff?.t>0&&electronicMove(m);
  function addEvent(s,type,p,extra={}){
    s.events.push({frame:s.frame,type,actor:p?.slot??-1,...extra});if(s.events.length>180)s.events.shift();s.metrics[type]=(s.metrics[type]||0)+1;
  }
  function denied(s,p){p.stats.denied++;p.feedback='CAPTEURS ÉLECTRONIQUES BROUILLÉS';p.feedbackT=48;addEvent(s,'denied',p,{why:p.feedback,source:'pass7-chaff'});return false;}
  const store=s=>s.pass7Chaff||(s.pass7Chaff={grenades:[],fields:[],round:s.round,a:s.a,b:s.b});
  function spawnChaff(s,p){
    const m=p.attack.def,origin=m.projectileOrigin?.[p.face],native=origin&&Number.isFinite(origin.forward)&&Number.isFinite(origin.height),state=store(s);
    // Maximum two live grenades per thrower; oldest is safely retired, never detonated as a blast.
    const owned=state.grenades.filter(q=>q.owner===p.slot);if(owned.length>=2)state.grenades=state.grenades.filter(q=>q!==owned[0]);
    const point=root.CQC_PASS19_VERSUS_SPATIAL?.projectilePoint(p,m,{h:180})||{x:p.x+p.face*(native?origin.forward:52),y:p.y-(native?origin.height:m.height||135)};const q={id:s.nextId++,owner:p.slot,uid:p.f.uid,x:point.x,y:point.y,vx:p.face*(m.speed||7),vy:m.vy||-9,face:p.face,
      def:m,kind:'chaff',age:0,life:m.life||100,delay:0,dead:false,burstId:p.attack.id};
    state.grenades.push(q);addEvent(s,'chaffProjectile',p,{id:q.id,slot:'specialDown'});
  }
  function disperse(s,q){
    q.dead=true;const state=store(s),p=[s.a,s.b][q.owner];
    const owned=state.fields.filter(f=>f.owner===q.owner);if(owned.length>=2)state.fields=state.fields.filter(f=>f!==owned[0]);
    state.fields.push({id:s.nextId++,owner:q.owner,x:q.x,y:q.y,radius:q.def.radius||88,life:q.def.chaffDuration||120,max:q.def.chaffDuration||120,def:q.def,affected:{}});
    addEvent(s,'chaffDispersed',p,{id:q.id,x:q.x,y:q.y});
  }
  function stepChaff(s,E){
    const state=store(s);
    for(const q of state.grenades){
      q.age++;q.life--;q.x+=q.vx;q.y+=q.vy;q.vy+=q.def.gravity||.45;
      if(q.y>=E.FLOOR-10){q.y=E.FLOOR-10;q.vy=-Math.abs(q.vy)*.46;q.vx*=.7;}
      const foe=[s.a,s.b][1-q.owner],hit=E.hitbox(foe);
      if(hit&&E.overlap(hit,{x:q.x-16,y:q.y-12,w:32,h:24})){
        q.dead=true;addEvent(s,'chaffDestroyed',foe,{id:q.id});continue;
      }
      if(q.x<30||q.x>1250||q.y>E.FLOOR+100||q.y<(root.CQC_PASS19_VERSUS_SPATIAL?.worldCeiling(s)??-140)){q.dead=true;continue;}
      if(q.age>=(q.def.fuse||62)||q.life<=0)disperse(s,q);
    }
    state.grenades=state.grenades.filter(q=>!q.dead);
    for(const field of state.fields){
      field.life--;const target=[s.a,s.b][1-field.owner],body=E.box(target);
      if(!machine(target)||field.affected[target.slot]||!E.overlap({x:field.x-field.radius,y:field.y-field.radius,w:field.radius*2,h:field.radius*2},body))continue;
      field.affected[target.slot]=true;target.statuses.pass7Chaff={t:field.def.chaffEffectDuration||90};
      const resource=target.f.combat.resource,n=field.def.chaffResourceCost||10,before=target.r;
      target.r=Math.max(0,Math.min(resource.max,target.r+(['heat','cost'].includes(resource.kind)?n:-n)));
      delete target.buffs.optic;delete target.buffs.focus;target.steady=false;
      if(affected(target,target.attack?.def)){target.attack=null;target.state='idle';}
      addEvent(s,'chaffElectronics', [s.a,s.b][field.owner],{target:target.slot,frames:target.statuses.pass7Chaff.t,resourceBefore:before,resourceAfter:target.r});
    }
    state.fields=state.fields.filter(f=>f.life>0);
  }
  function attachEngine(E){
    if(!E||E.pass7ChaffAttached)return E;
    const originalStep=E.step,originalStart=E.start,originalReset=E.reset;
    E.start=function(s,p,slot){return affected(p,p.f.combat.moves[slot])?denied(s,p):originalStart(s,p,slot);};
    E.reset=function(s,options){delete s.pass7Chaff;return originalReset(s,options);};
    E.step=function(s,inputs=[E.empty(),E.empty()]){
      const participates=[s.a?.f?.uid,s.b?.f?.uid].some(uid=>uid==='core__old_snake'||uid==='core__quiet')||!!s.pass7Chaff;
      // Other matchups retain the historical step and complete state byte-for-byte.
      if(!participates)return originalStep(s,inputs);
      const beforeFrame=s.frame,beforePhase=s.phase;
      if(s.pass7Chaff&&(s.pass7Chaff.a!==s.a||s.pass7Chaff.b!==s.b||s.pass7Chaff.round!==s.round))delete s.pass7Chaff;
      const incoming=inputs.map((input,index)=>{
        const p=[s.a,s.b][index],slot=input?.slot;
        if(slot&&affected(p,p.f.combat.moves[slot])){denied(s,p);return {...input,slot:null};}return input;
      });
      for(const p of [s.a,s.b])if(affected(p,p.attack?.def)){p.attack=null;p.state='idle';}
      const result=originalStep(s,incoming);
      if(beforePhase!=='fight'||s.phase!=='fight'||s.finished||s.frame===beforeFrame){if(s.phase!=='fight')delete s.pass7Chaff;return result;}
      for(const p of [s.a,s.b]){
        const a=p.attack;
        if(p.f.uid==='core__old_snake'&&a?.name==='specialDown'&&a.def.kind==='chaff'&&a.activated&&a.t===a.def.startup)spawnChaff(s,p);
      }
      if(s.pass7Chaff)stepChaff(s,E);
      // Historical blink FX is a mental-coloured ring: source Quiet movement keeps only a neutral movement ring.
      for(const p of [s.a,s.b])if(p.f.uid==='core__quiet'&&p.attack?.name==='specialBack'&&p.attack.activated&&p.attack.t===p.attack.def.startup)
        for(const effect of s.fx)if(effect.kind==='ring'&&effect.tag==='psychic'&&effect.x===p.x&&effect.t===effect.max)effect.tag='movement';
      return result;
    };
    E.pass7ChaffAttached=true;return E;
  }
  const chaffProjectiles=s=>s.pass7Chaff?.grenades||[];
  function drawChaffProjectile(c,q,zoom=1){
    if(!q||q.dead||q.delay>0||q.def?.id!=='core__old_snake::specialDown'||q.def.kind!=='chaff'||q.def.tag!=='chaff'||!Number.isFinite(zoom)||zoom<=0)return false;
    // Flat canister cue; source HUD confirms Chaff, not its physical paint colour or dimensions.
    c.save();c.rotate((q.age||0)*.035);c.fillStyle='#555a5c';c.fillRect(-5*zoom,-8*zoom,10*zoom,16*zoom);
    c.strokeStyle='#c4cbcb';c.lineWidth=zoom;c.strokeRect(-5*zoom,-8*zoom,10*zoom,16*zoom);
    c.fillStyle='#383f42';c.fillRect(-4*zoom,-10*zoom,8*zoom,2*zoom);c.restore();return true;
  }
  function drawChaff(c,s,toX,toY,zoom=1){
    const fields=s.pass7Chaff?.fields||[];if(!fields.length||!Number.isFinite(zoom)||zoom<=0)return false;
    c.save();
    for(const field of fields){
      const alpha=Math.min(1,field.life/25),r=field.radius*zoom;c.strokeStyle=`rgba(196,203,202,${.32*alpha})`;c.lineWidth=1.5*zoom;
      c.beginPath();c.arc(toX(field.x),toY(field.y),r,0,Math.PI*2);c.stroke();
      c.fillStyle=`rgba(215,220,214,${.55*alpha})`;
      for(let n=0;n<18;n++){const angle=n*2.399963+(s.frame-field.id)*.006,d=r*(.25+.75*((n*7)%19)/19),x=toX(field.x)+Math.cos(angle)*d,y=toY(field.y)+Math.sin(angle)*d;c.fillRect(x,y,3*zoom,1*zoom);}
    }
    c.restore();return true;
  }
  function drawFinisher(c,scene){
    if(!scene||!hasSourceFinisher(scene.uid))return false;
    const {uid,fin,phase,ax,vx,vy,dir}=scene;
    if(!fin?.phases?.includes(phase)||fin.id&&!fin.id.startsWith(uid+'::')||![ax,vx,vy,dir,scene.t].every(Number.isFinite)||![-1,1].includes(dir))return false;
    const index=['neutral','down','forward','back'].indexOf(fin.slot);if(index<0)return false;
    const slot=finishes[uid].slots[index],m=appliedFighters[uid]?.combat.moves[slot];
    const local=Math.max(0,Math.min(1,scene.t*fin.phases.length-fin.phases.indexOf(phase)));
    // These are neutral, authored cinematic cues. The figures and gun silhouettes remain native sprites.
    // They neither resolve new hits nor change ammunition, life, guard, statuses or historical phase timing.
    if(uid==='core__old_snake'&&fin.slot==='down'){
      const origin=m?.projectileOrigin?.[dir],nativeScale=1.23/1.12,startX=ax+dir*(origin?.forward??52)*nativeScale,startY=568-(origin?.height??135)*nativeScale,endX=ax+dir*230;
      c.save();
      if(phase==='deploy'){
        const x=startX+(endX-startX)*local,y=startY+(500-startY)*local-100*Math.sin(local*Math.PI);
        c.translate(x,y);c.rotate(local*Math.PI*2*dir);drawChaffProjectile(c,{age:0,def:{id:'core__old_snake::specialDown',kind:'chaff',tag:'chaff'}},1.23);
      }else if(phase==='disperse'){
        c.fillStyle=`rgba(213,220,211,${.7*(1-local*.5)})`;
        for(let n=0;n<24;n++){const angle=n*2.399963,d=20+local*68*((n*7)%23)/23;c.fillRect(endX+Math.cos(angle)*d,500+Math.sin(angle)*d,3,1);}
      }
      c.restore();return true;
    }
    // Conventional bullet traces follow the reviewed muzzle when available; no rail beam, psychic aura or invented weapon is added.
    if(m?.kind==='projectile'&&['ballistic','precision','tranq'].includes(m.tag)&&['volley','shot','impact'].includes(phase)){
      const origin=m.projectileOrigin?.[dir],nativeScale=1.23/1.12,startX=ax+dir*(origin?.forward??52)*nativeScale,startY=568-(origin?.height??145)*nativeScale;
      c.save();c.strokeStyle='#dcd9c7';c.lineWidth=2;
      const count=uid==='core__raven'?3:1;
      for(let n=0;n<count;n++){const travel=Math.max(0,Math.min(1,local+n*.15)),x=startX+(vx-startX)*travel,y=startY+(vy-130-startY)*travel;c.beginPath();c.moveTo(x-dir*9,y);c.lineTo(x+dir*4,y);c.stroke();}
      c.restore();
    }
    // Skull Face is intentionally unarmed until a personal weapon is established by selected original TPP evidence.
    return true;
  }
  const api={apply,origins,applyFinishers,finisherPose,hasSourceFinisher,drawFinisher,cloakAlpha,attachEngine,chaffProjectiles,drawChaffProjectile,drawChaff,reviewedUIDs,slots,
    sourceStatus:'closest_supported; native source-SHA origins are accepted only when the PASS7 anchor catalog is loaded. Until then, fallback origins are authored cues and do not certify pixel alignment. Chaff canister shape, physical paint colour, cloud and all combat timings are Versus adaptations.'};
  root.CQC_PASS7_COMBAT_FIDELITY=api;if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
