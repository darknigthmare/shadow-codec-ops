# Animations — ROSTER COMPLETION 0.50

**2 acteurs du registre courant.** Les titres d’actions et paramètres sont observés ; les descriptions sont des propositions CQC à produire et valider. Un groupe de frames existant ne certifie pas l’ensemble du mouvement ou sa fidélité originale.

[Index des fiches](README.md) · [Contrat commun](../04_ANIMATIONS_SPRITES.md)

## Sommaire

- [OTACON — MGS MOBILE](#roster50__otacon_mobile) — MGS MOBILE
- [THE COMMANDER — MGS MOBILE](#roster50__commander_mobile) — MGS MOBILE

## roster50__otacon_mobile

### OTACON — MGS MOBILE — MGS MOBILE

**Rôle :** Philanthropy / Support. **Profil :** `analyst`.

**Base présente dans le code :** Otacon dans la branche mobile ; outils de communication et drone de reconnaissance.

**Incarnation à conserver :** Real human Otacon Mobile codec identity; physical CQC embodiment reconstructed from qualifiedMGS2 officialart complement, distinct from falseVR Otacon NPC UID.

**État vérifié :** unattested-body-presentation-reconstruction. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, special, specialForward, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** OTACON — MGS MOBILE : outil de lecture ou de communication montré par le profil, attitude d’observation. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Philanthropy / Support » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder outil de lecture ou de communication montré par le profil, attitude d’observation.
- **jump_land :** OTACON — MGS MOBILE : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de OTACON — MGS MOBILE. Terminer par regard vers l’outil puis retour vers l’adversaire. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS MOBILE », présentation de Real human Otacon Mobile codec identity; physical CQC embodiment reconstructed from qualifiedMGS2 officialart complement, distinct from falseVR Otacon NPC UID., puis outil de lecture ou de communication montré par le profil, attitude d’observation. Geste court lié à « Électrode mobile » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, regard vers l’outil puis retour vers l’adversaire ; OTACON — MGS MOBILE vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS MOBILE.
- **round_loss :** Proposition CQC : OTACON — MGS MOBILE réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Transmission mobile », revenir par regard vers l’outil puis retour vers l’adversaire, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OTACON — MGS MOBILE, préparer « Jab » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OTACON — MGS MOBILE, préparer « Frappe engagée » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OTACON — MGS MOBILE, préparer « Balayage » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OTACON — MGS MOBILE, préparer « Projection » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Électrode mobile

**Existant :** `melee` / `electric` ; 17/5/29 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OTACON — MGS MOBILE, préparer « Électrode mobile » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Électrode mobile » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense. L’effet electric reste séparé du membre ; son apparition et sa disparition suivent les événements du profil.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Espacement ou garde ; choc bref avec résistance temporaire après application.

##### specialDown — Caméra mobile

**Existant :** `mark` / `recon` ; 26/1/30 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OTACON — MGS MOBILE, préparer « Caméra mobile » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Orienter regard, optique ou terminal vers la cible observée, sans consulter une action future.

**Action.** Pour « Caméra mobile », déclencher lecture/repérage avec un petit geste ou changement d’optique et un indicateur séparé. Le corps doit rester visible et vulnérable selon les données de combat.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Couper le signal ou abaisser l’outil ; retour vers l’adversaire sans nouvelle arme inventée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Portée limitée ; le marquage ne vise ni à travers toute l’arène ni automatiquement.

##### specialForward — Analyse du complexe

**Existant :** `mobility` / `movement` ; 7/18/25 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OTACON — MGS MOBILE, préparer « Analyse du complexe » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer l’appui qui produit le déplacement ; déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire.

**Action.** Exécuter « Analyse du complexe » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 4 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : La silhouette reste touchable ; la sortie est punissable.

##### specialBack — Repli Otacon

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OTACON — MGS MOBILE, préparer « Repli Otacon » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer l’appui qui produit le déplacement ; déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire.

**Action.** Exécuter « Repli Otacon » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Transmission mobile

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OTACON — MGS MOBILE, préparer « Transmission mobile » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Transmission mobile », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Stabiliser la réserve

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OTACON — MGS MOBILE, préparer « Stabiliser la réserve » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Stabiliser la réserve ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Transmission mobile — Conclusion

Famille `tactical`, ton `simulation` ; 220 ticks CQC ; phases actuelles : scan → disable → secure → extract. Appuis déclarés : Transmission mobile / Électrode mobile.

Plan 1 : OTACON — MGS MOBILE sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Transmission mobile / Électrode mobile ». Plan 2 : matérialiser le geste tactique « Transmission mobile / Électrode mobile » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : regard vers l’outil puis retour vers l’adversaire, pose de signature face à l’adversaire. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Électrode mobile — Conclusion

Famille `tactical`, ton `simulation` ; 238 ticks CQC ; phases actuelles : scan → disable → secure → extract. Appuis déclarés : Électrode mobile / Caméra mobile.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Électrode mobile / Caméra mobile » ; l’espace disponible doit être lisible. Plan 2 : matérialiser le geste tactique « Électrode mobile / Caméra mobile » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : regard vers l’outil puis retour vers l’adversaire, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Analyse du complexe — Conclusion

Famille `capture`, ton `simulation` ; 256 ticks CQC ; phases actuelles : stun → disarm → restrain → extract. Appuis déclarés : Analyse du complexe / Frappe engagée.

Plan 1 : approche jusqu’à la distance réelle de « Analyse du complexe / Frappe engagée », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Analyse du complexe / Frappe engagée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : regard vers l’outil puis retour vers l’adversaire, prise de distance et maintien final. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Simulation encadrée — Conclusion

Famille `tactical`, ton `simulation` ; 274 ticks CQC ; phases actuelles : scan → disable → secure → extract. Appuis déclarés : Simulation encadrée / Projection.

Plan 1 : après une observation ou un repli, OTACON — MGS MOBILE reprend l’initiative par « Simulation encadrée / Projection ». Plan 2 : matérialiser le geste tactique « Simulation encadrée / Projection » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : regard vers l’outil puis retour vers l’adversaire, rangement/pose finale différente des trois autres. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Identity/reference scope/equipment and anatomical sides reviewed within the explicitly stated source limits; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Native source is small; fine facial topology, seams, fabric microtexture and unseen pose angles are interpreted at CQC drawing scale.
- All16action keyposes per direction are authored CQC presentation, not original-game motion capture or exact canonical techniques.
- OriginalMobile source establishes only codec face in greenmonochrome; naturalcolours/fullbody clothing are unattested.
- MGS2fullbody officialart is supplementary appearance reconstruction only; Mobile and falseVR Otacon identities remain separate.
- [Native2008 MobileCodec141.12 authentic320×240 facecapture, publicly mirrored unchanged; belowportrait fullbody is authored reconstruction from expressly qualified originalMGS2 conceptart, no implicitMobile appearance alias.](https://mobilezavenue.synthasite.com/resources/5.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## roster50__commander_mobile

### THE COMMANDER — MGS MOBILE — MGS MOBILE

**Rôle :** Commandant Mercenaire. **Profil :** `raven`.

**Base présente dans le code :** Chef mercenaire de MGS Mobile ; carabine lourde, brouillage et contrôle de zone adaptés au Versus.

**Incarnation à conserver :** Actual2008 Mobile anonymousbossCommander, distant nativegame appearance plus expressly qualified secondaryweapon/neckcover context; source-limited fullCQC presentation reconstruction, not RoyCampbell.

**État vérifié :** unattested-body-presentation-reconstruction. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialDown ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialForward, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** THE COMMANDER — MGS MOBILE : masse de l’arme et du corps visibles, appuis larges. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** accélération lente et compensation du poids de l’armement. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Commandant Mercenaire » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder masse de l’arme et du corps visibles, appuis larges.
- **jump_land :** THE COMMANDER — MGS MOBILE : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. accélération lente et compensation du poids de l’armement. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de THE COMMANDER — MGS MOBILE. Terminer par arrêt de l’arme, inertie des accessoires puis garde. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS MOBILE », présentation de Actual2008 Mobile anonymousbossCommander, distant nativegame appearance plus expressly qualified secondaryweapon/neckcover context; source-limited fullCQC presentation reconstruction, not RoyCampbell., puis masse de l’arme et du corps visibles, appuis larges. Geste court lié à « Carabine du Commander » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, arrêt de l’arme, inertie des accessoires puis garde ; THE COMMANDER — MGS MOBILE vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS MOBILE.
- **round_loss :** Proposition CQC : THE COMMANDER — MGS MOBILE réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Blackout du complexe », revenir par arrêt de l’arme, inertie des accessoires puis garde, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE COMMANDER — MGS MOBILE, préparer « Jab » ; masse de l’arme et du corps visibles, appuis larges. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** arrêt de l’arme, inertie des accessoires puis garde.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE COMMANDER — MGS MOBILE, préparer « Frappe engagée » ; masse de l’arme et du corps visibles, appuis larges. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** arrêt de l’arme, inertie des accessoires puis garde.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE COMMANDER — MGS MOBILE, préparer « Balayage » ; masse de l’arme et du corps visibles, appuis larges. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** arrêt de l’arme, inertie des accessoires puis garde.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE COMMANDER — MGS MOBILE, préparer « Projection » ; masse de l’arme et du corps visibles, appuis larges. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** arrêt de l’arme, inertie des accessoires puis garde. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Carabine du Commander

**Existant :** `projectile` / `ballistic` ; 22/1/36 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE COMMANDER — MGS MOBILE, préparer « Carabine du Commander » ; masse de l’arme et du corps visibles, appuis larges. Montrer la prise et la visée de l’arme décrite par « Carabine du Commander » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 4 émissions, espacées de 5 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** arrêt de l’arme, inertie des accessoires puis garde. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 4 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### specialDown — Grenade de brouillage

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE COMMANDER — MGS MOBILE, préparer « Grenade de brouillage » ; masse de l’arme et du corps visibles, appuis larges. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Grenade de brouillage » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** arrêt de l’arme, inertie des accessoires puis garde.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialForward — Verrou mobile

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE COMMANDER — MGS MOBILE, préparer « Verrou mobile » ; masse de l’arme et du corps visibles, appuis larges. Prélever l’objet correspondant à « Verrou mobile », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** arrêt de l’arme, inertie des accessoires puis garde. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialBack — Repli du Commander

**Existant :** `buff` / `armor` ; 22/1/31 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE COMMANDER — MGS MOBILE, préparer « Repli du Commander » ; masse de l’arme et du corps visibles, appuis larges. Montrer la préparation corporelle ou mécanique de « Repli du Commander ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** arrêt de l’arme, inertie des accessoires puis garde. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Absorbe une seule frappe ; projections, EMP et attaques brise-armure la contrent.

##### super — Blackout du complexe

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE COMMANDER — MGS MOBILE, préparer « Blackout du complexe » ; masse de l’arme et du corps visibles, appuis larges. Montrer la prise et la visée de l’arme décrite par « Blackout du complexe » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 8 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** arrêt de l’arme, inertie des accessoires puis garde. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 8 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Refroidir

**Existant :** `recover` / `recovery` ; 45/1/25 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE COMMANDER — MGS MOBILE, préparer « Refroidir » ; masse de l’arme et du corps visibles, appuis larges. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Refroidir ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** arrêt de l’arme, inertie des accessoires puis garde. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Refroidissement ou pause tactique interrompable ; aucun soin gratuit.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Blackout du complexe — Conclusion

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Blackout du complexe / Carabine du Commander.

Plan 1 : THE COMMANDER — MGS MOBILE sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Blackout du complexe / Carabine du Commander ». Plan 2 : présenter l’arme effectivement associée à « Blackout du complexe / Carabine du Commander », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : arrêt de l’arme, inertie des accessoires puis garde, pose de signature face à l’adversaire.

##### Carabine du Commander — Conclusion

Famille `ballistic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Carabine du Commander / Grenade de brouillage.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Carabine du Commander / Grenade de brouillage » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Carabine du Commander / Grenade de brouillage », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : arrêt de l’arme, inertie des accessoires puis garde, arrêt du dispositif et retour au cadre d’ensemble.

##### Verrou mobile — Conclusion

Famille `ballistic`, ton `stylized` ; 256 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Verrou mobile / Frappe engagée.

Plan 1 : approche jusqu’à la distance réelle de « Verrou mobile / Frappe engagée », arme et main libre identifiées. Plan 2 : présenter l’arme effectivement associée à « Verrou mobile / Frappe engagée », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : arrêt de l’arme, inertie des accessoires puis garde, prise de distance et maintien final.

##### Refroidissement — Conclusion

Famille `ballistic`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Refroidissement / Projection.

Plan 1 : après une observation ou un repli, THE COMMANDER — MGS MOBILE reprend l’initiative par « Refroidissement / Projection ». Plan 2 : présenter l’arme effectivement associée à « Refroidissement / Projection », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : arrêt de l’arme, inertie des accessoires puis garde, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Identity/reference scope/equipment and anatomical sides reviewed within the explicitly stated source limits; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- AuthenticMobile captures establish only distantboss/heavyweapon silhouette; exact face,costume,bodytexture and gunanatomy cannot be certified from these pixels.
- Neck-gaiter and M61Vulcan name are secondary encyclopedia context only; no primarycloseup reviewed establishes exact M61configuration or neckcoverdetails.
- All finephysicaldetails are expressly source-limited authored reconstruction; no originalgamebody1:1claim or Campbell/robot alias.
- Actual heldweapon is heavyrotarygun presentation, so visualFirearmPresenttrue reflects drawnnativegun; firearmphysics/moves remain originalauthoredgame.
- 16actionposes/direction are authoredCQC, not originalphone techniques.
- [True originalMobile boss visible far in authenticgame screenshots96/103, heavyweapon silhouette established. Fineclothing/face/weaponanatomy unresolved. Secondary Commander encyclopedia names neck-gaiter/M61Vulcan but no primarydetailcapture certifies those labels; CQC physical detail explicitly reconstructed.](https://www.hardcoregaming101.net/metal-gear-solid-mobile/) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).
