# Animations — CORE

**10 acteurs du registre courant.** Les titres d’actions et paramètres sont observés ; les descriptions sont des propositions CQC à produire et valider. Un groupe de frames existant ne certifie pas l’ensemble du mouvement ou sa fidélité originale.

[Index des fiches](README.md) · [Contrat commun](../04_ANIMATIONS_SPRITES.md)

## Sommaire

- [NAKED SNAKE](#core__snake) — SNAKE EATER
- [OCELOT](#core__ocelot) — MGS3 / OCELOT UNIT
- [VOLGIN](#core__volgin) — GRU / THUNDERBOLT
- [SOLID SNAKE](#core__solid) — MGS1 / SHADOW MOSES
- [GRAY FOX](#core__fox) — MGS1 / CYBORG NINJA
- [RAIDEN](#core__raiden) — REVENGEANCE / CYBORG
- [JETSTREAM SAM](#core__sam) — REVENGEANCE / MURASAMA
- [LIQUID SNAKE](#core__liquid) — MGS1 / FOXHOUND
- [PSYCHO MANTIS](#core__mantis) — MGS1 / FOXHOUND
- [SNIPER WOLF](#core__wolf) — MGS1 / FOXHOUND

## core__snake

### NAKED SNAKE — SNAKE EATER

**Rôle :** Infiltration et armes limitées. **Profil :** `infiltrator`.

**Base présente dans le code :** Naked Snake 1964 : couteau CQC, MK22 et tenue de camouflage, sans bras bionique.

**Incarnation à conserver :** Original PS2 Tiger Stripe field fatigues, pre-injury two-eye incarnation

**État vérifié :** métadonnées natives avec limites. 72 régions source distinctes dans les deux directions ; groupes : idle, walk, guard, crouch, low, punch, hit, ko, throw, deploy, shoot, reload, attack.

**Réemplois à examiner :** `punch` = light, heavy, super ; `throw` = throw, specialForward.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `nextgen`, `mgs3-camo-watersnake`, `mgs3-camo-urban-tiger`, `mgs3-camo-klmk`, `mgs3-camo-former-east-germany`, `mgs3-camo-former-west-germany`, `mgs3-camo-night-desert`, `mgs3-camo-chameleon`, `mgs3-camo-grenade`, `mgs3-camo-flower`, `mgs3-camo-santa-claus`, `mgs3-camo-rock`, `mgs3-camo-mummy`, `mgs3-camo-festival`, `mgs3-camo-swamp`, `mgs3-camo-anubis`, `mgs3-camo-rainbow`, `mgs3-camo-animals`, `mgs3-camo-st-valentine`, `mgs3-camo-dododo`, `mgs3-camo-banana`, `mgs3-camo-fly`, `mgs3-camo-dpm`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** NAKED SNAKE : garde compacte de l’infiltrateur, arme et étuis proches du corps. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** déroulé de pied discret, bassin bas, freinage avant visée. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Infiltration et armes limitées » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder garde compacte de l’infiltrateur, arme et étuis proches du corps.
- **jump_land :** NAKED SNAKE : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. déroulé de pied discret, bassin bas, freinage avant visée. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de NAKED SNAKE. Terminer par replacement rapide de la main libre et contrôle du champ. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « SNAKE EATER », présentation de Original PS2 Tiger Stripe field fatigues, pre-injury two-eye incarnation, puis garde compacte de l’infiltrateur, arme et étuis proches du corps. Geste court lié à « MK22 » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, replacement rapide de la main libre et contrôle du champ ; NAKED SNAKE vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à SNAKE EATER.
- **round_loss :** Proposition CQC : NAKED SNAKE réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Héritage de The Boss », revenir par replacement rapide de la main libre et contrôle du champ, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NAKED SNAKE, préparer « Jab » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** replacement rapide de la main libre et contrôle du champ.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `punch`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NAKED SNAKE, préparer « Frappe engagée » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** replacement rapide de la main libre et contrôle du champ.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NAKED SNAKE, préparer « Balayage » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** replacement rapide de la main libre et contrôle du champ.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NAKED SNAKE, préparer « Projection » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** replacement rapide de la main libre et contrôle du champ. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — MK22

**Existant :** `projectile` / `tranq` ; 19/1/29 ticks ; groupe `shoot`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NAKED SNAKE, préparer « MK22 » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Montrer la prise et la visée de l’arme décrite par « MK22 » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** replacement rapide de la main libre et contrôle du champ. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Se baisser, bloquer ; la somnolence décroît et ne provoque pas de K.O. instantané.

##### specialDown — Grenade de diversion

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NAKED SNAKE, préparer « Grenade de diversion » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Prélever l’objet correspondant à « Grenade de diversion », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** replacement rapide de la main libre et contrôle du champ. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — CQC — Snake Eater

**Existant :** `melee` / `grapple` ; 10/3/32 ticks ; groupe `throw`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NAKED SNAKE, préparer « CQC — Snake Eater » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** replacement rapide de la main libre et contrôle du champ. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Hors de portée ou saut ; ne saisir ni cible aérienne ni cible sous protection post-projection.

##### specialBack — Camouflage de jungle

**Existant :** `buff` / `stealth` ; 19/1/27 ticks ; groupe `guard`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NAKED SNAKE, préparer « Camouflage de jungle » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Montrer la préparation corporelle ou mécanique de « Camouflage de jungle ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** replacement rapide de la main libre et contrôle du champ. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Silhouette translucide, collision intacte ; une attaque ou un impact brise le camouflage.

##### super — Héritage de The Boss

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `punch`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NAKED SNAKE, préparer « Héritage de The Boss » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Héritage de The Boss », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** replacement rapide de la main libre et contrôle du champ.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NAKED SNAKE, préparer « Recharger » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** replacement rapide de la main libre et contrôle du champ. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Snake Eater

Famille `cqc`, ton `stylized` ; 220 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Héritage de The Boss / MK22.

Plan 1 : NAKED SNAKE sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Héritage de The Boss / MK22 ». Plan 2 : contact de saisie ou neutralisation lié à « Héritage de The Boss / MK22 », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : replacement rapide de la main libre et contrôle du champ, pose de signature face à l’adversaire.

##### Pistolet & couteau

Famille `capture`, ton `stylized` ; 238 ticks CQC ; phases actuelles : stun → disarm → restrain → extract. Appuis déclarés : Héritage de The Boss / Grenade de diversion.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Héritage de The Boss / Grenade de diversion » ; l’espace disponible doit être lisible. Plan 2 : contact de saisie ou neutralisation lié à « Héritage de The Boss / Grenade de diversion », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : replacement rapide de la main libre et contrôle du champ, arrêt du dispositif et retour au cadre d’ensemble.

##### CQC fondateur

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Héritage de The Boss / CQC — Snake Eater.

Plan 1 : approche jusqu’à la distance réelle de « Héritage de The Boss / CQC — Snake Eater », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Héritage de The Boss / CQC — Snake Eater », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : replacement rapide de la main libre et contrôle du champ, prise de distance et maintien final.

##### FOX Extraction

Famille `cqc`, ton `stylized` ; 274 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Héritage de The Boss / Projection.

Plan 1 : après une observation ou un repli, NAKED SNAKE reprend l’initiative par « Héritage de The Boss / Projection ». Plan 2 : contact de saisie ou neutralisation lié à « Héritage de The Boss / Projection », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : replacement rapide de la main libre et contrôle du champ, rangement/pose finale différente des trois autres.

#### Limites et preuves

- 1:1 original-universe fidelity is the target. This is a manually reviewed closest pixel-art recreation, not a certified pixel-exact extraction.
- Motion keyframes and all timing are original CQC game adaptations; no claim these are exported original-game animations.
- Independently generated left/right camera views preserve anatomical sides; screen mirroring is forbidden. Minor pose, costume microdetail and hair differences remain.
- PNG source bytes are unchanged. Actual separated full-body crop bounds, pelvis/feet pivots and Canvas contours isolate each pose when a rectangular crop would show its neighbor.
- Three sheets per view provide 36 poses per direction; aliases reuse frames and do not create more original poses. Retreat can reuse walk as an explicit adaptation.
- Specific pistol and knife silhouettes are simplified at combat resolution; fine receiver markings, seams and camouflage micro-patterns are not certified identical.
- Source chosen is the original PS2 pre-injury render; no eyepatch, red arm, horn or remake costume is added.
- [Reproduction of original PS2 promotional whole-body character render, not the Delta remake.](https://www.metalgearsolid.be/images/mgs3_art_g_0025.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__ocelot

### OCELOT — MGS3 / OCELOT UNIT

**Rôle :** Six coups et ricochet limité. **Profil :** `ocelot`.

**Base présente dans le code :** Jeune Ocelot aux revolvers : pas la technique de CQC du dernier duel MGS4. Le duel PS2 original montre deux SAA de six cartouches, soit douze avant recharge.

**Incarnation à conserver :** Young Ocelot — first Single Action Army duel, 1964; original PS2 combat cartridge harness and paired long SAA holsters

**État vérifié :** métadonnées natives avec limites. 72 régions source distinctes dans les deux directions ; groupes : idle, walk, guard, charge, crouch, low, punch, hit, ko, throw, shoot, deploy, reload, parry, attack.

**Réemplois à examiner :** `punch` = light, heavy ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `tuxedo`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** OCELOT : poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas latéraux et regard indépendant des rotations d’arme. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Six coups et ricochet limité » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder poignets, revolvers et étuis propres à cet âge ; manipulation identifiable.
- **jump_land :** OCELOT : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas latéraux et regard indépendant des rotations d’arme. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de OCELOT. Terminer par replacer chaque arme sans changer sa main ni téléporter les cartouches. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS3 / OCELOT UNIT », présentation de Young Ocelot — first Single Action Army duel, 1964; original PS2 combat cartridge harness and paired long SAA holsters, puis poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Geste court lié à « Single Action Army — jeune » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, replacer chaque arme sans changer sa main ni téléporter les cartouches ; OCELOT vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS3 / OCELOT UNIT.
- **round_loss :** Proposition CQC : OCELOT réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Six coups — 1964 », revenir par replacer chaque arme sans changer sa main ni téléporter les cartouches, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OCELOT, préparer « Jab » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `punch`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OCELOT, préparer « Frappe engagée » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OCELOT, préparer « Balayage » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OCELOT, préparer « Projection » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Single Action Army — jeune

**Existant :** `projectile` / `precision` ; 15/1/24 ticks ; groupe `shoot`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OCELOT, préparer « Single Action Army — jeune » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Montrer la prise et la visée de l’arme décrite par « Single Action Army — jeune » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. Prévoir le ricochet comme événement de l’objet ; le corps ne se réoriente pas automatiquement vers la cible.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Douze cartouches réparties entre deux SAA, puis recharge interruptible ; ricochet limité, aucun tir infini.

##### specialDown — Tir bas de duel

**Existant :** `projectile` / `ballistic` ; 23/1/22 ticks ; groupe `deploy`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OCELOT, préparer « Tir bas de duel » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Montrer la prise et la visée de l’arme décrite par « Tir bas de duel » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde accroupie, parade de projectile ou saut ; rester accroupi sans garde ne protège pas de ce tir bas.

##### specialForward — Pas d’Ocelot

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `charge`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OCELOT, préparer « Pas d’Ocelot » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Préparer l’appui qui produit le déplacement ; pas latéraux et regard indépendant des rotations d’arme.

**Action.** Exécuter « Pas d’Ocelot » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### specialBack — Crosse du major

**Existant :** `parry` / `counter` ; 3/10/29 ticks ; groupe `parry`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OCELOT, préparer « Crosse du major » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Présenter la surface ou l’organe de parade et maintenir une fenêtre courte lisible.

**Action.** Recevoir puis dévier au contact réel pour « Crosse du major » ; la riposte et son effet n’apparaissent qu’après succès. Une attente sans contact garde une pose différente du contre réussi.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches. Séparer sortie ratée, blocage simple et riposte ; aucun effet de réussite avant collision.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Retarder la frappe, projeter ou attendre les 29 images de récupération.

##### super — Six coups — 1964

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OCELOT, préparer « Six coups — 1964 » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Montrer la prise et la visée de l’arme décrite par « Six coups — 1964 » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Exige six cartouches et 50 TACTIC. Accroupissement sous les tirs hauts, saut ou interruption avant départ ; aucun rechargement gratuit.

##### utility — Recharger les deux SAA

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OCELOT, préparer « Recharger les deux SAA » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger les deux SAA », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Quick Draw GRU

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Six coups — 1964 / Single Action Army — jeune.

Plan 1 : OCELOT sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Six coups — 1964 / Single Action Army — jeune ». Plan 2 : présenter l’arme effectivement associée à « Six coups — 1964 / Single Action Army — jeune », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : replacer chaque arme sans changer sa main ni téléporter les cartouches, pose de signature face à l’adversaire.

##### Triple Ricochet

Famille `sniper`, ton `stylized` ; 238 ticks CQC ; phases actuelles : mark → steady → shot → fade. Appuis déclarés : Six coups — 1964 / Ricochet de duel.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Six coups — 1964 / Ricochet de duel » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Six coups — 1964 / Ricochet de duel », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : replacer chaque arme sans changer sa main ni téléporter les cartouches, arrêt du dispositif et retour au cadre d’ensemble.

##### Revolver Lesson

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Six coups — 1964 / Pas d’Ocelot.

Plan 1 : approche jusqu’à la distance réelle de « Six coups — 1964 / Pas d’Ocelot », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Six coups — 1964 / Pas d’Ocelot », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : replacer chaque arme sans changer sa main ni téléporter les cartouches, prise de distance et maintien final.

##### Young Ocelot Finale

Famille `ballistic`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Six coups — 1964 / Projection.

Plan 1 : après une observation ou un repli, OCELOT reprend l’initiative par « Six coups — 1964 / Projection ». Plan 2 : présenter l’arme effectivement associée à « Six coups — 1964 / Projection », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : replacer chaque arme sans changer sa main ni téléporter les cartouches, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Aim 1:1, accepted closest original PS2 source adaptation. Original 3D character translated to new 2D action artwork; not the original extracted animation frames and not absolute 1:1 certification.
- Target is young Ocelot first SAA duel in 1964 in original MGS3 PS2. Initial Makarov promo harness and gun are excluded; no older MGS1/MGS2/Delta/MP0 incarnation is merged.
- PS2-era source footage was archived in 2010, before HD/Delta. Exact Snake Eater/Subsistence pressing is not separately certified; original character model/cutscenes are shared, and hardware-era source is explicit.
- Bandolier in actual frontal first-duel captures runs from anatomical RIGHT shoulder to LEFT hip. Earlier exact stored generation prompts mention initial LEFT-to-RIGHT harness direction; actual combat captures and final visual review override that exploratory assumption without rewriting history.
- Projection of small medals, engraving, ammo-loop counts and concealed far-side equipment is approximate at atlas scale. Cartridge bandolier/belt and long two SAA holsters are present on all final sheets.
- Four walk/mobility phases are authored CQC adaptations, not source-extracted PS2 animation. Original young Ocelot also spins guns in source cutscene, but shipped ten-slot moveset has no independent spin command; no new spin move is invented.
- shoot/deploy show one SAA held and the other holstered; no simultaneous dual-fire artwork is claimed. deploy is a low SAA ricochet aiming pose, not an explosive or grenade.
- reload depicts single-action loading-gate manipulation with fixed cylinder, one held gun per pose. The source has two six-round SAA cylinders/12 shots. Historical shipped resource limit6 is a balancing adaptation; a separately documented runtime overlay may correct total reserve to12.
- Baret remains worn throughout the artwork; original duel can knock it off. No detached hat effect/state is claimed.
- Normal strikes, grapple, backward step, gunbutt parry and exact timings are CQC balancing adaptations; equipment/body remains original. No original-game CQC technique certification is claimed.
- Accepted closest 2D adaptation with 1:1 source identity as target; exact source model geometry/engraving/animation is not certified. Independently generated C-right reload figures vary slightly in stature within their source; one fixed observed upright source scale is retained so low retreat, crouch and KO never stretch to standing height.
- All six final source sheets were viewed whole by the integrator; obsolete C-left 01/02 boot-edge variants remain rejected. Original PS2 first-duel frame0718 viewed and confirms young face/beret/scarf, red gloves, RIGHT-shoulder cartridge strap and two SAA, 12 shots. Agent viewed the other recorded source frames.
- [Référence déclarée](https://www.konami.com/mg/archive/mgs3/english/pic/chara_ocelot_pic.gif) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Référence déclarée](https://www.metalgearsolid.be/images/mgs3_art_g_0036.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Référence déclarée](https://www.metalgearsolid.be/images/saa.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Référence déclarée](https://archive.org/download/LP_Metal_Gear_Solid_3/mgs3_12.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Référence déclarée](https://archive.org/download/LP_Metal_Gear_Solid_3/mgs3_12.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Référence déclarée](https://archive.org/download/LP_Metal_Gear_Solid_3/mgs3_12.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Référence déclarée](https://archive.org/download/LP_Metal_Gear_Solid_3/mgs3_12.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Référence déclarée](https://archive.org/download/LP_Metal_Gear_Solid_3/mgs3_12.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__volgin

### VOLGIN — GRU / THUNDERBOLT

**Rôle :** Électricité corporelle et munitions. **Profil :** `volgin`.

**Base présente dans le code :** Force et électricité ; charge consommée et fenêtres visibles.

**Incarnation à conserver :** Classic Snake Eater original full-body released-model military-coat incarnation, short blond hair/scarred face, red gloves and red tall boots

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `deploy` = special, specialDown, specialForward, super.

**Techniques pointant sur une seule région native dans la direction principale :** special, specialDown, specialForward, specialBack, super, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `retro-msx`, `tuxedo`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** VOLGIN : masse de Volgin, armé du poing et électricité distincte du corps. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas puissants, hanches porteuses et arrêts pesants. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Électricité corporelle et munitions » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder masse de Volgin, armé du poing et électricité distincte du corps.
- **jump_land :** VOLGIN : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas puissants, hanches porteuses et arrêts pesants. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de VOLGIN. Terminer par dissipation de charge et relâchement des épaules. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « GRU / THUNDERBOLT », présentation de Classic Snake Eater original full-body released-model military-coat incarnation, short blond hair/scarred face, red gloves and red tall boots, puis masse de Volgin, armé du poing et électricité distincte du corps. Geste court lié à « Décharge corporelle » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, dissipation de charge et relâchement des épaules ; VOLGIN vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à GRU / THUNDERBOLT.
- **round_loss :** Proposition CQC : VOLGIN réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Thunderbolt », revenir par dissipation de charge et relâchement des épaules, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VOLGIN, préparer « Jab » ; masse de Volgin, armé du poing et électricité distincte du corps. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** dissipation de charge et relâchement des épaules.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VOLGIN, préparer « Frappe engagée » ; masse de Volgin, armé du poing et électricité distincte du corps. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** dissipation de charge et relâchement des épaules.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VOLGIN, préparer « Balayage » ; masse de Volgin, armé du poing et électricité distincte du corps. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** dissipation de charge et relâchement des épaules.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VOLGIN, préparer « Projection » ; masse de Volgin, armé du poing et électricité distincte du corps. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** dissipation de charge et relâchement des épaules. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Décharge corporelle

**Existant :** `projectile` / `electric` ; 25/1/34 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VOLGIN, préparer « Décharge corporelle » ; masse de Volgin, armé du poing et électricité distincte du corps. Donner à la source de « Décharge corporelle » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet electric de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet.

**Retour.** dissipation de charge et relâchement des épaules. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde ; l’EMP ouvre les défenses des machines sans les désactiver définitivement.

##### specialDown — Enveloppe électrique

**Existant :** `buff` / `armor` ; 22/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VOLGIN, préparer « Enveloppe électrique » ; masse de Volgin, armé du poing et électricité distincte du corps. Montrer la préparation corporelle ou mécanique de « Enveloppe électrique ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** dissipation de charge et relâchement des épaules. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Absorbe une seule frappe ; projections, EMP et attaques brise-armure la contrent.

##### specialForward — Munitions électrifiées

**Existant :** `projectile` / `electric` ; 14/1/22 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VOLGIN, préparer « Munitions électrifiées » ; masse de Volgin, armé du poing et électricité distincte du corps. Donner à la source de « Munitions électrifiées » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet electric de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet.

**Retour.** dissipation de charge et relâchement des épaules. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialBack — Poing chargé

**Existant :** `parry` / `electric` ; 3/10/29 ticks ; groupe `parry`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VOLGIN, préparer « Poing chargé » ; masse de Volgin, armé du poing et électricité distincte du corps. Présenter la surface ou l’organe de parade et maintenir une fenêtre courte lisible.

**Action.** Recevoir puis dévier au contact réel pour « Poing chargé » ; la riposte et son effet n’apparaissent qu’après succès. Une attente sans contact garde une pose différente du contre réussi.

**Retour.** dissipation de charge et relâchement des épaules. Séparer sortie ratée, blocage simple et riposte ; aucun effet de réussite avant collision.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Retarder la frappe, projeter ou attendre les 29 images de récupération.

##### super — Thunderbolt

**Existant :** `projectile` / `electric` ; 55/1/50 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VOLGIN, préparer « Thunderbolt » ; masse de Volgin, armé du poing et électricité distincte du corps. Donner à la source de « Thunderbolt » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet electric de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet.

**Retour.** dissipation de charge et relâchement des épaules. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Préparation longue et trait de visée ; accroupissement ou esquive latérale.

##### utility — Stabiliser la réserve

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VOLGIN, préparer « Stabiliser la réserve » ; masse de Volgin, armé du poing et électricité distincte du corps. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Stabiliser la réserve ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** dissipation de charge et relâchement des épaules. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Thunderbolt

Famille `electric`, ton `stylized` ; 220 ticks CQC ; phases actuelles : charge → arc → overload → shutdown. Appuis déclarés : Thunderbolt / Décharge corporelle.

Plan 1 : VOLGIN sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Thunderbolt / Décharge corporelle ». Plan 2 : montrer la source corporelle ou matérielle de « Thunderbolt / Décharge corporelle ». Plan 3 : développer l’effet electric en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : dissipation de charge et relâchement des épaules, pose de signature face à l’adversaire.

##### One Hundred Billion Volts

Famille `electric`, ton `stylized` ; 238 ticks CQC ; phases actuelles : charge → arc → overload → shutdown. Appuis déclarés : Thunderbolt / Enveloppe électrique.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Thunderbolt / Enveloppe électrique » ; l’espace disponible doit être lisible. Plan 2 : montrer la source corporelle ou matérielle de « Thunderbolt / Enveloppe électrique ». Plan 3 : développer l’effet electric en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : dissipation de charge et relâchement des épaules, arrêt du dispositif et retour au cadre d’ensemble.

##### Electric CQC

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Thunderbolt / Munitions électrifiées.

Plan 1 : approche jusqu’à la distance réelle de « Thunderbolt / Munitions électrifiées », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Thunderbolt / Munitions électrifiées », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : dissipation de charge et relâchement des épaules, prise de distance et maintien final.

##### Groznyj Ground

Famille `electric`, ton `stylized` ; 274 ticks CQC ; phases actuelles : charge → arc → overload → shutdown. Appuis déclarés : Thunderbolt / Projection.

Plan 1 : après une observation ou un repli, VOLGIN reprend l’initiative par « Thunderbolt / Projection ». Plan 2 : montrer la source corporelle ou matérielle de « Thunderbolt / Projection ». Plan 3 : développer l’effet electric en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : dissipation de charge et relâchement des épaules, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- This atlas depicts the canon military-coat incarnation; shirtless ammunition-bandolier battle appearance remains a separate costume.
- Electric effects are independent game VFX; no colored sprite auras invented. The native atlas retains original game identity and glove/boot colors.
- Unseen reverse stitching and tiny uniform insignia are inferred at 2.5D native pose scale, not exact extracted model polygons.
- [Original published full-body Snake Eater Volgin 3D character render, mirrored CU, downloaded unchanged and physically viewed. Authentic military-coat costume, not shirtless battle costume.](https://www.creativeuncut.com/gallery-07/mgs3-render-volgin.html) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__solid

### SOLID SNAKE — MGS1 / SHADOW MOSES

**Rôle :** Tir, grenades et distance. **Profil :** `soldier`.

**Base présente dans le code :** Solid Snake de Shadow Moses : SOCOM, grenades et prises de soldat humain.

**Incarnation à conserver :** Original MGS1 PS1 ShadowMoses sneaking suit; original SolidSnake young human incarnation

**État vérifié :** métadonnées natives avec limites. 72 régions source distinctes dans les deux directions ; groupes : idle, walk, guard, crouch, low, punch, hit, ko, throw, deploy, shoot, reload, attack.

**Réemplois à examiner :** `punch` = light, heavy, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `survive`, `retro-msx`, `nextgen`, `cyborg`, `metalgear`, `tuxedo`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** SOLID SNAKE : appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas courts, crosse/équipement conservés près du torse. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Tir, grenades et distance » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder appui militaire stable, arme maintenue dans l’axe et regard vers la menace.
- **jump_land :** SOLID SNAKE : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas courts, crosse/équipement conservés près du torse. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de SOLID SNAKE. Terminer par retour en couverture de l’arme après le coup. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS1 / SHADOW MOSES », présentation de Original MGS1 PS1 ShadowMoses sneaking suit; original SolidSnake young human incarnation, puis appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Geste court lié à « SOCOM » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, retour en couverture de l’arme après le coup ; SOLID SNAKE vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS1 / SHADOW MOSES.
- **round_loss :** Proposition CQC : SOLID SNAKE réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Shadow Moses — assaut », revenir par retour en couverture de l’arme après le coup, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE, préparer « Jab » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `punch`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE, préparer « Frappe engagée » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE, préparer « Balayage » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE, préparer « Projection » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** retour en couverture de l’arme après le coup. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — SOCOM

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE, préparer « SOCOM » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « SOCOM » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Grenade de Shadow Moses

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE, préparer « Grenade de Shadow Moses » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Prélever l’objet correspondant à « Grenade de Shadow Moses », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Coude de Snake

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE, préparer « Coude de Snake » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Coude de Snake » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Repli de l’agent

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `walk`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE, préparer « Repli de l’agent » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer l’appui qui produit le déplacement ; pas courts, crosse/équipement conservés près du torse.

**Action.** Exécuter « Repli de l’agent » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** retour en couverture de l’arme après le coup. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Shadow Moses — assaut

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE, préparer « Shadow Moses — assaut » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Shadow Moses — assaut » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE, préparer « Recharger » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** retour en couverture de l’arme après le coup. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Shadow Moses Double Tap

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Shadow Moses — assaut / SOCOM.

Plan 1 : SOLID SNAKE sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Shadow Moses — assaut / SOCOM ». Plan 2 : présenter l’arme effectivement associée à « Shadow Moses — assaut / SOCOM », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : retour en couverture de l’arme après le coup, pose de signature face à l’adversaire.

##### Stinger Lock

Famille `ballistic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Shadow Moses — assaut / Grenade de Shadow Moses.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Shadow Moses — assaut / Grenade de Shadow Moses » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Shadow Moses — assaut / Grenade de Shadow Moses », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : retour en couverture de l’arme après le coup, arrêt du dispositif et retour au cadre d’ensemble.

##### CQC de Philanthropy

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Shadow Moses — assaut / Coude de Snake.

Plan 1 : approche jusqu’à la distance réelle de « Shadow Moses — assaut / Coude de Snake », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Shadow Moses — assaut / Coude de Snake », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : retour en couverture de l’arme après le coup, prise de distance et maintien final.

##### Mission propre

Famille `ballistic`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Shadow Moses — assaut / Projection.

Plan 1 : après une observation ou un repli, SOLID SNAKE reprend l’initiative par « Shadow Moses — assaut / Projection ». Plan 2 : présenter l’arme effectivement associée à « Shadow Moses — assaut / Projection », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : retour en couverture de l’arme après le coup, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Original-universe1:1 fidelity is the target; this manually reviewed2D recreation is accepted closest, not a pixel-exact originalPS1 model/texture/animation extraction.
- Original MGS1 ShadowMoses SolidSnake only, medium steel-blue gray cloth and dark gear, young clean jaw, navy bandana; no NakedSnake camouflage/beard, MGS2/TwinSnakes/other costume.
- Dim game lighting is supplemented by original Konami final fullbody art; later PS1 leg capture665s corrected mistaken ivory knee highlight interpretation through six targeted image_gen edits. Both knee fronts are now gray material; no source pixel recoloring was saved outside image_gen.
- Original SOCOM Mark23 shape with long suppressor and underside module is based on final artwork and native inventory shape; details/markings remain simplified. Grenade follows originalMGS1 inventory; red HUD is not red material.
- Unarmed jab/heavy/elbow/CQC-style grasp, grenade deployment, SOCOM firing and reload are adapted motion keys, not originalPS1 animation exports. Retreat uses reviewed walk keys with backward travel; no native original retreat cycle is claimed.
- Independent left/right source art with original RIGHT firearm hand and thigh holster, LEFT support hand. Minor pose/equipment occlusion and seam variation remain; mirror is disabled.
- Six PNG give72 unique poses; shared jab/heavy/elbow and super-shot aliases do not add extra authored frames. Crops follow12 actual disjoint alpha bodies per sheet, sometimes with native Canvas contours excluding a neighboring pose. Complete opaque head/hand/boot silhouettes remain inside PNG; wide full low/KO crops can approach edges by2–3pixels.
- Per-source observed upright scale stays fixed for crouch/low/KO; no frame is stretched independently to a full-height figure. Source PNGs retain original dimensions and SHA bytes; all13generation attempts/prompts/references are preserved.
- [original MGS1 full-body Shinkawa art; red background is artistic, not red armor](https://www.metalgearsolid.be/images/mgs_art_g_0031.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [original MGS1 upperbody/suit and suppressed SOCOM shape; only Solid Snake target, ignore Meryl](https://www.metalgearsolid.be/images/mgs_art_g_0011.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [original PS1 gray/anthracite body palette; source video provenance retained](https://archive.org/download/LP-Metal-Gear-Solid/Metal%20Gear%20Solid%20%231%20-%20Tickle%20Codec%20%28Uncut%20Commentary%29-PqUvIZ-lTag.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [original PS1 young face and blue bandana; original low-resolution game](https://archive.org/download/LP-Metal-Gear-Solid/Metal%20Gear%20Solid%20%231%20-%20Tickle%20Codec%20%28Uncut%20Commentary%29-PqUvIZ-lTag.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [PRIMARY original Konami MGS1 final Solid Snake official complete color body](https://www.konami.com/mg/archive/mgs/character/images/ch01_body.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [PRIMARY original Konami MGS1 final Solid Snake official face identity](https://www.konami.com/mg/archive/mgs/character/images/ch01_face.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original MGS1 inventory HUD icon (shape complement, red HUD color is not actual material color)](https://www.metalgearsolid.be/images/socom.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original MGS1 inventory HUD icon (shape complement, red HUD color is not actual material color)](https://www.metalgearsolid.be/images/grenade.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__fox

### GRAY FOX — MGS1 / CYBORG NINJA

**Rôle :** Lame, déviation et furtivité. **Profil :** `ninja`.

**Base présente dans le code :** Exosquelette et lame de Gray Fox ; déviation active des balles, pas défense infinie.

**Incarnation à conserver :** ORIGINAL MGS1 PS1 1998 CYBORG NINJA laboratory intact-body form

**État vérifié :** métadonnées natives avec limites. 72 régions source distinctes dans les deux directions ; groupes : idle, walk, guard, crouch, jump, blade, heavy, low, hit, ko, attack, charge, throw, optic, parry, recover.

**Réemplois à examiner :** `attack` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialForward, specialBack. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `retro-msx`, `tuxedo`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** GRAY FOX : centre bas, main et fourreau orientés selon cette incarnation. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** appuis souples, accélération puis arrêt net avant une coupe. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Lame, déviation et furtivité » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder centre bas, main et fourreau orientés selon cette incarnation.
- **jump_land :** GRAY FOX : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. appuis souples, accélération puis arrêt net avant une coupe. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de GRAY FOX. Terminer par finir l’arc de lame puis reprendre la garde sans traverser le corps. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS1 / CYBORG NINJA », présentation de ORIGINAL MGS1 PS1 1998 CYBORG NINJA laboratory intact-body form, puis centre bas, main et fourreau orientés selon cette incarnation. Geste court lié à « Coupe haute fréquence » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, finir l’arc de lame puis reprendre la garde sans traverser le corps ; GRAY FOX vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS1 / CYBORG NINJA.
- **round_loss :** Proposition CQC : GRAY FOX réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Assaut du ninja », revenir par finir l’arc de lame puis reprendre la garde sans traverser le corps, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Contact de lame

**Existant :** `melee` / `blade` ; 7/3/12 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GRAY FOX, préparer « Contact de lame » ; centre bas, main et fourreau orientés selon cette incarnation. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Coupe engagée

**Existant :** `melee` / `blade` ; 18/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GRAY FOX, préparer « Coupe engagée » ; centre bas, main et fourreau orientés selon cette incarnation. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GRAY FOX, préparer « Balayage » ; centre bas, main et fourreau orientés selon cette incarnation. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GRAY FOX, préparer « Projection » ; centre bas, main et fourreau orientés selon cette incarnation. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Coupe haute fréquence

**Existant :** `melee` / `blade` ; 13/5/24 ticks ; groupe `attack`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GRAY FOX, préparer « Coupe haute fréquence » ; centre bas, main et fourreau orientés selon cette incarnation. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde puis punition ; la lame ne touche qu’une fois par attaque.

##### specialDown — Coupe ascendante

**Existant :** `melee` / `blade` ; 21/4/33 ticks ; groupe `charge`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GRAY FOX, préparer « Coupe ascendante » ; centre bas, main et fourreau orientés selon cette incarnation. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer ou espacer ; la remontée est punissable en garde.

##### specialForward — Camouflage optique

**Existant :** `buff` / `stealth` ; 19/1/27 ticks ; groupe `optic`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GRAY FOX, préparer « Camouflage optique » ; centre bas, main et fourreau orientés selon cette incarnation. Montrer la préparation corporelle ou mécanique de « Camouflage optique ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Silhouette translucide, collision intacte ; une attaque ou un impact brise le camouflage.

##### specialBack — Dévier les balles

**Existant :** `parry` / `counter` ; 5/12/28 ticks ; groupe `parry`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GRAY FOX, préparer « Dévier les balles » ; centre bas, main et fourreau orientés selon cette incarnation. Présenter la surface ou l’organe de parade et maintenir une fenêtre courte lisible.

**Action.** Recevoir puis dévier au contact réel pour « Dévier les balles » ; la riposte et son effet n’apparaissent qu’après succès. Une attente sans contact garde une pose différente du contre réussi.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Séparer sortie ratée, blocage simple et riposte ; aucun effet de réussite avant collision.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Projections, attaques au corps à corps et explosifs au sol ne sont pas renvoyés.

##### super — Assaut du ninja

**Existant :** `melee` / `blade` ; 25/7/44 ticks ; groupe `attack`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GRAY FOX, préparer « Assaut du ninja » ; centre bas, main et fourreau orientés selon cette incarnation. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Stabiliser la réserve

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GRAY FOX, préparer « Stabiliser la réserve » ; centre bas, main et fourreau orientés selon cette incarnation. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Stabiliser la réserve ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Deepthroat Cut

Famille `blade`, ton `stylized` ; 220 ticks CQC ; phases actuelles : dash → crosscut → freeze → sheath. Appuis déclarés : Assaut du ninja / Coupe haute fréquence.

Plan 1 : GRAY FOX sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Assaut du ninja / Coupe haute fréquence ». Plan 2 : armer la lame ou le membre de « Assaut du ninja / Coupe haute fréquence » et dégager son arc. Plan 3 : enchaîner des coupes lisibles avec angles distincts ; les impacts et les réactions suivent le fil de lame, sans ajout d’arme d’une autre incarnation. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : finir l’arc de lame puis reprendre la garde sans traverser le corps, pose de signature face à l’adversaire.

##### Stealth Split

Famille `blade`, ton `stylized` ; 238 ticks CQC ; phases actuelles : dash → crosscut → freeze → sheath. Appuis déclarés : Assaut du ninja / Coupe ascendante.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Assaut du ninja / Coupe ascendante » ; l’espace disponible doit être lisible. Plan 2 : armer la lame ou le membre de « Assaut du ninja / Coupe ascendante » et dégager son arc. Plan 3 : enchaîner des coupes lisibles avec angles distincts ; les impacts et les réactions suivent le fil de lame, sans ajout d’arme d’une autre incarnation. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : finir l’arc de lame puis reprendre la garde sans traverser le corps, arrêt du dispositif et retour au cadre d’ensemble.

##### Fox Blade

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Assaut du ninja / Camouflage optique.

Plan 1 : approche jusqu’à la distance réelle de « Assaut du ninja / Camouflage optique », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Assaut du ninja / Camouflage optique », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : finir l’arc de lame puis reprendre la garde sans traverser le corps, prise de distance et maintien final.

##### Arme inutile

Famille `blade`, ton `stylized` ; 274 ticks CQC ; phases actuelles : dash → crosscut → freeze → sheath. Appuis déclarés : Assaut du ninja / Projection.

Plan 1 : après une observation ou un repli, GRAY FOX reprend l’initiative par « Assaut du ninja / Projection ». Plan 2 : armer la lame ou le membre de « Assaut du ninja / Projection » et dégager son arc. Plan 3 : enchaîner des coupes lisibles avec angles distincts ; les impacts et les réactions suivent le fil de lame, sans ajout d’arme d’une autre incarnation. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : finir l’arc de lame puis reprendre la garde sans traverser le corps, rangement/pose finale différente des trois autres.

#### Limites et preuves

- 1:1universetarget; generated2D recreationacceptedclosest, notoriginalPS1 texture/model/animation extraction, noabsolutefidelitycertification.
- PrimaryKonami artprovidesfinebody/helmetshape; broadorange/navypalettecomesactualPS1game720/750/780/810s, overrides ink-onlypalehighlights.
- Bladecuts, jumpposes, CQCprojection, hit/KO, ascents andstabilization arebalancedversuskeys, notoriginalPS1animation timings.
- The walkkeys aredistinctcontact/passingadaptations; exactrightleftfootalternation andoriginalPS1gaitare notcertified.
- LeftB startup0/6 rotatehead/torsoaway beforeactive1/7 strikesLEFT; KO side/backposes do notalwaysfaceopponent. This isdeclaredadaptedwindup, not originaldirectionextraction.
- LeftC grab/throw6/7 isoriginalPS1 unarmedstate, differenthandchoreography fromright-left mirroredmotion; gameplayprofilethrowunchanged. No tacticalpouch/scabbard wasinvented toexplaininventory.
- Katana primaryrighthand andtwo-handedguard/supportare reviewed; someocclusion andpose seams remain simplified atnativefighting scale.
- Recoveryutility isversusresourcebalancing, originalhasnoverifiedbatteryitemgesture; images showquietposturalstabilization withoutnewdevice.
- Cloak activation8 isOPAQUE reference; engine suppliesactual transparency, notbakedart; no lasers/energyprojectilesadded.
- OriginalPS1 electricdamagesphere visiblyexists1050s but notadded newgameplaypower; finalREX arm-loss/cannonincarnation expresslyexcluded.
- Fullnativevideo148171584bytes retainedlocally; selectedunalteredframes+videoURL/SHA areportablepackageevidence. LPoccasionallycomparesTwinSnakes, selectedreviewedlowpolygonlabframe/HUD areoriginalPS1.
- Sparse low-alpha halos andtightatlasmargins retainedasgenerationnative; integratorperforms Canvascrop/contouronly withoutPNGpixelmutation.
- All six final sources physically viewed; exact source animation/gait and katana-hand choreography are adaptations. Blade remains RIGHT in attacks; throw LEFT group is unarmed original-game state instead of a mirrored opposite sword-hand error.
- Standing source scale is fixed per PNG. Upright references are A0/1 and neutral B2/C11; overhead blades and low jump/KO bounds do not inflate standing scale.
- Body/katana alpha contours isolate native full figures without any image-pixel rewrite.
- [Référence déclarée](https://www.konami.com/mg/archive/mgs/character/ch19.html) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Référence déclarée](https://www.konami.com/mg/archive/mgs/character/images/ch19_body.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Référence déclarée](https://www.konami.com/mg/archive/mgs/character/images/ch19_face.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Référence déclarée](https://lparchive.org/Metal-Gear-Solid/) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Palette/front right katana at720, back armor750, front helmet/chest780/810, boss/NINJA HUD/camouflage actualplay840/870/930/960, native electric damage sphere1050 not imported into current move list](https://archive.org/download/LP-Metal-Gear-Solid/Metal%20Gear%20Solid%20%235%20-%20Gel%20Pens%20%28Uncut%20Commentary%29-JvIMxyGDLyA.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Palette/front right katana at720, back armor750, front helmet/chest780/810, boss/NINJA HUD/camouflage actualplay840/870/930/960, native electric damage sphere1050 not imported into current move list](https://archive.org/download/LP-Metal-Gear-Solid/Metal%20Gear%20Solid%20%235%20-%20Gel%20Pens%20%28Uncut%20Commentary%29-JvIMxyGDLyA.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Palette/front right katana at720, back armor750, front helmet/chest780/810, boss/NINJA HUD/camouflage actualplay840/870/930/960, native electric damage sphere1050 not imported into current move list](https://archive.org/download/LP-Metal-Gear-Solid/Metal%20Gear%20Solid%20%235%20-%20Gel%20Pens%20%28Uncut%20Commentary%29-JvIMxyGDLyA.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Palette/front right katana at720, back armor750, front helmet/chest780/810, boss/NINJA HUD/camouflage actualplay840/870/930/960, native electric damage sphere1050 not imported into current move list](https://archive.org/download/LP-Metal-Gear-Solid/Metal%20Gear%20Solid%20%235%20-%20Gel%20Pens%20%28Uncut%20Commentary%29-JvIMxyGDLyA.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__raiden

### RAIDEN — REVENGEANCE / CYBORG

**Rôle :** Lame haute fréquence et économie de carburant. **Profil :** `raiden_mgr`.

**Base présente dans le code :** Raiden Revengeance : lame HF, Ninja Run et carburant ; seul ce kit dispose du Ripper Mode.

**Incarnation à conserver :** Post-prologue black cyborg body, left ocular visor, High Frequency katana

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `blade` = light, heavy, special, specialDown, specialForward.

**Techniques pointant sur une seule région native dans la direction principale :** specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `retro-msx`, `tuxedo`, `white-armor`, `inferno-armor`, `commando-armor`, `cyborg-ninja`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** RAIDEN : Custom Body noir, visage et HF katana du Raiden après prologue. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** course/bond cyborg avec lame maintenue sur le bon côté. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Lame haute fréquence et économie de carburant » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder Custom Body noir, visage et HF katana du Raiden après prologue.
- **jump_land :** RAIDEN : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. course/bond cyborg avec lame maintenue sur le bon côté. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de RAIDEN. Terminer par fin de coupe et retour au garde ; Zandatsu seulement si le profil l’autorise. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « REVENGEANCE / CYBORG », présentation de Post-prologue black cyborg body, left ocular visor, High Frequency katana, puis Custom Body noir, visage et HF katana du Raiden après prologue. Geste court lié à « Coupe HF » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, fin de coupe et retour au garde ; Zandatsu seulement si le profil l’autorise ; RAIDEN vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à REVENGEANCE / CYBORG.
- **round_loss :** Proposition CQC : RAIDEN réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Jack the Ripper », revenir par fin de coupe et retour au garde ; Zandatsu seulement si le profil l’autorise, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Contact de lame

**Existant :** `melee` / `blade` ; 7/3/12 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN, préparer « Contact de lame » ; Custom Body noir, visage et HF katana du Raiden après prologue. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** fin de coupe et retour au garde ; Zandatsu seulement si le profil l’autorise. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Coupe engagée

**Existant :** `melee` / `blade` ; 18/5/24 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN, préparer « Coupe engagée » ; Custom Body noir, visage et HF katana du Raiden après prologue. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** fin de coupe et retour au garde ; Zandatsu seulement si le profil l’autorise. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN, préparer « Balayage » ; Custom Body noir, visage et HF katana du Raiden après prologue. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** fin de coupe et retour au garde ; Zandatsu seulement si le profil l’autorise.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Zandatsu — extraction limitée

**Existant :** `melee` / `zandatsu` ; 12/3/36 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN, préparer « Zandatsu — extraction limitée » ; Custom Body noir, visage et HF katana du Raiden après prologue. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Zandatsu — extraction limitée » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense. L’effet zandatsu reste séparé du membre ; son apparition et sa disparition suivent les événements du profil.

**Retour.** fin de coupe et retour au garde ; Zandatsu seulement si le profil l’autorise.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Exige une ouverture créée par une lame confirmée. Extraction uniquement sur châssis/cyborg ; pas de K.O. automatique ni soin intégral.

##### special — Coupe HF

**Existant :** `melee` / `blade` ; 13/5/24 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN, préparer « Coupe HF » ; Custom Body noir, visage et HF katana du Raiden après prologue. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** fin de coupe et retour au garde ; Zandatsu seulement si le profil l’autorise. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde puis punition ; la lame ne touche qu’une fois par attaque.

##### specialDown — Lame ascendante

**Existant :** `melee` / `blade` ; 21/4/33 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN, préparer « Lame ascendante » ; Custom Body noir, visage et HF katana du Raiden après prologue. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** fin de coupe et retour au garde ; Zandatsu seulement si le profil l’autorise. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer ou espacer ; la remontée est punissable en garde.

##### specialForward — Ninja Run

**Existant :** `melee` / `blade` ; 18/7/32 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN, préparer « Ninja Run » ; Custom Body noir, visage et HF katana du Raiden après prologue. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** fin de coupe et retour au garde ; Zandatsu seulement si le profil l’autorise. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Parade haute fréquence

**Existant :** `parry` / `counter` ; 3/10/29 ticks ; groupe `parry`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN, préparer « Parade haute fréquence » ; Custom Body noir, visage et HF katana du Raiden après prologue. Présenter la surface ou l’organe de parade et maintenir une fenêtre courte lisible.

**Action.** Recevoir puis dévier au contact réel pour « Parade haute fréquence » ; la riposte et son effet n’apparaissent qu’après succès. Une attente sans contact garde une pose différente du contre réussi.

**Retour.** fin de coupe et retour au garde ; Zandatsu seulement si le profil l’autorise. Séparer sortie ratée, blocage simple et riposte ; aucun effet de réussite avant collision.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Retarder la frappe, projeter ou attendre les 29 images de récupération.

##### super — Jack the Ripper

**Existant :** `buff` / `mode` ; 35/1/30 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN, préparer « Jack the Ripper » ; Custom Body noir, visage et HF katana du Raiden après prologue. Montrer la préparation corporelle ou mécanique de « Jack the Ripper ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** fin de coupe et retour au garde ; Zandatsu seulement si le profil l’autorise. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Survivre aux quatre secondes de puissance ; le mode n’ajoute aucune invulnérabilité.

##### utility — Stabiliser la réserve

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN, préparer « Stabiliser la réserve » ; Custom Body noir, visage et HF katana du Raiden après prologue. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Stabiliser la réserve ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** fin de coupe et retour au garde ; Zandatsu seulement si le profil l’autorise. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Blade Mode Finale

Famille `blade`, ton `stylized` ; 220 ticks CQC ; phases actuelles : dash → crosscut → freeze → sheath. Appuis déclarés : Jack the Ripper / Coupe HF.

Plan 1 : RAIDEN sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Jack the Ripper / Coupe HF ». Plan 2 : armer la lame ou le membre de « Jack the Ripper / Coupe HF » et dégager son arc. Plan 3 : enchaîner des coupes lisibles avec angles distincts ; les impacts et les réactions suivent le fil de lame, sans ajout d’arme d’une autre incarnation. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : fin de coupe et retour au garde ; Zandatsu seulement si le profil l’autorise, pose de signature face à l’adversaire.

##### Zandatsu

Famille `blade`, ton `stylized` ; 238 ticks CQC ; phases actuelles : dash → crosscut → freeze → sheath. Appuis déclarés : Jack the Ripper / Lame ascendante.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Jack the Ripper / Lame ascendante » ; l’espace disponible doit être lisible. Plan 2 : armer la lame ou le membre de « Jack the Ripper / Lame ascendante » et dégager son arc. Plan 3 : enchaîner des coupes lisibles avec angles distincts ; les impacts et les réactions suivent le fil de lame, sans ajout d’arme d’une autre incarnation. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : fin de coupe et retour au garde ; Zandatsu seulement si le profil l’autorise, arrêt du dispositif et retour au cadre d’ensemble.

##### Ripper End

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Jack the Ripper / Ninja Run.

Plan 1 : approche jusqu’à la distance réelle de « Jack the Ripper / Ninja Run », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Jack the Ripper / Ninja Run », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : fin de coupe et retour au garde ; Zandatsu seulement si le profil l’autorise, prise de distance et maintien final.

##### Lightning God

Famille `blade`, ton `stylized` ; 274 ticks CQC ; phases actuelles : dash → crosscut → freeze → sheath. Appuis déclarés : Jack the Ripper / Zandatsu — extraction limitée.

Plan 1 : après une observation ou un repli, RAIDEN reprend l’initiative par « Jack the Ripper / Zandatsu — extraction limitée ». Plan 2 : armer la lame ou le membre de « Jack the Ripper / Zandatsu — extraction limitée » et dégager son arc. Plan 3 : enchaîner des coupes lisibles avec angles distincts ; les impacts et les réactions suivent le fil de lame, sans ajout d’arme d’une autre incarnation. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : fin de coupe et retour au garde ; Zandatsu seulement si le profil l’autorise, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- [Final released canonical character render, downloaded unmodified and physically inspected.](https://www.creativeuncut.com/gallery-22/mgrr-raiden.html) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__sam

### JETSTREAM SAM — REVENGEANCE / MURASAMA

**Rôle :** Murasama : charge et riposte. **Profil :** `sam`.

**Base présente dans le code :** Sam : Murasama, dégainé chargé et provocation risquée, pas Zandatsu gratuit.

**Incarnation à conserver :** Samuel Rodrigues, right cybernetic arm, cream exosuit and red Murasama left trigger-scabbard

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `blade` = light, heavy, special, specialDown, specialForward, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `retro-msx`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** JETSTREAM SAM : katana, fourreau et prothèse de Jetstream Sam correctement différenciés. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** appuis de duel et impulsion de dégainé, torse stable. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Murasama : charge et riposte » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder katana, fourreau et prothèse de Jetstream Sam correctement différenciés.
- **jump_land :** JETSTREAM SAM : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. appuis de duel et impulsion de dégainé, torse stable. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de JETSTREAM SAM. Terminer par fin de coupe puis rangement/maintien cohérent du fourreau. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « REVENGEANCE / MURASAMA », présentation de Samuel Rodrigues, right cybernetic arm, cream exosuit and red Murasama left trigger-scabbard, puis katana, fourreau et prothèse de Jetstream Sam correctement différenciés. Geste court lié à « Iai — Murasama » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, fin de coupe puis rangement/maintien cohérent du fourreau ; JETSTREAM SAM vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à REVENGEANCE / MURASAMA.
- **round_loss :** Proposition CQC : JETSTREAM SAM réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Murasama — coupe finale », revenir par fin de coupe puis rangement/maintien cohérent du fourreau, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Contact de lame

**Existant :** `melee` / `blade` ; 7/3/12 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JETSTREAM SAM, préparer « Contact de lame » ; katana, fourreau et prothèse de Jetstream Sam correctement différenciés. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** fin de coupe puis rangement/maintien cohérent du fourreau. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Coupe engagée

**Existant :** `melee` / `blade` ; 18/5/24 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JETSTREAM SAM, préparer « Coupe engagée » ; katana, fourreau et prothèse de Jetstream Sam correctement différenciés. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** fin de coupe puis rangement/maintien cohérent du fourreau. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JETSTREAM SAM, préparer « Balayage » ; katana, fourreau et prothèse de Jetstream Sam correctement différenciés. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** fin de coupe puis rangement/maintien cohérent du fourreau.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JETSTREAM SAM, préparer « Projection » ; katana, fourreau et prothèse de Jetstream Sam correctement différenciés. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** fin de coupe puis rangement/maintien cohérent du fourreau. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Iai — Murasama

**Existant :** `melee` / `blade` ; 34/4/35 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JETSTREAM SAM, préparer « Iai — Murasama » ; katana, fourreau et prothèse de Jetstream Sam correctement différenciés. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** fin de coupe puis rangement/maintien cohérent du fourreau. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Dégainé télégraphié ; reculer ou parer, puis punir les 35 images de récupération.

##### specialDown — Coupe remontante

**Existant :** `melee` / `blade` ; 21/4/33 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JETSTREAM SAM, préparer « Coupe remontante » ; katana, fourreau et prothèse de Jetstream Sam correctement différenciés. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** fin de coupe puis rangement/maintien cohérent du fourreau. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer ou espacer ; la remontée est punissable en garde.

##### specialForward — Provocation

**Existant :** `buff` / `focus` ; 28/1/26 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JETSTREAM SAM, préparer « Provocation » ; katana, fourreau et prothèse de Jetstream Sam correctement différenciés. Montrer la préparation corporelle ou mécanique de « Provocation ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** fin de coupe puis rangement/maintien cohérent du fourreau. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre avant activation ou rester hors de portée. Pendant 2,5 s, la cible provoquée inflige 16 % de plus mais reçoit 20 % de plus ; les commandes humaines ne sont jamais forcées.

##### specialBack — Contre au fourreau

**Existant :** `parry` / `counter` ; 3/10/29 ticks ; groupe `parry`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JETSTREAM SAM, préparer « Contre au fourreau » ; katana, fourreau et prothèse de Jetstream Sam correctement différenciés. Présenter la surface ou l’organe de parade et maintenir une fenêtre courte lisible.

**Action.** Recevoir puis dévier au contact réel pour « Contre au fourreau » ; la riposte et son effet n’apparaissent qu’après succès. Une attente sans contact garde une pose différente du contre réussi.

**Retour.** fin de coupe puis rangement/maintien cohérent du fourreau. Séparer sortie ratée, blocage simple et riposte ; aucun effet de réussite avant collision.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Retarder la frappe, projeter ou attendre les 29 images de récupération.

##### super — Murasama — coupe finale

**Existant :** `melee` / `blade` ; 31/7/44 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JETSTREAM SAM, préparer « Murasama — coupe finale » ; katana, fourreau et prothèse de Jetstream Sam correctement différenciés. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** fin de coupe puis rangement/maintien cohérent du fourreau. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Reprendre son souffle

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JETSTREAM SAM, préparer « Reprendre son souffle » ; katana, fourreau et prothèse de Jetstream Sam correctement différenciés. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Reprendre son souffle ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** fin de coupe puis rangement/maintien cohérent du fourreau. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Quick Draw

Famille `blade`, ton `stylized` ; 220 ticks CQC ; phases actuelles : dash → crosscut → freeze → sheath. Appuis déclarés : Murasama — coupe finale / Iai — Murasama.

Plan 1 : JETSTREAM SAM sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Murasama — coupe finale / Iai — Murasama ». Plan 2 : armer la lame ou le membre de « Murasama — coupe finale / Iai — Murasama » et dégager son arc. Plan 3 : enchaîner des coupes lisibles avec angles distincts ; les impacts et les réactions suivent le fil de lame, sans ajout d’arme d’une autre incarnation. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : fin de coupe puis rangement/maintien cohérent du fourreau, pose de signature face à l’adversaire.

##### Muramasa Cross

Famille `blade`, ton `stylized` ; 238 ticks CQC ; phases actuelles : dash → crosscut → freeze → sheath. Appuis déclarés : Murasama — coupe finale / Coupe remontante.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Murasama — coupe finale / Coupe remontante » ; l’espace disponible doit être lisible. Plan 2 : armer la lame ou le membre de « Murasama — coupe finale / Coupe remontante » et dégager son arc. Plan 3 : enchaîner des coupes lisibles avec angles distincts ; les impacts et les réactions suivent le fil de lame, sans ajout d’arme d’une autre incarnation. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : fin de coupe puis rangement/maintien cohérent du fourreau, arrêt du dispositif et retour au cadre d’ensemble.

##### Taunt & Punish

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Murasama — coupe finale / Provocation.

Plan 1 : approche jusqu’à la distance réelle de « Murasama — coupe finale / Provocation », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Murasama — coupe finale / Provocation », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : fin de coupe puis rangement/maintien cohérent du fourreau, prise de distance et maintien final.

##### Red Sun Duel

Famille `blade`, ton `stylized` ; 274 ticks CQC ; phases actuelles : dash → crosscut → freeze → sheath. Appuis déclarés : Murasama — coupe finale / Projection.

Plan 1 : après une observation ou un repli, JETSTREAM SAM reprend l’initiative par « Murasama — coupe finale / Projection ». Plan 2 : armer la lame ou le membre de « Murasama — coupe finale / Projection » et dégager son arc. Plan 3 : enchaîner des coupes lisibles avec angles distincts ; les impacts et les réactions suivent le fil de lame, sans ajout d’arme d’une autre incarnation. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : fin de coupe puis rangement/maintien cohérent du fourreau, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- [Final released canonical character render, downloaded unmodified and physically inspected.](https://www.creativeuncut.com/gallery-22/mgrr-samuel.html) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__liquid

### LIQUID SNAKE — MGS1 / FOXHOUND

**Rôle :** Corps à corps sans arme spéciale. **Profil :** `brawler`.

**Base présente dans le code :** Liquid du toit de REX combat à mains nues dans ce règlement ; pas de machine invoquée.

**Incarnation à conserver :** Original PlayStation 1, shirtless final REX-roof duel

**État vérifié :** métadonnées natives avec limites. 72 régions source distinctes dans les deux directions ; groupes : idle, walk, guard, crouch, jump, punch, heavy, low, hit, ko, throw, charge, parry, recover, attack.

**Réemplois à examiner :** `low` = low, specialDown ; `throw` = throw, specialForward ; `charge` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `tuxedo`, `retro-msx`, `nextgen`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** LIQUID SNAKE : poids sur les jambes, épaules engagées, mains prêtes. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** transfert lourd mais anatomique, freinage par un appui réel. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Corps à corps sans arme spéciale » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder poids sur les jambes, épaules engagées, mains prêtes.
- **jump_land :** LIQUID SNAKE : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. transfert lourd mais anatomique, freinage par un appui réel. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de LIQUID SNAKE. Terminer par rétablir bassin et épaules après l’élan. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS1 / FOXHOUND », présentation de Original PlayStation 1, shirtless final REX-roof duel, puis poids sur les jambes, épaules engagées, mains prêtes. Geste court lié à « Poing de Liquid » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, rétablir bassin et épaules après l’élan ; LIQUID SNAKE vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS1 / FOXHOUND.
- **round_loss :** Proposition CQC : LIQUID SNAKE réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « REX — dernier duel », revenir par rétablir bassin et épaules après l’élan, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LIQUID SNAKE, préparer « Jab » ; poids sur les jambes, épaules engagées, mains prêtes. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** rétablir bassin et épaules après l’élan.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LIQUID SNAKE, préparer « Frappe engagée » ; poids sur les jambes, épaules engagées, mains prêtes. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** rétablir bassin et épaules après l’élan.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LIQUID SNAKE, préparer « Balayage » ; poids sur les jambes, épaules engagées, mains prêtes. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** rétablir bassin et épaules après l’élan.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LIQUID SNAKE, préparer « Projection » ; poids sur les jambes, épaules engagées, mains prêtes. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** rétablir bassin et épaules après l’élan. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Poing de Liquid

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `charge`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LIQUID SNAKE, préparer « Poing de Liquid » ; poids sur les jambes, épaules engagées, mains prêtes. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Poing de Liquid » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** rétablir bassin et épaules après l’élan.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialDown — Balayage du toit

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LIQUID SNAKE, préparer « Balayage du toit » ; poids sur les jambes, épaules engagées, mains prêtes. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** rétablir bassin et épaules après l’élan.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### specialForward — Prise du FOXHOUND

**Existant :** `melee` / `grapple` ; 10/3/32 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LIQUID SNAKE, préparer « Prise du FOXHOUND » ; poids sur les jambes, épaules engagées, mains prêtes. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** rétablir bassin et épaules après l’élan. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Hors de portée ou saut ; ne saisir ni cible aérienne ni cible sous protection post-projection.

##### specialBack — Contre de Liquid

**Existant :** `parry` / `counter` ; 3/10/29 ticks ; groupe `parry`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LIQUID SNAKE, préparer « Contre de Liquid » ; poids sur les jambes, épaules engagées, mains prêtes. Présenter la surface ou l’organe de parade et maintenir une fenêtre courte lisible.

**Action.** Recevoir puis dévier au contact réel pour « Contre de Liquid » ; la riposte et son effet n’apparaissent qu’après succès. Une attente sans contact garde une pose différente du contre réussi.

**Retour.** rétablir bassin et épaules après l’élan. Séparer sortie ratée, blocage simple et riposte ; aucun effet de réussite avant collision.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Retarder la frappe, projeter ou attendre les 29 images de récupération.

##### super — REX — dernier duel

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `charge`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LIQUID SNAKE, préparer « REX — dernier duel » ; poids sur les jambes, épaules engagées, mains prêtes. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « REX — dernier duel », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** rétablir bassin et épaules après l’élan.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Reprendre son souffle

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LIQUID SNAKE, préparer « Reprendre son souffle » ; poids sur les jambes, épaules engagées, mains prêtes. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Reprendre son souffle ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** rétablir bassin et épaules après l’élan. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Superior Genes

Famille `cqc`, ton `stylized` ; 220 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : REX — dernier duel / Poing de Liquid.

Plan 1 : LIQUID SNAKE sécurise son appui, regarde la cible et prépare l’outil ou le geste de « REX — dernier duel / Poing de Liquid ». Plan 2 : contact de saisie ou neutralisation lié à « REX — dernier duel / Poing de Liquid », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : rétablir bassin et épaules après l’élan, pose de signature face à l’adversaire.

##### REX Rooftop

Famille `cqc`, ton `stylized` ; 238 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : REX — dernier duel / Balayage du toit.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « REX — dernier duel / Balayage du toit » ; l’espace disponible doit être lisible. Plan 2 : contact de saisie ou neutralisation lié à « REX — dernier duel / Balayage du toit », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : rétablir bassin et épaules après l’élan, arrêt du dispositif et retour au cadre d’ensemble.

##### FOXHOUND Knockout

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : REX — dernier duel / Prise du FOXHOUND.

Plan 1 : approche jusqu’à la distance réelle de « REX — dernier duel / Prise du FOXHOUND », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « REX — dernier duel / Prise du FOXHOUND », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : rétablir bassin et épaules après l’élan, prise de distance et maintien final.

##### Not Yet Snake

Famille `cqc`, ton `stylized` ; 274 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : REX — dernier duel / Projection.

Plan 1 : après une observation ou un repli, LIQUID SNAKE reprend l’initiative par « REX — dernier duel / Projection ». Plan 2 : contact de saisie ou neutralisation lié à « REX — dernier duel / Projection », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : rétablir bassin et épaules après l’élan, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Accepted closest to observed original MGS1 incarnation, not a certified pixel-perfect 1:1 reproduction. Illustrated 2D body is adapted from original artwork and low-polygon original PS1 recordings.
- Combat costume deliberately follows the source profile REX-roof basis: shirtless, military olive trousers, long blond hair, dark belt, black fingerless gloves and combat boots. Official Konami coat artwork is identity-only, not copied as combat costume.
- Warm orange game lighting is translated to neutral fair skin and blond/olive base colors; exact source PS1 material pixels/texture values cannot be certified from the compressed LP video.
- Dark gloves and wrist cuffs are directly visible in original PS1 close-up805s and back poses815s/885s. Their exact fingerless trim/finger exposure remains an illustrative inference because compressed polygonal source hands do not resolve individual tips. No precise glove-cut 1:1 certification.
- Generated battle marks are subdued illustrative contusions/smudges. Original PS1 torso has a distressed injury texture whose exact shapes, side distribution and density are not reproduced pixel-for-pixel; no invented emblem/tattoo is intended.
- The source LP includes Twin Snakes comparison shots. At 950 seconds the footage visibly depicts Twin Snakes; that decoded frame is retained but rejected. Only individually inspected original PS1 frames 800/820/860/900/1000 are accepted references.
- Each facing is independently generated with no PNG mirroring. B-left originally had three wrong-facing frames, corrected by generation and then restored full-limb margins; all superseded attempts remain preserved.
- Attacks, grapples, breathing recovery and jump keyframes are local fighting-game adaptations, not claims of original MGS1 animation data, timings or movement controls.
- Ten authored combat slots share seven action groups. low/specialDown, throw/specialForward and charge/super share native keyframes while engine timing/resources/damage remain authoritative.
- Seventy-two independently drawn pose cells are six atlas files, not seventy-two new characters. Walk contacts alternate approximately; perspective/cloth/hair/smudges vary slightly across drawings and are not motion-capture certified.
- Runtime crop rectangles, foot/pelvis pivots, native alpha contours and a fixed standing scale must be measured against the actual separate body components by the integrator. The nominal 4x3 grid is imperfect; do not clip extended hands/sweep boots or wide falling/lying poses.
- Native transparency includes low-alpha antialias fringe. Some hidden RGB pixels in B-right are brown while actual empty-space alpha is zero; no background recolor/removal script is used.
- A frame may extend into a neighboring nominal grid rectangle; original PNG pixels/files must remain byte-identical and any exclusion belongs to renderer Canvas clip contours, not image edits.
- The old procedural visual fields have incorrect short brown hair/bandana/tactical outfit. This delivery replaces only core__liquid runtime drawing through an exact-UID PNG catalog entry; raw historical JSON is preserved.
- Source sheets use different native scales; fixed standing heights measured per PNG preserve crouch/jump/low/KO scale. Right/left standing stature is equalized, not motion-capture certified.
- All six original PNGs physically viewed plus primary Konami face/body and original PS1 selected800/820/860/900/1000/805s frames. Frame805 specifically supports dark gloves/poignets; fine fingerless cuts and exact source wound textures remain limits from generator review.
- Native Canvas clip contours isolate wide attack/falling bodies while excluding neighboring source figures; original PNGs are preserved without pixel edits.
- [Primary official original MGS1 character artwork. Full body is coat state and NOT the combat outfit; used for identity, long blond hair and human proportions only. Physically viewed.](https://www.konami.com/mg/archive/mgs/character/images/ch07_body.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Primary official original MGS1 face art. Blond swept-back shoulder-length hair, fair angular clean-shaven face, no bandana. Physically viewed.](https://www.konami.com/mg/archive/mgs/character/images/ch07_face.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original PS1 bare-torso Liquid side cutscene; shoulder/nape hair shape and human anatomy. Physically inspected against original low-polygon model/HUD. PNG decoded at recording resolution without image transformation; recording is not a native PS1 framebuffer certification.](https://archive.org/download/LP-Metal-Gear-Solid/Metal%20Gear%20Solid%20%2315-1%20-%20Cat%20Commentary%20%28Uncut%20Commentary%29-jDGJxa8vy-s.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original PS1 close-up of Liquid torso/waist/arms/hands shows dark gloves and short wrist cuffs distinct from orange-lit bare forearms. Exact fingerless cut is not resolved by this compressed polygonal image. Physically inspected against original low-polygon model/HUD. PNG decoded at recording resolution without image transformation; recording is not a native PS1 framebuffer certification.](https://archive.org/download/LP-Metal-Gear-Solid/Metal%20Gear%20Solid%20%2315-1%20-%20Cat%20Commentary%20%28Uncut%20Commentary%29-jDGJxa8vy-s.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original PS1 full back cutscene pose: long blond nape/shoulder hair, distressed bare torso, trouser belt and dark gloved hands at sides. Physically inspected against original low-polygon model/HUD. PNG decoded at recording resolution without image transformation; recording is not a native PS1 framebuffer certification.](https://archive.org/download/LP-Metal-Gear-Solid/Metal%20Gear%20Solid%20%2315-1%20-%20Cat%20Commentary%20%28Uncut%20Commentary%29-jDGJxa8vy-s.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original PS1 bare-torso Liquid profile, long blond hair, battle-worn torso; no jacket or shirt. Physically inspected against original low-polygon model/HUD. PNG decoded at recording resolution without image transformation; recording is not a native PS1 framebuffer certification.](https://archive.org/download/LP-Metal-Gear-Solid/Metal%20Gear%20Solid%20%2315-1%20-%20Cat%20Commentary%20%28Uncut%20Commentary%29-jDGJxa8vy-s.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original PS1 frontal Liquid close-up at REX rooftop, original timer, blond swept-back shoulder-length hair, shirtless torso and dark belt/gloves. Physically inspected against original low-polygon model/HUD. PNG decoded at recording resolution without image transformation; recording is not a native PS1 framebuffer certification.](https://archive.org/download/LP-Metal-Gear-Solid/Metal%20Gear%20Solid%20%2315-1%20-%20Cat%20Commentary%20%28Uncut%20Commentary%29-jDGJxa8vy-s.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original PS1 rear three-quarter close pose: dark glove/wrist contrasting bare forearm, long blond hair and original trouser/belt state. Physically inspected against original low-polygon model/HUD. PNG decoded at recording resolution without image transformation; recording is not a native PS1 framebuffer certification.](https://archive.org/download/LP-Metal-Gear-Solid/Metal%20Gear%20Solid%20%2315-1%20-%20Cat%20Commentary%20%28Uncut%20Commentary%29-jDGJxa8vy-s.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__mantis

### PSYCHO MANTIS — MGS1 / FOXHOUND

**Rôle :** Télékinésie bornée et mobilité. **Profil :** `psychic`.

**Base présente dans le code :** Psycho Mantis : télékinésie et lecture de l’intention visibles ; aucune inspection d’inputs futurs.

**Incarnation à conserver :** Metal Gear Solid 1998 original PlayStation 1 masked FOXHOUND boss

**État vérifié :** métadonnées natives avec limites. 72 régions source distinctes dans les deux directions ; groupes : idle, walk, guard, crouch, jump, punch, heavy, low, hit, ko, shoot, deploy, parry, recover, attack.

**Réemplois à examiner :** `shoot` = throw, special, super ; `parry` = specialForward, specialBack.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `retro-msx`, `tuxedo`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** PSYCHO MANTIS : regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** mouvement et éventuelle sustentation distingués de l’effet psychique. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Télékinésie bornée et mobilité » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile.
- **jump_land :** PSYCHO MANTIS : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. mouvement et éventuelle sustentation distingués de l’effet psychique. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de PSYCHO MANTIS. Terminer par cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS1 / FOXHOUND », présentation de Metal Gear Solid 1998 original PlayStation 1 masked FOXHOUND boss, puis regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Geste court lié à « Débris télékinétiques » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, cesser le geste de concentration puis revenir à la posture propre à l’incarnation ; PSYCHO MANTIS vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS1 / FOXHOUND.
- **round_loss :** Proposition CQC : PSYCHO MANTIS réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Psychokinésie », revenir par cesser le geste de concentration puis revenir à la posture propre à l’incarnation, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PSYCHO MANTIS, préparer « Jab » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PSYCHO MANTIS, préparer « Frappe engagée » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PSYCHO MANTIS, préparer « Balayage » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PSYCHO MANTIS, préparer « Projection » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Débris télékinétiques

**Existant :** `projectile` / `psychic` ; 27/1/30 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PSYCHO MANTIS, préparer « Débris télékinétiques » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Donner à la source de « Débris télékinétiques » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet psychic de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Projectile lent et visible : sauter, bloquer ou détruire avec une attaque.

##### specialDown — Entrave mentale

**Existant :** `projectile` / `bind` ; 32/1/34 ticks ; groupe `deploy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PSYCHO MANTIS, préparer « Entrave mentale » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Donner à la source de « Entrave mentale » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet bind de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut ou garde basse ; ralentissement bref, aucune confiscation des commandes.

##### specialForward — Déplacement de Mantis

**Existant :** `mobility` / `psychic` ; 23/1/28 ticks ; groupe `parry`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PSYCHO MANTIS, préparer « Déplacement de Mantis » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Préparer l’appui qui produit le déplacement ; mouvement et éventuelle sustentation distingués de l’effet psychique.

**Action.** Exécuter « Déplacement de Mantis » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Départ et arrivée indiqués ; pas de téléportation derrière la cible ni hors arène.

##### specialBack — Déviation psychique

**Existant :** `parry` / `counter` ; 5/12/28 ticks ; groupe `parry`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PSYCHO MANTIS, préparer « Déviation psychique » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Présenter la surface ou l’organe de parade et maintenir une fenêtre courte lisible.

**Action.** Recevoir puis dévier au contact réel pour « Déviation psychique » ; la riposte et son effet n’apparaissent qu’après succès. Une attente sans contact garde une pose différente du contre réussi.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Séparer sortie ratée, blocage simple et riposte ; aucun effet de réussite avant collision.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Projections, attaques au corps à corps et explosifs au sol ne sont pas renvoyés.

##### super — Psychokinésie

**Existant :** `projectile` / `psychic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PSYCHO MANTIS, préparer « Psychokinésie » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Donner à la source de « Psychokinésie » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet psychic de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet. La salve contient 5 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 5 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Stabiliser la réserve

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PSYCHO MANTIS, préparer « Stabiliser la réserve » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Stabiliser la réserve ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Blackout

Famille `psychic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : lift → orbit → crush → drop. Appuis déclarés : Psychokinésie / Débris télékinétiques.

Plan 1 : PSYCHO MANTIS sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Psychokinésie / Débris télékinétiques ». Plan 2 : montrer la source corporelle ou matérielle de « Psychokinésie / Débris télékinétiques ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, pose de signature face à l’adversaire.

##### Memory Read

Famille `psychic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : lift → orbit → crush → drop. Appuis déclarés : Psychokinésie / Entrave mentale.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Psychokinésie / Entrave mentale » ; l’espace disponible doit être lisible. Plan 2 : montrer la source corporelle ou matérielle de « Psychokinésie / Entrave mentale ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, arrêt du dispositif et retour au cadre d’ensemble.

##### Telekinetic Burial

Famille `psychic`, ton `stylized` ; 256 ticks CQC ; phases actuelles : lift → orbit → crush → drop. Appuis déclarés : Psychokinésie / Déplacement de Mantis.

Plan 1 : approche jusqu’à la distance réelle de « Psychokinésie / Déplacement de Mantis », arme et main libre identifiées. Plan 2 : montrer la source corporelle ou matérielle de « Psychokinésie / Déplacement de Mantis ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, prise de distance et maintien final.

##### Controller Port Two

Famille `psychic`, ton `stylized` ; 274 ticks CQC ; phases actuelles : lift → orbit → crush → drop. Appuis déclarés : Psychokinésie / Projection.

Plan 1 : après une observation ou un repli, PSYCHO MANTIS reprend l’initiative par « Psychokinésie / Projection ». Plan 2 : montrer la source corporelle ou matérielle de « Psychokinésie / Projection ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, rangement/pose finale différente des trois autres.

#### Limites et preuves

- 2D illustrated adaptation of official art and compressed original PS1 640x480 capture; not certified native PS1 pixel reproduction.
- Jab, heavy, low, physical throw, jump and bounded teleport/parry/recovery are original versus adaptation; timings inherited unchanged.
- Exact rear restraint strap construction and fingertip/glove cut only partly resolved by PS1 polygons; generated closest with documented inference.
- Costume follows both original Konami official artwork and original PS1 game: never TwinSnakes/GameCube, ScreamingMantis/MGS4, modern figure or remake. Sketch-red strokes never become literal red body trim. Capture1400s depicts TwinSnakes comparison;1600s onward hunting-game inserts; all preserved locally and rejected as Mantis reference.
- 2D detailed illustration is accepted closest to observed canon, not a 1:1 certified reproduction of original PS1 material values, model topology, skeletal proportions or native animation. Warm/green scene lighting translated to neutral pale skin and charcoal gear.
- Individual restraint straps/buckle shapes and fingertip exposure are partly interpreted because PS1 textures/recording compression and original painting do not resolve them. Exact opposing-side hidden strap topology and finger count are not certified.
- Each direction independently generated; never PNG mirrored. First two leftAattempts rejected for mixed facing, retained native unchanged. Allfinalsix sources physically viewed and bounded checks have no opaqueedge48clipping.
- Shoot is runtime action alias for emptyhand telekinetic gesture, never firearm. Throw and super share this psychickinesis gesture as explicit authored versus adaptation; no rifle, handgun, sword or puppet held.
- Low normal B6..8 is boot sweep; lowmentalbinding specialDown uses C3..5 deploygesture, deliberately separate. Teleport specialForward and parry specialBack share C6..8phase/deflection gesture with engine’s distinct bounded timings/displacement/counter behavior authoritative. Not original PS1 animation mapping certification.
- No debris/psychicparticles baked into body sheets, no purple magicorb/aura. Original chair/bust/portrait objects may be rendered separately with source-reviewed prop atlas. Body gesture alone does not certify each projectile prop.
- Jump and movement are authored levitation-based versus keyframes; exact foot contact alternation not originalPS1motioncapture. KO retains masked form, excludes source death unmasking and headscars.
- Runtime upright scale is constant per PNG from actual standing bodyheight. Crouch/KO must not stretch to standingheight; native PNGbytes never altered. Reviewed Canvasrect/clipPolygon metadata protects neighboring alpha without editing artwork.
- Physical sprite review covers art and canonical source correspondence, not live runtime/mobile/phase renderer QA; importer/integrator supplies independent technical proof.
- 2D illustrated adaptation of official art and compressed original PS1 640x480 capture; not certified native PS1 pixel reproduction.
- Jab, heavy, low, physical throw, jump and bounded teleport/parry/recovery are original versus adaptation; timings inherited unchanged.
- Exact rear restraint strap construction and fingertip/glove cut only partly resolved by PS1 polygons; generated closest with documented inference.
- Costume follows both original Konami official artwork and original PS1 game: never TwinSnakes/GameCube, ScreamingMantis/MGS4, modern figure or remake. Sketch-red strokes never become literal red body trim. Capture1400s depicts TwinSnakes comparison;1600s onward hunting-game inserts; all preserved locally and rejected as Mantis reference.
- 2D detailed illustration is accepted closest to observed canon, not a 1:1 certified reproduction of original PS1 material values, model topology, skeletal proportions or native animation. Warm/green scene lighting translated to neutral pale skin and charcoal gear.
- Individual restraint straps/buckle shapes and fingertip exposure are partly interpreted because PS1 textures/recording compression and original painting do not resolve them. Exact opposing-side hidden strap topology and finger count are not certified.
- Each direction independently generated; never PNG mirrored. First two leftAattempts rejected for mixed facing, retained native unchanged. Allfinalsix sources physically viewed and bounded checks have no opaqueedge48clipping.
- Shoot is runtime action alias for emptyhand telekinetic gesture, never firearm. Throw and super share this psychickinesis gesture as explicit authored versus adaptation; no rifle, handgun, sword or puppet held.
- Low normal B6..8 is boot sweep; lowmentalbinding specialDown uses C3..5 deploygesture, deliberately separate. Teleport specialForward and parry specialBack share C6..8phase/deflection gesture with engine’s distinct bounded timings/displacement/counter behavior authoritative. Not original PS1 animation mapping certification.
- No debris/psychicparticles baked into body sheets, no purple magicorb/aura. Original chair/bust/portrait objects may be rendered separately with source-reviewed prop atlas. Body gesture alone does not certify each projectile prop.
- Jump and movement are authored levitation-based versus keyframes; exact foot contact alternation not originalPS1motioncapture. KO retains masked form, excludes source death unmasking and headscars.
- Runtime upright scale is constant per PNG from actual standing bodyheight. Crouch/KO must not stretch to standingheight; native PNGbytes never altered. Reviewed Canvasrect/clipPolygon metadata protects neighboring alpha without editing artwork.
- Physical sprite review covers art and canonical source correspondence, not live runtime/mobile/phase renderer QA; importer/integrator supplies independent technical proof.
- Integrator physically viewed Konami ch11 body art and original PS1 captures1230/1280/150s; other retained producer reference files retain their supplied physical-review attribution.
- [Original MGS1 Konami artwork, not TwinSnakes. Red lines are expressive art strokes, not literal costume stripe.](https://www.konami.com/mg/archive/mgs/character/images/ch11_body.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original MGS1 Konami artwork, not TwinSnakes. Red lines are expressive art strokes, not literal costume stripe.](https://www.konami.com/mg/archive/mgs/character/images/ch11_face.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original PS1 side torso/arms: pale shoulders exposed; fitted sleeveless dark ribbed top; black forearm/upper-elbow sleeves; bare finger tips; central cartridge mask.](https://archive.org/download/LP-Metal-Gear-Solid/Metal%20Gear%20Solid%20%236-1%20-%20Peep%20That%20Poop%20Pipe%20%28Uncut%20Commentary%29-tBviuqZ9_yo.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original PS1 full-front torso: central black respirator canister, amber eye lenses, slim build, sleeveless top and waist restraint harness.](https://archive.org/download/LP-Metal-Gear-Solid/Metal%20Gear%20Solid%20%236-1%20-%20Peep%20That%20Poop%20Pipe%20%28Uncut%20Commentary%29-tBviuqZ9_yo.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original PS1 close mask face: black compact gasmask, two amber lenses, pale bald skin; no green glowing goggles or hoses.](https://archive.org/download/LP-Metal-Gear-Solid/Metal%20Gear%20Solid%20%236-1%20-%20Peep%20That%20Poop%20Pipe%20%28Uncut%20Commentary%29-tBviuqZ9_yo.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original PS1 full front body levitation above desk: long dark fitted trousers, high strapped boots, slender proportions, hands empty.](https://archive.org/download/LP-Metal-Gear-Solid/Metal%20Gear%20Solid%20%236-1%20-%20Peep%20That%20Poop%20Pipe%20%28Uncut%20Commentary%29-tBviuqZ9_yo.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original PS1 rear mask straps on bald pale skull: vertical crown strip joins horizontal rear straps; no hair.](https://archive.org/download/LP-Metal-Gear-Solid/Metal%20Gear%20Solid%20%236-1%20-%20Peep%20That%20Poop%20Pipe%20%28Uncut%20Commentary%29-tBviuqZ9_yo.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original PS1 rear-side head: harness straps on bald skull, pale ear, central cartridge forward. Anatomical sides not uniquely resolved by art.](https://archive.org/download/LP-Metal-Gear-Solid/Metal%20Gear%20Solid%20%236-1%20-%20Peep%20That%20Poop%20Pipe%20%28Uncut%20Commentary%29-tBviuqZ9_yo.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__wolf

### SNIPER WOLF — MGS1 / FOXHOUND

**Rôle :** Longue portée et exposition. **Profil :** `sniper`.

**Base présente dans le code :** Sniper Wolf : patience et précision ; pas de mobilité parasite de Quiet. Le PSG1 original est un fusil de précision conventionnel, pas une arme électromagnétique.

**Incarnation à conserver :** Original PlayStation 1, original Sniper Wolf outfit and PSG1; not Twin Snakes

**État vérifié :** métadonnées natives avec limites. 72 régions source distinctes dans les deux directions ; groupes : idle, walk, guard, crouch, jump, punch, heavy, low, hit, ko, throw, shoot, reload, optic, attack.

**Réemplois à examiner :** `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `retro-msx`, `tuxedo`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** SNIPER WOLF : carabine épaulée avec contact joue/crosse et œil cohérent. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** déplacement qui sécurise le long canon et stoppe avant la visée. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Longue portée et exposition » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder carabine épaulée avec contact joue/crosse et œil cohérent.
- **jump_land :** SNIPER WOLF : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. déplacement qui sécurise le long canon et stoppe avant la visée. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de SNIPER WOLF. Terminer par recul, éventuel réarmement propre au modèle, réacquisition de cible. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS1 / FOXHOUND », présentation de Original PlayStation 1, original Sniper Wolf outfit and PSG1; not Twin Snakes, puis carabine épaulée avec contact joue/crosse et œil cohérent. Geste court lié à « PSG1 » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, recul, éventuel réarmement propre au modèle, réacquisition de cible ; SNIPER WOLF vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS1 / FOXHOUND.
- **round_loss :** Proposition CQC : SNIPER WOLF réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Dernier tir de Wolf », revenir par recul, éventuel réarmement propre au modèle, réacquisition de cible, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SNIPER WOLF, préparer « Jab » ; carabine épaulée avec contact joue/crosse et œil cohérent. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SNIPER WOLF, préparer « Frappe engagée » ; carabine épaulée avec contact joue/crosse et œil cohérent. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SNIPER WOLF, préparer « Balayage » ; carabine épaulée avec contact joue/crosse et œil cohérent. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SNIPER WOLF, préparer « Projection » ; carabine épaulée avec contact joue/crosse et œil cohérent. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — PSG1

**Existant :** `projectile` / `precision` ; 46/1/47 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SNIPER WOLF, préparer « PSG1 » ; carabine épaulée avec contact joue/crosse et œil cohérent. Montrer la prise et la visée de l’arme décrite par « PSG1 » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Repère de visée du versus ; tir haut annoncé pendant 46 images, accroupissement ou approche pendant la préparation.

##### specialDown — Pas de garde

**Existant :** `mobility` / `movement` ; 7/18/25 ticks ; groupe `crouch`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SNIPER WOLF, préparer « Pas de garde » ; carabine épaulée avec contact joue/crosse et œil cohérent. Préparer l’appui qui produit le déplacement ; déplacement qui sécurise le long canon et stoppe avant la visée.

**Action.** Exécuter « Pas de garde » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 4 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : La silhouette reste touchable ; la sortie est punissable.

##### specialForward — Observer la cible

**Existant :** `mark` / `recon` ; 26/1/30 ticks ; groupe `optic`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SNIPER WOLF, préparer « Observer la cible » ; carabine épaulée avec contact joue/crosse et œil cohérent. Orienter regard, optique ou terminal vers la cible observée, sans consulter une action future.

**Action.** Pour « Observer la cible », déclencher lecture/repérage avec un petit geste ou changement d’optique et un indicateur séparé. Le corps doit rester visible et vulnérable selon les données de combat.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible. Couper le signal ou abaisser l’outil ; retour vers l’adversaire sans nouvelle arme inventée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Portée limitée ; le marquage ne vise ni à travers toute l’arène ni automatiquement.

##### specialBack — Changer d’abri

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `walk`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SNIPER WOLF, préparer « Changer d’abri » ; carabine épaulée avec contact joue/crosse et œil cohérent. Préparer l’appui qui produit le déplacement ; déplacement qui sécurise le long canon et stoppe avant la visée.

**Action.** Exécuter « Changer d’abri » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Dernier tir de Wolf

**Existant :** `projectile` / `precision` ; 55/1/50 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SNIPER WOLF, préparer « Dernier tir de Wolf » ; carabine épaulée avec contact joue/crosse et œil cohérent. Montrer la prise et la visée de l’arme décrite par « Dernier tir de Wolf » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Un tir de PSG1 consomme une cartouche et la jauge du super ; préparation longue, garde, esquive ou parade de projectile.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SNIPER WOLF, préparer « Recharger » ; carabine épaulée avec contact joue/crosse et œil cohérent. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### One Breath

Famille `sniper`, ton `stylized` ; 220 ticks CQC ; phases actuelles : mark → steady → shot → fade. Appuis déclarés : Dernier tir de Wolf / PSG1.

Plan 1 : SNIPER WOLF sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Dernier tir de Wolf / PSG1 ». Plan 2 : présenter l’arme effectivement associée à « Dernier tir de Wolf / PSG1 », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : recul, éventuel réarmement propre au modèle, réacquisition de cible, pose de signature face à l’adversaire.

##### Snowfield Mark

Famille `sniper`, ton `stylized` ; 238 ticks CQC ; phases actuelles : mark → steady → shot → fade. Appuis déclarés : Dernier tir de Wolf / Pas de garde.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Dernier tir de Wolf / Pas de garde » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Dernier tir de Wolf / Pas de garde », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : recul, éventuel réarmement propre au modèle, réacquisition de cible, arrêt du dispositif et retour au cadre d’ensemble.

##### PSG-1 Finale

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Dernier tir de Wolf / Observer la cible.

Plan 1 : approche jusqu’à la distance réelle de « Dernier tir de Wolf / Observer la cible », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Dernier tir de Wolf / Observer la cible », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : recul, éventuel réarmement propre au modèle, réacquisition de cible, prise de distance et maintien final.

##### Wolf’s Mercy

Famille `sniper`, ton `stylized` ; 274 ticks CQC ; phases actuelles : mark → steady → shot → fade. Appuis déclarés : Dernier tir de Wolf / Projection.

Plan 1 : après une observation ou un repli, SNIPER WOLF reprend l’initiative par « Dernier tir de Wolf / Projection ». Plan 2 : présenter l’arme effectivement associée à « Dernier tir de Wolf / Projection », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : recul, éventuel réarmement propre au modèle, réacquisition de cible, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Target is 1:1 original 1998 MGS1 PS1 identity, clothes and PSG1; accepted closest illustrated 2D implementation, not certified pixel-perfect reconstruction of original art, textures or polygon geometry.
- Official body/face art is small (163 pixels wide), entire PSG1 inventory silhouette is 130x88 and original recordings are compressed 514x360/640x480. Exact jacket/trouser color values, patches' lettering, glove/boot seams and all rifle screws/magazine geometry cannot be certified.
- Source original PS1 episode7 frames1360 and1390 show yellow shoulder patches on both anatomical sleeves. Generated patch contours are illustrative and not exact source logo pixels.
- PSG1 is the only weapon; original episode7frame1370 shows anatomical right trigger/grip and left fore-end. No permanent laser accessory, railgun, knife or pistol is established or drawn.
- C-right shoot and focused optic frames use a more frontal torso with head/barrel facing right; screen-left rear grip/right shoulder correspond to anatomical right. This is a deliberate frontal projection compromise rather than an exact orthographic right profile. C-left independently depicts left-facing aim with the near right rear grip/stock arm and far left fore-end support.
- Right-handed firearm handling is the canon aim target; free-hand jab/heavy/grapple and rifle-carrying during melee are authored Versus interpretations. Exact punch hand and elbow projection vary across illustrated poses; they are not original MGS1 boss animations.
- Walk drawings are distinct, but exact alternating anatomical contact feet and gait continuity are not certified. The four native walk indices preserve all attempts and need runtime motion review.
- Shoot/recoil, jump, guard, crouch retreat, sweep, hit, KO, grapple, scope and reload phases are authored Versus keyframes, not extracted original PS1 animation timing/data.
- Reload frames show removal/magazine handling and receiver maintenance; exact insertion depth, empty-well state and charging action are an illustrative approximation. C-left recovery remains shouldered and stabilizes after shot. No claim of mechanically exact full PSG1 reloading footage.
- All facings are independently generated; no native PNG is mirrored, repainted, cropped, resized or alpha-edited. Hair, cloth, skin and gun proportions vary slightly between drawings.
- Root's additional read-only C-sheet inspection found red-looking antialias fringe with alpha no greater than4 and zero red fringe at alpha48; this is not treated as a canonical red equipment piece. Native antialias pixels remain preserved.
- Nominal 4x3 layout is descriptive only. Bodies/gun muzzles can extend across nominal cell lines. Integrator must measure actual isolated alpha contours, full component crops, foot/pelvis pivots, muzzle/grip origins and fixed upright scale before runtime approval.
- 12 major alpha48 body/equipment components and zero alpha48 outer-edge pixels are measured in each selected native PNG. Small detached antialias fragments are possible; no clipping claim is made solely from threshold48 analysis.
- Generated Meryl style-only source and prior Wolf continuity sheets are explicitly excluded from canonical evidence. Original archive videos were sampled remotely; local PNG SHA256 is verified, full-video SHA256 is not claimed.
- Original PS1 and Twin Snakes UIDs stay separate. This delivery covers only core__wolf; historical V3 files and unrelated original source records remain preserved.
- Ten authored moves share native groups: special/super share shoot; specialDown uses crouch; specialBack uses walk. Engine timing/resources/damage are authoritative. The laser line is a Versus target telegraph, not a certified PSG1 attachment.
- Integrator viewed all seven selected canonical image files and all six native PNGs with complete hair, hands, PSG1 and boots. Pixel/model identity is closest supported, not absolutely certified.
- Source C-right intentionally uses a partially frontal torso for anatomical right grip/right shoulder and left support while the head/barrel aim right; C-left is an independent native drawing. No horizontal image reflection is used.
- Melee/grapple/gait/reload and phase timing remain illustrative Versus adaptations. Exact magazine insertion and gait anatomical contact alternation are not mechanically certified.
- Fixed upright source scales are measured once per sheet; crouch, recoil and low poses retain their native shorter geometry. Muzzle points are approximate observed pixels for root-owned projectile drawing.
- [Official Konami original MGS1 full-body Shinkawa art: long ash-blonde hair, open gray/olive combat jacket, choker, yellow shoulder patches, full fitted trousers, knee/boot shapes. Gun barrel partially constrained by artwork; inventory fills entire silhouette.](https://www.konami.com/mg/archive/mgs/character/images/ch10_body.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Official original MGS1 face artwork: ash-blonde hair, fair angular adult face and eye/hair identity; not a later game or Twin Snakes model.](https://www.konami.com/mg/archive/mgs/character/images/ch10_face.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original MGS1 inventory PSG1 image reproduced by MetalGearSolid.be: complete stock, straight box magazine, scope, receiver and barrel silhouette. Low-resolution source cannot certify every mechanical detail.](https://www.metalgearsolid.be/images/psg1.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original PS1 frontal Wolf chest/face/costume with anatomical RIGHT yellow sleeve patch (image LEFT), neutral muted gray/olive clothing and ash-blonde hair.](https://archive.org/download/LP-Metal-Gear-Solid/Metal%20Gear%20Solid%20%237%20-%20Bowl_Bull%20%28Uncut%20Commentary%29-XBGhAZ4l0bw.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original PS1 frontal Wolf torso to upper legs with PSG1; anatomical RIGHT rear trigger/grip hand image LEFT and LEFT fore-end support image RIGHT. Open jacket, dark choker and original clothes visible; lower legs and barrel edge not completely resolved.](https://archive.org/download/LP-Metal-Gear-Solid/Metal%20Gear%20Solid%20%237%20-%20Bowl_Bull%20%28Uncut%20Commentary%29-XBGhAZ4l0bw.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original PS1 three-quarter side Wolf/Snake scene showing matching yellow patch on anatomical LEFT sleeve (image RIGHT), confirming both sleeve patches across independently inspected views.](https://archive.org/download/LP-Metal-Gear-Solid/Metal%20Gear%20Solid%20%237%20-%20Bowl_Bull%20%28Uncut%20Commentary%29-XBGhAZ4l0bw.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original PS1 full lying Wolf body after snowy-field boss; complete legs/dark boots, original hair/jacket/trousers and nearby PSG1. Low-poly compressed recording limits small footwear detail.](https://archive.org/download/LP-Metal-Gear-Solid/Metal%20Gear%20Solid%20%2311%20-%20Steamed%20%28Uncut%20Commentary%29-w7g8o1rbU9c.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).
