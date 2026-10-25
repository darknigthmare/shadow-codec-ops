# Animations — COMPLÉMENTS 0.40

**10 acteurs du registre courant.** Les titres d’actions et paramètres sont observés ; les descriptions sont des propositions CQC à produire et valider. Un groupe de frames existant ne certifie pas l’ensemble du mouvement ou sa fidélité originale.

[Index des fiches](README.md) · [Contrat commun](../04_ANIMATIONS_SPRITES.md)

## Sommaire

- [BIG BOSS — ÉPILOGUE](#completion__big_boss_epilogue) — MGS4
- [METAL GEAR MK. II](#completion__mk2_mgs4) — MGS4
- [METAL GEAR MK. III](#completion__mk3_mgs4) — MGS4
- [GEKKO — SIMULATION](#completion__gekko_mgs4) — MGS4
- [DWARF GEKKO — UNITÉ](#completion__dwarf_gekko_mgs4) — MGS4
- [LITTLE GRAY](#completion__little_gray_mgs4) — MGS4
- [GARY MURRAY](#completion__gary_murray) — AC!D
- [FLEMMING](#completion__flemming_acid) — AC!D
- [DALTON — AC!D 2](#completion__dalton_acid2) — AC!D 2
- [WISEMAN](#completion__wiseman_acid2) — AC!D 2

## completion__big_boss_epilogue

### BIG BOSS — ÉPILOGUE — MGS4

**Rôle :** Mains nues et endurance du vétéran. **Profil :** `brawler`.

**Base présente dans le code :** Final elderly MGS4 brown coat/trousers/low shoes, gray hair/beard, anatomical-right missing patched eye. Hands/CQC/cigar only; no unproven pistol/rifle, grenade, fiery cigar attack, Venom prosthesis or horn. Reduced endurance and recovery are authored; no rejuvenation or supernatural healing. Final native action map pending; use actual hand contact/guard/recover groups, not a gun because a group is named shoot. Les contacts, collisions, jauges, coûts, durées et cadences sont des adaptations du versus, pas des valeurs des jeux originaux.

**Incarnation à conserver :** 2014 elderly BigBoss of the original2008PS3 graveyard epilogue

**État vérifié :** métadonnées natives avec limites. 72 régions source distinctes dans les deux directions ; groupes : idle, walk, guard, crouch, punch, heavy, low, jump, throw, reload, recover, hit, ko, charge, attack.

**Réemplois à examiner :** `low` = low, specialDown ; `throw` = throw, specialForward ; `charge` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** BIG BOSS — ÉPILOGUE : poids sur les jambes, épaules engagées, mains prêtes. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** transfert lourd mais anatomique, freinage par un appui réel. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Mains nues et endurance du vétéran » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder poids sur les jambes, épaules engagées, mains prêtes.
- **jump_land :** BIG BOSS — ÉPILOGUE : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. transfert lourd mais anatomique, freinage par un appui réel. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de BIG BOSS — ÉPILOGUE. Terminer par rétablir bassin et épaules après l’élan. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS4 », présentation de 2014 elderly BigBoss of the original2008PS3 graveyard epilogue, puis poids sur les jambes, épaules engagées, mains prêtes. Geste court lié à « Contact du vétéran — adaptation » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, rétablir bassin et épaules après l’élan ; BIG BOSS — ÉPILOGUE vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS4.
- **round_loss :** Proposition CQC : BIG BOSS — ÉPILOGUE réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Dernière leçon », revenir par rétablir bassin et épaules après l’élan, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BIG BOSS — ÉPILOGUE, préparer « Jab » ; poids sur les jambes, épaules engagées, mains prêtes. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** rétablir bassin et épaules après l’élan.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BIG BOSS — ÉPILOGUE, préparer « Frappe engagée » ; poids sur les jambes, épaules engagées, mains prêtes. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** rétablir bassin et épaules après l’élan.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BIG BOSS — ÉPILOGUE, préparer « Balayage » ; poids sur les jambes, épaules engagées, mains prêtes. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** rétablir bassin et épaules après l’élan.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BIG BOSS — ÉPILOGUE, préparer « Projection » ; poids sur les jambes, épaules engagées, mains prêtes. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** rétablir bassin et épaules après l’élan. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Contact du vétéran — adaptation

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `charge`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BIG BOSS — ÉPILOGUE, préparer « Contact du vétéran — adaptation » ; poids sur les jambes, épaules engagées, mains prêtes. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Contact du vétéran — adaptation » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** rétablir bassin et épaules après l’élan.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Adaptation du versus : préparation et sortie visibles, garde/saut/espacement adaptés au geste ; aucune invincibilité ou arme supplémentaire.

##### specialDown — Balayage final

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BIG BOSS — ÉPILOGUE, préparer « Balayage final » ; poids sur les jambes, épaules engagées, mains prêtes. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** rétablir bassin et épaules après l’élan.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### specialForward — Saisie du mentor

**Existant :** `melee` / `grapple` ; 10/3/32 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BIG BOSS — ÉPILOGUE, préparer « Saisie du mentor » ; poids sur les jambes, épaules engagées, mains prêtes. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** rétablir bassin et épaules après l’élan. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Hors de portée ou saut ; ne saisir ni cible aérienne ni cible sous protection post-projection.

##### specialBack — Contre fatigué

**Existant :** `parry` / `counter` ; 3/10/29 ticks ; groupe `guard`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BIG BOSS — ÉPILOGUE, préparer « Contre fatigué » ; poids sur les jambes, épaules engagées, mains prêtes. Présenter la surface ou l’organe de parade et maintenir une fenêtre courte lisible.

**Action.** Recevoir puis dévier au contact réel pour « Contre fatigué » ; la riposte et son effet n’apparaissent qu’après succès. Une attente sans contact garde une pose différente du contre réussi.

**Retour.** rétablir bassin et épaules après l’élan. Séparer sortie ratée, blocage simple et riposte ; aucun effet de réussite avant collision.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Retarder la frappe, projeter ou attendre les 29 images de récupération.

##### super — Dernière leçon

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `charge`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BIG BOSS — ÉPILOGUE, préparer « Dernière leçon » ; poids sur les jambes, épaules engagées, mains prêtes. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Dernière leçon », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** rétablir bassin et épaules après l’élan.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Reprendre son souffle

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `reload`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BIG BOSS — ÉPILOGUE, préparer « Reprendre son souffle » ; poids sur les jambes, épaules engagées, mains prêtes. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Reprendre son souffle ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** rétablir bassin et épaules après l’élan. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Contact du vétéran — adaptation — conclusion adaptée

Famille `cqc`, ton `stylized` ; 220 ticks CQC ; phases actuelles : prepare → contact → confirm → pose. Appuis déclarés : Contact du vétéran — adaptation.

Plan 1 : BIG BOSS — ÉPILOGUE sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Contact du vétéran — adaptation ». Plan 2 : contact de saisie ou neutralisation lié à « Contact du vétéran — adaptation », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : rétablir bassin et épaules après l’élan, pose de signature face à l’adversaire.

##### Balayage final — conclusion adaptée

Famille `cqc`, ton `stylized` ; 238 ticks CQC ; phases actuelles : prepare → contact → confirm → pose. Appuis déclarés : Balayage final.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Balayage final » ; l’espace disponible doit être lisible. Plan 2 : contact de saisie ou neutralisation lié à « Balayage final », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : rétablir bassin et épaules après l’élan, arrêt du dispositif et retour au cadre d’ensemble.

##### Saisie du mentor — conclusion adaptée

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : prepare → contact → confirm → pose. Appuis déclarés : Saisie du mentor.

Plan 1 : approche jusqu’à la distance réelle de « Saisie du mentor », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Saisie du mentor », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : rétablir bassin et épaules après l’élan, prise de distance et maintien final.

##### Projection — conclusion adaptée

Famille `cqc`, ton `stylized` ; 274 ticks CQC ; phases actuelles : prepare → contact → confirm → pose. Appuis déclarés : Projection.

Plan 1 : après une observation ou un repli, BIG BOSS — ÉPILOGUE reprend l’initiative par « Projection ». Plan 2 : contact de saisie ou neutralisation lié à « Projection », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : rétablir bassin et épaules après l’élan, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Original elderly BigBoss from final MGS4 epilogue, distinct from OldSnake/SolidSnake. Actual source final character render and Shinkawa original concept physically viewed, brown closed coat/trousers/low shoes selected. Concept tall boots and variable sketch-side patch excluded from final adaptation.
- CreativeUncut redistributes original Konami/Shinkawa artwork; source is not an actual captured PS3 framebuffer or measured game-mesh topology. The final small3D costume render and original face concept support age, silhouette and palette.
- Anatomical RIGHT eyepatch stays on right: selected screen-right A03/B02/C02 show unpatched camera-near LEFT eye; left A02/B02/C02 show right-eye patch. A_RIGHT01 and A_RIGHT02 near-eye-patch errors are rejected and retained unchanged. A_LEFT01 and B_RIGHT01 server output moderation-other rejections had no source bytes and are retained as failure receipts.
- Selected A_RIGHT03 is a new imagegen-native regeneration from rejected A_RIGHT02 appearance with corrected visible eye; no raster mirror, Python retouching/crop/resize or source byte editing. Rejected generic source remains adaptation only, never promoted as canon.
- All72 unique complete bodies and shoes/coats/hands physically viewed in all6 sourcePNG: A3idle/3walk/3guard/3crouch, B3punch/3heavy/3low/3jump, C3special-unarmed-palm/3throw/3utility-breath/3recover. These are newly authored restrained Versus poses, not original PS3 keyframes or canonical full fighting-game proficiency.
- No handgun, rifle, prosthetic hand, horn, armour, imported FOX/MSF gear or cigar added. SourceC charge group is empty-handed veteran palmCQC; legacy native keyreload names the authored utility breath gesture and does not prove weapon/ammunition.
- Raw profilebrawler is melee/recovery. Any historical projectile, grenade or firearm origin must remain absent. Utility recuperation uses nativeC6..8breath, sourceC9..11kneel/recover supports restrained downstatealiases. Root owns gameplay behavior/phase/contact and exact integration.
- Fixed observed source standing heights preserve lowered poses actual proportions. Canvas component rectangles and any contour stencil are metadata only, sourcePNG bytes unchanged.
- Target1:1 originalincarnation fidelity remains closest_supported generated adaptation; exact face-material/garment-topology/keyframe/pixel match and absolute1to1Certified are false. Root independent final source/reference review remains required before append.
- Generated combat phases and calibrated versus parameters are authored adaptations, not extracted original game animations or absolute pixel/model1:1 certification.
- [Référence déclarée](https://www.creativeuncut.com/gallery-06/art/mgs4-big-boss-character-art.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Référence déclarée](https://www.creativeuncut.com/gallery-06/art/mgs4-big-boss-illust.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## completion__mk2_mgs4

### METAL GEAR MK. II — MGS4

**Rôle :** Reconnaissance robotique et électrode. **Profil :** `small_drone`.

**Base présente dans le code :** Mk.II : reconnaissance, camouflage et électrode ; pas de canon lourd.

**Incarnation à conserver :** Mk.II : reconnaissance, camouflage et électrode ; pas de canon lourd.

**État vérifié :** route machine effectivement déclarée ; animations d’articulation à contrôler. Une route machine est déclarée dans le runtime. Ses articulations remplacent le catalogue de corps contrôlé ; ce n’est pas un constat de sprite absent.

**Réemplois à examiner :** pas de groupe natif partagé observé dans cette extraction.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** METAL GEAR MK. II : châssis, jambes/roues et module optique correctement orientés. Petits ajustements mécaniques des organes présents et optique stable ; aucune respiration humaine. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** cycle de locomotion mécanique ; pas de genoux humains. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Reconnaissance robotique et électrode » : orientation défensive du châssis, des membres ou de la protection effectivement présente ; pas d’avant-bras humain ajouté ; recul bloqué distinct de la simple position basse. Garder châssis, jambes/roues et module optique correctement orientés.
- **jump_land :** METAL GEAR MK. II : départ par poussée ou articulation autorisée, déplacement aérien puis stabilisation et reprise d’appui ; les appareils volants gardent leur mode de sustentation. cycle de locomotion mécanique ; pas de genoux humains. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Secousse du châssis et de l’organe touché de METAL GEAR MK. II, déséquilibre, arrêt puis remise en position par ses articulations réelles. Terminer par retour de l’outil ou de la caméra sur sa charnière. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS4 », présentation de Mk.II : reconnaissance, camouflage et électrode ; pas de canon lourd., puis châssis, jambes/roues et module optique correctement orientés. Geste court lié à « Électrode Mk.II » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, retour de l’outil ou de la caméra sur sa charnière ; METAL GEAR MK. II vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS4.
- **round_loss :** Proposition CQC : METAL GEAR MK. II interrompt ses émissions, absorbe l’oscillation de sa masse, stabilise ses appuis ou son vol, puis replace ses organes ; aucune régénération gratuite. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Impulsion de secours », revenir par retour de l’outil ou de la caméra sur sa charnière, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Contact du bras

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de METAL GEAR MK. II, préparer « Contact du bras » ; châssis, jambes/roues et module optique correctement orientés. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Contact du bras » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour de l’outil ou de la caméra sur sa charnière.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Impulsion du bras

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de METAL GEAR MK. II, préparer « Impulsion du bras » ; châssis, jambes/roues et module optique correctement orientés. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Impulsion du bras », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retour de l’outil ou de la caméra sur sa charnière.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de METAL GEAR MK. II, préparer « Balayage » ; châssis, jambes/roues et module optique correctement orientés. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** retour de l’outil ou de la caméra sur sa charnière.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Poussée du châssis

**Existant :** `melee` / `strike` ; 13/4/32 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de METAL GEAR MK. II, préparer « Poussée du châssis » ; châssis, jambes/roues et module optique correctement orientés. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Poussée du châssis » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour de l’outil ou de la caméra sur sa charnière.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### special — Électrode Mk.II

**Existant :** `melee` / `electric` ; 17/5/29 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de METAL GEAR MK. II, préparer « Électrode Mk.II » ; châssis, jambes/roues et module optique correctement orientés. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Électrode Mk.II » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense. L’effet electric reste séparé du membre ; son apparition et sa disparition suivent les événements du profil.

**Retour.** retour de l’outil ou de la caméra sur sa charnière.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Espacement ou garde ; choc bref avec résistance temporaire après application.

##### specialDown — Caméra Mk.II

**Existant :** `mark` / `recon` ; 26/1/30 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de METAL GEAR MK. II, préparer « Caméra Mk.II » ; châssis, jambes/roues et module optique correctement orientés. Orienter regard, optique ou terminal vers la cible observée, sans consulter une action future.

**Action.** Pour « Caméra Mk.II », déclencher lecture/repérage avec un petit geste ou changement d’optique et un indicateur séparé. Le corps doit rester visible et vulnérable selon les données de combat.

**Retour.** retour de l’outil ou de la caméra sur sa charnière. Couper le signal ou abaisser l’outil ; retour vers l’adversaire sans nouvelle arme inventée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Portée limitée ; le marquage ne vise ni à travers toute l’arène ni automatiquement.

##### specialForward — Camouflage Mk.II

**Existant :** `buff` / `stealth` ; 19/1/27 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de METAL GEAR MK. II, préparer « Camouflage Mk.II » ; châssis, jambes/roues et module optique correctement orientés. Montrer la préparation corporelle ou mécanique de « Camouflage Mk.II ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** retour de l’outil ou de la caméra sur sa charnière. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Silhouette translucide, collision intacte ; une attaque ou un impact brise le camouflage.

##### specialBack — Retrait du Mk.II

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de METAL GEAR MK. II, préparer « Retrait du Mk.II » ; châssis, jambes/roues et module optique correctement orientés. Préparer l’appui qui produit le déplacement ; cycle de locomotion mécanique ; pas de genoux humains.

**Action.** Exécuter « Retrait du Mk.II » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** retour de l’outil ou de la caméra sur sa charnière. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Impulsion de secours

**Existant :** `melee` / `electric` ; 25/1/34 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de METAL GEAR MK. II, préparer « Impulsion de secours » ; châssis, jambes/roues et module optique correctement orientés. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Impulsion de secours », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan. L’effet electric reste séparé du membre ; son apparition et sa disparition suivent les événements du profil.

**Retour.** retour de l’outil ou de la caméra sur sa charnière.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde ; l’EMP ouvre les défenses des machines sans les désactiver définitivement.

##### utility — Recharge de la batterie

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de METAL GEAR MK. II, préparer « Recharge de la batterie » ; châssis, jambes/roues et module optique correctement orientés. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Recharge de la batterie ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** retour de l’outil ou de la caméra sur sa charnière. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Electrode Shutdown

Famille `electric`, ton `stylized` ; 220 ticks CQC ; phases actuelles : charge → arc → overload → shutdown. Appuis déclarés : Impulsion de secours / Électrode Mk.II.

Plan 1 : METAL GEAR MK. II sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Impulsion de secours / Électrode Mk.II ». Plan 2 : montrer la source corporelle ou matérielle de « Impulsion de secours / Électrode Mk.II ». Plan 3 : développer l’effet electric en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : retour de l’outil ou de la caméra sur sa charnière, pose de signature face à l’adversaire.

##### Stealth Cable

Famille `electric`, ton `stylized` ; 238 ticks CQC ; phases actuelles : charge → arc → overload → shutdown. Appuis déclarés : Impulsion de secours / Caméra Mk.II.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Impulsion de secours / Caméra Mk.II » ; l’espace disponible doit être lisible. Plan 2 : montrer la source corporelle ou matérielle de « Impulsion de secours / Caméra Mk.II ». Plan 3 : développer l’effet electric en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : retour de l’outil ou de la caméra sur sa charnière, arrêt du dispositif et retour au cadre d’ensemble.

##### Mk.II Recon

Famille `mechanical`, ton `stylized` ; 256 ticks CQC ; phases actuelles : lock → barrage → core → shutdown. Appuis déclarés : Impulsion de secours / Camouflage Mk.II.

Plan 1 : approche jusqu’à la distance réelle de « Impulsion de secours / Camouflage Mk.II », arme et main libre identifiées. Plan 2 : cycle de locomotion mécanique ; pas de genoux humains ; montrer l’organe de « Impulsion de secours / Camouflage Mk.II ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : retour de l’outil ou de la caméra sur sa charnière, prise de distance et maintien final.

##### Nomad Retrieval

Famille `mechanical`, ton `stylized` ; 274 ticks CQC ; phases actuelles : lock → barrage → core → shutdown. Appuis déclarés : Impulsion de secours / Poussée du châssis.

Plan 1 : après une observation ou un repli, METAL GEAR MK. II reprend l’initiative par « Impulsion de secours / Poussée du châssis ». Plan 2 : cycle de locomotion mécanique ; pas de genoux humains ; montrer l’organe de « Impulsion de secours / Poussée du châssis ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : retour de l’outil ou de la caméra sur sa charnière, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Aucun pouvoir importé d’une autre incarnation.
- Aucune invulnérabilité permanente, saisie infinie ou contrôle des touches adverses.
- Drone d’observation : canon, railgun et saisie humaine exclus.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## completion__mk3_mgs4

### METAL GEAR MK. III — MGS4

**Rôle :** Reconnaissance robotique et électrode. **Profil :** `small_drone`.

**Base présente dans le code :** Mk.III poursuit la fonction du Mk.II ; différence de preset, pas armement lourd inventé.

**Incarnation à conserver :** Mk.III poursuit la fonction du Mk.II ; différence de preset, pas armement lourd inventé.

**État vérifié :** route machine effectivement déclarée ; animations d’articulation à contrôler. Une route machine est déclarée dans le runtime. Ses articulations remplacent le catalogue de corps contrôlé ; ce n’est pas un constat de sprite absent.

**Réemplois à examiner :** pas de groupe natif partagé observé dans cette extraction.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** METAL GEAR MK. III : châssis, jambes/roues et module optique correctement orientés. Petits ajustements mécaniques des organes présents et optique stable ; aucune respiration humaine. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** cycle de locomotion mécanique ; pas de genoux humains. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Reconnaissance robotique et électrode » : orientation défensive du châssis, des membres ou de la protection effectivement présente ; pas d’avant-bras humain ajouté ; recul bloqué distinct de la simple position basse. Garder châssis, jambes/roues et module optique correctement orientés.
- **jump_land :** METAL GEAR MK. III : départ par poussée ou articulation autorisée, déplacement aérien puis stabilisation et reprise d’appui ; les appareils volants gardent leur mode de sustentation. cycle de locomotion mécanique ; pas de genoux humains. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Secousse du châssis et de l’organe touché de METAL GEAR MK. III, déséquilibre, arrêt puis remise en position par ses articulations réelles. Terminer par retour de l’outil ou de la caméra sur sa charnière. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS4 », présentation de Mk.III poursuit la fonction du Mk.II ; différence de preset, pas armement lourd inventé., puis châssis, jambes/roues et module optique correctement orientés. Geste court lié à « Électrode Mk.III » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, retour de l’outil ou de la caméra sur sa charnière ; METAL GEAR MK. III vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS4.
- **round_loss :** Proposition CQC : METAL GEAR MK. III interrompt ses émissions, absorbe l’oscillation de sa masse, stabilise ses appuis ou son vol, puis replace ses organes ; aucune régénération gratuite. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Signal du Nomad », revenir par retour de l’outil ou de la caméra sur sa charnière, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Contact du bras

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de METAL GEAR MK. III, préparer « Contact du bras » ; châssis, jambes/roues et module optique correctement orientés. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Contact du bras » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour de l’outil ou de la caméra sur sa charnière.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Impulsion du bras

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de METAL GEAR MK. III, préparer « Impulsion du bras » ; châssis, jambes/roues et module optique correctement orientés. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Impulsion du bras », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retour de l’outil ou de la caméra sur sa charnière.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de METAL GEAR MK. III, préparer « Balayage » ; châssis, jambes/roues et module optique correctement orientés. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** retour de l’outil ou de la caméra sur sa charnière.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Poussée du châssis

**Existant :** `melee` / `strike` ; 13/4/32 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de METAL GEAR MK. III, préparer « Poussée du châssis » ; châssis, jambes/roues et module optique correctement orientés. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Poussée du châssis » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour de l’outil ou de la caméra sur sa charnière.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### special — Électrode Mk.III

**Existant :** `melee` / `electric` ; 17/5/29 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de METAL GEAR MK. III, préparer « Électrode Mk.III » ; châssis, jambes/roues et module optique correctement orientés. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Électrode Mk.III » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense. L’effet electric reste séparé du membre ; son apparition et sa disparition suivent les événements du profil.

**Retour.** retour de l’outil ou de la caméra sur sa charnière.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Espacement ou garde ; choc bref avec résistance temporaire après application.

##### specialDown — Caméra Mk.III

**Existant :** `mark` / `recon` ; 26/1/30 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de METAL GEAR MK. III, préparer « Caméra Mk.III » ; châssis, jambes/roues et module optique correctement orientés. Orienter regard, optique ou terminal vers la cible observée, sans consulter une action future.

**Action.** Pour « Caméra Mk.III », déclencher lecture/repérage avec un petit geste ou changement d’optique et un indicateur séparé. Le corps doit rester visible et vulnérable selon les données de combat.

**Retour.** retour de l’outil ou de la caméra sur sa charnière. Couper le signal ou abaisser l’outil ; retour vers l’adversaire sans nouvelle arme inventée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Portée limitée ; le marquage ne vise ni à travers toute l’arène ni automatiquement.

##### specialForward — Camouflage Mk.III

**Existant :** `buff` / `stealth` ; 19/1/27 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de METAL GEAR MK. III, préparer « Camouflage Mk.III » ; châssis, jambes/roues et module optique correctement orientés. Montrer la préparation corporelle ou mécanique de « Camouflage Mk.III ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** retour de l’outil ou de la caméra sur sa charnière. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Silhouette translucide, collision intacte ; une attaque ou un impact brise le camouflage.

##### specialBack — Retrait du Mk.III

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de METAL GEAR MK. III, préparer « Retrait du Mk.III » ; châssis, jambes/roues et module optique correctement orientés. Préparer l’appui qui produit le déplacement ; cycle de locomotion mécanique ; pas de genoux humains.

**Action.** Exécuter « Retrait du Mk.III » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** retour de l’outil ou de la caméra sur sa charnière. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Signal du Nomad

**Existant :** `melee` / `electric` ; 25/1/34 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de METAL GEAR MK. III, préparer « Signal du Nomad » ; châssis, jambes/roues et module optique correctement orientés. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Signal du Nomad », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan. L’effet electric reste séparé du membre ; son apparition et sa disparition suivent les événements du profil.

**Retour.** retour de l’outil ou de la caméra sur sa charnière.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde ; l’EMP ouvre les défenses des machines sans les désactiver définitivement.

##### utility — Recharge de la batterie

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de METAL GEAR MK. III, préparer « Recharge de la batterie » ; châssis, jambes/roues et module optique correctement orientés. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Recharge de la batterie ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** retour de l’outil ou de la caméra sur sa charnière. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Mk.III Shock

Famille `electric`, ton `stylized` ; 220 ticks CQC ; phases actuelles : charge → arc → overload → shutdown. Appuis déclarés : Signal du Nomad / Électrode Mk.III.

Plan 1 : METAL GEAR MK. III sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Signal du Nomad / Électrode Mk.III ». Plan 2 : montrer la source corporelle ou matérielle de « Signal du Nomad / Électrode Mk.III ». Plan 3 : développer l’effet electric en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : retour de l’outil ou de la caméra sur sa charnière, pose de signature face à l’adversaire.

##### Sunny Link

Famille `electric`, ton `stylized` ; 238 ticks CQC ; phases actuelles : charge → arc → overload → shutdown. Appuis déclarés : Signal du Nomad / Caméra Mk.III.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Signal du Nomad / Caméra Mk.III » ; l’espace disponible doit être lisible. Plan 2 : montrer la source corporelle ou matérielle de « Signal du Nomad / Caméra Mk.III ». Plan 3 : développer l’effet electric en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : retour de l’outil ou de la caméra sur sa charnière, arrêt du dispositif et retour au cadre d’ensemble.

##### Stealth Relay

Famille `mechanical`, ton `stylized` ; 256 ticks CQC ; phases actuelles : lock → barrage → core → shutdown. Appuis déclarés : Signal du Nomad / Camouflage Mk.III.

Plan 1 : approche jusqu’à la distance réelle de « Signal du Nomad / Camouflage Mk.III », arme et main libre identifiées. Plan 2 : cycle de locomotion mécanique ; pas de genoux humains ; montrer l’organe de « Signal du Nomad / Camouflage Mk.III ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : retour de l’outil ou de la caméra sur sa charnière, prise de distance et maintien final.

##### System Secure

Famille `mechanical`, ton `stylized` ; 274 ticks CQC ; phases actuelles : lock → barrage → core → shutdown. Appuis déclarés : Signal du Nomad / Poussée du châssis.

Plan 1 : après une observation ou un repli, METAL GEAR MK. III reprend l’initiative par « Signal du Nomad / Poussée du châssis ». Plan 2 : cycle de locomotion mécanique ; pas de genoux humains ; montrer l’organe de « Signal du Nomad / Poussée du châssis ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : retour de l’outil ou de la caméra sur sa charnière, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Aucun pouvoir importé d’une autre incarnation.
- Aucune invulnérabilité permanente, saisie infinie ou contrôle des touches adverses.
- Drone d’observation : canon, railgun et saisie humaine exclus.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## completion__gekko_mgs4

### GEKKO — SIMULATION — MGS4

**Rôle :** Pattes organiques et armement de machine. **Profil :** `gekko`.

**Base présente dans le code :** Gekko ramené à l’échelle duel ; membres et mitrailleuse, pas Super nucléaire.

**Incarnation à conserver :** Gekko ramené à l’échelle duel ; membres et mitrailleuse, pas Super nucléaire.

**État vérifié :** route machine effectivement déclarée ; animations d’articulation à contrôler. Une route machine est déclarée dans le runtime. Ses articulations remplacent le catalogue de corps contrôlé ; ce n’est pas un constat de sprite absent.

**Réemplois à examiner :** pas de groupe natif partagé observé dans cette extraction.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** GEKKO — SIMULATION : jambes biologiques et tête/châssis de Gekko, arme sur son montage. Petits ajustements mécaniques des organes présents et optique stable ; aucune respiration humaine. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** foulées lourdes et contact des pieds ; aucun cycle humanoïde de bras. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Pattes organiques et armement de machine » : orientation défensive du châssis, des membres ou de la protection effectivement présente ; pas d’avant-bras humain ajouté ; recul bloqué distinct de la simple position basse. Garder jambes biologiques et tête/châssis de Gekko, arme sur son montage.
- **jump_land :** GEKKO — SIMULATION : départ par poussée ou articulation autorisée, déplacement aérien puis stabilisation et reprise d’appui ; les appareils volants gardent leur mode de sustentation. foulées lourdes et contact des pieds ; aucun cycle humanoïde de bras. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Secousse du châssis et de l’organe touché de GEKKO — SIMULATION, déséquilibre, arrêt puis remise en position par ses articulations réelles. Terminer par recul du châssis et retour de tourelle. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS4 », présentation de Gekko ramené à l’échelle duel ; membres et mitrailleuse, pas Super nucléaire., puis jambes biologiques et tête/châssis de Gekko, arme sur son montage. Geste court lié à « Mitrailleuse du Gekko » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, recul du châssis et retour de tourelle ; GEKKO — SIMULATION vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS4.
- **round_loss :** Proposition CQC : GEKKO — SIMULATION interrompt ses émissions, absorbe l’oscillation de sa masse, stabilise ses appuis ou son vol, puis replace ses organes ; aucune régénération gratuite. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Choc du Gekko », revenir par recul du châssis et retour de tourelle, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de GEKKO — SIMULATION, préparer « Jab » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul du châssis et retour de tourelle.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de GEKKO — SIMULATION, préparer « Frappe engagée » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** recul du châssis et retour de tourelle.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de GEKKO — SIMULATION, préparer « Balayage » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** recul du châssis et retour de tourelle.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Poussée du châssis

**Existant :** `melee` / `strike` ; 13/4/32 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de GEKKO — SIMULATION, préparer « Poussée du châssis » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Poussée du châssis » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul du châssis et retour de tourelle.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### special — Mitrailleuse du Gekko

**Existant :** `projectile` / `ballistic` ; 22/1/36 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de GEKKO — SIMULATION, préparer « Mitrailleuse du Gekko » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Montrer la prise et la visée de l’arme décrite par « Mitrailleuse du Gekko » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 4 émissions, espacées de 5 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** recul du châssis et retour de tourelle. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 4 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### specialDown — Balayage des pattes

**Existant :** `melee` / `kick` ; 16/5/29 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de GEKKO — SIMULATION, préparer « Balayage des pattes » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** recul du châssis et retour de tourelle. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; menace horizontale, pas un anti-aérien universel.

##### specialForward — Piétinement

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de GEKKO — SIMULATION, préparer « Piétinement » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Piétinement » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul du châssis et retour de tourelle.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Posture ancrée

**Existant :** `buff` / `armor` ; 22/1/31 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de GEKKO — SIMULATION, préparer « Posture ancrée » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Montrer la préparation corporelle ou mécanique de « Posture ancrée ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** recul du châssis et retour de tourelle. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Absorbe une seule frappe ; projections, EMP et attaques brise-armure la contrent.

##### super — Choc du Gekko

**Existant :** `melee` / `kick` ; 25/7/44 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de GEKKO — SIMULATION, préparer « Choc du Gekko » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** recul du châssis et retour de tourelle. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Refroidir

**Existant :** `recover` / `recovery` ; 45/1/25 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de GEKKO — SIMULATION, préparer « Refroidir » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Refroidir ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** recul du châssis et retour de tourelle. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Refroidissement ou pause tactique interrompable ; aucun soin gratuit.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Choc du Gekko — Final

Famille `cqc`, ton `stylized` ; 220 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Choc du Gekko / Mitrailleuse du Gekko.

Plan 1 : GEKKO — SIMULATION sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Choc du Gekko / Mitrailleuse du Gekko ». Plan 2 : contact de saisie ou neutralisation lié à « Choc du Gekko / Mitrailleuse du Gekko », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : recul du châssis et retour de tourelle, pose de signature face à l’adversaire.

##### Mitrailleuse du Gekko / Balayage des pattes

Famille `ballistic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Choc du Gekko / Balayage des pattes.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Choc du Gekko / Balayage des pattes » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Choc du Gekko / Balayage des pattes », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : recul du châssis et retour de tourelle, arrêt du dispositif et retour au cadre d’ensemble.

##### Piétinement — Point final

Famille `mechanical`, ton `stylized` ; 256 ticks CQC ; phases actuelles : lock → barrage → core → shutdown. Appuis déclarés : Choc du Gekko / Piétinement.

Plan 1 : approche jusqu’à la distance réelle de « Choc du Gekko / Piétinement », arme et main libre identifiées. Plan 2 : foulées lourdes et contact des pieds ; aucun cycle humanoïde de bras ; montrer l’organe de « Choc du Gekko / Piétinement ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : recul du châssis et retour de tourelle, prise de distance et maintien final.

##### Châssis — Mission close

Famille `mechanical`, ton `stylized` ; 274 ticks CQC ; phases actuelles : lock → barrage → core → shutdown. Appuis déclarés : Choc du Gekko / Poussée du châssis.

Plan 1 : après une observation ou un repli, GEKKO — SIMULATION reprend l’initiative par « Choc du Gekko / Poussée du châssis ». Plan 2 : foulées lourdes et contact des pieds ; aucun cycle humanoïde de bras ; montrer l’organe de « Choc du Gekko / Poussée du châssis ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : recul du châssis et retour de tourelle, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Aucun pouvoir importé d’une autre incarnation.
- Aucune invulnérabilité permanente, saisie infinie ou contrôle des touches adverses.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## completion__dwarf_gekko_mgs4

### DWARF GEKKO — UNITÉ — MGS4

**Rôle :** Reconnaissance robotique et électrode. **Profil :** `small_drone`.

**Base présente dans le code :** Petit robot à bras, pas mini-Metal Gear à railgun.

**Incarnation à conserver :** Petit robot à bras, pas mini-Metal Gear à railgun.

**État vérifié :** route machine effectivement déclarée ; animations d’articulation à contrôler. Une route machine est déclarée dans le runtime. Ses articulations remplacent le catalogue de corps contrôlé ; ce n’est pas un constat de sprite absent.

**Réemplois à examiner :** pas de groupe natif partagé observé dans cette extraction.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** DWARF GEKKO — UNITÉ : châssis, jambes/roues et module optique correctement orientés. Petits ajustements mécaniques des organes présents et optique stable ; aucune respiration humaine. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** cycle de locomotion mécanique ; pas de genoux humains. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Reconnaissance robotique et électrode » : orientation défensive du châssis, des membres ou de la protection effectivement présente ; pas d’avant-bras humain ajouté ; recul bloqué distinct de la simple position basse. Garder châssis, jambes/roues et module optique correctement orientés.
- **jump_land :** DWARF GEKKO — UNITÉ : départ par poussée ou articulation autorisée, déplacement aérien puis stabilisation et reprise d’appui ; les appareils volants gardent leur mode de sustentation. cycle de locomotion mécanique ; pas de genoux humains. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Secousse du châssis et de l’organe touché de DWARF GEKKO — UNITÉ, déséquilibre, arrêt puis remise en position par ses articulations réelles. Terminer par retour de l’outil ou de la caméra sur sa charnière. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS4 », présentation de Petit robot à bras, pas mini-Metal Gear à railgun., puis châssis, jambes/roues et module optique correctement orientés. Geste court lié à « Contact des bras » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, retour de l’outil ou de la caméra sur sa charnière ; DWARF GEKKO — UNITÉ vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS4.
- **round_loss :** Proposition CQC : DWARF GEKKO — UNITÉ interrompt ses émissions, absorbe l’oscillation de sa masse, stabilise ses appuis ou son vol, puis replace ses organes ; aucune régénération gratuite. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Impulsion d’essaim simulée », revenir par retour de l’outil ou de la caméra sur sa charnière, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Contact du bras

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de DWARF GEKKO — UNITÉ, préparer « Contact du bras » ; châssis, jambes/roues et module optique correctement orientés. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Contact du bras » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour de l’outil ou de la caméra sur sa charnière.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Impulsion du bras

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de DWARF GEKKO — UNITÉ, préparer « Impulsion du bras » ; châssis, jambes/roues et module optique correctement orientés. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Impulsion du bras », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retour de l’outil ou de la caméra sur sa charnière.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de DWARF GEKKO — UNITÉ, préparer « Balayage » ; châssis, jambes/roues et module optique correctement orientés. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** retour de l’outil ou de la caméra sur sa charnière.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Poussée du châssis

**Existant :** `melee` / `strike` ; 13/4/32 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de DWARF GEKKO — UNITÉ, préparer « Poussée du châssis » ; châssis, jambes/roues et module optique correctement orientés. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Poussée du châssis » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour de l’outil ou de la caméra sur sa charnière.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### special — Contact des bras

**Existant :** `melee` / `electric` ; 17/5/29 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de DWARF GEKKO — UNITÉ, préparer « Contact des bras » ; châssis, jambes/roues et module optique correctement orientés. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Contact des bras » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense. L’effet electric reste séparé du membre ; son apparition et sa disparition suivent les événements du profil.

**Retour.** retour de l’outil ou de la caméra sur sa charnière.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Espacement ou garde ; choc bref avec résistance temporaire après application.

##### specialDown — Scanner de proximité

**Existant :** `mark` / `recon` ; 26/1/30 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de DWARF GEKKO — UNITÉ, préparer « Scanner de proximité » ; châssis, jambes/roues et module optique correctement orientés. Orienter regard, optique ou terminal vers la cible observée, sans consulter une action future.

**Action.** Pour « Scanner de proximité », déclencher lecture/repérage avec un petit geste ou changement d’optique et un indicateur séparé. Le corps doit rester visible et vulnérable selon les données de combat.

**Retour.** retour de l’outil ou de la caméra sur sa charnière. Couper le signal ou abaisser l’outil ; retour vers l’adversaire sans nouvelle arme inventée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Portée limitée ; le marquage ne vise ni à travers toute l’arène ni automatiquement.

##### specialForward — Roulade du Dwarf Gekko

**Existant :** `mobility` / `movement` ; 7/18/25 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de DWARF GEKKO — UNITÉ, préparer « Roulade du Dwarf Gekko » ; châssis, jambes/roues et module optique correctement orientés. Préparer l’appui qui produit le déplacement ; cycle de locomotion mécanique ; pas de genoux humains.

**Action.** Exécuter « Roulade du Dwarf Gekko » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** retour de l’outil ou de la caméra sur sa charnière. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : La silhouette reste touchable ; la sortie est punissable.

##### specialBack — Roule mécanique

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de DWARF GEKKO — UNITÉ, préparer « Roule mécanique » ; châssis, jambes/roues et module optique correctement orientés. Préparer l’appui qui produit le déplacement ; cycle de locomotion mécanique ; pas de genoux humains.

**Action.** Exécuter « Roule mécanique » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** retour de l’outil ou de la caméra sur sa charnière. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Impulsion d’essaim simulée

**Existant :** `melee` / `electric` ; 25/1/34 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de DWARF GEKKO — UNITÉ, préparer « Impulsion d’essaim simulée » ; châssis, jambes/roues et module optique correctement orientés. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Impulsion d’essaim simulée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan. L’effet electric reste séparé du membre ; son apparition et sa disparition suivent les événements du profil.

**Retour.** retour de l’outil ou de la caméra sur sa charnière.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde ; l’EMP ouvre les défenses des machines sans les désactiver définitivement.

##### utility — Recharge de la batterie

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de DWARF GEKKO — UNITÉ, préparer « Recharge de la batterie » ; châssis, jambes/roues et module optique correctement orientés. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Recharge de la batterie ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** retour de l’outil ou de la caméra sur sa charnière. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Impulsion d’essaim simulée — Final

Famille `electric`, ton `stylized` ; 220 ticks CQC ; phases actuelles : charge → arc → overload → shutdown. Appuis déclarés : Impulsion d’essaim simulée / Contact des bras.

Plan 1 : DWARF GEKKO — UNITÉ sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Impulsion d’essaim simulée / Contact des bras ». Plan 2 : montrer la source corporelle ou matérielle de « Impulsion d’essaim simulée / Contact des bras ». Plan 3 : développer l’effet electric en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : retour de l’outil ou de la caméra sur sa charnière, pose de signature face à l’adversaire.

##### Contact des bras / Scanner de proximité

Famille `electric`, ton `stylized` ; 238 ticks CQC ; phases actuelles : charge → arc → overload → shutdown. Appuis déclarés : Impulsion d’essaim simulée / Scanner de proximité.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Impulsion d’essaim simulée / Scanner de proximité » ; l’espace disponible doit être lisible. Plan 2 : montrer la source corporelle ou matérielle de « Impulsion d’essaim simulée / Scanner de proximité ». Plan 3 : développer l’effet electric en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : retour de l’outil ou de la caméra sur sa charnière, arrêt du dispositif et retour au cadre d’ensemble.

##### Roulade du Dwarf Gekko — Point final

Famille `mechanical`, ton `stylized` ; 256 ticks CQC ; phases actuelles : lock → barrage → core → shutdown. Appuis déclarés : Impulsion d’essaim simulée / Roulade du Dwarf Gekko.

Plan 1 : approche jusqu’à la distance réelle de « Impulsion d’essaim simulée / Roulade du Dwarf Gekko », arme et main libre identifiées. Plan 2 : cycle de locomotion mécanique ; pas de genoux humains ; montrer l’organe de « Impulsion d’essaim simulée / Roulade du Dwarf Gekko ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : retour de l’outil ou de la caméra sur sa charnière, prise de distance et maintien final.

##### Châssis — Mission close

Famille `mechanical`, ton `stylized` ; 274 ticks CQC ; phases actuelles : lock → barrage → core → shutdown. Appuis déclarés : Impulsion d’essaim simulée / Poussée du châssis.

Plan 1 : après une observation ou un repli, DWARF GEKKO — UNITÉ reprend l’initiative par « Impulsion d’essaim simulée / Poussée du châssis ». Plan 2 : cycle de locomotion mécanique ; pas de genoux humains ; montrer l’organe de « Impulsion d’essaim simulée / Poussée du châssis ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : retour de l’outil ou de la caméra sur sa charnière, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Aucun pouvoir importé d’une autre incarnation.
- Aucune invulnérabilité permanente, saisie infinie ou contrôle des touches adverses.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## completion__little_gray_mgs4

### LITTLE GRAY — MGS4

**Rôle :** Simulation bonus : esquive, objet et contact. **Profil :** `monkey`.

**Base présente dans le code :** Compagnon primate de Drebin : corrige le classement machine ; kit bonus défensif, pas d’armes de robot.

**Incarnation à conserver :** Little Gray, hairless gray monkey with long curling tail and dark metallic-gray briefs

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialDown, specialForward, super.

**Techniques pointant sur une seule région native dans la direction principale :** special, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** LITTLE GRAY : petit primate, queue et équipements visibles de cette version. Respiration et petit mouvement de tête/oreilles/queue selon l’anatomie ; les pattes restent stables. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** appuis de primate et saut à sa vraie taille. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Simulation bonus : esquive, objet et contact » : abaissement et orientation défensive de la tête et du tronc ; ne pas ajouter une parade humaine à deux bras ; recul bloqué distinct de la simple position basse. Garder petit primate, queue et équipements visibles de cette version.
- **jump_land :** LITTLE GRAY : regroupement des appuis arrière, bond, extension en vol puis réception par les appuis avant et arrière adaptés à l’espèce. appuis de primate et saut à sa vraie taille. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Réactions de tête, de flanc et de patte de LITTLE GRAY, perte d’appui puis relevé par les membres réellement présents. Terminer par réception sur les appuis appropriés, retour de queue. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS4 », présentation de Little Gray, hairless gray monkey with long curling tail and dark metallic-gray briefs, puis petit primate, queue et équipements visibles de cette version. Geste court lié à « Objet lancé » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, réception sur les appuis appropriés, retour de queue ; LITTLE GRAY vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS4.
- **round_loss :** Proposition CQC : LITTLE GRAY relève la tête, rassemble ses appuis, répartit son poids puis reprend sa position d’attente ; aucun redressement humain. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Diversion du compagnon », revenir par réception sur les appuis appropriés, retour de queue, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Contact animal

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LITTLE GRAY, préparer « Contact animal » ; petit primate, queue et équipements visibles de cette version. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Contact animal » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** réception sur les appuis appropriés, retour de queue.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Percussion basse

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LITTLE GRAY, préparer « Percussion basse » ; petit primate, queue et équipements visibles de cette version. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Percussion basse », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** réception sur les appuis appropriés, retour de queue.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LITTLE GRAY, préparer « Balayage » ; petit primate, queue et équipements visibles de cette version. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** réception sur les appuis appropriés, retour de queue.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Bond de diversion

**Existant :** `melee` / `strike` ; 12/4/29 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LITTLE GRAY, préparer « Bond de diversion » ; petit primate, queue et équipements visibles de cette version. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Bond de diversion » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** réception sur les appuis appropriés, retour de queue.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### special — Objet lancé

**Existant :** `projectile` / `object` ; 14/1/22 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LITTLE GRAY, préparer « Objet lancé » ; petit primate, queue et équipements visibles de cette version. Donner à la source de « Objet lancé » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet object de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet.

**Retour.** réception sur les appuis appropriés, retour de queue. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Balayage court

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LITTLE GRAY, préparer « Balayage court » ; petit primate, queue et équipements visibles de cette version. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** réception sur les appuis appropriés, retour de queue.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### specialForward — Bond de Little Gray

**Existant :** `mobility` / `movement` ; 7/18/25 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LITTLE GRAY, préparer « Bond de Little Gray » ; petit primate, queue et équipements visibles de cette version. Préparer l’appui qui produit le déplacement ; appuis de primate et saut à sa vraie taille.

**Action.** Exécuter « Bond de Little Gray » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 6 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** réception sur les appuis appropriés, retour de queue. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : La silhouette reste touchable ; la sortie est punissable.

##### specialBack — Retraite agile

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LITTLE GRAY, préparer « Retraite agile » ; petit primate, queue et équipements visibles de cette version. Préparer l’appui qui produit le déplacement ; appuis de primate et saut à sa vraie taille.

**Action.** Exécuter « Retraite agile » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** réception sur les appuis appropriés, retour de queue. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Diversion du compagnon

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LITTLE GRAY, préparer « Diversion du compagnon » ; petit primate, queue et équipements visibles de cette version. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Diversion du compagnon », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** réception sur les appuis appropriés, retour de queue.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Reprendre son souffle

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LITTLE GRAY, préparer « Reprendre son souffle » ; petit primate, queue et équipements visibles de cette version. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Reprendre son souffle ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** réception sur les appuis appropriés, retour de queue. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Diversion du compagnon — Final

Famille `cqc`, ton `simulation` ; 220 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Diversion du compagnon / Objet lancé.

Plan 1 : LITTLE GRAY sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Diversion du compagnon / Objet lancé ». Plan 2 : contact de saisie ou neutralisation lié à « Diversion du compagnon / Objet lancé », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : réception sur les appuis appropriés, retour de queue, pose de signature face à l’adversaire. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Objet lancé / Balayage court

Famille `ballistic`, ton `simulation` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Diversion du compagnon / Balayage court.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Diversion du compagnon / Balayage court » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Diversion du compagnon / Balayage court », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : réception sur les appuis appropriés, retour de queue, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Bond de Little Gray — Point final

Famille `beast`, ton `simulation` ; 256 ticks CQC ; phases actuelles : stalk → pounce → takedown → howl. Appuis déclarés : Diversion du compagnon / Bond de Little Gray.

Plan 1 : approche jusqu’à la distance réelle de « Diversion du compagnon / Bond de Little Gray », arme et main libre identifiées. Plan 2 : appuis de primate et saut à sa vraie taille ; montrer l’organe de « Diversion du compagnon / Bond de Little Gray ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : réception sur les appuis appropriés, retour de queue, prise de distance et maintien final. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Simulation prudente — Mission close

Famille `capture`, ton `simulation` ; 274 ticks CQC ; phases actuelles : stun → disarm → restrain → extract. Appuis déclarés : Diversion du compagnon / Bond de diversion.

Plan 1 : après une observation ou un repli, LITTLE GRAY reprend l’initiative par « Diversion du compagnon / Bond de diversion ». Plan 2 : contact de saisie ou neutralisation lié à « Diversion du compagnon / Bond de diversion », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : réception sur les appuis appropriés, retour de queue, rangement/pose finale différente des trois autres. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Only the small canonical hairless monkey, long tail and dark briefs are adapted; no undocumented shirt/firearm is added.
- Movement and comic defensive keyposes are authored fighting-game adaptation; no anatomical species classification or original motion capture certification.
- [Released complete Konami CGI of Drebin with Little Gray, plus original character sheet/profile-tail view and original PS3 frame at 3000 seconds. Files viewed intact.](https://www.creativeuncut.com/gallery-06/mgs4-drebin_little-gray.html) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## completion__gary_murray

### GARY MURRAY — AC!D

**Rôle :** Pistolet et défense proche. **Profil :** `pistol`.

**Base présente dans le code :** Figure narrative Ac!d : armement bonus proposé et conventionnel, pas de pouvoirs spéculatifs.

**Incarnation à conserver :** Gary Murray in his official first PSP Ac!d Konami portrait, with dark fedora and long dark hair. Kept separate from William Flemming without hat.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `throw` = throw, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `retro-msx`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** GARY MURRAY : main forte et main de soutien identifiées sur le pistolet, coudes contenus. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas prudents sans inverser l’étui ni la main forte. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Pistolet et défense proche » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder main forte et main de soutien identifiées sur le pistolet, coudes contenus.
- **jump_land :** GARY MURRAY : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas prudents sans inverser l’étui ni la main forte. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de GARY MURRAY. Terminer par recul du poignet puis stabilisation du canon. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « AC!D », présentation de Gary Murray in his official first PSP Ac!d Konami portrait, with dark fedora and long dark hair. Kept separate from William Flemming without hat., puis main forte et main de soutien identifiées sur le pistolet, coudes contenus. Geste court lié à « Pistolet de simulation » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, recul du poignet puis stabilisation du canon ; GARY MURRAY vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à AC!D.
- **round_loss :** Proposition CQC : GARY MURRAY réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Couverture de secours », revenir par recul du poignet puis stabilisation du canon, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GARY MURRAY, préparer « Jab » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GARY MURRAY, préparer « Frappe engagée » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GARY MURRAY, préparer « Balayage » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GARY MURRAY, préparer « Projection » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recul du poignet puis stabilisation du canon. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Pistolet de simulation

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GARY MURRAY, préparer « Pistolet de simulation » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Montrer la prise et la visée de l’arme décrite par « Pistolet de simulation » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Diversion de Murray

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GARY MURRAY, préparer « Diversion de Murray » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Prélever l’objet correspondant à « Diversion de Murray », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Saisie de secours

**Existant :** `melee` / `grapple` ; 10/3/32 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GARY MURRAY, préparer « Saisie de secours » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recul du poignet puis stabilisation du canon. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Hors de portée ou saut ; ne saisir ni cible aérienne ni cible sous protection post-projection.

##### specialBack — Repli de Murray

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GARY MURRAY, préparer « Repli de Murray » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer l’appui qui produit le déplacement ; pas prudents sans inverser l’étui ni la main forte.

**Action.** Exécuter « Repli de Murray » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** recul du poignet puis stabilisation du canon. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Couverture de secours

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GARY MURRAY, préparer « Couverture de secours » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Montrer la prise et la visée de l’arme décrite par « Couverture de secours » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de GARY MURRAY, préparer « Recharger » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** recul du poignet puis stabilisation du canon. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Couverture de secours — Final

Famille `ballistic`, ton `simulation` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Couverture de secours / Pistolet de simulation.

Plan 1 : GARY MURRAY sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Couverture de secours / Pistolet de simulation ». Plan 2 : présenter l’arme effectivement associée à « Couverture de secours / Pistolet de simulation », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : recul du poignet puis stabilisation du canon, pose de signature face à l’adversaire. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Pistolet de simulation / Diversion de Murray

Famille `ballistic`, ton `simulation` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Couverture de secours / Diversion de Murray.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Couverture de secours / Diversion de Murray » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Couverture de secours / Diversion de Murray », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : recul du poignet puis stabilisation du canon, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Saisie de secours — Point final

Famille `cqc`, ton `simulation` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Couverture de secours / Saisie de secours.

Plan 1 : approche jusqu’à la distance réelle de « Couverture de secours / Saisie de secours », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Couverture de secours / Saisie de secours », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : recul du poignet puis stabilisation du canon, prise de distance et maintien final. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Lecture rapprochée — Mission close

Famille `capture`, ton `simulation` ; 274 ticks CQC ; phases actuelles : stun → disarm → restrain → extract. Appuis déclarés : Couverture de secours / Projection.

Plan 1 : après une observation ou un repli, GARY MURRAY reprend l’initiative par « Couverture de secours / Projection ». Plan 2 : contact de saisie ou neutralisation lié à « Couverture de secours / Projection », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : recul du poignet puis stabilisation du canon, rangement/pose finale différente des trois autres. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against its identified reference and only its visible extent. This is a 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Identity, costume, equipment and anatomical-side checks establish consistency with the source-backed visible facts and the explicitly qualified reconstructed parts; they do not certify unseen anatomy or clothing as canonical. Gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Physically viewed original reference establishes only visible identity/costume/accessories; it is not certified whole-body final-game 3D geometry or texture.
- Back surfaces and unseen pose angles are adapted from visible source design, without a pixel-perfect claim.
- Sixteen action poses per direction are authored gameplay adaptation; no canonical technique or motion-capture claim.
- Only visible head, upper clothing and accessories are established; hidden legs, footwear, back and body proportions are not documented by this portrait.
- Portrait-only canonical reference: body below chest, coat length, trousers, footwear, hand coverage and standing proportions are explicitly authored reconstruction, not canonical certification.
- Gary and Flemming retain separate native atlases and UIDs; shared lore identity does not authorize merging costume variants.
- [Original official Konami archived Ac!d native character portrait; visible head and upper torso only.](https://www.konami.com/mg/archive/mga/uk/characters_index.html) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## completion__flemming_acid

### FLEMMING — AC!D

**Rôle :** Simulation prudente, pas de super-pouvoirs. **Profil :** `analyst`.

**Base présente dans le code :** Flemming : identité et équipement de simulation ; pas amalgame automatique avec tous ses imposteurs.

**Incarnation à conserver :** William Flemming in the first PSP Ac!d full-body official coloured illustration, without the Gary Murray fedora.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, special, specialForward, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** FLEMMING : outil de lecture ou de communication montré par le profil, attitude d’observation. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Simulation prudente, pas de super-pouvoirs » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder outil de lecture ou de communication montré par le profil, attitude d’observation.
- **jump_land :** FLEMMING : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de FLEMMING. Terminer par regard vers l’outil puis retour vers l’adversaire. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « AC!D », présentation de William Flemming in the first PSP Ac!d full-body official coloured illustration, without the Gary Murray fedora., puis outil de lecture ou de communication montré par le profil, attitude d’observation. Geste court lié à « Outil de sécurité » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, regard vers l’outil puis retour vers l’adversaire ; FLEMMING vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à AC!D.
- **round_loss :** Proposition CQC : FLEMMING réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Séquence d’évacuation », revenir par regard vers l’outil puis retour vers l’adversaire, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FLEMMING, préparer « Jab » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FLEMMING, préparer « Frappe engagée » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FLEMMING, préparer « Balayage » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FLEMMING, préparer « Projection » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Outil de sécurité

**Existant :** `melee` / `electric` ; 17/5/29 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FLEMMING, préparer « Outil de sécurité » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Outil de sécurité » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense. L’effet electric reste séparé du membre ; son apparition et sa disparition suivent les événements du profil.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Espacement ou garde ; choc bref avec résistance temporaire après application.

##### specialDown — Analyser l’accès

**Existant :** `mark` / `recon` ; 26/1/30 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FLEMMING, préparer « Analyser l’accès » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Orienter regard, optique ou terminal vers la cible observée, sans consulter une action future.

**Action.** Pour « Analyser l’accès », déclencher lecture/repérage avec un petit geste ou changement d’optique et un indicateur séparé. Le corps doit rester visible et vulnérable selon les données de combat.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Couper le signal ou abaisser l’outil ; retour vers l’adversaire sans nouvelle arme inventée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Portée limitée ; le marquage ne vise ni à travers toute l’arène ni automatiquement.

##### specialForward — Se dégager

**Existant :** `mobility` / `movement` ; 7/18/25 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FLEMMING, préparer « Se dégager » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer l’appui qui produit le déplacement ; déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire.

**Action.** Exécuter « Se dégager » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 4 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : La silhouette reste touchable ; la sortie est punissable.

##### specialBack — Repli de Flemming

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FLEMMING, préparer « Repli de Flemming » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer l’appui qui produit le déplacement ; déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire.

**Action.** Exécuter « Repli de Flemming » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Séquence d’évacuation

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FLEMMING, préparer « Séquence d’évacuation » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Séquence d’évacuation », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Stabiliser la réserve

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FLEMMING, préparer « Stabiliser la réserve » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Stabiliser la réserve ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Séquence d’évacuation — Final

Famille `cqc`, ton `nonlethal` ; 220 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Séquence d’évacuation / Outil de sécurité.

Plan 1 : FLEMMING sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Séquence d’évacuation / Outil de sécurité ». Plan 2 : contact de saisie ou neutralisation lié à « Séquence d’évacuation / Outil de sécurité », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : regard vers l’outil puis retour vers l’adversaire, pose de signature face à l’adversaire. Respecter le ton nonlethal enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Outil de sécurité / Analyser l’accès

Famille `electric`, ton `nonlethal` ; 238 ticks CQC ; phases actuelles : charge → arc → overload → shutdown. Appuis déclarés : Séquence d’évacuation / Analyser l’accès.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Séquence d’évacuation / Analyser l’accès » ; l’espace disponible doit être lisible. Plan 2 : montrer la source corporelle ou matérielle de « Séquence d’évacuation / Analyser l’accès ». Plan 3 : développer l’effet electric en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : regard vers l’outil puis retour vers l’adversaire, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton nonlethal enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Se dégager — Point final

Famille `cqc`, ton `nonlethal` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Séquence d’évacuation / Se dégager.

Plan 1 : approche jusqu’à la distance réelle de « Séquence d’évacuation / Se dégager », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Séquence d’évacuation / Se dégager », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : regard vers l’outil puis retour vers l’adversaire, prise de distance et maintien final. Respecter le ton nonlethal enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Simulation prudente — Mission close

Famille `capture`, ton `nonlethal` ; 274 ticks CQC ; phases actuelles : stun → disarm → restrain → extract. Appuis déclarés : Séquence d’évacuation / Projection.

Plan 1 : après une observation ou un repli, FLEMMING reprend l’initiative par « Séquence d’évacuation / Projection ». Plan 2 : contact de saisie ou neutralisation lié à « Séquence d’évacuation / Projection », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : regard vers l’outil puis retour vers l’adversaire, rangement/pose finale différente des trois autres. Respecter le ton nonlethal enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against its identified reference and only its visible extent. This is a 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Identity, costume, equipment and anatomical-side checks establish consistency with the source-backed visible facts and the explicitly qualified reconstructed parts; they do not certify unseen anatomy or clothing as canonical. Gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Physically viewed original official illustration establishes visible costume/accessories; it is not certified final-game full 3D geometry or texture.
- Back surfaces and unseen pose angles are adapted from visible official design, without a pixel-perfect claim.
- Sixteen action poses per direction are authored gameplay adaptation; no canonical technique or motion-capture claim.
- Partial holstered grip is shown, but the gun model and complete holster attachment are not established.
- Hands are substantially hidden by crossed arms in the official pose; bare hands in action are an explicitly adapted continuation, not documented glove status.
- [Native official character illustration/concept reproduced by Creative Uncut; not a final-game 3D model.](https://www.creativeuncut.com/gallery-17/mga-william-flemming.html) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## completion__dalton_acid2

### DALTON — AC!D 2 — AC!D 2

**Rôle :** Pistolet et défense proche. **Profil :** `pistol`.

**Base présente dans le code :** Agent d’Ac!d 2 : pistolet et protection, pas aptitude surnaturelle.

**Incarnation à conserver :** Adult male Dalton in the second PSP Ac!d game official full-body coloured design.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `throw` = throw, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** DALTON — AC!D 2 : main forte et main de soutien identifiées sur le pistolet, coudes contenus. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas prudents sans inverser l’étui ni la main forte. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Pistolet et défense proche » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder main forte et main de soutien identifiées sur le pistolet, coudes contenus.
- **jump_land :** DALTON — AC!D 2 : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas prudents sans inverser l’étui ni la main forte. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de DALTON — AC!D 2. Terminer par recul du poignet puis stabilisation du canon. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « AC!D 2 », présentation de Adult male Dalton in the second PSP Ac!d game official full-body coloured design., puis main forte et main de soutien identifiées sur le pistolet, coudes contenus. Geste court lié à « Pistolet de Dalton » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, recul du poignet puis stabilisation du canon ; DALTON — AC!D 2 vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à AC!D 2.
- **round_loss :** Proposition CQC : DALTON — AC!D 2 réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Intervention FBI simulée », revenir par recul du poignet puis stabilisation du canon, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DALTON — AC!D 2, préparer « Jab » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DALTON — AC!D 2, préparer « Frappe engagée » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DALTON — AC!D 2, préparer « Balayage » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DALTON — AC!D 2, préparer « Projection » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recul du poignet puis stabilisation du canon. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Pistolet de Dalton

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DALTON — AC!D 2, préparer « Pistolet de Dalton » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Montrer la prise et la visée de l’arme décrite par « Pistolet de Dalton » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Grenade de terrain

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DALTON — AC!D 2, préparer « Grenade de terrain » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Prélever l’objet correspondant à « Grenade de terrain », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Prise d’agent

**Existant :** `melee` / `grapple` ; 10/3/32 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DALTON — AC!D 2, préparer « Prise d’agent » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recul du poignet puis stabilisation du canon. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Hors de portée ou saut ; ne saisir ni cible aérienne ni cible sous protection post-projection.

##### specialBack — Repli de Dalton

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DALTON — AC!D 2, préparer « Repli de Dalton » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer l’appui qui produit le déplacement ; pas prudents sans inverser l’étui ni la main forte.

**Action.** Exécuter « Repli de Dalton » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** recul du poignet puis stabilisation du canon. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Intervention FBI simulée

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DALTON — AC!D 2, préparer « Intervention FBI simulée » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Montrer la prise et la visée de l’arme décrite par « Intervention FBI simulée » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DALTON — AC!D 2, préparer « Recharger » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** recul du poignet puis stabilisation du canon. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Intervention FBI simulée — Final

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Intervention FBI simulée / Pistolet de Dalton.

Plan 1 : DALTON — AC!D 2 sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Intervention FBI simulée / Pistolet de Dalton ». Plan 2 : présenter l’arme effectivement associée à « Intervention FBI simulée / Pistolet de Dalton », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : recul du poignet puis stabilisation du canon, pose de signature face à l’adversaire.

##### Pistolet de Dalton / Grenade de terrain

Famille `ballistic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Intervention FBI simulée / Grenade de terrain.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Intervention FBI simulée / Grenade de terrain » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Intervention FBI simulée / Grenade de terrain », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : recul du poignet puis stabilisation du canon, arrêt du dispositif et retour au cadre d’ensemble.

##### Prise d’agent — Point final

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Intervention FBI simulée / Prise d’agent.

Plan 1 : approche jusqu’à la distance réelle de « Intervention FBI simulée / Prise d’agent », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Intervention FBI simulée / Prise d’agent », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : recul du poignet puis stabilisation du canon, prise de distance et maintien final.

##### Lecture rapprochée — Mission close

Famille `ballistic`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Intervention FBI simulée / Projection.

Plan 1 : après une observation ou un repli, DALTON — AC!D 2 reprend l’initiative par « Intervention FBI simulée / Projection ». Plan 2 : présenter l’arme effectivement associée à « Intervention FBI simulée / Projection », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : recul du poignet puis stabilisation du canon, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against its identified reference and only its visible extent. This is a 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Identity, costume, equipment and anatomical-side checks establish consistency with the source-backed visible facts and the explicitly qualified reconstructed parts; they do not certify unseen anatomy or clothing as canonical. Gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Physically viewed original official illustration establishes visible costume/accessories; it is not certified final-game full 3D geometry or texture.
- Back surfaces and unseen pose angles are adapted from visible official design, without a pixel-perfect claim.
- Sixteen action poses per direction are authored gameplay adaptation; no canonical technique or motion-capture claim.
- Roster pistol tag does not prove a held weapon; this full-body source shows no gun, so this atlas keeps authentic unarmed support presentation.
- [Native official character illustration/concept reproduced by Creative Uncut; not a final-game 3D model.](https://www.creativeuncut.com/gallery-11/mga2-dalton.html) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## completion__wiseman_acid2

### WISEMAN — AC!D 2

**Rôle :** Simulation prudente, pas de super-pouvoirs. **Profil :** `analyst`.

**Base présente dans le code :** Entrée bonus du catalogue dont la spécialité reste à sourcer ; capacités techniques simulées, pas magie affirmée.

**Incarnation à conserver :** Older adult male General Wiseman in official second PSP Ac!d full-body coloured design.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, special, specialForward, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `retro-msx`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** WISEMAN : outil de lecture ou de communication montré par le profil, attitude d’observation. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Simulation prudente, pas de super-pouvoirs » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder outil de lecture ou de communication montré par le profil, attitude d’observation.
- **jump_land :** WISEMAN : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de WISEMAN. Terminer par regard vers l’outil puis retour vers l’adversaire. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « AC!D 2 », présentation de Older adult male General Wiseman in official second PSP Ac!d full-body coloured design., puis outil de lecture ou de communication montré par le profil, attitude d’observation. Geste court lié à « Outil de Wiseman » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, regard vers l’outil puis retour vers l’adversaire ; WISEMAN vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à AC!D 2.
- **round_loss :** Proposition CQC : WISEMAN réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Analyse de sortie », revenir par regard vers l’outil puis retour vers l’adversaire, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de WISEMAN, préparer « Jab » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de WISEMAN, préparer « Frappe engagée » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de WISEMAN, préparer « Balayage » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de WISEMAN, préparer « Projection » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Outil de Wiseman

**Existant :** `melee` / `electric` ; 17/5/29 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de WISEMAN, préparer « Outil de Wiseman » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Outil de Wiseman » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense. L’effet electric reste séparé du membre ; son apparition et sa disparition suivent les événements du profil.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Espacement ou garde ; choc bref avec résistance temporaire après application.

##### specialDown — Lecture du système

**Existant :** `mark` / `recon` ; 26/1/30 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de WISEMAN, préparer « Lecture du système » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Orienter regard, optique ou terminal vers la cible observée, sans consulter une action future.

**Action.** Pour « Lecture du système », déclencher lecture/repérage avec un petit geste ou changement d’optique et un indicateur séparé. Le corps doit rester visible et vulnérable selon les données de combat.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Couper le signal ou abaisser l’outil ; retour vers l’adversaire sans nouvelle arme inventée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Portée limitée ; le marquage ne vise ni à travers toute l’arène ni automatiquement.

##### specialForward — Se dégager

**Existant :** `mobility` / `movement` ; 7/18/25 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de WISEMAN, préparer « Se dégager » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer l’appui qui produit le déplacement ; déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire.

**Action.** Exécuter « Se dégager » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 4 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : La silhouette reste touchable ; la sortie est punissable.

##### specialBack — Repli prudent

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de WISEMAN, préparer « Repli prudent » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer l’appui qui produit le déplacement ; déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire.

**Action.** Exécuter « Repli prudent » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Analyse de sortie

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de WISEMAN, préparer « Analyse de sortie » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Analyse de sortie », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Stabiliser la réserve

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de WISEMAN, préparer « Stabiliser la réserve » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Stabiliser la réserve ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Analyse de sortie — Final

Famille `cqc`, ton `nonlethal` ; 220 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Analyse de sortie / Outil de Wiseman.

Plan 1 : WISEMAN sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Analyse de sortie / Outil de Wiseman ». Plan 2 : contact de saisie ou neutralisation lié à « Analyse de sortie / Outil de Wiseman », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : regard vers l’outil puis retour vers l’adversaire, pose de signature face à l’adversaire. Respecter le ton nonlethal enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Outil de Wiseman / Lecture du système

Famille `electric`, ton `nonlethal` ; 238 ticks CQC ; phases actuelles : charge → arc → overload → shutdown. Appuis déclarés : Analyse de sortie / Lecture du système.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Analyse de sortie / Lecture du système » ; l’espace disponible doit être lisible. Plan 2 : montrer la source corporelle ou matérielle de « Analyse de sortie / Lecture du système ». Plan 3 : développer l’effet electric en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : regard vers l’outil puis retour vers l’adversaire, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton nonlethal enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Se dégager — Point final

Famille `cqc`, ton `nonlethal` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Analyse de sortie / Se dégager.

Plan 1 : approche jusqu’à la distance réelle de « Analyse de sortie / Se dégager », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Analyse de sortie / Se dégager », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : regard vers l’outil puis retour vers l’adversaire, prise de distance et maintien final. Respecter le ton nonlethal enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Simulation prudente — Mission close

Famille `capture`, ton `nonlethal` ; 274 ticks CQC ; phases actuelles : stun → disarm → restrain → extract. Appuis déclarés : Analyse de sortie / Projection.

Plan 1 : après une observation ou un repli, WISEMAN reprend l’initiative par « Analyse de sortie / Projection ». Plan 2 : contact de saisie ou neutralisation lié à « Analyse de sortie / Projection », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : regard vers l’outil puis retour vers l’adversaire, rangement/pose finale différente des trois autres. Respecter le ton nonlethal enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against its identified reference and only its visible extent. This is a 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Identity, costume, equipment and anatomical-side checks establish consistency with the source-backed visible facts and the explicitly qualified reconstructed parts; they do not certify unseen anatomy or clothing as canonical. Gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Physically viewed original official illustration establishes visible costume/accessories; it is not certified final-game full 3D geometry or texture.
- Back surfaces and unseen pose angles are adapted from visible official design, without a pixel-perfect claim.
- Sixteen action poses per direction are authored gameplay adaptation; no canonical technique or motion-capture claim.
- General is his title; reference depicts a civilian double-breasted suit, not a military uniform.
- [Native official character illustration/concept reproduced by Creative Uncut; not a final-game 3D model.](https://www.creativeuncut.com/gallery-11/mga2-wiseman.html) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).
