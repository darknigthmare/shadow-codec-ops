# Animations — CORE

**10 acteurs du registre courant.** Les titres d’actions et paramètres sont observés ; les descriptions sont des propositions CQC à produire et valider. Un groupe de frames existant ne certifie pas l’ensemble du mouvement ou sa fidélité originale.

[Index des fiches](README.md) · [Contrat commun](../04_ANIMATIONS_SPRITES.md)

## Sommaire

- [SOLID SNAKE — MG1](#core__snake_mg1) — METAL GEAR / INTRUDE N313
- [SHOTMAKER](#core__shotmaker) — METAL GEAR / SHOOT GUNNER
- [MACHINEGUN KID](#core__machinegun_kid) — METAL GEAR / OUTER HEAVEN
- [FIRE TROOPER](#core__firetrooper) — METAL GEAR / OUTER HEAVEN
- [DIRTY DUCK](#core__dirtyduck) — METAL GEAR / COWARD DUCK
- [BIG BOSS — MG1](#core__bigboss_mg1) — METAL GEAR / COMMANDANT FINAL
- [SOLID SNAKE — MG2](#core__snake_mg2) — METAL GEAR 2 / ZANZIBAR LAND
- [BLACK NINJA](#core__ninja_mg2) — METAL GEAR 2 / BLACK COLOR
- [RUNNING MAN](#core__runner_mg2) — METAL GEAR 2 / POURSUITE
- [RED BLASTER](#core__redblaster_mg2) — METAL GEAR 2 / DÉMOLITION

## core__snake_mg1

### SOLID SNAKE — MG1 — METAL GEAR / INTRUDE N313

**Rôle :** Tir, grenades et distance. **Profil :** `soldier`.

**Base présente dans le code :** Soldat humain MG1 : armes contemporaines et poings, pas d’exosquelette ni de bras bionique.

**Incarnation à conserver :** Solid Snake rookie FOXHOUND 1995, original1987 manual face, modern interpretation of original MSX2 palette.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** SOLID SNAKE — MG1 : appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas courts, crosse/équipement conservés près du torse. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Tir, grenades et distance » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder appui militaire stable, arme maintenue dans l’axe et regard vers la menace.
- **jump_land :** SOLID SNAKE — MG1 : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas courts, crosse/équipement conservés près du torse. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de SOLID SNAKE — MG1. Terminer par retour en couverture de l’arme après le coup. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « METAL GEAR / INTRUDE N313 », présentation de Solid Snake rookie FOXHOUND 1995, original1987 manual face, modern interpretation of original MSX2 palette., puis appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Geste court lié à « Pistolet d’Outer Heaven » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, retour en couverture de l’arme après le coup ; SOLID SNAKE — MG1 vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à METAL GEAR / INTRUDE N313.
- **round_loss :** Proposition CQC : SOLID SNAKE — MG1 réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Intrude N313 », revenir par retour en couverture de l’arme après le coup, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — MG1, préparer « Jab » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — MG1, préparer « Frappe engagée » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — MG1, préparer « Balayage » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — MG1, préparer « Projection » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** retour en couverture de l’arme après le coup. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Pistolet d’Outer Heaven

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — MG1, préparer « Pistolet d’Outer Heaven » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Pistolet d’Outer Heaven » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Grenade récupérée

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — MG1, préparer « Grenade récupérée » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Prélever l’objet correspondant à « Grenade récupérée », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Coude du FOXHOUND

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — MG1, préparer « Coude du FOXHOUND » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Coude du FOXHOUND » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Repli MG1

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — MG1, préparer « Repli MG1 » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer l’appui qui produit le déplacement ; pas courts, crosse/équipement conservés près du torse.

**Action.** Exécuter « Repli MG1 » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** retour en couverture de l’arme après le coup. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Intrude N313

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — MG1, préparer « Intrude N313 » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Intrude N313 » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — MG1, préparer « Recharger » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** retour en couverture de l’arme après le coup. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Intrude N313 — Final

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Intrude N313 / Pistolet d’Outer Heaven.

Plan 1 : SOLID SNAKE — MG1 sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Intrude N313 / Pistolet d’Outer Heaven ». Plan 2 : présenter l’arme effectivement associée à « Intrude N313 / Pistolet d’Outer Heaven », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : retour en couverture de l’arme après le coup, pose de signature face à l’adversaire.

##### Pistolet d’Outer Heaven / Grenade récupérée

Famille `ballistic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Intrude N313 / Grenade récupérée.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Intrude N313 / Grenade récupérée » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Intrude N313 / Grenade récupérée », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : retour en couverture de l’arme après le coup, arrêt du dispositif et retour au cadre d’ensemble.

##### Coude du FOXHOUND — Point final

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Intrude N313 / Coude du FOXHOUND.

Plan 1 : approche jusqu’à la distance réelle de « Intrude N313 / Coude du FOXHOUND », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Intrude N313 / Coude du FOXHOUND », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : retour en couverture de l’arme après le coup, prise de distance et maintien final.

##### Sang-froid — Mission close

Famille `ballistic`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Intrude N313 / Projection.

Plan 1 : après une observation ou un repli, SOLID SNAKE — MG1 reprend l’initiative par « Intrude N313 / Projection ». Plan 2 : présenter l’arme effectivement associée à « Intrude N313 / Projection », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : retour en couverture de l’arme après le coup, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Only the explicitly visible upper-body details are documented by the historical portrait. Plain lower-body garments and shoes, colours absent from the monochrome source and unseen seams are restrained project adaptation; no false claim of a released full-body turnaround.
- Original field pixels establish overall teal/blue-green palette, not exact seams; MG1 manual text explicitly lists Ingram MAC11, and original MG2 drawing is labelled supplemental weapon geometry, not a MG1 rendered model.
- Sixteen complete native keyposes per facing are authored gameplay poses, not original historical animation frames.
- LeftV1 was rejected for closed shirt and idle-equipment mismatch; leftV2 restores open teal jacket, light tee, matching MAC11 equipment states. All original revisions are preserved.
- [Physically viewed original character reference(s), retained bitexact with source receipts; authored modern native sprite adaptation preserves documented visible details.](https://lparchive.org/Metal-Gear-1-2/Update%2001/8-NZfLC.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__shotmaker

### SHOTMAKER — METAL GEAR / SHOOT GUNNER

**Rôle :** Tir, grenades et distance. **Profil :** `soldier`.

**Base présente dans le code :** Spécialiste du fusil à pompe ; tir court et récupération lente.

**Incarnation à conserver :** Modern native interpretation of original1987 manual mercenary silhouette and originalMSX2 boss palette.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** SHOTMAKER : appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas courts, crosse/équipement conservés près du torse. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Tir, grenades et distance » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder appui militaire stable, arme maintenue dans l’axe et regard vers la menace.
- **jump_land :** SHOTMAKER : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas courts, crosse/équipement conservés près du torse. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de SHOTMAKER. Terminer par retour en couverture de l’arme après le coup. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « METAL GEAR / SHOOT GUNNER », présentation de Modern native interpretation of original1987 manual mercenary silhouette and originalMSX2 boss palette., puis appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Geste court lié à « Fusil à pompe » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, retour en couverture de l’arme après le coup ; SHOTMAKER vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à METAL GEAR / SHOOT GUNNER.
- **round_loss :** Proposition CQC : SHOTMAKER réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Double gerbe », revenir par retour en couverture de l’arme après le coup, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SHOTMAKER, préparer « Jab » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SHOTMAKER, préparer « Frappe engagée » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SHOTMAKER, préparer « Balayage » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SHOTMAKER, préparer « Projection » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** retour en couverture de l’arme après le coup. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Fusil à pompe

**Existant :** `projectile` / `ballistic` ; 24/1/36 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SHOTMAKER, préparer « Fusil à pompe » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Fusil à pompe » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Rester hors de la portée courte ; ne pas foncer pendant la gerbe.

##### specialDown — Grenade de zone

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SHOTMAKER, préparer « Grenade de zone » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Prélever l’objet correspondant à « Grenade de zone », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Crosse du Shotmaker

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SHOTMAKER, préparer « Crosse du Shotmaker » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Crosse du Shotmaker » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Repli de garde

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SHOTMAKER, préparer « Repli de garde » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer l’appui qui produit le déplacement ; pas courts, crosse/équipement conservés près du torse.

**Action.** Exécuter « Repli de garde » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** retour en couverture de l’arme après le coup. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Double gerbe

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SHOTMAKER, préparer « Double gerbe » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Double gerbe » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 2 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 2 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SHOTMAKER, préparer « Recharger » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** retour en couverture de l’arme après le coup. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Double gerbe — Final

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Double gerbe / Fusil à pompe.

Plan 1 : SHOTMAKER sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Double gerbe / Fusil à pompe ». Plan 2 : présenter l’arme effectivement associée à « Double gerbe / Fusil à pompe », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : retour en couverture de l’arme après le coup, pose de signature face à l’adversaire.

##### Fusil à pompe / Grenade de zone

Famille `ballistic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Double gerbe / Grenade de zone.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Double gerbe / Grenade de zone » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Double gerbe / Grenade de zone », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : retour en couverture de l’arme après le coup, arrêt du dispositif et retour au cadre d’ensemble.

##### Crosse du Shotmaker — Point final

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Double gerbe / Crosse du Shotmaker.

Plan 1 : approche jusqu’à la distance réelle de « Double gerbe / Crosse du Shotmaker », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Double gerbe / Crosse du Shotmaker », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : retour en couverture de l’arme après le coup, prise de distance et maintien final.

##### Sang-froid — Mission close

Famille `ballistic`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Double gerbe / Projection.

Plan 1 : après une observation ou un repli, SHOTMAKER reprend l’initiative par « Double gerbe / Projection ». Plan 2 : présenter l’arme effectivement associée à « Double gerbe / Projection », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : retour en couverture de l’arme après le coup, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Whole original tiny MSX2 sprite establishes broad field palette; monochrome mercenary illustration establishes silhouette/equipped firearm. High-detail face, unseen seams/colours and rear surfaces remain restrained reconstruction.
- No exact firearm manufacturer/model can be established from original illustration/game pixels. Preserve visible conventional weapon form and original generic role, do not assert a modern named replacement.
- Sixteen native keyposes per direction are authored gameplay adaptation.
- [Original1987 manual mercenary illustration mirrored by LP and whole originalMSX2 boss gameplay physically viewed; generic depicted weapon silhouette retained without invented exact model identity.](https://lparchive.org/Metal-Gear-1-2/Update%2011/58-wSLfj.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__machinegun_kid

### MACHINEGUN KID — METAL GEAR / OUTER HEAVEN

**Rôle :** Tir, grenades et distance. **Profil :** `soldier`.

**Base présente dans le code :** Mitrailleuse et verrouillage horizontal, sans tirs homing.

**Incarnation à conserver :** Modern native interpretation of original1987 manual mercenary silhouette and originalMSX2 boss palette.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** MACHINEGUN KID : appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas courts, crosse/équipement conservés près du torse. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Tir, grenades et distance » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder appui militaire stable, arme maintenue dans l’axe et regard vers la menace.
- **jump_land :** MACHINEGUN KID : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas courts, crosse/équipement conservés près du torse. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de MACHINEGUN KID. Terminer par retour en couverture de l’arme après le coup. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « METAL GEAR / OUTER HEAVEN », présentation de Modern native interpretation of original1987 manual mercenary silhouette and originalMSX2 boss palette., puis appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Geste court lié à « Mitrailleuse Kid » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, retour en couverture de l’arme après le coup ; MACHINEGUN KID vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à METAL GEAR / OUTER HEAVEN.
- **round_loss :** Proposition CQC : MACHINEGUN KID réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Mur de balles », revenir par retour en couverture de l’arme après le coup, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MACHINEGUN KID, préparer « Jab » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MACHINEGUN KID, préparer « Frappe engagée » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MACHINEGUN KID, préparer « Balayage » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MACHINEGUN KID, préparer « Projection » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** retour en couverture de l’arme après le coup. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Mitrailleuse Kid

**Existant :** `projectile` / `ballistic` ; 22/1/36 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MACHINEGUN KID, préparer « Mitrailleuse Kid » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Mitrailleuse Kid » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 3 émissions, espacées de 5 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 3 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### specialDown — Grenade de couverture

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MACHINEGUN KID, préparer « Grenade de couverture » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Prélever l’objet correspondant à « Grenade de couverture », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Crosse blindée

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MACHINEGUN KID, préparer « Crosse blindée » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Crosse blindée » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Repli de tir

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MACHINEGUN KID, préparer « Repli de tir » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer l’appui qui produit le déplacement ; pas courts, crosse/équipement conservés près du torse.

**Action.** Exécuter « Repli de tir » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** retour en couverture de l’arme après le coup. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Mur de balles

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MACHINEGUN KID, préparer « Mur de balles » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Mur de balles » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 7 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 7 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MACHINEGUN KID, préparer « Recharger » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** retour en couverture de l’arme après le coup. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Mur de balles — Final

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Mur de balles / Mitrailleuse Kid.

Plan 1 : MACHINEGUN KID sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Mur de balles / Mitrailleuse Kid ». Plan 2 : présenter l’arme effectivement associée à « Mur de balles / Mitrailleuse Kid », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : retour en couverture de l’arme après le coup, pose de signature face à l’adversaire.

##### Mitrailleuse Kid / Grenade de couverture

Famille `ballistic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Mur de balles / Grenade de couverture.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Mur de balles / Grenade de couverture » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Mur de balles / Grenade de couverture », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : retour en couverture de l’arme après le coup, arrêt du dispositif et retour au cadre d’ensemble.

##### Crosse blindée — Point final

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Mur de balles / Crosse blindée.

Plan 1 : approche jusqu’à la distance réelle de « Mur de balles / Crosse blindée », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Mur de balles / Crosse blindée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : retour en couverture de l’arme après le coup, prise de distance et maintien final.

##### Sang-froid — Mission close

Famille `ballistic`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Mur de balles / Projection.

Plan 1 : après une observation ou un repli, MACHINEGUN KID reprend l’initiative par « Mur de balles / Projection ». Plan 2 : présenter l’arme effectivement associée à « Mur de balles / Projection », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : retour en couverture de l’arme après le coup, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Whole original tiny MSX2 sprite establishes broad field palette; monochrome mercenary illustration establishes silhouette/equipped firearm. High-detail face, unseen seams/colours and rear surfaces remain restrained reconstruction.
- No exact firearm manufacturer/model can be established from original illustration/game pixels. Preserve visible conventional weapon form and original generic role, do not assert a modern named replacement.
- Sixteen native keyposes per direction are authored gameplay adaptation.
- [Original1987 manual mercenary illustration mirrored by LP and whole originalMSX2 boss gameplay physically viewed; generic depicted weapon silhouette retained without invented exact model identity.](https://lparchive.org/Metal-Gear-1-2/Update%2011/58-wSLfj.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__firetrooper

### FIRE TROOPER — METAL GEAR / OUTER HEAVEN

**Rôle :** Lance-flammes et propulseur. **Profil :** `pyro`.

**Base présente dans le code :** Soldat au lance-flammes ; protections et portée limitées.

**Incarnation à conserver :** Original MSX2, Outer Heaven Fire Trooper

**État vérifié :** métadonnées natives avec limites. 72 régions source distinctes dans les deux directions ; groupes : idle, walk, guard, crouch, jump, punch, heavy, low, hit, ko, throw, shoot, deploy, recover, attack.

**Réemplois à examiner :** `heavy` = heavy, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `tuxedo`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** FIRE TROOPER : buse, réservoir et conduites solidaires des prises de main. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas qui compensent le réservoir ; tuyau ne traverse pas le torse. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Lance-flammes et propulseur » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder buse, réservoir et conduites solidaires des prises de main.
- **jump_land :** FIRE TROOPER : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas qui compensent le réservoir ; tuyau ne traverse pas le torse. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de FIRE TROOPER. Terminer par arrêt de flamme, stabilisation de la buse et refroidissement visible. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « METAL GEAR / OUTER HEAVEN », présentation de Original MSX2, Outer Heaven Fire Trooper, puis buse, réservoir et conduites solidaires des prises de main. Geste court lié à « Lance-flammes » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, arrêt de flamme, stabilisation de la buse et refroidissement visible ; FIRE TROOPER vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à METAL GEAR / OUTER HEAVEN.
- **round_loss :** Proposition CQC : FIRE TROOPER réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Brasier d’Outer Heaven », revenir par arrêt de flamme, stabilisation de la buse et refroidissement visible, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FIRE TROOPER, préparer « Jab » ; buse, réservoir et conduites solidaires des prises de main. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** arrêt de flamme, stabilisation de la buse et refroidissement visible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FIRE TROOPER, préparer « Frappe engagée » ; buse, réservoir et conduites solidaires des prises de main. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** arrêt de flamme, stabilisation de la buse et refroidissement visible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FIRE TROOPER, préparer « Balayage » ; buse, réservoir et conduites solidaires des prises de main. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** arrêt de flamme, stabilisation de la buse et refroidissement visible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FIRE TROOPER, préparer « Projection » ; buse, réservoir et conduites solidaires des prises de main. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** arrêt de flamme, stabilisation de la buse et refroidissement visible. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Lance-flammes

**Existant :** `projectile` / `fire` ; 24/1/33 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FIRE TROOPER, préparer « Lance-flammes » ; buse, réservoir et conduites solidaires des prises de main. Montrer la prise et la visée de l’arme décrite par « Lance-flammes » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 3 émissions, espacées de 7 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** arrêt de flamme, stabilisation de la buse et refroidissement visible. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 3 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### specialDown — Nappe de feu

**Existant :** `trap` / `fire` ; 33/1/35 ticks ; groupe `deploy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FIRE TROOPER, préparer « Nappe de feu » ; buse, réservoir et conduites solidaires des prises de main. Prendre le dispositif, s’abaisser vers le support et indiquer le lieu de pose avant activation.

**Action.** Poser « Nappe de feu » au point réel de main/outil, armer puis retirer le membre. Le dispositif possède ensuite son propre sprite, ses états attente/armement/déclenchement/destruction et sa collision.

**Retour.** arrêt de flamme, stabilisation de la buse et refroidissement visible. Se dégager de l’objet sans le téléporter ; l’interruption avant armement a sa propre sortie.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Zone annoncée puis persistante ; sauter, contourner ou neutraliser le dispositif.

##### specialForward — Percée thermique

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FIRE TROOPER, préparer « Percée thermique » ; buse, réservoir et conduites solidaires des prises de main. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Percée thermique » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** arrêt de flamme, stabilisation de la buse et refroidissement visible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Tenue ignifuge

**Existant :** `buff` / `armor` ; 22/1/31 ticks ; groupe `guard`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FIRE TROOPER, préparer « Tenue ignifuge » ; buse, réservoir et conduites solidaires des prises de main. Montrer la préparation corporelle ou mécanique de « Tenue ignifuge ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** arrêt de flamme, stabilisation de la buse et refroidissement visible. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Absorbe une seule frappe ; projections, EMP et attaques brise-armure la contrent.

##### super — Brasier d’Outer Heaven

**Existant :** `projectile` / `fire` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FIRE TROOPER, préparer « Brasier d’Outer Heaven » ; buse, réservoir et conduites solidaires des prises de main. Montrer la prise et la visée de l’arme décrite par « Brasier d’Outer Heaven » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 5 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** arrêt de flamme, stabilisation de la buse et refroidissement visible. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 5 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Refroidir

**Existant :** `recover` / `recovery` ; 45/1/25 ticks ; groupe `recover`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FIRE TROOPER, préparer « Refroidir » ; buse, réservoir et conduites solidaires des prises de main. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Refroidir ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** arrêt de flamme, stabilisation de la buse et refroidissement visible. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Refroidissement ou pause tactique interrompable ; aucun soin gratuit.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Brasier d’Outer Heaven — Final

Famille `fire`, ton `stylized` ; 220 ticks CQC ; phases actuelles : ignite → sweep → inferno → embers. Appuis déclarés : Brasier d’Outer Heaven / Lance-flammes.

Plan 1 : FIRE TROOPER sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Brasier d’Outer Heaven / Lance-flammes ». Plan 2 : montrer la source corporelle ou matérielle de « Brasier d’Outer Heaven / Lance-flammes ». Plan 3 : développer l’effet fire en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : arrêt de flamme, stabilisation de la buse et refroidissement visible, pose de signature face à l’adversaire.

##### Lance-flammes / Nappe de feu

Famille `fire`, ton `stylized` ; 238 ticks CQC ; phases actuelles : ignite → sweep → inferno → embers. Appuis déclarés : Brasier d’Outer Heaven / Nappe de feu.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Brasier d’Outer Heaven / Nappe de feu » ; l’espace disponible doit être lisible. Plan 2 : montrer la source corporelle ou matérielle de « Brasier d’Outer Heaven / Nappe de feu ». Plan 3 : développer l’effet fire en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : arrêt de flamme, stabilisation de la buse et refroidissement visible, arrêt du dispositif et retour au cadre d’ensemble.

##### Percée thermique — Point final

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Brasier d’Outer Heaven / Percée thermique.

Plan 1 : approche jusqu’à la distance réelle de « Brasier d’Outer Heaven / Percée thermique », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Brasier d’Outer Heaven / Percée thermique », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : arrêt de flamme, stabilisation de la buse et refroidissement visible, prise de distance et maintien final.

##### Refroidissement — Mission close

Famille `fire`, ton `stylized` ; 274 ticks CQC ; phases actuelles : ignite → sweep → inferno → embers. Appuis déclarés : Brasier d’Outer Heaven / Projection.

Plan 1 : après une observation ou un repli, FIRE TROOPER reprend l’initiative par « Brasier d’Outer Heaven / Projection ». Plan 2 : montrer la source corporelle ou matérielle de « Brasier d’Outer Heaven / Projection ». Plan 3 : développer l’effet fire en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : arrêt de flamme, stabilisation de la buse et refroidissement visible, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Target 1:1, status closest_supported; no certified absolute pixel/model/motion equality.
- Original MSX2 sprite resolves pale cream/light-gray palette and simple mask/equipment, not exact cloth seams, tank fittings, nozzle internal dimensions or fingers.
- MSX2 sprite/manual govern costume and silhouette; later MGS4 Database head is secondary only and not 1987 full-body evidence.
- Side-view painting, gait, jumping, hand-to-hand moves, knockout, utility cooling and armor poses are versus adaptations.
- Conventional directional flame belongs to source; ground fire, multi-projectile bursts, armor buff and all numerical gameplay values remain existing versus adaptations.
- Round-mask oculars may overlap or become occluded in near profile; no revealed invented human face.
- Opposite facings authored independently through image_gen, never horizontally flipped.
- Target 1:1, status closest_supported; no certified absolute pixel/model/motion equality.
- Original MSX2 sprite resolves pale cream/light-gray palette and simple mask/equipment, not exact cloth seams, tank fittings, nozzle internal dimensions or fingers.
- MSX2 sprite/manual govern costume and silhouette; later MGS4 Database head is secondary only and not 1987 full-body evidence.
- Side-view painting, gait, jumping, hand-to-hand moves, knockout, utility cooling and armor poses are versus adaptations.
- Conventional directional flame belongs to source; ground fire, multi-projectile bursts, armor buff and all numerical gameplay values remain existing versus adaptations.
- Round-mask oculars may overlap or become occluded in near profile; no revealed invented human face.
- Opposite facings authored independently through image_gen, never horizontally flipped.
- Integrator physically viewed original MSX2 full-body sprite, gameplay capture356 and manual group plate; other producer-provided source files are retained with their stated authority, not newly claimed as independently viewed.
- [Original Metal Gear 1987 MSX2 full-body Fire Trooper gameplay sprite mirrored at thecodex.wiki; independently cross-checked against LPArchive Update08 original-game frames. Light gray/cream fabric and dark mask/straps are the palette authority.](https://thecodex.wiki/images/5/5a/Why_no_fire_trooper_image.png) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [LPArchive Metal-Gear-1-2 Update08 original MSX2 Fire Trooper room, source series explicitly declares original MSX version. Green-brick industrial walls, conventional flame specialist.](https://lparchive.org/Metal-Gear-1-2/Update%2008/30-Metal_Gear_0355.png) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original Metal Gear 1987 MSX2 Fire Trooper projecting flame, LPArchive Update08. Confirms directional conventional flamethrower and original green-brick room; no supernatural fire powers.](https://lparchive.org/Metal-Gear-1-2/Update%2008/32-Metal_Gear_0356.png) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original Metal Gear 1987 MSX2 Fire Trooper fight, LPArchive Update08, secondary pose/room confirmation.](https://lparchive.org/Metal-Gear-1-2/Update%2008/33-Metal_Gear_0357.png) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original Metal Gear MSX2 manual Outer Heaven mercenary group illustration mirrored by LPArchive Update11. Fire Trooper second from left; Arnold/Bloody Brad far right. Drawing is monochrome: silhouette/equipment reference ONLY, not independent color evidence. LP introduction identifies its manual text as a fan translation; original printed group artwork is distinct from that translation.](https://lparchive.org/Metal-Gear-1-2/Update%2011/58-wSLfj.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Official later Metal Gear Solid 4 Database head illustration of Fire Trooper, mirrored on thecodex.wiki. SECONDARY ONLY: clarifies gas mask and round oculars already consistent with original sprite. Not a modern gameplay costume and not evidence for unseen 1987 backpack fittings.](https://thecodex.wiki/images/1/18/Fire_Trooper_%28Metal_Gear%29.webp) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__dirtyduck

### DIRTY DUCK — METAL GEAR / COWARD DUCK

**Rôle :** Boomerangs aller-retour et repli. **Profil :** `hawk`.

**Base présente dans le code :** Boomerangs d’Outer Heaven ; le faucon de Slasher Hawk n’est pas transféré.

**Incarnation à conserver :** Coward Duck / Dirty Duck, original1987 MSX2 Outer Heaven mercenary with ordinary boomerang.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `blade` = special, specialDown, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** DIRTY DUCK : attitude aérienne liée à l’équipement observé, arme conservée. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** décollage et atterrissage avec cause visible ; pas de flottement arbitraire. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Boomerangs aller-retour et repli » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder attitude aérienne liée à l’équipement observé, arme conservée.
- **jump_land :** DIRTY DUCK : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. décollage et atterrissage avec cause visible ; pas de flottement arbitraire. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de DIRTY DUCK. Terminer par cesser la poussée puis poser les appuis. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « METAL GEAR / COWARD DUCK », présentation de Coward Duck / Dirty Duck, original1987 MSX2 Outer Heaven mercenary with ordinary boomerang., puis attitude aérienne liée à l’équipement observé, arme conservée. Geste court lié à « Boomerang de Dirty Duck » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, cesser la poussée puis poser les appuis ; DIRTY DUCK vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à METAL GEAR / COWARD DUCK.
- **round_loss :** Proposition CQC : DIRTY DUCK réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Double boomerang », revenir par cesser la poussée puis poser les appuis, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DIRTY DUCK, préparer « Jab » ; attitude aérienne liée à l’équipement observé, arme conservée. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** cesser la poussée puis poser les appuis.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DIRTY DUCK, préparer « Frappe engagée » ; attitude aérienne liée à l’équipement observé, arme conservée. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** cesser la poussée puis poser les appuis.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DIRTY DUCK, préparer « Balayage » ; attitude aérienne liée à l’équipement observé, arme conservée. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** cesser la poussée puis poser les appuis.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DIRTY DUCK, préparer « Projection » ; attitude aérienne liée à l’équipement observé, arme conservée. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** cesser la poussée puis poser les appuis. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Boomerang de Dirty Duck

**Existant :** `projectile` / `boomerang` ; 23/1/32 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DIRTY DUCK, préparer « Boomerang de Dirty Duck » ; attitude aérienne liée à l’équipement observé, arme conservée. Prélever l’objet correspondant à « Boomerang de Dirty Duck », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps.

**Retour.** cesser la poussée puis poser les appuis. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Deux trajets visibles ; une parade ou une attaque peut détruire le boomerang.

##### specialDown — Lancer bas

**Existant :** `projectile` / `boomerang` ; 23/1/32 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DIRTY DUCK, préparer « Lancer bas » ; attitude aérienne liée à l’équipement observé, arme conservée. Prélever l’objet correspondant à « Lancer bas », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps.

**Retour.** cesser la poussée puis poser les appuis. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Deux trajets visibles ; une parade ou une attaque peut détruire le boomerang.

##### specialForward — Bond de recul

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DIRTY DUCK, préparer « Bond de recul » ; attitude aérienne liée à l’équipement observé, arme conservée. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Bond de recul » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** cesser la poussée puis poser les appuis.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Repli du mercenaire

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DIRTY DUCK, préparer « Repli du mercenaire » ; attitude aérienne liée à l’équipement observé, arme conservée. Préparer l’appui qui produit le déplacement ; décollage et atterrissage avec cause visible ; pas de flottement arbitraire.

**Action.** Exécuter « Repli du mercenaire » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** cesser la poussée puis poser les appuis. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Double boomerang

**Existant :** `projectile` / `boomerang` ; 35/1/44 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DIRTY DUCK, préparer « Double boomerang » ; attitude aérienne liée à l’équipement observé, arme conservée. Prélever l’objet correspondant à « Double boomerang », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. La salve contient 2 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** cesser la poussée puis poser les appuis. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 2 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Reprendre son souffle

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DIRTY DUCK, préparer « Reprendre son souffle » ; attitude aérienne liée à l’équipement observé, arme conservée. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Reprendre son souffle ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** cesser la poussée puis poser les appuis. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Double boomerang — Final

Famille `blade`, ton `stylized` ; 220 ticks CQC ; phases actuelles : dash → crosscut → freeze → sheath. Appuis déclarés : Double boomerang / Boomerang de Dirty Duck.

Plan 1 : DIRTY DUCK sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Double boomerang / Boomerang de Dirty Duck ». Plan 2 : armer la lame ou le membre de « Double boomerang / Boomerang de Dirty Duck » et dégager son arc. Plan 3 : enchaîner des coupes lisibles avec angles distincts ; les impacts et les réactions suivent le fil de lame, sans ajout d’arme d’une autre incarnation. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : cesser la poussée puis poser les appuis, pose de signature face à l’adversaire.

##### Boomerang de Dirty Duck / Lancer bas

Famille `blade`, ton `stylized` ; 238 ticks CQC ; phases actuelles : dash → crosscut → freeze → sheath. Appuis déclarés : Double boomerang / Lancer bas.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Double boomerang / Lancer bas » ; l’espace disponible doit être lisible. Plan 2 : armer la lame ou le membre de « Double boomerang / Lancer bas » et dégager son arc. Plan 3 : enchaîner des coupes lisibles avec angles distincts ; les impacts et les réactions suivent le fil de lame, sans ajout d’arme d’une autre incarnation. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : cesser la poussée puis poser les appuis, arrêt du dispositif et retour au cadre d’ensemble.

##### Bond de recul — Point final

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Double boomerang / Bond de recul.

Plan 1 : approche jusqu’à la distance réelle de « Double boomerang / Bond de recul », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Double boomerang / Bond de recul », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : cesser la poussée puis poser les appuis, prise de distance et maintien final.

##### Mobilité — Mission close

Famille `blade`, ton `stylized` ; 274 ticks CQC ; phases actuelles : dash → crosscut → freeze → sheath. Appuis déclarés : Double boomerang / Projection.

Plan 1 : après une observation ou un repli, DIRTY DUCK reprend l’initiative par « Double boomerang / Projection ». Plan 2 : armer la lame ou le membre de « Double boomerang / Projection » et dégager son arc. Plan 3 : enchaîner des coupes lisibles avec angles distincts ; les impacts et les réactions suivent le fil de lame, sans ajout d’arme d’une autre incarnation. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : cesser la poussée puis poser les appuis, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Original tiny sprite establishes olive-green body palette and dark boots; printed manual documents crouched human and ordinary boomerang, not giant Slasher Hawk equipment. Full modern cloth texture, unseen seams and detailed face are closest faithful interpretation.
- Secondary2008 official Database head supports facial/hair silhouette only; the selected identity remains1987 MG1, never an invented MGS4 costume.
- Source does not prove a fixed original dominant hand; native boomerang holding gestures are authored gameplay animation without a false canonical handedness claim. No firearm or ballistic muzzle present.
- Sixteen physical poses in each facing are independently drawn modern adaptation, not original1987 frame motion.
- [Original1987 MSX2 sprite extraction plus original printed mercenary group illustration (fifth man from left) and supplemental official later MGS4 Database head of same MG1 character, all physically viewed.](https://thecodex.wiki/images/6/61/Dirty_Duck.webp) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__bigboss_mg1

### BIG BOSS — MG1 — METAL GEAR / COMMANDANT FINAL

**Rôle :** Tir, grenades et distance. **Profil :** `soldier`.

**Base présente dans le code :** Commandant MG1 armé ; aucun pouvoir cyborg emprunté à Snake’s Revenge.

**Incarnation à conserver :** Original1987 MSX2 Big Boss manual appearance with historical anatomical LEFT-eye patch preserved.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** BIG BOSS — MG1 : appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas courts, crosse/équipement conservés près du torse. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Tir, grenades et distance » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder appui militaire stable, arme maintenue dans l’axe et regard vers la menace.
- **jump_land :** BIG BOSS — MG1 : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas courts, crosse/équipement conservés près du torse. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de BIG BOSS — MG1. Terminer par retour en couverture de l’arme après le coup. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « METAL GEAR / COMMANDANT FINAL », présentation de Original1987 MSX2 Big Boss manual appearance with historical anatomical LEFT-eye patch preserved., puis appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Geste court lié à « Tir du commandant » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, retour en couverture de l’arme après le coup ; BIG BOSS — MG1 vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à METAL GEAR / COMMANDANT FINAL.
- **round_loss :** Proposition CQC : BIG BOSS — MG1 réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Ordre final », revenir par retour en couverture de l’arme après le coup, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BIG BOSS — MG1, préparer « Jab » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BIG BOSS — MG1, préparer « Frappe engagée » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BIG BOSS — MG1, préparer « Balayage » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BIG BOSS — MG1, préparer « Projection » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** retour en couverture de l’arme après le coup. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Tir du commandant

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BIG BOSS — MG1, préparer « Tir du commandant » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Tir du commandant » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Grenade d’Outer Heaven

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BIG BOSS — MG1, préparer « Grenade d’Outer Heaven » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Prélever l’objet correspondant à « Grenade d’Outer Heaven », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Crosse du vétéran

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BIG BOSS — MG1, préparer « Crosse du vétéran » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Crosse du vétéran » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Repli calculé

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BIG BOSS — MG1, préparer « Repli calculé » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer l’appui qui produit le déplacement ; pas courts, crosse/équipement conservés près du torse.

**Action.** Exécuter « Repli calculé » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** retour en couverture de l’arme après le coup. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Ordre final

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BIG BOSS — MG1, préparer « Ordre final » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Ordre final » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BIG BOSS — MG1, préparer « Recharger » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** retour en couverture de l’arme après le coup. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Ordre final — Final

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Ordre final / Tir du commandant.

Plan 1 : BIG BOSS — MG1 sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Ordre final / Tir du commandant ». Plan 2 : présenter l’arme effectivement associée à « Ordre final / Tir du commandant », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : retour en couverture de l’arme après le coup, pose de signature face à l’adversaire.

##### Tir du commandant / Grenade d’Outer Heaven

Famille `ballistic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Ordre final / Grenade d’Outer Heaven.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Ordre final / Grenade d’Outer Heaven » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Ordre final / Grenade d’Outer Heaven », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : retour en couverture de l’arme après le coup, arrêt du dispositif et retour au cadre d’ensemble.

##### Crosse du vétéran — Point final

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Ordre final / Crosse du vétéran.

Plan 1 : approche jusqu’à la distance réelle de « Ordre final / Crosse du vétéran », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Ordre final / Crosse du vétéran », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : retour en couverture de l’arme après le coup, prise de distance et maintien final.

##### Sang-froid — Mission close

Famille `ballistic`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Ordre final / Projection.

Plan 1 : après une observation ou un repli, BIG BOSS — MG1 reprend l’initiative par « Ordre final / Projection ». Plan 2 : présenter l’arme effectivement associée à « Ordre final / Projection », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : retour en couverture de l’arme après le coup, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Only the explicitly visible upper-body details are documented by the historical portrait. Plain lower-body garments and shoes, colours absent from the monochrome source and unseen seams are restrained project adaptation; no false claim of a released full-body turnaround.
- The original1987 manual really places the patch on anatomical LEFT eye. This historical edition distinction is deliberate; later incarnations stay separate and are not appearance aliases. Tiny boss sprite gives only broad field palette, no detailed cloth evidence.
- Sixteen complete native keyposes per facing are authored gameplay poses, not original historical animation frames.
- LeftV1 was rejected for mirrored patch anatomy; leftV2 is the independently generated whole-atlas corrective edit. All rejected originals are preserved.
- [Physically viewed original character reference(s), retained bitexact with source receipts; authored modern native sprite adaptation preserves documented visible details.](https://lparchive.org/Metal-Gear-1-2/Update%2002/9-Y6dJj.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__snake_mg2

### SOLID SNAKE — MG2 — METAL GEAR 2 / ZANZIBAR LAND

**Rôle :** Tir, grenades et distance. **Profil :** `soldier`.

**Base présente dans le code :** Solid Snake humain à Zanzibar : arsenal et corps à corps de son épisode.

**Incarnation à conserver :** Solid Snake1999 MG2 appearance, modern2.5D interpretation of revised official portrait and original MSX2 field palette.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** SOLID SNAKE — MG2 : appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas courts, crosse/équipement conservés près du torse. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Tir, grenades et distance » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder appui militaire stable, arme maintenue dans l’axe et regard vers la menace.
- **jump_land :** SOLID SNAKE — MG2 : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas courts, crosse/équipement conservés près du torse. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de SOLID SNAKE — MG2. Terminer par retour en couverture de l’arme après le coup. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « METAL GEAR 2 / ZANZIBAR LAND », présentation de Solid Snake1999 MG2 appearance, modern2.5D interpretation of revised official portrait and original MSX2 field palette., puis appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Geste court lié à « Pistolet de Zanzibar » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, retour en couverture de l’arme après le coup ; SOLID SNAKE — MG2 vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à METAL GEAR 2 / ZANZIBAR LAND.
- **round_loss :** Proposition CQC : SOLID SNAKE — MG2 réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Intrude F014 », revenir par retour en couverture de l’arme après le coup, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — MG2, préparer « Jab » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — MG2, préparer « Frappe engagée » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — MG2, préparer « Balayage » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — MG2, préparer « Projection » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** retour en couverture de l’arme après le coup. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Pistolet de Zanzibar

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — MG2, préparer « Pistolet de Zanzibar » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Pistolet de Zanzibar » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Grenade de diversion

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — MG2, préparer « Grenade de diversion » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Prélever l’objet correspondant à « Grenade de diversion », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Coude MG2

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — MG2, préparer « Coude MG2 » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Coude MG2 » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Repli de Zanzibar

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — MG2, préparer « Repli de Zanzibar » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer l’appui qui produit le déplacement ; pas courts, crosse/équipement conservés près du torse.

**Action.** Exécuter « Repli de Zanzibar » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** retour en couverture de l’arme après le coup. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Intrude F014

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — MG2, préparer « Intrude F014 » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Intrude F014 » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — MG2, préparer « Recharger » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** retour en couverture de l’arme après le coup. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Intrude F014 — Final

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Intrude F014 / Pistolet de Zanzibar.

Plan 1 : SOLID SNAKE — MG2 sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Intrude F014 / Pistolet de Zanzibar ». Plan 2 : présenter l’arme effectivement associée à « Intrude F014 / Pistolet de Zanzibar », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : retour en couverture de l’arme après le coup, pose de signature face à l’adversaire.

##### Pistolet de Zanzibar / Grenade de diversion

Famille `ballistic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Intrude F014 / Grenade de diversion.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Intrude F014 / Grenade de diversion » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Intrude F014 / Grenade de diversion », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : retour en couverture de l’arme après le coup, arrêt du dispositif et retour au cadre d’ensemble.

##### Coude MG2 — Point final

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Intrude F014 / Coude MG2.

Plan 1 : approche jusqu’à la distance réelle de « Intrude F014 / Coude MG2 », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Intrude F014 / Coude MG2 », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : retour en couverture de l’arme après le coup, prise de distance et maintien final.

##### Sang-froid — Mission close

Famille `ballistic`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Intrude F014 / Projection.

Plan 1 : après une observation ou un repli, SOLID SNAKE — MG2 reprend l’initiative par « Intrude F014 / Projection ». Plan 2 : présenter l’arme effectivement associée à « Intrude F014 / Projection », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : retour en couverture de l’arme après le coup, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- OriginalMSX2 tiny body establishes overall palette/silhouette, not detailed modern cloth seams or facial geometry. Revised officialMG2 portrait is used for NG face; original1990 celebrity-like manual portrait preserved separately, no edition alias claimed.
- Original1990manual weaponpage18 explicitly labels IngramMAC11; genuine equippedMAC11 variant chosen, no MP5 substitution. No high-resolution original weapon-model proof or exact engraving claim.
- Sixteen native keyposes per direction are authored modern gameplay adaptation, not original1990 animationframes.
- Authored melee frames temporarily show empty hands while equipment/aim frames visibly hold the MAC11; weapon-state transitions are project motion adaptation rather than original1990 animation claim.
- [Official Konami revisedMG2 portrait, physically viewed, originalMSX2 whole field/boxing capture and original1990manual weaponpage18 (Beretta92F and IngramMAC11), all original evidence physically viewed.](https://www.konami.com/mg/archive/mg2/pic/snake.gif) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__ninja_mg2

### BLACK NINJA — METAL GEAR 2 / BLACK COLOR

**Rôle :** Étoiles et esquive visible. **Profil :** `msx2_star_ninja`.

**Base présente dans le code :** Black Color / Kyle Schneider de Metal Gear2 MSX2 original1990 : armure souple grise/cyan sombre et étoiles lancées à la main. Détails fins et modèle exact d’étoile non prouvés. Aucun katana, arme à feu, exosquelette de Gray Fox, énergie Zandatsu ou invisibilité. Déplacements deploy restent visibles et bornés ; corps à corps, réserve de huit, trois étoiles du super, récupération, collisions et durées sont des adaptations du versus.

**Incarnation à conserver :** Kyle Schneider as original MSX2 Black Color; limited original gray/cyan and dark teal flex-armor sprite reconstruction, not Gray Fox or MG1 contact portrait

**État vérifié :** métadonnées natives avec limites. 72 régions source distinctes dans les deux directions ; groupes : idle, walk, guard, crouch, jump, punch, heavy, low, hit, ko, shoot, deploy, throw, recover, attack.

**Réemplois à examiner :** `heavy` = heavy, specialDown ; `shoot` = special, super ; `deploy` = specialForward, specialBack.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `nextgen`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** BLACK NINJA : étoiles de lancer et posture du Ninja MSX2. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** bond ou pas bref avec trajectoire lisible. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Étoiles et esquive visible » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder étoiles de lancer et posture du Ninja MSX2.
- **jump_land :** BLACK NINJA : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. bond ou pas bref avec trajectoire lisible. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de BLACK NINJA. Terminer par retrait de main et reprise de garde après lancer. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « METAL GEAR 2 / BLACK COLOR », présentation de Kyle Schneider as original MSX2 Black Color; limited original gray/cyan and dark teal flex-armor sprite reconstruction, not Gray Fox or MG1 contact portrait, puis étoiles de lancer et posture du Ninja MSX2. Geste court lié à « Étoile lancée à la main — adaptation » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, retrait de main et reprise de garde après lancer ; BLACK NINJA vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à METAL GEAR 2 / BLACK COLOR.
- **round_loss :** Proposition CQC : BLACK NINJA réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Trois étoiles — adaptation », revenir par retrait de main et reprise de garde après lancer, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Poing — adaptation

**Existant :** `melee` / `strike` ; 7/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BLACK NINJA, préparer « Poing — adaptation » ; étoiles de lancer et posture du Ninja MSX2. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Poing — adaptation » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retrait de main et reprise de garde après lancer.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée — adaptation

**Existant :** `melee` / `strike` ; 18/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BLACK NINJA, préparer « Frappe engagée — adaptation » ; étoiles de lancer et posture du Ninja MSX2. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée — adaptation », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retrait de main et reprise de garde après lancer.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BLACK NINJA, préparer « Balayage » ; étoiles de lancer et posture du Ninja MSX2. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** retrait de main et reprise de garde après lancer.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BLACK NINJA, préparer « Projection » ; étoiles de lancer et posture du Ninja MSX2. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** retrait de main et reprise de garde après lancer. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Étoile lancée à la main — adaptation

**Existant :** `projectile` / `shuriken` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BLACK NINJA, préparer « Étoile lancée à la main — adaptation » ; étoiles de lancer et posture du Ninja MSX2. Prélever l’objet correspondant à « Étoile lancée à la main — adaptation », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps.

**Retour.** retrait de main et reprise de garde après lancer. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Frappe corporelle — adaptation

**Existant :** `melee` / `strike` ; 21/4/33 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BLACK NINJA, préparer « Frappe corporelle — adaptation » ; étoiles de lancer et posture du Ninja MSX2. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Frappe corporelle — adaptation » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retrait de main et reprise de garde après lancer.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer ou espacer ; la remontée est punissable en garde.

##### specialForward — Esquive visible vers l’avant — adaptation

**Existant :** `mobility` / `movement` ; 19/12/27 ticks ; groupe `deploy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BLACK NINJA, préparer « Esquive visible vers l’avant — adaptation » ; étoiles de lancer et posture du Ninja MSX2. Préparer l’appui qui produit le déplacement ; bond ou pas bref avec trajectoire lisible.

**Action.** Exécuter « Esquive visible vers l’avant — adaptation » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 5 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** retrait de main et reprise de garde après lancer. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Déplacement visible et borné du versus ; collision conservée, saut ou approche pour punir la préparation ou la sortie. Aucune invulnérabilité.

##### specialBack — Esquive visible vers l’arrière — adaptation

**Existant :** `mobility` / `movement` ; 4/12/23 ticks ; groupe `deploy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BLACK NINJA, préparer « Esquive visible vers l’arrière — adaptation » ; étoiles de lancer et posture du Ninja MSX2. Préparer l’appui qui produit le déplacement ; bond ou pas bref avec trajectoire lisible.

**Action.** Exécuter « Esquive visible vers l’arrière — adaptation » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** retrait de main et reprise de garde après lancer. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Déplacement visible et borné du versus ; collision conservée, saut ou approche pour punir la préparation ou la sortie. Aucune invulnérabilité.

##### super — Trois étoiles — adaptation

**Existant :** `projectile` / `shuriken` ; 25/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BLACK NINJA, préparer « Trois étoiles — adaptation » ; étoiles de lancer et posture du Ninja MSX2. Prélever l’objet correspondant à « Trois étoiles — adaptation », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. La salve contient 3 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** retrait de main et reprise de garde après lancer. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Trois étoiles consomment trois unités de la réserve du versus ; préparation et sortie punissables, saut/garde haute/parade. Nombre et cadence ne sont pas des données originales.

##### utility — Reprendre la réserve d’étoiles — adaptation

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BLACK NINJA, préparer « Reprendre la réserve d’étoiles — adaptation » ; étoiles de lancer et posture du Ninja MSX2. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Reprendre la réserve d’étoiles — adaptation ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** retrait de main et reprise de garde après lancer. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pause interrompable avant restauration de la réserve du versus ; aucun soin, armure ou pouvoir ajouté.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Trois étoiles — adaptation — conclusion adaptée

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : prepare → release → confirm → pose. Appuis déclarés : Trois étoiles — adaptation.

Plan 1 : BLACK NINJA sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Trois étoiles — adaptation ». Plan 2 : présenter l’arme effectivement associée à « Trois étoiles — adaptation », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : retrait de main et reprise de garde après lancer, pose de signature face à l’adversaire.

##### Frappe corporelle — adaptation — conclusion adaptée

Famille `cqc`, ton `stylized` ; 238 ticks CQC ; phases actuelles : approach → contact → confirm → pose. Appuis déclarés : Frappe corporelle — adaptation.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Frappe corporelle — adaptation » ; l’espace disponible doit être lisible. Plan 2 : contact de saisie ou neutralisation lié à « Frappe corporelle — adaptation », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : retrait de main et reprise de garde après lancer, arrêt du dispositif et retour au cadre d’ensemble.

##### Étoile lancée à la main — adaptation — conclusion adaptée

Famille `ballistic`, ton `stylized` ; 256 ticks CQC ; phases actuelles : prepare → release → confirm → pose. Appuis déclarés : Étoile lancée à la main — adaptation.

Plan 1 : approche jusqu’à la distance réelle de « Étoile lancée à la main — adaptation », arme et main libre identifiées. Plan 2 : présenter l’arme effectivement associée à « Étoile lancée à la main — adaptation », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : retrait de main et reprise de garde après lancer, prise de distance et maintien final.

##### Esquive visible vers l’arrière — adaptation — conclusion adaptée

Famille `tactical`, ton `stylized` ; 274 ticks CQC ; phases actuelles : prepare → move → confirm → pose. Appuis déclarés : Esquive visible vers l’arrière — adaptation.

Plan 1 : après une observation ou un repli, BLACK NINJA reprend l’initiative par « Esquive visible vers l’arrière — adaptation ». Plan 2 : matérialiser le geste tactique « Esquive visible vers l’arrière — adaptation » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : retrait de main et reprise de garde après lancer, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Closest supported original1990 MSX2 Black Color/Kyle Schneider reconstruction; no absolute1:1 or pixel-exact face, material, seam, palette, animation or reverse-side certification.
- Original Japanese manual page42 establishes flex armor and enhanced ninja lore. Tiny gray/cyan+dark teal sprite mirror and original-era boss corpse captures establish a limited palette/silhouette, with unresolved realistic face/hair and fine tailoring. The sprite mirror extraction/native enlargement provenance is unverified. Codec portrait images show Kessler and Snake, not Schneider; no MG1 portrait is used as his face.
- English LP images are original-era MSX2 graphical evidence, but ROM, emulator and translation patch are unverified. Secondary LP prose supports throwing stars and sudden relocation; selected captures do not establish a detailed active star projectile or hardware pattern. The held plain4-point star is a restrained authored interpretation, not a certified exact original model.
- All72 versus poses, their CQC strikes, sweep, jump, hit/KO, bounded evade and reserve recovery are authored adaptations. These are new native illustrations in a crisp original-era pixel style, not extracted or upscaled original animations. No katana, scabbard, firearm, Gray Fox optic, cyborg eye, Zandatsu, optical invisibility or universal invulnerability is source-supported or depicted.
- Independent right/left ImageGen requests are preserved. No software flip, native resize, cleanup, transparency removal or pixel editing was performed. ImageGen correction can alter untargeted pixels; previous candidates remain immutable and exact preservation of other cells is not claimed. LEFT hit9 naturally tilts/turns the head backward during recoil; LEFT KO10 now faces LEFT and KO11 lies fully toward its leftward head.
- Native sources have true zero-alpha space and12 large separated bodies, but tiny detached alpha residue and low-alpha glow/fringe remain unedited. Full opacity254 rather than255 and fine fringe purity are not certified. All complete native sheets were physically viewed; automated components do not certify image quality or unseen geometry. Actual browser Canvas, combat phases/collisions and mobile/public runtime review belong to root.
- Runtime group shoot means hand-thrown star, deploy means bounded evade, throw means unarmed CQC, recover means reserve recovery. Damage, speed, costs, meter, range and super count are not canonical data and require a scoped root gameplay adapter; raw legacy blade/cloak/exoskeleton profile is retained read-only and must not silently drive this exact incarnation.
- Target1:1 remains closest_supported; no absolute artistic, animation, material, face or gameplay1:1 certification.
- Japanese manual is the original1990 MSX2 publication. LP graphics preserve the MSX2 era, but ROM/emulator/hardware and English localization/translation patch are unverified; English prose is not a certified Japanese transcript.
- Tiny sprite mirrors and captures cannot prove realistic face/hair, exact seams, reverse geometry, equipment brands/models or extracted animation. Newly authored72poses/UID and all balance parameters are Versus adaptations.
- Independent facings have different unchanged native SHA; no software mirroring, resizing, erasure or alpha repaint. Native low-alpha fringe and small residue remain qualified.
- Browser Canvas, actual engine phases, contact/hitboxes, origins, finishers, controls/mobile and both game embeddings remain pending root integration verification.
- Black Color/Kyle Schneider original gray/cyan-dark-teal/ochre palette. Star release marks are actual opaque native hand pixels in first-activeC shoot1, not firearm muzzles. The selected root-viewed refs do not show star release; exact star model and throwing gesture remain qualified authored interpretations.
- No katana, scabbard, Gray Fox eye/exoskeleton energy, Zandatsu, firearm, invisibility or universal invulnerability. Cdeploy is a visible bounded evade; body contacts use authored unarmed B groups. NASA English codec wording remains localization-qualified.
- [reference-only rendering from saved manual scan](https://archive.org/download/metal-gear-2-solid-snake-manual-original/MetalGear%202%20-%20SolidSnake%20Manual%20%28Original%29_text.pdf#page=42) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [tiny sprite mirror; source game pixels/palette physically compared; hosting fan power statistics excluded](https://thecodex.wiki/images/9/92/Black_Ninja.webp) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [original-era MSX2 graphical capture with English translated text hosted in a secondary LP; ROM/patch unverified; tiny visual evidence, not unmodified-Japanese-ROM or LP-commentary authority](https://lparchive.org/Metal-Gear-1-2/Update%2021/39-Metal_Gear_2_0143.png) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [original-era MSX2 graphical capture with English translated text hosted in a secondary LP; ROM/patch unverified; tiny visual evidence, not unmodified-Japanese-ROM or LP-commentary authority](https://lparchive.org/Metal-Gear-1-2/Update%2021/41-Metal_Gear_2_0148.png) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [original-era MSX2 graphical capture with English translated text hosted in a secondary LP; ROM/patch unverified; tiny visual evidence, not unmodified-Japanese-ROM or LP-commentary authority](https://lparchive.org/Metal-Gear-1-2/Update%2021/42-Metal_Gear_2_0112.png) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [original-era MSX2 graphical capture with English translated text hosted in a secondary LP; ROM/patch unverified; tiny visual evidence, not unmodified-Japanese-ROM or LP-commentary authority](https://lparchive.org/Metal-Gear-1-2/Update%2021/43-Metal_Gear_2_0113.png) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__runner_mg2

### RUNNING MAN — METAL GEAR 2 / POURSUITE

**Rôle :** Course et contact sans arme. **Profil :** `brawler`.

**Base présente dans le code :** Running Man de Metal Gear2 MSX2 original1990 : silhouette verte/grise et course à mains nues. Aucune arme personnelle ni point de lancement. Groupe natif shoot = sprint, charge = course/contact, recover = reprise stationnaire. Frappes, garde, saisies, parade, collision, jauge et réserve sont des adaptations du versus ; aucun gaz émis par le personnage ni mine placée.

**Incarnation à conserver :** Original-era MSX2 Running Man, compact unarmed green-grey running mercenary; English LP localization and sprite extraction provenance unverified.

**État vérifié :** métadonnées natives avec limites. 72 régions source distinctes dans les deux directions ; groupes : idle, walk, guard, crouch, jump, punch, heavy, low, hit, ko, shoot, throw, charge, recover, attack.

**Réemplois à examiner :** `low` = low, specialDown ; `charge` = specialForward, super.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `nextgen`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** RUNNING MAN : poids sur les jambes, épaules engagées, mains prêtes. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** transfert lourd mais anatomique, freinage par un appui réel. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Course et contact sans arme » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder poids sur les jambes, épaules engagées, mains prêtes.
- **jump_land :** RUNNING MAN : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. transfert lourd mais anatomique, freinage par un appui réel. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de RUNNING MAN. Terminer par rétablir bassin et épaules après l’élan. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « METAL GEAR 2 / POURSUITE », présentation de Original-era MSX2 Running Man, compact unarmed green-grey running mercenary; English LP localization and sprite extraction provenance unverified., puis poids sur les jambes, épaules engagées, mains prêtes. Geste court lié à « Sprint visible — adaptation » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, rétablir bassin et épaules après l’élan ; RUNNING MAN vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à METAL GEAR 2 / POURSUITE.
- **round_loss :** Proposition CQC : RUNNING MAN réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Charge en course — adaptation », revenir par rétablir bassin et épaules après l’élan, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RUNNING MAN, préparer « Jab » ; poids sur les jambes, épaules engagées, mains prêtes. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** rétablir bassin et épaules après l’élan.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RUNNING MAN, préparer « Frappe engagée » ; poids sur les jambes, épaules engagées, mains prêtes. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** rétablir bassin et épaules après l’élan.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RUNNING MAN, préparer « Balayage » ; poids sur les jambes, épaules engagées, mains prêtes. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** rétablir bassin et épaules après l’élan.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RUNNING MAN, préparer « Projection » ; poids sur les jambes, épaules engagées, mains prêtes. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** rétablir bassin et épaules après l’élan. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Sprint visible — adaptation

**Existant :** `mobility` / `movement` ; 7/12/25 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RUNNING MAN, préparer « Sprint visible — adaptation » ; poids sur les jambes, épaules engagées, mains prêtes. Préparer l’appui qui produit le déplacement ; transfert lourd mais anatomique, freinage par un appui réel.

**Action.** Exécuter « Sprint visible — adaptation » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 10 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** rétablir bassin et épaules après l’élan. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Déplacement visible et borné du versus ; collision conservée, saut ou approche pour punir la préparation ou la sortie. Aucune invulnérabilité.

##### specialDown — Frappe rasante

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RUNNING MAN, préparer « Frappe rasante » ; poids sur les jambes, épaules engagées, mains prêtes. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** rétablir bassin et épaules après l’élan.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### specialForward — Contact en course — adaptation

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `charge`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RUNNING MAN, préparer « Contact en course — adaptation » ; poids sur les jambes, épaules engagées, mains prêtes. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Contact en course — adaptation » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** rétablir bassin et épaules après l’élan.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Feinte de course

**Existant :** `parry` / `counter` ; 3/10/29 ticks ; groupe `guard`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RUNNING MAN, préparer « Feinte de course » ; poids sur les jambes, épaules engagées, mains prêtes. Présenter la surface ou l’organe de parade et maintenir une fenêtre courte lisible.

**Action.** Recevoir puis dévier au contact réel pour « Feinte de course » ; la riposte et son effet n’apparaissent qu’après succès. Une attente sans contact garde une pose différente du contre réussi.

**Retour.** rétablir bassin et épaules après l’élan. Séparer sortie ratée, blocage simple et riposte ; aucun effet de réussite avant collision.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Retarder la frappe, projeter ou attendre les 29 images de récupération.

##### super — Charge en course — adaptation

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `charge`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RUNNING MAN, préparer « Charge en course — adaptation » ; poids sur les jambes, épaules engagées, mains prêtes. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Charge en course — adaptation », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** rétablir bassin et épaules après l’élan.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Reprendre son souffle — adaptation

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RUNNING MAN, préparer « Reprendre son souffle — adaptation » ; poids sur les jambes, épaules engagées, mains prêtes. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Reprendre son souffle — adaptation ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** rétablir bassin et épaules après l’élan. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pause interrompable avant restauration de la réserve du versus ; aucun soin, armure ou pouvoir ajouté.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Charge en course — adaptation — conclusion adaptée

Famille `cqc`, ton `stylized` ; 220 ticks CQC ; phases actuelles : approach → contact → confirm → pose. Appuis déclarés : Charge en course — adaptation.

Plan 1 : RUNNING MAN sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Charge en course — adaptation ». Plan 2 : contact de saisie ou neutralisation lié à « Charge en course — adaptation », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : rétablir bassin et épaules après l’élan, pose de signature face à l’adversaire.

##### Frappe rasante — conclusion adaptée

Famille `cqc`, ton `stylized` ; 238 ticks CQC ; phases actuelles : approach → contact → confirm → pose. Appuis déclarés : Frappe rasante.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Frappe rasante » ; l’espace disponible doit être lisible. Plan 2 : contact de saisie ou neutralisation lié à « Frappe rasante », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : rétablir bassin et épaules après l’élan, arrêt du dispositif et retour au cadre d’ensemble.

##### Contact en course — adaptation — conclusion adaptée

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → contact → confirm → pose. Appuis déclarés : Contact en course — adaptation.

Plan 1 : approche jusqu’à la distance réelle de « Contact en course — adaptation », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Contact en course — adaptation », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : rétablir bassin et épaules après l’élan, prise de distance et maintien final.

##### Projection — conclusion adaptée

Famille `cqc`, ton `stylized` ; 274 ticks CQC ; phases actuelles : approach → contact → confirm → pose. Appuis déclarés : Projection.

Plan 1 : après une observation ou un repli, RUNNING MAN reprend l’initiative par « Projection ». Plan 2 : contact de saisie ou neutralisation lié à « Projection », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : rétablir bassin et épaules après l’élan, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Target 1:1 original 1990 MSX2 incarnation where tiny original pixels resolve palette and silhouette; result is closest_supported newly authored 2D art, not extraction, enlargement, exact facial identity or absolute 1:1 certification.
- Saved original-era MSX2 LP screenshots include English text. Translation patch/emulator/ROM unverified; not certified unmodified Japanese1990 execution. Tiny sprite mirror extracted-native provenance and prior enlargement are unverified. Manual page42 Japanese original source supports names/lore, not facial/cloth fine details.
- Observed original tiny sprite/game captures support green clothing/forearms/trousers, light-grey upper/shoulder blocks, dark/ochre small head and boots, compact athletic adult silhouette and no carried weapon. Exact headwear, hair, face, seams, gloves, footwear hardware and anatomy between tiny poses are unresolved. Generated short dark hair and folds are readability interpretations, not new canonical facts.
- Original encounter movement and speed are source supported. Original LP account says he does not directly attack Snake; punches, heavy/low attacks, guards, crouches, jumps, throws, shoulder contacts, hit/KO and timings are explicitly bounded Versus adaptations, not canonical Running Man martial arts.
- No gun, player HUD pistol, player mine, grenade, detonator, gas projector or invented carried device. Original nerve-gas/explosives lore does not certify a particular prop model or implement a gas/trap stage mechanic here.
- Technical action shoot depicts an unarmed sprint; it must never produce a gunshot or ballistic muzzle. throw depicts open-hand reach and follow-through with no second body, carried prop or certified exact CQC throw. charge depicts an athletic charge-run/contact adaptation. No deploy or optic action is invented.
- Six facings were independently generated as brand-new transparent native atlases, mirror=false. Both sides preserve supported green/grey palette and unarmed silhouette. Small opposing-facing fold/panel/face variations are illustration approximations; no hidden original asymmetry is claimed.
- Both B sheets contain complete hit, kneeling collapse and lying KO bodies. RIGHT final KO is side-lying; LEFT final KO is more prone/side-turned. Opposing facings are independently authored and their fall shapes are not exact mirrored motions.
- All selected and rejected native PNGs remain byte-identical to tool outputs. RGB behind transparent/very low-alpha pixels may look dark/green/ochre in viewers. Frames retain complete alpha>=8 body components and 5-pixel padding, with actual alpha>80 body/support measurements. Unconnected faint alpha speckles are not asserted to be anatomy. No image crop export, resize, recolour, alpha cleanup or mirror was performed.
- Source-pixel standing heights are measured separately for each unchanged atlas from listed upright source poses. displayHeight225 is a relative gameplay recommendation, not certified centimetres or a measured canonical 3D model. Pivots use the body pelvis band and observed lower support extent; crouch, jump and KO retain their real native pose heights.
- Producer approval covers six native source atlases,72 unique source poses, actual source marks and their metadata only. Integration, runtime balance/helper changes, browser Canvas crops/contacts and both 1280/390 viewport reviews remain root-owned and have not been performed for this PASS9 delivery.
- First C_RIGHT attempt is rejected and preserved unchanged because two intended recovery figures still ran. It is never selected, deleted or repurposed as an OC. Prepared original triplet prompts remain unmodified alongside separate new runtime-complete variants.
- Target1:1 remains closest_supported; no absolute artistic, animation, material, face or gameplay1:1 certification.
- Japanese manual is the original1990 MSX2 publication. LP graphics preserve the MSX2 era, but ROM/emulator/hardware and English localization/translation patch are unverified; English prose is not a certified Japanese transcript.
- Tiny sprite mirrors and captures cannot prove realistic face/hair, exact seams, reverse geometry, equipment brands/models or extracted animation. Newly authored72poses/UID and all balance parameters are Versus adaptations.
- Independent facings have different unchanged native SHA; no software mirroring, resizing, erasure or alpha repaint. Native low-alpha fringe and small residue remain qualified.
- Browser Canvas, actual engine phases, contact/hitboxes, origins, finishers, controls/mobile and both game embeddings remain pending root integration verification.
- Green/grey compact human running silhouette and unarmed contact. The action key shoot means sprint, never a gun or projectile; charge is running/contact, recovery is stationary. No self-created gas, mine, unsupported gear or facial certainty.
- B LEFT final KO is prone/side-turned, not a canonical MSX2 death animation. Normals, grab, defense/parry and recovery are authored adaptations.
- [Référence déclarée](https://archive.org/download/metal-gear-2-solid-snake-manual-original/MetalGear%202%20-%20SolidSnake%20Manual%20%28Original%29_text.pdf#page=42) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Référence déclarée](https://thecodex.wiki/images/3/35/Running_Man.webp) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Référence déclarée](https://lparchive.org/Metal-Gear-1-2/Update%2023/24-Metal_Gear_2_0281.png) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Référence déclarée](https://lparchive.org/Metal-Gear-1-2/Update%2023/27-Metal_Gear_2_0287.png) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__redblaster_mg2

### RED BLASTER — METAL GEAR 2 / DÉMOLITION

**Rôle :** Grenades à la main et posture basse. **Profil :** `msx2_grenade`.

**Base présente dans le code :** Red Blaster de Metal Gear2 MSX2 original1990 : grenades et fils d’immobilisation documentés, tenue verte et bottes sombres. Exact mécanisme de tir original non résolu ; les PNG retenus en combat montrent un lancer à la main. Cdeploy reste conservé uniquement comme preuve de source avec segment blanc fil/lame/poignée ambigu ; aucune route active ne l’utilise. Down emploie A crouch8/9, sans dégâts, objet posé ou pouvoir. Aucune certification de lance-grenades, couteau, pistolet, rollers, C4 ou télécommande. Lancer à la main, posture basse, réserve, trois grenades du super et récupération sont des adaptations qualifiées du versus.

**Incarnation à conserver :** Original-era compact green-clad MSX2 grenadier; LP English localization and sprite extraction provenance unverified.

**État vérifié :** métadonnées natives avec limites. 72 régions source distinctes dans les deux directions ; groupes : idle, walk, guard, crouch, jump, punch, heavy, low, hit, ko, shoot, deploy, throw, recover, attack.

**Réemplois à examiner :** `shoot` = special, specialForward, super.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `nextgen`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** RED BLASTER : grenades et tenue propres au profil MSX2. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas tactiques, main de lancer dégagée. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Grenades à la main et posture basse » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder grenades et tenue propres au profil MSX2.
- **jump_land :** RED BLASTER : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas tactiques, main de lancer dégagée. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de RED BLASTER. Terminer par retour vers la poche de grenades puis garde. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « METAL GEAR 2 / DÉMOLITION », présentation de Original-era compact green-clad MSX2 grenadier; LP English localization and sprite extraction provenance unverified., puis grenades et tenue propres au profil MSX2. Geste court lié à « Grenade à la main — adaptation » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, retour vers la poche de grenades puis garde ; RED BLASTER vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à METAL GEAR 2 / DÉMOLITION.
- **round_loss :** Proposition CQC : RED BLASTER réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Trois grenades à la main — adaptation », revenir par retour vers la poche de grenades puis garde, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RED BLASTER, préparer « Jab » ; grenades et tenue propres au profil MSX2. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour vers la poche de grenades puis garde.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RED BLASTER, préparer « Frappe engagée » ; grenades et tenue propres au profil MSX2. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retour vers la poche de grenades puis garde.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RED BLASTER, préparer « Balayage » ; grenades et tenue propres au profil MSX2. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** retour vers la poche de grenades puis garde.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RED BLASTER, préparer « Projection » ; grenades et tenue propres au profil MSX2. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** retour vers la poche de grenades puis garde. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Grenade à la main — adaptation

**Existant :** `projectile` / `explosive` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RED BLASTER, préparer « Grenade à la main — adaptation » ; grenades et tenue propres au profil MSX2. Prélever l’objet correspondant à « Grenade à la main — adaptation », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 48 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** retour vers la poche de grenades puis garde. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Arc visible, délai puis explosion ; déplacement, garde ou punition du lancer. Modèle et geste exacts non certifiés.

##### specialDown — Posture basse stationnaire — adaptation

**Existant :** `mobility` / `movement` ; 12/12/24 ticks ; groupe `crouch`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RED BLASTER, préparer « Posture basse stationnaire — adaptation » ; grenades et tenue propres au profil MSX2. Préparer l’appui qui produit le déplacement ; pas tactiques, main de lancer dégagée.

**Action.** Exécuter « Posture basse stationnaire — adaptation » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 0 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** retour vers la poche de grenades puis garde. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Posture basse visible du versus, touchable et sans dégâts ; saut ou approche pour punir la préparation/sortie. Aucun fil, piège, explosion ou arme déduit du segment blanc ambigu.

##### specialForward — Grenade lobée à la main — adaptation

**Existant :** `projectile` / `explosive` ; 12/1/28 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RED BLASTER, préparer « Grenade lobée à la main — adaptation » ; grenades et tenue propres au profil MSX2. Prélever l’objet correspondant à « Grenade lobée à la main — adaptation », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 48 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** retour vers la poche de grenades puis garde. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Arc haut visible avec délai ; quitter la zone ou punir le lancer. Adaptation, sans lance-grenades matériel inventé.

##### specialBack — Repli visible — adaptation

**Existant :** `mobility` / `movement` ; 4/12/23 ticks ; groupe `walk`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RED BLASTER, préparer « Repli visible — adaptation » ; grenades et tenue propres au profil MSX2. Préparer l’appui qui produit le déplacement ; pas tactiques, main de lancer dégagée.

**Action.** Exécuter « Repli visible — adaptation » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** retour vers la poche de grenades puis garde. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Déplacement visible et borné du versus ; collision conservée, saut ou approche pour punir la préparation ou la sortie. Aucune invulnérabilité.

##### super — Trois grenades à la main — adaptation

**Existant :** `projectile` / `explosive` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RED BLASTER, préparer « Trois grenades à la main — adaptation » ; grenades et tenue propres au profil MSX2. Prélever l’objet correspondant à « Trois grenades à la main — adaptation », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. La salve contient 3 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ. L’objet conserve sa mèche de 48 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** retour vers la poche de grenades puis garde. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Trois unités de réserve et50points de jauge ; trois arcs/délais adaptés au versus, préparation et récupération punissables.

##### utility — Reprendre la réserve de grenades — adaptation

**Existant :** `recover` / `recovery` ; 54/1/20 ticks ; groupe `recover`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RED BLASTER, préparer « Reprendre la réserve de grenades — adaptation » ; grenades et tenue propres au profil MSX2. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Reprendre la réserve de grenades — adaptation ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** retour vers la poche de grenades puis garde. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pause interrompable avant restauration de la réserve du versus ; aucun soin, armure ou pouvoir ajouté.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Trois grenades à la main — adaptation — conclusion adaptée

Famille `explosive`, ton `stylized` ; 220 ticks CQC ; phases actuelles : prepare → release → confirm → pose. Appuis déclarés : Trois grenades à la main — adaptation.

Plan 1 : RED BLASTER sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Trois grenades à la main — adaptation ». Plan 2 : montrer la pose/trajectoire et le délai de « Trois grenades à la main — adaptation ». Plan 3 : déclencher au véritable point de dispositif ; poussière, débris et réaction de cible restent indépendants du corps de l’attaquant. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : retour vers la poche de grenades puis garde, pose de signature face à l’adversaire.

##### Posture basse stationnaire — adaptation — conclusion adaptée

Famille `tactical`, ton `stylized` ; 238 ticks CQC ; phases actuelles : prepare → move → confirm → pose. Appuis déclarés : Posture basse stationnaire — adaptation.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Posture basse stationnaire — adaptation » ; l’espace disponible doit être lisible. Plan 2 : matérialiser le geste tactique « Posture basse stationnaire — adaptation » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : retour vers la poche de grenades puis garde, arrêt du dispositif et retour au cadre d’ensemble.

##### Grenade lobée à la main — adaptation — conclusion adaptée

Famille `explosive`, ton `stylized` ; 256 ticks CQC ; phases actuelles : prepare → release → confirm → pose. Appuis déclarés : Grenade lobée à la main — adaptation.

Plan 1 : approche jusqu’à la distance réelle de « Grenade lobée à la main — adaptation », arme et main libre identifiées. Plan 2 : montrer la pose/trajectoire et le délai de « Grenade lobée à la main — adaptation ». Plan 3 : déclencher au véritable point de dispositif ; poussière, débris et réaction de cible restent indépendants du corps de l’attaquant. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : retour vers la poche de grenades puis garde, prise de distance et maintien final.

##### Repli visible — adaptation — conclusion adaptée

Famille `tactical`, ton `stylized` ; 274 ticks CQC ; phases actuelles : prepare → move → confirm → pose. Appuis déclarés : Repli visible — adaptation.

Plan 1 : après une observation ou un repli, RED BLASTER reprend l’initiative par « Repli visible — adaptation ». Plan 2 : matérialiser le geste tactique « Repli visible — adaptation » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : retour vers la poche de grenades puis garde, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Target original1990 MSX2 palette and silhouette wherever resolved; closest_supported newly authored native art. No absolute1:1, extraction, upscaling, certified exact face or original sprite topology claimed.
- English LP text and original-era MSX2 sprites; translation patch/emulator/ROM unverified, not certified unmodified Japanese1990 execution. Tiny sprite extracted-native provenance and enlargement unverified. Japanese manual page42 separately supports original name/lore.
- Original Japanese page42 names Lumumba University (ルムンバ大学), SPETSNAZ background, explosive sabotage and grenades. The previous Leningrad label was a transcription mistake, corrected without changing native art or source evidence; no Bergen or unrelated later-era biography is introduced.
- Grenades/explosive sabotage and crossed immobilizing wires source-supported. Exact grenade launcher and canister/fuze/hardware model unresolved. Restrained connected hand-grenade and low wire placement are expressly authored versus interpretations, not exact original firing animation/model. No firearm model asserted.
- Original tiny sprite/game captures support compact green body and limbs, dark outlines, ochre extremities. Specific short dark/green/ochre head blocks, small green shade/fold differences, simple waist line, boots and full sleeves are readability interpretations, not certified original hair/headwear, garment seam or hidden asymmetry.
- No red-uniform inference from Red Blaster name, Running Man grey chest stripe, flamethrower, pistol, invented launcher model, Fatman rollers/bomber suit, C4 vest or player HUD equipment. A/B carry no weapon; C uses restrained grenade and wire interpretations only.
- Grenades and crossed immobilizing gallery wires are source supported. Exact grenade launcher model and original throwing/placement animations are unresolved; a small hand grenade touching the active source hand and low placement gesture are qualified Versus adaptations.
- C frame4 white segment is short and connected near the low hand. Its very straight stylized shape is visually ambiguous with a blade; no handle/guard/named knife or device is established. It is not proof of enemy knife lore, weapon model, original wire geometry or stage-wire implementation.
- All normals, guard/crouch/jump, hit/KO, CQC throw, hand-grenade release, wire placement, phase timing, collision and balance are bounded Versus adaptations. C throw7 reads as arm-extension follow-through rather than a certified original CQC throw. Final C9-11 are planted recovery poses, not running.
- Both B11 figures are completely lying defeated adults; right is prone/side-turned with head right and left prone/side-turned with head left. No unobserved precise fall motion is certified.
- All seven attempts remain byte-identical tool PNGs. First A_LEFT_01 was rejected for bare forearms inconsistent with full-sleeve RIGHT; A_LEFT_02 was corrected through image_gen only, retaining independently authored LEFT poses. No native PNG was mirrored, recoloured, resized, cleaned or alpha edited. Rejected art is never deleted or repurposed as OC.
- Native PNGs are RGBA with alpha0..254 and transparent regions; raw RGB behind alpha0/very low-alpha may show dark coloured glow in viewers. Complete major alpha>=8 components are retained with5px padding; actual body support/pelvis geometry uses alpha>80. Minor disconnected low-alpha speckles are not anatomy claims.
- Every unchanged atlas has its own measured fixed upright source height. Upright C reference indices2/10/11 exclude elevated grenade/low-wire preparation. displayHeight225 is a relative Versus recommendation, not canonical centimetres. All72 pivots remain at measured body/support positions rather than prop centroids.
- Generation-time contract a8dfffcff88297b0733f5c00d0fe6d109050b0aafe972d5ac8bbde8686360356 had a wrong university transcription corrected to Lumumba after Japanese-page review. The exact previous contract and metadata are retained. Prompts contained no university biography; images unchanged.
- Producer approval covers six unchanged native source atlases and72 observed pose crops/metadata only. No catalog import, runtime helper change, Git write or deployment. Actual browser Canvas/contact/collision and1280/390 viewport review remain root integration work.
- Root physical selection: Cdeploy4 white segment has blade/handle ambiguity. Cdeploy is preserved review-only; specialDown uses native A crouch8/9 provisionally, without trap, wire, explosion, damage or invented prop. Final root selected mappings remain required.
- Target1:1 remains closest_supported; no absolute artistic, animation, material, face or gameplay1:1 certification.
- Japanese manual is the original1990 MSX2 publication. LP graphics preserve the MSX2 era, but ROM/emulator/hardware and English localization/translation patch are unverified; English prose is not a certified Japanese transcript.
- Tiny sprite mirrors and captures cannot prove realistic face/hair, exact seams, reverse geometry, equipment brands/models or extracted animation. Newly authored72poses/UID and all balance parameters are Versus adaptations.
- Independent facings have different unchanged native SHA; no software mirroring, resizing, erasure or alpha repaint. Native low-alpha fringe and small residue remain qualified.
- Browser Canvas, actual engine phases, contact/hitboxes, origins, finishers, controls/mobile and both game embeddings remain pending root integration verification.
- Original grenades and crossed immobilizing-wire category are source facts; exact original launch mechanism/model is unresolved. Active hand-grenade interpretations use actual independently measured first-activeC shoot hand pixels. No fabricated launcher, pistol, rollers, C4 or telecommand.
- Root final Down selection is A crouch8/9, source local first active1. Cdeploy4 white segment reads fil/lame/poignée ambiguously and all Cdeploy poses remain review-only. No active move, trap, wire, blast, knife, projectile origin or finisher effect may use this group. Its two measured hand points are preserved evidence-only.
- Japanese biography correction is preserved: Lumumba University (ルムンバ大学), not Leningrad. Tiny original sources do not establish fine face/hair/headwear/garment topology.
- [Référence déclarée](https://archive.org/download/metal-gear-2-solid-snake-manual-original/MetalGear%202%20-%20SolidSnake%20Manual%20%28Original%29_text.pdf#page=42) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Référence déclarée](https://thecodex.wiki/images/d/d0/Red_Blaster.webp) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Référence déclarée](https://lparchive.org/Metal-Gear-1-2/Update%2026/30-Metal_Gear_2_0470.png) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Référence déclarée](https://lparchive.org/Metal-Gear-1-2/Update%2026/33-Metal_Gear_2_0471.png) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Référence déclarée](https://lparchive.org/Metal-Gear-1-2/Update%2026/34-Metal_Gear_2_0479.png) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Référence déclarée](https://lparchive.org/Metal-Gear-1-2/Update%2026/31-Metal_Gear_2_0472.png) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).
