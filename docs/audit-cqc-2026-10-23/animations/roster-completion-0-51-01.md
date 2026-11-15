# Animations — ROSTER COMPLETION 0.51

**10 acteurs du registre courant.** Les titres d’actions et paramètres sont observés ; les descriptions sont des propositions CQC à produire et valider. Un groupe de frames existant ne certifie pas l’ensemble du mouvement ou sa fidélité originale.

[Index des fiches](README.md) · [Contrat commun](../04_ANIMATIONS_SPRITES.md)

## Sommaire

- [MERYL — TWIN SNAKES](#roster51__meryl_tts) — THE TWIN SNAKES
- [OTACON — TWIN SNAKES](#roster51__otacon_tts) — THE TWIN SNAKES
- [REVOLVER OCELOT — TWIN SNAKES](#roster51__ocelot_tts) — THE TWIN SNAKES
- [GRAY FOX — TWIN SNAKES](#roster51__grayfox_tts) — THE TWIN SNAKES
- [LIQUID SNAKE — TWIN SNAKES](#roster51__liquid_tts) — THE TWIN SNAKES
- [PSYCHO MANTIS — TWIN SNAKES](#roster51__mantis_tts) — THE TWIN SNAKES
- [SNIPER WOLF — TWIN SNAKES](#roster51__wolf_tts) — THE TWIN SNAKES
- [VULCAN RAVEN — TWIN SNAKES](#roster51__raven_tts) — THE TWIN SNAKES
- [DECOY OCTOPUS — TWIN SNAKES](#roster51__decoy_tts) — THE TWIN SNAKES
- [JOHNNY SASAKI — TWIN SNAKES](#roster51__johnny_tts) — THE TWIN SNAKES

## roster51__meryl_tts

### MERYL — TWIN SNAKES — THE TWIN SNAKES

**Rôle :** Pistolet et défense proche. **Profil :** `pistol`.

**Base présente dans le code :** Version remake de Meryl : Desert Eagle, grenade et défense rapprochée, sans SOP.

**Incarnation à conserver :** Released GameCube Meryl, charcoal tanktop/olivecargo/beige knee pads and largeblack pistol

**État vérifié :** métadonnées natives avec limites. 28 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `throw` = throw, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** MERYL — TWIN SNAKES : main forte et main de soutien identifiées sur le pistolet, coudes contenus. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas prudents sans inverser l’étui ni la main forte. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Pistolet et défense proche » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder main forte et main de soutien identifiées sur le pistolet, coudes contenus.
- **jump_land :** MERYL — TWIN SNAKES : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas prudents sans inverser l’étui ni la main forte. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de MERYL — TWIN SNAKES. Terminer par recul du poignet puis stabilisation du canon. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « THE TWIN SNAKES », présentation de Released GameCube Meryl, charcoal tanktop/olivecargo/beige knee pads and largeblack pistol, puis main forte et main de soutien identifiées sur le pistolet, coudes contenus. Geste court lié à « Desert Eagle — Twin Snakes » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, recul du poignet puis stabilisation du canon ; MERYL — TWIN SNAKES vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à THE TWIN SNAKES.
- **round_loss :** Proposition CQC : MERYL — TWIN SNAKES réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Dernières cartouches — Twin Snakes », revenir par recul du poignet puis stabilisation du canon, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MERYL — TWIN SNAKES, préparer « Jab » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MERYL — TWIN SNAKES, préparer « Frappe engagée » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MERYL — TWIN SNAKES, préparer « Balayage » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MERYL — TWIN SNAKES, préparer « Projection » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recul du poignet puis stabilisation du canon. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Desert Eagle — Twin Snakes

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MERYL — TWIN SNAKES, préparer « Desert Eagle — Twin Snakes » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Montrer la prise et la visée de l’arme décrite par « Desert Eagle — Twin Snakes » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Grenade d’urgence — Twin Snakes

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MERYL — TWIN SNAKES, préparer « Grenade d’urgence — Twin Snakes » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Prélever l’objet correspondant à « Grenade d’urgence — Twin Snakes », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Saisie de recrue — Twin Snakes

**Existant :** `melee` / `grapple` ; 10/3/32 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MERYL — TWIN SNAKES, préparer « Saisie de recrue — Twin Snakes » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recul du poignet puis stabilisation du canon. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Hors de portée ou saut ; ne saisir ni cible aérienne ni cible sous protection post-projection.

##### specialBack — Repli de Meryl — Twin Snakes

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MERYL — TWIN SNAKES, préparer « Repli de Meryl — Twin Snakes » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer l’appui qui produit le déplacement ; pas prudents sans inverser l’étui ni la main forte.

**Action.** Exécuter « Repli de Meryl — Twin Snakes » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** recul du poignet puis stabilisation du canon. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Dernières cartouches — Twin Snakes

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MERYL — TWIN SNAKES, préparer « Dernières cartouches — Twin Snakes » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Montrer la prise et la visée de l’arme décrite par « Dernières cartouches — Twin Snakes » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MERYL — TWIN SNAKES, préparer « Recharger » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** recul du poignet puis stabilisation du canon. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Dernières cartouches — Final — Twin Snakes

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Dernières cartouches — Twin Snakes / Desert Eagle — Twin Snakes.

Plan 1 : MERYL — TWIN SNAKES sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Dernières cartouches — Twin Snakes / Desert Eagle — Twin Snakes ». Plan 2 : présenter l’arme effectivement associée à « Dernières cartouches — Twin Snakes / Desert Eagle — Twin Snakes », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : recul du poignet puis stabilisation du canon, pose de signature face à l’adversaire.

##### Desert Eagle / Grenade d’urgence — Twin Snakes

Famille `ballistic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Dernières cartouches — Twin Snakes / Grenade d’urgence — Twin Snakes.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Dernières cartouches — Twin Snakes / Grenade d’urgence — Twin Snakes » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Dernières cartouches — Twin Snakes / Grenade d’urgence — Twin Snakes », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : recul du poignet puis stabilisation du canon, arrêt du dispositif et retour au cadre d’ensemble.

##### Saisie de recrue — Point final — Twin Snakes

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Dernières cartouches — Twin Snakes / Saisie de recrue — Twin Snakes.

Plan 1 : approche jusqu’à la distance réelle de « Dernières cartouches — Twin Snakes / Saisie de recrue — Twin Snakes », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Dernières cartouches — Twin Snakes / Saisie de recrue — Twin Snakes », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : recul du poignet puis stabilisation du canon, prise de distance et maintien final.

##### Lecture rapprochée — Mission close — Twin Snakes

Famille `ballistic`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Dernières cartouches — Twin Snakes / Repli de Meryl — Twin Snakes.

Plan 1 : après une observation ou un repli, MERYL — TWIN SNAKES reprend l’initiative par « Dernières cartouches — Twin Snakes / Repli de Meryl — Twin Snakes ». Plan 2 : présenter l’arme effectivement associée à « Dernières cartouches — Twin Snakes / Repli de Meryl — Twin Snakes », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : recul du poignet puis stabilisation du canon, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Final GC model/body used, not concept illustrations reused from MGS1 or MGS4 RatPatrol costume.
- Selected handgun visibly source-attested in original9220s scene; exact small barrel/slide pixels and DesertEagle commercial configuration adapted, not independently texture certified.
- Sixteen authored fighting poses per facing; anatomicalright firearm and freeleft hand retained, no canonicalballistics claim.
- Actual native aim gesture is physicalpose10 in both independently drawn facings; source-specific shoot mapping selects this pose, not the tool-request label11.
- [Three native640x452 whole original-game-video decoded frames physically viewed: 08400 torso/hair,09520 complete kneeling outfit/boots,9220 Mantis-controlled Meryl with blacklarge handgun. Capture hardware/emulator not independently certified.](https://archive.org/download/Gamecube_Longplay_Metal_Gear_Solid_The_Twin_Snakes_a/Gamecube_Longplay_004_Metal_Gear_Solid_The_Twin_Snakes_a_Part_1.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## roster51__otacon_tts

### OTACON — TWIN SNAKES — THE TWIN SNAKES

**Rôle :** Ingénieur Rex. **Profil :** `analyst`.

**Base présente dans le code :** Version remake d’Otacon ; outils, caméra et soutien technique restent une simulation non létale.

**Incarnation à conserver :** Hal Emmerich/Otacon, Twin Snakes final GameCube lab coat/bluejeans/clearglasses costume

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, special, specialForward, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** OTACON — TWIN SNAKES : outil de lecture ou de communication montré par le profil, attitude d’observation. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Ingénieur Rex » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder outil de lecture ou de communication montré par le profil, attitude d’observation.
- **jump_land :** OTACON — TWIN SNAKES : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de OTACON — TWIN SNAKES. Terminer par regard vers l’outil puis retour vers l’adversaire. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « THE TWIN SNAKES », présentation de Hal Emmerich/Otacon, Twin Snakes final GameCube lab coat/bluejeans/clearglasses costume, puis outil de lecture ou de communication montré par le profil, attitude d’observation. Geste court lié à « Électrode de secours — Remake » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, regard vers l’outil puis retour vers l’adversaire ; OTACON — TWIN SNAKES vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à THE TWIN SNAKES.
- **round_loss :** Proposition CQC : OTACON — TWIN SNAKES réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Arrêt de REX — Remake », revenir par regard vers l’outil puis retour vers l’adversaire, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OTACON — TWIN SNAKES, préparer « Jab » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OTACON — TWIN SNAKES, préparer « Frappe engagée » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OTACON — TWIN SNAKES, préparer « Balayage » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OTACON — TWIN SNAKES, préparer « Projection » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Électrode de secours — Remake

**Existant :** `melee` / `electric` ; 17/5/29 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OTACON — TWIN SNAKES, préparer « Électrode de secours — Remake » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Électrode de secours — Remake » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense. L’effet electric reste séparé du membre ; son apparition et sa disparition suivent les événements du profil.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Espacement ou garde ; choc bref avec résistance temporaire après application.

##### specialDown — Caméra de maintenance — Remake

**Existant :** `mark` / `recon` ; 26/1/30 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OTACON — TWIN SNAKES, préparer « Caméra de maintenance — Remake » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Orienter regard, optique ou terminal vers la cible observée, sans consulter une action future.

**Action.** Pour « Caméra de maintenance — Remake », déclencher lecture/repérage avec un petit geste ou changement d’optique et un indicateur séparé. Le corps doit rester visible et vulnérable selon les données de combat.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Couper le signal ou abaisser l’outil ; retour vers l’adversaire sans nouvelle arme inventée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Portée limitée ; le marquage ne vise ni à travers toute l’arène ni automatiquement.

##### specialForward — Diagnostic REX — Remake

**Existant :** `mobility` / `movement` ; 7/18/25 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OTACON — TWIN SNAKES, préparer « Diagnostic REX — Remake » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer l’appui qui produit le déplacement ; déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire.

**Action.** Exécuter « Diagnostic REX — Remake » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 4 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : La silhouette reste touchable ; la sortie est punissable.

##### specialBack — Fuite d’Otacon — Remake

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OTACON — TWIN SNAKES, préparer « Fuite d’Otacon — Remake » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer l’appui qui produit le déplacement ; déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire.

**Action.** Exécuter « Fuite d’Otacon — Remake » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Arrêt de REX — Remake

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OTACON — TWIN SNAKES, préparer « Arrêt de REX — Remake » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Arrêt de REX — Remake », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Stabiliser la réserve

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OTACON — TWIN SNAKES, préparer « Stabiliser la réserve » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Stabiliser la réserve ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Arrêt de REX — Conclusion — Remake

Famille `tactical`, ton `simulation` ; 220 ticks CQC ; phases actuelles : scan → disable → secure → extract. Appuis déclarés : Arrêt de REX — Remake / Électrode de secours — Remake.

Plan 1 : OTACON — TWIN SNAKES sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Arrêt de REX — Remake / Électrode de secours — Remake ». Plan 2 : matérialiser le geste tactique « Arrêt de REX — Remake / Électrode de secours — Remake » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : regard vers l’outil puis retour vers l’adversaire, pose de signature face à l’adversaire. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Électrode de secours — Conclusion — Remake

Famille `tactical`, ton `simulation` ; 238 ticks CQC ; phases actuelles : scan → disable → secure → extract. Appuis déclarés : Arrêt de REX — Remake / Caméra de maintenance — Remake.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Arrêt de REX — Remake / Caméra de maintenance — Remake » ; l’espace disponible doit être lisible. Plan 2 : matérialiser le geste tactique « Arrêt de REX — Remake / Caméra de maintenance — Remake » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : regard vers l’outil puis retour vers l’adversaire, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Diagnostic REX — Conclusion — Remake

Famille `capture`, ton `simulation` ; 256 ticks CQC ; phases actuelles : stun → disarm → restrain → extract. Appuis déclarés : Arrêt de REX — Remake / Diagnostic REX — Remake.

Plan 1 : approche jusqu’à la distance réelle de « Arrêt de REX — Remake / Diagnostic REX — Remake », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Arrêt de REX — Remake / Diagnostic REX — Remake », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : regard vers l’outil puis retour vers l’adversaire, prise de distance et maintien final. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Simulation encadrée — Conclusion — Remake

Famille `tactical`, ton `simulation` ; 274 ticks CQC ; phases actuelles : scan → disable → secure → extract. Appuis déclarés : Arrêt de REX — Remake / Fuite d’Otacon — Remake.

Plan 1 : après une observation ou un repli, OTACON — TWIN SNAKES reprend l’initiative par « Arrêt de REX — Remake / Fuite d’Otacon — Remake ». Plan 2 : matérialiser le geste tactique « Arrêt de REX — Remake / Fuite d’Otacon — Remake » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : regard vers l’outil puis retour vers l’adversaire, rangement/pose finale différente des trois autres. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- GameCube final model observed; classic PS1 concept and MGS4 costume are not substituted.
- Standing drape and authored defensive poses adapt the source seated fullbody, preserving labcoat/bluejeans/darksoles.
- Original upload640x452 and dark scene limit tiny coat seams and eyeglass engraving; no original model/texture or absolute pixel equivalence certified.
- [Three native640x452 whole original uploaded GameCube edition longplay frames physically viewed: whole seated body06260s, face/glasses06710s, labcoat support00100s part2; Root source handoff is SHA pinned. Hardware vs emulator origin of uploaded source not established.](https://archive.org/download/Gamecube_Longplay_Metal_Gear_Solid_The_Twin_Snakes_a/Gamecube_Longplay_004_Metal_Gear_Solid_The_Twin_Snakes_a_Part_1.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## roster51__ocelot_tts

### REVOLVER OCELOT — TWIN SNAKES — THE TWIN SNAKES

**Rôle :** Six coups et ricochet limité. **Profil :** `ocelot`.

**Base présente dans le code :** Version remake d’Ocelot : barillet, ricochets et mobilité de duel.

**Incarnation à conserver :** Original two-armed Revolver Ocelot boss, released long darkbrown coat and Single Action Army revolver

**État vérifié :** métadonnées natives avec limites. 28 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `shoot` = special, specialDown, specialForward, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** REVOLVER OCELOT — TWIN SNAKES : poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas latéraux et regard indépendant des rotations d’arme. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Six coups et ricochet limité » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder poignets, revolvers et étuis propres à cet âge ; manipulation identifiable.
- **jump_land :** REVOLVER OCELOT — TWIN SNAKES : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas latéraux et regard indépendant des rotations d’arme. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de REVOLVER OCELOT — TWIN SNAKES. Terminer par replacer chaque arme sans changer sa main ni téléporter les cartouches. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « THE TWIN SNAKES », présentation de Original two-armed Revolver Ocelot boss, released long darkbrown coat and Single Action Army revolver, puis poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Geste court lié à « Single Action Army — Remake » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, replacer chaque arme sans changer sa main ni téléporter les cartouches ; REVOLVER OCELOT — TWIN SNAKES vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à THE TWIN SNAKES.
- **round_loss :** Proposition CQC : REVOLVER OCELOT — TWIN SNAKES réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Six coups — Remake », revenir par replacer chaque arme sans changer sa main ni téléporter les cartouches, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de REVOLVER OCELOT — TWIN SNAKES, préparer « Jab » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de REVOLVER OCELOT — TWIN SNAKES, préparer « Frappe engagée » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de REVOLVER OCELOT — TWIN SNAKES, préparer « Balayage » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de REVOLVER OCELOT — TWIN SNAKES, préparer « Projection » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Single Action Army — Remake

**Existant :** `projectile` / `precision` ; 15/1/24 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de REVOLVER OCELOT — TWIN SNAKES, préparer « Single Action Army — Remake » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Montrer la prise et la visée de l’arme décrite par « Single Action Army — Remake » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. Prévoir le ricochet comme événement de l’objet ; le corps ne se réoriente pas automatiquement vers la cible.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Six munitions puis recharge ; le ricochet rebondit une fois, pas de tir infini.

##### specialDown — Tir bas — Remake

**Existant :** `projectile` / `ballistic` ; 23/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de REVOLVER OCELOT — TWIN SNAKES, préparer « Tir bas — Remake » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Montrer la prise et la visée de l’arme décrite par « Tir bas — Remake » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialForward — Pas de côté — Remake

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de REVOLVER OCELOT — TWIN SNAKES, préparer « Pas de côté — Remake » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Préparer l’appui qui produit le déplacement ; pas latéraux et regard indépendant des rotations d’arme.

**Action.** Exécuter « Pas de côté — Remake » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### specialBack — Crosse de contre — Remake

**Existant :** `parry` / `counter` ; 3/10/29 ticks ; groupe `parry`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de REVOLVER OCELOT — TWIN SNAKES, préparer « Crosse de contre — Remake » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Présenter la surface ou l’organe de parade et maintenir une fenêtre courte lisible.

**Action.** Recevoir puis dévier au contact réel pour « Crosse de contre — Remake » ; la riposte et son effet n’apparaissent qu’après succès. Une attente sans contact garde une pose différente du contre réussi.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches. Séparer sortie ratée, blocage simple et riposte ; aucun effet de réussite avant collision.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Retarder la frappe, projeter ou attendre les 29 images de récupération.

##### super — Six coups — Remake

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de REVOLVER OCELOT — TWIN SNAKES, préparer « Six coups — Remake » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Montrer la prise et la visée de l’arme décrite par « Six coups — Remake » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Exige six cartouches et 50 TACTIC. Accroupissement sous les tirs hauts, saut ou interruption avant départ ; aucun rechargement gratuit.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de REVOLVER OCELOT — TWIN SNAKES, préparer « Recharger » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Sixième chambre — Remake

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Six coups — Remake / Single Action Army — Remake.

Plan 1 : REVOLVER OCELOT — TWIN SNAKES sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Six coups — Remake / Single Action Army — Remake ». Plan 2 : présenter l’arme effectivement associée à « Six coups — Remake / Single Action Army — Remake », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : replacer chaque arme sans changer sa main ni téléporter les cartouches, pose de signature face à l’adversaire.

##### Ricochet terminal — Remake

Famille `sniper`, ton `stylized` ; 238 ticks CQC ; phases actuelles : mark → steady → shot → fade. Appuis déclarés : Six coups — Remake / Tir bas — Remake.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Six coups — Remake / Tir bas — Remake » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Six coups — Remake / Tir bas — Remake », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : replacer chaque arme sans changer sa main ni téléporter les cartouches, arrêt du dispositif et retour au cadre d’ensemble.

##### High Noon — Remake

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Six coups — Remake / Pas de côté — Remake.

Plan 1 : approche jusqu’à la distance réelle de « Six coups — Remake / Pas de côté — Remake », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Six coups — Remake / Pas de côté — Remake », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : replacer chaque arme sans changer sa main ni téléporter les cartouches, prise de distance et maintien final.

##### Aucune confiance — Remake

Famille `ballistic`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Six coups — Remake / Crosse de contre — Remake.

Plan 1 : après une observation ou un repli, REVOLVER OCELOT — TWIN SNAKES reprend l’initiative par « Six coups — Remake / Crosse de contre — Remake ». Plan 2 : présenter l’arme effectivement associée à « Six coups — Remake / Crosse de contre — Remake », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : replacer chaque arme sans changer sa main ni téléporter les cartouches, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Original two-armed boss state distinguished from later amputated cutscene; no falsely reconstructed missing arm from that later frame.
- Dark native lighting obscures fine coat stitching/holster hardware; closest authored adaptation, not texture certification.
- Sixteen authored tactical poses per direction; actual muzzle points measured after visual generation review, no original ballistic-data claim.
- Native aim is physicalpose1 RIGHT andpose6 LEFT, source-specific shoot groups select them. LEFT free-hand CQC selects native reachpose8, avoiding a drawn firearm-aim pose for bare-hand active strikes.
- [Original fullnative640x452 GameCube frames2945s/2965s physically viewed show original whole two-armed boss/coattail/boots/SAA. Later fullnative10980s only corroborates inner white shirt/blue waistcoat/redscarf/cartridge harness; its amputated arm explicitly excluded. Original3040s verifies final face.](https://archive.org/download/Gamecube_Longplay_Metal_Gear_Solid_The_Twin_Snakes_a/Gamecube_Longplay_004_Metal_Gear_Solid_The_Twin_Snakes_a_Part_1.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## roster51__grayfox_tts

### GRAY FOX — TWIN SNAKES — THE TWIN SNAKES

**Rôle :** Lame, déviation et furtivité. **Profil :** `ninja`.

**Base présente dans le code :** Version remake du Ninja cyborg : lame HF, déviation et camouflage limité.

**Incarnation à conserver :** Gray Fox, final GameCube gray helmet/orange optic, graphite-and-copper Cyborg Ninja

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `blade` = light, heavy, special, specialDown, specialForward, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** GRAY FOX — TWIN SNAKES : centre bas, main et fourreau orientés selon cette incarnation. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** appuis souples, accélération puis arrêt net avant une coupe. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Lame, déviation et furtivité » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder centre bas, main et fourreau orientés selon cette incarnation.
- **jump_land :** GRAY FOX — TWIN SNAKES : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. appuis souples, accélération puis arrêt net avant une coupe. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de GRAY FOX — TWIN SNAKES. Terminer par finir l’arc de lame puis reprendre la garde sans traverser le corps. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « THE TWIN SNAKES », présentation de Gray Fox, final GameCube gray helmet/orange optic, graphite-and-copper Cyborg Ninja, puis centre bas, main et fourreau orientés selon cette incarnation. Geste court lié à « Coupe haute fréquence — Remake » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, finir l’arc de lame puis reprendre la garde sans traverser le corps ; GRAY FOX — TWIN SNAKES vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à THE TWIN SNAKES.
- **round_loss :** Proposition CQC : GRAY FOX — TWIN SNAKES réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Assaut du ninja — Remake », revenir par finir l’arc de lame puis reprendre la garde sans traverser le corps, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Contact de lame

**Existant :** `melee` / `blade` ; 7/3/12 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GRAY FOX — TWIN SNAKES, préparer « Contact de lame » ; centre bas, main et fourreau orientés selon cette incarnation. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Coupe engagée

**Existant :** `melee` / `blade` ; 18/5/24 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GRAY FOX — TWIN SNAKES, préparer « Coupe engagée » ; centre bas, main et fourreau orientés selon cette incarnation. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GRAY FOX — TWIN SNAKES, préparer « Balayage » ; centre bas, main et fourreau orientés selon cette incarnation. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GRAY FOX — TWIN SNAKES, préparer « Projection » ; centre bas, main et fourreau orientés selon cette incarnation. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Coupe haute fréquence — Remake

**Existant :** `melee` / `blade` ; 13/5/24 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GRAY FOX — TWIN SNAKES, préparer « Coupe haute fréquence — Remake » ; centre bas, main et fourreau orientés selon cette incarnation. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde puis punition ; la lame ne touche qu’une fois par attaque.

##### specialDown — Coupe ascendante — Remake

**Existant :** `melee` / `blade` ; 21/4/33 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GRAY FOX — TWIN SNAKES, préparer « Coupe ascendante — Remake » ; centre bas, main et fourreau orientés selon cette incarnation. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer ou espacer ; la remontée est punissable en garde.

##### specialForward — Camouflage optique — Remake

**Existant :** `buff` / `stealth` ; 19/1/27 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GRAY FOX — TWIN SNAKES, préparer « Camouflage optique — Remake » ; centre bas, main et fourreau orientés selon cette incarnation. Montrer la préparation corporelle ou mécanique de « Camouflage optique — Remake ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Silhouette translucide, collision intacte ; une attaque ou un impact brise le camouflage.

##### specialBack — Dévier les balles — Remake

**Existant :** `parry` / `counter` ; 5/12/28 ticks ; groupe `parry`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GRAY FOX — TWIN SNAKES, préparer « Dévier les balles — Remake » ; centre bas, main et fourreau orientés selon cette incarnation. Présenter la surface ou l’organe de parade et maintenir une fenêtre courte lisible.

**Action.** Recevoir puis dévier au contact réel pour « Dévier les balles — Remake » ; la riposte et son effet n’apparaissent qu’après succès. Une attente sans contact garde une pose différente du contre réussi.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Séparer sortie ratée, blocage simple et riposte ; aucun effet de réussite avant collision.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Projections, attaques au corps à corps et explosifs au sol ne sont pas renvoyés.

##### super — Assaut du ninja — Remake

**Existant :** `melee` / `blade` ; 25/7/44 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GRAY FOX — TWIN SNAKES, préparer « Assaut du ninja — Remake » ; centre bas, main et fourreau orientés selon cette incarnation. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Stabiliser la réserve

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GRAY FOX — TWIN SNAKES, préparer « Stabiliser la réserve » ; centre bas, main et fourreau orientés selon cette incarnation. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Stabiliser la réserve ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Deepthroat Cut — Remake

Famille `blade`, ton `stylized` ; 220 ticks CQC ; phases actuelles : dash → crosscut → freeze → sheath. Appuis déclarés : Assaut du ninja — Remake / Coupe haute fréquence — Remake.

Plan 1 : GRAY FOX — TWIN SNAKES sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Assaut du ninja — Remake / Coupe haute fréquence — Remake ». Plan 2 : armer la lame ou le membre de « Assaut du ninja — Remake / Coupe haute fréquence — Remake » et dégager son arc. Plan 3 : enchaîner des coupes lisibles avec angles distincts ; les impacts et les réactions suivent le fil de lame, sans ajout d’arme d’une autre incarnation. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : finir l’arc de lame puis reprendre la garde sans traverser le corps, pose de signature face à l’adversaire.

##### Stealth Split — Remake

Famille `blade`, ton `stylized` ; 238 ticks CQC ; phases actuelles : dash → crosscut → freeze → sheath. Appuis déclarés : Assaut du ninja — Remake / Coupe ascendante — Remake.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Assaut du ninja — Remake / Coupe ascendante — Remake » ; l’espace disponible doit être lisible. Plan 2 : armer la lame ou le membre de « Assaut du ninja — Remake / Coupe ascendante — Remake » et dégager son arc. Plan 3 : enchaîner des coupes lisibles avec angles distincts ; les impacts et les réactions suivent le fil de lame, sans ajout d’arme d’une autre incarnation. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : finir l’arc de lame puis reprendre la garde sans traverser le corps, arrêt du dispositif et retour au cadre d’ensemble.

##### Fox Blade — Remake

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Assaut du ninja — Remake / Camouflage optique — Remake.

Plan 1 : approche jusqu’à la distance réelle de « Assaut du ninja — Remake / Camouflage optique — Remake », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Assaut du ninja — Remake / Camouflage optique — Remake », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : finir l’arc de lame puis reprendre la garde sans traverser le corps, prise de distance et maintien final.

##### Arme inutile — Remake

Famille `blade`, ton `stylized` ; 274 ticks CQC ; phases actuelles : dash → crosscut → freeze → sheath. Appuis déclarés : Assaut du ninja — Remake / Dévier les balles — Remake.

Plan 1 : après une observation ou un repli, GRAY FOX — TWIN SNAKES reprend l’initiative par « Assaut du ninja — Remake / Dévier les balles — Remake ». Plan 2 : armer la lame ou le membre de « Assaut du ninja — Remake / Dévier les balles — Remake » et dégager son arc. Plan 3 : enchaîner des coupes lisibles avec angles distincts ; les impacts et les réactions suivent le fil de lame, sans ajout d’arme d’une autre incarnation. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : finir l’arc de lame puis reprendre la garde sans traverser le corps, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Bodycolor/helmet follow actual final GameCube frames; legacy guide blue armor explicitly excluded.
- Canonical katana geometry corroborated by official guide; exact final GC blade grip pixels not separately visible in selected footage and pose/weapon handling authored.
- Sixteen independently drawn poses per facing; small articulated copper seams adapted, no canonical texture certification.
- RIGHT native poses1/2/3/6 contain final boss unarmed defensive gestures; blade/heavy action explicitly select the physically drawn katana poses5 and11 with armed neutral0, no imaginary blade or raster repaint. LEFT activeblade physicalpose6 is visibly drawn.
- [Entire native640x452 original game frames physically viewed for final model and helmet; entire BradyGames official guide page66 preserves reused MGS1 katana art only as canonical weapon corroboration, never as final GC bodycolor evidence.](https://archive.org/download/Gamecube_Longplay_Metal_Gear_Solid_The_Twin_Snakes_a/Gamecube_Longplay_004_Metal_Gear_Solid_The_Twin_Snakes_a_Part_1.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## roster51__liquid_tts

### LIQUID SNAKE — TWIN SNAKES — THE TWIN SNAKES

**Rôle :** Corps à corps sans arme spéciale. **Profil :** `brawler`.

**Base présente dans le code :** Version remake de Liquid : poings, prises et contre du toit de REX.

**Incarnation à conserver :** Liquid Snake, released dark open longcoat and bare torso incarnation

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, special, specialDown, super ; `throw` = throw, specialForward.

**Techniques pointant sur une seule région native dans la direction principale :** specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** LIQUID SNAKE — TWIN SNAKES : poids sur les jambes, épaules engagées, mains prêtes. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** transfert lourd mais anatomique, freinage par un appui réel. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Corps à corps sans arme spéciale » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder poids sur les jambes, épaules engagées, mains prêtes.
- **jump_land :** LIQUID SNAKE — TWIN SNAKES : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. transfert lourd mais anatomique, freinage par un appui réel. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de LIQUID SNAKE — TWIN SNAKES. Terminer par rétablir bassin et épaules après l’élan. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « THE TWIN SNAKES », présentation de Liquid Snake, released dark open longcoat and bare torso incarnation, puis poids sur les jambes, épaules engagées, mains prêtes. Geste court lié à « Poing de Liquid — Remake » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, rétablir bassin et épaules après l’élan ; LIQUID SNAKE — TWIN SNAKES vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à THE TWIN SNAKES.
- **round_loss :** Proposition CQC : LIQUID SNAKE — TWIN SNAKES réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « REX — dernier duel — Remake », revenir par rétablir bassin et épaules après l’élan, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LIQUID SNAKE — TWIN SNAKES, préparer « Jab » ; poids sur les jambes, épaules engagées, mains prêtes. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** rétablir bassin et épaules après l’élan.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LIQUID SNAKE — TWIN SNAKES, préparer « Frappe engagée » ; poids sur les jambes, épaules engagées, mains prêtes. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** rétablir bassin et épaules après l’élan.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LIQUID SNAKE — TWIN SNAKES, préparer « Balayage » ; poids sur les jambes, épaules engagées, mains prêtes. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** rétablir bassin et épaules après l’élan.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LIQUID SNAKE — TWIN SNAKES, préparer « Projection » ; poids sur les jambes, épaules engagées, mains prêtes. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** rétablir bassin et épaules après l’élan. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Poing de Liquid — Remake

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LIQUID SNAKE — TWIN SNAKES, préparer « Poing de Liquid — Remake » ; poids sur les jambes, épaules engagées, mains prêtes. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Poing de Liquid — Remake » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** rétablir bassin et épaules après l’élan.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialDown — Balayage du toit — Remake

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LIQUID SNAKE — TWIN SNAKES, préparer « Balayage du toit — Remake » ; poids sur les jambes, épaules engagées, mains prêtes. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** rétablir bassin et épaules après l’élan.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### specialForward — Prise du FOXHOUND — Remake

**Existant :** `melee` / `grapple` ; 10/3/32 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LIQUID SNAKE — TWIN SNAKES, préparer « Prise du FOXHOUND — Remake » ; poids sur les jambes, épaules engagées, mains prêtes. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** rétablir bassin et épaules après l’élan. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Hors de portée ou saut ; ne saisir ni cible aérienne ni cible sous protection post-projection.

##### specialBack — Contre de Liquid — Remake

**Existant :** `parry` / `counter` ; 3/10/29 ticks ; groupe `parry`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LIQUID SNAKE — TWIN SNAKES, préparer « Contre de Liquid — Remake » ; poids sur les jambes, épaules engagées, mains prêtes. Présenter la surface ou l’organe de parade et maintenir une fenêtre courte lisible.

**Action.** Recevoir puis dévier au contact réel pour « Contre de Liquid — Remake » ; la riposte et son effet n’apparaissent qu’après succès. Une attente sans contact garde une pose différente du contre réussi.

**Retour.** rétablir bassin et épaules après l’élan. Séparer sortie ratée, blocage simple et riposte ; aucun effet de réussite avant collision.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Retarder la frappe, projeter ou attendre les 29 images de récupération.

##### super — REX — dernier duel — Remake

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LIQUID SNAKE — TWIN SNAKES, préparer « REX — dernier duel — Remake » ; poids sur les jambes, épaules engagées, mains prêtes. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « REX — dernier duel — Remake », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** rétablir bassin et épaules après l’élan.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Reprendre son souffle

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LIQUID SNAKE — TWIN SNAKES, préparer « Reprendre son souffle » ; poids sur les jambes, épaules engagées, mains prêtes. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Reprendre son souffle ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** rétablir bassin et épaules après l’élan. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Superior Genes — Remake

Famille `cqc`, ton `stylized` ; 220 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : REX — dernier duel — Remake / Poing de Liquid — Remake.

Plan 1 : LIQUID SNAKE — TWIN SNAKES sécurise son appui, regarde la cible et prépare l’outil ou le geste de « REX — dernier duel — Remake / Poing de Liquid — Remake ». Plan 2 : contact de saisie ou neutralisation lié à « REX — dernier duel — Remake / Poing de Liquid — Remake », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : rétablir bassin et épaules après l’élan, pose de signature face à l’adversaire.

##### REX Rooftop — Remake

Famille `cqc`, ton `stylized` ; 238 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : REX — dernier duel — Remake / Balayage du toit — Remake.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « REX — dernier duel — Remake / Balayage du toit — Remake » ; l’espace disponible doit être lisible. Plan 2 : contact de saisie ou neutralisation lié à « REX — dernier duel — Remake / Balayage du toit — Remake », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : rétablir bassin et épaules après l’élan, arrêt du dispositif et retour au cadre d’ensemble.

##### FOXHOUND Knockout — Remake

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : REX — dernier duel — Remake / Prise du FOXHOUND — Remake.

Plan 1 : approche jusqu’à la distance réelle de « REX — dernier duel — Remake / Prise du FOXHOUND — Remake », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « REX — dernier duel — Remake / Prise du FOXHOUND — Remake », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : rétablir bassin et épaules après l’élan, prise de distance et maintien final.

##### Not Yet Snake — Remake

Famille `cqc`, ton `stylized` ; 274 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : REX — dernier duel — Remake / Contre de Liquid — Remake.

Plan 1 : après une observation ou un repli, LIQUID SNAKE — TWIN SNAKES reprend l’initiative par « REX — dernier duel — Remake / Contre de Liquid — Remake ». Plan 2 : contact de saisie ou neutralisation lié à « REX — dernier duel — Remake / Contre de Liquid — Remake », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : rétablir bassin et épaules après l’élan, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Distinct final GameCube model used; official MGS1 illustrations reused in guide are not treated as final GC textures.
- Dark trousers/footwear tailored as close adaptation where selected full frames are partly offscreen; fine soles not separately certified.
- Sixteen authored combat poses per direction and empty hands; no source firearm present in this selected costume sheet.
- [Three native640x452 entire original-game-video decoded frames physically viewed, preserving final GameCube face/hair/open dark brown coat/bare torso/dogtags. Uploaded capture hardware/emulator not independently certified.](https://archive.org/download/Gamecube_Longplay_Metal_Gear_Solid_The_Twin_Snakes_a/Gamecube_Longplay_004_Metal_Gear_Solid_The_Twin_Snakes_a_Part_1.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## roster51__mantis_tts

### PSYCHO MANTIS — TWIN SNAKES — THE TWIN SNAKES

**Rôle :** Télékinésie bornée et mobilité. **Profil :** `psychic`.

**Base présente dans le code :** Version remake de Mantis : télékinésie lisible et illusions sans lecture des futures entrées.

**Incarnation à conserver :** Psycho Mantis, Twin Snakes final GameCube angular-orange mask/crossedblack harness/tallboots incarnation

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `deploy` = special, specialDown, super.

**Techniques pointant sur une seule région native dans la direction principale :** special, specialDown, specialBack, super, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `cyborg`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** PSYCHO MANTIS — TWIN SNAKES : regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** mouvement et éventuelle sustentation distingués de l’effet psychique. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Télékinésie bornée et mobilité » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile.
- **jump_land :** PSYCHO MANTIS — TWIN SNAKES : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. mouvement et éventuelle sustentation distingués de l’effet psychique. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de PSYCHO MANTIS — TWIN SNAKES. Terminer par cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « THE TWIN SNAKES », présentation de Psycho Mantis, Twin Snakes final GameCube angular-orange mask/crossedblack harness/tallboots incarnation, puis regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Geste court lié à « Débris télékinétiques — Remake » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, cesser le geste de concentration puis revenir à la posture propre à l’incarnation ; PSYCHO MANTIS — TWIN SNAKES vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à THE TWIN SNAKES.
- **round_loss :** Proposition CQC : PSYCHO MANTIS — TWIN SNAKES réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Psychokinésie — Remake », revenir par cesser le geste de concentration puis revenir à la posture propre à l’incarnation, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PSYCHO MANTIS — TWIN SNAKES, préparer « Jab » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PSYCHO MANTIS — TWIN SNAKES, préparer « Frappe engagée » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PSYCHO MANTIS — TWIN SNAKES, préparer « Balayage » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PSYCHO MANTIS — TWIN SNAKES, préparer « Projection » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Débris télékinétiques — Remake

**Existant :** `projectile` / `psychic` ; 27/1/30 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PSYCHO MANTIS — TWIN SNAKES, préparer « Débris télékinétiques — Remake » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Donner à la source de « Débris télékinétiques — Remake » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet psychic de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Projectile lent et visible : sauter, bloquer ou détruire avec une attaque.

##### specialDown — Entrave mentale — Remake

**Existant :** `projectile` / `bind` ; 32/1/34 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PSYCHO MANTIS — TWIN SNAKES, préparer « Entrave mentale — Remake » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Donner à la source de « Entrave mentale — Remake » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet bind de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut ou garde basse ; ralentissement bref, aucune confiscation des commandes.

##### specialForward — Déplacement de Mantis — Remake

**Existant :** `mobility` / `psychic` ; 23/1/28 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PSYCHO MANTIS — TWIN SNAKES, préparer « Déplacement de Mantis — Remake » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Préparer l’appui qui produit le déplacement ; mouvement et éventuelle sustentation distingués de l’effet psychique.

**Action.** Exécuter « Déplacement de Mantis — Remake » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Départ et arrivée indiqués ; pas de téléportation derrière la cible ni hors arène.

##### specialBack — Déviation psychique — Remake

**Existant :** `parry` / `counter` ; 5/12/28 ticks ; groupe `parry`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PSYCHO MANTIS — TWIN SNAKES, préparer « Déviation psychique — Remake » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Présenter la surface ou l’organe de parade et maintenir une fenêtre courte lisible.

**Action.** Recevoir puis dévier au contact réel pour « Déviation psychique — Remake » ; la riposte et son effet n’apparaissent qu’après succès. Une attente sans contact garde une pose différente du contre réussi.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Séparer sortie ratée, blocage simple et riposte ; aucun effet de réussite avant collision.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Projections, attaques au corps à corps et explosifs au sol ne sont pas renvoyés.

##### super — Psychokinésie — Remake

**Existant :** `projectile` / `psychic` ; 35/1/44 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PSYCHO MANTIS — TWIN SNAKES, préparer « Psychokinésie — Remake » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Donner à la source de « Psychokinésie — Remake » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet psychic de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet. La salve contient 5 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 5 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Stabiliser la réserve

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PSYCHO MANTIS — TWIN SNAKES, préparer « Stabiliser la réserve » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Stabiliser la réserve ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Blackout — Remake

Famille `psychic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : lift → orbit → crush → drop. Appuis déclarés : Psychokinésie — Remake / Débris télékinétiques — Remake.

Plan 1 : PSYCHO MANTIS — TWIN SNAKES sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Psychokinésie — Remake / Débris télékinétiques — Remake ». Plan 2 : montrer la source corporelle ou matérielle de « Psychokinésie — Remake / Débris télékinétiques — Remake ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, pose de signature face à l’adversaire.

##### Memory Read — Remake

Famille `psychic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : lift → orbit → crush → drop. Appuis déclarés : Psychokinésie — Remake / Entrave mentale — Remake.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Psychokinésie — Remake / Entrave mentale — Remake » ; l’espace disponible doit être lisible. Plan 2 : montrer la source corporelle ou matérielle de « Psychokinésie — Remake / Entrave mentale — Remake ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, arrêt du dispositif et retour au cadre d’ensemble.

##### Telekinetic Burial — Remake

Famille `psychic`, ton `stylized` ; 256 ticks CQC ; phases actuelles : lift → orbit → crush → drop. Appuis déclarés : Psychokinésie — Remake / Déplacement de Mantis — Remake.

Plan 1 : approche jusqu’à la distance réelle de « Psychokinésie — Remake / Déplacement de Mantis — Remake », arme et main libre identifiées. Plan 2 : montrer la source corporelle ou matérielle de « Psychokinésie — Remake / Déplacement de Mantis — Remake ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, prise de distance et maintien final.

##### Controller Port Two — Remake

Famille `psychic`, ton `stylized` ; 274 ticks CQC ; phases actuelles : lift → orbit → crush → drop. Appuis déclarés : Psychokinésie — Remake / Déviation psychique — Remake.

Plan 1 : après une observation ou un repli, PSYCHO MANTIS — TWIN SNAKES reprend l’initiative par « Psychokinésie — Remake / Déviation psychique — Remake ». Plan 2 : montrer la source corporelle ou matérielle de « Psychokinésie — Remake / Déviation psychique — Remake ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Released GameCube harness/mask model is distinct from PS1 concepts and child MGSV Tretij; no automatic appearance alias.
- Normal combat retains mask; maskless death portrait only helps adult physiology and is not copied as default costume.
- Psychic/floating defensive poses authored, no firearm/weapon/effects absent from source invented.
- Native LEFTv1 pose12 rejected for missing boots; repaired LEFTv2 uses complete compact kneel. No source raster transformed.
- [Original uploaded GameCube edition native640x452 whole frames08800upright complete model,09560lying complete model,09440maskless face physically viewed. Uploaded hardware/emulator provenance unknown, source handoff pinned.](https://archive.org/download/Gamecube_Longplay_Metal_Gear_Solid_The_Twin_Snakes_a/Gamecube_Longplay_004_Metal_Gear_Solid_The_Twin_Snakes_a_Part_1.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## roster51__wolf_tts

### SNIPER WOLF — TWIN SNAKES — THE TWIN SNAKES

**Rôle :** Longue portée et exposition. **Profil :** `sniper`.

**Base présente dans le code :** Version remake de Sniper Wolf : préparation, ligne de tir et repositionnement.

**Incarnation à conserver :** Released GameCube Sniper Wolf final olive/graygreen coat and blond hair; guide documented PSG1

**État vérifié :** métadonnées natives avec limites. 28 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `shoot` = special, specialForward ; `deploy` = specialDown, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, super, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** SNIPER WOLF — TWIN SNAKES : carabine épaulée avec contact joue/crosse et œil cohérent. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** déplacement qui sécurise le long canon et stoppe avant la visée. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Longue portée et exposition » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder carabine épaulée avec contact joue/crosse et œil cohérent.
- **jump_land :** SNIPER WOLF — TWIN SNAKES : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. déplacement qui sécurise le long canon et stoppe avant la visée. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de SNIPER WOLF — TWIN SNAKES. Terminer par recul, éventuel réarmement propre au modèle, réacquisition de cible. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « THE TWIN SNAKES », présentation de Released GameCube Sniper Wolf final olive/graygreen coat and blond hair; guide documented PSG1, puis carabine épaulée avec contact joue/crosse et œil cohérent. Geste court lié à « PSG1 — Remake » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, recul, éventuel réarmement propre au modèle, réacquisition de cible ; SNIPER WOLF — TWIN SNAKES vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à THE TWIN SNAKES.
- **round_loss :** Proposition CQC : SNIPER WOLF — TWIN SNAKES réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Dernier tir de Wolf — Remake », revenir par recul, éventuel réarmement propre au modèle, réacquisition de cible, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SNIPER WOLF — TWIN SNAKES, préparer « Jab » ; carabine épaulée avec contact joue/crosse et œil cohérent. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SNIPER WOLF — TWIN SNAKES, préparer « Frappe engagée » ; carabine épaulée avec contact joue/crosse et œil cohérent. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SNIPER WOLF — TWIN SNAKES, préparer « Balayage » ; carabine épaulée avec contact joue/crosse et œil cohérent. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SNIPER WOLF — TWIN SNAKES, préparer « Projection » ; carabine épaulée avec contact joue/crosse et œil cohérent. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — PSG1 — Remake

**Existant :** `projectile` / `precision` ; 46/1/47 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SNIPER WOLF — TWIN SNAKES, préparer « PSG1 — Remake » ; carabine épaulée avec contact joue/crosse et œil cohérent. Montrer la prise et la visée de l’arme décrite par « PSG1 — Remake » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Laser et armement visibles ; accroupissement ou approche pendant 46 images avant le tir.

##### specialDown — Pas de garde — Remake

**Existant :** `mobility` / `movement` ; 7/18/25 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SNIPER WOLF — TWIN SNAKES, préparer « Pas de garde — Remake » ; carabine épaulée avec contact joue/crosse et œil cohérent. Préparer l’appui qui produit le déplacement ; déplacement qui sécurise le long canon et stoppe avant la visée.

**Action.** Exécuter « Pas de garde — Remake » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 4 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : La silhouette reste touchable ; la sortie est punissable.

##### specialForward — Observer la cible — Remake

**Existant :** `mark` / `recon` ; 26/1/30 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SNIPER WOLF — TWIN SNAKES, préparer « Observer la cible — Remake » ; carabine épaulée avec contact joue/crosse et œil cohérent. Orienter regard, optique ou terminal vers la cible observée, sans consulter une action future.

**Action.** Pour « Observer la cible — Remake », déclencher lecture/repérage avec un petit geste ou changement d’optique et un indicateur séparé. Le corps doit rester visible et vulnérable selon les données de combat.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible. Couper le signal ou abaisser l’outil ; retour vers l’adversaire sans nouvelle arme inventée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Portée limitée ; le marquage ne vise ni à travers toute l’arène ni automatiquement.

##### specialBack — Changer d’abri — Remake

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SNIPER WOLF — TWIN SNAKES, préparer « Changer d’abri — Remake » ; carabine épaulée avec contact joue/crosse et œil cohérent. Préparer l’appui qui produit le déplacement ; déplacement qui sécurise le long canon et stoppe avant la visée.

**Action.** Exécuter « Changer d’abri — Remake » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Dernier tir de Wolf — Remake

**Existant :** `projectile` / `rail` ; 55/1/50 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SNIPER WOLF — TWIN SNAKES, préparer « Dernier tir de Wolf — Remake » ; carabine épaulée avec contact joue/crosse et œil cohérent. Montrer la prise et la visée de l’arme décrite par « Dernier tir de Wolf — Remake » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Préparation longue et trait de visée ; accroupissement ou esquive latérale.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SNIPER WOLF — TWIN SNAKES, préparer « Recharger » ; carabine épaulée avec contact joue/crosse et œil cohérent. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### One Breath — Remake

Famille `sniper`, ton `stylized` ; 220 ticks CQC ; phases actuelles : mark → steady → shot → fade. Appuis déclarés : Dernier tir de Wolf — Remake / PSG1 — Remake.

Plan 1 : SNIPER WOLF — TWIN SNAKES sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Dernier tir de Wolf — Remake / PSG1 — Remake ». Plan 2 : présenter l’arme effectivement associée à « Dernier tir de Wolf — Remake / PSG1 — Remake », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : recul, éventuel réarmement propre au modèle, réacquisition de cible, pose de signature face à l’adversaire.

##### Snowfield Mark — Remake

Famille `sniper`, ton `stylized` ; 238 ticks CQC ; phases actuelles : mark → steady → shot → fade. Appuis déclarés : Dernier tir de Wolf — Remake / Pas de garde — Remake.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Dernier tir de Wolf — Remake / Pas de garde — Remake » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Dernier tir de Wolf — Remake / Pas de garde — Remake », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : recul, éventuel réarmement propre au modèle, réacquisition de cible, arrêt du dispositif et retour au cadre d’ensemble.

##### PSG-1 Finale — Remake

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Dernier tir de Wolf — Remake / Observer la cible — Remake.

Plan 1 : approche jusqu’à la distance réelle de « Dernier tir de Wolf — Remake / Observer la cible — Remake », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Dernier tir de Wolf — Remake / Observer la cible — Remake », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : recul, éventuel réarmement propre au modèle, réacquisition de cible, prise de distance et maintien final.

##### Wolf’s Mercy — Remake

Famille `sniper`, ton `stylized` ; 274 ticks CQC ; phases actuelles : mark → steady → shot → fade. Appuis déclarés : Dernier tir de Wolf — Remake / Changer d’abri — Remake.

Plan 1 : après une observation ou un repli, SNIPER WOLF — TWIN SNAKES reprend l’initiative par « Dernier tir de Wolf — Remake / Changer d’abri — Remake ». Plan 2 : présenter l’arme effectivement associée à « Dernier tir de Wolf — Remake / Changer d’abri — Remake », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : recul, éventuel réarmement propre au modèle, réacquisition de cible, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- PSG1 original inventory weapon geometry independently supported by official game guide; selected death-model frames do not attest complete living grip or scope finepixels.
- Fullbody selected04000 topdown posture and final closeups distinguish GC model from reused PS1 concepts; original tiny emblem/boot details adapted.
- Sixteen living tactical gestures per facing are authored faithful adaptation, no original animation/absolute1:1 texture certification.
- Native horizontal PSG1 aim is physicalpose1 bothfacings; RIGHT freeleft reachingpose8 used for CQC because source6 is drawn sustainedaim. RIGHTRGBA nonzeroRGB under alpha0 remains native unchanged, vectorcontours isolate actual16 figures.
- [Final native640x452 whole video frames11080/04000/04060 physically viewed: face/coat/rightarm emblem and lying full model darkpants/boots. Official Brady native complete original DCT weapon page11 confirms PSG1 construction; capture hardware/emulator not certified.](https://archive.org/download/Gamecube_Longplay_Metal_Gear_Solid_The_Twin_Snakes_a/Gamecube_Longplay_Metal_Gear_Solid_The_Twin_Snakes_a_Part_2.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## roster51__raven_tts

### VULCAN RAVEN — TWIN SNAKES — THE TWIN SNAKES

**Rôle :** Canon lourd et surchauffe. **Profil :** `raven`.

**Base présente dans le code :** Version remake de Raven : canon lourd, chaleur et endurance.

**Incarnation à conserver :** Released GameCube Vulcan Raven barebody markings, native minigun/backpack, authored lowerfoot detail

**État vérifié :** métadonnées natives avec limites. 28 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialDown ; `shoot` = special, specialForward, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** VULCAN RAVEN — TWIN SNAKES : masse de l’arme et du corps visibles, appuis larges. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** accélération lente et compensation du poids de l’armement. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Canon lourd et surchauffe » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder masse de l’arme et du corps visibles, appuis larges.
- **jump_land :** VULCAN RAVEN — TWIN SNAKES : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. accélération lente et compensation du poids de l’armement. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de VULCAN RAVEN — TWIN SNAKES. Terminer par arrêt de l’arme, inertie des accessoires puis garde. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « THE TWIN SNAKES », présentation de Released GameCube Vulcan Raven barebody markings, native minigun/backpack, authored lowerfoot detail, puis masse de l’arme et du corps visibles, appuis larges. Geste court lié à « Canon Vulcan — Remake » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, arrêt de l’arme, inertie des accessoires puis garde ; VULCAN RAVEN — TWIN SNAKES vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à THE TWIN SNAKES.
- **round_loss :** Proposition CQC : VULCAN RAVEN — TWIN SNAKES réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Rafale Vulcan — Remake », revenir par arrêt de l’arme, inertie des accessoires puis garde, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VULCAN RAVEN — TWIN SNAKES, préparer « Jab » ; masse de l’arme et du corps visibles, appuis larges. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** arrêt de l’arme, inertie des accessoires puis garde.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VULCAN RAVEN — TWIN SNAKES, préparer « Frappe engagée » ; masse de l’arme et du corps visibles, appuis larges. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** arrêt de l’arme, inertie des accessoires puis garde.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VULCAN RAVEN — TWIN SNAKES, préparer « Balayage » ; masse de l’arme et du corps visibles, appuis larges. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** arrêt de l’arme, inertie des accessoires puis garde.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VULCAN RAVEN — TWIN SNAKES, préparer « Projection » ; masse de l’arme et du corps visibles, appuis larges. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** arrêt de l’arme, inertie des accessoires puis garde. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Canon Vulcan — Remake

**Existant :** `projectile` / `ballistic` ; 22/1/36 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VULCAN RAVEN — TWIN SNAKES, préparer « Canon Vulcan — Remake » ; masse de l’arme et du corps visibles, appuis larges. Montrer la prise et la visée de l’arme décrite par « Canon Vulcan — Remake » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 5 émissions, espacées de 5 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** arrêt de l’arme, inertie des accessoires puis garde. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 5 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### specialDown — Crosse massive — Remake

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VULCAN RAVEN — TWIN SNAKES, préparer « Crosse massive — Remake » ; masse de l’arme et du corps visibles, appuis larges. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Crosse massive — Remake » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** arrêt de l’arme, inertie des accessoires puis garde.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialForward — Rafale rasante — Remake

**Existant :** `projectile` / `ballistic` ; 22/1/36 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VULCAN RAVEN — TWIN SNAKES, préparer « Rafale rasante — Remake » ; masse de l’arme et du corps visibles, appuis larges. Montrer la prise et la visée de l’arme décrite par « Rafale rasante — Remake » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 3 émissions, espacées de 5 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** arrêt de l’arme, inertie des accessoires puis garde. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 3 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### specialBack — Brace du tireur — Remake

**Existant :** `buff` / `armor` ; 22/1/31 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VULCAN RAVEN — TWIN SNAKES, préparer « Brace du tireur — Remake » ; masse de l’arme et du corps visibles, appuis larges. Montrer la préparation corporelle ou mécanique de « Brace du tireur — Remake ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** arrêt de l’arme, inertie des accessoires puis garde. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Absorbe une seule frappe ; projections, EMP et attaques brise-armure la contrent.

##### super — Rafale Vulcan — Remake

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VULCAN RAVEN — TWIN SNAKES, préparer « Rafale Vulcan — Remake » ; masse de l’arme et du corps visibles, appuis larges. Montrer la prise et la visée de l’arme décrite par « Rafale Vulcan — Remake » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 8 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** arrêt de l’arme, inertie des accessoires puis garde. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 8 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Refroidir

**Existant :** `recover` / `recovery` ; 45/1/25 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VULCAN RAVEN — TWIN SNAKES, préparer « Refroidir » ; masse de l’arme et du corps visibles, appuis larges. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Refroidir ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** arrêt de l’arme, inertie des accessoires puis garde. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Refroidissement ou pause tactique interrompable ; aucun soin gratuit.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Vulcan Overheat — Remake

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Rafale Vulcan — Remake / Canon Vulcan — Remake.

Plan 1 : VULCAN RAVEN — TWIN SNAKES sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Rafale Vulcan — Remake / Canon Vulcan — Remake ». Plan 2 : présenter l’arme effectivement associée à « Rafale Vulcan — Remake / Canon Vulcan — Remake », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : arrêt de l’arme, inertie des accessoires puis garde, pose de signature face à l’adversaire.

##### Raven’s Cannon — Remake

Famille `ballistic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Rafale Vulcan — Remake / Crosse massive — Remake.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Rafale Vulcan — Remake / Crosse massive — Remake » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Rafale Vulcan — Remake / Crosse massive — Remake », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : arrêt de l’arme, inertie des accessoires puis garde, arrêt du dispositif et retour au cadre d’ensemble.

##### Frozen Warehouse — Remake

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Rafale Vulcan — Remake / Rafale rasante — Remake.

Plan 1 : approche jusqu’à la distance réelle de « Rafale Vulcan — Remake / Rafale rasante — Remake », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Rafale Vulcan — Remake / Rafale rasante — Remake », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : arrêt de l’arme, inertie des accessoires puis garde, prise de distance et maintien final.

##### Spirit Returns — Remake

Famille `ballistic`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Rafale Vulcan — Remake / Brace du tireur — Remake.

Plan 1 : après une observation ou un repli, VULCAN RAVEN — TWIN SNAKES reprend l’initiative par « Rafale Vulcan — Remake / Brace du tireur — Remake ». Plan 2 : présenter l’arme effectivement associée à « Rafale Vulcan — Remake / Brace du tireur — Remake », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : arrêt de l’arme, inertie des accessoires puis garde, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Final released GameCube torso/head/weapon retained; selected upperbody views do not certify the full lower-leg or boot texture, which is conservatively authored.
- Sixteen heavy human firing/defensive poses per direction are authored adaptation; no original animation or ballistic certification.
- Gun anatomicalright, ammunitionfeed/backpack native construction adapted in independent facings; tiny rotating barrel geometry not pixel certified.
- Actual sustainedaim physicalpose6 bothfacings, native freeleft reachingpose8 used for CQC to avoid firearm-aim keypose. LEFTv1 preserved but not selected because no horizontally aligned sustainedaim; LEFTv2 supplies genuine independently drawn aim6.
- [Three final-model native640x452 whole uploaded game frames05370/05385/05405 physically viewed: torso markings, bald head, ammunition backpack and close multibarrel minigun. Hardware/emulator source not independently certified.](https://archive.org/download/Gamecube_Longplay_Metal_Gear_Solid_The_Twin_Snakes_a/Gamecube_Longplay_Metal_Gear_Solid_The_Twin_Snakes_a_Part_2.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## roster51__decoy_tts

### DECOY OCTOPUS — TWIN SNAKES — THE TWIN SNAKES

**Rôle :** Imitation et leurres, sans télékinésie. **Profil :** `decoy`.

**Base présente dans le code :** Version remake de Decoy Octopus ; leurres et scans sont une simulation de Versus.

**Incarnation à conserver :** Official true-body Shinkawa concept reprinted in the Twin Snakes guide; no separately attested final GameCube own-body model.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** DECOY OCTOPUS — TWIN SNAKES : apparence réelle et dispositif de leurre séparés. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** mouvement du corps visible avant/après le leurre. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Imitation et leurres, sans télékinésie » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder apparence réelle et dispositif de leurre séparés.
- **jump_land :** DECOY OCTOPUS — TWIN SNAKES : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. mouvement du corps visible avant/après le leurre. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de DECOY OCTOPUS — TWIN SNAKES. Terminer par désactivation du leurre sans changer l’incarnation du corps. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « THE TWIN SNAKES », présentation de Official true-body Shinkawa concept reprinted in the Twin Snakes guide; no separately attested final GameCube own-body model., puis apparence réelle et dispositif de leurre séparés. Geste court lié à « Pistolet dissimulé — Remake » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, désactivation du leurre sans changer l’incarnation du corps ; DECOY OCTOPUS — TWIN SNAKES vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à THE TWIN SNAKES.
- **round_loss :** Proposition CQC : DECOY OCTOPUS — TWIN SNAKES réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Masque tombé — Remake », revenir par désactivation du leurre sans changer l’incarnation du corps, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DECOY OCTOPUS — TWIN SNAKES, préparer « Jab » ; apparence réelle et dispositif de leurre séparés. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** désactivation du leurre sans changer l’incarnation du corps.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DECOY OCTOPUS — TWIN SNAKES, préparer « Frappe engagée » ; apparence réelle et dispositif de leurre séparés. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** désactivation du leurre sans changer l’incarnation du corps.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DECOY OCTOPUS — TWIN SNAKES, préparer « Balayage » ; apparence réelle et dispositif de leurre séparés. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** désactivation du leurre sans changer l’incarnation du corps.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DECOY OCTOPUS — TWIN SNAKES, préparer « Projection » ; apparence réelle et dispositif de leurre séparés. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** désactivation du leurre sans changer l’incarnation du corps. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Pistolet dissimulé — Remake

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DECOY OCTOPUS — TWIN SNAKES, préparer « Pistolet dissimulé — Remake » ; apparence réelle et dispositif de leurre séparés. Montrer la prise et la visée de l’arme décrite par « Pistolet dissimulé — Remake » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** désactivation du leurre sans changer l’incarnation du corps. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Leurre d’identité — Remake

**Existant :** `trap` / `decoy` ; 34/1/34 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DECOY OCTOPUS — TWIN SNAKES, préparer « Leurre d’identité — Remake » ; apparence réelle et dispositif de leurre séparés. Prendre le dispositif, s’abaisser vers le support et indiquer le lieu de pose avant activation.

**Action.** Poser « Leurre d’identité — Remake » au point réel de main/outil, armer puis retirer le membre. Le dispositif possède ensuite son propre sprite, ses états attente/armement/déclenchement/destruction et sa collision.

**Retour.** désactivation du leurre sans changer l’incarnation du corps. Se dégager de l’objet sans le téléporter ; l’interruption avant armement a sa propre sortie.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Marionnette ou drone visible et destructible ; deux maximum.

##### specialForward — Observer le masque — Remake

**Existant :** `mark` / `recon` ; 26/1/30 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DECOY OCTOPUS — TWIN SNAKES, préparer « Observer le masque — Remake » ; apparence réelle et dispositif de leurre séparés. Orienter regard, optique ou terminal vers la cible observée, sans consulter une action future.

**Action.** Pour « Observer le masque — Remake », déclencher lecture/repérage avec un petit geste ou changement d’optique et un indicateur séparé. Le corps doit rester visible et vulnérable selon les données de combat.

**Retour.** désactivation du leurre sans changer l’incarnation du corps. Couper le signal ou abaisser l’outil ; retour vers l’adversaire sans nouvelle arme inventée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Portée limitée ; le marquage ne vise ni à travers toute l’arène ni automatiquement.

##### specialBack — Mimétisme — Remake

**Existant :** `buff` / `stealth` ; 19/1/27 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DECOY OCTOPUS — TWIN SNAKES, préparer « Mimétisme — Remake » ; apparence réelle et dispositif de leurre séparés. Montrer la préparation corporelle ou mécanique de « Mimétisme — Remake ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** désactivation du leurre sans changer l’incarnation du corps. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Silhouette translucide, collision intacte ; une attaque ou un impact brise le camouflage.

##### super — Masque tombé — Remake

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DECOY OCTOPUS — TWIN SNAKES, préparer « Masque tombé — Remake » ; apparence réelle et dispositif de leurre séparés. Montrer la prise et la visée de l’arme décrite par « Masque tombé — Remake » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 4 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** désactivation du leurre sans changer l’incarnation du corps. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 4 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DECOY OCTOPUS — TWIN SNAKES, préparer « Recharger » ; apparence réelle et dispositif de leurre séparés. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** désactivation du leurre sans changer l’incarnation du corps. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Masque tombé — Final — Remake

Famille `ballistic`, ton `simulation` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Masque tombé — Remake / Pistolet dissimulé — Remake.

Plan 1 : DECOY OCTOPUS — TWIN SNAKES sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Masque tombé — Remake / Pistolet dissimulé — Remake ». Plan 2 : présenter l’arme effectivement associée à « Masque tombé — Remake / Pistolet dissimulé — Remake », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : désactivation du leurre sans changer l’incarnation du corps, pose de signature face à l’adversaire. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Pistolet dissimulé / Leurre d’identité — Remake

Famille `ballistic`, ton `simulation` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Masque tombé — Remake / Leurre d’identité — Remake.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Masque tombé — Remake / Leurre d’identité — Remake » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Masque tombé — Remake / Leurre d’identité — Remake », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : désactivation du leurre sans changer l’incarnation du corps, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Observer le masque — Point final — Remake

Famille `psychic`, ton `simulation` ; 256 ticks CQC ; phases actuelles : lift → orbit → crush → drop. Appuis déclarés : Masque tombé — Remake / Observer le masque — Remake.

Plan 1 : approche jusqu’à la distance réelle de « Masque tombé — Remake / Observer le masque — Remake », arme et main libre identifiées. Plan 2 : montrer la source corporelle ou matérielle de « Masque tombé — Remake / Observer le masque — Remake ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : désactivation du leurre sans changer l’incarnation du corps, prise de distance et maintien final. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Simulation prudente — Mission close — Remake

Famille `capture`, ton `simulation` ; 274 ticks CQC ; phases actuelles : stun → disarm → restrain → extract. Appuis déclarés : Masque tombé — Remake / Mimétisme — Remake.

Plan 1 : après une observation ou un repli, DECOY OCTOPUS — TWIN SNAKES reprend l’initiative par « Masque tombé — Remake / Mimétisme — Remake ». Plan 2 : contact de saisie ou neutralisation lié à « Masque tombé — Remake / Mimétisme — Remake », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : désactivation du leurre sans changer l’incarnation du corps, rangement/pose finale différente des trois autres. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against its identified reference and only its visible extent. This is a 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Identity, costume, equipment and anatomical-side checks establish consistency with the source-backed visible facts and the explicitly qualified reconstructed parts; they do not certify unseen anatomy or clothing as canonical. Gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Physically viewed original reference establishes only visible identity/costume/accessories; it is not certified whole-body final-game 3D geometry or texture.
- Back surfaces and unseen pose angles are adapted from visible source design, without a pixel-perfect claim.
- Sixteen action poses per direction are authored gameplay adaptation; no canonical technique or motion-capture claim.
- Occluded back surfaces, lower body portions outside shot and custom character identity are not established.
- Source establishes this game/incarnation only; no transfer of MGO3 armour to MGO1/MGO2 or Arcade.
- True Decoy appearance is official concept illustration; not a final in-game model of this undisguised body. The released MGS1 impersonation uses Donald Anderson disguise, a separate canonical incarnation.
- Painterly red accent strokes do not prove wounds or glowing sci-fi effects. Back and hidden seam details remain adapted.
- The reused depiction is officialconcept art publishedin theTwinSnakes guide; it is not independently attested as a finalownbody GameCubemodel.
- Native sixteenposes/facing are faithful authored2.5D adaptation of sameconcept, source limitations inherited, no extraimages or duplicatedphysicalpose count.
- DonaldAnderson corpse/disguise not used as Decoy ownbody
- No fictional distinctreleased GameCube ownform invented
- [Original official Shinkawa MGS1 illustration mirrored unscaled at CU; visible extent only.](https://www.creativeuncut.com/gallery-02/mgs-decoy-octopus.html) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## roster51__johnny_tts

### JOHNNY SASAKI — TWIN SNAKES — THE TWIN SNAKES

**Rôle :** Pistolet et défense proche. **Profil :** `pistol`.

**Base présente dans le code :** Version remake de Johnny : fusil, grenade fumigène et repli de garde.

**Incarnation à conserver :** Johnny Sasaki, olive cell-guard BDU/black soft head-cover, canonical TTS FAMAS

**État vérifié :** métadonnées natives avec limites. 28 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `throw` = throw, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** JOHNNY SASAKI — TWIN SNAKES : main forte et main de soutien identifiées sur le pistolet, coudes contenus. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas prudents sans inverser l’étui ni la main forte. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Pistolet et défense proche » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder main forte et main de soutien identifiées sur le pistolet, coudes contenus.
- **jump_land :** JOHNNY SASAKI — TWIN SNAKES : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas prudents sans inverser l’étui ni la main forte. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de JOHNNY SASAKI — TWIN SNAKES. Terminer par recul du poignet puis stabilisation du canon. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « THE TWIN SNAKES », présentation de Johnny Sasaki, olive cell-guard BDU/black soft head-cover, canonical TTS FAMAS, puis main forte et main de soutien identifiées sur le pistolet, coudes contenus. Geste court lié à « Arme de garde — Remake » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, recul du poignet puis stabilisation du canon ; JOHNNY SASAKI — TWIN SNAKES vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à THE TWIN SNAKES.
- **round_loss :** Proposition CQC : JOHNNY SASAKI — TWIN SNAKES réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Alarme de cellule — Remake », revenir par recul du poignet puis stabilisation du canon, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JOHNNY SASAKI — TWIN SNAKES, préparer « Jab » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JOHNNY SASAKI — TWIN SNAKES, préparer « Frappe engagée » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JOHNNY SASAKI — TWIN SNAKES, préparer « Balayage » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JOHNNY SASAKI — TWIN SNAKES, préparer « Projection » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recul du poignet puis stabilisation du canon. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Arme de garde — Remake

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JOHNNY SASAKI — TWIN SNAKES, préparer « Arme de garde — Remake » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Montrer la prise et la visée de l’arme décrite par « Arme de garde — Remake » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Grenade de garde — Remake

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JOHNNY SASAKI — TWIN SNAKES, préparer « Grenade de garde — Remake » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Prélever l’objet correspondant à « Grenade de garde — Remake », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Crosse maladroite — Remake

**Existant :** `melee` / `grapple` ; 10/3/32 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JOHNNY SASAKI — TWIN SNAKES, préparer « Crosse maladroite — Remake » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recul du poignet puis stabilisation du canon. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Hors de portée ou saut ; ne saisir ni cible aérienne ni cible sous protection post-projection.

##### specialBack — Repli de Johnny — Remake

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JOHNNY SASAKI — TWIN SNAKES, préparer « Repli de Johnny — Remake » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer l’appui qui produit le déplacement ; pas prudents sans inverser l’étui ni la main forte.

**Action.** Exécuter « Repli de Johnny — Remake » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** recul du poignet puis stabilisation du canon. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Alarme de cellule — Remake

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JOHNNY SASAKI — TWIN SNAKES, préparer « Alarme de cellule — Remake » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Montrer la prise et la visée de l’arme décrite par « Alarme de cellule — Remake » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JOHNNY SASAKI — TWIN SNAKES, préparer « Recharger » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** recul du poignet puis stabilisation du canon. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Alarme de cellule — Final — Remake

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Alarme de cellule — Remake / Arme de garde — Remake.

Plan 1 : JOHNNY SASAKI — TWIN SNAKES sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Alarme de cellule — Remake / Arme de garde — Remake ». Plan 2 : présenter l’arme effectivement associée à « Alarme de cellule — Remake / Arme de garde — Remake », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : recul du poignet puis stabilisation du canon, pose de signature face à l’adversaire.

##### Arme de garde / Grenade de garde — Remake

Famille `ballistic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Alarme de cellule — Remake / Grenade de garde — Remake.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Alarme de cellule — Remake / Grenade de garde — Remake » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Alarme de cellule — Remake / Grenade de garde — Remake », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : recul du poignet puis stabilisation du canon, arrêt du dispositif et retour au cadre d’ensemble.

##### Crosse maladroite — Point final — Remake

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Alarme de cellule — Remake / Crosse maladroite — Remake.

Plan 1 : approche jusqu’à la distance réelle de « Alarme de cellule — Remake / Crosse maladroite — Remake », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Alarme de cellule — Remake / Crosse maladroite — Remake », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : recul du poignet puis stabilisation du canon, prise de distance et maintien final.

##### Lecture rapprochée — Mission close — Remake

Famille `ballistic`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Alarme de cellule — Remake / Repli de Johnny — Remake.

Plan 1 : après une observation ou un repli, JOHNNY SASAKI — TWIN SNAKES reprend l’initiative par « Alarme de cellule — Remake / Repli de Johnny — Remake ». Plan 2 : présenter l’arme effectivement associée à « Alarme de cellule — Remake / Repli de Johnny — Remake », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : recul du poignet puis stabilisation du canon, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Native guard face is tiny and mostly covered; exact facial mesh and minute cloth badges not certified.
- Cell guard has a dark long firearm but original pixels do not independently identify the full weapon model; equipping documented in-universe FAMAS is a qualified canonical loadout adaptation, not exact per-frame firearm certification.
- Native longplay upload source hardware/emulation and modification state are not independently certified.
- Thirty-two independently drawn gameplay poses, sixteen per facing, are adaptations rather than original animation frames. Absolute 1:1 certification is false; no unavailable source detail is claimed verified.
- The actual TTS cell guard whole frames280/640 attest olive BDU, dark soft face cover and equipment silhouette; small or dark source detail cannot certify facial texture, kneepad construction or cloth seams 1:1. Official whole TTS guide page10 complements the canonical FAMAS bullpup weapon; its complete geometry is not independently legible in the small cell-guard frame. Both native facings independently draw sixteen complete poses and preserve full boots; source-specific active horizontal gun pose6 and free-hand reach pose8 are registered separately.
- [Original whole uploaded640x452 frames280/640 of the actual cell guard, physically reviewed; official BradyGames TTS complete native-DCT page10 provides in-universe FAMAS silhouette. No raster cropping, resize or repaint.](https://archive.org/download/Gamecube_Longplay_Metal_Gear_Solid_The_Twin_Snakes_a/Gamecube_Longplay_Metal_Gear_Solid_The_Twin_Snakes_a_Part_2.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).
