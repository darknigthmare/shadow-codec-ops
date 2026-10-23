# Animations — CORE

**10 acteurs du registre courant.** Les titres d’actions et paramètres sont observés ; les descriptions sont des propositions CQC à produire et valider. Un groupe de frames existant ne certifie pas l’ensemble du mouvement ou sa fidélité originale.

[Index des fiches](README.md) · [Contrat commun](../04_ANIMATIONS_SPRITES.md)

## Sommaire

- [THE FEAR](#core__fear) — MGS3 / COBRA UNIT
- [THE END](#core__end) — MGS3 / COBRA UNIT
- [THE FURY](#core__fury) — MGS3 / COBRA UNIT
- [RAIDEN — MGS2](#core__raiden_mgs2) — SONS OF LIBERTY / SNEAKING SUIT
- [SOLIDUS SNAKE](#core__solidus) — MGS2 / SONS OF LIBERTY
- [VAMP](#core__vamp) — MGS2 / DEAD CELL
- [FORTUNE](#core__fortune) — MGS2 / DEAD CELL
- [FATMAN](#core__fatman) — MGS2 / DEAD CELL
- [REVOLVER OCELOT](#core__ocelot_mgs1) — MGS1 / FOXHOUND
- [THE BOSS](#core__boss) — THE JOY

## core__fear

### THE FEAR — MGS3 / COBRA UNIT

**Rôle :** Arbalète, piège et camouflage. **Profil :** `fear`.

**Base présente dans le code :** The Fear : arbalètes, pièges, agilité et camouflage coûteux.

**Incarnation à conserver :** Original MGS3 Cobra Unit boss, Graniny Gorki South; original PS2 long-sleeve fatigues

**État vérifié :** métadonnées natives avec limites. 72 régions source distinctes dans les deux directions ; groupes : idle, walk, guard, crouch, jump, punch, heavy, low, hit, ko, shoot, deploy, optic, charge, recover, attack.

**Réemplois à examiner :** `heavy` = heavy, throw.

**Techniques pointant sur une seule région native dans la direction principale :** specialBack. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `retro-msx`, `tuxedo`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** THE FEAR : posture contorsionnée de The Fear et arbalète identifiable. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** appuis écartés et bond sans allonger les membres. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Arbalète, piège et camouflage » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder posture contorsionnée de The Fear et arbalète identifiable.
- **jump_land :** THE FEAR : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. appuis écartés et bond sans allonger les membres. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de THE FEAR. Terminer par réception basse, reprise d’arbalète et stabilisation. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS3 / COBRA UNIT », présentation de Original MGS3 Cobra Unit boss, Graniny Gorki South; original PS2 long-sleeve fatigues, puis posture contorsionnée de The Fear et arbalète identifiable. Geste court lié à « Little Joe — carreau » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, réception basse, reprise d’arbalète et stabilisation ; THE FEAR vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS3 / COBRA UNIT.
- **round_loss :** Proposition CQC : THE FEAR réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « William Tell — salve », revenir par réception basse, reprise d’arbalète et stabilisation, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE FEAR, préparer « Jab » ; posture contorsionnée de The Fear et arbalète identifiable. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** réception basse, reprise d’arbalète et stabilisation.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE FEAR, préparer « Frappe engagée » ; posture contorsionnée de The Fear et arbalète identifiable. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** réception basse, reprise d’arbalète et stabilisation.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE FEAR, préparer « Balayage » ; posture contorsionnée de The Fear et arbalète identifiable. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** réception basse, reprise d’arbalète et stabilisation.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE FEAR, préparer « Projection » ; posture contorsionnée de The Fear et arbalète identifiable. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** réception basse, reprise d’arbalète et stabilisation. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Little Joe — carreau

**Existant :** `projectile` / `bolt` ; 25/1/35 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE FEAR, préparer « Little Joe — carreau » ; posture contorsionnée de The Fear et arbalète identifiable. Montrer la prise et la visée de l’arme décrite par « Little Joe — carreau » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** réception basse, reprise d’arbalète et stabilisation. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Se baisser, bloquer ou détruire le carreau ; poison non létal à lui seul et non empilable.

##### specialDown — Piège de chasse

**Existant :** `trap` / `snare` ; 30/1/36 ticks ; groupe `deploy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE FEAR, préparer « Piège de chasse » ; posture contorsionnée de The Fear et arbalète identifiable. Prendre le dispositif, s’abaisser vers le support et indiquer le lieu de pose avant activation.

**Action.** Poser « Piège de chasse » au point réel de main/outil, armer puis retirer le membre. Le dispositif possède ensuite son propre sprite, ses états attente/armement/déclenchement/destruction et sa collision.

**Retour.** réception basse, reprise d’arbalète et stabilisation. Se dégager de l’objet sans le téléporter ; l’interruption avant armement a sa propre sortie.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pose et amorçage visibles ; sauter ou détruire la dispositif par une attaque. Deux maximum.

##### specialForward — Bond arachnéen

**Existant :** `mobility` / `movement` ; 16/20/26 ticks ; groupe `jump`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE FEAR, préparer « Bond arachnéen » ; posture contorsionnée de The Fear et arbalète identifiable. Préparer l’appui qui produit le déplacement ; appuis écartés et bond sans allonger les membres.

**Action.** Exécuter « Bond arachnéen » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -2 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** réception basse, reprise d’arbalète et stabilisation. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Vulnérable aux anti-aériens ; envol borné, pas de vol infini.

##### specialBack — Stealth camo

**Existant :** `buff` / `stealth` ; 19/1/27 ticks ; groupe `optic`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE FEAR, préparer « Stealth camo » ; posture contorsionnée de The Fear et arbalète identifiable. Montrer la préparation corporelle ou mécanique de « Stealth camo ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** réception basse, reprise d’arbalète et stabilisation. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Silhouette translucide, collision intacte ; une attaque ou un impact brise le camouflage.

##### super — William Tell — salve

**Existant :** `projectile` / `bolt` ; 35/1/44 ticks ; groupe `charge`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE FEAR, préparer « William Tell — salve » ; posture contorsionnée de The Fear et arbalète identifiable. Montrer la prise et la visée de l’arme décrite par « William Tell — salve » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 4 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** réception basse, reprise d’arbalète et stabilisation. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 4 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Reprendre son souffle

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE FEAR, préparer « Reprendre son souffle » ; posture contorsionnée de The Fear et arbalète identifiable. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Reprendre son souffle ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** réception basse, reprise d’arbalète et stabilisation. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Poisoned Bolt

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : William Tell — salve / Little Joe — carreau.

Plan 1 : THE FEAR sécurise son appui, regarde la cible et prépare l’outil ou le geste de « William Tell — salve / Little Joe — carreau ». Plan 2 : présenter l’arme effectivement associée à « William Tell — salve / Little Joe — carreau », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : réception basse, reprise d’arbalète et stabilisation, pose de signature face à l’adversaire.

##### Tree Trap

Famille `ballistic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : William Tell — salve / Piège de chasse.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « William Tell — salve / Piège de chasse » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « William Tell — salve / Piège de chasse », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : réception basse, reprise d’arbalète et stabilisation, arrêt du dispositif et retour au cadre d’ensemble.

##### Spider Camouflage

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : William Tell — salve / Bond arachnéen.

Plan 1 : approche jusqu’à la distance réelle de « William Tell — salve / Bond arachnéen », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « William Tell — salve / Bond arachnéen », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : réception basse, reprise d’arbalète et stabilisation, prise de distance et maintien final.

##### The Fear Hunts

Famille `trap`, ton `stylized` ; 274 ticks CQC ; phases actuelles : bait → arm → trigger → secure. Appuis déclarés : William Tell — salve / Projection.

Plan 1 : après une observation ou un repli, THE FEAR reprend l’initiative par « William Tell — salve / Projection ». Plan 2 : montrer la pose/trajectoire et le délai de « William Tell — salve / Projection ». Plan 3 : déclencher au véritable point de dispositif ; poussière, débris et réaction de cible restent indépendants du corps de l’attaquant. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : réception basse, reprise d’arbalète et stabilisation, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Closest supported original MGS3 PS2 model era illustrated adaptation, never absolute pixel/model/material/skeletal 1:1 certification. Official Konami color model and actual original PS2-era intro physically inspected and preserved.
- Archive LP_Metal_Gear_Solid_3 was recorded2009/archived2010 before HD/Delta. Metadata explicitly identifies the Subsistence re-release for camera features; shared original PS2 Fear model/cutscene supports original2004 identity, not a claim that footage uses the first pressing.
- Initial scout bare-chest reading of monochrome concept art is rejected by original model and actual PS2 cutscene. Selected body wears complete long-sleeve brown/olive military fatigues with dark irregular tiger stripes, black gloves/boots and central ribbed chest pouch.
- Exact invisible rear harness seams, glove seam/individual fingertip constructions, camouflage spot coordinates, webbing strap lengths, buckles and bootlace topology are partly inferred at atlas scale, no absolute exact hidden-surface claim.
- Original front/three-quarter source proves prominent olive anatomical RIGHT front-hip pouch and central black chest block. Native views independently generated, intended original-side gear retained; projection/occluded far-side fittings remain closest-supported rather than exact360-model certification.
- Compact Little Joe is visually supported by official original model and large original promo render. Longer William Tell attack atlas is a restrained two-handed versus adaptation of original crossbow family, using longer rail/stock and broad braced limbs. Compressed front/side cutscene partially obscures exact rear stock, limb joints and which named crossbow is on screen; strict weapon-name-to-model 1:1 is not independently certified.
- All72 body action keyframes are newly authored versus adaptations, not extracted original PS2 animations. Actual engine10move timings/costs/collision remain authoritative. Heavy and throw intentionally share the same 3 physically authored left reach/shove/capture frames; no extra3 poses or original CQC-technique claim.
- Little Joe shoot C0..2 and William Tell charge C7..9 visibly distinct; first active frame1/global cell1 or8. C3..5 depict left-hand low snare placement, no explosive mine. C6 depicts visible opaque stealth activation hand-to-harness; actual engine applies cloak separately without pixel edits. C10..11 recover breath, not unsourced eating or magic.
- Crossbow carries in anatomical RIGHT hand intended consistently; original front model visibly uses right. Far-side arm occlusion means not every authored pose certifies exclusive handedness. Original combat can involve both arms. No modern rifle, laser, magazine, Scope optic, firearm muzzle flash or glowing poison added.
- No detached projectiles baked into body sheets; native bolt atlas separate. Original1352s physical bolt shows dark cylindrical shaft and short gray cross-type stabilizers; front tip is embedded and occluded so plain cone and exact fin count/backside are interpreted, not absolute extracted geometry.
- Both facings are six independently generated distinct native PNGs. No image mirroring, resizing, recoloring, alpha manipulation or raster edits outside image_gen. Native PNGs preserved unchanged, Canvas crops/contours inspect source only.
- Standing source height fixed per PNG using upright poses; low crouch/sweep/KO must never be stretched to upright230. Some padded rectangles overlap neighboring-row components but complete body components are separate; importer uses actual source-derived Canvas stencil, retaining exact original PNG bytes.
- Producer review covers original-source art/native alpha and metadata only; independent integrator/runtime/mobile/move-phase checks remain required before production acceptance. Approval means closest_supported art, not automatic source model or live-game QA certificate.
- All six unchanged native sheets, all 72 complete authored bodies and all eight listed original reference images were physically viewed independently on 2026-10-02. Full long sleeves, brown/olive dark-striped fatigues, slick black hair and white temples, gloves, chest quiver, hip pouch and two crossbow groups agree with the selected original-model-era incarnation.
- Actual original PS2 archive footage is the Subsistence model-era re-release rather than proof of a first-pressing 2004 capture. The named Little Joe and William Tell source-to-shape association, invisible seams and far-side hand/hip fittings remain closest-supported, with the producer limitations preserved.
- All native body poses and bounded Versus actions are authored adaptations. Six independently generated source PNGs are retained byte for byte; no mirroring, resizing, repainting or alpha manipulation is performed. Stored dark RGB outside native alpha remains unchanged.
- Fixed per-sheet scaling uses physically observed upright crown-to-sole body components; bent recover, crouch, jump and fallen bodies are not stretched. Existing Canvas source contours are required to exclude neighboring figures in padded crops. Final live Canvas inspection is a separate gate.
- [Original Shinkawa artwork, monochrome; no palette proof. Full sleeves and uniform visually readable, no bare chest.](https://www.metalgearsolid.be/images/mgs3_art_0011.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Official original full-body colored model, long-sleeve brown/olive dark-striped military fatigues, gloves, frontal chest pack and right hip pouch; small crossbow held in right hand.](https://www.konami.com/mg/archive/mgs3/english/pic/chara_fear_pic.gif) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original PS2 promo model at large size reproduces exact Konami silhouette, black slicked-back hair with white temples, black front ribbed pouch and olive anatomical RIGHT hip pouch, long dark straps and pointed collar.](https://www.metalgearsolid.be/images/mgs3_art_g_0044.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Actual original PS2-era intro face, trellis uniform, gloves, crossbow front view and harness. Video archived before HD/Delta; Subsistence original-model re-release explicitly in archive metadata.](https://archive.org/download/LP_Metal_Gear_Solid_3/mgs3_20.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Actual original-era full uniform and torso equipment in intro tree movement. Long sleeves clearly present, no shirtless costume.](https://archive.org/download/LP_Metal_Gear_Solid_3/mgs3_20.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original PS2 intro rear three-quarter harness, back webbing and hip fittings. Source forest lighting green/brown is not baked into body materials.](https://archive.org/download/LP_Metal_Gear_Solid_3/mgs3_20.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original PS2 top/rear view shows dark back shoulder webbing and full long sleeves; frontal chest block is not visible at this timestamp.](https://archive.org/download/LP_Metal_Gear_Solid_3/mgs3_20.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original physical metal crossbow BOLT in Snake hand: thin dark steel shaft and short gray cross-type stabilizer fins. Embedded front tip occluded. Snake body is weapon-only context, not Fear costume reference.](https://archive.org/download/LP_Metal_Gear_Solid_3/mgs3_20.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__end

### THE END — MGS3 / COBRA UNIT

**Rôle :** Mosin, pistage et repos. **Profil :** `end`.

**Base présente dans le code :** Tireur Mosin et photosynthèse ; récupération grise plafonnée.

**Incarnation à conserver :** Original 2004 PS2 The End — Sokrovenno Cobra Unit leaf-ghillie sniper

**État vérifié :** métadonnées natives avec limites. 72 régions source distinctes dans les deux directions ; groupes : idle, walk, guard, crouch, jump, punch, heavy, low, hit, ko, shoot, charge, optic, recover, reload, attack.

**Réemplois à examiner :** `heavy` = heavy, throw.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `retro-msx`, `tuxedo`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** THE END : posture âgée de The End, carabine, équipement et respiration observables. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** déplacement à l’échelle du corps, canon sécurisé. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Mosin, pistage et repos » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder posture âgée de The End, carabine, équipement et respiration observables.
- **jump_land :** THE END : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. déplacement à l’échelle du corps, canon sécurisé. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de THE END. Terminer par reprise de souffle et visée ; pas de souplesse de ninja générique. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS3 / COBRA UNIT », présentation de Original 2004 PS2 The End — Sokrovenno Cobra Unit leaf-ghillie sniper, puis posture âgée de The End, carabine, équipement et respiration observables. Geste court lié à « Mosin-Nagant tranquillisant » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, reprise de souffle et visée ; pas de souplesse de ninja générique ; THE END vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS3 / COBRA UNIT.
- **round_loss :** Proposition CQC : THE END réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Mosin-Nagant — dernier souffle », revenir par reprise de souffle et visée ; pas de souplesse de ninja générique, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE END, préparer « Jab » ; posture âgée de The End, carabine, équipement et respiration observables. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** reprise de souffle et visée ; pas de souplesse de ninja générique.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE END, préparer « Frappe engagée » ; posture âgée de The End, carabine, équipement et respiration observables. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** reprise de souffle et visée ; pas de souplesse de ninja générique.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE END, préparer « Balayage » ; posture âgée de The End, carabine, équipement et respiration observables. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** reprise de souffle et visée ; pas de souplesse de ninja générique.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE END, préparer « Projection » ; posture âgée de The End, carabine, équipement et respiration observables. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** reprise de souffle et visée ; pas de souplesse de ninja générique. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Mosin-Nagant tranquillisant

**Existant :** `projectile` / `precision` ; 46/1/47 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE END, préparer « Mosin-Nagant tranquillisant » ; posture âgée de The End, carabine, équipement et respiration observables. Montrer la prise et la visée de l’arme décrite par « Mosin-Nagant tranquillisant » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** reprise de souffle et visée ; pas de souplesse de ninja générique. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Repère de visée du versus ; tir de Mosin annoncé pendant 46 images, garde ou approche pendant la préparation.

##### specialDown — L’œil de Sokrovenno

**Existant :** `mark` / `recon` ; 26/1/30 ticks ; groupe `optic`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE END, préparer « L’œil de Sokrovenno » ; posture âgée de The End, carabine, équipement et respiration observables. Orienter regard, optique ou terminal vers la cible observée, sans consulter une action future.

**Action.** Pour « L’œil de Sokrovenno », déclencher lecture/repérage avec un petit geste ou changement d’optique et un indicateur séparé. Le corps doit rester visible et vulnérable selon les données de combat.

**Retour.** reprise de souffle et visée ; pas de souplesse de ninja générique. Couper le signal ou abaisser l’outil ; retour vers l’adversaire sans nouvelle arme inventée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Portée limitée ; le marquage ne vise ni à travers toute l’arène ni automatiquement.

##### specialForward — Camouflage végétal

**Existant :** `buff` / `stealth` ; 19/1/27 ticks ; groupe `crouch`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE END, préparer « Camouflage végétal » ; posture âgée de The End, carabine, équipement et respiration observables. Montrer la préparation corporelle ou mécanique de « Camouflage végétal ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** reprise de souffle et visée ; pas de souplesse de ninja générique. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Silhouette translucide, collision intacte ; une attaque ou un impact brise le camouflage.

##### specialBack — Repos photosynthétique

**Existant :** `heal` / `recovery` ; 45/1/38 ticks ; groupe `recover`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE END, préparer « Repos photosynthétique » ; posture âgée de The End, carabine, équipement et respiration observables. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Repos photosynthétique ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** reprise de souffle et visée ; pas de souplesse de ninja générique. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Ne restaure que les dégâts récupérables ; interrompre les 45 images de préparation.

##### super — Mosin-Nagant — dernier souffle

**Existant :** `projectile` / `precision` ; 55/1/50 ticks ; groupe `charge`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE END, préparer « Mosin-Nagant — dernier souffle » ; posture âgée de The End, carabine, équipement et respiration observables. Montrer la prise et la visée de l’arme décrite par « Mosin-Nagant — dernier souffle » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** reprise de souffle et visée ; pas de souplesse de ninja générique. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Une cartouche de Mosin et 50 points de jauge ; tir tranquillisant annoncé, garde, esquive ou parade de projectile.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE END, préparer « Recharger » ; posture âgée de The End, carabine, équipement et respiration observables. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** reprise de souffle et visée ; pas de souplesse de ninja générique. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### One Last Breath

Famille `sniper`, ton `stylized` ; 220 ticks CQC ; phases actuelles : mark → steady → shot → fade. Appuis déclarés : Mosin-Nagant — dernier souffle / Mosin-Nagant tranquillisant.

Plan 1 : THE END sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Mosin-Nagant — dernier souffle / Mosin-Nagant tranquillisant ». Plan 2 : présenter l’arme effectivement associée à « Mosin-Nagant — dernier souffle / Mosin-Nagant tranquillisant », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : reprise de souffle et visée ; pas de souplesse de ninja générique, pose de signature face à l’adversaire.

##### Mosin-Nagant

Famille `sniper`, ton `stylized` ; 238 ticks CQC ; phases actuelles : mark → steady → shot → fade. Appuis déclarés : Mosin-Nagant — dernier souffle / L’œil de Sokrovenno.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Mosin-Nagant — dernier souffle / L’œil de Sokrovenno » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Mosin-Nagant — dernier souffle / L’œil de Sokrovenno », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : reprise de souffle et visée ; pas de souplesse de ninja générique, arrêt du dispositif et retour au cadre d’ensemble.

##### Photosynthetic Silence

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Mosin-Nagant — dernier souffle / Camouflage végétal.

Plan 1 : approche jusqu’à la distance réelle de « Mosin-Nagant — dernier souffle / Camouflage végétal », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Mosin-Nagant — dernier souffle / Camouflage végétal », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : reprise de souffle et visée ; pas de souplesse de ninja générique, prise de distance et maintien final.

##### The End

Famille `sniper`, ton `stylized` ; 274 ticks CQC ; phases actuelles : mark → steady → shot → fade. Appuis déclarés : Mosin-Nagant — dernier souffle / Projection.

Plan 1 : après une observation ou un repli, THE END reprend l’initiative par « Mosin-Nagant — dernier souffle / Projection ». Plan 2 : présenter l’arme effectivement associée à « Mosin-Nagant — dernier souffle / Projection », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : reprise de souffle et visée ; pas de souplesse de ninja générique, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Closest supported illustrated adaptation of The End from original Metal Gear Solid 3: Snake Eater (2004) PS2; no absolute pixel, model, material, skeleton or animation 1:1 certification. Original official color model and native original PS2 captures were physically viewed and are preserved unchanged.
- Original flat leaf-flap ghillie, bald painted scalp, blue headset, white beard, bare hands, broad elderly shape, green parrot and original scoped Mosin only. No Delta, HD remake, modern sniper uniform, PSG1, railgun, magic aura or bayonet accepted.
- Parrot stays on intended anatomical LEFT shoulder in both independently generated views, never becomes a second disconnected body component. Exact hidden vest/bag strap stitching, boot laces and the count of leaf flaps remain unresolved in low-resolution original evidence and are restrained authored interpretation.
- Original PS2 firing image confirms right trigger / left supporting hands. Independent versus views intend the same rig. Finger anatomy, obscured far arms and headset-touch hand during tracking/reload rest cannot be certified 1:1 or exclusive canonical handedness.
- All 72 body poses are authored bounded fighting-game adaptations, not ripped original animation. Normal rifle checks/shoves, low boot sweep, grapple alias, short jump, tracking, cloak, rest and reload remain Versus adaptations. No opponent or detached effect is baked into body sheets.
- Both shoot and charge use the same original scoped wooden Mosin. Source muzzle is separately measured on C source global index 1 and 4 at first active action frame 1 for both independent facings. Root owns exact-UID gameplay correction from inherited rail tag to conventional finite-ammo shot; producer never changed profiles or engine.
- Body scale stays fixed per native PNG at physically observed standing height, including seated reload/rest/crouch/KO. Rifles can shift alpha-centroid; independent integrator measures actual body/ground pivots and runtime crop scaling. No PNG raster resize, mirroring, recolor, alpha edit, cut-and-paste or external conditioning was performed.
- Every selected native PNG has exactly twelve large alpha-connected complete figures and no alpha >= 48 outer boundary pixels. Tiny antialias particles and stored RGB under transparent pixels are left native; runtime Canvas metadata crops/contours only.
- Rejected native attempts are preserved byte-for-byte: A LEFT 01 and 02 retained right-pointing rifles in some left-view cells; B LEFT 01 had mixed faces/directions; C LEFT 01 kept several right-facing or wrong-direction cells. Final A LEFT 03, B LEFT 02 and C LEFT 02 were regenerated independently from original model/captures, and all shooting faces/origins now point LEFT.
- Producer approval covers selected source-specific art and native alpha evidence. It is not a replacement for independent importer, mobile, phase, muzzle-origin, projectile-resource or final Shadow integration verification.
- All six final independent native sheets physically compared with original Konami color model, Shinkawa source, original scoped Mosin inventory image and four true original PS2 captures. Seventy-two complete broad elderly bodies retain balding painted scalp, blue headset, white beard, flat leaf camouflage, parrot and same wooden Mosin.
- Separate observed source muzzles shoot and charge retain their original native points. Independent left-final regenerations replace only rejected candidates; no mirror or other incarnation is imported. Authored versus shoves/grapple and short mobility are explicit adaptations, not ripped original animation.
- Body source scale measures crown/headset within separately physically selected head-column windows down to sole, so a perched parrot above head or extended rifle cannot stretch the body. Hidden seams/fingers and exact material/rig identity remain closest-supported.
- [Official original PS2 full-body model: broad elderly silhouette, bald painted scalp, dark blue headphones, white beard, olive/tan flat-leaf ghillie, bare hands, brown ankle boots, original wood-stock scoped Mosin and green parrot on anatomical LEFT shoulder.](https://www.konami.com/mg/archive/mgs3/english/pic/chara_end_pic.gif) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original Shinkawa monochrome concept art reproduced by external archive. Elderly face, beard, leaf camouflage, bag and long rifle; monochrome alone does not establish palette.](https://www.metalgearsolid.be/images/mgs3_art_0009.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original MGS3 Mosin Nagant inventory silhouette reproduced by external archive and explicitly labelled in preserved mgs3-inventory.html. Conventional scoped wood-stock bolt rifle; no railgun/PSG1/bayonet.](https://www.metalgearsolid.be/images/mosin.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original Snake Eater PS2 cutscene close hand and brown rifle stock/trigger guard: bare aged firing hand, conventional wood-stock rifle.](https://archive.org/download/PS2_Longplay-001-Metal_Gear_Solid_3-Snake_Eater/PS2_Longplay-001-Metal_Gear_Solid_3-Snake_Eater.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original PS2 frontal high angle confirms painted bald scalp under headphone band, stocky ghillie body and parrot on anatomical LEFT shoulder.](https://archive.org/download/PS2_Longplay-001-Metal_Gear_Solid_3-Snake_Eater/PS2_Longplay-001-Metal_Gear_Solid_3-Snake_Eater.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original PS2 near firing view: right trigger hand and left support on original wood-stock scoped rifle. Original face/headphone/white beard/leaf suit. Warm optic highlight is scene sunlight, never an energy-weapon source.](https://archive.org/download/PS2_Longplay-001-Metal_Gear_Solid_3-Snake_Eater/PS2_Longplay-001-Metal_Gear_Solid_3-Snake_Eater.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original PS2 death/rest scene: elderly face, beard, ghillie and physically perched green parrot. Bounded versus breathing/recovery pose is authored, not this original skeletal animation.](https://archive.org/download/PS2_Longplay-001-Metal_Gear_Solid_3-Snake_Eater/PS2_Longplay-001-Metal_Gear_Solid_3-Snake_Eater.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__fury

### THE FURY — MGS3 / COBRA UNIT

**Rôle :** Lance-flammes et propulseur. **Profil :** `fury`.

**Base présente dans le code :** Combinaison ignifuge, propulseur et lance-flammes ; pas de vol continu.

**Incarnation à conserver :** Original 2004 PS2 Fury Cobra Unit boss, black Soviet cosmonaut suit and closed bronze helmet

**État vérifié :** métadonnées natives avec limites. 72 régions source distinctes dans les deux directions ; groupes : idle, walk, guard, crouch, jump, punch, heavy, low, hit, ko, shoot, deploy, throw, recover, attack.

**Réemplois à examiner :** `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** THE FURY : combinaison, visière, lance-flammes et propulseur de The Fury. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas lourds ; impulsion de propulseur distincte d’un vol permanent. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Lance-flammes et propulseur » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder combinaison, visière, lance-flammes et propulseur de The Fury.
- **jump_land :** THE FURY : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas lourds ; impulsion de propulseur distincte d’un vol permanent. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de THE FURY. Terminer par extinction de poussée, poids absorbé puis remise en visée. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS3 / COBRA UNIT », présentation de Original 2004 PS2 Fury Cobra Unit boss, black Soviet cosmonaut suit and closed bronze helmet, puis combinaison, visière, lance-flammes et propulseur de The Fury. Geste court lié à « Jet de flammes » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, extinction de poussée, poids absorbé puis remise en visée ; THE FURY vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS3 / COBRA UNIT.
- **round_loss :** Proposition CQC : THE FURY réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « L’enfer de The Fury », revenir par extinction de poussée, poids absorbé puis remise en visée, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE FURY, préparer « Jab » ; combinaison, visière, lance-flammes et propulseur de The Fury. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** extinction de poussée, poids absorbé puis remise en visée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE FURY, préparer « Frappe engagée » ; combinaison, visière, lance-flammes et propulseur de The Fury. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** extinction de poussée, poids absorbé puis remise en visée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE FURY, préparer « Balayage » ; combinaison, visière, lance-flammes et propulseur de The Fury. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** extinction de poussée, poids absorbé puis remise en visée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE FURY, préparer « Projection » ; combinaison, visière, lance-flammes et propulseur de The Fury. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** extinction de poussée, poids absorbé puis remise en visée. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Jet de flammes

**Existant :** `projectile` / `fire` ; 24/1/33 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE FURY, préparer « Jet de flammes » ; combinaison, visière, lance-flammes et propulseur de The Fury. Montrer la prise et la visée de l’arme décrite par « Jet de flammes » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 3 émissions, espacées de 7 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** extinction de poussée, poids absorbé puis remise en visée. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 3 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### specialDown — Nappe incendiaire

**Existant :** `trap` / `fire` ; 33/1/35 ticks ; groupe `deploy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE FURY, préparer « Nappe incendiaire » ; combinaison, visière, lance-flammes et propulseur de The Fury. Prendre le dispositif, s’abaisser vers le support et indiquer le lieu de pose avant activation.

**Action.** Poser « Nappe incendiaire » au point réel de main/outil, armer puis retirer le membre. Le dispositif possède ensuite son propre sprite, ses états attente/armement/déclenchement/destruction et sa collision.

**Retour.** extinction de poussée, poids absorbé puis remise en visée. Se dégager de l’objet sans le téléporter ; l’interruption avant armement a sa propre sortie.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Zone annoncée puis persistante ; sauter, contourner ou neutraliser le dispositif.

##### specialForward — Rocket booster

**Existant :** `mobility` / `movement` ; 16/20/26 ticks ; groupe `jump`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE FURY, préparer « Rocket booster » ; combinaison, visière, lance-flammes et propulseur de The Fury. Préparer l’appui qui produit le déplacement ; pas lourds ; impulsion de propulseur distincte d’un vol permanent.

**Action.** Exécuter « Rocket booster » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -2 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** extinction de poussée, poids absorbé puis remise en visée. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Vulnérable aux anti-aériens ; envol borné, pas de vol infini.

##### specialBack — Combinaison thermique

**Existant :** `buff` / `armor` ; 22/1/31 ticks ; groupe `guard`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE FURY, préparer « Combinaison thermique » ; combinaison, visière, lance-flammes et propulseur de The Fury. Montrer la préparation corporelle ou mécanique de « Combinaison thermique ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** extinction de poussée, poids absorbé puis remise en visée. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Absorbe une seule frappe ; projections, EMP et attaques brise-armure la contrent.

##### super — L’enfer de The Fury

**Existant :** `projectile` / `fire` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE FURY, préparer « L’enfer de The Fury » ; combinaison, visière, lance-flammes et propulseur de The Fury. Montrer la prise et la visée de l’arme décrite par « L’enfer de The Fury » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 5 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** extinction de poussée, poids absorbé puis remise en visée. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 5 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Refroidir

**Existant :** `recover` / `recovery` ; 45/1/25 ticks ; groupe `recover`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE FURY, préparer « Refroidir » ; combinaison, visière, lance-flammes et propulseur de The Fury. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Refroidir ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** extinction de poussée, poids absorbé puis remise en visée. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Refroidissement ou pause tactique interrompable ; aucun soin gratuit.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Cosmonaut Inferno

Famille `fire`, ton `stylized` ; 220 ticks CQC ; phases actuelles : ignite → sweep → inferno → embers. Appuis déclarés : L’enfer de The Fury / Jet de flammes.

Plan 1 : THE FURY sécurise son appui, regarde la cible et prépare l’outil ou le geste de « L’enfer de The Fury / Jet de flammes ». Plan 2 : montrer la source corporelle ou matérielle de « L’enfer de The Fury / Jet de flammes ». Plan 3 : développer l’effet fire en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : extinction de poussée, poids absorbé puis remise en visée, pose de signature face à l’adversaire.

##### Jetpack Burn

Famille `fire`, ton `stylized` ; 238 ticks CQC ; phases actuelles : ignite → sweep → inferno → embers. Appuis déclarés : L’enfer de The Fury / Nappe incendiaire.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « L’enfer de The Fury / Nappe incendiaire » ; l’espace disponible doit être lisible. Plan 2 : montrer la source corporelle ou matérielle de « L’enfer de The Fury / Nappe incendiaire ». Plan 3 : développer l’effet fire en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : extinction de poussée, poids absorbé puis remise en visée, arrêt du dispositif et retour au cadre d’ensemble.

##### Tunnel Cremation

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : L’enfer de The Fury / Rocket booster.

Plan 1 : approche jusqu’à la distance réelle de « L’enfer de The Fury / Rocket booster », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « L’enfer de The Fury / Rocket booster », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : extinction de poussée, poids absorbé puis remise en visée, prise de distance et maintien final.

##### The Fury Falls

Famille `fire`, ton `stylized` ; 274 ticks CQC ; phases actuelles : ignite → sweep → inferno → embers. Appuis déclarés : L’enfer de The Fury / Projection.

Plan 1 : après une observation ou un repli, THE FURY reprend l’initiative par « L’enfer de The Fury / Projection ». Plan 2 : montrer la source corporelle ou matérielle de « L’enfer de The Fury / Projection ». Plan 3 : développer l’effet fire en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : extinction de poussée, poids absorbé puis remise en visée, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Closest supported source-specific original 2004 PS2 Fury illustration, no absolute pixel/material/model or 1:1 certification. Original model is low resolution and cutscene heavily flame-lit; hidden seams, hose undersides, exact tank plumbing and glove details partly interpreted.
- Original reflective closed visor partly reveals a burned face in source21875; generated small sprite keeps it closed with dark bronze reflections, no exposed invented face. Visor inscription is intended original БЕЙ, not a claim of character-perfect font/letter curvature reproduction in every tiny pose.
- Right-hand flamethrower held consistently by intended anatomical right hand in each independent facing; original source frontal pose supports this. Some hand overlap while supporting the tube hides finger topology; exact handedness and number of fingers are not certified in low-resolution occlusion.
- Twin pale rear cylinders and thin transverse jet booms supported by original rear capture21885 and close equipment21845. Near-side cylinder/boom may occlude far-side parts; no added mechanical wing or new weapon.
- 72 authored versus animations are not extracted original PS2 animation data. Original versus profile and engine timing/damage/heat costs/bounded movement remain root-owned and unchanged by this producer. Normals are physical jab/tube strike/boot sweep and grapple adaptations, not new canon abilities.
- Standing source scale measured from upright helmet-to-boot silhouettes; crouch/low/fall/KO never resized to standing height. Near-crop neighbour pixels on B LEFT heavy/KO excluded only through existing Canvas contours, native PNG bytes unchanged.
- Shoot and super use same gun muzzle. Deploy aims real nozzle downward, separate flame region; trap collision remains original engine position unless root documents a specific correction. No flame/aura/jet exhaust baked into body.
- B LEFT1 rejected for mixed directions; B LEFT2 rejected for grey semi-transparent veil joining all12 alpha components; B LEFT3 accepted after native image_gen alpha edit,12 components and zero opaque edge pixels. All native attempts and prompt metadata remain preserved; no OC derived from rejects.
- Six source PNGs are distinct independently authored facings, not mirrored, recolored, alpha-processed or resized by scripts. PIL/NumPy/SciPy only read pixels/SHA/components; Canvas crop/contour metadata only.
- Original black Soviet cosmonaut suit, closed dark bronze visor/lettering, pale paired fuel cylinders, hose, small transverse jet booms and actual flame tube physically viewed on all six independent sources and original Konami/PS2 references. Ten original images and publisher HTML inspected.
- Visor letters and hidden plumbing/finger topology remain closest-supported rather than literal extracted original models. All72 complete bodies are authored bounded fighting adaptation; no flame, magical aura, jet plume or opponent baked into body sheets.
- Stored gray/brown RGB background has native zero alpha in actual source gaps; it is not removed or repainted. Actual Canvas crop/contour review is required and separately recorded before final signoff.
- [Original Yoji Shinkawa MGS3 monochrome costume/equipment silhouette; not sole color or original-model weapon proof.](https://www.metalgearsolid.be/images/mgs3_art_0008.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Official original-model full body, black Soviet space suit, closed bronze visor and БЕЙ inscription, right-hand flamethrower and propulsion boom shape, no remake.](https://www.konami.com/mg/archive/mgs3/english/pic/chara_fury_pic.gif) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Official story establishes Soviet spacesuit, flamethrower and accident; native model GIF same page.](https://www.konami.com/mg/archive/mgs3/english/chara_fury.html) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original Fury lower legs/boots under fire; compressed motionblur supplementary only.](https://archive.org/download/PS2_Longplay-001-Metal_Gear_Solid_3-Snake_Eater/PS2_Longplay-001-Metal_Gear_Solid_3-Snake_Eater.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original Fury close rear tubes, transverse bracing and pale tanks; hidden lower tank connectors partly occluded.](https://archive.org/download/PS2_Longplay-001-Metal_Gear_Solid_3-Snake_Eater/PS2_Longplay-001-Metal_Gear_Solid_3-Snake_Eater.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original Fury closed bronze helmet, БЕЙ visor inscription, ribbed black suit, flamethrower muzzle/tube.](https://archive.org/download/PS2_Longplay-001-Metal_Gear_Solid_3-Snake_Eater/PS2_Longplay-001-Metal_Gear_Solid_3-Snake_Eater.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original Fury full front silhouette with expanded propulsion bars, heavy suit and boots; fire lighting not native neutral palette.](https://archive.org/download/PS2_Longplay-001-Metal_Gear_Solid_3-Snake_Eater/PS2_Longplay-001-Metal_Gear_Solid_3-Snake_Eater.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original Fury visor closeup reflecting flames with partly visible burned face behind glass; closed helmet retained, no Delta head.](https://archive.org/download/PS2_Longplay-001-Metal_Gear_Solid_3-Snake_Eater/PS2_Longplay-001-Metal_Gear_Solid_3-Snake_Eater.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__raiden_mgs2

### RAIDEN — MGS2 — SONS OF LIBERTY / SNEAKING SUIT

**Rôle :** Infiltration et armes limitées. **Profil :** `infiltrator`.

**Base présente dans le code :** Raiden humain : SOCOM, roulade et lame reçue à Arsenal Gear ; aucune Zandatsu ni Ripper.

**Incarnation à conserver :** Human Raiden, original MGS2 PS2 sneaking suit; Arsenal HF blade equipment

**État vérifié :** métadonnées natives avec limites. 72 régions source distinctes dans les deux directions ; groupes : idle, walk, guard, crouch, low, punch, hit, ko, roll, throw, blade, deploy, shoot, recover, attack.

**Réemplois à examiner :** `punch` = light, heavy, super.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `retro-msx`, `tuxedo`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** RAIDEN — MGS2 : garde compacte de l’infiltrateur, arme et étuis proches du corps. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** déroulé de pied discret, bassin bas, freinage avant visée. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Infiltration et armes limitées » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder garde compacte de l’infiltrateur, arme et étuis proches du corps.
- **jump_land :** RAIDEN — MGS2 : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. déroulé de pied discret, bassin bas, freinage avant visée. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de RAIDEN — MGS2. Terminer par replacement rapide de la main libre et contrôle du champ. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « SONS OF LIBERTY / SNEAKING SUIT », présentation de Human Raiden, original MGS2 PS2 sneaking suit; Arsenal HF blade equipment, puis garde compacte de l’infiltrateur, arme et étuis proches du corps. Geste court lié à « SOCOM » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, replacement rapide de la main libre et contrôle du champ ; RAIDEN — MGS2 vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à SONS OF LIBERTY / SNEAKING SUIT.
- **round_loss :** Proposition CQC : RAIDEN — MGS2 réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Solidus — contre final », revenir par replacement rapide de la main libre et contrôle du champ, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN — MGS2, préparer « Jab » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** replacement rapide de la main libre et contrôle du champ.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `punch`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN — MGS2, préparer « Frappe engagée » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** replacement rapide de la main libre et contrôle du champ.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN — MGS2, préparer « Balayage » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** replacement rapide de la main libre et contrôle du champ.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN — MGS2, préparer « Projection » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** replacement rapide de la main libre et contrôle du champ. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — SOCOM

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN — MGS2, préparer « SOCOM » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Montrer la prise et la visée de l’arme décrite par « SOCOM » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** replacement rapide de la main libre et contrôle du champ. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Grenade chaff

**Existant :** `projectile` / `emp` ; 24/1/31 ticks ; groupe `deploy`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN — MGS2, préparer « Grenade chaff » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Donner à la source de « Grenade chaff » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet emp de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** replacement rapide de la main libre et contrôle du champ. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Grenade de perturbation télégraphiée ; garde ou saut. Sur machine, drain de ressource et annulation de l’écran.

##### specialForward — Lame haute fréquence — Arsenal

**Existant :** `melee` / `blade` ; 13/5/24 ticks ; groupe `blade`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN — MGS2, préparer « Lame haute fréquence — Arsenal » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** replacement rapide de la main libre et contrôle du champ. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde puis punition ; la lame ne touche qu’une fois par attaque.

##### specialBack — Roulade de Raiden

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `roll`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN — MGS2, préparer « Roulade de Raiden » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Préparer l’appui qui produit le déplacement ; déroulé de pied discret, bassin bas, freinage avant visée.

**Action.** Exécuter « Roulade de Raiden » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** replacement rapide de la main libre et contrôle du champ. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Solidus — contre final

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `punch`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN — MGS2, préparer « Solidus — contre final » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Solidus — contre final », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** replacement rapide de la main libre et contrôle du champ.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Récupération humaine

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN — MGS2, préparer « Récupération humaine » ; garde compacte de l’infiltrateur, arme et étuis proches du corps. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Récupération humaine ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** replacement rapide de la main libre et contrôle du champ. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Solidus — contre final — Final

Famille `cqc`, ton `stylized` ; 220 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Solidus — contre final / SOCOM.

Plan 1 : RAIDEN — MGS2 sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Solidus — contre final / SOCOM ». Plan 2 : contact de saisie ou neutralisation lié à « Solidus — contre final / SOCOM », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : replacement rapide de la main libre et contrôle du champ, pose de signature face à l’adversaire.

##### SOCOM / Grenade chaff

Famille `ballistic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Solidus — contre final / Grenade chaff.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Solidus — contre final / Grenade chaff » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Solidus — contre final / Grenade chaff », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : replacement rapide de la main libre et contrôle du champ, arrêt du dispositif et retour au cadre d’ensemble.

##### Lame haute fréquence — Arsenal — Point final

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Solidus — contre final / Lame haute fréquence — Arsenal.

Plan 1 : approche jusqu’à la distance réelle de « Solidus — contre final / Lame haute fréquence — Arsenal », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Solidus — contre final / Lame haute fréquence — Arsenal », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : replacement rapide de la main libre et contrôle du champ, prise de distance et maintien final.

##### Lecture rapprochée — Mission close

Famille `cqc`, ton `stylized` ; 274 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Solidus — contre final / Projection.

Plan 1 : après une observation ou un repli, RAIDEN — MGS2 reprend l’initiative par « Solidus — contre final / Projection ». Plan 2 : contact de saisie ou neutralisation lié à « Solidus — contre final / Projection », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : replacement rapide de la main libre et contrôle du champ, rangement/pose finale différente des trois autres.

#### Limites et preuves

- 1:1 original-universe fidelity is the target; these are reviewed reference-grounded 2D keyframes, not certified pixel-identical PS2 model/texture/animation extraction.
- The exact source identity/palette is original human Raiden from Konami MGS2 PS2 art and screenshots. No MGS4/MGR cyborg, visor, bandana or future incarnation is added.
- HF blade shape/use is proved by real MGS2 game capture with explicit HF.BLADE HUD. The cited LP was played on PC; it is a supplemental weapon reference, not PS2 texture/palette proof.
- SOCOM/chaff HUD glyphs establish silhouette, not material red color. Weapons use restrained dark metal; markings, seams and very small hardware details are simplified.
- Six PNG provide36 authored poses per direction=72 original poses; aliases/recovery reuse do not inflate this count. Left/right were generated independently; mirror is disabled.
- Original PNG bytes/dimensions preserved. Some bodies/weapon tips cross equal-cell boundaries; use observed complete alpha-connected body bounds and metadata contours when required.
- Native body scale must remain constant across crouch, roll, KO and upright poses; feet/pelvis pivots preserve ground contact. LowProfile hitbox remains authored rectangular gameplay geometry, not a pixel-perfect sprite mask.
- The right-view chaff release includes a detached tiny grenade fragment; isolate human body and keep actual engine projectile independent to avoid duplication. Left-view chaff preparation partly occludes small canister behind raised hand/head.
- Minor hair/costume-seam/pose variation and alpha-edge antialiasing remain.
- Observed upright native scales differ between independently generated source sheets (especially A-left); sourceFrameHeights equalizes stature while every pose within a PNG retains the same scale, including low rolls/KO.
- [Official original MGS2 PS2 full-body concept art or original PS2 screenshot.](https://www.konami.com/mg/archive/mgs2/english/chara/pic/chara_raiden.gif) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Official original MGS2 PS2 full-body concept art or original PS2 screenshot.](https://www.konami.com/mg/archive/mgs2/english/chara/pic/pic_raiden01.gif) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Official original MGS2 PS2 full-body concept art or original PS2 screenshot.](https://www.konami.com/mg/archive/mgs2/english/chara/pic/pic_raiden02.gif) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Actual human MGS2 HF blade and explicit HF.BLADE HUD; LP on PC, not strict PS2 palette.](https://lparchive.org/Metal-Gear-Solid-2-(Screenshot)/Update%2031/mgs2_12_808.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original MGS2 inventory SOCOM shape, red HUD glyph not red material.](https://www.metalgearsolid.be/images/socom.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original MGS2 chaff canister shape, red HUD glyph not red material.](https://www.metalgearsolid.be/images/gchaff.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__solidus

### SOLIDUS SNAKE — MGS2 / SONS OF LIBERTY

**Rôle :** Deux lames et bras de l’exosquelette. **Profil :** `ninja`.

**Base présente dans le code :** Deux lames et bras de l’exosquelette de Solidus ; pas de Ripper Mode.

**Incarnation à conserver :** Original PS2, first-phase full Solidus powered exoskeleton; no Big Boss/Raiden/Rising hybrid

**État vérifié :** métadonnées natives avec limites. 72 régions source distinctes dans les deux directions ; groupes : idle, walk, guard, crouch, jump, blade, heavy, low, hit, ko, throw, deploy, charge, recover, attack.

**Réemplois à examiner :** `heavy` = heavy, special, super.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `retro-msx`, `tuxedo`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** SOLIDUS SNAKE : centre bas, main et fourreau orientés selon cette incarnation. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** appuis souples, accélération puis arrêt net avant une coupe. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Deux lames et bras de l’exosquelette » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder centre bas, main et fourreau orientés selon cette incarnation.
- **jump_land :** SOLIDUS SNAKE : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. appuis souples, accélération puis arrêt net avant une coupe. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de SOLIDUS SNAKE. Terminer par finir l’arc de lame puis reprendre la garde sans traverser le corps. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS2 / SONS OF LIBERTY », présentation de Original PS2, first-phase full Solidus powered exoskeleton; no Big Boss/Raiden/Rising hybrid, puis centre bas, main et fourreau orientés selon cette incarnation. Geste court lié à « Double lame » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, finir l’arc de lame puis reprendre la garde sans traverser le corps ; SOLIDUS SNAKE vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS2 / SONS OF LIBERTY.
- **round_loss :** Proposition CQC : SOLIDUS SNAKE réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Federal Hall — assaut », revenir par finir l’arc de lame puis reprendre la garde sans traverser le corps, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Contact de lame

**Existant :** `melee` / `blade` ; 7/3/12 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLIDUS SNAKE, préparer « Contact de lame » ; centre bas, main et fourreau orientés selon cette incarnation. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Coupe engagée

**Existant :** `melee` / `blade` ; 18/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLIDUS SNAKE, préparer « Coupe engagée » ; centre bas, main et fourreau orientés selon cette incarnation. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLIDUS SNAKE, préparer « Balayage » ; centre bas, main et fourreau orientés selon cette incarnation. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLIDUS SNAKE, préparer « Projection » ; centre bas, main et fourreau orientés selon cette incarnation. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Double lame

**Existant :** `melee` / `blade` ; 13/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLIDUS SNAKE, préparer « Double lame » ; centre bas, main et fourreau orientés selon cette incarnation. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde puis punition ; la lame ne touche qu’une fois par attaque.

##### specialDown — Tentacule balayante

**Existant :** `melee` / `tentacle` ; 16/5/29 ticks ; groupe `deploy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLIDUS SNAKE, préparer « Tentacule balayante » ; centre bas, main et fourreau orientés selon cette incarnation. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; menace horizontale, pas un anti-aérien universel.

##### specialForward — Propulseur de l’exosquelette

**Existant :** `mobility` / `movement` ; 16/20/26 ticks ; groupe `charge`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLIDUS SNAKE, préparer « Propulseur de l’exosquelette » ; centre bas, main et fourreau orientés selon cette incarnation. Préparer l’appui qui produit le déplacement ; appuis souples, accélération puis arrêt net avant une coupe.

**Action.** Exécuter « Propulseur de l’exosquelette » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -2 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Vulnérable aux anti-aériens ; envol borné, pas de vol infini.

##### specialBack — Déviation de Solidus

**Existant :** `parry` / `counter` ; 5/12/28 ticks ; groupe `guard`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLIDUS SNAKE, préparer « Déviation de Solidus » ; centre bas, main et fourreau orientés selon cette incarnation. Présenter la surface ou l’organe de parade et maintenir une fenêtre courte lisible.

**Action.** Recevoir puis dévier au contact réel pour « Déviation de Solidus » ; la riposte et son effet n’apparaissent qu’après succès. Une attente sans contact garde une pose différente du contre réussi.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Séparer sortie ratée, blocage simple et riposte ; aucun effet de réussite avant collision.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Projections, attaques au corps à corps et explosifs au sol ne sont pas renvoyés.

##### super — Federal Hall — assaut

**Existant :** `melee` / `blade` ; 25/7/44 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLIDUS SNAKE, préparer « Federal Hall — assaut » ; centre bas, main et fourreau orientés selon cette incarnation. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Stabiliser la réserve

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SOLIDUS SNAKE, préparer « Stabiliser la réserve » ; centre bas, main et fourreau orientés selon cette incarnation. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Stabiliser la réserve ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** finir l’arc de lame puis reprendre la garde sans traverser le corps. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Twin Blade Cross

Famille `blade`, ton `stylized` ; 220 ticks CQC ; phases actuelles : dash → crosscut → freeze → sheath. Appuis déclarés : Federal Hall — assaut / Double lame.

Plan 1 : SOLIDUS SNAKE sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Federal Hall — assaut / Double lame ». Plan 2 : armer la lame ou le membre de « Federal Hall — assaut / Double lame » et dégager son arc. Plan 3 : enchaîner des coupes lisibles avec angles distincts ; les impacts et les réactions suivent le fil de lame, sans ajout d’arme d’une autre incarnation. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : finir l’arc de lame puis reprendre la garde sans traverser le corps, pose de signature face à l’adversaire.

##### Tentacle Guillotine

Famille `blade`, ton `stylized` ; 238 ticks CQC ; phases actuelles : dash → crosscut → freeze → sheath. Appuis déclarés : Federal Hall — assaut / Tentacule balayante.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Federal Hall — assaut / Tentacule balayante » ; l’espace disponible doit être lisible. Plan 2 : armer la lame ou le membre de « Federal Hall — assaut / Tentacule balayante » et dégager son arc. Plan 3 : enchaîner des coupes lisibles avec angles distincts ; les impacts et les réactions suivent le fil de lame, sans ajout d’arme d’une autre incarnation. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : finir l’arc de lame puis reprendre la garde sans traverser le corps, arrêt du dispositif et retour au cadre d’ensemble.

##### Federal Hall End

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Federal Hall — assaut / Propulseur de l’exosquelette.

Plan 1 : approche jusqu’à la distance réelle de « Federal Hall — assaut / Propulseur de l’exosquelette », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Federal Hall — assaut / Propulseur de l’exosquelette », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : finir l’arc de lame puis reprendre la garde sans traverser le corps, prise de distance et maintien final.

##### Sons of Liberty

Famille `blade`, ton `stylized` ; 274 ticks CQC ; phases actuelles : dash → crosscut → freeze → sheath. Appuis déclarés : Federal Hall — assaut / Projection.

Plan 1 : après une observation ou un repli, SOLIDUS SNAKE reprend l’initiative par « Federal Hall — assaut / Projection ». Plan 2 : armer la lame ou le membre de « Federal Hall — assaut / Projection » et dégager son arc. Plan 3 : enchaîner des coupes lisibles avec angles distincts ; les impacts et les réactions suivent le fil de lame, sans ajout d’arme d’une autre incarnation. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : finir l’arc de lame puis reprendre la garde sans traverser le corps, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Aim is original MGS2 PS2 1:1 fidelity; approval is closest_supported illustrated 2D adaptation, never certified pixel/model/texture/animation 1:1.
- Konami game captures are180×116; original PS2 longplay recording640×448 is compressed/dark. Exact arm segment count, panel topology, glove/boot seams, sword guards/engravings and eyepatch strap routing cannot be certified.
- Original LEFT eye patch fixed anatomically: standard screen-right profile exposes near anatomical LEFT face with black patch; screen-left exposes near RIGHT face with open eye, left patch far/occluded. Earlier wrong-side left native was rejected and preserved. KO head rotation/side-lying changes projection; no absolute hidden-face strap reconstruction claim.
- Solidus silver hair and white beard/moustache follow official art and original game head. Native detail is painted and proportions vary slightly across the sheets.
- Upper-arm areas follow observed muted brown source areas. Compressed original captures do not resolve every skin-versus-flexible suit insert/material boundary; generated biceps/panels are illustrative, not material-certified.
- Exactly two carried high-frequency swords and two upper-back serpentine mechanical arms define full first-phase powered armor. The original boss sheds rear arms in its later phase. Current profile does not implement that phase transition and keeps full first-phase equipment during all authored moves, hit and KO.
- Twin cuts, leg sweep, mechanical-arm grapple, low arm sweep, airborne propulsion, guard/parry and reserve brace are authored Versus keyframes for ten existing moves. No original PS2 animation timing/skeleton/power/resource extraction or balance change is claimed.
- SpecialDown deploy is only the native action group name: the art shows an attached forward LOW rear-arm sweep, never a grenade or planted bomb. Light uses blade; special/heavy/super share double-sword cut; guard parry0/1/0, propulsion charge and reserve recover have explicit phases.
- No projectile move exists in actual current Solidus profile, so no muzzle/missile origin is invented. No permanent jet flames/energy or weapon beams painted into body sheets. Thruster active pose is a bounded authored movement; exact jet nozzle/particle origin not certified.
- All native PNGs remain byte-identical to image_gen originals; left/right generated independently, no flip, paint, crop, alpha edit or raster resizing. Imagegen edits for eye side/low attack direction/safe arm tip have preserved rejected predecessors and exact prompts.
- Nominal4×3 cells do not define reliable source crops: long blades/back arms can cross nominal lines while actual alpha48 components remain separate. All6 selected sheets have12 alpha48 major components and zero alpha48 border pixels. Some transparent RGB backgrounds/very low-alpha fringes remain natively; ordinary Canvas alpha and measured clip polygons govern runtime, not RGB-only viewer background.
- Upright scale suggestions measure head-to-boot bodies only; sword/back-arm extents and crouch/KO/jump never supply standing body height. B uses upright hit/brace body rather than overhead swords; C uses reserve upright phase. Integrator independently measures actual pivots, crop contours and fixed per-PNG scale.
- Reserve-brace and gait are illustrative; exact foot alternation, body/gear anatomy continuity and hidden-side strap geometry are not original PS2 motion certification. Runtime/mobile/camera/pose-phase validation is independently required.
- Integrator physically observed six complete native sheets. White-hair-to-boot source-height witnesses are measured inside the actual body component and exclude overhead swords/back-arm peaks; source pixel colors are inspection aids, not a claim of PS2 material certification.
- Body scale, sword guards, flexible brown inserts, arm segment topology, small hidden anatomical detail and all versus gestures are closest-supported illustrations; no original PS2 skeleton/timing/collision extraction is claimed.
- Gray RGB behind native alpha0 is invisible in actual Canvas. No raster image cleanup or pixel transformation is applied; measured rectangles and Canvas contours retain native full equipment without neighboring actors.
- Current profile retains first-phase arms during all states; original phase-two shedding is preserved as canonical research evidence but not represented by an invented gameplay transition.
- [Official original Konami PS2-era face/chest capture: LEFT-eye patch imageRIGHT, short white hair/beard, rounded shoulders/high collar, segmented dark armour.](https://www.konami.com/mg/archive/mgs2/english/chara/pic/pic_solidus01.gif) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Official original Konami PS2-era upperbody pose: high collar, shoulder/body panels, brown upper-arm areas. Lower legs/arms tips not completely visible.](https://www.konami.com/mg/archive/mgs2/english/chara/pic/pic_solidus02.gif) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original Konami publisher artwork shows white hair/facial identity, armored boots and cloak. CLOAK IS NOT combat phase1 equipment and is explicitly excluded from combat sheets.](https://www.konami.com/mg/archive/mgs2/english/chara/pic/chara_solidus.gif) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original PS2 rear body at Fortune confrontation: two upper-back dark segmented snake arms attached to upper back, shoulder/torso high collar. Arms partially extend beyond recording frame; later combat fills silhouette.](https://archive.org/download/PS2_Longplay_Metal_Gear_Solid_2_Sons_of_the_Liberty/PS2_Longplay_Metal_Gear_Solid_2_Sons_of_the_Liberty.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original PS2 front three-quarter Solidus: patched anatomical LEFT eye imageRIGHT, bare human white-haired head, gray high collar/chest/rounded shoulders, two dark upper-back arms.](https://archive.org/download/PS2_Longplay_Metal_Gear_Solid_2_Sons_of_the_Liberty/PS2_Longplay_Metal_Gear_Solid_2_Sons_of_the_Liberty.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original PS2 lower legs and armored boots in cinematic: segmented gray leg shells, ribbed knee joints, compact articulated toe/heel silhouettes. No bare feet.](https://archive.org/download/PS2_Longplay_Metal_Gear_Solid_2_Sons_of_the_Liberty/PS2_Longplay_Metal_Gear_Solid_2_Sons_of_the_Liberty.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original PS2 combat phase1 full body with attached serpentine back arms and narrow swords. Brown areas strongly colored by dark environment; fine panel/strap/tip details limited.](https://archive.org/download/PS2_Longplay_Metal_Gear_Solid_2_Sons_of_the_Liberty/PS2_Longplay_Metal_Gear_Solid_2_Sons_of_the_Liberty.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original PS2 phase1 combat from side/rear: two snake arms retained plus two swords in hands. Warm fire light does not establish literal orange costume.](https://archive.org/download/PS2_Longplay_Metal_Gear_Solid_2_Sons_of_the_Liberty/PS2_Longplay_Metal_Gear_Solid_2_Sons_of_the_Liberty.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__vamp

### VAMP — MGS2 / DEAD CELL

**Rôle :** Couteaux, mobilité et réparation plafonnée. **Profil :** `vamp`.

**Base présente dans le code :** Vamp MGS2 : couteaux et liaison d’ombre ; soin limité, sans vampirisme inventé.

**Incarnation à conserver :** Original MGS2 PS2 Vamp, uncoated filtration-pool boss

**État vérifié :** métadonnées natives avec limites. 72 régions source distinctes dans les deux directions ; groupes : idle, walk, guard, crouch, jump, blade, heavy, low, hit, ko, shoot, deploy, throw, recover, attack.

**Réemplois à examiner :** `heavy` = heavy, super ; `recover` = specialBack, utility.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `retro-msx`, `tuxedo`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** VAMP : posture souple, couteau et main libre distincts. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** acrobatie avec trajectoire et reprise d’appui ; aucune lévitation générique. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Couteaux, mobilité et réparation plafonnée » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder posture souple, couteau et main libre distincts.
- **jump_land :** VAMP : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. acrobatie avec trajectoire et reprise d’appui ; aucune lévitation générique. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de VAMP. Terminer par finir la rotation, contrôler la lame et reprendre la cible. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS2 / DEAD CELL », présentation de Original MGS2 PS2 Vamp, uncoated filtration-pool boss, puis posture souple, couteau et main libre distincts. Geste court lié à « Couteau lancé » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, finir la rotation, contrôler la lame et reprendre la cible ; VAMP vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS2 / DEAD CELL.
- **round_loss :** Proposition CQC : VAMP réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Danse des couteaux », revenir par finir la rotation, contrôler la lame et reprendre la cible, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Contact de lame

**Existant :** `melee` / `knife` ; 7/3/12 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VAMP, préparer « Contact de lame » ; posture souple, couteau et main libre distincts. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** finir la rotation, contrôler la lame et reprendre la cible. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Coupe engagée

**Existant :** `melee` / `knife` ; 18/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VAMP, préparer « Coupe engagée » ; posture souple, couteau et main libre distincts. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** finir la rotation, contrôler la lame et reprendre la cible. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VAMP, préparer « Balayage » ; posture souple, couteau et main libre distincts. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** finir la rotation, contrôler la lame et reprendre la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VAMP, préparer « Projection » ; posture souple, couteau et main libre distincts. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** finir la rotation, contrôler la lame et reprendre la cible. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Couteau lancé

**Existant :** `projectile` / `knife` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VAMP, préparer « Couteau lancé » ; posture souple, couteau et main libre distincts. Prélever l’objet correspondant à « Couteau lancé », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps.

**Retour.** finir la rotation, contrôler la lame et reprendre la cible. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Couteau d’ombre

**Existant :** `projectile` / `knife` ; 32/1/34 ticks ; groupe `deploy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VAMP, préparer « Couteau d’ombre » ; posture souple, couteau et main libre distincts. Prélever l’objet correspondant à « Couteau d’ombre », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps.

**Retour.** finir la rotation, contrôler la lame et reprendre la cible. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut ou garde basse ; ralentissement bref, aucune confiscation des commandes.

##### specialForward — Bond acrobatique

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `jump`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VAMP, préparer « Bond acrobatique » ; posture souple, couteau et main libre distincts. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Bond acrobatique » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** finir la rotation, contrôler la lame et reprendre la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Reconstituer les blessures

**Existant :** `heal` / `recovery` ; 45/1/38 ticks ; groupe `recover`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VAMP, préparer « Reconstituer les blessures » ; posture souple, couteau et main libre distincts. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Reconstituer les blessures ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** finir la rotation, contrôler la lame et reprendre la cible. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Ne restaure que les dégâts récupérables ; interrompre les 45 images de préparation.

##### super — Danse des couteaux

**Existant :** `melee` / `blade` ; 25/7/44 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VAMP, préparer « Danse des couteaux » ; posture souple, couteau et main libre distincts. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** finir la rotation, contrôler la lame et reprendre la cible. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Reprendre son souffle

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VAMP, préparer « Reprendre son souffle » ; posture souple, couteau et main libre distincts. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Reprendre son souffle ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** finir la rotation, contrôler la lame et reprendre la cible. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Shadow Knife

Famille `blade`, ton `stylized` ; 220 ticks CQC ; phases actuelles : dash → crosscut → freeze → sheath. Appuis déclarés : Danse des couteaux / Couteau lancé.

Plan 1 : VAMP sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Danse des couteaux / Couteau lancé ». Plan 2 : armer la lame ou le membre de « Danse des couteaux / Couteau lancé » et dégager son arc. Plan 3 : enchaîner des coupes lisibles avec angles distincts ; les impacts et les réactions suivent le fil de lame, sans ajout d’arme d’une autre incarnation. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : finir la rotation, contrôler la lame et reprendre la cible, pose de signature face à l’adversaire.

##### Immortal Dance

Famille `blade`, ton `stylized` ; 238 ticks CQC ; phases actuelles : dash → crosscut → freeze → sheath. Appuis déclarés : Danse des couteaux / Couteau d’ombre.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Danse des couteaux / Couteau d’ombre » ; l’espace disponible doit être lisible. Plan 2 : armer la lame ou le membre de « Danse des couteaux / Couteau d’ombre » et dégager son arc. Plan 3 : enchaîner des coupes lisibles avec angles distincts ; les impacts et les réactions suivent le fil de lame, sans ajout d’arme d’une autre incarnation. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : finir la rotation, contrôler la lame et reprendre la cible, arrêt du dispositif et retour au cadre d’ensemble.

##### Waterline Execution

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Danse des couteaux / Bond acrobatique.

Plan 1 : approche jusqu’à la distance réelle de « Danse des couteaux / Bond acrobatique », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Danse des couteaux / Bond acrobatique », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : finir la rotation, contrôler la lame et reprendre la cible, prise de distance et maintien final.

##### Dead Cell Requiem

Famille `blade`, ton `stylized` ; 274 ticks CQC ; phases actuelles : dash → crosscut → freeze → sheath. Appuis déclarés : Danse des couteaux / Projection.

Plan 1 : après une observation ou un repli, VAMP reprend l’initiative par « Danse des couteaux / Projection ». Plan 2 : armer la lame ou le membre de « Danse des couteaux / Projection » et dégager son arc. Plan 3 : enchaîner des coupes lisibles avec angles distincts ; les impacts et les réactions suivent le fil de lame, sans ajout d’arme d’une autre incarnation. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : finir la rotation, contrôler la lame et reprendre la cible, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Closest supported original2001MGS2PS2 illustrated adaptation, never absolute pixel/model/material/skeletal 1:1 certified. Full original PS2 native640x448 capture plus official face artwork physically viewed; evidence remains available byteexact.
- Selected costume is UNCOATED FILTRATION-POOL BOSS. Original early-StrutB green longcoat art/capture preserved as DIFFERENT costume, used only for face/weapon identity. No MGS4 or Rising costume.
- Chest source shows horizontal scars, not assumed tattoo. One anatomicalRIGHT lower-abdomen bulletmark and centered forehead mark selected from originalpool cutscene; opposing-side obscured scar/glove/pouch construction remains partly interpreted. No additional bilateral abdomen wounds approved.
- Throwing weapon handedness cannot be conclusively certified from isolated source5454 closeup (hand/forearm only). Authored versus rig consistently intends anatomicalRIGHT knife/release hand in both independently generated views; original character can wield knives in both hands. This is not a claim of exclusive canonical handedness.
- Boot laces, hidden belt/sheath construction, glove seam/fingertip exposure and exact number of blade grooves partly unresolved in compressed PS2 captures. Rendered restrained closest-supported practical details, not 1:1 certification of hidden surfaces.
- Body material colors neutralize green room illumination to pale skin/olivebrown suspender/charcoal trouser/black gloves; original PS2 scene lighting is not baked into sprite.
- All72 action keyframes are authored versus adaptations, not extracted original PS2 animations; actual engine10move timings/costs/collision remain authoritative. B0..2 knife contact, B3..5 cut, B6..8 LOW BOOT sweep; C0..2 HIGH knife throw and C3..5 LOW knife throw deliberately distinct. C6..8 physical grapple; C9..11 bounded repair/recovery empty hands, no vampiric magic aura.
- Both independent facings six different native files. No mirroring, recoloring, resizing, alpha manipulation or pixel edits performed outside image_gen. Geometry and Canvas rendering contours only inspect/crop original bytes.
- Standing scale remains constant per PNG. Low throw/crouch/KO are smaller body postures and must never be stretched to upright height. Current source measured release fingers high~200world and low~80-100world withdisplay230; integrator independently confirms exact crop/pivot/scale.
- No detached projectile baked into body atlases; high/low ACTIVE launch hands EMPTY at finger-release point. Projectile knife is separate native prop sheet handled by root; no firearm or imaginary aura.
- Rejected native attempts preserved: A-left1/2 merged guard/jump components; A-left1 additionally jump held unrequested knives; B-left1 mixed facings; B-left2 active low boot wrong face; B-left3 low face corrected but opacity hit image bottom; B-left4 extra second left-abdomen mark; B-left5 correct single-right mark and margins. C-left1/2 RGB-under-zero-alpha looks brown in a rawRGB viewer, but browser alpha actually removes it; C-left2 accepted after actualchecker render.
- Producer review covers source art/fidelity and nativealpha measurements; importer/independent integrator must confirm runtime/mobile/move-phase scaling. Approval is closest_supported source-specific art, not an automatic canon certificate.
- Original PS2 uncoated pool boss selected. Knife near-base geometry/finger/lace details and opposed rig handedness remain supported interpretation, not absolute source pixel/model certification.
- Fixed standing witness height per source; crouching low knife release never stretches to standing height. The source crop preserves attached limbs/knife, optional source-derived contour excludes another pose only.
- Authored 72 poses map all ten real CQC slots with phaseMap. Jump uses two authored airborne poses, recovery/heal without magic effects; high/low projectile release hands are empty, native knife prop handled separately by root.
- [Original PS2 pool boss face, black slicked/nape hair, angular moustache goatee, centered forehead wound, horizontal chest scars and brown suspenders; torso bare, no coat.](https://archive.org/download/PS2_Longplay_Metal_Gear_Solid_2_Sons_of_the_Liberty/PS2_Longplay_Metal_Gear_Solid_2_Sons_of_the_Liberty.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original PS2 pool boss front torso/hips/knife banks, long dark trousers. Feet below subtitle partly occluded; not sole boot construction proof.](https://archive.org/download/PS2_Longplay_Metal_Gear_Solid_2_Sons_of_the_Liberty/PS2_Longplay_Metal_Gear_Solid_2_Sons_of_the_Liberty.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original PS2 pool boss bare upper arms, black glove/forearm cuffs, brown shoulder fittings and two hip knife banks.](https://archive.org/download/PS2_Longplay_Metal_Gear_Solid_2_Sons_of_the_Liberty/PS2_Longplay_Metal_Gear_Solid_2_Sons_of_the_Liberty.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original PS2 frontal lower abdomen confirms ONE round dark mark on anatomical RIGHT (image LEFT); chest has horizontal scars, not tattoo. Extra bilateral mark rejected during generation.](https://archive.org/download/PS2_Longplay_Metal_Gear_Solid_2_Sons_of_the_Liberty/PS2_Longplay_Metal_Gear_Solid_2_Sons_of_the_Liberty.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original PS2 low camera shows pool boss dark trousers and visible dark lowprofile boot/foot; exact lace topology not resolved.](https://archive.org/download/PS2_Longplay_Metal_Gear_Solid_2_Sons_of_the_Liberty/PS2_Longplay_Metal_Gear_Solid_2_Sons_of_the_Liberty.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original PS2 actual pool boss acrobatic fight, uncoated silhouette and vertical mobility; native authored versus poses do not claim original PS2 animation reproduction.](https://archive.org/download/PS2_Longplay_Metal_Gear_Solid_2_Sons_of_the_Liberty/PS2_Longplay_Metal_Gear_Solid_2_Sons_of_the_Liberty.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original PS2 StrutB close knife: elongated silver spearpoint/doubleedge blade with short row of nearbase grooves/notches on upper edge, dark grip mostly hidden in black glove. Early coat costume deliberately excluded from pool boss body; weapon-only source.](https://archive.org/download/PS2_Longplay_Metal_Gear_Solid_2_Sons_of_the_Liberty/PS2_Longplay_Metal_Gear_Solid_2_Sons_of_the_Liberty.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Official MGS2 Vamp green-long-coat artwork establishes face/hair identity only. Long coat is DIFFERENT early-Plant costume and excluded from selected shirtless pool-boss body sheets.](https://www.konami.com/mg/archive/mgs2/art/pic/c/c_10.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__fortune

### FORTUNE — MGS2 / DEAD CELL

**Rôle :** Railgun et déviation bornée. **Profil :** `fortune`.

**Base présente dans le code :** Railgun et déviation des projectiles ; protection limitée pour préserver un duel gagnable.

**Incarnation à conserver :** Original PS2 Fortune in-game no-coat costume and RG-590 railgun

**État vérifié :** métadonnées natives avec limites. 72 régions source distinctes dans les deux directions ; groupes : idle, walk, guard, crouch, jump, punch, heavy, low, hit, ko, throw, shoot, optic, recover, attack.

**Réemplois à examiner :** `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `tuxedo`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** FORTUNE : railgun de Fortune, posture de tir et équipement distincts. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** déplacement qui porte la masse de l’arme, pas de tir sans préparation. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Railgun et déviation bornée » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder railgun de Fortune, posture de tir et équipement distincts.
- **jump_land :** FORTUNE : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. déplacement qui porte la masse de l’arme, pas de tir sans préparation. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de FORTUNE. Terminer par recul et stabilisation de l’arme longue. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS2 / DEAD CELL », présentation de Original PS2 Fortune in-game no-coat costume and RG-590 railgun, puis railgun de Fortune, posture de tir et équipement distincts. Geste court lié à « Railgun » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, recul et stabilisation de l’arme longue ; FORTUNE vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS2 / DEAD CELL.
- **round_loss :** Proposition CQC : FORTUNE réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Fortune — salve finale », revenir par recul et stabilisation de l’arme longue, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FORTUNE, préparer « Jab » ; railgun de Fortune, posture de tir et équipement distincts. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul et stabilisation de l’arme longue.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FORTUNE, préparer « Frappe engagée » ; railgun de Fortune, posture de tir et équipement distincts. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** recul et stabilisation de l’arme longue.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FORTUNE, préparer « Balayage » ; railgun de Fortune, posture de tir et équipement distincts. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** recul et stabilisation de l’arme longue.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FORTUNE, préparer « Projection » ; railgun de Fortune, posture de tir et équipement distincts. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recul et stabilisation de l’arme longue. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Railgun

**Existant :** `projectile` / `rail` ; 51/1/48 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FORTUNE, préparer « Railgun » ; railgun de Fortune, posture de tir et équipement distincts. Montrer la prise et la visée de l’arme décrite par « Railgun » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** recul et stabilisation de l’arme longue. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Se baisser ou punir la préparation ; le rayon ne suit pas un déplacement après départ.

##### specialDown — Champ de déviation

**Existant :** `buff` / `shield` ; 18/1/27 ticks ; groupe `guard`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FORTUNE, préparer « Champ de déviation » ; railgun de Fortune, posture de tir et équipement distincts. Montrer la préparation corporelle ou mécanique de « Champ de déviation ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** recul et stabilisation de l’arme longue. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Deux projectiles frontaux maximum ; le corps à corps et les saisies restent efficaces.

##### specialForward — Fixer la ligne de tir

**Existant :** `mark` / `recon` ; 26/1/30 ticks ; groupe `optic`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FORTUNE, préparer « Fixer la ligne de tir » ; railgun de Fortune, posture de tir et équipement distincts. Orienter regard, optique ou terminal vers la cible observée, sans consulter une action future.

**Action.** Pour « Fixer la ligne de tir », déclencher lecture/repérage avec un petit geste ou changement d’optique et un indicateur séparé. Le corps doit rester visible et vulnérable selon les données de combat.

**Retour.** recul et stabilisation de l’arme longue. Couper le signal ou abaisser l’outil ; retour vers l’adversaire sans nouvelle arme inventée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Portée limitée ; le marquage ne vise ni à travers toute l’arène ni automatiquement.

##### specialBack — Repositionnement

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `crouch`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FORTUNE, préparer « Repositionnement » ; railgun de Fortune, posture de tir et équipement distincts. Préparer l’appui qui produit le déplacement ; déplacement qui porte la masse de l’arme, pas de tir sans préparation.

**Action.** Exécuter « Repositionnement » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** recul et stabilisation de l’arme longue. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Fortune — salve finale

**Existant :** `projectile` / `rail` ; 55/1/50 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FORTUNE, préparer « Fortune — salve finale » ; railgun de Fortune, posture de tir et équipement distincts. Montrer la prise et la visée de l’arme décrite par « Fortune — salve finale » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** recul et stabilisation de l’arme longue. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Préparation longue et trait de visée ; accroupissement ou esquive latérale.

##### utility — Stabiliser la réserve

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FORTUNE, préparer « Stabiliser la réserve » ; railgun de Fortune, posture de tir et équipement distincts. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Stabiliser la réserve ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** recul et stabilisation de l’arme longue. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Railgun Miracle

Famille `sniper`, ton `stylized` ; 220 ticks CQC ; phases actuelles : mark → steady → shot → fade. Appuis déclarés : Fortune — salve finale / Railgun.

Plan 1 : FORTUNE sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Fortune — salve finale / Railgun ». Plan 2 : présenter l’arme effectivement associée à « Fortune — salve finale / Railgun », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : recul et stabilisation de l’arme longue, pose de signature face à l’adversaire.

##### Dead Cell Destiny

Famille `sniper`, ton `stylized` ; 238 ticks CQC ; phases actuelles : mark → steady → shot → fade. Appuis déclarés : Fortune — salve finale / Champ de déviation.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Fortune — salve finale / Champ de déviation » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Fortune — salve finale / Champ de déviation », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : recul et stabilisation de l’arme longue, arrêt du dispositif et retour au cadre d’ensemble.

##### Lucky Break

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Fortune — salve finale / Fixer la ligne de tir.

Plan 1 : approche jusqu’à la distance réelle de « Fortune — salve finale / Fixer la ligne de tir », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Fortune — salve finale / Fixer la ligne de tir », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : recul et stabilisation de l’arme longue, prise de distance et maintien final.

##### Lady Luck

Famille `sniper`, ton `stylized` ; 274 ticks CQC ; phases actuelles : mark → steady → shot → fade. Appuis déclarés : Fortune — salve finale / Projection.

Plan 1 : après une observation ou un repli, FORTUNE reprend l’initiative par « Fortune — salve finale / Projection ». Plan 2 : présenter l’arme effectivement associée à « Fortune — salve finale / Projection », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : recul et stabilisation de l’arme longue, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Target is 1:1 original 2001 Metal Gear Solid 2 PS2 Fortune, accepted closest supported illustrated 2D adaptation; no absolute pixel, texture, polygon or animation certification.
- Selected costume is original in-game sleeveless navy high-neck tactical one-piece, olive harness/belt, bare thighs, right thigh holster, fingerless gloves and mid-calf boots WITHOUT the coat seen in official concept art. Concept art is identity support only; original screenshots and original PS2 longplay confirm the in-game costume.
- Original Konami game captures are only 180x116, LP original-game captures are compressed 640x480 with recording hardware unconfirmed, and original PS2 longplay frame is 640x448. Exact blue, olive, skin, small collar marking and boot/harness seam colors/geometries cannot be certified.
- Original source screenshots clearly show anatomical RIGHT thigh holster. Right-facing art uses a frontal three-quarter body; left-facing uses an independently generated rear three-quarter body so the right forearm and right thigh can stay on the near camera side. Two early left sheets with ambiguous/wrong holster projection are rejected and preserved; the final left correction moves holster to foreground right thigh. Perspective and twist during melee are authored approximations, not game-extracted joint data.
- One original industrial box-like MGS2 railgun is retained per pose. Rectangular receiver/front assembly and original block-like top sight are closest illustrated silhouettes; exact rail count, receiver screws, labels, dimensions and complete mechanical topology are not certified. The front rectangle is somewhat compressed to fit sprite cells, never a PSG1/sniper rifle/MGS4 substitution.
- No permanent beam, laser accessory, muzzle flash, projectile, electric orb or floating props are baked into body sheets. Existing Versus aim line and timed shot rendering remain runtime telegraphs/effects, not source-certified equipment.
- The engine labels raw weapon class sniper for its gameplay profile; this delivery draws Fortune's original railgun. No raw roster/profile timing, damage, resource cost or moves are modified by this delivery.
- 72 authored fighting keyframes cover ten gameplay slots via groups. Jab, elbow, sweep, grapple, crouch retreat, jump, guard, hit and KO are Versus adaptations, not original Fortune boss animations. Free-hand melee varies its initiating hand between illustrations; hand choice during these fictional normal attacks is not canonical animation evidence.
- Recover poses only inspect/stabilize the intact railgun; they depict the existing gameplay reserve recovery and DO NOT invent a detachable battery, magazine reload, normal bullet box or new charging hardware.
- The original scene firing evidence supports a heavy two-hand cannon; exact right trigger and left lower grip posture is illustrative and cannot be certified from compressed weapon closeups. Foreground right trigger/support arm connection has been physically reviewed in both independent C sheets.
- Walk indices are visually distinct and preserve four source drawings, but exact alternating anatomical contact foot, loop gait, interpolated timing and frame-to-frame proportions are not certified.
- All source PNG bytes are native imagegen output. No mirroring, raster painting, resampling, alpha cleanup, cropping or resizing is applied to native source files. Imagegen A-left correction is a separate preserved native generation; rejected natives are unchanged.
- Nominal 4x3 cells are descriptions, not runtime crop rectangles. Some intact bodies/guns extend across nominal grid lines; runtime integrator must measure isolated alpha contours, pivots, upright scale and neighboring fragment exclusion. Twelve major alpha48 components and zero alpha48 sheet-edge pixels are verified in each selected sheet; this does not alone certify every soft fringe or runtime crop.
- Tiny red/yellow-looking antialias fringes visible in native viewer remain untouched; no canonical red clothing/equipment element is claimed. Opacity and contour QA remains independent at integration.
- PS2 longplay was sampled remotely; only selected local PNG SHA256 is verified. Full 3.1 GB video has not been downloaded and no local full-video SHA is claimed.
- Meryl style-only source and generated Fortune continuity sheets are excluded from canonical evidence. This exact UID is original MGS2 Fortune only; other characters, stages and versions remain untouched.
- Final artistic review is approved closest supported. Runtime crop/scale/frame-phase/projectile origin/browser collision verification belongs to root and sprite integrator and is pending in this isolated source delivery.
- Integrator physically inspected all six original PNGs and selected source references. Illustrative body proportions, all new versus motions, tiny weapon/harness/boot/finger detail and compressed source colors remain closest supported, not pixel-exact original model extraction.
- Fixed upright source scale is observed separately for each independent sheet; low, jump and KO poses retain their true native relative crop height. Complete alpha crops use source-contour rendering only; original image bytes remain unchanged.
- Ground/body pivots use the established measured native alpha-body/pelvis heuristic; no previous entry, source PNG, group whitelist, renderer or importer is changed. Projectiles remain separate timed gameplay effects with independently validated measured muzzle points.
- [Original official Fortune concept art: blonde hair/face/olive gear/one-piece and boots. Coat is a different concept layer and excluded from selected original in-game no-coat costume.](https://www.konami.com/mg/archive/mgs2/english/chara/pic/chara_fortune.gif) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Official original PS2 boss screenshot: original block-like industrial railgun horizontal silhouette, top sight/block, sleeveless navy torso and brown arms.](https://www.konami.com/mg/archive/mgs2/english/chara/pic/pic_fortune01.gif) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Official original PS2 face: brown skin, blue eyes, blonde wavy swept-back hair and raised navy collar.](https://www.konami.com/mg/archive/mgs2/english/chara/pic/pic_fortune02.gif) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original game frontal face/chest: brown skin, blonde temple forelocks, sleeveless high navy collar U.S.NAVY and olive shoulder harness.](https://lparchive.org/Metal-Gear-Solid-2-(Screenshot)/Update%2032/mgs2_132_a01.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original game frontal waist and thighs: high-cut navy one-piece, bare brown thighs, olive belt/gear and holster strapped on anatomical right thigh (image left).](https://lparchive.org/Metal-Gear-Solid-2-(Screenshot)/Update%2032/mgs2_139_3bf.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original-game contextual screenshot, physically inspected; Fortune may be small or body obstructed. No extra pixel/model claim.](https://lparchive.org/Metal-Gear-Solid-2-(Screenshot)/Update%2032/mgs2_143_2f0.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original-game contextual screenshot, physically inspected; Fortune may be small or body obstructed. No extra pixel/model claim.](https://lparchive.org/Metal-Gear-Solid-2-(Screenshot)/Update%2032/mgs2_213_662.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original-game contextual screenshot, physically inspected; Fortune may be small or body obstructed. No extra pixel/model claim.](https://lparchive.org/Metal-Gear-Solid-2-(Screenshot)/Update%2010/mgs2_32_de7.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__fatman

### FATMAN — MGS2 / DEAD CELL

**Rôle :** Rollers, explosifs posés et pistolet. **Profil :** `fatman`.

**Base présente dans le code :** C4, pistolet et rollers ; deux charges visibles maximum.

**Incarnation à conserver :** Original MGS2 PS2 Fatman / Dead Cell

**État vérifié :** métadonnées natives avec limites. 72 régions source distinctes dans les deux directions ; groupes : idle, walk, guard, crouch, jump, punch, heavy, low, hit, ko, throw, shoot, deploy, optic, reload, charge, attack.

**Réemplois à examiner :** pas de groupe natif partagé observé dans cette extraction.

**Techniques pointant sur une seule région native dans la direction principale :** specialForward. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** FATMAN : patins, tenue lourde, bombe et pistolet du profil Fatman. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** glisse sur roulettes avec poussée et freinage, pas marche de soldat. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Rollers, explosifs posés et pistolet » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder patins, tenue lourde, bombe et pistolet du profil Fatman.
- **jump_land :** FATMAN : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. glisse sur roulettes avec poussée et freinage, pas marche de soldat. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de FATMAN. Terminer par inertie des patins puis rotation contrôlée. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS2 / DEAD CELL », présentation de Original MGS2 PS2 Fatman / Dead Cell, puis patins, tenue lourde, bombe et pistolet du profil Fatman. Geste court lié à « Glock de couverture » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, inertie des patins puis rotation contrôlée ; FATMAN vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS2 / DEAD CELL.
- **round_loss :** Proposition CQC : FATMAN réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Lancer de C4 — adaptation », revenir par inertie des patins puis rotation contrôlée, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FATMAN, préparer « Jab » ; patins, tenue lourde, bombe et pistolet du profil Fatman. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** inertie des patins puis rotation contrôlée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FATMAN, préparer « Frappe engagée » ; patins, tenue lourde, bombe et pistolet du profil Fatman. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** inertie des patins puis rotation contrôlée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FATMAN, préparer « Balayage » ; patins, tenue lourde, bombe et pistolet du profil Fatman. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** inertie des patins puis rotation contrôlée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FATMAN, préparer « Projection » ; patins, tenue lourde, bombe et pistolet du profil Fatman. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** inertie des patins puis rotation contrôlée. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Glock de couverture

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FATMAN, préparer « Glock de couverture » ; patins, tenue lourde, bombe et pistolet du profil Fatman. Montrer la prise et la visée de l’arme décrite par « Glock de couverture » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** inertie des patins puis rotation contrôlée. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Pain de C4

**Existant :** `trap` / `explosive` ; 30/1/36 ticks ; groupe `deploy`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FATMAN, préparer « Pain de C4 » ; patins, tenue lourde, bombe et pistolet du profil Fatman. Prendre le dispositif, s’abaisser vers le support et indiquer le lieu de pose avant activation.

**Action.** Poser « Pain de C4 » au point réel de main/outil, armer puis retirer le membre. Le dispositif possède ensuite son propre sprite, ses états attente/armement/déclenchement/destruction et sa collision.

**Retour.** inertie des patins puis rotation contrôlée. Se dégager de l’objet sans le téléporter ; l’interruption avant armement a sa propre sortie.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pose et amorçage visibles ; sauter ou détruire la mine par une attaque. Deux maximum.

##### specialForward — Détonateur

**Existant :** `detonate` / `explosive` ; 12/1/28 ticks ; groupe `optic`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FATMAN, préparer « Détonateur » ; patins, tenue lourde, bombe et pistolet du profil Fatman. Montrer la commande ou le geste de déclenchement, avec le dispositif déjà présent.

**Action.** Déclencher uniquement les objets admissibles ; la réaction du corps accompagne la commande, tandis que chaque explosion garde son centre et son sprite propres.

**Retour.** inertie des patins puis rotation contrôlée. Baisser la commande et retrouver la garde ; ne pas créer une nouvelle mine par le geste seul.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Détruire ou éviter les charges posées avant la commande.

##### specialBack — Rollers

**Existant :** `mobility` / `movement` ; 7/18/25 ticks ; groupe `walk`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FATMAN, préparer « Rollers » ; patins, tenue lourde, bombe et pistolet du profil Fatman. Préparer l’appui qui produit le déplacement ; glisse sur roulettes avec poussée et freinage, pas marche de soldat.

**Action.** Exécuter « Rollers » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 8 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** inertie des patins puis rotation contrôlée. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : La silhouette reste touchable ; la sortie est punissable.

##### super — Lancer de C4 — adaptation

**Existant :** `projectile` / `explosive` ; 35/1/44 ticks ; groupe `charge`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FATMAN, préparer « Lancer de C4 — adaptation » ; patins, tenue lourde, bombe et pistolet du profil Fatman. Prélever l’objet correspondant à « Lancer de C4 — adaptation », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. La salve contient 3 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ. L’objet conserve sa mèche de 48 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** inertie des patins puis rotation contrôlée. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Trois charges de C4 lancées pour le versus ; trajectoires, délai et dégâts adaptés. Éviter les arcs et punir la préparation.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de FATMAN, préparer « Recharger » ; patins, tenue lourde, bombe et pistolet du profil Fatman. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** inertie des patins puis rotation contrôlée. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### C4 Double Lock

Famille `explosive`, ton `stylized` ; 220 ticks CQC ; phases actuelles : plant → retreat → blast → pose. Appuis déclarés : Lance d’explosifs / Glock de couverture.

Plan 1 : FATMAN sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Lance d’explosifs / Glock de couverture ». Plan 2 : montrer la pose/trajectoire et le délai de « Lance d’explosifs / Glock de couverture ». Plan 3 : déclencher au véritable point de dispositif ; poussière, débris et réaction de cible restent indépendants du corps de l’attaquant. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : inertie des patins puis rotation contrôlée, pose de signature face à l’adversaire.

##### Laugh and Roll

Famille `ballistic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Lance d’explosifs / Pain de C4.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Lance d’explosifs / Pain de C4 » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Lance d’explosifs / Pain de C4 », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : inertie des patins puis rotation contrôlée, arrêt du dispositif et retour au cadre d’ensemble.

##### Big Shell Countdown

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Lance d’explosifs / Détonateur.

Plan 1 : approche jusqu’à la distance réelle de « Lance d’explosifs / Détonateur », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Lance d’explosifs / Détonateur », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : inertie des patins puis rotation contrôlée, prise de distance et maintien final.

##### Bomb Disposal Failed

Famille `explosive`, ton `stylized` ; 274 ticks CQC ; phases actuelles : plant → retreat → blast → pose. Appuis déclarés : Lance d’explosifs / Projection.

Plan 1 : après une observation ou un repli, FATMAN reprend l’initiative par « Lance d’explosifs / Projection ». Plan 2 : montrer la pose/trajectoire et le délai de « Lance d’explosifs / Projection ». Plan 3 : déclencher au véritable point de dispositif ; poussière, débris et réaction de cible restent indépendants du corps de l’attaquant. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : inertie des patins puis rotation contrôlée, rangement/pose finale différente des trois autres.

#### Limites et preuves

- closest_supported adaptation with a 1:1 target; not certified pixel-for-pixel restoration or source-exact original animation frames.
- Published original Konami concept art plus explicitly labelled original PS2 recording govern the olive/gray bomb suit, huge collar/belly, bald pale head, bare hands and black four-wheel yellow inline rollers. Concept art has lighter olive/tan rendering while in-game suit looks darker/green under scene lighting; chosen palette follows conservative official art, not a claim of console RGB identity.
- Fine clothing seams/pouch faces, strap positions, fingernails, roller chassis details, hidden back surfaces, exact physical height and all limb animation curves are source-limited. No extra insignia, helmet, gas mask, gloves, modern body armor, rockets or powers asserted.
- Glock-type short black automatic pistol and anatomical LEFT-hand aim are supported by the actual MGS2 screenshot front pose with raised image-right arm. Player weapon occludes some central fingers and exact grip; exact Glock18C markings/slide vent geometry are not certified and no legible manufacturer/model marks are invented.
- The machine-pistol is visible only in active shoot and two reload poses; draw/recovery use concealed-gun body settling to keep left-hand continuity. The final two native directions were independently generated: screen-left firing is torso nearly frontal with anatomical LEFT arm crossing in front of chest, rather than raster-flipping the right sheet.
- C4 uses rectangular olive/gray brick, dark bands and small red status module from physically viewed PS2 regular bomb plus supplementary original screenshot. Published views do not establish every hidden side seam/module depth or exact red indicator behavior. No spherical frag grenade/launcher and no readable wrapper text invented.
- Original boss uses placed C4 and a pistol. Super overarm throws of C4 are an explicit existing CQC Versus balance adaptation; no claim that original PS2 Fatman throws three C4 bricks or has those attack timings. Root preserves damage, resource, fuse and physics while correcting visual identity.
- Punches/body check/sweep/grapple/guard/jump/reload poses, skating special timing, remote detonator pose and C4 right-hand placement/throw are authored CQC simulation action choreography. Sources do not provide 72 native 2D fighting poses or certify unique handedness for bomb placement/remote button use. LEFT pistol handedness remains consistent.
- One-/two-frame groups map the three engine phases explicitly and honestly: throw/deploy/charge repeat a real frame during recovery; optic is a single actual detonation-command pose reused for all phases. Reload uses two genuine distinct magazine actions. No invented third image or duplicated source pose counted as extra authored art.
- All body sheets have twelve alpha-separated dominant complete figures and no alpha>80 edge pixels. Some expanded native bounds intersect neighboring grid regions; source-derived Canvas alpha-contour clipping is required as documented, not destructive source cropping. Native PNG bytes unchanged.
- Integration displayHeight240 and six fixed source upright heights are practical simulation scale suggestions, not source-certified centimeters. Integrator must verify runtime hurtbox/body relationship, both facings and source-frame crops.
- All rejected art/prompts and unselected reference-seek frames are retained. The two C-right rejected sheets switched pistol grip to right hand; neither is imported. Direct downloads that returned age gates/errors were not used as reference.
- Generated illustrated poses preserve original body/gear target, not a certified pixel or model restoration. Hidden seam, exact grip, hand use for C4 and roller gait remain source-limited.
- Each source has its own fixed upright head-to-skate scale. A crouch, kick, aerial, lying or raised-hand pose never sets the standing scale.
- Existing CQC super throws C4 as documented adaptation; original boss places bombs and uses pistol. One-/two-frame actions map startup/active/recovery to actual existing frames; aliases and phase repetitions do not increase authored72 count.
- [Référence déclarée](https://www.konami.com/mg/archive/mgs2/english/chara/pic/chara_fatman.gif) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Référence déclarée](https://archive.org/download/PS2_Longplay_Metal_Gear_Solid_2_Sons_of_the_Liberty/PS2_Longplay_Metal_Gear_Solid_2_Sons_of_the_Liberty.mp4#t=10100) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Référence déclarée](https://archive.org/download/PS2_Longplay_Metal_Gear_Solid_2_Sons_of_the_Liberty/PS2_Longplay_Metal_Gear_Solid_2_Sons_of_the_Liberty.mp4#t=10180) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Référence déclarée](https://archive.org/download/PS2_Longplay_Metal_Gear_Solid_2_Sons_of_the_Liberty/PS2_Longplay_Metal_Gear_Solid_2_Sons_of_the_Liberty.mp4#t=10380) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Référence déclarée](https://archive.org/download/PS2_Longplay_Metal_Gear_Solid_2_Sons_of_the_Liberty/PS2_Longplay_Metal_Gear_Solid_2_Sons_of_the_Liberty.mp4#t=10400) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Référence déclarée](https://archive.org/download/PS2_Longplay_Metal_Gear_Solid_2_Sons_of_the_Liberty/PS2_Longplay_Metal_Gear_Solid_2_Sons_of_the_Liberty.mp4#t=10253) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Référence déclarée](https://archive.org/download/PS2_Longplay_Metal_Gear_Solid_2_Sons_of_the_Liberty/PS2_Longplay_Metal_Gear_Solid_2_Sons_of_the_Liberty.mp4#t=10256) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Référence déclarée](https://lparchive.org/Metal-Gear-Solid-2-(Screenshot)/Update%2017/mgs2_20_615.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__ocelot_mgs1

### REVOLVER OCELOT — MGS1 / FOXHOUND

**Rôle :** Six coups et ricochet limité. **Profil :** `ocelot`.

**Base présente dans le code :** Six cartouches de revolver et ricochet réel ; recharge interrompable.

**Incarnation à conserver :** MGS1 Revolver Ocelot before hand amputation: tan duster, red scarf, cartridge bandolier and one silver Colt Single Action Army; both hands intact

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `shoot` = special, specialDown, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `tuxedo`, `metalgear`, `retro-msx`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** REVOLVER OCELOT : poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas latéraux et regard indépendant des rotations d’arme. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Six coups et ricochet limité » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder poignets, revolvers et étuis propres à cet âge ; manipulation identifiable.
- **jump_land :** REVOLVER OCELOT : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas latéraux et regard indépendant des rotations d’arme. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de REVOLVER OCELOT. Terminer par replacer chaque arme sans changer sa main ni téléporter les cartouches. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS1 / FOXHOUND », présentation de MGS1 Revolver Ocelot before hand amputation: tan duster, red scarf, cartridge bandolier and one silver Colt Single Action Army; both hands intact, puis poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Geste court lié à « Single Action Army » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, replacer chaque arme sans changer sa main ni téléporter les cartouches ; REVOLVER OCELOT vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS1 / FOXHOUND.
- **round_loss :** Proposition CQC : REVOLVER OCELOT réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Six coups », revenir par replacer chaque arme sans changer sa main ni téléporter les cartouches, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de REVOLVER OCELOT, préparer « Jab » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de REVOLVER OCELOT, préparer « Frappe engagée » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de REVOLVER OCELOT, préparer « Balayage » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de REVOLVER OCELOT, préparer « Projection » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Single Action Army

**Existant :** `projectile` / `precision` ; 15/1/24 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de REVOLVER OCELOT, préparer « Single Action Army » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Montrer la prise et la visée de l’arme décrite par « Single Action Army » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. Prévoir le ricochet comme événement de l’objet ; le corps ne se réoriente pas automatiquement vers la cible.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Six munitions puis recharge ; le ricochet rebondit une fois, pas de tir infini.

##### specialDown — Tir bas

**Existant :** `projectile` / `ballistic` ; 23/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de REVOLVER OCELOT, préparer « Tir bas » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Montrer la prise et la visée de l’arme décrite par « Tir bas » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialForward — Pas de côté

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `walk`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de REVOLVER OCELOT, préparer « Pas de côté » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Préparer l’appui qui produit le déplacement ; pas latéraux et regard indépendant des rotations d’arme.

**Action.** Exécuter « Pas de côté » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### specialBack — Crosse de contre

**Existant :** `parry` / `counter` ; 3/10/29 ticks ; groupe `parry`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de REVOLVER OCELOT, préparer « Crosse de contre » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Présenter la surface ou l’organe de parade et maintenir une fenêtre courte lisible.

**Action.** Recevoir puis dévier au contact réel pour « Crosse de contre » ; la riposte et son effet n’apparaissent qu’après succès. Une attente sans contact garde une pose différente du contre réussi.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches. Séparer sortie ratée, blocage simple et riposte ; aucun effet de réussite avant collision.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Retarder la frappe, projeter ou attendre les 29 images de récupération.

##### super — Six coups

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de REVOLVER OCELOT, préparer « Six coups » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Montrer la prise et la visée de l’arme décrite par « Six coups » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Exige six cartouches et 50 TACTIC. Accroupissement sous les tirs hauts, saut ou interruption avant départ ; aucun rechargement gratuit.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de REVOLVER OCELOT, préparer « Recharger » ; poignets, revolvers et étuis propres à cet âge ; manipulation identifiable. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** replacer chaque arme sans changer sa main ni téléporter les cartouches. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Sixième chambre

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Six coups / Single Action Army.

Plan 1 : REVOLVER OCELOT sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Six coups / Single Action Army ». Plan 2 : présenter l’arme effectivement associée à « Six coups / Single Action Army », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : replacer chaque arme sans changer sa main ni téléporter les cartouches, pose de signature face à l’adversaire.

##### Ricochet terminal

Famille `sniper`, ton `stylized` ; 238 ticks CQC ; phases actuelles : mark → steady → shot → fade. Appuis déclarés : Six coups / Tir bas.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Six coups / Tir bas » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Six coups / Tir bas », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : replacer chaque arme sans changer sa main ni téléporter les cartouches, arrêt du dispositif et retour au cadre d’ensemble.

##### High Noon

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Six coups / Pas de côté.

Plan 1 : approche jusqu’à la distance réelle de « Six coups / Pas de côté », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Six coups / Pas de côté », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : replacer chaque arme sans changer sa main ni téléporter les cartouches, prise de distance et maintien final.

##### Aucune confiance

Famille `ballistic`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Six coups / Projection.

Plan 1 : après une observation ou un repli, REVOLVER OCELOT reprend l’initiative par « Six coups / Projection ». Plan 2 : présenter l’arme effectivement associée à « Six coups / Projection », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : replacer chaque arme sans changer sa main ni téléporter les cartouches, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Exactly one drawn revolver per pose, with empty offhand in the punch keypose; Colt barrel/cylinder/hammer silhouette drawn, microscopic engravings approximated at native pose scale.
- Full-body outfit source is official painted character art, not extracted final-game animation. Unseen seams/back details inferred.
- [Official full-body Shinkawa character painting mirrored at Creative Uncut; physically viewed. Not every final PS1 model polygon or texture. Physical Colt SAA photo supplements its silhouette only.](https://www.creativeuncut.com/gallery-02/mgs-revolver-ocelot.html) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## core__boss

### THE BOSS — THE JOY

**Rôle :** CQC : désarmement et Patriot. **Profil :** `boss_cqc`.

**Base présente dans le code :** The Boss combine Patriot, couteau et maîtrise du CQC.

**Incarnation à conserver :** Metal Gear Solid 3: Snake Eater (2004), original PlayStation 2; closed ivory CQC suit

**État vérifié :** métadonnées natives avec limites. 72 régions source distinctes dans les deux directions ; groupes : idle, walk, guard, crouch, low, punch, hit, ko, throw, blade, shoot, recover, attack.

**Réemplois à examiner :** `punch` = light, heavy ; `throw` = throw, special, super.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `retro-msx`, `tuxedo`, `metalgear`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** THE BOSS : garde de The Boss, main de contrôle et main d’arme clairement séparées. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** entrée courte, rotation de bassin et placement du pied de contrôle. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « CQC : désarmement et Patriot » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder garde de The Boss, main de contrôle et main d’arme clairement séparées.
- **jump_land :** THE BOSS : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. entrée courte, rotation de bassin et placement du pied de contrôle. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de THE BOSS. Terminer par désarmement/projection lisible puis retour sobre à la garde. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « THE JOY », présentation de Metal Gear Solid 3: Snake Eater (2004), original PlayStation 2; closed ivory CQC suit, puis garde de The Boss, main de contrôle et main d’arme clairement séparées. Geste court lié à « CQC : renversement » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, désarmement/projection lisible puis retour sobre à la garde ; THE BOSS vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à THE JOY.
- **round_loss :** Proposition CQC : THE BOSS réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « The Joy — CQC final », revenir par désarmement/projection lisible puis retour sobre à la garde, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE BOSS, préparer « Jab » ; garde de The Boss, main de contrôle et main d’arme clairement séparées. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** désarmement/projection lisible puis retour sobre à la garde.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `punch`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE BOSS, préparer « Frappe engagée » ; garde de The Boss, main de contrôle et main d’arme clairement séparées. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** désarmement/projection lisible puis retour sobre à la garde.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE BOSS, préparer « Balayage » ; garde de The Boss, main de contrôle et main d’arme clairement séparées. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** désarmement/projection lisible puis retour sobre à la garde.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE BOSS, préparer « Projection » ; garde de The Boss, main de contrôle et main d’arme clairement séparées. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** désarmement/projection lisible puis retour sobre à la garde. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — CQC : renversement

**Existant :** `melee` / `grapple` ; 8/3/32 ticks ; groupe `throw`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE BOSS, préparer « CQC : renversement » ; garde de The Boss, main de contrôle et main d’arme clairement séparées. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** désarmement/projection lisible puis retour sobre à la garde. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Hors de portée ou saut ; ne saisir ni cible aérienne ni cible sous protection post-projection.

##### specialDown — The Patriot

**Existant :** `projectile` / `ballistic` ; 22/1/36 ticks ; groupe `shoot`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE BOSS, préparer « The Patriot » ; garde de The Boss, main de contrôle et main d’arme clairement séparées. Montrer la prise et la visée de l’arme décrite par « The Patriot » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 3 émissions, espacées de 5 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** désarmement/projection lisible puis retour sobre à la garde. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 3 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### specialForward — Entrée au couteau

**Existant :** `melee` / `blade` ; 18/7/32 ticks ; groupe `blade`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE BOSS, préparer « Entrée au couteau » ; garde de The Boss, main de contrôle et main d’arme clairement séparées. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** désarmement/projection lisible puis retour sobre à la garde. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Désarmement CQC

**Existant :** `parry` / `counter` ; 4/9/34 ticks ; groupe `guard`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE BOSS, préparer « Désarmement CQC » ; garde de The Boss, main de contrôle et main d’arme clairement séparées. Présenter la surface ou l’organe de parade et maintenir une fenêtre courte lisible.

**Action.** Recevoir puis dévier au contact réel pour « Désarmement CQC » ; la riposte et son effet n’apparaissent qu’après succès. Une attente sans contact garde une pose différente du contre réussi.

**Retour.** désarmement/projection lisible puis retour sobre à la garde. Séparer sortie ratée, blocage simple et riposte ; aucun effet de réussite avant collision.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Projeter ou retarder la frappe ; le désarmement temporaire ne supprime jamais l’inventaire.

##### super — The Joy — CQC final

**Existant :** `melee` / `grapple` ; 25/7/44 ticks ; groupe `throw`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE BOSS, préparer « The Joy — CQC final » ; garde de The Boss, main de contrôle et main d’arme clairement séparées. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** désarmement/projection lisible puis retour sobre à la garde. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Reprendre son souffle

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE BOSS, préparer « Reprendre son souffle » ; garde de The Boss, main de contrôle et main d’arme clairement séparées. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Reprendre son souffle ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** désarmement/projection lisible puis retour sobre à la garde. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Patriot’s Last Salute

Famille `cqc`, ton `stylized` ; 220 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : The Joy — CQC final / CQC : renversement.

Plan 1 : THE BOSS sécurise son appui, regarde la cible et prépare l’outil ou le geste de « The Joy — CQC final / CQC : renversement ». Plan 2 : contact de saisie ou neutralisation lié à « The Joy — CQC final / CQC : renversement », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : désarmement/projection lisible puis retour sobre à la garde, pose de signature face à l’adversaire.

##### CQC — Dernière leçon

Famille `cqc`, ton `stylized` ; 238 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : The Joy — CQC final / The Patriot.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « The Joy — CQC final / The Patriot » ; l’espace disponible doit être lisible. Plan 2 : contact de saisie ou neutralisation lié à « The Joy — CQC final / The Patriot », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : désarmement/projection lisible puis retour sobre à la garde, arrêt du dispositif et retour au cadre d’ensemble.

##### Champ blanc

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : The Joy — CQC final / Entrée au couteau.

Plan 1 : approche jusqu’à la distance réelle de « The Joy — CQC final / Entrée au couteau », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « The Joy — CQC final / Entrée au couteau », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : désarmement/projection lisible puis retour sobre à la garde, prise de distance et maintien final.

##### Mission accomplie

Famille `cqc`, ton `stylized` ; 274 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : The Joy — CQC final / Projection.

Plan 1 : après une observation ou un repli, THE BOSS reprend l’initiative par « The Joy — CQC final / Projection ». Plan 2 : contact de saisie ou neutralisation lié à « The Joy — CQC final / Projection », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : désarmement/projection lisible puis retour sobre à la garde, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Original-universe1:1 fidelity is the target; this manually reviewed2D raster recreation is accepted closest, not a certified pixel-exact extraction.
- Closed ivory originalPS2 CQC suit only; sole dark kneepad and hip pouch stay on anatomicalRIGHT. Independent left/right source images, no mirroring or CaptainSurvive costume.
- Motion/timing and hitbox behavior are authored2D CQC adaptations, not an exported originalPS2 animation. Shared punch frames and CQC throw poses do not certify unique original animations.
- Opposite-foot walk contacts and complete boots were corrected through additional image-generation attempts; all attempts and original source bytes are preserved.
- CQC blade poses show one knife in anatomicalRIGHT hand with a short empty chest sheath; the tiny sheath mounting and weapon receiver details remain simplified at combat resolution.
- Patriot originalPS2 stockless shortM16 with integral carry handle and drum magazine follows the original inventory icon/capture; fine gun markings are not certified.
- Native full-body rectangles and occasional Canvas contours isolate neighboring atlas figures; no source pixel cleanup/recolor/crop/rescale is saved. Low-alpha colored RGB fringes use the unmodified PNG alpha.
- [Original Shinkawa full-body artwork reproduced by MetalGearSolid.be; original clothing silhouette, chest sheath and equipment. PS2 color renders resolve ivory palette.](https://www.metalgearsolid.be/images/mgs3_art_g_0003.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original PS2 promotional model render reproduced by MetalGearSolid.be, with GameSpot watermark: closed ivory suit and asymmetrical equipment.](https://www.metalgearsolid.be/images/mgs3_art_g_0034.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original PS2 full frontal model reproduced by MetalGearSolid.be; proves dark kneepad only on anatomical RIGHT knee.](https://www.metalgearsolid.be/images/mgs3_art_g_0040.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original PS2 video frame: back of ivory/metallic suit, dark bands and short blonde ponytail; unmodified decoded frame.](https://archive.org/download/LP_Metal_Gear_Solid_3/mgs3_49.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original PS2 final cutscene frame with The Patriot. Open zipper and scar are not the closed CQC costume requested for these sprites; only weapon and color inform the atlas.](https://archive.org/download/LP_Metal_Gear_Solid_3/mgs3_49.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original MGS3 PS2 Patriot inventory icon: short modified M16, no shoulder stock, short rear receiver stub, integral carry handle, short barrel and twin round drum magazine. Low-resolution icon limits details.](https://www.metalgearsolid.be/images/patriot.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).
