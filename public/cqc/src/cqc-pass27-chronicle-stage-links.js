/* Connect prepared edition scenes without replacing story text, opponents or progression identities. */
(function(root){
 'use strict';
 const EDITIONS=Object.freeze({mobile:'p27_mobile_warehouse',mpo_plus:'p27_mpo_plus_industrial'});
 function link(data,registry=root.CQC_STAGE_REGISTRY){
  if(!data?.stories)return{stories:0,rounds:0,cards:0};
  const result={stories:0,rounds:0,cards:0,linked:[]},stories={...data.stories};
  for(const[uid,story]of Object.entries(data.stories)){
   const stageID=EDITIONS[story?.game];if(!stageID)continue;
   const scene=registry?.resolve(stageID,{titleID:story.game});if(!scene)continue;
   const cards=list=>Array.isArray(list)?list.map(card=>{
    if(!card||typeof card!=='object')return card;result.cards++;return{...card,stage:scene.id};
   }):list;
   stories[uid]={...story,intro:cards(story.intro),outro:cards(story.outro),
    route:(story.route||[]).map(round=>{result.rounds++;return{...round,stage:scene.id,stageName:scene.name};})};
   result.stories++;result.linked.push({uid,titleID:story.game,stageID:scene.id});
  }
  data.stories=stories;return result;
 }
 root.CQC_PASS27_CHRONICLE_STAGE_LINKS={link,editions:EDITIONS};
 if(root.CQC55_DATA)root.CQC_PASS27_CHRONICLE_STAGE_LINKS.receipt=link(root.CQC55_DATA);
})(globalThis);
