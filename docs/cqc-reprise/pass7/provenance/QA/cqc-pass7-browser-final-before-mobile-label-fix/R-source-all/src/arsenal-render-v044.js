/* Original procedural studies; no commercial art or font is embedded. */
(function(root){'use strict';
const E=root.ArsenalEngine,TAU=Math.PI*2;
function poly(c,pts,col,line='#080f13',lw=3){c.beginPath();pts.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.closePath();c.fillStyle=col;c.fill();if(line){c.strokeStyle=line;c.lineWidth=lw;c.stroke();}}
function box(c,x,y,w,h,col,line=null){c.fillStyle=col;c.fillRect(x,y,w,h);if(line){c.strokeStyle=line;c.lineWidth=2;c.strokeRect(x,y,w,h);}}
function stroke(c,pts,col,w=2){c.beginPath();pts.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.strokeStyle=col;c.lineWidth=w;c.lineCap='round';c.lineJoin='round';c.stroke();}
function disc(c,x,y,r,col,line=null,w=2){c.beginPath();c.arc(x,y,r,0,TAU);c.fillStyle=col;c.fill();if(line){c.strokeStyle=line;c.lineWidth=w;c.stroke();}}
function ellipse(c,x,y,rx,ry,col){c.beginPath();c.ellipse(x,y,rx,ry,0,0,TAU);c.fillStyle=col;c.fill();}
function shade(hex,d){let n=parseInt(hex.slice(1),16);return '#'+[n>>16,(n>>8)&255,n&255].map(a=>Math.max(0,Math.min(255,a+d)).toString(16).padStart(2,'0')).join('');}
function txt(c,t,x,y,size=12,col='#e9eada',align='left',weight=700){c.fillStyle=col;c.font=`${weight} ${size}px "DejaVu Sans",Arial,sans-serif`;c.textAlign=align;c.fillText(t,x,y);}
const palettes={
 hangar:['#899b97','#31433f','#182722','#6c7d70'],rexhangar:['#a7b6bf','#3c515d','#152631','#8a9ca2'],ocean:['#dec395','#507585','#173b48','#d7b076'],arsenal:['#7f9ca2','#294953','#0e2835','#87cedc'],runway:['#bf9068','#3f4b41','#18271f','#ca9f74'],forest:['#c2d2ad','#50695a','#1b382d','#a2bd88'],silo:['#9daca1','#404f47','#182924','#adb07e'],quarry:['#d1b490','#666d59','#323e32','#c5b178'],lake:['#c5d7b8','#48736e','#203f3b','#abc7a1'],motherbase:['#d2bd9b','#507d87','#284858','#e5b973'],desert:['#e2c093','#887156','#453727','#dbb585'],rain:['#849cb3','#304659','#152936','#9cc0cb'],city:['#b8a08c','#485563','#192b38','#d5ad69'],wreck:['#c68c62','#624133','#301f1c','#edb570'],lab:['#b6cdb2','#526f57','#142e24','#bde17b'],lab2:['#bbb0cf','#615375','#272039','#d5a9dc'],system:['#8599a4','#344b5b','#0d1b25','#9fd6e0'],facility:['#a68b6c','#4c4339','#1c1714','#d7aa6a'],snow:['#c5d5dd','#627987','#182a34','#e7eff0'],yard:['#a99c7f','#4f594d','#1b2820','#d4bd74']};
function backdrop(c,s){const sc=s.def.scene,P=palettes[sc]||palettes.hangar,t=s.tick/60,cam=(s.player.x-400)*.2;const sky=c.createLinearGradient(0,0,0,720);sky.addColorStop(0,P[0]);sky.addColorStop(.55,P[1]);sky.addColorStop(1,P[2]);c.fillStyle=sky;c.fillRect(0,0,1280,720);
 // Distant light and haze; seven speeds derived from the actual operator position.
 const glow=c.createRadialGradient(980-cam*.03,180,15,980-cam*.03,180,330);glow.addColorStop(0,P[0]+'bb');glow.addColorStop(1,P[0]+'00');c.fillStyle=glow;c.fillRect(0,0,1280,580);
 const outside=['ocean','runway','forest','quarry','lake','motherbase','desert','rain','city','wreck'].includes(sc);
 c.save();c.translate(-cam*.12,0);
 if(['forest','lake','desert','quarry','wreck'].includes(sc)){
  for(let layer=0;layer<3;layer++){let pts=[[-120,540]];for(let x=-120;x<1480;x+=70)pts.push([x,260+layer*50-Math.sin(x*.013+layer)*55-Math.cos(x*.006)*55]);pts.push([1470,570]);poly(c,pts,shade(P[1],25-layer*19),null);}
 }else if(outside){for(let i=0;i<22;i++){let x=i*65-70,h=75+(i*43)%140;box(c,x,390-h,49,h,P[1]);for(let y=398-h;y<370;y+=23)box(c,x+9,y,20,3,P[0]+'44');}}
 else {for(let i=0;i<12;i++){box(c,i*118-40,150,80,320,P[1]);box(c,i*118-22,186,45,115,P[0]+'22');}}
 c.restore();
 c.save();c.translate(-cam*.3,0);
 if(['forest','lake'].includes(sc)){
  for(let i=0;i<14;i++){let x=i*110-40;stroke(c,[[x,540],[x+22,278-(i%3)*30]],P[2],14);for(let j=0;j<3;j++)ellipse(c,x+j*15-12,270-(i%3)*30+j*25,53-j*8,28,P[2]+'dd');}
  if(sc==='lake'){box(c,-30,463,1500,78,'#7bafa377');for(let i=0;i<55;i++)box(c,i*29,480+(i%5)*12,45,2,'#ccd6b544');}
 }else if(['desert','quarry'].includes(sc)){
  for(let i=0;i<9;i++){let x=i*172-80;poly(c,[[x,558],[x+20,368],[x+65,341],[x+108,389],[x+151,558]],P[2],null);stroke(c,[[x+40,396],[x+82,433],[x+68,514]],P[3]+'44',5);}
  if(sc==='desert')for(let i=0;i<4;i++){box(c,200+i*240,398,120,148,'#9b8061');box(c,235+i*240,430,44,116,'#3e3429');}
 }else if(sc==='wreck'){
  for(let i=0;i<7;i++){let x=i*195-50;poly(c,[[x,532],[x+30,377+(i%3)*14],[x+154,414],[x+171,532]],'#302d2c','#7c5b45',2);stroke(c,[[x+23,426],[x+128,458],[x+70,503]],'#a5785344',4);}
 }else if(sc==='ocean'||sc==='motherbase'||sc==='runway'){
  box(c,-60,436,1500,120,'#36606f');for(let i=0;i<50;i++)box(c,i*29-((t*18)%29),470+(i%6)*11,47,2,'#94b4ac44');
  for(let i=0;i<5;i++){const x=60+i*294;stroke(c,[[x,529],[x,288],[x+150,288],[x+194,326]],'#284957',12);stroke(c,[[x,288],[x+120,218],[x+120,440]],'#788e91',3);}
 }else if(sc==='rain'||sc==='city'){
  for(let i=0;i<11;i++){let x=i*135-60,h=210+i%4*25;box(c,x,555-h,104,h,P[2]);box(c,x+10,560-h,84,6,'#79838a');for(let yy=585-h;yy<530;yy+=34)for(let xx=0;xx<3;xx++)box(c,x+14+xx*26,yy,12,18,'#b9b28d44');}
 }else{
  for(let i=0;i<8;i++){const x=i*180-50;box(c,x,128,30,443,P[2]);stroke(c,[[x,175],[x+164,309],[x,445]],shade(P[1],8),8);stroke(c,[[x+28,219],[x+157,219]],P[3]+'55',3);}
  if(sc==='rexhangar'||sc==='hangar'||sc==='silo'){
   box(c,855,176,228,371,'#0b1820');box(c,872,187,194,324,'#2d4348');for(let y=198;y<502;y+=36)box(c,879,y,180,4,'#6c818077');
   for(let i=0;i<6;i++){const x=i*260-80;stroke(c,[[x,145],[x+195,145],[x+209,228]],'#b4b9ac',9);box(c,x+50,134,100,7,'#e9e8c5');}
  }
  if(sc==='lab'||sc==='lab2')for(let i=0;i<8;i++){let x=i*180-60;box(c,x,320,70,213,'#162a34','#668b8b');box(c,x+9,339,52,85,P[3]+'44');for(let y=442;y<515;y+=22)box(c,x+8,y,52,3,P[3]);}
 }
 c.restore();
 // Walkway, props and battle plane. Neutral low-contrast framing leaves tells unobscured.
 c.save();c.translate(-cam*.55,0);for(let i=0;i<14;i++){let x=i*110-50;box(c,x,531,5,60,'#74837c');stroke(c,[[x,531],[x+110,531]],'#96a59a',3);}for(let i=0;i<5;i++){let x=i*316-115;box(c,x,536,103,55,P[2],P[3]+'55');stroke(c,[[x+8,544],[x+89,581],[x+8,581],[x+89,544]],'#7d8a7444',3);}c.restore();
 const floor=c.createLinearGradient(0,598,0,720);floor.addColorStop(0,shade(P[2],20));floor.addColorStop(1,'#081115');c.fillStyle=floor;c.fillRect(0,598,1280,122);box(c,0,596,1280,5,P[3]+'99');
 for(let x=-200;x<1480;x+=94)stroke(c,[[x-cam*.73,605],[640+(x-640)*1.25-cam*.73,720]],'#ffffff13',2);
 for(let y=625;y<720;y+=34)box(c,0,y,1280,2,'#ffffff0b');
 // Rain, dust, ash. Same deterministic simulation clock as combat; no random render state.
 for(let i=0;i<62;i++){let x=(i*101+s.tick*(sc==='rain'?2.9:.22))%1360-40,y=(i*67+s.tick*(sc==='rain'?8:.13))%670;
  if(['ocean','rain'].includes(sc))stroke(c,[[x,y],[x-5,y+20]],'#d8e4eb55',1.2);
  else if(['wreck','runway'].includes(sc))box(c,x,y,2,4,'#edb47477');
  else if(['forest','lake','desert','quarry'].includes(sc))ellipse(c,x,y,14,2,P[0]+'11');
  else box(c,x,y,2,2,P[0]+'33');
 }
 for(let i=0;i<10;i++)box(c,i*151-cam*.85,699,96,21,'#070f12');
 const vignette=c.createRadialGradient(640,340,260,640,340,770);vignette.addColorStop(0,'#00000000');vignette.addColorStop(1,'#00000080');c.fillStyle=vignette;c.fillRect(0,0,1280,720);
}
function armor(c,pts,col,detail=true){poly(c,pts,col);if(detail){const xs=pts.map(p=>p[0]),ys=pts.map(p=>p[1]),x=Math.min(...xs),y=Math.min(...ys),w=Math.max(...xs)-x,h=Math.max(...ys)-y;c.save();c.beginPath();pts.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.closePath();c.clip();
 const g=c.createLinearGradient(x,y,x+w,y+h);g.addColorStop(0,'#ffffff19');g.addColorStop(.45,'#ffffff00');g.addColorStop(1,'#00101455');c.fillStyle=g;c.fillRect(x,y,w,h);
 for(let yy=y+19;yy<y+h;yy+=31){stroke(c,[[x+9,yy],[x+w-7,yy+7]],'#0e242422',1);}
 for(let xx=x+18;xx<x+w-12;xx+=41){disc(c,xx,y+15,2,'#253438');box(c,xx+1,y+13,2,1,'#c3cbc4');}
 for(let i=0;i<6;i++){const xx=x+((i*47+13)%Math.max(1,w)),yy=y+((i*31+25)%Math.max(1,h));stroke(c,[[xx,yy],[xx+9,yy-2]],'#d5dec922',1);}
 c.restore();stroke(c,[pts[0],pts[1]],shade(col,50),1.3);}}
function limb(c,pts,col,width=27){stroke(c,pts,'#090f13',width+7);stroke(c,pts,col,width);for(let i=1;i<pts.length-1;i++){disc(c,pts[i][0],pts[i][1],width*.62,'#223038','#0a1419');disc(c,pts[i][0],pts[i][1],width*.28,shade(col,28));}}
function vents(c,x,y,w,col){for(let i=0;i<5;i++)box(c,x,y+i*7,w,3,col);}
function foot(c,x,y,col){armor(c,[[x-25,y-17],[x+28,y-17],[x+44,y-2],[x+42,y+7],[x-35,y+7]],col);}
function machine(c,s,preview=false){const d=s.def,t=d.type,co=d.color,hi=shade(co,33),dark=shade(co,-34),acc=d.accent;
 c.save();c.translate(s.boss.x,s.boss.y);if(d.id==='chrysalis'&&!preview&&!s.boss.radar)c.globalAlpha=.32;ellipse(c,0,12,190,22,'#00000055');
 if(t==='rex'){
  // REX: rear-angled knees, wedge head, long railgun and circular radome.
  limb(c,[[65,-222],[92,-153],[117,-96],[85,-12]],dark,33);foot(c,85,0,dark);
  limb(c,[[-55,-218],[-90,-143],[-121,-87],[-103,-12]],co,38);foot(c,-104,0,co);
  armor(c,[[-135,-247],[-92,-289],[22,-294],[96,-260],[70,-182],[-60,-185]],co);
  armor(c,[[-153,-238],[-77,-264],[-19,-229],[-47,-192],[-132,-198]],hi);
  armor(c,[[-137,-231],[-80,-240],[-60,-223],[-86,-213],[-130,-218]],'#0c1e26');
  box(c,-126,-222,47,4,s.hp[0]<=0?'#e9a570':'#759697');
  armor(c,[[12,-292],[34,-329],[95,-310],[78,-249]],dark);
  limb(c,[[50,-267],[105,-265]],dark,15);
  if(s.hp[0]>0){disc(c,105,-265,46,hi,'#121c21',4);disc(c,105,-265,34,dark);stroke(c,[[68,-284],[141,-248]],acc,3);}else stroke(c,[[64,-257],[110,-278],[113,-260]],'#544f45',9);
  armor(c,[[-17,-282],[-211,-307],[-252,-296],[-250,-282],[-33,-259]],dark);box(c,-239,-295,98,5,hi);vents(c,9,-233,34,dark);
  armor(c,[[50,-208],[174,-153],[131,-143],[68,-164]],dark);
 }else if(t==='raymass'||t==='rayunmanned'){
  limb(c,[[-50,-215],[-90,-137],[-104,-92],[-82,-12]],co,29);limb(c,[[55,-214],[121,-124],[109,-65],[127,-12]],dark,27);foot(c,-82,0,co);foot(c,127,0,dark);
  armor(c,[[-79,-255],[-38,-315],[17,-315],[91,-248],[35,-177],[-36,-178]],co);
  armor(c,[[-90,-263],[-45,-285],[-16,-272],[-33,-236],[-89,-239]],hi);box(c,-76,-256,36,6,'#eaad6b');
  armor(c,[[-62,-254],[-129,-292],[-242,-273],[-266,-240],[-150,-245],[-89,-212]],s.hp[0]>0?co:dark);
  armor(c,[[63,-255],[128,-287],[225,-263],[251,-239],[144,-243],[76,-218]],s.hp[1]>0?dark:'#282d2c');
  if(t==='rayunmanned'){stroke(c,[[-227,-259],[-188,-227],[-268,-183]],'#b8c3b7',7);stroke(c,[[206,-256],[174,-218],[239,-181]],'#b8c3b7',7);}else vents(c,141,-258,44,'#122c36');
 }else if(t==='sahel'){
  limb(c,[[-45,-229],[-82,-143],[-95,-78],[-89,-11]],co,28);limb(c,[[47,-229],[77,-143],[104,-71],[116,-11]],dark,27);foot(c,-89,0,co);foot(c,116,0,dark);
  armor(c,[[-62,-327],[0,-349],[63,-319],[56,-243],[5,-213],[-49,-240]],co);
  armor(c,[[-35,-367],[5,-391],[35,-367],[21,-327],[-26,-327]],hi);box(c,-20,-352,30,6,acc);
  limb(c,[[-56,-308],[-104,-250],[-147,-226]],dark,22);stroke(c,[[-150,-226],[-232,-341]],hi,17);
  limb(c,[[59,-303],[121,-243],[138,-170]],co,22);armor(c,[[82,-257],[131,-274],[177,-222],[156,-123],[113,-142]],s.hp[2]>0?co:dark);
  stroke(c,[[24,-341],[59,-403],[105,-387]],'#3a4547',11);vents(c,-23,-300,38,dark);
 }else if(t==='harrier'){
  c.translate(0,Math.sin(s.tick*.028)*7);
  armor(c,[[-220,-247],[-117,-271],[46,-266],[154,-231],[52,-221],[-116,-218]],co);
  armor(c,[[-36,-266],[41,-363],[78,-346],[41,-249]],dark);armor(c,[[-42,-242],[92,-156],[133,-171],[56,-237]],hi);
  armor(c,[[112,-246],[155,-311],[176,-303],[163,-233]],co);poly(c,[[-140,-256],[-79,-275],[-48,-259]],'#213c4e');
  vents(c,-11,-251,55,dark);stroke(c,[[-163,-230],[-181,-231]],acc,4);
 }else if(t==='chrysalis'){
  c.translate(0,Math.sin(s.tick*.028)*8);
  limb(c,[[-70,-247],[-175,-245]],dark,18);limb(c,[[70,-247],[173,-245]],dark,18);limb(c,[[-42,-242],[-85,-205]],dark,14);limb(c,[[42,-242],[80,-205]],dark,14);
  for(let i=0;i<4;i++){let p=d.parts[i];if(s.hp[i]<=0){stroke(c,[[p.x-20,p.y],[p.x+15,p.y+9]],'#334239',8);continue;}ellipse(c,p.x,p.y,49,16,co);ellipse(c,p.x,p.y,40,10,'#142d2c');stroke(c,[[p.x-40,p.y+Math.sin(s.tick*.7)*7],[p.x+40,p.y-Math.sin(s.tick*.7)*7]],acc,3);disc(c,p.x,p.y,6,hi);}
  armor(c,[[-95,-273],[-15,-300],[64,-282],[85,-246],[34,-217],[-53,-224]],co);disc(c,0,-257,25,dark,hi,4);disc(c,0,-257,9,acc);
 }else if(t==='shagohod'||t==='pupa'||t==='cocoon'){
  if(t==='shagohod'){
   for(const x of [-155,90]){poly(c,[[x-83,-33],[x-32,-64],[x+68,-58],[x+95,-13],[x+74,8],[x-44,8]],dark);for(let n=0;n<6;n++)stroke(c,[[x-55+n*24,-31],[x-32+n*24,-8]],hi,6);}
   armor(c,[[-165,-125],[-70,-223],[65,-231],[173,-171],[151,-62],[-116,-66]],co);armor(c,[[-141,-155],[-83,-202],[-23,-197],[-17,-144]],hi);box(c,-94,-178,47,13,'#142733');
   disc(c,136,-155,44,dark,co,5);disc(c,136,-155,26,'#1a211e');stroke(c,[[11,-196],[-210,-221]],dark,14);
  }else if(t==='pupa'){
   poly(c,[[-199,-85],[-145,-120],[142,-120],[187,-80],[160,0],[-160,0]],dark);for(let i=0;i<8;i++)disc(c,-145+i*40,-26,26,'#273731',co,4);
   armor(c,[[-135,-167],[-78,-221],[68,-219],[140,-161],[111,-85],[-105,-82]],co);disc(c,0,-190,31,dark,hi,4);disc(c,0,-190,12,acc);
   for(let i=0;i<2;i++){const x=i?120:-155;limb(c,[[i?71:-71,-163],[x,-160]],dark,20);if(s.hp[i]>0){disc(c,x,-160,23,hi,dark,4);stroke(c,[[x-10,-176],[x-10,-144],[x+8,-154],[x+8,-171]],acc,3);}}
  }else{
   for(let i=0;i<11;i++)disc(c,-204+i*40,-28,25,'#253128',co,6);
   armor(c,[[-238,-181],[-170,-276],[-60,-330],[68,-330],[184,-262],[237,-180],[209,-45],[-211,-45]],dark);
   for(let i=0;i<4;i++){const pp=d.parts[i];armor(c,[[pp.x-49,pp.y-44],[pp.x+40,pp.y-42],[pp.x+46,pp.y+49],[pp.x-41,pp.y+60]],s.hp[i]>0?co:'#343b32');if(s.hp[i]>0)vents(c,pp.x-28,pp.y-24,52,dark);}
   armor(c,[[-58,-305],[0,-333],[59,-309],[50,-260],[-49,-261]],hi);disc(c,0,-290,19,acc,dark,4);
  }
 }else if(t==='raxa'){
  for(let i=0;i<4;i++){const p=d.parts[i],dir=i<2?-1:1;limb(c,[[dir*40,-195],[p.x,p.y],[p.x+dir*30,-10]],i%2?dark:co,21);foot(c,p.x+dir*30,0,dark);}
  armor(c,[[-86,-227],[-53,-268],[52,-268],[89,-227],[51,-174],[-50,-174]],co);armor(c,[[-33,-256],[34,-256],[43,-205],[-41,-205]],hi);disc(c,0,-223,17,acc,dark,4);
 }else if(t==='peacewalker'){
  // Four supports are visible; the front two are targetable in this adaptation.
  limb(c,[[-31,-254],[-176,-143],[-185,-12]],dark,18);limb(c,[[33,-249],[185,-138],[203,-12]],dark,18);
  for(const dir of [-1,1]){limb(c,[[dir*50,-253],[dir*128,-133],[dir*123,-10]],co,32);foot(c,dir*123,0,co);}
  armor(c,[[-112,-340],[49,-356],[102,-301],[69,-239],[-81,-244]],co);armor(c,[[-84,-316],[-11,-339],[63,-304],[26,-266],[-80,-270]],hi);disc(c,0,-276,25,dark,acc,4);vents(c,-79,-308,39,dark);
 }else if(t==='bic'){
  armor(c,[[-48,-362],[0,-412],[49,-361],[54,-120],[-54,-120]],co);armor(c,[[-21,-360],[0,-384],[20,-360],[23,-174],[-23,-174]],hi);vents(c,-20,-245,38,dark);
  for(let i=0;i<3;i++){const p=d.parts[i];if(s.hp[i]>0){limb(c,[[p.x*1.5,-5],[p.x,p.y]],dark,26);armor(c,[[p.x-29,p.y-19],[p.x+26,p.y-19],[p.x+25,p.y+18],[p.x-25,p.y+18]],co);}}
  stroke(c,[[-100,-70],[-100,-299]],'#566c64',7);stroke(c,[[100,-70],[100,-299]],'#566c64',7);
 }else if(t==='excelsus'){
  // Six radial legs and two enormous blades: silhouette distinct from a biped.
  limb(c,[[-55,-255],[-192,-225],[-300,-13]],dark,21);limb(c,[[55,-255],[216,-213],[309,-13]],dark,21);
  for(let i=0;i<4;i++){const p=d.parts[i],dir=i<2?-1:1;limb(c,[[dir*43,-228],[p.x,p.y],[p.x+dir*22,-10]],i%2?dark:co,30);foot(c,p.x+dir*22,0,co);}
  armor(c,[[-152,-241],[-83,-294],[61,-299],[162,-244],[100,-166],[-98,-166]],co);armor(c,[[-67,-278],[0,-308],[79,-273],[49,-202],[-45,-203]],hi);
  for(const [i,dir] of [[4,-1],[5,1]]){limb(c,[[dir*116,-250],[dir*211,-321],[dir*216,-278]],dark,25);if(s.hp[i]>0){poly(c,[[dir*216,-284],[dir*338,-210],[dir*313,-166],[dir*205,-258]],'#c3c4a2','#11191c',4);stroke(c,[[dir*218,-275],[dir*318,-202]],'#e5deb2',3);}}
  disc(c,0,-213,34,dark,hi,3);disc(c,0,-213,17,s.hp.slice(0,6).every(v=>v<=0)?'#faab54':'#685b40');vents(c,-102,-253,39,dark);vents(c,68,-253,39,dark);
 }else if(t==='grad'){
  limb(c,[[-42,-143],[-82,-65],[-80,-9]],dark,31);limb(c,[[42,-143],[80,-65],[85,-9]],co,31);foot(c,-80,0,dark);foot(c,85,0,co);
  armor(c,[[-89,-226],[-39,-275],[48,-269],[89,-228],[70,-125],[-72,-127]],co);box(c,-29,-231,59,13,acc);
  for(const [idx,dir] of [[0,-1],[1,1]]){if(s.hp[idx]>0)armor(c,[[dir*58,-224],[dir*150,-245],[dir*165,-164],[dir*124,-87],[dir*54,-133]],s.boss.exposure>0?shade(co,18):dark);for(let i=0;i<3;i++)disc(c,dir*104,-234+i*20,5,'#0a1820',hi);}
  vents(c,-29,-184,59,dark);
 }else if(t==='kodoque'||t==='chaioth'){
  if(t==='kodoque'){
   for(const dir of [-1,1]){limb(c,[[dir*69,-170],[dir*156,-90],[dir*192,-10]],dark,30);foot(c,dir*192,0,co);}
   ellipse(c,0,-195,101,97,co);stroke(c,[[-82,-250],[-51,-280],[28,-292],[85,-238]],hi,7);disc(c,0,-225,39,dark,hi,4);disc(c,0,-225,15,acc);
   for(const [idx,dir] of [[0,-1],[1,1]]){limb(c,[[dir*79,-207],[dir*126,-168]],dark,21);if(s.hp[idx]>0){disc(c,dir*126,-168,37,co,dark,4);disc(c,dir*126,-168,19,acc);}}
  }else{
   limb(c,[[-50,-211],[-148,-115],[-133,-9]],co,25);limb(c,[[50,-211],[142,-115],[122,-9]],dark,25);foot(c,-133,0,co);foot(c,122,0,dark);
   armor(c,[[-62,-278],[3,-341],[83,-279],[63,-173],[0,-141],[-76,-183]],co);armor(c,[[-21,-292],[29,-305],[49,-231],[0,-210],[-38,-240]],hi);disc(c,0,-190,24,acc,dark,5);
   if(s.hp[2]>0){armor(c,[[21,-293],[160,-324],[211,-293],[50,-274]],dark);box(c,62,-304,92,5,acc);}stroke(c,[[-64,-249],[-107,-315]],dark,17);
  }
 }else if(t==='arsenalgear'||t==='outerhaven'){
  // Immense Patriot cores: architecture rather than a walking silhouette.
  box(c,-235,-342,470,305,dark,'#0b1318');armor(c,[[-210,-320],[-128,-368],[128,-368],[210,-320],[190,-60],[-190,-60]],co);
  for(let i=0;i<3;i++){const x=-145+i*145;if(s.hp[i]>0){disc(c,x,-238,43,hi,dark,4);disc(c,x,-238,18,acc);stroke(c,[[x,-194],[x,-98]],acc+'88',5);}}
  armor(c,[[-75,-188],[0,-230],[75,-188],[62,-90],[-62,-90]],dark);disc(c,0,-145,31,s.hp[3]>0?acc:'#5f5147',dark,4);vents(c,-160,-292,60,dark);vents(c,100,-292,60,dark);
 }else if(['battlegear','dwalker','walkercolumn','gekko','dwarfswarm'].includes(t)){
  const small=['dwalker','walkercolumn','dwarfswarm'].includes(t),scale=small?.78:1;c.save();c.scale(scale,scale);
  for(const dir of [-1,1]){limb(c,[[dir*48,-185],[dir*88,-108],[dir*82,-10]],dir<0?co:dark,small?24:31);foot(c,dir*82,0,dir<0?co:dark);}
  armor(c,[[-91,-255],[-39,-296],[53,-286],[101,-241],[65,-145],[-72,-145]],co);armor(c,[[-52,-270],[13,-286],[66,-252],[34,-191],[-43,-193]],hi);disc(c,0,-212,22,acc,dark,4);
  if(t==='battlegear'){stroke(c,[[-62,-257],[-183,-315]],dark,24);box(c,-173,-308,92,6,acc);armor(c,[[69,-267],[145,-272],[159,-205],[82,-195]],dark);}else if(t==='gekko'){poly(c,[[-70,-252],[-5,-323],[69,-255],[53,-180],[-54,-182]],hi);disc(c,0,-233,18,'#d5e6dd',acc,3);}else{box(c,45,-244,95,15,dark,'#0b1318');box(c,67,-239,48,5,acc);}c.restore();
 }else if(t==='mk2'||t==='mk3'){
  armor(c,[[-72,-170],[-34,-225],[43,-220],[78,-168],[55,-78],[-58,-80]],co);disc(c,0,-166,23,acc,dark,4);limb(c,[[-45,-90],[-78,-22]],dark,18);limb(c,[[45,-90],[78,-22]],dark,18);foot(c,-78,0,co);foot(c,78,0,co);stroke(c,[[-50,-176],[-127,-207]],dark,14);stroke(c,[[50,-176],[126,-198]],dark,14);box(c,-29,-125,58,11,hi);
 }else if(t==='hind'){
  armor(c,[[-190,-226],[-107,-293],[104,-286],[193,-217],[144,-127],[-142,-130]],co);poly(c,[[120,-260],[257,-217],[202,-178],[110,-191]],dark);poly(c,[[-143,-249],[-256,-280],[-220,-236],[-132,-208]],dark);box(c,-210,-310,420,10,hi);stroke(c,[[0,-303],[0,-374]],dark,12);box(c,-156,-244,87,42,'#203843',acc);for(let i=0;i<3;i++)disc(c,-80+i*67,-150,10,'#17252b',hi,2);
 }else if(t==='m1tank'||t==='bulldozer'){
  box(c,-182,-104,364,94,dark,'#091116');for(let i=0;i<6;i++)disc(c,-132+i*53,-17,23,'#182125',co,4);
  if(t==='m1tank'){armor(c,[[-86,-174],[-28,-220],[78,-205],[118,-162],[85,-103],[-78,-103]],co);box(c,45,-195,205,17,dark,'#091116');box(c,89,-190,117,5,acc);}else{armor(c,[[-70,-174],[20,-209],[113,-169],[98,-105],[-55,-105]],co);poly(c,[[-183,-112],[-289,-89],[-270,-28],[-170,-43]],hi);for(const dir of [-1,1])limb(c,[[dir*65,-120],[dir*132,-95]],dark,19);}
 }else{
  // TX-55, D, ZEKE and Gander: each has a different upper assembly.
  for(const dir of [-1,1]){limb(c,[[dir*43,-180],[dir*106,-113],[dir*99,-10]],dir<0?co:dark,31);foot(c,dir*99,0,dir<0?co:dark);}
  if(t==='gander'){armor(c,[[-116,-239],[-53,-289],[59,-282],[112,-233],[79,-165],[-81,-165]],co);armor(c,[[-80,-263],[-21,-285],[54,-258],[25,-213],[-56,-207]],hi);stroke(c,[[-49,-270],[-188,-313]],dark,26);box(c,-177,-306,91,5,acc);disc(c,-6,-234,20,'#1d3843',acc,3);}
  else if(t==='zeke'){armor(c,[[-73,-261],[-26,-288],[54,-272],[81,-205],[42,-165],[-44,-165]],co);box(c,-29,-239,60,12,acc);limb(c,[[-56,-248],[-126,-269]],dark,19);stroke(c,[[-120,-247],[-213,-322]],hi,21);armor(c,[[76,-284],[155,-288],[167,-224],[84,-215]],dark);for(let i=0;i<3;i++)disc(c,96+i*23,-254,8,'#111f24',hi,2);}
  else if(t==='d'){armor(c,[[-100,-258],[-58,-294],[65,-282],[112,-236],[67,-166],[-81,-167]],co);armor(c,[[-47,-276],[44,-276],[54,-223],[-44,-223]],hi);box(c,-29,-250,54,16,'#193341');stroke(c,[[-95,-230],[-174,-246]],dark,22);vents(c,56,-219,32,dark);}
  else{armor(c,[[-95,-282],[77,-282],[92,-179],[-91,-179]],co);box(c,-65,-260,106,50,dark,hi);box(c,-42,-250,65,15,acc);vents(c,-67,-202,64,'#1e302c');armor(c,[[69,-269],[130,-251],[131,-181],[82,-198]],dark);}
 }
 // Layered wear details; destroyed parts keep their original anchors but lose their assembly highlight.
 for(let i=0;i<s.hp.length;i++){if(s.hp[i]<=0){const p=d.parts[i];stroke(c,[[p.x-17,p.y-8],[p.x+10,p.y+8],[p.x-2,p.y+14]],'#cf996a',2);if(s.tick%130<10)box(c,p.x,p.y,3,3,'#ffad70');}}
 c.restore();
 if(!preview){for(let i=0;i<s.hp.length;i++){const p=E.partPoint(s,i);if(s.hp[i]<=0)continue;const active=i===s.target,open=E.isUnlocked(s,i);c.strokeStyle=active?(open?'#eacf85':'#f38768'):'#c2d8c04d';c.lineWidth=active?2.4:1;c.setLineDash(open?[]:[4,5]);c.beginPath();c.arc(p.x,p.y,active?33:19,0,TAU);c.stroke();c.setLineDash([]);txt(c,String(i+1),p.x,p.y+4,11,active?'#fff1bf':'#ccd6d199','center');if(active){stroke(c,[[p.x+32,p.y],[p.x+75,p.y-25],[p.x+112,p.y-25]],'#d9c598',1.2);}}
 }
}
function human(c,s){const p=s.player,blade=s.def.weapon==='blade',big=s.def.hero==='BIG BOSS'||s.def.hero==='VENOM SNAKE',walk=Math.abs(p.x-(s.lastX??p.x))>1,tm=s.tick*.15;const col=blade?'#94adb4':big?'#75866a':'#617e7d',dark=blade?'#303f4a':'#354940';c.save();c.translate(p.x,p.y);c.scale(p.face,1);ellipse(c,0,4,34,9,'#0006');
 const offset=p.reload>0?7:0;
 limb(c,[[-13,-67],[-22,-31],[-30+Math.sin(tm)*3,-3]],dark,13);limb(c,[[12,-67],[21,-32],[25-Math.sin(tm)*3,-3]],col,13);box(c,-39,-7,25,9,'#182729');box(c,18,-7,24,9,'#1c2829');
 armor(c,[[-25,-139],[0,-151],[27,-132],[20,-72],[-20,-67],[-29,-109]],col);armor(c,[[-19,-126],[0,-115],[19,-124],[13,-84],[-10,-86]],dark);stroke(c,[[-20,-133],[16,-80]],'#bbbea0',4);box(c,-23,-80,48,10,'#29332a');for(let i=0;i<3;i++)box(c,-22+i*17,-77,13,15,'#768575','#26372d');
 limb(c,[[-24,-127],[-37,-102],[-22,-91]],dark,10);limb(c,[[24,-128],[42,-107+offset],[58,-105+offset]],col,11);disc(c,59,-104+offset,7,blade?'#d8dbd0':'#cda984','#26342f');
 box(c,-6,-149,15,15,'#cda984');poly(c,[[-18,-183],[3,-191],[20,-181],[18,-156],[6,-145],[-13,-154]],blade?'#d8d9cb':'#cda984');
 if(blade){poly(c,[[-20,-174],[-16,-193],[9,-201],[26,-188],[15,-175],[9,-192],[-2,-163],[-10,-186]],'#dadfdc');stroke(c,[[43,-106],[115,-147]],'#d5f6f4',5);}else{poly(c,[[-19,-179],[-17,-191],[3,-196],[22,-184],[7,-184],[-9,-173]],'#303426');box(c,-19,-178,41,6,'#667b55');stroke(c,[[-17,-175],[-36,-164],[-53,-170]],'#667b55',4);box(c,48,-112+offset,49,10,'#1d2b30');box(c,64,-108+offset,12,24,'#374245');if(big){box(c,5,-169,15,6,'#1a241e');}}
 if(p.parry>0){c.strokeStyle='#a5edcf';c.lineWidth=3;c.beginPath();c.arc(17,-98,55,-1.5,1.2);c.stroke();}c.restore();
}
function hud(c,s){const d=s.def,p=s.player;box(c,22,18,412,86,'#07121dec','#4f635f');txt(c,d.hero,38,43,15);txt(c,'ARMURE',38,68,9,'#829b94');box(c,110,58,303,10,'#253a3d');box(c,110,58,303*p.hp/10000,10,p.hp<2500?'#da8b6b':'#b4cda8');txt(c,`${p.ammo}/12  ·  ${p.rockets}/4  ·  ${p.rations} SOINS`,38,89,11,'#d6d2b8');
 box(c,844,18,414,86,'#07121dec','#4f635f');txt(c,d.name,1238,42,d.name.length>26?12:15,'#e9eada','right');box(c,867,59,369,10,'#253a3d');box(c,867,59,369*s.hp.reduce((a,b)=>a+b,0)/s.max.reduce((a,b)=>a+b,0),10,d.accent);txt(c,d.ep+(d.id==='raymass'?` / UNITÉ ${s.unit}–3`:''),1238,88,10,'#97aea8','right');
 box(c,569,18,143,75,'#07121dde','#5b6b5b');txt(c,s.mode==='practice'?'∞':String(Math.ceil(s.timer/60)).padStart(3,'0'),640,63,30,'#e8d5a3','center');
 txt(c,d.stage,640,123,10,'#d0d4c1','center');
 // Tactile target strip is also available; this in-game panel deliberately contains no production metrics.
 box(c,22,139,288,s.hp.length*28+57,'#07131dcf','#314d53');txt(c,'SOUS-SYSTÈMES',36,161,9,'#9dafac');s.hp.forEach((v,i)=>{const y=190+i*28,col=i===s.target?'#e9cf8e':v<=0?'#5e8977':'#a7b5af';txt(c,`${i+1}  ${d.parts[i].name}`,36,y,10,col);box(c,207,y-8,86,5,'#30424b');box(c,207,y-8,86*v/s.max[i],5,col);});
 let targetName=d.parts[s.target].name+' · '+E.reason(s,s.target);txt(c,targetName,640,664,14,'#e8d9b2','center');
 let hint='I : PARADE  ·  R : RECHARGER';if(d.id==='chrysalis')hint=`I : RADAR  ${s.boss.radar?Math.ceil(s.boss.radar/60)+' s':'PRÊT'}`;if(d.id==='grad')hint=`I : EMP ${s.boss.actionCd?Math.ceil(s.boss.actionCd/60)+' s':'PRÊT'}`;if(d.id==='harrier')hint=`K MAINTENU : VERROU ${Math.round(s.boss.lock)} %`;if(d.weapon==='cards')hint=`COST ${Math.ceil(p.cost)} / 100 · R : MAIN SUIVANTE`;
 txt(c,hint,640,688,11,'#a7bfba','center');
 if(p.reload>0){txt(c,'RECHARGEMENT',p.x,p.y-232,10,'#ebd99e','center');box(c,p.x-40,p.y-225,80*(1-p.reload/95),4,'#ebd99e');}
 if(s.launch>0){box(c,500,139,280,45,'#3c2929ee','#d79471');txt(c,'LANCEMENT  '+Math.ceil(s.launch/60)+' s',640,167,14,'#ffd9a0','center');}
 if(s.nuke>0){box(c,380,153,520,58,'#622725ed','#ee9d6d');txt(c,'ALERTE NUCLÉAIRE · '+Math.ceil(s.nuke/60)+' s',640,178,17,'#ffe7bf','center');txt(c,'REJOINDRE LE TERMINAL · MAINTENIR I',640,199,11,'#ffe7bf','center');}
 if(s.notices.length){txt(c,s.notices[s.notices.length-1].text,640,233,12,'#d8dbaa','center');}
}
function draw(c,s,{preview=false,hudVisible=true}={}){c.save();c.setTransform(c.canvas.width/1280,0,0,c.canvas.height/720,0,0);backdrop(c,s);
 for(const cl of s.clouds){c.fillStyle='#9cbe6944';c.fillRect(cl.x-cl.w/2,470,cl.w,128);}
 for(const e of s.events){const hot=e.age>=e.warn,col=hot?'#ed956aaa':'#e9cf8eaa';c.save();c.setLineDash(hot?[]:[12,8]);c.strokeStyle=col;c.lineWidth=hot?10:2;if(e.kind==='beam'||e.kind==='volley'){stroke(c,[[e.from.x,e.from.y],[e.x,e.y]],col,hot?6:2);}else {c.strokeRect(e.kind==='sweep'?0:e.x-e.w/2,582,e.w,14);if(!hot){txt(c,e.kind==='sweep'?'SAUT / PARADE':'IMPACT',e.x,566,10,'#f4d9b8','center');}}c.restore();}
 if(s.def.id==='peacewalker'){box(c,586,498,48,100,'#294951','#9cb7a5');box(c,594,516,31,22,s.nuke?'#dda272':'#7ac5a5');if(s.terminal>0)box(c,586,491,48*s.terminal/45,5,'#edc68a');}
 human(c,s);machine(c,s,preview);
 for(const b of s.bullets){c.save();c.translate(b.x,b.y);c.rotate(Math.atan2(b.vy,b.vx));box(c,-20,-2,b.kind==='rocket'?27:17,b.kind==='rocket'?6:3,b.owner==='enemy'?'#f2a478':b.kind==='slash'?'#b1fff6':'#f9e1a8');if(b.kind==='rocket')box(c,-31,-1,13,3,'#df8355');c.restore();}
 for(const f of s.fx){if(f.kind==='shield'){c.strokeStyle='#de8059';c.lineWidth=3;c.beginPath();c.arc(f.x,f.y,35,0,TAU);c.stroke();}else for(let i=0;i<8;i++){const a=i*.8,rr=(f.kind==='destroy'?60:30)-Math.min(27,f.t);stroke(c,[[f.x+Math.cos(a)*rr,f.y+Math.sin(a)*rr],[f.x+Math.cos(a)*(rr+11),f.y+Math.sin(a)*(rr+11)]],f.kind==='parry'?'#b3fff0':'#e9dba7',3);}}
 if(hudVisible&&!preview)hud(c,s);c.restore();}
root.ArsenalRender={draw,machine,backdrop,txt};
})(globalThis);
