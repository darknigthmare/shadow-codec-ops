/* PASS10 runtime fidelity adapter.
 * Reviewed logical candidate SHA256: 140c4e3bc1fc49455b9278c3ec9910b9288f91dd9420cf027cd2c1d2c83fa0af.
 * Actual ten-source unit QA SHA256: bb03fc48368b1b0434722f9071409dd5b0547a6351dec3e28cf1e4683e18f781.
 * RAW and all previous native entries are immutable; balancing/motions are authored.
 */
(function(root){'use strict';
  const plans={"core__blade_wolf":{"game":"mgr","gamePattern":"Rising.*Revengeance","expectedMap":{"light":"punch","heavy":"heavy","low":"low","throw":"throw","special":"jump","specialDown":"heavy","specialForward":"walk","specialBack":"guard","super":"shoot","utility":"recover"},"moves":{"light":{"name":"Griffe mécanique","kind":"melee","tag":"strike","changed":true,"values":{}},"heavy":{"name":"Coupe dorsale","kind":"melee","tag":"blade","changed":true,"values":{}},"low":{"name":"Balayage","kind":"melee","tag":"strike","changed":false,"values":{}},"throw":{"name":"Bond de déséquilibre","kind":"melee","tag":"strike","changed":false,"values":{}},"special":{"name":"Bond prédateur","kind":"melee","tag":"strike","changed":false,"values":{}},"specialDown":{"name":"Tronçonneuse dorsale","kind":"melee","tag":"blade","changed":true,"values":{}},"specialForward":{"name":"Approche mécanique","kind":"mobility","tag":"movement","changed":true,"values":{"damage":0,"reach":0,"travel":4,"lowProfile":false}},"specialBack":{"name":"Contre lupin","kind":"parry","tag":"counter","changed":false,"values":{}},"super":{"name":"LQ-84i — attaque complète","kind":"melee","tag":"blade","changed":false,"values":{}},"utility":{"name":"Stabiliser la réserve","kind":"recover","tag":"recovery","changed":false,"values":{}}},"visual":{"kind":"quadruped","weapon":"blade","hair":"none","headgear":null,"primary":"#52575b","accent":"#ba332e","material":"metal","pouches":0,"holster":false,"back":null},"weapon":"blade","resource":{},"role":"Griffes, bond et scie dorsale","family":"blade","scope":"Original LQ-84i MGR quadruped; dorsal articulated chainsaw and separate flexible clamp tail. No tail-tip blade, gun, laser, optical cloaking, teleport or projected energy inferred from art. Native body scale is shoulder-to-paw plane, excluding saw and tail; never a humanoid two-foot pivot. Mechanical-status immunity and EMP interaction are bounded authored gameplay, not a measured original interaction table. Les contacts, collisions, jauges, coûts, durées et cadences sont des adaptations du versus, pas des valeurs des jeux originaux."},"core__raiden_mgs4":{"game":"mgs4","gamePattern":"Metal Gear Solid\\s*4\\b|Guns of the Patriots","expectedMap":{"light":"punch","heavy":"heavy","low":"low","throw":"throw","special":"shoot","specialDown":"jump","specialForward":"walk","specialBack":"guard","super":"shoot","utility":"recover"},"moves":{"light":{"name":"Contact de lame","kind":"melee","tag":"blade","changed":false,"values":{}},"heavy":{"name":"Coupe engagée","kind":"melee","tag":"blade","changed":false,"values":{}},"low":{"name":"Coupe basse HF — adaptation","kind":"melee","tag":"blade","changed":true,"values":{}},"throw":{"name":"Projection","kind":"melee","tag":"grapple","changed":false,"values":{}},"special":{"name":"Lame HF — 2014","kind":"melee","tag":"blade","changed":false,"values":{}},"specialDown":{"name":"Coupe aérienne","kind":"melee","tag":"blade","changed":false,"values":{}},"specialForward":{"name":"Approche du cyborg","kind":"mobility","tag":"movement","changed":true,"values":{"damage":0,"reach":0,"travel":4,"lowProfile":false}},"specialBack":{"name":"Interception HF","kind":"parry","tag":"counter","changed":false,"values":{}},"super":{"name":"Protection de Snake","kind":"melee","tag":"blade","changed":false,"values":{}},"utility":{"name":"Stabiliser la réserve","kind":"recover","tag":"recovery","changed":false,"values":{}}},"visual":{"kind":"human","weapon":"blade","outfit":"cyborg","hair":"messy","hairColor":"#cbd1d0","primary":"#b8c0c0","accent":"#30383c","back":null},"weapon":"blade","resource":{},"role":"Lame HF et mouvement MGS4","family":"blade","scope":"Original PS3 silver-gray cyborg, anatomical-right HF sword; no MGR black body/Ripper/Zandatsu transplantation. Contact blade attacks, CQC and visible movement can remain authored; no blade-beam projectile or optical invisibility. Projectile interception is a bounded Versus parry proposal, not certified original sword-deflection timing. Les contacts, collisions, jauges, coûts, durées et cadences sont des adaptations du versus, pas des valeurs des jeux originaux."},"core__skull_mist":{"game":"tpp","gamePattern":"The Phantom Pain","expectedMap":{"light":"punch","heavy":"heavy","low":"low","throw":"throw","special":"shoot","specialDown":"deploy","specialForward":"throw","specialBack":"walk","super":"shoot","utility":"recover"},"moves":{"light":{"name":"Contact rapproché","kind":"melee","tag":"strike","changed":true,"values":{}},"heavy":{"name":"Frappe rapprochée","kind":"melee","tag":"strike","changed":true,"values":{}},"low":{"name":"Balayage","kind":"melee","tag":"strike","changed":false,"values":{}},"throw":{"name":"Projection","kind":"melee","tag":"grapple","changed":false,"values":{}},"special":{"name":"Tir dans la brume","kind":"projectile","tag":"ballistic","changed":true,"values":{"startup":21,"active":1,"recovery":32,"damage":450,"reach":1000,"cost":16,"speed":18,"life":58,"count":1}},"specialDown":{"name":"Position dans la brume","kind":"recover","tag":"recovery","changed":true,"values":{"damage":0,"reach":0,"restore":18,"cost":0}},"specialForward":{"name":"Saisie dans la brume","kind":"melee","tag":"grapple","changed":true,"values":{"level":"throw","travel":0,"reach":76,"damage":800}},"specialBack":{"name":"Écart dans la brume","kind":"mobility","tag":"movement","changed":true,"values":{"damage":0,"reach":0,"travel":-4,"lowProfile":false}},"super":{"name":"Embuscade — rafale adaptée","kind":"projectile","tag":"ballistic","changed":true,"values":{"startup":32,"active":1,"recovery":44,"damage":620,"reach":1050,"count":3,"interval":7,"speed":20,"life":60,"meter":50}},"utility":{"name":"Stabiliser la réserve","kind":"recover","tag":"recovery","changed":false,"values":{}}},"visual":{"kind":"human","gender":"m","weapon":"rifle","hair":"none","primary":"#424b4c","accent":"#59c7d1","back":null},"weapon":"rifle","resource":{},"role":"Fusil et posture de brume","family":"ballistic","scope":"Original masculine Mist appearance has paired cyan optics, angular mouth apparatus and observed dark long rifle. Original first-encounter fog limits leg/material topology; Armor costume/details cannot fill hidden Mist anatomy as fact. Observed rifle silhouette only; exact rifle model and receiver hidden side unverified. Atmospheric fog is separate visual staging, never a damaging mist missile, psychic blast or Armor-type absorption. Movement stays visible/bounded; no teleport or invisibility inferred from a still reference. Les contacts, collisions, jauges, coûts, durées et cadences sont des adaptations du versus, pas des valeurs des jeux originaux."},"core__skull_armor":{"game":"tpp","gamePattern":"The Phantom Pain","expectedMap":{"light":"punch","heavy":"heavy","low":"low","throw":"throw","special":"shoot","specialDown":"deploy","specialForward":"throw","specialBack":"walk","super":"shoot","utility":"recover"},"moves":{"light":{"name":"Contact rapproché","kind":"melee","tag":"strike","changed":true,"values":{}},"heavy":{"name":"Coupe engagée","kind":"melee","tag":"blade","changed":false,"values":{}},"low":{"name":"Balayage","kind":"melee","tag":"strike","changed":false,"values":{}},"throw":{"name":"Projection","kind":"melee","tag":"grapple","changed":false,"values":{}},"special":{"name":"Lame blindée","kind":"melee","tag":"blade","changed":false,"values":{}},"specialDown":{"name":"Durcissement métallique","kind":"buff","tag":"armor","changed":true,"values":{"damage":0,"reach":0,"buff":"armor","duration":150,"hits":2},"buff":"armor"},"specialForward":{"name":"Saisie blindée","kind":"melee","tag":"grapple","changed":true,"values":{"level":"throw","reach":76,"travel":0}},"specialBack":{"name":"Écart blindé","kind":"mobility","tag":"movement","changed":true,"values":{"damage":0,"reach":0,"travel":-4,"lowProfile":false}},"super":{"name":"Percée blindée","kind":"melee","tag":"blade","changed":false,"values":{}},"utility":{"name":"Stabiliser la réserve","kind":"recover","tag":"recovery","changed":false,"values":{}}},"visual":{"kind":"human","gender":"m","weapon":"blade","hair":"none","primary":"#919792","accent":"#454d47","back":null},"weapon":"blade","resource":{},"role":"Machette et durcissement borné","family":"blade","scope":"Original male Armor selected appearance: gray mechanical outfit, metallic hardening, narrow machete in anatomical-right hand. Only the machete is directly visible for selected outfit; no rifle, grenade, laser or thrown crystal. FOB original capture and player captures have qualified coating/material topology and distant/night feet detail. Hardening is a bounded authored guard/absorption, never an invincible barrier or a Mist/Sniper power union. Les contacts, collisions, jauges, coûts, durées et cadences sont des adaptations du versus, pas des valeurs des jeux originaux."},"core__skull_sniper":{"game":"tpp","gamePattern":"The Phantom Pain","expectedMap":{"light":"punch","heavy":"heavy","low":"low","throw":"throw","special":"shoot","specialDown":"deploy","specialForward":"throw","specialBack":"walk","super":"shoot","utility":"recover"},"moves":{"light":{"name":"Jab","kind":"melee","tag":"strike","changed":false,"values":{}},"heavy":{"name":"Contact au fusil","kind":"melee","tag":"strike","changed":true,"values":{}},"low":{"name":"Balayage","kind":"melee","tag":"strike","changed":false,"values":{}},"throw":{"name":"Projection","kind":"melee","tag":"grapple","changed":false,"values":{}},"special":{"name":"Tir parasite","kind":"projectile","tag":"precision","changed":false,"values":{"speed":34,"life":48,"telegraph":true}},"specialDown":{"name":"Camouflage parasite — préparation","kind":"buff","tag":"stealth","changed":true,"values":{"damage":0,"reach":0,"buff":"cloak","duration":150,"cooldown":300,"cost":0},"buff":"cloak"},"specialForward":{"name":"Saisie rapprochée","kind":"melee","tag":"grapple","changed":true,"values":{"level":"throw","reach":76,"travel":0,"cost":0,"damage":800}},"specialBack":{"name":"Écart de tireur","kind":"mobility","tag":"movement","changed":true,"values":{"damage":0,"reach":0,"travel":-4,"lowProfile":false,"cost":0}},"super":{"name":"Visée des Skulls","kind":"projectile","tag":"precision","changed":true,"values":{"count":1,"telegraph":true,"speed":36,"life":44}},"utility":{"name":"Reprendre position","kind":"recover","tag":"recovery","changed":true,"values":{"damage":0,"reach":0,"restore":5}}},"visual":{"kind":"human","gender":"f","weapon":"rifle","hair":"none","primary":"#545c56","accent":"#c85737","back":null},"weapon":"rifle","resource":{"label":"MUNITIONS — VERSUS"},"role":"Précision et camouflage féminin","family":"sniper","scope":"Canonical camouflage form is female Skull Sniper, bald, anatomical-right red/orange optic, bare left eye and actual long rifle. Raw masculine visual fallback and completion44 camo preset are not canonical evidence or automatic aliases. C rifle recoil binds conventional precision bullets; no rail/laser/mist grenade or unknown named receiver. Heavy is the producer-observed held-rifle shove/jab, not a certified stock strike. Camouflage is a separately bounded Versus effect, source atlas bodies remain opaque/complete and collision persists. Les contacts, collisions, jauges, coûts, durées et cadences sont des adaptations du versus, pas des valeurs des jeux originaux."},"core__snake_mpo":{"game":"mpo","gamePattern":"Portable Ops(?!\\s*Plus)","expectedMap":{"light":"punch","heavy":"heavy","low":"low","throw":"throw","special":"shoot","specialDown":"low","specialForward":"throw","specialBack":"guard","super":"heavy","utility":"reload"},"moves":{"light":{"name":"Jab","kind":"melee","tag":"strike","changed":false,"values":{}},"heavy":{"name":"Frappe engagée","kind":"melee","tag":"strike","changed":false,"values":{}},"low":{"name":"Balayage","kind":"melee","tag":"strike","changed":false,"values":{}},"throw":{"name":"Projection","kind":"melee","tag":"grapple","changed":false,"values":{}},"special":{"name":"MK22 de San Hieronymo","kind":"projectile","tag":"tranq","changed":false,"values":{"speed":15,"life":68}},"specialDown":{"name":"Balayage FOX","kind":"melee","tag":"strike","changed":true,"values":{"level":"low","reach":114,"cost":0}},"specialForward":{"name":"CQC de terrain","kind":"melee","tag":"grapple","changed":false,"values":{}},"specialBack":{"name":"Garde FOX — adaptation","kind":"parry","tag":"counter","changed":true,"values":{"startup":5,"active":10,"recovery":29,"damage":400,"reach":120,"cost":0,"parryMode":"melee","level":"mid"}},"super":{"name":"Évasion FOX","kind":"melee","tag":"strike","changed":false,"values":{}},"utility":{"name":"Recharger","kind":"reload","tag":"reload","changed":false,"values":{}}},"visual":{"kind":"human","weapon":"pistol","hair":"short","hairColor":"#584339","primary":"#556575","accent":"#87795d","back":null},"weapon":"pistol","resource":{"label":"MUNITIONS — VERSUS"},"role":"MK22 et CQC PSP","family":"cqc","scope":"Original PSP padded blue-gray uniform, olive/brown suspenders and two belt pouches, right eyepatch, organic arms. IA page12 labelled Naked Snake final model provides body; early-sketch page4 is not final costume evidence. Original MPO inventory labels the MK22, but its 130x88 icon cannot certify fine 3D topology or suppressor. Final native C weapon and action map pending; no weapon-specific anchor or grenade claim before closure. No PW Battle Dress, Venom hardware or optical cloak on this incarnation. Les contacts, collisions, jauges, coûts, durées et cadences sont des adaptations du versus, pas des valeurs des jeux originaux."},"core__snake_pw":{"game":"pw","gamePattern":"Peace Walker","expectedMap":{"light":"punch","heavy":"heavy","low":"low","throw":"throw","special":"shoot","specialDown":"low","specialForward":"throw","specialBack":"guard","super":"heavy","utility":"reload"},"moves":{"light":{"name":"Jab","kind":"melee","tag":"strike","changed":false,"values":{}},"heavy":{"name":"Frappe engagée","kind":"melee","tag":"strike","changed":false,"values":{}},"low":{"name":"Balayage","kind":"melee","tag":"strike","changed":false,"values":{}},"throw":{"name":"Projection","kind":"melee","tag":"grapple","changed":false,"values":{}},"special":{"name":"M16 MSF — tir adapté","kind":"projectile","tag":"ballistic","changed":true,"values":{"startup":15,"active":1,"recovery":28,"damage":480,"reach":1040,"cost":1,"level":"mid","speed":19,"life":55,"count":1}},"specialDown":{"name":"Balayage MSF","kind":"melee","tag":"strike","changed":true,"values":{"level":"low","reach":114,"cost":0}},"specialForward":{"name":"CQC successif","kind":"melee","tag":"grapple","changed":false,"values":{}},"specialBack":{"name":"Garde MSF","kind":"parry","tag":"counter","changed":true,"values":{"startup":5,"active":10,"recovery":29,"damage":400,"reach":120,"parryMode":"melee","cost":0}},"super":{"name":"Militaires Sans Frontières","kind":"melee","tag":"strike","changed":false,"values":{}},"utility":{"name":"Recharger","kind":"reload","tag":"reload","changed":false,"values":{}}},"visual":{"kind":"human","weapon":"rifle","hair":"short","hairColor":"#544236","primary":"#515c5a","accent":"#8c7150","back":null},"weapon":"rifle","resource":{"label":"MUNITIONS — VERSUS"},"role":"M16 Battle Dress et CQC","family":"cqc","scope":"Root-selected original PSP Battle Dress with M16-pattern rifle, right eyepatch and both natural arms. Closed native contract: special rifle shoot, specialDown low CQC, throw/specialForward grab, specialBack guard, utility rifle reload. No tranquilizer/drowsy special, grenade emitter, optical cloak or automatic Fulton extraction for this selected native loadout. M16-pattern fine receiver topology is qualified; magazine/ammo count, fire speed and damage are authored. Les contacts, collisions, jauges, coûts, durées et cadences sont des adaptations du versus, pas des valeurs des jeux originaux."},"completion__big_boss_epilogue":{"game":"mgs4","gamePattern":"Metal Gear Solid\\s*4\\b|Guns of the Patriots","expectedMap":{"light":"punch","heavy":"heavy","low":"low","throw":"throw","special":"charge","specialDown":"low","specialForward":"throw","specialBack":"guard","super":"charge","utility":"reload"},"moves":{"light":{"name":"Jab","kind":"melee","tag":"strike","changed":false,"values":{}},"heavy":{"name":"Frappe engagée","kind":"melee","tag":"strike","changed":false,"values":{}},"low":{"name":"Balayage","kind":"melee","tag":"strike","changed":false,"values":{}},"throw":{"name":"Projection","kind":"melee","tag":"grapple","changed":false,"values":{}},"special":{"name":"Contact du vétéran — adaptation","kind":"melee","tag":"strike","changed":true,"values":{"damage":730,"reach":100,"travel":3,"cost":16}},"specialDown":{"name":"Balayage final","kind":"melee","tag":"strike","changed":false,"values":{}},"specialForward":{"name":"Saisie du mentor","kind":"melee","tag":"grapple","changed":false,"values":{}},"specialBack":{"name":"Contre fatigué","kind":"parry","tag":"counter","changed":false,"values":{}},"super":{"name":"Dernière leçon","kind":"melee","tag":"strike","changed":false,"values":{}},"utility":{"name":"Reprendre son souffle","kind":"recover","tag":"recovery","changed":false,"values":{}}},"visual":{"kind":"human","weapon":"fists","hair":"gray","hairColor":"#c2bbb0","headgear":null,"primary":"#766652","accent":"#b3a794","back":null},"weapon":"fists","resource":{},"role":"Mains nues et endurance du vétéran","family":"cqc","scope":"Final elderly MGS4 brown coat/trousers/low shoes, gray hair/beard, anatomical-right missing patched eye. Hands/CQC/cigar only; no unproven pistol/rifle, grenade, fiery cigar attack, Venom prosthesis or horn. Reduced endurance and recovery are authored; no rejuvenation or supernatural healing. Final native action map pending; use actual hand contact/guard/recover groups, not a gun because a group is named shoot. Les contacts, collisions, jauges, coûts, durées et cadences sont des adaptations du versus, pas des valeurs des jeux originaux."},"core__venus":{"game":"acid2","gamePattern":"Ac!?d\\s*2","expectedMap":{"light":"punch","heavy":"heavy","low":"low","throw":"throw","special":"shoot","specialDown":"shoot","specialForward":"reload","specialBack":"jump","super":"shoot","utility":"recover"},"moves":{"light":{"name":"Jab","kind":"melee","tag":"strike","changed":false,"values":{}},"heavy":{"name":"Frappe engagée","kind":"melee","tag":"strike","changed":false,"values":{}},"low":{"name":"Balayage","kind":"melee","tag":"strike","changed":false,"values":{}},"throw":{"name":"Projection","kind":"melee","tag":"grapple","changed":false,"values":{}},"special":{"name":"Carte d’attaque — tir adapté","kind":"projectile","tag":"ballistic","changed":true,"values":{"speed":18,"life":64,"count":1}},"specialDown":{"name":"Carte de tir — variante adaptée","kind":"projectile","tag":"ballistic","changed":true,"values":{"count":1,"speed":18,"life":64,"damage":600}},"specialForward":{"name":"Préparer une carte","kind":"recover","tag":"recovery","changed":true,"values":{"damage":0,"reach":0,"cost":0,"restore":16}},"specialBack":{"name":"Carte de mobilité","kind":"mobility","tag":"movement","changed":true,"values":{"damage":0,"reach":0,"travel":-4,"lowProfile":false,"launchSelf":-8}},"super":{"name":"Main de Vénus — rafale adaptée","kind":"projectile","tag":"ballistic","changed":true,"values":{"count":4,"interval":6,"speed":21,"life":62}},"utility":{"name":"Réduire le COST","kind":"recover","tag":"recovery","changed":false,"values":{}}},"visual":{"kind":"human","gender":"f","weapon":"rifle","hair":"long","hairColor":"#d4c4ab","primary":"#b93835","accent":"#272727","back":null},"weapon":"rifle","resource":{"label":"COST — VERSUS"},"role":"Cartes COST et arme conventionnelle","family":"card","scope":"Original PSP AC!D2 Venus: pale blond shoulder hair, red/black tactical costume, long black gloves and red high boots. Original Konami-copyright promotional art actually shows a conventional long firearm; fine model/attachment topology qualified. Cards represent turn/COST decisions adapted to real-time Versus, never magical physical card missiles or a SaintLogic sword. Closed delivery uses shoot for special/specialDown/super, reload-named group for card/equipment gestures, jump for specialBack. Source gesture variations are disclosed; absence of a card in one startup frame cannot be hidden by fake overlays. Les contacts, collisions, jauges, coûts, durées et cadences sont des adaptations du versus, pas des valeurs des jeux originaux."},"core__venom":{"game":"tpp","gamePattern":"The Phantom Pain","expectedMap":{"light":"punch","heavy":"heavy","low":"low","throw":"throw","special":"shoot","specialDown":"heavy","specialForward":"throw","specialBack":"heavy","super":"heavy","utility":"recover"},"moves":{"light":{"name":"Jab","kind":"melee","tag":"strike","changed":false,"values":{}},"heavy":{"name":"Frappe engagée","kind":"melee","tag":"strike","changed":false,"values":{}},"low":{"name":"Balayage","kind":"melee","tag":"strike","changed":false,"values":{}},"throw":{"name":"Projection","kind":"melee","tag":"grapple","changed":false,"values":{}},"special":{"name":"Pistolet de Venom — tir adapté","kind":"projectile","tag":"ballistic","changed":true,"values":{"count":1,"damage":420,"speed":18,"life":60}},"specialDown":{"name":"Contact du bras bionique","kind":"melee","tag":"strike","changed":true,"values":{"reach":128}},"specialForward":{"name":"CQC : bras bionique","kind":"melee","tag":"grapple","changed":false,"values":{}},"specialBack":{"name":"Frappe du bras bionique — adaptation","kind":"melee","tag":"strike","changed":true,"values":{"startup":18,"active":5,"recovery":27,"damage":650,"reach":128,"cost":15,"level":"mid"}},"super":{"name":"Diamond Dogs — assaut","kind":"melee","tag":"strike","changed":false,"values":{}},"utility":{"name":"Stabiliser la réserve","kind":"recover","tag":"recovery","changed":false,"values":{}}},"visual":{"kind":"human","weapon":"pistol","hair":"short","hairColor":"#564036","primary":"#6c7151","accent":"#963f33","back":null},"weapon":"pistol","resource":{},"role":"Pistolet et bras bionique attaché","family":"cqc","scope":"Final original TPP Steam capture: anatomical-left red attached prosthesis supports pistol, right eyepatch, horn on right forehead. Only visible selected pistol/default attached red arm; precise gun model and WU tranquilizer label require additional loadout evidence. Rocket Punch and Stun Arm upgrades are not implied by every red arm; exclude them from default source clone until selected upgrade is attested. CQC with attached bionic left arm stays; do not alter RAW354 or retrofit other Snake incarnations. Les contacts, collisions, jauges, coûts, durées et cadences sont des adaptations du versus, pas des valeurs des jeux originaux."}};
  const reviewedUIDs=Object.freeze(Object.keys(plans));
  const slots=Object.freeze(['light','heavy','low','throw','special','specialDown','specialForward','specialBack','super','utility']);
  const incompatible=Object.freeze(['speed','life','height','count','interval','fuse','radius','vy','gravity','homing','bounces','returnAt','status','potency','buff','target','blink','selfDamage','launchSelf','projectileOrigin','groundObjectOrigin','projectileOverride','travel','lowProfile','duration','arm','maxTraps','hp','remoteOnly','launch','requiresStagger','restoreEnergy','restoreOnParry','heal','telegraph','parryMode','disarm','pass9Wire','restore','hits','confirmExtra','cancelInto']);
  const clone=v=>JSON.parse(JSON.stringify(v));
  const hash=s=>typeof s==='string'&&/^[a-f0-9]{64}$/.test(s);
  const finite=Number.isFinite;
  const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
  const finishSlots=Object.freeze(['special','specialDown','specialForward','throw']);
  let applied=new Map();
  function fail(message){throw Error('PASS10 source contract: '+message);}
  function inside(point,polygon){
    if(!Array.isArray(polygon)||polygon.length<3)return false;
    let yes=false;
    for(let i=0,j=polygon.length-1;i<polygon.length;j=i++){
      const a=polygon[j],b=polygon[i];
      if(!Array.isArray(a)||!Array.isArray(b)||a.length!==2||b.length!==2||!a.every(finite)||!b.every(finite))return false;
      const cross=(point[0]-a[0])*(b[1]-a[1])-(point[1]-a[1])*(b[0]-a[0]);
      if(Math.abs(cross)<1e-7&&point[0]>=Math.min(a[0],b[0])-1e-7&&point[0]<=Math.max(a[0],b[0])+1e-7&&point[1]>=Math.min(a[1],b[1])-1e-7&&point[1]<=Math.max(a[1],b[1])+1e-7)return true;
      if((a[1]>point[1])!==(b[1]>point[1])&&point[0]<(b[0]-a[0])*(point[1]-a[1])/(b[1]-a[1])+a[0])yes=!yes;
    }
    return yes;
  }
  function origins(entry,marks,action,pointKind='native-visible-firearm-muzzle'){
    if(!entry||entry.mirror!==false||!marks||!action||!finite(entry.displayHeight)||entry.displayHeight<=0)fail('missing origin entry/marks '+action);
    const out={};
    for(const [side,face]of [['right',1],['left',-1]]){
      const mark=marks[side],actions=entry.facing===face?entry.actions:entry.oppositeActions;
      const frame=mark&&actions?.[action]?.frames?.[mark.frame];
      if(!frame||mark.action!==action||mark.pointKind!==pointKind||mark.physicallyViewed!==true||mark.confirmedByRoot!==true||
        !finite(mark.sourcePixelAlpha)||mark.sourcePixelAlpha<=80||mark.sourcePixelAlpha>255||!Number.isInteger(mark.frame)||
        entry.phaseMap?.[action]?.active?.[0]!==mark.frame||mark.file!==frame.file||!hash(mark.sha256)||mark.sha256!==frame.sha256||
        !same(mark.rect,frame.rect)||!same(mark.pivot,frame.pivot)||mark.engineBodyScale!==1.12||
        !finite(mark.sourceFrameHeight)||mark.sourceFrameHeight<=0||entry.sourceFrameHeights?.[frame.file]!==mark.sourceFrameHeight||
        !Array.isArray(mark.point)||mark.point.length!==2||!mark.point.every(finite)||
        !Array.isArray(frame.rect)||frame.rect.length!==4||!frame.rect.every(finite)||frame.rect[2]<=0||frame.rect[3]<=0||
        !Array.isArray(frame.pivot)||frame.pivot.length!==2||!frame.pivot.every(finite))fail('invalid typed origin '+entry.uid+'/'+action+'/'+side);
      const [x,y,w,h]=frame.rect,[sx,sy]=mark.point;
      if(sx<x||sx>=x+w||sy<y||sy>=y+h)fail('origin outside source crop '+entry.uid+'/'+side);
      const local=[(sx-x)/w,(sy-y)/h],contours=frame.clipPolygons||(frame.clipPolygon?[frame.clipPolygon]:null);
      if(contours&&(!Array.isArray(contours)||!contours.some(p=>inside(local,p))))fail('origin outside source contour '+entry.uid+'/'+side);
      const scale=entry.displayHeight/mark.sourceFrameHeight*1.12;
      const forward=(sx-(x+w*frame.pivot[0]))*face*scale,height=((y+h*frame.pivot[1])-sy)*scale;
      if(!finite(forward)||!finite(height)||forward<0||forward>220||height<=0||height>330)fail('origin outside engine geometry '+entry.uid+'/'+side);
      out[face]={forward,height};
    }
    return out;
  }
  function semanticAllows(move,semantic){
    if(move.kind==='projectile')return semantic==='firearm';
    if(move.kind==='melee')return semantic==='contact';
    if(move.kind==='mobility')return semantic==='movement';
    if(move.kind==='parry')return semantic==='defense';
    if(move.kind==='reload')return semantic==='reload';
    if(move.kind==='recover')return ['recover','preparation'].includes(semantic);
    if(move.kind==='buff')return move.buff==='armor'?semantic==='hardening':move.buff==='cloak'?semantic==='camouflage':false;
    return false;
  }
  function validateFrame(frame,entry,pins){
    if(!frame||!hash(frame.sha256)||pins[frame.file]!==frame.sha256||
      !Array.isArray(frame.rect)||frame.rect.length!==4||!frame.rect.every(finite)||frame.rect[2]<=0||frame.rect[3]<=0||
      !Array.isArray(frame.pivot)||frame.pivot.length!==2||!frame.pivot.every(v=>finite(v)&&v>=0&&v<=1)||
      !finite(entry.sourceFrameHeights?.[frame.file])||entry.sourceFrameHeights[frame.file]<=0)fail('invalid native frame '+entry.uid);
  }
  function validateEntry(uid,entry,contract,rawMoves){
    const plan=plans[uid];
    if(!entry||entry.uid!==uid||entry.mirror!==false||![-1,1].includes(entry.facing)||
      !finite(entry.displayHeight)||entry.displayHeight<=0||!entry.actions||!entry.oppositeActions)fail('missing exact entry '+uid);
    if(!contract||contract.uid!==uid||contract.canonicalGameGroup!==plan.game||contract.approved!==true||contract.confirmedByRoot!==true||
      contract.reviewedNativeSources!==6||contract.originalReferencePhysicallyViewed!==true||!hash(contract.rootReviewSHA256)||
      typeof contract.game!=='string'||entry.game!==contract.game||!new RegExp(plan.gamePattern,'i').test(entry.game))fail('unclosed Root native/game contract '+uid);
    if(!same(entry.actionMap,contract.actionMap))fail('native map differs from Root contract '+uid);
    if(!contract.sourceFiles||Object.keys(contract.sourceFiles).length!==6||!Object.values(contract.sourceFiles).every(hash)||new Set(Object.values(contract.sourceFiles)).size!==6||
      !Object.keys(contract.sourceFiles).every(file=>new RegExp('^assets/combat-sprites/'+uid+'/[abc]-(?:left|right)-v[1-9][0-9]*\\.png$').test(file)))fail('six independent native source pins required '+uid);
    const used=new Set();
    for(const [slot,move]of Object.entries(plan.moves)){
      const action=entry.actionMap?.[slot];
      if(!action||plan.expectedMap[slot]&&action!==plan.expectedMap[slot]||!semanticAllows(move,contract.actionSemantics?.[action]))fail('native action/type mismatch '+uid+'/'+slot);
      if(move.kind==='projectile'){
        const capability=contract.weaponCapabilities?.[action],status=move.changed?move.values?.status:rawMoves[slot].status;
        if(!capability||!hash(capability.sourceEvidenceSHA256)||!capability.tags?.includes(move.tag)||status&&!capability.statuses?.includes(status))fail('unproved selected weapon capability '+uid+'/'+slot);
      }
      for(const actions of [entry.actions,entry.oppositeActions]){
        const group=actions[action],frames=group?.frames,phase=entry.phaseMap?.[action];
        if(!Array.isArray(frames)||!frames.length||!finite(group.fps)||group.fps<=0)fail('missing direction/phase '+uid+'/'+action);
        if(!phase&&(group.loop!==true||['melee','projectile'].includes(move.kind)))fail('missing direction/phase '+uid+'/'+action);
        if(phase)for(const key of ['startup','active','recovery'])if(!Array.isArray(phase[key])||!phase[key].length||!phase[key].every(i=>Number.isInteger(i)&&i>=0&&i<frames.length))fail('invalid native phase '+uid+'/'+action+'/'+key);
        for(const frame of frames){validateFrame(frame,entry,contract.sourceFiles);used.add(frame.file);}
      }
    }
    // All A/B/C source groups and both facings must be present, not merely one gun pose.
    for(const actions of [entry.actions,entry.oppositeActions])for(const action of Object.values(actions))for(const frame of action.frames||[]){validateFrame(frame,entry,contract.sourceFiles);used.add(frame.file);}
    if(used.size!==6)fail('incomplete six-source catalog '+uid);
  }
  function validateRaw(uid,fighter){
    if(!fighter||fighter.uid!==uid||!fighter.combat?.moves||!fighter.combat.resource||!fighter.combat.passive)fail('missing RAW combat '+uid);
    for(const slot of slots){const m=fighter.combat.moves[slot];
      if(!m||m.id!==uid+'::'+slot||m.slot!==slot||!['startup','active','recovery','damage','reach','cost','meter'].every(k=>finite(m[k]))||m.active<=0)fail('invalid RAW move '+uid+'/'+slot);
    }
  }
  function authoredMove(old,definition){
    if(!definition.changed)return {...old};
    const value={...old};for(const key of incompatible)delete value[key];
    const kind=definition.kind,grapple=definition.tag==='grapple';
    const defaults=kind==='mobility'?{active:12,damage:0,reach:0,level:'mid',meter:0,lowProfile:false}:
      kind==='recover'?{active:1,damage:0,reach:0,cost:0,meter:0,level:'mid'}:
      kind==='buff'?{active:1,damage:0,reach:0,meter:0,level:'mid'}:
      kind==='projectile'?{active:1,speed:18,life:64,count:1,level:'mid'}:
      kind==='parry'?{startup:5,active:10,recovery:29,damage:400,reach:120,parryMode:'melee',level:'mid'}:
      old.kind!=='melee'?{startup:grapple?8:12,active:grapple?2:4,recovery:grapple?34:24,damage:grapple?800:550,reach:grapple?76:96,level:grapple?'throw':'mid'}:{};
    return {...value,...defaults,name:definition.name,kind,tag:definition.tag,...definition.values,
      counterplay:definition.counterplay||'Adaptation du versus : préparation et sortie visibles, garde/saut/espacement adaptés au geste ; aucune invincibilité ou arme supplémentaire.'};
  }
  function apply(fighters,catalog=root.CQC_COMBAT_SPRITE_CATALOG,originDocument=root.CQC_PASS10_NATIVE_ORIGINS,contractDocument=root.CQC_PASS10_SOURCE_CONTRACTS){
    if(!Array.isArray(fighters))fail('fighters must be an array');
    const contracts=contractDocument?.entries||contractDocument,anchors=originDocument?.entries||originDocument;
    const staged=[],bindings=new Map();
    // Complete validation first. No fighter/profile clones or registry replacements occur in this phase.
    for(const uid of reviewedUIDs){
      const indices=[];fighters.forEach((f,i)=>{if(f?.uid===uid)indices.push(i);});
      if(indices.length!==1)fail('one exact fighter required '+uid);
      const index=indices[0],entry=catalog?.entries?.[uid],contract=contracts?.[uid];
      validateRaw(uid,fighters[index]);validateEntry(uid,entry,contract,fighters[index].combat.moves);
      const points={};
      for(const [slot,definition]of Object.entries(plans[uid].moves))if(definition.kind==='projectile'){
        const action=entry.actionMap[slot];
        points[slot]=origins(entry,anchors?.[uid]?.[action],action);
      }
      bindings.set(uid,{entry,contract,points});staged.push({uid,index});
    }
    const replacements=staged.map(({uid,index})=>{
      const fighter=clone(fighters[index]),combat=fighter.combat,plan=plans[uid],binding=bindings.get(uid);
      for(const slot of slots){combat.moves[slot]=authoredMove(combat.moves[slot],plan.moves[slot]);
        if(plan.moves[slot].kind==='projectile'){
          delete combat.moves[slot].height;combat.moves[slot].projectileOrigin=clone(binding.points[slot]);
        }
      }
      fighter.visual={...fighter.visual,...plan.visual};combat.weapon=plan.weapon;combat.role=plan.role;fighter.role=plan.role;
      combat.resource={...combat.resource,...plan.resource};
      combat.scope=plan.scope;combat.basis=plan.scope;combat.evidence='adaptation';combat.sourceFidelityStatus='closest_supported';combat.absolute1to1Certified=false;
      combat.cqcPass10={uid,game:plan.game,applied:true,rootReviewSHA256:binding.contract.rootReviewSHA256};
      combat.counterplay=['special','specialDown','specialForward','specialBack'].map(slot=>combat.moves[slot].counterplay);
      combat.sources=[...new Set([...(combat.sources||[]),'original-incarnation-source-contract-pass10'])];
      return {uid,index,fighter};
    });
    for(const {index,fighter}of replacements)fighters[index]=fighter;
    applied=new Map(replacements.map(({uid,fighter})=>[uid,{combat:fighter.combat,entry:bindings.get(uid).entry}]));
    return replacements.map(({uid})=>uid);
  }
  function phasesFor(move){
    return move.kind==='projectile'?['prepare','release','confirm','pose']:
      move.kind==='mobility'?['prepare','move','settle','pose']:
      move.kind==='recover'||move.kind==='reload'?['prepare','rest','settle','pose']:
      move.kind==='buff'||move.kind==='parry'?['prepare','brace','settle','pose']:
      ['prepare','contact','confirm','pose'];
  }
  function familyFor(uid,move){return move.kind==='projectile'?(uid==='core__skull_sniper'?'sniper':'ballistic'):
    ['recover','reload','mobility','buff','parry'].includes(move.kind)?'tactical':move.tag==='blade'?'blade':'cqc';}
  function applyFinishers(catalog,fighters=[]){
    if(!catalog?.profiles)fail('missing finisher catalog');
    const staged=[];
    for(const uid of reviewedUIDs){
      const matches=fighters.filter(f=>f.uid===uid),old=catalog.profiles[uid];
      if(matches.length!==1||!applied.has(uid)||matches[0].combat?.cqcPass10?.applied!==true||!old||!Array.isArray(old.finishers)||old.finishers.length!==4)fail('unapplied finisher source '+uid);
      old.finishers.forEach((fin,index)=>{if(fin.id!==uid+'::finisher'+(index+1)||fin.slot!==['neutral','down','forward','back'][index])fail('cross-UID finisher '+uid);});
      staged.push({uid,old,fighter:matches[0]});
    }
    const replacements=staged.map(({uid,old,fighter})=>{
      const profile=clone(old);profile.basis=fighter.combat.scope;profile.evidence='adaptation';profile.visual=clone(fighter.visual);profile.family=plans[uid].family;
      profile.finishers=profile.finishers.map((fin,index)=>{
        const slot=finishSlots[index],move=fighter.combat.moves[slot];
        return {...fin,name:move.name+' — conclusion adaptée',family:familyFor(uid,move),canonical:false,evidence:'adaptation',
          description:'Conclusion du versus à partir du geste natif '+move.name+'. Chorégraphie créée, sans nouvelle arme, extraction automatique ni effet magique.',
          loreBasis:fighter.combat.scope,sourceMoves:[move.name],phases:phasesFor(move),cqcPass10:{uid,slot,kind:move.kind}};
      });return {uid,profile};
    });
    for(const {uid,profile}of replacements)catalog.profiles[uid]=profile;
    catalog.familyCounts=Object.values(catalog.profiles).reduce((counts,profile)=>{counts[profile.family]=(counts[profile.family]||0)+1;return counts;},{});
    return replacements.map(({uid})=>uid);
  }
  function finisherPose(uid,fin,phase,pose={},t=0){
    if(!applied.has(uid)||fin?.id!==uid+'::finisher'+(['neutral','down','forward','back'].indexOf(fin?.slot)+1)||
      fin?.cqcPass10?.uid!==uid||!finishSlots.includes(fin.cqcPass10.slot)||!fin.phases?.includes(phase))return pose;
    const normalized=finite(t)?Math.max(0,Math.min(1,t)):0,index=fin.phases.indexOf(phase),progress=Math.max(0,Math.min(1,normalized*fin.phases.length-index));
    const attackPhase=index===0?'startup':index>=2?'recovery':'active';
    const offensive=['melee','projectile'].includes(fin.cqcPass10.kind);
    const entry=applied.get(uid).entry,action=entry.actionMap[fin.cqcPass10.slot];
    // Unphased native gait loops use the real source FPS and finisher clock.
    // Never assign invented contact phases to a movement or resting loop.
    if(!entry.phaseMap?.[action]&&!offensive&&entry.actions[action]?.loop===true){
      const actionTime=normalized*(finite(fin.duration)&&fin.duration>0?fin.duration/60:0);
      return {...pose,hit:false,ko:false,guard:false,walk:false,attack:false,moveSlot:fin.cqcPass10.slot,
        animationActive:true,attackPhase:null,phaseProgress:0,actionTime,attackTime:actionTime};
    }
    return {...pose,hit:false,ko:false,guard:false,walk:false,attack:offensive&&attackPhase==='active',moveSlot:fin.cqcPass10.slot,
      animationActive:true,attackPhase,phaseProgress:progress,actionTime:0,attackTime:0};
  }
  const api={apply,origins,applyFinishers,finisherPose,reviewedUIDs,slots,sourceStatus:'closest_supported',absolute1to1Certified:false,
    hasSourceFinisher:uid=>applied.has(uid),cloakAlpha:uid=>applied.has(uid)?(uid==='core__skull_sniper'?.55:1):null,
    status:()=>({candidateOnly:false,appliedUIDs:[...applied.keys()],requiredUIDs:[...reviewedUIDs],requiresAllClosedRootContracts:true,requiresTypedBilateralOrigins:true})};
  root.CQC_PASS10_COMBAT_FIDELITY=api;if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
