/* CQC P74: optional deterministic 2v2 teams for the existing duel engine.
 * Timings and costs are original CQC design, not Metal Gear source frame data. */
(function(root){'use strict';
const RULES=Object.freeze({tagStartup:30,tagRecovery:18,tagCooldown:360,interruptedTagCooldown:120,assistEntry:18,assistExit:18,assistCooldown:600,assistMeter:20,knockoutDelay:45});
const active=(s,side)=>side?s.b:s.a,key=p=>p.actorId||String(p.slot);
const reserve=(s,side)=>s.teams?.[side]?.members.find(p=>p!==active(s,side)&&p.life>0)||null;
function emit(s,type,p,extra={}){const e={frame:s.frame,type,actor:p?.slot??-1,actorId:p?key(p):null,...extra};s.events.push(e);if(s.events.length>180)s.events.shift();s.metrics[type]=(s.metrics[type]||0)+1;return e;}
function create(s,makeActor){const lists=s.options.teams;if(!lists)return;
 if(!Array.isArray(lists)||lists.length!==2||lists.some((list,side)=>!Array.isArray(list)||list.length!==2||list[0]?.uid!==active(s,side).f.uid||list[0]?.uid===list[1]?.uid||list.some(f=>!f?.uid||!f.combat?.moves)))throw Error('Le mode équipe exige deux combattants distincts par côté, avec le titulaire en premier.');
 s.teamRules='p74-tag-assist-v1';s.teams=lists.map((list,side)=>({members:list.map((f,index)=>{const p=index?makeActor(f,side):active(s,side);p.actorId=side+':'+index;p.memberIndex=index;return p;}),activeIndex:0,wins:0,tagCooldown:0,assistCooldown:0,pending:null,assist:null}));
}
function reset(s,makeActor,keepWins){if(!s.teams)return false;const previous=s.teams;
 s.teams=previous.map((team,side)=>{const wins=keepWins?team.wins:0,ai=active(s,side).ai;const members=team.members.map((old,index)=>{const p=makeActor(old.f,side);p.actorId=side+':'+index;p.memberIndex=index;p.wins=wins;p.ai=ai;return p;});if(side)s.b=members[0];else s.a=members[0];return{members,activeIndex:0,wins,tagCooldown:0,assistCooldown:0,pending:null,assist:null};});return true;
}
function actors(s){return s.teams?[s.a,s.b,...s.teams.flatMap(t=>t.assist?[t.assist.actor]:[])]:[s.a,s.b];}
function targets(s,p){return actors(s).filter(t=>t.slot!==p.slot&&t.life>0);}
function owner(s,e){return s.teams?.[e.owner]?.members.find(p=>p.actorId===e.ownerActorId)||active(s,e.owner);}
function neutral(p){return p.life>0&&p.onGround&&!p.attack&&!p.hit&&!p.blockstun&&!p.cool;}
function assistSlot(p){return[p.f.combat.assistSlot,'special','heavy','light'].filter(Boolean).find(slot=>{const m=p.f.combat.moves[slot];return m&&['melee','projectile'].includes(m.kind)&&m.level!=='throw'&&!m.requiresStagger&&!m.launchSelf&&!m.blink&&!(m.meter>0);})||null;}
function deny(s,p,message){p.feedback=message;p.feedbackT=60;emit(s,'teamDenied',p,{reason:message});return false;}
function request(s,side,action,hooks){if(!s.teams||s.phase!=='fight'||s.finished||![0,1].includes(side))return false;
 const team=s.teams[side],p=active(s,side),partner=reserve(s,side);if(!['tag','assist'].includes(action))return false;
 if(!partner)return deny(s,p,'AUCUNE RÉSERVE DISPONIBLE');if(team.pending||team.assist||!neutral(p))return deny(s,p,'RELAIS AU NEUTRE UNIQUEMENT');
 if(action==='tag'){if(team.tagCooldown)return deny(s,p,'RELAIS EN RÉCUPÉRATION');team.pending={kind:'tag',remaining:RULES.tagStartup,actorId:key(p),to:partner.memberIndex};p.vx=0;p.block=false;p.feedback='RELAIS · PRÉPARATION';p.feedbackT=RULES.tagStartup;emit(s,'tagStart',p,{to:key(partner)});return true;}
 if(team.assistCooldown)return deny(s,p,'ASSISTANCE EN RÉCUPÉRATION');if(p.meter<RULES.assistMeter)return deny(s,p,'ASSISTANCE : 20 DE JAUGE');
 const slot=assistSlot(partner),move=partner.f.combat.moves[slot];if(!slot||!hooks.costAllowed(partner,move)||partner.cooldowns[slot]>0||(partner.statuses.disarm?.t>0&&move.kind==='projectile'))return deny(s,p,'RÉSERVE : TECHNIQUE INDISPONIBLE');
 p.meter-=RULES.assistMeter;team.assistCooldown=RULES.assistCooldown;partner.x=hooks.clampActor(s,partner,p.x-p.face*80);partner.y=hooks.floor;partner.vx=partner.vy=0;partner.face=p.face;partner.onGround=true;partner.hit=partner.blockstun=partner.cool=0;partner.attack=null;partner.block=partner.crouch=false;
 team.assist={actor:partner,phase:'entry',remaining:RULES.assistEntry,slot};emit(s,'assistStart',p,{partner:key(partner),slot,meterCost:RULES.assistMeter});return true;
}
function tickReserve(p){for(const k of ['hit','blockstun','cool','throwProtect','shockImmune','sleepImmune','resourceDelay'])p[k]=Math.max(0,(p[k]||0)-1);for(const k of Object.keys(p.cooldowns))p.cooldowns[k]=Math.max(0,p.cooldowns[k]-1);for(const group of [p.buffs,p.statuses])for(const [k,value]of Object.entries(group))if(--value.t<=0)delete group[k];}
function before(s,inputs,hooks){if(!s.teams)return inputs;const routed=inputs.map(i=>({...i}));s.teams.forEach((team,side)=>{team.tagCooldown=Math.max(0,team.tagCooldown-1);team.assistCooldown=Math.max(0,team.assistCooldown-1);const p=active(s,side);team.members.filter(x=>x!==p&&x!==team.assist?.actor).forEach(tickReserve);
 const action=routed[side]?.teamAction;if(action){request(s,side,action,hooks);routed[side]=hooks.empty();}if(team.pending)routed[side]=hooks.empty();const aid=team.assist;if(aid?.phase==='entry'&&--aid.remaining<=0){aid.phase='attack';if(!hooks.start(s,aid.actor,aid.slot)){aid.phase='exit';aid.remaining=RULES.assistExit;}}
 });return routed;
}
function switchTo(s,side,index,forced,hooks){const team=s.teams[side],outgoing=active(s,side),incoming=team.members[index];incoming.x=hooks.clampActor(s,incoming,outgoing.x);incoming.y=hooks.floor;incoming.vx=incoming.vy=0;incoming.face=outgoing.face;incoming.onGround=true;incoming.attack=null;incoming.block=incoming.crouch=false;incoming.hit=incoming.blockstun=0;incoming.cool=RULES.tagRecovery;incoming.ai=outgoing.ai;incoming.wins=team.wins;incoming.state='idle';incoming.throwProtect=Math.max(incoming.throwProtect,RULES.tagRecovery);outgoing.attack=null;outgoing.vx=outgoing.vy=0;outgoing.block=false;if(side)s.b=incoming;else s.a=incoming;team.activeIndex=index;team.pending=null;team.assist=null;team.tagCooldown=RULES.tagCooldown;emit(s,forced?'knockoutTag':'tagComplete',incoming,{from:key(outgoing)});}
function after(s,hooks){if(!s.teams)return;s.teams.forEach((team,side)=>{const p=active(s,side),aid=team.assist;if(aid){if((aid.actor.hit>0||aid.actor.life<=0)&&aid.phase!=='exit'){aid.actor.attack=null;aid.phase='exit';aid.remaining=RULES.assistExit;emit(s,'assistInterrupted',aid.actor,{knockedOut:aid.actor.life<=0});}else if(aid.phase==='attack'&&!aid.actor.attack){aid.phase='exit';aid.remaining=RULES.assistExit;}else if(aid.phase==='exit'&&--aid.remaining<=0){aid.actor.attack=null;aid.actor.vx=aid.actor.vy=0;team.assist=null;emit(s,'assistEnd',aid.actor);}}
 if(p.life<=0){const next=reserve(s,side);if(next&&team.pending?.kind!=='ko'){team.assist=null;next.attack=null;team.pending={kind:'ko',remaining:RULES.knockoutDelay,to:next.memberIndex};emit(s,'knockoutPending',p,{to:key(next)});}}
 const pending=team.pending;if(!pending)return;if(pending.kind==='tag'&&(p.hit>0||p.blockstun>0||p.lastHit===s.frame)){team.pending=null;team.tagCooldown=RULES.interruptedTagCooldown;emit(s,'tagInterrupted',p);return;}if(--pending.remaining<=0)switchTo(s,side,pending.to,pending.kind==='ko',hooks);
 });}
function alive(s,side){return s.teams?s.teams[side].members.some(p=>p.life>0):active(s,side).life>0;}
function vitality(s,side){const members=s.teams?.[side]?.members||[active(s,side)];return members.reduce((n,p)=>n+Math.max(0,p.life)/p.max,0)/members.length;}
function roundEnd(s,winner){if(!s.teams)return;s.teams.forEach((team,side)=>{if(side===winner)team.wins++;team.members.forEach(p=>{p.wins=team.wins;p.attack=null;});team.pending=null;team.assist=null;});}
function cpu(s,p,opponent,input){const team=s.teams?.[p.slot],next=reserve(s,p.slot);if(!team||!next||!neutral(p)||team.pending||team.assist)return input;if(!team.tagCooldown&&p.life<2600&&next.life>p.life+1800&&s.frame%30===p.slot*7)return{...input,slot:null,teamAction:'tag'};if(!team.assistCooldown&&p.meter>=RULES.assistMeter&&Math.abs(opponent.x-p.x)<500&&s.frame%120===p.slot*7)return{...input,slot:null,teamAction:'assist'};return input;}
const api={version:'p74-tag-assist-v1',RULES,create,reset,actors,targets,owner,key,before,after,request,reserve,assistSlot,alive,vitality,roundEnd,cpu};root.CQC_P74_TEAMS=api;if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
