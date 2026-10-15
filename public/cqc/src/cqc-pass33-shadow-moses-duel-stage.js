/* MGS4 (PS3, 2008), Act 4: Shadow Moses Port Area.
 * This renderer deliberately does not borrow the Crying Wolf snowfield, MGS1
 * heliport, or underground REX hangar. All painted geometry is supplied by the
 * separately reviewed Port Area planes. Parallax is an authored 2D adaptation.
 */
(function(root){'use strict';
 const BOSS='mgs4_rex_ray',WIDTH=1280,HEIGHT=720,GROUND=568;
 const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),finite=v=>typeof v==='number'&&Number.isFinite(v);
 const documentBase=root.document?.currentScript?.src||root.document?.baseURI||root.location?.href;
 const base=documentBase?new URL('../',documentBase).href:null;
 let definition=null,revision=0,preparation=null;
 const images=new Map();
 function owns(g){return g?.kind==='boss'&&g.boss?.id===BOSS;}
 function copy(value){return JSON.parse(JSON.stringify(value));}
 function deepFreeze(value){if(value&&typeof value==='object'){Object.freeze(value);for(const v of Object.values(value))deepFreeze(v);}return value;}
 function validate(raw){
  if(!raw||!Array.isArray(raw.layers)||!raw.layers.length)throw Error('Port Area requires reviewed native image planes');
  const ids=new Set();let hasBackground=false;
  const layers=raw.layers.map(layer=>{
   if(!layer||typeof layer.id!=='string'||ids.has(layer.id))throw Error('Port Area plane IDs must be unique');ids.add(layer.id);
   if(typeof layer.file!=='string'||!/^assets\/[a-zA-Z0-9_./-]+\.(png|webp|jpg|jpeg)$/.test(layer.file)||layer.file.includes('..'))throw Error('Port Area plane must use a local reviewed asset');
   const rect=layer.rect;if(!rect||!['x','y','width','height'].every(k=>finite(rect[k]))||rect.width<=0||rect.height<=0)throw Error('Port Area plane rectangle is invalid');
   const phase=layer.phase||'background';if(!['background','foreground'].includes(phase))throw Error('Port Area plane phase is invalid');
   if(phase==='background')hasBackground=true;
   const parallax=layer.parallax??0;if(!finite(parallax)||parallax<0||parallax>1.2)throw Error('Port Area plane parallax is invalid');
   const sourceRect=layer.sourceRect?copy(layer.sourceRect):null;
   if(sourceRect&&(!['x','y','width','height'].every(k=>finite(sourceRect[k]))||sourceRect.x<0||sourceRect.y<0||sourceRect.width<=0||sourceRect.height<=0))throw Error('Port Area source plane rectangle is invalid');
   return{id:layer.id,file:layer.file,rect:copy(rect),phase,parallax,sourceRect};
  });
  if(!hasBackground)throw Error('Port Area requires an opaque background plane');
  if(raw.groundY!==undefined&&raw.groundY!==GROUND)throw Error('Port Area must preserve the existing duel ground at 568');
  const weather={enabled:raw.weather?.enabled===true,type:'snow',count:clamp(Math.floor(raw.weather?.count??22),0,48),canonicalTiming:false};
  return deepFreeze({schema:'cqc.pass33.shadow-moses-port-area/1',id:'mgs4_shadow_moses_port_area',bossID:BOSS,width:WIDTH,height:HEIGHT,groundY:GROUND,layers,weather,fillColor:typeof raw.fillColor==='string'?raw.fillColor:'#263735',references:Array.isArray(raw.references)?copy(raw.references):[],absolute1to1Certified:false,qualification:'MGS4 Port Area reference-based painted reconstruction with authored 2D projection and parallax; exact original geometry, texels and temporal weather timing are not certified.'});
 }
 function configure(raw){const next=validate(raw);revision++;definition=next;preparation=null;images.clear();return definition;}
 function load(file,retry){let item=images.get(file);if(item&&(!retry||item.status!=='error'))return item.promise;
  item={status:'loading',image:null,error:null};images.set(file,item);
  item.promise=new Promise(resolve=>{
   if(typeof root.Image!=='function'||!base){item.status='error';item.error='Image loader unavailable';resolve(false);return;}
   const image=new root.Image();item.image=image;
   image.onload=()=>{if(!image.naturalWidth||!image.naturalHeight){item.status='error';item.error='Empty image';resolve(false);return;}item.status='ready';resolve(true);};
   image.onerror=()=>{item.status='error';item.error='Native Port Area plane did not load';resolve(false);};
   image.src=new URL(file,base).href;
  });return item.promise;
 }
 function sourceFor(layer,image){return layer.sourceRect||{x:0,y:0,width:image.naturalWidth,height:image.naturalHeight};}
 function verifyGeometry(){if(!definition)return false;for(const layer of definition.layers){const item=images.get(layer.file);if(item?.status!=='ready')return false;const src=sourceFor(layer,item.image),ratio=layer.rect.width/src.width;
   if(src.x+src.width>item.image.naturalWidth||src.y+src.height>item.image.naturalHeight||Math.abs(layer.rect.height/src.height-ratio)>1e-5*Math.max(1,ratio))return false;
  }return true;
 }
 function prepare(options={}){if(!definition)return Promise.resolve(false);if(preparation&&!options.retry)return preparation;const version=revision;
  preparation=Promise.all([...new Set(definition.layers.map(layer=>layer.file))].map(file=>load(file,!!options.retry))).then(results=>version===revision&&results.every(Boolean)&&verifyGeometry());return preparation;
 }
 function ready(){return verifyGeometry();}
 function reduced(){return(typeof root.CQC_PASS33_DUEL_PREFERENCES?.reducedMotion==='function'&&!!root.CQC_PASS33_DUEL_PREFERENCES.reducedMotion())||!!root.matchMedia?.('(prefers-reduced-motion: reduce)').matches||!!root.document?.documentElement?.classList.contains('cqc-reduced-motion')||!!root.document?.body?.classList.contains('reduced-motion');}
 function camera(g,options={}){if(finite(options.cameraX))return clamp(options.cameraX,-150,150);const p=g?.player?.x,e=g?.enemy?.x;return finite(p)&&finite(e)?clamp((p+e)/2-WIDTH/2,-150,150):0;}
 function frame(g){return finite(g?.player?.nativeFrame)?Math.max(0,g.player.nativeFrame):0;}
 function layout(g,options={}){if(!definition)return null;const cam=camera(g,options),reducedMotion=reduced(),parallaxCameraX=reducedMotion?0:cam;return{cameraX:cam,parallaxCameraX,frame:frame(g),time:frame(g)/60,groundY:GROUND,reducedMotion,layers:definition.layers.map(layer=>({id:layer.id,phase:layer.phase,file:layer.file,parallax:layer.parallax,sourceRect:layer.sourceRect?copy(layer.sourceRect):null,rect:{...layer.rect,x:layer.rect.x-parallaxCameraX*layer.parallax}}))};}
 function drawSnow(c,view){if(!definition.weather.enabled||!definition.weather.count||view.reducedMotion)return;const time=view.time;
  c.save();c.fillStyle='#d8e1de';
  for(let i=0;i<definition.weather.count;i++){const depth=i%3,drift=7+depth*2,fall=17+depth*5,x=((i*173.19+time*drift-view.cameraX*(.12+depth*.05))%(WIDTH+80)+(WIDTH+80))%(WIDTH+80)-40,y=((i*79.43+time*fall)%(HEIGHT+40))-20;c.globalAlpha=.14+depth*.045;c.beginPath();c.arc(x,y,.8+depth*.35,0,Math.PI*2);c.fill();}
  c.restore();
 }
 function draw(c,g,options={}){if(!owns(g)||!ready())return false;const phase=options.phase||'background';if(!['background','foreground'].includes(phase))return false;const view=layout(g,options);c.save();
  if(phase==='background'){c.clearRect(0,0,WIDTH,HEIGHT);c.fillStyle=definition.fillColor;c.fillRect(0,0,WIDTH,HEIGHT);}
  c.beginPath();c.rect(0,0,WIDTH,HEIGHT);c.clip();
  for(let i=0;i<definition.layers.length;i++){const layer=definition.layers[i];if(layer.phase!==phase)continue;const image=images.get(layer.file).image,src=sourceFor(layer,image),rect=view.layers[i].rect;c.drawImage(image,src.x,src.y,src.width,src.height,rect.x,rect.y,rect.width,rect.height);}
  if(phase==='foreground')drawSnow(c,view);c.restore();return true;
 }
 function diagnostics(g,options={}){return{configured:!!definition,ready:ready(),owns:owns(g),revision,definition:definition?copy(definition):null,layout:layout(g,options),images:[...images].map(([file,item])=>({file,status:item.status,width:item.image?.naturalWidth||0,height:item.image?.naturalHeight||0,error:item.error})),usesWallClock:false,mutatesGameState:false,rasterPixelsModified:false};}
 const DEFAULT_DEFINITION={"groundY":568,"fillColor":"#263735","weather":{"enabled":false,"count":22},"references":[{"url":"https://archive.org/details/PS3_Longplay_081_Metal_Gear_Solid_4","sourceType":"original_PS3_game_capture","originalVideo":"https://archive.org/download/PS3_Longplay_081_Metal_Gear_Solid_4/PS3_Longplay_081_Metal_Gear_Solid_4.mkv","timestampsSeconds":[33810,33830],"incarnation":"Metal Gear Solid4 original2008PS3 Act4 Shadow Moses Port Area","absolute1to1Certified":false},{"url":"https://www.supercheats.com/guides/metal-gear-solid-4/boss-metal-gear-ray","role":"Port Area encounter identity and chronology"}],"layers":[{"id":"port-sea-and-sky","file":"assets/stages-pass33/mgs4-port-area/far-v1.png","phase":"background","parallax":0.04,"rect":{"x":-100,"y":-202.83333333333326,"width":1480,"height":986.6666666666666}},{"id":"port-quay-floor","file":"assets/stages-pass33/mgs4-port-area/far-v1.png","phase":"background","parallax":1,"sourceRect":{"x":0,"y":760,"width":1536,"height":264},"rect":{"x":-220,"y":523.2083333333334,"width":1720,"height":295.625}},{"id":"port-steel-architecture","file":"assets/stages-pass33/mgs4-port-area/architecture-v1.png","phase":"background","parallax":0.2,"sourceRect":{"x":0,"y":0,"width":1536,"height":820},"rect":{"x":-100,"y":-314.60416666666663,"width":1480,"height":790.1041666666666}}]};
 configure(DEFAULT_DEFINITION);
 root.CQC_PASS33_SHADOW_MOSES_DUEL_STAGE=Object.freeze({schema:'cqc.pass33.shadow-moses-port-area-renderer/1',bossID:BOSS,owns,configure,definition:()=>definition,prepare,ready,camera,frame,layout,draw,diagnostics});
})(globalThis);
