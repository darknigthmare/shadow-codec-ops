# Animations — ROSTER COMPLETION 0.51

**10 acteurs du registre courant.** Les titres d’actions et paramètres sont observés ; les descriptions sont des propositions CQC à produire et valider. Un groupe de frames existant ne certifie pas l’ensemble du mouvement ou sa fidélité originale.

[Index des fiches](README.md) · [Contrat commun](../04_ANIMATIONS_SPRITES.md)

## Sommaire

- [THE SORROW](#roster51__sorrow_mgs3) — MGS3
- [THE BOSS — DELTA](#roster51__boss_delta) — MGS DELTA
- [EVA — DELTA](#roster51__eva_delta) — MGS DELTA
- [OCELOT — DELTA](#roster51__ocelot_delta) — MGS DELTA
- [VOLGIN — DELTA](#roster51__volgin_delta) — MGS DELTA
- [THE PAIN — DELTA](#roster51__pain_delta) — MGS DELTA
- [THE FEAR — DELTA](#roster51__fear_delta) — MGS DELTA
- [THE END — DELTA](#roster51__end_delta) — MGS DELTA
- [THE FURY — DELTA](#roster51__fury_delta) — MGS DELTA
- [THE SORROW — DELTA](#roster51__sorrow_delta) — MGS DELTA

## roster51__sorrow_mgs3

### THE SORROW — MGS3

**Rôle :** Télékinésie bornée et mobilité. **Profil :** `psychic`.

**Base présente dans le code :** Membre de l’unité Cobra : médium et présence spectrale, transposés sans contrôle des commandes adverses.

**Incarnation à conserver :** MGS3 — 1964, classic incarnation, modern CQC paint adaptation

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `deploy` = special, specialDown, super.

**Techniques pointant sur une seule région native dans la direction principale :** special, specialDown, specialBack, super, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** THE SORROW : regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** mouvement et éventuelle sustentation distingués de l’effet psychique. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Télékinésie bornée et mobilité » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile.
- **jump_land :** THE SORROW : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. mouvement et éventuelle sustentation distingués de l’effet psychique. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de THE SORROW. Terminer par cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS3 », présentation de MGS3 — 1964, classic incarnation, modern CQC paint adaptation, puis regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Geste court lié à « Débris télékinétiques — Sorrow » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, cesser le geste de concentration puis revenir à la posture propre à l’incarnation ; THE SORROW vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS3.
- **round_loss :** Proposition CQC : THE SORROW réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Psychokinésie — Sorrow », revenir par cesser le geste de concentration puis revenir à la posture propre à l’incarnation, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE SORROW, préparer « Jab » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE SORROW, préparer « Frappe engagée » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE SORROW, préparer « Balayage » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE SORROW, préparer « Projection » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Débris télékinétiques — Sorrow

**Existant :** `projectile` / `psychic` ; 27/1/30 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE SORROW, préparer « Débris télékinétiques — Sorrow » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Donner à la source de « Débris télékinétiques — Sorrow » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet psychic de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Projectile lent et visible : sauter, bloquer ou détruire avec une attaque.

##### specialDown — Entrave mentale — Sorrow

**Existant :** `projectile` / `bind` ; 32/1/34 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE SORROW, préparer « Entrave mentale — Sorrow » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Donner à la source de « Entrave mentale — Sorrow » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet bind de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut ou garde basse ; ralentissement bref, aucune confiscation des commandes.

##### specialForward — Déplacement de Mantis — Sorrow

**Existant :** `mobility` / `psychic` ; 23/1/28 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE SORROW, préparer « Déplacement de Mantis — Sorrow » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Préparer l’appui qui produit le déplacement ; mouvement et éventuelle sustentation distingués de l’effet psychique.

**Action.** Exécuter « Déplacement de Mantis — Sorrow » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Départ et arrivée indiqués ; pas de téléportation derrière la cible ni hors arène.

##### specialBack — Déviation psychique — Sorrow

**Existant :** `parry` / `counter` ; 5/12/28 ticks ; groupe `parry`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE SORROW, préparer « Déviation psychique — Sorrow » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Présenter la surface ou l’organe de parade et maintenir une fenêtre courte lisible.

**Action.** Recevoir puis dévier au contact réel pour « Déviation psychique — Sorrow » ; la riposte et son effet n’apparaissent qu’après succès. Une attente sans contact garde une pose différente du contre réussi.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Séparer sortie ratée, blocage simple et riposte ; aucun effet de réussite avant collision.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Projections, attaques au corps à corps et explosifs au sol ne sont pas renvoyés.

##### super — Psychokinésie — Sorrow

**Existant :** `projectile` / `psychic` ; 35/1/44 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE SORROW, préparer « Psychokinésie — Sorrow » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Donner à la source de « Psychokinésie — Sorrow » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet psychic de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet. La salve contient 5 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 5 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Stabiliser la réserve

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE SORROW, préparer « Stabiliser la réserve » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Stabiliser la réserve ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Blackout — Sorrow

Famille `psychic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : lift → orbit → crush → drop. Appuis déclarés : Psychokinésie — Sorrow / Débris télékinétiques — Sorrow.

Plan 1 : THE SORROW sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Psychokinésie — Sorrow / Débris télékinétiques — Sorrow ». Plan 2 : montrer la source corporelle ou matérielle de « Psychokinésie — Sorrow / Débris télékinétiques — Sorrow ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, pose de signature face à l’adversaire.

##### Memory Read — Sorrow

Famille `psychic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : lift → orbit → crush → drop. Appuis déclarés : Psychokinésie — Sorrow / Entrave mentale — Sorrow.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Psychokinésie — Sorrow / Entrave mentale — Sorrow » ; l’espace disponible doit être lisible. Plan 2 : montrer la source corporelle ou matérielle de « Psychokinésie — Sorrow / Entrave mentale — Sorrow ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, arrêt du dispositif et retour au cadre d’ensemble.

##### Telekinetic Burial — Sorrow

Famille `psychic`, ton `stylized` ; 256 ticks CQC ; phases actuelles : lift → orbit → crush → drop. Appuis déclarés : Psychokinésie — Sorrow / Déplacement de Mantis — Sorrow.

Plan 1 : approche jusqu’à la distance réelle de « Psychokinésie — Sorrow / Déplacement de Mantis — Sorrow », arme et main libre identifiées. Plan 2 : montrer la source corporelle ou matérielle de « Psychokinésie — Sorrow / Déplacement de Mantis — Sorrow ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, prise de distance et maintien final.

##### Controller Port Two — Sorrow

Famille `psychic`, ton `stylized` ; 274 ticks CQC ; phases actuelles : lift → orbit → crush → drop. Appuis déclarés : Psychokinésie — Sorrow / Déviation psychique — Sorrow.

Plan 1 : après une observation ou un repli, THE SORROW reprend l’initiative par « Psychokinésie — Sorrow / Déviation psychique — Sorrow ». Plan 2 : montrer la source corporelle ou matérielle de « Psychokinésie — Sorrow / Déviation psychique — Sorrow ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Classic MGS3 incarnation stays independent. Official Delta full-body released model render is complementary remake evidence and helps supported outfit colors, not a certificate that every cloth/face detail is identical to PS2. Generated motion/camera views are authored CQC adaptations.
- No original-game motion capture or absolute 1:1 animation/timing claim. No armed support pose invented from an unrelated source.
- Rejected right V1 reached canvas edge; rejected left V1/V2 had opaque gradient backgrounds and incomplete boots. Selected right V2 and fresh left V3 retain complete bodies on transparent alpha. Every raw source remains preserved.
- [Classic MGS3 incarnation stays independent. Official Delta full-body released model render is complementary remake evidence and helps supported outfit colors, not a certificate that every cloth/face detail is identical to PS2. Generated motion/camera views are authored CQC adaptations.](https://www.creativeuncut.com/gallery-07/mgs3-the-sorrow.html) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## roster51__boss_delta

### THE BOSS — DELTA — MGS DELTA

**Rôle :** CQC : désarmement et Patriot. **Profil :** `boss_cqc`.

**Base présente dans le code :** Incarnation Delta de The Boss : CQC, Patriot et contre rapproché.

**Incarnation à conserver :** Final2025 Delta official white/gray sneaking suit and Patriot appearance

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `throw` = throw, special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** THE BOSS — DELTA : garde de The Boss, main de contrôle et main d’arme clairement séparées. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** entrée courte, rotation de bassin et placement du pied de contrôle. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « CQC : désarmement et Patriot » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder garde de The Boss, main de contrôle et main d’arme clairement séparées.
- **jump_land :** THE BOSS — DELTA : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. entrée courte, rotation de bassin et placement du pied de contrôle. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de THE BOSS — DELTA. Terminer par désarmement/projection lisible puis retour sobre à la garde. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS DELTA », présentation de Final2025 Delta official white/gray sneaking suit and Patriot appearance, puis garde de The Boss, main de contrôle et main d’arme clairement séparées. Geste court lié à « CQC : renversement — Delta » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, désarmement/projection lisible puis retour sobre à la garde ; THE BOSS — DELTA vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS DELTA.
- **round_loss :** Proposition CQC : THE BOSS — DELTA réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « The Joy — CQC final — Delta », revenir par désarmement/projection lisible puis retour sobre à la garde, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE BOSS — DELTA, préparer « Jab » ; garde de The Boss, main de contrôle et main d’arme clairement séparées. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** désarmement/projection lisible puis retour sobre à la garde.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE BOSS — DELTA, préparer « Frappe engagée » ; garde de The Boss, main de contrôle et main d’arme clairement séparées. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** désarmement/projection lisible puis retour sobre à la garde.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE BOSS — DELTA, préparer « Balayage » ; garde de The Boss, main de contrôle et main d’arme clairement séparées. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** désarmement/projection lisible puis retour sobre à la garde.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE BOSS — DELTA, préparer « Projection » ; garde de The Boss, main de contrôle et main d’arme clairement séparées. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** désarmement/projection lisible puis retour sobre à la garde. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — CQC : renversement — Delta

**Existant :** `melee` / `grapple` ; 8/3/32 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE BOSS — DELTA, préparer « CQC : renversement — Delta » ; garde de The Boss, main de contrôle et main d’arme clairement séparées. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** désarmement/projection lisible puis retour sobre à la garde. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Hors de portée ou saut ; ne saisir ni cible aérienne ni cible sous protection post-projection.

##### specialDown — The Patriot — Delta

**Existant :** `projectile` / `ballistic` ; 22/1/36 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE BOSS — DELTA, préparer « The Patriot — Delta » ; garde de The Boss, main de contrôle et main d’arme clairement séparées. Montrer la prise et la visée de l’arme décrite par « The Patriot — Delta » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 3 émissions, espacées de 5 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** désarmement/projection lisible puis retour sobre à la garde. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 3 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### specialForward — Entrée au couteau — Delta

**Existant :** `melee` / `blade` ; 18/7/32 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE BOSS — DELTA, préparer « Entrée au couteau — Delta » ; garde de The Boss, main de contrôle et main d’arme clairement séparées. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** désarmement/projection lisible puis retour sobre à la garde. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Désarmement CQC — Delta

**Existant :** `parry` / `counter` ; 4/9/34 ticks ; groupe `parry`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE BOSS — DELTA, préparer « Désarmement CQC — Delta » ; garde de The Boss, main de contrôle et main d’arme clairement séparées. Présenter la surface ou l’organe de parade et maintenir une fenêtre courte lisible.

**Action.** Recevoir puis dévier au contact réel pour « Désarmement CQC — Delta » ; la riposte et son effet n’apparaissent qu’après succès. Une attente sans contact garde une pose différente du contre réussi.

**Retour.** désarmement/projection lisible puis retour sobre à la garde. Séparer sortie ratée, blocage simple et riposte ; aucun effet de réussite avant collision.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Projeter ou retarder la frappe ; le désarmement temporaire ne supprime jamais l’inventaire.

##### super — The Joy — CQC final — Delta

**Existant :** `melee` / `grapple` ; 25/7/44 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE BOSS — DELTA, préparer « The Joy — CQC final — Delta » ; garde de The Boss, main de contrôle et main d’arme clairement séparées. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** désarmement/projection lisible puis retour sobre à la garde. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Reprendre son souffle

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE BOSS — DELTA, préparer « Reprendre son souffle » ; garde de The Boss, main de contrôle et main d’arme clairement séparées. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Reprendre son souffle ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** désarmement/projection lisible puis retour sobre à la garde. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Patriot’s Last Salute — Delta

Famille `cqc`, ton `stylized` ; 220 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : The Joy — CQC final — Delta / CQC : renversement — Delta.

Plan 1 : THE BOSS — DELTA sécurise son appui, regarde la cible et prépare l’outil ou le geste de « The Joy — CQC final — Delta / CQC : renversement — Delta ». Plan 2 : contact de saisie ou neutralisation lié à « The Joy — CQC final — Delta / CQC : renversement — Delta », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : désarmement/projection lisible puis retour sobre à la garde, pose de signature face à l’adversaire.

##### CQC — Dernière leçon — Delta

Famille `cqc`, ton `stylized` ; 238 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : The Joy — CQC final — Delta / The Patriot — Delta.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « The Joy — CQC final — Delta / The Patriot — Delta » ; l’espace disponible doit être lisible. Plan 2 : contact de saisie ou neutralisation lié à « The Joy — CQC final — Delta / The Patriot — Delta », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : désarmement/projection lisible puis retour sobre à la garde, arrêt du dispositif et retour au cadre d’ensemble.

##### Champ blanc — Delta

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : The Joy — CQC final — Delta / Entrée au couteau — Delta.

Plan 1 : approche jusqu’à la distance réelle de « The Joy — CQC final — Delta / Entrée au couteau — Delta », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « The Joy — CQC final — Delta / Entrée au couteau — Delta », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : désarmement/projection lisible puis retour sobre à la garde, prise de distance et maintien final.

##### Mission accomplie — Delta

Famille `cqc`, ton `stylized` ; 274 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : The Joy — CQC final — Delta / Désarmement CQC — Delta.

Plan 1 : après une observation ou un repli, THE BOSS — DELTA reprend l’initiative par « The Joy — CQC final — Delta / Désarmement CQC — Delta ». Plan 2 : contact de saisie ou neutralisation lié à « The Joy — CQC final — Delta / Désarmement CQC — Delta », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : désarmement/projection lisible puis retour sobre à la garde, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Patriot short rifle with double-drum magazine and no stock follows official released model. Two first atlases rejected for incomplete boots on reset pose; second full-body sources retained intact. Unsampled rear details and combat gesture interpolation remain authored adaptation.
- [Official Konami final Delta full-body marketing model physically reviewed; independently authored native fighting adaptation](https://www.konami.com/mg/mgs3r/s/img/characters/boss.png) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## roster51__eva_delta

### EVA — DELTA — MGS DELTA

**Rôle :** Pistolet et défense proche. **Profil :** `pistol`.

**Base présente dans le code :** Incarnation Delta d’EVA : pistolet, moto simulée et diversion.

**Incarnation à conserver :** Final2025 Delta adult pilot; same tan flight suit with front zipper closed for this authored adaptation

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `throw` = throw, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** EVA — DELTA : main forte et main de soutien identifiées sur le pistolet, coudes contenus. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas prudents sans inverser l’étui ni la main forte. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Pistolet et défense proche » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder main forte et main de soutien identifiées sur le pistolet, coudes contenus.
- **jump_land :** EVA — DELTA : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas prudents sans inverser l’étui ni la main forte. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de EVA — DELTA. Terminer par recul du poignet puis stabilisation du canon. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS DELTA », présentation de Final2025 Delta adult pilot; same tan flight suit with front zipper closed for this authored adaptation, puis main forte et main de soutien identifiées sur le pistolet, coudes contenus. Geste court lié à « Type 17 — Delta » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, recul du poignet puis stabilisation du canon ; EVA — DELTA vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS DELTA.
- **round_loss :** Proposition CQC : EVA — DELTA réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Couverture de Tatyana — Delta », revenir par recul du poignet puis stabilisation du canon, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de EVA — DELTA, préparer « Jab » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de EVA — DELTA, préparer « Frappe engagée » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de EVA — DELTA, préparer « Balayage » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de EVA — DELTA, préparer « Projection » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recul du poignet puis stabilisation du canon. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Type 17 — Delta

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de EVA — DELTA, préparer « Type 17 — Delta » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Montrer la prise et la visée de l’arme décrite par « Type 17 — Delta » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Grenade d’évasion — Delta

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de EVA — DELTA, préparer « Grenade d’évasion — Delta » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Prélever l’objet correspondant à « Grenade d’évasion — Delta », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Prise de proximité — Delta

**Existant :** `melee` / `grapple` ; 10/3/32 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de EVA — DELTA, préparer « Prise de proximité — Delta » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recul du poignet puis stabilisation du canon. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Hors de portée ou saut ; ne saisir ni cible aérienne ni cible sous protection post-projection.

##### specialBack — Écart d’EVA — Delta

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de EVA — DELTA, préparer « Écart d’EVA — Delta » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer l’appui qui produit le déplacement ; pas prudents sans inverser l’étui ni la main forte.

**Action.** Exécuter « Écart d’EVA — Delta » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** recul du poignet puis stabilisation du canon. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Couverture de Tatyana — Delta

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de EVA — DELTA, préparer « Couverture de Tatyana — Delta » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Montrer la prise et la visée de l’arme décrite par « Couverture de Tatyana — Delta » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de EVA — DELTA, préparer « Recharger » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** recul du poignet puis stabilisation du canon. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Couverture de Tatyana — Final — Delta

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Couverture de Tatyana — Delta / Type 17 — Delta.

Plan 1 : EVA — DELTA sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Couverture de Tatyana — Delta / Type 17 — Delta ». Plan 2 : présenter l’arme effectivement associée à « Couverture de Tatyana — Delta / Type 17 — Delta », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : recul du poignet puis stabilisation du canon, pose de signature face à l’adversaire.

##### Type 17 / Grenade d’évasion — Delta

Famille `ballistic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Couverture de Tatyana — Delta / Grenade d’évasion — Delta.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Couverture de Tatyana — Delta / Grenade d’évasion — Delta » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Couverture de Tatyana — Delta / Grenade d’évasion — Delta », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : recul du poignet puis stabilisation du canon, arrêt du dispositif et retour au cadre d’ensemble.

##### Prise de proximité — Point final — Delta

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Couverture de Tatyana — Delta / Prise de proximité — Delta.

Plan 1 : approche jusqu’à la distance réelle de « Couverture de Tatyana — Delta / Prise de proximité — Delta », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Couverture de Tatyana — Delta / Prise de proximité — Delta », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : recul du poignet puis stabilisation du canon, prise de distance et maintien final.

##### Lecture rapprochée — Mission close — Delta

Famille `ballistic`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Couverture de Tatyana — Delta / Écart d’EVA — Delta.

Plan 1 : après une observation ou un repli, EVA — DELTA reprend l’initiative par « Couverture de Tatyana — Delta / Écart d’EVA — Delta ». Plan 2 : présenter l’arme effectivement associée à « Couverture de Tatyana — Delta / Écart d’EVA — Delta », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : recul du poignet puis stabilisation du canon, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Both selected directions depict the same fully zipped tan-brown pilot suit; official open-front version was preserved as an alternate original, not silently merged into this costume. The zipper closure is not certified as the official marketed appearance. Independent full-body combat poses are authored; holster remains anatomical right hip and watch anatomical left wrist. Two left generation attempts failed output safety review; exact error receipts and requests retained.
- [Official Konami adult final Delta full-body model physically reviewed for face, hair, costume construction, goggles, gloves, holster and boots; front zipper closure is an explicitly authored presentation adaptation on both directions](https://www.konami.com/mg/mgs3r/s/img/characters/eva.png) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## roster51__ocelot_delta

### OCELOT — DELTA — MGS DELTA

**Rôle :** Six coups et ricochet limité. **Profil :** `ocelot`.

**Base présente dans le code :** Incarnation Delta du jeune Ocelot : revolvers, ricochets et posture de duel.

**Incarnation à conserver :** Final2025 Delta young Revolver Ocelot red beret and charcoal officer uniform

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `shoot` = special, specialDown, specialForward, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** OCELOT — DELTA : poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas latéraux et regard indépendant des rotations d’arme. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Six coups et ricochet limité » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder poignets, revolvers et étuis propres à cet âge ; manipulation identifiable.
- **jump_land :** OCELOT — DELTA : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas latéraux et regard indépendant des rotations d’arme. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de OCELOT — DELTA. Terminer par replacer chaque arme sans changer sa main ni téléporter les cartouches. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS DELTA », présentation de Final2025 Delta young Revolver Ocelot red beret and charcoal officer uniform, puis poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Geste court lié à « Single Action Army — jeune — Delta » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, replacer chaque arme sans changer sa main ni téléporter les cartouches ; OCELOT — DELTA vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS DELTA.
- **round_loss :** Proposition CQC : OCELOT — DELTA réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Six coups — 1964 — Delta », revenir par replacer chaque arme sans changer sa main ni téléporter les cartouches, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OCELOT — DELTA, préparer « Jab » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OCELOT — DELTA, préparer « Frappe engagée » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OCELOT — DELTA, préparer « Balayage » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OCELOT — DELTA, préparer « Projection » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Single Action Army — jeune — Delta

**Existant :** `projectile` / `precision` ; 15/1/24 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OCELOT — DELTA, préparer « Single Action Army — jeune — Delta » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Montrer la prise et la visée de l’arme décrite par « Single Action Army — jeune — Delta » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. Prévoir le ricochet comme événement de l’objet ; le corps ne se réoriente pas automatiquement vers la cible.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Six munitions puis recharge ; le ricochet rebondit une fois, pas de tir infini.

##### specialDown — Ricochet de duel — Delta

**Existant :** `projectile` / `ballistic` ; 23/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OCELOT — DELTA, préparer « Ricochet de duel — Delta » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Montrer la prise et la visée de l’arme décrite par « Ricochet de duel — Delta » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialForward — Pas d’Ocelot — Delta

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OCELOT — DELTA, préparer « Pas d’Ocelot — Delta » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Préparer l’appui qui produit le déplacement ; pas latéraux et regard indépendant des rotations d’arme.

**Action.** Exécuter « Pas d’Ocelot — Delta » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### specialBack — Crosse du major — Delta

**Existant :** `parry` / `counter` ; 3/10/29 ticks ; groupe `parry`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OCELOT — DELTA, préparer « Crosse du major — Delta » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Présenter la surface ou l’organe de parade et maintenir une fenêtre courte lisible.

**Action.** Recevoir puis dévier au contact réel pour « Crosse du major — Delta » ; la riposte et son effet n’apparaissent qu’après succès. Une attente sans contact garde une pose différente du contre réussi.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches. Séparer sortie ratée, blocage simple et riposte ; aucun effet de réussite avant collision.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Retarder la frappe, projeter ou attendre les 29 images de récupération.

##### super — Six coups — 1964 — Delta

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OCELOT — DELTA, préparer « Six coups — 1964 — Delta » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Montrer la prise et la visée de l’arme décrite par « Six coups — 1964 — Delta » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Exige six cartouches et 50 TACTIC. Accroupissement sous les tirs hauts, saut ou interruption avant départ ; aucun rechargement gratuit.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OCELOT — DELTA, préparer « Recharger » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Quick Draw GRU — Delta

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Six coups — 1964 — Delta / Single Action Army — jeune — Delta.

Plan 1 : OCELOT — DELTA sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Six coups — 1964 — Delta / Single Action Army — jeune — Delta ». Plan 2 : présenter l’arme effectivement associée à « Six coups — 1964 — Delta / Single Action Army — jeune — Delta », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : replacer chaque arme sans changer sa main ni téléporter les cartouches, pose de signature face à l’adversaire.

##### Triple Ricochet — Delta

Famille `sniper`, ton `stylized` ; 238 ticks CQC ; phases actuelles : mark → steady → shot → fade. Appuis déclarés : Six coups — 1964 — Delta / Ricochet de duel — Delta.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Six coups — 1964 — Delta / Ricochet de duel — Delta » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Six coups — 1964 — Delta / Ricochet de duel — Delta », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : replacer chaque arme sans changer sa main ni téléporter les cartouches, arrêt du dispositif et retour au cadre d’ensemble.

##### Revolver Lesson — Delta

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Six coups — 1964 — Delta / Pas d’Ocelot — Delta.

Plan 1 : approche jusqu’à la distance réelle de « Six coups — 1964 — Delta / Pas d’Ocelot — Delta », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Six coups — 1964 — Delta / Pas d’Ocelot — Delta », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : replacer chaque arme sans changer sa main ni téléporter les cartouches, prise de distance et maintien final.

##### Young Ocelot Finale — Delta

Famille `ballistic`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Six coups — 1964 — Delta / Crosse du major — Delta.

Plan 1 : après une observation ou un repli, OCELOT — DELTA reprend l’initiative par « Six coups — 1964 — Delta / Crosse du major — Delta ». Plan 2 : présenter l’arme effectivement associée à « Six coups — 1964 — Delta / Crosse du major — Delta », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : replacer chaque arme sans changer sa main ni téléporter les cartouches, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Native pose order differs from requested atlas grid: right physical10 is Colt aim and11 overhead guard; left physical10 aim,11 weapon check,12 hit,13 KO,14 getup. Explicit16-index bijections select actual physical poses for correct actions, with no missing native figures, mirroring or pixel rewrite. All scenes preserve red beret/scarf, two attached holsters, bullet bandolier and natural young final-remake face.
- [Official Konami final Delta full-body released-model render physically reviewed; actual campaign cutscene used as color/equipment complement](https://www.konami.com/mg/mgs3r/s/img/characters/ocelot.png) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## roster51__volgin_delta

### VOLGIN — DELTA — MGS DELTA

**Rôle :** Électricité corporelle et munitions. **Profil :** `volgin`.

**Base présente dans le code :** Incarnation Delta de Volgin : charges électriques et pression lourde avec fenêtres punissables.

**Incarnation à conserver :** Final2025 Delta official clothed double-breasted coat, red-brown boots and bullet gloves

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `deploy` = special, specialDown, specialForward, super.

**Techniques pointant sur une seule région native dans la direction principale :** special, specialDown, specialForward, specialBack, super, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** VOLGIN — DELTA : masse de Volgin, armé du poing et électricité distincte du corps. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas puissants, hanches porteuses et arrêts pesants. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Électricité corporelle et munitions » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder masse de Volgin, armé du poing et électricité distincte du corps.
- **jump_land :** VOLGIN — DELTA : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas puissants, hanches porteuses et arrêts pesants. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de VOLGIN — DELTA. Terminer par dissipation de charge et relâchement des épaules. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS DELTA », présentation de Final2025 Delta official clothed double-breasted coat, red-brown boots and bullet gloves, puis masse de Volgin, armé du poing et électricité distincte du corps. Geste court lié à « Décharge corporelle — Delta » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, dissipation de charge et relâchement des épaules ; VOLGIN — DELTA vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS DELTA.
- **round_loss :** Proposition CQC : VOLGIN — DELTA réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Thunderbolt — Delta », revenir par dissipation de charge et relâchement des épaules, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VOLGIN — DELTA, préparer « Jab » ; masse de Volgin, armé du poing et électricité distincte du corps. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** dissipation de charge et relâchement des épaules.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VOLGIN — DELTA, préparer « Frappe engagée » ; masse de Volgin, armé du poing et électricité distincte du corps. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** dissipation de charge et relâchement des épaules.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VOLGIN — DELTA, préparer « Balayage » ; masse de Volgin, armé du poing et électricité distincte du corps. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** dissipation de charge et relâchement des épaules.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VOLGIN — DELTA, préparer « Projection » ; masse de Volgin, armé du poing et électricité distincte du corps. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** dissipation de charge et relâchement des épaules. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Décharge corporelle — Delta

**Existant :** `projectile` / `electric` ; 25/1/34 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VOLGIN — DELTA, préparer « Décharge corporelle — Delta » ; masse de Volgin, armé du poing et électricité distincte du corps. Donner à la source de « Décharge corporelle — Delta » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet electric de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet.

**Retour.** dissipation de charge et relâchement des épaules. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde ; l’EMP ouvre les défenses des machines sans les désactiver définitivement.

##### specialDown — Enveloppe électrique — Delta

**Existant :** `buff` / `armor` ; 22/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VOLGIN — DELTA, préparer « Enveloppe électrique — Delta » ; masse de Volgin, armé du poing et électricité distincte du corps. Montrer la préparation corporelle ou mécanique de « Enveloppe électrique — Delta ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** dissipation de charge et relâchement des épaules. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Absorbe une seule frappe ; projections, EMP et attaques brise-armure la contrent.

##### specialForward — Munitions électrifiées — Delta

**Existant :** `projectile` / `electric` ; 14/1/22 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VOLGIN — DELTA, préparer « Munitions électrifiées — Delta » ; masse de Volgin, armé du poing et électricité distincte du corps. Donner à la source de « Munitions électrifiées — Delta » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet electric de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet.

**Retour.** dissipation de charge et relâchement des épaules. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialBack — Poing chargé — Delta

**Existant :** `parry` / `electric` ; 3/10/29 ticks ; groupe `parry`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VOLGIN — DELTA, préparer « Poing chargé — Delta » ; masse de Volgin, armé du poing et électricité distincte du corps. Présenter la surface ou l’organe de parade et maintenir une fenêtre courte lisible.

**Action.** Recevoir puis dévier au contact réel pour « Poing chargé — Delta » ; la riposte et son effet n’apparaissent qu’après succès. Une attente sans contact garde une pose différente du contre réussi.

**Retour.** dissipation de charge et relâchement des épaules. Séparer sortie ratée, blocage simple et riposte ; aucun effet de réussite avant collision.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Retarder la frappe, projeter ou attendre les 29 images de récupération.

##### super — Thunderbolt — Delta

**Existant :** `projectile` / `electric` ; 55/1/50 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VOLGIN — DELTA, préparer « Thunderbolt — Delta » ; masse de Volgin, armé du poing et électricité distincte du corps. Donner à la source de « Thunderbolt — Delta » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet electric de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet.

**Retour.** dissipation de charge et relâchement des épaules. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Préparation longue et trait de visée ; accroupissement ou esquive latérale.

##### utility — Stabiliser la réserve

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VOLGIN — DELTA, préparer « Stabiliser la réserve » ; masse de Volgin, armé du poing et électricité distincte du corps. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Stabiliser la réserve ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** dissipation de charge et relâchement des épaules. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Thunderbolt — Delta

Famille `electric`, ton `stylized` ; 220 ticks CQC ; phases actuelles : charge → arc → overload → shutdown. Appuis déclarés : Thunderbolt — Delta / Décharge corporelle — Delta.

Plan 1 : VOLGIN — DELTA sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Thunderbolt — Delta / Décharge corporelle — Delta ». Plan 2 : montrer la source corporelle ou matérielle de « Thunderbolt — Delta / Décharge corporelle — Delta ». Plan 3 : développer l’effet electric en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : dissipation de charge et relâchement des épaules, pose de signature face à l’adversaire.

##### One Hundred Billion Volts — Delta

Famille `electric`, ton `stylized` ; 238 ticks CQC ; phases actuelles : charge → arc → overload → shutdown. Appuis déclarés : Thunderbolt — Delta / Enveloppe électrique — Delta.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Thunderbolt — Delta / Enveloppe électrique — Delta » ; l’espace disponible doit être lisible. Plan 2 : montrer la source corporelle ou matérielle de « Thunderbolt — Delta / Enveloppe électrique — Delta ». Plan 3 : développer l’effet electric en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : dissipation de charge et relâchement des épaules, arrêt du dispositif et retour au cadre d’ensemble.

##### Electric CQC — Delta

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Thunderbolt — Delta / Munitions électrifiées — Delta.

Plan 1 : approche jusqu’à la distance réelle de « Thunderbolt — Delta / Munitions électrifiées — Delta », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Thunderbolt — Delta / Munitions électrifiées — Delta », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : dissipation de charge et relâchement des épaules, prise de distance et maintien final.

##### Groznyj Ground — Delta

Famille `electric`, ton `stylized` ; 274 ticks CQC ; phases actuelles : charge → arc → overload → shutdown. Appuis déclarés : Thunderbolt — Delta / Poing chargé — Delta.

Plan 1 : après une observation ou un repli, VOLGIN — DELTA reprend l’initiative par « Thunderbolt — Delta / Poing chargé — Delta ». Plan 2 : montrer la source corporelle ou matérielle de « Thunderbolt — Delta / Poing chargé — Delta ». Plan 3 : développer l’effet electric en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : dissipation de charge et relâchement des épaules, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Clothed official coat form remains distinct from shirtless charged boss appearance. Red-brown polished boots and bullet-fitted red gloves follow the official model; native compact CQC motions authored. Electric charge is a separate runtime effect, not baked or a different invented costume.
- [Official Konami final Delta full-body released model physically reviewed; campaign final cutscene complements scarred face and coat colors](https://www.konami.com/mg/mgs3r/s/img/characters/volgin.png) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## roster51__pain_delta

### THE PAIN — DELTA — MGS DELTA

**Rôle :** Essaim, écran et piqûres. **Profil :** `pain`.

**Base présente dans le code :** Incarnation Delta de The Pain : essaims, grenades et écran de frelons limité.

**Incarnation à conserver :** Final2025 Delta gray perforated mesh mask/suit and mustard gray padded vest

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `deploy` = special, specialDown, specialForward, super.

**Techniques pointant sur une seule région native dans la direction principale :** special, specialDown, specialForward, specialBack, super, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** THE PAIN — DELTA : attitude de The Pain ; essaim distinct de la silhouette. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** appuis humains, abeilles en trajectoires séparées. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Essaim, écran et piqûres » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder attitude de The Pain ; essaim distinct de la silhouette.
- **jump_land :** THE PAIN — DELTA : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. appuis humains, abeilles en trajectoires séparées. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de THE PAIN — DELTA. Terminer par dissipation ou regroupement de l’essaim après l’événement. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS DELTA », présentation de Final2025 Delta gray perforated mesh mask/suit and mustard gray padded vest, puis attitude de The Pain ; essaim distinct de la silhouette. Geste court lié à « Essaim de frelons — Delta » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, dissipation ou regroupement de l’essaim après l’événement ; THE PAIN — DELTA vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS DELTA.
- **round_loss :** Proposition CQC : THE PAIN — DELTA réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Nuée de The Pain — Delta », revenir par dissipation ou regroupement de l’essaim après l’événement, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE PAIN — DELTA, préparer « Jab » ; attitude de The Pain ; essaim distinct de la silhouette. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** dissipation ou regroupement de l’essaim après l’événement.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE PAIN — DELTA, préparer « Frappe engagée » ; attitude de The Pain ; essaim distinct de la silhouette. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** dissipation ou regroupement de l’essaim après l’événement.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE PAIN — DELTA, préparer « Balayage » ; attitude de The Pain ; essaim distinct de la silhouette. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** dissipation ou regroupement de l’essaim après l’événement.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE PAIN — DELTA, préparer « Projection » ; attitude de The Pain ; essaim distinct de la silhouette. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** dissipation ou regroupement de l’essaim après l’événement. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Essaim de frelons — Delta

**Existant :** `projectile` / `swarm` ; 30/1/35 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE PAIN — DELTA, préparer « Essaim de frelons — Delta » ; attitude de The Pain ; essaim distinct de la silhouette. Donner à la source de « Essaim de frelons — Delta » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet swarm de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet. La salve contient 4 émissions, espacées de 8 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** dissipation ou regroupement de l’essaim après l’événement. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 4 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### specialDown — Écran de frelons — Delta

**Existant :** `buff` / `shield` ; 18/1/27 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE PAIN — DELTA, préparer « Écran de frelons — Delta » ; attitude de The Pain ; essaim distinct de la silhouette. Montrer la préparation corporelle ou mécanique de « Écran de frelons — Delta ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** dissipation ou regroupement de l’essaim après l’événement. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Deux projectiles frontaux maximum ; le corps à corps et les saisies restent efficaces.

##### specialForward — Bullet Bee — Delta

**Existant :** `projectile` / `swarm` ; 25/1/35 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE PAIN — DELTA, préparer « Bullet Bee — Delta » ; attitude de The Pain ; essaim distinct de la silhouette. Donner à la source de « Bullet Bee — Delta » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet swarm de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet.

**Retour.** dissipation ou regroupement de l’essaim après l’événement. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Se baisser, bloquer ou détruire le carreau ; poison non létal à lui seul et non empilable.

##### specialBack — Repli de l’essaim — Delta

**Existant :** `mobility` / `movement` ; 16/20/26 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE PAIN — DELTA, préparer « Repli de l’essaim — Delta » ; attitude de The Pain ; essaim distinct de la silhouette. Préparer l’appui qui produit le déplacement ; appuis humains, abeilles en trajectoires séparées.

**Action.** Exécuter « Repli de l’essaim — Delta » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -2 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** dissipation ou regroupement de l’essaim après l’événement. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Vulnérable aux anti-aériens ; envol borné, pas de vol infini.

##### super — Nuée de The Pain — Delta

**Existant :** `projectile` / `swarm` ; 35/1/44 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE PAIN — DELTA, préparer « Nuée de The Pain — Delta » ; attitude de The Pain ; essaim distinct de la silhouette. Donner à la source de « Nuée de The Pain — Delta » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet swarm de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** dissipation ou regroupement de l’essaim après l’événement. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Stabiliser la réserve

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE PAIN — DELTA, préparer « Stabiliser la réserve » ; attitude de The Pain ; essaim distinct de la silhouette. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Stabiliser la réserve ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** dissipation ou regroupement de l’essaim après l’événement. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Hornet Tomb — Delta

Famille `psychic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : lift → orbit → crush → drop. Appuis déclarés : Nuée de The Pain — Delta / Essaim de frelons — Delta.

Plan 1 : THE PAIN — DELTA sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Nuée de The Pain — Delta / Essaim de frelons — Delta ». Plan 2 : montrer la source corporelle ou matérielle de « Nuée de The Pain — Delta / Essaim de frelons — Delta ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : dissipation ou regroupement de l’essaim après l’événement, pose de signature face à l’adversaire.

##### Tommy Gun Swarm — Delta

Famille `psychic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : lift → orbit → crush → drop. Appuis déclarés : Nuée de The Pain — Delta / Écran de frelons — Delta.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Nuée de The Pain — Delta / Écran de frelons — Delta » ; l’espace disponible doit être lisible. Plan 2 : montrer la source corporelle ou matérielle de « Nuée de The Pain — Delta / Écran de frelons — Delta ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : dissipation ou regroupement de l’essaim après l’événement, arrêt du dispositif et retour au cadre d’ensemble.

##### Bullet Bee — Delta

Famille `psychic`, ton `stylized` ; 256 ticks CQC ; phases actuelles : lift → orbit → crush → drop. Appuis déclarés : Nuée de The Pain — Delta / Bullet Bee — Delta.

Plan 1 : approche jusqu’à la distance réelle de « Nuée de The Pain — Delta / Bullet Bee — Delta », arme et main libre identifiées. Plan 2 : montrer la source corporelle ou matérielle de « Nuée de The Pain — Delta / Bullet Bee — Delta ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : dissipation ou regroupement de l’essaim après l’événement, prise de distance et maintien final.

##### The Pain Endures — Delta

Famille `psychic`, ton `stylized` ; 274 ticks CQC ; phases actuelles : lift → orbit → crush → drop. Appuis déclarés : Nuée de The Pain — Delta / Repli de l’essaim — Delta.

Plan 1 : après une observation ou un repli, THE PAIN — DELTA reprend l’initiative par « Nuée de The Pain — Delta / Repli de l’essaim — Delta ». Plan 2 : montrer la source corporelle ou matérielle de « Nuée de The Pain — Delta / Repli de l’essaim — Delta ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : dissipation ou regroupement de l’essaim après l’événement, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Bees and swarms are separate runtime visual families; native body atlases deliberately contain no floating bee instances or effects. Backpack/bag stays attached to left waist across independent directions. Emptyhand CQC gestures are authored adaptations; no firearm invented.
- [Official Konami final Delta full-body model physically reviewed, mesh mask and suit, padded yellow-gray camouflage vest and grenade loops verified](https://www.konami.com/mg/mgs3r/s/img/characters/pain.png) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## roster51__fear_delta

### THE FEAR — DELTA — MGS DELTA

**Rôle :** Arbalète, piège et camouflage. **Profil :** `fear`.

**Base présente dans le code :** Incarnation Delta de The Fear : carreaux, pièges et camouflage interrompu par les attaques.

**Incarnation à conserver :** Final2025 Delta woodland fatigues and canonical dark-metal crossbow appearance

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `deploy` = special, specialDown, super.

**Techniques pointant sur une seule région native dans la direction principale :** special, specialDown, specialBack, super, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** THE FEAR — DELTA : posture contorsionnée de The Fear et arbalète identifiable. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** appuis écartés et bond sans allonger les membres. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Arbalète, piège et camouflage » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder posture contorsionnée de The Fear et arbalète identifiable.
- **jump_land :** THE FEAR — DELTA : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. appuis écartés et bond sans allonger les membres. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de THE FEAR — DELTA. Terminer par réception basse, reprise d’arbalète et stabilisation. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS DELTA », présentation de Final2025 Delta woodland fatigues and canonical dark-metal crossbow appearance, puis posture contorsionnée de The Fear et arbalète identifiable. Geste court lié à « Little Joe — carreau — Delta » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, réception basse, reprise d’arbalète et stabilisation ; THE FEAR — DELTA vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS DELTA.
- **round_loss :** Proposition CQC : THE FEAR — DELTA réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « William Tell — salve — Delta », revenir par réception basse, reprise d’arbalète et stabilisation, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE FEAR — DELTA, préparer « Jab » ; posture contorsionnée de The Fear et arbalète identifiable. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** réception basse, reprise d’arbalète et stabilisation.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE FEAR — DELTA, préparer « Frappe engagée » ; posture contorsionnée de The Fear et arbalète identifiable. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** réception basse, reprise d’arbalète et stabilisation.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE FEAR — DELTA, préparer « Balayage » ; posture contorsionnée de The Fear et arbalète identifiable. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** réception basse, reprise d’arbalète et stabilisation.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE FEAR — DELTA, préparer « Projection » ; posture contorsionnée de The Fear et arbalète identifiable. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** réception basse, reprise d’arbalète et stabilisation. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Little Joe — carreau — Delta

**Existant :** `projectile` / `bolt` ; 25/1/35 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE FEAR — DELTA, préparer « Little Joe — carreau — Delta » ; posture contorsionnée de The Fear et arbalète identifiable. Montrer la prise et la visée de l’arme décrite par « Little Joe — carreau — Delta » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** réception basse, reprise d’arbalète et stabilisation. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Se baisser, bloquer ou détruire le carreau ; poison non létal à lui seul et non empilable.

##### specialDown — Piège de chasse — Delta

**Existant :** `trap` / `snare` ; 30/1/36 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE FEAR — DELTA, préparer « Piège de chasse — Delta » ; posture contorsionnée de The Fear et arbalète identifiable. Prendre le dispositif, s’abaisser vers le support et indiquer le lieu de pose avant activation.

**Action.** Poser « Piège de chasse — Delta » au point réel de main/outil, armer puis retirer le membre. Le dispositif possède ensuite son propre sprite, ses états attente/armement/déclenchement/destruction et sa collision.

**Retour.** réception basse, reprise d’arbalète et stabilisation. Se dégager de l’objet sans le téléporter ; l’interruption avant armement a sa propre sortie.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pose et amorçage visibles ; sauter ou détruire la mine par une attaque. Deux maximum.

##### specialForward — Bond arachnéen — Delta

**Existant :** `mobility` / `movement` ; 16/20/26 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE FEAR — DELTA, préparer « Bond arachnéen — Delta » ; posture contorsionnée de The Fear et arbalète identifiable. Préparer l’appui qui produit le déplacement ; appuis écartés et bond sans allonger les membres.

**Action.** Exécuter « Bond arachnéen — Delta » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -2 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** réception basse, reprise d’arbalète et stabilisation. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Vulnérable aux anti-aériens ; envol borné, pas de vol infini.

##### specialBack — Stealth camo — Delta

**Existant :** `buff` / `stealth` ; 19/1/27 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE FEAR — DELTA, préparer « Stealth camo — Delta » ; posture contorsionnée de The Fear et arbalète identifiable. Montrer la préparation corporelle ou mécanique de « Stealth camo — Delta ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** réception basse, reprise d’arbalète et stabilisation. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Silhouette translucide, collision intacte ; une attaque ou un impact brise le camouflage.

##### super — William Tell — salve — Delta

**Existant :** `projectile` / `bolt` ; 35/1/44 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE FEAR — DELTA, préparer « William Tell — salve — Delta » ; posture contorsionnée de The Fear et arbalète identifiable. Montrer la prise et la visée de l’arme décrite par « William Tell — salve — Delta » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 4 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** réception basse, reprise d’arbalète et stabilisation. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 4 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Reprendre son souffle

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE FEAR — DELTA, préparer « Reprendre son souffle » ; posture contorsionnée de The Fear et arbalète identifiable. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Reprendre son souffle ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** réception basse, reprise d’arbalète et stabilisation. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Poisoned Bolt — Delta

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : William Tell — salve — Delta / Little Joe — carreau — Delta.

Plan 1 : THE FEAR — DELTA sécurise son appui, regarde la cible et prépare l’outil ou le geste de « William Tell — salve — Delta / Little Joe — carreau — Delta ». Plan 2 : présenter l’arme effectivement associée à « William Tell — salve — Delta / Little Joe — carreau — Delta », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : réception basse, reprise d’arbalète et stabilisation, pose de signature face à l’adversaire.

##### Tree Trap — Delta

Famille `ballistic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : William Tell — salve — Delta / Piège de chasse — Delta.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « William Tell — salve — Delta / Piège de chasse — Delta » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « William Tell — salve — Delta / Piège de chasse — Delta », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : réception basse, reprise d’arbalète et stabilisation, arrêt du dispositif et retour au cadre d’ensemble.

##### Spider Camouflage — Delta

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : William Tell — salve — Delta / Bond arachnéen — Delta.

Plan 1 : approche jusqu’à la distance réelle de « William Tell — salve — Delta / Bond arachnéen — Delta », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « William Tell — salve — Delta / Bond arachnéen — Delta », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : réception basse, reprise d’arbalète et stabilisation, prise de distance et maintien final.

##### The Fear Hunts — Delta

Famille `trap`, ton `stylized` ; 274 ticks CQC ; phases actuelles : bait → arm → trigger → secure. Appuis déclarés : William Tell — salve — Delta / Stealth camo — Delta.

Plan 1 : après une observation ou un repli, THE FEAR — DELTA reprend l’initiative par « William Tell — salve — Delta / Stealth camo — Delta ». Plan 2 : montrer la pose/trajectoire et le délai de « William Tell — salve — Delta / Stealth camo — Delta ». Plan 3 : déclencher au véritable point de dispositif ; poussière, débris et réaction de cible restent indépendants du corps de l’attaquant. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : réception basse, reprise d’arbalète et stabilisation, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- ActionStyle gun selects the existing ranged aiming pose group; visible weapon is a CROSSBOW, so visualFirearmPresent stays false and firearm muzzle-flash must not be added. Carrying weapon near back during authored CQC transitions is a combat adaptation; native whole crossbow aiming sources remain physically present. Optical camouflage and poison bolts use separate runtime effects.
- [Official Konami final Delta full-body released model physically reviewed, dark diagonal chest quiver/case, long straps, right waist pouch and carried crossbow](https://www.konami.com/mg/mgs3r/s/img/characters/fear.png) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## roster51__end_delta

### THE END — DELTA — MGS DELTA

**Rôle :** Mosin, pistage et repos. **Profil :** `end`.

**Base présente dans le code :** Incarnation Delta de The End : visée longue, repositionnement et camouflage de forêt.

**Incarnation à conserver :** Final2025 Delta green leaf ghillie suit, Mosin PU rifle and left shoulder parrot

**État vérifié :** métadonnées natives avec limites. 29 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `shoot` = special, specialForward ; `deploy` = specialDown, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, super, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** THE END — DELTA : posture âgée de The End, carabine, équipement et respiration observables. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** déplacement à l’échelle du corps, canon sécurisé. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Mosin, pistage et repos » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder posture âgée de The End, carabine, équipement et respiration observables.
- **jump_land :** THE END — DELTA : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. déplacement à l’échelle du corps, canon sécurisé. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de THE END — DELTA. Terminer par reprise de souffle et visée ; pas de souplesse de ninja générique. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS DELTA », présentation de Final2025 Delta green leaf ghillie suit, Mosin PU rifle and left shoulder parrot, puis posture âgée de The End, carabine, équipement et respiration observables. Geste court lié à « Mosin-Nagant tranquillisant — Delta » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, reprise de souffle et visée ; pas de souplesse de ninja générique ; THE END — DELTA vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS DELTA.
- **round_loss :** Proposition CQC : THE END — DELTA réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Dernier souffle — Delta », revenir par reprise de souffle et visée ; pas de souplesse de ninja générique, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE END — DELTA, préparer « Jab » ; posture âgée de The End, carabine, équipement et respiration observables. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** reprise de souffle et visée ; pas de souplesse de ninja générique.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE END — DELTA, préparer « Frappe engagée » ; posture âgée de The End, carabine, équipement et respiration observables. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** reprise de souffle et visée ; pas de souplesse de ninja générique.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE END — DELTA, préparer « Balayage » ; posture âgée de The End, carabine, équipement et respiration observables. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** reprise de souffle et visée ; pas de souplesse de ninja générique.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE END — DELTA, préparer « Projection » ; posture âgée de The End, carabine, équipement et respiration observables. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** reprise de souffle et visée ; pas de souplesse de ninja générique. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Mosin-Nagant tranquillisant — Delta

**Existant :** `projectile` / `precision` ; 46/1/47 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE END — DELTA, préparer « Mosin-Nagant tranquillisant — Delta » ; posture âgée de The End, carabine, équipement et respiration observables. Montrer la prise et la visée de l’arme décrite par « Mosin-Nagant tranquillisant — Delta » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** reprise de souffle et visée ; pas de souplesse de ninja générique. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Laser et armement visibles ; accroupissement ou approche pendant 46 images avant le tir.

##### specialDown — L’œil de Sokrovenno — Delta

**Existant :** `mark` / `recon` ; 26/1/30 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE END — DELTA, préparer « L’œil de Sokrovenno — Delta » ; posture âgée de The End, carabine, équipement et respiration observables. Orienter regard, optique ou terminal vers la cible observée, sans consulter une action future.

**Action.** Pour « L’œil de Sokrovenno — Delta », déclencher lecture/repérage avec un petit geste ou changement d’optique et un indicateur séparé. Le corps doit rester visible et vulnérable selon les données de combat.

**Retour.** reprise de souffle et visée ; pas de souplesse de ninja générique. Couper le signal ou abaisser l’outil ; retour vers l’adversaire sans nouvelle arme inventée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Portée limitée ; le marquage ne vise ni à travers toute l’arène ni automatiquement.

##### specialForward — Camouflage végétal — Delta

**Existant :** `buff` / `stealth` ; 19/1/27 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE END — DELTA, préparer « Camouflage végétal — Delta » ; posture âgée de The End, carabine, équipement et respiration observables. Montrer la préparation corporelle ou mécanique de « Camouflage végétal — Delta ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** reprise de souffle et visée ; pas de souplesse de ninja générique. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Silhouette translucide, collision intacte ; une attaque ou un impact brise le camouflage.

##### specialBack — Repos photosynthétique — Delta

**Existant :** `heal` / `recovery` ; 45/1/38 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE END — DELTA, préparer « Repos photosynthétique — Delta » ; posture âgée de The End, carabine, équipement et respiration observables. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Repos photosynthétique — Delta ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** reprise de souffle et visée ; pas de souplesse de ninja générique. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Ne restaure que les dégâts récupérables ; interrompre les 45 images de préparation.

##### super — Dernier souffle — Delta

**Existant :** `projectile` / `rail` ; 55/1/50 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE END — DELTA, préparer « Dernier souffle — Delta » ; posture âgée de The End, carabine, équipement et respiration observables. Montrer la prise et la visée de l’arme décrite par « Dernier souffle — Delta » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** reprise de souffle et visée ; pas de souplesse de ninja générique. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Préparation longue et trait de visée ; accroupissement ou esquive latérale.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE END — DELTA, préparer « Recharger » ; posture âgée de The End, carabine, équipement et respiration observables. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** reprise de souffle et visée ; pas de souplesse de ninja générique. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### One Last Breath — Delta

Famille `sniper`, ton `stylized` ; 220 ticks CQC ; phases actuelles : mark → steady → shot → fade. Appuis déclarés : Dernier souffle — Delta / Mosin-Nagant tranquillisant — Delta.

Plan 1 : THE END — DELTA sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Dernier souffle — Delta / Mosin-Nagant tranquillisant — Delta ». Plan 2 : présenter l’arme effectivement associée à « Dernier souffle — Delta / Mosin-Nagant tranquillisant — Delta », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : reprise de souffle et visée ; pas de souplesse de ninja générique, pose de signature face à l’adversaire.

##### Mosin-Nagant — Delta

Famille `sniper`, ton `stylized` ; 238 ticks CQC ; phases actuelles : mark → steady → shot → fade. Appuis déclarés : Dernier souffle — Delta / L’œil de Sokrovenno — Delta.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Dernier souffle — Delta / L’œil de Sokrovenno — Delta » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Dernier souffle — Delta / L’œil de Sokrovenno — Delta », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : reprise de souffle et visée ; pas de souplesse de ninja générique, arrêt du dispositif et retour au cadre d’ensemble.

##### Photosynthetic Silence — Delta

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Dernier souffle — Delta / Camouflage végétal — Delta.

Plan 1 : approche jusqu’à la distance réelle de « Dernier souffle — Delta / Camouflage végétal — Delta », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Dernier souffle — Delta / Camouflage végétal — Delta », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : reprise de souffle et visée ; pas de souplesse de ninja générique, prise de distance et maintien final.

##### The End — Delta

Famille `sniper`, ton `stylized` ; 274 ticks CQC ; phases actuelles : mark → steady → shot → fade. Appuis déclarés : Dernier souffle — Delta / Repos photosynthétique — Delta.

Plan 1 : après une observation ou un repli, THE END — DELTA reprend l’initiative par « Dernier souffle — Delta / Repos photosynthétique — Delta ». Plan 2 : présenter l’arme effectivement associée à « Dernier souffle — Delta / Repos photosynthétique — Delta », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : reprise de souffle et visée ; pas de souplesse de ninja générique, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Right native source physical6 is the authentic sniper aim, physical8 is emptyhand compact reach: explicit source-action overrides select actual visible poses without reordering or rewriting any PNG. Independent left source aim is physical11 as requested. Green parrot is simplified as a perched shoulder accessory in all poses, not yet independent flight/destruction articulation; source remains anatomically left. All CQC gestures are authored adaptation, not canonical sniper moves.
- [Official Konami released Delta full-body model physically reviewed, wood Mosin rifle/PU scope, bare hands, canvas pouches and green left-shoulder parrot](https://www.konami.com/mg/mgs3r/s/img/characters/end.png) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## roster51__fury_delta

### THE FURY — DELTA — MGS DELTA

**Rôle :** Lance-flammes et propulseur. **Profil :** `fury`.

**Base présente dans le code :** Incarnation Delta de The Fury : lance-flammes, chaleur et déplacement propulsé.

**Incarnation à conserver :** Final2025 Delta black Soviet cosmonaut suit, gas tanks and flame projector

**État vérifié :** métadonnées natives avec limites. 28 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `shoot` = special, specialForward, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** THE FURY — DELTA : combinaison, visière, lance-flammes et propulseur de The Fury. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas lourds ; impulsion de propulseur distincte d’un vol permanent. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Lance-flammes et propulseur » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder combinaison, visière, lance-flammes et propulseur de The Fury.
- **jump_land :** THE FURY — DELTA : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas lourds ; impulsion de propulseur distincte d’un vol permanent. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de THE FURY — DELTA. Terminer par extinction de poussée, poids absorbé puis remise en visée. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS DELTA », présentation de Final2025 Delta black Soviet cosmonaut suit, gas tanks and flame projector, puis combinaison, visière, lance-flammes et propulseur de The Fury. Geste court lié à « Jet de flammes — Delta » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, extinction de poussée, poids absorbé puis remise en visée ; THE FURY — DELTA vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS DELTA.
- **round_loss :** Proposition CQC : THE FURY — DELTA réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « L’enfer de The Fury — Delta », revenir par extinction de poussée, poids absorbé puis remise en visée, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE FURY — DELTA, préparer « Jab » ; combinaison, visière, lance-flammes et propulseur de The Fury. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** extinction de poussée, poids absorbé puis remise en visée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE FURY — DELTA, préparer « Frappe engagée » ; combinaison, visière, lance-flammes et propulseur de The Fury. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** extinction de poussée, poids absorbé puis remise en visée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE FURY — DELTA, préparer « Balayage » ; combinaison, visière, lance-flammes et propulseur de The Fury. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** extinction de poussée, poids absorbé puis remise en visée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE FURY — DELTA, préparer « Projection » ; combinaison, visière, lance-flammes et propulseur de The Fury. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** extinction de poussée, poids absorbé puis remise en visée. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Jet de flammes — Delta

**Existant :** `projectile` / `fire` ; 24/1/33 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE FURY — DELTA, préparer « Jet de flammes — Delta » ; combinaison, visière, lance-flammes et propulseur de The Fury. Montrer la prise et la visée de l’arme décrite par « Jet de flammes — Delta » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 3 émissions, espacées de 7 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** extinction de poussée, poids absorbé puis remise en visée. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 3 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### specialDown — Nappe incendiaire — Delta

**Existant :** `trap` / `fire` ; 33/1/35 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE FURY — DELTA, préparer « Nappe incendiaire — Delta » ; combinaison, visière, lance-flammes et propulseur de The Fury. Prendre le dispositif, s’abaisser vers le support et indiquer le lieu de pose avant activation.

**Action.** Poser « Nappe incendiaire — Delta » au point réel de main/outil, armer puis retirer le membre. Le dispositif possède ensuite son propre sprite, ses états attente/armement/déclenchement/destruction et sa collision.

**Retour.** extinction de poussée, poids absorbé puis remise en visée. Se dégager de l’objet sans le téléporter ; l’interruption avant armement a sa propre sortie.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Zone annoncée puis persistante ; sauter, contourner ou neutraliser le dispositif.

##### specialForward — Rocket booster — Delta

**Existant :** `mobility` / `movement` ; 16/20/26 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE FURY — DELTA, préparer « Rocket booster — Delta » ; combinaison, visière, lance-flammes et propulseur de The Fury. Préparer l’appui qui produit le déplacement ; pas lourds ; impulsion de propulseur distincte d’un vol permanent.

**Action.** Exécuter « Rocket booster — Delta » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -2 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** extinction de poussée, poids absorbé puis remise en visée. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Vulnérable aux anti-aériens ; envol borné, pas de vol infini.

##### specialBack — Combinaison thermique — Delta

**Existant :** `buff` / `armor` ; 22/1/31 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE FURY — DELTA, préparer « Combinaison thermique — Delta » ; combinaison, visière, lance-flammes et propulseur de The Fury. Montrer la préparation corporelle ou mécanique de « Combinaison thermique — Delta ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** extinction de poussée, poids absorbé puis remise en visée. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Absorbe une seule frappe ; projections, EMP et attaques brise-armure la contrent.

##### super — L’enfer de The Fury — Delta

**Existant :** `projectile` / `fire` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE FURY — DELTA, préparer « L’enfer de The Fury — Delta » ; combinaison, visière, lance-flammes et propulseur de The Fury. Montrer la prise et la visée de l’arme décrite par « L’enfer de The Fury — Delta » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 5 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** extinction de poussée, poids absorbé puis remise en visée. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 5 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Refroidir

**Existant :** `recover` / `recovery` ; 45/1/25 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE FURY — DELTA, préparer « Refroidir » ; combinaison, visière, lance-flammes et propulseur de The Fury. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Refroidir ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** extinction de poussée, poids absorbé puis remise en visée. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Refroidissement ou pause tactique interrompable ; aucun soin gratuit.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Cosmonaut Inferno — Delta

Famille `fire`, ton `stylized` ; 220 ticks CQC ; phases actuelles : ignite → sweep → inferno → embers. Appuis déclarés : L’enfer de The Fury — Delta / Jet de flammes — Delta.

Plan 1 : THE FURY — DELTA sécurise son appui, regarde la cible et prépare l’outil ou le geste de « L’enfer de The Fury — Delta / Jet de flammes — Delta ». Plan 2 : montrer la source corporelle ou matérielle de « L’enfer de The Fury — Delta / Jet de flammes — Delta ». Plan 3 : développer l’effet fire en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : extinction de poussée, poids absorbé puis remise en visée, pose de signature face à l’adversaire.

##### Jetpack Burn — Delta

Famille `fire`, ton `stylized` ; 238 ticks CQC ; phases actuelles : ignite → sweep → inferno → embers. Appuis déclarés : L’enfer de The Fury — Delta / Nappe incendiaire — Delta.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « L’enfer de The Fury — Delta / Nappe incendiaire — Delta » ; l’espace disponible doit être lisible. Plan 2 : montrer la source corporelle ou matérielle de « L’enfer de The Fury — Delta / Nappe incendiaire — Delta ». Plan 3 : développer l’effet fire en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : extinction de poussée, poids absorbé puis remise en visée, arrêt du dispositif et retour au cadre d’ensemble.

##### Tunnel Cremation — Delta

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : L’enfer de The Fury — Delta / Rocket booster — Delta.

Plan 1 : approche jusqu’à la distance réelle de « L’enfer de The Fury — Delta / Rocket booster — Delta », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « L’enfer de The Fury — Delta / Rocket booster — Delta », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : extinction de poussée, poids absorbé puis remise en visée, prise de distance et maintien final.

##### The Fury Falls — Delta

Famille `fire`, ton `stylized` ; 274 ticks CQC ; phases actuelles : ignite → sweep → inferno → embers. Appuis déclarés : L’enfer de The Fury — Delta / Combinaison thermique — Delta.

Plan 1 : après une observation ou un repli, THE FURY — DELTA reprend l’initiative par « L’enfer de The Fury — Delta / Combinaison thermique — Delta ». Plan 2 : montrer la source corporelle ou matérielle de « L’enfer de The Fury — Delta / Combinaison thermique — Delta ». Plan 3 : développer l’effet fire en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : extinction de poussée, poids absorbé puis remise en visée, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Both sources contain actual held flame-projector aim in physical6, with physical8 emptyhand reach; explicit action-source overrides select those poses without pixel changes. This visible held emitter is a flamethrower: runtime emissions must use flame effect, not a generic ballistic rifle muzzle flash. Native atlases contain no baked flames or smoke. Gas tanks and hoses remain attached to body; separate fuel-tank destruction articulation is not claimed by this fighter atlas. Small helmet inscriptions and occluded rear details are interpretations of visible official model.
- [Official Konami final Delta full-body released model physically reviewed, black thermal suit, round visor, gas tanks, hoses and connected flame projector](https://www.konami.com/mg/mgs3r/s/img/characters/fury.png) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## roster51__sorrow_delta

### THE SORROW — DELTA — MGS DELTA

**Rôle :** Télékinésie bornée et mobilité. **Profil :** `psychic`.

**Base présente dans le code :** Incarnation Delta de The Sorrow : médium spectral et contrôle de zone lisible.

**Incarnation à conserver :** Final2025 Delta physical model, ribbed turtleneck and left chest holster

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `deploy` = special, specialDown, super.

**Techniques pointant sur une seule région native dans la direction principale :** special, specialDown, specialBack, super, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** THE SORROW — DELTA : regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** mouvement et éventuelle sustentation distingués de l’effet psychique. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Télékinésie bornée et mobilité » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile.
- **jump_land :** THE SORROW — DELTA : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. mouvement et éventuelle sustentation distingués de l’effet psychique. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de THE SORROW — DELTA. Terminer par cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS DELTA », présentation de Final2025 Delta physical model, ribbed turtleneck and left chest holster, puis regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Geste court lié à « Débris télékinétiques — Sorrow — Delta » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, cesser le geste de concentration puis revenir à la posture propre à l’incarnation ; THE SORROW — DELTA vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS DELTA.
- **round_loss :** Proposition CQC : THE SORROW — DELTA réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Psychokinésie — Sorrow — Delta », revenir par cesser le geste de concentration puis revenir à la posture propre à l’incarnation, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE SORROW — DELTA, préparer « Jab » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE SORROW — DELTA, préparer « Frappe engagée » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE SORROW — DELTA, préparer « Balayage » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE SORROW — DELTA, préparer « Projection » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Débris télékinétiques — Sorrow — Delta

**Existant :** `projectile` / `psychic` ; 27/1/30 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE SORROW — DELTA, préparer « Débris télékinétiques — Sorrow — Delta » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Donner à la source de « Débris télékinétiques — Sorrow — Delta » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet psychic de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Projectile lent et visible : sauter, bloquer ou détruire avec une attaque.

##### specialDown — Entrave mentale — Sorrow — Delta

**Existant :** `projectile` / `bind` ; 32/1/34 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE SORROW — DELTA, préparer « Entrave mentale — Sorrow — Delta » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Donner à la source de « Entrave mentale — Sorrow — Delta » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet bind de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut ou garde basse ; ralentissement bref, aucune confiscation des commandes.

##### specialForward — Déplacement de Mantis — Sorrow — Delta

**Existant :** `mobility` / `psychic` ; 23/1/28 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE SORROW — DELTA, préparer « Déplacement de Mantis — Sorrow — Delta » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Préparer l’appui qui produit le déplacement ; mouvement et éventuelle sustentation distingués de l’effet psychique.

**Action.** Exécuter « Déplacement de Mantis — Sorrow — Delta » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Départ et arrivée indiqués ; pas de téléportation derrière la cible ni hors arène.

##### specialBack — Déviation psychique — Sorrow — Delta

**Existant :** `parry` / `counter` ; 5/12/28 ticks ; groupe `parry`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE SORROW — DELTA, préparer « Déviation psychique — Sorrow — Delta » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Présenter la surface ou l’organe de parade et maintenir une fenêtre courte lisible.

**Action.** Recevoir puis dévier au contact réel pour « Déviation psychique — Sorrow — Delta » ; la riposte et son effet n’apparaissent qu’après succès. Une attente sans contact garde une pose différente du contre réussi.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Séparer sortie ratée, blocage simple et riposte ; aucun effet de réussite avant collision.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Projections, attaques au corps à corps et explosifs au sol ne sont pas renvoyés.

##### super — Psychokinésie — Sorrow — Delta

**Existant :** `projectile` / `psychic` ; 35/1/44 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE SORROW — DELTA, préparer « Psychokinésie — Sorrow — Delta » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Donner à la source de « Psychokinésie — Sorrow — Delta » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet psychic de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet. La salve contient 5 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 5 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Stabiliser la réserve

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE SORROW — DELTA, préparer « Stabiliser la réserve » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Stabiliser la réserve ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Blackout — Sorrow — Delta

Famille `psychic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : lift → orbit → crush → drop. Appuis déclarés : Psychokinésie — Sorrow — Delta / Débris télékinétiques — Sorrow — Delta.

Plan 1 : THE SORROW — DELTA sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Psychokinésie — Sorrow — Delta / Débris télékinétiques — Sorrow — Delta ». Plan 2 : montrer la source corporelle ou matérielle de « Psychokinésie — Sorrow — Delta / Débris télékinétiques — Sorrow — Delta ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, pose de signature face à l’adversaire.

##### Memory Read — Sorrow — Delta

Famille `psychic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : lift → orbit → crush → drop. Appuis déclarés : Psychokinésie — Sorrow — Delta / Entrave mentale — Sorrow — Delta.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Psychokinésie — Sorrow — Delta / Entrave mentale — Sorrow — Delta » ; l’espace disponible doit être lisible. Plan 2 : montrer la source corporelle ou matérielle de « Psychokinésie — Sorrow — Delta / Entrave mentale — Sorrow — Delta ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, arrêt du dispositif et retour au cadre d’ensemble.

##### Telekinetic Burial — Sorrow — Delta

Famille `psychic`, ton `stylized` ; 256 ticks CQC ; phases actuelles : lift → orbit → crush → drop. Appuis déclarés : Psychokinésie — Sorrow — Delta / Déplacement de Mantis — Sorrow — Delta.

Plan 1 : approche jusqu’à la distance réelle de « Psychokinésie — Sorrow — Delta / Déplacement de Mantis — Sorrow — Delta », arme et main libre identifiées. Plan 2 : montrer la source corporelle ou matérielle de « Psychokinésie — Sorrow — Delta / Déplacement de Mantis — Sorrow — Delta ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, prise de distance et maintien final.

##### Controller Port Two — Sorrow — Delta

Famille `psychic`, ton `stylized` ; 274 ticks CQC ; phases actuelles : lift → orbit → crush → drop. Appuis déclarés : Psychokinésie — Sorrow — Delta / Déviation psychique — Sorrow — Delta.

Plan 1 : après une observation ou un repli, THE SORROW — DELTA reprend l’initiative par « Psychokinésie — Sorrow — Delta / Déviation psychique — Sorrow — Delta ». Plan 2 : montrer la source corporelle ou matérielle de « Psychokinésie — Sorrow — Delta / Déviation psychique — Sorrow — Delta ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Pistol stays holstered on anatomical left chest; right waist pouch stable. Fighting gestures authored, spectral opacity and spirits are separate visual effects rather than baked atlas.
- [Official Konami final Delta full-body model, physically reviewed, ghost-role physical native atlas adaptation](https://www.konami.com/mg/mgs3r/s/img/characters/sorrow.png) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).
