# Side Ops — Tactical Anthology

`sideops_tactical_anthology` est une campagne de simulations tactiques originales du projet. Elle relie les époques Metal Gear sans se présenter comme une reconstitution des missions canoniques ou comme un remplacement des scènes dédiées MG1/MGS1.

## Contenu défini dans le code

`src/game/core/sideOpsCampaign.ts` définit douze théâtres, chacun décliné en une reconnaissance et un assaut : **24 opérations**. Chaque opération comporte cinq secteurs connectés, soit **120 instances de secteur**. Ce total ne signifie pas 120 cartes indépendantes dessinées une à une : les deux opérations partagent la conception de leur théâtre, avec des longueurs et des positions de parcours modifiées pour l’assaut.

| Pack | Reconnaissance | Assaut / rencontre principale |
| --- | --- | --- |
| `mg1` | Resistance Supply Line | Mercenary Lockdown — Shotmaker |
| `mg2` | OILIX Evidence Trail | Zanzibar Heavy Intercept — Metal Gear D |
| `mgs1` | Cold Storage Signal | Armory Crossfire — Revolver Ocelot |
| `mgs2_tanker` | Rain Deck Reconnaissance | Bridge Wing Encounter — Olga Gurlukovich |
| `mgs2_plant` | Strut Communications Trace | Shell Defense Exercise — Metal Gear RAY |
| `mgs3` | Fortress Supply Survey | Runway Breakthrough — Shagohod |
| `mgs4` | Silent City Passage | Gekko Street Intercept — Gekko |
| `peace_walker` | Supply Network Survey | Pupa Combat Exercise — Pupa |
| `mgsv_ground_zeroes` | Omega Blackout Recon | Armored Exit Route — STOUT IFV-SC |
| `mgsv_phantom_pain` | Mountain Relay Survey | Sahelanthropus Combat Trial — Sahelanthropus |
| `vr_simulation` | Stealth Certification | Advanced Combat Certification — VR Combat Target |
| `patriots_ai` | Memory Integrity Check | Control Core Isolation — GW Control Core |

Les rencontres lourdes et leurs réglages sont des adaptations de gameplay. Les cibles VR et le noyau GW sont des constructions de simulation, pas des ajouts prétendument canoniques à la franchise.

## Parcours et objectifs

Chaque théâtre possède cinq secteurs nommés, des longueurs propres, une palette, un environnement, un opérateur et un contact Codec. Le parcours relie approche, accès, surveillance, rencontre et extraction. Le sol est continu, avec des itinéraires surélevés et des marches intermédiaires conçues pour la hauteur de saut. L’assaut allonge les secteurs alternés et déplace les accès aux passages hauts ; ce n’est pas seulement une hausse de points de vie sur le même tracé.

La carte d’accès est placée avant la porte verrouillée. Des caisses, plateformes et portes permettent de rompre les lignes de vue ; caméras et projecteurs imposent de lire les zones exposées. Trois caches de renseignements se trouvent dans les secteurs 1, 3 et 5. Du ravitaillement est placé sur les itinéraires, notamment avant la rencontre principale.

| Règle | Reconnaissance | Assaut |
| --- | --- | --- |
| Carte d’accès | Obligatoire | Obligatoire |
| Renseignements requis | 2 sur 3 | 1 sur 3 |
| Boss neutralisé | Non requis | Requis |
| Patrouilles initiales | 5 | 8 |
| Équipement initial | 18 munitions, 1 ration, 1 chaff | 44 munitions, 2 rations, 2 chaff |

Exception VR : les trois nœuds de données sont obligatoires dans les deux opérations. Les valeurs d’équipement ci-dessus décrivent les simulations du runtime partagé, pas l’inventaire canonique de chaque jeu ni les règles des scènes dédiées.

Quatre défis facultatifs accompagnent chaque opération : aucune alerte, toutes les caches, extraction rapide, puis aucune victime en reconnaissance ou aucun dégât en assaut. Le seuil de temps est de 300 secondes en reconnaissance et 360 en assaut. Ces défis ne bloquent jamais l’extraction lorsque les objectifs obligatoires sont remplis.

## Progression et Codec

Dans la définition de campagne, les douze reconnaissances sont disponibles au départ. Terminer une reconnaissance déverrouille l’assaut du même théâtre. Les preuves de réussite alimentent la progression locale et les récompenses sont dédupliquées : rejouer n’est pas destiné à multiplier la récompense de première réussite.

- Reconnaissance : 240 XP, 2 points de commandement, 3 renseignements et 2 fournitures.
- Assaut : 420 XP, 4 points de commandement, 2 renseignements, 4 fournitures et certification du théâtre.

Le sélecteur libre Side Ops et le graphe de progression de campagne sont deux surfaces différentes : les prérequis décrits ici sont ceux de la campagne. La disponibilité d’une opération dans un sélecteur de test ne doit pas être confondue avec son déverrouillage de campagne.

Les appels Codec de ces opérations emploient des contacts par époque et des identifiants de conversation propres à chaque mission. Leurs textes sont marqués `simulation` / `original_lore_grounded` : il ne s’agit pas de transcriptions officielles. Les messages Ground Zeroes sont séparés des opérations de 1984. Les appels de campagne sont configurés avec `pauseGame: false` ; ouvrir une transmission ne promet donc pas automatiquement de suspendre le combat.

## IA, couverts et lisibilité du combat

`sideOpsEnemyTactics.ts` organise les gardes en patrouille, investigation, recherche, visée, tir, rechargement ou état neutralisé. La détection tient compte de l’orientation, de la hauteur, de la posture et de la difficulté. Les obstacles bloquent la ligne de vue et l’autorisation de tir ; une alerte globale ne révèle pas magiquement la position actuelle d’un joueur dissimulé.

Un garde peut enquêter sur un bruit récent ou rejoindre la dernière position observée, puis chercher avant de reprendre sa patrouille. Des contrôles de mur, limite de monde et bord de plateforme évitent les déplacements invalides. Le premier tir est annoncé par une phase de visée ; les chargeurs sont finis et suivis d’une fenêtre de rechargement. Rejoindre un couvert pendant la préparation peut annuler le tir. Les indicateurs d’état rendent ces transitions visibles.

`sideOpsEnemyBossTactics.ts` fournit un réglage propre à chacun des douze packs : précision, rafale, dispersion ou charge. Les rencontres traversent acquisition/repositionnement, préparation annoncée, attaque et récupération. La cible est verrouillée au début de la préparation pour permettre l’esquive ; un couvert peut interrompre une ligne de tir. Les phases évoluent à 65 % et 30 % de vie, sans revenir en arrière. La charge ne blesse au contact que pendant sa fenêtre active, et la récupération offre une ouverture au joueur.

Dans `SideOpsScene.ts`, la géométrie alimente ces décisions : tirs contre plateformes/porte, CQC vérifiant la ligne de vue, ennemis neutralisés exclus du combat et contact du boss soumis à sa fenêtre active. Cela reste un contrôleur tactique 2D, pas une navigation universelle capable d’escalader ou de reproduire tous les comportements des jeux originaux.

## Présentation, pause et animations

La barre de commandes Side Ops propose Opérations, Pause/Reprendre, Recommencer, Dossier tactique et Plein écran. Le lancement privilégie la surface de jeu, avec les informations détaillées repliables. Le plein écran dépend de l’autorisation du navigateur et affiche une erreur s’il n’est pas disponible.

La pause manuelle suspend la scène Phaser active (`SideOpsScene`, `Mg1OuterHeavenScene` ou `Mgs1ShadowMosesScene`) et affiche une surcouche de reprise. Ouvrir le sélecteur Opérations suspend aussi le jeu. Le chronomètre accumule uniquement les deltas des frames actives, sans compter le temps passé en pause ni l’âge de la page. Le bouton est indisponible pendant le chargement, un résultat de mission ou un échange Codec déjà bloquant ; redémarrer réinitialise l’état de pause. Boutons, clavier et manette utilisent le même événement de reprise pour nettoyer l’écran de résultat. Aucun raccourci Échap ni suspension automatique au changement d’onglet n’est promis ici.

Le registre partagé prévoit 12 packs × 3 rôles × 8 actions × 4 phases, soit 288 clips et 1 152 poses dans 72 planches runtime. Les sources, le découpage, la provenance, les limites de fidélité et les vérifications de présence sont détaillés dans [le README des animations](../scripts/art_sources/actor-animations/README.md). Ce volume ne compte ni portraits Codec ni nouvelles animations exhaustives de boss, PNJ, véhicules, projectiles ou VFX. Les traitements spécialisés existants restent en place pour ces catégories.

## Vérifications et limites de cette note

Sources de vérité principales :

- `src/game/core/sideOpsCampaign.ts` et `sideOpsCampaign.test.ts` : contenu, géométrie, objectifs, progression, récompenses et séparation des époques.
- `src/game/core/sideOpsEnemyTactics.ts` et son test : occlusion, dernière position connue, bruit, cadence, rechargement et déplacement.
- `src/game/core/sideOpsEnemyBossTactics.ts` et son test : préparation, esquive, couverts, phases, récupération et charge.
- `src/components/sideops/SideOpsLauncher.tsx` : sélection, HUD, pause et commandes de présentation.
- `src/game/core/sideOpsActorAnimationRegistry.test.ts` : contrat et intégrité des planches réellement présentes.

Commandes de vérification ciblée :

```powershell
npm run test -- src/game/core/sideOpsCampaign.test.ts src/game/core/sideOpsEnemyTactics.test.ts src/game/core/sideOpsEnemyBossTactics.test.ts src/game/core/sideOpsActorAnimationRegistry.test.ts
npm run lint
```

Cette documentation décrit le contenu et les mécanismes présents dans le code, pas le résultat de leur recette globale. Une annonce de livraison doit distinguer tests unitaires, parcours navigateur/manette/tactile, build web, validation native et déploiement effectivement exécutés. Les 24 simulations ne constituent pas toutes les missions, tous les décors ou tous les ennemis de Metal Gear ; l’extension exhaustive du roster, les animations spécialisées et la fidélité visuelle phase par phase restent des travaux séparés.
