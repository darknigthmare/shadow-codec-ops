# Animations — ARCHIVE

**10 acteurs du registre courant.** Les titres d’actions et paramètres sont observés ; les descriptions sont des propositions CQC à produire et valider. Un groupe de frames existant ne certifie pas l’ensemble du mouvement ou sa fidélité originale.

[Index des fiches](README.md) · [Contrat commun](../04_ANIMATIONS_SPRITES.md)

## Sommaire

- [FOX SOLDIER — PLUS](#archive__fox_plus) — PORTABLE OPS PLUS
- [GENOME OPERATIVE](#archive__genome_mgo1) — MGO1
- [PMC OPERATIVE](#archive__pmc_mgo2) — MGO2
- [DIAMOND DOGS OPERATIVE](#archive__dd_mgo3) — MGO3
- [ARCADE OPERATIVE](#archive__arcade_operator) — METAL GEAR ARCADE
- [SOCIAL OPS AGENT](#archive__social_agent) — SOCIAL OPS
- [SNAKE — AC!D MOBILE](#archive__snake_acid_mobile) — AC!D MOBILE
- [VENUS — AC!D2 MOBILE](#archive__venus_acid2_mobile) — AC!D 2 MOBILE
- [HAVEN TROOPER](#archive__haven_trooper) — MGS4
- [D-WALKER](#archive__dwalker) — MGSV

## archive__fox_plus

### FOX SOLDIER — PLUS — PORTABLE OPS PLUS

**Rôle :** Tir, grenades et distance. **Profil :** `soldier`.

**Base présente dans le code :** Soldat personnalisable Plus : équipement choisi pour ce preset, pas personnage nommé.

**Incarnation à conserver :** Separate PSP Plus FOX recruit archetype, not merged with original MPO roster UID

**État vérifié :** métadonnées natives avec limites. 28 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** FOX SOLDIER — PLUS : appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas courts, crosse/équipement conservés près du torse. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Tir, grenades et distance » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder appui militaire stable, arme maintenue dans l’axe et regard vers la menace.
- **jump_land :** FOX SOLDIER — PLUS : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas courts, crosse/équipement conservés près du torse. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de FOX SOLDIER — PLUS. Terminer par retour en couverture de l’arme après le coup. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « PORTABLE OPS PLUS », présentation de Separate PSP Plus FOX recruit archetype, not merged with original MPO roster UID, puis appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Geste court lié à « Carabine Plus » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, retour en couverture de l’arme après le coup ; FOX SOLDIER — PLUS vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à PORTABLE OPS PLUS.
- **round_loss :** Proposition CQC : FOX SOLDIER — PLUS réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Feu de section », revenir par retour en couverture de l’arme après le coup, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FOX SOLDIER — PLUS, préparer « Jab » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FOX SOLDIER — PLUS, préparer « Frappe engagée » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FOX SOLDIER — PLUS, préparer « Balayage » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FOX SOLDIER — PLUS, préparer « Projection » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** retour en couverture de l’arme après le coup. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Carabine Plus

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FOX SOLDIER — PLUS, préparer « Carabine Plus » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Carabine Plus » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Grenade Plus

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FOX SOLDIER — PLUS, préparer « Grenade Plus » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Prélever l’objet correspondant à « Grenade Plus », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Entrée FOX

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FOX SOLDIER — PLUS, préparer « Entrée FOX » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Entrée FOX » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Repli Plus

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FOX SOLDIER — PLUS, préparer « Repli Plus » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer l’appui qui produit le déplacement ; pas courts, crosse/équipement conservés près du torse.

**Action.** Exécuter « Repli Plus » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** retour en couverture de l’arme après le coup. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Feu de section

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FOX SOLDIER — PLUS, préparer « Feu de section » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Feu de section » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FOX SOLDIER — PLUS, préparer « Recharger » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** retour en couverture de l’arme après le coup. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Feu de section — Final

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Feu de section / Carabine Plus.

Plan 1 : FOX SOLDIER — PLUS sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Feu de section / Carabine Plus ». Plan 2 : présenter l’arme effectivement associée à « Feu de section / Carabine Plus », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : retour en couverture de l’arme après le coup, pose de signature face à l’adversaire.

##### Carabine Plus / Grenade Plus

Famille `ballistic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Feu de section / Grenade Plus.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Feu de section / Grenade Plus » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Feu de section / Grenade Plus », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : retour en couverture de l’arme après le coup, arrêt du dispositif et retour au cadre d’ensemble.

##### Entrée FOX — Point final

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Feu de section / Entrée FOX.

Plan 1 : approche jusqu’à la distance réelle de « Feu de section / Entrée FOX », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Feu de section / Entrée FOX », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : retour en couverture de l’arme après le coup, prise de distance et maintien final.

##### Sang-froid — Mission close

Famille `ballistic`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Feu de section / Projection.

Plan 1 : après une observation ou un repli, FOX SOLDIER — PLUS reprend l’initiative par « Feu de section / Projection ». Plan 2 : présenter l’arme effectivement associée à « Feu de section / Projection », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : retour en couverture de l’arme après le coup, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Identity/reference scope/equipment and anatomical sides reviewed within the explicitly stated source limits; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Small original PSP capture does not attest sole-level boots or exact recruit subtype; black laceup boots and fine camouflage/equipment textures are qualified reconstruction.
- Cover army line provides visual silhouette only, not independently certified FOX subtype or Plus model.
- No held gun is visible in native16poses or supplied FOX source target; visualFirearmPresent:false. Original rifle move logic remains unchanged; not an asserted unequipped official loadout.
- Native CQC unarmed movements and anonymous face are authored source-informed adaptation; no exact original motion/mesh certification.
- Physical pose12 is a visibly smaller neutral interpretation, retained unmodified but reload explicitly selects full-scale pose0.
- [Actual original PSP game screenshot downloaded unchanged and physically inspected shows the captured FOX target left of Snake, wearing olive camouflage, dark headgear, tactical vest/pouches and gloves. Authentic period cover supplies small saluting army-line silhouette, whose exact unit subtype is not independently labelled. Original MPO screenshot complements Plus archetype; no final extracted Plus model or unique named soldier is claimed.](https://en.wikipedia.org/wiki/Metal_Gear_Solid:_Portable_Ops) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## archive__genome_mgo1

### GENOME OPERATIVE — MGO1

**Rôle :** Tir, grenades et distance. **Profil :** `soldier`.

**Base présente dans le code :** Opérateur personnalisable MGO1 ; arsenal du preset, pas capacité biologique unique.

**Incarnation à conserver :** One original2005/06 GRU masked soldier model selected from Konami MGO1 team render; historical Genome label remains source legacy only.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** GENOME OPERATIVE : appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas courts, crosse/équipement conservés près du torse. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Tir, grenades et distance » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder appui militaire stable, arme maintenue dans l’axe et regard vers la menace.
- **jump_land :** GENOME OPERATIVE : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas courts, crosse/équipement conservés près du torse. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de GENOME OPERATIVE. Terminer par retour en couverture de l’arme après le coup. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGO1 », présentation de One original2005/06 GRU masked soldier model selected from Konami MGO1 team render; historical Genome label remains source legacy only., puis appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Geste court lié à « Tir MGO1 » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, retour en couverture de l’arme après le coup ; GENOME OPERATIVE vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGO1.
- **round_loss :** Proposition CQC : GENOME OPERATIVE réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Feu de couverture », revenir par retour en couverture de l’arme après le coup, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GENOME OPERATIVE, préparer « Jab » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GENOME OPERATIVE, préparer « Frappe engagée » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GENOME OPERATIVE, préparer « Balayage » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GENOME OPERATIVE, préparer « Projection » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** retour en couverture de l’arme après le coup. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Tir MGO1

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GENOME OPERATIVE, préparer « Tir MGO1 » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Tir MGO1 » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Grenade de salle

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GENOME OPERATIVE, préparer « Grenade de salle » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Prélever l’objet correspondant à « Grenade de salle », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Crosse Genome

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GENOME OPERATIVE, préparer « Crosse Genome » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Crosse Genome » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Repli d’équipe

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GENOME OPERATIVE, préparer « Repli d’équipe » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer l’appui qui produit le déplacement ; pas courts, crosse/équipement conservés près du torse.

**Action.** Exécuter « Repli d’équipe » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** retour en couverture de l’arme après le coup. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Feu de couverture

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GENOME OPERATIVE, préparer « Feu de couverture » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Feu de couverture » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GENOME OPERATIVE, préparer « Recharger » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** retour en couverture de l’arme après le coup. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Feu de couverture — Final

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Feu de couverture / Tir MGO1.

Plan 1 : GENOME OPERATIVE sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Feu de couverture / Tir MGO1 ». Plan 2 : présenter l’arme effectivement associée à « Feu de couverture / Tir MGO1 », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : retour en couverture de l’arme après le coup, pose de signature face à l’adversaire.

##### Tir MGO1 / Grenade de salle

Famille `ballistic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Feu de couverture / Grenade de salle.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Feu de couverture / Grenade de salle » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Feu de couverture / Grenade de salle », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : retour en couverture de l’arme après le coup, arrêt du dispositif et retour au cadre d’ensemble.

##### Crosse Genome — Point final

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Feu de couverture / Crosse Genome.

Plan 1 : approche jusqu’à la distance réelle de « Feu de couverture / Crosse Genome », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Feu de couverture / Crosse Genome », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : retour en couverture de l’arme après le coup, prise de distance et maintien final.

##### Sang-froid — Mission close

Famille `ballistic`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Feu de couverture / Projection.

Plan 1 : après une observation ou un repli, GENOME OPERATIVE reprend l’initiative par « Feu de couverture / Projection ». Plan 2 : présenter l’arme effectivement associée à « Feu de couverture / Projection », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : retour en couverture de l’arme après le coup, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Identity/reference scope/equipment and anatomical sides reviewed within the explicitly stated source limits; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Native source is small; fine facial topology, seams, fabric microtexture and unseen pose angles are interpreted at CQC drawing scale.
- All16action keyposes per direction are authored CQC presentation, not original-game motion capture or exact canonical techniques.
- Originalgroup render is238pxwide; individual texture/topology and precise hidden accessories are not certified.
- GENOME OPERATIVE was a historical project label; originalMGO1 primarysource names GRU/KGB/Ocelotunits, not an MGS1Genome model. Identity UID/save/moves/lore are preserved.
- [PRIMARY originalKonami MGO1 site team model render preserved from publicWayback. Whole masked soldier bodies establish actualMGO1 GRU presentation, no MGS1/ACID2 body substitution.](https://web.archive.org/web/20121015091304/http://www.konami.jp/gs/game/mgs3_sub/america/mgs/online.html) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Primary original Konami whole GRU-team body render; choose masked regular soldier, not unmasked Raikov.](https://web.archive.org/web/20121015091304im_/http://www.konami.jp/gs/game/mgs3_sub/america/mgs/pic/chara_02.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original released MGO1 GRU/KGB gameplay supplementary camouflage/harness silhouettes, whole unchanged small capture.](https://upload.wikimedia.org/wikipedia/en/6/6f/MGS3online.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## archive__pmc_mgo2

### PMC OPERATIVE — MGO2

**Rôle :** Rollers, explosifs posés et pistolet. **Profil :** `grenadier`.

**Base présente dans le code :** Preset MGO2 ; kits d’équipe conservés sans prétendre fournir du jeu en ligne.

**Incarnation à conserver :** One originalMGO2 customized operator from official Konami PLAYEREDIT example; no fixed PMC face/company or laterMGO variant asserted.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `deploy` = specialDown, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, super, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** PMC OPERATIVE : matériel explosif fixé et prise visible avant le lancer. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas qui ne font pas traverser les grenades et sacoches. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Rollers, explosifs posés et pistolet » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder matériel explosif fixé et prise visible avant le lancer.
- **jump_land :** PMC OPERATIVE : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas qui ne font pas traverser les grenades et sacoches. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de PMC OPERATIVE. Terminer par retour de la main libre vers la poche utilisée. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGO2 », présentation de One originalMGO2 customized operator from official Konami PLAYEREDIT example; no fixed PMC face/company or laterMGO variant asserted., puis matériel explosif fixé et prise visible avant le lancer. Geste court lié à « Pistolet MGO2 » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, retour de la main libre vers la poche utilisée ; PMC OPERATIVE vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGO2.
- **round_loss :** Proposition CQC : PMC OPERATIVE réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Pression de zone », revenir par retour de la main libre vers la poche utilisée, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PMC OPERATIVE, préparer « Jab » ; matériel explosif fixé et prise visible avant le lancer. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour de la main libre vers la poche utilisée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PMC OPERATIVE, préparer « Frappe engagée » ; matériel explosif fixé et prise visible avant le lancer. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retour de la main libre vers la poche utilisée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PMC OPERATIVE, préparer « Balayage » ; matériel explosif fixé et prise visible avant le lancer. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** retour de la main libre vers la poche utilisée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PMC OPERATIVE, préparer « Projection » ; matériel explosif fixé et prise visible avant le lancer. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** retour de la main libre vers la poche utilisée. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Pistolet MGO2

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PMC OPERATIVE, préparer « Pistolet MGO2 » ; matériel explosif fixé et prise visible avant le lancer. Montrer la prise et la visée de l’arme décrite par « Pistolet MGO2 » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** retour de la main libre vers la poche utilisée. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Charge de contrôle

**Existant :** `trap` / `explosive` ; 30/1/36 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PMC OPERATIVE, préparer « Charge de contrôle » ; matériel explosif fixé et prise visible avant le lancer. Prendre le dispositif, s’abaisser vers le support et indiquer le lieu de pose avant activation.

**Action.** Poser « Charge de contrôle » au point réel de main/outil, armer puis retirer le membre. Le dispositif possède ensuite son propre sprite, ses états attente/armement/déclenchement/destruction et sa collision.

**Retour.** retour de la main libre vers la poche utilisée. Se dégager de l’objet sans le téléporter ; l’interruption avant armement a sa propre sortie.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pose et amorçage visibles ; sauter ou détruire la mine par une attaque. Deux maximum.

##### specialForward — Détonateur MGO2

**Existant :** `detonate` / `explosive` ; 12/1/28 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PMC OPERATIVE, préparer « Détonateur MGO2 » ; matériel explosif fixé et prise visible avant le lancer. Montrer la commande ou le geste de déclenchement, avec le dispositif déjà présent.

**Action.** Déclencher uniquement les objets admissibles ; la réaction du corps accompagne la commande, tandis que chaque explosion garde son centre et son sprite propres.

**Retour.** retour de la main libre vers la poche utilisée. Baisser la commande et retrouver la garde ; ne pas créer une nouvelle mine par le geste seul.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Détruire ou éviter les charges posées avant la commande.

##### specialBack — Repli d’équipe

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PMC OPERATIVE, préparer « Repli d’équipe » ; matériel explosif fixé et prise visible avant le lancer. Préparer l’appui qui produit le déplacement ; pas qui ne font pas traverser les grenades et sacoches.

**Action.** Exécuter « Repli d’équipe » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** retour de la main libre vers la poche utilisée. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Pression de zone

**Existant :** `projectile` / `explosive` ; 35/1/44 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PMC OPERATIVE, préparer « Pression de zone » ; matériel explosif fixé et prise visible avant le lancer. Prélever l’objet correspondant à « Pression de zone », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. La salve contient 3 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ. L’objet conserve sa mèche de 48 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** retour de la main libre vers la poche utilisée. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 3 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PMC OPERATIVE, préparer « Recharger » ; matériel explosif fixé et prise visible avant le lancer. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** retour de la main libre vers la poche utilisée. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Pression de zone — Final

Famille `explosive`, ton `stylized` ; 220 ticks CQC ; phases actuelles : plant → retreat → blast → pose. Appuis déclarés : Pression de zone / Pistolet MGO2.

Plan 1 : PMC OPERATIVE sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Pression de zone / Pistolet MGO2 ». Plan 2 : montrer la pose/trajectoire et le délai de « Pression de zone / Pistolet MGO2 ». Plan 3 : déclencher au véritable point de dispositif ; poussière, débris et réaction de cible restent indépendants du corps de l’attaquant. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : retour de la main libre vers la poche utilisée, pose de signature face à l’adversaire.

##### Pistolet MGO2 / Charge de contrôle

Famille `ballistic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Pression de zone / Charge de contrôle.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Pression de zone / Charge de contrôle » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Pression de zone / Charge de contrôle », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : retour de la main libre vers la poche utilisée, arrêt du dispositif et retour au cadre d’ensemble.

##### Détonateur MGO2 — Point final

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Pression de zone / Détonateur MGO2.

Plan 1 : approche jusqu’à la distance réelle de « Pression de zone / Détonateur MGO2 », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Pression de zone / Détonateur MGO2 », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : retour de la main libre vers la poche utilisée, prise de distance et maintien final.

##### Mobilité — Mission close

Famille `explosive`, ton `stylized` ; 274 ticks CQC ; phases actuelles : plant → retreat → blast → pose. Appuis déclarés : Pression de zone / Projection.

Plan 1 : après une observation ou un repli, PMC OPERATIVE reprend l’initiative par « Pression de zone / Projection ». Plan 2 : montrer la pose/trajectoire et le délai de « Pression de zone / Projection ». Plan 3 : déclencher au véritable point de dispositif ; poussière, débris et réaction de cible restent indépendants du corps de l’attaquant. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : retour de la main libre vers la poche utilisée, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Identity/reference scope/equipment and anatomical sides reviewed within the explicitly stated source limits; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Native source is small; fine facial topology, seams, fabric microtexture and unseen pose angles are interpreted at CQC drawing scale.
- All16action keyposes per direction are authored CQC presentation, not original-game motion capture or exact canonical techniques.
- One customization example does not establish a fixed canonical personal identity for all MGO2 operatives.
- Second whole-original review: lower face appears exposed in the small PLAYEREDIT raster; dark eye equipment is retained, no lower-face balaclava invented. Exact headwear stitching, eyewear model and facial topology remain unconfirmed.
- Selected forward short-brimmed grey/olive soft cap is consistent across independent facings; original small screenshot cannot certify every headgear/earwear seam or exact eyewear model. Row4 neutral and other poses may differ slightly in apparent stance scale.
- [PRIMARY publisherKonami PlayStationBlog14April2008 native PLAYEREDIT game capture, complete avatar head-to-soles. One authentic editable outfit, not combined conceptposter operators.](https://blog.playstation.com/2008/04/14/alert-metal-gear-mondays-begin-now-on-the-playstation-blog-with-metal-gear-online-beta-details/) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## archive__dd_mgo3

### DIAMOND DOGS OPERATIVE — MGO3

**Rôle :** Tir, grenades et distance. **Profil :** `soldier`.

**Base présente dans le code :** Preset MGO3 : arme, marquage et CQC ; pas de Fulton gagnant instantanément le duel.

**Incarnation à conserver :** One primaryKonami originalMGO3 customizable Scout example, brown-haired olive scarf/rifle outfit; independent DD operator UID.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** DIAMOND DOGS OPERATIVE : appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas courts, crosse/équipement conservés près du torse. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Tir, grenades et distance » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder appui militaire stable, arme maintenue dans l’axe et regard vers la menace.
- **jump_land :** DIAMOND DOGS OPERATIVE : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas courts, crosse/équipement conservés près du torse. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de DIAMOND DOGS OPERATIVE. Terminer par retour en couverture de l’arme après le coup. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGO3 », présentation de One primaryKonami originalMGO3 customizable Scout example, brown-haired olive scarf/rifle outfit; independent DD operator UID., puis appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Geste court lié à « Carabine MGO3 » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, retour en couverture de l’arme après le coup ; DIAMOND DOGS OPERATIVE vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGO3.
- **round_loss :** Proposition CQC : DIAMOND DOGS OPERATIVE réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Assaut de section », revenir par retour en couverture de l’arme après le coup, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DIAMOND DOGS OPERATIVE, préparer « Jab » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DIAMOND DOGS OPERATIVE, préparer « Frappe engagée » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DIAMOND DOGS OPERATIVE, préparer « Balayage » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DIAMOND DOGS OPERATIVE, préparer « Projection » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** retour en couverture de l’arme après le coup. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Carabine MGO3

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DIAMOND DOGS OPERATIVE, préparer « Carabine MGO3 » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Carabine MGO3 » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Grenade MGO3

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DIAMOND DOGS OPERATIVE, préparer « Grenade MGO3 » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Prélever l’objet correspondant à « Grenade MGO3 », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Entrée DD

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DIAMOND DOGS OPERATIVE, préparer « Entrée DD » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Entrée DD » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Repli DD

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DIAMOND DOGS OPERATIVE, préparer « Repli DD » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer l’appui qui produit le déplacement ; pas courts, crosse/équipement conservés près du torse.

**Action.** Exécuter « Repli DD » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** retour en couverture de l’arme après le coup. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Assaut de section

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DIAMOND DOGS OPERATIVE, préparer « Assaut de section » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Assaut de section » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DIAMOND DOGS OPERATIVE, préparer « Recharger » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** retour en couverture de l’arme après le coup. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Assaut de section — Final

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Assaut de section / Carabine MGO3.

Plan 1 : DIAMOND DOGS OPERATIVE sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Assaut de section / Carabine MGO3 ». Plan 2 : présenter l’arme effectivement associée à « Assaut de section / Carabine MGO3 », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : retour en couverture de l’arme après le coup, pose de signature face à l’adversaire.

##### Carabine MGO3 / Grenade MGO3

Famille `ballistic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Assaut de section / Grenade MGO3.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Assaut de section / Grenade MGO3 » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Assaut de section / Grenade MGO3 », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : retour en couverture de l’arme après le coup, arrêt du dispositif et retour au cadre d’ensemble.

##### Entrée DD — Point final

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Assaut de section / Entrée DD.

Plan 1 : approche jusqu’à la distance réelle de « Assaut de section / Entrée DD », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Assaut de section / Entrée DD », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : retour en couverture de l’arme après le coup, prise de distance et maintien final.

##### Sang-froid — Mission close

Famille `ballistic`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Assaut de section / Projection.

Plan 1 : après une observation ou un repli, DIAMOND DOGS OPERATIVE reprend l’initiative par « Assaut de section / Projection ». Plan 2 : présenter l’arme effectivement associée à « Assaut de section / Projection », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : retour en couverture de l’arme après le coup, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Identity/reference scope/equipment and anatomical sides reviewed within the explicitly stated source limits; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Native source is small; fine facial topology, seams, fabric microtexture and unseen pose angles are interpreted at CQC drawing scale.
- All16action keyposes per direction are authored CQC presentation, not original-game motion capture or exact canonical techniques.
- Source weapon shape/optic/suppressor are attested; exact model-name/manufacturer and unseen gun engravings are not certified.
- [PRIMARY Konami MGO3 class page originalScout images04/05/06, same selected outfit; reference05 establishes boot soles. True equipped rifle silhouette visible, exact fictional manufacturer/name not certified.](https://www.konami.com/mg/mgs5/tpp/jp/online/class.php) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## archive__arcade_operator

### ARCADE OPERATIVE — METAL GEAR ARCADE

**Rôle :** Tir, grenades et distance. **Profil :** `soldier`.

**Base présente dans le code :** Preset Arcade ; les commandes de salle sont adaptées, pas l’installation physique complète.

**Incarnation à conserver :** One original2010 customizable operator wearing the actual green outfit from OUTFIT SET01; independent Arcade presentation.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** ARCADE OPERATIVE : appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas courts, crosse/équipement conservés près du torse. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Tir, grenades et distance » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder appui militaire stable, arme maintenue dans l’axe et regard vers la menace.
- **jump_land :** ARCADE OPERATIVE : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas courts, crosse/équipement conservés près du torse. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de ARCADE OPERATIVE. Terminer par retour en couverture de l’arme après le coup. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « METAL GEAR ARCADE », présentation de One original2010 customizable operator wearing the actual green outfit from OUTFIT SET01; independent Arcade presentation., puis appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Geste court lié à « Tir Arcade » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, retour en couverture de l’arme après le coup ; ARCADE OPERATIVE vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à METAL GEAR ARCADE.
- **round_loss :** Proposition CQC : ARCADE OPERATIVE réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Salve Arcade », revenir par retour en couverture de l’arme après le coup, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ARCADE OPERATIVE, préparer « Jab » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ARCADE OPERATIVE, préparer « Frappe engagée » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ARCADE OPERATIVE, préparer « Balayage » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ARCADE OPERATIVE, préparer « Projection » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** retour en couverture de l’arme après le coup. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Tir Arcade

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ARCADE OPERATIVE, préparer « Tir Arcade » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Tir Arcade » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Grenade Arcade

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ARCADE OPERATIVE, préparer « Grenade Arcade » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Prélever l’objet correspondant à « Grenade Arcade », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Crosse Arcade

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ARCADE OPERATIVE, préparer « Crosse Arcade » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Crosse Arcade » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Repli Arcade

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ARCADE OPERATIVE, préparer « Repli Arcade » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer l’appui qui produit le déplacement ; pas courts, crosse/équipement conservés près du torse.

**Action.** Exécuter « Repli Arcade » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** retour en couverture de l’arme après le coup. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Salve Arcade

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ARCADE OPERATIVE, préparer « Salve Arcade » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Salve Arcade » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ARCADE OPERATIVE, préparer « Recharger » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** retour en couverture de l’arme après le coup. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Salve Arcade — Final

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Salve Arcade / Tir Arcade.

Plan 1 : ARCADE OPERATIVE sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Salve Arcade / Tir Arcade ». Plan 2 : présenter l’arme effectivement associée à « Salve Arcade / Tir Arcade », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : retour en couverture de l’arme après le coup, pose de signature face à l’adversaire.

##### Tir Arcade / Grenade Arcade

Famille `ballistic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Salve Arcade / Grenade Arcade.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Salve Arcade / Grenade Arcade » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Salve Arcade / Grenade Arcade », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : retour en couverture de l’arme après le coup, arrêt du dispositif et retour au cadre d’ensemble.

##### Crosse Arcade — Point final

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Salve Arcade / Crosse Arcade.

Plan 1 : approche jusqu’à la distance réelle de « Salve Arcade / Crosse Arcade », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Salve Arcade / Crosse Arcade », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : retour en couverture de l’arme après le coup, prise de distance et maintien final.

##### Sang-froid — Mission close

Famille `ballistic`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Salve Arcade / Projection.

Plan 1 : après une observation ou un repli, ARCADE OPERATIVE reprend l’initiative par « Salve Arcade / Projection ». Plan 2 : présenter l’arme effectivement associée à « Salve Arcade / Projection », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : retour en couverture de l’arme après le coup, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Identity/reference scope/equipment and anatomical sides reviewed within the explicitly stated source limits; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Native source is small; fine facial topology, seams, fabric microtexture and unseen pose angles are interpreted at CQC drawing scale.
- All16action keyposes per direction are authored CQC presentation, not original-game motion capture or exact canonical techniques.
- Interface obscures final feet on avatar model; boot construction below visible icons and rear surfaces are interpreted.
- [Original2010 Arcade nativeOUTFIT menu screenshot published20Dec2010, physically reviewed whole. Body head-to-lowershins; sameoutfit boot inventoryicons attest selected footwear extent.](https://www.4gamer.net/games/116/G011658/20101220029/) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## archive__social_agent

### SOCIAL OPS AGENT — SOCIAL OPS

**Rôle :** Cartes équipées et coût temporel. **Profil :** `cardgun`.

**Base présente dans le code :** Agent Social Ops de simulation : cartes équipées plutôt qu’une identité canonique inventée.

**Incarnation à conserver :** Existing generic roster UID preserved; no uniquely attested official named agent model

**État vérifié :** unattested-body-presentation-reconstruction. 28 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `deploy` = specialDown, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, super, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** SOCIAL OPS AGENT : préparation du support AC!D et de l’arme propre au profil. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** déplacement lisible entre la décision de carte et son exécution. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Cartes équipées et coût temporel » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder préparation du support AC!D et de l’arme propre au profil.
- **jump_land :** SOCIAL OPS AGENT : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. déplacement lisible entre la décision de carte et son exécution. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de SOCIAL OPS AGENT. Terminer par refermer la séquence de carte puis revenir à la garde. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « SOCIAL OPS », présentation de Existing generic roster UID preserved; no uniquely attested official named agent model, puis préparation du support AC!D et de l’arme propre au profil. Geste court lié à « Carte Social Ops » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, refermer la séquence de carte puis revenir à la garde ; SOCIAL OPS AGENT vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à SOCIAL OPS.
- **round_loss :** Proposition CQC : SOCIAL OPS AGENT réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Main Social Ops », revenir par refermer la séquence de carte puis revenir à la garde, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOCIAL OPS AGENT, préparer « Jab » ; préparation du support AC!D et de l’arme propre au profil. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** refermer la séquence de carte puis revenir à la garde.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOCIAL OPS AGENT, préparer « Frappe engagée » ; préparation du support AC!D et de l’arme propre au profil. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** refermer la séquence de carte puis revenir à la garde.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOCIAL OPS AGENT, préparer « Balayage » ; préparation du support AC!D et de l’arme propre au profil. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** refermer la séquence de carte puis revenir à la garde.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOCIAL OPS AGENT, préparer « Projection » ; préparation du support AC!D et de l’arme propre au profil. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** refermer la séquence de carte puis revenir à la garde. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Carte Social Ops

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOCIAL OPS AGENT, préparer « Carte Social Ops » ; préparation du support AC!D et de l’arme propre au profil. Montrer la prise et la visée de l’arme décrite par « Carte Social Ops » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** refermer la séquence de carte puis revenir à la garde. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Carte explosion

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOCIAL OPS AGENT, préparer « Carte explosion » ; préparation du support AC!D et de l’arme propre au profil. Prélever l’objet correspondant à « Carte explosion », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** refermer la séquence de carte puis revenir à la garde. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Carte repérage

**Existant :** `mark` / `recon` ; 26/1/30 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOCIAL OPS AGENT, préparer « Carte repérage » ; préparation du support AC!D et de l’arme propre au profil. Orienter regard, optique ou terminal vers la cible observée, sans consulter une action future.

**Action.** Pour « Carte repérage », déclencher lecture/repérage avec un petit geste ou changement d’optique et un indicateur séparé. Le corps doit rester visible et vulnérable selon les données de combat.

**Retour.** refermer la séquence de carte puis revenir à la garde. Couper le signal ou abaisser l’outil ; retour vers l’adversaire sans nouvelle arme inventée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Portée limitée ; le marquage ne vise ni à travers toute l’arène ni automatiquement.

##### specialBack — Carte mouvement

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOCIAL OPS AGENT, préparer « Carte mouvement » ; préparation du support AC!D et de l’arme propre au profil. Préparer l’appui qui produit le déplacement ; déplacement lisible entre la décision de carte et son exécution.

**Action.** Exécuter « Carte mouvement » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** refermer la séquence de carte puis revenir à la garde. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Main Social Ops

**Existant :** `projectile` / `card` ; 35/1/44 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOCIAL OPS AGENT, préparer « Main Social Ops » ; préparation du support AC!D et de l’arme propre au profil. Donner à la source de « Main Social Ops » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet card de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet. La salve contient 4 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** refermer la séquence de carte puis revenir à la garde. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 4 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Réduire le COST

**Existant :** `recover` / `recovery` ; 45/1/25 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOCIAL OPS AGENT, préparer « Réduire le COST » ; préparation du support AC!D et de l’arme propre au profil. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Réduire le COST ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** refermer la séquence de carte puis revenir à la garde. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Refroidissement ou pause tactique interrompable ; aucun soin gratuit.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Main Social Ops — Final

Famille `card`, ton `stylized` ; 220 ticks CQC ; phases actuelles : deal → chain → costlock → discard. Appuis déclarés : Main Social Ops / Carte Social Ops.

Plan 1 : SOCIAL OPS AGENT sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Main Social Ops / Carte Social Ops ». Plan 2 : rendre lisible la décision de carte associée à « Main Social Ops / Carte Social Ops ». Plan 3 : réaliser l’effet par le vrai corps/outil du profil ; les cartes servent à la présentation AC!D, pas à inventer un équipement canonique. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : refermer la séquence de carte puis revenir à la garde, pose de signature face à l’adversaire.

##### Carte Social Ops / Carte explosion

Famille `ballistic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Main Social Ops / Carte explosion.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Main Social Ops / Carte explosion » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Main Social Ops / Carte explosion », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : refermer la séquence de carte puis revenir à la garde, arrêt du dispositif et retour au cadre d’ensemble.

##### Carte repérage — Point final

Famille `card`, ton `stylized` ; 256 ticks CQC ; phases actuelles : deal → chain → costlock → discard. Appuis déclarés : Main Social Ops / Carte repérage.

Plan 1 : approche jusqu’à la distance réelle de « Main Social Ops / Carte repérage », arme et main libre identifiées. Plan 2 : rendre lisible la décision de carte associée à « Main Social Ops / Carte repérage ». Plan 3 : réaliser l’effet par le vrai corps/outil du profil ; les cartes servent à la présentation AC!D, pas à inventer un équipement canonique. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : refermer la séquence de carte puis revenir à la garde, prise de distance et maintien final.

##### Tempo des cartes — Mission close

Famille `card`, ton `stylized` ; 274 ticks CQC ; phases actuelles : deal → chain → costlock → discard. Appuis déclarés : Main Social Ops / Projection.

Plan 1 : après une observation ou un repli, SOCIAL OPS AGENT reprend l’initiative par « Main Social Ops / Projection ». Plan 2 : rendre lisible la décision de carte associée à « Main Social Ops / Projection ». Plan 3 : réaliser l’effet par le vrai corps/outil du profil ; les cartes servent à la présentation AC!D, pas à inventer un équipement canonique. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : refermer la séquence de carte puis revenir à la garde, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Identity/reference scope/equipment and anatomical sides reviewed within the explicitly stated source limits; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- canonicalBodyAppearanceAttested:false; presentationReconstruction:true; exact roster identity, save, lore and gameplay retained.
- This is an original source-informed presentation of an existing generic slot, not a recovered official Social Ops character, model, costume or animation.
- No named Snake/EVA/Miller/Ocelot body or rejected Viper OC is reused as this anonymous agent.
- No firearm actually drawn in native32poses; visualFirearmPresent:false despite legacy rifle move category. Original move mechanics remain untouched.
- Physical pose12 is a visibly smaller neutral interpretation retained unmodified but reload selects full-scale physicalpose0.
- Right-v1 only12poses rejected; right-v2 copied FOX reference costume/beret instead of this agent plain cap/gray clothes and was rejected. Every original retained; selected right-v3 must match the accepted left original costume and actual16poses.
- [Original2012 Social Ops ensemble promotion downloaded unchanged and physically inspected supplies Metal Gear universe context only. None of its named characters is claimed as this generic slot. No authentic unique Social Ops Agent fullbody was recovered; olive-gray clothing, simple vest/belt, plain black cap, boots, natural anonymous face are explicit original CQC presentation reconstruction.](https://www.metalgearsolid.be/metal_gear_solid_social_ops_artwork_005.html) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## archive__snake_acid_mobile

### SNAKE — AC!D MOBILE — AC!D MOBILE

**Rôle :** Cartes équipées et coût temporel. **Profil :** `cardgun`.

**Base présente dans le code :** Adaptation mobile Ac!d : COST conservé, pas fusion avec les campagnes principales.

**Incarnation à conserver :** Original2007/08 Distinctive/Konami/Glu firstACID Mobile3D Snake, independently sourced phone model; no PSP or secondMobile title alias.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `deploy` = specialDown, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, super, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `retro-msx`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** SNAKE — AC!D MOBILE : préparation du support AC!D et de l’arme propre au profil. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** déplacement lisible entre la décision de carte et son exécution. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Cartes équipées et coût temporel » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder préparation du support AC!D et de l’arme propre au profil.
- **jump_land :** SNAKE — AC!D MOBILE : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. déplacement lisible entre la décision de carte et son exécution. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de SNAKE — AC!D MOBILE. Terminer par refermer la séquence de carte puis revenir à la garde. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « AC!D MOBILE », présentation de Original2007/08 Distinctive/Konami/Glu firstACID Mobile3D Snake, independently sourced phone model; no PSP or secondMobile title alias., puis préparation du support AC!D et de l’arme propre au profil. Geste court lié à « Carte arme Mobile » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, refermer la séquence de carte puis revenir à la garde ; SNAKE — AC!D MOBILE vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à AC!D MOBILE.
- **round_loss :** Proposition CQC : SNAKE — AC!D MOBILE réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Main portable », revenir par refermer la séquence de carte puis revenir à la garde, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SNAKE — AC!D MOBILE, préparer « Jab » ; préparation du support AC!D et de l’arme propre au profil. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** refermer la séquence de carte puis revenir à la garde.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SNAKE — AC!D MOBILE, préparer « Frappe engagée » ; préparation du support AC!D et de l’arme propre au profil. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** refermer la séquence de carte puis revenir à la garde.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SNAKE — AC!D MOBILE, préparer « Balayage » ; préparation du support AC!D et de l’arme propre au profil. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** refermer la séquence de carte puis revenir à la garde.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SNAKE — AC!D MOBILE, préparer « Projection » ; préparation du support AC!D et de l’arme propre au profil. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** refermer la séquence de carte puis revenir à la garde. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Carte arme Mobile

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SNAKE — AC!D MOBILE, préparer « Carte arme Mobile » ; préparation du support AC!D et de l’arme propre au profil. Montrer la prise et la visée de l’arme décrite par « Carte arme Mobile » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** refermer la séquence de carte puis revenir à la garde. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Carte grenade Mobile

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SNAKE — AC!D MOBILE, préparer « Carte grenade Mobile » ; préparation du support AC!D et de l’arme propre au profil. Prélever l’objet correspondant à « Carte grenade Mobile », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** refermer la séquence de carte puis revenir à la garde. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Carte analyse Mobile

**Existant :** `mark` / `recon` ; 26/1/30 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SNAKE — AC!D MOBILE, préparer « Carte analyse Mobile » ; préparation du support AC!D et de l’arme propre au profil. Orienter regard, optique ou terminal vers la cible observée, sans consulter une action future.

**Action.** Pour « Carte analyse Mobile », déclencher lecture/repérage avec un petit geste ou changement d’optique et un indicateur séparé. Le corps doit rester visible et vulnérable selon les données de combat.

**Retour.** refermer la séquence de carte puis revenir à la garde. Couper le signal ou abaisser l’outil ; retour vers l’adversaire sans nouvelle arme inventée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Portée limitée ; le marquage ne vise ni à travers toute l’arène ni automatiquement.

##### specialBack — Carte déplacement Mobile

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SNAKE — AC!D MOBILE, préparer « Carte déplacement Mobile » ; préparation du support AC!D et de l’arme propre au profil. Préparer l’appui qui produit le déplacement ; déplacement lisible entre la décision de carte et son exécution.

**Action.** Exécuter « Carte déplacement Mobile » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** refermer la séquence de carte puis revenir à la garde. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Main portable

**Existant :** `projectile` / `card` ; 35/1/44 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SNAKE — AC!D MOBILE, préparer « Main portable » ; préparation du support AC!D et de l’arme propre au profil. Donner à la source de « Main portable » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet card de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet. La salve contient 4 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** refermer la séquence de carte puis revenir à la garde. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 4 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Réduire le COST

**Existant :** `recover` / `recovery` ; 45/1/25 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SNAKE — AC!D MOBILE, préparer « Réduire le COST » ; préparation du support AC!D et de l’arme propre au profil. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Réduire le COST ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** refermer la séquence de carte puis revenir à la garde. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Refroidissement ou pause tactique interrompable ; aucun soin gratuit.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Main portable — Final

Famille `card`, ton `stylized` ; 220 ticks CQC ; phases actuelles : deal → chain → costlock → discard. Appuis déclarés : Main portable / Carte arme Mobile.

Plan 1 : SNAKE — AC!D MOBILE sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Main portable / Carte arme Mobile ». Plan 2 : rendre lisible la décision de carte associée à « Main portable / Carte arme Mobile ». Plan 3 : réaliser l’effet par le vrai corps/outil du profil ; les cartes servent à la présentation AC!D, pas à inventer un équipement canonique. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : refermer la séquence de carte puis revenir à la garde, pose de signature face à l’adversaire.

##### Carte arme Mobile / Carte grenade Mobile

Famille `ballistic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Main portable / Carte grenade Mobile.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Main portable / Carte grenade Mobile » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Main portable / Carte grenade Mobile », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : refermer la séquence de carte puis revenir à la garde, arrêt du dispositif et retour au cadre d’ensemble.

##### Carte analyse Mobile — Point final

Famille `card`, ton `stylized` ; 256 ticks CQC ; phases actuelles : deal → chain → costlock → discard. Appuis déclarés : Main portable / Carte analyse Mobile.

Plan 1 : approche jusqu’à la distance réelle de « Main portable / Carte analyse Mobile », arme et main libre identifiées. Plan 2 : rendre lisible la décision de carte associée à « Main portable / Carte analyse Mobile ». Plan 3 : réaliser l’effet par le vrai corps/outil du profil ; les cartes servent à la présentation AC!D, pas à inventer un équipement canonique. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : refermer la séquence de carte puis revenir à la garde, prise de distance et maintien final.

##### Tempo des cartes — Mission close

Famille `card`, ton `stylized` ; 274 ticks CQC ; phases actuelles : deal → chain → costlock → discard. Appuis déclarés : Main portable / Projection.

Plan 1 : après une observation ou un repli, SNAKE — AC!D MOBILE reprend l’initiative par « Main portable / Projection ». Plan 2 : rendre lisible la décision de carte associée à « Main portable / Projection ». Plan 3 : réaliser l’effet par le vrai corps/outil du profil ; les cartes servent à la présentation AC!D, pas à inventer un équipement canonique. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : refermer la séquence de carte puis revenir à la garde, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Identity/reference scope/equipment and anatomical sides reviewed within the explicitly stated source limits; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Native source is small; fine facial topology, seams, fabric microtexture and unseen pose angles are interpreted at CQC drawing scale.
- All16action keyposes per direction are authored CQC presentation, not original-game motion capture or exact canonical techniques.
- Large gallery reproductions are already enlarged by host; preserved exactbytes, never treated as native highresolution phone geometry.
- [Period2008 PocketGamer native240×320 originalfirstMobile3D game capture; complement publicgallery exactraw phonecapture reproductions, some larger deliveries visibly pre-enlarged by host and do not add authentic detail. Actualtitle/ABOUT establish original2007 Konami/Distinctive/Glu.](https://www.pocketgamer.com/metal-gear-ac-d-mobile/review/) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## archive__venus_acid2_mobile

### VENUS — AC!D2 MOBILE — AC!D 2 MOBILE

**Rôle :** Cartes équipées et coût temporel. **Profil :** `cardgun`.

**Base présente dans le code :** Vénus mobile : actions de cartes ; armes précisées comme équipement de preset.

**Incarnation à conserver :** Original2009 phone Venus title-art identity/outfit extent; standing CQC body reconstructed from qualified officialPSP fullbody complement, distinct MobileUID, no appearance alias.

**État vérifié :** unattested-body-presentation-reconstruction. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `shoot` = special, specialForward ; `deploy` = specialDown, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, super, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** VENUS — AC!D2 MOBILE : préparation du support AC!D et de l’arme propre au profil. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** déplacement lisible entre la décision de carte et son exécution. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Cartes équipées et coût temporel » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder préparation du support AC!D et de l’arme propre au profil.
- **jump_land :** VENUS — AC!D2 MOBILE : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. déplacement lisible entre la décision de carte et son exécution. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de VENUS — AC!D2 MOBILE. Terminer par refermer la séquence de carte puis revenir à la garde. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « AC!D 2 MOBILE », présentation de Original2009 phone Venus title-art identity/outfit extent; standing CQC body reconstructed from qualified officialPSP fullbody complement, distinct MobileUID, no appearance alias., puis préparation du support AC!D et de l’arme propre au profil. Geste court lié à « Carte Vénus Mobile » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, refermer la séquence de carte puis revenir à la garde ; VENUS — AC!D2 MOBILE vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à AC!D 2 MOBILE.
- **round_loss :** Proposition CQC : VENUS — AC!D2 MOBILE réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Main Vénus Mobile », revenir par refermer la séquence de carte puis revenir à la garde, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VENUS — AC!D2 MOBILE, préparer « Jab » ; préparation du support AC!D et de l’arme propre au profil. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** refermer la séquence de carte puis revenir à la garde.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VENUS — AC!D2 MOBILE, préparer « Frappe engagée » ; préparation du support AC!D et de l’arme propre au profil. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** refermer la séquence de carte puis revenir à la garde.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VENUS — AC!D2 MOBILE, préparer « Balayage » ; préparation du support AC!D et de l’arme propre au profil. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** refermer la séquence de carte puis revenir à la garde.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VENUS — AC!D2 MOBILE, préparer « Projection » ; préparation du support AC!D et de l’arme propre au profil. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** refermer la séquence de carte puis revenir à la garde. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Carte Vénus Mobile

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VENUS — AC!D2 MOBILE, préparer « Carte Vénus Mobile » ; préparation du support AC!D et de l’arme propre au profil. Montrer la prise et la visée de l’arme décrite par « Carte Vénus Mobile » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** refermer la séquence de carte puis revenir à la garde. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Carte zone Mobile

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VENUS — AC!D2 MOBILE, préparer « Carte zone Mobile » ; préparation du support AC!D et de l’arme propre au profil. Prélever l’objet correspondant à « Carte zone Mobile », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** refermer la séquence de carte puis revenir à la garde. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Carte verrou Mobile

**Existant :** `mark` / `recon` ; 26/1/30 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VENUS — AC!D2 MOBILE, préparer « Carte verrou Mobile » ; préparation du support AC!D et de l’arme propre au profil. Orienter regard, optique ou terminal vers la cible observée, sans consulter une action future.

**Action.** Pour « Carte verrou Mobile », déclencher lecture/repérage avec un petit geste ou changement d’optique et un indicateur séparé. Le corps doit rester visible et vulnérable selon les données de combat.

**Retour.** refermer la séquence de carte puis revenir à la garde. Couper le signal ou abaisser l’outil ; retour vers l’adversaire sans nouvelle arme inventée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Portée limitée ; le marquage ne vise ni à travers toute l’arène ni automatiquement.

##### specialBack — Carte esquive Mobile

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VENUS — AC!D2 MOBILE, préparer « Carte esquive Mobile » ; préparation du support AC!D et de l’arme propre au profil. Préparer l’appui qui produit le déplacement ; déplacement lisible entre la décision de carte et son exécution.

**Action.** Exécuter « Carte esquive Mobile » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** refermer la séquence de carte puis revenir à la garde. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Main Vénus Mobile

**Existant :** `projectile` / `card` ; 35/1/44 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VENUS — AC!D2 MOBILE, préparer « Main Vénus Mobile » ; préparation du support AC!D et de l’arme propre au profil. Donner à la source de « Main Vénus Mobile » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet card de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet. La salve contient 4 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** refermer la séquence de carte puis revenir à la garde. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 4 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Réduire le COST

**Existant :** `recover` / `recovery` ; 45/1/25 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VENUS — AC!D2 MOBILE, préparer « Réduire le COST » ; préparation du support AC!D et de l’arme propre au profil. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Réduire le COST ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** refermer la séquence de carte puis revenir à la garde. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Refroidissement ou pause tactique interrompable ; aucun soin gratuit.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Main Vénus Mobile — Final

Famille `card`, ton `stylized` ; 220 ticks CQC ; phases actuelles : deal → chain → costlock → discard. Appuis déclarés : Main Vénus Mobile / Carte Vénus Mobile.

Plan 1 : VENUS — AC!D2 MOBILE sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Main Vénus Mobile / Carte Vénus Mobile ». Plan 2 : rendre lisible la décision de carte associée à « Main Vénus Mobile / Carte Vénus Mobile ». Plan 3 : réaliser l’effet par le vrai corps/outil du profil ; les cartes servent à la présentation AC!D, pas à inventer un équipement canonique. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : refermer la séquence de carte puis revenir à la garde, pose de signature face à l’adversaire.

##### Carte Vénus Mobile / Carte zone Mobile

Famille `ballistic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Main Vénus Mobile / Carte zone Mobile.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Main Vénus Mobile / Carte zone Mobile » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Main Vénus Mobile / Carte zone Mobile », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : refermer la séquence de carte puis revenir à la garde, arrêt du dispositif et retour au cadre d’ensemble.

##### Carte verrou Mobile — Point final

Famille `card`, ton `stylized` ; 256 ticks CQC ; phases actuelles : deal → chain → costlock → discard. Appuis déclarés : Main Vénus Mobile / Carte verrou Mobile.

Plan 1 : approche jusqu’à la distance réelle de « Main Vénus Mobile / Carte verrou Mobile », arme et main libre identifiées. Plan 2 : rendre lisible la décision de carte associée à « Main Vénus Mobile / Carte verrou Mobile ». Plan 3 : réaliser l’effet par le vrai corps/outil du profil ; les cartes servent à la présentation AC!D, pas à inventer un équipement canonique. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : refermer la séquence de carte puis revenir à la garde, prise de distance et maintien final.

##### Tempo des cartes — Mission close

Famille `card`, ton `stylized` ; 274 ticks CQC ; phases actuelles : deal → chain → costlock → discard. Appuis déclarés : Main Vénus Mobile / Projection.

Plan 1 : après une observation ou un repli, VENUS — AC!D2 MOBILE reprend l’initiative par « Main Vénus Mobile / Projection ». Plan 2 : rendre lisible la décision de carte associée à « Main Vénus Mobile / Projection ». Plan 3 : réaliser l’effet par le vrai corps/outil du profil ; les cartes servent à la présentation AC!D, pas à inventer un équipement canonique. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : refermer la séquence de carte puis revenir à la garde, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Identity/reference scope/equipment and anatomical sides reviewed within the explicitly stated source limits; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Mobile title/body extent is partial and artwork, not a whole standing phonegame model; belowextent and heldweapon details are source-informed authored reconstruction.
- PSP fullbody appearance supports remaining costume/boots and darklonggun shape only as an explicitly qualified related appearance reference; no direct Mobile/PSP alias.
- Phone screenshots retrieved here show Snake and enemyguards, not Venusgameplaymodel; no false identification of red-beretguard as Venus.
- Exact longgun model/manufacturer and gun microdetails are unattested; generated faithful silhouette is a presentation interpretation.
- 16authored actionposes per direction are CQCadaptation, not phone motioncapture.
- [Period2009 Konami/Glu phone title-art reproductions actually depict Venus blonde with dark/red uppercostume and longgun; canonical wholebody PSP artwork is expressly qualified complement, not proof identical phone mesh. Phone model below visible extent remains unattested, presented under strict reconstruction contract.](https://www.generation-nt.com/actualites/metal-gear-acid-glu-mobile-jeu-telephone-portable-snake-254651) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## archive__haven_trooper

### HAVEN TROOPER — MGS4

**Rôle :** Tir, grenades et distance. **Profil :** `soldier`.

**Base présente dans le code :** Haven Trooper : armure et mobilité de troupe, pas pouvoirs des Beauty and Beast.

**Incarnation à conserver :** Haven Trooper / FROG, black female powered tactical suit, tan harness, orange lenses and FN P90

**État vérifié :** métadonnées natives avec limites. 28 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `tuxedo`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** HAVEN TROOPER : appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas courts, crosse/équipement conservés près du torse. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Tir, grenades et distance » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder appui militaire stable, arme maintenue dans l’axe et regard vers la menace.
- **jump_land :** HAVEN TROOPER : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas courts, crosse/équipement conservés près du torse. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de HAVEN TROOPER. Terminer par retour en couverture de l’arme après le coup. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS4 », présentation de Haven Trooper / FROG, black female powered tactical suit, tan harness, orange lenses and FN P90, puis appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Geste court lié à « P90 du Trooper » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, retour en couverture de l’arme après le coup ; HAVEN TROOPER vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS4.
- **round_loss :** Proposition CQC : HAVEN TROOPER réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Feu de la troupe », revenir par retour en couverture de l’arme après le coup, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de HAVEN TROOPER, préparer « Jab » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de HAVEN TROOPER, préparer « Frappe engagée » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de HAVEN TROOPER, préparer « Balayage » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de HAVEN TROOPER, préparer « Projection » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** retour en couverture de l’arme après le coup. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — P90 du Trooper

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de HAVEN TROOPER, préparer « P90 du Trooper » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « P90 du Trooper » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Grenade d’assaut

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de HAVEN TROOPER, préparer « Grenade d’assaut » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Prélever l’objet correspondant à « Grenade d’assaut », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Bond FROG

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de HAVEN TROOPER, préparer « Bond FROG » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Bond FROG » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Repli du Trooper

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de HAVEN TROOPER, préparer « Repli du Trooper » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer l’appui qui produit le déplacement ; pas courts, crosse/équipement conservés près du torse.

**Action.** Exécuter « Repli du Trooper » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** retour en couverture de l’arme après le coup. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Feu de la troupe

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de HAVEN TROOPER, préparer « Feu de la troupe » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Feu de la troupe » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de HAVEN TROOPER, préparer « Recharger » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** retour en couverture de l’arme après le coup. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Feu de la troupe — Final

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Feu de la troupe / P90 du Trooper.

Plan 1 : HAVEN TROOPER sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Feu de la troupe / P90 du Trooper ». Plan 2 : présenter l’arme effectivement associée à « Feu de la troupe / P90 du Trooper », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : retour en couverture de l’arme après le coup, pose de signature face à l’adversaire.

##### P90 du Trooper / Grenade d’assaut

Famille `ballistic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Feu de la troupe / Grenade d’assaut.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Feu de la troupe / Grenade d’assaut » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Feu de la troupe / Grenade d’assaut », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : retour en couverture de l’arme après le coup, arrêt du dispositif et retour au cadre d’ensemble.

##### Bond FROG — Point final

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Feu de la troupe / Bond FROG.

Plan 1 : approche jusqu’à la distance réelle de « Feu de la troupe / Bond FROG », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Feu de la troupe / Bond FROG », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : retour en couverture de l’arme après le coup, prise de distance et maintien final.

##### Sang-froid — Mission close

Famille `ballistic`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Feu de la troupe / Projection.

Plan 1 : après une observation ou un repli, HAVEN TROOPER reprend l’initiative par « Feu de la troupe / Projection ». Plan 2 : présenter l’arme effectivement associée à « Feu de la troupe / Projection », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : retour en couverture de l’arme après le coup, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Complete released CGI color/model primary; monochrome design sheet only corroborates construction, not alternative color.
- Tiny56helmet mark and armor manufacturing details adapted at native sprite resolution; not original texture certification.
- Sixteen authored tactical fighting poses per direction retain female fullclosedhelmetbody/P90 anatomy; no gameplay or ballistic-data changes.
- V1 both facings rejected for cropped pose12; V2 compact native reload pose preserves both complete clawed feet. Horizontal P90 aim is physical pose8 in both directions and presentation selects that native pose explicitly.
- [Complete original Konami CGI FROGs Soldier physique/black-tan armor/claweffect feet/P90 physically viewed; official front/back monochrome design sheet adds native seam and limb construction only.](https://www.creativeuncut.com/gallery-06/mgs4-frogs-soldier.html) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## archive__dwalker

### D-WALKER — MGSV

**Rôle :** Arme montée et jambes mécaniques. **Profil :** `walker`.

**Base présente dans le code :** D-Walker : châssis pilotable, arme montée et stabilisation ; échelle adaptée.

**Incarnation à conserver :** D-Walker : châssis pilotable, arme montée et stabilisation ; échelle adaptée.

**État vérifié :** route machine effectivement déclarée ; animations d’articulation à contrôler. Une route machine est déclarée dans le runtime. Ses articulations remplacent le catalogue de corps contrôlé ; ce n’est pas un constat de sprite absent.

**Réemplois à examiner :** pas de groupe natif partagé observé dans cette extraction.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** D-WALKER : pilote ou châssis de Walker Gear visibles dans leur rôle exact. Petits ajustements mécaniques des organes présents et optique stable ; aucune respiration humaine. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** articulation des deux jambes, stabilisation du haut et du canon. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Arme montée et jambes mécaniques » : orientation défensive du châssis, des membres ou de la protection effectivement présente ; pas d’avant-bras humain ajouté ; recul bloqué distinct de la simple position basse. Garder pilote ou châssis de Walker Gear visibles dans leur rôle exact.
- **jump_land :** D-WALKER : départ par poussée ou articulation autorisée, déplacement aérien puis stabilisation et reprise d’appui ; les appareils volants gardent leur mode de sustentation. articulation des deux jambes, stabilisation du haut et du canon. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Secousse du châssis et de l’organe touché de D-WALKER, déséquilibre, arrêt puis remise en position par ses articulations réelles. Terminer par absorption du recul par le châssis ; pas de bras humain ajouté. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGSV », présentation de D-Walker : châssis pilotable, arme montée et stabilisation ; échelle adaptée., puis pilote ou châssis de Walker Gear visibles dans leur rôle exact. Geste court lié à « Arme montée D-Walker » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, absorption du recul par le châssis ; pas de bras humain ajouté ; D-WALKER vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGSV.
- **round_loss :** Proposition CQC : D-WALKER interrompt ses émissions, absorbe l’oscillation de sa masse, stabilise ses appuis ou son vol, puis replace ses organes ; aucune régénération gratuite. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « D-Walker — feu continu », revenir par absorption du recul par le châssis ; pas de bras humain ajouté, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de D-WALKER, préparer « Jab » ; pilote ou châssis de Walker Gear visibles dans leur rôle exact. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** absorption du recul par le châssis ; pas de bras humain ajouté.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de D-WALKER, préparer « Frappe engagée » ; pilote ou châssis de Walker Gear visibles dans leur rôle exact. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** absorption du recul par le châssis ; pas de bras humain ajouté.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de D-WALKER, préparer « Balayage » ; pilote ou châssis de Walker Gear visibles dans leur rôle exact. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** absorption du recul par le châssis ; pas de bras humain ajouté.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Poussée du châssis

**Existant :** `melee` / `strike` ; 13/4/32 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de D-WALKER, préparer « Poussée du châssis » ; pilote ou châssis de Walker Gear visibles dans leur rôle exact. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Poussée du châssis » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** absorption du recul par le châssis ; pas de bras humain ajouté.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### special — Arme montée D-Walker

**Existant :** `projectile` / `tranq` ; 19/1/29 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de D-WALKER, préparer « Arme montée D-Walker » ; pilote ou châssis de Walker Gear visibles dans leur rôle exact. Montrer la prise et la visée de l’arme décrite par « Arme montée D-Walker » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** absorption du recul par le châssis ; pas de bras humain ajouté. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Se baisser, bloquer ; la somnolence décroît et ne provoque pas de K.O. instantané.

##### specialDown — Roquette D-Walker

**Existant :** `projectile` / `rocket` ; 32/1/38 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de D-WALKER, préparer « Roquette D-Walker » ; pilote ou châssis de Walker Gear visibles dans leur rôle exact. Montrer la prise et la visée de l’arme décrite par « Roquette D-Walker » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** absorption du recul par le châssis ; pas de bras humain ajouté. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Verrouillage lent, virage limité ; le missile peut être détruit.

##### specialForward — Poussée de D-Walker

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de D-WALKER, préparer « Poussée de D-Walker » ; pilote ou châssis de Walker Gear visibles dans leur rôle exact. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Poussée de D-Walker » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** absorption du recul par le châssis ; pas de bras humain ajouté.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Stabiliser D-Walker

**Existant :** `buff` / `armor` ; 22/1/31 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de D-WALKER, préparer « Stabiliser D-Walker » ; pilote ou châssis de Walker Gear visibles dans leur rôle exact. Montrer la préparation corporelle ou mécanique de « Stabiliser D-Walker ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** absorption du recul par le châssis ; pas de bras humain ajouté. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Absorbe une seule frappe ; projections, EMP et attaques brise-armure la contrent.

##### super — D-Walker — feu continu

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de D-WALKER, préparer « D-Walker — feu continu » ; pilote ou châssis de Walker Gear visibles dans leur rôle exact. Montrer la prise et la visée de l’arme décrite par « D-Walker — feu continu » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 7 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** absorption du recul par le châssis ; pas de bras humain ajouté. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 7 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recharge de la batterie

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de D-WALKER, préparer « Recharge de la batterie » ; pilote ou châssis de Walker Gear visibles dans leur rôle exact. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Recharge de la batterie ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** absorption du recul par le châssis ; pas de bras humain ajouté. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### D-Walker Cannon

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : D-Walker — feu continu / Arme montée D-Walker.

Plan 1 : D-WALKER sécurise son appui, regarde la cible et prépare l’outil ou le geste de « D-Walker — feu continu / Arme montée D-Walker ». Plan 2 : présenter l’arme effectivement associée à « D-Walker — feu continu / Arme montée D-Walker », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : absorption du recul par le châssis ; pas de bras humain ajouté, pose de signature face à l’adversaire.

##### Mobility Gear

Famille `capture`, ton `stylized` ; 238 ticks CQC ; phases actuelles : stun → disarm → restrain → extract. Appuis déclarés : D-Walker — feu continu / Roquette D-Walker.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « D-Walker — feu continu / Roquette D-Walker » ; l’espace disponible doit être lisible. Plan 2 : contact de saisie ou neutralisation lié à « D-Walker — feu continu / Roquette D-Walker », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : absorption du recul par le châssis ; pas de bras humain ajouté, arrêt du dispositif et retour au cadre d’ensemble.

##### Buddy Protocol

Famille `mechanical`, ton `stylized` ; 256 ticks CQC ; phases actuelles : lock → barrage → core → shutdown. Appuis déclarés : D-Walker — feu continu / Poussée de D-Walker.

Plan 1 : approche jusqu’à la distance réelle de « D-Walker — feu continu / Poussée de D-Walker », arme et main libre identifiées. Plan 2 : articulation des deux jambes, stabilisation du haut et du canon ; montrer l’organe de « D-Walker — feu continu / Poussée de D-Walker ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : absorption du recul par le châssis ; pas de bras humain ajouté, prise de distance et maintien final.

##### Platform Shutdown

Famille `mechanical`, ton `stylized` ; 274 ticks CQC ; phases actuelles : lock → barrage → core → shutdown. Appuis déclarés : D-Walker — feu continu / Poussée du châssis.

Plan 1 : après une observation ou un repli, D-WALKER reprend l’initiative par « D-Walker — feu continu / Poussée du châssis ». Plan 2 : articulation des deux jambes, stabilisation du haut et du canon ; montrer l’organe de « D-Walker — feu continu / Poussée du châssis ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : absorption du recul par le châssis ; pas de bras humain ajouté, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Aucun pouvoir importé d’une autre incarnation.
- Aucune invulnérabilité permanente, saisie infinie ou contrôle des touches adverses.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).
