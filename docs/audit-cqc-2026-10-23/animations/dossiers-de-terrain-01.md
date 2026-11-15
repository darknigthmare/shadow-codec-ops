# Animations — DOSSIERS DE TERRAIN

**10 acteurs du registre courant.** Les titres d’actions et paramètres sont observés ; les descriptions sont des propositions CQC à produire et valider. Un groupe de frames existant ne certifie pas l’ensemble du mouvement ou sa fidélité originale.

[Index des fiches](README.md) · [Contrat commun](../04_ANIMATIONS_SPRITES.md)

## Sommaire

- [WANDERER](#pass19__wanderer_survive) — SURVIVE
- [TRACKER](#pass19__tracker_survive) — SURVIVE
- [MORTAR](#pass19__mortar_survive) — SURVIVE
- [CRAWLER](#pass19__crawler_survive) — SURVIVE
- [BIG MOUTH](#pass19__big_mouth_survive) — SURVIVE
- [FROSTBITE](#pass19__frostbite_survive) — SURVIVE
- [GEKKO — UNITÉ SUICIDE](#pass19__gekko_suicide_mgs4) — MGS4
- [GEKKO — LANCE-MISSILES](#pass19__gekko_missile_mgs4) — MGS4
- [GEKKO — DESPERADO](#pass19__gekko_mgr) — MGR
- [TRIPODS — INFILTRATION](#pass19__dwarf_gekko_trenchcoat_mgs4) — MGS4

## pass19__wanderer_survive

### WANDERER — SURVIVE

**Rôle :** Créature : charge et blindage cristallin. **Profil :** `wanderer`.

**Base présente dans le code :** Human remnant with red-black crystalline head growth, damaged exposed torso and torn civilian trousers.

**Incarnation à conserver :** Released2018 creature, source-led native 2.5D CQC adaptation

**État vérifié :** métadonnées natives avec limites. 32 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, blade, heavy, low, throw, shoot, charge, deploy, reload, optic, recover, roll, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, special ; `heavy` = heavy, specialForward, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** WANDERER : silhouette déformée et organe cristallin propres au type de Wanderer. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** démarche irrégulière avec appuis malgré la déformation. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Créature : charge et blindage cristallin » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder silhouette déformée et organe cristallin propres au type de Wanderer.
- **jump_land :** WANDERER : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. démarche irrégulière avec appuis malgré la déformation. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de WANDERER. Terminer par déséquilibre puis réorientation de la masse. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « SURVIVE », présentation de Released2018 creature, source-led native 2.5D CQC adaptation, puis silhouette déformée et organe cristallin propres au type de Wanderer. Geste court lié à « Assaut » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, déséquilibre puis réorientation de la masse ; WANDERER vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à SURVIVE.
- **round_loss :** Proposition CQC : WANDERER réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Assaut décisif », revenir par déséquilibre puis réorientation de la masse, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Contact de la créature

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de WANDERER, préparer « Contact de la créature » ; silhouette déformée et organe cristallin propres au type de Wanderer. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Contact de la créature » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** déséquilibre puis réorientation de la masse.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### heavy — Percussion cristalline

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de WANDERER, préparer « Percussion cristalline » ; silhouette déformée et organe cristallin propres au type de Wanderer. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Percussion cristalline », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** déséquilibre puis réorientation de la masse.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de WANDERER, préparer « Balayage » ; silhouette déformée et organe cristallin propres au type de Wanderer. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** déséquilibre puis réorientation de la masse.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### throw — Saisie de la créature

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de WANDERER, préparer « Saisie de la créature » ; silhouette déformée et organe cristallin propres au type de Wanderer. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** déséquilibre puis réorientation de la masse. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### special — Assaut

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de WANDERER, préparer « Assaut » ; silhouette déformée et organe cristallin propres au type de Wanderer. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Assaut » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** déséquilibre puis réorientation de la masse.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### specialDown — Repli de la créature

**Existant :** `mobility` / `movement` ; 22/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de WANDERER, préparer « Repli de la créature » ; silhouette déformée et organe cristallin propres au type de Wanderer. Préparer l’appui qui produit le déplacement ; démarche irrégulière avec appuis malgré la déformation.

**Action.** Exécuter « Repli de la créature » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -5 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** déséquilibre puis réorientation de la masse. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### specialForward — Ruée

**Existant :** `melee` / `strike` ; 10/3/32 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de WANDERER, préparer « Ruée » ; silhouette déformée et organe cristallin propres au type de Wanderer. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Ruée » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** déséquilibre puis réorientation de la masse.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### specialBack — Décrochage de la créature

**Existant :** `mobility` / `movement` ; 10/13/24 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de WANDERER, préparer « Décrochage de la créature » ; silhouette déformée et organe cristallin propres au type de Wanderer. Préparer l’appui qui produit le déplacement ; démarche irrégulière avec appuis malgré la déformation.

**Action.** Exécuter « Décrochage de la créature » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -4 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** déséquilibre puis réorientation de la masse. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### super — Assaut décisif

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de WANDERER, préparer « Assaut décisif » ; silhouette déformée et organe cristallin propres au type de Wanderer. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Assaut décisif », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** déséquilibre puis réorientation de la masse.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### utility — Reprise d’activité

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de WANDERER, préparer « Reprise d’activité » ; silhouette déformée et organe cristallin propres au type de Wanderer. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Reprise d’activité ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** déséquilibre puis réorientation de la masse. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Assaut décisif · conclusion

Famille `beast`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Assaut décisif.

Plan 1 : WANDERER sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Assaut décisif ». Plan 2 : démarche irrégulière avec appuis malgré la déformation ; montrer l’organe de « Assaut décisif ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : déséquilibre puis réorientation de la masse, pose de signature face à l’adversaire.

##### Repli de la créature · conclusion

Famille `beast`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Repli de la créature.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Repli de la créature » ; l’espace disponible doit être lisible. Plan 2 : démarche irrégulière avec appuis malgré la déformation ; montrer l’organe de « Repli de la créature ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : déséquilibre puis réorientation de la masse, arrêt du dispositif et retour au cadre d’ensemble.

##### Ruée · conclusion

Famille `beast`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Ruée.

Plan 1 : approche jusqu’à la distance réelle de « Ruée », arme et main libre identifiées. Plan 2 : démarche irrégulière avec appuis malgré la déformation ; montrer l’organe de « Ruée ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : déséquilibre puis réorientation de la masse, prise de distance et maintien final.

##### Saisie de la créature · conclusion

Famille `beast`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Saisie de la créature.

Plan 1 : après une observation ou un repli, WANDERER reprend l’initiative par « Saisie de la créature ». Plan 2 : démarche irrégulière avec appuis malgré la déformation ; montrer l’organe de « Saisie de la créature ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : déséquilibre puis réorientation de la masse, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Source-backed visible appearance is adapted to native ink2.5D sprites. Exact unseen surfaces and literal pixel-perfect 1:1 topology are not certified.
- Canonical shirtless appearance and trousers supported by official gameplay + licensed Gecco sculpture; pose motion/rear occlusion is authored adaptation.
- Exactly16 independently authored selected physical keyposes in each direction,32 per identity. Multiple action groups share keyposes explicitly; no claim of72 independently drawn frames.
- Both facing atlases are independently generated. Native PNG bytes are retained unchanged; alpha geometry and optional Canvas vector clipping isolate connected physical poses without rewriting raster pixels.
- CQC move timing, reach, hitboxes, projectiles, costume and scale rules remain authored gameplay adaptations; displayHeight is presentation only, not an officially certified world measurement.
- [Official screenshot of standard Wanderer.](https://eu-support.konami.com/hc/en-gb/articles/9649446866327-Creatures) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Licensed Gecco full body sculpture, including original trousers/boots; not an extracted game model.](https://gecco.co.jp/en/product/wanderer/) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## pass19__tracker_survive

### TRACKER — SURVIVE

**Rôle :** Créature : charge et blindage cristallin. **Profil :** `tracker`.

**Base présente dans le code :** Leaping human-derived creature; elongated red crystal head and visibly mutated dark legs.

**Incarnation à conserver :** Released2018 creature, source-led native 2.5D CQC adaptation

**État vérifié :** métadonnées natives avec limites. 32 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, blade, heavy, low, throw, shoot, charge, deploy, reload, optic, recover, roll, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, special ; `heavy` = heavy, specialForward, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** TRACKER : organe sensoriel et silhouette du Tracker de Survive distincts d’un Wanderer ordinaire. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** recherche puis approche guidée par le sens montré, et non par une visée armée inventée. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Créature : charge et blindage cristallin » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder organe sensoriel et silhouette du Tracker de Survive distincts d’un Wanderer ordinaire.
- **jump_land :** TRACKER : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. recherche puis approche guidée par le sens montré, et non par une visée armée inventée. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de TRACKER. Terminer par recentrer l’organe sensoriel après l’attaque. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « SURVIVE », présentation de Released2018 creature, source-led native 2.5D CQC adaptation, puis organe sensoriel et silhouette du Tracker de Survive distincts d’un Wanderer ordinaire. Geste court lié à « Bond du Tracker » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, recentrer l’organe sensoriel après l’attaque ; TRACKER vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à SURVIVE.
- **round_loss :** Proposition CQC : TRACKER réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Assaut décisif », revenir par recentrer l’organe sensoriel après l’attaque, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Contact de la créature

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de TRACKER, préparer « Contact de la créature » ; organe sensoriel et silhouette du Tracker de Survive distincts d’un Wanderer ordinaire. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Contact de la créature » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recentrer l’organe sensoriel après l’attaque.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### heavy — Percussion cristalline

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de TRACKER, préparer « Percussion cristalline » ; organe sensoriel et silhouette du Tracker de Survive distincts d’un Wanderer ordinaire. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Percussion cristalline », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** recentrer l’organe sensoriel après l’attaque.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de TRACKER, préparer « Balayage » ; organe sensoriel et silhouette du Tracker de Survive distincts d’un Wanderer ordinaire. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** recentrer l’organe sensoriel après l’attaque.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### throw — Saisie de la créature

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de TRACKER, préparer « Saisie de la créature » ; organe sensoriel et silhouette du Tracker de Survive distincts d’un Wanderer ordinaire. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recentrer l’organe sensoriel après l’attaque. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### special — Bond du Tracker

**Existant :** `melee` / `strike` ; 17/7/28 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de TRACKER, préparer « Bond du Tracker » ; organe sensoriel et silhouette du Tracker de Survive distincts d’un Wanderer ordinaire. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Bond du Tracker » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recentrer l’organe sensoriel après l’attaque.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### specialDown — Repli de la créature

**Existant :** `mobility` / `movement` ; 22/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de TRACKER, préparer « Repli de la créature » ; organe sensoriel et silhouette du Tracker de Survive distincts d’un Wanderer ordinaire. Préparer l’appui qui produit le déplacement ; recherche puis approche guidée par le sens montré, et non par une visée armée inventée.

**Action.** Exécuter « Repli de la créature » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -5 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** recentrer l’organe sensoriel après l’attaque. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### specialForward — Griffes en poursuite

**Existant :** `melee` / `strike` ; 10/4/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de TRACKER, préparer « Griffes en poursuite » ; organe sensoriel et silhouette du Tracker de Survive distincts d’un Wanderer ordinaire. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Griffes en poursuite » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recentrer l’organe sensoriel après l’attaque.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### specialBack — Décrochage de la créature

**Existant :** `mobility` / `movement` ; 10/13/24 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de TRACKER, préparer « Décrochage de la créature » ; organe sensoriel et silhouette du Tracker de Survive distincts d’un Wanderer ordinaire. Préparer l’appui qui produit le déplacement ; recherche puis approche guidée par le sens montré, et non par une visée armée inventée.

**Action.** Exécuter « Décrochage de la créature » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -4 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** recentrer l’organe sensoriel après l’attaque. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### super — Assaut décisif

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de TRACKER, préparer « Assaut décisif » ; organe sensoriel et silhouette du Tracker de Survive distincts d’un Wanderer ordinaire. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Assaut décisif », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** recentrer l’organe sensoriel après l’attaque.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### utility — Reprise d’activité

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de TRACKER, préparer « Reprise d’activité » ; organe sensoriel et silhouette du Tracker de Survive distincts d’un Wanderer ordinaire. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Reprise d’activité ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** recentrer l’organe sensoriel après l’attaque. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Assaut décisif · conclusion

Famille `beast`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Assaut décisif.

Plan 1 : TRACKER sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Assaut décisif ». Plan 2 : recherche puis approche guidée par le sens montré, et non par une visée armée inventée ; montrer l’organe de « Assaut décisif ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : recentrer l’organe sensoriel après l’attaque, pose de signature face à l’adversaire.

##### Repli de la créature · conclusion

Famille `beast`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Repli de la créature.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Repli de la créature » ; l’espace disponible doit être lisible. Plan 2 : recherche puis approche guidée par le sens montré, et non par une visée armée inventée ; montrer l’organe de « Repli de la créature ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : recentrer l’organe sensoriel après l’attaque, arrêt du dispositif et retour au cadre d’ensemble.

##### Griffes en poursuite · conclusion

Famille `beast`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Griffes en poursuite.

Plan 1 : approche jusqu’à la distance réelle de « Griffes en poursuite », arme et main libre identifiées. Plan 2 : recherche puis approche guidée par le sens montré, et non par une visée armée inventée ; montrer l’organe de « Griffes en poursuite ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : recentrer l’organe sensoriel après l’attaque, prise de distance et maintien final.

##### Saisie de la créature · conclusion

Famille `beast`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Saisie de la créature.

Plan 1 : après une observation ou un repli, TRACKER reprend l’initiative par « Saisie de la créature ». Plan 2 : recherche puis approche guidée par le sens montré, et non par une visée armée inventée ; montrer l’organe de « Saisie de la créature ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : recentrer l’organe sensoriel après l’attaque, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Source-backed visible appearance is adapted to native ink2.5D sprites. Exact unseen surfaces and literal pixel-perfect 1:1 topology are not certified.
- Official source directly establishes mutated dark legs, torso, arms and red crystal head; precise feet and hidden reverse surfaces are conservative source-led reconstruction.
- Exactly16 independently authored selected physical keyposes in each direction,32 per identity. Multiple action groups share keyposes explicitly; no claim of72 independently drawn frames.
- Both facing atlases are independently generated. Native PNG bytes are retained unchanged; alpha geometry and optional Canvas vector clipping isolate connected physical poses without rewriting raster pixels.
- CQC move timing, reach, hitboxes, projectiles, costume and scale rules remain authored gameplay adaptations; displayHeight is presentation only, not an officially certified world measurement.
- [Official Tracker screenshot with human-derived torso, red crystal head and black mutated legs.](https://eu-support.konami.com/hc/en-gb/articles/9649446866327-Creatures) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## pass19__mortar_survive

### MORTAR — SURVIVE

**Rôle :** Créature : charge et blindage cristallin. **Profil :** `mortar`.

**Base présente dans le code :** Armoured crystalline humanoid; enlarged cannon on anatomical RIGHT arm in original front-facing camera. Community summary naming LEFT conflicts with directly viewed capture.

**Incarnation à conserver :** Released2018 creature, source-led native 2.5D CQC adaptation

**État vérifié :** métadonnées natives avec limites. 32 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, blade, heavy, low, throw, shoot, charge, deploy, reload, optic, recover, roll, parry, hit, ko.

**Réemplois à examiner :** `charge` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** MORTAR : organe-canon biologique et appuis du Mortar de Survive. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** repositionnement du corps avant mise en batterie. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Créature : charge et blindage cristallin » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder organe-canon biologique et appuis du Mortar de Survive.
- **jump_land :** MORTAR : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. repositionnement du corps avant mise en batterie. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de MORTAR. Terminer par recul de l’organe puis rétablissement de l’appui. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « SURVIVE », présentation de Released2018 creature, source-led native 2.5D CQC adaptation, puis organe-canon biologique et appuis du Mortar de Survive. Geste court lié à « Salve cristalline » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, recul de l’organe puis rétablissement de l’appui ; MORTAR vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à SURVIVE.
- **round_loss :** Proposition CQC : MORTAR réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Bombardement cristallin », revenir par recul de l’organe puis rétablissement de l’appui, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Contact de la créature

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MORTAR, préparer « Contact de la créature » ; organe-canon biologique et appuis du Mortar de Survive. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Contact de la créature » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul de l’organe puis rétablissement de l’appui.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### heavy — Percussion cristalline

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MORTAR, préparer « Percussion cristalline » ; organe-canon biologique et appuis du Mortar de Survive. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Percussion cristalline », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** recul de l’organe puis rétablissement de l’appui.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MORTAR, préparer « Balayage » ; organe-canon biologique et appuis du Mortar de Survive. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** recul de l’organe puis rétablissement de l’appui.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### throw — Saisie de la créature

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MORTAR, préparer « Saisie de la créature » ; organe-canon biologique et appuis du Mortar de Survive. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recul de l’organe puis rétablissement de l’appui. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### special — Salve cristalline

**Existant :** `projectile` / `explosive` ; 30/1/34 ticks ; groupe `charge`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MORTAR, préparer « Salve cristalline » ; organe-canon biologique et appuis du Mortar de Survive. Prélever l’objet correspondant à « Salve cristalline », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 72 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** recul de l’organe puis rétablissement de l’appui. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe l’arc et quitte la zone avant l’explosion.

##### specialDown — Repli de la créature

**Existant :** `mobility` / `movement` ; 22/1/31 ticks ; groupe `walk`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MORTAR, préparer « Repli de la créature » ; organe-canon biologique et appuis du Mortar de Survive. Préparer l’appui qui produit le déplacement ; repositionnement du corps avant mise en batterie.

**Action.** Exécuter « Repli de la créature » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -5 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** recul de l’organe puis rétablissement de l’appui. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### specialForward — Tir de couverture

**Existant :** `projectile` / `explosive` ; 22/1/31 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MORTAR, préparer « Tir de couverture » ; organe-canon biologique et appuis du Mortar de Survive. Prélever l’objet correspondant à « Tir de couverture », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 55 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** recul de l’organe puis rétablissement de l’appui. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### specialBack — Décrochage de la créature

**Existant :** `mobility` / `movement` ; 10/13/24 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MORTAR, préparer « Décrochage de la créature » ; organe-canon biologique et appuis du Mortar de Survive. Préparer l’appui qui produit le déplacement ; repositionnement du corps avant mise en batterie.

**Action.** Exécuter « Décrochage de la créature » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -4 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** recul de l’organe puis rétablissement de l’appui. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### super — Bombardement cristallin

**Existant :** `projectile` / `explosive` ; 37/1/45 ticks ; groupe `charge`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MORTAR, préparer « Bombardement cristallin » ; organe-canon biologique et appuis du Mortar de Survive. Prélever l’objet correspondant à « Bombardement cristallin », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. La salve contient 3 émissions, espacées de 13 ticks CQC : recalculer le point de bouche à chaque départ. L’objet conserve sa mèche de 76 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** recul de l’organe puis rétablissement de l’appui. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### utility — Reprise d’activité

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MORTAR, préparer « Reprise d’activité » ; organe-canon biologique et appuis du Mortar de Survive. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Reprise d’activité ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** recul de l’organe puis rétablissement de l’appui. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Bombardement cristallin · conclusion

Famille `beast`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Bombardement cristallin.

Plan 1 : MORTAR sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Bombardement cristallin ». Plan 2 : repositionnement du corps avant mise en batterie ; montrer l’organe de « Bombardement cristallin ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : recul de l’organe puis rétablissement de l’appui, pose de signature face à l’adversaire.

##### Repli de la créature · conclusion

Famille `beast`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Repli de la créature.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Repli de la créature » ; l’espace disponible doit être lisible. Plan 2 : repositionnement du corps avant mise en batterie ; montrer l’organe de « Repli de la créature ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : recul de l’organe puis rétablissement de l’appui, arrêt du dispositif et retour au cadre d’ensemble.

##### Tir de couverture · conclusion

Famille `beast`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Tir de couverture.

Plan 1 : approche jusqu’à la distance réelle de « Tir de couverture », arme et main libre identifiées. Plan 2 : repositionnement du corps avant mise en batterie ; montrer l’organe de « Tir de couverture ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : recul de l’organe puis rétablissement de l’appui, prise de distance et maintien final.

##### Saisie de la créature · conclusion

Famille `beast`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Saisie de la créature.

Plan 1 : après une observation ou un repli, MORTAR reprend l’initiative par « Saisie de la créature ». Plan 2 : repositionnement du corps avant mise en batterie ; montrer l’organe de « Saisie de la créature ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : recul de l’organe puis rétablissement de l’appui, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Source-backed visible appearance is adapted to native ink2.5D sprites. Exact unseen surfaces and literal pixel-perfect 1:1 topology are not certified.
- Original screenshot is visual authority for enlarged cannon arm; community text differs on arm naming, so right-arm assignment is an observed front-body reading requiring review, not certified exact model topology.
- Exactly16 independently authored selected physical keyposes in each direction,32 per identity. Multiple action groups share keyposes explicitly; no claim of72 independently drawn frames.
- Both facing atlases are independently generated. Native PNG bytes are retained unchanged; alpha geometry and optional Canvas vector clipping isolate connected physical poses without rewriting raster pixels.
- CQC move timing, reach, hitboxes, projectiles, costume and scale rules remain authored gameplay adaptations; displayHeight is presentation only, not an officially certified world measurement.
- [Original released-game front-body capture of Mortar; enlarged cannon arm on viewer-left. Anatomical side interpretation differs from community text.](https://gameranx.com/features/id/140946/article/metal-gear-survive-walkthrough-chapter-18-find-sahelanthropus/) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## pass19__crawler_survive

### CRAWLER — SURVIVE

**Rôle :** Créature : charge et blindage cristallin. **Profil :** `crawler`.

**Base présente dans le code :** Small crawling multi-limbed organic creature; full anatomy must be checked against a released-game capture before drawing.

**Incarnation à conserver :** Released2018 creature, source-led native 2.5D CQC adaptation

**État vérifié :** métadonnées natives avec limites. 32 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, blade, heavy, low, throw, shoot, charge, deploy, reload, optic, recover, roll, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, special ; `heavy` = heavy, specialForward, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** CRAWLER : corps au sol et membres du Crawler identifiables. Respiration et petit mouvement de tête/oreilles/queue selon l’anatomie ; les pattes restent stables. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** progression rampante par véritables appuis, sans cycle de marche debout. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Créature : charge et blindage cristallin » : abaissement et orientation défensive de la tête et du tronc ; ne pas ajouter une parade humaine à deux bras ; recul bloqué distinct de la simple position basse. Garder corps au sol et membres du Crawler identifiables.
- **jump_land :** CRAWLER : regroupement des appuis arrière, bond, extension en vol puis réception par les appuis avant et arrière adaptés à l’espèce. progression rampante par véritables appuis, sans cycle de marche debout. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Réactions de tête, de flanc et de patte de CRAWLER, perte d’appui puis relevé par les membres réellement présents. Terminer par repli des membres et redressement limité à son anatomie. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « SURVIVE », présentation de Released2018 creature, source-led native 2.5D CQC adaptation, puis corps au sol et membres du Crawler identifiables. Geste court lié à « Ruée du Crawler » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, repli des membres et redressement limité à son anatomie ; CRAWLER vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à SURVIVE.
- **round_loss :** Proposition CQC : CRAWLER relève la tête, rassemble ses appuis, répartit son poids puis reprend sa position d’attente ; aucun redressement humain. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Assaut décisif », revenir par repli des membres et redressement limité à son anatomie, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Morsure rasante

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CRAWLER, préparer « Morsure rasante » ; corps au sol et membres du Crawler identifiables. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** repli des membres et redressement limité à son anatomie.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### heavy — Percussion cristalline

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CRAWLER, préparer « Percussion cristalline » ; corps au sol et membres du Crawler identifiables. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Percussion cristalline », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** repli des membres et redressement limité à son anatomie.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CRAWLER, préparer « Balayage » ; corps au sol et membres du Crawler identifiables. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** repli des membres et redressement limité à son anatomie.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### throw — Saisie de la créature

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CRAWLER, préparer « Saisie de la créature » ; corps au sol et membres du Crawler identifiables. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** repli des membres et redressement limité à son anatomie. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### special — Ruée du Crawler

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CRAWLER, préparer « Ruée du Crawler » ; corps au sol et membres du Crawler identifiables. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** repli des membres et redressement limité à son anatomie.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### specialDown — Repli de la créature

**Existant :** `mobility` / `movement` ; 22/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CRAWLER, préparer « Repli de la créature » ; corps au sol et membres du Crawler identifiables. Préparer l’appui qui produit le déplacement ; progression rampante par véritables appuis, sans cycle de marche debout.

**Action.** Exécuter « Repli de la créature » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -5 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** repli des membres et redressement limité à son anatomie. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### specialForward — Bond de contact

**Existant :** `melee` / `strike` ; 10/3/32 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CRAWLER, préparer « Bond de contact » ; corps au sol et membres du Crawler identifiables. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Bond de contact » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** repli des membres et redressement limité à son anatomie.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### specialBack — Décrochage de la créature

**Existant :** `mobility` / `movement` ; 10/13/24 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CRAWLER, préparer « Décrochage de la créature » ; corps au sol et membres du Crawler identifiables. Préparer l’appui qui produit le déplacement ; progression rampante par véritables appuis, sans cycle de marche debout.

**Action.** Exécuter « Décrochage de la créature » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -4 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** repli des membres et redressement limité à son anatomie. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### super — Assaut décisif

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CRAWLER, préparer « Assaut décisif » ; corps au sol et membres du Crawler identifiables. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Assaut décisif », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** repli des membres et redressement limité à son anatomie.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### utility — Reprise d’activité

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CRAWLER, préparer « Reprise d’activité » ; corps au sol et membres du Crawler identifiables. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Reprise d’activité ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** repli des membres et redressement limité à son anatomie. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Assaut décisif · conclusion

Famille `beast`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Assaut décisif.

Plan 1 : CRAWLER sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Assaut décisif ». Plan 2 : progression rampante par véritables appuis, sans cycle de marche debout ; montrer l’organe de « Assaut décisif ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : repli des membres et redressement limité à son anatomie, pose de signature face à l’adversaire.

##### Repli de la créature · conclusion

Famille `beast`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Repli de la créature.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Repli de la créature » ; l’espace disponible doit être lisible. Plan 2 : progression rampante par véritables appuis, sans cycle de marche debout ; montrer l’organe de « Repli de la créature ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : repli des membres et redressement limité à son anatomie, arrêt du dispositif et retour au cadre d’ensemble.

##### Bond de contact · conclusion

Famille `beast`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Bond de contact.

Plan 1 : approche jusqu’à la distance réelle de « Bond de contact », arme et main libre identifiées. Plan 2 : progression rampante par véritables appuis, sans cycle de marche debout ; montrer l’organe de « Bond de contact ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : repli des membres et redressement limité à son anatomie, prise de distance et maintien final.

##### Saisie de la créature · conclusion

Famille `beast`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Saisie de la créature.

Plan 1 : après une observation ou un repli, CRAWLER reprend l’initiative par « Saisie de la créature ». Plan 2 : progression rampante par véritables appuis, sans cycle de marche debout ; montrer l’organe de « Saisie de la créature ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : repli des membres et redressement limité à son anatomie, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Source-backed visible appearance is adapted to native ink2.5D sprites. Exact unseen surfaces and literal pixel-perfect 1:1 topology are not certified.
- Original cave capture plus community anatomical crosscheck establish two oblong halves linked by cord and six metallic crystalline legs. Precise topology, reverse sides and true dimensions remain qualified reconstruction. Display height55pixels is estimate, not an official physical dimension.
- Exactly16 independently authored selected physical keyposes in each direction,32 per identity. Multiple action groups share keyposes explicitly; no claim of72 independently drawn frames.
- Both facing atlases are independently generated. Native PNG bytes are retained unchanged; alpha geometry and optional Canvas vector clipping isolate connected physical poses without rewriting raster pixels.
- CQC move timing, reach, hitboxes, projectiles, costume and scale rules remain authored gameplay adaptations; displayHeight is presentation only, not an officially certified world measurement.
- [Released-game capture of cave Crawlers; tiny dark limbs and occluded surfaces remain qualified.](https://gameranx.com/features/id/140479/article/metal-gear-survive-walkthrough-chapter-11-exploring-ruins-02/) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Indexed community anatomy description: two oblong parts connected by cord, six legs. This is a textual crosscheck, not primary art.](https://metalgear.fandom.com/wiki/Dread_Dust) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## pass19__big_mouth_survive

### BIG MOUTH — SURVIVE

**Rôle :** Créature : charge et blindage cristallin. **Profil :** `giant`.

**Base présente dans le code :** Large distinct boss creature; a reviewed original whole-body capture is required.

**Incarnation à conserver :** Released2018 creature, source-led native 2.5D CQC adaptation

**État vérifié :** métadonnées natives avec limites. 32 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, blade, heavy, low, throw, shoot, charge, deploy, reload, optic, recover, roll, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, special ; `heavy` = heavy, specialForward, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** BIG MOUTH : volumes du grand corps et organe offensif lisibles à leur échelle. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** déplacement lourd, anticipation et appui de chaque masse. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Créature : charge et blindage cristallin » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder volumes du grand corps et organe offensif lisibles à leur échelle.
- **jump_land :** BIG MOUTH : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. déplacement lourd, anticipation et appui de chaque masse. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de BIG MOUTH. Terminer par freinage de l’inertie puis remise en position. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « SURVIVE », présentation de Released2018 creature, source-led native 2.5D CQC adaptation, puis volumes du grand corps et organe offensif lisibles à leur échelle. Geste court lié à « Percussion du Big Mouth » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, freinage de l’inertie puis remise en position ; BIG MOUTH vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à SURVIVE.
- **round_loss :** Proposition CQC : BIG MOUTH réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Assaut décisif », revenir par freinage de l’inertie puis remise en position, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Contact de la créature

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BIG MOUTH, préparer « Contact de la créature » ; volumes du grand corps et organe offensif lisibles à leur échelle. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Contact de la créature » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** freinage de l’inertie puis remise en position.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### heavy — Impact massif

**Existant :** `melee` / `strike` ; 23/7/35 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BIG MOUTH, préparer « Impact massif » ; volumes du grand corps et organe offensif lisibles à leur échelle. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Impact massif », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** freinage de l’inertie puis remise en position.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BIG MOUTH, préparer « Balayage » ; volumes du grand corps et organe offensif lisibles à leur échelle. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** freinage de l’inertie puis remise en position.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### throw — Saisie de la créature

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BIG MOUTH, préparer « Saisie de la créature » ; volumes du grand corps et organe offensif lisibles à leur échelle. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** freinage de l’inertie puis remise en position. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### special — Percussion du Big Mouth

**Existant :** `melee` / `strike` ; 26/8/39 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BIG MOUTH, préparer « Percussion du Big Mouth » ; volumes du grand corps et organe offensif lisibles à leur échelle. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Percussion du Big Mouth » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** freinage de l’inertie puis remise en position.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### specialDown — Repli de la créature

**Existant :** `mobility` / `movement` ; 22/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BIG MOUTH, préparer « Repli de la créature » ; volumes du grand corps et organe offensif lisibles à leur échelle. Préparer l’appui qui produit le déplacement ; déplacement lourd, anticipation et appui de chaque masse.

**Action.** Exécuter « Repli de la créature » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -5 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** freinage de l’inertie puis remise en position. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### specialForward — Ruée

**Existant :** `melee` / `strike` ; 10/3/32 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BIG MOUTH, préparer « Ruée » ; volumes du grand corps et organe offensif lisibles à leur échelle. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Ruée » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** freinage de l’inertie puis remise en position.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### specialBack — Décrochage de la créature

**Existant :** `mobility` / `movement` ; 10/13/24 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BIG MOUTH, préparer « Décrochage de la créature » ; volumes du grand corps et organe offensif lisibles à leur échelle. Préparer l’appui qui produit le déplacement ; déplacement lourd, anticipation et appui de chaque masse.

**Action.** Exécuter « Décrochage de la créature » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -4 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** freinage de l’inertie puis remise en position. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### super — Assaut décisif

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BIG MOUTH, préparer « Assaut décisif » ; volumes du grand corps et organe offensif lisibles à leur échelle. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Assaut décisif », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** freinage de l’inertie puis remise en position.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### utility — Reprise d’activité

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BIG MOUTH, préparer « Reprise d’activité » ; volumes du grand corps et organe offensif lisibles à leur échelle. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Reprise d’activité ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** freinage de l’inertie puis remise en position. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Assaut décisif · conclusion

Famille `beast`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Assaut décisif.

Plan 1 : BIG MOUTH sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Assaut décisif ». Plan 2 : déplacement lourd, anticipation et appui de chaque masse ; montrer l’organe de « Assaut décisif ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : freinage de l’inertie puis remise en position, pose de signature face à l’adversaire.

##### Repli de la créature · conclusion

Famille `beast`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Repli de la créature.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Repli de la créature » ; l’espace disponible doit être lisible. Plan 2 : déplacement lourd, anticipation et appui de chaque masse ; montrer l’organe de « Repli de la créature ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : freinage de l’inertie puis remise en position, arrêt du dispositif et retour au cadre d’ensemble.

##### Ruée · conclusion

Famille `beast`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Ruée.

Plan 1 : approche jusqu’à la distance réelle de « Ruée », arme et main libre identifiées. Plan 2 : déplacement lourd, anticipation et appui de chaque masse ; montrer l’organe de « Ruée ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : freinage de l’inertie puis remise en position, prise de distance et maintien final.

##### Saisie de la créature · conclusion

Famille `beast`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Saisie de la créature.

Plan 1 : après une observation ou un repli, BIG MOUTH reprend l’initiative par « Saisie de la créature ». Plan 2 : déplacement lourd, anticipation et appui de chaque masse ; montrer l’organe de « Saisie de la créature ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : freinage de l’inertie puis remise en position, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Source-backed visible appearance is adapted to native ink2.5D sprites. Exact unseen surfaces and literal pixel-perfect 1:1 topology are not certified.
- Close released-game screenshots attest major visible front/side anatomy and yellow-black plating. Hidden rear surfaces and every CQC pose are authored adaptation; machine-gun growth phase is omitted pending a close physical reference. Presentation height is estimated, not a canonical metre measurement.
- Exactly16 independently authored selected physical keyposes in each direction,32 per identity. Multiple action groups share keyposes explicitly; no claim of72 independently drawn frames.
- Both facing atlases are independently generated. Native PNG bytes are retained unchanged; alpha geometry and optional Canvas vector clipping isolate connected physical poses without rewriting raster pixels.
- CQC move timing, reach, hitboxes, projectiles, costume and scale rules remain authored gameplay adaptations; displayHeight is presentation only, not an officially certified world measurement.
- [Close original front-quarter released-game captures of Big Mouth with crystal plating, large jaws, pale throat and yellow stripes. Unseen surfaces remain qualified.](https://gameranx.com/features/id/141534/article/metal-gear-survive-how-to-fight-two-legendary-end-game-bosses/) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## pass19__frostbite_survive

### FROSTBITE — SURVIVE

**Rôle :** Créature : charge et blindage cristallin. **Profil :** `giant`.

**Base présente dans le code :** Large distinct boss creature; do not invent a humanoid redesign or assume Big Mouth anatomy.

**Incarnation à conserver :** Released2018 creature, source-led native 2.5D CQC adaptation

**État vérifié :** métadonnées natives avec limites. 32 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, blade, heavy, low, throw, shoot, charge, deploy, reload, optic, recover, roll, parry, hit, ko.

**Réemplois à examiner :** `heavy` = heavy, super ; `shoot` = special, specialForward.

**Techniques pointant sur une seule région native dans la direction principale :** specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** FROSTBITE : volumes du grand corps et organe offensif lisibles à leur échelle. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** déplacement lourd, anticipation et appui de chaque masse. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Créature : charge et blindage cristallin » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder volumes du grand corps et organe offensif lisibles à leur échelle.
- **jump_land :** FROSTBITE : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. déplacement lourd, anticipation et appui de chaque masse. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de FROSTBITE. Terminer par freinage de l’inertie puis remise en position. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « SURVIVE », présentation de Released2018 creature, source-led native 2.5D CQC adaptation, puis volumes du grand corps et organe offensif lisibles à leur échelle. Geste court lié à « Souffle du Frostbite » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, freinage de l’inertie puis remise en position ; FROSTBITE vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à SURVIVE.
- **round_loss :** Proposition CQC : FROSTBITE réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Assaut décisif », revenir par freinage de l’inertie puis remise en position, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Contact de la créature

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FROSTBITE, préparer « Contact de la créature » ; volumes du grand corps et organe offensif lisibles à leur échelle. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Contact de la créature » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** freinage de l’inertie puis remise en position.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### heavy — Impact massif

**Existant :** `melee` / `strike` ; 23/7/35 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FROSTBITE, préparer « Impact massif » ; volumes du grand corps et organe offensif lisibles à leur échelle. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Impact massif », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** freinage de l’inertie puis remise en position.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FROSTBITE, préparer « Balayage » ; volumes du grand corps et organe offensif lisibles à leur échelle. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** freinage de l’inertie puis remise en position.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### throw — Saisie de la créature

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FROSTBITE, préparer « Saisie de la créature » ; volumes du grand corps et organe offensif lisibles à leur échelle. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** freinage de l’inertie puis remise en position. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### special — Souffle du Frostbite

**Existant :** `projectile` / `cold` ; 31/1/37 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FROSTBITE, préparer « Souffle du Frostbite » ; volumes du grand corps et organe offensif lisibles à leur échelle. Donner à la source de « Souffle du Frostbite » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet cold de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet.

**Retour.** freinage de l’inertie puis remise en position. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Sors de l’axe du souffle avant son activation.

##### specialDown — Repli de la créature

**Existant :** `mobility` / `movement` ; 22/1/31 ticks ; groupe `charge`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FROSTBITE, préparer « Repli de la créature » ; volumes du grand corps et organe offensif lisibles à leur échelle. Préparer l’appui qui produit le déplacement ; déplacement lourd, anticipation et appui de chaque masse.

**Action.** Exécuter « Repli de la créature » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -5 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** freinage de l’inertie puis remise en position. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### specialForward — Ruée

**Existant :** `melee` / `strike` ; 10/3/32 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FROSTBITE, préparer « Ruée » ; volumes du grand corps et organe offensif lisibles à leur échelle. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Ruée » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** freinage de l’inertie puis remise en position.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### specialBack — Décrochage de la créature

**Existant :** `mobility` / `movement` ; 10/13/24 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FROSTBITE, préparer « Décrochage de la créature » ; volumes du grand corps et organe offensif lisibles à leur échelle. Préparer l’appui qui produit le déplacement ; déplacement lourd, anticipation et appui de chaque masse.

**Action.** Exécuter « Décrochage de la créature » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -4 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** freinage de l’inertie puis remise en position. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### super — Assaut décisif

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FROSTBITE, préparer « Assaut décisif » ; volumes du grand corps et organe offensif lisibles à leur échelle. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Assaut décisif », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** freinage de l’inertie puis remise en position.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### utility — Reprise d’activité

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FROSTBITE, préparer « Reprise d’activité » ; volumes du grand corps et organe offensif lisibles à leur échelle. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Reprise d’activité ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** freinage de l’inertie puis remise en position. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Assaut décisif · conclusion

Famille `beast`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Assaut décisif.

Plan 1 : FROSTBITE sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Assaut décisif ». Plan 2 : déplacement lourd, anticipation et appui de chaque masse ; montrer l’organe de « Assaut décisif ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : freinage de l’inertie puis remise en position, pose de signature face à l’adversaire.

##### Repli de la créature · conclusion

Famille `beast`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Repli de la créature.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Repli de la créature » ; l’espace disponible doit être lisible. Plan 2 : déplacement lourd, anticipation et appui de chaque masse ; montrer l’organe de « Repli de la créature ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : freinage de l’inertie puis remise en position, arrêt du dispositif et retour au cadre d’ensemble.

##### Ruée · conclusion

Famille `beast`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Ruée.

Plan 1 : approche jusqu’à la distance réelle de « Ruée », arme et main libre identifiées. Plan 2 : déplacement lourd, anticipation et appui de chaque masse ; montrer l’organe de « Ruée ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : freinage de l’inertie puis remise en position, prise de distance et maintien final.

##### Saisie de la créature · conclusion

Famille `beast`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Saisie de la créature.

Plan 1 : après une observation ou un repli, FROSTBITE reprend l’initiative par « Saisie de la créature ». Plan 2 : déplacement lourd, anticipation et appui de chaque masse ; montrer l’organe de « Saisie de la créature ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : freinage de l’inertie puis remise en position, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Source-backed visible appearance is adapted to native ink2.5D sprites. Exact unseen surfaces and literal pixel-perfect 1:1 topology are not certified.
- One close original released-game capture supports visible violet central dome, shuttered iris recesses, eight pale ribbed ribbons and red/cyan tips. Hidden surfaces and CQC motions are authored adaptations. Exact visible tip counts can be occluded by folded tentacles; not a full 3D topology certificate.
- Rendering uses read-only alpha192 vector contours on every pose to isolate the actual physical body from generated translucent coloured aura. All source PNG bytes and rejected edit attempts are preserved unchanged. This is standard Canvas sprite contour clipping, not a transformed replacement image.
- Exactly16 independently authored selected physical keyposes in each direction,32 per identity. Multiple action groups share keyposes explicitly; no claim of72 independently drawn frames.
- A rejected original right startup5 had4 red tips. It remains preserved but is never selected; an independently generated one-pose native replacement has the observed3 red and5 cyan tips. Replacement framing is normalized by full-body source height, an authored presentation choice rather than original3D anatomical calibration.
- Both facing atlases are independently generated. Native PNG bytes are retained unchanged; alpha geometry and optional Canvas vector clipping isolate connected physical poses without rewriting raster pixels.
- CQC move timing, reach, hitboxes, projectiles, costume and scale rules remain authored gameplay adaptations; displayHeight is presentation only, not an officially certified world measurement.
- [Close original released-game Frostbite screenshot from community guide, directly viewed; visible dome, shuttered iris recesses and pale ribbed ribbon tentacles. Hidden surfaces and folded tip counts remain qualified.](https://steamcommunity.com/sharedfiles/filedetails/?id=1312645473) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## pass19__gekko_suicide_mgs4

### GEKKO — UNITÉ SUICIDE — MGS4

**Rôle :** Pattes organiques et armement de machine. **Profil :** `gekko`.

**Base présente dans le code :** Dark Gekko chassis with organic legs and demolition modules; no human pilot.

**Incarnation à conserver :** Dark Gekko chassis with organic legs and demolition modules; no human pilot.

**État vérifié :** route machine effectivement déclarée ; animations d’articulation à contrôler. Une route machine est déclarée dans le runtime. Ses articulations remplacent le catalogue de corps contrôlé ; ce n’est pas un constat de sprite absent.

**Réemplois à examiner :** pas de groupe natif partagé observé dans cette extraction.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** GEKKO — UNITÉ SUICIDE : jambes biologiques et tête/châssis de Gekko, arme sur son montage. Petits ajustements mécaniques des organes présents et optique stable ; aucune respiration humaine. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** foulées lourdes et contact des pieds ; aucun cycle humanoïde de bras. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Pattes organiques et armement de machine » : orientation défensive du châssis, des membres ou de la protection effectivement présente ; pas d’avant-bras humain ajouté ; recul bloqué distinct de la simple position basse. Garder jambes biologiques et tête/châssis de Gekko, arme sur son montage.
- **jump_land :** GEKKO — UNITÉ SUICIDE : départ par poussée ou articulation autorisée, déplacement aérien puis stabilisation et reprise d’appui ; les appareils volants gardent leur mode de sustentation. foulées lourdes et contact des pieds ; aucun cycle humanoïde de bras. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Secousse du châssis et de l’organe touché de GEKKO — UNITÉ SUICIDE, déséquilibre, arrêt puis remise en position par ses articulations réelles. Terminer par recul du châssis et retour de tourelle. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS4 », présentation de Dark Gekko chassis with organic legs and demolition modules; no human pilot., puis jambes biologiques et tête/châssis de Gekko, arme sur son montage. Geste court lié à « Percussion de démolition » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, recul du châssis et retour de tourelle ; GEKKO — UNITÉ SUICIDE vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS4.
- **round_loss :** Proposition CQC : GEKKO — UNITÉ SUICIDE interrompt ses émissions, absorbe l’oscillation de sa masse, stabilise ses appuis ou son vol, puis replace ses organes ; aucune régénération gratuite. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Détonation de démolition », revenir par recul du châssis et retour de tourelle, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Contact

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de GEKKO — UNITÉ SUICIDE, préparer « Contact » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Contact » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul du châssis et retour de tourelle.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### heavy — Percussion

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de GEKKO — UNITÉ SUICIDE, préparer « Percussion » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Percussion », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** recul du châssis et retour de tourelle.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de GEKKO — UNITÉ SUICIDE, préparer « Balayage » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** recul du châssis et retour de tourelle.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### throw — Saisie

**Existant :** `melee` / `grapple` ; 13/4/32 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de GEKKO — UNITÉ SUICIDE, préparer « Saisie » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recul du châssis et retour de tourelle. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### special — Percussion de démolition

**Existant :** `melee` / `explosive` ; 29/7/38 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de GEKKO — UNITÉ SUICIDE, préparer « Percussion de démolition » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Percussion de démolition » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul du châssis et retour de tourelle.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### specialDown — Repli offensif

**Existant :** `melee` / `strike` ; 16/5/29 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de GEKKO — UNITÉ SUICIDE, préparer « Repli offensif » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Repli offensif » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul du châssis et retour de tourelle.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### specialForward — Ruée

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de GEKKO — UNITÉ SUICIDE, préparer « Ruée » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Ruée » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul du châssis et retour de tourelle.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### specialBack — Recul offensif

**Existant :** `melee` / `strike` ; 22/1/31 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de GEKKO — UNITÉ SUICIDE, préparer « Recul offensif » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Recul offensif » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul du châssis et retour de tourelle.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### super — Détonation de démolition

**Existant :** `melee` / `volatile` ; 56/8/52 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de GEKKO — UNITÉ SUICIDE, préparer « Détonation de démolition » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Détonation de démolition », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** recul du châssis et retour de tourelle.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### utility — Régulation du châssis

**Existant :** `recover` / `recovery` ; 48/1/24 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de GEKKO — UNITÉ SUICIDE, préparer « Régulation du châssis » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Régulation du châssis ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** recul du châssis et retour de tourelle. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Détonation de démolition · conclusion

Famille `mechanical`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Détonation de démolition.

Plan 1 : GEKKO — UNITÉ SUICIDE sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Détonation de démolition ». Plan 2 : foulées lourdes et contact des pieds ; aucun cycle humanoïde de bras ; montrer l’organe de « Détonation de démolition ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : recul du châssis et retour de tourelle, pose de signature face à l’adversaire.

##### Repli offensif · conclusion

Famille `mechanical`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Repli offensif.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Repli offensif » ; l’espace disponible doit être lisible. Plan 2 : foulées lourdes et contact des pieds ; aucun cycle humanoïde de bras ; montrer l’organe de « Repli offensif ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : recul du châssis et retour de tourelle, arrêt du dispositif et retour au cadre d’ensemble.

##### Ruée · conclusion

Famille `mechanical`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Ruée.

Plan 1 : approche jusqu’à la distance réelle de « Ruée », arme et main libre identifiées. Plan 2 : foulées lourdes et contact des pieds ; aucun cycle humanoïde de bras ; montrer l’organe de « Ruée ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : recul du châssis et retour de tourelle, prise de distance et maintien final.

##### Saisie · conclusion

Famille `mechanical`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Saisie.

Plan 1 : après une observation ou un repli, GEKKO — UNITÉ SUICIDE reprend l’initiative par « Saisie ». Plan 2 : foulées lourdes et contact des pieds ; aucun cycle humanoïde de bras ; montrer l’organe de « Saisie ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : recul du châssis et retour de tourelle, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Profil de versus adapté; valeurs et animations non extraites du jeu source.
- Références de silhouette et qualité native validées séparément.
- Ce profil CQC ne revendique pas une extraction exacte des attaques ou paramètres du jeu source.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## pass19__gekko_missile_mgs4

### GEKKO — LANCE-MISSILES — MGS4

**Rôle :** Pattes organiques et armement de machine. **Profil :** `gekko`.

**Base présente dans le code :** Standard Gekko chassis with side-mounted anti-tank missile launcher. Specific BGM-71/TOW model identification is community inference.

**Incarnation à conserver :** Standard Gekko chassis with side-mounted anti-tank missile launcher. Specific BGM-71/TOW model identification is community inference.

**État vérifié :** route machine effectivement déclarée ; animations d’articulation à contrôler. Une route machine est déclarée dans le runtime. Ses articulations remplacent le catalogue de corps contrôlé ; ce n’est pas un constat de sprite absent.

**Réemplois à examiner :** pas de groupe natif partagé observé dans cette extraction.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** GEKKO — LANCE-MISSILES : jambes biologiques et tête/châssis de Gekko, arme sur son montage. Petits ajustements mécaniques des organes présents et optique stable ; aucune respiration humaine. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** foulées lourdes et contact des pieds ; aucun cycle humanoïde de bras. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Pattes organiques et armement de machine » : orientation défensive du châssis, des membres ou de la protection effectivement présente ; pas d’avant-bras humain ajouté ; recul bloqué distinct de la simple position basse. Garder jambes biologiques et tête/châssis de Gekko, arme sur son montage.
- **jump_land :** GEKKO — LANCE-MISSILES : départ par poussée ou articulation autorisée, déplacement aérien puis stabilisation et reprise d’appui ; les appareils volants gardent leur mode de sustentation. foulées lourdes et contact des pieds ; aucun cycle humanoïde de bras. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Secousse du châssis et de l’organe touché de GEKKO — LANCE-MISSILES, déséquilibre, arrêt puis remise en position par ses articulations réelles. Terminer par recul du châssis et retour de tourelle. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS4 », présentation de Standard Gekko chassis with side-mounted anti-tank missile launcher. Specific BGM-71/TOW model identification is community inference., puis jambes biologiques et tête/châssis de Gekko, arme sur son montage. Geste court lié à « Missile du Gekko » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, recul du châssis et retour de tourelle ; GEKKO — LANCE-MISSILES vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS4.
- **round_loss :** Proposition CQC : GEKKO — LANCE-MISSILES interrompt ses émissions, absorbe l’oscillation de sa masse, stabilise ses appuis ou son vol, puis replace ses organes ; aucune régénération gratuite. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Assaut décisif », revenir par recul du châssis et retour de tourelle, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Contact

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de GEKKO — LANCE-MISSILES, préparer « Contact » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Contact » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul du châssis et retour de tourelle.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### heavy — Percussion

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de GEKKO — LANCE-MISSILES, préparer « Percussion » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Percussion », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** recul du châssis et retour de tourelle.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de GEKKO — LANCE-MISSILES, préparer « Balayage » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** recul du châssis et retour de tourelle.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### throw — Saisie

**Existant :** `melee` / `grapple` ; 13/4/32 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de GEKKO — LANCE-MISSILES, préparer « Saisie » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recul du châssis et retour de tourelle. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### special — Missile du Gekko

**Existant :** `projectile` / `rocket` ; 30/1/38 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de GEKKO — LANCE-MISSILES, préparer « Missile du Gekko » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Montrer la prise et la visée de l’arme décrite par « Missile du Gekko » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** recul du châssis et retour de tourelle. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### specialDown — Repli offensif

**Existant :** `melee` / `strike` ; 16/5/29 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de GEKKO — LANCE-MISSILES, préparer « Repli offensif » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Repli offensif » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul du châssis et retour de tourelle.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### specialForward — Ruée

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de GEKKO — LANCE-MISSILES, préparer « Ruée » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Ruée » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul du châssis et retour de tourelle.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### specialBack — Recul offensif

**Existant :** `melee` / `strike` ; 22/1/31 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de GEKKO — LANCE-MISSILES, préparer « Recul offensif » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Recul offensif » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul du châssis et retour de tourelle.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### super — Assaut décisif

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de GEKKO — LANCE-MISSILES, préparer « Assaut décisif » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Assaut décisif », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** recul du châssis et retour de tourelle.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### utility — Régulation du châssis

**Existant :** `recover` / `recovery` ; 48/1/24 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de GEKKO — LANCE-MISSILES, préparer « Régulation du châssis » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Régulation du châssis ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** recul du châssis et retour de tourelle. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Assaut décisif · conclusion

Famille `mechanical`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Assaut décisif.

Plan 1 : GEKKO — LANCE-MISSILES sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Assaut décisif ». Plan 2 : foulées lourdes et contact des pieds ; aucun cycle humanoïde de bras ; montrer l’organe de « Assaut décisif ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : recul du châssis et retour de tourelle, pose de signature face à l’adversaire.

##### Repli offensif · conclusion

Famille `mechanical`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Repli offensif.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Repli offensif » ; l’espace disponible doit être lisible. Plan 2 : foulées lourdes et contact des pieds ; aucun cycle humanoïde de bras ; montrer l’organe de « Repli offensif ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : recul du châssis et retour de tourelle, arrêt du dispositif et retour au cadre d’ensemble.

##### Ruée · conclusion

Famille `mechanical`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Ruée.

Plan 1 : approche jusqu’à la distance réelle de « Ruée », arme et main libre identifiées. Plan 2 : foulées lourdes et contact des pieds ; aucun cycle humanoïde de bras ; montrer l’organe de « Ruée ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : recul du châssis et retour de tourelle, prise de distance et maintien final.

##### Saisie · conclusion

Famille `mechanical`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Saisie.

Plan 1 : après une observation ou un repli, GEKKO — LANCE-MISSILES reprend l’initiative par « Saisie ». Plan 2 : foulées lourdes et contact des pieds ; aucun cycle humanoïde de bras ; montrer l’organe de « Saisie ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : recul du châssis et retour de tourelle, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Profil de versus adapté; valeurs et animations non extraites du jeu source.
- Références de silhouette et qualité native validées séparément.
- Ce profil CQC ne revendique pas une extraction exacte des attaques ou paramètres du jeu source.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## pass19__gekko_mgr

### GEKKO — DESPERADO — MGR

**Rôle :** Pattes organiques et armement de machine. **Profil :** `gekko`.

**Base présente dans le code :** Revengeance Gekko green camouflage; keep mechanical upper hull and organic legs.

**Incarnation à conserver :** Revengeance Gekko green camouflage; keep mechanical upper hull and organic legs.

**État vérifié :** route machine effectivement déclarée ; animations d’articulation à contrôler. Une route machine est déclarée dans le runtime. Ses articulations remplacent le catalogue de corps contrôlé ; ce n’est pas un constat de sprite absent.

**Réemplois à examiner :** pas de groupe natif partagé observé dans cette extraction.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** GEKKO — DESPERADO : jambes biologiques et tête/châssis de Gekko, arme sur son montage. Petits ajustements mécaniques des organes présents et optique stable ; aucune respiration humaine. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** foulées lourdes et contact des pieds ; aucun cycle humanoïde de bras. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Pattes organiques et armement de machine » : orientation défensive du châssis, des membres ou de la protection effectivement présente ; pas d’avant-bras humain ajouté ; recul bloqué distinct de la simple position basse. Garder jambes biologiques et tête/châssis de Gekko, arme sur son montage.
- **jump_land :** GEKKO — DESPERADO : départ par poussée ou articulation autorisée, déplacement aérien puis stabilisation et reprise d’appui ; les appareils volants gardent leur mode de sustentation. foulées lourdes et contact des pieds ; aucun cycle humanoïde de bras. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Secousse du châssis et de l’organe touché de GEKKO — DESPERADO, déséquilibre, arrêt puis remise en position par ses articulations réelles. Terminer par recul du châssis et retour de tourelle. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGR », présentation de Revengeance Gekko green camouflage; keep mechanical upper hull and organic legs., puis jambes biologiques et tête/châssis de Gekko, arme sur son montage. Geste court lié à « Percussion du châssis » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, recul du châssis et retour de tourelle ; GEKKO — DESPERADO vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGR.
- **round_loss :** Proposition CQC : GEKKO — DESPERADO interrompt ses émissions, absorbe l’oscillation de sa masse, stabilise ses appuis ou son vol, puis replace ses organes ; aucune régénération gratuite. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Assaut décisif », revenir par recul du châssis et retour de tourelle, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Contact

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de GEKKO — DESPERADO, préparer « Contact » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Contact » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul du châssis et retour de tourelle.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### heavy — Percussion

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de GEKKO — DESPERADO, préparer « Percussion » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Percussion », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** recul du châssis et retour de tourelle.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de GEKKO — DESPERADO, préparer « Balayage » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** recul du châssis et retour de tourelle.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### throw — Saisie

**Existant :** `melee` / `grapple` ; 13/4/32 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de GEKKO — DESPERADO, préparer « Saisie » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recul du châssis et retour de tourelle. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### special — Percussion du châssis

**Existant :** `melee` / `strike` ; 25/6/33 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de GEKKO — DESPERADO, préparer « Percussion du châssis » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Percussion du châssis » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul du châssis et retour de tourelle.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### specialDown — Repli offensif

**Existant :** `melee` / `strike` ; 16/5/29 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de GEKKO — DESPERADO, préparer « Repli offensif » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Repli offensif » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul du châssis et retour de tourelle.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### specialForward — Rafale du Gekko

**Existant :** `projectile` / `ballistic` ; 24/1/33 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de GEKKO — DESPERADO, préparer « Rafale du Gekko » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Montrer la prise et la visée de l’arme décrite par « Rafale du Gekko » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 3 émissions, espacées de 5 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** recul du châssis et retour de tourelle. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### specialBack — Recul offensif

**Existant :** `melee` / `strike` ; 22/1/31 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de GEKKO — DESPERADO, préparer « Recul offensif » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Recul offensif » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul du châssis et retour de tourelle.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### super — Assaut décisif

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de GEKKO — DESPERADO, préparer « Assaut décisif » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Assaut décisif », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** recul du châssis et retour de tourelle.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### utility — Régulation du châssis

**Existant :** `recover` / `recovery` ; 48/1/24 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de GEKKO — DESPERADO, préparer « Régulation du châssis » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Régulation du châssis ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** recul du châssis et retour de tourelle. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Assaut décisif · conclusion

Famille `mechanical`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Assaut décisif.

Plan 1 : GEKKO — DESPERADO sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Assaut décisif ». Plan 2 : foulées lourdes et contact des pieds ; aucun cycle humanoïde de bras ; montrer l’organe de « Assaut décisif ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : recul du châssis et retour de tourelle, pose de signature face à l’adversaire.

##### Repli offensif · conclusion

Famille `mechanical`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Repli offensif.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Repli offensif » ; l’espace disponible doit être lisible. Plan 2 : foulées lourdes et contact des pieds ; aucun cycle humanoïde de bras ; montrer l’organe de « Repli offensif ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : recul du châssis et retour de tourelle, arrêt du dispositif et retour au cadre d’ensemble.

##### Rafale du Gekko · conclusion

Famille `mechanical`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Rafale du Gekko.

Plan 1 : approche jusqu’à la distance réelle de « Rafale du Gekko », arme et main libre identifiées. Plan 2 : foulées lourdes et contact des pieds ; aucun cycle humanoïde de bras ; montrer l’organe de « Rafale du Gekko ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : recul du châssis et retour de tourelle, prise de distance et maintien final.

##### Saisie · conclusion

Famille `mechanical`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Saisie.

Plan 1 : après une observation ou un repli, GEKKO — DESPERADO reprend l’initiative par « Saisie ». Plan 2 : foulées lourdes et contact des pieds ; aucun cycle humanoïde de bras ; montrer l’organe de « Saisie ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : recul du châssis et retour de tourelle, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Profil de versus adapté; valeurs et animations non extraites du jeu source.
- Références de silhouette et qualité native validées séparément.
- Ce profil CQC ne revendique pas une extraction exacte des attaques ou paramètres du jeu source.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## pass19__dwarf_gekko_trenchcoat_mgs4

### TRIPODS — INFILTRATION — MGS4

**Rôle :** Reconnaissance robotique et électrode. **Profil :** `small_drone`.

**Base présente dans le code :** Three Dwarf Gekko stacked under a trenchcoat and fedora, following Old Snake in Eastern Europe. Requested parka is resolved to this attested disguise.

**Incarnation à conserver :** Three Dwarf Gekko stacked under a trenchcoat and fedora, following Old Snake in Eastern Europe. Requested parka is resolved to this attested disguise.

**État vérifié :** route machine effectivement déclarée ; animations d’articulation à contrôler. Une route machine est déclarée dans le runtime. Ses articulations remplacent le catalogue de corps contrôlé ; ce n’est pas un constat de sprite absent.

**Réemplois à examiner :** pas de groupe natif partagé observé dans cette extraction.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** TRIPODS — INFILTRATION : châssis, jambes/roues et module optique correctement orientés. Petits ajustements mécaniques des organes présents et optique stable ; aucune respiration humaine. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** cycle de locomotion mécanique ; pas de genoux humains. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Reconnaissance robotique et électrode » : orientation défensive du châssis, des membres ou de la protection effectivement présente ; pas d’avant-bras humain ajouté ; recul bloqué distinct de la simple position basse. Garder châssis, jambes/roues et module optique correctement orientés.
- **jump_land :** TRIPODS — INFILTRATION : départ par poussée ou articulation autorisée, déplacement aérien puis stabilisation et reprise d’appui ; les appareils volants gardent leur mode de sustentation. cycle de locomotion mécanique ; pas de genoux humains. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Secousse du châssis et de l’organe touché de TRIPODS — INFILTRATION, déséquilibre, arrêt puis remise en position par ses articulations réelles. Terminer par retour de l’outil ou de la caméra sur sa charnière. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS4 », présentation de Three Dwarf Gekko stacked under a trenchcoat and fedora, following Old Snake in Eastern Europe. Requested parka is resolved to this attested disguise., puis châssis, jambes/roues et module optique correctement orientés. Geste court lié à « Contact des unités dissimulées » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, retour de l’outil ou de la caméra sur sa charnière ; TRIPODS — INFILTRATION vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS4.
- **round_loss :** Proposition CQC : TRIPODS — INFILTRATION interrompt ses émissions, absorbe l’oscillation de sa masse, stabilise ses appuis ou son vol, puis replace ses organes ; aucune régénération gratuite. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Assaut décisif », revenir par retour de l’outil ou de la caméra sur sa charnière, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Contact

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de TRIPODS — INFILTRATION, préparer « Contact » ; châssis, jambes/roues et module optique correctement orientés. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Contact » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour de l’outil ou de la caméra sur sa charnière.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### heavy — Percussion

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de TRIPODS — INFILTRATION, préparer « Percussion » ; châssis, jambes/roues et module optique correctement orientés. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Percussion », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retour de l’outil ou de la caméra sur sa charnière.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de TRIPODS — INFILTRATION, préparer « Balayage » ; châssis, jambes/roues et module optique correctement orientés. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** retour de l’outil ou de la caméra sur sa charnière.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### throw — Saisie

**Existant :** `melee` / `grapple` ; 13/4/32 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de TRIPODS — INFILTRATION, préparer « Saisie » ; châssis, jambes/roues et module optique correctement orientés. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** retour de l’outil ou de la caméra sur sa charnière. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### special — Contact des unités dissimulées

**Existant :** `melee` / `electric` ; 19/5/31 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de TRIPODS — INFILTRATION, préparer « Contact des unités dissimulées » ; châssis, jambes/roues et module optique correctement orientés. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Contact des unités dissimulées » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense. L’effet electric reste séparé du membre ; son apparition et sa disparition suivent les événements du profil.

**Retour.** retour de l’outil ou de la caméra sur sa charnière.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### specialDown — Repli offensif

**Existant :** `melee` / `strike` ; 26/1/30 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de TRIPODS — INFILTRATION, préparer « Repli offensif » ; châssis, jambes/roues et module optique correctement orientés. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Repli offensif » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour de l’outil ou de la caméra sur sa charnière.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### specialForward — Ruée

**Existant :** `melee` / `strike` ; 7/18/25 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de TRIPODS — INFILTRATION, préparer « Ruée » ; châssis, jambes/roues et module optique correctement orientés. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Ruée » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour de l’outil ou de la caméra sur sa charnière.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### specialBack — Discrétion sous le manteau

**Existant :** `buff` / `stealth` ; 24/1/29 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de TRIPODS — INFILTRATION, préparer « Discrétion sous le manteau » ; châssis, jambes/roues et module optique correctement orientés. Montrer la préparation corporelle ou mécanique de « Discrétion sous le manteau ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** retour de l’outil ou de la caméra sur sa charnière. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### super — Assaut décisif

**Existant :** `melee` / `strike` ; 25/1/34 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de TRIPODS — INFILTRATION, préparer « Assaut décisif » ; châssis, jambes/roues et module optique correctement orientés. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Assaut décisif », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retour de l’outil ou de la caméra sur sa charnière.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### utility — Régulation du châssis

**Existant :** `recover` / `recovery` ; 48/1/24 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de TRIPODS — INFILTRATION, préparer « Régulation du châssis » ; châssis, jambes/roues et module optique correctement orientés. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Régulation du châssis ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** retour de l’outil ou de la caméra sur sa charnière. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Assaut décisif · conclusion

Famille `mechanical`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Assaut décisif.

Plan 1 : TRIPODS — INFILTRATION sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Assaut décisif ». Plan 2 : cycle de locomotion mécanique ; pas de genoux humains ; montrer l’organe de « Assaut décisif ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : retour de l’outil ou de la caméra sur sa charnière, pose de signature face à l’adversaire.

##### Repli offensif · conclusion

Famille `mechanical`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Repli offensif.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Repli offensif » ; l’espace disponible doit être lisible. Plan 2 : cycle de locomotion mécanique ; pas de genoux humains ; montrer l’organe de « Repli offensif ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : retour de l’outil ou de la caméra sur sa charnière, arrêt du dispositif et retour au cadre d’ensemble.

##### Ruée · conclusion

Famille `mechanical`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Ruée.

Plan 1 : approche jusqu’à la distance réelle de « Ruée », arme et main libre identifiées. Plan 2 : cycle de locomotion mécanique ; pas de genoux humains ; montrer l’organe de « Ruée ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : retour de l’outil ou de la caméra sur sa charnière, prise de distance et maintien final.

##### Saisie · conclusion

Famille `mechanical`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Saisie.

Plan 1 : après une observation ou un repli, TRIPODS — INFILTRATION reprend l’initiative par « Saisie ». Plan 2 : cycle de locomotion mécanique ; pas de genoux humains ; montrer l’organe de « Saisie ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : retour de l’outil ou de la caméra sur sa charnière, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Profil de versus adapté; valeurs et animations non extraites du jeu source.
- Références de silhouette et qualité native validées séparément.
- Ce profil CQC ne revendique pas une extraction exacte des attaques ou paramètres du jeu source.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).
