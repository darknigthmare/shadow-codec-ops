/* Pure campaign state. No DOM, engine or storage side effects. */
export const SAVE_KEY='cqc.veilbreak.campaign.v1';
export const SAVE_VERSION=1;
export const MODES=new Set(['campaign','bossrush','cpu','local','training']);
export const DIFFICULTIES=new Set(['recruit','normal','veteran']);
export const ACT_NAMES=['Les corps sous contrat','L’usine de la dette','Les voix hors réseau','Ouvrir le passage'];
export function freshSave(){return{version:SAVE_VERSION,selected:'vb_latch',reserve:'vb_breakwater',difficulty:'normal',duo:false,profiles:{}};}
export function sanitizeSave(raw,ids){
 const safe=freshSave(),valid=new Set(ids);if(!raw||raw.version!==SAVE_VERSION||typeof raw!=='object')return safe;
 if(valid.has(raw.selected))safe.selected=raw.selected;if(valid.has(raw.reserve)&&raw.reserve!==safe.selected)safe.reserve=raw.reserve;
 if(safe.reserve===safe.selected)safe.reserve=ids.find(x=>x!==safe.selected)||safe.selected;
 if(DIFFICULTIES.has(raw.difficulty))safe.difficulty=raw.difficulty;safe.duo=raw.duo===true;
 if(raw.profiles&&typeof raw.profiles==='object')for(const id of ids){const p=raw.profiles[id];if(!p||typeof p!=='object')continue;safe.profiles[id]={campaign:bounded(p.campaign,40),bossrush:bounded(p.bossrush,20),intro:p.intro===true,ending:p.ending===true};}
 return safe;
}
function bounded(v,max){return Number.isInteger(v)&&v>=0&&v<=max?v:0;}
export function profile(save,id){return save.profiles[id]||(save.profiles[id]={campaign:0,bossrush:0,intro:false,ending:false});}
export function buildRoutes(data){
 const stages=data.stages,enemies=new Map(data.enemies.map(e=>[e.id,e])),bosses=new Map(data.bosses.map(b=>[b.id,b]));
 const campaign=[],bossrush=[];
 stages.forEach((s,index)=>{const enemy=enemies.get(s.enemy_id),boss=bosses.get(s.boss_id);if(!enemy||!boss)throw Error('Rencontre incomplète : '+s.id);
 campaign.push({stageId:s.id,opponentId:enemy.id,kind:'enemy',stageIndex:index,title:s.name},{stageId:s.id,opponentId:boss.id,kind:'boss',stageIndex:index,title:s.name});
 bossrush.push({stageId:s.id,opponentId:boss.id,kind:'boss',stageIndex:index,title:s.name});});return{campaign,bossrush};
}
export function encounterConfig(data,save,mode,index=0,extra={}){
 const routes=buildRoutes(data),route=routes[mode],e=route?.[index];if(route&&!e)throw Error('Parcours terminé');
 const opponentId=e?.opponentId||extra.opponentId||data.fighters.find(f=>f.id!==save.selected)?.id;
 const all=[...data.fighters,...data.enemies,...data.bosses],opponent=all.find(f=>f.id===opponentId);if(!opponent)throw Error('Adversaire inconnu');
 const reserve=save.reserve!==save.selected?save.reserve:data.fighters.find(f=>f.id!==save.selected)?.id;
 const enemyReserve=[...data.enemies.slice((e?.stageIndex??0)+1),...data.enemies].find(f=>f.id!==opponentId);
 const opponentReserveId=opponent.source==='ORIGINAL'&&data.fighters.some(f=>f.id===opponent.id)?data.fighters.find(f=>f.id!==opponent.id&&f.id!==save.selected)?.id:enemyReserve?.id;
 return{fighterId:save.selected,reserveId:reserve,opponentId,opponentReserveId,stageId:e?.stageId||extra.stageId||data.stages[0].id,mode:mode==='campaign'||mode==='bossrush'?'cpu':mode,difficulty:save.difficulty,duo:save.duo,seed:((Date.now()>>>0)^Math.floor(Math.random()*0x7fffffff))>>>0};
}
export function acceptResult(save,active,result){
 if(!active||!['campaign','bossrush'].includes(active.mode)||!result||result.winner!==0||!Number.isInteger(result.frames)||result.frames<1)return false;
 const p=profile(save,active.fighterId),max=active.mode==='campaign'?40:20;
 if(active.index!==p[active.mode]||p[active.mode]>=max)return false;
 p[active.mode]++;return true;
}
export function validMessage(event,source,origin,token,type){
 return event.source===source&&event.origin===origin&&event.data&&event.data.type===type&&typeof token==='string'&&event.data.token===token;
}

