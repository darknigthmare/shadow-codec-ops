# Stages Existants

[Retour à la synthèse](03_STAGES_MACHINES.md). Référence P41 `ba4e30a09e9e95727b75a665e7b6ab07d9941aea`. 124 fiches de stages existants : revue, plans, animation, raccords et références.

## 3. Les124 stages existants : détail et travail restant

| Opus du classement audit | Stages partagés |
|---|---:|
| AC!D | 4 |
| AC!D2 | 4 |
| Ghost Babel | 7 |
| Ground Zeroes | 2 |
| MG MSX | 7 |
| MG NES | 1 |
| MG2 | 9 |
| MGO3 | 1 |
| MGS1 | 10 |
| MGS2 | 9 |
| MGS3 | 15 |
| MGS4 | 9 |
| MGSV TPP | 10 |
| Mobile | 1 |
| Peace Walker | 9 |
| Portable Ops | 8 |
| Portable Ops Plus | 1 |
| Revengeance | 8 |
| Snake’s Revenge | 4 |
| Survive | 4 |
| VR Missions | 1 |

Chaque fiche ci-dessous indique ce qui existe déjà, le contrat visuel, les couches réellement déclarées et l’étape nécessaire pour clôturer la fidélité. Les notes entre guillemets sont la revue du dépôt ; elles ne deviennent pas une approbation nouvelle. Les fichiers JSON/CSV contiennent en plus tous les rectangles, ancrages, alias, références et paramètres de mouvement.

### WHITE FLOWER FIELD — `flower_field`

**MGS3 · P1 · présent.** Édition : Metal Gear Solid 3: Snake Eater (2004), original PlayStation 2, Rokovoj Bereg before final shot. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Clairière ouverte, ciel couvert gris-jaune-vert, arbres gris-bruns partiellement nus, souches sombres, fleurs blanches à six pétales avant la fin du duel. Le premier master à canopée fermée a été rejeté et conservé. Le champ et les arbres sont adaptés à une caméra latérale. La caméra latérale et le zoom utilisent une extension par répétition des seules bandes de texture aux bords du sol, sans dupliquer les repères centraux ; originaux PNG conservés sans retouche.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-reprise/flower_field/back.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-reprise/flower_field/ground.png` | Pas de mouvement de plan déclaré ici |
| middle / architecture | 0.12 | background | `assets/stages-reprise/flower_field/middle.png` | Pas de mouvement de plan déclaré ici |
| front / foreground | 1.12 | foreground | `assets/stages-reprise/flower_field/front.png` | {"xAmplitude":1.2,"yAmplitude":0.35,"speed":0.55,"phase":0.6} |

**Animation :** effet déclaré `{"type":"petals","enabled":true,"count":36,"color":"#efece0"}`. Boucle de vent des tiges et pétales séparée du changement blanc→rouge de la conclusion ; intro et épilogue ont un état de décor distinct, déclenché uniquement par l’évènement narratif.

**Écart spécifique :** Champ de Rokovoj Bereg : conserver clairière, souches et lisibilité des fleurs blanches dans les deux sens de combat.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-stage-layer-data.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-stage-layer-data.js). Références déclarées dans le dépôt : [source1](https://archive.org/download/LP_Metal_Gear_Solid_3/mgs3_49.mp4) ; [source2](http://www.tentenpro.com/muni_shinobu/mg/pics/flower.jpg).

### SHADOW MOSES HELIPORT — `shadow_heliport`

**MGS1 · P1 · présent.** Édition : Metal Gear Solid (1998), original PlayStation. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Façade industrielle bleu-gris, poste vitré, aire de béton H/cercle, grilles et neige des captures PS1 originales. La façade complète est reconstruite par adaptation de caméra latérale ; proportions de quelques détails générés restent approximatives. La caméra latérale et le zoom utilisent une extension par répétition des seules bandes de texture aux bords du sol, sans dupliquer les repères centraux ; originaux PNG conservés sans retouche.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-reprise/shadow_heliport/back.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-reprise/shadow_heliport/ground.png` | Pas de mouvement de plan déclaré ici |
| middle / architecture | 0.12 | background | `assets/stages-reprise/shadow_heliport/middle.png` | Pas de mouvement de plan déclaré ici |
| front / foreground | 1.12 | foreground | `assets/stages-reprise/shadow_heliport/front.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"snow","enabled":true,"count":36,"color":"#dce5df"}`. Flocons en plusieurs profondeurs, dérive et intermittence réglées sur capture ; premiers plans moins opaques pour garder jambes et projectiles lisibles. Accumulation ou traces nécessitent une couche persistante distincte.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-stage-layer-data.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-stage-layer-data.js). Références déclarées dans le dépôt : [source1](https://images.launchbox-app.com/e122cb66-f481-4f9c-94ca-e165144c85f3.png) ; [source2](https://img.konami.com/mg/archive/mgs/about_mgs/images/am01_1.jpg) ; [source3](https://img.konami.com/mg/archive/mgs/about_mgs/images/am01_2.jpg).

### TORTURE ROOM — `torture_room`

**MGS1 · P2 · présent.** Édition : Metal Gear Solid1998, original PlayStation1. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Trois captures du jeu original MGS1 exécuté par émulateur inspectées: salle métallique bleu-vert, consoles cyan, appareil mécanique vide et cloison vitrée. Caméra latérale et visibilité des pièces cachées par Snake adaptées; détails de mécanismes non visibles et géométrie exacte3D non certifiés1:1. Les reflets cyan pulsent très faiblement comme ambiance ajoutée, sans mouvement de l’appareil ni changement de collisions. Le seul sol prolonge aux bords ses panneaux métalliques ordinaires sans répéter un appareil ou repère identitaire. La géométrie et les matériaux sont étayés; le ratio et le filtrage des reproductions ne prouvent pas des pixels PS1 natifs.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true,"sourceGroundY":742.3444444444444}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| sky / sky | 0 | background | `assets/stages-reprise/torture_room/sky.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.4 | background | `assets/stages-reprise/torture_room/architecture.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-reprise/torture_room/ground.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.2 | foreground | `assets/stages-reprise/torture_room/foreground.png` | {"xAmplitude":0,"yAmplitude":0,"speed":0.5,"phase":0.3,"opacityAmplitude":0.025} |

**Animation :** effet déclaré `{"type":"none"}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-stage-layer-data.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-stage-layer-data.js). Références déclarées dans le dépôt : [source1](https://portforward.com/games/walkthroughs/Metal-Gear-Solid/metal-gear-solid-223-small.webp) ; [source2](https://portforward.com/games/walkthroughs/Metal-Gear-Solid/metal-gear-solid-221-small.webp) ; [source3](https://portforward.com/games/walkthroughs/Metal-Gear-Solid/metal-gear-solid-222-small.webp).

### TANKER DECK — `tanker_deck`

**MGS2 · P2 · présent.** Édition : Metal Gear Solid 2: Sons of Liberty, original PS2 tanker Discovery upper deck / Olga battle. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Pont supérieur du Discovery, caisses et équipement bas, garde-corps blanc, métal mouillé vert sombre, nuit et pluie. Le cadrage devient latéral ; les parties cachées par les combattants et le HUD ne peuvent être reproduites exactement. La caméra latérale et le zoom utilisent une extension par répétition des seules bandes de texture aux bords du sol, sans dupliquer les repères centraux ; originaux PNG conservés sans retouche.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-reprise/tanker_deck/back.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-reprise/tanker_deck/ground.png` | Pas de mouvement de plan déclaré ici |
| middle / architecture | 0.12 | background | `assets/stages-reprise/tanker_deck/middle.png` | Pas de mouvement de plan déclaré ici |
| front / foreground | 1.12 | foreground | `assets/stages-reprise/tanker_deck/front.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"rain","enabled":true,"count":36,"color":"#dce5df"}`. Pluie, roulis apparent du fond, éclairages et effets des tirs doivent garder des horloges séparées ; éviter un déplacement physique gratuit du sol.

**Écart spécifique :** Pont extérieur du Tanker pour Olga ; choisir exactement le côté, les obstacles et l’éclairage de la confrontation.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-stage-layer-data.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-stage-layer-data.js). Références déclarées dans le dépôt : [source1](https://portforward.com/games/walkthroughs/Metal-Gear-Solid-2-Sons-of-Liberty/metal-gear-solid-2-sons-of-liberty-13-small.webp) ; [source2](https://portforward.com/games/walkthroughs/Metal-Gear-Solid-2-Sons-of-Liberty/metal-gear-solid-2-sons-of-liberty-15-small.webp).

### BIG SHELL STRUT E — `big_shell`

**MGS2 · P2 · présent.** Édition : MGS2 Sons of Liberty PS2. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Références MGS2 réelles80/81/83 vues : H/octogone blancs, dalles gris-vert et conteneurs olive, ciel très pâle verdâtre et parapet brun-orangé attestés par la vueFPS83. Le premier master bleu/gris a été corrigé selon cette troisième source et conservé comme essai rejeté. Pas de brouillard ou coucher de soleil hérités. Projection adaptée au combat latéral ; répartition et détail des conteneurs, finesse moderne et proportion du premier plan sont des adaptations documentées, pas une certification 1:1. Texture des bandes extérieures192px sans H, octogone ni objets prolongée aux bords pour caméra±220/zoom0,78. Tous repères centraux restent conservés. Lumière atmosphérique légère en option, sans mouvement des bâtiments. Premier plan indépendant placé à2176px avec bords hors champ pour éviter de révéler une découpe intrinsèque de l’image aux caméras extrêmes. Profondeur de l’architecture0,12 pour conserver ses silhouettes aux bords de la composition jusqu’à la caméra±220 et au zoom0,78. Les raccords de texture répétés à l’extérieur restent une approximation visible dans certaines vues extrêmes.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| sky / sky | 0 | background | `assets/stages-reprise/big_shell/sky.png` | {"opacityAmplitude":0.008,"speed":0.18,"phase":0} |
| ground / ground | 1 | background | `assets/stages-reprise/big_shell/ground.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.12 | background | `assets/stages-reprise/big_shell/architecture.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.2 | foreground | `assets/stages-reprise/big_shell/foreground.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Mer et rotation/éclairage des installations en arrière-plan ; bombes et minuteries appartiennent au combat de Fatman, pas à une météo permanente.

**Écart spécifique :** Strut E : valider héliport de Fatman, marquages et conteneurs, pas une passerelle quelconque du Big Shell.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-stage-layer-data.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-stage-layer-data.js). Références déclarées dans le dépôt : [source1](https://portforward.com/games/walkthroughs/Metal-Gear-Solid-2-Sons-of-Liberty/metal-gear-solid-2-sons-of-liberty-81-small.webp) ; [source2](https://portforward.com/games/walkthroughs/Metal-Gear-Solid-2-Sons-of-Liberty/metal-gear-solid-2-sons-of-liberty-80-small.webp) ; [source3](https://portforward.com/games/walkthroughs/Metal-Gear-Solid-2-Sons-of-Liberty/metal-gear-solid-2-sons-of-liberty-83-small.webp).

### GROZNYJ GRAD — `groznyj`

**MGS3 · P2 · présent.** Édition : Metal Gear Solid3: Snake Eater2004, original PlayStation2. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Cour Southwest originale PS2 inspectée : parois de béton ocre/gris, bandes horizontales, caisses métalliques sombres, petite porte et éclairages industriels chauds. Caméra latérale, disposition3D et microtextures peintes adaptées; inscriptions originales non certifiées. L’animation de reflets au sol est une ambiance ajoutée très légère, sans mouvement des murs/collisions. Le seul sol se prolonge aux bords par texture simple sans objet identitaire répété.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true,"sourceGroundY":742.3444444444444}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| sky / sky | 0 | background | `assets/stages-reprise/groznyj/sky.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.4 | background | `assets/stages-reprise/groznyj/architecture.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-reprise/groznyj/ground.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.2 | foreground | `assets/stages-reprise/groznyj/foreground.png` | {"xAmplitude":0,"yAmplitude":0,"speed":0.5,"phase":0.3,"opacityAmplitude":0.025} |

**Animation :** effet déclaré `{"type":"none"}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-stage-layer-data.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-stage-layer-data.js). Références déclarées dans le dépôt : [source1](https://portforward.com/games/walkthroughs/Metal-Gear-Solid-3-Snake-Eater/metal-gear-solid-3-snake-eater-106-small.webp) ; [source2](https://portforward.com/games/walkthroughs/Metal-Gear-Solid-3-Snake-Eater/metal-gear-solid-3-snake-eater-110-small.webp).

### SOKROVENNO FOREST — `sokrovenno`

**MGS3 · P2 · présent.** Édition : Metal Gear Solid 3: Snake Eater (2004), original PlayStation 2. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Deux captures originales PS2 inspectées : Sokrovenno South et combat The End. Palette olive sombre, très gros troncs gris-brun et rochers moussus conservés. Caméra latérale et piste plane CQC adaptées ; cette composition dessinée ne certifie pas une reconstruction géométrique exacte du niveau 3D. Les4images sont de vrais plans indépendants avec alpha ; aucun HUD ni watermark. Le premier plan est abaissé de 96px pour garder les pieds lisibles à568, sans changer les collisions. Texture du sol aux seuls bords étendue pour les caméras extrêmes ; bandes examinées, sans objet identitaire ni repère architectural répété.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| sky / sky | 0 | background | `assets/stages-reprise/sokrovenno/sky.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.4 | background | `assets/stages-reprise/sokrovenno/architecture.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-reprise/sokrovenno/ground.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.2 | foreground | `assets/stages-reprise/sokrovenno/foreground.png` | {"xAmplitude":1.5,"yAmplitude":0.8,"speed":0.45,"phase":0.8} |

**Animation :** effet déclaré `{"type":"none"}`. Végétation, camouflage, apparition du perroquet et traces de déplacement sont des couches distinctes ; leur apparition nécessite les références du combat.

**Écart spécifique :** Déterminer Sud, Ouest ou Nord de Sokrovenno ; une forêt générique ne reproduit pas les lignes de tir de The End.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-stage-layer-data.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-stage-layer-data.js). Références déclarées dans le dépôt : [source1](https://portforward.com/games/walkthroughs/Metal-Gear-Solid-3-Snake-Eater/metal-gear-solid-3-snake-eater-82-small.webp) ; [source2](https://portforward.com/games/walkthroughs/Metal-Gear-Solid-3-Snake-Eater/metal-gear-solid-3-snake-eater-83-small.webp).

### OUTER HAVEN SUMMIT — `outer_haven`

**MGS4 · P2 · présent.** Édition : Metal Gear Solid 4: Guns of the Patriots, original PlayStation 3, Act 5 Outer Haven summit. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Sommet métallique sombre, joints et bouchons ronds, mât fin, mer dorée et flotte observés pendant le duel final PS3. Le master avait ajouté des personnages : il est conservé comme rejet et tous les plans jouables les retirent, sans acteurs peints dans le décor. Cadrage latéral adapté, pas de rambarde ou de brasier inventé. La caméra latérale et le zoom utilisent des plans élargis sans répétition des bouchons circulaires. Originaux PNG conservés sans retouche. Le fond maritime est recadré séparément pour conserver la flotte dans le cadrage jouable ; lumière subtile animée sans déplacer le mât. Le détourage de mer qui couvrait le bas des navires reste un essai non intégré.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-reprise/outer_haven/back.png` | {"opacityAmplitude":0.01,"speed":0.5,"phase":0} |
| ground-corrected / ground | 1 | background | `assets/stages-reprise/outer_haven/ground-corrected.png` | Pas de mouvement de plan déclaré ici |
| middle / architecture | 0.12 | background | `assets/stages-reprise/outer_haven/middle.png` | Pas de mouvement de plan déclaré ici |
| front / foreground | 1.12 | foreground | `assets/stages-reprise/outer_haven/front.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false,"count":36,"color":"#dce5df"}`. Conserver phase d’éclairage correspondant au duel, séparer vent et animations des combattants ; répliques/changement de posture suivant les phases du duel.

**Écart spécifique :** Sommet pour Liquid Ocelot : ne pas employer ce sommet comme équivalent topographique d’une salle serveurs ou du couloir micro-ondes.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-stage-layer-data.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-stage-layer-data.js). Références déclarées dans le dépôt : [source1](https://archive.org/download/PS3_Longplay_081_Metal_Gear_Solid_4_Guns_of_the_Patriots_a_V2/PS3_Longplay_081_Metal_Gear_Solid_4_Guns_of_the_Patriots_part_5_of_5.mp4).

### MIDDLE EAST RUINS — `middle_east`

**MGS4 · P2 · présent.** Édition : Metal Gear Solid 4: Guns of the Patriots, original PlayStation 3, Act 1 Middle East. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Ruines en maçonnerie beige observées : colonnes et linteaux, dalles craquelées, plafond effondré avec fers apparents et ombres jaune-olive. Cadrage latéral reconstruit ; les parties hors capture restent une approximation de matériaux sourcés. La caméra latérale et le zoom utilisent une extension par répétition des seules bandes de texture aux bords du sol, sans dupliquer les repères centraux ; originaux PNG conservés sans retouche.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-reprise/middle_east/back.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-reprise/middle_east/ground.png` | Pas de mouvement de plan déclaré ici |
| middle / architecture | 0.12 | background | `assets/stages-reprise/middle_east/middle.png` | Pas de mouvement de plan déclaré ici |
| front / foreground | 1.12 | foreground | `assets/stages-reprise/middle_east/front.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"dust","enabled":true,"count":24,"color":"#dce5df"}`. Poussière lente issue de zones définies ; amplitude et opacité relevées, décroissance à l’arrêt si produite par mouvement. Distinguer poussière ambiante, fumée de dégâts et souffle d’attaque.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-stage-layer-data.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-stage-layer-data.js). Références déclarées dans le dépôt : [source1](https://www.hardcoregaming101.net/wp-content/uploads/2023/05/Metal-Gear-Solid-4-8.jpg).

### MOTHER BASE — `mother_base`

**Peace Walker · P2 · présent.** Édition : Metal Gear Solid: Peace Walker, original PSP Mother Base / ZEKE battle deck; PlayStation 3 HD game capture. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Pont MSF gris, cercle blanc au sol, parapets ocre, grues triangulaires, radar et réservoirs blancs à dessus jaune observés dans la vidéo originale. Aucun équipement Diamond Dogs de MGSV. Capture PS3 HD du décor PSP ; texture et perspective latérale restent approximatives. La caméra latérale et le zoom utilisent une extension par répétition des seules bandes de texture aux bords du sol, sans dupliquer les repères centraux. Originaux PNG conservés sans retouche.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-reprise/mother_base/back.png` | Pas de mouvement de plan déclaré ici |
| ocean / ambient | 0 | background | `assets/stages-reprise/mother_base/ocean.png` | {"xAmplitude":0.7,"yAmplitude":0.15,"speed":0.8,"phase":0.6,"opacityAmplitude":0.12} |
| ground / ground | 1 | background | `assets/stages-reprise/mother_base/ground.png` | Pas de mouvement de plan déclaré ici |
| middle / architecture | 0.12 | background | `assets/stages-reprise/mother_base/middle.png` | Pas de mouvement de plan déclaré ici |
| front / foreground | 1.12 | foreground | `assets/stages-reprise/mother_base/front.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false,"count":36,"color":"#dce5df"}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-stage-layer-data.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-stage-layer-data.js). Références déclarées dans le dépôt : [source1](https://archive.org/download/LP-Metal-Gear-Solid-Peace-Walker/Metal%20Gear%20Solid%20-%20Peace%20Walker%20%2321-2%20-%20Love%20Deterrence%20%28Uncut%20Commentary%29-59Qa8RzlBHw.mp4).

### COSTA RICA JUNGLE — `costa_rica`

**Peace Walker · P2 · présent.** Édition : Metal Gear Solid: Peace Walker, original PSP environment geometry; PlayStation 3 HD reference capture. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Ravin tropical aux rochers moussus, cascade blanche/turquoise à gauche, palmiers, fougères et sentier brun. Le plan médian et le plan eau excluent la cascade centrale ajoutée par le master. Limites : capture PS3 HD du décor PSP et adaptation de caméra latérale, pas certification des textures PSP. La caméra latérale et le zoom utilisent une extension par répétition des seules bandes de texture aux bords du sol, sans dupliquer les repères centraux. Originaux PNG conservés sans retouche.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-reprise/costa_rica/back.png` | Pas de mouvement de plan déclaré ici |
| water-corrected / ambient | 0.12 | background | `assets/stages-reprise/costa_rica/water-corrected.png` | {"xAmplitude":0.15,"yAmplitude":1.5,"speed":2.5,"phase":0,"opacityAmplitude":0.06} |
| ground / ground | 1 | background | `assets/stages-reprise/costa_rica/ground.png` | Pas de mouvement de plan déclaré ici |
| middle / architecture | 0.12 | background | `assets/stages-reprise/costa_rica/middle.png` | Pas de mouvement de plan déclaré ici |
| front / foreground | 1.12 | foreground | `assets/stages-reprise/costa_rica/front.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false,"count":36,"color":"#dce5df"}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-stage-layer-data.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-stage-layer-data.js). Références déclarées dans le dépôt : [source1](https://www.hardcoregaming101.net/wp-content/uploads/2023/05/peace-walker-ps3-66.jpg).

### CAMP OMEGA — NIGHT — `camp_omega`

**Ground Zeroes · P2 · présent.** Édition : GROUND ZEROES. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Ground Zeroes 1975 : grillage barbelé, bâtiments utilitaires et commandement, miradors, projecteurs froids, côte rocheuse humide et nuit pluvieuse conformes aux captures consultées. Caméra latérale et arrangement spatial adaptés pour le combat 2D ; ni plan topographique ni reconstitution pixel pour pixel du moteur 3D. Les objets des plans restent enregistrés sur le master ; halos alpha artificiels réduits avant validation. Aucun personnage, texte ou HUD peint. Plans placés sur un quad commun élargi, proportions originales conservées, ligne de contact alignée à y=568 ; seuls les 192 pixels de chaque bord du sol, exempts de signalétique et de marqueurs identitaires, sont répétés hors image pour couvrir les limites de caméra/zoom. Aucun objet architectural répété.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| sky / sky | 0 | background | `assets/stages-reprise/camp_omega/sky.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.4 | background | `assets/stages-reprise/camp_omega/architecture.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-reprise/camp_omega/ground.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.2 | foreground | `assets/stages-reprise/camp_omega/foreground.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"rain","enabled":true,"count":36,"color":"#a8c9e8"}`. Filets de pluie selon profondeur, impacts au sol et ruissellement seulement sur surfaces correspondantes. Les reflets et flashes suivent l’éclairage ; une pluie permanente ne prouve pas l’instant source.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-stage-layer-data.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-stage-layer-data.js). Références déclarées dans le dépôt : [source1](https://portforward.com/games/walkthroughs/Metal-Gear-Solid-V-Ground-Zeroes/metal-gear-solid-v-ground-zeroes-12-small.webp) ; [source2](https://portforward.com/games/walkthroughs/Metal-Gear-Solid-V-Ground-Zeroes/metal-gear-solid-v-ground-zeroes-1-small.webp).

### AFGHAN RUINS — `afghan_ruins`

**MGSV TPP · P2 · présent.** Édition : MGSV. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Da Smasei Laman, mission 6 Honey Bee : grotte et temple taillé dans la roche ocre, hautes colonnes, grandes niches et portes arrondies, marches usées et éclairage de chantier issus des captures. Le nom de stage générique Afghan Ruins est associé ici à cette incarnation documentée. Caméra latérale et couloir de combat adaptés, sans équivalence topographique 1:1. Le détourage image_gen réinterprète légèrement le contour des reliefs et place le projecteur secondaire environ 35 pixels sous sa position dans le master ; correction tentée et limite signalée. Le contact au sol demeure aligné sur y=568. Plans placés sur un quad commun élargi, proportions originales conservées, ligne de contact alignée à y=568 ; seuls les 192 pixels de chaque bord du sol, exempts de signalétique et de marqueurs identitaires, sont répétés hors image pour couvrir les limites de caméra/zoom. Aucun objet architectural répété.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| sky / sky | 0 | background | `assets/stages-reprise/afghan_ruins/sky.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.4 | background | `assets/stages-reprise/afghan_ruins/architecture.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-reprise/afghan_ruins/ground.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.2 | foreground | `assets/stages-reprise/afghan_ruins/foreground.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"dust","enabled":true,"count":14,"color":"#b39267"}`. Poussière lente issue de zones définies ; amplitude et opacité relevées, décroissance à l’arrêt si produite par mouvement. Distinguer poussière ambiante, fumée de dégâts et souffle d’attaque.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-stage-layer-data.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-stage-layer-data.js). Références déclarées dans le dépôt : [source1](https://www.gamepressure.com/mgs5thephantompain/gfx/word/1199296389.jpg) ; [source2](https://www.gamepressure.com/mgs5thephantompain/gfx/word/1199296405.jpg).

### OKB ZERO — `okb_zero`

**MGSV TPP · P2 · présent.** Édition : MGSV. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** The Phantom Pain, mission 30, aire industrielle supérieure : vaste auvent métallique à treillis triangulé, conduites jaunes/grises, garde-corps sombres, maçonnerie sèche et montagnes afghanes sous ciel diurne. La neige de la définition historique est abandonnée visuellement. Caméra de combat et disposition des éléments reprojectées à partir des captures ; adaptation au plus proche, sans prétendre à une cartographie 1:1. Plans placés sur un quad commun élargi, proportions originales conservées, ligne de contact alignée à y=568 ; seuls les 192 pixels de chaque bord du sol, exempts de signalétique et de marqueurs identitaires, sont répétés hors image pour couvrir les limites de caméra/zoom. Aucun objet architectural répété.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| sky / sky | 0 | background | `assets/stages-reprise/okb_zero/sky.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.4 | background | `assets/stages-reprise/okb_zero/architecture.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-reprise/okb_zero/ground.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.2 | foreground | `assets/stages-reprise/okb_zero/foreground.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"dust","enabled":true,"count":12,"color":"#b6a484"}`. Poussière lente issue de zones définies ; amplitude et opacité relevées, décroissance à l’arrêt si produite par mouvement. Distinguer poussière ambiante, fumée de dégâts et souffle d’attaque.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-stage-layer-data.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-stage-layer-data.js). Références déclarées dans le dépôt : [source1](https://www.gamepressure.com/mgs5thephantompain/gfx/word/92219772.jpg) ; [source2](https://www.gamepressure.com/mgs5thephantompain/gfx/word/92219710.jpg).

### WORLD MARSHAL — `world_marshal`

**Revengeance · P2 · présent.** Édition : Metal Gear Rising: Revengeance, original Sundowner rooftop arena. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Captures originales du combat Sundowner réellement examinées : toit mouillé gris-vert, cercle blanc, lampes vertes encastrées, parapet bas et tours rectangulaires sous pluie grise. Le faux bandeau de grilles du premier master a été rejeté et supprimé par génération corrective. La perspective du cercle et la disposition précise de la ville restent adaptées à la caméra latérale ; elles ne reproduisent pas la caméra originale au pixel près. Les quatre plans conservent une même registration large de 2112 px pour couvrir caméra ±220 et zoom 0,78 sans répéter le cercle ni les lignes blanches. Le premier plan de lampes est légèrement plus large (2176 px) pour garder ses halos découpés hors champ. Animation de pluie uniquement, sans déplacer le toit. Premier plan indépendant à 2176 px et architecture à faible parallaxe pour garder les découpes intrinsèques hors champ.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| sky / sky | 0 | background | `assets/stages-reprise/world_marshal/sky.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-reprise/world_marshal/ground.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.4 | background | `assets/stages-reprise/world_marshal/architecture.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.2 | foreground | `assets/stages-reprise/world_marshal/foreground.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"rain","enabled":true,"count":34}`. Filets de pluie selon profondeur, impacts au sol et ruissellement seulement sur surfaces correspondantes. Les reflets et flashes suivent l’éclairage ; une pluie permanente ne prouve pas l’instant source.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-stage-layer-data.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-stage-layer-data.js). Références déclarées dans le dépôt : [source1](https://portforward.com/games/walkthroughs/Metal-Gear-Solid-Rising-Revengeance/metal-gear-solid-rising-revengeance-237-small.webp) ; [source2](https://portforward.com/games/walkthroughs/Metal-Gear-Solid-Rising-Revengeance/metal-gear-solid-rising-revengeance-238-small.webp).

### EXCELSUS WRECK — `pakistan_wreck`

**Revengeance · P2 · présent.** Édition : Metal Gear Rising: Revengeance, original game, Pakistan airbase after destruction of Metal Gear EXCELSUS. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Épave EXCELSUS rouge et gris sombre après destruction, blocs de béton fissuré, fumée et feu orange du duel final Armstrong. Aucun EXCELSUS intact superposé, aucune dune. Angle latéral et étendue de l’épave sont reconstruits à partir de la capture sourcée. La caméra latérale et le zoom utilisent une extension par répétition des seules bandes de texture aux bords du sol, sans dupliquer les repères centraux. Originaux PNG conservés sans retouche.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-reprise/pakistan_wreck/back.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-reprise/pakistan_wreck/ground.png` | Pas de mouvement de plan déclaré ici |
| middle / architecture | 0.12 | background | `assets/stages-reprise/pakistan_wreck/middle.png` | Pas de mouvement de plan déclaré ici |
| front / foreground | 1.12 | foreground | `assets/stages-reprise/pakistan_wreck/front.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"embers","enabled":true,"count":36,"color":"#e99a46"}`. Relever émetteurs, trajectoire, vitesse, transparence, phase et densité de l’effet embers ; les valeurs déclarées sont celles du projet. Séparer boucle ambiante et événements de combat.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-stage-layer-data.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-stage-layer-data.js). Références déclarées dans le dépôt : [source1](https://portforward.com/games/walkthroughs/Metal-Gear-Solid-Rising-Revengeance/metal-gear-solid-rising-revengeance-295-small.webp).

### OUTER HEAVEN — `outer_heaven`

**MG MSX · P2 · présent.** Édition : Metal Gear (1987), original MSX2 TX-55 hangar, empty-room adaptation. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Capture originale Metal Gear (1987) MSX2 réellement examinée : trois gros renforts trapézoïdaux, quatre équipements gris striés disposés deux de chaque côté, mur gris horizontal et sol olive à plaques répétées. Palette et arêtes de pixel sont conservées au plus proche ; la taille des blocs et la perspective frontale sont adaptées au combat latéral. Le TX-55 visible dans la capture a volontairement été retiré du master : adaptation documentée de salle vide pour éviter un second combattant figé dans le décor. Aucun hangar moderne, pont roulant ou éclairage supplémentaire inventé. Le sol a été corrigé par génération pour continuer derrière les colonnes en plein cadre. Les bandes extérieures de 192 px contiennent seulement les plaques olive et peuvent laisser des raccords de perspective visibles lors du prolongement. Premier plan indépendant à 2176 px et architecture à faible parallaxe pour garder les découpes intrinsèques hors champ. Cadrage vertical des plans arrière/sol/architecture réancré ensemble sur le point y=650 du même sol continu pour rendre les éléments canoniques visibles en caméra centrale ; la ligne de combat reste y=568. Le premier plan conserve son ancrage séparé pour rester sous les pieds. Préparation PASS9 : le rythme de luminance local est une adaptation d’auteur, sans cadence canonique établie par les captures fixes. Aucun PNG ni placement n’est modifié.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true,"sourceGroundY":650}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| sky / sky | 0 | background | `assets/stages-reprise/outer_heaven/sky.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-reprise/outer_heaven/ground.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.12 | background | `assets/stages-reprise/outer_heaven/architecture.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.2 | foreground | `assets/stages-reprise/outer_heaven/foreground.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false,"count":34}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-stage-layer-data.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-stage-layer-data.js). Références déclarées dans le dépôt : [source1](https://lparchive.org/Metal-Gear-1-2/Update%2012/23-Metal_Gear_0585.png).

### ZANZIBAR — `zanzibar`

**MG2 · P2 · présent.** Édition : Metal Gear 2: Solid Snake (1990), original MSX2 Metal Gear D hangar after destruction. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Captures originales MG2 Solid Snake MSX2 réellement examinées : variante éclairée du hangar après destruction de Metal Gear D, huit panneaux striés verts en haut du mur, bordures fines, sol teal quadrillé et riveté. Le premier master à sept panneaux a été rejeté puis corrigé à huit ; aucun Metal Gear D actif n’est peint dans cette variante vide. La perspective frontale, la densité du motif et les proportions des panneaux sont adaptées à l’arène latérale ; cette adaptation n’est pas une reproduction de la caméra de dessus au pixel près. Le plan lointain a été corrigé pour retirer une bande de sol conservée par erreur ; le sol séparé a été prolongé derrière les murs jusqu’aux bords. Les bandes extérieures de 192 px ne contiennent que le motif de sol, avec des raccords de perspective potentiellement visibles aux caméras extrêmes. Premier plan indépendant à 2176 px et architecture à faible parallaxe pour garder les découpes intrinsèques hors champ. Cadrage vertical des plans arrière/sol/architecture réancré ensemble sur le point y=615 du même sol continu pour rendre les éléments canoniques visibles en caméra centrale ; la ligne de combat reste y=568. Le premier plan conserve son ancrage séparé pour rester sous les pieds. Soubassement mural original restauré par génération dans le plan architecture, derrière le sol séparé. Préparation PASS9 : aucune modulation de luminance n’est activée ; la fonction lumineuse des marques ocre reste inconnue. Aucun PNG ni placement n’est modifié.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true,"sourceGroundY":615}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| sky / sky | 0 | background | `assets/stages-reprise/zanzibar/sky.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-reprise/zanzibar/ground.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.12 | background | `assets/stages-reprise/zanzibar/architecture.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.2 | foreground | `assets/stages-reprise/zanzibar/foreground.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false,"count":34}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-stage-layer-data.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-stage-layer-data.js). Références déclarées dans le dépôt : [source1](https://lparchive.org/Metal-Gear-1-2/Update%2041/22-Metal_Gear_2_1515.png) ; [source2](https://lparchive.org/Metal-Gear-1-2/Update%2041/9-Metal_Gear_2_1505.png).

### GALUADE FORTRESS — `galuade`

**Ghost Babel · P2 · présent.** Édition : Metal Gear Ghost Babel2000, original Game Boy Color. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Galuade est le complexe militaire de Ghost Babel au Gindra. Palette et éléments visibles dans les captures GBC : cour tan, hangars gris-bleu, grillages verts, caisses bois. La caméra de dessus nécessite une adaptation en arène latérale. Original GBC colors and simple shapes retained; camera converted from top-down to side-on, blue sky completed for uncovered top frame, not exact source geometry. Original inherited rain/mountains/towers not supported by these captures. Ground texture outer strips extended only at runtime for extreme camera; no landmarks repeated. Tiny nearest sand-grain overlay supplies fourth depth without inventing props.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true,"sourceGroundY":742.3444444444444}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| sky / sky | 0 | background | `assets/stages-reprise/galuade/sky.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.4 | background | `assets/stages-reprise/galuade/architecture.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-reprise/galuade/ground.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.2 | foreground | `assets/stages-reprise/galuade/foreground.png` | {"xAmplitude":1,"yAmplitude":0.2,"speed":0.35,"phase":0.5} |

**Animation :** effet déclaré `{"type":"none"}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-stage-layer-data.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-stage-layer-data.js). Références déclarées dans le dépôt : [source1](https://lparchive.org/Metal-Gear-Ghost-Babel/Update%2006/4-bunker12.png) ; [source2](https://lparchive.org/Metal-Gear-Ghost-Babel/Update%2006/10-bunker17.png).

### LOBITO LAB — `lobito`

**AC!D · P2 · présent.** Édition : Metal Gear AC!D2004, original PSP. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Capture originale PSP AC!D67 réellement examinée : corridor modulaire gris-vert, trappes/ventilation noire en pied de panneaux, porte sarcelle et sol métallique quadrillé. Lobito désigne ici une adaptation du corridor attesté de la base, pas une salle de réacteur inventée. Projection et finesse des panneaux adaptées au combat latéral ; aucun duplicata exact des pixels ou de la caméra PSP. Le sol extrait a un raccord de fond environ17px plus bas que le master, couvert par la base opaque sans trou, et possède une frange alpha légère. Architecture et fond placés y=-70 pour préserver les repères hauts. Aux caméras±220/zoom0,78, une bande sombre supplémentaire de plafond reste visible ; elle est une limite de cadrage documentée. Sol élargi à2176px en conservant son ratio et la hauteur de son horizon, sans répétition ni duplication de marquages ; sa projection est donc plus large que celle du master composé. Premier plan élargi à2176px pour garder ses découpes de bords hors champ. Lumière douce animée en option, aucun mouvement de bâtiment ni météo intérieure.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| ceiling-extension / architecture | 0 | background | `assets/stages-reprise/lobito/ceiling-extension-native-pass6.png` | Pas de mouvement de plan déclaré ici |
| sky / sky | 0 | background | `assets/stages-reprise/lobito/sky.png` | {"opacityAmplitude":0.008,"speed":0.6,"phase":0} |
| ground / ground | 1 | background | `assets/stages-reprise/lobito/ground.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.12 | background | `assets/stages-reprise/lobito/architecture.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.2 | foreground | `assets/stages-reprise/lobito/foreground.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-stage-layer-data.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-stage-layer-data.js). Références déclarées dans le dépôt : [source1](https://www.hardcoregaming101.net/wp-content/uploads/2024/02/MGAcid-67.jpg).

### SAINTLOGIC CORE — `saintlogic`

**AC!D2 · P2 · présent.** Édition : Metal Gear AC!D2, original PSP. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Captures originales PSP AC!D2 79 et22 réellement examinées : sol sarcelle métallique avec lignes blanches, cloisons perforées foncées et spécimen organique diffus vert derrière vitrage. Le premier essai de master a été conservé et corrigé pour réduire une interprétation de visage trop explicite. Le label Core appartient au projet : aucune salle portant exactement ce nom n’est certifiée. Vitrages, détail du spécimen et disposition sont une adaptation latérale moderne des matières attestées ; pas une certification 1:1. Extraction de sol corrigée : dalles continuées sous les parois pour éviter des trous pendant la parallaxe. Architecture et fond placés y=-70 pour préserver les repères hauts. Aux caméras±220/zoom0,78, une bande sombre supplémentaire de plafond reste visible ; elle est une limite de cadrage documentée. Sol élargi à2176px en conservant son ratio et la hauteur de son horizon, sans répétition ni duplication de marquages ; sa projection est donc plus large que celle du master composé. Premier plan élargi à2176px pour garder ses découpes de bords hors champ. Lumière douce animée en option, aucun mouvement de bâtiment ni météo intérieure.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| ceiling-extension / architecture | 0 | background | `assets/stages-reprise/saintlogic/ceiling-extension-native-pass6.png` | Pas de mouvement de plan déclaré ici |
| sky / sky | 0 | background | `assets/stages-reprise/saintlogic/sky.png` | {"opacityAmplitude":0.008,"speed":0.6,"phase":0} |
| ground / ground | 1 | background | `assets/stages-reprise/saintlogic/ground.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.12 | background | `assets/stages-reprise/saintlogic/architecture.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.2 | foreground | `assets/stages-reprise/saintlogic/foreground.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-stage-layer-data.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-stage-layer-data.js). Références déclarées dans le dépôt : [source1](https://www.hardcoregaming101.net/wp-content/uploads/2024/02/MGAcid2-79.jpg) ; [source2](https://www.hardcoregaming101.net/wp-content/uploads/2024/02/MGAcid2-22.jpg).

### SAN HIERONYMO — `san_hieronymo`

**Portable Ops · P2 · présent.** Édition : PORTABLE OPS. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Portable Ops original PSP : bâtiments rectangulaires, enduit et pierre brun-olive, fenêtres étroites, réverbères fins, porte utilitaire gris-vert à bande rouge, pavés, relief aride et ciel jaune-or présents dans les captures consultées. Vue latérale et rue élargie adaptées au combat ; cadrage et densité de texture peinte ne reproduisent pas les pixels du rendu PSP 480×270. Sol arrière légèrement prolongé pour fermer un interstice entre plans et contact de combat conservé. HUD, Snake et soldats absents du décor. Plans placés sur un quad commun élargi, proportions originales conservées, ligne de contact alignée à y=568 ; seuls les 192 pixels de chaque bord du sol, exempts de signalétique et de marqueurs identitaires, sont répétés hors image pour couvrir les limites de caméra/zoom. Aucun objet architectural répété.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| sky / sky | 0 | background | `assets/stages-reprise/san_hieronymo/sky.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.4 | background | `assets/stages-reprise/san_hieronymo/architecture.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-reprise/san_hieronymo/ground.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.2 | foreground | `assets/stages-reprise/san_hieronymo/foreground.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"dust","enabled":true,"count":8,"color":"#b5a171"}`. Poussière lente issue de zones définies ; amplitude et opacité relevées, décroissance à l’arrêt si produite par mouvement. Distinguer poussière ambiante, fumée de dégâts et souffle d’attaque.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-stage-layer-data.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-stage-layer-data.js). Références déclarées dans le dépôt : [source1](https://www.hardcoregaming101.net/wp-content/uploads/2024/03/portableOps-57-Copy.jpg) ; [source2](https://www.hardcoregaming101.net/wp-content/uploads/2024/03/portableOps-32-Copy.jpg).

### DITE WASTELAND — `dite`

**Survive · P2 · présent.** Édition : Metal Gear Survive2018, original game. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Dite est confirmé dans Metal Gear Survive ; cette arène adapte les ruines tan/grises et la poussière des captures officielles, avec encrustations bleues modestes. Aucune preuve ne justifie un paysage violet ou un grand wormhole dans cette scène. Captured third-person camera adapted into a frontal continuous CQC floor, closest supported materials/palette rather than certified exact plan. Reference characters removed. Dust haze depth and nearest dry grass animate subtly; ground outer texture strips repeated only by runtime camera guard, not original PNG edits. Crystal Pit is a project variant, not a second canonical certified named region. Ground is painted before the separate architectural cutout, preserving complete wall bases over extended floor texture; depth coefficients and all canonical wall pixels remain unchanged. Ground matte expanded under rear ruins with image_gen to eliminate gray gaps.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true,"sourceGroundY":742.3444444444444}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| sky / sky | 0 | background | `assets/stages-reprise/dite/sky.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-reprise/dite/ground.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.4 | background | `assets/stages-reprise/dite/architecture.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.2 | foreground | `assets/stages-reprise/dite/foreground.png` | {"xAmplitude":1.2,"yAmplitude":0.4,"speed":0.3,"phase":0.7} |

**Animation :** effet déclaré `{"type":"dust","count":12,"color":"#bab3a5"}`. Poussière lente issue de zones définies ; amplitude et opacité relevées, décroissance à l’arrêt si produite par mouvement. Distinguer poussière ambiante, fumée de dégâts et souffle d’attaque.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-stage-layer-data.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-stage-layer-data.js). Références déclarées dans le dépôt : [source1](https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/543900/ss_5d4d99f94d6342a173fa88940f16ced2c1acd823.1920x1080.jpg?t=1718869280) ; [source2](https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/543900/ss_7ebfa43422388c710ae8e9d5602eab285945f0c1.1920x1080.jpg?t=1718869280).

### VR GRID — `vr_grid`

**VR Missions · P2 · présent.** Édition : MGS1 VR Missions original PS1. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Références de gameplay PS1 réellement examinées : vide noir, cubes opaques bleu-noir quadrillés, arêtes cyan, grille du sol et données cyan lointaines. Projection des deux captures adaptée au combat latéral : la disposition et la finesse moderne des arêtes ne sont pas un duplicata de la caméra PS1. Extraction de sol corrigée pour retrouver l’horizon du master. Les bandes extérieures de 192 pixels du sol ne contiennent ni personnage, objet ni signalétique ; leur texture est prolongée aux bords pour caméra±220 / zoom0,78. Animation douce des données/lumières en option, sans modifier les volumes. Premier plan indépendant placé à2176px avec bords hors champ pour éviter de révéler une découpe intrinsèque de l’image aux caméras extrêmes. Profondeur de l’architecture0,12 pour conserver ses silhouettes aux bords de la composition jusqu’à la caméra±220 et au zoom0,78. Les raccords de texture répétés à l’extérieur restent une approximation visible dans certaines vues extrêmes.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| sky / sky | 0 | background | `assets/stages-reprise/vr_grid/sky.png` | {"opacityAmplitude":0.025,"speed":0.8,"phase":0} |
| ground / ground | 1 | background | `assets/stages-reprise/vr_grid/ground.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.12 | background | `assets/stages-reprise/vr_grid/architecture.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.2 | foreground | `assets/stages-reprise/vr_grid/foreground.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-stage-layer-data.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-stage-layer-data.js). Références déclarées dans le dépôt : [source1](https://images.launchbox-app.com/854613c7-e9e3-4691-ab99-ffadbe213f89.png) ; [source2](https://images.launchbox-app.com/20ae4663-d2fe-4f3d-9f35-0502a85fb83d.jpg).

### ARSENAL CORRIDOR — `arsenal_corridor`

**MGS2 · P2 · présent.** Édition : Metal Gear Solid 2: Sons of Liberty, original PS2 Snake/Raiden/Tengu corridor. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Capture originale Substance PC2003 réellement examinée : corridor rectangulaire du combat Snake/Raiden contre Tengu, grandes colonnes gris-vert à bases trapézoïdales, coffrets mécaniques, petites lampes cyan et sol à grands panneaux. La scène ne correspond pas à l’arène circulaire Ascending Colon. La capture ne contient aucun sous-titre établissant le nom Jejunum : ce nom précis reste non certifié. La caméra frontale, les répétitions de colonnes et leur espacement sont adaptés au combat latéral. Aucun ennemi peint dans le décor, aucune météo inventée. Les bandes extérieures de 192 px du sol ne contiennent que le matériau de panneaux et ses joints ordinaires ; leur prolongement extérieur peut rendre des raccords de perspective visibles à caméra extrême. La couture centrale unique ne se répète pas. Premier plan indépendant à 2176 px et architecture à faible parallaxe pour garder les découpes intrinsèques hors champ. Cadrage vertical des plans arrière/sol/architecture réancré ensemble sur le point y=568 du même sol continu pour rendre les éléments canoniques visibles en caméra centrale ; la ligne de combat reste y=568. Le premier plan conserve son ancrage séparé pour rester sous les pieds. Source de cette capture réattribuée après vérification : le playthrough déclare employer le port PC2003 Substance (Update1). La scène et la géométrie MGS2 sont communes à la cible PS2, mais les textures/effets PS2 ne sont pas certifiés par cette capture. Preuve : https://lparchive.org/Metal-Gear-Solid-2-(Screenshot)/Update%201/ . Préparation PASS9 : le rythme de luminance local est une adaptation d’auteur, sans cadence canonique établie par les captures fixes. Aucun PNG ni placement n’est modifié.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true,"sourceGroundY":568}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| sky / sky | 0 | background | `assets/stages-reprise/arsenal_corridor/sky.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-reprise/arsenal_corridor/ground.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.12 | background | `assets/stages-reprise/arsenal_corridor/architecture.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.2 | foreground | `assets/stages-reprise/arsenal_corridor/foreground.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false,"count":34}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-stage-layer-data.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-stage-layer-data.js). Références déclarées dans le dépôt : [source1](https://lparchive.org/Metal-Gear-Solid-2-(Screenshot)/Update%2030/mgs2_106_ae8.jpg).

### GINDRAN FORTRESS — `gindran_fort`

**Ghost Babel · P2 · présent.** Édition : Metal Gear Ghost Babel2000, original Game Boy Color. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Le nom historique GINDRAN FORTRESS est conservé comme alias de projet pour Galuade en Gindra. Aucune preuve des références ne démontre une deuxième forteresse distincte. Le même ensemble de PNG source est utilisé volontairement ; ceci ne compte pas comme deux décors canoniques uniques. Original GBC colors and simple shapes retained; camera converted from top-down to side-on, blue sky completed for uncovered top frame, not exact source geometry. Original inherited rain/mountains/towers not supported by these captures. Ground texture outer strips extended only at runtime for extreme camera; no landmarks repeated. Tiny nearest sand-grain overlay supplies fourth depth without inventing props.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true,"sourceGroundY":742.3444444444444}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| sky / sky | 0 | background | `assets/stages-reprise/gindran_fort/sky.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.4 | background | `assets/stages-reprise/gindran_fort/architecture.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-reprise/gindran_fort/ground.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.2 | foreground | `assets/stages-reprise/gindran_fort/foreground.png` | {"xAmplitude":1,"yAmplitude":0.2,"speed":0.35,"phase":0.5} |

**Animation :** effet déclaré `{"type":"none"}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-stage-layer-data.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-stage-layer-data.js). Références déclarées dans le dépôt : [source1](https://lparchive.org/Metal-Gear-Ghost-Babel/Update%2006/4-bunker12.png) ; [source2](https://lparchive.org/Metal-Gear-Ghost-Babel/Update%2006/10-bunker17.png).

### SAINTLOGIC SECURITY — `saintlogic_security`

**AC!D2 · P2 · présent.** Édition : Metal Gear AC!D2, original PSP. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Captures originales PSP AC!D2 39 et41 réellement examinées : lasers de sécurité rouges, dalles sarcelle, chemin blanc/jaune, cloisons grillagées vertes, postes blancs et escalier jaune. Adaptation de la voie de sécurité attestée ; nom exact de salle Security non vérifié. Le fond opaque contenant un faux damier a été conservé puis corrigé avant intégration. Le sol PNG mesure1671px au lieu1672px pour les autres plans ; le placement conserve son ratio et cet écart inférieur0,1% ne constitue pas une certification de coordonnées byte-identiques. Architecture et fond placés y=-70 pour préserver les repères hauts. Aux caméras±220/zoom0,78, une bande sombre supplémentaire de plafond reste visible ; elle est une limite de cadrage documentée. Sol élargi à2176px en conservant son ratio et la hauteur de son horizon, sans répétition ni duplication de marquages ; sa projection est donc plus large que celle du master composé. Premier plan élargi à2176px pour garder ses découpes de bords hors champ. Lumière douce animée en option, aucun mouvement de bâtiment ni météo intérieure.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| ceiling-extension / architecture | 0 | background | `assets/stages-reprise/saintlogic_security/ceiling-extension-native-pass6.png` | Pas de mouvement de plan déclaré ici |
| sky / sky | 0 | background | `assets/stages-reprise/saintlogic_security/sky.png` | {"opacityAmplitude":0.008,"speed":0.6,"phase":0} |
| ground / ground | 1 | background | `assets/stages-reprise/saintlogic_security/ground.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.12 | background | `assets/stages-reprise/saintlogic_security/architecture.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.2 | foreground | `assets/stages-reprise/saintlogic_security/foreground.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-stage-layer-data.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-stage-layer-data.js). Références déclarées dans le dépôt : [source1](https://www.hardcoregaming101.net/wp-content/uploads/2024/02/MGAcid2-39.jpg) ; [source2](https://www.hardcoregaming101.net/wp-content/uploads/2024/02/MGAcid2-41.jpg).

### DITE CRYSTAL PIT — `dite_crystal_pit`

**Survive · P2 · présent.** Édition : Metal Gear Survive2018, original game. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** DITE CRYSTAL PIT est un nom de playground historique du projet, non confirmé comme toponyme canonique dans les sources. Variante de cour ruinée cristallisée de Dite observée dans la capture officielle ; aucune grotte fantasy ou fosse profonde inventée. Captured third-person camera adapted into a frontal continuous CQC floor, closest supported materials/palette rather than certified exact plan. Reference characters removed. Dust haze depth and nearest dry grass animate subtly; ground outer texture strips repeated only by runtime camera guard, not original PNG edits. Crystal Pit is a project variant, not a second canonical certified named region. The isolated ground texture was extended upward under the separate rear-wall cutout with image_gen to eliminate gray matte gaps; previous generated ground preserved in generation history. Ground is painted before the separate architectural cutout, preserving complete wall bases over extended floor texture; depth coefficients and all canonical wall pixels remain unchanged.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true,"sourceGroundY":742.3444444444444}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| sky / sky | 0 | background | `assets/stages-reprise/dite_crystal_pit/sky.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-reprise/dite_crystal_pit/ground.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.4 | background | `assets/stages-reprise/dite_crystal_pit/architecture.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.2 | foreground | `assets/stages-reprise/dite_crystal_pit/foreground.png` | {"xAmplitude":1.2,"yAmplitude":0.4,"speed":0.3,"phase":0.7} |

**Animation :** effet déclaré `{"type":"dust","count":12,"color":"#bab3a5"}`. Poussière lente issue de zones définies ; amplitude et opacité relevées, décroissance à l’arrêt si produite par mouvement. Distinguer poussière ambiante, fumée de dégâts et souffle d’attaque.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-stage-layer-data.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-stage-layer-data.js). Références déclarées dans le dépôt : [source1](https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/543900/ss_5d4d99f94d6342a173fa88940f16ced2c1acd823.1920x1080.jpg?t=1718869280) ; [source2](https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/543900/ss_7ebfa43422388c710ae8e9d5602eab285945f0c1.1920x1080.jpg?t=1718869280).

### SAN HIERONYMO YARD — `san_hieronymo_yard`

**Portable Ops · P2 · présent.** Édition : PORTABLE OPS. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Cour de cargaison tirée du gameplay Portable Ops original PSP : camion militaire olive bâché à gauche, conteneur rouillé orange-brun à droite, caisses bois, mur de béton industriel rugueux et grillage, terre-gravier brun. La localisation exacte Supply Depot n’étant pas démontrée par une carte de lieu, le nom de stage est une adaptation de cette cour référencée. Caméra latérale, intervalle central de combat, léger aperçu de ciel et détails de texture peinte sont adaptés ; pas de prétention cartographique ou pixel pour pixel. Étiquette du conteneur supprimée car illisible dans la source. HUD et personnages exclus. Plans placés sur un quad commun élargi, proportions originales conservées, ligne de contact alignée à y=568 ; seuls les 192 pixels de chaque bord du sol, exempts de signalétique et de marqueurs identitaires, sont répétés hors image pour couvrir les limites de caméra/zoom. Aucun objet architectural répété.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| sky / sky | 0 | background | `assets/stages-reprise/san_hieronymo_yard/sky.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.4 | background | `assets/stages-reprise/san_hieronymo_yard/architecture.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-reprise/san_hieronymo_yard/ground.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.2 | foreground | `assets/stages-reprise/san_hieronymo_yard/foreground.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"dust","enabled":true,"count":8,"color":"#a99865"}`. Poussière lente issue de zones définies ; amplitude et opacité relevées, décroissance à l’arrêt si produite par mouvement. Distinguer poussière ambiante, fumée de dégâts et souffle d’attaque.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-stage-layer-data.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-stage-layer-data.js). Références déclarées dans le dépôt : [source1](https://www.hardcoregaming101.net/wp-content/uploads/2024/03/portableOps-19-Copy.jpg).

### MOTHER BASE PLATFORM — `mother_base_platform`

**MGSV TPP · P2 · présent.** Édition : MGSV. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Diamond Dogs 1984 : réservoirs cylindriques blancs à bande rouge, emblème DD, garde-corps jaunes, structure grise, grue portuaire et pont métallique au-dessus de la mer bleue, observés dans une capture officielle Konami/Steam et le gameplay de la mission 2. La caméra et la disposition sont adaptées au combat latéral. Le logo et sa typographie restent une reproduction générée approximative, sans certification pixel pour pixel. Deux bandes de sol périphériques ont été nettoyées de leurs petites trappes avant répétition ; marquages et grille centraux conservés. Le mouvement est celui de la parallaxe de caméra, sans animation autonome de la grue ou des réservoirs. Plans placés sur un quad commun élargi, proportions originales conservées, ligne de contact alignée à y=568 ; seuls les 192 pixels de chaque bord du sol, exempts de signalétique et de marqueurs identitaires, sont répétés hors image pour couvrir les limites de caméra/zoom. Aucun objet architectural répété. Plan de mer distinct ajouté, mouvement de vague inférieur à un pixel, sans déplacement de structure ; PNG source intact.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| sky / sky | 0 | background | `assets/stages-reprise/mother_base_platform/sky.png` | Pas de mouvement de plan déclaré ici |
| ocean / ambient | 0 | background | `assets/stages-reprise/mother_base_platform/ocean.png` | {"xAmplitude":0.7,"yAmplitude":0.15,"speed":0.8,"phase":0.6,"opacityAmplitude":0.12} |
| architecture / architecture | 0.4 | background | `assets/stages-reprise/mother_base_platform/architecture.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-reprise/mother_base_platform/ground.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.2 | foreground | `assets/stages-reprise/mother_base_platform/foreground.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-stage-layer-data.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-stage-layer-data.js). Références déclarées dans le dépôt : [source1](https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/287700/ss_ace8bfa527de8621b71fa4a035ecda5b9381ed0f.1920x1080.jpg?t=1778872866) ; [source2](https://www.gamepressure.com/mgs5thephantompain/gfx/word/1028732665.jpg).

### SHADOW MOSES REFRIGERATED WAREHOUSE — `mgs1_freezer`

**MGS1 · P2 · présent.** Édition : Metal Gear Solid1998, original PlayStation game emulated; PortForward filtered source captures, native framebuffer pixels not certified. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Deux captures du jeu original MGS1 exécuté par émulateur inspectées physiquement: entrepôt de Vulcan Raven bleu-cyan glacé, conteneurs cargo géométriques givrés, murs métalliques et porte épaisse au niveau6. La camera latérale, intervalle de combat central, disposition symétrique des conteneurs et finition peinte restent adaptations. Les petites étiquettes des caisses sont approximatives, non certifiées. Aucun personnage, arme ennemie, HUD, carte ou watermark. Les4plans ont été générés distinctement avec PNG natifs RGBA intacts, tous originaux conservés. Front abaissé96unités pour lisibilité des pieds; seuls les bords ordinaires du sol glacé sans repèreidentitaire sont répétés hors cadre. Faible variation luminance0.8% ajoutée pour ambiance froide; aucune caisse ni porte n’est animée et aucune collision changée.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"sourceGroundY":742.222,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-reprise/mgs1_freezer/back.png` | {"opacityAmplitude":0.008,"speed":0.28,"phase":0} |
| architecture / architecture | 0.4 | background | `assets/stages-reprise/mgs1_freezer/architecture.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-reprise/mgs1_freezer/ground.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.2 | foreground | `assets/stages-reprise/mgs1_freezer/foreground.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass12-stage-data.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass12-stage-data.js). Références déclarées dans le dépôt : [source1](https://portforward.com/games/walkthroughs/Metal-Gear-Solid/metal-gear-solid-324-small.webp) ; [source2](https://portforward.com/games/walkthroughs/Metal-Gear-Solid/metal-gear-solid-326-small.webp).

### SHADOW MOSES TANK HANGAR — `mgs1_tank_hangar`

**MGS1 · P2 · présent.** Édition : Metal Gear Solid1998, original PlayStation tank-hangar geometry physically identified in LP sourceframes; 640x480 video reproduction and emulated PortForward capture, native framebuffer pixels not certified. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Tank Hangar PS1 : trois vues réelles physiquement inspectées (LP frames1500/1555 et PortForward196) démontrent char olive à tourelle rectangulaire et canon, longs caillebotis, escalier, garde-corps jaune terni, murs acier gris-teal, dalles, trappes et ligne blanche courbe autour du char. La silhouette latérale exacte du char (chenilles/roues/plaques) est reconstruite depuis les vues obliques/supérieures, pas extraite1:1 ; passerelle reconstituée sur toute la largeur, escalier à droite, porte arrière et sol complet relèvent de la caméra adaptée et des portions cachées. Un seul char appuyé par la source, jamais machineREX ni éditionTwinSnakes. Le sol natif corrigé par imagegen ôte les fragments de marquage des deux bandes périphériques128px avant répétition, sans répéter le cercle central ou les trappes identitaires. Ancien sol et master conservés byteexact, aucun traitement de pixels par script. Les4plans sont natifs distincts, aspects préservés ; front abaissé96 pour pieds visibles. Variation globale très faible luminance0.8% ajoutée pour ambiance ; aucun char, canon, porte ou escalier bouge, timing noncanonique. Géométrie moteur/sol 568 et collisions inchangés.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"sourceGroundY":742.344,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-reprise/mgs1_tank_hangar/back.png` | {"opacityAmplitude":0.008,"speed":0.35,"phase":0.2} |
| architecture / architecture | 0.4 | background | `assets/stages-reprise/mgs1_tank_hangar/architecture.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-reprise/mgs1_tank_hangar/ground.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.2 | foreground | `assets/stages-reprise/mgs1_tank_hangar/foreground.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass12-stage-data.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass12-stage-data.js). Références déclarées dans le dépôt : [source1](https://archive.org/download/LP-Metal-Gear-Solid/Metal%20Gear%20Solid%20%231%20-%20Tickle%20Codec%20%28Uncut%20Commentary%29-PqUvIZ-lTag.mp4) ; [source2](https://portforward.com/games/walkthroughs/Metal-Gear-Solid/metal-gear-solid-196-small.webp).

### JADE FOREST — `mgo3_jade`

**MGO3 · P2 · présent.** Édition : Metal Gear Online 3 (2015), original released Fox Engine Jade Forest, waterfall/river forest section. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Four original Fox Engine environment images by Jacob Norris, credited Kojima LA environment artist alongside Tuan Ngo, were inspected. Grey layered rocks, tall thin palms, sparse dry yellow-green grass, shallow shaded river, narrow waterfall and small rough timber bridge are sourced. Third-person viewpoints are adapted to a continuous side-on combat lane; landmark spacing and the front dirt strip are an authored CQC adaptation, not original camera or map coordinates. Native PNGs remain unedited: two layers are1671px wide, other1672px; each placement preserves its own native aspect ratio. Floor rear opaque line registered from native sourcey710 to enginey568. Only ordinary floor texture outer192px strips repeat for extreme camera; no tree, bridge, label or structural landmark repeated. Water/nearest plants have bounded authored shimmer/motion with sourceCanonicalTiming false; sky, rocks, bridge, trunks and floor stay static. Inherited mist weather is disabled because no foggy weather is established in inspected daytime source views. Root integration and actual gameplay QA still required.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-reprise/mgo3_jade/back.png` | Pas de mouvement de plan déclaré ici |
| water / ambient | 0.12 | background | `assets/stages-reprise/mgo3_jade/water.png` | {"xAmplitude":0.12,"yAmplitude":0.2,"opacityAmplitude":0.055,"speed":0.55,"phase":0.3} |
| architecture / architecture | 0.12 | background | `assets/stages-reprise/mgo3_jade/architecture.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-reprise/mgo3_jade/ground.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.12 | foreground | `assets/stages-reprise/mgo3_jade/foreground.png` | {"xAmplitude":0.6,"yAmplitude":0.15,"speed":0.3,"phase":0.6} |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass12-stage-data.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass12-stage-data.js). Références déclarées dans le dépôt : [source1](https://cdna.artstation.com/p/assets/images/images/001/312/482/large/jacob-norris-jacob-norris-metal-gear-online-04.jpg?1444156652) ; [source2](https://cdna.artstation.com/p/assets/images/images/001/312/474/large/jacob-norris-jacob-norris-metal-gear-online-01.jpg?1444156302) ; [source3](https://cdna.artstation.com/p/assets/images/images/001/312/484/large/jacob-norris-jacob-norris-metal-gear-online-05.jpg?1444156980).

### NES JUNGLE — STARTING AREA — `nes_jungle`

**MG NES · P2 · présent.** Édition : Metal Gear (1988), original Nintendo Entertainment System NES, Jungle starting area. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Unmodified714x1536source map assembled by Rick N. Bruns from actual Nintendo NES gameplay screens was inspected. Original orange-red earth with green dots, dense brightgreen/black hedges, sparse low palms and brown trunks distinguish this NES version from the MSX2 Metal Gear stage. Top-down hedge-corridor geometry is adapted to a side-on continuous CQC lane; hedge height, spacing, palette values and generated pixel scale are approximate, not source-exact pixels. The source does not establish scenic blue sky, rain or source-exact swaying foliage: opaque background stays black/darkgreen, inherited rain is disabled. Source-map labels, inventory/doors, trucks, soldiers, dog, helicopter and parachutes are deliberately absent from environment adaptation. The historical South America label in Episode Archives is not asserted as a canonically established location by this source. Ground full-width sufficiently opaque row is sourcey600 (actual minimumalpha251), registered at collisiony568; no original pixels touched. The1671pxgroundwidth differs from1672pxotherplanes and eachaspectratio is retained. Outer192px floor texture contains only ordinary orange/green soil; repetition does not duplicate props. Static hedges, palms, trunks and floor stay fixed; only nearest corner plants may move authored0.25px with sourceCanonicalTiming false. Root integration and actual gameplay QA remain required.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-reprise/nes_jungle/back.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.12 | background | `assets/stages-reprise/nes_jungle/architecture.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-reprise/nes_jungle/ground.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.12 | foreground | `assets/stages-reprise/nes_jungle/foreground.png` | {"xAmplitude":0.25,"yAmplitude":0,"speed":0.25,"phase":0.2} |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass12-stage-data.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass12-stage-data.js). Références déclarées dans le dépôt : [source1](https://nesmaps.com/maps/MetalGear/MetalGearJungleMap.png).

### FEDERAL HALL ROOFTOP — `federal_hall_rooftop`

**MGS2 · P2 · présent.** Édition : Metal Gear Solid 2 (2001) Federal Hall Solidus rooftop; source appearance is Substance PC2003, original PS2 texture/effect equivalence not certified. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Original MGS2 rooftop captures physically viewed: dark olive-grey corrugated roof, flaky weathering, aged masonry cornice and enormous adjacent Arsenal hull. Camera, roof pitch and repeated barrier proportions are adapted to side-fighting. The Washington statue stays below this arena and is omitted. Source is expressly PC2003 Substance; no originalPS2 textures/effects or pixel1:1 equivalence certified. No actors, sparks, firefight, rain or invented lighting baked in. Four generated native planes have common natural1672x941 coordinates and uniform positive scale. Opaque cloud plane supplies a bounded authored1px drift, not measured canonical timing.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"zoomMin":0.78,"zoomMax":1.08,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"sourceGroundY":780,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| sky / sky | 0 | background | `assets/stages-reprise/federal_hall_rooftop/sky.png` | {"xAmplitude":1,"yAmplitude":0,"speed":0.18,"phase":0,"opacityAmplitude":0} |
| ground / ground | 1 | background | `assets/stages-reprise/federal_hall_rooftop/ground.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.4 | background | `assets/stages-reprise/federal_hall_rooftop/architecture.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.2 | foreground | `assets/stages-reprise/federal_hall_rooftop/foreground.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false,"count":0}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass12-stage-data.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass12-stage-data.js). Références déclarées dans le dépôt : [source1](https://lparchive.org/Metal-Gear-Solid-2-(Screenshot)/Update%2034/mgs2_1_da8.jpg) ; [source2](https://lparchive.org/Metal-Gear-Solid-2-(Screenshot)/Update%2034/mgs2_5_757.jpg) ; [source3](https://lparchive.org/Metal-Gear-Solid-2-(Screenshot)/Update%2034/mgs2_403_df0.jpg) ; [source4](https://lparchive.org/Metal-Gear-Solid-2-(Screenshot)/Update%2033/mgs2_459_e25.jpg).

### DREMUCHIJ FOREST EDGE — `dremuchij_forest_edge`

**MGS3 · P2 · présent.** Édition : Metal Gear Solid 3 Subsistence (2005/2006), original PS2 Dremuchij forest before Swampland; shared Snake Eater location, camera-adapted. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Native full-frame PS2 Subsistence-era2009 gameplay physically viewed before transition to Dremuchij Swampland. Mossy trunks/roots, low fallen log, pointed yellow-green grass, dark earth/leaf litter and yellow-green dappled light anchor the scene. Original source is archive Theora400x300, with visible compression; exact texture topology cannot be certified. Fallen log/root and spatial arrangement are adapted to an unobstructed side-fighting band, not the identical3D map. Master01 tall near grass intersected contact band and is preserved rejected. Master02 lowered only near tufts; independent grass plane may sway0.45px horizontally and0.2px vertically with authored timing. No swamp water, waterfall, buildings, animals or combatants are invented. Four planes are separately generated, unedited, genuinely alpha-separated and identically registered. Architecture PNG is natively1671x941; the other planes are1672x941. All use the same positive source-pixel scale without width stretching; the one-column discrepancy remains a generated registration limit.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"zoomMin":0.78,"zoomMax":1.08,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"sourceGroundY":780,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| sky / distant | 0 | background | `assets/stages-reprise/dremuchij_forest_edge/sky.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-reprise/dremuchij_forest_edge/ground.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.4 | background | `assets/stages-reprise/dremuchij_forest_edge/architecture.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.2 | foreground | `assets/stages-reprise/dremuchij_forest_edge/foreground.png` | {"xAmplitude":0.45,"yAmplitude":0.2,"speed":0.36,"phase":0,"opacityAmplitude":0} |

**Animation :** effet déclaré `{"type":"none","enabled":false,"count":0}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass12-stage-data.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass12-stage-data.js). Références déclarées dans le dépôt : [source1](https://archive.org/download/LP_Metal_Gear_Solid_3/mgs3_02.ogv).

### GRANINY GORKI SOUTH — `mgs3_graniny_gorki_south`

**MGS3 · P2 · présent.** Édition : Metal Gear Solid 3: Subsistence, original PS2 re-release 2005/2006; Graniny Gorki South / The Fear arena. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** The Fear arena is Graniny Gorki South, NOT Sokrovenno. Three physical original PS2 2009 gameplay captures identify the source arena via The Fear HUD and show olive/brown moss trunks, crooked branching canopy and ochre-brown leaf floor. Side-on camera, trunk spacing, the continuous fighter lane and nearest fern placement are authored adaptations. Foreground fronds have a separate registration anchor715 to keep tips below feet; source-exact wind timing is unproven. All nine selected PNG layer bytes are native generation copies without crop, resize, mirror or manual pixel edits. Individual1672/1673 widths and940/941 heights remain intact; metadata placement preserves native aspect ratios. Native floor full-width alpha contact is registered to engine568 with no collision change. Only ordinary outer192px floor texture may repeat at extreme camera; no landmark repeated. Weather disabled because inspected source does not establish weather. Closest supported artistic reconstruction; absolute1:1 is not certified. Root integration and actual module/game browser QA remain pending.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / distant | 0 | background | `assets/stages-reprise/mgs3_graniny_gorki_south/back.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.26 | background | `assets/stages-reprise/mgs3_graniny_gorki_south/architecture.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-reprise/mgs3_graniny_gorki_south/ground.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.12 | foreground | `assets/stages-reprise/mgs3_graniny_gorki_south/foreground.png` | {"xAmplitude":0.45,"yAmplitude":0.1,"speed":0.25,"phase":0.6} |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass12-stage-data.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass12-stage-data.js). Références déclarées dans le dépôt : [source1](https://archive.org/download/LP_Metal_Gear_Solid_3/mgs3_24.mp4#t=220) ; [source2](https://archive.org/download/LP_Metal_Gear_Solid_3/mgs3_24.mp4#t=225) ; [source3](https://archive.org/download/LP_Metal_Gear_Solid_3/mgs3_24.mp4#t=230).

### CHYORNAYA PESHCHERA — `mgs3_chyornaya_peshchera`

**MGS3 · P2 · présent.** Édition : Metal Gear Solid 3: Subsistence, original PS2 re-release 2005/2006; Chyornaya Peshchera cave lake / The Pain arena. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** The Pain cave lake is Chyornaya Peshchera in original PS2 2009 gameplay captures: dim grey-green moss cave rocks, dull jade/olive lake and rounded central and right island rocks. The first master mistakenly interpreted a boss-swarm shape as a brown plant; it is preserved as rejected and master02 removes it by native ImageGen. All retained islands are empty. Upper cave surface is a restrained continuation of visible dark rock, not a surveyed ceiling geometry. Side-on camera, continuous foreground rocky shoreline, island spacing and nearest stone placement are authored adaptations. Water highlights drift/shimmer minutely with authored timing; walls, rocks and floor stay static. All nine selected PNG layer bytes are native generation copies without crop, resize, mirror or manual pixel edits. Individual1672/1673 widths and940/941 heights remain intact; metadata placement preserves native aspect ratios. Native floor full-width alpha contact is registered to engine568 with no collision change. Only ordinary outer192px floor texture may repeat at extreme camera; no landmark repeated. Weather disabled because inspected source does not establish weather. Closest supported artistic reconstruction; absolute1:1 is not certified. Root integration and actual module/game browser QA remain pending.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / distant | 0 | background | `assets/stages-reprise/mgs3_chyornaya_peshchera/back.png` | Pas de mouvement de plan déclaré ici |
| water / ambient | 0.12 | background | `assets/stages-reprise/mgs3_chyornaya_peshchera/water.png` | {"xAmplitude":0.1,"yAmplitude":0.1,"opacityAmplitude":0.035,"speed":0.42,"phase":0.3} |
| architecture / architecture | 0.12 | background | `assets/stages-reprise/mgs3_chyornaya_peshchera/architecture.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-reprise/mgs3_chyornaya_peshchera/ground.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.12 | foreground | `assets/stages-reprise/mgs3_chyornaya_peshchera/foreground.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass12-stage-data.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass12-stage-data.js). Références déclarées dans le dépôt : [source1](https://archive.org/download/LP_Metal_Gear_Solid_3/mgs3_24.mp4#t=132) ; [source2](https://archive.org/download/LP_Metal_Gear_Solid_3/mgs3_24.mp4#t=145) ; [source3](https://archive.org/download/LP_Metal_Gear_Solid_3/mgs3_24.mp4#t=170).

### REX UNDERGROUND HANGAR — MGS1 — `mgs1_rex_hangar`

**MGS1 · P1 · présent.** Édition : Metal Gear Solid (1998), original PlayStation-era Shadow Moses underground REX hangar / servicewell arena; source capture hardware unspecified. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Four physically inspected existing IA native640x480 video thumbnails, original MGS1 portions of mixed-original/TwinSnakes LP14-2 at200/272/338/683s, establish dark rectangular steel panel floor with inset hatches/seams, central octagonal servicewell/hatch, tall squared steel columns, horizontal gallery, short repeated rectangular wall recesses and large diagonal braces above lower door bays. The selected frames visibly use originalPS1era lowpolygon models/textures/HUD; capture hardware/emulator/PC port unknown. TwinSnakes frames physically discovered in same LP are preserved but excluded from prompts and catalogue references. No new large video downloaded. Empty room reconstructed, active REX, actors, combat sparks, firing, UI and logos excluded. Side-on projection, bay spacing, continuous front fightlane and servicewell positioned behind fighters are authored adaptations, not exact original map coordinates. Master and seven native attempts preserved. Selected back02 natively corrects duplicated nearest outer columns in back01; selected architecture02 natively shortens column bases from source464 to421, closer to master435 but not exact. Native original dimensions preserved: architecture02 is1671x941, other selected planes1672x941, each rectangle uniformly scales its own ratio. No pixel crop/resample/mirror/manual edit. Native source680 anchors back/frame/floor to engineground568; floor begins fullwidth alpha>=200 at503 and remains continuous through combat line680 (minimum249) and bottom. Foreground anchor775 places its highest source839 tips around634, below feet. Architecture native alpha edges showed thin cyan fringe isolated against black; read-only saturatedcyan count alpha>25 was0, which is not a composite QA claim. Root must review actual column/floor contact, wall occlusion, alpha edges and extreme-camera repeats. All rigid steel and floor remain static; temporal ambient light/smoke timing not established from stills, no invented animation or weather. Reconstructed source-compatible texture character, not literal original texels or certified absolute1:1. Future-stage accepted_closest candidate excluded from frozen pass12eight; Root actual composite/integration/game QA pending. PASS14 reuses all four native selected PNG bytes without pixel mutation. Existing cool illuminated column-base appearance supports only a very small authored 2.5% local dimming; original temporal flicker/period is not established. Four 32x32 native windows affect only cyan-selected architecture pixels, add no emitting geometry/halo/weather, and remain fixed under pause, preview or reduced motion. Core lens remains fixed x800/zoom0.81; no invented camera sway. Preview camera extremes are synthetic renderer checks. Read-only any-alpha inspection found faint foreground residues above the intended native839 tips, so Core clips REX foreground to displayY609..720 without mutating the PNG. All game targets, dimensions, attacks, timing, saves and replays are unchanged.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / distant | 0 | background | `assets/stages-reprise/mgs1_rex_hangar/back.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.15 | background | `assets/stages-reprise/mgs1_rex_hangar/architecture.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-reprise/mgs1_rex_hangar/ground.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.12 | foreground | `assets/stages-reprise/mgs1_rex_hangar/foreground.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Mise sous tension, mouvements de REX, explosion du radôme, Gray Fox et perte de contrôle : séquences évènementielles, pas animation de fond cyclique.

**Écart spécifique :** Hangar REX MGS1 : relever plateforme, passerelles et points d’accès. REX détruit MGS4 doit avoir une fiche distincte.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass14-rex-stage-data.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass14-rex-stage-data.js). Références déclarées dans le dépôt : [source1](https://archive.org/download/LP-Metal-Gear-Solid/LP-Metal-Gear-Solid.thumbs/Metal%20Gear%20Solid%20%2314-2%20-%20Barmor%20%28Uncut%20Commentary%29-5ew1z0L8k-w_000200.jpg) ; [source2](https://archive.org/download/LP-Metal-Gear-Solid/LP-Metal-Gear-Solid.thumbs/Metal%20Gear%20Solid%20%2314-2%20-%20Barmor%20%28Uncut%20Commentary%29-5ew1z0L8k-w_000272.jpg) ; [source3](https://archive.org/download/LP-Metal-Gear-Solid/LP-Metal-Gear-Solid.thumbs/Metal%20Gear%20Solid%20%2314-2%20-%20Barmor%20%28Uncut%20Commentary%29-5ew1z0L8k-w_000338.jpg) ; [source4](https://archive.org/download/LP-Metal-Gear-Solid/LP-Metal-Gear-Solid.thumbs/Metal%20Gear%20Solid%20%2314-2%20-%20Barmor%20%28Uncut%20Commentary%29-5ew1z0L8k-w_000683.jpg).

### RAXA TEST HANGAR — PORTABLE OPS PSP2006 — `mpo_raxa_test_hangar`

**Portable Ops · P1 · présent.** Édition : Metal Gear Solid Portable Ops (2006), original PSP RAXA boss fight inside test hangar; exact captured hardware/region unknown. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Original RAXA arena is an enclosed pale sage-green hangar: repeated wall seams/vertical clamps, triangular upper steel roof trusses, short white overhead lamps, light mint-gray metal slab floor with rectangular recessed tracks, dark olive corrugated cargo containers with small light plates. Physical original game captures at7387/7715/8045/8209/8373/8539s establish this room; streamer overlays, actors, robot and gun/explosion effects excluded. The existing Core procedural outdoor site is retained underneath opaque new base, not treated as a canonical source. Four newly generated native PNGs copied unchanged; side-on projection, room bay spacing and two containers moved to rear outer sides are authored adaptations, not literal original map coordinates or exact PSP texels. All four native images1672x941. Base/floor source760 maps to shared568 and final Portable fightground600 at existing camera800/.72. Native containers were generated lower than requested: whole-plane presentation registration835 places intact container bottoms652..655 at rear room floor580..583 equivalent; no crop/resample/pixel mutation. Foreground source760 shares exact floor registration; strong top809 lies around640.09 below actual feet600; existing runtime foregroundClipY609 excludes faint upper alpha residues without PNG editing. Ground native alpha252..253 at walkrow760 is nearly opaque; faint isolated alpha/color edge residues above actual floor and around containers are retained and require composite review. Empty centre remains clear; containers are background, not colliders. Four horizontal planes with three physically distinct depths0/.18/1; floor and foreground track rims share depth1, original Core camera remains fixed, no invented sway. Narrow ordinary outer160px floor strips may repeat only for synthetic extreme-camera coverage; actual fixed camera covers whole native rectangle. No stage weather or structural motion added. Static captures do not establish flicker, smoke or timing, so original constant white lights remain static; existing combat VFX remain engine-authored, and explicit engine-frame presentation time supports pause/reduced motion safely. Absolute1:1 and original temporal patterns are not certified.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / distant | 0 | background | `assets/stages-reprise/mpo_raxa_test_hangar/back.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-reprise/mpo_raxa_test_hangar/ground.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.18 | background | `assets/stages-reprise/mpo_raxa_test_hangar/architecture.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1 | foreground | `assets/stages-reprise/mpo_raxa_test_hangar/foreground.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décollage, ombres au sol, chaleur des propulseurs, atterrissage puis état endommagé ; préparer plans masquants qui suivent le bon z-order.

**Écart spécifique :** Usine de RAXA : placer le prototype et ses quatre appuis à partir de la scène Portable Ops, conserver l’ouverture vers son espace de vol.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass15-mpo-stage-data.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass15-mpo-stage-data.js). Références déclarées dans le dépôt : [source1](https://archive.org/download/5-12-24-ratclowncar-metal-gear-solid-portable-ops-psp-2006-part-4/5-12-24-ratclowncar-metal-gear-solid-portable-ops-psp-2006-part-4.thumbs/%5B5-12-24%5D%20ratclowncar%20-%20%20Metal%20Gear%20Solid%EF%BC%9A%20Portable%20Ops%20%5BPSP%5D%20%282006%29%20%EF%BD%9C%20PART%204_007387.jpg) ; [source2](https://archive.org/download/5-12-24-ratclowncar-metal-gear-solid-portable-ops-psp-2006-part-4/5-12-24-ratclowncar-metal-gear-solid-portable-ops-psp-2006-part-4.thumbs/%5B5-12-24%5D%20ratclowncar%20-%20%20Metal%20Gear%20Solid%EF%BC%9A%20Portable%20Ops%20%5BPSP%5D%20%282006%29%20%EF%BD%9C%20PART%204_007715.jpg) ; [source3](https://archive.org/download/5-12-24-ratclowncar-metal-gear-solid-portable-ops-psp-2006-part-4/5-12-24-ratclowncar-metal-gear-solid-portable-ops-psp-2006-part-4.thumbs/%5B5-12-24%5D%20ratclowncar%20-%20%20Metal%20Gear%20Solid%EF%BC%9A%20Portable%20Ops%20%5BPSP%5D%20%282006%29%20%EF%BD%9C%20PART%204_008045.jpg) ; [source4](https://archive.org/download/5-12-24-ratclowncar-metal-gear-solid-portable-ops-psp-2006-part-4/5-12-24-ratclowncar-metal-gear-solid-portable-ops-psp-2006-part-4.thumbs/%5B5-12-24%5D%20ratclowncar%20-%20%20Metal%20Gear%20Solid%EF%BC%9A%20Portable%20Ops%20%5BPSP%5D%20%282006%29%20%EF%BD%9C%20PART%204_008209.jpg).

### Lobito — entrepôt BRC-026 — `p18_acid_lobito_entrepot`

**AC!D · P2 · présent.** Édition : Metal Gear AC!D (2004/2005), original PSP gameplay reproduced by Something Awful illustrated walkthrough; captured hardware not certified. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Original reference and native PNG physically inspected for the specific original scene. Specific BRC-026 warehouse from original PSP: dense rows of dark olive/gray ribbed freight containers on black/brown steel supports, rough olive-gray concrete floor, a pair of rusty orange-brown barrels, dark metal wall panels and a green-lit exit sign visible in partial source but omit text. Preserve ribbed cargo geometry and its murky gray-green palette; remove corpses, blood, fighters, HUD, dialogue portraits and cards. The canonical room is BRC-026 storehouse, not an invented icy lab. Source partial occlusion and top-down camera mean side-on corridor spacing is adapted. Far tile only blank room envelope; cargo rows/steel supports belong in isolated architecture tile, not duplicated behind it. Four native atlas planes preserved byte-for-byte. Runtime bounded sourceRect excludes unused panel separators; alpha borders remain unedited. Actual full PNG 1672x941, cropped native plane sizes recorded separately, below historical1672-wide individual planes. Backing color explicitly opaque; native alpha is not claimed uniformly opaque. Side-on projection, hidden surfaces and combat lane adapted. Alpha-defined floor contact registered to568, camera extension repeats only ordinary outer floor texture. Full game composite/fighter-foot QA remains pending; no absolute1:1 topography or canonical temporal animation certification.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/acid-lobito-entrepot/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/acid-lobito-entrepot/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/acid-lobito-entrepot/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/acid-lobito-entrepot/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://lpix.org/3073784/MGA_03200.jpg) ; [source2](https://lpix.org/3073762/MGA_03174.jpg).

### Lobito — pont-levis — `p18_acid_lobito_passerelle`

**AC!D · P2 · présent.** Édition : Metal Gear AC!D original PSP. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Original reference and native PNG physically inspected for the specific original scene. Original PSP drawbridge with single raised leaf described explicitly by native walkthrough. Source shows a long narrow pale gray square-slab roadway with thin black vertical metal rails on BOTH edges over black-green water, dark rock banks and rainy night illumination. Preserve the low simple metal balusters, slab sizes, near-black water and natural cliffs, no giant sci-fi machinery. The fighting-game horizontal side camera is adapted from the original diagonal top-down source. Far tile only distant rain-dark cliffs and water, architecture tile isolated rail/bridge support corners, ground tile continuous pale gray slab pavement contact79percent, foreground sparse lower corner rail ends. No characters, HUD, cards, lighting diagrams or icons. Four native atlas planes preserved byte-for-byte. Runtime bounded sourceRect excludes unused panel separators; alpha borders remain unedited. Actual full PNG 1672x941, cropped native plane sizes recorded separately, below historical1672-wide individual planes. Backing color explicitly opaque; native alpha is not claimed uniformly opaque. Side-on projection, hidden surfaces and combat lane adapted. Alpha-defined floor contact registered to568, camera extension repeats only ordinary outer floor texture. Full game composite/fighter-foot QA remains pending; no absolute1:1 topography or canonical temporal animation certification. Visible original rain is reproduced as restrained optional runtime weather; temporal particle trajectories authored, not extracted.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/acid-lobito-passerelle/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/acid-lobito-passerelle/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/acid-lobito-passerelle/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/acid-lobito-passerelle/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"rain","enabled":true,"count":26,"color":"#a4b3bd","sourceReferenceURLs":["https://lpix.org/3117802/MGA_03357.jpg"],"authoredMotionNotSourceFrameTiming":true}`. Filets de pluie selon profondeur, impacts au sol et ruissellement seulement sur surfaces correspondantes. Les reflets et flashes suivent l’éclairage ; une pluie permanente ne prouve pas l’instant source.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://lpix.org/3117802/MGA_03357.jpg).

### Ebro Tower — salle de l’usine — `p18_acid_tour_ebro_salle`

**AC!D · P2 · présent.** Édition : Metal Gear AC!D (2004/2005), original PSP gameplay reproduced by Something Awful illustrated walkthrough; captured hardware not certified. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Original reference and native PNG physically inspected for the specific original scene. Specific Ebro Tower factory room from original PSP: olive-brown rectangular segmented metal wall panels, a solid gray riveted service door with small high ventilation slots, dark gray grid metal floors, red/orange strips along wall/floor junction, elevated grating with pale yellow rail at the lower corner. Preserve this military industrial interior, NOT an office/bookcase from a different level, NOT a gothic tower. No Clown, red/blue guards, Snake, HUD, cards, portraits or signage. Far tile contains distant wall panels only; isolated door supports, narrow corner rail and raised grating architecture only in second tile; uninterrupted grid floor ground. Side-on room layout is adapted from original source geometry; named factory is canonically established by source walkthrough. Four native atlas planes preserved byte-for-byte. Runtime bounded sourceRect excludes unused panel separators; alpha borders remain unedited. Actual full PNG 1672x941, cropped native plane sizes recorded separately, below historical1672-wide individual planes. Backing color explicitly opaque; native alpha is not claimed uniformly opaque. Side-on projection, hidden surfaces and combat lane adapted. Alpha-defined floor contact registered to568, camera extension repeats only ordinary outer floor texture. Full game composite/fighter-foot QA remains pending; no absolute1:1 topography or canonical temporal animation certification.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/acid-tour-ebro-salle/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/acid-tour-ebro-salle/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/acid-tour-ebro-salle/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/acid-tour-ebro-salle/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://lpix.org/3261261/MGA_03621.jpg) ; [source2](https://lpix.org/3261266/MGA_03627.jpg).

### SaintLogic — installation — `p18_acid2_saintlogic_installation`

**AC!D2 · P2 · présent.** Édition : Metal Gear ACID2 original PSP2005. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Original reference and native PNG physically inspected for the specific original scene. Original ACID2 SaintLogic installation early training room appearance: strongly saturated yellow-orange modular wall panels at left, adjoining cool gray metal panel wall at right, gray floor in wide square grid of fine riveted rectangular seams, narrow yellow boundary/aisle stripes and a few simple green/steel barrier edges. Source has yellow move-overlay squares which are UI: omit those translucent selection overlays entirely, preserve neutral original metal floor beneath. No player, enemies, button glyphs, menu, card icons, arrows orHUD. Do not borrow teal specimen lab or pink restroom: specific simple amber training-area architecture from this actual PSP source, side-on safe combat camera and hidden wall completion qualified. Four native atlas planes preserved byte-for-byte. Runtime bounded sourceRect excludes unused panel separators; alpha borders remain unedited. Actual full PNG 1672x941, cropped native plane sizes recorded separately, below historical1672-wide individual planes. Backing color explicitly opaque; native alpha is not claimed uniformly opaque. Side-on projection, hidden surfaces and combat lane adapted. Alpha-defined floor contact registered to568, camera extension repeats only ordinary outer floor texture. Full game composite/fighter-foot QA remains pending; no absolute1:1 topography or canonical temporal animation certification.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/acid2-saintlogic-installation/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/acid2-saintlogic-installation/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/acid2-saintlogic-installation/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/acid2-saintlogic-installation/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://www.hardcoregaming101.net/wp-content/uploads/2024/02/MGAcid2-16.jpg).

### SaintLogic — passerelle de sécurité — `p18_acid2_saintlogic_passerelle`

**AC!D2 · P2 · présent.** Édition : Metal Gear AC!D 2 (2005/2006), original PSP gameplay screenshot; exact source hardware not certified. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Original reference and native PNG physically inspected for the specific original scene. Original screenshot shows green-gray sheet-metal partitions with black vertical columns, two dark rectangular wall-mounted screens, elevated green grating and a short YELLOW staircase with yellow rails at rear. Preserve those specific visible materials, not specimen tanks from a different lab or a generic sci-fi bridge. Full side-on composition and unseen rail continuity are a fighting-game adaptation; no canonical named passerelle map is certified. Omit yellow movement arrows/cards, blue turn cube, Snake/guards, text and HUD. In distant tile keep only far green-gray room envelope; put the isolated partitions/screens/yellow rear stair in architecture tile ONLY, not duplicated behind them. Four native atlas planes preserved byte-for-byte. Runtime bounded sourceRect excludes unused panel separators; alpha borders remain unedited. Actual full PNG 1672x941, cropped native plane sizes recorded separately, below historical1672-wide individual planes. Backing color explicitly opaque; native alpha is not claimed uniformly opaque. Side-on projection, hidden surfaces and combat lane adapted. Alpha-defined floor contact registered to568, camera extension repeats only ordinary outer floor texture. Full game composite/fighter-foot QA remains pending; no absolute1:1 topography or canonical temporal animation certification.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/acid2-saintlogic-passerelle/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/acid2-saintlogic-passerelle/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/acid2-saintlogic-passerelle/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/acid2-saintlogic-passerelle/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://www.hardcoregaming101.net/wp-content/uploads/2024/02/MGAcid2-41.jpg).

### Galuade — chambre GANDER phase2 — `p18_ghost_galuade_cellule_gander`

**Ghost Babel · P2 · présent.** Édition : Metal Gear Ghost Babel original GameBoyColor2000. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Original reference and native PNG physically inspected for the specific original scene. Actual original GameBoyColor GANDER second-phase chamber: very dark near-black and purple-gray ruined industrial floor, scattered flat jagged violet-gray plate fragments, compact olive-green rectangular ribbed cargo stacks and muted violet vent grilles at outer edge, diagonal pale-yellow hazard stripes down left wall edge. Omit GANDER entirely because articulated boss rendered separately, no replacement giant silhouette; omit Snake, HUD, missiles and explosion. Preserve sparse ruined floor and original violet/green/yellow palette. Background only dark hangar envelope supported by partly obscured source; no bright modern factory, red magma or enormous fictional machinery. Horizontal safe combat lane adapted from original debris zone. Four native atlas planes preserved byte-for-byte. Runtime bounded sourceRect excludes unused panel separators; alpha borders remain unedited. Actual full PNG 1672x941, cropped native plane sizes recorded separately, below historical1672-wide individual planes. Backing color explicitly opaque; native alpha is not claimed uniformly opaque. Side-on projection, hidden surfaces and combat lane adapted. Alpha-defined floor contact registered to568, camera extension repeats only ordinary outer floor texture. Full game composite/fighter-foot QA remains pending; no absolute1:1 topography or canonical temporal animation certification. Generated v1 kept as rejected candidate: it reproduced a boss railgun as a diagonal beam. Corrected v2 removes that boss weapon; boss remains separate articulated entity.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/ghost-galuade-cellule-gander/planes-v2.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/ghost-galuade-cellule-gander/planes-v2.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/ghost-galuade-cellule-gander/planes-v2.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/ghost-galuade-cellule-gander/planes-v2.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://lparchive.org/Metal-Gear-Ghost-Babel/Update%2043/24-metalgear30.png).

### Galuade — chambre de Pyro Bison — `p18_ghost_galuade_complexe_thermique`

**Ghost Babel · P2 · présent.** Édition : Metal Gear Ghost Babel original GameBoyColor2000. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Original reference and native PNG physically inspected for the specific original scene. Actual original GameBoyColor Pyro Bison industrial arena: deep teal/dark green flat steel room with repeated rectangular panel outlines, multiple cobalt-blue cargo blocks with pale lightblue barred grilles and horizontal vent slats in staggered source arrangement. Preserve blue cargo versus green steel distinct palette. No orange lava or giant furnace inferred from boss name. No flamethrower, enemies, HUD or red flames. 2.5D empty room with all identified cargo behind safe fighting lane; sparse blue grated floor edge foreground. Four native atlas planes preserved byte-for-byte. Runtime bounded sourceRect excludes unused panel separators; alpha borders remain unedited. Actual full PNG 1672x941, cropped native plane sizes recorded separately, below historical1672-wide individual planes. Backing color explicitly opaque; native alpha is not claimed uniformly opaque. Side-on projection, hidden surfaces and combat lane adapted. Alpha-defined floor contact registered to568, camera extension repeats only ordinary outer floor texture. Full game composite/fighter-foot QA remains pending; no absolute1:1 topography or canonical temporal animation certification.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/ghost-galuade-complexe-thermique/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/ghost-galuade-complexe-thermique/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/ghost-galuade-complexe-thermique/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/ghost-galuade-complexe-thermique/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://lparchive.org/Metal-Gear-Ghost-Babel/Update%2028/15-bison13.png).

### Galuade — clairière de Slasher Hawk — `p18_ghost_galuade_cour_logistique`

**Ghost Babel · P2 · présent.** Édition : Metal Gear Ghost Babel original GameBoyColor2000. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Original reference and native PNG physically inspected for the specific original scene. Actual original GameBoyColor Slasher Hawk arena: open pale golden yellow sandy clearing, orange-brown low rocky rim across far edge, vivid lime green grass strip at sides, dark green dense hedge at left. Preserve simple source yellow sand, orange cliff and bright green rim. Project legacy name logistics courtyard is not proof of warehouse: do not invent crates, hangars or factories. Specific boss clearing side-on projection. Omit Slasher, Snake, hawk, boomerangs, HUD and icons. Four native atlas planes preserved byte-for-byte. Runtime bounded sourceRect excludes unused panel separators; alpha borders remain unedited. Actual full PNG 1672x941, cropped native plane sizes recorded separately, below historical1672-wide individual planes. Backing color explicitly opaque; native alpha is not claimed uniformly opaque. Side-on projection, hidden surfaces and combat lane adapted. Alpha-defined floor contact registered to568, camera extension repeats only ordinary outer floor texture. Full game composite/fighter-foot QA remains pending; no absolute1:1 topography or canonical temporal animation certification. Generated v1 preserved as rejected empty-architecture candidate. Corrected v2 isolates cliff/hedge in populated architecture tile; distant source also retains cliff projection, parallax duplication qualified for runtime QA.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/ghost-galuade-cour-logistique/planes-v2.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/ghost-galuade-cour-logistique/planes-v2.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/ghost-galuade-cour-logistique/planes-v2.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/ghost-galuade-cour-logistique/planes-v2.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://lparchive.org/Metal-Gear-Ghost-Babel/Update%2013/20-slasherhawk21.png).

### Galuade — piste et entrée GANDER — `p18_ghost_galuade_hangar_gander`

**Ghost Babel · P2 · présent.** Édition : Metal Gear Ghost Babel original GameBoyColor2000. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Original reference and native PNG physically inspected for the specific original scene. Actual original GameBoyColor first phase GANDER chase approach: almost-black deep green runway road, straight lighter green broken center lane markers, narrow green verge/rail line at left, sparse dark industrial envelope. This is distinct chase approach before violet ruined second-phase chamber. Preserve dark green runway and green lane lines. Omit GANDER body/feet/railgun entirely, Snake, blast, HUD, portraits and all weapons. Do not invent red reactor or bright hangar complex. Side camera completion of unobserved far wall is minimal darkgreen fence/structure. Horizontal combat road with narrow deepgreen floor; no hazards. Four native atlas planes preserved byte-for-byte. Runtime bounded sourceRect excludes unused panel separators; alpha borders remain unedited. Actual full PNG 1672x941, cropped native plane sizes recorded separately, below historical1672-wide individual planes. Backing color explicitly opaque; native alpha is not claimed uniformly opaque. Side-on projection, hidden surfaces and combat lane adapted. Alpha-defined floor contact registered to568, camera extension repeats only ordinary outer floor texture. Full game composite/fighter-foot QA remains pending; no absolute1:1 topography or canonical temporal animation certification.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/ghost-galuade-hangar-gander/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/ghost-galuade-hangar-gander/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/ghost-galuade-hangar-gander/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/ghost-galuade-hangar-gander/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://lparchive.org/Metal-Gear-Ghost-Babel/Update%2043/11-metalgear19.png).

### Galuade — salle de Marionette Owl — `p18_ghost_galuade_salle_des_marionnettes`

**Ghost Babel · P2 · présent.** Édition : Metal Gear Ghost Babel original GameBoyColor2000. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Original reference and native PNG physically inspected for the specific original scene. Actual original GameBoyColor Marionette Owl gameplay reference shows dark green checkerboard fighting-room floor under night-sight display, alternating broad darkforest and olivegreen squares, near-black surrounding room. Preserve visible source checkerboard and intentionally dark sparse room; no theatrical stage, red curtains, puppet workshop, medieval arches or invented laboratory. No dolls, fighters, portraits, dialogue or HUD. Unseen upper wall remains simple dark room completion, not certified source geometry. Floor plane uninterrupted checkerboard with safe horizontal lane; foreground only very small dark floor-edge corners. Four native atlas planes preserved byte-for-byte. Runtime bounded sourceRect excludes unused panel separators; alpha borders remain unedited. Actual full PNG 1672x941, cropped native plane sizes recorded separately, below historical1672-wide individual planes. Backing color explicitly opaque; native alpha is not claimed uniformly opaque. Side-on projection, hidden surfaces and combat lane adapted. Alpha-defined floor contact registered to568, camera extension repeats only ordinary outer floor texture. Full game composite/fighter-foot QA remains pending; no absolute1:1 topography or canonical temporal animation certification. Only THREE populated native depth planes are used. Empty architecture tile is omitted instead of counted as art; original dark checker room has sparse decoration.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/ghost-galuade-salle-des-marionnettes/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/ghost-galuade-salle-des-marionnettes/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/ghost-galuade-salle-des-marionnettes/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://lparchive.org/Metal-Gear-Ghost-Babel/Update%2021/2-owl11.png).

### Outer Heaven Coward Duck hostage block — `p18_mg1_outer_heaven_bloc_des_captifs`

**MG MSX · P2 · présent.** Édition : Metal Gear1987 original MSX2. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Original reference and native PNG physically inspected for the specific original scene. Copy original 1987 Coward Duck room: strong warm ochre/brown repeated diagonal square floor tiles, gray ribbed metallic wall border, simple dark door recess at the back, paired tall gray-X crate stacks left and right in the back corners. The brown yellow room is distinct from the green detention room. No hostages or duck. Preserve brown tiles and gray crates visible in source; side-view camera is a fighting adaptation. No modern cell bars, torture racks or invented machinery. Four native atlas planes preserved byte-for-byte. Runtime bounded sourceRect excludes unused panel separators; alpha borders remain unedited. Actual full PNG 1672x941, cropped native plane sizes recorded separately, below historical1672-wide individual planes. Backing color explicitly opaque; native alpha is not claimed uniformly opaque. Side-on projection, hidden surfaces and combat lane adapted. Alpha-defined floor contact registered to568, camera extension repeats only ordinary outer floor texture. Full game composite/fighter-foot QA remains pending; no absolute1:1 topography or canonical temporal animation certification.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/mg1-outer-heaven-bloc-des-captifs/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/mg1-outer-heaven-bloc-des-captifs/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/mg1-outer-heaven-bloc-des-captifs/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/mg1-outer-heaven-bloc-des-captifs/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://lparchive.org/Metal-Gear-1-2/Update%2011/46-Metal_Gear_0505.png).

### Outer Heaven — cour du Hind D — `p18_mg1_outer_heaven_cour`

**MG MSX · P2 · présent.** Édition : Metal Gear original MSX1987 (not NES remake). Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Original reference and native PNG physically inspected for the specific original scene. Outer Heaven original1987 MSX Hind D courtyard. Blue-gray square patterned tiled floor, green stacked wooden X-braced cargo crates arranged in staggered left and right groups, dark gray perimeter walls and low gray railing at near edge. Source top-down layout adapted to side-on combat. Remove helicopter, Snake, HUD, projectile icons. Preserve visible original palette and crate placement landmarks. Rear courtyard no invented rusty shipping containers or yellow desert walls. Fully horizontal blue-gray patterned combat-floor plane; sparse foreground edge railing only bottom corners. Four native atlas planes preserved byte-for-byte. Runtime bounded sourceRect excludes unused panel separators; alpha borders remain unedited. Actual full PNG 1672x941, cropped native plane sizes recorded separately, below historical1672-wide individual planes. Backing color explicitly opaque; native alpha is not claimed uniformly opaque. Side-on projection, hidden surfaces and combat lane adapted. Alpha-defined floor contact registered to568, camera extension repeats only ordinary outer floor texture. Full game composite/fighter-foot QA remains pending; no absolute1:1 topography or canonical temporal animation certification.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/mg1-outer-heaven-cour/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/mg1-outer-heaven-cour/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/mg1-outer-heaven-cour/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/mg1-outer-heaven-cour/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://thesnakesoup.org/junkimg/guides/mg/08.gif).

### Outer Heaven solitary detention / Shoot Gunner arena — `p18_mg1_outer_heaven_detention`

**MG MSX · P2 · présent.** Édition : Metal Gear1987 original MSX2. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Original reference and native PNG physically inspected for the specific original scene. Copy the distinctive nearly black and green brick room and green coarse stippled floor from the supplied original frame. Metal ribbed wall edging, utilitarian dull gray metallic shipping crates with X-braced rectangular faces, visible crates forming an L along the right edge. Keep original green/black palette, simple enclosed rectangular layout, not a modern prison or futuristic corridor. A side-view adaptation of those original overhead bricks and crate walls. No prisoner, boss or Snake. Four native atlas planes preserved byte-for-byte. Runtime bounded sourceRect excludes unused panel separators; alpha borders remain unedited. Actual full PNG 1672x941, cropped native plane sizes recorded separately, below historical1672-wide individual planes. Backing color explicitly opaque; native alpha is not claimed uniformly opaque. Side-on projection, hidden surfaces and combat lane adapted. Alpha-defined floor contact registered to568, camera extension repeats only ordinary outer floor texture. Full game composite/fighter-foot QA remains pending; no absolute1:1 topography or canonical temporal animation certification.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/mg1-outer-heaven-detention/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/mg1-outer-heaven-detention/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/mg1-outer-heaven-detention/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/mg1-outer-heaven-detention/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://lparchive.org/Metal-Gear-1-2/Update%2004/14-Metal_Gear_0172.png).

### Outer Heaven Fire Trooper narrow heat gallery — `p18_mg1_outer_heaven_galerie_thermique`

**MG MSX · P2 · présent.** Édition : Metal Gear1987 original MSX2. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Original reference and native PNG physically inspected for the specific original scene. Original dark green-black brick enclosed room with vertical brick wall recesses, dark green back door shaped with diagonally outlined crossed reinforcement, speckled green floor and gray X-face metal crates across the near edge. Copy simple original 1987 green palette and construction from actual screenshot. This is Fire Troopers actual room, not a factory furnace. Do not invent boilers, molten steel, fireplaces or huge flames: the original fire comes from the character who is absent. Preserve gray ribbed wall edge and dark brick texture. Four native atlas planes preserved byte-for-byte. Runtime bounded sourceRect excludes unused panel separators; alpha borders remain unedited. Actual full PNG 1672x941, cropped native plane sizes recorded separately, below historical1672-wide individual planes. Backing color explicitly opaque; native alpha is not claimed uniformly opaque. Side-on projection, hidden surfaces and combat lane adapted. Alpha-defined floor contact registered to568, camera extension repeats only ordinary outer floor texture. Full game composite/fighter-foot QA remains pending; no absolute1:1 topography or canonical temporal animation certification.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/mg1-outer-heaven-galerie-thermique/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/mg1-outer-heaven-galerie-thermique/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/mg1-outer-heaven-galerie-thermique/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/mg1-outer-heaven-galerie-thermique/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://lparchive.org/Metal-Gear-1-2/Update%2008/30-Metal_Gear_0355.png).

### Outer Heaven Machinegun Kid gunpost room — `p18_mg1_outer_heaven_poste_de_tir`

**MG MSX · P2 · présent.** Édition : Metal Gear1987 original MSX2. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Original reference and native PNG physically inspected for the specific original scene. Exactly the original deep cobalt/blue square-tiled room with three long parallel tall gray ribbed rectangular cover blocks, metallic gray walls, small closed door in the far wall. Original blue floor squares and three gray ribbed slab structures are the identifying landmarks. Interpret overhead slab cover geometry faithfully in a side-view lane with the three structures receding behind the fighting floor; do not create yellow warning stripes, screens, turrets, firing range targets or sandbags. Four native atlas planes preserved byte-for-byte. Runtime bounded sourceRect excludes unused panel separators; alpha borders remain unedited. Actual full PNG 1672x940, cropped native plane sizes recorded separately, below historical1672-wide individual planes. Backing color explicitly opaque; native alpha is not claimed uniformly opaque. Side-on projection, hidden surfaces and combat lane adapted. Alpha-defined floor contact registered to568, camera extension repeats only ordinary outer floor texture. Full game composite/fighter-foot QA remains pending; no absolute1:1 topography or canonical temporal animation certification.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/mg1-outer-heaven-poste-de-tir/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/mg1-outer-heaven-poste-de-tir/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/mg1-outer-heaven-poste-de-tir/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/mg1-outer-heaven-poste-de-tir/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://lparchive.org/Metal-Gear-1-2/Update%2005/29-Metal_Gear_0220.png).

### Outer Heaven — salle des deux Brad — `p18_mg1_outer_heaven_salle_brad`

**MG MSX · P2 · présent.** Édition : Metal Gear original MSX1987 (not NES remake). Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Original reference and native PNG physically inspected for the specific original scene. Original1987 MSX twin Brad machine boss room: deep cobalt-blue repeating steel panel floor, gray brick perimeter wall, two blue rectangular rear doors each with black slit grilles, THREE parallel horizontal rows of long gray X-braced crates, gray left inset service recess. Preserve these distinctive three crate rows and paired rear doors; adapt rows to behind the clear front combat lane. Omit both green Brad cyborgs, Snake, HUD and projectile sprites. Do not replace by green detention or pale blue Machinegun Kid room. Four native atlas planes preserved byte-for-byte. Runtime bounded sourceRect excludes unused panel separators; alpha borders remain unedited. Actual full PNG 1672x940, cropped native plane sizes recorded separately, below historical1672-wide individual planes. Backing color explicitly opaque; native alpha is not claimed uniformly opaque. Side-on projection, hidden surfaces and combat lane adapted. Alpha-defined floor contact registered to568, camera extension repeats only ordinary outer floor texture. Full game composite/fighter-foot QA remains pending; no absolute1:1 topography or canonical temporal animation certification.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/mg1-outer-heaven-salle-brad/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/mg1-outer-heaven-salle-brad/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/mg1-outer-heaven-salle-brad/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/mg1-outer-heaven-salle-brad/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://thesnakesoup.org/junkimg/guides/mg/14.gif).

### Zanzibar Land — chambre du duel Gray Fox — `p18_mg2_champ_de_mines_duel_gray_fox`

**MG2 · P2 · présent.** Édition : Metal Gear2 Solid Snake original MSX2 1990, Gray Fox final fistfight chamber. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Original reference and native PNG physically inspected for the specific original scene. Actual original Gray Fox fistfight arena is a compact enclosed charcoal steel chamber: cyan-gray riveted square floor panels in regular grid, dark gray horizontal rear vent panels with tiny yellow lamp strips, narrow steel sidewalls with vertical red-lit segments. Preserve enclosed indoor room, avoid a generic outdoor dirt minefield despite legacy project ID. Small dangerous outer strip omitted from safe combat lane, hidden hazards disabled. No fighters, mine icons, HUD, portraits or dialogue. 2.5D front combat floor broad enough but same source materials and chamber landmarks. Four native atlas planes preserved byte-for-byte. Runtime bounded sourceRect excludes unused panel separators; alpha borders remain unedited. Actual full PNG 1672x941, cropped native plane sizes recorded separately, below historical1672-wide individual planes. Backing color explicitly opaque; native alpha is not claimed uniformly opaque. Side-on projection, hidden surfaces and combat lane adapted. Alpha-defined floor contact registered to568, camera extension repeats only ordinary outer floor texture. Full game composite/fighter-foot QA remains pending; no absolute1:1 topography or canonical temporal animation certification.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/mg2-champ-de-mines-duel-gray-fox/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/mg2-champ-de-mines-duel-gray-fox/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/mg2-champ-de-mines-duel-gray-fox/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/mg2-champ-de-mines-duel-gray-fox/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://lparchive.org/Metal-Gear-1-2/Update%2041/26-Metal_Gear_2_1520.png).

### Zanzibar Land — arsenal du duel final Big Boss — `p18_mg2_zanzibar_arsenal_final`

**MG2 · P2 · présent.** Édition : Metal Gear2 Solid Snake original MSX2 1990. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Original reference and native PNG physically inspected for the specific original scene. Original MSX2 Big Boss final arsenal arena: charcoal slatted steel rear wall, TWO tall gray panel doors framed yellow/black, dark steel floor mixing gridded grated panels and riveted square tiles, central pair of pale angled console covers with green indicator strips above green vertical cylinders and black lattice rack. Preserve source twin-door and twin-console distinction, not Night Sight single-door room. No Big Boss, Snake, fire, HUD, icons. Central consoles stay behind the playable lane, horizontal gray steel fighting floor. Four native atlas planes preserved byte-for-byte. Runtime bounded sourceRect excludes unused panel separators; alpha borders remain unedited. Actual full PNG 1672x941, cropped native plane sizes recorded separately, below historical1672-wide individual planes. Backing color explicitly opaque; native alpha is not claimed uniformly opaque. Side-on projection, hidden surfaces and combat lane adapted. Alpha-defined floor contact registered to568, camera extension repeats only ordinary outer floor texture. Full game composite/fighter-foot QA remains pending; no absolute1:1 topography or canonical temporal animation certification.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/mg2-zanzibar-arsenal-final/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/mg2-zanzibar-arsenal-final/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/mg2-zanzibar-arsenal-final/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/mg2-zanzibar-arsenal-final/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://lparchive.org/Metal-Gear-1-2/Update%2042/8-Metal_Gear_2_1581.png).

### Zanzibar Land Black Color / Black Ninja office arena — `p18_mg2_zanzibar_bureau_ninja`

**MG2 · P2 · présent.** Édition : Metal Gear2 Solid Snake original1990MSX2. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Original reference and native PNG physically inspected for the specific original scene. Faithfully use the original pale blue-teal metallic room: long repeating blue-gray grid floor tiles, pale cyan paneled rear wall with black vents under upper yellow-black strips, simple tall center door with red switch. In the middle background preserve the square ring of white-gray low crate/desk units around an empty rectangle. Keep original simple cyan palette and floor grid; no samurai decorations, neon sci-fi tech, office computers, paintings or bookcases. Modern painted treatment must preserve original block shapes rather than become an unrelated room. Four native atlas planes preserved byte-for-byte. Runtime bounded sourceRect excludes unused panel separators; alpha borders remain unedited. Actual full PNG 1672x941, cropped native plane sizes recorded separately, below historical1672-wide individual planes. Backing color explicitly opaque; native alpha is not claimed uniformly opaque. Side-on projection, hidden surfaces and combat lane adapted. Alpha-defined floor contact registered to568, camera extension repeats only ordinary outer floor texture. Full game composite/fighter-foot QA remains pending; no absolute1:1 topography or canonical temporal animation certification.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/mg2-zanzibar-bureau-ninja/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/mg2-zanzibar-bureau-ninja/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/mg2-zanzibar-bureau-ninja/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/mg2-zanzibar-bureau-ninja/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://lparchive.org/Metal-Gear-1-2/Update%2021/36-Metal_Gear_2_0107.png).

### Zanzibar Land — champ de Jungle Evil — `p18_mg2_zanzibar_jungle_embuscade`

**MG2 · P2 · présent.** Édition : Metal Gear2 Solid Snake original MSX2 1990, Jungle Evil/Predator actual crop-field battle. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Original reference and native PNG physically inspected for the specific original scene. Actual Jungle Evil/Predator ambush battlefield in original MSX2 Metal Gear2 is an ochre/yellow dense field of dry crops enclosed by low ochre boundary, with multiple small stacked yellow rectangular barriers in offset groups, dark amber earth, almost no tall trees in the source. Preserve original actual field rather than interpreting project jungle label as generic rainforest. Rectangular yellow stacks in same source grouping, layered dry crops behind combat lane. No modern green forest, HUD, enemy, Snake or projectile icons. Horizontal yellow-brown fighting lane adapted from original crop field. Four native atlas planes preserved byte-for-byte. Runtime bounded sourceRect excludes unused panel separators; alpha borders remain unedited. Actual full PNG 1672x941, cropped native plane sizes recorded separately, below historical1672-wide individual planes. Backing color explicitly opaque; native alpha is not claimed uniformly opaque. Side-on projection, hidden surfaces and combat lane adapted. Alpha-defined floor contact registered to568, camera extension repeats only ordinary outer floor texture. Full game composite/fighter-foot QA remains pending; no absolute1:1 topography or canonical temporal animation certification.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/mg2-zanzibar-jungle-embuscade/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/mg2-zanzibar-jungle-embuscade/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/mg2-zanzibar-jungle-embuscade/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/mg2-zanzibar-jungle-embuscade/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://lparchive.org/Metal-Gear-1-2/Update%2036/25-Metal_Gear_2_1209.png).

### Zanzibar Land — forteresse — `p18_mg2_zanzibar_land_forteresse`

**MG2 · P2 · présent.** Édition : Metal Gear2 Solid Snake original MSX2 1990. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Original reference and native PNG physically inspected for the specific original scene. Original Zanzibar Land exterior fort courtyard: flat ochre olive earth with small yellow flecks, weathered pale-gray concrete walls, green flat-roofed square gatehouse at center with vertically barred dark door, yellow/black narrow warning stripe on an upper passage, plain functional Soviet perimeter structures. Preserve MSX2 original green gatehouse roof and gray/olive palette, no generic futuristic fortress. Empty courtyard, original top-down proportions translated side-on. Four native atlas planes preserved byte-for-byte. Runtime bounded sourceRect excludes unused panel separators; alpha borders remain unedited. Actual full PNG 1672x941, cropped native plane sizes recorded separately, below historical1672-wide individual planes. Backing color explicitly opaque; native alpha is not claimed uniformly opaque. Side-on projection, hidden surfaces and combat lane adapted. Alpha-defined floor contact registered to568, camera extension repeats only ordinary outer floor texture. Full game composite/fighter-foot QA remains pending; no absolute1:1 topography or canonical temporal animation certification.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/mg2-zanzibar-land-forteresse/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/mg2-zanzibar-land-forteresse/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/mg2-zanzibar-land-forteresse/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/mg2-zanzibar-land-forteresse/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://lparchive.org/Metal-Gear-1-2/Update%2037/1-Metal_Gear_2_1247.png).

### Zanzibar Land Running Man chase room — `p18_mg2_zanzibar_salle_de_poursuite`

**MG2 · P2 · présent.** Édition : Metal Gear2 Solid Snake original1990MSX2. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Original reference and native PNG physically inspected for the specific original scene. Faithfully copy plain light-gray metallic chase room in actual original source: compact square grid tiles, gray sheet-steel bulkhead walls, small ventilation slot near base on the right, two gray box-like wall projections along the right side, simple rear/front doors. The room has a recessed segment at the upper right. Entire palette nearly gray and charcoal, not blue or yellow. Preserve those modest utility room details; no running track, gas dispensers, athletic markings, fans, consoles or random obstacles invented. Camera side-view with open central combat floor. Four native atlas planes preserved byte-for-byte. Runtime bounded sourceRect excludes unused panel separators; alpha borders remain unedited. Actual full PNG 1672x940, cropped native plane sizes recorded separately, below historical1672-wide individual planes. Backing color explicitly opaque; native alpha is not claimed uniformly opaque. Side-on projection, hidden surfaces and combat lane adapted. Alpha-defined floor contact registered to568, camera extension repeats only ordinary outer floor texture. Full game composite/fighter-foot QA remains pending; no absolute1:1 topography or canonical temporal animation certification.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/mg2-zanzibar-salle-de-poursuite/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/mg2-zanzibar-salle-de-poursuite/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/mg2-zanzibar-salle-de-poursuite/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/mg2-zanzibar-salle-de-poursuite/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://lparchive.org/Metal-Gear-1-2/Update%2023/26-Metal_Gear_2_0286.png).

### Zanzibar Land — salle de Red Blaster — `p18_mg2_zanzibar_salle_des_filets`

**MG2 · P2 · présent.** Édition : Metal Gear 2 Solid Snake original MSX2 (1990). Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Original reference and native PNG physically inspected for the specific original scene. Original Red Blaster arena: mustard/light-yellow panel walls, pale buff tiled floor, large black rectangular pits and thin white overhead net strands, black raised rear strip. Empty arena, omit original characters, HUD and collectible icons. Preserve distinct orthogonal pits as lateral-background structures and the visible wall panel proportions. Combat lane solid consistent pale buff floor in foreground; black pit placement necessarily adapted for safe 2.5D combat and must not replace identity with a generic warehouse. Four native atlas planes preserved byte-for-byte. Runtime bounded sourceRect excludes unused panel separators; alpha borders remain unedited. Actual full PNG 1672x941, cropped native plane sizes recorded separately, below historical1672-wide individual planes. Backing color explicitly opaque; native alpha is not claimed uniformly opaque. Side-on projection, hidden surfaces and combat lane adapted. Alpha-defined floor contact registered to568, camera extension repeats only ordinary outer floor texture. Full game composite/fighter-foot QA remains pending; no absolute1:1 topography or canonical temporal animation certification.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/mg2-zanzibar-salle-des-filets/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/mg2-zanzibar-salle-des-filets/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/mg2-zanzibar-salle-des-filets/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/mg2-zanzibar-salle-des-filets/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://lparchive.org/Metal-Gear-1-2/Update%2026/33-Metal_Gear_2_0471.png).

### Zanzibar Land — salle de Night Sight — `p18_mg2_zanzibar_salle_obscure`

**MG2 · P2 · présent.** Édition : Metal Gear 2 Solid Snake original MSX2 (1990). Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Original reference and native PNG physically inspected for the specific original scene. Original Night Sight arena: black charcoal metal walls and gray rectangular steel-panel floor, tiny orange warning lamps across rear wall, broad dark central oblong bulkhead, left rack with small green rectangles above red and white controls, yellow-striped rear door. Preserve this industrial room arrangement and dark original palette; omit original characters, HUD and collectible icons. Side-on combat floor without the central bulkhead blocking the fighters. Four native atlas planes preserved byte-for-byte. Runtime bounded sourceRect excludes unused panel separators; alpha borders remain unedited. Actual full PNG 1672x941, cropped native plane sizes recorded separately, below historical1672-wide individual planes. Backing color explicitly opaque; native alpha is not claimed uniformly opaque. Side-on projection, hidden surfaces and combat lane adapted. Alpha-defined floor contact registered to568, camera extension repeats only ordinary outer floor texture. Full game composite/fighter-foot QA remains pending; no absolute1:1 topography or canonical temporal animation certification.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/mg2-zanzibar-salle-obscure/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/mg2-zanzibar-salle-obscure/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/mg2-zanzibar-salle-obscure/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/mg2-zanzibar-salle-obscure/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://lparchive.org/Metal-Gear-1-2/Update%2038/7-Metal_Gear_2_1313.png).

### Abkhazie — aire urbaine Khamsin — `p18_mgr_abkhazie_carriere_khamsin`

**Revengeance · P2 · présent.** Édition : Metal Gear Rising: Revengeance (2013), original Blade Wolf DLC final Khamsin fight; secondary original gameplay capture, exact platform not certified. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Original reference and native PNG physically inspected for the specific original scene. Original Blade Wolf DLC Khamsin fight occurs on a damaged ABKHAZIAN CITY STREET, not a mine quarry. Preserve cracked gray asphalt, pale stone pavement blocks/curb, right weathered tan stone civic building with broad external stone steps, nearby trees with dark bare branches and sparse green leaves, tall thin utility poles with overhead wires, left distant stone column/post, gray cloudy sky and rising smoke. A dark burned vehicle is on distant street center-left with small orange fire; keep that distant and static, do not include machine. No Khamsin mech, Blade Wolf, axe, weapons, HUD or watermark. Far tile sky/distant smoke only; isolated building steps/tree trunks/utility poles in second tile; continuous worn asphalt third; tiny corner rubble fourth. Core legacy quarry ID is kept for compatibility but its title should expose the actual street arena; exact native topology or unseen architecture is not certified. Four native atlas planes preserved byte-for-byte. Runtime bounded sourceRect excludes unused panel separators; alpha borders remain unedited. Actual full PNG 1672x941, cropped native plane sizes recorded separately, below historical1672-wide individual planes. Backing color explicitly opaque; native alpha is not claimed uniformly opaque. Side-on projection, hidden surfaces and combat lane adapted. Alpha-defined floor contact registered to568, camera extension repeats only ordinary outer floor texture. Full game composite/fighter-foot QA remains pending; no absolute1:1 topography or canonical temporal animation certification. Source PNG leaves sky alpha gaps; physically reviewed original mist/overcast sky supplies an explicit neutral backing color, no image pixels edited. Native atlas sky is not falsely claimed opaque.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/mgr-abkhazie-carriere-khamsin/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/mgr-abkhazie-carriere-khamsin/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/mgr-abkhazie-carriere-khamsin/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/mgr-abkhazie-carriere-khamsin/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://portforward.com/games/walkthroughs/Metal-Gear-Rising-Blade-Wolf-DLC/metal-gear-rising-blade-wolf-dlc-75-small.webp).

### Abkhazie — cour occupée par Desperado — `p18_mgr_abkhazie_cour_desperado`

**Revengeance · P2 · présent.** Édition : Metal Gear Rising Revengeance (2013), original R01 Abkhazian gameplay, exact platform unspecified. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Original reference and native PNG physically inspected for the specific original scene. Original Abkhazian occupied courtyard from original R01 game views, preserved weathered red brick and gray stone buildings, broad wooden doors, tall square stone columns and dark covered arcade openings, worn gray slab/asphalt ground, raised pale block tree planter curb with a large trunk and rough green ground plants, one rusty blue-gray barrel at a corner. Source contains both exterior occupied street and adjacent interior arcaded building; use exterior courtyard materials with the arcades as distant structure, no invented named Desperado map. Core explicitly represents an authored lateral composition, not exact original boss arena. Remove Raiden, NPCs, weapons, blood, HUD, map and watermark. Far tile just far wall silhouette/light; isolated arcade columns/tree planter/door framing secondtile; uninterrupted rough gray floor third; sparse barrel/rubble corners fourth. No huge mech or fake underground lab. Four native atlas planes preserved byte-for-byte. Runtime bounded sourceRect excludes unused panel separators; alpha borders remain unedited. Actual full PNG 1672x941, cropped native plane sizes recorded separately, below historical1672-wide individual planes. Backing color explicitly opaque; native alpha is not claimed uniformly opaque. Side-on projection, hidden surfaces and combat lane adapted. Alpha-defined floor contact registered to568, camera extension repeats only ordinary outer floor texture. Full game composite/fighter-foot QA remains pending; no absolute1:1 topography or canonical temporal animation certification.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/mgr-abkhazie-cour-desperado/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/mgr-abkhazie-cour-desperado/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/mgr-abkhazie-cour-desperado/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/mgr-abkhazie-cour-desperado/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://portforward.com/games/walkthroughs/Metal-Gear-Solid-Rising-Revengeance/metal-gear-solid-rising-revengeance-47-medium.webp) ; [source2](https://portforward.com/games/walkthroughs/Metal-Gear-Solid-Rising-Revengeance/metal-gear-solid-rising-revengeance-38-medium.webp).

### Abkhazie — raffinerie de Mistral — `p18_mgr_abkhazie_installation_industrielle`

**Revengeance · P2 · présent.** Édition : Metal Gear Rising: Revengeance (2013), original R01 Mistral refinery boss fight; secondary original gameplay capture, exact platform not certified. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Original reference and native PNG physically inspected for the specific original scene. Original Mistral refinery arena: massive cylindrical weathered gray steel storage vats, thick black and rust brown pipes/elbows, vertical support pillars, yellow rear safety rail, black-red striped industrial barrels, broad dark round steel-panel fighting platform with circular recessed hatch and long grated channels. Night cloudy teal-gray sky and restrained distant industrial lights, fire only a faint warm reflection from the phase-two source, never a wall of flames. Preserve these exact heavy cylindrical forms, no modern skyscraper plaza or EXCELSUS wreck. Far tile just cloudy night and distant refinery silhouettes/lights; distinct nearby tanks/pipes and yellow perimeter rail ONLY isolated architecture, not duplicated behind themselves. Remove Mistral, Raiden, Dwarf Gekkos, torn polearm parts, gore, sparks, HUD and watermark. Source first circular floor and subsequent factory phase are partial original views; side-on level geometry is authored with no hidden collision or playable upper floor. Four native atlas planes preserved byte-for-byte. Runtime bounded sourceRect excludes unused panel separators; alpha borders remain unedited. Actual full PNG 1672x941, cropped native plane sizes recorded separately, below historical1672-wide individual planes. Backing color explicitly opaque; native alpha is not claimed uniformly opaque. Side-on projection, hidden surfaces and combat lane adapted. Alpha-defined floor contact registered to568, camera extension repeats only ordinary outer floor texture. Full game composite/fighter-foot QA remains pending; no absolute1:1 topography or canonical temporal animation certification.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/mgr-abkhazie-installation-industrielle/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/mgr-abkhazie-installation-industrielle/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/mgr-abkhazie-installation-industrielle/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/mgr-abkhazie-installation-industrielle/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://portforward.com/games/walkthroughs/Metal-Gear-Solid-Rising-Revengeance/metal-gear-solid-rising-revengeance-105-medium.webp) ; [source2](https://portforward.com/games/walkthroughs/Metal-Gear-Solid-Rising-Revengeance/metal-gear-solid-rising-revengeance-116-medium.webp).

### Badlands — duel Jetstream Sam — `p18_mgr_badlands_duel_sam`

**Revengeance · P2 · présent.** Édition : Metal Gear Rising: Revengeance (2013), original released R06 Badlands Sam boss fight; source platform not independently certified. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Original reference and native PNG physically inspected for the specific original scene. Exact original Sam fight: dark brown rocky dirt plain with patches of thin straw grass, several isolated big rough GRAY-BROWN BOULDERS, low brown hill ridge, distant lattice ELECTRICITY PYLONS and horizontal power lines, smoky ochre-orange sunset sky. Not a road with generic wind turbines. All blue sword arcs, sparks, blood, fighters, HUD and watermark are gameplay overlays and must be excluded. Far tile hill silhouettes/sky/pylons only; isolated mid-distance boulders ONLY second tile, uninterrupted earth lane third, sparse dry grass at corner fourth. Source scale and sunset palette are crucial; lateral layout and hidden ground continue as authored camera adaptation. Four native atlas planes preserved byte-for-byte. Runtime bounded sourceRect excludes unused panel separators; alpha borders remain unedited. Actual full PNG 1672x941, cropped native plane sizes recorded separately, below historical1672-wide individual planes. Backing color explicitly opaque; native alpha is not claimed uniformly opaque. Side-on projection, hidden surfaces and combat lane adapted. Alpha-defined floor contact registered to568, camera extension repeats only ordinary outer floor texture. Full game composite/fighter-foot QA remains pending; no absolute1:1 topography or canonical temporal animation certification.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/mgr-badlands-duel-sam/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/mgr-badlands-duel-sam/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/mgr-badlands-duel-sam/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/mgr-badlands-duel-sam/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://portforward.com/games/walkthroughs/Metal-Gear-Solid-Rising-Revengeance/metal-gear-solid-rising-revengeance-253-medium.webp) ; [source2](https://portforward.com/games/walkthroughs/Metal-Gear-Solid-Rising-Revengeance/metal-gear-solid-rising-revengeance-254-medium.webp).

### Denver — avenue R03 — `p18_mgr_denver_avenue`

**Revengeance · P2 · présent.** Édition : Metal Gear Rising: Revengeance (2013), original released game geometry in PortForward gameplay screenshots; exact platform not certified. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Original reference and native PNG physically inspected for the specific original scene. Original R03 Mile High Denver street: a straight weathered gray asphalt avenue with broken white dashed center line, modern gray glass office blocks, narrow pavement curbs, thin ornate dark streetlights, a low PEDESTRIAN OVERPASS with twin wide straight staircases at its edges, black-white police cars parked at distant road edges, one dark red heavy truck further back. Preserve the overpass silhouette and downtown gray cloudy light. Do not use World Marshal rooftop, Monsoon arena, Asian temple or futuristic neon. No soldiers, Raiden, weapons, codec portrait, UI, logos or police lettering. Distant tile skyline/clouds only; road-edge overpass/stairs and small distant parked vehicles in isolated architecture tile; uninterrupted asphalt fighting floor. Four native atlas planes preserved byte-for-byte. Runtime bounded sourceRect excludes unused panel separators; alpha borders remain unedited. Actual full PNG 1672x941, cropped native plane sizes recorded separately, below historical1672-wide individual planes. Backing color explicitly opaque; native alpha is not claimed uniformly opaque. Side-on projection, hidden surfaces and combat lane adapted. Alpha-defined floor contact registered to568, camera extension repeats only ordinary outer floor texture. Full game composite/fighter-foot QA remains pending; no absolute1:1 topography or canonical temporal animation certification.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/mgr-denver-avenue/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/mgr-denver-avenue/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/mgr-denver-avenue/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/mgr-denver-avenue/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://portforward.com/games/walkthroughs/Metal-Gear-Solid-Rising-Revengeance/metal-gear-solid-rising-revengeance-156-medium.webp) ; [source2](https://portforward.com/games/walkthroughs/Metal-Gear-Solid-Rising-Revengeance/metal-gear-solid-rising-revengeance-157-medium.webp).

### World Marshal — esplanade sous la pluie — `p18_mgr_world_marshal_esplanade`

**Revengeance · P2 · présent.** Édition : Metal Gear Rising: Revengeance (2013), original released game geometry in PortForward gameplay screenshots; exact platform not certified. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Original reference and native PNG physically inspected for the specific original scene. Exact original Monsoon boss plaza in front of World Marshal: wet reflective dark charcoal pavement with broad recessed grating lines, modern dark glass facade with vertical ribs and heavy concrete base, low rectangular perimeter wall with wide louvered vent panels, huge modern glass skyline buildings above that boundary, gray stormclouds and visible rain. Preserve the wet gray metallic plaza rather than Sundowner rooftop and helipad. No Monsoon, Raiden, vehicles in flight, purple electricity, blood, red ripper glow, UI or watermark. Far tile sky/distant skyline only; concrete perimeter/louvered sections and glass entrance panels isolated in architecture tile, not duplicated in backdrop. Ground only wet dark reflective slabs, sparse corner drain fragments foreground. Match original rain-gray illumination; optional actual rain animation may be added separately by runtime, not moving the building. Four native atlas planes preserved byte-for-byte. Runtime bounded sourceRect excludes unused panel separators; alpha borders remain unedited. Actual full PNG 1672x941, cropped native plane sizes recorded separately, below historical1672-wide individual planes. Backing color explicitly opaque; native alpha is not claimed uniformly opaque. Side-on projection, hidden surfaces and combat lane adapted. Alpha-defined floor contact registered to568, camera extension repeats only ordinary outer floor texture. Full game composite/fighter-foot QA remains pending; no absolute1:1 topography or canonical temporal animation certification. Visible original rain is reproduced as restrained optional runtime weather; temporal particle trajectories authored, not extracted.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/mgr-world-marshal-esplanade/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/mgr-world-marshal-esplanade/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/mgr-world-marshal-esplanade/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/mgr-world-marshal-esplanade/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"rain","enabled":true,"count":26,"color":"#a4b3bd","sourceReferenceURLs":["https://portforward.com/games/walkthroughs/Metal-Gear-Solid-Rising-Revengeance/metal-gear-solid-rising-revengeance-188-medium.webp","https://portforward.com/games/walkthroughs/Metal-Gear-Solid-Rising-Revengeance/metal-gear-solid-rising-revengeance-190-medium.webp","https://portforward.com/games/walkthroughs/Metal-Gear-Solid-Rising-Revengeance/metal-gear-solid-rising-revengeance-196-medium.webp"],"authoredMotionNotSourceFrameTiming":true}`. Filets de pluie selon profondeur, impacts au sol et ruissellement seulement sur surfaces correspondantes. Les reflets et flashes suivent l’éclairage ; une pluie permanente ne prouve pas l’instant source.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://portforward.com/games/walkthroughs/Metal-Gear-Solid-Rising-Revengeance/metal-gear-solid-rising-revengeance-188-medium.webp) ; [source2](https://portforward.com/games/walkthroughs/Metal-Gear-Solid-Rising-Revengeance/metal-gear-solid-rising-revengeance-190-medium.webp) ; [source3](https://portforward.com/games/walkthroughs/Metal-Gear-Solid-Rising-Revengeance/metal-gear-solid-rising-revengeance-196-medium.webp).

### Bolshaya Past — crevasse du duel Ocelot — `p18_mgs3_bolshaya_past_crevasse`

**MGS3 · P2 · présent.** Édition : Metal Gear Solid3 Snake Eater original2004/2005 geometry, HD Collection reproduction (not Delta remake). Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Original reference and native PNG physically inspected for the specific original scene. Low rocky ledges enclosing a narrow earthen crevice, olive ochre original palette, tall thin forest trunks and yellow dry reeds. Far opposing bank broad curved earth edge visible at source midline, densely wooded rear. Preserve original low stone ledges and muted sunlit woodland, no giant chasm or snowy cliff. 2.5D fighting perspective necessarily adapted; no visible characters, rope circles, guide annotations or HUD. Four native atlas planes preserved byte-for-byte. Runtime bounded sourceRect excludes unused panel separators; alpha borders remain unedited. Actual full PNG 1672x941, cropped native plane sizes recorded separately, below historical1672-wide individual planes. Backing color explicitly opaque; native alpha is not claimed uniformly opaque. Side-on projection, hidden surfaces and combat lane adapted. Alpha-defined floor contact registered to568, camera extension repeats only ordinary outer floor texture. Full game composite/fighter-foot QA remains pending; no absolute1:1 topography or canonical temporal animation certification.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/mgs3-bolshaya-past-crevasse/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/mgs3-bolshaya-past-crevasse/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/mgs3-bolshaya-past-crevasse/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/mgs3-bolshaya-past-crevasse/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://images.steamusercontent.com/ugc/2093670381050821166/85F2A41EDDD82DEA937EA87030D3E40CE34B3C0D/).

### Groznyj Grad B1F Volgin boss fighting arena — `p18_mgs3_groznyj_grad_aire_de_combat_volgin`

**MGS3 · P2 · présent.** Édition : Metal Gear Solid3 Snake Eater/Subsistence original PlayStation2,1964. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Original reference and native PNG physically inspected for the specific original scene. Copy the actual low original PS2 industrial arena under Shagohod main hangar: plain worn olive-gray rectangular concrete fighting platform, black metal grated edge, waist-high dull yellow/gold safety railings, gallery above, olive-green heavy industrial walls, vertical steel support columns and simple control boxes. The reference1050 is actual Volgin gameplay: preserve its clean flat open concrete rectangle and straight golden railings. No Shagohod, Volgin, Snake or electricity effects; no futuristic screens, tanks, turbine machinery or invented factory equipment. Fighting arena is the open platform, not entire weapons lab. Four native atlas planes preserved byte-for-byte. Runtime bounded sourceRect excludes unused panel separators; alpha borders remain unedited. Actual full PNG 1672x940, cropped native plane sizes recorded separately, below historical1672-wide individual planes. Backing color explicitly opaque; native alpha is not claimed uniformly opaque. Side-on projection, hidden surfaces and combat lane adapted. Alpha-defined floor contact registered to568, camera extension repeats only ordinary outer floor texture. Full game composite/fighter-foot QA remains pending; no absolute1:1 topography or canonical temporal animation certification.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/mgs3-groznyj-grad-aire-de-combat-volgin/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/mgs3-groznyj-grad-aire-de-combat-volgin/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/mgs3-groznyj-grad-aire-de-combat-volgin/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/mgs3-groznyj-grad-aire-de-combat-volgin/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://archive.org/download/LP_Metal_Gear_Solid_3/mgs3_41.mp4).

### Groznyj Grad — abords des casernes — `p18_mgs3_groznyj_grad_caserne`

**MGS3 · P2 · présent.** Édition : Metal Gear Solid3 original2004/2005 geometry, HD Collection reproduction (not Delta remake). Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Original reference and native PNG physically inspected for the specific original scene. Original Groznyj Grad Northwest barracks surroundings: gray-olive utilitarian Soviet concrete facades, dark teal service doors and roof edges, ochre yellow metal mesh fence with upright rectangular square posts, narrow pavement, external flight of straight metal stairs behind the fence and rough brown mountain backdrop in late muted daylight. Preserve original fence/stair/building proportions, no invented futuristic industrial arena. Specific lateral composition derived from visible Northwest yard; barracks interior and unobserved areas not certified. Omit soldier, HUD, Kerotan and annotations. Four native atlas planes preserved byte-for-byte. Runtime bounded sourceRect excludes unused panel separators; alpha borders remain unedited. Actual full PNG 1672x941, cropped native plane sizes recorded separately, below historical1672-wide individual planes. Backing color explicitly opaque; native alpha is not claimed uniformly opaque. Side-on projection, hidden surfaces and combat lane adapted. Alpha-defined floor contact registered to568, camera extension repeats only ordinary outer floor texture. Full game composite/fighter-foot QA remains pending; no absolute1:1 topography or canonical temporal animation certification.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/mgs3-groznyj-grad-caserne/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/mgs3-groznyj-grad-caserne/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/mgs3-groznyj-grad-caserne/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/mgs3-groznyj-grad-caserne/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://images.steamusercontent.com/ugc/2093670381050982428/158980C22BF57818E5286CD150A2A95D524AC32F/).

### Krasnogorje — base des montagnes — `p18_mgs3_krasnogorje_montagnes`

**MGS3 · P2 · présent.** Édition : Metal Gear Solid3 Snake Eater original2004/2005 geometry, HD Collection reproduction (not Delta remake). Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Original reference and native PNG physically inspected for the specific original scene. Original Krasnogorje Mountain Base: towering gray-olive cliff left, rough golden ochre sloping rock right, barren arid mountain valley with desaturated yellow daylight; sparse dry grass. Distinct stepped mountain paths and broad gray vertical stone faces. Do not introduce snow, tropical vegetation or enormous invented buildings. Preserve PS2-era original geometry/materials, painted natural 2.5D version of these exact visible surfaces. Four native atlas planes preserved byte-for-byte. Runtime bounded sourceRect excludes unused panel separators; alpha borders remain unedited. Actual full PNG 1672x941, cropped native plane sizes recorded separately, below historical1672-wide individual planes. Backing color explicitly opaque; native alpha is not claimed uniformly opaque. Side-on projection, hidden surfaces and combat lane adapted. Alpha-defined floor contact registered to568, camera extension repeats only ordinary outer floor texture. Full game composite/fighter-foot QA remains pending; no absolute1:1 topography or canonical temporal animation certification.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/mgs3-krasnogorje-montagnes/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/mgs3-krasnogorje-montagnes/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/mgs3-krasnogorje-montagnes/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/mgs3-krasnogorje-montagnes/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://images.steamusercontent.com/ugc/2093670381050933406/4451E1BFDCAE16670ACD64C064DEBED2B70018A1/).

### Ponizovje — gorge aquatique — `p18_mgs3_ponizovje_grotte`

**MGS3 · P2 · présent.** Édition : Metal Gear Solid3 original2004/2005 geometry in HD Collection reproduction, not Delta. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Original reference and native PNG physically inspected for the specific original scene. Actual Ponizovje South original2004 MGS3 aquatic gorge, reached after Chyornaya Peschera cave: winding shallow murky gray-green water among damp gray rocks and low damp mossy earthen/rock banks and arching root-like tree trunks, reed tufts and warm amber evening sky visible above dark olive-green tree canopy. Source specific visible gorge materials, not the separate already-authored Chyornaya cave or fictional underground volcano. Legacy project grotto label interpreted as sheltered water gorge. Hidden upper bank surfaces and safe lateral combat ledge necessarily adapted. No Snake, crocodiles, HUD, annotations or collectible frog; water behind continuous dark damp stone combat lane. Four native atlas planes preserved byte-for-byte. Runtime bounded sourceRect excludes unused panel separators; alpha borders remain unedited. Actual full PNG 1672x940, cropped native plane sizes recorded separately, below historical1672-wide individual planes. Backing color explicitly opaque; native alpha is not claimed uniformly opaque. Side-on projection, hidden surfaces and combat lane adapted. Alpha-defined floor contact registered to568, camera extension repeats only ordinary outer floor texture. Full game composite/fighter-foot QA remains pending; no absolute1:1 topography or canonical temporal animation certification.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/mgs3-ponizovje-grotte/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/mgs3-ponizovje-grotte/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/mgs3-ponizovje-grotte/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/mgs3-ponizovje-grotte/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://images.steamusercontent.com/ugc/2093670381050848928/407FD5841A4E13259F9F09E171C9EEA586950648/).

### Groznyj Grad — esplanade du pont Shagohod — `p18_mgs3_pont_shagohod`

**MGS3 · P2 · présent.** Édition : Metal Gear Solid3 Snake Eater/Subsistence original PS2 game2004/2005. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Original reference and native PNG physically inspected for the specific original scene. Actual final Shagohod/Volgin fight beside Groznyj Grad Rail Bridge: broad flat coarse brown-gray gravel esplanade, muted graygreen overcast sky, low green-gray metal fence/rail across far edge, dark green hills beyond, blocky pale-gray concrete bridge support/cut stone retaining structures at outer edge. Second original HD source documents rail-bridge concrete tower base with steep dark steel girders, but partial scoped shot only. Preserve visible flat gravel arena, subdued sky and edge bridge-support materials, no towering futuristic city or invented lava highway. Combat lane horizontal same gravel, modest fixed concrete/steel edge structures; Shagohod and Volgin omitted as separately-rendered actors/machines. No fighters, motorcycle, HUD, sniper scope or annotations. Upper hidden span/arena arrangement minimally completed, not full topography certified. Four native atlas planes preserved byte-for-byte. Runtime bounded sourceRect excludes unused panel separators; alpha borders remain unedited. Actual full PNG 1672x941, cropped native plane sizes recorded separately, below historical1672-wide individual planes. Backing color explicitly opaque; native alpha is not claimed uniformly opaque. Side-on projection, hidden surfaces and combat lane adapted. Alpha-defined floor contact registered to568, camera extension repeats only ordinary outer floor texture. Full game composite/fighter-foot QA remains pending; no absolute1:1 topography or canonical temporal animation certification.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/mgs3-pont-shagohod/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/mgs3-pont-shagohod/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/mgs3-pont-shagohod/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/mgs3-pont-shagohod/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://archive.org/download/LP_Metal_Gear_Solid_3/mgs3_45.mp4) ; [source2](https://images.steamusercontent.com/ugc/2093670381051058868/C8788AD1F465C843F9CB66A58928C6E1D469371C/).

### The Sorrow spectral river — `p18_mgs3_riviere_the_sorrow`

**MGS3 · P2 · présent.** Édition : Metal Gear Solid3 Snake Eater/Subsistence original PlayStation2,1964. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Original reference and native PNG physically inspected for the specific original scene. Actual Sorrow river sequence: narrow dark shallow gray-green river in a bleak damp forest, drowned tree trunks leaning from both banks, exposed tangled roots, muted nearly monochrome blue-green/charcoal gray palette, cold heavy mist, very subdued light. Copy the original spectral wooded river mood and tangled banks, not a bright tropical jungle, snow, red blood, cemetery or burning hellscape. No ghosts, corpses, skulls, characters or magical symbols. Side-view fighting floor is a shallow-water riverbed ledge adapted to combat, with faint reflective water surface; fixed terrain, separate fog behind and near banks only. Four native atlas planes preserved byte-for-byte. Runtime bounded sourceRect excludes unused panel separators; alpha borders remain unedited. Actual full PNG 1672x941, cropped native plane sizes recorded separately, below historical1672-wide individual planes. Backing color explicitly opaque; native alpha is not claimed uniformly opaque. Side-on projection, hidden surfaces and combat lane adapted. Alpha-defined floor contact registered to568, camera extension repeats only ordinary outer floor texture. Full game composite/fighter-foot QA remains pending; no absolute1:1 topography or canonical temporal animation certification.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/mgs3-riviere-the-sorrow/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/mgs3-riviere-the-sorrow/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/mgs3-riviere-the-sorrow/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/mgs3-riviere-the-sorrow/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://archive.org/download/LP_Metal_Gear_Solid_3/mgs3_39.mp4).

### Tikhogornyj — rivière — `p18_mgs3_tikhogornyj_riviere`

**MGS3 · P2 · présent.** Édition : Metal Gear Solid3 original2004/2005 geometry, HD Collection reproduction (not Delta remake). Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Original reference and native PNG physically inspected for the specific original scene. Original Tikhogornyj jungle river after escape: narrow dark reflective winding stream below steep mossy gray-green banks, large tree trunk at right, fallen branching log across the far stream, rich dark green rainforest with subtle cold sunlight through leaves. Preserve low stream confined by irregular rock banks and original tangled trees, no huge picturesque waterfall replacing the visible river scene. Horizontal fighting bank at front; water behind combat lane. Omit characters, annotations and guide overlays. Four native atlas planes preserved byte-for-byte. Runtime bounded sourceRect excludes unused panel separators; alpha borders remain unedited. Actual full PNG 1672x941, cropped native plane sizes recorded separately, below historical1672-wide individual planes. Backing color explicitly opaque; native alpha is not claimed uniformly opaque. Side-on projection, hidden surfaces and combat lane adapted. Alpha-defined floor contact registered to568, camera extension repeats only ordinary outer floor texture. Full game composite/fighter-foot QA remains pending; no absolute1:1 topography or canonical temporal animation certification.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/mgs3-tikhogornyj-riviere/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/mgs3-tikhogornyj-riviere/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/mgs3-tikhogornyj-riviere/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/mgs3-tikhogornyj-riviere/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://images.steamusercontent.com/ugc/2093670381051020712/DFF7546929615F824183401A4384FFAE6E350DC1/).

### Groznyj Grad — tunnel de The Fury — `p18_mgs3_tunnel_the_fury`

**MGS3 · P2 · présent.** Édition : Metal Gear Solid3 Snake Eater/Subsistence original PS2 (2004/2005), Groznyj Grad Underground Tunnel. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Deux frames source PS2 de The Fury physiquement vues, puis atlas natif RGBA inspecté : maçonnerie très sombre teal/olive, piliers carrés, plafonds bas, tubes orange. Les4plans utilisent un unique PNG natif intact et4rectangles distincts; architecture latérale et surfaces cachées adaptées, piliers proches du fond également visibles dans la couchearchitecture. Lesrefs de gameplay sont partiellement masquées par flammes/HUD; aucune certification de topographie complète. Tool demand4096x2304ignorée:1672x940réel,836x470parplan, résolution inférieure aux anciens plans1672x941. Alpha natifintact; source contactà79%371mappé568. Caméra±220couverture extrêmes etcomposite réel restentàvérifier parRoot. Pasd’animation temporelle canonique certifiée; environnement fixe, parallaxcamera séparée, poussière faible ajoutée adaptation. Fond nativealpha194..255: couleur de backing opaque déclarée, aucun PNG uniformément opaque certifié. Root renderer real camera -220,0,+220 composite subsequently checked for ground coverage; native scene source review qualified, foreground fighter QA pending.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/mgs3-tunnel-the-fury/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/mgs3-tunnel-the-fury/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/mgs3-tunnel-the-fury/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/mgs3-tunnel-the-fury/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"dust","enabled":true,"count":12,"color":"#8c8170"}`. Poussière lente issue de zones définies ; amplitude et opacité relevées, décroissance à l’arrêt si produite par mouvement. Distinguer poussière ambiante, fumée de dégâts et souffle d’attaque.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://archive.org/download/LP_Metal_Gear_Solid_3/mgs3_30.mp4).

### Outer Haven — Command Center / Screaming Mantis — `p18_mgs4_outer_haven_salle_mantis`

**MGS4 · P2 · présent.** Édition : Metal Gear Solid 4: Guns of the Patriots (2008), original PlayStation 3, Act5 Command Center. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Original reference and native PNG physically inspected for the specific original scene. This is the actual modern industrial Command Center, not Psycho Mantis ornate MGS1 office. Preserve gray-green segmented metal walls, pale gray panel floor with dark recessed drainage strips, central circular floor aperture ring, raised perimeter banks of angular tactical consoles with sloped monitor faces, shallow stairways at the edges, metal guardrails and ceiling lights. A pale green holographic globe is visible above the central aperture in reference37060; render it as a subtle distant transparent holographic sphere with no symbols, kept behind the combat lane. Put only the far blank room envelope and holographic globe in distant tile; isolated perimeter console banks/rails/stairs only in architecture tile, not duplicated in background. Foreground minimal corner floor frame only. Remove Snake, Meryl, Mantis, PMC bodies, scope, yellow HUD and subtitles. Side-on spacing and unseen rear wall continuation adapted; preserve the arena materials and its command-room identity, never add chandeliers, marble or paintings. Four native atlas planes preserved byte-for-byte. Runtime bounded sourceRect excludes unused panel separators; alpha borders remain unedited. Actual full PNG 1672x941, cropped native plane sizes recorded separately, below historical1672-wide individual planes. Backing color explicitly opaque; native alpha is not claimed uniformly opaque. Side-on projection, hidden surfaces and combat lane adapted. Alpha-defined floor contact registered to568, camera extension repeats only ordinary outer floor texture. Full game composite/fighter-foot QA remains pending; no absolute1:1 topography or canonical temporal animation certification.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/mgs4-outer-haven-salle-mantis/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/mgs4-outer-haven-salle-mantis/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/mgs4-outer-haven-salle-mantis/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/mgs4-outer-haven-salle-mantis/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://archive.org/download/PS3_Longplay_081_Metal_Gear_Solid_4/PS3_Longplay_081_Metal_Gear_Solid_4.mkv).

### Rat Patrol — Advent Palace / salle d’exercice — `p18_mgs4_rat_patrol_cour_exercice`

**MGS4 · P2 · présent.** Édition : Metal Gear Solid 4 Guns of the Patriots (2008), original PS3 Act1 Advent Palace Rat Patrol meeting; exercise label is project-authored. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Original reference and native PNG physically inspected for the specific original scene. Faithfully preserve actual Advent Palace cafe/meeting-room materials: worn green-gray and pale gray LARGE CHECKER FLOOR tiles, olive beige weathered plaster, an intricate narrow BLACK/CREAM GEOMETRIC MOSAIC wainscot border near waist height, a long dark green marble/stone bar countertop with tall narrow dark brown WOODEN STOOLS, curved beige upholstered booth benches at the distant corner, carved reddish brown wooden door with diagonal wood texture and brass lever, a small wall lamp. Rat Patrol are actually encountered in this building, shown by Meryl source4600. This is not a canonically named outdoor training courtyard: Core exercise/cour label is a PROJECT composition, transformed to a wide side-on exercise arena using the real indoor materials. Do NOT invent an exterior courtyard, gun targets, military signage or a different episode setting. Remove Snake, Johnny, Jonathan, Meryl, all body parts, bullets, bottles, maps, subtitles/HUD and text. Distant tile ONLY plain upper plaster and distant checker/mosaic band without close props; architecture tile isolated far bar/wooden stools, rear reddish door and small distant booth corners, kept away from combat center; ground tile continuous correct checker floor contact79percent; foreground tiny corner wood/baseboard debris only. Room spacing and unseen surfaces are adapted; source partial actor occlusion forbids certification of exact original map geometry. Four native atlas planes preserved byte-for-byte. Runtime bounded sourceRect excludes unused panel separators; alpha borders remain unedited. Actual full PNG 1672x941, cropped native plane sizes recorded separately, below historical1672-wide individual planes. Backing color explicitly opaque; native alpha is not claimed uniformly opaque. Side-on projection, hidden surfaces and combat lane adapted. Alpha-defined floor contact registered to568, camera extension repeats only ordinary outer floor texture. Full game composite/fighter-foot QA remains pending; no absolute1:1 topography or canonical temporal animation certification.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/mgs4-rat-patrol-cour-exercice/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/mgs4-rat-patrol-cour-exercice/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/mgs4-rat-patrol-cour-exercice/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/mgs4-rat-patrol-cour-exercice/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Séparer combat Haven Troopers du lieu d’entraînement proposé ; fenêtres, effondrements et fumée doivent suivre la séquence source choisie.

**Écart spécifique :** Le label mélange Advent Palace et salle d’exercice : choisir une scène attestée et indiquer les entraînements Rat Patrol comme situation CQC inventée si nécessaire.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://archive.org/download/PS3_Longplay_081_Metal_Gear_Solid_4/PS3_Longplay_081_Metal_Gear_Solid_4.mkv).

### Opération747 — pont du cargo — `p18_revenge_cargo_pont`

**Snake’s Revenge · P2 · présent.** Édition : Snake Revenge original Nintendo NES1990. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Original reference and native PNG physically inspected for the specific original scene. Actual NES Snake Revenge1990 cargo deck: cool medium-gray steel floor with short broken white lane markings and angular loading lines, RED rectangular ribbed cargo boxes, black/gray rectangular grated vent panels, yellow-black hazard strip at side opening, long low gray rail at rear, dark vivid blue sea visible as narrow strip behind rail. Preserve distinctive red crates and coolgray deck, not generic modern tanker huge containers. No Snake or UI. Front combat lane horizontal graysteel and sparse corner railposts. Four native atlas planes preserved byte-for-byte. Runtime bounded sourceRect excludes unused panel separators; alpha borders remain unedited. Actual full PNG 1672x941, cropped native plane sizes recorded separately, below historical1672-wide individual planes. Backing color explicitly opaque; native alpha is not claimed uniformly opaque. Side-on projection, hidden surfaces and combat lane adapted. Alpha-defined floor contact registered to568, camera extension repeats only ordinary outer floor texture. Full game composite/fighter-foot QA remains pending; no absolute1:1 topography or canonical temporal animation certification.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/revenge-cargo-pont/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/revenge-cargo-pont/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/revenge-cargo-pont/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/revenge-cargo-pont/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://lparchive.org/Metal-Gear-1-2/Update%2014/1-Snake_s_Revenge_096.png).

### Opération747 — jungle de la base — `p18_revenge_jungle_base`

**Snake’s Revenge · P2 · présent.** Édition : Snake Revenge original Nintendo NES1990. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Original reference and native PNG physically inspected for the specific original scene. Actual original NES Snake Revenge1990 landing/base jungle: dark green trees arranged tightly around an olive-green dirt clearing, rounded bright-green overlapping foliage and palms, muted ochre narrow earthen path. Side-on forest edge preserve original bright-green vs olive clearing palette and shapes, tree masses frame combat lane. No helicopter, soldiers, HUD, dialogue. Do not borrow orange-red earth and purple sky from Metal Gear NES1988; different game/edition. Four native atlas planes preserved byte-for-byte. Runtime bounded sourceRect excludes unused panel separators; alpha borders remain unedited. Actual full PNG 1672x941, cropped native plane sizes recorded separately, below historical1672-wide individual planes. Backing color explicitly opaque; native alpha is not claimed uniformly opaque. Side-on projection, hidden surfaces and combat lane adapted. Alpha-defined floor contact registered to568, camera extension repeats only ordinary outer floor texture. Full game composite/fighter-foot QA remains pending; no absolute1:1 topography or canonical temporal animation certification.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/revenge-jungle-base/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/revenge-jungle-base/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/revenge-jungle-base/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/revenge-jungle-base/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://lparchive.org/Metal-Gear-1-2/Update%2013/10-Snake_s_Revenge_010.png).

### Opération747 — chambre du commandant — `p18_revenge_salle_commandement`

**Snake’s Revenge · P2 · présent.** Édition : Snake Revenge original Nintendo NES1990. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Original reference and native PNG physically inspected for the specific original scene. Actual NES Snake Revenge1990 Commander boss chamber reference partially obscured by dialogue: visible compact enclosed room with olive-yellow masonry blocks at perimeter and bright dark-red rectangular panel/tile area behind the commander, narrow pale-gray metal wall edge trim. Preserve only actually visible original olive/red simple architecture. Do not invent large futuristic holographic command center, maps, computer screens, thrones or reactor. Side-on composition and unobserved upper wall explicitly adapted. No boss, fighter, HUD, textbox, lettering or emblem. Four native atlas planes preserved byte-for-byte. Runtime bounded sourceRect excludes unused panel separators; alpha borders remain unedited. Actual full PNG 1672x941, cropped native plane sizes recorded separately, below historical1672-wide individual planes. Backing color explicitly opaque; native alpha is not claimed uniformly opaque. Side-on projection, hidden surfaces and combat lane adapted. Alpha-defined floor contact registered to568, camera extension repeats only ordinary outer floor texture. Full game composite/fighter-foot QA remains pending; no absolute1:1 topography or canonical temporal animation certification.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/revenge-salle-commandement/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/revenge-salle-commandement/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/revenge-salle-commandement/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/revenge-salle-commandement/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://lparchive.org/Metal-Gear-1-2/Update%2018/59-Snake_s_Revenge_412.png).

### Opération747 — train de fret — `p18_revenge_train_fret`

**Snake’s Revenge · P2 · présent.** Édition : Snake Revenge original Nintendo NES1990. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Original reference and native PNG physically inspected for the specific original scene. Actual NES Snake Revenge1990 train interior: yellow-olive long horizontal wooden floorboards visibly cracked, pale gray riveted carriage walls and angular bulkheads, black narrow recesses, gray horizontal steel ladder/open interior rack, small black square wall windows with pale gray frames. Distinct cramped train-car look with olive plank floor and metal passage edges, no modern blue shipping-container train or snowy landscape. Front floor continuous horizontal plank combat lane. No character, HUD, weapons or floor traps. Four native atlas planes preserved byte-for-byte. Runtime bounded sourceRect excludes unused panel separators; alpha borders remain unedited. Actual full PNG 1672x941, cropped native plane sizes recorded separately, below historical1672-wide individual planes. Backing color explicitly opaque; native alpha is not claimed uniformly opaque. Side-on projection, hidden surfaces and combat lane adapted. Alpha-defined floor contact registered to568, camera extension repeats only ordinary outer floor texture. Full game composite/fighter-foot QA remains pending; no absolute1:1 topography or canonical temporal animation certification.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/revenge-train-fret/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/revenge-train-fret/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/revenge-train-fret/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/revenge-train-fret/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://lparchive.org/Metal-Gear-1-2/Update%2015/31-Snake_s_Revenge_179.png).

### Dite — camp de base — `p18_survive_dite_camp_de_base`

**Survive · P2 · présent.** Édition : Metal Gear Survive (2018), released PC base camp in Steam screenshot; official 2018-01-15 preview used only as contextual wreck reference. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Original reference and native PNG physically inspected for the specific original scene. Actual released Metal Gear Survive PC base camp screenshot1318466867: central dark square concrete compound enclosed by chainlink/barbed-wire fences, green canvas low military tents, compact pale rectangular prefabricated structures, vertical white cylindrical water tanks with thin teal rings, a tall central dark radio lattice antenna and small central silver-white stacked Virgil support equipment. Ground is brown gravel and worn grid pads. Surroundings show the crashed tilted steel Mother Base platforms with rust orange I-beams and collapsed trusses visible in official January2018 pre-release screenshot003; preview geometry is context evidence, exact final equivalence not certified. Keep base assets as fixed background architecture with a clear side fighting lane; no building menu, grid overlays, colored zone icons, words, characters or weapons. Player-built camp arrangement is variable and not canonical exact map; faithfully preserve original visible facilities/materials, adapting arrangement to side camera. Distant tile dusty sky/crashed industrial silhouettes ONLY, architecture tile real tents/prefabs/water cylinders/radio lattice, ground continuous gravel; sparse foreground fence posts at corners only. Four native atlas planes preserved byte-for-byte. Runtime bounded sourceRect excludes unused panel separators; alpha borders remain unedited. Actual full PNG 1672x941, cropped native plane sizes recorded separately, below historical1672-wide individual planes. Backing color explicitly opaque; native alpha is not claimed uniformly opaque. Side-on projection, hidden surfaces and combat lane adapted. Alpha-defined floor contact registered to568, camera extension repeats only ordinary outer floor texture. Full game composite/fighter-foot QA remains pending; no absolute1:1 topography or canonical temporal animation certification.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/survive-dite-camp-de-base/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/survive-dite-camp-de-base/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/survive-dite-camp-de-base/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/survive-dite-camp-de-base/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://images.steamusercontent.com/ugc/921421772674551331/2603FA25F10F415DEA9A23A69FEC2EE7594FBBE9/) ; [source2](https://www.4gamer.net/games/353/G035306/20180115019/SS/003.jpg).

### Dite — poussière / ruines industrielles — `p18_survive_dite_zone_de_poussiere`

**Survive · P2 · présent.** Édition : Metal Gear Survive (2018), original Konami gameplay screenshot published 2018-01-15 preview by 4Gamer; exact release build equivalence not certified. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Original reference and native PNG physically inspected for the specific original scene. Exact original Dust screenshot shows low visibility GRAY-WHITE DUST FOG, a collapsed rusted gray two-level industrial building with a long external metal stair climbing diagonally at RIGHT, broken upper concrete/metal platform and railings, exposed steel joists stacked under the ledge, distant narrow broken connecting bridge at left, large brown rock at left, rough RED-BROWN GRAVEL EARTH with sparse dry straw grass. Preserve actual industrial geometry visible through fog; no bright blue crystal ruin courtyard from another screenshot, no clear sunny sky. Far tile pale gray opaque fog and vague distant platform silhouette only; second tile isolated broken industrial staircase/joists/concrete balcony, not repeated in fog; third continuous red-brown gravel floor; fourth tiny corner dry grass/rock only. Omit player, spear, red-crystal infected enemies and all text/watermarks. The original named Dust setting is supported, exact building location map and post-preview final-build details not certified. Side-on floor continuation adapted, no unsafe hidden ledge collision. Four native atlas planes preserved byte-for-byte. Runtime bounded sourceRect excludes unused panel separators; alpha borders remain unedited. Actual full PNG 1672x941, cropped native plane sizes recorded separately, below historical1672-wide individual planes. Backing color explicitly opaque; native alpha is not claimed uniformly opaque. Side-on projection, hidden surfaces and combat lane adapted. Alpha-defined floor contact registered to568, camera extension repeats only ordinary outer floor texture. Full game composite/fighter-foot QA remains pending; no absolute1:1 topography or canonical temporal animation certification. Source PNG leaves sky alpha gaps; physically reviewed original mist/overcast sky supplies an explicit neutral backing color, no image pixels edited. Native atlas sky is not falsely claimed opaque.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/survive-dite-zone-de-poussiere/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/survive-dite-zone-de-poussiere/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/survive-dite-zone-de-poussiere/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/survive-dite-zone-de-poussiere/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://www.4gamer.net/games/353/G035306/20180115019/SS/011.jpg).

### Shadow Moses — armurerie — `p18_mgs1_shadow_moses_armurerie`

**MGS1 · P2 · présent.** Édition : Metal Gear Solid original 1998 PlayStation. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Les cadres PS1 attestent les caisses militaires, contreventements et teintes ; la hauteur de la pièce générée et les surfaces latérales cachées sont adaptées, sans certification de plan complet. Atlas natif original intact, 1672×941 réels ; pas de promesse de résolution 4096. Les quatre rectangles distincts et les alphas ont été mesurés. Les lignes de contact sont enregistrées séparément par rapport au fond. Parallaxe caméra ajoutée ; aucune animation temporelle canonique certifiée. Aperçus Canvas réalisés à caméra −220, 0 et +220 : ligne du sol y=570 entièrement opaque sur 1280 px dans chaque cas. Composition centrale physiquement vue pour les quinze lieux ; Mantis et REX revus aux deux extrêmes après ajustement. Validation de rendu dans le jeu avec vrais combattants et collisions encore à faire par Root. Correction distincte floor-v2 : seules les bandes extérieures du sol de 32 pixels sont répétées hors image pour couvrir caméra ±220 à zoom .8 ; prolongement de texture latéral du projet, pas certification de carte originale.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/mgs1-shadow-moses-armurerie/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/mgs1-shadow-moses-armurerie/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/mgs1-shadow-moses-armurerie/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/mgs1-shadow-moses-armurerie/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"enabled":false,"type":"none","count":0}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-solid-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-solid-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://archive.org/download/LP-Metal-Gear-Solid/Metal%20Gear%20Solid%20%232%20-%20Sneak%20That%20Snake%20Snack%20%28Uncut%20Commentary%29-xRPjDeU6srU.mp4).

### Shadow Moses — champ de neige — `p18_mgs1_shadow_moses_champ_de_neige`

**MGS1 · P2 · présent.** Édition : Metal Gear Solid original1998PlayStation, Shadow Moses snowfield atnight. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Clôtures nervurées, barbelés, conifères et cabane vérifiés dans les cadres PS1 ; nombre de troncs, longueur du mur et côté caché de la cabane adaptés. Fond et architecture comportent des segments répétés de clôture. Atlas natif original intact, 1672×941 réels ; pas de promesse de résolution 4096. Les quatre rectangles distincts et les alphas ont été mesurés. Les lignes de contact sont enregistrées séparément par rapport au fond. Parallaxe caméra ajoutée ; aucune animation temporelle canonique certifiée. Aperçus Canvas réalisés à caméra −220, 0 et +220 : ligne du sol y=570 entièrement opaque sur 1280 px dans chaque cas. Composition centrale physiquement vue pour les quinze lieux ; Mantis et REX revus aux deux extrêmes après ajustement. Validation de rendu dans le jeu avec vrais combattants et collisions encore à faire par Root. Correction distincte floor-v2 : seules les bandes extérieures du sol de 32 pixels sont répétées hors image pour couvrir caméra ±220 à zoom .8 ; prolongement de texture latéral du projet, pas certification de carte originale. Chute de neige optionnelle attestée dans les cadres sources entiers déjà cités ; densité et vitesse des particules adaptées au jeu, sans mesure temporelle canonique.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/mgs1-shadow-moses-champ-de-neige/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/mgs1-shadow-moses-champ-de-neige/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/mgs1-shadow-moses-champ-de-neige/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/mgs1-shadow-moses-champ-de-neige/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"enabled":true,"type":"snow","count":36}`. Flocons en plusieurs profondeurs, dérive et intermittence réglées sur capture ; premiers plans moins opaques pour garder jambes et projectiles lisibles. Accumulation ou traces nécessitent une couche persistante distincte.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-solid-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-solid-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://archive.org/download/LP-Metal-Gear-Solid/Metal%20Gear%20Solid%20%2311%20-%20Steamed%20%28Uncut%20Commentary%29-w7g8o1rbU9c.mp4).

### REX — duel au sommet — `p18_mgs1_sommet_de_metal_gear_rex`

**MGS1 · P2 · présent.** Édition : Metal Gear Solid original1998PlayStation, damaged REX top arena, Shadow Moses1995. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Seule la surface supérieure accidentée de REX est attestée par les cadres du duel PS1. Géométrie sous-jacente et structures latérales adaptées ; aucune certification du corps complet de REX. Sol irrégulier aplanit pour le combat. Atlas natif original intact, 1672×941 réels ; pas de promesse de résolution 4096. Les quatre rectangles distincts et les alphas ont été mesurés. Les lignes de contact sont enregistrées séparément par rapport au fond. Parallaxe caméra ajoutée ; aucune animation temporelle canonique certifiée. Aperçus Canvas réalisés à caméra −220, 0 et +220 : ligne du sol y=570 entièrement opaque sur 1280 px dans chaque cas. Composition centrale physiquement vue pour les quinze lieux ; Mantis et REX revus aux deux extrêmes après ajustement. Validation de rendu dans le jeu avec vrais combattants et collisions encore à faire par Root. Correction distincte floor-v2 : seules les bandes extérieures du sol de 32 pixels sont répétées hors image pour couvrir caméra ±220 à zoom .8 ; prolongement de texture latéral du projet, pas certification de carte originale.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/mgs1-sommet-de-metal-gear-rex/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/mgs1-sommet-de-metal-gear-rex/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/mgs1-sommet-de-metal-gear-rex/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/mgs1-sommet-de-metal-gear-rex/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"enabled":false,"type":"none","count":0}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-solid-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-solid-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://archive.org/download/LP-Metal-Gear-Solid/Metal%20Gear%20Solid%20%2315-1%20-%20Cat%20Commentary%20%28Uncut%20Commentary%29-jDGJxa8vy-s.mp4).

### Shadow Moses — laboratoire — `p18_mgs1_shadow_moses_laboratoire`

**MGS1 · P2 · présent.** Édition : Metal Gear Solid original 1998 PlayStation, Shadow Moses nuclear warhead storage building B2 laboratory. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Palette, baies cubiques et plafond lumineux tirés du laboratoire original PS1. Plusieurs baies figurent au fond et en architecture ; largeur de salle, quantité de racks et détails cachés adaptés. Atlas natif original intact, 1672×941 réels ; pas de promesse de résolution 4096. Les quatre rectangles distincts et les alphas ont été mesurés. Les lignes de contact sont enregistrées séparément par rapport au fond. Parallaxe caméra ajoutée ; aucune animation temporelle canonique certifiée. Aperçus Canvas réalisés à caméra −220, 0 et +220 : ligne du sol y=570 entièrement opaque sur 1280 px dans chaque cas. Composition centrale physiquement vue pour les quinze lieux ; Mantis et REX revus aux deux extrêmes après ajustement. Validation de rendu dans le jeu avec vrais combattants et collisions encore à faire par Root. Correction distincte floor-v2 : seules les bandes extérieures du sol de 32 pixels sont répétées hors image pour couvrir caméra ±220 à zoom .8 ; prolongement de texture latéral du projet, pas certification de carte originale.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/mgs1-shadow-moses-laboratoire/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/mgs1-shadow-moses-laboratoire/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/mgs1-shadow-moses-laboratoire/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/mgs1-shadow-moses-laboratoire/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"enabled":false,"type":"none","count":0}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-solid-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-solid-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://archive.org/download/LP-Metal-Gear-Solid/Metal%20Gear%20Solid%20%235%20-%20Gel%20Pens%20%28Uncut%20Commentary%29-JvIMxyGDLyA.mp4).

### Shadow Moses — bureau de Mantis — `p18_mgs1_shadow_moses_bureau_mantis`

**MGS1 · P2 · présent.** Édition : Metal Gear Solid original 1998 PlayStation, Nuclear Warhead Storage Building B1 command office. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** V1 rejetée : fausses parois de marbre. V2 et V3 reprennent les panneaux de bois et le marbre vert de la référence Windows au design original. V3 conserve des colonnes inégales ; les vrais rectangles mesurés et une échelle commune remplacent la supposition de quadrants égaux. Portraits et mobilier proches, détails non certifiés pixel à pixel. Atlas natif original intact, 1672×941 réels ; pas de promesse de résolution 4096. Les quatre rectangles distincts et les alphas ont été mesurés. Les lignes de contact sont enregistrées séparément par rapport au fond. Parallaxe caméra ajoutée ; aucune animation temporelle canonique certifiée. Aperçus Canvas réalisés à caméra −220, 0 et +220 : ligne du sol y=570 entièrement opaque sur 1280 px dans chaque cas. Composition centrale physiquement vue pour les quinze lieux ; Mantis et REX revus aux deux extrêmes après ajustement. Validation de rendu dans le jeu avec vrais combattants et collisions encore à faire par Root. Correction distincte floor-v2 : seules les bandes extérieures du sol de 32 pixels sont répétées hors image pour couvrir caméra ±220 à zoom .8 ; prolongement de texture latéral du projet, pas certification de carte originale. Pour Mantis, les extrémités contenant un reflet/incrustation lumineux ne sont jamais répétées : échantillons de marbre intérieur explicitement bornés x120 et x720, tout le rectangle central intact.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/mgs1-shadow-moses-bureau-mantis/planes-v3.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/mgs1-shadow-moses-bureau-mantis/planes-v3.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/mgs1-shadow-moses-bureau-mantis/planes-v3.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/mgs1-shadow-moses-bureau-mantis/planes-v3.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"enabled":false,"type":"none","count":0}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-solid-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-solid-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://archive.org/download/LP-Metal-Gear-Solid/Metal%20Gear%20Solid%20%236-1%20-%20Peep%20That%20Poop%20Pipe%20%28Uncut%20Commentary%29-tBviuqZ9_yo.mp4) ; [source2](https://archive.org/download/LP-Metal-Gear-Solid/Metal%20Gear%20Solid%20%236-2%20-%20Drama%20Queen%20%28Uncut%20Commentary%29-N0at4JgPrZw.mp4) ; [source3](https://buttonsandsticks.files.wordpress.com/2015/10/36802-metal-gear-solid-windows-screenshot-possessed-by-psycho-mantis.jpg).

### Tanker — cale 3 — `p18_mgs2_tanker_cale`

**MGS2 · P2 · présent.** Édition : Metal Gear Solid 2 Sons of Liberty original 2001 design, reproduced in Substance-era PC capture; Tanker 2007 chapter. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Capture originale Substance de la cale 3 ; machine RAY omise. Plusieurs niveaux de passerelles sont adaptés latéralement. La ligne de contact est la surface du caillebotis, sous la rambarde, et non son bord supérieur. Atlas natif original intact, 1672×941 réels ; pas de promesse de résolution 4096. Les quatre rectangles distincts et les alphas ont été mesurés. Les lignes de contact sont enregistrées séparément par rapport au fond. Parallaxe caméra ajoutée ; aucune animation temporelle canonique certifiée. Aperçus Canvas réalisés à caméra −220, 0 et +220 : ligne du sol y=570 entièrement opaque sur 1280 px dans chaque cas. Composition centrale physiquement vue pour les quinze lieux ; Mantis et REX revus aux deux extrêmes après ajustement. Validation de rendu dans le jeu avec vrais combattants et collisions encore à faire par Root. Correction distincte floor-v2 : seules les bandes extérieures du sol de 32 pixels sont répétées hors image pour couvrir caméra ±220 à zoom .8 ; prolongement de texture latéral du projet, pas certification de carte originale.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/mgs2-tanker-cale/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/mgs2-tanker-cale/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/mgs2-tanker-cale/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/mgs2-tanker-cale/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"enabled":false,"type":"none","count":0}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-solid-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-solid-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://lparchive.org/Metal-Gear-Solid-2-(Screenshot)/Update%206/mgs2.5_30_c22.jpg).

### Strut A — quai sous-marin — `p18_mgs2_strut_a_quai`

**MGS2 · P2 · présent.** Édition : Metal Gear Solid2Sons of Liberty original2001design, Substance-era PC capture, Plant2009Deep Sea Dock. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Capture originale Substance du Deep Sea Dock. Quai clos, caisses, fûts et poutres attestés ; disposition du fond, élévation de service et plan latéral adaptés. Quelques poutres sont également visibles dans le fond. Atlas natif original intact, 1672×941 réels ; pas de promesse de résolution 4096. Les quatre rectangles distincts et les alphas ont été mesurés. Les lignes de contact sont enregistrées séparément par rapport au fond. Parallaxe caméra ajoutée ; aucune animation temporelle canonique certifiée. Aperçus Canvas réalisés à caméra −220, 0 et +220 : ligne du sol y=570 entièrement opaque sur 1280 px dans chaque cas. Composition centrale physiquement vue pour les quinze lieux ; Mantis et REX revus aux deux extrêmes après ajustement. Validation de rendu dans le jeu avec vrais combattants et collisions encore à faire par Root. Correction distincte floor-v2 : seules les bandes extérieures du sol de 32 pixels sont répétées hors image pour couvrir caméra ±220 à zoom .8 ; prolongement de texture latéral du projet, pas certification de carte originale.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/mgs2-strut-a-quai/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/mgs2-strut-a-quai/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/mgs2-strut-a-quai/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/mgs2-strut-a-quai/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"enabled":false,"type":"none","count":0}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-solid-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-solid-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://lparchive.org/Metal-Gear-Solid-2-(Screenshot)/Update%207/mgs2_55_07a.jpg).

### Big Shell — chambre de filtration — `p18_mgs2_chambre_de_filtration`

**MGS2 · P2 · présent.** Édition : Metal Gear Solid 2 Sons of Liberty original 2001 design, Substance-era PC capture, Plant 2009 chapter. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Pièce de Vamp attestée par trois cadres Substance. Dimensions du bassin et réseau de passerelles adaptés. Rangées inégales du natif mesurées, marges blanches exclues par SourceRect. Piliers répétés entre fond et architecture ; bassin derrière le sol de combat ajouté pour une ligne continue. Atlas natif original intact, 1672×941 réels ; pas de promesse de résolution 4096. Les quatre rectangles distincts et les alphas ont été mesurés. Les lignes de contact sont enregistrées séparément par rapport au fond. Parallaxe caméra ajoutée ; aucune animation temporelle canonique certifiée. Aperçus Canvas réalisés à caméra −220, 0 et +220 : ligne du sol y=570 entièrement opaque sur 1280 px dans chaque cas. Composition centrale physiquement vue pour les quinze lieux ; Mantis et REX revus aux deux extrêmes après ajustement. Validation de rendu dans le jeu avec vrais combattants et collisions encore à faire par Root. Correction distincte floor-v2 : seules les bandes extérieures du sol de 32 pixels sont répétées hors image pour couvrir caméra ±220 à zoom .8 ; prolongement de texture latéral du projet, pas certification de carte originale.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/mgs2-chambre-de-filtration/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/mgs2-chambre-de-filtration/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/mgs2-chambre-de-filtration/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/mgs2-chambre-de-filtration/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"enabled":false,"type":"none","count":0}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-solid-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-solid-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://lparchive.org/Metal-Gear-Solid-2-(Screenshot)/Update%2025/mgs2_36_9f7.jpg) ; [source2](https://lparchive.org/Metal-Gear-Solid-2-(Screenshot)/Update%2025/mgs2_59_607.jpg) ; [source3](https://lparchive.org/Metal-Gear-Solid-2-(Screenshot)/Update%2025/mgs2_63_b63.jpg).

### Arsenal Gear — plateforme RAY — `p18_mgs2_arsenal_gear_plateforme_ray`

**MGS2 · P2 · présent.** Édition : Metal Gear Solid 2 Sons of Liberty original 2001 design, Substance-era PC capture, Plant 2009 chapter. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Tracés cyan polygonaux et espace sombre attestés par la bataille originale. Le fond contient de petites silhouettes de RAY inactifs ; ce décor ne certifie pas leur silhouette complète ou un sprite machine. Plaque de sol latérale adaptée. Atlas natif original intact, 1672×941 réels ; pas de promesse de résolution 4096. Les quatre rectangles distincts et les alphas ont été mesurés. Les lignes de contact sont enregistrées séparément par rapport au fond. Parallaxe caméra ajoutée ; aucune animation temporelle canonique certifiée. Aperçus Canvas réalisés à caméra −220, 0 et +220 : ligne du sol y=570 entièrement opaque sur 1280 px dans chaque cas. Composition centrale physiquement vue pour les quinze lieux ; Mantis et REX revus aux deux extrêmes après ajustement. Validation de rendu dans le jeu avec vrais combattants et collisions encore à faire par Root. Correction distincte floor-v2 : seules les bandes extérieures du sol de 32 pixels sont répétées hors image pour couvrir caméra ±220 à zoom .8 ; prolongement de texture latéral du projet, pas certification de carte originale.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/mgs2-arsenal-gear-plateforme-ray/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/mgs2-arsenal-gear-plateforme-ray/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/mgs2-arsenal-gear-plateforme-ray/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/mgs2-arsenal-gear-plateforme-ray/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"enabled":false,"type":"none","count":0}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-solid-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-solid-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://lparchive.org/Metal-Gear-Solid-2-(Screenshot)/Update%2031/mgs2_57_395.jpg) ; [source2](https://lparchive.org/Metal-Gear-Solid-2-(Screenshot)/Update%2031/mgs2_123_8c9.jpg).

### Big Shell — passerelle du Harrier — `p18_mgs2_passerelle_harrier`

**MGS2 · P2 · présent.** Édition : Metal Gear Solid 2 Sons of Liberty original 2001 design, Substance-era PC capture, Plant 2009 chapter. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Pont ochre/orange, deux ventilateurs cylindriques et pipeline attestés. Vue originale en hauteur convertie en sol latéral continu ; topographie complète et portions de mer cachées non certifiées. Atlas natif original intact, 1672×941 réels ; pas de promesse de résolution 4096. Les quatre rectangles distincts et les alphas ont été mesurés. Les lignes de contact sont enregistrées séparément par rapport au fond. Parallaxe caméra ajoutée ; aucune animation temporelle canonique certifiée. Aperçus Canvas réalisés à caméra −220, 0 et +220 : ligne du sol y=570 entièrement opaque sur 1280 px dans chaque cas. Composition centrale physiquement vue pour les quinze lieux ; Mantis et REX revus aux deux extrêmes après ajustement. Validation de rendu dans le jeu avec vrais combattants et collisions encore à faire par Root. Correction distincte floor-v2 : seules les bandes extérieures du sol de 32 pixels sont répétées hors image pour couvrir caméra ±220 à zoom .8 ; prolongement de texture latéral du projet, pas certification de carte originale.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/mgs2-passerelle-harrier/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/mgs2-passerelle-harrier/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/mgs2-passerelle-harrier/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/mgs2-passerelle-harrier/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"enabled":false,"type":"none","count":0}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-solid-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-solid-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://lparchive.org/Metal-Gear-Solid-2-(Screenshot)/Update%2022/pic_1_7c2.jpg) ; [source2](https://lparchive.org/Metal-Gear-Solid-2-(Screenshot)/Update%2021/mgs2_38_210.jpg).

### Amérique du Sud — salle de la villa — `p18_mgs4_amerique_du_sud_villa`

**MGS4 · P2 · présent.** Édition : Metal Gear Solid 4 Guns of the Patriots original2008PS3 Act2 Vista Mansion. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Cadre entier du longplay PS3 natif 1280×720 à 12000 s : salle à manger du manoir, cheminée, table nappée et buffet. Scope : cet intérieur seulement, pas une reconstruction de toute la villa. Colonnes et lignes inégales du natif traitées avec les vrais rectangles. Atlas natif original intact, 1672×941 réels ; pas de promesse de résolution 4096. Les quatre rectangles distincts et les alphas ont été mesurés. Les lignes de contact sont enregistrées séparément par rapport au fond. Parallaxe caméra ajoutée ; aucune animation temporelle canonique certifiée. Aperçus Canvas réalisés à caméra −220, 0 et +220 : ligne du sol y=570 entièrement opaque sur 1280 px dans chaque cas. Composition centrale physiquement vue pour les quinze lieux ; Mantis et REX revus aux deux extrêmes après ajustement. Validation de rendu dans le jeu avec vrais combattants et collisions encore à faire par Root. Correction distincte floor-v2 : seules les bandes extérieures du sol de 32 pixels sont répétées hors image pour couvrir caméra ±220 à zoom .8 ; prolongement de texture latéral du projet, pas certification de carte originale.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/mgs4-amerique-du-sud-villa/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/mgs4-amerique-du-sud-villa/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/mgs4-amerique-du-sud-villa/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/mgs4-amerique-du-sud-villa/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"enabled":false,"type":"none","count":0}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-solid-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-solid-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://archive.org/download/PS3_Longplay_081_Metal_Gear_Solid_4/PS3_Longplay_081_Metal_Gear_Solid_4.mkv).

### Europe de l’Est — quai — `p18_mgs4_europe_de_lest_quai`

**MGS4 · P2 · présent.** Édition : Metal Gear Solid4Guns of the Patriots original2008PS3Act3 Vltava riverside scene. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Cadre PS3 natif 1280×720 à 25050 s : muret de pierre, escalier angulaire, garde-corps tubulaire, rive opposée. Façades partiellement masquées par personnages ; leur prolongement et le plan latéral sont adaptés. Rangées inégales mesurées. Atlas natif original intact, 1672×941 réels ; pas de promesse de résolution 4096. Les quatre rectangles distincts et les alphas ont été mesurés. Les lignes de contact sont enregistrées séparément par rapport au fond. Parallaxe caméra ajoutée ; aucune animation temporelle canonique certifiée. Aperçus Canvas réalisés à caméra −220, 0 et +220 : ligne du sol y=570 entièrement opaque sur 1280 px dans chaque cas. Composition centrale physiquement vue pour les quinze lieux ; Mantis et REX revus aux deux extrêmes après ajustement. Validation de rendu dans le jeu avec vrais combattants et collisions encore à faire par Root. Correction distincte floor-v2 : seules les bandes extérieures du sol de 32 pixels sont répétées hors image pour couvrir caméra ±220 à zoom .8 ; prolongement de texture latéral du projet, pas certification de carte originale.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/mgs4-europe-de-lest-quai/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/mgs4-europe-de-lest-quai/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/mgs4-europe-de-lest-quai/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/mgs4-europe-de-lest-quai/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"enabled":false,"type":"none","count":0}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-solid-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-solid-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://archive.org/download/PS3_Longplay_081_Metal_Gear_Solid_4/PS3_Longplay_081_Metal_Gear_Solid_4.mkv).

### Amérique du Sud — laboratoire de Naomi — `p18_mgs4_laboratoire_naomi`

**MGS4 · P2 · présent.** Édition : Metal Gear Solid 4 Guns of the Patriots original 2008 PS3, Act 2 Research Lab. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Cadres du laboratoire et de la chambre médicale bois physiquement vus. V1 rejetée pour lit/bureau doublés. V2 garde mobilier seulement en architecture ; quelques portions de parois/fenêtres restent répétées. Choix cohérent de la pièce au sol de bois, surfaces cachées adaptées. Atlas natif original intact, 1672×941 réels ; pas de promesse de résolution 4096. Les quatre rectangles distincts et les alphas ont été mesurés. Les lignes de contact sont enregistrées séparément par rapport au fond. Parallaxe caméra ajoutée ; aucune animation temporelle canonique certifiée. Aperçus Canvas réalisés à caméra −220, 0 et +220 : ligne du sol y=570 entièrement opaque sur 1280 px dans chaque cas. Composition centrale physiquement vue pour les quinze lieux ; Mantis et REX revus aux deux extrêmes après ajustement. Validation de rendu dans le jeu avec vrais combattants et collisions encore à faire par Root. Correction distincte floor-v2 : seules les bandes extérieures du sol de 32 pixels sont répétées hors image pour couvrir caméra ±220 à zoom .8 ; prolongement de texture latéral du projet, pas certification de carte originale.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/mgs4-laboratoire-naomi/planes-v2.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/mgs4-laboratoire-naomi/planes-v2.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/mgs4-laboratoire-naomi/planes-v2.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/mgs4-laboratoire-naomi/planes-v2.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"enabled":false,"type":"none","count":0}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-solid-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-solid-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://archive.org/download/PS3_Longplay_081_Metal_Gear_Solid_4/PS3_Longplay_081_Metal_Gear_Solid_4.mp4).

### Shadow Moses — retour sous la neige — `p18_mgs4_shadow_moses_ruines`

**MGS4 · P2 · présent.** Édition : Metal Gear Solid 4 Guns of the Patriots original 2008 PS3, Act 4 Shadow Moses, snowfield. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Zone de Crying Wolf seulement : neige froide, conifères, bâtiment de service et rampes attestés. Cadre 30950 s à vision nocturne utilisé pour les formes uniquement ; couleurs du cadre naturel 31010 s. Ne combine pas le hangar des tanks avec ce champ de neige. Façade cachée et nombre de sapins adaptés. Atlas natif original intact, 1672×941 réels ; pas de promesse de résolution 4096. Les quatre rectangles distincts et les alphas ont été mesurés. Les lignes de contact sont enregistrées séparément par rapport au fond. Parallaxe caméra ajoutée ; aucune animation temporelle canonique certifiée. Aperçus Canvas réalisés à caméra −220, 0 et +220 : ligne du sol y=570 entièrement opaque sur 1280 px dans chaque cas. Composition centrale physiquement vue pour les quinze lieux ; Mantis et REX revus aux deux extrêmes après ajustement. Validation de rendu dans le jeu avec vrais combattants et collisions encore à faire par Root. Correction distincte floor-v2 : seules les bandes extérieures du sol de 32 pixels sont répétées hors image pour couvrir caméra ±220 à zoom .8 ; prolongement de texture latéral du projet, pas certification de carte originale. Chute de neige optionnelle attestée dans les cadres sources entiers déjà cités ; densité et vitesse des particules adaptées au jeu, sans mesure temporelle canonique.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/mgs4-shadow-moses-ruines/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/mgs4-shadow-moses-ruines/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/mgs4-shadow-moses-ruines/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/mgs4-shadow-moses-ruines/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"enabled":true,"type":"snow","count":36}`. Flocons en plusieurs profondeurs, dérive et intermittence réglées sur capture ; premiers plans moins opaques pour garder jambes et projectiles lisibles. Accumulation ou traces nécessitent une couche persistante distincte.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-solid-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-solid-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://archive.org/download/PS3_Longplay_081_Metal_Gear_Solid_4/PS3_Longplay_081_Metal_Gear_Solid_4.mkv).

### Europe de l’Est — tour Echo’s Beacon — `p18_mgs4_tour_europe_est`

**MGS4 · P2 · présent.** Édition : Metal Gear Solid4Guns of the Patriots original2008PS3Act3 Echo Song bell tower. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Balcon supérieur de Raging Raven attesté par cadre PS3 natif 1280×720 à 23800 s. Pierre sombre, piliers/rampe et toiture visibles ; panorama urbain prolongé au-delà des portions attestées. Architecture du balcon adaptée à un combat latéral. Atlas natif original intact, 1672×941 réels ; pas de promesse de résolution 4096. Les quatre rectangles distincts et les alphas ont été mesurés. Les lignes de contact sont enregistrées séparément par rapport au fond. Parallaxe caméra ajoutée ; aucune animation temporelle canonique certifiée. Aperçus Canvas réalisés à caméra −220, 0 et +220 : ligne du sol y=570 entièrement opaque sur 1280 px dans chaque cas. Composition centrale physiquement vue pour les quinze lieux ; Mantis et REX revus aux deux extrêmes après ajustement. Validation de rendu dans le jeu avec vrais combattants et collisions encore à faire par Root. Correction distincte floor-v2 : seules les bandes extérieures du sol de 32 pixels sont répétées hors image pour couvrir caméra ±220 à zoom .8 ; prolongement de texture latéral du projet, pas certification de carte originale.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/mgs4-tour-europe-est/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/mgs4-tour-europe-est/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/mgs4-tour-europe-est/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/mgs4-tour-europe-est/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"enabled":false,"type":"none","count":0}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-solid-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-solid-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://archive.org/download/PS3_Longplay_081_Metal_Gear_Solid_4/PS3_Longplay_081_Metal_Gear_Solid_4.mkv).

### San Hieronymo — ascenseur du silo — `p18_mpo_san_hieronymo_silo`

**Portable Ops · P2 · présent.** Édition : Metal Gear Solid Portable Ops original 2006 PSP design, Silo Complex cargo elevator confrontation with Cunningham. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Capture PSP originale du duel Cunningham : panneaux rivetés, croisillons, tuyaux et consoles bas attestés. L’ascenseur latéral, hauteur du puits et parties masquées adaptés. Ce lieu n’est pas le stockage nucléaire de Python. Atlas natif original intact, 1672×941 réels ; pas de promesse de résolution 4096. Les quatre rectangles distincts et les alphas ont été mesurés. Les lignes de contact sont enregistrées séparément par rapport au fond. Parallaxe caméra ajoutée ; aucune animation temporelle canonique certifiée. Rendu réel du moteur de plans dans Chrome contrôlé aux trois caméras -220/0/+220 et trois zooms .8/1/1.3 : ligne de sol 568 sans aucun pixel alpha sous160, fond composite opaque. Les cinq compositions centrales ont été physiquement vues ; la prison V1 a été rejetée pour doublon/pieds flottants et V2 revue posée. Validation avec vrais combattants/collisions encore Root.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/mpo-san-hieronymo-silo/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/mpo-san-hieronymo-silo/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/mpo-san-hieronymo-silo/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/mpo-san-hieronymo-silo/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"enabled":false,"type":"none","count":0}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-mpo-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-mpo-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://static.wikia.nocookie.net/metalgear/images/f/f0/Mpo_snake_vs_cunningham.jpg/revision/latest?format=original).

### San Hieronymo — base portuaire — `p18_mpo_san_hieronymo_base_portuaire`

**Portable Ops · P2 · présent.** Édition : Metal Gear Solid Portable Ops original 2006 PSP design, Harbour mission. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Lieu Harbour identifié par dialogue Codec à 300 s ; deux cadres de jeu à 650 et 800 s attestent containers, rampes, garde-corps et bâtiment de briques. Bâtiment répété entre fond et architecture ; plan latéral et quais cachés adaptés, aucun navire/grue inventé. Cadres entiers avec overlays conservés sans retouche. Atlas natif original intact, 1672×941 réels ; pas de promesse de résolution 4096. Les quatre rectangles distincts et les alphas ont été mesurés. Les lignes de contact sont enregistrées séparément par rapport au fond. Parallaxe caméra ajoutée ; aucune animation temporelle canonique certifiée. Rendu réel du moteur de plans dans Chrome contrôlé aux trois caméras -220/0/+220 et trois zooms .8/1/1.3 : ligne de sol 568 sans aucun pixel alpha sous160, fond composite opaque. Les cinq compositions centrales ont été physiquement vues ; la prison V1 a été rejetée pour doublon/pieds flottants et V2 revue posée. Validation avec vrais combattants/collisions encore Root.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/mpo-san-hieronymo-base-portuaire/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/mpo-san-hieronymo-base-portuaire/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/mpo-san-hieronymo-base-portuaire/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/mpo-san-hieronymo-base-portuaire/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"enabled":false,"type":"none","count":0}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-mpo-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-mpo-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://archive.org/download/5-12-24-ratclowncar-metal-gear-solid-portable-ops-psp-2006-part-2/%5B5-12-24%5D%20ratclowncar%20-%20Metal%20Gear%20Solid%EF%BC%9A%20Portable%20Ops%20%5BPSP%5D%20%282006%29%20%EF%BD%9C%20PART%202.mp4#t=650) ; [source2](https://archive.org/download/5-12-24-ratclowncar-metal-gear-solid-portable-ops-psp-2006-part-2/%5B5-12-24%5D%20ratclowncar%20-%20Metal%20Gear%20Solid%EF%BC%9A%20Portable%20Ops%20%5BPSP%5D%20%282006%29%20%EF%BD%9C%20PART%202.mp4#t=800).

### San Hieronymo — laboratoire, adaptation cryogénique — `p18_mpo_san_hieronymo_entrepot_cryogenique`

**Portable Ops · P2 · présent.** Édition : Metal Gear Solid Portable Ops original 2006 PSP design, Research Lab medication/Null story context; project stage adaptation. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Étiquette entrepôt cryogénique du projet : aucune pièce canonique homonyme certifiée. Matériaux du stockage Research Lab original attestés par capture 9400 s dans la mission médicaments et dialogue original LP Part6. Aucun caisson de cryostase, glace ou tank inventé. Géométrie cachée adaptée. Premier essai V1 reclassé Launch Control Room après preuve Gene, jamais approuvé pour ce stage. Atlas natif original intact, 1672×941 réels ; pas de promesse de résolution 4096. Les quatre rectangles distincts et les alphas ont été mesurés. Les lignes de contact sont enregistrées séparément par rapport au fond. Parallaxe caméra ajoutée ; aucune animation temporelle canonique certifiée. Rendu réel du moteur de plans dans Chrome contrôlé aux trois caméras -220/0/+220 et trois zooms .8/1/1.3 : ligne de sol 568 sans aucun pixel alpha sous160, fond composite opaque. Les cinq compositions centrales ont été physiquement vues ; la prison V1 a été rejetée pour doublon/pieds flottants et V2 revue posée. Validation avec vrais combattants/collisions encore Root.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/mpo-san-hieronymo-entrepot-cryogenique/planes-v2.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/mpo-san-hieronymo-entrepot-cryogenique/planes-v2.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/mpo-san-hieronymo-entrepot-cryogenique/planes-v2.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/mpo-san-hieronymo-entrepot-cryogenique/planes-v2.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"enabled":false,"type":"none","count":0}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-mpo-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-mpo-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://archive.org/download/5-12-24-ratclowncar-metal-gear-solid-portable-ops-psp-2006-debut-part-1/%5B5-12-24%5D%20ratclowncar%20-%20Metal%20Gear%20Solid%EF%BC%9A%20Portable%20Ops%20%5BPSP%5D%20%282006%29%20%EF%BD%9C%20DEBUT%EF%BC%8FPART%201.mp4#t=9400).

### San Hieronymo — détention, adaptation latérale — `p18_mpo_san_hieronymo_prison`

**Portable Ops · P2 · présent.** Édition : Metal Gear Solid Portable Ops original 2006 PSP design, initial San Hieronymo prison escape. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Capture PSP originale processing center de la prison : béton gris-vert, bande de peinture basse, plafond bas et deux postes de contrôle attestés. Étiquette cour de détention et espace latéral sont compositions du projet, aucune cour extérieure originale certifiée. V1 conservée mais rejetée après revue pour duplication et pieds flottants. V2 garde les murs seuls au fond et les deux postes de contrôle sur une base horizontale commune. Atlas natif original intact, 1672×941 réels ; pas de promesse de résolution 4096. Les quatre rectangles distincts et les alphas ont été mesurés. Les lignes de contact sont enregistrées séparément par rapport au fond. Parallaxe caméra ajoutée ; aucune animation temporelle canonique certifiée. Rendu réel du moteur de plans dans Chrome contrôlé aux trois caméras -220/0/+220 et trois zooms .8/1/1.3 : ligne de sol 568 sans aucun pixel alpha sous160, fond composite opaque. Les cinq compositions centrales ont été physiquement vues ; la prison V1 a été rejetée pour doublon/pieds flottants et V2 revue posée. Validation avec vrais combattants/collisions encore Root.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/mpo-san-hieronymo-prison/planes-v2.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/mpo-san-hieronymo-prison/planes-v2.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/mpo-san-hieronymo-prison/planes-v2.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/mpo-san-hieronymo-prison/planes-v2.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"enabled":false,"type":"none","count":0}`. Définir une ambiance de prison propre ; créer deux décors de duel Null dédiés avant de déclarer les rencontres fidèles.

**Écart spécifique :** Cette scène sert à la détention de San Hieronymo ; le mapping Null doit être réexaminé : son premier duel est à l’entrée du silo, le second à la sous-station.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-mpo-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-mpo-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://lparchive.org/Metal-Gear-Solid-Portable-Ops/Update%2002/33-POps2032.png).

### San Hieronymo — contrôle du lancement ICBMG — `p18_mpo_silo_lancement_icbmg`

**Portable Ops · P2 · présent.** Édition : Metal Gear Solid Portable Ops original 2006 PSP design, Launch Control Room, Gene duel and ICBMG launch sequence. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Capture HardcoreGaming101 portableOps95 identifiée grâce à un cadre original du combat Gene à 23600 s : Launch Control Room, escalier, rambarde et consoles, sol pâle. Label lancement ICBMG contextuel et plan de combat latéral adaptés ; aucun pas de tir extérieur complet ni corps de missile certifié. Rambarde répétée entre fond et architecture. PNG issu du premier appel initialement mal étiqueté laboratoire, original et correction de provenance préservés. Atlas natif original intact, 1672×941 réels ; pas de promesse de résolution 4096. Les quatre rectangles distincts et les alphas ont été mesurés. Les lignes de contact sont enregistrées séparément par rapport au fond. Parallaxe caméra ajoutée ; aucune animation temporelle canonique certifiée. Rendu réel du moteur de plans dans Chrome contrôlé aux trois caméras -220/0/+220 et trois zooms .8/1/1.3 : ligne de sol 568 sans aucun pixel alpha sous160, fond composite opaque. Les cinq compositions centrales ont été physiquement vues ; la prison V1 a été rejetée pour doublon/pieds flottants et V2 revue posée. Validation avec vrais combattants/collisions encore Root.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/mpo-silo-lancement-icbmg/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/mpo-silo-lancement-icbmg/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/mpo-silo-lancement-icbmg/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/mpo-silo-lancement-icbmg/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"enabled":false,"type":"none","count":0}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-mpo-stage-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-mpo-stage-catalog.js). Références déclarées dans le dépôt : [source1](https://www.hardcoregaming101.net/wp-content/uploads/2024/03/portableOps-95.jpg) ; [source2](https://archive.org/download/5-12-24-ratclowncar-metal-gear-solid-portable-ops-psp-2006-part-4/%5B5-12-24%5D%20ratclowncar%20-%20%20Metal%20Gear%20Solid%EF%BC%9A%20Portable%20Ops%20%5BPSP%5D%20%282006%29%20%EF%BD%9C%20PART%204.mp4).

### Bosque del Alba — jungle de Costa Rica — `p18_pw_costa_rica_jungle`

**Peace Walker · P2 · présent.** Édition : Metal Gear Solid: Peace Walker (2010). Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Original Peace Walker Bosque del Alba Costa Rica tropical forest path, authentic original2010 gameplay attached. Tall broad dark mossy tree trunks, curved exposed roots, deep layered fern leaves, pale ochre-green hazy canopy light, rough gray-brown moss-edged earth embankments and low natural dark rocks. Dense forest remains in architecture tile only; far tile pale green mist/canopy with distant tree silhouette only. Ground a dry packed olive-brown forest footpath with shallow roots near outer edges; NO orange autumn leaves, mountain temples or generic palm beach. The chainlink entry gate appears only optional far-edge small prop, do not dominate forest path. Preserve original forest coloration and actual tree/fern forms. Actual source files and every native candidate physically reviewed. Source pixels remain byte-identical; integer sourceRects isolate original four depth planes, including real asymmetric partition. Planes receive independent uniform placement from measured opaque bounds, keeping architecture visible above fight floor; shape/aspect preserved. Full-width rectangular environment fields cover allcamera/zoomedges; tallupper structures canleave viewport likea closertalking/duel lens, neverdeleted fromnative source. Camera -220/0/+220 and zoom .8/1/1.3 runtime QA required. Ordinary floor-edge strips repeat only outside source art. Side-on projection, unseen surfaces and combat lane are authored adaptations; no absolute1:1 topology/hardware or source animation timing is certified. Native sky alpha gaps have explicit reviewed palette backing.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/pw-costa-rica-jungle/planes-v1.png` | {"xAmplitude":1.5,"yAmplitude":0,"speed":0.12,"phase":0.3,"opacityAmplitude":0} |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/pw-costa-rica-jungle/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/pw-costa-rica-jungle/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/pw-costa-rica-jungle/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-pw-phantom-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-pw-phantom-catalog.js). Références déclarées dans le dépôt : [source1](https://www.gamespot.com/wp-content/uploads/original/gamespot/images/2010/features/gameguides/mgs-peace-walker/2145846-0001.jpg) ; [source2](https://www.gamespot.com/wp-content/uploads/original/gamespot/images/2010/features/gameguides/mgs-peace-walker/2145868-0002.jpg).

### Fuerte la Ladera — adaptation du slot Idalia — `p18_pw_chateau_didalia`

**Peace Walker · P2 · présent.** Édition : Metal Gear Solid: Peace Walker (2010). Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Original PSP Peace Walker Fuerte la Ladera old hillside fort. Match attached actual480x272originalPSPdaytime gameplay photographs: thick low rectangular pale gray-green rough stone-block fortifiedbuilding with BROKEN missing upperparapetwallchunks, tall rectangular openwindow/slit and dark rectangular entrances, exteriorblacksteel ladder left, chainlinkguardgate, plainrustedlow shippingcontainer right, roughrockcutgreen-gray mountainside behind. It is squat weathered civil-war fort, NOT a medieval castle; NO arches, steeples, tiledroof orornamentalcolumn. Upper-left ONLY palegreen cloudmist sky distantrockhills, upper-right ONLY lower rectangularruined graygreenfortwalls with actualdarkrectangulardoor/windows/ladder/container, transparentaboveandbelow. Lower-left ONLY continuousflat gray-greenpackedearth gravel lane matchingoriginalcourtyard. Lower-right ONLYveryfewsmallgray rocks/wornstonesoutercorners, no wallblockingcenter. Preserveexact PSPfort silhouette/palette, highquality2.5D material rendering; removegamewatermarkandUI. This depicts attested Fuerte laLadera and never certifies originalunsupported Idalia name. Actual source files and every native candidate physically reviewed. Source pixels remain byte-identical; integer sourceRects isolate original four depth planes, including real asymmetric partition. Planes receive independent uniform placement from measured opaque bounds, keeping architecture visible above fight floor; shape/aspect preserved. Full-width rectangular environment fields cover allcamera/zoomedges; tallupper structures canleave viewport likea closertalking/duel lens, neverdeleted fromnative source. Camera -220/0/+220 and zoom .8/1/1.3 runtime QA required. Ordinary floor-edge strips repeat only outside source art. Side-on projection, unseen surfaces and combat lane are authored adaptations; no absolute1:1 topology/hardware or source animation timing is certified. Native sky alpha gaps have explicit reviewed palette backing. Original slot label Château d’Idalia unsupported; Fuerte laLadera is an explicitly documented presentation adaptation of preserved UID, never a canonical alias.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/pw-chateau-didalia/planes-v1.png` | {"xAmplitude":1.5,"yAmplitude":0,"speed":0.12,"phase":0.3,"opacityAmplitude":0} |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/pw-chateau-didalia/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/pw-chateau-didalia/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/pw-chateau-didalia/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-pw-phantom-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-pw-phantom-catalog.js). Références déclarées dans le dépôt : [source1](https://static.wikia.nocookie.net/metalgear/images/7/72/110208033845.JPG) ; [source2](https://static.wikia.nocookie.net/metalgear/images/b/b2/110208033922.JPG) ; [source3](https://static.wikia.nocookie.net/metalgear/images/6/66/110208034318.JPG).

### Lago Cocibolca — rive de la base américaine — `p18_pw_lac_cocibolca`

**Peace Walker · P2 · présent.** Édition : Metal Gear Solid: Peace Walker (2010). Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** PeaceWalker LakeCocibolca Nicaragua sacrifice-ending location. Exactactualfinalgamecutscene nativeframes attached fromPWLP Sing, NOT a real-world lakephoto. Sourcewater is wide subduedOLIVE/TAN/YELLOW-GREEN shimmeringlake withsoftsmallripples, hazydiffused palecreamcloudy sky, a continuous distantgrayconcrete shorewallwithlowmilitaryindustrialbuildingsandthinradar/floodlightmasts faintonhorizon, as seenbehind sinkingPeaceWalker. No pristinebluewater/tropicalholidaybeach, no mountaincastle/islandsculptures. Upper-left ONLY actualpalecream/olivehazy sky andveryfaintremoteland silhouette, no buildings orwater. Upper-rightONLYbroadolivetan lake surface withsmallnative-lookingripples andthin actualdistant USMissileBase shorewall/lowbuilding/masts along horizon, transparent sky above; water may occupy lowerhalf of tile, no groundlane orrobot. Lower-left ONLYflatcontinuous wornpalegray-greenmilitaryconcrete quayedge battlelane fromattachedauthenticbaseyard floor,waterbackgroundremainsbehind; sideoncombatquaiis explicitlyminimalgroundadaptation not literaloriginalcamera. Lower-rightONLYtiny concreteedge/chippedgraystoneandonegraymetalrailbase atoutercorners, nomachinewreckageorfullfloor. RemovePeaceWalker entirely, alltextballoons/subtitles,characters/UI fromsource. Allmachinepieces remain independentruntimeassets. Preserve originalrealwater/materialcolor, restrained realistic2.5D matchingoriginalhybridcutscenephotography not stylizedmanga outlines. Actual source files and every native candidate physically reviewed. Source pixels remain byte-identical; integer sourceRects isolate original four depth planes, including real asymmetric partition. Planes receive independent uniform placement from measured opaque bounds, keeping architecture visible above fight floor; shape/aspect preserved. Full-width rectangular environment fields cover allcamera/zoomedges; tallupper structures canleave viewport likea closertalking/duel lens, neverdeleted fromnative source. Camera -220/0/+220 and zoom .8/1/1.3 runtime QA required. Ordinary floor-edge strips repeat only outside source art. Side-on projection, unseen surfaces and combat lane are authored adaptations; no absolute1:1 topology/hardware or source animation timing is certified. Native sky alpha gaps have explicit reviewed palette backing. Lake/water and horizon verified in actual final hybrid comic cutscene; quay lane adapted from same base gameplay. Ground contact starts on flat lane after curb. Water surface static source; atmospheric movement authored.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/pw-lac-cocibolca/planes-v1.png` | {"xAmplitude":1.5,"yAmplitude":0,"speed":0.12,"phase":0.3,"opacityAmplitude":0} |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/pw-lac-cocibolca/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/pw-lac-cocibolca/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/pw-lac-cocibolca/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-pw-phantom-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-pw-phantom-catalog.js). Références déclarées dans le dépôt : [source1](https://archive.org/download/LP-Metal-Gear-Solid-Peace-Walker/Metal%20Gear%20Solid%20-%20Peace%20Walker%20%2315-1%20-%20Sing%20%28Uncut%20Commentary%29-MymqeSEvjHg.ia.mp4) ; [source2](https://www.gamespot.com/wp-content/uploads/original/gamespot/images/2010/features/gameguides/mgs-peace-walker/2147005-0066.jpg).

### Base du cratère — Pupa — `p18_pw_pupa_operation`

**Peace Walker · P2 · présent.** Édition : Metal Gear Solid: Peace Walker (2010). Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Original Peace Walker main Pupa battle Crater Base arena from attached2010 gameplay. NOT open-pit mine. Large circular pale gray-green CONCRETE industrial crater-base hangar with very high curved cylindrical wall, dark rectangular industrial opening on right/side, upper pale concrete parapet and several thin tall black steel lattice floodlight tower supports with white lamps, dark brown-black upper enclosure/roof zone. Worn pale gray-green smooth concrete battle floor. Preserve original circular wall proportions, gray-green concrete palette, dark steel supports and low overhead atmosphere. Remove the Pupa machine itself, crosshair and all human bodies. Far tile contains only dark upper hangar envelope without concrete floor; middle architecture tile only the curved tall concrete wall, industrial door, parapet and floodlight lattice, no ground. Ground lower-left fullwidth clean pale worn concrete with subtle slab seams; foreground lower-right only tiny metal debris at extreme edges, no new barriers or machinery. CORRECTION OF v1 ATLAS: preserve same actual place and4-quadrantlayout. The upper-right architecture is a TRANSPARENT CUTOUT around allwalls/lamps/gantry, EVERY pixel of visible sky behind/above/between structures mustalpha0. Upper-left is only ONE plain distant sky/envelope rectangle and NO closefloodlight/supports. Lower-right entirelyalpha0 except tinyedgeprops, never fullfloor texture. The ONLY solid combatfloor surface exists in lower-left. Absolutely NO duplicated lamptowers acrosspanels, NO repeatedfullfloor inforeground. Actual source files and every native candidate physically reviewed. Source pixels remain byte-identical; integer sourceRects isolate original four depth planes, including real asymmetric partition. Planes receive independent uniform placement from measured opaque bounds, keeping architecture visible above fight floor; shape/aspect preserved. Full-width rectangular environment fields cover allcamera/zoomedges; tallupper structures canleave viewport likea closertalking/duel lens, neverdeleted fromnative source. Camera -220/0/+220 and zoom .8/1/1.3 runtime QA required. Ordinary floor-edge strips repeat only outside source art. Side-on projection, unseen surfaces and combat lane are authored adaptations; no absolute1:1 topology/hardware or source animation timing is certified. Native sky alpha gaps have explicit reviewed palette backing. v1 rejected for duplicate lamps/floor; v2 corrected lamps and architecture. Foreground bounded sourceRect stops before remaining full floor strip, keeping native barrier fragment/tiny debris only, never drawing duplicate floor. Original v1/v2 preserved. Craterwall view uniformly enlarged tocover allcamera/zoomedges; tallupperlamp portions mayleave viewport likeoriginalclosefight camera, neverdeleted fromsource.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/pw-pupa-operation/planes-v2.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/pw-pupa-operation/planes-v2.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/pw-pupa-operation/planes-v2.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/pw-pupa-operation/planes-v2.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-pw-phantom-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-pw-phantom-catalog.js). Références déclarées dans le dépôt : [source1](https://www.gamespot.com/wp-content/uploads/original/gamespot/images/2010/features/gameguides/mgs-peace-walker/2146411-0022.jpg) ; [source2](https://www.gamespot.com/wp-content/uploads/original/gamespot/images/2010/features/gameguides/mgs-peace-walker/2146426-0023.jpg).

### Ruines du laboratoire IA — Chrysalis — `p18_pw_chrysalis_operation`

**Peace Walker · P2 · présent.** Édition : Metal Gear Solid: Peace Walker (2010). Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Original Peace Walker Chrysalis main fight at the AI Lab ruins, as visibly established in attached actual released gameplay. Pale desaturated cyan-green foggy sky. Ancient Costa Rican square stepped Mesoamerican stone temple in distant middle, long center stair climbs a tiered rectangular temple, broken moss-covered stone walls and tilted angular slabs at sides. Weathered gray-green large squared masonry blocks, broken stone courtyards. Exact actual ruin palette and architecture, NO medieval castles or Greek columns, no futuristic hangars. Upper-left ONLY cyan mist sky and VERY distant low green hill silhouettes, no temple/stairs. Upper-right ONLY full layered gray-green ancient block temple/steps and broken walls, no sky/floor. Lower-left ONLY continuous flat weathered gray-green squared stone slab battle lane with subtle shallow seams, no staircase crossing the fighting lane. Lower-right ONLY a few broken mossy stone fragments at extreme outer corners, center transparent. Remove Chrysalis, soldiers, crosshairs and HUD completely. Actual source files and every native candidate physically reviewed. Source pixels remain byte-identical; integer sourceRects isolate original four depth planes, including real asymmetric partition. Planes receive independent uniform placement from measured opaque bounds, keeping architecture visible above fight floor; shape/aspect preserved. Full-width rectangular environment fields cover allcamera/zoomedges; tallupper structures canleave viewport likea closertalking/duel lens, neverdeleted fromnative source. Camera -220/0/+220 and zoom .8/1/1.3 runtime QA required. Ordinary floor-edge strips repeat only outside source art. Side-on projection, unseen surfaces and combat lane are authored adaptations; no absolute1:1 topology/hardware or source animation timing is certified. Native sky alpha gaps have explicit reviewed palette backing.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/pw-chrysalis-operation/planes-v1.png` | {"xAmplitude":1.5,"yAmplitude":0,"speed":0.12,"phase":0.3,"opacityAmplitude":0} |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/pw-chrysalis-operation/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/pw-chrysalis-operation/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/pw-chrysalis-operation/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-pw-phantom-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-pw-phantom-catalog.js). Références déclarées dans le dépôt : [source1](https://www.gamerguides.com/images/markup-img-full/17/85/82643-1414278000.png.jpeg) ; [source2](https://www.gamespot.com/wp-content/uploads/original/gamespot/images/2010/features/gameguides/mgs-peace-walker/2146715-0047.jpg).

### Mine à ciel ouvert — Cocoon — `p18_pw_cocoon_operation`

**Peace Walker · P2 · présent.** Édition : Metal Gear Solid: Peace Walker (2010). Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Original Peace Walker Cocoon battle open-pit mine, faithfully match attached original released gameplay. Deep excavated quarry with VERY HIGH rough warm ochre/yellow rock wall, angular natural bare rock peaks beyond quarry rim, subdued pale olive cloudy sky and dusty tan-brown packed quarry floor. This is an open-pit mine, NOT invented mountain fortress or industrial city. Upper-left ONLY pale olive cloudy sky with tiny far bare peaks on low horizon, absolutely NO close quarry wall. Upper-right ONLY tall continuous rough ochre/yellow excavated quarry cliff wall, broken natural stone strata/planes, alpha clear above rim and below wall, no sky/ground. Lower-left ONLY continuous flat packed ochre-brown quarry earth lane, small rough stones and wheel marks very subtle, floor starts70% tileheight and reachesbottom allwidth. Lower-right ONLY a few sparse dark ochre gravel/stone piles at outer bottom corners, no floor slab or central obstacle. Remove Cocoon robot, human, weapons, AI pod, subtitles, HUD. Do NOT copy machine surfaces into environment. Actual source files and every native candidate physically reviewed. Source pixels remain byte-identical; integer sourceRects isolate original four depth planes, including real asymmetric partition. Planes receive independent uniform placement from measured opaque bounds, keeping architecture visible above fight floor; shape/aspect preserved. Full-width rectangular environment fields cover allcamera/zoomedges; tallupper structures canleave viewport likea closertalking/duel lens, neverdeleted fromnative source. Camera -220/0/+220 and zoom .8/1/1.3 runtime QA required. Ordinary floor-edge strips repeat only outside source art. Side-on projection, unseen surfaces and combat lane are authored adaptations; no absolute1:1 topology/hardware or source animation timing is certified. Native sky alpha gaps have explicit reviewed palette backing.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/pw-cocoon-operation/planes-v1.png` | {"xAmplitude":1.5,"yAmplitude":0,"speed":0.12,"phase":0.3,"opacityAmplitude":0} |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/pw-cocoon-operation/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/pw-cocoon-operation/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/pw-cocoon-operation/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-pw-phantom-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-pw-phantom-catalog.js). Références déclarées dans le dépôt : [source1](https://www.gamerguides.com/images/markup-img-full/17/85/82655-1414278000.png.jpeg) ; [source2](https://www.gamerguides.com/images/markup-img-full/17/85/82657-1414278000.png.jpeg).

### Base américaine du Nicaragua — Peace Walker — `p18_pw_peace_walker_operation`

**Peace Walker · P2 · présent.** Édition : Metal Gear Solid: Peace Walker (2010). Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Original Peace Walker finalmainBattle2 US Missile Base Nicaragua LakeCocibolca militaryyard fromattached original released gameplay. Preserveactualyellow-green grayoliveluminous cloudy sky, broad flat grayconcreteindustrialyard, red-brown thinsteel overheadgantry cranebeam and latticelegs, gray-greenlowhangarbuildings withrectangularindustrialdoors, lowventductsandroundedroofexhaustboxes, darkgraymetalbarfence andchainlinkrail perimeter, stacked militarycrates outsidethefightlane. Upper-left ONLYactualyellowgreen hazycloudsky+verydistant lowwaterhorizon, no crane/buildings. Upper-right ONLYactualthinlatticegantrycrane, lowgraygreenindustrialhangars anddarksteelperimeterrail, alphaaboveandbelow. Lower-left ONLYcontinuouswornpalegraygreenconcretecombatlane withsubtleindustrialpaint/slabseams, no perspectivewatercrossingfloor. Lower-rightONLYfewsmallgrayindustrialconcretefragments/cratecorners extremeedge, centertransparent. No inventedmountainfortress, sci-fitowers orrobotcarcass. RemovePeaceWalkerrobotandsoldiers/AIpod/UI completely. ExactlandmarksoriginalPW notMGSV MotherBase. CORRECTION OF v1 ATLAS: preserve same actual place and4-quadrantlayout. The upper-right architecture is a TRANSPARENT CUTOUT around allwalls/lamps/gantry, EVERY pixel of visible sky behind/above/between structures mustalpha0. Upper-left is only ONE plain distant sky/envelope rectangle and NO closefloodlight/supports. Lower-right entirelyalpha0 except tinyedgeprops, never fullfloor texture. The ONLY solid combatfloor surface exists in lower-left. Absolutely NO duplicated lamptowers acrosspanels, NO repeatedfullfloor inforeground. Actual source files and every native candidate physically reviewed. Source pixels remain byte-identical; integer sourceRects isolate original four depth planes, including real asymmetric partition. Planes receive independent uniform placement from measured opaque bounds, keeping architecture visible above fight floor; shape/aspect preserved. Full-width rectangular environment fields cover allcamera/zoomedges; tallupper structures canleave viewport likea closertalking/duel lens, neverdeleted fromnative source. Camera -220/0/+220 and zoom .8/1/1.3 runtime QA required. Ordinary floor-edge strips repeat only outside source art. Side-on projection, unseen surfaces and combat lane are authored adaptations; no absolute1:1 topology/hardware or source animation timing is certified. Native sky alpha gaps have explicit reviewed palette backing. v1 rejected for opaque duplicated sky in architecture. v2 isolates transparent native crane/hangar; partition536 measured instead of assuming half470.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/pw-peace-walker-operation/planes-v2.png` | {"xAmplitude":1.5,"yAmplitude":0,"speed":0.12,"phase":0.3,"opacityAmplitude":0} |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/pw-peace-walker-operation/planes-v2.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/pw-peace-walker-operation/planes-v2.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/pw-peace-walker-operation/planes-v2.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-pw-phantom-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-pw-phantom-catalog.js). Références déclarées dans le dépôt : [source1](https://www.gamerguides.com/images/markup-img-full/17/85/82763-1414454400.png.jpeg) ; [source2](https://www.gamespot.com/wp-content/uploads/original/gamespot/images/2010/features/gameguides/mgs-peace-walker/2147005-0066.jpg) ; [source3](https://www.gamerguides.com/images/markup-img-full/17/85/82765-1414454400.png.jpeg).

### Camp Omega — héliport sous la pluie — `p18_gz_camp_omega_heliport`

**Ground Zeroes · P2 · présent.** Édition : Metal Gear Solid V: Ground Zeroes (2014), final released game. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** MetalGearSolidV GroundZeroes final2014 CampOmega HELIPORT fromattached original released gameplay1280x720, not2012preview. Rainynight desaturatedcold blue-gray, tallbluewhiteblindingfloodlights, steelguardwatchtowerupperright withrailcatwalk, squatelongatedrectangularconcrete administration/buildingbackwall andsmallguardbooths, redpaintedwindsock/radiomastpole onlynearleftedge. Dark wetconcrete/asphalthelipad with actualsmall red-orange flushgroundguide lights, drainagechannelandlowpainted laneedge. Upper-leftONLYcold bluegrayraincloudnightsky andveryfaint remoteouterfacility silhouette, no closefloodlights/guardtower. Upper-rightONLYexactrectangularlowmilitaryfacilitywall, darksteelguardtower, tallfloodlightpostsandleftslimredpole/lowmetalrails, alpha clearedskyfloor; no bakedwholeconcretepad. Lower-left ONLYflatcontinuouswetgray helipad/asphaltcombatlane withsubtle drainagechannel and smallwarmredgroundguide lightspots, no giantcenterHlogo(notvisible actualsource), upper70%clear. Lower-rightONLYfew smallindustrialbarrier/polebases atoutercorners, no centralobstruction/wholefloor. RemoveBigBoss/patchequipment/HUD; no helicopter staticallybaked as it isruntimeactor, no constructioncity oroverdramaticneon. Rainparticlesanimatedseparately not opaque streakoverlayatlas. Actual source files and every native candidate physically reviewed. Source pixels remain byte-identical; integer sourceRects isolate original four depth planes, including real asymmetric partition. Planes receive independent uniform placement from measured opaque bounds, keeping architecture visible above fight floor; shape/aspect preserved. Full-width rectangular environment fields cover allcamera/zoomedges; tallupper structures canleave viewport likea closertalking/duel lens, neverdeleted fromnative source. Camera -220/0/+220 and zoom .8/1/1.3 runtime QA required. Ordinary floor-edge strips repeat only outside source art. Side-on projection, unseen surfaces and combat lane are authored adaptations; no absolute1:1 topology/hardware or source animation timing is certified. Native sky alpha gaps have explicit reviewed palette backing.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/gz-camp-omega-heliport/planes-v1.png` | {"xAmplitude":1.5,"yAmplitude":0,"speed":0.12,"phase":0.3,"opacityAmplitude":0} |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/gz-camp-omega-heliport/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/gz-camp-omega-heliport/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/gz-camp-omega-heliport/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"rain","enabled":true,"count":24,"color":"#9fb2be","sourceReferenceURLs":["https://www.gamespot.com/wp-content/uploads/original/1406/14063904/2456833-vlcsnap-00031.jpg","https://www.gamepressure.com/mgs5groundzeroes/gfx/word/585450068.jpg"],"authoredMotionNotSourceFrameTiming":true}`. Filets de pluie selon profondeur, impacts au sol et ruissellement seulement sur surfaces correspondantes. Les reflets et flashes suivent l’éclairage ; une pluie permanente ne prouve pas l’instant source.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-pw-phantom-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-pw-phantom-catalog.js). Références déclarées dans le dépôt : [source1](https://www.gamespot.com/wp-content/uploads/original/1406/14063904/2456833-vlcsnap-00031.jpg) ; [source2](https://www.gamepressure.com/mgs5groundzeroes/gfx/word/585450068.jpg).

### Ruines d’Aabe Shifap — duel de Quiet — `p18_tpp_afghanistan_ruines_daabe_shifap`

**MGSV TPP · P2 · présent.** Édition : Metal Gear Solid V: The Phantom Pain (2015), final released game. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** MGSV The Phantom Pain final2015 Aabe Shifap Ruins, exact real Quiet sniper duelsite shown attached. Night dusk desaturated slate blue-gray sky, far natural Afghanistan low mountains. Main architecture is a broken ancient gray stone-block aqueduct/ruin wall with FOUR rounded arch openings, irregular rubble/missing stone along the roof rim, thick square-block archpier supports, coarse cracks in layeredrectangularstone. A tall broken squaredstone pillar/ruintower near side at distance, no intact ornate castle. Flatgrayroughstone ruinscourtyard ground; dry scrub tiny sparseouteredges. Upper-left onlyblue-graysky/farmountains; upper-right ONLY actualbroken gray-block arches andtower, no ground; lower-leftcontinuousgraystone combatlane; lower-rightsmallbrokenstone/dryscrubcorners. NO medievaldecorations, marbleGreekcolumns or desertpalms, noreticleorQuiet. Actual source files and every native candidate physically reviewed. Source pixels remain byte-identical; integer sourceRects isolate original four depth planes, including real asymmetric partition. Planes receive independent uniform placement from measured opaque bounds, keeping architecture visible above fight floor; shape/aspect preserved. Full-width rectangular environment fields cover allcamera/zoomedges; tallupper structures canleave viewport likea closertalking/duel lens, neverdeleted fromnative source. Camera -220/0/+220 and zoom .8/1/1.3 runtime QA required. Ordinary floor-edge strips repeat only outside source art. Side-on projection, unseen surfaces and combat lane are authored adaptations; no absolute1:1 topology/hardware or source animation timing is certified. Native sky alpha gaps have explicit reviewed palette backing.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/tpp-afghanistan-ruines-daabe-shifap/planes-v1.png` | {"xAmplitude":1.5,"yAmplitude":0,"speed":0.12,"phase":0.3,"opacityAmplitude":0} |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/tpp-afghanistan-ruines-daabe-shifap/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/tpp-afghanistan-ruines-daabe-shifap/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/tpp-afghanistan-ruines-daabe-shifap/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-pw-phantom-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-pw-phantom-catalog.js). Références déclarées dans le dépôt : [source1](https://www.gamepressure.com/mgs5thephantompain/gfx/word/367553004.jpg) ; [source2](https://www.gamepressure.com/mgs5thephantompain/gfx/word/367553019.jpg).

### Centrale de Serak — installations extérieures — `p18_tpp_afghanistan_centrale_serak`

**MGSV TPP · P2 · présent.** Édition : Metal Gear Solid V: The Phantom Pain (2015), final released game. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** MGSV The Phantom Pain final2015 actual Serak Power Plant at night, attachedoriginalscreenshots identifiedSerak. RockyAfghancanyongray sedimentarystratifiedhighwalls, massiveblacksteel high-voltage latticepyloncenter withpowerlines spanningthecanyon, tallfloodlightstands; plantyard withlongitudinalcrackedtanconcrete utilitybuilding andplainmetalrectangulardoor/whiteverticaldrainpipes, bigroundedhorizontalwarmtan industrialfuel tanksonsteelstands behindchainlinkfenceleft/right. StrictactualSerakreferenceelements; noAfghanistanCentralBaseCamp hangars/city orinventedfactorysmokestacks. Upper-left only slate-blue cloudy nightsky withverydistant barehills. Upper-right ONLY actualgrayrockcanyon+blacklatticepylon(powerlines), chainlink fence/fueltanks/crackedtan utilitybuilding; nofloor. Lower-left ONLYcontinuousflatgray asphalt/gravelserviceyard combatlane withsubtle crackedasphalt/rectangularmetaldrainstripnearouteredge, nostairs acrossfloor. Lower-rightONLYsparse dryscrub/smallgraystonefragments extremebottomcorners, nofullfloor. Removehorse,soldiers,targetmarkers,Hudandtext. Actual source files and every native candidate physically reviewed. Source pixels remain byte-identical; integer sourceRects isolate original four depth planes, including real asymmetric partition. Planes receive independent uniform placement from measured opaque bounds, keeping architecture visible above fight floor; shape/aspect preserved. Full-width rectangular environment fields cover allcamera/zoomedges; tallupper structures canleave viewport likea closertalking/duel lens, neverdeleted fromnative source. Camera -220/0/+220 and zoom .8/1/1.3 runtime QA required. Ordinary floor-edge strips repeat only outside source art. Side-on projection, unseen surfaces and combat lane are authored adaptations; no absolute1:1 topology/hardware or source animation timing is certified. Native sky alpha gaps have explicit reviewed palette backing.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/tpp-afghanistan-centrale-serak/planes-v1.png` | {"xAmplitude":1.5,"yAmplitude":0,"speed":0.12,"phase":0.3,"opacityAmplitude":0} |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/tpp-afghanistan-centrale-serak/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/tpp-afghanistan-centrale-serak/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/tpp-afghanistan-centrale-serak/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-pw-phantom-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-pw-phantom-catalog.js). Références déclarées dans le dépôt : [source1](https://www.gamepressure.com/mgs5thephantompain/gfx/word/367652251.jpg) ; [source2](https://www.gamepressure.com/mgs5thephantompain/gfx/word/496183472.jpg) ; [source3](https://www.gamepressure.com/mgs5thephantompain/gfx/word/349495997.jpg).

### Vallée de Lufwa — forêt du fleuve — `p18_tpp_afrique_centrale_lufwa_valley`

**MGSV TPP · P2 · présent.** Édition : Metal Gear Solid V: The Phantom Pain (2015), final released game. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** MGSV The Phantom Pain final2015 Lufwa Valley CodeTalker approach forest, actual screenshot attached. Moist African broadleafdenseforest with tall dark rough-bark trunks, layered darkgreenbroadleafcanopy, palegrayroundedgranite boulders alongstream-path, low greenlonggrass/reeds, bluishgray earlymorningriver-valley haze. Gentle sloped stone/dirt forestpath adapted minimally toflat2Dfightinglane. Upper-left ONLYmistyslategray-blue distanttreeline atmosphere, no close trees. Upper-right ONLYactual broadleaftrunks/greenfoliage+palegrayroundedboulders behindpath, no foregroundfloor. Lower-leftcontinuous gray-brownmoist dirt/stonepath, subtle damp patches, no river acrossfightlane. Lower-rightsparseclosegreenreedsandroundedboulderfragmentsoutercorners. No mansion facade because this exactviewis forestapproach, noinventedwaterfall, jungletemples orpalmtreebeach. Removeallpeople/HUD. Actual source files and every native candidate physically reviewed. Source pixels remain byte-identical; integer sourceRects isolate original four depth planes, including real asymmetric partition. Planes receive independent uniform placement from measured opaque bounds, keeping architecture visible above fight floor; shape/aspect preserved. Full-width rectangular environment fields cover allcamera/zoomedges; tallupper structures canleave viewport likea closertalking/duel lens, neverdeleted fromnative source. Camera -220/0/+220 and zoom .8/1/1.3 runtime QA required. Ordinary floor-edge strips repeat only outside source art. Side-on projection, unseen surfaces and combat lane are authored adaptations; no absolute1:1 topology/hardware or source animation timing is certified. Native sky alpha gaps have explicit reviewed palette backing.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/tpp-afrique-centrale-lufwa-valley/planes-v1.png` | {"xAmplitude":1.5,"yAmplitude":0,"speed":0.12,"phase":0.3,"opacityAmplitude":0} |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/tpp-afrique-centrale-lufwa-valley/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/tpp-afrique-centrale-lufwa-valley/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/tpp-afrique-centrale-lufwa-valley/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-pw-phantom-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-pw-phantom-catalog.js). Références déclarées dans le dépôt : [source1](https://www.gamepressure.com/mgs5thephantompain/gfx/word/430764359.jpg).

### Hôpital de Chypre — couloir du prologue — `p18_tpp_hopital_chypre`

**MGSV TPP · P2 · présent.** Édition : Metal Gear Solid V: The Phantom Pain (2015), final released game. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** MGSV The Phantom Pain final2015 Cyprus hospital prologue hallway exactly from attachedactualgameplay. Dim hospital corridor with palegray-green upperwalls, ivorybeige lowerwall wainscot, darkthin waist-heighthandrails, oldtallwindowswithhorizontalclosed metalblinds, radiatorbelowwindow, closedcreamhospitaldoors withsmallrectangulartransom glazing. Actual black-beige smallhexagonal floor tiles alternating patterns; greenfluorescentceilingfixtures withprotectivehoods spaceddownhall. A few sparsegraymetalhospitalchair/wheeledcart nearouterwall, privacycurtain olive-grayonwheeledtallstands separated fromfightlane. Sideonprojection preservesarchitecture andoriginalcoldgreen emergency atmosphere. Upper-left ONLYplainback hospitalwall/ceiling envelope, fullyfilled, nofloortile orwindow orfluorescentfixtures. Upper-right ONLYblindswindowframes+radiator, paleclinicaldoors,handrails,columnsupports andgreenfluorescentfixtures, clearalphaoutsideobjects; NO floorand no duplicatedwall envelope. Lower-left ONLYcontinuousflathexagonal black/beigehospitalfloor contactlane,upper70%clear. Lower-right ONLYtinywheeledcart/chairlegsandbrokenglass atoutercorners,nofullfloor/hugecurtain. BurningManfire not baked innewstage; activeflames shouldnativeVFX not duplicatewholehallway. NoIshmael/Ahab, no weapon/UI orpatients. Actual source files and every native candidate physically reviewed. Source pixels remain byte-identical; integer sourceRects isolate original four depth planes, including real asymmetric partition. Planes receive independent uniform placement from measured opaque bounds, keeping architecture visible above fight floor; shape/aspect preserved. Full-width rectangular environment fields cover allcamera/zoomedges; tallupper structures canleave viewport likea closertalking/duel lens, neverdeleted fromnative source. Camera -220/0/+220 and zoom .8/1/1.3 runtime QA required. Ordinary floor-edge strips repeat only outside source art. Side-on projection, unseen surfaces and combat lane are authored adaptations; no absolute1:1 topology/hardware or source animation timing is certified. Native sky alpha gaps have explicit reviewed palette backing.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/tpp-hopital-chypre/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/tpp-hopital-chypre/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/tpp-hopital-chypre/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/tpp-hopital-chypre/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-pw-phantom-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-pw-phantom-catalog.js). Références déclarées dans le dépôt : [source1](https://www.gamepressure.com/mgs5thephantompain/gfx/word/332963978.jpg) ; [source2](https://www.gamepressure.com/mgs5thephantompain/gfx/word/332963994.jpg) ; [source3](https://www.gamepressure.com/mgs5thephantompain/gfx/word/332964009.jpg).

### Da Smasei Laman — brume des Skulls — `p18_tpp_afghanistan_brume_ruines`

**MGSV TPP · P2 · présent.** Édition : Metal Gear Solid V: The Phantom Pain (2015), final released game. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** MGSV The Phantom Pain final2015 mission6 HoneyBee exfiltration Da Smasei Laman ruins Skulls mist encounter, actualattachedgameplay. Dense ochre/paleolive/tan dust-fog obscures canyonwalls. Actualcoarse brownsandstone layeredrockcliffs andsome ancientbroken shortrectangularstoneblockruinwalls inarena, drythornscrub ochregrass, coarse brown-gray rubblepackedearth. ExactactualDaSmaseiLamanfortruins site, NOT AabeShifap arches reuse. Upper-left ONLYdense mutedochre fog withveryfaintfarcliffs, fullyfilledtile. Upper-right ONLYbarebrownsandstone cliffs/outcrops andshortancientblockwallfragments fadedslightlybyfog, alphaaboveandbelow; NO fogcoloredopaque fullrectsky here. Lower-leftONLYflatroughochre-gray earth/rubblecombatlane, no centralcliffbarrier. Lower-rightONLYtinygrayochre stones/drygrassextremebottomcorners. No skulls, people, laser, rocketblast,HoneyBeegun, HUDorcrosshair. Canonfog palette rather than generic purplemagic clouds. Actual source files and every native candidate physically reviewed. Source pixels remain byte-identical; integer sourceRects isolate original four depth planes, including real asymmetric partition. Planes receive independent uniform placement from measured opaque bounds, keeping architecture visible above fight floor; shape/aspect preserved. Full-width rectangular environment fields cover allcamera/zoomedges; tallupper structures canleave viewport likea closertalking/duel lens, neverdeleted fromnative source. Camera -220/0/+220 and zoom .8/1/1.3 runtime QA required. Ordinary floor-edge strips repeat only outside source art. Side-on projection, unseen surfaces and combat lane are authored adaptations; no absolute1:1 topology/hardware or source animation timing is certified. Native sky alpha gaps have explicit reviewed palette backing.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/tpp-afghanistan-brume-ruines/planes-v1.png` | {"xAmplitude":1.5,"yAmplitude":0,"speed":0.12,"phase":0.3,"opacityAmplitude":0} |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/tpp-afghanistan-brume-ruines/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/tpp-afghanistan-brume-ruines/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/tpp-afghanistan-brume-ruines/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-pw-phantom-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-pw-phantom-catalog.js). Références déclarées dans le dépôt : [source1](https://www.gamepressure.com/mgs5thephantompain/gfx/word/1199328869.jpg) ; [source2](https://www.gamepressure.com/mgs5thephantompain/gfx/word/1199328884.jpg).

### Aéroport de Nova Braga — piste des Skulls — `p18_tpp_aeroport_nova_braga_piste`

**MGSV TPP · P2 · présent.** Édition : Metal Gear Solid V: The Phantom Pain (2015), final released game. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** MGSV ThePhantomPain final2015 NovaBraga Airport combatapron/runway inMetallicArchaea. Match actualsourcearchitecture: lowsquaretan concreteutilityhangar walls withbrickverticalpillars, graybluecorrugatedmetalsheets, roofladder; distinctpaleconcreteairtrafficcontroltower distantleft-middle withblackpanoramicwindows andsteelcatwalk, thinpower/floodlightpolesandlines. A whitecivilianfixedwingparkedplane distantbackgroundright actualscreenshot establishes it; optionaltinyfarstaticairportprop only neverfightlane. Slategrayovercastnight/earlymorningmist, flatgraywornconcrete/asphaltapron withactual yellowcurvedtaxiline/adapted straightlateralmarks; lowbrown/drygreen grassyfringe behindlane. Upper-left ONLYcloudybluegraymistyskydistantlowtreeline no controltower. Upper-rightONLYairfieldhangars/utilitywalls/corrugatedfence/controltower/veryfarplane silhouette, clearalphaaboveandbelow, nofullground. Lower-leftONLYcontinuousflatgrayairportaproncombatlane withsubtleyellowtaxiline andslabcracks, no perspectivediagonalcontactedge. Lower-rightONLYfew drygrass/miscsmallmetalairportstandcornerpieces, centertransparent. RemoveSkulls, soldiers, CodeTalker,Hud/scopeanddamagefilter, preserveactualNovaBraga notUSairport/neonrunway. Actual source files and every native candidate physically reviewed. Source pixels remain byte-identical; integer sourceRects isolate original four depth planes, including real asymmetric partition. Planes receive independent uniform placement from measured opaque bounds, keeping architecture visible above fight floor; shape/aspect preserved. Full-width rectangular environment fields cover allcamera/zoomedges; tallupper structures canleave viewport likea closertalking/duel lens, neverdeleted fromnative source. Camera -220/0/+220 and zoom .8/1/1.3 runtime QA required. Ordinary floor-edge strips repeat only outside source art. Side-on projection, unseen surfaces and combat lane are authored adaptations; no absolute1:1 topology/hardware or source animation timing is certified. Native sky alpha gaps have explicit reviewed palette backing.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/tpp-aeroport-nova-braga-piste/planes-v1.png` | {"xAmplitude":1.5,"yAmplitude":0,"speed":0.12,"phase":0.3,"opacityAmplitude":0} |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/tpp-aeroport-nova-braga-piste/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/tpp-aeroport-nova-braga-piste/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/tpp-aeroport-nova-braga-piste/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-pw-phantom-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-pw-phantom-catalog.js). Références déclarées dans le dépôt : [source1](https://www.gamepressure.com/mgs5thephantompain/gfx/word/91998828.jpg) ; [source2](https://www.gamepressure.com/mgs5thephantompain/gfx/word/91998844.jpg) ; [source3](https://www.gamepressure.com/mgs5thephantompain/gfx/word/429044183.jpg).

### Afghanistan — canyon de Sahelanthropus — `p18_tpp_afghanistan_sahelanthropus_canyon`

**MGSV TPP · P2 · présent.** Édition : Metal Gear Solid V: The Phantom Pain (2015), final released game. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** MGSV The Phantom Pain final2015 mission31Sahelanthropus finalAfghanbattle canyon, faithfullyactualattachgameplay. Nightblue-graycloudsky smallpale fullmoon, layered lightgray/brown sedimentaryroughcliffs androckyhills, blacksteel latticepowertransmissiontower withlinescrossingsky, sparse darkolive/drybrownscrubgrasses; crackedasphalt/graygravel service road alongcanyon. Disregard redscreen damagefilter inoneattachedimage; actualbasecolors established fromotherbluegraycaptures. Upper-leftONLYbluegraynightcloudsky smallpalefullmoon distantlowmountain silhouettes, no electricitytower. Upper-rightONLYcloserlayeredsedimentary graybrowncanyonrock/cliffs andblacklatticepylonwithcables, alpha clearsky, nofloor. Lower-left ONLY continuousflatgraygravel/asphaltbattlelane coarse shallowcracks smallstones, no perspectiveuphill edge. Lower-right ONLYsparse drybrownthornscrub andsmallrocks atouterbottomcorners. RemoveSahelanthropusmachine, tanks,soldier,ember particles/UI; explosive effects come separately inruntime, do NOT bakebossorweapons. No desertcity/palms/industrialhangarborrowedfromotherlocation. Actual source files and every native candidate physically reviewed. Source pixels remain byte-identical; integer sourceRects isolate original four depth planes, including real asymmetric partition. Planes receive independent uniform placement from measured opaque bounds, keeping architecture visible above fight floor; shape/aspect preserved. Full-width rectangular environment fields cover allcamera/zoomedges; tallupper structures canleave viewport likea closertalking/duel lens, neverdeleted fromnative source. Camera -220/0/+220 and zoom .8/1/1.3 runtime QA required. Ordinary floor-edge strips repeat only outside source art. Side-on projection, unseen surfaces and combat lane are authored adaptations; no absolute1:1 topology/hardware or source animation timing is certified. Native sky alpha gaps have explicit reviewed palette backing.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass18/tpp-afghanistan-sahelanthropus-canyon/planes-v1.png` | {"xAmplitude":1.5,"yAmplitude":0,"speed":0.12,"phase":0.3,"opacityAmplitude":0} |
| architecture / architecture | 0.35 | background | `assets/stages-pass18/tpp-afghanistan-sahelanthropus-canyon/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass18/tpp-afghanistan-sahelanthropus-canyon/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.15 | foreground | `assets/stages-pass18/tpp-afghanistan-sahelanthropus-canyon/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"none","enabled":false}`. Décor au repos conservé sans mouvement gratuit. Écrans, ventilateurs, eau ou lumière ne deviennent animés qu’après repérage dans la capture de cette salle ; sinon noter création CQC.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass18-stage-pw-phantom-catalog.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass18-stage-pw-phantom-catalog.js). Références déclarées dans le dépôt : [source1](https://www.gamepressure.com/mgs5thephantompain/gfx/word/92453836.jpg) ; [source2](https://www.gamepressure.com/mgs5thephantompain/gfx/word/92453867.jpg) ; [source3](https://www.gamepressure.com/mgs5thephantompain/gfx/word/92453852.jpg).

### ENTREPÔT — MOBILE — `p27_mobile_warehouse`

**Mobile · P2 · présent.** Édition : Metal Gear Solid Mobile (2008), original Nokia N-Gage warehouse interiors. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Captures Nokia N-Gage 2008 physiquement consultées : panneaux métalliques gris-vert, grandes dalles carrées, traverses brunes, éclairages rectangulaires, caisses côtelées. Le nom de lieu reste descriptif : le découpage exact de la carte originale n’est pas certifié. Reconstitution latérale des seuls codes visibles, ajout de surfaces cachées pour le combat 2D ; aucune équivalence topographique ou pixel pour pixel 1:1 revendiquée. Atlas original intact 1672×941, quatre rectangles indépendants ; marges alpha exclues par rectangles natifs sans retouche. Chaque plan conserve ses dimensions et une échelle commune. Sol ancré à y=568, ses seules bandes latérales de 32 pixels sont répétées hors image pour la caméra. Animation de poussière discrète ajoutée par le projet, sans certification de rythme original. Aucun emprunt à MGS1/MGS2/MGSV. Rectangle du premier plan Mobile resserré verticalement avant la bande de sol parasite ; aucun pixel modifié, aucun masque généré, pieds visibles dans la partie centrale.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass27/p27_mobile_warehouse/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.34 | background | `assets/stages-pass27/p27_mobile_warehouse/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass27/p27_mobile_warehouse/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.12 | foreground | `assets/stages-pass27/p27_mobile_warehouse/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"dust","enabled":true,"count":7,"color":"#68786c","sourceCanonicalTiming":false}`. Conserver les codes visuels N-Gage et relever le véritable chapitre/cadrage ; la poussière actuelle est une animation du projet, pas une reproduction mesurée.

**Écart spécifique :** Entrepôt Mobile : le commentaire actuel déclare lui-même un nom descriptif et un découpage non certifié.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass27-stage-completion.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass27-stage-completion.js). Références déclarées dans le dépôt : [source1](https://allaboutsymbian.com/images/reviews/mgsmobile/Mgsm0407.jpg) ; [source2](https://allaboutsymbian.com/images/reviews/mgsmobile/Mgsm0410.jpg) ; [source3](https://allaboutsymbian.com/images/reviews/mgsmobile/Mgsm0412.jpg).

### INSTALLATION INDUSTRIELLE — PORTABLE OPS PLUS — `p27_mpo_plus_industrial`

**Portable Ops Plus · P2 · présent.** Édition : Metal Gear Solid: Portable Ops Plus (2007), original PSP industrial arena from screenshot sc7mi8. Statut hérité : `accepted_closest` ; 1:1 certifié déclaré : `False`.

**Repères et revue existants :** Capture PSP propre à Portable Ops Plus physiquement consultée : grands panneaux acier bleu-gris, bande horizontale beige-jaune, piliers carrés à socle sombre, encadrement industriel jaune diagonal, conteneurs et plaques de sol. La légende de la capture n’identifie pas le nom exact de cette arène : nom descriptif, pas renommage en REX Hangar/Silo ni reprise de décor d’un autre opus. Reconstitution latérale des seuls motifs visibles ; portions hors champ adaptées sans certification topographique ou pixel pour pixel 1:1. Atlas natif intact 1672×941 à quatre vrais plans. Gouttières et alphas des rectangles inspectés ; largeur, hauteur et échelle communes, sol ancré y=568 et répétition seulement des 32 pixels de texture aux bords du sol. Très légère poussière ambiante ajoutée par le projet, architecture et collisions inchangées.

**Plan CQC déclaré :** `{"width":1280,"height":720,"ground":568,"cameraMin":-220,"cameraMax":220,"collisionChange":false}`. Ancrage du sol : `{"groundY":568,"markersReviewed":true}`. Limites source à comparer séparément.

| Plan / rôle | Profondeur | Phase | Image déclarée | Mouvement |
|---|---:|---|---|---|
| back / sky | 0 | background | `assets/stages-pass27/p27_mpo_plus_industrial/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| architecture / architecture | 0.35 | background | `assets/stages-pass27/p27_mpo_plus_industrial/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| ground / ground | 1 | background | `assets/stages-pass27/p27_mpo_plus_industrial/planes-v1.png` | Pas de mouvement de plan déclaré ici |
| foreground / foreground | 1.12 | foreground | `assets/stages-pass27/p27_mpo_plus_industrial/planes-v1.png` | Pas de mouvement de plan déclaré ici |

**Animation :** effet déclaré `{"type":"dust","enabled":true,"count":7,"color":"#68786c","sourceCanonicalTiming":false}`. Identifier la carte et son mode, relever les volumes hors champ, puis animation des luminaires/poussière uniquement attestée ou étiquetée adaptée.

**Écart spécifique :** Arène industrielle Portable Ops Plus : le nom réel de carte n’est pas identifié dans la référence existante sc7mi8.

**À terminer :** relever les objets et proportions sur cette édition, contrôler les raccords aux deux extrêmes caméra, conserver les pieds et projectiles lisibles au premier plan, séparer chaque événement narratif de la boucle, vérifier le bon lien campagne/duel. Mode fidèle : seulement les dangers attestés de cette scène, activés au même contexte. Mode Versus : bascule dédiée annoncée ; sans danger, les mêmes objets restent purement visuels. Produire télégraphe, zone active, impact et récupération séparés, sans dériver collision de l’image décor.

**Preuves :** [public/cqc/src/cqc-pass27-stage-completion.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass27-stage-completion.js). Références déclarées dans le dépôt : [source1](https://images.igdb.com/igdb/image/upload/t_720p/sc7mi8.jpg).
