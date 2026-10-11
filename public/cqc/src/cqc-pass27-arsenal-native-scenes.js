/* Reviewed native scenery for Arsenal simulations. No encounter, collision or save is rewritten. */
(function(root,factory){
 'use strict';const api=factory(root);if(typeof module==='object'&&module.exports)module.exports=api;
 root.CQC_PASS27_ARSENAL_NATIVE_SCENES=api.createBridge();root.CQC_PASS27_ARSENAL_SCENE_FACTORY=api;
})(globalThis,function(root){
 'use strict';
 const GROUND=598,OFFSET=30;
 // This table binds the edition, not an invented assertion that every authored encounter occurred in this room.
 const SCENES=Object.freeze({
  tx55:['mg_msx','outer_heaven'],metalgeard:['mg2','p18_mg2_zanzibar_land_forteresse'],
  rex:['mgs1','mgs1_rex_hangar'],harrier:['mgs2','p18_mgs2_passerelle_harrier'],raymass:['mgs2','p18_mgs2_arsenal_gear_plateforme_ray'],
  shagohod:['mgs3','p18_mgs3_pont_shagohod'],raxa:['mpo','mpo_raxa_test_hangar'],bic:['mpo','p18_mpo_silo_lancement_icbmg'],
  pupa:['pw','p18_pw_pupa_operation'],chrysalis:['pw','p18_pw_chrysalis_operation'],cocoon:['pw','p18_pw_cocoon_operation'],
  peacewalker:['pw','p18_pw_peace_walker_operation'],zeke:['pw','mother_base'],gander:['ghost_babel','p18_ghost_galuade_cellule_gander'],
  sahel:['tpp','p18_tpp_afghanistan_sahelanthropus_canyon'],ray_mgR:['mgr','p18_mgr_abkhazie_cour_desperado'],
  grad:['mgr','p18_mgr_world_marshal_esplanade'],excelsus:['mgr','pakistan_wreck'],kodoque:['acid','lobito'],chaioth:['acid2','saintlogic'],
  arsenal_gear:['mgs2','arsenal_corridor'],outer_haven:['mgs4','outer_haven'],battle_gear:['tpp','mother_base_platform'],
  dwalker:['tpp','mother_base_platform'],walker_column:['tpp','afghan_ruins'],mk2:['mgs4','outer_haven'],mk3:['mgs4','outer_haven'],
  gekko:['mgs4','middle_east'],dwarf_swarm:['mgs4','outer_haven'],hind_d:['mgs1','shadow_heliport'],
  m1tank:['mgs1','shadow_heliport'],bulldozer:['mgs1','shadow_heliport']
 });
 function createBridge(dependencies={}){
  const registry=dependencies.registry||root.CQC_STAGE_REGISTRY,renderer=dependencies.renderer||root.CQC_STAGE_LAYERS;
  const document=dependencies.document||root.document,frames=new WeakMap(),bindings=new Map();
  for(const[id,[titleID,stageID]]of Object.entries(SCENES)){
   const stage=registry?.resolve(stageID,{titleID});if(stage)bindings.set(id,{id,titleID,stageID:stage.id,name:stage.name,simulation:true});
  }
  let pending=null,statusNode;
  const diagnostics={backgrounds:0,foregrounds:0,loading:0,last:null};
  function record(def){return bindings.get(def?.id)||null;}
  function ready(def){const r=record(def),s=r&&renderer?.status(r.stageID);return s?.approved===true&&s.state==='ready'&&!(s.errors||[]).length;}
  function preload(def,options={}){const r=record(def);return r&&renderer?renderer.preload(r.stageID,options):Promise.resolve(false);}
  function message(text){
   if(dependencies.message)return dependencies.message(text);
   if(!document?.createElement)return;
   if(!statusNode){statusNode=document.createElement('p');statusNode.id='arsenalNativeSceneStatus';statusNode.setAttribute('role','status');document.getElementById('previewText')?.after(statusNode);}
   statusNode.textContent=text;statusNode.hidden=!text;
  }
  function cancelPending(){if(pending)pending.cancelled=true;pending=null;message('');}
  function deferLaunch(def,mode,resume){
   if(ready(def)){cancelPending();return false;}
   cancelPending();const request={id:def?.id,cancelled:false};pending=request;message('Chargement du décor…');
   preload(def,{retry:true}).then(loaded=>{
    if(request.cancelled||pending!==request)return;pending=null;
    if(!loaded||!ready(def)){message('Décor indisponible. Relancez pour réessayer.');return;}
    message('');resume(def.id,mode);
   }).catch(()=>{if(!request.cancelled&&pending===request){pending=null;message('Décor indisponible. Relancez pour réessayer.');}});
   return true;
  }
  function reduced(){try{return root.matchMedia?.('(prefers-reduced-motion: reduce)').matches||JSON.parse(root.localStorage?.getItem('cqc-v044-profile')||'{}').settings?.motion===false;}catch{return false;}}
  function drawBackground(ctx,state){
   const r=record(state?.def);frames.delete(ctx);ctx.save();ctx.fillStyle='#0b1722';ctx.fillRect(0,0,1280,720);ctx.restore();
   if(!r||!ready(state.def)){
    diagnostics.loading++;if(ctx.canvas?.dataset)ctx.canvas.dataset.nativeSceneState='loading';
    // Only the selected large preview starts scenery downloads; tiny machine cards never decode a whole stage catalogue.
    if((ctx.canvas?.width||0)>=640&&r)preload(state.def).catch(()=>{});
    return true;
   }
   const value={camera:Math.max(-220,Math.min(220,((state.player?.x||400)-400)*.2)),zoom:1,time:(state.tick||0)/60,motion:!reduced()};
   ctx.save();ctx.translate(0,OFFSET);const drawn=renderer.drawBackground(ctx,r.stageID,value);ctx.restore();
   if(!drawn)return true;
   const snapshot={machineID:r.id,stageID:r.stageID,titleID:r.titleID,groundY:GROUND,translationY:OFFSET,...value};
   frames.set(ctx,{r,value,snapshot});diagnostics.backgrounds++;diagnostics.last=snapshot;
   if(ctx.canvas?.dataset){ctx.canvas.dataset.nativeSceneState='ready';ctx.canvas.dataset.stageId=r.stageID;ctx.canvas.dataset.stageGroundY=String(GROUND);}
   return true;
  }
  function drawForeground(ctx,state){
   const frame=frames.get(ctx);if(!frame||frame.r.id!==state?.def?.id)return false;frames.delete(ctx);
   ctx.save();ctx.translate(0,OFFSET);const drawn=renderer.drawForeground(ctx,frame.r.stageID,frame.value);ctx.restore();
   if(drawn)diagnostics.foregrounds++;return drawn;
  }
  function caption(def){const r=record(def);return r?'SIMULATION — '+r.name:def?.stage||'';}
  return{version:'cqc-pass27-arsenal-native-scenes/1',ready,preload,deferLaunch,cancelPending,drawBackground,drawForeground,caption,
   bindings:()=>[...bindings.values()].map(r=>({...r})),diagnostics:()=>({...diagnostics,last:diagnostics.last?{...diagnostics.last}:null})};
 }
 return{createBridge,SCENES,GROUND,OFFSET};
});
