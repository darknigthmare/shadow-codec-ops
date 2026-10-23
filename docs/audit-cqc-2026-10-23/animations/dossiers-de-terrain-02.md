# Animations — DOSSIERS DE TERRAIN

**10 acteurs du registre courant.** Les titres d’actions et paramètres sont observés ; les descriptions sont des propositions CQC à produire et valider. Un groupe de frames existant ne certifie pas l’ensemble du mouvement ou sa fidélité originale.

[Index des fiches](README.md) · [Contrat commun](../04_ANIMATIONS_SPRITES.md)

## Sommaire

- [DOUBLE TRIPOD](#pass19__dwarf_gekko_humanoid_mgr) — MGR
- [LOVE BOX](#pass19__love_box_pw) — PEACE WALKER
- [BOX-TANK](#pass19__box_tank_pw) — PEACE WALKER
- [BOX-TANK — STUN](#pass19__box_tank_stun_pw) — PEACE WALKER
- [BOX-TANK — SMOKE](#pass19__box_tank_smoke_pw) — PEACE WALKER
- [BOX BOMB](#pass19__bomb_box_pw) — PEACE WALKER
- [BOX STUN](#pass19__stun_box_pw) — PEACE WALKER
- [BOX SMOKE](#pass19__smoke_box_pw) — PEACE WALKER
- [ASSN. BOX](#pass19__assassin_box_pw) — PEACE WALKER
- [RESCUE BOX](#pass19__rescue_box_pw) — PEACE WALKER

## pass19__dwarf_gekko_humanoid_mgr

### DOUBLE TRIPOD — MGR

**Rôle :** Reconnaissance robotique et électrode. **Profil :** `small_drone`.

**Base présente dans le code :** Two connected Dwarf Gekko in humanoid arrangement; no trenchcoat/fedora.

**Incarnation à conserver :** Two connected Dwarf Gekko in humanoid arrangement; no trenchcoat/fedora.

**État vérifié :** route machine effectivement déclarée ; animations d’articulation à contrôler. Une route machine est déclarée dans le runtime. Ses articulations remplacent le catalogue de corps contrôlé ; ce n’est pas un constat de sprite absent.

**Réemplois à examiner :** pas de groupe natif partagé observé dans cette extraction.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `trenchcoat`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** DOUBLE TRIPOD : châssis, jambes/roues et module optique correctement orientés. Petits ajustements mécaniques des organes présents et optique stable ; aucune respiration humaine. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** cycle de locomotion mécanique ; pas de genoux humains. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Reconnaissance robotique et électrode » : orientation défensive du châssis, des membres ou de la protection effectivement présente ; pas d’avant-bras humain ajouté ; recul bloqué distinct de la simple position basse. Garder châssis, jambes/roues et module optique correctement orientés.
- **jump_land :** DOUBLE TRIPOD : départ par poussée ou articulation autorisée, déplacement aérien puis stabilisation et reprise d’appui ; les appareils volants gardent leur mode de sustentation. cycle de locomotion mécanique ; pas de genoux humains. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Secousse du châssis et de l’organe touché de DOUBLE TRIPOD, déséquilibre, arrêt puis remise en position par ses articulations réelles. Terminer par retour de l’outil ou de la caméra sur sa charnière. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGR », présentation de Two connected Dwarf Gekko in humanoid arrangement; no trenchcoat/fedora., puis châssis, jambes/roues et module optique correctement orientés. Geste court lié à « Impulsion du Double Tripod » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, retour de l’outil ou de la caméra sur sa charnière ; DOUBLE TRIPOD vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGR.
- **round_loss :** Proposition CQC : DOUBLE TRIPOD interrompt ses émissions, absorbe l’oscillation de sa masse, stabilise ses appuis ou son vol, puis replace ses organes ; aucune régénération gratuite. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Assaut décisif », revenir par retour de l’outil ou de la caméra sur sa charnière, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Contact

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de DOUBLE TRIPOD, préparer « Contact » ; châssis, jambes/roues et module optique correctement orientés. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Contact » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour de l’outil ou de la caméra sur sa charnière.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### heavy — Percussion

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de DOUBLE TRIPOD, préparer « Percussion » ; châssis, jambes/roues et module optique correctement orientés. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Percussion », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retour de l’outil ou de la caméra sur sa charnière.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de DOUBLE TRIPOD, préparer « Balayage » ; châssis, jambes/roues et module optique correctement orientés. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** retour de l’outil ou de la caméra sur sa charnière.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### throw — Saisie

**Existant :** `melee` / `grapple` ; 13/4/32 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de DOUBLE TRIPOD, préparer « Saisie » ; châssis, jambes/roues et module optique correctement orientés. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** retour de l’outil ou de la caméra sur sa charnière. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### special — Impulsion du Double Tripod

**Existant :** `melee` / `electric` ; 18/6/31 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de DOUBLE TRIPOD, préparer « Impulsion du Double Tripod » ; châssis, jambes/roues et module optique correctement orientés. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Impulsion du Double Tripod » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense. L’effet electric reste séparé du membre ; son apparition et sa disparition suivent les événements du profil.

**Retour.** retour de l’outil ou de la caméra sur sa charnière.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### specialDown — Repli offensif

**Existant :** `melee` / `strike` ; 26/1/30 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de DOUBLE TRIPOD, préparer « Repli offensif » ; châssis, jambes/roues et module optique correctement orientés. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Repli offensif » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour de l’outil ou de la caméra sur sa charnière.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### specialForward — Ruée

**Existant :** `melee` / `strike` ; 7/18/25 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de DOUBLE TRIPOD, préparer « Ruée » ; châssis, jambes/roues et module optique correctement orientés. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Ruée » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour de l’outil ou de la caméra sur sa charnière.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### specialBack — Recul offensif

**Existant :** `melee` / `strike` ; 4/18/23 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de DOUBLE TRIPOD, préparer « Recul offensif » ; châssis, jambes/roues et module optique correctement orientés. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Recul offensif » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour de l’outil ou de la caméra sur sa charnière.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### super — Assaut décisif

**Existant :** `melee` / `strike` ; 25/1/34 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de DOUBLE TRIPOD, préparer « Assaut décisif » ; châssis, jambes/roues et module optique correctement orientés. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Assaut décisif », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retour de l’outil ou de la caméra sur sa charnière.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### utility — Régulation du châssis

**Existant :** `recover` / `recovery` ; 48/1/24 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de DOUBLE TRIPOD, préparer « Régulation du châssis » ; châssis, jambes/roues et module optique correctement orientés. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Régulation du châssis ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** retour de l’outil ou de la caméra sur sa charnière. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Assaut décisif · conclusion

Famille `mechanical`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Assaut décisif.

Plan 1 : DOUBLE TRIPOD sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Assaut décisif ». Plan 2 : cycle de locomotion mécanique ; pas de genoux humains ; montrer l’organe de « Assaut décisif ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : retour de l’outil ou de la caméra sur sa charnière, pose de signature face à l’adversaire.

##### Repli offensif · conclusion

Famille `mechanical`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Repli offensif.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Repli offensif » ; l’espace disponible doit être lisible. Plan 2 : cycle de locomotion mécanique ; pas de genoux humains ; montrer l’organe de « Repli offensif ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : retour de l’outil ou de la caméra sur sa charnière, arrêt du dispositif et retour au cadre d’ensemble.

##### Ruée · conclusion

Famille `mechanical`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Ruée.

Plan 1 : approche jusqu’à la distance réelle de « Ruée », arme et main libre identifiées. Plan 2 : cycle de locomotion mécanique ; pas de genoux humains ; montrer l’organe de « Ruée ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : retour de l’outil ou de la caméra sur sa charnière, prise de distance et maintien final.

##### Saisie · conclusion

Famille `mechanical`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Saisie.

Plan 1 : après une observation ou un repli, DOUBLE TRIPOD reprend l’initiative par « Saisie ». Plan 2 : cycle de locomotion mécanique ; pas de genoux humains ; montrer l’organe de « Saisie ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : retour de l’outil ou de la caméra sur sa charnière, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Profil de versus adapté; valeurs et animations non extraites du jeu source.
- Références de silhouette et qualité native validées séparément.
- Ce profil CQC ne revendique pas une extraction exacte des attaques ou paramètres du jeu source.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## pass19__love_box_pw

### LOVE BOX — PEACE WALKER

**Rôle :** Opérateur humain sous équipement de terrain. **Profil :** `boxed_operator`.

**Base présente dans le code :** Rectangular LOVE PACK box; operator boots visible below, shoulders/head hidden.

**Incarnation à conserver :** Peace Walker equipment with hidden MSF human operator — CQC playable adaptation

**État vérifié :** métadonnées natives avec limites. 32 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, special, specialForward ; `heavy` = heavy, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** LOVE BOX : opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas visibles sous le carton et inertie légère du volume ; pas de métal lourd inventé. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Opérateur humain sous équipement de terrain » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place.
- **jump_land :** LOVE BOX : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas visibles sous le carton et inertie légère du volume ; pas de métal lourd inventé. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de LOVE BOX. Terminer par arrêt du carton puis stabilisation de l’outil monté dessus. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « PEACE WALKER », présentation de Peace Walker equipment with hidden MSF human operator — CQC playable adaptation, puis opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Geste court lié à « Abri de la Love Box » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, arrêt du carton puis stabilisation de l’outil monté dessus ; LOVE BOX vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à PEACE WALKER.
- **round_loss :** Proposition CQC : LOVE BOX réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Assaut décisif », revenir par arrêt du carton puis stabilisation de l’outil monté dessus, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Contact

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LOVE BOX, préparer « Contact » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Contact » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### heavy — Percussion

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LOVE BOX, préparer « Percussion » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Percussion », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LOVE BOX, préparer « Balayage » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### throw — Saisie

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LOVE BOX, préparer « Saisie » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### special — Abri de la Love Box

**Existant :** `buff` / `armor` ; 26/1/30 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LOVE BOX, préparer « Abri de la Love Box » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Montrer la préparation corporelle ou mécanique de « Abri de la Love Box ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### specialDown — Glissade de l’opérateur

**Existant :** `mobility` / `movement` ; 11/12/26 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LOVE BOX, préparer « Glissade de l’opérateur » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Préparer l’appui qui produit le déplacement ; pas visibles sous le carton et inertie légère du volume ; pas de métal lourd inventé.

**Action.** Exécuter « Glissade de l’opérateur » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 3 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### specialForward — Avance sous couverture

**Existant :** `mobility` / `movement` ; 8/18/23 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LOVE BOX, préparer « Avance sous couverture » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Préparer l’appui qui produit le déplacement ; pas visibles sous le carton et inertie légère du volume ; pas de métal lourd inventé.

**Action.** Exécuter « Avance sous couverture » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 5 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### specialBack — Couverture du carton

**Existant :** `buff` / `stealth` ; 20/1/27 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LOVE BOX, préparer « Couverture du carton » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Montrer la préparation corporelle ou mécanique de « Couverture du carton ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### super — Assaut décisif

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LOVE BOX, préparer « Assaut décisif » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Assaut décisif », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### utility — Reconditionner l’équipement

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LOVE BOX, préparer « Reconditionner l’équipement » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Reconditionner l’équipement », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Assaut décisif · conclusion

Famille `cqc`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Assaut décisif.

Plan 1 : LOVE BOX sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Assaut décisif ». Plan 2 : contact de saisie ou neutralisation lié à « Assaut décisif », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : arrêt du carton puis stabilisation de l’outil monté dessus, pose de signature face à l’adversaire.

##### Glissade de l’opérateur · conclusion

Famille `cqc`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Glissade de l’opérateur.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Glissade de l’opérateur » ; l’espace disponible doit être lisible. Plan 2 : contact de saisie ou neutralisation lié à « Glissade de l’opérateur », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : arrêt du carton puis stabilisation de l’outil monté dessus, arrêt du dispositif et retour au cadre d’ensemble.

##### Avance sous couverture · conclusion

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Avance sous couverture.

Plan 1 : approche jusqu’à la distance réelle de « Avance sous couverture », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Avance sous couverture », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : arrêt du carton puis stabilisation de l’outil monté dessus, prise de distance et maintien final.

##### Saisie · conclusion

Famille `cqc`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Saisie.

Plan 1 : après une observation ou un repli, LOVE BOX reprend l’initiative par « Saisie ». Plan 2 : contact de saisie ou neutralisation lié à « Saisie », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : arrêt du carton puis stabilisation de l’outil monté dessus, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Canonical Peace Walker object appearance reproduced as a painted adaptation; exact original-game pixel-perfect fidelity is not certified.
- Sixteen actual authored physical keyposes per native direction, thirty-two per equipment fighter; animation action groups deliberately reuse these keyposes.
- Unnamed human operator and CQC combat animations are an original playable adaptation; no new canonical story, named identity or official combat-move claim.
- Box Tank has two hidden human operators and four human boots; illustrated tank wheels are printed cardboard texture, not moving metal tracks.
- Native generated PNG bytes remain unchanged. Read-only alpha bounds and optional Canvas vector clipping isolate silhouettes; no raster resampling, trimming, mirroring or alpha rewriting.
- Visual reference size estimates are not official published metric dimensions.
- [Original Peace Walker HD game screenshot #49 and licensed 2010 Love Pack replica physically viewed: salmon-pink rectangular box, cream pinstriping and packaging band; operator fighting keyposes authored for CQC.](https://superadventuresingaming.blogspot.com/2020/02/metal-gear-solid-peace-walker-psp.html) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original Peace Walker HD game screenshot #49 and licensed 2010 Love Pack replica physically viewed: salmon-pink rectangular box, cream pinstriping and packaging band; operator fighting keyposes authored for CQC.](https://store.kadokawa.co.jp/shop/g/g4988602150261/) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## pass19__box_tank_pw

### BOX-TANK — PEACE WALKER

**Rôle :** Opérateur humain sous équipement de terrain. **Profil :** `boxed_operator`.

**Base présente dans le code :** Cardboard tank hull and turret, human operators underneath; no real metal treads.

**Incarnation à conserver :** Peace Walker equipment with hidden MSF human operator — CQC playable adaptation

**État vérifié :** métadonnées natives avec limites. 32 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `shoot` = special, specialForward, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** BOX-TANK : opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas visibles sous le carton et inertie légère du volume ; pas de métal lourd inventé. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Opérateur humain sous équipement de terrain » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place.
- **jump_land :** BOX-TANK : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas visibles sous le carton et inertie légère du volume ; pas de métal lourd inventé. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de BOX-TANK. Terminer par arrêt du carton puis stabilisation de l’outil monté dessus. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « PEACE WALKER », présentation de Peace Walker equipment with hidden MSF human operator — CQC playable adaptation, puis opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Geste court lié à « Obus du Box Tank » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, arrêt du carton puis stabilisation de l’outil monté dessus ; BOX-TANK vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à PEACE WALKER.
- **round_loss :** Proposition CQC : BOX-TANK réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Salve du Box Tank », revenir par arrêt du carton puis stabilisation de l’outil monté dessus, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Contact

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX-TANK, préparer « Contact » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Contact » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### heavy — Percussion

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX-TANK, préparer « Percussion » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Percussion », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX-TANK, préparer « Balayage » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### throw — Saisie

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX-TANK, préparer « Saisie » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### special — Obus du Box Tank

**Existant :** `projectile` / `explosive` ; 25/1/33 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX-TANK, préparer « Obus du Box Tank » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Prélever l’objet correspondant à « Obus du Box Tank », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 55 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### specialDown — Glissade de l’opérateur

**Existant :** `mobility` / `movement` ; 11/12/26 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX-TANK, préparer « Glissade de l’opérateur » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Préparer l’appui qui produit le déplacement ; pas visibles sous le carton et inertie légère du volume ; pas de métal lourd inventé.

**Action.** Exécuter « Glissade de l’opérateur » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 3 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### specialForward — Avance sous couverture

**Existant :** `mobility` / `movement` ; 8/18/23 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX-TANK, préparer « Avance sous couverture » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Préparer l’appui qui produit le déplacement ; pas visibles sous le carton et inertie légère du volume ; pas de métal lourd inventé.

**Action.** Exécuter « Avance sous couverture » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 5 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### specialBack — Couverture du carton

**Existant :** `buff` / `stealth` ; 20/1/27 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX-TANK, préparer « Couverture du carton » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Montrer la préparation corporelle ou mécanique de « Couverture du carton ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### super — Salve du Box Tank

**Existant :** `projectile` / `explosive` ; 25/1/33 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX-TANK, préparer « Salve du Box Tank » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Prélever l’objet correspondant à « Salve du Box Tank », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. La salve contient 3 émissions, espacées de 14 ticks CQC : recalculer le point de bouche à chaque départ. L’objet conserve sa mèche de 55 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### utility — Reconditionner l’équipement

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX-TANK, préparer « Reconditionner l’équipement » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Reconditionner l’équipement », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Salve du Box Tank · conclusion

Famille `cqc`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Salve du Box Tank.

Plan 1 : BOX-TANK sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Salve du Box Tank ». Plan 2 : contact de saisie ou neutralisation lié à « Salve du Box Tank », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : arrêt du carton puis stabilisation de l’outil monté dessus, pose de signature face à l’adversaire.

##### Glissade de l’opérateur · conclusion

Famille `cqc`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Glissade de l’opérateur.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Glissade de l’opérateur » ; l’espace disponible doit être lisible. Plan 2 : contact de saisie ou neutralisation lié à « Glissade de l’opérateur », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : arrêt du carton puis stabilisation de l’outil monté dessus, arrêt du dispositif et retour au cadre d’ensemble.

##### Avance sous couverture · conclusion

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Avance sous couverture.

Plan 1 : approche jusqu’à la distance réelle de « Avance sous couverture », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Avance sous couverture », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : arrêt du carton puis stabilisation de l’outil monté dessus, prise de distance et maintien final.

##### Saisie · conclusion

Famille `cqc`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Saisie.

Plan 1 : après une observation ou un repli, BOX-TANK reprend l’initiative par « Saisie ». Plan 2 : contact de saisie ou neutralisation lié à « Saisie », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : arrêt du carton puis stabilisation de l’outil monté dessus, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Canonical Peace Walker object appearance reproduced as a painted adaptation; exact original-game pixel-perfect fidelity is not certified.
- Unnamed human operator and CQC combat animations are an original playable adaptation; no new canonical story, named identity or official combat-move claim.
- Box Tank has two hidden human operators and four human boots; illustrated tank wheels are printed cardboard texture, not moving metal tracks.
- Native generated PNG bytes remain unchanged. Read-only alpha bounds and optional Canvas vector clipping isolate silhouettes; no raster resampling, trimming, mirroring or alpha rewriting.
- Visual reference size estimates are not official published metric dimensions.
- Pass20: sixteen authored poses per direction, thirty-two physical poses shared across three canonical ammunition loads (ninety-six equipment pose mappings).
- All thirty-two selected new native figures were physically inspected with four separate human boots arranged as two hidden operators. Four rejected generated atlases are retained and are not used at runtime.
- Canonical exterior family recreated as original hand-painted sprites from original-game reference. Absolute pixel-for-pixel reproduction and official metric size are not certified.
- Action groups reuse the sixteen native keyposes per direction. Combat profiles, equipment identities, ammunition and original scale settings are unchanged.
- [Original 2010 Peace Walker press screenshot physically viewed: green cardboard hull, printed wheels/tracks and angular turret with ONE square cannon. Two co-op operators confirmed by equipment data; four human boot legs shown in adaptation.](https://www.gamesradar.com/8-things-you-need-to-know-about-mgs-peace-walker/2/) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Original 2010 Peace Walker press screenshot physically viewed: green cardboard hull, printed wheels/tracks and angular turret with ONE square cannon. Two co-op operators confirmed by equipment data; four human boot legs shown in adaptation.](https://mgcvt.com/guide/mgspw/equipment.htm) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## pass19__box_tank_stun_pw

### BOX-TANK — STUN — PEACE WALKER

**Rôle :** Opérateur humain sous équipement de terrain. **Profil :** `boxed_operator`.

**Base présente dans le code :** Cardboard tank with stun ammunition; operator-based assembly.

**Incarnation à conserver :** Peace Walker equipment with hidden MSF human operator — CQC playable adaptation

**État vérifié :** métadonnées natives avec limites. 32 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `shoot` = special, specialForward, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** BOX-TANK — STUN : opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas visibles sous le carton et inertie légère du volume ; pas de métal lourd inventé. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Opérateur humain sous équipement de terrain » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place.
- **jump_land :** BOX-TANK — STUN : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas visibles sous le carton et inertie légère du volume ; pas de métal lourd inventé. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de BOX-TANK — STUN. Terminer par arrêt du carton puis stabilisation de l’outil monté dessus. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « PEACE WALKER », présentation de Peace Walker equipment with hidden MSF human operator — CQC playable adaptation, puis opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Geste court lié à « Obus assommant » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, arrêt du carton puis stabilisation de l’outil monté dessus ; BOX-TANK — STUN vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à PEACE WALKER.
- **round_loss :** Proposition CQC : BOX-TANK — STUN réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Salve non létale », revenir par arrêt du carton puis stabilisation de l’outil monté dessus, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Contact

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX-TANK — STUN, préparer « Contact » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Contact » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### heavy — Percussion

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX-TANK — STUN, préparer « Percussion » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Percussion », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX-TANK — STUN, préparer « Balayage » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### throw — Saisie

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX-TANK — STUN, préparer « Saisie » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### special — Obus assommant

**Existant :** `projectile` / `tranq` ; 25/1/33 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX-TANK — STUN, préparer « Obus assommant » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Montrer la prise et la visée de l’arme décrite par « Obus assommant » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. L’objet conserve sa mèche de 55 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### specialDown — Glissade de l’opérateur

**Existant :** `mobility` / `movement` ; 11/12/26 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX-TANK — STUN, préparer « Glissade de l’opérateur » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Préparer l’appui qui produit le déplacement ; pas visibles sous le carton et inertie légère du volume ; pas de métal lourd inventé.

**Action.** Exécuter « Glissade de l’opérateur » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 3 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### specialForward — Avance sous couverture

**Existant :** `mobility` / `movement` ; 8/18/23 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX-TANK — STUN, préparer « Avance sous couverture » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Préparer l’appui qui produit le déplacement ; pas visibles sous le carton et inertie légère du volume ; pas de métal lourd inventé.

**Action.** Exécuter « Avance sous couverture » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 5 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### specialBack — Couverture du carton

**Existant :** `buff` / `stealth` ; 20/1/27 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX-TANK — STUN, préparer « Couverture du carton » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Montrer la préparation corporelle ou mécanique de « Couverture du carton ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### super — Salve non létale

**Existant :** `projectile` / `tranq` ; 25/1/33 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX-TANK — STUN, préparer « Salve non létale » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Montrer la prise et la visée de l’arme décrite par « Salve non létale » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 3 émissions, espacées de 14 ticks CQC : recalculer le point de bouche à chaque départ. L’objet conserve sa mèche de 55 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### utility — Reconditionner l’équipement

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX-TANK — STUN, préparer « Reconditionner l’équipement » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Reconditionner l’équipement », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Salve non létale · conclusion

Famille `cqc`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Salve non létale.

Plan 1 : BOX-TANK — STUN sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Salve non létale ». Plan 2 : contact de saisie ou neutralisation lié à « Salve non létale », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : arrêt du carton puis stabilisation de l’outil monté dessus, pose de signature face à l’adversaire.

##### Glissade de l’opérateur · conclusion

Famille `cqc`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Glissade de l’opérateur.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Glissade de l’opérateur » ; l’espace disponible doit être lisible. Plan 2 : contact de saisie ou neutralisation lié à « Glissade de l’opérateur », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : arrêt du carton puis stabilisation de l’outil monté dessus, arrêt du dispositif et retour au cadre d’ensemble.

##### Avance sous couverture · conclusion

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Avance sous couverture.

Plan 1 : approche jusqu’à la distance réelle de « Avance sous couverture », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Avance sous couverture », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : arrêt du carton puis stabilisation de l’outil monté dessus, prise de distance et maintien final.

##### Saisie · conclusion

Famille `cqc`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Saisie.

Plan 1 : après une observation ou un repli, BOX-TANK — STUN reprend l’initiative par « Saisie ». Plan 2 : contact de saisie ou neutralisation lié à « Saisie », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : arrêt du carton puis stabilisation de l’outil monté dessus, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Canonical Peace Walker object appearance reproduced as a painted adaptation; exact original-game pixel-perfect fidelity is not certified.
- Unnamed human operator and CQC combat animations are an original playable adaptation; no new canonical story, named identity or official combat-move claim.
- Box Tank has two hidden human operators and four human boots; illustrated tank wheels are printed cardboard texture, not moving metal tracks.
- Native generated PNG bytes remain unchanged. Read-only alpha bounds and optional Canvas vector clipping isolate silhouettes; no raster resampling, trimming, mirroring or alpha rewriting.
- Visual reference size estimates are not official published metric dimensions.
- A family exterior is physically reference-inspected, and the loadout is equipment-text-attested. A separate loadout-specific texture capture has not been inspected; no different official texture, markings, colours or cosmetic identity is claimed.
- Pass20: sixteen authored poses per direction, thirty-two physical poses shared across three canonical ammunition loads (ninety-six equipment pose mappings).
- All thirty-two selected new native figures were physically inspected with four separate human boots arranged as two hidden operators. Four rejected generated atlases are retained and are not used at runtime.
- Canonical exterior family recreated as original hand-painted sprites from original-game reference. Absolute pixel-for-pixel reproduction and official metric size are not certified.
- Action groups reuse the sixteen native keyposes per direction. Combat profiles, equipment identities, ammunition and original scale settings are unchanged.
- [Canonical family appearance physically inspected in original game screenshot. Equipment data attests same family exterior with different concealed mechanism/ammunition; separate loadout-specific texture capture unavailable. Independent native CQC poses are our playable adaptation, not official cosmetic loadout differences.](https://www.gamesradar.com/8-things-you-need-to-know-about-mgs-peace-walker/2/) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Canonical family appearance physically inspected in original game screenshot. Equipment data attests same family exterior with different concealed mechanism/ammunition; separate loadout-specific texture capture unavailable. Independent native CQC poses are our playable adaptation, not official cosmetic loadout differences.](https://mgcvt.com/guide/mgspw/equipment.htm) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Canonical family appearance physically inspected in original game screenshot. Equipment data attests same family exterior with different concealed mechanism/ammunition; separate loadout-specific texture capture unavailable. Independent native CQC poses are our playable adaptation, not official cosmetic loadout differences.](https://metalgear.fandom.com/wiki/Peace_Walker_weapons_and_equipment) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Canonical family appearance physically inspected in original game screenshot. Equipment data attests same family exterior with different concealed mechanism/ammunition; separate loadout-specific texture capture unavailable. Independent native CQC poses are our playable adaptation, not official cosmetic loadout differences.](https://wikiwiki.jp/walker/%E8%A3%85%E5%82%99%E5%93%81) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## pass19__box_tank_smoke_pw

### BOX-TANK — SMOKE — PEACE WALKER

**Rôle :** Opérateur humain sous équipement de terrain. **Profil :** `boxed_operator`.

**Base présente dans le code :** Cardboard tank with smoke shells; separate from autonomous BOX SMOKE trap.

**Incarnation à conserver :** Peace Walker equipment with hidden MSF human operator — CQC playable adaptation

**État vérifié :** métadonnées natives avec limites. 32 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `shoot` = special, specialForward, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** BOX-TANK — SMOKE : opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas visibles sous le carton et inertie légère du volume ; pas de métal lourd inventé. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Opérateur humain sous équipement de terrain » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place.
- **jump_land :** BOX-TANK — SMOKE : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas visibles sous le carton et inertie légère du volume ; pas de métal lourd inventé. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de BOX-TANK — SMOKE. Terminer par arrêt du carton puis stabilisation de l’outil monté dessus. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « PEACE WALKER », présentation de Peace Walker equipment with hidden MSF human operator — CQC playable adaptation, puis opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Geste court lié à « Obus fumigène » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, arrêt du carton puis stabilisation de l’outil monté dessus ; BOX-TANK — SMOKE vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à PEACE WALKER.
- **round_loss :** Proposition CQC : BOX-TANK — SMOKE réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Couverture fumigène », revenir par arrêt du carton puis stabilisation de l’outil monté dessus, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Contact

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX-TANK — SMOKE, préparer « Contact » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Contact » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### heavy — Percussion

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX-TANK — SMOKE, préparer « Percussion » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Percussion », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX-TANK — SMOKE, préparer « Balayage » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### throw — Saisie

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX-TANK — SMOKE, préparer « Saisie » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### special — Obus fumigène

**Existant :** `projectile` / `smoke` ; 25/1/33 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX-TANK — SMOKE, préparer « Obus fumigène » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Donner à la source de « Obus fumigène » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet smoke de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet. L’objet conserve sa mèche de 55 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### specialDown — Glissade de l’opérateur

**Existant :** `mobility` / `movement` ; 11/12/26 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX-TANK — SMOKE, préparer « Glissade de l’opérateur » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Préparer l’appui qui produit le déplacement ; pas visibles sous le carton et inertie légère du volume ; pas de métal lourd inventé.

**Action.** Exécuter « Glissade de l’opérateur » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 3 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### specialForward — Avance sous couverture

**Existant :** `mobility` / `movement` ; 8/18/23 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX-TANK — SMOKE, préparer « Avance sous couverture » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Préparer l’appui qui produit le déplacement ; pas visibles sous le carton et inertie légère du volume ; pas de métal lourd inventé.

**Action.** Exécuter « Avance sous couverture » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 5 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### specialBack — Couverture du carton

**Existant :** `buff` / `stealth` ; 20/1/27 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX-TANK — SMOKE, préparer « Couverture du carton » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Montrer la préparation corporelle ou mécanique de « Couverture du carton ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### super — Couverture fumigène

**Existant :** `projectile` / `smoke` ; 25/1/33 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX-TANK — SMOKE, préparer « Couverture fumigène » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Donner à la source de « Couverture fumigène » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet smoke de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet. La salve contient 3 émissions, espacées de 14 ticks CQC : recalculer le point de bouche à chaque départ. L’objet conserve sa mèche de 55 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### utility — Reconditionner l’équipement

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX-TANK — SMOKE, préparer « Reconditionner l’équipement » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Reconditionner l’équipement », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Couverture fumigène · conclusion

Famille `cqc`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Couverture fumigène.

Plan 1 : BOX-TANK — SMOKE sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Couverture fumigène ». Plan 2 : contact de saisie ou neutralisation lié à « Couverture fumigène », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : arrêt du carton puis stabilisation de l’outil monté dessus, pose de signature face à l’adversaire.

##### Glissade de l’opérateur · conclusion

Famille `cqc`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Glissade de l’opérateur.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Glissade de l’opérateur » ; l’espace disponible doit être lisible. Plan 2 : contact de saisie ou neutralisation lié à « Glissade de l’opérateur », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : arrêt du carton puis stabilisation de l’outil monté dessus, arrêt du dispositif et retour au cadre d’ensemble.

##### Avance sous couverture · conclusion

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Avance sous couverture.

Plan 1 : approche jusqu’à la distance réelle de « Avance sous couverture », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Avance sous couverture », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : arrêt du carton puis stabilisation de l’outil monté dessus, prise de distance et maintien final.

##### Saisie · conclusion

Famille `cqc`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Saisie.

Plan 1 : après une observation ou un repli, BOX-TANK — SMOKE reprend l’initiative par « Saisie ». Plan 2 : contact de saisie ou neutralisation lié à « Saisie », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : arrêt du carton puis stabilisation de l’outil monté dessus, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Canonical Peace Walker object appearance reproduced as a painted adaptation; exact original-game pixel-perfect fidelity is not certified.
- Unnamed human operator and CQC combat animations are an original playable adaptation; no new canonical story, named identity or official combat-move claim.
- Box Tank has two hidden human operators and four human boots; illustrated tank wheels are printed cardboard texture, not moving metal tracks.
- Native generated PNG bytes remain unchanged. Read-only alpha bounds and optional Canvas vector clipping isolate silhouettes; no raster resampling, trimming, mirroring or alpha rewriting.
- Visual reference size estimates are not official published metric dimensions.
- A family exterior is physically reference-inspected, and the loadout is equipment-text-attested. A separate loadout-specific texture capture has not been inspected; no different official texture, markings, colours or cosmetic identity is claimed.
- Pass20: sixteen authored poses per direction, thirty-two physical poses shared across three canonical ammunition loads (ninety-six equipment pose mappings).
- All thirty-two selected new native figures were physically inspected with four separate human boots arranged as two hidden operators. Four rejected generated atlases are retained and are not used at runtime.
- Canonical exterior family recreated as original hand-painted sprites from original-game reference. Absolute pixel-for-pixel reproduction and official metric size are not certified.
- Action groups reuse the sixteen native keyposes per direction. Combat profiles, equipment identities, ammunition and original scale settings are unchanged.
- [Canonical family appearance physically inspected in original game screenshot. Equipment data attests same family exterior with different concealed mechanism/ammunition; separate loadout-specific texture capture unavailable. Independent native CQC poses are our playable adaptation, not official cosmetic loadout differences.](https://www.gamesradar.com/8-things-you-need-to-know-about-mgs-peace-walker/2/) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Canonical family appearance physically inspected in original game screenshot. Equipment data attests same family exterior with different concealed mechanism/ammunition; separate loadout-specific texture capture unavailable. Independent native CQC poses are our playable adaptation, not official cosmetic loadout differences.](https://mgcvt.com/guide/mgspw/equipment.htm) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Canonical family appearance physically inspected in original game screenshot. Equipment data attests same family exterior with different concealed mechanism/ammunition; separate loadout-specific texture capture unavailable. Independent native CQC poses are our playable adaptation, not official cosmetic loadout differences.](https://metalgear.fandom.com/wiki/Peace_Walker_weapons_and_equipment) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Canonical family appearance physically inspected in original game screenshot. Equipment data attests same family exterior with different concealed mechanism/ammunition; separate loadout-specific texture capture unavailable. Independent native CQC poses are our playable adaptation, not official cosmetic loadout differences.](https://wikiwiki.jp/walker/%E8%A3%85%E5%82%99%E5%93%81) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## pass19__bomb_box_pw

### BOX BOMB — PEACE WALKER

**Rôle :** Opérateur humain sous équipement de terrain. **Profil :** `boxed_operator`.

**Base présente dans le code :** LOVE BOX family with explosive trap variant; no generic extra robot face.

**Incarnation à conserver :** Peace Walker equipment with hidden MSF human operator — CQC playable adaptation

**État vérifié :** métadonnées natives avec limites. 32 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, special, specialForward ; `heavy` = heavy, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** BOX BOMB : opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas visibles sous le carton et inertie légère du volume ; pas de métal lourd inventé. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Opérateur humain sous équipement de terrain » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place.
- **jump_land :** BOX BOMB : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas visibles sous le carton et inertie légère du volume ; pas de métal lourd inventé. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de BOX BOMB. Terminer par arrêt du carton puis stabilisation de l’outil monté dessus. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « PEACE WALKER », présentation de Peace Walker equipment with hidden MSF human operator — CQC playable adaptation, puis opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Geste court lié à « Boîte piégée » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, arrêt du carton puis stabilisation de l’outil monté dessus ; BOX BOMB vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à PEACE WALKER.
- **round_loss :** Proposition CQC : BOX BOMB réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Assaut décisif », revenir par arrêt du carton puis stabilisation de l’outil monté dessus, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Contact

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX BOMB, préparer « Contact » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Contact » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### heavy — Percussion

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX BOMB, préparer « Percussion » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Percussion », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX BOMB, préparer « Balayage » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### throw — Saisie

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX BOMB, préparer « Saisie » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### special — Boîte piégée

**Existant :** `trap` / `explosive` ; 31/1/34 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX BOMB, préparer « Boîte piégée » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Prendre le dispositif, s’abaisser vers le support et indiquer le lieu de pose avant activation.

**Action.** Poser « Boîte piégée » au point réel de main/outil, armer puis retirer le membre. Le dispositif possède ensuite son propre sprite, ses états attente/armement/déclenchement/destruction et sa collision.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus. Se dégager de l’objet sans le téléporter ; l’interruption avant armement a sa propre sortie.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### specialDown — Glissade de l’opérateur

**Existant :** `mobility` / `movement` ; 11/12/26 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX BOMB, préparer « Glissade de l’opérateur » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Préparer l’appui qui produit le déplacement ; pas visibles sous le carton et inertie légère du volume ; pas de métal lourd inventé.

**Action.** Exécuter « Glissade de l’opérateur » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 3 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### specialForward — Avance sous couverture

**Existant :** `mobility` / `movement` ; 8/18/23 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX BOMB, préparer « Avance sous couverture » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Préparer l’appui qui produit le déplacement ; pas visibles sous le carton et inertie légère du volume ; pas de métal lourd inventé.

**Action.** Exécuter « Avance sous couverture » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 5 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### specialBack — Couverture du carton

**Existant :** `buff` / `stealth` ; 20/1/27 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX BOMB, préparer « Couverture du carton » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Montrer la préparation corporelle ou mécanique de « Couverture du carton ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### super — Assaut décisif

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX BOMB, préparer « Assaut décisif » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Assaut décisif », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### utility — Reconditionner l’équipement

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX BOMB, préparer « Reconditionner l’équipement » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Reconditionner l’équipement », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Assaut décisif · conclusion

Famille `cqc`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Assaut décisif.

Plan 1 : BOX BOMB sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Assaut décisif ». Plan 2 : contact de saisie ou neutralisation lié à « Assaut décisif », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : arrêt du carton puis stabilisation de l’outil monté dessus, pose de signature face à l’adversaire.

##### Glissade de l’opérateur · conclusion

Famille `cqc`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Glissade de l’opérateur.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Glissade de l’opérateur » ; l’espace disponible doit être lisible. Plan 2 : contact de saisie ou neutralisation lié à « Glissade de l’opérateur », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : arrêt du carton puis stabilisation de l’outil monté dessus, arrêt du dispositif et retour au cadre d’ensemble.

##### Avance sous couverture · conclusion

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Avance sous couverture.

Plan 1 : approche jusqu’à la distance réelle de « Avance sous couverture », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Avance sous couverture », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : arrêt du carton puis stabilisation de l’outil monté dessus, prise de distance et maintien final.

##### Saisie · conclusion

Famille `cqc`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Saisie.

Plan 1 : après une observation ou un repli, BOX BOMB reprend l’initiative par « Saisie ». Plan 2 : contact de saisie ou neutralisation lié à « Saisie », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : arrêt du carton puis stabilisation de l’outil monté dessus, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Canonical Peace Walker object appearance reproduced as a painted adaptation; exact original-game pixel-perfect fidelity is not certified.
- Sixteen actual authored physical keyposes per native direction, thirty-two per equipment fighter; animation action groups deliberately reuse these keyposes.
- Unnamed human operator and CQC combat animations are an original playable adaptation; no new canonical story, named identity or official combat-move claim.
- Box Tank has two hidden human operators and four human boots; illustrated tank wheels are printed cardboard texture, not moving metal tracks.
- Native generated PNG bytes remain unchanged. Read-only alpha bounds and optional Canvas vector clipping isolate silhouettes; no raster resampling, trimming, mirroring or alpha rewriting.
- Visual reference size estimates are not official published metric dimensions.
- A family exterior is physically reference-inspected, and the loadout is equipment-text-attested. A separate loadout-specific texture capture has not been inspected; no different official texture, markings, colours or cosmetic identity is claimed.
- [Canonical family appearance physically inspected in original game screenshot. Equipment data attests same family exterior with different concealed mechanism/ammunition; separate loadout-specific texture capture unavailable. Independent native CQC poses are our playable adaptation, not official cosmetic loadout differences.](https://superadventuresingaming.blogspot.com/2020/02/metal-gear-solid-peace-walker-psp.html) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Canonical family appearance physically inspected in original game screenshot. Equipment data attests same family exterior with different concealed mechanism/ammunition; separate loadout-specific texture capture unavailable. Independent native CQC poses are our playable adaptation, not official cosmetic loadout differences.](https://store.kadokawa.co.jp/shop/g/g4988602150261/) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Canonical family appearance physically inspected in original game screenshot. Equipment data attests same family exterior with different concealed mechanism/ammunition; separate loadout-specific texture capture unavailable. Independent native CQC poses are our playable adaptation, not official cosmetic loadout differences.](https://metalgear.fandom.com/wiki/Peace_Walker_weapons_and_equipment) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Canonical family appearance physically inspected in original game screenshot. Equipment data attests same family exterior with different concealed mechanism/ammunition; separate loadout-specific texture capture unavailable. Independent native CQC poses are our playable adaptation, not official cosmetic loadout differences.](https://wikiwiki.jp/walker/%E8%A3%85%E5%82%99%E5%93%81) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## pass19__stun_box_pw

### BOX STUN — PEACE WALKER

**Rôle :** Opérateur humain sous équipement de terrain. **Profil :** `boxed_operator`.

**Base présente dans le code :** LOVE BOX family with nonlethal stun trap; separate from Box Tank Stun.

**Incarnation à conserver :** Peace Walker equipment with hidden MSF human operator — CQC playable adaptation

**État vérifié :** métadonnées natives avec limites. 32 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, special, specialForward ; `heavy` = heavy, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** BOX STUN : opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas visibles sous le carton et inertie légère du volume ; pas de métal lourd inventé. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Opérateur humain sous équipement de terrain » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place.
- **jump_land :** BOX STUN : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas visibles sous le carton et inertie légère du volume ; pas de métal lourd inventé. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de BOX STUN. Terminer par arrêt du carton puis stabilisation de l’outil monté dessus. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « PEACE WALKER », présentation de Peace Walker equipment with hidden MSF human operator — CQC playable adaptation, puis opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Geste court lié à « Boîte assommante » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, arrêt du carton puis stabilisation de l’outil monté dessus ; BOX STUN vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à PEACE WALKER.
- **round_loss :** Proposition CQC : BOX STUN réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Assaut décisif », revenir par arrêt du carton puis stabilisation de l’outil monté dessus, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Contact

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX STUN, préparer « Contact » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Contact » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### heavy — Percussion

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX STUN, préparer « Percussion » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Percussion », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX STUN, préparer « Balayage » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### throw — Saisie

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX STUN, préparer « Saisie » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### special — Boîte assommante

**Existant :** `trap` / `tranq` ; 31/1/34 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX STUN, préparer « Boîte assommante » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Prendre le dispositif, s’abaisser vers le support et indiquer le lieu de pose avant activation.

**Action.** Poser « Boîte assommante » au point réel de main/outil, armer puis retirer le membre. Le dispositif possède ensuite son propre sprite, ses états attente/armement/déclenchement/destruction et sa collision.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus. Se dégager de l’objet sans le téléporter ; l’interruption avant armement a sa propre sortie.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### specialDown — Glissade de l’opérateur

**Existant :** `mobility` / `movement` ; 11/12/26 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX STUN, préparer « Glissade de l’opérateur » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Préparer l’appui qui produit le déplacement ; pas visibles sous le carton et inertie légère du volume ; pas de métal lourd inventé.

**Action.** Exécuter « Glissade de l’opérateur » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 3 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### specialForward — Avance sous couverture

**Existant :** `mobility` / `movement` ; 8/18/23 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX STUN, préparer « Avance sous couverture » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Préparer l’appui qui produit le déplacement ; pas visibles sous le carton et inertie légère du volume ; pas de métal lourd inventé.

**Action.** Exécuter « Avance sous couverture » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 5 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### specialBack — Couverture du carton

**Existant :** `buff` / `stealth` ; 20/1/27 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX STUN, préparer « Couverture du carton » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Montrer la préparation corporelle ou mécanique de « Couverture du carton ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### super — Assaut décisif

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX STUN, préparer « Assaut décisif » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Assaut décisif », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### utility — Reconditionner l’équipement

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX STUN, préparer « Reconditionner l’équipement » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Reconditionner l’équipement », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Assaut décisif · conclusion

Famille `cqc`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Assaut décisif.

Plan 1 : BOX STUN sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Assaut décisif ». Plan 2 : contact de saisie ou neutralisation lié à « Assaut décisif », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : arrêt du carton puis stabilisation de l’outil monté dessus, pose de signature face à l’adversaire.

##### Glissade de l’opérateur · conclusion

Famille `cqc`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Glissade de l’opérateur.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Glissade de l’opérateur » ; l’espace disponible doit être lisible. Plan 2 : contact de saisie ou neutralisation lié à « Glissade de l’opérateur », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : arrêt du carton puis stabilisation de l’outil monté dessus, arrêt du dispositif et retour au cadre d’ensemble.

##### Avance sous couverture · conclusion

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Avance sous couverture.

Plan 1 : approche jusqu’à la distance réelle de « Avance sous couverture », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Avance sous couverture », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : arrêt du carton puis stabilisation de l’outil monté dessus, prise de distance et maintien final.

##### Saisie · conclusion

Famille `cqc`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Saisie.

Plan 1 : après une observation ou un repli, BOX STUN reprend l’initiative par « Saisie ». Plan 2 : contact de saisie ou neutralisation lié à « Saisie », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : arrêt du carton puis stabilisation de l’outil monté dessus, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Canonical Peace Walker object appearance reproduced as a painted adaptation; exact original-game pixel-perfect fidelity is not certified.
- Sixteen actual authored physical keyposes per native direction, thirty-two per equipment fighter; animation action groups deliberately reuse these keyposes.
- Unnamed human operator and CQC combat animations are an original playable adaptation; no new canonical story, named identity or official combat-move claim.
- Box Tank has two hidden human operators and four human boots; illustrated tank wheels are printed cardboard texture, not moving metal tracks.
- Native generated PNG bytes remain unchanged. Read-only alpha bounds and optional Canvas vector clipping isolate silhouettes; no raster resampling, trimming, mirroring or alpha rewriting.
- Visual reference size estimates are not official published metric dimensions.
- A family exterior is physically reference-inspected, and the loadout is equipment-text-attested. A separate loadout-specific texture capture has not been inspected; no different official texture, markings, colours or cosmetic identity is claimed.
- [Canonical family appearance physically inspected in original game screenshot. Equipment data attests same family exterior with different concealed mechanism/ammunition; separate loadout-specific texture capture unavailable. Independent native CQC poses are our playable adaptation, not official cosmetic loadout differences.](https://superadventuresingaming.blogspot.com/2020/02/metal-gear-solid-peace-walker-psp.html) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Canonical family appearance physically inspected in original game screenshot. Equipment data attests same family exterior with different concealed mechanism/ammunition; separate loadout-specific texture capture unavailable. Independent native CQC poses are our playable adaptation, not official cosmetic loadout differences.](https://store.kadokawa.co.jp/shop/g/g4988602150261/) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Canonical family appearance physically inspected in original game screenshot. Equipment data attests same family exterior with different concealed mechanism/ammunition; separate loadout-specific texture capture unavailable. Independent native CQC poses are our playable adaptation, not official cosmetic loadout differences.](https://metalgear.fandom.com/wiki/Peace_Walker_weapons_and_equipment) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Canonical family appearance physically inspected in original game screenshot. Equipment data attests same family exterior with different concealed mechanism/ammunition; separate loadout-specific texture capture unavailable. Independent native CQC poses are our playable adaptation, not official cosmetic loadout differences.](https://wikiwiki.jp/walker/%E8%A3%85%E5%82%99%E5%93%81) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## pass19__smoke_box_pw

### BOX SMOKE — PEACE WALKER

**Rôle :** Opérateur humain sous équipement de terrain. **Profil :** `boxed_operator`.

**Base présente dans le code :** LOVE BOX family with smoke trap; separate from Box Tank Smoke.

**Incarnation à conserver :** Peace Walker equipment with hidden MSF human operator — CQC playable adaptation

**État vérifié :** métadonnées natives avec limites. 32 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, special, specialForward ; `heavy` = heavy, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** BOX SMOKE : opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas visibles sous le carton et inertie légère du volume ; pas de métal lourd inventé. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Opérateur humain sous équipement de terrain » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place.
- **jump_land :** BOX SMOKE : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas visibles sous le carton et inertie légère du volume ; pas de métal lourd inventé. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de BOX SMOKE. Terminer par arrêt du carton puis stabilisation de l’outil monté dessus. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « PEACE WALKER », présentation de Peace Walker equipment with hidden MSF human operator — CQC playable adaptation, puis opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Geste court lié à « Boîte fumigène » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, arrêt du carton puis stabilisation de l’outil monté dessus ; BOX SMOKE vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à PEACE WALKER.
- **round_loss :** Proposition CQC : BOX SMOKE réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Assaut décisif », revenir par arrêt du carton puis stabilisation de l’outil monté dessus, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Contact

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX SMOKE, préparer « Contact » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Contact » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### heavy — Percussion

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX SMOKE, préparer « Percussion » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Percussion », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX SMOKE, préparer « Balayage » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### throw — Saisie

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX SMOKE, préparer « Saisie » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### special — Boîte fumigène

**Existant :** `trap` / `smoke` ; 31/1/34 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX SMOKE, préparer « Boîte fumigène » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Prendre le dispositif, s’abaisser vers le support et indiquer le lieu de pose avant activation.

**Action.** Poser « Boîte fumigène » au point réel de main/outil, armer puis retirer le membre. Le dispositif possède ensuite son propre sprite, ses états attente/armement/déclenchement/destruction et sa collision.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus. Se dégager de l’objet sans le téléporter ; l’interruption avant armement a sa propre sortie.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### specialDown — Glissade de l’opérateur

**Existant :** `mobility` / `movement` ; 11/12/26 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX SMOKE, préparer « Glissade de l’opérateur » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Préparer l’appui qui produit le déplacement ; pas visibles sous le carton et inertie légère du volume ; pas de métal lourd inventé.

**Action.** Exécuter « Glissade de l’opérateur » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 3 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### specialForward — Avance sous couverture

**Existant :** `mobility` / `movement` ; 8/18/23 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX SMOKE, préparer « Avance sous couverture » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Préparer l’appui qui produit le déplacement ; pas visibles sous le carton et inertie légère du volume ; pas de métal lourd inventé.

**Action.** Exécuter « Avance sous couverture » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 5 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### specialBack — Couverture du carton

**Existant :** `buff` / `stealth` ; 20/1/27 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX SMOKE, préparer « Couverture du carton » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Montrer la préparation corporelle ou mécanique de « Couverture du carton ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### super — Assaut décisif

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX SMOKE, préparer « Assaut décisif » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Assaut décisif », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### utility — Reconditionner l’équipement

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de BOX SMOKE, préparer « Reconditionner l’équipement » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Reconditionner l’équipement », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Assaut décisif · conclusion

Famille `cqc`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Assaut décisif.

Plan 1 : BOX SMOKE sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Assaut décisif ». Plan 2 : contact de saisie ou neutralisation lié à « Assaut décisif », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : arrêt du carton puis stabilisation de l’outil monté dessus, pose de signature face à l’adversaire.

##### Glissade de l’opérateur · conclusion

Famille `cqc`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Glissade de l’opérateur.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Glissade de l’opérateur » ; l’espace disponible doit être lisible. Plan 2 : contact de saisie ou neutralisation lié à « Glissade de l’opérateur », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : arrêt du carton puis stabilisation de l’outil monté dessus, arrêt du dispositif et retour au cadre d’ensemble.

##### Avance sous couverture · conclusion

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Avance sous couverture.

Plan 1 : approche jusqu’à la distance réelle de « Avance sous couverture », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Avance sous couverture », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : arrêt du carton puis stabilisation de l’outil monté dessus, prise de distance et maintien final.

##### Saisie · conclusion

Famille `cqc`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Saisie.

Plan 1 : après une observation ou un repli, BOX SMOKE reprend l’initiative par « Saisie ». Plan 2 : contact de saisie ou neutralisation lié à « Saisie », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : arrêt du carton puis stabilisation de l’outil monté dessus, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Canonical Peace Walker object appearance reproduced as a painted adaptation; exact original-game pixel-perfect fidelity is not certified.
- Sixteen actual authored physical keyposes per native direction, thirty-two per equipment fighter; animation action groups deliberately reuse these keyposes.
- Unnamed human operator and CQC combat animations are an original playable adaptation; no new canonical story, named identity or official combat-move claim.
- Box Tank has two hidden human operators and four human boots; illustrated tank wheels are printed cardboard texture, not moving metal tracks.
- Native generated PNG bytes remain unchanged. Read-only alpha bounds and optional Canvas vector clipping isolate silhouettes; no raster resampling, trimming, mirroring or alpha rewriting.
- Visual reference size estimates are not official published metric dimensions.
- A family exterior is physically reference-inspected, and the loadout is equipment-text-attested. A separate loadout-specific texture capture has not been inspected; no different official texture, markings, colours or cosmetic identity is claimed.
- [Canonical family appearance physically inspected in original game screenshot. Equipment data attests same family exterior with different concealed mechanism/ammunition; separate loadout-specific texture capture unavailable. Independent native CQC poses are our playable adaptation, not official cosmetic loadout differences.](https://superadventuresingaming.blogspot.com/2020/02/metal-gear-solid-peace-walker-psp.html) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Canonical family appearance physically inspected in original game screenshot. Equipment data attests same family exterior with different concealed mechanism/ammunition; separate loadout-specific texture capture unavailable. Independent native CQC poses are our playable adaptation, not official cosmetic loadout differences.](https://store.kadokawa.co.jp/shop/g/g4988602150261/) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Canonical family appearance physically inspected in original game screenshot. Equipment data attests same family exterior with different concealed mechanism/ammunition; separate loadout-specific texture capture unavailable. Independent native CQC poses are our playable adaptation, not official cosmetic loadout differences.](https://metalgear.fandom.com/wiki/Peace_Walker_weapons_and_equipment) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Canonical family appearance physically inspected in original game screenshot. Equipment data attests same family exterior with different concealed mechanism/ammunition; separate loadout-specific texture capture unavailable. Independent native CQC poses are our playable adaptation, not official cosmetic loadout differences.](https://wikiwiki.jp/walker/%E8%A3%85%E5%82%99%E5%93%81) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## pass19__assassin_box_pw

### ASSN. BOX — PEACE WALKER

**Rôle :** Opérateur humain sous équipement de terrain. **Profil :** `boxed_operator`.

**Base présente dans le code :** Box-shaped hay/straw bale used as hiding equipment; operator hidden inside.

**Incarnation à conserver :** Peace Walker equipment with hidden MSF human operator — CQC playable adaptation

**État vérifié :** métadonnées natives avec limites. 32 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `heavy` = heavy, super ; `throw` = throw, special.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** ASSN. BOX : opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas visibles sous le carton et inertie légère du volume ; pas de métal lourd inventé. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Opérateur humain sous équipement de terrain » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place.
- **jump_land :** ASSN. BOX : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas visibles sous le carton et inertie légère du volume ; pas de métal lourd inventé. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de ASSN. BOX. Terminer par arrêt du carton puis stabilisation de l’outil monté dessus. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « PEACE WALKER », présentation de Peace Walker equipment with hidden MSF human operator — CQC playable adaptation, puis opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Geste court lié à « Capture dans la paille » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, arrêt du carton puis stabilisation de l’outil monté dessus ; ASSN. BOX vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à PEACE WALKER.
- **round_loss :** Proposition CQC : ASSN. BOX réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Assaut décisif », revenir par arrêt du carton puis stabilisation de l’outil monté dessus, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Contact

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ASSN. BOX, préparer « Contact » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Contact » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### heavy — Percussion

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ASSN. BOX, préparer « Percussion » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Percussion », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ASSN. BOX, préparer « Balayage » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### throw — Saisie

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ASSN. BOX, préparer « Saisie » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### special — Capture dans la paille

**Existant :** `melee` / `grapple` ; 13/3/35 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ASSN. BOX, préparer « Capture dans la paille » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### specialDown — Glissade de l’opérateur

**Existant :** `mobility` / `movement` ; 11/12/26 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ASSN. BOX, préparer « Glissade de l’opérateur » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Préparer l’appui qui produit le déplacement ; pas visibles sous le carton et inertie légère du volume ; pas de métal lourd inventé.

**Action.** Exécuter « Glissade de l’opérateur » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 3 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### specialForward — Avance sous couverture

**Existant :** `mobility` / `movement` ; 8/18/23 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ASSN. BOX, préparer « Avance sous couverture » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Préparer l’appui qui produit le déplacement ; pas visibles sous le carton et inertie légère du volume ; pas de métal lourd inventé.

**Action.** Exécuter « Avance sous couverture » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 5 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### specialBack — Couverture du carton

**Existant :** `buff` / `stealth` ; 20/1/27 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ASSN. BOX, préparer « Couverture du carton » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Montrer la préparation corporelle ou mécanique de « Couverture du carton ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### super — Assaut décisif

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ASSN. BOX, préparer « Assaut décisif » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Assaut décisif », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### utility — Reconditionner l’équipement

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ASSN. BOX, préparer « Reconditionner l’équipement » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Reconditionner l’équipement », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Assaut décisif · conclusion

Famille `cqc`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Assaut décisif.

Plan 1 : ASSN. BOX sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Assaut décisif ». Plan 2 : contact de saisie ou neutralisation lié à « Assaut décisif », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : arrêt du carton puis stabilisation de l’outil monté dessus, pose de signature face à l’adversaire.

##### Glissade de l’opérateur · conclusion

Famille `cqc`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Glissade de l’opérateur.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Glissade de l’opérateur » ; l’espace disponible doit être lisible. Plan 2 : contact de saisie ou neutralisation lié à « Glissade de l’opérateur », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : arrêt du carton puis stabilisation de l’outil monté dessus, arrêt du dispositif et retour au cadre d’ensemble.

##### Avance sous couverture · conclusion

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Avance sous couverture.

Plan 1 : approche jusqu’à la distance réelle de « Avance sous couverture », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Avance sous couverture », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : arrêt du carton puis stabilisation de l’outil monté dessus, prise de distance et maintien final.

##### Saisie · conclusion

Famille `cqc`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Saisie.

Plan 1 : après une observation ou un repli, ASSN. BOX reprend l’initiative par « Saisie ». Plan 2 : contact de saisie ou neutralisation lié à « Saisie », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : arrêt du carton puis stabilisation de l’outil monté dessus, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Canonical Peace Walker object appearance reproduced as a painted adaptation; exact original-game pixel-perfect fidelity is not certified.
- Sixteen actual authored physical keyposes per native direction, thirty-two per equipment fighter; animation action groups deliberately reuse these keyposes.
- Unnamed human operator and CQC combat animations are an original playable adaptation; no new canonical story, named identity or official combat-move claim.
- Box Tank has two hidden human operators and four human boots; illustrated tank wheels are printed cardboard texture, not moving metal tracks.
- Native generated PNG bytes remain unchanged. Read-only alpha bounds and optional Canvas vector clipping isolate silhouettes; no raster resampling, trimming, mirroring or alpha rewriting.
- Visual reference size estimates are not official published metric dimensions.
- [Official 2010 collaboration trailer frames SS/096 and097 hosted in original press conference report, physically viewed: gray-green rectangular bound hay camouflage box and human grabbing ambush.](https://www.4gamer.net/games/092/G009283/20100407050/) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Official 2010 collaboration trailer frames SS/096 and097 hosted in original press conference report, physically viewed: gray-green rectangular bound hay camouflage box and human grabbing ambush.](https://mgcvt.com/guide/mgspw/chart6.htm) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## pass19__rescue_box_pw

### RESCUE BOX — PEACE WALKER

**Rôle :** Opérateur humain sous équipement de terrain. **Profil :** `boxed_operator`.

**Base présente dans le code :** Rescue-design cardboard box; canonical markings require original game capture.

**Incarnation à conserver :** Peace Walker equipment with unnamed MSF human operator — original CQC playable adaptation

**État vérifié :** métadonnées natives avec limites. 32 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `heavy` = heavy, super ; `recover` = special, utility.

**Techniques pointant sur une seule région native dans la direction principale :** special, specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** RESCUE BOX : opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas visibles sous le carton et inertie légère du volume ; pas de métal lourd inventé. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Opérateur humain sous équipement de terrain » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place.
- **jump_land :** RESCUE BOX : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas visibles sous le carton et inertie légère du volume ; pas de métal lourd inventé. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de RESCUE BOX. Terminer par arrêt du carton puis stabilisation de l’outil monté dessus. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « PEACE WALKER », présentation de Peace Walker equipment with unnamed MSF human operator — original CQC playable adaptation, puis opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Geste court lié à « Secours sous couverture » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, arrêt du carton puis stabilisation de l’outil monté dessus ; RESCUE BOX vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à PEACE WALKER.
- **round_loss :** Proposition CQC : RESCUE BOX réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Assaut décisif », revenir par arrêt du carton puis stabilisation de l’outil monté dessus, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Contact

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RESCUE BOX, préparer « Contact » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Contact » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### heavy — Percussion

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RESCUE BOX, préparer « Percussion » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Percussion », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RESCUE BOX, préparer « Balayage » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### throw — Saisie

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RESCUE BOX, préparer « Saisie » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### special — Secours sous couverture

**Existant :** `heal` / `medical` ; 55/1/30 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RESCUE BOX, préparer « Secours sous couverture » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Secours sous couverture ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### specialDown — Glissade de l’opérateur

**Existant :** `mobility` / `movement` ; 11/12/26 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RESCUE BOX, préparer « Glissade de l’opérateur » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Préparer l’appui qui produit le déplacement ; pas visibles sous le carton et inertie légère du volume ; pas de métal lourd inventé.

**Action.** Exécuter « Glissade de l’opérateur » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 3 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### specialForward — Avance sous couverture

**Existant :** `mobility` / `movement` ; 8/18/23 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RESCUE BOX, préparer « Avance sous couverture » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Préparer l’appui qui produit le déplacement ; pas visibles sous le carton et inertie légère du volume ; pas de métal lourd inventé.

**Action.** Exécuter « Avance sous couverture » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 5 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### specialBack — Couverture du carton

**Existant :** `buff` / `stealth` ; 20/1/27 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RESCUE BOX, préparer « Couverture du carton » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Montrer la préparation corporelle ou mécanique de « Couverture du carton ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### super — Assaut décisif

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RESCUE BOX, préparer « Assaut décisif » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Assaut décisif », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### utility — Reconditionner l’équipement

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RESCUE BOX, préparer « Reconditionner l’équipement » ; opérateur humain et carton distincts ; fenêtres, tubes et plis gardent leur place. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Reconditionner l’équipement », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** arrêt du carton puis stabilisation de l’outil monté dessus. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Assaut décisif · conclusion

Famille `cqc`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Assaut décisif.

Plan 1 : RESCUE BOX sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Assaut décisif ». Plan 2 : contact de saisie ou neutralisation lié à « Assaut décisif », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : arrêt du carton puis stabilisation de l’outil monté dessus, pose de signature face à l’adversaire.

##### Glissade de l’opérateur · conclusion

Famille `cqc`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Glissade de l’opérateur.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Glissade de l’opérateur » ; l’espace disponible doit être lisible. Plan 2 : contact de saisie ou neutralisation lié à « Glissade de l’opérateur », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : arrêt du carton puis stabilisation de l’outil monté dessus, arrêt du dispositif et retour au cadre d’ensemble.

##### Avance sous couverture · conclusion

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Avance sous couverture.

Plan 1 : approche jusqu’à la distance réelle de « Avance sous couverture », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Avance sous couverture », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : arrêt du carton puis stabilisation de l’outil monté dessus, prise de distance et maintien final.

##### Saisie · conclusion

Famille `cqc`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Saisie.

Plan 1 : après une observation ou un repli, RESCUE BOX reprend l’initiative par « Saisie ». Plan 2 : contact de saisie ou neutralisation lié à « Saisie », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : arrêt du carton puis stabilisation de l’outil monté dessus, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Original game capture attests the Rescue Box family exterior: cream carton, red-orange lower stripe, one roof beacon, short-side handslot.
- Small original markings cannot be read from this capture. Left AMBULANCE text, opposite-side camera and fine markings are a reference-led interpretation, not directly attested original texture or absolute1:1 certification. No medical cross or Love Pack markings are admitted.
- One unnamed human operator with two independently painted visible boots; no robot or named human identity is substituted.
- Thirty-two authored physical keyposes in two independently drawn native directions; no mirror, raster edit or extracted original-game animation is claimed.
- The two walking keyposes are close variants and do not establish a complete alternating human gait. Native camera-depth contacts are diagnostic source projections; continuous world locking is not certified.
- Every alpha128 source pixel is inside exactly one measured physical crop. Native reach hand crossing a nominal grid cell is retained; a soft beacon-halo bridge between right reach and recovery is bounded at source y761 without cutting opaque body pixels.
- Box and estimated total operator presentation height .98m follow the existing Peace Walker box display convention, not an official metric measurement.
- Combat CQC moves, heal550/cost2, damage, resources, attack phases, clocks, saves and loadout identity remain owned by the pre-existing gameplay registry. No projectile or firearm is added.
- KO figures preserve their original open carton interior and two entangled legs as a frozen whole source pose; hidden anatomy is not reconstructed.
- [Only bottom-right quadrant is original Peace Walker Rescue Box. Physically viewed pale cream carton, lower red-orange stripe, one roof beacon, short-end handslot. Fine markings illegible; opposite side and readable microlettering interpreted.](https://nekkedsnake.files.wordpress.com/2013/04/20130418-012451.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Article source of original game composite; other quadrants are not Rescue Box.](https://justwroteablog.com/2013/04/18/mgs-the-evolution-of-the-cardboard-box/) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Official equipment is a cardboard box used by a human operator; standalone versus identity is the requested CQC adaptation.](https://metalgear.konami.net/manual/mc2/mgspw/xbox/en/page08.html) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).
