# 04 — Audit des sprites et cahier d’animation

**Référence contrôlée :** `ba4e30a09e9e95727b75a665e7b6ab07d9941aea`, P41, 23 octobre 2026. Ce document décrit l’état du code et des métadonnées. Il ne représente pas une revue visuelle de chaque PNG, un comptage des dessins originaux image par image, ni une extraction des animations des jeux Konami.

## Résultat principal

CQC possède déjà des corps natifs et de nombreux groupes de poses. La prochaine étape est de rendre **chaque mouvement identifiable, continu et propre à son incarnation**, puis de comparer les poses et les accessoires à une capture de référence. La présence d’une clé `shoot`, `throw` ou `heavy` ne prouve pas que les dix techniques d’un combattant disposent de dix séquences dessinées différentes.

L’extraction reproductible des 21 scripts de catalogues chargés par le Versus donne **357 corps déclarés `action-frames`**, tous avec une table `oppositeActions` et `mirror: false`. Le rapprochement avec le **runtime final de 380 acteurs** donne **356 corps natifs et 24 routes machine** : aucun de ces 380 acteurs n’est sans l’une de ces routes déclarées. Le 357e corps du catalogue est `oc__parallaxe`, **personnage original optionnel**, volontairement activé dans son mode dédié ; son absence du roster par défaut n’est pas un bug. Sa [fiche séparée et ses dix techniques](animations/oc-parallaxe.md) complètent les 380 fiches principales. C’est une couverture des registres, pas une preuve de chargement et de rendu de chaque image. **237 des 357 entrées de catalogue utilisent 30 régions source distinctes**, 55 en utilisent 72, 37 en utilisent 32, 22 en utilisent 28, 4 en utilisent 29, 1 en utilise 31 et 1 en utilise 25. Une région est identifiée par SHA du fichier, rectangle et index physique éventuel ; deux régions peuvent encore représenter un dessin très proche. Les sommes de frames dans les groupes ne doivent donc pas être présentées comme autant de dessins uniques. [Source : catalogues et extracteur](scripts/extract-animation-catalog.cjs) ; [synthèse rapprochée](data/animation_summary.json).

Le renderer accepte les groupes `idle`, `guard`, `walk`, `crouch`, `attack`, `hit`, `ko`, `punch`, `low`, `throw`, `deploy`, `shoot`, `reload`, `optic`, `recover`, `blade`, `roll`, `heavy`, `charge`, `parry`, `jump`, plus `brace` et `stomp` pour Bloody Brad. Les états suivants n’ont **pas de groupe natif distinct dans ce contrat** : course, dash, marche arrière, retournement, départ et réception de saut, impact bloqué haut/bas, chute, relevé dédié, entrée de combat, victoire de manche, défaite de manche, victoire finale et sortie. Certains peuvent être représentés par un groupe existant, un déplacement moteur ou un rig ; cette réutilisation doit rester explicite. [Source : renderer](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-sprite-renderer.js).

## 1. Ce qui est déjà présent et ce qui reste à produire

| Domaine | Présence constatée | Écart à fermer | Vérification de fin |
| --- | --- | --- | --- |
| Deux directions | Tables gauche/droite sur les 357 corps du catalogue | Vérifier les côtés anatomiques, les mains d’arme et les accessoires dans chaque pose et costume ; ne pas assimiler une table à une conformité visuelle | Planche des deux faces avec arme, étui, œil, prothèse, insigne et point de tir annotés |
| Déplacements | `walk`, translation moteur, parfois articulation du corps ou des membres | Cycle arrière, départ/arrêt, virage, accélération et appui au sol propres à l’acteur | Les pieds restent en contact pendant l’appui ; l’aller-retour ne retourne pas l’anatomie |
| Attaques | Dix commandes dans chaque profil de combat ; `actionMap` et parfois `phaseMap` | Réduire les alias entre coups rapides, lourds, supers et prises lorsque la silhouette devrait changer | Tableau technique → anticipation/contact/retour → frame → arme/VFX → collision |
| Saut | `jump` sur 338 des 357 entrées déclaratives | Départ, montée, sommet, descente et réception ; remplacer les sauts humanoïdes inappropriés aux machines | Séquence complète ; aucun écrasement vertical du corps ; réception raccordée au sol |
| Impacts | `hit` et `ko` sur tous les corps | Impacts haut/milieu/bas, garde touchée, recul, chute, rebond et relevé distincts | L’acteur revient à une pose cohérente ; la victime de prise suit les points de contact |
| Garde basse | Le choix générique privilégie `crouch` avant `guard` | Une position accroupie ne suffit pas à montrer une parade basse ; créer ou qualifier une pose et un effet dédiés | Lecture immédiate de garde haute, garde basse et accroupissement libre |
| Supers à rafales | Correctifs P40/P41 de frame d’émission différée | Vérifier tous les autres costumes et toutes les armes, pas seulement les variantes corrigées | Chaque projectile naît du canon à sa véritable frame d’émission, dans la bonne direction |
| Finishers | 1 520 fiches dans le runtime final, quatre par acteur ; la base historique seule en contient 1 416 | Séquences uniques d’attaquant et victime, raccords d’arme, cadres, règles de taille et variantes non létales | Le titre et les phases ne sont pas les seuls éléments qui changent entre deux conclusions |
| Récit et présentation | Modules Chronicles, textes et illustrations séparés du corps de combat | Relier chaque entrée/sortie à la bonne incarnation et à des sprites de scène spécifiques | Intro et épilogue utilisent des scènes et images distinctes, avec transitions et langue cohérentes |
| Costumes | Plusieurs index natifs, métadonnées et routes immuables | Vérifier chaque technique dans chaque tenue ; un costume ne doit pas déplacer silencieusement l’arme, le pivot ou le point de tir | Même identité anatomique et même logique de combat ; limites visuelles listées par tenue |

**Limite importante :** l’audit des groupes natifs ne remplace pas le contrôle des rigs. Blade Wolf, les boîtes de Peace Walker et plusieurs machines disposent de chemins d’articulation particuliers. Une pose entière immobile, un morceau tourné par le renderer et un dessin supplémentaire sont trois preuves différentes. Les fiches par acteur conservent ces distinctions.

## 2. Sens exact de la fidélité 1:1

Pour une apparence officielle, la référence doit indiquer **jeu, édition, plateforme, séquence, tenue et instant observé**. La fidélité porte sur la silhouette, les proportions, les côtés anatomiques, la construction de l’équipement, les couleurs dans un éclairage neutralisé, l’ordre des gestes et les caractéristiques visibles de l’arme. Une photographie de face ou un portrait ne suffit pas à certifier le dos ou un corps entier.

Les timings numériques du Versus sont des paramètres CQC. Les profils indiquent déjà que dommages, coûts et fenêtres sont des adaptations. Les recopier dans les fiches d’animation permet de caler le dessin sur la collision ; cela ne transforme pas ces valeurs en frame data officielle de Metal Gear. Une commande inventée pour un personnage de soutien doit être marquée **adaptation CQC**, même si son visage et son costume sont fidèles. Pour les prototypes annulés, les AI, les personnalités uniquement mentionnées et les corps reconstruits, conserver le statut **concept/présentation non attestée** tant qu’une référence corporelle vérifiable manque.

Pour les costumes originaux autorisés, l’objectif est la cohérence interne : garder âge, visage, morphologie, membres et personnalité ; documenter la nouvelle construction du costume ; ne pas revendiquer qu’il apparaît dans l’œuvre officielle. Les familles Gala, rétro, cyborg, nextgen ou Survive ne sont pas des certifications de canon.

## 3. Contrat commun de production pour chaque corps et chaque costume

Les nombres de dessins ci-dessous sont des **budgets de départ proposés pour CQC**, à adapter après test de lisibilité. Ils ne proviennent pas des jeux originaux. Une animation peut être interpolée sur un rig si ses points d’articulation sont réels et vérifiés ; elle doit alors être enregistrée comme telle. Le retour à l’idle, les variantes interrompues et les deux directions font partie de la livraison.

| Séquence | Description complète à produire | Points de contrôle | Budget initial proposé |
| --- | --- | --- | --- |
| Idle prêt | Répartition de poids cohérente avec l’arme ; respiration discrète du thorax ; regard vers l’adversaire ; mains posées sur leurs véritables prises ; retombée séparée des sangles, cheveux et pans | Pieds stables, arme et accessoire ne traversent pas le torse ; boucle sans saut | 4–8 clés par direction |
| Idle d’attente | Petite action personnelle après une attente : ajustement d’arme, contrôle d’un écran, regard ou geste attesté ; retour au même appui | Ne change ni ressource ni hitbox sans événement moteur ; variante proposée signalée | 6–10 clés |
| Garde haute | Montée visible de l’avant-bras, de l’arme ou du bouclier ; centre de gravité baissé ; maintien ; relâchement | Forme adaptée à l’acteur ; pas de pistolet ou de lame inventé | 3–5 clés + maintien |
| Garde basse | Genoux fléchis, appui arrière, protection du bas du corps et haut du visage ; distinguer la pose du simple accroupissement | La hauteur de collision et le niveau de garde correspondent à l’image | 3–5 clés + maintien |
| Garde touchée | Compression au contact, recul bref de l’organe de protection, transfert au pied arrière, retour ; variante haute et basse | Flash sur le point réellement touché ; aucune glissade permanente | 3–5 clés par niveau |
| Accroupissement | Descente par hanches/genoux, arme conservée, pose basse tenue, remontée | Ne pas redimensionner verticalement un sprite debout | 3–5 clés |
| Marche avant | Contact talon/plante adapté aux chaussures, transfert, passage du pied, contact opposé ; haut du corps garde l’axe de menace | Longueur de pas liée à la vitesse ; quatre pattes et chenilles suivent leur propre cycle | 6–8 clés |
| Marche arrière | Poussée du pied avant, recul prudent, appui arrière puis rapprochement ; visage garde l’adversaire | Une lecture inversée de marche est une approximation à déclarer | 6–8 clés |
| Départ et arrêt | Inclinaison initiale, impulsion, reprise d’appui ; freinage progressif et stabilisation de l’arme | Pas de changement instantané de posture à vitesse non nulle | 2–4 clés par transition |
| Course | Poussée plus forte, phase de suspension si anatomiquement possible, retour des jambes et oscillation d’arme contrôlée | Exclure le sprint humain sur un appareil immobile ou une AI | 6–10 clés |
| Dash avant/arrière | Préparation lisible, impulsion courte, déplacement et freinage ; arme sécurisée ; réaction de costume retardée | Fenêtre de collision/évasion déclarée ; aucune téléportation masquée par le dessin | 4–6 clés par sens |
| Retournement | Arrêt d’appui, transfert de bassin, rotation du torse, replacement des mains et de l’arme | L’œil perdu et la prothèse ne changent jamais de côté anatomique | 3–5 clés |
| Saut départ | Compression jambes/ressorts, impulsion, décollage du dernier appui | Pas de saut humain par défaut pour un quadrupède, un pod ou un véhicule | 2–3 clés |
| Saut en vol | Montée, sommet puis descente avec membres et équipement contenus | Maintenir l’orientation et le centre de masse ; prise aérienne seulement si prévue | 3–5 clés |
| Réception | Premier appui, absorption, stabilisation, retour en garde | L’ombre et le pied rejoignent le même sol ; frame active interdite avant la fin de la récupération prévue | 3–4 clés |
| Attaque légère | Armé bref, frappe compacte, extension au contact, retrait et retour à la garde | Contact au moment actif, main et portée cohérentes | 4–6 clés |
| Attaque lourde | Transfert de poids plus marqué, armé, accélération, contact, continuation et remise en place exposée | Silhouette distincte du jab ; aucune hausse de portée par étirement du corps | 6–9 clés |
| Attaque basse | Abaissement du bassin, extension de la jambe/lame/accessoire, contact bas, retrait, redressement | Dessin et hitbox bas ; les machines utilisent l’organe adéquat | 5–7 clés |
| Prise réussie | Entrée, premier contact, verrouillage, déséquilibre, projection/immobilisation, libération, récupération | Synchronisation des deux acteurs ; point de saisie anatomique compatible avec la taille | 8–12 clés par rôle |
| Prise ratée | Main/pince tendue, absence de contact, fermeture ou retrait, retour exposé | Ne jamais déplacer la victime sur un échec | 4–6 clés |
| Déchoppe | Contact bref, opposition de bras/point d’appui, rupture de la prise, recul des deux acteurs | Respect du délai de déchoppe moteur et séparation physique | 5–7 clés par rôle |
| Tir simple | Présentation de l’arme, épaulé/visée, départ du projectile, recul, retour ; cycle de culasse/étui si visible | Canon réel, main forte, éjection cohérente, pas de flash de bouche sur une arme sans bouche | 4–7 clés |
| Rafale | Anticipation, départs successifs, reculs et retours intermédiaires, arrêt et stabilisation | Un événement d’émission par projectile ; ne pas figer le premier canon durant toute la rafale | 4–8 clés réutilisables avec événements distincts |
| Grenade / lancer | Prise depuis l’équipement, préparation identifiable, armé, lâcher, suivi de main et retour | Objet détaché à la frame active ; trajectoire issue de la main ; explosion indépendante | 6–9 clés |
| Rechargement | Arme abaissée, extraction chargeur ou ouverture, prise des munitions, insertion, fermeture/armement, remise en visée | Séquence propre au modèle ; une interruption ne crédite pas les munitions trop tôt | 8–12 clés |
| Maniement de lame | Armé, orientation du tranchant, coupe/estoc, poursuite, retrait ; fourreau séparé si utilisé | Arc d’impact suit la lame ; main et garde ne s’inversent pas | 6–10 clés par attaque |
| Parade / contre | Préparation, réception et déviation, riposte seulement après déclenchement, récupération | Contre raté distinct ; pas d’effet de réussite avant collision | 5–8 clés |
| Pose de piège | Prise d’objet, descente vers le support, installation, geste d’armement, retrait des mains, recul | Le piège apparaît à son vrai point de pose et reste une entité indépendante | 6–9 clés |
| Activation de pouvoir | Concentration ou organe mécanique mobilisé, montée d’effet, émission/action, dissipation et retour | Effet lié à la capacité de cette incarnation ; rester lisible sans cacher le corps | 6–10 clés selon pouvoir |
| Soin / récupération | Mise en sécurité, utilisation de l’objet/organe attesté ou geste de récupération proposé, fin puis retour | Objet et jauge synchronisés ; ne pas attribuer une régénération canonique à un civil | 6–10 clés |
| Impact haut | Tête/épaules cèdent dans la direction du coup, bassin compense, reprise d’équilibre | Accessoires restent attachés ; yeux/face ne changent pas d’incarnation | 3–5 clés |
| Impact milieu | Compression du torse, transfert sur jambe arrière ou appuis mécaniques, retour | Hitstop et recul séparés du dessin ; pas de changement de hauteur arbitraire | 3–5 clés |
| Impact bas | Perte ou retrait d’appui, genou/pied touché, rééquilibrage | Réaction différente du coup à la tête | 3–5 clés |
| Projection aérienne | Décollage subi, trajectoire, rotation bornée, réception lourde | Position victime calée sur la force réelle ; pas de corps traversant le sol | 5–8 clés |
| Chute / renversement | Perte d’appui, déséquilibre, premier contact, étalement contrôlé, pose au sol | L’arme et le costume ne disparaissent pas ; variant quadrupède/machine | 6–9 clés |
| Relevé | Appui au sol, rassemblement des jambes, genou, poussée, garde ; variante rapide si mécanique prévue | `roll` ne tient pas lieu de relevé anatomique universel | 6–10 clés |
| Étourdissement | Oscillation contrôlée ou dysfonctionnement mécanique, perte de garde, reprise | Indicateur de durée et animation lisibles ; ne pas répéter simplement le hit | 4–6 clés en boucle |
| KO de manche | Dernier impact, effondrement ou immobilisation, pose finale tenable, respiration/arrêt mécanique adapté | Séparer le KO de manche d’une mort narrative | 7–10 clés |
| Victoire de manche | Réduction de la tension, geste propre au personnage, observation de l’adversaire, retour pour la manche suivante | Ne pas lancer l’épilogue ni faire disparaître un accessoire requis à la manche suivante | 8–12 clés |
| Défaite de manche | Reprise de souffle, regard/réaction corporelle, réarmement et retour | Ton adapté à l’âge, aux blessures et au personnage ; cohérent avec le KO précédent | 6–10 clés |
| Intro de duel | Entrée dans l’arène, placement, geste de signature, réplique si disponible, mise en garde | Arrivée compatible avec le lieu ; transition directe vers la position jouable | 10–16 clés |
| Victoire finale / sortie | Geste final propre à l’acteur, rangement/maintien de l’arme, départ ou pose, raccord vers le résultat | Une animation distincte de l’idle ; caméra, fond et illustration d’épilogue ne reprennent pas l’intro | 10–16 clés |
| Finishers 1 à 4 | Préparation spécifique, action principale, réaction synchronisée, conclusion, pose ; prévoir l’échec technique et les victimes incompatibles | Chorégraphie différente par conclusion ; étiquetage adaptation ; séquence alternative pour corps non saisissable | Storyboard 5–8 plans puis clés par plan |

### Fiche technique obligatoire d’une animation

Chaque séquence doit enregistrer : `uid`, incarnation, costume, direction, état moteur, nom de technique, référence visible et statut de preuve, anticipation/actif/récupération en ticks CQC, FPS d’affichage, loop, rectangles source, pivots, points d’arme et de saisie, boîtes de contact, événements de projectile/son/VFX, fenêtres d’interruption et raccords. Conserver les PNG originaux et leur SHA. Une correction de métadonnées ne doit pas être présentée comme un nouveau dessin.

La vue gauche et la vue droite restent indépendantes pour les personnages asymétriques. Pour Naked Snake/Big Boss/Venom, vérifier l’œil et le membre correspondant à **l’incarnation exacte** ; pour les cyborgs, visage, mâchoire, prothèse et fourreau ; pour Ocelot, mains, revolvers et étuis ; pour Meryl, les versions MGS1/MGS4 séparément. Une époque différente doit disposer de sa fiche, même si le nom est le même.

## 4. Corrections de fidélité prioritaires

1. **Alias de technique.** Solid Snake MGS1 utilise notamment `punch` pour léger/lourd/CQC et `shoot` pour tir/super ; cela existe, mais ne constitue pas trois mouvements de corps distincts. Naked Snake MGS3 réutilise également le groupe `punch` pour plusieurs commandes. Prévoir des clés et raccords spécifiques sans effacer les sources existantes.
2. **Clés uniques trop peu nombreuses pour certains états.** Raiden MGR, Otacon MGS1 et de nombreux profils ont un idle, une garde, un saut, un impact ou un KO déclarés avec une seule région. Une articulation complémentaire peut donner du mouvement, mais ne remplace pas le dessin d’un départ, d’une transition ou d’une réaction spécifique. Les tableaux par acteur indiquent les comptes exacts.
3. **Civils et soutiens.** Les coups et finishers de ces profils sont des adaptations de simulation. Avant d’augmenter leur violence ou de leur ajouter une arme, documenter ce qui est montré dans leur œuvre ; préférer animation d’assistance, esquive, outil et issue non létale lorsque le profil l’indique. La fidélité n’exige pas de transformer un scientifique en soldat.
4. **AI et corps non attestés.** Distinguer un portrait, un avatar original et un corps officiel. L’absence d’un corps canonique devient une décision de mise en scène documentée, pas une lacune à masquer avec une silhouette générique.
5. **Quadrupèdes et machines.** Adapter chaque action à l’organe réel : locomotion à quatre appuis, pince, tourelle, bras dorsal, canon, chenilles ou vol. Une prise humaine ou une roulade identique pour tous ne peut pas être considérée comme une animation fidèle.
6. **R-00 de Raiden.** Conserver la distinction corps Standard Cyborg du prologue / Custom Body noir / MGS4. Le catalogue R-00 mentionne encore une certification de marche non acquise et des limites de reconstitution ; les dix mouvements restent des adaptations CQC. Ne pas importer le Ripper, le Zandatsu ou la mâchoire du corps ultérieur.
7. **Vêtements et accessoires secondaires.** Les manteaux, cheveux, bandanas, ceintures, tubes, prothèses, coffres, fourreaux et câbles suivent le mouvement avec des attaches stables. Une recoloration CSS ne résout pas une nouvelle silhouette ni une arme qui change de position.

## 5. Finishers : passer du registre à des séquences propres aux personnages

Le bloc historique `CQC_FINISHERS_053` contient 354 profils × 4 fiches, soit 1 416 entrées ; après les extensions réellement chargées, le **runtime final en contient 1 520 pour 380 profils**. Il répartit les gestes entre familles (`ballistic`, `cqc`, `blade`, `psychic`, etc.). La fonction `drawFinisher46` sélectionne une phase, construit des poses génériques d’attaquant/victime et appelle le rendu de combattant. Ainsi, quatre noms et quatre variantes de texte ne prouvent pas quatre animations originales. [Source : Versus et ses scripts d’extension](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html) ; [les 1 520 fiches rapprochées](data/animation_finishers.csv).

La sélection actuelle des phases utilise une fraction normalisée de la durée (`floor(t × nombre de phases)`) : il manque une véritable chronologie avec durées et événements propres à chaque plan. Les durées des CSV sont les valeurs nominales des fiches ; le mode cinématique leur applique un facteur `1.18`. Une production finale doit enregistrer séparément le contact, le départ de projectile, le changement de caméra, la réaction de victime, la fin du VFX et le raccord de sortie. Ajouter un nom de phase ne suffit pas à définir ces événements.

**Anomalie de comptage constatée :** `toneCounts` annonce encore 220 profils `stylized`, 122 `simulation` et 12 `nonlethal`, soit 354. Le recomptage des 380 profils chargés donne **246 / 122 / 12**. Les 26 profils ajoutés ne sont donc pas répercutés dans ce résumé de tonalité. `fighterCount`, `finisherCount` et la somme de `familyCounts` correspondent, eux, au runtime de 380 acteurs. Recalculer tous les agrégats à partir du même registre final évitera les statistiques contradictoires.

Pour chaque profil, conserver les quatre fiches existantes comme point de départ, puis produire :

- **une signature principale**, attachée à une technique ou à un accessoire clairement identifié ;
- **une variante d’environnement**, avec un point de contact réel dans le stage, désactivée sur les stages incompatibles ;
- **une conclusion rapprochée**, où les deux corps et les mains restent synchronisés ;
- **une conclusion tactique ou non létale**, cohérente avec le rôle et le ton du personnage.

Ce sont des catégories de production proposées. Une même famille ne doit pas forcer tous les personnages à avoir le même geste. Le visage, la posture, la préparation, la fin et la réaction de la victime doivent être décrits pour chaque fiche. Les fiches détaillées de cet audit indiquent les titres actuels et leur statut ; elles ne déclarent pas ces animations terminées.

## 6. Validation d’une livraison de sprites

La validation porte sur une technique complète dans les deux sens, puis sur ses costumes. Elle observe l’anticipation, chaque frame active et la récupération ; vérifie le canon, la lame ou la main de saisie ; joue interruption, parade, vide, KO et changement de manche ; contrôle l’échelle et le sol face à une petite et une grande cible. Les variantes de costume et les modes Core/Versus/Support doivent être vérifiés séparément lorsque leurs chemins de rendu diffèrent.

Une fiche est **terminée** seulement si les fichiers existent, se chargent, sont reliés à la commande prévue, gardent les côtés anatomiques, présentent un raccord propre et ont été comparés à leur référence. « Le registre accepte l’entrée », « le script ne lève pas d’erreur » et « l’image a été générée » sont des étapes intermédiaires.

## 7. Données détaillées et reproduction

Les [380 fiches par acteur](animations/README.md) et les fichiers `data/animation_*.json` / `data/animation_*.csv` complètent ce chapitre : identité et preuve, régions natives, **3 800 techniques actuelles**, storyboard de chaque technique, besoins de locomotion/réactions/présentation et **1 520 finishers du runtime final**. Les fiches restent des **spécifications de production**, pas une annonce d’intégration. Le fichier [animation_variants.csv](data/animation_variants.csv) relie 597 couples acteur/tenue observés aux mêmes contrats ; ce nombre inclut les apparences originales et les alternatives, et ne représente pas 597 nouveaux costumes.

La correspondance technique → groupe provient d’un appel réel à `CQC_COMBAT_SPRITES.actionName` après les extensions, avec le slot, le type et le tag de la technique. Cette sonde ne rejoue pas toutes les frames de phase, ne valide pas l’affichage des images et ne couvre pas chaque costume chargé à la demande. Les compteurs par groupe indiquent les rectangles sources déclarés, non le nombre de dessins visuellement distincts. Le fichier [animation_fighters.csv](data/animation_fighters.csv) met en évidence les groupes réemployés par plusieurs techniques et les commandes résolues vers une seule région native.

L’extracteur `scripts/extract-animation-catalog.cjs` relit les scripts déclaratifs dans l’ordre du module Versus et n’écrit pas dans le runtime. Le rapprochement du roster final, des costumes tardifs et des machines articulées est séparé afin de ne pas compter un dossier, une tenue ou un rig comme un corps natif supplémentaire.
