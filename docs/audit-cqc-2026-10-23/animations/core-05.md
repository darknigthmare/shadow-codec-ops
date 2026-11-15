# Animations — CORE

**10 acteurs du registre courant.** Les titres d’actions et paramètres sont observés ; les descriptions sont des propositions CQC à produire et valider. Un groupe de frames existant ne certifie pas l’ensemble du mouvement ou sa fidélité originale.

[Index des fiches](README.md) · [Contrat commun](../04_ANIMATIONS_SPRITES.md)

## Sommaire

- [GRAY FOX — MG2](#core__fox_mg2) — METAL GEAR 2 / DUEL À MAINS NUES
- [BIG BOSS — MG2](#core__bigboss_mg2) — METAL GEAR 2 / ZANZIBAR LAND
- [NAKED SNAKE — PORTABLE OPS](#core__snake_mpo) — PORTABLE OPS / SAN HIERONYMO
- [NULL](#core__null_mpo) — PORTABLE OPS / PERFECT SOLDIER
- [PYTHON](#core__python_mpo) — PORTABLE OPS / FOX
- [GENE](#core__gene) — PORTABLE OPS / FOX COMMANDER
- [SOLID SNAKE — GHOST BABEL](#core__snake_gb) — GHOST BABEL / INFILTRATION
- [SLASHER HAWK](#core__hawk) — GHOST BABEL / BLACK CHAMBER
- [MARIONETTE OWL](#core__owl) — GHOST BABEL / BLACK CHAMBER
- [PYRO BISON](#core__pyro) — GHOST BABEL / BLACK CHAMBER

## core__fox_mg2

### GRAY FOX — MG2 — METAL GEAR 2 / DUEL À MAINS NUES

**Rôle :** Corps à corps sans arme spéciale. **Profil :** `brawler`.

**Base présente dans le code :** Gray Fox au champ de mines de MG2 combat à mains nues ; lame HF exclue.

**Incarnation à conserver :** Human GrayFox1999 Zanzibar boxing appearance, modernNG interpretation of original MSX2 palette and revised official MG2 portrait.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, special, specialDown, super ; `throw` = throw, specialForward.

**Techniques pointant sur une seule région native dans la direction principale :** specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `tuxedo`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** GRAY FOX — MG2 : poids sur les jambes, épaules engagées, mains prêtes. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** transfert lourd mais anatomique, freinage par un appui réel. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Corps à corps sans arme spéciale » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder poids sur les jambes, épaules engagées, mains prêtes.
- **jump_land :** GRAY FOX — MG2 : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. transfert lourd mais anatomique, freinage par un appui réel. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de GRAY FOX — MG2. Terminer par rétablir bassin et épaules après l’élan. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « METAL GEAR 2 / DUEL À MAINS NUES », présentation de Human GrayFox1999 Zanzibar boxing appearance, modernNG interpretation of original MSX2 palette and revised official MG2 portrait., puis poids sur les jambes, épaules engagées, mains prêtes. Geste court lié à « Poing de Frank » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, rétablir bassin et épaules après l’élan ; GRAY FOX — MG2 vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à METAL GEAR 2 / DUEL À MAINS NUES.
- **round_loss :** Proposition CQC : GRAY FOX — MG2 réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Champ de mines — CQC », revenir par rétablir bassin et épaules après l’élan, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GRAY FOX — MG2, préparer « Jab » ; poids sur les jambes, épaules engagées, mains prêtes. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** rétablir bassin et épaules après l’élan.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GRAY FOX — MG2, préparer « Frappe engagée » ; poids sur les jambes, épaules engagées, mains prêtes. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** rétablir bassin et épaules après l’élan.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GRAY FOX — MG2, préparer « Balayage » ; poids sur les jambes, épaules engagées, mains prêtes. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** rétablir bassin et épaules après l’élan.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GRAY FOX — MG2, préparer « Projection » ; poids sur les jambes, épaules engagées, mains prêtes. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** rétablir bassin et épaules après l’élan. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Poing de Frank

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GRAY FOX — MG2, préparer « Poing de Frank » ; poids sur les jambes, épaules engagées, mains prêtes. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Poing de Frank » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** rétablir bassin et épaules après l’élan.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialDown — Balayage de Fox

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GRAY FOX — MG2, préparer « Balayage de Fox » ; poids sur les jambes, épaules engagées, mains prêtes. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** rétablir bassin et épaules après l’élan.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### specialForward — Projection de Fox

**Existant :** `melee` / `grapple` ; 10/3/32 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GRAY FOX — MG2, préparer « Projection de Fox » ; poids sur les jambes, épaules engagées, mains prêtes. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** rétablir bassin et épaules après l’élan. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Hors de portée ou saut ; ne saisir ni cible aérienne ni cible sous protection post-projection.

##### specialBack — Contre du duel

**Existant :** `parry` / `counter` ; 3/10/29 ticks ; groupe `parry`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GRAY FOX — MG2, préparer « Contre du duel » ; poids sur les jambes, épaules engagées, mains prêtes. Présenter la surface ou l’organe de parade et maintenir une fenêtre courte lisible.

**Action.** Recevoir puis dévier au contact réel pour « Contre du duel » ; la riposte et son effet n’apparaissent qu’après succès. Une attente sans contact garde une pose différente du contre réussi.

**Retour.** rétablir bassin et épaules après l’élan. Séparer sortie ratée, blocage simple et riposte ; aucun effet de réussite avant collision.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Retarder la frappe, projeter ou attendre les 29 images de récupération.

##### super — Champ de mines — CQC

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GRAY FOX — MG2, préparer « Champ de mines — CQC » ; poids sur les jambes, épaules engagées, mains prêtes. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Champ de mines — CQC », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** rétablir bassin et épaules après l’élan.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Reprendre son souffle

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GRAY FOX — MG2, préparer « Reprendre son souffle » ; poids sur les jambes, épaules engagées, mains prêtes. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Reprendre son souffle ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** rétablir bassin et épaules après l’élan. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Minefield Duel

Famille `cqc`, ton `stylized` ; 220 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Champ de mines — CQC / Poing de Frank.

Plan 1 : GRAY FOX — MG2 sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Champ de mines — CQC / Poing de Frank ». Plan 2 : contact de saisie ou neutralisation lié à « Champ de mines — CQC / Poing de Frank », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : rétablir bassin et épaules après l’élan, pose de signature face à l’adversaire.

##### Poings de Zanzibar

Famille `cqc`, ton `stylized` ; 238 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Champ de mines — CQC / Balayage de Fox.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Champ de mines — CQC / Balayage de Fox » ; l’espace disponible doit être lisible. Plan 2 : contact de saisie ou neutralisation lié à « Champ de mines — CQC / Balayage de Fox », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : rétablir bassin et épaules après l’élan, arrêt du dispositif et retour au cadre d’ensemble.

##### Gray Fox Final

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Champ de mines — CQC / Projection de Fox.

Plan 1 : approche jusqu’à la distance réelle de « Champ de mines — CQC / Projection de Fox », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Champ de mines — CQC / Projection de Fox », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : rétablir bassin et épaules après l’élan, prise de distance et maintien final.

##### Fidélité brisée

Famille `cqc`, ton `stylized` ; 274 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Champ de mines — CQC / Projection.

Plan 1 : après une observation ou un repli, GRAY FOX — MG2 reprend l’initiative par « Champ de mines — CQC / Projection ». Plan 2 : contact de saisie ou neutralisation lié à « Champ de mines — CQC / Projection », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : rétablir bassin et épaules après l’élan, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Unarmed human boxing appearance, redheadband distinct from Snake greenheadband, no later cyborg suit or literal firearm.
- Original tiny MSX2 body/cutscene supports redband, generalgreen/ochre palette and human boxing silhouette; detailed modern shirt cut/boots/unseen rear are closeadaptation.
- Revised officialMG2 portrait used for NG face; original1990manual/cutscene face retained as historical reference edition, never silently merged or certified identical.
- Thirty-two authored native combat poses, no original1990frame sequence claim.
- [Official Konami revisedMG2 face and originalMSX2 whole boxing-room/cutscene frames physically viewed; original1990 manual portrait retained as separate evidence edition.](https://www.konami.com/mg/archive/mg2/pic/gray.gif) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__bigboss_mg2

### BIG BOSS — MG2 — METAL GEAR 2 / ZANZIBAR LAND

**Rôle :** Tir, grenades et distance. **Profil :** `soldier`.

**Base présente dans le code :** Big Boss humain de MG2 armé ; son adversaire utilise le spray, pas lui.

**Incarnation à conserver :** Revised official MG2 Big Boss portrait with original MSX2 final-boss field palette.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** BIG BOSS — MG2 : appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas courts, crosse/équipement conservés près du torse. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Tir, grenades et distance » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder appui militaire stable, arme maintenue dans l’axe et regard vers la menace.
- **jump_land :** BIG BOSS — MG2 : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas courts, crosse/équipement conservés près du torse. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de BIG BOSS — MG2. Terminer par retour en couverture de l’arme après le coup. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « METAL GEAR 2 / ZANZIBAR LAND », présentation de Revised official MG2 Big Boss portrait with original MSX2 final-boss field palette., puis appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Geste court lié à « Arme du vétéran » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, retour en couverture de l’arme après le coup ; BIG BOSS — MG2 vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à METAL GEAR 2 / ZANZIBAR LAND.
- **round_loss :** Proposition CQC : BIG BOSS — MG2 réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Dernier ordre », revenir par retour en couverture de l’arme après le coup, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BIG BOSS — MG2, préparer « Jab » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BIG BOSS — MG2, préparer « Frappe engagée » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BIG BOSS — MG2, préparer « Balayage » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BIG BOSS — MG2, préparer « Projection » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** retour en couverture de l’arme après le coup. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Arme du vétéran

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BIG BOSS — MG2, préparer « Arme du vétéran » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Arme du vétéran » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Grenade du hangar

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BIG BOSS — MG2, préparer « Grenade du hangar » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Prélever l’objet correspondant à « Grenade du hangar », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Crosse finale

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BIG BOSS — MG2, préparer « Crosse finale » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Crosse finale » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Repli du commandant

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BIG BOSS — MG2, préparer « Repli du commandant » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer l’appui qui produit le déplacement ; pas courts, crosse/équipement conservés près du torse.

**Action.** Exécuter « Repli du commandant » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** retour en couverture de l’arme après le coup. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Dernier ordre

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BIG BOSS — MG2, préparer « Dernier ordre » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Dernier ordre » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BIG BOSS — MG2, préparer « Recharger » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** retour en couverture de l’arme après le coup. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Dernier ordre — Final

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Dernier ordre / Arme du vétéran.

Plan 1 : BIG BOSS — MG2 sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Dernier ordre / Arme du vétéran ». Plan 2 : présenter l’arme effectivement associée à « Dernier ordre / Arme du vétéran », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : retour en couverture de l’arme après le coup, pose de signature face à l’adversaire.

##### Arme du vétéran / Grenade du hangar

Famille `ballistic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Dernier ordre / Grenade du hangar.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Dernier ordre / Grenade du hangar » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Dernier ordre / Grenade du hangar », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : retour en couverture de l’arme après le coup, arrêt du dispositif et retour au cadre d’ensemble.

##### Crosse finale — Point final

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Dernier ordre / Crosse finale.

Plan 1 : approche jusqu’à la distance réelle de « Dernier ordre / Crosse finale », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Dernier ordre / Crosse finale », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : retour en couverture de l’arme après le coup, prise de distance et maintien final.

##### Sang-froid — Mission close

Famille `ballistic`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Dernier ordre / Projection.

Plan 1 : après une observation ou un repli, BIG BOSS — MG2 reprend l’initiative par « Dernier ordre / Projection ». Plan 2 : présenter l’arme effectivement associée à « Dernier ordre / Projection », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : retour en couverture de l’arme après le coup, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Only the explicitly visible upper-body details are documented by the historical portrait. Plain lower-body garments and shoes, colours absent from the monochrome source and unseen seams are restrained project adaptation; no false claim of a released full-body turnaround.
- Revised Konami portrait is a later official edition face, not identical original1990 celebrity-like portrait. Body details beyond tiny sprite palette are explicitly interpreted.
- Sixteen complete native keyposes per facing are authored gameplay poses, not original historical animation frames.
- [Physically viewed original character reference(s), retained bitexact with source receipts; authored modern native sprite adaptation preserves documented visible details.](https://www.konami.com/mg/archive/mg2/pic/boss.gif) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__snake_mpo

### NAKED SNAKE — PORTABLE OPS — PORTABLE OPS / SAN HIERONYMO

**Rôle :** MK22 et CQC PSP. **Profil :** `infiltrator`.

**Base présente dans le code :** Original PSP padded blue-gray uniform, olive/brown suspenders and two belt pouches, right eyepatch, organic arms. IA page12 labelled Naked Snake final model provides body; early-sketch page4 is not final costume evidence. Original MPO inventory labels the MK22, but its 130x88 icon cannot certify fine 3D topology or suppressor. Final native C weapon and action map pending; no weapon-specific anchor or grenade claim before closure. No PW Battle Dress, Venom hardware or optical cloak on this incarnation. Les contacts, collisions, jauges, coûts, durées et cadences sont des adaptations du versus, pas des valeurs des jeux originaux.

**Incarnation à conserver :** 1970 Naked Snake/Big Boss, original2006PSP final model

**État vérifié :** métadonnées natives avec limites. 72 régions source distinctes dans les deux directions ; groupes : idle, walk, guard, crouch, punch, heavy, low, jump, shoot, throw, reload, recover, hit, ko, attack.

**Réemplois à examiner :** `heavy` = heavy, super ; `low` = low, specialDown ; `throw` = throw, specialForward.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `retro-msx`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** NAKED SNAKE — PORTABLE OPS : garde compacte de l’infiltrateur, arme et étuis proches du corps. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** déroulé de pied discret, bassin bas, freinage avant visée. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « MK22 et CQC PSP » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder garde compacte de l’infiltrateur, arme et étuis proches du corps.
- **jump_land :** NAKED SNAKE — PORTABLE OPS : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. déroulé de pied discret, bassin bas, freinage avant visée. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de NAKED SNAKE — PORTABLE OPS. Terminer par replacement rapide de la main libre et contrôle du champ. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « PORTABLE OPS / SAN HIERONYMO », présentation de 1970 Naked Snake/Big Boss, original2006PSP final model, puis garde compacte de l’infiltrateur, arme et étuis proches du corps. Geste court lié à « MK22 de San Hieronymo » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, replacement rapide de la main libre et contrôle du champ ; NAKED SNAKE — PORTABLE OPS vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à PORTABLE OPS / SAN HIERONYMO.
- **round_loss :** Proposition CQC : NAKED SNAKE — PORTABLE OPS réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Évasion FOX », revenir par replacement rapide de la main libre et contrôle du champ, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NAKED SNAKE — PORTABLE OPS, préparer « Jab » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** replacement rapide de la main libre et contrôle du champ.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NAKED SNAKE — PORTABLE OPS, préparer « Frappe engagée » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** replacement rapide de la main libre et contrôle du champ.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NAKED SNAKE — PORTABLE OPS, préparer « Balayage » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** replacement rapide de la main libre et contrôle du champ.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NAKED SNAKE — PORTABLE OPS, préparer « Projection » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** replacement rapide de la main libre et contrôle du champ. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — MK22 de San Hieronymo

**Existant :** `projectile` / `tranq` ; 19/1/29 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NAKED SNAKE — PORTABLE OPS, préparer « MK22 de San Hieronymo » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Montrer la prise et la visée de l’arme décrite par « MK22 de San Hieronymo » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** replacement rapide de la main libre et contrôle du champ. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Se baisser, bloquer ; la somnolence décroît et ne provoque pas de K.O. instantané.

##### specialDown — Balayage FOX

**Existant :** `melee` / `strike` ; 12/4/24 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NAKED SNAKE — PORTABLE OPS, préparer « Balayage FOX » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** replacement rapide de la main libre et contrôle du champ.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Adaptation du versus : préparation et sortie visibles, garde/saut/espacement adaptés au geste ; aucune invincibilité ou arme supplémentaire.

##### specialForward — CQC de terrain

**Existant :** `melee` / `grapple` ; 10/3/32 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NAKED SNAKE — PORTABLE OPS, préparer « CQC de terrain » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** replacement rapide de la main libre et contrôle du champ. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Hors de portée ou saut ; ne saisir ni cible aérienne ni cible sous protection post-projection.

##### specialBack — Garde FOX — adaptation

**Existant :** `parry` / `counter` ; 5/10/29 ticks ; groupe `guard`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NAKED SNAKE — PORTABLE OPS, préparer « Garde FOX — adaptation » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Présenter la surface ou l’organe de parade et maintenir une fenêtre courte lisible.

**Action.** Recevoir puis dévier au contact réel pour « Garde FOX — adaptation » ; la riposte et son effet n’apparaissent qu’après succès. Une attente sans contact garde une pose différente du contre réussi.

**Retour.** replacement rapide de la main libre et contrôle du champ. Séparer sortie ratée, blocage simple et riposte ; aucun effet de réussite avant collision.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Adaptation du versus : préparation et sortie visibles, garde/saut/espacement adaptés au geste ; aucune invincibilité ou arme supplémentaire.

##### super — Évasion FOX

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NAKED SNAKE — PORTABLE OPS, préparer « Évasion FOX » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Évasion FOX », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** replacement rapide de la main libre et contrôle du champ.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NAKED SNAKE — PORTABLE OPS, préparer « Recharger » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** replacement rapide de la main libre et contrôle du champ. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### MK22 de San Hieronymo — conclusion adaptée

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : prepare → release → confirm → pose. Appuis déclarés : MK22 de San Hieronymo.

Plan 1 : NAKED SNAKE — PORTABLE OPS sécurise son appui, regarde la cible et prépare l’outil ou le geste de « MK22 de San Hieronymo ». Plan 2 : présenter l’arme effectivement associée à « MK22 de San Hieronymo », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : replacement rapide de la main libre et contrôle du champ, pose de signature face à l’adversaire.

##### Balayage FOX — conclusion adaptée

Famille `cqc`, ton `stylized` ; 238 ticks CQC ; phases actuelles : prepare → contact → confirm → pose. Appuis déclarés : Balayage FOX.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Balayage FOX » ; l’espace disponible doit être lisible. Plan 2 : contact de saisie ou neutralisation lié à « Balayage FOX », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : replacement rapide de la main libre et contrôle du champ, arrêt du dispositif et retour au cadre d’ensemble.

##### CQC de terrain — conclusion adaptée

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : prepare → contact → confirm → pose. Appuis déclarés : CQC de terrain.

Plan 1 : approche jusqu’à la distance réelle de « CQC de terrain », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « CQC de terrain », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : replacement rapide de la main libre et contrôle du champ, prise de distance et maintien final.

##### Projection — conclusion adaptée

Famille `cqc`, ton `stylized` ; 274 ticks CQC ; phases actuelles : prepare → contact → confirm → pose. Appuis déclarés : Projection.

Plan 1 : après une observation ou un repli, NAKED SNAKE — PORTABLE OPS reprend l’initiative par « Projection ». Plan 2 : contact de saisie ou neutralisation lié à « Projection », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : replacement rapide de la main libre et contrôle du champ, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Selected incarnation is original2006PSP Portable Ops Naked Snake/Big Boss, navy/charcoal padded soft suit, brown/olive double suspenders, silver buckles, front pouches, pale waist edging, grey gloves and boot toes, brown hair and short beard. No Peace Walker Battle Dress/MSF armor, Venom horn/prosthetic hand or old MGS4 hair is mixed in.
- Original full-body/face game character graphics are observed in an IA compiled artbook; official publisher origin of that compilation is not certified. Original source JPEG bytes, URLs and SHA retained; no generic project-generated illustration or early sketch is promoted as final canonical costume reference.
- Right-facing camera shows anatomical left cheek and uncovered left eye; large incorrect near-left pink badge has been removed. Left-facing camera shows dark anatomical right eye patch and the single pale pink/white tag on anatomical right chest. Tiny buckle/strap adjusters remain. Fine patch-to-bandana junction is contiguous in some left views and is qualified closest_supported rather than pixel1:1 topology.
- All72 selected native full bodies, both boots, complete limbs, bandana tails, straps/pouches and drawn pistol were physically viewed. Directions are separately generated, never a software horizontal mirror. Native output PNGs are unchanged and all earlier attempts retained.
- A uses column groups idle0/4/8, walk1/5/9, guard2/6/10, crouch3/7/11, not the row-major action groups of PW. B uses3punch/3heavy/3low/3jump; C uses3pistol-special/3unarmed-throw/3utility/3recover. These are authored Versus phases, not extracted original PSP animations.
- The MK22 inventory silhouette is only130x88. Fine firearm topology, slide detail, markings and suppressor are not certified. The visible unsuppressed short pistol is a qualified MK22-pattern adaptation; no exact suppressor or invented explosive equipment claim.
- C_LEFT utility final source cell8 returns with empty hands after pistol manipulation in6/7; this is an authored stow/return phase. It does not show a visible magazine or prove a canonical reload sequence. C_RIGHT utility cell8 keeps the pistol visible. Utility emits no projectile and creates no new visible holster or grenade.
- Source special gun group is shootC0..2 with an observed bilateral active-C1 muzzle. Super remains heavyB3..5 unarmed CQC, never shoot; specialDown must consume actual lowB6..8 melee rather than a legacy explosive projectile. The producer performs no runtime gameplay edit.
- KO/hit aliases consume the actually lowered kneeling recovery cells, a restrained Versus down-state adaptation rather than original exported death/knockout frames.
- Native rows are closely spaced. Read-only historical component inspector emits Canvas clipPolygon stencils for foreign neighboring fragments without altering any source pixels. Fixed per-sheet median upright standing height preserves lowered crouch/low/recover bodies.
- This is producer evidence only. Root independent integrator receipt, actual runtime/mobile phase/contact/projectile-origin checks and publication remain separately required.
- Public original artbook compilation scan is qualified rehosting, not independently authenticated original upload.
- Generated action staging/timings, hidden reverse gear and small handgun/bandana detail are adaptations, not extracted PSP animation or absolute1:1-certified.
- Original sources, rejected wrong-eye/badge and other attempts remain byte-exact and retained.
- [Référence déclarée](https://archive.org/download/the-mgs-po-artbook/page/n12.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Référence déclarée](https://archive.org/download/the-mgs-po-artbook/page/n6.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Référence déclarée](https://www.metalgearsolid.be/images/poinv_12.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__null_mpo

### NULL — PORTABLE OPS / PERFECT SOLDIER

**Rôle :** Lame, déviation et furtivité. **Profil :** `ninja`.

**Base présente dans le code :** Perfect Soldier : machette, déviation et mobilité ; pas le cyborg Gray Fox de MGS1.

**Incarnation à conserver :** Original game incarnation, reference-based hand-painted native combat keyframes

**État vérifié :** métadonnées natives avec limites. 32 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, attack, punch, low, throw, deploy, shoot, reload, hit, ko, roll, jump, optic, recover, parry, blade.

**Réemplois à examiner :** `blade` = light, heavy, special, specialDown, specialForward, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `tuxedo`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** NULL : centre bas, main et fourreau orientés selon cette incarnation. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** appuis souples, accélération puis arrêt net avant une coupe. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Lame, déviation et furtivité » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder centre bas, main et fourreau orientés selon cette incarnation.
- **jump_land :** NULL : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. appuis souples, accélération puis arrêt net avant une coupe. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de NULL. Terminer par finir l’arc de lame puis reprendre la garde sans traverser le corps. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « PORTABLE OPS / PERFECT SOLDIER », présentation de Original game incarnation, reference-based hand-painted native combat keyframes, puis centre bas, main et fourreau orientés selon cette incarnation. Geste court lié à « Machette de Null » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, finir l’arc de lame puis reprendre la garde sans traverser le corps ; NULL vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à PORTABLE OPS / PERFECT SOLDIER.
- **round_loss :** Proposition CQC : NULL réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Mémoire de Frank », revenir par finir l’arc de lame puis reprendre la garde sans traverser le corps, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Contact de lame

**Existant :** `melee` / `blade` ; 7/3/12 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NULL, préparer « Contact de lame » ; centre bas, main et fourreau orientés selon cette incarnation. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Coupe engagée

**Existant :** `melee` / `blade` ; 18/5/24 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NULL, préparer « Coupe engagée » ; centre bas, main et fourreau orientés selon cette incarnation. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NULL, préparer « Balayage » ; centre bas, main et fourreau orientés selon cette incarnation. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NULL, préparer « Projection » ; centre bas, main et fourreau orientés selon cette incarnation. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Machette de Null

**Existant :** `melee` / `blade` ; 13/5/24 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NULL, préparer « Machette de Null » ; centre bas, main et fourreau orientés selon cette incarnation. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde puis punition ; la lame ne touche qu’une fois par attaque.

##### specialDown — Coupe ascendante

**Existant :** `melee` / `blade` ; 21/4/33 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NULL, préparer « Coupe ascendante » ; centre bas, main et fourreau orientés selon cette incarnation. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer ou espacer ; la remontée est punissable en garde.

##### specialForward — Approche du soldat parfait

**Existant :** `melee` / `blade` ; 18/7/32 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NULL, préparer « Approche du soldat parfait » ; centre bas, main et fourreau orientés selon cette incarnation. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Déviation à la machette

**Existant :** `parry` / `counter` ; 5/12/28 ticks ; groupe `parry`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NULL, préparer « Déviation à la machette » ; centre bas, main et fourreau orientés selon cette incarnation. Présenter la surface ou l’organe de parade et maintenir une fenêtre courte lisible.

**Action.** Recevoir puis dévier au contact réel pour « Déviation à la machette » ; la riposte et son effet n’apparaissent qu’après succès. Une attente sans contact garde une pose différente du contre réussi.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Séparer sortie ratée, blocage simple et riposte ; aucun effet de réussite avant collision.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Projections, attaques au corps à corps et explosifs au sol ne sont pas renvoyés.

##### super — Mémoire de Frank

**Existant :** `melee` / `blade` ; 25/7/44 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NULL, préparer « Mémoire de Frank » ; centre bas, main et fourreau orientés selon cette incarnation. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Recentrer Null

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NULL, préparer « Recentrer Null » ; centre bas, main et fourreau orientés selon cette incarnation. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Recentrer Null ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Perfect Soldier

Famille `blade`, ton `stylized` ; 220 ticks CQC ; phases actuelles : dash → crosscut → freeze → sheath. Appuis déclarés : Mémoire de Frank / Machette de Null.

Plan 1 : NULL sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Mémoire de Frank / Machette de Null ». Plan 2 : armer la lame ou le membre de « Mémoire de Frank / Machette de Null » et dégager son arc. Plan 3 : enchaîner des coupes lisibles avec angles distincts ; les impacts et les réactions suivent le fil de lame, sans ajout d’arme d’une autre incarnation. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : finir l’arc de lame puis reprendre la garde sans traverser le corps, pose de signature face à l’adversaire.

##### Machete Counter

Famille `blade`, ton `stylized` ; 238 ticks CQC ; phases actuelles : dash → crosscut → freeze → sheath. Appuis déclarés : Mémoire de Frank / Coupe ascendante.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Mémoire de Frank / Coupe ascendante » ; l’espace disponible doit être lisible. Plan 2 : armer la lame ou le membre de « Mémoire de Frank / Coupe ascendante » et dégager son arc. Plan 3 : enchaîner des coupes lisibles avec angles distincts ; les impacts et les réactions suivent le fil de lame, sans ajout d’arme d’une autre incarnation. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : finir l’arc de lame puis reprendre la garde sans traverser le corps, arrêt du dispositif et retour au cadre d’ensemble.

##### Null Protocol

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Mémoire de Frank / Approche du soldat parfait.

Plan 1 : approche jusqu’à la distance réelle de « Mémoire de Frank / Approche du soldat parfait », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Mémoire de Frank / Approche du soldat parfait », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : finir l’arc de lame puis reprendre la garde sans traverser le corps, prise de distance et maintien final.

##### Memory Zero

Famille `blade`, ton `stylized` ; 274 ticks CQC ; phases actuelles : dash → crosscut → freeze → sheath. Appuis déclarés : Mémoire de Frank / Projection.

Plan 1 : après une observation ou un repli, NULL reprend l’initiative par « Mémoire de Frank / Projection ». Plan 2 : armer la lame ou le membre de « Mémoire de Frank / Projection » et dégager son arc. Plan 3 : enchaîner des coupes lisibles avec angles distincts ; les impacts et les réactions suivent le fil de lame, sans ajout d’arme d’une autre incarnation. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : finir l’arc de lame puis reprendre la garde sans traverser le corps, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact, not a certified pixel-perfect 1:1 copy. Canonical identity/costume checked against supplied original or official references.
- Sixteen visually reviewed physical keyframes per direction, thirty-two distinct poses per identity. Action groups share keyframes explicitly; no full motion-capture cycle claim.
- Thirteen required action groups plus optional groups reuse actual poses. Standing source-height scale preserves shorter crouch/KO poses; timing and interpolation are duel adaptations.
- Each direction independently authored; no raster mirroring. Tiny facial, insignia and weapon detail remains approximate at combat scale.
- Source crops follow observed alpha components; wider KO or weapon rectangles may cross the advertised invisible grid. Canvas clip polygons exclude nearby figures where necessary, native PNG bytes unchanged.
- No engine, collision, HP, lore, readiness or gameplay mutation; actual gameplay QA remains Root integration work.
- right geometry uses documented alpha threshold 48 to separate a soft antialias bridge between two poses; complete native pixels are preserved, softer fringe in individual crops is not claimed fully retained.
- Some shooting cells include authored muzzle flash. The actual firing cell is restricted to active attack phase; startup/recovery explicitly reuse the authored recovery or weapon-manipulation pose without flash. Snake AC!D LEFT recovery has empty hands. Flash differences between independently authored directions remain qualified.
- [Published official Portable Ops artbook original JP2 reference pages, locally preserved source, documentary conversion actually viewed.](https://archive.org/download/the-mgs-po-artbook/The%20MGS%20PO%20Artbook_jp2.zip) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__python_mpo

### PYTHON — PORTABLE OPS / FOX

**Rôle :** Combinaison cryogénique. **Profil :** `pyth`.

**Base présente dans le code :** Python : combinaison cryogénique et arsenal FOX. Pression limitée, attaques froides et arme conventionnelle.

**Incarnation à conserver :** Original game incarnation, reference-based hand-painted native combat keyframes

**État vérifié :** métadonnées natives avec limites. 32 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, attack, punch, low, throw, deploy, shoot, reload, hit, ko, roll, jump, optic, recover, parry.

**Réemplois à examiner :** `deploy` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** special, specialDown, super, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `tuxedo`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** PYTHON : combinaison et émission de froid de Python distinctes. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas contenus et orientation de l’arme malgré les effets froids. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Combinaison cryogénique » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder combinaison et émission de froid de Python distinctes.
- **jump_land :** PYTHON : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas contenus et orientation de l’arme malgré les effets froids. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de PYTHON. Terminer par baisse d’émission puis retour du corps. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « PORTABLE OPS / FOX », présentation de Original game incarnation, reference-based hand-painted native combat keyframes, puis combinaison et émission de froid de Python distinctes. Geste court lié à « Jet cryogénique » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, baisse d’émission puis retour du corps ; PYTHON vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à PORTABLE OPS / FOX.
- **round_loss :** Proposition CQC : PYTHON réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Gel du dépôt », revenir par baisse d’émission puis retour du corps, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PYTHON, préparer « Jab » ; combinaison et émission de froid de Python distinctes. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** baisse d’émission puis retour du corps.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `attack`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PYTHON, préparer « Frappe engagée » ; combinaison et émission de froid de Python distinctes. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** baisse d’émission puis retour du corps.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PYTHON, préparer « Balayage » ; combinaison et émission de froid de Python distinctes. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** baisse d’émission puis retour du corps.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PYTHON, préparer « Projection » ; combinaison et émission de froid de Python distinctes. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** baisse d’émission puis retour du corps. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Jet cryogénique

**Existant :** `projectile` / `cold` ; 24/1/32 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PYTHON, préparer « Jet cryogénique » ; combinaison et émission de froid de Python distinctes. Donner à la source de « Jet cryogénique » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet cold de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet.

**Retour.** baisse d’émission puis retour du corps. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde puis approche ; ralentissement borné, jamais gel complet.

##### specialDown — Enveloppe cryogénique

**Existant :** `buff` / `armor` ; 22/1/31 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PYTHON, préparer « Enveloppe cryogénique » ; combinaison et émission de froid de Python distinctes. Montrer la préparation corporelle ou mécanique de « Enveloppe cryogénique ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** baisse d’émission puis retour du corps. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Absorbe une seule frappe ; projections, EMP et attaques brise-armure la contrent.

##### specialForward — Rafale FOX

**Existant :** `projectile` / `ballistic` ; 22/1/36 ticks ; groupe `shoot`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PYTHON, préparer « Rafale FOX » ; combinaison et émission de froid de Python distinctes. Montrer la prise et la visée de l’arme décrite par « Rafale FOX » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 3 émissions, espacées de 5 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** baisse d’émission puis retour du corps. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 3 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### specialBack — Repli refroidi

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `walk`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PYTHON, préparer « Repli refroidi » ; combinaison et émission de froid de Python distinctes. Préparer l’appui qui produit le déplacement ; pas contenus et orientation de l’arme malgré les effets froids.

**Action.** Exécuter « Repli refroidi » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** baisse d’émission puis retour du corps. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Gel du dépôt

**Existant :** `projectile` / `cold` ; 35/1/44 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PYTHON, préparer « Gel du dépôt » ; combinaison et émission de froid de Python distinctes. Donner à la source de « Gel du dépôt » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet cold de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet. La salve contient 5 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** baisse d’émission puis retour du corps. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 5 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Refroidir

**Existant :** `recover` / `recovery` ; 45/1/25 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PYTHON, préparer « Refroidir » ; combinaison et émission de froid de Python distinctes. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Refroidir ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** baisse d’émission puis retour du corps. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Refroidissement ou pause tactique interrompable ; aucun soin gratuit.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Cryogenic Break

Famille `cold`, ton `stylized` ; 220 ticks CQC ; phases actuelles : freeze → fracture → shatter → mist. Appuis déclarés : Gel du dépôt / Jet cryogénique.

Plan 1 : PYTHON sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Gel du dépôt / Jet cryogénique ». Plan 2 : montrer la source corporelle ou matérielle de « Gel du dépôt / Jet cryogénique ». Plan 3 : développer l’effet cold en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : baisse d’émission puis retour du corps, pose de signature face à l’adversaire.

##### Python Coil

Famille `cold`, ton `stylized` ; 238 ticks CQC ; phases actuelles : freeze → fracture → shatter → mist. Appuis déclarés : Gel du dépôt / Enveloppe cryogénique.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Gel du dépôt / Enveloppe cryogénique » ; l’espace disponible doit être lisible. Plan 2 : montrer la source corporelle ou matérielle de « Gel du dépôt / Enveloppe cryogénique ». Plan 3 : développer l’effet cold en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : baisse d’émission puis retour du corps, arrêt du dispositif et retour au cadre d’ensemble.

##### FOX Freeze

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Gel du dépôt / Rafale FOX.

Plan 1 : approche jusqu’à la distance réelle de « Gel du dépôt / Rafale FOX », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Gel du dépôt / Rafale FOX », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : baisse d’émission puis retour du corps, prise de distance et maintien final.

##### Thermal Failure

Famille `cold`, ton `stylized` ; 274 ticks CQC ; phases actuelles : freeze → fracture → shatter → mist. Appuis déclarés : Gel du dépôt / Projection.

Plan 1 : après une observation ou un repli, PYTHON reprend l’initiative par « Gel du dépôt / Projection ». Plan 2 : montrer la source corporelle ou matérielle de « Gel du dépôt / Projection ». Plan 3 : développer l’effet cold en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : baisse d’émission puis retour du corps, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact, not a certified pixel-perfect 1:1 copy. Canonical identity/costume checked against supplied original or official references.
- Sixteen visually reviewed physical keyframes per direction, thirty-two distinct poses per identity. Action groups share keyframes explicitly; no full motion-capture cycle claim.
- Thirteen required action groups plus optional groups reuse actual poses. Standing source-height scale preserves shorter crouch/KO poses; timing and interpolation are duel adaptations.
- Each direction independently authored; no raster mirroring. Tiny facial, insignia and weapon detail remains approximate at combat scale.
- Source crops follow observed alpha components; wider KO or weapon rectangles may cross the advertised invisible grid. Canvas clip polygons exclude nearby figures where necessary, native PNG bytes unchanged.
- No engine, collision, HP, lore, readiness or gameplay mutation; actual gameplay QA remains Root integration work.
- Some shooting cells include authored muzzle flash. The actual firing cell is restricted to active attack phase; startup/recovery explicitly reuse the authored recovery or weapon-manipulation pose without flash. Snake AC!D LEFT recovery has empty hands. Flash differences between independently authored directions remain qualified.
- Original Python cooling suit and thermal scalp pins are checked against published art; exact rifle model and small weapon details remain approximate, not authenticated pixel by pixel.
- [Published official Portable Ops artbook original JP2 reference pages, locally preserved source, documentary conversion actually viewed.](https://archive.org/download/the-mgs-po-artbook/The%20MGS%20PO%20Artbook_jp2.zip) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__gene

### GENE — PORTABLE OPS / FOX COMMANDER

**Rôle :** Couteaux et influence vocale. **Profil :** `gene`.

**Base présente dans le code :** Couteaux et charisme du Successeur ; influence vocale courte plutôt que contrôle total du joueur.

**Incarnation à conserver :** Original game incarnation, reference-based hand-painted native combat keyframes

**État vérifié :** métadonnées natives avec limites. 32 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, attack, punch, low, throw, deploy, shoot, reload, hit, ko, roll, jump, optic, recover, parry, blade.

**Réemplois à examiner :** `blade` = light, heavy, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `tuxedo`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** GENE : garde de Gene et geste de commande/voix distinct du coup physique. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** déplacement précis avec accélération puis pose stable. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Couteaux et influence vocale » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder garde de Gene et geste de commande/voix distinct du coup physique.
- **jump_land :** GENE : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. déplacement précis avec accélération puis pose stable. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de GENE. Terminer par fin du geste de commandement avant retour offensif. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « PORTABLE OPS / FOX COMMANDER », présentation de Original game incarnation, reference-based hand-painted native combat keyframes, puis garde de Gene et geste de commande/voix distinct du coup physique. Geste court lié à « Couteau de Gene » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, fin du geste de commandement avant retour offensif ; GENE vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à PORTABLE OPS / FOX COMMANDER.
- **round_loss :** Proposition CQC : GENE réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Rafale de couteaux », revenir par fin du geste de commandement avant retour offensif, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Contact de lame

**Existant :** `melee` / `knife` ; 7/3/12 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GENE, préparer « Contact de lame » ; garde de Gene et geste de commande/voix distinct du coup physique. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** fin du geste de commandement avant retour offensif. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Coupe engagée

**Existant :** `melee` / `knife` ; 18/5/24 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GENE, préparer « Coupe engagée » ; garde de Gene et geste de commande/voix distinct du coup physique. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** fin du geste de commandement avant retour offensif. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GENE, préparer « Balayage » ; garde de Gene et geste de commande/voix distinct du coup physique. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** fin du geste de commandement avant retour offensif.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GENE, préparer « Projection » ; garde de Gene et geste de commande/voix distinct du coup physique. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** fin du geste de commandement avant retour offensif. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Couteau de Gene

**Existant :** `projectile` / `knife` ; 14/1/22 ticks ; groupe `shoot`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GENE, préparer « Couteau de Gene » ; garde de Gene et geste de commande/voix distinct du coup physique. Prélever l’objet correspondant à « Couteau de Gene », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps.

**Retour.** fin du geste de commandement avant retour offensif. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Pression vocale

**Existant :** `projectile` / `voice` ; 27/1/30 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GENE, préparer « Pression vocale » ; garde de Gene et geste de commande/voix distinct du coup physique. Donner à la source de « Pression vocale » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet voice de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet.

**Retour.** fin du geste de commandement avant retour offensif. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Projectile lent et visible : sauter, bloquer ou détruire avec une attaque.

##### specialForward — Vitesse du Successeur

**Existant :** `melee` / `knife` ; 18/7/32 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GENE, préparer « Vitesse du Successeur » ; garde de Gene et geste de commande/voix distinct du coup physique. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** fin du geste de commandement avant retour offensif. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Lecture du Successeur

**Existant :** `parry` / `counter` ; 3/10/29 ticks ; groupe `parry`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GENE, préparer « Lecture du Successeur » ; garde de Gene et geste de commande/voix distinct du coup physique. Présenter la surface ou l’organe de parade et maintenir une fenêtre courte lisible.

**Action.** Recevoir puis dévier au contact réel pour « Lecture du Successeur » ; la riposte et son effet n’apparaissent qu’après succès. Une attente sans contact garde une pose différente du contre réussi.

**Retour.** fin du geste de commandement avant retour offensif. Séparer sortie ratée, blocage simple et riposte ; aucun effet de réussite avant collision.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Retarder la frappe, projeter ou attendre les 29 images de récupération.

##### super — Rafale de couteaux

**Existant :** `projectile` / `knife` ; 35/1/44 ticks ; groupe `shoot`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GENE, préparer « Rafale de couteaux » ; garde de Gene et geste de commande/voix distinct du coup physique. Prélever l’objet correspondant à « Rafale de couteaux », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. La salve contient 5 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** fin du geste de commandement avant retour offensif. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 5 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Stabiliser la réserve

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GENE, préparer « Stabiliser la réserve » ; garde de Gene et geste de commande/voix distinct du coup physique. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Stabiliser la réserve ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** fin du geste de commandement avant retour offensif. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Voice Command

Famille `blade`, ton `stylized` ; 220 ticks CQC ; phases actuelles : dash → crosscut → freeze → sheath. Appuis déclarés : Rafale de couteaux / Couteau de Gene.

Plan 1 : GENE sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Rafale de couteaux / Couteau de Gene ». Plan 2 : armer la lame ou le membre de « Rafale de couteaux / Couteau de Gene » et dégager son arc. Plan 3 : enchaîner des coupes lisibles avec angles distincts ; les impacts et les réactions suivent le fil de lame, sans ajout d’arme d’une autre incarnation. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : fin du geste de commandement avant retour offensif, pose de signature face à l’adversaire.

##### Knife Storm

Famille `blade`, ton `stylized` ; 238 ticks CQC ; phases actuelles : dash → crosscut → freeze → sheath. Appuis déclarés : Rafale de couteaux / Pression vocale.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Rafale de couteaux / Pression vocale » ; l’espace disponible doit être lisible. Plan 2 : armer la lame ou le membre de « Rafale de couteaux / Pression vocale » et dégager son arc. Plan 3 : enchaîner des coupes lisibles avec angles distincts ; les impacts et les réactions suivent le fil de lame, sans ajout d’arme d’une autre incarnation. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : fin du geste de commandement avant retour offensif, arrêt du dispositif et retour au cadre d’ensemble.

##### Gene’s Army

Famille `psychic`, ton `stylized` ; 256 ticks CQC ; phases actuelles : lift → orbit → crush → drop. Appuis déclarés : Rafale de couteaux / Vitesse du Successeur.

Plan 1 : approche jusqu’à la distance réelle de « Rafale de couteaux / Vitesse du Successeur », arme et main libre identifiées. Plan 2 : montrer la source corporelle ou matérielle de « Rafale de couteaux / Vitesse du Successeur ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : fin du geste de commandement avant retour offensif, prise de distance et maintien final.

##### Perfect Soldier End

Famille `psychic`, ton `stylized` ; 274 ticks CQC ; phases actuelles : lift → orbit → crush → drop. Appuis déclarés : Rafale de couteaux / Projection.

Plan 1 : après une observation ou un repli, GENE reprend l’initiative par « Rafale de couteaux / Projection ». Plan 2 : montrer la source corporelle ou matérielle de « Rafale de couteaux / Projection ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : fin du geste de commandement avant retour offensif, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact, not a certified pixel-perfect 1:1 copy. Canonical identity/costume checked against supplied original or official references.
- Sixteen visually reviewed physical keyframes per direction, thirty-two distinct poses per identity. Action groups share keyframes explicitly; no full motion-capture cycle claim.
- Thirteen required action groups plus optional groups reuse actual poses. Standing source-height scale preserves shorter crouch/KO poses; timing and interpolation are duel adaptations.
- Each direction independently authored; no raster mirroring. Tiny facial, insignia and weapon detail remains approximate at combat scale.
- Source crops follow observed alpha components; wider KO or weapon rectangles may cross the advertised invisible grid. Canvas clip polygons exclude nearby figures where necessary, native PNG bytes unchanged.
- No engine, collision, HP, lore, readiness or gameplay mutation; actual gameplay QA remains Root integration work.
- Some shooting cells include authored muzzle flash. The actual firing cell is restricted to active attack phase; startup/recovery explicitly reuse the authored recovery or weapon-manipulation pose without flash. Snake AC!D LEFT recovery has empty hands. Flash differences between independently authored directions remain qualified.
- [Published official Portable Ops artbook original JP2 reference pages, locally preserved source, documentary conversion actually viewed.](https://archive.org/download/the-mgs-po-artbook/The%20MGS%20PO%20Artbook_jp2.zip) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__snake_gb

### SOLID SNAKE — GHOST BABEL — GHOST BABEL / INFILTRATION

**Rôle :** Tir, grenades et distance. **Profil :** `soldier`.

**Base présente dans le code :** Solid Snake de Ghost Babel : arsenal portable et infiltration de Gindra.

**Incarnation à conserver :** Galuade infiltration, original GBC purple/navy palette

**État vérifié :** métadonnées natives avec limites. 32 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, attack, hit, ko, punch, low, throw, deploy, shoot, reload, recover, parry.

**Réemplois à examiner :** `punch` = light, heavy, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** special, specialDown, super, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `nextgen`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** SOLID SNAKE — GHOST BABEL : appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas courts, crosse/équipement conservés près du torse. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Tir, grenades et distance » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder appui militaire stable, arme maintenue dans l’axe et regard vers la menace.
- **jump_land :** SOLID SNAKE — GHOST BABEL : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas courts, crosse/équipement conservés près du torse. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de SOLID SNAKE — GHOST BABEL. Terminer par retour en couverture de l’arme après le coup. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « GHOST BABEL / INFILTRATION », présentation de Galuade infiltration, original GBC purple/navy palette, puis appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Geste court lié à « Pistolet de Gindra » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, retour en couverture de l’arme après le coup ; SOLID SNAKE — GHOST BABEL vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à GHOST BABEL / INFILTRATION.
- **round_loss :** Proposition CQC : SOLID SNAKE — GHOST BABEL réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Infiltration Galuade », revenir par retour en couverture de l’arme après le coup, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — GHOST BABEL, préparer « Jab » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — GHOST BABEL, préparer « Frappe engagée » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — GHOST BABEL, préparer « Balayage » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — GHOST BABEL, préparer « Projection » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** retour en couverture de l’arme après le coup. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Pistolet de Gindra

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — GHOST BABEL, préparer « Pistolet de Gindra » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Pistolet de Gindra » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Grenade Galuade

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — GHOST BABEL, préparer « Grenade Galuade » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Prélever l’objet correspondant à « Grenade Galuade », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Crosse de l’agent

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — GHOST BABEL, préparer « Crosse de l’agent » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Crosse de l’agent » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Repli de Gindra

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `walk`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — GHOST BABEL, préparer « Repli de Gindra » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer l’appui qui produit le déplacement ; pas courts, crosse/équipement conservés près du torse.

**Action.** Exécuter « Repli de Gindra » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** retour en couverture de l’arme après le coup. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Infiltration Galuade

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — GHOST BABEL, préparer « Infiltration Galuade » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Infiltration Galuade » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — GHOST BABEL, préparer « Recharger » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** retour en couverture de l’arme après le coup. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Infiltration Galuade — Final

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Infiltration Galuade / Pistolet de Gindra.

Plan 1 : SOLID SNAKE — GHOST BABEL sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Infiltration Galuade / Pistolet de Gindra ». Plan 2 : présenter l’arme effectivement associée à « Infiltration Galuade / Pistolet de Gindra », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : retour en couverture de l’arme après le coup, pose de signature face à l’adversaire.

##### Pistolet de Gindra / Grenade Galuade

Famille `ballistic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Infiltration Galuade / Grenade Galuade.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Infiltration Galuade / Grenade Galuade » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Infiltration Galuade / Grenade Galuade », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : retour en couverture de l’arme après le coup, arrêt du dispositif et retour au cadre d’ensemble.

##### Crosse de l’agent — Point final

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Infiltration Galuade / Crosse de l’agent.

Plan 1 : approche jusqu’à la distance réelle de « Infiltration Galuade / Crosse de l’agent », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Infiltration Galuade / Crosse de l’agent », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : retour en couverture de l’arme après le coup, prise de distance et maintien final.

##### Sang-froid — Mission close

Famille `ballistic`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Infiltration Galuade / Projection.

Plan 1 : après une observation ou un repli, SOLID SNAKE — GHOST BABEL reprend l’initiative par « Infiltration Galuade / Projection ». Plan 2 : présenter l’arme effectivement associée à « Infiltration Galuade / Projection », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : retour en couverture de l’arme après le coup, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Sixteen physically reviewed independent key poses per facing, 32 total. Walk has two key poses; no full captured motion cycle claim.
- Independent left/right generation preserves canonical anatomical sides; source PNGs stay byte-identical, no mirroring or pixel processing.
- Runtime rects derive from the actual native alpha components. Some rects overlap a neighbor; authored alpha boundary Canvas clip polygons exclude that neighbor while preserving all principal-body pixels above alpha 8.
- One pose may serve several engine move slots. Timings/phase maps are CQC adaptations; original battle geometry, damage, resources and AI are unchanged.
- Weapon small details, fabric folds and face likeness remain stylized. Closest accepted interpretation, no certified pixel-perfect 1:1 fidelity.
- No complete campaign, music or voice work supplied in this sprite candidate.
- No muzzle flash or particles are painted into the shoot poses; most shoot groups contain one aimed-pose keyframe held across phases. Projectile/effect timing remains the engine responsibility.
- GBC reference bodies are small top-down sprites; expanded side view and fine clothing/equipment details are game adaptations, not authenticated full-body concept art.
- [Original-game capture / original publisher character art physically viewed before generation; canonical incarnation reference.](https://metalgear.konami.net/manual/mc2/mggb/ps5/en/img/02_02.png) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original-game capture / original publisher character art physically viewed before generation; canonical incarnation reference.](https://lparchive.org/Metal-Gear-Ghost-Babel/Update%2012/18-jennerjerk24.png) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original-game capture / original publisher character art physically viewed before generation; canonical incarnation reference.](https://lparchive.org/Metal-Gear-Ghost-Babel/Update%2008/5-solidsnake.png) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__hawk

### SLASHER HAWK — GHOST BABEL / BLACK CHAMBER

**Rôle :** Boomerang aller-retour et faucon. **Profil :** `hawk`.

**Base présente dans le code :** Grand boomerang et faucon de Slasher Hawk ; les deux frappent suivant des trajectoires visibles.

**Incarnation à conserver :** Slasher Hawk, released2000 Ghost Babel Black Chamber appearance.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `blade` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `tuxedo`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** SLASHER HAWK : attitude aérienne liée à l’équipement observé, arme conservée. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** décollage et atterrissage avec cause visible ; pas de flottement arbitraire. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Boomerang aller-retour et faucon » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder attitude aérienne liée à l’équipement observé, arme conservée.
- **jump_land :** SLASHER HAWK : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. décollage et atterrissage avec cause visible ; pas de flottement arbitraire. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de SLASHER HAWK. Terminer par cesser la poussée puis poser les appuis. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « GHOST BABEL / BLACK CHAMBER », présentation de Slasher Hawk, released2000 Ghost Babel Black Chamber appearance., puis attitude aérienne liée à l’équipement observé, arme conservée. Geste court lié à « Grand boomerang » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, cesser la poussée puis poser les appuis ; SLASHER HAWK vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à GHOST BABEL / BLACK CHAMBER.
- **round_loss :** Proposition CQC : SLASHER HAWK réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Double trajectoire », revenir par cesser la poussée puis poser les appuis, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SLASHER HAWK, préparer « Jab » ; attitude aérienne liée à l’équipement observé, arme conservée. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** cesser la poussée puis poser les appuis.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SLASHER HAWK, préparer « Frappe engagée » ; attitude aérienne liée à l’équipement observé, arme conservée. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** cesser la poussée puis poser les appuis.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SLASHER HAWK, préparer « Balayage » ; attitude aérienne liée à l’équipement observé, arme conservée. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** cesser la poussée puis poser les appuis.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SLASHER HAWK, préparer « Projection » ; attitude aérienne liée à l’équipement observé, arme conservée. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** cesser la poussée puis poser les appuis. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Grand boomerang

**Existant :** `projectile` / `boomerang` ; 23/1/32 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SLASHER HAWK, préparer « Grand boomerang » ; attitude aérienne liée à l’équipement observé, arme conservée. Prélever l’objet correspondant à « Grand boomerang », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps.

**Retour.** cesser la poussée puis poser les appuis. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Deux trajets visibles ; une parade ou une attaque peut détruire le boomerang.

##### specialDown — Appel du faucon

**Existant :** `projectile` / `hawk` ; 30/1/35 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SLASHER HAWK, préparer « Appel du faucon » ; attitude aérienne liée à l’équipement observé, arme conservée. Donner à la source de « Appel du faucon » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet hawk de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet.

**Retour.** cesser la poussée puis poser les appuis. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Essaim lent à virage limité ; réduire l’écart ou bloquer, pas de suivi parfait.

##### specialForward — Bond de Slasher Hawk

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SLASHER HAWK, préparer « Bond de Slasher Hawk » ; attitude aérienne liée à l’équipement observé, arme conservée. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Bond de Slasher Hawk » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** cesser la poussée puis poser les appuis.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Écart de chasse

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SLASHER HAWK, préparer « Écart de chasse » ; attitude aérienne liée à l’équipement observé, arme conservée. Préparer l’appui qui produit le déplacement ; décollage et atterrissage avec cause visible ; pas de flottement arbitraire.

**Action.** Exécuter « Écart de chasse » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** cesser la poussée puis poser les appuis. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Double trajectoire

**Existant :** `projectile` / `boomerang` ; 35/1/44 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SLASHER HAWK, préparer « Double trajectoire » ; attitude aérienne liée à l’équipement observé, arme conservée. Prélever l’objet correspondant à « Double trajectoire », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. La salve contient 2 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** cesser la poussée puis poser les appuis. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 2 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Reprendre son souffle

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SLASHER HAWK, préparer « Reprendre son souffle » ; attitude aérienne liée à l’équipement observé, arme conservée. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Reprendre son souffle ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** cesser la poussée puis poser les appuis. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Boomerang Return

Famille `blade`, ton `stylized` ; 220 ticks CQC ; phases actuelles : dash → crosscut → freeze → sheath. Appuis déclarés : Double trajectoire / Grand boomerang.

Plan 1 : SLASHER HAWK sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Double trajectoire / Grand boomerang ». Plan 2 : armer la lame ou le membre de « Double trajectoire / Grand boomerang » et dégager son arc. Plan 3 : enchaîner des coupes lisibles avec angles distincts ; les impacts et les réactions suivent le fil de lame, sans ajout d’arme d’une autre incarnation. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : cesser la poussée puis poser les appuis, pose de signature face à l’adversaire.

##### Falcon Dive

Famille `blade`, ton `stylized` ; 238 ticks CQC ; phases actuelles : dash → crosscut → freeze → sheath. Appuis déclarés : Double trajectoire / Appel du faucon.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Double trajectoire / Appel du faucon » ; l’espace disponible doit être lisible. Plan 2 : armer la lame ou le membre de « Double trajectoire / Appel du faucon » et dégager son arc. Plan 3 : enchaîner des coupes lisibles avec angles distincts ; les impacts et les réactions suivent le fil de lame, sans ajout d’arme d’une autre incarnation. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : cesser la poussée puis poser les appuis, arrêt du dispositif et retour au cadre d’ensemble.

##### Black Chamber Hunt

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Double trajectoire / Bond de Slasher Hawk.

Plan 1 : approche jusqu’à la distance réelle de « Double trajectoire / Bond de Slasher Hawk », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Double trajectoire / Bond de Slasher Hawk », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : cesser la poussée puis poser les appuis, prise de distance et maintien final.

##### Slasher Finish

Famille `blade`, ton `stylized` ; 274 ticks CQC ; phases actuelles : dash → crosscut → freeze → sheath. Appuis déclarés : Double trajectoire / Projection.

Plan 1 : après une observation ou un repli, SLASHER HAWK reprend l’initiative par « Double trajectoire / Projection ». Plan 2 : armer la lame ou le membre de « Double trajectoire / Projection » et dégager son arc. Plan 3 : enchaîner des coupes lisibles avec angles distincts ; les impacts et les réactions suivent le fil de lame, sans ajout d’arme d’une autre incarnation. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : cesser la poussée puis poser les appuis, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Official artwork establishes shirtless athletic male, darkwildhair, purple highwaisted trousers/belts, boots, white forearmwraps with barefingers and pale giantboomerang; precise unseen rearseams and curve translation at small originalresolution remain closest2.5D interpretation.
- Guardian hawk is a separate canonical companion shown above/behindhead in official artwork; no detached bird inserted into human poseatlas. Separate companion/projectile VFX research handed toVFXagent.
- Sixteen combatkeyposes per direction are authored adaptation, no original2000frame-by-frame motion certification.
- Equipment is boomerang, no firearm or phantom gunmuzzle.
- [Original official Konami released-character coloured full-body illustration plus publisher online manual upperbody PNG and official art-design JPEG, downloaded unmodified and physically viewed.](https://www.konami.com/mg/archive/ghostbabel/japanese/character/pic/hawk_l.gif) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__owl

### MARIONETTE OWL — GHOST BABEL / BLACK CHAMBER

**Rôle :** Marionnettes et couteaux. **Profil :** `owl`.

**Base présente dans le code :** Marionnettes et attaques préparées ; système de fil destructible adapté au versus.

**Incarnation à conserver :** Marionette Owl, released2000 Ghost Babel Black Chamber appearance; male controller only.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `blade` = light, heavy, specialDown ; `deploy` = specialForward, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialForward, specialBack, super, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** MARIONETTE OWL : arme/équipement de Marionette Owl et lecture du piège séparés. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** positionnement tactique, approche et retrait propres au corps. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Marionnettes et couteaux » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder arme/équipement de Marionette Owl et lecture du piège séparés.
- **jump_land :** MARIONETTE OWL : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. positionnement tactique, approche et retrait propres au corps. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de MARIONETTE OWL. Terminer par refermer le dispositif et conserver la silhouette de Ghost Babel. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « GHOST BABEL / BLACK CHAMBER », présentation de Marionette Owl, released2000 Ghost Babel Black Chamber appearance; male controller only., puis arme/équipement de Marionette Owl et lecture du piège séparés. Geste court lié à « Marionnette articulée » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, refermer le dispositif et conserver la silhouette de Ghost Babel ; MARIONETTE OWL vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à GHOST BABEL / BLACK CHAMBER.
- **round_loss :** Proposition CQC : MARIONETTE OWL réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Théâtre des poupées », revenir par refermer le dispositif et conserver la silhouette de Ghost Babel, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Contact de lame

**Existant :** `melee` / `knife` ; 7/3/12 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MARIONETTE OWL, préparer « Contact de lame » ; arme/équipement de Marionette Owl et lecture du piège séparés. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** refermer le dispositif et conserver la silhouette de Ghost Babel. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Coupe engagée

**Existant :** `melee` / `knife` ; 18/5/24 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MARIONETTE OWL, préparer « Coupe engagée » ; arme/équipement de Marionette Owl et lecture du piège séparés. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** refermer le dispositif et conserver la silhouette de Ghost Babel. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MARIONETTE OWL, préparer « Balayage » ; arme/équipement de Marionette Owl et lecture du piège séparés. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** refermer le dispositif et conserver la silhouette de Ghost Babel.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MARIONETTE OWL, préparer « Projection » ; arme/équipement de Marionette Owl et lecture du piège séparés. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** refermer le dispositif et conserver la silhouette de Ghost Babel. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Marionnette articulée

**Existant :** `trap` / `puppet` ; 34/1/34 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MARIONETTE OWL, préparer « Marionnette articulée » ; arme/équipement de Marionette Owl et lecture du piège séparés. Prendre le dispositif, s’abaisser vers le support et indiquer le lieu de pose avant activation.

**Action.** Poser « Marionnette articulée » au point réel de main/outil, armer puis retirer le membre. Le dispositif possède ensuite son propre sprite, ses états attente/armement/déclenchement/destruction et sa collision.

**Retour.** refermer le dispositif et conserver la silhouette de Ghost Babel. Se dégager de l’objet sans le téléporter ; l’interruption avant armement a sa propre sortie.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Marionnette ou drone visible et destructible ; deux maximum.

##### specialDown — Couteau d’Owl

**Existant :** `projectile` / `knife` ; 14/1/22 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MARIONETTE OWL, préparer « Couteau d’Owl » ; arme/équipement de Marionette Owl et lecture du piège séparés. Prélever l’objet correspondant à « Couteau d’Owl », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps.

**Retour.** refermer le dispositif et conserver la silhouette de Ghost Babel. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialForward — Fil de contrôle

**Existant :** `projectile` / `puppet` ; 32/1/34 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MARIONETTE OWL, préparer « Fil de contrôle » ; arme/équipement de Marionette Owl et lecture du piège séparés. Donner à la source de « Fil de contrôle » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet puppet de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet.

**Retour.** refermer le dispositif et conserver la silhouette de Ghost Babel. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut ou garde basse ; ralentissement bref, aucune confiscation des commandes.

##### specialBack — Pas hors des fils

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MARIONETTE OWL, préparer « Pas hors des fils » ; arme/équipement de Marionette Owl et lecture du piège séparés. Préparer l’appui qui produit le déplacement ; positionnement tactique, approche et retrait propres au corps.

**Action.** Exécuter « Pas hors des fils » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** refermer le dispositif et conserver la silhouette de Ghost Babel. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Théâtre des poupées

**Existant :** `projectile` / `puppet` ; 35/1/44 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MARIONETTE OWL, préparer « Théâtre des poupées » ; arme/équipement de Marionette Owl et lecture du piège séparés. Donner à la source de « Théâtre des poupées » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet puppet de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet. La salve contient 4 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** refermer le dispositif et conserver la silhouette de Ghost Babel. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 4 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Stabiliser la réserve

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MARIONETTE OWL, préparer « Stabiliser la réserve » ; arme/équipement de Marionette Owl et lecture du piège séparés. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Stabiliser la réserve ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** refermer le dispositif et conserver la silhouette de Ghost Babel. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Puppet Theater

Famille `psychic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : lift → orbit → crush → drop. Appuis déclarés : Théâtre des poupées / Marionnette articulée.

Plan 1 : MARIONETTE OWL sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Théâtre des poupées / Marionnette articulée ». Plan 2 : montrer la source corporelle ou matérielle de « Théâtre des poupées / Marionnette articulée ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : refermer le dispositif et conserver la silhouette de Ghost Babel, pose de signature face à l’adversaire.

##### String Cut

Famille `psychic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : lift → orbit → crush → drop. Appuis déclarés : Théâtre des poupées / Couteau d’Owl.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Théâtre des poupées / Couteau d’Owl » ; l’espace disponible doit être lisible. Plan 2 : montrer la source corporelle ou matérielle de « Théâtre des poupées / Couteau d’Owl ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : refermer le dispositif et conserver la silhouette de Ghost Babel, arrêt du dispositif et retour au cadre d’ensemble.

##### Marionette Finale

Famille `psychic`, ton `stylized` ; 256 ticks CQC ; phases actuelles : lift → orbit → crush → drop. Appuis déclarés : Théâtre des poupées / Fil de contrôle.

Plan 1 : approche jusqu’à la distance réelle de « Théâtre des poupées / Fil de contrôle », arme et main libre identifiées. Plan 2 : montrer la source corporelle ou matérielle de « Théâtre des poupées / Fil de contrôle ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : refermer le dispositif et conserver la silhouette de Ghost Babel, prise de distance et maintien final.

##### Owl Falls

Famille `psychic`, ton `stylized` ; 274 ticks CQC ; phases actuelles : lift → orbit → crush → drop. Appuis déclarés : Théâtre des poupées / Projection.

Plan 1 : après une observation ou un repli, MARIONETTE OWL reprend l’initiative par « Théâtre des poupées / Projection ». Plan 2 : montrer la source corporelle ou matérielle de « Théâtre des poupées / Projection ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : refermer le dispositif et conserver la silhouette de Ghost Babel, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- The official illustration establishes pale young-adult male, shaggy dark hair, open-V dark coat with pale collar trim, dark sash/trousers and boots partly occluded by the puppets. Unseen rear seams and complete lower body remain restrained interpretation.
- Only the central male is drawn in this sixteen-pose atlas. Two female bunraku puppets are separate canonical companions; no owl animal is inferred from the codename. Elsie/Frances from AC!D are unrelated. Puppet names are not claimed from the official page, which gives none.
- Independent left and right defensive/control keyposes are authored gameplay adaptation; no invented knife or firearm.
- Right-v1 had a shoe touching the outer PNG edge. Left-v1 and left-v2 contained inaccurate recoil/windup positions. All originals remain preserved; selected right-v2 and left-v3 show sixteen complete separate figures without edge contact.
- [Original official Konami coloured character art and publisher manual PNG, physically viewed. Original Japanese character page independently proves two bunraku puppet companions.](https://www.konami.com/mg/archive/ghostbabel/japanese/character/pic/owl_l.gif) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__pyro

### PYRO BISON — GHOST BABEL / BLACK CHAMBER

**Rôle :** Lance-flammes et propulseur. **Profil :** `pyro`.

**Base présente dans le code :** Lance-flammes et équipement thermique de Pyro Bison ; pas d’ailes de The Fury.

**Incarnation à conserver :** Pyro Bison, released2000 Ghost Babel Black Chamber flamethrower appearance.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `tuxedo`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** PYRO BISON : buse, réservoir et conduites solidaires des prises de main. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas qui compensent le réservoir ; tuyau ne traverse pas le torse. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Lance-flammes et propulseur » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder buse, réservoir et conduites solidaires des prises de main.
- **jump_land :** PYRO BISON : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas qui compensent le réservoir ; tuyau ne traverse pas le torse. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de PYRO BISON. Terminer par arrêt de flamme, stabilisation de la buse et refroidissement visible. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « GHOST BABEL / BLACK CHAMBER », présentation de Pyro Bison, released2000 Ghost Babel Black Chamber flamethrower appearance., puis buse, réservoir et conduites solidaires des prises de main. Geste court lié à « Jet de Pyro Bison » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, arrêt de flamme, stabilisation de la buse et refroidissement visible ; PYRO BISON vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à GHOST BABEL / BLACK CHAMBER.
- **round_loss :** Proposition CQC : PYRO BISON réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Fournaise de Gindra », revenir par arrêt de flamme, stabilisation de la buse et refroidissement visible, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PYRO BISON, préparer « Jab » ; buse, réservoir et conduites solidaires des prises de main. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** arrêt de flamme, stabilisation de la buse et refroidissement visible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PYRO BISON, préparer « Frappe engagée » ; buse, réservoir et conduites solidaires des prises de main. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** arrêt de flamme, stabilisation de la buse et refroidissement visible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PYRO BISON, préparer « Balayage » ; buse, réservoir et conduites solidaires des prises de main. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** arrêt de flamme, stabilisation de la buse et refroidissement visible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PYRO BISON, préparer « Projection » ; buse, réservoir et conduites solidaires des prises de main. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** arrêt de flamme, stabilisation de la buse et refroidissement visible. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Jet de Pyro Bison

**Existant :** `projectile` / `fire` ; 24/1/33 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PYRO BISON, préparer « Jet de Pyro Bison » ; buse, réservoir et conduites solidaires des prises de main. Montrer la prise et la visée de l’arme décrite par « Jet de Pyro Bison » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 3 émissions, espacées de 7 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** arrêt de flamme, stabilisation de la buse et refroidissement visible. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 3 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### specialDown — Nappe thermique

**Existant :** `trap` / `fire` ; 33/1/35 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PYRO BISON, préparer « Nappe thermique » ; buse, réservoir et conduites solidaires des prises de main. Prendre le dispositif, s’abaisser vers le support et indiquer le lieu de pose avant activation.

**Action.** Poser « Nappe thermique » au point réel de main/outil, armer puis retirer le membre. Le dispositif possède ensuite son propre sprite, ses états attente/armement/déclenchement/destruction et sa collision.

**Retour.** arrêt de flamme, stabilisation de la buse et refroidissement visible. Se dégager de l’objet sans le téléporter ; l’interruption avant armement a sa propre sortie.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Zone annoncée puis persistante ; sauter, contourner ou neutraliser le dispositif.

##### specialForward — Charge de Bison

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PYRO BISON, préparer « Charge de Bison » ; buse, réservoir et conduites solidaires des prises de main. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Charge de Bison » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** arrêt de flamme, stabilisation de la buse et refroidissement visible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Tenue thermique

**Existant :** `buff` / `armor` ; 22/1/31 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PYRO BISON, préparer « Tenue thermique » ; buse, réservoir et conduites solidaires des prises de main. Montrer la préparation corporelle ou mécanique de « Tenue thermique ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** arrêt de flamme, stabilisation de la buse et refroidissement visible. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Absorbe une seule frappe ; projections, EMP et attaques brise-armure la contrent.

##### super — Fournaise de Gindra

**Existant :** `projectile` / `fire` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PYRO BISON, préparer « Fournaise de Gindra » ; buse, réservoir et conduites solidaires des prises de main. Montrer la prise et la visée de l’arme décrite par « Fournaise de Gindra » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 5 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** arrêt de flamme, stabilisation de la buse et refroidissement visible. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 5 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Refroidir

**Existant :** `recover` / `recovery` ; 45/1/25 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PYRO BISON, préparer « Refroidir » ; buse, réservoir et conduites solidaires des prises de main. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Refroidir ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** arrêt de flamme, stabilisation de la buse et refroidissement visible. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Refroidissement ou pause tactique interrompable ; aucun soin gratuit.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Flamethrower Rush

Famille `fire`, ton `stylized` ; 220 ticks CQC ; phases actuelles : ignite → sweep → inferno → embers. Appuis déclarés : Fournaise de Gindra / Jet de Pyro Bison.

Plan 1 : PYRO BISON sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Fournaise de Gindra / Jet de Pyro Bison ». Plan 2 : montrer la source corporelle ou matérielle de « Fournaise de Gindra / Jet de Pyro Bison ». Plan 3 : développer l’effet fire en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : arrêt de flamme, stabilisation de la buse et refroidissement visible, pose de signature face à l’adversaire.

##### Thermal Plant

Famille `fire`, ton `stylized` ; 238 ticks CQC ; phases actuelles : ignite → sweep → inferno → embers. Appuis déclarés : Fournaise de Gindra / Nappe thermique.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Fournaise de Gindra / Nappe thermique » ; l’espace disponible doit être lisible. Plan 2 : montrer la source corporelle ou matérielle de « Fournaise de Gindra / Nappe thermique ». Plan 3 : développer l’effet fire en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : arrêt de flamme, stabilisation de la buse et refroidissement visible, arrêt du dispositif et retour au cadre d’ensemble.

##### Bison Charge

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Fournaise de Gindra / Charge de Bison.

Plan 1 : approche jusqu’à la distance réelle de « Fournaise de Gindra / Charge de Bison », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Fournaise de Gindra / Charge de Bison », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : arrêt de flamme, stabilisation de la buse et refroidissement visible, prise de distance et maintien final.

##### Fire Extinguished

Famille `fire`, ton `stylized` ; 274 ticks CQC ; phases actuelles : ignite → sweep → inferno → embers. Appuis déclarés : Fournaise de Gindra / Projection.

Plan 1 : après une observation ou un repli, PYRO BISON reprend l’initiative par « Fournaise de Gindra / Projection ». Plan 2 : montrer la source corporelle ou matérielle de « Fournaise de Gindra / Projection ». Plan 3 : développer l’effet fire en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : arrêt de flamme, stabilisation de la buse et refroidissement visible, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Authentic large pale adult, bald crown with wild white-grey side/back hair and facial hair, dark purple sleeveless top/trousers/boots, exposed bare arms/hands, SINGLE tan vertical fuel tank with pink-red band, hose and long brass tube flamethrower preserved. Unseen rear seams remain closest 2.5D interpretation.
- visualFirearmPresent=false disables only a ballistic muzzle flash; the visually present weapon is a flamethrower, not an absent weapon. Native nozzle origins are provided separately; existing flame jet and gameplay remain intact.
- No baked flame, flash, smoke or ground shadow. Both independent directional atlases contain sixteen connected figures without outer edge contact.
- Sixteen gameplay keyposes per direction are authored adaptation; right low-action pose is a compact weighted knee/weapon-brace rather than an extended low kick. Heavy tank and long nozzle stay physically contained.
- [Original official Konami coloured full-body illustration, official art JPEG and publisher online manual PNG downloaded unmodified and physically viewed.](https://www.konami.com/mg/archive/ghostbabel/japanese/character/pic/bison_l.gif) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).
