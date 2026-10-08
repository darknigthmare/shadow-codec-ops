/* Presentation scale and reversible spatial contracts; source atlases and simulation remain intact. */
(function(root,factory){'use strict';const api=factory(root);if(typeof module==='object'&&module.exports)module.exports=api;root.CQC_PASS19_WORLD_SCALE=api;api.install();})(globalThis,function(root){
 'use strict';
 const pixelsPerMetre=220/1.82,records=new Map(),installed=new WeakSet(),neutralCache=new Map();
 const finite=(v,d=0)=>Number.isFinite(v)?v:d;
 const CORE_MACHINES={rex:'rex_mgs1_ps1',ray:'ray_mgs2_arsenal',mgd:'mgd_mg2_msx2',tx55:'tx55_mg1_msx1987',icbmg:'icbmg_mpo_psp2006',raxa:'raxa_mpo_psp2006',gander:'gander_ghost_gbc2000',zeke:'zeke_pw_psp2010',shagohod:'shagohod_mgs3_ps2_2004',sahelanthropus:'sahelanthropus_mgsv2015',pupa:'pupa_pw_psp2010',chrysalis:'chrysalis_pw_psp2010',cocoon:'cocoon_pw_psp2010',peace_walker:'peacewalker_pw_psp2010'};
 function add(ids,metres,evidence,url,scope){for(const uid of ids)records.set(uid,Object.freeze({uid,metres,evidence,sources:url?[url]:[],scope,absoluteHeightCertified:false}));}
 add(['core__solid','archive__snake_tts'],1.82,'community-transcription-of-official-profile','https://mgcvt.com/character/c55','Solid Snake MGS1 / The Twin Snakes; source cites official MGS1 profile.');
 add(['core__snake_mg2'],1.78,'community-transcription-of-official-manual','https://mgcvt.com/character/c55','Solid Snake MG2; source cites MSX2 user manual.');
 add(['core__old_snake','archive__old_snake_touch','npc53__old_snake_mpo_plus'],1.80,'community-transcription-of-in-game-profile','https://mgcvt.com/character/c55','MGS4 Old Snake; ACT1 Metal Gear MkII DATA PROFILE, also reused for the same cameo incarnation.');
 add(['core__snake_pw'],1.88,'community-transcription-of-official-profile','https://mgcvt.com/character/c74','Big Boss Peace Walker incarnation only; other eras are deliberately not assigned this conflicting height.');
 add(['core__bigboss_mg2'],1.80,'community-transcription-of-official-manual','https://mgcvt.com/character/c74','Big Boss MG2 incarnation only; source cites MSX2 manual.');
 add(['core__meryl_mgs1','roster51__meryl_tts'],1.75,'community-transcription-of-official-profile','https://mgcvt.com/character/c86','Meryl MGS1 / The Twin Snakes; no unsupported cross-era height assignment.');
 add(['core__eva_mgs3','roster51__eva_delta','npc53__tatyana_mgs3'],1.78435,'community-reference-body-profile','https://mgcvt.com/character/c6','EVA MGS3: exact conversion of 5 ft 10 1/4 in; footwear/equipment remains source-pose presentation.');
 add(['roster50__sunny_mgr'],1.48,'community-transcription-of-in-game-profile','https://metalgear.fandom.com/wiki/Sunny_Emmerich','Sunny in Revengeance, age 11; never applied to Sunny MGS4.');
 add(['completion__gekko_mgs4','gekko_mgs4_ps3_2008','gekko_mgs4_right'],4.2,'community-transcription-of-official-chart','https://mgcvt.com/word/w2','Gekko overall height; source cites MGSV official comparative promotion chart, original small print not directly read.');
 const mg2Primary='https://www.konami.com/mg/archive/mg2/chara.html';
 for(const[uid,metres]of Object.entries({'core__snake_mg2':1.78,'core__bigboss_mg2':1.8,'roster50__campbell_mg2':1.83,'archive__holly_white':1.67,'archive__gustava_heffner':1.65,'roster50__miller_mg2':1.79,'roster50__jacobsen_mg2':1.79,'core__fox_mg2':1.79,'roster50__kasler_mg2':1.88,'roster50__marv_mg2':1.72,'roster50__madnar_mg2':1.87}))records.set(uid,Object.freeze({uid,metres,evidence:'official-primary-directly-observed',sources:[mg2Primary],scope:'Explicit height in the official Konami MG2 incarnation profile; source pose and boots remain visual approximations.',absoluteHeightCertified:true}));
 for(const[uid,metres,profile]of[['core__solid',1.82,'ch01'],['archive__snake_tts',1.82,'ch01'],['core__meryl_mgs1',1.75,'ch14'],['roster51__meryl_tts',1.75,'ch14']])records.set(uid,Object.freeze({uid,metres,evidence:'official-primary-directly-observed',sources:['https://www.konami.com/mg/archive/mgs/character/'+profile+'.html','https://www.konami.com/mg/archive/mgs/character/images/'+profile+'_status.gif'],scope:'Height directly read in the official Konami MGS1 profile GIF; matching Twin Snakes incarnation only. Uniform source figure includes equipment and posture.',absoluteHeightCertified:true}));
 function configure(extra){let accepted=0;for(const [uid,r] of Object.entries(extra||{})){if(!r||!Number.isFinite(r.metres)||r.metres<=0||r.metres>10000||typeof r.evidence!=='string'||!Array.isArray(r.sources)||r.sources.some(u=>typeof u!=='string'||!/^https:\/\//.test(u)))throw Error('Invalid height evidence for '+uid);records.set(uid,Object.freeze({...r,uid,absoluteHeightCertified:r.absoluteHeightCertified===true&&r.evidence==='official-primary-directly-observed'}));accepted++;}return accepted;}
 function historicalMachineHeight(id){const k=root.CQC_PASS18_MACHINE_DATA?.states?.[id]?.kind;return k==='heavy_biped'?420:k==='small_biped'?155:k==='radial'?133:k==='pod'?222:k==='authored_vr'?250:288;}
 function height(uid,options={}){
  const explicit=records.get(uid),entry=root.CQC_COMBAT_SPRITE_CATALOG?.entries?.[uid],mapped=root.CQC_PASS18_MACHINE_DATA?.playable?.[uid]?.[0];
  const oldPixels=finite(options.originalPixels,entry?.displayHeight||historicalMachineHeight(mapped||uid)),r=explicit||mapped&&records.get(mapped);
  return r?{...r,uid,pixels:r.metres*pixelsPerMetre,originalPixels:oldPixels,ratio:r.metres*pixelsPerMetre/oldPixels}:{uid,metres:oldPixels/pixelsPerMetre,pixels:oldPixels,originalPixels:oldPixels,ratio:1,evidence:'estimated-from-preserved-presentation',sources:[],scope:'No directly attested height established; original silhouette scale retained.',absoluteHeightCertified:false};
 }
 function neutralBounds(id){
  if(neutralCache.has(id))return neutralCache.get(id);
  const factory=root.CQC_MACHINE_PARTS,catalog=root.CQC_MACHINE_PARTS_CATALOG;if(!factory||!catalog)return null;
  const machine=factory.normalizeCatalog(catalog).get(id);if(!machine)return null;
  let left=Infinity,top=Infinity,right=-Infinity,bottom=-Infinity;
  for(const p of factory.pose(machine,{origin:[0,0],channels:{},flags:{},reducedMotion:true}).values()){
   if(!p.visible||p.opacity<=0)continue;const source=machine.sources.get(p.source),r=p.rect||[0,0,source.width,source.height],sc=p.imageScale,m=p.matrix,x=-p.pivot[0]*sc,y=-p.pivot[1]*sc;
   for(const[a,b]of[[x,y],[x+r[2]*sc,y],[x+r[2]*sc,y+r[3]*sc],[x,y+r[3]*sc]]){const q=m[0]*a+m[2]*b+m[4],v=m[1]*a+m[3]*b+m[5];left=Math.min(left,q);right=Math.max(right,q);top=Math.min(top,v);bottom=Math.max(bottom,v);}
  }
  const result=right>left&&bottom>top?{left,top,width:right-left,height:bottom-top,bottom}:null;if(result)neutralCache.set(id,result);return result;
 }
 function transform(anchor,ratio){if(!anchor||![anchor.x,anchor.y,ratio].every(Number.isFinite)||ratio<=0)throw Error('Invalid spatial transform');return Object.freeze({anchor:{...anchor},ratio,
  toWorld(p){return{x:anchor.x+(p.x-anchor.x)*ratio,y:anchor.y+(p.y-anchor.y)*ratio};},
  toSimulation(p){return{x:anchor.x+(p.x-anchor.x)/ratio,y:anchor.y+(p.y-anchor.y)/ratio};},
  boxToWorld(b){const p=this.toWorld(b);return{...b,...p,w:b.w*ratio,h:b.h*ratio};},
  boxToSimulation(b){const p=this.toSimulation(b);return{...b,...p,w:b.w/ratio,h:b.h/ratio};}
 });}
 function worldBounds(uid,point={x:0,y:0},face=1,options={}){
  const pair=root.CQC_PASS18_MACHINE_DATA?.playable?.[uid],physical=pair?.[face===1?1:0]||CORE_MACHINES[uid]||uid,b=neutralBounds(physical),h=height(uid,{...options,...(b?{originalPixels:b.height}:{})}).pixels;
  if(b){const sc=h/b.height;return{left:point.x-b.width*sc/2,top:point.y-h,right:point.x+b.width*sc/2,bottom:point.y,width:b.width*sc,height:h,uid};}
  const e=root.CQC_COMBAT_SPRITE_CATALOG?.entries?.[uid],frame=(face!==e?.facing?e?.oppositeActions:e?.actions)?.idle?.frames?.[0]||e?.actions?.idle?.frames?.[0],w=frame?h*frame.rect[2]/(e.sourceFrameHeights?.[frame.file]||e.baseFrameHeight||frame.rect[3]):h*.45;
  return{left:point.x-w/2,top:point.y-h,right:point.x+w/2,bottom:point.y,width:w,height:h,uid};
 }
 function sceneZoom(state,requested=1,options={}){
  const floor=finite(options.floor,568),top=finite(options.top,112),center=finite(options.center,640),width=finite(options.width,1280),padding=finite(options.padding,22),spriteMultiplier=finite(options.spriteMultiplier,1.12);
  let cap=finite(requested,1);const actors=state?.a&&state?.b?[state.a,state.b]:state?.fighters||[];
  for(const p of actors){const uid=p.f?.uid||p.uid||(p.id?'core__'+p.id:null);if(!uid)continue;const b=worldBounds(uid,{x:finite(p.x),y:finite(p.y,floor)},p.face||p.facing||1),heightAboveFloor=(floor-b.top)+(spriteMultiplier-1)*b.height;cap=Math.min(cap,(floor-top)/Math.max(1,heightAboveFloor));const horizontal=Math.max(Math.abs(b.left-center),Math.abs(b.right-center));cap=Math.min(cap,(width/2-padding)/Math.max(1,horizontal));}
  return Math.max(.001,Math.min(requested,cap));
 }
 function displayHeightFor(uid,costume='original',engine='versus',entry=null){const scoped=root.CQC_PASS19_COSTUME_HEIGHTS?.[uid]?.[costume];return scoped&&Number.isFinite(scoped.metres)&&scoped.metres>0?scoped.metres*pixelsPerMetre:height(uid).pixels;}
 function wrapSprites(api){if(!api||installed.has(api))return;const originalDraw=api.draw;api.draw=function(c,f,x,y,face,scale=1,pose={}){const factor=pose.worldScaleApplied===true?1:height(f?.uid).ratio;return originalDraw.call(api,c,f,x,y,face,scale*factor,pose);};installed.add(api);}
 function wrapMachines(api){if(!api||installed.has(api)||root.CQC_PASS19_SPATIAL_SCALE_READY!==true)return;const originalDraw=api.drawPlayable;api.drawPlayable=function(c,f,x,y,face,scale=1,pose={}){const physical=api.physical(f,face),factor=height(f?.uid,{originalPixels:historicalMachineHeight(physical)}).ratio;return originalDraw.call(api,c,f,x,y,face,scale*factor,pose);};installed.add(api);}
 function visualOrigin(uid,point){const factor=height(uid).ratio;return{...point,forward:point.forward*factor,height:point.height*factor};}
 function wrapMuzzles(api){if(!api||installed.has(api))return;const old=api.drawMuzzle;if(typeof old!=='function')return;api.drawMuzzle=function(c,actor,move,age,zoom,options={}){return old.call(api,c,actor,move,age,zoom,{...options,spriteScale:finite(options.spriteScale,1)*height(actor?.f?.uid||actor?.uid).ratio});};installed.add(api);}
 async function prepareComparison(uids){return(await Promise.all((uids||[]).map(uid=>root.CQC_COMBAT_SPRITES?.has(uid)?root.CQC_COMBAT_SPRITES.whenReady(uid):root.CQC_PASS18_MACHINES?.whenReady(CORE_MACHINES[uid]||uid)||false))).every(Boolean);}
 function drawReference(c,uid,x,y,zoom=1,face=1){
  const sprites=root.CQC_COMBAT_SPRITES,entry=sprites?.getEntry(uid);
  if(entry)return sprites.draw(c,{uid},x,y,face,zoom*height(uid).pixels/entry.displayHeight,{time:0,actionTime:0,worldScaleApplied:true,entityKey:'pass19-scale-inspection:'+uid+':'+face});
  const machine=CORE_MACHINES[uid]||root.CQC_PASS18_MACHINES?.physical(uid,face)||uid,b=worldBounds(uid,{x,y},face);if(!neutralBounds(machine))return false;
  return root.CQC_PASS18_MACHINES?.drawFitted(c,machine,{x:x-b.width*zoom/2,y:y-b.height*zoom,width:b.width*zoom,height:b.height*zoom,padding:0},face,{frame:0,time:0,action:'idle'})===true;
 }
 function drawComparison(c,uids,options={}){
  if(!c||!Array.isArray(uids)||!uids.length||uids.length>4)return false;
  const width=finite(options.width,c.canvas?.width||1280),canvasHeight=finite(options.height,c.canvas?.height||720),floor=canvasHeight-90,top=65,padding=26,spacing=50;
  const boxes=uids.map(uid=>worldBounds(uid)),fullWidth=boxes.reduce((n,b)=>n+b.width,0)+spacing*(uids.length-1),maxHeight=Math.max(...boxes.map(b=>b.height)),zoom=Math.min(1,(width-padding*2)/fullWidth,(floor-top)/maxHeight);
  let left=(width-fullWidth*zoom)/2,handled=true;c.save();try{c.strokeStyle='#6e9689';c.lineWidth=1;c.beginPath();c.moveTo(padding,floor);c.lineTo(width-padding,floor);c.stroke();
   for(let i=0;i<uids.length;i++){const uid=uids[i],b=boxes[i],x=left+b.width*zoom/2;handled=drawReference(c,uid,x,floor,zoom,i===0?1:-1)&&handled;left+=(b.width+spacing)*zoom;const h=height(uid,{originalPixels:b.height});c.font='14px system-ui';c.textAlign='center';c.fillStyle='#d9e5ca';c.fillText(root.CQC_COMBAT_SPRITE_CATALOG?.entries?.[uid]?.name||uid.replace(/^[^_]+__/,'').replaceAll('_',' ').toUpperCase(),x,floor+28);c.fillStyle='#a2baac';c.font='12px system-ui';c.fillText((h.evidence.startsWith('estimated')?'≈ ':'')+h.metres.toLocaleString('fr-FR',{maximumFractionDigits:2})+' m',x,floor+49);}
  }finally{c.restore();}return handled;
 }
 function audit(){const sprites=Object.keys(root.CQC_COMBAT_SPRITE_CATALOG?.entries||{}).map(uid=>height(uid)),machines=(root.CQC_MACHINE_PARTS_CATALOG?.machines||[]).map(m=>{const b=neutralBounds(m.id);return{...height(m.id,{originalPixels:b?.height||historicalMachineHeight(m.id)}),nativeBounds:b,combatFraming:'Preserved bespoke boss framing; no claim of canonical combat scale or transformed weak-point geometry.'};});return{schema:'cqc.world-scale-audit/1',pixelsPerMetre,anchor:{uid:'core__solid',metres:1.82,originalPixels:220,evidence:'community-transcription-of-official-profile'},sprites,machines,exactHeightCertification:false,simulationChanged:false,sourcePixelsChanged:false};}
 function install(){if(root.CQC_PASS19_HEIGHT_RECORDS)configure(root.CQC_PASS19_HEIGHT_RECORDS);wrapSprites(root.CQC_COMBAT_SPRITES);wrapMachines(root.CQC_PASS18_MACHINES);wrapMuzzles(root.CQC_PASS18_VFX);return{spriteRendererInstalled:!!root.CQC_COMBAT_SPRITES,machineRendererInstalled:installed.has(root.CQC_PASS18_MACHINES||{}),machineSpatialAdapterRequired:root.CQC_PASS19_SPATIAL_SCALE_READY!==true};}
 return{pixelsPerMetre,records,configure,height,displayHeightFor,neutralBounds,worldBounds,transform,sceneZoom,audit,install,visualOrigin,prepareComparison,drawReference,drawComparison,coreMachineIDs:CORE_MACHINES};
});
