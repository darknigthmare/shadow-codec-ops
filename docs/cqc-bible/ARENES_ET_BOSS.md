# Arènes, transitions et boss — Bible CQC

Version de travail : P62, 25 novembre 2026. Référence du dépôt examinée : `5c2cbed73f15c4583f5ffd2cee0c2344180b5d68`.

Ce chapitre applique les sections 11, 13–16, 18, 22, 25–27 du [guide commun](sources/Combat_Games_Guide_General_v1.0.txt). Il complète la conception pendant la phase de production des sources fixes. Les propositions ci-dessous n’attestent pas une fonctionnalité intégrée. Le lot P62 apporte cinq décors statiques, associés à quatre périmètres historiques ; aucun n’est admis au runtime par ce lot. Les prompts, références, empreintes et limites sont conservés dans le [manifeste des décors P62](../cqc-reprise/pass62/batches/stages-continuation.json).

## 1. Contrat de fidélité et état observé

Un lieu peut être attesté dans un jeu tout en recevant une composition latérale adaptée à CQC. La fidélité de son identité, la géométrie de collision, sa présentation et ses fonctions de gameplay sont quatre contrôles distincts. Une source peinte seule ne valide aucune collision, interaction, transition ou rencontre.

Les catalogues existants utilisent notamment un repère logique de 1280 × 720 avec un sol à 568 ; cela ne définit pas automatiquement les ancrages d’un nouveau PNG de 1672 × 941. Le futur raccord doit être mesuré dans le renderer, sans réencoder l’original. Les états `approved` / `accepted_closest` des anciens catalogues décrivent leur admission existante ; ils ne constituent pas un certificat absolu 1:1. [R01][R02]

L’audit du code distingue deux situations :

- Les stages P53–P58 disposent de rendu et de plans de présentation. P58 précise que dessiner son décor ne change pas les collisions. Aucune transition entre zones ou interaction avec un objet n’est déduite de l’apparence de ces plans. [R03]
- Le module Arsenal possède un moteur de rencontres avec création d’état, parties destructibles, conditions de déverrouillage, attaques planifiées et modes `combat` / `practice`. Détruire un sous-système retire aussi les attaques déjà annoncées et les projectiles ennemis rattachés à ce sous-système. Cela ne prouve pas que les mêmes règles existent dans le versus standard. [R04]

### Noms et identifiants

| Champ | Rôle | Exemple |
|---|---|---|
| `workId` historique | Périmètre d’inventaire, parfois plusieurs lieux | `stage:mgs3_zaozyorje_wig` |
| `sourceId` | Image source unitaire, avec son fichier | `mgs3-wig-interior` |
| ID de stage admis | Clé réellement déclarée par un catalogue/registre existant | `p18_mgs3_pont_shagohod` |
| ID Arsenal | Rencontre du moteur Arsenal | `rex`, `shagohod`, `sahel` |
| ID de modèle articulé | Version visuelle précise de la machine | `rex_mgs1_ps1` |
| ID `proposed:*` | Proposition documentaire, non enregistrée au runtime | `proposed:cqc_stage_mgs4_crescent_meridian` |

La référence au WIG et à Zaozyorje dans un même `workId` n’autorise pas à fusionner leurs décors, leurs périodes de combat ou leurs règles. [R05]

## 2. Exigences retenues et critères

Les IDs de ce chapitre complètent les exigences centrales de la bible ; ils ne les remplacent pas.

| ID | Priorité et décision | Exigence | Critère de validation |
|---|---|---|---|
| CQC-ARE-01 | P0 — retenue | Une identité de lieu, un épisode et une portion couverte par source | Référence exploitable, `sourceId`, `workIds`, fichier, limitations et empreinte présents |
| CQC-ARE-02 | P0 — retenue | Sol, limites, échelle et lisibilité indépendants de la peinture | Deux gabarits extrêmes restent ancrés au sol ; pieds, garde et annonces ne disparaissent pas derrière le décor |
| CQC-ARE-03 | P1 — retenue, implémentation différée | Quatre axes configurables indépendants | Changer seulement la présentation conserve collisions, résultats, timers et possibilités de réponse |
| CQC-ARE-04 | P1 — retenue, implémentation différée | Chaque interaction a une fiche et une capacité d’accès | Commande, portée, coût, récupération, usage restant, réponse adverse et état final définis |
| CQC-ARE-05 | P1 — retenue, implémentation différée | Chaque danger est annoncé de plusieurs façons | Une annonce reste visible sans animation de fond, sans dépendre uniquement d’une couleur ou d’un son |
| CQC-ARE-06 | P1 — retenue, implémentation différée | Une transition rejoint une zone chargée et jouable | Destination admise, états transférés, cas KO/simultané/interruption et retour au contrôle vérifiés |
| CQC-ARE-07 | P0 — retenue | Original, adaptation et création compatible restent identifiables | Aucun agencement latéral, objet jouable ou nom conçu pour CQC n’est présenté comme une carte originale exacte |
| CQC-ARE-08 | P0 — retenue | Sources fixes et runtime sont comptés séparément | Le bilan donne sources produites, contrôlées, admises et testées avec le même périmètre |
| CQC-BOS-01 | P1 — retenue | Une fiche par boss et par incarnation | IDs du moteur et de l’art, phases, signaux, réponses, victoire et reprise explicités |
| CQC-BOS-02 | P0 — retenue | Toute famille de combattants autorisée dispose d’une réponse | Aucune rencontre ne démarre avec un kit incapable de progresser ; règles des équipements de mission explicites |
| CQC-BOS-03 | P1 — retenue | Échelle et capacités conservées, adaptation de combat documentée | Aucun boss géant n’est réduit à un humanoïde saisissable sans justification ; vulnérabilités visibles et atteignables |
| CQC-BOS-04 | P1 — retenue, extension différée | Boss Rush possède une règle de continuité propre | Ordre, ressources conservées, récupération, essais, reprise et récompenses déterminés puis testés |
| CQC-BOS-05 | P0 — retenue | Destruction et annonces restent cohérentes | Aucune attaque d’une pièce détruite ne survit par erreur ; état visuel, collision et journal d’événements concordent |

## 3. Les quatre axes des arènes

| Axe | Valeurs proposées | Ce qu’il change | Ce qu’il faut suivre séparément |
|---|---|---|---|
| Présentation | Statique / réduite / animée | Mouvement de fond, parallaxe, météo visuelle, secousses | Lisibilité, coût de rendu ; pas d’effet de gameplay implicite |
| Interactions | Désactivées / liste explicite d’objets | Actions volontaires sur un objet ou point d’accès | Capacités, commandes, états, charges et récupération |
| Dangers | Désactivés / liste explicite d’événements | Vie, position, ressources ou état d’un combattant | Déclencheur, annonce, réponse, collision, rythme et aléatoire |
| Transitions | Aucune / narrative / passage jouable documenté | Changement de zone ou de rencontre | Destinations, chargement, états transportés, chrono et contrôle |

**Profil de production P62 :** présentation statique, aucun objet interactif livré, aucun danger livré, aucune transition livrée. Les barils, caisses, portes, passages et trappes peints sont des éléments visuels. Leur présence dans un PNG ne leur donne aucune propriété de jeu.

**Profil Compétition proposé :** règles stables annoncées avant le match ; interactions, dangers et transitions désactivés tant que leurs fiches ne sont pas admises. Un effet de confort local conserve toute information utile.

**Profil Spectacle/Campagne proposé :** les mêmes quatre axes sont choisis explicitement pour chaque rencontre. Une activité en fond peut rester neutre. Une présentation statique peut conserver un danger uniquement si son annonce statique transmet les mêmes informations.

**Profil Confort/Performance proposé :** réduction des mouvements, particules et secousses ; aucune modification silencieuse de l’aléatoire, du terrain ou de la durée d’une attaque.

## 4. Fiches des cinq décors P62

Les cinq images restent `pending_external_review`, sans certification 1:1 et sans intégration. Leur composition réserve une bande de sol continue ; les limites de combat et les points d’apparition devront être mesurés ultérieurement. [R06]

| Source et périmètre historique | Identité à conserver | Adaptation et étendue réelle | ID de stage proposé |
|---|---|---|---|
| `mgs4-crescent-meridian` — `stage:mgs4_park` | Rue de l’Acte 1, enduits usés, ouvertures et volets, auvents, câbles, arc maçonné | Un tronçon de rue recomposé latéralement ; l’arc, le nombre de travées et les distances ne sont pas certifiés. Le blindé n’est pas peint | `proposed:cqc_stage_mgs4_crescent_meridian` |
| `mgs4-cove-valley-village` — `stage:mgs4_powerstation` | Village de l’Acte 2, grange, porche, pierre/enduit, toits ondulés, pentes végétales | Cour extérieure, sans tous les intérieurs ni la colline d’approche. La vision nocturne n’a servi qu’à vérifier des volumes | `proposed:cqc_stage_mgs4_cove_valley_village` |
| `acid-ruins-upper` — `stage:acid_ruins` | Zone 03B, voies de circulation et conteneurs verts, caisses, barils, garde-corps | Portion des ruines hautes ; pas la grille tactique complète, pas la forêt. Premier essai corrigé et archivé séparément | `proposed:cqc_stage_acid_ruins_upper` |
| `mgs3-zaozyorje-east` — `stage:mgs3_zaozyorje_wig` | Embranchement boisé oriental, gros troncs, terre et roche moussue, feuilles brunes | Clairière élargie pour le duel ; pas le ravin occidental, le lac ou le champ de fleurs | `proposed:cqc_stage_mgs3_zaozyorje_east` |
| `mgs3-wig-interior` — même `workId` historique | Cabine olive à nervures, cloison d’extrémité, porte et ouverture latérale | Intérieur seulement ; largeur, répétition des panneaux et point de vue adaptés. Pas d’extérieur ni d’embarquement | `proposed:cqc_stage_mgs3_wig_interior` |

Les inventaires P61 réservaient précisément ces portions : Millennium Park seulement pour `mgs4_park`, centrale seulement pour `mgs4_powerstation`, Ruins Lower seulement pour `acid_ruins`, ravin occidental seulement pour `mgs3_zaozyorje_wig`. P62 complète ces portions, sans transformer cinq PNG en cinq nouveaux périmètres historiques. La forêt AC!D et l’embarquement au lac restent ouverts. [R05][R06]

### Besoins de présentation pour une phase ultérieure

Chaque décor pourra recevoir une fiche d’animation distincte : poussière discrète à Crescent Meridian, feuillage à Cove Valley, lumière industrielle sobre aux ruines hautes, feuillage à Zaozyorje, lumière et eau au-delà de la trappe du WIG. Ces pistes sont des adaptations de présentation proposées. Elles n’ajoutent ni obstacle, ni dégâts, ni personnage de fond au lot fixe.

Avant une séparation en calques, identifier les occultations nécessaires, les marges de caméra et les surfaces réellement visibles. Les fragments manquants ne doivent pas être repeints automatiquement comme s’ils étaient établis par la référence.

## 5. Connexions cohérentes et destinations

Les parcours des œuvres servent de justification géographique ou narrative. Les modes de déclenchement proposés pour CQC restent des créations de gameplay. Les images P61/P62 citées dans cette table sont des sources, pas des destinations runtime déjà jouables. [R05][V01][V02][V03][V04]

| Liaison documentaire proposée | Origine → destination | Justification et type | Condition préalable |
|---|---|---|---|
| `proposed:cqc_link_crescent_park` | P62 Crescent Meridian → source P61 `mgs4-park` | Suite de l’Acte 1 ; sortie par le passage en hauteur et descente vers Millennium Park. Passage de campagne proposé | Admission séparée des deux zones et du parcours d’arrivée |
| `proposed:cqc_link_cove_powerstation` | P62 village → source P61 `mgs4-powerstation` | Route par la pente vers la centrale. Déplacement narratif entre secteurs, sans prétendre à un mur mitoyen | Étape de déplacement/chargement documentée |
| `proposed:cqc_link_zaozyorje_west_east` | Source P61 `mgs3-zaozyorje` → P62 East | Continuité de l’escorte forestière, avec changement de zone | État d’EVA et objectif de mission conservés si ce système est retenu |
| `proposed:cqc_link_zaozyorje_bereg` | P62 East → stage existant `flower_field` | Suite narrative vers Rokovoj Bereg ; changement de rencontre | Contrôle des versions, de la chronologie et de l’introduction du boss |
| `proposed:cqc_link_bereg_wig` | Fin de rencontre à Rokovoj Bereg → P62 cabine WIG | Extraction et scène ultérieure. Liaison narrative ; aucun lancer ne téléporte directement dans l’avion | Scène intermédiaire et chargement ; quai/lac non livrés par ce lot |
| `proposed:cqc_link_acid_upper_drawbridge` | P62 Upper → stage existant `p18_acid_lobito_passerelle` | Route menant au pont-levis après 03B | Admission du nouveau tronçon et contrôle de l’état du pont |

### Fiche détaillée : passage Crescent Meridian → Millennium Park

**ID :** `proposed:cqc_link_crescent_park`. **Statut :** conception proposée, intégration et validation absentes. **Modes proposés :** campagne ; désactivé en versus tant qu’aucune variante compétitive n’est conçue.

- **Départ :** sortie de la zone de rue identifiée par le passage en hauteur. Le repère graphique et la zone d’accès doivent appartenir au décor admis, pas être déduits du bord arbitraire du PNG.
- **Déclencheur :** action volontaire après résolution de la rencontre locale. Aucun dommage, aucune dépense de ressource. La commande n’est acceptée que si le personnage n’est plus en attaque, chute, projection, hitstop ou séquence de conclusion.
- **Annonce et réponse :** indication de passage disponible, confirmation par la commande d’interaction commune ; un recul hors de la zone avant validation annule la demande.
- **Destination :** Millennium Park chargé et validé avant l’engagement irréversible. Si le chargement échoue, rester dans la zone actuelle avec contrôle restauré et aucune perte d’état.
- **Chrono et combo :** combat local terminé ; compteur de combo clos ; temps de déplacement narratif séparé du temps du combat. Aucun dégât gratuit de transition.
- **Arrivée :** point sûr mesuré, orientation vers l’aire suivante, vitesse nulle, états d’attaque temporaires purgés. Vie et ressources transférées selon le profil de campagne. Aucun ennemi n’attaque avant le retour du contrôle et l’annonce d’entrée.
- **Caméra :** franchissement bref, remplaçable par une coupe pour le confort ; durée de présentation sans effet sur les règles.
- **Retour :** liaison à sens unique pour ce segment de campagne, réinitialisée au redémarrage du chapitre. Aucune boucle permettant de regagner des ressources.
- **Cas limites :** KO ou objectif perdu avant validation annule le passage ; deux demandes au même pas de simulation produisent une seule transition ; pause et interruption conservent une phase de transition explicite. Coopération et réseau restent différés.
- **Preuve attendue :** essai reproductible de chargement réussi/échoué, KO simultané, demande répétée, pause/reprise et arrivée sans chevauchement de collision. Aucun de ces essais n’a été exécuté dans la phase d’images P62.

Cette fiche ne constitue pas une transition par projection. Une variante qui ferait franchir le passage pendant un combo nécessiterait sa propre fiche de dégâts, défense, caméra et placements.

## 6. Interactions et dangers à concevoir

**`proposed:cqc_interaction_crescent_cover` :** utiliser un abri existant du lieu pour une action de mise à couvert, si le système CQC retenu le permet. Définir la portée, l’entrée, la sortie, le côté protégé et la vulnérabilité. Aucun coffre ou caisse n’est automatiquement ramassable par tout personnage.

**`proposed:cqc_interaction_acid_sensor` :** capteur d’alerte cohérent avec la surveillance de Ruins Upper, proposé pour une mission de campagne. La présence de surveillance dans le jeu de référence ne prouve pas que le nouveau décor contient un capteur utilisable. L’objet, sa source autonome, son annonce, sa désactivation et les réponses autorisées restent à produire/documenter. [V04]

**WIG :** l’ouverture latérale est visuelle dans P62. Aucun ring-out ou chute mortelle n’est implicite. Une variante scénarisée devrait définir une défense, une issue cohérente et une conclusion compatible avec la rencontre, sans forcer la même mise à mort à tous les personnages.

Chaque fiche future doit fournir : propriétaire, point d’ancrage, capacité requise, commande, démarrage/récupération, coût, charges, réponse adverse, état après usage, remise à zéro et compatibilité de profil. Les paramètres initiaux sont des hypothèses de conception, à valider en jeu.

## 7. Trois fiches de boss géants

### Correspondances vérifiées dans le dépôt

| Boss / incarnation | Modèle articulé existant | Autre clé existante | Rencontre Arsenal / scène |
|---|---|---|---|
| REX — MGS1 original | `rex_mgs1_ps1` | Pas de nouvelle clé supposée | `rex` / `rexhangar` |
| Shagohod — MGS3 original | `shagohod_mgs3_ps2_2004` | `engineId: shagohod` | `shagohod` / `runway` |
| Sahelanthropus — MGSV TPP | `sahelanthropus_mgsv2015` | `engineId: sahelanthropus` | `sahel` / `desert` |

Ces identifiants proviennent des catalogues et du module Arsenal. Les noms de scène Arsenal ne sont pas automatiquement des clés du registre général de stages. [R04][R07][R08]

### CQC-BOS-REX-01 — REX, MGS1

**Identité :** REX de MGS1, radôme, cockpit et armement associés à cette incarnation ; ne pas substituer le modèle TTS ou la configuration MGS4. La perte du radôme et l’ouverture du cockpit sont des éléments de la rencontre de référence. [V05]

**Existant observé :** Arsenal propose la chaîne radôme → cockpit ; le cockpit reste soumis à une fenêtre d’exposition. Les valeurs de vie et cette fenêtre sont des paramètres CQC, pas des mesures canoniques. [R04]

**Conception à maintenir/compléter :**

1. Phase de lecture : attaques à distance annoncées ; radôme atteignable avec l’équipement de mission compatible.
2. Changement de phase : destruction lisible du radôme ; interdiction d’un retour visuel au radôme intact ; retrait des attaques réellement liées à la pièce détruite.
3. Phase cockpit : fenêtre de contre-attaque visible, puis protection/reprise du cycle selon les règles retenues.
4. Conclusion : immobilisation du boss et résolution de la rencontre ; aucune projection humaine standard appliquée au corps de la machine.

**Signaux proposés :** acquisition de cible distincte du tir, mouvement du mécanisme avant l’ouverture, indicateur d’exposition conservé en présentation statique. **Réponses :** déplacement, gestion de portée et attaque du point exposé. Tout brouillage ou abri jouable demande une règle explicite.

**Compatibilité :** le test doit inclure petite et grande taille ainsi qu’un utilisateur d’armes à faible portée. Un combattant ne possédant aucune réponse anti-machine n’est pas admis sans équipement de mission ou objectif alternatif documenté ; son kit n’acquiert pas silencieusement un pouvoir.

**Validation :** radôme détruit une seule fois, cockpit intouchable hors fenêtre, aucune attaque survivante d’un sous-système neutralisé, annonce lisible sans secousse, conclusion et reprise déterministes. Statut : source/rencontre antérieures présentes ; nouvelles règles et vérification exhaustive non livrées par P62.

### CQC-BOS-SHAGOHOD-01 — Shagohod, MGS3

**Identité :** machine originale à propulsion par vis et deux unités ; incarnation MGS3 PS2. L’atlas existant porte une qualification de présentation en deux phases et conserve des éléments de rencontre comme Volgin et la protection électrique dans des overlays séparés. Le module avant Delta produit en P61 constitue une autre incarnation et ne remplace pas ce corps. [R08][R05]

**Existant observé :** Arsenal utilise VIS G/VIS D → PROPULSION → CABINE. Cette chaîne est l’adaptation actuelle du moteur Arsenal ; elle n’est pas décrite comme la séquence littérale du combat original. [R04]

**Conception à maintenir/compléter :**

1. Pression mobile : annoncer déplacement/charge et laisser une zone de réponse mesurable.
2. Immobilisation : rendre lisible l’état des vis et la fenêtre de vulnérabilité liée à la propulsion.
3. Dernière phase : conserver l’identité de la cabine et des éventuels overlays de Volgin selon la version de rencontre ; aucune disparition arbitraire des organes.
4. Conclusion : arrêt cohérent du véhicule, contrôle des collisions persistantes et checkpoint de reprise documenté.

**Arène :** scène Arsenal `runway` pour ce moteur. Le stage natif `p18_mgs3_pont_shagohod` est un décor existant distinct ; son nom ne vaut pas raccord automatique au combat. [R02][R04]

**Signaux proposés :** orientation et montée en régime avant la charge ; exposition mécanique distincte d’une simple teinte rouge. **Réponses :** esquive annoncée, choix de distance et attaque de la zone accessible. Le profil de compétition ne reprend pas automatiquement une séquence de poursuite motorisée.

**Validation :** gabarit complet et sens de déplacement cohérents, vis touchables lorsqu’elles le doivent, aucune collision de charge après neutralisation, apparition/disparition des pièces conforme à la phase, caméra conservant la réponse adverse dans le cadre. Statut : conception documentée ; intégration de nouvelles phases non effectuée par P62.

### CQC-BOS-SAHEL-01 — Sahelanthropus, MGSV TPP

**Identité :** modèle longiligne de TPP, armes et organes propres à cette version ; l’arsenal comprend notamment des attaques liées aux archées et un railgun. Le catalogue existant qualifie déjà certains points d’émission et articulations comme adaptations. [R08][V06]

**Existant observé :** Arsenal utilise JAMBE G/JAMBE D/BOUCLIER → TÊTE. Cette condition de déverrouillage est une règle CQC, pas une affirmation sur la totalité des vulnérabilités du jeu original. [R04]

**Conception à maintenir/compléter :**

1. Lecture de la portée : distinguer menace proche, tir distant et progression vers la cible.
2. Neutralisation des protections : destruction annoncée, état conservé, aucun organe détruit réactivé par une boucle d’animation.
3. Cible haute : fenêtre permettant une réponse aux familles de combattants admises ; ne pas exiger un saut impossible ou un tir absent du kit.
4. Conclusion : chute/immobilisation cadrée, sans écraser un joueur après la victoire par un dommage non annoncé.

**Arène :** scène Arsenal `desert`. Le stage natif `p18_tpp_afghanistan_sahelanthropus_canyon` fournit une identité visuelle distincte et exige son propre raccord. Le lot P62 ne crée aucun nouveau Sahelanthropus. [R04][R09]

**Signaux proposés :** charge du railgun et zone menacée distinctes ; annonces des effets d’archées lisibles en profil réduit. **Réponses :** positionnement et défense documentés ; un couvert n’arrête un tir que si sa collision et sa résistance sont définies.

**Validation :** vérifier l’écart entre émetteur logique et émetteur visuel déjà signalé par le catalogue, les cibles hautes, les limites de caméra, les protections détruites et la suppression des attaques qui en dépendent. Statut : source/rencontre antérieures présentes ; nouvelle validation de fidélité et de combat absente de P62.

## 8. Boss Rush géants — périmètre proposé

**ID :** `proposed:cqc_boss_rush_giants_01`. **Décision :** retenir la conception P1 ; extension du runtime différée. **Périmètre initial proposé :** REX MGS1 → Shagohod MGS3 → Sahelanthropus TPP, sélection libre des trois en entraînement.

Ce parcours est un défi CQC hors continuité, pas une campagne canonique réunissant ces époques. Les incarnations, règles d’équipement et options sont affichées avant le départ. La version jouable éventuelle d’un boss possède un équilibrage séparé.

Règles de travail proposées : vie et ressources normalisées au début de chaque rencontre, score et temps cumulés, reprise au début du boss courant, aucune sauvegarde au milieu d’une attaque. Le nombre d’essais et les récompenses restent à décider dans la fiche du mode. Les compteurs différencient abandon, défaite et victoire ; une répétition en entraînement ne valide pas un parcours complet. Coopération et classement restent différés.

Critères : les trois rencontres doivent être terminables avec le profil d’équipement annoncé ; reprise, pause, conclusion et passage au boss suivant doivent être testés. Les modes `combat` / `practice` déjà lus dans Arsenal ne prouvent pas l’existence de ce nouveau parcours.

## 9. État de livraison et contrôles restants

| Étape | Décors P62 | Trois fiches de boss |
|---|---|---|
| Identité et références | Documentées, portions couvertes explicites | Incarnations et IDs existants documentés |
| Conception | Quatre axes, six liaisons proposées, une fiche de passage détaillée | Phases, signaux, réponses, compatibilités, conclusion et critères documentés |
| Sources fixes produites P62 | 5 PNG sélectionnés ; 1 essai corrigé conservé en archive non sélectionnée | 0 nouveau PNG de boss |
| Contrôle effectué | Ouverture visuelle, dimensions et empreintes ; correction des portes AC!D | Lecture des catalogues et des règles Arsenal citées |
| Fidélité absolue 1:1 | Non certifiée | Non certifiée par ce chapitre |
| Intégration P62 | Absente | Aucune nouvelle intégration |
| Tests jouables P62 | Non effectués dans la phase de sources fixes | Non effectués pour les propositions |

Avant admission : revue comparative des détails, mesure des ancrages, séparation des objets réellement manipulés, collisions/limites explicites, contrôle de tous les profils et validation dans les modes annoncés. L’acceptation visuelle, la présence dans Git et la disponibilité dans un jeu livré restent des états différents.

## Références

Les liens de code ci-dessous pointent vers les fichiers du dépôt ; l’état examiné est le commit indiqué en tête. Les captures de jeu ont été consultées avant génération et leurs plages temporelles figurent dans le manifeste P62. Les walkthroughs servent à identifier les lieux et leur succession ; ils ne certifient pas les perspectives peintes.

- **R01** — Catalogue de plans de stages et repère logique : [cqc-stage-layer-data.js][R01].
- **R02** — Catalogue natif des scènes, dont Shagohod et pont-levis AC!D : [cqc-pass18-stage-catalog.js][R02].
- **R03** — Rendu du stage P58 et séparation des collisions : [cqc-p58-relay-glasshouse.js][R03].
- **R04** — Rencontres, IDs et moteur Arsenal : [arsenal-files-v044.html][R04], `DATA`, `create`, `baseUnlocked`, `isUnlocked`, `damagePart`.
- **R05** — [Inventaire P61][R05] et [manifeste P61](../cqc-reprise/pass61/delivery-manifest.json).
- **R06** — [Manifeste des cinq sources P62][R06], prompts et QA.
- **R07** — Catalogue REX original : [cqc-machine-parts-catalog-v1.js][R07].
- **R08** — Catalogues Shagohod/Sahelanthropus et qualifications : [cqc-pass16-machine-catalog.js][R08].
- **R09** — Catalogue du canyon de Sahelanthropus : [cqc-pass18-stage-pw-phantom-catalog.js][R09].
- **V01** — MGS4 PS3, captures publiques de [KVZoneHD][V01], notamment Crescent Meridian autour de 2:12–2:15 et Cove Valley autour de 2:58.
- **V02** — MGS4, [Crescent Meridian, SuperCheats][V02] ; [Cove Valley Village, Gamepressure](https://www.gamepressure.com/metalgearsolid4gunsofthepatriots/cove-valley-village/z11394).
- **V03** — MGS3 original, [captation publique][V03], Zaozyorje East vers 5:49–5:52, cabine WIG vers 6:13–6:18.
- **V04** — AC!D 03B, [captation Upper Ruins][V04] et [seconde captation](https://www.youtube.com/watch?v=xScIGjuILp4) ; [walkthrough GameSpot](https://www.gamespot.com/articles/metal-gear-acid-walkthrough/1100-6122267/).
- **V05** — [REX dans la base de données MGS4, transcription française][V05] ; source documentaire secondaire de l’entrée originale.
- **V06** — [Sahelanthropus, fiche documentaire][V06] ; [guide de la mission finale](https://www.trueachievements.com/game/metal-gear-solid-v-the-phantom-pain/walkthrough/7).

[R01]: ../../public/cqc/src/cqc-stage-layer-data.js
[R02]: ../../public/cqc/src/cqc-pass18-stage-catalog.js
[R03]: ../../public/cqc/src/cqc-p58-relay-glasshouse.js
[R04]: ../../public/cqc/modules/arsenal-files-v044.html
[R05]: ../cqc-reprise/pass61/inventory.json
[R06]: ../cqc-reprise/pass62/batches/stages-continuation.json
[R07]: ../../public/cqc/src/cqc-machine-parts-catalog-v1.js
[R08]: ../../public/cqc/src/cqc-pass16-machine-catalog.js
[R09]: ../../public/cqc/src/cqc-pass18-stage-pw-phantom-catalog.js
[V01]: https://www.youtube.com/watch?v=jZZjmvJXPSw
[V02]: https://www.supercheats.com/guides/metal-gear-solid-4/crescent-meridian
[V03]: https://www.youtube.com/watch?v=amcYGtT-6l8
[V04]: https://www.youtube.com/watch?v=EhyTbOshlz0
[V05]: https://mgsdb.com/fr/enc/316
[V06]: https://metalgear.fandom.com/wiki/Metal_Gear_Sahelanthropus

## Extension P66 — 26 novembre 2026

P66 ajoute huit fragments : FAR B3F/B4F/B5F, Control Section, Communications Tower, Terminal, Residential Area et une terrasse de Forsaken Ruins. Ces images enrichissent la présentation seulement. Navigation, dimensions, quatre axes d’arène, transitions et règles de boss restent à définir et à tester. B4F porte une réserve renforcée sur la géométrie et les turbines.

[Continuation et fiches P66](CONTINUATION_P66.md) · [Associations P66](asset-associations-p66.json) · [Delta](../cqc-reprise/pass66/scope-delta.json) · [QA](../cqc-reprise/pass66/INTEGRATION_QA.md)
