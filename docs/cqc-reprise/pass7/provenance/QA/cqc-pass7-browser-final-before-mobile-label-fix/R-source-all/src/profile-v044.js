(function(root){'use strict';
const KEY='cqc-v044-profile',SCHEMA=2;
const defaults={schema:SCHEMA,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),settings:{scanlines:true,motion:true,reducedMotion:false,highContrast:false,fontScale:100,masterVolume:80,musicVolume:65,sfxVolume:80,subtitles:true,screenShake:70,locale:'fr-FR'},progress:{lastModule:'saga',playtimeSeconds:0,lastSeen:new Date().toISOString()},errors:[],migration:{from:[]}};
function clone(v){return JSON.parse(JSON.stringify(v));}
function merge(a,b){for(const [k,v] of Object.entries(b||{})){if(v&&typeof v==='object'&&!Array.isArray(v)){a[k]=merge(a[k]&&typeof a[k]==='object'?a[k]:{},v);}else a[k]=v;}return a;}
function migrate(p){const out=merge(clone(defaults),p&&typeof p==='object'?p:{});out.schema=SCHEMA;out.settings.fontScale=Math.max(85,Math.min(130,Number(out.settings.fontScale)||100));for(const k of ['masterVolume','musicVolume','sfxVolume','screenShake'])out.settings[k]=Math.max(0,Math.min(100,Number(out.settings[k])||0));out.errors=Array.isArray(out.errors)?out.errors.slice(-40):[];out.updatedAt=new Date().toISOString();return out;}
function readLegacy(){const found=[];let settings={};for(const key of ['cqc-v043-shell','cqc-v042-shell','cqc-v041-shell','cqc-v040-shell','cqc-v039-shell']){try{const raw=localStorage.getItem(key);if(raw){settings={...settings,...JSON.parse(raw)};found.push(key);break;}}catch{}}
 let last='saga';for(const key of ['cqc-v043-last-module','cqc-v042-last-module','cqc-v041-last-module','cqc-v040-last-module']){try{const value=localStorage.getItem(key);if(value){last=value;found.push(key);break;}}catch{}}
 return{settings,progress:{lastModule:last},migration:{from:found}};
}
function load(){let p=null;try{p=JSON.parse(localStorage.getItem(KEY)||'null');}catch{}if(!p){p=merge(clone(defaults),readLegacy());save(p);}return migrate(p);}
function save(profile){const p=migrate(profile);try{localStorage.setItem(KEY,JSON.stringify(p));}catch{}return p;}
function update(patch){return save(merge(load(),patch));}
function apply(doc=document,profile=load()){const s=profile.settings,el=doc.documentElement;el.classList.toggle('cqc-reduced-motion',!!s.reducedMotion);el.classList.toggle('cqc-high-contrast',!!s.highContrast);el.style.setProperty('--cqc-font-scale',String(s.fontScale/100));el.style.fontSize=`${s.fontScale}%`;return profile;}
function exportAll(){const data={schema:1,exportedAt:new Date().toISOString(),origin:location.origin||'local',keys:{}};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k&&k.toLowerCase().includes('cqc'))data.keys[k]=localStorage.getItem(k);}return data;}
function importAll(data){if(!data||typeof data!=='object'||!data.keys||typeof data.keys!=='object')throw Error('Export CQC invalide');let n=0;for(const [k,v] of Object.entries(data.keys)){if(!k.toLowerCase().includes('cqc')||typeof v!=='string')continue;localStorage.setItem(k,v);n++;}return n;}
function resetAll(){const keys=[];for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k&&k.toLowerCase().includes('cqc'))keys.push(k);}keys.forEach(k=>localStorage.removeItem(k));return keys.length;}
function recordError(error,context='runtime'){const p=load();p.errors.push({at:new Date().toISOString(),context,message:String(error?.message||error),stack:String(error?.stack||'').slice(0,1200)});return save(p);}
function addPlaytime(seconds){const p=load();p.progress.playtimeSeconds=Math.max(0,(p.progress.playtimeSeconds||0)+Math.max(0,Number(seconds)||0));p.progress.lastSeen=new Date().toISOString();return save(p);}
root.CQCProfileV044={KEY,SCHEMA,defaults:clone(defaults),load,save,update,apply,exportAll,importAll,resetAll,recordError,addPlaytime};
})(globalThis);
