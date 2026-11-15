/* Pure fixed-step combat simulation. No DOM, no storage, no real-time callbacks. */
(function(root,factory){const engine=factory();if(typeof module==='object'&&module.exports)module.exports=engine;else root.ArsenalEngine=engine;})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
const FPS=60,STEP=1000/FPS,FLOOR=598,clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
function seed(s){let h=2166136261;for(const c of s){h=Math.imul(h^c.charCodeAt(0),16777619);}return h>>>0;}
function rnd(s){s.rng=(Math.imul(1664525,s.rng)+1013904223)>>>0;return s.rng/4294967296;}
function create(def,options={}){
 if(!def||!Array.isArray(def.parts)||!def.parts.length)throw Error('Machine invalide');
 const s={def,mode:options.mode==='practice'?'practice':'combat',tick:0,acc:0,paused:false,status:'fight',won:false,
  rng:options.seed??seed(def.id),timer:def.time*FPS,unit:1,transition:0,revision:0,target:0,
  hp:def.parts.map(p=>p.hp),max:def.parts.map(p=>p.hp),player:{x:300,y:FLOOR,vy:0,face:1,hp:10000,max:10000,ammo:12,rockets:4,reload:0,cd:0,inv:0,parry:0,parryCd:0,dash:0,dashCd:0,rations:2,cost:0},
  boss:{x:922,y:FLOOR,exposure:0,clock:115,pattern:0,lock:0,radar:0,actionCd:0},
  launch:def.id==='bic'?120*FPS:0,nuke:0,terminal:0,nukeNext:0,clouds:[],events:[],bullets:[],fx:[],notices:[],
  stats:{shots:0,hits:0,damage:0,blocked:0,parries:0,reloads:0,destroyed:0,incoming:0,interrupts:0},eventLog:[],finishedAt:0};
 notice(s,def.gimmick||'Cible identifiée');return s;
}
function notice(s,text){s.notices.push({text,t:150});if(s.notices.length>3)s.notices.shift();}
function log(s,event){s.eventLog.push({...event,tick:s.tick});if(s.eventLog.length>160)s.eventLog.shift();}
function partPoint(s,i){const p=s.def.parts[i];if(!p)return null;let x=s.boss.x+p.x,y=s.boss.y+p.y;
 if(['harrier','chrysalis'].includes(s.def.id)){x+=Math.sin(s.tick*.012)*27;y+=Math.sin(s.tick*.028)*9;}
 return{x,y,r:p.r||30};
}
function baseUnlocked(s,i){return i>=0&&i<s.hp.length&&s.hp[i]>0&&(s.def.parts[i].requires||[]).every(k=>s.hp[k]<=0);}
function isUnlocked(s,i){if(!baseUnlocked(s,i))return false;let id=s.def.id;
 if(id==='harrier')return s.boss.lock>=90;
 if(id==='rex'&&i===1)return s.boss.exposure>0||s.tick%240<112;
 if(id==='chrysalis'&&i<4)return s.boss.radar>0;
 if(id==='ray_mgR'&&i===2)return s.boss.exposure>0;
 if(id==='grad')return s.boss.exposure>0;
 if(id==='peacewalker'&&i===2)return s.stats.interrupts>0;
 return true;
}
function reason(s,i){if(s.hp[i]<=0)return 'DÉTRUIT';if(!baseUnlocked(s,i))return 'PROTÉGÉ';if(isUnlocked(s,i))return 'EXPOSÉ';return s.def.id==='peacewalker'?'ARRÊTER LE LANCEMENT':s.def.id==='chrysalis'?'RADAR REQUIS':s.def.id==='harrier'?'VERROU REQUIS':s.def.id==='grad'?'EMP REQUIS':s.def.id==='ray_mgR'?'RIPOSTE REQUISE':'FERMÉ';}
function cycle(s){if(s.hp.every(v=>v<=0))return;for(let n=1;n<=s.hp.length;n++){const i=(s.target+n)%s.hp.length;if(s.hp[i]>0){s.target=i;return;}}}
function smartTarget(s){const i=s.hp.findIndex((v,i)=>v>0&&baseUnlocked(s,i));s.target=i<0?Math.max(0,s.hp.findIndex(v=>v>0)):i;}
function damagePart(s,i,amount){if(s.status!=='fight'||s.transition||i<0||i>=s.hp.length)return 0;
 if(!isUnlocked(s,i)){s.stats.blocked++;s.fx.push({...partPoint(s,i),t:13,kind:'shield'});return 0;}
 const d=Math.min(s.hp[i],Math.max(0,amount));s.hp[i]-=d;s.stats.damage+=d;s.stats.hits++;
 s.fx.push({...partPoint(s,i),t:18,kind:'hit'});
 if(s.hp[i]===0&&d>0){s.stats.destroyed++;notice(s,s.def.parts[i].name+' NEUTRALISÉ');log(s,{event:'destroy',part:i});
  // Already-telegraphed attacks tied to this subsystem are cancelled too.
  s.events=s.events.filter(e=>!e.sources.includes(i));s.bullets=s.bullets.filter(b=>b.owner!=='enemy'||!b.sources?.includes(i));
  smartTarget(s);s.fx.push({...partPoint(s,i),t:55,kind:'destroy'});
  if(s.def.id==='peacewalker'&&s.hp[0]===0&&s.hp[1]===0&&s.hp[2]>0&&!s.nuke){s.nuke=600;s.nukeNext=s.tick+900;notice(s,'LANCEMENT · terminal central : maintenir I');}
 }
 if(s.hp.every(v=>v<=0)){
  if(s.def.id==='raymass'&&s.unit<3){s.unit++;s.hp=[...s.max];s.target=0;s.boss.clock=150;s.transition=100;s.revision++;s.events=[];s.bullets=[];s.player.ammo=12;s.player.rockets=4;s.player.hp=Math.min(10000,s.player.hp+600);notice(s,'RAY '+s.unit+' / 3 · renfort détecté');log(s,{event:'wave',unit:s.unit});}
  else finish(s,true,'MACHINE NEUTRALISÉE');
 }
 return d;
}
function finish(s,win,text){if(s.status!=='fight')return;s.status='result';s.won=win;s.resultText=text;s.finishedAt=s.tick;s.events=[];s.bullets=[];log(s,{event:'result',win});}
function damagePlayer(s,d){const p=s.player;if(s.status!=='fight'||p.inv)return;if(s.mode!=='practice')p.hp=Math.max(0,p.hp-d);p.inv=30;s.stats.incoming+=s.mode==='practice'?0:d;s.fx.push({x:p.x,y:p.y-85,t:17,kind:'player'});if(p.hp<=0)finish(s,false,'OPÉRATEUR NEUTRALISÉ');}
function fire(s,heavy=false){const p=s.player;if(s.status!=='fight'||s.transition||p.cd||p.reload)return false;
 if(s.def.id==='harrier'&&s.boss.lock<90)return false;
 if(s.def.weapon==='cards'&&p.cost>78)return false;
 if(heavy?p.rockets<=0:p.ammo<=0){beginReload(s);return false;}
 const target=partPoint(s,s.target),muzzle={x:p.x+(target.x>=p.x?28:-28),y:p.y-95};p.face=target.x>=p.x?1:-1;
 const dx=target.x-muzzle.x,dy=target.y-muzzle.y,dist=Math.hypot(dx,dy)||1,blade=s.def.weapon==='blade';
 s.bullets.push({owner:'player',x:muzzle.x,y:muzzle.y,px:muzzle.x,py:muzzle.y,vx:dx/dist*(heavy?17:25),vy:dy/dist*(heavy?17:25),target:s.target,revision:s.revision,damage:heavy?520:120,t:125,kind:blade?'slash':heavy?'rocket':s.def.weapon==='cards'?'card':'bullet'});
 if(heavy)p.rockets--;else p.ammo--;p.cd=heavy?48:18;if(s.def.weapon==='cards')p.cost=clamp(p.cost+(heavy?24:14),0,100);s.stats.shots++;return true;
}
function beginReload(s){const p=s.player;if(p.reload||p.ammo===12&&p.rockets===4)return false;p.reload=95;p.cd=Math.max(p.cd,12);s.stats.reloads++;return true;}
function action(s,hold=false){const b=s.boss,p=s.player,id=s.def.id;
 if(id==='peacewalker'&&s.nuke>0&&Math.abs(p.x-610)<96&&p.y>=FLOOR-6){
  if(hold){s.terminal++;if(s.terminal>=45){s.nuke=0;s.terminal=0;s.nukeNext=s.tick+900;s.stats.interrupts++;notice(s,'LANCEMENT INTERROMPU');log(s,{event:'nukeCancel'});}}return;
 }
 if(hold)return;
 if(id==='chrysalis'&&b.actionCd===0){b.radar=240;b.actionCd=300;notice(s,'RADAR · 4 SECONDES');return;}
 if(id==='grad'&&b.actionCd===0){b.exposure=210;b.actionCd=390;s.events=[];notice(s,'EMP · BLINDAGE DÉVERROUILLÉ');return;}
 if(p.parryCd===0){p.parry=15;p.parryCd=32;}
}
function parried(s){const p=s.player;p.parry=0;s.stats.parries++;s.boss.exposure=Math.max(180,s.boss.exposure);p.inv=24;notice(s,'RIPOSTE · OUVERTURE');log(s,{event:'parry'});s.fx.push({x:p.x,y:p.y-80,t:30,kind:'parry'});}
function patterns(s){const n=s.hp.length,last=n-1,id=s.def.id;
 const beam=(sources)=>({kind:'beam',sources}),shot=(sources)=>({kind:'volley',sources}),stomp=(sources)=>({kind:'stomp',sources}),sweep=(sources)=>({kind:'sweep',sources});
 if(id==='zeke')return[beam([0]),shot([1])];
 if(id==='chrysalis')return [shot([0]),shot([3]),beam([2])];
 if(id==='harrier')return [shot([0]),beam([0]),shot([0])];
 if(id==='pupa')return [sweep([0]),sweep([1]),shot([last])];
 if(id==='rex')return [shot([0]),beam([1]),stomp([1])];
 if(id==='cocoon')return [beam([0]),shot([1]),stomp([2]),shot([3])];
 if(id==='grad')return [shot([0]),shot([1]),beam([2])];
 if(id==='ray_mgR')return [sweep([0]),sweep([1]),sweep([2])];
 if(id==='excelsus')return [stomp([0]),stomp([3]),sweep([4]),sweep([5]),beam([6])];
 if(id==='kodoque')return [beam([0]),beam([1]),shot([2])];
 if(id==='chaioth')return [stomp([0]),stomp([1]),beam([2])];
 if(id==='sahel')return [stomp([0]),stomp([1]),shot([2]),beam([3])];
 if(id==='gander')return [stomp([0]),stomp([1]),beam([2]),shot([3])];
 return [shot([last]),stomp([0]),beam([Math.min(1,last)])];
}
function schedule(s,override){const ps=patterns(s).filter(a=>a.sources.every(i=>s.hp[i]>0));if(!ps.length)return;
 const spec=override||ps[s.boss.pattern++%ps.length],src=partPoint(s,spec.sources[0]),p=s.player;
 const e={...spec,sources:[...spec.sources],age:0,warn:55,active:18,x:clamp(p.x,120,1150),y:spec.kind==='beam'?p.y-82:FLOOR,w:spec.kind==='sweep'?1250:174,from:src,hit:false,revision:s.revision};
 if(spec.kind==='sweep'){e.warn=62;e.y=FLOOR-38;e.w=1280;}
 if(spec.kind==='volley'){e.warn=40;e.active=1;}
 s.events.push(e);log(s,{event:'telegraph',kind:e.kind,sources:e.sources});
}
function segmentDistance(x,y,ax,ay,bx,by){const dx=bx-ax,dy=by-ay,l=dx*dx+dy*dy;const t=l?clamp(((x-ax)*dx+(y-ay)*dy)/l,0,1):0;return Math.hypot(x-ax-t*dx,y-ay-t*dy);}
function updateBullets(s){for(const b of s.bullets){b.px=b.x;b.py=b.y;b.x+=b.vx;b.y+=b.vy;b.t--;
 if(b.owner==='player'){
  if(b.revision!==s.revision){b.t=0;continue;}const pt=partPoint(s,b.target);
  if(pt&&segmentDistance(pt.x,pt.y,b.px,b.py,b.x,b.y)<=pt.r){damagePart(s,b.target,b.damage);b.t=0;}
 }else if(segmentDistance(s.player.x,s.player.y-78,b.px,b.py,b.x,b.y)<27){
  if(s.player.parry>0){parried(s);const to=partPoint(s,s.target),dx=to.x-b.x,dy=to.y-b.y,len=Math.hypot(dx,dy)||1;b.owner='player';b.target=s.target;b.revision=s.revision;b.vx=dx/len*17;b.vy=dy/len*17;b.damage*=.8;b.t=140;}else{damagePlayer(s,b.damage);b.t=0;}
 }
 }s.bullets=s.bullets.filter(b=>b.t>0&&b.x>-150&&b.x<1450&&b.y>-150&&b.y<900);}
function updateEvents(s){for(const e of s.events){
 if(!e.sources.every(i=>s.hp[i]>0)||e.revision!==s.revision){e.hit=true;e.age=e.warn+e.active;continue;}
 e.age++;if(e.age<e.warn)continue;
 if(e.kind==='volley'&&e.age===e.warn){const p=s.player;for(let i=-1;i<=1;i++){const to={x:e.x+i*38,y:p.y-80},dx=to.x-e.from.x,dy=to.y-e.from.y,d=Math.hypot(dx,dy)||1;s.bullets.push({owner:'enemy',x:e.from.x,y:e.from.y,px:e.from.x,py:e.from.y,vx:dx/d*9,vy:dy/d*9,t:160,damage:520,kind:'missile',sources:e.sources});}}
 if(e.hit)continue;const p=s.player;let coll=false;
 if(e.kind==='beam')coll=segmentDistance(p.x,p.y-78,e.from.x,e.from.y,e.x,e.y)<31;
 if(e.kind==='stomp')coll=Math.abs(p.x-e.x)<e.w/2&&p.y>FLOOR-90;
 if(e.kind==='sweep')coll=p.y>FLOOR-85;
 if(coll){e.hit=true;if(p.parry>0&&e.kind==='sweep')parried(s);else damagePlayer(s,e.kind==='stomp'?850:720);}
 }s.events=s.events.filter(e=>e.age<e.warn+e.active);}
function step(s,input={}){if(s.paused||s.status!=='fight')return s;
 s.tick++;if(s.transition>0){s.transition--;return s;}if(s.mode==='combat')s.timer--;
 const p=s.player,b=s.boss;for(const key of ['cd','inv','parry','parryCd','dash','dashCd'])p[key]=Math.max(0,p[key]-1);for(const key of ['exposure','radar','actionCd'])b[key]=Math.max(0,b[key]-1);
 p.cost=Math.max(0,p.cost-.24);for(const n of s.notices)n.t--;s.notices=s.notices.filter(n=>n.t>0);for(const f of s.fx)f.t--;s.fx=s.fx.filter(f=>f.t>0);
 if(p.reload>0&&--p.reload===0){p.ammo=12;p.rockets=4;notice(s,s.def.weapon==='cards'?'MAIN RENOUVELÉE':'ARMEMENT PRÊT');}
 const move=clamp(Number(input.move)||0,-1,1);if(move)p.face=move>0?1:-1;
 if(input.jump&&p.y>=FLOOR){p.vy=-13;}
 if(input.dash&&!p.dashCd){p.dash=12;p.dashCd=75;p.inv=Math.max(10,p.inv);}
 p.x=clamp(p.x+move*(p.dash?11:4.5),58,1220);p.y+=p.vy;p.vy+=.72;if(p.y>=FLOOR){p.y=FLOOR;p.vy=0;}
 if(Number.isInteger(input.target)&&input.target>=0&&input.target<s.hp.length&&s.hp[input.target]>0)s.target=input.target;
 if(input.cycle&&s.def.id!=='harrier')cycle(s);
 if(s.def.id==='harrier')b.lock=clamp(b.lock+(input.lock?2:-.45),0,100);
 if(input.action)action(s,false);if(input.actionHold)action(s,true);else s.terminal=Math.max(0,s.terminal-2);
 if(input.reload)beginReload(s);if(input.ration&&p.rations>0&&p.hp<10000){p.rations--;p.hp=Math.min(10000,p.hp+2500);}
 if(input.fire)fire(s,!!input.heavy);
 if(s.launch>0&&s.mode==='combat'){s.launch--;if(s.launch===0)finish(s,false,'LANCEMENT EFFECTUÉ');}
 if(s.nuke>0&&s.mode==='combat'){s.nuke--;if(!s.nuke)finish(s,false,'LANCEMENT NON INTERROMPU');}
 if(s.def.id==='peacewalker'&&s.hp[0]<=0&&s.hp[1]<=0&&s.hp[2]>0&&!s.nuke&&s.tick>=s.nukeNext){s.nuke=600;s.nukeNext=s.tick+900;}
 if(s.def.id==='sahel'&&s.hp[2]>0&&s.tick%380===0)s.clouds.push({x:200+rnd(s)*700,w:190,t:240});
 for(const c of s.clouds){c.t--;if(c.t<195&&Math.abs(p.x-c.x)<c.w/2&&p.y>FLOOR-80&&s.tick%30===0)damagePlayer(s,125);}s.clouds=s.clouds.filter(c=>c.t>0);
 if(--b.clock<=0){schedule(s);b.clock=118+Math.floor(rnd(s)*35);}
 updateBullets(s);updateEvents(s);
 if(s.timer<=0&&s.mode==='combat')finish(s,false,'TEMPS ÉCOULÉ');return s;
}
function advance(s,ms,input={}){if(s.paused||s.status!=='fight'){s.acc=0;return 0;}s.acc+=clamp(ms,0,250);let count=0;while(s.acc+1e-8>=STEP&&count<15){step(s,count===0?input:{...input,jump:false,dash:false,cycle:false,action:false,reload:false,ration:false,target:undefined});s.acc-=STEP;count++;}return count;}
return{FPS,STEP,FLOOR,create,step,advance,partPoint,baseUnlocked,isUnlocked,reason,cycle,damagePart,damagePlayer,fire,beginReload,action,schedule,patterns,segmentDistance};
});
