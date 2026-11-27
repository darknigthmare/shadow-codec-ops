# CQC — intégration des extensions du guide, P71

**27 novembre 2026 · MGS Codec Simulator / CQC Versus Legacy.** Cette annexe applique les sections **30 à 67** des deux extensions au projet existant. Elle complète les 90 exigences historiques du guide général sans modifier leurs registres, les UID, les sources sélectionnées ou les sauvegardes existantes.

Le guide général était déjà intégré dans la fondation P62. Sa copie actuelle est **identique octet pour octet** à l’original récupéré. Les deux extensions n’étaient pas présentes dans l’arbre de référence `f2b7c526a3a6a763767afcd8ae91f60bc7012d7c` de la PR25 ; leurs copies intégrales et la présente adaptation sont ajoutées en P71. **P70 reste réservé au lot antérieur annoncé mais non retrouvé**, sans le reconstituer ni le compter comme livré.

La référence visuelle confirmée avant ce lot est P69 : **267 sources sélectionnées, 90 dossiers Atlas et 20 essais archivés**. Le [manifeste P71](../cqc-reprise/pass71/delivery-manifest.json) ajoute cinq sources statiques (deux composants Rising et trois objets Survive) et porte le cumul courant à **272 sources, 95 fiches Atlas et 20 essais archivés**. Les 75 lignes historiques de manquants restent ouvertes : ces objets et composants sont des ajouts distincts. Ces nombres décrivent les sources ; ils ne mesurent ni les combattants animés, ni les fonctionnalités terminées, ni les trois nouveaux rapports locaux ci-dessous.

## 1. Sources originales et méthode de raccordement

| Document conservé | Rubriques | Octets | SHA-256 |
|---|---:|---:|---|
| [Guide général v1.0](sources/Combat_Games_Guide_General_v1.0.txt) | 00–29 | 55 172 | `4844584616072ac0d52d37c2fab4365e1ec489240f17a721ee216e223b0355b7` |
| [Extension 01 v1.0](sources/Combat_Games_Extension_01_Tag_Taunts_Bonus_v1.0.txt) | 30–49 | 60 589 | `330fb7485a7a52b2a20f855646c940aaac0fcd9510032bc84b2e17c518edd25f` |
| [Extension 02 v1.0](sources/Combat_Games_Extension_02_Slots_Verrouilles_Deblocages_Abonnes_v1.0.txt) | 50–67 | 47 334 | `08b57ea542e83c487fef3276997a612d4657f2ee9ed4f8e46b0bf65a2778038b` |

La [provenance P71](sources/provenance-p71.json) conserve les identifiants Drive, dates, tailles, méthode de récupération et contrôles. Le [registre d’application P71](extension-guide-map-p71.json) identifie **38 rubriques et 114 exigences**, leurs chemins, les UID concernés, l’état d’implémentation, les contrôles exécutés et les preuves encore attendues. Il complète [guide-map.json](guide-map.json), sans changer son périmètre historique de 30 rubriques et 90 exigences.

Les termes « retenu » et « documenté » expriment une décision de conception. « Observé dans le code hérité » exprime une lecture du dépôt. « Implémentation locale P71 » ne couvre que le parcours nommé et ses preuves. Aucun de ces termes ne certifie automatiquement le tag, une animation, le réseau, un abonnement ou une fidélité absolue 1:1.

### État de départ vérifié

| Domaine | Évidence existante | Portée conservée |
|---|---|---|
| Actions et taunt de gameplay | [Moteur Pass8](../../public/cqc/src/cqc-pass8-combat-engine.js), gestion de `buff:taunt` et multiplicateurs associés | Un effet de combat existe ; il ne prouve pas un cycle animé de taunt pour tout le roster. |
| Relais d’équipes | [Battle Operations](../../public/cqc/modules/battle-operations-v053.html), `relay`, `currentMatch`, `onResult`, compteurs `relay3Wins`/`relay5Wins` | Combattants successifs après le résultat d’un duel ; le code inspecté n’établit pas un changement contrôlable pendant le même échange. |
| Projectiles et pièges | Moteur Pass8, `spawn`, `destroyObjects`, `s.projectiles`, `s.traps` | Propriétaire par slot et cycle de collision existants ; conservation entre plusieurs membres d’une équipe à concevoir. |
| Déblocage de scènes | [Chronicles Core](../../public/cqc/src/chronicles-core-v056.js), `unlocked`, `records`, validation du parcours | Épilogues après parcours terminé ; ce tableau ne constitue pas un droit universel sur personnages, costumes ou stages. |
| Sources et consultation | [Atlas](../../public/cqc/modules/source-atlas-v063.html) et [catalogue](../../public/cqc/data/cqc-p63-source-atlas.json) | Sources fixes consultables, avec flags d’admission au combat séparés. |
| Narration et grands systèmes | [État du jeu](ETAT_DU_JEU.md), [COMBAT](COMBAT.md), [NARRATION](NARRATION.md) | Rapports historiques bornés ; P71 ne les transforme pas en nouvelle certification d’exécution. |

## 2. Continuités, identités et fidélité

La fidélité 1:1 porte sur l’identité, la silhouette, les armes, les capacités, la personnalité et le contexte. Le format d’image reste adapté à l’asset. Chaque contenu garde les cinq statuts du guide : **canon attesté, adaptation jouable, original compatible, alternatif/crossover, à confirmer**. Les noms d’actions, règles d’équipe, fenêtres, coûts et chorégraphies proposés ici sont des créations CQC, sauf référence explicite à une séquence attestée.

### Identifiants réellement présents

Les UID suivants ont été vérifiés dans [roster-coverage.json](roster-coverage.json), qui décrit la base compilée de 354 profils, avant les adaptateurs ultérieurs. La table ne crée aucun nouveau personnage et ne certifie pas leur état final après chargement.

| UID | Incarnation du registre | Raccordement prioritaire |
|---|---|---|
| `core__snake` | Naked Snake / Snake Eater | CQC humain, présentation, entraînement ; pas de bras bionique de TPP. |
| `core__boss` | The Boss / The Joy | Contre, désarmement et geste de maîtrise, selon loadout. |
| `core__solid` | Solid Snake / MGS1 | Équipement Shadow Moses et conclusion compatible avec la cible. |
| `core__ocelot_mgs1` | Revolver Ocelot / MGS1 | Révolver et rechargement de cette incarnation. |
| `core__raiden_mgs2` | Raiden / Sons of Liberty | Corps humain, lame seulement si le loadout et la phase l’autorisent. |
| `core__raiden` | Raiden / Revengeance | Corps et lame de la version MGR ; ressources adaptées. |
| `core__wolf` | Sniper Wolf / MGS1 | Tir et repositionnement ; cet UID ne désigne pas Blade Wolf. |
| `core__blade_wolf` | Blade Wolf / LQ-84i / MGR | Morphologie quadrupède, propre contrôle ou soutien explicite. |
| `core__sam` | Jetstream Sam / Murasama | Défi, posture, charge et remise en garde. |
| `core__mistral` | Mistral / Desperado | Arme et pièces séparées ; ne pas confondre étude de concept et équipement final. |
| `core__monsoon` | Monsoon / Desperado | Corps segmentable, propriétaire et raccordement de ses parties. |
| `core__sundowner` | Sundowner / Desperado | Plaques et armes de sa version ; limites du bouclier documentées. |
| `core__venom` | Venom Snake / Diamond Dogs | Prothèse et équipements du loadout choisi. |
| `core__quiet` | Quiet / TPP | Couverture, gestes et disponibilité narrative. |
| `core__snake_acid`, `core__teliko` | AC!D / adaptation versus | Duo de référence de Link Battle ; règles temps réel explicitement adaptées. |
| `core__snake_acid2`, `core__venus` | AC!D 2 / simulation versus | Identités distinctes de l’opus précédent ; source de scène à préciser avant chorégraphie. |
| `archive__captain`, `archive__reeve` | Survive | Défense et survie dans cette continuité ; Captain reste personnalisable. |

Le jeu de cartes AC!D, les adaptations mobiles, les versions Portable Ops de Teliko/Venus et les deux UID de Snake AC!D restent distincts. Le [Link Battle officiel](https://www.konami.com/mg/archive/mga/english/link_battle.html) atteste l’équipe Snake/Teliko ; il ne fournit ni frame data ni chorégraphie de combat 2D. Survive est décrit par [KONAMI comme une chronologie alternative](https://www.konami.com/games/eu/en/products/mg_survive/) : ses rencontres ne sont pas insérées comme événements historiques de la campagne principale. Les équipes inter-époques du versus restent hypothétiques et les scènes de « La ligne effacée » gardent leur statut de fiction CQC.

Une photographie, un portrait, une identité documentaire ou un uniforme de démonstration ne devient pas une silhouette canonique complète par extrapolation. Les présélections doivent respecter les réserves déjà inscrites dans les associations P64–P69. Les sources de Captain TGS2017 ne fixent pas son visage pour toutes les parties.

## 3. Taunts et sélection — sections 31–32

### Contrat d’action

Chaque fiche de taunt identifie l’UID, le costume, la source du geste, son statut, la commande remappable et les contextes autorisés. Elle distingue **entrée → pose/boucle → sortie → contrôle**, ainsi que l’interruption par un coup. Un geste de présentation ne donne aucune ressource nouvelle ; une provocation avec effet de jeu possède un coût, un risque, une fenêtre et une limite propres. Le `buff:taunt` hérité reste un effet de gameplay, sans être étendu implicitement à tous les personnages.

Les fenêtres et durées n’étant pas mesurées, elles restent à définir par fiche. La conception impose un retour propre à la garde ou au déplacement, un traitement explicite des projectiles déjà engagés et une limitation des voix répétées. Une provocation automatique ne doit pas intercepter une commande d’attaque. Les variantes rival/allié/boss n’utilisent que les connaissances de l’incarnation à ce moment.

### Premières fiches de personnalité, conçues et non animées

| Fiche | UID | Entrée / pose / sortie proposées | Contrôle à produire |
|---|---|---|---|
| `CQC-P71-TAUNT-NAKED` | `core__snake` | Ajustement de garde CQC, observation calme, retour en appui | Mains et équipement conformes ; aucune invisibilité ajoutée. |
| `CQC-P71-TAUNT-BOSS` | `core__boss` | Geste de défi sobre, invitation à approcher, remise en garde | Ni invulnérabilité ni désarmement gratuit pendant la pose. |
| `CQC-P71-TAUNT-OCELOT` | `core__ocelot_mgs1` | Présentation contrôlée du revolver, pose, rangement/reprise de visée | Ne pas recharger les munitions si la fiche ne prévoit qu’un geste cosmétique. |
| `CQC-P71-TAUNT-RAIDEN` | `core__raiden` | Lame mise en ligne, posture de défi, retour en garde | Ancrage main/lame, fourreau et corps de la version sélectionnée. |
| `CQC-P71-TAUNT-SAM` | `core__sam` | Sourire de défi, invitation courte, retour à sa posture de lame | Réaction interrompue indépendante ; ne pas dupliquer un taunt canonique non référencé. |
| `CQC-P71-TAUNT-QUIET` | `core__quiet` | Regard et légère correction de position, visée relâchée, retour | Expression et parole conformes au contexte ; pas de dialogue bavard générique. |
| `CQC-P71-TAUNT-WOLF` | `core__blade_wolf` | Redressement de la tête, posture quadrupède attentive, ré-ancrage | Quatre appuis, capteurs et arme caudale indépendants du squelette humain. |
| `CQC-P71-TAUNT-CAPTAIN` | `archive__captain` | Contrôle de l’outil équipé, vigilance, retour en appui | Compatible avec le preset d’avatar réellement choisi, pas un visage imposé. |

Ces huit fiches expriment une direction originale compatible. Elles requièrent la référence visuelle de chaque tenue, les poses intermédiaires, les réactions, les timings et les tests avant admission.

### Cycle de sélection

Le contrat retenu distingue **survol, présélection, confirmation, attente confirmée, changement de costume, désélection, validation d’équipe et départ au combat**. La désélection possède son propre geste ; elle n’est pas automatiquement une animation de confirmation inversée.

L’entrée du joueur est prise en compte immédiatement, même si la présentation se termine ensuite. Un identifiant de génération de l’aperçu annule les chargements devenus obsolètes. À la sortie : retirer les voix, effets, compagnon, ombres et éclairages appartenant au seul aperçu. Une navigation rapide utilise une sortie abrégée ; le mode réduit conserve des poses et textes équivalents.

À vérifier : deux curseurs, sélection simultanée, personnage miroir, costume différent, remplacement d’un membre, aléatoire filtré et retour depuis versus. Les portraits documentaires conservent leur cadrage ; un menu ne promet pas une animation de corps entier qui n’existe pas.

## 4. Assistance, tag et techniques d’équipe — sections 33–38

### Profils de mode retenus en conception

| Profil CQC | Composition et contrôle | Défaite / ressources | État de P71 |
|---|---|---|---|
| Duel existant | Deux combattants opposés | Règles héritées | Conservé. |
| Relais successif existant | Équipe 3v3 ou 5v5 ; duel suivant après résultat | Compteurs et récupération hérités | Code observé dans Battle Operations ; distinct du tag ci-dessous. |
| Assistance | Un actif, un soutien choisi ; soutien temporaire | Défaite de l’actif, selon la fiche ; coût et délai d’appel | Spécification. |
| Tag hybride à deux | Un actif et une réserve contrôlable ; réserviste également utilisable en assistance | Vies propres, défaite après deux KO ; relève KO sans coût bloquant | Spécification, aucun transfert temps réel ajouté par cette annexe. |

La jauge d’équipe et les ressources individuelles sont séparées. Les actions `TAUNT`, `ASSISTANCE`, `RELAIS`, `SUPER_DUO`, `FINISHER_EQUIPE`, `ORDRE_ENTITE` désignent des actions remappables, pas une nouvelle attribution de touches imposée au runtime actuel. Appui court/maintien, s’ils sont retenus, doivent avoir une priorité non ambiguë et des alternatives distinctes.

Pour chaque action : vérifier admissibilité, réserver les participants, prélever une seule fois le coût au moment annoncé, puis résoudre arrivée, action et sortie. Un refus avant engagement ne dépense rien. Les règles de remboursement après engagement sont inscrites dans la fiche. Une barre pleine n’annule pas l’indisponibilité du partenaire.

Le cycle d’assistance est **disponible → appel engagé → arrivée → action → sortie → récupération** ; ajouter touché, interrompu et KO selon le profil. La fiche fixe position, orientation, annonce, vulnérabilité, dégâts sur la réserve, sortie après KO de l’actif et traitement des boss. Les dommages simultanés sur actif et soutien ne doublent pas involontairement les gains de jauge.

Le tag distingue relais volontaire, relais de combo, secours défensif, relève après KO et relais scénarisé. Chaque forme a ses propres conditions. Le transfert de contrôle, de HUD et de collision possède un instant unique. Munitions, chaleur, coûts déjà engagés, statuts et récupérations restent conservés. Le combo conserve ses réductions, rebonds et limites ; le switch ne réinitialise pas l’historique. Les projectiles et pièges gardent leur propriétaire.

### Paires prioritaires et chorégraphies proposées

| Fiche / membres | Source et contexte | Contribution des deux acteurs et limites |
|---|---|---|
| `CQC-P71-DUO-ACID` — `core__snake_acid` + `core__teliko` | Équipe attestée dans le Link Battle officiel ; actions 2D adaptées | **« Couverture croisée »**, nom CQC : ouverture par l’actif, déplacement de couverture du partenaire, attaque complémentaire, séparation. Le système de cartes ne devient pas une magie projetant toutes les cartes à l’écran. |
| `CQC-P71-DUO-ACID2` — `core__snake_acid2` + `core__venus` | Paire de production de l’opus ; scène précise à sourcer avant validation | **« Fenêtre tactique »**, création CQC : contrôle de zone puis intervention courte. Les équipements et la relation dépendent de leur version ; aucune scène du premier AC!D réattribuée. |
| `CQC-P71-DUO-TPP` — `core__venom` + `core__quiet` | [KONAMI décrit couverture et attaques coordonnées](https://www.konami.com/games/us/en/topics/53/) | **« Angle couvert »**, création CQC : Venom crée une ouverture, Quiet couvre une ligne autorisée, retour à deux positions lisibles. Réservé au contexte où elle est disponible ; coût, vulnérabilité et portée restent bornés. |
| `CQC-P71-DUO-MGR` — `core__raiden` + `core__blade_wolf` | Personnages du [référentiel MGR](https://www.konami.com/mg/archive/mgr/jp/characters/) ; phase alliée à qualifier dans le chapitre | **« Relais de rupture »**, création CQC : Wolf déporte la pression, Raiden exploite l’ouverture, sortie quadrupède distincte. Aucun allié imposé avant résolution de leur relation. |
| `CQC-P71-DUO-SURVIVE` — `archive__captain` + `archive__reeve` | Continuité Survive ; disponibilité de Reeve à vérifier par scène | **« Couloir d’extraction »**, création CQC : défense d’un accès puis retrait coordonné. Pas de téléportation ni d’outil absent du loadout ; priorité aux objectifs de survie. |

Pour une super duo, le déclenchement de la longue séquence suit la confirmation du premier coup sur une cible compatible. Garde, échec et interruption ont une résolution courte, un coût défini et une récupération punissable. Les deux participants sont indisponibles pour un appel parallèle jusqu’à la sortie ; la fiche indique lequel reste actif.

La **neutralisation d’équipe** reprend la famille de conclusions de [COMBAT.md](COMBAT.md). Elle ne confond pas ultime, victoire et outro. La priorité retenue en conception est : **fin dramatique compatible → neutralisation d’équipe compatible → neutralisation individuelle → victoire normale**. Une scène de présentation ne change pas le résultat déjà acquis. Un partenaire KO ne revient pas pour l’animation.

Les fins dramatiques exigent une fiche nommant vainqueur, adversaire, versions, lieu, phase, dernière action éventuelle et niveau de connaissance. Leur nom et leurs dialogues restent originaux CQC. Les machines géantes, quadrupèdes et cibles documentaires ont un repli adapté ; aucune prise de bras humain n’est appliquée par défaut à un véhicule. Les scènes spéculatives du versus ne réécrivent pas les événements des épisodes sources.

## 5. Clashes, QTE et entités — sections 39–41

### Clashes

Le groupe de test prioritaire est une **confrontation de lames compatibles** entre profils MGR. Une collision ordinaire, un échange simultané et un clash cinématique restent trois résolutions différentes. La seule simultanéité visuelle ne déclenche rien : il faut un contact réel des zones autorisées, une fenêtre de simulation, l’orientation, la distance et des participants disponibles.

Chaque engagement ne déclenche qu’un clash. La fréquence et la durée maximale sont bornées ; un impact multiple ne relance pas la scène. Définir une priorité indépendante du côté joueur pour les pièges, projectiles et soutiens qui touchent au même pas.

Le profil histoire peut proposer un QTE bref avec aides. Le versus spectacle annonce une règle commune ; le profil normalisé utilise une résolution sans QTE tant qu’une règle partagée n’est pas établie. Les fiches couvrent réussite, échec, égalité, absence d’entrée, déconnexion et sortie. Une version sans QTE doit exister et un mode réduit conserve tous les signaux. Aucune implémentation de ce nouveau système de clash n’est revendiquée en P71.

### Entités et objets

Une entité native appartient au moveset d’une incarnation ; elle ne consomme pas automatiquement un slot de roster. À l’inverse, `core__blade_wolf` est un UID de combattant et ne devient pas silencieusement une possession de `core__raiden`. Toute utilisation comme soutien possède une fiche et une disponibilité de partenaire.

Le contrat d’entité conserve : identifiant d’instance, propriétaire stable, version, famille, commande, position, orientation, ressource, limites de présence, collision, cibles, interruption, destruction et durée. Il précise si le propriétaire peut agir simultanément. La propriété par slot du moteur hérité nécessite un traitement particulier avant un tag réel : changer d’UID actif ne doit pas transférer les dommages et récompenses des objets déjà posés.

| Raccordement existant | Besoin à concevoir | Ce que la source ne valide pas |
|---|---|---|
| `core__monsoon` | États des segments, attaques, regroupement, interruption, hitbox et ressource | La description officielle de segmentation n’établit pas toutes les règles d’invulnérabilité du versus. |
| `core__mistral` et `asset:p69:mgr-mistral-collar-concept` | Ancrages et pièces adaptées à la version retenue | Le concept de collier ne prouve pas la totalité du kit final ni une animation. |
| `prop:survive_machine_gun_turret` | Pose, ciblage, budget, activation, limite de portée, interruption et fin de vie | Le PNG P66 ne constitue pas une tourelle jouable. |
| `prop:survive_oil_trap`, `prop:survive_flame_trap` | Armement, déclenchement, contre-jeu, réaction à KO et reset | Les sources fixes ne prouvent aucun dommage ni collision. |
| `prop:survive_balloon_trap` | Déploiement, capture compatible, lien visuel et récupération | Aucun comportement d’extraction universel n’est déduit du dessin. |
| `prop:survive_air_shock_cannon` | Annonce, action, états visuels, cible et récupération | Le déployé inactif P69 ne produit pas à lui seul la poussée. |
| Projectiles et fumée déjà documentés | Création, trajet, réflexion, effet, propriétaire après réflexion | Corps, trajet et impact sont des assets séparés ; la fumée ne remplace pas un corps d’obus. |

Voir les [associations P66](asset-associations-p66.json), [P68](asset-associations-p68.json) et [P69](asset-associations-p69.json). À chaque entrée en réserve, KO, transformation, changement de zone, fin de manche ou cinématique, appliquer une politique déclarée : poursuivre, retirer, rappeler ou convertir. Les budgets d’objets et de soutien sont testés ensemble. Un réglage graphique réduit les particules décoratives, pas les projectiles dangereux.

## 6. Stages bonus, récits et espace de déblocage — sections 42–44

Ces épreuves sont **conçues**. Elles ne sont pas ajoutées comme nouveaux modes jouables par la seule présence de cette bible. Chaque fiche doit fixer un objectif, une durée, une condition d’échec, les ressources d’entrée, le score, la récompense, la sauvegarde et la sortie vers le chapitre. Un bonus facultatif raté peut laisser continuer ; une mission indispensable possède sa propre reprise.

| Fiche | UID / périmètre relié | Proposition et critère |
|---|---|---|
| `CQC-P71-BONUS-CQC` | `core__snake`, `core__boss` ; entraînement | Réponses défensives contre cibles d’exercice ; identifier une parade réussie sans transformer un dialogue d’entraînement en scène canonique. |
| `CQC-P71-BONUS-ACID` | `core__snake_acid`, `core__teliko` ; `stage:acid_far_b3f` | Coordination de deux objectifs d’exercice ; les ressources et relais temps réel sont une adaptation. Le fragment de décor P66 reste à convertir en sol/collisions. |
| `CQC-P71-BONUS-ACID2` | `core__snake_acid2`, `core__venus` ; `stage:acid2_terminal` | Sécurisation d’un passage avec outils propres à l’opus ; topologie et contexte à qualifier avant réalisation. |
| `CQC-P71-BONUS-SURVIVE` | `archive__captain`, `archive__reeve` ; Digger, pièges, tourelle | Défense d’un objectif contre vagues bornées ; visibilité des apparitions, budget d’ennemis et sortie accessibles. Les faibles PV sont un réglage du scénario, pas une nouvelle vérité de lore. |
| `CQC-P71-BONUS-MGR` | `core__raiden`, `core__sam` | Destruction contrôlée de cibles mécaniques d’exercice ; états de destruction lisibles, morphologies et ressources adaptées. |
| `CQC-P71-BONUS-TPP` | `core__venom`, `core__quiet` | Couverture d’une extraction dans un chapitre compatible ; partenaire présent et lignes de tir vérifiées. |

La matrice narrative distingue alliance attestée, temporaire, plausible, alternative et incompatible. Une scène collective situe période, costumes, motivations et connaissances. Les voies individuelles et la campagne commune restent séparées ; les plans d’intro, rivalité et épilogue restent distincts.

### Archives classifiées

**« Archives classifiées » est une interface originale CQC**, adaptée au vocabulaire militaire et au Codec. Son existence n’est pas affirmée comme lieu officiel des jeux. La tranche P71 est une page de dossiers ; elle ne doit pas être décrite comme une base parcourable ou une Krypt 3D déjà réalisée.

La cible exploratoire ultérieure peut relier index d’opérations, casiers d’équipement, destinations et dossiers narratifs. Les portes, clés et connexions devront former un graphe cohérent. Aucun accès ne doit exiger la récompense qu’il ouvre. L’ouverture d’un dossier, le déblocage d’un costume et une rencontre de campagne sont trois événements distincts.

## 7. Modèle d’accès et langage visuel — sections 50–58

### Quatre axes indépendants

| Axe | États du contrat | Conséquence |
|---|---|---|
| Découverte | Secret, indice/silhouette, identifié | Détermine les informations autorisées, sans accorder un droit de sélection. |
| Droit | Aucun, à réclamer, permanent, temporaire actif, vérification en attente, expiré/retiré | Dépend des sources d’acquisition ; un booléen unique ne suffit pas. |
| Disponibilité technique | Installé et compatible, installation requise, indisponible/erreur | Un fichier manquant ne devient pas une condition commerciale ou un succès à gagner. |
| Compatibilité | Autorisé ou interdit dans le mode, le chapitre et la composition | Un contenu acquis peut ne pas convenir à cette scène ou à cette équipe. |

La présentation donne la prochaine action utile et conserve les autres motifs consultables. Exemples : « Acquis — installation nécessaire », « Costume acquis — personnage requis », « Indisponible dans ce chapitre ». Un asset encore en production reste identifié comme tel dans l’Atelier ; un verrou n’est pas un substitut à son fichier.

### Charte MGS proposée

Le verrou prend la forme d’un **dossier classifié**, avec cadenas/autorisation et texte contrasté. Personnage : portrait masqué ; costume : fiche d’équipement ; stage : coordonnées/destination ; mode : dossier d’opération. Le cadre de focus reste visible sur fond noir. La métaphore est une direction UI originale, pas un nouvel objet canonique attribué à une organisation réelle de l’univers.

Une identité réellement secrète utilise un dossier neutre : même une silhouette peut la révéler. Nom, image, voix, biographie, texte accessible, notification et infobulle suivent le même niveau de découverte. Le focus est possible sur le verrou ; la confirmation ouvre ses conditions, sans sélectionner le contenu refusé.

États visuels à produire selon le contenu : repos verrouillé, focus, refus informatif bref, récompense prête, ouverture/révélation, désélection et variante à mouvement réduit. Les conditions restent lisibles sans animation ni son. Une récompense est enregistrée avant la scène d’ouverture et reste acquise si celle-ci est abrégée.

### Personnages, costumes, stages et modes

Les compagnons et objets indispensables au kit d’un personnage ne sont pas séparément verrouillés. Un partenaire du roster peut avoir son propre droit ; la compatibilité d’une paire et la découverte de son finisher restent encore d’autres états. Un prêt scénarisé dans un chapitre ne vaut pas nécessairement acquisition permanente du personnage.

Le costume cosmétique conserve statistiques, commandes, timings et collisions. Une arme ou morphologie modifiant le kit appelle une variante explicite. Un costume acquis avant son personnage est conservé et expliqué. Les presets de Captain et les costumes d’autres périodes conservent leurs limites narratives.

L’accès d’un stage distingue base, ambiance, interactions, transitions et scène narrative. Les versions statiques/réduites de confort ne sont pas conditionnées à un soutien. Une destination de transition doit être chargée pour tous les participants autorisés avant le match. Les règles de compétition et de participation sont communes, même si la sélection d’un habillage possède une voie d’acquisition différente.

Les modes avancés peuvent recevoir des conditions explicites, sans bloquer réglages, apprentissage ni accès déjà acquis. Le graphe de conditions interdit les cycles directs ou indirects. P71 **n’ajoute aucun verrou au roster, aux costumes, aux stages ni aux modes historiques** : la première tranche accorde uniquement trois nouveaux dossiers documentaires.

### Conditions et attribution

Chaque règle garde un identifiant stable, le contenu accordé, la portée du profil, l’autorité et l’événement de validation. Les branches **ET / OU** sont présentées telles qu’elles sont calculées. Une voie gratuite OU une voie de soutien ne devient jamais une obligation de faire les deux.

Conserver chaque source d’accès indépendamment : défi, progression, attribution antérieure ou droit externe. Une source permanente valide suffit si le catalogue exprime un OU. Réclamer deux fois, recharger après interruption ou recevoir deux événements identiques ne doit ni doubler un coût ni multiplier une récompense. La rétroactivité se limite aux événements réellement conservés dans les sauvegardes.

## 8. Tranche locale P71 et limites — sections 51, 57, 58, 63–64

Le parcours P71 est accessible depuis l’Atelier et l’Atlas, dans **Archives classifiées**. Il comporte trois récompenses originales de suivi ; il ne redéfinit pas le canon et ne fournit aucun avantage de combat.

| Dossier | Condition issue du jeu existant | Nature de la récompense |
|---|---|---|
| Parcours Chroniques | Parcours terminé avec huit victoires, confirmé par la sauvegarde Chroniques validée | Dossier de suivi original, permanent sur le profil local. |
| Survie | Record d’au moins trois duels gagnés dans la survie existante | Dossier de suivi original, permanent sur le profil local. |
| Relais | Victoire d’un relais 3v3 **OU** 5v5 | Dossier de suivi original, permanent sur le profil local. |

Les choix d’obtention ci-dessus sont des règles CQC. Ils n’affirment pas que Snake a réellement rempli un dossier administratif ou souscrit à un service externe. La page relit la progression existante ; l’attribution ne doit pas réécrire le profil source. Elle sauvegarde ses propres acquisitions, résiste aux demandes répétées et distingue erreur de sauvegarde, absence de progression et incompatibilité.

Les fichiers d’implémentation et les preuves sont raccordés dans [extension-guide-map-p71.json](extension-guide-map-p71.json). Le [rapport runtime P71](../cqc-reprise/pass71/ACCESS_RUNTIME_QA.md) et [son relevé de tests](../cqc-reprise/pass71/access-runtime-qa.json) établissent **30 tests réussis : 20 de logique et de liaison, 10 parcours DOM avec jsdom**. La suite utilise le cœur Chroniques et les callbacks Operations réellement présents ; elle vérifie les conditions, les acquisitions, le secret, les pannes et la conservation du focus lors des reconstructions. **Zéro scénario Chromium exécuté** : le [blocage du navigateur](../cqc-reprise/pass71/access-browser-attempt.json) laisse le rendu desktop/mobile, la navigation physique, le mouvement réduit et la concurrence réelle entre onglets à vérifier. Cette annexe ne transforme pas les preuves locales en certification de tout le système décrit aux sections 50–67.

Les acquisitions sont sauvegardées automatiquement dans ce navigateur. L’API existante d’export/import reconnaît le préfixe des nouvelles clés, mais aucun parcours visible de sauvegarde/restauration n’a été établi dans le menu actuel. L’interface ne promet donc pas ce parcours. La revue indépendante a confirmé les messages d’activité vers les modules enregistrés et corrigé deux défauts : perte du focus après chargement asynchrone, puis consigne de restauration inaccessible. Les contrôles documentaires et cette revue sont conservés dans [la vérification P71](guide-integration-verification-p71.json).

## 9. Soutiens, abonnement, hors ligne et multijoueur — sections 59–62

La possibilité d’avantages de soutien est retenue **en conception**. Aucun paiement, offre commerciale, compte Patreon, OAuth ni droit abonné opérationnel n’est créé par P71. Aucun flag local ne représente une preuve d’abonnement. L’absence de fournisseur et de service de confiance est une dépendance d’implémentation, pas un motif de retirer les récompenses locales.

Trois modèles sont documentés séparément : récompense permanente, catalogue temporaire, livraison par période. Chaque avantage devra préciser identifiant, source, périmètre, durée connue, contenu, alternatives, dépendances et politique d’expiration. Le modèle choisi n’accorde aucun statut canonique à un skin original.

L’adaptateur externe devra employer le parcours d’autorisation officiel, conserver les secrets hors du client public, vérifier les événements, traiter doublons et ordre d’arrivée, puis réconcilier avec une source autoritative. Un compte lié, une vérification en attente et un avantage confirmé restent distincts. Les détails actuels du fournisseur doivent être revérifiés dans sa [documentation officielle](https://docs.patreon.com/) au moment de l’implémentation ; les références du guide sont conservées comme sources datées.

L’expiration retire seulement la source temporaire concernée. Une acquisition permanente obtenue autrement reste valide. Une panne ne signifie pas « abonnement terminé » ; une annulation n’impose pas de révocation avant la fin effective du droit. Préférences, découverte, progression et sauvegardes restent conservées. Le traitement du remboursement, de la déliaison et du changement de compte se fait par source identifiée.

Une partie autorisée garde sa configuration jusqu’au résultat ; le prochain lancement applique les changements annoncés. Les quatre autorisations voir, sélectionner, participer et s’entraîner sont séparées. Le droit de sélection d’un stage n’accorde pas automatiquement sa propriété à l’adversaire. Les replays doivent conserver versions et références ; leur lecture n’est pas conditionnée arbitrairement à l’abonnement actuel de l’auteur. Ces parcours réseau restent différés avec le réseau CQC.

## 10. Production, fiches et ordre de réalisation — sections 45–49 et 64–67

Les fiches de l’extension ne remplacent pas les dix types historiques de [FICHES_ET_VALIDATION.md](FICHES_ET_VALIDATION.md). Elles ajoutent taunt, cycle de sélection, profil d’équipe, assistance/relais, scène collective, clash, entité, bonus, lieu de déblocage, condition/récompense, ainsi que les six fiches d’accès de la section 65.

Champs obligatoires communs : **ID, UID/version/période, source, statut de lore, conditions, commande, ressources, états, morphologies, ancrages, chemin des assets, scope d’implémentation, test et preuve**. Tout champ non établi reste explicitement à qualifier, avec la preuve à obtenir. Les noms nouveaux de cette annexe sont des identifiants documentaires et ne deviennent pas automatiquement des IDs runtime.

Une animation à produire conserve entrée, pose, sortie, interruption, points d’émission et raccord au contrôle. Les sujets autonomes restent séparés par image source ; une illustration collective ou un storyboard peut contenir plusieurs acteurs, sans être compté comme plusieurs sprites. La source, le fichier intégré et l’atlas technique sont reliés. Contrôler les côtés anatomiques, prothèses, armes, mains, ligne de sol et changement d’orientation.

Ordre de réalisation retenu :

1. Conserver les trois originaux, l’adaptation et les preuves de l’existant.
2. Livrer la petite tranche des dossiers locaux et vérifier progression, droits, sauvegarde, clavier et mouvement réduit.
3. Préparer les poses et cycles d’un taunt et d’une sélection/désélection sur un UID pilote.
4. Prototyper une assistance et un relais réel avec ressource et propriétaire stables ; conserver le mode de relais successif.
5. Valider une paire prioritaire, un objet persistant et leurs collisions avant une super duo.
6. Produire une conclusion conditionnelle, un clash et un bonus représentatifs, avec leurs replis.
7. Étendre les personnages et les scènes selon les références, sans multiplier des combinaisons non justifiées.
8. Ajouter les services externes uniquement lorsqu’un fournisseur, un backend, des règles d’avantage et leurs validations existent.

Pour un roster de N membres, les paires exclusives ne sont pas toutes promises : N×(N−1)/2 paires non ordonnées, davantage avec rôles, périodes et costumes. Priorité aux relations attestées et aux scènes du récit ; les autres reçoivent un générique qualifié ou aucune technique commune annoncée.

### Six fiches d’accès appliquées à CQC

**Fiche A — contenu et slot : `report01`.** Catégorie : dossier de parcours original CQC, titre révélé « Mémoire d’une opération ». Il ne correspond à aucun combattant supplémentaire. Avant découverte : dossier neutre, puis indice ; son nom et son texte ne deviennent visibles qu’au niveau autorisé. La source est le parcours Chroniques local. L’action est d’ouvrir les Chroniques, réclamer si les conditions sont remplies, puis consulter si le document est installé et le contexte `archives` compatible. La source du texte est `public/cqc/data/cqc-p71-access-dossiers.json` ; le symbole de dossier appartient à l’UI. Aucune silhouette officielle ni animation de combattant n’est produite par cette fiche.

**Fiche B — règle : `report03:local-v1`.** Contenu accordé : `report03`, « Passage de témoin ». Expression exacte : `relay3Wins >= 1 OR relay5Wins >= 1`, depuis `cqc-v048-operations-profile`. Périmètre : profil navigateur local ; autorité déclarée : `local-progression` ; attribution : réclamation d’une récompense permanente, sans coût. Une seconde demande conserve la même attribution. La rétroactivité se limite aux compteurs existants ; il n’est pas nécessaire de gagner les deux formats. Une source illisible donne un état inconnu, pas une victoire inventée.

**Fiche C — avantage de soutien futur.** Décision : possibilité retenue, intégration différée. Fournisseur opérationnel, campagne, niveaux, prix et identifiants d’avantage : **non établis**, aucun identifiant externe de remplissage. Avant réalisation, choisir pour chaque contenu permanent/temporaire/par période, événement admissible, essais/cadeaux, portée des lots antérieurs, alternatives, transfert, fin d’accès et remboursement. Lier ensuite au catalogue par ID stable et à un service de confiance. La fiche ne crée pas une offre commerciale. Le client P71 ne stocke ni secret fournisseur ni preuve d’abonnement ; ses checksums servent à détecter une écriture locale endommagée, pas à authentifier un paiement ou empêcher la triche.

**Fiche D — charte des verrous.** Direction : dossier militaire/Codec original compatible. Secret : dossier neutre ; indice : dossier repéré ; identifié : titre et aperçu autorisés. Récompense prête : action « réclamer » ; acquis : action de consultation ; fichier absent : information d’installation ; contexte incompatible : motif consultable. Contraste, focus et texte portent l’état, sans couleur ni son obligatoires. Les silhouettes de personnages/costumes et miniatures de destinations constituent une étape de production séparée ; la page de dossiers P71 ne prétend pas les avoir réalisées. Le mode réduit conserve le même contenu lisible.

**Fiche E — scénario futur de stage spécial.** Périmètre de référence : `stage:acid2_terminal`, déjà relié à une source P66 ; aucun droit de soutien n’y est ajouté. Statut : cas de conception pour un futur habillage compatible, pas une arène nouvellement admise. Avant un éventuel accès spécial : fixer le stage runtime final, ses dimensions, les assets distribués, qui le choisit, qui peut participer, l’accès d’entraînement, la liste compétitive et les destinations liées. La présentation statique doit rester accessible ; le match ne change pas de terrain à l’expiration d’un droit. Sans ces preuves, conserver la source dans l’Atlas et proposer un stage commun réellement disponible.

**Fiche F — matrice locale des droits.** Les axes ci-dessous correspondent aux valeurs du moteur P71. Ce sont des cas d’acceptation ; les contrôles locaux exécutés sont reliés au [rapport de tests](../cqc-reprise/pass71/ACCESS_RUNTIME_QA.md). Leur portée reste limitée aux trois dossiers.

| Profil et contexte | Découverte / droit | Technique / compatibilité | Résultat attendu |
|---|---|---|---|
| Aucun progrès, secrets masqués | `secret` / `none` | `ready` / `allowed` | Dossier neutre, condition consultable, aucune sélection. |
| Progrès partiel | `hint` / `none` | `ready` / `allowed` | Indice sans identité complète, progression et activité utile. |
| Condition remplie, jamais réclamé | `identified` / `claimable` | `ready` / `allowed` | Réclamation autorisée ; consultation seulement après acquisition. |
| Acquisition permanente, fichier présent | `identified` / `permanent` | `ready` / `allowed` | Consultation autorisée, attribution unique après réouverture. |
| Acquisition permanente, fichier absent | `identified` / `permanent` | `missing` / `allowed` | Acquisition conservée, consultation indisponible avec motif technique. |
| Acquisition permanente, autre contexte | `identified` / `permanent` | `ready` / `incompatible` | Droit conservé, aucune sélection dans ce contexte. |
| Progression illisible, aucune acquisition | Selon les indices fiables / `pending` | État réel / contexte réel | Pas de faux succès ; action de récupération/réessai explicite. |
| Progression illisible, acquisition déjà validée | `identified` / `permanent` | État réel / contexte réel | La récompense permanente n’est pas retirée par la panne de relecture. |

Les temporaires et remboursements de sources externes n’apparaissent pas dans cette matrice locale comme fonctionnalités présentes : leurs scénarios restent dans le backlog 19–21.

## 11. Backlog vérifiable

Les identifiants ci-dessous sont repris dans le registre JSON. Les contrôles documentaires 01–02 sont exécutés. Les contrôles 13–18 portent sur la tranche locale ; 22 couvre les parcours DOM et la conservation du focus, avec rendu navigateur toujours bloqué ; 23 couvre la conservation des profils sources et l’absence de nouveau verrou dans cette tranche. Les scopes de sélection complète, de catalogue global et de rendu restent ouverts. Un test prévu reste à exécuter tant qu’aucun rapport n’est lié. Les tests des dossiers P71 ne valident pas les systèmes d’équipe, les nouveaux combats ni les sprites.

| ID | Scénario / résultat attendu | Périmètre |
|---|---|---|
| `P71-QA-01` | Trois originaux : taille, SHA et égalité ; guide général inchangé | Documentaire |
| `P71-QA-02` | 38 sections uniques, 114 exigences et tous les chemins/UID liés résolus | Documentaire |
| `P71-QA-03` | Navigation rapide, confirmation/désélection : aucun aperçu, effet ou son obsolète | Futur cycle de sélection |
| `P71-QA-04` | Taunt interrompu, ressources et retour au contrôle conformes | Futur cycle de taunt |
| `P71-QA-05` | Assistance + tag + super simultanés : un engagement et une dépense autorisés | Futur système d’équipe |
| `P71-QA-06` | Réserve touchée/KO, relève automatique, munitions et combo conservés | Futur système d’équipe |
| `P71-QA-07` | Super gardée/ratée : résolution courte ; aucun partenaire dupliqué | Futures supers |
| `P71-QA-08` | Fin dramatique incompatible : repli, résultat et sortie inchangés | Futures conclusions |
| `P71-QA-09` | Clash avec tiers : ordre stable ; réussite/échec/égalité/absence et sans QTE | Futurs clashes |
| `P71-QA-10` | Objet après tag, KO, transformation et transition : propriétaire et état corrects | Futures équipes/entités |
| `P71-QA-11` | Boucles piège/assistance/relais : limite de combo et réponse adverse | Futur équilibrage |
| `P71-QA-12` | Bonus réussi/raté : bonne suite, récompense unique, reprise et budget d’ennemis | Futurs bonus |
| `P71-QA-13` | Secret : aucune fuite de nom, image, voix, texte accessible ou notification | Accès / future sélection |
| `P71-QA-14` | Conditions ET/OU et dossiers : mêmes conditions affichées et calculées | Tranche locale P71 |
| `P71-QA-15` | Chroniques valide, record survie et relais 3v3/5v5 : seule progression admissible compte | Tranche locale P71 |
| `P71-QA-16` | Réclamer deux fois ou rouvrir : acquisition unique ; profils sources inchangés | Tranche locale P71 |
| `P71-QA-17` | Sauvegarde invalide/indisponible : retour explicite, aucun faux succès ni effacement | Tranche locale P71 |
| `P71-QA-18` | Droit, installation et mode : motif exact, sans faux verrou de paiement | Moteur quatre axes |
| `P71-QA-19` | Costume acquis avant personnage ; permanente + temporaire expirée : acquis conservé | Futur catalogue étendu |
| `P71-QA-20` | Abonnement annulé/panne/événements désordonnés : décision par source vérifiée | Service externe différé |
| `P71-QA-21` | Transition de stage, adversaire sans droit et expiration en match : partie cohérente | Réseau différé |
| `P71-QA-22` | Clavier, focus, contraste, état textuel, mouvement réduit et écran étroit | Tranche locale P71 / extension future |
| `P71-QA-23` | Migration : aucun ancien personnage, costume, mode ni progrès nouvellement retiré | Tranche locale P71 |
| `P71-QA-24` | Sources fixes : un sujet, cadrage, alpha, asymétrie, ancrage et référence | Production visuelle future |

## 12. Correspondance des sections 30–67

| Section | Application dans cette annexe | Statut de portée |
|---:|---|---|
| 30 | Sources, raccordement et différences entre assistance/tag/entité | Documenté |
| 31 | Contrat de taunt et huit fiches de personnalité | Conception ; buff hérité partiel |
| 32 | Automate sélection/désélection et nettoyage des aperçus | Conception |
| 33 | Duel, relais successif, assistance et hybride | Conception ; relais successif hérité |
| 34 | Commandes, jauges, engagement et coûts atomiques | Conception |
| 35 | Cycle d’assistance et branches d’interruption | Conception |
| 36 | Formes de tag, contrôle, ressources et combo | Conception ; pas de tag temps réel annoncé |
| 37 | Cinq paires et super à confirmation d’ouverture | Conception |
| 38 | Neutralisation collective, fins conditionnelles et replis | Conception |
| 39 | Contact compatible, règles de clash et profils QTE | Conception |
| 40 | Entités et objets par propriétaire/kit | Conception ; objets hérités partiels |
| 41 | Projectiles, réflexion, états et budgets | Conception ; mécanique héritée partielle |
| 42 | Six fiches de bonus reliées aux UID et périmètres | Conception |
| 43 | Archives classifiées puis cible exploratoire distincte | Tranche de dossiers locale ; exploration différée |
| 44 | Versions, relations et compatibilité de chapitre | Documenté ; pas de nouvelles scènes jouables |
| 45 | Assets individuels, ancrages, cycles et unités de production | Documenté |
| 46 | UI, entraînement, accessibilité, réseau | Tranche UI bornée ; autres systèmes à réaliser |
| 47 | Backlog et preuves par unité | Documenté ; contrôles P71 séparés |
| 48 | Dix fiches complémentaires et champs inconnus | Documenté |
| 49 | Instruction appliquée, liens et sources | Documenté |
| 50 | Périmètre des accès et raccordement sans faux verrous | Documenté |
| 51 | Quatre axes indépendants | Tranche moteur local P71 ; catalogue complet différé |
| 52 | Dossiers classifiés, silhouettes, secret et version réduite | Tranche UI de dossiers ; visuels du roster à produire |
| 53 | Personnage, partenaire, kit natif et sélection aléatoire | Conception, anciens accès conservés |
| 54 | Costumes, dépendances et absence de gain de statistiques | Conception |
| 55 | Stages, confort, destinations et participation | Conception |
| 56 | Modes avancés et graphe de prérequis | Conception, aucun ancien mode verrouillé |
| 57 | ET/OU, événements, portée et rétroactivité bornée | Tranche de trois règles locales P71 |
| 58 | Réclamation, révélation et acquisition unique | Tranche de trois dossiers locaux P71 |
| 59 | Avantages permanents, temporaires ou par période | Conception ; aucune offre créée |
| 60 | Adaptateur de droits externe et secret hors client | Différé, dépendance backend/fournisseur |
| 61 | Expiration, panne, plusieurs sources et hors ligne | Contrat documenté ; service externe différé |
| 62 | Voir/choisir/participer/entraîner et replays | Conception ; réseau différé |
| 63 | Messages, focus, secret, états et animations réduites | Tranche UI locale P71 ; extension roster future |
| 64 | Catalogue, acquisitions, sauvegarde et validation | Tranche locale P71 ; global à étendre |
| 65 | Six fiches d’accès et matrice de droits | Documenté ; trois dossiers concrets en P71 |
| 66 | Intégration complète des deux textes et statuts explicites | Documenté |
| 67 | Références datées, vocabulaire et séparation faits/design | Documenté |

## 13. Références de cette adaptation

Les sources primaires suivantes ont été consultées le **27 novembre 2026** pour borner les faits. Les gestes, scènes, récompenses et noms nouveaux restent des propositions CQC. Les chemins de code sont ceux du dépôt ; les liens externes ne remplacent pas les références visuelles exactes nécessaires à chaque sprite.

- **P71-S01 — KONAMI, AC!D Link Battle** : [page officielle](https://www.konami.com/mg/archive/mga/english/link_battle.html). Atteste l’équipe Snake/Teliko et les règles du mode d’origine ; pas de frame data de combat 2D.
- **P71-S02 — KONAMI, MGSV Freedom of Infiltration** : [présentation officielle](https://www.konami.com/games/us/en/topics/53/). Atteste le soutien de Quiet et les actions coordonnées ; les jauges et chorégraphies CQC restent adaptées.
- **P71-S03 — KONAMI, personnages de Revengeance** : [référentiel officiel](https://www.konami.com/mg/archive/mgr/jp/characters/). Identités et capacités décrites pour Raiden, Blade Wolf, Sam, Monsoon, Mistral et Sundowner ; ne certifie pas nos animations.
- **P71-S04 — KONAMI, Metal Gear Survive** : [présentation officielle](https://www.konami.com/games/eu/en/products/mg_survive/). Continuité alternative et coopération ; les bonus CQC restent originaux.
- **P71-S05 — KONAMI, support Survive** : [fiche officielle](https://eu-support.konami.com/hc/en-gb/articles/9649242319127-Metal-Gear-Survive). Récit, défense, placement et contexte de survie ; disponibilité des personnages à qualifier par scène.
- **Sources historiques P62** : [sources-narrative.json](sources-narrative.json), [COMBAT.md](COMBAT.md), [runtime-evidence.json](runtime-evidence.json). Dates et périmètres de lecture historiques conservés.
- **Sources utilisateur P71** : les trois originaux et [leur provenance](sources/provenance-p71.json). Les références Patreon et des autres jeux citées par les guides conservent leur portée d’inspiration et leur date ; elles ne constituent pas une intégration active à CQC.

La matrice [extension-guide-map-p71.json](extension-guide-map-p71.json) reste la liste des décisions et critères. Le rapport de validation du lot indique séparément les contrôles réellement passés, les fichiers générés, les éventuelles limites de navigateur et le commit publié. Aucune fusion, mise en production ou certification absolue n’est déduite d’une simple présence en PR.
