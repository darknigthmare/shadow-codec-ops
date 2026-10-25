# Animations — CORE

**10 acteurs du registre courant.** Les titres d’actions et paramètres sont observés ; les descriptions sont des propositions CQC à produire et valider. Un groupe de frames existant ne certifie pas l’ensemble du mouvement ou sa fidélité originale.

[Index des fiches](README.md) · [Contrat commun](../04_ANIMATIONS_SPRITES.md)

## Sommaire

- [JUNGLE EVIL](#core__jungle_evil) — MG2 / RENFORTS
- [NIGHT FRIGHT](#core__night_fright) — MG2 / RENFORTS
- [OCELOT — MGSV](#core__ocelot_mgsv) — TPP / RENFORTS
- [SKULLS — MIST](#core__skull_mist) — TPP / RENFORTS
- [SKULLS — ARMOR](#core__skull_armor) — TPP / RENFORTS
- [SKULLS — SNIPER](#core__skull_sniper) — TPP / RENFORTS
- [SNAKE — AC!D](#core__snake_acid) — METAL GEAR AC!D / ADAPTATION VERSUS
- [TELIKO FRIEDMAN](#core__teliko) — METAL GEAR AC!D / ADAPTATION VERSUS
- [LEONE](#core__leone) — METAL GEAR AC!D / ADAPTATION VERSUS
- [CLOWN](#core__clown) — METAL GEAR AC!D / ADAPTATION VERSUS

## core__jungle_evil

### JUNGLE EVIL — MG2 / RENFORTS

**Rôle :** Arme longue conventionnelle et déplacement bas visible. **Profil :** `msx2_conventional_longgun`.

**Base présente dans le code :** PREDATOR du manuel japonais Metal Gear2 MSX2 original1990, alias runtime JUNGLE EVIL : guérillero humain vert/sombre et arme longue conventionnelle. Modèle, calibre, alimentation et mode de tir non résolus. Aucune grenade, flamme, plasma, laser ou invisibilité. Groupe deploy = déplacement bas toujours visible, sans lancement. Tirs, réserve de douze, six tirs du super, gestion de réserve, contacts et collisions sont des adaptations du versus.

**Incarnation à conserver :** Original1990 human PREDATOR, preserved runtime alias JUNGLE EVIL; green covered head/uniform and generic long dark firearm, no film Predator or later portrait blend

**État vérifié :** métadonnées natives avec limites. 72 régions source distinctes dans les deux directions ; groupes : idle, walk, guard, crouch, jump, punch, heavy, low, hit, ko, shoot, deploy, throw, recover, attack.

**Réemplois à examiner :** `heavy` = heavy, specialForward ; `shoot` = special, super ; `deploy` = specialDown, specialBack.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `nextgen`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** JUNGLE EVIL : arme longue conventionnelle et silhouette de cette incarnation MSX2. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** appuis militaires contenus, canon sécurisé. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Arme longue conventionnelle et déplacement bas visible » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder arme longue conventionnelle et silhouette de cette incarnation MSX2.
- **jump_land :** JUNGLE EVIL : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. appuis militaires contenus, canon sécurisé. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de JUNGLE EVIL. Terminer par recul et retour de visée sans arme futuriste importée. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MG2 / RENFORTS », présentation de Original1990 human PREDATOR, preserved runtime alias JUNGLE EVIL; green covered head/uniform and generic long dark firearm, no film Predator or later portrait blend, puis arme longue conventionnelle et silhouette de cette incarnation MSX2. Geste court lié à « Tir conventionnel — adaptation » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, recul et retour de visée sans arme futuriste importée ; JUNGLE EVIL vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MG2 / RENFORTS.
- **round_loss :** Proposition CQC : JUNGLE EVIL réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Six tirs conventionnels — adaptation », revenir par recul et retour de visée sans arme futuriste importée, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JUNGLE EVIL, préparer « Jab » ; arme longue conventionnelle et silhouette de cette incarnation MSX2. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul et retour de visée sans arme futuriste importée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JUNGLE EVIL, préparer « Frappe engagée » ; arme longue conventionnelle et silhouette de cette incarnation MSX2. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** recul et retour de visée sans arme futuriste importée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JUNGLE EVIL, préparer « Balayage » ; arme longue conventionnelle et silhouette de cette incarnation MSX2. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** recul et retour de visée sans arme futuriste importée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JUNGLE EVIL, préparer « Projection » ; arme longue conventionnelle et silhouette de cette incarnation MSX2. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recul et retour de visée sans arme futuriste importée. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Tir conventionnel — adaptation

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JUNGLE EVIL, préparer « Tir conventionnel — adaptation » ; arme longue conventionnelle et silhouette de cette incarnation MSX2. Montrer la prise et la visée de l’arme décrite par « Tir conventionnel — adaptation » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** recul et retour de visée sans arme futuriste importée. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Tir annoncé, garde haute/accroupissement/saut/parade ; marque, calibre, cadence et effets exacts de l’arme originale non prouvés.

##### specialDown — Déplacement bas visible — adaptation

**Existant :** `mobility` / `movement` ; 24/12/31 ticks ; groupe `deploy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JUNGLE EVIL, préparer « Déplacement bas visible — adaptation » ; arme longue conventionnelle et silhouette de cette incarnation MSX2. Préparer l’appui qui produit le déplacement ; appuis militaires contenus, canon sécurisé.

**Action.** Exécuter « Déplacement bas visible — adaptation » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 2 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** recul et retour de visée sans arme futuriste importée. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Déplacement visible et borné du versus ; collision conservée, saut ou approche pour punir la préparation ou la sortie. Aucune invulnérabilité.

##### specialForward — Contact corporel — adaptation

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JUNGLE EVIL, préparer « Contact corporel — adaptation » ; arme longue conventionnelle et silhouette de cette incarnation MSX2. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Contact corporel — adaptation » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul et retour de visée sans arme futuriste importée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Repli bas visible — adaptation

**Existant :** `mobility` / `movement` ; 19/12/27 ticks ; groupe `deploy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JUNGLE EVIL, préparer « Repli bas visible — adaptation » ; arme longue conventionnelle et silhouette de cette incarnation MSX2. Préparer l’appui qui produit le déplacement ; appuis militaires contenus, canon sécurisé.

**Action.** Exécuter « Repli bas visible — adaptation » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -3 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** recul et retour de visée sans arme futuriste importée. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Déplacement visible et borné du versus ; collision conservée, saut ou approche pour punir la préparation ou la sortie. Aucune invulnérabilité.

##### super — Six tirs conventionnels — adaptation

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JUNGLE EVIL, préparer « Six tirs conventionnels — adaptation » ; arme longue conventionnelle et silhouette de cette incarnation MSX2. Montrer la prise et la visée de l’arme décrite par « Six tirs conventionnels — adaptation » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** recul et retour de visée sans arme futuriste importée. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Six unités de la réserve du versus et50points de jauge ; préparation longue, garde/saut/parade. Nombre et cadence adaptés, pas certifiés comme mode de tir original.

##### utility — Reprendre la réserve — adaptation

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `recover`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JUNGLE EVIL, préparer « Reprendre la réserve — adaptation » ; arme longue conventionnelle et silhouette de cette incarnation MSX2. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Reprendre la réserve — adaptation », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** recul et retour de visée sans arme futuriste importée. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Manipulation visible interrompable avant restauration de la réserve du versus ; modèle et alimentation de l’arme non prouvés.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Six tirs conventionnels — adaptation — conclusion adaptée

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : prepare → release → confirm → pose. Appuis déclarés : Six tirs conventionnels — adaptation.

Plan 1 : JUNGLE EVIL sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Six tirs conventionnels — adaptation ». Plan 2 : présenter l’arme effectivement associée à « Six tirs conventionnels — adaptation », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : recul et retour de visée sans arme futuriste importée, pose de signature face à l’adversaire.

##### Déplacement bas visible — adaptation — conclusion adaptée

Famille `tactical`, ton `stylized` ; 238 ticks CQC ; phases actuelles : prepare → move → confirm → pose. Appuis déclarés : Déplacement bas visible — adaptation.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Déplacement bas visible — adaptation » ; l’espace disponible doit être lisible. Plan 2 : matérialiser le geste tactique « Déplacement bas visible — adaptation » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : recul et retour de visée sans arme futuriste importée, arrêt du dispositif et retour au cadre d’ensemble.

##### Tir conventionnel — adaptation — conclusion adaptée

Famille `ballistic`, ton `stylized` ; 256 ticks CQC ; phases actuelles : prepare → release → confirm → pose. Appuis déclarés : Tir conventionnel — adaptation.

Plan 1 : approche jusqu’à la distance réelle de « Tir conventionnel — adaptation », arme et main libre identifiées. Plan 2 : présenter l’arme effectivement associée à « Tir conventionnel — adaptation », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : recul et retour de visée sans arme futuriste importée, prise de distance et maintien final.

##### Repli bas visible — adaptation — conclusion adaptée

Famille `tactical`, ton `stylized` ; 274 ticks CQC ; phases actuelles : prepare → move → confirm → pose. Appuis déclarés : Repli bas visible — adaptation.

Plan 1 : après une observation ou un repli, JUNGLE EVIL reprend l’initiative par « Repli bas visible — adaptation ». Plan 2 : matérialiser le geste tactique « Repli bas visible — adaptation » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : recul et retour de visée sans arme futuriste importée, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Closest supported original1990 MSX2 PREDATOR, runtime alias JUNGLE EVIL. Exact UID is core__jungle_evil, without _mg2. No film alien, remake portrait, fan-art anatomy or absolute1:1 pixel/model/material certification.
- Original Japanese manual page42 supports human guerrilla/ambush specialist. Tiny green/dark sprite mirror and original-era wheat-field LP captures support green covered head, simple green uniform, dark boots and a long dark firearm. Real face/hair/skin/glove details, exact cloth pattern, headwear type and reverse-side asymmetry remain unresolved. Minimal facial blocks and rear shoulder/cloth contour are authored interpretations, not realistic identity or backpack hardware claims.
- LP graphics preserve original MSX2 visual era, but ROM/emulator/translation patch are unverified; English dialogue/LP commentary is not a certified original-language transcript. Yellow wheat, hay bales, pink mirror matte and HUD are not actor clothing. HUD grenades belong to Snake and do not prove Jungle Evil has grenades.
- Visible long firearm silhouette is supported, but its brand/model/caliber/feed and exact firing mode/effect are not proved. No flame jet, fuel tank, plasma, laser, scope/suppressor brand, grenade or red eye is depicted in selected sources. Any ballistic versus projectile, magazine count, six-shot super, reload restoration, damage, timing or range is explicit gameplay adaptation, not original weapon data.
- All72 native action poses are newly authored versus adaptations, not extracted/upscaled MSX2 animations. C shoot is generic conventional longgun aim; deploy is always-visible low conceal/crawl; throw is physical unarmed CQC with gun carried at far side/back; recover is restrained reserve/receiver handling. Small carry straps and gun repositioning are functional adaptations with original hardware unknown. Far-side equipment can be occluded, especially RIGHT B KO11; hidden topology is not certified. No optical invisibility, magical cloak or universal invulnerability.
- Six independent final native sources and every12 complete bodies were physically viewed, including complete visible barrels and lowered/rest poses. No software mirror, native resize, cleanup or pixel editing. A RIGHT01 is rejected and retained; ImageGen correction can also vary untargeted pixels and exact11-cell preservation is not claimed.
- True zero-alpha space and12 large body components are verified, while fine native low-alpha glow/fringe and tiny disconnected alpha residue remain unedited and explicitly qualified. Near-opaque254/253 body pixels are not255 purity certified. Measured component crops preserve original source bytes. Actual Canvas/live fighting/mobile/phase/origin/collision review and integration belong to root.
- Fixed sheet scale uses upright human head-cover to boot height, never a large gun silhouette or crouch/KO stretched to standing size. Native pelvis-band actor anchors and visible ground baselines are recorded; the two prone C4 hip axes are separately physically selected from opaque green body pixels and projected to the full visible-body ground baseline. These are versus renderer pivots, not skeletal model extraction.
- Raw generic rifle profile/snapshots remain untouched. Its grenade slot and translucent cloak must be corrected only in a new UID-scoped future adapter. Proposed mapping is ordinary physical normals/throw, generic shoot special/super, low deploy specialDown/specialBack, physical heavy specialForward, reserve handling utility; balance is not canon.
- Target1:1 remains closest_supported; no absolute artistic, animation, material, face or gameplay1:1 certification.
- Japanese manual is the original1990 MSX2 publication. LP graphics preserve the MSX2 era, but ROM/emulator/hardware and English localization/translation patch are unverified; English prose is not a certified Japanese transcript.
- Tiny sprite mirrors and captures cannot prove realistic face/hair, exact seams, reverse geometry, equipment brands/models or extracted animation. Newly authored72poses/UID and all balance parameters are Versus adaptations.
- Independent facings have different unchanged native SHA; no software mirroring, resizing, erasure or alpha repaint. Native low-alpha fringe and small residue remain qualified.
- Browser Canvas, actual engine phases, contact/hitboxes, origins, finishers, controls/mobile and both game embeddings remain pending root integration verification.
- PREDATOR in original Japanese manual, runtime aliasJUNGLE EVIL, human green/dark guerrilla silhouette with conventional long firearm. Actual first-activeC shoot barrel endpoints are independently measured; brand/model/caliber/feed and exact firing mode are unproved.
- Cdeploy is low conceal/crawl with the whole body visible, without translucent optical cloak, invisibility, grenade, flame jet, plasma, laser or fuel hardware. Normals/throw/reserve handling are Versus adaptations. Snake HUD grenades do not prove this actor has them.
- [reference-only rendering from saved manual scan](https://archive.org/download/metal-gear-2-solid-snake-manual-original/MetalGear%202%20-%20SolidSnake%20Manual%20%28Original%29_text.pdf#page=42) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [tiny sprite mirror; source game pixels/palette physically compared; hosting fan power statistics excluded](https://thecodex.wiki/images/c/c5/Jungle_Evil.webp) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [original-era MSX2 graphical capture with English translated text hosted in a secondary LP; ROM/patch unverified; tiny visual evidence, not unmodified-Japanese-ROM or LP-commentary authority](https://lparchive.org/Metal-Gear-1-2/Update%2036/21-Metal_Gear_2_1203.png) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [original-era MSX2 graphical capture with English translated text hosted in a secondary LP; ROM/patch unverified; tiny visual evidence, not unmodified-Japanese-ROM or LP-commentary authority](https://lparchive.org/Metal-Gear-1-2/Update%2036/22-Metal_Gear_2_1204.png) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [original-era MSX2 graphical capture with English translated text hosted in a secondary LP; ROM/patch unverified; tiny visual evidence, not unmodified-Japanese-ROM or LP-commentary authority](https://lparchive.org/Metal-Gear-1-2/Update%2036/23-Metal_Gear_2_1205.png) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [original-era MSX2 graphical capture with English translated text hosted in a secondary LP; ROM/patch unverified; tiny visual evidence, not unmodified-Japanese-ROM or LP-commentary authority](https://lparchive.org/Metal-Gear-1-2/Update%2036/25-Metal_Gear_2_1209.png) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [original-era MSX2 graphical capture with English translated text hosted in a secondary LP; ROM/patch unverified; tiny visual evidence, not unmodified-Japanese-ROM or LP-commentary authority](https://lparchive.org/Metal-Gear-1-2/Update%2036/27-Metal_Gear_2_1210.png) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__night_fright

### NIGHT FRIGHT — MG2 / RENFORTS

**Rôle :** Tir, grenades et distance. **Profil :** `stealth_rifle`.

**Base présente dans le code :** Camouflage technologique et tir ; profil MG2 sans techniques de cyborg.

**Incarnation à conserver :** Invisible Whispers veteran NightSight, project UID NightFright retained; visible presentation reconstruction of unknown body.

**État vérifié :** unattested-body-presentation-reconstruction. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** NIGHT FRIGHT : arme longue et apparition/disparition séparées. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas lisibles avant camouflage et à la réapparition. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Tir, grenades et distance » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder arme longue et apparition/disparition séparées.
- **jump_land :** NIGHT FRIGHT : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas lisibles avant camouflage et à la réapparition. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de NIGHT FRIGHT. Terminer par reprise de visée sans déplacer l’origine du tir. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MG2 / RENFORTS », présentation de Invisible Whispers veteran NightSight, project UID NightFright retained; visible presentation reconstruction of unknown body., puis arme longue et apparition/disparition séparées. Geste court lié à « Tir masqué » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, reprise de visée sans déplacer l’origine du tir ; NIGHT FRIGHT vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MG2 / RENFORTS.
- **round_loss :** Proposition CQC : NIGHT FRIGHT réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Salve invisible », revenir par reprise de visée sans déplacer l’origine du tir, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NIGHT FRIGHT, préparer « Jab » ; arme longue et apparition/disparition séparées. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** reprise de visée sans déplacer l’origine du tir.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NIGHT FRIGHT, préparer « Frappe engagée » ; arme longue et apparition/disparition séparées. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** reprise de visée sans déplacer l’origine du tir.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NIGHT FRIGHT, préparer « Balayage » ; arme longue et apparition/disparition séparées. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** reprise de visée sans déplacer l’origine du tir.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NIGHT FRIGHT, préparer « Projection » ; arme longue et apparition/disparition séparées. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** reprise de visée sans déplacer l’origine du tir. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Tir masqué

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NIGHT FRIGHT, préparer « Tir masqué » ; arme longue et apparition/disparition séparées. Montrer la prise et la visée de l’arme décrite par « Tir masqué » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** reprise de visée sans déplacer l’origine du tir. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Charge de diversion

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NIGHT FRIGHT, préparer « Charge de diversion » ; arme longue et apparition/disparition séparées. Prélever l’objet correspondant à « Charge de diversion », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** reprise de visée sans déplacer l’origine du tir. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Percée silencieuse

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NIGHT FRIGHT, préparer « Percée silencieuse » ; arme longue et apparition/disparition séparées. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Percée silencieuse » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** reprise de visée sans déplacer l’origine du tir.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Camouflage de Night Fright

**Existant :** `buff` / `stealth` ; 19/1/27 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NIGHT FRIGHT, préparer « Camouflage de Night Fright » ; arme longue et apparition/disparition séparées. Montrer la préparation corporelle ou mécanique de « Camouflage de Night Fright ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** reprise de visée sans déplacer l’origine du tir. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Silhouette translucide, collision intacte ; une attaque ou un impact brise le camouflage.

##### super — Salve invisible

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NIGHT FRIGHT, préparer « Salve invisible » ; arme longue et apparition/disparition séparées. Montrer la prise et la visée de l’arme décrite par « Salve invisible » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** reprise de visée sans déplacer l’origine du tir. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NIGHT FRIGHT, préparer « Recharger » ; arme longue et apparition/disparition séparées. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** reprise de visée sans déplacer l’origine du tir. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Salve invisible — Final

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Salve invisible / Tir masqué.

Plan 1 : NIGHT FRIGHT sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Salve invisible / Tir masqué ». Plan 2 : présenter l’arme effectivement associée à « Salve invisible / Tir masqué », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : reprise de visée sans déplacer l’origine du tir, pose de signature face à l’adversaire.

##### Tir masqué / Charge de diversion

Famille `ballistic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Salve invisible / Charge de diversion.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Salve invisible / Charge de diversion » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Salve invisible / Charge de diversion », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : reprise de visée sans déplacer l’origine du tir, arrêt du dispositif et retour au cadre d’ensemble.

##### Percée silencieuse — Point final

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Salve invisible / Percée silencieuse.

Plan 1 : approche jusqu’à la distance réelle de « Salve invisible / Percée silencieuse », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Salve invisible / Percée silencieuse », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : reprise de visée sans déplacer l’origine du tir, prise de distance et maintien final.

##### Sang-froid — Mission close

Famille `sniper`, ton `stylized` ; 274 ticks CQC ; phases actuelles : mark → steady → shot → fade. Appuis déclarés : Salve invisible / Projection.

Plan 1 : après une observation ou un repli, NIGHT FRIGHT reprend l’initiative par « Salve invisible / Projection ». Plan 2 : présenter l’arme effectivement associée à « Salve invisible / Projection », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : reprise de visée sans déplacer l’origine du tir, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact. This whole-body presentation is explicitly reconstructed from the cited identity/partial appearance evidence; it is not an attested canonical full-body appearance.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- No primary final complete body or facial turnaround was found. This visible full-body presentation is explicitly reconstructed from documented identity/role only, not certified canon.
- Sixteen independent complete native poses per facing are authored gameplay adaptations; legacy UID, saves, lore and combat mechanics are preserved.
- Canonical invisibility and quiet handgun are attested, but visible face, exact suit, weapon silhouette/make/calibre, lower body and colours are not. No Type64, modern camouflage pattern, future exosuit or biological identity is certified.
- The native sprite is the project visible state; existing invisibility and combat mechanics remain separate. No body alias to a Zanzibar soldier is claimed.
- An attributed historicalpixelmirror shows greenupper/brownpants/greenboots and concealedhead. Exact provenance of visibleunusedsprite/frame and finer garment/headcovering are not independently primary-authenticated; it is explicitly supplementary and does not overturn originalmanual invisibility/unknowntrueform.
- [Original1990manual page42 and releasedcodec explicitly say the trueform is unseen. Physicallyviewed attributed historical pixel-sprite mirror provides a conservative greenupper/brownpants/greenboots/concealedhead palette supplement, not a primary final visiblebody certificate.](https://archive.org/download/metal-gear-2-solid-snake-manual-original/MetalGear%202%20-%20SolidSnake%20Manual%20%28Original%29_text.pdf) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__ocelot_mgsv

### OCELOT — MGSV — TPP / RENFORTS

**Rôle :** Six coups et ricochet limité. **Profil :** `ocelot`.

**Base présente dans le code :** Ocelot instructeur : revolvers et contrôle de tir ; pas de bras cybernétique de Liquid.

**Incarnation à conserver :** Original game incarnation, reference-based hand-painted native combat keyframes

**État vérifié :** métadonnées natives avec limites. 32 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, attack, punch, low, throw, deploy, shoot, reload, hit, ko, roll, jump, optic, recover, parry.

**Réemplois à examiner :** `shoot` = special, specialDown, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `tuxedo`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** OCELOT — MGSV : poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas latéraux et regard indépendant des rotations d’arme. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Six coups et ricochet limité » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder poignets, revolvers et étuis propres à cet âge ; manipulation identifiable.
- **jump_land :** OCELOT — MGSV : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas latéraux et regard indépendant des rotations d’arme. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de OCELOT — MGSV. Terminer par replacer chaque arme sans changer sa main ni téléporter les cartouches. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « TPP / RENFORTS », présentation de Original game incarnation, reference-based hand-painted native combat keyframes, puis poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Geste court lié à « Tir d’instructeur » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, replacer chaque arme sans changer sa main ni téléporter les cartouches ; OCELOT — MGSV vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à TPP / RENFORTS.
- **round_loss :** Proposition CQC : OCELOT — MGSV réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Six leçons », revenir par replacer chaque arme sans changer sa main ni téléporter les cartouches, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OCELOT — MGSV, préparer « Jab » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `attack`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OCELOT — MGSV, préparer « Frappe engagée » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OCELOT — MGSV, préparer « Balayage » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OCELOT — MGSV, préparer « Projection » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Tir d’instructeur

**Existant :** `projectile` / `precision` ; 15/1/24 ticks ; groupe `shoot`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OCELOT — MGSV, préparer « Tir d’instructeur » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Montrer la prise et la visée de l’arme décrite par « Tir d’instructeur » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. Prévoir le ricochet comme événement de l’objet ; le corps ne se réoriente pas automatiquement vers la cible.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Six munitions puis recharge ; le ricochet rebondit une fois, pas de tir infini.

##### specialDown — Ricochet rasant

**Existant :** `projectile` / `ballistic` ; 23/1/22 ticks ; groupe `shoot`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OCELOT — MGSV, préparer « Ricochet rasant » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Montrer la prise et la visée de l’arme décrite par « Ricochet rasant » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialForward — Pas de tir

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `walk`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OCELOT — MGSV, préparer « Pas de tir » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Préparer l’appui qui produit le déplacement ; pas latéraux et regard indépendant des rotations d’arme.

**Action.** Exécuter « Pas de tir » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### specialBack — Crosse de contrôle

**Existant :** `parry` / `counter` ; 3/10/29 ticks ; groupe `parry`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OCELOT — MGSV, préparer « Crosse de contrôle » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Présenter la surface ou l’organe de parade et maintenir une fenêtre courte lisible.

**Action.** Recevoir puis dévier au contact réel pour « Crosse de contrôle » ; la riposte et son effet n’apparaissent qu’après succès. Une attente sans contact garde une pose différente du contre réussi.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches. Séparer sortie ratée, blocage simple et riposte ; aucun effet de réussite avant collision.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Retarder la frappe, projeter ou attendre les 29 images de récupération.

##### super — Six leçons

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OCELOT — MGSV, préparer « Six leçons » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Montrer la prise et la visée de l’arme décrite par « Six leçons » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Exige six cartouches et 50 TACTIC. Accroupissement sous les tirs hauts, saut ou interruption avant départ ; aucun rechargement gratuit.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OCELOT — MGSV, préparer « Recharger » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Diamond Draw

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Six leçons / Tir d’instructeur.

Plan 1 : OCELOT — MGSV sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Six leçons / Tir d’instructeur ». Plan 2 : présenter l’arme effectivement associée à « Six leçons / Tir d’instructeur », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : replacer chaque arme sans changer sa main ni téléporter les cartouches, pose de signature face à l’adversaire.

##### Interrogatoire d’Ocelot

Famille `sniper`, ton `stylized` ; 238 ticks CQC ; phases actuelles : mark → steady → shot → fade. Appuis déclarés : Six leçons / Ricochet rasant.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Six leçons / Ricochet rasant » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Six leçons / Ricochet rasant », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : replacer chaque arme sans changer sa main ni téléporter les cartouches, arrêt du dispositif et retour au cadre d’ensemble.

##### Six Shots — Mother Base

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Six leçons / Pas de tir.

Plan 1 : approche jusqu’à la distance réelle de « Six leçons / Pas de tir », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Six leçons / Pas de tir », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : replacer chaque arme sans changer sa main ni téléporter les cartouches, prise de distance et maintien final.

##### Triple Cross

Famille `ballistic`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Six leçons / Projection.

Plan 1 : après une observation ou un repli, OCELOT — MGSV reprend l’initiative par « Six leçons / Projection ». Plan 2 : présenter l’arme effectivement associée à « Six leçons / Projection », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : replacer chaque arme sans changer sa main ni téléporter les cartouches, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact, not a certified pixel-perfect 1:1 copy. Canonical identity/costume checked against supplied original or official references.
- Sixteen visually reviewed physical keyframes per direction, thirty-two distinct poses per identity. Action groups share keyframes explicitly; no full motion-capture cycle claim.
- Thirteen required action groups plus optional groups reuse actual poses. Standing source-height scale preserves shorter crouch/KO poses; timing and interpolation are duel adaptations.
- Each direction independently authored; no raster mirroring. Tiny facial, insignia and weapon detail remains approximate at combat scale.
- Source crops follow observed alpha components; wider KO or weapon rectangles may cross the advertised invisible grid. Canvas clip polygons exclude nearby figures where necessary, native PNG bytes unchanged.
- No engine, collision, HP, lore, readiness or gameplay mutation; actual gameplay QA remains Root integration work.
- Some shooting cells include authored muzzle flash. The actual firing cell is restricted to active attack phase; startup/recovery explicitly reuse the authored recovery or weapon-manipulation pose without flash. Snake AC!D LEFT recovery has empty hands. Flash differences between independently authored directions remain qualified.
- [Original MGSV in-game portrait, actual image downloaded and viewed; full-body western costume checked against game incarnation knowledge, lower-body precise tailoring remains approximate.](https://static.wikia.nocookie.net/metalgear/images/8/84/Ocelot_MGSV.png) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__skull_mist

### SKULLS — MIST — TPP / RENFORTS

**Rôle :** Fusil et posture de brume. **Profil :** `parasite`.

**Base présente dans le code :** Original masculine Mist appearance has paired cyan optics, angular mouth apparatus and observed dark long rifle. Original first-encounter fog limits leg/material topology; Armor costume/details cannot fill hidden Mist anatomy as fact. Observed rifle silhouette only; exact rifle model and receiver hidden side unverified. Atmospheric fog is separate visual staging, never a damaging mist missile, psychic blast or Armor-type absorption. Movement stays visible/bounded; no teleport or invisibility inferred from a still reference. Les contacts, collisions, jauges, coûts, durées et cadences sont des adaptations du versus, pas des valeurs des jeux originaux.

**Incarnation à conserver :** Original first-encounter adult male Mist Skull: gaunt bald gray head, dual cyan optics, angular covered nose/mouth apparatus, dark mechanical shoulder/body fittings, dark covered technical legs and boots, olive belt, single held or slung assault-style rifle.

**État vérifié :** métadonnées natives avec limites. 72 régions source distinctes dans les deux directions ; groupes : idle, walk, guard, crouch, punch, heavy, low, jump, shoot, throw, deploy, recover, hit, ko, attack.

**Réemplois à examiner :** `throw` = throw, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** SKULLS — MIST : silhouette et équipement du Skull concerné ; parasite séparé du corps. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** translation/effet propre à ce type, arrivée physiquement posée. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Fusil et posture de brume » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder silhouette et équipement du Skull concerné ; parasite séparé du corps.
- **jump_land :** SKULLS — MIST : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. translation/effet propre à ce type, arrivée physiquement posée. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de SKULLS — MIST. Terminer par dissipation de l’effet et rétablissement de la garde. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « TPP / RENFORTS », présentation de Original first-encounter adult male Mist Skull: gaunt bald gray head, dual cyan optics, angular covered nose/mouth apparatus, dark mechanical shoulder/body fittings, dark covered technical legs and boots, olive belt, single held or slung assault-style rifle., puis silhouette et équipement du Skull concerné ; parasite séparé du corps. Geste court lié à « Tir dans la brume » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, dissipation de l’effet et rétablissement de la garde ; SKULLS — MIST vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à TPP / RENFORTS.
- **round_loss :** Proposition CQC : SKULLS — MIST réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Embuscade — rafale adaptée », revenir par dissipation de l’effet et rétablissement de la garde, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Contact rapproché

**Existant :** `melee` / `strike` ; 7/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SKULLS — MIST, préparer « Contact rapproché » ; silhouette et équipement du Skull concerné ; parasite séparé du corps. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Contact rapproché » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** dissipation de l’effet et rétablissement de la garde.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Adaptation du versus : préparation et sortie visibles, garde/saut/espacement adaptés au geste ; aucune invincibilité ou arme supplémentaire.

##### heavy — Frappe rapprochée

**Existant :** `melee` / `strike` ; 18/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SKULLS — MIST, préparer « Frappe rapprochée » ; silhouette et équipement du Skull concerné ; parasite séparé du corps. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe rapprochée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** dissipation de l’effet et rétablissement de la garde.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Adaptation du versus : préparation et sortie visibles, garde/saut/espacement adaptés au geste ; aucune invincibilité ou arme supplémentaire.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SKULLS — MIST, préparer « Balayage » ; silhouette et équipement du Skull concerné ; parasite séparé du corps. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** dissipation de l’effet et rétablissement de la garde.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SKULLS — MIST, préparer « Projection » ; silhouette et équipement du Skull concerné ; parasite séparé du corps. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** dissipation de l’effet et rétablissement de la garde. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Tir dans la brume

**Existant :** `projectile` / `ballistic` ; 21/1/32 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SKULLS — MIST, préparer « Tir dans la brume » ; silhouette et équipement du Skull concerné ; parasite séparé du corps. Montrer la prise et la visée de l’arme décrite par « Tir dans la brume » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** dissipation de l’effet et rétablissement de la garde. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Adaptation du versus : préparation et sortie visibles, garde/saut/espacement adaptés au geste ; aucune invincibilité ou arme supplémentaire.

##### specialDown — Position dans la brume

**Existant :** `recover` / `recovery` ; 24/1/32 ticks ; groupe `deploy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SKULLS — MIST, préparer « Position dans la brume » ; silhouette et équipement du Skull concerné ; parasite séparé du corps. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Position dans la brume ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** dissipation de l’effet et rétablissement de la garde. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Adaptation du versus : préparation et sortie visibles, garde/saut/espacement adaptés au geste ; aucune invincibilité ou arme supplémentaire.

##### specialForward — Saisie dans la brume

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SKULLS — MIST, préparer « Saisie dans la brume » ; silhouette et équipement du Skull concerné ; parasite séparé du corps. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** dissipation de l’effet et rétablissement de la garde. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Adaptation du versus : préparation et sortie visibles, garde/saut/espacement adaptés au geste ; aucune invincibilité ou arme supplémentaire.

##### specialBack — Écart dans la brume

**Existant :** `mobility` / `movement` ; 22/12/31 ticks ; groupe `walk`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SKULLS — MIST, préparer « Écart dans la brume » ; silhouette et équipement du Skull concerné ; parasite séparé du corps. Préparer l’appui qui produit le déplacement ; translation/effet propre à ce type, arrivée physiquement posée.

**Action.** Exécuter « Écart dans la brume » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -4 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** dissipation de l’effet et rétablissement de la garde. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Adaptation du versus : préparation et sortie visibles, garde/saut/espacement adaptés au geste ; aucune invincibilité ou arme supplémentaire.

##### super — Embuscade — rafale adaptée

**Existant :** `projectile` / `ballistic` ; 32/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SKULLS — MIST, préparer « Embuscade — rafale adaptée » ; silhouette et équipement du Skull concerné ; parasite séparé du corps. Montrer la prise et la visée de l’arme décrite par « Embuscade — rafale adaptée » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 3 émissions, espacées de 7 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** dissipation de l’effet et rétablissement de la garde. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Adaptation du versus : préparation et sortie visibles, garde/saut/espacement adaptés au geste ; aucune invincibilité ou arme supplémentaire.

##### utility — Stabiliser la réserve

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SKULLS — MIST, préparer « Stabiliser la réserve » ; silhouette et équipement du Skull concerné ; parasite séparé du corps. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Stabiliser la réserve ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** dissipation de l’effet et rétablissement de la garde. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Tir dans la brume — conclusion adaptée

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : prepare → release → confirm → pose. Appuis déclarés : Tir dans la brume.

Plan 1 : SKULLS — MIST sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Tir dans la brume ». Plan 2 : présenter l’arme effectivement associée à « Tir dans la brume », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : dissipation de l’effet et rétablissement de la garde, pose de signature face à l’adversaire.

##### Position dans la brume — conclusion adaptée

Famille `tactical`, ton `stylized` ; 238 ticks CQC ; phases actuelles : prepare → rest → settle → pose. Appuis déclarés : Position dans la brume.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Position dans la brume » ; l’espace disponible doit être lisible. Plan 2 : matérialiser le geste tactique « Position dans la brume » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : dissipation de l’effet et rétablissement de la garde, arrêt du dispositif et retour au cadre d’ensemble.

##### Saisie dans la brume — conclusion adaptée

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : prepare → contact → confirm → pose. Appuis déclarés : Saisie dans la brume.

Plan 1 : approche jusqu’à la distance réelle de « Saisie dans la brume », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Saisie dans la brume », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : dissipation de l’effet et rétablissement de la garde, prise de distance et maintien final.

##### Projection — conclusion adaptée

Famille `cqc`, ton `stylized` ; 274 ticks CQC ; phases actuelles : prepare → contact → confirm → pose. Appuis déclarés : Projection.

Plan 1 : après une observation ou un repli, SKULLS — MIST reprend l’initiative par « Projection ». Plan 2 : contact de saisie ou neutralisation lié à « Projection », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : dissipation de l’effet et rétablissement de la garde, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Original first-encounter scene supports masculine Mist unit, gray bald head, dual cyan optics and angular nose/mouth apparatus, dark segmented covered body and assault rifle role. Fog prevents exact hidden-material or exported mesh certification.
- Player montage corroborates original trailer; edited collage is a hosted research source, not an original framebuffer or guarantee of no game mods. Download bytes are preserved unchanged.
- Exact rifle model/name and hidden receiver side remain unverified; conservative observed dark angular assault-rifle silhouette only.
- No sniper-female costume, red one-eye E2 optic, giant armor mecha, alien horns, generic soldier helmet or unrelated parasite powers.
- All poses are authored Versus staging, not extracted original animation/timing.
- Fog in original references obscures lower-body materials and armor seams. Dark technical coverage is conservative illustration, not an exported original model or proof of exact trouser/plating topology.
- Only one rifle appears per selected body. B sheets with unsupported simultaneous held and back-slung rifles were rejected and preserved; replacement B sheets independently generate single-rifle poses.
- Rifle receiver/stock details vary across independently generated sheets. Original dark angular rifle role is supported; exact gun mesh/name and hidden side are unverified.
- No equipped machete is claimed from selected original Mist views, no female Sniper costume and no projectile composed of fog. Utility is a bounded readiness posture; full body stays opaque.
- Every original native PNG and generation attempt is immutable and preserved. Alpha>8 layout grouping and optional Canvas contours only modify source geometry metadata; no raster pixels are cropped, resized, mirrored or edited.
- The six sheets are separately generated native sources. Three source phases per action are authored Versus staging, not original MGSV frame timings, extracted motion or damage certification.
- Hit and KO explicitly reuse recover cells and do not inflate the72 unique source-pose count or certify native defeated animations.
- Physical producer review precedes independent root integration review and actual Canvas/browser verification; this delivery does not claim runtime QA, Git publication or deployment.
- Generated original action staging is an illustrated adaptation of supported incarnation, not extracted original-game sprites or canonical timing/collision data.
- Publisher capture supplies primary visible identity features; Steam player modification state not independently authenticated. Hidden topology/rotation details remain inferred.
- [Original E3 trailer complete masculine Skull silhouettes with high shoulder/collar gear and cyan optics, dark leg coverage. Fog limits material topology.](https://www.metalgearinformer.com/wp-content/uploads/2015/06/MGSV-E3-2015-Trailer-Skulls.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Physically viewed original opening mist encounter montage: masculine bald gray head, dual cyan eyes, angular triangular nose/mouth apparatus, dark segmented armor and held angular assault rifle. Player collage retained unmodified; no extracted model certificate.](https://images.steamusercontent.com/ugc/12547613475556916514/DB43FC0856E638083F445EF55269B29F61343979/?imw=1024&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Physically viewed original opening Mist group complete bodies/head-to-boots and masculine proportions. Dark covered legs and boots, broad mechanical shoulder/chest outline, cyan optics. Dense fog limits seams.](https://images.steamusercontent.com/ugc/50200269954377599/0F943A0EF8A09A35CF58A527E12CE24321D6ABC3/?imw=1024&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__skull_armor

### SKULLS — ARMOR — TPP / RENFORTS

**Rôle :** Machette et durcissement borné. **Profil :** `parasite`.

**Base présente dans le code :** Original male Armor selected appearance: gray mechanical outfit, metallic hardening, narrow machete in anatomical-right hand. Only the machete is directly visible for selected outfit; no rifle, grenade, laser or thrown crystal. FOB original capture and player captures have qualified coating/material topology and distant/night feet detail. Hardening is a bounded authored guard/absorption, never an invincible barrier or a Mist/Sniper power union. Les contacts, collisions, jauges, coûts, durées et cadences sont des adaptations du versus, pas des valeurs des jeux originaux.

**Incarnation à conserver :** Original adult male Armor-type Skull: gray/charcoal mechanical outfit, olive belt, original gray hip/thigh panels and dark boots, observed metallic face/coating and right-held narrow machete.

**État vérifié :** métadonnées natives avec limites. 72 régions source distinctes dans les deux directions ; groupes : idle, walk, guard, crouch, punch, heavy, low, jump, shoot, throw, deploy, recover, hit, ko, attack.

**Réemplois à examiner :** `throw` = throw, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `retro-msx`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** SKULLS — ARMOR : silhouette et équipement du Skull concerné ; parasite séparé du corps. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** translation/effet propre à ce type, arrivée physiquement posée. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Machette et durcissement borné » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder silhouette et équipement du Skull concerné ; parasite séparé du corps.
- **jump_land :** SKULLS — ARMOR : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. translation/effet propre à ce type, arrivée physiquement posée. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de SKULLS — ARMOR. Terminer par dissipation de l’effet et rétablissement de la garde. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « TPP / RENFORTS », présentation de Original adult male Armor-type Skull: gray/charcoal mechanical outfit, olive belt, original gray hip/thigh panels and dark boots, observed metallic face/coating and right-held narrow machete., puis silhouette et équipement du Skull concerné ; parasite séparé du corps. Geste court lié à « Lame blindée » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, dissipation de l’effet et rétablissement de la garde ; SKULLS — ARMOR vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à TPP / RENFORTS.
- **round_loss :** Proposition CQC : SKULLS — ARMOR réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Percée blindée », revenir par dissipation de l’effet et rétablissement de la garde, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Contact rapproché

**Existant :** `melee` / `strike` ; 7/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SKULLS — ARMOR, préparer « Contact rapproché » ; silhouette et équipement du Skull concerné ; parasite séparé du corps. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Contact rapproché » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** dissipation de l’effet et rétablissement de la garde.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Adaptation du versus : préparation et sortie visibles, garde/saut/espacement adaptés au geste ; aucune invincibilité ou arme supplémentaire.

##### heavy — Coupe engagée

**Existant :** `melee` / `blade` ; 18/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SKULLS — ARMOR, préparer « Coupe engagée » ; silhouette et équipement du Skull concerné ; parasite séparé du corps. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** dissipation de l’effet et rétablissement de la garde. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SKULLS — ARMOR, préparer « Balayage » ; silhouette et équipement du Skull concerné ; parasite séparé du corps. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** dissipation de l’effet et rétablissement de la garde.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SKULLS — ARMOR, préparer « Projection » ; silhouette et équipement du Skull concerné ; parasite séparé du corps. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** dissipation de l’effet et rétablissement de la garde. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Lame blindée

**Existant :** `melee` / `blade` ; 13/5/24 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SKULLS — ARMOR, préparer « Lame blindée » ; silhouette et équipement du Skull concerné ; parasite séparé du corps. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** dissipation de l’effet et rétablissement de la garde. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde puis punition ; la lame ne touche qu’une fois par attaque.

##### specialDown — Durcissement métallique

**Existant :** `buff` / `armor` ; 24/1/32 ticks ; groupe `deploy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SKULLS — ARMOR, préparer « Durcissement métallique » ; silhouette et équipement du Skull concerné ; parasite séparé du corps. Montrer la préparation corporelle ou mécanique de « Durcissement métallique ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** dissipation de l’effet et rétablissement de la garde. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Adaptation du versus : préparation et sortie visibles, garde/saut/espacement adaptés au geste ; aucune invincibilité ou arme supplémentaire.

##### specialForward — Saisie blindée

**Existant :** `melee` / `grapple` ; 18/7/32 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SKULLS — ARMOR, préparer « Saisie blindée » ; silhouette et équipement du Skull concerné ; parasite séparé du corps. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** dissipation de l’effet et rétablissement de la garde. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Adaptation du versus : préparation et sortie visibles, garde/saut/espacement adaptés au geste ; aucune invincibilité ou arme supplémentaire.

##### specialBack — Écart blindé

**Existant :** `mobility` / `movement` ; 22/12/31 ticks ; groupe `walk`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SKULLS — ARMOR, préparer « Écart blindé » ; silhouette et équipement du Skull concerné ; parasite séparé du corps. Préparer l’appui qui produit le déplacement ; translation/effet propre à ce type, arrivée physiquement posée.

**Action.** Exécuter « Écart blindé » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -4 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** dissipation de l’effet et rétablissement de la garde. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Adaptation du versus : préparation et sortie visibles, garde/saut/espacement adaptés au geste ; aucune invincibilité ou arme supplémentaire.

##### super — Percée blindée

**Existant :** `melee` / `blade` ; 25/7/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SKULLS — ARMOR, préparer « Percée blindée » ; silhouette et équipement du Skull concerné ; parasite séparé du corps. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** dissipation de l’effet et rétablissement de la garde. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Stabiliser la réserve

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SKULLS — ARMOR, préparer « Stabiliser la réserve » ; silhouette et équipement du Skull concerné ; parasite séparé du corps. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Stabiliser la réserve ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** dissipation de l’effet et rétablissement de la garde. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Lame blindée — conclusion adaptée

Famille `blade`, ton `stylized` ; 220 ticks CQC ; phases actuelles : prepare → contact → confirm → pose. Appuis déclarés : Lame blindée.

Plan 1 : SKULLS — ARMOR sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Lame blindée ». Plan 2 : armer la lame ou le membre de « Lame blindée » et dégager son arc. Plan 3 : enchaîner des coupes lisibles avec angles distincts ; les impacts et les réactions suivent le fil de lame, sans ajout d’arme d’une autre incarnation. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : dissipation de l’effet et rétablissement de la garde, pose de signature face à l’adversaire.

##### Durcissement métallique — conclusion adaptée

Famille `tactical`, ton `stylized` ; 238 ticks CQC ; phases actuelles : prepare → brace → settle → pose. Appuis déclarés : Durcissement métallique.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Durcissement métallique » ; l’espace disponible doit être lisible. Plan 2 : matérialiser le geste tactique « Durcissement métallique » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : dissipation de l’effet et rétablissement de la garde, arrêt du dispositif et retour au cadre d’ensemble.

##### Saisie blindée — conclusion adaptée

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : prepare → contact → confirm → pose. Appuis déclarés : Saisie blindée.

Plan 1 : approche jusqu’à la distance réelle de « Saisie blindée », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Saisie blindée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : dissipation de l’effet et rétablissement de la garde, prise de distance et maintien final.

##### Projection — conclusion adaptée

Famille `cqc`, ton `stylized` ; 274 ticks CQC ; phases actuelles : prepare → contact → confirm → pose. Appuis déclarés : Projection.

Plan 1 : après une observation ou un repli, SKULLS — ARMOR reprend l’initiative par « Projection ». Plan 2 : contact de saisie ou neutralisation lié à « Projection », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : dissipation de l’effet et rétablissement de la garde, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Selected armored appearance follows original male mechanical outfit plus observed cracked metallic hardening state. Source Armor head close-up and FOB model partly differ due coating/angle; exact material transition/topology is not certified.
- Whole male event enemy boots/legs are physically seen in a distant night FOB capture. Dense lighting and20m range do not certify tread, seams or exported mesh.
- Official update capture is republished secondary publisher material; player guides/captures cannot guarantee an unmodified executable.
- Only held machete is directly visible for this selected outfit in close original event capture; no extra rifle, grenade, laser cannon or thrown crystal projectile is invented.
- All movement/attacks are authored Versus staging; source action timings/powers are bounded adaptation and not original frame animation certificate.
- Legacy atlas action key shoot is a held-machete lunge/cut. It MUST NOT instantiate a bullet, muzzle, thrown weapon, crystal projectile, trap or magic barrier. All melee timing and damage are Versus adaptation.
- C-left preparation/recovery includes head and torso rotation away from the target in three of twelve poses. The actual active cut points screen-left; these source silhouettes are recorded honestly and are not mirrored or relabelled canonical frames.
- Metallic coating and inferred plate/face details are closest_supported illustrations. Selected captures do not certify every original mesh seam or transition state.
- Every original native PNG and generation attempt is immutable and preserved. Alpha>8 layout grouping and optional Canvas contours only modify source geometry metadata; no raster pixels are cropped, resized, mirrored or edited.
- The six sheets are separately generated native sources. Three source phases per action are authored Versus staging, not original MGSV frame timings, extracted motion or damage certification.
- Hit and KO explicitly reuse recover cells and do not inflate the72 unique source-pose count or certify native defeated animations.
- Physical producer review precedes independent root integration review and actual Canvas/browser verification; this delivery does not claim runtime QA, Git publication or deployment.
- Generated original action staging is an illustrated adaptation of supported incarnation, not extracted original-game sprites or canonical timing/collision data.
- Publisher capture supplies primary visible identity features; Steam player modification state not independently authenticated. Hidden topology/rotation details remain inferred.
- [Konami December FOB event original capture republished by MGI, physically viewed: male Skull, original gray segmented chest/round shoulders and collar/head rig, olive belt, gray hip/thigh panels, dark leg gear, long narrow dark machete held anatomical RIGHT. Bottom feet cropped, not sole proof.](https://www.metalgearinformer.com/wp-content/uploads/2015/12/MGSV-FOB-Skulls.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Physically viewed metallic hardening close-up: original Armor-type gray cracked metallic face coating with paired large plates and multiple circular optic/fixture apertures. No open skeletal teeth/alien horns. Player original-game capture, modification state not certified.](https://images.steamusercontent.com/ugc/1646594444810331960/8F4775A2F2B157477087A9C2DA5DF3C361C88EE1/?imw=1024&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Physically viewed kneeling metallic Armor male torso/forearms/shoulders under damage: segmented round shoulder cap and textured hardened surface. Feet not visible.](https://images.steamusercontent.com/ugc/932677690985767035/27AB8FF868BE460614DD03CA63603B3B118A1E9D/?imw=1024&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Physically viewed original FOB Skulls attack: complete standing male event enemy left, head-to-flat-boots and whole legs, plus other original unit figures. Source distant20m/night lighting, limits exact material/mesh topology.](https://images.steamusercontent.com/ugc/14327098797351176346/BC167D60A44C21A2E612D54777757E736C9FAB37/?imw=1024&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__skull_sniper

### SKULLS — SNIPER — TPP / RENFORTS

**Rôle :** Précision et camouflage féminin. **Profil :** `sniper`.

**Base présente dans le code :** Canonical camouflage form is female Skull Sniper, bald, anatomical-right red/orange optic, bare left eye and actual long rifle. Raw masculine visual fallback and completion44 camo preset are not canonical evidence or automatic aliases. C rifle recoil binds conventional precision bullets; no rail/laser/mist grenade or unknown named receiver. Heavy is the producer-observed held-rifle shove/jab, not a certified stock strike. Camouflage is a separately bounded Versus effect, source atlas bodies remain opaque/complete and collision persists. Les contacts, collisions, jauges, coûts, durées et cadences sont des adaptations du versus, pas des valeurs des jeux originaux.

**Incarnation à conserver :** Original adult bald female Sniper E2, asymmetric orange right optic, headset, dark mechanical body/arm gear, olive belt/pouch, gray upper thighs and tall black flat boots, held/slung long rifle.

**État vérifié :** métadonnées natives avec limites. 72 régions source distinctes dans les deux directions ; groupes : idle, walk, guard, crouch, punch, heavy, low, jump, shoot, throw, deploy, recover, hit, ko, attack.

**Réemplois à examiner :** `throw` = throw, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** SKULLS — SNIPER : carabine épaulée avec contact joue/crosse et œil cohérent. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** déplacement qui sécurise le long canon et stoppe avant la visée. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Précision et camouflage féminin » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder carabine épaulée avec contact joue/crosse et œil cohérent.
- **jump_land :** SKULLS — SNIPER : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. déplacement qui sécurise le long canon et stoppe avant la visée. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de SKULLS — SNIPER. Terminer par recul, éventuel réarmement propre au modèle, réacquisition de cible. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « TPP / RENFORTS », présentation de Original adult bald female Sniper E2, asymmetric orange right optic, headset, dark mechanical body/arm gear, olive belt/pouch, gray upper thighs and tall black flat boots, held/slung long rifle., puis carabine épaulée avec contact joue/crosse et œil cohérent. Geste court lié à « Tir parasite » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, recul, éventuel réarmement propre au modèle, réacquisition de cible ; SKULLS — SNIPER vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à TPP / RENFORTS.
- **round_loss :** Proposition CQC : SKULLS — SNIPER réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Visée des Skulls », revenir par recul, éventuel réarmement propre au modèle, réacquisition de cible, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SKULLS — SNIPER, préparer « Jab » ; carabine épaulée avec contact joue/crosse et œil cohérent. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Contact au fusil

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SKULLS — SNIPER, préparer « Contact au fusil » ; carabine épaulée avec contact joue/crosse et œil cohérent. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Contact au fusil », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Adaptation du versus : préparation et sortie visibles, garde/saut/espacement adaptés au geste ; aucune invincibilité ou arme supplémentaire.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SKULLS — SNIPER, préparer « Balayage » ; carabine épaulée avec contact joue/crosse et œil cohérent. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SKULLS — SNIPER, préparer « Projection » ; carabine épaulée avec contact joue/crosse et œil cohérent. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Tir parasite

**Existant :** `projectile` / `precision` ; 46/1/47 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SKULLS — SNIPER, préparer « Tir parasite » ; carabine épaulée avec contact joue/crosse et œil cohérent. Montrer la prise et la visée de l’arme décrite par « Tir parasite » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Laser et armement visibles ; accroupissement ou approche pendant 46 images avant le tir.

##### specialDown — Camouflage parasite — préparation

**Existant :** `buff` / `stealth` ; 7/1/25 ticks ; groupe `deploy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SKULLS — SNIPER, préparer « Camouflage parasite — préparation » ; carabine épaulée avec contact joue/crosse et œil cohérent. Montrer la préparation corporelle ou mécanique de « Camouflage parasite — préparation ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Adaptation du versus : préparation et sortie visibles, garde/saut/espacement adaptés au geste ; aucune invincibilité ou arme supplémentaire.

##### specialForward — Saisie rapprochée

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SKULLS — SNIPER, préparer « Saisie rapprochée » ; carabine épaulée avec contact joue/crosse et œil cohérent. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Adaptation du versus : préparation et sortie visibles, garde/saut/espacement adaptés au geste ; aucune invincibilité ou arme supplémentaire.

##### specialBack — Écart de tireur

**Existant :** `mobility` / `movement` ; 19/12/27 ticks ; groupe `walk`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SKULLS — SNIPER, préparer « Écart de tireur » ; carabine épaulée avec contact joue/crosse et œil cohérent. Préparer l’appui qui produit le déplacement ; déplacement qui sécurise le long canon et stoppe avant la visée.

**Action.** Exécuter « Écart de tireur » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -4 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Adaptation du versus : préparation et sortie visibles, garde/saut/espacement adaptés au geste ; aucune invincibilité ou arme supplémentaire.

##### super — Visée des Skulls

**Existant :** `projectile` / `precision` ; 55/1/50 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SKULLS — SNIPER, préparer « Visée des Skulls » ; carabine épaulée avec contact joue/crosse et œil cohérent. Montrer la prise et la visée de l’arme décrite par « Visée des Skulls » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Adaptation du versus : préparation et sortie visibles, garde/saut/espacement adaptés au geste ; aucune invincibilité ou arme supplémentaire.

##### utility — Reprendre position

**Existant :** `recover` / `recovery` ; 54/1/20 ticks ; groupe `recover`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SKULLS — SNIPER, préparer « Reprendre position » ; carabine épaulée avec contact joue/crosse et œil cohérent. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Reprendre position ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** recul, éventuel réarmement propre au modèle, réacquisition de cible. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Adaptation du versus : préparation et sortie visibles, garde/saut/espacement adaptés au geste ; aucune invincibilité ou arme supplémentaire.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Tir parasite — conclusion adaptée

Famille `sniper`, ton `stylized` ; 220 ticks CQC ; phases actuelles : prepare → release → confirm → pose. Appuis déclarés : Tir parasite.

Plan 1 : SKULLS — SNIPER sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Tir parasite ». Plan 2 : présenter l’arme effectivement associée à « Tir parasite », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : recul, éventuel réarmement propre au modèle, réacquisition de cible, pose de signature face à l’adversaire.

##### Camouflage parasite — préparation — conclusion adaptée

Famille `tactical`, ton `stylized` ; 238 ticks CQC ; phases actuelles : prepare → brace → settle → pose. Appuis déclarés : Camouflage parasite — préparation.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Camouflage parasite — préparation » ; l’espace disponible doit être lisible. Plan 2 : matérialiser le geste tactique « Camouflage parasite — préparation » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : recul, éventuel réarmement propre au modèle, réacquisition de cible, arrêt du dispositif et retour au cadre d’ensemble.

##### Saisie rapprochée — conclusion adaptée

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : prepare → contact → confirm → pose. Appuis déclarés : Saisie rapprochée.

Plan 1 : approche jusqu’à la distance réelle de « Saisie rapprochée », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Saisie rapprochée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : recul, éventuel réarmement propre au modèle, réacquisition de cible, prise de distance et maintien final.

##### Projection — conclusion adaptée

Famille `cqc`, ton `stylized` ; 274 ticks CQC ; phases actuelles : prepare → contact → confirm → pose. Appuis déclarés : Projection.

Plan 1 : après une observation ou un repli, SKULLS — SNIPER reprend l’initiative par « Projection ». Plan 2 : contact de saisie ou neutralisation lié à « Projection », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : recul, éventuel réarmement propre au modèle, réacquisition de cible, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Original trailer proves female identity and asymmetric head hardware; Steam cutscene captures corroborate torso, back, hips and boots, not direct exported model inspection.
- The frontal rifle is strongly foreshortened. Long barrel/front sight/muzzle and held rifle role are observed; exact weapon name, receiver topology and hidden stock detail remain qualified.
- Poses are original illustrated Versus action staging rather than extracted MGSV animation or canonical timings.
- No male Camo preset, Quiet hairstyle/outfit, interchangeable parasite powers, vanishing missing-body frames or magic aura.
- Source geometric alpha grouping accounts for every alpha>8 pixel. Tiny antialias islands<=3px assigned to nearest actual body; source PNG bytes immutable.
- Canvas contour masks are metadata only, not image pixel edits. Root independently reviews actual runtime crops, phase/hitbox origins and anatomy.
- Generated rifle side details vary modestly across independently authored sheets. Original long rifle role, barrel/front sight and complete gear are supported, exact weapon mesh/receiver/hidden stock1:1 is not certified.
- No baked particles/muzzle flashes, drone, grenade, psychic attack, separate projectile of fog, literal invisibility gaps or unrelated parasite ability.
- Three manually staged phases/action are not MGSV frame timings. Hit/KO aliases cannot inflate unique count or certify native defeated animations.
- Steam player captures corroborate original trailer features but modification state is not independently authenticated. Hidden surfaces, small rifle components and authored combat phases are not absolute1:1-certified.
- [Original E3 trailer close-up supports bald female E2 face, black lips, anatomical RIGHT red/orange optical device, bare LEFT eye, ear headset and hard neck collar.](https://www.metalgearinformer.com/wp-content/uploads/2015/06/Metal-Gear-Solid-V-The-Phantom-Pain-E3-2015-Screen-E2.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Physically viewed whole backs, legs and flat-soled high boots of original female Skull group. Circular shoulder caps, segmented arms, backpack circular fittings and hoses, olive belt and left hip pouch; gray skin at waist/thighs. Player upload matches original E3 head, modification state not independently certified.](https://images.steamusercontent.com/ugc/1753568821996782637/461C08FEB6488BD57913F5B5C0D29683882C7067/?imw=1024&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Physically viewed front aiming pose: dark high-neck chest gear, segmented forearms and gloves, circular shoulder devices, olive utility belt and exceptionally long rifle barrel with tall front sight and circular muzzle. Rifle foreshortened; exact receiver topology/name cannot be certified.](https://images.steamusercontent.com/ugc/1912360152045516941/562F5BC5960EC47EF83D472C39181B61B71A4F2E/?imw=1024&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__snake_acid

### SNAKE — AC!D — METAL GEAR AC!D / ADAPTATION VERSUS

**Rôle :** Cartes équipées et coût temporel. **Profil :** `cardgun`.

**Base présente dans le code :** Incarnation Ac!d : actions équipées via cartes et COST, pas CQC gratuit de MGSV.

**Incarnation à conserver :** Original game incarnation, reference-based hand-painted native combat keyframes

**État vérifié :** métadonnées natives avec limites. 32 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, attack, punch, low, throw, deploy, shoot, reload, hit, ko, roll, jump, optic, recover, parry.

**Réemplois à examiner :** `deploy` = specialDown, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialForward, super, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `retro-msx`, `tuxedo`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** SNAKE — AC!D : préparation du support AC!D et de l’arme propre au profil. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** déplacement lisible entre la décision de carte et son exécution. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Cartes équipées et coût temporel » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder préparation du support AC!D et de l’arme propre au profil.
- **jump_land :** SNAKE — AC!D : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. déplacement lisible entre la décision de carte et son exécution. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de SNAKE — AC!D. Terminer par refermer la séquence de carte puis revenir à la garde. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « METAL GEAR AC!D / ADAPTATION VERSUS », présentation de Original game incarnation, reference-based hand-painted native combat keyframes, puis préparation du support AC!D et de l’arme propre au profil. Geste court lié à « Carte SOCOM » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, refermer la séquence de carte puis revenir à la garde ; SNAKE — AC!D vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à METAL GEAR AC!D / ADAPTATION VERSUS.
- **round_loss :** Proposition CQC : SNAKE — AC!D réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Main de Snake », revenir par refermer la séquence de carte puis revenir à la garde, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SNAKE — AC!D, préparer « Jab » ; préparation du support AC!D et de l’arme propre au profil. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** refermer la séquence de carte puis revenir à la garde.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `attack`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SNAKE — AC!D, préparer « Frappe engagée » ; préparation du support AC!D et de l’arme propre au profil. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** refermer la séquence de carte puis revenir à la garde.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SNAKE — AC!D, préparer « Balayage » ; préparation du support AC!D et de l’arme propre au profil. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** refermer la séquence de carte puis revenir à la garde.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SNAKE — AC!D, préparer « Projection » ; préparation du support AC!D et de l’arme propre au profil. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** refermer la séquence de carte puis revenir à la garde. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Carte SOCOM

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SNAKE — AC!D, préparer « Carte SOCOM » ; préparation du support AC!D et de l’arme propre au profil. Montrer la prise et la visée de l’arme décrite par « Carte SOCOM » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** refermer la séquence de carte puis revenir à la garde. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Carte grenade

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SNAKE — AC!D, préparer « Carte grenade » ; préparation du support AC!D et de l’arme propre au profil. Prélever l’objet correspondant à « Carte grenade », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** refermer la séquence de carte puis revenir à la garde. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Carte repérage

**Existant :** `mark` / `recon` ; 26/1/30 ticks ; groupe `optic`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SNAKE — AC!D, préparer « Carte repérage » ; préparation du support AC!D et de l’arme propre au profil. Orienter regard, optique ou terminal vers la cible observée, sans consulter une action future.

**Action.** Pour « Carte repérage », déclencher lecture/repérage avec un petit geste ou changement d’optique et un indicateur séparé. Le corps doit rester visible et vulnérable selon les données de combat.

**Retour.** refermer la séquence de carte puis revenir à la garde. Couper le signal ou abaisser l’outil ; retour vers l’adversaire sans nouvelle arme inventée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Portée limitée ; le marquage ne vise ni à travers toute l’arène ni automatiquement.

##### specialBack — Carte déplacement

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `walk`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SNAKE — AC!D, préparer « Carte déplacement » ; préparation du support AC!D et de l’arme propre au profil. Préparer l’appui qui produit le déplacement ; déplacement lisible entre la décision de carte et son exécution.

**Action.** Exécuter « Carte déplacement » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** refermer la séquence de carte puis revenir à la garde. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Main de Snake

**Existant :** `projectile` / `card` ; 35/1/44 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SNAKE — AC!D, préparer « Main de Snake » ; préparation du support AC!D et de l’arme propre au profil. Donner à la source de « Main de Snake » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet card de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet. La salve contient 4 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** refermer la séquence de carte puis revenir à la garde. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 4 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Réduire le COST

**Existant :** `recover` / `recovery` ; 45/1/25 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SNAKE — AC!D, préparer « Réduire le COST » ; préparation du support AC!D et de l’arme propre au profil. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Réduire le COST ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** refermer la séquence de carte puis revenir à la garde. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Refroidissement ou pause tactique interrompable ; aucun soin gratuit.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Card Combo

Famille `card`, ton `stylized` ; 220 ticks CQC ; phases actuelles : deal → chain → costlock → discard. Appuis déclarés : Main de Snake / Carte SOCOM.

Plan 1 : SNAKE — AC!D sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Main de Snake / Carte SOCOM ». Plan 2 : rendre lisible la décision de carte associée à « Main de Snake / Carte SOCOM ». Plan 3 : réaliser l’effet par le vrai corps/outil du profil ; les cartes servent à la présentation AC!D, pas à inventer un équipement canonique. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : refermer la séquence de carte puis revenir à la garde, pose de signature face à l’adversaire.

##### COST Zero

Famille `ballistic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Main de Snake / Carte grenade.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Main de Snake / Carte grenade » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Main de Snake / Carte grenade », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : refermer la séquence de carte puis revenir à la garde, arrêt du dispositif et retour au cadre d’ensemble.

##### Lobito Infiltration

Famille `card`, ton `stylized` ; 256 ticks CQC ; phases actuelles : deal → chain → costlock → discard. Appuis déclarés : Main de Snake / Carte repérage.

Plan 1 : approche jusqu’à la distance réelle de « Main de Snake / Carte repérage », arme et main libre identifiées. Plan 2 : rendre lisible la décision de carte associée à « Main de Snake / Carte repérage ». Plan 3 : réaliser l’effet par le vrai corps/outil du profil ; les cartes servent à la présentation AC!D, pas à inventer un équipement canonique. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : refermer la séquence de carte puis revenir à la garde, prise de distance et maintien final.

##### Ac!d Extraction

Famille `card`, ton `stylized` ; 274 ticks CQC ; phases actuelles : deal → chain → costlock → discard. Appuis déclarés : Main de Snake / Projection.

Plan 1 : après une observation ou un repli, SNAKE — AC!D reprend l’initiative par « Main de Snake / Projection ». Plan 2 : rendre lisible la décision de carte associée à « Main de Snake / Projection ». Plan 3 : réaliser l’effet par le vrai corps/outil du profil ; les cartes servent à la présentation AC!D, pas à inventer un équipement canonique. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : refermer la séquence de carte puis revenir à la garde, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact, not a certified pixel-perfect 1:1 copy. Canonical identity/costume checked against supplied original or official references.
- Sixteen visually reviewed physical keyframes per direction, thirty-two distinct poses per identity. Action groups share keyframes explicitly; no full motion-capture cycle claim.
- Thirteen required action groups plus optional groups reuse actual poses. Standing source-height scale preserves shorter crouch/KO poses; timing and interpolation are duel adaptations.
- Each direction independently authored; no raster mirroring. Tiny facial, insignia and weapon detail remains approximate at combat scale.
- Source crops follow observed alpha components; wider KO or weapon rectangles may cross the advertised invisible grid. Canvas clip polygons exclude nearby figures where necessary, native PNG bytes unchanged.
- No engine, collision, HP, lore, readiness or gameplay mutation; actual gameplay QA remains Root integration work.
- SOCOM shooting/reload keyframes corrected from rejected rifle V1 to correspond to the existing SOCOM card move; broader card effects remain Core presentation.
- Some shooting cells include authored muzzle flash. The actual firing cell is restricted to active attack phase; startup/recovery explicitly reuse the authored recovery or weapon-manipulation pose without flash. Snake AC!D LEFT recovery has empty hands. Flash differences between independently authored directions remain qualified.
- [Original Konami full-body art and character information, actually downloaded and viewed.](https://www.konami.com/mg/archive/mga/english/characters_snake.html) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original published game guide SOCOM card, silenced black pistol used as exact equipment reference for corrected shooting and reload cells; actual page downloaded and viewed.](https://archive.org/download/mgabg/metalgearacdoffi0000lumm_1_jp2.zip/metalgearacdoffi0000lumm_1_jp2/metalgearacdoffi0000lumm_1_0032.jp2) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__teliko

### TELIKO FRIEDMAN — METAL GEAR AC!D / ADAPTATION VERSUS

**Rôle :** Cartes équipées et coût temporel. **Profil :** `cardblade`.

**Base présente dans le code :** Teliko reste une combattante à cartes ; la lame est une carte équipée, pas une qualité surnaturelle.

**Incarnation à conserver :** Original game incarnation, reference-based hand-painted native combat keyframes

**État vérifié :** métadonnées natives avec limites. 32 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, attack, punch, low, throw, deploy, shoot, reload, hit, ko, roll, jump, optic, recover, parry, blade.

**Réemplois à examiner :** `deploy` = specialDown, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, super, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `tuxedo`, `retro-msx`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** TELIKO FRIEDMAN : carte/choix tactique distinct du maniement de lame. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas mesurés et prise de distance avant coupe. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Cartes équipées et coût temporel » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder carte/choix tactique distinct du maniement de lame.
- **jump_land :** TELIKO FRIEDMAN : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas mesurés et prise de distance avant coupe. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de TELIKO FRIEDMAN. Terminer par arrêt de lame puis remise en posture tactique. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « METAL GEAR AC!D / ADAPTATION VERSUS », présentation de Original game incarnation, reference-based hand-painted native combat keyframes, puis carte/choix tactique distinct du maniement de lame. Geste court lié à « Carte de contact » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, arrêt de lame puis remise en posture tactique ; TELIKO FRIEDMAN vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à METAL GEAR AC!D / ADAPTATION VERSUS.
- **round_loss :** Proposition CQC : TELIKO FRIEDMAN réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Main de Teliko », revenir par arrêt de lame puis remise en posture tactique, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de TELIKO FRIEDMAN, préparer « Jab » ; carte/choix tactique distinct du maniement de lame. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** arrêt de lame puis remise en posture tactique.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `attack`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de TELIKO FRIEDMAN, préparer « Frappe engagée » ; carte/choix tactique distinct du maniement de lame. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** arrêt de lame puis remise en posture tactique.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de TELIKO FRIEDMAN, préparer « Balayage » ; carte/choix tactique distinct du maniement de lame. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** arrêt de lame puis remise en posture tactique.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de TELIKO FRIEDMAN, préparer « Projection » ; carte/choix tactique distinct du maniement de lame. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** arrêt de lame puis remise en posture tactique. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Carte de contact

**Existant :** `projectile` / `ballistic` ; 22/1/36 ticks ; groupe `shoot`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de TELIKO FRIEDMAN, préparer « Carte de contact » ; carte/choix tactique distinct du maniement de lame. Montrer la prise et la visée de l’arme décrite par « Carte de contact » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 3 émissions, espacées de 5 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** arrêt de lame puis remise en posture tactique. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 3 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### specialDown — Carte grenade

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de TELIKO FRIEDMAN, préparer « Carte grenade » ; carte/choix tactique distinct du maniement de lame. Prélever l’objet correspondant à « Carte grenade », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** arrêt de lame puis remise en posture tactique. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Carte assaut

**Existant :** `melee` / `blade` ; 21/4/33 ticks ; groupe `blade`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de TELIKO FRIEDMAN, préparer « Carte assaut » ; carte/choix tactique distinct du maniement de lame. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** arrêt de lame puis remise en posture tactique. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer ou espacer ; la remontée est punissable en garde.

##### specialBack — Carte mouvement

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `walk`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de TELIKO FRIEDMAN, préparer « Carte mouvement » ; carte/choix tactique distinct du maniement de lame. Préparer l’appui qui produit le déplacement ; pas mesurés et prise de distance avant coupe.

**Action.** Exécuter « Carte mouvement » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** arrêt de lame puis remise en posture tactique. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Main de Teliko

**Existant :** `projectile` / `card` ; 35/1/44 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de TELIKO FRIEDMAN, préparer « Main de Teliko » ; carte/choix tactique distinct du maniement de lame. Donner à la source de « Main de Teliko » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet card de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet. La salve contient 4 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** arrêt de lame puis remise en posture tactique. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 4 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Réduire le COST

**Existant :** `recover` / `recovery` ; 45/1/25 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de TELIKO FRIEDMAN, préparer « Réduire le COST » ; carte/choix tactique distinct du maniement de lame. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Réduire le COST ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** arrêt de lame puis remise en posture tactique. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Refroidissement ou pause tactique interrompable ; aucun soin gratuit.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Beagle Shot

Famille `card`, ton `stylized` ; 220 ticks CQC ; phases actuelles : deal → chain → costlock → discard. Appuis déclarés : Main de Teliko / Carte de contact.

Plan 1 : TELIKO FRIEDMAN sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Main de Teliko / Carte de contact ». Plan 2 : rendre lisible la décision de carte associée à « Main de Teliko / Carte de contact ». Plan 3 : réaliser l’effet par le vrai corps/outil du profil ; les cartes servent à la présentation AC!D, pas à inventer un équipement canonique. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : arrêt de lame puis remise en posture tactique, pose de signature face à l’adversaire.

##### Teliko Entry

Famille `ballistic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Main de Teliko / Carte grenade.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Main de Teliko / Carte grenade » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Main de Teliko / Carte grenade », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : arrêt de lame puis remise en posture tactique, arrêt du dispositif et retour au cadre d’ensemble.

##### Lobito Crossfire

Famille `card`, ton `stylized` ; 256 ticks CQC ; phases actuelles : deal → chain → costlock → discard. Appuis déclarés : Main de Teliko / Carte assaut.

Plan 1 : approche jusqu’à la distance réelle de « Main de Teliko / Carte assaut », arme et main libre identifiées. Plan 2 : rendre lisible la décision de carte associée à « Main de Teliko / Carte assaut ». Plan 3 : réaliser l’effet par le vrai corps/outil du profil ; les cartes servent à la présentation AC!D, pas à inventer un équipement canonique. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : arrêt de lame puis remise en posture tactique, prise de distance et maintien final.

##### Mission Complete

Famille `card`, ton `stylized` ; 274 ticks CQC ; phases actuelles : deal → chain → costlock → discard. Appuis déclarés : Main de Teliko / Projection.

Plan 1 : après une observation ou un repli, TELIKO FRIEDMAN reprend l’initiative par « Main de Teliko / Projection ». Plan 2 : rendre lisible la décision de carte associée à « Main de Teliko / Projection ». Plan 3 : réaliser l’effet par le vrai corps/outil du profil ; les cartes servent à la présentation AC!D, pas à inventer un équipement canonique. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : arrêt de lame puis remise en posture tactique, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact, not a certified pixel-perfect 1:1 copy. Canonical identity/costume checked against supplied original or official references.
- Sixteen visually reviewed physical keyframes per direction, thirty-two distinct poses per identity. Action groups share keyframes explicitly; no full motion-capture cycle claim.
- Thirteen required action groups plus optional groups reuse actual poses. Standing source-height scale preserves shorter crouch/KO poses; timing and interpolation are duel adaptations.
- Each direction independently authored; no raster mirroring. Tiny facial, insignia and weapon detail remains approximate at combat scale.
- Source crops follow observed alpha components; wider KO or weapon rectangles may cross the advertised invisible grid. Canvas clip polygons exclude nearby figures where necessary, native PNG bytes unchanged.
- No engine, collision, HP, lore, readiness or gameplay mutation; actual gameplay QA remains Root integration work.
- Cell 16 is an authored blade-contact pose for the existing specialForward move; jumping uses the standing keyframe at the engine airborne position. This is explicit pose reuse, not a missing pose silently relabeled.
- Some shooting cells include authored muzzle flash. The actual firing cell is restricted to active attack phase; startup/recovery explicitly reuse the authored recovery or weapon-manipulation pose without flash. Snake AC!D LEFT recovery has empty hands. Flash differences between independently authored directions remain qualified.
- [Original Konami full-body art and character information, actually downloaded and viewed.](https://www.konami.com/mg/archive/mga/english/characters_teliko.html) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__leone

### LEONE — METAL GEAR AC!D / ADAPTATION VERSUS

**Rôle :** Cartes équipées et coût temporel. **Profil :** `cardshield`.

**Base présente dans le code :** Adaptation à cartes d’un adversaire lourd ; son bouclier temporaire est une règle du projet.

**Incarnation à conserver :** Original game incarnation, reference-based hand-painted native combat keyframes

**État vérifié :** métadonnées natives avec limites. 32 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, attack, punch, low, throw, deploy, shoot, reload, hit, ko, roll, jump, optic, recover, parry.

**Réemplois à examiner :** `deploy` = specialDown, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialForward, specialBack, super, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `tuxedo`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** LEONE : protection et information de carte lisibles séparément. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** appui robuste, défense orientée vers l’attaque. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Cartes équipées et coût temporel » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder protection et information de carte lisibles séparément.
- **jump_land :** LEONE : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. appui robuste, défense orientée vers l’attaque. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de LEONE. Terminer par désengagement de la protection et fin de l’effet de carte. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « METAL GEAR AC!D / ADAPTATION VERSUS », présentation de Original game incarnation, reference-based hand-painted native combat keyframes, puis protection et information de carte lisibles séparément. Geste court lié à « Carte d’assaut Leone » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, désengagement de la protection et fin de l’effet de carte ; LEONE vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à METAL GEAR AC!D / ADAPTATION VERSUS.
- **round_loss :** Proposition CQC : LEONE réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Ordre de Leone », revenir par désengagement de la protection et fin de l’effet de carte, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LEONE, préparer « Jab » ; protection et information de carte lisibles séparément. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** désengagement de la protection et fin de l’effet de carte.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `attack`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LEONE, préparer « Frappe engagée » ; protection et information de carte lisibles séparément. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** désengagement de la protection et fin de l’effet de carte.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LEONE, préparer « Balayage » ; protection et information de carte lisibles séparément. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** désengagement de la protection et fin de l’effet de carte.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LEONE, préparer « Projection » ; protection et information de carte lisibles séparément. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** désengagement de la protection et fin de l’effet de carte. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Carte d’assaut Leone

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LEONE, préparer « Carte d’assaut Leone » ; protection et information de carte lisibles séparément. Montrer la prise et la visée de l’arme décrite par « Carte d’assaut Leone » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** désengagement de la protection et fin de l’effet de carte. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Carte explosive

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LEONE, préparer « Carte explosive » ; protection et information de carte lisibles séparément. Prélever l’objet correspondant à « Carte explosive », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** désengagement de la protection et fin de l’effet de carte. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Carte repérage

**Existant :** `mark` / `recon` ; 26/1/30 ticks ; groupe `optic`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LEONE, préparer « Carte repérage » ; protection et information de carte lisibles séparément. Orienter regard, optique ou terminal vers la cible observée, sans consulter une action future.

**Action.** Pour « Carte repérage », déclencher lecture/repérage avec un petit geste ou changement d’optique et un indicateur séparé. Le corps doit rester visible et vulnérable selon les données de combat.

**Retour.** désengagement de la protection et fin de l’effet de carte. Couper le signal ou abaisser l’outil ; retour vers l’adversaire sans nouvelle arme inventée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Portée limitée ; le marquage ne vise ni à travers toute l’arène ni automatiquement.

##### specialBack — Bouclier tactique

**Existant :** `buff` / `shield` ; 18/1/27 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LEONE, préparer « Bouclier tactique » ; protection et information de carte lisibles séparément. Montrer la préparation corporelle ou mécanique de « Bouclier tactique ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** désengagement de la protection et fin de l’effet de carte. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Deux projectiles frontaux maximum ; le corps à corps et les saisies restent efficaces.

##### super — Ordre de Leone

**Existant :** `projectile` / `card` ; 35/1/44 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LEONE, préparer « Ordre de Leone » ; protection et information de carte lisibles séparément. Donner à la source de « Ordre de Leone » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet card de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet. La salve contient 4 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** désengagement de la protection et fin de l’effet de carte. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 4 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Réduire le COST

**Existant :** `recover` / `recovery` ; 45/1/25 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LEONE, préparer « Réduire le COST » ; protection et information de carte lisibles séparément. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Réduire le COST ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** désengagement de la protection et fin de l’effet de carte. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Refroidissement ou pause tactique interrompable ; aucun soin gratuit.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Ordre de Leone — Final

Famille `card`, ton `stylized` ; 220 ticks CQC ; phases actuelles : deal → chain → costlock → discard. Appuis déclarés : Ordre de Leone / Carte d’assaut Leone.

Plan 1 : LEONE sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Ordre de Leone / Carte d’assaut Leone ». Plan 2 : rendre lisible la décision de carte associée à « Ordre de Leone / Carte d’assaut Leone ». Plan 3 : réaliser l’effet par le vrai corps/outil du profil ; les cartes servent à la présentation AC!D, pas à inventer un équipement canonique. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : désengagement de la protection et fin de l’effet de carte, pose de signature face à l’adversaire.

##### Carte d’assaut Leone / Carte explosive

Famille `ballistic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Ordre de Leone / Carte explosive.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Ordre de Leone / Carte explosive » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Ordre de Leone / Carte explosive », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : désengagement de la protection et fin de l’effet de carte, arrêt du dispositif et retour au cadre d’ensemble.

##### Carte repérage — Point final

Famille `card`, ton `stylized` ; 256 ticks CQC ; phases actuelles : deal → chain → costlock → discard. Appuis déclarés : Ordre de Leone / Carte repérage.

Plan 1 : approche jusqu’à la distance réelle de « Ordre de Leone / Carte repérage », arme et main libre identifiées. Plan 2 : rendre lisible la décision de carte associée à « Ordre de Leone / Carte repérage ». Plan 3 : réaliser l’effet par le vrai corps/outil du profil ; les cartes servent à la présentation AC!D, pas à inventer un équipement canonique. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : désengagement de la protection et fin de l’effet de carte, prise de distance et maintien final.

##### Tempo des cartes — Mission close

Famille `card`, ton `stylized` ; 274 ticks CQC ; phases actuelles : deal → chain → costlock → discard. Appuis déclarés : Ordre de Leone / Projection.

Plan 1 : après une observation ou un repli, LEONE reprend l’initiative par « Ordre de Leone / Projection ». Plan 2 : rendre lisible la décision de carte associée à « Ordre de Leone / Projection ». Plan 3 : réaliser l’effet par le vrai corps/outil du profil ; les cartes servent à la présentation AC!D, pas à inventer un équipement canonique. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : désengagement de la protection et fin de l’effet de carte, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact, not a certified pixel-perfect 1:1 copy. Canonical identity/costume checked against supplied original or official references.
- Sixteen visually reviewed physical keyframes per direction, thirty-two distinct poses per identity. Action groups share keyframes explicitly; no full motion-capture cycle claim.
- Thirteen required action groups plus optional groups reuse actual poses. Standing source-height scale preserves shorter crouch/KO poses; timing and interpolation are duel adaptations.
- Each direction independently authored; no raster mirroring. Tiny facial, insignia and weapon detail remains approximate at combat scale.
- Source crops follow observed alpha components; wider KO or weapon rectangles may cross the advertised invisible grid. Canvas clip polygons exclude nearby figures where necessary, native PNG bytes unchanged.
- No engine, collision, HP, lore, readiness or gameplay mutation; actual gameplay QA remains Root integration work.
- Some shooting cells include authored muzzle flash. The actual firing cell is restricted to active attack phase; startup/recovery explicitly reuse the authored recovery or weapon-manipulation pose without flash. Snake AC!D LEFT recovery has empty hands. Flash differences between independently authored directions remain qualified.
- [Original Konami full-body art and character information, actually downloaded and viewed.](https://www.konami.com/mg/archive/mga/english/characters_leone.html) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__clown

### CLOWN — METAL GEAR AC!D / ADAPTATION VERSUS

**Rôle :** Imitation et leurres, sans télékinésie. **Profil :** `decoy`.

**Base présente dans le code :** Imitation et leurres, pas de magie télékinétique confirmée ; arsenal personnel proposé.

**Incarnation à conserver :** Clown in canonical Teliko disguise, B5F Seeing Double boss battle; undisguised form not authenticated

**État vérifié :** métadonnées natives avec limites. 32 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, attack, punch, low, throw, deploy, shoot, reload, hit, ko, roll, jump, optic, recover, parry.

**Réemplois à examiner :** `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialForward, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** CLOWN : apparence réelle et dispositif de leurre séparés. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** mouvement du corps visible avant/après le leurre. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Imitation et leurres, sans télékinésie » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder apparence réelle et dispositif de leurre séparés.
- **jump_land :** CLOWN : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. mouvement du corps visible avant/après le leurre. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de CLOWN. Terminer par désactivation du leurre sans changer l’incarnation du corps. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « METAL GEAR AC!D / ADAPTATION VERSUS », présentation de Clown in canonical Teliko disguise, B5F Seeing Double boss battle; undisguised form not authenticated, puis apparence réelle et dispositif de leurre séparés. Geste court lié à « Carte dissimulée » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, désactivation du leurre sans changer l’incarnation du corps ; CLOWN vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à METAL GEAR AC!D / ADAPTATION VERSUS.
- **round_loss :** Proposition CQC : CLOWN réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Main trompeuse », revenir par désactivation du leurre sans changer l’incarnation du corps, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CLOWN, préparer « Jab » ; apparence réelle et dispositif de leurre séparés. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** désactivation du leurre sans changer l’incarnation du corps.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `attack`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CLOWN, préparer « Frappe engagée » ; apparence réelle et dispositif de leurre séparés. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** désactivation du leurre sans changer l’incarnation du corps.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CLOWN, préparer « Balayage » ; apparence réelle et dispositif de leurre séparés. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** désactivation du leurre sans changer l’incarnation du corps.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CLOWN, préparer « Projection » ; apparence réelle et dispositif de leurre séparés. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** désactivation du leurre sans changer l’incarnation du corps. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Carte dissimulée

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CLOWN, préparer « Carte dissimulée » ; apparence réelle et dispositif de leurre séparés. Montrer la prise et la visée de l’arme décrite par « Carte dissimulée » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** désactivation du leurre sans changer l’incarnation du corps. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Leurre Clown

**Existant :** `trap` / `decoy` ; 34/1/34 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CLOWN, préparer « Leurre Clown » ; apparence réelle et dispositif de leurre séparés. Prendre le dispositif, s’abaisser vers le support et indiquer le lieu de pose avant activation.

**Action.** Poser « Leurre Clown » au point réel de main/outil, armer puis retirer le membre. Le dispositif possède ensuite son propre sprite, ses états attente/armement/déclenchement/destruction et sa collision.

**Retour.** désactivation du leurre sans changer l’incarnation du corps. Se dégager de l’objet sans le téléporter ; l’interruption avant armement a sa propre sortie.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Marionnette ou drone visible et destructible ; deux maximum.

##### specialForward — Lecture de l’adversaire

**Existant :** `mark` / `recon` ; 26/1/30 ticks ; groupe `optic`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CLOWN, préparer « Lecture de l’adversaire » ; apparence réelle et dispositif de leurre séparés. Orienter regard, optique ou terminal vers la cible observée, sans consulter une action future.

**Action.** Pour « Lecture de l’adversaire », déclencher lecture/repérage avec un petit geste ou changement d’optique et un indicateur séparé. Le corps doit rester visible et vulnérable selon les données de combat.

**Retour.** désactivation du leurre sans changer l’incarnation du corps. Couper le signal ou abaisser l’outil ; retour vers l’adversaire sans nouvelle arme inventée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Portée limitée ; le marquage ne vise ni à travers toute l’arène ni automatiquement.

##### specialBack — Changer de masque

**Existant :** `buff` / `stealth` ; 19/1/27 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CLOWN, préparer « Changer de masque » ; apparence réelle et dispositif de leurre séparés. Montrer la préparation corporelle ou mécanique de « Changer de masque ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** désactivation du leurre sans changer l’incarnation du corps. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Silhouette translucide, collision intacte ; une attaque ou un impact brise le camouflage.

##### super — Main trompeuse

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CLOWN, préparer « Main trompeuse » ; apparence réelle et dispositif de leurre séparés. Montrer la prise et la visée de l’arme décrite par « Main trompeuse » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 4 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** désactivation du leurre sans changer l’incarnation du corps. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 4 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Réduire le COST

**Existant :** `recover` / `recovery` ; 45/1/25 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CLOWN, préparer « Réduire le COST » ; apparence réelle et dispositif de leurre séparés. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Réduire le COST ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** désactivation du leurre sans changer l’incarnation du corps. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Refroidissement ou pause tactique interrompable ; aucun soin gratuit.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Main trompeuse — Final

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Main trompeuse / Carte dissimulée.

Plan 1 : CLOWN sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Main trompeuse / Carte dissimulée ». Plan 2 : présenter l’arme effectivement associée à « Main trompeuse / Carte dissimulée », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : désactivation du leurre sans changer l’incarnation du corps, pose de signature face à l’adversaire.

##### Carte dissimulée / Leurre Clown

Famille `ballistic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Main trompeuse / Leurre Clown.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Main trompeuse / Leurre Clown » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Main trompeuse / Leurre Clown », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : désactivation du leurre sans changer l’incarnation du corps, arrêt du dispositif et retour au cadre d’ensemble.

##### Lecture de l’adversaire — Point final

Famille `psychic`, ton `stylized` ; 256 ticks CQC ; phases actuelles : lift → orbit → crush → drop. Appuis déclarés : Main trompeuse / Lecture de l’adversaire.

Plan 1 : approche jusqu’à la distance réelle de « Main trompeuse / Lecture de l’adversaire », arme et main libre identifiées. Plan 2 : montrer la source corporelle ou matérielle de « Main trompeuse / Lecture de l’adversaire ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : désactivation du leurre sans changer l’incarnation du corps, prise de distance et maintien final.

##### Tempo des cartes — Mission close

Famille `psychic`, ton `stylized` ; 274 ticks CQC ; phases actuelles : lift → orbit → crush → drop. Appuis déclarés : Main trompeuse / Projection.

Plan 1 : après une observation ou un repli, CLOWN reprend l’initiative par « Main trompeuse / Projection ». Plan 2 : montrer la source corporelle ou matérielle de « Main trompeuse / Projection ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : désactivation du leurre sans changer l’incarnation du corps, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact, not a certified pixel-perfect 1:1 copy. Canonical identity/costume checked against supplied original or official references.
- Sixteen visually reviewed physical keyframes per direction, thirty-two distinct poses per identity. Action groups share keyframes explicitly; no full motion-capture cycle claim.
- Thirteen required action groups plus optional groups reuse actual poses. Standing source-height scale preserves shorter crouch/KO poses; timing and interpolation are duel adaptations.
- Each direction independently authored; no raster mirroring. Tiny facial, insignia and weapon detail remains approximate at combat scale.
- Source crops follow observed alpha components; wider KO or weapon rectangles may cross the advertised invisible grid. Canvas clip polygons exclude nearby figures where necessary, native PNG bytes unchanged.
- No engine, collision, HP, lore, readiness or gameplay mutation; actual gameplay QA remains Root integration work.
- Clown is the female Teliko-disguise incarnation shown by the official PSP guide. Newly generated atlas, not a byte alias of Teliko. Undisguised true form remains unverified and is not claimed complete.
- Some shooting cells include authored muzzle flash. The actual firing cell is restricted to active attack phase; startup/recovery explicitly reuse the authored recovery or weapon-manipulation pose without flash. Snake AC!D LEFT recovery has empty hands. Flash differences between independently authored directions remain qualified.
- [Original Konami full-body art and character information, actually downloaded and viewed.](https://www.konami.com/mg/archive/mga/english/characters_teliko.html) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original PSP boss capture and official guide explain visually indistinguishable Teliko disguise, female boss; actual guide page viewed.](https://archive.org/download/mgabg/metalgearacdoffi0000lumm_1_jp2.zip/metalgearacdoffi0000lumm_1_jp2/metalgearacdoffi0000lumm_1_0124.jp2) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).
