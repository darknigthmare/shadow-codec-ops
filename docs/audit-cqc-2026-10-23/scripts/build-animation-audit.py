"""Build actor-specific production sheets from the observed CQC runtime snapshot.

The descriptions are proposed CQC storyboards, not claims of extracted Konami motion.
This script only writes audit documents, JSON and CSV.
"""
from pathlib import Path
import argparse, collections, csv, json, re

P=argparse.ArgumentParser()
P.add_argument('--runtime',default='/tmp/cqc-runtime-probe.json')
P.add_argument('--detailed',default='/tmp/cqc-runtime-detailed.json')
P.add_argument('--catalog',default='/tmp/cqc-animation-catalog.json')
P.add_argument('--resolved',default='/tmp/cqc-sprite-routing.json')
args=P.parse_args()
ROOT=Path(__file__).resolve().parents[3]
OUT=ROOT/'docs/audit-cqc-2026-10-23'
DATA=OUT/'data'; SHEETS=OUT/'animations'
DATA.mkdir(exist_ok=True);SHEETS.mkdir(exist_ok=True)
runtime=json.loads(Path(args.runtime).read_text())
detailed=json.loads(Path(args.detailed).read_text())
catalog=json.loads(Path(args.catalog).read_text())
native={x['uid']:x for x in catalog['entries']}
fighters=runtime['fighters']; finishers=runtime['finishers']['profiles']
resolved=json.loads(Path(args.resolved).read_text()) if Path(args.resolved).exists() else {}
if isinstance(resolved,list):resolved={x['uid']:x for x in resolved}
SHA='ba4e30a09e9e95727b75a665e7b6ab07d9941aea'
BASE=f'https://github.com/darknigthmare/shadow-codec-ops/blob/{SHA}/'
SLOTS=['light','heavy','low','throw','special','specialDown','specialForward','specialBack','super','utility']

# Bespoke direction for the game's authored archetypes. All remain production proposals.
SIGNATURE={
'soldier':('appui militaire stable, arme maintenue dans l’axe et regard vers la menace','pas courts, crosse/équipement conservés près du torse','retour en couverture de l’arme après le coup'),
'pistol':('main forte et main de soutien identifiées sur le pistolet, coudes contenus','pas prudents sans inverser l’étui ni la main forte','recul du poignet puis stabilisation du canon'),
'analyst':('outil de lecture ou de communication montré par le profil, attitude d’observation','déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire','regard vers l’outil puis retour vers l’adversaire'),
'civilian':('posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut','pas hésitants mais lisibles, en conservant l’âge et la stature','réaction humaine puis reprise d’appui ; combat explicitement simulé'),
'infiltrator':('garde compacte de l’infiltrateur, arme et étuis proches du corps','déroulé de pied discret, bassin bas, freinage avant visée','replacement rapide de la main libre et contrôle du champ'),
'ninja':('centre bas, main et fourreau orientés selon cette incarnation','appuis souples, accélération puis arrêt net avant une coupe','finir l’arc de lame puis reprendre la garde sans traverser le corps'),
'sniper':('carabine épaulée avec contact joue/crosse et œil cohérent','déplacement qui sécurise le long canon et stoppe avant la visée','recul, éventuel réarmement propre au modèle, réacquisition de cible'),
'brawler':('poids sur les jambes, épaules engagées, mains prêtes','transfert lourd mais anatomique, freinage par un appui réel','rétablir bassin et épaules après l’élan'),
'cardgun':('préparation du support AC!D et de l’arme propre au profil','déplacement lisible entre la décision de carte et son exécution','refermer la séquence de carte puis revenir à la garde'),
'cardblade':('carte/choix tactique distinct du maniement de lame','pas mesurés et prise de distance avant coupe','arrêt de lame puis remise en posture tactique'),
'cardshield':('protection et information de carte lisibles séparément','appui robuste, défense orientée vers l’attaque','désengagement de la protection et fin de l’effet de carte'),
'ocelot':('poignets, revolvers et étuis propres à cet âge ; manipulation identifiable','pas latéraux et regard indépendant des rotations d’arme','replacer chaque arme sans changer sa main ni téléporter les cartouches'),
'raven':('masse de l’arme et du corps visibles, appuis larges','accélération lente et compensation du poids de l’armement','arrêt de l’arme, inertie des accessoires puis garde'),
'wanderer':('silhouette déformée et organe cristallin propres au type de Wanderer','démarche irrégulière avec appuis malgré la déformation','déséquilibre puis réorientation de la masse'),
'grenadier':('matériel explosif fixé et prise visible avant le lancer','pas qui ne font pas traverser les grenades et sacoches','retour de la main libre vers la poche utilisée'),
'beauty':('version Beauty séparée de son armure Beast ; posture et âge de cette version','démarche humaine propre à la scène de référence','réaction corporelle et reprise de souffle ; aucun membre d’armure réintroduit'),
'survivor':('outil, équipement et protection de la version Survive choisie','mouvement utilitaire avec fatigue lisible, charge correctement portée','contrôle de l’outil et de l’environnement après l’action'),
'small_drone':('châssis, jambes/roues et module optique correctement orientés','cycle de locomotion mécanique ; pas de genoux humains','retour de l’outil ou de la caméra sur sa charnière'),
'parasite':('silhouette et équipement du Skull concerné ; parasite séparé du corps','translation/effet propre à ce type, arrivée physiquement posée','dissipation de l’effet et rétablissement de la garde'),
'decoy':('apparence réelle et dispositif de leurre séparés','mouvement du corps visible avant/après le leurre','désactivation du leurre sans changer l’incarnation du corps'),
'pyro':('buse, réservoir et conduites solidaires des prises de main','pas qui compensent le réservoir ; tuyau ne traverse pas le torse','arrêt de flamme, stabilisation de la buse et refroidissement visible'),
'fury':('combinaison, visière, lance-flammes et propulseur de The Fury','pas lourds ; impulsion de propulseur distincte d’un vol permanent','extinction de poussée, poids absorbé puis remise en visée'),
'boss_cqc':('garde de The Boss, main de contrôle et main d’arme clairement séparées','entrée courte, rotation de bassin et placement du pied de contrôle','désarmement/projection lisible puis retour sobre à la garde'),
'vamp':('posture souple, couteau et main libre distincts','acrobatie avec trajectoire et reprise d’appui ; aucune lévitation générique','finir la rotation, contrôler la lame et reprendre la cible'),
'stealth_rifle':('arme longue et apparition/disparition séparées','pas lisibles avant camouflage et à la réapparition','reprise de visée sans déplacer l’origine du tir'),
'hawk':('attitude aérienne liée à l’équipement observé, arme conservée','décollage et atterrissage avec cause visible ; pas de flottement arbitraire','cesser la poussée puis poser les appuis'),
'sundowner':('blindage, grands boucliers et lames sur leurs attaches','poids des panneaux visible dans les pivots de bassin','refermer ou écarter les panneaux avant reprise de garde'),
'pain':('attitude de The Pain ; essaim distinct de la silhouette','appuis humains, abeilles en trajectoires séparées','dissipation ou regroupement de l’essaim après l’événement'),
'fear':('posture contorsionnée de The Fear et arbalète identifiable','appuis écartés et bond sans allonger les membres','réception basse, reprise d’arbalète et stabilisation'),
'end':('posture âgée de The End, carabine, équipement et respiration observables','déplacement à l’échelle du corps, canon sécurisé','reprise de souffle et visée ; pas de souplesse de ninja générique'),
'volgin':('masse de Volgin, armé du poing et électricité distincte du corps','pas puissants, hanches porteuses et arrêts pesants','dissipation de charge et relâchement des épaules'),
'walker':('pilote ou châssis de Walker Gear visibles dans leur rôle exact','articulation des deux jambes, stabilisation du haut et du canon','absorption du recul par le châssis ; pas de bras humain ajouté'),
'dog':('tête, harnais, pattes et accessoires du chien dans cette version','trot/courte course à quatre appuis, pivot avec patte d’appui','retrait de la tête ou de l’outil et retour quadrupède'),
'horse':('encolure, harnais, crinière et quatre membres distincts','pas/trot avec cycle équin, demi-tour et freinage avec appuis','abaissement de l’encolure et rééquilibrage après ruade/charge'),
'octopus':('corps et bras mécaniques de l’armure Octopus, câbles non interchangeables','progression multi-appuis, masse centrale qui suit les bras','rétraction des tentacules puis remise en position'),
'raging':('ailes et armement de Raging Raven sur leurs ancrages','poussée, vol borné, freinage et réception mécanique','repli de voilure/armes avant garde'),
'crying':('configuration quadrupède de Crying Wolf et railgun sur le châssis','cycle de quatre pattes avec tête/arme stabilisées','recul et retour du railgun sans transformer le corps en bipède'),
'screaming':('marionnettes, fils et bras de Screaming Mantis correctement attachés','déplacement du corps et retard des marionnettes','dissipation du contrôle et repositionnement des poupées'),
'cunningham':('plateforme et organe d’armement de Cunningham distincts du corps','déplacement de la plateforme avec inertie contrôlée','fin de tir et stabilisation mécanique'),
'wolf_robot':('LQ-84i : quatre pattes, bras dorsal à tronçonneuse et queue-pince séparés','cycle robotique quadrupède ; impulsion arrière puis réception avant','bras dorsal et queue reviennent chacun sur leur propre articulation'),
'khamsin':('corps de Khamsin, unité de combat et grande hache sur leurs vraies attaches','pas pesants puis attaque dont l’inertie déplace le châssis','freinage de la hache et stabilisation du cockpit'),
'pyth':('combinaison et émission de froid de Python distinctes','pas contenus et orientation de l’arme malgré les effets froids','baisse d’émission puis retour du corps'),
'gene':('garde de Gene et geste de commande/voix distinct du coup physique','déplacement précis avec accélération puis pose stable','fin du geste de commandement avant retour offensif'),
'owl':('arme/équipement de Marionette Owl et lecture du piège séparés','positionnement tactique, approche et retrait propres au corps','refermer le dispositif et conserver la silhouette de Ghost Babel'),
'viper_wire_mines':('Black Arts Viper sans fusil ajouté : fils, ancrages et mines visibles','repli vers un angle sur appuis humains ; pose basse distincte','mains quittent les ancrages avant réarmement d’un piège'),
'venom':('prothèse gauche, œil, éclat crânien et équipement de Venom conservés','garde basse compacte avec fonction de prothèse clairement lisible','retour de la main naturelle et du bras mécanique séparément'),
'mistral':('bras supplémentaires et L’Étranger réunis selon la forme lance/fouet','pas tournants qui laissent passer l’arme sans traverser le torse','rassemblement des segments puis reprise de prise'),
'monsoon':('corps segmenté et sais de Monsoon ; chaque segment garde son identité','séparation/recomposition explicite, position finale stable','segments reviennent dans l’ordre, sans doublon de membre'),
'armstrong':('appui massif et nanomachines localisées au corps d’Armstrong','charges à forte impulsion suivies d’un freinage pesant','fissures/effet de nanomachines se résorbent selon la durée autorisée'),
'fortune':('railgun de Fortune, posture de tir et équipement distincts','déplacement qui porte la masse de l’arme, pas de tir sans préparation','recul et stabilisation de l’arme longue'),
'fatman':('patins, tenue lourde, bombe et pistolet du profil Fatman','glisse sur roulettes avec poussée et freinage, pas marche de soldat','inertie des patins puis rotation contrôlée'),
'raiden_mgr':('Custom Body noir, visage et HF katana du Raiden après prologue','course/bond cyborg avec lame maintenue sur le bon côté','fin de coupe et retour au garde ; Zandatsu seulement si le profil l’autorise'),
'sam':('katana, fourreau et prothèse de Jetstream Sam correctement différenciés','appuis de duel et impulsion de dégainé, torse stable','fin de coupe puis rangement/maintien cohérent du fourreau'),
'medic':('matériel de soin distinct de toute arme éventuelle','approche mesurée et protection du patient/outillage','retrait des mains puis rangement de l’objet utilisé'),
'gekko':('jambes biologiques et tête/châssis de Gekko, arme sur son montage','foulées lourdes et contact des pieds ; aucun cycle humanoïde de bras','recul du châssis et retour de tourelle'),
'monkey':('petit primate, queue et équipements visibles de cette version','appuis de primate et saut à sa vraie taille','réception sur les appuis appropriés, retour de queue'),
'bomber':('masse explosive du Wanderer Bomber séparée des membres','avancée irrégulière et anticipation corporelle de déclenchement','retombée ou fin propre au statut explosif du profil'),
'psychic':('regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile','mouvement et éventuelle sustentation distingués de l’effet psychique','cesser le geste de concentration puis revenir à la posture propre à l’incarnation'),
'unarmed_beauty':('corps Beauty distinct de son armure, mains vides et posture de cette version','démarche humaine, aucun membre mécanique transféré depuis la Beast','réaction humaine et reprise de souffle sans sortir une arme absente'),
'unarmed_paz':('mains vides, tenue et état physique de la version de Paz choisie','déplacement à la stature et à l’âge de cette version ; aucune gestuelle de soldat présumée','reprise de souffle et appui défensif, issue simulée/neutralisée selon le profil'),
'support_sunny':('Sunny conserve sa stature, son rôle de soutien et son outil s’il est attesté','gestes d’observation et petits appuis propres à l’âge de cette incarnation','retour au terminal ou à l’observation ; aucune maîtrise militaire présumée'),
'boxed_operator':('opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place','pas visibles sous le carton et inertie légère du volume ; pas de métal lourd inventé','arrêt du carton puis stabilisation de l’outil monté dessus'),
'command_simulation':('posture de commandement et outil de simulation explicitement séparés d’un combat canonique','repositionnement mesuré puis geste de décision','clore le signal de commande, abaisser l’outil et réobserver la scène'),
'msx2_conventional_longgun':('arme longue conventionnelle et silhouette de cette incarnation MSX2','appuis militaires contenus, canon sécurisé','recul et retour de visée sans arme futuriste importée'),
'msx2_star_ninja':('étoiles de lancer et posture du Ninja MSX2','bond ou pas bref avec trajectoire lisible','retrait de main et reprise de garde après lancer'),
'msx2_grenade':('grenades et tenue propres au profil MSX2','pas tactiques, main de lancer dégagée','retour vers la poche de grenades puis garde'),
'giant':('volumes du grand corps et organe offensif lisibles à leur échelle','déplacement lourd, anticipation et appui de chaque masse','freinage de l’inertie puis remise en position'),
'tracker':('organe sensoriel et silhouette du Tracker de Survive distincts d’un Wanderer ordinaire','recherche puis approche guidée par le sens montré, et non par une visée armée inventée','recentrer l’organe sensoriel après l’attaque'),
'mortar':('organe-canon biologique et appuis du Mortar de Survive','repositionnement du corps avant mise en batterie','recul de l’organe puis rétablissement de l’appui'),
'crawler':('corps au sol et membres du Crawler identifiables','progression rampante par véritables appuis, sans cycle de marche debout','repli des membres et redressement limité à son anatomie'),
'stock_fenrir_railgun':('Fenrir standard quadrupède, railgun et articulations distincts de Blade Wolf','course mécanique puis mise en batterie du canon','recul mécanique puis recentrage du railgun'),
'raptor_mgr_native':('Raptor : griffes de contact et lanceur dorsal à quatre bouches bien séparés','pas de châssis et appuis des membres, masse portée par les articulations','retour de griffe et stabilisation du lanceur dorsal'),
'raiden_r00_prologue':('corps standard du prologue, visage intact et katana conventionnel','course de garde avec katana tenu et reprise d’appui cyborg','fin de coupe puis retour sans capacités exclusives du corps ultérieur'),
'parallaxe_original':('armure olive originale, optique sur le côté anatomique gauche et arme du dessin utilisateur','pas d’observation tactique, positionnement autour du seul leurre actif','rappel du dispositif ou baisse de l’optique puis retour en garde'),
}

def esc(s):return str(s or '').replace('|','\\|').replace('\n',' ')
def write_json(name,data): (DATA/name).write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
def write_csv(name,rows,fields):
 with (DATA/name).open('w',encoding='utf-8-sig',newline='') as f:
  w=csv.DictWriter(f,fieldnames=fields,extrasaction='ignore',lineterminator='\n');w.writeheader()
  for r in rows:w.writerow({k:(' ; '.join(map(str,r[k])) if isinstance(r.get(k),list) else r.get(k,'')) for k in fields})
def slug(s):return re.sub(r'[^a-z0-9]+','-',s.lower()).strip('-')

def morphology(f):
 uid=f['uid'];v=f.get('visual',{});key=f['combat']['key']
 if '_ai_' in uid:return 'avatar'
 if v.get('kind')=='machine' or key in ('wolf_robot','stock_fenrir_railgun','raptor_mgr_native','gekko','small_drone','walker') or any(x in uid for x in ['mastiff_mgr','slider_mgr','hammerhead_mgr','fenrir_mgr']):return 'machine'
 if v.get('kind')=='quadruped' or key in ('dog','horse','monkey'):return 'animal'
 return 'human'

def actor_direction(f,e):
 c=f['combat'];k=c['key'];uid=f['uid'];v=f.get('visual',{})
 a=SIGNATURE.get(k)
 if not a:
  if v.get('kind')=='machine':a=('châssis et organe d’action propres à cette machine','locomotion mécanique par les éléments réellement présents','replacer chaque organe sur sa charnière sans geste humain arbitraire')
  elif v.get('kind')=='quadruped':a=('silhouette quadrupède, tête et appendices de cette incarnation','cycle à quatre appuis et rotation du tronc','reprise de l’appui avant/arrière après l’action')
  else:a=('garde et outil dictés par le profil exact ; conserver tous les traits de l’incarnation','appuis adaptés à la morphologie et à la technique courante','retour à la garde en conservant arme et accessoires')
 if uid=='pass40__raiden_r00':a=('Standard Cyborg Body du prologue R-00, visage intact et katana conventionnel','appuis cyborg et lame tenue, séparation explicite de la silhouette Custom Body','fin de coupe et respiration ; ni Ripper, ni Zandatsu, ni mâchoire mécanique ajoutés')
 if 'fenrir' in uid:a=('corps canin mécanique Fenrir, appendices et outil différenciés de LQ-84i','cycle quadrupède mécanique et rayon de rotation propre au châssis','réalignement du corps et de l’arme sur leurs axes réels')
 scale='Stature et âge de cette incarnation conservés.'
 if v.get('body')=='child':scale='Conserver la taille et la gestuelle de l’enfant ; gestes de simulation/assistance, pas un corps adulte redimensionné.'
 return {'idle':a[0],'locomotion':a[1],'recovery':a[2],'scale':scale,'identity':e.get('incarnation',c.get('basis','')) if e else c.get('basis','')}

def mapped_action(f,m,e):
 r=resolved.get(f['uid'],{})
 rm=r.get('moves',r.get('resolved',r.get('actionMap',{})))
 if isinstance(rm,dict) and m['slot'] in rm:
  value=rm[m['slot']]
  return value.get('action',value.get('requested',value.get('group'))) if isinstance(value,dict) else value,'runtime actionName'
 return (e.get('actionMap',{}).get(m['slot'],'') if e else ''),'actionMap déclarative ; sélection contextuelle à vérifier'

def move_board(f,m,direction):
 name=m['name'];kind=m['kind'];tag=m.get('tag','');slot=m['slot'];c=f['combat'];v=f.get('visual',{})
 pre=f'Depuis la garde de {f["name"]}, préparer « {name} » ; {direction["idle"]}.'
 act='';rec=direction['recovery']+'.'
 if kind=='melee' and (m.get('level')=='throw' or tag=='grapple'):
  pre+=' Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.'
  act='Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.'
  rec+=' Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.'
 elif kind=='melee' and tag in ('blade','knife','machete','spear','tentacle','hoof','kick'):
  pre+=' Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.'
  act='Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.'
  rec+=' Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.'
 elif kind=='melee':
  if slot=='low' or m.get('level')=='low':
   pre+=' Abaisser le centre de gravité et charger l’appui arrière.'
   act='Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.'
  elif slot in ('heavy','super'):
   pre+=' Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.'
   act='Accélérer la frappe engagée de « '+name+' », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.'
  else:
   pre+=' Préparer un mouvement compact de la main ou de l’organe disponible.'
   act='Déclencher « '+name+' » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.'
  if tag in ('electric','psychic','zandatsu'):act+=' L’effet '+tag+' reste séparé du membre ; son apparition et sa disparition suivent les événements du profil.'
 elif kind=='projectile':
  if tag in ('ballistic','precision','tranq','rail','rocket','laser','bolt','fire'):
   pre+=' Montrer la prise et la visée de l’arme décrite par « '+name+' » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.'
   act='Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.'
  elif tag in ('knife','blade','boomerang','shuriken','explosive'):
   pre+=' Prélever l’objet correspondant à « '+name+' », armer le geste et garder visible la main ou l’organe de lancement.'
   act='Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps.'
  else:
   pre+=' Donner à la source de « '+name+' » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.'
   act='Détacher l’effet '+tag+' de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet.'
  n=m.get('count',1)
  if n>1:act+=f' La salve contient {n} émissions, espacées de {m.get("interval","la cadence déclarée")} ticks CQC : recalculer le point de bouche à chaque départ.'
  if m.get('bounces'):act+=' Prévoir le ricochet comme événement de l’objet ; le corps ne se réoriente pas automatiquement vers la cible.'
  if m.get('fuse'):act+=f' L’objet conserve sa mèche de {m["fuse"]} ticks ; préparation, vol et détonation ont des états séparés.'
  rec+=' Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.'
 elif kind in ('trap','stationaryMine'):
  pre+=' Prendre le dispositif, s’abaisser vers le support et indiquer le lieu de pose avant activation.'
  act='Poser « '+name+' » au point réel de main/outil, armer puis retirer le membre. Le dispositif possède ensuite son propre sprite, ses états attente/armement/déclenchement/destruction et sa collision.'
  if kind=='stationaryMine':act+=' Le signal vise une position antérieure observée ; l’animation ne doit pas faire croire à une poursuite de cible.'
  rec+=' Se dégager de l’objet sans le téléporter ; l’interruption avant armement a sa propre sortie.'
 elif kind=='mobility':
  pre+=' Préparer l’appui qui produit le déplacement ; '+direction['locomotion']+'.'
  act='Exécuter « '+name+' » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné.'
  if m.get('travel') is not None:act+=f' Déplacement déclaré : {m["travel"]} unités par tick actif avant mise à l’échelle du moteur.'
  rec+=' Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.'
 elif kind=='reload':
  pre+=' Abaisser l’arme en sécurité puis accéder à ses munitions réelles.'
  act='Pour « '+name+' », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.'
  rec+=' La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.'
 elif kind=='parry':
  pre+=' Présenter la surface ou l’organe de parade et maintenir une fenêtre courte lisible.'
  act='Recevoir puis dévier au contact réel pour « '+name+' » ; la riposte et son effet n’apparaissent qu’après succès. Une attente sans contact garde une pose différente du contre réussi.'
  rec+=' Séparer sortie ratée, blocage simple et riposte ; aucun effet de réussite avant collision.'
 elif kind in ('recover','heal'):
  pre+=' Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « '+name+' ».'
  act='Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.'
  rec+=' Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.'
 elif kind in ('mark','observe'):
  pre+=' Orienter regard, optique ou terminal vers la cible observée, sans consulter une action future.'
  act='Pour « '+name+' », déclencher lecture/repérage avec un petit geste ou changement d’optique et un indicateur séparé. Le corps doit rester visible et vulnérable selon les données de combat.'
  rec+=' Couper le signal ou abaisser l’outil ; retour vers l’adversaire sans nouvelle arme inventée.'
 elif kind=='buff':
  pre+=' Montrer la préparation corporelle ou mécanique de « '+name+' ».'
  act='Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.'
  rec+=' Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.'
 elif kind=='detonate':
  pre+=' Montrer la commande ou le geste de déclenchement, avec le dispositif déjà présent.'
  act='Déclencher uniquement les objets admissibles ; la réaction du corps accompagne la commande, tandis que chaque explosion garde son centre et son sprite propres.'
  rec+=' Baisser la commande et retrouver la garde ; ne pas créer une nouvelle mine par le geste seul.'
 elif kind=='chaff':
  pre+=' Prendre le dispositif de brouillage et préparer le lancer ou l’activation.'
  act='Séparer le geste, l’objet et le nuage/effet de brouillage ; aucun flash de tir balistique ne remplace cette action.'
  rec+=' Finir le mouvement de la main et dissiper l’effet sur l’événement prévu.'
 else:
  act='Storyborder explicitement l’organe et l’événement du type '+kind+' avant production ; aucune correspondance anatomique n’est présumée.'
 criteria='Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume.'
 criteria+=' Contre-jeu à conserver : '+m.get('counterplay','à documenter')
 return pre,act,rec,criteria

def state_board(f,d):
 n=f['name'];kind=morphology(f)
 if kind=='human':
  idle_motion='Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu.'
  loss=f'{n} réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde.'
  hit=f'Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de {n}.'
  guard='garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux'
  air='compression des jambes, impulsion, montée, sommet, descente puis absorption de réception'
 elif kind=='animal':
  idle_motion='Respiration et petit mouvement de tête/oreilles/queue selon l’anatomie ; les pattes restent stables.'
  loss=f'{n} relève la tête, rassemble ses appuis, répartit son poids puis reprend sa position d’attente ; aucun redressement humain.'
  hit=f'Réactions de tête, de flanc et de patte de {n}, perte d’appui puis relevé par les membres réellement présents.'
  guard='abaissement et orientation défensive de la tête et du tronc ; ne pas ajouter une parade humaine à deux bras'
  air='regroupement des appuis arrière, bond, extension en vol puis réception par les appuis avant et arrière adaptés à l’espèce'
 elif kind=='avatar':
  idle_motion='Variation de signal et léger mouvement de l’avatar/module de simulation ; ne pas présenter cette enveloppe comme un corps officiel.'
  loss=f'L’avatar de {n} signale la défaite puis retrouve son état de simulation ; pas de respiration, de perte de conscience ou de réparation physique inventée.'
  hit=f'Réactions de signal/affichage de l’avatar de {n}, interruption puis retour ; l’existence de ce corps de simulation reste explicitement non canonique.'
  guard='état de protection visuel de simulation, clairement distinct d’une défense corporelle officielle'
  air='déplacement de l’avatar dans la simulation, explicitement adapté ; ne pas attribuer un saut physique à une intelligence sans corps attesté'
 else:
  idle_motion='Petits ajustements mécaniques des organes présents et optique stable ; aucune respiration humaine.'
  loss=f'{n} interrompt ses émissions, absorbe l’oscillation de sa masse, stabilise ses appuis ou son vol, puis replace ses organes ; aucune régénération gratuite.'
  hit=f'Secousse du châssis et de l’organe touché de {n}, déséquilibre, arrêt puis remise en position par ses articulations réelles.'
  guard='orientation défensive du châssis, des membres ou de la protection effectivement présente ; pas d’avant-bras humain ajouté'
  air='départ par poussée ou articulation autorisée, déplacement aérien puis stabilisation et reprise d’appui ; les appareils volants gardent leur mode de sustentation'
 return [
 {'state':'idle','description':f'{n} : {d["idle"]}. {idle_motion} Boucle sans translation d’appui. {d["scale"]}'},
 {'state':'locomotion','description':f'{d["locomotion"]}. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.'},
 {'state':'guard_high_low','description':f'Pour « {f["combat"].get("role",f.get("role",""))} » : {guard} ; recul bloqué distinct de la simple position basse. Garder {d["idle"]}.'},
 {'state':'jump_land','description':f'{n} : {air}. {d["locomotion"]}. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.'},
 {'state':'hit_fall_getup','description':f'{hit} Terminer par {d["recovery"]}. Les accessoires et organes restent attachés à leurs emplacements.'},
 {'state':'intro_duel','description':f'Proposition CQC : entrée raccordée au lieu de « {f["ep"]} », présentation de {d["identity"]}, puis {d["idle"]}. Geste court lié à « {f["combat"].get("moves",{}).get("special",{}).get("name","")} » sans déclencher ses dégâts.'},
 {'state':'round_win','description':f'Proposition CQC : après l’arrêt, {d["recovery"]} ; {n} vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à {f["ep"]}.'},
 {'state':'round_loss','description':f'Proposition CQC : {loss} Pas de décès narratif imposé par un KO de manche.'},
 {'state':'outro_match','description':f'Proposition CQC : achever la signature « {f["combat"].get("moves",{}).get("super",{}).get("name","")} », revenir par {d["recovery"]}, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.'},
 ]

def finisher_board(f,fin,d):
 index=fin.get('index',0);family=fin.get('family','');moves=fin.get('sourceMoves',[])
 anchor=' / '.join(moves) or fin.get('name','conclusion')
 starts=[
  f'Plan 1 : {f["name"]} sécurise son appui, regarde la cible et prépare l’outil ou le geste de « {anchor} ».',
  f'Plan 1 : montrer le placement et la trajectoire basse/de zone de « {anchor} » ; l’espace disponible doit être lisible.',
  f'Plan 1 : approche jusqu’à la distance réelle de « {anchor} », arme et main libre identifiées.',
  f'Plan 1 : après une observation ou un repli, {f["name"]} reprend l’initiative par « {anchor} ».'
 ]
 if family in ('cqc','capture'):
  core=f'Plan 2 : contact de saisie ou neutralisation lié à « {anchor} », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit.'
 elif family in ('ballistic','sniper'):
  core=f'Plan 2 : présenter l’arme effectivement associée à « {anchor} », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps.'
 elif family=='blade':
  core=f'Plan 2 : armer la lame ou le membre de « {anchor} » et dégager son arc. Plan 3 : enchaîner des coupes lisibles avec angles distincts ; les impacts et les réactions suivent le fil de lame, sans ajout d’arme d’une autre incarnation.'
 elif family in ('psychic','electric','cold','fire'):
  core=f'Plan 2 : montrer la source corporelle ou matérielle de « {anchor} ». Plan 3 : développer l’effet {family} en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles.'
 elif family in ('mechanical','beast'):
  core=f'Plan 2 : {d["locomotion"]} ; montrer l’organe de « {anchor} ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse.'
 elif family in ('explosive','trap'):
  core=f'Plan 2 : montrer la pose/trajectoire et le délai de « {anchor} ». Plan 3 : déclencher au véritable point de dispositif ; poussière, débris et réaction de cible restent indépendants du corps de l’attaquant.'
 elif family=='card':
  core=f'Plan 2 : rendre lisible la décision de carte associée à « {anchor} ». Plan 3 : réaliser l’effet par le vrai corps/outil du profil ; les cartes servent à la présentation AC!D, pas à inventer un équipement canonique.'
 else:
  core=f'Plan 2 : matérialiser le geste tactique « {anchor} » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran.'
 ends=[
  f'Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : {d["recovery"]}, pose de signature face à l’adversaire.',
  f'Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : {d["recovery"]}, arrêt du dispositif et retour au cadre d’ensemble.',
  f'Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : {d["recovery"]}, prise de distance et maintien final.',
  f'Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : {d["recovery"]}, rangement/pose finale différente des trois autres.'
 ]
 text=starts[index%4]+' '+core+' '+ends[index%4]
 if fin.get('tone') in ('simulation','nonlethal'):text+=' Respecter le ton '+fin['tone']+' enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.'
 return text

actor_rows=[];move_rows=[];fin_rows=[];variant_rows=[];native_rows=[]
for e in catalog['entries']:
 native_rows.append({'uid':e['uid'],'name':e['name'],'game':e['game'],'incarnation':e['incarnation'],'regions_distinctes':e['distinctRegions'],'directions_independantes':e['hasOpposite'],'miroir':e['mirror'],'groupes':', '.join(e['actions']),'groupes_une_region':', '.join(n for n,a in e['actions'].items() if a['distinctRegions']==1),'reference_status':e['referenceStatus']})

by_group=collections.defaultdict(list)
for f in fighters:
 uid=f['uid'];e=native.get(uid);d=actor_direction(f,e);p=finishers.get(uid,{})
 sheets=[];moves=[]
 for slot in SLOTS:
  m=f['combat']['moves'][slot];action,evidence=mapped_action(f,m,e)
  info=(e or {}).get('actions',{}).get(action,{})
  left=(e or {}).get('oppositeActions',{}).get(action,{})
  # Use effective runtime groups for counts after all catalog patches when available.
  rr=resolved.get(uid,{})
  def effective_info(direction,current):
   a=rr.get(direction,{}).get(action)
   if not a:return current
   frames=a.get('frames',[])
   return {'frames':len(frames),'distinctRegions':len({(fr.get('sha256',fr.get('file')),tuple(fr.get('rect',[]))) for fr in frames})}
  info=effective_info('actions',info);left=effective_info('oppositeActions',left)
  pre,act,rec,criteria=move_board(f,m,d)
  row={'uid':uid,'personnage':f['name'],'opus':f['ep'],'slot':slot,'technique':m['name'],'type':m['kind'],'tag':m.get('tag',''),'anticipation_ticks_cqc':m.get('startup'), 'actif_ticks_cqc':m.get('active'),'recuperation_ticks_cqc':m.get('recovery'),'groupe_declare':action,'preuve_mapping':evidence,'frames_direction_principale':info.get('frames',''),'regions_direction_principale':info.get('distinctRegions',''),'regions_direction_opposee':left.get('distinctRegions',''),'preparation_proposee':pre,'action_proposee':act,'retour_propose':rec,'critere_acceptation':criteria,'statut':'Storyboard de production CQC ; validation source et rendu à faire','source_code':BASE+'public/cqc/modules/unified-versus-v055.html'}
  move_rows.append(row);moves.append(row)
 for fin in p.get('finishers',[]):
  fr={'uid':uid,'personnage':f['name'],'opus':f['ep'],'finisher_id':fin['id'],'titre_existant':fin['name'],'famille':fin['family'],'ton':fin.get('tone',''),'duree_ticks_cqc':fin.get('duration',''),'phases_existantes':' → '.join(fin.get('phases',[])),'techniques_appui':' / '.join(fin.get('sourceMoves',[])),'storyboard_propose':finisher_board(f,fin,d),'manque':'Chorégraphie dessinée/riggée spécifique et synchronisée à produire/valider ; une fiche existante ne prouve pas une séquence unique','source':BASE+'public/cqc/modules/unified-versus-v055.html'}
  fin_rows.append(fr)
 declared=detailed.get('costumeOptions',{}).get(uid,{}).get('options',[])
 indexed=detailed.get('wardrobeAvailability',{}).get(uid,[])
 vmap={x['id']:dict(x,origin='sélecteur initial') for x in declared}
 for v in indexed:
  vmap[v['id']]=dict(v,origin='index natif chargeable'+(' + sélecteur initial' if v['id'] in vmap else ''))
 for vid,v in vmap.items():
  s=v.get('spriteSummary') or {};prov=v.get('provenance') or {}
  variant_rows.append({'uid':uid,'personnage':f['name'],'costume_id':vid,'libelle':v.get('label',vid),'famille':v.get('family','original' if vid=='original' else ''),'origine_registre':v['origin'],'creation_originale':prov.get('originalDesign',''),'apparence_canonique_attestee':prov.get('canonicalAppearanceAttested',''),'groupes_charges':', '.join(s.get('actions',[])),'metadata_url':v.get('metadata',{}).get('url',''),'contrat':'Même liste de 10 techniques + états communs ; refaire côté anatomique, silhouettes, pivots et origines de projectiles pour cette tenue','statut_validation':'Référencement observé ; métadonnées/PNG et exécution de toutes les poses non certifiées dans cette passe'})
 missing=[x for x in ['idle','guard','walk','crouch','jump','hit','ko','throw'] if not e or x not in e.get('actions',{})]
 groups=collections.defaultdict(list)
 for m in moves:
  if m['groupe_declare']:groups[m['groupe_declare']].append(m['slot'])
 shared={k:v for k,v in groups.items() if len(v)>1}
 one=[m['slot'] for m in moves if m['regions_direction_principale']==1]
 row={'uid':uid,'personnage':f['name'],'opus':f['ep'],'role':f['combat'].get('role',''),'archetype':f['combat']['key'],'base_lore_dans_code':f['combat'].get('basis',''),'incarnation_native':d['identity'],'nature_preuve':(e or {}).get('referenceStatus','') or ('métadonnées natives avec limites' if e else 'route machine effectivement déclarée ; animations d’articulation à contrôler'),'regions_natives_distinctes':e['distinctRegions'] if e else None,'deux_directions':e['hasOpposite'] if e else None,'actions_absentes_du_catalogue':missing,'route_machine':resolved.get(uid,{}).get('machine',False),'groupes_partages':shared,'techniques_une_region_principale':one,'direction_artistique_proposee':d,'etats_a_produire':state_board(f,d),'techniques':moves,'finishers_ids':[x['finisher_id'] for x in fin_rows if x['uid']==uid],'costumes_ids':list(vmap),'limites_sources':(e or {}).get('review',{}).get('limits',[]) or f['combat'].get('limitations',[]),'references':(e or {}).get('review',{}).get('sources',[]),'statut':'Audit de déclaration et spécification ; fidélité visuelle 1:1 non certifiée'}
 actor_rows.append(row);by_group[f['source']].append(row)

compact_actors=[]
for a in actor_rows:
 compact=dict(a)
 compact['techniques']=[{k:v for k,v in m.items() if k not in ('preparation_proposee','action_proposee','retour_propose','critere_acceptation','statut','source_code','personnage','opus')} for m in a['techniques']]
 compact['storyboard_complet']='animation_moves.csv et animations/README.md, rapprochement par uid + slot'
 compact_actors.append(compact)
write_json('animation_fighters.json',{'commit':SHA,'interpretation':'Les storyboards complets restent dans animation_moves.csv et les fiches Markdown. Les nombres de ticks sont les paramètres CQC, jamais des timings Konami certifiés.','fighters':compact_actors})
compact_catalog={**catalog,'entries':[]}
for e in catalog['entries']:
 item=dict(e);sources=set()
 for direction in ('actions','oppositeActions'):
  item[direction]={}
  for name,info in e[direction].items():
   sources.update(info.get('sourceFiles',[]))
   item[direction][name]={k:v for k,v in info.items() if k!='sourceFiles'}
 item['sourceFiles']=sorted(sources)
 compact_catalog['entries'].append(item)
write_json('animation_native_catalog.json',compact_catalog)
write_json('animation_summary.json',{'commit':SHA,'fighters':len(fighters),'moves':len(move_rows),'finishers':len(fin_rows),'native_body_entries':len(native),'runtime_fighters_with_native_body':sum(f['uid'] in native for f in fighters),'runtime_fighters_without_entry_in_body_catalog':[f['uid'] for f in fighters if f['uid'] not in native],'variants_linked':len(variant_rows),'all_native_have_opposite':all(e['hasOpposite'] for e in native.values()),'native_mirror_enabled':sum(e['mirror'] for e in native.values()),'single_region_groups':dict(collections.Counter(a for e in native.values() for a,info in e['actions'].items() if info['distinctRegions']==1)),'runtime_mapping_available':bool(resolved)})
write_csv('animation_moves.csv',move_rows,list(move_rows[0]))
write_csv('animation_finishers.csv',fin_rows,list(fin_rows[0]))
write_csv('animation_variants.csv',variant_rows,list(variant_rows[0]))
write_csv('animation_native_catalog.csv',native_rows,list(native_rows[0]))
write_csv('animation_fighters.csv',[{'uid':r['uid'],'personnage':r['personnage'],'opus':r['opus'],'role':r['role'],'archetype':r['archetype'],'nature_preuve':r['nature_preuve'],'regions_natives_distinctes':r['regions_natives_distinctes'],'deux_directions':r['deux_directions'],'route_machine':r['route_machine'],'groupes_partages':' ; '.join(k+' = '+', '.join(v) for k,v in r['groupes_partages'].items()),'techniques_une_region_principale':r['techniques_une_region_principale'],'costumes_ids':r['costumes_ids'],'statut':r['statut']} for r in actor_rows],['uid','personnage','opus','role','archetype','nature_preuve','regions_natives_distinctes','deux_directions','route_machine','groupes_partages','techniques_une_region_principale','costumes_ids','statut'])

fin_index=collections.defaultdict(list)
for row in fin_rows:fin_index[row['uid']].append(row)
index=['# Fiches d’animation par acteur','',f'Référence `{SHA}`. **{len(fighters)} fiches, {len(move_rows)} techniques et {len(fin_rows)} conclusions enregistrées.** Les descriptions proposées sont des spécifications de production CQC ; elles ne sont ni des sprites créés ni des chorégraphies officielles certifiées. Les comptes de régions décrivent le catalogue chargé, sans examen de chaque PNG.','', '[Lire le contrat commun et les écarts](../04_ANIMATIONS_SPRITES.md). Les dix techniques et quatre finishers de chaque acteur sont recopiés depuis le runtime final, puis assortis d’un storyboard et de critères.','', '| Groupe de registre | Acteurs | Fiches |','| --- | ---: | --- |']
chapters=[]
for group,all_rows in sorted(by_group.items()):
 old=SHEETS/(slug(group)+'.md')
 if old.exists():old.unlink() # Only the prior file generated by this builder.
 for start in range(0,len(all_rows),10):
  part=start//10+1
  chapters.append((group,part,all_rows[start:start+10]))
for group,part,rows in chapters:
 filename=slug(group)+f'-{part:02d}.md';index.append(f'| {group} — partie {part} | {len(rows)} | [{rows[0]["personnage"]} → {rows[-1]["personnage"]}]({filename}) |')
 body=[f'# Animations — {group}','',f'**{len(rows)} acteurs du registre courant.** Les titres d’actions et paramètres sont observés ; les descriptions sont des propositions CQC à produire et valider. Un groupe de frames existant ne certifie pas l’ensemble du mouvement ou sa fidélité originale.','', '[Index des fiches](README.md) · [Contrat commun](../04_ANIMATIONS_SPRITES.md)','', '## Sommaire','']
 body += [f'- [{r["personnage"]}](#{r["uid"].lower()}) — {r["opus"]}' for r in rows]
 for r in rows:
  e=native.get(r['uid']);d=r['direction_artistique_proposee']
  body += ['',f'## {r["uid"]}','',f'### {r["personnage"]} — {r["opus"]}','',f'**Rôle :** {r["role"]}. **Profil :** `{r["archetype"]}`.', '',f'**Base présente dans le code :** {r["base_lore_dans_code"]}','',f'**Incarnation à conserver :** {r["incarnation_native"]}','',f'**État vérifié :** {r["nature_preuve"]}. ' + (f'{e["distinctRegions"]} régions source distinctes dans les deux directions ; groupes : '+', '.join(e['actions'])+'.' if e else 'Une route machine est déclarée dans le runtime. Ses articulations remplacent le catalogue de corps contrôlé ; ce n’est pas un constat de sprite absent.'),'',f'**Réemplois à examiner :** '+(' ; '.join('`'+k+'` = '+', '.join(v) for k,v in r['groupes_partages'].items()) or 'pas de groupe natif partagé observé dans cette extraction')+'.','',f'**Techniques pointant sur une seule région native dans la direction principale :** '+(', '.join(r['techniques_une_region_principale']) or 'aucune dans le mapping natif observé, ou route machine')+'. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.','',f'**Variantes à couvrir par le même contrat :** '+', '.join('`'+v+'`' for v in r['costumes_ids'])+'.','', '**États communs individualisés — propositions à produire/compléter :**','']
  body += [f'- **{s["state"]} :** {s["description"]}' for s in r['etats_a_produire']]
  body += ['', '#### Dix techniques actuelles et storyboard de production','', 'Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.','']
  for m in r['techniques']:
   counts=f'{m["regions_direction_principale"] or "—"}/{m["regions_direction_opposee"] or "—"} régions par direction'
   body += [f'##### {m["slot"]} — {m["technique"]}','',f'**Existant :** `{m["type"]}` / `{m["tag"]}` ; {m["anticipation_ticks_cqc"]}/{m["actif_ticks_cqc"]}/{m["recuperation_ticks_cqc"]} ticks ; groupe `{m["groupe_declare"] or "route spécifique à vérifier"}`, {counts}. {m["preuve_mapping"]}.','',f'**Préparation.** {m["preparation_proposee"]}','',f'**Action.** {m["action_proposee"]}','',f'**Retour.** {m["retour_propose"]}','',f'**À valider.** {m["critere_acceptation"]}','']
  body+=['#### Quatre finishers du registre et storyboards proposés','', 'Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.','']
  for q in fin_index[r['uid']]:body += [f'##### {q["titre_existant"]}','',f'Famille `{q["famille"]}`, ton `{q["ton"]}` ; {q["duree_ticks_cqc"]} ticks CQC ; phases actuelles : {q["phases_existantes"]}. Appuis déclarés : {q["techniques_appui"]}.','',q['storyboard_propose'],'']
  body += ['#### Limites et preuves','']
  body += ['- '+x for x in r['limites_sources']]
  for src in r['references'][:8]:
   if isinstance(src,dict):body += [f'- [{src.get("title",src.get("scope","Référence déclarée"))}]({src.get("url","")}) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.']
  body += [f'- [Runtime et profils au commit audité]({BASE}public/cqc/modules/unified-versus-v055.html).','']
 (SHEETS/filename).write_text('\n'.join(body).rstrip()+'\n')
index += ['', '## Recherche par acteur','', '| Acteur | Incarnation / opus | Fiche |','| --- | --- | --- |']
for group,part,rows in chapters:
 for r in rows:index.append(f'| {esc(r["personnage"])} | {esc(r["opus"])} | [{r["uid"]}]({slug(group)}-{part:02d}.md#{r["uid"].lower()}) |')
optional_rows=[]
for f in catalog.get('originalFighters',[]):
 uid=f['uid'];e=native[uid];d=actor_direction(f,e)
 body=[f'# {f["name"]} — mode original optionnel','',f'Identifiant `{uid}`. Cette fiche est **hors des totaux du roster par défaut de 380 acteurs**. Le personnage est ajouté volontairement quand `original=parallaxe` et que le module n’est pas lancé en mode récit ; son absence du roster par défaut n’est pas un bug. Les finishers sont désactivés dans ce mode par le code actuel.','',f'**Origine :** {f["combat"]["basis"]} **Incarnation graphique :** {e["incarnation"]}.','',f'**État natif déclaré :** {e["distinctRegions"]} régions source distinctes ; vues gauche/droite indépendantes, aucun miroir. Les techniques ci-dessous sont déclarées dans le module original, séparément de la sonde du roster par défaut.','', '[Index général](README.md) · [Contrat de production](../04_ANIMATIONS_SPRITES.md)','', '## États individualisés','']
 body += [f'- **{s["state"]} :** {s["description"]}' for s in state_board(f,d)]
 body += ['', '## Dix techniques originales déclarées','']
 for slot in SLOTS:
  m=f['combat']['moves'][slot];pre,act,rec,crit=move_board(f,m,d);action=e['actionMap'].get(slot,'')
  row={'uid':uid,'personnage':f['name'],'slot':slot,'technique':m['name'],'anticipation_ticks_cqc':m['startup'],'actif_ticks_cqc':m['active'],'recuperation_ticks_cqc':m['recovery'],'groupe_declare':action,'preparation_proposee':pre,'action_proposee':act,'retour_propose':rec,'critere_acceptation':crit,'source':BASE+catalog['optionalSource']}
  optional_rows.append(row)
  body += [f'### {slot} — {m["name"]}','',f'`{m["kind"]}` / `{m.get("tag","")}` ; {m["startup"]}/{m["active"]}/{m["recovery"]} ticks CQC ; groupe déclaré `{action}`.','',f'**Préparation.** {pre}','',f'**Action.** {act}','',f'**Retour.** {rec}','',f'**À valider.** {crit}','']
 body += ['## Finishers et récit','', 'Le mode original masque et désactive actuellement les finishers ; aucune absence de quatre fiches officielles ne doit être déduite. Une extension future de Parallaxe demanderait des conclusions originales expressément marquées comme telles, un récit Station Méridien propre et des illustrations distinctes d’intro/épilogue. Elle ne doit pas insérer cet OC dans les chroniques Metal Gear officielles.','', '## Limites déclarées','']
 body += ['- '+x for x in f['combat']['limitations']+e['review']['limits']]
 body += ['',f'[Source du personnage original]({BASE}{catalog["optionalSource"]}). La sélection conditionnelle et la désactivation des finishers sont dans le [module Versus]({BASE}public/cqc/modules/unified-versus-v055.html).','']
 filename=slug(uid)+'.md';(SHEETS/filename).write_text('\n'.join(body).rstrip()+'\n')
 index += ['',f'## Personnage original optionnel : {f["name"]}','',f'[Fiche et dix techniques propres]({filename}). Séparé des 380 acteurs du roster par défaut ; finishers volontairement désactivés, apparence et fiction originales CQC.']
if optional_rows:write_csv('animation_optional_moves.csv',optional_rows,list(optional_rows[0]))
(SHEETS/'README.md').write_text('\n'.join(index).rstrip()+'\n')
print(json.dumps({'fighters':len(actor_rows),'moves':len(move_rows),'finishers':len(fin_rows),'variants':len(variant_rows),'chapters':len(chapters),'out':str(OUT)},ensure_ascii=False))
