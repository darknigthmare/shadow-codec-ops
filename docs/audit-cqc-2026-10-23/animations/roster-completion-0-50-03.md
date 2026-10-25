# Animations — ROSTER COMPLETION 0.50

**10 acteurs du registre courant.** Les titres d’actions et paramètres sont observés ; les descriptions sont des propositions CQC à produire et valider. Un groupe de frames existant ne certifie pas l’ensemble du mouvement ou sa fidélité originale.

[Index des fiches](README.md) · [Contrat commun](../04_ANIMATIONS_SPRITES.md)

## Sommaire

- [JIM HOUSEMAN](#roster50__houseman_mgs1) — MGS1
- [ROSEMARY — MGS2](#roster50__rose_mgs2) — MGS2
- [EMMA EMMERICH](#roster50__emma_mgs2) — MGS2
- [PETER STILLMAN](#roster50__stillman_mgs2) — MGS2
- [RICHARD AMES](#roster50__ames_mgs2) — MGS2
- [PRESIDENT JAMES JOHNSON](#roster50__johnson_mgs2) — MGS2
- [COLONEL AI](#roster50__colonel_ai_mgs2) — MGS2
- [OTACON — MGS2](#roster50__otacon_mgs2) — MGS2
- [MAJOR ZERO](#roster50__zero_mgs3) — MGS3
- [PARA-MEDIC](#roster50__paramedic_mgs3) — MGS3

## roster50__houseman_mgs1

### JIM HOUSEMAN — MGS1

**Rôle :** Defense Command. **Profil :** `pistol`.

**Base présente dans le code :** Secrétaire à la Défense ; son apparition en duel est une simulation de commandement.

**Incarnation à conserver :** Older male Jim Houseman, MGS1 Secretary of Defense identity.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** JIM HOUSEMAN : main forte et main de soutien identifiées sur le pistolet, coudes contenus. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas prudents sans inverser l’étui ni la main forte. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Defense Command » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder main forte et main de soutien identifiées sur le pistolet, coudes contenus.
- **jump_land :** JIM HOUSEMAN : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas prudents sans inverser l’étui ni la main forte. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de JIM HOUSEMAN. Terminer par recul du poignet puis stabilisation du canon. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS1 », présentation de Older male Jim Houseman, MGS1 Secretary of Defense identity., puis main forte et main de soutien identifiées sur le pistolet, coudes contenus. Geste court lié à « Pistolet de sécurité » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, recul du poignet puis stabilisation du canon ; JIM HOUSEMAN vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS1.
- **round_loss :** Proposition CQC : JIM HOUSEMAN réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Code rouge », revenir par recul du poignet puis stabilisation du canon, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JIM HOUSEMAN, préparer « Jab » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JIM HOUSEMAN, préparer « Frappe engagée » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JIM HOUSEMAN, préparer « Balayage » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JIM HOUSEMAN, préparer « Projection » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recul du poignet puis stabilisation du canon. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Pistolet de sécurité

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JIM HOUSEMAN, préparer « Pistolet de sécurité » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Montrer la prise et la visée de l’arme décrite par « Pistolet de sécurité » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Ordre d’intervention

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JIM HOUSEMAN, préparer « Ordre d’intervention » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Prélever l’objet correspondant à « Ordre d’intervention », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Override du Pentagone

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JIM HOUSEMAN, préparer « Override du Pentagone » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Override du Pentagone » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Repli Houseman

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JIM HOUSEMAN, préparer « Repli Houseman » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer l’appui qui produit le déplacement ; pas prudents sans inverser l’étui ni la main forte.

**Action.** Exécuter « Repli Houseman » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** recul du poignet puis stabilisation du canon. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Code rouge

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JIM HOUSEMAN, préparer « Code rouge » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Montrer la prise et la visée de l’arme décrite par « Code rouge » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JIM HOUSEMAN, préparer « Recharger » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** recul du poignet puis stabilisation du canon. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Code rouge — Conclusion

Famille `ballistic`, ton `simulation` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Code rouge / Pistolet de sécurité.

Plan 1 : JIM HOUSEMAN sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Code rouge / Pistolet de sécurité ». Plan 2 : présenter l’arme effectivement associée à « Code rouge / Pistolet de sécurité », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : recul du poignet puis stabilisation du canon, pose de signature face à l’adversaire. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Pistolet de sécurité — Conclusion

Famille `ballistic`, ton `simulation` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Pistolet de sécurité / Ordre d’intervention.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Pistolet de sécurité / Ordre d’intervention » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Pistolet de sécurité / Ordre d’intervention », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : recul du poignet puis stabilisation du canon, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Override du Pentagone — Conclusion

Famille `ballistic`, ton `simulation` ; 256 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Override du Pentagone / Frappe engagée.

Plan 1 : approche jusqu’à la distance réelle de « Override du Pentagone / Frappe engagée », arme et main libre identifiées. Plan 2 : présenter l’arme effectivement associée à « Override du Pentagone / Frappe engagée », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : recul du poignet puis stabilisation du canon, prise de distance et maintien final. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Simulation encadrée — Conclusion

Famille `ballistic`, ton `simulation` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Simulation encadrée / Projection.

Plan 1 : après une observation ou un repli, JIM HOUSEMAN reprend l’initiative par « Simulation encadrée / Projection ». Plan 2 : présenter l’arme effectivement associée à « Simulation encadrée / Projection », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : recul du poignet puis stabilisation du canon, rangement/pose finale différente des trois autres. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Exact rank/medal inscriptions not legible.
- No handheld weapon shown.
- Official painted concept/character art is not proof of every final-game model or texture detail.
- Back view and unseen side are not documented by this sheet.
- Support character CQC punches/kicks/guard/KO motions and unseen action body angles are authored gameplay adaptations, not canonical combat-technique claims.
- Outfit colours are based on official painted art; exact final 3D model textures are not certified.
- Uniform insignia/pocket placement follows visible painted art; exact rank lettering and unseen sleeve details remain adapted, not certified.
- [Physically viewed native official painted character art mirrored by Creative Uncut; documented colour/outfit and visible equipment only. Full final-game 3D geometry is not established by this painting.](https://www.creativeuncut.com/gallery-02/mgs-jim-houseman.html) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## roster50__rose_mgs2

### ROSEMARY — MGS2 — MGS2

**Rôle :** Support De Mission. **Profil :** `analyst`.

**Base présente dans le code :** Spécialiste des données et soutien de Raiden ; simulation prudente utilisant analyse et défense.

**Incarnation à conserver :** Adult female Rosemary, MGS2 support/avatar presentation.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, special, specialForward, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `tuxedo`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** ROSEMARY — MGS2 : outil de lecture ou de communication montré par le profil, attitude d’observation. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Support De Mission » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder outil de lecture ou de communication montré par le profil, attitude d’observation.
- **jump_land :** ROSEMARY — MGS2 : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de ROSEMARY — MGS2. Terminer par regard vers l’outil puis retour vers l’adversaire. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS2 », présentation de Adult female Rosemary, MGS2 support/avatar presentation., puis outil de lecture ou de communication montré par le profil, attitude d’observation. Geste court lié à « Outil de proximité » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, regard vers l’outil puis retour vers l’adversaire ; ROSEMARY — MGS2 vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS2.
- **round_loss :** Proposition CQC : ROSEMARY — MGS2 réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Sauvegarde complète », revenir par regard vers l’outil puis retour vers l’adversaire, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ROSEMARY — MGS2, préparer « Jab » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ROSEMARY — MGS2, préparer « Frappe engagée » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ROSEMARY — MGS2, préparer « Balayage » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ROSEMARY — MGS2, préparer « Projection » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Outil de proximité

**Existant :** `melee` / `electric` ; 17/5/29 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ROSEMARY — MGS2, préparer « Outil de proximité » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Outil de proximité » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense. L’effet electric reste séparé du membre ; son apparition et sa disparition suivent les événements du profil.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Espacement ou garde ; choc bref avec résistance temporaire après application.

##### specialDown — Journal de mission

**Existant :** `mark` / `recon` ; 26/1/30 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ROSEMARY — MGS2, préparer « Journal de mission » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Orienter regard, optique ou terminal vers la cible observée, sans consulter une action future.

**Action.** Pour « Journal de mission », déclencher lecture/repérage avec un petit geste ou changement d’optique et un indicateur séparé. Le corps doit rester visible et vulnérable selon les données de combat.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Couper le signal ou abaisser l’outil ; retour vers l’adversaire sans nouvelle arme inventée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Portée limitée ; le marquage ne vise ni à travers toute l’arène ni automatiquement.

##### specialForward — Analyse émotionnelle

**Existant :** `mobility` / `movement` ; 7/18/25 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ROSEMARY — MGS2, préparer « Analyse émotionnelle » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer l’appui qui produit le déplacement ; déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire.

**Action.** Exécuter « Analyse émotionnelle » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 4 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : La silhouette reste touchable ; la sortie est punissable.

##### specialBack — Repli Rose

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ROSEMARY — MGS2, préparer « Repli Rose » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer l’appui qui produit le déplacement ; déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire.

**Action.** Exécuter « Repli Rose » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Sauvegarde complète

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ROSEMARY — MGS2, préparer « Sauvegarde complète » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Sauvegarde complète », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Stabiliser la réserve

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ROSEMARY — MGS2, préparer « Stabiliser la réserve » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Stabiliser la réserve ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Sauvegarde complète — Conclusion

Famille `tactical`, ton `simulation` ; 220 ticks CQC ; phases actuelles : scan → disable → secure → extract. Appuis déclarés : Sauvegarde complète / Outil de proximité.

Plan 1 : ROSEMARY — MGS2 sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Sauvegarde complète / Outil de proximité ». Plan 2 : matérialiser le geste tactique « Sauvegarde complète / Outil de proximité » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : regard vers l’outil puis retour vers l’adversaire, pose de signature face à l’adversaire. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Outil de proximité — Conclusion

Famille `tactical`, ton `simulation` ; 238 ticks CQC ; phases actuelles : scan → disable → secure → extract. Appuis déclarés : Outil de proximité / Journal de mission.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Outil de proximité / Journal de mission » ; l’espace disponible doit être lisible. Plan 2 : matérialiser le geste tactique « Outil de proximité / Journal de mission » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : regard vers l’outil puis retour vers l’adversaire, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Analyse émotionnelle — Conclusion

Famille `capture`, ton `simulation` ; 256 ticks CQC ; phases actuelles : stun → disarm → restrain → extract. Appuis déclarés : Analyse émotionnelle / Frappe engagée.

Plan 1 : approche jusqu’à la distance réelle de « Analyse émotionnelle / Frappe engagée », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Analyse émotionnelle / Frappe engagée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : regard vers l’outil puis retour vers l’adversaire, prise de distance et maintien final. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Simulation encadrée — Conclusion

Famille `tactical`, ton `simulation` ; 274 ticks CQC ; phases actuelles : scan → disable → secure → extract. Appuis déclarés : Simulation encadrée / Projection.

Plan 1 : après une observation ou un repli, ROSEMARY — MGS2 reprend l’initiative par « Simulation encadrée / Projection ». Plan 2 : matérialiser le geste tactique « Simulation encadrée / Projection » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : regard vers l’outil puis retour vers l’adversaire, rangement/pose finale différente des trois autres. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- No tablet shown.
- Art alone does not distinguish real Rose from an AI-imposed Codec identity in a specific scene.
- Official painted concept/character art is not proof of every final-game model or texture detail.
- Back view and unseen side are not documented by this sheet.
- Support character CQC punches/kicks/guard/KO motions and unseen action body angles are authored gameplay adaptations, not canonical combat-technique claims.
- Outfit colours are based on official painted art; exact final 3D model textures are not certified.
- Cream jacket seam/zippered-pocket detailing is stylised from painted art; exact final-model closures and back seams are not certified.
- [Physically viewed native official painted character art mirrored by Creative Uncut; documented colour/outfit and visible equipment only. Full final-game 3D geometry is not established by this painting.](https://www.creativeuncut.com/gallery-06/mgs2-rosemary.html) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## roster50__emma_mgs2

### EMMA EMMERICH — MGS2

**Rôle :** Ingénieure Ia. **Profil :** `analyst`.

**Base présente dans le code :** Ingénieure de GW ; ses techniques simulent virus, brouillage et évacuation non létale.

**Incarnation à conserver :** Young female Emma Emmerich, MGS2 Big Shell scientist incarnation.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, special, specialForward, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `tuxedo`, `retro-msx`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** EMMA EMMERICH : outil de lecture ou de communication montré par le profil, attitude d’observation. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Ingénieure Ia » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder outil de lecture ou de communication montré par le profil, attitude d’observation.
- **jump_land :** EMMA EMMERICH : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de EMMA EMMERICH. Terminer par regard vers l’outil puis retour vers l’adversaire. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS2 », présentation de Young female Emma Emmerich, MGS2 Big Shell scientist incarnation., puis outil de lecture ou de communication montré par le profil, attitude d’observation. Geste court lié à « Électrode de secours » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, regard vers l’outil puis retour vers l’adversaire ; EMMA EMMERICH vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS2.
- **round_loss :** Proposition CQC : EMMA EMMERICH réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Ver informatique », revenir par regard vers l’outil puis retour vers l’adversaire, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de EMMA EMMERICH, préparer « Jab » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de EMMA EMMERICH, préparer « Frappe engagée » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de EMMA EMMERICH, préparer « Balayage » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de EMMA EMMERICH, préparer « Projection » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Électrode de secours

**Existant :** `melee` / `electric` ; 17/5/29 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de EMMA EMMERICH, préparer « Électrode de secours » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Électrode de secours » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense. L’effet electric reste séparé du membre ; son apparition et sa disparition suivent les événements du profil.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Espacement ou garde ; choc bref avec résistance temporaire après application.

##### specialDown — Virus GW

**Existant :** `mark` / `recon` ; 26/1/30 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de EMMA EMMERICH, préparer « Virus GW » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Orienter regard, optique ou terminal vers la cible observée, sans consulter une action future.

**Action.** Pour « Virus GW », déclencher lecture/repérage avec un petit geste ou changement d’optique et un indicateur séparé. Le corps doit rester visible et vulnérable selon les données de combat.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Couper le signal ou abaisser l’outil ; retour vers l’adversaire sans nouvelle arme inventée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Portée limitée ; le marquage ne vise ni à travers toute l’arène ni automatiquement.

##### specialForward — Brouillage d’Arsenal

**Existant :** `mobility` / `movement` ; 7/18/25 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de EMMA EMMERICH, préparer « Brouillage d’Arsenal » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer l’appui qui produit le déplacement ; déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire.

**Action.** Exécuter « Brouillage d’Arsenal » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 4 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : La silhouette reste touchable ; la sortie est punissable.

##### specialBack — Repli Emma

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de EMMA EMMERICH, préparer « Repli Emma » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer l’appui qui produit le déplacement ; déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire.

**Action.** Exécuter « Repli Emma » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Ver informatique

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de EMMA EMMERICH, préparer « Ver informatique » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Ver informatique », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Stabiliser la réserve

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de EMMA EMMERICH, préparer « Stabiliser la réserve » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Stabiliser la réserve ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Ver informatique — Conclusion

Famille `tactical`, ton `simulation` ; 220 ticks CQC ; phases actuelles : scan → disable → secure → extract. Appuis déclarés : Ver informatique / Électrode de secours.

Plan 1 : EMMA EMMERICH sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Ver informatique / Électrode de secours ». Plan 2 : matérialiser le geste tactique « Ver informatique / Électrode de secours » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : regard vers l’outil puis retour vers l’adversaire, pose de signature face à l’adversaire. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Électrode de secours — Conclusion

Famille `tactical`, ton `simulation` ; 238 ticks CQC ; phases actuelles : scan → disable → secure → extract. Appuis déclarés : Électrode de secours / Virus GW.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Électrode de secours / Virus GW » ; l’espace disponible doit être lisible. Plan 2 : matérialiser le geste tactique « Électrode de secours / Virus GW » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : regard vers l’outil puis retour vers l’adversaire, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Brouillage d’Arsenal — Conclusion

Famille `capture`, ton `simulation` ; 256 ticks CQC ; phases actuelles : stun → disarm → restrain → extract. Appuis déclarés : Brouillage d’Arsenal / Frappe engagée.

Plan 1 : approche jusqu’à la distance réelle de « Brouillage d’Arsenal / Frappe engagée », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Brouillage d’Arsenal / Frappe engagée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : regard vers l’outil puis retour vers l’adversaire, prise de distance et maintien final. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Simulation encadrée — Conclusion

Famille `tactical`, ton `simulation` ; 274 ticks CQC ; phases actuelles : scan → disable → secure → extract. Appuis déclarés : Simulation encadrée / Projection.

Plan 1 : après une observation ou un repli, EMMA EMMERICH reprend l’initiative par « Simulation encadrée / Projection ». Plan 2 : matérialiser le geste tactique « Simulation encadrée / Projection » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : regard vers l’outil puis retour vers l’adversaire, rangement/pose finale différente des trois autres. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- No tablet or combat weapon shown.
- Body action sheet derives from a sitting illustration, not final-game movement proof.
- Official painted concept/character art is not proof of every final-game model or texture detail.
- Back view and unseen side are not documented by this sheet.
- Support character CQC punches/kicks/guard/KO motions and unseen action body angles are authored gameplay adaptations, not canonical combat-technique claims.
- Outfit colours are based on official painted art; exact final 3D model textures are not certified.
- [Physically viewed native official painted character art mirrored by Creative Uncut; documented colour/outfit and visible equipment only. Full final-game 3D geometry is not established by this painting.](https://www.creativeuncut.com/gallery-06/mgs2-emma-emmerich.html) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## roster50__stillman_mgs2

### PETER STILLMAN — MGS2

**Rôle :** Déminage. **Profil :** `soldier`.

**Base présente dans le code :** Expert en explosifs ; la simulation privilégie désamorçage, détecteur et C4 limité.

**Incarnation à conserver :** Peter Stillman, final MGS2 Plant bomb-disposal instructor, hooded police coat and equipment case.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `deploy` = specialDown, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, super, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** PETER STILLMAN : appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas courts, crosse/équipement conservés près du torse. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Déminage » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder appui militaire stable, arme maintenue dans l’axe et regard vers la menace.
- **jump_land :** PETER STILLMAN : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas courts, crosse/équipement conservés près du torse. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de PETER STILLMAN. Terminer par retour en couverture de l’arme après le coup. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS2 », présentation de Peter Stillman, final MGS2 Plant bomb-disposal instructor, hooded police coat and equipment case., puis appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Geste court lié à « Pistolet de sécurité » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, retour en couverture de l’arme après le coup ; PETER STILLMAN vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS2.
- **round_loss :** Proposition CQC : PETER STILLMAN réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Désamorçage total », revenir par retour en couverture de l’arme après le coup, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PETER STILLMAN, préparer « Jab » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PETER STILLMAN, préparer « Frappe engagée » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PETER STILLMAN, préparer « Balayage » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PETER STILLMAN, préparer « Projection » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** retour en couverture de l’arme après le coup. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Pistolet de sécurité

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PETER STILLMAN, préparer « Pistolet de sécurité » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Pistolet de sécurité » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Charge de démonstration

**Existant :** `trap` / `explosive` ; 30/1/36 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PETER STILLMAN, préparer « Charge de démonstration » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Prendre le dispositif, s’abaisser vers le support et indiquer le lieu de pose avant activation.

**Action.** Poser « Charge de démonstration » au point réel de main/outil, armer puis retirer le membre. Le dispositif possède ensuite son propre sprite, ses états attente/armement/déclenchement/destruction et sa collision.

**Retour.** retour en couverture de l’arme après le coup. Se dégager de l’objet sans le téléporter ; l’interruption avant armement a sa propre sortie.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pose et amorçage visibles ; sauter ou détruire la mine par une attaque. Deux maximum.

##### specialForward — Détecteur de bombe

**Existant :** `detonate` / `explosive` ; 12/1/28 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PETER STILLMAN, préparer « Détecteur de bombe » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la commande ou le geste de déclenchement, avec le dispositif déjà présent.

**Action.** Déclencher uniquement les objets admissibles ; la réaction du corps accompagne la commande, tandis que chaque explosion garde son centre et son sprite propres.

**Retour.** retour en couverture de l’arme après le coup. Baisser la commande et retrouver la garde ; ne pas créer une nouvelle mine par le geste seul.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Détruire ou éviter les charges posées avant la commande.

##### specialBack — Repli Stillman

**Existant :** `mobility` / `movement` ; 7/18/25 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PETER STILLMAN, préparer « Repli Stillman » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer l’appui qui produit le déplacement ; pas courts, crosse/équipement conservés près du torse.

**Action.** Exécuter « Repli Stillman » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 8 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** retour en couverture de l’arme après le coup. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : La silhouette reste touchable ; la sortie est punissable.

##### super — Désamorçage total

**Existant :** `projectile` / `explosive` ; 35/1/44 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PETER STILLMAN, préparer « Désamorçage total » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Prélever l’objet correspondant à « Désamorçage total », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. La salve contient 3 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ. L’objet conserve sa mèche de 48 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 3 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PETER STILLMAN, préparer « Recharger » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** retour en couverture de l’arme après le coup. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Désamorçage total — Conclusion

Famille `ballistic`, ton `simulation` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Désamorçage total / Pistolet de sécurité.

Plan 1 : PETER STILLMAN sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Désamorçage total / Pistolet de sécurité ». Plan 2 : présenter l’arme effectivement associée à « Désamorçage total / Pistolet de sécurité », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : retour en couverture de l’arme après le coup, pose de signature face à l’adversaire. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Pistolet de sécurité — Conclusion

Famille `ballistic`, ton `simulation` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Pistolet de sécurité / Charge de démonstration.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Pistolet de sécurité / Charge de démonstration » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Pistolet de sécurité / Charge de démonstration », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : retour en couverture de l’arme après le coup, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Détecteur de bombe — Conclusion

Famille `ballistic`, ton `simulation` ; 256 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Détecteur de bombe / Frappe engagée.

Plan 1 : approche jusqu’à la distance réelle de « Détecteur de bombe / Frappe engagée », arme et main libre identifiées. Plan 2 : présenter l’arme effectivement associée à « Détecteur de bombe / Frappe engagée », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : retour en couverture de l’arme après le coup, prise de distance et maintien final. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Simulation encadrée — Conclusion

Famille `ballistic`, ton `simulation` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Simulation encadrée / Projection.

Plan 1 : après une observation ou un repli, PETER STILLMAN reprend l’initiative par « Simulation encadrée / Projection ». Plan 2 : présenter l’arme effectivement associée à « Simulation encadrée / Projection », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : retour en couverture de l’arme après le coup, rangement/pose finale différente des trois autres. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Monochrome concept supports coat silhouette, cargo trousers, boots and carried case in anatomical left hand; exact lower-body colours and unseen rear seams remain restrained interpretation.
- Final tiny portrait supports bald older Black face, moustache and dark teal upper outfit; it is not a full-resolution turnaround.
- Unarmed defensive keyposes are authored gameplay adaptation. The canonical carried case is preserved; no firearm is drawn or certified.
- [Official Shinkawa monochrome full-body concept mirrored by MGS.be plus unmodified final native 130×91 game portrait for face and upper-coat colour; both physically viewed.](https://www.metalgearsolid.be/images/stillman_j.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## roster50__ames_mgs2

### RICHARD AMES — MGS2

**Rôle :** Secret Service. **Profil :** `pistol`.

**Base présente dans le code :** Agent du Secret Service ; pistolet dissimulé, contact et couverture rapprochée.

**Incarnation à conserver :** Richard Ames, original MGS2 Plant hostage, grey tied-back hair and dark business suit.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** RICHARD AMES : main forte et main de soutien identifiées sur le pistolet, coudes contenus. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas prudents sans inverser l’étui ni la main forte. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Secret Service » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder main forte et main de soutien identifiées sur le pistolet, coudes contenus.
- **jump_land :** RICHARD AMES : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas prudents sans inverser l’étui ni la main forte. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de RICHARD AMES. Terminer par recul du poignet puis stabilisation du canon. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS2 », présentation de Richard Ames, original MGS2 Plant hostage, grey tied-back hair and dark business suit., puis main forte et main de soutien identifiées sur le pistolet, coudes contenus. Geste court lié à « Pistolet dissimulé » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, recul du poignet puis stabilisation du canon ; RICHARD AMES vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS2.
- **round_loss :** Proposition CQC : RICHARD AMES réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Extraction Secret Service », revenir par recul du poignet puis stabilisation du canon, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RICHARD AMES, préparer « Jab » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RICHARD AMES, préparer « Frappe engagée » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RICHARD AMES, préparer « Balayage » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RICHARD AMES, préparer « Projection » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recul du poignet puis stabilisation du canon. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Pistolet dissimulé

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RICHARD AMES, préparer « Pistolet dissimulé » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Montrer la prise et la visée de l’arme décrite par « Pistolet dissimulé » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Flash de contact

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RICHARD AMES, préparer « Flash de contact » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Prélever l’objet correspondant à « Flash de contact », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Signal d’Ames

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RICHARD AMES, préparer « Signal d’Ames » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Signal d’Ames » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Repli discret

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RICHARD AMES, préparer « Repli discret » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer l’appui qui produit le déplacement ; pas prudents sans inverser l’étui ni la main forte.

**Action.** Exécuter « Repli discret » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** recul du poignet puis stabilisation du canon. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Extraction Secret Service

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RICHARD AMES, préparer « Extraction Secret Service » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Montrer la prise et la visée de l’arme décrite par « Extraction Secret Service » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RICHARD AMES, préparer « Recharger » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** recul du poignet puis stabilisation du canon. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Extraction Secret Service — Conclusion

Famille `ballistic`, ton `simulation` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Extraction Secret Service / Pistolet dissimulé.

Plan 1 : RICHARD AMES sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Extraction Secret Service / Pistolet dissimulé ». Plan 2 : présenter l’arme effectivement associée à « Extraction Secret Service / Pistolet dissimulé », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : recul du poignet puis stabilisation du canon, pose de signature face à l’adversaire. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Pistolet dissimulé — Conclusion

Famille `ballistic`, ton `simulation` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Pistolet dissimulé / Flash de contact.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Pistolet dissimulé / Flash de contact » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Pistolet dissimulé / Flash de contact », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : recul du poignet puis stabilisation du canon, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Signal d’Ames — Conclusion

Famille `ballistic`, ton `simulation` ; 256 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Signal d’Ames / Frappe engagée.

Plan 1 : approche jusqu’à la distance réelle de « Signal d’Ames / Frappe engagée », arme et main libre identifiées. Plan 2 : présenter l’arme effectivement associée à « Signal d’Ames / Frappe engagée », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : recul du poignet puis stabilisation du canon, prise de distance et maintien final. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Simulation encadrée — Conclusion

Famille `ballistic`, ton `simulation` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Simulation encadrée / Projection.

Plan 1 : après une observation ou un repli, RICHARD AMES reprend l’initiative par « Simulation encadrée / Projection ». Plan 2 : présenter l’arme effectivement associée à « Simulation encadrée / Projection », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : recul du poignet puis stabilisation du canon, rangement/pose finale différente des trois autres. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Original references document face, grey hair tied low, dark suit upper body, light shirt and reddish tie; plain matching trousers/black dress shoes remain restrained inferred adaptation because feet are not shown.
- Unarmed defensive keyposes are authored gameplay animation; no undocumented weapon, glasses, gloves or radio has been added.
- First left-v1 generation faced right and is preserved as rejected; final left-v2 was independently drawn facing left without pixel mirroring.
- [Official monochrome Shinkawa partial-body/front-and-rear head concept mirrored by MGS.be plus final native130x91 in-game portrait, both physically viewed.](https://www.metalgearsolid.be/images/ames_j.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## roster50__johnson_mgs2

### PRESIDENT JAMES JOHNSON — MGS2

**Rôle :** Président. **Profil :** `civilian`.

**Base présente dans le code :** Président pris en otage ; sa participation est une simulation de sécurité et d’évacuation.

**Incarnation à conserver :** James Johnson, final MGS2 Plant hostage President, white collared shirt and red tie.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, special, specialForward, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** PRESIDENT JAMES JOHNSON : posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas hésitants mais lisibles, en conservant l’âge et la stature. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Président » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut.
- **jump_land :** PRESIDENT JAMES JOHNSON : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas hésitants mais lisibles, en conservant l’âge et la stature. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de PRESIDENT JAMES JOHNSON. Terminer par réaction humaine puis reprise d’appui ; combat explicitement simulé. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS2 », présentation de James Johnson, final MGS2 Plant hostage President, white collared shirt and red tie., puis posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Geste court lié à « Repousser la menace » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, réaction humaine puis reprise d’appui ; combat explicitement simulé ; PRESIDENT JAMES JOHNSON vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS2.
- **round_loss :** Proposition CQC : PRESIDENT JAMES JOHNSON réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Évacuation du président », revenir par réaction humaine puis reprise d’appui ; combat explicitement simulé, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PRESIDENT JAMES JOHNSON, préparer « Jab » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PRESIDENT JAMES JOHNSON, préparer « Frappe engagée » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PRESIDENT JAMES JOHNSON, préparer « Balayage » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PRESIDENT JAMES JOHNSON, préparer « Projection » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Repousser la menace

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PRESIDENT JAMES JOHNSON, préparer « Repousser la menace » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Repousser la menace » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialDown — Code présidentiel

**Existant :** `mark` / `recon` ; 26/1/30 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PRESIDENT JAMES JOHNSON, préparer « Code présidentiel » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Orienter regard, optique ou terminal vers la cible observée, sans consulter une action future.

**Action.** Pour « Code présidentiel », déclencher lecture/repérage avec un petit geste ou changement d’optique et un indicateur séparé. Le corps doit rester visible et vulnérable selon les données de combat.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé. Couper le signal ou abaisser l’outil ; retour vers l’adversaire sans nouvelle arme inventée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Portée limitée ; le marquage ne vise ni à travers toute l’arène ni automatiquement.

##### specialForward — Appel Secret Service

**Existant :** `mobility` / `movement` ; 7/18/25 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PRESIDENT JAMES JOHNSON, préparer « Appel Secret Service » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Préparer l’appui qui produit le déplacement ; pas hésitants mais lisibles, en conservant l’âge et la stature.

**Action.** Exécuter « Appel Secret Service » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 4 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : La silhouette reste touchable ; la sortie est punissable.

##### specialBack — Repli Johnson

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PRESIDENT JAMES JOHNSON, préparer « Repli Johnson » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Préparer l’appui qui produit le déplacement ; pas hésitants mais lisibles, en conservant l’âge et la stature.

**Action.** Exécuter « Repli Johnson » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Évacuation du président

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PRESIDENT JAMES JOHNSON, préparer « Évacuation du président » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Évacuation du président », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Reprendre son souffle

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PRESIDENT JAMES JOHNSON, préparer « Reprendre son souffle » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Reprendre son souffle ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Évacuation du président — Conclusion

Famille `tactical`, ton `simulation` ; 220 ticks CQC ; phases actuelles : scan → disable → secure → extract. Appuis déclarés : Évacuation du président / Repousser la menace.

Plan 1 : PRESIDENT JAMES JOHNSON sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Évacuation du président / Repousser la menace ». Plan 2 : matérialiser le geste tactique « Évacuation du président / Repousser la menace » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : réaction humaine puis reprise d’appui ; combat explicitement simulé, pose de signature face à l’adversaire. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Repousser la menace — Conclusion

Famille `tactical`, ton `simulation` ; 238 ticks CQC ; phases actuelles : scan → disable → secure → extract. Appuis déclarés : Repousser la menace / Code présidentiel.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Repousser la menace / Code présidentiel » ; l’espace disponible doit être lisible. Plan 2 : matérialiser le geste tactique « Repousser la menace / Code présidentiel » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : réaction humaine puis reprise d’appui ; combat explicitement simulé, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Appel Secret Service — Conclusion

Famille `capture`, ton `simulation` ; 256 ticks CQC ; phases actuelles : stun → disarm → restrain → extract. Appuis déclarés : Appel Secret Service / Frappe engagée.

Plan 1 : approche jusqu’à la distance réelle de « Appel Secret Service / Frappe engagée », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Appel Secret Service / Frappe engagée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : réaction humaine puis reprise d’appui ; combat explicitement simulé, prise de distance et maintien final. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Simulation encadrée — Conclusion

Famille `tactical`, ton `simulation` ; 274 ticks CQC ; phases actuelles : scan → disable → secure → extract. Appuis déclarés : Simulation encadrée / Projection.

Plan 1 : après une observation ou un repli, PRESIDENT JAMES JOHNSON reprend l’initiative par « Simulation encadrée / Projection ». Plan 2 : matérialiser le geste tactique « Simulation encadrée / Projection » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : réaction humaine puis reprise d’appui ; combat explicitement simulé, rangement/pose finale différente des trois autres. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Final colour reference documents older grey-haired face and upper white shirt/red tie only. Plain dark business trousers, black dress shoes and wrist-length cuffed sleeves are restrained consistent lower/body adaptation, not certified from the final tiny portrait.
- Unarmed defensive keyposes are authored gameplay animation; no handgun, holster, gloves, jacket or secret-service equipment added.
- Left-v1 mixed rolled sleeves; preserved as unselected. Left-v3 preserves corrected cuffed sleeves and separate poses.
- Left-v2 source had15components because knee/hitrecoil silhouettes touched; preserved rejected. Left-v3 re-generated whole layout with sixteen disjoint complete figures.
- [Original final native130x91 game portrait for face/white shirt/red tie plus official Shinkawa head studies and tiny rear silhouette, physically viewed; no modern generated portrait used as evidence.](https://www.metalgearsolid.be/images/james_001.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## roster50__colonel_ai_mgs2

### COLONEL AI — MGS2

**Rôle :** Interface Gw. **Profil :** `psychic`.

**Base présente dans le code :** Interface numérique de GW ; le Versus la représente par projections, brouillage et erreurs visuelles.

**Incarnation à conserver :** Male-presenting Campbell avatar used for Colonel support in MGS2; not physical GW hardware.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `deploy` = special, specialDown, super.

**Techniques pointant sur une seule région native dans la direction principale :** special, specialDown, specialBack, super, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** COLONEL AI : regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Variation de signal et léger mouvement de l’avatar/module de simulation ; ne pas présenter cette enveloppe comme un corps officiel. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** mouvement et éventuelle sustentation distingués de l’effet psychique. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Interface Gw » : état de protection visuel de simulation, clairement distinct d’une défense corporelle officielle ; recul bloqué distinct de la simple position basse. Garder regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile.
- **jump_land :** COLONEL AI : déplacement de l’avatar dans la simulation, explicitement adapté ; ne pas attribuer un saut physique à une intelligence sans corps attesté. mouvement et éventuelle sustentation distingués de l’effet psychique. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Réactions de signal/affichage de l’avatar de COLONEL AI, interruption puis retour ; l’existence de ce corps de simulation reste explicitement non canonique. Terminer par cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS2 », présentation de Male-presenting Campbell avatar used for Colonel support in MGS2; not physical GW hardware., puis regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Geste court lié à « Erreur de codec » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, cesser le geste de concentration puis revenir à la posture propre à l’incarnation ; COLONEL AI vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS2.
- **round_loss :** Proposition CQC : L’avatar de COLONEL AI signale la défaite puis retrouve son état de simulation ; pas de respiration, de perte de conscience ou de réparation physique inventée. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Fission Mailed », revenir par cesser le geste de concentration puis revenir à la posture propre à l’incarnation, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de COLONEL AI, préparer « Jab » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de COLONEL AI, préparer « Frappe engagée » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de COLONEL AI, préparer « Balayage » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de COLONEL AI, préparer « Projection » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Erreur de codec

**Existant :** `projectile` / `psychic` ; 27/1/30 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de COLONEL AI, préparer « Erreur de codec » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Donner à la source de « Erreur de codec » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet psychic de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Projectile lent et visible : sauter, bloquer ou détruire avec une attaque.

##### specialDown — Ordre contradictoire

**Existant :** `projectile` / `bind` ; 32/1/34 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de COLONEL AI, préparer « Ordre contradictoire » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Donner à la source de « Ordre contradictoire » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet bind de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut ou garde basse ; ralentissement bref, aucune confiscation des commandes.

##### specialForward — Brouillage GW

**Existant :** `mobility` / `psychic` ; 23/1/28 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de COLONEL AI, préparer « Brouillage GW » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Préparer l’appui qui produit le déplacement ; mouvement et éventuelle sustentation distingués de l’effet psychique.

**Action.** Exécuter « Brouillage GW » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Départ et arrivée indiqués ; pas de téléportation derrière la cible ni hors arène.

##### specialBack — Décalage de l’avatar

**Existant :** `parry` / `counter` ; 5/12/28 ticks ; groupe `parry`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de COLONEL AI, préparer « Décalage de l’avatar » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Présenter la surface ou l’organe de parade et maintenir une fenêtre courte lisible.

**Action.** Recevoir puis dévier au contact réel pour « Décalage de l’avatar » ; la riposte et son effet n’apparaissent qu’après succès. Une attente sans contact garde une pose différente du contre réussi.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Séparer sortie ratée, blocage simple et riposte ; aucun effet de réussite avant collision.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Projections, attaques au corps à corps et explosifs au sol ne sont pas renvoyés.

##### super — Fission Mailed

**Existant :** `projectile` / `psychic` ; 35/1/44 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de COLONEL AI, préparer « Fission Mailed » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Donner à la source de « Fission Mailed » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet psychic de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet. La salve contient 5 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 5 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Stabiliser la réserve

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de COLONEL AI, préparer « Stabiliser la réserve » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Stabiliser la réserve ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Fission Mailed — Conclusion

Famille `psychic`, ton `simulation` ; 220 ticks CQC ; phases actuelles : focus → distort → impact → release. Appuis déclarés : Fission Mailed / Erreur de codec.

Plan 1 : COLONEL AI sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Fission Mailed / Erreur de codec ». Plan 2 : montrer la source corporelle ou matérielle de « Fission Mailed / Erreur de codec ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, pose de signature face à l’adversaire. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Erreur de codec — Conclusion

Famille `psychic`, ton `simulation` ; 238 ticks CQC ; phases actuelles : focus → distort → impact → release. Appuis déclarés : Erreur de codec / Ordre contradictoire.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Erreur de codec / Ordre contradictoire » ; l’espace disponible doit être lisible. Plan 2 : montrer la source corporelle ou matérielle de « Erreur de codec / Ordre contradictoire ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Brouillage GW — Conclusion

Famille `psychic`, ton `simulation` ; 256 ticks CQC ; phases actuelles : focus → distort → impact → release. Appuis déclarés : Brouillage GW / Frappe engagée.

Plan 1 : approche jusqu’à la distance réelle de « Brouillage GW / Frappe engagée », arme et main libre identifiées. Plan 2 : montrer la source corporelle ou matérielle de « Brouillage GW / Frappe engagée ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, prise de distance et maintien final. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Simulation encadrée — Conclusion

Famille `psychic`, ton `simulation` ; 274 ticks CQC ; phases actuelles : focus → distort → impact → release. Appuis déclarés : Simulation encadrée / Projection.

Plan 1 : après une observation ou un repli, COLONEL AI reprend l’initiative par « Simulation encadrée / Projection ». Plan 2 : montrer la source corporelle ou matérielle de « Simulation encadrée / Projection ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, rangement/pose finale différente des trois autres. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Official Campbell concept supplies avatar appearance; no separate physical AI body is attested.
- No firearm shown.
- Official painted concept/character art is not proof of every final-game model or texture detail.
- Back view and unseen side are not documented by this sheet.
- Support character CQC punches/kicks/guard/KO motions and unseen action body angles are authored gameplay adaptations, not canonical combat-technique claims.
- Outfit colours are based on official painted art; exact final 3D model textures are not certified.
- Beret symbol, ribbons and sleeve patches are painterly adaptations of the source, not certified readable military heraldry.
- Native right-v1 and left-v1 retained as rejected originals because their beret touched the source edge.
- [Physically viewed native official painted character art mirrored by Creative Uncut; documented colour/outfit and visible equipment only. Full final-game 3D geometry is not established by this painting.](https://www.creativeuncut.com/gallery-06/mgs2-roy-campbell.html) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## roster50__otacon_mgs2

### OTACON — MGS2 — MGS2

**Rôle :** Philanthropy / Ingénieur. **Profil :** `analyst`.

**Base présente dans le code :** Otacon de Philanthropy ; caméra, liaison et soutien technique, sans combat canonique attribué.

**Incarnation à conserver :** Adult male Hal Emmerich, MGS2 Philanthropy incarnation.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, special, specialForward, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `tuxedo`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** OTACON — MGS2 : outil de lecture ou de communication montré par le profil, attitude d’observation. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Philanthropy / Ingénieur » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder outil de lecture ou de communication montré par le profil, attitude d’observation.
- **jump_land :** OTACON — MGS2 : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de OTACON — MGS2. Terminer par regard vers l’outil puis retour vers l’adversaire. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS2 », présentation de Adult male Hal Emmerich, MGS2 Philanthropy incarnation., puis outil de lecture ou de communication montré par le profil, attitude d’observation. Geste court lié à « Électrode de liaison » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, regard vers l’outil puis retour vers l’adversaire ; OTACON — MGS2 vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS2.
- **round_loss :** Proposition CQC : OTACON — MGS2 réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Transmission de preuves », revenir par regard vers l’outil puis retour vers l’adversaire, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OTACON — MGS2, préparer « Jab » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OTACON — MGS2, préparer « Frappe engagée » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OTACON — MGS2, préparer « Balayage » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OTACON — MGS2, préparer « Projection » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Électrode de liaison

**Existant :** `melee` / `electric` ; 17/5/29 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OTACON — MGS2, préparer « Électrode de liaison » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Électrode de liaison » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense. L’effet electric reste séparé du membre ; son apparition et sa disparition suivent les événements du profil.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Espacement ou garde ; choc bref avec résistance temporaire après application.

##### specialDown — Caméra de Philanthropy

**Existant :** `mark` / `recon` ; 26/1/30 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OTACON — MGS2, préparer « Caméra de Philanthropy » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Orienter regard, optique ou terminal vers la cible observée, sans consulter une action future.

**Action.** Pour « Caméra de Philanthropy », déclencher lecture/repérage avec un petit geste ou changement d’optique et un indicateur séparé. Le corps doit rester visible et vulnérable selon les données de combat.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Couper le signal ou abaisser l’outil ; retour vers l’adversaire sans nouvelle arme inventée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Portée limitée ; le marquage ne vise ni à travers toute l’arène ni automatiquement.

##### specialForward — Analyse RAY

**Existant :** `mobility` / `movement` ; 7/18/25 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OTACON — MGS2, préparer « Analyse RAY » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer l’appui qui produit le déplacement ; déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire.

**Action.** Exécuter « Analyse RAY » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 4 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : La silhouette reste touchable ; la sortie est punissable.

##### specialBack — Repli Otacon

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OTACON — MGS2, préparer « Repli Otacon » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer l’appui qui produit le déplacement ; déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire.

**Action.** Exécuter « Repli Otacon » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Transmission de preuves

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OTACON — MGS2, préparer « Transmission de preuves » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Transmission de preuves », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Stabiliser la réserve

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OTACON — MGS2, préparer « Stabiliser la réserve » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Stabiliser la réserve ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Transmission de preuves — Conclusion

Famille `tactical`, ton `simulation` ; 220 ticks CQC ; phases actuelles : scan → disable → secure → extract. Appuis déclarés : Transmission de preuves / Électrode de liaison.

Plan 1 : OTACON — MGS2 sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Transmission de preuves / Électrode de liaison ». Plan 2 : matérialiser le geste tactique « Transmission de preuves / Électrode de liaison » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : regard vers l’outil puis retour vers l’adversaire, pose de signature face à l’adversaire. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Électrode de liaison — Conclusion

Famille `tactical`, ton `simulation` ; 238 ticks CQC ; phases actuelles : scan → disable → secure → extract. Appuis déclarés : Électrode de liaison / Caméra de Philanthropy.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Électrode de liaison / Caméra de Philanthropy » ; l’espace disponible doit être lisible. Plan 2 : matérialiser le geste tactique « Électrode de liaison / Caméra de Philanthropy » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : regard vers l’outil puis retour vers l’adversaire, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Analyse RAY — Conclusion

Famille `capture`, ton `simulation` ; 256 ticks CQC ; phases actuelles : stun → disarm → restrain → extract. Appuis déclarés : Analyse RAY / Frappe engagée.

Plan 1 : approche jusqu’à la distance réelle de « Analyse RAY / Frappe engagée », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Analyse RAY / Frappe engagée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : regard vers l’outil puis retour vers l’adversaire, prise de distance et maintien final. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Simulation encadrée — Conclusion

Famille `tactical`, ton `simulation` ; 274 ticks CQC ; phases actuelles : scan → disable → secure → extract. Appuis déclarés : Simulation encadrée / Projection.

Plan 1 : après une observation ou un repli, OTACON — MGS2 reprend l’initiative par « Simulation encadrée / Projection ». Plan 2 : matérialiser le geste tactique « Simulation encadrée / Projection » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : regard vers l’outil puis retour vers l’adversaire, rangement/pose finale différente des trois autres. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Exact materials/stripe texture are painterly, not final 3D texture proof.
- No gun or hacking tablet shown.
- Official painted concept/character art is not proof of every final-game model or texture detail.
- Back view and unseen side are not documented by this sheet.
- Support character CQC punches/kicks/guard/KO motions and unseen action body angles are authored gameplay adaptations, not canonical combat-technique claims.
- Outfit colours are based on official painted art; exact final 3D model textures are not certified.
- The hanging case remains a canonical non-weapon accessory; its movement during invented support CQC poses is adapted.
- [Physically viewed native official painted character art mirrored by Creative Uncut; documented colour/outfit and visible equipment only. Full final-game 3D geometry is not established by this painting.](https://www.creativeuncut.com/gallery-06/mgs2-otacon.html) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## roster50__zero_mgs3

### MAJOR ZERO — MGS3

**Rôle :** Commandant Fox. **Profil :** `pistol`.

**Base présente dans le code :** Commandant de FOX ; simulation au pistolet et ordres radio, sans lui attribuer les capacités de ses agents.

**Incarnation à conserver :** MGS3 — 1964, classic incarnation, modern CQC paint adaptation

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** MAJOR ZERO : main forte et main de soutien identifiées sur le pistolet, coudes contenus. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas prudents sans inverser l’étui ni la main forte. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Commandant Fox » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder main forte et main de soutien identifiées sur le pistolet, coudes contenus.
- **jump_land :** MAJOR ZERO : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas prudents sans inverser l’étui ni la main forte. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de MAJOR ZERO. Terminer par recul du poignet puis stabilisation du canon. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS3 », présentation de MGS3 — 1964, classic incarnation, modern CQC paint adaptation, puis main forte et main de soutien identifiées sur le pistolet, coudes contenus. Geste court lié à « Pistolet FOX » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, recul du poignet puis stabilisation du canon ; MAJOR ZERO vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS3.
- **round_loss :** Proposition CQC : MAJOR ZERO réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « FOX Mission Control », revenir par recul du poignet puis stabilisation du canon, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MAJOR ZERO, préparer « Jab » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MAJOR ZERO, préparer « Frappe engagée » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MAJOR ZERO, préparer « Balayage » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MAJOR ZERO, préparer « Projection » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recul du poignet puis stabilisation du canon. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Pistolet FOX

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MAJOR ZERO, préparer « Pistolet FOX » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Montrer la prise et la visée de l’arme décrite par « Pistolet FOX » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Grenade de liaison

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MAJOR ZERO, préparer « Grenade de liaison » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Prélever l’objet correspondant à « Grenade de liaison », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Ordre Major Tom

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MAJOR ZERO, préparer « Ordre Major Tom » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Ordre Major Tom » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Repli Zero

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MAJOR ZERO, préparer « Repli Zero » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer l’appui qui produit le déplacement ; pas prudents sans inverser l’étui ni la main forte.

**Action.** Exécuter « Repli Zero » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** recul du poignet puis stabilisation du canon. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — FOX Mission Control

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MAJOR ZERO, préparer « FOX Mission Control » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Montrer la prise et la visée de l’arme décrite par « FOX Mission Control » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MAJOR ZERO, préparer « Recharger » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** recul du poignet puis stabilisation du canon. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### FOX Mission Control — Conclusion

Famille `ballistic`, ton `simulation` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : FOX Mission Control / Pistolet FOX.

Plan 1 : MAJOR ZERO sécurise son appui, regarde la cible et prépare l’outil ou le geste de « FOX Mission Control / Pistolet FOX ». Plan 2 : présenter l’arme effectivement associée à « FOX Mission Control / Pistolet FOX », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : recul du poignet puis stabilisation du canon, pose de signature face à l’adversaire. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Pistolet FOX — Conclusion

Famille `ballistic`, ton `simulation` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Pistolet FOX / Grenade de liaison.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Pistolet FOX / Grenade de liaison » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Pistolet FOX / Grenade de liaison », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : recul du poignet puis stabilisation du canon, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Ordre Major Tom — Conclusion

Famille `ballistic`, ton `simulation` ; 256 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Ordre Major Tom / Frappe engagée.

Plan 1 : approche jusqu’à la distance réelle de « Ordre Major Tom / Frappe engagée », arme et main libre identifiées. Plan 2 : présenter l’arme effectivement associée à « Ordre Major Tom / Frappe engagée », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : recul du poignet puis stabilisation du canon, prise de distance et maintien final. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Simulation encadrée — Conclusion

Famille `ballistic`, ton `simulation` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Simulation encadrée / Projection.

Plan 1 : après une observation ou un repli, MAJOR ZERO reprend l’initiative par « Simulation encadrée / Projection ». Plan 2 : présenter l’arme effectivement associée à « Simulation encadrée / Projection », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : recul du poignet puis stabilisation du canon, rangement/pose finale différente des trois autres. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Classic MGS3 incarnation stays independent. Official Delta full-body released model render is complementary remake evidence and helps supported outfit colors, not a certificate that every cloth/face detail is identical to PS2. Generated motion/camera views are authored CQC adaptations.
- No original-game motion capture or absolute 1:1 animation/timing claim. No armed support pose invented from an unrelated source.
- Both initial glove-contaminated V1 sources are preserved as rejected; V2 is selected, with bare hands.
- [Original official MGS3 full-body model image fixes jacket, brown shearling collar, camouflage trousers, headset, black boots and natural bare hands. Initial generated black gloves were rejected and corrected through image generation. Delta remake model supplied complementary detail; cloth/face fidelity remains a generated CQC adaptation, not an absolute PS2 pixel match.](https://www.konami.com/mg/archive/mgs3/uk/chara_zero.html) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## roster50__paramedic_mgs3

### PARA-MEDIC — MGS3

**Rôle :** Médical / Cinéma. **Profil :** `pistol`.

**Base présente dans le code :** Médecin radio ; sédatif, soins et diversion cinéphile dans un cadre non létal.

**Incarnation à conserver :** MGS3 — 1964, classic incarnation, modern CQC paint adaptation

**État vérifié :** métadonnées natives avec limites. 29 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, special, specialForward, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** PARA-MEDIC : main forte et main de soutien identifiées sur le pistolet, coudes contenus. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas prudents sans inverser l’étui ni la main forte. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Médical / Cinéma » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder main forte et main de soutien identifiées sur le pistolet, coudes contenus.
- **jump_land :** PARA-MEDIC : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas prudents sans inverser l’étui ni la main forte. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de PARA-MEDIC. Terminer par recul du poignet puis stabilisation du canon. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS3 », présentation de MGS3 — 1964, classic incarnation, modern CQC paint adaptation, puis main forte et main de soutien identifiées sur le pistolet, coudes contenus. Geste court lié à « Dard sédatif » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, recul du poignet puis stabilisation du canon ; PARA-MEDIC vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS3.
- **round_loss :** Proposition CQC : PARA-MEDIC réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Traitement FOX », revenir par recul du poignet puis stabilisation du canon, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PARA-MEDIC, préparer « Jab » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PARA-MEDIC, préparer « Frappe engagée » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PARA-MEDIC, préparer « Balayage » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PARA-MEDIC, préparer « Projection » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recul du poignet puis stabilisation du canon. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Dard sédatif

**Existant :** `melee` / `electric` ; 17/5/29 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PARA-MEDIC, préparer « Dard sédatif » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Dard sédatif » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense. L’effet electric reste séparé du membre ; son apparition et sa disparition suivent les événements du profil.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Espacement ou garde ; choc bref avec résistance temporaire après application.

##### specialDown — Ration médicale

**Existant :** `mark` / `recon` ; 26/1/30 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PARA-MEDIC, préparer « Ration médicale » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Orienter regard, optique ou terminal vers la cible observée, sans consulter une action future.

**Action.** Pour « Ration médicale », déclencher lecture/repérage avec un petit geste ou changement d’optique et un indicateur séparé. Le corps doit rester visible et vulnérable selon les données de combat.

**Retour.** recul du poignet puis stabilisation du canon. Couper le signal ou abaisser l’outil ; retour vers l’adversaire sans nouvelle arme inventée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Portée limitée ; le marquage ne vise ni à travers toute l’arène ni automatiquement.

##### specialForward — Référence de film

**Existant :** `mobility` / `movement` ; 7/18/25 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PARA-MEDIC, préparer « Référence de film » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer l’appui qui produit le déplacement ; pas prudents sans inverser l’étui ni la main forte.

**Action.** Exécuter « Référence de film » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 4 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** recul du poignet puis stabilisation du canon. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : La silhouette reste touchable ; la sortie est punissable.

##### specialBack — Repli Para-Medic

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PARA-MEDIC, préparer « Repli Para-Medic » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer l’appui qui produit le déplacement ; pas prudents sans inverser l’étui ni la main forte.

**Action.** Exécuter « Repli Para-Medic » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** recul du poignet puis stabilisation du canon. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Traitement FOX

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PARA-MEDIC, préparer « Traitement FOX » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Traitement FOX », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Stabiliser la réserve

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PARA-MEDIC, préparer « Stabiliser la réserve » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Stabiliser la réserve ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** recul du poignet puis stabilisation du canon. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Traitement FOX — Conclusion

Famille `ballistic`, ton `simulation` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Traitement FOX / Dard sédatif.

Plan 1 : PARA-MEDIC sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Traitement FOX / Dard sédatif ». Plan 2 : présenter l’arme effectivement associée à « Traitement FOX / Dard sédatif », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : recul du poignet puis stabilisation du canon, pose de signature face à l’adversaire. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Dard sédatif — Conclusion

Famille `ballistic`, ton `simulation` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Dard sédatif / Ration médicale.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Dard sédatif / Ration médicale » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Dard sédatif / Ration médicale », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : recul du poignet puis stabilisation du canon, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Référence de film — Conclusion

Famille `ballistic`, ton `simulation` ; 256 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Référence de film / Frappe engagée.

Plan 1 : approche jusqu’à la distance réelle de « Référence de film / Frappe engagée », arme et main libre identifiées. Plan 2 : présenter l’arme effectivement associée à « Référence de film / Frappe engagée », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : recul du poignet puis stabilisation du canon, prise de distance et maintien final. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Simulation encadrée — Conclusion

Famille `ballistic`, ton `simulation` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Simulation encadrée / Projection.

Plan 1 : après une observation ou un repli, PARA-MEDIC reprend l’initiative par « Simulation encadrée / Projection ». Plan 2 : présenter l’arme effectivement associée à « Simulation encadrée / Projection », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : recul du poignet puis stabilisation du canon, rangement/pose finale différente des trois autres. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Classic MGS3 incarnation stays independent. Official Delta full-body released model render is complementary remake evidence and helps supported outfit colors, not a certificate that every cloth/face detail is identical to PS2. Generated motion/camera views are authored CQC adaptations.
- No original-game motion capture or absolute 1:1 animation/timing claim. No armed support pose invented from an unrelated source.
- Original neutral source holds a book; hands-free support keyposes are explicitly authored CQC adaptations.
- The first left source is preserved as rejected for incomplete boots. Image-generated V2 restores full feet; its small alternative clothing-adjustment figure is not routed to reload, which reuses the full-height neutral left pose, to prevent a scale jump. All32 authored source poses remain preserved without raster transformation.
- [Classic official full-body render and original PS2 portrait were downloaded unchanged and physically viewed. Skirt, vest, pale blouse/bow, camouflage jacket draped over shoulders, tights, boots and bare hands retained. Delta remake is complementary detail only; every remake cloth/face detail is not certified PS2 identical.](https://www.konami.com/mg/archive/hd/lightbox/character/mgs3_paramedic.html?TB_iframe=true&height=564&keepThis=true&width=665) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).
