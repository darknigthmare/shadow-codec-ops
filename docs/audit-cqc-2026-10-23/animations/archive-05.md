# Animations — ARCHIVE

**10 acteurs du registre courant.** Les titres d’actions et paramètres sont observés ; les descriptions sont des propositions CQC à produire et valider. Un groupe de frames existant ne certifie pas l’ensemble du mouvement ou sa fidélité originale.

[Index des fiches](README.md) · [Contrat commun](../04_ANIMATIONS_SPRITES.md)

## Sommaire

- [D-DOG](#archive__ddog) — MGSV
- [GOODLUCK](#archive__goodluck) — SURVIVE
- [GRAY FOX — OUTER HEAVEN](#archive__gray_fox_mg1) — MG1
- [HOLLY WHITE](#archive__holly_white) — MG2
- [GUSTAVA HEFFNER](#archive__gustava_heffner) — MG2
- [JOHNNY SASAKI — MGS1](#archive__johnny_mgs1) — MGS1
- [SERGEI GURLUKOVICH](#archive__sergei_gurlukovich) — MGS2
- [SCOTT DOLPH](#archive__scott_dolph) — MGS2
- [CHICO](#archive__chico_pw) — PEACE WALKER
- [ISHMAEL](#archive__ishmael) — MGSV

## archive__ddog

### D-DOG — MGSV

**Rôle :** Compagnon canin : repérage et morsure. **Profil :** `dog`.

**Base présente dans le code :** D-Dog : flair, morsure et équipement paralysant ; pas de fusil tenu par un chien.

**Incarnation à conserver :** Adult D-Dog, standard unarmored gray-and-cream wolf companion with right eye patch

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, special, specialDown, specialForward, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `retro-msx`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** D-DOG : tête, harnais, pattes et accessoires du chien dans cette version. Respiration et petit mouvement de tête/oreilles/queue selon l’anatomie ; les pattes restent stables. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** trot/courte course à quatre appuis, pivot avec patte d’appui. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Compagnon canin : repérage et morsure » : abaissement et orientation défensive de la tête et du tronc ; ne pas ajouter une parade humaine à deux bras ; recul bloqué distinct de la simple position basse. Garder tête, harnais, pattes et accessoires du chien dans cette version.
- **jump_land :** D-DOG : regroupement des appuis arrière, bond, extension en vol puis réception par les appuis avant et arrière adaptés à l’espèce. trot/courte course à quatre appuis, pivot avec patte d’appui. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Réactions de tête, de flanc et de patte de D-DOG, perte d’appui puis relevé par les membres réellement présents. Terminer par retrait de la tête ou de l’outil et retour quadrupède. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGSV », présentation de Adult D-Dog, standard unarmored gray-and-cream wolf companion with right eye patch, puis tête, harnais, pattes et accessoires du chien dans cette version. Geste court lié à « Morsure d’interception » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, retrait de la tête ou de l’outil et retour quadrupède ; D-DOG vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGSV.
- **round_loss :** Proposition CQC : D-DOG relève la tête, rassemble ses appuis, répartit son poids puis reprend sa position d’attente ; aucun redressement humain. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Bite — neutralisation », revenir par retrait de la tête ou de l’outil et retour quadrupède, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Contact animal

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de D-DOG, préparer « Contact animal » ; tête, harnais, pattes et accessoires du chien dans cette version. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Contact animal » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retrait de la tête ou de l’outil et retour quadrupède.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Percussion basse

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de D-DOG, préparer « Percussion basse » ; tête, harnais, pattes et accessoires du chien dans cette version. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Percussion basse », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retrait de la tête ou de l’outil et retour quadrupède.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de D-DOG, préparer « Balayage » ; tête, harnais, pattes et accessoires du chien dans cette version. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** retrait de la tête ou de l’outil et retour quadrupède.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Morsure de repousse

**Existant :** `melee` / `strike` ; 12/4/29 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de D-DOG, préparer « Morsure de repousse » ; tête, harnais, pattes et accessoires du chien dans cette version. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Morsure de repousse » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retrait de la tête ou de l’outil et retour quadrupède.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### special — Morsure d’interception

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de D-DOG, préparer « Morsure d’interception » ; tête, harnais, pattes et accessoires du chien dans cette version. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Morsure d’interception » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retrait de la tête ou de l’outil et retour quadrupède.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialDown — Bâton paralysant

**Existant :** `melee` / `electric` ; 17/5/29 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de D-DOG, préparer « Bâton paralysant » ; tête, harnais, pattes et accessoires du chien dans cette version. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Bâton paralysant » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense. L’effet electric reste séparé du membre ; son apparition et sa disparition suivent les événements du profil.

**Retour.** retrait de la tête ou de l’outil et retour quadrupède.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Espacement ou garde ; choc bref avec résistance temporaire après application.

##### specialForward — Flair de D-Dog

**Existant :** `mark` / `recon` ; 26/1/30 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de D-DOG, préparer « Flair de D-Dog » ; tête, harnais, pattes et accessoires du chien dans cette version. Orienter regard, optique ou terminal vers la cible observée, sans consulter une action future.

**Action.** Pour « Flair de D-Dog », déclencher lecture/repérage avec un petit geste ou changement d’optique et un indicateur séparé. Le corps doit rester visible et vulnérable selon les données de combat.

**Retour.** retrait de la tête ou de l’outil et retour quadrupède. Couper le signal ou abaisser l’outil ; retour vers l’adversaire sans nouvelle arme inventée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Portée limitée ; le marquage ne vise ni à travers toute l’arène ni automatiquement.

##### specialBack — Esquive canine

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de D-DOG, préparer « Esquive canine » ; tête, harnais, pattes et accessoires du chien dans cette version. Préparer l’appui qui produit le déplacement ; trot/courte course à quatre appuis, pivot avec patte d’appui.

**Action.** Exécuter « Esquive canine » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -8 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** retrait de la tête ou de l’outil et retour quadrupède. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Bite — neutralisation

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de D-DOG, préparer « Bite — neutralisation » ; tête, harnais, pattes et accessoires du chien dans cette version. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Bite — neutralisation », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retrait de la tête ou de l’outil et retour quadrupède.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Reprendre son souffle

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de D-DOG, préparer « Reprendre son souffle » ; tête, harnais, pattes et accessoires du chien dans cette version. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Reprendre son souffle ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** retrait de la tête ou de l’outil et retour quadrupède. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Scout & Strike

Famille `cqc`, ton `stylized` ; 220 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Bite — neutralisation / Morsure d’interception.

Plan 1 : D-DOG sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Bite — neutralisation / Morsure d’interception ». Plan 2 : contact de saisie ou neutralisation lié à « Bite — neutralisation / Morsure d’interception », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : retrait de la tête ou de l’outil et retour quadrupède, pose de signature face à l’adversaire.

##### Stun Rod Bite

Famille `cqc`, ton `stylized` ; 238 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Bite — neutralisation / Bâton paralysant.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Bite — neutralisation / Bâton paralysant » ; l’espace disponible doit être lisible. Plan 2 : contact de saisie ou neutralisation lié à « Bite — neutralisation / Bâton paralysant », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : retrait de la tête ou de l’outil et retour quadrupède, arrêt du dispositif et retour au cadre d’ensemble.

##### Knife Harness

Famille `beast`, ton `stylized` ; 256 ticks CQC ; phases actuelles : stalk → pounce → takedown → howl. Appuis déclarés : Bite — neutralisation / Flair de D-Dog.

Plan 1 : approche jusqu’à la distance réelle de « Bite — neutralisation / Flair de D-Dog », arme et main libre identifiées. Plan 2 : trot/courte course à quatre appuis, pivot avec patte d’appui ; montrer l’organe de « Bite — neutralisation / Flair de D-Dog ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : retrait de la tête ou de l’outil et retour quadrupède, prise de distance et maintien final.

##### Good Dog

Famille `beast`, ton `stylized` ; 274 ticks CQC ; phases actuelles : stalk → pounce → takedown → howl. Appuis déclarés : Bite — neutralisation / Morsure de repousse.

Plan 1 : après une observation ou un repli, D-DOG reprend l’initiative par « Bite — neutralisation / Morsure de repousse ». Plan 2 : trot/courte course à quatre appuis, pivot avec patte d’appui ; montrer l’organe de « Bite — neutralisation / Morsure de repousse ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : retrait de la tête ou de l’outil et retour quadrupède, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Native publisher screens 701x509 and664x450, second running pose motion blurred; fur microtexture/occluded right-eye straps closest authored adaptation, no original game texture certification.
- Official figure is a licensed sculptural reference, never represented as original gameplay body proof; tactical suit and knife not transferred.
- Sixteen authored anatomically canine movements per facing; gameplay/hitboxes unchanged.
- Primary publisher screenshots were issued before release in June2015; final patch-level body/texture equivalence not independently certified. Selected standard D-Dog appearance adapted as close as source evidence allows.
- Native leftpose1 turns its head back; guarded presentation uses alert left-facing pose0, actual head-turn poses preserved. Fourpaw movements and eye-patch sides physically reviewed.
- [Two Konami-supplied complete June2015 pre-release gameplay screenshots physically viewed and bitexactdownloaded; official Shinkawa ink illustration corroborates eye patch; Konami licensed figurine photo corroborates fur/head/paw geometry only, its tactical armor explicitly excluded.](https://www.gamespot.com/articles/new-metal-gear-solid-5-screenshots-feature-diamond/1100-6427834/) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## archive__goodluck

### GOODLUCK — SURVIVE

**Rôle :** Simulation prudente, pas de super-pouvoirs. **Profil :** `analyst`.

**Base présente dans le code :** Goodluck : scientifique, kit de terrain explicitement simulé, pas de magie temporelle de combat.

**Incarnation à conserver :** Goodluck adult human shown in original KONAMI SinglePlayer film, distinct from child Chris.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, special, specialForward, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** GOODLUCK : outil de lecture ou de communication montré par le profil, attitude d’observation. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Simulation prudente, pas de super-pouvoirs » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder outil de lecture ou de communication montré par le profil, attitude d’observation.
- **jump_land :** GOODLUCK : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de GOODLUCK. Terminer par regard vers l’outil puis retour vers l’adversaire. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « SURVIVE », présentation de Goodluck adult human shown in original KONAMI SinglePlayer film, distinct from child Chris., puis outil de lecture ou de communication montré par le profil, attitude d’observation. Geste court lié à « Outil de proximité » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, regard vers l’outil puis retour vers l’adversaire ; GOODLUCK vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à SURVIVE.
- **round_loss :** Proposition CQC : GOODLUCK réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Évacuation de Goodluck », revenir par regard vers l’outil puis retour vers l’adversaire, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GOODLUCK, préparer « Jab » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GOODLUCK, préparer « Frappe engagée » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GOODLUCK, préparer « Balayage » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GOODLUCK, préparer « Projection » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Outil de proximité

**Existant :** `melee` / `electric` ; 17/5/29 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GOODLUCK, préparer « Outil de proximité » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Outil de proximité » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense. L’effet electric reste séparé du membre ; son apparition et sa disparition suivent les événements du profil.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Espacement ou garde ; choc bref avec résistance temporaire après application.

##### specialDown — Observation Goodluck

**Existant :** `mark` / `recon` ; 26/1/30 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GOODLUCK, préparer « Observation Goodluck » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Orienter regard, optique ou terminal vers la cible observée, sans consulter une action future.

**Action.** Pour « Observation Goodluck », déclencher lecture/repérage avec un petit geste ou changement d’optique et un indicateur séparé. Le corps doit rester visible et vulnérable selon les données de combat.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Couper le signal ou abaisser l’outil ; retour vers l’adversaire sans nouvelle arme inventée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Portée limitée ; le marquage ne vise ni à travers toute l’arène ni automatiquement.

##### specialForward — Se dégager

**Existant :** `mobility` / `movement` ; 7/18/25 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GOODLUCK, préparer « Se dégager » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer l’appui qui produit le déplacement ; déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire.

**Action.** Exécuter « Se dégager » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 4 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : La silhouette reste touchable ; la sortie est punissable.

##### specialBack — Repli scientifique

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GOODLUCK, préparer « Repli scientifique » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer l’appui qui produit le déplacement ; déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire.

**Action.** Exécuter « Repli scientifique » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Évacuation de Goodluck

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GOODLUCK, préparer « Évacuation de Goodluck » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Évacuation de Goodluck », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Stabiliser la réserve

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GOODLUCK, préparer « Stabiliser la réserve » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Stabiliser la réserve ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Évacuation de Goodluck — Final

Famille `cqc`, ton `nonlethal` ; 220 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Évacuation de Goodluck / Outil de proximité.

Plan 1 : GOODLUCK sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Évacuation de Goodluck / Outil de proximité ». Plan 2 : contact de saisie ou neutralisation lié à « Évacuation de Goodluck / Outil de proximité », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : regard vers l’outil puis retour vers l’adversaire, pose de signature face à l’adversaire. Respecter le ton nonlethal enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Outil de proximité / Observation Goodluck

Famille `electric`, ton `nonlethal` ; 238 ticks CQC ; phases actuelles : charge → arc → overload → shutdown. Appuis déclarés : Évacuation de Goodluck / Observation Goodluck.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Évacuation de Goodluck / Observation Goodluck » ; l’espace disponible doit être lisible. Plan 2 : montrer la source corporelle ou matérielle de « Évacuation de Goodluck / Observation Goodluck ». Plan 3 : développer l’effet electric en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : regard vers l’outil puis retour vers l’adversaire, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton nonlethal enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Se dégager — Point final

Famille `cqc`, ton `nonlethal` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Évacuation de Goodluck / Se dégager.

Plan 1 : approche jusqu’à la distance réelle de « Évacuation de Goodluck / Se dégager », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Évacuation de Goodluck / Se dégager », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : regard vers l’outil puis retour vers l’adversaire, prise de distance et maintien final. Respecter le ton nonlethal enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Simulation prudente — Mission close

Famille `capture`, ton `nonlethal` ; 274 ticks CQC ; phases actuelles : stun → disarm → restrain → extract. Appuis déclarés : Évacuation de Goodluck / Projection.

Plan 1 : après une observation ou un repli, GOODLUCK reprend l’initiative par « Évacuation de Goodluck / Projection ». Plan 2 : contact de saisie ou neutralisation lié à « Évacuation de Goodluck / Projection », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : regard vers l’outil puis retour vers l’adversaire, rangement/pose finale différente des trois autres. Respecter le ton nonlethal enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against its identified reference and only its visible extent. This is a 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Identity, costume, equipment and anatomical-side checks establish consistency with the source-backed visible facts and the explicitly qualified reconstructed parts; they do not certify unseen anatomy or clothing as canonical. Gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Physically viewed original reference establishes only visible identity/costume/accessories; it is not certified whole-body final-game 3D geometry or texture.
- Back surfaces and unseen pose angles are adapted from visible source design, without a pixel-perfect claim.
- Sixteen action poses per direction are authored gameplay adaptation; no canonical technique or motion-capture claim.
- Three primary KONAMI official video wholeframes35/40/45s prove Goodluck adult face and upperbody, clipboard and bare hands only; all legs, shoes, coatlength and standing stature are explicit conservative reconstruction.
- Original clipboard is visible but which hand retains it in freelyauthored actionposes is an adaptation, not proof of canonical handedness.
- Do not merge child Chris incarnation with adult Goodluck merely because lore links their identity.
- [PrimaryKONAMI officialgame film wholeframes, visible head/torso/barehands/clipboard only; lowerbody and gameplay motion explicitly reconstructed.](https://store.steampowered.com/app/543900/METAL_GEAR_SURVIVE/) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [PrimaryKonami officialSinglePlayer video, whole1920x1080frame. Face and upperbody only; no nativepixelsedited.](https://store.steampowered.com/app/543900/METAL_GEAR_SURVIVE/) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [PrimaryKonami officialSinglePlayer video, whole1920x1080frame. Face and upperbody only; no nativepixelsedited.](https://store.steampowered.com/app/543900/METAL_GEAR_SURVIVE/) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## archive__gray_fox_mg1

### GRAY FOX — OUTER HEAVEN — MG1

**Rôle :** Tir, grenades et distance. **Profil :** `soldier`.

**Base présente dans le code :** Gray Fox d’Outer Heaven humain ; exosquelette et lame HF exclus de cette incarnation.

**Incarnation à conserver :** Human Grey Fox original1987 prisoner/manual appearance, not cyborg or MPO Null.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** GRAY FOX — OUTER HEAVEN : appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas courts, crosse/équipement conservés près du torse. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Tir, grenades et distance » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder appui militaire stable, arme maintenue dans l’axe et regard vers la menace.
- **jump_land :** GRAY FOX — OUTER HEAVEN : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas courts, crosse/équipement conservés près du torse. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de GRAY FOX — OUTER HEAVEN. Terminer par retour en couverture de l’arme après le coup. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MG1 », présentation de Human Grey Fox original1987 prisoner/manual appearance, not cyborg or MPO Null., puis appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Geste court lié à « Pistolet de Frank » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, retour en couverture de l’arme après le coup ; GRAY FOX — OUTER HEAVEN vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MG1.
- **round_loss :** Proposition CQC : GRAY FOX — OUTER HEAVEN réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Rejoindre l’extraction », revenir par retour en couverture de l’arme après le coup, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GRAY FOX — OUTER HEAVEN, préparer « Jab » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GRAY FOX — OUTER HEAVEN, préparer « Frappe engagée » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GRAY FOX — OUTER HEAVEN, préparer « Balayage » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GRAY FOX — OUTER HEAVEN, préparer « Projection » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** retour en couverture de l’arme après le coup. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Pistolet de Frank

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GRAY FOX — OUTER HEAVEN, préparer « Pistolet de Frank » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Pistolet de Frank » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Grenade de FOXHOUND

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GRAY FOX — OUTER HEAVEN, préparer « Grenade de FOXHOUND » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Prélever l’objet correspondant à « Grenade de FOXHOUND », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Crosse d’Outer Heaven

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GRAY FOX — OUTER HEAVEN, préparer « Crosse d’Outer Heaven » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Crosse d’Outer Heaven » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Repli de Fox

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GRAY FOX — OUTER HEAVEN, préparer « Repli de Fox » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer l’appui qui produit le déplacement ; pas courts, crosse/équipement conservés près du torse.

**Action.** Exécuter « Repli de Fox » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** retour en couverture de l’arme après le coup. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Rejoindre l’extraction

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GRAY FOX — OUTER HEAVEN, préparer « Rejoindre l’extraction » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Rejoindre l’extraction » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GRAY FOX — OUTER HEAVEN, préparer « Recharger » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** retour en couverture de l’arme après le coup. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Outer Heaven Rescue

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Rejoindre l’extraction / Pistolet de Frank.

Plan 1 : GRAY FOX — OUTER HEAVEN sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Rejoindre l’extraction / Pistolet de Frank ». Plan 2 : présenter l’arme effectivement associée à « Rejoindre l’extraction / Pistolet de Frank », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : retour en couverture de l’arme après le coup, pose de signature face à l’adversaire.

##### FOX Extraction

Famille `ballistic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Rejoindre l’extraction / Grenade de FOXHOUND.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Rejoindre l’extraction / Grenade de FOXHOUND » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Rejoindre l’extraction / Grenade de FOXHOUND », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : retour en couverture de l’arme après le coup, arrêt du dispositif et retour au cadre d’ensemble.

##### Prison Break

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Rejoindre l’extraction / Crosse d’Outer Heaven.

Plan 1 : approche jusqu’à la distance réelle de « Rejoindre l’extraction / Crosse d’Outer Heaven », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Rejoindre l’extraction / Crosse d’Outer Heaven », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : retour en couverture de l’arme après le coup, prise de distance et maintien final.

##### Premier renard

Famille `ballistic`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Rejoindre l’extraction / Projection.

Plan 1 : après une observation ou un repli, GRAY FOX — OUTER HEAVEN reprend l’initiative par « Rejoindre l’extraction / Projection ». Plan 2 : présenter l’arme effectivement associée à « Rejoindre l’extraction / Projection », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : retour en couverture de l’arme après le coup, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Only the explicitly visible upper-body details are documented by the historical portrait. Plain lower-body garments and shoes, colours absent from the monochrome source and unseen seams are restrained project adaptation; no false claim of a released full-body turnaround.
- Forehead wrap is original prisoner medical bandaging, not a later bandana incarnation. No complete released body model is shown.
- Sixteen complete native keyposes per facing are authored gameplay poses, not original historical animation frames.
- [Physically viewed original character reference(s), retained bitexact with source receipts; authored modern native sprite adaptation preserves documented visible details.](https://lparchive.org/Metal-Gear-1-2/Update%2004/10-SkQDx.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## archive__holly_white

### HOLLY WHITE — MG2

**Rôle :** Pistolet et défense proche. **Profil :** `pistol`.

**Base présente dans le code :** Agent de renseignement de MG2 : équipement de simulation modeste, pas une cyborg.

**Incarnation à conserver :** Modern native interpretation of revised official MG2 portrait and original1990 MSX2 rescued/escape field-body palette.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `throw` = throw, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `retro-msx`, `tuxedo`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** HOLLY WHITE : main forte et main de soutien identifiées sur le pistolet, coudes contenus. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas prudents sans inverser l’étui ni la main forte. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Pistolet et défense proche » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder main forte et main de soutien identifiées sur le pistolet, coudes contenus.
- **jump_land :** HOLLY WHITE : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas prudents sans inverser l’étui ni la main forte. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de HOLLY WHITE. Terminer par recul du poignet puis stabilisation du canon. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MG2 », présentation de Modern native interpretation of revised official MG2 portrait and original1990 MSX2 rescued/escape field-body palette., puis main forte et main de soutien identifiées sur le pistolet, coudes contenus. Geste court lié à « Pistolet discret » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, recul du poignet puis stabilisation du canon ; HOLLY WHITE vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MG2.
- **round_loss :** Proposition CQC : HOLLY WHITE réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Sortie de Zanzibar », revenir par recul du poignet puis stabilisation du canon, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de HOLLY WHITE, préparer « Jab » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de HOLLY WHITE, préparer « Frappe engagée » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de HOLLY WHITE, préparer « Balayage » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de HOLLY WHITE, préparer « Projection » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recul du poignet puis stabilisation du canon. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Pistolet discret

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de HOLLY WHITE, préparer « Pistolet discret » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Montrer la prise et la visée de l’arme décrite par « Pistolet discret » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Charge de diversion

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de HOLLY WHITE, préparer « Charge de diversion » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Prélever l’objet correspondant à « Charge de diversion », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Repousser l’adversaire

**Existant :** `melee` / `grapple` ; 10/3/32 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de HOLLY WHITE, préparer « Repousser l’adversaire » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recul du poignet puis stabilisation du canon. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Hors de portée ou saut ; ne saisir ni cible aérienne ni cible sous protection post-projection.

##### specialBack — Repli d’agent

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de HOLLY WHITE, préparer « Repli d’agent » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer l’appui qui produit le déplacement ; pas prudents sans inverser l’étui ni la main forte.

**Action.** Exécuter « Repli d’agent » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** recul du poignet puis stabilisation du canon. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Sortie de Zanzibar

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de HOLLY WHITE, préparer « Sortie de Zanzibar » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Montrer la prise et la visée de l’arme décrite par « Sortie de Zanzibar » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de HOLLY WHITE, préparer « Recharger » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** recul du poignet puis stabilisation du canon. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Sortie de Zanzibar — Final

Famille `ballistic`, ton `simulation` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Sortie de Zanzibar / Pistolet discret.

Plan 1 : HOLLY WHITE sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Sortie de Zanzibar / Pistolet discret ». Plan 2 : présenter l’arme effectivement associée à « Sortie de Zanzibar / Pistolet discret », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : recul du poignet puis stabilisation du canon, pose de signature face à l’adversaire. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Pistolet discret / Charge de diversion

Famille `ballistic`, ton `simulation` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Sortie de Zanzibar / Charge de diversion.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Sortie de Zanzibar / Charge de diversion » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Sortie de Zanzibar / Charge de diversion », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : recul du poignet puis stabilisation du canon, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Repousser l’adversaire — Point final

Famille `cqc`, ton `simulation` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Sortie de Zanzibar / Repousser l’adversaire.

Plan 1 : approche jusqu’à la distance réelle de « Sortie de Zanzibar / Repousser l’adversaire », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Sortie de Zanzibar / Repousser l’adversaire », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : recul du poignet puis stabilisation du canon, prise de distance et maintien final. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Lecture rapprochée — Mission close

Famille `capture`, ton `simulation` ; 274 ticks CQC ; phases actuelles : stun → disarm → restrain → extract. Appuis déclarés : Sortie de Zanzibar / Projection.

Plan 1 : après une observation ou un repli, HOLLY WHITE reprend l’initiative par « Sortie de Zanzibar / Projection ». Plan 2 : contact de saisie ou neutralisation lié à « Sortie de Zanzibar / Projection », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : recul du poignet puis stabilisation du canon, rangement/pose finale différente des trois autres. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Official revised codec face is a later official edition distinct from1990 manual celebrity-like portrait; no appearance alias with another incarnation.
- Tiny original field sprite establishes only broad palette/silhouette. Fine clothing seams, body geometry and absent detail colours are restrained modern interpretation, not certified complete original model.
- Sixteen native keyposes per direction are authored modern gameplay poses.
- [Original Konami revised official portrait and whole original MSX2 game frame physically viewed; unknown fine clothes seams and poses are authored adaptation.](https://www.konami.com/mg/archive/mg2/pic/holly.gif) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## archive__gustava_heffner

### GUSTAVA HEFFNER — MG2

**Rôle :** Pistolet et défense proche. **Profil :** `pistol`.

**Base présente dans le code :** Garde du corps humaine : contrôle rapproché adapté, aucune glace magique liée au patinage.

**Incarnation à conserver :** Modern native interpretation of revised official MG2 portrait and original1990 MSX2 rescued/escape field-body palette.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `throw` = throw, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `retro-msx`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** GUSTAVA HEFFNER : main forte et main de soutien identifiées sur le pistolet, coudes contenus. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas prudents sans inverser l’étui ni la main forte. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Pistolet et défense proche » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder main forte et main de soutien identifiées sur le pistolet, coudes contenus.
- **jump_land :** GUSTAVA HEFFNER : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas prudents sans inverser l’étui ni la main forte. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de GUSTAVA HEFFNER. Terminer par recul du poignet puis stabilisation du canon. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MG2 », présentation de Modern native interpretation of revised official MG2 portrait and original1990 MSX2 rescued/escape field-body palette., puis main forte et main de soutien identifiées sur le pistolet, coudes contenus. Geste court lié à « Pistolet de protection » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, recul du poignet puis stabilisation du canon ; GUSTAVA HEFFNER vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MG2.
- **round_loss :** Proposition CQC : GUSTAVA HEFFNER réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Protection du passage », revenir par recul du poignet puis stabilisation du canon, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GUSTAVA HEFFNER, préparer « Jab » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GUSTAVA HEFFNER, préparer « Frappe engagée » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GUSTAVA HEFFNER, préparer « Balayage » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GUSTAVA HEFFNER, préparer « Projection » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recul du poignet puis stabilisation du canon. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Pistolet de protection

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GUSTAVA HEFFNER, préparer « Pistolet de protection » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Montrer la prise et la visée de l’arme décrite par « Pistolet de protection » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Grenade de garde

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GUSTAVA HEFFNER, préparer « Grenade de garde » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Prélever l’objet correspondant à « Grenade de garde », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Projection de Gustava

**Existant :** `melee` / `grapple` ; 10/3/32 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GUSTAVA HEFFNER, préparer « Projection de Gustava » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recul du poignet puis stabilisation du canon. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Hors de portée ou saut ; ne saisir ni cible aérienne ni cible sous protection post-projection.

##### specialBack — Pas d’esquive

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GUSTAVA HEFFNER, préparer « Pas d’esquive » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer l’appui qui produit le déplacement ; pas prudents sans inverser l’étui ni la main forte.

**Action.** Exécuter « Pas d’esquive » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** recul du poignet puis stabilisation du canon. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Protection du passage

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GUSTAVA HEFFNER, préparer « Protection du passage » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Montrer la prise et la visée de l’arme décrite par « Protection du passage » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GUSTAVA HEFFNER, préparer « Recharger » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** recul du poignet puis stabilisation du canon. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Protection du passage — Final

Famille `ballistic`, ton `simulation` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Protection du passage / Pistolet de protection.

Plan 1 : GUSTAVA HEFFNER sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Protection du passage / Pistolet de protection ». Plan 2 : présenter l’arme effectivement associée à « Protection du passage / Pistolet de protection », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : recul du poignet puis stabilisation du canon, pose de signature face à l’adversaire. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Pistolet de protection / Grenade de garde

Famille `ballistic`, ton `simulation` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Protection du passage / Grenade de garde.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Protection du passage / Grenade de garde » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Protection du passage / Grenade de garde », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : recul du poignet puis stabilisation du canon, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Projection de Gustava — Point final

Famille `cqc`, ton `simulation` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Protection du passage / Projection de Gustava.

Plan 1 : approche jusqu’à la distance réelle de « Protection du passage / Projection de Gustava », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Protection du passage / Projection de Gustava », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : recul du poignet puis stabilisation du canon, prise de distance et maintien final. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Lecture rapprochée — Mission close

Famille `capture`, ton `simulation` ; 274 ticks CQC ; phases actuelles : stun → disarm → restrain → extract. Appuis déclarés : Protection du passage / Projection.

Plan 1 : après une observation ou un repli, GUSTAVA HEFFNER reprend l’initiative par « Protection du passage / Projection ». Plan 2 : contact de saisie ou neutralisation lié à « Protection du passage / Projection », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : recul du poignet puis stabilisation du canon, rangement/pose finale différente des trois autres. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Official revised codec face is a later official edition distinct from1990 manual celebrity-like portrait; no appearance alias with another incarnation.
- Tiny original field sprite establishes only broad palette/silhouette. Fine clothing seams, body geometry and absent detail colours are restrained modern interpretation, not certified complete original model.
- Sixteen native keyposes per direction are authored modern gameplay poses.
- [Original Konami revised official portrait and whole original MSX2 game frame physically viewed; unknown fine clothes seams and poses are authored adaptation.](https://www.konami.com/mg/archive/mg2/pic/gustava.gif) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## archive__johnny_mgs1

### JOHNNY SASAKI — MGS1 — MGS1

**Rôle :** Pistolet et défense proche. **Profil :** `pistol`.

**Base présente dans le code :** Garde Genome de MGS1 : armes de dotation, pas l’expérience d’Akiba MGS4.

**Incarnation à conserver :** JohnnySasaki original PS1 prison guard aftertorture, masked presentation; conservative unknowncompletebody adaptation.

**État vérifié :** unattested-body-presentation-reconstruction. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `throw` = throw, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `retro-msx`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** JOHNNY SASAKI — MGS1 : main forte et main de soutien identifiées sur le pistolet, coudes contenus. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas prudents sans inverser l’étui ni la main forte. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Pistolet et défense proche » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder main forte et main de soutien identifiées sur le pistolet, coudes contenus.
- **jump_land :** JOHNNY SASAKI — MGS1 : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas prudents sans inverser l’étui ni la main forte. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de JOHNNY SASAKI — MGS1. Terminer par recul du poignet puis stabilisation du canon. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS1 », présentation de JohnnySasaki original PS1 prison guard aftertorture, masked presentation; conservative unknowncompletebody adaptation., puis main forte et main de soutien identifiées sur le pistolet, coudes contenus. Geste court lié à « Arme de garde » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, recul du poignet puis stabilisation du canon ; JOHNNY SASAKI — MGS1 vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS1.
- **round_loss :** Proposition CQC : JOHNNY SASAKI — MGS1 réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Alarme de cellule », revenir par recul du poignet puis stabilisation du canon, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JOHNNY SASAKI — MGS1, préparer « Jab » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JOHNNY SASAKI — MGS1, préparer « Frappe engagée » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JOHNNY SASAKI — MGS1, préparer « Balayage » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JOHNNY SASAKI — MGS1, préparer « Projection » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recul du poignet puis stabilisation du canon. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Arme de garde

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JOHNNY SASAKI — MGS1, préparer « Arme de garde » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Montrer la prise et la visée de l’arme décrite par « Arme de garde » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Grenade de garde

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JOHNNY SASAKI — MGS1, préparer « Grenade de garde » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Prélever l’objet correspondant à « Grenade de garde », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Crosse maladroite

**Existant :** `melee` / `grapple` ; 10/3/32 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JOHNNY SASAKI — MGS1, préparer « Crosse maladroite » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recul du poignet puis stabilisation du canon. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Hors de portée ou saut ; ne saisir ni cible aérienne ni cible sous protection post-projection.

##### specialBack — Repli de Johnny

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JOHNNY SASAKI — MGS1, préparer « Repli de Johnny » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer l’appui qui produit le déplacement ; pas prudents sans inverser l’étui ni la main forte.

**Action.** Exécuter « Repli de Johnny » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** recul du poignet puis stabilisation du canon. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Alarme de cellule

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JOHNNY SASAKI — MGS1, préparer « Alarme de cellule » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Montrer la prise et la visée de l’arme décrite par « Alarme de cellule » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JOHNNY SASAKI — MGS1, préparer « Recharger » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** recul du poignet puis stabilisation du canon. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Alarme de cellule — Final

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Alarme de cellule / Arme de garde.

Plan 1 : JOHNNY SASAKI — MGS1 sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Alarme de cellule / Arme de garde ». Plan 2 : présenter l’arme effectivement associée à « Alarme de cellule / Arme de garde », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : recul du poignet puis stabilisation du canon, pose de signature face à l’adversaire.

##### Arme de garde / Grenade de garde

Famille `ballistic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Alarme de cellule / Grenade de garde.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Alarme de cellule / Grenade de garde » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Alarme de cellule / Grenade de garde », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : recul du poignet puis stabilisation du canon, arrêt du dispositif et retour au cadre d’ensemble.

##### Crosse maladroite — Point final

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Alarme de cellule / Crosse maladroite.

Plan 1 : approche jusqu’à la distance réelle de « Alarme de cellule / Crosse maladroite », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Alarme de cellule / Crosse maladroite », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : recul du poignet puis stabilisation du canon, prise de distance et maintien final.

##### Lecture rapprochée — Mission close

Famille `ballistic`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Alarme de cellule / Projection.

Plan 1 : après une observation ou un repli, JOHNNY SASAKI — MGS1 reprend l’initiative par « Alarme de cellule / Projection ». Plan 2 : présenter l’arme effectivement associée à « Alarme de cellule / Projection », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : recul du poignet puis stabilisation du canon, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact. This whole-body presentation is explicitly reconstructed from the cited identity/partial appearance evidence; it is not an attested canonical full-body appearance.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- No authentic unobstructed full-body JohnnyPS1 reference was recovered. Prison capture has overlapping models and strong green lighting; exact field-unit variant, face/hair, gunassignment, uniform seams, natural colour and anatomic equipment sides remain unproven.
- Generic Shinkawa GenomeSoldier sheets cannot be certified as a uniquely identified Johnny model; this closest conservative masked body is explicitly qualified project presentation.
- Existing UID/saves/lore and combat mechanics preserved, no alias to later Akiba or grandfather Johnny. Full32native authored poses, no gunflash on emptyhands.
- Original whole video source https://archive.org/download/LP-Metal-Gear-Solid/Metal%20Gear%20Solid%20%232%20-%20Sneak%20That%20Snake%20Snack%20%28Uncut%20Commentary%29-xRPjDeU6srU.mp4 at650/720s supplies only Meryl-worn stolen guard clothing, with female actor deliberately excluded from Johnny anatomy. Exact later male uniform/lower seams remain qualified.
- [Physically viewed whole PS1 prison-cell escape capture identifies overlapping guard upper/lower palette but no unobstructed body; original Shinkawa GenomeSoldier family concept only supplies conservative field-clothing context, not a Johnny-specific finalturnaround. Independently physically viewed PS1 original video630/650/670/720s shows Meryl wearing stolen guard clothing; black cloth mask, collared olive-grey field shirt and dark shoulder harness qualify clothing only, not male Johnny anatomy.](https://samurai-gamers.com/wp-content/uploads/2023/08/Metal-Gear-Solid-MGS-Escaping-the-Cell-using-Ketchup.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## archive__sergei_gurlukovich

### SERGEI GURLUKOVICH — MGS2

**Rôle :** Tir, grenades et distance. **Profil :** `soldier`.

**Base présente dans le code :** Commandant humain du Tanker ; aucun pouvoir de ninja dérivé d’Olga.

**Incarnation à conserver :** Actual released Tanker commanderSergei with shortgreyhair and no ushanka, furcollaredcoat and actualheldpistol.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** SERGEI GURLUKOVICH : appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas courts, crosse/équipement conservés près du torse. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Tir, grenades et distance » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder appui militaire stable, arme maintenue dans l’axe et regard vers la menace.
- **jump_land :** SERGEI GURLUKOVICH : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas courts, crosse/équipement conservés près du torse. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de SERGEI GURLUKOVICH. Terminer par retour en couverture de l’arme après le coup. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS2 », présentation de Actual released Tanker commanderSergei with shortgreyhair and no ushanka, furcollaredcoat and actualheldpistol., puis appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Geste court lié à « Carabine de Sergei » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, retour en couverture de l’arme après le coup ; SERGEI GURLUKOVICH vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS2.
- **round_loss :** Proposition CQC : SERGEI GURLUKOVICH réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Ordre Gurlukovich », revenir par retour en couverture de l’arme après le coup, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SERGEI GURLUKOVICH, préparer « Jab » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SERGEI GURLUKOVICH, préparer « Frappe engagée » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SERGEI GURLUKOVICH, préparer « Balayage » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SERGEI GURLUKOVICH, préparer « Projection » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** retour en couverture de l’arme après le coup. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Carabine de Sergei

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SERGEI GURLUKOVICH, préparer « Carabine de Sergei » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Carabine de Sergei » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Grenade de section

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SERGEI GURLUKOVICH, préparer « Grenade de section » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Prélever l’objet correspondant à « Grenade de section », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Crosse du commandant

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SERGEI GURLUKOVICH, préparer « Crosse du commandant » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Crosse du commandant » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Repli du colonel

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SERGEI GURLUKOVICH, préparer « Repli du colonel » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer l’appui qui produit le déplacement ; pas courts, crosse/équipement conservés près du torse.

**Action.** Exécuter « Repli du colonel » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** retour en couverture de l’arme après le coup. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Ordre Gurlukovich

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SERGEI GURLUKOVICH, préparer « Ordre Gurlukovich » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Ordre Gurlukovich » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SERGEI GURLUKOVICH, préparer « Recharger » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** retour en couverture de l’arme après le coup. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Ordre Gurlukovich — Final

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Ordre Gurlukovich / Carabine de Sergei.

Plan 1 : SERGEI GURLUKOVICH sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Ordre Gurlukovich / Carabine de Sergei ». Plan 2 : présenter l’arme effectivement associée à « Ordre Gurlukovich / Carabine de Sergei », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : retour en couverture de l’arme après le coup, pose de signature face à l’adversaire.

##### Carabine de Sergei / Grenade de section

Famille `ballistic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Ordre Gurlukovich / Grenade de section.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Ordre Gurlukovich / Grenade de section » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Ordre Gurlukovich / Grenade de section », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : retour en couverture de l’arme après le coup, arrêt du dispositif et retour au cadre d’ensemble.

##### Crosse du commandant — Point final

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Ordre Gurlukovich / Crosse du commandant.

Plan 1 : approche jusqu’à la distance réelle de « Ordre Gurlukovich / Crosse du commandant », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Ordre Gurlukovich / Crosse du commandant », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : retour en couverture de l’arme après le coup, prise de distance et maintien final.

##### Sang-froid — Mission close

Famille `ballistic`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Ordre Gurlukovich / Projection.

Plan 1 : après une observation ou un repli, SERGEI GURLUKOVICH reprend l’initiative par « Ordre Gurlukovich / Projection ». Plan 2 : présenter l’arme effectivement associée à « Ordre Gurlukovich / Projection », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : retour en couverture de l’arme après le coup, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Final actualmodel baregreyhair/face/moustache/furcollar and heldgun are documented by largegameframes. Earlier Shinkawa hatconcept and small hatimages are retained as distinctdevelopment/presentation evidence and not substituted.
- Complete coatlength, lowerbody, neutral colours underorangeTankerlamp, detailed back, gunmake/calibre and unseen equipment are not certified. Modestbodydetails are qualified adaptation, no invented Russian gunmodel or Ocelotcoat alias.
- Sixteen nativecompleteposes perdirection are authoredmodern gameplay adaptation, not originalMGS2 animation.
- [Actual full released Tanker cutscene frames77/90, physicallyviewed, clearly show veryshortgreyhair NOushanka, moustache, furcollar and held compact semiautomatic pistol. Older monochrome hat concept/tinyhatthumbnail preserved as contradictoryotherpresentation andexcluded from finalappearance.](https://lparchive.org/Metal-Gear-Solid-2-(Screenshot)/Update%206/mgs2.5_77_231.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## archive__scott_dolph

### SCOTT DOLPH — MGS2

**Rôle :** Tir, grenades et distance. **Profil :** `soldier`.

**Base présente dans le code :** Officier des Marines : armement proposé pour l’exercice, pas un boss surnaturel.

**Incarnation à conserver :** Scott Dolph, final released MGS2 Tanker Marine commandant with original woodland-camouflage field uniform.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `retro-msx`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** SCOTT DOLPH : appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas courts, crosse/équipement conservés près du torse. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Tir, grenades et distance » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder appui militaire stable, arme maintenue dans l’axe et regard vers la menace.
- **jump_land :** SCOTT DOLPH : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas courts, crosse/équipement conservés près du torse. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de SCOTT DOLPH. Terminer par retour en couverture de l’arme après le coup. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS2 », présentation de Scott Dolph, final released MGS2 Tanker Marine commandant with original woodland-camouflage field uniform., puis appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Geste court lié à « Pistolet d’officier » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, retour en couverture de l’arme après le coup ; SCOTT DOLPH vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS2.
- **round_loss :** Proposition CQC : SCOTT DOLPH réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Couverture des Marines », revenir par retour en couverture de l’arme après le coup, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SCOTT DOLPH, préparer « Jab » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SCOTT DOLPH, préparer « Frappe engagée » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SCOTT DOLPH, préparer « Balayage » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SCOTT DOLPH, préparer « Projection » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** retour en couverture de l’arme après le coup. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Pistolet d’officier

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SCOTT DOLPH, préparer « Pistolet d’officier » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Pistolet d’officier » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Grenade de dotation

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SCOTT DOLPH, préparer « Grenade de dotation » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Prélever l’objet correspondant à « Grenade de dotation », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Défense de Dolph

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SCOTT DOLPH, préparer « Défense de Dolph » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Défense de Dolph » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Repli du pont

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SCOTT DOLPH, préparer « Repli du pont » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer l’appui qui produit le déplacement ; pas courts, crosse/équipement conservés près du torse.

**Action.** Exécuter « Repli du pont » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** retour en couverture de l’arme après le coup. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Couverture des Marines

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SCOTT DOLPH, préparer « Couverture des Marines » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Couverture des Marines » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SCOTT DOLPH, préparer « Recharger » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** retour en couverture de l’arme après le coup. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Couverture des Marines — Final

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Couverture des Marines / Pistolet d’officier.

Plan 1 : SCOTT DOLPH sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Couverture des Marines / Pistolet d’officier ». Plan 2 : présenter l’arme effectivement associée à « Couverture des Marines / Pistolet d’officier », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : retour en couverture de l’arme après le coup, pose de signature face à l’adversaire.

##### Pistolet d’officier / Grenade de dotation

Famille `ballistic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Couverture des Marines / Grenade de dotation.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Couverture des Marines / Grenade de dotation » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Couverture des Marines / Grenade de dotation », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : retour en couverture de l’arme après le coup, arrêt du dispositif et retour au cadre d’ensemble.

##### Défense de Dolph — Point final

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Couverture des Marines / Défense de Dolph.

Plan 1 : approche jusqu’à la distance réelle de « Couverture des Marines / Défense de Dolph », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Couverture des Marines / Défense de Dolph », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : retour en couverture de l’arme après le coup, prise de distance et maintien final.

##### Sang-froid — Mission close

Famille `ballistic`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Couverture des Marines / Projection.

Plan 1 : après une observation ou un repli, SCOTT DOLPH reprend l’initiative par « Couverture des Marines / Projection ». Plan 2 : présenter l’arme effectivement associée à « Couverture des Marines / Projection », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : retour en couverture de l’arme après le coup, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Final game whole captures now document woodland camouflage that was not visible in tiny initial references; right-v3 and left-v4 correct the previously plain olive native uniform. Mature Black face, cap, rolled sleeves, bare forearms/hands, belt and anatomical RIGHT closed holster preserved.
- Woodland colours and overall blotch pattern are faithful adaptation of original low-resolution game textures under warm Tanker lighting; exact individual blotch placement, rear seams and high-resolution texture are not a certified turnaround.
- Only a closed holster is drawn. No firearm in hands, no additional rifle, no ballistic flash.
- All prior native sources and batch3/4/5 closures remain immutable. Right-v2 camouflage attempt had an incomplete pose10 lower body and border issues, preserved rejected; right-v3 fresh atlas restores sixteen complete figures. Left-v4 has sixteen complete figures.
- Thirty-two independent keyposes are authored gameplay adaptation, not original MGS2 animation-frame certification.
- [Original releasedMGS2 Tanker whole cutscene captures LPArchive70/84/86 physically viewed establish conventional woodland pattern on cap/rolled-sleeve shirt/trousers. Official Shinkawa concept supports anatomicalRIGHT closed holster and boots. LP mentionsFRAPS, therefore console-specific PS2 origin not certified.](https://lparchive.org/Metal-Gear-Solid-2-(Screenshot)/Update%206/mgs2.5_86_f01.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## archive__chico_pw

### CHICO — PEACE WALKER

**Rôle :** Simulation prudente, pas de super-pouvoirs. **Profil :** `civilian`.

**Base présente dans le code :** Chico enfant : simulation de survie défensive ; ni expert CQC ni fusil de commando.

**Incarnation à conserver :** PW — 1974, child guerrilla support

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, special, specialForward, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `retro-msx`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** CHICO : posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Conserver la taille et la gestuelle de l’enfant ; gestes de simulation/assistance, pas un corps adulte redimensionné.
- **locomotion :** pas hésitants mais lisibles, en conservant l’âge et la stature. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Simulation prudente, pas de super-pouvoirs » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut.
- **jump_land :** CHICO : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas hésitants mais lisibles, en conservant l’âge et la stature. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de CHICO. Terminer par réaction humaine puis reprise d’appui ; combat explicitement simulé. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « PEACE WALKER », présentation de PW — 1974, child guerrilla support, puis posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Geste court lié à « Repousser pour fuir » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, réaction humaine puis reprise d’appui ; combat explicitement simulé ; CHICO vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à PEACE WALKER.
- **round_loss :** Proposition CQC : CHICO réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Issue de secours », revenir par réaction humaine puis reprise d’appui ; combat explicitement simulé, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CHICO, préparer « Jab » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CHICO, préparer « Frappe engagée » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CHICO, préparer « Balayage » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CHICO, préparer « Projection » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Repousser pour fuir

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CHICO, préparer « Repousser pour fuir » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Repousser pour fuir » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialDown — Repérer un passage

**Existant :** `mark` / `recon` ; 26/1/30 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CHICO, préparer « Repérer un passage » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Orienter regard, optique ou terminal vers la cible observée, sans consulter une action future.

**Action.** Pour « Repérer un passage », déclencher lecture/repérage avec un petit geste ou changement d’optique et un indicateur séparé. Le corps doit rester visible et vulnérable selon les données de combat.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé. Couper le signal ou abaisser l’outil ; retour vers l’adversaire sans nouvelle arme inventée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Portée limitée ; le marquage ne vise ni à travers toute l’arène ni automatiquement.

##### specialForward — Bond de fuite

**Existant :** `mobility` / `movement` ; 7/18/25 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CHICO, préparer « Bond de fuite » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Préparer l’appui qui produit le déplacement ; pas hésitants mais lisibles, en conservant l’âge et la stature.

**Action.** Exécuter « Bond de fuite » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 4 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : La silhouette reste touchable ; la sortie est punissable.

##### specialBack — Repli de Chico

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CHICO, préparer « Repli de Chico » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Préparer l’appui qui produit le déplacement ; pas hésitants mais lisibles, en conservant l’âge et la stature.

**Action.** Exécuter « Repli de Chico » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Issue de secours

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CHICO, préparer « Issue de secours » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Issue de secours », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Reprendre son souffle

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CHICO, préparer « Reprendre son souffle » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Reprendre son souffle ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Issue de secours — Final

Famille `cqc`, ton `nonlethal` ; 220 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Issue de secours / Repousser pour fuir.

Plan 1 : CHICO sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Issue de secours / Repousser pour fuir ». Plan 2 : contact de saisie ou neutralisation lié à « Issue de secours / Repousser pour fuir », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : réaction humaine puis reprise d’appui ; combat explicitement simulé, pose de signature face à l’adversaire. Respecter le ton nonlethal enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Repousser pour fuir / Repérer un passage

Famille `cqc`, ton `nonlethal` ; 238 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Issue de secours / Repérer un passage.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Issue de secours / Repérer un passage » ; l’espace disponible doit être lisible. Plan 2 : contact de saisie ou neutralisation lié à « Issue de secours / Repérer un passage », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : réaction humaine puis reprise d’appui ; combat explicitement simulé, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton nonlethal enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Bond de fuite — Point final

Famille `cqc`, ton `nonlethal` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Issue de secours / Bond de fuite.

Plan 1 : approche jusqu’à la distance réelle de « Issue de secours / Bond de fuite », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Issue de secours / Bond de fuite », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : réaction humaine puis reprise d’appui ; combat explicitement simulé, prise de distance et maintien final. Respecter le ton nonlethal enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Simulation prudente — Mission close

Famille `capture`, ton `nonlethal` ; 274 ticks CQC ; phases actuelles : stun → disarm → restrain → extract. Appuis déclarés : Issue de secours / Projection.

Plan 1 : après une observation ou un repli, CHICO reprend l’initiative par « Issue de secours / Projection ». Plan 2 : contact de saisie ou neutralisation lié à « Issue de secours / Projection », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : réaction humaine puis reprise d’appui ; combat explicitement simulé, rangement/pose finale différente des trois autres. Respecter le ton nonlethal enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Sixteen support/unarmed motion keyposes are CQC game adaptations, not source motion capture or original combat moves.
- Generated2.5D presentation seeks close canonical identity/costume/equipment; no absolute1:1 original pixel or material certificate.
- [Downloaded unchanged official full-body character design sheet reproduced by Creative Uncut, physically inspected. Costume, physical anatomy and visible canonical equipment fixed by this source. Generated pose motion remains an authored CQC adaptation.](https://www.creativeuncut.com/gallery-12/mgspw-chico.html) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## archive__ishmael

### ISHMAEL — MGSV

**Rôle :** Infiltration et armes limitées. **Profil :** `infiltrator`.

**Base présente dans le code :** Ishmael blessé dans l’hôpital : endurance et équipement limités, pas bras Rocket Punch.

**Incarnation à conserver :** Ishmael, released MGSV hospital gown/bandages/suppressed pistol incarnation

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, super ; `throw` = throw, specialForward.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `retro-msx`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** ISHMAEL : garde compacte de l’infiltrateur, arme et étuis proches du corps. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** déroulé de pied discret, bassin bas, freinage avant visée. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Infiltration et armes limitées » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder garde compacte de l’infiltrateur, arme et étuis proches du corps.
- **jump_land :** ISHMAEL : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. déroulé de pied discret, bassin bas, freinage avant visée. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de ISHMAEL. Terminer par replacement rapide de la main libre et contrôle du champ. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGSV », présentation de Ishmael, released MGSV hospital gown/bandages/suppressed pistol incarnation, puis garde compacte de l’infiltrateur, arme et étuis proches du corps. Geste court lié à « Pistolet de l’hôpital » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, replacement rapide de la main libre et contrôle du champ ; ISHMAEL vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGSV.
- **round_loss :** Proposition CQC : ISHMAEL réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Sortie de l’hôpital », revenir par replacement rapide de la main libre et contrôle du champ, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ISHMAEL, préparer « Jab » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** replacement rapide de la main libre et contrôle du champ.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ISHMAEL, préparer « Frappe engagée » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** replacement rapide de la main libre et contrôle du champ.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ISHMAEL, préparer « Balayage » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** replacement rapide de la main libre et contrôle du champ.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ISHMAEL, préparer « Projection » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** replacement rapide de la main libre et contrôle du champ. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Pistolet de l’hôpital

**Existant :** `projectile` / `tranq` ; 19/1/29 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ISHMAEL, préparer « Pistolet de l’hôpital » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Montrer la prise et la visée de l’arme décrite par « Pistolet de l’hôpital » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** replacement rapide de la main libre et contrôle du champ. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Se baisser, bloquer ; la somnolence décroît et ne provoque pas de K.O. instantané.

##### specialDown — Diversion de couloir

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ISHMAEL, préparer « Diversion de couloir » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Prélever l’objet correspondant à « Diversion de couloir », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** replacement rapide de la main libre et contrôle du champ. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Saisie de secours

**Existant :** `melee` / `grapple` ; 10/3/32 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ISHMAEL, préparer « Saisie de secours » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** replacement rapide de la main libre et contrôle du champ. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Hors de portée ou saut ; ne saisir ni cible aérienne ni cible sous protection post-projection.

##### specialBack — Repli sous bandages

**Existant :** `buff` / `stealth` ; 19/1/27 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ISHMAEL, préparer « Repli sous bandages » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Montrer la préparation corporelle ou mécanique de « Repli sous bandages ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** replacement rapide de la main libre et contrôle du champ. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Silhouette translucide, collision intacte ; une attaque ou un impact brise le camouflage.

##### super — Sortie de l’hôpital

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ISHMAEL, préparer « Sortie de l’hôpital » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Sortie de l’hôpital », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** replacement rapide de la main libre et contrôle du champ.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ISHMAEL, préparer « Recharger » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** replacement rapide de la main libre et contrôle du champ. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Sortie de l’hôpital — Final

Famille `cqc`, ton `stylized` ; 220 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Sortie de l’hôpital / Pistolet de l’hôpital.

Plan 1 : ISHMAEL sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Sortie de l’hôpital / Pistolet de l’hôpital ». Plan 2 : contact de saisie ou neutralisation lié à « Sortie de l’hôpital / Pistolet de l’hôpital », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : replacement rapide de la main libre et contrôle du champ, pose de signature face à l’adversaire.

##### Pistolet de l’hôpital / Diversion de couloir

Famille `capture`, ton `stylized` ; 238 ticks CQC ; phases actuelles : stun → disarm → restrain → extract. Appuis déclarés : Sortie de l’hôpital / Diversion de couloir.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Sortie de l’hôpital / Diversion de couloir » ; l’espace disponible doit être lisible. Plan 2 : contact de saisie ou neutralisation lié à « Sortie de l’hôpital / Diversion de couloir », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : replacement rapide de la main libre et contrôle du champ, arrêt du dispositif et retour au cadre d’ensemble.

##### Saisie de secours — Point final

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Sortie de l’hôpital / Saisie de secours.

Plan 1 : approche jusqu’à la distance réelle de « Sortie de l’hôpital / Saisie de secours », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Sortie de l’hôpital / Saisie de secours », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : replacement rapide de la main libre et contrôle du champ, prise de distance et maintien final.

##### Lecture rapprochée — Mission close

Famille `cqc`, ton `stylized` ; 274 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Sortie de l’hôpital / Projection.

Plan 1 : après une observation ou un repli, ISHMAEL reprend l’initiative par « Sortie de l’hôpital / Projection ». Plan 2 : contact de saisie ou neutralisation lié à « Sortie de l’hôpital / Projection », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : replacement rapide de la main libre et contrôle du champ, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Primary released fullbody CGI weapon and costume followed; original back-open hospital gown is adapted modestly with overlap in authored side poses.
- Source-attested firearm stays anatomical right hand across separately drawn facings; exact commercial model not independently certified.
- Support/combat gestures authored, native pixel costume markings not certified.
- Native left-v2 places the horizontal suppressed aim in physical pose10 and support gesture in11; explicit facing-specific presentation groups use measured original poses, no atlas pixels reordered.
- [Original complete Konami/Shinkawa character sheet physically viewed; full-body released CGI inset primary, unused concept variations explicitly excluded.](https://www.creativeuncut.com/gallery-27/mgs5-ishmael-concept.html) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).
