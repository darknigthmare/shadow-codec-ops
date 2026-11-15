# Animations — MAVERICK

**1 acteurs du registre courant.** Les titres d’actions et paramètres sont observés ; les descriptions sont des propositions CQC à produire et valider. Un groupe de frames existant ne certifie pas l’ensemble du mouvement ou sa fidélité originale.

[Index des fiches](README.md) · [Contrat commun](../04_ANIMATIONS_SPRITES.md)

## Sommaire

- [RAIDEN · R-00](#pass40__raiden_r00) — MGR

## pass40__raiden_r00

### RAIDEN · R-00 — MGR

**Rôle :** Lame et parade · corps standard. **Profil :** `raiden_r00_prologue`.

**Base présente dans le code :** Corps standard argent et or, visage naturel intact et katana HF conventionnel de File R-00.

**Incarnation à conserver :** Original Standard Cyborg Body, intact natural face, prologue File R-00 Guard Duty; separate playable identity.

**État vérifié :** métadonnées natives avec limites. 32 régions source distinctes dans les deux directions ; groupes : idle, guard, parry, walk, crouch, jump, attack, blade, punch, heavy, low, throw, hit, recover, ko, roll.

**Réemplois à examiner :** `blade` = light, special ; `heavy` = heavy, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** RAIDEN · R-00 : Standard Cyborg Body du prologue R-00, visage intact et katana conventionnel. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** appuis cyborg et lame tenue, séparation explicite de la silhouette Custom Body. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Lame et parade · corps standard » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder Standard Cyborg Body du prologue R-00, visage intact et katana conventionnel.
- **jump_land :** RAIDEN · R-00 : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. appuis cyborg et lame tenue, séparation explicite de la silhouette Custom Body. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de RAIDEN · R-00. Terminer par fin de coupe et respiration ; ni Ripper, ni Zandatsu, ni mâchoire mécanique ajoutés. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGR », présentation de Original Standard Cyborg Body, intact natural face, prologue File R-00 Guard Duty; separate playable identity., puis Standard Cyborg Body du prologue R-00, visage intact et katana conventionnel. Geste court lié à « Taille du katana HF » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, fin de coupe et respiration ; ni Ripper, ni Zandatsu, ni mâchoire mécanique ajoutés ; RAIDEN · R-00 vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGR.
- **round_loss :** Proposition CQC : RAIDEN · R-00 réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Coupe décisive du corps standard », revenir par fin de coupe et respiration ; ni Ripper, ni Zandatsu, ni mâchoire mécanique ajoutés, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Coupe brève

**Existant :** `melee` / `blade` ; 8/3/16 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN · R-00, préparer « Coupe brève » ; Standard Cyborg Body du prologue R-00, visage intact et katana conventionnel. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** fin de coupe et respiration ; ni Ripper, ni Zandatsu, ni mâchoire mécanique ajoutés. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe la préparation, garde ou quitte la portée puis punis la récupération.

##### heavy — Coupe engagée

**Existant :** `melee` / `blade` ; 21/5/31 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN · R-00, préparer « Coupe engagée » ; Standard Cyborg Body du prologue R-00, visage intact et katana conventionnel. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** fin de coupe et respiration ; ni Ripper, ni Zandatsu, ni mâchoire mécanique ajoutés. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe la préparation, garde ou quitte la portée puis punis la récupération.

##### low — Balayage du corps standard

**Existant :** `melee` / `strike` ; 15/4/26 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN · R-00, préparer « Balayage du corps standard » ; Standard Cyborg Body du prologue R-00, visage intact et katana conventionnel. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** fin de coupe et respiration ; ni Ripper, ni Zandatsu, ni mâchoire mécanique ajoutés.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; la récupération reste punissable.

##### throw — Saisie et projection

**Existant :** `melee` / `grapple` ; 11/3/35 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN · R-00, préparer « Saisie et projection » ; Standard Cyborg Body du prologue R-00, visage intact et katana conventionnel. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** fin de coupe et respiration ; ni Ripper, ni Zandatsu, ni mâchoire mécanique ajoutés. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Recule, saute ou déchope pendant la courte fenêtre de saisie.

##### special — Taille du katana HF

**Existant :** `melee` / `blade` ; 18/5/29 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN · R-00, préparer « Taille du katana HF » ; Standard Cyborg Body du prologue R-00, visage intact et katana conventionnel. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** fin de coupe et respiration ; ni Ripper, ni Zandatsu, ni mâchoire mécanique ajoutés. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe la préparation, garde ou quitte la portée puis punis la récupération.

##### specialDown — Parade rapprochée

**Existant :** `parry` / `counter` ; 5/9/32 ticks ; groupe `parry`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN · R-00, préparer « Parade rapprochée » ; Standard Cyborg Body du prologue R-00, visage intact et katana conventionnel. Présenter la surface ou l’organe de parade et maintenir une fenêtre courte lisible.

**Action.** Recevoir puis dévier au contact réel pour « Parade rapprochée » ; la riposte et son effet n’apparaissent qu’après succès. Une attente sans contact garde une pose différente du contre réussi.

**Retour.** fin de coupe et respiration ; ni Ripper, ni Zandatsu, ni mâchoire mécanique ajoutés. Séparer sortie ratée, blocage simple et riposte ; aucun effet de réussite avant collision.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Attends la fin de la parade, projette ou attaque à distance ; aucune parade de projectile.

##### specialForward — Course de garde

**Existant :** `mobility` / `movement` ; 5/15/23 ticks ; groupe `walk`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN · R-00, préparer « Course de garde » ; Standard Cyborg Body du prologue R-00, visage intact et katana conventionnel. Préparer l’appui qui produit le déplacement ; appuis cyborg et lame tenue, séparation explicite de la silhouette Custom Body.

**Action.** Exécuter « Course de garde » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 5 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** fin de coupe et respiration ; ni Ripper, ni Zandatsu, ni mâchoire mécanique ajoutés. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Intercepte la course ; aucun dégât, verrouillage de cible ou invincibilité.

##### specialBack — Roulade de dégagement

**Existant :** `mobility` / `movement` ; 7/14/26 ticks ; groupe `roll`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN · R-00, préparer « Roulade de dégagement » ; Standard Cyborg Body du prologue R-00, visage intact et katana conventionnel. Préparer l’appui qui produit le déplacement ; appuis cyborg et lame tenue, séparation explicite de la silhouette Custom Body.

**Action.** Exécuter « Roulade de dégagement » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -4 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** fin de coupe et respiration ; ni Ripper, ni Zandatsu, ni mâchoire mécanique ajoutés. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Poursuis la sortie de roulade ; aucune invulnérabilité générale.

##### super — Coupe décisive du corps standard

**Existant :** `melee` / `blade` ; 34/6/44 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN · R-00, préparer « Coupe décisive du corps standard » ; Standard Cyborg Body du prologue R-00, visage intact et katana conventionnel. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** fin de coupe et respiration ; ni Ripper, ni Zandatsu, ni mâchoire mécanique ajoutés. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde ou quitte la portée pendant la longue préparation ; aucune transformation.

##### utility — Nanopâte de réparation

**Existant :** `heal` / `recovery` ; 48/1/27 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN · R-00, préparer « Nanopâte de réparation » ; Standard Cyborg Body du prologue R-00, visage intact et katana conventionnel. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Nanopâte de réparation ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** fin de coupe et respiration ; ni Ripper, ni Zandatsu, ni mâchoire mécanique ajoutés. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interromps l’utilisation ; seuls les dégâts récupérables peuvent être réparés.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Coupe de conclusion

Famille `cqc`, ton `stylized` ; 220 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Coupe brève / Coupe engagée.

Plan 1 : RAIDEN · R-00 sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Coupe brève / Coupe engagée ». Plan 2 : contact de saisie ou neutralisation lié à « Coupe brève / Coupe engagée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : fin de coupe et respiration ; ni Ripper, ni Zandatsu, ni mâchoire mécanique ajoutés, pose de signature face à l’adversaire.

##### Parade et projection

Famille `cqc`, ton `stylized` ; 238 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Parade rapprochée / Saisie et projection.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Parade rapprochée / Saisie et projection » ; l’espace disponible doit être lisible. Plan 2 : contact de saisie ou neutralisation lié à « Parade rapprochée / Saisie et projection », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : fin de coupe et respiration ; ni Ripper, ni Zandatsu, ni mâchoire mécanique ajoutés, arrêt du dispositif et retour au cadre d’ensemble.

##### Percée contrôlée

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Course de garde / Taille du katana HF.

Plan 1 : approche jusqu’à la distance réelle de « Course de garde / Taille du katana HF », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Course de garde / Taille du katana HF », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : fin de coupe et respiration ; ni Ripper, ni Zandatsu, ni mâchoire mécanique ajoutés, prise de distance et maintien final.

##### Dernière taille

Famille `cqc`, ton `stylized` ; 274 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Coupe décisive du corps standard.

Plan 1 : après une observation ou un repli, RAIDEN · R-00 reprend l’initiative par « Coupe décisive du corps standard ». Plan 2 : contact de saisie ou neutralisation lié à « Coupe décisive du corps standard », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : fin de coupe et respiration ; ni Ripper, ni Zandatsu, ni mâchoire mécanique ajoutés, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Distinct original R-00 Standard Cyborg Body. Existing MGS4 and post-prologue black Custom Body UIDs, abilities and RAY encounters stay unchanged.
- Sixteen physical source keyposes per facing: five existing P31, seven retained P40 supplement actions and four new held-katana locomotion drawings. Logical calibration aliases and action phases create no new drawings.
- Original P31 idle/walks and sheathed jump are superseded only for this new UID. Near-leg-leading and near-leg-trailing back-angle gait drawings are candidates pending Root physical review; gaitCertification stays false.
- Silver/gold prologue appearance and conventional HF katana are reference-led2D interpretations, not extracted meshes, UVs or original animation.
- Same-page heights P40 supplements428/445px, right locomotion474px, left back-stride458px and corrected left locomotion670px require Root review. Explicit pelvis axes and boot soles exclude blade tips. Native PNG bytes remain intact; held drawings stay unmapped.
- Stamina, gray-health nanopaste recovery, move timing, damage and CQC finishers are authored adaptations. No FC, Ripper, Zandatsu, Blade Mode, ocular visor, mechanical jaw or firearm behavior is imported.
- [Original customization screenshot explicitly identifies Standard Cyborg Body. Physically viewed full silver/gold body and natural face.](https://gameadvanceplaythroughs.weebly.com/metal-gear-rising-revengeance-body.html) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Physically viewed original-game screenshot of standard body from a second front-side camera. Includes silver plates, muted gold shoulders, black torso, high-heeled feet and natural face.](https://steamcommunity.com/sharedfiles/filedetails/?id=288100510) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Official Konami manual explicitly distinguishes the prologue before the rebuilt body. This visual variant does not transplant original prologue restrictions into authored CQC mechanics.](https://shared.steamstatic.com/store_item_assets/steam/apps/235460/manuals/MGR_PC_manual_English.pdf) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).
