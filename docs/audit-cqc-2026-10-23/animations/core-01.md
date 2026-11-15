# Animations — CORE

**10 acteurs du registre courant.** Les titres d’actions et paramètres sont observés ; les descriptions sont des propositions CQC à produire et valider. Un groupe de frames existant ne certifie pas l’ensemble du mouvement ou sa fidélité originale.

[Index des fiches](README.md) · [Contrat commun](../04_ANIMATIONS_SPRITES.md)

## Sommaire

- [MERYL — MGS1](#core__meryl_mgs1) — MGS1 / RENFORTS
- [SOLID SNAKE — MGS2](#core__snake_mgs2) — MGS2 / RENFORTS
- [OLGA — TANKER](#core__olga_mgs2) — MGS2 / RENFORTS
- [OLGA — NINJA](#core__olga_ninja) — MGS2 / RENFORTS
- [OCELOT — MGS2](#core__ocelot_mgs2) — MGS2 / RENFORTS
- [EVA — MGS3](#core__eva_mgs3) — MGS3 / RENFORTS
- [MERYL — RAT PATROL](#core__meryl_mgs4) — MGS4 / RENFORTS
- [JOHNNY / AKIBA](#core__johnny_mgs4) — MGS4 / RENFORTS
- [RAIDEN — MGS4](#core__raiden_mgs4) — MGS4 / RENFORTS
- [VAMP — MGS4](#core__vamp_mgs4) — MGS4 / RENFORTS

## core__meryl_mgs1

### MERYL — MGS1 — MGS1 / RENFORTS

**Rôle :** Pistolet et défense proche. **Profil :** `pistol`.

**Base présente dans le code :** Recrue de Shadow Moses : pistolet lourd et défense rapprochée, sans SOP.

**Incarnation à conserver :** Metal Gear Solid (1998), PlayStation1; original rebel outfit

**État vérifié :** métadonnées natives avec limites. 72 régions source distinctes dans les deux directions ; groupes : idle, walk, guard, crouch, low, punch, hit, ko, throw, deploy, shoot, reload, attack.

**Réemplois à examiner :** `punch` = light, heavy ; `throw` = throw, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `tuxedo`, `retro-msx`, `cyborg`, `survive`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** MERYL — MGS1 : main forte et main de soutien identifiées sur le pistolet, coudes contenus. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas prudents sans inverser l’étui ni la main forte. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Pistolet et défense proche » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder main forte et main de soutien identifiées sur le pistolet, coudes contenus.
- **jump_land :** MERYL — MGS1 : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas prudents sans inverser l’étui ni la main forte. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de MERYL — MGS1. Terminer par recul du poignet puis stabilisation du canon. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS1 / RENFORTS », présentation de Metal Gear Solid (1998), PlayStation1; original rebel outfit, puis main forte et main de soutien identifiées sur le pistolet, coudes contenus. Geste court lié à « Desert Eagle » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, recul du poignet puis stabilisation du canon ; MERYL — MGS1 vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS1 / RENFORTS.
- **round_loss :** Proposition CQC : MERYL — MGS1 réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Dernières cartouches », revenir par recul du poignet puis stabilisation du canon, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MERYL — MGS1, préparer « Jab » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `punch`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MERYL — MGS1, préparer « Frappe engagée » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MERYL — MGS1, préparer « Balayage » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MERYL — MGS1, préparer « Projection » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recul du poignet puis stabilisation du canon. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Desert Eagle

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MERYL — MGS1, préparer « Desert Eagle » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Montrer la prise et la visée de l’arme décrite par « Desert Eagle » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Grenade d’urgence

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MERYL — MGS1, préparer « Grenade d’urgence » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Prélever l’objet correspondant à « Grenade d’urgence », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Saisie de recrue

**Existant :** `melee` / `grapple` ; 10/3/32 ticks ; groupe `throw`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MERYL — MGS1, préparer « Saisie de recrue » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recul du poignet puis stabilisation du canon. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Hors de portée ou saut ; ne saisir ni cible aérienne ni cible sous protection post-projection.

##### specialBack — Repli de Meryl

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `crouch`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MERYL — MGS1, préparer « Repli de Meryl » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer l’appui qui produit le déplacement ; pas prudents sans inverser l’étui ni la main forte.

**Action.** Exécuter « Repli de Meryl » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** recul du poignet puis stabilisation du canon. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Dernières cartouches

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MERYL — MGS1, préparer « Dernières cartouches » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Montrer la prise et la visée de l’arme décrite par « Dernières cartouches » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MERYL — MGS1, préparer « Recharger » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** recul du poignet puis stabilisation du canon. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Dernières cartouches — Final

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Dernières cartouches / Desert Eagle.

Plan 1 : MERYL — MGS1 sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Dernières cartouches / Desert Eagle ». Plan 2 : présenter l’arme effectivement associée à « Dernières cartouches / Desert Eagle », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : recul du poignet puis stabilisation du canon, pose de signature face à l’adversaire.

##### Desert Eagle / Grenade d’urgence

Famille `ballistic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Dernières cartouches / Grenade d’urgence.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Dernières cartouches / Grenade d’urgence » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Dernières cartouches / Grenade d’urgence », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : recul du poignet puis stabilisation du canon, arrêt du dispositif et retour au cadre d’ensemble.

##### Saisie de recrue — Point final

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Dernières cartouches / Saisie de recrue.

Plan 1 : approche jusqu’à la distance réelle de « Dernières cartouches / Saisie de recrue », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Dernières cartouches / Saisie de recrue », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : recul du poignet puis stabilisation du canon, prise de distance et maintien final.

##### Lecture rapprochée — Mission close

Famille `ballistic`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Dernières cartouches / Projection.

Plan 1 : après une observation ou un repli, MERYL — MGS1 reprend l’initiative par « Dernières cartouches / Projection ». Plan 2 : présenter l’arme effectivement associée à « Dernières cartouches / Projection », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : recul du poignet puis stabilisation du canon, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Aiming, punches, throws, sweep, grenades, reload and KO are original2D versus adaptations; not native PS1 animation extraction or pixel-certified source clones.
- Primary official Konami body artwork is painterly: colors reconciled with original emulated game captures, which are filtered/non-native aspect; not absolute PS1 pixel certification.
- B-left last-column bootmargin narrow although complete and0 opaqueedge; final runtime crop/scale/pose validation belongs sequential integration owner.
- Some native generator output includes very-low-alpha RGB fringes; no recoloring/alpha repair/image editing outside imagegen performed.
- Tiny firearm and tattoo engravings are not certified at subpixel detail; pose handgrips are closest reviewed reference adaptation.
- Standing source pixel scale is manually observed per independent PNG; low/crouch/KO preserve that scale instead of stretching to full standing height. Local display height is a versus adaptation, not a source-frame pixel certification.
- Grenade action belongs to the authored CQC versus adaptation stated in the preserved original profile. Meryl scripted original PS1 grenade use is not claimed.
- Very close source rows require a Canvas contour restricted to pixels closest to the selected body component; no neighboring boot fringe should be drawn over a gun pose head. The alpha PNG itself remains unchanged.
- [Référence déclarée](https://www.konami.com/mg/archive/mgs/character/images/ch14_body.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Référence déclarée](https://www.konami.com/mg/archive/mgs/character/images/ch14_face.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Référence déclarée](https://www.metalgearsolid.be/images/mgs_art_g_0008.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Référence déclarée](https://www.metalgearsolid.be/images/mgs_art_g_0009.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Référence déclarée](https://www.metalgearsolid.be/images/meryl_j.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Référence déclarée](https://portforward.com/games/walkthroughs/Metal-Gear-Solid/metal-gear-solid-159-small.webp) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Référence déclarée](https://portforward.com/games/walkthroughs/Metal-Gear-Solid/metal-gear-solid-160-small.webp) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Référence déclarée](https://www.metalgearsolid.be/images/grenade.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__snake_mgs2

### SOLID SNAKE — MGS2 — MGS2 / RENFORTS

**Rôle :** Infiltration et armes limitées. **Profil :** `infiltrator`.

**Base présente dans le code :** Solid Snake du Tanker : M9, roulade et prise ; pas de bras bionique.

**Incarnation à conserver :** Tanker/Plant sneaking suit, Solid Snake, 2007/2009

**État vérifié :** métadonnées natives avec limites. 32 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, attack, hit, ko, punch, low, throw, deploy, shoot, reload, recover, parry.

**Réemplois à examiner :** `punch` = light, heavy, super ; `throw` = throw, specialForward.

**Techniques pointant sur une seule région native dans la direction principale :** special, specialDown, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `appearance-roster51-pliskin-mgs2`, `tuxedo`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** SOLID SNAKE — MGS2 : garde compacte de l’infiltrateur, arme et étuis proches du corps. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** déroulé de pied discret, bassin bas, freinage avant visée. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Infiltration et armes limitées » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder garde compacte de l’infiltrateur, arme et étuis proches du corps.
- **jump_land :** SOLID SNAKE — MGS2 : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. déroulé de pied discret, bassin bas, freinage avant visée. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de SOLID SNAKE — MGS2. Terminer par replacement rapide de la main libre et contrôle du champ. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS2 / RENFORTS », présentation de Tanker/Plant sneaking suit, Solid Snake, 2007/2009, puis garde compacte de l’infiltrateur, arme et étuis proches du corps. Geste court lié à « M9 tranquillisant » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, replacement rapide de la main libre et contrôle du champ ; SOLID SNAKE — MGS2 vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS2 / RENFORTS.
- **round_loss :** Proposition CQC : SOLID SNAKE — MGS2 réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Philanthropy — assaut », revenir par replacement rapide de la main libre et contrôle du champ, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — MGS2, préparer « Jab » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** replacement rapide de la main libre et contrôle du champ.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — MGS2, préparer « Frappe engagée » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** replacement rapide de la main libre et contrôle du champ.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — MGS2, préparer « Balayage » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** replacement rapide de la main libre et contrôle du champ.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — MGS2, préparer « Projection » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** replacement rapide de la main libre et contrôle du champ. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — M9 tranquillisant

**Existant :** `projectile` / `tranq` ; 19/1/29 ticks ; groupe `shoot`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — MGS2, préparer « M9 tranquillisant » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Montrer la prise et la visée de l’arme décrite par « M9 tranquillisant » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** replacement rapide de la main libre et contrôle du champ. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Se baisser, bloquer ; la somnolence décroît et ne provoque pas de K.O. instantané.

##### specialDown — Chaff du Tanker

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — MGS2, préparer « Chaff du Tanker » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Prélever l’objet correspondant à « Chaff du Tanker », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** replacement rapide de la main libre et contrôle du champ. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Saisie de Philanthropy

**Existant :** `melee` / `grapple` ; 10/3/32 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — MGS2, préparer « Saisie de Philanthropy » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** replacement rapide de la main libre et contrôle du champ. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Hors de portée ou saut ; ne saisir ni cible aérienne ni cible sous protection post-projection.

##### specialBack — Roulade du Tanker

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `walk`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — MGS2, préparer « Roulade du Tanker » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Préparer l’appui qui produit le déplacement ; déroulé de pied discret, bassin bas, freinage avant visée.

**Action.** Exécuter « Roulade du Tanker » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** replacement rapide de la main libre et contrôle du champ. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Philanthropy — assaut

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — MGS2, préparer « Philanthropy — assaut » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Philanthropy — assaut », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** replacement rapide de la main libre et contrôle du champ.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — MGS2, préparer « Recharger » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** replacement rapide de la main libre et contrôle du champ. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Tanker Infiltration

Famille `cqc`, ton `stylized` ; 220 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Philanthropy — assaut / M9 tranquillisant.

Plan 1 : SOLID SNAKE — MGS2 sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Philanthropy — assaut / M9 tranquillisant ». Plan 2 : contact de saisie ou neutralisation lié à « Philanthropy — assaut / M9 tranquillisant », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : replacement rapide de la main libre et contrôle du champ, pose de signature face à l’adversaire.

##### M9 — Sommeil profond

Famille `capture`, ton `stylized` ; 238 ticks CQC ; phases actuelles : stun → disarm → restrain → extract. Appuis déclarés : Philanthropy — assaut / Chaff du Tanker.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Philanthropy — assaut / Chaff du Tanker » ; l’espace disponible doit être lisible. Plan 2 : contact de saisie ou neutralisation lié à « Philanthropy — assaut / Chaff du Tanker », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : replacement rapide de la main libre et contrôle du champ, arrêt du dispositif et retour au cadre d’ensemble.

##### Chaff & SOCOM

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Philanthropy — assaut / Saisie de Philanthropy.

Plan 1 : approche jusqu’à la distance réelle de « Philanthropy — assaut / Saisie de Philanthropy », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Philanthropy — assaut / Saisie de Philanthropy », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : replacement rapide de la main libre et contrôle du champ, prise de distance et maintien final.

##### Philanthropy Extraction

Famille `cqc`, ton `stylized` ; 274 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Philanthropy — assaut / Projection.

Plan 1 : après une observation ou un repli, SOLID SNAKE — MGS2 reprend l’initiative par « Philanthropy — assaut / Projection ». Plan 2 : contact de saisie ou neutralisation lié à « Philanthropy — assaut / Projection », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : replacement rapide de la main libre et contrôle du champ, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Sixteen physically reviewed independent key poses per facing, 32 total. Walk has two key poses; no full captured motion cycle claim.
- Independent left/right generation preserves canonical anatomical sides; source PNGs stay byte-identical, no mirroring or pixel processing.
- Runtime rects derive from the actual native alpha components. Some rects overlap a neighbor; authored alpha boundary Canvas clip polygons exclude that neighbor while preserving all principal-body pixels above alpha 8.
- One pose may serve several engine move slots. Timings/phase maps are CQC adaptations; original battle geometry, damage, resources and AI are unchanged.
- Weapon small details, fabric folds and face likeness remain stylized. Closest accepted interpretation, no certified pixel-perfect 1:1 fidelity.
- No complete campaign, music or voice work supplied in this sprite candidate.
- No muzzle flash or particles are painted into the shoot poses; most shoot groups contain one aimed-pose keyframe held across phases. Projectile/effect timing remains the engine responsibility.
- M9 sidearm intent was corrected against the official original MGS2 manual icon. Earlier USP-intent atlases remain preserved and are not selected. Weapon fine detail remains stylized at sprite scale.
- [Original-game capture / original publisher character art physically viewed before generation; canonical incarnation reference.](https://www.konami.com/mg/archive/mgs2/english/chara/pic/chara_snake.gif) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original-game capture / original publisher character art physically viewed before generation; canonical incarnation reference.](https://www.konami.com/mg/archive/mgs2/english/chara/pic/pic_snake01.gif) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original-game capture / original publisher character art physically viewed before generation; canonical incarnation reference.](https://metalgear.konami.net/manual/mc1/mgs2/ps5/en/img/22_icon01.png) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__olga_mgs2

### OLGA — TANKER — MGS2 / RENFORTS

**Rôle :** Pistolet et défense proche. **Profil :** `pistol`.

**Base présente dans le code :** Combattante humaine du Tanker ; aucune lame ni armure de ninja à cette époque.

**Incarnation à conserver :** Olga Tanker encounter, sleeveless striped top

**État vérifié :** métadonnées natives avec limites. 32 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, attack, hit, ko, punch, low, throw, deploy, shoot, reload, recover, parry.

**Réemplois à examiner :** `punch` = light, heavy ; `throw` = throw, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** special, specialDown, super, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `retro-msx`, `tuxedo`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** OLGA — TANKER : main forte et main de soutien identifiées sur le pistolet, coudes contenus. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas prudents sans inverser l’étui ni la main forte. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Pistolet et défense proche » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder main forte et main de soutien identifiées sur le pistolet, coudes contenus.
- **jump_land :** OLGA — TANKER : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas prudents sans inverser l’étui ni la main forte. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de OLGA — TANKER. Terminer par recul du poignet puis stabilisation du canon. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS2 / RENFORTS », présentation de Olga Tanker encounter, sleeveless striped top, puis main forte et main de soutien identifiées sur le pistolet, coudes contenus. Geste court lié à « USP d’Olga » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, recul du poignet puis stabilisation du canon ; OLGA — TANKER vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS2 / RENFORTS.
- **round_loss :** Proposition CQC : OLGA — TANKER réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Rafale du pont », revenir par recul du poignet puis stabilisation du canon, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLGA — TANKER, préparer « Jab » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLGA — TANKER, préparer « Frappe engagée » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLGA — TANKER, préparer « Balayage » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLGA — TANKER, préparer « Projection » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recul du poignet puis stabilisation du canon. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — USP d’Olga

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLGA — TANKER, préparer « USP d’Olga » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Montrer la prise et la visée de l’arme décrite par « USP d’Olga » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Grenade du pont

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLGA — TANKER, préparer « Grenade du pont » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Prélever l’objet correspondant à « Grenade du pont », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Crosse rapprochée

**Existant :** `melee` / `grapple` ; 10/3/32 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLGA — TANKER, préparer « Crosse rapprochée » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recul du poignet puis stabilisation du canon. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Hors de portée ou saut ; ne saisir ni cible aérienne ni cible sous protection post-projection.

##### specialBack — Repli du Tanker

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `walk`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLGA — TANKER, préparer « Repli du Tanker » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer l’appui qui produit le déplacement ; pas prudents sans inverser l’étui ni la main forte.

**Action.** Exécuter « Repli du Tanker » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** recul du poignet puis stabilisation du canon. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Rafale du pont

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLGA — TANKER, préparer « Rafale du pont » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Montrer la prise et la visée de l’arme décrite par « Rafale du pont » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLGA — TANKER, préparer « Recharger » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** recul du poignet puis stabilisation du canon. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Rafale du pont — Final

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Rafale du pont / USP d’Olga.

Plan 1 : OLGA — TANKER sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Rafale du pont / USP d’Olga ». Plan 2 : présenter l’arme effectivement associée à « Rafale du pont / USP d’Olga », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : recul du poignet puis stabilisation du canon, pose de signature face à l’adversaire.

##### USP d’Olga / Grenade du pont

Famille `ballistic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Rafale du pont / Grenade du pont.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Rafale du pont / Grenade du pont » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Rafale du pont / Grenade du pont », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : recul du poignet puis stabilisation du canon, arrêt du dispositif et retour au cadre d’ensemble.

##### Crosse rapprochée — Point final

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Rafale du pont / Crosse rapprochée.

Plan 1 : approche jusqu’à la distance réelle de « Rafale du pont / Crosse rapprochée », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Rafale du pont / Crosse rapprochée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : recul du poignet puis stabilisation du canon, prise de distance et maintien final.

##### Lecture rapprochée — Mission close

Famille `ballistic`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Rafale du pont / Projection.

Plan 1 : après une observation ou un repli, OLGA — TANKER reprend l’initiative par « Rafale du pont / Projection ». Plan 2 : présenter l’arme effectivement associée à « Rafale du pont / Projection », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : recul du poignet puis stabilisation du canon, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Sixteen physically reviewed independent key poses per facing, 32 total. Walk has two key poses; no full captured motion cycle claim.
- Independent left/right generation preserves canonical anatomical sides; source PNGs stay byte-identical, no mirroring or pixel processing.
- Runtime rects derive from the actual native alpha components. Some rects overlap a neighbor; authored alpha boundary Canvas clip polygons exclude that neighbor while preserving all principal-body pixels above alpha 8.
- One pose may serve several engine move slots. Timings/phase maps are CQC adaptations; original battle geometry, damage, resources and AI are unchanged.
- Weapon small details, fabric folds and face likeness remain stylized. Closest accepted interpretation, no certified pixel-perfect 1:1 fidelity.
- No complete campaign, music or voice work supplied in this sprite candidate.
- No muzzle flash or particles are painted into the shoot poses; most shoot groups contain one aimed-pose keyframe held across phases. Projectile/effect timing remains the engine responsibility.
- [Original-game capture / original publisher character art physically viewed before generation; canonical incarnation reference.](https://www.konami.com/mg/archive/mgs2/english/chara/pic/chara_olga.gif) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original-game capture / original publisher character art physically viewed before generation; canonical incarnation reference.](https://www.konami.com/mg/archive/mgs2/english/chara/pic/pic_olga01.gif) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__olga_ninja

### OLGA — NINJA — MGS2 / RENFORTS

**Rôle :** Lame, déviation et furtivité. **Profil :** `ninja`.

**Base présente dans le code :** Incarnation exosquelette de MGS2 ; pas le corps cyborg de Revengeance.

**Incarnation à conserver :** Mr. X exoskeleton at Big Shell, original PS2

**État vérifié :** métadonnées natives avec limites. 32 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, attack, hit, ko, punch, low, throw, deploy, shoot, reload, recover, parry, blade.

**Réemplois à examiner :** `blade` = light, heavy, special, specialDown, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialForward, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `tuxedo`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** OLGA — NINJA : centre bas, main et fourreau orientés selon cette incarnation. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** appuis souples, accélération puis arrêt net avant une coupe. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Lame, déviation et furtivité » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder centre bas, main et fourreau orientés selon cette incarnation.
- **jump_land :** OLGA — NINJA : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. appuis souples, accélération puis arrêt net avant une coupe. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de OLGA — NINJA. Terminer par finir l’arc de lame puis reprendre la garde sans traverser le corps. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS2 / RENFORTS », présentation de Mr. X exoskeleton at Big Shell, original PS2, puis centre bas, main et fourreau orientés selon cette incarnation. Geste court lié à « Coupe de l’exosquelette » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, finir l’arc de lame puis reprendre la garde sans traverser le corps ; OLGA — NINJA vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS2 / RENFORTS.
- **round_loss :** Proposition CQC : OLGA — NINJA réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Soutien du ninja », revenir par finir l’arc de lame puis reprendre la garde sans traverser le corps, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Contact de lame

**Existant :** `melee` / `blade` ; 7/3/12 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLGA — NINJA, préparer « Contact de lame » ; centre bas, main et fourreau orientés selon cette incarnation. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Coupe engagée

**Existant :** `melee` / `blade` ; 18/5/24 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLGA — NINJA, préparer « Coupe engagée » ; centre bas, main et fourreau orientés selon cette incarnation. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLGA — NINJA, préparer « Balayage » ; centre bas, main et fourreau orientés selon cette incarnation. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLGA — NINJA, préparer « Projection » ; centre bas, main et fourreau orientés selon cette incarnation. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Coupe de l’exosquelette

**Existant :** `melee` / `blade` ; 13/5/24 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLGA — NINJA, préparer « Coupe de l’exosquelette » ; centre bas, main et fourreau orientés selon cette incarnation. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde puis punition ; la lame ne touche qu’une fois par attaque.

##### specialDown — Remontée du ninja

**Existant :** `melee` / `blade` ; 21/4/33 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLGA — NINJA, préparer « Remontée du ninja » ; centre bas, main et fourreau orientés selon cette incarnation. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer ou espacer ; la remontée est punissable en garde.

##### specialForward — Camouflage du ninja

**Existant :** `buff` / `stealth` ; 19/1/27 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLGA — NINJA, préparer « Camouflage du ninja » ; centre bas, main et fourreau orientés selon cette incarnation. Montrer la préparation corporelle ou mécanique de « Camouflage du ninja ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Silhouette translucide, collision intacte ; une attaque ou un impact brise le camouflage.

##### specialBack — Interception du ninja

**Existant :** `parry` / `counter` ; 5/12/28 ticks ; groupe `parry`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLGA — NINJA, préparer « Interception du ninja » ; centre bas, main et fourreau orientés selon cette incarnation. Présenter la surface ou l’organe de parade et maintenir une fenêtre courte lisible.

**Action.** Recevoir puis dévier au contact réel pour « Interception du ninja » ; la riposte et son effet n’apparaissent qu’après succès. Une attente sans contact garde une pose différente du contre réussi.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Séparer sortie ratée, blocage simple et riposte ; aucun effet de réussite avant collision.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Projections, attaques au corps à corps et explosifs au sol ne sont pas renvoyés.

##### super — Soutien du ninja

**Existant :** `melee` / `blade` ; 25/7/44 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLGA — NINJA, préparer « Soutien du ninja » ; centre bas, main et fourreau orientés selon cette incarnation. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Stabiliser la réserve

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLGA — NINJA, préparer « Stabiliser la réserve » ; centre bas, main et fourreau orientés selon cette incarnation. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Stabiliser la réserve ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Soutien du ninja — Final

Famille `blade`, ton `stylized` ; 220 ticks CQC ; phases actuelles : dash → crosscut → freeze → sheath. Appuis déclarés : Soutien du ninja / Coupe de l’exosquelette.

Plan 1 : OLGA — NINJA sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Soutien du ninja / Coupe de l’exosquelette ». Plan 2 : armer la lame ou le membre de « Soutien du ninja / Coupe de l’exosquelette » et dégager son arc. Plan 3 : enchaîner des coupes lisibles avec angles distincts ; les impacts et les réactions suivent le fil de lame, sans ajout d’arme d’une autre incarnation. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : finir l’arc de lame puis reprendre la garde sans traverser le corps, pose de signature face à l’adversaire.

##### Coupe de l’exosquelette / Remontée du ninja

Famille `blade`, ton `stylized` ; 238 ticks CQC ; phases actuelles : dash → crosscut → freeze → sheath. Appuis déclarés : Soutien du ninja / Remontée du ninja.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Soutien du ninja / Remontée du ninja » ; l’espace disponible doit être lisible. Plan 2 : armer la lame ou le membre de « Soutien du ninja / Remontée du ninja » et dégager son arc. Plan 3 : enchaîner des coupes lisibles avec angles distincts ; les impacts et les réactions suivent le fil de lame, sans ajout d’arme d’une autre incarnation. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : finir l’arc de lame puis reprendre la garde sans traverser le corps, arrêt du dispositif et retour au cadre d’ensemble.

##### Camouflage du ninja — Point final

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Soutien du ninja / Camouflage du ninja.

Plan 1 : approche jusqu’à la distance réelle de « Soutien du ninja / Camouflage du ninja », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Soutien du ninja / Camouflage du ninja », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : finir l’arc de lame puis reprendre la garde sans traverser le corps, prise de distance et maintien final.

##### Cellules électrolytiques — Mission close

Famille `blade`, ton `stylized` ; 274 ticks CQC ; phases actuelles : dash → crosscut → freeze → sheath. Appuis déclarés : Soutien du ninja / Projection.

Plan 1 : après une observation ou un repli, OLGA — NINJA reprend l’initiative par « Soutien du ninja / Projection ». Plan 2 : armer la lame ou le membre de « Soutien du ninja / Projection » et dégager son arc. Plan 3 : enchaîner des coupes lisibles avec angles distincts ; les impacts et les réactions suivent le fil de lame, sans ajout d’arme d’une autre incarnation. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : finir l’arc de lame puis reprendre la garde sans traverser le corps, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Sixteen physically reviewed independent key poses per facing, 32 total. Walk has two key poses; no full captured motion cycle claim.
- Independent left/right generation preserves canonical anatomical sides; source PNGs stay byte-identical, no mirroring or pixel processing.
- Runtime rects derive from the actual native alpha components. Some rects overlap a neighbor; authored alpha boundary Canvas clip polygons exclude that neighbor while preserving all principal-body pixels above alpha 8.
- One pose may serve several engine move slots. Timings/phase maps are CQC adaptations; original battle geometry, damage, resources and AI are unchanged.
- Weapon small details, fabric folds and face likeness remain stylized. Closest accepted interpretation, no certified pixel-perfect 1:1 fidelity.
- No complete campaign, music or voice work supplied in this sprite candidate.
- No muzzle flash or particles are painted into the shoot poses; most shoot groups contain one aimed-pose keyframe held across phases. Projectile/effect timing remains the engine responsibility.
- Blade action uses actual draw/attack/resheath or knife readiness/throw/retrieve key poses; wide motion and additional canonical combos remain adaptation scope. No firearm depicted.
- [Original-game capture / original publisher character art physically viewed before generation; canonical incarnation reference.](https://lparchive.org/Metal-Gear-Solid-2-(Screenshot)/Update%2018/mgs2_5_f74.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original-game capture / original publisher character art physically viewed before generation; canonical incarnation reference.](https://lparchive.org/Metal-Gear-Solid-2-(Screenshot)/Update%2018/mgs2_10_72e.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original-game capture / original publisher character art physically viewed before generation; canonical incarnation reference.](https://lparchive.org/Metal-Gear-Solid-2-(Screenshot)/Update%2018/mgs2_2_e0d.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__ocelot_mgs2

### OCELOT — MGS2 — MGS2 / RENFORTS

**Rôle :** Six coups et ricochet limité. **Profil :** `ocelot`.

**Base présente dans le code :** Ocelot utilise le revolver ; Liquid Ocelot reste une entrée CQC différente.

**Incarnation à conserver :** MGS2 older Ocelot with Liquid transplanted right arm

**État vérifié :** métadonnées natives avec limites. 32 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, attack, hit, ko, punch, low, throw, deploy, shoot, reload, recover, parry.

**Réemplois à examiner :** `punch` = light, heavy ; `shoot` = special, specialDown, super.

**Techniques pointant sur une seule région native dans la direction principale :** special, specialDown, specialBack, super, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `retro-msx`, `tuxedo`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** OCELOT — MGS2 : poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas latéraux et regard indépendant des rotations d’arme. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Six coups et ricochet limité » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder poignets, revolvers et étuis propres à cet âge ; manipulation identifiable.
- **jump_land :** OCELOT — MGS2 : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas latéraux et regard indépendant des rotations d’arme. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de OCELOT — MGS2. Terminer par replacer chaque arme sans changer sa main ni téléporter les cartouches. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS2 / RENFORTS », présentation de MGS2 older Ocelot with Liquid transplanted right arm, puis poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Geste court lié à « Ricochet du Tanker » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, replacer chaque arme sans changer sa main ni téléporter les cartouches ; OCELOT — MGS2 vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS2 / RENFORTS.
- **round_loss :** Proposition CQC : OCELOT — MGS2 réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Six coups du Tanker », revenir par replacer chaque arme sans changer sa main ni téléporter les cartouches, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OCELOT — MGS2, préparer « Jab » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OCELOT — MGS2, préparer « Frappe engagée » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OCELOT — MGS2, préparer « Balayage » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OCELOT — MGS2, préparer « Projection » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Ricochet du Tanker

**Existant :** `projectile` / `precision` ; 15/1/24 ticks ; groupe `shoot`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OCELOT — MGS2, préparer « Ricochet du Tanker » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Montrer la prise et la visée de l’arme décrite par « Ricochet du Tanker » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. Prévoir le ricochet comme événement de l’objet ; le corps ne se réoriente pas automatiquement vers la cible.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Six munitions puis recharge ; le ricochet rebondit une fois, pas de tir infini.

##### specialDown — Coup bas au revolver

**Existant :** `projectile` / `ballistic` ; 23/1/22 ticks ; groupe `shoot`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OCELOT — MGS2, préparer « Coup bas au revolver » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Montrer la prise et la visée de l’arme décrite par « Coup bas au revolver » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialForward — Pas de tireur

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `walk`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OCELOT — MGS2, préparer « Pas de tireur » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Préparer l’appui qui produit le déplacement ; pas latéraux et regard indépendant des rotations d’arme.

**Action.** Exécuter « Pas de tireur » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### specialBack — Crosse de revers

**Existant :** `parry` / `counter` ; 3/10/29 ticks ; groupe `parry`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OCELOT — MGS2, préparer « Crosse de revers » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Présenter la surface ou l’organe de parade et maintenir une fenêtre courte lisible.

**Action.** Recevoir puis dévier au contact réel pour « Crosse de revers » ; la riposte et son effet n’apparaissent qu’après succès. Une attente sans contact garde une pose différente du contre réussi.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches. Séparer sortie ratée, blocage simple et riposte ; aucun effet de réussite avant collision.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Retarder la frappe, projeter ou attendre les 29 images de récupération.

##### super — Six coups du Tanker

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OCELOT — MGS2, préparer « Six coups du Tanker » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Montrer la prise et la visée de l’arme décrite par « Six coups du Tanker » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Exige six cartouches et 50 TACTIC. Accroupissement sous les tirs hauts, saut ou interruption avant départ ; aucun rechargement gratuit.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OCELOT — MGS2, préparer « Recharger » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Six coups du Tanker

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Six coups du Tanker / Ricochet du Tanker.

Plan 1 : OCELOT — MGS2 sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Six coups du Tanker / Ricochet du Tanker ». Plan 2 : présenter l’arme effectivement associée à « Six coups du Tanker / Ricochet du Tanker », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : replacer chaque arme sans changer sa main ni téléporter les cartouches, pose de signature face à l’adversaire.

##### Ricochet du patriote

Famille `sniper`, ton `stylized` ; 238 ticks CQC ; phases actuelles : mark → steady → shot → fade. Appuis déclarés : Six coups du Tanker / Coup bas au revolver.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Six coups du Tanker / Coup bas au revolver » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Six coups du Tanker / Coup bas au revolver », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : replacer chaque arme sans changer sa main ni téléporter les cartouches, arrêt du dispositif et retour au cadre d’ensemble.

##### Crosse de revers

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Six coups du Tanker / Pas de tireur.

Plan 1 : approche jusqu’à la distance réelle de « Six coups du Tanker / Pas de tireur », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Six coups du Tanker / Pas de tireur », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : replacer chaque arme sans changer sa main ni téléporter les cartouches, prise de distance et maintien final.

##### La dernière balle

Famille `ballistic`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Six coups du Tanker / Projection.

Plan 1 : après une observation ou un repli, OCELOT — MGS2 reprend l’initiative par « Six coups du Tanker / Projection ». Plan 2 : présenter l’arme effectivement associée à « Six coups du Tanker / Projection », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : replacer chaque arme sans changer sa main ni téléporter les cartouches, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Sixteen physically reviewed independent key poses per facing, 32 total. Walk has two key poses; no full captured motion cycle claim.
- Independent left/right generation preserves canonical anatomical sides; source PNGs stay byte-identical, no mirroring or pixel processing.
- Runtime rects derive from the actual native alpha components. Some rects overlap a neighbor; authored alpha boundary Canvas clip polygons exclude that neighbor while preserving all principal-body pixels above alpha 8.
- One pose may serve several engine move slots. Timings/phase maps are CQC adaptations; original battle geometry, damage, resources and AI are unchanged.
- Weapon small details, fabric folds and face likeness remain stylized. Closest accepted interpretation, no certified pixel-perfect 1:1 fidelity.
- No complete campaign, music or voice work supplied in this sprite candidate.
- No muzzle flash or particles are painted into the shoot poses; most shoot groups contain one aimed-pose keyframe held across phases. Projectile/effect timing remains the engine responsibility.
- [Original-game capture / original publisher character art physically viewed before generation; canonical incarnation reference.](https://www.konami.com/mg/archive/mgs2/english/chara/pic/chara_ocelot.gif) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original-game capture / original publisher character art physically viewed before generation; canonical incarnation reference.](https://www.konami.com/mg/archive/mgs2/english/chara/pic/pic_ocelot01.gif) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__eva_mgs3

### EVA — MGS3 — MGS3 / RENFORTS

**Rôle :** Pistolet et défense proche. **Profil :** `pistol`.

**Base présente dans le code :** Espionne armée ; la technique de moto reste dans les missions et n’apparaît pas hors écran gratuitement.

**Incarnation à conserver :** Original PS2 adult EVA, motorcycle clothing and right-thigh Mauser holster; no Delta, MPO or Big Mama blend

**État vérifié :** métadonnées natives avec limites. 72 régions source distinctes dans les deux directions ; groupes : idle, walk, guard, crouch, jump, punch, heavy, low, hit, ko, shoot, deploy, throw, recover, attack.

**Réemplois à examiner :** `throw` = throw, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `appearance-npc53-tatyana-mgs3`, `retro-msx`, `tuxedo`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** EVA — MGS3 : main forte et main de soutien identifiées sur le pistolet, coudes contenus. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas prudents sans inverser l’étui ni la main forte. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Pistolet et défense proche » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder main forte et main de soutien identifiées sur le pistolet, coudes contenus.
- **jump_land :** EVA — MGS3 : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas prudents sans inverser l’étui ni la main forte. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de EVA — MGS3. Terminer par recul du poignet puis stabilisation du canon. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS3 / RENFORTS », présentation de Original PS2 adult EVA, motorcycle clothing and right-thigh Mauser holster; no Delta, MPO or Big Mama blend, puis main forte et main de soutien identifiées sur le pistolet, coudes contenus. Geste court lié à « Mauser — tir d’EVA » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, recul du poignet puis stabilisation du canon ; EVA — MGS3 vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS3 / RENFORTS.
- **round_loss :** Proposition CQC : EVA — MGS3 réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Couverture au Mauser — adaptation », revenir par recul du poignet puis stabilisation du canon, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de EVA — MGS3, préparer « Jab » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de EVA — MGS3, préparer « Frappe engagée » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de EVA — MGS3, préparer « Balayage » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de EVA — MGS3, préparer « Projection » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recul du poignet puis stabilisation du canon. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Mauser — tir d’EVA

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de EVA — MGS3, préparer « Mauser — tir d’EVA » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Montrer la prise et la visée de l’arme décrite par « Mauser — tir d’EVA » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Mauser à genou — adaptation

**Existant :** `projectile` / `ballistic` ; 24/1/31 ticks ; groupe `deploy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de EVA — MGS3, préparer « Mauser à genou — adaptation » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Montrer la prise et la visée de l’arme décrite par « Mauser à genou — adaptation » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialForward — Prise de proximité

**Existant :** `melee` / `grapple` ; 10/3/32 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de EVA — MGS3, préparer « Prise de proximité » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recul du poignet puis stabilisation du canon. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Hors de portée ou saut ; ne saisir ni cible aérienne ni cible sous protection post-projection.

##### specialBack — Écart d’EVA

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `walk`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de EVA — MGS3, préparer « Écart d’EVA » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer l’appui qui produit le déplacement ; pas prudents sans inverser l’étui ni la main forte.

**Action.** Exécuter « Écart d’EVA » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** recul du poignet puis stabilisation du canon. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Couverture au Mauser — adaptation

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de EVA — MGS3, préparer « Couverture au Mauser — adaptation » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Montrer la prise et la visée de l’arme décrite par « Couverture au Mauser — adaptation » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `recover`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de EVA — MGS3, préparer « Recharger » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** recul du poignet puis stabilisation du canon. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Couverture au Mauser — adaptation — conclusion

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → shot → impact → pose. Appuis déclarés : Couverture au Mauser — adaptation.

Plan 1 : EVA — MGS3 sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Couverture au Mauser — adaptation ». Plan 2 : présenter l’arme effectivement associée à « Couverture au Mauser — adaptation », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : recul du poignet puis stabilisation du canon, pose de signature face à l’adversaire.

##### Mauser à genou — adaptation — conclusion

Famille `ballistic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → shot → impact → pose. Appuis déclarés : Mauser à genou — adaptation.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Mauser à genou — adaptation » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Mauser à genou — adaptation », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : recul du poignet puis stabilisation du canon, arrêt du dispositif et retour au cadre d’ensemble.

##### Mauser — tir d’EVA — conclusion

Famille `ballistic`, ton `stylized` ; 256 ticks CQC ; phases actuelles : aim → shot → impact → pose. Appuis déclarés : Mauser — tir d’EVA.

Plan 1 : approche jusqu’à la distance réelle de « Mauser — tir d’EVA », arme et main libre identifiées. Plan 2 : présenter l’arme effectivement associée à « Mauser — tir d’EVA », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : recul du poignet puis stabilisation du canon, prise de distance et maintien final.

##### Projection — conclusion

Famille `ballistic`, ton `stylized` ; 274 ticks CQC ; phases actuelles : approach → grapple → impact → pose. Appuis déclarés : Projection.

Plan 1 : après une observation ou un repli, EVA — MGS3 reprend l’initiative par « Projection ». Plan 2 : présenter l’arme effectivement associée à « Projection », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : recul du poignet puis stabilisation du canon, rangement/pose finale différente des trois autres.

#### Limites et preuves

- The target is faithful original MGS3 PS2 source appearance, closest_supported; no absolute 1:1 model, animation, seam, palette or pixel certification.
- Original Konami model proves adult EVA honey blonde medium layered hair, goggles at neck, ochre/brown open motorcycle clothing over black undergarment, dark gloves, black tall laced boots, belt and anatomical RIGHT thigh holster. Original official page says Uses a Mauser; precise C96/Chinese Type17 designation and exact loading mechanism are not primary-source certified.
- All 72 authored versus poses, strikes, guard/jump/KO, two aimed firing groups, CQC and restrained occluded reload are authored 2D adaptations, not source-extracted animations. No grenade, SMG, long gun, psychic effect or separate motorcycle is invented. Six-shot super and ammunition are root-owned adapted gameplay, not canonical duel balance.
- Independent facings are not reflected. A LEFT01 ignored facing and is rejected; C LEFT02 had an opaque dark background patch and cannot be used; C LEFT03 had a second anatomical-left holster and is rejected. C LEFT04 corrects to the single anatomical-right far-side holster. C RIGHT01/C LEFT01 are conserved pre-reload variations. Every original and prompt remains preserved. Imagegen edits can also alter untargeted body rendering; source bytes of earlier variations are untouched and no exact first9-cell preservation is claimed.
- Closely spaced source bodies need recorded Canvas contours; their source alpha/PNG bytes remain unchanged. Strongly lowered poses retain upright source scale. Reviewer physically viewed every selected complete source sheet and every12 cells, not runtime renders. Root must independently view final Canvas crops, phases, origins/collisions and mobile/desktop.
- Moonlit original PS2 cutscene lighting and tiny official GIF do not certify exact leather material response, braid/finger topology, reverse stitching or Mauser machining details. The small illustrated long-barrel/broomhandle form is source-supported approximation; no modern detachable magazine or exact Type17 promise.
- Generated choreography, scales, frame timings and statistics are versus adaptations.
- [Original Konami PS2 full-body model, costume/hair/boots/right holster/goggles. Official model physically viewed.](https://www.konami.com/mg/archive/mgs3/english/pic/chara_eva_pic.gif) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Official text: Uses a Mauser. A motorbike fanatic. Exact handgun subtype not stated.](https://www.konami.com/mg/archive/mgs3/english/chara_eva.html) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original PS2 EVA speaking, honey-blonde layered hair, face and motorcycle jacket under blue night lighting. Not color calibration.](https://archive.org/download/PS2_Longplay-001-Metal_Gear_Solid_3-Snake_Eater/PS2_Longplay-001-Metal_Gear_Solid_3-Snake_Eater.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original PS2 full-body standing EVA beside Snake. Low resolution/overhead lighting occludes seams; not weapon model proof.](https://archive.org/download/PS2_Longplay-001-Metal_Gear_Solid_3-Snake_Eater/PS2_Longplay-001-Metal_Gear_Solid_3-Snake_Eater.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__meryl_mgs4

### MERYL — RAT PATROL — MGS4 / RENFORTS

**Rôle :** Tir, grenades et distance. **Profil :** `soldier`.

**Base présente dans le code :** Meryl dirige Rat Patrol ; pas la même expérience que sa version MGS1.

**Incarnation à conserver :** Rat Patrol Team 01, 2014 combat uniform

**État vérifié :** métadonnées natives avec limites. 32 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, attack, hit, ko, punch, low, throw, deploy, shoot, reload, recover, parry.

**Réemplois à examiner :** `punch` = light, heavy, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** special, specialDown, super, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `tuxedo`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** MERYL — RAT PATROL : appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas courts, crosse/équipement conservés près du torse. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Tir, grenades et distance » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder appui militaire stable, arme maintenue dans l’axe et regard vers la menace.
- **jump_land :** MERYL — RAT PATROL : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas courts, crosse/équipement conservés près du torse. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de MERYL — RAT PATROL. Terminer par retour en couverture de l’arme après le coup. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS4 / RENFORTS », présentation de Rat Patrol Team 01, 2014 combat uniform, puis appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Geste court lié à « Tir Rat Patrol » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, retour en couverture de l’arme après le coup ; MERYL — RAT PATROL vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS4 / RENFORTS.
- **round_loss :** Proposition CQC : MERYL — RAT PATROL réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Ordre de feu », revenir par retour en couverture de l’arme après le coup, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MERYL — RAT PATROL, préparer « Jab » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MERYL — RAT PATROL, préparer « Frappe engagée » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MERYL — RAT PATROL, préparer « Balayage » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MERYL — RAT PATROL, préparer « Projection » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** retour en couverture de l’arme après le coup. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Tir Rat Patrol

**Existant :** `projectile` / `ballistic` ; 22/1/36 ticks ; groupe `shoot`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MERYL — RAT PATROL, préparer « Tir Rat Patrol » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Tir Rat Patrol » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 3 émissions, espacées de 5 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 3 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### specialDown — Grenade coordonnée

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MERYL — RAT PATROL, préparer « Grenade coordonnée » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Prélever l’objet correspondant à « Grenade coordonnée », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Entrée de commandante

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MERYL — RAT PATROL, préparer « Entrée de commandante » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Entrée de commandante » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Repli de section

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `walk`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MERYL — RAT PATROL, préparer « Repli de section » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer l’appui qui produit le déplacement ; pas courts, crosse/équipement conservés près du torse.

**Action.** Exécuter « Repli de section » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** retour en couverture de l’arme après le coup. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Ordre de feu

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MERYL — RAT PATROL, préparer « Ordre de feu » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Ordre de feu » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MERYL — RAT PATROL, préparer « Recharger » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** retour en couverture de l’arme après le coup. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Ordre de feu — Final

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Ordre de feu / Tir Rat Patrol.

Plan 1 : MERYL — RAT PATROL sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Ordre de feu / Tir Rat Patrol ». Plan 2 : présenter l’arme effectivement associée à « Ordre de feu / Tir Rat Patrol », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : retour en couverture de l’arme après le coup, pose de signature face à l’adversaire.

##### Tir Rat Patrol / Grenade coordonnée

Famille `ballistic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Ordre de feu / Grenade coordonnée.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Ordre de feu / Grenade coordonnée » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Ordre de feu / Grenade coordonnée », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : retour en couverture de l’arme après le coup, arrêt du dispositif et retour au cadre d’ensemble.

##### Entrée de commandante — Point final

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Ordre de feu / Entrée de commandante.

Plan 1 : approche jusqu’à la distance réelle de « Ordre de feu / Entrée de commandante », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Ordre de feu / Entrée de commandante », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : retour en couverture de l’arme après le coup, prise de distance et maintien final.

##### Sang-froid — Mission close

Famille `ballistic`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Ordre de feu / Projection.

Plan 1 : après une observation ou un repli, MERYL — RAT PATROL reprend l’initiative par « Ordre de feu / Projection ». Plan 2 : présenter l’arme effectivement associée à « Ordre de feu / Projection », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : retour en couverture de l’arme après le coup, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Sixteen physically reviewed independent key poses per facing, 32 total. Walk has two key poses; no full captured motion cycle claim.
- Independent left/right generation preserves canonical anatomical sides; source PNGs stay byte-identical, no mirroring or pixel processing.
- Runtime rects derive from the actual native alpha components. Some rects overlap a neighbor; authored alpha boundary Canvas clip polygons exclude that neighbor while preserving all principal-body pixels above alpha 8.
- One pose may serve several engine move slots. Timings/phase maps are CQC adaptations; original battle geometry, damage, resources and AI are unchanged.
- Weapon small details, fabric folds and face likeness remain stylized. Closest accepted interpretation, no certified pixel-perfect 1:1 fidelity.
- No complete campaign, music or voice work supplied in this sprite candidate.
- No muzzle flash or particles are painted into the shoot poses; most shoot groups contain one aimed-pose keyframe held across phases. Projectile/effect timing remains the engine responsibility.
- [Original-game capture / original publisher character art physically viewed before generation; canonical incarnation reference.](https://www.creativeuncut.com/gallery-06/art/mgs4-meryl-silverburgh1.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__johnny_mgs4

### JOHNNY / AKIBA — MGS4 / RENFORTS

**Rôle :** Tir, grenades et distance. **Profil :** `soldier`.

**Base présente dans le code :** Akiba emploie des armes conventionnelles, sans pouvoirs SOP ajoutés.

**Incarnation à conserver :** Rat Patrol Team 01, masked combat uniform

**État vérifié :** métadonnées natives avec limites. 32 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, attack, hit, ko, punch, low, throw, deploy, shoot, reload, recover, parry.

**Réemplois à examiner :** `punch` = light, heavy, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** special, specialDown, super, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `retro-msx`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** JOHNNY / AKIBA : appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas courts, crosse/équipement conservés près du torse. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Tir, grenades et distance » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder appui militaire stable, arme maintenue dans l’axe et regard vers la menace.
- **jump_land :** JOHNNY / AKIBA : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas courts, crosse/équipement conservés près du torse. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de JOHNNY / AKIBA. Terminer par retour en couverture de l’arme après le coup. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS4 / RENFORTS », présentation de Rat Patrol Team 01, masked combat uniform, puis appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Geste court lié à « Arme d’Akiba » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, retour en couverture de l’arme après le coup ; JOHNNY / AKIBA vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS4 / RENFORTS.
- **round_loss :** Proposition CQC : JOHNNY / AKIBA réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Tir de couverture », revenir par retour en couverture de l’arme après le coup, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JOHNNY / AKIBA, préparer « Jab » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JOHNNY / AKIBA, préparer « Frappe engagée » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JOHNNY / AKIBA, préparer « Balayage » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JOHNNY / AKIBA, préparer « Projection » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** retour en couverture de l’arme après le coup. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Arme d’Akiba

**Existant :** `projectile` / `precision` ; 39/1/47 ticks ; groupe `shoot`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JOHNNY / AKIBA, préparer « Arme d’Akiba » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Arme d’Akiba » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Laser et armement visibles ; accroupissement ou approche pendant 46 images avant le tir.

##### specialDown — Grenade de soutien

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JOHNNY / AKIBA, préparer « Grenade de soutien » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Prélever l’objet correspondant à « Grenade de soutien », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Crosse d’urgence

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JOHNNY / AKIBA, préparer « Crosse d’urgence » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Crosse d’urgence » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Repli sans liaison

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `walk`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JOHNNY / AKIBA, préparer « Repli sans liaison » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer l’appui qui produit le déplacement ; pas courts, crosse/équipement conservés près du torse.

**Action.** Exécuter « Repli sans liaison » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** retour en couverture de l’arme après le coup. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Tir de couverture

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JOHNNY / AKIBA, préparer « Tir de couverture » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Tir de couverture » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JOHNNY / AKIBA, préparer « Recharger » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** retour en couverture de l’arme après le coup. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Tir de couverture — Final

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Tir de couverture / Arme d’Akiba.

Plan 1 : JOHNNY / AKIBA sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Tir de couverture / Arme d’Akiba ». Plan 2 : présenter l’arme effectivement associée à « Tir de couverture / Arme d’Akiba », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : retour en couverture de l’arme après le coup, pose de signature face à l’adversaire.

##### Arme d’Akiba / Grenade de soutien

Famille `sniper`, ton `stylized` ; 238 ticks CQC ; phases actuelles : mark → steady → shot → fade. Appuis déclarés : Tir de couverture / Grenade de soutien.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Tir de couverture / Grenade de soutien » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Tir de couverture / Grenade de soutien », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : retour en couverture de l’arme après le coup, arrêt du dispositif et retour au cadre d’ensemble.

##### Crosse d’urgence — Point final

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Tir de couverture / Crosse d’urgence.

Plan 1 : approche jusqu’à la distance réelle de « Tir de couverture / Crosse d’urgence », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Tir de couverture / Crosse d’urgence », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : retour en couverture de l’arme après le coup, prise de distance et maintien final.

##### Sang-froid — Mission close

Famille `ballistic`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Tir de couverture / Projection.

Plan 1 : après une observation ou un repli, JOHNNY / AKIBA reprend l’initiative par « Tir de couverture / Projection ». Plan 2 : présenter l’arme effectivement associée à « Tir de couverture / Projection », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : retour en couverture de l’arme après le coup, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Sixteen physically reviewed independent key poses per facing, 32 total. Walk has two key poses; no full captured motion cycle claim.
- Independent left/right generation preserves canonical anatomical sides; source PNGs stay byte-identical, no mirroring or pixel processing.
- Runtime rects derive from the actual native alpha components. Some rects overlap a neighbor; authored alpha boundary Canvas clip polygons exclude that neighbor while preserving all principal-body pixels above alpha 8.
- One pose may serve several engine move slots. Timings/phase maps are CQC adaptations; original battle geometry, damage, resources and AI are unchanged.
- Weapon small details, fabric folds and face likeness remain stylized. Closest accepted interpretation, no certified pixel-perfect 1:1 fidelity.
- No complete campaign, music or voice work supplied in this sprite candidate.
- No muzzle flash or particles are painted into the shoot poses; most shoot groups contain one aimed-pose keyframe held across phases. Projectile/effect timing remains the engine responsibility.
- Native RIGHT low-kick extremity reaches the PNG right edge: 15 border pixels alpha>32, maximum245. LEFT right-edge extremity has8 pixels alpha>32, maximum73. This minor native edge limitation is retained; no pixel reconstruction or perfect-margin claim.
- Earlier P90-intent V1 and compact generic-carbine V2 masters were rejected/preserved. Selected final XM8-intent versions reference the official MGS4 render; optical housing and receiver fine detail remain stylized, no exact weapon-model certificate.
- [Original-game capture / original publisher character art physically viewed before generation; canonical incarnation reference.](https://www.creativeuncut.com/gallery-06/art/mgs4-johnny.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__raiden_mgs4

### RAIDEN — MGS4 — MGS4 / RENFORTS

**Rôle :** Lame HF et mouvement MGS4. **Profil :** `ninja`.

**Base présente dans le code :** Original PS3 silver-gray cyborg, anatomical-right HF sword; no MGR black body/Ripper/Zandatsu transplantation. Contact blade attacks, CQC and visible movement can remain authored; no blade-beam projectile or optical invisibility. Projectile interception is a bounded Versus parry proposal, not certified original sword-deflection timing. Les contacts, collisions, jauges, coûts, durées et cadences sont des adaptations du versus, pas des valeurs des jeux originaux.

**Incarnation à conserver :** Original MGS4 silver-gray cyborg Raiden, never the later MGR black-body incarnation

**État vérifié :** métadonnées natives avec limites. 72 régions source distinctes dans les deux directions ; groupes : idle, walk, guard, crouch, punch, heavy, low, jump, shoot, throw, deploy, recover, hit, ko, charge, attack.

**Réemplois à examiner :** `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `retro-msx`, `tuxedo`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** RAIDEN — MGS4 : centre bas, main et fourreau orientés selon cette incarnation. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** appuis souples, accélération puis arrêt net avant une coupe. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Lame HF et mouvement MGS4 » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder centre bas, main et fourreau orientés selon cette incarnation.
- **jump_land :** RAIDEN — MGS4 : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. appuis souples, accélération puis arrêt net avant une coupe. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de RAIDEN — MGS4. Terminer par finir l’arc de lame puis reprendre la garde sans traverser le corps. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS4 / RENFORTS », présentation de Original MGS4 silver-gray cyborg Raiden, never the later MGR black-body incarnation, puis centre bas, main et fourreau orientés selon cette incarnation. Geste court lié à « Lame HF — 2014 » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, finir l’arc de lame puis reprendre la garde sans traverser le corps ; RAIDEN — MGS4 vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS4 / RENFORTS.
- **round_loss :** Proposition CQC : RAIDEN — MGS4 réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Protection de Snake », revenir par finir l’arc de lame puis reprendre la garde sans traverser le corps, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Contact de lame

**Existant :** `melee` / `blade` ; 7/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN — MGS4, préparer « Contact de lame » ; centre bas, main et fourreau orientés selon cette incarnation. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Coupe engagée

**Existant :** `melee` / `blade` ; 18/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN — MGS4, préparer « Coupe engagée » ; centre bas, main et fourreau orientés selon cette incarnation. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Coupe basse HF — adaptation

**Existant :** `melee` / `blade` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN — MGS4, préparer « Coupe basse HF — adaptation » ; centre bas, main et fourreau orientés selon cette incarnation. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Adaptation du versus : préparation et sortie visibles, garde/saut/espacement adaptés au geste ; aucune invincibilité ou arme supplémentaire.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN — MGS4, préparer « Projection » ; centre bas, main et fourreau orientés selon cette incarnation. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Lame HF — 2014

**Existant :** `melee` / `blade` ; 13/5/24 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN — MGS4, préparer « Lame HF — 2014 » ; centre bas, main et fourreau orientés selon cette incarnation. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde puis punition ; la lame ne touche qu’une fois par attaque.

##### specialDown — Coupe aérienne

**Existant :** `melee` / `blade` ; 21/4/33 ticks ; groupe `jump`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN — MGS4, préparer « Coupe aérienne » ; centre bas, main et fourreau orientés selon cette incarnation. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer ou espacer ; la remontée est punissable en garde.

##### specialForward — Approche du cyborg

**Existant :** `mobility` / `movement` ; 19/12/27 ticks ; groupe `walk`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN — MGS4, préparer « Approche du cyborg » ; centre bas, main et fourreau orientés selon cette incarnation. Préparer l’appui qui produit le déplacement ; appuis souples, accélération puis arrêt net avant une coupe.

**Action.** Exécuter « Approche du cyborg » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 4 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Adaptation du versus : préparation et sortie visibles, garde/saut/espacement adaptés au geste ; aucune invincibilité ou arme supplémentaire.

##### specialBack — Interception HF

**Existant :** `parry` / `counter` ; 5/12/28 ticks ; groupe `guard`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN — MGS4, préparer « Interception HF » ; centre bas, main et fourreau orientés selon cette incarnation. Présenter la surface ou l’organe de parade et maintenir une fenêtre courte lisible.

**Action.** Recevoir puis dévier au contact réel pour « Interception HF » ; la riposte et son effet n’apparaissent qu’après succès. Une attente sans contact garde une pose différente du contre réussi.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Séparer sortie ratée, blocage simple et riposte ; aucun effet de réussite avant collision.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Projections, attaques au corps à corps et explosifs au sol ne sont pas renvoyés.

##### super — Protection de Snake

**Existant :** `melee` / `blade` ; 25/7/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN — MGS4, préparer « Protection de Snake » ; centre bas, main et fourreau orientés selon cette incarnation. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Stabiliser la réserve

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN — MGS4, préparer « Stabiliser la réserve » ; centre bas, main et fourreau orientés selon cette incarnation. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Stabiliser la réserve ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Lame HF — 2014 — conclusion adaptée

Famille `blade`, ton `stylized` ; 220 ticks CQC ; phases actuelles : prepare → contact → confirm → pose. Appuis déclarés : Lame HF — 2014.

Plan 1 : RAIDEN — MGS4 sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Lame HF — 2014 ». Plan 2 : armer la lame ou le membre de « Lame HF — 2014 » et dégager son arc. Plan 3 : enchaîner des coupes lisibles avec angles distincts ; les impacts et les réactions suivent le fil de lame, sans ajout d’arme d’une autre incarnation. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : finir l’arc de lame puis reprendre la garde sans traverser le corps, pose de signature face à l’adversaire.

##### Coupe aérienne — conclusion adaptée

Famille `blade`, ton `stylized` ; 238 ticks CQC ; phases actuelles : prepare → contact → confirm → pose. Appuis déclarés : Coupe aérienne.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Coupe aérienne » ; l’espace disponible doit être lisible. Plan 2 : armer la lame ou le membre de « Coupe aérienne » et dégager son arc. Plan 3 : enchaîner des coupes lisibles avec angles distincts ; les impacts et les réactions suivent le fil de lame, sans ajout d’arme d’une autre incarnation. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : finir l’arc de lame puis reprendre la garde sans traverser le corps, arrêt du dispositif et retour au cadre d’ensemble.

##### Approche du cyborg — conclusion adaptée

Famille `tactical`, ton `stylized` ; 256 ticks CQC ; phases actuelles : prepare → move → settle → pose. Appuis déclarés : Approche du cyborg.

Plan 1 : approche jusqu’à la distance réelle de « Approche du cyborg », arme et main libre identifiées. Plan 2 : matérialiser le geste tactique « Approche du cyborg » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : finir l’arc de lame puis reprendre la garde sans traverser le corps, prise de distance et maintien final.

##### Projection — conclusion adaptée

Famille `cqc`, ton `stylized` ; 274 ticks CQC ; phases actuelles : prepare → contact → confirm → pose. Appuis déclarés : Projection.

Plan 1 : après une observation ou un repli, RAIDEN — MGS4 reprend l’initiative par « Projection ». Plan 2 : contact de saisie ou neutralisation lié à « Projection », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : finir l’arc de lame puis reprendre la garde sans traverser le corps, rangement/pose finale différente des trois autres.

#### Limites et preuves

- References depict attributed original MGS4 concept art with included original-game-model renders, retrieved from independent public Creative Uncut hosting. Primary publisher download authentication is not claimed; this is not an original PS3 gameplay capture or exported animation.
- Original silver-gray MGS4 cyberbody, pale limbs, dark torso, muted gold/olive shoulder armor, original mechanical feet, chin/neck armor, blond hair, HF sword, wrist loop and sheath are the target. MGR black armor, eyepatch and Ripper Mode are excluded from this selected incarnation.
- Fine final-game mesh markings, hidden reverse seams, exact visor hinges, sword dimensions and small fastener detail are closest_supported, not absolute pixel-exact 1:1 certified. C utility is an authored temple/visor gesture; the right source begins with the visor partially lowered, so it is not claimed as an exact original open/down/up animation.
- Punch is a recognized importer group name for an authored HF sword contact combination; shoot is a recognized group name for an authored melee HF cut. Neither means gunfire, emitted blade beams, bullets, teleportation or source-certified move timing/range.
- Every combat phase, grapple, jump, recovery, cost and timer is an authored Versus adaptation. The reference artwork does not certify its hitboxes, optical cloak, energy shield or healing. These native sources alone are not installed gameplay validation.
- hit/ko aliases reuse bowed-effort/one-knee recovery9/10; charge reuses C melee special0..2. They are authored reaction adaptations, not extracted canonical KO/charge animations or extra unique poses.
- Initial layouts and actual decoded grouping proof01 remain intact. Final layouts-rev2 only correct three measurement sample X coordinates that fell between separated hair tips; source heights, pivots, rectangles, stencils, dimensions and every PNG byte remain identical. Actual browser proof02 screenshot bytes also match proof01.
- V2 corrects B body-scale denominators to358px right and361.5px left, the median of same-facing actual A/C neutral-standing measurements (359/357 and364/359). These are explicitly authored scale calibrations, not observed standing B pixels. Actual B321.5/315px extents and samples remain as bentPoseExtent/bentPoseExtentMeasurement; PNG bytes, frames, stencils and pivots remain exact. Actual Canvas fixed230px reference scaling was physically reviewed across A0/B0/B4/C6 in both facings; this is not installed gameplay QA or exact canonical height certification.
- Generated combat phases and calibrated versus parameters are authored adaptations, not extracted original game animations or absolute pixel/model1:1 certification.
- [Original MGS4 character concept sheet with included full-body game-model render, front/back anatomy, silver-gray armor, collar/temple visor/face and right-hand HF sword details. Concept sketches are qualified; fine final-game mesh markings not fully resolved.](https://www.creativeuncut.com/gallery-06/art/mgs4-raiden-character-art.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original MGS4 character concept sheet with included full-body game-model render, front/back anatomy, silver-gray armor, collar/temple visor/face and right-hand HF sword details. Concept sketches are qualified; fine final-game mesh markings not fully resolved.](https://www.creativeuncut.com/gallery-06/art/mgs4-raiden-artwork.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__vamp_mgs4

### VAMP — MGS4 — MGS4 / RENFORTS

**Rôle :** Couteaux, mobilité et réparation plafonnée. **Profil :** `vamp`.

**Base présente dans le code :** Régénération nanomachine traduite en réparation plafonnée des dégâts gris.

**Incarnation à conserver :** MGS4 asymmetric green sleeve and brown leather trousers

**État vérifié :** métadonnées natives avec limites. 32 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, attack, hit, ko, punch, low, throw, deploy, shoot, reload, recover, parry, blade.

**Réemplois à examiner :** `blade` = light, heavy, super ; `shoot` = special, specialDown ; `recover` = specialBack, utility.

**Techniques pointant sur une seule région native dans la direction principale :** special, specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `tuxedo`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** VAMP — MGS4 : posture souple, couteau et main libre distincts. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** acrobatie avec trajectoire et reprise d’appui ; aucune lévitation générique. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Couteaux, mobilité et réparation plafonnée » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder posture souple, couteau et main libre distincts.
- **jump_land :** VAMP — MGS4 : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. acrobatie avec trajectoire et reprise d’appui ; aucune lévitation générique. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de VAMP — MGS4. Terminer par finir la rotation, contrôler la lame et reprendre la cible. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS4 / RENFORTS », présentation de MGS4 asymmetric green sleeve and brown leather trousers, puis posture souple, couteau et main libre distincts. Geste court lié à « Couteau de Vamp » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, finir la rotation, contrôler la lame et reprendre la cible ; VAMP — MGS4 vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS4 / RENFORTS.
- **round_loss :** Proposition CQC : VAMP — MGS4 réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Dernière danse », revenir par finir la rotation, contrôler la lame et reprendre la cible, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Contact de lame

**Existant :** `melee` / `knife` ; 7/3/12 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VAMP — MGS4, préparer « Contact de lame » ; posture souple, couteau et main libre distincts. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** finir la rotation, contrôler la lame et reprendre la cible. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Coupe engagée

**Existant :** `melee` / `knife` ; 18/5/24 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VAMP — MGS4, préparer « Coupe engagée » ; posture souple, couteau et main libre distincts. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** finir la rotation, contrôler la lame et reprendre la cible. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VAMP — MGS4, préparer « Balayage » ; posture souple, couteau et main libre distincts. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** finir la rotation, contrôler la lame et reprendre la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VAMP — MGS4, préparer « Projection » ; posture souple, couteau et main libre distincts. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** finir la rotation, contrôler la lame et reprendre la cible. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Couteau de Vamp

**Existant :** `projectile` / `knife` ; 14/1/22 ticks ; groupe `shoot`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VAMP — MGS4, préparer « Couteau de Vamp » ; posture souple, couteau et main libre distincts. Prélever l’objet correspondant à « Couteau de Vamp », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps.

**Retour.** finir la rotation, contrôler la lame et reprendre la cible. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Ombre liée

**Existant :** `projectile` / `knife` ; 32/1/34 ticks ; groupe `shoot`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VAMP — MGS4, préparer « Ombre liée » ; posture souple, couteau et main libre distincts. Prélever l’objet correspondant à « Ombre liée », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps.

**Retour.** finir la rotation, contrôler la lame et reprendre la cible. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut ou garde basse ; ralentissement bref, aucune confiscation des commandes.

##### specialForward — Bond de Vamp

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VAMP — MGS4, préparer « Bond de Vamp » ; posture souple, couteau et main libre distincts. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Bond de Vamp » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** finir la rotation, contrôler la lame et reprendre la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Réparer le corps

**Existant :** `heal` / `recovery` ; 45/1/38 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VAMP — MGS4, préparer « Réparer le corps » ; posture souple, couteau et main libre distincts. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Réparer le corps ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** finir la rotation, contrôler la lame et reprendre la cible. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Ne restaure que les dégâts récupérables ; interrompre les 45 images de préparation.

##### super — Dernière danse

**Existant :** `melee` / `blade` ; 25/7/44 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VAMP — MGS4, préparer « Dernière danse » ; posture souple, couteau et main libre distincts. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** finir la rotation, contrôler la lame et reprendre la cible. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Reprendre son souffle

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VAMP — MGS4, préparer « Reprendre son souffle » ; posture souple, couteau et main libre distincts. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Reprendre son souffle ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** finir la rotation, contrôler la lame et reprendre la cible. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Nanomachine Shutdown

Famille `blade`, ton `stylized` ; 220 ticks CQC ; phases actuelles : dash → crosscut → freeze → sheath. Appuis déclarés : Dernière danse / Couteau de Vamp.

Plan 1 : VAMP — MGS4 sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Dernière danse / Couteau de Vamp ». Plan 2 : armer la lame ou le membre de « Dernière danse / Couteau de Vamp » et dégager son arc. Plan 3 : enchaîner des coupes lisibles avec angles distincts ; les impacts et les réactions suivent le fil de lame, sans ajout d’arme d’une autre incarnation. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : finir la rotation, contrôler la lame et reprendre la cible, pose de signature face à l’adversaire.

##### Knife Rain

Famille `blade`, ton `stylized` ; 238 ticks CQC ; phases actuelles : dash → crosscut → freeze → sheath. Appuis déclarés : Dernière danse / Ombre liée.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Dernière danse / Ombre liée » ; l’espace disponible doit être lisible. Plan 2 : armer la lame ou le membre de « Dernière danse / Ombre liée » et dégager son arc. Plan 3 : enchaîner des coupes lisibles avec angles distincts ; les impacts et les réactions suivent le fil de lame, sans ajout d’arme d’une autre incarnation. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : finir la rotation, contrôler la lame et reprendre la cible, arrêt du dispositif et retour au cadre d’ensemble.

##### Shadow Moses Last Stand

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Dernière danse / Bond de Vamp.

Plan 1 : approche jusqu’à la distance réelle de « Dernière danse / Bond de Vamp », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Dernière danse / Bond de Vamp », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : finir la rotation, contrôler la lame et reprendre la cible, prise de distance et maintien final.

##### Immortal No More

Famille `blade`, ton `stylized` ; 274 ticks CQC ; phases actuelles : dash → crosscut → freeze → sheath. Appuis déclarés : Dernière danse / Projection.

Plan 1 : après une observation ou un repli, VAMP — MGS4 reprend l’initiative par « Dernière danse / Projection ». Plan 2 : armer la lame ou le membre de « Dernière danse / Projection » et dégager son arc. Plan 3 : enchaîner des coupes lisibles avec angles distincts ; les impacts et les réactions suivent le fil de lame, sans ajout d’arme d’une autre incarnation. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : finir la rotation, contrôler la lame et reprendre la cible, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Sixteen physically reviewed independent key poses per facing, 32 total. Walk has two key poses; no full captured motion cycle claim.
- Independent left/right generation preserves canonical anatomical sides; source PNGs stay byte-identical, no mirroring or pixel processing.
- Runtime rects derive from the actual native alpha components. Some rects overlap a neighbor; authored alpha boundary Canvas clip polygons exclude that neighbor while preserving all principal-body pixels above alpha 8.
- One pose may serve several engine move slots. Timings/phase maps are CQC adaptations; original battle geometry, damage, resources and AI are unchanged.
- Weapon small details, fabric folds and face likeness remain stylized. Closest accepted interpretation, no certified pixel-perfect 1:1 fidelity.
- No complete campaign, music or voice work supplied in this sprite candidate.
- No muzzle flash or particles are painted into the shoot poses; most shoot groups contain one aimed-pose keyframe held across phases. Projectile/effect timing remains the engine responsibility.
- Blade action uses actual draw/attack/resheath or knife readiness/throw/retrieve key poses; wide motion and additional canonical combos remain adaptation scope. No firearm depicted.
- [Original-game capture / original publisher character art physically viewed before generation; canonical incarnation reference.](https://www.creativeuncut.com/gallery-06/art/mgs4-vamp.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).
