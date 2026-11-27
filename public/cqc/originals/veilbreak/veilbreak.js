import {SAVE_KEY,freshSave,sanitizeSave,profile,buildRoutes,encounterConfig,acceptResult,validMessage,ACT_NAMES} from './campaign.js';
const $=id=>document.getElementById(id);
const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const textOf=v=>typeof v==='string'?v:Array.isArray(v)?v.map(textOf).filter(Boolean).join(' · '):v&&typeof v==='object'?(v.text||v.description||v.name||v.summary||''):'';
const asset=p=>p?new URL('../../'+p,location.href).href:'';
const imageOf=x=>x.sprite||x.backgroundAsset||x.asset||x.imageAsset||x.art?.asset||x.portrait||'';
const inputNames={light:'J',heavy:'K',low:'↓ + J',throw:'U',special:'I',specialDown:'↓ + I',specialForward:'AV + I',specialBack:'AR + I',super:'O',utility:'L'};
let data,save,routes,currentTab='stages',active=null,resultRun=null,storageOK=true,setupMode='cpu',storyDone=null,storyIndex=0,storyScenes=[],storyFighter=null,storyKind='intro',loadTimer=null;
const all=()=>[...data.fighters,...data.enemies,...data.bosses,...data.stages,...data.props,...data.projectiles];
function persist(){try{localStorage.setItem(SAVE_KEY,JSON.stringify(save));storageOK=true;}catch{storageOK=false;}renderStatus();}
function renderStatus(){if(!save)return;const p=profile(save,save.selected);$('saveStatus').textContent=storageOK?'Progression personnelle · sauvegarde automatique':'Sauvegarde locale indisponible · progression conservée pour cette session';$('campaignCount').textContent=p.campaign+' / 40 rencontres';$('bossCount').textContent='Boss rush · '+p.bossrush+' / 20';}
function selected(){return data.fighters.find(f=>f.id===save.selected);}
function syncSelection(){
 const f=selected();if(!f)return;
 $('fighterSelect').value=f.id;
 if(save.reserve===f.id)save.reserve=data.fighters.find(x=>x.id!==f.id).id;
 $('reserveSelect').value=save.reserve;
 for(const o of $('reserveSelect').options)o.disabled=o.value===f.id;
 $('reserveSelect').disabled=!save.duo;$('duoToggle').checked=save.duo;$('difficultySelect').value=save.difficulty;
 $('heroFighter').src=asset(imageOf(f));$('heroName').textContent=f.name;$('heroRole').textContent=f.role;$('storyName').textContent=f.name;
 const p=profile(save,f.id);$('continueCampaign').innerHTML=(p.campaign===40?'Opération accomplie':p.campaign?'Reprendre l’opération':'Ouvrir l’opération')+' <span>→</span>';
 persist();renderCatalog();
}
function option(x){return '<option value="'+escape(x.id)+'">'+escape(x.name)+'</option>';}
function renderCatalog(){
 if(!data)return;const c=$('catalog');c.setAttribute('aria-labelledby','tab-'+currentTab);
 if(currentTab==='stages'){const progress=profile(save,save.selected).campaign;const actNames=data.campaign?.acts?.map(a=>a.name)||ACT_NAMES;c.innerHTML=actNames.map((name,act)=>'<div class="act-title"><small>ACTE 0'+(act+1)+'</small><h3>'+escape(name)+'</h3></div><div class="stage-grid">'+data.stages.slice(act*5,act*5+5).map((s,j)=>{
  const i=act*5+j,unlocked=i*2<=progress,done=progress>i*2+1,current=Math.floor(progress/2)===i,boss=data.bosses.find(b=>b.id===s.boss_id);
  return '<article class="stage-card '+(current?'current':'')+'"><div class="stage-image"><img src="'+escape(asset(imageOf(s)))+'" alt="'+escape(s.name)+'" loading="lazy" decoding="async" width="1536" height="1024"><span class="stage-number">'+String(i+1).padStart(2,'0')+'</span></div><div class="stage-info"><h4>'+escape(s.name)+'</h4><p>'+escape(boss?.name||'Cible de secteur')+'</p><button class="stage-action" data-stage="'+i+'" '+(!unlocked?'disabled':'')+'>'+(!unlocked?'EN ATTENTE':done?'REJOUER LE SECTEUR':progress===i*2+1?'AFFRONTER LE BOSS':'ENTRER EN OPÉRATION')+' <span>'+(done?'✓':unlocked?'→':'—')+'</span></button></div><button class="stage-details" data-detail="'+escape(s.id)+'" aria-label="Dossier : '+escape(s.name)+'">+</button></article>';
 }).join('')+'</div>').join('');
 }else{
  const items=currentTab==='arsenal'?[...data.props,...data.projectiles]:data[currentTab];
  c.innerHTML='<div class="roster-grid '+(currentTab==='arsenal'?'arsenal-grid':'')+'">'+items.map(x=>'<button class="roster-card" data-detail="'+escape(x.id)+'">'+(imageOf(x)?'<img src="'+escape(asset(imageOf(x)))+'" alt="'+escape(x.name)+'" loading="lazy" decoding="async" width="1024" height="1536">':'<div class="technical-art"><span>DOSSIER TECHNIQUE</span><small>Illustration non disponible</small></div>')+'<div><h3>'+escape(x.name)+'</h3><p>'+escape(textOf(x.role||x.function||x.combat?.role||x.category||x.type||'Équipement de terrain'))+'</p></div></button>').join('')+'</div>';
 }
}
function showTab(name,focus=false){if(!['stages','fighters','enemies','bosses','arsenal'].includes(name))return;currentTab=name;document.querySelectorAll('[data-tab]').forEach(b=>{const on=b.dataset.tab===name;b.setAttribute('aria-selected',String(on));b.tabIndex=on?0:-1;if(on&&focus)b.focus();});renderCatalog();}
function list(title,values){const rows=(Array.isArray(values)?values:[values]).map(textOf).filter(Boolean);return rows.length?'<h3>'+escape(title)+'</h3><ul class="detail-list">'+rows.map(x=>'<li>'+escape(x)+'</li>').join('')+'</ul>':'';}
function details(id){
 const x=all().find(x=>x.id===id);if(!x)return;const playable=data.fighters.includes(x),stage=data.stages.includes(x);
 const narrative=textOf(x.biography||x.description||x.loreFunction||x.narrativeRole||x.function||x.visualBrief);
 const moves=x.combat?.moves,resource=x.combat?.resource;
 let body='<div class="dossier-layout">'+(imageOf(x)?'<img class="dossier-art '+(stage?'stage-art':'')+'" src="'+escape(asset(imageOf(x)))+'" alt="'+escape(x.name)+'">':'<div class="technical-art dossier-art"><span>DOSSIER TECHNIQUE</span><small>Illustration non disponible</small></div>')+'<div class="dossier-copy"><p class="eyebrow">'+(playable?'AGENT ORIGINAL':stage?'ZONE D’OPÉRATION':data.bosses.includes(x)?'CIBLE PRIORITAIRE':data.enemies.includes(x)?'UNITÉ ADVERSE':'ARSENAL')+'</p><h2>'+escape(x.name)+'</h2>';
 if(x.realName)body+='<span class="detail-tag">'+escape(x.realName)+(x.age?' · '+x.age+' ans':'')+'</span>';
 if(x.role)body+='<span class="detail-tag">'+escape(x.role)+'</span>';
 body+='<p>'+escape(narrative)+'</p>';
 if(stage)body+=list('Objectif',x.campaignObjective)+list('Lecture du terrain',x.hazardPolicy);
 if(x.counterplay)body+=list('Contre-mesures',x.counterplay);
 if(x.combat?.limitations)body+=list('Points de vigilance',x.combat.limitations);
 if(x.loadout)body+=list('Équipement',x.loadout);
 if(resource)body+='<h3>'+escape(resource.name||'Ressource')+'</h3><p>'+escape(resource.description||resource.label||resource.kind)+' · Capacité '+escape(resource.max)+'</p>';
 if(playable)body+='<div class="dossier-actions"><button class="primary" data-select="'+escape(id)+'">Choisir '+escape(x.name)+' →</button><button class="outline" data-story="'+escape(id)+'">Lire son dossier</button></div>';
 if(moves)body+='<div class="moves"><h3>Répertoire de combat</h3>'+Object.entries(moves).map(([slot,m])=>'<div class="move"><kbd>'+escape(inputNames[slot]||slot)+'</kbd><div><strong>'+escape(m.name)+'</strong><small>'+escape(m.kind)+' · '+escape(m.damage||0)+' dégâts · '+escape(m.startup)+' / '+escape(m.active)+' / '+escape(m.recovery)+' frames'+(m.cost?' · coût '+m.cost:'')+(m.meter?' · jauge '+m.meter:'')+'</small></div></div>').join('')+'</div>';
 if(x.mechanics)body+=list('Lecture du boss',x.mechanics);
 body+='</div></div>';$('dossierContent').innerHTML=body;$('dossierDialog').showModal();
}
function showAbout(){
 $('dossierContent').innerHTML='<div class="dossier-copy"><p class="eyebrow">CQC / OPÉRATIONS ORIGINALES</p><h2>VEILBREAK.</h2><p>La dette des soldats est une extension originale du projet CQC, située à Port Nacre en 2016. Elle met en scène des personnages, lieux, ennemis et machines créés pour cette histoire. Elle ne revendique aucun statut officiel ou canonique.</p><p>Ses thèmes : la dépendance aux systèmes de maintenance, le travail militaire sous contrat et le droit de disposer de son propre corps. Les événements restent locaux ; ils ne ressuscitent aucun personnage et ne remplacent aucun événement de la saga.</p><h3>Dans cette version</h3><ul class="detail-list"><li>10 agents jouables, 20 zones, 20 unités ennemies, 20 boss.</li><li>40 rencontres de campagne et un parcours séparé de 20 boss, avec progression personnelle par agent.</li><li>Combat libre, entraînement et équipe 2v2 : tag, assist vulnérable, ressources séparées et relève après K.-O.</li><li>Illustrations originales de base et décors composés. Les poses de combat complètes, les plans de parallaxe séparés, les voix et les musiques restent à produire.</li><li>Les récits sont présentés sous forme de scènes écrites. Les tenues alternatives et neutralisations décrites dans la bible ne sont pas toutes animées.</li></ul><h3>Commandes</h3><p>Les commandes de chaque joueur, les options d’entraînement et la pause sont accessibles pendant le combat. Les quatre spéciaux utilisent I avec la direction choisie. Une réserve devient disponible lorsque l’équipe 2v2 est activée.</p><h3>Repères d’univers</h3><ul class="source-links"><li><a href="https://www.konami.com/mg/history/jp/ja/mgs4" target="_blank" rel="noopener">KONAMI · Metal Gear Solid 4</a></li><li><a href="https://www.konami.com/mg/archive/mgr/jp/story/" target="_blank" rel="noopener">KONAMI · Metal Gear Rising</a></li><li><a href="https://www.platinumgames.com/official-blog/article/4527" target="_blank" rel="noopener">PlatinumGames · Staying True to Metal Gear</a></li></ul><p class="small-print">Conception originale et intégration : projet MGS Codec Simulator / CQC. Illustrations produites avec ImageGen, prompts et empreintes conservés dans le dossier P74 du dépôt. Les marques et personnages officiels appartiennent à leurs ayants droit.</p></div>';$('dossierDialog').showModal();
}
function openStory(fighter,kind='intro',onDone=null){
 const scenes=fighter.story?.[kind];if(!Array.isArray(scenes)||!scenes.length){onDone?.();return;}
 storyScenes=scenes;storyIndex=0;storyFighter=fighter;storyKind=kind;storyDone=onDone;renderStory();$('storyDialog').showModal();
}
function renderStory(){
 const scene=storyScenes[storyIndex],title=scene.title||storyFighter.name;
 $('storyContent').innerHTML='<article class="story-page"><p class="eyebrow">'+escape(storyKind==='ending'?'APRÈS L’OPÉRATION':'DOSSIER PERSONNEL')+' / '+escape(storyFighter.name)+'</p><h2>'+escape(title)+'</h2><p class="story-text">'+escape(textOf(scene))+'</p><div class="story-footer"><small>SCÈNE '+(storyIndex+1)+' / '+storyScenes.length+'</small><button class="primary" id="storyNext">'+(storyIndex<storyScenes.length-1?'Scène suivante':'Fermer le dossier')+' <span>→</span></button></div></article>';
 $('storyNext').onclick=()=>{if(++storyIndex<storyScenes.length){renderStory();$('storyNext').focus();}else{const callback=storyDone;storyDone=null;profile(save,storyFighter.id)[storyKind==='ending'?'ending':'intro']=true;persist();$('storyDialog').close();callback?.();}};
}
function startRoute(mode,index){
 const p=profile(save,save.selected),max=routes[mode].length;
 if(index===undefined)index=p[mode];
 if(index>=max){if(mode==='campaign')openStory(selected(),'ending');else{showTab('bosses');$('archiveTitle').scrollIntoView();}return;}
 if(!Number.isInteger(index)||index<0||index>p[mode])return;
 const begin=()=>launch(mode,index);
 if(mode==='campaign'&&index===0&&!p.intro)openStory(selected(),'intro',begin);else begin();
}
function launch(mode,index=0,extra={}){
 if(active)return;const config=encounterConfig(data,save,mode,index,extra),token=globalThis.crypto?.randomUUID?.()||Date.now().toString(36)+'-'+Math.random().toString(36).slice(2);
 active={token,mode,index,fighterId:save.selected,config,started:false,handled:false};
 $('battleOverlay').hidden=false;$('battleLoading').hidden=false;document.body.style.overflow='hidden';
 $('battleFrame').src='battle.html?embedded=1';
 clearTimeout(loadTimer);loadTimer=setTimeout(()=>{if(active&&!active.started){$('battleLoading').querySelector('h2').textContent='Le terrain met du temps à répondre.';}},15000);
}
function closeBattle(){
 clearTimeout(loadTimer);$('battleFrame').src='about:blank';$('battleOverlay').hidden=true;$('battleLoading').hidden=false;$('battleLoading').querySelector('h2').textContent='Entrée sur le terrain…';document.body.style.overflow='';active=null;$('continueCampaign').focus();
}
function onResult(result){
 if(!active||active.handled||!result||![-1,0,1].includes(result.winner)||!Number.isInteger(result.frames)||result.frames<1)return;
 active.handled=true;const run=active,advanced=acceptResult(save,run,result);resultRun={...run,result,advanced};persist();closeBattle();syncSelection();
 const win=result.winner===0,route=routes[run.mode],done=win&&route&&run.index===route.length-1;
 $('resultKicker').textContent=win?'OBJECTIF ATTEINT':result.winner<0?'CONTACT ROMPU':'REPLI TACTIQUE';
 $('resultTitle').textContent=done?(run.mode==='campaign'?'Le passage est ouvert.':'Les vingt verrous sont tombés.'):win?'Secteur sécurisé.':'Le contrat tient encore.';
 const e=route?.[run.index],opponent=all().find(f=>f.id===run.config.opponentId);
 $('resultText').textContent=(e?e.title+' · ':'')+(opponent?.name||'')+' — '+(advanced?'Progression enregistrée.':win&&route?'Rencontre rejouée ; progression conservée.':'Réorganise ton approche et reprends le combat.');
 $('resultNext').hidden=!win||!route;$('resultNext').textContent=done?(run.mode==='campaign'?'Lire le dénouement →':'Retour aux cibles →'):'Rencontre suivante →';
 $('resultDialog').showModal();
}
function setup(mode){
 setupMode=mode;$('setupTitle').textContent=mode==='training'?'Terrain d’exercice.':'Préparer le combat.';
 $('opponentSelect').innerHTML='<optgroup label="Agents">'+data.fighters.map(option).join('')+'</optgroup><optgroup label="Unités ennemies">'+data.enemies.map(option).join('')+'</optgroup><optgroup label="Boss">'+data.bosses.map(option).join('')+'</optgroup>';
 $('opponentSelect').value=data.fighters.find(f=>f.id!==save.selected).id;$('stageSelect').innerHTML=data.stages.map(option).join('');$('controlLabel').hidden=mode==='training';$('setupDialog').showModal();
}
function bind(){
 document.querySelectorAll('a.brand').forEach(a=>a.addEventListener('click',e=>{if(parent!==window){e.preventDefault();parent.postMessage({type:'cqc-admin-close'},location.origin);}}));
 $('fighterSelect').onchange=e=>{save.selected=e.target.value;syncSelection();};
 $('reserveSelect').onchange=e=>{save.reserve=e.target.value;persist();};
 $('difficultySelect').onchange=e=>{save.difficulty=e.target.value;persist();};
 $('duoToggle').onchange=e=>{save.duo=e.target.checked;syncSelection();};
 $('continueCampaign').onclick=() =>startRoute('campaign');$('campaignMode').onclick=()=>startRoute('campaign');$('bossMode').onclick=()=>startRoute('bossrush');
 $('readStory').onclick=()=>openStory(selected());$('versusMode').onclick=()=>setup('cpu');$('trainingMode').onclick=()=>setup('training');
 $('aboutButton').onclick=showAbout;$('creditsButton').onclick=showAbout;
 $('launchFree').onclick=()=>{const extra={opponentId:$('opponentSelect').value,stageId:$('stageSelect').value},mode=setupMode==='training'?'training':$('controlSelect').value;$('setupDialog').close();launch(mode,0,extra);};
 $('catalog').onclick=e=>{const detail=e.target.closest('[data-detail]'),stage=e.target.closest('[data-stage]');if(detail)details(detail.dataset.detail);else if(stage&&!stage.disabled){const index=Number(stage.dataset.stage)*2,p=profile(save,save.selected).campaign;startRoute('campaign',p===index+1?p:index);}};
 $('dossierContent').onclick=e=>{const s=e.target.closest('[data-select]'),st=e.target.closest('[data-story]');if(s){save.selected=s.dataset.select;$('dossierDialog').close();syncSelection();$('operation').scrollIntoView();}else if(st){$('dossierDialog').close();openStory(data.fighters.find(f=>f.id===st.dataset.story));}};
 document.querySelectorAll('[data-tab]').forEach(b=>{b.onclick=()=>showTab(b.dataset.tab);b.onkeydown=e=>{const tabs=[...document.querySelectorAll('[data-tab]')],i=tabs.indexOf(b);let n;if(e.key==='ArrowRight')n=(i+1)%tabs.length;else if(e.key==='ArrowLeft')n=(i+tabs.length-1)%tabs.length;else if(e.key==='Home')n=0;else if(e.key==='End')n=tabs.length-1;else return;e.preventDefault();showTab(tabs[n].dataset.tab,true);};});
 $('abortLoad').onclick=closeBattle;
 $('resultBack').onclick=()=>{$('resultDialog').close();resultRun=null;};
 $('resultRetry').onclick=()=>{const r=resultRun;$('resultDialog').close();resultRun=null;if(r)launch(r.mode,r.index,{opponentId:r.config.opponentId,stageId:r.config.stageId});};
 $('resultNext').onclick=()=>{const r=resultRun;$('resultDialog').close();resultRun=null;if(r)startRoute(r.mode,r.index+1);};
 $('storyDialog').addEventListener('close',()=>{storyDone=null;});
 window.addEventListener('message',e=>{
  const frame=$('battleFrame').contentWindow;if(!active||e.source!==frame||e.origin!==location.origin)return;
  if(e.data?.type==='vb-ready'&&!active.started){active.started=true;frame.postMessage({type:'vb-start',token:active.token,config:active.config},location.origin);$('battleLoading').hidden=true;clearTimeout(loadTimer);$('battleFrame').focus();}
  else if(validMessage(e,frame,location.origin,active.token,'vb-result'))onResult(e.data.result);
  else if(validMessage(e,frame,location.origin,active.token,'vb-exit'))closeBattle();
 });
}
async function boot(){
 try{
 const response=await fetch('../../data/veilbreak-content.json');if(!response.ok)throw Error('Dossier '+response.status);data=await response.json();
 if(data.fighters?.length!==10||data.stages?.length!==20||data.enemies?.length!==20||data.bosses?.length!==20)throw Error('Dossier incomplet');
 let raw=null;try{raw=JSON.parse(localStorage.getItem(SAVE_KEY)||'null');}catch{storageOK=false;}
 save=sanitizeSave(raw,data.fighters.map(f=>f.id));routes=buildRoutes(data);
 $('fighterSelect').innerHTML=data.fighters.map(option).join('');$('reserveSelect').innerHTML=data.fighters.map(option).join('');
 $('fighterSelect').disabled=false;$('continueCampaign').disabled=false;$('readStory').disabled=false;
 bind();syncSelection();
 }catch(error){$('catalog').innerHTML='<p class="error-text">Le dossier ne peut pas être ouvert. Recharge la page lorsque la liaison est rétablie.</p>';$('saveStatus').textContent='Chargement interrompu';console.error('VEILBREAK',error);}
}
boot();

