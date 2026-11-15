# Animations — CORE

**10 acteurs du registre courant.** Les titres d’actions et paramètres sont observés ; les descriptions sont des propositions CQC à produire et valider. Un groupe de frames existant ne certifie pas l’ensemble du mouvement ou sa fidélité originale.

[Index des fiches](README.md) · [Contrat commun](../04_ANIMATIONS_SPRITES.md)

## Sommaire

- [BLACK ARTS VIPER](#core__viper) — GHOST BABEL / BLACK CHAMBER
- [VENOM SNAKE](#core__venom) — THE PHANTOM PAIN / DIAMOND DOGS
- [QUIET](#core__quiet) — THE PHANTOM PAIN / TIREUSE
- [OLD SNAKE](#core__old_snake) — MGS4 / VÉTÉRAN CQC
- [LIQUID OCELOT](#core__liquid_ocelot) — MGS4 / DUEL CQC
- [MISTRAL](#core__mistral) — REVENGEANCE / DESPERADO
- [MONSOON](#core__monsoon) — REVENGEANCE / DESPERADO
- [SUNDOWNER](#core__sundowner) — REVENGEANCE / DESPERADO
- [STEVEN ARMSTRONG](#core__armstrong) — REVENGEANCE / NANOMACHINES
- [THE PAIN](#core__pain) — MGS3 / COBRA UNIT

## core__viper

### BLACK ARTS VIPER — GHOST BABEL / BLACK CHAMBER

**Rôle :** Pièges de fils et mines sur position déjà stationnaire. **Profil :** `viper_wire_mines`.

**Base présente dans le code :** Ghost Babel : Viper pose des fils entre ancrages et des mines retardées. Aucun fusil, monoculaire vert ni projectile de bras n’est attribué à cette incarnation.

**Incarnation à conserver :** Original Ghost Babel purple-black armor, left prosthetic and salmon artwork hair

**État vérifié :** métadonnées natives avec limites. 72 régions source distinctes dans les deux directions ; groupes : idle, walk, guard, crouch, low, punch, hit, ko, throw, deploy, recover, attack.

**Réemplois à examiner :** `punch` = light, heavy ; `deploy` = special, specialDown, specialForward, super.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `nextgen`, `tuxedo`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** BLACK ARTS VIPER : Black Arts Viper sans fusil ajouté : fils, ancrages et mines visibles. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** repli vers un angle sur appuis humains ; pose basse distincte. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Pièges de fils et mines sur position déjà stationnaire » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder Black Arts Viper sans fusil ajouté : fils, ancrages et mines visibles.
- **jump_land :** BLACK ARTS VIPER : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. repli vers un angle sur appuis humains ; pose basse distincte. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de BLACK ARTS VIPER. Terminer par mains quittent les ancrages avant réarmement d’un piège. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « GHOST BABEL / BLACK CHAMBER », présentation de Original Ghost Babel purple-black armor, left prosthetic and salmon artwork hair, puis Black Arts Viper sans fusil ajouté : fils, ancrages et mines visibles. Geste court lié à « Fil entre ancrages » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, mains quittent les ancrages avant réarmement d’un piège ; BLACK ARTS VIPER vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à GHOST BABEL / BLACK CHAMBER.
- **round_loss :** Proposition CQC : BLACK ARTS VIPER réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Champ de mines retardées », revenir par mains quittent les ancrages avant réarmement d’un piège, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BLACK ARTS VIPER, préparer « Jab » ; Black Arts Viper sans fusil ajouté : fils, ancrages et mines visibles. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** mains quittent les ancrages avant réarmement d’un piège.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `punch`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BLACK ARTS VIPER, préparer « Frappe engagée » ; Black Arts Viper sans fusil ajouté : fils, ancrages et mines visibles. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** mains quittent les ancrages avant réarmement d’un piège.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BLACK ARTS VIPER, préparer « Balayage » ; Black Arts Viper sans fusil ajouté : fils, ancrages et mines visibles. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** mains quittent les ancrages avant réarmement d’un piège.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BLACK ARTS VIPER, préparer « Projection » ; Black Arts Viper sans fusil ajouté : fils, ancrages et mines visibles. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** mains quittent les ancrages avant réarmement d’un piège. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Fil entre ancrages

**Existant :** `trap` / `wire` ; 28/1/30 ticks ; groupe `deploy`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BLACK ARTS VIPER, préparer « Fil entre ancrages » ; Black Arts Viper sans fusil ajouté : fils, ancrages et mines visibles. Prendre le dispositif, s’abaisser vers le support et indiquer le lieu de pose avant activation.

**Action.** Poser « Fil entre ancrages » au point réel de main/outil, armer puis retirer le membre. Le dispositif possède ensuite son propre sprite, ses états attente/armement/déclenchement/destruction et sa collision.

**Retour.** mains quittent les ancrages avant réarmement d’un piège. Se dégager de l’objet sans le téléporter ; l’interruption avant armement a sa propre sortie.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : S’accroupir sous le fil, quitter son segment, interrompre la pose ou détruire un ancrage au contact.

##### specialDown — Mine — arrêt observé

**Existant :** `stationaryMine` / `mine` ; 30/1/30 ticks ; groupe `deploy`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BLACK ARTS VIPER, préparer « Mine — arrêt observé » ; Black Arts Viper sans fusil ajouté : fils, ancrages et mines visibles. Prendre le dispositif, s’abaisser vers le support et indiquer le lieu de pose avant activation.

**Action.** Poser « Mine — arrêt observé » au point réel de main/outil, armer puis retirer le membre. Le dispositif possède ensuite son propre sprite, ses états attente/armement/déclenchement/destruction et sa collision. Le signal vise une position antérieure observée ; l’animation ne doit pas faire croire à une poursuite de cible.

**Retour.** mains quittent les ancrages avant réarmement d’un piège. Se dégager de l’objet sans le téléporter ; l’interruption avant armement a sa propre sortie.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : La cible doit avoir été immobile 60 images. Après le signal de pose, bouger pendant les 110 images d’armement ou détruire la mine.

##### specialForward — Fil avancé

**Existant :** `trap` / `wire` ; 24/1/32 ticks ; groupe `deploy`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BLACK ARTS VIPER, préparer « Fil avancé » ; Black Arts Viper sans fusil ajouté : fils, ancrages et mines visibles. Prendre le dispositif, s’abaisser vers le support et indiquer le lieu de pose avant activation.

**Action.** Poser « Fil avancé » au point réel de main/outil, armer puis retirer le membre. Le dispositif possède ensuite son propre sprite, ses états attente/armement/déclenchement/destruction et sa collision.

**Retour.** mains quittent les ancrages avant réarmement d’un piège. Se dégager de l’objet sans le téléporter ; l’interruption avant armement a sa propre sortie.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde ou accroupissement sous le fil visible ; sortir du segment, interrompre la préparation ou casser l’ancrage.

##### specialBack — Repli vers l’angle

**Existant :** `mobility` / `movement` ; 9/18/25 ticks ; groupe `walk`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BLACK ARTS VIPER, préparer « Repli vers l’angle » ; Black Arts Viper sans fusil ajouté : fils, ancrages et mines visibles. Préparer l’appui qui produit le déplacement ; repli vers un angle sur appuis humains ; pose basse distincte.

**Action.** Exécuter « Repli vers l’angle » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -10 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** mains quittent les ancrages avant réarmement d’un piège. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Repli fini de 180 px : aucune invulnérabilité, poursuite et punition possibles.

##### super — Champ de mines retardées

**Existant :** `stationaryMine` / `mine` ; 42/1/38 ticks ; groupe `deploy`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BLACK ARTS VIPER, préparer « Champ de mines retardées » ; Black Arts Viper sans fusil ajouté : fils, ancrages et mines visibles. Prendre le dispositif, s’abaisser vers le support et indiquer le lieu de pose avant activation.

**Action.** Poser « Champ de mines retardées » au point réel de main/outil, armer puis retirer le membre. Le dispositif possède ensuite son propre sprite, ses états attente/armement/déclenchement/destruction et sa collision. Le signal vise une position antérieure observée ; l’animation ne doit pas faire croire à une poursuite de cible.

**Retour.** mains quittent les ancrages avant réarmement d’un piège. Se dégager de l’objet sans le téléporter ; l’interruption avant armement a sa propre sortie.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Un arrêt déjà observé est nécessaire. La position annoncée reste esquivable pendant 110 images ; pas de dégâts à distance avant collision.

##### utility — Préparer les dispositifs

**Existant :** `recover` / `recovery` ; 46/1/24 ticks ; groupe `recover`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BLACK ARTS VIPER, préparer « Préparer les dispositifs » ; Black Arts Viper sans fusil ajouté : fils, ancrages et mines visibles. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Préparer les dispositifs ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** mains quittent les ancrages avant réarmement d’un piège. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Gestion de réserve adaptée au versus : une frappe avant l’activation interrompt la préparation.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Fil de sortie

Famille `trap`, ton `stylized` ; 220 ticks CQC ; phases actuelles : approach → lock → confirm → clear. Appuis déclarés : Fil entre ancrages / Repli vers l’angle.

Plan 1 : BLACK ARTS VIPER sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Fil entre ancrages / Repli vers l’angle ». Plan 2 : montrer la pose/trajectoire et le délai de « Fil entre ancrages / Repli vers l’angle ». Plan 3 : déclencher au véritable point de dispositif ; poussière, débris et réaction de cible restent indépendants du corps de l’attaquant. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : mains quittent les ancrages avant réarmement d’un piège, pose de signature face à l’adversaire.

##### Mine retardée

Famille `trap`, ton `stylized` ; 238 ticks CQC ; phases actuelles : bait → lock → impact → clear. Appuis déclarés : Mine — arrêt observé.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Mine — arrêt observé » ; l’espace disponible doit être lisible. Plan 2 : montrer la pose/trajectoire et le délai de « Mine — arrêt observé ». Plan 3 : déclencher au véritable point de dispositif ; poussière, débris et réaction de cible restent indépendants du corps de l’attaquant. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : mains quittent les ancrages avant réarmement d’un piège, arrêt du dispositif et retour au cadre d’ensemble.

##### Angles de Galuade

Famille `trap`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → lock → confirm → clear. Appuis déclarés : Fil entre ancrages / Repli vers l’angle.

Plan 1 : approche jusqu’à la distance réelle de « Fil entre ancrages / Repli vers l’angle », arme et main libre identifiées. Plan 2 : montrer la pose/trajectoire et le délai de « Fil entre ancrages / Repli vers l’angle ». Plan 3 : déclencher au véritable point de dispositif ; poussière, débris et réaction de cible restent indépendants du corps de l’attaquant. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : mains quittent les ancrages avant réarmement d’un piège, prise de distance et maintien final.

##### Retrait du maître

Famille `trap`, ton `stylized` ; 274 ticks CQC ; phases actuelles : approach → lock → confirm → clear. Appuis déclarés : Fil entre ancrages / Repli vers l’angle.

Plan 1 : après une observation ou un repli, BLACK ARTS VIPER reprend l’initiative par « Fil entre ancrages / Repli vers l’angle ». Plan 2 : montrer la pose/trajectoire et le délai de « Fil entre ancrages / Repli vers l’angle ». Plan 3 : déclencher au véritable point de dispositif ; poussière, débris et réaction de cible restent indépendants du corps de l’attaquant. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : mains quittent les ancrages avant réarmement d’un piège, rangement/pose finale différente des trois autres.

#### Limites et preuves

- 1:1 original-universe fidelity is the target. This is a manually reviewed closest pixel-art recreation, not a certified pixel-exact extraction.
- Motion keyframes and all timing are original CQC game adaptations; no claim these are exported original-game animations.
- Independently generated left/right camera views preserve anatomical sides; screen mirroring is forbidden. Minor pose, costume microdetail and hair differences remain.
- PNG source bytes are unchanged. Actual separated full-body crop bounds, pelvis/feet pivots and Canvas contours isolate each pose when a rectangular crop would show its neighbor.
- Three sheets per view provide 36 poses per direction; aliases reuse frames and do not create more original poses. Retreat can reuse walk as an explicit adaptation.
- Official artwork salmon hair and GBC portrait pale/blond palette differ; this edition uses the official color artwork palette.
- No green monocular, firearm, rifle reload, laser or prosthetic cable cannon is accepted. Tripwire/mine objects are rendered by the actual combat engine, not invented into body art.
- [Official Konami/Shinkawa full-body color illustration.](https://img.konami.com/mg/archive/ghostbabel/japanese/character/pic/viper_l.gif) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original GBC screenshots: portrait and physical tripwires/mines, not commentator jokes.](https://lparchive.org/Metal-Gear-Ghost-Babel/Update%2040/) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__venom

### VENOM SNAKE — THE PHANTOM PAIN / DIAMOND DOGS

**Rôle :** Pistolet et bras bionique attaché. **Profil :** `venom`.

**Base présente dans le code :** Final original TPP Steam capture: anatomical-left red attached prosthesis supports pistol, right eyepatch, horn on right forehead. Only visible selected pistol/default attached red arm; precise gun model and WU tranquilizer label require additional loadout evidence. Rocket Punch and Stun Arm upgrades are not implied by every red arm; exclude them from default source clone until selected upgrade is attested. CQC with attached bionic left arm stays; do not alter RAW354 or retrofit other Snake incarnations. Les contacts, collisions, jauges, coûts, durées et cadences sont des adaptations du versus, pas des valeurs des jeux originaux.

**Incarnation à conserver :** Venom Snake, final TPP right forehead shrapnel/right eye patch/left red bionic forearm, tiger-stripe fatigues costume

**État vérifié :** métadonnées natives avec limites. 72 régions source distinctes dans les deux directions ; groupes : idle, walk, guard, crouch, punch, heavy, low, jump, shoot, throw, reload, recover, attack, hit, ko.

**Réemplois à examiner :** `heavy` = heavy, specialDown, specialBack, super ; `throw` = throw, specialForward.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `retro-msx`, `tuxedo`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** VENOM SNAKE : prothèse gauche, œil, éclat crânien et équipement de Venom conservés. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** garde basse compacte avec fonction de prothèse clairement lisible. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Pistolet et bras bionique attaché » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder prothèse gauche, œil, éclat crânien et équipement de Venom conservés.
- **jump_land :** VENOM SNAKE : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. garde basse compacte avec fonction de prothèse clairement lisible. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de VENOM SNAKE. Terminer par retour de la main naturelle et du bras mécanique séparément. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « THE PHANTOM PAIN / DIAMOND DOGS », présentation de Venom Snake, final TPP right forehead shrapnel/right eye patch/left red bionic forearm, tiger-stripe fatigues costume, puis prothèse gauche, œil, éclat crânien et équipement de Venom conservés. Geste court lié à « Pistolet de Venom — tir adapté » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, retour de la main naturelle et du bras mécanique séparément ; VENOM SNAKE vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à THE PHANTOM PAIN / DIAMOND DOGS.
- **round_loss :** Proposition CQC : VENOM SNAKE réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Diamond Dogs — assaut », revenir par retour de la main naturelle et du bras mécanique séparément, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VENOM SNAKE, préparer « Jab » ; prothèse gauche, œil, éclat crânien et équipement de Venom conservés. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour de la main naturelle et du bras mécanique séparément.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VENOM SNAKE, préparer « Frappe engagée » ; prothèse gauche, œil, éclat crânien et équipement de Venom conservés. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retour de la main naturelle et du bras mécanique séparément.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VENOM SNAKE, préparer « Balayage » ; prothèse gauche, œil, éclat crânien et équipement de Venom conservés. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** retour de la main naturelle et du bras mécanique séparément.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VENOM SNAKE, préparer « Projection » ; prothèse gauche, œil, éclat crânien et équipement de Venom conservés. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** retour de la main naturelle et du bras mécanique séparément. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Pistolet de Venom — tir adapté

**Existant :** `projectile` / `ballistic` ; 19/1/29 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VENOM SNAKE, préparer « Pistolet de Venom — tir adapté » ; prothèse gauche, œil, éclat crânien et équipement de Venom conservés. Montrer la prise et la visée de l’arme décrite par « Pistolet de Venom — tir adapté » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** retour de la main naturelle et du bras mécanique séparément. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Adaptation du versus : préparation et sortie visibles, garde/saut/espacement adaptés au geste ; aucune invincibilité ou arme supplémentaire.

##### specialDown — Contact du bras bionique

**Existant :** `melee` / `strike` ; 12/4/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VENOM SNAKE, préparer « Contact du bras bionique » ; prothèse gauche, œil, éclat crânien et équipement de Venom conservés. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Contact du bras bionique » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour de la main naturelle et du bras mécanique séparément.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Adaptation du versus : préparation et sortie visibles, garde/saut/espacement adaptés au geste ; aucune invincibilité ou arme supplémentaire.

##### specialForward — CQC : bras bionique

**Existant :** `melee` / `grapple` ; 10/3/32 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VENOM SNAKE, préparer « CQC : bras bionique » ; prothèse gauche, œil, éclat crânien et équipement de Venom conservés. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** retour de la main naturelle et du bras mécanique séparément. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Hors de portée ou saut ; ne saisir ni cible aérienne ni cible sous protection post-projection.

##### specialBack — Frappe du bras bionique — adaptation

**Existant :** `melee` / `strike` ; 18/5/27 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VENOM SNAKE, préparer « Frappe du bras bionique — adaptation » ; prothèse gauche, œil, éclat crânien et équipement de Venom conservés. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Frappe du bras bionique — adaptation » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour de la main naturelle et du bras mécanique séparément.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Adaptation du versus : préparation et sortie visibles, garde/saut/espacement adaptés au geste ; aucune invincibilité ou arme supplémentaire.

##### super — Diamond Dogs — assaut

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VENOM SNAKE, préparer « Diamond Dogs — assaut » ; prothèse gauche, œil, éclat crânien et équipement de Venom conservés. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Diamond Dogs — assaut », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retour de la main naturelle et du bras mécanique séparément.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Stabiliser la réserve

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VENOM SNAKE, préparer « Stabiliser la réserve » ; prothèse gauche, œil, éclat crânien et équipement de Venom conservés. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Stabiliser la réserve ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** retour de la main naturelle et du bras mécanique séparément. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Pistolet de Venom — tir adapté — conclusion adaptée

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : prepare → release → confirm → pose. Appuis déclarés : Pistolet de Venom — tir adapté.

Plan 1 : VENOM SNAKE sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Pistolet de Venom — tir adapté ». Plan 2 : présenter l’arme effectivement associée à « Pistolet de Venom — tir adapté », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : retour de la main naturelle et du bras mécanique séparément, pose de signature face à l’adversaire.

##### Contact du bras bionique — conclusion adaptée

Famille `cqc`, ton `stylized` ; 238 ticks CQC ; phases actuelles : prepare → contact → confirm → pose. Appuis déclarés : Contact du bras bionique.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Contact du bras bionique » ; l’espace disponible doit être lisible. Plan 2 : contact de saisie ou neutralisation lié à « Contact du bras bionique », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : retour de la main naturelle et du bras mécanique séparément, arrêt du dispositif et retour au cadre d’ensemble.

##### CQC : bras bionique — conclusion adaptée

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : prepare → contact → confirm → pose. Appuis déclarés : CQC : bras bionique.

Plan 1 : approche jusqu’à la distance réelle de « CQC : bras bionique », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « CQC : bras bionique », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : retour de la main naturelle et du bras mécanique séparément, prise de distance et maintien final.

##### Projection — conclusion adaptée

Famille `cqc`, ton `stylized` ; 274 ticks CQC ; phases actuelles : prepare → contact → confirm → pose. Appuis déclarés : Projection.

Plan 1 : après une observation ou un repli, VENOM SNAKE reprend l’initiative par « Projection ». Plan 2 : contact de saisie ou neutralisation lié à « Projection », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : retour de la main naturelle et du bras mécanique séparément, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Authored versus 2D animation with72 unique full-body poses, not original MGSV exported animation and no absolute pixel-exact1:1 fidelity certification.
- Final released TPP Steam screenshot is authoritative for right forehead shrapnel/right eye patch/left prosthesis. Early body concept without horn is used solely for exact costume/equipment silhouette.
- Original native PNG source bytes preserved unedited; independent opposite-facing generations, no mirroring, cropping, resizing or recoloring. Native sheet C-left is square1254x1254, other sources1536x1024; JSON rectangles/contours/pivots and per-source fixed observed scale normalize actor display.
- Small horn on final C-left sheet is low contrast and overlaps dark hair at this native scale; precise shard geometry and every scar pixel are not independently resolved. This limitation is supplied to integrator for physical review, not hidden by alpha counts.
- Pistol uses final game human/bionic hand support and official promotional suppressed-pistol silhouette. Exact microscopic gun attachment topology is approximated; no laser or magic effects invented.
- RocketPunch/StunArm/assault variants reuse physically authored heavy/CQC groups and are not separately drawn projectile/electric keyframes. This mapping truthfully preserves authored move semantics without claiming additional unique native animations.
- Rear seams, changing pouch overlaps and some dynamic limb occlusions are inferred from original outfit art and final screenshot; closest_supported reverse views do not certify unseen geometry.
- Generated combat phases and calibrated versus parameters are authored adaptations, not extracted original game animations or absolute pixel/model1:1 certification.
- [Final TPP official Steam screenshot shows raised black shrapnel horn on anatomical RIGHT forehead above RIGHT patched eye; LEFT red articulated prosthetic supports black pistol; uncovered LEFT eye.](https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/287700/ss_0b38ffb37180ffbadcc0c1d645f65b59c5861d1b.600x338.jpg?t=1778872866) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Early published original Konami Venom costume design only: tiger stripe fatigues, scarf, rolled sleeves, vest/belt pouches, boots, LEFT red arm. This preproduction artwork lacks the final forehead horn and is expressly NOT the head fidelity source.](https://www.creativeuncut.com/gallery-27/art/mgs5-big-boss.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Official Konami TPP special edition promotional plate: released Venom model visible, WU S.Pistol side profile in gold variant; only conventional short suppressed pistol shape used, not alternate outfit or gold skin.](https://www.metalgearsolid.be/images/artworks-metal-gear-solid-v-the-phantom-pain-081.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__quiet

### QUIET — THE PHANTOM PAIN / TIREUSE

**Rôle :** Longue portée et exposition. **Profil :** `sniper`.

**Base présente dans le code :** Sniper mobile ; camouflage et déplacement parasite restent lisibles dans le versus.

**Incarnation à conserver :** Original 2015 MGSV TPP adult Quiet default buddy outfit, conventional original-visual sniper

**État vérifié :** métadonnées natives avec limites. 72 régions source distinctes dans les deux directions ; groupes : idle, walk, guard, crouch, jump, punch, heavy, low, hit, ko, throw, shoot, deploy, optic, recover, charge, attack.

**Réemplois à examiner :** pas de groupe natif partagé observé dans cette extraction.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `retro-msx`, `tuxedo`, `cyborg`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** QUIET : carabine épaulée avec contact joue/crosse et œil cohérent. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** déplacement qui sécurise le long canon et stoppe avant la visée. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Longue portée et exposition » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder carabine épaulée avec contact joue/crosse et œil cohérent.
- **jump_land :** QUIET : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. déplacement qui sécurise le long canon et stoppe avant la visée. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de QUIET. Terminer par recul, éventuel réarmement propre au modèle, réacquisition de cible. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « THE PHANTOM PAIN / TIREUSE », présentation de Original 2015 MGSV TPP adult Quiet default buddy outfit, conventional original-visual sniper, puis carabine épaulée avec contact joue/crosse et œil cohérent. Geste court lié à « Fusil de Quiet — tir de précision » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, recul, éventuel réarmement propre au modèle, réacquisition de cible ; QUIET vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à THE PHANTOM PAIN / TIREUSE.
- **round_loss :** Proposition CQC : QUIET réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Silence — tir décisif », revenir par recul, éventuel réarmement propre au modèle, réacquisition de cible, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de QUIET, préparer « Jab » ; carabine épaulée avec contact joue/crosse et œil cohérent. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de QUIET, préparer « Frappe engagée » ; carabine épaulée avec contact joue/crosse et œil cohérent. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de QUIET, préparer « Balayage » ; carabine épaulée avec contact joue/crosse et œil cohérent. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de QUIET, préparer « Projection » ; carabine épaulée avec contact joue/crosse et œil cohérent. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Fusil de Quiet — tir de précision

**Existant :** `projectile` / `precision` ; 46/1/47 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de QUIET, préparer « Fusil de Quiet — tir de précision » ; carabine épaulée avec contact joue/crosse et œil cohérent. Montrer la prise et la visée de l’arme décrite par « Fusil de Quiet — tir de précision » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Repère de visée du versus ; tir conventionnel annoncé pendant 46 images, garde ou approche pendant la préparation.

##### specialDown — Tir posé — adaptation

**Existant :** `projectile` / `precision` ; 33/1/29 ticks ; groupe `deploy`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de QUIET, préparer « Tir posé — adaptation » ; carabine épaulée avec contact joue/crosse et œil cohérent. Montrer la prise et la visée de l’arme décrite par « Tir posé — adaptation » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Une cartouche du même fusil conventionnel ; tir préparé depuis une position basse, garde ou approche pendant la préparation.

##### specialForward — Repérer la cible

**Existant :** `mark` / `recon` ; 26/1/30 ticks ; groupe `jump`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de QUIET, préparer « Repérer la cible » ; carabine épaulée avec contact joue/crosse et œil cohérent. Orienter regard, optique ou terminal vers la cible observée, sans consulter une action future.

**Action.** Pour « Repérer la cible », déclencher lecture/repérage avec un petit geste ou changement d’optique et un indicateur séparé. Le corps doit rester visible et vulnérable selon les données de combat.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible. Couper le signal ou abaisser l’outil ; retour vers l’adversaire sans nouvelle arme inventée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Portée limitée ; le marquage ne vise ni à travers toute l’arène ni automatiquement.

##### specialBack — Déplacement de Quiet

**Existant :** `mobility` / `movement` ; 23/1/28 ticks ; groupe `walk`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de QUIET, préparer « Déplacement de Quiet » ; carabine épaulée avec contact joue/crosse et œil cohérent. Préparer l’appui qui produit le déplacement ; déplacement qui sécurise le long canon et stoppe avant la visée.

**Action.** Exécuter « Déplacement de Quiet » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Repli rapide lié à la mobilité de Quiet ; départ et arrivée lisibles, distance bornée et collision conservée. Aucun pouvoir mental attribué.

##### super — Silence — tir décisif

**Existant :** `projectile` / `precision` ; 55/1/50 ticks ; groupe `charge`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de QUIET, préparer « Silence — tir décisif » ; carabine épaulée avec contact joue/crosse et œil cohérent. Montrer la prise et la visée de l’arme décrite par « Silence — tir décisif » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Une vraie cartouche et 50 points de jauge ; long repère de visée du versus, garde, esquive ou parade de projectile.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `recover`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de QUIET, préparer « Recharger » ; carabine épaulée avec contact joue/crosse et œil cohérent. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Tir silencieux — conclusion adaptée

Famille `sniper`, ton `stylized` ; 220 ticks CQC ; phases actuelles : mark → steady → shot → fade. Appuis déclarés : Silence — tir décisif.

Plan 1 : QUIET sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Silence — tir décisif ». Plan 2 : présenter l’arme effectivement associée à « Silence — tir décisif », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : recul, éventuel réarmement propre au modèle, réacquisition de cible, pose de signature face à l’adversaire.

##### Tir posé — conclusion adaptée

Famille `sniper`, ton `stylized` ; 238 ticks CQC ; phases actuelles : mark → steady → shot → fade. Appuis déclarés : Tir posé — adaptation.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Tir posé — adaptation » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Tir posé — adaptation », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : recul, éventuel réarmement propre au modèle, réacquisition de cible, arrêt du dispositif et retour au cadre d’ensemble.

##### Visée de Quiet — conclusion adaptée

Famille `sniper`, ton `stylized` ; 256 ticks CQC ; phases actuelles : mark → steady → shot → fade. Appuis déclarés : Fusil de Quiet — tir de précision.

Plan 1 : approche jusqu’à la distance réelle de « Fusil de Quiet — tir de précision », arme et main libre identifiées. Plan 2 : présenter l’arme effectivement associée à « Fusil de Quiet — tir de précision », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : recul, éventuel réarmement propre au modèle, réacquisition de cible, prise de distance et maintien final.

##### Repli de Quiet — conclusion adaptée

Famille `sniper`, ton `stylized` ; 274 ticks CQC ; phases actuelles : mark → steady → shot → fade. Appuis déclarés : Déplacement de Quiet.

Plan 1 : après une observation ou un repli, QUIET reprend l’initiative par « Déplacement de Quiet ». Plan 2 : présenter l’arme effectivement associée à « Déplacement de Quiet », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : recul, éventuel réarmement propre au modèle, réacquisition de cible, rangement/pose finale différente des trois autres.

#### Limites et preuves

- 1:1 original 2015 MGSV TPP default adult Quiet is the target. New 2D detailed cel-shaded art and 72 authored Versus poses are closest_supported, not extracted Fox Engine sprites, original animation data or absolute1to1 certification.
- Original official Steam20 confirms exposed neckline/torso, dark tied front top, olive harness, brown tied ponytail and long BLACK LEFT arm protection; original Steam21 is background context only. Secondary original-model mirrors supplement fullbody torn dark hosiery, shorts, dark laceup ankle boots, LEFT olive hip pouch and RIGHT thigh holster. Publisher source for mirrored renders not recovered; original primary all-side topology not certified.
- All facings independently generated; no PNG reflection, runtime body mirroring, resizing, recoloring, alpha cleanup, raster editing or crop/export performed. Native hidden RGB red/yellow fringe is alpha1-7 except single faint A-right pixel; physically viewed browser Canvas green/black composition at230px is clean. Small opaque red hip equipment agrees supplied reference; no red waist band approved.
- Rifle is ONE conventional long slender exposed-barrel bolt sniper with large black scope, silver bolt and skeletal black stock visually supported by official Steam20; exact selected weapon alias/upgrade/internal workings not established by original inventory/frame. Wicked/Guilty RENOV-ICKX aliases have only a preserved secondary2015Steam discussion, so no alias1:1 certification. Player HUD AM MRS-4 is excluded as identification. No new railgun, psychic energy, suppressor, anti-material or tranquilizer weapon depicted.
- shoot, deploy and charge use the SAME visually supported conventional rifle. deploy is a crouched aimed shot adaptation, not certified Guilty Butterfly tranquilizer. charge precision/super is conventional rifle recoil, not rail/beam. Ammo, five-round capacity,50metercost, damage and exact timings are authored versus balancing to be independently checked by integrator; no unlimited/freemmo canon claim.
- Anatomical asymmetries remain intended original LEFT long black sleeve, RIGHT bare forearm/short olive glove and RIGHT thigh holster/LEFT hip pouch. Forward supporting sleeve and bare trigger-arm overlap partly hides finger topology and exact shoulder/stock contact. Fine materials, eye color, holes/pouch counts, hidden buckles/seams and precise hand dominance in every pose are not certified at source resolution.
- Normal CQC punches/palm/sweep, throws, jump/guard, reload/recovery, precision pose and recoil are authored readable fighting-game adaptations. Parasite-assisted cloak/movement belongs to gameplay helper; no psi aura, rail blast or source-extracted teleport duration. Optic action uses the rifle own scope, not invented binocular gear.
- Standing source heights from physically observed upright head-to-boot silhouettes are fixed per sheet; crouch and KO retain naturally short native pose geometry. Crouched rifle muzzle origins are the actual visible pixels, not artificially lowered to claim guaranteed crouching contact; trajectory/collision must be independently tested.
- Some close native row cells have adjacent body pixels inside wide crops. Existing generic read-only component/Canvas contour metadata excludes foreign bodies; no native pixels changed. Source-scale differences and asymmetrical light/shading remain illustration approximation and are explicitly closest_supported.
- C_LEFT01 rejected mixed right aims;02 rejected sixth figure faced right;03 fixed direction but93 opaque bottom-edge boot pixels indicated clipping;04 complete directions/feet but noncanonical vivid red waist belt;05 repaired belt with image_gen and is selected. All four rejected native outputs/args/SHA retained, no OC created.
- Producer approval is for six physically viewed PNG body sheets/72pose cells and supplied provenance. Independent runtime/mobile/phase/ammo/contact validation is pending root/integrator, not certified by generation.
- Original-incarnation appearance supported by the physically inspected references; motions, reduced 2D proportions and Versus choreography are authored adaptations, not extracted original rigs. No absolute 1:1 certification.
- Original native RGBA bytes preserved; RGB colors under zero or very low alpha are not opaque stage backgrounds. Final live Canvas crop/contour and action contact verification pending.
- [primary_costume_and_sniper_action](https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/287700/ss_558a2d12daf8e683b605d4a417aa3412c0a7792d.1920x1080.jpg?t=1778872866) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [primary_context_default_costume_background_only](https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/287700/ss_70d786ca18e4a78f6ba33f6d219584f825e0571c.1920x1080.jpg?t=1778872866) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [supplemental_anatomical_costume_detail](https://www.game-art-hq.com/wp-content/uploads/2015/11/Quiet-MGSV-Render.png) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [supplemental_anatomical_costume_detail](https://www.game-art-hq.com/wp-content/uploads/2015/11/Quiet-MGSV-Render-Art-Back.png) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__old_snake

### OLD SNAKE — MGS4 / VÉTÉRAN CQC

**Rôle :** Infiltration et armes limitées. **Profil :** `infiltrator`.

**Base présente dans le code :** Vétéran MGS4 : CQC, OctoCamo et arme tranquillisant, sans mobilité de Raiden.

**Incarnation à conserver :** Original2008 PS3 Old Snake base gray OctoCamo, bandana and anatomicalLEFT Solid Eye, original Mk.2 loadout; no Touch/MPO/FaceCamo alternate

**État vérifié :** métadonnées natives avec limites. 72 régions source distinctes dans les deux directions ; groupes : idle, walk, guard, crouch, jump, punch, heavy, low, hit, ko, throw, shoot, deploy, optic, recover, charge, attack.

**Réemplois à examiner :** `throw` = throw, specialForward.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `retro-msx`, `tuxedo`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** OLD SNAKE : garde compacte de l’infiltrateur, arme et étuis proches du corps. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** déroulé de pied discret, bassin bas, freinage avant visée. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Infiltration et armes limitées » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder garde compacte de l’infiltrateur, arme et étuis proches du corps.
- **jump_land :** OLD SNAKE : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. déroulé de pied discret, bassin bas, freinage avant visée. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de OLD SNAKE. Terminer par replacement rapide de la main libre et contrôle du champ. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS4 / VÉTÉRAN CQC », présentation de Original2008 PS3 Old Snake base gray OctoCamo, bandana and anatomicalLEFT Solid Eye, original Mk.2 loadout; no Touch/MPO/FaceCamo alternate, puis garde compacte de l’infiltrateur, arme et étuis proches du corps. Geste court lié à « Mk.2 Pistol » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, replacement rapide de la main libre et contrôle du champ ; OLD SNAKE vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS4 / VÉTÉRAN CQC.
- **round_loss :** Proposition CQC : OLD SNAKE réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Dernière mission », revenir par replacement rapide de la main libre et contrôle du champ, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLD SNAKE, préparer « Jab » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** replacement rapide de la main libre et contrôle du champ.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLD SNAKE, préparer « Frappe engagée » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** replacement rapide de la main libre et contrôle du champ.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLD SNAKE, préparer « Balayage » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** replacement rapide de la main libre et contrôle du champ.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLD SNAKE, préparer « Projection » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** replacement rapide de la main libre et contrôle du champ. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Mk.2 Pistol

**Existant :** `projectile` / `tranq` ; 19/1/29 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLD SNAKE, préparer « Mk.2 Pistol » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Montrer la prise et la visée de l’arme décrite par « Mk.2 Pistol » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** replacement rapide de la main libre et contrôle du champ. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Se baisser, bloquer ; la somnolence décroît et ne provoque pas de K.O. instantané.

##### specialDown — Chaff — brouillage électronique

**Existant :** `chaff` / `chaff` ; 24/1/31 ticks ; groupe `deploy`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLD SNAKE, préparer « Chaff — brouillage électronique » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Prendre le dispositif de brouillage et préparer le lancer ou l’activation.

**Action.** Séparer le geste, l’objet et le nuage/effet de brouillage ; aucun flash de tir balistique ne remplace cette action.

**Retour.** replacement rapide de la main libre et contrôle du champ. Finir le mouvement de la main et dissiper l’effet sur l’événement prévu.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Grenade à arc et fusée visibles ; le nuage brouille brièvement les équipements électroniques compatibles. Aucun dégât humain, impact, marquage ou chip de garde. Sortir de la zone, punir le lancer ou détruire la grenade.

##### specialForward — CQC d’Old Snake

**Existant :** `melee` / `grapple` ; 10/3/32 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLD SNAKE, préparer « CQC d’Old Snake » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** replacement rapide de la main libre et contrôle du champ. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Hors de portée ou saut ; ne saisir ni cible aérienne ni cible sous protection post-projection.

##### specialBack — OctoCamo

**Existant :** `buff` / `stealth` ; 27/1/27 ticks ; groupe `crouch`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLD SNAKE, préparer « OctoCamo » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Montrer la préparation corporelle ou mécanique de « OctoCamo ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** replacement rapide de la main libre et contrôle du champ. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Tenue OctoCamo opaque : état de dissimulation borné du versus, collision conservée ; attaque ou impact rompt cet état. La reproduction du changement de texture du jeu original reste à compléter.

##### super — Dernière mission

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `charge`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLD SNAKE, préparer « Dernière mission » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Dernière mission », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** replacement rapide de la main libre et contrôle du champ.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `recover`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLD SNAKE, préparer « Recharger » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** replacement rapide de la main libre et contrôle du champ. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### OctoCamo — conclusion adaptée

Famille `cqc`, ton `stylized` ; 220 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Dernière mission.

Plan 1 : OLD SNAKE sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Dernière mission ». Plan 2 : contact de saisie ou neutralisation lié à « Dernière mission », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : replacement rapide de la main libre et contrôle du champ, pose de signature face à l’adversaire.

##### Chaff — conclusion adaptée

Famille `tactical`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → deploy → disperse → pose. Appuis déclarés : Chaff — brouillage électronique.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Chaff — brouillage électronique » ; l’espace disponible doit être lisible. Plan 2 : matérialiser le geste tactique « Chaff — brouillage électronique » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : replacement rapide de la main libre et contrôle du champ, arrêt du dispositif et retour au cadre d’ensemble.

##### CQC du vétéran — conclusion adaptée

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : CQC d’Old Snake.

Plan 1 : approche jusqu’à la distance réelle de « CQC d’Old Snake », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « CQC d’Old Snake », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : replacement rapide de la main libre et contrôle du champ, prise de distance et maintien final.

##### Dernière mission — conclusion adaptée

Famille `cqc`, ton `stylized` ; 274 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Projection.

Plan 1 : après une observation ou un repli, OLD SNAKE reprend l’initiative par « Projection ». Plan 2 : contact de saisie ou neutralisation lié à « Projection », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : replacement rapide de la main libre et contrôle du champ, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Target is original2008 PS3 MGS4 Old Snake with base gray OctoCamo, bandana and anatomicalLEFT Solid Eye. This is authored detailed 2D combat art and Versus animation, not original PS3 model extraction or absolute1:1 certification. fidelityStatus=closest_supported; original references outrank generated design consistency sheets.
- Primary Konami screenshots establish fitted segmented gray suit, tan webbing, gloves and left-eye optic; original PS3 fullbody frame900 supplies lower legs and dark boots. Fine pouch counts, hidden harness joins, holster underside, exact seams, stitching and laces are partly interpreted. No numeric count or hidden-side model geometry is certified.
- Both orientations are generated independently, mirror=false. ScreenRIGHT exposes bare near anatomicalRIGHT eye; Solid Eye stays on far anatomicalLEFT side and can be hidden. ScreenLEFT exposes the electronic left-eye lens. Rejected A_RIGHT_01 risked a near/right-eye optic and is retained, never approved or repurposed as an OC.
- The gray moustache is retained but its fine hair density and width vary slightly among small generated poses; elderly face/moustache, no beard, original hair and nape remain. Illustration contour/material rendering cannot be pixel-identical to PS3 low-resolution rasterization.
- Original Mk.2 Pistol loadout, long dark cylindrical suppressor shape and NON-LETHAL HUD are supported by original frames2000/2100. Tiny engraving, exact rear sight, magazine/bolt topology and finger contact are not certified. No manufacturer/model beyond original-game MK.2 PISTOL is asserted. Original weapon fired/held by right glove with left support, overlapping support fingers can be occluded.
- CH​AFF G. existence, rectangular HUD silhouette and physical throw arc are source supported at32000/32004. Cyan HUD is NOT physical color evidence. Small dark rectangular canister with short top fitting in C5/C6 is closest-supported authored readability interpretation; precise physical color/fuze/details and source electronic effect remain unresolved by these images. No frag sphere, detonation, smoke or damage effect is drawn. Root owns electronic Versus behavior and any separate prop.
- C7 is a self equipment-check gesture, never an offensive eye laser, hard target lock or psychic attack. On screenRIGHT the near eye stays bare, but occluded far-side exact fingertip-to-optic contact cannot be certified; this drawing establishes a self checking gesture only.
- OctoCamo source changes opaque surface material/pattern in original gameplay; transparent cloak/invisibility is not supported. These native gray body sheets remain opaque body illustration; runtime camo tint/pattern and balanced duration are root-owned authored adaptations, not a source1:1 animation claim.
- CQC jab/elbow/sweep/grab/charge, walk/guard/crouch/jump, hit/KO, reload and exact phase timing are authored Versus poses. CQC identity and pistol category are source supported; exact motion capture frames, numerical damage/stamina/timings and one-pose freeze are not source-extracted mechanics.
- Sources are untouched native RGBA1536x1024 with12 complete major body components each. Low-alpha fringe/residual background remains natively preserved; Canvas contour metadata excludes neighboring poses in close rows. No pixel cleanup, resize, horizontal flip, crop export, repaint or alpha editing occurred. Some near source-edge gutters are narrow but complete alpha>80 body and gear stay on canvas.
- Standing source-height recommendations measure non-low native pose extents for fixed per-sheet scale, not canonical centimetres. Opposite-facing small design/scale differences and final Canvas contours, contact geometry, live gameplay/mobile and phase origins require independent integrator/browser review. Producer delivery does not certify those later checks.
- Fourteen remote single PS3 frames, including searches of unsuitable costume/gameplay views, are retained. Only the seven named original-frame references above are selected; alternate civilian costume1200 and Otacon1950 are research only. No video/movie file downloaded in full and no source image pixels modified.
- Approval here covers supported identity, full native bodies and equipment. Native authored phase choreography is a Versus adaptation; live crop, contours, launch and collision geometry require subsequent browser checks.
- The visible Chaff HUD silhouette and physical launch are supported; exact canister color and original effect are not established by the selected images. Opaque costume keeps authored gray palette; dynamic source OctoCamo surface matching is not implemented.
- [658x370. Close frontal three-quarter PS3 game rendering: elderly creased face, gray swept-back hair at nape, gray moustache, dark gray bandana. Black technological optic covers anatomical LEFT eye (viewer right in this frontal image); the opposite eye is bare. Fitted gray segmented suit, mesh fabric at inner sleeve, raised shoulder armor/padding, brown/tan harness, full dark gloves. Two-handed handgun aim. Exact handgun model not reliably identifiable from cropped muzzle view.](https://www.konami.com/mg/archive/mgs4/jp/images/mgs4-pic01b.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [658x370. Side crouch beside rock, with opaque rock-pattern OctoCamo matching the surface. Hair/bandana and black optic visible. Torso harness, forearm/sleeve material, hip gear and a small blade are visible; exact knife model and gripping hand not established by this low-resolution shot.](https://www.konami.com/mg/archive/mgs4/jp/images/mgs4-pic03b.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [658x370. Original gameplay rear three-quarter view: fitted dark suit, segmented shoulders/back, tan webbing crossing back with belt and pouches, gray nape hair and tied bandana tails. Rifle equipped in this screenshot, so pistol is one loadout rather than exclusive original-game equipment. Feet and much of legs cropped.](https://www.konami.com/mg/archive/mgs4/jp/images/mgs4-pic04b.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [980x350 official archive hero face art: deep age lines, gray moustache, slicked-back gray hair/nape, dark bandana, close-fitting suit collar. Both eyes uncovered here; this identity art does not establish the Solid Eye-equipped gameplay loadout.](https://www.konami.com/mg/archive/mgs4/jp/images/bg0602.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original full body frontal costume, fitted segmented gray OctoCamo, tan harness/pouches, black gloves and dark lower-shin boots. Original asymmetrical equipment and elderly face.](https://archive.org/download/PS3_Longplay_081_Metal_Gear_Solid_4/PS3_Longplay_081_Metal_Gear_Solid_4.mkv#t=900) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original side crouch before receiving equipment, boot/toe geometry and opaque surface-pattern OctoCamo; small Mk.II robot is shown as a separate device, not the pistol.](https://archive.org/download/PS3_Longplay_081_Metal_Gear_Solid_4/PS3_Longplay_081_Metal_Gear_Solid_4.mkv#t=1880) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original frontal close-up with broad gray moustache, gray hair, bandana and black Solid Eye over anatomical LEFT eye; optic is not a black patch on right eye.](https://archive.org/download/PS3_Longplay_081_Metal_Gear_Solid_4/PS3_Longplay_081_Metal_Gear_Solid_4.mkv#t=1975) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original Mk.II robot hands Snake a long black handgun with cylindrical suppressor/barrel; right glove on grip, visible side silhouette. Exact manufacturer engraving and internal gun anatomy not certified.](https://archive.org/download/PS3_Longplay_081_Metal_Gear_Solid_4/PS3_Longplay_081_Metal_Gear_Solid_4.mkv#t=2000) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__liquid_ocelot

### LIQUID OCELOT — MGS4 / DUEL CQC

**Rôle :** Corps à corps sans arme spéciale. **Profil :** `brawler`.

**Base présente dans le code :** Incarnation du duel final de MGS4 : CQC, pas les revolvers d’un autre Ocelot.

**Incarnation à conserver :** MGS4 official black coat and ochre waistcoat

**État vérifié :** métadonnées natives avec limites. 32 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, attack, hit, ko, punch, low, throw, deploy, shoot, reload, recover, parry.

**Réemplois à examiner :** `punch` = light, heavy, special, specialDown, super ; `throw` = throw, specialForward.

**Techniques pointant sur une seule région native dans la direction principale :** specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `tuxedo`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** LIQUID OCELOT : poids sur les jambes, épaules engagées, mains prêtes. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** transfert lourd mais anatomique, freinage par un appui réel. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Corps à corps sans arme spéciale » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder poids sur les jambes, épaules engagées, mains prêtes.
- **jump_land :** LIQUID OCELOT : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. transfert lourd mais anatomique, freinage par un appui réel. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de LIQUID OCELOT. Terminer par rétablir bassin et épaules après l’élan. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS4 / DUEL CQC », présentation de MGS4 official black coat and ochre waistcoat, puis poids sur les jambes, épaules engagées, mains prêtes. Geste court lié à « Droite de Liquid » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, rétablir bassin et épaules après l’élan ; LIQUID OCELOT vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS4 / DUEL CQC.
- **round_loss :** Proposition CQC : LIQUID OCELOT réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Guns of the Patriots — duel », revenir par rétablir bassin et épaules après l’élan, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LIQUID OCELOT, préparer « Jab » ; poids sur les jambes, épaules engagées, mains prêtes. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** rétablir bassin et épaules après l’élan.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LIQUID OCELOT, préparer « Frappe engagée » ; poids sur les jambes, épaules engagées, mains prêtes. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** rétablir bassin et épaules après l’élan.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LIQUID OCELOT, préparer « Balayage » ; poids sur les jambes, épaules engagées, mains prêtes. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** rétablir bassin et épaules après l’élan.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LIQUID OCELOT, préparer « Projection » ; poids sur les jambes, épaules engagées, mains prêtes. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** rétablir bassin et épaules après l’élan. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Droite de Liquid

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LIQUID OCELOT, préparer « Droite de Liquid » ; poids sur les jambes, épaules engagées, mains prêtes. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Droite de Liquid » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** rétablir bassin et épaules après l’élan.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialDown — Balayage du duel

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LIQUID OCELOT, préparer « Balayage du duel » ; poids sur les jambes, épaules engagées, mains prêtes. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** rétablir bassin et épaules après l’élan.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### specialForward — Prise d’Ocelot

**Existant :** `melee` / `grapple` ; 10/3/32 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LIQUID OCELOT, préparer « Prise d’Ocelot » ; poids sur les jambes, épaules engagées, mains prêtes. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** rétablir bassin et épaules après l’élan. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Hors de portée ou saut ; ne saisir ni cible aérienne ni cible sous protection post-projection.

##### specialBack — Contre final

**Existant :** `parry` / `counter` ; 3/10/29 ticks ; groupe `parry`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LIQUID OCELOT, préparer « Contre final » ; poids sur les jambes, épaules engagées, mains prêtes. Présenter la surface ou l’organe de parade et maintenir une fenêtre courte lisible.

**Action.** Recevoir puis dévier au contact réel pour « Contre final » ; la riposte et son effet n’apparaissent qu’après succès. Une attente sans contact garde une pose différente du contre réussi.

**Retour.** rétablir bassin et épaules après l’élan. Séparer sortie ratée, blocage simple et riposte ; aucun effet de réussite avant collision.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Retarder la frappe, projeter ou attendre les 29 images de récupération.

##### super — Guns of the Patriots — duel

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LIQUID OCELOT, préparer « Guns of the Patriots — duel » ; poids sur les jambes, épaules engagées, mains prêtes. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Guns of the Patriots — duel », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** rétablir bassin et épaules après l’élan.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Reprendre son souffle

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LIQUID OCELOT, préparer « Reprendre son souffle » ; poids sur les jambes, épaules engagées, mains prêtes. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Reprendre son souffle ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** rétablir bassin et épaules après l’élan. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Guns of the Patriots — duel — Final

Famille `cqc`, ton `stylized` ; 220 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Guns of the Patriots — duel / Droite de Liquid.

Plan 1 : LIQUID OCELOT sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Guns of the Patriots — duel / Droite de Liquid ». Plan 2 : contact de saisie ou neutralisation lié à « Guns of the Patriots — duel / Droite de Liquid », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : rétablir bassin et épaules après l’élan, pose de signature face à l’adversaire.

##### Droite de Liquid / Balayage du duel

Famille `cqc`, ton `stylized` ; 238 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Guns of the Patriots — duel / Balayage du duel.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Guns of the Patriots — duel / Balayage du duel » ; l’espace disponible doit être lisible. Plan 2 : contact de saisie ou neutralisation lié à « Guns of the Patriots — duel / Balayage du duel », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : rétablir bassin et épaules après l’élan, arrêt du dispositif et retour au cadre d’ensemble.

##### Prise d’Ocelot — Point final

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Guns of the Patriots — duel / Prise d’Ocelot.

Plan 1 : approche jusqu’à la distance réelle de « Guns of the Patriots — duel / Prise d’Ocelot », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Guns of the Patriots — duel / Prise d’Ocelot », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : rétablir bassin et épaules après l’élan, prise de distance et maintien final.

##### Lecture rapprochée — Mission close

Famille `cqc`, ton `stylized` ; 274 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Guns of the Patriots — duel / Projection.

Plan 1 : après une observation ou un repli, LIQUID OCELOT reprend l’initiative par « Guns of the Patriots — duel / Projection ». Plan 2 : contact de saisie ou neutralisation lié à « Guns of the Patriots — duel / Projection », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : rétablir bassin et épaules après l’élan, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Sixteen physically reviewed independent key poses per facing, 32 total. Walk has two key poses; no full captured motion cycle claim.
- Independent left/right generation preserves canonical anatomical sides; source PNGs stay byte-identical, no mirroring or pixel processing.
- Runtime rects derive from the actual native alpha components. Some rects overlap a neighbor; authored alpha boundary Canvas clip polygons exclude that neighbor while preserving all principal-body pixels above alpha 8.
- One pose may serve several engine move slots. Timings/phase maps are CQC adaptations; original battle geometry, damage, resources and AI are unchanged.
- Weapon small details, fabric folds and face likeness remain stylized. Closest accepted interpretation, no certified pixel-perfect 1:1 fidelity.
- No complete campaign, music or voice work supplied in this sprite candidate.
- No muzzle flash or particles are painted into the shoot poses; most shoot groups contain one aimed-pose keyframe held across phases. Projectile/effect timing remains the engine responsibility.
- All poses empty handed, including unused deploy/shoot/reload group names required by the shared sprite contract. Those names do not depict or grant any firearm; actual brawler slots select punch/throw/guard/recover.
- [Original-game capture / original publisher character art physically viewed before generation; canonical incarnation reference.](https://www.creativeuncut.com/gallery-06/art/mgs4-liquid-ocelot.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__mistral

### MISTRAL — REVENGEANCE / DESPERADO

**Rôle :** L’Étranger : lance et fouet. **Profil :** `mistral`.

**Base présente dans le code :** L’Étranger varie de lance à fouet ; appui Dwarf Gekko borné et destructible.

**Incarnation à conserver :** Red-haired cyborg, anatomicalrightredleg/leftblackleg,12auxiliaryDwarfGekkoarmsplus2mainarms; compactL’Étrangerwhipform

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `blade` = light, heavy, special, specialDown, specialForward, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `retro-msx`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** MISTRAL : bras supplémentaires et L’Étranger réunis selon la forme lance/fouet. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas tournants qui laissent passer l’arme sans traverser le torse. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « L’Étranger : lance et fouet » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder bras supplémentaires et L’Étranger réunis selon la forme lance/fouet.
- **jump_land :** MISTRAL : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas tournants qui laissent passer l’arme sans traverser le torse. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de MISTRAL. Terminer par rassemblement des segments puis reprise de prise. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « REVENGEANCE / DESPERADO », présentation de Red-haired cyborg, anatomicalrightredleg/leftblackleg,12auxiliaryDwarfGekkoarmsplus2mainarms; compactL’Étrangerwhipform, puis bras supplémentaires et L’Étranger réunis selon la forme lance/fouet. Geste court lié à « L’Étranger — estoc » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, rassemblement des segments puis reprise de prise ; MISTRAL vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à REVENGEANCE / DESPERADO.
- **round_loss :** Proposition CQC : MISTRAL réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Danse de L’Étranger », revenir par rassemblement des segments puis reprise de prise, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Contact de lame

**Existant :** `melee` / `spear` ; 7/3/12 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MISTRAL, préparer « Contact de lame » ; bras supplémentaires et L’Étranger réunis selon la forme lance/fouet. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** rassemblement des segments puis reprise de prise. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Coupe engagée

**Existant :** `melee` / `spear` ; 18/5/24 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MISTRAL, préparer « Coupe engagée » ; bras supplémentaires et L’Étranger réunis selon la forme lance/fouet. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** rassemblement des segments puis reprise de prise. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MISTRAL, préparer « Balayage » ; bras supplémentaires et L’Étranger réunis selon la forme lance/fouet. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** rassemblement des segments puis reprise de prise.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MISTRAL, préparer « Projection » ; bras supplémentaires et L’Étranger réunis selon la forme lance/fouet. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** rassemblement des segments puis reprise de prise. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — L’Étranger — estoc

**Existant :** `melee` / `blade` ; 13/5/24 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MISTRAL, préparer « L’Étranger — estoc » ; bras supplémentaires et L’Étranger réunis selon la forme lance/fouet. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** rassemblement des segments puis reprise de prise. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde puis punition ; la lame ne touche qu’une fois par attaque.

##### specialDown — L’Étranger — fouet bas

**Existant :** `melee` / `blade` ; 16/5/29 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MISTRAL, préparer « L’Étranger — fouet bas » ; bras supplémentaires et L’Étranger réunis selon la forme lance/fouet. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** rassemblement des segments puis reprise de prise. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; menace horizontale, pas un anti-aérien universel.

##### specialForward — Appui Dwarf Gekko

**Existant :** `trap` / `drone` ; 34/1/34 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MISTRAL, préparer « Appui Dwarf Gekko » ; bras supplémentaires et L’Étranger réunis selon la forme lance/fouet. Prendre le dispositif, s’abaisser vers le support et indiquer le lieu de pose avant activation.

**Action.** Poser « Appui Dwarf Gekko » au point réel de main/outil, armer puis retirer le membre. Le dispositif possède ensuite son propre sprite, ses états attente/armement/déclenchement/destruction et sa collision.

**Retour.** rassemblement des segments puis reprise de prise. Se dégager de l’objet sans le téléporter ; l’interruption avant armement a sa propre sortie.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Marionnette ou drone visible et destructible ; deux maximum.

##### specialBack — Enroulement défensif

**Existant :** `parry` / `counter` ; 3/10/29 ticks ; groupe `parry`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MISTRAL, préparer « Enroulement défensif » ; bras supplémentaires et L’Étranger réunis selon la forme lance/fouet. Présenter la surface ou l’organe de parade et maintenir une fenêtre courte lisible.

**Action.** Recevoir puis dévier au contact réel pour « Enroulement défensif » ; la riposte et son effet n’apparaissent qu’après succès. Une attente sans contact garde une pose différente du contre réussi.

**Retour.** rassemblement des segments puis reprise de prise. Séparer sortie ratée, blocage simple et riposte ; aucun effet de réussite avant collision.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Retarder la frappe, projeter ou attendre les 29 images de récupération.

##### super — Danse de L’Étranger

**Existant :** `melee` / `blade` ; 25/7/44 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MISTRAL, préparer « Danse de L’Étranger » ; bras supplémentaires et L’Étranger réunis selon la forme lance/fouet. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** rassemblement des segments puis reprise de prise. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Stabiliser la réserve

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MISTRAL, préparer « Stabiliser la réserve » ; bras supplémentaires et L’Étranger réunis selon la forme lance/fouet. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Stabiliser la réserve ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** rassemblement des segments puis reprise de prise. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### L’Étranger

Famille `blade`, ton `stylized` ; 220 ticks CQC ; phases actuelles : dash → crosscut → freeze → sheath. Appuis déclarés : Danse de L’Étranger / L’Étranger — estoc.

Plan 1 : MISTRAL sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Danse de L’Étranger / L’Étranger — estoc ». Plan 2 : armer la lame ou le membre de « Danse de L’Étranger / L’Étranger — estoc » et dégager son arc. Plan 3 : enchaîner des coupes lisibles avec angles distincts ; les impacts et les réactions suivent le fil de lame, sans ajout d’arme d’une autre incarnation. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : rassemblement des segments puis reprise de prise, pose de signature face à l’adversaire.

##### Dwarf Gekko Ballet

Famille `blade`, ton `stylized` ; 238 ticks CQC ; phases actuelles : dash → crosscut → freeze → sheath. Appuis déclarés : Danse de L’Étranger / L’Étranger — fouet bas.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Danse de L’Étranger / L’Étranger — fouet bas » ; l’espace disponible doit être lisible. Plan 2 : armer la lame ou le membre de « Danse de L’Étranger / L’Étranger — fouet bas » et dégager son arc. Plan 3 : enchaîner des coupes lisibles avec angles distincts ; les impacts et les réactions suivent le fil de lame, sans ajout d’arme d’une autre incarnation. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : rassemblement des segments puis reprise de prise, arrêt du dispositif et retour au cadre d’ensemble.

##### Polearm Spiral

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Danse de L’Étranger / Appui Dwarf Gekko.

Plan 1 : approche jusqu’à la distance réelle de « Danse de L’Étranger / Appui Dwarf Gekko », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Danse de L’Étranger / Appui Dwarf Gekko », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : rassemblement des segments puis reprise de prise, prise de distance et maintien final.

##### Cold Wind

Famille `blade`, ton `stylized` ; 274 ticks CQC ; phases actuelles : dash → crosscut → freeze → sheath. Appuis déclarés : Danse de L’Étranger / Projection.

Plan 1 : après une observation ou un repli, MISTRAL reprend l’initiative par « Danse de L’Étranger / Projection ». Plan 2 : armer la lame ou le membre de « Danse de L’Étranger / Projection » et dégager son arc. Plan 3 : enchaîner des coupes lisibles avec angles distincts ; les impacts et les réactions suivent le fil de lame, sans ajout d’arme d’une autre incarnation. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : rassemblement des segments puis reprise de prise, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- [Final released canonical character render, downloaded unmodified and physically inspected.](https://www.creativeuncut.com/gallery-22/mgrr-mistral.html) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__monsoon

### MONSOON — REVENGEANCE / DESPERADO

**Rôle :** Séparation magnétique et sais. **Profil :** `monsoon`.

**Base présente dans le code :** Corps segmenté, magnétisme et sais ; aucune lecture des commandes futures.

**Incarnation à conserver :** Red black segmented magnetic body, red visor, silver hair/jaw and two sais

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `blade` = light, heavy, special, specialForward ; `deploy` = specialDown, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, super, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `retro-msx`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** MONSOON : corps segmenté et sais de Monsoon ; chaque segment garde son identité. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** séparation/recomposition explicite, position finale stable. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Séparation magnétique et sais » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder corps segmenté et sais de Monsoon ; chaque segment garde son identité.
- **jump_land :** MONSOON : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. séparation/recomposition explicite, position finale stable. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de MONSOON. Terminer par segments reviennent dans l’ordre, sans doublon de membre. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « REVENGEANCE / DESPERADO », présentation de Red black segmented magnetic body, red visor, silver hair/jaw and two sais, puis corps segmenté et sais de Monsoon ; chaque segment garde son identité. Geste court lié à « Dystopia — sais » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, segments reviennent dans l’ordre, sans doublon de membre ; MONSOON vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à REVENGEANCE / DESPERADO.
- **round_loss :** Proposition CQC : MONSOON réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Tempête magnétique », revenir par segments reviennent dans l’ordre, sans doublon de membre, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Contact de lame

**Existant :** `melee` / `blade` ; 7/3/12 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MONSOON, préparer « Contact de lame » ; corps segmenté et sais de Monsoon ; chaque segment garde son identité. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** segments reviennent dans l’ordre, sans doublon de membre. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Coupe engagée

**Existant :** `melee` / `blade` ; 18/5/24 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MONSOON, préparer « Coupe engagée » ; corps segmenté et sais de Monsoon ; chaque segment garde son identité. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** segments reviennent dans l’ordre, sans doublon de membre. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MONSOON, préparer « Balayage » ; corps segmenté et sais de Monsoon ; chaque segment garde son identité. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** segments reviennent dans l’ordre, sans doublon de membre.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MONSOON, préparer « Projection » ; corps segmenté et sais de Monsoon ; chaque segment garde son identité. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** segments reviennent dans l’ordre, sans doublon de membre. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Dystopia — sais

**Existant :** `melee` / `blade` ; 13/5/24 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MONSOON, préparer « Dystopia — sais » ; corps segmenté et sais de Monsoon ; chaque segment garde son identité. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** segments reviennent dans l’ordre, sans doublon de membre. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde puis punition ; la lame ne touche qu’une fois par attaque.

##### specialDown — Débris magnétiques

**Existant :** `projectile` / `metal` ; 27/1/30 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MONSOON, préparer « Débris magnétiques » ; corps segmenté et sais de Monsoon ; chaque segment garde son identité. Donner à la source de « Débris magnétiques » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet metal de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet.

**Retour.** segments reviennent dans l’ordre, sans doublon de membre. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Projectile lent et visible : sauter, bloquer ou détruire avec une attaque.

##### specialForward — Corps segmenté

**Existant :** `mobility` / `psychic` ; 23/1/28 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MONSOON, préparer « Corps segmenté » ; corps segmenté et sais de Monsoon ; chaque segment garde son identité. Préparer l’appui qui produit le déplacement ; séparation/recomposition explicite, position finale stable.

**Action.** Exécuter « Corps segmenté » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné.

**Retour.** segments reviennent dans l’ordre, sans doublon de membre. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Départ et arrivée indiqués ; pas de téléportation derrière la cible ni hors arène.

##### specialBack — Désassembler le torse

**Existant :** `parry` / `counter` ; 3/10/29 ticks ; groupe `parry`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MONSOON, préparer « Désassembler le torse » ; corps segmenté et sais de Monsoon ; chaque segment garde son identité. Présenter la surface ou l’organe de parade et maintenir une fenêtre courte lisible.

**Action.** Recevoir puis dévier au contact réel pour « Désassembler le torse » ; la riposte et son effet n’apparaissent qu’après succès. Une attente sans contact garde une pose différente du contre réussi.

**Retour.** segments reviennent dans l’ordre, sans doublon de membre. Séparer sortie ratée, blocage simple et riposte ; aucun effet de réussite avant collision.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Retarder la frappe, projeter ou attendre les 29 images de récupération.

##### super — Tempête magnétique

**Existant :** `projectile` / `metal` ; 35/1/44 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MONSOON, préparer « Tempête magnétique » ; corps segmenté et sais de Monsoon ; chaque segment garde son identité. Donner à la source de « Tempête magnétique » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet metal de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet. La salve contient 4 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** segments reviennent dans l’ordre, sans doublon de membre. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 4 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Stabiliser la réserve

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MONSOON, préparer « Stabiliser la réserve » ; corps segmenté et sais de Monsoon ; chaque segment garde son identité. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Stabiliser la réserve ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** segments reviennent dans l’ordre, sans doublon de membre. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Magnetic Disassembly

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Tempête magnétique / Dystopia — sais.

Plan 1 : MONSOON sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Tempête magnétique / Dystopia — sais ». Plan 2 : présenter l’arme effectivement associée à « Tempête magnétique / Dystopia — sais », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : segments reviennent dans l’ordre, sans doublon de membre, pose de signature face à l’adversaire.

##### Red Phosphorus

Famille `blade`, ton `stylized` ; 238 ticks CQC ; phases actuelles : dash → crosscut → freeze → sheath. Appuis déclarés : Tempête magnétique / Débris magnétiques.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Tempête magnétique / Débris magnétiques » ; l’espace disponible doit être lisible. Plan 2 : armer la lame ou le membre de « Tempête magnétique / Débris magnétiques » et dégager son arc. Plan 3 : enchaîner des coupes lisibles avec angles distincts ; les impacts et les réactions suivent le fil de lame, sans ajout d’arme d’une autre incarnation. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : segments reviennent dans l’ordre, sans doublon de membre, arrêt du dispositif et retour au cadre d’ensemble.

##### Segment Storm

Famille `psychic`, ton `stylized` ; 256 ticks CQC ; phases actuelles : lift → orbit → crush → drop. Appuis déclarés : Tempête magnétique / Corps segmenté.

Plan 1 : approche jusqu’à la distance réelle de « Tempête magnétique / Corps segmenté », arme et main libre identifiées. Plan 2 : montrer la source corporelle ou matérielle de « Tempête magnétique / Corps segmenté ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : segments reviennent dans l’ordre, sans doublon de membre, prise de distance et maintien final.

##### Memes End

Famille `psychic`, ton `stylized` ; 274 ticks CQC ; phases actuelles : lift → orbit → crush → drop. Appuis déclarés : Tempête magnétique / Projection.

Plan 1 : après une observation ou un repli, MONSOON reprend l’initiative par « Tempête magnétique / Projection ». Plan 2 : montrer la source corporelle ou matérielle de « Tempête magnétique / Projection ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : segments reviennent dans l’ordre, sans doublon de membre, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- This initial combat atlas keeps magnetic body connected; detached-body motion requires separate articulated visual implementation.
- [Final released canonical character render, downloaded unmodified and physically inspected.](https://www.creativeuncut.com/gallery-22/mgrr-monsoon.html) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__sundowner

### SUNDOWNER — REVENGEANCE / DESPERADO

**Rôle :** Bloodlust et boucliers explosifs. **Profil :** `sundowner`.

**Base présente dans le code :** Deux Bloodlust et boucliers réactifs ; le versus borne l’explosion à une riposte locale.

**Incarnation à conserver :** Black armored red lower lining coat, twin Bloodlust blades and six explosive back shield panels

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `blade` = light, heavy, special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `tuxedo`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** SUNDOWNER : blindage, grands boucliers et lames sur leurs attaches. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** poids des panneaux visible dans les pivots de bassin. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Bloodlust et boucliers explosifs » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder blindage, grands boucliers et lames sur leurs attaches.
- **jump_land :** SUNDOWNER : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. poids des panneaux visible dans les pivots de bassin. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de SUNDOWNER. Terminer par refermer ou écarter les panneaux avant reprise de garde. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « REVENGEANCE / DESPERADO », présentation de Black armored red lower lining coat, twin Bloodlust blades and six explosive back shield panels, puis blindage, grands boucliers et lames sur leurs attaches. Geste court lié à « Bloodlust — cisaille » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, refermer ou écarter les panneaux avant reprise de garde ; SUNDOWNER vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à REVENGEANCE / DESPERADO.
- **round_loss :** Proposition CQC : SUNDOWNER réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Red Sun — cisaille », revenir par refermer ou écarter les panneaux avant reprise de garde, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Contact de lame

**Existant :** `melee` / `machete` ; 7/3/12 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SUNDOWNER, préparer « Contact de lame » ; blindage, grands boucliers et lames sur leurs attaches. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** refermer ou écarter les panneaux avant reprise de garde. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Coupe engagée

**Existant :** `melee` / `machete` ; 18/5/24 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SUNDOWNER, préparer « Coupe engagée » ; blindage, grands boucliers et lames sur leurs attaches. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** refermer ou écarter les panneaux avant reprise de garde. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SUNDOWNER, préparer « Balayage » ; blindage, grands boucliers et lames sur leurs attaches. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** refermer ou écarter les panneaux avant reprise de garde.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SUNDOWNER, préparer « Projection » ; blindage, grands boucliers et lames sur leurs attaches. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** refermer ou écarter les panneaux avant reprise de garde. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Bloodlust — cisaille

**Existant :** `melee` / `blade` ; 22/5/24 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SUNDOWNER, préparer « Bloodlust — cisaille » ; blindage, grands boucliers et lames sur leurs attaches. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** refermer ou écarter les panneaux avant reprise de garde. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde puis punition ; la lame ne touche qu’une fois par attaque.

##### specialDown — Plaques réactives

**Existant :** `buff` / `shield` ; 18/1/27 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SUNDOWNER, préparer « Plaques réactives » ; blindage, grands boucliers et lames sur leurs attaches. Montrer la préparation corporelle ou mécanique de « Plaques réactives ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** refermer ou écarter les panneaux avant reprise de garde. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Deux projectiles frontaux maximum ; le corps à corps et les saisies restent efficaces.

##### specialForward — Percée blindée

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SUNDOWNER, préparer « Percée blindée » ; blindage, grands boucliers et lames sur leurs attaches. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Percée blindée » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** refermer ou écarter les panneaux avant reprise de garde.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Verrouiller les plaques

**Existant :** `buff` / `armor` ; 22/1/31 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SUNDOWNER, préparer « Verrouiller les plaques » ; blindage, grands boucliers et lames sur leurs attaches. Montrer la préparation corporelle ou mécanique de « Verrouiller les plaques ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** refermer ou écarter les panneaux avant reprise de garde. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Absorbe une seule frappe ; projections, EMP et attaques brise-armure la contrent.

##### super — Red Sun — cisaille

**Existant :** `melee` / `blade` ; 36/7/44 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SUNDOWNER, préparer « Red Sun — cisaille » ; blindage, grands boucliers et lames sur leurs attaches. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** refermer ou écarter les panneaux avant reprise de garde. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Stabiliser la réserve

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SUNDOWNER, préparer « Stabiliser la réserve » ; blindage, grands boucliers et lames sur leurs attaches. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Stabiliser la réserve ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** refermer ou écarter les panneaux avant reprise de garde. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Reactive Shield Break

Famille `blade`, ton `stylized` ; 220 ticks CQC ; phases actuelles : dash → crosscut → freeze → sheath. Appuis déclarés : Red Sun — cisaille / Bloodlust — cisaille.

Plan 1 : SUNDOWNER sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Red Sun — cisaille / Bloodlust — cisaille ». Plan 2 : armer la lame ou le membre de « Red Sun — cisaille / Bloodlust — cisaille » et dégager son arc. Plan 3 : enchaîner des coupes lisibles avec angles distincts ; les impacts et les réactions suivent le fil de lame, sans ajout d’arme d’une autre incarnation. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : refermer ou écarter les panneaux avant reprise de garde, pose de signature face à l’adversaire.

##### Bloodlust Split

Famille `blade`, ton `stylized` ; 238 ticks CQC ; phases actuelles : dash → crosscut → freeze → sheath. Appuis déclarés : Red Sun — cisaille / Plaques réactives.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Red Sun — cisaille / Plaques réactives » ; l’espace disponible doit être lisible. Plan 2 : armer la lame ou le membre de « Red Sun — cisaille / Plaques réactives » et dégager son arc. Plan 3 : enchaîner des coupes lisibles avec angles distincts ; les impacts et les réactions suivent le fil de lame, sans ajout d’arme d’une autre incarnation. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : refermer ou écarter les panneaux avant reprise de garde, arrêt du dispositif et retour au cadre d’ensemble.

##### Red Sun

Famille `mechanical`, ton `stylized` ; 256 ticks CQC ; phases actuelles : lock → barrage → core → shutdown. Appuis déclarés : Red Sun — cisaille / Percée blindée.

Plan 1 : approche jusqu’à la distance réelle de « Red Sun — cisaille / Percée blindée », arme et main libre identifiées. Plan 2 : poids des panneaux visible dans les pivots de bassin ; montrer l’organe de « Red Sun — cisaille / Percée blindée ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : refermer ou écarter les panneaux avant reprise de garde, prise de distance et maintien final.

##### Kids Are Cruel

Famille `mechanical`, ton `stylized` ; 274 ticks CQC ; phases actuelles : lock → barrage → core → shutdown. Appuis déclarés : Red Sun — cisaille / Projection.

Plan 1 : après une observation ou un repli, SUNDOWNER reprend l’initiative par « Red Sun — cisaille / Projection ». Plan 2 : poids des panneaux visible dans les pivots de bassin ; montrer l’organe de « Red Sun — cisaille / Projection ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : refermer ou écarter les panneaux avant reprise de garde, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- [Final released canonical character render, downloaded unmodified and physically inspected.](https://www.creativeuncut.com/gallery-22/mgrr-sundowner.html) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__armstrong

### STEVEN ARMSTRONG — REVENGEANCE / NANOMACHINES

**Rôle :** Nanomachines et failles de réparation. **Profil :** `armstrong`.

**Base présente dans le code :** Nanomachines, combat rapproché et réparation exposée ; pas d’invincibilité permanente.

**Incarnation à conserver :** Final released senator model in bloodied white rolled-sleeve shirt, yellow tie, glasses, charcoal formal trousers

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, special, specialForward, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `retro-msx`, `tuxedo`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** STEVEN ARMSTRONG : appui massif et nanomachines localisées au corps d’Armstrong. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** charges à forte impulsion suivies d’un freinage pesant. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Nanomachines et failles de réparation » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder appui massif et nanomachines localisées au corps d’Armstrong.
- **jump_land :** STEVEN ARMSTRONG : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. charges à forte impulsion suivies d’un freinage pesant. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de STEVEN ARMSTRONG. Terminer par fissures/effet de nanomachines se résorbent selon la durée autorisée. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « REVENGEANCE / NANOMACHINES », présentation de Final released senator model in bloodied white rolled-sleeve shirt, yellow tie, glasses, charcoal formal trousers, puis appui massif et nanomachines localisées au corps d’Armstrong. Geste court lié à « Charge de sénateur » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, fissures/effet de nanomachines se résorbent selon la durée autorisée ; STEVEN ARMSTRONG vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à REVENGEANCE / NANOMACHINES.
- **round_loss :** Proposition CQC : STEVEN ARMSTRONG réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « It has to be this way », revenir par fissures/effet de nanomachines se résorbent selon la durée autorisée, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de STEVEN ARMSTRONG, préparer « Jab » ; appui massif et nanomachines localisées au corps d’Armstrong. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** fissures/effet de nanomachines se résorbent selon la durée autorisée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de STEVEN ARMSTRONG, préparer « Frappe engagée » ; appui massif et nanomachines localisées au corps d’Armstrong. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** fissures/effet de nanomachines se résorbent selon la durée autorisée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de STEVEN ARMSTRONG, préparer « Balayage » ; appui massif et nanomachines localisées au corps d’Armstrong. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** fissures/effet de nanomachines se résorbent selon la durée autorisée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de STEVEN ARMSTRONG, préparer « Projection » ; appui massif et nanomachines localisées au corps d’Armstrong. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** fissures/effet de nanomachines se résorbent selon la durée autorisée. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Charge de sénateur

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de STEVEN ARMSTRONG, préparer « Charge de sénateur » ; appui massif et nanomachines localisées au corps d’Armstrong. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Charge de sénateur » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** fissures/effet de nanomachines se résorbent selon la durée autorisée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialDown — Nanomachines, son

**Existant :** `buff` / `armor` ; 22/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de STEVEN ARMSTRONG, préparer « Nanomachines, son » ; appui massif et nanomachines localisées au corps d’Armstrong. Montrer la préparation corporelle ou mécanique de « Nanomachines, son ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** fissures/effet de nanomachines se résorbent selon la durée autorisée. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Absorbe une seule frappe ; projections, EMP et attaques brise-armure la contrent.

##### specialForward — Réparer les fissures

**Existant :** `heal` / `recovery` ; 45/1/38 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de STEVEN ARMSTRONG, préparer « Réparer les fissures » ; appui massif et nanomachines localisées au corps d’Armstrong. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Réparer les fissures ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** fissures/effet de nanomachines se résorbent selon la durée autorisée. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Ne restaure que les dégâts récupérables ; interrompre les 45 images de préparation.

##### specialBack — Contre de puissance

**Existant :** `parry` / `counter` ; 8/10/29 ticks ; groupe `parry`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de STEVEN ARMSTRONG, préparer « Contre de puissance » ; appui massif et nanomachines localisées au corps d’Armstrong. Présenter la surface ou l’organe de parade et maintenir une fenêtre courte lisible.

**Action.** Recevoir puis dévier au contact réel pour « Contre de puissance » ; la riposte et son effet n’apparaissent qu’après succès. Une attente sans contact garde une pose différente du contre réussi.

**Retour.** fissures/effet de nanomachines se résorbent selon la durée autorisée. Séparer sortie ratée, blocage simple et riposte ; aucun effet de réussite avant collision.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Retarder la frappe, projeter ou attendre les 29 images de récupération.

##### super — It has to be this way

**Existant :** `melee` / `strike` ; 36/7/44 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de STEVEN ARMSTRONG, préparer « It has to be this way » ; appui massif et nanomachines localisées au corps d’Armstrong. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « It has to be this way », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** fissures/effet de nanomachines se résorbent selon la durée autorisée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Stabiliser la réserve

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de STEVEN ARMSTRONG, préparer « Stabiliser la réserve » ; appui massif et nanomachines localisées au corps d’Armstrong. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Stabiliser la réserve ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** fissures/effet de nanomachines se résorbent selon la durée autorisée. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Nanomachines, Son

Famille `cqc`, ton `stylized` ; 220 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : It has to be this way / Charge de sénateur.

Plan 1 : STEVEN ARMSTRONG sécurise son appui, regarde la cible et prépare l’outil ou le geste de « It has to be this way / Charge de sénateur ». Plan 2 : contact de saisie ou neutralisation lié à « It has to be this way / Charge de sénateur », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : fissures/effet de nanomachines se résorbent selon la durée autorisée, pose de signature face à l’adversaire.

##### Excelsus Uppercut

Famille `cqc`, ton `stylized` ; 238 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : It has to be this way / Nanomachines, son.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « It has to be this way / Nanomachines, son » ; l’espace disponible doit être lisible. Plan 2 : contact de saisie ou neutralisation lié à « It has to be this way / Nanomachines, son », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : fissures/effet de nanomachines se résorbent selon la durée autorisée, arrêt du dispositif et retour au cadre d’ensemble.

##### Heart Exposure

Famille `mechanical`, ton `stylized` ; 256 ticks CQC ; phases actuelles : lock → barrage → core → shutdown. Appuis déclarés : It has to be this way / Réparer les fissures.

Plan 1 : approche jusqu’à la distance réelle de « It has to be this way / Réparer les fissures », arme et main libre identifiées. Plan 2 : charges à forte impulsion suivies d’un freinage pesant ; montrer l’organe de « It has to be this way / Réparer les fissures ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : fissures/effet de nanomachines se résorbent selon la durée autorisée, prise de distance et maintien final.

##### Standing Here

Famille `mechanical`, ton `stylized` ; 274 ticks CQC ; phases actuelles : lock → barrage → core → shutdown. Appuis déclarés : It has to be this way / Projection.

Plan 1 : après une observation ou un repli, STEVEN ARMSTRONG reprend l’initiative par « It has to be this way / Projection ». Plan 2 : charges à forte impulsion suivies d’un freinage pesant ; montrer l’organe de « It has to be this way / Projection ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : fissures/effet de nanomachines se résorbent selon la durée autorisée, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- This authored fighting atlas uses the canonical white-shirt senator appearance; shirtless final battle is a separate costume not asserted here.
- Small nanomachine areas on resource poses are an authored visual adaptation; exact game deformation topology is not extracted.
- The native full-body reference is a low-resolution 195x512 released character render; unseen reverse seams are inferred.
- [Published full-body original released-game Armstrong render hosted on Wikipedia; downloaded unmodified and physically viewed. Shirted battle appearance only.](https://en.wikipedia.org/wiki/File:MetalGear-Armstrong.png) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__pain

### THE PAIN — MGS3 / COBRA UNIT

**Rôle :** Essaim, écran et piqûres. **Profil :** `pain`.

**Base présente dans le code :** The Pain contrôle les frelons ; essaims limités et bouclier épuisable.

**Incarnation à conserver :** Original MGS3 PS2 The Pain / Cobra Unit first-phase black balaclava

**État vérifié :** métadonnées natives avec limites. 72 régions source distinctes dans les deux directions ; groupes : idle, walk, guard, crouch, jump, punch, heavy, low, hit, ko, throw, shoot, deploy, optic, recover, charge, attack.

**Réemplois à examiner :** `shoot` = special, specialForward.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `retro-msx`, `tuxedo`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** THE PAIN : attitude de The Pain ; essaim distinct de la silhouette. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** appuis humains, abeilles en trajectoires séparées. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Essaim, écran et piqûres » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder attitude de The Pain ; essaim distinct de la silhouette.
- **jump_land :** THE PAIN : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. appuis humains, abeilles en trajectoires séparées. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de THE PAIN. Terminer par dissipation ou regroupement de l’essaim après l’événement. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS3 / COBRA UNIT », présentation de Original MGS3 PS2 The Pain / Cobra Unit first-phase black balaclava, puis attitude de The Pain ; essaim distinct de la silhouette. Geste court lié à « Essaim de frelons » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, dissipation ou regroupement de l’essaim après l’événement ; THE PAIN vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS3 / COBRA UNIT.
- **round_loss :** Proposition CQC : THE PAIN réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Nuée de The Pain », revenir par dissipation ou regroupement de l’essaim après l’événement, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE PAIN, préparer « Jab » ; attitude de The Pain ; essaim distinct de la silhouette. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** dissipation ou regroupement de l’essaim après l’événement.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE PAIN, préparer « Frappe engagée » ; attitude de The Pain ; essaim distinct de la silhouette. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** dissipation ou regroupement de l’essaim après l’événement.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE PAIN, préparer « Balayage » ; attitude de The Pain ; essaim distinct de la silhouette. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** dissipation ou regroupement de l’essaim après l’événement.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE PAIN, préparer « Projection » ; attitude de The Pain ; essaim distinct de la silhouette. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** dissipation ou regroupement de l’essaim après l’événement. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Essaim de frelons

**Existant :** `projectile` / `swarm` ; 30/1/35 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE PAIN, préparer « Essaim de frelons » ; attitude de The Pain ; essaim distinct de la silhouette. Donner à la source de « Essaim de frelons » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet swarm de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet. La salve contient 4 émissions, espacées de 8 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** dissipation ou regroupement de l’essaim après l’événement. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 4 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### specialDown — Écran de frelons

**Existant :** `buff` / `shield` ; 18/1/27 ticks ; groupe `deploy`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE PAIN, préparer « Écran de frelons » ; attitude de The Pain ; essaim distinct de la silhouette. Montrer la préparation corporelle ou mécanique de « Écran de frelons ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** dissipation ou regroupement de l’essaim après l’événement. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Deux projectiles frontaux maximum ; le corps à corps et les saisies restent efficaces.

##### specialForward — Essaim rapide — adaptation

**Existant :** `projectile` / `swarm` ; 25/1/35 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE PAIN, préparer « Essaim rapide — adaptation » ; attitude de The Pain ; essaim distinct de la silhouette. Donner à la source de « Essaim rapide — adaptation » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet swarm de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet.

**Retour.** dissipation ou regroupement de l’essaim après l’événement. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter ou bloquer les frelons ; poison borné, non létal à lui seul et non empilable.

##### specialBack — Repli de l’essaim

**Existant :** `mobility` / `movement` ; 16/20/26 ticks ; groupe `walk`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE PAIN, préparer « Repli de l’essaim » ; attitude de The Pain ; essaim distinct de la silhouette. Préparer l’appui qui produit le déplacement ; appuis humains, abeilles en trajectoires séparées.

**Action.** Exécuter « Repli de l’essaim » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -2 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** dissipation ou regroupement de l’essaim après l’événement. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Vulnérable aux anti-aériens ; envol borné, pas de vol infini.

##### super — Nuée de The Pain

**Existant :** `projectile` / `swarm` ; 35/1/44 ticks ; groupe `charge`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE PAIN, préparer « Nuée de The Pain » ; attitude de The Pain ; essaim distinct de la silhouette. Donner à la source de « Nuée de The Pain » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet swarm de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** dissipation ou regroupement de l’essaim après l’événement. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Stabiliser la réserve

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE PAIN, préparer « Stabiliser la réserve » ; attitude de The Pain ; essaim distinct de la silhouette. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Stabiliser la réserve ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** dissipation ou regroupement de l’essaim après l’événement. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Nuée de frelons — conclusion adaptée

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Nuée de The Pain / Essaim de frelons.

Plan 1 : THE PAIN sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Nuée de The Pain / Essaim de frelons ». Plan 2 : présenter l’arme effectivement associée à « Nuée de The Pain / Essaim de frelons », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : dissipation ou regroupement de l’essaim après l’événement, pose de signature face à l’adversaire.

##### Écran de frelons — conclusion adaptée

Famille `ballistic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : bait → lock → confirm → pose. Appuis déclarés : Nuée de The Pain / Écran de frelons.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Nuée de The Pain / Écran de frelons » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Nuée de The Pain / Écran de frelons », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : dissipation ou regroupement de l’essaim après l’événement, arrêt du dispositif et retour au cadre d’ensemble.

##### Essaim rapide — conclusion adaptée

Famille `ballistic`, ton `stylized` ; 256 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Nuée de The Pain / Essaim rapide — adaptation.

Plan 1 : approche jusqu’à la distance réelle de « Nuée de The Pain / Essaim rapide — adaptation », arme et main libre identifiées. Plan 2 : présenter l’arme effectivement associée à « Nuée de The Pain / Essaim rapide — adaptation », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : dissipation ou regroupement de l’essaim après l’événement, prise de distance et maintien final.

##### Repli de The Pain — conclusion adaptée

Famille `cqc`, ton `stylized` ; 274 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Projection / Repli de l’essaim.

Plan 1 : après une observation ou un repli, THE PAIN reprend l’initiative par « Projection / Repli de l’essaim ». Plan 2 : contact de saisie ou neutralisation lié à « Projection / Repli de l’essaim », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : dissipation ou regroupement de l’essaim après l’événement, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Target is 1:1 original 2004 PS2 design where physically viewed evidence supports it. New detailed 2D art/poses are authored adaptations of a low-resolution 3D game, not extracted PS2 sprites or certified absolute identity. Fidelity status closest_supported.
- All 72 poses use original FIRST PHASE BLACK BALACLAVA. Original Bullet Bee starts in phase two after removing this mask (source11210/11216). Existing specialForward must be documented as an authored accelerated hornet swarm from an open gloved hand if these sheets are used; it is not canonical mouth Bullet Bee. No second-phase face or oral origin is mixed into this costume.
- Original long black/charcoal sleeves, black gloves, ochre vest, cartridge detail and plain black boots are present. The monochrome artwork alone can suggest bare arms; official original color model and actual PS2 captures override that interpretation.
- Fine cartridge counts, hidden seams, stitching and precise pouch/backpack placement on occluded anatomical sides cannot be certified 1:1 from these limited low-resolution viewpoints. Native both-facing sheets contain conservatively interpreted ochre rear/hip equipment; no unique exclusively left/right pouch fact is claimed. No runtime mirror or pixel reflection is used.
- Game-source captures show original control with gloved arms extended and hornets around the body. Forward glove/palm anchors are authored precise Versus spawn points for readability, not a claim that original hornets canonically materialize from the palm. Original hornets control, no guns, magical fire or psychic beam added.
- Normal punches/sweep/grapple, walk/guard/crouch/jump, hit/KO, shield pose, recover and exact move phase timings are existing CQC adaptations, not source-extracted original boss combat. The single optic pose is inspection/survey gesture, not a new lore power. specialBack uses authored existing walking retreat, no flight.
- displayHeight240 and fixed per-source standing heights are authored simulator geometry/readability suggestions, not original certified centimetres. Runtime human hurtbox, positive scale and all phases/facings remain independently integrator-tested.
- Native PNG bytes are untouched, true alpha and twelve major body components per sheet. Alpha<=80 residual isolated/fringe pixels including outside useful body contours exist, and are not destructively cleared. Existing Canvas contour crop must select the twelve reviewed bodies rather than claim perfectly noise-free original pixels.
- Hornet prop cloud atlas contains three authored wing perspectives of ordinary hornets, seven insects per cloud. Larger swarm behavior/individual insect dimensions cannot be 1:1 extracted at source resolution; no orange/red Bullet Bee mouth trace is imported into first phase.
- Unselected timeline searches and four repeated/unsuitable Part2 seek frames are retained but never used as canonical character proof. No complete movie downloaded; native ffmpeg single frames and original archive metadata preserved.
- Complete original masked first-phase costume compared physically with original Konami color model and eleven PS2 captures, including explicit phase-two face/mouth exclusion. All 72 complete native bodies physically viewed, no physical firearm, fire or oral launch mixed into masked incarnation.
- Fine hidden costume side details and exact source animations are not certified; independent six native sheets preserve closest-supported authored versus art without mirror or source PNG edits. C source scale uses physically upright recover witnesses rather than bent attack bodies so crouch/lean is retained.
- [Référence déclarée](https://www.metalgearsolid.be/images/mgs3_art_0006.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Référence déclarée](https://www.konami.com/mg/archive/mgs3/english/pic/chara_pain_pic.gif) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Référence déclarée](https://archive.org/download/PS2_Longplay-001-Metal_Gear_Solid_3-Snake_Eater/PS2_Longplay-001-Metal_Gear_Solid_3-Snake_Eater.mp4#t=10964) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Référence déclarée](https://archive.org/download/PS2_Longplay-001-Metal_Gear_Solid_3-Snake_Eater/PS2_Longplay-001-Metal_Gear_Solid_3-Snake_Eater.mp4#t=10970) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Référence déclarée](https://archive.org/download/PS2_Longplay-001-Metal_Gear_Solid_3-Snake_Eater/PS2_Longplay-001-Metal_Gear_Solid_3-Snake_Eater.mp4#t=10975) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Référence déclarée](https://archive.org/download/PS2_Longplay-001-Metal_Gear_Solid_3-Snake_Eater/PS2_Longplay-001-Metal_Gear_Solid_3-Snake_Eater.mp4#t=10983) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Référence déclarée](https://archive.org/download/PS2_Longplay-001-Metal_Gear_Solid_3-Snake_Eater/PS2_Longplay-001-Metal_Gear_Solid_3-Snake_Eater.mp4#t=11030) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Référence déclarée](https://archive.org/download/PS2_Longplay-001-Metal_Gear_Solid_3-Snake_Eater/PS2_Longplay-001-Metal_Gear_Solid_3-Snake_Eater.mp4#t=11110) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).
