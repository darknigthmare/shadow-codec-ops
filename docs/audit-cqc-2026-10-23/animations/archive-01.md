# Animations — ARCHIVE

**10 acteurs du registre courant.** Les titres d’actions et paramètres sont observés ; les descriptions sont des propositions CQC à produire et valider. Un groupe de frames existant ne certifie pas l’ensemble du mouvement ou sa fidélité originale.

[Index des fiches](README.md) · [Contrat commun](../04_ANIMATIONS_SPRITES.md)

## Sommaire

- [LAUGHING BEAUTY](#archive__laughing_beauty) — MGS4
- [RAGING BEAUTY](#archive__raging_beauty) — MGS4
- [CRYING BEAUTY](#archive__crying_beauty) — MGS4
- [SCREAMING BEAUTY](#archive__screaming_beauty) — MGS4
- [DREBIN 893](#archive__drebin) — MGS4
- [BIG MAMA](#archive__big_mama) — MGS4
- [PAZ ORTEGA ANDRADE](#archive__paz) — PEACE WALKER
- [VLADIMIR ZADORNOV](#archive__zadornov) — PEACE WALKER
- [HOT COLDMAN](#archive__coldman) — PEACE WALKER
- [SKULL FACE](#archive__skull_face) — MGSV

## archive__laughing_beauty

### LAUGHING BEAUTY — MGS4

**Rôle :** Forme Beauty — approche et saisie. **Profil :** `unarmed_beauty`.

**Base présente dans le code :** Forme humaine de MGS4 original, combinaison opaque et mains vides. Approche et étreinte observées ; frappes, garde et esquive adaptées au versus.

**Incarnation à conserver :** Original MGS4 PS32008 adult unarmored Beauty form

**État vérifié :** métadonnées natives avec limites. 72 régions source distinctes dans les deux directions ; groupes : idle, walk, guard, crouch, jump, punch, heavy, low, hit, ko, shoot, deploy, throw, recover, attack.

**Réemplois à examiner :** `throw` = throw, special ; `walk` = specialForward, specialBack.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** LAUGHING BEAUTY : corps Beauty distinct de son armure, mains vides et posture de cette version. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** démarche humaine, aucun membre mécanique transféré depuis la Beast. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Forme Beauty — approche et saisie » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder corps Beauty distinct de son armure, mains vides et posture de cette version.
- **jump_land :** LAUGHING BEAUTY : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. démarche humaine, aucun membre mécanique transféré depuis la Beast. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de LAUGHING BEAUTY. Terminer par réaction humaine et reprise de souffle sans sortir une arme absente. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS4 », présentation de Original MGS4 PS32008 adult unarmored Beauty form, puis corps Beauty distinct de son armure, mains vides et posture de cette version. Geste court lié à « Étreinte — adaptation rapprochée » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, réaction humaine et reprise de souffle sans sortir une arme absente ; LAUGHING BEAUTY vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS4.
- **round_loss :** Proposition CQC : LAUGHING BEAUTY réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Sortie de l’étreinte — adaptation », revenir par réaction humaine et reprise de souffle sans sortir une arme absente, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LAUGHING BEAUTY, préparer « Jab » ; corps Beauty distinct de son armure, mains vides et posture de cette version. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** réaction humaine et reprise de souffle sans sortir une arme absente.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LAUGHING BEAUTY, préparer « Frappe engagée » ; corps Beauty distinct de son armure, mains vides et posture de cette version. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** réaction humaine et reprise de souffle sans sortir une arme absente.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LAUGHING BEAUTY, préparer « Balayage » ; corps Beauty distinct de son armure, mains vides et posture de cette version. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** réaction humaine et reprise de souffle sans sortir une arme absente.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LAUGHING BEAUTY, préparer « Projection » ; corps Beauty distinct de son armure, mains vides et posture de cette version. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** réaction humaine et reprise de souffle sans sortir une arme absente. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Étreinte — adaptation rapprochée

**Existant :** `melee` / `grapple` ; 10/3/32 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LAUGHING BEAUTY, préparer « Étreinte — adaptation rapprochée » ; corps Beauty distinct de son armure, mains vides et posture de cette version. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** réaction humaine et reprise de souffle sans sortir une arme absente. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Hors de portée ou saut ; ne saisir ni cible aérienne ni cible sous protection post-projection.

##### specialDown — Se dégager au sol — adaptation

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `deploy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LAUGHING BEAUTY, préparer « Se dégager au sol — adaptation » ; corps Beauty distinct de son armure, mains vides et posture de cette version. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** réaction humaine et reprise de souffle sans sortir une arme absente.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### specialForward — Approche nerveuse

**Existant :** `mobility` / `movement` ; 7/18/25 ticks ; groupe `walk`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LAUGHING BEAUTY, préparer « Approche nerveuse » ; corps Beauty distinct de son armure, mains vides et posture de cette version. Préparer l’appui qui produit le déplacement ; démarche humaine, aucun membre mécanique transféré depuis la Beast.

**Action.** Exécuter « Approche nerveuse » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 6 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** réaction humaine et reprise de souffle sans sortir une arme absente. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : La silhouette reste touchable ; la sortie est punissable.

##### specialBack — Recul de Laughing Beauty

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `walk`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LAUGHING BEAUTY, préparer « Recul de Laughing Beauty » ; corps Beauty distinct de son armure, mains vides et posture de cette version. Préparer l’appui qui produit le déplacement ; démarche humaine, aucun membre mécanique transféré depuis la Beast.

**Action.** Exécuter « Recul de Laughing Beauty » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** réaction humaine et reprise de souffle sans sortir une arme absente. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Sortie de l’étreinte — adaptation

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LAUGHING BEAUTY, préparer « Sortie de l’étreinte — adaptation » ; corps Beauty distinct de son armure, mains vides et posture de cette version. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Sortie de l’étreinte — adaptation », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** réaction humaine et reprise de souffle sans sortir une arme absente.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Reprendre son souffle

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LAUGHING BEAUTY, préparer « Reprendre son souffle » ; corps Beauty distinct de son armure, mains vides et posture de cette version. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Reprendre son souffle ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** réaction humaine et reprise de souffle sans sortir une arme absente. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Sortie de l’étreinte — adaptation — conclusion

Famille `cqc`, ton `stylized` ; 220 ticks CQC ; phases actuelles : prepare → engage → confirm → pose. Appuis déclarés : Sortie de l’étreinte — adaptation.

Plan 1 : LAUGHING BEAUTY sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Sortie de l’étreinte — adaptation ». Plan 2 : contact de saisie ou neutralisation lié à « Sortie de l’étreinte — adaptation », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : réaction humaine et reprise de souffle sans sortir une arme absente, pose de signature face à l’adversaire.

##### Se dégager au sol — adaptation — conclusion

Famille `cqc`, ton `stylized` ; 238 ticks CQC ; phases actuelles : prepare → engage → confirm → pose. Appuis déclarés : Se dégager au sol — adaptation.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Se dégager au sol — adaptation » ; l’espace disponible doit être lisible. Plan 2 : contact de saisie ou neutralisation lié à « Se dégager au sol — adaptation », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : réaction humaine et reprise de souffle sans sortir une arme absente, arrêt du dispositif et retour au cadre d’ensemble.

##### Étreinte — adaptation rapprochée — conclusion

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → pose. Appuis déclarés : Étreinte — adaptation rapprochée.

Plan 1 : approche jusqu’à la distance réelle de « Étreinte — adaptation rapprochée », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Étreinte — adaptation rapprochée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : réaction humaine et reprise de souffle sans sortir une arme absente, prise de distance et maintien final.

##### Projection — conclusion

Famille `cqc`, ton `stylized` ; 274 ticks CQC ; phases actuelles : approach → grapple → impact → pose. Appuis déclarés : Projection.

Plan 1 : après une observation ou un repli, LAUGHING BEAUTY reprend l’initiative par « Projection ». Plan 2 : contact de saisie ou neutralisation lié à « Projection », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : réaction humaine et reprise de souffle sans sortir une arme absente, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Target is faithful original MGS4 PS3 appearance, closest_supported. Newly authored 2D painted sprites are not extracted PS3 animation, exact model/material/texture pixels or absolute1:1 certification.
- Six native sheets and both facings independently generated, never mirrored or pixel-edited. All144 selected pair poses physically viewed. All failed attempts/prompts/hash inspections retained, no reject repurposed as OC.
- Original PS3 scene lighting partly occludes rear seams, fingers and tiny suit surface detail. Exact badge lettering, material response, mask/hair relief and very fine seam count cannot be certified from bounded captures.
- Authored versus attacks, jump/guard/KO/recovery timings are gameplay adaptations. The original PS3 pursuit/tentacle/roll scope is distinguished from invented choreography. Sprite/import QA does not establish actual gameplay/phase/camera correctness; integrator verifies those.
- Adult unarmored original Laughing Beauty has pale short asymmetric blonde bob, opaque high-neck grey/olive/bronze technological suit, pale hip/thigh panels and integrated pale low-heel footwear. No pink costume, long hair, heavy tactical boots, pouches/holster, helmet or tentacles inherited from raw archive placeholder. Hand material is subdued by source lighting; no independent tactical gauntlets certified.
- Only unarmed reaching/chase/grab and physical defense/composure gestures are source-associated. B palm shove/low sweep and versus super are clearly authored physical simulation, not canonical martial-arts mastery, magical marking, beam, psychic power or mechanical tentacle.
- C shoot is unarmed reaching grab, deploy is low physical evade/defense, throw is sleeve/forearm grasp control, recover is composure. No ballistic/muzzle origins applicable.
- [Original adult Laughing Beauty face, pale grey-blue eyes, short asymmetrical pale blonde bob and dark high collar.](https://archive.org/download/PS3_Longplay_081_Metal_Gear_Solid_4/PS3_Longplay_081_Metal_Gear_Solid_4.mkv#t=14240) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original complete side body walking/pursuing: opaque metallic grey olive-bronze suit, darker torso/legs, paler fitted hip/thigh panels, integrated pale low-heel footwear and empty slender hands.](https://archive.org/download/PS3_Longplay_081_Metal_Gear_Solid_4/PS3_Longplay_081_Metal_Gear_Solid_4.mkv#t=14260) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original rear torso panel/seams, opaque suit and source hair length; lighting partly occludes fine finger material.](https://archive.org/download/PS3_Longplay_081_Metal_Gear_Solid_4/PS3_Longplay_081_Metal_Gear_Solid_4.mkv#t=14280) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original fully clothed crouch/physical pursuit position, hands placed on floor, no equipment, firearm, tentacles or magic.](https://archive.org/download/PS3_Longplay_081_Metal_Gear_Solid_4/PS3_Longplay_081_Metal_Gear_Solid_4.mkv#t=14300) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original full body in actual Beauty gameplay phase, same opaque suit and ordinary unarmed pursuit. Distant recording does not certify tiny seams.](https://archive.org/download/PS3_Longplay_081_Metal_Gear_Solid_4/PS3_Longplay_081_Metal_Gear_Solid_4.mkv#t=14400) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## archive__raging_beauty

### RAGING BEAUTY — MGS4

**Rôle :** Forme Beauty — approche et saisie. **Profil :** `unarmed_beauty`.

**Base présente dans le code :** Forme humaine de MGS4 original, combinaison opaque et mains vides. Approche et étreinte observées ; frappes, garde et esquive adaptées au versus.

**Incarnation à conserver :** Original2008 PS3 MGS4 RAGING BEAUTY, fully clothed unarmored adult Beauty boss form

**État vérifié :** métadonnées natives avec limites. 72 régions source distinctes dans les deux directions ; groupes : idle, walk, guard, crouch, jump, punch, heavy, low, hit, ko, throw, shoot, deploy, recover, charge, attack.

**Réemplois à examiner :** `low` = low, specialDown ; `throw` = throw, special ; `walk` = specialForward, specialBack.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** RAGING BEAUTY : corps Beauty distinct de son armure, mains vides et posture de cette version. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** démarche humaine, aucun membre mécanique transféré depuis la Beast. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Forme Beauty — approche et saisie » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder corps Beauty distinct de son armure, mains vides et posture de cette version.
- **jump_land :** RAGING BEAUTY : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. démarche humaine, aucun membre mécanique transféré depuis la Beast. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de RAGING BEAUTY. Terminer par réaction humaine et reprise de souffle sans sortir une arme absente. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS4 », présentation de Original2008 PS3 MGS4 RAGING BEAUTY, fully clothed unarmored adult Beauty boss form, puis corps Beauty distinct de son armure, mains vides et posture de cette version. Geste court lié à « Étreinte — adaptation rapprochée » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, réaction humaine et reprise de souffle sans sortir une arme absente ; RAGING BEAUTY vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS4.
- **round_loss :** Proposition CQC : RAGING BEAUTY réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Sortie de l’étreinte — adaptation », revenir par réaction humaine et reprise de souffle sans sortir une arme absente, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAGING BEAUTY, préparer « Jab » ; corps Beauty distinct de son armure, mains vides et posture de cette version. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** réaction humaine et reprise de souffle sans sortir une arme absente.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAGING BEAUTY, préparer « Frappe engagée » ; corps Beauty distinct de son armure, mains vides et posture de cette version. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** réaction humaine et reprise de souffle sans sortir une arme absente.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAGING BEAUTY, préparer « Balayage » ; corps Beauty distinct de son armure, mains vides et posture de cette version. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** réaction humaine et reprise de souffle sans sortir une arme absente.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAGING BEAUTY, préparer « Projection » ; corps Beauty distinct de son armure, mains vides et posture de cette version. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** réaction humaine et reprise de souffle sans sortir une arme absente. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Étreinte — adaptation rapprochée

**Existant :** `melee` / `grapple` ; 10/3/32 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAGING BEAUTY, préparer « Étreinte — adaptation rapprochée » ; corps Beauty distinct de son armure, mains vides et posture de cette version. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** réaction humaine et reprise de souffle sans sortir une arme absente. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Hors de portée ou saut ; ne saisir ni cible aérienne ni cible sous protection post-projection.

##### specialDown — Se dégager au sol — adaptation

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAGING BEAUTY, préparer « Se dégager au sol — adaptation » ; corps Beauty distinct de son armure, mains vides et posture de cette version. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** réaction humaine et reprise de souffle sans sortir une arme absente.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### specialForward — Course courte

**Existant :** `mobility` / `movement` ; 7/18/25 ticks ; groupe `walk`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAGING BEAUTY, préparer « Course courte » ; corps Beauty distinct de son armure, mains vides et posture de cette version. Préparer l’appui qui produit le déplacement ; démarche humaine, aucun membre mécanique transféré depuis la Beast.

**Action.** Exécuter « Course courte » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 6 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** réaction humaine et reprise de souffle sans sortir une arme absente. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : La silhouette reste touchable ; la sortie est punissable.

##### specialBack — Recul de Raging Beauty

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `walk`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAGING BEAUTY, préparer « Recul de Raging Beauty » ; corps Beauty distinct de son armure, mains vides et posture de cette version. Préparer l’appui qui produit le déplacement ; démarche humaine, aucun membre mécanique transféré depuis la Beast.

**Action.** Exécuter « Recul de Raging Beauty » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** réaction humaine et reprise de souffle sans sortir une arme absente. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Sortie de l’étreinte — adaptation

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `charge`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAGING BEAUTY, préparer « Sortie de l’étreinte — adaptation » ; corps Beauty distinct de son armure, mains vides et posture de cette version. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Sortie de l’étreinte — adaptation », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** réaction humaine et reprise de souffle sans sortir une arme absente.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Reprendre son souffle

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAGING BEAUTY, préparer « Reprendre son souffle » ; corps Beauty distinct de son armure, mains vides et posture de cette version. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Reprendre son souffle ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** réaction humaine et reprise de souffle sans sortir une arme absente. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Sortie de l’étreinte — adaptation — conclusion

Famille `cqc`, ton `stylized` ; 220 ticks CQC ; phases actuelles : prepare → engage → confirm → pose. Appuis déclarés : Sortie de l’étreinte — adaptation.

Plan 1 : RAGING BEAUTY sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Sortie de l’étreinte — adaptation ». Plan 2 : contact de saisie ou neutralisation lié à « Sortie de l’étreinte — adaptation », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : réaction humaine et reprise de souffle sans sortir une arme absente, pose de signature face à l’adversaire.

##### Se dégager au sol — adaptation — conclusion

Famille `cqc`, ton `stylized` ; 238 ticks CQC ; phases actuelles : prepare → engage → confirm → pose. Appuis déclarés : Se dégager au sol — adaptation.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Se dégager au sol — adaptation » ; l’espace disponible doit être lisible. Plan 2 : contact de saisie ou neutralisation lié à « Se dégager au sol — adaptation », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : réaction humaine et reprise de souffle sans sortir une arme absente, arrêt du dispositif et retour au cadre d’ensemble.

##### Étreinte — adaptation rapprochée — conclusion

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → pose. Appuis déclarés : Étreinte — adaptation rapprochée.

Plan 1 : approche jusqu’à la distance réelle de « Étreinte — adaptation rapprochée », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Étreinte — adaptation rapprochée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : réaction humaine et reprise de souffle sans sortir une arme absente, prise de distance et maintien final.

##### Projection — conclusion

Famille `cqc`, ton `stylized` ; 274 ticks CQC ; phases actuelles : approach → grapple → impact → pose. Appuis déclarés : Projection.

Plan 1 : après une observation ou un repli, RAGING BEAUTY reprend l’initiative par « Projection ». Plan 2 : contact de saisie ou neutralisation lié à « Projection », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : réaction humaine et reprise de souffle sans sortir une arme absente, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Target1:1 original2008 PS3 incarnation wherever original evidence supports it. These are newly authored detailed2D poses, not extracted original sprites/mesh or exact motion capture. fidelityStatus closest_supported; absolute1to1Certified false.
- Original longplay metadata identifies PS3 game and recording deposited2014 by Spazbo4/worldoflongplays. Actual native1280x720 frames inspected. Emulator versus physical-console framebuffer, calibrated source palette, hidden reverse-side geometry and exact tiny surface texture are not independently certified.
- Every left and right native sheet independently generated; no runtime mirroring or pixel editing. Fine seams, panel shading, source proportions and detailed face/gear fasteners vary between independent sheets; exact original texture coordinates and seam counts are not certified.
- All CQC shoves/punches, sweeps, defenses, jumps, reaction/KO, animation timing and fighting-game resource/damage/armor values are authored Versus adaptation. Original boss equipment/chase categories do not certify these numerical mechanics or every action as an extracted canonical move.
- The PNG inspector measures12 major isolated native alpha components per sheet. Some bounding rectangles contain neighbor pixels and therefore retain source-bound contour polygons. The twelve final actual Chromium Canvas charts were physically viewed: complete body/equipment, transparent composition and independent facing; originals remain byte-exact. HiddenRGB/low-alpha edge residuals are preserved rather than repainted.
- Per-sheet standing/uprightSourceHeight and foot/body pivots are measured from source alpha, with C neutral pose8 excluding opened-wing tops. displayHeight is authored Canvas presentation, not certified in-world centimetres. Broad wings never determine a pelvis alpha-centroid pivot.
- Adult original Raging Beauty face/hair and opaque full-length cool gray/black high-collar suit are source supported. Fine glove/boot joins, under-layer panel seams, exact ponytail tie position and perfect original face likeness are closest_supported reconstruction. No exposed/nude alternate, armor or wings added.
- Beauty is unarmed: original gameplay establishes chase/grab category. C shoot/deploy/charge are abstract renderer action names for forward shove, low evasion and chase grab. They MUST NOT become a firearm, grenade, mind attack, beam or magical projectile. All attacks remain short physical reach/contact and authored simulation where original gameplay does not establish the particular move.
- No projectile launch marks exist for Beauty. Separate source-observed glove/palm contacts are retained for physical integration only, not ballistic origins. No borrowed weapon from the armored form.
- Palette, hidden reverse seams and exact launcher model are closest_supported; absolute 1:1 is not certified.
- Independent directions differ slightly in silhouette and pose; no native image mirrored or edited.
- Source-backed equipment and fully opaque adult suit are retained; low and fallen poses must keep their fixed upright source scale.
- [Physically viewed original adult face/hair, opaque gray/black full-length suit and unarmed original Beauty gameplay.](https://archive.org/download/PS3_Longplay_081_Metal_Gear_Solid_4/PS3_Longplay_081_Metal_Gear_Solid_4.mkv#t=24400) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Physically viewed original adult face/hair, opaque gray/black full-length suit and unarmed original Beauty gameplay.](https://archive.org/download/PS3_Longplay_081_Metal_Gear_Solid_4/PS3_Longplay_081_Metal_Gear_Solid_4.mkv#t=24410) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Physically viewed original adult face/hair, opaque gray/black full-length suit and unarmed original Beauty gameplay.](https://archive.org/download/PS3_Longplay_081_Metal_Gear_Solid_4/PS3_Longplay_081_Metal_Gear_Solid_4.mkv#t=24420) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Physically viewed original adult face/hair, opaque gray/black full-length suit and unarmed original Beauty gameplay.](https://archive.org/download/PS3_Longplay_081_Metal_Gear_Solid_4/PS3_Longplay_081_Metal_Gear_Solid_4.mkv#t=24450) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## archive__crying_beauty

### CRYING BEAUTY — MGS4

**Rôle :** Forme Beauty — approche et saisie. **Profil :** `unarmed_beauty`.

**Base présente dans le code :** Forme humaine de MGS4 original, combinaison opaque et mains vides. Approche et étreinte observées ; frappes, garde et esquive adaptées au versus.

**Incarnation à conserver :** Original 2008 Metal Gear Solid 4 PlayStation 3 Crying Beauty unarmored phase

**État vérifié :** métadonnées natives avec limites. 72 régions source distinctes dans les deux directions ; groupes : idle, walk, guard, crouch, jump, punch, heavy, low, hit, ko, throw, shoot, deploy, optic, recover, charge, attack.

**Réemplois à examiner :** `throw` = throw, special ; `walk` = specialForward, specialBack.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `retro-msx`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** CRYING BEAUTY : corps Beauty distinct de son armure, mains vides et posture de cette version. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** démarche humaine, aucun membre mécanique transféré depuis la Beast. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Forme Beauty — approche et saisie » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder corps Beauty distinct de son armure, mains vides et posture de cette version.
- **jump_land :** CRYING BEAUTY : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. démarche humaine, aucun membre mécanique transféré depuis la Beast. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de CRYING BEAUTY. Terminer par réaction humaine et reprise de souffle sans sortir une arme absente. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS4 », présentation de Original 2008 Metal Gear Solid 4 PlayStation 3 Crying Beauty unarmored phase, puis corps Beauty distinct de son armure, mains vides et posture de cette version. Geste court lié à « Étreinte — adaptation rapprochée » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, réaction humaine et reprise de souffle sans sortir une arme absente ; CRYING BEAUTY vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS4.
- **round_loss :** Proposition CQC : CRYING BEAUTY réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Sortie de l’étreinte — adaptation », revenir par réaction humaine et reprise de souffle sans sortir une arme absente, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CRYING BEAUTY, préparer « Jab » ; corps Beauty distinct de son armure, mains vides et posture de cette version. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** réaction humaine et reprise de souffle sans sortir une arme absente.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CRYING BEAUTY, préparer « Frappe engagée » ; corps Beauty distinct de son armure, mains vides et posture de cette version. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** réaction humaine et reprise de souffle sans sortir une arme absente.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CRYING BEAUTY, préparer « Balayage » ; corps Beauty distinct de son armure, mains vides et posture de cette version. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** réaction humaine et reprise de souffle sans sortir une arme absente.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CRYING BEAUTY, préparer « Projection » ; corps Beauty distinct de son armure, mains vides et posture de cette version. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** réaction humaine et reprise de souffle sans sortir une arme absente. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Étreinte — adaptation rapprochée

**Existant :** `melee` / `grapple` ; 10/3/32 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CRYING BEAUTY, préparer « Étreinte — adaptation rapprochée » ; corps Beauty distinct de son armure, mains vides et posture de cette version. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** réaction humaine et reprise de souffle sans sortir une arme absente. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Hors de portée ou saut ; ne saisir ni cible aérienne ni cible sous protection post-projection.

##### specialDown — Se dégager au sol — adaptation

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `deploy`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CRYING BEAUTY, préparer « Se dégager au sol — adaptation » ; corps Beauty distinct de son armure, mains vides et posture de cette version. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** réaction humaine et reprise de souffle sans sortir une arme absente.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### specialForward — Approche basse

**Existant :** `mobility` / `movement` ; 7/18/25 ticks ; groupe `walk`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CRYING BEAUTY, préparer « Approche basse » ; corps Beauty distinct de son armure, mains vides et posture de cette version. Préparer l’appui qui produit le déplacement ; démarche humaine, aucun membre mécanique transféré depuis la Beast.

**Action.** Exécuter « Approche basse » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 6 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** réaction humaine et reprise de souffle sans sortir une arme absente. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : La silhouette reste touchable ; la sortie est punissable.

##### specialBack — Repli de Crying Beauty

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `walk`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CRYING BEAUTY, préparer « Repli de Crying Beauty » ; corps Beauty distinct de son armure, mains vides et posture de cette version. Préparer l’appui qui produit le déplacement ; démarche humaine, aucun membre mécanique transféré depuis la Beast.

**Action.** Exécuter « Repli de Crying Beauty » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** réaction humaine et reprise de souffle sans sortir une arme absente. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Sortie de l’étreinte — adaptation

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `charge`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CRYING BEAUTY, préparer « Sortie de l’étreinte — adaptation » ; corps Beauty distinct de son armure, mains vides et posture de cette version. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Sortie de l’étreinte — adaptation », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** réaction humaine et reprise de souffle sans sortir une arme absente.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Reprendre son souffle

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CRYING BEAUTY, préparer « Reprendre son souffle » ; corps Beauty distinct de son armure, mains vides et posture de cette version. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Reprendre son souffle ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** réaction humaine et reprise de souffle sans sortir une arme absente. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Sortie de l’étreinte — adaptation — conclusion

Famille `cqc`, ton `stylized` ; 220 ticks CQC ; phases actuelles : prepare → engage → confirm → pose. Appuis déclarés : Sortie de l’étreinte — adaptation.

Plan 1 : CRYING BEAUTY sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Sortie de l’étreinte — adaptation ». Plan 2 : contact de saisie ou neutralisation lié à « Sortie de l’étreinte — adaptation », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : réaction humaine et reprise de souffle sans sortir une arme absente, pose de signature face à l’adversaire.

##### Se dégager au sol — adaptation — conclusion

Famille `cqc`, ton `stylized` ; 238 ticks CQC ; phases actuelles : prepare → engage → confirm → pose. Appuis déclarés : Se dégager au sol — adaptation.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Se dégager au sol — adaptation » ; l’espace disponible doit être lisible. Plan 2 : contact de saisie ou neutralisation lié à « Se dégager au sol — adaptation », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : réaction humaine et reprise de souffle sans sortir une arme absente, arrêt du dispositif et retour au cadre d’ensemble.

##### Étreinte — adaptation rapprochée — conclusion

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → pose. Appuis déclarés : Étreinte — adaptation rapprochée.

Plan 1 : approche jusqu’à la distance réelle de « Étreinte — adaptation rapprochée », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Étreinte — adaptation rapprochée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : réaction humaine et reprise de souffle sans sortir une arme absente, prise de distance et maintien final.

##### Projection — conclusion

Famille `cqc`, ton `stylized` ; 274 ticks CQC ; phases actuelles : approach → grapple → impact → pose. Appuis déclarés : Projection.

Plan 1 : après une observation ou un repli, CRYING BEAUTY reprend l’initiative par « Projection ». Plan 2 : contact de saisie ou neutralisation lié à « Projection », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : réaction humaine et reprise de souffle sans sortir une arme absente, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Original 2008 MGS4 PlayStation 3 is the target. Newly authored 2D detailed sprites and 72 Versus poses are closest_supported, not extracted PS3 mesh, animation data, or an absolute 1:1 certification.
- All six facings are independently generated native transparent PNGs. No reflection, body mirroring, image resize, recolor, alpha cleanup, crop/export, or raster edit was performed. Exact imagegen native bytes, args, rejected attempts and hashes are preserved.
- All 72 body crops are unique physical source cells. Action names and animation timings are authored Versus mappings. They do not increase the source pose count or certify original animation timings.
- Some close native atlas cells contain adjacent figure pixels inside their bounding rectangles. Generic read-only component contour metadata excludes foreign figures during Canvas drawing; PNG bytes are unchanged. Normal final green and black Canvas views show complete single bodies.
- Standing source height is fixed per native sheet. Every pose has a separately observed grounded body pivot; crouch, jump and KO preserve naturally short native geometry. Root/integrator must independently verify gameplay size, hitboxes, contacts, costs, phases, mobile rendering and compatibility.
- Producer review covers native art, source provenance, 144 body-ground pivots across the pair and frame metadata. No game repository, runtime catalog, deployment or Git files were modified by this producer.
- Original PS3 captures show an adult unarmed Crying Beauty with straight shoulder-long black hair and bangs, gray/silver full sleeves and leggings, dark waist panels, bare hands, gray suit feet and a small trailing cable. Original snowy lighting makes exact material shades and foot/sole construction uncertain.
- Selected art uses a fully opaque CLOSED HIGH-COLLAR gray suit coverage variant. The original game neckline is not reproduced exactly. This is an explicit costume coverage adaptation after an input moderation rejection; identity/hair/gray segmentation/unarmed actions are closest supported, and exact source costume fidelity is false.
- A_RIGHT_01 produced no native image: image_gen rejected the input at sexual moderation, request 4e6e8de2-557c-409b-9a78-a3af0ad3c94d. The successful request materially changed to fully closed high-collar utility coverage and ordinary gameplay action references. The failed args and response are preserved; there was no repeated attempt to generate the original rejected request.
- Beauty is unarmed. Legacy action keys shoot, deploy and charge map to ordinary unarmed approach, low reach and lunge cells, not a gun, projectile, sniper precision, railgun, psychic attack or unexplained weapon. sourceCombatOrigins has no ballistic marks; gameplay must use contact-based adaptations.
- Normal palm/push/sweep/defense, pursuit/grab, stagger and KO poses are authored nonsexual gameplay adaptations. Facial likeness, hidden suit seams, finger topology, cable attachment, precise anatomy and foot materials remain illustration approximations.
- C_LEFT_02 was rejected because index 11 rear hand clipped the sheet right edge with 35 opaque edge pixels. C_LEFT_03 was independently regenerated with image_gen; all twelve figures are complete and zero pixels with alpha greater than 80 touch the native sheet edge. Its nearest opaque extent is still close to the right edge, so source crops must be preserved exactly.
- Hidden native vivid-red RGB values exist only at very low alpha in selected Beauty sheets. Actual green/black Canvas compositing was physically reviewed at 230 pixels and shows no opaque red fringe, effects or background matte. No cleanup was performed.
- Closed high-collar coverage variant; original neckline fidelity is not certified. Fine native colored alpha fringe remains source-authored and untouched.
- [Original Beauty gray segmented suit rear, collar/corset/limbs and attached cable](https://archive.org/download/PS3_Longplay_081_Metal_Gear_Solid_4/PS3_Longplay_081_Metal_Gear_Solid_4.mkv) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original Crying Beauty face, black straight shoulderlong hair and fullgray suit front](https://archive.org/download/PS3_Longplay_081_Metal_Gear_Solid_4/PS3_Longplay_081_Metal_Gear_Solid_4.mkv) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original PS3 HUD Crying Beauty unarmed pursuit posture](https://archive.org/download/PS3_Longplay_081_Metal_Gear_Solid_4/PS3_Longplay_081_Metal_Gear_Solid_4.mkv) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original PS3 fully clothed downed/bent Beauty side](https://archive.org/download/PS3_Longplay_081_Metal_Gear_Solid_4/PS3_Longplay_081_Metal_Gear_Solid_4.mkv) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## archive__screaming_beauty

### SCREAMING BEAUTY — MGS4

**Rôle :** Forme Beauty — approche et saisie. **Profil :** `unarmed_beauty`.

**Base présente dans le code :** Forme humaine de MGS4 original, combinaison opaque et mains vides. Approche et étreinte observées ; frappes, garde et esquive adaptées au versus.

**Incarnation à conserver :** Original adult MGS4 PS3 unarmored Beauty, short black swept-up hair, pale face and opaque olive-bronze graphite-lined bodysuit

**État vérifié :** métadonnées natives avec limites. 72 régions source distinctes dans les deux directions ; groupes : idle, walk, guard, crouch, jump, punch, heavy, low, hit, ko, shoot, deploy, throw, recover, attack.

**Réemplois à examiner :** `throw` = throw, super ; `walk` = specialForward, specialBack.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** SCREAMING BEAUTY : corps Beauty distinct de son armure, mains vides et posture de cette version. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** démarche humaine, aucun membre mécanique transféré depuis la Beast. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Forme Beauty — approche et saisie » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder corps Beauty distinct de son armure, mains vides et posture de cette version.
- **jump_land :** SCREAMING BEAUTY : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. démarche humaine, aucun membre mécanique transféré depuis la Beast. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de SCREAMING BEAUTY. Terminer par réaction humaine et reprise de souffle sans sortir une arme absente. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS4 », présentation de Original adult MGS4 PS3 unarmored Beauty, short black swept-up hair, pale face and opaque olive-bronze graphite-lined bodysuit, puis corps Beauty distinct de son armure, mains vides et posture de cette version. Geste court lié à « Étreinte — adaptation rapprochée » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, réaction humaine et reprise de souffle sans sortir une arme absente ; SCREAMING BEAUTY vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS4.
- **round_loss :** Proposition CQC : SCREAMING BEAUTY réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Sortie de l’étreinte — adaptation », revenir par réaction humaine et reprise de souffle sans sortir une arme absente, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SCREAMING BEAUTY, préparer « Jab » ; corps Beauty distinct de son armure, mains vides et posture de cette version. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** réaction humaine et reprise de souffle sans sortir une arme absente.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SCREAMING BEAUTY, préparer « Frappe engagée » ; corps Beauty distinct de son armure, mains vides et posture de cette version. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** réaction humaine et reprise de souffle sans sortir une arme absente.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SCREAMING BEAUTY, préparer « Balayage » ; corps Beauty distinct de son armure, mains vides et posture de cette version. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** réaction humaine et reprise de souffle sans sortir une arme absente.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SCREAMING BEAUTY, préparer « Projection » ; corps Beauty distinct de son armure, mains vides et posture de cette version. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** réaction humaine et reprise de souffle sans sortir une arme absente. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Étreinte — adaptation rapprochée

**Existant :** `melee` / `grapple` ; 10/3/32 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SCREAMING BEAUTY, préparer « Étreinte — adaptation rapprochée » ; corps Beauty distinct de son armure, mains vides et posture de cette version. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** réaction humaine et reprise de souffle sans sortir une arme absente. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Hors de portée ou saut ; ne saisir ni cible aérienne ni cible sous protection post-projection.

##### specialDown — Se dégager au sol — adaptation

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `deploy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SCREAMING BEAUTY, préparer « Se dégager au sol — adaptation » ; corps Beauty distinct de son armure, mains vides et posture de cette version. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** réaction humaine et reprise de souffle sans sortir une arme absente.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### specialForward — Approche tendue

**Existant :** `mobility` / `movement` ; 7/18/25 ticks ; groupe `walk`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SCREAMING BEAUTY, préparer « Approche tendue » ; corps Beauty distinct de son armure, mains vides et posture de cette version. Préparer l’appui qui produit le déplacement ; démarche humaine, aucun membre mécanique transféré depuis la Beast.

**Action.** Exécuter « Approche tendue » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 6 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** réaction humaine et reprise de souffle sans sortir une arme absente. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : La silhouette reste touchable ; la sortie est punissable.

##### specialBack — Recul de Screaming Beauty

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `walk`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SCREAMING BEAUTY, préparer « Recul de Screaming Beauty » ; corps Beauty distinct de son armure, mains vides et posture de cette version. Préparer l’appui qui produit le déplacement ; démarche humaine, aucun membre mécanique transféré depuis la Beast.

**Action.** Exécuter « Recul de Screaming Beauty » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** réaction humaine et reprise de souffle sans sortir une arme absente. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Sortie de l’étreinte — adaptation

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SCREAMING BEAUTY, préparer « Sortie de l’étreinte — adaptation » ; corps Beauty distinct de son armure, mains vides et posture de cette version. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Sortie de l’étreinte — adaptation », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** réaction humaine et reprise de souffle sans sortir une arme absente.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Reprendre son souffle

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SCREAMING BEAUTY, préparer « Reprendre son souffle » ; corps Beauty distinct de son armure, mains vides et posture de cette version. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Reprendre son souffle ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** réaction humaine et reprise de souffle sans sortir une arme absente. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Sortie de l’étreinte — adaptation — conclusion

Famille `cqc`, ton `stylized` ; 220 ticks CQC ; phases actuelles : prepare → engage → confirm → pose. Appuis déclarés : Sortie de l’étreinte — adaptation.

Plan 1 : SCREAMING BEAUTY sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Sortie de l’étreinte — adaptation ». Plan 2 : contact de saisie ou neutralisation lié à « Sortie de l’étreinte — adaptation », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : réaction humaine et reprise de souffle sans sortir une arme absente, pose de signature face à l’adversaire.

##### Se dégager au sol — adaptation — conclusion

Famille `cqc`, ton `stylized` ; 238 ticks CQC ; phases actuelles : prepare → engage → confirm → pose. Appuis déclarés : Se dégager au sol — adaptation.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Se dégager au sol — adaptation » ; l’espace disponible doit être lisible. Plan 2 : contact de saisie ou neutralisation lié à « Se dégager au sol — adaptation », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : réaction humaine et reprise de souffle sans sortir une arme absente, arrêt du dispositif et retour au cadre d’ensemble.

##### Étreinte — adaptation rapprochée — conclusion

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → pose. Appuis déclarés : Étreinte — adaptation rapprochée.

Plan 1 : approche jusqu’à la distance réelle de « Étreinte — adaptation rapprochée », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Étreinte — adaptation rapprochée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : réaction humaine et reprise de souffle sans sortir une arme absente, prise de distance et maintien final.

##### Projection — conclusion

Famille `cqc`, ton `stylized` ; 274 ticks CQC ; phases actuelles : approach → grapple → impact → pose. Appuis déclarés : Projection.

Plan 1 : après une observation ou un repli, SCREAMING BEAUTY reprend l’initiative par « Projection ». Plan 2 : contact de saisie ou neutralisation lié à « Projection », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : réaction humaine et reprise de souffle sans sortir une arme absente, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Target 1:1 original MGS4 PS3, closest_supported authored 2D adaptation from original 3D captures; no absolute pixel/model/material or animation identity certification.
- Original adult Beauty remains fully clothed in opaque olive-bronze high-collar bodysuit, gloves and integrated boots; only face exposed. Short black swept-up hair and original pale face replace raw unreviewed white hair/lilac suit concepts. No OC conversion, magical aura, pistol, grenade or doll invented.
- Source command center green lighting and armor-separation motion partly obscure exact material colors, side seams, face topology and hair tie. Palette under neutral light and small sprite seams are interpreted; original source identity and costume silhouettes are supported.
- Original Beauty chase and grab are source supported. Guard, palm/forearm strikes, low push, bounded jump, fall and recovery are authored physical Versus adaptations, not extracted canonical duel animation. Existing shoot/deploy action identifiers are non-ballistic reaching/guard only.
- All six facings are independently generated native PNGs, never horizontally flipped, resized or retouched outside image_gen. First B RIGHT fourteen-body attempt and first A RIGHT edge-touching hair rejected, originals and all native attempts/prompts retained. Alpha-zero backgrounds may display tinted in an image viewer; native alpha measurements and contours verify transparency.
- Some native bodies approach canvas margins and padded crops overlap other rows. Exact native body contour excludes neighbor fragments without editing image pixels; integrator must physically verify actual Canvas crops, final display scale, ground and phases.
- Original suit palette is interpreted from green-lit PS3 captures; tiny seams, exact geometry and pose timings are closest_supported, not absolute 1:1.
- Two independently generated directions differ slightly in silhouette; no image was mirrored or edited.
- Feet stay integrated into the opaque suit; small shoe contours are interpreted from partly occluded original views.
- [Original adult Screaming Beauty close face and high collar: short black swept-up hair, pale face, dark eye lining, opaque mottled olive-bronze suit and graphite side lines.](https://archive.org/download/PS3_Longplay_081_Metal_Gear_Solid_4/PS3_Longplay_081_Metal_Gear_Solid_4.mkv) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original full lower-body, glove and integrated boot silhouette during armor separation; opaque bronze-brown original bodysuit, pale graphite side channels.](https://archive.org/download/PS3_Longplay_081_Metal_Gear_Solid_4/PS3_Longplay_081_Metal_Gear_Solid_4.mkv) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original transition complete clothed body on floor; neutral source for suit colors, side lines, integrated boots and closed gloves, not a sexual pose.](https://archive.org/download/PS3_Longplay_081_Metal_Gear_Solid_4/PS3_Longplay_081_Metal_Gear_Solid_4.mkv) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original rear/side suit seams, dark side stripes and closed full gloves; reverse fine details partly occluded.](https://archive.org/download/PS3_Longplay_081_Metal_Gear_Solid_4/PS3_Longplay_081_Metal_Gear_Solid_4.mkv) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## archive__drebin

### DREBIN 893 — MGS4

**Rôle :** Pistolet et défense proche. **Profil :** `pistol`.

**Base présente dans le code :** Marchand d’armes : équipement de simulation cohérent, pas pouvoir du nanoréseau inventé.

**Incarnation à conserver :** Drebin 893, platinum buzz cut, plum blazer/purple shirt, tiger-stripe cargo and black boots

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `throw` = throw, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `retro-msx`, `tuxedo`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** DREBIN 893 : main forte et main de soutien identifiées sur le pistolet, coudes contenus. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas prudents sans inverser l’étui ni la main forte. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Pistolet et défense proche » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder main forte et main de soutien identifiées sur le pistolet, coudes contenus.
- **jump_land :** DREBIN 893 : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas prudents sans inverser l’étui ni la main forte. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de DREBIN 893. Terminer par recul du poignet puis stabilisation du canon. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS4 », présentation de Drebin 893, platinum buzz cut, plum blazer/purple shirt, tiger-stripe cargo and black boots, puis main forte et main de soutien identifiées sur le pistolet, coudes contenus. Geste court lié à « Pistolet de protection » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, recul du poignet puis stabilisation du canon ; DREBIN 893 vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS4.
- **round_loss :** Proposition CQC : DREBIN 893 réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Stock de secours », revenir par recul du poignet puis stabilisation du canon, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DREBIN 893, préparer « Jab » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DREBIN 893, préparer « Frappe engagée » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DREBIN 893, préparer « Balayage » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DREBIN 893, préparer « Projection » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recul du poignet puis stabilisation du canon. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Pistolet de protection

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DREBIN 893, préparer « Pistolet de protection » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Montrer la prise et la visée de l’arme décrite par « Pistolet de protection » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Grenade du stock

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DREBIN 893, préparer « Grenade du stock » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Prélever l’objet correspondant à « Grenade du stock », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Repousser le client

**Existant :** `melee` / `grapple` ; 10/3/32 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DREBIN 893, préparer « Repousser le client » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recul du poignet puis stabilisation du canon. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Hors de portée ou saut ; ne saisir ni cible aérienne ni cible sous protection post-projection.

##### specialBack — Repli derrière le stock

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DREBIN 893, préparer « Repli derrière le stock » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer l’appui qui produit le déplacement ; pas prudents sans inverser l’étui ni la main forte.

**Action.** Exécuter « Repli derrière le stock » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** recul du poignet puis stabilisation du canon. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Stock de secours

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DREBIN 893, préparer « Stock de secours » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Montrer la prise et la visée de l’arme décrite par « Stock de secours » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DREBIN 893, préparer « Recharger » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** recul du poignet puis stabilisation du canon. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Stock de secours — Final

Famille `ballistic`, ton `simulation` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Stock de secours / Pistolet de protection.

Plan 1 : DREBIN 893 sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Stock de secours / Pistolet de protection ». Plan 2 : présenter l’arme effectivement associée à « Stock de secours / Pistolet de protection », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : recul du poignet puis stabilisation du canon, pose de signature face à l’adversaire. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Pistolet de protection / Grenade du stock

Famille `ballistic`, ton `simulation` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Stock de secours / Grenade du stock.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Stock de secours / Grenade du stock » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Stock de secours / Grenade du stock », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : recul du poignet puis stabilisation du canon, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Repousser le client — Point final

Famille `cqc`, ton `simulation` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Stock de secours / Repousser le client.

Plan 1 : approche jusqu’à la distance réelle de « Stock de secours / Repousser le client », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Stock de secours / Repousser le client », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : recul du poignet puis stabilisation du canon, prise de distance et maintien final. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Lecture rapprochée — Mission close

Famille `capture`, ton `simulation` ; 274 ticks CQC ; phases actuelles : stun → disarm → restrain → extract. Appuis déclarés : Stock de secours / Projection.

Plan 1 : après une observation ou un repli, DREBIN 893 reprend l’initiative par « Stock de secours / Projection ». Plan 2 : contact de saisie ou neutralisation lié à « Stock de secours / Projection », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : recul du poignet puis stabilisation du canon, rangement/pose finale différente des trois autres. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Canonical character sheet contains concept drawings plus final render; final-render outfit used. Rings are retained as small metal jewelry; exact tiny engravings are not certified.
- Unarmed support gestures and defensive authored animations preserve the costume; no canonical weapon is invented.
- [Konami/Shinkawa complete front/back character-design sheet includes released CGI model and Little Gray; additionally original unaltered PS3 full-frame capture at 3000 seconds corroborates costume.](https://www.creativeuncut.com/gallery-06/mgs4-drebin-character-art.html) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## archive__big_mama

### BIG MAMA — MGS4

**Rôle :** Pistolet et défense proche. **Profil :** `pistol`.

**Base présente dans le code :** EVA âgée utilise des armes de résistance ; moto hors du duel et mobilité réduite.

**Incarnation à conserver :** EVA / Big Mama, 2014 aged silver-blond incarnation, brown quilted coat, black gloves, tall riding boots, Type 17 Mauser

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `throw` = throw, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `retro-msx`, `tuxedo`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** BIG MAMA : main forte et main de soutien identifiées sur le pistolet, coudes contenus. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas prudents sans inverser l’étui ni la main forte. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Pistolet et défense proche » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder main forte et main de soutien identifiées sur le pistolet, coudes contenus.
- **jump_land :** BIG MAMA : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas prudents sans inverser l’étui ni la main forte. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de BIG MAMA. Terminer par recul du poignet puis stabilisation du canon. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS4 », présentation de EVA / Big Mama, 2014 aged silver-blond incarnation, brown quilted coat, black gloves, tall riding boots, Type 17 Mauser, puis main forte et main de soutien identifiées sur le pistolet, coudes contenus. Geste court lié à « Arme de Big Mama » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, recul du poignet puis stabilisation du canon ; BIG MAMA vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS4.
- **round_loss :** Proposition CQC : BIG MAMA réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Route d’évacuation », revenir par recul du poignet puis stabilisation du canon, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BIG MAMA, préparer « Jab » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BIG MAMA, préparer « Frappe engagée » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BIG MAMA, préparer « Balayage » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BIG MAMA, préparer « Projection » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recul du poignet puis stabilisation du canon. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Arme de Big Mama

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BIG MAMA, préparer « Arme de Big Mama » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Montrer la prise et la visée de l’arme décrite par « Arme de Big Mama » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Diversion de résistance

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BIG MAMA, préparer « Diversion de résistance » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Prélever l’objet correspondant à « Diversion de résistance », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Saisie du vétéran

**Existant :** `melee` / `grapple` ; 10/3/32 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BIG MAMA, préparer « Saisie du vétéran » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recul du poignet puis stabilisation du canon. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Hors de portée ou saut ; ne saisir ni cible aérienne ni cible sous protection post-projection.

##### specialBack — Repli de résistance

**Existant :** `mobility` / `movement` ; 4/18/29 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BIG MAMA, préparer « Repli de résistance » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer l’appui qui produit le déplacement ; pas prudents sans inverser l’étui ni la main forte.

**Action.** Exécuter « Repli de résistance » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -5 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** recul du poignet puis stabilisation du canon. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Route d’évacuation

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BIG MAMA, préparer « Route d’évacuation » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Montrer la prise et la visée de l’arme décrite par « Route d’évacuation » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BIG MAMA, préparer « Recharger » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** recul du poignet puis stabilisation du canon. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Route d’évacuation — Final

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Route d’évacuation / Arme de Big Mama.

Plan 1 : BIG MAMA sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Route d’évacuation / Arme de Big Mama ». Plan 2 : présenter l’arme effectivement associée à « Route d’évacuation / Arme de Big Mama », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : recul du poignet puis stabilisation du canon, pose de signature face à l’adversaire.

##### Arme de Big Mama / Diversion de résistance

Famille `ballistic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Route d’évacuation / Diversion de résistance.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Route d’évacuation / Diversion de résistance » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Route d’évacuation / Diversion de résistance », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : recul du poignet puis stabilisation du canon, arrêt du dispositif et retour au cadre d’ensemble.

##### Saisie du vétéran — Point final

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Route d’évacuation / Saisie du vétéran.

Plan 1 : approche jusqu’à la distance réelle de « Route d’évacuation / Saisie du vétéran », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Route d’évacuation / Saisie du vétéran », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : recul du poignet puis stabilisation du canon, prise de distance et maintien final.

##### Lecture rapprochée — Mission close

Famille `ballistic`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Route d’évacuation / Projection.

Plan 1 : après une observation ou un repli, BIG MAMA reprend l’initiative par « Route d’évacuation / Projection ». Plan 2 : présenter l’arme effectivement associée à « Route d’évacuation / Projection », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : recul du poignet puis stabilisation du canon, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- The released CGI outfit and swept-back silver-blond hairstyle are followed; loose-haired concept and holster-only first sheets are preserved as rejected alternatives.
- Type17 Mauser is canonical; animation keyposes are authored fighting-game adaptations, not certified original game motion.
- [Released full-body Konami CGI render mgs4-eva.jpg physically viewed; original costume sheet adds seam and trouser information. Type17 Chinese Mauser use corroborated by original game weapon guides.](https://www.creativeuncut.com/gallery-06/mgs4-eva.html) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## archive__paz

### PAZ ORTEGA ANDRADE — PEACE WALKER

**Rôle :** Version narrative — simulation bonus. **Profil :** `unarmed_paz`.

**Base présente dans le code :** Paz adulte dans Peace Walker, uniforme de cette incarnation.

**Incarnation à conserver :** Original PW adult Paz age21 student-cover appearance, short wavy blond hair, navy blazer/pleated skirt, white collar/red ribbon and high dark boots; HD-port source qualified

**État vérifié :** métadonnées natives avec limites. 72 régions source distinctes dans les deux directions ; groupes : idle, walk, guard, crouch, jump, punch, heavy, low, hit, ko, shoot, deploy, throw, recover, attack.

**Réemplois à examiner :** `recover` = special, super, utility ; `walk` = specialForward, specialBack.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `retro-msx`, `tuxedo`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** PAZ ORTEGA ANDRADE : mains vides, tenue et état physique de la version de Paz choisie. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** déplacement à la stature et à l’âge de cette version ; aucune gestuelle de soldat présumée. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Version narrative — simulation bonus » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder mains vides, tenue et état physique de la version de Paz choisie.
- **jump_land :** PAZ ORTEGA ANDRADE : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. déplacement à la stature et à l’âge de cette version ; aucune gestuelle de soldat présumée. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de PAZ ORTEGA ANDRADE. Terminer par reprise de souffle et appui défensif, issue simulée/neutralisée selon le profil. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « PEACE WALKER », présentation de Original PW adult Paz age21 student-cover appearance, short wavy blond hair, navy blazer/pleated skirt, white collar/red ribbon and high dark boots; HD-port source qualified, puis mains vides, tenue et état physique de la version de Paz choisie. Geste court lié à « Reprendre appui — simulation » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, reprise de souffle et appui défensif, issue simulée/neutralisée selon le profil ; PAZ ORTEGA ANDRADE vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à PEACE WALKER.
- **round_loss :** Proposition CQC : PAZ ORTEGA ANDRADE réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Retrouver son calme — simulation », revenir par reprise de souffle et appui défensif, issue simulée/neutralisée selon le profil, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Geste de protection — simulation

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PAZ ORTEGA ANDRADE, préparer « Geste de protection — simulation » ; mains vides, tenue et état physique de la version de Paz choisie. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Geste de protection — simulation » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** reprise de souffle et appui défensif, issue simulée/neutralisée selon le profil.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Repousser — simulation

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PAZ ORTEGA ANDRADE, préparer « Repousser — simulation » ; mains vides, tenue et état physique de la version de Paz choisie. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Repousser — simulation », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** reprise de souffle et appui défensif, issue simulée/neutralisée selon le profil.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Se dégager bas — simulation

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PAZ ORTEGA ANDRADE, préparer « Se dégager bas — simulation » ; mains vides, tenue et état physique de la version de Paz choisie. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** reprise de souffle et appui défensif, issue simulée/neutralisée selon le profil.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Écarter la menace — simulation

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PAZ ORTEGA ANDRADE, préparer « Écarter la menace — simulation » ; mains vides, tenue et état physique de la version de Paz choisie. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** reprise de souffle et appui défensif, issue simulée/neutralisée selon le profil. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Reprendre appui — simulation

**Existant :** `recover` / `recovery` ; 18/7/32 ticks ; groupe `recover`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PAZ ORTEGA ANDRADE, préparer « Reprendre appui — simulation » ; mains vides, tenue et état physique de la version de Paz choisie. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Reprendre appui — simulation ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** reprise de souffle et appui défensif, issue simulée/neutralisée selon le profil. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pause interrompable avant récupération de la réserve ; aucun soin, projectile ou pouvoir offensif.

##### specialDown — Observer une trace visible — simulation

**Existant :** `observe` / `recon` ; 26/1/30 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PAZ ORTEGA ANDRADE, préparer « Observer une trace visible — simulation » ; mains vides, tenue et état physique de la version de Paz choisie. Orienter regard, optique ou terminal vers la cible observée, sans consulter une action future.

**Action.** Pour « Observer une trace visible — simulation », déclencher lecture/repérage avec un petit geste ou changement d’optique et un indicateur séparé. Le corps doit rester visible et vulnérable selon les données de combat.

**Retour.** reprise de souffle et appui défensif, issue simulée/neutralisée selon le profil. Couper le signal ou abaisser l’outil ; retour vers l’adversaire sans nouvelle arme inventée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Lecture de déplacement déjà visible, à portée limitée ; aucun contrôle des commandes, soin médical ou piratage offensif universel.

##### specialForward — Écart prudent — simulation

**Existant :** `mobility` / `movement` ; 7/18/25 ticks ; groupe `walk`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PAZ ORTEGA ANDRADE, préparer « Écart prudent — simulation » ; mains vides, tenue et état physique de la version de Paz choisie. Préparer l’appui qui produit le déplacement ; déplacement à la stature et à l’âge de cette version ; aucune gestuelle de soldat présumée.

**Action.** Exécuter « Écart prudent — simulation » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 4 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** reprise de souffle et appui défensif, issue simulée/neutralisée selon le profil. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Déplacement rapproché borné, sans invincibilité ; poursuivre ou punir la sortie.

##### specialBack — Repli prudent — simulation

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `walk`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PAZ ORTEGA ANDRADE, préparer « Repli prudent — simulation » ; mains vides, tenue et état physique de la version de Paz choisie. Préparer l’appui qui produit le déplacement ; déplacement à la stature et à l’âge de cette version ; aucune gestuelle de soldat présumée.

**Action.** Exécuter « Repli prudent — simulation » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** reprise de souffle et appui défensif, issue simulée/neutralisée selon le profil. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Déplacement rapproché borné, sans invincibilité ; poursuivre ou punir la sortie.

##### super — Retrouver son calme — simulation

**Existant :** `recover` / `recovery` ; 25/7/44 ticks ; groupe `recover`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PAZ ORTEGA ANDRADE, préparer « Retrouver son calme — simulation » ; mains vides, tenue et état physique de la version de Paz choisie. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Retrouver son calme — simulation ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** reprise de souffle et appui défensif, issue simulée/neutralisée selon le profil. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pause interrompable avant récupération de la réserve ; aucun soin, projectile ou pouvoir offensif.

##### utility — Pause — simulation

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de PAZ ORTEGA ANDRADE, préparer « Pause — simulation » ; mains vides, tenue et état physique de la version de Paz choisie. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Pause — simulation ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** reprise de souffle et appui défensif, issue simulée/neutralisée selon le profil. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pause interrompable avant récupération de la réserve ; aucun soin, projectile ou pouvoir offensif.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Retrouver son calme — simulation — conclusion

Famille `tactical`, ton `nonlethal` ; 220 ticks CQC ; phases actuelles : prepare → support → confirm → pose. Appuis déclarés : Retrouver son calme — simulation.

Plan 1 : PAZ ORTEGA ANDRADE sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Retrouver son calme — simulation ». Plan 2 : matérialiser le geste tactique « Retrouver son calme — simulation » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : reprise de souffle et appui défensif, issue simulée/neutralisée selon le profil, pose de signature face à l’adversaire. Respecter le ton nonlethal enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Observer une trace visible — simulation — conclusion

Famille `tactical`, ton `nonlethal` ; 238 ticks CQC ; phases actuelles : prepare → support → confirm → pose. Appuis déclarés : Observer une trace visible — simulation.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Observer une trace visible — simulation » ; l’espace disponible doit être lisible. Plan 2 : matérialiser le geste tactique « Observer une trace visible — simulation » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : reprise de souffle et appui défensif, issue simulée/neutralisée selon le profil, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton nonlethal enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Écart prudent — simulation — conclusion

Famille `tactical`, ton `nonlethal` ; 256 ticks CQC ; phases actuelles : prepare → support → confirm → pose. Appuis déclarés : Écart prudent — simulation.

Plan 1 : approche jusqu’à la distance réelle de « Écart prudent — simulation », arme et main libre identifiées. Plan 2 : matérialiser le geste tactique « Écart prudent — simulation » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : reprise de souffle et appui défensif, issue simulée/neutralisée selon le profil, prise de distance et maintien final. Respecter le ton nonlethal enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Pause — simulation — conclusion

Famille `tactical`, ton `nonlethal` ; 274 ticks CQC ; phases actuelles : prepare → support → confirm → pose. Appuis déclarés : Pause — simulation.

Plan 1 : après une observation ou un repli, PAZ ORTEGA ANDRADE reprend l’initiative par « Pause — simulation ». Plan 2 : matérialiser le geste tactique « Pause — simulation » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : reprise de souffle et appui défensif, issue simulée/neutralisée selon le profil, rangement/pose finale différente des trois autres. Respecter le ton nonlethal enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Actual original PW HD captures prove dark navy/grey-blue blazer and pleated skirt, white collar and thin red ribbon, short wavy blond hair and dark high footwear. Earlier speculative white blouse/green skirt assumption is excluded; no ponytail or TPP double-braid blue gown is used.
- References are the original2010 design in Xbox360 HD port as identified in source/achievement footage, not direct PSP hardware capture. Their original adult face proportions, clothing silhouette and palette guide these 2D authored poses; exact PSP mesh/framebuffer, material, seams, eye color, button/stitch topology, boot shaft/stocking distinction and pixel1:1 are not certified.
- Introductory red Shinkawa coat is retained as an unused reference to another scene. Existing mislabeled archive portrait was actually TPP hallucination and is not used. Another Date with Paz video had already unlocked the underwear variant; its attempts/captures are conserved for research, excluded from these fully clothed sprites.
- The original gameplay around mania90s shows a dark rounded handheld object with a short stem/handle (a pan is probable). It does not prove a firearm or ZEKE control. The source capture is preserved. These selected native pose groups intentionally use free hands as authored bonus human gestures; they do not certify every original-game posture, absence of all equipment or a source-extracted empty-handed duel. No invented weapon is drawn.
- All72 poses remain neutral fully clothed adult school-cover appearance, ordinary authored human support/defense gestures, never sexualized/minor portrayal or an assertion of canon schoolgirl combat proficiency.
- Target remains1:1 fidelity to selected original incarnation, closest_supported output only. Newly illustrated2D poses are not extracted original animation; absolute1:1 artistic or gameplay certification is false.
- No firearm/grenade/projectile origin, bomb, ZEKE control, armor inheritance, psychic field or summoned machine is invented. Existing action keys shoot/deploy merely identify non-ballistic signal/protection pose groups; root must explicitly supersede historical generic weapon behavior.
- Native source PNGs and all attempts unchanged. Both facings independently generated and SHA-distinct, no mirrored body raster. Every selected atlas and each12 complete bodies physically viewed by producer. Canvas crops/contours, source scale, mobile/desktop, phase/hitbox/finisher behavior remain independently root-owned.
- Close native row spacing produces recorded foreign opaque pixels in some bounding rectangles. Metadata Canvas contour stencils exclude neighbors; no image pixels edited. Use the measured upright source height for each sheet, retaining actual lowered crouch/KO size.
- [Original Xbox360 PW HD source face/shoulders: short wavy blond hair, dark navy/grey-blue blazer lapels, white blouse collar, thin red ribbon tie. Actual source physically viewed.](https://archive.org/download/youtube-lsOxdkVK7dQ/lsOxdkVK7dQ.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original Xbox360 PW HD whole-body student-cover outfit: dark blazer/pleated skirt, dark high footwear. Low-resolution whole-body original gameplay does not certify sole/stitching/stocking vs boot material edges.](https://archive.org/download/youtube-lsOxdkVK7dQ/lsOxdkVK7dQ.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original Xbox360 PW HD original Paz whole-body gesture; confirms dark skirt, bare knees and dark high footwear silhouette, no firearm or military armor. A small dark rounded handheld object is visible in this gameplay episode; its exact shape/material is low-resolution.](https://archive.org/download/youtube-lsOxdkVK7dQ/lsOxdkVK7dQ.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original Xbox360 guide shows Xbox achievement interface and MGS PEACE WALKER HD title; hardware/platform evidence for original-design HD port, not PSP framebuffer/pixel certification.](https://archive.org/download/youtube-lsOxdkVK7dQ/lsOxdkVK7dQ.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## archive__zadornov

### VLADIMIR ZADORNOV — PEACE WALKER

**Rôle :** Pistolet et défense proche. **Profil :** `pistol`.

**Base présente dans le code :** Agent et main-roquette ; pas de rayon magique ou contrôle mental.

**Incarnation à conserver :** PW — Ramon Gálvez Mena / Zadornov, same canonical brown coat and anatomical right red prosthetic hand

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `throw` = throw, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `retro-msx`, `tuxedo`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** VLADIMIR ZADORNOV : main forte et main de soutien identifiées sur le pistolet, coudes contenus. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas prudents sans inverser l’étui ni la main forte. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Pistolet et défense proche » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder main forte et main de soutien identifiées sur le pistolet, coudes contenus.
- **jump_land :** VLADIMIR ZADORNOV : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas prudents sans inverser l’étui ni la main forte. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de VLADIMIR ZADORNOV. Terminer par recul du poignet puis stabilisation du canon. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « PEACE WALKER », présentation de PW — Ramon Gálvez Mena / Zadornov, same canonical brown coat and anatomical right red prosthetic hand, puis main forte et main de soutien identifiées sur le pistolet, coudes contenus. Geste court lié à « Arme dissimulée » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, recul du poignet puis stabilisation du canon ; VLADIMIR ZADORNOV vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à PEACE WALKER.
- **round_loss :** Proposition CQC : VLADIMIR ZADORNOV réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Fuite préparée », revenir par recul du poignet puis stabilisation du canon, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VLADIMIR ZADORNOV, préparer « Jab » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VLADIMIR ZADORNOV, préparer « Frappe engagée » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VLADIMIR ZADORNOV, préparer « Balayage » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VLADIMIR ZADORNOV, préparer « Projection » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recul du poignet puis stabilisation du canon. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Arme dissimulée

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VLADIMIR ZADORNOV, préparer « Arme dissimulée » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Montrer la prise et la visée de l’arme décrite par « Arme dissimulée » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Main-roquette

**Existant :** `projectile` / `rocket` ; 32/1/38 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VLADIMIR ZADORNOV, préparer « Main-roquette » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Montrer la prise et la visée de l’arme décrite par « Main-roquette » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Verrouillage lent, virage limité ; le missile peut être détruit.

##### specialForward — Poussée de l’agent

**Existant :** `melee` / `grapple` ; 10/3/32 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VLADIMIR ZADORNOV, préparer « Poussée de l’agent » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recul du poignet puis stabilisation du canon. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Hors de portée ou saut ; ne saisir ni cible aérienne ni cible sous protection post-projection.

##### specialBack — Repli de Zadornov

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VLADIMIR ZADORNOV, préparer « Repli de Zadornov » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer l’appui qui produit le déplacement ; pas prudents sans inverser l’étui ni la main forte.

**Action.** Exécuter « Repli de Zadornov » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** recul du poignet puis stabilisation du canon. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Fuite préparée

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VLADIMIR ZADORNOV, préparer « Fuite préparée » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Montrer la prise et la visée de l’arme décrite par « Fuite préparée » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VLADIMIR ZADORNOV, préparer « Recharger » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** recul du poignet puis stabilisation du canon. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Fuite préparée — Final

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Fuite préparée / Arme dissimulée.

Plan 1 : VLADIMIR ZADORNOV sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Fuite préparée / Arme dissimulée ». Plan 2 : présenter l’arme effectivement associée à « Fuite préparée / Arme dissimulée », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : recul du poignet puis stabilisation du canon, pose de signature face à l’adversaire.

##### Arme dissimulée / Main-roquette

Famille `ballistic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Fuite préparée / Main-roquette.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Fuite préparée / Main-roquette » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Fuite préparée / Main-roquette », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : recul du poignet puis stabilisation du canon, arrêt du dispositif et retour au cadre d’ensemble.

##### Poussée de l’agent — Point final

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Fuite préparée / Poussée de l’agent.

Plan 1 : approche jusqu’à la distance réelle de « Fuite préparée / Poussée de l’agent », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Fuite préparée / Poussée de l’agent », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : recul du poignet puis stabilisation du canon, prise de distance et maintien final.

##### Lecture rapprochée — Mission close

Famille `ballistic`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Fuite préparée / Projection.

Plan 1 : après une observation ou un repli, VLADIMIR ZADORNOV reprend l’initiative par « Fuite préparée / Projection ». Plan 2 : présenter l’arme effectivement associée à « Fuite préparée / Projection », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : recul du poignet puis stabilisation du canon, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- No firing a weapon absent from the supplied source; support poses are unarmed gameplay adaptations.
- Mechanical hand remains anatomical RIGHT in both directions; source art is not horizontally mirrored.
- [Downloaded unmodified full-body official design art, physically viewed. It establishes the brown greatcoat, dark trousers/shoes and red anatomical RIGHT mechanical hand. Generated pose motion is a CQC adaptation.](https://www.creativeuncut.com/gallery-12/mgspw-ramon-galvez-mena.html) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## archive__coldman

### HOT COLDMAN — PEACE WALKER

**Rôle :** Simulation prudente, pas de super-pouvoirs. **Profil :** `civilian`.

**Base présente dans le code :** Directeur et stratège ; les ordres nucléaires restent des objectifs, pas une attaque de duel.

**Incarnation à conserver :** PW — 1974

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, special, specialForward, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `tuxedo`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** HOT COLDMAN : posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas hésitants mais lisibles, en conservant l’âge et la stature. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Simulation prudente, pas de super-pouvoirs » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut.
- **jump_land :** HOT COLDMAN : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas hésitants mais lisibles, en conservant l’âge et la stature. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de HOT COLDMAN. Terminer par réaction humaine puis reprise d’appui ; combat explicitement simulé. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « PEACE WALKER », présentation de PW — 1974, puis posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Geste court lié à « Repousser » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, réaction humaine puis reprise d’appui ; combat explicitement simulé ; HOT COLDMAN vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à PEACE WALKER.
- **round_loss :** Proposition CQC : HOT COLDMAN réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Issue de secours », revenir par réaction humaine puis reprise d’appui ; combat explicitement simulé, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de HOT COLDMAN, préparer « Jab » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de HOT COLDMAN, préparer « Frappe engagée » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de HOT COLDMAN, préparer « Balayage » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de HOT COLDMAN, préparer « Projection » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Repousser

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de HOT COLDMAN, préparer « Repousser » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Repousser » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialDown — Observation du terrain

**Existant :** `mark` / `recon` ; 26/1/30 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de HOT COLDMAN, préparer « Observation du terrain » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Orienter regard, optique ou terminal vers la cible observée, sans consulter une action future.

**Action.** Pour « Observation du terrain », déclencher lecture/repérage avec un petit geste ou changement d’optique et un indicateur séparé. Le corps doit rester visible et vulnérable selon les données de combat.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé. Couper le signal ou abaisser l’outil ; retour vers l’adversaire sans nouvelle arme inventée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Portée limitée ; le marquage ne vise ni à travers toute l’arène ni automatiquement.

##### specialForward — Pas de retrait

**Existant :** `mobility` / `movement` ; 7/18/25 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de HOT COLDMAN, préparer « Pas de retrait » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Préparer l’appui qui produit le déplacement ; pas hésitants mais lisibles, en conservant l’âge et la stature.

**Action.** Exécuter « Pas de retrait » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 4 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : La silhouette reste touchable ; la sortie est punissable.

##### specialBack — Repli de Coldman

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de HOT COLDMAN, préparer « Repli de Coldman » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Préparer l’appui qui produit le déplacement ; pas hésitants mais lisibles, en conservant l’âge et la stature.

**Action.** Exécuter « Repli de Coldman » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Issue de secours

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de HOT COLDMAN, préparer « Issue de secours » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Issue de secours », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Reprendre son souffle

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de HOT COLDMAN, préparer « Reprendre son souffle » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Reprendre son souffle ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Issue de secours — Final

Famille `cqc`, ton `nonlethal` ; 220 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Issue de secours / Repousser.

Plan 1 : HOT COLDMAN sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Issue de secours / Repousser ». Plan 2 : contact de saisie ou neutralisation lié à « Issue de secours / Repousser », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : réaction humaine puis reprise d’appui ; combat explicitement simulé, pose de signature face à l’adversaire. Respecter le ton nonlethal enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Repousser / Observation du terrain

Famille `cqc`, ton `nonlethal` ; 238 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Issue de secours / Observation du terrain.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Issue de secours / Observation du terrain » ; l’espace disponible doit être lisible. Plan 2 : contact de saisie ou neutralisation lié à « Issue de secours / Observation du terrain », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : réaction humaine puis reprise d’appui ; combat explicitement simulé, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton nonlethal enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Pas de retrait — Point final

Famille `cqc`, ton `nonlethal` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Issue de secours / Pas de retrait.

Plan 1 : approche jusqu’à la distance réelle de « Issue de secours / Pas de retrait », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Issue de secours / Pas de retrait », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : réaction humaine puis reprise d’appui ; combat explicitement simulé, prise de distance et maintien final. Respecter le ton nonlethal enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Simulation prudente — Mission close

Famille `capture`, ton `nonlethal` ; 274 ticks CQC ; phases actuelles : stun → disarm → restrain → extract. Appuis déclarés : Issue de secours / Projection.

Plan 1 : après une observation ou un repli, HOT COLDMAN reprend l’initiative par « Issue de secours / Projection ». Plan 2 : contact de saisie ou neutralisation lié à « Issue de secours / Projection », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : réaction humaine puis reprise d’appui ; combat explicitement simulé, rangement/pose finale différente des trois autres. Respecter le ton nonlethal enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Sixteen support/unarmed motion keyposes are CQC game adaptations, not source motion capture or original combat moves.
- Generated2.5D presentation seeks close canonical identity/costume/equipment; no absolute1:1 original pixel or material certificate.
- [Downloaded unchanged official full-body character design sheet reproduced by Creative Uncut, physically inspected. Costume, physical anatomy and visible canonical equipment fixed by this source. Generated pose motion remains an authored CQC adaptation.](https://www.creativeuncut.com/gallery-12/mgspw-coldman.html) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## archive__skull_face

### SKULL FACE — MGSV

**Rôle :** Commandement — simulation rapprochée. **Profil :** `command_simulation`.

**Base présente dans le code :** Antagoniste de commandement ; aucun duel canonique ni flamme surnaturelle inventée.

**Incarnation à conserver :** Original2015 TPP Skull Face, living scarred human, formal dark coat/waistcoat/fedora/domino mask and western boots, empty-handed source posture

**État vérifié :** métadonnées natives avec limites. 72 régions source distinctes dans les deux directions ; groupes : idle, walk, guard, crouch, jump, punch, heavy, low, hit, ko, shoot, deploy, throw, recover, attack.

**Réemplois à examiner :** `throw` = throw, specialForward, super.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `retro-msx`, `tuxedo`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** SKULL FACE : posture de commandement et outil de simulation explicitement séparés d’un combat canonique. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** repositionnement mesuré puis geste de décision. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Commandement — simulation rapprochée » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder posture de commandement et outil de simulation explicitement séparés d’un combat canonique.
- **jump_land :** SKULL FACE : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. repositionnement mesuré puis geste de décision. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de SKULL FACE. Terminer par clore le signal de commande, abaisser l’outil et réobserver la scène. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGSV », présentation de Original2015 TPP Skull Face, living scarred human, formal dark coat/waistcoat/fedora/domino mask and western boots, empty-handed source posture, puis posture de commandement et outil de simulation explicitement séparés d’un combat canonique. Geste court lié à « Désigner l’axe — simulation » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, clore le signal de commande, abaisser l’outil et réobserver la scène ; SKULL FACE vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGSV.
- **round_loss :** Proposition CQC : SKULL FACE réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Entrée du commandement — simulation », revenir par clore le signal de commande, abaisser l’outil et réobserver la scène, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SKULL FACE, préparer « Jab » ; posture de commandement et outil de simulation explicitement séparés d’un combat canonique. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** clore le signal de commande, abaisser l’outil et réobserver la scène.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SKULL FACE, préparer « Frappe engagée » ; posture de commandement et outil de simulation explicitement séparés d’un combat canonique. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** clore le signal de commande, abaisser l’outil et réobserver la scène.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SKULL FACE, préparer « Balayage » ; posture de commandement et outil de simulation explicitement séparés d’un combat canonique. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** clore le signal de commande, abaisser l’outil et réobserver la scène.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SKULL FACE, préparer « Projection » ; posture de commandement et outil de simulation explicitement séparés d’un combat canonique. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** clore le signal de commande, abaisser l’outil et réobserver la scène. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Désigner l’axe — simulation

**Existant :** `mark` / `recon` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SKULL FACE, préparer « Désigner l’axe — simulation » ; posture de commandement et outil de simulation explicitement séparés d’un combat canonique. Orienter regard, optique ou terminal vers la cible observée, sans consulter une action future.

**Action.** Pour « Désigner l’axe — simulation », déclencher lecture/repérage avec un petit geste ou changement d’optique et un indicateur séparé. Le corps doit rester visible et vulnérable selon les données de combat.

**Retour.** clore le signal de commande, abaisser l’outil et réobserver la scène. Couper le signal ou abaisser l’outil ; retour vers l’adversaire sans nouvelle arme inventée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Désignation visible de simulation bonus à portée limitée ; sortir de portée ou punir la préparation. Aucun tir ou pouvoir mental personnel revendiqué.

##### specialDown — Défense du commandement — simulation

**Existant :** `buff` / `armor` ; 24/1/31 ticks ; groupe `deploy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SKULL FACE, préparer « Défense du commandement — simulation » ; posture de commandement et outil de simulation explicitement séparés d’un combat canonique. Montrer la préparation corporelle ou mécanique de « Défense du commandement — simulation ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** clore le signal de commande, abaisser l’outil et réobserver la scène. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde engagée de simulation bonus, une seule frappe absorbée ; saisir ou attendre la fin de la courte protection.

##### specialForward — CQC du commandement — simulation

**Existant :** `melee` / `grapple` ; 10/3/32 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SKULL FACE, préparer « CQC du commandement — simulation » ; posture de commandement et outil de simulation explicitement séparés d’un combat canonique. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** clore le signal de commande, abaisser l’outil et réobserver la scène. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saisie rapprochée de simulation bonus à mains nues ; recul, saut ou protection après projection. Aucune crosse d’arme personnelle non certifiée.

##### specialBack — Repli du commandement

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `walk`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SKULL FACE, préparer « Repli du commandement » ; posture de commandement et outil de simulation explicitement séparés d’un combat canonique. Préparer l’appui qui produit le déplacement ; repositionnement mesuré puis geste de décision.

**Action.** Exécuter « Repli du commandement » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** clore le signal de commande, abaisser l’outil et réobserver la scène. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Entrée du commandement — simulation

**Existant :** `melee` / `strike` ; 35/7/44 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SKULL FACE, préparer « Entrée du commandement — simulation » ; posture de commandement et outil de simulation explicitement séparés d’un combat canonique. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Entrée du commandement — simulation », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** clore le signal de commande, abaisser l’outil et réobserver la scène.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Entrée rapprochée de simulation bonus : 30 points d’effort et 50 points de jauge ; garde ou recul pendant la longue préparation, aucun projectile surnaturel.

##### utility — Reprendre appui — simulation

**Existant :** `recover` / `recovery` ; 54/1/20 ticks ; groupe `recover`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SKULL FACE, préparer « Reprendre appui — simulation » ; posture de commandement et outil de simulation explicitement séparés d’un combat canonique. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Reprendre appui — simulation ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** clore le signal de commande, abaisser l’outil et réobserver la scène. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pause de simulation bonus interrompable avant récupération de l’effort ; aucun soin ni réapparition de cartouches.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Ordre XOF — simulation

Famille `cqc`, ton `simulation` ; 220 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Entrée du commandement — simulation.

Plan 1 : SKULL FACE sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Entrée du commandement — simulation ». Plan 2 : contact de saisie ou neutralisation lié à « Entrée du commandement — simulation », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : clore le signal de commande, abaisser l’outil et réobserver la scène, pose de signature face à l’adversaire. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Défense du commandement — simulation

Famille `tactical`, ton `simulation` ; 238 ticks CQC ; phases actuelles : prepare → guard → confirm → pose. Appuis déclarés : Défense du commandement — simulation.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Défense du commandement — simulation » ; l’espace disponible doit être lisible. Plan 2 : matérialiser le geste tactique « Défense du commandement — simulation » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : clore le signal de commande, abaisser l’outil et réobserver la scène, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Contrôle rapproché — simulation

Famille `cqc`, ton `simulation` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : CQC du commandement — simulation.

Plan 1 : approche jusqu’à la distance réelle de « CQC du commandement — simulation », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « CQC du commandement — simulation », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : clore le signal de commande, abaisser l’outil et réobserver la scène, prise de distance et maintien final. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Repli de Skull Face — simulation

Famille `tactical`, ton `simulation` ; 274 ticks CQC ; phases actuelles : prepare → guard → confirm → pose. Appuis déclarés : Repli du commandement.

Plan 1 : après une observation ou un repli, SKULL FACE reprend l’initiative par « Repli du commandement ». Plan 2 : matérialiser le geste tactique « Repli du commandement » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : clore le signal de commande, abaisser l’outil et réobserver la scène, rangement/pose finale différente des trois autres. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Target remains1:1 source-specific original2015 TPP. These newly painted2D poses are closest_supported adaptations of original3D references, never extracted source animation, absolute pixel/model/material identity or absolute1:1 certification.
- Selected costume is original TPP scarred living HUMAN face, domino mask, fedora, thigh-length formal coat/waistcoat, beige-grey collar and dark tie, full black gloves, loose trousers tucked into tall black western boots. No literal skeleton, undead skull, parasite-soldier armor, flaming Volgin attributes or Diamond Dogs diamond.
- Dark source cutscene lighting partly occludes seams, reverse details and precise boot leather/sole stitching. Source gold XOF chest crest and scar relief remain interpreted at sprite scale; exact crest lettering, badge pixel placement, scar topology, finger count in occlusion and material response are not certified1:1. C LEFT final preserves distinctive scar lines but fine relief is softer than high-resolution official portrait.
- Original full body sources show a partly obscured item by anatomical right thigh; they do NOT establish its precise firearm model or personal shooting use. IMFDB TPP www/apex/http all returned403 and no full verified weapon capture was recovered. Neither absence of every weapon in canon nor a generic pistol, Mare’s Leg or personal volley is certified. Selected empty-handed dialogue-derived posture conservatively omits unresolved holstered detail. No firearm/grenade is invented in any native pose.
- All normal strikes, bounded jump, guard, crouch, physical grab, hit/KO and stamina recovery are authored versus adaptations. Source dialogue supports grounded human gestures, not an actual canonical duel, magic marking power, ballistic finger muzzle or supernatural shield. Gameplay/profile consistency and explicit simulation wording remain independent integrator responsibilities.
- C shoot is only the existing sprite action key for non-ballistic designation0..2; deploy3..5 is guarded posture without deployed ordnance; throw6..8 is authored physical CQC control; recover9..11 restores composure/effort and never loads a firearm. Super may use throw/heavy for explicitly authored melee. Hand marks are gesture landmarks, not ballistic origins.
- Both facings independently generated; no mirrored raster or runtime body reflection. Twelve figures per selected sheet physically inspected. A LEFT1 rejected mixed directions; C LEFT1 rejected extra tiny lapel mark, C LEFT2 edit did not clearly remove it and softened scars; C LEFT3 fixed lapel policy but cell6 facedRIGHT; C LEFT4 final corrects that sole direction through image_gen. All ten generated native PNGs, exact prompts and rejected originals preserved, no extra OC.
- Pillow/NumPy/SciPy inspect alpha/hash/components and describe Canvas rectangles/pivots only, no pixels edited. Native sub-alpha8 fringes and RGB remain untouched. Fixed source upright height prevents crouch/KO stretching; actual hitboxes/camera/mobile/phase validation belongs to integrator.
- Original-incarnation appearance supported by the physically inspected references; motions, reduced 2D proportions and Versus choreography are authored adaptations, not extracted original rigs. No absolute 1:1 certification.
- Original native RGBA bytes preserved; RGB colors under zero or very low alpha are not opaque stage backgrounds. Final live Canvas crop/contour and action contact verification pending.
- [Official PlayStation original TPP head/shoulders portrait. Living heavily scarred human face/neck, separate black domino mask, black fedora, formal jacket/shirt/tie; no weapon or full lower body.](https://image.api.playstation.com/cdn/UP0101/CUSA01140_00/doKmjR2srvfPW1dnp4l1sGKKvF7ub9bP.png) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original TPP face under black fedora, domino mask, burn scars, formal collar/tie; dialogue only.](https://archive.org/download/PS4_Longplay_051_Metal_Gear_Solid_V_The_Phantom_Pain/PS4_Longplay_051_Metal_Gear_Solid_V_The_Phantom_Pain_Part_5.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original bald severely scarred living human head while hat is briefly removed, domino mask, dark waistcoat/shirt/tie, black full gloves. Hatless phase excluded from selected sprites.](https://archive.org/download/PS4_Longplay_051_Metal_Gear_Solid_V_The_Phantom_Pain/PS4_Longplay_051_Metal_Gear_Solid_V_The_Phantom_Pain_Part_5.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original reverse thigh-length coat split and attached hems, relaxed walking; no invented backpack.](https://archive.org/download/PS4_Longplay_051_Metal_Gear_Solid_V_The_Phantom_Pain/PS4_Longplay_051_Metal_Gear_Solid_V_The_Phantom_Pain_Part_5.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original rear complete standing silhouette, full dark riding/western boots, trouser cut and coat length.](https://archive.org/download/PS4_Longplay_051_Metal_Gear_Solid_V_The_Phantom_Pain/PS4_Longplay_051_Metal_Gear_Solid_V_The_Phantom_Pain_Part_5.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original full frontal body: source tailored coat/waistcoat, gold left-breast crest, grey-beige shirt/tie, black full gloves, loose trousers tucked into tall western boots with diagonal shaft detail. Small partly occluded item by right thigh does not establish weapon model.](https://archive.org/download/PS4_Longplay_051_Metal_Gear_Solid_V_The_Phantom_Pain/PS4_Longplay_051_Metal_Gear_Solid_V_The_Phantom_Pain_Part_5.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original full front body with raised open gloved hand while speaking; grounded restrained command gesture, original boot/toe/heel and source silhouette. No firearm firing.](https://archive.org/download/PS4_Longplay_051_Metal_Gear_Solid_V_The_Phantom_Pain/PS4_Longplay_051_Metal_Gear_Solid_V_The_Phantom_Pain_Part_5.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original seated source hand gesture and black gloves, coat/collar/mask/fedora; source for adapted designation motion, not a psychic or shooting power.](https://archive.org/download/PS4_Longplay_051_Metal_Gear_Solid_V_The_Phantom_Pain/PS4_Longplay_051_Metal_Gear_Solid_V_The_Phantom_Pain_Part_5.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).
