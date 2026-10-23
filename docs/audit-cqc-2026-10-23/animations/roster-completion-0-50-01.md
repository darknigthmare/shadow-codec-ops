# Animations — ROSTER COMPLETION 0.50

**10 acteurs du registre courant.** Les titres d’actions et paramètres sont observés ; les descriptions sont des propositions CQC à produire et valider. Un groupe de frames existant ne certifie pas l’ensemble du mouvement ou sa fidélité originale.

[Index des fiches](README.md) · [Contrat commun](../04_ANIMATIONS_SPRITES.md)

## Sommaire

- [DIANE — OUTER HEAVEN](#roster50__diane_mg1) — METAL GEAR
- [SCHNEIDER — OUTER HEAVEN](#roster50__schneider_mg1) — METAL GEAR
- [DR. PETTROVICH MADNAR — MG1](#roster50__madnar_mg1) — METAL GEAR
- [ELLEN MADNAR](#roster50__ellen_mg1) — METAL GEAR
- [STEVE — RÉSISTANCE](#roster50__steve_mg1) — METAL GEAR
- [JENNIFER — OUTER HEAVEN](#roster50__jennifer_mg1) — METAL GEAR
- [ROY CAMPBELL — MG2](#roster50__campbell_mg2) — METAL GEAR 2
- [MASTER MILLER — MG2](#roster50__miller_mg2) — METAL GEAR 2
- [GEORGE KASLER](#roster50__kasler_mg2) — METAL GEAR 2
- [DR. KIO MARV](#roster50__marv_mg2) — METAL GEAR 2

## roster50__diane_mg1

### DIANE — OUTER HEAVEN — METAL GEAR

**Rôle :** Résistance / Renseignement. **Profil :** `pistol`.

**Base présente dans le code :** Diane est une agente de la Résistance ; le Versus lui attribue un pistolet léger et des leurres, sans présenter cette dotation comme canonique.

**Incarnation à conserver :** Original Thin Wall punk singer/resistance informant, 1987 manual appearance.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `throw` = throw, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** DIANE — OUTER HEAVEN : main forte et main de soutien identifiées sur le pistolet, coudes contenus. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas prudents sans inverser l’étui ni la main forte. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Résistance / Renseignement » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder main forte et main de soutien identifiées sur le pistolet, coudes contenus.
- **jump_land :** DIANE — OUTER HEAVEN : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas prudents sans inverser l’étui ni la main forte. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de DIANE — OUTER HEAVEN. Terminer par recul du poignet puis stabilisation du canon. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « METAL GEAR », présentation de Original Thin Wall punk singer/resistance informant, 1987 manual appearance., puis main forte et main de soutien identifiées sur le pistolet, coudes contenus. Geste court lié à « Pistolet de la Résistance » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, recul du poignet puis stabilisation du canon ; DIANE — OUTER HEAVEN vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à METAL GEAR.
- **round_loss :** Proposition CQC : DIANE — OUTER HEAVEN réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Réseau Diane », revenir par recul du poignet puis stabilisation du canon, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DIANE — OUTER HEAVEN, préparer « Jab » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DIANE — OUTER HEAVEN, préparer « Frappe engagée » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DIANE — OUTER HEAVEN, préparer « Balayage » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DIANE — OUTER HEAVEN, préparer « Projection » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recul du poignet puis stabilisation du canon. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Pistolet de la Résistance

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DIANE — OUTER HEAVEN, préparer « Pistolet de la Résistance » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Montrer la prise et la visée de l’arme décrite par « Pistolet de la Résistance » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Leurre Thin Wall

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DIANE — OUTER HEAVEN, préparer « Leurre Thin Wall » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Prélever l’objet correspondant à « Leurre Thin Wall », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Renseignement Outer Heaven

**Existant :** `melee` / `grapple` ; 10/3/32 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DIANE — OUTER HEAVEN, préparer « Renseignement Outer Heaven » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recul du poignet puis stabilisation du canon. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Hors de portée ou saut ; ne saisir ni cible aérienne ni cible sous protection post-projection.

##### specialBack — Repli de scène

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DIANE — OUTER HEAVEN, préparer « Repli de scène » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer l’appui qui produit le déplacement ; pas prudents sans inverser l’étui ni la main forte.

**Action.** Exécuter « Repli de scène » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** recul du poignet puis stabilisation du canon. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Réseau Diane

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DIANE — OUTER HEAVEN, préparer « Réseau Diane » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Montrer la prise et la visée de l’arme décrite par « Réseau Diane » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DIANE — OUTER HEAVEN, préparer « Recharger » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** recul du poignet puis stabilisation du canon. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Réseau Diane — Conclusion

Famille `ballistic`, ton `simulation` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Réseau Diane / Pistolet de la Résistance.

Plan 1 : DIANE — OUTER HEAVEN sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Réseau Diane / Pistolet de la Résistance ». Plan 2 : présenter l’arme effectivement associée à « Réseau Diane / Pistolet de la Résistance », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : recul du poignet puis stabilisation du canon, pose de signature face à l’adversaire. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Pistolet de la Résistance — Conclusion

Famille `ballistic`, ton `simulation` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Pistolet de la Résistance / Leurre Thin Wall.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Pistolet de la Résistance / Leurre Thin Wall » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Pistolet de la Résistance / Leurre Thin Wall », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : recul du poignet puis stabilisation du canon, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Renseignement Outer Heaven — Conclusion

Famille `ballistic`, ton `simulation` ; 256 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Renseignement Outer Heaven / Frappe engagée.

Plan 1 : approche jusqu’à la distance réelle de « Renseignement Outer Heaven / Frappe engagée », arme et main libre identifiées. Plan 2 : présenter l’arme effectivement associée à « Renseignement Outer Heaven / Frappe engagée », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : recul du poignet puis stabilisation du canon, prise de distance et maintien final. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Simulation encadrée — Conclusion

Famille `ballistic`, ton `simulation` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Simulation encadrée / Projection.

Plan 1 : après une observation ou un repli, DIANE — OUTER HEAVEN reprend l’initiative par « Simulation encadrée / Projection ». Plan 2 : présenter l’arme effectivement associée à « Simulation encadrée / Projection », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : recul du poignet puis stabilisation du canon, rangement/pose finale différente des trois autres. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Only the explicitly visible upper-body details are documented by the historical portrait. Plain lower-body garments and shoes, colours absent from the monochrome source and unseen seams are restrained project adaptation; no false claim of a released full-body turnaround.
- Sixteen complete native keyposes per facing are authored gameplay poses, not original historical animation frames.
- [Physically viewed original character reference(s), retained bitexact with source receipts; authored modern native sprite adaptation preserves documented visible details.](https://lparchive.org/Metal-Gear-1-2/Update%2005/32-XWz2f.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## roster50__schneider_mg1

### SCHNEIDER — OUTER HEAVEN — METAL GEAR

**Rôle :** Chef De La Résistance. **Profil :** `soldier`.

**Base présente dans le code :** Schneider connaît l’architecture d’Outer Heaven ; sa simulation combine carabine, balise de passage et commandement de cellule.

**Incarnation à conserver :** Original resistance architect Schneider, 1987 manual portrait incarnation before Black Ninja MG2.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** SCHNEIDER — OUTER HEAVEN : appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas courts, crosse/équipement conservés près du torse. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Chef De La Résistance » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder appui militaire stable, arme maintenue dans l’axe et regard vers la menace.
- **jump_land :** SCHNEIDER — OUTER HEAVEN : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas courts, crosse/équipement conservés près du torse. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de SCHNEIDER — OUTER HEAVEN. Terminer par retour en couverture de l’arme après le coup. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « METAL GEAR », présentation de Original resistance architect Schneider, 1987 manual portrait incarnation before Black Ninja MG2., puis appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Geste court lié à « Carabine de cellule » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, retour en couverture de l’arme après le coup ; SCHNEIDER — OUTER HEAVEN vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à METAL GEAR.
- **round_loss :** Proposition CQC : SCHNEIDER — OUTER HEAVEN réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Soulèvement Outer Heaven », revenir par retour en couverture de l’arme après le coup, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SCHNEIDER — OUTER HEAVEN, préparer « Jab » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SCHNEIDER — OUTER HEAVEN, préparer « Frappe engagée » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SCHNEIDER — OUTER HEAVEN, préparer « Balayage » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SCHNEIDER — OUTER HEAVEN, préparer « Projection » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** retour en couverture de l’arme après le coup. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Carabine de cellule

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SCHNEIDER — OUTER HEAVEN, préparer « Carabine de cellule » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Carabine de cellule » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Charge de diversion

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SCHNEIDER — OUTER HEAVEN, préparer « Charge de diversion » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Prélever l’objet correspondant à « Charge de diversion », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Balise architecte

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SCHNEIDER — OUTER HEAVEN, préparer « Balise architecte » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Balise architecte » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Repli souterrain

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SCHNEIDER — OUTER HEAVEN, préparer « Repli souterrain » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer l’appui qui produit le déplacement ; pas courts, crosse/équipement conservés près du torse.

**Action.** Exécuter « Repli souterrain » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** retour en couverture de l’arme après le coup. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Soulèvement Outer Heaven

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SCHNEIDER — OUTER HEAVEN, préparer « Soulèvement Outer Heaven » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Soulèvement Outer Heaven » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SCHNEIDER — OUTER HEAVEN, préparer « Recharger » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** retour en couverture de l’arme après le coup. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Soulèvement Outer Heaven — Conclusion

Famille `ballistic`, ton `simulation` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Soulèvement Outer Heaven / Carabine de cellule.

Plan 1 : SCHNEIDER — OUTER HEAVEN sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Soulèvement Outer Heaven / Carabine de cellule ». Plan 2 : présenter l’arme effectivement associée à « Soulèvement Outer Heaven / Carabine de cellule », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : retour en couverture de l’arme après le coup, pose de signature face à l’adversaire. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Carabine de cellule — Conclusion

Famille `ballistic`, ton `simulation` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Carabine de cellule / Charge de diversion.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Carabine de cellule / Charge de diversion » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Carabine de cellule / Charge de diversion », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : retour en couverture de l’arme après le coup, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Balise architecte — Conclusion

Famille `ballistic`, ton `simulation` ; 256 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Balise architecte / Frappe engagée.

Plan 1 : approche jusqu’à la distance réelle de « Balise architecte / Frappe engagée », arme et main libre identifiées. Plan 2 : présenter l’arme effectivement associée à « Balise architecte / Frappe engagée », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : retour en couverture de l’arme après le coup, prise de distance et maintien final. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Simulation encadrée — Conclusion

Famille `ballistic`, ton `simulation` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Simulation encadrée / Projection.

Plan 1 : après une observation ou un repli, SCHNEIDER — OUTER HEAVEN reprend l’initiative par « Simulation encadrée / Projection ». Plan 2 : présenter l’arme effectivement associée à « Simulation encadrée / Projection », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : retour en couverture de l’arme après le coup, rangement/pose finale différente des trois autres. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Only the explicitly visible upper-body details are documented by the historical portrait. Plain lower-body garments and shoes, colours absent from the monochrome source and unseen seams are restrained project adaptation; no false claim of a released full-body turnaround.
- Sixteen complete native keyposes per facing are authored gameplay poses, not original historical animation frames.
- [Physically viewed original character reference(s), retained bitexact with source receipts; authored modern native sprite adaptation preserves documented visible details.](https://lparchive.org/Metal-Gear-1-2/Update%2005/4-TEEsR.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## roster50__madnar_mg1

### DR. PETTROVICH MADNAR — MG1 — METAL GEAR

**Rôle :** Roboticien. **Profil :** `analyst`.

**Base présente dans le code :** Scientifique contraint de développer TX-55 ; sa participation est une simulation technique non létale.

**Incarnation à conserver :** Original1987 kidnapped scientist Dr Pettrovich, manual bald/round-eyewear portrait.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, special, specialForward, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** DR. PETTROVICH MADNAR — MG1 : outil de lecture ou de communication montré par le profil, attitude d’observation. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Roboticien » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder outil de lecture ou de communication montré par le profil, attitude d’observation.
- **jump_land :** DR. PETTROVICH MADNAR — MG1 : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de DR. PETTROVICH MADNAR — MG1. Terminer par regard vers l’outil puis retour vers l’adversaire. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « METAL GEAR », présentation de Original1987 kidnapped scientist Dr Pettrovich, manual bald/round-eyewear portrait., puis outil de lecture ou de communication montré par le profil, attitude d’observation. Geste court lié à « Outil de laboratoire » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, regard vers l’outil puis retour vers l’adversaire ; DR. PETTROVICH MADNAR — MG1 vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à METAL GEAR.
- **round_loss :** Proposition CQC : DR. PETTROVICH MADNAR — MG1 réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Arrêt d’urgence TX-55 », revenir par regard vers l’outil puis retour vers l’adversaire, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DR. PETTROVICH MADNAR — MG1, préparer « Jab » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DR. PETTROVICH MADNAR — MG1, préparer « Frappe engagée » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DR. PETTROVICH MADNAR — MG1, préparer « Balayage » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DR. PETTROVICH MADNAR — MG1, préparer « Projection » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Outil de laboratoire

**Existant :** `melee` / `electric` ; 17/5/29 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DR. PETTROVICH MADNAR — MG1, préparer « Outil de laboratoire » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Outil de laboratoire » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense. L’effet electric reste séparé du membre ; son apparition et sa disparition suivent les événements du profil.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Espacement ou garde ; choc bref avec résistance temporaire après application.

##### specialDown — Prototype TX-11

**Existant :** `mark` / `recon` ; 26/1/30 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DR. PETTROVICH MADNAR — MG1, préparer « Prototype TX-11 » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Orienter regard, optique ou terminal vers la cible observée, sans consulter une action future.

**Action.** Pour « Prototype TX-11 », déclencher lecture/repérage avec un petit geste ou changement d’optique et un indicateur séparé. Le corps doit rester visible et vulnérable selon les données de combat.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Couper le signal ou abaisser l’outil ; retour vers l’adversaire sans nouvelle arme inventée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Portée limitée ; le marquage ne vise ni à travers toute l’arène ni automatiquement.

##### specialForward — Diagnostic Metal Gear

**Existant :** `mobility` / `movement` ; 7/18/25 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DR. PETTROVICH MADNAR — MG1, préparer « Diagnostic Metal Gear » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer l’appui qui produit le déplacement ; déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire.

**Action.** Exécuter « Diagnostic Metal Gear » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 4 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : La silhouette reste touchable ; la sortie est punissable.

##### specialBack — Repli de technicien

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DR. PETTROVICH MADNAR — MG1, préparer « Repli de technicien » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer l’appui qui produit le déplacement ; déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire.

**Action.** Exécuter « Repli de technicien » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Arrêt d’urgence TX-55

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DR. PETTROVICH MADNAR — MG1, préparer « Arrêt d’urgence TX-55 » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Arrêt d’urgence TX-55 », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Stabiliser la réserve

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DR. PETTROVICH MADNAR — MG1, préparer « Stabiliser la réserve » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Stabiliser la réserve ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Arrêt d’urgence TX-55 — Conclusion

Famille `tactical`, ton `simulation` ; 220 ticks CQC ; phases actuelles : scan → disable → secure → extract. Appuis déclarés : Arrêt d’urgence TX-55 / Outil de laboratoire.

Plan 1 : DR. PETTROVICH MADNAR — MG1 sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Arrêt d’urgence TX-55 / Outil de laboratoire ». Plan 2 : matérialiser le geste tactique « Arrêt d’urgence TX-55 / Outil de laboratoire » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : regard vers l’outil puis retour vers l’adversaire, pose de signature face à l’adversaire. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Outil de laboratoire — Conclusion

Famille `tactical`, ton `simulation` ; 238 ticks CQC ; phases actuelles : scan → disable → secure → extract. Appuis déclarés : Outil de laboratoire / Prototype TX-11.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Outil de laboratoire / Prototype TX-11 » ; l’espace disponible doit être lisible. Plan 2 : matérialiser le geste tactique « Outil de laboratoire / Prototype TX-11 » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : regard vers l’outil puis retour vers l’adversaire, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Diagnostic Metal Gear — Conclusion

Famille `capture`, ton `simulation` ; 256 ticks CQC ; phases actuelles : stun → disarm → restrain → extract. Appuis déclarés : Diagnostic Metal Gear / Frappe engagée.

Plan 1 : approche jusqu’à la distance réelle de « Diagnostic Metal Gear / Frappe engagée », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Diagnostic Metal Gear / Frappe engagée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : regard vers l’outil puis retour vers l’adversaire, prise de distance et maintien final. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Simulation encadrée — Conclusion

Famille `tactical`, ton `simulation` ; 274 ticks CQC ; phases actuelles : scan → disable → secure → extract. Appuis déclarés : Simulation encadrée / Projection.

Plan 1 : après une observation ou un repli, DR. PETTROVICH MADNAR — MG1 reprend l’initiative par « Simulation encadrée / Projection ». Plan 2 : matérialiser le geste tactique « Simulation encadrée / Projection » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : regard vers l’outil puis retour vers l’adversaire, rangement/pose finale différente des trois autres. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Only the explicitly visible upper-body details are documented by the historical portrait. Plain lower-body garments and shoes, colours absent from the monochrome source and unseen seams are restrained project adaptation; no false claim of a released full-body turnaround.
- Sixteen complete native keyposes per facing are authored gameplay poses, not original historical animation frames.
- Original rightv1 long coat differed from selected left short scientist blazer; rightv2 whole-image regenerated to identical upperhip jacket length, original rejected retained.
- [Physically viewed original character reference(s), retained bitexact with source receipts; authored modern native sprite adaptation preserves documented visible details.](https://lparchive.org/Metal-Gear-1-2/Update%2010/32-fi7uU.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## roster50__ellen_mg1

### ELLEN MADNAR — METAL GEAR

**Rôle :** Otage / Acrobate. **Profil :** `civilian`.

**Base présente dans le code :** Ancienne ballerine retenue à Outer Heaven ; son répertoire privilégie esquive, mobilité et neutralisation non létale.

**Incarnation à conserver :** Original kidnapped Bolshoi dancer Elen Pettrovich, Dr Madnar’s daughter, historical1987 portrait.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, special, specialForward, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** ELLEN MADNAR : posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas hésitants mais lisibles, en conservant l’âge et la stature. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Otage / Acrobate » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut.
- **jump_land :** ELLEN MADNAR : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas hésitants mais lisibles, en conservant l’âge et la stature. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de ELLEN MADNAR. Terminer par réaction humaine puis reprise d’appui ; combat explicitement simulé. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « METAL GEAR », présentation de Original kidnapped Bolshoi dancer Elen Pettrovich, Dr Madnar’s daughter, historical1987 portrait., puis posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Geste court lié à « Repousser la garde » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, réaction humaine puis reprise d’appui ; combat explicitement simulé ; ELLEN MADNAR vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à METAL GEAR.
- **round_loss :** Proposition CQC : ELLEN MADNAR réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Sortie d’Outer Heaven », revenir par réaction humaine puis reprise d’appui ; combat explicitement simulé, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ELLEN MADNAR, préparer « Jab » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ELLEN MADNAR, préparer « Frappe engagée » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ELLEN MADNAR, préparer « Balayage » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ELLEN MADNAR, préparer « Projection » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Repousser la garde

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ELLEN MADNAR, préparer « Repousser la garde » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Repousser la garde » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialDown — Pas de ballet

**Existant :** `mark` / `recon` ; 26/1/30 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ELLEN MADNAR, préparer « Pas de ballet » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Orienter regard, optique ou terminal vers la cible observée, sans consulter une action future.

**Action.** Pour « Pas de ballet », déclencher lecture/repérage avec un petit geste ou changement d’optique et un indicateur séparé. Le corps doit rester visible et vulnérable selon les données de combat.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé. Couper le signal ou abaisser l’outil ; retour vers l’adversaire sans nouvelle arme inventée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Portée limitée ; le marquage ne vise ni à travers toute l’arène ni automatiquement.

##### specialForward — Équilibre d’Ellen

**Existant :** `mobility` / `movement` ; 7/18/25 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ELLEN MADNAR, préparer « Équilibre d’Ellen » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Préparer l’appui qui produit le déplacement ; pas hésitants mais lisibles, en conservant l’âge et la stature.

**Action.** Exécuter « Équilibre d’Ellen » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 4 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : La silhouette reste touchable ; la sortie est punissable.

##### specialBack — Échappée de cellule

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ELLEN MADNAR, préparer « Échappée de cellule » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Préparer l’appui qui produit le déplacement ; pas hésitants mais lisibles, en conservant l’âge et la stature.

**Action.** Exécuter « Échappée de cellule » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Sortie d’Outer Heaven

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ELLEN MADNAR, préparer « Sortie d’Outer Heaven » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Sortie d’Outer Heaven », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Reprendre son souffle

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ELLEN MADNAR, préparer « Reprendre son souffle » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Reprendre son souffle ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Sortie d’Outer Heaven — Conclusion

Famille `tactical`, ton `simulation` ; 220 ticks CQC ; phases actuelles : scan → disable → secure → extract. Appuis déclarés : Sortie d’Outer Heaven / Repousser la garde.

Plan 1 : ELLEN MADNAR sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Sortie d’Outer Heaven / Repousser la garde ». Plan 2 : matérialiser le geste tactique « Sortie d’Outer Heaven / Repousser la garde » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : réaction humaine puis reprise d’appui ; combat explicitement simulé, pose de signature face à l’adversaire. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Repousser la garde — Conclusion

Famille `tactical`, ton `simulation` ; 238 ticks CQC ; phases actuelles : scan → disable → secure → extract. Appuis déclarés : Repousser la garde / Pas de ballet.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Repousser la garde / Pas de ballet » ; l’espace disponible doit être lisible. Plan 2 : matérialiser le geste tactique « Repousser la garde / Pas de ballet » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : réaction humaine puis reprise d’appui ; combat explicitement simulé, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Équilibre d’Ellen — Conclusion

Famille `capture`, ton `simulation` ; 256 ticks CQC ; phases actuelles : stun → disarm → restrain → extract. Appuis déclarés : Équilibre d’Ellen / Frappe engagée.

Plan 1 : approche jusqu’à la distance réelle de « Équilibre d’Ellen / Frappe engagée », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Équilibre d’Ellen / Frappe engagée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : réaction humaine puis reprise d’appui ; combat explicitement simulé, prise de distance et maintien final. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Simulation encadrée — Conclusion

Famille `tactical`, ton `simulation` ; 274 ticks CQC ; phases actuelles : scan → disable → secure → extract. Appuis déclarés : Simulation encadrée / Projection.

Plan 1 : après une observation ou un repli, ELLEN MADNAR reprend l’initiative par « Simulation encadrée / Projection ». Plan 2 : matérialiser le geste tactique « Simulation encadrée / Projection » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : réaction humaine puis reprise d’appui ; combat explicitement simulé, rangement/pose finale différente des trois autres. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Only the explicitly visible upper-body details are documented by the historical portrait. Plain lower-body garments and shoes, colours absent from the monochrome source and unseen seams are restrained project adaptation; no false claim of a released full-body turnaround.
- Lore says Bolshoi dancer, but no ballet outfit is depicted by original portrait; civilian full-body clothing remains explicit project interpretation.
- Sixteen complete native keyposes per facing are authored gameplay poses, not original historical animation frames.
- [Physically viewed original character reference(s), retained bitexact with source receipts; authored modern native sprite adaptation preserves documented visible details.](https://lparchive.org/Metal-Gear-1-2/Update%2010/21-tkoFl.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## roster50__steve_mg1

### STEVE — RÉSISTANCE — METAL GEAR

**Rôle :** Résistance. **Profil :** `soldier`.

**Base présente dans le code :** Membre de la Résistance et frère de Diane ; le Versus emploie une dotation de défense de cellule.

**Incarnation à conserver :** Canonical radio-only Steve1987 identity with explicitly authored unverified-body CQC civilian presentation

**État vérifié :** unattested-body-presentation-reconstruction. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** STEVE — RÉSISTANCE : appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas courts, crosse/équipement conservés près du torse. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Résistance » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder appui militaire stable, arme maintenue dans l’axe et regard vers la menace.
- **jump_land :** STEVE — RÉSISTANCE : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas courts, crosse/équipement conservés près du torse. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de STEVE — RÉSISTANCE. Terminer par retour en couverture de l’arme après le coup. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « METAL GEAR », présentation de Canonical radio-only Steve1987 identity with explicitly authored unverified-body CQC civilian presentation, puis appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Geste court lié à « Carabine de Steve » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, retour en couverture de l’arme après le coup ; STEVE — RÉSISTANCE vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à METAL GEAR.
- **round_loss :** Proposition CQC : STEVE — RÉSISTANCE réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Feu croisé Outer Heaven », revenir par retour en couverture de l’arme après le coup, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de STEVE — RÉSISTANCE, préparer « Jab » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de STEVE — RÉSISTANCE, préparer « Frappe engagée » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de STEVE — RÉSISTANCE, préparer « Balayage » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de STEVE — RÉSISTANCE, préparer « Projection » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** retour en couverture de l’arme après le coup. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Carabine de Steve

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de STEVE — RÉSISTANCE, préparer « Carabine de Steve » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Carabine de Steve » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Grenade de cellule

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de STEVE — RÉSISTANCE, préparer « Grenade de cellule » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Prélever l’objet correspondant à « Grenade de cellule », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Couverture de Diane

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de STEVE — RÉSISTANCE, préparer « Couverture de Diane » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Couverture de Diane » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Repli de résistance

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de STEVE — RÉSISTANCE, préparer « Repli de résistance » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer l’appui qui produit le déplacement ; pas courts, crosse/équipement conservés près du torse.

**Action.** Exécuter « Repli de résistance » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** retour en couverture de l’arme après le coup. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Feu croisé Outer Heaven

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de STEVE — RÉSISTANCE, préparer « Feu croisé Outer Heaven » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Feu croisé Outer Heaven » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de STEVE — RÉSISTANCE, préparer « Recharger » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** retour en couverture de l’arme après le coup. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Feu croisé Outer Heaven — Conclusion

Famille `ballistic`, ton `simulation` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Feu croisé Outer Heaven / Carabine de Steve.

Plan 1 : STEVE — RÉSISTANCE sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Feu croisé Outer Heaven / Carabine de Steve ». Plan 2 : présenter l’arme effectivement associée à « Feu croisé Outer Heaven / Carabine de Steve », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : retour en couverture de l’arme après le coup, pose de signature face à l’adversaire. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Carabine de Steve — Conclusion

Famille `ballistic`, ton `simulation` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Carabine de Steve / Grenade de cellule.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Carabine de Steve / Grenade de cellule » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Carabine de Steve / Grenade de cellule », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : retour en couverture de l’arme après le coup, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Couverture de Diane — Conclusion

Famille `ballistic`, ton `simulation` ; 256 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Couverture de Diane / Frappe engagée.

Plan 1 : approche jusqu’à la distance réelle de « Couverture de Diane / Frappe engagée », arme et main libre identifiées. Plan 2 : présenter l’arme effectivement associée à « Couverture de Diane / Frappe engagée », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : retour en couverture de l’arme après le coup, prise de distance et maintien final. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Simulation encadrée — Conclusion

Famille `ballistic`, ton `simulation` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Simulation encadrée / Projection.

Plan 1 : après une observation ou un repli, STEVE — RÉSISTANCE reprend l’initiative par « Simulation encadrée / Projection ». Plan 2 : présenter l’arme effectivement associée à « Simulation encadrée / Projection », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : retour en couverture de l’arme après le coup, rangement/pose finale différente des trois autres. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Native original CQC presentation preserves the attested narrative identity or unit motifs; a canonical personal body is not attested. Complete face/outfit/weapon details are explicitly authored reconstruction, not an official full-body appearance.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Native2.5D poses are authored CQC adaptation, source pixels unchanged, original moves/collision/timing untouched.
- No unconditional1:1 certification; hidden rear seams, small text and unshown details remain explicit restrained reconstruction.
- No personal canonical anatomical/body appearance is attested. This native sprite is an expressly qualified authored CQC presentation reconstruction, not an official released design, recovered portrait or pixel-perfect canon body. Review checks confirm consistency of the expressly qualified authored design, not unknown canon details.
- [Official Konami1987 history text attests Steve as Diane older brother and resistance radio responder. No personal visualsource/portrait found; complete face/outfit are openly original CQC design. Not assigned hostage/punk portrait as false Steve.](https://www.konami.com/mg/history/jp/ja/mg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## roster50__jennifer_mg1

### JENNIFER — OUTER HEAVEN — METAL GEAR

**Rôle :** Résistance / Médical. **Profil :** `pistol`.

**Base présente dans le code :** Jennifer infiltre le personnel médical ; sa simulation emploie pistolet, kit de terrain et extraction.

**Incarnation à conserver :** Resistance medical-staff infiltrator Jennifer, original1987 manual cap/long-hair appearance.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `throw` = throw, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** JENNIFER — OUTER HEAVEN : main forte et main de soutien identifiées sur le pistolet, coudes contenus. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas prudents sans inverser l’étui ni la main forte. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Résistance / Médical » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder main forte et main de soutien identifiées sur le pistolet, coudes contenus.
- **jump_land :** JENNIFER — OUTER HEAVEN : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas prudents sans inverser l’étui ni la main forte. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de JENNIFER — OUTER HEAVEN. Terminer par recul du poignet puis stabilisation du canon. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « METAL GEAR », présentation de Resistance medical-staff infiltrator Jennifer, original1987 manual cap/long-hair appearance., puis main forte et main de soutien identifiées sur le pistolet, coudes contenus. Geste court lié à « Pistolet médical » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, recul du poignet puis stabilisation du canon ; JENNIFER — OUTER HEAVEN vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à METAL GEAR.
- **round_loss :** Proposition CQC : JENNIFER — OUTER HEAVEN réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Évacuation Outer Heaven », revenir par recul du poignet puis stabilisation du canon, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JENNIFER — OUTER HEAVEN, préparer « Jab » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JENNIFER — OUTER HEAVEN, préparer « Frappe engagée » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JENNIFER — OUTER HEAVEN, préparer « Balayage » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JENNIFER — OUTER HEAVEN, préparer « Projection » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recul du poignet puis stabilisation du canon. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Pistolet médical

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JENNIFER — OUTER HEAVEN, préparer « Pistolet médical » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Montrer la prise et la visée de l’arme décrite par « Pistolet médical » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Kit de terrain

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JENNIFER — OUTER HEAVEN, préparer « Kit de terrain » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Prélever l’objet correspondant à « Kit de terrain », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Extraction du prisonnier

**Existant :** `melee` / `grapple` ; 10/3/32 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JENNIFER — OUTER HEAVEN, préparer « Extraction du prisonnier » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recul du poignet puis stabilisation du canon. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Hors de portée ou saut ; ne saisir ni cible aérienne ni cible sous protection post-projection.

##### specialBack — Repli de Jennifer

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JENNIFER — OUTER HEAVEN, préparer « Repli de Jennifer » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer l’appui qui produit le déplacement ; pas prudents sans inverser l’étui ni la main forte.

**Action.** Exécuter « Repli de Jennifer » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** recul du poignet puis stabilisation du canon. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Évacuation Outer Heaven

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JENNIFER — OUTER HEAVEN, préparer « Évacuation Outer Heaven » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Montrer la prise et la visée de l’arme décrite par « Évacuation Outer Heaven » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JENNIFER — OUTER HEAVEN, préparer « Recharger » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** recul du poignet puis stabilisation du canon. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Évacuation Outer Heaven — Conclusion

Famille `ballistic`, ton `simulation` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Évacuation Outer Heaven / Pistolet médical.

Plan 1 : JENNIFER — OUTER HEAVEN sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Évacuation Outer Heaven / Pistolet médical ». Plan 2 : présenter l’arme effectivement associée à « Évacuation Outer Heaven / Pistolet médical », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : recul du poignet puis stabilisation du canon, pose de signature face à l’adversaire. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Pistolet médical — Conclusion

Famille `ballistic`, ton `simulation` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Pistolet médical / Kit de terrain.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Pistolet médical / Kit de terrain » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Pistolet médical / Kit de terrain », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : recul du poignet puis stabilisation du canon, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Extraction du prisonnier — Conclusion

Famille `ballistic`, ton `simulation` ; 256 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Extraction du prisonnier / Frappe engagée.

Plan 1 : approche jusqu’à la distance réelle de « Extraction du prisonnier / Frappe engagée », arme et main libre identifiées. Plan 2 : présenter l’arme effectivement associée à « Extraction du prisonnier / Frappe engagée », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : recul du poignet puis stabilisation du canon, prise de distance et maintien final. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Simulation encadrée — Conclusion

Famille `ballistic`, ton `simulation` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Simulation encadrée / Projection.

Plan 1 : après une observation ou un repli, JENNIFER — OUTER HEAVEN reprend l’initiative par « Simulation encadrée / Projection ». Plan 2 : présenter l’arme effectivement associée à « Simulation encadrée / Projection », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : recul du poignet puis stabilisation du canon, rangement/pose finale différente des trois autres. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Only the explicitly visible upper-body details are documented by the historical portrait. Plain lower-body garments and shoes, colours absent from the monochrome source and unseen seams are restrained project adaptation; no false claim of a released full-body turnaround.
- Original cap silhouette is retained without asserting an exact manufacturer/type; native codec is low-resolution supplemental face evidence.
- Sixteen complete native keyposes per facing are authored gameplay poses, not original historical animation frames.
- Rightv1 resourcepose10 lacked complete lower legs/shoes; rejected original preserved. Whole native source re-generated as rightv2 with complete standing gesture.
- Leftv1 jacket buttoned unlike selected right open-front jacket; leftv2 tool edit matches same open-front costume, rejected original preserved.
- [Physically viewed original character reference(s), retained bitexact with source receipts; authored modern native sprite adaptation preserves documented visible details.](https://lparchive.org/Metal-Gear-1-2/Update%2009/17-QokKZ.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## roster50__campbell_mg2

### ROY CAMPBELL — MG2 — METAL GEAR 2

**Rôle :** Commandant Foxhound. **Profil :** `pistol`.

**Base présente dans le code :** Campbell commande Intrude F014 ; cette incarnation utilise pistolet, carabine et ordres tactiques adaptés au Versus.

**Incarnation à conserver :** Revised official MG2 Colonel Roy Campbell, original Zanzibar command support incarnation.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `retro-msx`, `tuxedo`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** ROY CAMPBELL — MG2 : main forte et main de soutien identifiées sur le pistolet, coudes contenus. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas prudents sans inverser l’étui ni la main forte. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Commandant Foxhound » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder main forte et main de soutien identifiées sur le pistolet, coudes contenus.
- **jump_land :** ROY CAMPBELL — MG2 : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas prudents sans inverser l’étui ni la main forte. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de ROY CAMPBELL — MG2. Terminer par recul du poignet puis stabilisation du canon. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « METAL GEAR 2 », présentation de Revised official MG2 Colonel Roy Campbell, original Zanzibar command support incarnation., puis main forte et main de soutien identifiées sur le pistolet, coudes contenus. Geste court lié à « Pistolet de commandement » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, recul du poignet puis stabilisation du canon ; ROY CAMPBELL — MG2 vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à METAL GEAR 2.
- **round_loss :** Proposition CQC : ROY CAMPBELL — MG2 réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Intrude F014 », revenir par recul du poignet puis stabilisation du canon, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ROY CAMPBELL — MG2, préparer « Jab » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ROY CAMPBELL — MG2, préparer « Frappe engagée » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ROY CAMPBELL — MG2, préparer « Balayage » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ROY CAMPBELL — MG2, préparer « Projection » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recul du poignet puis stabilisation du canon. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Pistolet de commandement

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ROY CAMPBELL — MG2, préparer « Pistolet de commandement » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Montrer la prise et la visée de l’arme décrite par « Pistolet de commandement » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Grenade FOXHOUND

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ROY CAMPBELL — MG2, préparer « Grenade FOXHOUND » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Prélever l’objet correspondant à « Grenade FOXHOUND », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Ordre de progression

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ROY CAMPBELL — MG2, préparer « Ordre de progression » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Ordre de progression » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Repli du commandant

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ROY CAMPBELL — MG2, préparer « Repli du commandant » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer l’appui qui produit le déplacement ; pas prudents sans inverser l’étui ni la main forte.

**Action.** Exécuter « Repli du commandant » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** recul du poignet puis stabilisation du canon. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Intrude F014

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ROY CAMPBELL — MG2, préparer « Intrude F014 » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Montrer la prise et la visée de l’arme décrite par « Intrude F014 » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ROY CAMPBELL — MG2, préparer « Recharger » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** recul du poignet puis stabilisation du canon. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Intrude F014 — Conclusion

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Intrude F014 / Pistolet de commandement.

Plan 1 : ROY CAMPBELL — MG2 sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Intrude F014 / Pistolet de commandement ». Plan 2 : présenter l’arme effectivement associée à « Intrude F014 / Pistolet de commandement », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : recul du poignet puis stabilisation du canon, pose de signature face à l’adversaire.

##### Pistolet de commandement — Conclusion

Famille `ballistic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Pistolet de commandement / Grenade FOXHOUND.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Pistolet de commandement / Grenade FOXHOUND » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Pistolet de commandement / Grenade FOXHOUND », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : recul du poignet puis stabilisation du canon, arrêt du dispositif et retour au cadre d’ensemble.

##### Ordre de progression — Conclusion

Famille `ballistic`, ton `stylized` ; 256 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Ordre de progression / Frappe engagée.

Plan 1 : approche jusqu’à la distance réelle de « Ordre de progression / Frappe engagée », arme et main libre identifiées. Plan 2 : présenter l’arme effectivement associée à « Ordre de progression / Frappe engagée », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : recul du poignet puis stabilisation du canon, prise de distance et maintien final.

##### Sang-froid — Conclusion

Famille `ballistic`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Sang-froid / Projection.

Plan 1 : après une observation ou un repli, ROY CAMPBELL — MG2 reprend l’initiative par « Sang-froid / Projection ». Plan 2 : présenter l’arme effectivement associée à « Sang-froid / Projection », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : recul du poignet puis stabilisation du canon, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Only the explicitly visible upper-body details are documented by the historical portrait. Plain lower-body garments and shoes, colours absent from the monochrome source and unseen seams are restrained project adaptation; no false claim of a released full-body turnaround.
- Sixteen complete native keyposes per facing are authored gameplay poses, not original historical animation frames.
- First left source copied right-facing orientation despite left instruction; preserved rejected. Independently redrawn leftv2 mandatory, no bitmap mirroring.
- [Physically viewed original character reference(s), retained bitexact with source receipts; authored modern native sprite adaptation preserves documented visible details.](https://www.konami.com/mg/archive/mg2/pic/roy.gif) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## roster50__miller_mg2

### MASTER MILLER — MG2 — METAL GEAR 2

**Rôle :** Survie / Cqc. **Profil :** `boss_cqc`.

**Base présente dans le code :** Ancien instructeur FOXHOUND : survie, prises et contre rapproché, sans importer les capacités de Liquid Snake.

**Incarnation à conserver :** Original1999 survival instructor McDonell Benedict Miller, revised official MG2 portrait, alive with intact limbs.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `throw` = throw, special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** MASTER MILLER — MG2 : garde de The Boss, main de contrôle et main d’arme clairement séparées. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** entrée courte, rotation de bassin et placement du pied de contrôle. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Survie / Cqc » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder garde de The Boss, main de contrôle et main d’arme clairement séparées.
- **jump_land :** MASTER MILLER — MG2 : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. entrée courte, rotation de bassin et placement du pied de contrôle. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de MASTER MILLER — MG2. Terminer par désarmement/projection lisible puis retour sobre à la garde. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « METAL GEAR 2 », présentation de Original1999 survival instructor McDonell Benedict Miller, revised official MG2 portrait, alive with intact limbs., puis garde de The Boss, main de contrôle et main d’arme clairement séparées. Geste court lié à « CQC de l’instructeur » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, désarmement/projection lisible puis retour sobre à la garde ; MASTER MILLER — MG2 vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à METAL GEAR 2.
- **round_loss :** Proposition CQC : MASTER MILLER — MG2 réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Leçon de Miller », revenir par désarmement/projection lisible puis retour sobre à la garde, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MASTER MILLER — MG2, préparer « Jab » ; garde de The Boss, main de contrôle et main d’arme clairement séparées. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** désarmement/projection lisible puis retour sobre à la garde.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MASTER MILLER — MG2, préparer « Frappe engagée » ; garde de The Boss, main de contrôle et main d’arme clairement séparées. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** désarmement/projection lisible puis retour sobre à la garde.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MASTER MILLER — MG2, préparer « Balayage » ; garde de The Boss, main de contrôle et main d’arme clairement séparées. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** désarmement/projection lisible puis retour sobre à la garde.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MASTER MILLER — MG2, préparer « Projection » ; garde de The Boss, main de contrôle et main d’arme clairement séparées. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** désarmement/projection lisible puis retour sobre à la garde. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — CQC de l’instructeur

**Existant :** `melee` / `grapple` ; 8/3/32 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MASTER MILLER — MG2, préparer « CQC de l’instructeur » ; garde de The Boss, main de contrôle et main d’arme clairement séparées. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** désarmement/projection lisible puis retour sobre à la garde. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Hors de portée ou saut ; ne saisir ni cible aérienne ni cible sous protection post-projection.

##### specialDown — Couteau de survie

**Existant :** `projectile` / `ballistic` ; 22/1/36 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MASTER MILLER — MG2, préparer « Couteau de survie » ; garde de The Boss, main de contrôle et main d’arme clairement séparées. Montrer la prise et la visée de l’arme décrite par « Couteau de survie » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 3 émissions, espacées de 5 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** désarmement/projection lisible puis retour sobre à la garde. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 3 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### specialForward — Prise du camp

**Existant :** `melee` / `blade` ; 18/7/32 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MASTER MILLER — MG2, préparer « Prise du camp » ; garde de The Boss, main de contrôle et main d’arme clairement séparées. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** désarmement/projection lisible puis retour sobre à la garde. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Pas de retraite

**Existant :** `parry` / `counter` ; 4/9/34 ticks ; groupe `parry`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MASTER MILLER — MG2, préparer « Pas de retraite » ; garde de The Boss, main de contrôle et main d’arme clairement séparées. Présenter la surface ou l’organe de parade et maintenir une fenêtre courte lisible.

**Action.** Recevoir puis dévier au contact réel pour « Pas de retraite » ; la riposte et son effet n’apparaissent qu’après succès. Une attente sans contact garde une pose différente du contre réussi.

**Retour.** désarmement/projection lisible puis retour sobre à la garde. Séparer sortie ratée, blocage simple et riposte ; aucun effet de réussite avant collision.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Projeter ou retarder la frappe ; le désarmement temporaire ne supprime jamais l’inventaire.

##### super — Leçon de Miller

**Existant :** `melee` / `grapple` ; 25/7/44 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MASTER MILLER — MG2, préparer « Leçon de Miller » ; garde de The Boss, main de contrôle et main d’arme clairement séparées. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** désarmement/projection lisible puis retour sobre à la garde. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Reprendre son souffle

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MASTER MILLER — MG2, préparer « Reprendre son souffle » ; garde de The Boss, main de contrôle et main d’arme clairement séparées. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Reprendre son souffle ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** désarmement/projection lisible puis retour sobre à la garde. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Leçon de Miller — Conclusion

Famille `cqc`, ton `stylized` ; 220 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Leçon de Miller / CQC de l’instructeur.

Plan 1 : MASTER MILLER — MG2 sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Leçon de Miller / CQC de l’instructeur ». Plan 2 : contact de saisie ou neutralisation lié à « Leçon de Miller / CQC de l’instructeur », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : désarmement/projection lisible puis retour sobre à la garde, pose de signature face à l’adversaire.

##### CQC de l’instructeur — Conclusion

Famille `cqc`, ton `stylized` ; 238 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : CQC de l’instructeur / Couteau de survie.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « CQC de l’instructeur / Couteau de survie » ; l’espace disponible doit être lisible. Plan 2 : contact de saisie ou neutralisation lié à « CQC de l’instructeur / Couteau de survie », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : désarmement/projection lisible puis retour sobre à la garde, arrêt du dispositif et retour au cadre d’ensemble.

##### Prise du camp — Conclusion

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Prise du camp / Frappe engagée.

Plan 1 : approche jusqu’à la distance réelle de « Prise du camp / Frappe engagée », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Prise du camp / Frappe engagée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : désarmement/projection lisible puis retour sobre à la garde, prise de distance et maintien final.

##### Lecture rapprochée — Conclusion

Famille `cqc`, ton `stylized` ; 274 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Lecture rapprochée / Projection.

Plan 1 : après une observation ou un repli, MASTER MILLER — MG2 reprend l’initiative par « Lecture rapprochée / Projection ». Plan 2 : contact de saisie ou neutralisation lié à « Lecture rapprochée / Projection », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : désarmement/projection lisible puis retour sobre à la garde, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Only the explicitly visible upper-body details are documented by the historical portrait. Plain lower-body garments and shoes, colours absent from the monochrome source and unseen seams are restrained project adaptation; no false claim of a released full-body turnaround.
- Sixteen complete native keyposes per facing are authored gameplay poses, not original historical animation frames.
- [Physically viewed original character reference(s), retained bitexact with source receipts; authored modern native sprite adaptation preserves documented visible details.](https://www.konami.com/mg/archive/mg2/pic/macdonell.gif) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## roster50__kasler_mg2

### GEORGE KASLER — METAL GEAR 2

**Rôle :** Renseignement Mercenaire. **Profil :** `soldier`.

**Base présente dans le code :** Kasler est un informateur de guerre ; le Versus lui donne une carabine et des lectures de cible issues de son expérience.

**Incarnation à conserver :** MG2 official released-port revised codec appearance, not original1990 celebrity likeness

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** GEORGE KASLER : appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas courts, crosse/équipement conservés près du torse. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Renseignement Mercenaire » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder appui militaire stable, arme maintenue dans l’axe et regard vers la menace.
- **jump_land :** GEORGE KASLER : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas courts, crosse/équipement conservés près du torse. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de GEORGE KASLER. Terminer par retour en couverture de l’arme après le coup. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « METAL GEAR 2 », présentation de MG2 official released-port revised codec appearance, not original1990 celebrity likeness, puis appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Geste court lié à « Carabine de mercenaire » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, retour en couverture de l’arme après le coup ; GEORGE KASLER vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à METAL GEAR 2.
- **round_loss :** Proposition CQC : GEORGE KASLER réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Dossier de guerre », revenir par retour en couverture de l’arme après le coup, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GEORGE KASLER, préparer « Jab » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GEORGE KASLER, préparer « Frappe engagée » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GEORGE KASLER, préparer « Balayage » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GEORGE KASLER, préparer « Projection » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** retour en couverture de l’arme après le coup. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Carabine de mercenaire

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GEORGE KASLER, préparer « Carabine de mercenaire » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Carabine de mercenaire » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Grenade d’arrêt

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GEORGE KASLER, préparer « Grenade d’arrêt » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Prélever l’objet correspondant à « Grenade d’arrêt », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Analyse du vétéran

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GEORGE KASLER, préparer « Analyse du vétéran » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Analyse du vétéran » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Décrochage Kasler

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GEORGE KASLER, préparer « Décrochage Kasler » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer l’appui qui produit le déplacement ; pas courts, crosse/équipement conservés près du torse.

**Action.** Exécuter « Décrochage Kasler » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** retour en couverture de l’arme après le coup. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Dossier de guerre

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GEORGE KASLER, préparer « Dossier de guerre » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Dossier de guerre » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GEORGE KASLER, préparer « Recharger » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** retour en couverture de l’arme après le coup. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Dossier de guerre — Conclusion

Famille `ballistic`, ton `simulation` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Dossier de guerre / Carabine de mercenaire.

Plan 1 : GEORGE KASLER sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Dossier de guerre / Carabine de mercenaire ». Plan 2 : présenter l’arme effectivement associée à « Dossier de guerre / Carabine de mercenaire », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : retour en couverture de l’arme après le coup, pose de signature face à l’adversaire. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Carabine de mercenaire — Conclusion

Famille `ballistic`, ton `simulation` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Carabine de mercenaire / Grenade d’arrêt.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Carabine de mercenaire / Grenade d’arrêt » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Carabine de mercenaire / Grenade d’arrêt », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : retour en couverture de l’arme après le coup, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Analyse du vétéran — Conclusion

Famille `ballistic`, ton `simulation` ; 256 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Analyse du vétéran / Frappe engagée.

Plan 1 : approche jusqu’à la distance réelle de « Analyse du vétéran / Frappe engagée », arme et main libre identifiées. Plan 2 : présenter l’arme effectivement associée à « Analyse du vétéran / Frappe engagée », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : retour en couverture de l’arme après le coup, prise de distance et maintien final. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Simulation encadrée — Conclusion

Famille `ballistic`, ton `simulation` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Simulation encadrée / Projection.

Plan 1 : après une observation ou un repli, GEORGE KASLER reprend l’initiative par « Simulation encadrée / Projection ». Plan 2 : présenter l’arme effectivement associée à « Simulation encadrée / Projection », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : retour en couverture de l’arme après le coup, rangement/pose finale différente des trois autres. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Only visible source portrait/sprite details are documented. Complete lower-body garments, unseen rear seams, tiny text and unshown colours remain explicitly authored conservative project reconstruction; no full official turnaround certification.
- Sixteen independent complete physical poses per direction are authored CQC adaptation; original moves, hitboxes and projectiles remain unchanged.
- [Official Konami released-port revised MG2 codec portrait physically viewed; original in-game body capture supplement when present, hardware edition not certified.](https://www.konami.com/mg/archive/mg2/pic/george.gif) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## roster50__marv_mg2

### DR. KIO MARV — METAL GEAR 2

**Rôle :** Scientifique Oilix. **Profil :** `analyst`.

**Base présente dans le code :** Scientifique d’OILIX ; ses gadgets de duel sont une simulation de laboratoire non létale.

**Incarnation à conserver :** MG2 official released-port revised codec appearance, not original1990 celebrity likeness

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, special, specialForward, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** DR. KIO MARV : outil de lecture ou de communication montré par le profil, attitude d’observation. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Scientifique Oilix » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder outil de lecture ou de communication montré par le profil, attitude d’observation.
- **jump_land :** DR. KIO MARV : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de DR. KIO MARV. Terminer par regard vers l’outil puis retour vers l’adversaire. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « METAL GEAR 2 », présentation de MG2 official released-port revised codec appearance, not original1990 celebrity likeness, puis outil de lecture ou de communication montré par le profil, attitude d’observation. Geste court lié à « Outil OILIX » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, regard vers l’outil puis retour vers l’adversaire ; DR. KIO MARV vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à METAL GEAR 2.
- **round_loss :** Proposition CQC : DR. KIO MARV réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Protocole OILIX », revenir par regard vers l’outil puis retour vers l’adversaire, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DR. KIO MARV, préparer « Jab » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DR. KIO MARV, préparer « Frappe engagée » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DR. KIO MARV, préparer « Balayage » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DR. KIO MARV, préparer « Projection » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Outil OILIX

**Existant :** `melee` / `electric` ; 17/5/29 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DR. KIO MARV, préparer « Outil OILIX » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Outil OILIX » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense. L’effet electric reste séparé du membre ; son apparition et sa disparition suivent les événements du profil.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Espacement ou garde ; choc bref avec résistance temporaire après application.

##### specialDown — Mousse de culture

**Existant :** `mark` / `recon` ; 26/1/30 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DR. KIO MARV, préparer « Mousse de culture » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Orienter regard, optique ou terminal vers la cible observée, sans consulter une action future.

**Action.** Pour « Mousse de culture », déclencher lecture/repérage avec un petit geste ou changement d’optique et un indicateur séparé. Le corps doit rester visible et vulnérable selon les données de combat.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Couper le signal ou abaisser l’outil ; retour vers l’adversaire sans nouvelle arme inventée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Portée limitée ; le marquage ne vise ni à travers toute l’arène ni automatiquement.

##### specialForward — Analyse biologique

**Existant :** `mobility` / `movement` ; 7/18/25 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DR. KIO MARV, préparer « Analyse biologique » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer l’appui qui produit le déplacement ; déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire.

**Action.** Exécuter « Analyse biologique » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 4 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : La silhouette reste touchable ; la sortie est punissable.

##### specialBack — Repli de Marv

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DR. KIO MARV, préparer « Repli de Marv » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer l’appui qui produit le déplacement ; déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire.

**Action.** Exécuter « Repli de Marv » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Protocole OILIX

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DR. KIO MARV, préparer « Protocole OILIX » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Protocole OILIX », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Stabiliser la réserve

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DR. KIO MARV, préparer « Stabiliser la réserve » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Stabiliser la réserve ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Protocole OILIX — Conclusion

Famille `tactical`, ton `simulation` ; 220 ticks CQC ; phases actuelles : scan → disable → secure → extract. Appuis déclarés : Protocole OILIX / Outil OILIX.

Plan 1 : DR. KIO MARV sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Protocole OILIX / Outil OILIX ». Plan 2 : matérialiser le geste tactique « Protocole OILIX / Outil OILIX » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : regard vers l’outil puis retour vers l’adversaire, pose de signature face à l’adversaire. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Outil OILIX — Conclusion

Famille `tactical`, ton `simulation` ; 238 ticks CQC ; phases actuelles : scan → disable → secure → extract. Appuis déclarés : Outil OILIX / Mousse de culture.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Outil OILIX / Mousse de culture » ; l’espace disponible doit être lisible. Plan 2 : matérialiser le geste tactique « Outil OILIX / Mousse de culture » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : regard vers l’outil puis retour vers l’adversaire, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Analyse biologique — Conclusion

Famille `capture`, ton `simulation` ; 256 ticks CQC ; phases actuelles : stun → disarm → restrain → extract. Appuis déclarés : Analyse biologique / Frappe engagée.

Plan 1 : approche jusqu’à la distance réelle de « Analyse biologique / Frappe engagée », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Analyse biologique / Frappe engagée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : regard vers l’outil puis retour vers l’adversaire, prise de distance et maintien final. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Simulation encadrée — Conclusion

Famille `tactical`, ton `simulation` ; 274 ticks CQC ; phases actuelles : scan → disable → secure → extract. Appuis déclarés : Simulation encadrée / Projection.

Plan 1 : après une observation ou un repli, DR. KIO MARV reprend l’initiative par « Simulation encadrée / Projection ». Plan 2 : matérialiser le geste tactique « Simulation encadrée / Projection » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : regard vers l’outil puis retour vers l’adversaire, rangement/pose finale différente des trois autres. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Only visible source portrait/sprite details are documented. Complete lower-body garments, unseen rear seams, tiny text and unshown colours remain explicitly authored conservative project reconstruction; no full official turnaround certification.
- Sixteen independent complete physical poses per direction are authored CQC adaptation; original moves, hitboxes and projectiles remain unchanged.
- [Official Konami released-port revised MG2 codec portrait physically viewed; original in-game body capture supplement when present, hardware edition not certified.](https://www.konami.com/mg/archive/mg2/pic/kio.gif) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).
