# Animations — NPC NETWORK 0.53

**10 acteurs du registre courant.** Les titres d’actions et paramètres sont observés ; les descriptions sont des propositions CQC à produire et valider. Un groupe de frames existant ne certifie pas l’ensemble du mouvement ou sa fidélité originale.

[Index des fiches](README.md) · [Contrat commun](../04_ANIMATIONS_SPRITES.md)

## Sommaire

- [AL AI](#npc53__al_ai_mgs4) — MGS4
- [ADAM — MGS4 PROTOTYPE](#npc53__adam_prototype_mgs4) — MGS4
- [REPTILE POD AI](#npc53__reptile_pod_pw) — PEACE WALKER
- [AVIAN POD AI](#npc53__avian_pod_pw) — PEACE WALKER
- [ARTHROPOD POD AI](#npc53__arthropod_pod_pw) — PEACE WALKER
- [MAMMAL POD / THE BOSS AI](#npc53__mammal_pod_pw) — PEACE WALKER
- [NIKOLAI SOKOLOV — PORTABLE OPS](#npc53__sokolov_mpo) — PORTABLE OPS
- [MAJOR ZERO — PORTABLE OPS](#npc53__zero_mpo) — PORTABLE OPS
- [PARA-MEDIC — PORTABLE OPS](#npc53__paramedic_mpo) — PORTABLE OPS
- [SIGINT — PORTABLE OPS](#npc53__sigint_mpo) — PORTABLE OPS

## npc53__al_ai_mgs4

### AL AI — MGS4

**Rôle :** IA DE CONTRÔLE — support leurre. **Profil :** `psychic`.

**Base présente dans le code :** Sous-système Patriots adapté comme avatar numérique.

**Incarnation à conserver :** Sous-système Patriots adapté comme avatar numérique.

**État vérifié :** route machine effectivement déclarée ; animations d’articulation à contrôler. Une route machine est déclarée dans le runtime. Ses articulations remplacent le catalogue de corps contrôlé ; ce n’est pas un constat de sprite absent.

**Réemplois à examiner :** pas de groupe natif partagé observé dans cette extraction.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** AL AI : regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Variation de signal et léger mouvement de l’avatar/module de simulation ; ne pas présenter cette enveloppe comme un corps officiel. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** mouvement et éventuelle sustentation distingués de l’effet psychique. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « IA DE CONTRÔLE — support leurre » : état de protection visuel de simulation, clairement distinct d’une défense corporelle officielle ; recul bloqué distinct de la simple position basse. Garder regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile.
- **jump_land :** AL AI : déplacement de l’avatar dans la simulation, explicitement adapté ; ne pas attribuer un saut physique à une intelligence sans corps attesté. mouvement et éventuelle sustentation distingués de l’effet psychique. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Réactions de signal/affichage de l’avatar de AL AI, interruption puis retour ; l’existence de ce corps de simulation reste explicitement non canonique. Terminer par cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS4 », présentation de Sous-système Patriots adapté comme avatar numérique., puis regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Geste court lié à « Leurre » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, cesser le geste de concentration puis revenir à la posture propre à l’incarnation ; AL AI vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS4.
- **round_loss :** Proposition CQC : L’avatar de AL AI signale la défaite puis retrouve son état de simulation ; pas de respiration, de perte de conscience ou de réparation physique inventée. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Dédoublement réseau », revenir par cesser le geste de concentration puis revenir à la posture propre à l’incarnation, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Intervention rapprochée

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de AL AI, préparer « Intervention rapprochée » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Intervention rapprochée » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Action engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de AL AI, préparer « Action engagée » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Action engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage d’urgence

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de AL AI, préparer « Balayage d’urgence » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Immobilisation

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de AL AI, préparer « Immobilisation » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Leurre

**Existant :** `projectile` / `psychic` ; 27/1/30 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de AL AI, préparer « Leurre » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Donner à la source de « Leurre » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet psychic de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Projectile lent et visible : sauter, bloquer ou détruire avec une attaque.

##### specialDown — Fausse signature

**Existant :** `projectile` / `bind` ; 32/1/34 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de AL AI, préparer « Fausse signature » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Donner à la source de « Fausse signature » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet bind de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut ou garde basse ; ralentissement bref, aucune confiscation des commandes.

##### specialForward — Écho tactique

**Existant :** `mobility` / `psychic` ; 23/1/28 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de AL AI, préparer « Écho tactique » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Préparer l’appui qui produit le déplacement ; mouvement et éventuelle sustentation distingués de l’effet psychique.

**Action.** Exécuter « Écho tactique » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Départ et arrivée indiqués ; pas de téléportation derrière la cible ni hors arène.

##### specialBack — Repli assisté

**Existant :** `parry` / `counter` ; 5/12/28 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de AL AI, préparer « Repli assisté » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Présenter la surface ou l’organe de parade et maintenir une fenêtre courte lisible.

**Action.** Recevoir puis dévier au contact réel pour « Repli assisté » ; la riposte et son effet n’apparaissent qu’après succès. Une attente sans contact garde une pose différente du contre réussi.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Séparer sortie ratée, blocage simple et riposte ; aucun effet de réussite avant collision.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Projections, attaques au corps à corps et explosifs au sol ne sont pas renvoyés.

##### super — Dédoublement réseau

**Existant :** `projectile` / `psychic` ; 35/1/44 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de AL AI, préparer « Dédoublement réseau » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Donner à la source de « Dédoublement réseau » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet psychic de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet. La salve contient 5 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 5 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recalibrer

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de AL AI, préparer « Recalibrer » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Recalibrer ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Dédoublement réseau — Protocole final

Famille `psychic`, ton `simulation` ; 210 ticks CQC ; phases actuelles : focus → distort → release → pose. Appuis déclarés : Dédoublement réseau / Intervention rapprochée.

Plan 1 : AL AI sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Dédoublement réseau / Intervention rapprochée ». Plan 2 : montrer la source corporelle ou matérielle de « Dédoublement réseau / Intervention rapprochée ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, pose de signature face à l’adversaire. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Leurre — Neutralisation

Famille `psychic`, ton `simulation` ; 222 ticks CQC ; phases actuelles : focus → distort → release → pose. Appuis déclarés : Leurre / Intervention rapprochée.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Leurre / Intervention rapprochée » ; l’espace disponible doit être lisible. Plan 2 : montrer la source corporelle ou matérielle de « Leurre / Intervention rapprochée ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Fausse signature — Extraction

Famille `psychic`, ton `simulation` ; 234 ticks CQC ; phases actuelles : focus → distort → release → pose. Appuis déclarés : Fausse signature / Intervention rapprochée.

Plan 1 : approche jusqu’à la distance réelle de « Fausse signature / Intervention rapprochée », arme et main libre identifiées. Plan 2 : montrer la source corporelle ou matérielle de « Fausse signature / Intervention rapprochée ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, prise de distance et maintien final. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Écho tactique — Fin de réseau

Famille `psychic`, ton `simulation` ; 246 ticks CQC ; phases actuelles : focus → distort → release → pose. Appuis déclarés : Écho tactique / Intervention rapprochée.

Plan 1 : après une observation ou un repli, AL AI reprend l’initiative par « Écho tactique / Intervention rapprochée ». Plan 2 : montrer la source corporelle ou matérielle de « Écho tactique / Intervention rapprochée ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, rangement/pose finale différente des trois autres. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Le rôle narratif d’origine reste prioritaire sur la simulation de duel.
- Aucune capacité provenant d’une autre incarnation n’est importée sans étiquette de simulation.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## npc53__adam_prototype_mgs4

### ADAM — MGS4 PROTOTYPE — MGS4

**Rôle :** CONCEPT ABANDONNÉ — support furtivité. **Profil :** `soldier`.

**Base présente dans le code :** Concept historique de production, conservé comme prototype et non comme personnage final.

**Incarnation à conserver :** Unreleased Russian commando cut design; distinct from MGS3 ADAM/Ocelot

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** ADAM — MGS4 PROTOTYPE : appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas courts, crosse/équipement conservés près du torse. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « CONCEPT ABANDONNÉ — support furtivité » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder appui militaire stable, arme maintenue dans l’axe et regard vers la menace.
- **jump_land :** ADAM — MGS4 PROTOTYPE : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas courts, crosse/équipement conservés près du torse. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de ADAM — MGS4 PROTOTYPE. Terminer par retour en couverture de l’arme après le coup. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS4 », présentation de Unreleased Russian commando cut design; distinct from MGS3 ADAM/Ocelot, puis appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Geste court lié à « Voile furtif » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, retour en couverture de l’arme après le coup ; ADAM — MGS4 PROTOTYPE vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS4.
- **round_loss :** Proposition CQC : ADAM — MGS4 PROTOTYPE réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Extraction fantôme », revenir par retour en couverture de l’arme après le coup, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Intervention rapprochée

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ADAM — MGS4 PROTOTYPE, préparer « Intervention rapprochée » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Intervention rapprochée » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Action engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ADAM — MGS4 PROTOTYPE, préparer « Action engagée » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Action engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage d’urgence

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ADAM — MGS4 PROTOTYPE, préparer « Balayage d’urgence » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Immobilisation

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ADAM — MGS4 PROTOTYPE, préparer « Immobilisation » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** retour en couverture de l’arme après le coup. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Voile furtif

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ADAM — MGS4 PROTOTYPE, préparer « Voile furtif » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Voile furtif » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Repli masqué

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ADAM — MGS4 PROTOTYPE, préparer « Repli masqué » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Prélever l’objet correspondant à « Repli masqué », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Route invisible

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ADAM — MGS4 PROTOTYPE, préparer « Route invisible » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Route invisible » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Repli assisté

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ADAM — MGS4 PROTOTYPE, préparer « Repli assisté » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer l’appui qui produit le déplacement ; pas courts, crosse/équipement conservés près du torse.

**Action.** Exécuter « Repli assisté » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** retour en couverture de l’arme après le coup. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Extraction fantôme

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ADAM — MGS4 PROTOTYPE, préparer « Extraction fantôme » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Extraction fantôme » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recalibrer

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ADAM — MGS4 PROTOTYPE, préparer « Recalibrer » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recalibrer », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** retour en couverture de l’arme après le coup. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Extraction fantôme — Protocole final

Famille `capture`, ton `simulation` ; 210 ticks CQC ; phases actuelles : approach → restrain → extract → pose. Appuis déclarés : Extraction fantôme / Intervention rapprochée.

Plan 1 : ADAM — MGS4 PROTOTYPE sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Extraction fantôme / Intervention rapprochée ». Plan 2 : contact de saisie ou neutralisation lié à « Extraction fantôme / Intervention rapprochée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : retour en couverture de l’arme après le coup, pose de signature face à l’adversaire. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Voile furtif — Neutralisation

Famille `capture`, ton `simulation` ; 222 ticks CQC ; phases actuelles : approach → restrain → extract → pose. Appuis déclarés : Voile furtif / Intervention rapprochée.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Voile furtif / Intervention rapprochée » ; l’espace disponible doit être lisible. Plan 2 : contact de saisie ou neutralisation lié à « Voile furtif / Intervention rapprochée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : retour en couverture de l’arme après le coup, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Repli masqué — Extraction

Famille `capture`, ton `simulation` ; 234 ticks CQC ; phases actuelles : approach → restrain → extract → pose. Appuis déclarés : Repli masqué / Intervention rapprochée.

Plan 1 : approche jusqu’à la distance réelle de « Repli masqué / Intervention rapprochée », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Repli masqué / Intervention rapprochée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : retour en couverture de l’arme après le coup, prise de distance et maintien final. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Route invisible — Fin de réseau

Famille `capture`, ton `simulation` ; 246 ticks CQC ; phases actuelles : approach → restrain → extract → pose. Appuis déclarés : Route invisible / Intervention rapprochée.

Plan 1 : après une observation ou un repli, ADAM — MGS4 PROTOTYPE reprend l’initiative par « Route invisible / Intervention rapprochée ». Plan 2 : contact de saisie ou neutralisation lié à « Route invisible / Intervention rapprochée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : retour en couverture de l’arme après le coup, rangement/pose finale différente des trois autres. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Identity/reference scope/equipment and anatomical sides reviewed within the explicitly stated source limits; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Discarded prototype, not released story canon and not MGS3 Ocelot; exact independent UID retained.
- Monochrome source does not establish final color; charcoal and muted gray-green palette is explicit CQC interpretation.
- Source hand-held weapon is not reproduced as a drawn firearm in native keyposes; authored unarmed support movement therefore visualFirearmPresent:false based actual PNGs.
- Native motion is authored CQC adaptation of concept art, not original MGS4 animation.
- [Real full-body official monochrome book artwork downloaded unchanged and physically inspected. Defines peaked cap, mask, pocketed tactical vest, honeycomb shoulder pattern, armored forearm segments, thigh straps, knee pads and tall boots. No released in-game version or canonical final palette is asserted.](https://www.metalgearsolid.fr/quelques_personnages_abandonnes_dans_la_serie_metal_gear_solid_10.html) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## npc53__reptile_pod_pw

### REPTILE POD AI — PEACE WALKER

**Rôle :** IA PUPA — support brouillage. **Profil :** `psychic`.

**Base présente dans le code :** Personnalité de pod associée à Pupa, adaptée comme avatar machine.

**Incarnation à conserver :** Personnalité de pod associée à Pupa, adaptée comme avatar machine.

**État vérifié :** route machine effectivement déclarée ; animations d’articulation à contrôler. Une route machine est déclarée dans le runtime. Ses articulations remplacent le catalogue de corps contrôlé ; ce n’est pas un constat de sprite absent.

**Réemplois à examiner :** pas de groupe natif partagé observé dans cette extraction.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** REPTILE POD AI : regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Petits ajustements mécaniques des organes présents et optique stable ; aucune respiration humaine. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** mouvement et éventuelle sustentation distingués de l’effet psychique. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « IA PUPA — support brouillage » : orientation défensive du châssis, des membres ou de la protection effectivement présente ; pas d’avant-bras humain ajouté ; recul bloqué distinct de la simple position basse. Garder regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile.
- **jump_land :** REPTILE POD AI : départ par poussée ou articulation autorisée, déplacement aérien puis stabilisation et reprise d’appui ; les appareils volants gardent leur mode de sustentation. mouvement et éventuelle sustentation distingués de l’effet psychique. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Secousse du châssis et de l’organe touché de REPTILE POD AI, déséquilibre, arrêt puis remise en position par ses articulations réelles. Terminer par cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « PEACE WALKER », présentation de Personnalité de pod associée à Pupa, adaptée comme avatar machine., puis regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Geste court lié à « Brouillage » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, cesser le geste de concentration puis revenir à la posture propre à l’incarnation ; REPTILE POD AI vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à PEACE WALKER.
- **round_loss :** Proposition CQC : REPTILE POD AI interrompt ses émissions, absorbe l’oscillation de sa masse, stabilise ses appuis ou son vol, puis replace ses organes ; aucune régénération gratuite. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Silence électronique », revenir par cesser le geste de concentration puis revenir à la posture propre à l’incarnation, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Intervention rapprochée

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de REPTILE POD AI, préparer « Intervention rapprochée » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Intervention rapprochée » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Action engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de REPTILE POD AI, préparer « Action engagée » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Action engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage d’urgence

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de REPTILE POD AI, préparer « Balayage d’urgence » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Immobilisation

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de REPTILE POD AI, préparer « Immobilisation » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Brouillage

**Existant :** `projectile` / `psychic` ; 27/1/30 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de REPTILE POD AI, préparer « Brouillage » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Donner à la source de « Brouillage » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet psychic de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Projectile lent et visible : sauter, bloquer ou détruire avec une attaque.

##### specialDown — Blackout

**Existant :** `projectile` / `bind` ; 32/1/34 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de REPTILE POD AI, préparer « Blackout » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Donner à la source de « Blackout » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet bind de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut ou garde basse ; ralentissement bref, aucune confiscation des commandes.

##### specialForward — Interférence

**Existant :** `mobility` / `psychic` ; 23/1/28 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de REPTILE POD AI, préparer « Interférence » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Préparer l’appui qui produit le déplacement ; mouvement et éventuelle sustentation distingués de l’effet psychique.

**Action.** Exécuter « Interférence » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Départ et arrivée indiqués ; pas de téléportation derrière la cible ni hors arène.

##### specialBack — Repli assisté

**Existant :** `parry` / `counter` ; 5/12/28 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de REPTILE POD AI, préparer « Repli assisté » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Présenter la surface ou l’organe de parade et maintenir une fenêtre courte lisible.

**Action.** Recevoir puis dévier au contact réel pour « Repli assisté » ; la riposte et son effet n’apparaissent qu’après succès. Une attente sans contact garde une pose différente du contre réussi.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Séparer sortie ratée, blocage simple et riposte ; aucun effet de réussite avant collision.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Projections, attaques au corps à corps et explosifs au sol ne sont pas renvoyés.

##### super — Silence électronique

**Existant :** `projectile` / `psychic` ; 35/1/44 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de REPTILE POD AI, préparer « Silence électronique » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Donner à la source de « Silence électronique » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet psychic de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet. La salve contient 5 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 5 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recalibrer

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de REPTILE POD AI, préparer « Recalibrer » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Recalibrer ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Silence électronique — Protocole final

Famille `electric`, ton `simulation` ; 210 ticks CQC ; phases actuelles : charge → jam → shutdown → pose. Appuis déclarés : Silence électronique / Intervention rapprochée.

Plan 1 : REPTILE POD AI sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Silence électronique / Intervention rapprochée ». Plan 2 : montrer la source corporelle ou matérielle de « Silence électronique / Intervention rapprochée ». Plan 3 : développer l’effet electric en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, pose de signature face à l’adversaire. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Brouillage — Neutralisation

Famille `electric`, ton `simulation` ; 222 ticks CQC ; phases actuelles : charge → jam → shutdown → pose. Appuis déclarés : Brouillage / Intervention rapprochée.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Brouillage / Intervention rapprochée » ; l’espace disponible doit être lisible. Plan 2 : montrer la source corporelle ou matérielle de « Brouillage / Intervention rapprochée ». Plan 3 : développer l’effet electric en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Blackout — Extraction

Famille `electric`, ton `simulation` ; 234 ticks CQC ; phases actuelles : charge → jam → shutdown → pose. Appuis déclarés : Blackout / Intervention rapprochée.

Plan 1 : approche jusqu’à la distance réelle de « Blackout / Intervention rapprochée », arme et main libre identifiées. Plan 2 : montrer la source corporelle ou matérielle de « Blackout / Intervention rapprochée ». Plan 3 : développer l’effet electric en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, prise de distance et maintien final. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Interférence — Fin de réseau

Famille `electric`, ton `simulation` ; 246 ticks CQC ; phases actuelles : charge → jam → shutdown → pose. Appuis déclarés : Interférence / Intervention rapprochée.

Plan 1 : après une observation ou un repli, REPTILE POD AI reprend l’initiative par « Interférence / Intervention rapprochée ». Plan 2 : montrer la source corporelle ou matérielle de « Interférence / Intervention rapprochée ». Plan 3 : développer l’effet electric en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, rangement/pose finale différente des trois autres. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Le rôle narratif d’origine reste prioritaire sur la simulation de duel.
- Aucune capacité provenant d’une autre incarnation n’est importée sans étiquette de simulation.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## npc53__avian_pod_pw

### AVIAN POD AI — PEACE WALKER

**Rôle :** IA CHRYSALIS — support recon. **Profil :** `psychic`.

**Base présente dans le code :** Personnalité de pod associée à Chrysalis, adaptée comme avatar machine.

**Incarnation à conserver :** Personnalité de pod associée à Chrysalis, adaptée comme avatar machine.

**État vérifié :** route machine effectivement déclarée ; animations d’articulation à contrôler. Une route machine est déclarée dans le runtime. Ses articulations remplacent le catalogue de corps contrôlé ; ce n’est pas un constat de sprite absent.

**Réemplois à examiner :** pas de groupe natif partagé observé dans cette extraction.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** AVIAN POD AI : regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Petits ajustements mécaniques des organes présents et optique stable ; aucune respiration humaine. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** mouvement et éventuelle sustentation distingués de l’effet psychique. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « IA CHRYSALIS — support recon » : orientation défensive du châssis, des membres ou de la protection effectivement présente ; pas d’avant-bras humain ajouté ; recul bloqué distinct de la simple position basse. Garder regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile.
- **jump_land :** AVIAN POD AI : départ par poussée ou articulation autorisée, déplacement aérien puis stabilisation et reprise d’appui ; les appareils volants gardent leur mode de sustentation. mouvement et éventuelle sustentation distingués de l’effet psychique. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Secousse du châssis et de l’organe touché de AVIAN POD AI, déséquilibre, arrêt puis remise en position par ses articulations réelles. Terminer par cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « PEACE WALKER », présentation de Personnalité de pod associée à Chrysalis, adaptée comme avatar machine., puis regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Geste court lié à « Scan de terrain » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, cesser le geste de concentration puis revenir à la posture propre à l’incarnation ; AVIAN POD AI vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à PEACE WALKER.
- **round_loss :** Proposition CQC : AVIAN POD AI interrompt ses émissions, absorbe l’oscillation de sa masse, stabilise ses appuis ou son vol, puis replace ses organes ; aucune régénération gratuite. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Extraction renseignée », revenir par cesser le geste de concentration puis revenir à la posture propre à l’incarnation, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Intervention rapprochée

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de AVIAN POD AI, préparer « Intervention rapprochée » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Intervention rapprochée » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Action engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de AVIAN POD AI, préparer « Action engagée » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Action engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage d’urgence

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de AVIAN POD AI, préparer « Balayage d’urgence » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Immobilisation

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de AVIAN POD AI, préparer « Immobilisation » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Scan de terrain

**Existant :** `projectile` / `psychic` ; 27/1/30 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de AVIAN POD AI, préparer « Scan de terrain » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Donner à la source de « Scan de terrain » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet psychic de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Projectile lent et visible : sauter, bloquer ou détruire avec une attaque.

##### specialDown — Marquage prioritaire

**Existant :** `projectile` / `bind` ; 32/1/34 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de AVIAN POD AI, préparer « Marquage prioritaire » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Donner à la source de « Marquage prioritaire » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet bind de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut ou garde basse ; ralentissement bref, aucune confiscation des commandes.

##### specialForward — Réseau de veille

**Existant :** `mobility` / `psychic` ; 23/1/28 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de AVIAN POD AI, préparer « Réseau de veille » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Préparer l’appui qui produit le déplacement ; mouvement et éventuelle sustentation distingués de l’effet psychique.

**Action.** Exécuter « Réseau de veille » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Départ et arrivée indiqués ; pas de téléportation derrière la cible ni hors arène.

##### specialBack — Repli assisté

**Existant :** `parry` / `counter` ; 5/12/28 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de AVIAN POD AI, préparer « Repli assisté » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Présenter la surface ou l’organe de parade et maintenir une fenêtre courte lisible.

**Action.** Recevoir puis dévier au contact réel pour « Repli assisté » ; la riposte et son effet n’apparaissent qu’après succès. Une attente sans contact garde une pose différente du contre réussi.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Séparer sortie ratée, blocage simple et riposte ; aucun effet de réussite avant collision.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Projections, attaques au corps à corps et explosifs au sol ne sont pas renvoyés.

##### super — Extraction renseignée

**Existant :** `projectile` / `psychic` ; 35/1/44 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de AVIAN POD AI, préparer « Extraction renseignée » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Donner à la source de « Extraction renseignée » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet psychic de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet. La salve contient 5 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 5 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recalibrer

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de AVIAN POD AI, préparer « Recalibrer » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Recalibrer ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Extraction renseignée — Protocole final

Famille `tactical`, ton `simulation` ; 210 ticks CQC ; phases actuelles : mark → advance → secure → pose. Appuis déclarés : Extraction renseignée / Intervention rapprochée.

Plan 1 : AVIAN POD AI sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Extraction renseignée / Intervention rapprochée ». Plan 2 : matérialiser le geste tactique « Extraction renseignée / Intervention rapprochée » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, pose de signature face à l’adversaire. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Scan de terrain — Neutralisation

Famille `tactical`, ton `simulation` ; 222 ticks CQC ; phases actuelles : mark → advance → secure → pose. Appuis déclarés : Scan de terrain / Intervention rapprochée.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Scan de terrain / Intervention rapprochée » ; l’espace disponible doit être lisible. Plan 2 : matérialiser le geste tactique « Scan de terrain / Intervention rapprochée » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Marquage prioritaire — Extraction

Famille `tactical`, ton `simulation` ; 234 ticks CQC ; phases actuelles : mark → advance → secure → pose. Appuis déclarés : Marquage prioritaire / Intervention rapprochée.

Plan 1 : approche jusqu’à la distance réelle de « Marquage prioritaire / Intervention rapprochée », arme et main libre identifiées. Plan 2 : matérialiser le geste tactique « Marquage prioritaire / Intervention rapprochée » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, prise de distance et maintien final. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Réseau de veille — Fin de réseau

Famille `tactical`, ton `simulation` ; 246 ticks CQC ; phases actuelles : mark → advance → secure → pose. Appuis déclarés : Réseau de veille / Intervention rapprochée.

Plan 1 : après une observation ou un repli, AVIAN POD AI reprend l’initiative par « Réseau de veille / Intervention rapprochée ». Plan 2 : matérialiser le geste tactique « Réseau de veille / Intervention rapprochée » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, rangement/pose finale différente des trois autres. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Le rôle narratif d’origine reste prioritaire sur la simulation de duel.
- Aucune capacité provenant d’une autre incarnation n’est importée sans étiquette de simulation.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## npc53__arthropod_pod_pw

### ARTHROPOD POD AI — PEACE WALKER

**Rôle :** IA COCOON — support couverture. **Profil :** `psychic`.

**Base présente dans le code :** Personnalité de pod associée à Cocoon, adaptée comme avatar machine.

**Incarnation à conserver :** Personnalité de pod associée à Cocoon, adaptée comme avatar machine.

**État vérifié :** route machine effectivement déclarée ; animations d’articulation à contrôler. Une route machine est déclarée dans le runtime. Ses articulations remplacent le catalogue de corps contrôlé ; ce n’est pas un constat de sprite absent.

**Réemplois à examiner :** pas de groupe natif partagé observé dans cette extraction.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** ARTHROPOD POD AI : regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Petits ajustements mécaniques des organes présents et optique stable ; aucune respiration humaine. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** mouvement et éventuelle sustentation distingués de l’effet psychique. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « IA COCOON — support couverture » : orientation défensive du châssis, des membres ou de la protection effectivement présente ; pas d’avant-bras humain ajouté ; recul bloqué distinct de la simple position basse. Garder regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile.
- **jump_land :** ARTHROPOD POD AI : départ par poussée ou articulation autorisée, déplacement aérien puis stabilisation et reprise d’appui ; les appareils volants gardent leur mode de sustentation. mouvement et éventuelle sustentation distingués de l’effet psychique. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Secousse du châssis et de l’organe touché de ARTHROPOD POD AI, déséquilibre, arrêt puis remise en position par ses articulations réelles. Terminer par cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « PEACE WALKER », présentation de Personnalité de pod associée à Cocoon, adaptée comme avatar machine., puis regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Geste court lié à « Couverture » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, cesser le geste de concentration puis revenir à la posture propre à l’incarnation ; ARTHROPOD POD AI vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à PEACE WALKER.
- **round_loss :** Proposition CQC : ARTHROPOD POD AI interrompt ses émissions, absorbe l’oscillation de sa masse, stabilise ses appuis ou son vol, puis replace ses organes ; aucune régénération gratuite. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Forteresse mobile », revenir par cesser le geste de concentration puis revenir à la posture propre à l’incarnation, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Intervention rapprochée

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de ARTHROPOD POD AI, préparer « Intervention rapprochée » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Intervention rapprochée » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Action engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de ARTHROPOD POD AI, préparer « Action engagée » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Action engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage d’urgence

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de ARTHROPOD POD AI, préparer « Balayage d’urgence » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Immobilisation

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de ARTHROPOD POD AI, préparer « Immobilisation » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Couverture

**Existant :** `projectile` / `psychic` ; 27/1/30 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de ARTHROPOD POD AI, préparer « Couverture » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Donner à la source de « Couverture » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet psychic de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Projectile lent et visible : sauter, bloquer ou détruire avec une attaque.

##### specialDown — Barrage défensif

**Existant :** `projectile` / `bind` ; 32/1/34 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de ARTHROPOD POD AI, préparer « Barrage défensif » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Donner à la source de « Barrage défensif » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet bind de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut ou garde basse ; ralentissement bref, aucune confiscation des commandes.

##### specialForward — Écran tactique

**Existant :** `mobility` / `psychic` ; 23/1/28 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de ARTHROPOD POD AI, préparer « Écran tactique » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Préparer l’appui qui produit le déplacement ; mouvement et éventuelle sustentation distingués de l’effet psychique.

**Action.** Exécuter « Écran tactique » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Départ et arrivée indiqués ; pas de téléportation derrière la cible ni hors arène.

##### specialBack — Repli assisté

**Existant :** `parry` / `counter` ; 5/12/28 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de ARTHROPOD POD AI, préparer « Repli assisté » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Présenter la surface ou l’organe de parade et maintenir une fenêtre courte lisible.

**Action.** Recevoir puis dévier au contact réel pour « Repli assisté » ; la riposte et son effet n’apparaissent qu’après succès. Une attente sans contact garde une pose différente du contre réussi.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Séparer sortie ratée, blocage simple et riposte ; aucun effet de réussite avant collision.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Projections, attaques au corps à corps et explosifs au sol ne sont pas renvoyés.

##### super — Forteresse mobile

**Existant :** `projectile` / `psychic` ; 35/1/44 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de ARTHROPOD POD AI, préparer « Forteresse mobile » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Donner à la source de « Forteresse mobile » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet psychic de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet. La salve contient 5 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 5 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recalibrer

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de ARTHROPOD POD AI, préparer « Recalibrer » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Recalibrer ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Forteresse mobile — Protocole final

Famille `tactical`, ton `simulation` ; 210 ticks CQC ; phases actuelles : mark → advance → secure → pose. Appuis déclarés : Forteresse mobile / Intervention rapprochée.

Plan 1 : ARTHROPOD POD AI sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Forteresse mobile / Intervention rapprochée ». Plan 2 : matérialiser le geste tactique « Forteresse mobile / Intervention rapprochée » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, pose de signature face à l’adversaire. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Couverture — Neutralisation

Famille `tactical`, ton `simulation` ; 222 ticks CQC ; phases actuelles : mark → advance → secure → pose. Appuis déclarés : Couverture / Intervention rapprochée.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Couverture / Intervention rapprochée » ; l’espace disponible doit être lisible. Plan 2 : matérialiser le geste tactique « Couverture / Intervention rapprochée » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Barrage défensif — Extraction

Famille `tactical`, ton `simulation` ; 234 ticks CQC ; phases actuelles : mark → advance → secure → pose. Appuis déclarés : Barrage défensif / Intervention rapprochée.

Plan 1 : approche jusqu’à la distance réelle de « Barrage défensif / Intervention rapprochée », arme et main libre identifiées. Plan 2 : matérialiser le geste tactique « Barrage défensif / Intervention rapprochée » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, prise de distance et maintien final. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Écran tactique — Fin de réseau

Famille `tactical`, ton `simulation` ; 246 ticks CQC ; phases actuelles : mark → advance → secure → pose. Appuis déclarés : Écran tactique / Intervention rapprochée.

Plan 1 : après une observation ou un repli, ARTHROPOD POD AI reprend l’initiative par « Écran tactique / Intervention rapprochée ». Plan 2 : matérialiser le geste tactique « Écran tactique / Intervention rapprochée » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, rangement/pose finale différente des trois autres. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Le rôle narratif d’origine reste prioritaire sur la simulation de duel.
- Aucune capacité provenant d’une autre incarnation n’est importée sans étiquette de simulation.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## npc53__mammal_pod_pw

### MAMMAL POD / THE BOSS AI — PEACE WALKER

**Rôle :** IA PEACE WALKER — support commandement. **Profil :** `psychic`.

**Base présente dans le code :** Reconstruction IA fondée sur The Boss, séparée de la personne originale.

**Incarnation à conserver :** Reconstruction IA fondée sur The Boss, séparée de la personne originale.

**État vérifié :** route machine effectivement déclarée ; animations d’articulation à contrôler. Une route machine est déclarée dans le runtime. Ses articulations remplacent le catalogue de corps contrôlé ; ce n’est pas un constat de sprite absent.

**Réemplois à examiner :** pas de groupe natif partagé observé dans cette extraction.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** MAMMAL POD / THE BOSS AI : regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Petits ajustements mécaniques des organes présents et optique stable ; aucune respiration humaine. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** mouvement et éventuelle sustentation distingués de l’effet psychique. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « IA PEACE WALKER — support commandement » : orientation défensive du châssis, des membres ou de la protection effectivement présente ; pas d’avant-bras humain ajouté ; recul bloqué distinct de la simple position basse. Garder regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile.
- **jump_land :** MAMMAL POD / THE BOSS AI : départ par poussée ou articulation autorisée, déplacement aérien puis stabilisation et reprise d’appui ; les appareils volants gardent leur mode de sustentation. mouvement et éventuelle sustentation distingués de l’effet psychique. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Secousse du châssis et de l’organe touché de MAMMAL POD / THE BOSS AI, déséquilibre, arrêt puis remise en position par ses articulations réelles. Terminer par cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « PEACE WALKER », présentation de Reconstruction IA fondée sur The Boss, séparée de la personne originale., puis regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Geste court lié à « Ordre de mission » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, cesser le geste de concentration puis revenir à la posture propre à l’incarnation ; MAMMAL POD / THE BOSS AI vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à PEACE WALKER.
- **round_loss :** Proposition CQC : MAMMAL POD / THE BOSS AI interrompt ses émissions, absorbe l’oscillation de sa masse, stabilise ses appuis ou son vol, puis replace ses organes ; aucune régénération gratuite. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Commandement total », revenir par cesser le geste de concentration puis revenir à la posture propre à l’incarnation, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Intervention rapprochée

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de MAMMAL POD / THE BOSS AI, préparer « Intervention rapprochée » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Intervention rapprochée » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Action engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de MAMMAL POD / THE BOSS AI, préparer « Action engagée » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Action engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage d’urgence

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de MAMMAL POD / THE BOSS AI, préparer « Balayage d’urgence » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Immobilisation

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de MAMMAL POD / THE BOSS AI, préparer « Immobilisation » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Ordre de mission

**Existant :** `projectile` / `psychic` ; 27/1/30 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de MAMMAL POD / THE BOSS AI, préparer « Ordre de mission » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Donner à la source de « Ordre de mission » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet psychic de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Projectile lent et visible : sauter, bloquer ou détruire avec une attaque.

##### specialDown — Ralliement

**Existant :** `projectile` / `bind` ; 32/1/34 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de MAMMAL POD / THE BOSS AI, préparer « Ralliement » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Donner à la source de « Ralliement » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet bind de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut ou garde basse ; ralentissement bref, aucune confiscation des commandes.

##### specialForward — Directive offensive

**Existant :** `mobility` / `psychic` ; 23/1/28 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de MAMMAL POD / THE BOSS AI, préparer « Directive offensive » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Préparer l’appui qui produit le déplacement ; mouvement et éventuelle sustentation distingués de l’effet psychique.

**Action.** Exécuter « Directive offensive » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Départ et arrivée indiqués ; pas de téléportation derrière la cible ni hors arène.

##### specialBack — Repli assisté

**Existant :** `parry` / `counter` ; 5/12/28 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de MAMMAL POD / THE BOSS AI, préparer « Repli assisté » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Présenter la surface ou l’organe de parade et maintenir une fenêtre courte lisible.

**Action.** Recevoir puis dévier au contact réel pour « Repli assisté » ; la riposte et son effet n’apparaissent qu’après succès. Une attente sans contact garde une pose différente du contre réussi.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Séparer sortie ratée, blocage simple et riposte ; aucun effet de réussite avant collision.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Projections, attaques au corps à corps et explosifs au sol ne sont pas renvoyés.

##### super — Commandement total

**Existant :** `projectile` / `psychic` ; 35/1/44 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de MAMMAL POD / THE BOSS AI, préparer « Commandement total » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Donner à la source de « Commandement total » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet psychic de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet. La salve contient 5 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 5 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recalibrer

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de MAMMAL POD / THE BOSS AI, préparer « Recalibrer » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Recalibrer ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Commandement total — Protocole final

Famille `cqc`, ton `simulation` ; 210 ticks CQC ; phases actuelles : approach → counter → throw → pose. Appuis déclarés : Commandement total / Intervention rapprochée.

Plan 1 : MAMMAL POD / THE BOSS AI sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Commandement total / Intervention rapprochée ». Plan 2 : contact de saisie ou neutralisation lié à « Commandement total / Intervention rapprochée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, pose de signature face à l’adversaire. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Ordre de mission — Neutralisation

Famille `cqc`, ton `simulation` ; 222 ticks CQC ; phases actuelles : approach → counter → throw → pose. Appuis déclarés : Ordre de mission / Intervention rapprochée.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Ordre de mission / Intervention rapprochée » ; l’espace disponible doit être lisible. Plan 2 : contact de saisie ou neutralisation lié à « Ordre de mission / Intervention rapprochée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Ralliement — Extraction

Famille `cqc`, ton `simulation` ; 234 ticks CQC ; phases actuelles : approach → counter → throw → pose. Appuis déclarés : Ralliement / Intervention rapprochée.

Plan 1 : approche jusqu’à la distance réelle de « Ralliement / Intervention rapprochée », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Ralliement / Intervention rapprochée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, prise de distance et maintien final. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Directive offensive — Fin de réseau

Famille `cqc`, ton `simulation` ; 246 ticks CQC ; phases actuelles : approach → counter → throw → pose. Appuis déclarés : Directive offensive / Intervention rapprochée.

Plan 1 : après une observation ou un repli, MAMMAL POD / THE BOSS AI reprend l’initiative par « Directive offensive / Intervention rapprochée ». Plan 2 : contact de saisie ou neutralisation lié à « Directive offensive / Intervention rapprochée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, rangement/pose finale différente des trois autres. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Le rôle narratif d’origine reste prioritaire sur la simulation de duel.
- Aucune capacité provenant d’une autre incarnation n’est importée sans étiquette de simulation.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## npc53__sokolov_mpo

### NIKOLAI SOKOLOV — PORTABLE OPS — PORTABLE OPS

**Rôle :** INGÉNIEUR — support réparation. **Profil :** `analyst`.

**Base présente dans le code :** Incarnation Portable Ops de Sokolov ; duel simulé.

**Incarnation à conserver :** Independent1970 playable PSP scientist model, not classic MGS3/Delta body

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, special, specialForward, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** NIKOLAI SOKOLOV — PORTABLE OPS : outil de lecture ou de communication montré par le profil, attitude d’observation. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « INGÉNIEUR — support réparation » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder outil de lecture ou de communication montré par le profil, attitude d’observation.
- **jump_land :** NIKOLAI SOKOLOV — PORTABLE OPS : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de NIKOLAI SOKOLOV — PORTABLE OPS. Terminer par regard vers l’outil puis retour vers l’adversaire. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « PORTABLE OPS », présentation de Independent1970 playable PSP scientist model, not classic MGS3/Delta body, puis outil de lecture ou de communication montré par le profil, attitude d’observation. Geste court lié à « Réparation terrain » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, regard vers l’outil puis retour vers l’adversaire ; NIKOLAI SOKOLOV — PORTABLE OPS vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à PORTABLE OPS.
- **round_loss :** Proposition CQC : NIKOLAI SOKOLOV — PORTABLE OPS réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Remise en ligne », revenir par regard vers l’outil puis retour vers l’adversaire, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Intervention rapprochée

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NIKOLAI SOKOLOV — PORTABLE OPS, préparer « Intervention rapprochée » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Intervention rapprochée » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Action engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NIKOLAI SOKOLOV — PORTABLE OPS, préparer « Action engagée » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Action engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage d’urgence

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NIKOLAI SOKOLOV — PORTABLE OPS, préparer « Balayage d’urgence » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Immobilisation

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NIKOLAI SOKOLOV — PORTABLE OPS, préparer « Immobilisation » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Réparation terrain

**Existant :** `melee` / `electric` ; 17/5/29 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NIKOLAI SOKOLOV — PORTABLE OPS, préparer « Réparation terrain » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Réparation terrain » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense. L’effet electric reste séparé du membre ; son apparition et sa disparition suivent les événements du profil.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Espacement ou garde ; choc bref avec résistance temporaire après application.

##### specialDown — Diagnostic

**Existant :** `mark` / `recon` ; 26/1/30 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NIKOLAI SOKOLOV — PORTABLE OPS, préparer « Diagnostic » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Orienter regard, optique ou terminal vers la cible observée, sans consulter une action future.

**Action.** Pour « Diagnostic », déclencher lecture/repérage avec un petit geste ou changement d’optique et un indicateur séparé. Le corps doit rester visible et vulnérable selon les données de combat.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Couper le signal ou abaisser l’outil ; retour vers l’adversaire sans nouvelle arme inventée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Portée limitée ; le marquage ne vise ni à travers toute l’arène ni automatiquement.

##### specialForward — Restauration système

**Existant :** `mobility` / `movement` ; 7/18/25 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NIKOLAI SOKOLOV — PORTABLE OPS, préparer « Restauration système » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer l’appui qui produit le déplacement ; déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire.

**Action.** Exécuter « Restauration système » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 4 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : La silhouette reste touchable ; la sortie est punissable.

##### specialBack — Repli assisté

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NIKOLAI SOKOLOV — PORTABLE OPS, préparer « Repli assisté » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer l’appui qui produit le déplacement ; déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire.

**Action.** Exécuter « Repli assisté » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Remise en ligne

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NIKOLAI SOKOLOV — PORTABLE OPS, préparer « Remise en ligne » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Remise en ligne », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Recalibrer

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NIKOLAI SOKOLOV — PORTABLE OPS, préparer « Recalibrer » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Recalibrer ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Remise en ligne — Protocole final

Famille `mechanical`, ton `simulation` ; 210 ticks CQC ; phases actuelles : scan → repair → lock → pose. Appuis déclarés : Remise en ligne / Intervention rapprochée.

Plan 1 : NIKOLAI SOKOLOV — PORTABLE OPS sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Remise en ligne / Intervention rapprochée ». Plan 2 : déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire ; montrer l’organe de « Remise en ligne / Intervention rapprochée ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : regard vers l’outil puis retour vers l’adversaire, pose de signature face à l’adversaire. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Réparation terrain — Neutralisation

Famille `mechanical`, ton `simulation` ; 222 ticks CQC ; phases actuelles : scan → repair → lock → pose. Appuis déclarés : Réparation terrain / Intervention rapprochée.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Réparation terrain / Intervention rapprochée » ; l’espace disponible doit être lisible. Plan 2 : déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire ; montrer l’organe de « Réparation terrain / Intervention rapprochée ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : regard vers l’outil puis retour vers l’adversaire, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Diagnostic — Extraction

Famille `mechanical`, ton `simulation` ; 234 ticks CQC ; phases actuelles : scan → repair → lock → pose. Appuis déclarés : Diagnostic / Intervention rapprochée.

Plan 1 : approche jusqu’à la distance réelle de « Diagnostic / Intervention rapprochée », arme et main libre identifiées. Plan 2 : déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire ; montrer l’organe de « Diagnostic / Intervention rapprochée ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : regard vers l’outil puis retour vers l’adversaire, prise de distance et maintien final. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Restauration système — Fin de réseau

Famille `mechanical`, ton `simulation` ; 246 ticks CQC ; phases actuelles : scan → repair → lock → pose. Appuis déclarés : Restauration système / Intervention rapprochée.

Plan 1 : après une observation ou un repli, NIKOLAI SOKOLOV — PORTABLE OPS reprend l’initiative par « Restauration système / Intervention rapprochée ». Plan 2 : déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire ; montrer l’organe de « Restauration système / Intervention rapprochée ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : regard vers l’outil puis retour vers l’adversaire, rangement/pose finale différente des trois autres. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Identity/reference scope/equipment and anatomical sides reviewed within the explicitly stated source limits; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- PSP body/equipment remains independent from MGS3 classic/Delta and Ghost support UID.
- Whole lowerbody not visible in retrieved original PSP portrait, exact coat length, belt and shoes provisional.
- Native motion authored CQC adaptation, no original PSP animation claim.
- No firearm actually drawn; visualFirearmPresent:false based selected atlas.
- [Physically inspected original portrait establishes bald crown/dark-sidehair, small dark moustache, pale worried face, nearblack leather collared coat, white shirt, pale gray tie and muted inner lapel. Original crop ends at shoulders; midcalf coat, dark straight trousers, simple belt and black shoes are explicitly qualified CQC reconstruction of unseen lowerbody, not certified native PSP mesh.](https://metalgear.fandom.com/wiki/Nikolai_Stepanovich_Sokolov) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## npc53__zero_mpo

### MAJOR ZERO — PORTABLE OPS — PORTABLE OPS

**Rôle :** COMMANDANT FOX — support commandement. **Profil :** `pistol`.

**Base présente dans le code :** Incarnation radio/commandement de Portable Ops.

**Incarnation à conserver :** Independent playable PSP1970 incarnation in shirt/tie and furcollar leather jacket

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** MAJOR ZERO — PORTABLE OPS : main forte et main de soutien identifiées sur le pistolet, coudes contenus. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas prudents sans inverser l’étui ni la main forte. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « COMMANDANT FOX — support commandement » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder main forte et main de soutien identifiées sur le pistolet, coudes contenus.
- **jump_land :** MAJOR ZERO — PORTABLE OPS : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas prudents sans inverser l’étui ni la main forte. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de MAJOR ZERO — PORTABLE OPS. Terminer par recul du poignet puis stabilisation du canon. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « PORTABLE OPS », présentation de Independent playable PSP1970 incarnation in shirt/tie and furcollar leather jacket, puis main forte et main de soutien identifiées sur le pistolet, coudes contenus. Geste court lié à « Ordre de mission » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, recul du poignet puis stabilisation du canon ; MAJOR ZERO — PORTABLE OPS vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à PORTABLE OPS.
- **round_loss :** Proposition CQC : MAJOR ZERO — PORTABLE OPS réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Commandement total », revenir par recul du poignet puis stabilisation du canon, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Intervention rapprochée

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MAJOR ZERO — PORTABLE OPS, préparer « Intervention rapprochée » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Intervention rapprochée » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Action engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MAJOR ZERO — PORTABLE OPS, préparer « Action engagée » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Action engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage d’urgence

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MAJOR ZERO — PORTABLE OPS, préparer « Balayage d’urgence » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Immobilisation

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MAJOR ZERO — PORTABLE OPS, préparer « Immobilisation » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recul du poignet puis stabilisation du canon. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Ordre de mission

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MAJOR ZERO — PORTABLE OPS, préparer « Ordre de mission » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Montrer la prise et la visée de l’arme décrite par « Ordre de mission » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Ralliement

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MAJOR ZERO — PORTABLE OPS, préparer « Ralliement » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Prélever l’objet correspondant à « Ralliement », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Directive offensive

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MAJOR ZERO — PORTABLE OPS, préparer « Directive offensive » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Directive offensive » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Repli assisté

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MAJOR ZERO — PORTABLE OPS, préparer « Repli assisté » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer l’appui qui produit le déplacement ; pas prudents sans inverser l’étui ni la main forte.

**Action.** Exécuter « Repli assisté » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** recul du poignet puis stabilisation du canon. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Commandement total

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MAJOR ZERO — PORTABLE OPS, préparer « Commandement total » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Montrer la prise et la visée de l’arme décrite par « Commandement total » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recalibrer

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MAJOR ZERO — PORTABLE OPS, préparer « Recalibrer » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recalibrer », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** recul du poignet puis stabilisation du canon. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Commandement total — Protocole final

Famille `cqc`, ton `simulation` ; 210 ticks CQC ; phases actuelles : approach → counter → throw → pose. Appuis déclarés : Commandement total / Intervention rapprochée.

Plan 1 : MAJOR ZERO — PORTABLE OPS sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Commandement total / Intervention rapprochée ». Plan 2 : contact de saisie ou neutralisation lié à « Commandement total / Intervention rapprochée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : recul du poignet puis stabilisation du canon, pose de signature face à l’adversaire. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Ordre de mission — Neutralisation

Famille `cqc`, ton `simulation` ; 222 ticks CQC ; phases actuelles : approach → counter → throw → pose. Appuis déclarés : Ordre de mission / Intervention rapprochée.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Ordre de mission / Intervention rapprochée » ; l’espace disponible doit être lisible. Plan 2 : contact de saisie ou neutralisation lié à « Ordre de mission / Intervention rapprochée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : recul du poignet puis stabilisation du canon, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Ralliement — Extraction

Famille `cqc`, ton `simulation` ; 234 ticks CQC ; phases actuelles : approach → counter → throw → pose. Appuis déclarés : Ralliement / Intervention rapprochée.

Plan 1 : approche jusqu’à la distance réelle de « Ralliement / Intervention rapprochée », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Ralliement / Intervention rapprochée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : recul du poignet puis stabilisation du canon, prise de distance et maintien final. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Directive offensive — Fin de réseau

Famille `cqc`, ton `simulation` ; 246 ticks CQC ; phases actuelles : approach → counter → throw → pose. Appuis déclarés : Directive offensive / Intervention rapprochée.

Plan 1 : après une observation ou un repli, MAJOR ZERO — PORTABLE OPS reprend l’initiative par « Directive offensive / Intervention rapprochée ». Plan 2 : contact de saisie ou neutralisation lié à « Directive offensive / Intervention rapprochée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : recul du poignet puis stabilisation du canon, rangement/pose finale différente des trois autres. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Identity/reference scope/equipment and anatomical sides reviewed within the explicitly stated source limits; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Whole lowerbody and hands not visible in authentic small PSP source, pending exact native fullbody reference.
- Visual shader palette/materials inferred from tiny original portrait; no absolute1:1 mesh claim.
- No firearm drawn in native source keyposes even if original selectable equipment includes shotgun; visualFirearmPresent:false follows actual artwork.
- Native motion authored for CQC, independent UID/lore/save unchanged.
- [Actual original-game upperbody portrait physically inspected defines older short silver-gray hair, stern pale face, dark leather flight jacket and furry collar, white formal shirt and straight black necktie. No MGS3 headset/open-neckshirt alias. Screenshot does not attest whole legs/hands; simple dark straight trousers, black shoes and bare hands are explicitly qualified CQC reconstruction.](https://metalgear.fandom.com/wiki/Zero) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## npc53__paramedic_mpo

### PARA-MEDIC — PORTABLE OPS — PORTABLE OPS

**Rôle :** MÉDECIN FOX — support soins. **Profil :** `pistol`.

**Base présente dans le code :** Incarnation Portable Ops de Para-Medic ; profil non létal.

**Incarnation à conserver :** Exact independent playable PSP1970 support incarnation, not MGS3 or Delta radio model

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, special, specialForward, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** PARA-MEDIC — PORTABLE OPS : main forte et main de soutien identifiées sur le pistolet, coudes contenus. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas prudents sans inverser l’étui ni la main forte. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « MÉDECIN FOX — support soins » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder main forte et main de soutien identifiées sur le pistolet, coudes contenus.
- **jump_land :** PARA-MEDIC — PORTABLE OPS : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas prudents sans inverser l’étui ni la main forte. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de PARA-MEDIC — PORTABLE OPS. Terminer par recul du poignet puis stabilisation du canon. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « PORTABLE OPS », présentation de Exact independent playable PSP1970 support incarnation, not MGS3 or Delta radio model, puis main forte et main de soutien identifiées sur le pistolet, coudes contenus. Geste court lié à « Stabilisation » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, recul du poignet puis stabilisation du canon ; PARA-MEDIC — PORTABLE OPS vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à PORTABLE OPS.
- **round_loss :** Proposition CQC : PARA-MEDIC — PORTABLE OPS réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Protocole vital », revenir par recul du poignet puis stabilisation du canon, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Intervention rapprochée

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PARA-MEDIC — PORTABLE OPS, préparer « Intervention rapprochée » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Intervention rapprochée » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Action engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PARA-MEDIC — PORTABLE OPS, préparer « Action engagée » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Action engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage d’urgence

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PARA-MEDIC — PORTABLE OPS, préparer « Balayage d’urgence » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Immobilisation

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PARA-MEDIC — PORTABLE OPS, préparer « Immobilisation » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recul du poignet puis stabilisation du canon. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Stabilisation

**Existant :** `melee` / `electric` ; 17/5/29 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PARA-MEDIC — PORTABLE OPS, préparer « Stabilisation » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Stabilisation » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense. L’effet electric reste séparé du membre ; son apparition et sa disparition suivent les événements du profil.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Espacement ou garde ; choc bref avec résistance temporaire après application.

##### specialDown — Kit d’urgence

**Existant :** `mark` / `recon` ; 26/1/30 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PARA-MEDIC — PORTABLE OPS, préparer « Kit d’urgence » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Orienter regard, optique ou terminal vers la cible observée, sans consulter une action future.

**Action.** Pour « Kit d’urgence », déclencher lecture/repérage avec un petit geste ou changement d’optique et un indicateur séparé. Le corps doit rester visible et vulnérable selon les données de combat.

**Retour.** recul du poignet puis stabilisation du canon. Couper le signal ou abaisser l’outil ; retour vers l’adversaire sans nouvelle arme inventée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Portée limitée ; le marquage ne vise ni à travers toute l’arène ni automatiquement.

##### specialForward — Relais médical

**Existant :** `mobility` / `movement` ; 7/18/25 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PARA-MEDIC — PORTABLE OPS, préparer « Relais médical » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer l’appui qui produit le déplacement ; pas prudents sans inverser l’étui ni la main forte.

**Action.** Exécuter « Relais médical » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 4 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** recul du poignet puis stabilisation du canon. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : La silhouette reste touchable ; la sortie est punissable.

##### specialBack — Repli assisté

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PARA-MEDIC — PORTABLE OPS, préparer « Repli assisté » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer l’appui qui produit le déplacement ; pas prudents sans inverser l’étui ni la main forte.

**Action.** Exécuter « Repli assisté » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** recul du poignet puis stabilisation du canon. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Protocole vital

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PARA-MEDIC — PORTABLE OPS, préparer « Protocole vital » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Protocole vital », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Recalibrer

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PARA-MEDIC — PORTABLE OPS, préparer « Recalibrer » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Recalibrer ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** recul du poignet puis stabilisation du canon. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Protocole vital — Protocole final

Famille `capture`, ton `simulation` ; 210 ticks CQC ; phases actuelles : approach → restrain → extract → pose. Appuis déclarés : Protocole vital / Intervention rapprochée.

Plan 1 : PARA-MEDIC — PORTABLE OPS sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Protocole vital / Intervention rapprochée ». Plan 2 : contact de saisie ou neutralisation lié à « Protocole vital / Intervention rapprochée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : recul du poignet puis stabilisation du canon, pose de signature face à l’adversaire. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Stabilisation — Neutralisation

Famille `capture`, ton `simulation` ; 222 ticks CQC ; phases actuelles : approach → restrain → extract → pose. Appuis déclarés : Stabilisation / Intervention rapprochée.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Stabilisation / Intervention rapprochée » ; l’espace disponible doit être lisible. Plan 2 : contact de saisie ou neutralisation lié à « Stabilisation / Intervention rapprochée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : recul du poignet puis stabilisation du canon, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Kit d’urgence — Extraction

Famille `capture`, ton `simulation` ; 234 ticks CQC ; phases actuelles : approach → restrain → extract → pose. Appuis déclarés : Kit d’urgence / Intervention rapprochée.

Plan 1 : approche jusqu’à la distance réelle de « Kit d’urgence / Intervention rapprochée », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Kit d’urgence / Intervention rapprochée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : recul du poignet puis stabilisation du canon, prise de distance et maintien final. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Relais médical — Fin de réseau

Famille `capture`, ton `simulation` ; 246 ticks CQC ; phases actuelles : approach → restrain → extract → pose. Appuis déclarés : Relais médical / Intervention rapprochée.

Plan 1 : après une observation ou un repli, PARA-MEDIC — PORTABLE OPS reprend l’initiative par « Relais médical / Intervention rapprochée ». Plan 2 : contact de saisie ou neutralisation lié à « Relais médical / Intervention rapprochée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : recul du poignet puis stabilisation du canon, rangement/pose finale différente des trois autres. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Identity/reference scope/equipment and anatomical sides reviewed within the explicitly stated source limits; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Upperbody follows released PSP model, not MGS3 skirt, poncho or Delta remake.
- Reference does not attest whole legs/boots; those details are qualified CQC reconstruction pending authentic fullbody capture.
- Native CQC motion is authored adaptation; no gun physically drawn, visualFirearmPresent:false.
- [Two original game captures physically inspected define chestnut short bob, rounded headset, fitted brown short-sleeved Tshirt, bare arms/hands, diagonal olive strap and waist satchel. Actual screenshot width reaches waist only. Native lowerbody is explicitly provisional reconstruction using restrained brown utilitarian trousers and dark laceup boots, not a claimed 1:1 original-game mesh.](https://metalgear.fandom.com/wiki/Para-Medic) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## npc53__sigint_mpo

### SIGINT — PORTABLE OPS — PORTABLE OPS

**Rôle :** ARMEMENT FOX — support ravitaillement. **Profil :** `analyst`.

**Base présente dans le code :** Incarnation Portable Ops de Sigint ; profil d’armement simulé.

**Incarnation à conserver :** 1970 playable PSP model; independent from classic MGS3/Delta radio support

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, special, specialForward, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** SIGINT — PORTABLE OPS : outil de lecture ou de communication montré par le profil, attitude d’observation. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « ARMEMENT FOX — support ravitaillement » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder outil de lecture ou de communication montré par le profil, attitude d’observation.
- **jump_land :** SIGINT — PORTABLE OPS : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de SIGINT — PORTABLE OPS. Terminer par regard vers l’outil puis retour vers l’adversaire. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « PORTABLE OPS », présentation de 1970 playable PSP model; independent from classic MGS3/Delta radio support, puis outil de lecture ou de communication montré par le profil, attitude d’observation. Geste court lié à « Ravitaillement » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, regard vers l’outil puis retour vers l’adversaire ; SIGINT — PORTABLE OPS vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à PORTABLE OPS.
- **round_loss :** Proposition CQC : SIGINT — PORTABLE OPS réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Logistique complète », revenir par regard vers l’outil puis retour vers l’adversaire, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Intervention rapprochée

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SIGINT — PORTABLE OPS, préparer « Intervention rapprochée » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Intervention rapprochée » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Action engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SIGINT — PORTABLE OPS, préparer « Action engagée » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Action engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage d’urgence

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SIGINT — PORTABLE OPS, préparer « Balayage d’urgence » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Immobilisation

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SIGINT — PORTABLE OPS, préparer « Immobilisation » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Ravitaillement

**Existant :** `melee` / `electric` ; 17/5/29 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SIGINT — PORTABLE OPS, préparer « Ravitaillement » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Ravitaillement » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense. L’effet electric reste séparé du membre ; son apparition et sa disparition suivent les événements du profil.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Espacement ou garde ; choc bref avec résistance temporaire après application.

##### specialDown — Réserve tactique

**Existant :** `mark` / `recon` ; 26/1/30 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SIGINT — PORTABLE OPS, préparer « Réserve tactique » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Orienter regard, optique ou terminal vers la cible observée, sans consulter une action future.

**Action.** Pour « Réserve tactique », déclencher lecture/repérage avec un petit geste ou changement d’optique et un indicateur séparé. Le corps doit rester visible et vulnérable selon les données de combat.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Couper le signal ou abaisser l’outil ; retour vers l’adversaire sans nouvelle arme inventée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Portée limitée ; le marquage ne vise ni à travers toute l’arène ni automatiquement.

##### specialForward — Caisse avancée

**Existant :** `mobility` / `movement` ; 7/18/25 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SIGINT — PORTABLE OPS, préparer « Caisse avancée » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer l’appui qui produit le déplacement ; déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire.

**Action.** Exécuter « Caisse avancée » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 4 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : La silhouette reste touchable ; la sortie est punissable.

##### specialBack — Repli assisté

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SIGINT — PORTABLE OPS, préparer « Repli assisté » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer l’appui qui produit le déplacement ; déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire.

**Action.** Exécuter « Repli assisté » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Logistique complète

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SIGINT — PORTABLE OPS, préparer « Logistique complète » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Logistique complète », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Recalibrer

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SIGINT — PORTABLE OPS, préparer « Recalibrer » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Recalibrer ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Logistique complète — Protocole final

Famille `ballistic`, ton `simulation` ; 210 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Logistique complète / Intervention rapprochée.

Plan 1 : SIGINT — PORTABLE OPS sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Logistique complète / Intervention rapprochée ». Plan 2 : présenter l’arme effectivement associée à « Logistique complète / Intervention rapprochée », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : regard vers l’outil puis retour vers l’adversaire, pose de signature face à l’adversaire. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Ravitaillement — Neutralisation

Famille `ballistic`, ton `simulation` ; 222 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Ravitaillement / Intervention rapprochée.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Ravitaillement / Intervention rapprochée » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Ravitaillement / Intervention rapprochée », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : regard vers l’outil puis retour vers l’adversaire, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Réserve tactique — Extraction

Famille `ballistic`, ton `simulation` ; 234 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Réserve tactique / Intervention rapprochée.

Plan 1 : approche jusqu’à la distance réelle de « Réserve tactique / Intervention rapprochée », arme et main libre identifiées. Plan 2 : présenter l’arme effectivement associée à « Réserve tactique / Intervention rapprochée », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : regard vers l’outil puis retour vers l’adversaire, prise de distance et maintien final. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Caisse avancée — Fin de réseau

Famille `ballistic`, ton `simulation` ; 246 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Caisse avancée / Intervention rapprochée.

Plan 1 : après une observation ou un repli, SIGINT — PORTABLE OPS reprend l’initiative par « Caisse avancée / Intervention rapprochée ». Plan 2 : présenter l’arme effectivement associée à « Caisse avancée / Intervention rapprochée », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : regard vers l’outil puis retour vers l’adversaire, rangement/pose finale différente des trois autres. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Identity/reference scope/equipment and anatomical sides reviewed within the explicitly stated source limits; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Different actual playable incarnation from MGS3 red shirt/headset/camo overalls; no silent outfit alias.
- Native lowerbody is provisional pending whole-body original-game reference; source does not establish pants or boot textures.
- A search snippet about camo pants was checked and rejected: its actual guide section concerns hacked Naked Snake, not SIGINT.
- Authored unarmed CQC keyposes; no firearm in selected PNGs hence visualFirearmPresent:false.
- [Real game screenshot physically inspected establishes Black adult SIGINT, dark baseballcap, short facial hair, orange/salmon sleeveless tank with beige binding, peace-symbol necklace and olive strapwebbing. Whole lowerbody invisible in capture; muted olive cargo trousers and dark laceup boots are explicit restrained CQC reconstruction, not attested original PSP mesh.](https://metalgear.fandom.com/wiki/Donald_Anderson) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).
