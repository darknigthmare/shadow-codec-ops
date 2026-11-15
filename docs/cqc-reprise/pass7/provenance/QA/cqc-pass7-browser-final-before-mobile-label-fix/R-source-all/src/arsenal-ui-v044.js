(()=>{'use strict';const E=ArsenalEngine,R=ArsenalRender,$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],STORE='cqc-v044-arsenal';
function validMap(value){return value&&typeof value==='object'&&!Array.isArray(value)?value:{};}
function positive(value,fallback=0){return Number.isFinite(value)&&value>=0?value:fallback;}
let profile={schema:1,records:{},campaignWins:{},checkpoint:null,last:'rex',legacy42:null};
try{
 const raw=JSON.parse(localStorage.getItem(STORE)||localStorage.getItem('cqc-v043-arsenal')||'null');
 if(raw?.schema===1){
  profile.last=typeof raw.last==='string'?raw.last:'rex';
  profile.checkpoint=raw.checkpoint&&typeof raw.checkpoint==='object'?raw.checkpoint:null;
  profile.legacy42=validMap(raw.legacy42);
  for(const [id,r] of Object.entries(validMap(raw.records))){
   if(DATA.machines.some(m=>m.id===id)&&r&&typeof r==='object')profile.records[id]={wins:Math.floor(positive(r.wins)),best:positive(r.best,1e9)};
  }
  for(const [id,wins] of Object.entries(validMap(raw.campaignWins)))if(DATA.campaigns.some(c=>c.id===id))profile.campaignWins[id]=Math.floor(positive(wins));
 }else{const old=JSON.parse(localStorage.getItem('cqc-v042-arsenal')||'null');if(old)profile.legacy42=old;}
}catch{}

function save(){try{localStorage.setItem(STORE,JSON.stringify(profile));return true;}catch{return false;}}
let selected=DATA.machines.find(m=>m.id===profile.last)||DATA.machines[2],filter='TOUS',view='machines',s=null,route=null,playing=false,handled=false,stamp=0,raf=0,previewTick=0,touchForced=false;
const keys=new Set(),pressed=new Set();function clearKeys(){keys.clear();pressed.clear();$$('[data-key]').forEach(b=>b.classList.remove('down'));}
function returnMenu(){playing=false;s=null;route=null;handled=false;clearKeys();$('#play').classList.add('hidden');$('#menu').classList.remove('hidden');$('#paused').classList.add('hidden');$('#result').classList.add('hidden');tab('machines');}
function exit(){returnMenu();if(parent!==window)parent.postMessage({type:'cqc-admin-close'},'*');else location.href='../index.html';}
function tab(name){view=name;$$('[data-tab]').forEach(b=>b.classList.toggle('on',b.dataset.tab===name));for(const t of ['machines','routes','records'])$('#'+t+'View').classList.toggle('hidden',t!==name);if(name==='records')records();}
const group=m=>m.origin==='adapted'?m.ep:m.origin==='completion44'?'COMPLÉMENTS 0.44':'LEGACY';
function filters(){const fs=['TOUS','LEGACY','COMPLÉMENTS 0.44','REVENGEANCE','AC!D','AC!D 2'];$('#filters').innerHTML='';for(const text of fs){const b=document.createElement('button');b.textContent=text;b.classList.toggle('on',text===filter);b.onclick=()=>{filter=text;filters();grid();};$('#filters').appendChild(b);}}
function previewState(def,tick=0){const v=E.create(def,{mode:'practice'});v.tick=tick;v.player.x=250;return v;}
function grid(){const g=$('#grid');g.innerHTML='';for(const m of DATA.machines.filter(m=>filter==='TOUS'||group(m)===filter)){
 const b=document.createElement('button');b.className='card'+(m.id===selected.id?' selected':'');b.dataset.machine=m.id;b.innerHTML='<canvas width="320" height="180"></canvas><div class="copy"><strong></strong><small></small></div>';b.querySelector('strong').textContent=m.name;b.querySelector('small').textContent=m.ep;b.onclick=()=>{selected=m;select();grid();};g.appendChild(b);const st=previewState(m);R.draw(b.querySelector('canvas').getContext('2d'),st,{preview:true,hudVisible:false});}}
function select(){$('#previewName').textContent=selected.name;$('#previewEp').textContent=selected.ep+' / '+selected.stage;$('#previewText').textContent=selected.summary;$('#facts').innerHTML=`<span>${selected.parts.length} SOUS-SYSTÈMES</span><span>${selected.time} SECONDES</span><span>${selected.weapon==='blade'?'LAME HF':selected.weapon==='cards'?'CARTES / COST':'ARMEMENT'}</span>`;$('#rule').textContent=selected.gimmick;}
function routes(){$('#routes').innerHTML='';for(const r of DATA.campaigns){const b=document.createElement('button');b.className='route';b.innerHTML='<span></span><strong></strong><p></p>';b.querySelector('span').textContent=r.route.length+' COMBAT(S)';b.querySelector('strong').textContent=r.name;b.querySelector('p').textContent=r.route.map(id=>DATA.machines.find(m=>m.id===id).name).join(' → ');b.onclick=()=>{route={id:r.id,index:0};start(r.route[0]);};$('#routes').appendChild(b);}}
function records(){$('#records').innerHTML='';for(const m of DATA.machines){const r=profile.records[m.id];const tr=document.createElement('tr');for(const text of [m.name,String(r?.wins||0),r?`${(r.best/60).toFixed(1)} s`:'—']){const td=document.createElement('td');td.textContent=text;tr.appendChild(td);}$('#records').appendChild(tr);}}
function start(id,mode='combat'){const def=DATA.machines.find(m=>m.id===id);if(!def)return false;selected=def;s=E.create(def,{mode});playing=true;handled=false;clearKeys();stamp=performance.now();if(mode==='practice')route=null;
 if(mode==='combat'){profile.last=id;profile.checkpoint={id,route:route?{...route}:null};save();}
 $('#menu').classList.add('hidden');$('#play').classList.remove('hidden');$('#result').classList.add('hidden');$('#paused').classList.add('hidden');$('#resetPractice').classList.toggle('hidden',mode!=='practice');$('#targetList').innerHTML='';def.parts.forEach((p,i)=>{const o=document.createElement('option');o.value=i;o.textContent=p.name;$('#targetList').appendChild(o);});return true;}
function finishUI(){if(handled||!s||s.status!=='result')return;handled=true;clearKeys();const ticks=s.finishedAt,practice=s.mode==='practice';let nextReady=false;
 if(!practice&&s.won){const r=profile.records[s.def.id]||{wins:0,best:1e9};r.wins++;r.best=Math.min(r.best,ticks);profile.records[s.def.id]=r;
  if(route){const chain=DATA.campaigns.find(c=>c.id===route.id);route.index++;if(route.index<chain.route.length){profile.checkpoint={id:chain.route[route.index],route:{...route}};nextReady=true;}else{profile.campaignWins[route.id]=(profile.campaignWins[route.id]||0)+1;profile.checkpoint=null;route=null;}}else profile.checkpoint=null;save();}
 $('#resultLabel').textContent=practice?'SIMULATION — AUCUN RECORD':s.won?'OPÉRATION RÉUSSIE':'OPÉRATION INTERROMPUE';$('#resultTitle').textContent=s.resultText;$('#resultNote').textContent=practice?'L’entraînement reste séparé des dossiers et des archives.':nextReady?'Checkpoint enregistré à la prochaine machine.':s.won?'Les sous-systèmes ont été neutralisés.':'Le dossier reprendra au début de cette rencontre.';
 $('#metrics').innerHTML=`<div><b>${(ticks/60).toFixed(1)} s</b>TEMPS</div><div><b>${s.stats.destroyed}</b>PIÈCES</div><div><b>${s.stats.parries}</b>RIPOSTES</div>`;$('#next').classList.toggle('hidden',!nextReady);$('#result').classList.remove('hidden');}
function resumeCheckpoint(){const cp=profile.checkpoint;if(cp&&DATA.machines.some(m=>m.id===cp.id)){if(cp.route){const c=DATA.campaigns.find(c=>c.id===cp.route.id);route=c&&c.route[cp.route.index]===cp.id?{id:c.id,index:cp.route.index}:null;}else route=null;start(cp.id);}else{route=null;start(profile.last||'rex');}}
function pause(on){if(!s||s.status!=='fight')return;s.paused=on;s.acc=0;clearKeys();stamp=performance.now();$('#paused').classList.toggle('hidden',!on);}
const input=()=>({move:(keys.has('ArrowRight')?1:0)-(keys.has('ArrowLeft')?1:0),jump:pressed.has('ArrowUp'),dash:pressed.has('ShiftLeft')||pressed.has('ShiftRight'),fire:keys.has('KeyJ')||keys.has('KeyH'),heavy:keys.has('KeyH')||keys.has('ArrowDown'),lock:keys.has('KeyK'),cycle:pressed.has('KeyK'),action:pressed.has('KeyI'),actionHold:keys.has('KeyI'),reload:pressed.has('KeyR'),ration:pressed.has('KeyL')});
function frame(now){const dt=stamp?Math.min(250,now-stamp):0;stamp=now;
 if(playing&&s){if(!s.paused&&s.status==='fight'){const ticks=E.advance(s,dt,input());if(ticks>0)pressed.clear();}R.draw($('#game').getContext('2d'),s);$('#targetList').value=s.target;finishUI();}
 else if(view==='machines'&&document.visibilityState!=='hidden'){previewTick+=Math.min(2,dt/16.6667);R.draw($('#preview').getContext('2d'),previewState(selected,Math.floor(previewTick)),{preview:true,hudVisible:false});}
 raf=requestAnimationFrame(frame);}
$('#launch').onclick=()=>{route=null;start(selected.id);};$('#practice').onclick=()=>start(selected.id,'practice');$('#command').onclick=exit;$('#continue').onclick=resumeCheckpoint;$$('[data-tab]').forEach(b=>b.onclick=()=>tab(b.dataset.tab));$('#leave').onclick=returnMenu;$('#pauseLeave').onclick=returnMenu;$('#resultMenu').onclick=returnMenu;$('#pauseButton').onclick=()=>pause(true);$('#resume').onclick=()=>pause(false);
$('#resetPractice').onclick=()=>{if(s)start(s.def.id,'practice');};$('#retry').onclick=()=>{if(s){const id=s.def.id,mode=s.mode;if(route&&profile.checkpoint?.id!==id)route=null;start(id,mode);}};$('#next').onclick=resumeCheckpoint;
$('#targetList').onchange=e=>{if(s&&!s.paused)s.target=Number(e.target.value);};$('#touchToggle').onclick=()=>{touchForced=!touchForced;$('#touch').style.display=touchForced?'flex':'';$('#touchToggle').classList.toggle('active',touchForced);};
const handledKeys=['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','KeyJ','KeyH','KeyK','KeyI','KeyR','KeyL','ShiftLeft','ShiftRight'];
addEventListener('keydown',e=>{if(!playing)return;if(e.code==='Escape'){e.preventDefault();if(!e.repeat)pause(!s.paused);return;}if(handledKeys.includes(e.code)){e.preventDefault();if(!keys.has(e.code))pressed.add(e.code);keys.add(e.code);}if(e.code.startsWith('Digit')&&s){const i=Number(e.code.slice(5))-1;if(i>=0&&i<s.hp.length)s.target=i;}});addEventListener('keyup',e=>keys.delete(e.code));
$$('[data-key]').forEach(b=>{const key=b.dataset.key;const up=e=>{e.preventDefault();keys.delete(key);b.classList.remove('down');};b.onpointerdown=e=>{e.preventDefault();b.setPointerCapture(e.pointerId);if(!keys.has(key))pressed.add(key);keys.add(key);b.classList.add('down');};b.onpointerup=up;b.onpointercancel=up;b.onlostpointercapture=()=>{keys.delete(key);b.classList.remove('down');};});
addEventListener('blur',()=>{if(playing)pause(true);else clearKeys();});document.addEventListener('visibilitychange',()=>{if(document.hidden&&playing)pause(true);});
// Inspection API: starting a practice session cannot credit a record.
window.__CQC044Arsenal={data:DATA,engine:E,getState:()=>s,startPractice:id=>{route=null;start(id,'practice');},show:tab,profile:()=>JSON.parse(JSON.stringify(profile)),version:'0.44'};
filters();grid();routes();select();requestAnimationFrame(frame);
})();
