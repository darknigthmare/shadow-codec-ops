const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const R=path.resolve(__dirname,'..'),catalog=JSON.parse(fs.readFileSync(path.join(R,'data/combat-prop-catalog-pass6.json'))),api=require('../src/cqc-pass6-prop-art.js');
function setup(ready=true){
 const pending=[];
 class ImageType{set src(url){this.url=url;const meta=Object.values(catalog).find(m=>url.endsWith(m.file));this.completeLoad=()=>{this.naturalWidth=meta.width;this.naturalHeight=meta.height;this.onload();};pending.push(this);if(ready)this.completeLoad();}}
 const renderer=api.createRenderer({catalog,Image:ImageType,scriptURL:'http://localhost/src/cqc-pass6-prop-art.js'}),draws=[],rotations=[];
 const ctx={save(){},restore(){},translate(){},rotate(n){rotations.push(n);},drawImage(image,...args){draws.push({file:image.url,args});},beginPath(){},moveTo(){},lineTo(){},stroke(){},fillRect(){},strokeRect(){},arc(){},fill(){}};
 return{renderer,draws,rotations,ctx,pending};
}
const q=(uid,slot,tag,age=0)=>({id:4,owner:0,def:{id:uid+'::'+slot,tag},age,delay:0,dead:false,vx:12,vy:0,life:60});
test('all three native atlases match source SHA and natural PNG dimensions',()=>{
 assert.deepEqual(Object.keys(catalog).sort(),['fear-bolts','fury-flames','pain-hornets']);
 for(const a of Object.values(catalog)){const bytes=fs.readFileSync(path.join(R,a.file));assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),a.sha256);assert.equal(bytes.readUInt32BE(16),a.width);assert.equal(bytes.readUInt32BE(20),a.height);assert.equal(a.props.length,3);assert.equal(a.absolute1to1Certified,false);}
});
test('native projectile source dispatch is restricted to original exact UID and equipment',()=>{
 const s=setup();for(const [uid,slot,tag,key]of [['core__pain','special','swarm','pain-hornets'],['core__pain','specialForward','swarm','pain-hornets'],['core__fear','super','bolt','fear-bolts'],['core__fury','super','fire','fury-flames']]){assert(s.renderer.drawProjectile(s.ctx,q(uid,slot,tag),1));assert(s.draws.at(-1).file.endsWith(catalog[key].file));}
 for(const [uid,slot,tag]of [['roster51__pain_delta','special','swarm'],['core__mantis','special','psychic'],['core__firetrooper','special','fire'],['core__fatman','super','explosive'],['core__fear','special','ballistic'],['core__pain','utility','swarm']])assert.equal(s.renderer.drawProjectile(s.ctx,q(uid,slot,tag),1),false);
});
test('an unavailable atlas safely falls back until successful asynchronous loading',()=>{
 const s=setup(false);assert.equal(s.renderer.drawProjectile(s.ctx,q('core__fear','special','bolt')),false);assert.equal(s.draws.length,0);for(const image of s.pending)image.completeLoad();assert(s.renderer.drawProjectile(s.ctx,q('core__fear','special','bolt')));
});
test('a reflected bolt keeps its original source UID and all combat state',()=>{
 const s=setup(),projectile=q('core__fear','special','bolt');projectile.owner=1;projectile.vx=-12;projectile.reflections=1;const before=structuredClone(projectile);assert(s.renderer.drawProjectile(s.ctx,projectile));assert.deepEqual(projectile,before);assert(s.draws.at(-1).file.endsWith(catalog['fear-bolts'].file));
});
test('hidden, delayed or invalid-zoom objects create no native draw',()=>{
 const s=setup();for(const object of [{...q('core__pain','special','swarm'),dead:true},{...q('core__pain','special','swarm'),delay:2},null])assert.equal(s.renderer.drawProjectile(s.ctx,object),false);
 for(const zoom of [0,-1,NaN,Infinity])assert.equal(s.renderer.drawProjectile(s.ctx,q('core__pain','special','swarm'),zoom),false);assert.equal(s.draws.length,0);
});
test('source aspect ratio stays constant on desktop and mobile zooms',()=>{
 const s=setup();for(const zoom of [.78,1,1.08])for(const [uid,tag,key]of [['core__pain','swarm','pain-hornets'],['core__fear','bolt','fear-bolts'],['core__fury','fire','fury-flames']]){assert(s.renderer.drawProjectile(s.ctx,q(uid,'special',tag),zoom));const [sx,sy,sw,sh,dx,dy,dw,dh]=s.draws.at(-1).args;assert(Math.abs(dw/dh-sw/sh)<1e-12);assert.equal(dw,catalog[key].props[1].displayWidth*zoom);assert.equal(dy+dh/2,0);}
});
test('hornet wings and flame patterns animate from age while projectile physics remain unchanged',()=>{
 const s=setup();for(const [uid,tag]of [['core__pain','swarm'],['core__fury','fire']]){const source=[];for(const age of [0,4,8]){const object=q(uid,'special',tag,age),before=structuredClone(object);assert(s.renderer.drawProjectile(s.ctx,object));assert.deepEqual(object,before);source.push(s.draws.at(-1).args.slice(0,4));}assert.equal(new Set(source.map(x=>JSON.stringify(x))).size,3);}
});
test('only the original Fury ground-fire zone uses native flames with a grounded lower edge',()=>{
 const s=setup(),zone={id:12,age:20,owner:0,dead:false,def:{id:'core__fury::specialDown',kind:'trap',tag:'fire'}},before=structuredClone(zone);assert(s.renderer.drawTrap(s.ctx,zone,.78));assert.deepEqual(zone,before);const [, , , , ,dy,,dh]=s.draws.at(-1).args;assert.equal(dy+dh,0);
 assert.equal(s.renderer.drawTrap(s.ctx,{...zone,def:{...zone.def,id:'core__firetrooper::specialDown'}}),false);assert.equal(s.renderer.drawTrap(s.ctx,{...zone,def:{...zone.def,tag:'explosive'}}),false);
});
test('Pain hornet protection renders four natural clouds without changing resource or shield hits',()=>{
 const s=setup(),actor={f:{uid:'core__pain'},r:76,buffs:{barrier:{t:110,hits:2}},x:300,y:568},before=structuredClone(actor);assert(s.renderer.drawBarrier(s.ctx,actor,.78));assert.equal(s.draws.length,4);assert.deepEqual(actor,before);assert(s.draws.every(d=>d.file.endsWith(catalog['pain-hornets'].file)));
 assert.equal(s.renderer.drawBarrier(s.ctx,{...actor,f:{uid:'core__fortune'}}),false);assert.equal(s.renderer.drawBarrier(s.ctx,{...actor,buffs:{}}),false);
});
test('Pain cinematic uses actual native hornets without changing scene or drawing unrelated identities',()=>{
 const s=setup(),scene={uid:'core__pain',fin:{slot:'neutral',phases:['aim','volley','impact','pose']},phase:'volley',t:.4,ax:400,vx:800,vy:568,dir:1},before=structuredClone(scene);
 assert(s.renderer.drawFinisher(s.ctx,scene));assert.equal(s.draws.length,4);assert(s.draws.every(d=>d.file.endsWith(catalog['pain-hornets'].file)));assert.deepEqual(scene,before);assert.equal(s.renderer.drawFinisher(s.ctx,{...scene,uid:'roster51__pain_delta'}),false);
});
test('Red cinematic keeps grenade and wire artwork separate with no blast in immobilizing phases',()=>{
 const s=setup(),scene={uid:'core__redblaster_mg2',fin:{slot:'down',phases:['bait','lock','confirm','pose']},phase:'confirm',t:.7,ax:400,vx:800,vy:568,dir:-1},before=structuredClone(scene);let blasts=0,rects=0;
 s.ctx.arc=()=>blasts++;s.ctx.fillRect=()=>rects++;assert(s.renderer.drawFinisher(s.ctx,scene));assert.equal(blasts,0);assert.equal(rects,0);assert.deepEqual(scene,before);
 scene.fin={slot:'neutral',phases:['aim','arc','blast','pose']};scene.phase='arc';scene.t=.4;assert(s.renderer.drawFinisher(s.ctx,scene));assert(rects>0);assert.equal(blasts,0);scene.phase='blast';scene.t=.7;assert(s.renderer.drawFinisher(s.ctx,scene));assert.equal(blasts,1);
});
