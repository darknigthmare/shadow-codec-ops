from pathlib import Path
import hashlib,json,re
ROOT=Path('/tmp/cqc-pass19-application/public/cqc')
OUT=Path('/tmp/cqc-pass19-scale-menu')
sha=lambda b:hashlib.sha256(b).hexdigest()
plans=[]
def build(rel,mutator):
 p=ROOT/rel;raw=p.read_bytes();s=raw.decode();ops=[]
 def patch(old,new,label,count=1):
  nonlocal s
  actual=s.count(old)
  if actual!=count:raise RuntimeError((rel,label,actual,count))
  ops.append({'label':label,'old':old,'new':new,'count':count});s=s.replace(old,new)
 mutator(patch,s)
 target=OUT/('spatial-staged-'+p.name);target.write_text(s)
 plans.append({'path':'public/cqc/'+rel,'sourceSha256':sha(raw),'outputSha256':sha(s.encode()),'operations':ops,'staged':str(target)})
def engine(p,s):
 p("const copy=x=>JSON.parse(JSON.stringify(x));","const copy=x=>JSON.parse(JSON.stringify(x));\nconst spatial=()=>root.CQC_PASS19_VERSUS_SPATIAL,bodyY=(p,h)=>spatial()?.bodyY(p,h)??p.y-h,bodyPoint=(p,x,y)=>spatial()?.bodyPoint(p,x,y)||{x:p.x+p.face*x,y:p.y-y};",'spatial helpers')
 p('function box(p){const reviewed=', 'function baseBox(p){const reviewed=', 'preserve historical base hurtbox')
 p('if(reviewed)return reviewed;\n const k=p.f.visual?.kind', "if(reviewed)return reviewed;\n const authored=p.f.combat.simulationBody;if(authored&&[authored.width,authored.height].every(n=>Number.isFinite(n)&&n>0)){const low=p.crouch||p.attack?.def.lowProfile,h=low?(Number.isFinite(authored.crouchHeight)&&authored.crouchHeight>0?authored.crouchHeight:authored.height*.53):authored.height;return{x:p.x-authored.width/2,y:p.y-h,w:authored.width,h};}\n const k=p.f.visual?.kind",'explicit new identity body extent without altering legacy profiles')
 p('function overlap(a,b){','function box(p){const b=baseBox(p);return spatial()?.transformBox(p,b)||b;}\nfunction overlap(a,b){','scale all hurtboxes including reviewed Sunny bodies')
 old=re.search(r'function hitbox\(p\)\{[^\n]+',s).group()
 new=old.replace('return{x:p.face>0?', 'const b={x:p.face>0?').replace('w:r,h};}', 'w:r,h};return spatial()?.transformBox(p,b)||b;}')
 p(old,new,'scale melee and throw boxes around feet')
 old="const q={id:s.nextId++,owner:p.slot,\n x:p.x+p.face*(nativeOrigin?origin.forward:52),y:p.y-(nativeOrigin?origin.height:m.height||Math.min(145,box(p).h*.75)),vx:p.face*(m.speed||15),vy:m.vy||0,"
 new="const point=spatial()?.projectilePoint(p,m,baseBox(p))||{x:p.x+p.face*(nativeOrigin?origin.forward:52),y:p.y-(nativeOrigin?origin.height:m.height||Math.min(145,baseBox(p).h*.75))};const q={id:s.nextId++,owner:p.slot,\n x:point.x,y:point.y,vx:p.face*(m.speed||15),vy:m.vy||0,"
 p(old,new,'feet anchored projectile origin with unchanged projectile motion')
 for actor,height in [('d',245),('d',130),('d',140),('d',100),('a',220),('o',245),('target',120),('p',245),('o',250),('p',70)]:
  old=f'{actor}.x,{actor}.y-{height}'
  count=s.count(old)
  if count:p(old,f'{actor}.x,bodyY({actor},{height})',f'body attached FX {actor} height {height}',count)
 p('projectile.x=d.x+d.face*62;', 'projectile.x=bodyPoint(d,62,0).x;', 'reflected shot starts outside scaled guard')
 p("fx(s,(a.x+d.x)/2,FLOOR-160,'ring'", "fx(s,(a.x+d.x)/2,(bodyY(a,160)+bodyY(d,160))/2,'ring'", 'throw tech cue between scaled bodies')
 p('d.y-Math.min(box(d).h*.55,140)', 'd.y-Math.min(baseBox(d).h*.55,140)*(spatial()?.ratio(d)||1)', 'homing targets same relative torso fraction')
 p('q.y<-140)', 'q.y<(spatial()?.worldCeiling(s)??-140))', 'giant shots survive above historical screen ceiling')
 p('Math.abs(s.a.y-s.b.y)<110)', 'Math.abs(s.a.y-s.b.y)<110*Math.max(spatial()?.ratio(s.a)||1,spatial()?.ratio(s.b)||1))', 'scaled body separation vertical range')
 p("const i=empty(),d=Math.abs(o.x-p.x),dir=", "const i=empty(),d=Math.abs(o.x-p.x)/(spatial()?.ratio(p)||1),dir=", 'CPU chooses authored moves at scaled relative range')
 p("const api={version:'0.48'", "const api={spatialContract:'pass19-feet-spatial-v1',version:'0.48'", 'active engine contract marker')
 p('root.CQCCombat048Pass8=api;if(typeof module', 'root.CQCCombat048Pass8=api;spatial()?.registerEngine(api);if(typeof module', 'register coherent engine')
def chaff(p,s):
 old="const q={id:s.nextId++,owner:p.slot,uid:p.f.uid,x:p.x+p.face*(native?origin.forward:52),y:p.y-(native?origin.height:m.height||135),vx:p.face*(m.speed||7),vy:m.vy||-9,face:p.face,"
 new="const point=root.CQC_PASS19_VERSUS_SPATIAL?.projectilePoint(p,m,{h:180})||{x:p.x+p.face*(native?origin.forward:52),y:p.y-(native?origin.height:m.height||135)};const q={id:s.nextId++,owner:p.slot,uid:p.f.uid,x:point.x,y:point.y,vx:p.face*(m.speed||7),vy:m.vy||-9,face:p.face,"
 p(old,new,'Chaff same body origin transform')
 p('q.y<-140)', 'q.y<(root.CQC_PASS19_VERSUS_SPATIAL?.worldCeiling(s)??-140))','Chaff same world ceiling')
def html(p,s):
 p('<script src="../src/cqc-pass19-world-scale.js"></script>', '<script src="../src/cqc-pass19-world-scale.js"></script>\n<script src="../src/cqc-pass19-versus-spatial.js"></script>', 'load isolated spatial contract')
 old='function stageCam(g){if(!g)return 0;const a=g.a?.x||410,b=g.b?.x||870;return clamp((a+b)/2-640,-220,220)}'
 p(old,old+"\nfunction combatCameraPass19(s){const cam=stageCam(s),requested=clamp(1040/(Math.abs(s.a.x-s.b.x)+300),.78,1.08);return window.CQC_PASS19_VERSUS_SPATIAL?.camera(s,requested,cam)||{cam,zoom:requested,toX:x=>640+(x-640-cam)*requested,toY:y=>568+(y-568)*requested};}",'shared combat camera')
 p('let i=Combat.cpu(s,p,o),d=Math.abs(o.x-p.x),dir=', 'let i=Combat.cpu(s,p,o),d=Math.abs(o.x-p.x)/(window.CQC_PASS19_VERSUS_SPATIAL?.ratio(p)||1),dir=', 'profile CPU range uses body coordinates')
 p('window.CQC_PASS7_COMBAT_FIDELITY?.attachEngine(Combat);let lastMatchNotified=', "window.CQC_PASS7_COMBAT_FIDELITY?.attachEngine(Combat);window.CQC_PASS19_VERSUS_SPATIAL?.registerRenderer('pass19-world-camera-v1');let lastMatchNotified=",'activate only matching engine and renderer contracts')
 old="function drawGame(){const s=state;if(!s)return;const c=$('#game').getContext('2d'),time=s.frame/60,cam=stageCam(s),zoom=clamp(1040/(Math.abs(s.a.x-s.b.x)+300),.78,1.08);drawStage(c,s.stage,time,cam,false,{zoom});\n const toX=x=>640+(x-640-cam)*zoom,toY=y=>568+(y-568)*zoom;"
 new="function drawGame(){const s=state;if(!s)return;const c=$('#game').getContext('2d'),time=s.frame/60,{cam,zoom,toX,toY}=combatCameraPass19(s);drawStage(c,s.stage,time,cam,false,{zoom});"
 p(old,new,'render world with shared non-clipping camera')
 p('const px=toX(p.x),py=toY(p.y),a=p.attack,m=a?.def,', 'const px=toX(p.x),py=toY(p.y),bodyZoom=zoom*(window.CQC_PASS19_VERSUS_SPATIAL?.ratio(p)||1),a=p.attack,m=a?.def,','actor relative effect scale')
 p('drawBarrier(c,p,zoom);','drawBarrier(c,p,bodyZoom);','native body barrier scales with actor')
 p('c.ellipse(px,py-125*zoom,70*zoom,129*zoom,', 'c.ellipse(px,py-125*bodyZoom,70*bodyZoom,129*bodyZoom,','fallback body barrier scales with actor')
 p('c.moveTo(px-55+i*35,py);c.lineTo(px-45+i*32,py-220*zoom);','c.moveTo(px+(-55+i*35)*bodyZoom,py);c.lineTo(px+(-45+i*32)*bodyZoom,py-220*bodyZoom);','power body lines share spatial scale')
 p('c.strokeRect(px-47*zoom,py-220*zoom,94*zoom,145*zoom);','c.strokeRect(px-47*bodyZoom,py-220*bodyZoom,94*bodyZoom,145*bodyZoom);','mark outline share body scale')
 p('px,py-280*zoom);','px,py-280*bodyZoom);','feedback attaches above scaled body')
 old="if(windup&&m.telegraph){c.strokeStyle=(tagColors45[m.tag]||'#d9bd71')+'90';c.lineWidth=1.5;c.setLineDash([10,8]);c.beginPath();c.moveTo(px,py-(m.projectileOrigin?.[p.face]?.height||m.height||140)*zoom);c.lineTo(px+p.face*1050,py-(m.projectileOrigin?.[p.face]?.height||m.height||140)*zoom);c.stroke();c.setLineDash([]);}"
 new="if(windup&&m.telegraph){const origin=window.CQC_PASS19_VERSUS_SPATIAL?.projectileOrigin(p,m,{h:Combat.box(p).h/(window.CQC_PASS19_VERSUS_SPATIAL?.ratio(p)||1)}),height=origin?.height||(m.projectileOrigin?.[p.face]?.height||m.height||140),forward=origin?.forward||0;c.strokeStyle=(tagColors45[m.tag]||'#d9bd71')+'90';c.lineWidth=1.5;c.setLineDash([10,8]);c.beginPath();c.moveTo(px+p.face*forward*zoom,py-height*zoom);c.lineTo(px+p.face*1050*zoom,py-height*zoom);c.stroke();c.setLineDash([]);}"
 p(old,new,'telegraph starts at simulation shot origin')
 p("position:{x:px,y:py},spriteScale:1.12});", "position:{x:px,y:py},spriteScale:1.12,visualOrigin:window.CQC_PASS19_VERSUS_SPATIAL?.projectileOrigin(p,m,{h:Combat.box(p).h/(window.CQC_PASS19_VERSUS_SPATIAL?.ratio(p)||1)})});",'fallback muzzle uses same world origin; selected physical source remains guarded')
 p('c.save();c.translate(px,py-(m.height||130)*zoom);c.scale(p.face,1);', 'const meleeBox=Combat.hitbox(p),meleeY=meleeBox?toY(meleeBox.y+meleeBox.h/2):py-(m.height||130)*bodyZoom,meleeReach=clamp(p.f.reach||1,.85,1.25);c.save();c.translate(px,meleeY);c.scale(p.face,1);','melee effect centered on actual attack geometry')
 p('drawMelee(c,p,m,clamp((a.t-m.startup)/m.active,0,1),zoom,vfxOptionsPass18)', 'drawMelee(c,p,{...m,reach:m.reach*meleeReach},clamp((a.t-m.startup)/m.active,0,1),bodyZoom,vfxOptionsPass18)','native melee effect shares attack reach scale')
 p('c.ellipse(m.reach*.45*zoom,0,m.reach*.64*zoom,35*zoom,', 'c.ellipse(m.reach*meleeReach*.45*bodyZoom,0,m.reach*meleeReach*.64*bodyZoom,35*bodyZoom,','fallback melee effect shares attack reach scale')
 p('c.arc(px+p.face*35*zoom,py-125*zoom,65*zoom,','c.arc(px+p.face*35*bodyZoom,py-125*bodyZoom,65*bodyZoom,','parry arc shares body scale')
 p('if(q.def.fuse){c.fillRect(-8,-9,16,18);', 'c.scale(zoom,zoom);if(q.def.fuse){c.fillRect(-8,-9,16,18);','fallback projectile shape follows world camera')
 p('x+Math.cos(an)*r,y+Math.sin(an)*r);c.lineTo(x+Math.cos(an)*(r+11),y+Math.sin(an)*(r+11));', 'x+Math.cos(an)*r*zoom,y+Math.sin(an)*r*zoom);c.lineTo(x+Math.cos(an)*(r+11)*zoom,y+Math.sin(an)*(r+11)*zoom);','fallback FX spokes follow world camera')
 p('if(dojo.boxes){const zoom=clamp(1040/(Math.abs(state.a.x-state.b.x)+300),.78,1.08),cam=stageCam(state);','if(dojo.boxes){const {zoom,cam}=combatCameraPass19(state);','debug geometry uses identical render camera',2)
 # Finisher staging has no hit resolution: zoom the complete world choreography, retain fixed HUD.
 p("col=familyColor46(sc.fin.family);drawStage(c,s.stage,s.frame/60,0,false);c.fillStyle='rgba(0,0,0,.18)';c.fillRect(0,0,1280,720);", "col=familyColor46(sc.fin.family);",'defer cinematic background until camera fit')
 p('drawFighter(c,winner.f,ax,568,dir,1.23,{...aPose});', "const sceneState={frame:s.frame,a:{...winner,x:ax,y:568,face:dir},b:{...loser,x:vx,y:vy,face:-dir}},sceneCamera=window.CQC_PASS19_VERSUS_SPATIAL?.camera(sceneState,1,0,{top:132,spriteMultiplier:1.23})||{zoom:1};drawStage(c,s.stage,s.frame/60,0,false,{zoom:sceneCamera.zoom});c.fillStyle='rgba(0,0,0,.18)';c.fillRect(0,0,1280,720);c.save();c.translate(640,568);c.scale(sceneCamera.zoom,sceneCamera.zoom);c.translate(-640,-568);drawFighter(c,winner.f,ax,568,dir,1.23,{...aPose});",'fit both cinematic bodies and complete world effects')
 p("if(finishSettings46.mode==='cinematic'){", "c.restore();if(finishSettings46.mode==='cinematic'){",'fixed cinematic screen overlay and HUD outside world zoom')
 p("{time:s.frame/60,camera:0,motion:stageMotionReprise(),preview:false}", "{time:s.frame/60,camera:0,zoom:sceneCamera.zoom,motion:stageMotionReprise(),preview:false}",'cinematic foreground shares camera')
build('src/cqc-pass8-combat-engine.js',engine)
build('src/cqc-pass7-combat-fidelity.js',chaff)
build('modules/unified-versus-v055.html',html)
addition=OUT/'cqc-pass19-versus-spatial.js'
plan={'schema':'cqc.guarded-spatial-patch/1','baseline':'/tmp/cqc-pass19-application','scope':'Active Versus engine, attached Chaff and all combat/finisher world render coordinates; no Core boss activation.','newFiles':[{'source':str(addition),'path':'public/cqc/src/'+addition.name,'sha256':sha(addition.read_bytes())}],'files':plans,'damageAndTimingsChanged':False,'moveDefinitionsChanged':False,'sourcePixelsChanged':False,'hurtboxQualification':'Historical gameplay insets are scaled coherently; no claim of anatomical pixel hulls.'}
(OUT/'VERSUS_SPATIAL_GUARDED_PATCH_PLAN_V1.json').write_text(json.dumps(plan,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'files':len(plans),'operations':sum(len(p['operations']) for p in plans),'outputs':[{k:p[k] for k in ['path','sourceSha256','outputSha256']} for p in plans]},indent=2))
