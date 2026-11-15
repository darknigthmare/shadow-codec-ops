# PARALLAXE — mode original optionnel

Identifiant `oc__parallaxe`. Cette fiche est **hors des totaux du roster par défaut de 380 acteurs**. Le personnage est ajouté volontairement quand `original=parallaxe` et que le module n’est pas lancé en mode récit ; son absence du roster par défaut n’est pas un bug. Les finishers sont désactivés dans ce mode par le code actuel.

**Origine :** Personnage original de Station Méridien. Les techniques appartiennent à sa fiction CQC. **Incarnation graphique :** Original OC design authorized by user, olive armor and left-eye optic.

**État natif déclaré :** 72 régions source distinctes ; vues gauche/droite indépendantes, aucun miroir. Les techniques ci-dessous sont déclarées dans le module original, séparément de la sonde du roster par défaut.

[Index général](README.md) · [Contrat de production](../04_ANIMATIONS_SPRITES.md)

## États individualisés

- **idle :** PARALLAXE : armure olive originale, optique sur le côté anatomique gauche et arme du dessin utilisateur. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas d’observation tactique, positionnement autour du seul leurre actif. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Leurre local et observation de déplacements visibles » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder armure olive originale, optique sur le côté anatomique gauche et arme du dessin utilisateur.
- **jump_land :** PARALLAXE : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas d’observation tactique, positionnement autour du seul leurre actif. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de PARALLAXE. Terminer par rappel du dispositif ou baisse de l’optique puis retour en garde. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « STATION MÉRIDIEN · OC », présentation de Original OC design authorized by user, olive armor and left-eye optic, puis armure olive originale, optique sur le côté anatomique gauche et arme du dessin utilisateur. Geste court lié à « Leurre local » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, rappel du dispositif ou baisse de l’optique puis retour en garde ; PARALLAXE vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à STATION MÉRIDIEN · OC.
- **round_loss :** Proposition CQC : PARALLAXE réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Croisement de trajectoires », revenir par rappel du dispositif ou baisse de l’optique puis retour en garde, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

## Dix techniques originales déclarées

### light — Frappe de contrôle

`melee` / `strike` ; 7/3/13 ticks CQC ; groupe déclaré `punch`.

**Préparation.** Depuis la garde de PARALLAXE, préparer « Frappe de contrôle » ; armure olive originale, optique sur le côté anatomique gauche et arme du dessin utilisateur. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Frappe de contrôle » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** rappel du dispositif ou baisse de l’optique puis retour en garde.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer, sortir de portée et punir la récupération visible.

### heavy — Engagement lourd

`melee` / `strike` ; 16/5/28 ticks CQC ; groupe déclaré `punch`.

**Préparation.** Depuis la garde de PARALLAXE, préparer « Engagement lourd » ; armure olive originale, optique sur le côté anatomique gauche et arme du dessin utilisateur. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Engagement lourd », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** rappel du dispositif ou baisse de l’optique puis retour en garde.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer, sortir de portée et punir la récupération visible.

### low — Balayage de zone

`melee` / `strike` ; 13/4/24 ticks CQC ; groupe déclaré `low`.

**Préparation.** Depuis la garde de PARALLAXE, préparer « Balayage de zone » ; armure olive originale, optique sur le côté anatomique gauche et arme du dessin utilisateur. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** rappel du dispositif ou baisse de l’optique puis retour en garde.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

### throw — Rupture au contact

`melee` / `grapple` ; 9/2/35 ticks CQC ; groupe déclaré `throw`.

**Préparation.** Depuis la garde de PARALLAXE, préparer « Rupture au contact » ; armure olive originale, optique sur le côté anatomique gauche et arme du dessin utilisateur. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** rappel du dispositif ou baisse de l’optique puis retour en garde. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Sauter, reculer ou déchoper avec U / R près de l’impact.

### special — Leurre local

`trap` / `snare` ; 30/1/27 ticks CQC ; groupe déclaré `deploy`.

**Préparation.** Depuis la garde de PARALLAXE, préparer « Leurre local » ; armure olive originale, optique sur le côté anatomique gauche et arme du dessin utilisateur. Prendre le dispositif, s’abaisser vers le support et indiquer le lieu de pose avant activation.

**Action.** Poser « Leurre local » au point réel de main/outil, armer puis retirer le membre. Le dispositif possède ensuite son propre sprite, ses états attente/armement/déclenchement/destruction et sa collision.

**Retour.** rappel du dispositif ou baisse de l’optique puis retour en garde. Se dégager de l’objet sans le téléporter ; l’interruption avant armement a sa propre sortie.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre les 30 images de préparation, éviter le rayon de 72 px, sauter ou détruire le dispositif au corps à corps.

### specialDown — Rappel du leurre

`recallTrap` / `recovery` ; 12/1/18 ticks CQC ; groupe déclaré `deploy`.

**Préparation.** Depuis la garde de PARALLAXE, préparer « Rappel du leurre » ; armure olive originale, optique sur le côté anatomique gauche et arme du dessin utilisateur.

**Action.** Storyborder explicitement l’organe et l’événement du type recallTrap avant production ; aucune correspondance anatomique n’est présumée.

**Retour.** rappel du dispositif ou baisse de l’optique puis retour en garde.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Le rappel ne retire que le dispositif personnel à moins de 240 px ; aucune explosion ni récupération d’autonomie.

### specialForward — Carabine conventionnelle

`projectile` / `ballistic` ; 18/1/29 ticks CQC ; groupe déclaré `shoot`.

**Préparation.** Depuis la garde de PARALLAXE, préparer « Carabine conventionnelle » ; armure olive originale, optique sur le côté anatomique gauche et arme du dessin utilisateur. Montrer la prise et la visée de l’arme décrite par « Carabine conventionnelle » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** rappel du dispositif ou baisse de l’optique puis retour en garde. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : S’accroupir, garder, sauter ou parer le projectile ; tir réel, aucune touche automatique.

### specialBack — Décrochage local

`mobility` / `movement` ; 8/10/18 ticks CQC ; groupe déclaré `walk`.

**Préparation.** Depuis la garde de PARALLAXE, préparer « Décrochage local » ; armure olive originale, optique sur le côté anatomique gauche et arme du dessin utilisateur. Préparer l’appui qui produit le déplacement ; pas d’observation tactique, positionnement autour du seul leurre actif.

**Action.** Exécuter « Décrochage local » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -6 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** rappel du dispositif ou baisse de l’optique puis retour en garde. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Repli de 60 px sans invulnérabilité : avancer et punir la récupération.

### super — Croisement de trajectoires

`trap` / `snare` ; 38/1/34 ticks CQC ; groupe déclaré `deploy`.

**Préparation.** Depuis la garde de PARALLAXE, préparer « Croisement de trajectoires » ; armure olive originale, optique sur le côté anatomique gauche et arme du dessin utilisateur. Prendre le dispositif, s’abaisser vers le support et indiquer le lieu de pose avant activation.

**Action.** Poser « Croisement de trajectoires » au point réel de main/outil, armer puis retirer le membre. Le dispositif possède ensuite son propre sprite, ses états attente/armement/déclenchement/destruction et sa collision.

**Retour.** rappel du dispositif ou baisse de l’optique puis retour en garde. Se dégager de l’objet sans le téléporter ; l’interruption avant armement a sa propre sortie.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Signal long de 38 images puis armement visible ; contourner, sauter ou détruire ce seul dispositif, jamais toute l’arène.

### utility — Optique — trace visible

`observe` / `recon` ; 22/1/28 ticks CQC ; groupe déclaré `optic`.

**Préparation.** Depuis la garde de PARALLAXE, préparer « Optique — trace visible » ; armure olive originale, optique sur le côté anatomique gauche et arme du dessin utilisateur. Orienter regard, optique ou terminal vers la cible observée, sans consulter une action future.

**Action.** Pour « Optique — trace visible », déclencher lecture/repérage avec un petit geste ou changement d’optique et un indicateur séparé. Le corps doit rester visible et vulnérable selon les données de combat.

**Retour.** rappel du dispositif ou baisse de l’optique puis retour en garde. Couper le signal ou abaisser l’outil ; retour vers l’adversaire sans nouvelle arme inventée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Sortir du rayon de 380 px, masquer la silhouette ou interrompre la préparation ; les commandes et mouvements futurs ne sont jamais lus.

## Finishers et récit

Le mode original masque et désactive actuellement les finishers ; aucune absence de quatre fiches officielles ne doit être déduite. Une extension future de Parallaxe demanderait des conclusions originales expressément marquées comme telles, un récit Station Méridien propre et des illustrations distinctes d’intro/épilogue. Elle ne doit pas insérer cet OC dans les chroniques Metal Gear officielles.

## Limites déclarées

- Un seul leurre actif, destructible et à portée courte.
- L’optique observe uniquement une position et un déplacement déjà visibles, jamais les commandes futures.
- Préparations interruptibles, autonomie finie ; aucune invulnérabilité ni attaque du rapace.
- Original character: identity fidelity compares the approved local OC portrait and scenes, not external Metal Gear canon.
- Two camera views generated independently: left-eye monocular remains on anatomical left, far-side lens partially obscured in left-facing poses; mirroring forbidden.
- All source PNGs remain byte-identical. Sheet cells are imperfectly aligned; import must use inspected alpha-component rectangles and pivots, never crop boots/hands/low sweep to the advertised grid.
- Twelve independent poses per PNG, 72 across both facings. Timing and interpolation are game adaptations; walk contact/passing is readable but not a certified motion-capture cycle.
- Minor interframe variation in armor folds, hair and equipment remains. Closest accepted design, not certified pixel-perfect 1:1.
- Slot-specific motion groups share some poses: light/heavy punch and local control/optic are adapted keyframes; no canonical gameplay claim.
- Render scale and actual collision geometry must stay independent; authored reach/guard/trap counterplay remains engine data.
- Some wide frame rectangles include a neighboring pose; their native-PNG Canvas clip contour excludes that neighboring body. Original PNG pixels/files remain untouched.
- Attack keyframes are mapped to actual engine startup/active/recovery phases; low uses a crouch startup frame then extended sweep and recovery.
- The animation map follows the actual Parallaxe runtime moves: trap/recall/barrage deploy, carbine shoot, retreat walk, observe optic. Retreat reuses walking as an explicit adaptation.

[Source du personnage original](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-original-fighters-reprise.js). La sélection conditionnelle et la désactivation des finishers sont dans le [module Versus](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).
