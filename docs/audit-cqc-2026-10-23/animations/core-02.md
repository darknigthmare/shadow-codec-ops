# Animations — CORE

**10 acteurs du registre courant.** Les titres d’actions et paramètres sont observés ; les descriptions sont des propositions CQC à produire et valider. Un groupe de frames existant ne certifie pas l’ensemble du mouvement ou sa fidélité originale.

[Index des fiches](README.md) · [Contrat commun](../04_ANIMATIONS_SPRITES.md)

## Sommaire

- [LAUGHING OCTOPUS](#core__laughing_octopus) — MGS4 / RENFORTS
- [RAGING RAVEN](#core__raging_raven) — MGS4 / RENFORTS
- [CRYING WOLF](#core__crying_wolf) — MGS4 / RENFORTS
- [SCREAMING MANTIS](#core__screaming_mantis) — MGS4 / RENFORTS
- [CHRIS JENNER](#core__chris_jenner) — GHOST / RENFORTS
- [ROY CAMPBELL — JEUNE](#core__campbell_mpo) — MPO / RENFORTS
- [CUNNINGHAM](#core__cunningham) — MPO / RENFORTS
- [BLADE WOLF / LQ-84I](#core__blade_wolf) — MGR / RENFORTS
- [KHAMSIN](#core__khamsin) — MGR / RENFORTS
- [BLOODY BRAD](#core__bloody_brad) — MG1 / RENFORTS

## core__laughing_octopus

### LAUGHING OCTOPUS — MGS4 / RENFORTS

**Rôle :** Tentacules, roulade et camouflage. **Profil :** `octopus`.

**Base présente dans le code :** Combinaison tentaculaire et camouflage, distincte de Laughing Beauty.

**Incarnation à conserver :** Original MGS4 PS32008 Beast armored tentacle form

**État vérifié :** métadonnées natives avec limites. 72 régions source distinctes dans les deux directions ; groupes : idle, walk, guard, crouch, jump, punch, heavy, low, hit, ko, shoot, deploy, throw, recover, attack.

**Réemplois à examiner :** `shoot` = special, super ; `deploy` = specialDown, specialForward.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** LAUGHING OCTOPUS : corps et bras mécaniques de l’armure Octopus, câbles non interchangeables. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** progression multi-appuis, masse centrale qui suit les bras. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Tentacules, roulade et camouflage » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder corps et bras mécaniques de l’armure Octopus, câbles non interchangeables.
- **jump_land :** LAUGHING OCTOPUS : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. progression multi-appuis, masse centrale qui suit les bras. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de LAUGHING OCTOPUS. Terminer par rétraction des tentacules puis remise en position. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS4 / RENFORTS », présentation de Original MGS4 PS32008 Beast armored tentacle form, puis corps et bras mécaniques de l’armure Octopus, câbles non interchangeables. Geste court lié à « Tentacule de frappe » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, rétraction des tentacules puis remise en position ; LAUGHING OCTOPUS vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS4 / RENFORTS.
- **round_loss :** Proposition CQC : LAUGHING OCTOPUS réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Chasse de Laughing Octopus », revenir par rétraction des tentacules puis remise en position, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Coup de tentacule

**Existant :** `melee` / `tentacle` ; 7/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LAUGHING OCTOPUS, préparer « Coup de tentacule » ; corps et bras mécaniques de l’armure Octopus, câbles non interchangeables. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** rétraction des tentacules puis remise en position. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Tentacule longue

**Existant :** `melee` / `tentacle` ; 18/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LAUGHING OCTOPUS, préparer « Tentacule longue » ; corps et bras mécaniques de l’armure Octopus, câbles non interchangeables. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** rétraction des tentacules puis remise en position. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LAUGHING OCTOPUS, préparer « Balayage » ; corps et bras mécaniques de l’armure Octopus, câbles non interchangeables. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** rétraction des tentacules puis remise en position.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LAUGHING OCTOPUS, préparer « Projection » ; corps et bras mécaniques de l’armure Octopus, câbles non interchangeables. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** rétraction des tentacules puis remise en position. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Tentacule de frappe

**Existant :** `melee` / `tentacle` ; 13/5/24 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LAUGHING OCTOPUS, préparer « Tentacule de frappe » ; corps et bras mécaniques de l’armure Octopus, câbles non interchangeables. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** rétraction des tentacules puis remise en position. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde puis punition ; la lame ne touche qu’une fois par attaque.

##### specialDown — Roulade compacte — adaptation

**Existant :** `mobility` / `movement` ; 34/1/34 ticks ; groupe `deploy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LAUGHING OCTOPUS, préparer « Roulade compacte — adaptation » ; corps et bras mécaniques de l’armure Octopus, câbles non interchangeables. Préparer l’appui qui produit le déplacement ; progression multi-appuis, masse centrale qui suit les bras.

**Action.** Exécuter « Roulade compacte — adaptation » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 5 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** rétraction des tentacules puis remise en position. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Déplacement rapproché borné, sans invincibilité ; poursuivre ou punir la sortie.

##### specialForward — Roulade de dégagement — adaptation

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `deploy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LAUGHING OCTOPUS, préparer « Roulade de dégagement — adaptation » ; corps et bras mécaniques de l’armure Octopus, câbles non interchangeables. Préparer l’appui qui produit le déplacement ; progression multi-appuis, masse centrale qui suit les bras.

**Action.** Exécuter « Roulade de dégagement — adaptation » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -9 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** rétraction des tentacules puis remise en position. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Déplacement rapproché borné, sans invincibilité ; poursuivre ou punir la sortie.

##### specialBack — Camouflage de la combinaison — adaptation

**Existant :** `buff` / `stealth` ; 19/1/27 ticks ; groupe `walk`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LAUGHING OCTOPUS, préparer « Camouflage de la combinaison — adaptation » ; corps et bras mécaniques de l’armure Octopus, câbles non interchangeables. Montrer la préparation corporelle ou mécanique de « Camouflage de la combinaison — adaptation ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** rétraction des tentacules puis remise en position. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Combinaison opaque et collision conservée ; attaque ou impact rompt l’état de dissimulation. Le changement de texture d’OctoCamo reste à compléter.

##### super — Chasse de Laughing Octopus

**Existant :** `melee` / `tentacle` ; 25/7/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LAUGHING OCTOPUS, préparer « Chasse de Laughing Octopus » ; corps et bras mécaniques de l’armure Octopus, câbles non interchangeables. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** rétraction des tentacules puis remise en position. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Stabiliser la réserve

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LAUGHING OCTOPUS, préparer « Stabiliser la réserve » ; corps et bras mécaniques de l’armure Octopus, câbles non interchangeables. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Stabiliser la réserve ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** rétraction des tentacules puis remise en position. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Chasse de Laughing Octopus — conclusion

Famille `cqc`, ton `stylized` ; 220 ticks CQC ; phases actuelles : prepare → engage → confirm → pose. Appuis déclarés : Chasse de Laughing Octopus.

Plan 1 : LAUGHING OCTOPUS sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Chasse de Laughing Octopus ». Plan 2 : contact de saisie ou neutralisation lié à « Chasse de Laughing Octopus », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : rétraction des tentacules puis remise en position, pose de signature face à l’adversaire.

##### Roulade compacte — adaptation — conclusion

Famille `cqc`, ton `stylized` ; 238 ticks CQC ; phases actuelles : prepare → engage → confirm → pose. Appuis déclarés : Roulade compacte — adaptation.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Roulade compacte — adaptation » ; l’espace disponible doit être lisible. Plan 2 : contact de saisie ou neutralisation lié à « Roulade compacte — adaptation », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : rétraction des tentacules puis remise en position, arrêt du dispositif et retour au cadre d’ensemble.

##### Tentacule de frappe — conclusion

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : prepare → engage → confirm → pose. Appuis déclarés : Tentacule de frappe.

Plan 1 : approche jusqu’à la distance réelle de « Tentacule de frappe », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Tentacule de frappe », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : rétraction des tentacules puis remise en position, prise de distance et maintien final.

##### Projection — conclusion

Famille `cqc`, ton `stylized` ; 274 ticks CQC ; phases actuelles : approach → grapple → impact → pose. Appuis déclarés : Projection.

Plan 1 : après une observation ou un repli, LAUGHING OCTOPUS reprend l’initiative par « Projection ». Plan 2 : contact de saisie ou neutralisation lié à « Projection », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : rétraction des tentacules puis remise en position, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Target is faithful original MGS4 PS3 appearance, closest_supported. Newly authored 2D painted sprites are not extracted PS3 animation, exact model/material/texture pixels or absolute1:1 certification.
- Six native sheets and both facings independently generated, never mirrored or pixel-edited. All144 selected pair poses physically viewed. All failed attempts/prompts/hash inspections retained, no reject repurposed as OC.
- Original PS3 scene lighting partly occludes rear seams, fingers and tiny suit surface detail. Exact badge lettering, material response, mask/hair relief and very fine seam count cannot be certified from bounded captures.
- Authored versus attacks, jump/guard/KO/recovery timings are gameplay adaptations. The original PS3 pursuit/tentacle/roll scope is distinguished from invented choreography. Sprite/import QA does not establish actual gameplay/phase/camera correctness; integrator verifies those.
- Original opaque grey/olive exosuit with closed helmet, black ribbed inner torso, lateral hip rails, complete gauntlets/boots and four broad mechanical ribbons. Back harness and segment/end shape interpreted at sprite scale; occlusion is preserved, not guaranteed full model topology.
- Selected source intro/equipment contract is empty-handed tentacle fighting. A personal firearm model, grenade, independent damaging decoy trap or small explosive orb is not proven by selected captured frames. This does not claim those never occur in original game; do not attach generic rifle/pistol effects to these sprites.
- C shoot is source-equipped tentacle thrust, deploy is physical compact curl/roll, throw is tentacle grasp adaptation, recover retracts/restores stance. Source contact marks are visible ribbon tips for melee only, never muzzle/projectile origins.
- OctoCamo remains opaque. Dynamic texture matching, original source disguise/voice copying and exact camouflage behavior require additional source verification and implementation; these sprites do not certify them.
- [Original PS3 full armored silhouette, four broad articulated ribbons and suspended empty-handed body; dark scene partly occludes reverse harness.](https://archive.org/download/PS3_Longplay_081_Metal_Gear_Solid_4/PS3_Longplay_081_Metal_Gear_Solid_4.mkv#t=13488) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original plated thighs, raised lateral rails, black ribbed inner suit, narrow pale inset ribbon stripes, no generic tactical pouches.](https://archive.org/download/PS3_Longplay_081_Metal_Gear_Solid_4/PS3_Longplay_081_Metal_Gear_Solid_4.mkv#t=13493) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original closed smooth helmet, center seam and sculpted face shell; opaque armor, no skin/hair/eye opening.](https://archive.org/download/PS3_Longplay_081_Metal_Gear_Solid_4/PS3_Longplay_081_Metal_Gear_Solid_4.mkv#t=13505) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original full body with four flat-sided mechanical ribbons, complete feet, unarmed hanging posture.](https://archive.org/download/PS3_Longplay_081_Metal_Gear_Solid_4/PS3_Longplay_081_Metal_Gear_Solid_4.mkv#t=13506) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original curled ribbon envelope, segmented mechanical material, not flesh, blades or claws.](https://archive.org/download/PS3_Longplay_081_Metal_Gear_Solid_4/PS3_Longplay_081_Metal_Gear_Solid_4.mkv#t=13730) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original front body shape and gauntlets with source ribbons; recording HUD partly occludes helmet.](https://archive.org/download/PS3_Longplay_081_Metal_Gear_Solid_4/PS3_Longplay_081_Metal_Gear_Solid_4.mkv#t=13760) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original gameplay compact curled rolling armor/ribbon shape. Source image proves the roll posture; versus timings/damage are adapted.](https://archive.org/download/PS3_Longplay_081_Metal_Gear_Solid_4/PS3_Longplay_081_Metal_Gear_Solid_4.mkv#t=14100) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__raging_raven

### RAGING RAVEN — MGS4 / RENFORTS

**Rôle :** Grenades aériennes et poussée limitée. **Profil :** `raging`.

**Base présente dans le code :** Combinaison à ailes et grenades ; vol borné pour conserver le duel.

**Incarnation à conserver :** Original2008 PS3 MGS4 RAGING RAVEN, armored boss form

**État vérifié :** métadonnées natives avec limites. 72 régions source distinctes dans les deux directions ; groupes : idle, walk, guard, crouch, jump, punch, heavy, low, hit, ko, throw, shoot, deploy, recover, charge, attack.

**Réemplois à examiner :** pas de groupe natif partagé observé dans cette extraction.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `tuxedo`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** RAGING RAVEN : ailes et armement de Raging Raven sur leurs ancrages. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** poussée, vol borné, freinage et réception mécanique. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Grenades aériennes et poussée limitée » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder ailes et armement de Raging Raven sur leurs ancrages.
- **jump_land :** RAGING RAVEN : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. poussée, vol borné, freinage et réception mécanique. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de RAGING RAVEN. Terminer par repli de voilure/armes avant garde. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS4 / RENFORTS », présentation de Original2008 PS3 MGS4 RAGING RAVEN, armored boss form, puis ailes et armement de Raging Raven sur leurs ancrages. Geste court lié à « Lance-grenades » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, repli de voilure/armes avant garde ; RAGING RAVEN vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS4 / RENFORTS.
- **round_loss :** Proposition CQC : RAGING RAVEN réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Raging Raven — bombardement », revenir par repli de voilure/armes avant garde, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAGING RAVEN, préparer « Jab » ; ailes et armement de Raging Raven sur leurs ancrages. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** repli de voilure/armes avant garde.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAGING RAVEN, préparer « Frappe engagée » ; ailes et armement de Raging Raven sur leurs ancrages. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** repli de voilure/armes avant garde.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAGING RAVEN, préparer « Balayage » ; ailes et armement de Raging Raven sur leurs ancrages. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** repli de voilure/armes avant garde.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAGING RAVEN, préparer « Projection » ; ailes et armement de Raging Raven sur leurs ancrages. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** repli de voilure/armes avant garde. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Lance-grenades

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAGING RAVEN, préparer « Lance-grenades » ; ailes et armement de Raging Raven sur leurs ancrages. Prélever l’objet correspondant à « Lance-grenades », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** repli de voilure/armes avant garde. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialDown — Bombardement court

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAGING RAVEN, préparer « Bombardement court » ; ailes et armement de Raging Raven sur leurs ancrages. Prélever l’objet correspondant à « Bombardement court », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. La salve contient 2 émissions, espacées de 10 ticks CQC : recalculer le point de bouche à chaque départ. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** repli de voilure/armes avant garde. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 2 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### specialForward — Propulseurs Raven

**Existant :** `mobility` / `movement` ; 16/20/26 ticks ; groupe `jump`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAGING RAVEN, préparer « Propulseurs Raven » ; ailes et armement de Raging Raven sur leurs ancrages. Préparer l’appui qui produit le déplacement ; poussée, vol borné, freinage et réception mécanique.

**Action.** Exécuter « Propulseurs Raven » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -2 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** repli de voilure/armes avant garde. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Vulnérable aux anti-aériens ; envol borné, pas de vol infini.

##### specialBack — Décrochage

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `walk`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAGING RAVEN, préparer « Décrochage » ; ailes et armement de Raging Raven sur leurs ancrages. Préparer l’appui qui produit le déplacement ; poussée, vol borné, freinage et réception mécanique.

**Action.** Exécuter « Décrochage » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** repli de voilure/armes avant garde. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Raging Raven — bombardement

**Existant :** `projectile` / `explosive` ; 35/1/44 ticks ; groupe `charge`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAGING RAVEN, préparer « Raging Raven — bombardement » ; ailes et armement de Raging Raven sur leurs ancrages. Prélever l’objet correspondant à « Raging Raven — bombardement », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. La salve contient 3 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ. L’objet conserve sa mèche de 48 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** repli de voilure/armes avant garde. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 3 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Refroidir

**Existant :** `recover` / `recovery` ; 45/1/25 ticks ; groupe `recover`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAGING RAVEN, préparer « Refroidir » ; ailes et armement de Raging Raven sur leurs ancrages. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Refroidir ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** repli de voilure/armes avant garde. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Refroidissement ou pause tactique interrompable ; aucun soin gratuit.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Raging Raven — bombardement — conclusion

Famille `explosive`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → shot → impact → pose. Appuis déclarés : Raging Raven — bombardement.

Plan 1 : RAGING RAVEN sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Raging Raven — bombardement ». Plan 2 : montrer la pose/trajectoire et le délai de « Raging Raven — bombardement ». Plan 3 : déclencher au véritable point de dispositif ; poussière, débris et réaction de cible restent indépendants du corps de l’attaquant. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : repli de voilure/armes avant garde, pose de signature face à l’adversaire.

##### Bombardement court — conclusion

Famille `explosive`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → shot → impact → pose. Appuis déclarés : Bombardement court.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Bombardement court » ; l’espace disponible doit être lisible. Plan 2 : montrer la pose/trajectoire et le délai de « Bombardement court ». Plan 3 : déclencher au véritable point de dispositif ; poussière, débris et réaction de cible restent indépendants du corps de l’attaquant. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : repli de voilure/armes avant garde, arrêt du dispositif et retour au cadre d’ensemble.

##### Lance-grenades — conclusion

Famille `explosive`, ton `stylized` ; 256 ticks CQC ; phases actuelles : aim → shot → impact → pose. Appuis déclarés : Lance-grenades.

Plan 1 : approche jusqu’à la distance réelle de « Lance-grenades », arme et main libre identifiées. Plan 2 : montrer la pose/trajectoire et le délai de « Lance-grenades ». Plan 3 : déclencher au véritable point de dispositif ; poussière, débris et réaction de cible restent indépendants du corps de l’attaquant. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : repli de voilure/armes avant garde, prise de distance et maintien final.

##### Projection — conclusion

Famille `explosive`, ton `stylized` ; 274 ticks CQC ; phases actuelles : approach → grapple → impact → pose. Appuis déclarés : Projection.

Plan 1 : après une observation ou un repli, RAGING RAVEN reprend l’initiative par « Projection ». Plan 2 : montrer la pose/trajectoire et le délai de « Projection ». Plan 3 : déclencher au véritable point de dispositif ; poussière, débris et réaction de cible restent indépendants du corps de l’attaquant. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : repli de voilure/armes avant garde, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Target1:1 original2008 PS3 incarnation wherever original evidence supports it. These are newly authored detailed2D poses, not extracted original sprites/mesh or exact motion capture. fidelityStatus closest_supported; absolute1to1Certified false.
- Original longplay metadata identifies PS3 game and recording deposited2014 by Spazbo4/worldoflongplays. Actual native1280x720 frames inspected. Emulator versus physical-console framebuffer, calibrated source palette, hidden reverse-side geometry and exact tiny surface texture are not independently certified.
- Every left and right native sheet independently generated; no runtime mirroring or pixel editing. Fine seams, panel shading, source proportions and detailed face/gear fasteners vary between independent sheets; exact original texture coordinates and seam counts are not certified.
- All CQC shoves/punches, sweeps, defenses, jumps, reaction/KO, animation timing and fighting-game resource/damage/armor values are authored Versus adaptation. Original boss equipment/chase categories do not certify these numerical mechanics or every action as an extracted canonical move.
- The PNG inspector measures12 major isolated native alpha components per sheet. Some bounding rectangles contain neighbor pixels and therefore retain source-bound contour polygons. The twelve final actual Chromium Canvas charts were physically viewed: complete body/equipment, transparent composition and independent facing; originals remain byte-exact. HiddenRGB/low-alpha edge residuals are preserved rather than repainted.
- Per-sheet standing/uprightSourceHeight and foot/body pivots are measured from source alpha, with C neutral pose8 excluding opened-wing tops. displayHeight is authored Canvas presentation, not certified in-world centimetres. Broad wings never determine a pelvis alpha-centroid pivot.
- Source frames23650/24000 establish olive/gray mechanical helmet/black visor+respirator, segmented human exosuit, two broad hinged aircraft blades with pale external struts, mechanical jet-leg/boot category and original hand-carried drum-fed grenade launcher. No feather wings, exposed head, Vulcan Raven man or magical laser substituted.
- Launcher category and silhouette are source supported; exact MGL manufacturer/model, real-world capacity, all hidden grip/feed joints and source ballistic damage/jet forces are not certified by these frames. Author does not label an ordinary rifle as a grenade launcher or claim source-perfect rotary-drum topology.
- Grounded wings are folded/swept to preserve complete silhouette and room; opened-wing hover appears in C9/10/11. All mechanical details remain approximate closest_supported original-category art. No detached smoke/jet flame, projectile or magic effect embedded in body sheets.
- First C RIGHT attempt lost the sling-mounted launcher in active grab and is rejected; second restored it but clipped3 opaque wing-tip edge pixels and is rejected. Third image_gen redraw retains launcher in every pose and complete wing tips with zero opaque border pixels. Both rejects retained unchanged; no OC repurpose.
- C shoot is standing launcher aim; C deploy is grounded low launcher aim; C charge is hovering launcher aim. Actual source muzzle points are measured on first-active-frame1 (whole-sheet3/6/11). Runtime slot binding, collision and weapon handling remain root integration/QA responsibilities.
- Palette, hidden reverse seams and exact launcher model are closest_supported; absolute 1:1 is not certified.
- Independent directions differ slightly in silhouette and pose; no native image mirrored or edited.
- Source-backed equipment and fully opaque adult suit are retained; low and fallen poses must keep their fixed upright source scale.
- [Physically viewed original armor and grenade-launcher/wing/helmet silhouette.](https://archive.org/download/PS3_Longplay_081_Metal_Gear_Solid_4/PS3_Longplay_081_Metal_Gear_Solid_4.mkv#t=23650) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Physically viewed original armor and grenade-launcher/wing/helmet silhouette.](https://archive.org/download/PS3_Longplay_081_Metal_Gear_Solid_4/PS3_Longplay_081_Metal_Gear_Solid_4.mkv#t=24000) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Physically viewed original armor and grenade-launcher/wing/helmet silhouette.](https://archive.org/download/PS3_Longplay_081_Metal_Gear_Solid_4/PS3_Longplay_081_Metal_Gear_Solid_4.mkv#t=24320) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__crying_wolf

### CRYING WOLF — MGS4 / RENFORTS

**Rôle :** Châssis quadrupède et railgun. **Profil :** `crying`.

**Base présente dans le code :** Armure quadrupède et railgun ; pas une tireuse humaine générique.

**Incarnation à conserver :** Original 2008 Metal Gear Solid 4 PlayStation 3 Crying Wolf armored Beast form

**État vérifié :** métadonnées natives avec limites. 72 régions source distinctes dans les deux directions ; groupes : idle, walk, guard, crouch, jump, punch, heavy, low, hit, ko, throw, shoot, deploy, optic, recover, charge, attack.

**Réemplois à examiner :** `heavy` = heavy, specialDown.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** CRYING WOLF : configuration quadrupède de Crying Wolf et railgun sur le châssis. Respiration et petit mouvement de tête/oreilles/queue selon l’anatomie ; les pattes restent stables. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** cycle de quatre pattes avec tête/arme stabilisées. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Châssis quadrupède et railgun » : abaissement et orientation défensive de la tête et du tronc ; ne pas ajouter une parade humaine à deux bras ; recul bloqué distinct de la simple position basse. Garder configuration quadrupède de Crying Wolf et railgun sur le châssis.
- **jump_land :** CRYING WOLF : regroupement des appuis arrière, bond, extension en vol puis réception par les appuis avant et arrière adaptés à l’espèce. cycle de quatre pattes avec tête/arme stabilisées. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Réactions de tête, de flanc et de patte de CRYING WOLF, perte d’appui puis relevé par les membres réellement présents. Terminer par recul et retour du railgun sans transformer le corps en bipède. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS4 / RENFORTS », présentation de Original 2008 Metal Gear Solid 4 PlayStation 3 Crying Wolf armored Beast form, puis configuration quadrupède de Crying Wolf et railgun sur le châssis. Geste court lié à « Railgun dorsal » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, recul et retour du railgun sans transformer le corps en bipède ; CRYING WOLF vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS4 / RENFORTS.
- **round_loss :** Proposition CQC : CRYING WOLF relève la tête, rassemble ses appuis, répartit son poids puis reprend sa position d’attente ; aucun redressement humain. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Blizzard — ligne de feu », revenir par recul et retour du railgun sans transformer le corps en bipède, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Coup de patte blindée

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CRYING WOLF, préparer « Coup de patte blindée » ; configuration quadrupède de Crying Wolf et railgun sur le châssis. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Coup de patte blindée » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul et retour du railgun sans transformer le corps en bipède.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Percussion basse

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CRYING WOLF, préparer « Percussion basse » ; configuration quadrupède de Crying Wolf et railgun sur le châssis. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Percussion basse », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** recul et retour du railgun sans transformer le corps en bipède.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CRYING WOLF, préparer « Balayage » ; configuration quadrupède de Crying Wolf et railgun sur le châssis. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** recul et retour du railgun sans transformer le corps en bipède.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Choc de l’armure Wolf

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CRYING WOLF, préparer « Choc de l’armure Wolf » ; configuration quadrupède de Crying Wolf et railgun sur le châssis. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Choc de l’armure Wolf » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul et retour du railgun sans transformer le corps en bipède.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### special — Railgun dorsal

**Existant :** `projectile` / `rail` ; 51/1/48 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CRYING WOLF, préparer « Railgun dorsal » ; configuration quadrupède de Crying Wolf et railgun sur le châssis. Montrer la prise et la visée de l’arme décrite par « Railgun dorsal » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** recul et retour du railgun sans transformer le corps en bipède. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Se baisser ou punir la préparation ; le rayon ne suit pas un déplacement après départ.

##### specialDown — Charge de Wolf

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CRYING WOLF, préparer « Charge de Wolf » ; configuration quadrupède de Crying Wolf et railgun sur le châssis. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Charge de Wolf » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul et retour du railgun sans transformer le corps en bipède.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialForward — Pistage

**Existant :** `mark` / `recon` ; 26/1/30 ticks ; groupe `jump`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CRYING WOLF, préparer « Pistage » ; configuration quadrupède de Crying Wolf et railgun sur le châssis. Orienter regard, optique ou terminal vers la cible observée, sans consulter une action future.

**Action.** Pour « Pistage », déclencher lecture/repérage avec un petit geste ou changement d’optique et un indicateur séparé. Le corps doit rester visible et vulnérable selon les données de combat.

**Retour.** recul et retour du railgun sans transformer le corps en bipède. Couper le signal ou abaisser l’outil ; retour vers l’adversaire sans nouvelle arme inventée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Portée limitée ; le marquage ne vise ni à travers toute l’arène ni automatiquement.

##### specialBack — Repli du châssis — adaptation

**Existant :** `mobility` / `movement` ; 19/1/27 ticks ; groupe `walk`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CRYING WOLF, préparer « Repli du châssis — adaptation » ; configuration quadrupède de Crying Wolf et railgun sur le châssis. Préparer l’appui qui produit le déplacement ; cycle de quatre pattes avec tête/arme stabilisées.

**Action.** Exécuter « Repli du châssis — adaptation » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -6 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** recul et retour du railgun sans transformer le corps en bipède. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Déplacement rapproché borné, sans invincibilité ; poursuivre ou punir la sortie.

##### super — Blizzard — ligne de feu

**Existant :** `projectile` / `rail` ; 55/1/50 ticks ; groupe `charge`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CRYING WOLF, préparer « Blizzard — ligne de feu » ; configuration quadrupède de Crying Wolf et railgun sur le châssis. Montrer la prise et la visée de l’arme décrite par « Blizzard — ligne de feu » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** recul et retour du railgun sans transformer le corps en bipède. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Préparation longue et trait de visée ; accroupissement ou esquive latérale.

##### utility — Stabiliser la réserve

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CRYING WOLF, préparer « Stabiliser la réserve » ; configuration quadrupède de Crying Wolf et railgun sur le châssis. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Stabiliser la réserve ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** recul et retour du railgun sans transformer le corps en bipède. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Blizzard — ligne de feu — conclusion

Famille `sniper`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → shot → impact → pose. Appuis déclarés : Blizzard — ligne de feu.

Plan 1 : CRYING WOLF sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Blizzard — ligne de feu ». Plan 2 : présenter l’arme effectivement associée à « Blizzard — ligne de feu », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : recul et retour du railgun sans transformer le corps en bipède, pose de signature face à l’adversaire.

##### Charge de Wolf — conclusion

Famille `sniper`, ton `stylized` ; 238 ticks CQC ; phases actuelles : prepare → engage → confirm → pose. Appuis déclarés : Charge de Wolf.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Charge de Wolf » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Charge de Wolf », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : recul et retour du railgun sans transformer le corps en bipède, arrêt du dispositif et retour au cadre d’ensemble.

##### Railgun dorsal — conclusion

Famille `sniper`, ton `stylized` ; 256 ticks CQC ; phases actuelles : aim → shot → impact → pose. Appuis déclarés : Railgun dorsal.

Plan 1 : approche jusqu’à la distance réelle de « Railgun dorsal », arme et main libre identifiées. Plan 2 : présenter l’arme effectivement associée à « Railgun dorsal », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : recul et retour du railgun sans transformer le corps en bipède, prise de distance et maintien final.

##### Choc de l’armure Wolf — conclusion

Famille `sniper`, ton `stylized` ; 274 ticks CQC ; phases actuelles : prepare → engage → confirm → pose. Appuis déclarés : Choc de l’armure Wolf.

Plan 1 : après une observation ou un repli, CRYING WOLF reprend l’initiative par « Choc de l’armure Wolf ». Plan 2 : présenter l’arme effectivement associée à « Choc de l’armure Wolf », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : recul et retour du railgun sans transformer le corps en bipède, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Original 2008 MGS4 PlayStation 3 is the target. Newly authored 2D detailed sprites and 72 Versus poses are closest_supported, not extracted PS3 mesh, animation data, or an absolute 1:1 certification.
- All six facings are independently generated native transparent PNGs. No reflection, body mirroring, image resize, recolor, alpha cleanup, crop/export, or raster edit was performed. Exact imagegen native bytes, args, rejected attempts and hashes are preserved.
- All 72 body crops are unique physical source cells. Action names and animation timings are authored Versus mappings. They do not increase the source pose count or certify original animation timings.
- Some close native atlas cells contain adjacent figure pixels inside their bounding rectangles. Generic read-only component contour metadata excludes foreign figures during Canvas drawing; PNG bytes are unchanged. Normal final green and black Canvas views show complete single bodies.
- Standing source height is fixed per native sheet. Every pose has a separately observed grounded body pivot; crouch, jump and KO preserve naturally short native geometry. Root/integrator must independently verify gameplay size, hitboxes, contacts, costs, phases, mobile rendering and compatibility.
- Producer review covers native art, source provenance, 144 body-ground pivots across the pair and frame metadata. No game repository, runtime catalog, deployment or Git files were modified by this producer.
- Original PS3 captures authenticate the low hulking quadrupedal suit, sensor, broad mechanical paws and recovered original railgun. Armor captures use active snow camouflage. Default dark shell material and whole-body details rely partly on a secondary Creative Uncut mirror claimed to be an original game model; the publisher original render URL was not recovered.
- The dorsal railgun is genuine source equipment. Its visible long rectangular housing, barrel and mount are illustrated close to supplied evidence. Exact all-side mount topology, internal mechanisms and extension articulation during firing are not certified. No extra turret, humanoid rifle or magical emitter is depicted.
- Armored shoulder-shell to grounded paw height excludes the dorsal gun and tail. Display height 195 is a producer proposal for the low broad body; pivots are below the torso between grounded paws and are never alpha-centroid or gun-centroid anchors.
- Forepaw swipes, body checks, low sweeps, grab, guard and pounce are authored fighting-game adaptations of quadrupedal movement. shoot, deploy and charge use the same source-supported railgun; their first active native pixels are measured separately for right and left.
- Actual visible railgun muzzle positions remain high above grounded paws, especially upright shots. They must not be artificially lowered to force crouching hits; trajectory and collision tests remain the integrator responsibility. Source-supported weapon category does not certify free ammo, damage, charge costs or cooldown values.
- B_LEFT_01 was rejected: eleven sensor heads faced right and one pose invented a second rear sensor. All native bytes and args remain retained. B_LEFT_02 independently regenerated the correct left-facing single body.
- [Full exosuit topology and standard material, dorsal railgun geometry](https://www.creativeuncut.com/gallery-06/art/mgs4-crying-wolf.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original PS3 quadrupedal exosuit side and original surface pattern](https://archive.org/download/PS3_Longplay_081_Metal_Gear_Solid_4/PS3_Longplay_081_Metal_Gear_Solid_4.mkv) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original PS3 exosuit front/side relative body scale](https://archive.org/download/PS3_Longplay_081_Metal_Gear_Solid_4/PS3_Longplay_081_Metal_Gear_Solid_4.mkv) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original PS3 railgun recovered after Crying Beauty fight; visible weapon topology](https://archive.org/download/PS3_Longplay_081_Metal_Gear_Solid_4/PS3_Longplay_081_Metal_Gear_Solid_4.mkv) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__screaming_mantis

### SCREAMING MANTIS — MGS4 / RENFORTS

**Rôle :** Bras mécaniques et poupées tenues. **Profil :** `screaming`.

**Base présente dans le code :** Poupées de combat et interface : ne pas confondre avec les pouvoirs innés de Psycho Mantis.

**Incarnation à conserver :** Original2008 MGS4 PS3 armored Beast, closed black dotted helmet, olive cylinders and rig, six extra mechanical arms, attached curved blades and distinct Mantis/Sorrow doll puppets

**État vérifié :** métadonnées natives avec limites. 72 régions source distinctes dans les deux directions ; groupes : idle, walk, guard, crouch, jump, punch, heavy, low, hit, ko, shoot, deploy, throw, recover, attack.

**Réemplois à examiner :** `throw` = throw, super.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `tuxedo`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** SCREAMING MANTIS : marionnettes, fils et bras de Screaming Mantis correctement attachés. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** déplacement du corps et retard des marionnettes. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Bras mécaniques et poupées tenues » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder marionnettes, fils et bras de Screaming Mantis correctement attachés.
- **jump_land :** SCREAMING MANTIS : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. déplacement du corps et retard des marionnettes. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de SCREAMING MANTIS. Terminer par dissipation du contrôle et repositionnement des poupées. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS4 / RENFORTS », présentation de Original2008 MGS4 PS3 armored Beast, closed black dotted helmet, olive cylinders and rig, six extra mechanical arms, attached curved blades and distinct Mantis/Sorrow doll puppets, puis marionnettes, fils et bras de Screaming Mantis correctement attachés. Geste court lié à « Poupée Mantis tenue — repère adapté » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, dissipation du contrôle et repositionnement des poupées ; SCREAMING MANTIS vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS4 / RENFORTS.
- **round_loss :** Proposition CQC : SCREAMING MANTIS réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Saisie mécanique — adaptation », revenir par dissipation du contrôle et repositionnement des poupées, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SCREAMING MANTIS, préparer « Jab » ; marionnettes, fils et bras de Screaming Mantis correctement attachés. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** dissipation du contrôle et repositionnement des poupées.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SCREAMING MANTIS, préparer « Frappe engagée » ; marionnettes, fils et bras de Screaming Mantis correctement attachés. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** dissipation du contrôle et repositionnement des poupées.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SCREAMING MANTIS, préparer « Balayage » ; marionnettes, fils et bras de Screaming Mantis correctement attachés. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** dissipation du contrôle et repositionnement des poupées.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SCREAMING MANTIS, préparer « Projection » ; marionnettes, fils et bras de Screaming Mantis correctement attachés. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** dissipation du contrôle et repositionnement des poupées. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Poupée Mantis tenue — repère adapté

**Existant :** `mark` / `recon` ; 34/1/34 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SCREAMING MANTIS, préparer « Poupée Mantis tenue — repère adapté » ; marionnettes, fils et bras de Screaming Mantis correctement attachés. Orienter regard, optique ou terminal vers la cible observée, sans consulter une action future.

**Action.** Pour « Poupée Mantis tenue — repère adapté », déclencher lecture/repérage avec un petit geste ou changement d’optique et un indicateur séparé. Le corps doit rester visible et vulnérable selon les données de combat.

**Retour.** dissipation du contrôle et repositionnement des poupées. Couper le signal ou abaisser l’outil ; retour vers l’adversaire sans nouvelle arme inventée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Repère visible de versus à portée limitée. La manipulation SOP d’origine ne devient pas un contrôle universel des personnages ou des touches.

##### specialDown — Poupée Sorrow tenue — préparation adaptée

**Existant :** `recover` / `recovery` ; 32/1/34 ticks ; groupe `deploy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SCREAMING MANTIS, préparer « Poupée Sorrow tenue — préparation adaptée » ; marionnettes, fils et bras de Screaming Mantis correctement attachés. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Poupée Sorrow tenue — préparation adaptée ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** dissipation du contrôle et repositionnement des poupées. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pause interrompable avant récupération de la réserve ; aucun soin, projectile ou pouvoir offensif.

##### specialForward — Sustentation

**Existant :** `mobility` / `movement` ; 16/20/26 ticks ; groupe `jump`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SCREAMING MANTIS, préparer « Sustentation » ; marionnettes, fils et bras de Screaming Mantis correctement attachés. Préparer l’appui qui produit le déplacement ; déplacement du corps et retard des marionnettes.

**Action.** Exécuter « Sustentation » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -2 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** dissipation du contrôle et repositionnement des poupées. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Vulnérable aux anti-aériens ; envol borné, pas de vol infini.

##### specialBack — Replier les bras — adaptation

**Existant :** `mobility` / `movement` ; 18/1/27 ticks ; groupe `walk`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SCREAMING MANTIS, préparer « Replier les bras — adaptation » ; marionnettes, fils et bras de Screaming Mantis correctement attachés. Préparer l’appui qui produit le déplacement ; déplacement du corps et retard des marionnettes.

**Action.** Exécuter « Replier les bras — adaptation » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -5 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** dissipation du contrôle et repositionnement des poupées. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Déplacement rapproché borné, sans invincibilité ; poursuivre ou punir la sortie.

##### super — Saisie mécanique — adaptation

**Existant :** `melee` / `grapple` ; 35/1/44 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SCREAMING MANTIS, préparer « Saisie mécanique — adaptation » ; marionnettes, fils et bras de Screaming Mantis correctement attachés. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** dissipation du contrôle et repositionnement des poupées. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saisie mécanique au sol après préparation ; reculer, sauter ou déchoper. Aucun projectile-poupée ou bouclier magique.

##### utility — Stabiliser la réserve

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SCREAMING MANTIS, préparer « Stabiliser la réserve » ; marionnettes, fils et bras de Screaming Mantis correctement attachés. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Stabiliser la réserve ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** dissipation du contrôle et repositionnement des poupées. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Saisie mécanique — adaptation — conclusion

Famille `cqc`, ton `stylized` ; 220 ticks CQC ; phases actuelles : approach → grapple → impact → pose. Appuis déclarés : Saisie mécanique — adaptation.

Plan 1 : SCREAMING MANTIS sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Saisie mécanique — adaptation ». Plan 2 : contact de saisie ou neutralisation lié à « Saisie mécanique — adaptation », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : dissipation du contrôle et repositionnement des poupées, pose de signature face à l’adversaire.

##### Poupée Sorrow tenue — préparation adaptée — conclusion

Famille `cqc`, ton `stylized` ; 238 ticks CQC ; phases actuelles : prepare → engage → confirm → pose. Appuis déclarés : Poupée Sorrow tenue — préparation adaptée.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Poupée Sorrow tenue — préparation adaptée » ; l’espace disponible doit être lisible. Plan 2 : contact de saisie ou neutralisation lié à « Poupée Sorrow tenue — préparation adaptée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : dissipation du contrôle et repositionnement des poupées, arrêt du dispositif et retour au cadre d’ensemble.

##### Poupée Mantis tenue — repère adapté — conclusion

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : prepare → engage → confirm → pose. Appuis déclarés : Poupée Mantis tenue — repère adapté.

Plan 1 : approche jusqu’à la distance réelle de « Poupée Mantis tenue — repère adapté », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Poupée Mantis tenue — repère adapté », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : dissipation du contrôle et repositionnement des poupées, prise de distance et maintien final.

##### Projection — conclusion

Famille `cqc`, ton `stylized` ; 274 ticks CQC ; phases actuelles : approach → grapple → impact → pose. Appuis déclarés : Projection.

Plan 1 : après une observation ou un repli, SCREAMING MANTIS reprend l’initiative par « Projection ». Plan 2 : contact de saisie ou neutralisation lié à « Projection », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : dissipation du contrôle et repositionnement des poupées, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Target 1:1 original MGS4 PS3, closest_supported newly authored 2D sprites from original3D source captures; no absolute pixel/model/material/animation identity certification.
- Main human wearer is enclosed in original olive/charcoal armor, black oval closed helmet with amber dot sensors, olive chest rig and cylindrical mounts. SIX additional articulated black mechanical arms plus two actual human arms; attached source crescent blades and TWO distinct small Mantis/Sorrow dolls remain gear rather than extra fighters.
- Original dolls are supported by close captures36636/36638/36802: gas-mask grey-blue Mantis and dark hooded/military-coat Sorrow. Exact miniature seams, lens hue, strings, fine mask/filter topology, and occluded reverse anatomy are interpreted at sprite scale; Sorrow lens highlights in B RIGHT remain warmer than neutral source. Number/orientation of visibly exposed blade edges varies with authored arm occlusion; source-original blade counts in all original animation frames are not certified.
- Source supplies doll holding/suspension, machinery and SOP/nanomachine manipulation of relevant soldiers. Sprite C keys represent Mantis-doll activation, Sorrow-doll activation, physical machinery grasp and reset. All control doll landmarks are HELD-OBJECT positions, not firearm muzzles or projectile origins. No thrown explosive doll, autonomous trap, magic shield, railshot, telekinetic universal duel effect or generic psychic aura is supported by this delivery. Original story Psycho Mantis/Sorrow associations are not erased; bounded Versus mechanics need explicit adaptation labels.
- Normal light/mechanical strikes, heavy attached blade sweep, low strike, guard, crouch, bounded hover, hit/KO and physical grasp are newly authored Versus adaptations. They are not extracted original animations or canonical duel evidence.
- All six facings independently generated, no mirrored raster and no source pixel edit outside image_gen. B RIGHT1 rejected wrong heavy active empty claw; B RIGHT2 retained corrected heavy but cut canvas-right claw; B RIGHT3 final is complete without opaque borders. All eight native attempts, exact args and rejects preserved, no OC conversion.
- Puppets and thin strings require reviewed COMPLETE alpha8-equipment layout. Original generic threshold80 inspector would crop separated dolls. Custom layout only supplies native rectangles/concave Canvas contours/pivots; every own opaque body/doll pixel retained and neighboring opaque fragments excluded in geometric checks. Integrator must inspect actual Canvas rendering and verify final ground/move phase alignment.
- [Original PS3 close armor and Mantis doll: gas-mask doll with two large round pale-yellow eyepieces/filter, slender grey-blue suited body; dark oval main helmet with amber dots; olive cylindrical arm mounts and chest straps/pouches.](https://archive.org/download/PS3_Longplay_081_Metal_Gear_Solid_4/PS3_Longplay_081_Metal_Gear_Solid_4.mkv) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original PS3 armor/bracers and Sorrow doll: smaller pale round lenses, dark grey hooded/military coat, pale hands and grey trousers. Distinct small doll, not a thrown grenade.](https://archive.org/download/PS3_Longplay_081_Metal_Gear_Solid_4/PS3_Longplay_081_Metal_Gear_Solid_4.mkv) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original PS3 main armor, SIX extra mechanical arms plus two human braced arms, attached curved mechanical blades and BOTH small suspended dolls: frontal Mantis doll on wearer right/image left, Sorrow doll on wearer left/image right.](https://archive.org/download/PS3_Longplay_081_Metal_Gear_Solid_4/PS3_Longplay_081_Metal_Gear_Solid_4.mkv) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original PS3 rear/side shoulder cylindrical machinery and attached extra arms; exact partly occluded reverse details qualified.](https://archive.org/download/PS3_Longplay_081_Metal_Gear_Solid_4/PS3_Longplay_081_Metal_Gear_Solid_4.mkv) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original PS3 complete hovering armored main wearer, source boot soles and physical broad mechanical claw/attached blade rig; captured motion partially blurs fingertips.](https://archive.org/download/PS3_Longplay_081_Metal_Gear_Solid_4/PS3_Longplay_081_Metal_Gear_Solid_4.mkv) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__chris_jenner

### CHRIS JENNER — GHOST / RENFORTS

**Rôle :** Tir, grenades et distance. **Profil :** `soldier`.

**Base présente dans le code :** Agent de terrain de Ghost Babel ; équipement conventionnel adapté, pas de pouvoirs de Black Chamber.

**Incarnation à conserver :** Delta Force Galuade infiltration, original GBC green uniform

**État vérifié :** métadonnées natives avec limites. 31 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, attack, hit, ko, punch, low, throw, deploy, shoot, reload, recover, parry.

**Réemplois à examiner :** `punch` = light, heavy, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `nextgen`, `tuxedo`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** CHRIS JENNER : appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas courts, crosse/équipement conservés près du torse. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Tir, grenades et distance » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder appui militaire stable, arme maintenue dans l’axe et regard vers la menace.
- **jump_land :** CHRIS JENNER : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas courts, crosse/équipement conservés près du torse. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de CHRIS JENNER. Terminer par retour en couverture de l’arme après le coup. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « GHOST / RENFORTS », présentation de Delta Force Galuade infiltration, original GBC green uniform, puis appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Geste court lié à « Carabine de Chris » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, retour en couverture de l’arme après le coup ; CHRIS JENNER vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à GHOST / RENFORTS.
- **round_loss :** Proposition CQC : CHRIS JENNER réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Couverture d’extraction », revenir par retour en couverture de l’arme après le coup, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CHRIS JENNER, préparer « Jab » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CHRIS JENNER, préparer « Frappe engagée » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CHRIS JENNER, préparer « Balayage » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CHRIS JENNER, préparer « Projection » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** retour en couverture de l’arme après le coup. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Carabine de Chris

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CHRIS JENNER, préparer « Carabine de Chris » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Carabine de Chris » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Grenade de Gindra

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CHRIS JENNER, préparer « Grenade de Gindra » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Prélever l’objet correspondant à « Grenade de Gindra », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Entrée de secours

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CHRIS JENNER, préparer « Entrée de secours » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Entrée de secours » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Repli de l’agent

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `walk`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CHRIS JENNER, préparer « Repli de l’agent » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer l’appui qui produit le déplacement ; pas courts, crosse/équipement conservés près du torse.

**Action.** Exécuter « Repli de l’agent » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** retour en couverture de l’arme après le coup. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Couverture d’extraction

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CHRIS JENNER, préparer « Couverture d’extraction » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Couverture d’extraction » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CHRIS JENNER, préparer « Recharger » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** retour en couverture de l’arme après le coup. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Couverture d’extraction — Final

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Couverture d’extraction / Carabine de Chris.

Plan 1 : CHRIS JENNER sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Couverture d’extraction / Carabine de Chris ». Plan 2 : présenter l’arme effectivement associée à « Couverture d’extraction / Carabine de Chris », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : retour en couverture de l’arme après le coup, pose de signature face à l’adversaire.

##### Carabine de Chris / Grenade de Gindra

Famille `ballistic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Couverture d’extraction / Grenade de Gindra.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Couverture d’extraction / Grenade de Gindra » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Couverture d’extraction / Grenade de Gindra », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : retour en couverture de l’arme après le coup, arrêt du dispositif et retour au cadre d’ensemble.

##### Entrée de secours — Point final

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Couverture d’extraction / Entrée de secours.

Plan 1 : approche jusqu’à la distance réelle de « Couverture d’extraction / Entrée de secours », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Couverture d’extraction / Entrée de secours », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : retour en couverture de l’arme après le coup, prise de distance et maintien final.

##### Sang-froid — Mission close

Famille `ballistic`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Couverture d’extraction / Projection.

Plan 1 : après une observation ou un repli, CHRIS JENNER reprend l’initiative par « Couverture d’extraction / Projection ». Plan 2 : présenter l’arme effectivement associée à « Couverture d’extraction / Projection », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : retour en couverture de l’arme après le coup, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Sixteen physically reviewed independent key poses per facing, 32 total. Walk has two key poses; no full captured motion cycle claim.
- Independent left/right generation preserves canonical anatomical sides; source PNGs stay byte-identical, no mirroring or pixel processing.
- Runtime rects derive from the actual native alpha components. Some rects overlap a neighbor; authored alpha boundary Canvas clip polygons exclude that neighbor while preserving all principal-body pixels above alpha 8.
- One pose may serve several engine move slots. Timings/phase maps are CQC adaptations; original battle geometry, damage, resources and AI are unchanged.
- Weapon small details, fabric folds and face likeness remain stylized. Closest accepted interpretation, no certified pixel-perfect 1:1 fidelity.
- No complete campaign, music or voice work supplied in this sprite candidate.
- No muzzle flash or particles are painted into the shoot poses; most shoot groups contain one aimed-pose keyframe held across phases. Projectile/effect timing remains the engine responsibility.
- GBC reference bodies are small top-down sprites; expanded side view and fine clothing/equipment details are game adaptations, not authenticated full-body concept art.
- Existing CQC Carabine de Chris is drawn as the R5 available in original Ghost Babel. Her possession/firearm firing is a CQC adaptation, not an authenticated original GBC cutscene assignment.
- Actual corrected RIGHT cell10 is grenade readiness and cell11 is R5 readiness; LEFT cell11 is grenade. Metadata follows actual body/gear poses. Grapple followthrough reuses punch/guard key poses to avoid showing a grenade during a throw.
- [Original-game capture / original publisher character art physically viewed before generation; canonical incarnation reference.](https://lparchive.org/Metal-Gear-Ghost-Babel/Update%2012/2-jennerjerk11.png) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original-game capture / original publisher character art physically viewed before generation; canonical incarnation reference.](https://lparchive.org/Metal-Gear-Ghost-Babel/Update%2012/18-jennerjerk24.png) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original-game capture / original publisher character art physically viewed before generation; canonical incarnation reference.](https://lparchive.org/Metal-Gear-Ghost-Babel/Update%2008/4-chris.png) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original-game capture / original publisher character art physically viewed before generation; canonical incarnation reference.](https://lparchive.org/Metal-Gear-Ghost-Babel/Update%2006/7-wqmZq.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__campbell_mpo

### ROY CAMPBELL — JEUNE — MPO / RENFORTS

**Rôle :** Tir, grenades et distance. **Profil :** `soldier`.

**Base présente dans le code :** Campbell jeune est un soldat de terrain, distinct du commandant Codec âgé.

**Incarnation à conserver :** Original game incarnation, reference-based hand-painted native combat keyframes

**État vérifié :** métadonnées natives avec limites. 32 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, attack, punch, low, throw, deploy, shoot, reload, hit, ko, roll, jump, optic, recover, parry.

**Réemplois à examiner :** `attack` = heavy, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `nextgen`, `tuxedo`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** ROY CAMPBELL — JEUNE : appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas courts, crosse/équipement conservés près du torse. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Tir, grenades et distance » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder appui militaire stable, arme maintenue dans l’axe et regard vers la menace.
- **jump_land :** ROY CAMPBELL — JEUNE : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas courts, crosse/équipement conservés près du torse. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de ROY CAMPBELL — JEUNE. Terminer par retour en couverture de l’arme après le coup. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MPO / RENFORTS », présentation de Original game incarnation, reference-based hand-painted native combat keyframes, puis appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Geste court lié à « Tir du prisonnier » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, retour en couverture de l’arme après le coup ; ROY CAMPBELL — JEUNE vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MPO / RENFORTS.
- **round_loss :** Proposition CQC : ROY CAMPBELL — JEUNE réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Évasion coordonnée », revenir par retour en couverture de l’arme après le coup, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ROY CAMPBELL — JEUNE, préparer « Jab » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `attack`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ROY CAMPBELL — JEUNE, préparer « Frappe engagée » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ROY CAMPBELL — JEUNE, préparer « Balayage » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ROY CAMPBELL — JEUNE, préparer « Projection » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** retour en couverture de l’arme après le coup. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Tir du prisonnier

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ROY CAMPBELL — JEUNE, préparer « Tir du prisonnier » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Tir du prisonnier » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Grenade récupérée

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ROY CAMPBELL — JEUNE, préparer « Grenade récupérée » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Prélever l’objet correspondant à « Grenade récupérée », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Crosse du soldat

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `attack`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ROY CAMPBELL — JEUNE, préparer « Crosse du soldat » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Crosse du soldat » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Repli de Campbell

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `walk`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ROY CAMPBELL — JEUNE, préparer « Repli de Campbell » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer l’appui qui produit le déplacement ; pas courts, crosse/équipement conservés près du torse.

**Action.** Exécuter « Repli de Campbell » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** retour en couverture de l’arme après le coup. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Évasion coordonnée

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ROY CAMPBELL — JEUNE, préparer « Évasion coordonnée » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Évasion coordonnée » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ROY CAMPBELL — JEUNE, préparer « Recharger » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** retour en couverture de l’arme après le coup. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Évasion coordonnée — Final

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Évasion coordonnée / Tir du prisonnier.

Plan 1 : ROY CAMPBELL — JEUNE sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Évasion coordonnée / Tir du prisonnier ». Plan 2 : présenter l’arme effectivement associée à « Évasion coordonnée / Tir du prisonnier », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : retour en couverture de l’arme après le coup, pose de signature face à l’adversaire.

##### Tir du prisonnier / Grenade récupérée

Famille `ballistic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Évasion coordonnée / Grenade récupérée.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Évasion coordonnée / Grenade récupérée » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Évasion coordonnée / Grenade récupérée », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : retour en couverture de l’arme après le coup, arrêt du dispositif et retour au cadre d’ensemble.

##### Crosse du soldat — Point final

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Évasion coordonnée / Crosse du soldat.

Plan 1 : approche jusqu’à la distance réelle de « Évasion coordonnée / Crosse du soldat », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Évasion coordonnée / Crosse du soldat », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : retour en couverture de l’arme après le coup, prise de distance et maintien final.

##### Sang-froid — Mission close

Famille `ballistic`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Évasion coordonnée / Projection.

Plan 1 : après une observation ou un repli, ROY CAMPBELL — JEUNE reprend l’initiative par « Évasion coordonnée / Projection ». Plan 2 : présenter l’arme effectivement associée à « Évasion coordonnée / Projection », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : retour en couverture de l’arme après le coup, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact, not a certified pixel-perfect 1:1 copy. Canonical identity/costume checked against supplied original or official references.
- Sixteen visually reviewed physical keyframes per direction, thirty-two distinct poses per identity. Action groups share keyframes explicitly; no full motion-capture cycle claim.
- Thirteen required action groups plus optional groups reuse actual poses. Standing source-height scale preserves shorter crouch/KO poses; timing and interpolation are duel adaptations.
- Each direction independently authored; no raster mirroring. Tiny facial, insignia and weapon detail remains approximate at combat scale.
- Source crops follow observed alpha components; wider KO or weapon rectangles may cross the advertised invisible grid. Canvas clip polygons exclude nearby figures where necessary, native PNG bytes unchanged.
- No engine, collision, HP, lore, readiness or gameplay mutation; actual gameplay QA remains Root integration work.
- Some shooting cells include authored muzzle flash. The actual firing cell is restricted to active attack phase; startup/recovery explicitly reuse the authored recovery or weapon-manipulation pose without flash. Snake AC!D LEFT recovery has empty hands. Flash differences between independently authored directions remain qualified.
- [Published official Portable Ops artbook original JP2 reference pages, locally preserved source, documentary conversion actually viewed.](https://archive.org/download/the-mgs-po-artbook/The%20MGS%20PO%20Artbook_jp2.zip) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__cunningham

### CUNNINGHAM — MPO / RENFORTS

**Rôle :** Plateforme de vol adaptée à l’échelle duel. **Profil :** `cunningham`.

**Base présente dans le code :** La plateforme de Cunningham est adaptée à la taille du duel ; pas de vol permanent.

**Incarnation à conserver :** Original game incarnation, reference-based hand-painted native combat keyframes

**État vérifié :** métadonnées natives avec limites. 32 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, attack, punch, low, throw, deploy, shoot, reload, hit, ko, roll, jump, optic, recover, parry.

**Réemplois à examiner :** `deploy` = special, specialDown, super.

**Techniques pointant sur une seule région native dans la direction principale :** special, specialDown, specialBack, super, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `nextgen`, `tuxedo`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** CUNNINGHAM : plateforme et organe d’armement de Cunningham distincts du corps. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** déplacement de la plateforme avec inertie contrôlée. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Plateforme de vol adaptée à l’échelle duel » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder plateforme et organe d’armement de Cunningham distincts du corps.
- **jump_land :** CUNNINGHAM : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. déplacement de la plateforme avec inertie contrôlée. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de CUNNINGHAM. Terminer par fin de tir et stabilisation mécanique. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MPO / RENFORTS », présentation de Original game incarnation, reference-based hand-painted native combat keyframes, puis plateforme et organe d’armement de Cunningham distincts du corps. Geste court lié à « Laser de plateforme » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, fin de tir et stabilisation mécanique ; CUNNINGHAM vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MPO / RENFORTS.
- **round_loss :** Proposition CQC : CUNNINGHAM réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Tir de plateforme », revenir par fin de tir et stabilisation mécanique, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CUNNINGHAM, préparer « Jab » ; plateforme et organe d’armement de Cunningham distincts du corps. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** fin de tir et stabilisation mécanique.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `attack`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CUNNINGHAM, préparer « Frappe engagée » ; plateforme et organe d’armement de Cunningham distincts du corps. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** fin de tir et stabilisation mécanique.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CUNNINGHAM, préparer « Balayage » ; plateforme et organe d’armement de Cunningham distincts du corps. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** fin de tir et stabilisation mécanique.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Poussée du châssis

**Existant :** `melee` / `strike` ; 13/4/32 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CUNNINGHAM, préparer « Poussée du châssis » ; plateforme et organe d’armement de Cunningham distincts du corps. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Poussée du châssis » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** fin de tir et stabilisation mécanique.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### special — Laser de plateforme

**Existant :** `projectile` / `laser` ; 25/1/34 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CUNNINGHAM, préparer « Laser de plateforme » ; plateforme et organe d’armement de Cunningham distincts du corps. Montrer la prise et la visée de l’arme décrite par « Laser de plateforme » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** fin de tir et stabilisation mécanique. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde ; l’EMP ouvre les défenses des machines sans les désactiver définitivement.

##### specialDown — Roquette montée

**Existant :** `projectile` / `rocket` ; 32/1/38 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CUNNINGHAM, préparer « Roquette montée » ; plateforme et organe d’armement de Cunningham distincts du corps. Montrer la prise et la visée de l’arme décrite par « Roquette montée » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** fin de tir et stabilisation mécanique. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Verrouillage lent, virage limité ; le missile peut être détruit.

##### specialForward — Poussée de sustentation

**Existant :** `mobility` / `movement` ; 16/20/26 ticks ; groupe `walk`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CUNNINGHAM, préparer « Poussée de sustentation » ; plateforme et organe d’armement de Cunningham distincts du corps. Préparer l’appui qui produit le déplacement ; déplacement de la plateforme avec inertie contrôlée.

**Action.** Exécuter « Poussée de sustentation » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -2 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** fin de tir et stabilisation mécanique. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Vulnérable aux anti-aériens ; envol borné, pas de vol infini.

##### specialBack — Protection de cabine

**Existant :** `buff` / `shield` ; 18/1/27 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CUNNINGHAM, préparer « Protection de cabine » ; plateforme et organe d’armement de Cunningham distincts du corps. Montrer la préparation corporelle ou mécanique de « Protection de cabine ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** fin de tir et stabilisation mécanique. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Deux projectiles frontaux maximum ; le corps à corps et les saisies restent efficaces.

##### super — Tir de plateforme

**Existant :** `projectile` / `laser` ; 55/1/50 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CUNNINGHAM, préparer « Tir de plateforme » ; plateforme et organe d’armement de Cunningham distincts du corps. Montrer la prise et la visée de l’arme décrite par « Tir de plateforme » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** fin de tir et stabilisation mécanique. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Préparation longue et trait de visée ; accroupissement ou esquive latérale.

##### utility — Stabiliser la réserve

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CUNNINGHAM, préparer « Stabiliser la réserve » ; plateforme et organe d’armement de Cunningham distincts du corps. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Stabiliser la réserve ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** fin de tir et stabilisation mécanique. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Flying Platform

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Tir de plateforme / Laser de plateforme.

Plan 1 : CUNNINGHAM sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Tir de plateforme / Laser de plateforme ». Plan 2 : présenter l’arme effectivement associée à « Tir de plateforme / Laser de plateforme », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : fin de tir et stabilisation mécanique, pose de signature face à l’adversaire.

##### Rocket Barrage

Famille `ballistic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Tir de plateforme / Roquette montée.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Tir de plateforme / Roquette montée » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Tir de plateforme / Roquette montée », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : fin de tir et stabilisation mécanique, arrêt du dispositif et retour au cadre d’ensemble.

##### FOX Interrogation

Famille `mechanical`, ton `stylized` ; 256 ticks CQC ; phases actuelles : lock → barrage → core → shutdown. Appuis déclarés : Tir de plateforme / Poussée de sustentation.

Plan 1 : approche jusqu’à la distance réelle de « Tir de plateforme / Poussée de sustentation », arme et main libre identifiées. Plan 2 : déplacement de la plateforme avec inertie contrôlée ; montrer l’organe de « Tir de plateforme / Poussée de sustentation ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : fin de tir et stabilisation mécanique, prise de distance et maintien final.

##### Cunningham Falls

Famille `mechanical`, ton `stylized` ; 274 ticks CQC ; phases actuelles : lock → barrage → core → shutdown. Appuis déclarés : Tir de plateforme / Poussée du châssis.

Plan 1 : après une observation ou un repli, CUNNINGHAM reprend l’initiative par « Tir de plateforme / Poussée du châssis ». Plan 2 : déplacement de la plateforme avec inertie contrôlée ; montrer l’organe de « Tir de plateforme / Poussée du châssis ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : fin de tir et stabilisation mécanique, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact, not a certified pixel-perfect 1:1 copy. Canonical identity/costume checked against supplied original or official references.
- Sixteen visually reviewed physical keyframes per direction, thirty-two distinct poses per identity. Action groups share keyframes explicitly; no full motion-capture cycle claim.
- Thirteen required action groups plus optional groups reuse actual poses. Standing source-height scale preserves shorter crouch/KO poses; timing and interpolation are duel adaptations.
- Each direction independently authored; no raster mirroring. Tiny facial, insignia and weapon detail remains approximate at combat scale.
- Source crops follow observed alpha components; wider KO or weapon rectangles may cross the advertised invisible grid. Canvas clip polygons exclude nearby figures where necessary, native PNG bytes unchanged.
- No engine, collision, HP, lore, readiness or gameplay mutation; actual gameplay QA remains Root integration work.
- Native atlas contains the human body only, with anatomical right lower-leg prosthesis. Existing mounted hover-platform and its laser/rocket mechanics must remain in Core; empty command poses do not certify a full canonical platform encounter. V1 invented pistol poses rejected and retained.
- Some shooting cells include authored muzzle flash. The actual firing cell is restricted to active attack phase; startup/recovery explicitly reuse the authored recovery or weapon-manipulation pose without flash. Snake AC!D LEFT recovery has empty hands. Flash differences between independently authored directions remain qualified.
- [Published official Portable Ops artbook original JP2 reference pages, locally preserved source, documentary conversion actually viewed.](https://archive.org/download/the-mgs-po-artbook/The%20MGS%20PO%20Artbook_jp2.zip) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__blade_wolf

### BLADE WOLF / LQ-84I — MGR / RENFORTS

**Rôle :** Griffes, bond et scie dorsale. **Profil :** `wolf_robot`.

**Base présente dans le code :** Original LQ-84i MGR quadruped; dorsal articulated chainsaw and separate flexible clamp tail. No tail-tip blade, gun, laser, optical cloaking, teleport or projected energy inferred from art. Native body scale is shoulder-to-paw plane, excluding saw and tail; never a humanoid two-foot pivot. Mechanical-status immunity and EMP interaction are bounded authored gameplay, not a measured original interaction table. Les contacts, collisions, jauges, coûts, durées et cadences sont des adaptations du versus, pas des valeurs des jeux originaux.

**Incarnation à conserver :** Original2013 red-visor LQ-84i quadrupedal machine, no biological wolf or humanoid replacement

**État vérifié :** métadonnées natives avec limites. 72 régions source distinctes dans les deux directions ; groupes : idle, walk, guard, crouch, punch, heavy, low, jump, shoot, throw, deploy, recover, hit, ko, charge, attack.

**Réemplois à examiner :** `heavy` = heavy, specialDown.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** BLADE WOLF / LQ-84I : LQ-84i : quatre pattes, bras dorsal à tronçonneuse et queue-pince séparés. Petits ajustements mécaniques des organes présents et optique stable ; aucune respiration humaine. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** cycle robotique quadrupède ; impulsion arrière puis réception avant. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Griffes, bond et scie dorsale » : orientation défensive du châssis, des membres ou de la protection effectivement présente ; pas d’avant-bras humain ajouté ; recul bloqué distinct de la simple position basse. Garder LQ-84i : quatre pattes, bras dorsal à tronçonneuse et queue-pince séparés.
- **jump_land :** BLADE WOLF / LQ-84I : départ par poussée ou articulation autorisée, déplacement aérien puis stabilisation et reprise d’appui ; les appareils volants gardent leur mode de sustentation. cycle robotique quadrupède ; impulsion arrière puis réception avant. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Secousse du châssis et de l’organe touché de BLADE WOLF / LQ-84I, déséquilibre, arrêt puis remise en position par ses articulations réelles. Terminer par bras dorsal et queue reviennent chacun sur leur propre articulation. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGR / RENFORTS », présentation de Original2013 red-visor LQ-84i quadrupedal machine, no biological wolf or humanoid replacement, puis LQ-84i : quatre pattes, bras dorsal à tronçonneuse et queue-pince séparés. Geste court lié à « Bond prédateur » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, bras dorsal et queue reviennent chacun sur leur propre articulation ; BLADE WOLF / LQ-84I vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGR / RENFORTS.
- **round_loss :** Proposition CQC : BLADE WOLF / LQ-84I interrompt ses émissions, absorbe l’oscillation de sa masse, stabilise ses appuis ou son vol, puis replace ses organes ; aucune régénération gratuite. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « LQ-84i — attaque complète », revenir par bras dorsal et queue reviennent chacun sur leur propre articulation, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Griffe mécanique

**Existant :** `melee` / `strike` ; 7/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BLADE WOLF / LQ-84I, préparer « Griffe mécanique » ; LQ-84i : quatre pattes, bras dorsal à tronçonneuse et queue-pince séparés. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Griffe mécanique » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** bras dorsal et queue reviennent chacun sur leur propre articulation.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Adaptation du versus : préparation et sortie visibles, garde/saut/espacement adaptés au geste ; aucune invincibilité ou arme supplémentaire.

##### heavy — Coupe dorsale

**Existant :** `melee` / `blade` ; 18/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BLADE WOLF / LQ-84I, préparer « Coupe dorsale » ; LQ-84i : quatre pattes, bras dorsal à tronçonneuse et queue-pince séparés. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** bras dorsal et queue reviennent chacun sur leur propre articulation. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Adaptation du versus : préparation et sortie visibles, garde/saut/espacement adaptés au geste ; aucune invincibilité ou arme supplémentaire.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BLADE WOLF / LQ-84I, préparer « Balayage » ; LQ-84i : quatre pattes, bras dorsal à tronçonneuse et queue-pince séparés. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** bras dorsal et queue reviennent chacun sur leur propre articulation.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Bond de déséquilibre

**Existant :** `melee` / `strike` ; 12/4/29 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BLADE WOLF / LQ-84I, préparer « Bond de déséquilibre » ; LQ-84i : quatre pattes, bras dorsal à tronçonneuse et queue-pince séparés. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Bond de déséquilibre » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** bras dorsal et queue reviennent chacun sur leur propre articulation.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### special — Bond prédateur

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `jump`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BLADE WOLF / LQ-84I, préparer « Bond prédateur » ; LQ-84i : quatre pattes, bras dorsal à tronçonneuse et queue-pince séparés. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Bond prédateur » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** bras dorsal et queue reviennent chacun sur leur propre articulation.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialDown — Tronçonneuse dorsale

**Existant :** `melee` / `blade` ; 16/5/29 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BLADE WOLF / LQ-84I, préparer « Tronçonneuse dorsale » ; LQ-84i : quatre pattes, bras dorsal à tronçonneuse et queue-pince séparés. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** bras dorsal et queue reviennent chacun sur leur propre articulation. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Adaptation du versus : préparation et sortie visibles, garde/saut/espacement adaptés au geste ; aucune invincibilité ou arme supplémentaire.

##### specialForward — Approche mécanique

**Existant :** `mobility` / `movement` ; 19/12/27 ticks ; groupe `walk`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BLADE WOLF / LQ-84I, préparer « Approche mécanique » ; LQ-84i : quatre pattes, bras dorsal à tronçonneuse et queue-pince séparés. Préparer l’appui qui produit le déplacement ; cycle robotique quadrupède ; impulsion arrière puis réception avant.

**Action.** Exécuter « Approche mécanique » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 4 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** bras dorsal et queue reviennent chacun sur leur propre articulation. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Adaptation du versus : préparation et sortie visibles, garde/saut/espacement adaptés au geste ; aucune invincibilité ou arme supplémentaire.

##### specialBack — Contre lupin

**Existant :** `parry` / `counter` ; 3/10/29 ticks ; groupe `guard`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BLADE WOLF / LQ-84I, préparer « Contre lupin » ; LQ-84i : quatre pattes, bras dorsal à tronçonneuse et queue-pince séparés. Présenter la surface ou l’organe de parade et maintenir une fenêtre courte lisible.

**Action.** Recevoir puis dévier au contact réel pour « Contre lupin » ; la riposte et son effet n’apparaissent qu’après succès. Une attente sans contact garde une pose différente du contre réussi.

**Retour.** bras dorsal et queue reviennent chacun sur leur propre articulation. Séparer sortie ratée, blocage simple et riposte ; aucun effet de réussite avant collision.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Retarder la frappe, projeter ou attendre les 29 images de récupération.

##### super — LQ-84i — attaque complète

**Existant :** `melee` / `blade` ; 25/7/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BLADE WOLF / LQ-84I, préparer « LQ-84i — attaque complète » ; LQ-84i : quatre pattes, bras dorsal à tronçonneuse et queue-pince séparés. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** bras dorsal et queue reviennent chacun sur leur propre articulation. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Stabiliser la réserve

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BLADE WOLF / LQ-84I, préparer « Stabiliser la réserve » ; LQ-84i : quatre pattes, bras dorsal à tronçonneuse et queue-pince séparés. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Stabiliser la réserve ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** bras dorsal et queue reviennent chacun sur leur propre articulation. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Bond prédateur — conclusion adaptée

Famille `cqc`, ton `stylized` ; 220 ticks CQC ; phases actuelles : prepare → contact → confirm → pose. Appuis déclarés : Bond prédateur.

Plan 1 : BLADE WOLF / LQ-84I sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Bond prédateur ». Plan 2 : contact de saisie ou neutralisation lié à « Bond prédateur », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : bras dorsal et queue reviennent chacun sur leur propre articulation, pose de signature face à l’adversaire.

##### Tronçonneuse dorsale — conclusion adaptée

Famille `blade`, ton `stylized` ; 238 ticks CQC ; phases actuelles : prepare → contact → confirm → pose. Appuis déclarés : Tronçonneuse dorsale.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Tronçonneuse dorsale » ; l’espace disponible doit être lisible. Plan 2 : armer la lame ou le membre de « Tronçonneuse dorsale » et dégager son arc. Plan 3 : enchaîner des coupes lisibles avec angles distincts ; les impacts et les réactions suivent le fil de lame, sans ajout d’arme d’une autre incarnation. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : bras dorsal et queue reviennent chacun sur leur propre articulation, arrêt du dispositif et retour au cadre d’ensemble.

##### Approche mécanique — conclusion adaptée

Famille `tactical`, ton `stylized` ; 256 ticks CQC ; phases actuelles : prepare → move → settle → pose. Appuis déclarés : Approche mécanique.

Plan 1 : approche jusqu’à la distance réelle de « Approche mécanique », arme et main libre identifiées. Plan 2 : matérialiser le geste tactique « Approche mécanique » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : bras dorsal et queue reviennent chacun sur leur propre articulation, prise de distance et maintien final.

##### Bond de déséquilibre — conclusion adaptée

Famille `cqc`, ton `stylized` ; 274 ticks CQC ; phases actuelles : prepare → contact → confirm → pose. Appuis déclarés : Bond de déséquilibre.

Plan 1 : après une observation ou un repli, BLADE WOLF / LQ-84I reprend l’initiative par « Bond de déséquilibre ». Plan 2 : contact de saisie ou neutralisation lié à « Bond de déséquilibre », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : bras dorsal et queue reviennent chacun sur leur propre articulation, rangement/pose finale différente des trois autres.

#### Limites et preuves

- The source character render is attributed original game model art hosted by an independent public game-art gallery; primary publisher download authentication is not claimed. It is not an original game capture or exported animation.
- Art shows a chainsaw on an articulated dorsal arm near the hind-root and a separate flexible gripper-tail. Legacy caudal-saw wording is not evidence for placing a second arbitrary blade at its gripper tip.
- Hidden reverse seams, tiny markings, exact hinge internals and fine dorsal knife count remain closest_supported, not absolute1:1 certified.
- Combat phases, pounces, grapples, costs, timing and recovery are authored Versus adaptations. Art alone does not prove optical cloaking, teleportation, shielding, healing or hitbox reach.
- C right attempt1 rejected: pose11 faces LEFT. Original rejected PNG/prompt/tool-return are retained intact. Six selected native sources comprise72 unique authored poses, not144; aliases add no poses.
- Generated authored combat phases are adaptations; exact original animation extraction and absolute pixel/model 1:1 certification are not claimed.
- [Original LQ-84i complete quadrupedal mechanical body, red visor, dorsal articulated chainsaw and separate flexible gripper tail.](https://www.creativeuncut.com/gallery-22/art/mgrr-bladewolf.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__khamsin

### KHAMSIN — MGR / RENFORTS

**Rôle :** Exosquelette et hache massive. **Profil :** `khamsin`.

**Base présente dans le code :** Khamsin reste porté par son exosquelette et sa hache ; mouvements lourds et télégraphiés.

**Incarnation à conserver :** Khamsin reste porté par son exosquelette et sa hache ; mouvements lourds et télégraphiés.

**État vérifié :** route machine effectivement déclarée ; animations d’articulation à contrôler. Une route machine est déclarée dans le runtime. Ses articulations remplacent le catalogue de corps contrôlé ; ce n’est pas un constat de sprite absent.

**Réemplois à examiner :** pas de groupe natif partagé observé dans cette extraction.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** KHAMSIN : corps de Khamsin, unité de combat et grande hache sur leurs vraies attaches. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas pesants puis attaque dont l’inertie déplace le châssis. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Exosquelette et hache massive » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder corps de Khamsin, unité de combat et grande hache sur leurs vraies attaches.
- **jump_land :** KHAMSIN : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas pesants puis attaque dont l’inertie déplace le châssis. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de KHAMSIN. Terminer par freinage de la hache et stabilisation du cockpit. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGR / RENFORTS », présentation de Khamsin reste porté par son exosquelette et sa hache ; mouvements lourds et télégraphiés., puis corps de Khamsin, unité de combat et grande hache sur leurs vraies attaches. Geste court lié à « Hache motorisée » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, freinage de la hache et stabilisation du cockpit ; KHAMSIN vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGR / RENFORTS.
- **round_loss :** Proposition CQC : KHAMSIN réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Désert brûlant », revenir par freinage de la hache et stabilisation du cockpit, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Contact de lame

**Existant :** `melee` / `spear` ; 7/3/12 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de KHAMSIN, préparer « Contact de lame » ; corps de Khamsin, unité de combat et grande hache sur leurs vraies attaches. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** freinage de la hache et stabilisation du cockpit. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Coupe engagée

**Existant :** `melee` / `spear` ; 18/5/24 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de KHAMSIN, préparer « Coupe engagée » ; corps de Khamsin, unité de combat et grande hache sur leurs vraies attaches. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** freinage de la hache et stabilisation du cockpit. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de KHAMSIN, préparer « Balayage » ; corps de Khamsin, unité de combat et grande hache sur leurs vraies attaches. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** freinage de la hache et stabilisation du cockpit.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de KHAMSIN, préparer « Projection » ; corps de Khamsin, unité de combat et grande hache sur leurs vraies attaches. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** freinage de la hache et stabilisation du cockpit. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Hache motorisée

**Existant :** `melee` / `blade` ; 35/5/24 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de KHAMSIN, préparer « Hache motorisée » ; corps de Khamsin, unité de combat et grande hache sur leurs vraies attaches. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** freinage de la hache et stabilisation du cockpit. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde puis punition ; la lame ne touche qu’une fois par attaque.

##### specialDown — Verrou hydraulique

**Existant :** `buff` / `armor` ; 22/1/31 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de KHAMSIN, préparer « Verrou hydraulique » ; corps de Khamsin, unité de combat et grande hache sur leurs vraies attaches. Montrer la préparation corporelle ou mécanique de « Verrou hydraulique ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** freinage de la hache et stabilisation du cockpit. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Absorbe une seule frappe ; projections, EMP et attaques brise-armure la contrent.

##### specialForward — Poussée du châssis

**Existant :** `melee` / `strike` ; 28/7/32 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de KHAMSIN, préparer « Poussée du châssis » ; corps de Khamsin, unité de combat et grande hache sur leurs vraies attaches. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Poussée du châssis » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** freinage de la hache et stabilisation du cockpit.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Arme montée

**Existant :** `projectile` / `rocket` ; 32/1/38 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de KHAMSIN, préparer « Arme montée » ; corps de Khamsin, unité de combat et grande hache sur leurs vraies attaches. Montrer la prise et la visée de l’arme décrite par « Arme montée » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** freinage de la hache et stabilisation du cockpit. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Verrouillage lent, virage limité ; le missile peut être détruit.

##### super — Désert brûlant

**Existant :** `melee` / `strike` ; 45/7/44 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de KHAMSIN, préparer « Désert brûlant » ; corps de Khamsin, unité de combat et grande hache sur leurs vraies attaches. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Désert brûlant », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** freinage de la hache et stabilisation du cockpit.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Refroidir

**Existant :** `recover` / `recovery` ; 45/1/25 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de KHAMSIN, préparer « Refroidir » ; corps de Khamsin, unité de combat et grande hache sur leurs vraies attaches. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Refroidir ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** freinage de la hache et stabilisation du cockpit. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Refroidissement ou pause tactique interrompable ; aucun soin gratuit.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Desert Storm

Famille `cqc`, ton `stylized` ; 220 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Désert brûlant / Hache motorisée.

Plan 1 : KHAMSIN sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Désert brûlant / Hache motorisée ». Plan 2 : contact de saisie ou neutralisation lié à « Désert brûlant / Hache motorisée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : freinage de la hache et stabilisation du cockpit, pose de signature face à l’adversaire.

##### Axe Hydraulic

Famille `blade`, ton `stylized` ; 238 ticks CQC ; phases actuelles : dash → crosscut → freeze → sheath. Appuis déclarés : Désert brûlant / Verrou hydraulique.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Désert brûlant / Verrou hydraulique » ; l’espace disponible doit être lisible. Plan 2 : armer la lame ou le membre de « Désert brûlant / Verrou hydraulique » et dégager son arc. Plan 3 : enchaîner des coupes lisibles avec angles distincts ; les impacts et les réactions suivent le fil de lame, sans ajout d’arme d’une autre incarnation. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : freinage de la hache et stabilisation du cockpit, arrêt du dispositif et retour au cadre d’ensemble.

##### Freedom Hammer

Famille `mechanical`, ton `stylized` ; 256 ticks CQC ; phases actuelles : lock → barrage → core → shutdown. Appuis déclarés : Désert brûlant / Poussée du châssis.

Plan 1 : approche jusqu’à la distance réelle de « Désert brûlant / Poussée du châssis », arme et main libre identifiées. Plan 2 : pas pesants puis attaque dont l’inertie déplace le châssis ; montrer l’organe de « Désert brûlant / Poussée du châssis ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : freinage de la hache et stabilisation du cockpit, prise de distance et maintien final.

##### Hot Wind

Famille `mechanical`, ton `stylized` ; 274 ticks CQC ; phases actuelles : lock → barrage → core → shutdown. Appuis déclarés : Désert brûlant / Projection.

Plan 1 : après une observation ou un repli, KHAMSIN reprend l’initiative par « Désert brûlant / Projection ». Plan 2 : pas pesants puis attaque dont l’inertie déplace le châssis ; montrer l’organe de « Désert brûlant / Projection ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : freinage de la hache et stabilisation du cockpit, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Aucun pouvoir importé d’une autre incarnation.
- Aucune invulnérabilité permanente, saisie infinie ou contrôle des touches adverses.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__bloody_brad

### BLOODY BRAD — MG1 / RENFORTS

**Rôle :** Créature : charge et blindage cristallin. **Profil :** `wanderer`.

**Base présente dans le code :** Android lourd d’Outer Heaven ; ensemble de mêlée de simulation, sans armes modernes ajoutées.

**Incarnation à conserver :** Original MSX2 Arnold / TX-11 human-appearance android

**État vérifié :** métadonnées natives avec limites. 72 régions source distinctes dans les deux directions ; groupes : idle, walk, guard, crouch, jump, punch, heavy, low, hit, ko, throw, charge, brace, stomp, recover, attack.

**Réemplois à examiner :** `throw` = throw, specialForward ; `charge` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `tuxedo`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** BLOODY BRAD : silhouette déformée et organe cristallin propres au type de Wanderer. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** démarche irrégulière avec appuis malgré la déformation. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Créature : charge et blindage cristallin » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder silhouette déformée et organe cristallin propres au type de Wanderer.
- **jump_land :** BLOODY BRAD : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. démarche irrégulière avec appuis malgré la déformation. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de BLOODY BRAD. Terminer par déséquilibre puis réorientation de la masse. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MG1 / RENFORTS », présentation de Original MSX2 Arnold / TX-11 human-appearance android, puis silhouette déformée et organe cristallin propres au type de Wanderer. Geste court lié à « Poing d’androïde » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, déséquilibre puis réorientation de la masse ; BLOODY BRAD vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MG1 / RENFORTS.
- **round_loss :** Proposition CQC : BLOODY BRAD réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Assaut d’Outer Heaven », revenir par déséquilibre puis réorientation de la masse, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BLOODY BRAD, préparer « Jab » ; silhouette déformée et organe cristallin propres au type de Wanderer. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** déséquilibre puis réorientation de la masse.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BLOODY BRAD, préparer « Frappe engagée » ; silhouette déformée et organe cristallin propres au type de Wanderer. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** déséquilibre puis réorientation de la masse.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BLOODY BRAD, préparer « Balayage » ; silhouette déformée et organe cristallin propres au type de Wanderer. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** déséquilibre puis réorientation de la masse.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BLOODY BRAD, préparer « Projection » ; silhouette déformée et organe cristallin propres au type de Wanderer. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** déséquilibre puis réorientation de la masse. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Poing d’androïde

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `charge`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BLOODY BRAD, préparer « Poing d’androïde » ; silhouette déformée et organe cristallin propres au type de Wanderer. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Poing d’androïde » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** déséquilibre puis réorientation de la masse.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialDown — Blindage Bloody Brad

**Existant :** `buff` / `armor` ; 22/1/31 ticks ; groupe `brace`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BLOODY BRAD, préparer « Blindage Bloody Brad » ; silhouette déformée et organe cristallin propres au type de Wanderer. Montrer la préparation corporelle ou mécanique de « Blindage Bloody Brad ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** déséquilibre puis réorientation de la masse. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Absorbe une seule frappe ; projections, EMP et attaques brise-armure la contrent.

##### specialForward — Étau mécanique

**Existant :** `melee` / `grapple` ; 10/3/32 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BLOODY BRAD, préparer « Étau mécanique » ; silhouette déformée et organe cristallin propres au type de Wanderer. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** déséquilibre puis réorientation de la masse. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Hors de portée ou saut ; ne saisir ni cible aérienne ni cible sous protection post-projection.

##### specialBack — Piétinement

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `stomp`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BLOODY BRAD, préparer « Piétinement » ; silhouette déformée et organe cristallin propres au type de Wanderer. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** déséquilibre puis réorientation de la masse.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### super — Assaut d’Outer Heaven

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `charge`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BLOODY BRAD, préparer « Assaut d’Outer Heaven » ; silhouette déformée et organe cristallin propres au type de Wanderer. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Assaut d’Outer Heaven », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** déséquilibre puis réorientation de la masse.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Stabiliser la réserve

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BLOODY BRAD, préparer « Stabiliser la réserve » ; silhouette déformée et organe cristallin propres au type de Wanderer. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Stabiliser la réserve ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** déséquilibre puis réorientation de la masse. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Assaut d’Outer Heaven — Final

Famille `cqc`, ton `stylized` ; 220 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Assaut d’Outer Heaven / Poing d’androïde.

Plan 1 : BLOODY BRAD sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Assaut d’Outer Heaven / Poing d’androïde ». Plan 2 : contact de saisie ou neutralisation lié à « Assaut d’Outer Heaven / Poing d’androïde », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : déséquilibre puis réorientation de la masse, pose de signature face à l’adversaire.

##### Poing d’androïde / Blindage Bloody Brad

Famille `cqc`, ton `stylized` ; 238 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Assaut d’Outer Heaven / Blindage Bloody Brad.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Assaut d’Outer Heaven / Blindage Bloody Brad » ; l’espace disponible doit être lisible. Plan 2 : contact de saisie ou neutralisation lié à « Assaut d’Outer Heaven / Blindage Bloody Brad », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : déséquilibre puis réorientation de la masse, arrêt du dispositif et retour au cadre d’ensemble.

##### Étau mécanique — Point final

Famille `mechanical`, ton `stylized` ; 256 ticks CQC ; phases actuelles : lock → barrage → core → shutdown. Appuis déclarés : Assaut d’Outer Heaven / Étau mécanique.

Plan 1 : approche jusqu’à la distance réelle de « Assaut d’Outer Heaven / Étau mécanique », arme et main libre identifiées. Plan 2 : démarche irrégulière avec appuis malgré la déformation ; montrer l’organe de « Assaut d’Outer Heaven / Étau mécanique ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : déséquilibre puis réorientation de la masse, prise de distance et maintien final.

##### Châssis — Mission close

Famille `mechanical`, ton `stylized` ; 274 ticks CQC ; phases actuelles : lock → barrage → core → shutdown. Appuis déclarés : Assaut d’Outer Heaven / Projection.

Plan 1 : après une observation ou un repli, BLOODY BRAD reprend l’initiative par « Assaut d’Outer Heaven / Projection ». Plan 2 : démarche irrégulière avec appuis malgré la déformation ; montrer l’organe de « Assaut d’Outer Heaven / Projection ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : déséquilibre puis réorientation de la masse, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Closest supported adaptation, not a certified pixel-for-pixel 1:1 reconstruction. Original MSX2 sprite is very small; downloaded mirrored sprites/captures do not certify native hardware framebuffer pixels or exact hardware palette.
- Original MSX2 sprite/capture govern navy-blue/black upper top, military-green trousers, flesh-toned humanlike head/hands and dark boots. Exact collar, sleeve length, seams, muscle definition, boot lacing and fine facial details are not resolved at original scale; the chosen simple long-sleeve costume is conservative interpretation kept consistent across all six sheets.
- 1987 monochrome manual group supports the far-right Arnold unit broad humanoid proportions and no held weapon. It supplies no independent color proof. Other mercenaries and their weapons were excluded.
- Later official Database head is secondary silhouette context only. It does not establish a detailed 1987 face, hidden robot body or modern costume. No other incarnation was imported.
- The original game contact/chasing encounter does not provide these 72 brawler animation frames, named attack timings or resource rules. Ten current CQC simulation moves determine action grouping. Guard/jump/sweep/grapple/charge/armor brace/stomp/recover are authored gameplay adaptation with no added gun/chrome/visor/electrical shield.
- Generated narrative/stage art was not used as canonical body proof. The generated master is continuity reference only.
- Directions were independently generated/edited as opposite views without raster mirroring. No unique handedness, asymmetrical badge or hidden equipment is asserted from the low-resolution source.
- Some native poses cross a strict regular grid boundary. Observed separated-component rectangles, pelvis-band pivots and Canvas alpha-contour clipping are metadata for integration; native PNG bytes remain intact.
- The historic generic wanderer/creature role text remains in the archived combat profile. It is not body authority for Bloody Brad and was not changed by this delivery.
- displayHeight250 is a practical integration suggestion rather than a source-certified physical height. Integrator must validate fixed source scale and runtime crops in both facings.
- Closest supported adaptation, not a certified pixel-for-pixel 1:1 reconstruction. Original MSX2 sprite is very small; downloaded mirrored sprites/captures do not certify native hardware framebuffer pixels or exact hardware palette.
- Original MSX2 sprite/capture govern navy-blue/black upper top, military-green trousers, flesh-toned humanlike head/hands and dark boots. Exact collar, sleeve length, seams, muscle definition, boot lacing and fine facial details are not resolved at original scale; the chosen simple long-sleeve costume is conservative interpretation kept consistent across all six sheets.
- 1987 monochrome manual group supports the far-right Arnold unit broad humanoid proportions and no held weapon. It supplies no independent color proof. Other mercenaries and their weapons were excluded.
- Later official Database head is secondary silhouette context only. It does not establish a detailed 1987 face, hidden robot body or modern costume. No other incarnation was imported.
- The original game contact/chasing encounter does not provide these 72 brawler animation frames, named attack timings or resource rules. Ten current CQC simulation moves determine action grouping. Guard/jump/sweep/grapple/charge/armor brace/stomp/recover are authored gameplay adaptation with no added gun/chrome/visor/electrical shield.
- Generated narrative/stage art was not used as canonical body proof. The generated master is continuity reference only.
- Directions were independently generated/edited as opposite views without raster mirroring. No unique handedness, asymmetrical badge or hidden equipment is asserted from the low-resolution source.
- Some native poses cross a strict regular grid boundary. Observed separated-component rectangles, pelvis-band pivots and Canvas alpha-contour clipping are metadata for integration; native PNG bytes remain intact.
- The historic generic wanderer/creature role text remains in the archived combat profile. It is not body authority for Bloody Brad and was not changed by this delivery.
- displayHeight250 is a practical integration suggestion rather than a source-certified physical height. Integrator must validate fixed source scale and runtime crops in both facings.
- Integrator physically viewed original1987 sprite, capture394, shared original manual group plate and later Database head. Secondary Database face supports only head silhouette; exact1987 facial/tailoring detail remains interpreted.
- Several PNGs retain colored RGB beneath alpha0; inspected blank pixels are truly transparent. Native files copied unchanged, and render crops/contours rely on their alpha.
- [Primary1987MSX2 body/palette](https://thecodex.wiki/images/6/60/Brad.png) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Primary1987MSX2 body/palette](https://lparchive.org/Metal-Gear-1-2/Update%2009/30-Metal_Gear_0394.png) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Room only:no Brad visible](https://lparchive.org/Metal-Gear-1-2/Update%2009/34-Metal_Gear_0396.png) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Primary1987manual morphology/equipment silhouette only;monochrome](https://lparchive.org/Metal-Gear-1-2/Update%2011/58-wSLfj.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Secondary laterofficialMGS4Database head only:not1987costume authority](https://thecodex.wiki/images/a/a7/Bloody_Brad_%28MGS4DB%29.webp) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).
