# Animations — ARCHIVE

**10 acteurs du registre courant.** Les titres d’actions et paramètres sont observés ; les descriptions sont des propositions CQC à produire et valider. Un groupe de frames existant ne certifie pas l’ensemble du mouvement ou sa fidélité originale.

[Index des fiches](README.md) · [Contrat commun](../04_ANIMATIONS_SPRITES.md)

## Sommaire

- [DECOY OCTOPUS](#archive__decoy) — MGS1
- [ELISA / URSULA](#archive__elisa) — PORTABLE OPS
- [SOLID SNAKE — NES](#archive__snake_nes) — METAL GEAR NES
- [SOLID SNAKE — TWIN SNAKES](#archive__snake_tts) — THE TWIN SNAKES
- [NAKED SNAKE — DELTA](#archive__naked_delta) — MGS DELTA
- [SOLID SNAKE — VR](#archive__snake_vr) — VR MISSIONS
- [RAIDEN — VR](#archive__raiden_vr) — MGS2 VR
- [SOLID SNAKE — MOBILE](#archive__snake_mobile) — MGS MOBILE
- [OLD SNAKE — TOUCH](#archive__old_snake_touch) — MGS TOUCH
- [RAIDEN — RISING PROTOTYPE](#archive__raiden_rising_proto) — MGS RISING

## archive__decoy

### DECOY OCTOPUS — MGS1

**Rôle :** Imitation et leurres, sans télékinésie. **Profil :** `decoy`.

**Base présente dans le code :** Decoy Octopus : imitation ; ses armes personnelles sont proposées pour la simulation, pas attestées comme boss original.

**Incarnation à conserver :** Original Yoji Shinkawa fullbody design of true Decoy Octopus, separate from Donald Anderson disguise.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** DECOY OCTOPUS : apparence réelle et dispositif de leurre séparés. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** mouvement du corps visible avant/après le leurre. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Imitation et leurres, sans télékinésie » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder apparence réelle et dispositif de leurre séparés.
- **jump_land :** DECOY OCTOPUS : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. mouvement du corps visible avant/après le leurre. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de DECOY OCTOPUS. Terminer par désactivation du leurre sans changer l’incarnation du corps. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS1 », présentation de Original Yoji Shinkawa fullbody design of true Decoy Octopus, separate from Donald Anderson disguise., puis apparence réelle et dispositif de leurre séparés. Geste court lié à « Pistolet dissimulé » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, désactivation du leurre sans changer l’incarnation du corps ; DECOY OCTOPUS vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS1.
- **round_loss :** Proposition CQC : DECOY OCTOPUS réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Masque tombé », revenir par désactivation du leurre sans changer l’incarnation du corps, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DECOY OCTOPUS, préparer « Jab » ; apparence réelle et dispositif de leurre séparés. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** désactivation du leurre sans changer l’incarnation du corps.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DECOY OCTOPUS, préparer « Frappe engagée » ; apparence réelle et dispositif de leurre séparés. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** désactivation du leurre sans changer l’incarnation du corps.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DECOY OCTOPUS, préparer « Balayage » ; apparence réelle et dispositif de leurre séparés. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** désactivation du leurre sans changer l’incarnation du corps.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DECOY OCTOPUS, préparer « Projection » ; apparence réelle et dispositif de leurre séparés. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** désactivation du leurre sans changer l’incarnation du corps. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Pistolet dissimulé

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DECOY OCTOPUS, préparer « Pistolet dissimulé » ; apparence réelle et dispositif de leurre séparés. Montrer la prise et la visée de l’arme décrite par « Pistolet dissimulé » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** désactivation du leurre sans changer l’incarnation du corps. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Leurre d’identité

**Existant :** `trap` / `decoy` ; 34/1/34 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DECOY OCTOPUS, préparer « Leurre d’identité » ; apparence réelle et dispositif de leurre séparés. Prendre le dispositif, s’abaisser vers le support et indiquer le lieu de pose avant activation.

**Action.** Poser « Leurre d’identité » au point réel de main/outil, armer puis retirer le membre. Le dispositif possède ensuite son propre sprite, ses états attente/armement/déclenchement/destruction et sa collision.

**Retour.** désactivation du leurre sans changer l’incarnation du corps. Se dégager de l’objet sans le téléporter ; l’interruption avant armement a sa propre sortie.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Marionnette ou drone visible et destructible ; deux maximum.

##### specialForward — Observer le masque

**Existant :** `mark` / `recon` ; 26/1/30 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DECOY OCTOPUS, préparer « Observer le masque » ; apparence réelle et dispositif de leurre séparés. Orienter regard, optique ou terminal vers la cible observée, sans consulter une action future.

**Action.** Pour « Observer le masque », déclencher lecture/repérage avec un petit geste ou changement d’optique et un indicateur séparé. Le corps doit rester visible et vulnérable selon les données de combat.

**Retour.** désactivation du leurre sans changer l’incarnation du corps. Couper le signal ou abaisser l’outil ; retour vers l’adversaire sans nouvelle arme inventée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Portée limitée ; le marquage ne vise ni à travers toute l’arène ni automatiquement.

##### specialBack — Mimétisme

**Existant :** `buff` / `stealth` ; 19/1/27 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DECOY OCTOPUS, préparer « Mimétisme » ; apparence réelle et dispositif de leurre séparés. Montrer la préparation corporelle ou mécanique de « Mimétisme ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** désactivation du leurre sans changer l’incarnation du corps. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Silhouette translucide, collision intacte ; une attaque ou un impact brise le camouflage.

##### super — Masque tombé

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DECOY OCTOPUS, préparer « Masque tombé » ; apparence réelle et dispositif de leurre séparés. Montrer la prise et la visée de l’arme décrite par « Masque tombé » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 4 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** désactivation du leurre sans changer l’incarnation du corps. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 4 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DECOY OCTOPUS, préparer « Recharger » ; apparence réelle et dispositif de leurre séparés. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** désactivation du leurre sans changer l’incarnation du corps. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Masque tombé — Final

Famille `ballistic`, ton `simulation` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Masque tombé / Pistolet dissimulé.

Plan 1 : DECOY OCTOPUS sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Masque tombé / Pistolet dissimulé ». Plan 2 : présenter l’arme effectivement associée à « Masque tombé / Pistolet dissimulé », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : désactivation du leurre sans changer l’incarnation du corps, pose de signature face à l’adversaire. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Pistolet dissimulé / Leurre d’identité

Famille `ballistic`, ton `simulation` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Masque tombé / Leurre d’identité.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Masque tombé / Leurre d’identité » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Masque tombé / Leurre d’identité », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : désactivation du leurre sans changer l’incarnation du corps, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Observer le masque — Point final

Famille `psychic`, ton `simulation` ; 256 ticks CQC ; phases actuelles : lift → orbit → crush → drop. Appuis déclarés : Masque tombé / Observer le masque.

Plan 1 : approche jusqu’à la distance réelle de « Masque tombé / Observer le masque », arme et main libre identifiées. Plan 2 : montrer la source corporelle ou matérielle de « Masque tombé / Observer le masque ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : désactivation du leurre sans changer l’incarnation du corps, prise de distance et maintien final. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Simulation prudente — Mission close

Famille `capture`, ton `simulation` ; 274 ticks CQC ; phases actuelles : stun → disarm → restrain → extract. Appuis déclarés : Masque tombé / Projection.

Plan 1 : après une observation ou un repli, DECOY OCTOPUS reprend l’initiative par « Masque tombé / Projection ». Plan 2 : contact de saisie ou neutralisation lié à « Masque tombé / Projection », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : désactivation du leurre sans changer l’incarnation du corps, rangement/pose finale différente des trois autres. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

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
- [Original official Shinkawa MGS1 illustration mirrored unscaled at CU; visible extent only.](https://www.creativeuncut.com/gallery-02/mgs-decoy-octopus.html) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## archive__elisa

### ELISA / URSULA — PORTABLE OPS

**Rôle :** Télékinésie bornée et mobilité. **Profil :** `psychic`.

**Base présente dans le code :** Elisa/Ursula : pouvoirs psychiques de Portable Ops ; pas de RAXA invoqué dans un petit duel.

**Incarnation à conserver :** Exact independent doctor persona/playable PSP portrait, not silently substituted Ursula silverhair/tanuniform

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `deploy` = special, specialDown, super.

**Techniques pointant sur une seule région native dans la direction principale :** special, specialDown, specialBack, super, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `retro-msx`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** ELISA / URSULA : regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** mouvement et éventuelle sustentation distingués de l’effet psychique. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Télékinésie bornée et mobilité » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile.
- **jump_land :** ELISA / URSULA : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. mouvement et éventuelle sustentation distingués de l’effet psychique. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de ELISA / URSULA. Terminer par cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « PORTABLE OPS », présentation de Exact independent doctor persona/playable PSP portrait, not silently substituted Ursula silverhair/tanuniform, puis regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Geste court lié à « Impulsion d’Ursula » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, cesser le geste de concentration puis revenir à la posture propre à l’incarnation ; ELISA / URSULA vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à PORTABLE OPS.
- **round_loss :** Proposition CQC : ELISA / URSULA réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Vision du Successeur », revenir par cesser le geste de concentration puis revenir à la posture propre à l’incarnation, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ELISA / URSULA, préparer « Jab » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ELISA / URSULA, préparer « Frappe engagée » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ELISA / URSULA, préparer « Balayage » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ELISA / URSULA, préparer « Projection » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Impulsion d’Ursula

**Existant :** `projectile` / `psychic` ; 27/1/30 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ELISA / URSULA, préparer « Impulsion d’Ursula » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Donner à la source de « Impulsion d’Ursula » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet psychic de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Projectile lent et visible : sauter, bloquer ou détruire avec une attaque.

##### specialDown — Trouble perceptif

**Existant :** `projectile` / `bind` ; 32/1/34 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ELISA / URSULA, préparer « Trouble perceptif » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Donner à la source de « Trouble perceptif » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet bind de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut ou garde basse ; ralentissement bref, aucune confiscation des commandes.

##### specialForward — Repli d’Elisa

**Existant :** `mobility` / `psychic` ; 23/1/28 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ELISA / URSULA, préparer « Repli d’Elisa » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Préparer l’appui qui produit le déplacement ; mouvement et éventuelle sustentation distingués de l’effet psychique.

**Action.** Exécuter « Repli d’Elisa » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Départ et arrivée indiqués ; pas de téléportation derrière la cible ni hors arène.

##### specialBack — Écran psychique

**Existant :** `parry` / `counter` ; 5/12/28 ticks ; groupe `parry`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ELISA / URSULA, préparer « Écran psychique » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Présenter la surface ou l’organe de parade et maintenir une fenêtre courte lisible.

**Action.** Recevoir puis dévier au contact réel pour « Écran psychique » ; la riposte et son effet n’apparaissent qu’après succès. Une attente sans contact garde une pose différente du contre réussi.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Séparer sortie ratée, blocage simple et riposte ; aucun effet de réussite avant collision.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Projections, attaques au corps à corps et explosifs au sol ne sont pas renvoyés.

##### super — Vision du Successeur

**Existant :** `projectile` / `psychic` ; 35/1/44 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ELISA / URSULA, préparer « Vision du Successeur » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Donner à la source de « Vision du Successeur » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet psychic de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet. La salve contient 5 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 5 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Stabiliser la réserve

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ELISA / URSULA, préparer « Stabiliser la réserve » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Stabiliser la réserve ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Vision du Successeur — Final

Famille `psychic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : lift → orbit → crush → drop. Appuis déclarés : Vision du Successeur / Impulsion d’Ursula.

Plan 1 : ELISA / URSULA sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Vision du Successeur / Impulsion d’Ursula ». Plan 2 : montrer la source corporelle ou matérielle de « Vision du Successeur / Impulsion d’Ursula ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, pose de signature face à l’adversaire.

##### Impulsion d’Ursula / Trouble perceptif

Famille `psychic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : lift → orbit → crush → drop. Appuis déclarés : Vision du Successeur / Trouble perceptif.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Vision du Successeur / Trouble perceptif » ; l’espace disponible doit être lisible. Plan 2 : montrer la source corporelle ou matérielle de « Vision du Successeur / Trouble perceptif ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, arrêt du dispositif et retour au cadre d’ensemble.

##### Repli d’Elisa — Point final

Famille `psychic`, ton `stylized` ; 256 ticks CQC ; phases actuelles : lift → orbit → crush → drop. Appuis déclarés : Vision du Successeur / Repli d’Elisa.

Plan 1 : approche jusqu’à la distance réelle de « Vision du Successeur / Repli d’Elisa », arme et main libre identifiées. Plan 2 : montrer la source corporelle ou matérielle de « Vision du Successeur / Repli d’Elisa ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, prise de distance et maintien final.

##### Riposte patiente — Mission close

Famille `psychic`, ton `stylized` ; 274 ticks CQC ; phases actuelles : lift → orbit → crush → drop. Appuis déclarés : Vision du Successeur / Projection.

Plan 1 : après une observation ou un repli, ELISA / URSULA reprend l’initiative par « Vision du Successeur / Projection ». Plan 2 : montrer la source corporelle ou matérielle de « Vision du Successeur / Projection ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Identity/reference scope/equipment and anatomical sides reviewed within the explicitly stated source limits; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Wholelowerbody coatlength/pants/boots remain unattested by tiny authentic PSP headsource; closest conservative interpretation pending complete original body capture.
- Primary Konami establishes Elisa doctor context, not every exact bodytexture or clothing detail.
- No firearm physically drawn and no inventedloadout; visualFirearmPresent:false.
- Shared archive display may reference Elisa/Ursula; this selected native costume expressly depicts Elisa primary personality only, no stealth merge of another body.
- Native CQC movement authored source-informed adaptation.
- [Actual PSP doctor portrait physically viewed establishes youthful pale Elisa, pale blond straight hair, black FOXberet with small gold badge, thin black choker and white/cream collared medical uppergarment. Source belowshoulders unseen: knee-length white doctorcoat, closedshirt, olive straight trousers and black practicalboots are explicitly provisional modest CQC reconstruction. Teenage character remains fullyclothed, nonsexual and natural anatomy. Ursula silverhair/tanuniform source inspected separately and excluded from this appearance.](https://eu-support.konami.com/hc/en-gb/articles/9822256083863-Backstory-What-is-the-story-of-Metal-Gear-Solid-Portable-Ops) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## archive__snake_nes

### SOLID SNAKE — NES — METAL GEAR NES

**Rôle :** Tir, grenades et distance. **Profil :** `soldier`.

**Base présente dans le code :** Version NES distincte du MSX ; équipement classique, aucun emprunt postérieur.

**Incarnation à conserver :** NESoriginalMetalGear rookieSnake, separatefromMSX1palette/model andSnake’sRevenge lieutenant.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** SOLID SNAKE — NES : appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas courts, crosse/équipement conservés près du torse. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Tir, grenades et distance » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder appui militaire stable, arme maintenue dans l’axe et regard vers la menace.
- **jump_land :** SOLID SNAKE — NES : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas courts, crosse/équipement conservés près du torse. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de SOLID SNAKE — NES. Terminer par retour en couverture de l’arme après le coup. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « METAL GEAR NES », présentation de NESoriginalMetalGear rookieSnake, separatefromMSX1palette/model andSnake’sRevenge lieutenant., puis appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Geste court lié à « Pistolet NES » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, retour en couverture de l’arme après le coup ; SOLID SNAKE — NES vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à METAL GEAR NES.
- **round_loss :** Proposition CQC : SOLID SNAKE — NES réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Infiltration NES », revenir par retour en couverture de l’arme après le coup, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — NES, préparer « Jab » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — NES, préparer « Frappe engagée » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — NES, préparer « Balayage » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — NES, préparer « Projection » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** retour en couverture de l’arme après le coup. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Pistolet NES

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — NES, préparer « Pistolet NES » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Pistolet NES » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Grenade NES

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — NES, préparer « Grenade NES » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Prélever l’objet correspondant à « Grenade NES », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Crosse du soldat

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — NES, préparer « Crosse du soldat » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Crosse du soldat » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Repli NES

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — NES, préparer « Repli NES » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer l’appui qui produit le déplacement ; pas courts, crosse/équipement conservés près du torse.

**Action.** Exécuter « Repli NES » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** retour en couverture de l’arme après le coup. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Infiltration NES

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — NES, préparer « Infiltration NES » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Infiltration NES » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — NES, préparer « Recharger » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** retour en couverture de l’arme après le coup. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Infiltration NES — Final

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Infiltration NES / Pistolet NES.

Plan 1 : SOLID SNAKE — NES sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Infiltration NES / Pistolet NES ». Plan 2 : présenter l’arme effectivement associée à « Infiltration NES / Pistolet NES », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : retour en couverture de l’arme après le coup, pose de signature face à l’adversaire.

##### Pistolet NES / Grenade NES

Famille `ballistic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Infiltration NES / Grenade NES.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Infiltration NES / Grenade NES » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Infiltration NES / Grenade NES », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : retour en couverture de l’arme après le coup, arrêt du dispositif et retour au cadre d’ensemble.

##### Crosse du soldat — Point final

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Infiltration NES / Crosse du soldat.

Plan 1 : approche jusqu’à la distance réelle de « Infiltration NES / Crosse du soldat », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Infiltration NES / Crosse du soldat », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : retour en couverture de l’arme après le coup, prise de distance et maintien final.

##### Sang-froid — Mission close

Famille `ballistic`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Infiltration NES / Projection.

Plan 1 : après une observation ou un repli, SOLID SNAKE — NES reprend l’initiative par « Infiltration NES / Projection ». Plan 2 : présenter l’arme effectivement associée à « Infiltration NES / Projection », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : retour en couverture de l’arme après le coup, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Tiny originalNESgame sprite confirms bodypalette/silhouette only, not detailedfabricseams or exactface. Original1987MSXmanualface is labelled sameidentitycrossedition supplement, no automaticvisualalias to MSX1orSR.
- OfficialNESmanualnamesBerettaM92F. Original1990MG2weaponmanual supplies labelled supplemental samegungeometry, not proof of a detailed renderedNESgunmodel.
- New16nativecompletekeyposes perfacing are modern presentation adaptation, not publishedNESanimationframes.
- [Official KONAMI MetalGearNES manual wholeoriginalgame screen shows greenfieldplayer. Same officialmanual mainweapons explicitlynames BerettaM92F; known original1987MSXmanualface and actual1990weaponmanual drawing are labelled cross-edition geometry supplements, not exactNESbodyturnaround.](https://metalgear.konami.net/manual/mc1/mg1_nes/pc/en/img/05_01.png) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## archive__snake_tts

### SOLID SNAKE — TWIN SNAKES — THE TWIN SNAKES

**Rôle :** Infiltration et armes limitées. **Profil :** `infiltrator`.

**Base présente dans le code :** Twin Snakes mêle l’époque MGS1 et ses règles de remake ; pas de bras bionique.

**Incarnation à conserver :** Released GameCube Solid Snake sneaking suit, native guide SOCOM suppressor inventory option

**État vérifié :** métadonnées natives avec limites. 28 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, super ; `throw` = throw, specialForward.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `retro-msx`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** SOLID SNAKE — TWIN SNAKES : garde compacte de l’infiltrateur, arme et étuis proches du corps. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** déroulé de pied discret, bassin bas, freinage avant visée. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Infiltration et armes limitées » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder garde compacte de l’infiltrateur, arme et étuis proches du corps.
- **jump_land :** SOLID SNAKE — TWIN SNAKES : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. déroulé de pied discret, bassin bas, freinage avant visée. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de SOLID SNAKE — TWIN SNAKES. Terminer par replacement rapide de la main libre et contrôle du champ. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « THE TWIN SNAKES », présentation de Released GameCube Solid Snake sneaking suit, native guide SOCOM suppressor inventory option, puis garde compacte de l’infiltrateur, arme et étuis proches du corps. Geste court lié à « M9 — Twin Snakes » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, replacement rapide de la main libre et contrôle du champ ; SOLID SNAKE — TWIN SNAKES vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à THE TWIN SNAKES.
- **round_loss :** Proposition CQC : SOLID SNAKE — TWIN SNAKES réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Twin Snakes — assaut », revenir par replacement rapide de la main libre et contrôle du champ, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — TWIN SNAKES, préparer « Jab » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** replacement rapide de la main libre et contrôle du champ.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — TWIN SNAKES, préparer « Frappe engagée » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** replacement rapide de la main libre et contrôle du champ.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — TWIN SNAKES, préparer « Balayage » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** replacement rapide de la main libre et contrôle du champ.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — TWIN SNAKES, préparer « Projection » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** replacement rapide de la main libre et contrôle du champ. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — M9 — Twin Snakes

**Existant :** `projectile` / `tranq` ; 19/1/29 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — TWIN SNAKES, préparer « M9 — Twin Snakes » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Montrer la prise et la visée de l’arme décrite par « M9 — Twin Snakes » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** replacement rapide de la main libre et contrôle du champ. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Se baisser, bloquer ; la somnolence décroît et ne provoque pas de K.O. instantané.

##### specialDown — Grenade de remake

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — TWIN SNAKES, préparer « Grenade de remake » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Prélever l’objet correspondant à « Grenade de remake », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** replacement rapide de la main libre et contrôle du champ. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Saisie du remake

**Existant :** `melee` / `grapple` ; 10/3/32 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — TWIN SNAKES, préparer « Saisie du remake » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** replacement rapide de la main libre et contrôle du champ. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Hors de portée ou saut ; ne saisir ni cible aérienne ni cible sous protection post-projection.

##### specialBack — Roulade cinématique

**Existant :** `buff` / `stealth` ; 19/1/27 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — TWIN SNAKES, préparer « Roulade cinématique » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Montrer la préparation corporelle ou mécanique de « Roulade cinématique ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** replacement rapide de la main libre et contrôle du champ. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Silhouette translucide, collision intacte ; une attaque ou un impact brise le camouflage.

##### super — Twin Snakes — assaut

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — TWIN SNAKES, préparer « Twin Snakes — assaut » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Twin Snakes — assaut », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** replacement rapide de la main libre et contrôle du champ.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — TWIN SNAKES, préparer « Recharger » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** replacement rapide de la main libre et contrôle du champ. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Twin Snakes — assaut — Final

Famille `cqc`, ton `stylized` ; 220 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Twin Snakes — assaut / M9 — Twin Snakes.

Plan 1 : SOLID SNAKE — TWIN SNAKES sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Twin Snakes — assaut / M9 — Twin Snakes ». Plan 2 : contact de saisie ou neutralisation lié à « Twin Snakes — assaut / M9 — Twin Snakes », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : replacement rapide de la main libre et contrôle du champ, pose de signature face à l’adversaire.

##### M9 — Twin Snakes / Grenade de remake

Famille `capture`, ton `stylized` ; 238 ticks CQC ; phases actuelles : stun → disarm → restrain → extract. Appuis déclarés : Twin Snakes — assaut / Grenade de remake.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Twin Snakes — assaut / Grenade de remake » ; l’espace disponible doit être lisible. Plan 2 : contact de saisie ou neutralisation lié à « Twin Snakes — assaut / Grenade de remake », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : replacement rapide de la main libre et contrôle du champ, arrêt du dispositif et retour au cadre d’ensemble.

##### Saisie du remake — Point final

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Twin Snakes — assaut / Saisie du remake.

Plan 1 : approche jusqu’à la distance réelle de « Twin Snakes — assaut / Saisie du remake », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Twin Snakes — assaut / Saisie du remake », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : replacement rapide de la main libre et contrôle du champ, prise de distance et maintien final.

##### Lecture rapprochée — Mission close

Famille `cqc`, ton `stylized` ; 274 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Twin Snakes — assaut / Projection.

Plan 1 : après une observation ou un repli, SOLID SNAKE — TWIN SNAKES reprend l’initiative par « Twin Snakes — assaut / Projection ». Plan 2 : contact de saisie ou neutralisation lié à « Twin Snakes — assaut / Projection », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : replacement rapide de la main libre et contrôle du champ, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- GameCube suit/body source physically reviewed; native upload capture hardware/emulator not independently certified.
- Selected SOCOM with suppressor is an original game inventory option documented in official guide, not a claim that selected standing frame depicts the equipped firearm.
- Fine slide/laser and face pixels are closest authored adaptation; sixteen motions per facing are authored, no 1:1 original animation certification.
- Actual source aim is physicalpose8 RIGHT andpose10 LEFT; source-specific action maps retain native raster order.
- [Final GameCube whole640x452 standing/kneeling model frames02900/09520 physically viewed. Original BradyGames official guide full native DCT pages10/12 confirm SOCOM and suppressor option; reused concept character bodies on other guide pages excluded.](https://archive.org/download/Gamecube_Longplay_Metal_Gear_Solid_The_Twin_Snakes_a/Gamecube_Longplay_004_Metal_Gear_Solid_The_Twin_Snakes_a_Part_1.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## archive__naked_delta

### NAKED SNAKE — DELTA — MGS DELTA

**Rôle :** Infiltration et armes limitées. **Profil :** `infiltrator`.

**Base présente dans le code :** Delta réinterprète Naked Snake 1964 ; pas de capacités de Venom.

**Incarnation à conserver :** Final2025 Delta early mission official olive fatigues with both eyes

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, super ; `throw` = throw, specialForward.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `retro-msx`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** NAKED SNAKE — DELTA : garde compacte de l’infiltrateur, arme et étuis proches du corps. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** déroulé de pied discret, bassin bas, freinage avant visée. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Infiltration et armes limitées » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder garde compacte de l’infiltrateur, arme et étuis proches du corps.
- **jump_land :** NAKED SNAKE — DELTA : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. déroulé de pied discret, bassin bas, freinage avant visée. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de NAKED SNAKE — DELTA. Terminer par replacement rapide de la main libre et contrôle du champ. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS DELTA », présentation de Final2025 Delta early mission official olive fatigues with both eyes, puis garde compacte de l’infiltrateur, arme et étuis proches du corps. Geste court lié à « MK22 — Delta » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, replacement rapide de la main libre et contrôle du champ ; NAKED SNAKE — DELTA vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS DELTA.
- **round_loss :** Proposition CQC : NAKED SNAKE — DELTA réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Snake Eater — héritage », revenir par replacement rapide de la main libre et contrôle du champ, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NAKED SNAKE — DELTA, préparer « Jab » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** replacement rapide de la main libre et contrôle du champ.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NAKED SNAKE — DELTA, préparer « Frappe engagée » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** replacement rapide de la main libre et contrôle du champ.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NAKED SNAKE — DELTA, préparer « Balayage » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** replacement rapide de la main libre et contrôle du champ.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NAKED SNAKE — DELTA, préparer « Projection » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** replacement rapide de la main libre et contrôle du champ. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — MK22 — Delta

**Existant :** `projectile` / `tranq` ; 19/1/29 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NAKED SNAKE — DELTA, préparer « MK22 — Delta » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Montrer la prise et la visée de l’arme décrite par « MK22 — Delta » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** replacement rapide de la main libre et contrôle du champ. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Se baisser, bloquer ; la somnolence décroît et ne provoque pas de K.O. instantané.

##### specialDown — Grenade de Delta

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NAKED SNAKE — DELTA, préparer « Grenade de Delta » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Prélever l’objet correspondant à « Grenade de Delta », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** replacement rapide de la main libre et contrôle du champ. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — CQC — Delta

**Existant :** `melee` / `grapple` ; 10/3/32 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NAKED SNAKE — DELTA, préparer « CQC — Delta » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** replacement rapide de la main libre et contrôle du champ. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Hors de portée ou saut ; ne saisir ni cible aérienne ni cible sous protection post-projection.

##### specialBack — Camouflage de Delta

**Existant :** `buff` / `stealth` ; 19/1/27 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NAKED SNAKE — DELTA, préparer « Camouflage de Delta » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Montrer la préparation corporelle ou mécanique de « Camouflage de Delta ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** replacement rapide de la main libre et contrôle du champ. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Silhouette translucide, collision intacte ; une attaque ou un impact brise le camouflage.

##### super — Snake Eater — héritage

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NAKED SNAKE — DELTA, préparer « Snake Eater — héritage » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Snake Eater — héritage », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** replacement rapide de la main libre et contrôle du champ.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NAKED SNAKE — DELTA, préparer « Recharger » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** replacement rapide de la main libre et contrôle du champ. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Snake Eater — héritage — Final

Famille `cqc`, ton `stylized` ; 220 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Snake Eater — héritage / MK22 — Delta.

Plan 1 : NAKED SNAKE — DELTA sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Snake Eater — héritage / MK22 — Delta ». Plan 2 : contact de saisie ou neutralisation lié à « Snake Eater — héritage / MK22 — Delta », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : replacement rapide de la main libre et contrôle du champ, pose de signature face à l’adversaire.

##### MK22 — Delta / Grenade de Delta

Famille `capture`, ton `stylized` ; 238 ticks CQC ; phases actuelles : stun → disarm → restrain → extract. Appuis déclarés : Snake Eater — héritage / Grenade de Delta.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Snake Eater — héritage / Grenade de Delta » ; l’espace disponible doit être lisible. Plan 2 : contact de saisie ou neutralisation lié à « Snake Eater — héritage / Grenade de Delta », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : replacement rapide de la main libre et contrôle du champ, arrêt du dispositif et retour au cadre d’ensemble.

##### CQC — Delta — Point final

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Snake Eater — héritage / CQC — Delta.

Plan 1 : approche jusqu’à la distance réelle de « Snake Eater — héritage / CQC — Delta », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Snake Eater — héritage / CQC — Delta », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : replacement rapide de la main libre et contrôle du champ, prise de distance et maintien final.

##### Lecture rapprochée — Mission close

Famille `cqc`, ton `stylized` ; 274 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Snake Eater — héritage / Projection.

Plan 1 : après une observation ou un repli, NAKED SNAKE — DELTA reprend l’initiative par « Snake Eater — héritage / Projection ». Plan 2 : contact de saisie ou neutralisation lié à « Snake Eater — héritage / Projection », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : replacement rapide de la main libre et contrôle du champ, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Right knee/shin protection and right gun trigger hand maintained across independent faces; CQC physical gestures and transitions are authored adaptations. No eyepatch added to this early mission appearance.
- [Official Konami final Delta full-body Mk22 model physically viewed, early mission appearance with both eyes; no classic Snake atlas alias](https://www.konami.com/mg/mgs3r/s/img/characters/snake.png) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## archive__snake_vr

### SOLID SNAKE — VR — VR MISSIONS

**Rôle :** Tir, grenades et distance. **Profil :** `soldier`.

**Base présente dans le code :** Programme VR de Solid Snake ; kit d’entraînement, pas une nouvelle personne.

**Incarnation à conserver :** Original1999 PS1 gray sneaking-suit VR-training Snake, independent training UID

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** SOLID SNAKE — VR : appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas courts, crosse/équipement conservés près du torse. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Tir, grenades et distance » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder appui militaire stable, arme maintenue dans l’axe et regard vers la menace.
- **jump_land :** SOLID SNAKE — VR : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas courts, crosse/équipement conservés près du torse. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de SOLID SNAKE — VR. Terminer par retour en couverture de l’arme après le coup. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « VR MISSIONS », présentation de Original1999 PS1 gray sneaking-suit VR-training Snake, independent training UID, puis appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Geste court lié à « Tir VR » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, retour en couverture de l’arme après le coup ; SOLID SNAKE — VR vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à VR MISSIONS.
- **round_loss :** Proposition CQC : SOLID SNAKE — VR réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Exercice de tir », revenir par retour en couverture de l’arme après le coup, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — VR, préparer « Jab » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — VR, préparer « Frappe engagée » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — VR, préparer « Balayage » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — VR, préparer « Projection » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** retour en couverture de l’arme après le coup. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Tir VR

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — VR, préparer « Tir VR » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Tir VR » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Grenade VR

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — VR, préparer « Grenade VR » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Prélever l’objet correspondant à « Grenade VR », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Percussion VR

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — VR, préparer « Percussion VR » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Percussion VR » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Repli de simulation

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — VR, préparer « Repli de simulation » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer l’appui qui produit le déplacement ; pas courts, crosse/équipement conservés près du torse.

**Action.** Exécuter « Repli de simulation » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** retour en couverture de l’arme après le coup. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Exercice de tir

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — VR, préparer « Exercice de tir » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Exercice de tir » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — VR, préparer « Recharger » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** retour en couverture de l’arme après le coup. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Exercice de tir — Final

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Exercice de tir / Tir VR.

Plan 1 : SOLID SNAKE — VR sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Exercice de tir / Tir VR ». Plan 2 : présenter l’arme effectivement associée à « Exercice de tir / Tir VR », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : retour en couverture de l’arme après le coup, pose de signature face à l’adversaire.

##### Tir VR / Grenade VR

Famille `ballistic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Exercice de tir / Grenade VR.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Exercice de tir / Grenade VR » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Exercice de tir / Grenade VR », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : retour en couverture de l’arme après le coup, arrêt du dispositif et retour au cadre d’ensemble.

##### Percussion VR — Point final

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Exercice de tir / Percussion VR.

Plan 1 : approche jusqu’à la distance réelle de « Exercice de tir / Percussion VR », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Exercice de tir / Percussion VR », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : retour en couverture de l’arme après le coup, prise de distance et maintien final.

##### Sang-froid — Mission close

Famille `ballistic`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Exercice de tir / Projection.

Plan 1 : après une observation ou un repli, SOLID SNAKE — VR reprend l’initiative par « Exercice de tir / Projection ». Plan 2 : présenter l’arme effectivement associée à « Exercice de tir / Projection », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : retour en couverture de l’arme après le coup, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Identity/reference scope/equipment and anatomical sides reviewed within the explicitly stated source limits; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Original MGS1 official body art complements actual VR game screenshot, not extracted PS1 sprite animation.
- Actual selected source pose11 aims one black suppressed pistol; visualFirearmPresent:true.
- V1 originals preserved as rejected for pale kneecap material and uncovered forearm areas. V2 corrects gray knees and sleeves.
- Read-only alpha inspection distinguishes stored RGB haze from transparency: V1 had zeroAlphaFraction0.722/0.688, no fully opaque255 pixels; initial visual opaque-background suspicion was not established by RGBA data. Source-vector alpha16 clipping isolates physical bodies without rewriting native pixels.
- Authored CQC motion, no absolute pixel-perfect1:1 certificate.
- All intermediate variants and rejected layouts preserved; selection uses latest physically reviewed wholebody source, native raster unchanged.
- Native knee highlights retain pale gray hues from original Shinkawa artwork; exact PS1 material luminance remains approximate, not a certified source shader.
- [Physically inspected primary VR Missions manual screenshot shows original gray/anthracite sneaking body in training context. Physically inspected primary original MGS1 fullbody body illustration supplies young brown hair, darkblue bandana/tails, slate gray segmented sneaking suit, dark gloves, utility belt and gray-black boots. Source ivory ink highlights interpreted as suit lighting, not new ivory armour. Single black suppressed SOCOM equipment is CQC source-informed classic VR loadout, not claim of one mandatory loadout for all missions.](https://metalgear.konami.net/manual/mc1/mgs1_vr_missions/pc/en/page06.html) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## archive__raiden_vr

### RAIDEN — VR — MGS2 VR

**Rôle :** Lame, déviation et furtivité. **Profil :** `ninja`.

**Base présente dans le code :** Raiden VR humain à la lame ; pas de corps MGR ni Ripper Mode.

**Incarnation à conserver :** Original human default SOL-suit VR trainee; distinct UID from PSP guest and cyborg incarnations

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `blade` = light, heavy, special, specialDown, specialForward, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** RAIDEN — VR : centre bas, main et fourreau orientés selon cette incarnation. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** appuis souples, accélération puis arrêt net avant une coupe. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Lame, déviation et furtivité » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder centre bas, main et fourreau orientés selon cette incarnation.
- **jump_land :** RAIDEN — VR : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. appuis souples, accélération puis arrêt net avant une coupe. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de RAIDEN — VR. Terminer par finir l’arc de lame puis reprendre la garde sans traverser le corps. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS2 VR », présentation de Original human default SOL-suit VR trainee; distinct UID from PSP guest and cyborg incarnations, puis centre bas, main et fourreau orientés selon cette incarnation. Geste court lié à « Lame d’exercice » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, finir l’arc de lame puis reprendre la garde sans traverser le corps ; RAIDEN — VR vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS2 VR.
- **round_loss :** Proposition CQC : RAIDEN — VR réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Épreuve de lame », revenir par finir l’arc de lame puis reprendre la garde sans traverser le corps, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Contact de lame

**Existant :** `melee` / `blade` ; 7/3/12 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN — VR, préparer « Contact de lame » ; centre bas, main et fourreau orientés selon cette incarnation. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Coupe engagée

**Existant :** `melee` / `blade` ; 18/5/24 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN — VR, préparer « Coupe engagée » ; centre bas, main et fourreau orientés selon cette incarnation. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN — VR, préparer « Balayage » ; centre bas, main et fourreau orientés selon cette incarnation. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN — VR, préparer « Projection » ; centre bas, main et fourreau orientés selon cette incarnation. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Lame d’exercice

**Existant :** `melee` / `blade` ; 13/5/24 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN — VR, préparer « Lame d’exercice » ; centre bas, main et fourreau orientés selon cette incarnation. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde puis punition ; la lame ne touche qu’une fois par attaque.

##### specialDown — Coupe ascendante VR

**Existant :** `melee` / `blade` ; 21/4/33 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN — VR, préparer « Coupe ascendante VR » ; centre bas, main et fourreau orientés selon cette incarnation. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer ou espacer ; la remontée est punissable en garde.

##### specialForward — Approche furtive VR

**Existant :** `melee` / `blade` ; 13/5/24 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN — VR, préparer « Approche furtive VR » ; centre bas, main et fourreau orientés selon cette incarnation. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde puis punition ; la lame ne touche qu’une fois par attaque.

##### specialBack — Déviation d’entraînement

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN — VR, préparer « Déviation d’entraînement » ; centre bas, main et fourreau orientés selon cette incarnation. Préparer l’appui qui produit le déplacement ; appuis souples, accélération puis arrêt net avant une coupe.

**Action.** Exécuter « Déviation d’entraînement » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Épreuve de lame

**Existant :** `melee` / `blade` ; 25/7/44 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN — VR, préparer « Épreuve de lame » ; centre bas, main et fourreau orientés selon cette incarnation. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Récupération humaine

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN — VR, préparer « Récupération humaine » ; centre bas, main et fourreau orientés selon cette incarnation. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Récupération humaine ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Épreuve de lame — Final

Famille `blade`, ton `stylized` ; 220 ticks CQC ; phases actuelles : dash → crosscut → freeze → sheath. Appuis déclarés : Épreuve de lame / Lame d’exercice.

Plan 1 : RAIDEN — VR sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Épreuve de lame / Lame d’exercice ». Plan 2 : armer la lame ou le membre de « Épreuve de lame / Lame d’exercice » et dégager son arc. Plan 3 : enchaîner des coupes lisibles avec angles distincts ; les impacts et les réactions suivent le fil de lame, sans ajout d’arme d’une autre incarnation. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : finir l’arc de lame puis reprendre la garde sans traverser le corps, pose de signature face à l’adversaire.

##### Lame d’exercice / Coupe ascendante VR

Famille `blade`, ton `stylized` ; 238 ticks CQC ; phases actuelles : dash → crosscut → freeze → sheath. Appuis déclarés : Épreuve de lame / Coupe ascendante VR.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Épreuve de lame / Coupe ascendante VR » ; l’espace disponible doit être lisible. Plan 2 : armer la lame ou le membre de « Épreuve de lame / Coupe ascendante VR » et dégager son arc. Plan 3 : enchaîner des coupes lisibles avec angles distincts ; les impacts et les réactions suivent le fil de lame, sans ajout d’arme d’une autre incarnation. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : finir l’arc de lame puis reprendre la garde sans traverser le corps, arrêt du dispositif et retour au cadre d’ensemble.

##### Approche furtive VR — Point final

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Épreuve de lame / Approche furtive VR.

Plan 1 : approche jusqu’à la distance réelle de « Épreuve de lame / Approche furtive VR », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Épreuve de lame / Approche furtive VR », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : finir l’arc de lame puis reprendre la garde sans traverser le corps, prise de distance et maintien final.

##### Lecture rapprochée — Mission close

Famille `blade`, ton `stylized` ; 274 ticks CQC ; phases actuelles : dash → crosscut → freeze → sheath. Appuis déclarés : Épreuve de lame / Projection.

Plan 1 : après une observation ou un repli, RAIDEN — VR reprend l’initiative par « Épreuve de lame / Projection ». Plan 2 : armer la lame ou le membre de « Épreuve de lame / Projection » et dégager son arc. Plan 3 : enchaîner des coupes lisibles avec angles distincts ; les impacts et les réactions suivent le fil de lame, sans ajout d’arme d’une autre incarnation. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : finir l’arc de lame puis reprendre la garde sans traverser le corps, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Identity/reference scope/equipment and anatomical sides reviewed within the explicitly stated source limits; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- The artwork is original human MGS2 design; no MGR/MGS4 cyborg body or PSP guest appearance is silently merged.
- No authentic complete Substance VR gameplay body capture was recovered in this shard; exact VR texture, mesh, costume selection and motion are not certified1:1.
- Exactly one physical straight HF blade in anatomical right hand, independent left/right draws; no ballistic firearm hence visualFirearmPresent:false.
- Native combat keyposes are authored CQC adaptation with shared actions, not original game motion capture.
- [Primary Konami2001 artwork physically inspected full head-to-soles establishes blond human face/hair, blue-gray SOL segmented sneaking suit, black gloves, tactical boots and straight HF blade. Official2002 trial page explicitly names Raiden VR Missions. This selects default original human SOL attire; artwork complements the VR game context, not a directly captured VR game mesh or original animation.](https://www.konami.com/mg/archive/mgs2/art/pic/c/c_07.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## archive__snake_mobile

### SOLID SNAKE — MOBILE — MGS MOBILE

**Rôle :** Tir, grenades et distance. **Profil :** `soldier`.

**Base présente dans le code :** Contrôles Mobile adaptés au versus ; pas de pouvoirs supplémentaires.

**Incarnation à conserver :** Original2008 young Solid Snake N-Gage mobile sneaking model; independent presentation, no alias to MGS2/PSP/OldSnake.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** SOLID SNAKE — MOBILE : appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas courts, crosse/équipement conservés près du torse. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Tir, grenades et distance » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder appui militaire stable, arme maintenue dans l’axe et regard vers la menace.
- **jump_land :** SOLID SNAKE — MOBILE : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas courts, crosse/équipement conservés près du torse. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de SOLID SNAKE — MOBILE. Terminer par retour en couverture de l’arme après le coup. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS MOBILE », présentation de Original2008 young Solid Snake N-Gage mobile sneaking model; independent presentation, no alias to MGS2/PSP/OldSnake., puis appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Geste court lié à « Tir Mobile » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, retour en couverture de l’arme après le coup ; SOLID SNAKE — MOBILE vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS MOBILE.
- **round_loss :** Proposition CQC : SOLID SNAKE — MOBILE réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Assaut portable », revenir par retour en couverture de l’arme après le coup, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — MOBILE, préparer « Jab » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — MOBILE, préparer « Frappe engagée » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — MOBILE, préparer « Balayage » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — MOBILE, préparer « Projection » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** retour en couverture de l’arme après le coup. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Tir Mobile

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — MOBILE, préparer « Tir Mobile » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Tir Mobile » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Grenade Mobile

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — MOBILE, préparer « Grenade Mobile » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Prélever l’objet correspondant à « Grenade Mobile », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Contact Mobile

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — MOBILE, préparer « Contact Mobile » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Contact Mobile » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Repli Mobile

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — MOBILE, préparer « Repli Mobile » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer l’appui qui produit le déplacement ; pas courts, crosse/équipement conservés près du torse.

**Action.** Exécuter « Repli Mobile » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** retour en couverture de l’arme après le coup. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Assaut portable

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — MOBILE, préparer « Assaut portable » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Assaut portable » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLID SNAKE — MOBILE, préparer « Recharger » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** retour en couverture de l’arme après le coup. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Assaut portable — Final

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Assaut portable / Tir Mobile.

Plan 1 : SOLID SNAKE — MOBILE sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Assaut portable / Tir Mobile ». Plan 2 : présenter l’arme effectivement associée à « Assaut portable / Tir Mobile », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : retour en couverture de l’arme après le coup, pose de signature face à l’adversaire.

##### Tir Mobile / Grenade Mobile

Famille `ballistic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Assaut portable / Grenade Mobile.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Assaut portable / Grenade Mobile » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Assaut portable / Grenade Mobile », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : retour en couverture de l’arme après le coup, arrêt du dispositif et retour au cadre d’ensemble.

##### Contact Mobile — Point final

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Assaut portable / Contact Mobile.

Plan 1 : approche jusqu’à la distance réelle de « Assaut portable / Contact Mobile », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Assaut portable / Contact Mobile », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : retour en couverture de l’arme après le coup, prise de distance et maintien final.

##### Sang-froid — Mission close

Famille `ballistic`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Assaut portable / Projection.

Plan 1 : après une observation ou un repli, SOLID SNAKE — MOBILE reprend l’initiative par « Assaut portable / Projection ». Plan 2 : présenter l’arme effectivement associée à « Assaut portable / Projection », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : retour en couverture de l’arme après le coup, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Identity/reference scope/equipment and anatomical sides reviewed within the explicitly stated source limits; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Native source is small; fine facial topology, seams, fabric microtexture and unseen pose angles are interpreted at CQC drawing scale.
- All16action keyposes per direction are authored CQC presentation, not original-game motion capture or exact canonical techniques.
- [Physically reviewed original2008 Mobile game screens, head-to-boots in HG1018 and rear33; ordinary public unscaled game-capture reproductions. High-resolution artwork/motion interpretation qualified.](https://www.hardcoregaming101.net/metal-gear-solid-mobile/) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## archive__old_snake_touch

### OLD SNAKE — TOUCH — MGS TOUCH

**Rôle :** Longue portée et exposition. **Profil :** `sniper`.

**Base présente dans le code :** Spin-off à visée tactile ; attaque immobile assumée, non biographie séparée.

**Incarnation à conserver :** Old Snake original2009 Touch; standing CQC embodiment reconstructed with qualified2008PS3 appearance complement, UID/incarnation remain Touch.

**État vérifié :** unattested-body-presentation-reconstruction. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `deploy` = specialDown, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, super, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** OLD SNAKE — TOUCH : carabine épaulée avec contact joue/crosse et œil cohérent. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** déplacement qui sécurise le long canon et stoppe avant la visée. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Longue portée et exposition » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder carabine épaulée avec contact joue/crosse et œil cohérent.
- **jump_land :** OLD SNAKE — TOUCH : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. déplacement qui sécurise le long canon et stoppe avant la visée. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de OLD SNAKE — TOUCH. Terminer par recul, éventuel réarmement propre au modèle, réacquisition de cible. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS TOUCH », présentation de Old Snake original2009 Touch; standing CQC embodiment reconstructed with qualified2008PS3 appearance complement, UID/incarnation remain Touch., puis carabine épaulée avec contact joue/crosse et œil cohérent. Geste court lié à « Visée Touch » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, recul, éventuel réarmement propre au modèle, réacquisition de cible ; OLD SNAKE — TOUCH vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS TOUCH.
- **round_loss :** Proposition CQC : OLD SNAKE — TOUCH réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Séquence Touch », revenir par recul, éventuel réarmement propre au modèle, réacquisition de cible, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLD SNAKE — TOUCH, préparer « Jab » ; carabine épaulée avec contact joue/crosse et œil cohérent. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLD SNAKE — TOUCH, préparer « Frappe engagée » ; carabine épaulée avec contact joue/crosse et œil cohérent. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLD SNAKE — TOUCH, préparer « Balayage » ; carabine épaulée avec contact joue/crosse et œil cohérent. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLD SNAKE — TOUCH, préparer « Projection » ; carabine épaulée avec contact joue/crosse et œil cohérent. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Visée Touch

**Existant :** `projectile` / `precision` ; 46/1/47 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLD SNAKE — TOUCH, préparer « Visée Touch » ; carabine épaulée avec contact joue/crosse et œil cohérent. Montrer la prise et la visée de l’arme décrite par « Visée Touch » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Laser et armement visibles ; accroupissement ou approche pendant 46 images avant le tir.

##### specialDown — Protection de poste

**Existant :** `mobility` / `movement` ; 7/18/25 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLD SNAKE — TOUCH, préparer « Protection de poste » ; carabine épaulée avec contact joue/crosse et œil cohérent. Préparer l’appui qui produit le déplacement ; déplacement qui sécurise le long canon et stoppe avant la visée.

**Action.** Exécuter « Protection de poste » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 4 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : La silhouette reste touchable ; la sortie est punissable.

##### specialForward — Repérer la cible Touch

**Existant :** `mark` / `recon` ; 26/1/30 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLD SNAKE — TOUCH, préparer « Repérer la cible Touch » ; carabine épaulée avec contact joue/crosse et œil cohérent. Orienter regard, optique ou terminal vers la cible observée, sans consulter une action future.

**Action.** Pour « Repérer la cible Touch », déclencher lecture/repérage avec un petit geste ou changement d’optique et un indicateur séparé. Le corps doit rester visible et vulnérable selon les données de combat.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible. Couper le signal ou abaisser l’outil ; retour vers l’adversaire sans nouvelle arme inventée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Portée limitée ; le marquage ne vise ni à travers toute l’arène ni automatiquement.

##### specialBack — Changer de couvert

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLD SNAKE — TOUCH, préparer « Changer de couvert » ; carabine épaulée avec contact joue/crosse et œil cohérent. Préparer l’appui qui produit le déplacement ; déplacement qui sécurise le long canon et stoppe avant la visée.

**Action.** Exécuter « Changer de couvert » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Séquence Touch

**Existant :** `projectile` / `rail` ; 55/1/50 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLD SNAKE — TOUCH, préparer « Séquence Touch » ; carabine épaulée avec contact joue/crosse et œil cohérent. Montrer la prise et la visée de l’arme décrite par « Séquence Touch » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Préparation longue et trait de visée ; accroupissement ou esquive latérale.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLD SNAKE — TOUCH, préparer « Recharger » ; carabine épaulée avec contact joue/crosse et œil cohérent. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Séquence Touch — Final

Famille `sniper`, ton `stylized` ; 220 ticks CQC ; phases actuelles : mark → steady → shot → fade. Appuis déclarés : Séquence Touch / Visée Touch.

Plan 1 : OLD SNAKE — TOUCH sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Séquence Touch / Visée Touch ». Plan 2 : présenter l’arme effectivement associée à « Séquence Touch / Visée Touch », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : recul, éventuel réarmement propre au modèle, réacquisition de cible, pose de signature face à l’adversaire.

##### Visée Touch / Protection de poste

Famille `sniper`, ton `stylized` ; 238 ticks CQC ; phases actuelles : mark → steady → shot → fade. Appuis déclarés : Séquence Touch / Protection de poste.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Séquence Touch / Protection de poste » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Séquence Touch / Protection de poste », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : recul, éventuel réarmement propre au modèle, réacquisition de cible, arrêt du dispositif et retour au cadre d’ensemble.

##### Repérer la cible Touch — Point final

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Séquence Touch / Repérer la cible Touch.

Plan 1 : approche jusqu’à la distance réelle de « Séquence Touch / Repérer la cible Touch », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Séquence Touch / Repérer la cible Touch », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : recul, éventuel réarmement propre au modèle, réacquisition de cible, prise de distance et maintien final.

##### Immobilité utile — Mission close

Famille `sniper`, ton `stylized` ; 274 ticks CQC ; phases actuelles : mark → steady → shot → fade. Appuis déclarés : Séquence Touch / Projection.

Plan 1 : après une observation ou un repli, OLD SNAKE — TOUCH reprend l’initiative par « Séquence Touch / Projection ». Plan 2 : présenter l’arme effectivement associée à « Séquence Touch / Projection », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : recul, éventuel réarmement propre au modèle, réacquisition de cible, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Identity/reference scope/equipment and anatomical sides reviewed within the explicitly stated source limits; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Native source is small; fine facial topology, seams, fabric microtexture and unseen pose angles are interpreted at CQC drawing scale.
- All16action keyposes per direction are authored CQC presentation, not original-game motion capture or exact canonical techniques.
- Touch standing/front/lowerbody is unattested; supplementary PS3 appearance is a source-informed reconstruction, not a native Touch model or an appearance alias.
- [Authored standing presentation reconstruction: nativeTouch captures establish rear head/uppercostume only; true originalMGS4PS3 fullbody used as expressly qualified appearance complement, never proof of an identical Touch fullbody model.](https://www.4gamer.net/games/080/G008090/20090319031/) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## archive__raiden_rising_proto

### RAIDEN — RISING PROTOTYPE — MGS RISING

**Rôle :** Lame, déviation et furtivité. **Profil :** `ninja`.

**Base présente dans le code :** Prototype Rising abandonné : simulation spéculative ; aucun mode final de Revengeance annoncé comme acquis.

**Incarnation à conserver :** Raiden in the cancelled Metal Gear Solid: Rising official E3 2010 full-body promotional render, separate from both the 2009 portrait and released 2013 Revengeance body.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `blade` = light, heavy, special, specialDown, specialForward, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `retro-msx`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** RAIDEN — RISING PROTOTYPE : centre bas, main et fourreau orientés selon cette incarnation. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** appuis souples, accélération puis arrêt net avant une coupe. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Lame, déviation et furtivité » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder centre bas, main et fourreau orientés selon cette incarnation.
- **jump_land :** RAIDEN — RISING PROTOTYPE : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. appuis souples, accélération puis arrêt net avant une coupe. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de RAIDEN — RISING PROTOTYPE. Terminer par finir l’arc de lame puis reprendre la garde sans traverser le corps. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS RISING », présentation de Raiden in the cancelled Metal Gear Solid: Rising official E3 2010 full-body promotional render, separate from both the 2009 portrait and released 2013 Revengeance body., puis centre bas, main et fourreau orientés selon cette incarnation. Geste court lié à « Coupe du prototype » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, finir l’arc de lame puis reprendre la garde sans traverser le corps ; RAIDEN — RISING PROTOTYPE vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS RISING.
- **round_loss :** Proposition CQC : RAIDEN — RISING PROTOTYPE réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Test de lame », revenir par finir l’arc de lame puis reprendre la garde sans traverser le corps, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Contact de lame

**Existant :** `melee` / `blade` ; 7/3/12 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN — RISING PROTOTYPE, préparer « Contact de lame » ; centre bas, main et fourreau orientés selon cette incarnation. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Coupe engagée

**Existant :** `melee` / `blade` ; 18/5/24 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN — RISING PROTOTYPE, préparer « Coupe engagée » ; centre bas, main et fourreau orientés selon cette incarnation. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN — RISING PROTOTYPE, préparer « Balayage » ; centre bas, main et fourreau orientés selon cette incarnation. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN — RISING PROTOTYPE, préparer « Projection » ; centre bas, main et fourreau orientés selon cette incarnation. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Coupe du prototype

**Existant :** `melee` / `blade` ; 13/5/24 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN — RISING PROTOTYPE, préparer « Coupe du prototype » ; centre bas, main et fourreau orientés selon cette incarnation. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde puis punition ; la lame ne touche qu’une fois par attaque.

##### specialDown — Coupe verticale prototype

**Existant :** `melee` / `blade` ; 21/4/33 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN — RISING PROTOTYPE, préparer « Coupe verticale prototype » ; centre bas, main et fourreau orientés selon cette incarnation. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer ou espacer ; la remontée est punissable en garde.

##### specialForward — Approche prototype

**Existant :** `buff` / `stealth` ; 19/1/27 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN — RISING PROTOTYPE, préparer « Approche prototype » ; centre bas, main et fourreau orientés selon cette incarnation. Montrer la préparation corporelle ou mécanique de « Approche prototype ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Silhouette translucide, collision intacte ; une attaque ou un impact brise le camouflage.

##### specialBack — Déviation prototype

**Existant :** `parry` / `counter` ; 5/12/28 ticks ; groupe `parry`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN — RISING PROTOTYPE, préparer « Déviation prototype » ; centre bas, main et fourreau orientés selon cette incarnation. Présenter la surface ou l’organe de parade et maintenir une fenêtre courte lisible.

**Action.** Recevoir puis dévier au contact réel pour « Déviation prototype » ; la riposte et son effet n’apparaissent qu’après succès. Une attente sans contact garde une pose différente du contre réussi.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Séparer sortie ratée, blocage simple et riposte ; aucun effet de réussite avant collision.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Projections, attaques au corps à corps et explosifs au sol ne sont pas renvoyés.

##### super — Test de lame

**Existant :** `melee` / `blade` ; 25/7/44 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN — RISING PROTOTYPE, préparer « Test de lame » ; centre bas, main et fourreau orientés selon cette incarnation. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Stabiliser la réserve

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN — RISING PROTOTYPE, préparer « Stabiliser la réserve » ; centre bas, main et fourreau orientés selon cette incarnation. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Stabiliser la réserve ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Test de lame — Final

Famille `blade`, ton `stylized` ; 220 ticks CQC ; phases actuelles : dash → crosscut → freeze → sheath. Appuis déclarés : Test de lame / Coupe du prototype.

Plan 1 : RAIDEN — RISING PROTOTYPE sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Test de lame / Coupe du prototype ». Plan 2 : armer la lame ou le membre de « Test de lame / Coupe du prototype » et dégager son arc. Plan 3 : enchaîner des coupes lisibles avec angles distincts ; les impacts et les réactions suivent le fil de lame, sans ajout d’arme d’une autre incarnation. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : finir l’arc de lame puis reprendre la garde sans traverser le corps, pose de signature face à l’adversaire.

##### Coupe du prototype / Coupe verticale prototype

Famille `blade`, ton `stylized` ; 238 ticks CQC ; phases actuelles : dash → crosscut → freeze → sheath. Appuis déclarés : Test de lame / Coupe verticale prototype.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Test de lame / Coupe verticale prototype » ; l’espace disponible doit être lisible. Plan 2 : armer la lame ou le membre de « Test de lame / Coupe verticale prototype » et dégager son arc. Plan 3 : enchaîner des coupes lisibles avec angles distincts ; les impacts et les réactions suivent le fil de lame, sans ajout d’arme d’une autre incarnation. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : finir l’arc de lame puis reprendre la garde sans traverser le corps, arrêt du dispositif et retour au cadre d’ensemble.

##### Approche prototype — Point final

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Test de lame / Approche prototype.

Plan 1 : approche jusqu’à la distance réelle de « Test de lame / Approche prototype », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Test de lame / Approche prototype », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : finir l’arc de lame puis reprendre la garde sans traverser le corps, prise de distance et maintien final.

##### Cycle de l’exosquelette — Mission close

Famille `blade`, ton `stylized` ; 274 ticks CQC ; phases actuelles : dash → crosscut → freeze → sheath. Appuis déclarés : Test de lame / Projection.

Plan 1 : après une observation ou un repli, RAIDEN — RISING PROTOTYPE reprend l’initiative par « Test de lame / Projection ». Plan 2 : armer la lame ou le membre de « Test de lame / Projection » et dégager son arc. Plan 3 : enchaîner des coupes lisibles avec angles distincts ; les impacts et les réactions suivent le fil de lame, sans ajout d’arme d’une autre incarnation. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : finir l’arc de lame puis reprendre la garde sans traverser le corps, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against its identified reference and only its visible extent. This is a 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Identity, costume, equipment and anatomical-side checks establish consistency with the source-backed visible facts and the explicitly qualified reconstructed parts; they do not certify unseen anatomy or clothing as canonical. Gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Physically viewed original reference establishes only visible identity/costume/accessories; it is not certified whole-body final-game 3D geometry or texture.
- Back surfaces and unseen pose angles are adapted from visible source design, without a pixel-perfect claim.
- Sixteen action poses per direction are authored gameplay adaptation; no canonical technique or motion-capture claim.
- Visible E3 2010 incarnation only. Do not blend with 2009 amber-eye face concept or the final 2013 black-armour cyborg.
- Action poses and hidden view angles remain authored 2.5D adaptation, not exact 3D geometry certification.
- E3 2009 portrait remains retained as separate historical reference; its amber/brown eye is not blended into this 2010 red-eye incarnation.
- The severed cyborg spine in source left hand is a temporary action prop; neutral keeps left hand free rather than adding a permanent spine.
- Hidden underside joints, scabbard mounting detail and blade attacks are adapted beyond this visible prototype render.
- [official pre-release E3 2010 Metal Gear Solid: Rising capture/render mirrored in contemporaneous Konami press coverage](https://www.gematsu.com/2010/06/metal-gear-solid-rising-screens-and-details) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).
