# Animations — COMPLÉMENTS 0.44

**10 acteurs du registre courant.** Les titres d’actions et paramètres sont observés ; les descriptions sont des propositions CQC à produire et valider. Un groupe de frames existant ne certifie pas l’ensemble du mouvement ou sa fidélité originale.

[Index des fiches](README.md) · [Contrat commun](../04_ANIMATIONS_SPRITES.md)

## Sommaire

- [XOF TROOPER](#completion44__xof_trooper_44) — GROUND ZEROES
- [MSF SOLDIER](#completion44__msf_soldier_44) — PEACE WALKER
- [DIAMOND DOGS SCOUT](#completion44__diamond_dogs_scout_44) — MGSV
- [PARASITE UNIT — CAMO](#completion44__parasite_camo_44) — MGSV
- [ARMORED WANDERER](#completion44__armored_wanderer_44) — SURVIVE
- [WANDERER BOMBER](#completion44__wanderer_bomber_44) — SURVIVE
- [ZANZIBAR MERCENARY](#completion44__zanzibar_mercenary_44) — METAL GEAR 2
- [BLACK CHAMBER SOLDIER](#completion44__black_chamber_soldier_44) — GHOST BABEL
- [SAINTLOGIC GUARD](#completion44__saintlogic_guard_44) — AC!D 2
- [FOX TROOPER](#completion44__fox_trooper_mpo_44) — PORTABLE OPS

## completion44__xof_trooper_44

### XOF TROOPER — GROUND ZEROES

**Rôle :** Tir, grenades et distance. **Profil :** `soldier`.

**Base présente dans le code :** Opérateur XOF de Ground Zeroes (1975), avant le retrait de l’insigne FOX, équipé d’un Sz.-336 ; profil d’unité.

**Incarnation à conserver :** Original1975 GZ XOF CVCwhitehelmetBLUEband/goggles/clothbalaclava+Sz336 beforepatchremoval, not1984TPPhospital

**État vérifié :** partially-attested-original-game-presentation-adaptation. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `tuxedo`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** XOF TROOPER : appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas courts, crosse/équipement conservés près du torse. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Tir, grenades et distance » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder appui militaire stable, arme maintenue dans l’axe et regard vers la menace.
- **jump_land :** XOF TROOPER : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas courts, crosse/équipement conservés près du torse. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de XOF TROOPER. Terminer par retour en couverture de l’arme après le coup. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « GROUND ZEROES », présentation de Original1975 GZ XOF CVCwhitehelmetBLUEband/goggles/clothbalaclava+Sz336 beforepatchremoval, not1984TPPhospital, puis appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Geste court lié à « Tir Sz.-336 » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, retour en couverture de l’arme après le coup ; XOF TROOPER vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à GROUND ZEROES.
- **round_loss :** Proposition CQC : XOF TROOPER réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Assaut Camp Omega », revenir par retour en couverture de l’arme après le coup, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de XOF TROOPER, préparer « Jab » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de XOF TROOPER, préparer « Frappe engagée » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de XOF TROOPER, préparer « Balayage » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de XOF TROOPER, préparer « Projection » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** retour en couverture de l’arme après le coup. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Tir Sz.-336

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de XOF TROOPER, préparer « Tir Sz.-336 » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Tir Sz.-336 » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Grenade de rupture

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de XOF TROOPER, préparer « Grenade de rupture » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Prélever l’objet correspondant à « Grenade de rupture », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Entrée noire

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de XOF TROOPER, préparer « Entrée noire » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Entrée noire » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Repli XOF

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de XOF TROOPER, préparer « Repli XOF » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer l’appui qui produit le déplacement ; pas courts, crosse/équipement conservés près du torse.

**Action.** Exécuter « Repli XOF » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** retour en couverture de l’arme après le coup. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Assaut Camp Omega

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de XOF TROOPER, préparer « Assaut Camp Omega » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Assaut Camp Omega » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de XOF TROOPER, préparer « Recharger » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** retour en couverture de l’arme après le coup. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Assaut Camp Omega — Final

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Assaut Camp Omega / Tir Sz.-336.

Plan 1 : XOF TROOPER sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Assaut Camp Omega / Tir Sz.-336 ». Plan 2 : présenter l’arme effectivement associée à « Assaut Camp Omega / Tir Sz.-336 », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : retour en couverture de l’arme après le coup, pose de signature face à l’adversaire.

##### Tir Sz.-336 / Grenade de rupture

Famille `ballistic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Assaut Camp Omega / Grenade de rupture.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Assaut Camp Omega / Grenade de rupture » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Assaut Camp Omega / Grenade de rupture », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : retour en couverture de l’arme après le coup, arrêt du dispositif et retour au cadre d’ensemble.

##### Entrée noire — Point final

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Assaut Camp Omega / Entrée noire.

Plan 1 : approche jusqu’à la distance réelle de « Assaut Camp Omega / Entrée noire », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Assaut Camp Omega / Entrée noire », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : retour en couverture de l’arme après le coup, prise de distance et maintien final.

##### Sang-froid — Mission close

Famille `ballistic`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Assaut Camp Omega / Projection.

Plan 1 : après une observation ou un repli, XOF TROOPER reprend l’initiative par « Assaut Camp Omega / Projection ». Plan 2 : présenter l’arme effectivement associée à « Assaut Camp Omega / Projection », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : retour en couverture de l’arme après le coup, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Identity/outfit/equipment/anatomical sides compared to the source extent explicitly recorded in review.sources.scope and identity-specific limits; unknown occluded details and game motions are authored adaptations. Renderer checks certify internal adaptation consistency, not an entire unseen canonical body.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Wholecanonicalbody/turnaround NOTattested; sourcevisiblehead/torsothroughthighs, bootshape/darkolivecolor andunseenlowerseams arequalifiedpresentationreconstruction.
- The fullofficialMGSVgas-mask/yellowvisor concept wasexcludedfromGZcanonicalhead/bodyclaim becauseTPPhospital incarnation; nohelmetgreenband/respiratorhoses copied.
- ActualheldgunSz336SMG replacesonlyvisualgenericrifle assumption. ExistingUID/moves/hitboxes/timing andlegacyprojectilesunchanged.
- PS4native releasedGZ exporterport720, not claimed unmodifiedPS3/PSPfootage.
- R4 removes wrong-right-arm yellowbadges;LEFTbadgevisibleonlyonleftorientation. Sz336 gripmag geometry revised from toolMP9like firstattempt, sixteenposesindependentlyphysicallyreviewed; minute gunwire details remain painted approximation.
- [MultipleunmodifiedoriginalPS4GZ intro full1280x720 captures physicallyseen (585s/600s/590s) corroboratewhiteCVChelmetBLUEband/numbersA78, headset/blackgoggles/clothmask, graycoveralls/darkharness/pouchesandLEFTFOXshoulderpatch before removal, plusactualSZ336 wirestockSMG. Nativeintroframescut oroccludeboots/lowerlegseams, thoseparts reconstructedclosestandexplicitlyunattested.](https://archive.org/download/PS4_Longplay_001_Metal_Gear_Solid_V_Ground_Zeroes/PS4_Longplay_001_Metal_Gear_Solid_V_Ground_Zeroes_part1.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## completion44__msf_soldier_44

### MSF SOLDIER — PEACE WALKER

**Rôle :** Infiltration et armes limitées. **Profil :** `infiltrator`.

**Base présente dans le code :** Troupe MSF : CQC enseigné et arme de service ; pas toutes les prouesses de Big Boss.

**Incarnation à conserver :** Original1974 PSP MSF anonymous male combat-fatigues representative, canon MK22 chosenloadout

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, super ; `throw` = throw, specialForward.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** MSF SOLDIER : garde compacte de l’infiltrateur, arme et étuis proches du corps. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** déroulé de pied discret, bassin bas, freinage avant visée. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Infiltration et armes limitées » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder garde compacte de l’infiltrateur, arme et étuis proches du corps.
- **jump_land :** MSF SOLDIER : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. déroulé de pied discret, bassin bas, freinage avant visée. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de MSF SOLDIER. Terminer par replacement rapide de la main libre et contrôle du champ. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « PEACE WALKER », présentation de Original1974 PSP MSF anonymous male combat-fatigues representative, canon MK22 chosenloadout, puis garde compacte de l’infiltrateur, arme et étuis proches du corps. Geste court lié à « MK22 de section » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, replacement rapide de la main libre et contrôle du champ ; MSF SOLDIER vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à PEACE WALKER.
- **round_loss :** Proposition CQC : MSF SOLDIER réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Intervention de section », revenir par replacement rapide de la main libre et contrôle du champ, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MSF SOLDIER, préparer « Jab » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** replacement rapide de la main libre et contrôle du champ.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MSF SOLDIER, préparer « Frappe engagée » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** replacement rapide de la main libre et contrôle du champ.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MSF SOLDIER, préparer « Balayage » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** replacement rapide de la main libre et contrôle du champ.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MSF SOLDIER, préparer « Projection » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** replacement rapide de la main libre et contrôle du champ. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — MK22 de section

**Existant :** `projectile` / `tranq` ; 19/1/29 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MSF SOLDIER, préparer « MK22 de section » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Montrer la prise et la visée de l’arme décrite par « MK22 de section » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** replacement rapide de la main libre et contrôle du champ. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Se baisser, bloquer ; la somnolence décroît et ne provoque pas de K.O. instantané.

##### specialDown — Grenade MSF

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MSF SOLDIER, préparer « Grenade MSF » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Prélever l’objet correspondant à « Grenade MSF », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** replacement rapide de la main libre et contrôle du champ. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Saisie d’entraînement

**Existant :** `melee` / `grapple` ; 10/3/32 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MSF SOLDIER, préparer « Saisie d’entraînement » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** replacement rapide de la main libre et contrôle du champ. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Hors de portée ou saut ; ne saisir ni cible aérienne ni cible sous protection post-projection.

##### specialBack — Repli MSF

**Existant :** `buff` / `stealth` ; 19/1/27 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MSF SOLDIER, préparer « Repli MSF » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Montrer la préparation corporelle ou mécanique de « Repli MSF ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** replacement rapide de la main libre et contrôle du champ. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Silhouette translucide, collision intacte ; une attaque ou un impact brise le camouflage.

##### super — Intervention de section

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MSF SOLDIER, préparer « Intervention de section » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Intervention de section », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** replacement rapide de la main libre et contrôle du champ.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MSF SOLDIER, préparer « Recharger » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** replacement rapide de la main libre et contrôle du champ. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Intervention de section — Final

Famille `cqc`, ton `stylized` ; 220 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Intervention de section / MK22 de section.

Plan 1 : MSF SOLDIER sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Intervention de section / MK22 de section ». Plan 2 : contact de saisie ou neutralisation lié à « Intervention de section / MK22 de section », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : replacement rapide de la main libre et contrôle du champ, pose de signature face à l’adversaire.

##### MK22 de section / Grenade MSF

Famille `capture`, ton `stylized` ; 238 ticks CQC ; phases actuelles : stun → disarm → restrain → extract. Appuis déclarés : Intervention de section / Grenade MSF.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Intervention de section / Grenade MSF » ; l’espace disponible doit être lisible. Plan 2 : contact de saisie ou neutralisation lié à « Intervention de section / Grenade MSF », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : replacement rapide de la main libre et contrôle du champ, arrêt du dispositif et retour au cadre d’ensemble.

##### Saisie d’entraînement — Point final

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Intervention de section / Saisie d’entraînement.

Plan 1 : approche jusqu’à la distance réelle de « Intervention de section / Saisie d’entraînement », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Intervention de section / Saisie d’entraînement », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : replacement rapide de la main libre et contrôle du champ, prise de distance et maintien final.

##### Lecture rapprochée — Mission close

Famille `cqc`, ton `stylized` ; 274 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Intervention de section / Projection.

Plan 1 : après une observation ou un repli, MSF SOLDIER reprend l’initiative par « Intervention de section / Projection ». Plan 2 : contact de saisie ou neutralisation lié à « Intervention de section / Projection », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : replacement rapide de la main libre et contrôle du champ, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Identity/outfit/equipment/anatomical sides compared to the source extent explicitly recorded in review.sources.scope and identity-specific limits; unknown occluded details and game motions are authored adaptations. Renderer checks certify internal adaptation consistency, not an entire unseen canonical body.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Specific tutorial soldier unarmed in source; chosenMK22 combatloadout is explicitly authored combination with canonicalequippablePW weapon, not proved default gun of that screenshot recruit.
- The source rain/teal lighting limits exactneutral hue/colorjudgment; unseen opposite garment seams, holster loadout andsmallbadgepixelshape reconstructedclosest 2.5D. Profilemask hidesfar eyehole, not completefrontturnaround proof.
- Original PSP fatigueappearance chosen, no GZ/MGSV helicoptercrew/inventedrigidarmorpads. Left opposite shoulderinsignia visibility partlyoccluded andnotpixel-exactfullturnaround certified.
- [Actual whole native PSP tutorial rainbeach physicallyviewed, masked fatigues MSF men performingCQC heads+bothboots shown; dullgrayolive fatigues, canvaswebbing/utilitypack, blackmask/fullgloves/boots andyellowMSFshoulderinsignia. ActualPW finalMK22R&Dmodel viewed separately. R2/L2correct overlybeige original and invented elbowarmor, now grayolive plainclosedfullsleeves. Both16nativewhole poses manuallyviewed correctdirections/completeboot soles.](https://static.wikia.nocookie.net/metalgear/images/d/da/Metal-gear-solid-peace-walker-playstation-portable-psp-005.jpg/revision/latest) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## completion44__diamond_dogs_scout_44

### DIAMOND DOGS SCOUT — MGSV

**Rôle :** Longue portée et exposition. **Profil :** `sniper`.

**Base présente dans le code :** Preset éclaireur DD : arme longue et marquage, sans pouvoir de Quiet.

**Incarnation à conserver :** Original1984 generic maleDD combat-fatigues representative, authoredscout specialisation/canon AMMRS71 playableloadout

**État vérifié :** original-game-fullbody-reference-visual-adaptation. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `shoot` = special, specialForward ; `deploy` = specialDown, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, super, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `retro-msx`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** DIAMOND DOGS SCOUT : carabine épaulée avec contact joue/crosse et œil cohérent. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** déplacement qui sécurise le long canon et stoppe avant la visée. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Longue portée et exposition » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder carabine épaulée avec contact joue/crosse et œil cohérent.
- **jump_land :** DIAMOND DOGS SCOUT : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. déplacement qui sécurise le long canon et stoppe avant la visée. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de DIAMOND DOGS SCOUT. Terminer par recul, éventuel réarmement propre au modèle, réacquisition de cible. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGSV », présentation de Original1984 generic maleDD combat-fatigues representative, authoredscout specialisation/canon AMMRS71 playableloadout, puis carabine épaulée avec contact joue/crosse et œil cohérent. Geste court lié à « Fusil d’éclaireur » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, recul, éventuel réarmement propre au modèle, réacquisition de cible ; DIAMOND DOGS SCOUT vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGSV.
- **round_loss :** Proposition CQC : DIAMOND DOGS SCOUT réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Tir d’appui », revenir par recul, éventuel réarmement propre au modèle, réacquisition de cible, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DIAMOND DOGS SCOUT, préparer « Jab » ; carabine épaulée avec contact joue/crosse et œil cohérent. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DIAMOND DOGS SCOUT, préparer « Frappe engagée » ; carabine épaulée avec contact joue/crosse et œil cohérent. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DIAMOND DOGS SCOUT, préparer « Balayage » ; carabine épaulée avec contact joue/crosse et œil cohérent. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DIAMOND DOGS SCOUT, préparer « Projection » ; carabine épaulée avec contact joue/crosse et œil cohérent. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Fusil d’éclaireur

**Existant :** `projectile` / `precision` ; 46/1/47 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DIAMOND DOGS SCOUT, préparer « Fusil d’éclaireur » ; carabine épaulée avec contact joue/crosse et œil cohérent. Montrer la prise et la visée de l’arme décrite par « Fusil d’éclaireur » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Laser et armement visibles ; accroupissement ou approche pendant 46 images avant le tir.

##### specialDown — Pas d’éclaireur

**Existant :** `mobility` / `movement` ; 7/18/25 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DIAMOND DOGS SCOUT, préparer « Pas d’éclaireur » ; carabine épaulée avec contact joue/crosse et œil cohérent. Préparer l’appui qui produit le déplacement ; déplacement qui sécurise le long canon et stoppe avant la visée.

**Action.** Exécuter « Pas d’éclaireur » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 4 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : La silhouette reste touchable ; la sortie est punissable.

##### specialForward — Marquage DD

**Existant :** `mark` / `recon` ; 26/1/30 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DIAMOND DOGS SCOUT, préparer « Marquage DD » ; carabine épaulée avec contact joue/crosse et œil cohérent. Orienter regard, optique ou terminal vers la cible observée, sans consulter une action future.

**Action.** Pour « Marquage DD », déclencher lecture/repérage avec un petit geste ou changement d’optique et un indicateur séparé. Le corps doit rester visible et vulnérable selon les données de combat.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible. Couper le signal ou abaisser l’outil ; retour vers l’adversaire sans nouvelle arme inventée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Portée limitée ; le marquage ne vise ni à travers toute l’arène ni automatiquement.

##### specialBack — Repli d’observateur

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DIAMOND DOGS SCOUT, préparer « Repli d’observateur » ; carabine épaulée avec contact joue/crosse et œil cohérent. Préparer l’appui qui produit le déplacement ; déplacement qui sécurise le long canon et stoppe avant la visée.

**Action.** Exécuter « Repli d’observateur » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Tir d’appui

**Existant :** `projectile` / `rail` ; 55/1/50 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DIAMOND DOGS SCOUT, préparer « Tir d’appui » ; carabine épaulée avec contact joue/crosse et œil cohérent. Montrer la prise et la visée de l’arme décrite par « Tir d’appui » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Préparation longue et trait de visée ; accroupissement ou esquive latérale.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DIAMOND DOGS SCOUT, préparer « Recharger » ; carabine épaulée avec contact joue/crosse et œil cohérent. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Tir d’appui — Final

Famille `sniper`, ton `stylized` ; 220 ticks CQC ; phases actuelles : mark → steady → shot → fade. Appuis déclarés : Tir d’appui / Fusil d’éclaireur.

Plan 1 : DIAMOND DOGS SCOUT sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Tir d’appui / Fusil d’éclaireur ». Plan 2 : présenter l’arme effectivement associée à « Tir d’appui / Fusil d’éclaireur », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : recul, éventuel réarmement propre au modèle, réacquisition de cible, pose de signature face à l’adversaire.

##### Fusil d’éclaireur / Pas d’éclaireur

Famille `sniper`, ton `stylized` ; 238 ticks CQC ; phases actuelles : mark → steady → shot → fade. Appuis déclarés : Tir d’appui / Pas d’éclaireur.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Tir d’appui / Pas d’éclaireur » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Tir d’appui / Pas d’éclaireur », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : recul, éventuel réarmement propre au modèle, réacquisition de cible, arrêt du dispositif et retour au cadre d’ensemble.

##### Marquage DD — Point final

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Tir d’appui / Marquage DD.

Plan 1 : approche jusqu’à la distance réelle de « Tir d’appui / Marquage DD », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Tir d’appui / Marquage DD », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : recul, éventuel réarmement propre au modèle, réacquisition de cible, prise de distance et maintien final.

##### Immobilité utile — Mission close

Famille `sniper`, ton `stylized` ; 274 ticks CQC ; phases actuelles : mark → steady → shot → fade. Appuis déclarés : Tir d’appui / Projection.

Plan 1 : après une observation ou un repli, DIAMOND DOGS SCOUT reprend l’initiative par « Tir d’appui / Projection ». Plan 2 : présenter l’arme effectivement associée à « Tir d’appui / Projection », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : recul, éventuel réarmement propre au modèle, réacquisition de cible, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Identity/outfit/equipment/anatomical sides compared to the source extent explicitly recorded in review.sources.scope and identity-specific limits; unknown occluded details and game motions are authored adaptations. Renderer checks certify internal adaptation consistency, not an entire unseen canonical body.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Scout role is authoredCQC specialization, notattested separateuniformclass orMGO3scout. Exactanonidentitynotassignednewcanonperson.
- OriginalMBscreenshottroopheldMRS4; equippedAMMRS71 chosenfromcanonicalTPP combatloadoutavailable toDDplayabletroops, explicitlyauthored representativecombination.
- Rear/pouchseams andtinyDDbadgepixelshape occluded/reconstructedclosest; fullbody silhouette/outfit primaryactualreleasedgameseen, notcertpixel-exactfullturnaround.
- [Actual2015PCGamer game screenshot has threeDD MotherBase males wholehead/bothboots, nearLEFTchosen distinctbareface/brownhair/plainbrownfatigues/gloves/blackreinforcementbandsandkneebraces/olivejungleboots. Official staffconcept addsoptionalgear butmaskedhead/armoredhelmet variants excluded; native originalAMMRS71 level1model separatelyphysicallyseen.](https://www.pcgamer.com/the-joy-of-metal-gear-solid-5s-mother-base/) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## completion44__parasite_camo_44

### PARASITE UNIT — CAMO — MGSV

**Rôle :** Brume, mobilité et arme parasite. **Profil :** `parasite`.

**Base présente dans le code :** Preset Skulls de camouflage : énergie limitée et visibilité résiduelle.

**Incarnation à conserver :** Original1984 femaleCamouflageUnit E2 member explicitly representsgenericCamo slot

**État vérifié :** métadonnées natives avec limites. 72 régions source distinctes dans les deux directions ; groupes : idle, walk, guard, crouch, punch, heavy, low, jump, shoot, throw, deploy, recover, hit, ko, attack.

**Réemplois à examiner :** `throw` = throw, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** PARASITE UNIT — CAMO : silhouette et équipement du Skull concerné ; parasite séparé du corps. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** translation/effet propre à ce type, arrivée physiquement posée. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Brume, mobilité et arme parasite » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder silhouette et équipement du Skull concerné ; parasite séparé du corps.
- **jump_land :** PARASITE UNIT — CAMO : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. translation/effet propre à ce type, arrivée physiquement posée. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de PARASITE UNIT — CAMO. Terminer par dissipation de l’effet et rétablissement de la garde. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGSV », présentation de Original1984 femaleCamouflageUnit E2 member explicitly representsgenericCamo slot, puis silhouette et équipement du Skull concerné ; parasite séparé du corps. Geste court lié à « Lame camouflée » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, dissipation de l’effet et rétablissement de la garde ; PARASITE UNIT — CAMO vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGSV.
- **round_loss :** Proposition CQC : PARASITE UNIT — CAMO réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Assaut masqué », revenir par dissipation de l’effet et rétablissement de la garde, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Contact de lame

**Existant :** `melee` / `blade` ; 7/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PARASITE UNIT — CAMO, préparer « Contact de lame » ; silhouette et équipement du Skull concerné ; parasite séparé du corps. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** dissipation de l’effet et rétablissement de la garde. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Coupe engagée

**Existant :** `melee` / `blade` ; 18/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PARASITE UNIT — CAMO, préparer « Coupe engagée » ; silhouette et équipement du Skull concerné ; parasite séparé du corps. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** dissipation de l’effet et rétablissement de la garde. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PARASITE UNIT — CAMO, préparer « Balayage » ; silhouette et équipement du Skull concerné ; parasite séparé du corps. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** dissipation de l’effet et rétablissement de la garde.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PARASITE UNIT — CAMO, préparer « Projection » ; silhouette et équipement du Skull concerné ; parasite séparé du corps. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** dissipation de l’effet et rétablissement de la garde. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Lame camouflée

**Existant :** `melee` / `blade` ; 13/5/24 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PARASITE UNIT — CAMO, préparer « Lame camouflée » ; silhouette et équipement du Skull concerné ; parasite séparé du corps. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** dissipation de l’effet et rétablissement de la garde. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde puis punition ; la lame ne touche qu’une fois par attaque.

##### specialDown — Brume du camouflage

**Existant :** `projectile` / `mist` ; 24/1/32 ticks ; groupe `deploy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PARASITE UNIT — CAMO, préparer « Brume du camouflage » ; silhouette et équipement du Skull concerné ; parasite séparé du corps. Donner à la source de « Brume du camouflage » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet mist de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet.

**Retour.** dissipation de l’effet et rétablissement de la garde. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde puis approche ; ralentissement borné, jamais gel complet.

##### specialForward — Bond parasite

**Existant :** `mobility` / `psychic` ; 23/1/28 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PARASITE UNIT — CAMO, préparer « Bond parasite » ; silhouette et équipement du Skull concerné ; parasite séparé du corps. Préparer l’appui qui produit le déplacement ; translation/effet propre à ce type, arrivée physiquement posée.

**Action.** Exécuter « Bond parasite » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné.

**Retour.** dissipation de l’effet et rétablissement de la garde. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Départ et arrivée indiqués ; pas de téléportation derrière la cible ni hors arène.

##### specialBack — Camouflage Skulls

**Existant :** `buff` / `stealth` ; 19/1/27 ticks ; groupe `walk`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PARASITE UNIT — CAMO, préparer « Camouflage Skulls » ; silhouette et équipement du Skull concerné ; parasite séparé du corps. Montrer la préparation corporelle ou mécanique de « Camouflage Skulls ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** dissipation de l’effet et rétablissement de la garde. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Silhouette translucide, collision intacte ; une attaque ou un impact brise le camouflage.

##### super — Assaut masqué

**Existant :** `melee` / `blade` ; 25/7/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PARASITE UNIT — CAMO, préparer « Assaut masqué » ; silhouette et équipement du Skull concerné ; parasite séparé du corps. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** dissipation de l’effet et rétablissement de la garde. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Stabiliser la réserve

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PARASITE UNIT — CAMO, préparer « Stabiliser la réserve » ; silhouette et équipement du Skull concerné ; parasite séparé du corps. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Stabiliser la réserve ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** dissipation de l’effet et rétablissement de la garde. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Assaut masqué — Final

Famille `blade`, ton `stylized` ; 220 ticks CQC ; phases actuelles : dash → crosscut → freeze → sheath. Appuis déclarés : Assaut masqué / Lame camouflée.

Plan 1 : PARASITE UNIT — CAMO sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Assaut masqué / Lame camouflée ». Plan 2 : armer la lame ou le membre de « Assaut masqué / Lame camouflée » et dégager son arc. Plan 3 : enchaîner des coupes lisibles avec angles distincts ; les impacts et les réactions suivent le fil de lame, sans ajout d’arme d’une autre incarnation. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : dissipation de l’effet et rétablissement de la garde, pose de signature face à l’adversaire.

##### Lame camouflée / Brume du camouflage

Famille `blade`, ton `stylized` ; 238 ticks CQC ; phases actuelles : dash → crosscut → freeze → sheath. Appuis déclarés : Assaut masqué / Brume du camouflage.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Assaut masqué / Brume du camouflage » ; l’espace disponible doit être lisible. Plan 2 : armer la lame ou le membre de « Assaut masqué / Brume du camouflage » et dégager son arc. Plan 3 : enchaîner des coupes lisibles avec angles distincts ; les impacts et les réactions suivent le fil de lame, sans ajout d’arme d’une autre incarnation. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : dissipation de l’effet et rétablissement de la garde, arrêt du dispositif et retour au cadre d’ensemble.

##### Bond parasite — Point final

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Assaut masqué / Bond parasite.

Plan 1 : approche jusqu’à la distance réelle de « Assaut masqué / Bond parasite », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Assaut masqué / Bond parasite », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : dissipation de l’effet et rétablissement de la garde, prise de distance et maintien final.

##### Mobilité — Mission close

Famille `tactical`, ton `stylized` ; 274 ticks CQC ; phases actuelles : mark → flank → confirm → clear. Appuis déclarés : Assaut masqué / Projection.

Plan 1 : après une observation ou un repli, PARASITE UNIT — CAMO reprend l’initiative par « Assaut masqué / Projection ». Plan 2 : matérialiser le geste tactique « Assaut masqué / Projection » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : dissipation de l’effet et rétablissement de la garde, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Original trailer proves female identity and asymmetric head hardware; Steam cutscene captures corroborate torso, back, hips and boots, not direct exported model inspection.
- The frontal rifle is strongly foreshortened. Long barrel/front sight/muzzle and held rifle role are observed; exact weapon name, receiver topology and hidden stock detail remain qualified.
- Poses are original illustrated Versus action staging rather than extracted MGSV animation or canonical timings.
- No male Camo preset, Quiet hairstyle/outfit, interchangeable parasite powers, vanishing missing-body frames or magic aura.
- Source geometric alpha grouping accounts for every alpha>8 pixel. Tiny antialias islands<=3px assigned to nearest actual body; source PNG bytes immutable.
- Canvas contour masks are metadata only, not image pixel edits. Root independently reviews actual runtime crops, phase/hitbox origins and anatomy.
- Generated rifle side details vary modestly across independently authored sheets. Original long rifle role, barrel/front sight and complete gear are supported, exact weapon mesh/receiver/hidden stock1:1 is not certified.
- No baked particles/muzzle flashes, drone, grenade, psychic attack, separate projectile of fog, literal invisibility gaps or unrelated parasite ability.
- Three manually staged phases/action are not MGSV frame timings. Hit/KO aliases cannot inflate unique count or certify native defeated animations.
- Steam player captures corroborate original trailer features but modification state is not independently authenticated. Hidden surfaces, small rifle components and authored combat phases are not absolute1:1-certified.
- OriginalE2 member is chosen representative of genericCamoUnit, not an additional namedperson ornewreleasedclass. UID/lore/moves/saveidentity remain distinct.
- Inheritedbladegameplay remains an authoredCQCadaptation; reusedsource includes actualsniper rifle andunarmedbodygestures. No source raster/rect/pivot/facing/actionset is modified.
- Six native existingPNG/SHA andcompleteatlases physicallyreviewed; sourceclosest_supported limitations retained. Newimagesandnewphysicalposecountzero.
- [Original E3 trailer close-up supports bald female E2 face, black lips, anatomical RIGHT red/orange optical device, bare LEFT eye, ear headset and hard neck collar.](https://www.metalgearinformer.com/wp-content/uploads/2015/06/Metal-Gear-Solid-V-The-Phantom-Pain-E3-2015-Screen-E2.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Physically viewed whole backs, legs and flat-soled high boots of original female Skull group. Circular shoulder caps, segmented arms, backpack circular fittings and hoses, olive belt and left hip pouch; gray skin at waist/thighs. Player upload matches original E3 head, modification state not independently certified.](https://images.steamusercontent.com/ugc/1753568821996782637/461C08FEB6488BD57913F5B5C0D29683882C7067/?imw=1024&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Physically viewed front aiming pose: dark high-neck chest gear, segmented forearms and gloves, circular shoulder devices, olive utility belt and exceptionally long rifle barrel with tall front sight and circular muzzle. Rifle foreshortened; exact receiver topology/name cannot be certified.](https://images.steamusercontent.com/ugc/1912360152045516941/562F5BC5960EC47EF83D472C39181B61B71A4F2E/?imw=1024&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## completion44__armored_wanderer_44

### ARMORED WANDERER — SURVIVE

**Rôle :** Créature : charge et blindage cristallin. **Profil :** `wanderer`.

**Base présente dans le code :** Créature blindée : mêlée et cristal ; pas d’armes de soldat humain.

**Incarnation à conserver :** ArmoredWanderer variant closest presentation reconstruction over genuineoriginalSurviveWanderer anatomy; completevariant body unverified.

**État vérifié :** unattested-body-presentation-reconstruction. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, special, specialBack, super ; `throw` = throw, specialForward.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** ARMORED WANDERER : silhouette déformée et organe cristallin propres au type de Wanderer. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** démarche irrégulière avec appuis malgré la déformation. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Créature : charge et blindage cristallin » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder silhouette déformée et organe cristallin propres au type de Wanderer.
- **jump_land :** ARMORED WANDERER : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. démarche irrégulière avec appuis malgré la déformation. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de ARMORED WANDERER. Terminer par déséquilibre puis réorientation de la masse. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « SURVIVE », présentation de ArmoredWanderer variant closest presentation reconstruction over genuineoriginalSurviveWanderer anatomy; completevariant body unverified., puis silhouette déformée et organe cristallin propres au type de Wanderer. Geste court lié à « Percussion cristalline » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, déséquilibre puis réorientation de la masse ; ARMORED WANDERER vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à SURVIVE.
- **round_loss :** Proposition CQC : ARMORED WANDERER réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Assaut cristallin », revenir par déséquilibre puis réorientation de la masse, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ARMORED WANDERER, préparer « Jab » ; silhouette déformée et organe cristallin propres au type de Wanderer. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** déséquilibre puis réorientation de la masse.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ARMORED WANDERER, préparer « Frappe engagée » ; silhouette déformée et organe cristallin propres au type de Wanderer. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** déséquilibre puis réorientation de la masse.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ARMORED WANDERER, préparer « Balayage » ; silhouette déformée et organe cristallin propres au type de Wanderer. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** déséquilibre puis réorientation de la masse.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ARMORED WANDERER, préparer « Projection » ; silhouette déformée et organe cristallin propres au type de Wanderer. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** déséquilibre puis réorientation de la masse. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Percussion cristalline

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ARMORED WANDERER, préparer « Percussion cristalline » ; silhouette déformée et organe cristallin propres au type de Wanderer. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Percussion cristalline » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** déséquilibre puis réorientation de la masse.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialDown — Cuirasse cristalline

**Existant :** `buff` / `armor` ; 22/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ARMORED WANDERER, préparer « Cuirasse cristalline » ; silhouette déformée et organe cristallin propres au type de Wanderer. Montrer la préparation corporelle ou mécanique de « Cuirasse cristalline ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** déséquilibre puis réorientation de la masse. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Absorbe une seule frappe ; projections, EMP et attaques brise-armure la contrent.

##### specialForward — Saisie de Wanderer

**Existant :** `melee` / `grapple` ; 10/3/32 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ARMORED WANDERER, préparer « Saisie de Wanderer » ; silhouette déformée et organe cristallin propres au type de Wanderer. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** déséquilibre puis réorientation de la masse. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Hors de portée ou saut ; ne saisir ni cible aérienne ni cible sous protection post-projection.

##### specialBack — Écrasement bas

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ARMORED WANDERER, préparer « Écrasement bas » ; silhouette déformée et organe cristallin propres au type de Wanderer. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** déséquilibre puis réorientation de la masse.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### super — Assaut cristallin

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ARMORED WANDERER, préparer « Assaut cristallin » ; silhouette déformée et organe cristallin propres au type de Wanderer. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Assaut cristallin », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** déséquilibre puis réorientation de la masse.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Reprendre son souffle

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ARMORED WANDERER, préparer « Reprendre son souffle » ; silhouette déformée et organe cristallin propres au type de Wanderer. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Reprendre son souffle ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** déséquilibre puis réorientation de la masse. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Assaut cristallin — Final

Famille `cqc`, ton `stylized` ; 220 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Assaut cristallin / Percussion cristalline.

Plan 1 : ARMORED WANDERER sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Assaut cristallin / Percussion cristalline ». Plan 2 : contact de saisie ou neutralisation lié à « Assaut cristallin / Percussion cristalline », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : déséquilibre puis réorientation de la masse, pose de signature face à l’adversaire.

##### Percussion cristalline / Cuirasse cristalline

Famille `cqc`, ton `stylized` ; 238 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Assaut cristallin / Cuirasse cristalline.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Assaut cristallin / Cuirasse cristalline » ; l’espace disponible doit être lisible. Plan 2 : contact de saisie ou neutralisation lié à « Assaut cristallin / Cuirasse cristalline », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : déséquilibre puis réorientation de la masse, arrêt du dispositif et retour au cadre d’ensemble.

##### Saisie de Wanderer — Point final

Famille `beast`, ton `stylized` ; 256 ticks CQC ; phases actuelles : stalk → pounce → takedown → howl. Appuis déclarés : Assaut cristallin / Saisie de Wanderer.

Plan 1 : approche jusqu’à la distance réelle de « Assaut cristallin / Saisie de Wanderer », arme et main libre identifiées. Plan 2 : démarche irrégulière avec appuis malgré la déformation ; montrer l’organe de « Assaut cristallin / Saisie de Wanderer ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : déséquilibre puis réorientation de la masse, prise de distance et maintien final.

##### Sang-froid — Mission close

Famille `beast`, ton `stylized` ; 274 ticks CQC ; phases actuelles : stalk → pounce → takedown → howl. Appuis déclarés : Assaut cristallin / Projection.

Plan 1 : après une observation ou un repli, ARMORED WANDERER reprend l’initiative par « Assaut cristallin / Projection ». Plan 2 : démarche irrégulière avec appuis malgré la déformation ; montrer l’organe de « Assaut cristallin / Projection ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : déséquilibre puis réorientation de la masse, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against its identified reference and only its visible extent. This is a 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Identity, costume, equipment and anatomical-side checks establish consistency with the source-backed visible facts and the explicitly qualified reconstructed parts; they do not certify unseen anatomy or clothing as canonical. Gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Physically viewed original reference establishes only visible identity/costume/accessories; it is not certified whole-body final-game 3D geometry or texture.
- Back surfaces and unseen pose angles are adapted from visible source design, without a pixel-perfect claim.
- Sixteen action poses per direction are authored gameplay adaptation; no canonical technique or motion-capture claim.
- Underlying originalgameWanderer visiblefacts only. NamedArmoredVariant body/helmet/armor geometry not fullyestablished by these captures.
- Originalgame campaignlaunchguide describes removablearmoredzombie helmets textually; this is a behavior/gear fact, not unseenhelmetgeometry evidence.
- Named fullArmoredWanderer/BattleDress model couldnot be authenticated visually. These genuinegamecaptures onlyprove underlying commonWanderer body/clothing/crystalhead.
- Specifichelmet shape/protectivepanel/forearm/shin geometry is explicitly closest conservativepresentation reconstruction, not canonicalmodelcertification.
- Actual2018Gameranxguide confirms armoredzombie removablehelmets textually; behaviorfact doesnot prove exacthelmetshape/colors.
- Priorprojectspikedmetallicknightportrait remains preserved but is excluded as canonproof and is NOT copied into this newvariation.
- Source-backedmutantbaregrayhands/basicWanderer features retained; no invented firearm, sword, fantasyspikes or robotbody.
- [GenuinebasicWanderer gamecaptures prove underlyingvisibleanatomy only. SpecificArmoredVariant fullbody/helmet/BattleDress panelgeometry explicitly reconstructed, not canonicalwholebodyattestation.](https://gameranx.com/features/id/139174/article/metal-gear-survive-8-tactical-tips-to-help-you-survive-getting-started-guide/) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [PrimaryKonami official SinglePlayer film supplied by Steam, native whole1920x1080 decodedvideo frame, no fullvideo downloaded and no localresize/crop. Promotionalgamefootage, only viewedvisible design proof.](https://store.steampowered.com/app/543900/METAL_GEAR_SURVIVE/) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## completion44__wanderer_bomber_44

### WANDERER BOMBER — SURVIVE

**Rôle :** Créature : charge et blindage cristallin. **Profil :** `bomber`.

**Base présente dans le code :** Créature volatile : explosion télégraphiée avec coût en vie, pas lance-flammes manié.

**Incarnation à conserver :** Specific original2018Bomber infectedvariant, enormous darkroundedaggregatehead seen in actualHUD/campaign.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, special, specialBack, super ; `throw` = throw, specialForward.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** WANDERER BOMBER : masse explosive du Wanderer Bomber séparée des membres. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** avancée irrégulière et anticipation corporelle de déclenchement. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Créature : charge et blindage cristallin » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder masse explosive du Wanderer Bomber séparée des membres.
- **jump_land :** WANDERER BOMBER : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. avancée irrégulière et anticipation corporelle de déclenchement. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de WANDERER BOMBER. Terminer par retombée ou fin propre au statut explosif du profil. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « SURVIVE », présentation de Specific original2018Bomber infectedvariant, enormous darkroundedaggregatehead seen in actualHUD/campaign., puis masse explosive du Wanderer Bomber séparée des membres. Geste court lié à « Percussion cristalline » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, retombée ou fin propre au statut explosif du profil ; WANDERER BOMBER vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à SURVIVE.
- **round_loss :** Proposition CQC : WANDERER BOMBER réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Décharge volatile contrôlée », revenir par retombée ou fin propre au statut explosif du profil, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de WANDERER BOMBER, préparer « Jab » ; masse explosive du Wanderer Bomber séparée des membres. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retombée ou fin propre au statut explosif du profil.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de WANDERER BOMBER, préparer « Frappe engagée » ; masse explosive du Wanderer Bomber séparée des membres. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retombée ou fin propre au statut explosif du profil.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de WANDERER BOMBER, préparer « Balayage » ; masse explosive du Wanderer Bomber séparée des membres. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** retombée ou fin propre au statut explosif du profil.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de WANDERER BOMBER, préparer « Projection » ; masse explosive du Wanderer Bomber séparée des membres. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** retombée ou fin propre au statut explosif du profil. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Percussion cristalline

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de WANDERER BOMBER, préparer « Percussion cristalline » ; masse explosive du Wanderer Bomber séparée des membres. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Percussion cristalline » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retombée ou fin propre au statut explosif du profil.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialDown — Fragments volatils

**Existant :** `trap` / `volatile` ; 33/1/35 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de WANDERER BOMBER, préparer « Fragments volatils » ; masse explosive du Wanderer Bomber séparée des membres. Prendre le dispositif, s’abaisser vers le support et indiquer le lieu de pose avant activation.

**Action.** Poser « Fragments volatils » au point réel de main/outil, armer puis retirer le membre. Le dispositif possède ensuite son propre sprite, ses états attente/armement/déclenchement/destruction et sa collision.

**Retour.** retombée ou fin propre au statut explosif du profil. Se dégager de l’objet sans le téléporter ; l’interruption avant armement a sa propre sortie.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Zone annoncée puis persistante ; sauter, contourner ou neutraliser le dispositif.

##### specialForward — Saisie de Wanderer

**Existant :** `melee` / `grapple` ; 10/3/32 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de WANDERER BOMBER, préparer « Saisie de Wanderer » ; masse explosive du Wanderer Bomber séparée des membres. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** retombée ou fin propre au statut explosif du profil. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Hors de portée ou saut ; ne saisir ni cible aérienne ni cible sous protection post-projection.

##### specialBack — Écrasement bas

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de WANDERER BOMBER, préparer « Écrasement bas » ; masse explosive du Wanderer Bomber séparée des membres. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** retombée ou fin propre au statut explosif du profil.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### super — Décharge volatile contrôlée

**Existant :** `melee` / `volatile` ; 48/7/44 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de WANDERER BOMBER, préparer « Décharge volatile contrôlée » ; masse explosive du Wanderer Bomber séparée des membres. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Décharge volatile contrôlée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retombée ou fin propre au statut explosif du profil.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Reprendre son souffle

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de WANDERER BOMBER, préparer « Reprendre son souffle » ; masse explosive du Wanderer Bomber séparée des membres. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Reprendre son souffle ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** retombée ou fin propre au statut explosif du profil. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Crystal Detonation

Famille `cqc`, ton `stylized` ; 220 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Décharge volatile contrôlée / Percussion cristalline.

Plan 1 : WANDERER BOMBER sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Décharge volatile contrôlée / Percussion cristalline ». Plan 2 : contact de saisie ou neutralisation lié à « Décharge volatile contrôlée / Percussion cristalline », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : retombée ou fin propre au statut explosif du profil, pose de signature face à l’adversaire.

##### Dite Bomber

Famille `cqc`, ton `stylized` ; 238 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Décharge volatile contrôlée / Fragments volatils.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Décharge volatile contrôlée / Fragments volatils » ; l’espace disponible doit être lisible. Plan 2 : contact de saisie ou neutralisation lié à « Décharge volatile contrôlée / Fragments volatils », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : retombée ou fin propre au statut explosif du profil, arrêt du dispositif et retour au cadre d’ensemble.

##### Wanderer Burst

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Décharge volatile contrôlée / Saisie de Wanderer.

Plan 1 : approche jusqu’à la distance réelle de « Décharge volatile contrôlée / Saisie de Wanderer », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Décharge volatile contrôlée / Saisie de Wanderer », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : retombée ou fin propre au statut explosif du profil, prise de distance et maintien final.

##### Dust Settles

Famille `explosive`, ton `stylized` ; 274 ticks CQC ; phases actuelles : plant → retreat → blast → pose. Appuis déclarés : Décharge volatile contrôlée / Projection.

Plan 1 : après une observation ou un repli, WANDERER BOMBER reprend l’initiative par « Décharge volatile contrôlée / Projection ». Plan 2 : montrer la pose/trajectoire et le délai de « Décharge volatile contrôlée / Projection ». Plan 3 : déclencher au véritable point de dispositif ; poussière, débris et réaction de cible restent indépendants du corps de l’attaquant. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : retombée ou fin propre au statut explosif du profil, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against its identified reference and only its visible extent. This is a 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Identity, costume, equipment and anatomical-side checks establish consistency with the source-backed visible facts and the explicitly qualified reconstructed parts; they do not certify unseen anatomy or clothing as canonical. Gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Physically viewed original reference establishes only visible identity/costume/accessories; it is not certified whole-body final-game 3D geometry or texture.
- Back surfaces and unseen pose angles are adapted from visible source design, without a pixel-perfect claim.
- Sixteen action poses per direction are authored gameplay adaptation; no canonical technique or motion-capture claim.
- Originaluploaded1920x1080gamecapture preserved withoutbrightness/crop/resize.
- Wholemonster silhouette in darkroom doesnotcertify precise hidden/unlitclothing colors or alloppositeangles.
- Bomber ID actualHUD and originalchapter6/8game context; no reuse of regularcrystalhead as Bomber.
- Two original2018gamecaptures establish specificBomber HUDidentity and massive darkroundaggregatedhead, plus wholebipedalsilhouette in dimruins. No regularnarrowredcrystalhead substitution.
- Sourcebody fineclothingcolors/details and hiddenoppositeangles remain indeterminate because dimlighting/foregroundocclusion; conservative darkraggedclothing follows observed silhouette.
- Hugehead/bodyratio is source-backed creatureanatomy, not cutechild/chibi character proportion. Authored32poses are gameplayadaptation, not extractedanimation.
- Slightlylarger248on-screenheight is authoredpresentation, not 3Dmodel unitmeasurement.
- Low-alpha panel haze in the tool-native atlas is excluded at runtime by source-derived vector silhouette clipping on every pose; no PNG pixel is rewritten.
- [Originalfinal2018GameHUD namesBomber and originalRuins01wholecreaturesilhouette; exposedheadshape/bodyextent only, dimunseenclothqualified.](https://gameranx.com/features/id/140049/article/metal-gear-survive-walkthrough-chapter-8-defend-the-digger/) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original2018 gameplay screenshot in Gameranx launchwalkthrough, nativefulluploaded JPG no crop/resize. Body identity not asserted beforeactualview.](https://gameranx.com/features/id/139766/article/metal-gear-survive-walkthrough-chapter-6-exploring-ruins-01/) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## completion44__zanzibar_mercenary_44

### ZANZIBAR MERCENARY — METAL GEAR 2

**Rôle :** Tir, grenades et distance. **Profil :** `soldier`.

**Base présente dans le code :** Mercenaire MG2 : armes de son épisode, aucun dispositif SOP futur.

**Incarnation à conserver :** Original1990 manual Zanzibar Land normal sentry in red beret and brown woodland uniform, modern native interpretation.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** ZANZIBAR MERCENARY : appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas courts, crosse/équipement conservés près du torse. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Tir, grenades et distance » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder appui militaire stable, arme maintenue dans l’axe et regard vers la menace.
- **jump_land :** ZANZIBAR MERCENARY : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas courts, crosse/équipement conservés près du torse. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de ZANZIBAR MERCENARY. Terminer par retour en couverture de l’arme après le coup. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « METAL GEAR 2 », présentation de Original1990 manual Zanzibar Land normal sentry in red beret and brown woodland uniform, modern native interpretation., puis appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Geste court lié à « Arme de Zanzibar » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, retour en couverture de l’arme après le coup ; ZANZIBAR MERCENARY vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à METAL GEAR 2.
- **round_loss :** Proposition CQC : ZANZIBAR MERCENARY réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Ligne de défense », revenir par retour en couverture de l’arme après le coup, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ZANZIBAR MERCENARY, préparer « Jab » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ZANZIBAR MERCENARY, préparer « Frappe engagée » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ZANZIBAR MERCENARY, préparer « Balayage » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ZANZIBAR MERCENARY, préparer « Projection » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** retour en couverture de l’arme après le coup. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Arme de Zanzibar

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ZANZIBAR MERCENARY, préparer « Arme de Zanzibar » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Arme de Zanzibar » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Grenade de caserne

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ZANZIBAR MERCENARY, préparer « Grenade de caserne » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Prélever l’objet correspondant à « Grenade de caserne », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Crosse de patrouille

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ZANZIBAR MERCENARY, préparer « Crosse de patrouille » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Crosse de patrouille » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Repli MG2

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ZANZIBAR MERCENARY, préparer « Repli MG2 » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer l’appui qui produit le déplacement ; pas courts, crosse/équipement conservés près du torse.

**Action.** Exécuter « Repli MG2 » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** retour en couverture de l’arme après le coup. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Ligne de défense

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ZANZIBAR MERCENARY, préparer « Ligne de défense » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Ligne de défense » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ZANZIBAR MERCENARY, préparer « Recharger » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** retour en couverture de l’arme après le coup. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Ligne de défense — Final

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Ligne de défense / Arme de Zanzibar.

Plan 1 : ZANZIBAR MERCENARY sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Ligne de défense / Arme de Zanzibar ». Plan 2 : présenter l’arme effectivement associée à « Ligne de défense / Arme de Zanzibar », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : retour en couverture de l’arme après le coup, pose de signature face à l’adversaire.

##### Arme de Zanzibar / Grenade de caserne

Famille `ballistic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Ligne de défense / Grenade de caserne.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Ligne de défense / Grenade de caserne » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Ligne de défense / Grenade de caserne », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : retour en couverture de l’arme après le coup, arrêt du dispositif et retour au cadre d’ensemble.

##### Crosse de patrouille — Point final

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Ligne de défense / Crosse de patrouille.

Plan 1 : approche jusqu’à la distance réelle de « Ligne de défense / Crosse de patrouille », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Ligne de défense / Crosse de patrouille », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : retour en couverture de l’arme après le coup, prise de distance et maintien final.

##### Sang-froid — Mission close

Famille `ballistic`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Ligne de défense / Projection.

Plan 1 : après une observation ou un repli, ZANZIBAR MERCENARY reprend l’initiative par « Ligne de défense / Projection ». Plan 2 : présenter l’arme effectivement associée à « Ligne de défense / Projection », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : retour en couverture de l’arme après le coup, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Original manual explicitly specifies red beret with ZL insignia, brown woodland uniform and SteyrAUG service rifle; choose normal sentry, not combat helmet/vest alternative.
- Full film-strip soldier bodies are low-resolution monochrome evidence. Unique faces, exact seams and exact rifle engraving/model rendering absent from game proof are restrained reconstruction.
- Sixteen keyposes per facing are authored gameplay motion, not original MSX2 animation frames.
- Official STEYR AUG A1 current manufacturer side-view is supplemental named-hardware geometry reference only. It does not certify an exact1990 game rendered rifle or historical stock colour; selected black hardware palette is documented as adaptation.
- [Original1990 Japanese MG2 manual fullpage40, physically viewed: whole film-strip soldier bodies and explicit textual uniform/equipment descriptions. Weapon shape from named SteyrAUG, exact ingame gun model not shown.](https://archive.org/download/metal-gear-2-solid-snake-manual-original/MetalGear%202%20-%20SolidSnake%20Manual%20%28Original%29_text.pdf) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## completion44__black_chamber_soldier_44

### BLACK CHAMBER SOLDIER — GHOST BABEL

**Rôle :** Tir, grenades et distance. **Profil :** `soldier`.

**Base présente dans le code :** Soldat bonus inventé autour de Gindra ; pas un membre nommé officiel de Black Chamber.

**Incarnation à conserver :** Anonymous BlackChamber-inspired CQC reconstruction, no attested canonical uniform or personal body

**État vérifié :** unattested-body-presentation-reconstruction. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** BLACK CHAMBER SOLDIER : appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas courts, crosse/équipement conservés près du torse. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Tir, grenades et distance » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder appui militaire stable, arme maintenue dans l’axe et regard vers la menace.
- **jump_land :** BLACK CHAMBER SOLDIER : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas courts, crosse/équipement conservés près du torse. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de BLACK CHAMBER SOLDIER. Terminer par retour en couverture de l’arme après le coup. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « GHOST BABEL », présentation de Anonymous BlackChamber-inspired CQC reconstruction, no attested canonical uniform or personal body, puis appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Geste court lié à « Arme Gindra » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, retour en couverture de l’arme après le coup ; BLACK CHAMBER SOLDIER vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à GHOST BABEL.
- **round_loss :** Proposition CQC : BLACK CHAMBER SOLDIER réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Couverture de garnison », revenir par retour en couverture de l’arme après le coup, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BLACK CHAMBER SOLDIER, préparer « Jab » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BLACK CHAMBER SOLDIER, préparer « Frappe engagée » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BLACK CHAMBER SOLDIER, préparer « Balayage » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BLACK CHAMBER SOLDIER, préparer « Projection » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** retour en couverture de l’arme après le coup. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Arme Gindra

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BLACK CHAMBER SOLDIER, préparer « Arme Gindra » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Arme Gindra » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Grenade de garde

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BLACK CHAMBER SOLDIER, préparer « Grenade de garde » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Prélever l’objet correspondant à « Grenade de garde », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Crosse de forteresse

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BLACK CHAMBER SOLDIER, préparer « Crosse de forteresse » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Crosse de forteresse » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Repli de Gindra

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BLACK CHAMBER SOLDIER, préparer « Repli de Gindra » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer l’appui qui produit le déplacement ; pas courts, crosse/équipement conservés près du torse.

**Action.** Exécuter « Repli de Gindra » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** retour en couverture de l’arme après le coup. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Couverture de garnison

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BLACK CHAMBER SOLDIER, préparer « Couverture de garnison » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Couverture de garnison » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BLACK CHAMBER SOLDIER, préparer « Recharger » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** retour en couverture de l’arme après le coup. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Couverture de garnison — Final

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Couverture de garnison / Arme Gindra.

Plan 1 : BLACK CHAMBER SOLDIER sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Couverture de garnison / Arme Gindra ». Plan 2 : présenter l’arme effectivement associée à « Couverture de garnison / Arme Gindra », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : retour en couverture de l’arme après le coup, pose de signature face à l’adversaire.

##### Arme Gindra / Grenade de garde

Famille `ballistic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Couverture de garnison / Grenade de garde.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Couverture de garnison / Grenade de garde » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Couverture de garnison / Grenade de garde », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : retour en couverture de l’arme après le coup, arrêt du dispositif et retour au cadre d’ensemble.

##### Crosse de forteresse — Point final

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Couverture de garnison / Crosse de forteresse.

Plan 1 : approche jusqu’à la distance réelle de « Couverture de garnison / Crosse de forteresse », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Couverture de garnison / Crosse de forteresse », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : retour en couverture de l’arme après le coup, prise de distance et maintien final.

##### Sang-froid — Mission close

Famille `ballistic`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Couverture de garnison / Projection.

Plan 1 : après une observation ou un repli, BLACK CHAMBER SOLDIER reprend l’initiative par « Couverture de garnison / Projection ». Plan 2 : présenter l’arme effectivement associée à « Couverture de garnison / Projection », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : retour en couverture de l’arme après le coup, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Native original CQC presentation preserves the attested narrative identity or unit motifs; a canonical personal body is not attested. Complete face/outfit/weapon details are explicitly authored reconstruction, not an official full-body appearance.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Native2.5D poses are authored CQC adaptation, source pixels unchanged, original moves/collision/timing untouched.
- No unconditional1:1 certification; hidden rear seams, small text and unshown details remain explicit restrained reconstruction.
- No personal canonical anatomical/body appearance is attested. This native sprite is an expressly qualified authored CQC presentation reconstruction, not an official released design, recovered portrait or pixel-perfect canon body. Review checks confirm consistency of the expressly qualified authored design, not unknown canon details.
- [Official original BlackChamber member illustrations physically viewed only for dark/purple unit palette and graphic language; they do not attest an anonymous soldier uniform, face or weapon. Complete body/weapon are expressly authored CQC adaptation; no alias on namedmember or GLF.](https://www.konami.com/mg/archive/ghostbabel/japanese/character/pic/hawk_l.gif) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## completion44__saintlogic_guard_44

### SAINTLOGIC GUARD — AC!D 2

**Rôle :** Cartes équipées et coût temporel. **Profil :** `cardgun`.

**Base présente dans le code :** Garde SaintLogic : équipement de preset représenté par cartes, pas pouvoirs d’Ego attribués d’office.

**Incarnation à conserver :** ONE official fullbody masked SaintLogic guard CONCEPT1, sourceconcept appearance chosen; final released model equivalence unproven.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `deploy` = specialDown, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, super, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `retro-msx`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** SAINTLOGIC GUARD : préparation du support AC!D et de l’arme propre au profil. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** déplacement lisible entre la décision de carte et son exécution. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Cartes équipées et coût temporel » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder préparation du support AC!D et de l’arme propre au profil.
- **jump_land :** SAINTLOGIC GUARD : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. déplacement lisible entre la décision de carte et son exécution. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de SAINTLOGIC GUARD. Terminer par refermer la séquence de carte puis revenir à la garde. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « AC!D 2 », présentation de ONE official fullbody masked SaintLogic guard CONCEPT1, sourceconcept appearance chosen; final released model equivalence unproven., puis préparation du support AC!D et de l’arme propre au profil. Geste court lié à « Carte fusil de garde » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, refermer la séquence de carte puis revenir à la garde ; SAINTLOGIC GUARD vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à AC!D 2.
- **round_loss :** Proposition CQC : SAINTLOGIC GUARD réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Main de sécurité », revenir par refermer la séquence de carte puis revenir à la garde, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SAINTLOGIC GUARD, préparer « Jab » ; préparation du support AC!D et de l’arme propre au profil. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** refermer la séquence de carte puis revenir à la garde.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SAINTLOGIC GUARD, préparer « Frappe engagée » ; préparation du support AC!D et de l’arme propre au profil. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** refermer la séquence de carte puis revenir à la garde.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SAINTLOGIC GUARD, préparer « Balayage » ; préparation du support AC!D et de l’arme propre au profil. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** refermer la séquence de carte puis revenir à la garde.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SAINTLOGIC GUARD, préparer « Projection » ; préparation du support AC!D et de l’arme propre au profil. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** refermer la séquence de carte puis revenir à la garde. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Carte fusil de garde

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SAINTLOGIC GUARD, préparer « Carte fusil de garde » ; préparation du support AC!D et de l’arme propre au profil. Montrer la prise et la visée de l’arme décrite par « Carte fusil de garde » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** refermer la séquence de carte puis revenir à la garde. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Carte explosive de garde

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SAINTLOGIC GUARD, préparer « Carte explosive de garde » ; préparation du support AC!D et de l’arme propre au profil. Prélever l’objet correspondant à « Carte explosive de garde », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** refermer la séquence de carte puis revenir à la garde. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Carte contrôle

**Existant :** `mark` / `recon` ; 26/1/30 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SAINTLOGIC GUARD, préparer « Carte contrôle » ; préparation du support AC!D et de l’arme propre au profil. Orienter regard, optique ou terminal vers la cible observée, sans consulter une action future.

**Action.** Pour « Carte contrôle », déclencher lecture/repérage avec un petit geste ou changement d’optique et un indicateur séparé. Le corps doit rester visible et vulnérable selon les données de combat.

**Retour.** refermer la séquence de carte puis revenir à la garde. Couper le signal ou abaisser l’outil ; retour vers l’adversaire sans nouvelle arme inventée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Portée limitée ; le marquage ne vise ni à travers toute l’arène ni automatiquement.

##### specialBack — Carte repli

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SAINTLOGIC GUARD, préparer « Carte repli » ; préparation du support AC!D et de l’arme propre au profil. Préparer l’appui qui produit le déplacement ; déplacement lisible entre la décision de carte et son exécution.

**Action.** Exécuter « Carte repli » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** refermer la séquence de carte puis revenir à la garde. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Main de sécurité

**Existant :** `projectile` / `card` ; 35/1/44 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SAINTLOGIC GUARD, préparer « Main de sécurité » ; préparation du support AC!D et de l’arme propre au profil. Donner à la source de « Main de sécurité » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet card de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet. La salve contient 4 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** refermer la séquence de carte puis revenir à la garde. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 4 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Réduire le COST

**Existant :** `recover` / `recovery` ; 45/1/25 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SAINTLOGIC GUARD, préparer « Réduire le COST » ; préparation du support AC!D et de l’arme propre au profil. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Réduire le COST ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** refermer la séquence de carte puis revenir à la garde. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Refroidissement ou pause tactique interrompable ; aucun soin gratuit.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Main de sécurité — Final

Famille `card`, ton `stylized` ; 220 ticks CQC ; phases actuelles : deal → chain → costlock → discard. Appuis déclarés : Main de sécurité / Carte fusil de garde.

Plan 1 : SAINTLOGIC GUARD sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Main de sécurité / Carte fusil de garde ». Plan 2 : rendre lisible la décision de carte associée à « Main de sécurité / Carte fusil de garde ». Plan 3 : réaliser l’effet par le vrai corps/outil du profil ; les cartes servent à la présentation AC!D, pas à inventer un équipement canonique. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : refermer la séquence de carte puis revenir à la garde, pose de signature face à l’adversaire.

##### Carte fusil de garde / Carte explosive de garde

Famille `ballistic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Main de sécurité / Carte explosive de garde.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Main de sécurité / Carte explosive de garde » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Main de sécurité / Carte explosive de garde », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : refermer la séquence de carte puis revenir à la garde, arrêt du dispositif et retour au cadre d’ensemble.

##### Carte contrôle — Point final

Famille `card`, ton `stylized` ; 256 ticks CQC ; phases actuelles : deal → chain → costlock → discard. Appuis déclarés : Main de sécurité / Carte contrôle.

Plan 1 : approche jusqu’à la distance réelle de « Main de sécurité / Carte contrôle », arme et main libre identifiées. Plan 2 : rendre lisible la décision de carte associée à « Main de sécurité / Carte contrôle ». Plan 3 : réaliser l’effet par le vrai corps/outil du profil ; les cartes servent à la présentation AC!D, pas à inventer un équipement canonique. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : refermer la séquence de carte puis revenir à la garde, prise de distance et maintien final.

##### Tempo des cartes — Mission close

Famille `card`, ton `stylized` ; 274 ticks CQC ; phases actuelles : deal → chain → costlock → discard. Appuis déclarés : Main de sécurité / Projection.

Plan 1 : après une observation ou un repli, SAINTLOGIC GUARD reprend l’initiative par « Main de sécurité / Projection ». Plan 2 : rendre lisible la décision de carte associée à « Main de sécurité / Projection ». Plan 3 : réaliser l’effet par le vrai corps/outil du profil ; les cartes servent à la présentation AC!D, pas à inventer un équipement canonique. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : refermer la séquence de carte puis revenir à la garde, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Identity/reference scope/equipment and anatomical sides reviewed within the explicitly stated source limits; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Native source is small; fine facial topology, seams, fabric microtexture and unseen pose angles are interpreted at CQC drawing scale.
- All16action keyposes per direction are authored CQC presentation, not original-game motion capture or exact canonical techniques.
- Official concept painting is not certified equivalent to final released ACID2 model.
- [Originalofficial fullbody SaintLogicguard conceptart reproduced byCreativeUncut; select one conceptual outfit only, not certified finalgame mesh/texture.](https://www.creativeuncut.com/gallery-11/metal-gear-acid-2-art.html) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## completion44__fox_trooper_mpo_44

### FOX TROOPER — PORTABLE OPS

**Rôle :** Tir, grenades et distance. **Profil :** `soldier`.

**Base présente dans le code :** Soldat FOX de Portable Ops : équipement standard ; les capacités de Gene ne sont pas partagées.

**Incarnation à conserver :** Original PSP2006 generic FOX unit target/recruit archetype; separate UID from Plus

**État vérifié :** métadonnées natives avec limites. 28 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** FOX TROOPER : appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas courts, crosse/équipement conservés près du torse. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Tir, grenades et distance » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder appui militaire stable, arme maintenue dans l’axe et regard vers la menace.
- **jump_land :** FOX TROOPER : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas courts, crosse/équipement conservés près du torse. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de FOX TROOPER. Terminer par retour en couverture de l’arme après le coup. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « PORTABLE OPS », présentation de Original PSP2006 generic FOX unit target/recruit archetype; separate UID from Plus, puis appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Geste court lié à « Carabine FOX » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, retour en couverture de l’arme après le coup ; FOX TROOPER vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à PORTABLE OPS.
- **round_loss :** Proposition CQC : FOX TROOPER réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Feu de San Hieronymo », revenir par retour en couverture de l’arme après le coup, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FOX TROOPER, préparer « Jab » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FOX TROOPER, préparer « Frappe engagée » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FOX TROOPER, préparer « Balayage » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FOX TROOPER, préparer « Projection » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** retour en couverture de l’arme après le coup. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Carabine FOX

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FOX TROOPER, préparer « Carabine FOX » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Carabine FOX » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Grenade FOX

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FOX TROOPER, préparer « Grenade FOX » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Prélever l’objet correspondant à « Grenade FOX », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Crosse de l’unité

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FOX TROOPER, préparer « Crosse de l’unité » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Crosse de l’unité » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Repli de l’unité

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FOX TROOPER, préparer « Repli de l’unité » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer l’appui qui produit le déplacement ; pas courts, crosse/équipement conservés près du torse.

**Action.** Exécuter « Repli de l’unité » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** retour en couverture de l’arme après le coup. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Feu de San Hieronymo

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FOX TROOPER, préparer « Feu de San Hieronymo » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Feu de San Hieronymo » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FOX TROOPER, préparer « Recharger » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** retour en couverture de l’arme après le coup. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Feu de San Hieronymo — Final

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Feu de San Hieronymo / Carabine FOX.

Plan 1 : FOX TROOPER sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Feu de San Hieronymo / Carabine FOX ». Plan 2 : présenter l’arme effectivement associée à « Feu de San Hieronymo / Carabine FOX », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : retour en couverture de l’arme après le coup, pose de signature face à l’adversaire.

##### Carabine FOX / Grenade FOX

Famille `ballistic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Feu de San Hieronymo / Grenade FOX.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Feu de San Hieronymo / Grenade FOX » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Feu de San Hieronymo / Grenade FOX », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : retour en couverture de l’arme après le coup, arrêt du dispositif et retour au cadre d’ensemble.

##### Crosse de l’unité — Point final

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Feu de San Hieronymo / Crosse de l’unité.

Plan 1 : approche jusqu’à la distance réelle de « Feu de San Hieronymo / Crosse de l’unité », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Feu de San Hieronymo / Crosse de l’unité », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : retour en couverture de l’arme après le coup, prise de distance et maintien final.

##### Sang-froid — Mission close

Famille `ballistic`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Feu de San Hieronymo / Projection.

Plan 1 : après une observation ou un repli, FOX TROOPER reprend l’initiative par « Feu de San Hieronymo / Projection ». Plan 2 : présenter l’arme effectivement associée à « Feu de San Hieronymo / Projection », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : retour en couverture de l’arme après le coup, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Identity/reference scope/equipment and anatomical sides reviewed within the explicitly stated source limits; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Small original PSP capture does not attest sole-level boots or exact recruit subtype; black laceup boots and fine camouflage/equipment textures are qualified reconstruction.
- Cover army line provides visual silhouette only, not independently certified FOX subtype or extracted original PSP model.
- No held gun is visible in native16poses or supplied FOX source target; visualFirearmPresent:false. Original rifle move logic remains unchanged; not an asserted unequipped official loadout.
- Native CQC unarmed movements and anonymous face are authored source-informed adaptation; no exact original motion/mesh certification.
- Physical pose12 is a visibly smaller neutral interpretation, retained unmodified but reload explicitly selects full-scale pose0.
- [Actual original PSP2006 gameplay capture downloaded unchanged and physically inspected shows the captured FOX target left of Snake, wearing olive camouflage, dark headgear, tactical vest/pouches and gloves. Period original European cover corroborates small saluting uniform silhouettes, without proving exact unit subtype. No complete extracted model, unique face or unrecovered sole-level boot mesh is claimed.](https://en.wikipedia.org/wiki/Metal_Gear_Solid:_Portable_Ops) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).
