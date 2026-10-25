# Animations — ARCHIVE

**10 acteurs du registre courant.** Les titres d’actions et paramètres sont observés ; les descriptions sont des propositions CQC à produire et valider. Un groupe de frames existant ne certifie pas l’ensemble du mouvement ou sa fidélité originale.

[Index des fiches](README.md) · [Contrat commun](../04_ANIMATIONS_SPRITES.md)

## Sommaire

- [D-HORSE](#archive__dhorse) — MGSV
- [WALKER GEAR](#archive__walker_gear) — MGSV
- [JENNIFER — SNAKE’S REVENGE](#archive__jennifer_sr) — SNAKE'S REVENGE
- [WEASEL](#archive__weasel_gb) — GHOST BABEL
- [THOMAS KOPPELTHORN](#archive__koppelthorn) — AC!D 2
- [LUCY / LUCINDA](#archive__lucy_acid2) — AC!D 2
- [MIRANDA](#archive__miranda_survive) — SURVIVE
- [CHRIS](#archive__chris_survive) — SURVIVE
- [NICHOLAS](#archive__nicholas_survive) — SURVIVE
- [VIRGIL AT-9](#archive__virgil_at9) — SURVIVE

## archive__dhorse

### D-HORSE — MGSV

**Rôle :** Monture : ruade et déplacement. **Profil :** `horse`.

**Base présente dans le code :** Monture sans arme à feu : ruade, galop et esquive sont les seules bases du kit.

**Incarnation à conserver :** D-Horse, released MGSV white/gray buddy with plain brown saddle/bridle costume

**État vérifié :** métadonnées natives avec limites. 29 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, special, specialDown, specialForward, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** D-HORSE : encolure, harnais, crinière et quatre membres distincts. Respiration et petit mouvement de tête/oreilles/queue selon l’anatomie ; les pattes restent stables. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas/trot avec cycle équin, demi-tour et freinage avec appuis. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Monture : ruade et déplacement » : abaissement et orientation défensive de la tête et du tronc ; ne pas ajouter une parade humaine à deux bras ; recul bloqué distinct de la simple position basse. Garder encolure, harnais, crinière et quatre membres distincts.
- **jump_land :** D-HORSE : regroupement des appuis arrière, bond, extension en vol puis réception par les appuis avant et arrière adaptés à l’espèce. pas/trot avec cycle équin, demi-tour et freinage avec appuis. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Réactions de tête, de flanc et de patte de D-HORSE, perte d’appui puis relevé par les membres réellement présents. Terminer par abaissement de l’encolure et rééquilibrage après ruade/charge. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGSV », présentation de D-Horse, released MGSV white/gray buddy with plain brown saddle/bridle costume, puis encolure, harnais, crinière et quatre membres distincts. Geste court lié à « Galop de poussée » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, abaissement de l’encolure et rééquilibrage après ruade/charge ; D-HORSE vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGSV.
- **round_loss :** Proposition CQC : D-HORSE relève la tête, rassemble ses appuis, répartit son poids puis reprend sa position d’attente ; aucun redressement humain. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Charge de D-Horse », revenir par abaissement de l’encolure et rééquilibrage après ruade/charge, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Contact animal

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de D-HORSE, préparer « Contact animal » ; encolure, harnais, crinière et quatre membres distincts. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Contact animal » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** abaissement de l’encolure et rééquilibrage après ruade/charge.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Ruade

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de D-HORSE, préparer « Ruade » ; encolure, harnais, crinière et quatre membres distincts. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Ruade », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** abaissement de l’encolure et rééquilibrage après ruade/charge.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de D-HORSE, préparer « Balayage » ; encolure, harnais, crinière et quatre membres distincts. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** abaissement de l’encolure et rééquilibrage après ruade/charge.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Épaule de la monture

**Existant :** `melee` / `strike` ; 12/4/29 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de D-HORSE, préparer « Épaule de la monture » ; encolure, harnais, crinière et quatre membres distincts. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Épaule de la monture » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** abaissement de l’encolure et rééquilibrage après ruade/charge.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### special — Galop de poussée

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de D-HORSE, préparer « Galop de poussée » ; encolure, harnais, crinière et quatre membres distincts. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Galop de poussée » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** abaissement de l’encolure et rééquilibrage après ruade/charge.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialDown — Ruade arrière

**Existant :** `melee` / `hoof` ; 16/5/29 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de D-HORSE, préparer « Ruade arrière » ; encolure, harnais, crinière et quatre membres distincts. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** abaissement de l’encolure et rééquilibrage après ruade/charge. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; menace horizontale, pas un anti-aérien universel.

##### specialForward — Déplacement latéral

**Existant :** `mobility` / `movement` ; 7/18/25 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de D-HORSE, préparer « Déplacement latéral » ; encolure, harnais, crinière et quatre membres distincts. Préparer l’appui qui produit le déplacement ; pas/trot avec cycle équin, demi-tour et freinage avec appuis.

**Action.** Exécuter « Déplacement latéral » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 8 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** abaissement de l’encolure et rééquilibrage après ruade/charge. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : La silhouette reste touchable ; la sortie est punissable.

##### specialBack — Repli de la monture

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de D-HORSE, préparer « Repli de la monture » ; encolure, harnais, crinière et quatre membres distincts. Préparer l’appui qui produit le déplacement ; pas/trot avec cycle équin, demi-tour et freinage avec appuis.

**Action.** Exécuter « Repli de la monture » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -8 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** abaissement de l’encolure et rééquilibrage après ruade/charge. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Charge de D-Horse

**Existant :** `melee` / `hoof` ; 25/7/44 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de D-HORSE, préparer « Charge de D-Horse » ; encolure, harnais, crinière et quatre membres distincts. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** abaissement de l’encolure et rééquilibrage après ruade/charge. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Reprendre son souffle

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de D-HORSE, préparer « Reprendre son souffle » ; encolure, harnais, crinière et quatre membres distincts. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Reprendre son souffle ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** abaissement de l’encolure et rééquilibrage après ruade/charge. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Gallop Down

Famille `beast`, ton `stylized` ; 220 ticks CQC ; phases actuelles : stalk → pounce → takedown → howl. Appuis déclarés : Charge de D-Horse / Galop de poussée.

Plan 1 : D-HORSE sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Charge de D-Horse / Galop de poussée ». Plan 2 : pas/trot avec cycle équin, demi-tour et freinage avec appuis ; montrer l’organe de « Charge de D-Horse / Galop de poussée ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : abaissement de l’encolure et rééquilibrage après ruade/charge, pose de signature face à l’adversaire.

##### Rear Kick

Famille `cqc`, ton `stylized` ; 238 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Charge de D-Horse / Ruade arrière.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Charge de D-Horse / Ruade arrière » ; l’espace disponible doit être lisible. Plan 2 : contact de saisie ou neutralisation lié à « Charge de D-Horse / Ruade arrière », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : abaissement de l’encolure et rééquilibrage après ruade/charge, arrêt du dispositif et retour au cadre d’ensemble.

##### Saddle Charge

Famille `beast`, ton `stylized` ; 256 ticks CQC ; phases actuelles : stalk → pounce → takedown → howl. Appuis déclarés : Charge de D-Horse / Déplacement latéral.

Plan 1 : approche jusqu’à la distance réelle de « Charge de D-Horse / Déplacement latéral », arme et main libre identifiées. Plan 2 : pas/trot avec cycle équin, demi-tour et freinage avec appuis ; montrer l’organe de « Charge de D-Horse / Déplacement latéral ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : abaissement de l’encolure et rééquilibrage après ruade/charge, prise de distance et maintien final.

##### Extraction Mount

Famille `beast`, ton `stylized` ; 274 ticks CQC ; phases actuelles : stalk → pounce → takedown → howl. Appuis déclarés : Charge de D-Horse / Épaule de la monture.

Plan 1 : après une observation ou un repli, D-HORSE reprend l’initiative par « Charge de D-Horse / Épaule de la monture ». Plan 2 : pas/trot avec cycle équin, demi-tour et freinage avec appuis ; montrer l’organe de « Charge de D-Horse / Épaule de la monture ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : abaissement de l’encolure et rééquilibrage après ruade/charge, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Full-body actual CGI upper-right plain saddle selected; large tactical tan armor bags in adjacent concept are excluded.
- Sixteen 2.5D quadruped poses are authored adaptation, no humanoid limbs or rider invented.
- Animal height205 includes fullhead above withers, selected to remain smaller than adult human standing headheight220.
- Native right atlas physically places curled fullhorse KO in13, getting-up in14 and a spook in12; explicit presentation groups preserve those actual poses without image rearrangement.
- [Original complete Konami/Shinkawa character sheet physically viewed; full-body released CGI inset primary, unused concept variations explicitly excluded.](https://www.creativeuncut.com/gallery-27/mgs5-d-horse.html) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## archive__walker_gear

### WALKER GEAR — MGSV

**Rôle :** Arme montée et jambes mécaniques. **Profil :** `walker`.

**Base présente dans le code :** Bipède de combat : arme et appuis ; ne devient pas une machine géante d’Arsenal.

**Incarnation à conserver :** Bipède de combat : arme et appuis ; ne devient pas une machine géante d’Arsenal.

**État vérifié :** route machine effectivement déclarée ; animations d’articulation à contrôler. Une route machine est déclarée dans le runtime. Ses articulations remplacent le catalogue de corps contrôlé ; ce n’est pas un constat de sprite absent.

**Réemplois à examiner :** pas de groupe natif partagé observé dans cette extraction.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** WALKER GEAR : pilote ou châssis de Walker Gear visibles dans leur rôle exact. Petits ajustements mécaniques des organes présents et optique stable ; aucune respiration humaine. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** articulation des deux jambes, stabilisation du haut et du canon. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Arme montée et jambes mécaniques » : orientation défensive du châssis, des membres ou de la protection effectivement présente ; pas d’avant-bras humain ajouté ; recul bloqué distinct de la simple position basse. Garder pilote ou châssis de Walker Gear visibles dans leur rôle exact.
- **jump_land :** WALKER GEAR : départ par poussée ou articulation autorisée, déplacement aérien puis stabilisation et reprise d’appui ; les appareils volants gardent leur mode de sustentation. articulation des deux jambes, stabilisation du haut et du canon. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Secousse du châssis et de l’organe touché de WALKER GEAR, déséquilibre, arrêt puis remise en position par ses articulations réelles. Terminer par absorption du recul par le châssis ; pas de bras humain ajouté. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGSV », présentation de Bipède de combat : arme et appuis ; ne devient pas une machine géante d’Arsenal., puis pilote ou châssis de Walker Gear visibles dans leur rôle exact. Geste court lié à « Mitrailleuse montée » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, absorption du recul par le châssis ; pas de bras humain ajouté ; WALKER GEAR vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGSV.
- **round_loss :** Proposition CQC : WALKER GEAR interrompt ses émissions, absorbe l’oscillation de sa masse, stabilise ses appuis ou son vol, puis replace ses organes ; aucune régénération gratuite. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Rafale du bipède », revenir par absorption du recul par le châssis ; pas de bras humain ajouté, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de WALKER GEAR, préparer « Jab » ; pilote ou châssis de Walker Gear visibles dans leur rôle exact. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** absorption du recul par le châssis ; pas de bras humain ajouté.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de WALKER GEAR, préparer « Frappe engagée » ; pilote ou châssis de Walker Gear visibles dans leur rôle exact. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** absorption du recul par le châssis ; pas de bras humain ajouté.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de WALKER GEAR, préparer « Balayage » ; pilote ou châssis de Walker Gear visibles dans leur rôle exact. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** absorption du recul par le châssis ; pas de bras humain ajouté.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Poussée du châssis

**Existant :** `melee` / `strike` ; 13/4/32 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de WALKER GEAR, préparer « Poussée du châssis » ; pilote ou châssis de Walker Gear visibles dans leur rôle exact. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Poussée du châssis » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** absorption du recul par le châssis ; pas de bras humain ajouté.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### special — Mitrailleuse montée

**Existant :** `projectile` / `ballistic` ; 22/1/36 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de WALKER GEAR, préparer « Mitrailleuse montée » ; pilote ou châssis de Walker Gear visibles dans leur rôle exact. Montrer la prise et la visée de l’arme décrite par « Mitrailleuse montée » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 4 émissions, espacées de 5 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** absorption du recul par le châssis ; pas de bras humain ajouté. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 4 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### specialDown — Munition guidée

**Existant :** `projectile` / `rocket` ; 32/1/38 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de WALKER GEAR, préparer « Munition guidée » ; pilote ou châssis de Walker Gear visibles dans leur rôle exact. Montrer la prise et la visée de l’arme décrite par « Munition guidée » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** absorption du recul par le châssis ; pas de bras humain ajouté. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Verrouillage lent, virage limité ; le missile peut être détruit.

##### specialForward — Pas de charge

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de WALKER GEAR, préparer « Pas de charge » ; pilote ou châssis de Walker Gear visibles dans leur rôle exact. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Pas de charge » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** absorption du recul par le châssis ; pas de bras humain ajouté.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Stabilisation

**Existant :** `buff` / `armor` ; 22/1/31 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de WALKER GEAR, préparer « Stabilisation » ; pilote ou châssis de Walker Gear visibles dans leur rôle exact. Montrer la préparation corporelle ou mécanique de « Stabilisation ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** absorption du recul par le châssis ; pas de bras humain ajouté. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Absorbe une seule frappe ; projections, EMP et attaques brise-armure la contrent.

##### super — Rafale du bipède

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de WALKER GEAR, préparer « Rafale du bipède » ; pilote ou châssis de Walker Gear visibles dans leur rôle exact. Montrer la prise et la visée de l’arme décrite par « Rafale du bipède » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 7 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** absorption du recul par le châssis ; pas de bras humain ajouté. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 7 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Refroidir

**Existant :** `recover` / `recovery` ; 45/1/25 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de WALKER GEAR, préparer « Refroidir » ; pilote ou châssis de Walker Gear visibles dans leur rôle exact. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Refroidir ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** absorption du recul par le châssis ; pas de bras humain ajouté. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Refroidissement ou pause tactique interrompable ; aucun soin gratuit.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Walker Stomp

Famille `ballistic`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Rafale du bipède / Mitrailleuse montée.

Plan 1 : WALKER GEAR sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Rafale du bipède / Mitrailleuse montée ». Plan 2 : présenter l’arme effectivement associée à « Rafale du bipède / Mitrailleuse montée », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : absorption du recul par le châssis ; pas de bras humain ajouté, pose de signature face à l’adversaire.

##### Rotary Lock

Famille `ballistic`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Rafale du bipède / Munition guidée.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Rafale du bipède / Munition guidée » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Rafale du bipède / Munition guidée », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : absorption du recul par le châssis ; pas de bras humain ajouté, arrêt du dispositif et retour au cadre d’ensemble.

##### Cockpit Breach

Famille `mechanical`, ton `stylized` ; 256 ticks CQC ; phases actuelles : lock → barrage → core → shutdown. Appuis déclarés : Rafale du bipède / Pas de charge.

Plan 1 : approche jusqu’à la distance réelle de « Rafale du bipède / Pas de charge », arme et main libre identifiées. Plan 2 : articulation des deux jambes, stabilisation du haut et du canon ; montrer l’organe de « Rafale du bipède / Pas de charge ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : absorption du recul par le châssis ; pas de bras humain ajouté, prise de distance et maintien final.

##### Gear Offline

Famille `mechanical`, ton `stylized` ; 274 ticks CQC ; phases actuelles : lock → barrage → core → shutdown. Appuis déclarés : Rafale du bipède / Poussée du châssis.

Plan 1 : après une observation ou un repli, WALKER GEAR reprend l’initiative par « Rafale du bipède / Poussée du châssis ». Plan 2 : articulation des deux jambes, stabilisation du haut et du canon ; montrer l’organe de « Rafale du bipède / Poussée du châssis ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : absorption du recul par le châssis ; pas de bras humain ajouté, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Aucun pouvoir importé d’une autre incarnation.
- Aucune invulnérabilité permanente, saisie infinie ou contrôle des touches adverses.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## archive__jennifer_sr

### JENNIFER — SNAKE’S REVENGE — SNAKE'S REVENGE

**Rôle :** Simulation prudente, pas de super-pouvoirs. **Profil :** `civilian`.

**Base présente dans le code :** Agent de Snake’s Revenge : soutien et infiltration ; kit défensif proposé, pas grenades innées.

**Incarnation à conserver :** JenniferX original NES undercover computer expert/support, distinct from MetalGear1987 Jennifer.

**État vérifié :** unattested-body-presentation-reconstruction. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, special, specialForward, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** JENNIFER — SNAKE’S REVENGE : posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas hésitants mais lisibles, en conservant l’âge et la stature. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Simulation prudente, pas de super-pouvoirs » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut.
- **jump_land :** JENNIFER — SNAKE’S REVENGE : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas hésitants mais lisibles, en conservant l’âge et la stature. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de JENNIFER — SNAKE’S REVENGE. Terminer par réaction humaine puis reprise d’appui ; combat explicitement simulé. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « SNAKE'S REVENGE », présentation de JenniferX original NES undercover computer expert/support, distinct from MetalGear1987 Jennifer., puis posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Geste court lié à « Repousser » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, réaction humaine puis reprise d’appui ; combat explicitement simulé ; JENNIFER — SNAKE’S REVENGE vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à SNAKE'S REVENGE.
- **round_loss :** Proposition CQC : JENNIFER — SNAKE’S REVENGE réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Sortie sous couverture », revenir par réaction humaine puis reprise d’appui ; combat explicitement simulé, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JENNIFER — SNAKE’S REVENGE, préparer « Jab » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JENNIFER — SNAKE’S REVENGE, préparer « Frappe engagée » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JENNIFER — SNAKE’S REVENGE, préparer « Balayage » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JENNIFER — SNAKE’S REVENGE, préparer « Projection » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Repousser

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JENNIFER — SNAKE’S REVENGE, préparer « Repousser » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Repousser » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialDown — Repérer l’issue

**Existant :** `mark` / `recon` ; 26/1/30 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JENNIFER — SNAKE’S REVENGE, préparer « Repérer l’issue » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Orienter regard, optique ou terminal vers la cible observée, sans consulter une action future.

**Action.** Pour « Repérer l’issue », déclencher lecture/repérage avec un petit geste ou changement d’optique et un indicateur séparé. Le corps doit rester visible et vulnérable selon les données de combat.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé. Couper le signal ou abaisser l’outil ; retour vers l’adversaire sans nouvelle arme inventée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Portée limitée ; le marquage ne vise ni à travers toute l’arène ni automatiquement.

##### specialForward — Se dégager

**Existant :** `mobility` / `movement` ; 7/18/25 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JENNIFER — SNAKE’S REVENGE, préparer « Se dégager » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Préparer l’appui qui produit le déplacement ; pas hésitants mais lisibles, en conservant l’âge et la stature.

**Action.** Exécuter « Se dégager » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 4 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : La silhouette reste touchable ; la sortie est punissable.

##### specialBack — Repli de Jennifer

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JENNIFER — SNAKE’S REVENGE, préparer « Repli de Jennifer » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Préparer l’appui qui produit le déplacement ; pas hésitants mais lisibles, en conservant l’âge et la stature.

**Action.** Exécuter « Repli de Jennifer » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Sortie sous couverture

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JENNIFER — SNAKE’S REVENGE, préparer « Sortie sous couverture » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Sortie sous couverture », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Reprendre son souffle

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de JENNIFER — SNAKE’S REVENGE, préparer « Reprendre son souffle » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Reprendre son souffle ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Sortie sous couverture — Final

Famille `cqc`, ton `nonlethal` ; 220 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Sortie sous couverture / Repousser.

Plan 1 : JENNIFER — SNAKE’S REVENGE sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Sortie sous couverture / Repousser ». Plan 2 : contact de saisie ou neutralisation lié à « Sortie sous couverture / Repousser », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : réaction humaine puis reprise d’appui ; combat explicitement simulé, pose de signature face à l’adversaire. Respecter le ton nonlethal enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Repousser / Repérer l’issue

Famille `cqc`, ton `nonlethal` ; 238 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Sortie sous couverture / Repérer l’issue.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Sortie sous couverture / Repérer l’issue » ; l’espace disponible doit être lisible. Plan 2 : contact de saisie ou neutralisation lié à « Sortie sous couverture / Repérer l’issue », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : réaction humaine puis reprise d’appui ; combat explicitement simulé, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton nonlethal enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Se dégager — Point final

Famille `cqc`, ton `nonlethal` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Sortie sous couverture / Se dégager.

Plan 1 : approche jusqu’à la distance réelle de « Sortie sous couverture / Se dégager », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Sortie sous couverture / Se dégager », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : réaction humaine puis reprise d’appui ; combat explicitement simulé, prise de distance et maintien final. Respecter le ton nonlethal enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Simulation prudente — Mission close

Famille `capture`, ton `nonlethal` ; 274 ticks CQC ; phases actuelles : stun → disarm → restrain → extract. Appuis déclarés : Sortie sous couverture / Projection.

Plan 1 : après une observation ou un repli, JENNIFER — SNAKE’S REVENGE reprend l’initiative par « Sortie sous couverture / Projection ». Plan 2 : contact de saisie ou neutralisation lié à « Sortie sous couverture / Projection », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : réaction humaine puis reprise d’appui ; combat explicitement simulé, rangement/pose finale différente des trois autres. Respecter le ton nonlethal enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Generated native pixels remain intact. This whole-body presentation is explicitly reconstructed from the cited identity/partial appearance evidence; it is not an attested canonical full-body appearance.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Original NES pixels/manual upper-body portraits document the visible identity and small silhouette, not a complete modern detailed costume turnaround. Unseen lower-body seams, colours absent from monochrome sources and native authored combat poses are conservative reconstruction.
- Distinct Snake’s Revenge NES incarnation preserved, no automatic alias to MSX1/MSX2 Snake, JohnnySasaki or another MetalGear support identity. Sixteen complete native keyposes per facing are new authored gameplay presentation.
- Whole native Codec confirms female face and long wavy hair, not exact garment, natural colour, lower body or hidden equipment. No alias to JenniferMG1 is made.
- [Actual original NES JenniferX Codec portrait, whole-frame preserved and physically viewed; complete body not published here.](https://lparchive.org/Metal-Gear-1-2/Update%2016/28-Snake_s_Revenge_248.png) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## archive__weasel_gb

### WEASEL — GHOST BABEL

**Rôle :** Pistolet et défense proche. **Profil :** `pistol`.

**Base présente dans le code :** Informateur de Ghost Babel : kit bonus conventionnel, sans pouvoir des Black Chamber.

**Incarnation à conserver :** Weasel, released2000 Ghost Babel Dutch mercenary support contact; canonical name Ronard Lensenbrink.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `throw` = throw, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** WEASEL : main forte et main de soutien identifiées sur le pistolet, coudes contenus. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas prudents sans inverser l’étui ni la main forte. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Pistolet et défense proche » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder main forte et main de soutien identifiées sur le pistolet, coudes contenus.
- **jump_land :** WEASEL : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas prudents sans inverser l’étui ni la main forte. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de WEASEL. Terminer par recul du poignet puis stabilisation du canon. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « GHOST BABEL », présentation de Weasel, released2000 Ghost Babel Dutch mercenary support contact; canonical name Ronard Lensenbrink., puis main forte et main de soutien identifiées sur le pistolet, coudes contenus. Geste court lié à « Arme de protection » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, recul du poignet puis stabilisation du canon ; WEASEL vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à GHOST BABEL.
- **round_loss :** Proposition CQC : WEASEL réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Échapper au piège », revenir par recul du poignet puis stabilisation du canon, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de WEASEL, préparer « Jab » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de WEASEL, préparer « Frappe engagée » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de WEASEL, préparer « Balayage » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de WEASEL, préparer « Projection » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recul du poignet puis stabilisation du canon. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Arme de protection

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de WEASEL, préparer « Arme de protection » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Montrer la prise et la visée de l’arme décrite par « Arme de protection » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Diversion

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de WEASEL, préparer « Diversion » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Prélever l’objet correspondant à « Diversion », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Poussée de proximité

**Existant :** `melee` / `grapple` ; 10/3/32 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de WEASEL, préparer « Poussée de proximité » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recul du poignet puis stabilisation du canon. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Hors de portée ou saut ; ne saisir ni cible aérienne ni cible sous protection post-projection.

##### specialBack — Repli de Weasel

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de WEASEL, préparer « Repli de Weasel » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer l’appui qui produit le déplacement ; pas prudents sans inverser l’étui ni la main forte.

**Action.** Exécuter « Repli de Weasel » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** recul du poignet puis stabilisation du canon. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Échapper au piège

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de WEASEL, préparer « Échapper au piège » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Montrer la prise et la visée de l’arme décrite par « Échapper au piège » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recharger

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de WEASEL, préparer « Recharger » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recharger », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** recul du poignet puis stabilisation du canon. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Échapper au piège — Final

Famille `ballistic`, ton `simulation` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Échapper au piège / Arme de protection.

Plan 1 : WEASEL sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Échapper au piège / Arme de protection ». Plan 2 : présenter l’arme effectivement associée à « Échapper au piège / Arme de protection », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : recul du poignet puis stabilisation du canon, pose de signature face à l’adversaire. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Arme de protection / Diversion

Famille `ballistic`, ton `simulation` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Échapper au piège / Diversion.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Échapper au piège / Diversion » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Échapper au piège / Diversion », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : recul du poignet puis stabilisation du canon, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Poussée de proximité — Point final

Famille `cqc`, ton `simulation` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Échapper au piège / Poussée de proximité.

Plan 1 : approche jusqu’à la distance réelle de « Échapper au piège / Poussée de proximité », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Échapper au piège / Poussée de proximité », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : recul du poignet puis stabilisation du canon, prise de distance et maintien final. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Lecture rapprochée — Mission close

Famille `capture`, ton `simulation` ; 274 ticks CQC ; phases actuelles : stun → disarm → restrain → extract. Appuis déclarés : Échapper au piège / Projection.

Plan 1 : après une observation ou un repli, WEASEL reprend l’initiative par « Échapper au piège / Projection ». Plan 2 : contact de saisie ou neutralisation lié à « Échapper au piège / Projection », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : recul du poignet puis stabilisation du canon, rangement/pose finale différente des trois autres. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Only face/part of upper collar documented by original low-resolution green portraits; angular face/hair silhouette preserved, exact brown hair and skin colours are restrained natural-colour interpretation of monochrome source.
- Plain olive open-collar jacket/dark undershirt, charcoal field trousers and boots are requested playable-body adaptation, not certified canonical full-body costume. No undocumented hat, firearm, holster, armour or extra glasses drawn.
- Thirtysomething male respects original Konami age30s; no fictitious elderly version inferred from the tiny codec shading.
- Thirty-two unarmed native keyposes are authored gameplay adaptation. The canonical narrative event using a gun does not prove a continuously carried gun or exact model from this portrait.
- completion__ronald_lensen is a documented legacy misspelling of this same identity; alias is visual only, preserving original UID/lore/save data.
- [Original official Konami green monochrome codec portrait and publisher manual icon physically viewed; original Japanese page establishes age30s, Netherlands,180cm and same real identity.](https://www.konami.com/mg/archive/ghostbabel/japanese/character/pic/weasel.gif) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## archive__koppelthorn

### THOMAS KOPPELTHORN — AC!D 2

**Rôle :** Simulation prudente, pas de super-pouvoirs. **Profil :** `analyst`.

**Base présente dans le code :** Scientifique Ac!d 2 : pas de télékinésie personnelle prouvée par son pilotage d’une machine.

**Incarnation à conserver :** Adult male scientist Thomas Koppelthorn in original Ac!d 2 official full-body coloured illustration.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, special, specialForward, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** THOMAS KOPPELTHORN : outil de lecture ou de communication montré par le profil, attitude d’observation. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Simulation prudente, pas de super-pouvoirs » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder outil de lecture ou de communication montré par le profil, attitude d’observation.
- **jump_land :** THOMAS KOPPELTHORN : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de THOMAS KOPPELTHORN. Terminer par regard vers l’outil puis retour vers l’adversaire. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « AC!D 2 », présentation de Adult male scientist Thomas Koppelthorn in original Ac!d 2 official full-body coloured illustration., puis outil de lecture ou de communication montré par le profil, attitude d’observation. Geste court lié à « Outil de laboratoire » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, regard vers l’outil puis retour vers l’adversaire ; THOMAS KOPPELTHORN vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à AC!D 2.
- **round_loss :** Proposition CQC : THOMAS KOPPELTHORN réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Protocole d’évacuation », revenir par regard vers l’outil puis retour vers l’adversaire, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THOMAS KOPPELTHORN, préparer « Jab » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THOMAS KOPPELTHORN, préparer « Frappe engagée » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THOMAS KOPPELTHORN, préparer « Balayage » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THOMAS KOPPELTHORN, préparer « Projection » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Outil de laboratoire

**Existant :** `melee` / `electric` ; 17/5/29 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THOMAS KOPPELTHORN, préparer « Outil de laboratoire » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Outil de laboratoire » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense. L’effet electric reste séparé du membre ; son apparition et sa disparition suivent les événements du profil.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Espacement ou garde ; choc bref avec résistance temporaire après application.

##### specialDown — Scanner Ego

**Existant :** `mark` / `recon` ; 26/1/30 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THOMAS KOPPELTHORN, préparer « Scanner Ego » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Orienter regard, optique ou terminal vers la cible observée, sans consulter une action future.

**Action.** Pour « Scanner Ego », déclencher lecture/repérage avec un petit geste ou changement d’optique et un indicateur séparé. Le corps doit rester visible et vulnérable selon les données de combat.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Couper le signal ou abaisser l’outil ; retour vers l’adversaire sans nouvelle arme inventée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Portée limitée ; le marquage ne vise ni à travers toute l’arène ni automatiquement.

##### specialForward — Repli de technicien

**Existant :** `mobility` / `movement` ; 7/18/25 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THOMAS KOPPELTHORN, préparer « Repli de technicien » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer l’appui qui produit le déplacement ; déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire.

**Action.** Exécuter « Repli de technicien » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 4 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : La silhouette reste touchable ; la sortie est punissable.

##### specialBack — Se protéger

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THOMAS KOPPELTHORN, préparer « Se protéger » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer l’appui qui produit le déplacement ; déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire.

**Action.** Exécuter « Se protéger » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Protocole d’évacuation

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THOMAS KOPPELTHORN, préparer « Protocole d’évacuation » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Protocole d’évacuation », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Stabiliser la réserve

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THOMAS KOPPELTHORN, préparer « Stabiliser la réserve » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Stabiliser la réserve ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Protocole d’évacuation — Final

Famille `cqc`, ton `nonlethal` ; 220 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Protocole d’évacuation / Outil de laboratoire.

Plan 1 : THOMAS KOPPELTHORN sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Protocole d’évacuation / Outil de laboratoire ». Plan 2 : contact de saisie ou neutralisation lié à « Protocole d’évacuation / Outil de laboratoire », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : regard vers l’outil puis retour vers l’adversaire, pose de signature face à l’adversaire. Respecter le ton nonlethal enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Outil de laboratoire / Scanner Ego

Famille `electric`, ton `nonlethal` ; 238 ticks CQC ; phases actuelles : charge → arc → overload → shutdown. Appuis déclarés : Protocole d’évacuation / Scanner Ego.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Protocole d’évacuation / Scanner Ego » ; l’espace disponible doit être lisible. Plan 2 : montrer la source corporelle ou matérielle de « Protocole d’évacuation / Scanner Ego ». Plan 3 : développer l’effet electric en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : regard vers l’outil puis retour vers l’adversaire, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton nonlethal enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Repli de technicien — Point final

Famille `cqc`, ton `nonlethal` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Protocole d’évacuation / Repli de technicien.

Plan 1 : approche jusqu’à la distance réelle de « Protocole d’évacuation / Repli de technicien », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Protocole d’évacuation / Repli de technicien », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : regard vers l’outil puis retour vers l’adversaire, prise de distance et maintien final. Respecter le ton nonlethal enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Simulation prudente — Mission close

Famille `capture`, ton `nonlethal` ; 274 ticks CQC ; phases actuelles : stun → disarm → restrain → extract. Appuis déclarés : Protocole d’évacuation / Projection.

Plan 1 : après une observation ou un repli, THOMAS KOPPELTHORN reprend l’initiative par « Protocole d’évacuation / Projection ». Plan 2 : contact de saisie ou neutralisation lié à « Protocole d’évacuation / Projection », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : regard vers l’outil puis retour vers l’adversaire, rangement/pose finale différente des trois autres. Respecter le ton nonlethal enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against its identified reference and only its visible extent. This is a 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Identity, costume, equipment and anatomical-side checks establish consistency with the source-backed visible facts and the explicitly qualified reconstructed parts; they do not certify unseen anatomy or clothing as canonical. Gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Physically viewed original official illustration establishes visible costume/accessories; it is not certified final-game full 3D geometry or texture.
- Back surfaces and unseen pose angles are adapted from visible official design, without a pixel-perfect claim.
- Sixteen action poses per direction are authored gameplay adaptation; no canonical technique or motion-capture claim.
- This depicts the human scientist costume, not a fabricated cyborg body or the Chaioth Ha Qadesh machine.
- [Native official character illustration/concept reproduced by Creative Uncut; not a final-game 3D model.](https://www.creativeuncut.com/gallery-11/mga2-dr-thomas-koppelthorn.html) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## archive__lucy_acid2

### LUCY / LUCINDA — AC!D 2

**Rôle :** Simulation prudente, pas de super-pouvoirs. **Profil :** `analyst`.

**Base présente dans le code :** Lucy/Lucinda : entrée héritée et identité à clarifier ; kit de simulation, aucune capacité psychique certifiée ajoutée.

**Incarnation à conserver :** Young child Lucy in the second PSP Ac!d official full-body coloured illustration, distinct from adult Lucinda Koppelthorn.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, special, specialForward, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `retro-msx`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** LUCY / LUCINDA : outil de lecture ou de communication montré par le profil, attitude d’observation. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Conserver la taille et la gestuelle de l’enfant ; gestes de simulation/assistance, pas un corps adulte redimensionné.
- **locomotion :** déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Simulation prudente, pas de super-pouvoirs » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder outil de lecture ou de communication montré par le profil, attitude d’observation.
- **jump_land :** LUCY / LUCINDA : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de LUCY / LUCINDA. Terminer par regard vers l’outil puis retour vers l’adversaire. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « AC!D 2 », présentation de Young child Lucy in the second PSP Ac!d official full-body coloured illustration, distinct from adult Lucinda Koppelthorn., puis outil de lecture ou de communication montré par le profil, attitude d’observation. Geste court lié à « Outil de proximité » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, regard vers l’outil puis retour vers l’adversaire ; LUCY / LUCINDA vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à AC!D 2.
- **round_loss :** Proposition CQC : LUCY / LUCINDA réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Fichier de secours », revenir par regard vers l’outil puis retour vers l’adversaire, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LUCY / LUCINDA, préparer « Jab » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LUCY / LUCINDA, préparer « Frappe engagée » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LUCY / LUCINDA, préparer « Balayage » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LUCY / LUCINDA, préparer « Projection » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Outil de proximité

**Existant :** `melee` / `electric` ; 17/5/29 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LUCY / LUCINDA, préparer « Outil de proximité » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Outil de proximité » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense. L’effet electric reste séparé du membre ; son apparition et sa disparition suivent les événements du profil.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Espacement ou garde ; choc bref avec résistance temporaire après application.

##### specialDown — Observer les signaux

**Existant :** `mark` / `recon` ; 26/1/30 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LUCY / LUCINDA, préparer « Observer les signaux » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Orienter regard, optique ou terminal vers la cible observée, sans consulter une action future.

**Action.** Pour « Observer les signaux », déclencher lecture/repérage avec un petit geste ou changement d’optique et un indicateur séparé. Le corps doit rester visible et vulnérable selon les données de combat.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Couper le signal ou abaisser l’outil ; retour vers l’adversaire sans nouvelle arme inventée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Portée limitée ; le marquage ne vise ni à travers toute l’arène ni automatiquement.

##### specialForward — Pas de retrait

**Existant :** `mobility` / `movement` ; 7/18/25 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LUCY / LUCINDA, préparer « Pas de retrait » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer l’appui qui produit le déplacement ; déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire.

**Action.** Exécuter « Pas de retrait » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 4 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : La silhouette reste touchable ; la sortie est punissable.

##### specialBack — Repli de Lucinda

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LUCY / LUCINDA, préparer « Repli de Lucinda » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer l’appui qui produit le déplacement ; déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire.

**Action.** Exécuter « Repli de Lucinda » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Fichier de secours

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LUCY / LUCINDA, préparer « Fichier de secours » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Fichier de secours », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Stabiliser la réserve

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LUCY / LUCINDA, préparer « Stabiliser la réserve » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Stabiliser la réserve ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Fichier de secours — Final

Famille `cqc`, ton `nonlethal` ; 220 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Fichier de secours / Outil de proximité.

Plan 1 : LUCY / LUCINDA sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Fichier de secours / Outil de proximité ». Plan 2 : contact de saisie ou neutralisation lié à « Fichier de secours / Outil de proximité », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : regard vers l’outil puis retour vers l’adversaire, pose de signature face à l’adversaire. Respecter le ton nonlethal enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Outil de proximité / Observer les signaux

Famille `electric`, ton `nonlethal` ; 238 ticks CQC ; phases actuelles : charge → arc → overload → shutdown. Appuis déclarés : Fichier de secours / Observer les signaux.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Fichier de secours / Observer les signaux » ; l’espace disponible doit être lisible. Plan 2 : montrer la source corporelle ou matérielle de « Fichier de secours / Observer les signaux ». Plan 3 : développer l’effet electric en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : regard vers l’outil puis retour vers l’adversaire, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton nonlethal enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Pas de retrait — Point final

Famille `cqc`, ton `nonlethal` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Fichier de secours / Pas de retrait.

Plan 1 : approche jusqu’à la distance réelle de « Fichier de secours / Pas de retrait », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Fichier de secours / Pas de retrait », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : regard vers l’outil puis retour vers l’adversaire, prise de distance et maintien final. Respecter le ton nonlethal enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Simulation prudente — Mission close

Famille `capture`, ton `nonlethal` ; 274 ticks CQC ; phases actuelles : stun → disarm → restrain → extract. Appuis déclarés : Fichier de secours / Projection.

Plan 1 : après une observation ou un repli, LUCY / LUCINDA reprend l’initiative par « Fichier de secours / Projection ». Plan 2 : contact de saisie ou neutralisation lié à « Fichier de secours / Projection », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : regard vers l’outil puis retour vers l’adversaire, rangement/pose finale différente des trois autres. Respecter le ton nonlethal enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against its identified reference and only its visible extent. This is a 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Identity, costume, equipment and anatomical-side checks establish consistency with the source-backed visible facts and the explicitly qualified reconstructed parts; they do not certify unseen anatomy or clothing as canonical. Gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Physically viewed original official illustration establishes visible costume/accessories; it is not certified final-game full 3D geometry or texture.
- Back surfaces and unseen pose angles are adapted from visible official design, without a pixel-perfect claim.
- Sixteen action poses per direction are authored gameplay adaptation; no canonical technique or motion-capture claim.
- Lucy and Lucinda Koppelthorn are distinct UIDs and designs; the Lucy reference must never be used as visual evidence for Lucinda.
- Child action poses are authored non-graphic gameplay movement, not proof of canonical fighting skills.
- [Native official character illustration/concept reproduced by Creative Uncut; not a final-game 3D model.](https://www.creativeuncut.com/gallery-11/mga2-lucy.html) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## archive__miranda_survive

### MIRANDA — SURVIVE

**Rôle :** Simulation prudente, pas de super-pouvoirs. **Profil :** `medic`.

**Base présente dans le code :** Soutien médical de Survive : soins plafonnés et défense légère, pas classe de combat inventée.

**Incarnation à conserver :** MIRANDA original released-game human portrait, before any mutation.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, special, specialForward, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** MIRANDA : matériel de soin distinct de toute arme éventuelle. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** approche mesurée et protection du patient/outillage. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Simulation prudente, pas de super-pouvoirs » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder matériel de soin distinct de toute arme éventuelle.
- **jump_land :** MIRANDA : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. approche mesurée et protection du patient/outillage. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de MIRANDA. Terminer par retrait des mains puis rangement de l’objet utilisé. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « SURVIVE », présentation de MIRANDA original released-game human portrait, before any mutation., puis matériel de soin distinct de toute arme éventuelle. Geste court lié à « Repousser le danger » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, retrait des mains puis rangement de l’objet utilisé ; MIRANDA vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à SURVIVE.
- **round_loss :** Proposition CQC : MIRANDA réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Retour au camp », revenir par retrait des mains puis rangement de l’objet utilisé, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MIRANDA, préparer « Jab » ; matériel de soin distinct de toute arme éventuelle. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retrait des mains puis rangement de l’objet utilisé.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MIRANDA, préparer « Frappe engagée » ; matériel de soin distinct de toute arme éventuelle. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retrait des mains puis rangement de l’objet utilisé.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MIRANDA, préparer « Balayage » ; matériel de soin distinct de toute arme éventuelle. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** retrait des mains puis rangement de l’objet utilisé.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MIRANDA, préparer « Projection » ; matériel de soin distinct de toute arme éventuelle. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** retrait des mains puis rangement de l’objet utilisé. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Repousser le danger

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MIRANDA, préparer « Repousser le danger » ; matériel de soin distinct de toute arme éventuelle. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Repousser le danger » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retrait des mains puis rangement de l’objet utilisé.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialDown — Trousse de Miranda

**Existant :** `heal` / `recovery` ; 45/1/38 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MIRANDA, préparer « Trousse de Miranda » ; matériel de soin distinct de toute arme éventuelle. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Trousse de Miranda ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** retrait des mains puis rangement de l’objet utilisé. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Ne restaure que les dégâts récupérables ; interrompre les 45 images de préparation.

##### specialForward — Se dégager

**Existant :** `mobility` / `movement` ; 7/18/25 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MIRANDA, préparer « Se dégager » ; matériel de soin distinct de toute arme éventuelle. Préparer l’appui qui produit le déplacement ; approche mesurée et protection du patient/outillage.

**Action.** Exécuter « Se dégager » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 4 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** retrait des mains puis rangement de l’objet utilisé. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : La silhouette reste touchable ; la sortie est punissable.

##### specialBack — Repli médical

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MIRANDA, préparer « Repli médical » ; matériel de soin distinct de toute arme éventuelle. Préparer l’appui qui produit le déplacement ; approche mesurée et protection du patient/outillage.

**Action.** Exécuter « Repli médical » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** retrait des mains puis rangement de l’objet utilisé. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Retour au camp

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MIRANDA, préparer « Retour au camp » ; matériel de soin distinct de toute arme éventuelle. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Retour au camp », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retrait des mains puis rangement de l’objet utilisé.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Reprendre son souffle

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MIRANDA, préparer « Reprendre son souffle » ; matériel de soin distinct de toute arme éventuelle. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Reprendre son souffle ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** retrait des mains puis rangement de l’objet utilisé. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Retour au camp — Final

Famille `cqc`, ton `nonlethal` ; 220 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Retour au camp / Repousser le danger.

Plan 1 : MIRANDA sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Retour au camp / Repousser le danger ». Plan 2 : contact de saisie ou neutralisation lié à « Retour au camp / Repousser le danger », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : retrait des mains puis rangement de l’objet utilisé, pose de signature face à l’adversaire. Respecter le ton nonlethal enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Repousser le danger / Trousse de Miranda

Famille `cqc`, ton `nonlethal` ; 238 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Retour au camp / Trousse de Miranda.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Retour au camp / Trousse de Miranda » ; l’espace disponible doit être lisible. Plan 2 : contact de saisie ou neutralisation lié à « Retour au camp / Trousse de Miranda », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : retrait des mains puis rangement de l’objet utilisé, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton nonlethal enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Se dégager — Point final

Famille `cqc`, ton `nonlethal` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Retour au camp / Se dégager.

Plan 1 : approche jusqu’à la distance réelle de « Retour au camp / Se dégager », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Retour au camp / Se dégager », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : retrait des mains puis rangement de l’objet utilisé, prise de distance et maintien final. Respecter le ton nonlethal enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Simulation prudente — Mission close

Famille `capture`, ton `nonlethal` ; 274 ticks CQC ; phases actuelles : stun → disarm → restrain → extract. Appuis déclarés : Retour au camp / Projection.

Plan 1 : après une observation ou un repli, MIRANDA reprend l’initiative par « Retour au camp / Projection ». Plan 2 : contact de saisie ou neutralisation lié à « Retour au camp / Projection », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : retrait des mains puis rangement de l’objet utilisé, rangement/pose finale différente des trois autres. Respecter le ton nonlethal enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against its identified reference and only its visible extent. This is a 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Identity, costume, equipment and anatomical-side checks establish consistency with the source-backed visible facts and the explicitly qualified reconstructed parts; they do not certify unseen anatomy or clothing as canonical. Gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Physically viewed original reference establishes only visible identity/costume/accessories; it is not certified whole-body final-game 3D geometry or texture.
- Back surfaces and unseen pose angles are adapted from visible source design, without a pixel-perfect claim.
- Sixteen action poses per direction are authored gameplay adaptation; no canonical technique or motion-capture claim.
- Only the physically visible extent establishes the design. Hidden legs, footwear, back, seams and carried equipment require another source or explicit authored reconstruction.
- The public native media URL returns WebP representation; exact bytes are preserved but are not certified equal to a historical original upload.
- Final-game portrait establishes face and visible upper torso only. Full trousers, shoes, hands, body stature, hidden back and standing stance are explicitly adapted, not certified original fullbody.
- No reference-proven held weapon is added merely because the historical gameplay weapon tag mentions a spear or rifle.
- Final head-to-foot scale and keyposes are authored from a partial original-game portrait; no full-body canonical certification.
- [original in-game capture or in-game illustrated scene, mirrored native public media](https://metalgear.fandom.com/wiki/File:Miranda.png) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## archive__chris_survive

### CHRIS — SURVIVE

**Rôle :** Simulation prudente, pas de super-pouvoirs. **Profil :** `civilian`.

**Base présente dans le code :** Habitant de Dite : survie de proximité ; aucun grade commando attribué sans preuve.

**Incarnation à conserver :** Chris child in original2018Survive ending, seated in original manualwheelchair; distinct from adultGoodluck.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, special, specialForward, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** CHRIS : posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas hésitants mais lisibles, en conservant l’âge et la stature. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Simulation prudente, pas de super-pouvoirs » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut.
- **jump_land :** CHRIS : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas hésitants mais lisibles, en conservant l’âge et la stature. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de CHRIS. Terminer par réaction humaine puis reprise d’appui ; combat explicitement simulé. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « SURVIVE », présentation de Chris child in original2018Survive ending, seated in original manualwheelchair; distinct from adultGoodluck., puis posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Geste court lié à « Poussée de Chris » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, réaction humaine puis reprise d’appui ; combat explicitement simulé ; CHRIS vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à SURVIVE.
- **round_loss :** Proposition CQC : CHRIS réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Évasion de la brume », revenir par réaction humaine puis reprise d’appui ; combat explicitement simulé, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Jab

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CHRIS, préparer « Jab » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Jab » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Frappe engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CHRIS, préparer « Frappe engagée » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Frappe engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CHRIS, préparer « Balayage » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CHRIS, préparer « Projection » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Poussée de Chris

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CHRIS, préparer « Poussée de Chris » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Poussée de Chris » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialDown — Repérer un chemin

**Existant :** `mark` / `recon` ; 26/1/30 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CHRIS, préparer « Repérer un chemin » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Orienter regard, optique ou terminal vers la cible observée, sans consulter une action future.

**Action.** Pour « Repérer un chemin », déclencher lecture/repérage avec un petit geste ou changement d’optique et un indicateur séparé. Le corps doit rester visible et vulnérable selon les données de combat.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé. Couper le signal ou abaisser l’outil ; retour vers l’adversaire sans nouvelle arme inventée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Portée limitée ; le marquage ne vise ni à travers toute l’arène ni automatiquement.

##### specialForward — Se dégager

**Existant :** `mobility` / `movement` ; 7/18/25 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CHRIS, préparer « Se dégager » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Préparer l’appui qui produit le déplacement ; pas hésitants mais lisibles, en conservant l’âge et la stature.

**Action.** Exécuter « Se dégager » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 4 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : La silhouette reste touchable ; la sortie est punissable.

##### specialBack — Repli de Chris

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CHRIS, préparer « Repli de Chris » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Préparer l’appui qui produit le déplacement ; pas hésitants mais lisibles, en conservant l’âge et la stature.

**Action.** Exécuter « Repli de Chris » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Évasion de la brume

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CHRIS, préparer « Évasion de la brume » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Évasion de la brume », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Reprendre son souffle

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CHRIS, préparer « Reprendre son souffle » ; posture défensive crédible pour ce civil ; aucun équipement militaire ajouté par défaut. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Reprendre son souffle ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** réaction humaine puis reprise d’appui ; combat explicitement simulé. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Évasion de la brume — Final

Famille `cqc`, ton `nonlethal` ; 220 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Évasion de la brume / Poussée de Chris.

Plan 1 : CHRIS sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Évasion de la brume / Poussée de Chris ». Plan 2 : contact de saisie ou neutralisation lié à « Évasion de la brume / Poussée de Chris », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : réaction humaine puis reprise d’appui ; combat explicitement simulé, pose de signature face à l’adversaire. Respecter le ton nonlethal enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Poussée de Chris / Repérer un chemin

Famille `cqc`, ton `nonlethal` ; 238 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Évasion de la brume / Repérer un chemin.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Évasion de la brume / Repérer un chemin » ; l’espace disponible doit être lisible. Plan 2 : contact de saisie ou neutralisation lié à « Évasion de la brume / Repérer un chemin », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : réaction humaine puis reprise d’appui ; combat explicitement simulé, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton nonlethal enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Se dégager — Point final

Famille `cqc`, ton `nonlethal` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Évasion de la brume / Se dégager.

Plan 1 : approche jusqu’à la distance réelle de « Évasion de la brume / Se dégager », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Évasion de la brume / Se dégager », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : réaction humaine puis reprise d’appui ; combat explicitement simulé, prise de distance et maintien final. Respecter le ton nonlethal enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Simulation prudente — Mission close

Famille `capture`, ton `nonlethal` ; 274 ticks CQC ; phases actuelles : stun → disarm → restrain → extract. Appuis déclarés : Évasion de la brume / Projection.

Plan 1 : après une observation ou un repli, CHRIS reprend l’initiative par « Évasion de la brume / Projection ». Plan 2 : contact de saisie ou neutralisation lié à « Évasion de la brume / Projection », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : réaction humaine puis reprise d’appui ; combat explicitement simulé, rangement/pose finale différente des trois autres. Respecter le ton nonlethal enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against its identified reference and only its visible extent. This is a 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Identity, costume, equipment and anatomical-side checks establish consistency with the source-backed visible facts and the explicitly qualified reconstructed parts; they do not certify unseen anatomy or clothing as canonical. Gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Physically viewed original reference establishes only visible identity/costume/accessories; it is not certified whole-body final-game 3D geometry or texture.
- Back surfaces and unseen pose angles are adapted from visible source design, without a pixel-perfect claim.
- Sixteen action poses per direction are authored gameplay adaptation; no canonical technique or motion-capture claim.
- Wheelchair locomotion is preserved; suspendedwormhole wholebody is not walkingproof.
- No invention of fixedsocksgarment where darklegs remain ambiguous.
- Chairfrontcaster/footrest hiddenparts and authored seatedgameplaystates remain reconstructed, not1:1certified.
- Original2018GameSpot ending shows Chris child WHOLE BODY floating in wormhole, plus actual seated manualwheelchair at65s and clear childface60s. Floating is not walkingproof.
- No natural walking/standing/kicking capability is invented: all fightinggame presentationstates keep child seated with resting legs and manualchair. CQC/support/action responses are authored gameplay adaptation.
- Originalchair frontcasters, footrestdetails and opposite-side perspectives remain partlyoccluded; only visible olddarkmetalframe/rearlargewheels/handles/armrests are source-backed.
- Darklegs cannot distinguish skin from socks in suppliedframes; no sockcuff/garment is claimed canon.
- Keep childChris separate from adultGoodluck physical incarnation. Relative on-screen164height is authored scale, not actual3Dmodelheight measurement.
- [Original final2018game cutscenes, publishednativeGameSpot960x540 wholeframes. Wholechild outfit/face plus actual seatedmanualchair visible; partlyhidden chairgeometry qualified reconstruction.](https://www.gamespot.com/videos/metal-gear-survive-main-ending-cutscenes-credits-a/2300-6442986/) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original final2018game ending cutscenes reproduced by GameSpot, publishednative960x540 wholeframe, no localresize/crop.](https://www.gamespot.com/videos/metal-gear-survive-main-ending-cutscenes-credits-a/2300-6442986/) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original final2018game ending cutscenes reproduced by GameSpot, publishednative960x540 wholeframe, no localresize/crop.](https://www.gamespot.com/videos/metal-gear-survive-main-ending-cutscenes-credits-a/2300-6442986/) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## archive__nicholas_survive

### NICHOLAS — SURVIVE

**Rôle :** Arme improvisée et défense construite. **Profil :** `survivor`.

**Base présente dans le code :** Survivant équipé pour l’exercice : arme improvisée, barricade et endurance.

**Incarnation à conserver :** NICHOLAS original released-game human portrait, before any mutation.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `blade` = light, heavy, special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** NICHOLAS : outil, équipement et protection de la version Survive choisie. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** mouvement utilitaire avec fatigue lisible, charge correctement portée. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Arme improvisée et défense construite » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder outil, équipement et protection de la version Survive choisie.
- **jump_land :** NICHOLAS : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. mouvement utilitaire avec fatigue lisible, charge correctement portée. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de NICHOLAS. Terminer par contrôle de l’outil et de l’environnement après l’action. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « SURVIVE », présentation de NICHOLAS original released-game human portrait, before any mutation., puis outil, équipement et protection de la version Survive choisie. Geste court lié à « Outil de Nicholas » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, contrôle de l’outil et de l’environnement après l’action ; NICHOLAS vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à SURVIVE.
- **round_loss :** Proposition CQC : NICHOLAS réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Défendre le camp », revenir par contrôle de l’outil et de l’environnement après l’action, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Contact de lame

**Existant :** `melee` / `spear` ; 7/3/12 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NICHOLAS, préparer « Contact de lame » ; outil, équipement et protection de la version Survive choisie. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** contrôle de l’outil et de l’environnement après l’action. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Coupe engagée

**Existant :** `melee` / `spear` ; 18/5/24 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NICHOLAS, préparer « Coupe engagée » ; outil, équipement et protection de la version Survive choisie. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** contrôle de l’outil et de l’environnement après l’action. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NICHOLAS, préparer « Balayage » ; outil, équipement et protection de la version Survive choisie. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** contrôle de l’outil et de l’environnement après l’action.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Projection

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NICHOLAS, préparer « Projection » ; outil, équipement et protection de la version Survive choisie. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** contrôle de l’outil et de l’environnement après l’action. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Outil de Nicholas

**Existant :** `melee` / `spear` ; 13/5/24 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NICHOLAS, préparer « Outil de Nicholas » ; outil, équipement et protection de la version Survive choisie. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** contrôle de l’outil et de l’environnement après l’action. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde puis punition ; la lame ne touche qu’une fois par attaque.

##### specialDown — Barricade de Nicholas

**Existant :** `trap` / `barricade` ; 34/1/34 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NICHOLAS, préparer « Barricade de Nicholas » ; outil, équipement et protection de la version Survive choisie. Prendre le dispositif, s’abaisser vers le support et indiquer le lieu de pose avant activation.

**Action.** Poser « Barricade de Nicholas » au point réel de main/outil, armer puis retirer le membre. Le dispositif possède ensuite son propre sprite, ses états attente/armement/déclenchement/destruction et sa collision.

**Retour.** contrôle de l’outil et de l’environnement après l’action. Se dégager de l’objet sans le téléporter ; l’interruption avant armement a sa propre sortie.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Marionnette ou drone visible et destructible ; deux maximum.

##### specialForward — Pousser la ligne

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NICHOLAS, préparer « Pousser la ligne » ; outil, équipement et protection de la version Survive choisie. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Pousser la ligne » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** contrôle de l’outil et de l’environnement après l’action.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Soins improvisés

**Existant :** `heal` / `recovery` ; 45/1/38 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NICHOLAS, préparer « Soins improvisés » ; outil, équipement et protection de la version Survive choisie. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Soins improvisés ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** contrôle de l’outil et de l’environnement après l’action. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Ne restaure que les dégâts récupérables ; interrompre les 45 images de préparation.

##### super — Défendre le camp

**Existant :** `melee` / `spear` ; 25/7/44 ticks ; groupe `blade`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NICHOLAS, préparer « Défendre le camp » ; outil, équipement et protection de la version Survive choisie. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** contrôle de l’outil et de l’environnement après l’action. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Reprendre son souffle

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de NICHOLAS, préparer « Reprendre son souffle » ; outil, équipement et protection de la version Survive choisie. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Reprendre son souffle ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** contrôle de l’outil et de l’environnement après l’action. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Défendre le camp — Final

Famille `cqc`, ton `stylized` ; 220 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Défendre le camp / Outil de Nicholas.

Plan 1 : NICHOLAS sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Défendre le camp / Outil de Nicholas ». Plan 2 : contact de saisie ou neutralisation lié à « Défendre le camp / Outil de Nicholas », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : contrôle de l’outil et de l’environnement après l’action, pose de signature face à l’adversaire.

##### Outil de Nicholas / Barricade de Nicholas

Famille `cqc`, ton `stylized` ; 238 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Défendre le camp / Barricade de Nicholas.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Défendre le camp / Barricade de Nicholas » ; l’espace disponible doit être lisible. Plan 2 : contact de saisie ou neutralisation lié à « Défendre le camp / Barricade de Nicholas », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : contrôle de l’outil et de l’environnement après l’action, arrêt du dispositif et retour au cadre d’ensemble.

##### Pousser la ligne — Point final

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Défendre le camp / Pousser la ligne.

Plan 1 : approche jusqu’à la distance réelle de « Défendre le camp / Pousser la ligne », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Défendre le camp / Pousser la ligne », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : contrôle de l’outil et de l’environnement après l’action, prise de distance et maintien final.

##### Sang-froid — Mission close

Famille `tactical`, ton `stylized` ; 274 ticks CQC ; phases actuelles : mark → flank → confirm → clear. Appuis déclarés : Défendre le camp / Projection.

Plan 1 : après une observation ou un repli, NICHOLAS reprend l’initiative par « Défendre le camp / Projection ». Plan 2 : matérialiser le geste tactique « Défendre le camp / Projection » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : contrôle de l’outil et de l’environnement après l’action, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against its identified reference and only its visible extent. This is a 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Identity, costume, equipment and anatomical-side checks establish consistency with the source-backed visible facts and the explicitly qualified reconstructed parts; they do not certify unseen anatomy or clothing as canonical. Gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Physically viewed original reference establishes only visible identity/costume/accessories; it is not certified whole-body final-game 3D geometry or texture.
- Back surfaces and unseen pose angles are adapted from visible source design, without a pixel-perfect claim.
- Sixteen action poses per direction are authored gameplay adaptation; no canonical technique or motion-capture claim.
- Only the physically visible extent establishes the design. Hidden legs, footwear, back, seams and carried equipment require another source or explicit authored reconstruction.
- The public native media URL returns WebP representation; exact bytes are preserved but are not certified equal to a historical original upload.
- Final-game portrait establishes face and visible upper torso only. Full trousers, shoes, hands, body stature, hidden back and standing stance are explicitly adapted, not certified original fullbody.
- No reference-proven held weapon is added merely because the historical gameplay weapon tag mentions a spear or rifle.
- Final head-to-foot scale and keyposes are authored from a partial original-game portrait; no full-body canonical certification.
- [original in-game capture or in-game illustrated scene, mirrored native public media](https://metalgear.fandom.com/wiki/File:Nicholas.png) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## archive__virgil_at9

### VIRGIL AT-9 — SURVIVE

**Rôle :** Reconnaissance robotique et électrode. **Profil :** `small_drone`.

**Base présente dans le code :** IA de Survive : le drone mobile est une simulation du projet, pas un corps canonique certifié.

**Incarnation à conserver :** IA de Survive : le drone mobile est une simulation du projet, pas un corps canonique certifié.

**État vérifié :** route machine effectivement déclarée ; animations d’articulation à contrôler. Une route machine est déclarée dans le runtime. Ses articulations remplacent le catalogue de corps contrôlé ; ce n’est pas un constat de sprite absent.

**Réemplois à examiner :** pas de groupe natif partagé observé dans cette extraction.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** VIRGIL AT-9 : châssis, jambes/roues et module optique correctement orientés. Petits ajustements mécaniques des organes présents et optique stable ; aucune respiration humaine. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** cycle de locomotion mécanique ; pas de genoux humains. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Reconnaissance robotique et électrode » : orientation défensive du châssis, des membres ou de la protection effectivement présente ; pas d’avant-bras humain ajouté ; recul bloqué distinct de la simple position basse. Garder châssis, jambes/roues et module optique correctement orientés.
- **jump_land :** VIRGIL AT-9 : départ par poussée ou articulation autorisée, déplacement aérien puis stabilisation et reprise d’appui ; les appareils volants gardent leur mode de sustentation. cycle de locomotion mécanique ; pas de genoux humains. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Secousse du châssis et de l’organe touché de VIRGIL AT-9, déséquilibre, arrêt puis remise en position par ses articulations réelles. Terminer par retour de l’outil ou de la caméra sur sa charnière. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « SURVIVE », présentation de IA de Survive : le drone mobile est une simulation du projet, pas un corps canonique certifié., puis châssis, jambes/roues et module optique correctement orientés. Geste court lié à « Sonde de proximité » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, retour de l’outil ou de la caméra sur sa charnière ; VIRGIL AT-9 vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à SURVIVE.
- **round_loss :** Proposition CQC : VIRGIL AT-9 interrompt ses émissions, absorbe l’oscillation de sa masse, stabilise ses appuis ou son vol, puis replace ses organes ; aucune régénération gratuite. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Impulsion de contrôle », revenir par retour de l’outil ou de la caméra sur sa charnière, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Contact du bras

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de VIRGIL AT-9, préparer « Contact du bras » ; châssis, jambes/roues et module optique correctement orientés. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Contact du bras » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour de l’outil ou de la caméra sur sa charnière.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Impulsion du bras

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de VIRGIL AT-9, préparer « Impulsion du bras » ; châssis, jambes/roues et module optique correctement orientés. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Impulsion du bras », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retour de l’outil ou de la caméra sur sa charnière.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de VIRGIL AT-9, préparer « Balayage » ; châssis, jambes/roues et module optique correctement orientés. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** retour de l’outil ou de la caméra sur sa charnière.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Poussée du châssis

**Existant :** `melee` / `strike` ; 13/4/32 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de VIRGIL AT-9, préparer « Poussée du châssis » ; châssis, jambes/roues et module optique correctement orientés. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Poussée du châssis » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour de l’outil ou de la caméra sur sa charnière.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### special — Sonde de proximité

**Existant :** `melee` / `electric` ; 17/5/29 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de VIRGIL AT-9, préparer « Sonde de proximité » ; châssis, jambes/roues et module optique correctement orientés. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Sonde de proximité » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense. L’effet electric reste séparé du membre ; son apparition et sa disparition suivent les événements du profil.

**Retour.** retour de l’outil ou de la caméra sur sa charnière.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Espacement ou garde ; choc bref avec résistance temporaire après application.

##### specialDown — Analyse AT-9

**Existant :** `mark` / `recon` ; 26/1/30 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de VIRGIL AT-9, préparer « Analyse AT-9 » ; châssis, jambes/roues et module optique correctement orientés. Orienter regard, optique ou terminal vers la cible observée, sans consulter une action future.

**Action.** Pour « Analyse AT-9 », déclencher lecture/repérage avec un petit geste ou changement d’optique et un indicateur séparé. Le corps doit rester visible et vulnérable selon les données de combat.

**Retour.** retour de l’outil ou de la caméra sur sa charnière. Couper le signal ou abaisser l’outil ; retour vers l’adversaire sans nouvelle arme inventée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Portée limitée ; le marquage ne vise ni à travers toute l’arène ni automatiquement.

##### specialForward — Signal brouillé

**Existant :** `buff` / `stealth` ; 19/1/27 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de VIRGIL AT-9, préparer « Signal brouillé » ; châssis, jambes/roues et module optique correctement orientés. Montrer la préparation corporelle ou mécanique de « Signal brouillé ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** retour de l’outil ou de la caméra sur sa charnière. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Silhouette translucide, collision intacte ; une attaque ou un impact brise le camouflage.

##### specialBack — Retrait de la sonde

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de VIRGIL AT-9, préparer « Retrait de la sonde » ; châssis, jambes/roues et module optique correctement orientés. Préparer l’appui qui produit le déplacement ; cycle de locomotion mécanique ; pas de genoux humains.

**Action.** Exécuter « Retrait de la sonde » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** retour de l’outil ou de la caméra sur sa charnière. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Impulsion de contrôle

**Existant :** `melee` / `electric` ; 25/1/34 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de VIRGIL AT-9, préparer « Impulsion de contrôle » ; châssis, jambes/roues et module optique correctement orientés. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Impulsion de contrôle », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan. L’effet electric reste séparé du membre ; son apparition et sa disparition suivent les événements du profil.

**Retour.** retour de l’outil ou de la caméra sur sa charnière.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde ; l’EMP ouvre les défenses des machines sans les désactiver définitivement.

##### utility — Recharge de la batterie

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de VIRGIL AT-9, préparer « Recharge de la batterie » ; châssis, jambes/roues et module optique correctement orientés. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Recharge de la batterie ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** retour de l’outil ou de la caméra sur sa charnière. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Virgil Protocol

Famille `electric`, ton `simulation` ; 220 ticks CQC ; phases actuelles : charge → arc → overload → shutdown. Appuis déclarés : Impulsion de contrôle / Sonde de proximité.

Plan 1 : VIRGIL AT-9 sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Impulsion de contrôle / Sonde de proximité ». Plan 2 : montrer la source corporelle ou matérielle de « Impulsion de contrôle / Sonde de proximité ». Plan 3 : développer l’effet electric en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : retour de l’outil ou de la caméra sur sa charnière, pose de signature face à l’adversaire. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### AT-9 Pulse

Famille `electric`, ton `simulation` ; 238 ticks CQC ; phases actuelles : charge → arc → overload → shutdown. Appuis déclarés : Impulsion de contrôle / Analyse AT-9.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Impulsion de contrôle / Analyse AT-9 » ; l’espace disponible doit être lisible. Plan 2 : montrer la source corporelle ou matérielle de « Impulsion de contrôle / Analyse AT-9 ». Plan 3 : développer l’effet electric en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : retour de l’outil ou de la caméra sur sa charnière, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Dite Network

Famille `mechanical`, ton `simulation` ; 256 ticks CQC ; phases actuelles : lock → barrage → core → shutdown. Appuis déclarés : Impulsion de contrôle / Signal brouillé.

Plan 1 : approche jusqu’à la distance réelle de « Impulsion de contrôle / Signal brouillé », arme et main libre identifiées. Plan 2 : cycle de locomotion mécanique ; pas de genoux humains ; montrer l’organe de « Impulsion de contrôle / Signal brouillé ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : retour de l’outil ou de la caméra sur sa charnière, prise de distance et maintien final. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### AI Shutdown

Famille `capture`, ton `simulation` ; 274 ticks CQC ; phases actuelles : stun → disarm → restrain → extract. Appuis déclarés : Impulsion de contrôle / Poussée du châssis.

Plan 1 : après une observation ou un repli, VIRGIL AT-9 reprend l’initiative par « Impulsion de contrôle / Poussée du châssis ». Plan 2 : contact de saisie ou neutralisation lié à « Impulsion de contrôle / Poussée du châssis », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : retour de l’outil ou de la caméra sur sa charnière, rangement/pose finale différente des trois autres. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Aucun pouvoir importé d’une autre incarnation.
- Aucune invulnérabilité permanente, saisie infinie ou contrôle des touches adverses.
- Drone d’observation : canon, railgun et saisie humaine exclus.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).
