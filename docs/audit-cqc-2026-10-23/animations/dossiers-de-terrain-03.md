# Animations — DOSSIERS DE TERRAIN

**5 acteurs du registre courant.** Les titres d’actions et paramètres sont observés ; les descriptions sont des propositions CQC à produire et valider. Un groupe de frames existant ne certifie pas l’ensemble du mouvement ou sa fidélité originale.

[Index des fiches](README.md) · [Contrat commun](../04_ANIMATIONS_SPRITES.md)

## Sommaire

- [LQ-84 FENRIR](#pass19__fenrir_mgr) — MGR
- [RAPTOR](#pass19__raptor_mgr) — MGR
- [MASTIFF](#pass19__mastiff_mgr) — MGR
- [SLIDER](#pass19__slider_mgr) — MGR
- [HAMMERHEAD](#pass19__hammerhead_mgr) — MGR

## pass19__fenrir_mgr

### LQ-84 FENRIR — MGR

**Rôle :** Quadrupède à railgun. **Profil :** `stock_fenrir_railgun`.

**Base présente dans le code :** LQ-84 stock de Revengeance, railgun dorsal et quatre membres articulés.

**Incarnation à conserver :** LQ-84 stock de Revengeance, railgun dorsal et quatre membres articulés.

**État vérifié :** route machine effectivement déclarée ; animations d’articulation à contrôler. Une route machine est déclarée dans le runtime. Ses articulations remplacent le catalogue de corps contrôlé ; ce n’est pas un constat de sprite absent.

**Réemplois à examiner :** pas de groupe natif partagé observé dans cette extraction.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** LQ-84 FENRIR : corps canin mécanique Fenrir, appendices et outil différenciés de LQ-84i. Petits ajustements mécaniques des organes présents et optique stable ; aucune respiration humaine. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** cycle quadrupède mécanique et rayon de rotation propre au châssis. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Quadrupède à railgun » : orientation défensive du châssis, des membres ou de la protection effectivement présente ; pas d’avant-bras humain ajouté ; recul bloqué distinct de la simple position basse. Garder corps canin mécanique Fenrir, appendices et outil différenciés de LQ-84i.
- **jump_land :** LQ-84 FENRIR : départ par poussée ou articulation autorisée, déplacement aérien puis stabilisation et reprise d’appui ; les appareils volants gardent leur mode de sustentation. cycle quadrupède mécanique et rayon de rotation propre au châssis. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Secousse du châssis et de l’organe touché de LQ-84 FENRIR, déséquilibre, arrêt puis remise en position par ses articulations réelles. Terminer par réalignement du corps et de l’arme sur leurs axes réels. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGR », présentation de LQ-84 stock de Revengeance, railgun dorsal et quatre membres articulés., puis corps canin mécanique Fenrir, appendices et outil différenciés de LQ-84i. Geste court lié à « Railgun LQ-84 » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, réalignement du corps et de l’arme sur leurs axes réels ; LQ-84 FENRIR vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGR.
- **round_loss :** Proposition CQC : LQ-84 FENRIR interrompt ses émissions, absorbe l’oscillation de sa masse, stabilise ses appuis ou son vol, puis replace ses organes ; aucune régénération gratuite. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Décharge du railgun », revenir par réalignement du corps et de l’arme sur leurs axes réels, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Coup de patte

**Existant :** `melee` / `strike` ; 10/4/20 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de LQ-84 FENRIR, préparer « Coup de patte » ; corps canin mécanique Fenrir, appendices et outil différenciés de LQ-84i. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Coup de patte » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** réalignement du corps et de l’arme sur leurs axes réels.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde ou quitte la portée puis punis la récupération.

##### heavy — Percussion du châssis

**Existant :** `melee` / `strike` ; 23/5/32 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de LQ-84 FENRIR, préparer « Percussion du châssis » ; corps canin mécanique Fenrir, appendices et outil différenciés de LQ-84i. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Percussion du châssis », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** réalignement du corps et de l’arme sur leurs axes réels.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde ou quitte la portée puis punis la récupération.

##### low — Balayage avant

**Existant :** `melee` / `strike` ; 14/4/26 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de LQ-84 FENRIR, préparer « Balayage avant » ; corps canin mécanique Fenrir, appendices et outil différenciés de LQ-84i. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** réalignement du corps et de l’arme sur leurs axes réels.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde ou quitte la portée puis punis la récupération.

##### throw — Renversement mécanique

**Existant :** `melee` / `grapple` ; 13/3/36 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de LQ-84 FENRIR, préparer « Renversement mécanique » ; corps canin mécanique Fenrir, appendices et outil différenciés de LQ-84i. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** réalignement du corps et de l’arme sur leurs axes réels. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde ou quitte la portée puis punis la récupération.

##### special — Railgun LQ-84

**Existant :** `projectile` / `rail` ; 27/1/36 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de LQ-84 FENRIR, préparer « Railgun LQ-84 » ; corps canin mécanique Fenrir, appendices et outil différenciés de LQ-84i. Montrer la prise et la visée de l’arme décrite par « Railgun LQ-84 » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** réalignement du corps et de l’arme sur leurs axes réels. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde ou quitte la portée puis punis la récupération.

##### specialDown — Ancrage défensif

**Existant :** `buff` / `armor` ; 22/1/27 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de LQ-84 FENRIR, préparer « Ancrage défensif » ; corps canin mécanique Fenrir, appendices et outil différenciés de LQ-84i. Montrer la préparation corporelle ou mécanique de « Ancrage défensif ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** réalignement du corps et de l’arme sur leurs axes réels. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde ou quitte la portée puis punis la récupération.

##### specialForward — Ruée du châssis

**Existant :** `melee` / `strike` ; 18/6/32 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de LQ-84 FENRIR, préparer « Ruée du châssis » ; corps canin mécanique Fenrir, appendices et outil différenciés de LQ-84i. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Ruée du châssis » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** réalignement du corps et de l’arme sur leurs axes réels.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde ou quitte la portée puis punis la récupération.

##### specialBack — Décrochage

**Existant :** `mobility` / `movement` ; 9/15/25 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de LQ-84 FENRIR, préparer « Décrochage » ; corps canin mécanique Fenrir, appendices et outil différenciés de LQ-84i. Préparer l’appui qui produit le déplacement ; cycle quadrupède mécanique et rayon de rotation propre au châssis.

**Action.** Exécuter « Décrochage » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -4 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** réalignement du corps et de l’arme sur leurs axes réels. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde ou quitte la portée puis punis la récupération.

##### super — Décharge du railgun

**Existant :** `projectile` / `rail` ; 40/1/47 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de LQ-84 FENRIR, préparer « Décharge du railgun » ; corps canin mécanique Fenrir, appendices et outil différenciés de LQ-84i. Montrer la prise et la visée de l’arme décrite par « Décharge du railgun » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** réalignement du corps et de l’arme sur leurs axes réels. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde ou quitte la portée puis punis la récupération.

##### utility — Régulation du châssis

**Existant :** `recover` / `recovery` ; 48/1/27 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de LQ-84 FENRIR, préparer « Régulation du châssis » ; corps canin mécanique Fenrir, appendices et outil différenciés de LQ-84i. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Régulation du châssis ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** réalignement du corps et de l’arme sur leurs axes réels. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde ou quitte la portée puis punis la récupération.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Décharge du railgun · conclusion

Famille `cqc`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Décharge du railgun.

Plan 1 : LQ-84 FENRIR sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Décharge du railgun ». Plan 2 : contact de saisie ou neutralisation lié à « Décharge du railgun », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : réalignement du corps et de l’arme sur leurs axes réels, pose de signature face à l’adversaire.

##### Ancrage défensif · conclusion

Famille `cqc`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Ancrage défensif.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Ancrage défensif » ; l’espace disponible doit être lisible. Plan 2 : contact de saisie ou neutralisation lié à « Ancrage défensif », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : réalignement du corps et de l’arme sur leurs axes réels, arrêt du dispositif et retour au cadre d’ensemble.

##### Ruée du châssis · conclusion

Famille `cqc`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Ruée du châssis.

Plan 1 : approche jusqu’à la distance réelle de « Ruée du châssis », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Ruée du châssis », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : réalignement du corps et de l’arme sur leurs axes réels, prise de distance et maintien final.

##### Renversement mécanique · conclusion

Famille `cqc`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Renversement mécanique.

Plan 1 : après une observation ou un repli, LQ-84 FENRIR reprend l’initiative par « Renversement mécanique ». Plan 2 : contact de saisie ou neutralisation lié à « Renversement mécanique », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : réalignement du corps et de l’arme sur leurs axes réels, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Détails latéraux et surfaces cachées interprétés à partir de la référence conservée.
- Hauteur1,25m estimée ; aucune certification1:1.
- Aucun profil, IA ou tronçonneuse de Blade Wolf LQ-84i repris.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## pass19__raptor_mgr

### RAPTOR — MGR

**Rôle :** Lames rapprochées et missile antiaérien. **Profil :** `raptor_mgr_native`.

**Base présente dans le code :** Raptor bipède biomécanique et nacelle dorsale à quatre ouvertures2×2 visibles dans le trailer officiel KONAMI.

**Incarnation à conserver :** Dark armored Raptor UG with source-visible four-opening dorsal pod

**État vérifié :** métadonnées natives avec limites. 32 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, recover, roll, hit, ko, charge, parry, reload, optic, blade.

**Réemplois à examiner :** `throw` = throw, specialForward ; `deploy` = special, super ; `roll` = specialDown, specialBack.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** RAPTOR : Raptor : griffes de contact et lanceur dorsal à quatre bouches bien séparés. Petits ajustements mécaniques des organes présents et optique stable ; aucune respiration humaine. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas de châssis et appuis des membres, masse portée par les articulations. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Lames rapprochées et missile antiaérien » : orientation défensive du châssis, des membres ou de la protection effectivement présente ; pas d’avant-bras humain ajouté ; recul bloqué distinct de la simple position basse. Garder Raptor : griffes de contact et lanceur dorsal à quatre bouches bien séparés.
- **jump_land :** RAPTOR : départ par poussée ou articulation autorisée, déplacement aérien puis stabilisation et reprise d’appui ; les appareils volants gardent leur mode de sustentation. pas de châssis et appuis des membres, masse portée par les articulations. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Secousse du châssis et de l’organe touché de RAPTOR, déséquilibre, arrêt puis remise en position par ses articulations réelles. Terminer par retour de griffe et stabilisation du lanceur dorsal. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGR », présentation de Dark armored Raptor UG with source-visible four-opening dorsal pod, puis Raptor : griffes de contact et lanceur dorsal à quatre bouches bien séparés. Geste court lié à « Tir dorsal antiaérien » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, retour de griffe et stabilisation du lanceur dorsal ; RAPTOR vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGR.
- **round_loss :** Proposition CQC : RAPTOR interrompt ses émissions, absorbe l’oscillation de sa masse, stabilise ses appuis ou son vol, puis replace ses organes ; aucune régénération gratuite. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Impact dorsal renforcé », revenir par retour de griffe et stabilisation du lanceur dorsal, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Griffe de contact

**Existant :** `melee` / `blade` ; 12/4/22 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAPTOR, préparer « Griffe de contact » ; Raptor : griffes de contact et lanceur dorsal à quatre bouches bien séparés. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** retour de griffe et stabilisation du lanceur dorsal. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe la préparation et quitte sa portée.

##### heavy — Fauchage des lames

**Existant :** `melee` / `blade` ; 26/6/36 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAPTOR, préparer « Fauchage des lames » ; Raptor : griffes de contact et lanceur dorsal à quatre bouches bien séparés. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** retour de griffe et stabilisation du lanceur dorsal. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe la préparation et quitte sa portée.

##### low — Cisaille rasante

**Existant :** `melee` / `blade` ; 19/5/30 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAPTOR, préparer « Cisaille rasante » ; Raptor : griffes de contact et lanceur dorsal à quatre bouches bien séparés. Orienter la lame ou l’organe cité par la technique ; l’armé expose le trajet à venir.

**Action.** Exécuter la coupe, l’estoc ou le coup porté par cet organe ; le point le plus avancé du dessin et la zone active doivent suivre la même trajectoire. Laisser lire la pointe/le tranchant ou l’extrémité réelle.

**Retour.** retour de griffe et stabilisation du lanceur dorsal. Terminer l’élan, retirer l’organe puis reprendre l’appui ; variante basse si cette commande cible le bas.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut avant le balayage.

##### throw — Saisie du Raptor

**Existant :** `melee` / `grapple` ; 18/4/38 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAPTOR, préparer « Saisie du Raptor » ; Raptor : griffes de contact et lanceur dorsal à quatre bouches bien séparés. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** retour de griffe et stabilisation du lanceur dorsal. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Quitte la portée de saisie ou saute avant son activation.

##### special — Tir dorsal antiaérien

**Existant :** `projectile` / `rocket` ; 29/2/37 ticks ; groupe `deploy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAPTOR, préparer « Tir dorsal antiaérien » ; Raptor : griffes de contact et lanceur dorsal à quatre bouches bien séparés. Montrer la prise et la visée de l’arme décrite par « Tir dorsal antiaérien » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** retour de griffe et stabilisation du lanceur dorsal. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Le missile suit le tube vers le haut ; reste hors de son axe. Il peut survoler une cible au sol.

##### specialDown — Repli bas du Raptor

**Existant :** `mobility` / `movement` ; 11/13/25 ticks ; groupe `roll`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAPTOR, préparer « Repli bas du Raptor » ; Raptor : griffes de contact et lanceur dorsal à quatre bouches bien séparés. Préparer l’appui qui produit le déplacement ; pas de châssis et appuis des membres, masse portée par les articulations.

**Action.** Exécuter « Repli bas du Raptor » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -3 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** retour de griffe et stabilisation du lanceur dorsal. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe la préparation et quitte sa portée.

##### specialForward — Bond du châssis

**Existant :** `melee` / `strike` ; 20/6/33 ticks ; groupe `throw`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAPTOR, préparer « Bond du châssis » ; Raptor : griffes de contact et lanceur dorsal à quatre bouches bien séparés. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Bond du châssis » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour de griffe et stabilisation du lanceur dorsal.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Évite la préparation du bond puis punis la retombée.

##### specialBack — Décrochage du Raptor

**Existant :** `mobility` / `movement` ; 13/13/27 ticks ; groupe `roll`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAPTOR, préparer « Décrochage du Raptor » ; Raptor : griffes de contact et lanceur dorsal à quatre bouches bien séparés. Préparer l’appui qui produit le déplacement ; pas de châssis et appuis des membres, masse portée par les articulations.

**Action.** Exécuter « Décrochage du Raptor » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -4 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** retour de griffe et stabilisation du lanceur dorsal. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe la préparation et quitte sa portée.

##### super — Impact dorsal renforcé

**Existant :** `projectile` / `rocket` ; 39/2/47 ticks ; groupe `deploy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAPTOR, préparer « Impact dorsal renforcé » ; Raptor : griffes de contact et lanceur dorsal à quatre bouches bien séparés. Montrer la prise et la visée de l’arme décrite par « Impact dorsal renforcé » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** retour de griffe et stabilisation du lanceur dorsal. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Le missile suit le tube vers le haut ; reste hors de son axe. Il peut survoler une cible au sol.

##### utility — Stabilisation mécanique

**Existant :** `recover` / `recovery` ; 45/1/24 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAPTOR, préparer « Stabilisation mécanique » ; Raptor : griffes de contact et lanceur dorsal à quatre bouches bien séparés. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Stabilisation mécanique ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** retour de griffe et stabilisation du lanceur dorsal. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interromps la régulation ; elle ne protège pas le châssis.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Impact dorsal renforcé · conclusion

Famille `mechanical`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Impact dorsal renforcé.

Plan 1 : RAPTOR sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Impact dorsal renforcé ». Plan 2 : pas de châssis et appuis des membres, masse portée par les articulations ; montrer l’organe de « Impact dorsal renforcé ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : retour de griffe et stabilisation du lanceur dorsal, pose de signature face à l’adversaire.

##### Repli bas du Raptor · conclusion

Famille `mechanical`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Repli bas du Raptor.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Repli bas du Raptor » ; l’espace disponible doit être lisible. Plan 2 : pas de châssis et appuis des membres, masse portée par les articulations ; montrer l’organe de « Repli bas du Raptor ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : retour de griffe et stabilisation du lanceur dorsal, arrêt du dispositif et retour au cadre d’ensemble.

##### Bond du châssis · conclusion

Famille `mechanical`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Bond du châssis.

Plan 1 : approche jusqu’à la distance réelle de « Bond du châssis », arme et main libre identifiées. Plan 2 : pas de châssis et appuis des membres, masse portée par les articulations ; montrer l’organe de « Bond du châssis ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : retour de griffe et stabilisation du lanceur dorsal, prise de distance et maintien final.

##### Saisie du Raptor · conclusion

Famille `mechanical`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Saisie du Raptor.

Plan 1 : après une observation ou un repli, RAPTOR reprend l’initiative par « Saisie du Raptor ». Plan 2 : pas de châssis et appuis des membres, masse portée par les articulations ; montrer l’organe de « Saisie du Raptor ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : retour de griffe et stabilisation du lanceur dorsal, rangement/pose finale différente des trois autres.

#### Limites et preuves

- sourceKind classifies the official reference gameplay footage only. The runtime PNGs are newly generated native painted CQC2D5 adaptations, not extracted game sprite pixels.
- Appearance follows the observable publisher2013 body as closely as supported. Original3D joints, unseen surfaces and exact retail model differences are not certified.
- Two independently painted native facings, sixteen physical poses per facing. Keyposes, phase maps, timing, damage, collisions and projectile trajectories are CQC2D5 adaptations.
- The3.2metre display height is an existing estimate, not official measured scale. Native sourceFrameHeights and painted2D body datums normalize each facing.
- This module supplies whole-pose paintings only; no articulated/destructible rig is added. Global64rigs/841parts are unchanged.
- Source PNG bytes remain intact. Exact pixel-union clip contours separate neighboring paintings at analysis alpha16; low-alpha residue outside these contours is not drawn.
- Dorsal pod has four visible bores2x2 in the reviewed source views. Rejected six-bore V2 paintings are preserved as source-history candidates but never runtime assets.
- [Raptor physical body and selected four-opening dorsal pod, shown in UnmannedGears at72-87seconds. Pre-release footage, hidden geometry not certified.](https://www.youtube.com/watch?v=o8CEQPohIgU) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Native1280x720 frames80.3/80.6/81.12 independently show four projected bores2x2. No six-tube claim. Different gun mount at82s is not combined into this body.](https://www.gamereactor.eu/video/89451/Metal%2BGear%2BRising%2BRevengeance%2B-%2BUnmanned%2BGears%2BTrailer/) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## pass19__mastiff_mgr

### MASTIFF — MGR

**Rôle :** Pattes organiques et armement de machine. **Profil :** `gekko`.

**Base présente dans le code :** Mastiff de Revengeance, unité humanoïde autonome à longs avant-bras.

**Incarnation à conserver :** Released2013 Unmanned Gear; source-led native CQC adaptation

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, roll, attack, punch, heavy, low, throw, deploy, shoot, charge, reload, recover, optic, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `deploy` = special, super ; `roll` = specialDown, specialBack.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** MASTIFF : jambes biologiques et tête/châssis de Gekko, arme sur son montage. Petits ajustements mécaniques des organes présents et optique stable ; aucune respiration humaine. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** foulées lourdes et contact des pieds ; aucun cycle humanoïde de bras. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Pattes organiques et armement de machine » : orientation défensive du châssis, des membres ou de la protection effectivement présente ; pas d’avant-bras humain ajouté ; recul bloqué distinct de la simple position basse. Garder jambes biologiques et tête/châssis de Gekko, arme sur son montage.
- **jump_land :** MASTIFF : départ par poussée ou articulation autorisée, déplacement aérien puis stabilisation et reprise d’appui ; les appareils volants gardent leur mode de sustentation. foulées lourdes et contact des pieds ; aucun cycle humanoïde de bras. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Secousse du châssis et de l’organe touché de MASTIFF, déséquilibre, arrêt puis remise en position par ses articulations réelles. Terminer par recul du châssis et retour de tourelle. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGR », présentation de Released2013 Unmanned Gear; source-led native CQC adaptation, puis jambes biologiques et tête/châssis de Gekko, arme sur son montage. Geste court lié à « Grenade de l’épaule » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, recul du châssis et retour de tourelle ; MASTIFF vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGR.
- **round_loss :** Proposition CQC : MASTIFF interrompt ses émissions, absorbe l’oscillation de sa masse, stabilise ses appuis ou son vol, puis replace ses organes ; aucune régénération gratuite. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Salve du Mastiff », revenir par recul du châssis et retour de tourelle, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Poing de l’UG

**Existant :** `melee` / `strike` ; 14/4/23 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MASTIFF, préparer « Poing de l’UG » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Poing de l’UG » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul du châssis et retour de tourelle.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe la préparation et garde ou quitte sa portée.

##### heavy — Marteau des avant-bras

**Existant :** `melee` / `strike` ; 27/7/37 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MASTIFF, préparer « Marteau des avant-bras » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Marteau des avant-bras », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** recul du châssis et retour de tourelle.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe la préparation et garde ou quitte sa portée.

##### low — Contact au sol

**Existant :** `melee` / `strike` ; 20/5/31 ticks ; groupe `low`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MASTIFF, préparer « Contact au sol » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** recul du châssis et retour de tourelle.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe la préparation et garde ou quitte sa portée.

##### throw — Saisie des mains mécaniques

**Existant :** `melee` / `grapple` ; 17/4/40 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MASTIFF, préparer « Saisie des mains mécaniques » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recul du châssis et retour de tourelle. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe la préparation et garde ou quitte sa portée.

##### special — Grenade de l’épaule

**Existant :** `projectile` / `explosive` ; 30/1/37 ticks ; groupe `deploy`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MASTIFF, préparer « Grenade de l’épaule » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Prélever l’objet correspondant à « Grenade de l’épaule », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 48 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** recul du châssis et retour de tourelle. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe la préparation et garde ou quitte sa portée.

##### specialDown — Repli du châssis

**Existant :** `mobility` / `movement` ; 12/13/26 ticks ; groupe `roll`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MASTIFF, préparer « Repli du châssis » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Préparer l’appui qui produit le déplacement ; foulées lourdes et contact des pieds ; aucun cycle humanoïde de bras.

**Action.** Exécuter « Repli du châssis » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 2 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** recul du châssis et retour de tourelle. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe la préparation et garde ou quitte sa portée.

##### specialForward — Ruée du Mastiff

**Existant :** `melee` / `strike` ; 18/6/33 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MASTIFF, préparer « Ruée du Mastiff » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Ruée du Mastiff » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul du châssis et retour de tourelle.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe la préparation et garde ou quitte sa portée.

##### specialBack — Saut de retrait

**Existant :** `mobility` / `movement` ; 14/13/27 ticks ; groupe `roll`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MASTIFF, préparer « Saut de retrait » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Préparer l’appui qui produit le déplacement ; foulées lourdes et contact des pieds ; aucun cycle humanoïde de bras.

**Action.** Exécuter « Saut de retrait » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -4 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** recul du châssis et retour de tourelle. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe la préparation et garde ou quitte sa portée.

##### super — Salve du Mastiff

**Existant :** `projectile` / `explosive` ; 42/1/48 ticks ; groupe `deploy`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MASTIFF, préparer « Salve du Mastiff » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Prélever l’objet correspondant à « Salve du Mastiff », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. La salve contient 3 émissions, espacées de 13 ticks CQC : recalculer le point de bouche à chaque départ. L’objet conserve sa mèche de 48 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** recul du châssis et retour de tourelle. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe la préparation et garde ou quitte sa portée.

##### utility — Régulation de l’UG

**Existant :** `recover` / `recovery` ; 45/1/23 ticks ; groupe `recover`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MASTIFF, préparer « Régulation de l’UG » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Régulation de l’UG ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** recul du châssis et retour de tourelle. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe la préparation et garde ou quitte sa portée.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Salve du Mastiff · conclusion

Famille `mechanical`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Salve du Mastiff.

Plan 1 : MASTIFF sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Salve du Mastiff ». Plan 2 : foulées lourdes et contact des pieds ; aucun cycle humanoïde de bras ; montrer l’organe de « Salve du Mastiff ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : recul du châssis et retour de tourelle, pose de signature face à l’adversaire.

##### Repli du châssis · conclusion

Famille `mechanical`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Repli du châssis.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Repli du châssis » ; l’espace disponible doit être lisible. Plan 2 : foulées lourdes et contact des pieds ; aucun cycle humanoïde de bras ; montrer l’organe de « Repli du châssis ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : recul du châssis et retour de tourelle, arrêt du dispositif et retour au cadre d’ensemble.

##### Ruée du Mastiff · conclusion

Famille `mechanical`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Ruée du Mastiff.

Plan 1 : approche jusqu’à la distance réelle de « Ruée du Mastiff », arme et main libre identifiées. Plan 2 : foulées lourdes et contact des pieds ; aucun cycle humanoïde de bras ; montrer l’organe de « Ruée du Mastiff ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : recul du châssis et retour de tourelle, prise de distance et maintien final.

##### Saisie des mains mécaniques · conclusion

Famille `mechanical`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Saisie des mains mécaniques.

Plan 1 : après une observation ou un repli, MASTIFF reprend l’initiative par « Saisie des mains mécaniques ». Plan 2 : foulées lourdes et contact des pieds ; aucun cycle humanoïde de bras ; montrer l’organe de « Saisie des mains mécaniques ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : recul du châssis et retour de tourelle, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Independently painted facings from the released-model design; this is a 2.5D adaptation, not extracted game sprite pixels.
- The 2.8 metre standing display height is an estimate. No official metric size or absolute 1:1 fidelity is certified.
- Sixteen physical poses per facing are reused in explicit move phases. Timings, damage, grenade trajectories and combo sequences are CQC adaptations.
- Native full-body action sprites are supplied; individual part destruction is not added in this module.
- [Final released-model full-body surfaces and artificial joints; community reproduction, not a primary publisher photograph.](https://open3dlab.com/project/478600f7-dee1-4c1b-97dc-d7e2039f55ee/) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Released-game forearms, seams, harness, legs and behavior corroboration; partially occluded during combat.](https://portforward.com/games/walkthroughs/Metal-Gear-Solid-Rising-Revengeance/R-02-Research-Facility.htm) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## pass19__slider_mgr

### SLIDER — MGR

**Rôle :** Pattes organiques et armement de machine. **Profil :** `gekko`.

**Base présente dans le code :** Slider de Revengeance, machine volante distincte de son éventuel pilote.

**Incarnation à conserver :** Released2013 Unmanned Gear; source-led native CQC adaptation

**État vérifié :** métadonnées natives avec limites. 28 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, roll, attack, punch, heavy, low, throw, deploy, shoot, charge, reload, recover, optic, parry, hit, ko.

**Réemplois à examiner :** `deploy` = special, super ; `roll` = specialDown, specialBack.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** SLIDER : jambes biologiques et tête/châssis de Gekko, arme sur son montage. Petits ajustements mécaniques des organes présents et optique stable ; aucune respiration humaine. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** foulées lourdes et contact des pieds ; aucun cycle humanoïde de bras. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Pattes organiques et armement de machine » : orientation défensive du châssis, des membres ou de la protection effectivement présente ; pas d’avant-bras humain ajouté ; recul bloqué distinct de la simple position basse. Garder jambes biologiques et tête/châssis de Gekko, arme sur son montage.
- **jump_land :** SLIDER : départ par poussée ou articulation autorisée, déplacement aérien puis stabilisation et reprise d’appui ; les appareils volants gardent leur mode de sustentation. foulées lourdes et contact des pieds ; aucun cycle humanoïde de bras. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Secousse du châssis et de l’organe touché de SLIDER, déséquilibre, arrêt puis remise en position par ses articulations réelles. Terminer par recul du châssis et retour de tourelle. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGR », présentation de Released2013 Unmanned Gear; source-led native CQC adaptation, puis jambes biologiques et tête/châssis de Gekko, arme sur son montage. Geste court lié à « Missile du Slider » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, recul du châssis et retour de tourelle ; SLIDER vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGR.
- **round_loss :** Proposition CQC : SLIDER interrompt ses émissions, absorbe l’oscillation de sa masse, stabilise ses appuis ou son vol, puis replace ses organes ; aucune régénération gratuite. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Salve des ailes », revenir par recul du châssis et retour de tourelle, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Contact de l’aile

**Existant :** `melee` / `strike` ; 13/4/22 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SLIDER, préparer « Contact de l’aile » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Contact de l’aile » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul du châssis et retour de tourelle.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe la préparation et garde ou quitte sa portée.

##### heavy — Passage de l’UG

**Existant :** `melee` / `strike` ; 25/6/32 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SLIDER, préparer « Passage de l’UG » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Passage de l’UG », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** recul du châssis et retour de tourelle.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe la préparation et garde ou quitte sa portée.

##### low — Passage rasant

**Existant :** `melee` / `strike` ; 19/5/29 ticks ; groupe `low`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SLIDER, préparer « Passage rasant » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** recul du châssis et retour de tourelle.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe la préparation et garde ou quitte sa portée.

##### throw — Collision de capture

**Existant :** `melee` / `grapple` ; 18/4/35 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SLIDER, préparer « Collision de capture » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recul du châssis et retour de tourelle. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe la préparation et garde ou quitte sa portée.

##### special — Missile du Slider

**Existant :** `projectile` / `rocket` ; 28/1/35 ticks ; groupe `deploy`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SLIDER, préparer « Missile du Slider » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Montrer la prise et la visée de l’arme décrite par « Missile du Slider » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** recul du châssis et retour de tourelle. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe la préparation et garde ou quitte sa portée.

##### specialDown — Décrochage aérien

**Existant :** `mobility` / `movement` ; 9/14/22 ticks ; groupe `roll`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SLIDER, préparer « Décrochage aérien » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Préparer l’appui qui produit le déplacement ; foulées lourdes et contact des pieds ; aucun cycle humanoïde de bras.

**Action.** Exécuter « Décrochage aérien » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 4 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** recul du châssis et retour de tourelle. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe la préparation et garde ou quitte sa portée.

##### specialForward — Double départ de missiles

**Existant :** `projectile` / `rocket` ; 33/1/42 ticks ; groupe `charge`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SLIDER, préparer « Double départ de missiles » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Montrer la prise et la visée de l’arme décrite par « Double départ de missiles » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 2 émissions, espacées de 9 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** recul du châssis et retour de tourelle. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe la préparation et garde ou quitte sa portée.

##### specialBack — Repli aérien

**Existant :** `mobility` / `movement` ; 10/14/22 ticks ; groupe `roll`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SLIDER, préparer « Repli aérien » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Préparer l’appui qui produit le déplacement ; foulées lourdes et contact des pieds ; aucun cycle humanoïde de bras.

**Action.** Exécuter « Repli aérien » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -5 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** recul du châssis et retour de tourelle. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe la préparation et garde ou quitte sa portée.

##### super — Salve des ailes

**Existant :** `projectile` / `rocket` ; 39/1/47 ticks ; groupe `deploy`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SLIDER, préparer « Salve des ailes » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Montrer la prise et la visée de l’arme décrite par « Salve des ailes » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 3 émissions, espacées de 10 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** recul du châssis et retour de tourelle. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe la préparation et garde ou quitte sa portée.

##### utility — Régulation de l’UG

**Existant :** `recover` / `recovery` ; 45/1/23 ticks ; groupe `recover`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de SLIDER, préparer « Régulation de l’UG » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Régulation de l’UG ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** recul du châssis et retour de tourelle. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe la préparation et garde ou quitte sa portée.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Salve des ailes · conclusion

Famille `mechanical`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Salve des ailes.

Plan 1 : SLIDER sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Salve des ailes ». Plan 2 : foulées lourdes et contact des pieds ; aucun cycle humanoïde de bras ; montrer l’organe de « Salve des ailes ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : recul du châssis et retour de tourelle, pose de signature face à l’adversaire.

##### Décrochage aérien · conclusion

Famille `mechanical`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Décrochage aérien.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Décrochage aérien » ; l’espace disponible doit être lisible. Plan 2 : foulées lourdes et contact des pieds ; aucun cycle humanoïde de bras ; montrer l’organe de « Décrochage aérien ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : recul du châssis et retour de tourelle, arrêt du dispositif et retour au cadre d’ensemble.

##### Double départ de missiles · conclusion

Famille `mechanical`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Double départ de missiles.

Plan 1 : approche jusqu’à la distance réelle de « Double départ de missiles », arme et main libre identifiées. Plan 2 : foulées lourdes et contact des pieds ; aucun cycle humanoïde de bras ; montrer l’organe de « Double départ de missiles ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : recul du châssis et retour de tourelle, prise de distance et maintien final.

##### Collision de capture · conclusion

Famille `mechanical`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Collision de capture.

Plan 1 : après une observation ou un repli, SLIDER reprend l’initiative par « Collision de capture ». Plan 2 : foulées lourdes et contact des pieds ; aucun cycle humanoïde de bras ; montrer l’organe de « Collision de capture ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : recul du châssis et retour de tourelle, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Only the flying Unmanned Gear is playable. A mounted human cyborg is a separate subject and has not been fused into the machine.
- Wings, panel colors and pods follow inspected Konami assets. The airframe behind the rider is reconstructed from the three views; occluded surfaces and absolute 1:1 fidelity are not certified.
- The 1.5 metre vertical display dimension is an estimate, not a certified wingspan or official model scale.
- Each facing has sixteen native paintings; left poses 10 and 11 turn toward the opposite direction and are retained but never selected.
- Grenade-free machine movement, missile trajectories, catches and damage are authored CQC adaptations. Full-body sprites are supplied; independent wing part destruction is still pending.
- [Konami 2012 press screenshots explicitly published by SG Gaming Info; full flying machine wing panels, red tips, pods and central airframe inspected.](https://www.sggaminginfo.com/2012/12/konami-release-new-metal-gear-rising-assets/) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Full machine geometry; accompanying cyborg rider is explicitly not part of this fighter.](https://www.sggaminginfo.com/wp-content/gallery/metal_gear_rising_bootcamp_screenshots/CyborgSlider_ready_W.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## pass19__hammerhead_mgr

### HAMMERHEAD — MGR

**Rôle :** Pattes organiques et armement de machine. **Profil :** `gekko`.

**Base présente dans le code :** Armement du Hammerhead de Revengeance : canon de nez et missiles sous voilure. Cadence, dégâts et trajectoires adaptés à CQC.

**Incarnation à conserver :** Armement du Hammerhead de Revengeance : canon de nez et missiles sous voilure. Cadence, dégâts et trajectoires adaptés à CQC.

**État vérifié :** route machine effectivement déclarée ; animations d’articulation à contrôler. Une route machine est déclarée dans le runtime. Ses articulations remplacent le catalogue de corps contrôlé ; ce n’est pas un constat de sprite absent.

**Réemplois à examiner :** pas de groupe natif partagé observé dans cette extraction.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** HAMMERHEAD : jambes biologiques et tête/châssis de Gekko, arme sur son montage. Petits ajustements mécaniques des organes présents et optique stable ; aucune respiration humaine. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** foulées lourdes et contact des pieds ; aucun cycle humanoïde de bras. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « Pattes organiques et armement de machine » : orientation défensive du châssis, des membres ou de la protection effectivement présente ; pas d’avant-bras humain ajouté ; recul bloqué distinct de la simple position basse. Garder jambes biologiques et tête/châssis de Gekko, arme sur son montage.
- **jump_land :** HAMMERHEAD : départ par poussée ou articulation autorisée, déplacement aérien puis stabilisation et reprise d’appui ; les appareils volants gardent leur mode de sustentation. foulées lourdes et contact des pieds ; aucun cycle humanoïde de bras. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Secousse du châssis et de l’organe touché de HAMMERHEAD, déséquilibre, arrêt puis remise en position par ses articulations réelles. Terminer par recul du châssis et retour de tourelle. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGR », présentation de Armement du Hammerhead de Revengeance : canon de nez et missiles sous voilure. Cadence, dégâts et trajectoires adaptés à CQC., puis jambes biologiques et tête/châssis de Gekko, arme sur son montage. Geste court lié à « Canon de nez » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, recul du châssis et retour de tourelle ; HAMMERHEAD vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGR.
- **round_loss :** Proposition CQC : HAMMERHEAD interrompt ses émissions, absorbe l’oscillation de sa masse, stabilise ses appuis ou son vol, puis replace ses organes ; aucune régénération gratuite. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Assaut décisif », revenir par recul du châssis et retour de tourelle, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Contact

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de HAMMERHEAD, préparer « Contact » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Contact » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul du châssis et retour de tourelle.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### heavy — Percussion

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de HAMMERHEAD, préparer « Percussion » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Percussion », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** recul du châssis et retour de tourelle.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### low — Balayage

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de HAMMERHEAD, préparer « Balayage » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** recul du châssis et retour de tourelle.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### throw — Saisie

**Existant :** `melee` / `grapple` ; 13/4/32 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de HAMMERHEAD, préparer « Saisie » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recul du châssis et retour de tourelle. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### special — Canon de nez

**Existant :** `projectile` / `ballistic` ; 22/1/36 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de HAMMERHEAD, préparer « Canon de nez » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Montrer la prise et la visée de l’arme décrite par « Canon de nez » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** recul du châssis et retour de tourelle. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Le canon pivote sur un débattement limité. Garde le tir ou quitte son axe.

##### specialDown — Missile sous voilure

**Existant :** `projectile` / `rocket` ; 16/5/29 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de HAMMERHEAD, préparer « Missile sous voilure » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Montrer la prise et la visée de l’arme décrite par « Missile sous voilure » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** recul du châssis et retour de tourelle. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Un missile lent à correction limitée. Change de hauteur ou garde son arrivée.

##### specialForward — Ruée

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de HAMMERHEAD, préparer « Ruée » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Ruée » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul du châssis et retour de tourelle.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### specialBack — Recul offensif

**Existant :** `melee` / `strike` ; 22/1/31 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de HAMMERHEAD, préparer « Recul offensif » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Recul offensif » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul du châssis et retour de tourelle.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### super — Assaut décisif

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de HAMMERHEAD, préparer « Assaut décisif » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Assaut décisif », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** recul du châssis et retour de tourelle.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

##### utility — Reprise

**Existant :** `melee` / `strike` ; 45/1/25 ticks ; groupe `route spécifique à vérifier`, —/— régions par direction. actionMap déclarative ; sélection contextuelle à vérifier.

**Préparation.** Depuis la garde de HAMMERHEAD, préparer « Reprise » ; jambes biologiques et tête/châssis de Gekko, arme sur son montage. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Reprise » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul du châssis et retour de tourelle.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Observe le départ et garde ou quitte sa portée.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Assaut décisif · conclusion

Famille `mechanical`, ton `stylized` ; 220 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Assaut décisif.

Plan 1 : HAMMERHEAD sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Assaut décisif ». Plan 2 : foulées lourdes et contact des pieds ; aucun cycle humanoïde de bras ; montrer l’organe de « Assaut décisif ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : recul du châssis et retour de tourelle, pose de signature face à l’adversaire.

##### Missile sous voilure · conclusion

Famille `mechanical`, ton `stylized` ; 238 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Missile sous voilure.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Missile sous voilure » ; l’espace disponible doit être lisible. Plan 2 : foulées lourdes et contact des pieds ; aucun cycle humanoïde de bras ; montrer l’organe de « Missile sous voilure ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : recul du châssis et retour de tourelle, arrêt du dispositif et retour au cadre d’ensemble.

##### Ruée · conclusion

Famille `mechanical`, ton `stylized` ; 256 ticks CQC ; phases actuelles : approach → grapple → impact → fall. Appuis déclarés : Ruée.

Plan 1 : approche jusqu’à la distance réelle de « Ruée », arme et main libre identifiées. Plan 2 : foulées lourdes et contact des pieds ; aucun cycle humanoïde de bras ; montrer l’organe de « Ruée ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : recul du châssis et retour de tourelle, prise de distance et maintien final.

##### Saisie · conclusion

Famille `mechanical`, ton `stylized` ; 274 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Saisie.

Plan 1 : après une observation ou un repli, HAMMERHEAD reprend l’initiative par « Saisie ». Plan 2 : foulées lourdes et contact des pieds ; aucun cycle humanoïde de bras ; montrer l’organe de « Saisie ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : recul du châssis et retour de tourelle, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Profil de versus adapté; valeurs et animations non extraites du jeu source.
- Références de silhouette et qualité native validées séparément.
- Ce profil CQC ne revendique pas une extraction exacte des attaques ou paramètres du jeu source.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).
